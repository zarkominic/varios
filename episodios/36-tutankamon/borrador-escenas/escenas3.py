E = {}

E['tu-vela'] = ('La vela', '''// TU-VELA (frase 6), 26 de noviembre de 1922, sin cartela. Cuatro planos (gag 3: la vela):
// 1. el pasillo de bajada, de noche: Carter llega a la segunda puerta, sube al cajón, pica el hueco con el cincel en
//    «made a small hole» (toc, toc, toc), deja el cincel, coge la vela del cajón y la sube al hueco en «held up a
//    candle»; se asoma en «looked in»; detrás, Carnarvon espera con el bastón y se inclina; la luz sigue a la llama;
// 2. la segunda puerta de cerca: la vela se acerca al hueco; mientras Carnarvon pregunta, el aire de la tumba dobla la
//    llama; en «wonderful» se apaga (hilo de humo) y llega la cerilla; una araña baja por su hilo;
// 3. la antecámara por el hueco: unos instantes casi a oscuras (el humo abajo en medio), vuelve la luz y el oro se
//    enciende poco a poco hasta «Gold everywhere»; las estatuas guardianas; un escarabajo cruza un cofre;
// 4. el ajuar de cerca: la vela (en la mano, T.brazo) barre el trono, la rueda del carro en «chariots» y el cofre
//    pintado en «chests»; una polilla da vueltas a la llama; en «attic» cae un poco de polvo de lo alto.''', r'''
const v = (f) => en('vela', f);
const P2 = v(0.293), P3 = v(0.611), P4 = v(0.849);
const N = Math.round;
const h3 = (x, y, k) => { const q = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return q - Math.floor(q); };
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
// los actores, a la luz de la llama: se pintan en una capa aparte y se oscurecen y entibian según la distancia a la luz
const capa = R.nuevo();
const aLaLuz = (pinta, fuentes, amb = 0.32) => {
  capa.fill(0); const prev = R.usar(capa); pinta(); R.usar(prev); const B = R.buf;
  for (let i = 0; i < 57600; i++) { const p = capa[i]; if (!p) continue; const x = i % 320, y = (i / 320) | 0;
    let L = amb; for (const [fx, fy, r, a] of fuentes) { const dx = (x - fx) / r, dy = (y - fy) / r, d2 = dx * dx + dy * dy; if (d2 < 1) L += a * (1 - d2); }
    L = Math.min(1.08, L); const w = Math.min(1, L);
    const r = Math.min(255, (p & 255) * L * (1 + 0.14 * w)), g = Math.min(255, ((p >> 8) & 255) * L * (1 - 0.06 * w)), b = Math.min(255, ((p >> 16) & 255) * L * (1 - 0.3 * w) + (1 - w) * 10);
    B[i] = (0xff000000 | (N(b) << 16) | (N(g) << 8) | N(r)) >>> 0; }
};
// la llama de una vela suelta (para la que entra por abajo): centro claro, punta naranja, tiembla
const llama = (x, y, t, k = 1) => {
  const f = Math.sin(t * 23) * 0.5 + Math.sin(t * 37 + 1) * 0.5, a = N(4 * k + f);
  for (let j = 0; j < a; j++) { const w = j < a * 0.35 ? 1 : 0; R.rect(x - w, y - j, x + w, y - j, hex(j > a * 0.7 ? '#f08a2a' : '#ffd25a')); }
  R.pset(x, y - 1, hex('#fff8d0')); R.pset(x + (f > 0 ? 1 : 0), y - a, hex('#c8501a'));
};

// 1 · el pasillo: Carter sube al cajón, pica el hueco, coge la vela y se asoma
const CJ = [186, 132, 214, 156];   // el cajón de madera delante de la puerta
const toques = [v(0.126), v(0.15), v(0.175)];
const cajon = () => {
  const [x0, y0, x1, y1] = CJ;
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1, hex('#1a100a'));
  for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) { const tb = Math.floor((y - y0) / 6), veta = Math.sin(x * 0.4 + tb * 3 + Math.sin(y * 0.9) * 0.6);
    R.pset(x, y, hex((y - y0) % 6 === 5 ? '#2a1a10' : veta > 0.6 ? '#7a5634' : h3(x, y, 3) < 0.1 ? '#4a3220' : '#64462a')); }
  R.rect(x0, y0, x1, y0, hex('#a07a4a')); R.rect(x0 + 2, y0 + 1, x0 + 3, y1 - 1, hex('#3a2616')); R.rect(x1 - 3, y0 + 1, x1 - 2, y1 - 1, hex('#3a2616'));
  for (const [cx, cy] of [[x0 + 2, y0 + 3], [x1 - 2, y0 + 3], [x0 + 2, y1 - 3], [x1 - 2, y1 - 3]]) R.pset(cx, cy, hex('#c8c0a8'));
  // un trozo de cuerda enrollada y un cuaderno de notas encima
  R.rect(x1 - 9, y0 - 3, x1 - 3, y0 - 1, hex('#2a2018')); R.rect(x1 - 8, y0 - 2, x1 - 4, y0 - 2, hex('#e8dcc0')); R.pset(x1 - 6, y0 - 2, hex('#8a3a2a'));
};
const p1 = (t) => {
  // la vela: en el cajón hasta que Carter la coge (en «held up»), luego en su mano, subiendo al hueco
  const coge = v(0.215), sube = tramo(t, v(0.232), v(0.27)), asoma = tramo(t, v(0.27), v(0.29));
  const llega = tramo(t, 0.3, 1.5), salta = tramo(t, 1.55, 1.95);
  const xc = N(t < 1.55 ? lerp(146, 176, llega) : lerp(176, 196, salta)), sc = N(t < 1.55 ? 156 : lerp(156, 132, salta) - Math.sin(salta * Math.PI) * 8);
  const enMano = t > coge;
  // dónde apunta la mano: el cincel en el hueco mientras pica; la vela, del pecho al hueco
  const toc = toques.some((g) => t > g && t < g + 0.12);
  const objMano = !enMano ? (t > v(0.11) && t < v(0.2) ? [xc + 20 + (toc ? 2 : 0), sc - 22 - (toc ? 1 : 0)] : null) : [N(lerp(xc + 18, xc + 22, sube) + asoma * 2), N(lerp(sc - 12, sc - 23, sube))];
  // la llama de la vela, la que mueve la luz del decorado
  let fl = [CJ[0] + 4, CJ[1] - 22];
  const ab = tramo(t, v(0.12), v(0.2)), oro = 0.5 * tramo(t, v(0.27), v(0.293));
  // primero un pase en blanco para saber dónde queda la mano (la llama manda la luz)
  const geoMano = enMano ? [Math.min(objMano[0], xc + 21), objMano[1]] : null;
  if (enMano) fl = [geoMano[0], geoMano[1] - 22];
  const o = { encuadre: 'pasillo', abierta: ab, oro, vela: 1, llama: fl };
  T.tumba(R, t, o);
  // el cincel, apoyado en el cajón cuando no se usa
  if (t > v(0.2)) { R.linea(CJ[0] + 9, CJ[1] - 1, CJ[0] + 17, CJ[1] - 3, hex('#5a5a66')); R.pset(CJ[0] + 17, CJ[1] - 3, hex('#d8d8e4')); R.rect(CJ[0] + 6, CJ[1] - 2, CJ[0] + 9, CJ[1] - 1, hex('#6a4a2a')); }
  let mano = null;
  aLaLuz(() => {
    cajon();
    // Carnarvon espera detrás, con su bastón; al final se inclina para ver
    const mira = t > v(0.27);
    R.actor(T.ELENCO_TU.carnarvonTU, mira ? 118 : 108, 158, t, { dir: 1, anda: t > v(0.265) && t < v(0.285), sorpresa: t > v(0.285), sonrisa: t < 1.5, dedo: t > 2.0 && t < 2.6 });
    const cv = R.actor(T.ELENCO_TU.carterTU, xc, sc, t, { dir: 1, anda: (llega > 0 && llega < 1), salto: 0, sostiene: objMano, sorpresa: t > v(0.285), habla: t > 1.0 && t < 1.5 });
    mano = cv.mano;
  }, [[fl[0], fl[1], 90, 0.85], [118, 166, 70, 0.55]], 0.3);
  // en la mano: el cincel (pica el hueco) o la vela
  if (!enMano && objMano && mano) { const [mx, my] = mano; R.linea(mx, my - 1, mx + 7, my - 8, hex('#3a3a42')); R.linea(mx + 1, my - 1, mx + 8, my - 8, hex('#b8b8c4')); R.pset(mx + 8, my - 9, hex('#f0f0f8'));
    if (toc) for (let i = 0; i < 5; i++) R.pset(mx + 9 + (i % 3), my - 10 - (i >> 1), hex(i % 2 ? '#e8dcc0' : '#fff4d8')); }
  if (enMano && mano) T.PIEZAS_TU.vela(R, mano[0], mano[1] + 2, { t });
  else T.PIEZAS_TU.vela(R, CJ[0] + 4, CJ[1], { t });
  T.tumbaDelante(R, t, o);
};

// 2 · la segunda puerta de cerca: la vela se acerca, el aire la dobla y en «wonderful» se apaga; llega la cerilla
const p2 = (t) => {
  const acerca = ease(tramo(t, P2, v(0.33)));
  const soplo = t < v(0.555) ? 0.6 * ease(tramo(t, v(0.35), v(0.47))) - 0.15 * ease(tramo(t, v(0.47), v(0.52))) : lerp(0.45, 0.86, tramo(t, v(0.555), v(0.565)));
  const enciende = lerp(0, 0.5, ease(tramo(t, v(0.575), P3)));
  const o = { encuadre: 'pasillo', camara: 'hueco', abierta: 1, acerca, soplo, enciende, oro: 0.5 };
  T.tumba(R, t, o);
  // una araña que baja por su hilo desde el dintel, a la izquierda, se para y vuelve a subir
  const ba = Math.sin(tramo(t, P2 + 0.3, P3 - 0.2) * Math.PI), ya = N(31 + ba * 34), xa = 62;
  R.linea(xa, 31, xa, ya - 2, hex('#a89878'));
  for (const s of [-1, 1]) { R.linea(xa + s, ya, xa + s * 3, ya - 2, hex('#1a1410')); R.linea(xa + s, ya + 1, xa + s * 3, ya + 3, hex('#1a1410')); }
  R.rect(xa - 1, ya - 1, xa + 1, ya + 1, hex('#2a2018')); R.pset(xa, ya - 1, hex('#5a4a3a'));
  T.tumbaDelante(R, t, o);
};

// 3 · la antecámara por el hueco: casi a oscuras, el humo; vuelve la luz y el oro se enciende hasta «Gold»
const p3 = (t) => {
  const oro = ease(tramo(t, P3 + 0.8, v(0.75)));
  const o = { encuadre: 'antecamara', vela: 1, oro };
  T.tumba(R, t, o);
  // un escarabajo pelotero cruza la tapa de un cofre, en primer término a la izquierda
  { const u = tramo(t, P3 + 0.8, P4 - 0.2), x = N(lerp(86, 126, u)), y = 133;
    R.rect(x - 3, y - 3, x + 2, y, hex('#0e0a10')); R.rect(x - 2, y - 3, x + 1, y - 3, hex('#4a5a7a')); R.pset(x + 3, y - 2, hex('#0e0a10'));
    for (let i = -1; i <= 1; i++) R.pset(x + i * 2, y + 1 + ((Math.floor(t * 10) + i) & 1), hex('#0e0a10')); }
  // el apagón del gag: un velo casi negro que se va, y el hilo de humo de la llama que se apagó, abajo en medio
  const velo = 1 - ease(tramo(t, P3 + 0.45, P3 + 0.9));
  if (velo > 0) { const B = R.buf; for (let i = 0; i < 57600; i++) { const p = B[i], k = 1 - 0.88 * velo; B[i] = (0xff000000 | (N(((p >> 16) & 255) * k + 6 * velo) << 16) | (N(((p >> 8) & 255) * k) << 8) | N((p & 255) * k)) >>> 0; } }
  const humo = 1 - tramo(t, P3 + 0.6, P3 + 1.5);
  if (humo > 0) for (let j = 0; j < 40; j++) { const x = N(160 + Math.sin(j * 0.25 - t * 3) * (j * 0.15) + j * 0.1), y = 180 - j; if (j % 3 !== 2) R.pset(x, y, hex(j < 20 ? '#c8c4bc' : '#8a8680')); }
  T.tumbaDelante(R, t, o);
};

// 4 · el ajuar: la vela barre el trono, la rueda en «chariots» y el cofre en «chests»; una polilla y el polvo del «attic»
const p4 = (t) => {
  const o = { encuadre: 'antecamara', camara: 'ajuar' };
  T.tumba(R, t, o);
  // la llama recorre: del trono a la rueda (chariots) y al cofre (chests)
  const u1 = ease(tramo(t, P4, v(0.875))), u2 = ease(tramo(t, v(0.886), v(0.93)));
  const lx = N(lerp(lerp(210, 120, u1), 96, u2)), ly = N(lerp(lerp(150, 132, u1), 150, u2));
  // el polvo que cae de lo alto en «attic»
  const pv = tramo(t, v(0.965), v(0.965) + 1.3);
  if (pv > 0 && pv < 1) for (let i = 0; i < 18; i++) { const x = N(204 + h3(i, 1, 9) * 36 + Math.sin(i + t * 2) * 2), y = N(48 + pv * (50 + h3(i, 2, 9) * 40)); R.pset(x, y, hex(i % 3 ? '#e8d8b0' : '#fff2d0')); }
  // la polilla que da vueltas a la llama
  const ang = t * 5, px = N(lx + 4 + Math.cos(ang) * 14), py = N(ly - 34 + Math.sin(ang * 1.3) * 7), al = Math.floor(t * 18) % 2;
  R.pset(px, py, hex('#3a3024')); R.rect(px - 2, py - al, px - 1, py - al, hex('#d8c8a8')); R.rect(px + 1, py - al, px + 2, py - al, hex('#d8c8a8'));
  // la vela en la mano, que entra por abajo a la derecha
  T.PIEZAS_TU.vela(R, lx, ly + 14, { t, s: 2 });
  T.brazo(R, lx + 50, 196, lx + 10, ly + 8, '#c8b896', -1, { codo: [lx + 30, ly + 34] });
};

const efectos = [[toques[0], 'toc'], [toques[1], 'toc'], [toques[2], 'toc'], [v(0.36), 'rafaga'], [v(0.563), 'whoosh'], [P3 + 0.85, 'brillo'], [v(0.745), 'brillo'], [v(0.97), 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1922 });
''')

