# Borrador de escenas del ep35 (grupo S5): jm-keene, jm-pelo, jm-estreno. Formato del 11: E[id] = (título, cabecera, cuerpo).
E = {}

GLOBO = r'''
const K = hex('#16161c'), CREMA = hex('#fbf7ea'), ease = (u) => u * u * (3 - 2 * u);
// un bocadillo (caja crema con filo) con el rabito hacia (px, py)
const globo = (x0, y0, x1, y1, px, py) => {
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, CREMA); R.rect(x0 + 2, y1 - 1, x1 - 2, y1 - 1, hex('#d8d0b8'));
  const bx = Math.max(x0 + 3, Math.min(x1 - 8, px - 2)); R.poligono([[bx, y1], [bx + 6, y1], [px, py]], K); R.poligono([[bx + 1, y1 - 1], [bx + 5, y1 - 1], [px, py - 2]], CREMA);
};
'''

E['jm-keene'] = ('Keene', '''// JM-KEENE (frase 14), 1994. Tres planos:
// 1. el plató: la estrella (EL.williams, sin caracterizar) llega con su guion bajo el brazo, el foco se enciende sobre él,
//    el director lo recibe con una palmada y él saluda con el guion en alto;  2. (corta en «they chose a real one») la calle mayor de Keene con
//    el rodaje: los vecinos miran, suena la campana y salen pájaros de la aguja; el pintor cruza con su escalera y su bote
//    camino de la pared;  3. (corta en «they painted») la pared de ladrillo: el pintor, en el andamio, pinta el zapato de
//    izquierda a derecha (pintura lavable, pálida); abajo los vecinos miran, uno se pregunta «?» (la fábrica no existe) y
//    al acabar el pintor saluda y le aplauden.''', GLOBO + r'''
const k = (f) => en('keene', f);
const P2 = k(0.271), P3 = k(0.6235);
const robin = k(0.077), keeneW = k(0.374), pared = k(0.494), zapato = k(0.7295), noExiste = k(0.839), fin = k(0.94);
// el guion pequeño (hojas con dos grapas y rayas) en la mano
const guion = (x, y) => { R.rect(x - 4, y - 6, x + 4, y + 5, K); R.rect(x - 3, y - 5, x + 3, y + 4, hex('#f4efe0')); R.rect(x - 3, y + 4, x + 3, y + 4, hex('#c8c0a8')); for (let j = -3; j <= 2; j += 2) R.rect(x - 1, y + j, x + 2, y + j, hex('#8a8698')); R.pset(x - 3, y - 4, hex('#c89a2a')); R.pset(x - 3, y + 2, hex('#c89a2a')); };
const p1 = (t) => {
  const o = { encuadre: 'plato' }; T.keene(R, t, o);
  const u = ease(tramo(t, 0.15, robin + 0.45)), wx = Math.round(lerp(262, 148, u)), anda = u > 0 && u < 1, luz = t > robin;
  // el foco que se enciende sobre él: el haz tramado desde la cercha y el charco de luz en la alfombra
  if (luz) { const cx = wx + 8, f = Math.min(1, (t - robin) / 0.25);
    R.rect(148, 40, 156, 41, hex('#ffffff')); R.rect(150, 42, 154, 42, hex('#fff2b8')); for (let y = 43; y <= 47; y++) for (let x = 152 - (y - 42); x <= 152 + (y - 42); x++) if ((x + y) & 1) R.pset(x, y, hex('#fff2b8'));
    for (let j = -5; j <= 5; j++) { const w = Math.round(Math.sqrt(1 - (j * j) / 30) * 22 * f); for (let x = cx - w; x <= cx + w; x++) if ((x + j) % 2 === 0) R.pset(x, 151 + j, Math.abs(j) < 3 && Math.abs(x - cx) < w - 5 ? hex('#fff2b8') : hex('#f0c868')); } }
  // el director (lo recibe con una palmada) y la ayudante con el guion en alto
  const palm = t > robin + 0.5 && t < robin + 1.7;
  R.actor(EL.guionista1JM, 92, 150, t, { dir: 1, brazos: palm && Math.sin(t * 16) > 0, sonrisa: t > robin, habla: t > robin + 1.7 && Math.sin(t * 8) > 0, dedo: t > robin + 1.9 });
  const ay = R.actor(EL.guionista2JM, 186, 152, t, { dir: -1, sostiene: true, sonrisa: t > robin, salto: t > robin + 0.6 && t < robin + 0.9 ? 2 : 0 }); guion(ay.mano[0], ay.mano[1]);
  // la estrella entra desde el puesto de comida, se para en la alfombra y saluda
  const saluda = !anda && t > robin + 0.6;
  const w = R.actor(EL.williams, wx, 150, t, { dir: -1, anda, sostiene: saluda ? [wx - 2, 133 + Math.round(Math.sin(t * 8) * 2)] : true, sonrisa: !anda, habla: saluda && Math.sin(t * 9) > 0.2, salto: saluda && t < robin + 0.85 ? 2 : 0 });
  guion(w.mano[0], w.mano[1]);
  T.keeneDelante(R, t, o);
};
// la escalera de mano que el pintor lleva al hombro
const escalera = (x, y) => { const m = hex('#d8a868'), s = hex('#8a5a2c'); for (const [dy, c] of [[-1, K], [0, m], [1, s], [2, K]]) { R.linea(x - 18, y + 3 + dy, x + 20, y - 3 + dy, c); R.linea(x - 18, y - 4 + dy, x + 20, y - 10 + dy, c); } for (let i = -14; i <= 17; i += 6) { const yy = y - Math.round((i + 18) * 0.158); R.linea(x + i, yy + 3, x + i, yy - 3, K); R.linea(x + i + 1, yy + 2, x + i + 1, yy - 3, m); } };
const p2 = (t) => {
  const o = { encuadre: 'calle', rodaje: true }; const g = T.keene(R, t, o);
  // la campana: los pájaros salen de la aguja de la iglesia
  { const v = tramo(t, keeneW, keeneW + 2.2); if (v > 0 && v < 1) for (let i = 0; i < 6; i++) { const a = -2.4 + i * 0.36, d = v * (26 + i * 5), x = Math.round(222 + Math.cos(a) * d * 1.3), y = Math.round(30 + Math.sin(a) * d * 0.6 - v * 6), al = Math.sin(t * 16 + i) > 0 ? 1 : 0; if (y > 16 || x > 172) { R.pset(x, y, K); R.pset(x - 1, y - al, K); R.pset(x + 1, y - al, K); } }
    if (t > keeneW && t < keeneW + 0.9) for (const s of [-1, 1]) { const r = 4 + Math.floor((t - keeneW) * 9); R.pset(222 + s * r, 40, hex('#ffe9a0')); R.pset(222 + s * r, 42, hex('#ffe9a0')); R.pset(222 + s * (r + 1), 41, hex('#ffe9a0')); } }
  const px = Math.round(lerp(122, 306, tramo(t, P2 + 0.1, P3 + 0.3)));
  // los vecinos: él señala el rodaje, ella se asombra, y los dos siguen con la cabeza al pintor; otra llega por la derecha
  R.actor(EL.vecino1JM, 154, 134, t, { dir: px > 166 ? 1 : -1, dedo: t > P2 + 0.3 && t < keeneW, habla: t < keeneW && Math.sin(t * 8) > 0, sonrisa: true });
  R.actor(EL.vecina2JM, 176, 134, t, { dir: px > 190 ? 1 : -1, sorpresa: t < P2 + 1.1, sonrisa: true, dedo: t > pared && t < P3 - 0.2 });
  const v3 = tramo(t, P2, keeneW + 0.6); R.actor(EL.vecina3JM, Math.round(lerp(318, 262, v3)), 134, t, { dir: -1, anda: v3 < 1, sorpresa: v3 >= 1 && t < pared, sonrisa: t >= pared });
  // el pintor, con la escalera al hombro y el bote, camino de la pared
  const pin = R.actor(EL.pintorJM, px, 134, t, { dir: 1, anda: true, sostiene: [px + 16, 126] });
  escalera(px + 5, 106 - (Math.floor(t * 5 + px * 0.37) & 1)); T.PIEZAS_JM.botePintura(R, pin.mano[0] + 1, pin.mano[1] + 15, {}); R.linea(pin.mano[0] - 3, pin.mano[1] + 1, pin.mano[0] + 1, pin.mano[1] - 3, hex('#8a8e9c')); R.linea(pin.mano[0] + 5, pin.mano[1] + 1, pin.mano[0] + 1, pin.mano[1] - 3, hex('#8a8e9c'));
  T.keeneDelante(R, t, o);
};
// la brocha pequeña con pintura
const brocha = (x, y) => { R.rect(x - 2, y - 5, x + 2, y + 1, K); R.rect(x - 1, y - 4, x + 1, y - 2, hex('#e0a090')); R.rect(x - 1, y - 1, x + 1, y, hex('#c8ccd4')); R.rect(x - 1, y + 2, x + 1, y + 7, K); R.rect(x, y + 2, x, y + 6, hex('#b88648')); };
const p3 = (t) => {
  const pinta = tramo(t, P3 + 0.15, zapato + 0.35), hecho = pinta >= 1;
  const o = { encuadre: 'pared', letrero: lerp(0.42, 1, pinta), lavable: true, andamio: true }; const g = T.keene(R, t, o);
  // el pintor, en el andamio: brochazos arriba y abajo en el frente de la pintura; al acabar se vuelve y saluda
  const ax = Math.round(g.andamio.x) - 24, ay = g.andamio.y, by = ay - 17 + Math.round(Math.sin(t * 7) * 6);
  if (!hecho) { const p = R.actor(EL.pintorJM, ax, ay, t, { dir: 1, sostiene: [ax + 22, by] }); brocha(p.mano[0] + 1, p.mano[1] - 2); if (Math.sin(t * 7) > 0.6) { R.pset(p.mano[0] + 3, p.mano[1] + 6, hex('#e0a090')); R.pset(p.mano[0] - 1, p.mano[1] + 9, hex('#e0a090')); } }
  else R.actor(EL.pintorJM, ax, ay, t, { dir: -1, brazos: t > fin - 0.3 && Math.sin(t * 9) > -0.3 && (t < fin + 1.2 || t > fin + 1.9), dedo: t <= fin - 0.3, sonrisa: true });
  T.keeneDelante(R, t, o);
  // abajo, en la acera: los vecinos miran cómo sale el zapato; uno se pregunta por la fábrica; otra llega y aplaude
  const duda = t > noExiste && t < fin + 0.4;
  const v1 = R.actor(EL.vecino1JM, 84, 160, t, { dir: 1, dedo: t > zapato - 0.5 && t < noExiste, sorpresa: duda, habla: t > fin + 0.4 && Math.sin(t * 8) > 0 });
  R.actor(EL.vecina2JM, 110, 160, t, { dir: duda ? -1 : 1, sonrisa: !duda, brazos: t > fin + 0.2 && Math.sin(t * 15) > 0 });
  if (duda) { const e = Math.min(1, (t - noExiste) / 0.15), y0 = Math.round(lerp(128, 112, e)); globo(80, y0, 100, y0 + 20, 92, y0 + 26); R.icono('?', 86, y0 + 3, hex('#c8362e'), hex('#f0c8b8'), 2); }
  const v3 = tramo(t, noExiste - 0.6, fin + 0.3); R.actor(EL.vecina3JM, Math.round(lerp(322, 232, v3)), 162, t, { dir: -1, anda: v3 > 0 && v3 < 1, dedo: v3 >= 1 && t < fin + 1.4, sonrisa: v3 >= 1 });
};
const efectos = [[robin, 'interruptor'], [robin + 0.6, 'palmada'], [keeneW, 'campana'], [P3 + 0.3, 'chof'], [zapato - 0.5, 'chof'], [noExiste, 'pop'], [fin + 0.3, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1994 });
''')

