E = {}

# ── piezas pequeñas comunes a las escenas de este módulo (se repiten dentro de cada cuerpo) ──
COMUN = r'''
const K = T.C;
// un ganso blanco de 10 px que anda (pico y patas naranjas); dir 1 mira a la derecha
const ganso = (x, y, t, dir = 1, k = 0) => {
  const { rect, pset } = R, X = (i) => Math.round(x + dir * i), pa = Math.floor(t * 6 + k) % 2, cab = Math.sin(t * 3 + k) > 0.6 ? 1 : 0;
  rect(Math.min(X(-5), X(4)), y - 6, Math.max(X(-5), X(4)), y - 2, T.C.k);
  rect(Math.min(X(-4), X(3)), y - 5, Math.max(X(-4), X(3)), y - 3, hex('#f4f2ec')); rect(Math.min(X(-4), X(3)), y - 3, Math.max(X(-4), X(3)), y - 3, hex('#c8c4bc'));
  pset(X(-5), y - 6, hex('#c8c4bc')); pset(X(-2), y - 4, hex('#dcd8d0'));
  for (let j = 0; j < 5; j++) { pset(X(3), y - 6 - j + cab, T.C.k); pset(X(4), y - 6 - j + cab, hex('#f4f2ec')); pset(X(5), y - 6 - j + cab, T.C.k); }
  rect(Math.min(X(3), X(6)), y - 12 + cab, Math.max(X(3), X(6)), y - 10 + cab, T.C.k); rect(Math.min(X(4), X(5)), y - 11 + cab, Math.max(X(4), X(5)), y - 10 + cab, hex('#f4f2ec'));
  pset(X(5), y - 11 + cab, T.C.k); pset(X(7), y - 10 + cab, hex('#f08a2a')); pset(X(8), y - 10 + cab, hex('#e06a1a'));
  pset(X(-1 + pa), y - 1, hex('#e06a1a')); pset(X(1 - pa), y - 1, hex('#e06a1a')); pset(X(-1 + pa), y, hex('#c85a10')); pset(X(1 - pa), y, hex('#c85a10'));
};
// destello de cuatro puntas
const destello = (x, y, n, c = hex('#fff8d0')) => { R.pset(x, y, hex('#ffffff')); for (let i = 1; i <= n; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
'''

