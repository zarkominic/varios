E = {}

E['jm-medalla'] = ('La medalla y la carta', '''// JM-MEDALLA (frases «medalla» y «senora»), 1981–1986. Sin cartela. Seis planos:
// 1. la sala de premios: Van Allsburg cruza el escenario mientras la bibliotecaria del jurado habla en el atril; con «1982» la sala
//    rompe a aplaudir y ella sale del atril con la medalla en la mano; él da un salto (corta en «Caldecott»);
// 2. de cerca, sobre el terciopelo: la medalla cae y se posa en el libro («Medal»), salen tres estrellas («the most
//    important award»), confeti y un destello de cámara; con «Four years later» el calendario pasa a 1986 y entra el
//    segundo libro con su medalla (corta en «won it again»);
// 3. la mesa con sus cuatro libros, desde arriba: una mano lleva la lupa hasta el tren en la nieve («a train»; nieva y
//    la locomotora echa vapor) y, con «Christmas Eve», la baja a la esquina: el perro blanco, otra vez (gag 2);
// 4. la cocina de la señora (1983): lee el libro junto a la nevera y del libro brota una hojita («took on a life of its
//    own»); va a la mesa, deja el libro y escribe la carta («a woman who was expecting a baby»): un «?» sobre su cabeza;
// 5. la carta desde arriba, con el sonajero al lado: la mano entra con la pluma y traza el «?» («what Jumanji meant»);
// 6. la meta del tablero, a lápiz: un «?» encima que se deshace en polvo con «nothing»; el disco se empaña, deja ver una
//    hoja y, con «jungle», vuelve el color, baja una liana y brotan hojas por los bordes.''', r'''
const a = (s) => en('medalla', (s - 0.9) / 16.67), b = (s) => en('senora', (s - 18.575) / 13.711);   // el segundo de cada palabra inglesa
const P2 = a(5.4), P3 = a(12.19), P4 = b(18.575) - 0.05, P5 = b(24.4), P6 = b(28.53);
const sua = (u) => u * u * (3 - 2 * u);
const K = hex('#14121c'), P = T.PIEZAS_JM;
const hh = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, f) => { const r = (c) => c & 255, g = (c) => (c >>> 8) & 255, bl = (c) => (c >>> 16) & 255; return (0xff000000 | (Math.round(bl(c1) + (bl(c2) - bl(c1)) * f) << 16) | (Math.round(g(c1) + (g(c2) - g(c1)) * f) << 8) | Math.round(r(c1) + (r(c2) - r(c1)) * f)) >>> 0; };
const estrella = (cx, cy, r, c) => { const pts = []; for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.45 : r; pts.push([Math.round(cx + Math.cos(an) * q), Math.round(cy + Math.sin(an) * q)]); } R.poligono(pts, c); };
const CONF = ['#f0c030', '#e83a34', '#3a8ad0', '#f2f2ee', '#3aa85a'].map(hex);
const confeti = (t, t0, x0, x1, y0, y1, n) => { if (t < t0) return; for (let k = 0; k < n; k++) { const v = 16 + hh(k, 3) * 14, rec = (t - t0) * v - hh(k, 5) * (y1 - y0); if (rec < 0) continue; const y = y0 + rec % (y1 - y0), x = x0 + hh(k, 1) * (x1 - x0) + Math.sin(t * 3 + k) * 3, c = CONF[k % 5]; if ((x > 272 && y < 50) || (x < 172 && y < 22)) continue; R.pset(Math.round(x), Math.round(y), c); if (Math.sin(t * 9 + k * 2) > 0) R.pset(Math.round(x) + 1, Math.round(y), c); else R.pset(Math.round(x), Math.round(y) + 1, c); } };
const BIBLIO = { H: hex('#a8a8b2'), h: hex('#c8c8d0'), C: hex('#7a3a5a'), c: hex('#5a2a44') };   // la bibliotecaria del jurado que entrega la medalla (no hay un presentador en el reparto)
const SEG = (t) => tramo(t, a(10.53), a(12.0));

// 1. la sala de premios
const p1 = (t) => {
  const ap = tramo(t, a(3.5), a(4.3));
  const o = { encuadre: 'premios', aplauso: ap };
  const g = T.editorial(R, t, o), s = g.suelo;
  const ev = tramo(t, 0.1, a(3.0)), vx = Math.round(lerp(60, 136, ev)), llega = ev >= 1;
  const sale = sua(tramo(t, a(4.0), a(4.95))), lx = Math.round(lerp(93, 116, sale)), dando = t > a(3.9);
  const L = R.actor(EL.guionista2JM, lx, s, t, { pal: BIBLIO, dir: 1, anda: sale > 0 && sale < 1, habla: !dando && Math.sin(t * 8) > 0, dedo: !dando && t > 0.6 && Math.floor(t * 0.9) % 2 === 0, sonrisa: dando, sostiene: dando ? [lx + 20, s - 15 - Math.round(sua(tramo(t, a(4.9), a(5.3))) * 3)] : undefined });
  if (dando) { const [mx, my] = L.mano, bal = Math.round(Math.sin(t * 5) * 1.2);   // la medalla, colgando de su cinta
    R.linea(mx, my + 1, mx - 1 + bal, my + 6, hex('#3a6ab0')); R.linea(mx + 1, my + 1, mx + 1 + bal, my + 6, hex('#f2f2ee')); R.disco(mx + bal, my + 9, 3.6, K); R.disco(mx + bal, my + 9, 2.6, hex('#f0c030')); R.pset(mx - 1 + bal, my + 8, hex('#fff6a0')); R.pset(mx + 1 + bal, my + 10, hex('#b8862a'));
    if (Math.sin(t * 9) > 0.5) { R.pset(mx + 5 + bal, my + 5, hex('#ffffff')); R.pset(mx - 5 + bal, my + 12, hex('#fff6a0')); } }
  R.actor(EL.vanallsburg, vx, s, t, { dir: llega && dando ? -1 : 1, anda: !llega, sorpresa: llega && t > a(3.5) && t < a(4.4), sonrisa: t >= a(4.4), salto: Math.round(Math.max(0, Math.sin((t - a(5.0)) * 10)) * 4 * tramo(t, a(5.0), a(5.05))) });
  confeti(t, a(4.6), 60, 240, 26, 120, 26);
  T.editorialDelante(R, t, o);
};

// 2. la medalla se posa en el libro; cuatro años después, otra
const p2 = (t) => {
  const o = { encuadre: 'premios', camara: 'medalla', medalla: tramo(t, P2 + 0.2, a(6.25)), segunda: SEG(t) };
  T.editorial(R, t, o);
  // tres estrellas sobre el libro: «the most important award»
  [[84, a(6.9)], [112, a(7.35)], [140, a(7.8)]].forEach(([x, t0], k) => { const u = tramo(t, t0, t0 + 0.25); if (u <= 0) return; const r = Math.round(2 + u * 5 + (u >= 1 && Math.sin(t * 5 + k * 2) > 0.6 ? 1 : 0)), y = 60 - Math.round(Math.sin(u * Math.PI) * 4) - (k === 1 ? 3 : 0);
    estrella(x, y + 1, r + 2, K); estrella(x, y, r, hex('#f0c030')); estrella(x - 1, y - 1, Math.max(1, r - 3), hex('#ffe890')); R.pset(x - 2, y - 2, hex('#ffffff')); });
  confeti(t, P2 - 6, 4, 316, 16, 172, 34);
  // el destello de un fotógrafo
  { const f = t - a(8.3); if (f > 0 && f < 0.16) for (let y = 0; y < 180; y++) for (let x = (y & 1); x < 320; x += 2) R.pset(x, y, mez(R.pget(x, y), hex('#ffffff'), 0.55 * (1 - f / 0.16))); }
  T.editorialDelante(R, t, o);
};

// 3. el libro del tren en la nieve, bajo la lupa; y en su esquina, el perro
const p3 = (t) => {
  const va = sua(tramo(t, P3 + 0.25, a(14.15))), vb = sua(tramo(t, a(16.15), a(16.95)));
  const lx = Math.round(lerp(lerp(292, 52, va), 73, vb) + (va >= 1 && vb === 0 ? Math.sin(t * 2.3) * 2 : 0)), ly = Math.round(lerp(lerp(126, 62, va), 82, vb) - Math.sin(va * Math.PI) * 10 + (va >= 1 && vb === 0 ? Math.cos(t * 1.7) * 1.5 : 0));
  const o = { encuadre: 'esquinas', lupa: [lx, ly] };
  T.editorial(R, t, o);
  // nieva en la lámina del tren y la locomotora echa vapor (fuera del cristal de la lupa)
  const fuera = (x, y) => Math.hypot(x - lx, y - ly) > 19 && !(x - lx > 6 && y - ly > 6 && Math.abs((x - lx) - (y - ly)) < 5);
  for (let k = 0; k < 16; k++) { const x = 29 + Math.round(hh(k, 2) * 49 + Math.sin(t * 1.5 + k) * 2), y = 33 + Math.round((t * (9 + hh(k, 4) * 8) + hh(k, 6) * 54) % 54); if (x >= 29 && x <= 78 && fuera(x, y)) R.pset(x, y, hex('#ffffff')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1, x = Math.round(52 - u * 12 + Math.sin(u * 5 + k) * 2), y = Math.round(56 - u * 14); if (y > 33 && x > 29 && fuera(x, y)) { R.pset(x, y, hex('#e8ecf4')); if (u > 0.3) R.pset(x + 1, y, hex('#c8d0e0')); if (u > 0.6) R.pset(x, y - 1, hex('#c8d0e0')); } }
  // la mano que lleva la lupa por el mango
  const wx = lx + 28, wy = ly + 25;
  T.brazo(R, wx + 31, wy + 32, wx, wy, '#6a4a34', -1, { codo: [wx + 22, wy + 13] });
  // lo encontró: el perro
  { const u = tramo(t, a(16.95), a(17.15)); if (u > 0) { const y = ly - 34 - Math.round(Math.sin(Math.min(1, u) * Math.PI) * 3) + (Math.sin(t * 6) > 0 ? 0 : 1); R.icono('!', lx - 4, y, hex('#e83a34'), K, 2); } }
  T.editorialDelante(R, t, o);
};

// 4. la cocina de la señora: lee, va a la mesa y escribe
const p4 = (t) => {
  const o = { encuadre: 'carta', carta: false };   // la carta y el libro los pone ella al llegar a la mesa
  T.editorial(R, t, o);
  const anda = tramo(t, b(20.5), b(22.4)), ua = sua(anda), andando = anda > 0 && anda < 1, lee = anda === 0, escribe = anda >= 1;
  const sx = Math.round(lerp(258, 134, ua)), sy = Math.round(ua < 0.42 ? lerp(160, 146, ua / 0.42) : 146);
  T.gato(R, 300, 162, t, { dir: -1 });
  const pluma = Math.round(Math.sin(t * 9) * 1.6);
  const S = R.actor(EL.senoraJM, sx, sy, t, { dir: escribe ? 1 : -1, anda: andando, sonrisa: lee || t > b(23.4), sostiene: lee ? [sx - 4, sy - 13] : andando ? [sx - 3, sy - 8] : [sx + 16 + (t > b(22.7) && t < b(23.9) ? pluma : 0), 137] });
  const [mx, my] = S.mano;
  if (lee) {   // el libro abierto en la mano, y la hojita que le brota: la palabra cobra vida
    const br = Math.sin(Math.PI * tramo(t, b(18.85), b(20.45))), bx = mx - 11, by = my + 8;
    if (br > 0.02 && P.hojaSelva) { R.recorte([bx - 14, by - 40, bx + 14, by - 17]); P.hojaSelva(R, bx + 2, by - 17 + Math.round((1 - br) * 19), { t }); R.recorte(null);
      for (let k = 0; k < 4; k++) if (Math.sin(t * 7 + k * 2.1) > 0.3) R.pset(bx - 10 + k * 7, by - 22 - Math.round(br * 12) + (k % 2) * 5, hex('#fff6a0')); }
    if (P.libroFino) P.libroFino(R, bx, by, {});
  } else if (andando) { if (P.libroFino) P.libroFino(R, mx - 9, my + 10, {}); }
  else {   // el libro, ya en la mesa; la pluma en la mano
    R.linea(mx, my + 1, mx - 3, my - 6, hex('#22306a')); R.pset(mx - 3, my - 7, hex('#e8e8f0'));
  }
  // el «?» que le ronda la cabeza
  { const u = tramo(t, b(23.35), b(23.6)); if (u > 0) { const cx = sx + 24, cy = sy - 40 - Math.round(Math.sin(t * 2.4) * 1.5), r = Math.round(3 + u * 6);
    R.disco(sx + 15, sy - 27, 1.6, K); R.disco(sx + 15, sy - 27, 0.8, hex('#fbf8ee')); R.disco(sx + 18, sy - 31, 2.6, K); R.disco(sx + 18, sy - 31, 1.7, hex('#fbf8ee'));
    R.disco(cx, cy, r + 1.2, K); R.disco(cx, cy, r, hex('#fbf8ee')); if (u >= 1) R.icono('?', cx - 2, cy - 4, hex('#22306a'), hex('#b8b8d0'), 1); } }
  T.editorialDelante(R, t, o);
  if (escribe) {   // sobre el mantel: la carta que escribe y, al lado, el libro tumbado
    R.rect(150, 137, 162, 140, K); R.rect(151, 138, 161, 139, hex('#fbf8ee')); for (let i = 0; i < Math.round(tramo(t, b(22.7), b(23.9)) * 4); i++) R.rect(152 + i * 2, 139, 152 + i * 2, 139, hex('#22306a'));
    R.rect(165, 134, 190, 140, K); R.rect(166, 135, 189, 139, hex('#f2f2ee')); R.rect(166, 135, 168, 139, hex('#3a8a4a')); R.rect(169, 135, 189, 135, hex('#ffffff')); R.rect(172, 137, 186, 137, hex('#8a8a92')); R.rect(169, 139, 189, 139, hex('#c8c8d0')); }
};

// 5. la carta, desde arriba: la mano traza el «?»
const PTS = []; for (let i = 0; i <= 40; i++) { const an = -Math.PI * 0.95 + i / 40 * Math.PI * 1.55; PTS.push([154 + Math.cos(an) * 15, 86 + Math.sin(an) * 13.5]); } for (let i = 1; i <= 10; i++) PTS.push([154 + (2.3 - i * 0.23) * 1.5, 92.6 + i * 1.35]);
const p5 = (t) => {
  const traza = tramo(t, b(26.55), b(27.9)), punto = tramo(t, b(28.0), b(28.12)), q = traza * 0.8 + punto * 0.2;
  const o = { encuadre: 'carta', camara: 'sobre', pregunta: q };
  T.editorial(R, t, o);
  const entra = sua(tramo(t, P5 + 0.15, b(25.3))), duda = t > b(25.3) && t < b(26.4);
  let tx, ty, alto = 0;
  if (traza <= 0) { const va = sua(tramo(t, b(26.2), b(26.55))); tx = lerp(lerp(238, 176, entra), PTS[0][0], va); ty = lerp(lerp(196, 132, entra), PTS[0][1], va); alto = duda ? Math.round(Math.abs(Math.sin(t * 6)) * 3) : 2; }
  else if (traza < 1) { const [x, y] = PTS[Math.floor(traza * 50)]; tx = x + 1; ty = y + 1; }
  else { const u = tramo(t, b(27.9), b(28.0)), w = tramo(t, b(28.2), b(28.5)); tx = lerp(PTS[50][0], 157, u) + w * 16; ty = lerp(PTS[50][1], 116, u) + w * 10; alto = Math.round(Math.sin(u * Math.PI) * 4 + w * 3); }
  tx = Math.round(tx); ty = Math.round(ty) - alto;
  const wx = tx + 18, wy = ty - 7;
  for (const [d, c] of [[-2, K], [2, K], [-1, hex('#5a6ab0')], [0, hex('#22306a')], [1, hex('#1a2450')]]) R.linea(tx + 11 + d, ty - 11, tx + 21 + d, ty - 21, c); R.rect(tx + 20, ty - 23, tx + 23, ty - 21, K); R.pset(tx + 21, ty - 22, hex('#c8a040'));
  T.brazo(R, wx + 32, wy + 36, wx, wy, '#7a8ad0', -1, { codo: [wx + 25, wy + 15] });
  for (const [d, c] of [[-2, K], [2, K], [-1, hex('#5a6ab0')], [0, hex('#22306a')], [1, hex('#1a2450')]]) R.linea(tx + 3 + d, ty - 3, tx + 7 + d, ty - 7, c); R.linea(tx, ty, tx + 3, ty - 3, K); R.linea(tx + 1, ty, tx + 3, ty - 2, hex('#c8a040')); R.pset(tx, ty, K);
  T.editorialDelante(R, t, o);
};

// 6. «nada: solo sonaba a selva»
const INT = ['.###.', '#...#', '...#.', '..#..', '..#..', '.....', '..#..'];
const p6 = (t) => {
  const NADA = b(30.09), SELVA = b(31.55);
  const o = { encuadre: 'tablero', camara: 'gema', dentro: tramo(t, NADA + 0.15, SELVA), color: tramo(t, SELVA - 0.25, SELVA + 0.7) };
  T.casaJuego(R, t, o);
  // el «?» sobre el disco, que con «nothing» se deshace en polvo
  { const s = 6, x0 = 160 - 15, y0 = 96 - 22 + Math.round(Math.sin(t * 3) * 2), dt = t - NADA, pop = tramo(t, P6 + 0.1, P6 + 0.35);
    if (dt < 1.1 && pop > 0) INT.forEach((f, j) => { for (let i = 0; i < 5; i++) { if (f[i] !== '#') continue; let x = x0 + i * s, y = y0 + j * s, z = s - 1;
      if (dt > 0) { const k = i + j * 5; x += (i - 2 + (hh(k, 1) - 0.5) * 2) * 12 * dt; y += -26 * dt * hh(k, 2) + 62 * dt * dt; z = dt > 0.9 ? 1 : dt > 0.65 ? 2 : dt > 0.3 ? 3 : 4; }
      x = Math.round(x); y = Math.round(y); if (dt <= 0) { R.rect(x - 1, y - 1, x + z + 2, y + z + 3, K); } R.rect(x, y, x + z, y + z, dt > 0 && (i + j) % 2 ? hex('#c8a040') : hex('#f0c030')); if (dt <= 0) R.rect(x, y, x + z, y, hex('#fff6a0')); } }); }
  // la selva: una liana baja del techo y brotan hojas por los bordes
  { const gsel = sua(tramo(t, SELVA - 0.1, SELVA + 0.9));
    if (gsel > 0) { if (P.liana) P.liana(R, 228, 0, { largo: Math.round(4 + gsel * 74), t }); if (P.liana) P.liana(R, 196, 0, { largo: Math.round(4 + gsel * 30), t: t + 1 });
      if (P.hojaSelva) for (const [x, y, d, dx, dy, k] of [[34, 178, 1, -30, 26, 0], [84, 184, -1, 0, 40, 1], [246, 182, 1, 0, 40, 2], [296, 172, -1, 30, 22, 3], [14, 104, 1, -34, 0, 4], [306, 112, -1, 36, 0, 5]]) { const u = sua(tramo(gsel, k * 0.1, 0.5 + k * 0.1)); if (u > 0) P.hojaSelva(R, x + Math.round(dx * (1 - u)), y + Math.round(dy * (1 - u)), { s: 2, dir: d, t: t + k }); } } }
  T.casaJuegoDelante(R, t, o);
};
const año = (t) => t < a(3.52) ? 1981 : t < P3 ? 1982 + Math.min(4, Math.floor(SEG(t) * 8)) : t < P4 ? 1986 : 1983;
const efectos = [[a(3.6), 'publico'], [a(5.0), 'palmada'], [a(6.2), 'toc'], [a(6.9), 'brillo'], [a(8.3), 'flash'], [a(10.6), 'papel'], [a(11.9), 'toc'], [a(14.2), 'vapor'], [a(17.0), 'guau'],
  [b(19.0), 'brillo'], [b(22.8), 'lapiz'], [b(23.45), 'pop'], [b(26.6), 'lapiz'], [b(28.1), 'toc'], [b(30.1), 'pop'], [b(31.55), 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

E['jm-historia'] = ('De 32 páginas a 100 minutos', '''// JM-HISTORIA (frase «alan»), cartela «1995». Cinco planos:
// 1. un caballete de cerca (vista libre): una mano dibuja a lápiz una claqueta mientras el número cuenta de 1 a 14 a
//    la vez que el año de la barra (1981 → 1995); la claqueta se cierra («14 years»); un «!» rojo («a problem») y la
//    mano clava al lado el libro fino: 32 («A 32-page book»);
// 2. los dos relojes: el guionista señala el de 10 minutos («10 minutes»), se vuelve al de 100 («runs 100») y da un
//    salto cuando la película le pasa por los pies;
// 3. el despacho de guionistas: las fichas se van clavando en el corcho («Almost everything had to be invented»), uno
//    teclea y la otra encesta una bola en la papelera; entra Van Allsburg con una hoja («himself helped») y la lanza al
//    corcho: es la última ficha («out of it came…»);
// 4. NUESTRO tablero desde arriba, en 1969: un chico llega, mueve su ficha («A boy»), la meta se enciende y se lo
//    traga en espiral («swallows»); queda una hoja de selva en la alfombra;
// 5. el calendario arranca 26 hojas, de 1969 a 1995; la caja de la repisa tiembla y lo devuelve ya adulto, con la
//    misma gorra y barba («26 years later»).''', r'''
const h = (s) => en('alan', (s - 1.5) / 20.767);   // el segundo de cada palabra inglesa
const P2 = h(5.96), P3 = h(9.59), P4 = h(15.12), P5 = h(19.66);
const sua = (u) => u * u * (3 - 2 * u);
const K = hex('#14121c'), P = T.PIEZAS_JM;
const hh = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
// un personaje pintado aparte para poder girarlo y encogerlo (el remolino del juego)
const buf = R.nuevo();
const enBuf = (el, t, o) => { const prev = R.usar(buf); buf.fill(0); R.actor(el, 20, 70, t, o); R.usar(prev); };
const girado = (cx, cy, s, ang, halo) => { const c = Math.cos(ang), sn = Math.sin(ang), r = Math.ceil(26 * s);
  for (const pasada of halo ? [1, 0] : [0]) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const sx = Math.round(27.5 + (dx * c + dy * sn) / s), sy = Math.round(55 + (-dx * sn + dy * c) / s); if (sx < 8 || sx > 47 || sy < 28 || sy > 74) continue; const col = buf[sy * 320 + sx]; if (!col) continue; const X = Math.round(cx) + dx, Y = Math.round(cy) + dy;
    if (pasada) { for (const [i, j] of [[2, 0], [-2, 0], [0, 2], [0, -2], [1, 1], [-1, 1], [1, -1], [-1, -1]]) R.pset(X + i, Y + j, halo); } else R.pset(X, Y, col); } };