E['jm-pelo'] = ('El pelo', '''// JM-PELO (frase 15), 1995. Cuatro planos (el golpe de la banda cae en la marca «pelo», al arrancar la frase):
// 1. la sala de efectos: con el golpe se enciende la pantalla grande con el león de alambre, pelado; da error; un técnico
//    llega con un león de peluche («¿y esto?») y el otro dice que no («X»);  2. (corta en «almost nobody») ante la cámara
//    de cine: la claqueta se cierra y una mano mete el peluche en plano, lo menea como si rugiera… y se le dobla la cabeza;
//    3. (corta en «The effects crew») la pantalla de tubo: se escribe el programa (rayas), la melena crece mechón a mechón,
//    el último se queda de punta (gag 5: el cursor lo aplasta y vuelve a saltar) y llegan los monos de alambre;
//    4. (corta en «in Jumanji») el cine: el león, ya con su melena, entra en la pantalla y ruge; los monos se columpian;
//    una madre y su hijo, que llegan tarde, se quedan pasmados en el pasillo.''', GLOBO + r'''
const a = (f) => en('pelo', f);
const P2 = a(0.1795), P3 = a(0.4055), P4 = a(0.775);
const problema = a(0.047), en1995 = a(0.105), creible = a(0.263), compu = a(0.351), programas = a(0.468), crece = a(0.54), fur = a(0.56), porque = a(0.661), monosW = a(0.735), digital = a(0.914);
// el león de peluche (13 × 13 celdas a escala s; sh: cuánto se le dobla la cabeza)
const PEL = ['..MM.....MM..', '.MMMMMMMMMMM.', 'MMMMYYYYYMMMM', 'MMMYYYYYYYMMM', 'MMYYKYYYKYYMM', 'MMYYYYNYYYYMM', 'MMMYYWWWYYMMM', '.MMMYYYYYMMM.', '..MYYYYYYYM..', '.YYYYYCYYYYY.', '.YYYYYCYYYYY.', '.YY.YYYYY.YY.', '.YY.YY.YY.YY.'];
const PCOL = { M: hex('#8a4a1c'), Y: hex('#e8b848'), K, N: hex('#5a2a14'), W: hex('#f6e2b0'), C: hex('#c89030') };
const peluche = (x, y, s, sh = 0) => {
  for (let pasa = 0; pasa < 2; pasa++) for (let j = 0; j < 13; j++) { const dx = Math.round(sh * Math.max(0, 8 - j) / 8), dy = Math.round(Math.abs(sh) * Math.max(0, 6 - j) / 14);
    for (let i = 0; i < 13; i++) { const ch = PEL[j][i]; if (ch === '.') continue; const X = x + i * s + dx, Y = y + j * s + dy;
      if (!pasa) R.rect(X - 1, Y - 1, X + s, Y + s, K); else { R.rect(X, Y, X + s - 1, Y + s - 1, PCOL[ch]); if (s >= 3) { if (ch === 'M') { R.pset(X + (i + j) % 3, Y + 1, hex('#a8622a')); R.pset(X + (i * 2 + j) % 3, Y + 2, hex('#6a3410')); } else if (ch === 'Y') R.pset(X + (i * 2 + j) % 3, Y + 2, hex('#d09a30')); else if (ch === 'K') R.pset(X, Y, hex('#ffffff')); } } } }
};
const p1 = (t) => {
  const o = { encuadre: 'efectos', pelo: 0 }; const g = T.keene(R, t, o), [sx0, sy0, sx1, sy1] = g.pantallaGrande;
  // con el golpe se enciende la pantalla grande; luego, el aviso de error (marco rojo y «X»)
  if (t < 0.5) { R.rect(sx0, sy0, sx1, sy1, hex('#0a0e18')); R.pset(sx1 - 3, sy1 - 2, hex('#5a1a1a')); }
  else if (t < 0.62) R.rect(sx0, sy0, sx1, sy1, hex('#d8f4e8'));
  else if (t < 0.8) for (let y = sy0; y <= sy1; y += 2) R.rect(sx0, y, sx1, y, hex('#0a0e18'));
  const mal = t > problema && t < P2 && Math.sin(t * 11) > -0.2;
  if (mal) { const r = hex('#e8483a'); R.rect(sx0, sy0, sx1, sy0, r); R.rect(sx0, sy1, sx1, sy1, r); R.rect(sx0, sy0, sx0, sy1, r); R.rect(sx1, sy0, sx1, sy1, r); R.icono('X', sx1 - 10, sy0 + 3, r, K, 1); }
  // el técnico que teclea se vuelve hacia la pantalla; el otro llega con el peluche y se lo enseña
  const mira = t > 0.5;
  const t1 = R.actor(EL.tecnicoFX1JM, 104, 145, t, { dir: mira ? 1 : -1, sorpresa: t > problema && t < problema + 0.8, triste: t > en1995 + 0.5, dedo: t > 0.8 && t < problema + 0.6 });
  const u = ease(tramo(t, 0.3, problema + 0.5)), x2 = Math.round(lerp(300, 208, u)), alto = t > en1995;
  const t2 = R.actor(EL.tecnicoFX2JM, x2, 145, t, { dir: -1, anda: u < 1, sostiene: [x2 - 3, alto ? 121 : 129], sonrisa: alto, habla: alto && t < en1995 + 0.6 && Math.sin(t * 9) > 0 });
  peluche(t2.mano[0] - 9, t2.mano[1] - 12 + (alto && Math.sin(t * 10) > 0 ? -1 : 0), 1);
  T.keeneDelante(R, t, o);
  if (t > en1995 + 0.55) { const e = Math.min(1, (t - en1995 - 0.55) / 0.15), y0 = Math.round(lerp(104, 92, e)); globo(98, y0, 118, y0 + 19, 112, y0 + 26); R.icono('X', 103, y0 + 4, hex('#c8362e'), hex('#f0c8b8'), 2); }
};
const p2 = (t) => {
  const o = { encuadre: 'plato', camara: 'camara', clac: tramo(t, P2 + 0.45, P2 + 0.58), escena: 35, plano: 2, toma: 7 }; T.keene(R, t, o);
  // la mano mete el peluche delante del objetivo, lo menea como si rugiera… y se le dobla la cabeza
  const u = ease(tramo(t, P2 + 0.8, P2 + 1.5)), menea = t > creible && t < compu, cae = tramo(t, compu, compu + 0.35), rebote = cae >= 1 ? Math.sin(Math.min(1, (t - compu - 0.35) / 0.5) * Math.PI * 3) * (1 - Math.min(1, (t - compu - 0.35) / 0.5)) * 2 : 0;
  const px = Math.round(lerp(326, 256, u) + (menea ? Math.sin(t * 20) * 1.6 : 0)), py = 62 + (menea ? Math.round(Math.abs(Math.sin(t * 10)) * -3) : 0);
  if (u > 0) { T.brazo(R, 334, py + 44, px + 48, py + 26, '#3a5a8a', -1); peluche(px, py, 3, -(cae * 9 + rebote));
    if (menea && Math.sin(t * 10) > 0.3) for (const [i, j] of [[-6, 8], [-9, 14], [-5, 20]]) { R.pset(px + i, py + j, hex('#fff2b8')); R.pset(px + i - 1, py + j, hex('#fff2b8')); } }
};
const p3 = (t) => {
  const pelo = tramo(t, crece, porque - 0.15), aplasta = t > porque + 0.75 && t < porque + 1.12;
  const o = { encuadre: 'efectos', camara: 'pantalla', pelo, punta: t > porque + 0.05 && !aplasta, monos: tramo(t, monosW - 0.15, monosW + 0.5) }; const g = T.keene(R, t, o);
  R.recorte(g.pantalla);
  // la ventana del programa: renglones de código (rayas de colores) que se escriben; al ejecutarlo se pliega
  { const cierra = tramo(t, crece - 0.3, crece - 0.05), x0 = 200, y0 = 46, x1 = 272, y1 = Math.round(lerp(100, 54, cierra));
    if (cierra < 1) { R.poligono([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], hex('#0c1830')); for (const [ax, ay, bx, by] of [[x0, y0, x1, y0], [x0, y1, x1, y1], [x0, y0, x0, y1], [x1, y0, x1, y1]]) R.linea(ax, ay, bx, by, hex('#58e0a0')); R.poligono([[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x1 - 1, y0 + 5], [x0 + 1, y0 + 5]], hex('#1e5a52')); R.pset(x1 - 3, y0 + 3, hex('#ff6a5a')); R.pset(x1 - 6, y0 + 3, hex('#ffd45a'));
      const L = [[0, 22, 0], [4, 30, 1], [4, 18, 2], [8, 26, 1], [8, 34, 3], [4, 12, 0], [0, 28, 2], [4, 22, 1]]; let n = Math.floor(tramo(t, P3 + 0.15, programas + 0.9) * 196), cx = x0 + 4, cy = y0 + 9;
      for (let i = 0; i < L.length && y0 + 9 + i * 6 < y1 - 2; i++) { const [ind, len, c] = L[i], y = y0 + 9 + i * 6, w = Math.min(len, n); n -= w; if (w <= 0) break; for (let x = 0; x < w; x++) if (x % 7 !== 5) R.pset(x0 + 4 + ind + x, y, hex(['#58e0a0', '#8ac8ff', '#ffd45a', '#ff9a6a'][c])); cx = x0 + 4 + ind + w + 1; cy = y; }
      if (cierra === 0 && Math.sin(t * 12) > 0) { R.pset(cx, cy, hex('#ffffff')); R.pset(cx, cy - 1, hex('#ffffff')); R.pset(cx + 1, cy, hex('#ffffff')); R.pset(cx + 1, cy - 1, hex('#ffffff')); } } }
  // al crecer, chispas en el frente de la melena
  if (pelo > 0 && pelo < 1) for (let i = 0; i < 5; i++) { const an = t * 9 + i * 1.3, x = Math.round(g.nuca[0] + (g.coronilla[0] - g.nuca[0]) * pelo + Math.cos(an) * (6 + i)), y = Math.round(g.nuca[1] + (g.coronilla[1] - g.nuca[1]) * pelo + Math.sin(an) * (6 + i)); R.pset(x, y, hex('#fff2b8')); }
  // el cursor: baja a aplastar el mechón de punta, y el mechón vuelve a saltar
  { const tip = g.punta ?? [g.coronilla[0], 27], v = ease(tramo(t, porque + 0.2, porque + 0.75)), sale = ease(tramo(t, porque + 1.12, porque + 1.3));
    if (t > porque + 0.1 && t < monosW + 0.4) { const x = Math.round(lerp(236, tip[0] + 1, v) + sale * 9), y = Math.round(lerp(92, tip[1] - 2 + (aplasta ? 5 : 0), v) - sale * 7);
      R.poligono([[x - 1, y - 1], [x - 1, y + 11], [x + 2, y + 9], [x + 5, y + 13], [x + 8, y + 12], [x + 5, y + 8], [x + 9, y + 8]], K); R.poligono([[x, y + 1], [x, y + 9], [x + 2, y + 7], [x + 5, y + 11], [x + 6, y + 11], [x + 4, y + 7], [x + 7, y + 7]], hex('#ffffff')); }
    if (t > porque + 1.12 && t < porque + 1.5) for (const [i, j] of [[-5, -2], [5, -3], [-7, 3], [7, 2]]) R.pset(tip[0] + i, tip[1] + j, hex('#fff2b8')); }
  R.recorte(null);
};
// EL LEÓN de la película (nuestro), de perfil hacia la derecha, con su melena de mechones: (ox, oy) lo desplaza
const leon = (ox, oy, t, o = {}) => {
  const C1 = hex('#d9a441'), C2 = hex('#a8742a'), C3 = hex('#f0c868'), M1 = hex('#7a4416'), M2 = hex('#a86220'), M3 = hex('#4e280c'), X = (x) => Math.round(x + ox), Y = (y) => Math.round(y + oy), pg = (pts, c) => R.poligono(pts.map(([x, y]) => [X(x), Y(y)]), c);
  const pa = o.anda ? Math.floor(t * 5) & 1 : -1, cola = Math.sin(t * 2.4) * 5;
  // la cola con su borla
  R.linea(X(128), Y(58), X(118), Y(52), C2); R.linea(X(128), Y(59), X(118), Y(53), C1); R.linea(X(118), Y(52), X(112 + cola * 0.4), Y(42), C2); R.linea(X(118), Y(53), X(113 + cola * 0.4), Y(42), C1); R.disco(X(112 + cola * 0.5), Y(40), 3, M1); R.pset(X(111 + cola * 0.5), Y(38), M2);
  // las patas de atrás y de delante (las de detrás, más oscuras)
  for (const [x, lejos, k] of [[140, 1, 0], [182, 1, 1], [132, 0, 1], [174, 0, 0]]) { const up = pa === k ? 2 : 0, c = lejos ? C2 : C1; pg([[x, 68], [x + 8, 68], [x + 7, 86 - up], [x + 9, 88 - up], [x, 88 - up], [x + 1, 80]], c); R.linea(X(x), Y(88 - up), X(x + 9), Y(88 - up), M3); if (!lejos) R.linea(X(x + 8), Y(70), X(x + 7), Y(86 - up), C2); }
  // el cuerpo: lomo, panza clara y sombra
  pg([[128, 56], [150, 52], [186, 50], [194, 58], [192, 72], [176, 76], [146, 77], [130, 74], [126, 64]], C1); pg([[130, 70], [192, 68], [190, 73], [176, 76], [146, 77], [131, 74]], C2); R.linea(X(132), Y(55), X(184), Y(51), C3); R.linea(X(150), Y(53), X(184), Y(51), C3);
  for (let i = 0; i < 9; i++) R.pset(X(136 + i * 6), Y(60 + (i * 5) % 9), C2);
  // la melena: el disco y los mechones que se mecen (más revueltos al rugir)
  const ag = o.ruge ? 2.2 : 0.8; R.disco(X(203), Y(60), 17, M1);
  for (let i = 0; i < 22; i++) { const an = i / 22 * 6.283 + 0.3, l = 16 + (i * 7) % 5 + Math.sin(t * (o.ruge ? 14 : 3) + i * 1.7) * ag, x0 = 203 + Math.cos(an) * 12, y0 = 60 + Math.sin(an) * 12; if (an > 5.6 || an < 0.75) continue; R.linea(X(x0), Y(y0), X(203 + Math.cos(an + 0.12) * l), Y(60 + Math.sin(an + 0.12) * l * 1.05), i % 3 ? M2 : M3); R.linea(X(x0 + 1), Y(y0), X(204 + Math.cos(an + 0.12) * l), Y(60 + Math.sin(an + 0.12) * l * 1.05), M1); }
  for (let i = 0; i < 16; i++) { const an = i * 2.4, d = 5 + (i * 5) % 9; R.linea(X(200 + Math.cos(an) * d), Y(60 + Math.sin(an) * d), X(200 + Math.cos(an) * d - 1), Y(63 + Math.sin(an) * d), i % 2 ? M2 : M3); }
  // la cara: oreja, frente, hocico claro, nariz, ojo y la boca (abierta al rugir)
  R.disco(X(204), Y(46), 3, C2); R.pset(X(204), Y(46), M3); R.disco(X(211), Y(59), 9, C1); R.disco(X(217), Y(63), 5, hex('#f4dca8')); pg([[220, 58], [223, 59], [222, 62], [219, 61]], M3); R.pset(X(212), Y(55), K); R.pset(X(213), Y(55), K); R.pset(X(212), Y(54), M3); R.pset(X(213), Y(54), M3); R.pset(X(213), Y(56), hex('#ffffff'));
  if (o.ruge) { pg([[213, 64], [222, 63], [221, 72], [215, 71]], hex('#6a1a1a')); R.pset(X(215), Y(65), hex('#ffffff')); R.pset(X(220), Y(65), hex('#ffffff')); R.pset(X(216), Y(70), hex('#ffffff')); R.pset(X(219), Y(70), hex('#ffffff')); R.linea(X(216), Y(68), X(219), Y(68), hex('#e86a6a')); }
  else { R.linea(X(215), Y(66), X(221), Y(65), M3); R.pset(X(218), Y(64), M3); }
  for (const j of [61, 63]) R.linea(X(219), Y(j), X(226), Y(j - 1), hex('#f4ecd0'));
};
// un mono que se columpia de una liana (cuelga de (x, 28))
const mono = (x, t, f) => { const an = Math.sin(t * 2.2 + f) * 0.5, L = 30, mx = Math.round(x + Math.sin(an) * L), my = Math.round(28 + Math.cos(an) * L), P1 = hex('#6a4426'), P2c = hex('#d8a878');
  R.linea(x, 28, mx, my - 6, hex('#2e6a2a')); R.linea(x + 1, 28, mx + 1, my - 6, hex('#1c4a1e'));
  R.linea(mx, my - 6, mx - 2, my, P1); R.linea(mx + 1, my - 6, mx + 3, my, P1); R.disco(mx, my + 3, 4, P1); R.disco(mx, my - 2, 3, P1); R.disco(mx + (an > 0 ? 1 : -1), my - 1, 2, P2c); R.pset(mx + (an > 0 ? 2 : -2), my - 2, K); R.pset(mx - 3, my - 3, P2c); R.pset(mx + 3, my - 3, P2c);
  R.linea(mx - 2, my + 6, mx - 4, my + 10, P1); R.linea(mx + 2, my + 6, mx + 4, my + 10, P1); for (let i = 0; i < 7; i++) R.pset(Math.round(mx - 4 - i * 0.6 - Math.sin(i * 0.9) * 2), my + 5 + i, P1); };
const p4 = (t) => {
  const o = { encuadre: 'sala', pantalla: 'selva', lleno: 0.75 }; const g = T.cine(R, t, o), [x0, y0, x1, y1] = g.pantalla;
  const entra = ease(tramo(t, P4 + 0.1, P4 + 2.0)), ruge = t > digital && t < digital + 1.5;
  // LA PELÍCULA (la pinta la escena, recortada a la pantalla): la selva al fondo, el claro y el león que entra y ruge
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y += 4) { const f = (y - y0) / (y1 - y0); R.poligono([[x0 - 1, y - 1], [x1 + 1, y - 1], [x1 + 1, y + 5], [x0 - 1, y + 5]], hex(['#0d3a24', '#0f4228', '#124a2c', '#165430', '#1a5e34', '#1f6a3a'][Math.min(5, Math.floor(f * 6 + ((y >> 2) & 1) * 0.5))])); }
  for (let i = 0; i < 26; i++) { const lx = x0 + ((i * 53) % 200), ly = y0 + 2 + ((i * 29) % 50), an = -1.2 + (i % 5) * 0.6 + Math.sin(t * 1.1 + i) * 0.08, l = 14 + (i * 7) % 12, ex = lx + Math.cos(an) * l, ey = ly + Math.sin(an) * l, nx = -Math.sin(an) * (3 + i % 3), ny = Math.cos(an) * (3 + i % 3), c = hex(['#1c6a34', '#2a8a40', '#14522a', '#38a048'][i % 4]);
    R.poligono([[lx, ly], [(lx + ex) / 2 + nx, (ly + ey) / 2 + ny], [ex, ey], [(lx + ex) / 2 - nx, (ly + ey) / 2 - ny]].map(([x, y]) => [Math.round(x), Math.round(y)]), c); R.linea(Math.round(lx), Math.round(ly), Math.round(ex), Math.round(ey), hex('#0d3a24')); }
  for (let i = 0; i < 4; i++) { const rx = x0 + 30 + i * 46 + Math.round(Math.sin(t * 0.4 + i) * 3); for (let y = y0; y < y1 - 16; y += 2) R.pset(rx + ((y - y0) >> 2), y, hex('#7ad070')); }
  R.poligono([[x0, y1], [x0, 86], [96, 80], [150, 77], [214, 79], [x1, 85], [x1, y1]], hex('#3a3220')); R.linea(x0, 86, 96, 80, hex('#6a5a34')); R.linea(96, 80, 150, 77, hex('#6a5a34')); R.linea(150, 77, 214, 79, hex('#6a5a34')); R.linea(214, 79, x1, 85, hex('#6a5a34'));
  for (let i = 0; i < 14; i++) { const gx = x0 + 6 + i * 14, m = Math.round(Math.sin(t * 2 + i)); R.linea(gx, 84 + (i % 3), gx + m, 79 + (i % 3), hex('#2a8a40')); R.linea(gx + 3, 85 + (i % 3), gx + 4 - m, 81 + (i % 3), hex('#1c6a34')); }
  mono(88, t, 0); mono(240, t, 2.1);
  leon(Math.round(lerp(-176, -14, entra)), -10 + (entra < 1 && (Math.floor(t * 5) & 1) ? -1 : 0), t, { anda: entra < 1, ruge });
  if (t > digital - 0.2) for (let i = 0; i < 7; i++) if (Math.sin(t * 6 + i * 2.1) > 0.5) { const sx = 189 + Math.round(Math.cos(i * 0.9) * 22), sy = 50 + Math.round(Math.sin(i * 0.9) * 20); R.pset(sx, sy, hex('#ffffff')); R.pset(sx - 1, sy, hex('#fff2b8')); R.pset(sx + 1, sy, hex('#fff2b8')); R.pset(sx, sy - 1, hex('#fff2b8')); R.pset(sx, sy + 1, hex('#fff2b8')); }
  if (Math.floor(t * 24) % 9 === 0) R.linea(x0 + ((Math.floor(t * 24) * 37) % 190), y0, x0 + ((Math.floor(t * 24) * 37) % 190), y1, hex('#2f7a44'));
  R.recorte(null);
  // los que llegan tarde: la madre y el chico cruzan por el pasillo y se quedan pasmados cuando ruge
  const v = tramo(t, P4 + 0.3, digital - 0.4), mx = Math.round(lerp(8, 92, v));
  R.actor(EL.vecina2JM, mx, 153, t, { dir: 1, anda: v < 1, sorpresa: ruge, sonrisa: t > digital + 1.5 });
  R.actor(EL.chico1JM, mx + 20, 154, t, { dir: 1, anda: v < 1, sorpresa: ruge, dedo: v >= 1, salto: ruge && t < digital + 0.3 ? 3 : 0, sonrisa: t > digital + 1.5 });
  T.cineDelante(R, t, o);
};
const efectos = [[0.5, 'interruptor'], [problema + 0.05, 'bip'], [en1995 + 0.6, 'pop'], [P2 + 0.5, 'toc'], [compu + 0.1, 'boing'], [P3 + 0.3, 'tecleo'], [programas, 'tecleo'], [crece, 'zumbido'], [porque + 0.05, 'boing'], [porque + 0.78, 'golpecito'], [porque + 1.14, 'boing'], [P4 + 0.4, 'maquina'], [digital, 'publico'], [digital + 0.5, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1995 });
''')