E['jh-panem'] = ('Panem', '''// JH-PANEM (frases 6–7), Juegos 74, cartela «74». Cuatro planos:
// 1. la sala del mapa del Capitolio: un vigilante entra y señala la mesa de Panem; con «Panem» salen ondas doradas del
//    Capitolio; con «disaster» las tres pantallas de la pared parpadean en rojo con «!»; una capitolina asiente; los trenes
//    suben hacia la capital (corta en «A rich»);
// 2. la avenida del Capitolio: dos capitolinos de compras (ella gira con su paquete en «colorful», él abre los brazos en
//    «the Capitol»); con «surrounded by poor districts» entra un minero gris empujando un carro de carbón: él se ríe y lo
//    señala; en «work» se cae un trozo de carbón y el minero se agacha a cogerlo y sigue (corta en «Long ago»);
// 3. la Veta hace mucho (luz de día, un velo sepia): dos vecinos levantan una bandera roja en «rebelled»; en «lost» entran
//    tres agentes de la paz, la bandera cae y ellos bajan los brazos; en «punishment» un agente clava en el farol el bando
//    con la urna; los vecinos retroceden (corta en «hands over»);
// 4. la plaza del 12 el día de la cosecha: la escolta saca una papeleta de la urna; «one boy» sube el chico por la escalera
//    y «one girl» la chica; en «tributes» el pan con ojos salta dentro de la urna de la derecha (gag 2) y se esconde entre
//    las papeletas; en «Hunger Games» suena el reloj y asoma temblando.''', COMUN + r'''
const A = (f) => en('panem', f), B = (f) => en('castigo', f);
const P2 = A(0.393), P3 = B(0), P4 = B(0.504);
const PANEM = A(0), DESASTRE = A(0.272), COLOR = A(0.495), CAPITOL = A(0.649), POBRES = A(0.819), TRABAJA = A(0.918);
const REBELA = B(0.093), PIERDE = B(0.154), CASTIGO = B(0.268), CHICO = B(0.575), CHICA = B(0.669), TRIBUTOS = B(0.779), JUEGOS = B(0.907);

const p1 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'mapa', trenes: 0.5 + 0.5 * tramo(t, A(0.6), A(1)) });
  const [cx, cy] = g.capitol;
  // las ondas doradas que salen del Capitolio con «Panem»
  for (const d of [0, 0.45, 0.9]) { const u = tramo(t, PANEM + d, PANEM + d + 1.1); if (u > 0 && u < 1) { const rx = 6 + u * 46, ry = 3 + u * 16, c = u < 0.5 ? hex('#ffe070') : hex('#c89a30');
    for (let a = 0; a < 120; a++) { const an = a / 120 * Math.PI * 2; const x = Math.round(cx + Math.cos(an) * rx), y = Math.round(cy + Math.sin(an) * ry); R.pset(x, y, c); R.pset(x, y + 1, c); } } }
  // la alarma del desastre en las pantallas de la pared
  const al = t > DESASTRE && t < DESASTRE + 1.2 && Math.floor(t * 6) % 2 === 0;
  if (al) for (const [a, b] of [[30, 98], [134, 186], [214, 272]]) { for (let y = 19; y <= 51; y++) for (let x = a; x <= b; x++) if ((x + y) % 2) R.pset(x, y, hex('#c8202a')); R.icono('!', Math.round((a + b) / 2) - 3, 26, hex('#fff0f0'), hex('#5a0a10'), 3); }
  // el vigilante entra y señala la mesa; la capitolina de la derecha asiente y se asusta con la alarma
  const u = tramo(t, 1.3, PANEM + 0.3), vx = Math.round(lerp(-18, 16, u));
  const va = R.actor(EL.vigilante, vx, 170, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t > PANEM + 0.3 && t < DESASTRE - 0.2 ? [vx + 26, 140] : false, sorpresa: t > DESASTRE && t < DESASTRE + 0.9, habla: t > PANEM + 0.4 && t < A(0.2) && Math.sin(t * 8) > 0 });
  R.actor(EL.capitolino2, 288, 170, t, { dir: -1, sonrisa: t < DESASTRE || t > DESASTRE + 0.9, sorpresa: t > DESASTRE && t < DESASTRE + 0.9, salto: t > DESASTRE && t < DESASTRE + 0.25 ? 2 : 0, dedo: t > A(0.12) && t < A(0.22) });
  T.capitolioDelante(R, t, { encuadre: 'mapa' });
  // el puntero de luz del vigilante hasta el Capitolio
  if (t > PANEM + 0.3 && t < DESASTRE - 0.2) { const [hx, hy] = va.mano, n = 40; R.rect(hx - 1, hy - 1, hx + 1, hy + 1, T.C.k); R.pset(hx, hy, hex('#c8c8d0'));
    for (let i = 2; i <= n; i++) { const k = i / n, x = Math.round(lerp(hx, cx, k)), y = Math.round(lerp(hy, cy, k)); if ((i + Math.floor(t * 20)) % 3) R.pset(x, y, hex('#ff6ac8')); }
    R.disco(cx, cy, 2, hex('#ff9ad8')); R.pset(cx, cy, hex('#ffffff')); }
};

// el carro de carbón (x: el borde izquierdo, y: el suelo), con la rueda que gira
const carroCarbon = (x, y, t, giro, carga = 1) => {
  const { rect, pset, disco } = R;
  rect(x, y - 16, x + 26, y - 6, T.C.k); rect(x + 1, y - 15, x + 25, y - 7, hex('#6a5038'));
  for (let i = x + 2; i < x + 25; i += 5) { rect(i, y - 15, i, y - 7, hex('#4a3626')); pset(i + 2, y - 11, hex('#8a6a4a')); }
  rect(x + 1, y - 15, x + 25, y - 15, hex('#8a6a4a'));
  if (carga > 0) for (let k = 0; k < 11; k++) { const bx = x + 3 + (k * 7) % 21, by = y - 17 - (k % 3) - (k > 6 ? 2 : 0); rect(bx, by, bx + 3, by + 2, hex('#1c1c22')); pset(bx + 1, by, hex('#5a5a66')); }
  const cx = x + 13, cy = y - 4; disco(cx, cy, 4, T.C.k); disco(cx, cy, 3, hex('#5a4a3a'));
  for (let k = 0; k < 4; k++) { const a = giro + k * Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 3), Math.round(cy + Math.sin(a) * 3), hex('#2a2018')); }
  pset(cx, cy, hex('#a8a8b0'));
  // las varas del carro, hacia la derecha (el minero empuja desde ahí)
  R.linea(x + 26, y - 12, x + 33, y - 15, T.C.k); R.linea(x + 26, y - 11, x + 33, y - 14, hex('#6a5038'));
};
const MINERO = { ...EL.tributoChico, pal: { ...EL.tributoChico.pal, C: hex('#5a5a62'), c: hex('#3e3e46'), F: hex('#2e2e34') } };
const p2 = (t) => {
  T.capitolio(R, t, { encuadre: 'avenida' });
  // ella: de compras con su paquete; gira sobre sí misma con «colorful»
  const gira = t > COLOR && t < COLOR + 0.8, dirElla = gira ? (Math.floor(t * 8) % 2 ? 1 : -1) : t > POBRES + 0.3 ? 1 : -1;
  const ella = R.actor(EL.capitolino2, 98, 166, t, { dir: dirElla, sostiene: true, sonrisa: t < POBRES + 0.3, sorpresa: t > POBRES + 0.3 && t < TRABAJA + 0.6, salto: gira ? 2 : 0 });
  { const [mx, my] = ella.mano; R.rect(mx - 4, my - 3, mx + 4, my + 4, T.C.k); R.rect(mx - 3, my - 2, mx + 3, my + 3, hex('#e85aa8')); R.rect(mx, my - 2, mx, my + 3, hex('#f8e070')); R.rect(mx - 3, my, mx + 3, my, hex('#f8e070')); R.pset(mx - 1, my - 4, hex('#f8e070')); R.pset(mx + 1, my - 4, hex('#f8e070')); }
  if (gira) for (let i = 0; i < 6; i++) { const a = t * 9 + i; destello(Math.round(105 + Math.cos(a) * 14), Math.round(146 + Math.sin(a) * 8), 1, hex('#f8a0d8')); }
  // él: llega paseando, abre los brazos con «the Capitol» y luego se ríe del minero y lo señala
  const v = tramo(t, P2, CAPITOL - 0.3), x1 = Math.round(lerp(14, 58, v));
  R.actor(EL.capitolino1, x1, 166, t, { dir: 1, anda: v > 0 && v < 1, brazos: t > CAPITOL && t < CAPITOL + 0.9, sonrisa: true, dedo: t > POBRES + 0.2 && t < TRABAJA + 0.8, habla: t > POBRES + 0.2 && t < TRABAJA && Math.sin(t * 10) > 0 });
  // el minero del 12 empuja el carro de carbón de derecha a izquierda, por delante
  const w = tramo(t, A(0.68), TRABAJA), w2 = tramo(t, TRABAJA + 0.9, P3), mx = Math.round(lerp(350, 236, w) - lerp(0, 56, w2));
  const agacha = t > TRABAJA + 0.2 && t < TRABAJA + 0.9, cx = mx - 33 + (agacha ? 0 : 0);
  carroCarbon(cx, 176, t, -(lerp(0, 9, w) + lerp(0, 4, w2)) * 2);
  const m = R.actor(MINERO, mx, 176 + (agacha ? 3 : 0), t, { dir: -1, anda: (w > 0 && w < 1) || (w2 > 0 && w2 < 1), triste: true, sostiene: agacha ? [mx - 10, 176] : [mx - 4, 162] });
  // el trozo de carbón que se cae en «work» y que él recoge
  const cae = tramo(t, TRABAJA, TRABAJA + 0.25);
  if (t > TRABAJA && !(t > TRABAJA + 0.75)) { const bx = Math.round(cx + 18 - cae * 6), by = Math.round(lerp(158, 174, cae * cae)); R.rect(bx, by, bx + 3, by + 2, hex('#1c1c22')); R.pset(bx + 1, by, hex('#6a6a76')); }
  if (t > TRABAJA + 0.75 && t < TRABAJA + 0.9) { const [hx, hy] = m.mano; R.rect(hx - 1, hy - 1, hx + 2, hy + 1, hex('#1c1c22')); }
  // el polvo de carbón que deja el carro
  for (let i = 0; i < 6; i++) { const u = ((t * 1.5 + i / 6) % 1); if (w > 0) R.pset(Math.round(cx + 30 + u * 20 + i), Math.round(176 - u * 6), u < 0.5 ? hex('#5a5a62') : hex('#8a8a92')); }
};

// el bando: un papel clavado al farol con la urna (sin letras)
const bando = (x, y, u) => {
  if (u <= 0) return;
  const { rect, pset } = R, h = Math.round(32 * Math.min(1, u * 1.6));
  rect(x - 13, y, x + 13, y + h, T.C.k); rect(x - 12, y + 1, x + 12, y + h - 1, hex('#ece4cc')); rect(x - 12, y + h - 2, x + 12, y + h - 1, hex('#c8bc98'));
  if (h > 28) { rect(x - 11, y + 2, x + 11, y + 4, hex('#8a2a2a')); T.PIEZAS_JH.urna(R, x, y + 28, { s: 1, nivel: 0.9 }); for (const [a, b] of [[x - 11, y + 8], [x + 9, y + 8]]) { pset(a, b, hex('#3a3a46')); pset(a + 1, b + 1, hex('#3a3a46')); } pset(x - 12, y + 1, hex('#5a5a66')); pset(x + 12, y + 1, hex('#5a5a66')); }
};
const p3 = (t) => {
  T.distrito(R, t, { encuadre: 'calle', luz: 'dia' });
  // los vecinos: levantan los brazos y la bandera roja, la pierden y retroceden hacia la izquierda
  const arriba = t > REBELA - 0.2 && t < PIERDE + 0.15, atras = tramo(t, PIERDE + 0.3, PIERDE + 1), atras2 = tramo(t, CASTIGO + 0.2, CASTIGO + 0.8);
  const mv = (atras > 0 && atras < 1) || (atras2 > 0 && atras2 < 1), dx = Math.round(-atras * 16 - atras2 * 10);
  const op = (k) => ({ dir: 1, brazos: arriba && k !== 2, enfado: arriba, triste: t > PIERDE + 0.3 && !(t > CASTIGO && t < CASTIGO + 0.7), sorpresa: t > CASTIGO && t < CASTIGO + 0.7, anda: mv });
  R.actor(EL.vendedoraHob, 74 + dx, 158, t, op(0));
  R.actor(EL.madreHaymitch, 100 + dx, 161, t, op(1));
  R.actor(EL.hermanoHaymitch, 150 + dx, 163, t, { ...op(3), salto: arriba && Math.sin(t * 10) > 0.3 ? 2 : 0 });
  const xv2 = 124 + dx, ch = R.actor(EL.tributoChico, xv2, 160, t, { ...op(2), sostiene: t < PIERDE + 0.15 ? [xv2 + 17, 132] : false });
  // la bandera: en el palo, en alto, ondea; cae al suelo en «lost»
  { const cae = tramo(t, PIERDE + 0.1, PIERDE + 0.45), [hx, hy] = t < PIERDE + 0.15 ? ch.mano : [xv2 + 18, 136];
    if (cae < 1) { const ex = Math.round(hx + cae * 10), ey = Math.round(hy + cae * 20); R.linea(ex, ey + 6, ex + Math.round(cae * 14), ey - 28 + Math.round(cae * 22), T.C.k); R.linea(ex + 1, ey + 6, ex + 1 + Math.round(cae * 14), ey - 28 + Math.round(cae * 22), hex('#8a6a4a'));
      if (cae === 0) for (let j = 0; j < 14; j++) { const ww = 20 + Math.round(Math.sin(t * 9 + j * 0.5) * 2); for (let i = 0; i <= ww; i++) { const yy = ey - 28 + j + Math.round(Math.sin(t * 8 - i * 0.4) * 1.5); R.pset(ex + 2 + i, yy, j === 0 || j === 13 || i === ww ? hex('#6a1414') : (i + j) % 7 === 0 ? hex('#e04a3a') : hex('#c8302a')); } } }
    else { R.rect(xv2 + 14, 160, xv2 + 38, 162, hex('#c8302a')); R.rect(xv2 + 14, 163, xv2 + 38, 163, hex('#6a1414')); R.linea(xv2 + 8, 164, xv2 + 34, 159, hex('#6a4a2a')); } }
  // los tres agentes entran por la derecha en «lost»; el primero clava el bando en el farol de la derecha en «punishment»
  for (let k = 2; k >= 0; k--) { const u = tramo(t, PIERDE + k * 0.15, PIERDE + 1 + k * 0.15); let x = Math.round(lerp(330 + k * 16, [244, 196, 220][k], u)), mov = u > 0 && u < 1;
    const clava = k === 0 && t > CASTIGO - 0.1 && t < CASTIGO + 0.7;
    const ag = R.actor(EL.agentePaz, x, 160 + k, t, { dir: k === 0 && t > CASTIGO - 0.3 ? 1 : -1, anda: mov, sostiene: clava ? [266, 124] : false, dedo: k === 1 && t > B(0.38) && t < B(0.5), enfado: true });
    if (clava) { const [mx, my] = ag.mano; R.rect(mx - 1, my - 4, mx + 1, my - 1, hex('#5a5a66')); R.rect(mx - 2, my - 5, mx + 2, my - 5, hex('#3a3a46')); } }
  bando(266, 104, tramo(t, CASTIGO, CASTIGO + 0.3));
  if (t > CASTIGO && t < CASTIGO + 0.8 && Math.floor(t * 10) % 2) destello(266, 104, 3);
  // hace mucho: un velo sepia sobre todo
  T.tinte(R, 0, 179, [150, 120, 80], 0.22);
};

const p4 = (t) => {
  const g = T.distrito(R, t, { encuadre: 'plaza', luz: 'dia', urna: 1 });
  // la escolta saca una papeleta de la urna de la izquierda y la enseña
  const saca = t < P4 + 0.6, ens = t >= P4 + 0.6 && t < CHICA + 0.4;
  const ef = R.actor(EL.effie, 100, 118, t, { dir: 1, sostiene: saca ? [118, 104] : ens ? [116, 88] : false, habla: t > P4 + 0.7 && t < CHICA + 0.6 && Math.sin(t * 9) > 0, sonrisa: true, sorpresa: t > TRIBUTOS + 0.4 && t < TRIBUTOS + 1.2 });
  if (saca || ens) { const [hx, hy] = ef.mano; R.rect(hx - 1, hy - 5, hx + 3, hy - 1, T.C.k); R.rect(hx, hy - 4, hx + 2, hy - 2, hex('#f8f4e8')); }
  // el chico y la chica suben por la escalera de la derecha y se colocan en sus marcas
  const sube = (d, ini, x1, desde) => { const a = tramo(t, ini, ini + 0.45), b = tramo(t, ini + 0.45, ini + 1.1); if (t < ini) return;
    const x = Math.round(b > 0 ? lerp(212, x1, b) : 214), y = Math.round(b > 0 ? 118 : lerp(desde, 118, a));
    R.actor(d, x, y, t, { dir: -1, anda: (a > 0 && a < 1) || (b > 0 && b < 1), triste: b >= 1 }); };
  sube(EL.tributoChico, CHICO - 0.3, 168, 138); sube(EL.tributoChica, CHICA - 0.2, 150, 138);
  // gag 2: el pan, junto a la urna de la derecha, salta dentro y se esconde entre las papeletas
  const [ux, uy] = g.urnas ? (Array.isArray(g.urnas[1]) ? g.urnas[1] : [196, 99]) : [196, 99];
  const s0 = TRIBUTOS - 0.15, u = tramo(t, s0, s0 + 0.55);
  const llega = tramo(t, P4 + 0.2, P4 + 1.4);
  if (u <= 0) T.pan(R, Math.round(lerp(232, 206, llega)), 118, t, { dir: -1, anda: llega > 0 && llega < 1, expresion: t > CHICO && t < CHICO + 0.8 ? 'susto' : 'normal' });
  else if (u < 1) T.pan(R, Math.round(lerp(206, ux, u)), Math.round(lerp(118, uy + 6, u) - Math.sin(u * Math.PI) * 18), t, { dir: -1 });
  else { const asoma = t > JUEGOS;
    T.pan(R, ux, uy + 13 - (asoma ? 3 : 0), t, { dir: -1, esconde: asoma ? 0 : 1, expresion: asoma ? 'susto' : 'normal', migas: false });
    // las papeletas que le caen encima
    for (let i = 0; i < 9; i++) { const px = ux - 6 + (i * 5) % 13, py = uy + 6 + (i * 3) % 7 + (asoma ? 0 : 0); R.rect(px, py, px + 2, py + 1, hex('#f8f4e8')); R.pset(px, py + 1, hex('#c8c4b8')); } }
  if (t > TRIBUTOS + 0.4 && t < TRIBUTOS + 1.2) R.bocadillo(ef.cabeza[0], ef.cabeza[1] - 4, { icono: '!' });
  if (u > 0.85 && u < 1 + 0.6) for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.3, r = 4 + (t - s0 - 0.45) * 34; R.rect(Math.round(ux + Math.cos(a) * r), Math.round(uy - 2 + Math.sin(a) * r * 0.6), Math.round(ux + Math.cos(a) * r) + 1, Math.round(uy - 2 + Math.sin(a) * r * 0.6), hex('#f8f4e8')); }
};

const efectos = [[PANEM + 0.05, 'brillo'], [DESASTRE, 'aviso'], [COLOR, 'brillo'], [A(0.78), 'carro'], [TRABAJA + 0.1, 'golpecito'], [REBELA, 'publico'], [PIERDE + 0.1, 'silbato'], [CASTIGO + 0.05, 'golpecito'], [P4 + 0.3, 'papel'], [TRIBUTOS - 0.1, 'boing'], [JUEGOS, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '74', efectos, año: 74 });
''')

