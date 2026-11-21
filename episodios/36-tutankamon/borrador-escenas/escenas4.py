E = {}

E['tu-maldicion'] = ('La maldición', '''// TU-MALDICION (frase 9), abril de 1923 → 1939, sin cartela. Cuatro planos, cortados en la palabra inglesa (gag 4):
// 1. (0) la ventana del hotel de El Cairo, de noche: la paloma picotea en el alféizar junto al telegrama; la lámpara
//    titila y se APAGA en «died» (sobrio: el cuarto queda azul, sale el reflejo de la luna); la paloma se va volando;
// 2. («Cairo») el periódico desde arriba: el TITULAR crece en «newspapers
//    invented» y caen encima las tres copias de otros países, cada una con su pirámide lisa y su «!» (sin ojo);
// 3. («Curse») la calle: el chaval grita «!» con el periódico en alto justo en «Curse»; un vecino de galabiya llega,
//    paga con una moneda, lo coge, lo lee y se sorprende y se va; el GATO baja del escalón, salta, da una vuelta y se
//    sienta encima del periódico del suelo (gag 4), y el chaval lo mira y se ríe;
// 4. («and died in London») Londres, 1939 (la barra cuenta de 1923 a 1939 al empezar): Carter, ya mayor, llega con su
//    bastón por la acera mojada, sube los escalones, abre la puerta (luz cálida), mira atrás y entra; la puerta se cierra.''', r'''
const TU = T.ELENCO_TU;
const N = Math.round;
const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c');
const wm = (s) => en('maldicion', (s - 0.5) / 16.257);   // instante de la voz (s de escena) → marca
const P2 = wm(6.14), P3 = wm(9.8), P4 = wm(14.26);
// el globo del grito (sin letras)
const globo = (x, y, ic = '!', c = ROJO) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
// el periódico doblado, pequeño (para la mano): papel crema, cabecera negra, la pirámide lisa con su «!» rojo
const diario = (x, y, dir = 1) => {
  const x0 = N(x - 5), y0 = N(y - 13);
  R.rect(x0 - 1, y0 - 1, x0 + 10, y0 + 13, K); R.rect(x0, y0, x0 + 9, y0 + 12, hex('#f0e6cc')); R.rect(x0, y0 + 11, x0 + 9, y0 + 12, hex('#d4c6a4'));
  R.rect(x0 + 1, y0 + 1, x0 + 8, y0 + 2, hex('#2a2620'));
  for (let j = 0; j < 4; j++) R.rect(x0 + 1 + j, y0 + 8 - j, x0 + 6 - j, y0 + 8 - j, hex(j === 3 ? '#8a6a3a' : '#c89a52'));
  R.rect(x0 + 8, y0 + 4, x0 + 8, y0 + 6, ROJO); R.pset(x0 + 8, y0 + 8, ROJO);
  R.rect(x0 + 1, y0 + 10, x0 + 7, y0 + 10, hex('#9a9080'));
};
// la paloma (gris, pico naranja); vuela: alas arriba y abajo
const paloma = (x, y, d, t, vuela, pica) => {   // a escala 2 (el inserto de la ventana está más cerca que la calle)
  const P = (i, j, c) => { const xx = N(x + d * i * 2) - (d < 0 ? 1 : 0), yy = N(y + j * 2); R.rect(xx, yy, xx + 1, yy + 1, c); };
  const G = hex('#eceef4'), GS = hex('#b4b8c8'), GO = hex('#7a7e90');
  for (let i = -3; i <= 2; i++) { P(i, -4, G); P(i, -3, G); P(i, -2, GS); }
  P(-4, -4, GO); P(-5, -4, GO); P(-4, -3, GS); P(-1, -3, GS); P(0, -3, GS);
  const hy = pica ? -3 : -6;
  P(3, hy, G); P(4, hy, G); P(3, hy + 1, G); P(4, hy + 1, G); P(5, hy + 1, hex('#e08a3a')); R.pset(N(x + d * 8) + (d > 0 ? 1 : -1), N(y + hy * 2), K);
  if (!pica) P(3, -5, G);
  if (vuela) { const a = Math.sin(t * 22) > 0; for (let i = -2; i <= 1; i++) { P(i, a ? -6 - (i === -1 ? 1 : 0) : -1, G); P(i, a ? -5 : 0, GS); } }
  else { P(0, -1, hex('#d86a6a')); P(1, -1, hex('#d86a6a')); }
};

// 1 · la ventana del hotel: la lámpara se apaga en «died»
const p1 = (t) => {
  const tit = t > wm(5.2) && t < wm(5.5) && Math.sin(t * 57) > 0.2 ? 0.45 : 0;
  const o = { encuadre: 'hotel', camara: 'ventana', apaga: Math.max(tit, ease(tramo(t, wm(5.5), wm(5.8)))) };
  T.cairo(R, t, o);
  // la paloma: anda y picotea por el alféizar; al apagarse la luz se va volando hacia la luna
  const v = tramo(t, wm(5.62), wm(6.12));   // en «died» se asusta y se va volando
  // (anda hasta el telegrama en «the first story» y lo picotea; en «Lord Carnarvon» se vuelve hacia la luz)
  if (v <= 0) { const xa = 130 + N(ease(tramo(t, 0.7, 2.0)) * 34 - ease(tramo(t, 3.9, 4.6)) * 12), d = t > 3.9 && t < 4.7 ? -1 : 1, pica = t > 2.1 && t < 3.8 && Math.sin(t * 7) > 0.3; paloma(xa, 150, d, t, false, pica); }
  else { const xa = lerp(152, 60, v), ya = 150 - Math.sin(v * Math.PI * 0.5) * 92; paloma(xa, ya, -1, t, true, false); }
  T.cairoDelante(R, t, o);
};

// 2 · el periódico: el titular crece en «newspapers invented» y caen las copias
const p2 = (t) => {
  const o = { encuadre: 'redaccion', camara: 'periodico', titular: ease(tramo(t, wm(7.75), wm(8.7))), copias: tramo(t, wm(8.75), wm(9.65)) };
  T.cairo(R, t, o); T.cairoDelante(R, t, o);
};

// 3 · la calle: el grito en «Curse», el vecino compra, el gato se sienta encima (gag 4)
const GRITO = [[P3, P3 + 0.85], [wm(12.35), wm(12.95)]];
const SIENTA = wm(13.4);
const p3 = (t) => {
  const o = { encuadre: 'calle', camara: 'vendedor', gato: tramo(t, wm(10.5), SIENTA) };
  T.cairo(R, t, o);
  // el vecino: llega, paga, coge el periódico, lo lee, se sorprende y se va leyendo
  const ent = tramo(t, P3 + 0.05, wm(11.0)), sal = tramo(t, wm(12.95), wm(14.4)), paga = tramo(t, wm(11.1), wm(11.45));
  const bx = N(sal > 0 ? lerp(62, -22, sal) : lerp(-20, 62, ent)), bd = sal > 0 ? -1 : 1, tiene = t > wm(11.55);
  const bo = { dir: bd, anda: (ent > 0 && ent < 1) || (sal > 0 && sal < 1), sorpresa: t > wm(12.1) && t < wm(12.9), sonrisa: t > wm(11.5) && t < wm(12.05) };
  if (tiene) bo.sostiene = [bd > 0 ? bx + 16 : bx - 1, 151]; else if (paga > 0 && paga < 1) bo.sostiene = [bx + 17, 149];
  const b = R.actor(TU.obrero2TU, bx, 166, t, bo);
  // el chaval: grita con el periódico en alto, vende, y al final mira al gato y se ríe
  const grita = GRITO.some(([a, z]) => t > a && t < z), vende = t > wm(10.9) && t < wm(11.6), gato = t > SIENTA - 0.1;
  const vo = { dir: vende ? -1 : 1, habla: grita, sorpresa: gato && t < SIENTA + 0.35, sonrisa: gato && t >= SIENTA + 0.35 };
  if (grita) vo.sostiene = [vo.dir > 0 ? 113 : 95, 133]; else if (vende) vo.sostiene = [93, 150];
  const v = R.actor(TU.vendedorTU, 96, 166, t, vo);
  if (grita) { diario(v.mano[0], v.mano[1] + 2); globo(v.cabeza[0] + 12, v.cabeza[1] - 9); }
  else if (vende && t > wm(11.25)) diario(v.mano[0], v.mano[1] + 4);
  if (tiene) diario(b.mano[0], b.mano[1] + 6);
  // la moneda: del vecino al chaval
  if (paga > 0 && paga < 1) { const mx = lerp(bx + 17, 92, paga), my = 146 - Math.sin(paga * Math.PI) * 9; R.disco(N(mx), N(my), 1, hex('#e8c050')); R.pset(N(mx) - 1, N(my) - 1, hex('#fff0a0')); }
  if (gato && t < SIENTA + 1.2) globo(v.cabeza[0] + 12, v.cabeza[1] - 9, '!', hex('#2a6ac8'));
  T.cairoDelante(R, t, o);
};

// 4 · Londres, 1939: Carter llega, sube, abre la puerta, mira atrás y entra
const SUBE = wm(16.3), ABRE = wm(16.62), ENTRA = wm(17.4), CIERRA = wm(17.95);
const p4 = (t) => {
  const o = { encuadre: 'londres', camara: 'puerta', baston: false, hojas: 0.5, niebla: 0.4 };
  const g = T.cairo(R, t, o), [dx0, dy0, dx1, dy1] = g.puerta || [142, 106, 192, 158];
  const W = dx1 - dx0 + 1, H = dy1 - dy0 + 1, abre = ease(tramo(t, ABRE, ABRE + 0.45)) * (1 - ease(tramo(t, CIERRA, CIERRA + 0.45)));
  const hoja = new Uint32Array(W * H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) hoja[j * W + i] = R.pget(dx0 + i, dy0 + j);
  // Carter: anda despacio, sube los dos escalones, se para ante la puerta, mira atrás y entra
  const an = tramo(t, P4, SUBE), su = tramo(t, SUBE, SUBE + 0.32), dentro = tramo(t, ENTRA, ENTRA + 0.5);
  const cx = N(su > 0 ? lerp(124, 150, su) + dentro * 6 : lerp(6, 124, an)), cs = N(lerp(166, 158, su) - dentro * 2);
  const mira = t > wm(17.0) && t < ENTRA;
  const carter = () => R.actor(TU.carterMayorTU, cx, cs, t, { dir: mira ? -1 : 1, anda: (an > 0 && an < 1) || (su > 0 && su < 1) || (dentro > 0 && dentro < 1), sonrisa: mira });
  const puerta = () => {
    if (abre <= 0) return;
    // el recibidor, cálido: papel pintado, la lámpara, la escalera y la alfombra
    for (let y = dy0; y <= dy1; y++) for (let x = dx0; x <= dx1; x++) {
      const d = Math.hypot((x - 167) / 30, (y - 118) / 40), k = Math.max(0, 1 - d);
      let c = y > dy1 - 9 ? ((x + y) % 4 === 0 ? '#5a2a20' : '#7a3a26') : (x % 6 === 0 ? '#8a5a30' : '#a8723a');
      if (y <= dy1 - 9 && y > 128 && x > 174 && (x - 174) > (y - 128) * 0.8) c = (y % 3 === 0) ? '#4a2a1a' : '#6a4024';
      R.pset(x, y, k > 0.55 ? hex('#f0c070') : k > 0.25 ? hex(c === '#a8723a' ? '#c88a44' : c) : hex(c));
    }
    R.disco(167, 114, 2, hex('#fff0c0')); R.linea(167, dy0, 167, 111, hex('#3a2414'));
    for (let y = dy1 + 1; y <= dy1 + 7; y++) for (let x = dx0 - 4; x <= dx1 + 10; x++) if ((x + y) % 3 === 0 && Math.abs(x - 170) < 20 + (y - dy1) * 3) R.pset(x, y, hex('#d8a860'));
  };
  const leaf = () => {
    if (abre <= 0) return;
    const w = Math.max(2, N(W * (1 - 0.86 * abre)));
    for (let i = 0; i < w; i++) { const si = Math.min(W - 1, Math.floor(i * W / w)); for (let j = 0; j < H; j++) R.pset(dx0 + i, dy0 + j + (i > w * 0.5 ? 0 : 0), hoja[j * W + si]); }
    R.linea(dx0 + w, dy0, dx0 + w, dy1, K); R.linea(dx0 + w + 1, dy0, dx0 + w + 1, dy1, hex('#2a2a30'));
  };
  puerta();
  if (t >= ENTRA && t < ENTRA + 0.55) { carter(); leaf(); }
  else if (t < ENTRA) { leaf(); carter(); }
  else leaf();
  T.cairoDelante(R, t, o);
};

const efectos = [[wm(5.55), 'viento'], [wm(7.8), 'maquina'], [wm(8.9), 'papel'], [wm(9.5), 'papel'], [wm(11.3), 'papel'], [SIENTA, 'miau'], [ABRE, 'puerta'], [CIERRA + 0.4, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P4 ? 1923 : N(lerp(1923, 1939, ease(tramo(t, P4 + 0.1, P4 + 0.8))))) });
''')