const ALAN = { J: hex('#e8b830'), j: hex('#f8d860'), C: hex('#d8642a'), c: hex('#b04c1c'), p: hex('#8a3a14'), H: hex('#8a4a22'), h: hex('#a8643a'), F: hex('#3e5a8a') };   // el chico inventado por el cine: gorra amarilla y jersey naranja, de niño y de adulto
const chispa = (x, y, c) => { R.pset(x, y, hex('#ffffff')); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); };

// 1. el caballete (vista libre): la claqueta a lápiz, 14 años, y el libro fino de 32 páginas
const GR = hex('#3a3a44'), GR2 = hex('#9a9aa2'), PAPEL = hex('#f2f0e8'), MANGA = '#6a4a34';
const p1 = (t) => {
  const o = { encuadre: 'clase', camara: 'caballete', trazo: 0 };
  T.taller(R, t, o);
  const rev = tramo(t, 1.35, h(2.3)), clac = tramo(t, h(2.92), h(3.02)), toma = Math.round(tramo(t, h(1.7), h(2.9)) * 14);
  // la claqueta, a lápiz: se va dibujando de izquierda a derecha y se cierra con «years»
  if (rev > 0) { R.recorte([127, 24, Math.round(127 + rev * 53), 92]);
    for (const y of [56, 57, 84, 85]) R.linea(130, y, 177, y, GR); for (const x of [130, 131, 176, 177]) R.linea(x, 56, x, 85, GR);
    R.linea(131, 66, 176, 66, GR); R.linea(146, 57, 146, 66, GR); R.linea(161, 57, 161, 66, GR); R.linea(136, 72, 170, 72, GR2); R.linea(136, 76, 162, 76, GR2); R.linea(136, 80, 168, 80, GR2);
    for (let y = 58; y < 84; y++) for (let x = 170 + ((y >> 1) & 1); x < 176; x += 2) if (y !== 66) R.pset(x, y, GR2);
    for (const [x, n] of [[138, 1], [153, 1]]) { R.linea(x, 59, x, 63, GR); R.pset(x - 1, 60, GR); }
    R.pset(167, 59, GR); R.linea(168, 59, 168, 63, GR); R.linea(170, 59, 172, 59, GR); R.linea(172, 59, 172, 63, GR); R.linea(170, 61, 172, 61, GR);   // «14» diminuto en su casilla
    const an = -(1 - clac) * 0.5 - (clac === 0 ? Math.sin(t * 2) * 0.03 : 0), ux = Math.cos(an), uy = Math.sin(an);
    for (let d = 0; d <= 47; d += 0.5) for (let q = 0; q <= 6; q += 0.5) { const x = Math.round(130 + ux * d + uy * q), y = Math.round(54 + uy * d - ux * q), borde = d < 1 || d > 46 || q < 1 || q > 5.4; R.pset(x, y, borde || (Math.floor((d + q) / 6) & 1) ? GR : PAPEL); }
    R.recorte(null); }
  if (clac > 0 && t < h(3.25)) for (const [i, j] of [[-6, -10], [4, -13], [-12, -3]]) R.linea(176 + i, 50 + j, 176 + Math.round(i * 1.6), 50 + Math.round(j * 1.6), GR);
  if (toma > 0) R.numero(String(toma), 153, 114 - (toma < 14 && Math.floor(t * 12) % 2 ? 1 : 0), { centro: true, tam: 16 });
  // «a problem»
  { const u = tramo(t, h(3.6), h(3.8)); if (u > 0) { const y = 40 - Math.round(Math.sin(u * Math.PI) * 4) + (t < h(4.4) && Math.sin(t * 14) > 0 ? 1 : 0); R.icono('!', 181, y - 12, hex('#d8303a'), hex('#e8b8b0'), 3); } }
  // el libro fino, sujeto con una chincheta: 32 páginas
  const trae = sua(tramo(t, h(4.3), h(4.9))), seVa = sua(tramo(t, h(5.2), h(5.75)));
  if (trae > 0) { const bx = 220 + Math.round((1 - trae) * 130), by = 88;
    if (P.libroFino) P.libroFino(R, bx, by, { s: 2 });
    if (trae >= 1) { R.disco(bx, by - 35, 2.6, K); R.disco(bx, by - 35, 1.7, hex('#d8303a')); R.pset(bx - 1, by - 36, hex('#ff9a9a')); const n = tramo(t, h(4.95), h(5.15)); if (n > 0) R.numero('32', 220, 114 - Math.round(Math.sin(n * Math.PI) * 3), { centro: true, tam: 16 }); }
    const wx = bx + 38 + Math.round(seVa * 110), wy = by - 20 + Math.round(seVa * 70);
    T.brazo(R, wx + 32, wy + 36, wx, wy, MANGA, -1, { codo: [wx + 25, wy + 15] }); }
  // la mano que dibuja la claqueta, y se retira
  { const fuera = sua(tramo(t, h(2.35), h(2.95))); if (fuera < 1) { const tx = Math.round(130 + rev * 47 + fuera * 150), ty = Math.round(70 + Math.sin(rev * 16) * 13 + fuera * 110), wx = tx + 18, wy = ty - 7;
    T.g_lapizGrande(R, tx + 23, ty - 23, tx, ty, { negro: true }); T.brazo(R, wx + 32, wy + 36, wx, wy, MANGA, -1, { codo: [wx + 25, wy + 15] }); } }
  T.tallerDelante(R, t, o);
};