E['jh-katniss'] = ('Katniss', '''// JH-KATNISS (frases 8–9), Juegos 74. Cuatro planos:
// 1. el plató del Capitolio: Caesar con el micrófono abre los brazos en «TV show» y el público aplaude; la pantalla gigante
//    pasa de la cámara que emite a los retratos, que se encienden uno a uno hasta 24 en «24», con el «24» dorado debajo;
//    la audiencia sube (corta en «only»);
// 2. el Quemador del 12: la gente mira una tele vieja sobre una caja: en «only one» se apagan las 24 lucecitas y queda una,
//    dorada; se entristecen; en «74th» la pantalla pone «74» y la chica la señala (corta en «Katniss»);
// 3. el escenario de la cosecha: Prim, llamada, camina hacia el micrófono; Katniss (trenza y chaqueta) llega corriendo,
//    levanta la mano en «volunteers» y se pone delante de su hermana; Effie se sorprende y aplaude; en «Peeta» sube él por
//    la derecha y se coloca a su lado (corta en «defies»);
// 4. el desfile de noche (fondo local): el carro de fuego entra con sus dos caballos negros; Katniss y Peeta con las capas
//    de llamas de tela; en «rules» se dan la mano y la levantan juntos; las gradas saltan, flashes y fuegos artificiales.''', COMUN + r'''
const C1 = (f) => en('concurso', f), V = (f) => en('voluntaria', f);
const P2 = C1(0.804), P3 = V(0.2), P4 = V(0.643);
const SHOW = C1(0.221), N24 = C1(0.434), UNA = C1(0.837), N74 = V(0.022), VOLUNTARIA = V(0.3), HERMANA = V(0.4), PEETA = V(0.569), REGLAS = V(0.718), PAIS = V(0.894);

// la pantalla del plató antes del «24»: la cámara que emite (un icono grande) con las ondas
const emite = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x + y) % 2 ? hex('#2a1a52') : hex('#3a2470'));
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  R.icono('camara', cx - 10, cy - 9, hex('#f8f0ff'), hex('#1a0e30'), 3);
  for (let k = 0; k < 3; k++) { const r = 24 + ((t * 18 + k * 9) % 27); for (let a = -0.7; a <= 0.7; a += 0.04) { R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.8), hex('#e85aa8')); R.pset(Math.round(cx - Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.8), hex('#3ad0c8')); } }
  if (Math.floor(t * 2) % 2) { R.disco(x0 + 10, y0 + 8, 3, hex('#ff3040')); R.disco(x0 + 10, y0 + 8, 1, hex('#ffb0b8')); }
};
const p1 = (t) => {
  const n = Math.max(1, Math.round(24 * tramo(t, N24 - 0.1, N24 + 0.8)));
  T.capitolio(R, t, { encuadre: 'plato', pantalla: t < N24 - 0.1 ? emite : 'retratos', n, aplausos: lerp(0.35, 1, tramo(t, SHOW - 0.2, SHOW + 0.3)), audiencia: lerp(0.3, 0.95, tramo(t, 0.4, P2)) });
  const e = tramo(t, N24 + 0.6, N24 + 0.9);
  if (e > 0) { const yy = Math.round(lerp(126, 116, e)); R.numero('24', 160, yy, { tam: 16, centro: true }); if (Math.floor(t * 8) % 3 === 0) destello(178, yy - 14, 2); }
  R.actor(EL.caesar, 126, 150, t, { dir: 1, habla: t < N24 + 1.6 && Math.sin(t * 9) > -0.2, brazos: t > SHOW - 0.1 && t < SHOW + 0.8, dedo: t > N24 - 0.1 && t < N24 + 1.2, sonrisa: true, salto: t > SHOW - 0.1 && t < SHOW + 0.15 ? 2 : 0 });
  // un capitolino de la primera fila se levanta y aplaude
  R.actor(EL.capitolino1, 214, 158, t, { dir: -1, brazos: t > SHOW && Math.sin(t * 12) > 0, sonrisa: true, salto: t > SHOW && t < SHOW + 1.4 && Math.sin(t * 12) > 0.5 ? 2 : 0 });
};

// la tele vieja del Quemador: 24 lucecitas que se apagan hasta que queda una, y luego el 74
const teleVieja = (t) => {
  const { rect, pset } = R, x0 = 134, y0 = 104, x1 = 188, y1 = 136;
  // la caja de madera
  rect(140, 136, 182, 160, T.C.k); rect(141, 137, 181, 159, hex('#8a6a4a')); for (let y = 140; y < 159; y += 5) rect(141, y, 181, y, hex('#5a4030')); rect(141, 137, 143, 159, hex('#a8885e')); rect(160, 137, 160, 159, hex('#5a4030'));
  // el mueble de la tele, la antena y los botones
  R.linea(150, y0, 140, 86, T.C.k); R.linea(172, y0, 184, 88, T.C.k); R.pset(140, 86, hex('#c8c8d0')); R.pset(184, 88, hex('#c8c8d0'));
  rect(x0, y0, x1, y1, T.C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#5a4434')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#7a6050'));
  const sx0 = x0 + 4, sy0 = y0 + 4, sx1 = x1 - 12, sy1 = y1 - 4;
  rect(sx0 - 1, sy0 - 1, sx1 + 1, sy1 + 1, hex('#1a1418'));
  const apaga = tramo(t, UNA - 0.1, UNA + 0.5), num = t > N74;
  const fondo = num ? hex('#2a3a5a') : hex('#1e2a3e');
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) pset(x, y, (y + Math.floor(t * 20)) % 5 === 0 ? hex('#34465e') : fondo);
  if (!num) for (let k = 0; k < 24; k++) { const i = k % 6, j = Math.floor(k / 6), x = sx0 + 2 + i * 5, y = sy0 + 2 + j * 5, ultima = k === 15;
    const on = ultima || ((k * 7919) % 24) / 24 >= apaga;
    if (on) { const c = ultima && apaga > 0.9 ? hex('#ffd040') : hex('#e8e4d0'); rect(x, y, x + 2, y + 2, c); pset(x + 1, y, hex('#3a2a20')); if (ultima && apaga > 0.9) { pset(x - 1, y + 1, hex('#ffe890')); pset(x + 3, y + 1, hex('#ffe890')); pset(x + 1, y - 1, hex('#ffe890')); pset(x + 1, y + 3, hex('#ffe890')); } }
    else rect(x, y, x + 2, y + 2, hex('#2e3a4e')); }
  else { const e = tramo(t, N74, N74 + 0.25); R.recorte([sx0, sy0, sx1, sy1]); R.numero('74', Math.round((sx0 + sx1) / 2), sy1 - 4 + Math.round((1 - e) * 10), { tam: 16, centro: true }); R.recorte(null); }
  // el reflejo del cristal y los mandos
  for (let k = 0; k < 5; k++) pset(sx0 + 1 + k, sy0 + 1, hex('#8aa0c0'));
  for (const yy of [y0 + 7, y0 + 15]) { R.disco(x1 - 6, yy, 2, T.C.k); R.disco(x1 - 6, yy, 1, hex('#c8a870')); }
  for (let yy = y0 + 21; yy < y1 - 3; yy += 2) rect(x1 - 9, yy, x1 - 3, yy, hex('#3a2a20'));
  // la luz de la pantalla en el suelo
  for (let y = 161; y < 170; y++) for (let x = 130 + (y - 161); x < 192 - (y - 161); x++) if ((x + y) % 3 === 0) { const c = R.pget(x, y); if (c) pset(x, y, num ? hex('#6a7a9a') : hex('#5a6a7a')); }
};
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'quemador', luz: 'dia' });
  teleVieja(t);
  const triste = t > UNA + 0.3;
  R.actor(EL.vendedoraHob, 96, 160, t, { dir: 1, triste, sorpresa: t > UNA && t < UNA + 0.3 });
  R.actor(EL.hermanoHaymitch, 116, 162, t, { dir: 1, triste, salto: t > N74 && t < N74 + 0.2 ? 2 : 0 });
  R.actor(EL.tributoChica, 196, 161, t, { dir: -1, triste: triste && t < N74, dedo: t > N74 + 0.1 && t < N74 + 1.2, sorpresa: t > N74 && t < N74 + 1.2 });
  R.actor(EL.tributoChico, 214, 160, t, { dir: -1, triste, habla: t > N74 + 0.4 && t < N74 + 1.2 && Math.sin(t * 9) > 0 });
  // un agente de la paz pasa por el fondo, por el pasillo
  { const u = tramo(t, P2 + 0.3, P3); if (u > 0 && u < 1) R.actor(EL.agentePaz, Math.round(lerp(60, 250, u)), 140, t, { dir: 1, anda: true }); }
};

const p3 = (t) => {
  T.distrito(R, t, { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 1 });
  // Effie en el micrófono
  R.actor(EL.effie, 166, 146, t, { dir: -1, habla: t < VOLUNTARIA - 0.1 && Math.sin(t * 9) > 0, sorpresa: t > VOLUNTARIA && t < VOLUNTARIA + 0.8, brazos: t > HERMANA + 0.2 && t < HERMANA + 1 && Math.sin(t * 12) > -0.3, sonrisa: t > HERMANA });
  // Prim camina hacia el micrófono hasta que la para su hermana; luego queda detrás
  const pa = tramo(t, P3, VOLUNTARIA), pb = tramo(t, HERMANA + 0.1, HERMANA + 0.6);
  const xp = Math.round(lerp(lerp(116, 134, pa), 102, pb));
  R.actor(EL.prim, xp, 143, t, { dir: pb > 0 ? -1 : 1, anda: (pa > 0 && pa < 1 && t < VOLUNTARIA - 0.2) || (pb > 0 && pb < 1), triste: t < VOLUNTARIA || t > HERMANA + 0.4, sorpresa: t > VOLUNTARIA && t < HERMANA + 0.4 });
  // Katniss llega corriendo por la izquierda, levanta la mano y se pone delante
  const ka = tramo(t, P3, VOLUNTARIA - 0.1), kb = tramo(t, HERMANA + 0.1, HERMANA + 0.6), xk = Math.round(lerp(lerp(52, 92, ka), 118, kb));
  R.actor(EL.katniss, xk, 147, t, { dir: t > HERMANA + 0.6 && t < HERMANA + 1.3 ? -1 : 1, anda: (ka > 0 && ka < 1) || (kb > 0 && kb < 1), dedo: t > VOLUNTARIA - 0.05 && t < HERMANA + 0.2, enfado: t > VOLUNTARIA && t < HERMANA + 0.5 });
  // Peeta sube por la derecha y se coloca a su lado
  const pe = tramo(t, PEETA - 0.5, PEETA + 0.2);
  if (pe > 0) R.actor(EL.peeta, Math.round(lerp(250, 192, pe)), 147, t, { dir: -1, anda: pe < 1, sorpresa: pe >= 1 });
  T.distritoDelante(R, t, { encuadre: 'plaza', camara: 'escenario', luz: 'dia', urna: 1 });
};

// ── el desfile de noche: fondo local ──
let fondoDesfile = null;
const pintaFondoDesfile = () => {
  const { rect, pset, disco } = R, h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // el cielo de noche tramado
  const cs = [hex('#0a0a24'), hex('#141436'), hex('#1e1c48'), hex('#2e2458')];
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) { const v = y / 96 * 3 + ((x * 3 + y * 7) % 4) / 4 * 0.9; pset(x, y, cs[Math.min(3, Math.floor(v))]); }
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 7) * 320), y = Math.floor(h(k, 2, 7) * 60); if (!(x > 274 && y < 48) && !(x < 172 && y < 16)) pset(x, y, k % 5 ? hex('#8a8ac8') : hex('#ffffff')); }
  // las torres del Capitolio con sus ventanas
  for (let i = 0, x = -4; x < 330; i++) { const w = 12 + Math.floor(h(i, 3, 8) * 14), top = 44 + Math.floor(h(i, 4, 8) * 32), c = [hex('#2a1e4a'), hex('#341e52'), hex('#22284e'), hex('#3a2048')][i % 4];
    if (x > 268 && top < 50) { x += w + 2; continue; }
    rect(x, top, x + w, 100, c); rect(x, top, x, 100, hex('#4a3a6a')); rect(x + w, top, x + w, 100, hex('#140e26'));
    if (i % 3 === 0) { rect(x + w / 2 - 1, top - 8, x + w / 2, top, c); pset(Math.round(x + w / 2), top - 9, hex('#ff70c0')); }
    if (i % 4 === 1) disco(Math.round(x + w / 2), top, Math.round(w / 2), hex('#5a3a7a'));
    for (let y = top + 3; y < 98; y += 4) for (let xx = x + 2; xx < x + w - 1; xx += 3) if (h(xx, y, 9) < 0.45) pset(xx, y, [hex('#ffd870'), hex('#ff9ad0'), hex('#8af0f0')][Math.floor(h(xx, y, 10) * 3)]);
    x += w + 2; }
  // las gradas: cuatro filas de público de colores con la baranda
  for (let f = 0; f < 4; f++) { const y = 98 + f * 9; rect(0, y, 319, y + 8, f % 2 ? hex('#3a2a5a') : hex('#44306a')); rect(0, y, 319, y, hex('#6a4a8a')); }
  rect(0, 134, 319, 138, T.C.k); rect(0, 134, 319, 135, hex('#e8b830')); for (let x = 4; x < 320; x += 12) rect(x, 136, x + 1, 138, hex('#a87a18'));
  // banderolas en los postes
  for (const x of [40, 120, 200]) { rect(x, 60, x + 1, 134, hex('#c8a040')); rect(x + 2, 64, x + 9, 90, hex('#8a2a6a')); rect(x + 2, 64, x + 9, 65, hex('#e8b830')); disco(x + 5, 76, 2, hex('#e8b830')); }
  // la avenida: losas en perspectiva con juntas y reflejos
  for (let y = 139; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 139) / 41, xr = (x - 160) / (0.6 + p * 0.8) + 160, fila = Math.floor((y - 139) / (3 + p * 6)), junta = Math.abs(xr % 24) < 1 || (y - 139) % Math.round(3 + p * 6) === 0;
    pset(x, y, junta ? hex('#1a1426') : (fila + Math.floor(xr / 24)) % 2 ? hex('#2e2440') : hex('#342a4a')); }
  for (let x = 0; x < 320; x += 2) pset(x, 152, hex('#5a4a7a'));
};
const publico = (t, ap) => {
  for (let f = 0; f < 4; f++) for (let i = 0; i < 40; i++) { const x = 4 + i * 8 + (f % 2) * 4, y = 105 + f * 9, salta = ap && Math.sin(t * 11 + i * 1.7 + f) > 0.2 ? 1 : 0, pelo = [hex('#e85aa8'), hex('#3ad0c8'), hex('#a8e04a'), hex('#8a4ad8'), hex('#f0902a'), hex('#f0d040')][(i * 5 + f * 3) % 6];
    R.disco(x, y - 2 - salta, 2, hex('#e8b898')); R.rect(x - 2, y - 5 - salta, x + 2, y - 4 - salta, pelo); R.pset(x, y - 6 - salta, pelo); R.rect(x - 2, y + 1 - salta, x + 2, y + 3, pelo === hex('#f0d040') ? hex('#5a3a8a') : hex('#2a1e40'));
    if (ap && (i + f) % 5 === 0) { const a = Math.sin(t * 10 + i) > 0 ? -1 : 1; R.pset(x + 3, y - 4 - salta + a, hex('#e8b898')); R.pset(x + 3, y - 5 - salta + a, hex('#ffffff')); }
    if ((i * 7 + f) % 13 === 0 && Math.floor(t * 7 + i) % 9 === 0) destello(x, y - 8, 2); }
};
const fuegos = (t) => {
  for (const [x0, y0, t0, c] of [[214, 30, 0.2, hex('#ff70c0')], [90, 34, 1.4, hex('#8af0f0')], [246, 52, 2.4, hex('#ffd870')], [150, 26, 3.4, hex('#a8f070')]]) {
    const u = ((t - P4 - t0) % 4.2) / 1.4; if (u < 0 || u > 1) continue;
    for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, r = u * 16; const x = Math.round(x0 + Math.cos(a) * r), y = Math.round(y0 + Math.sin(a) * r + u * u * 4); if (x > 272 && y < 48) continue; R.pset(x, y, u < 0.7 ? c : hex('#8a6a9a')); if (u < 0.5) R.pset(x, y + 1, hex('#ffffff')); } }
};
const capaLlamas = (x, y, t, dir) => {
  for (let j = 0; j < 20; j++) for (let i = 0; i < 22; i++) { const l = 22 - Math.round(j * 0.6) - Math.round(3 * Math.sin(t * 14 + j * 0.9 + i)); if (i > l) continue; const v = i / l + 0.15 * Math.sin(t * 20 + i + j);
    R.pset(x - dir * i, y + j, v < 0.3 ? hex('#fff0a0') : v < 0.6 ? hex('#ffb030') : v < 0.85 ? hex('#ff6a1a') : hex('#c8301a')); }
};
const p4 = (t) => {
  if (!fondoDesfile) { fondoDesfile = R.nuevo(); const prev = R.usar(fondoDesfile); pintaFondoDesfile(); R.usar(prev); }
  R.buf.set(fondoDesfile);
  fuegos(t);
  const ap = t > REGLAS - 0.2;
  publico(t, true);
  // los haces de los focos que barren
  for (const [x0, k] of [[30, 0], [290, 1.7]]) { const a = Math.sin(t * 0.8 + k) * 0.5; for (let r = 0; r < 120; r += 2) { const x = Math.round(x0 + Math.sin(a) * r), y = Math.round(140 - r * 0.9); if (y < 16 && x < 172) break; if (x > 272 && y < 48) break; R.pset(x, y, hex('#6a5a8a')); } }
  // el carro entra y se para en el centro
  const u = tramo(t, P4, P4 + 1.0), cx = Math.round(lerp(-70, 122, 1 - (1 - u) * (1 - u)) + Math.sin(t * 2) * 1), suelo = 156;
  const gal = true;
  // los dos focos que siguen al carro (luz tramada)
  for (const [fx, fy] of [[40, 22], [236, 22]]) for (let y = fy; y < suelo; y++) { const k = (y - fy) / (suelo - fy), xc = lerp(fx, cx + 40, k), an = 3 + k * 26; for (let x = Math.round(xc - an); x <= xc + an; x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320) { const c = R.pget(x, y); if (c) R.pset(x, y, ((c & 0xfefefe) >>> 1 | 0xff000000) + 0x00283838 >>> 0); } }
  // confeti que cae
  for (let i = 0; i < 30; i++) { const v = (t * 0.35 + (i * 0.37) % 1) % 1, x = Math.round((i * 53) % 320 + Math.sin(t * 3 + i) * 4), y = Math.round(20 + v * 150); if (!(x > 274 && y < 48) && !(x < 172 && y < 16)) R.rect(x, y, x + (i % 2), y, [hex('#ff70c0'), hex('#ffd860'), hex('#8af0f0'), hex('#a8f070')][i % 4]); }
  // el charco de luz de los focos sobre la avenida, bajo el carro
  for (let y = suelo - 8; y <= suelo + 8; y++) for (let x = cx - 30; x <= cx + 100; x++) { const e = ((x - cx - 35) / 66) ** 2 + ((y - suelo) / 8) ** 2; if (e < 1 && x >= 0 && x < 320 && ((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, hex('#7a6a9a')); } }
  // los dos caballos negros (uno detrás, un poco más arriba)
  R.caballo(cx + 52, suelo - 4, t + 0.2, { dir: 1, galopa: gal, color: hex('#3a3446'), sombra: hex('#1a1622') });
  R.caballo(cx + 46, suelo, t, { dir: 1, galopa: gal, color: hex('#4a4458'), sombra: hex('#24202e') });
  for (const yy of [suelo - 12, suelo - 9]) R.linea(cx + 34, yy, cx + 52, yy - 2, hex('#e8b830'));
  // los dos, con las capas de llamas, de pie en el carro
  const arriba = t > REGLAS;
  capaLlamas(cx + 7, suelo - 30, t, 1); capaLlamas(cx + 19, suelo - 30, t + 0.3, 1);
  R.actor(EL.katniss, cx + 5, suelo - 6, t, { dir: 1, brazos: arriba, sonrisa: t > PAIS, sorpresa: t > REGLAS && t < REGLAS + 0.5 });
  R.actor(EL.peeta, cx + 17, suelo - 6, t, { dir: 1, brazos: arriba, sonrisa: true });
  if (arriba) { R.rect(cx + 17, suelo - 39, cx + 20, suelo - 36, T.C.k); R.rect(cx + 19, suelo - 40, cx + 20, suelo - 39, hex('#f0c8a0')); if (Math.floor(t * 6) % 2) destello(cx + 19, suelo - 43, 3); }
  // la caja del carro: negra con el filo dorado y la rueda que gira
  const { rect, disco } = R;
  rect(cx, suelo - 15, cx + 36, suelo - 4, T.C.k); rect(cx + 1, suelo - 14, cx + 35, suelo - 5, hex('#1e1a26')); rect(cx + 1, suelo - 14, cx + 35, suelo - 13, hex('#e8b830')); rect(cx + 1, suelo - 6, cx + 35, suelo - 5, hex('#a87a18'));
  for (let i = cx + 4; i < cx + 34; i += 6) { R.pset(i, suelo - 10, hex('#e8b830')); R.pset(i + 1, suelo - 11, hex('#a87a18')); }
  const wx = cx + 14, wy = suelo - 3; disco(wx, wy, 7, T.C.k); disco(wx, wy, 6, hex('#a87a18')); disco(wx, wy, 4, hex('#1e1a26'));
  for (let k = 0; k < 6; k++) { const a = t * 10 * (u < 1 ? 1 : 0.4) + k * Math.PI / 3; R.linea(wx, wy, Math.round(wx + Math.cos(a) * 5), Math.round(wy + Math.sin(a) * 5), hex('#e8b830')); }
  // chispas de tela que suben de las capas
  for (let i = 0; i < 10; i++) { const v = (t * 1.3 + i / 10) % 1; R.pset(Math.round(cx + 8 - v * 26 + Math.sin(t * 5 + i) * 3), Math.round(suelo - 30 - v * 30), v < 0.5 ? hex('#ffd040') : hex('#ff7a2a')); }
  // los flashes de las cámaras del público
  if (t > PAIS - 0.3) for (let k = 0; k < 5; k++) if (Math.floor(t * 9 + k * 3) % 7 === 0) { const x = 20 + k * 62, y = 102 + (k % 3) * 9; R.disco(x, y, 3, hex('#ffffff')); destello(x, y, 5); }
  // la primera fila del público, de espaldas, por delante (abajo)
  for (let i = 0; i < 22; i++) { const x = 6 + i * 15, y = 184 - (i % 2) * 2, salta = ap && Math.sin(t * 10 + i) > 0.3 ? 2 : 0, pelo = [hex('#e85aa8'), hex('#3ad0c8'), hex('#a8e04a'), hex('#8a4ad8'), hex('#f0902a')][i % 5];
    R.rect(x - 6, y - 4 - salta, x + 6, y, hex('#0e0a18')); R.disco(x, y - 8 - salta, 4, T.C.k); R.disco(x, y - 9 - salta, 3, pelo); R.pset(x - 1, y - 11 - salta, hex('#ffffff'));
    if (ap && i % 3 === 0) { R.rect(x + 5, y - 18 - salta, x + 6, y - 6 - salta, hex('#0e0a18')); R.rect(x + 4, y - 20 - salta, x + 7, y - 18 - salta, hex('#e8b898')); } }
};

const efectos = [[SHOW, 'publico'], [N24, 'pop'], [UNA, 'interruptor'], [N74, 'brillo'], [VOLUNTARIA, 'publico'], [PEETA - 0.4, 'pop'], [P4 + 0.1, 'carro'], [REGLAS, 'publico'], [P4 + 1.6, 'boom'], [PAIS - 0.2, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 74 });
''')