E['tu-pequena'] = ('Pequeña', '''// TU-PEQUENA (frases 7–8), sin cartela. Ocho planos:
// 0. la cámara del sarcófago en la época antigua, a la luz de las lámparas: dos obreros tiran de la cuerda y el panel
//    de la capilla dorada sube por la polea; el capataz lo dirige; en «19» sale la placa del 19 (su edad) y en
//    «ruling», la de la corona y el 10 de su reinado (sin barra del año: es antes de Cristo);
// 1. el plano de la tumba (1923): la mano con el lápiz toca los cuatro cuartos en «four rooms», que se encienden; en
//    «small for a king» se desenrolla el plano rojo de la tumba grande y el de Tutankamón se encoge;
// 2. la antecámara en planta: los objetos caen uno tras otro y el contador sube a 5000 en «5,000»; en «squeezed … so
//    tightly» la mano mete a presión la última caja y todo se sacude;
// 3. el panel de la capilla de cerca, al revés: el panel se mece en sus cuerdas y las manos lo sujetan; en
//    «wrong way» una mano se va a rascar y sale la «?»; una polilla revolotea y cae polvo de oro;
// 4. el sarcófago cerrado (1923): Carter recula desde el obrero (a la izquierda) desenrollando la cinta de medir a lo largo del
//    sarcófago hasta la vela («rushed burial»), se vuelve, lo señala y en «not have been meant for him» se encoge de
//    hombros, sorprendido (los dos brazos arriba);
// 5. la cámara pintada (2015): dos visitantes avanzan por la pasarela; uno señala las escenas en «scenes … gods»; el
//    otro levanta el móvil, ve el pictograma de la cámara tachada y lo baja;
// 6. el taller del escriba: el aprendiz muele el pigmento; el escriba explica, señala el nombre en «another name» y en
//    «scraped» empieza a raspar con la cuchilla de cobre (virutas);
// 7. el cartucho de cerca: la cuchilla acaba de raspar, el pincel pinta sol, ankh y cesta en «replaced with his» y,
//    en «someone else», repasa de oro el borde de abajo del óvalo; una mosca se pasea por el estuco.''', r'''
const a = (f) => en('pequena', f), b = (f) => en('pintada', f);
const P1 = a(0.265), P2 = a(0.445), P3 = a(0.647), P4 = a(0.829), P5 = b(0), P6 = b(0.409), P7 = b(0.672);
const N = Math.round;
const h3 = (x, y, k) => { const q = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return q - Math.floor(q); };
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const capa = R.nuevo();
const aLaLuz = (pinta, fuentes, amb = 0.32) => {
  capa.fill(0); const prev = R.usar(capa); pinta(); R.usar(prev); const B = R.buf;
  for (let i = 0; i < 57600; i++) { const p = capa[i]; if (!p) continue; const x = i % 320, y = (i / 320) | 0;
    let L = amb; for (const [fx, fy, r, al] of fuentes) { const dx = (x - fx) / r, dy = (y - fy) / r, d2 = dx * dx + dy * dy; if (d2 < 1) L += al * (1 - d2); }
    L = Math.min(1.08, L); const w = Math.min(1, L);
    const r = Math.min(255, (p & 255) * L * (1 + 0.12 * w)), g = Math.min(255, ((p >> 8) & 255) * L * (1 - 0.05 * w)), bb = Math.min(255, ((p >> 16) & 255) * L * (1 - 0.25 * w) + (1 - w) * 10);
    B[i] = (0xff000000 | (N(bb) << 16) | (N(g) << 8) | N(r)) >>> 0; }
};
// el techo de roca de la cámara (el decorado lo deja casi liso): bloques desbastados con sus juntas, marcas de cincel,
// hollín encima de las lámparas y una grieta; la esquina de Atom, más tranquila. Se pinta una vez en un búfer
const techos = {};
const techo = (y1, luces, k) => {
  if (!techos[k]) { const buf = R.nuevo(), prev = R.usar(buf);
    const T5 = ['#0e0b0c', '#18131a', '#221a1e', '#2e2420', '#3e3026', '#54402e'].map(hex);
    for (let y = 0; y < y1; y++) { const fila = Math.floor(y / 11), off = (fila * 17) % 34;
      for (let x = 0; x < 320; x++) { const bx = Math.floor((x + off) / 34), junta = (y % 11 === 10) || ((x + off) % 34 === 0);
        const calma = x > 266 && y < 46 ? 0.35 : 1;
        let v = 1.6 + (h3(bx, fila, k) - 0.5) * 0.9 * calma + (h3(x >> 1, y >> 1, k + 1) - 0.5) * 0.7 * calma + (y / y1) * 0.9;
        if (calma === 1 && (x * 3 + y * 5 + bx * 7) % 23 === 0 && h3(x, y, k + 2) < 0.5) v += 1.1;   // marcas de cincel
        for (const [lx, al] of luces) { const d = Math.abs(x - lx); if (d < 44) v += al * (1 - d / 44) * (y / y1) * 1.6; if (d < 14 && y < y1 * 0.7) v -= 0.8 * (1 - d / 14); }   // luz y hollín
        if (junta) v -= 0.9;
        R.pset(x, y, T5[Math.max(0, Math.min(5, Math.floor(v)))]); } }
    for (let i = 0; i < 26; i++) R.pset(118 + i + ((i * 7) % 3), 6 + i + (i % 4 === 0 ? 1 : 0), T5[0]);   // una grieta
    R.usar(prev); techos[k] = buf; }
  const B = R.buf, b = techos[k]; for (let i = 0; i < y1 * 320; i++) B[i] = b[i];
};
// la placa de piedra oscura de las cifras de la vida del rey (sube como una cortina)
const placa = (x, y, w, u) => { if (u <= 0) return; const hh = N(16 * ease(u)); R.rect(x - 1, y - 1, x + w + 1, y + hh + 1, hex('#0c0806')); R.rect(x, y, x + w, y + hh, hex('#3a2a18')); R.rect(x, y, x + w, y, hex('#a07a40')); R.rect(x, y + hh, x + w, y + hh, hex('#22160c')); };

// 0 · la cámara antigua: suben un panel de la capilla; la corona y el 19, el 10 de su reinado
const p0 = (t) => {
  const panel = ease(tramo(t, 0.5, P1 - 0.4));
  const o = { encuadre: 'capillas', panel };
  T.tumba(R, t, o);
  techo(46, [[34, 1], [300, 1], [160, 0.5]], 1);
  const tira = Math.floor(t * 2.2) % 2 === 0 && panel < 1;
  aLaLuz(() => {
    // dos obreros tiran de la cuerda, a la derecha, y se echan atrás a cada tirón
    R.actor(EL.calvo, 270 + (tira ? 2 : 0), 161, t, { dir: 1, sostiene: [294, 140 + (tira ? 4 : 0)], sonrisa: panel >= 1 });
    R.actor(EL.campesino, 288 + (tira ? 2 : 0), 163, t, { dir: 1, sostiene: [300, 148 + (tira ? 4 : 0)], sonrisa: panel >= 1 });
    // el capataz, a la izquierda: señala el panel que sube y da órdenes; al final, satisfecho
    R.actor(EL.escriba, 74, 162, t, { dir: 1, dedo: t > 0.9 && t < 3.4, habla: t > 0.9 && t < 3.4 && Math.sin(t * 7) > 0, sonrisa: t > 3.6 });
  }, [[34, 136, 80, 0.75], [300, 140, 80, 0.75], [160, 168, 90, 0.6]], 0.38);
  T.tumbaDelante(R, t, o);
  // la vida del rey en cifras: la corona y el 19 (murió a los 19); después, el 10 de su reinado
  const u19 = tramo(t, a(0.152), a(0.172)), u10 = tramo(t, a(0.205), a(0.222));
  placa(36, 24, 52, u19);
  if (u19 > 0.7) { R.icono('reloj', 42, 29, hex('#e8d8b0'), hex('#2a1808')); R.numero('19', 56, 39, { color: hex('#f8ecc8') }); }
  if (u10 > 0) { placa(96, 24, 62, u10); if (u10 > 0.7) { R.icono('corona', 102, 30, hex('#f0c040'), hex('#2a1808'), 2); R.numero('10', 124, 39, { color: hex('#f8ecc8') }); } }
};

// 1 · el plano: la mano cuenta los cuatro cuartos; luego la tumba grande y la de Tutankamón se encoge
const p1 = (t) => {
  const contar = 4 * tramo(t, a(0.336), a(0.37)), comparar = ease(tramo(t, a(0.381), a(0.43)));
  const o = { encuadre: 'plano', contar, comparar };
  const geo = T.tumba(R, t, o);
  const cs = geo.cuartos || [[78, 116], [63, 140], [72, 86], [112, 86]];
  const k = Math.min(3, Math.floor(contar)), sale = ease(tramo(t, a(0.375), a(0.395))), entra = tramo(t, P1, P1 + 0.6);
  const [cx, cy] = cs[k], tx = N(lerp(260, cx + 4, ease(entra)) + sale * 140), ty = N(lerp(170, cy + 4, ease(entra)) + sale * 50 - (contar % 1 < 0.3 && contar < 4 && contar > 0 ? 2 : 0));
  if (sale < 1) { R.linea(tx - 6, ty - 6, tx, ty, hex('#d84a2a')); R.linea(tx - 5, ty - 6, tx + 1, ty, hex('#a02a1a')); R.pset(tx - 6, ty - 7, hex('#f4d8a0')); T.brazo(R, tx + 60, Math.max(188, ty + 70), tx + 6, ty + 4, '#e8e0d0', -1, { codo: [tx + 40, N((ty + Math.max(188, ty + 70)) / 2)] }); }
};

// 2 · la antecámara en planta: caen los objetos, el contador a 5000; la mano aprieta la última caja
const p2 = (t) => {
  const objetos = ease(tramo(t, P2 + 0.1, a(0.55))), cuenta = ease(tramo(t, P2 + 0.2, a(0.5)));
  const ap = tramo(t, a(0.6), a(0.64)), sac = ap > 0 && ap < 1 ? N(Math.sin(ap * 40) * (1 - ap) * 2) : 0;
  const o = { encuadre: 'plano', camara: 'apretado', objetos, cuenta };
  T.tumba(R, t, o);
  // la sacudida: la sala entera tiembla un pelo al meter la caja
  if (sac) { const B = R.buf, c = new Uint32Array(B); for (let y = 38; y < 163; y++) for (let x = 26; x < 229; x++) B[y * 320 + x] = c[y * 320 + Math.min(228, Math.max(26, x - sac))]; }
  // la mano que mete a presión la última caja entre las demás
  const m = tramo(t, a(0.545), a(0.6)), va = tramo(t, a(0.64), a(0.68));
  if (m > 0 && va < 1) { const x = 128, y = N(lerp(196, 100, ease(m)) + va * 90); 
    R.rect(x - 9, y - 14, x + 9, y + 1, hex('#2a1a0c')); R.rect(x - 8, y - 13, x + 8, y, hex('#c89850')); R.rect(x - 8, y - 13, x + 8, y - 12, hex('#f0c880')); R.linea(x - 8, y - 6, x + 8, y - 6, hex('#7a5428')); R.rect(x - 2, y - 10, x + 2, y - 3, hex('#3a5aa8'));
    if (va <= 0) T.brazo(R, x + 26, 204, x + 4, y + 4, '#e8e0d0', -1, { codo: [x + 22, y + 34] }); }
};

// 3 · el panel al revés de cerca: se mece; la polilla; en «wrong way» una mano se va y sale la «?»
const p3 = (t) => {
  const duda = ease(tramo(t, a(0.783), a(0.81)));
  const o = { encuadre: 'capillas', camara: 'panel', duda };
  T.tumba(R, t, o);
  // el panel cuelga de sus cuerdas y se mece un pelo mientras lo encajan (en «put together», un empujón)
  const dx = N(Math.sin(t * 2.4) * 1.2 + (t > a(0.79) - 0.6 && t < a(0.79) ? 1 : 0));
  if (dx) { const B = R.buf, c = new Uint32Array(B); for (let y = 34; y < 164; y++) for (let x = 68; x < 253; x++) B[y * 320 + x] = c[y * 320 + Math.min(252, Math.max(68, x - dx))]; }
  // una polilla que revolotea en la luz, delante del panel de al lado, y polvo que cae del panel al encajarlo
  { const px = N(34 + Math.sin(t * 1.7) * 18 + Math.sin(t * 5.3) * 4), py = N(70 + Math.cos(t * 1.3) * 26 + Math.sin(t * 7) * 3), al = Math.floor(t * 16) % 2;
    R.pset(px, py, hex('#3a3024')); R.pset(px, py + 1, hex('#3a3024')); R.rect(px - 3, py - al, px - 1, py - al + 1, hex('#e8dcc0')); R.rect(px + 1, py - al, px + 3, py - al + 1, hex('#e8dcc0')); }
  { const u = tramo(t, a(0.76), a(0.76) + 1.4); if (u > 0 && u < 1) for (let i = 0; i < 14; i++) R.pset(N(80 + h3(i, 1, 4) * 160), N(160 + u * (6 + h3(i, 2, 4) * 18)), hex(i % 2 ? '#f0d890' : '#c8a050')); }
  T.tumbaDelante(R, t, o);
};

// 4 · el sarcófago cerrado: Carter recula desenrollando la cinta; lo señala; en «not meant for him», brazos arriba
const p4 = (t) => {
  const o = { encuadre: 'mascara', camara: 'sarcofago', vela: 1 };
  T.tumba(R, t, o);
  techo(46, [[278, 0.7], [160, 0.25]], 2);
  const va = ease(tramo(t, P4 + 0.2, a(0.9))), xc = N(lerp(84, 228, va)), vuelve = t > a(0.9), duda = t > a(0.945);
  let mc = null, mo = null;
  aLaLuz(() => {
    mo = R.actor(T.ELENCO_TU.obrero1TU, 52, 168, t, { dir: 1, sostiene: [72, 150], sonrisa: t > a(0.86) && t < a(0.94) }).mano;
    const cv = R.actor(T.ELENCO_TU.carterTU, xc, 168, t, { dir: vuelve ? 1 : -1, anda: va > 0 && va < 1, sostiene: !vuelve ? [xc - 2, 150] : null, dedo: vuelve && !duda, habla: vuelve && !duda && Math.sin(t * 7) > 0, sorpresa: duda, brazos: duda });
    mc = cv.mano;
  }, [[278, 140, 150, 0.9], [60, 150, 70, 0.3]], 0.5);
  // la cinta de medir, clara, de mano a mano (con sus marcas rojas); al volverse Carter la deja en el suelo
  if (!vuelve && va > 0) { const [x1, y1] = mc, [x0, y0] = mo; for (let x = x0; x <= x1; x++) { const y = N(lerp(y0, y1, (x - x0) / Math.max(1, x1 - x0)) + Math.sin((x - x0) / Math.max(1, x1 - x0) * Math.PI) * 2);
    R.pset(x, y, hex('#f4e4a0')); R.pset(x, y + 1, hex('#a88a40')); if ((x - x1) % 8 === 0) R.pset(x, y, hex('#c8301e')); } }
  if (vuelve) for (let x = 72; x < 230; x++) { R.pset(x, 167, hex('#d8c480')); if (x % 8 === 0) R.pset(x, 167, hex('#a82a1a')); }
};

// 5 · la cámara pintada (2015): los visitantes avanzan; uno señala las escenas; el del móvil lo baja
const p5 = (t) => {
  const o = { encuadre: 'pintada', epoca: 2015 };
  T.tumba(R, t, o);
  const v1 = ease(tramo(t, P5 + 0.1, b(0.24))), x1 = N(lerp(20, 168, v1)), v2 = ease(tramo(t, P5 + 0.6, b(0.3))), x2 = N(lerp(-14, 114, v2));
  const senala = t > b(0.255) && t < b(0.4);
  R.actor(EL.turista1, x1, 170, t, { dir: 1, anda: v1 > 0 && v1 < 1, dedo: senala, habla: senala && Math.sin(t * 7) > 0, sonrisa: t > b(0.3) });
  const movil = t > b(0.31) && t < b(0.37), baja = t > b(0.37);
  const t2 = R.actor(EL.turista2, x2, 170, t, { dir: 1, anda: v2 > 0 && v2 < 1, sostiene: movil ? [x2 + 20, 140] : null, sorpresa: t > b(0.35) && t < b(0.4), sonrisa: baja });
  if (movil) { const [mx, my] = t2.mano; R.rect(mx - 1, my - 8, mx + 4, my, hex('#1a1a22')); R.rect(mx, my - 7, mx + 3, my - 1, hex('#6a9ad8')); R.pset(mx + 1, my - 6, hex('#e0f0ff')); }
  T.tumbaDelante(R, t, o);
};

// 6 · el taller del escriba: el aprendiz muele; el escriba señala el nombre y empieza a raspar en «scraped»
const p6 = (t) => {
  const raspa = t > b(0.612);
  const o = { encuadre: 'escriba', cartucho: t > b(0.655) ? 'raspado' : 'sol' };
  T.tumba(R, t, o);
  const muele = Math.sin(t * 6);
  R.actor(EL.campesino, 230, 156, t, { dir: 1, sostiene: [248 + N(muele * 4), 150], sonrisa: t > b(0.5) });
  const sc = R.actor(EL.escriba, 118, 154, t, { dir: 1, dedo: t > b(0.565) && t < b(0.61), habla: t > b(0.47) && t < b(0.565) && Math.sin(t * 7) > 0, sostiene: raspa ? [140 + N(Math.sin(t * 14) * 3), 128] : null });
  if (raspa) { const [mx, my] = sc.mano; R.linea(mx, my, mx + 6, my - 4, hex('#3a1a08')); R.linea(mx + 1, my, mx + 6, my - 3, hex('#e08a40')); R.pset(mx + 6, my - 4, hex('#fff0c0'));
    for (let i = 0; i < 6; i++) { const u = ((t * 2.2 + i / 6) % 1); R.rect(N(mx + 7 + u * 6), N(my - 3 + u * u * 22), N(mx + 8 + u * 6), N(my - 3 + u * u * 22), hex(i % 2 ? '#fff8e8' : '#e8d8b0')); } }
  T.tumbaDelante(R, t, o);
};

// 7 · el cartucho de cerca: acaba de raspar, pinta sol, ankh y cesta y repasa de oro el borde de abajo del óvalo; una mosca
const p7 = (t) => {
  const raspa = lerp(0.35, 1, ease(tramo(t, P7, b(0.7)))), pinta = ease(tramo(t, b(0.71), b(0.86)));
  const o = { encuadre: 'escriba', camara: 'cartucho', raspa, pinta };
  T.tumba(R, t, o);
  // el repaso de oro del óvalo (en «someone else»), con el pincel en la mano que da la vuelta
  const u = tramo(t, b(0.875), b(0.975)), cx = 160, cy = 95, rx = 61, ry = 46;
  if (u > 0) for (let k = 0; k <= N(u * 70); k++) { const an = k / 70 * Math.PI; R.pset(N(cx + Math.cos(an) * rx), N(cy + Math.sin(an) * ry), hex(k % 3 ? '#ffd860' : '#fff4b0')); }
  if (u > 0 && u < 1) { const an = u * Math.PI, px = N(cx + Math.cos(an) * rx), py = N(cy + Math.sin(an) * ry);
    R.linea(px, py, px + 10, py + 12, hex('#6a4a20')); R.linea(px + 1, py, px + 11, py + 12, hex('#c8a060')); R.rect(px - 1, py - 1, px + 1, py + 1, hex('#f0c040'));
    T.brazo(R, px + 70, 200, px + 12, py + 14, '#e8dcc0', -1, { codo: [px + 50, py + 60] }); }
  // una mosca que se pasea por el estuco y echa a volar
  { const w = tramo(t, P7 + 0.5, b(0.95)), fx = N(lerp(250, 286, w) + Math.sin(t * 9) * 1), fy = N(150 - (w > 0.8 ? (w - 0.8) * 300 : 0) + Math.sin(t * 13) * 1);
    R.rect(fx - 1, fy, fx + 1, fy + 1, hex('#1a1a20')); R.pset(fx, fy - 1, hex(Math.floor(t * 20) % 2 ? '#c8d8e8' : '#8898a8')); }
  T.tumbaDelante(R, t, o);
};

// la barra del año: en la época antigua no sale (es antes de Cristo y la barra va de 1922 a 2027)
const año = (t) => t < P1 ? null : t < P3 ? 1923 : t < P4 ? null : t < P5 ? 1923 : t < P6 ? 2015 : null;
const efectos = [[1.0, 'toc'], [a(0.155), 'brillo'], [a(0.207), 'brillo'], [a(0.345), 'lapiz'], [a(0.36), 'lapiz'], [a(0.385), 'papel'], [a(0.47), 'tic'], [a(0.6), 'golpecito'], [a(0.79), 'pop'], [P4 + 0.4, 'papel'], [a(0.947), 'pop'], [b(0.32), 'bip'], [b(0.62), 'lapiz'], [b(0.72), 'lapiz'], [b(0.78), 'lapiz'], [b(0.88), 'brillo']];
T.rodar(E, R, [[0, p0], [P1, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