E['jm-estreno'] = ('El estreno', '''// JM-ESTRENO (frase 16), 1995. Seis planos:
// 1. el cine en diciembre de 1995, con nieve: la cola crece hasta salirse; una madre y su hijo llegan y el chico salta
//    señalando la marquesina (sin letras);  2. (corta en «lukewarm») la sala desde la pantalla: el crítico, de pie, con su
//    bocadillo de estrellas (dos de cuatro; la tercera duda); «no importó»: el público da un bote (el niño se tapa los ojos) y el crítico se va;
//    «$65»;  3. (corta en «and took in») el contador: de 65 rueda hasta 260 (cae en la palabra) y llueven monedas; el
//    mundo;  4. (corta en «And some newspapers») el periódico desde arriba: un lápiz rojo subraya la foto de la máscara,
//    saltan las chispas de «efectos» y, al final, cae el folleto de la isla;  5. (corta en «Robin Williams had») la rueda
//    de prensa: una periodista pregunta («?»), Williams contesta muy serio y en su bocadillo sale una isla con palmera;
//    6. (corta en «in the Caribbean»; vista libre: mapa/caribe) el mapa: un lápiz DIBUJA la isla en el mar vacío, cae la
//    chincheta, llega el avión por su ruta de puntos y se amontonan los billetes («reserva pronto»).''', GLOBO + r'''
const e = (f) => en('estreno', f);
const P2 = e(0.1278), P3 = e(0.2721), P4 = e(0.4337), P5 = e(0.6873), P6 = e(0.9152);
const diciembre = e(0.027), noImporta = e(0.1773), s65 = e(0.224), rueda = e(0.305), s260 = e(0.3364), mundo = e(0.38), impreso = e(0.488), zulu = e(0.567), efectosW = e(0.613), folleto = e(0.655), respuesta = e(0.75), preguntan = e(0.783), serio = e(0.852), isla = e(0.895), caribe = e(0.929), reserva = e(0.967);
const p1 = (t) => {
  const o = { encuadre: 'fachada', epoca: 1995, cola: lerp(0.3, 1, tramo(t, 0, P2 - 0.8)) }; T.cine(R, t, o);
  // la madre y el chico llegan por la derecha; él salta señalando la marquesina; una vecina se para ante el cartel
  const u = tramo(t, 0.05, diciembre + 0.9), mx = Math.round(lerp(322, 212, u)), salta = u >= 1 && t < P2 - 0.5;
  const v = tramo(t, 0, diciembre + 0.9), vx = Math.round(lerp(-14, 34, v));
  R.actor(EL.vecina3JM, vx, 153, t, { dir: 1, anda: v < 1, sonrisa: v >= 1, dedo: v >= 1 && t > diciembre + 1.3 }); if (v >= 1) T.a_vaho(R, vx + 15, 137, t, 1);
  R.actor(EL.vecina2JM, mx + 18, 154, t, { dir: -1, anda: u < 1, sonrisa: true, habla: u >= 1 && Math.sin(t * 7) > 0.3 }); T.a_vaho(R, mx + 18, 138, t + 0.7, -1);
  R.actor(EL.chico1JM, mx, 155, t, { dir: -1, anda: u < 1, dedo: u >= 1, sonrisa: true, salto: salta ? Math.round(Math.abs(Math.sin((t - diciembre) * 7)) * 4) : 0 }); T.a_vaho(R, mx, 141, t, -1);
  T.cineDelante(R, t, o);
};
// una estrella de la nota del crítico (llena o vacía)
const estrella = (cx, cy, llena) => { const pts = []; for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 2.6 : 6.4; pts.push([Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r)]); }
  R.poligono(pts, llena ? hex('#f0b828') : hex('#e4dcc4')); for (let i = 0; i < 10; i++) R.linea(pts[i][0], pts[i][1], pts[(i + 1) % 10][0], pts[(i + 1) % 10][1], llena ? hex('#7a4a10') : hex('#8a8698')); if (llena) { R.pset(cx - 1, cy - 2, hex('#fff2b8')); R.pset(cx, cy - 3, hex('#fff2b8')); } };
const p2 = (t) => {
  const susto = t > noImporta && t < noImporta + 1.3;
  const o = { encuadre: 'sala', camara: 'publico', criticos: true, susto, pantalla: 'selva' }; T.cine(R, t, o);
  // el crítico, de pie ante la primera fila: duda, mira al público que bota, se encoge y se va
  const v = tramo(t, noImporta + 0.7, P3), cx = Math.round(lerp(196, 322, v)), duda = t < noImporta;
  R.actor(EL.criticoJM, cx, 172, t, { dir: susto && v === 0 ? (Math.sin(t * 9) > 0 ? 1 : -1) : 1, anda: v > 0, triste: !duda, habla: duda && Math.sin(t * 7) > 0.4 });
  if (duda) { const en0 = Math.min(1, (t - P2) / 0.18), y0 = Math.round(lerp(126, 114, en0)); globo(174, y0, 238, y0 + 20, 206, y0 + 27); for (let i = 0; i < 4; i++) estrella(184 + i * 15, y0 + 10 + (i === 2 && Math.sin(t * 6) > 0 ? 1 : 0), i < 2 || (i === 2 && Math.sin(t * 6) > 0.2)); }
  if (t > s65) { const en0 = Math.min(1, (t - s65) / 0.2); R.numero('$65', 160, Math.round(lerp(70, 60, en0)), { tam: 16, centro: true }); }
};
const p3 = (t) => {
  const r = tramo(t, rueda, s260), ya = t >= s260;
  const o = { encuadre: 'contador', signo: true, cifra: ya ? 260 : Math.round(lerp(65, 260, ease(r)) * 10) / 10, gira: r > 0 && !ya ? 1 : 0, lluvia: ya ? lerp(1, 0.35, tramo(t, s260 + 0.3, P4)) : r * 0.6 }; T.cine(R, t, o);
  // al llegar, el destello en las ventanillas; con «worldwide», el mundo
  if (ya && t < s260 + 0.5) { const f = 1 - (t - s260) / 0.5; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283, d = 60 + (1 - f) * 60; R.linea(Math.round(164 + Math.cos(an) * d), Math.round(87 + Math.sin(an) * d * 0.5), Math.round(164 + Math.cos(an) * (d + 10 * f)), Math.round(87 + Math.sin(an) * (d + 10 * f) * 0.5), hex('#fff2b8')); } }
  if (t > mundo) { const en0 = Math.min(1, (t - mundo) / 0.2), cx = 160, cy = Math.round(lerp(176, 157, en0)), gi = t * 14;
    R.disco(cx + 2, cy + 3, 15, hex('#3a0e1c')); R.disco(cx, cy, 15, K); R.disco(cx, cy, 14, hex('#3a78c8')); R.recorte([cx - 13, cy - 13, cx + 13, cy + 13]);
    for (let k = 0; k < 4; k++) { const mx = cx - 30 + ((gi + k * 19) % 62), d = Math.abs(mx - cx); if (d > 14) continue; const hh = Math.round(Math.sqrt(196 - d * d)); for (let j = -hh + 1; j < hh; j++) { const w = [5, 3, 4, 2][k] + Math.round(Math.sin(j * 0.7 + k * 2) * 2); if (Math.abs(j - [-4, 3, -1, 6][k]) < [5, 4, 3, 3][k]) R.linea(Math.round(mx - w / 2), cy + j, Math.round(mx + w / 2), cy + j, hex('#4aa85a')); } }
    R.recorte(null); for (let a = 0; a < 6.283; a += 0.1) R.pset(Math.round(cx + Math.cos(a) * 14), Math.round(cy + Math.sin(a) * 14), K); R.pset(cx - 6, cy - 8, hex('#bfe0ff')); R.pset(cx - 7, cy - 7, hex('#bfe0ff')); R.pset(cx - 5, cy - 9, hex('#bfe0ff')); }
};
// el lápiz rojo (de (x0, y0), en el puño, a la punta (x1, y1))
const lapiz = (x0, y0, x1, y1, c = '#d8483a') => { for (let d = -1; d <= 1; d++) R.linea(x0, y0 + d, x1, y1 + d, d ? K : hex(c)); R.linea(x0, y0, x1, y1, hex(c)); const ux = (x1 - x0) / Math.hypot(x1 - x0, y1 - y0), uy = (y1 - y0) / Math.hypot(x1 - x0, y1 - y0); R.linea(Math.round(x1 - ux * 4), Math.round(y1 - uy * 4), x1, y1, hex('#e8c890')); R.pset(x1, y1, K); };
const p4 = (t) => {
  const o = { encuadre: 'prensa', camara: 'periodico', isla: tramo(t, folleto, P5 - 0.25) }; T.cine(R, t, o);
  // el lápiz rojo del lector: entra, da dos toques en la foto de la máscara y la subraya; al caer el folleto, se aparta
  const entra = ease(tramo(t, P4 + 0.2, impreso)), raya = tramo(t, zulu, zulu + 0.7), fuera = ease(tramo(t, folleto - 0.1, folleto + 0.5));
  const toque = t > impreso && t < zulu ? Math.max(0, Math.sin((t - impreso) * 9)) * 3 : 0;
  const tx = Math.round(lerp(40, 78, entra) + raya * 34 - fuera * 60), ty = Math.round(lerp(150, 120, entra) - toque + fuera * 26);
  if (raya > 0) for (let x = 78; x <= 78 + Math.round(raya * 34); x++) { R.pset(x, 119 + Math.round(Math.sin(x * 0.9)), hex('#d8483a')); R.pset(x, 120 + Math.round(Math.sin(x * 0.9)), hex('#d8483a')); }
  lapiz(tx - 22, ty + 13, tx, ty); T.brazo(R, tx - 52, 192, tx - 31, ty + 15, '#3a5a8a', 1);
  // «many effects»: las chispas saltan de la foto
  if (t > efectosW && t < folleto + 0.3) { const f = (t - efectosW) / 1.0; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 + 0.2, d = 30 + ((f * 34 + i * 7) % 34), x = Math.round(112 + Math.cos(an) * d * 1.15), y = Math.round(86 + Math.sin(an) * d * 0.85), c = hex(['#ffe45a', '#ff8a5a', '#8ad8ff', '#ffffff'][i % 4]); if (x < 64 || y < 26) continue; R.pset(x, y, c); R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); if (i % 3 === 0) { R.pset(x - 2, y, c); R.pset(x + 2, y, c); R.pset(x, y - 2, c); R.pset(x, y + 2, c); } } }
};
// la islita del bocadillo: mar, arena, palmera y sol
const islita = (x, y) => { R.rect(x - 11, y + 3, x + 11, y + 6, hex('#4a9ad8')); R.rect(x - 9, y + 5, x - 5, y + 5, hex('#bfe0ff')); R.rect(x + 4, y + 4, x + 9, y + 4, hex('#bfe0ff')); R.rect(x - 7, y + 2, x + 7, y + 3, hex('#f0d890')); R.rect(x - 5, y + 1, x + 5, y + 1, hex('#f0d890')); R.linea(x, y + 1, x + 2, y - 7, hex('#7a4a22')); R.linea(x + 1, y + 1, x + 3, y - 7, hex('#7a4a22'));
  for (const [a, b] of [[-5, -9], [-4, -5], [8, -9], [8, -5], [2, -12]]) R.linea(x + 2, y - 8, x + 2 + a, y + b, hex('#2e8a3a')); R.disco(x - 8, y - 8, 2, hex('#ffc83a')); };
const p5 = (t) => {
  const contesta = t > serio - 0.6, o = { encuadre: 'prensa', flash: t > isla ? 1 : contesta ? 0.6 : 0.3 }; T.cine(R, t, o);
  // Williams (en su sitio) escucha y contesta muy serio; la moderadora da la palabra y luego se tapa la risa
  const w = R.actor(EL.williams, 120, 142, t, { dir: 1, habla: (t > respuesta - 0.3 && t < preguntan - 0.2 || contesta) && Math.sin(t * 9) > 0, dedo: t > isla - 0.2, quieto: contesta && t < isla - 0.2 });
  R.actor(EL.guionista2JM, 186, 142, t, { dir: -1, dedo: t > preguntan - 0.5 && t < preguntan + 0.5, sorpresa: t > isla, sonrisa: t > serio && t <= isla });
  T.cineDelante(R, t, o);
  // la pregunta sale de los periodistas; la respuesta, encima de él: una isla con palmera
  if (t > preguntan && t < serio) { const en0 = Math.min(1, (t - preguntan) / 0.15), y0 = Math.round(lerp(140, 128, en0)); globo(62, y0, 84, y0 + 22, 80, y0 + 32); R.icono('?', 69, y0 + 4, hex('#3a5ab0'), hex('#c8d4f0'), 2); }
  if (t > isla - 0.35) { const en0 = Math.min(1, (t - isla + 0.35) / 0.18), y0 = Math.round(lerp(96, 82, en0)); globo(100, y0, 132, y0 + 26, 126, y0 + 34); islita(116, y0 + 16); }
};
const p6 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.6, centro: [-76, 24], rosa: [40, 78] });
  R.recorte([8, 8, 311, 171]);
  const TI = hex('#e8dcbc'), CO = hex('#4a3e34'), CL = hex('#c8b890'), poli = (pts, c = TI) => { const q = pts.map((p) => P(p).map(Math.round)); R.poligono(q, c); for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; R.linea(a[0], a[1], b[0], b[1], CO); }
    const xs = q.map((p) => p[0]), ys = q.map((p) => p[1]); for (let y = Math.min(...ys); y <= Math.max(...ys); y++) for (let x = Math.min(...xs); x <= Math.max(...xs); x++) { if (R.pget(x, y) !== TI) continue; const r = Math.sin(x * 127.1 + y * 311.7) * 43758.5453, f = r - Math.floor(r); if (R.pget(x, y - 1) === CO || R.pget(x - 1, y) === CO) R.pset(x, y, CL); else if (f < 0.05) R.pset(x, y, CL); else if (f > 0.985 && R.pget(x, y - 2) === TI) { R.pset(x, y, CO); R.pset(x - 1, y + 1, CO); R.pset(x + 1, y + 1, CO); R.pset(x + 2, y + 2, CL); } } return q; };
  // los vecinos de verdad (Cuba, las Bahamas, La Española, Jamaica), a tinta como el resto del mapa
  { const q = poli([[-84.9, 21.9], [-84.3, 22.6], [-83.2, 23.0], [-82.0, 23.2], [-80.6, 23.1], [-79.3, 22.4], [-77.7, 21.8], [-76.0, 21.2], [-74.8, 20.7], [-74.2, 20.2], [-75.6, 19.9], [-77.7, 19.85], [-77.2, 20.6], [-78.5, 21.0], [-79.9, 21.7], [-81.8, 22.2], [-82.8, 22.5], [-83.9, 22.2], [-84.4, 21.8]]);
    for (let i = 0; i < 9; i++) { const a = q[2 + i], x = a[0] + 2 + (i % 2) * 3, y = a[1] + 3 + (i % 3); R.pset(x, y, CO); R.pset(x - 1, y + 1, CL); R.pset(x + 1, y + 1, CL); }
    poli([[-83.1, 21.9], [-82.6, 21.9], [-82.5, 21.5], [-83.0, 21.45]]);
    poli([[-74.45, 18.35], [-73.4, 19.9], [-71.7, 19.95], [-70.0, 19.7], [-68.4, 18.6], [-68.8, 18.15], [-70.5, 18.25], [-71.4, 17.65], [-72.5, 18.2], [-73.8, 18.05]]); poli([[-78.35, 18.4], [-77.2, 18.5], [-76.25, 18.2], [-76.4, 17.9], [-77.3, 17.75], [-78.2, 18.1]]);
    for (const b of [[[-78.4, 25.1], [-77.75, 25.0], [-77.6, 24.2], [-78.2, 24.3]], [[-79.0, 26.7], [-77.9, 26.78], [-77.9, 26.55], [-78.9, 26.5]], [[-77.5, 26.9], [-77.0, 26.5], [-77.05, 26.0], [-77.35, 26.3]], [[-76.8, 25.55], [-76.15, 25.15], [-76.15, 24.7], [-76.4, 25.1]], [[-75.75, 24.65], [-75.3, 24.2], [-75.45, 24.1]], [[-75.3, 23.65], [-74.85, 23.1], [-75.0, 23.05]], [[-77.55, 25.1], [-77.2, 25.1], [-77.3, 24.98]], [[-76.1, 23.75], [-75.6, 23.45], [-75.8, 23.4]], [[-73.65, 21.1], [-73.0, 21.3], [-73.1, 20.95]], [[-74.3, 22.8], [-73.9, 22.6], [-74.1, 22.5]]]) poli(b); }
  // la ruta de puntos y el avión, desde Florida hasta el sitio de la isla
  const IX = 244, IY = 78, M0 = P([-80.2, 25.8]).map(Math.round), ru = tramo(t, P6 + 0.2, reserva + 0.4), pts = [M0, [Math.round((M0[0] + IX) / 2), Math.min(M0[1], IY) - 22], [IX - 16, IY - 12]];
  const bez = (s) => [0, 1].map((i) => Math.round((1 - s) * (1 - s) * pts[0][i] + 2 * s * (1 - s) * pts[1][i] + s * s * pts[2][i]));
  for (let s = 0; s < ru; s += 0.03) { const [x, y] = bez(s); if (Math.floor(s / 0.03) % 2 === 0) { R.pset(x, y, hex('#c8362e')); R.pset(x + 1, y, hex('#c8362e')); R.pset(x, y + 1, hex('#8a1e1a')); } }
  // la isla que no existe: el lápiz la DIBUJA en el mar vacío (orilla, arena, palmera y olas)
  const dib = tramo(t, P6 + 0.15, caribe + 0.75), TR = [], ink = hex('#4e3a22');
  for (let i = 0; i < 14; i++) { const a0 = i / 14 * 6.283 + 3.3, a1 = (i + 1) / 14 * 6.283 + 3.3, r = (an) => [IX + Math.round(Math.cos(an) * (17 + Math.sin(an * 3) * 2)), IY + Math.round(Math.sin(an) * (5 + Math.cos(an * 2)))]; TR.push([...r(a0), ...r(a1), ink]); }
  TR.push([IX + 1, IY - 1, IX + 4, IY - 9, hex('#6a4420')], [IX + 4, IY - 9, IX + 3, IY - 17, hex('#6a4420')]);
  for (const [dx, dy] of [[-9, -19], [-7, -12], [9, -21], [12, -14], [3, -24]]) TR.push([IX + 3, IY - 17, IX + 3 + dx, IY + dy, hex('#2e7a3a')]);
  for (const [dx, dy] of [[-27, 5], [22, 8], [-8, 11], [26, -3]]) TR.push([IX + dx, IY + dy, IX + dx + 3, IY + dy - 1, hex('#3a6a9a')], [IX + dx + 3, IY + dy - 1, IX + dx + 6, IY + dy, hex('#3a6a9a')]);
  const n = dib * TR.length, hechos = Math.floor(n);
  if (hechos >= 14) { R.poligono(TR.slice(0, 14).map((s) => [s[0], s[1]]), hex('#f0dc9c')); for (let i = -12; i <= 12; i += 3) R.pset(IX + i, IY + 2 + (i & 1), hex('#d8bc70')); }
  let pen = [IX - 17, IY];
  for (let i = 0; i < TR.length && i <= hechos; i++) { const [ax, ay, bx, by, c] = TR[i], f = i < hechos ? 1 : n - hechos, ex = Math.round(lerp(ax, bx, f)), ey = Math.round(lerp(ay, by, f)); R.linea(ax, ay, ex, ey, c); if (i >= 14 && i < 21) R.linea(ax + 1, ay, ex + 1, ey, c); pen = [ex, ey]; }
  if (hechos >= 21) { R.pset(IX + 2, IY - 15, hex('#4e2e12')); R.pset(IX + 5, IY - 15, hex('#4e2e12')); }
  // «reserva pronto»: la chincheta cae en la isla y se amontonan los billetes de avión
  T.chincheta(R, IX - 8, IY + 2, t, hex('#c8362e'), { baja: tramo(t, caribe + 0.8, caribe + 1.1), pulso: true });
  for (let i = 0; i < 3; i++) { const b = ease(tramo(t, reserva - 0.25 + i * 0.4, reserva + 0.15 + i * 0.4)); if (b <= 0) continue; const x = Math.round(lerp(330, 246 + i * 9, b)), y = Math.round(lerp(140, 98 + i * 8, b) - Math.sin(b * Math.PI) * 8);
    R.rect(x + 1, y + 1, x + 31, y + 15, hex('#3a4a5a')); R.rect(x - 1, y - 1, x + 30, y + 14, K); R.rect(x, y, x + 29, y + 13, hex('#f6efd8')); R.rect(x, y, x + 29, y + 2, hex(['#c8362e', '#3a6ab0', '#2e8a5a'][i])); for (let j = 1; j < 13; j += 2) R.pset(x + 21, y + j, K);
    R.rect(x + 3, y + 5, x + 12, y + 5, hex('#8a8698')); R.rect(x + 3, y + 8, x + 9, y + 8, hex('#8a8698')); R.rect(x + 3, y + 11, x + 14, y + 11, hex('#8a8698')); R.rect(x + 23, y + 6, x + 27, y + 7, K); R.rect(x + 25, y + 4, x + 25, y + 9, K); R.pset(x + 23, y + 5, K); }
  // el avión, en la punta de la ruta
  { const gi = (t - reserva - 0.4) * 2.2, [x, y] = ru < 1 ? bez(ru) : [Math.round(IX - 2 - Math.cos(gi) * 14), Math.round(IY - 24 - Math.sin(gi) * 6)], [x2, y2] = bez(Math.min(1, ru + 0.05)), baja = y2 > y ? 1 : y2 < y ? -1 : 0, W = hex('#f4f4f0');
    if (ru > 0) { R.rect(x - 5, y - 2 + baja, x + 4, y + 1 + baja, K); R.rect(x - 4, y - 1 + baja, x + 3, y + baja, W); R.rect(x + 4, y - 1 + baja * 2, x + 5, y + baja * 2, K); R.rect(x - 2, y - 5, x, y + 4, K); R.rect(x - 1, y - 4, x - 1, y + 3, W); R.rect(x - 6, y - 4 + baja, x - 5, y - 1 + baja, K); R.pset(x + 2, y - 1 + baja, hex('#3a6ab0')); } }
  // la mano del lápiz (entra por la derecha en diagonal) mientras dibuja; luego se retira
  { const fuera = ease(tramo(t, caribe + 0.8, caribe + 1.5)), hx = pen[0] + Math.round(fuera * 80), hy = pen[1] + Math.round(fuera * 46);
    if (fuera < 1) { lapiz(hx + 20, hy + 11, hx, hy, '#e8b830'); T.brazo(R, Math.max(334, hx + 60), hy + 14 + Math.round((Math.max(334, hx + 60) - hx - 33) * 0.62), hx + 33, hy + 14, '#8a3a2e', -1); } }
  R.recorte(null);
};
const efectos = [[0.3, 'viento'], [P2 + 0.2, 'papel'], [noImporta, 'publico'], [s65, 'pop'], [rueda, 'maquina'], [s260, 'brillo'], [mundo, 'pop'], [P4 + 0.3, 'papel'], [impreso + 0.2, 'golpecito'], [zulu, 'lapiz'], [efectosW, 'brillo'], [folleto + 0.2, 'whoosh'], [preguntan, 'pop'], [isla + 0.1, 'flash'], [P6 + 0.2, 'lapiz'], [caribe + 1.1, 'toc'], [reserva, 'papel'], [reserva + 0.8, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1995 });
''')