E['jh-mentor'] = ('El mentor', '''// JH-MENTOR (frases 10–11), Juegos 74. Tres planos:
// 1. el vagón del tren: Haymitch, despeinado y con la petaca, dormita en el sofá y se balancea; Katniss lo señala a Peeta
//    en «her mentor»; en «drunk» se cae del sofá al suelo (bote y una botella que rueda); Katniss y Peeta se sorprenden y
//    él gruñe en «cynical» (corta en «and much smarter»);
// 2. la ventana del tren: se levanta del suelo, se le ilumina el ojo en «smarter» y sonríe con el dedo arriba; Katniss lo
//    mira asombrada; él le explica señalando fuera mientras pasa el paisaje (corta en «Village»);
// 3. la Aldea de los Vencedores: sale de su casa, recoge el periódico rodeado de gansos; en «every year» las hojas del
//    calendario del Capitolio pasan del 51 al 74; suspira en «back to the Games», bebe y se va con los gansos detrás.''', COMUN + r'''
const Mn = (f) => en('mentor', f), Al = (f) => en('aldea', f);
const P2 = Mn(0.816), P3 = Al(0.256);
const MENTOR = Mn(0.016), VICTOR = Mn(0.338), HAY = Mn(0.492), BORRACHO = Mn(0.639), CINICO = Mn(0.68), LISTO = Mn(0.849), CASA = Al(0.098), VIDA = Al(0.323), CADA = Al(0.469), VUELVE = Al(0.592), JUEGOS = Al(0.682), COMO = Al(0.811);

const p1 = (t) => {
  T.interior(R, t, { encuadre: 'tren', luz: 'dia' });
  // Katniss y Peeta detrás de la mesa
  const mira = t > MENTOR + 0.1 && t < VICTOR;
  R.actor(EL.katniss, 212, 144, t, { dir: -1, dedo: mira, habla: mira && Math.sin(t * 9) > 0, sorpresa: t > BORRACHO && t < BORRACHO + 0.6, enfado: t > CINICO + 0.2 });
  R.actor(EL.peeta, 236, 144, t, { dir: t > VICTOR - 0.6 && t < HAY ? -1 : -1, sonrisa: t > VICTOR && t < BORRACHO, sorpresa: t > BORRACHO && t < BORRACHO + 0.9, habla: t > VICTOR && t < HAY && Math.sin(t * 8) > 0 });
  // Haymitch: dormita en el sofá, se cae en «drunk» y gruñe
  const u = tramo(t, BORRACHO, BORRACHO + 0.3), x = Math.round(lerp(64 + (u === 0 ? Math.round(Math.sin(t * 2.2) * 2) : 0), 84, u)), y = Math.round(lerp(140, 156, u * u));
  const sueño = t < HAY - 0.3;
  R.actor(EL.haymitchViejo, x, y, t, { dir: 1, sorpresa: u > 0 && t < CINICO, enfado: t > CINICO, habla: t > CINICO && Math.sin(t * 7) > 0.2, salto: u >= 1 && t < BORRACHO + 0.45 ? 2 : 0 });
  if (sueño) { const k = Math.floor((t * 1.2) % 3); for (let i = 0; i <= k; i++) { const zx = x + 15 + i * 5, zy = y - 30 - i * 5; R.rect(zx, zy, zx + 3, zy, hex('#e8e4f0')); R.pset(zx + 2, zy + 1, hex('#e8e4f0')); R.pset(zx + 1, zy + 2, hex('#e8e4f0')); R.rect(zx, zy + 3, zx + 3, zy + 3, hex('#e8e4f0')); } }
  // el polvo del golpe y la botella que rueda por la moqueta
  if (u >= 1 && t < BORRACHO + 0.8) for (let i = 0; i < 6; i++) { const r = (t - BORRACHO - 0.3) * 30; R.pset(Math.round(x + 7 + Math.cos(i) * r), Math.round(156 - Math.abs(Math.sin(i * 2)) * r * 0.3), hex('#d8c8b0')); }
  { const v = tramo(t, BORRACHO + 0.1, BORRACHO + 1.6), bx = Math.round(lerp(96, 150, 1 - (1 - v) * (1 - v))), by = 158, a = v * 12;
    if (v > 0) { const dx = Math.round(Math.cos(a) * 3), dy = Math.round(Math.sin(a) * 1); R.linea(bx - dx, by - dy, bx + dx, by + dy, T.C.k); R.linea(bx - dx, by - dy - 1, bx + dx, by + dy - 1, hex('#3a7a4a')); R.pset(bx + dx, by + dy - 1, hex('#c8a870')); }
    else { R.rect(98, 128, 100, 136, T.C.k); R.rect(99, 129, 99, 135, hex('#3a7a4a')); } }
  T.interiorDelante(R, t, { encuadre: 'tren', luz: 'dia' });
};

const p2 = (t) => {
  T.interior(R, t, { encuadre: 'tren', camara: 'ventana', luz: 'dia' });
  // se levanta del suelo y se le enciende la mirada
  const sube = tramo(t, P2, P2 + 0.45), y = Math.round(lerp(166, 152, sube));
  const listo = t > LISTO + 0.15;
  const h = R.actor(EL.haymitchViejo, 92, y, t, { dir: 1, sonrisa: listo, dedo: t > LISTO + 0.3 && t < CASA - 0.1, habla: t > Al(0) && Math.sin(t * 8) > 0.1, sostiene: t > Al(0) + 0.2 ? [128, 108] : false });
  if (t > LISTO && t < LISTO + 0.9) { const [cx, cy] = h.cabeza; destello(cx + 5, cy + 6, Math.floor(t * 10) % 2 ? 3 : 2); }
  // Katniss lo mira y se asombra; luego mira por la ventana
  R.actor(EL.katniss, 160, 152, t, { dir: t > CASA ? 1 : -1, sorpresa: t > LISTO + 0.3 && t < Al(0) });
  T.interiorDelante(R, t, { encuadre: 'tren', camara: 'ventana', luz: 'dia' });
};

// el calendario del Capitolio en un poste: las hojas pasan del 51 al 74
const calendario = (t) => {
  const { rect, pset } = R, x0 = 198, y0 = 112, x1 = 226, y1 = 146;
  rect(210, 112, 213, 168, T.C.k); rect(211, 112, 212, 168, hex('#8a6a4a')); rect(211, 112, 211, 168, hex('#a8885e'));
  rect(x0, y0, x1, y1, T.C.k); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 7, hex('#e85aa8')); rect(x0 + 1, y0 + 7, x1 - 1, y0 + 7, hex('#e8b830'));
  for (const xx of [x0 + 6, x1 - 6]) { rect(xx, y0 - 2, xx + 1, y0 + 2, hex('#c8c8d0')); }
  rect(x0 + 1, y0 + 8, x1 - 1, y1 - 1, hex('#f8f4ec')); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, hex('#d8d0c0'));
  const u = tramo(t, CADA, JUEGOS - 0.2), n = Math.round(51 + u * 23);
  R.numero(String(n), Math.round((x0 + x1) / 2) + 1, y1 - 6, { tam: 8, centro: true, color: hex('#3a1a3a') });
  // la hoja que se va volando
  if (u > 0 && u < 1) { const f = (t * 14) % 1; const fx = Math.round(x1 - 2 + f * 18), fy = Math.round(y0 + 10 - f * 10 + Math.sin(f * 6) * 3); rect(fx, fy, fx + 6, fy + 5, T.C.k); rect(fx + 1, fy + 1, fx + 5, fy + 4, hex('#f8f4ec')); }
};
const p3 = (t) => {
  T.distrito(R, t, { encuadre: 'aldea', luz: 'dia', periodico: false });
  calendario(t);
  // el periódico doblado en la hierba, hasta que lo coge
  const coge = Al(0.4);
  if (t < coge) { R.rect(244, 158, 256, 162, T.C.k); R.rect(245, 159, 255, 161, hex('#e8e0cc')); R.rect(245, 160, 255, 160, hex('#a89c88')); }
  // Haymitch sale de su casa, baja, recoge el periódico, mira el calendario y se va con los gansos detrás
  const a = tramo(t, P3, P3 + 0.8), b = tramo(t, COMO - 0.2, Al(1) + 0.6);
  const x = Math.round(lerp(lerp(272, 250, a), 120, b)), y = Math.round(lerp(130, 168, Math.min(1, a * 1.2)));
  const agacha = t > coge - 0.3 && t < coge + 0.1;
  const h = R.actor(EL.haymitchViejo, x, y + (agacha ? 2 : 0), t, { dir: b > 0 ? -1 : t > CADA - 0.1 && t < COMO ? -1 : 1, anda: (a > 0 && a < 1) || (b > 0 && b < 1), sostiene: agacha ? [x + 6, 162] : t > coge ? true : false, sorpresa: t > CADA && t < VUELVE, triste: t > VUELVE && t < COMO, salto: 0 });
  if (t >= coge - 0.1) { const [hx, hy] = h.mano; R.rect(hx - 4, hy - 2, hx + 4, hy + 1, T.C.k); R.rect(hx - 3, hy - 1, hx + 3, hy, hex('#e8e0cc')); }
  // el suspiro
  if (t > JUEGOS && t < COMO) { const v = (t - JUEGOS) % 1; R.disco(Math.round(x + (b > 0 ? -2 : 18) + v * 4), Math.round(y - 26 - v * 6), 2, hex('#e8eef4')); }
  // dos gansos que le siguen (y graznan)
  for (const [k, dx] of [[0, 18], [1, 32]]) { const gx = Math.round(x + (b > 0 ? dx : -dx + 8)), gy = 170 + k * 3; ganso(gx, gy, t, b > 0 ? -1 : 1, k);
    if (t > VIDA + k * 0.4 && t < VIDA + 0.5 + k * 0.4) R.bocadillo(gx, gy - 14, { icono: '!' }); }
};

const efectos = [[BORRACHO + 0.25, 'boing'], [BORRACHO + 0.4, 'golpecito'], [LISTO + 0.05, 'brillo'], [P3 + 0.1, 'puerta'], [Al(0.4), 'papel'], [VIDA, 'pop'], [CADA, 'papel'], [JUEGOS + 0.1, 'vapor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 74 });
''')

