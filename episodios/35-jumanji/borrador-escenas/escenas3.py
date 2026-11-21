E = {}
E['jm-pregunta'] = ('La pregunta', '''// JM-PREGUNTA (frases 7–8), cartela «1981». Seis planos (cortes en You moved · So · He picked · And he needed · Maybe):
// 1. el recuerdo (1957, en color): el niño ante un juego corriente: mira el reloj que no avanza, tamborilea, mueve la
// ficha sin ganas y bosteza estirándose;  2. el billete de juguete desde arriba (gag 3): la ficha azul salta una casilla,
// la mano coge el billete («won»), lo suelta, cae una «X» encima («none of it was real») y la ficha se estira, se
// desinfla y suelta una nubecilla;  3. la pregunta (1981): NUESTRA meta a lápiz: un «?», la mano tira los dados, el disco
// se empaña y de él sale una hoja de VERDAD, en color; la mano se aparta y vuela una mariposa;  4. la mesa desde arriba:
// la mano con la barrita dibuja el salón tranquilo y, en «wild animals», el rinoceronte; luego moja el dedo en el polvo
// y sombrea;  5. busca el nombre: tres bolas de papel a la papelera («name», «far away», «English») y, en «jungle», la
// idea («!») y corre a la mesa;  6. la libreta: tacha el último intento, duda, y en «with a J» escribe la J, las rayas y
// el círculo.''', r'''
const ra = (s) => en('recuerdo', (s - 1.5) / 15.454), no = (s) => en('nombre', (s - 18.625) / 18.934), P = T.PIEZAS_JM;
const P2 = ra(7.1), P3 = ra(11.05), P4 = no(18.2), P5 = no(25.35), P6 = no(32.5);
const AZUL = '#e6e0d0', VERDE = '#2e5a3e', K = hex('#1a1420'), ORO = hex('#ffd84a'), ROJO = hex('#e0303a');
const mez = (c1, c2, f) => { const m = (s) => Math.round(((c1 >>> s) & 255) + (((c2 >>> s) & 255) - ((c1 >>> s) & 255)) * f); return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
const elipse = (cx, cy, rx, ry, c) => { for (let j = -Math.ceil(ry); j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j * j) / (ry * ry)))); for (let i = -w; i <= w; i++) R.pset(Math.round(cx) + i, Math.round(cy) + j, c); } };
const sombra = (cx, cy, rx, ry, f) => { for (let j = -Math.ceil(ry); j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j * j) / (ry * ry)))); for (let i = -w; i <= w; i++) { const x = Math.round(cx) + i, y = Math.round(cy) + j; R.pset(x, y, mez(R.pget(x, y), K, f)); } } };
const destello = (x, y, r, c) => { R.linea(x - r, y, x + r, y, c); R.linea(x, y - r, x, y + r, c); R.pset(x, y, hex('#ffffff')); };
const icono = (n, x, y, c, esc) => R.icono(n, Math.round(x), Math.round(y), c, K, esc);

// 1 · el recuerdo: el niño y su juego aburrido
const sienta = ra(3.0), mueve = ra(5.3), bost = ra(6.15);
const p1 = (t) => {
  const mv = suave(tramo(t, mueve, mueve + 0.45));
  const o = { encuadre: 'cocina50', tedio: (t * 0.5) % 1, mueve: mv }; T.casaJuego(R, t, o);
  // llega con ganas, se sienta, mira el reloj, tamborilea, mueve la ficha y bosteza
  const e1 = tramo(t, 1.25, 1.85), e2 = tramo(t, 1.85, sienta), llega = e2 >= 1, inc = Math.sin(tramo(t, mueve - 0.4, mueve + 0.75) * Math.PI), x = Math.round(e1 < 1 ? lerp(266, 236, e1) : lerp(236, 180, e2) - inc * 16), y = Math.round(lerp(162, 148, e1));
  const coge = t > mueve - 0.4 && t < mueve + 0.75, bz = t >= bost && t < bost + 0.95, reloj = llega && t < mueve - 0.5 && Math.floor((t - sienta) / 0.75) % 2 === 1;
  const est = bz ? Math.round(Math.sin(tramo(t, bost, bost + 0.95) * Math.PI) * 2) : 0;
  R.actor(EL.nino50JM, x, y - est, t, { dir: !llega || coge ? -1 : reloj ? 1 : -1, anda: !llega, sonrisa: !llega || t < sienta + 0.5, sostiene: !llega ? undefined : coge ? [x - 4, 140] : bz ? undefined : [reloj ? 199 : 176, 141 - (Math.floor(t * 7) % 3 === 0 ? 1 : 0)],
    brazos: bz, ...(bz ? { parpadea: true } : {}), habla: bz, triste: llega && !bz && (t > bost || (t > sienta + 0.5 && !coge && !reloj)) });
  if (reloj) icono('reloj', 198, 112 - Math.round(Math.abs(Math.sin(t * 5)) * 2), hex('#fff4d8'), 1);
  T.casaJuegoDelante(R, t, o);
  if (bz) { const u = tramo(t, bost + 0.35, bost + 0.95); for (let k = 0; k < 3; k++) { const bx = 197 + k * 4 + Math.round(u * 6), by = 128 - k * 3 - Math.round(u * 7); R.disco(bx, by, 1.6 + k * 0.5, mez(R.pget(bx, by), hex('#ffffff'), 0.75 * (1 - u))); } }
};

// 2 · el billete de juguete (gag 3): la ficha también bosteza
const salta = ra(7.31), gana = ra(8.29), nada = ra(9.63), real = ra(10.29);
const p2 = (t) => {
  T.casaJuego(R, t, { encuadre: 'cocina50', camara: 'billete', valor: 5, mano: false });
  // la ficha azul, desde arriba: salta una casilla; luego se estira, se desinfla y suelta una nubecilla
  const s = tramo(t, salta, salta + 0.45), alto = Math.sin(s * Math.PI) * 9, fx = lerp(74, 116, suave(s)), fy = 157;
  const y1 = tramo(t, real - 0.25, real + 0.25), y2 = suave(tramo(t, real + 0.25, real + 0.6));
  const rx = 8 - 2.5 * Math.sin(y1 * Math.PI / 2) * (1 - y2) + 3.5 * y2 + (y2 >= 1 ? Math.sin(t * 3) * 0.4 : 0), ry = 8 + 3.5 * Math.sin(y1 * Math.PI / 2) * (1 - y2) - 2.5 * y2;
  sombra(fx + 2 + alto * 0.5, fy + 4 + alto * 0.6, rx + 1, ry * 0.8, 0.3);
  elipse(fx, fy - alto, rx + 1, ry + 1, K); elipse(fx, fy - alto, rx, ry, hex('#3f66b0')); elipse(fx + 1, fy - alto + 1.5, rx - 2, ry - 2.5, hex('#2c4a8a'));
  elipse(fx - 1, fy - alto - 1, rx - 2.5, ry - 3, hex('#5f8ad8')); elipse(fx - rx * 0.35, fy - alto - ry * 0.4, 1.8, 1.4, hex('#d8e6ff'));
  if (s > 0.92 && s < 1 || (t > salta + 0.45 && t < salta + 0.6)) for (const d of [-1, 1]) R.linea(fx + d * 11, fy + 6, fx + d * 14, fy + 4, hex('#b89a6a'));
  if (y2 > 0) { const u = tramo(t, real + 0.3, real + 1.1); for (let k = 0; k < 4; k++) { const x = Math.round(fx + 10 + k * 5 + u * 10), y = Math.round(fy - 8 - k * 4 - u * 10); R.disco(x, y, 2 + k * 0.7, mez(R.pget(x, y), hex('#ffffff'), 0.85 * (1 - u))); } }
  // la «X»: nada de eso era de verdad
  const xu = tramo(t, real, real + 0.18);
  if (xu > 0) { const e = xu < 1 ? 5 : 4, x0 = 150 - e * 2.5, y0 = 112 - e * 3; icono('X', x0, y0, ROJO, e); }
  // brillos del premio
  if (t > gana && t < nada) for (const [k, x, y] of [[0, 100, 84], [1, 200, 90], [2, 96, 140], [3, 150, 78]]) if (Math.floor(t * 6 + k) % 3) destello(x, y - Math.round(tramo(t, gana, nada) * 4), 2 + (Math.floor(t * 6 + k) % 2), ORO);
  // la mano del niño: entra, coge el billete, lo suelta y se va
  const e = suave(tramo(t, gana - 0.55, gana)), f = suave(tramo(t, nada + 0.15, nada + 0.85)), gozo = t > gana && t < nada ? Math.round(Math.abs(Math.sin((t - gana) * 9)) * 3 * (1 - tramo(t, gana, nada))) : 0;
  const wx = Math.round(lerp(280, 201, e) + f * 96), wy = Math.round(lerp(190, 134, e) + f * 60) - gozo;
  if (e > 0 && f < 1) T.brazo(R, wx + 66, wy + 50, wx, wy, AZUL, -1, { codo: [wx + 36, wy + 18] });
};

// 3 · la pregunta: de NUESTRA meta sale una hoja de verdad
const preg = ra(11.98), tira = ra(13.0), nubla = ra(13.55), sale = ra(15.4);
const p3 = (t) => {
  const g = T.casaJuego(R, t, { encuadre: 'tablero', camara: 'gema', dentro: suave(tramo(t, nubla, sale + 0.5)) });
  const [cx, cy] = g.gema ?? [160, 96];
  // los dados que tira la mano: ruedan y se paran
  const r = tramo(t, tira, tira + 0.8), q = 1 - (1 - r) * (1 - r);
  if (t >= tira) { const dx = Math.round(lerp(262, 214, q)), dy = Math.round(lerp(140, 164, q) - Math.abs(Math.sin(r * Math.PI * 3)) * 10 * (1 - r)); const k = Math.floor(t * 14);
    sombra(dx + 1, 166, 18, 2.5, 0.3); P.dados(R, dx, dy, { s: 2, caras: r < 1 ? [1 + (k % 6), 1 + ((k * 5 + 2) % 6)] : [6, 2] }); }
  // la hoja de verdad (en color sobre la lámina): brota en tres empujones
  const h = t < sale ? 0 : t < sale + 0.4 ? 1 : t < sale + 0.85 ? 2 : 3, bote = h ? Math.round(Math.abs(Math.sin(tramo(t, sale + [0, 0, 0.4, 0.85][h], sale + [0, 0, 0.4, 0.85][h] + 0.3) * Math.PI)) * 4) : 0;
  if (h) { const base = cy + [0, 10, 18, 26][h];
    for (let k = 0; k < 10; k++) { const an = k * 0.63 + t * 0.6, d = 30 + (k % 3) * 9 + Math.sin(t * 3 + k) * 3, x = Math.round(cx + Math.cos(an) * d), y = Math.round(cy + Math.sin(an) * d * 0.8); if (Math.floor(t * 5 + k) % 3 === 0) destello(x, y, 1, hex('#9af0a8')); }
    P.hojaSelva(R, cx + Math.round(Math.sin(t * 2.2) * (h - 1)), base - bote, { s: h, t });
    // una mariposa que sale volando
    const m = tramo(t, sale + 1.0, P4 + 0.4); if (m > 0 && m < 1) { const mx = Math.round(lerp(cx + 6, 96, m) + Math.sin(m * 14) * 5), my = Math.round(lerp(cy - 30, 34, m) + Math.cos(m * 11) * 4), al = Math.floor(t * 12) % 2;
      for (const d of [-1, 1]) { R.pset(mx + d, my, hex('#ff9a2a')); R.pset(mx + d * 2, my - al, hex('#ff9a2a')); R.pset(mx + d * 2, my + 1 - al, hex('#ffd84a')); R.pset(mx + d * 3, my - al * 2, K); } R.pset(mx, my, K); R.pset(mx, my + 1, K); } }
  // el «?» que se vuelve «!»
  const pu = tramo(t, preg, preg + 0.2);
  if (pu > 0) { const by = 36 - Math.round(Math.abs(Math.sin(t * 3.2)) * 3) - (pu < 1 ? 4 : 0); icono(h ? '!' : '?', h ? 76 : 70, by, h ? hex('#7ae08a') : ORO, 3); }
  // la mano del niño: tira los dados; cuando brota la hoja, se aparta de golpe y vuelve a señalarla
  const e = suave(tramo(t, tira - 0.6, tira - 0.1)), sus = t >= sale ? Math.sin(tramo(t, sale, sale + 0.35) * Math.PI / 2) - suave(tramo(t, sale + 1.0, sale + 1.6)) * 0.8 : 0, lanza = Math.sin(tramo(t, tira - 0.1, tira + 0.25) * Math.PI) * 10;
  const wx = Math.round(lerp(340, 282, e) - lanza + sus * 22), wy = Math.round(lerp(196, 150, e) + sus * 14 - (h && sus < 0.4 ? 8 * suave(tramo(t, sale + 1.0, sale + 1.6)) : 0));
  if (e > 0) T.brazo(R, wx + 60, wy + 44, wx, wy, AZUL, -1, { codo: [wx + 34, wy + 16] });
};

// 4 · la mesa: el salón tranquilo… y el rinoceronte
const RD = T.taller(R, 0, { encuadre: 'casa', camara: 'mesa', dibujo: 0, tema: 'rino' }).rinoDesde ?? 0.7;
const rino = no(21.19), finRino = no(23.2), moja = no(23.9), frota = no(24.45);
const p4 = (t) => {
  const d = t < rino ? lerp(0.04, RD, tramo(t, P4 + 0.1, rino - 0.12)) : lerp(RD, 1, tramo(t, rino, finRino));
  const g = T.taller(R, t, { encuadre: 'casa', camara: 'mesa', dibujo: d, tema: 'rino' }), [px, py] = g.punta ?? [160, 90];
  // la mano con la barrita: dibuja; al acabar va al platillo del polvo y sombrea con el dedo bajo el rinoceronte
  const a1 = suave(tramo(t, finRino + 0.05, moja)), a2 = suave(tramo(t, moja + 0.2, frota)), rasca = t > frota ? Math.sin((t - frota) * 11) : 0;
  let wx = px + 27, wy = py - 12;
  wx = lerp(wx, 284, a1); wy = lerp(wy, 84, a1); wx = lerp(wx, 190 + rasca * 9, a2); wy = lerp(wy, 124 + rasca * 1.5, a2); wx = Math.round(wx); wy = Math.round(wy);
  if (t > frota) { const n = Math.min(26, Math.floor((t - frota) * 30)); for (let k = 0; k < n; k++) { const x = 122 + ((k * 7) % 58), y = 131 + ((k * 3) % 4); if ((x + y) % 2) R.pset(x, y, hex('#8a8a92')); } }
  if (a1 > 0.6 && a2 < 0.3) for (let k = 0; k < 6; k++) { const u = (t * 2 + k * 0.17) % 1; R.pset(Math.round(262 + Math.cos(k * 1.1) * (4 + u * 8)), Math.round(92 + Math.sin(k * 1.1) * (4 + u * 6) - u * 4), hex('#3a3a42')); }
  if (a1 < 0.5) P.lapizConte(R, wx - 15, wy + 12, { s: 2 });
  T.brazo(R, wx + 58, wy + 42, wx, wy, VERDE, -1, { codo: [wx + 32, wy + 14] });
};

// 5 · busca un nombre: bolas de papel
const TIROS = [no(26.11), no(28.42), no(30.24)], idea = no(31.78), VUELO = 0.85;
const bolita = (x, y) => { R.disco(x, y, 3.4, K); R.disco(x, y, 2.4, hex('#f4f0e4')); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x + 1, y + 1, hex('#b8b4a8')); R.pset(x, y, hex('#c8c4b8')); };
const p5 = (t) => {
  let k = -1; for (let i = 0; i < 3; i++) if (t >= TIROS[i]) k = i;
  const tk = k >= 0 ? TIROS[k] : -9, vuela = k >= 0 && t < tk + VUELO, sig = k < 2 ? TIROS[k + 1] : 99;
  const o = { encuadre: 'palabras', camara: 'papelera' }; if (vuela) { o.bola = tramo(t, tk, tk + VUELO); o.desde = [124, 124]; }
  T.taller(R, t, o);
  // la idea: la luz del flexo llena el cuarto
  const luz = suave(tramo(t, idea, idea + 0.5)); if (luz > 0) for (let y = 62; y <= 179; y++) { const x1 = Math.min(319, Math.round(120 + (y - 62) * 1.5)); for (let x = 0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), hex('#ffd890'), 0.2 * luz * (1 - x / (x1 + 40)))); }
  // cada bola que cae echa otra del montón, que rueda por el suelo
  [[236, 159], [172, 162], [226, 168]].forEach(([bx, by], i) => { const r = tramo(t, TIROS[i] + VUELO, TIROS[i] + VUELO + 0.7); if (r > 0) { const q = 1 - (1 - r) * (1 - r); bolita(Math.round(lerp(205, bx, q)), Math.round(lerp(118, by, q * q) - Math.abs(Math.sin(r * Math.PI * 2)) * 7 * (1 - r))); } });
  // entre tiro y tiro va a la mesa por otra hoja y vuelve arrugándola
  const ida = k >= 0 && k < 2 ? tramo(t, tk + VUELO + 0.15, tk + VUELO + 0.5) - tramo(t, sig - 0.75, sig - 0.4) : 0;
  const eureka = t >= idea, corre = eureka ? tramo(t, idea + 0.45, P6 + 0.3) : 0;
  const x = Math.round(lerp(104, 90, ida) - corre * 44), anda = (ida > 0 && ida < 1) || (corre > 0 && corre < 1);
  const lista = !eureka && !vuela && (k < 0 || (k < 2 && t > sig - 0.75)), lanza = k >= 0 && t < tk + 0.3;
  const act = R.actor(EL.vanallsburg, x, 152, t, { dir: eureka ? (corre > 0 ? -1 : 1) : k >= 0 && k < 2 && t > tk + VUELO + 0.15 && t < sig - 0.75 ? -1 : 1, anda, dedo: lanza, brazos: eureka && corre === 0,
    salto: eureka && corre === 0 ? Math.round(Math.abs(Math.sin((t - idea) * 9)) * 3) : 0, sostiene: lista && !lanza ? [x + 17, 134 + (Math.floor(t * 9) % 2)] : undefined,
    enfado: !eureka && k >= 1 && !lista, triste: !eureka && k === 0 && t > tk + VUELO, sonrisa: eureka });
  if (lista && !lanza) bolita(act.mano[0] + 2, act.mano[1] - 1);
  if (k === 2 && !vuela && !eureka) icono('?', x + 5, 112, hex('#c8d8ff'), 1);
  if (eureka) icono('!', x + 5, 106 - Math.round(Math.abs(Math.sin(t * 7)) * 3), ORO, 2);
  T.tallerDelante(R, t, o);
};

// 6 · la palabra, con su J
const JD = T.taller(R, 0, { encuadre: 'palabras', intentos: 0 }).jDesde ?? 0.8;
const jota = no(34.7), finJ = no(35.45), escribe = no(36.0), fin = no(37.5), FJ = 0.2;
const p6 = (t) => {
  const it = t < jota ? lerp(JD * 0.7, JD, tramo(t, P6 + 0.1, no(33.9))) : t < escribe ? lerp(JD, JD + (1 - JD) * FJ, tramo(t, jota, finJ)) : lerp(JD + (1 - JD) * FJ, 1, tramo(t, escribe, fin));
  const g = T.taller(R, t, { encuadre: 'palabras', intentos: it }), [px, py] = g.punta ?? [140, 120];
  const duda = t > no(33.9) && t < jota, hecho = suave(tramo(t, fin, fin + 0.5));
  // el lápiz: escribe, duda en el aire (da golpecitos) y al final se aparta
  const lx = Math.round(duda ? lerp(px, 108, tramo(t, no(33.9), no(34.3))) : px + hecho * 60), ly = Math.round(duda ? lerp(py, 126, tramo(t, no(33.9), no(34.3))) - Math.abs(Math.sin(t * 8)) * 3 : py + hecho * 18);
  for (let d = -1; d <= 2; d++) R.linea(lx + 2 + d, ly - 2, lx + 21 + d, ly - 17, d === -1 || d === 2 ? K : d === 0 ? hex('#ffd84a') : hex('#d8a020'));
  R.linea(lx, ly, lx + 3, ly - 3, hex('#e8c8a0')); R.linea(lx + 1, ly, lx + 4, ly - 3, hex('#e8c8a0')); R.pset(lx, ly, K); R.pset(lx + 1, ly - 1, K);
  T.brazo(R, lx + 74, ly + 30, lx + 22, ly - 12, VERDE, -1, { codo: [lx + 52, ly + 6] });
  if (t > fin) for (const [k, x, y] of [[0, 84, 126], [1, 124, 124], [2, 204, 150]]) if (Math.floor(t * 6 + k) % 3 === 0) destello(x, y, 2, ORO);
};

const efectos = [[ra(2.3), 'tic'], [mueve + 0.4, 'toc'], [salta + 0.42, 'toc'], [gana, 'brillo'], [real + 0.3, 'pop'], [tira + 0.3, 'golpecito'], [sale, 'pop'], [P4 + 0.4, 'lapiz'], [rino + 0.1, 'lapiz'],
  [TIROS[0], 'papel'], [TIROS[1], 'papel'], [TIROS[2], 'papel'], [idea, 'palmada'], [jota, 'lapiz'], [escribe + 0.1, 'lapiz'], [fin + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1981', efectos, año: (t) => (t < P3 ? 1957 : 1981) });
''')
E['jm-libro'] = ('El libro', '''// JM-LIBRO (frases 9–10), 1981, sin cartela. La lámina va en grises, como a lápiz (los hermanos, en color). Nueve planos
// (cortes en Every · monkeys · a stampede · until · pencil · And he ended · park · carry it off):
// 1. el pie del árbol: Judy y Peter llegan andando, él señala la caja, ella corre a tocarla y él salta;  2. el piano:
// Judy tira los dados, el león se dibuja encima del piano, los dos retroceden y el león toca UNA nota (gag 4);  3. la
// cocina: entran por la puerta y los monos la toman de uno en uno; un plátano vuela hacia Peter; en «monsoon», el
// relámpago y la lluvia empieza DENTRO;  4. el pasillo: sigue el monzón (lo pinta la escena) bajo un paraguas rojo; pasa
// la estampida por delante, el paraguas se da la vuelta, y el destrozo se queda («nothing goes away»);  5. NUESTRO
// tablero desde arriba, con restos de selva alrededor: ruedan los dados, la ficha llega a la meta, que se enciende (el
// único acento de color de la escena) y se traga los restos; entra rodando la barrita de lápiz y, en «black and white»,
// el color se va;  6. el salón con lluvia y lianas: la mano raya con la barrita, difumina con el dedo (polvo), se
// retira; destello de «fotografía» y aparece lo imposible: el rinoceronte;  7. el parque: llegan corriendo con la caja,
// la dejan al pie del árbol y se van;  8. desde la ventana: dos chicos se la llevan; Peter los señala y se miran;
// 9. el folleto en la hierba: las zapatillas pasan sin mirarlo, cae una hoja y salta un «!».''', r'''
const he = (s) => en('hermanos', (s - 0.5) / 19.199), di = (s) => en('dibujo', (s - 20.199) / 19.228), P = T.PIEZAS_JM;
const P2 = he(6.6), P3 = he(10.45), P4 = he(14.0), P5 = he(17.7), P6 = di(22.6), P7 = di(29.45), P8 = di(33.0), P9 = di(36.58);
const VERDE = '#2e5a3e', K = hex('#1a1420'), ORO = hex('#ffd84a'), ROJO = hex('#d8303a'), ROJO2 = hex('#a01e2a'), BL = hex('#ffffff');
const G = ['#2a2a30', '#5a5a62', '#8a8a92', '#c4c4c8', '#ecece8'].map(hex);
const mez = (c1, c2, f) => { const m = (s) => Math.round(((c1 >>> s) & 255) + (((c2 >>> s) & 255) - ((c1 >>> s) & 255)) * f); return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
const icono = (n, x, y, c, esc) => R.icono(n, Math.round(x), Math.round(y), c, K, esc);
const destello = (x, y, r, c) => { R.linea(x - r, y, x + r, y, c); R.linea(x, y - r, x, y + r, c); R.pset(x, y, BL); };
// el monzón, en los grises de la lámina (sin pisar a Atom ni la barra del año): lejos = fino, antes de los actores;
// cerca = gotas largas y salpicaduras, después de lo de delante
const calma = (x, y) => (x >= 272 && y <= 50) || (x >= 14 && x <= 176 && y <= 22);
const lluvia = (t, f, cerca, suelo) => {
  const n = Math.round((cerca ? 54 : 110) * f), len = cerca ? 8 : 4, v = cerca ? 330 : 230;
  for (let k = 0; k < n; k++) { const h1 = (k * 0.6180339 + (cerca ? 0.31 : 0)) % 1, h2 = (k * 0.7548776) % 1, y0 = ((h2 * 210 + t * v * (0.8 + h1 * 0.4)) % 210) - 15, x0 = h1 * 380 - 10 - y0 * 0.22;
    for (let j = 0; j < len; j++) { const x = Math.round(x0 - j * 0.22), y = Math.round(y0 + j); if (x < 0 || x > 319 || y < 0 || y > 179 || calma(x, y)) continue; R.pset(x, y, cerca ? (k % 3 === 0 ? (j > 4 ? G[0] : G[1]) : j > 4 ? G[4] : G[3]) : mez(R.pget(x, y), k % 2 ? G[4] : G[0], k % 2 ? 0.6 : 0.4)); } }
  if (cerca) for (let k = 0; k < Math.round(16 * f); k++) { const h1 = (k * 0.381966) % 1, h2 = (k * 0.7245) % 1, u = (t * 2.6 + h1 * 5) % 1, x = Math.round(h2 * 318), y = Math.round(suelo + 5 + h1 * (174 - suelo));
    R.pset(x - 1 - Math.round(u * 3), y - Math.round(Math.sin(u * Math.PI) * 3), G[4]); R.pset(x + 1 + Math.round(u * 3), y - Math.round(Math.sin(u * Math.PI) * 3), G[4]); if (u < 0.5) { R.pset(x - 2, y + 1, G[3]); R.pset(x + 2, y + 1, G[3]); R.pset(x, y + 1, G[3]); } }
};
const flash = (f) => { if (f <= 0.02) return; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), BL, f)); };
const cajaGris = (x, y) => { R.rect(x - 16, y - 19, x + 16, y, K); R.rect(x - 15, y - 18, x + 15, y - 1, G[1]); R.rect(x - 15, y - 18, x + 15, y - 14, G[2]); R.rect(x - 15, y - 13, x + 15, y - 13, G[0]); R.rect(x - 15, y - 18, x + 15, y - 18, G[3]);
  R.poligono([[x - 8, y - 7], [x, y - 11], [x + 8, y - 7], [x, y - 3]], G[3]); R.linea(x - 6, y - 7, x + 6, y - 7, G[1]); R.rect(x - 1, y - 14, x + 1, y - 11, G[4]); R.pset(x, y - 12, K);
  for (const d of [-1, 1]) { R.rect(x + d * 15 - (d > 0 ? 2 : 0), y - 18, x + d * 15 + (d < 0 ? 2 : 0), y - 16, G[4]); R.rect(x + d * 15 - (d > 0 ? 2 : 0), y - 3, x + d * 15 + (d < 0 ? 2 : 0), y - 1, G[4]); } };

// 1 · el pie del árbol: encuentran la caja
const ve = he(4.64), toca = he(5.5);
const p1 = (t) => {
  const o = { encuadre: 'parque', camara: 'arbol' }; T.casaJuego(R, t, o);
  const u = tramo(t, 0.25, ve - 0.5), c = suave(tramo(t, ve + 0.25, toca)), c2 = suave(tramo(t, toca - 0.1, he(6.3)));
  const jx = Math.round(lerp(-18, 84, u) + c * 36), px = Math.round(lerp(-40, 58, u) + c2 * 30), visto = t >= ve;
  R.actor(EL.peterJM, px, 164, t, { dir: 1, anda: (u > 0 && u < 1) || (c2 > 0 && c2 < 1), dedo: visto && c2 === 0, sorpresa: visto && t < ve + 0.5, sonrisa: t > ve + 0.5, salto: c2 >= 1 ? Math.round(Math.abs(Math.sin((t - he(6.3)) * 8)) * 3) : 0, habla: !visto && Math.sin(t * 7) > 0.3 && t > he(2.2) });
  R.actor(EL.judyJM, jx, 164, t, { dir: !visto && t > he(2.3) && t < he(3.3) ? -1 : 1, anda: (u > 0 && u < 1) || (c > 0 && c < 1), sorpresa: visto && c === 0, sonrisa: c > 0, sostiene: c >= 1 ? [138, 146 - (Math.floor(t * 6) % 2)] : undefined });
  if (visto && c < 1) icono('!', jx + 5, 126 - Math.round(Math.abs(Math.sin(t * 7)) * 3), ORO, 2);
  T.casaJuegoDelante(R, t, o);
};

// 2 · el piano: cada tirada trae algo; el león toca una nota (gag 4)
const tira = he(7.25), viene = he(7.8), nota = he(8.95);
const corchea = (x, y) => { R.disco(x, y, 3.2, K); R.disco(x - 1, y, 1.2, G[1]); R.rect(x + 2, y - 12, x + 3, y, K); R.poligono([[x + 3, y - 12], [x + 9, y - 8], [x + 9, y - 5], [x + 3, y - 9]], K); };
const p2 = (t) => {
  const le = tramo(t, viene, he(8.8)), o = { encuadre: 'salon', camara: 'piano', leon: le, nota: tramo(t, nota, he(10.1)) }; T.casaJuego(R, t, o);
  const nu = tramo(t, he(9.75), P3 + 0.3); if (nu > 0) { corchea(Math.round(254 + Math.sin(nu * 6) * 4), Math.round(108 - nu * 34)); if (nu > 0.25) for (let k = 0; k < 3; k++) R.linea(244 + k * 9, 116 - k, 244 + k * 9 + 3, 112 - k, G[1]); }
  const susto = t > viene + 0.35, atras = Math.round(suave(tramo(t, viene + 0.35, viene + 0.8)) * 8);
  R.actor(EL.peterJM, 12 - atras, 174, t, { dir: 1, sorpresa: susto && t < nota, brazos: susto && t < viene + 1.3, sonrisa: t > nota + 0.7 });
  const j = R.actor(EL.judyJM, 32 - atras, 174, t, { dir: 1, sostiene: t < tira ? [49, 156 - (Math.floor(t * 10) % 2) * 2] : undefined, dedo: t >= tira && t < tira + 0.3, sorpresa: susto && t < nota, sonrisa: t > nota + 0.7 });
  // los dados: en la mano, por el aire y parados en el suelo
  const r = tramo(t, tira, tira + 0.55), kk = Math.floor(t * 14);
  if (t < tira) P.dados(R, j.mano[0] + 2, j.mano[1] + 4, {});
  else P.dados(R, Math.round(lerp(51, 58, r)), Math.round(lerp(158, 177, r * r) - Math.abs(Math.sin(r * Math.PI * 2)) * 6 * (1 - r)), { caras: r < 1 ? [1 + (kk % 6), 1 + ((kk * 5 + 2) % 6)] : [4, 6] });
  if (le > 0 && le < 1) for (let k = 0; k < 7; k++) if (Math.floor(t * 9 + k) % 2) destello(130 + ((k * 37) % 120), 44 + ((k * 23) % 44), 2, G[4]);
  T.casaJuegoDelante(R, t, o);
};

// 3 · la cocina: monos… y empieza el monzón
const trueno = he(12.42);
const platano = (x, y, an) => { for (let d = -3; d <= 3; d++) { const px = Math.round(x + Math.cos(an) * d - Math.sin(an) * (d * d) * 0.22), py = Math.round(y + Math.sin(an) * d + Math.cos(an) * (d * d) * 0.22); R.pset(px, py + 1, K); R.pset(px, py - 1, K); R.pset(px + 1, py, K); R.pset(px - 1, py, K); }
  for (let d = -3; d <= 3; d++) { const px = Math.round(x + Math.cos(an) * d - Math.sin(an) * (d * d) * 0.22), py = Math.round(y + Math.sin(an) * d + Math.cos(an) * (d * d) * 0.22); R.pset(px, py, Math.abs(d) === 3 ? G[1] : G[4]); } };
const p3 = (t) => {
  const o = { encuadre: 'cocina', monos: tramo(t, P3 + 0.1, he(12.3)) }; T.casaJuego(R, t, o);
  const ll = tramo(t, trueno, trueno + 0.9); if (ll > 0) lluvia(t, ll, false, 154);
  const e = tramo(t, P3, P3 + 0.7), bt = tramo(t, he(11.25), he(11.85)), golpe = t > he(11.85) && t < he(12.3), moja = t > trueno;
  const jx = Math.round(lerp(292, 232, e)), px = Math.round(lerp(308, 254, e));
  R.actor(EL.judyJM, jx, 154, t, { dir: -1, anda: e < 1, sorpresa: e >= 1 && !moja || (moja && t < trueno + 0.5), dedo: e >= 1 && t < he(11.25), triste: moja && t > trueno + 0.5 });
  R.actor(EL.peterJM, px, 154, t, { dir: -1, anda: e < 1, sorpresa: e >= 1 && !golpe && t < trueno + 0.5, brazos: golpe || (moja && t > trueno + 0.3), enfado: golpe, salto: moja && t < trueno + 0.3 ? 2 : 0 });
  if (bt > 0 && bt < 1) platano(Math.round(lerp(40, px + 7, bt)), Math.round(lerp(54, 128, bt) - Math.sin(bt * Math.PI) * 30), t * 16);
  else if (bt >= 1 && t < he(12.3)) platano(px + 12 + Math.round(tramo(t, he(11.85), he(12.3)) * 8), Math.round(128 + tramo(t, he(11.85), he(12.3)) ** 2 * 24), 0.4);
  T.casaJuegoDelante(R, t, o);
  if (ll > 0) lluvia(t, ll, true, 154);
  flash(0.75 * (1 - tramo(t, trueno, trueno + 0.22)) * (t >= trueno ? 1 : 0));
};

// 4 · el pasillo: el monzón y la estampida
const pasa = he(14.05), queda = he(16.5);
const paraguas = (x, y, vuelto) => { const top = y - 15; R.linea(x, y, x, top + 2, K); R.linea(x + 1, y, x + 1, top + 2, G[2]); R.pset(x - 1, y + 1, K); R.pset(x - 2, y, K);
  for (let i = -13; i <= 13; i++) { const h = Math.round(8 * Math.sqrt(Math.max(0, 1 - (i * i) / 170))), ya = vuelto ? top - 6 : top + 2 - h, yb = vuelto ? top - 6 + h : top + 2;
    for (let y2 = ya; y2 <= yb; y2++) R.pset(x + i, y2, y2 === (vuelto ? yb : ya) || Math.abs(i) === 13 || y2 === (vuelto ? ya : yb) ? K : ((i + 13) % 9 < 5 ? ROJO : ROJO2)); }
  R.pset(x, top - 7, K); };
const p4 = (t) => {
  const es = tramo(t, pasa, queda), o = { encuadre: 'pasillo', estampida: es }; T.casaJuego(R, t, o);
  const f = 1 - 0.45 * tramo(t, queda, P5 + 0.4); lluvia(t, f, false, 150);
  // el agua que corre por la tarima
  for (let k = 0; k < 26; k++) { const h1 = (k * 0.6180339) % 1, x = Math.round(((h1 * 400 + t * (30 + (k % 4) * 12)) % 380) - 30), y = 170 + (k % 5) * 2; R.linea(x, y, x + 6 + (k % 3) * 3, y, k % 2 ? G[4] : G[3]); }
  const vuelto = es > 0.3, tras = t > queda, tiembla = es > 0.05 && es < 0.95 ? Math.floor(t * 16) % 2 : 0;
  R.actor(EL.judyJM, 52, 150 - tiembla, t, { dir: es < 0.45 ? -1 : 1, sorpresa: es > 0.02 && !tras, triste: tras, dedo: t > queda + 0.35 });
  const pe = R.actor(EL.peterJM, 69, 150 - (1 - tiembla) * (es > 0.05 && es < 0.95 ? 1 : 0), t, { dir: -1, sostiene: [68, 131], sorpresa: es > 0.02 && !tras, triste: tras });
  paraguas(pe.mano[0], pe.mano[1], vuelto);
  if (vuelto && es < 0.42) for (const d of [-1, 1]) destello(pe.mano[0] + d * 10, pe.mano[1] - 22, 2, BL);
  T.casaJuegoDelante(R, t, o);
  lluvia(t, f, true, 150);
  if (t > queda + 0.35) icono('!', 196, 76 - Math.round(Math.abs(Math.sin(t * 7)) * 2), ORO, 2);
};

// 5 · la regla: hasta que alguien llegue al final
const llegada = he(19.3), rueda = di(20.3), bn = di(21.0);
const RESTOS = [[58, 52, 0], [252, 66, 1], [72, 148, 0], [246, 88, 2], [124, 172, 1], [42, 152, 2], [228, 26, 0], [118, 28, 2], [64, 118, 1], [242, 148, 0]];
const resto = (x, y, tipo, s, an) => { if (s < 0.15) return;
  if (tipo === 0) { const c = Math.cos(an), q = Math.sin(an), pt = (a, b) => [Math.round(x + (a * c - b * q) * s), Math.round(y + (a * q + b * c) * s)]; R.poligono([pt(-9, 0), pt(-3, -5), pt(5, -4), pt(10, 0), pt(5, 4), pt(-3, 5)], K); R.poligono([pt(-7, 0), pt(-3, -4), pt(4, -3), pt(8, 0), pt(4, 3), pt(-3, 4)], G[2]); R.linea(...pt(-7, 0), ...pt(8, 0), G[0]); R.linea(...pt(-2, 0), ...pt(1, -3), G[0]); R.linea(...pt(2, 0), ...pt(5, 2), G[0]); R.linea(...pt(-3, -3), ...pt(3, -3), G[4]); }
  else if (tipo === 1) { for (let d = -5; d <= 5; d++) { const a = d * s, b = (d * d) * 0.16 * s, px = Math.round(x + Math.cos(an) * a - Math.sin(an) * b), py = Math.round(y + Math.sin(an) * a + Math.cos(an) * b); R.rect(px - 1, py - 1, px + 1, py + 1, K); } for (let d = -5; d <= 5; d++) { const a = d * s, b = (d * d) * 0.16 * s, px = Math.round(x + Math.cos(an) * a - Math.sin(an) * b), py = Math.round(y + Math.sin(an) * a + Math.cos(an) * b); R.pset(px, py, Math.abs(d) === 5 ? G[1] : G[4]); R.pset(px, py + 1, G[3]); } }
  else { for (let j = -3; j <= 3; j++) { const w = Math.round(9 * s * Math.sqrt(1 - (j * j) / 10)); for (let i = -w; i <= w; i++) R.pset(Math.round(x) + i, Math.round(y + j * s), Math.abs(i) === w || Math.abs(j) === 3 ? G[1] : G[3]); } R.linea(Math.round(x - 4 * s), Math.round(y - 1), Math.round(x + 1 * s), Math.round(y - 1), G[4]); const u = (an * 0.3 + x) % 1; R.pset(Math.round(x + (u - 0.5) * 8 * s), Math.round(y + 1), G[4]); } };
const p5 = (t) => {
  const col = suave(tramo(t, llegada - 0.1, llegada + 0.4)) * (1 - suave(tramo(t, bn, di(21.9))));
  const o = { encuadre: 'tablero', color: col, tira: tramo(t, P5 + 0.05, P5 + 0.65), avance: lerp(0.86, 1, tramo(t, P5 + 0.75, llegada)) };
  const g = T.casaJuego(R, t, o), [mx, my] = g.gema ?? [158, 94];
  RESTOS.forEach(([x, y, tipo], k) => { const u = suave(tramo(t, llegada + 0.1 + k * 0.05, llegada + 0.75 + k * 0.05)), sw = Math.sin(u * Math.PI) * 22, dx = mx - x, dy = my - y, d = Math.hypot(dx, dy) || 1;
    resto(lerp(x, mx, u) - dy / d * sw, lerp(y, my, u) + dx / d * sw, tipo, 1.5 * (1 - u), (tipo === 2 ? t * 3 : k * 0.9 + Math.sin(t * 1.6 + k) * 0.12) + u * 7); });
  // la meta se enciende al llegar la ficha
  const ray = tramo(t, llegada, llegada + 0.5), apaga = tramo(t, llegada + 0.9, llegada + 1.5);
  if (ray > 0 && apaga < 1) for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6 + t * 0.8, r0 = 18 + apaga * 14, r1 = 18 + ray * (k % 2 ? 22 : 14); if (r1 > r0) R.linea(Math.round(mx + Math.cos(an) * r0), Math.round(my + Math.sin(an) * r0), Math.round(mx + Math.cos(an) * r1), Math.round(my + Math.sin(an) * r1), k % 2 ? ORO : BL); }
  // la barrita de lápiz entra rodando por la tarima
  const rr = suave(tramo(t, rueda, rueda + 0.6)); if (rr > 0) { const bx = Math.round(lerp(340, 214, rr)); for (let i = 0; i < 9; i++) if ((i + Math.floor(t * 10)) % 3 && rr < 1) R.pset(bx + 16 + i * 4, 176 - (i % 2), G[0]); P.lapizConte(R, bx + 10, 177, { s: 2 }); }
  T.casaJuegoDelante(R, t, o);
};

// 6 · dibujado a lápiz: parece la foto de algo imposible
const frota = di(24.0), cuida = di(25.3), fuera = di(26.1), foto = di(27.26), impos = di(27.95);
const p6 = (t) => {
  const rn = tramo(t, P6 + 0.25, frota - 0.15), le = tramo(t, impos, di(29.0));
  const o = { encuadre: 'salon', lluvia: lerp(0.55, 1, tramo(t, P6, foto)), plantas: 1 }; if (rn > 0) o.rino = rn; if (le > 0) o.leon = le;
  T.casaJuego(R, t, o); T.casaJuegoDelante(R, t, o);
  // la sombra difuminada bajo el rinoceronte y el polvo de la barrita
  const df = tramo(t, frota, cuida - 0.2);
  if (df > 0) for (let j = 161; j <= 165; j++) for (let i = 74; i <= 152; i++) if ((i + j) % 2 === 0 && ((i * 13 + j * 7) % 16) / 16 < df * 0.8) R.pset(i, j, G[j === 161 ? 0 : 1]);
  if (df > 0 && t < cuida + 0.5) for (let k = 0; k < 16; k++) { const u = ((t - frota) * 0.8 + k * 0.0625) % 1, x = Math.round(112 + Math.sin(k * 2.1) * 16 - u * 22), y = Math.round(160 - u * 30 + Math.sin(u * 6 + k) * 3); R.pset(x, y, k % 3 ? G[1] : G[0]); if (k % 4 === 0) R.pset(x + 1, y, G[0]); }
  if (le > 0 && le < 1) for (let k = 0; k < 6; k++) if (Math.floor(t * 9 + k) % 2) destello(178 + ((k * 17) % 44), 70 + ((k * 11) % 26), 2, BL);
  // la mano: dibuja el rinoceronte en zigzag, difumina con el dedo, da los últimos toques con cuidado y se va
  const dab = Math.floor(t * 5) % 2, ab = suave(tramo(t, frota - 0.15, frota + 0.1)), bc = suave(tramo(t, cuida - 0.3, cuida)), cd = suave(tramo(t, fuera, fuera + 0.8));
  const A = [lerp(74, 152, rn) + 27, 139 + Math.sin(rn * Math.PI * 7) * 17 - 12], B = [126 + Math.sin(t * 10) * 9, 160 + Math.cos(t * 10) * 1.5], C = [130 + 27 + dab, 139 - dab * 2], D = [232, 222];
  const wx = Math.round(lerp(lerp(lerp(A[0], B[0], ab), C[0], bc), D[0], cd)), wy = Math.round(lerp(lerp(lerp(A[1], B[1], ab), C[1], bc), D[1], cd));
  if (cd < 1 && t > P6 + 0.05) { if (ab < 0.5 || bc > 0.5) P.lapizConte(R, wx - 15, wy + 12, { s: 2 }); T.brazo(R, wx + 40, wy + 58, wx, wy, VERDE, -1, { codo: [wx + 29, wy + 24] }); }
  flash(0.85 * (1 - tramo(t, foto, foto + 0.3)) * (t >= foto ? 1 : 0));
};

// 7 · devuelven la caja al parque
const suelta = di(32.3);
const p7 = (t) => {
  const dej = t >= suelta, o = { encuadre: 'parque', caja: dej }; T.casaJuego(R, t, o);
  const u = tramo(t, P7 + 0.05, suelta - 0.2), hu = suave(tramo(t, suelta + 0.2, P8 + 0.1));
  const px = Math.round(lerp(-8, 150, u) - hu * 46), jx = Math.round(lerp(-40, 120, u) - hu * 52), corre = (u > 0 && u < 1) || hu > 0;
  const baja = tramo(t, suelta - 0.2, suelta);
  R.actor(EL.judyJM, jx, 152, t + 0.2, { dir: hu > 0 ? -1 : 1, anda: corre, sonrisa: dej, dedo: !dej && u > 0.55 });
  const pe = R.actor(EL.peterJM, px, 152, t, { dir: hu > 0 ? -1 : 1, anda: corre, sostiene: dej ? undefined : [px + 21, Math.round(lerp(136, 141, baja))], sonrisa: dej });
  if (!dej) cajaGris(pe.mano[0] + 14, pe.mano[1] + Math.round(lerp(9, 12, baja)));
  if (dej && t < suelta + 0.3) for (const d of [-1, 1]) for (let k = 0; k < 3; k++) R.pset(190 + d * (18 + k * 2 + Math.round((t - suelta) * 20)), 152 - k, G[4]);
  T.casaJuegoDelante(R, t, o);
};

// 8 · desde la ventana: dos chicos se la llevan (figuritas en color sobre las del decorado, recortadas al hueco)
const SENDA = [[92, 128], [116, 119], [140, 112], [164, 105], [196, 97], [226, 92]];
const enSenda = (u) => { u = Math.max(0, Math.min(1, u)); const v = u * 5, i = Math.min(4, Math.floor(v)), f = v - i; return [lerp(SENDA[i][0], SENDA[i + 1][0], f), lerp(SENDA[i][1], SENDA[i + 1][1], f)]; };
const figurita = (x, y, al, ropa, gorra, fase, t, lleva) => { const paso = Math.floor(t * 7 + fase) % 2; x = Math.round(x); y = Math.round(y) - paso;
  const big = al > 10, hw = big ? 2 : 1, hc = big ? 5 : 4, hb = big ? 5 : 3, hl = Math.max(2, al - hc - hb), pts = [], PANT = hex('#3a4a8a'), PIEL = hex('#f6c290');
  for (let d = 0; d < hl; d++) { const pie = d < 2 ? 1 : 0; for (let w = 0; w < (big ? 2 : 1); w++) { pts.push([-1 - w - (paso ? pie : -pie * 0), -d, d === 0 ? K : PANT]); pts.push([1 + w + (paso ? 0 : pie), -d, d === 0 ? K : PANT]); } }
  for (let d = hl; d < hl + hb; d++) for (let i = -hw; i <= hw; i++) pts.push([i, -d, i === -hw ? mez(ropa, K, 0.25) : ropa]);
  pts.push([hw + 1, -hl - hb + 2, PIEL]);
  for (let d = hl + hb; d < hl + hb + hc; d++) { const top = d === hl + hb + hc - 1; for (let i = -hw + (top ? 1 : 0); i <= hw - (top ? 1 : 0); i++) pts.push([i, -d, d >= hl + hb + hc - 2 ? gorra : i === hw - 1 && d === hl + hb + 1 + (big ? 1 : 0) ? K : PIEL]); }
  pts.push([hw + 1, -(hl + hb + hc - 2), gorra]);
  if (lleva) { const bw = big ? 8 : 5, bh = big ? 5 : 3; for (let j = 0; j < bh; j++) for (let i = 0; i < bw; i++) pts.push([hw + 2 + i, -hl - 1 - j, j === bh - 1 ? hex('#f4d898') : i === bw - 1 ? hex('#8a5a2a') : j === Math.floor(bh / 2) && i === Math.floor(bw / 2) ? hex('#ffd84a') : hex('#c8924a')]); }
  const px = (i, j, c) => { const X = x + i, Y = y + j; if (X > 77 && X < 243 && Y > 29 && Y < 131 && Math.abs(X - 160) > 2) R.pset(X, Y, c); };
  for (const [i, j] of pts) { px(i - 1, j, K); px(i + 1, j, K); px(i, j - 1, K); px(i, j + 1, K); }
  for (const [i, j, c] of pts) px(i, j, c);
  for (let k = 1; k <= 3; k++) if ((Math.floor(t * 8) + k) % 2) px(-hw - 2 - k * 3, -k % 2, hex('#ecece8')); };
const dos = di(34.96), conoce = di(35.98);
const p8 = (t) => {
  const ch = lerp(0.1, 0.97, tramo(t, P8 + 0.1, di(36.45))), o = { encuadre: 'ventana', chicos: ch }; T.casaJuego(R, t, o);
  for (const [k, ret, ropa, gorra] of [[1, 0.07, hex('#f0c030'), hex('#1c1424')], [0, 0, hex('#f2f2ee'), hex('#d8303a')]]) { const uu = ch - ret + 0.07, [x, y] = enSenda(uu); figurita(x + (k ? -4 : 0), y, Math.round(lerp(14, 8, Math.max(0, Math.min(1, uu)))), ropa, gorra, k * 2, t, k === 0); }
  const sube = 1 - tramo(t, P8, P8 + 0.3);
  R.actor(EL.judyJM, 84, 135, t, { dir: 1, salto: Math.round(Math.sin(sube * Math.PI) * 3), sorpresa: t > di(34.3) && t < conoce, sonrisa: t >= conoce, sostiene: t < dos ? [100, 121] : undefined });
  R.actor(EL.peterJM, 100, 135, t, { dir: t > conoce + 0.15 ? -1 : 1, dedo: t >= dos && t < conoce + 0.15, sorpresa: t > di(34.3) && t < conoce, sonrisa: t >= conoce, habla: t > conoce + 0.15 && Math.sin(t * 9) > 0 });
  T.casaJuegoDelante(R, t, o);
};

// 9 · el folleto de instrucciones, en el suelo
const nunca = di(38.52);
const p9 = (t) => {
  const o = { encuadre: 'ventana', camara: 'folleto', pasos: tramo(t, P9 + 0.05, di(38.0)) }; T.casaJuego(R, t, o);
  // una hoja que cae y se posa en la hierba, junto al folleto
  const c = tramo(t, P9 + 0.6, nunca + 0.3), hx = lerp(196, 250, c) + Math.sin(c * 9) * 8, hy = lerp(-8, 124, c);
  resto(hx, hy, 0, 1.4, c < 1 ? Math.sin(c * 12) * 0.8 : 0.3);
  T.casaJuegoDelante(R, t, o);
  const e = tramo(t, nunca, nunca + 0.18); if (e > 0) icono('!', 154, 58 - Math.round(Math.abs(Math.sin(t * 6)) * 3) - (e < 1 ? 4 : 0), ORO, 3);
};

const efectos = [[ve, 'pop'], [tira + 0.5, 'golpecito'], [nota + 0.6, 'brillo'], [he(11.0), 'boing'], [he(11.85), 'toc'], [trueno, 'trueno'], [P4 + 0.1, 'lluvia'], [pasa + 0.5, 'boom'], [queda + 0.4, 'chof'],
  [P5 + 0.55, 'golpecito'], [llegada + 0.05, 'brillo'], [rueda + 0.3, 'toc'], [P6 + 0.3, 'lapiz'], [frota + 0.1, 'rafaga'], [foto, 'flash'], [suelta, 'golpecito'], [dos, 'pop'], [P9 + 0.5, 'whoosh'], [nunca, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año: 1981 });
''')
