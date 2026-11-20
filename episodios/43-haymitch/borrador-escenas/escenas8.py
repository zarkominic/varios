E = {}
E['hm-precio'] = ('El precio', '''// HM-PRECIO (frases 28–31), Juegos 50 (año: 50), sin cartela. Trece planos:
// 1. la casa quemada de lejos, con humo; dos vecinos miran las ruinas; Haymitch llega corriendo y se para en «gone»; los
//    vecinos se vuelven, ella baja la cabeza y él se le acerca dos pasos;
// 2. el porche caído de cerca, con pavesas que suben; Haymitch recoge del barro la taza de hojalata del decorado (que
//    deja de pintarla con o.taza false y pasa a su mano) («his mother»); una
//    vecina llega con un cubo y baja la cabeza;
// 3. el despacho de Snow de noche: Snow huele su rosa blanca y sonríe («Snow's deal»); el agente entra y saluda; en «he
//    didn't die» Snow le empuja la bolsa roja por la mesa, el agente la coge y se va con ella;
// 4. la Veta al atardecer: Haymitch llega y espera; una vecina con su cubo y un minero cruzan al fondo; el agente le da
//    la bolsa roja («a bag reaches»);
// 5. el Quemador: Lenore Dove canta junto a su guitarra; Haymitch llega y le da la bolsa («gives»);
// 6. el prado al amanecer: los dos en el tronco, ella apoyada en él («dies in his arms», «asks»); la bolsa roja con su lazo
//    en la hierba (la del decorado, o.gominolas); cuando ella se apoya, una gominola rueda despacio; las ocas quietas; el sol sale;
// 7. la plaza de la cosecha al amanecer: un agente pasa ante el escenario; dos chicos suben por el pasillo y se paran a
//    mirar el sol ya alto en las pantallas («sunrise of the title»); la luz se dora;
// 8. la Aldea de los Vencedores de noche: Haymitch la cruza, se para a beber de la petaca («drinking») y sigue hasta su
//    puerta; al fondo, un agente hace la ronda con su farol;
// 9. dentro de su casa grande (fondo local): la mesa con monedas y la silla vacía; en «all the money» una moneda rueda y
//    cae por el borde y rueda por el suelo, él la mira; abre la primera botella («no one») y Atom se apaga; una polilla ronda el quinqué;
// 10. un porche de la Veta de día: Burdock sale a llamarle y Haymitch pasa de largo por delante («Burdock»); una niña
//     salta a la comba al fondo y se para a mirar;
// 11. la Gira de la Victoria: el escenario con guirnaldas, confeti, urnas vacías y la corona del vencedor en las
//     pantallas; Haymitch sonríe a la fuerza y saluda («smile»), Effie aplaude, Plutarch filma (flash);
// 12. la recepción en casa del alcalde: un criado cruza con la bandeja de copas; Plutarch deja su cámara en el trípode y
//     le pone la mano en el hombro («Plutarch, the cameraman»);
// 13. la sala del mapa: Plutarch entra por la izquierda, se para junto a la mesa y señala el 12, que se enciende («Panem
//     will need»). hm-culpa congela este final (mundoPrecio): si cambia, cambia allí también.''', r'''
const a = (f) => en('casa', f), b = (f) => en('gominola', f), c = (f) => en('amanecer', f), d = (f) => en('gira', f);
const P2 = a(0.3684), P3 = a(0.7038), P4 = b(0), P5 = b(0.3506), P6 = b(0.6407), P7 = b(0.882), P8 = c(0.1824), P9 = c(0.5608);
const P10 = d(0), P11 = d(0.2027), P12 = d(0.5327), P13 = d(0.7776);
const gone = a(0.1505), madre = a(0.4254), snowW = a(0.8042), noMurio = a(0.927);
const bolsa = b(0.2566), llega = b(0.2908), da = b(0.5034), muere = b(0.6594), pide = b(0.7955), sol1 = b(0.8977), sol2 = c(0.0383);
const bebe = c(0.3698), dinero = c(0.7483), nadie = c(0.8716), apaga = c(0.9618);
const burdock = d(0.0798), sonrie = d(0.3225), anima = d(0.5705), plutarch = d(0.6956), panem = d(0.8886), alguien = d(0.934);
const habla = (t) => Math.sin(t * 9) > -0.2;
const AT_esc = (f, w, h, X, Y, s) => T.AT.escalado(R, f, w, h, X, Y, s);
const anda = (t, t0, t1, x0, x1) => { const u = tramo(t, t0, t1); return [Math.round(lerp(x0, x1, u)), u > 0 && u < 1]; };
const ROJO = hex('#d8343a'), ROJOS = hex('#8a1c24'), ROJOL = hex('#f07a6a'), K = hex('#1c1222');
// la bolsita de papel rojo de las gominolas (centro abajo en x, y), con el doblez y un brillo
const bolsita = (x, y) => {
  x = Math.round(x); y = Math.round(y);
  R.poligono([[x - 4, y], [x - 4, y - 6], [x - 2, y - 8], [x - 2, y - 10], [x + 2, y - 10], [x + 2, y - 8], [x + 4, y - 6], [x + 4, y]], K);
  R.poligono([[x - 3, y - 1], [x - 3, y - 6], [x - 1, y - 8], [x + 1, y - 8], [x + 3, y - 6], [x + 3, y - 1]], ROJO);
  R.rect(x + 2, y - 6, x + 3, y - 1, ROJOS); R.pset(x - 2, y - 5, ROJOL); R.pset(x - 2, y - 4, ROJOL);
  R.rect(x - 1, y - 10, x + 1, y - 9, hex('#f0c840')); R.pset(x - 2, y - 11, hex('#f0c840')); R.pset(x + 2, y - 11, hex('#f0c840'));   // el lazo dorado del doblez
};
// la camarita de Plutarch (de mano, con su objetivo y el piloto rojo), en la mano (x, y)
const camarita = (x, y, dir, t) => {
  x = Math.round(x); y = Math.round(y); const X = (i) => dir > 0 ? x + i : x - i;
  R.rect(Math.min(X(-3), X(5)), y - 4, Math.max(X(-3), X(5)), y + 1, K);
  R.rect(Math.min(X(-2), X(4)), y - 3, Math.max(X(-2), X(4)), y, hex('#4a4a56'));
  R.rect(Math.min(X(5), X(8)), y - 3, Math.max(X(5), X(8)), y, K); R.pset(X(7), y - 2, hex('#8ad8ff'));
  R.pset(X(-1), y - 3, Math.sin(t * 5) > 0 ? hex('#ff3030') : hex('#6a2020'));
};

// ── p9: el salón grande y vacío de la casa de la Aldea, de noche (fondo local, en un búfer) ──
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
let F9 = null;
const fondo9 = () => {
  if (F9) { R.copiar(F9); return; }
  F9 = R.nuevo(); const prev = R.usar(F9);
  const { rect, pset, linea, disco } = R;
  // papel pintado ciruela con damasco (rombos con flor) y su trama; la esquina de arriba a la derecha, lisa
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) {
    const cx = ((x + (Math.floor(y / 18) % 2) * 10) % 20) - 10, cy = (y % 18) - 9, r = Math.abs(cx) + Math.abs(cy) * 1.1;
    let c = hh(x, y) < 0.18 ? '#352c40' : '#3c3248';
    if (x > 270 && y < 50) c = hh(x, y) < 0.1 ? '#383044' : '#3a3146';
    else if (r > 7 && r < 8.2) c = '#4a3e58'; else if (r < 2.2) c = '#54465f';
    pset(x, y, hex(c));
  }
  rect(0, 0, 319, 4, hex('#5a4a3a')); rect(0, 5, 319, 6, hex('#2a2018')); rect(0, 2, 319, 2, hex('#7a6448'));
  // el friso de madera con paneles (vetas) y el rodapié
  rect(0, 116, 319, 145, hex('#4a2e1e')); rect(0, 116, 319, 118, hex('#6a4430')); rect(0, 119, 319, 119, hex('#2a1810'));
  for (let x0 = 4; x0 < 320; x0 += 40) { rect(x0, 123, x0 + 33, 140, hex('#3e2618')); rect(x0 + 1, 124, x0 + 32, 139, hex('#553522'));
    for (let k = 0; k < 4; k++) { const yy = 127 + k * 3 + Math.round(hh(x0, k) * 2); for (let x = x0 + 3; x < x0 + 31; x++) if (hh(x, yy + k) > 0.3) pset(x, yy + Math.round(Math.sin(x * 0.3 + k) * 0.6), hex('#4a2c1c')); }
    linea(x0 + 1, 139, x0 + 32, 139, hex('#6a4632')); }
  rect(0, 144, 319, 147, hex('#2a1a10'));
  // el suelo de tablas en perspectiva, encerado
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) {
    const v = (x - 160) / (1 + (y - 148) * 0.06), tabla = Math.floor((v + 400) / 14);
    let c = (tabla % 2) ? '#5a3a24' : '#664430'; if (Math.abs(((v + 400) % 14)) < 0.9) c = '#3a2416'; else if (hh(x, y, tabla) < 0.12) c = '#4e3220';
    pset(x, y, hex(c));
  }
  // la ventana alta (el exterior va en vivo, recortado): marco, alféizar, contraventanas
  rect(20, 22, 86, 104, hex('#e8dcc4')); rect(22, 24, 84, 102, hex('#1a1a2e')); rect(16, 102, 90, 106, hex('#d8ccb0')); rect(16, 106, 90, 107, hex('#8a7a60'));
  // la chimenea de mármol, fría: repisa, boca negra con la rejilla y ceniza, y el espejo dorado encima
  rect(194, 72, 274, 76, hex('#d8d0c8')); rect(194, 76, 274, 77, hex('#8a8288')); rect(200, 77, 268, 145, hex('#c8c0c0'));
  for (let k = 0; k < 40; k++) { const x = 201 + Math.floor(hh(k, 3) * 66), y = 78 + Math.floor(hh(k, 9) * 66); linea(x, y, x + 4, y + 2, hex('#a8a0a8')); }
  rect(214, 92, 254, 145, hex('#16121a')); disco(234, 92, 20, hex('#16121a')); rect(212, 141, 256, 145, hex('#2a2428'));
  for (let x = 218; x < 252; x += 4) linea(x, 128, x, 140, hex('#4a4448')); linea(216, 128, 252, 128, hex('#4a4448'));
  for (let x = 218; x < 252; x++) { const y = 140 - Math.round(hh(x, 1) * 3); linea(x, y, x, 141, hex(hh(x, 2) < 0.5 ? '#7a7478' : '#5a5458')); }
  rect(212, 22, 256, 66, hex('#a87a28')); rect(214, 24, 254, 64, hex('#e8b830')); rect(217, 27, 251, 61, hex('#2e2a3a'));
  for (let y = 28; y < 61; y++) for (let x = 218; x < 251; x++) if (hh(x, y) < 0.07) pset(x, y, hex('#4a4458'));
  linea(222, 58, 236, 30, hex('#5a5468')); linea(230, 58, 244, 34, hex('#4a4458'));
  // un candelabro apagado y el reloj de repisa a los lados
  for (const cx of [200, 266]) { rect(cx - 1, 60, cx + 1, 71, hex('#c8a040')); rect(cx - 3, 70, cx + 3, 71, hex('#a87a28')); rect(cx - 1, 54, cx + 1, 59, hex('#efe6d0')); pset(cx, 53, hex('#2a2018')); }
  // la cómoda de la izquierda de la mesa, con la caja fuerte abierta y llena encima
  rect(96, 86, 150, 116, hex('#3a2416')); rect(98, 88, 148, 114, hex('#5a3a24')); for (const y of [94, 103]) { linea(98, y, 148, y, hex('#2a1810')); disco(123, y + 4, 1, hex('#c8a040')); }
  // cuadros: dos marcos vacíos (los de la familia, que ya no están) con el papel más claro
  for (const [x0, y0] of [[118, 30], [152, 36]]) { rect(x0, y0, x0 + 22, y0 + 28, hex('#8a6a30')); rect(x0 + 2, y0 + 2, x0 + 20, y0 + 26, hex('#4a3e58')); rect(x0 + 3, y0 + 3, x0 + 19, y0 + 25, hex('#44395a')); pset(x0 + 11, y0 - 3, hex('#c8a040')); linea(x0 + 11, y0 - 3, x0 + 2, y0, hex('#8a7a60')); linea(x0 + 11, y0 - 3, x0 + 20, y0, hex('#8a7a60')); }
  // una telaraña en la esquina de la ventana
  for (let k = 0; k < 5; k++) linea(86, 22, 86 + 10 - k * 2, 22 + k * 3, hex('#6a6278'));
  R.usar(prev); R.copiar(F9);
};
const salon9 = (t) => {
  fondo9();
  const { rect, pset, linea, disco } = R;
  // el exterior por la ventana: el cielo de noche, estrellas, la luna, nubes y la casa vecina vacía, recortado
  R.recorte([22, 24, 84, 102]);
  for (let y = 24; y < 103; y++) linea(22, y, 84, y, hex(y < 60 ? '#141a38' : y < 84 ? '#1c2448' : '#24305a'));
  for (let k = 0; k < 14; k++) { const x = 24 + Math.floor(hh(k, 5) * 58), y = 26 + Math.floor(hh(k, 6) * 40); if (Math.sin(t * 3 + k) > -0.4) pset(x, y, hex('#e8ecff')); }
  disco(66, 38, 6, hex('#f4f0d8')); disco(68, 36, 5, hex('#141a38'));
  for (const [v, y, w, c] of [[3, 44, 22, '#3a4270'], [5, 52, 16, '#2e3660']]) { const x = 22 + ((t * v + y * 3) % 90) - 20; for (let i = 0; i < w; i++) linea(Math.round(x + i), y + Math.round(Math.sin(i * 0.5) * 1.5), Math.round(x + i), y + 3, hex(c)); }
  R.poligono([[22, 70], [44, 58], [70, 58], [84, 66], [84, 103], [22, 103]], hex('#2a2a3e'));
  for (const wx of [32, 50, 68]) { R.poligono([[wx, 76], [wx + 6, 76], [wx + 6, 86], [wx, 86]], hex('#161a2a')); }
  R.poligono([[22, 96], [84, 96], [84, 103], [22, 103]], hex('#1e2a2a'));
  linea(40, 72, 40, 96, hex('#3a3a4a')); disco(40, 71, 2, hex(Math.sin(t * 6) > -0.8 ? '#ffe090' : '#c8a050'));
  R.recorte(null);
  rect(52, 24, 54, 102, hex('#e8dcc4')); rect(22, 61, 84, 63, hex('#e8dcc4'));
  // las cortinas pesadas, que se mecen con la corriente
  for (const [x0, s] of [[8, 1], [80, -1]]) for (let y = 18; y < 112; y++) { const w = 12 + Math.round(Math.sin(y * 0.08 + t * 0.9) * 1.5 * (y - 18) / 94); for (let i = 0; i < w; i++) { const x = s > 0 ? x0 + i : x0 + 12 - i; pset(x, y, hex(i % 4 === 0 ? '#4a1420' : i % 4 === 2 ? '#8a2a38' : '#6a1e2c')); } }
  rect(4, 16, 96, 19, hex('#c8a040'));
  // el péndulo del reloj de repisa (sobre la chimenea, a la derecha del espejo)
  rect(258, 58, 270, 72, hex('#5a3a24')); disco(264, 62, 4, hex('#efe6d0')); pset(264, 62, hex('#1c1222')); linea(264, 62, 264 + Math.round(Math.cos(t * 1.2) * 3), 60, hex('#1c1222'));
};
// la mesa grande por delante: tablero con vetas, faldón, patas; la silla vacía de enfrente asoma detrás
const mesa9 = (t, mon) => {
  const { rect, pset, linea, disco } = R;
  rect(96, 140, 252, 145, hex('#5a3420')); rect(96, 140, 252, 141, hex('#8a5a38'));
  for (let x = 98; x < 252; x += 3) if (hh(x, 7) > 0.5) pset(x, 142 + Math.round(hh(x, 8) * 2), hex('#6a4028'));
  rect(100, 146, 248, 156, hex('#3e2414')); rect(100, 146, 248, 147, hex('#2a180c'));
  for (const x of [104, 240]) rect(x, 156, x + 5, 176, hex('#3a2212'));
  for (let x = 110; x < 240; x += 26) { rect(x, 149, x + 18, 154, hex('#4a2c18')); disco(x + 9, 151, 1, hex('#c8a040')); }
  // el plato vacío y el vaso del sitio vacío
  disco(214, 139, 7, hex('#d8d4cc')); disco(214, 139, 4, hex('#efece4')); rect(226, 131, 229, 139, hex('#a8c8d8')); pset(227, 132, hex('#ffffff'));
  // el quinqué con su luz que tiembla
  const fl = 0.8 + Math.sin(t * 13) * 0.1 + Math.sin(t * 7.3) * 0.1;
  for (let r = 22; r > 6; r -= 4) for (let a = 0; a < 40; a++) { const p = a / 40 * Math.PI * 2, x = Math.round(108 + Math.cos(p) * r), y = Math.round(118 + Math.sin(p) * r * 0.8); if (hh(x, y, Math.floor(t * 4)) < 0.25 * fl) pset(x, y, hex('#a87848')); }
  rect(104, 132, 112, 139, hex('#8a6a30')); rect(105, 120, 111, 131, hex('#f8e8b0')); rect(106, 122, 110, 129, hex(fl > 0.85 ? '#ffd860' : '#f0b840')); rect(103, 118, 113, 120, hex('#8a6a30'));
  // las pilas de monedas de oro (todo el dinero del mundo) y el cofrecito abierto
  for (let k = 0; k < 5; k++) { const x = 150 + k * 8, n = 3 + ((k * 3) % 5); for (let j = 0; j < n; j++) { rect(x, 139 - j * 2, x + 6, 140 - j * 2, hex('#a87a18')); rect(x, 139 - j * 2, x + 6, 139 - j * 2, hex('#f0c840')); } if (mon > 0 && Math.sin(t * 6 + k) > 0.6) pset(x + 1 + k % 3, 139 - n * 2, hex('#ffffff')); }
  rect(190, 130, 204, 140, hex('#5a3420')); rect(191, 131, 203, 134, hex('#f0c840')); rect(190, 124, 204, 126, hex('#5a3420')); linea(190, 126, 191, 130, hex('#5a3420'));
};
const p9 = (t) => {   // la primera botella, Atom se apaga
  salon9(t);
  // la silla vacía de enfrente
  R.rect(206, 116, 222, 140, hex('#3a2212')); R.rect(208, 118, 220, 122, hex('#5a3a24'));
  const mon = tramo(t, dinero - 0.2, dinero + 0.3);
  const alza = tramo(t, nadie - 0.8, nadie - 0.2), x = 128, suelo = 147;
  const h = R.actor(EL.haymitch, x, suelo, t, { dir: 1, sorpresa: t > dinero + 0.3 && t < dinero + 1.4, triste: t > dinero + 1.4, sostiene: [x + 22, Math.round(lerp(136, 124, alza))] });
  mesa9(t, mon);
  // «all the money in the world»: una moneda resbala de lo alto de una pila, cae por el borde de la mesa al suelo, rueda
  // por las tablas y se queda de plano; él la mira
  { const r = tramo(t, dinero, dinero + 1.6); let x, y;
    if (r < 0.15) { x = lerp(174, 178, r / 0.15); y = lerp(129, 142, r / 0.15); } else if (r < 0.35) { const q = (r - 0.15) / 0.2; x = lerp(178, 184, q); y = lerp(142, 171, q * q); }
    else { const q = (r - 0.35) / 0.65; x = lerp(184, 222, 1 - (1 - q) * (1 - q)); y = 171 - Math.abs(Math.sin(q * 9)) * 3 * (1 - q); }
    x = Math.round(x); y = Math.round(y);
    if (r >= 1) { R.rect(x - 3, y, x + 3, y + 2, K); R.rect(x - 2, y + 1, x + 2, y + 1, hex('#f0c840')); R.pset(x - 1, y + 1, hex('#fff6c0')); }
    else if (r > 0) { const w = Math.abs(Math.round(Math.cos(t * 14) * 2)); R.rect(x - w - 1, y - 3, x + w + 1, y + 3, K); R.rect(x - w, y - 2, x + w, y + 2, hex('#e8b830')); R.pset(x, y - 2, hex('#fff6c0')); } }
  // una polilla que ronda el quinqué
  { const a = t * 3.1, mx = Math.round(108 + Math.cos(a) * 9 + Math.sin(a * 2.3) * 3), my = Math.round(112 + Math.sin(a * 1.4) * 6), al = Math.floor(t * 16) % 2;
    R.pset(mx, my, hex('#c8b898')); R.pset(mx - 1, my - al, hex('#e8dcc0')); R.pset(mx + 1, my - al, hex('#e8dcc0')); }
  // la botella en la mano: vidrio verde oscuro, etiqueta lisa y el corcho que salta en «no one»
  const [bx, by] = h.mano;
  R.rect(bx - 2, by - 8, bx + 2, by + 4, hex('#1c1222')); R.rect(bx - 1, by - 7, bx + 1, by + 3, hex('#2e5a3a')); R.rect(bx - 1, by - 3, bx + 1, by - 1, hex('#d8c8a0')); R.pset(bx - 1, by - 6, hex('#7aaa8a'));
  R.rect(bx - 1, by - 11, bx, by - 8, hex('#1c1222')); R.pset(bx, by - 10, hex('#2e5a3a'));
  const k = tramo(t, nadie, nadie + 0.7);
  const corcho = (cx, cy) => { R.rect(cx - 1, cy - 1, cx + 2, cy + 2, K); R.rect(cx, cy, cx + 1, cy + 1, hex('#d8a45a')); };
  if (t < nadie) corcho(bx - 1, by - 13);
  else if (k < 1) corcho(bx + Math.round(k * 26), by - 13 - Math.round(Math.sin(k * Math.PI) * 22) + Math.round(k * 16));
  else corcho(bx + 26, by + 1);
  if (t > nadie && t < nadie + 0.35) for (let q = 0; q < 6; q++) { const p = q / 6 * Math.PI * 2, r0 = 3 + (t - nadie) * 14; R.linea(Math.round(bx + Math.cos(p) * r0), Math.round(by - 13 + Math.sin(p) * r0), Math.round(bx + Math.cos(p) * (r0 + 3)), Math.round(by - 13 + Math.sin(p) * (r0 + 3)), hex('#fff0b0')); }
  const ap = tramo(t, nadie + 0.1, apaga);
  T.AT.luciernaga(R, 172 + Math.sin(t * 0.9) * 3, 112 - Math.round(ap * 6) + Math.sin(t * 2) * 2, t, { dir: -1, brillo: lerp(0.9, 0.03, ap), cara: t > nadie ? 'triste' : 'normal' });
};
// las pavesas que suben de las ruinas: puntos naranjas que se apagan en gris al subir (x0–x1, desde y0)
const pavesas = (t, x0, x1, y0, n = 18) => { for (let k = 0; k < n; k++) { const f = (t * (0.16 + hh(k, 7) * 0.1) + hh(k, 8)) % 1, x = Math.round(x0 + hh(k, 9) * (x1 - x0) + Math.sin(t * 1.3 + k) * 4 + f * 10), y = Math.round(y0 - f * 70);
  if (y < 22) continue; R.pset(x, y, hex(f < 0.3 ? '#ffb040' : f < 0.6 ? '#c8602a' : '#6a6068')); if (f < 0.2 && Math.sin(t * 9 + k) > 0) R.pset(x, y - 1, hex('#fff0a0')); } };
// el cubo de cinc de la vecina, en la mano (x, y)
const cubo = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 3, y, x + 3, y + 7, K); R.rect(x - 2, y + 1, x + 2, y + 6, hex('#9aa0aa')); R.rect(x - 2, y + 1, x - 1, y + 6, hex('#c8ced8')); R.linea(x - 3, y, x, y - 3, K); R.linea(x, y - 3, x + 3, y, K); };
const p1 = (t) => {   // la casa quemada de lejos; llega corriendo y se para; los vecinos se vuelven
  const o = { encuadre: 'quemada', luz: 'tarde' };
  const g = T.prado(R, t, o);
  // dos vecinos miran las ruinas; cuando llega («gone») se vuelven; él da dos pasos hacia Haymitch y baja la cabeza
  const vuelve = t > gone + 0.25, acerca = tramo(t, gone + 1.3, gone + 2.3);
  R.actor(EL.vecina, 266, g.suelo - 3, t, { dir: vuelve ? -1 : 1, sorpresa: vuelve && t < gone + 0.9, triste: t > gone + 0.9 });
  R.actor(EL.vecino, Math.round(lerp(250, 236, acerca)), g.suelo, t, { dir: vuelve ? -1 : 1, anda: acerca > 0 && acerca < 1, triste: vuelve, habla: t > gone + 2.4 && t < gone + 3.4 && habla(t) });
  const u = tramo(t, 0.2, gone), x = Math.round(lerp(-18, 112, u));
  const paso = t > gone + 1.2 ? tramo(t, gone + 1.2, gone + 2.4) : 0;   // da dos pasos más, despacio, y se queda
  R.actor(EL.haymitch, x + Math.round(paso * 10), g.suelo, t, { dir: 1, anda: (u > 0 && u < 1) || (paso > 0 && paso < 1), salto: u > 0 && u < 1 && Math.floor(t * 8) % 2 ? 1 : 0, sorpresa: t > gone && t < gone + 1.2, triste: t > gone + 1.2 });
  T.AT.luciernaga(R, x - 12 + Math.round(paso * 10) + Math.sin(t * 2) * 3, 126 + Math.sin(t * 3) * 2, t, { dir: 1, brillo: 0.6, cara: t > gone ? 'triste' : 'normal' });
  T.pradoDelante(R, t, o);
};
const p2 = (t) => {   // el porche caído; recoge la taza de hojalata
  const coge = madre;
  // la taza la pinta el decorado en el barro hasta que él la recoge; desde ahí, o.taza false y la pinta la escena en su mano
  const o = { encuadre: 'quemada', camara: 'cerca', luz: 'tarde', taza: t <= coge };
  const g = T.prado(R, t, o), [tx, ty] = g.taza ?? [176, 170];
  pavesas(t, 120, 300, 150);
  // la vecina llega con un cubo de agua (tarde) por la derecha, se para y baja la cabeza cuando él recoge la taza
  const [vx, vv] = anda(t, P2 + 0.3, P2 + 2.6, 336, 268);
  const ve = R.actor(EL.vecina, vx, g.suelo, t, { dir: -1, anda: vv, triste: t > coge, sostiene: [vx - 9, g.suelo - 10] });
  cubo(ve.mano[0], ve.mano[1] + 1);
  const u = tramo(t, P2, coge - 0.2), x = Math.round(lerp(tx - 36, tx - 22, u));
  const alto = tramo(t, coge, coge + 0.5);
  const h = R.actor(EL.haymitch, x, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, triste: true, sostiene: t > coge - 0.3 ? [tx - 2, Math.round(lerp(g.suelo - 4, g.suelo - 14, alto))] : undefined });
  if (t > coge) { const [mx, my] = h.mano; R.rect(mx - 1, my - 5, mx + 5, my + 1, K); R.rect(mx, my - 4, mx + 4, my, hex('#b8bcc8')); R.pset(mx + 1, my - 3, hex('#eef0f8')); R.rect(mx + 5, my - 3, mx + 6, my - 1, hex('#8a8ea0')); }
  const ax = lerp(60, tx + 12, tramo(t, coge, a(0.62)));
  T.AT.luciernaga(R, ax + Math.sin(t * 1.5) * 4, lerp(96, 128, tramo(t, coge, a(0.62))) + Math.sin(t * 2.5) * 2, t, { dir: 1, brillo: 0.5, cara: 'triste' });
  T.pradoDelante(R, t, o);
};
const p3 = (t) => {   // el despacho de Snow de noche: la rosa, el trato; la bolsa roja espera
  const o = { encuadre: 'despacho', luz: 'noche' };
  T.capitolio(R, t, o);
  const huele = tramo(t, snowW - 0.9, snowW - 0.2) - tramo(t, noMurio, noMurio + 0.5);
  const h = R.actor(EL.snow, 160, 133, t, { dir: -1, sonrisa: t > snowW, sostiene: [157, Math.round(lerp(122, 113, huele))] });
  // el agente entra, saluda en «Snow's deal»; en «he didn't die» Snow le empuja la bolsa por la mesa, el agente la coge y se va
  const [x0, va] = anda(t, P3, snowW - 0.1, 300, 240), sale = tramo(t, noMurio + 0.75, P4 + 0.1), x = Math.round(x0 + sale * 52);
  const empuja = tramo(t, noMurio - 0.1, noMurio + 0.3), coge = tramo(t, noMurio + 0.35, noMurio + 0.65);
  const ag = R.actor(EL.agentePaz, x, 168, t, { dir: sale > 0 ? 1 : -1, anda: va || (sale > 0 && sale < 1), dedo: t > snowW && t < snowW + 0.8, sostiene: t > noMurio + 0.3 ? [x - 8, 150] : undefined });
  T.capitolioDelante(R, t, o);
  T.PIEZAS_JH.rosaBlanca(R, h.mano[0], h.mano[1] + 3, {});
  const brilla = t > noMurio && Math.sin(t * 8) > 0 && coge < 1;
  const bxM = lerp(204, 222, empuja), byM = 128;
  if (coge <= 0) bolsita(bxM, byM); else bolsita(lerp(bxM, ag.mano[0], coge), lerp(byM, ag.mano[1] + 5, coge) - Math.sin(coge * Math.PI) * 5);
  if (brilla) { const bx = Math.round(bxM); R.pset(bx - 6, 119, hex('#fff0a0')); R.pset(bx + 6, 119, hex('#fff0a0')); R.pset(bx, 116, hex('#fff0a0')); }
  T.AT.luciernaga(R, 56 + Math.sin(t * 1.2) * 4, 96 + Math.sin(t * 2.2) * 2, t, { dir: 1, brillo: 0.5, cara: t > snowW ? 'sorpresa' : 'normal' });
};
const p4 = (t) => {   // un agente de la paz cruza la Veta y le da la bolsa roja
  const o = { encuadre: 'calle', luz: 'tarde' };
  const g = T.distrito(R, t, o);
  const tiene = t > llega;
  // al fondo, una vecina vuelve del pozo con el cubo y un minero (el vecino) cruza hacia la mina
  const [fx, fv] = anda(t, P4, P5, 300, 150); const fe = R.actor(EL.vecina, fx, g.suelo - 16, t, { dir: -1, anda: fv, sostiene: [fx - 9, g.suelo - 26] }); cubo(fe.mano[0], fe.mano[1] + 1);
  const [mx, mv] = anda(t, P4 + 1.2, P5 - 0.3, 40, 230); R.actor(EL.vecino, mx, g.suelo - 12, t, { dir: 1, anda: mv });
  // Haymitch llega por la izquierda, despacio, y espera; la sorpresa cuando le dan la bolsa
  const [hx, hv] = anda(t, P4 + 0.1, P4 + 1.7, -16, 74);
  R.actor(EL.haymitch, hx, g.suelo, t, { anda: hv, dir: 1, triste: !tiene || t > llega + 1.4, sorpresa: tiene && t < llega + 1.4, sostiene: tiene ? [hx + 20, g.suelo - 12] : undefined });
  const ida = tramo(t, P4 + 0.5, bolsa - 0.1), vuelta = tramo(t, llega + 1.4, P5 - 0.2);
  const ax = Math.round(lerp(334, hx + 20, ida) + lerp(0, 260, vuelta));
  const ag = R.actor(EL.agentePaz, ax, g.suelo, t, { dir: vuelta > 0 ? 1 : -1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), sostiene: !tiene ? [ax - 6, g.suelo - 12] : undefined });
  if (!tiene) bolsita(ag.mano[0], ag.mano[1] + 5); else bolsita(hx + 22, g.suelo - 7);
  T.AT.luciernaga(R, 52 + Math.sin(t * 1.4) * 4, 100 + Math.sin(t * 2.6) * 2, t, { dir: 1, brillo: 0.7, cara: tiene ? 'sorpresa' : 'normal' });
  T.distritoDelante(R, t, o);
};
// notas de música (símbolos) que suben desde (x, y)
const notas = (t, x, y) => { for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1, nx = Math.round(x + Math.sin(f * 6 + k) * 4 + k * 5), ny = Math.round(y - f * 26); if (f > 0.85) continue; R.rect(nx, ny, nx + 1, ny + 1, hex('#f8e8a8')); R.rect(nx + 1, ny - 5, nx + 1, ny, hex('#f8e8a8')); R.pset(nx + 2, ny - 5, hex('#f8e8a8')); } };
const p5 = (t) => {   // el Quemador: el Covey toca; le da la bolsa a Lenore Dove
  const o = { encuadre: 'quemador' };
  const g = T.distrito(R, t, o);
  // la vendedora que cruza al fondo con un cesto, y un comprador que se para en un puesto
  const [vx, vv] = anda(t, P5, P6, 250, 196); R.actor(EL.vendedoraHob, vx, g.suelo - 6, t, { dir: -1, anda: vv });
  T.PIEZAS_JH.guitarra(R, 206, g.suelo - 1, {});
  notas(t, 196, g.suelo - 26);
  const l = R.actor(EL.lenore, 180, g.suelo, t, { dir: -1, sonrisa: true, habla: t < da - 1 && habla(t), sostiene: t > da ? [176, g.suelo - 12] : undefined });
  const [x, va] = anda(t, P5 + 0.2, da - 0.5, 40, 152);
  const h = R.actor(EL.haymitch, x, g.suelo, t, { dir: 1, anda: va, sonrisa: t > da, sostiene: t < da ? [x + 20, g.suelo - 12] : undefined });
  if (t < da) bolsita(h.mano[0], h.mano[1] + 4); else bolsita(l.mano[0], l.mano[1] + 4);
  T.AT.luciernaga(R, 226 + Math.sin(t * 1.4) * 5, 112 + Math.sin(t * 2.6) * 2, t, { dir: -1, brillo: 0.8, cara: t > b(0.56) ? 'sorpresa' : 'sonrisa' });
  T.distritoDelante(R, t, o);
};
const p6 = (t) => {   // el prado al amanecer: ella apoyada en él, la bolsa en la hierba, las ocas quietas, el sol que sale
  // la bolsa roja de las gominolas en la hierba la pinta el decorado (o.gominolas: lazo dorado y gominolas desparramadas)
  const o = { encuadre: 'prado', luz: 'amanecer', sentados: true, ocasQuietas: true, sol: lerp(0.6, 0.3, tramo(t, P6, P7 + 0.4)), gominolas: [64, 176] };
  const g = T.prado(R, t, o);
  const [ax0, ay0] = g.asientos[0], [ax1, ay1] = g.asientos[1];
  const apoya = tramo(t, muere - 0.2, muere + 0.6);
  R.actor(EL.lenore, ax0 + 2 + Math.round(apoya * 5), ay0 + Math.round(apoya * 2), t, { dir: 1, triste: apoya > 0.5, habla: t > pide && t < pide + 1.3 && habla(t), quieto: apoya > 0.9 && !(t > pide && t < pide + 1.3) });
  R.actor(EL.haymitch, ax1, ay1, t, { dir: -1, triste: true, sostiene: apoya > 0.3 ? [ax0 + 12, ay0 - 8] : undefined });
  T.pradoDelante(R, t, o);
  // cuando ella se apoya en él («dies in his arms») una gominola más se escapa de la bolsa y rueda despacio por la hierba
  const rueda = tramo(t, muere - 0.2, muere + 1.0);
  { const gx = Math.round(90 + rueda * 9), gy = 175; R.disco(gx, gy, 2, K); R.rect(gx - 1, gy - 1, gx + 1, gy + 1, ROJO); R.pset(gx - 1, gy - 1, ROJOL); }
  T.AT.luciernaga(R, 124 + Math.sin(t * 0.8) * 4, 128 + Math.sin(t * 1.8) * 2, t, { dir: -1, brillo: 0.5, cara: 'triste' });
};
// en las pantallas de la plaza: el sol que sale sobre los montes (la «amanecer» del título)
const amanece = (u) => (R2, t, [x0, y0, x1, y1]) => {
  const hgt = y1 - y0, sy = Math.round(lerp(y1 + 6, y0 + hgt * 0.35, u));
  for (let y = y0; y <= y1; y++) R2.linea(x0, y, x1, y, hex(y < y0 + hgt * 0.4 ? (u > 0.5 ? '#f0a070' : '#8a6a9a') : (u > 0.5 ? '#f8c890' : '#b07a8a')));
  R2.disco(Math.round((x0 + x1) / 2), sy, 7, hex('#ffe890')); R2.disco(Math.round((x0 + x1) / 2), sy, 5, hex('#fff8d0'));
  for (let k = 0; k < 6; k++) { const p = k / 6 * Math.PI + t * 0.3; R2.linea(Math.round((x0 + x1) / 2 + Math.cos(p) * 9), Math.round(sy - Math.abs(Math.sin(p)) * 9), Math.round((x0 + x1) / 2 + Math.cos(p) * 13), Math.round(sy - Math.abs(Math.sin(p)) * 13), hex('#ffe890')); }
  R2.poligono([[x0, y1], [x0, y1 - 10], [x0 + 14, y1 - 16], [x0 + 30, y1 - 9], [x0 + 46, y1 - 15], [x1, y1 - 8], [x1, y1]], hex('#4a3a5a'));
  R2.poligono([[x0, y1], [x0, y1 - 4], [x1, y1 - 6], [x1, y1]], hex('#2e2a3a'));
};
const p7 = (t) => {   // la plaza de la cosecha al amanecer: el sol sale en las pantallas y la luz dorada lo baña todo
  const u = tramo(t, sol1 - 0.4, sol2 + 0.6);
  const o = { encuadre: 'plaza', luz: 'amanecer', pantalla: amanece(u) };
  T.distrito(R, t, o);
  // un agente de la paz pasa por delante del escenario; dos chicos suben por el pasillo a su fila y, con el sol ya alto
  // en las pantallas («sunrise of the title»), se paran y miran arriba
  const [ax, av] = anda(t, P7 + 0.2, P8 - 0.2, 70, 250); R.actor(EL.agentePaz, ax, 120, t, { dir: 1, anda: av });
  for (const [k, dx, d] of [[EL.tributoChico, 150, 0], [EL.tributoChica, 172, 0.5]]) {
    const v = tramo(t, P7 + 0.1 + d, sol2 - 0.6 + d * 0.4), y = Math.round(lerp(212, 150, v));
    R.actor(k, dx, y, t, { dir: dx < 160 ? 1 : -1, anda: v > 0 && v < 1, sorpresa: t > sol2 - 0.4 && t < sol2 + 1.0, dedo: k === EL.tributoChico && t > sol2 - 0.2 && t < sol2 + 1.2 });
  }
  T.tinte(R, 0, 179, [255, 200, 120], 0.16 * u);
  T.distritoDelante(R, t, o);
  T.AT.luciernaga(R, 262 + Math.sin(t * 0.8) * 4, 132 - Math.round(u * 8) + Math.sin(t * 1.8) * 2, t, { dir: -1, brillo: 0.4 + 0.4 * u, cara: u > 0.5 ? 'sorpresa' : 'triste' });
};
const p8 = (t) => {   // la Aldea vacía de noche: cruza solo con la petaca hacia su casa
  const o = { encuadre: 'aldea', luz: 'noche' };
  const g = T.distrito(R, t, o), pv = g.puertas.vencedor, xd = Math.round((pv[0] + pv[1]) / 2) - 8;
  // cruza hasta la fuente, se para y bebe un trago («drinking»), y sigue hasta su puerta
  const xm = Math.round(lerp(80, xd, 0.75)), u1 = tramo(t, P8 + 0.2, bebe - 0.3), u2 = tramo(t, bebe + 0.85, c(0.5));
  const x = u2 > 0 ? Math.round(lerp(xm, xd, u2)) : Math.round(lerp(80, xm, u1)), trago = tramo(t, bebe - 0.25, bebe + 0.05) - tramo(t, bebe + 0.6, bebe + 0.85);
  const dentro = t > c(0.53);
  // al fondo, un agente de la paz hace la ronda con su farol entre las casas
  const [rx, rv] = anda(t, P8, P9, 300, 196); const ag = R.actor(EL.agentePaz, rx, g.suelo - 22, t, { dir: -1, anda: rv, sostiene: [rx - 8, g.suelo - 32] });
  { const [lx, ly] = ag.mano; R.rect(lx - 2, ly, lx + 2, ly + 5, K); R.rect(lx - 1, ly + 1, lx + 1, ly + 4, hex(Math.sin(t * 11) > -0.6 ? '#ffd860' : '#e8a840')); R.pset(lx, ly - 1, K); }
  if (!dentro) { const h = R.actor(EL.haymitch, x, g.suelo, t, { dir: 1, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), triste: true, sostiene: [x + Math.round(lerp(18, 7, trago)), g.suelo - Math.round(lerp(11, 21, trago))] }); T.PIEZAS_JH.petaca(R, h.mano[0], h.mano[1] + 3, {}); }
  T.AT.luciernaga(R, Math.min(x, xd) - 16 + Math.sin(t * 2) * 2, 128 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.5, cara: t > bebe - 0.2 && t < bebe + 1 ? 'sorpresa' : 'triste' });
  T.distritoDelante(R, t, o);
};
const p10 = (t) => {  // Burdock sale a su porche a llamarle; Haymitch pasa de largo por delante
  const o = { encuadre: 'calle', camara: 'puerta', luz: 'dia' };
  const g = T.distrito(R, t, o);
  // al fondo, una niña de la Veta salta a la comba junto a la casa vecina (se para y mira cuando Burdock llama)
  { const nx = 262, sal = t < burdock || t > d(0.17) ? Math.max(0, Math.round(Math.abs(Math.sin(t * 6)) * 4)) : 0, cu = Math.sin(t * 6);
    R.actor(EL.ninaCampo, nx, g.suelo - 2 - sal, t, { dir: -1, brazos: true, sorpresa: t > burdock && t < d(0.17) });
    const cy = Math.round(g.suelo - 2 - sal + (cu > 0 ? 2 : -26) * Math.abs(cu)); R.linea(nx - 7, g.suelo - 16 - sal, nx, cy, hex('#c8a86a')); R.linea(nx, cy, nx + 7, g.suelo - 16 - sal, hex('#c8a86a')); }
  const [bx, bv] = anda(t, burdock - 0.9, burdock + 0.2, 150, 196);
  const llama = t > burdock - 0.3 && t < d(0.17);
  R.actor(EL.burdockHM, bx, g.suelo, t, { dir: 1, anda: bv, sonrisa: t < burdock + 1, habla: llama && habla(t), dedo: llama, triste: t > d(0.17) });
  const [x, va] = anda(t, P10 + 0.1, P11 - 0.1, 300, 20);
  R.actor(EL.haymitch, x, Math.min(179, g.suelo + 10), t, { dir: -1, anda: va, triste: true });
  T.AT.luciernaga(R, x + 22, 140 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.5, cara: 'triste' });
  T.distritoDelante(R, t, o);
};
// confeti y pétalos que caen por todo el plano
const confeti = (t, n = 40) => { const cs = ['#e85aa8', '#3ad0c8', '#f0c840', '#8a4ad8', '#f8f4ec', '#e8483a']; for (let k = 0; k < n; k++) { const f = (t * (0.12 + hh(k, 1) * 0.1) + hh(k, 2)) % 1, x = Math.round(hh(k, 3) * 320 + Math.sin(t * 2 + k) * 6), y = Math.round(f * 200 - 16); if (y > 20 || x > 180) R.rect(x, y, x + (Math.sin(t * 6 + k) > 0 ? 2 : 1), y + 1, hex(cs[k % 6])); } };
// en las pantallas de la Gira: la corona de laurel dorada del vencedor sobre azul, con destellos
const corona = (R2, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) R2.linea(x0, y, x1, y, hex(y % 3 ? '#1a2a5a' : '#22346a'));
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2) + 2, r = Math.min(x1 - x0, y1 - y0) * 0.32;
  for (let k = 0; k < 9; k++) for (const sgn of [-1, 1]) { const p = Math.PI * 0.55 + k * 0.11 * Math.PI, x = Math.round(cx + sgn * Math.cos(p - Math.PI / 2) * r), y = Math.round(cy + Math.sin(p - Math.PI / 2) * -r * 0.2 + k * 1.2 - 4);
    R2.disco(x, y, 2, hex(k % 2 ? '#f0c840' : '#c89a20')); R2.pset(x, y - 1, hex('#fff0a0')); }
  if (Math.sin(t * 3) > 0.4) { R2.pset(cx - 6, cy - 9, hex('#ffffff')); R2.pset(cx + 7, cy - 6, hex('#ffffff')); }
};
const p11 = (t) => {  // la Gira de la Victoria: guirnaldas, la sonrisa a la fuerza; Plutarch filma
  const o = { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 0, pantalla: corona };
  const g = T.distrito(R, t, o);
  const saluda = t > sonrie && t < sonrie + 2.2;
  R.actor(EL.haymitch, 152, g.suelo, t, { dir: 1, sonrisa: t > sonrie, triste: t < sonrie, brazos: saluda && Math.sin(t * 7) > -0.5, dedo: t > sonrie + 2.2 && Math.sin(t * 3) > 0.3 });
  R.actor(EL.effie, 104, g.suelo, t, { dir: 1, sonrisa: true, brazos: Math.sin(t * 5) > 0.2, habla: t < sonrie && habla(t) });
  const p = R.actor(EL.plutarch, 208, g.suelo, t, { dir: -1, sostiene: [198, g.suelo - 15] });
  camarita(p.mano[0], p.mano[1], -1, t);
  if (t > sonrie && t < sonrie + 0.25) for (let r = 2; r < 9; r += 2) R.anillo(p.mano[0] - 9, p.mano[1] - 2, r, hex("#fff8d0"));
  // guirnaldas de flores colgadas de urna a urna por la fachada (la fiesta de la Gira)
  for (const [x0, x1, y0, cae] of [[40, 160, 56, 14], [160, 280, 56, 14], [60, 260, 40, 20]]) for (let i = 0; i <= 60; i++) { const f = i / 60, x = Math.round(lerp(x0, x1, f)), y = Math.round(y0 + Math.sin(f * Math.PI) * cae + Math.sin(t * 1.5 + f * 4) * 0.8); R.pset(x, y, hex('#3a8a3a')); if (i % 4 === 0) { const c = hex(['#e85aa8', '#f0c840', '#f8f4ec', '#e8483a'][(i / 4) % 4]); R.rect(x - 1, y, x + 1, y + 1, c); } }
  T.distritoDelante(R, t, o);
  confeti(t, 70);
  T.AT.luciernaga(R, 128 + Math.sin(t * 1.2) * 4, 104 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.4, cara: 'triste' });
};
const p12 = (t) => {  // la recepción en casa del alcalde: Plutarch le pone la mano en el hombro
  const o = { encuadre: 'alcalde', brillo: tramo(t, P12 + 0.4, P12 + 1.4) - tramo(t, P12 + 2, P12 + 3) };
  const g = T.interior(R, t, o);
  R.actor(EL.haymitch, 202, g.suelo, t, { dir: t < plutarch - 0.4 ? 1 : -1, triste: t < plutarch + 0.6, sonrisa: t > plutarch + 1.6 });
  // un criado cruza al fondo con la bandeja de copas y se para a ofrecer una
  { const [cx, cv] = anda(t, P12 + 0.2, P13 - 0.3, 330, 250), cr = R.actor(EL.criado, cx, g.suelo - 4, t, { dir: -1, anda: cv, sostiene: [cx - 9, g.suelo - 17] });
    const [tx, ty] = cr.mano; R.rect(tx - 6, ty, tx + 6, ty + 1, hex('#c8c8d0')); R.rect(tx - 6, ty + 1, tx + 6, ty + 1, hex('#8a8a96'));
    for (const dx of [-4, 0, 4]) { R.rect(tx + dx - 1, ty - 4, tx + dx + 1, ty - 2, hex('#f0d880')); R.pset(tx + dx, ty - 1, hex('#e8eef4')); R.pset(tx + dx - 1, ty - 4, hex('#fff6d0')); } }
  // el trípode con la cámara de Plutarch, con su piloto rojo
  for (const lx of [104, 112, 120]) R.linea(112, 142, lx, g.suelo, hex('#2a2430'));
  camarita(110, 140, 1, t);
  const [x, va] = anda(t, P12 + 0.4, plutarch - 0.3, 92, 182);
  R.actor(EL.plutarch, x, g.suelo, t, { dir: 1, anda: va, sonrisa: true, sostiene: t > plutarch - 0.3 ? [x + 22, g.suelo - 12] : undefined, habla: t > plutarch && habla(t) });
  T.interiorDelante(R, t, o);
  T.AT.luciernaga(R, 152 + Math.sin(t) * 3, 104 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.6, cara: t > plutarch ? 'sonrisa' : 'triste' });
};
const p13 = (t) => {  // la sala del mapa: Plutarch señala el 12, que se enciende
  const o = { encuadre: 'mapa', trenes: 0.5 + 0.5 * tramo(t, panem, alguien) };
  const g = T.capitolio(R, t, o);
  // Plutarch entra por la izquierda, se para junto a la mesa del mapa y señala el 12 en «Panem will need»
  const [x, va] = anda(t, P13 + 0.1, P13 + 1.8, -14, 40);
  R.actor(EL.plutarch, x, 170, t, { dir: 1, anda: va, dedo: t > panem - 0.3, sonrisa: t > alguien, habla: t > P13 + 1.8 && t < panem - 0.3 && habla(t) });
  T.capitolioDelante(R, t, o);
  const [dx, dy] = g.distritos[11], u = tramo(t, panem, alguien);
  if (u > 0) { T.AT.anillo(R, dx, dy, 16, 11, t, u); if (Math.sin(t * 7) > 0) R.anillo(dx, dy, Math.round(4 + 3 * u), hex('#fff0a0')); if (t > alguien && Math.sin(t * 6) > 0) R.icono('!', dx - 3, dy - 22); }
  T.AT.luciernaga(R, lerp(250, dx + 16, tramo(t, panem - 0.6, alguien)) + Math.sin(t * 1.4) * 3, lerp(150, dy - 10, tramo(t, panem - 0.6, alguien)) + Math.sin(t * 2) * 2, t, { dir: -1, brillo: 0.8, cara: t > panem ? 'sonrisa' : 'normal' });
};
const efectos = [[0.4, 'viento'], [P2 + 0.2, 'vapor'], [madre, 'golpecito'], [P3 + 0.15, 'tic'], [noMurio - 0.1, 'papel'], [P4 + 0.3, 'viento'], [llega, 'papel'],
  [P5 + 0.3, 'publico'], [da, 'papel'], [P6 + 0.3, 'viento'], [P7 + 0.2, 'publico'], [sol1, 'campana'], [P8 + 0.3, 'viento'], [bebe, 'burbujas'], [c(0.53), 'puerta'],
  [P9 + 0.25, 'tic'], [dinero, 'brillo'], [dinero + 0.55, 'golpecito'], [nadie, 'pop'], [burdock - 0.9, 'puerta'], [P11 + 0.2, 'publico'], [sonrie, 'flash'],
  [P12 + 0.3, 'tic'], [plutarch, 'golpecito'], [P13 + 0.1, 'zumbido'], [panem, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13]], { efectos, año: 50 });
''')
