E = {}

E['si-creadores'] = ('Los creadores', '''// SI-CREADORES (frases 44–46), sin cartela, año 1989 (Space Quest III) y 1991 (Space Quest IV). Seis planos:
// 1. el asteroide de la empresa malvada: un vigilante patrulla con su café; Roger entra de puntillas por la derecha
//    («Roger»), los dos dibujantes con antenas lo ven desde la jaula («rescue»: «!») y saltan de alegría («creators»);
//    Roger se lleva el dedo a los labios (corta en «The two guys»);
// 2. la jaula de cerca: Roger hace saltar el candado con el palo de la escoba («Andromeda»), la puerta se abre y salen
//    los dos; en «evil video game company» entra el jefe furioso y aporrea el botón de alarma; los tres huyen
//    (corta en «And in the fourth»);
// 3. el portal del tiempo: Roger se despide de los dibujantes, corre por la cornisa y en «time» salta a la espiral, que
//    se lo traga girando; en «very first game» sale de la espiral un «1» que brilla (corta en «and even»);
// 4. dentro del túnel del tiempo (fondo local): Roger da vueltas con su escoba entre relojes; pasan dos marcos con los
//    juegos futuros «10» y «12» («two future sequels») que en «never existed» se tachan con una X y se deshacen; el
//    disquete pasa dando tumbos, asustado;
// 5. el mundo del primer juego: Roger cae del cielo («lands»), en «turns into chunky pixels» se vuelve cuadrado, se mira
//    las manos, se rasca la cabeza y en «sixteen colors» sale el «16» con la paleta de 16 colores (corta tras «colors»);
// 6. el salón de los jugadores: en la pantalla, el Roger cuadrado; el chico se parte de risa («joke»), el adolescente
//    señala la pantalla («people who had played it») y la abuela, que nunca lo jugó, se queda con un «?».''', r'''
const r = (f) => en('rescate', f), ti = (f) => en('tiempo', f), px = (f) => en('pixeles', f);
const P2 = r(0.485), P3 = ti(0), P4 = ti(0.651), P5 = px(0), P6 = px(0.605);
const ROGER = r(0.157), RESCUE = r(0.244), CREADORES = r(0.339), ANDRO = r(0.581), KIDNAP = r(0.718), EVIL = r(0.82);
const TRAVELS = ti(0.17), SALTA = ti(0.261), PRIMERO = ti(0.418), SERIE = ti(0.54), DOS = ti(0.722), FUTURO = ti(0.749), NUNCA = ti(0.914);
const ATERRIZA = px(0.0875), CUADRADO = px(0.267), DIECISEIS = px(0.501), BROMA = px(0.706), GENTE = px(0.786), JUGADO = px(0.87), ENTIENDE = px(0.93);
const grueso = (x0, y0, x1, y1, c, w) => { for (let i = 0; i < w; i++) for (let j = 0; j < w; j++) R.linea(x0 + i - (w >> 1), y0 + j - (w >> 1), x1 + i - (w >> 1), y1 + j - (w >> 1), c); };
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0] = pts[i], [t1, x1] = pts[i + 1]; if (t < t1) return { x: Math.round(lerp(x0, x1, (t - t0) / (t1 - t0))), mv: x1 !== x0 }; }
  return { x: pts[pts.length - 1][1], mv: false };
};
// las antenas de broma de los dos dibujantes (las mismas que en la oficina de 1986)
const antenas = (cab, t, k = 0) => {
  const [cx, cy] = cab; R.rect(cx - 5, cy + 1, cx + 5, cy + 1, hex('#3a3a4a'));
  for (const s of [-1, 1]) { const w = Math.round(Math.sin(t * 7 + k + s) * 1.4), x1 = cx + s * 5 + w, y1 = cy - 8;
    R.linea(cx + s * 3, cy, x1, y1, T.C.k); R.disco(x1, y1 - 1, 2, T.C.k); R.disco(x1, y1 - 1, 1, hex('#7ae86a')); R.pset(x1 - 1, y1 - 2, hex('#e8ffe0')); }
};
// la escoba en la mano: 'barre', 'apoya' o 'alza' (en alto)
const escoba = (m, dir, S, t, modo) => {
  const [hx, hy] = m, sw = modo === 'barre' ? Math.round(Math.sin(t * 9) * 3) : 0, palo = hex('#a86a3a'), paloS = hex('#6a3e1e');
  let x0 = hx - dir * 4, y0 = hy - 10, x1 = hx + dir * 9 + sw, y1 = S - 4;
  if (modo === 'alza') { x0 = hx - dir * 3; y0 = hy + 6; x1 = hx + dir * 12; y1 = hy - 16; }
  R.linea(x0, y0, x1, y1, paloS); R.linea(x0 + 1, y0, x1 + 1, y1, palo);
  if (modo === 'alza') { R.rect(x1 - 4, y1 - 4, x1 + 4, y1 - 3, hex('#a83a3a')); R.rect(x1 - 5, y1 - 8, x1 + 5, y1 - 5, hex('#e8c060')); for (let i = -5; i <= 5; i += 2) R.pset(x1 + i, y1 - 8, hex('#a8843a')); return; }
  R.rect(x1 - 5, y1, x1 + 5, y1 + 1, hex('#a83a3a')); R.rect(x1 - 6, y1 + 2, x1 + 6, S, hex('#e8c060'));
  for (let i = -6; i <= 6; i += 2) R.pset(x1 + i, S, hex('#a8843a')); R.rect(x1 - 6, y1 + 2, x1 + 6, y1 + 2, hex('#c8a040'));
};
// un personaje girado y a escala: se pinta de pie en un búfer (pies en (20, 50)) y se copia rotado alrededor de (27, 36)
const BUF = R.nuevo();
const girado = (dibuja, cx, cy, ang, s) => {
  const prev = R.usar(BUF); R.rect(0, 0, 63, 63, 0); dibuja(); R.usar(prev);
  const ca = Math.cos(ang), sa = Math.sin(ang), rr = Math.ceil(36 * s);
  for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) {
    const u = Math.round((ca * x + sa * y) / s + 27), v = Math.round((-sa * x + ca * y) / s + 34);
    if (u < 0 || v < 0 || u > 62 || v > 62) continue; const c = BUF[v * 320 + u]; if (c) R.pset(cx + x, cy + y, c);
  }
};
const rogerBuf = (t, o, modo) => () => { const ro = R.actor(EL.conserje, 20, 50, t, { dir: 1, sostiene: [36, 38], ...o }); escoba(ro.mano, 1, 50, t, modo); };
const bocadillo = (x, y, ic) => R.bocadillo(x, y, { icono: ic });

// 1. el asteroide: el vigilante patrulla, Roger entra de puntillas y los presos lo ven
const p1 = (t) => {
  T.espacio(R, t, { encuadre: 'asteroide', abierta: 0 });
  // el vigilante de la empresa con su taza: va y viene por la pasarela, de espaldas a la jaula cuando llega Roger
  { const fase = (t + 0.6) % 6, ida = fase < 3, u = ida ? fase / 3 : 1 - (fase - 3) / 3, gx = Math.round(lerp(30, 150, u));
    const para = Math.abs(u - 0.5) > 0.42; const g = R.actor(EL.ejecutivo, gx, 152, t, { dir: ida ? 1 : -1, anda: !para, sostiene: true });
    const [mx, my] = g.mano; R.rect(mx - 2, my - 4, mx + 2, my, T.C.k); R.rect(mx - 1, my - 3, mx + 1, my - 1, hex('#f2eee2')); R.pset(mx + 3, my - 2, T.C.k);
    if (Math.floor(t * 2) % 2) R.pset(mx, my - 6 - Math.floor(t * 4) % 2, hex('#d8d8e0')); }
  // los dos dibujantes en la jaula: tristes; ven a Roger, «!», y saltan de alegría
  const ven = t > RESCUE, salta = t > CREADORES && t < P2 - 0.2;
  [[EL.dibujante, 216, 0], [EL.dibujante2, 232, 1]].forEach(([d, x, k]) => {
    const sal = salta ? Math.round(Math.abs(Math.sin((t - CREADORES) * 7 + k)) * 5) : 0;
    const a = R.actor(d, x, 152, t, { dir: ven ? 1 : (k ? -1 : 1), triste: !ven, sorpresa: ven && !salta, sonrisa: salta, brazos: salta, salto: sal });
    antenas([a.cabeza[0], a.cabeza[1] - sal], t, k);
  });
  T.f_jaulaDelante(R, t, { camara: 'general', abierta: 0 });
  if (ven && t < CREADORES + 0.3) bocadillo(238, 120, '!');
  // Roger entra de puntillas por la derecha y pide silencio con el dedo
  const g = ruta(t, [[ROGER - 0.4, 334], [RESCUE + 0.3, 278]]), calla = t > CREADORES - 0.2;
  const ro = R.actor(EL.conserje, g.x, 152, t, { dir: -1, anda: g.mv && Math.sin(t * 5) > -0.3, sostiene: calla ? undefined : [g.x - 1, 140], dedo: calla, sonrisa: calla });
  if (!calla) escoba(ro.mano, -1, 152, t, 'apoya');
  else { R.linea(g.x + 12, 128, g.x + 18, 151, hex('#6a3e1e')); R.rect(g.x + 14, 148, g.x + 24, 152, hex('#e8c060')); R.rect(g.x + 14, 147, g.x + 24, 147, hex('#a83a3a')); }
};
// 2. la jaula de cerca: el candado salta, salen los dos; el jefe aporrea la alarma; huyen los tres
const p2 = (t) => {
  const ab = tramo(t, ANDRO + 0.05, ANDRO + 0.75);
  T.espacio(R, t, { encuadre: 'asteroide', camara: 'jaula', abierta: ab });
  const alarma = t > EVIL + 0.45;
  // el piloto de alarma del panel, que gira en rojo cuando el jefe lo aporrea
  if (alarma) { const on = Math.floor(t * 6) % 2; R.disco(63, 94, 4, T.C.k); R.disco(63, 94, 3, on ? hex('#ff5a4a') : hex('#8a1a1a')); if (on) for (let k = 0; k < 8; k++) R.pset(63 + Math.round(Math.cos(k * 0.8 + t * 9) * 7), 94 + Math.round(Math.sin(k * 0.8 + t * 9) * 5), hex('#ff8a7a')); }
  const huye = (k) => ruta(t, [[EVIL + 0.7 + k * 0.12, k ? 196 : 186], [P3 - 0.3 + k * 0.1, 360]]);
  const dib = [[EL.dibujante, 0], [EL.dibujante2, 1]].map(([d, k]) => {
    const sale = ruta(t, [[ab > 0.9 ? ANDRO + 0.8 + k * 0.25 : 1e9, k ? 156 : 132], [KIDNAP + 0.3 + k * 0.25, k ? 196 : 186]]);
    const h = huye(k), x = t > EVIL + 0.7 ? h.x : sale.x; return { d, k, x, mv: t > EVIL + 0.7 ? h.mv : sale.mv };
  });
  const pinta = (q) => { const a = R.actor(q.d, q.x, 154, t, { dir: 1, anda: q.mv, sonrisa: t > ANDRO + 0.3 && t < EVIL + 0.3, sorpresa: t > EVIL + 0.3, brazos: t > ANDRO + 0.1 && t < ANDRO + 0.7 }); antenas(a.cabeza, t, q.k); };
  dib.filter((q) => q.x < 184).forEach(pinta);
  T.f_jaulaDelante(R, t, { camara: 'jaula', abierta: ab });
  dib.filter((q) => q.x >= 184).forEach(pinta);
  // Roger: levanta la escoba y golpea el candado; luego huye detrás de los dos
  const gr = ruta(t, [[P2, 330], [P2 + 0.7, 232], [EVIL + 1.0, 232], [P3 - 0.1, 360]]);
  const alza = t > P2 + 0.75 && t < ANDRO + 0.1, golpe = t >= ANDRO + 0.1 && t < ANDRO + 0.4;
  const ro = R.actor(EL.conserje, gr.x, 154, t, { dir: t > EVIL + 1.0 ? 1 : -1, anda: gr.mv, sostiene: [gr.x - 1, alza ? 132 : 142], sonrisa: t > ANDRO + 0.4 && t < EVIL + 0.3, sorpresa: t > EVIL + 0.3 });
  escoba(ro.mano, t > EVIL + 1.0 ? 1 : -1, 154, t, alza ? 'alza' : 'apoya');
  if (golpe) { R.linea(gr.x - 2, 132, 190, 128, hex('#6a3e1e')); R.linea(gr.x - 2, 133, 190, 129, hex('#a86a3a')); for (let k = 0; k < 6; k++) R.pset(188 + Math.round(Math.cos(k) * 5), 128 + Math.round(Math.sin(k) * 5), hex('#fff2a0')); }
  // el jefe de la empresa malvada entra furioso por la izquierda y aporrea el botón
  const gj = ruta(t, [[EVIL - 0.3, -20], [EVIL + 0.35, 52], [EVIL + 1.1, 52], [P3, 250]]);
  if (t > EVIL - 0.3) { const j = R.actor(EL.ejecutivo2, gj.x, 154, t, { dir: 1, anda: gj.mv, enfado: true, dedo: t > EVIL + 0.35 && !gj.mv, sostiene: t > EVIL + 0.35 && t < EVIL + 0.6 ? [60, 104] : undefined });
    if (t > EVIL + 0.6 && t < EVIL + 1.4) R.bocadillo(j.cabeza[0], j.cabeza[1] - 6, { icono: '!' }); }
};
// 3. el portal: se despide, corre y salta; la espiral se lo traga; sale el «1»
const p3 = (t) => {
  const traga = tramo(t, SALTA, SALTA + 1.0);
  T.espacio(R, t, { encuadre: 'portal', giro: 1 + traga * 2 - tramo(t, SALTA + 1.4, SALTA + 2.4) * 2 });
  // los dos dibujantes en la cornisa: dicen adiós y luego se asoman a mirar
  const mira = t > SALTA + 0.4;
  [[EL.dibujante, 22, 0], [EL.dibujante2, 44, 1]].forEach(([d, x, k]) => {
    const a = R.actor(d, x + (mira ? 30 : 0) * tramo(t, SALTA + 0.2, SALTA + 0.9), 150, t, { dir: 1, anda: t > SALTA + 0.2 && t < SALTA + 0.9, saluda: !mira && t > P3 + 0.3 && Math.sin(t * 3 + k) > -0.6, sorpresa: mira && t < PRIMERO, sonrisa: t > PRIMERO, dedo: t > PRIMERO + 0.2 && k === 0 });
    antenas(a.cabeza, t, k);
  });
  // Roger: habla con ellos, se vuelve, corre por la cornisa y salta
  const g = ruta(t, [[TRAVELS - 0.1, 80], [SALTA, 132]]);
  if (t < SALTA) { const ro = R.actor(EL.conserje, g.x, 150, t, { dir: t > TRAVELS - 0.3 ? 1 : -1, anda: g.mv, habla: t < TRAVELS - 0.4 && Math.sin(t * 8) > 0, sostiene: [g.x + (t > TRAVELS - 0.3 ? 16 : -1), 138], sonrisa: true });
    escoba(ro.mano, t > TRAVELS - 0.3 ? 1 : -1, 150, t, g.mv ? 'alza' : 'apoya'); }
  else if (traga < 1) { const u = traga, x = Math.round(lerp(140, 198, u)), y = Math.round(lerp(132, 86, u) - Math.sin(u * Math.PI) * 26);
    girado(rogerBuf(t, { sorpresa: true }, 'alza'), x, y, u * u * 9, Math.max(0.08, 1 - u * 0.92)); }
  // el destello cuando se lo traga y el «1» del primer juego que sale de la espiral
  if (traga > 0.9 && t < SALTA + 1.4) { const f = tramo(t, SALTA + 0.9, SALTA + 1.4); for (let k = 0; k < 12; k++) { const a = k * 0.52 + t * 3, d = 4 + f * 30; R.pset(198 + Math.round(Math.cos(a) * d), 86 + Math.round(Math.sin(a) * d), k % 2 ? hex('#ffffff') : hex('#ffe08a')); } }
  const uno = tramo(t, PRIMERO - 0.1, PRIMERO + 0.6), vuelve = tramo(t, SERIE + 0.2, P4 - 0.1);
  if (uno > 0 && vuelve < 1) { const y = Math.round(lerp(92, 58, uno) + lerp(0, 28, vuelve)), b = Math.floor(t * 8) % 2;
    if (vuelve < 0.6) { R.disco(198, y - 8, 14, hex('#3a1a6a')); R.anillo(198, y - 8, 14, b ? hex('#ffe08a') : hex('#ffffff')); R.numero('1', 198, y, { tam: 16, centro: true }); }
    for (let k = 0; k < 4; k++) { const a = t * 4 + k * 1.57; R.pset(198 + Math.round(Math.cos(a) * 18), y - 8 + Math.round(Math.sin(a) * 18), hex('#fff6c0')); } }
};
// 4. el túnel del tiempo (fondo local): la espiral, anillos, estelas, relojes, los dos juegos que no existieron
const TUN = ['#0e0822', '#180e36', '#24144c', '#321c66', '#462684', '#5e34a4', '#7a4ac0'].map(hex);
const tranquilo = (x, y) => (y < 16 && x >= 16 && x <= 174) || (x >= 274 && y <= 48);
const reloj = (x, y, rr, t, k) => {
  R.disco(x, y, rr + 1, T.C.k); R.disco(x, y, rr, hex('#f2eee2')); R.anillo(x, y, rr, hex('#c8a040'));
  if (rr > 3) { R.disco(x - 1, y - 1, Math.max(1, rr - 3), hex('#ffffff')); for (let i = 0; i < 12; i += 3) R.pset(x + Math.round(Math.cos(i * 0.52) * (rr - 1)), y + Math.round(Math.sin(i * 0.52) * (rr - 1)), T.C.k); }
  const a1 = t * 9 + k, a2 = t * 1.5 + k; R.linea(x, y, x + Math.round(Math.cos(a1) * (rr - 1)), y + Math.round(Math.sin(a1) * (rr - 1)), hex('#c83a3a')); R.linea(x, y, x + Math.round(Math.cos(a2) * (rr * 0.6)), y + Math.round(Math.sin(a2) * (rr * 0.6)), T.C.k);
};
const marco = (cx, cy, s, num, t, tacha, se) => {
  if (s <= 0.05) return; const w = Math.round(30 * s), h = Math.round(22 * s);
  if (se > 0) { for (let k = 0; k < 18; k++) { const a = k * 0.35, d = se * 40; R.pset(cx + Math.round(Math.cos(a) * (w * 0.6 + d)), cy + Math.round(Math.sin(a) * (h * 0.6 + d)), k % 3 ? hex('#ffe08a') : hex('#ff8a6a')); } if (se > 0.25) return; }
  R.rect(cx - w - 2, cy - h - 2, cx + w + 2, cy + h + 2, T.C.k); R.rect(cx - w - 1, cy - h - 1, cx + w + 1, cy + h + 1, hex('#c8963a')); R.rect(cx - w - 1, cy - h - 1, cx + w + 1, cy - h - 1, hex('#ffe08a'));
  R.rect(cx - w + 1, cy - h + 1, cx + w - 1, cy + h - 1, hex('#101830'));
  // dentro: un cielo de otro planeta con su luna, estrellas y un suelo de colores
  for (let k = 0; k < 10; k++) R.pset(cx - w + 2 + ((k * 37) % (2 * w - 3)), cy - h + 2 + ((k * 23) % (h)), (k + Math.floor(t * 5)) % 3 ? hex('#8aa0e8') : hex('#ffffff'));
  R.disco(cx + Math.round(w * 0.55), cy - Math.round(h * 0.45), Math.max(1, Math.round(5 * s)), num === '10' ? hex('#e87ab0') : hex('#7ae8c8'));
  R.rect(cx - w + 1, cy + Math.round(h * 0.55), cx + w - 1, cy + h - 1, num === '10' ? hex('#5a3a8a') : hex('#2a6a5a'));
  if (s > 0.7) R.numero(num, cx, cy + 6, { tam: 16, centro: true });
  if (tacha > 0) { const l = Math.round(w * 0.9 * tacha); grueso(cx - l, cy - l * 0.7, cx + l, cy + l * 0.7, hex('#e83a3a'), 3); if (tacha > 0.5) { const l2 = Math.round(w * 0.9 * (tacha - 0.5) * 2); grueso(cx + l2, cy - l2 * 0.7, cx - l2, cy + l2 * 0.7, hex('#e83a3a'), 3); } }
};
const p4 = (t) => {
  const cx = 160 + Math.round(Math.sin(t * 1.3) * 6), cy = 96 + Math.round(Math.cos(t * 1.1) * 4);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    { const dx = x - cx, dy = (y - cy) * 1.3, rr = Math.sqrt(dx * dx + dy * dy) + 1, a = Math.atan2(dy, dx);
      const z = 240 / rr + t * 2.4, v = ((z * 0.5 + a * 5 / 6.2832) % 1 + 1) % 1, prof = Math.min(1, rr / 150);
      let i = Math.floor(v * 4) + Math.round(prof * 2.6); if (((x + y) & 1) && v * 4 % 1 > 0.5) i++;
      if (rr < 12) i = 6; else if (rr < 18) i = 5 + ((x + y) & 1);
      const baja = y < 20 ? 5 : y < 56 ? Math.round((56 - y) / 7.2) : 0; i -= baja;
      c = TUN[Math.max(0, Math.min(6, i))]; }
    R.pset(x, y, c);
  }
  // la luz del fondo del túnel
  R.disco(cx, cy, 7, hex('#c8b0ff')); R.disco(cx, cy, 4, hex('#ffffff'));
  // anillos que pasan hacia nosotros y estelas de estrellas
  for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1, rr = 8 * Math.pow(36, u), col = k % 2 ? hex('#8a6ae8') : hex('#5ac8e8');
    for (let a = 0; a < 6.283; a += 2.4 / rr + 0.02) { const x = Math.round(cx + Math.cos(a + t) * rr), y = Math.round(cy + Math.sin(a + t) * rr / 1.3); if (!tranquilo(x, y) && ((a * 10) | 0) % 3) R.pset(x, y, col); } }
  for (let k = 0; k < 40; k++) { const a = k * 2.399, u = ((t * 0.7 + (k * 0.618) % 1) % 1), d0 = 10 + u * u * 220, d1 = d0 * 1.12 + 2;
    const x0 = Math.round(cx + Math.cos(a) * d0), y0 = Math.round(cy + Math.sin(a) * d0 / 1.3), x1 = Math.round(cx + Math.cos(a) * d1), y1 = Math.round(cy + Math.sin(a) * d1 / 1.3);
    if (!tranquilo(x1, y1) && !tranquilo(x0, y0)) R.linea(x0, y0, x1, y1, u > 0.5 ? hex('#ffffff') : hex('#b0a0f0')); }
  // relojes que salen girando del centro
  for (let k = 0; k < 3; k++) { const u = ((t - P4) * 0.32 + k / 3) % 1, a = [2.9, 0.4, 1.9][k], d = u * u * 180;
    const x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d / 1.3); if (!tranquilo(x, y)) reloj(x, y, Math.round(2 + u * 9), t, k); }
  // los dos juegos futuros que nunca existieron: se acercan, se tachan y se deshacen
  const tacha = tramo(t, NUNCA - 0.15, NUNCA + 0.35), se = tramo(t, NUNCA + 0.6, NUNCA + 1.2);
  marco(Math.round(lerp(cx, 74, tramo(t, DOS - 0.2, DOS + 0.5))), Math.round(lerp(cy, 74, tramo(t, DOS - 0.2, DOS + 0.5))), tramo(t, DOS - 0.2, DOS + 0.5), '10', t, tacha, se);
  marco(Math.round(lerp(cx, 238, tramo(t, FUTURO, FUTURO + 0.7))), Math.round(lerp(cy, 110, tramo(t, FUTURO, FUTURO + 0.7))), tramo(t, FUTURO, FUTURO + 0.7), '12', t, tacha, se);
  // el disquete pasa dando tumbos, asustado
  { const u = tramo(t, P4 + 0.1, P4 + 1.8); if (u > 0 && u < 1) T.disquete(R, Math.round(lerp(cx - 10, -24, u)), Math.round(lerp(cy + 8, 168, u)), t, { s: 1 + u, expresion: 'susto', salto: Math.round(Math.abs(Math.sin(t * 9)) * 3), dir: -1 }); }
  // Roger da vueltas con la escoba en medio del túnel
  { const u = tramo(t, P4, P5), x = Math.round(lerp(150, 168, u) + Math.sin(t * 2) * 14), y = Math.round(118 + Math.cos(t * 1.7) * 8);
    girado(rogerBuf(t, { sorpresa: t < NUNCA, sonrisa: t >= NUNCA }, 'alza'), x, y, t * 3.2, 1); }
};
// 5. el mundo del primer juego: cae, se vuelve cuadrado, se mira y sale el «16»
const EGA = ['#000000', '#0000aa', '#00aa00', '#00aaaa', '#aa0000', '#aa00aa', '#aa5500', '#aaaaaa', '#555555', '#5555ff', '#55ff55', '#55ffff', '#ff5555', '#ff55ff', '#ffff55', '#ffffff'].map(hex);
// lo vuelve de píxeles de 2×2 y de la paleta de entonces (con el melocotón para la piel, que si no sale roja)
const PAL16 = ['#000000', '#0000aa', '#00aa00', '#00aaaa', '#aa0000', '#aa00aa', '#aa5500', '#aaaaaa', '#555555', '#5555ff', '#55ff55', '#55ffff', '#ff5555', '#ffaa77', '#ffff55', '#ffffff'].map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), hex(h)]);
const cuadra = (x0, y0, x1, y1) => {
  const B = R.buf; x0 &= ~1; y0 &= ~1;
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) {
    const c = B[y * 320 + x]; const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255; let m = 1e9, q = PAL16[0][3];
    for (const [pr, pg, pb, h] of PAL16) { const d = (r - pr) ** 2 * 3 + (g - pg) ** 2 * 4 + (b - pb) ** 2 * 2; if (d < m) { m = d; q = h; } }
    R.rect(x, y, x + 1, y + 1, q);
  }
};
const p5 = (t) => {
  T.espacio(R, t, { encuadre: 'portal', camara: 'pixeles' });
  const X = 150, S = 150, cae = tramo(t, P5, ATERRIZA), y = Math.round(lerp(-6, S, cae * cae));
  // el polvo del aterrizaje
  const pol = tramo(t, ATERRIZA, ATERRIZA + 0.7); if (pol > 0 && pol < 1) for (let k = 0; k < 8; k++) { const d = 4 + pol * 16; R.disco(X + 8 + Math.round((k - 3.5) * d / 3.5), S - 2 - Math.round(Math.sin(pol * 3) * 3) - (k % 2), 2 - Math.round(pol), hex('#d8c08a')); }
  const mira = t > CUADRADO + 0.5 && t < DIECISEIS - 0.9, rasca = t >= DIECISEIS - 0.9 && t < DIECISEIS + 0.1;
  const ro = R.actor(EL.conserje, X, y, t, { dir: mira ? (Math.floor((t - CUADRADO) * 2.2) % 2 ? -1 : 1) : 1, sorpresa: cae < 1 || mira, brazos: mira && Math.floor((t - CUADRADO) * 2.2) % 2 === 0, dedo: rasca, sonrisa: t > DIECISEIS + 0.1, sostiene: mira || rasca ? undefined : [X + 16, y - 12] });
  if (!mira && !rasca) escoba(ro.mano, 1, y, t, cae < 1 ? 'alza' : 'apoya');
  else { R.linea(X + 22, S - 30, X + 28, S - 1, hex('#6a3e1e')); R.rect(X + 23, S - 4, X + 33, S, hex('#e8c060')); R.rect(X + 23, S - 5, X + 33, S - 5, hex('#a83a3a')); }
  // el destello del cambio y, desde «turns», todo él en píxeles gordos de 16 colores
  if (t > CUADRADO - 0.15 && t < CUADRADO + 0.15) for (let k = 0; k < 10; k++) { const a = k * 0.63; R.linea(X + 8 + Math.round(Math.cos(a) * 14), S - 14 + Math.round(Math.sin(a) * 18), X + 8 + Math.round(Math.cos(a) * 20), S - 14 + Math.round(Math.sin(a) * 24), hex('#ffffff')); }
  if (t > CUADRADO) cuadra(X - 4, S - 36, X + 36, S + 2);
  if (t > CUADRADO + 0.3 && t < CUADRADO + 1.2) R.bocadillo(X + 7, S - 32, { icono: '!' });
  // «16» y la paleta de los 16 colores
  const d = tramo(t, DIECISEIS - 0.1, DIECISEIS + 0.4);
  if (d > 0) { const yy = Math.round(lerp(100, 74, d)); R.rect(124, yy - 22, 196, yy + 14, T.C.k); R.rect(125, yy - 21, 195, yy + 13, hex('#0000aa'));
    R.numero('16', 160, yy - 2, { tam: 16, centro: true }); for (let k = 0; k < 16; k++) { const xx = 128 + k * 4; R.rect(xx, yy + 4, xx + 3, yy + 10, EGA[k]); }
    T.f_pixelar(R, 124, yy - 22, 196, yy + 14); }
};
// 6. el salón de los jugadores: el Roger cuadrado en la pantalla; risas, el dedo y la abuela con «?»
const p6 = (t) => {
  T.casa(R, t, { encuadre: 'jugadores', epoca: 1985 });
  // la pantalla: el mundo del primer juego con el Roger cuadrado que mira a los lados
  R.recorte([212, 72, 250, 100]);
  for (let y = 72; y <= 100; y++) for (let x = 212; x <= 250; x++) R.pset(x, y, y < 88 ? (((x >> 1) + (y >> 1)) % 2 ? EGA[1] : EGA[9]) : y < 92 ? EGA[6] : (((x >> 1) + (y >> 1)) % 3 ? EGA[14] : EGA[6]));
  R.disco(242, 78, 3, EGA[14]); R.disco(240, 80, 2, EGA[12]);
  { const rx = 226 + (Math.floor(t * 2) % 2) * 2, q = (x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, c); };
    q(rx, 82, 6, 4, EGA[14]); q(rx + 2, 84, 2, 2, EGA[0]); q(rx, 86, 6, 4, EGA[7]); q(rx + 1, 90, 2, 2, EGA[1]); q(rx + 4, 90, 2, 2, EGA[1]); q(rx - 2, 86, 2, 4, EGA[7]); q(rx + 6, 86, 2, 4, EGA[7]);
    q(rx + 8, 80, 2, 10, EGA[6]); q(rx + 7, 90, 4, 2, EGA[14]); }
  R.recorte(null);
  // el chico juega, se vuelve riendo; el adolescente señala la pantalla; la abuela no entiende
  const rie = t > BROMA - 0.1;
  const c = R.actor(EL.chico, 176, 162, t, { dir: rie ? -1 : 1, rie, salto: rie && t < BROMA + 1.2 ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0, sostiene: rie ? undefined : [190, 140] });
  const ad = R.actor(EL.adolescente, 138, 162, t, { dir: 1, dedo: t > GENTE, rie: t > GENTE + 0.2, sorpresa: t < GENTE && t > BROMA });
  const ab = R.actor(EL.abuela, 84, 162, t, { dir: 1, sorpresa: t > JUGADO && t < ENTIENDE, brazos: t > ENTIENDE + 0.1, sonrisa: t < JUGADO, sostiene: t < JUGADO ? true : undefined });
  if (t < JUGADO) { const [mx, my] = ab.mano; R.disco(mx, my, 3, T.C.k); R.disco(mx, my, 2, hex('#c84a6a')); R.linea(mx - 4, my - 4, mx + 3, my + 2, hex('#c8c8d0')); R.linea(mx + 4, my - 4, mx - 3, my + 2, hex('#c8c8d0')); R.linea(mx, my + 3, mx + 3, 160, hex('#c84a6a')); }
  if (t > JUGADO) R.bocadillo(ab.cabeza[0], ab.cabeza[1] - 6, { icono: '?' });
  // las carcajadas: «!» saltarines encima del chico
  if (rie && t < BROMA + 1.6) R.bocadillo(c.cabeza[0], c.cabeza[1] - 8 - (Math.floor(t * 6) % 2), { icono: '!' });
};
const efectos = [[ROGER, 'golpecito'], [RESCUE + 0.05, 'pop'], [ANDRO + 0.1, 'cerrojo'], [EVIL + 0.4, 'aviso'], [SALTA, 'whoosh'], [SALTA + 1.0, 'brillo'], [PRIMERO, 'campana'], [DOS - 0.1, 'whoosh'], [NUNCA, 'pop'], [ATERRIZA, 'boing'], [CUADRADO, 'bip'], [DIECISEIS, 'brillo'], [BROMA, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P3 ? 1989 : 1991) });
''')