E['tu-escaneo'] = ('El escaneo', '''// TU-ESCANEO (frases 10–11), cartela «2015»; la barra dice 2009 (el escaneo), 2014 (la copia) y 2015 (Reeves). Ocho
// planos, cortados en la palabra inglesa:
// 1. (tras la cartela) la cola de turistas a la entrada de la tumba, de lado, con su aliento: el primero entra por la
//    boca, la cola avanza a tirones y en «Too many visitors» el guarda la para con la mano y un «!»;
// 2. («To protect it») el escáner en su raíl ante la pared pintada: el carro avanza y deja la malla azul; el técnico
//    lo acompaña andando y en «scanned» se vuelve y la señala; la técnica mira el portátil y habla;
// 3. («every wall») el cabezal de cerca: una mano pulsa el botón (verde), baja la línea roja y la pantallita se llena;
//    en «fractions of a millimeter» se enciende «0.1»;
// 4. («and built an exact copy») la impresora del taller de Madrid de cerca: yeso, relieve y el color en «copy»;
// 5. («next to Carter's old house») la casa de Carter y el pabellón de la copia con su banderola «2014»: el guía baja del
//    autobús con dos turistas, señala la casa en «Carter's», uno hace una foto y van hacia la copia;
// 6. («Egyptologist»; vista libre del taller) Reeves cruza el taller y estudia con su lupa los paneles impresos en
//    «studied those scans» mientras la impresora sigue;
// 7. («noticed») las dos paredes escaneadas: la luz rasante llega en «naked eye»; en «straight lines» salen las rayas
//    rectas de las dos puertas y un brillo las recorre; Reeves señala la oeste y la norte en «two walls»;
// 8. («To him») la arista de cerca: el dedo de Reeves repasa el dintel en «outlines of two doorways» y en «painted
//    over» la pintura vuelve encima.''', r'''
const N = Math.round;
const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c');
const wc = (s) => en('copia', (s - 1.5) / 17.225), wr = (s) => en('rayas', (s - 19.225) / 15.301);
const P2 = wc(5.5), P3 = wc(9.59), P4 = wc(13.39), P5 = wc(16.95), P6 = wr(20.49), P7 = wr(24.21), P8 = wr(30.05);
const globo = (x, y, ic = '!', c = ROJO) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (N(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (N(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | N(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const lupa = (x, y) => { R.linea(x - 6, y + 6, x - 3, y + 3, hex('#5a3a22')); R.linea(x - 5, y + 6, x - 3, y + 4, hex('#3a2414')); R.disco(x, y, 5, K); R.disco(x, y, 4, hex('#9ab8c4')); R.disco(x, y, 3, hex('#d4eef8')); R.pset(x - 1, y - 2, BL); R.pset(x - 2, y - 1, BL); R.pset(x - 2, y - 2, BL); };

// 1 · la cola: entra uno, la cola avanza a tirones y el guarda la para en «Too many visitors»
const COLA = [EL.turista1, EL.chica, EL.senor30, EL.turista2, EL.sudadera, EL.senora30, EL.chico];
const PARA = wc(4.56);
const q1 = (t) => {
  const o = { encuadre: 'entrada', camara: 'cola', aliento: lerp(0.3, 0.6, tramo(t, 1.3, P2)) };
  T.valle(R, t, o);
  // el guarda, un paso por detrás de la cola, junto a la boca
  const para = t > PARA - 0.1;
  R.actor(EL.guarda, 232, 161, t, { dir: -1, dedo: para, sorpresa: para && t < PARA + 0.4, habla: t > 2.0 && t < 2.6 });
  const pasa = tramo(t, 1.7, 2.9), tiron = tramo(t, 2.5, 3.3), tiron2 = tramo(t, 3.7, 4.2);
  COLA.forEach((d, k) => {
    if (k === COLA.length - 1) {   // el primero entra por la boca
      if (pasa >= 1) return;
      R.recorte([0, 0, 262, 179]); R.actor(d, N(lerp(196, 266, pasa)), 166, t, { dir: 1, anda: pasa > 0 }); R.recorte(null); return;
    }
    const x = N(18 + k * 28 + tiron * 22 + tiron2 * 6 * (k > 2 ? 1 : 0)), mueve = (tiron > 0 && tiron < 1) || (tiron2 > 0 && tiron2 < 1 && k > 2);
    R.actor(d, x, 166, t, { dir: 1, anda: mueve, sorpresa: para && k === COLA.length - 2 && t < PARA + 0.6, triste: para && k < 3, dedo: k === 2 && t > 2.0 && t < 2.6,
      sostiene: k === 1 && t > 2.9 && t < 4.4 ? [x + 13, 145] : k === 4 ? [x + 16, 148 - N(Math.abs(Math.sin(t * 9)) * 3)] : undefined });
    if (k === 1 && t > 2.9 && t < 4.4) { R.rect(x + 12, 137, x + 14, 144, hex('#bfe4f4')); R.rect(x + 12, 136, x + 14, 136, hex('#3a6ac8')); R.pset(x + 12, 140, BL); }   // bebe agua
    if (k === 4) { const fy = 144 - N(Math.abs(Math.sin(t * 9)) * 3); R.rect(x + 15, fy - 6, x + 21, fy, K); R.rect(x + 16, fy - 5, x + 20, fy - 1, hex('#e8d8a0')); R.pset(x + 18, fy - 3, hex('#3a8a4a')); R.pset(x + 17, fy - 4, ROJO); }   // se abanica con el plano
  });
  if (para) globo(236, 128, '!');
  T.valleDelante(R, t, o);
};

// 2 · el escáner en su raíl: el técnico acompaña el carro y señala la malla en «scanned»
const q2 = (t) => {
  const pas = (s) => lerp(0.34, 0.8, tramo(s, P2 + 0.15, P3 - 0.15)), u = tramo(t, P2 + 0.15, P3 - 0.15), o = { encuadre: 'escaner', pasada: pas(t) };
  const g = T.escaneo(R, t, o), cx = g.carro ? g.carro[0] : 40 + 212 * o.pasada;
  const senala = t > wc(9.25) - 0.1;
  R.actor(EL.tecnica, 66, 170, t, { dir: -1, habla: t > wc(7.5) && t < wc(8.6), sonrisa: t > wc(8.9), dedo: t > wc(8.9) && t < wc(9.5) });
  R.actor(EL.tecnico, senala ? N(40 + 212 * pas(wc(9.25) - 0.1) - 27) : N(cx - 27), 170, t, { dir: senala ? -1 : 1, anda: u > 0 && u < 1 && !senala, dedo: senala });
  T.escaneoDelante(R, t, o);
};

// 3 · el cabezal: la mano pulsa, baja la línea roja y en «fractions of a millimeter» sale 0.1
const PULSA = P3 + 0.55, CIFRA = wc(12.2);
const q3 = (t) => {
  const o = { encuadre: 'escaner', camara: 'cabezal', barrido: 0.13 + 0.87 * tramo(t, PULSA + 0.25, P4 - 0.2) };
  T.escaneo(R, t, o);
  // el botón de marcha (rojo → verde) en la chapa del cabezal
  const on = t > PULSA;
  R.disco(298, 68, 4, K); R.disco(298, 68, 3, hex('#5a5e66')); R.disco(298, 68, 2, on ? hex('#4ad86a') : hex('#d84a3a')); R.pset(297, 67, on ? hex('#c8ffd0') : hex('#ffb0a0'));
  // la mano del técnico (manga gris) entra por la derecha, pulsa y se va
  const ent = tramo(t, P3 + 0.05, PULSA), sal = tramo(t, PULSA + 0.25, PULSA + 0.75), k = ease(ent) * (1 - ease(sal));
  if (k > 0) { const wx = N(lerp(340, 312, k)), wy = N(lerp(84, 70, k)); T.brazo(R, wx + 26, wy + 14, wx, wy, '#6a7480', -1, {}); }
  // la cifra: décimas de milímetro
  if (t > CIFRA) { const a = tramo(t, CIFRA, CIFRA + 0.25); R.rect(254, 92, 304, 106, K); R.rect(255, 93, 303, 105, hex('#0e1a12'));
    if (a > 0.5 || Math.floor(t * 12) % 2) R.numero('0.1', 279, 103, { color: hex('#6af08a'), centro: true, sombra: false }); }
};

// 4 · la impresora: yeso, relieve y el color en «exact copy»
const q4 = (t) => { const o = { encuadre: 'taller', camara: 'impresora', capas: tramo(t, P4 + 0.15, P4 + 2.1) }; T.escaneo(R, t, o); T.escaneoDelante(R, t, o); };

// 5 · la casa de Carter y la copia (2014): el guía señala la casa en «Carter's»
const CASA = wc(17.45);
const banderola = (t) => {
  const ond = (x) => N(Math.sin(t * 4 + x * 0.25) * 1);
  R.linea(194, 96, 194, 118, hex('#5a5048')); R.linea(242, 96, 242, 118, hex('#5a5048'));
  for (let x = 196; x <= 240; x++) { const d = ond(x); R.pset(x, 97 + d, K); R.pset(x, 109 + d, K); for (let y = 98; y <= 108; y++) R.pset(x, y + d, (x + y) % 9 === 0 ? hex('#e8d8b0') : hex('#f4ead0')); R.pset(x, 108 + d, hex('#c8a060')); }
  R.numero('2014', 219, 106, { color: hex('#2a4a8a'), centro: true, sombra: false });
};
const q5 = (t) => {
  const o = { encuadre: 'replica' };
  T.escaneo(R, t, o);
  banderola(t);
  const ida = tramo(t, P5 - 0.3, wc(17.85)), vuelta = tramo(t, wc(18.9), P6 + 0.4);
  const grupo = [[EL.guia, 0], [EL.turista1, 18], [EL.chica, 34]];
  grupo.forEach(([d, dx], k) => {
    const x = N(lerp(196 + dx, 148 + dx, ida) + vuelta * 34), anda = (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), dir = vuelta > 0 ? 1 : -1;
    const ao = { dir, anda };
    if (k === 0) { ao.dedo = t > wc(17.85) && t < wc(18.8); ao.habla = t > CASA + 0.2 && t < wc(18.4); }
    if (k === 1) { ao.sorpresa = t > CASA + 0.2 && t < CASA + 0.9; ao.sonrisa = t > CASA + 0.9; }
    if (k === 2 && t > wc(17.8) && t < wc(18.7)) { ao.sostiene = [x - 2, 147]; }
    const a = R.actor(d, x, 168, t, ao);
    if (ao.sostiene) { const [mx, my] = a.mano; R.rect(mx - 3, my - 3, mx + 2, my + 1, K); R.rect(mx - 2, my - 2, mx + 1, my, hex('#5a6a8a')); R.pset(mx - 3, my - 1, hex('#c8d8f0'));
      if (t > wc(18.15) && t < wc(18.3)) { R.disco(mx - 4, my - 2, 4, hex('#fff8d0')); R.disco(mx - 4, my - 2, 2, BL); } }
  });
  T.escaneoDelante(R, t, o);
};

// 6 · (vista libre) el taller: Reeves cruza y estudia los paneles impresos con su lupa en «studied those scans»
const ESTUDIA = wr(22.8);
const q6 = (t) => {
  const o = { encuadre: 'taller', imprime: lerp(0.35, 0.95, tramo(t, P6, P7)) };
  T.escaneo(R, t, o);
  const an = tramo(t, P6, ESTUDIA - 0.2), x = N(lerp(84, 204, an)), est = t > ESTUDIA;
  const sube = est ? Math.sin((t - ESTUDIA) * 1.6) * 8 : 0;
  const ro = { dir: 1, anda: an > 0 && an < 1, sorpresa: t > wr(23.9) };
  if (est) ro.sostiene = [x + 19, N(140 - tramo(t, ESTUDIA, ESTUDIA + 0.3) * 10 - sube)];
  const r = R.actor(T.ELENCO_TU.reevesTU, x, 168, t, ro);
  if (est) { const lx = r.mano[0] + 6, ly = r.mano[1] - 6; lupa(lx, ly);
    // lo que la lupa encuentra: un destello en el panel y la duda
    if (Math.floor(t * 6) % 3 === 0) { R.pset(lx + 1, ly - 1, BL); R.pset(lx + 2, ly, hex('#fff0a0')); }
    if (t > wr(23.4)) globo(r.cabeza[0] - 2, r.cabeza[1] - 10, '?', hex('#2a6ac8')); }
  T.escaneoDelante(R, t, o);
};

// 7 · las dos paredes: la luz rasante, las rayas rectas y Reeves que las señala en «two walls»
const RAYAS = wr(26.99), OESTE = wr(28.5), NORTE = wr(28.95);
const filo = (x0, y0, x1, y1, u, brillo) => {   // dintel y jambas con su luz y su sombra; u = cuánto se ha trazado
  const tramos = [[x0, y1, x0, y0], [x0, y0, x1, y0], [x1, y0, x1, y1]], largo = (y1 - y0) * 2 + (x1 - x0);
  let hecho = u * largo, pos = brillo * largo, acc = 0;
  for (const [a, b, c, d] of tramos) { const n = Math.abs(c - a) + Math.abs(d - b);
    for (let i = 0; i <= n; i++) { if (acc + i > hecho) return; const x = a + Math.sign(c - a) * i, y = b + Math.sign(d - b) * i, hor = b === d;
      const cerca = brillo > 0 && Math.abs(acc + i - pos) < 6;
      const lx = hor ? x : x - 1, ly = hor ? y - 1 : y, sx = hor ? x : x + 1, sy = hor ? y + 1 : y;
      R.pset(lx, ly, mez(R.pget(lx, ly), cerca ? hex('#ffffff') : hex('#f0f0ec'), cerca ? 1 : 0.75)); R.pset(sx, sy, mez(R.pget(sx, sy), hex('#18181c'), 0.7)); R.pset(x, y, mez(R.pget(x, y), hex('#5a5a60'), 0.5)); }
    acc += n; }
};
const q7 = (t) => {
  const o = { encuadre: 'rasante', luzRasante: ease(tramo(t, P7 + 0.2, wr(26.3))), rectangulos: 0.3 * tramo(t, RAYAS - 0.05, RAYAS + 0.6) };
  const g = T.escaneo(R, t, o);
  const [nx0, ny0, nx1, ny1] = g.norte || [168, 52, 232, 148], [ox0, oy0, ox1, oy1] = g.oeste || [30, 82, 70, 148];
  const un = tramo(t, RAYAS, RAYAS + 0.9), uo = tramo(t, RAYAS + 0.3, RAYAS + 1.2);
  const bn = t > NORTE ? tramo(t, NORTE, NORTE + 0.9) : tramo(t, RAYAS + 0.9, RAYAS + 1.7), bo = t > OESTE && t < NORTE + 0.3 ? tramo(t, OESTE, OESTE + 0.6) : 0;
  if (un > 0) filo(nx0, ny0, nx1, ny1 - 1, un, bn > 0 && bn < 1 ? bn : 0);
  if (uo > 0) filo(ox0, oy0, ox1, oy1 - 1, uo, bo > 0 && bo < 1 ? bo : 0);
  // Reeves: estudia en el atril, cruza, se sorprende en «straight lines» y señala cada pared en «two walls»
  const an = tramo(t, wr(25.2), wr(26.6)), x = N(lerp(256, 136, ease(an)));
  const dir = an <= 0 ? 1 : t > OESTE && t < NORTE ? -1 : t >= NORTE ? 1 : -1;
  R.actor(T.ELENCO_TU.reevesTU, x, 168, t, { dir, anda: an > 0 && an < 1, sorpresa: t > RAYAS && t < OESTE - 0.1, dedo: t > OESTE && t < wr(29.7), habla: t > wr(29.3) });
  T.escaneoDelante(R, t, o);
};

// 8 · la arista de cerca: el dedo repasa el dintel; en «painted over» vuelve la pintura
const q8 = (t) => { const o = { encuadre: 'rasante', camara: 'linea', dedo: ease(tramo(t, P8 + 0.5, wr(33.3))), color: tramo(t, wr(33.65), wr(34.6)) }; T.escaneo(R, t, o); T.escaneoDelante(R, t, o); };

const efectos = [[P2 + 0.2, 'motor'], [wc(9.25), 'bip'], [PULSA, 'interruptor'], [CIFRA, 'bip'], [P4 + 0.2, 'maquina'], [wc(18.15), 'flash'],
  [ESTUDIA, 'brillo'], [RAYAS, 'brillo'], [wr(33.7), 'brillo']];
T.rodar(E, R, [[0, q1], [P2, q2], [P3, q3], [P4, q4], [P5, q5], [P6, q6], [P7, q7], [P8, q8]], {
  cartela: '2015', efectos, año: (t) => (t < P4 ? 2009 : t < P6 ? 2014 : 2015),
});
''')