// 2. diez minutos frente a cien
const p2 = (t) => {
  const o = { encuadre: 'guionistas', camara: 'relojes', diez: tramo(t, h(6.25), h(7.0)), cien: tramo(t, h(8.0), h(9.0)) };
  const g = T.keene(R, t, o), s = g.suelo ?? 162;
  const ent = tramo(t, P2, h(6.25)), gx = Math.round(lerp(172, 152, ent));
  R.actor(EL.guionista1JM, gx, s, t, { dir: t < h(7.45) ? -1 : 1, anda: ent < 1, dedo: t > h(6.3) && t < h(7.3), sorpresa: t > h(8.45), salto: Math.round(Math.sin(Math.PI * tramo(t, h(8.75), h(9.2))) * 8) });
  T.keeneDelante(R, t, o);
};

// 3. hubo que inventar casi todo
const p3 = (t) => {
  const LANZA = h(14.2), PIN = h(14.55), pin = t >= PIN ? 1 : 0;
  const o = { encuadre: 'guionistas', fichas: (17 * tramo(t, P3 + 0.2, h(13.3)) + pin) / 18 };
  const g = T.keene(R, t, o), [[x1, s1], [x2, s2], [x3, s3]] = g.puestos, F = Array.isArray(g.ficha) ? g.ficha : [221, 81];
  const ve = tramo(t, h(11.6), h(13.4)), vx = Math.round(lerp(306, x3, sua(ve))), llego = ve >= 1, lanzada = t >= LANZA;
  const V = ve > 0 ? R.actor(EL.vanallsburg, vx, s3, t, { dir: -1, anda: !llego, sonrisa: llego, habla: llego && !lanzada && Math.sin(t * 8) > 0, dedo: lanzada, sostiene: lanzada ? undefined : [vx - 4, s3 - 15] }) : null;
  const hoja = (x, y) => { R.rect(x - 4, y - 5, x + 4, y + 5, K); R.rect(x - 3, y - 4, x + 3, y + 4, hex('#fbf8ee')); R.rect(x - 1, y - 3, x + 1, y - 2, hex('#a83a34')); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#a83a34')); R.rect(x - 2, y + 2, x - 2, y + 3, hex('#a83a34')); R.rect(x + 2, y + 2, x + 2, y + 3, hex('#a83a34')); };
  // la bola de papel a la papelera
  const tira = tramo(t, h(10.3), h(10.85));
  R.actor(EL.guionista2JM, x2, s2, t, { dir: tira > 0 && t < h(11.5) ? 1 : -1, dedo: tira > 0 && tira < 1, sonrisa: (tira >= 1 && t < h(11.6)) || llego, brazos: pin && Math.floor(t * 6) % 2 === 0 });
  R.actor(EL.guionista1JM, x1, s1, t, { dir: 1, habla: t < h(11.4) && Math.sin(t * 7) > 0.2, dedo: t > h(12.6) && !pin && Math.floor(t * 1.2) % 2 === 0, sorpresa: pin && t < PIN + 0.4, brazos: pin && Math.floor(t * 6) % 2 === 1 });
  if (V && !lanzada) { const [mx, my] = V.mano; hoja(mx - 2, my - 4); }
  if (lanzada && !pin) { const u = tramo(t, LANZA, PIN), [mx, my] = [vx - 6, s3 - 19]; hoja(Math.round(lerp(mx, F[0] + 11, u)), Math.round(lerp(my, F[1] + 8, u) - Math.sin(u * Math.PI) * 14)); }
  if (pin && t < PIN + 0.5) { const u = (t - PIN) / 0.5; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.3; chispa(Math.round(F[0] + 11 + Math.cos(an) * (6 + u * 14)), Math.round(F[1] + 8 + Math.sin(an) * (5 + u * 10)), hex('#f0c030')); } }
  T.keeneDelante(R, t, o);
  if (tira > 0 && tira < 1) { const x = Math.round(lerp(x2 + 15, 268, tira)), y = Math.round(lerp(124, 136, tira) - Math.sin(tira * Math.PI) * 16); R.disco(x, y, 2.4, K); R.disco(x, y, 1.5, hex('#f2efe4')); R.pset(x, y + 1, hex('#b8b4a4')); }
};

