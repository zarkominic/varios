E = {}

# ── ayudas comunes de este grupo (se pegan al principio de cada cuerpo) ──
AYUDAS = r'''
const mez = (c1, c2, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c1 >>> s) & 255) * (1 - k) + ((c2 >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const hh = (a, b, c = 0) => { let n = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 1274126177); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const rr = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
const aclara = (x, y, k, col = 0xffffffff) => { const c = R.pget(x, y); if (c) R.pset(x, y, mez(c, col, k)); };
const K0 = hex('#14101c'), ORO = hex('#f0c040'), OROS = hex('#a87a18'), OROL = hex('#fff0a0'), BLANCO = hex('#fffbe8');
R.ICONOS.nota = ['..##', '..#.', '..#.', '..#.', '###.', '###.'];
R.ICONOS.nota2 = ['.####', '.#..#', '.#..#', '.#..#', '##.##', '##.##'];
// halo de luz (aclara lo pintado) que cae hacia fuera
const halo = (xc, yc, r, k = 0.4, col = hex('#fff2b0')) => { for (let y = Math.round(yc - r); y <= Math.round(yc + r); y++) for (let x = Math.round(xc - r); x <= Math.round(xc + r); x++) { const d = Math.hypot(x - xc, y - yc) / r; if (d < 1) aclara(x, y, k * (1 - d) * (1 - d) * 1.6 > k ? k : k * (1 - d) * (1 - d) * 1.6, col); } };
// destello de cuatro rayos que late
const destello = (x, y, n, t, col = OROL) => { x = Math.round(x); y = Math.round(y); const m = Math.max(1, Math.round(n * (0.6 + 0.4 * Math.abs(Math.sin(t * 7))))); R.pset(x, y, BLANCO);
  for (let i = 1; i <= m; i++) { const c = i > m - 1 ? col : BLANCO; R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); }
  if (m > 2) for (const [a, b] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) R.pset(x + a, y + b, col); };
// el broche a escala de personaje (7 px): aro de oro, el pájaro oscuro dentro, un brillo
const miniBroche = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 3, K0); R.disco(x, y, 2, ORO); R.pset(x + 1, y + 1, OROS); R.pset(x + 2, y, OROS);
  R.pset(x, y, K0); R.pset(x - 1, y, K0); R.pset(x + 1, y - 1, K0); R.pset(x - 1, y - 1, K0); R.pset(x - 1, y - 2, OROL); };
// una nota que flota de (x0, y0) a (x1, y1) con u 0–1, ondulando
const notaVuela = (x0, y0, x1, y1, u, col, fase = 0, grande = false, esc = 1) => { if (u <= 0 || u >= 1) return; const x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(u * 9 + fase) * 4 * esc;
  R.icono(grande ? 'nota2' : 'nota', Math.round(x), Math.round(y), col, K0, esc); };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-broche'] = ('El broche', '''// JH-BROCHE (frases 34–35), hoy y Juegos 74, sin cartela. Tres planos:
