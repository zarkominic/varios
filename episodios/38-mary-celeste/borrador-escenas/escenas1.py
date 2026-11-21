E = {}
E['mc-gancho'] = ('Gancho', '''// MC-GANCHO (frases 1–2), sin cartela; 1872 (1884 en el escritorio del escritor, 2026 en el laboratorio). Siete planos:
// 1. (0) EL BARCO SOLO en el Atlántico gris, dando bandazos con cuatro trapos; por el horizonte de la izquierda se acerca
//    el Dei Gratia y en «found» destella su catalejo; en «alone» una racha levanta rociones.
// 2. («There was no one», 6,82) LA CUBIERTA VACÍA: golpe en «no one»: una racha abre de golpe la puerta de la caseta, que
//    bate; un balde suelto rueda de un lado a otro con el balanceo; la vela de estay rota flamea; en «six months» la
//    puerta se cierra de un portazo.
// 3. («and the ten people», 11,43) EL TIMÓN que gira solo; el farolillo de la bitácora tiembla y en «never seen again» se
//    apaga con un hilo de humo; en el silencio, una gaviota baja y se posa en la regala de popa.
// 4. («Her name was», 17,43) EL CAMAROTE VACÍO: con el balanceo cae un carrete de la máquina de coser y rueda por el suelo
//    soltando hilo rojo; las hojas del diario se levantan; en «what happened» sale un «?» sobre el diario.
// 5. («Along the way», 24,11) LA BODEGA en el viaje: en «captain» baja el capitán por la escala con el farol, detrás su
//    mujer y la niña; en «seventeen hundred» levanta el farol y sale el 1700 sobre los barriles; en «alcohol» la niña
//    arruga la nariz.
// 6. («a prosecutor», 29,31) 1884, el escritorio del escritor: un recorte de periódico con la espada y la lupa entra sobre
//    la revista y en «blood everywhere» se llena de manchas rojas; en «a writer» la mano coge la pluma y escribe.
// 7. («and chemists», 33,93) 2026, la maqueta de Mánchester: la mano pulsa el encendido en «blew up»: fogonazo azul, la
//    tapa vuela girando y vuelve a caer; la mano se retira.''', r'''
// los instantes, de las palabras de la voz inglesa: ts (frase «solo», 0,5–14,72 s) y tc (frase «camino», 17,434–37,238 s)
const ts = (s) => en('solo', (s - 0.5) / 14.22), tc = (s) => en('camino', (s - 17.434) / 19.804);
const P2 = ts(6.82), P3 = ts(11.43), P4 = tc(17.434), P5 = tc(24.11), P6 = tc(29.31), P7 = tc(33.93);
const K = hex('#17151d'), BL = hex('#f6f2ea'), ease = (u) => u * u * (3 - 2 * u);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 2) for (const d of [-1, 1]) { R.pset(x + d, y + d, c); R.pset(x + d, y - d, c); } };
// la gaviota (a escala 2): de lado, mirando a dir, con las alas que baten (ala 0–1) o plegada (posada)
const GAV = ['...kk.....', '..kwwk....', '.Ywwwwk...', '..kwwwwgk.', '...kwwgggk', '....kkkkk.'];
const gaviota = (x, y, dir, ala, posada) => {
  x = Math.round(x); y = Math.round(y); const col = { k: K, w: BL, g: hex('#9aa2ac'), Y: hex('#f0b030'), s: hex('#5a626c') };
  const px = (i, j, c) => { const xx = dir < 0 ? x + i * 2 - 10 : x + 10 - i * 2 - 2; R.rect(xx, y + j * 2 - 12, xx + 1, y + j * 2 - 11, c); };
  GAV.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') px(i, j, col[ch]); }));
  if (posada) { px(5, 6, col.Y); px(7, 6, col.Y); }
  else { const h = Math.round((ala - 0.5) * 7); for (const [sx, c] of [[-1, col.s], [1, col.g]]) { const ox = x + sx * 1, oy = y - 5; R.linea(ox, oy, ox - 9, oy - 2 - h, K); R.linea(ox, oy - 1, ox - 9, oy - 3 - h, c); R.linea(ox, oy, ox + 9, oy - 2 - h, K); R.linea(ox, oy - 1, ox + 9, oy - 3 - h, c); } }
};

// ── 1 · el barco solo; el Dei Gratia se acerca ─────────────────────────────────────────────────────────────────
const FOUND = ts(3.36), ALONE = ts(4.52);
const p1 = (t) => {
  const dg = 0.15 + 0.85 * ease(tramo(t, 0, P2 + 0.5));
  const g = T.mar(R, t, { encuadre: 'alta', luz: 'gris', velas: 'pocas', deiGratia: dg, bandazo: 0.75 + 0.25 * tramo(t, ALONE - 0.3, ALONE + 0.4) });
  // el catalejo del vigía del Dei Gratia destella al ver el barco («found»)
  const gl = tramo(t, FOUND - 0.1, FOUND + 0.2) - tramo(t, FOUND + 0.9, FOUND + 1.3);
  if (gl > 0) destello(Math.round(lerp(40, 50, dg)), 92, Math.round(1 + gl * 3), Math.floor(t * 12) % 2 ? BL : hex('#fff0a0'));
  // «alone»: la racha levanta un roción contra la proa
  const ro = tramo(t, ALONE, ALONE + 1.1);
  if (ro > 0 && ro < 1 && g.proa) for (let k = 0; k < 26; k++) { const a = -1.9 + (k % 9) * 0.16, d = 6 + ro * (16 + (k * 7) % 14), x = Math.round(g.proa[0] - 6 + Math.cos(a) * d), y = Math.round(g.proa[1] + 24 + Math.sin(a) * d + ro * ro * 18); if (y < 160) R.pset(x, y, k % 3 ? BL : hex('#c8d8e0')); }
};

// ── 2 · la cubierta vacía: golpe en «no one» ────────────────────────────────────────────────────────────────────
const NOONE = ts(7.02), CIERRA = ts(10.31);
const balde = (x, y, fase) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y + 2, x + 20, y + 3, mez(R.pget(x, y + 2), K, 0.35));
  R.rect(x, y - 13, x + 18, y, K); R.rect(x + 1, y - 12, x + 17, y - 1, T.C.robleB);
  for (let i = 0; i < 5; i++) { const yy = y - 12 + ((i * 3 + Math.floor(fase)) % 12 + 12) % 12; R.rect(x + 1, yy, x + 17, yy, T.C.robleBS); }
  R.rect(x + 1, y - 12, x + 17, y - 11, hex('#e0b878'));
  for (const hx of [4, 14]) { R.rect(x + hx, y - 12, x + hx + 1, y - 1, T.C.aro); R.rect(x + hx, y - 12, x + hx, y - 1, hex('#7a7a84')); }
  R.rect(x + 18, y - 12, x + 20, y - 1, K); R.rect(x + 18, y - 11, x + 19, y - 2, hex('#3a2a1a')); R.pset(x + 19, y - 10, hex('#5a7a8a'));
  const an = fase * 0.8; R.linea(x + 9, y - 6, x + 9 + Math.round(Math.cos(an) * 10), y - 6 + Math.round(Math.sin(an) * 7), K); R.linea(x + 9, y - 7, x + 9 + Math.round(Math.cos(an) * 10), y - 7 + Math.round(Math.sin(an) * 7), hex('#c8b890'));
};
const p2 = (t) => {
  const o = { encuadre: 'cubierta' };
  T.abordo(R, t, o);
  // la puerta de la caseta: la racha la abre de golpe en «no one», bate con el balanceo y se cierra de un portazo
  const ab = tramo(t, NOONE, NOONE + 0.14), ci = tramo(t, CIERRA - 0.12, CIERRA);
  const a = ab * (1 - ci) * (0.72 + 0.28 * Math.sin((t - NOONE) * 2.6));
  if (a > 0.02) {
    R.rect(235, 95, 248, 125, hex('#1a1410')); R.rect(236, 96, 247, 104, hex('#2a2018')); R.rect(239, 110, 244, 125, hex('#2a2018'));
    if (Math.floor(t * 3) % 4) R.pset(241, 99, hex('#c89a4a'));   // el reflejo del farolillo apagado, dentro
    const w = Math.max(1, Math.round(15 * Math.sin(a * Math.PI / 2)));
    R.rect(234 - w, 93, 234, 127, K); R.rect(235 - w, 94, 233, 126, T.C.tabla);
    for (let xx = 235 - w + 3; xx < 233; xx += 4) R.rect(xx, 94, xx, 126, T.C.tablaS);
    R.rect(235 - w, 100, 233, 100, T.C.tablaS); R.rect(235 - w, 119, 233, 119, T.C.tablaS); if (w > 4) R.pset(236 - w, 110, hex('#e0c060'));
  }
  // la ráfaga del golpe: rayas de viento que cruzan la cubierta
  const rf = tramo(t, NOONE, NOONE + 0.7);
  if (rf > 0 && rf < 1) for (let k = 0; k < 6; k++) { const y = 100 + k * 9, x0 = Math.round(lerp(-40, 330, rf) - k * 18); R.linea(x0, y, x0 + 26, y - 2, mez(R.pget(x0 + 10, y), BL, 0.6)); }
  // un balde suelto rueda de un lado a otro con el balanceo, por el pasillo libre de la cubierta
  const s = 0.5 - 0.5 * Math.cos((t - P2) * 1.35), bx = lerp(60, 186, s);
  balde(bx, 160, bx * 0.45);
  T.abordoDelante(R, t, o);
};

// ── 3 · el timón gira solo; el farolillo de la bitácora se apaga ─────────────────────────────────────────────────
const NUNCA = ts(13.65), OTRA = ts(14.25);
const p3 = (t) => {
  const o = { encuadre: 'alta', camara: 'timon', luz: 'gris', giro: Math.sin((t - P3) * 1.1) * 1.3 + Math.sin((t - P3) * 2.9) * 0.25 + tramo(t, OTRA + 0.6, P4) * 2.4, bandazo: 0.7 };
  const g = T.mar(R, t, o);
  // el farolillo de la bitácora: tiembla y se apaga en «never seen again»; sube un hilo de humo
  const bx = 140, by = 147, apaga = tramo(t, OTRA - 0.15, OTRA + 0.15);
  R.rect(bx - 4, by - 4, bx + 4, by + 4, K); R.rect(bx - 3, by - 3, bx + 3, by + 3, hex('#3a3024'));
  if (apaga < 1) {
    const f = (1 - apaga) * (0.75 + 0.25 * Math.sin(t * 23) * Math.sin(t * 7)), C1 = hex('#ffd860'), C2 = hex('#ff9a30');
    for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j) / 10; if (d < 1 && (i + j) % 2 === 0) { const px = bx + i, py = by + j; R.pset(px, py, mez(R.pget(px, py), C1, (1 - d) * 0.45 * f)); } }
    R.rect(bx - 2, by - 2, bx + 2, by + 2, mez(hex('#3a3024'), C2, f)); R.rect(bx - 1, by - 1 - Math.round(f), bx + 1, by + 1, mez(hex('#3a3024'), C1, f));
  }
  R.rect(bx - 4, by, bx + 4, by, K); R.rect(bx, by - 4, bx, by + 4, K);
  const hu = tramo(t, OTRA, OTRA + 2.4);
  if (hu > 0 && hu < 1) for (let k = 0; k < 14; k++) { const q = k / 14; if (q > hu * 1.1) continue; const px = Math.round(bx + Math.sin(q * 9 + t * 2) * (2 + q * 5) + q * 8), py = Math.round(by - 6 - q * 34); R.pset(px, py, mez(R.pget(px, py), hex('#d8dce0'), 0.75 * (1 - q))); }
  // en el silencio, una gaviota baja y se posa en la regala de popa
  const gv = tramo(t, ts(14.4), P4 - 0.5), gx = lerp(330, 176, ease(gv)), gy = lerp(40, 121, ease(gv)) - Math.sin(gv * Math.PI) * 14;
  if (gv > 0) gaviota(gx, gy, -1, (Math.sin(t * 14) + 1) / 2, gv >= 1);
  T.marDelante(R, t, o);
};

// ── 4 · el camarote vacío: el carrete rueda, el diario se levanta, «?» ────────────────────────────────────────────
const CAE = tc(17.75), SUELO = tc(18.25), QUE = tc(23.07);
const globo = (x, y, ic, c) => { R.disco(x, y, 8, K); R.disco(x, y, 7, BL); R.pset(x - 2, y + 8, K); R.pset(x - 1, y + 8, K); R.pset(x - 1, y + 7, BL); R.pset(x - 2, y + 9, K); R.icono(ic, x - 3, y - 5, c, null, 1.4); };
const p4 = (t) => {
  const o = { encuadre: 'camarote' };
  T.abordo(R, t, o);
  // el carrete de hilo rojo: cae de la máquina de coser, bota y rueda por el suelo hacia la izquierda con el balanceo
  const u = tramo(t, CAE, SUELO), r = tramo(t, SUELO, tc(21.6)), vuelve = tramo(t, tc(21.8), tc(23.4));
  let cx, cy;
  if (u < 1) { cx = lerp(246, 236, u); cy = lerp(110, 157, u * u); }
  else { cx = lerp(236, 132, ease(r)) + 14 * Math.sin(vuelve * Math.PI); cy = 157 - Math.abs(Math.sin(tramo(t, SUELO, SUELO + 0.35) * Math.PI)) * 5; }
  const RO = hex('#c8303a'), ROS = hex('#8a1a24');
  // el hilo que suelta, de la máquina al carrete (por el suelo)
  if (t > CAE) { R.linea(244, 109, 236, 156, RO); if (u >= 1) R.linea(236, 157, Math.round(cx), 157, RO); }
  { const x = Math.round(cx), y = Math.round(cy), f = Math.floor(cx * 0.6) % 4;
    R.rect(x - 4, y - 6, x + 4, y + 2, K); R.rect(x - 3, y - 5, x + 3, y + 1, RO); R.rect(x - 3, y - 5 + f, x + 3, y - 5 + f, ROS); R.rect(x - 3, y - 3 + f, x + 3, y - 3 + f, hex('#e8505a'));
    R.rect(x - 6, y - 7, x - 4, y + 3, K); R.rect(x + 4, y - 7, x + 6, y + 3, K); R.rect(x - 5, y - 6, x - 5, y + 2, T.C.tablaL); R.rect(x + 5, y - 6, x + 5, y + 2, T.C.tablaS); R.pset(x - 5, y - 2 + (f % 2), K); }
  // las hojas del diario se levantan con la corriente que entra por la puerta
  for (const t0 of [tc(19.4), tc(21.0)]) { const h = Math.sin(tramo(t, t0, t0 + 0.7) * Math.PI); if (h > 0.02) { const dy = Math.round(h * 7); R.poligono([[153, 111], [163, 111], [161, 111 - dy], [151, 111 - dy]], K); R.poligono([[154, 110], [162, 110], [160, 111 - dy], [152, 111 - dy + 1]], hex('#f4ecd8')); } }
  const q = tramo(t, QUE, QUE + 0.25);
  if (q > 0) globo(152, Math.round(96 - q * 4), '?', hex('#3a6ac8'));
  T.abordoDelante(R, t, o);
};

// ── 5 · la bodega en el viaje: la familia baja con el farol; 1700 barriles ────────────────────────────────────
const CAPI = tc(25.59), MIL = tc(27.15), BARR = tc(27.57), ALC = tc(28.41);
const farol = (x, y, t, f = 1) => {
  x = Math.round(x); y = Math.round(y); const C1 = hex('#ffd890');
  for (let j = -34; j <= 34; j++) for (let i = -34; i <= 34; i++) { const d = Math.hypot(i, j) / (30 + f * 6); if (d < 1 && (i + j) % 2 === 0) { const px = x + i, py = y + j; R.pset(px, py, mez(R.pget(px, py), C1, (1 - d) * 0.32)); } }
  R.rect(x - 3, y - 4, x + 3, y + 5, K); R.rect(x - 2, y - 3, x + 2, y + 4, hex('#ffe8a0')); R.pset(x, y + (Math.sin(t * 17) > 0 ? 0 : 1), hex('#ff9a30'));
  R.rect(x - 3, y - 4, x + 3, y - 4, hex('#c8a040')); R.rect(x - 3, y + 5, x + 3, y + 5, hex('#c8a040')); R.pset(x, y - 6, K); R.pset(x - 1, y - 5, K); R.pset(x + 1, y - 5, K);
};
const baja = (t, t0, t1, y0) => { const u = tramo(t, t0, t1); return [u, Math.round(lerp(y0, 170, u))]; };
const p5 = (t) => {
  const o = { encuadre: 'bodega', estado: 'viaje' };
  T.abordo(R, t, o);
  // el capitán baja por la escala con el farol y va hacia los barriles; en «seventeen hundred» levanta el farol
  const [ub, yb] = baja(t, tc(24.3), CAPI, 32), wb = tramo(t, CAPI + 0.1, MIL - 0.1), xb = Math.round(lerp(200, 112, ease(wb)));
  const alza = tramo(t, MIL - 0.15, MIL + 0.2), vuelta = t > ALC - 0.1;
  const mano = alza > 0 ? [xb - 6, yb - 30 - Math.round(alza * 4)] : [xb - 2, yb - 20];
  const a = R.actor(EL.briggsMC, xb, yb, t, { dir: vuelta ? 1 : -1, anda: (ub > 0 && ub < 1) || (wb > 0 && wb < 1), habla: vuelta && Math.sin(t * 7) > 0, sonrisa: vuelta, sostiene: vuelta ? [xb + 16, yb - 20] : mano });
  // su mujer detrás, y la niña, que en «alcohol» arruga la nariz
  const [us, ys] = baja(t, tc(25.2), tc(26.4), 32), ws = tramo(t, tc(26.45), tc(27.3)), xs = Math.round(lerp(200, 166, ease(ws)));
  if (t > tc(25.2)) R.actor(EL.sarahMC, xs, ys, t, { dir: -1, anda: (us > 0 && us < 1) || (ws > 0 && ws < 1), sonrisa: t > ALC + 0.8 });
  const [uf, yf] = baja(t, tc(26.2), tc(27.2), 32), wf = tramo(t, tc(27.25), tc(27.9)), xf = Math.round(lerp(201, 186, ease(wf)));
  if (t > tc(26.2)) R.actor(EL.sophiaMC, xf, yf, t, { dir: -1, anda: (uf > 0 && uf < 1) || (wf > 0 && wf < 1), sorpresa: t > ALC && t < ALC + 0.9, sonrisa: t > ALC + 0.9, salto: t > ALC && t < ALC + 0.3 ? 2 : 0 });
  if (a && a.mano) farol(a.mano[0], a.mano[1] + 4, t, alza);
  // 1700 sobre los barriles de la izquierda
  const n = tramo(t, MIL, MIL + 0.3);
  if (n > 0) R.numero('1700', 52, Math.round(lerp(70, 60, ease(n))), { tam: 16, centro: true });
  // el brillo que recorre las tapas de los barriles en «barrels»
  const br = tramo(t, BARR, BARR + 0.9);
  if (br > 0 && br < 1) for (const [x, y, d] of [[18, 112, 0], [44, 116, 0.15], [30, 140, 0.3], [56, 142, 0.45], [238, 112, 0.2], [266, 118, 0.35], [252, 142, 0.5], [290, 146, 0.65]]) { const k = br - d; if (k > 0 && k < 0.35) destello(x, y, 2, BL); }
  T.abordoDelante(R, t, o);
};

// ── 6 · 1884: el recorte de la espada y la pluma del escritor ─────────────────────────────────────────────────────
const FISCAL = tc(29.39), SANGRE = tc(30.61), ESCRITOR = tc(31.97), LEYENDA = tc(33.33);
const MANCHAS = [[14, 10], [22, 13], [31, 9], [9, 30], [40, 28], [48, 14], [5, 18], [36, 40], [18, 44], [46, 44], [26, 33], [52, 34]];
const recorte = (x, y, t) => {
  x = Math.round(x); y = Math.round(y); const P = hex('#e8dfc4'), PS = hex('#c8bc98'), GR = hex('#8a8272'), ROJ = hex('#b8202a');
  R.rect(x + 2, y + 2, x + 60, y + 58, mez(R.pget(x + 30, y + 30), K, 0.35));
  R.rect(x - 1, y - 1, x + 59, y + 57, K); R.rect(x, y, x + 58, y + 56, P);
  for (let i = 0; i < 59; i += 3) { R.pset(x + i, y - 1, (i % 2) ? P : K); R.pset(x + i + 1, y + 57, (i % 2) ? K : P); }   // el borde rasgado
  for (let j = 4; j < 54; j += 3) { R.rect(x + 3, y + j, x + 10, y + j, GR); R.rect(x + 48, y + j, x + 55, y + j, GR); }   // las columnas, sin letras
  R.rect(x + 12, y + 3, x + 46, y + 52, hex('#f4ecd4')); R.rect(x + 12, y + 3, x + 46, y + 3, PS); R.rect(x + 12, y + 52, x + 46, y + 52, PS);
  // el grabado: la espada (hoja, guarda, puño) y la lupa del fiscal
  R.linea(x + 15, y + 40, x + 42, y + 13, K); R.linea(x + 16, y + 40, x + 43, y + 13, hex('#9aa2ac')); R.linea(x + 15, y + 39, x + 42, y + 12, hex('#d8dce4'));
  R.linea(x + 12, y + 37, x + 19, y + 44, K); R.linea(x + 13, y + 37, x + 19, y + 43, hex('#c8a040'));
  R.linea(x + 14, y + 42, x + 18, y + 46, hex('#4a2e1a')); R.linea(x + 14, y + 43, x + 18, y + 47, K); R.disco(x + 13, y + 48, 1, hex('#c8a040'));
  R.disco(x + 33, y + 21, 8, K); R.disco(x + 33, y + 21, 7, hex('#c8a040')); R.disco(x + 33, y + 21, 5, hex('#dcecf4')); R.disco(x + 33, y + 21, 3, ROJ); R.pset(x + 31, y + 18, BL);
  R.linea(x + 39, y + 27, x + 45, y + 34, K); R.linea(x + 39, y + 28, x + 44, y + 34, hex('#5a3a20'));
  // «blood everywhere»: las manchas se multiplican por el grabado
  const n = Math.floor(tramo(t, SANGRE - 0.2, SANGRE + 1.1) * MANCHAS.length);
  for (let k = 0; k < n; k++) { const [i, j] = MANCHAS[k]; const px = x + 6 + i * 0.85, py = y + 3 + j; R.disco(Math.round(px), Math.round(py), k % 3 ? 1 : 2, ROJ); R.pset(Math.round(px) - 1, Math.round(py) - 1, hex('#e8505a')); }
  if (n >= MANCHAS.length && Math.floor(t * 4) % 2) R.icono('!', x + 50, y - 8, ROJ, null, 1.4);
};
const p6 = (t) => {
  const esc = 0.72 + 0.28 * tramo(t, ESCRITOR + 0.1, P7 - 0.1);
  const o = { encuadre: 'doyle', camara: 'revista', escribe: esc, firma: 0 };
  const g = T.hoy(R, t, o);
  // el recorte entra deslizándose sobre la revista en «a prosecutor»
  const e = ease(tramo(t, FISCAL - 0.05, FISCAL + 0.45));
  recorte(lerp(250, 180, e), lerp(190, 90, e), t);
  // la mano del escritor sujeta la pluma (sobre el cañón) todo el plano: espera mientras entra el recorte y en «a writer»
  // empieza a escribir; en «legend» hace un floreo
  const p = g.pluma || [107, 136], adorno = t > LEYENDA && t < LEYENDA + 0.6 ? Math.round(Math.sin(t * 30) * 2) : 0;
  const wx = p[0] + 13 + adorno, wy = p[1] - 4;
  T.brazo(R, 214, 206, wx, wy, '#3a3a4a', -1, { codo: [wx + 40, wy + 34] });
  if (t > LEYENDA) for (let k = 0; k < 3; k++) { const d = tramo(t, LEYENDA + k * 0.25, LEYENDA + 0.6 + k * 0.25); if (d > 0 && d < 1) destello(p[0] - 6 - k * 10, p[1] - 4 - k * 2, 1 + Math.round((1 - d) * 2), hex('#e8c860')); }
};

// ── 7 · 2026: la maqueta de Mánchester estalla («fuuum») ──────────────────────────────────────────────────────
const VOLO = tc(34.91), ENTENDER = tc(36.05);
const p7 = (t) => {
  const o = { encuadre: 'manchester', camara: 'maqueta', calor: 0.55 + 0.45 * tramo(t, P7, VOLO - 0.1), chispa: tramo(t, VOLO - 0.12, VOLO), estalla: tramo(t, VOLO, VOLO + 1.9) };
  T.laboratorio(R, t, o);
  // la mano con guante azul y bata blanca llega al encendido, pulsa en «blew up» y se retira en «understand»
  const llega = ease(tramo(t, P7 + 0.1, VOLO - 0.45)), pulsa = tramo(t, VOLO - 0.3, VOLO - 0.08) - tramo(t, VOLO + 0.25, VOLO + 0.45), sale = ease(tramo(t, ENTENDER, ENTENDER + 0.9));
  const wx = Math.round(lerp(-10, 22, llega) - sale * 40), wy = Math.round(lerp(196, 150, llega) + pulsa * 5 + sale * 40);
  if (wx > -14 && wy < 200) T.brazo(R, -14, 214, wx, wy, '#e8ecf0', 1, { codo: [Math.round(wx * 0.4) - 10, Math.round((214 + wy) / 2) + 6] });
  T.laboratorioDelante(R, t, o);
};
const año = (t) => (t < P6 ? 1872 : t < P7 ? 1884 : 2026);
const efectos = [[ts(0.7), 'ola'], [FOUND, 'brillo'], [ALONE + 0.1, 'viento'], [NOONE, 'puerta'], [CIERRA, 'puerta'], [OTRA, 'rafaga'], [SUELO, 'toc'], [tc(19.45), 'papel'], [QUE, 'pop'],
  [CAPI, 'toc'], [MIL, 'pop'], [ALC, 'boing'], [FISCAL, 'papel'], [SANGRE, 'golpecito'], [ESCRITOR + 0.1, 'lapiz'], [VOLO - 0.2, 'interruptor'], [VOLO, 'boom'], [VOLO + 1.6, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['mc-hola'] = ('Hola', '''// MC-HOLA (frase 3), hoy (2026), sin cartela. Un plano: la botella de Atom de cerca, en su aparador. En «I'm Atom» el
// guante de Atom sale de su esquina y saluda; en «and I explain» baja, coge la lupa grande y la trae sobre la botella;
// en «wondered» la lente se posa sobre la cubierta del barquito: vacía, ni un muñequito; en «about» sale un «?»; en
// «Let's find out» la lupa recorre la cubierta buscando.''', r'''
const th = (s) => en('hola', (s - 0.5) / 4.115);
const K = hex('#17151d'), BL = hex('#f6f2ea'), AZ = hex('#3a6ac8'), GUANTE = '#5a8ad0', ease = (u) => u * u * (3 - 2 * u);
const SALUDA = th(0.55), BAJA = th(1.44), COGE = th(1.95), POSA = th(2.92), DUDA = th(3.2), BUSCA = th(3.93);
const globo = (x, y, ic, c) => { R.disco(x, y, 8, K); R.disco(x, y, 7, BL); R.pset(x - 4, y + 8, K); R.pset(x - 3, y + 7, BL); R.pset(x - 5, y + 9, K); R.icono(ic, x - 3, y - 5, c, null, 1.4); };
const p1 = (t) => {
  // la lupa: entra entre «and I explain» y «wondered»; en «Let's find out» recorre la cubierta
  const lu = ease(tramo(t, COGE, POSA)) - (t > BUSCA ? 0.06 * (0.5 - 0.5 * Math.cos((t - BUSCA) * 5)) : 0);
  const o = { encuadre: 'estudio', camara: 'botella', vacia: 1, bote: 'barco', lupa: Math.max(0, lu) };
  const g = T.hoy(R, t, o);
  // el guante de Atom: sale de su esquina, saluda, baja por fuera del cuadro y vuelve agarrado al mango de la lupa
  const sal = ease(tramo(t, SALUDA - 0.2, SALUDA + 0.15)), baja = ease(tramo(t, BAJA, COGE));
  if (lu > 0.02 && g.mango) T.mano(R, g.mango[0] - 4, g.mango[1] - 2, -1, GUANTE, { sinManga: true });
  else if (sal > 0) {
    let hx = lerp(292, 268, sal) + (t < BAJA ? Math.round(Math.sin(t * 16) * 3) : 0), hy = lerp(30, 36, sal);
    if (baja > 0) { hx = lerp(268, 330, baja); hy = lerp(36, 200, baja); }
    T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true });
  }
  if (t > DUDA && g.lupa) globo(g.lupa[0] + 22, g.lupa[1] - 30, '?', AZ);
};
const efectos = [[SALUDA, 'pop'], [COGE + 0.2, 'whoosh'], [POSA, 'brillo'], [DUDA, 'pop']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