// 4. el juego se traga al chico (1969)
const p4 = (t) => {
  const TR = h(17.3), FIN = h(18.5);
  const o = { encuadre: 'tablero', color: 1, avance: tramo(t, h(16.45), h(17.2)) * 0.09 };
  const g = T.casaJuego(R, t, o), [gx, gy] = Array.isArray(g.gema) ? g.gema : [158, 94];
  const entra = tramo(t, P4 + 0.05, h(16.2)), u = tramo(t, TR, FIN), bx = Math.round(lerp(326, 246, sua(entra))), by = 93;
  // la meta se enciende
  { const f = tramo(t, h(17.0), TR) * (1 - tramo(t, FIN + 0.5, FIN + 1.2)); if (f > 0) for (let k = 0; k < 3; k++) { const r = 13 + ((t * 14 + k * 9) % 27) * (u > 0 ? -1 : 1) + (u > 0 ? 27 : 0); R.anillo(gx, gy, r, k % 2 ? hex('#fff6a0') : hex('#f0c030'), 4); } }
  if (u <= 0) {
    for (let i = -6; i <= 6; i++) for (let j = -1; j <= 1; j++) if ((i + j) & 1 && Math.abs(i) + Math.abs(j) * 3 < 8) R.pset(bx + 7 + i, by + j, K);
    R.actor(EL.chico1JM, bx, by, t, { pal: ALAN, dir: -1, anda: entra > 0 && entra < 1, dedo: t > h(16.45) && t < h(17.05), sorpresa: t > h(17.05), brazos: t > TR - 0.12 });
  } else if (u < 1) {
    enBuf(EL.chico1JM, t, { pal: ALAN, dir: -1, sorpresa: true, brazos: true });
    const d0 = Math.hypot(253.5 - gx, 80 - gy), a0 = Math.atan2(80 - gy, 253.5 - gx), pos = (e) => { const r = d0 * (1 - e), an = a0 + e * Math.PI * 2.5; return [gx + Math.cos(an) * r, gy + Math.sin(an) * r]; };
    const e = u * u;
    for (let k = 0; k <= 60; k++) { const ek = e * k / 60, [x, y] = pos(ek), X = Math.round(x), Y = Math.round(y), viejo = (e - ek) > 0.45; if (viejo && k % 2) continue; R.rect(X, Y, X + 1, Y + 1, viejo ? hex('#c8962a') : hex('#f0c030')); if (!viejo) R.pset(X, Y - 1, hex('#fff6a0')); if ((k + Math.floor(t * 16)) % 7 === 0) chispa(X + 2, Y - 2, hex('#fff6a0')); }
    const [x, y] = pos(e); girado(x, y, (1 + 0.45 * Math.sin(Math.PI * Math.min(1, e * 1.6))) * (1 - 0.8 * e), e * Math.PI * 3, hex('#fff6a0'));
  }
  // el fogonazo y la onda; después, una hoja de selva sale de la meta y se posa donde estaba él
  { const f = tramo(t, FIN, FIN + 0.5); if (f > 0 && f < 1) { R.anillo(gx, gy, 12 + f * 70, hex('#fff6a0'), 2); R.anillo(gx, gy, 10 + f * 52, hex('#f0c030'), 4); if (f < 0.3) { R.disco(gx, gy, 9 - f * 20, hex('#ffffff')); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.linea(gx, gy, Math.round(gx + Math.cos(an) * 18), Math.round(gy + Math.sin(an) * 18), hex('#fff6a0')); } } }
    const v = tramo(t, FIN + 0.1, FIN + 0.9); if (v > 0 && P.hojaSelva) { const e = sua(v), x = Math.round(lerp(gx, 254, e) + Math.sin(v * 9) * 5 * (1 - v)), y = Math.round(lerp(gy + 8, 96, e) - Math.sin(v * Math.PI) * 22); if (v >= 1) for (let i = -6; i <= 6; i++) if (i & 1) R.pset(254 + i, 96, K); P.hojaSelva(R, x, y, { t: v < 1 ? t * 3 : t }); }
    if (t > FIN) for (let k = 0; k < 6; k++) { const an = t * 2 + k * 1.05, r = 20 + Math.sin(t * 3 + k) * 4; if (Math.sin(t * 5 + k * 2) > 0.2 && t < FIN + 1.0) chispa(Math.round(gx + Math.cos(an) * r), Math.round(gy + Math.sin(an) * r * 0.8), hex('#f0c030')); } }
  T.casaJuegoDelante(R, t, o);
};