E['si-larry'] = ('Larry', '''// SI-LARRY (frases 47–49), sin cartela, año 1987. Cuatro planos (comedia blanca: flores y mala suerte):
// 1. el aparcamiento de noche bajo la llovizna: el ligón del traje blanco llega con su ramo, se mira en el charco y se
//    peina; una señora con paraguas pasa por detrás sin mirarle; en «Larry» le brilla la sonrisa (corta en «A comedy»);
// 2. la calle de los neones: ofrece las flores a la ventana; en «bad luck» la persiana cae de golpe, las flores se
//    mustian y sale un corazón partido («love»); un coche pasa por el charco y lo empapa (corta en «It was written»);
// 3. el bar del piano: el humorista de gafas escribe chistes en servilletas; en «music teacher» coge el saxofón y toca;
//    en «jokes» dobla una servilleta en avión y se la lanza a un cliente, que se ríe y da una palmada en la barra
//    («ridiculous endings»); en el escenario canta una cantante (corta en «to start playing»);
// 4. la puerta trasera del bar (gag 6): un chaval llama; se abre la mirilla; el cartel pregunta con iconos (un
//    tocadiscos, «questions»; un coche viejo, «in theory»); se rasca la cabeza; en «adult» sale la X roja, la mirilla
//    se cierra de golpe y él se encoge de hombros.''', r'''
const la = (f) => en('larry', f), lo = (f) => en('lowe', f), ex = (f) => en('examen', f);
const P2 = la(0.46), P3 = lo(0), P4 = ex(0);
const LARRY = la(0.33), MALA = la(0.807), AMOR = la(0.913);
const AL = lo(0.099), MUSICA = lo(0.332), CHISTES = lo(0.656), FINALES = lo(0.786);
const LLAMA = ex(0.12), RESPONDE = ex(0.288), PREGUNTAS = ex(0.381), TEORIA = ex(0.628), ADULTO = ex(0.841);
const grueso = (x0, y0, x1, y1, c, w) => { for (let i = 0; i < w; i++) for (let j = 0; j < w; j++) R.linea(x0 + i - (w >> 1), y0 + j - (w >> 1), x1 + i - (w >> 1), y1 + j - (w >> 1), c); };
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0] = pts[i], [t1, x1] = pts[i + 1]; if (t < t1) return { x: Math.round(lerp(x0, x1, (t - t0) / (t1 - t0))), mv: x1 !== x0 }; }
  return { x: pts[pts.length - 1][1], mv: false };
};
// el ramo de flores en la mano (mustia 0–1: se doblan y se apagan)
const ramo = (m, t, mustia = 0) => {
  const [x, y] = m;
  const cab = [[-4, -7], [0, -10], [4, -7], [-2, -4], [2, -4], [0, -6]], cols = ['#e84a5a', '#f2d03a', '#e87ab0', '#ffffff', '#e84a5a', '#c84ae8'];
  cab.forEach(([dx, dy], k) => { const cae = mustia * (5 + k % 3), fx = x + dx + Math.round(Math.sign(dx || 1) * mustia * 4), fy = y + dy + Math.round(cae) + Math.round(Math.sin(t * 3 + k) * 0.6 * (1 - mustia));
    R.linea(x, y - 1, fx, fy + 1, mustia > 0.5 ? hex('#6a7a3a') : hex('#3a9a3a')); R.disco(fx, fy, 1, mustia > 0.6 ? hex('#8a6a4a') : hex(cols[k])); if (mustia < 0.6) R.pset(fx, fy, hex('#fff2c0')); });
  R.poligono([[x - 4, y - 2], [x + 4, y - 2], [x, y + 5]], T.C.k); R.poligono([[x - 3, y - 1], [x + 3, y - 1], [x, y + 3]], hex('#f2eee2')); R.pset(x + 2, y - 1, hex('#c8c0b0'));
};
// la llovizna: trazos finos que caen, fuera de la zona de Atom y de la barra del año
const lluvia = (t, y0, n, c) => { for (let k = 0; k < n; k++) { const x = (k * 53 + Math.floor(t * 40) * 7 * (k % 3 + 1)) % 320, y = Math.round(((t * 160 + k * 37) % (180 - y0)) + y0);
  if ((y < 18 && x > 14 && x < 176) || (x > 272 && y < 50)) continue; R.linea(x, y, x - 1, y + 3, c); } };
// un coche de los setenta de lado (56 × 20), con faros encendidos
const coche = (x, y, t, col, colS) => {
  R.poligono([[x + 14, y - 12], [x + 20, y - 19], [x + 38, y - 19], [x + 45, y - 12]], T.C.k); R.poligono([[x + 15, y - 12], [x + 21, y - 18], [x + 37, y - 18], [x + 43, y - 12]], col);
  R.poligono([[x + 17, y - 12], [x + 22, y - 17], [x + 28, y - 17], [x + 28, y - 12]], hex('#2a3450')); R.poligono([[x + 30, y - 12], [x + 30, y - 17], [x + 36, y - 17], [x + 41, y - 12]], hex('#2a3450'));
  R.linea(x + 23, y - 16, x + 25, y - 13, hex('#8aa0c8')); R.linea(x + 32, y - 16, x + 34, y - 13, hex('#8aa0c8'));
  R.rect(x + 1, y - 13, x + 55, y - 4, T.C.k); R.rect(x + 2, y - 12, x + 54, y - 5, col); R.rect(x + 2, y - 7, x + 54, y - 5, colS); R.rect(x + 2, y - 12, x + 54, y - 12, hex('#ffffff'));
  R.rect(x, y - 6, x + 56, y - 6, hex('#d8d8e0')); R.rect(x + 54, y - 11, x + 56, y - 9, hex('#fff4a0')); R.rect(x, y - 11, x + 1, y - 9, hex('#e84a3a')); R.rect(x + 29, y - 10, x + 31, y - 10, hex('#d8d8e0'));
  for (const wx of [x + 12, x + 44]) { R.disco(wx, y - 2, 5, T.C.k); R.disco(wx, y - 2, 3, hex('#4a4a58')); R.disco(wx, y - 2, 1, hex('#c8c8d0')); const a = t * 22; R.pset(wx + Math.round(Math.cos(a) * 2), y - 2 + Math.round(Math.sin(a) * 2), hex('#e8e8f0')); }
  for (let k = 0; k < 18; k++) R.linea(x + 57 + k, y - 10 - Math.round(k * 0.2), x + 57 + k, y - 8 + Math.round(k * 0.35), (k + x) % 3 ? hex('#5a5a40') : hex('#7a7a50'));
};
// un corazón partido (símbolo) que se separa
const corazon = (x, y, u) => {
  const d = Math.round(u * 3), C = [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]];
  for (const [i, j] of C) { const izq = i < 3 || (i === 3 && j % 2 === 0); const xx = x + i * 2 + (izq ? -d : d), yy = y + j * 2 + (izq ? d : 0); R.rect(xx - 1, yy - 1, xx + 2, yy + 2, T.C.k); }
  for (const [i, j] of C) { const izq = i < 3 || (i === 3 && j % 2 === 0); const xx = x + i * 2 + (izq ? -d : d), yy = y + j * 2 + (izq ? d : 0); R.rect(xx, yy, xx + 1, yy + 1, j < 1 ? hex('#ff9aa8') : hex('#e83a4a')); }
};

// 1. el aparcamiento de noche: llega con el ramo, se mira en el charco y se peina; la señora del paraguas pasa
const p1 = (t) => {
  T.ciudad(R, t, { encuadre: 'calle', camara: 'coche', luz: 'noche' });
  lluvia(t, 0, 50, hex('#7a8ab8'));
  // la señora del paraguas pasa por detrás, con la nariz en alto
  { const g = ruta(t, [[0.3, 330], [P2, 70]]); const s = R.actor(EL.actriz, g.x, 152, t, { dir: -1, anda: g.mv, sostiene: [g.x + 2, 132] });
    const [mx, my] = s.mano; R.linea(mx, my, mx, my - 16, T.C.k); R.poligono([[mx - 14, my - 14], [mx, my - 22], [mx + 14, my - 14]], T.C.k); R.poligono([[mx - 13, my - 15], [mx, my - 21], [mx + 13, my - 15]], hex('#c83a6a'));
    for (const dx of [-13, -6, 0, 6, 13]) R.pset(mx + dx, my - 14, hex('#8a1a4a')); R.linea(mx - 5, my - 18, mx - 1, my - 20, hex('#ff8ab0')); }
  // el ligón: llega, se mira en el charco, se peina y sonríe; se vuelve hacia la señora con las flores
  const g = ruta(t, [[0, -18], [LARRY - 1.2, 190]]), peina = t > LARRY - 1.0 && t < LARRY - 0.1, ofrece = t > LARRY + 0.4;
  const l = R.actor(EL.ligon, g.x, 176, t, { dir: ofrece ? -1 : 1, anda: g.mv, dedo: peina, sonrisa: !g.mv, sostiene: peina ? undefined : ofrece ? [g.x - 2, 150] : true });
  if (!peina) ramo(l.mano, t);
  else { R.rect(l.cabeza[0] + 3, l.cabeza[1] + 1, l.cabeza[0] + 7, l.cabeza[1] + 2, hex('#e84a5a')); for (let i = 0; i < 3; i++) R.pset(l.cabeza[0] + 3 + i * 2, l.cabeza[1] + 3, hex('#e84a5a')); }
  // su reflejo en el charco y el destello de la sonrisa en «Larry»
  if (!g.mv) for (let k = 0; k < 6; k++) R.pset(206 + k * 2, 174 + (k % 2) + Math.round(Math.sin(t * 6 + k)), hex('#f2eee2'));
  if (t > LARRY && t < LARRY + 0.5) { const [cx, cy] = l.cabeza, f = Math.floor((t - LARRY) * 10) % 2; R.linea(cx + 6, cy + 6 - 4 - f, cx + 6, cy + 6 + 4 + f, hex('#ffffff')); R.linea(cx + 2 - f, cy + 6, cx + 10 + f, cy + 6, hex('#ffffff')); R.pset(cx + 6, cy + 6, hex('#fff6a0')); }
};
// 2. la calle de los neones: las flores a la ventana, la persiana, el corazón partido y el coche que lo empapa
const p2 = (t) => {
  const cierra = tramo(t, MALA - 0.1, MALA + 0.1);
  T.ciudad(R, t, { encuadre: 'calle', luz: 'noche', ventana: cierra });
  // la vecina en la ventana dice que no con la cabeza (recortada al hueco, y tapada por la persiana que baja)
  if (cierra < 1) { R.recorte([176, 104 + Math.round(cierra * 25), 202, 128]); const hx = 192 + Math.round(Math.sin(t * 8) * (t > P2 + 1.2 ? 2 : 0));
    R.poligono([[182, 129], [186, 120], [198, 120], [202, 129]], hex('#3a2a4a')); R.disco(hx, 114, 5, hex('#3a2a4a')); R.disco(hx - 1, 110, 4, hex('#5a3a5a')); R.recorte(null); }
  // el ligón ofrece el ramo; la persiana cae; el ramo se mustia; el corazón se parte; el coche lo salpica
  const sale = ruta(t, [[P2, 150], [P2 + 0.8, 176], [AMOR + 0.9, 176], [P3, 70]]), moja = AMOR + 0.45, mojado = t > moja;
  const mustia = tramo(t, MALA + 0.2, MALA + 0.9), ofrece = t > P2 + 0.8 && t < AMOR;
  const l = R.actor(EL.ligon, sale.x, 152, t, { dir: t > AMOR + 0.9 ? -1 : 1, anda: sale.mv, sonrisa: t < MALA, sorpresa: t > MALA && t < MALA + 0.5, triste: t > MALA + 0.5, sostiene: ofrece ? [sale.x + 15, 128] : true });
  ramo(l.mano, t, mustia);
  // los pétalos que caen
  for (let k = 0; k < 5; k++) { const u = tramo(t, MALA + 0.3 + k * 0.12, MALA + 1.1 + k * 0.12); if (u > 0 && u < 1) R.pset(194 + k * 2 - Math.round(u * 6), Math.round(lerp(122, 151, u)) + (k % 2), hex(['#e84a5a', '#f2d03a', '#e87ab0', '#ffffff', '#c84ae8'][k])); }
  if (t > AMOR - 0.15 && t < AMOR + 1.3) corazon(l.cabeza[0] - 7, l.cabeza[1] - 22, tramo(t, AMOR, AMOR + 0.3));
  // el coche que pasa por el charco y lo empapa
  const cx = Math.round(lerp(-70, 330, tramo(t, moja - 0.8, moja + 0.8)));
  if (mojado) { const u = tramo(t, moja, moja + 0.5); for (let k = 0; k < 10; k++) { const x = Math.round(lerp(150 + k * 4, sale.x + 2 + k * 1.4, u)), y = Math.round(lerp(168, 136 + (k % 3) * 4, u) - Math.sin(u * Math.PI) * 12); if (u < 1) R.disco(x, y, 1, hex('#8ac8f0')); }
    if (u >= 1) for (let k = 0; k < 4; k++) { const f = ((t - moja) * 2 + k / 4) % 1; R.pset(sale.x + 3 + k * 3, 132 + Math.round(f * 20), hex('#8ac8f0')); } }
  coche(cx, 176, t, hex('#c86a2a'), hex('#8a4a1a'));
  lluvia(t, 0, 40, hex('#8a7ab8'));
};
// 3. el bar: servilletas, saxofón, el avión de papel y la carcajada del cliente
const saxo = (x, y, toca) => {   // (x, y): la boquilla
  R.linea(x, y, x + 3, y + 2, T.C.k); R.linea(x + 3, y + 2, x + 3, y + 13, hex('#c8963a')); R.linea(x + 4, y + 2, x + 4, y + 13, hex('#ffd860'));
  R.disco(x + 6, y + 14, 3, hex('#c8963a')); R.disco(x + 6, y + 13, 2, hex('#ffd860')); R.linea(x + 8, y + 12, x + 9, y + 6, hex('#c8963a')); R.rect(x + 8, y + 4, x + 11, y + 6, hex('#ffd860')); R.rect(x + 9, y + 5, x + 10, y + 5, T.C.k);
  for (let k = 0; k < 3; k++) R.pset(x + 2, y + 5 + k * 3, hex('#7a5a1a'));
  if (toca) for (let k = 0; k < 3; k++) { const f = ((toca * 2) + k / 3) % 1, nx = x + 12 + Math.round(f * 16), ny = y + 2 - Math.round(f * 18) + Math.round(Math.sin(f * 9) * 2); const c = k % 2 ? hex('#ffd860') : hex('#7ae8ff');
    R.rect(nx, ny, nx + 1, ny + 1, c); R.rect(nx + 2, ny - 5, nx + 2, ny + 1, c); R.rect(nx + 3, ny - 5, nx + 4, ny - 4, c); }
};
const servilleta = (x, y, c = '#f2eee2') => { R.rect(x, y, x + 6, y + 3, T.C.k); R.rect(x + 1, y, x + 5, y + 2, hex(c)); R.linea(x + 2, y + 1, x + 4, y + 1, hex('#5a6a9a')); };
const p3 = (t) => {
  T.ciudad(R, t, { encuadre: 'bar', piano: true });
  // la pila de servilletas con chistes crece en la mesa alta
  const pila = 2 + Math.floor(tramo(t, P3, FINALES) * 5);
  for (let k = 0; k < pila; k++) servilleta(140 + (k % 2), 145 - k * 2, k % 3 ? '#f2eee2' : '#e8e0c0');
  // la cantante en el escenario, junto al micro
  { const w = R.actor(EL.cajera, 262, 139, t, { dir: 1, habla: Math.sin(t * 7) > -0.2, sonrisa: true, sostiene: [279, 118] });
    for (let k = 0; k < 2; k++) { const f = ((t * 0.7 + k / 2) % 1), nx = 268 - Math.round(f * 14), ny = 108 - Math.round(f * 26); if (ny > 50) { const c = k ? hex('#ffd860') : hex('#ff9ab8'); R.rect(nx, ny, nx + 1, ny + 1, c); R.rect(nx + 2, ny - 5, nx + 2, ny + 1, c); R.rect(nx + 3, ny - 5, nx + 4, ny - 4, c); } } }
  // los dos clientes de la barra
  const lee = t > CHISTES + 0.55, carcajada = t > FINALES;
  const c1 = R.actor(EL.cartero, 64, 166, t, { dir: 1, sostiene: lee ? true : undefined, rie: carcajada, sonrisa: lee && !carcajada, salto: carcajada && t < FINALES + 0.8 ? Math.round(Math.abs(Math.sin(t * 10)) * 2) : 0 });
  if (lee) servilleta(c1.mano[0] - 3, c1.mano[1] - 2);
  R.actor(EL.policia2, 30, 166, t, { dir: 1, rie: t > FINALES + 0.4, sonrisa: t <= FINALES + 0.4, habla: t < CHISTES && Math.sin(t * 5) > 0.3 });
  // el humorista: escribe; en «music teacher» toca el saxofón; dobla un avión y lo lanza
  const toca = t > MUSICA - 0.15 && t < CHISTES - 0.5, lanza = t > CHISTES - 0.3 && t < CHISTES + 0.15;
  const h = R.actor(EL.humorista, 120, 166, t, { dir: 1, rie: t > FINALES + 0.2 || (toca && Math.sin(t * 4) > 0.8), sonrisa: true, sostiene: toca ? [133, 132] : lanza ? [128, 134] : [134, 146 + (Math.floor(t * 6) % 2)], habla: t < AL && Math.sin(t * 6) > 0 });
  if (toca) saxo(h.mano[0] - 2, h.mano[1] - 4, t);
  else { R.linea(h.mano[0], h.mano[1], h.mano[0] + 3, h.mano[1] - 4, hex('#e8c040')); R.pset(h.mano[0] + 3, h.mano[1] - 5, hex('#e87a8a'));
    // el saxofón descansa en su soporte junto a la mesa
    R.linea(160, 166, 163, 154, T.C.k); R.linea(166, 166, 163, 154, T.C.k); saxo(158, 140, 0); }
  // el avión de papel vuela hasta el cliente
  { const u = tramo(t, CHISTES, CHISTES + 0.55); if (u > 0 && u < 1) { const x = Math.round(lerp(130, 80, u)), y = Math.round(lerp(132, 140, u) - Math.sin(u * Math.PI) * 18);
    R.poligono([[x, y], [x + 9, y - 3], [x + 9, y + 2]], T.C.k); R.poligono([[x + 1, y], [x + 8, y - 2], [x + 8, y + 1]], hex('#f2eee2')); R.linea(x + 3, y + 1, x + 8, y + 1, hex('#c8c0b0'));
    for (let k = 1; k < 4; k++) R.pset(x + 9 + k * 3, y - 1 + Math.round(Math.sin(u * 9 + k) * 2), hex('#a8a0c0')); } }
  // la palmada en la barra
  if (carcajada && t < FINALES + 0.35) for (let k = 0; k < 5; k++) R.pset(78 + Math.round(Math.cos(k * 1.2) * 7), 128 + Math.round(Math.sin(k * 1.2) * 4) - 2, hex('#fff2a0'));
};
// 4. la puerta trasera del bar: el examen con iconos (gag 6)
const rata = (x, y, t, dir) => { R.disco(x, y - 2, 3, T.C.k); R.disco(x, y - 2, 2, hex('#7a7480')); R.disco(x + dir * 3, y - 3, 2, T.C.k); R.disco(x + dir * 3, y - 3, 1, hex('#8a8490')); R.pset(x + dir * 5, y - 3, hex('#e8a0b0')); R.pset(x + dir * 2, y - 5, hex('#e8a0b0'));
  R.linea(x - dir * 3, y - 1, x - dir * 8, y - 2 + Math.round(Math.sin(t * 12)), hex('#c88a9a')); if (Math.floor(t * 12) % 2) { R.pset(x - 1, y, T.C.k); R.pset(x + 2, y, T.C.k); } };
const p4 = (t) => {
  const icono = t > TEORIA + 0.4 ? 'coche' : t > PREGUNTAS - 0.1 ? 'tocadiscos' : undefined;
  const mir = tramo(t, RESPONDE - 0.2, RESPONDE + 0.2) * (1 - tramo(t, ADULTO + 0.4, ADULTO + 0.55));
  T.ciudad(R, t, { encuadre: 'bar', camara: 'puerta', mirilla: mir, icono });
  // la X roja en el cartel cuando falla
  if (t > ADULTO) { const u = tramo(t, ADULTO, ADULTO + 0.25), l = Math.round(16 * u); grueso(190 - l, 78 - l, 190 + l, 78 + l, T.C.k, 5); grueso(190 + l, 78 - l, 190 - l, 78 + l, T.C.k, 5); grueso(190 - l, 78 - l, 190 + l, 78 + l, hex('#e83a3a'), 3); grueso(190 + l, 78 - l, 190 - l, 78 + l, hex('#e83a3a'), 3); }
  // la rata del callejón corre, olfatea y vuelve
  { const fase = tramo(t, P4 + 0.6, P4 + 2.4), x = Math.round(fase < 0.5 ? lerp(330, 238, fase * 2) : lerp(238, 330, (fase - 0.5) * 2)); if (fase > 0 && fase < 1) rata(x, 168, t, fase < 0.5 ? -1 : 1); }
  // el chaval: llega, llama, mira el cartel, piensa, se rasca la cabeza, falla y se encoge de hombros
  const g = ruta(t, [[P4, 40], [LLAMA + 0.5, 148]]), llama = t > LLAMA + 0.5 && t < RESPONDE - 0.1, piensa = t > PREGUNTAS + 0.2 && t < TEORIA, rasca = t >= TEORIA && t < ADULTO - 0.4;
  const responde = t >= ADULTO - 0.4 && t < ADULTO, falla = t >= ADULTO;
  const a = R.actor(EL.adolescente, g.x, 162, t, { dir: llama ? -1 : 1, anda: g.mv, dedo: llama || rasca || responde, sorpresa: falla && t < ADULTO + 0.6, brazos: falla && t >= ADULTO + 0.6, sonrisa: responde, habla: responde && Math.sin(t * 12) > 0 });
  if (llama) { const f = Math.floor(t * 6) % 2; if (f) for (let k = 0; k < 3; k++) R.pset(140 + k, 120 - k * 2, hex('#fff2a0')); }
  if (piensa) R.bocadillo(a.cabeza[0], a.cabeza[1] - 6, { icono: '?' });
  if (rasca) for (let k = 0; k < 3; k++) { const f = ((t * 3 + k / 3) % 1); R.pset(a.cabeza[0] + 6 + k * 2, a.cabeza[1] - 2 - Math.round(f * 6), hex('#fff2a0')); }
};
const efectos = [[LARRY, 'brillo'], [MALA, 'puerta'], [AMOR + 0.45, 'chof'], [AL + 0.2, 'lapiz'], [CHISTES, 'whoosh'], [FINALES, 'palmada'], [LLAMA + 0.6, 'toc'], [RESPONDE, 'cerrojo'], [PREGUNTAS, 'bip'], [TEORIA + 0.4, 'bip'], [ADULTO, 'aviso'], [ADULTO + 0.5, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1987 });
''')