// 1. el corcho de la fan, de noche: el pan cruza el escritorio, se para bajo el corcho y en «clues» señala la foto del
//    broche, que se enciende (la primera chincheta, con halo y destello); en «plain sight» da saltitos de risa;
// 2. (corte en «The first») el Quemador, el puesto de cerca: la vendedora coge el broche de la bandeja de baratijas y en
//    «mockingjay pin» lo levanta, brillando; Katniss entra por la izquierda y se acerca al mostrador; en «2012» la
//    vendedora se lo ofrece y en «given it» se lo lanza en arco; Katniss lo atrapa y sonríe;
// 3. (corte al final de «market») el libro abierto sobre la mesa, de cerca: una mano pasa la página en «But in the book»;
//    aparece el dibujo del broche (s 3) con su brillo; en «pin» salta un «?» rojo; en «owner» se dibuja en la otra
//    página la silueta de una chica con el broche, y el pan, que se había asomado a mirarlo, da un respingo.''', AYUDAS + r'''
const a = (f) => en('pistas', f), b = (f) => en('broche', f);
// palabras (segundos de la escena): clues 1.90, plain 3.58, The 5.74, mocking 6.41, 2012 8.06, given 10.09, market 10.67, But 11.63, pin 12.80, owner 13.32
const P2 = b(0) - 0.1, P3 = b(0.665);
const CLUES = a(0.17), PLAIN = a(0.73), MOCK = b(0.083), DOCE = b(0.288), GIVEN = b(0.539), PAGINA = b(0.73), PIN = b(0.876), OWNER = b(0.94);
// ── 1 · el corcho
const p1 = (t) => {
  const on = t > CLUES + 0.1;
  T.hoy(R, t, { encuadre: 'cuarto', camara: 'corcho', luz: 'noche', pistas: on ? 1 : 0, hilo: 0 });
  // el halo y el destello de la foto del broche cuando se enciende la pista
  if (on) { const k = tramo(t, CLUES + 0.1, CLUES + 0.6); halo(53, 56, 30, 0.32 * k + 0.08 * Math.sin(t * 5)); destello(40, 36, 4 * k, t); destello(70, 66, 3 * k, t + 1); }
  // el pan cruza el escritorio, se para debajo de la foto, señala y se ríe
  const u = tramo(t, 0.2, CLUES - 0.15), x = Math.round(lerp(236, 112, u));
  const rie = t > PLAIN - 0.1 && t < P2 - 0.4;
  T.pan(R, x, 166, t, { s: 2, dir: -1, anda: u > 0 && u < 1, señala: t > CLUES - 0.2 && !rie ? [60, 70] : null, expresion: rie ? 'risa' : 'normal', saluda: t > P2 - 0.4 });
  if (t > CLUES - 0.1 && t < CLUES + 0.9) R.bocadillo(x - 4, 128, { icono: '!' });
};
// ── 2 · el puesto del Quemador
const QO = { encuadre: 'quemador', camara: 'puesto', luz: 'dia' };
const p2 = (t) => {
  T.distrito(R, t, QO);
  // la vendedora, detrás del mostrador: coge el broche de la bandeja, lo levanta, se gira y lo lanza
  const coge = t > MOCK - 0.5, vuelve = t > DOCE - 0.5, lanza = t > GIVEN - 0.05;
  const objetivo = !coge ? true : !vuelve ? [t < MOCK ? 202 : 196, t < MOCK ? 137 : 124] : lanza ? [170, 122] : [172, 130];
  const v = R.actor(EL.vendedoraHob, 178, 150, t, { dir: vuelve ? -1 : 1, sostiene: coge ? objetivo : undefined, sonrisa: t > MOCK + 0.3, habla: t > DOCE - 0.3 && t < GIVEN - 0.2 && Math.sin(t * 13) > 0 });
  T.distritoDelante(R, t, QO);
  // Katniss entra por la izquierda y se acerca; abre la mano para atraparlo
  const w = tramo(t, P2 + 0.3, DOCE - 0.2), kx = Math.round(lerp(-18, 96, w)), recibe = t > GIVEN - 0.3;
  const k = R.actor(EL.katniss, kx, 170, t, { dir: 1, anda: w > 0 && w < 1, sostiene: recibe ? [kx + 26, 146] : undefined, sorpresa: t > GIVEN + 0.05 && t < GIVEN + 0.45, sonrisa: t > GIVEN + 0.45, pal: { O: '#7a4a2a' } });
  // el broche: en la bandeja, en la mano de la vendedora, en el aire y en la mano de Katniss
  const vuela = tramo(t, GIVEN, GIVEN + 0.5);
  let bx, by;
  if (!coge || (t < MOCK - 0.3)) { bx = 204; by = 136; }
  else if (vuela <= 0) { [bx, by] = v.mano; by -= 2; }
  else if (vuela < 1) { const [x0, y0] = [170, 120], [x1, y1] = [k.mano[0], k.mano[1] - 2]; bx = lerp(x0, x1, vuela); by = lerp(y0, y1, vuela) - Math.sin(vuela * Math.PI) * 22;
    for (let i = 1; i <= 4; i++) { const uu = vuela - i * 0.06; if (uu > 0) R.pset(Math.round(lerp(x0, x1, uu)), Math.round(lerp(y0, y1, uu) - Math.sin(uu * Math.PI) * 22), i % 2 ? OROL : ORO); } }
  else { bx = k.mano[0]; by = k.mano[1] - 2; }
  const brilla = t > MOCK - 0.1;
  if (brilla) halo(bx, by, 11, 0.35 + 0.1 * Math.sin(t * 6));
  miniBroche(bx, by);
  if (brilla && (t < MOCK + 1.2 || (vuela >= 1 && t < GIVEN + 1.3))) destello(bx + 4, by - 4, 3, t);
  else if (Math.sin(t * 3) > 0.8) R.pset(Math.round(bx) - 1, Math.round(by) - 2, BLANCO);
  // la lupa: el broche de cerca (s 3) en un círculo dorado, unido a la mano, mientras se habla de él
  const lr = 27 * tramo(t, MOCK - 0.15, MOCK + 0.15) * (1 - tramo(t, GIVEN - 0.5, GIVEN - 0.2));
  if (lr > 2) { const cx = 146, cy = 82;
    R.linea(Math.round(bx) - 3, Math.round(by) - 3, cx + Math.round(lr * 0.7), cy + Math.round(lr * 0.7), K0); R.linea(Math.round(bx) - 3, Math.round(by) - 4, cx + Math.round(lr * 0.7), cy + Math.round(lr * 0.7) - 1, OROL);
    R.disco(cx, cy, lr + 3, K0); R.disco(cx, cy, lr + 2, ORO); R.disco(cx, cy, lr + 1, OROS); R.disco(cx, cy, lr, hex('#2a1e2e'));
    for (let y = cy - lr; y <= cy + lr; y++) for (let x = cx - lr; x <= cx + lr; x++) if ((x + y) % 4 === 0 && Math.hypot(x - cx, y - cy) < lr - 1) R.pset(x, y, hex('#3a2a3e'));
    if (lr > 26) { halo(cx, cy, 24, 0.3 + 0.08 * Math.sin(t * 5)); T.PIEZAS_JH.broche(R, cx, cy + 22, { s: 3, brillo: true }); destello(cx - 12, cy - 14, 4, t); destello(cx + 14, cy + 10, 2, t + 2); }
    for (let i = 0; i < 6; i++) { const an = -2.4 + i * 0.12; R.pset(Math.round(cx + Math.cos(an) * (lr - 3)), Math.round(cy + Math.sin(an) * (lr - 3)), hex('#8a7a9a')); } }
};
// ── 3 · el libro abierto (fondo local)
let fondo3 = null;
const libroFondo = () => {
  const b = R.nuevo(), prev = R.usar(b);
  // la pared de noche: papel pintado ciruela con rayas y un motivo de puntos; un estante con libros; un cuadrito
  for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const raya = x % 12 < 2, mot = (x % 12 === 6 && y % 8 === 3) || (x % 12 === 5 && y % 8 === 4) || (x % 12 === 7 && y % 8 === 4);
    R.pset(x, y, mez(raya ? hex('#3a2c46') : mot ? hex('#463454') : hex('#2e2238'), K0, y < 10 ? 0.2 : 0)); }
  rr(8, 44, 132, 47, hex('#5a3a24')); rr(8, 48, 132, 49, hex('#3a2416'));
  const lomos = ['#8a3a3a', '#3a5a8a', '#c8a050', '#4a7a4a', '#7a4a8a', '#c86a3a', '#2a4a6a', '#a8a8a0', '#6a2a2a', '#3a6a6a', '#b8883a', '#5a5a8a'];
  let lx = 12; for (let i = 0; lx < 124; i++) { const w = 5 + Math.floor(hh(i, 3) * 4), hgt = 14 + Math.floor(hh(i, 4) * 8), c = hex(lomos[i % lomos.length]);
    rr(lx, 44 - hgt, lx + w - 1, 43, K0); rr(lx + 1, 45 - hgt, lx + w - 2, 43, c); R.linea(lx + 1, 45 - hgt, lx + 1, 43, mez(c, BLANCO, 0.25)); R.linea(lx + 1, 48 - hgt, lx + w - 2, 48 - hgt, mez(c, OROL, 0.5)); R.linea(lx + 1, 40, lx + w - 2, 40, mez(c, K0, 0.4)); lx += w; }
  // un cuadrito con montes (sin letras)
  rr(196, 18, 238, 50, hex('#6a4a2a')); rr(198, 20, 236, 48, hex('#2a3a5a')); R.poligono([[198, 48], [210, 30], [222, 44], [228, 36], [236, 48]], hex('#4a5a6a')); R.poligono([[208, 33], [210, 30], [212, 33]], BLANCO); R.disco(228, 26, 3, hex('#f0e8c0'));
  // la mesa de madera: tablones con vetas, nudos y el canto de delante iluminado
  for (let y = 58; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 58) / 24), off = tabla * 37, junta = (y - 58) % 24 === 23 || (x + off) % 140 === 0;
    const veta = Math.sin((x + off) * 0.06 + Math.sin(y * 0.4 + tabla) * 1.6 + tabla) > 0.82, n = hh(x >> 1, y, 7);
    let c = hex(['#6e4428', '#74482a', '#684026'][tabla % 3]); if (veta) c = mez(c, hex('#4a2a16'), 0.55); else if (n > 0.86) c = mez(c, hex('#8a5a34'), 0.5); if (junta) c = hex('#3a2212');
    const d = Math.hypot((x - 120) / 1.6, y - 110) / 160; c = mez(c, K0, Math.min(0.55, Math.max(0, d - 0.25))); R.pset(x, y, c); }
  rr(0, 58, 319, 59, hex('#9a6a40')); rr(0, 60, 319, 60, hex('#3a2212'));
  for (const [nx, ny] of [[52, 96], [276, 148], [244, 74]]) { R.disco(nx, ny, 3, hex('#4a2a16')); R.disco(nx, ny, 1, hex('#2a160a')); }
  // la lámpara de mesa a la izquierda (base, brazo, pantalla) y su charco de luz
  rr(18, 146, 44, 152, K0); rr(19, 147, 43, 151, hex('#2a4a3a')); R.linea(20, 147, 42, 147, hex('#4a7a5a')); R.linea(31, 146, 36, 96, K0); R.linea(32, 146, 37, 96, hex('#3a5a4a'));
  R.poligono([[22, 96], [52, 96], [46, 74], [28, 74]], K0); R.poligono([[24, 95], [50, 95], [45, 75], [29, 75]], hex('#2a6a4a')); R.linea(29, 76, 25, 94, hex('#4a9a6a'));
  for (let y = 96; y < 180; y++) for (let x = 0; x < 300; x++) { const d = Math.hypot((x - 120) / 1.9, (y - 120) / 0.9) / 90; if (d < 1) aclara(x, y, 0.22 * (1 - d), hex('#ffe0a0')); }
  // el libro abierto: tapas, el canto de las hojas y las dos páginas curvadas hacia el lomo
  R.poligono([[56, 70], [264, 70], [270, 166], [50, 166]], K0); R.poligono([[57, 72], [263, 72], [268, 164], [52, 164]], hex('#6a2a2a'));
  for (let i = 0; i < 4; i++) { R.linea(60, 160 - i * 2, 158, 162 - i * 2, mez(hex('#e8dcc0'), K0, i * 0.08)); R.linea(162, 162 - i * 2, 260, 160 - i * 2, mez(hex('#e8dcc0'), K0, i * 0.08)); }
  for (let x = 62; x <= 258; x++) { const top = 74 + Math.round(Math.pow(1 - Math.abs(x - 160) / 98, 3) * 4), bot = 154 + Math.round(Math.pow(1 - Math.abs(x - 160) / 98, 3) * 2);
    R.linea(x, top - 1, x, top - 1, K0); for (let y = top; y <= bot; y++) { const s = Math.abs(x - 160); R.pset(x, y, s < 6 ? mez(hex('#f2e6c8'), hex('#8a7a5a'), (6 - s) / 7) : s > 94 ? hex('#e0d2b0') : hex('#f2e6c8')); } }
  R.linea(160, 76, 160, 156, hex('#8a7a5a'));
  // las líneas de texto (barras grises, sin letras) de la página izquierda y de la parte alta y baja de la derecha
  for (let y = 84, j = 0; y < 150; y += 6, j++) { const l = 70 + Math.round(hh(j, 1) * 14); R.linea(70, y, 70 + l, y, hex('#9a8a72')); if (hh(j, 2) > 0.6) R.linea(70 + l + 4, y, 150, y, hex('#9a8a72')); }
  for (const y of [84, 90, 140, 146]) { const l = 60 + Math.round(hh(y, 5) * 22); R.linea(170, y, 170 + l, y, hex('#9a8a72')); }
  // la cinta roja del marcapáginas que cuelga, la taza que humea (se pinta viva) y los lápices
  R.poligono([[158, 156], [162, 156], [163, 176], [160, 172], [157, 176]], hex('#c8303a')); R.linea(158, 156, 158, 175, hex('#8a1a22'));
  rr(270, 120, 292, 146, K0); rr(271, 121, 291, 145, hex('#e8e0d0')); rr(271, 121, 291, 124, hex('#5a3a24')); R.linea(272, 125, 272, 144, BLANCO); rr(292, 126, 298, 138, K0); rr(293, 128, 296, 136, hex('#e8e0d0')); rr(294, 129, 295, 135, K0);
  for (let i = 0; i < 3; i++) { const y = 168 + i * 3; R.linea(196 + i * 6, y, 246 + i * 6, y - 4, K0); R.linea(196 + i * 6, y - 1, 244 + i * 6, y - 5, hex(['#f0c040', '#3a8ae8', '#e84a3a'][i])); R.pset(246 + i * 6, y - 5, hex('#f4cc80')); }
  rr(70, 166, 120, 174, K0); rr(71, 167, 119, 173, hex('#e8dcc0')); R.linea(74, 170, 112, 170, hex('#9a8a72'));
  R.usar(prev); return b;
};
const p3 = (t) => {
  if (!fondo3) fondo3 = libroFondo();
  R.copiar(fondo3);
  // vapor de la taza
  for (let i = 0; i < 6; i++) { const f = ((t * 0.5 + i / 6) % 1); R.pset(Math.round(281 + Math.sin(f * 8 + i) * 3), Math.round(116 - f * 26), mez(hex('#e8e0d0'), hex('#3a2c46'), f)); }
  // la luz de la lámpara que titila un poco
  if (Math.sin(t * 23) > 0.92) halo(37, 92, 14, 0.15, hex('#ffe0a0'));
  // la página que se pasa (de derecha a izquierda), con la mano que la levanta
  const pg = tramo(t, PAGINA - 0.05, PAGINA + 0.6), nueva = pg >= 0.5;
  if (nueva) {
    const k = tramo(t, PAGINA + 0.3, PAGINA + 0.9);
    halo(208, 118, 34, 0.3 * k + 0.06 * Math.sin(t * 4), hex('#fff0b0'));
    if (k > 0) { R.recorte([176, 94, 240, 144]); for (let y = 96; y < 144; y++) for (let x = 178; x < 240; x++) if (hh(x, y, 9) > 0.92) aclara(x, y, 0.08, hex('#8a7a5a')); R.recorte(null);
      T.PIEZAS_JH.broche(R, 208, 142, { s: 3, brillo: true }); if (k < 1) for (let y = 96; y < 144; y++) for (let x = 184; x < 233; x++) if (hh(x, y, 3) > k) R.pset(x, y, hex('#f2e6c8')); }
    if (t > PIN) { const e = tramo(t, PIN, PIN + 0.25); R.icono('?', 236, Math.round(lerp(96, 86, e)), hex('#d83a3a'), K0, 2); }
    if (t > PIN + 0.2) destello(186, 102, 4, t);
  } else { for (const y of [100, 106, 112, 118, 124, 130]) R.linea(170, y, 170 + 50 + Math.round(hh(y, 8) * 30), y, hex('#9a8a72')); }
  if (pg > 0 && pg < 1) {
    const ex = 160 + Math.cos(pg * Math.PI) * 98, lev = Math.sin(pg * Math.PI) * 10;
    R.poligono([[160, 76], [ex, 74 - lev], [ex, 154 - lev * 0.6], [160, 156]], K0);
    R.poligono([[161, 77], [ex + (ex > 160 ? -1 : 1), 75 - lev], [ex + (ex > 160 ? -1 : 1), 153 - lev * 0.6], [161, 155]], pg < 0.5 ? hex('#e8dcc0') : hex('#f6ecd2'));
  }
  if (t < PAGINA + 0.45) { const u = tramo(t, PAGINA - 0.5, PAGINA), lv = tramo(t, PAGINA, PAGINA + 0.15), sal = tramo(t, PAGINA + 0.15, PAGINA + 0.45);
    const hx = lerp(300, 272, u) - lv * 10 + sal * 46, hy = lerp(178, 152, u) - lv * 12 + sal * 46;
    T.brazo(R, 320, 202, hx, hy, '#5a7ab8', -1); }
  // la silueta de la dueña, en sepia, que se dibuja en la página izquierda en «owner»
  const s = tramo(t, OWNER - 0.1, OWNER + 0.5);
  if (s > 0) { const cx = 112, SEP = hex('#8a6a4a');
    R.recorte([82, 92, 144, 152]);
    for (let y = 94; y <= 150; y++) for (let x = 84; x <= 140; x++) if (hh(x, y, 5) < s) R.pset(x, y, x === 84 || x === 140 || y === 94 || y === 150 ? SEP : hex('#f6ecd4'));
    for (let y = 96; y < 150; y++) for (let x = 86; x < 139; x++) { const w = y < 117 ? 0 : y < 121 ? 2 : y < 124 ? 9 - (y - 121) : y < 132 ? 6 : 6 + (y - 132) * 0.7;
      const cab = Math.hypot((x - cx) / 0.9, y - 108) < 8, cuello = y >= 116 && y < 121 && Math.abs(x - cx) < 2, cuerpo = y >= 121 && Math.abs(x - cx) < w, trenza = y > 106 && y < 132 && Math.abs(x - cx - 8 - Math.sin(y * 0.5)) < 1.5, pelo = cab && y < 104;
      if ((cab || cuello || cuerpo || trenza) && hh(x, y, 4) < s) R.pset(x, y, pelo || trenza ? hex('#5a3a22') : ((x + y) % 2 && cuerpo) ? mez(SEP, hex('#f2e6c8'), 0.45) : SEP); }
    R.recorte(null);
    if (s > 0.6) { miniBroche(cx + 4, 126); halo(cx + 4, 126, 9, 0.35); destello(cx + 9, 121, 3, t); }
  }
  // el pan se asoma por la derecha, mira el dibujo, lo señala y da un respingo con la silueta
  const u = tramo(t, PAGINA + 0.4, PIN - 0.3), px = Math.round(lerp(330, 252, u));
  T.pan(R, px, 176, t, { s: 2, dir: -1, anda: u > 0 && u < 1, señala: t > PIN - 0.2 && t < OWNER ? [214, 120] : null, expresion: t > OWNER + 0.2 ? 'susto' : 'normal' });
};
const efectos = [[CLUES + 0.1, 'brillo'], [PLAIN, 'boing'], [MOCK, 'brillo'], [GIVEN, 'whoosh'], [GIVEN + 0.5, 'golpecito'], [PAGINA, 'papel'], [PIN, 'pop'], [OWNER, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t >= P2 && t < P3 ? 74 : null) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-madge'] = ('Madge', '''// JH-MADGE (frases 36–37), Juegos 74 y la cadena 50→74, sin cartela. Tres planos:
// 1. el salón del alcalde: Madge, de blanco, sostiene el broche y en «gives it to her» se lo prende a Katniss en el pecho
//    (destello); Katniss sonríe; en «before that» Madge señala la foto ovalada de la pared y Katniss se gira a mirarla; en
//    «aunt» el cristal de la foto destella;
// 2. (corte en «aunt») la pared de las fotos de cerca: la chica rubia del óvalo con el mismo broche; en «Maysilee Donner» se
//    enciende; en «partner» una chispa baja de su broche al de Katniss, que se sorprende; en «Games» aparece en el aparador
//    una tarjetita sepia con «50»;
// 3. (corte en «In other words») fondo local: la pared de ladrillo de un almacén del 12 con una cuerda de la línea de tiempo
//    (50 a la izquierda, 74 a la derecha); cuatro personas de espaldas (Maysilee, Haymitch, Madge, Katniss) se pasan el
//    broche de mano en mano y la barra del año sube de 50 a 74; en «rebellion» se desenrolla una pancarta roja con el
//    sinsajo dorado; el pan salta a coger el broche y un charlajo se lo quita (gag 5) y lo lleva de vuelta al «50» en
//    «Haymitch's Games»: la barra vuelve a 50.''', AYUDAS + r'''
const a = (f) => en('madge', f), b = (f) => en('simbolo', f);
// palabras: gives 1.20, her 1.68, before 2.47, aunt 4.11, May 4.97, Donner 5.45, partner 6.90, games 7.52, In 8.94, Katniss's 10.79, rebellion 11.45, comes 11.97, Hamich's 12.61, games 13.17
const P2 = a(0.47), P3 = b(0) - 0.08;
const GIVES = a(0.091), PRENDE = a(0.155), BEFORE = a(0.258), AUNT = a(0.472), MAY = a(0.585), PARTNER = a(0.837), GAMES = a(0.919);
const KAT = b(0.385), REBEL = b(0.522), COMES = b(0.630), HAYG = b(0.713), GAMES2 = b(0.83);
const KAT_SIN = { O: '#7a4a2a' }, MADGE_SIN = { O: '#f8f6f0' };
// ── 1 · el salón del alcalde
const p1 = (t) => {
  const r = T.interior(R, t, { encuadre: 'alcalde', brillo: tramo(t, AUNT - 0.9, AUNT - 0.1) * (1 - tramo(t, AUNT, P2)) });
  const prendido = t > PRENDE, mira = t > BEFORE + 0.35;
  // Katniss, mirando a Madge; luego se gira hacia la foto
  const kx = 196, kdir = mira ? 1 : -1;
  R.actor(EL.katniss, kx, 160, t, { dir: kdir, pal: prendido ? {} : KAT_SIN, sonrisa: prendido && !mira, sorpresa: t > AUNT - 0.6 && t < AUNT + 0.3 });
  const pecho = [kdir > 0 ? kx + 9 : kx + 5, 149];
  // Madge: sostiene el broche, alarga la mano al pecho de Katniss y luego señala la foto
  const alarga = t > GIVES - 0.25 && t < PRENDE + 0.15;
  const m = R.actor(EL.madge, 172, 160, t, { dir: 1, pal: MADGE_SIN, sostiene: !prendido || alarga ? (alarga ? pecho : true) : undefined, dedo: t > BEFORE && t < AUNT + 0.2, habla: t < GIVES || (t > BEFORE && t < AUNT) ? Math.sin(t * 12) > 0 : false, sonrisa: t > PRENDE && t < BEFORE });
  if (!prendido) miniBroche(m.mano[0], m.mano[1] - 1);
  else { if (t < PRENDE + 1.2) { halo(pecho[0], pecho[1], 9, 0.4 * (1 - tramo(t, PRENDE + 0.4, PRENDE + 1.2))); destello(pecho[0] + 3, pecho[1] - 3, 3, t); } }
  if (t > BEFORE + 0.3 && t < AUNT - 0.3) for (let i = 0; i < 4; i++) R.pset(m.cabeza[0] + 12 + i * 3, m.cabeza[1] - 6 - i * 4, Math.floor(t * 6 + i) % 2 ? OROL : BLANCO);   // la línea de puntos hacia la foto
};
// ── 2 · la pared de las fotos
const p2 = (t) => {
  const br = tramo(t, MAY - 0.05, MAY + 0.5);
  const r = T.interior(R, t, { encuadre: 'alcalde', camara: 'fotos', brillo: br });
  const [fx, fy] = r.broche ?? [150, 76];
  if (br > 0) { halo(fx, fy, 14, 0.3 * br + 0.08 * Math.sin(t * 5)); if (t < MAY + 1.6) destello(fx + 5, fy - 5, 3, t); }
  // Katniss mira la foto desde la izquierda; Madge, a la derecha, la señala
  const kx = 112, sorpresa = t > PARTNER - 0.1 && t < PARTNER + 0.8;
  const k = R.actor(EL.katniss, kx, 166, t, { dir: 1, sorpresa, sonrisa: t > GAMES, sostiene: t > PARTNER + 0.2 && t < GAMES + 0.4 ? [kx + 10, 156] : undefined });
  R.actor(EL.madge, 196, 166, t, { dir: -1, pal: MADGE_SIN, dedo: t > MAY - 0.2 && t < PARTNER - 0.3, habla: t > P2 + 0.2 && t < MAY + 0.3 && Math.sin(t * 12) > 0, sonrisa: t > PARTNER });
  // el broche de Katniss y la chispa que baja del broche de la foto al suyo
  const kb = [kx + 9, 155];
  const ch = tramo(t, PARTNER - 0.5, PARTNER);
  if (ch > 0 && ch < 1) { for (let i = 0; i < 6; i++) { const uu = ch - i * 0.04; if (uu > 0) R.pset(Math.round(lerp(fx, kb[0], uu)), Math.round(lerp(fy, kb[1], uu) - Math.sin(uu * Math.PI) * 10), i ? ORO : BLANCO); } destello(lerp(fx, kb[0], ch), lerp(fy, kb[1], ch) - Math.sin(ch * Math.PI) * 10, 2, t); }
  if (t > PARTNER - 0.05) { halo(kb[0], kb[1], 9, 0.4 * (1 - tramo(t, PARTNER + 0.6, PARTNER + 1.6)) + 0.1); if (t < PARTNER + 0.8) destello(kb[0] + 3, kb[1] - 3, 3, t); }
  // la tarjetita sepia con el «50», apoyada en el aparador
  const e = tramo(t, GAMES - 0.1, GAMES + 0.2);
  if (e > 0) { const y = Math.round(lerp(100, 94, e)); rr(205, y, 227, y + 15, K0); rr(206, y + 1, 226, y + 14, hex('#e8d4a8')); R.linea(206, y + 14, 226, y + 14, hex('#b89a6a'));
    R.numero('50', 216, y + 11, { centro: true, color: hex('#6a3a1a'), sombra: false }); if (t < GAMES + 0.8) destello(228, y, 2, t); }
};
// ── 3 · la cadena de manos (fondo local)
let fondo3 = null;
const PERS = [ // x de la cabeza, color de manga, pelo, piel del cuello
  [50, '#e8709a', '#f0d070'], [118, '#6a5a4a', '#3a2a22'], [186, '#f2f0ea', '#f0d070'], [256, '#6a4a2a', '#2a2028'] ];
const muroFondo = () => {
  const b = R.nuevo(), prev = R.usar(b);
  const L = ['#6a3a2e', '#7a4434', '#5a3028', '#82503c', '#6e3e30'].map(hex), JUNTA = hex('#2e2220');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 6), off = fila % 2 ? 7 : 0, col = Math.floor((x + off) / 14);
    const junta = y % 6 === 5 || (x + off) % 14 === 13; let c = junta ? JUNTA : L[Math.floor(hh(col, fila) * 5)];
    if (!junta && hh(x, y, 2) > 0.9) c = mez(c, K0, 0.25); if (!junta && y % 6 === 0) c = mez(c, hex('#a86a50'), 0.25);
    const hollin = Math.max(0, 1 - y / 70) * 0.5 + (hh(x >> 3, y >> 3, 5) > 0.8 ? 0.12 : 0); c = mez(c, K0, hollin);
    // la zona de Atom y la barra del año, más oscuras y tranquilas
    if ((x > 272 && y < 50) || (y < 16 && x < 176)) c = mez(c, hex('#20161a'), 0.55);
    R.pset(x, y, c); }
  // manchas de humedad y un cartel viejo arrancado (sello sin letras)
  for (let y = 60; y < 120; y++) for (let x = 100; x < 140; x++) if (Math.hypot((x - 120) / 1.3, y - 84) < 22 + Math.sin(x * 0.5) * 3) aclara(x, y, 0.08, hex('#8a9a8a'));
  R.poligono([[12, 34], [44, 30], [46, 60], [30, 64], [14, 58]], hex('#c8b890')); R.poligono([[30, 64], [46, 60], [40, 70]], hex('#a89870'));
  R.disco(29, 46, 9, hex('#8a2a2a')); R.disco(29, 46, 6, hex('#c8b890')); R.disco(29, 46, 3, hex('#8a2a2a')); R.linea(12, 34, 44, 30, K0); R.linea(14, 58, 12, 34, K0);
  // un ventanuco con barrotes y la noche azul, y rayas de tiza que cuentan (símbolos, sin letras)
  rr(76, 28, 124, 66, K0); rr(78, 30, 122, 64, hex('#1a2440')); for (let i = 0; i < 12; i++) R.pset(80 + Math.floor(hh(i, 1) * 40), 32 + Math.floor(hh(i, 2) * 30), hex('#c8d0e8'));
  R.disco(110, 40, 4, hex('#e8e8d0')); R.disco(108, 39, 3, hex('#1a2440')); for (const x of [88, 100, 112]) { R.linea(x, 30, x, 64, K0); R.linea(x + 1, 30, x + 1, 64, hex('#5a5a62')); }
  rr(74, 66, 126, 69, hex('#5a4a40')); R.linea(74, 66, 126, 66, hex('#8a7a6a'));
  for (let g = 0; g < 3; g++) { const x0 = 136 + g * 14; for (let k = 0; k < 4; k++) R.linea(x0 + k * 2, 70, x0 + k * 2, 80, hex('#d8d0c0')); R.linea(x0 - 1, 78, x0 + 8, 71, hex('#d8d0c0')); }
  // la tubería de la izquierda con sus abrazaderas
  rr(2, 0, 7, 179, K0); rr(3, 0, 6, 179, hex('#5a5a62')); R.linea(4, 0, 4, 179, hex('#8a8a92')); for (const y of [40, 100, 160]) { rr(1, y, 8, y + 3, K0); rr(2, y + 1, 7, y + 2, hex('#7a7a82')); }
  // la cuerda de la línea de tiempo, con su comba, y los clavos
  for (let x = 14; x <= 306; x++) { const y = Math.round(92 + Math.sin((x - 14) / 292 * Math.PI) * 6); R.pset(x, y, hex('#c8b080')); R.pset(x, y + 1, hex('#6a5a3a')); }
  for (const x of [14, 306]) { R.disco(x, 92, 2, K0); R.pset(x - 1, 91, hex('#aaaaaa')); }
  // las etiquetas 50 y 74 y dos marcas en medio
  for (const [x, txt] of [[50, '50'], [256, '74']]) { const y = Math.round(92 + Math.sin((x - 14) / 292 * Math.PI) * 6); R.linea(x, y, x, y + 4, hex('#6a5a3a')); rr(x - 12, y + 4, x + 12, y + 18, K0); rr(x - 11, y + 5, x + 11, y + 17, hex('#e8dcc0')); R.linea(x - 11, y + 17, x + 11, y + 17, hex('#b8a888'));
    R.numero(txt, x, y + 15, { centro: true, color: hex('#3a2a1a'), sombra: false }); }
  for (const x of [118, 186]) { const y = Math.round(92 + Math.sin((x - 14) / 292 * Math.PI) * 6); R.linea(x, y, x, y + 3, hex('#6a5a3a')); rr(x - 4, y + 3, x + 4, y + 9, K0); rr(x - 3, y + 4, x + 3, y + 8, hex('#d8ccb0')); }
  // la bombilla colgada (el cable sale de fuera de la barra del año) y su luz en la pared
  R.linea(180, 0, 180, 24, K0);
  for (let y = 20; y < 180; y++) for (let x = 60; x < 300; x++) { const d = Math.hypot((x - 180) / 1.7, y - 30) / 120; if (d < 1) aclara(x, y, 0.2 * (1 - d), hex('#ffd890')); }
  R.usar(prev); return b;
};
const p3 = (t) => {
  if (!fondo3) fondo3 = muroFondo();
  R.copiar(fondo3);
  // la bombilla que se mece un poco y parpadea
  const lbx = 180 + Math.round(Math.sin(t * 1.3) * 1.5); R.disco(lbx, 28, 4, K0); R.disco(lbx, 28, 3, Math.sin(t * 17) > 0.9 ? hex('#f8e0a0') : hex('#fff4c8')); rr(lbx - 2, 22, lbx + 2, 24, hex('#5a5a62'));
  // la pancarta roja que se desenrolla en «rebellion», con el sinsajo dorado
  const ban = tramo(t, REBEL - 0.25, REBEL + 0.45);
  for (const x of [198, 262]) { R.disco(x, 20, 1, hex('#aaaaaa')); }
  { const y1 = Math.round(lerp(26, 86, ban)), ond = (y) => Math.round(Math.sin(t * 2.2 + y * 0.12) * 1.2 * ban);
    for (let y = 22; y <= y1; y++) { const d = ond(y); R.pset(196 + d, y, K0); R.pset(264 + d, y, K0); for (let x = 197; x <= 263; x++) { const pl = (x - 197) % 16; R.pset(x + d, y, pl < 3 ? hex('#8a1a22') : pl > 12 ? hex('#a8242c') : hex('#c8303a')); } }
    for (let x = 196; x <= 264; x++) R.pset(x + ond(y1), y1 + 1, K0);
    if (ban > 0.15) for (let x = 198; x <= 262; x += 3) R.linea(x + ond(y1), y1 + 1, x + ond(y1), y1 + 4, ORO);
    rr(194, 19, 266, 23, K0); rr(195, 20, 265, 22, hex('#6a4a2a'));   // el palo de arriba
    if (ban > 0.75) { const k = tramo(t, REBEL + 0.3, REBEL + 0.6); R.disco(230, 56, 21, K0); R.disco(230, 56, 20, ORO); R.disco(230, 56, 17, hex('#c8303a'));
      T.PIEZAS_JH.sinsajo(R, 230, 68, { s: 2, t }); if (k < 1) for (let y = 36; y < 78; y++) for (let x = 210; x < 251; x++) if (hh(x, y, 6) > k && Math.hypot(x - 230, y - 56) < 20) R.pset(x, y, hex('#c8303a'));
      if (t < REBEL + 1.4) destello(250, 38, 4, t); } }
  // las cuatro personas de espaldas abajo, con el brazo levantado; el broche salta de mano en mano
  const SALTOS = [[P3 + 0.15, P3 + 0.65], [P3 + 0.75, P3 + 1.25], [P3 + 1.35, KAT - 0.05]];
  let quien = 0; for (const [s0] of SALTOS) if (t >= s0) quien++;
  const robado = t > COMES + 0.15;
  const palma = [];
  PERS.forEach(([x, manga, pelo], i) => {
    const tiene = (quien === i && !SALTOS.some(([s0, s1]) => t > s0 && t < s1)) && !(i === 3 && robado);
    const sube = (tiene ? -5 : 0) + Math.round(Math.sin(t * 2 + i) * 1.5), dir = i % 2 ? -1 : 1;
    const hx = x + dir * 12, hy = 126 + sube;
    // hombros y cabeza de espaldas (el brazo sale del hombro, por delante)
    R.disco(x, 182, 18, K0); R.disco(x, 182, 17, hex(manga)); R.disco(x - 6 * dir, 178, 8, mez(hex(manga), K0, 0.18)); for (let k = 0; k < 3; k++) R.linea(x - 10 + k * 8, 168, x - 12 + k * 8, 179, mez(hex(manga), K0, 0.3));
    R.disco(x, 156, 11, K0); R.disco(x, 156, 10, hex(pelo)); R.linea(x - 6, 150, x - 2, 147, mez(hex(pelo), BLANCO, 0.35)); R.linea(x - 7, 154, x - 4, 150, mez(hex(pelo), BLANCO, 0.2)); R.disco(x + 4, 160, 4, mez(hex(pelo), K0, 0.25));
    if (i === 3) for (let yy = 164; yy < 180; yy += 3) { R.disco(x + 1, yy, 2, K0); R.disco(x + 1, yy, 1, hex('#4a3e4c')); }   // la trenza de Katniss
    if (i === 0) { R.disco(x - 10, 162, 4, K0); R.disco(x + 10, 162, 4, K0); R.disco(x - 10, 162, 3, hex(pelo)); R.disco(x + 10, 162, 3, hex(pelo)); }   // las coletas de Maysilee
    if (i === 2) rr(x - 10, 158, x + 10, 168, hex(pelo));   // la melena de Madge
    if (i === 1) for (let k = -8; k <= 8; k += 4) R.disco(x + k, 147, 2, hex('#2a1c16'));   // los rizos de Haymitch
    T.brazo(R, x + dir * 8, 170, hx, hy, manga, dir, { sombra: false, codo: [x + dir * 20, 152 + Math.round(sube / 2)] });
    palma.push([hx + dir * 7, hy - 3]);
  });
  // el pan (gag 5): se asoma entre Madge y Katniss, salta a por el broche y se queda sin él
  const sp = tramo(t, KAT, COMES - 0.1), salto = Math.sin(tramo(t, COMES - 0.3, COMES + 0.35) * Math.PI);
  if (sp > 0) T.pan(R, 222, Math.round(lerp(196, 178, sp) - salto * 22), t, { s: 2, dir: 1, señala: t > COMES - 0.4 && t < COMES + 0.3 ? palma[3] : null, expresion: t > COMES + 0.4 ? 'llora' : 'normal' });
  // el charlajo: baja, se lo quita a Katniss y lo lleva volando al «50»
  const ida = tramo(t, COMES - 0.25, COMES + 0.15), vuelta = tramo(t, COMES + 0.15, GAMES2 - 0.1), fuera = tramo(t, GAMES2 + 0.1, GAMES2 + 1.0);
  let cx = null, cy = null, dirC = -1;
  if (ida > 0 && ida < 1) { cx = lerp(330, palma[3][0] + 6, ida); cy = lerp(60, palma[3][1] + 2, ida); }
  else if (vuelta > 0 && vuelta < 1) { cx = lerp(palma[3][0] + 6, 52, vuelta); cy = lerp(palma[3][1] + 2, 108, vuelta) - Math.sin(vuelta * Math.PI) * 50; }
  else if (fuera > 0 && fuera < 1) { cx = lerp(52, -20, fuera); cy = lerp(104, 40, fuera); }
  // el broche
  let bx, by;
  const enSalto = SALTOS.findIndex(([s0, s1]) => t > s0 && t < s1);
  if (enSalto >= 0) { const [s0, s1] = SALTOS[enSalto], u = (t - s0) / (s1 - s0), [x0, y0] = palma[enSalto], [x1, y1] = palma[enSalto + 1]; bx = lerp(x0, x1, u); by = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 26; }
  else if (!robado) { [bx, by] = palma[Math.min(quien, 3)]; }
  else if (vuelta < 1) { bx = cx - 4; by = cy + 6; }
  else { bx = 50; by = 122; }
  halo(bx, by - 6, 14, 0.35 + 0.1 * Math.sin(t * 6)); T.PIEZAS_JH.broche(R, bx, by + 2, { brillo: true });
  if (enSalto >= 0 || (quien === 3 && t < KAT + 0.6)) destello(bx + 8, by - 12, 3, t);
  if (vuelta >= 1) { halo(50, 106, 18, 0.3 * (1 - tramo(t, GAMES2 + 0.6, GAMES2 + 1.4)) + 0.1); if (t < GAMES2 + 0.9) destello(64, 100, 4, t); }
  if (cx != null) T.PIEZAS_JH.charlajo(R, Math.round(cx), Math.round(cy), { s: 2, dir: dirC, t });
};
const efectos = [[GIVES, 'brillo'], [BEFORE + 0.2, 'pop'], [MAY, 'brillo'], [PARTNER - 0.1, 'whoosh'], [GAMES, 'pop'], [P3 + 0.2, 'whoosh'], [REBEL - 0.2, 'papel'], [COMES - 0.3, 'boing'], [COMES, 'silbato'], [GAMES2, 'brillo']];
const año = (t) => {
  if (t < P3) return 74;
  if (t < COMES + 0.15) return Math.round(lerp(50, 74, tramo(t, P3 + 0.15, KAT - 0.05)));
  return Math.round(lerp(74, 50, tramo(t, COMES + 0.15, GAMES2 - 0.1)));
};
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-cancion'] = ('La canción', '''// JH-CANCION (frases 38–39), hoy, Juegos 10 y Juegos 75, sin cartela. Tres planos:
// 1. fondo local, el corcho de cerca de noche: una mano clava el carné de Lenore Dove (pelo oscuro con plumas, una
//    paloma); en «Baird» un rotulador amarillo subraya su apellido (un dibujo de bloques, sin letras); en «Lucy Gray» la
//    mano trae el segundo carné (pelo castaño, volantes de colores, una guitarra) con el mismo apellido, que se subraya;
//    el hilo rojo une las dos chinchetas; una polilla revolotea en la luz;
// 2. (corte en «The singer») el árbol viejo del bosque de cerca, al atardecer: Lucy Gray, sentada en la piedra, toca la
//    guitarra; las notas suben hasta los dos sinsajos de la rama; en «wrote» canta mirando el árbol; los sinsajos le
//    devuelven la melodía en notas doradas;
// 3. (corte en «Katniss») el lago del bosque, al amanecer, sesenta y cinco años después: Katniss canta en la orilla; un
//    sinsajo cruza en «Mockingjay» y se posa en la rama; en «traveled more than sixty years» una hilera de notas cruza
//    desde el árbol viejo hasta ella mientras la barra del año sube de 10 a 75; el pan se mece con la música en los juncos;
//    en «reach her» las notas giran a su alrededor y brillan.''', AYUDAS + r'''
const a = (f) => en('baird', f), b = (f) => en('arbol', f);
// palabras: The 0.50, Lenore 2.44, Baird 3.54, Like 4.35, Lucy 4.53, singer 5.81, Lucy 7.72, wrote 8.24, Hanging 8.62, Katniss 10.04, Mockingjay 10.90, traveled 12.62, sixty 13.56, reach 14.46, her 14.74
const P2 = a(0.81), P3 = b(0.316);
const PINA = a(0.12), BAIRD = a(0.474), LIKE = a(0.6), PINB = a(0.68), HILO = a(0.72);
const WROTE = b(0.07), MOCKJ = b(0.43), TRAVEL = b(0.574), SIXTY = b(0.7), REACH = b(0.912);
// ── 1 · los dos carnés en el corcho (fondo local)
let fondo1 = null;
const corchoFondo = () => {
  const b = R.nuevo(), prev = R.usar(b);
  // el corcho: granulado de tres tonos con poros, más oscuro hacia los bordes (luz de la lámpara arriba a la izquierda)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 1), g = hh(x >> 1, y >> 1, 2);
    let c = n > 0.9 ? hex('#8a5a30') : n < 0.12 ? hex('#d8a868') : g > 0.6 ? hex('#c08a50') : hex('#b47e46');
    if (hh(x, y, 3) > 0.985) c = hex('#5a3a1e');
    const d = Math.hypot((x - 120) / 1.4, y - 70) / 210; c = mez(c, hex('#1e1420'), Math.min(0.7, Math.max(0, d * 1.15 - 0.1)));
    const q = Math.max(Math.max(0, 1 - y / 22) * 0.5, x > 260 ? Math.max(0, 1 - Math.hypot(x - 300, y - 22) / 40) * 0.55 : 0); if (q > 0) c = mez(c, hex('#2a1e22'), q);   // la barra del año y la esquina de Atom, tranquilas
    R.pset(x, y, c); }
  // marco de madera abajo y a la izquierda
  rr(0, 168, 319, 179, K0); rr(0, 169, 319, 179, hex('#6a4228')); for (let x = 0; x < 320; x += 23) R.linea(x, 170, x + 14, 170, hex('#8a5a34')); R.linea(0, 169, 319, 169, hex('#9a6a40'));
  // recortes de alrededor: una foto de montes (torcida), una entrada «74», un pósit con «?», un mapita y una tira de fotos
  R.poligono([[10, 22], [62, 18], [66, 58], [14, 62]], K0); R.poligono([[12, 24], [60, 20], [64, 56], [16, 60]], hex('#f4f1e8'));
  R.poligono([[16, 28], [58, 25], [61, 50], [19, 53]], hex('#6a8ab8')); R.poligono([[19, 53], [30, 36], [40, 46], [48, 34], [61, 50]], hex('#4a6a4a')); R.poligono([[28, 39], [30, 36], [32, 39]], BLANCO);
  R.disco(38, 22, 2, hex('#3a8ae8')); R.pset(37, 21, BLANCO);
  rr(8, 140, 52, 160, K0); rr(9, 141, 51, 159, hex('#e8c860')); R.linea(20, 141, 20, 159, hex('#b89a40')); R.numero('74', 36, 155, { centro: true, color: hex('#6a3a1a'), sombra: false }); R.disco(30, 141, 2, hex('#2ac85a'));
  rr(268, 128, 300, 160, K0); rr(269, 129, 299, 159, hex('#f0e870')); R.icono('?', 280, 136, hex('#c84a3a'), hex('#b8b050'), 2); R.disco(284, 129, 2, hex('#e84a8a'));
  rr(276, 62, 314, 104, K0); rr(277, 63, 313, 103, hex('#e0d8c0')); for (let i = 0; i < 6; i++) R.linea(280 + i * 6, 66, 284 + i * 5, 100, hex('#9ab8d8')); R.linea(280, 84, 310, 78, hex('#c84a3a')); R.disco(296, 63, 2, hex('#f0c040'));
  // una tira de película con cuatro fotogramas, una polaroid con el broche, un dibujo a lápiz del árbol, un recibo y agujeros de chinchetas
  rr(92, 24, 222, 42, K0); for (let i = 0; i < 4; i++) { rr(98 + i * 31, 28, 122 + i * 31, 38, hex(['#3a5a7a', '#7a4a2a', '#4a6a3a', '#6a3a5a'][i])); R.disco(110 + i * 31, 33, 3, hex(['#f0c040', '#e86a3a', '#c8e0a0', '#f0a0c0'][i])); }
  for (let x = 94; x < 222; x += 5) { R.pset(x, 25, hex('#d8c8a0')); R.pset(x, 40, hex('#d8c8a0')); } R.disco(157, 23, 2, hex('#3ac85a'));
  R.poligono([[228, 22], [262, 26], [258, 66], [224, 62]], K0); R.poligono([[229, 23], [261, 27], [257, 65], [225, 61]], hex('#f4f1e8')); R.poligono([[231, 27], [258, 30], [255, 54], [228, 51]], hex('#2a2a3a'));
  R.disco(243, 41, 7, K0); R.disco(243, 41, 6, hex('#f0c040')); R.linea(238, 42, 248, 39, K0); R.linea(239, 41, 247, 38, K0); R.disco(244, 23, 2, hex('#e84a3a'));
  rr(96, 146, 150, 166, K0); rr(97, 147, 149, 165, hex('#ece6d6')); R.linea(110, 164, 112, 152, hex('#6a6a72')); R.linea(112, 152, 108, 149, hex('#6a6a72')); R.linea(112, 153, 124, 148, hex('#6a6a72')); R.linea(110, 158, 104, 162, hex('#6a6a72')); for (let i = 0; i < 9; i++) R.pset(108 + i * 2, 150 - (i % 3), hex('#8a8a92')); R.linea(98, 164, 148, 164, hex('#8a9a8a')); R.disco(122, 147, 2, hex('#3a8ae8'));
  rr(200, 150, 226, 166, K0); rr(201, 151, 225, 165, BLANCO); for (const y of [154, 157, 160]) R.linea(203, y, 222 - (y % 4) * 2, y, hex('#a8a8b0')); R.linea(203, 163, 222, 163, K0);
  for (let i = 0; i < 40; i++) { const x = Math.floor(hh(i, 7) * 300) + 8, y = Math.floor(hh(i, 8) * 140) + 20; R.pset(x, y, hex('#4a2e16')); }
  for (let i = 0; i < 3; i++) { rr(12, 74 + i * 20, 40, 92 + i * 20, K0); rr(13, 75 + i * 20, 39, 91 + i * 20, hex(['#4a3a5a', '#3a4a3a', '#5a3a2a'][i])); R.disco(26, 82 + i * 20, 4, hex(['#f0c040', '#e86a3a', '#d8d8e0'][i])); }
  R.usar(prev); return b;
};
// un carné: cabecera de color, foto, el «apellido» como bloques (igual en los dos), barras, un dibujito y el código
const APELLIDO = [6, 3, 5, 5, 4];
const carne = (x, y, cual, marca) => {
  x = Math.round(x); y = Math.round(y);
  rr(x + 2, y + 2, x + 92, y + 62, mez(hex('#1e1420'), hex('#8a5a30'), 0.3));
  rr(x, y, x + 90, y + 60, K0); rr(x + 1, y + 1, x + 89, y + 59, hex('#f4f1e8'));
  rr(x + 1, y + 1, x + 89, y + 9, hex(cual ? '#c8603a' : '#3a6ac8')); R.linea(x + 1, y + 9, x + 89, y + 9, K0);
  for (let i = 0; i < 6; i++) R.pset(x + 60 + i * 4, y + 5, BLANCO);
  // la foto
  rr(x + 5, y + 13, x + 31, y + 47, K0); rr(x + 6, y + 14, x + 30, y + 46, hex(cual ? '#d8e0b0' : '#c8d4e4'));
  const pel = hex(cual ? '#5a3a28' : '#2a2028'), piel = hex('#f0c49a');
  R.disco(x + 18, y + 26, 8, pel); R.disco(x + 18, y + 27, 6, piel); rr(x + 12, y + 20, x + 24, y + 23, pel); R.pset(x + 16, y + 27, K0); R.pset(x + 20, y + 27, K0); R.linea(x + 17, y + 30, x + 19, y + 30, hex('#b85a4a'));
  if (cual) { for (let i = 0; i < 5; i++) rr(x + 8 + i * 5, y + 38, x + 12 + i * 5, y + 46, hex(['#e8483a', '#f0902a', '#f0d040', '#4aa84a', '#3a7ad8'][i])); rr(x + 10, y + 34, x + 26, y + 37, hex('#e8483a')); R.linea(x + 11, y + 19, x + 25, y + 19, hex('#e8483a')); }
  else { rr(x + 9, y + 36, x + 27, y + 46, hex('#4a5a6a')); for (const [px, py] of [[x + 10, y + 18], [x + 9, y + 21], [x + 26, y + 17]]) { R.linea(px, py, px - 3, py - 4, BLANCO); R.pset(px - 2, py - 2, hex('#c8c8d8')); } }
  // el nombre (barras) y el apellido (bloques), con el rotulador amarillo
  R.linea(x + 36, y + 15, x + 36 + (cual ? 30 : 38), y + 15, hex('#8a8a96')); R.linea(x + 36, y + 16, x + 36 + (cual ? 30 : 38), y + 16, hex('#8a8a96'));
  if (marca > 0) rr(x + 34, y + 22, x + 34 + Math.round(42 * marca), y + 31, hex('#f8f070'));
  let bx = x + 37; APELLIDO.forEach((w, i) => { rr(bx, y + 24, bx + w - 1, y + 29, hex('#2a2a3a')); if (i % 2) R.pset(bx + 1, y + 26, hex('#f4f1e8')); bx += w + 2; });
  for (const yy of [36, 41]) R.linea(x + 36, y + yy, x + 36 + 24 + (yy % 3) * 6, y + yy, hex('#b8b8c0'));
  // la paloma (Lenore Dove) o la guitarra (Lucy Gray)
  if (cual) T.PIEZAS_JH.guitarra(R, x + 80, y + 52, {});
  else T.PIEZAS_JH.sinsonte(R, x + 78, y + 50, {});
  for (let i = 0; i < 28; i++) if (hh(i, cual, 4) > 0.4) R.linea(x + 36 + i * 2, y + 50, x + 36 + i * 2, y + 55, K0);
};
const chincheta = (x, y) => { R.disco(x, y, 3, K0); R.disco(x, y, 2, hex('#d83a3a')); R.pset(x - 1, y - 1, hex('#ff9a9a')); R.pset(x + 1, y + 3, hex('#5a1a1a')); };
const p1 = (t) => {
  if (!fondo1) fondo1 = corchoFondo();
  R.copiar(fondo1);
  // la luz de la lámpara (de arriba a la izquierda) que titila apenas y la polilla que revolotea en ella
  const pol = [lerp(80, 150, (Math.sin(t * 0.9) + 1) / 2) + Math.sin(t * 7) * 6, 40 + Math.cos(t * 5.3) * 8 + Math.sin(t * 1.7) * 6];
  R.disco(Math.round(pol[0]), Math.round(pol[1]), 1, hex('#d8c8a8')); const al = Math.floor(t * 18) % 2; R.linea(Math.round(pol[0]) - 2, Math.round(pol[1]) - al, Math.round(pol[0]) + 2, Math.round(pol[1]) - al, hex('#a89878'));
  // el carné A sube desde abajo con la mano y se clava; el B llega en «Lucy Gray»
  const ua = tramo(t, -0.4, PINA), ub = tramo(t, LIKE - 0.25, PINB);
  const ax = 56, ay = Math.round(lerp(190, 80, ua)), bxx = Math.round(lerp(330, 178, ub)), byy = Math.round(lerp(150, 84, ub));
  carne(ax, ay, 0, tramo(t, BAIRD - 0.1, BAIRD + 0.45));
  if (t > PINA) chincheta(ax + 45, ay + 2);
  if (ub > 0) carne(bxx, byy, 1, tramo(t, HILO - 0.05, HILO + 0.4));
  if (t > PINB) chincheta(bxx + 45, byy + 2);
  // el hilo rojo de chincheta a chincheta, con su comba
  const h = tramo(t, HILO - 0.05, HILO + 0.4);
  if (h > 0) { const x0 = ax + 45, y0 = ay + 2, x1 = bxx + 45, y1 = byy + 2; const n = Math.round((x1 - x0) * h);
    for (let i = 0; i <= n; i++) { const u = i / (x1 - x0), x = x0 + i, y = Math.round(lerp(y0, y1, u) + Math.sin(u * Math.PI) * 10); R.pset(x, y, hex('#e8303a')); R.pset(x, y + 1, hex('#8a1a22')); }
    chincheta(ax + 45, ay + 2); chincheta(x1, y1); if (h >= 1 && t < HILO + 1) destello(162, 100, 3, t); }
  // la mano (brazo canónico) que trae y clava cada carné, y se va
  const manoA = t < PINA + 0.5, manoB = t > LIKE - 0.25 && t < PINB + 0.5;
  if (manoA) { const sal = tramo(t, PINA + 0.05, PINA + 0.5); T.brazo(R, 70, 200, ax + 30, Math.round(ay + 64 + sal * 50), '#5a7ab8', 1); }
  if (manoB) { const sal = tramo(t, PINB + 0.05, PINB + 0.5); T.brazo(R, 300, 205, bxx + 58, Math.round(byy + 64 + sal * 50), '#5a7ab8', -1); }
};
// ── 2 · el árbol viejo, de cerca, al atardecer: Lucy Gray toca
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'bosque', camara: 'arbol', luz: 'tarde' });
  const lx = 150, canta = t > b(0) && Math.sin(t * 10) > -0.2, mira = t > WROTE && t < WROTE + 1.3;
  const l = R.actor(EL.lucyGray, lx, 150, t, { dir: mira ? -1 : 1, sostiene: [lx + 16, 142], habla: canta, sonrisa: !canta });
  // la guitarra en la mano, con el rasgueo
  const [gx, gy] = l.mano, ras = Math.floor(t * 8) % 2;
  T.PIEZAS_JH.guitarra(R, gx + 1, gy + 9 + ras * 0, { dir: mira ? -1 : 1 });
  if (ras) R.pset(gx + 1, gy + 3, hex('#fff0c0'));
  // las notas suben de la guitarra a la rama; los sinsajos las devuelven en oro
  for (let i = 0; i < 6; i++) { const t0 = P2 + 0.2 + i * 0.55; notaVuela(gx + 4, gy - 4, 196 + (i % 2) * 36, 34, tramo(t, t0, t0 + 1.6), hex('#fffbe8'), i); }
  for (let i = 0; i < 5; i++) { const t0 = b(0) + 0.4 + i * 0.45, [sx, sy] = i % 2 ? [232, 30] : [196, 26]; notaVuela(sx + 4, sy - 2, sx - 60 + i * 30, 40, tramo(t, t0, t0 + 1.5), ORO, i + 3, true, 2); }
  if (t > b(0) + 0.3) for (const [sx, sy] of [[196, 26], [232, 32]]) if (Math.sin(t * 9 + sx) > 0.6) destello(sx + 6, sy - 6, 2, t);
};
// ── 3 · el lago al amanecer: Katniss canta y la canción le llega
const p3 = (t) => {
  T.distrito(R, t, { encuadre: 'bosque', luz: 'amanecer' });
  // el sinsajo que cruza y se posa en la rama
  const v = tramo(t, MOCKJ - 0.4, MOCKJ + 0.6);
  if (v > 0) { const sx = v < 1 ? lerp(330, 146, v) : 146, sy = v < 1 ? lerp(40, 54, v) - Math.sin(v * Math.PI) * 14 : 54; T.PIEZAS_JH.sinsajo(R, Math.round(sx), Math.round(sy), { dir: -1, t: v < 1 ? t : undefined }); }
  // Katniss en la orilla, cantando
  const kx = 176, llega = t > REACH;
  R.actor(EL.katniss, kx, 162, t, { dir: -1, habla: !llega && Math.sin(t * 9) > -0.2, sonrisa: llega, brazos: llega && t < REACH + 0.6 });
  // notas que salen de ella hacia los sinsajos de la rama y vuelven doradas
  for (let i = 0; i < 4; i++) { const t0 = P3 + 0.2 + i * 0.5; notaVuela(kx + 2, 138, 118 + (i % 2) * 14, 54, tramo(t, t0, t0 + 1.4), hex('#fffbe8'), i); }
  // la hilera de notas que cruza desde el árbol viejo hasta ella («more than sixty years»)
  for (let i = 0; i < 9; i++) { const t0 = TRAVEL - 0.1 + i * 0.22; notaVuela(68, 86 + (i % 3) * 8, kx + 2, 124, tramo(t, t0, t0 + 1.4), i % 2 ? ORO : hex('#fffbe8'), i, i % 3 === 0, 2); }
  // en «reach her», las notas giran alrededor de ella y brillan
  const g = tramo(t, REACH - 0.2, REACH + 0.8);
  if (g > 0) { for (let i = 0; i < 5; i++) { const ang = t * 3 + i * 1.26, rx = 16 * (1 - g * 0.3); R.icono(i % 2 ? 'nota2' : 'nota', Math.round(kx + 7 + Math.cos(ang) * rx - 2), Math.round(146 + Math.sin(ang) * 9 - 6), i % 2 ? ORO : hex('#fffbe8'), K0, 1); }
    halo(kx + 7, 146, 18, 0.25 * g); if (t < REACH + 1.2) destello(kx + 18, 130, 3, t); }
  // el pan en los juncos, meciéndose con la música (se ríe en «reach her»)
  const pb = Math.round(Math.sin(t * 3.2) * 2);
  T.pan(R, 228 + pb, 168, t, { s: 1, dir: -1, expresion: t > SIXTY ? 'risa' : 'normal', saluda: t > TRAVEL && t < SIXTY });
};
const efectos = [[PINA, 'golpecito'], [BAIRD, 'lapiz'], [PINB, 'golpecito'], [HILO + 0.3, 'brillo'], [b(0) + 0.5, 'silbato'], [MOCKJ - 0.3, 'whoosh'], [TRAVEL, 'brillo'], [REACH, 'brillo']];
const año = (t) => (t < P2 ? null : t < P3 ? 10 : 75);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