E['jh-despues'] = ('Después', '''// JH-DESPUES (frase 12), Juegos 75. Dos planos:
// 1. el museo del Capitolio: el cuadro de la arena del reloj de cerca; una capitolina lo mira; en «Catching Fire» suben
//    chispas doradas por el cuadro; en «75th» se enciende la placa con el «75» y ella la señala; un capitolino pasa por
//    delante (corta en «Mockingjay»);
// 2. la sala del museo con los tres cuadros: en «Mockingjay» el pájaro en llamas brilla y los visitantes se asombran; en
//    «rebellion» un sinsajo dorado sale volando del cuadro y se posa en el marco del palacio; en «brings down» se apagan
//    las ventanas del palacio una a una; Snow, delante, se enfada y se le cae la rosa blanca en «Snow».''', COMUN + r'''
const L = (f) => en('llamas', f);
const P2 = L(0.505);
const FUEGO = L(0.048), N75 = L(0.267), REBELION = L(0.675), CAE = L(0.776), SNOW = L(0.902);

const p1 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'museo', camara: 'cuadro', cual: 0 });
  const [qx0, qy0, qx1, qy1] = g.cuadro ?? [50, 24, 262, 140];
  // las chispas doradas que suben por el cuadro con «Catching Fire»
  if (t > FUEGO) { R.recorte([qx0, qy0, qx1, qy1]); for (let i = 0; i < 26; i++) { const v = ((t - FUEGO) * 0.5 + i / 26) % 1, x = Math.round(qx0 + 10 + ((i * 37) % 190) + Math.sin(t * 3 + i) * 3), y = Math.round(qy1 - v * (qy1 - qy0)); R.linea(x, y, x, y + 1, v < 0.5 ? hex('#ffd040') : hex('#ff8a2a')); } R.recorte(null); }
  // la placa dorada con el 75
  { const px0 = 130, px1 = 182, py0 = 143, py1 = 162, on = tramo(t, N75, N75 + 0.3);
    R.rect(px0, py0, px1, py1, T.C.k); R.rect(px0 + 1, py0 + 1, px1 - 1, py1 - 1, on > 0 ? hex('#e8b830') : hex('#a87a18')); R.rect(px0 + 1, py0 + 1, px1 - 1, py0 + 1, hex('#f8e070'));
    if (on > 0) { R.numero('75', 157, py1 - 2, { tam: 16, centro: true }); if (t < N75 + 0.8 && Math.floor(t * 10) % 2) destello(px1 - 2, py0 + 1, 3); } }
  R.actor(EL.capitolino2, 26, 172, t, { dir: 1, sonrisa: t < N75, sorpresa: t > FUEGO && t < FUEGO + 0.8, dedo: t > N75 && t < P2 - 0.2, habla: t > N75 + 0.2 && t < P2 - 0.4 && Math.sin(t * 9) > 0 });
  T.capitolioDelante(R, t, { encuadre: 'museo', camara: 'cuadro', cual: 0 });
  // un capitolino que pasa por delante, se para a mirar y sigue
  const u = tramo(t, 0.2, N75 - 0.2), w = tramo(t, N75 + 0.9, P2 + 1), x = Math.round(lerp(lerp(330, 200, u), 120, w));
  R.actor(EL.capitolino1, x, 182, t, { dir: -1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sorpresa: t > N75 && t < N75 + 0.6 });
};

const p2 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'museo' });
  const Q = g.cuadros ?? [[18, 50, 90, 110], [124, 44, 196, 112], [230, 50, 302, 110]];
  // el pájaro en llamas brilla con «Mockingjay»: rayos dorados alrededor del cuadro del centro
  const [a0, b0, a1, b1] = Q[1], cx = (a0 + a1) / 2, cy = (b0 + b1) / 2, bri = tramo(t, P2, P2 + 0.4) * (1 - tramo(t, P2 + 1.6, P2 + 2.2));
  if (bri > 0) for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2 + t * 0.6, r0 = 44, r1 = 44 + bri * 10 + Math.sin(t * 8 + k) * 2; for (let r = r0; r < r1; r++) { const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.85); if (y > 18 && !(x > 272 && y < 48)) R.pset(x, y, hex('#ffd860')); } }
  // las ventanas del palacio que se apagan con «brings down»
  { const [c0, d0, c1, d1] = Q[2], ap = tramo(t, CAE - 0.1, SNOW + 0.1); if (ap > 0) for (let y = d0; y <= d1; y++) for (let x = c0; x <= c1; x++) { const c = R.pget(x, y); if ((c === hex('#ffd870') || c === hex('#fff4c0')) && ((x * 13 + y * 7) % 100) / 100 < ap) R.pset(x, y, hex('#2a2a48')); } }
  // los visitantes
  R.actor(EL.capitolino1, 96, 162, t, { dir: 1, sorpresa: t > P2 && t < REBELION, sonrisa: t > REBELION, dedo: t > REBELION && t < CAE });
  R.actor(EL.capitolino2, 140, 164, t, { dir: -1, sorpresa: t > P2 + 0.1 && t < P2 + 1.2, salto: t > P2 && t < P2 + 0.2 ? 2 : 0, habla: t > P2 + 1.2 && t < REBELION && Math.sin(t * 9) > 0 });
  // Snow delante de su palacio, con la rosa; se enfada y se le cae
  const s = R.actor(EL.snow, 222, 162, t, { dir: -1, sostiene: t < SNOW ? true : false, enfado: t > CAE, sorpresa: t > REBELION + 0.3 && t < CAE, triste: t > SNOW + 0.4 });
  { const v = tramo(t, SNOW, SNOW + 0.4), [hx, hy] = t < SNOW ? s.mano : [214, 150]; const rx = Math.round(hx + v * -4), ry = Math.round(lerp(hy, 162, v * v));
    T.PIEZAS_JH.rosaBlanca(R, rx, ry + 4, { s: 1 }); if (v >= 1) for (let i = 0; i < 3; i++) R.pset(rx - 3 + i * 3, 162, hex('#f2f0ec')); }
  // el sinsajo dorado sale del cuadro y se posa en el marco del palacio
  { const v = tramo(t, REBELION - 0.2, CAE - 0.05); if (v > 0) { const x = lerp(cx, Q[2][0] + 22, v), y = lerp(cy, Q[2][1] - 4, v) - Math.sin(v * Math.PI) * 26;
    T.PIEZAS_JH.sinsajo(R, Math.round(x), Math.round(y), { s: 2, dir: 1, t: v < 1 ? t : undefined }); if (v < 1) for (let i = 1; i < 5; i++) R.pset(Math.round(x - i * 4), Math.round(y - 4 + Math.sin(t * 9 + i) * 2), hex('#ffd040')); } }
  // dos guardias de la sala al fondo, uno se gira
  R.actor(EL.agentePaz, 290, 160, t, { dir: t > CAE ? -1 : -1, sorpresa: t > CAE && t < SNOW });
};

const efectos = [[FUEGO, 'brillo'], [N75 + 0.05, 'pop'], [P2 + 0.05, 'brillo'], [REBELION, 'whoosh'], [CAE + 0.1, 'interruptor'], [SNOW + 0.3, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 75 });
''')