// 5. veintiséis hojas después
const U5 = (t) => tramo(t, P5 + 0.15, h(21.5));
const p5 = (t) => {
  const u = U5(t);
  const o = { encuadre: 'calendario', de: 1969, a: 1995, u };
  T.cine(R, t, o);
  const SAL = h(21.6), CAE = h(22.4), v = tramo(t, SAL, CAE);
  // la caja de la repisa tiembla
  if (t > SAL - 0.7 && t < SAL + 0.2) { const z = Math.floor(t * 18) % 2; for (const d of [-1, 1]) { R.linea(62 + d * (20 + z * 2), 84, 62 + d * (24 + z * 2), 80, K); R.linea(62 + d * (21 + z * 2), 91, 62 + d * (26 + z * 2), 91, K); } chispa(62 + (z ? 6 : -8), 78 - z * 3, hex('#f0c030')); }
  if (v >= 1) { const dt = t - CAE;
    R.actor(EL.tecnicoFX2JM, 82, 164, t, { pal: ALAN, dir: 1, sorpresa: dt < 0.6, sonrisa: dt >= 0.6, brazos: dt >= 0.75 && Math.floor(t * 5) % 2 === 0, salto: Math.round(Math.abs(Math.sin(dt * 9)) * 6 * Math.max(0, 1 - dt * 1.8)) });
    if (P.hojaSelva) { const f = tramo(dt, 0, 1.1), x = Math.round(40 - f * 8 + Math.sin(dt * 6) * 5 * (1 - f)), y = Math.round(lerp(128, 168, f)); if (dt < 0.35) for (let k = 0; k < 6; k++) { const d = (k < 3 ? -1 : 1) * (6 + dt * 40 + (k % 3) * 3); R.disco(Math.round(89 + d), 163 - (k % 3), 1.5, hex('#e4dcc4')); } P.hojaSelva(R, x, y, { t: f < 1 ? t * 3 : 0 }); }
  } else if (v > 0) {
    enBuf(EL.tecnicoFX2JM, t, { pal: ALAN, dir: 1, sorpresa: true, brazos: true });
    const e = sua(v), x = lerp(62, 89.5, e) + Math.sin(Math.PI * e) * 30, y = lerp(88, 151, e) - Math.sin(Math.PI * e) * 26;
    for (let k = 1; k <= 10; k++) { const vk = v - k * 0.03; if (vk <= 0) break; const ek = sua(vk); chispa(Math.round(lerp(62, 89.5, ek) + Math.sin(Math.PI * ek) * 30), Math.round(lerp(88, 151, ek) - Math.sin(Math.PI * ek) * 26), k % 2 ? hex('#fff6a0') : hex('#3aa85a')); }
    girado(x, y, 0.2 + 0.8 * e, (1 - e) * Math.PI * 3, hex('#fff6a0'));
  }
  if (v > 0 && v < 0.5) { R.anillo(62, 90, 6 + v * 40, hex('#fff6a0'), 2); R.anillo(62, 90, 4 + v * 28, hex('#3aa85a'), 4); }
  T.cineDelante(R, t, o);
};
const año = (t) => t < P2 ? 1981 + Math.round(tramo(t, h(1.7), h(2.9)) * 14) : t < P3 ? 1995 : t < P4 ? 1994 : t < P5 ? 1969 : 1969 + Math.floor(U5(t) * 26 + 1e-6);
const efectos = [[1.5, 'lapiz'], [h(2.95), 'palmada'], [h(3.7), 'aviso'], [h(4.9), 'golpecito'], [h(6.3), 'tic'], [h(8.1), 'maquina'], [h(8.8), 'boing'], [P3 + 0.3, 'tecleo'], [h(10.6), 'papel'], [h(14.55), 'pop'],
  [h(16.5), 'toc'], [h(17.3), 'whoosh'], [h(18.5), 'brillo'], [P5 + 0.3, 'papel'], [h(21.6), 'rafaga'], [h(22.4), 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '1995', año });
''')
