E = {}

# piezas locales comunes a las dos escenas (se pegan al principio de cada cuerpo)
AUX = r'''
const C = T.C, G = T.PIEZAS_GT;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// lo fijo de un fondo local se pinta una vez en un búfer y se pega en cada fotograma
const capas = {};
const capa = (k, f) => { let b = capas[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } R.copiar(b); };
const caja = (x0, y0, x1, y1, c, b = C.k) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// relleno tramado: cada píxel toma un color de la lista según el ruido (la lista lleva los pesos repitiendo colores)
const trama = (x0, y0, x1, y1, cols, k = 0, esc = 1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.floor(h(Math.floor(x / esc), Math.floor(y / esc), k) * cols.length)]); };
// degradado vertical tramado
const degradado = (x0, y0, x1, y1, cols, k = 0) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.floor(v), f = v - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(n, i + (h(x, y, k) < f ? 1 : 0))]); } };
// nube de tres tonos (luz arriba, sombra abajo), con la panza plana
const nube = (cx, cy, w, hh, cols) => { cx = Math.round(cx); for (let j = -hh; j <= Math.round(hh * 0.5); j++) for (let i = -w; i <= w; i++) { const b = 0.7 + 0.3 * Math.sin(i * 0.5 + w); if ((i / w) ** 2 + (j / (hh * b)) ** 2 > 1) continue; const v = (j + hh) / (1.5 * hh); R.pset(cx + i, cy + j, v < 0.4 ? cols[0] : v < 0.75 ? cols[1] : cols[2]); } };
const pajaro = (x, y, t, c) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 5 + x * 0.3) % 2; R.pset(x, y, c); R.pset(x - 1, y - 1 + a, c); R.pset(x + 1, y - 1 + a, c); R.pset(x - 2, y - 1 + 2 * a - a, c); R.pset(x + 2, y - 1 + 2 * a - a, c); };
// un resplandor de color sobre lo ya pintado (luces de sirena, pantallas)
const resplandor = (cx, cy, r, col, a) => { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.3) / r; if (d < 1 && h(x, y, 9) < (1 - d) * 1.4) R.pset(x, y, mez(R.pget(x, y), col, a * (1 - d * 0.6))); } };
// guarda un trozo de lo pintado y lo repone después (lo que va detrás de algo)
const guardar = (x0, y0, x1, y1) => { const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y)); return () => { let i = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, v[i++]); }; };
// gente pequeña del fondo (12–14 px): piernas que se alternan, cuerpo, cabeza con pelo; o.brazos los levanta, o.salta bota
const PIEL = [hex('#f6c290'), hex('#d48a5a'), hex('#a8643a')];
const persona = (x, suelo, t, cuerpo, pelo, o = {}) => {
  x = Math.round(x); const pa = o.anda ? Math.floor(t * 6 + x * 0.1) % 2 : 0, y = Math.round(suelo - (o.salta ? Math.abs(Math.sin(t * 9 + x)) * 3 : 0)), piel = PIEL[(x >> 3) % 3], d = o.dir ?? 1;
  R.rect(x - 2, y - 4, x - 1, y - pa, C.k); R.rect(x + 1, y - 4, x + 2, y - (1 - pa), C.k);
  R.rect(x - 3, y - 10, x + 3, y - 4, C.k); R.rect(x - 2, y - 9, x + 2, y - 5, cuerpo); R.pset(x - 2, y - 5, mez(cuerpo, C.k, 0.3));
  R.rect(x - 2, y - 15, x + 2, y - 10, C.k); R.rect(x - 1, y - 14, x + 1, y - 11, piel); R.rect(x - 2, y - 15, x + 2, y - 14, pelo); R.pset(x - d, y - 13, pelo); R.pset(x + d, y - 12, C.k);
  if (o.brazos) { R.rect(x - 5, y - 13, x - 4, y - 10, C.k); R.rect(x + 4, y - 13, x + 5, y - 10, C.k); R.pset(x - 5, y - 13, piel); R.pset(x + 5, y - 13, piel); }
  if (o.paraguas) { R.linea(x + 3, y - 9, x + 3, y - 19, C.k); for (let i = -7; i <= 7; i++) { const yy = y - 19 - Math.round(3 * Math.sqrt(Math.max(0, 1 - (i / 7) ** 2))); R.linea(x + 3 + i, yy, x + 3 + i, y - 19, (i + 7) % 4 < 2 ? o.paraguas : C.k); } }
};
// un bocadillo de pensamiento blanco con su rabito de burbujas hacia (cx, cy); dentro se dibuja lo que se piensa
const BL = hex('#f8f6ee'), BLS = hex('#d8d4c8');
const bocadillo = (x0, y0, x1, y1, cx, cy, dibuja) => {
  R.rect(x0 + 2, y0, x1 - 2, y1, C.k); R.rect(x0, y0 + 2, x1, y1 - 2, C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, C.k);
  R.rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, BL); R.rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, BL); R.rect(x0 + 2, y1 - 2, x1 - 2, y1 - 1, BLS);
  const mx = (x0 + x1) / 2; for (const [u, r] of [[0.35, 2], [0.7, 1]]) { const bx = Math.round(lerp(mx, cx, u)), by = Math.round(lerp(y1 + 2, cy, u)); R.disco(bx, by, r + 1, C.k); R.disco(bx, by, r, BL); }
  dibuja();
};
// el mando de una consola de los noventa (centro abajo en x, y); con sirena, la lucecita roja y azul que gira
const mando = (x, y, col, colS, t, sirena = 0) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 9, y - 7, x + 9, y, C.k); R.rect(x - 11, y - 5, x + 11, y + 1, C.k);
  R.rect(x - 8, y - 6, x + 8, y - 1, col); R.rect(x - 10, y - 4, x + 10, y, col); R.rect(x - 10, y, x + 10, y, colS); R.rect(x - 8, y - 6, x + 8, y - 6, mez(col, hex('#ffffff'), 0.4));
  R.rect(x - 8, y - 3, x - 4, y - 3, C.k); R.rect(x - 6, y - 5, x - 6, y - 1, C.k);
  R.pset(x + 4, y - 3, hex('#f0c040')); R.pset(x + 6, y - 5, hex('#5ac83a')); R.pset(x + 8, y - 3, hex('#ff4a4a')); R.pset(x + 6, y - 1, hex('#4a9aff'));
  R.rect(x - 1, y - 3, x, y - 3, colS);
  if (sirena) { const on = Math.floor(t * 7) % 2 && sirena > 0.5; R.rect(x - 3, y - 11, x + 3, y - 6, C.k); R.rect(x - 2, y - 10, x - 1, y - 7, on ? hex('#ff4a4a') : hex('#7a2a34')); R.rect(x + 1, y - 10, x + 2, y - 7, !on && sirena > 0.5 ? hex('#4a9aff') : hex('#26305a')); }
};
// el teléfono de los noventa con el auricular descolgado (la horquilla vacía)
const telefonoCogido = (x, y) => { const rest = guardar(x - 12, y - 17, x - 1, y - 11); G.telefonoNoventa(R, x, y, {}); rest(); R.rect(x - 11, y - 11, x - 10, y - 10, C.k); R.rect(x - 3, y - 11, x - 2, y - 10, C.k); };
// el auricular negro en la mano (hx, hy), con el cable rizado hasta la base (bx, by)
const auricular = (hx, hy, bx, by, dir = 1) => {
  hx = Math.round(hx); hy = Math.round(hy);
  for (let i = 0; i <= 16; i++) { const u = i / 16, x = Math.round(lerp(bx, hx, u)), y = Math.round(lerp(by, hy + 3, u) + Math.sin(u * Math.PI) * 6); R.pset(x, y, C.k); if (i % 2) R.pset(x, y - 1, hex('#4a4856')); }
  R.rect(hx - 2, hy - 5, hx + 1, hy + 4, C.k); R.rect(hx - 3, hy - 6, hx + 2, hy - 4, C.k); R.rect(hx - 3, hy + 3, hx + 2, hy + 5, C.k); R.pset(hx - 1, hy - 5, hex('#4a4856'));
};
const ROJO = hex('#ff4a4a'), AZUL = hex('#4a9aff');
'''

E['gt-fallo'] = ('El fallo', '''// GT-FALLO (frases 11–12), 1996. Seis planos:
// 1. la ciudad de juguete desde arriba: en el golpe («something happened», 0,6 s) estalla la persecución: un destello, una
//    onda roja y azul sale del coche rojo y los coches de policía se lanzan; luego el helicóptero, el camión de los helados
//    y más policías («Gary Penn, the creative director»);
// 2. la mesa de pruebas de DMA: Penn, de cuerpo entero, juega con la palanca; al fondo Dailly entra con papeles; en «bug»
//    la pantalla falla (rayas, «?») y en «went crazy» se llena de luces rojas y azules que tiñen la pared: Penn da un bote
//    boquiabierto («!») y a Dailly se le vuelan los papeles; en «chasing» Penn mueve la palanca como loco;
// 3. gag 4, de cerca y en marcha: el camión de los helados huye por una calle de la ciudad de juguete (la cámara lo sigue)
//    y el coche de policía le pisa los talones con cejas de furia («fury»); entra otro («nobody had programmed»); la gente
//    de la acera salta; en «escaping» el camión coge una rampa y vuela, la bola de helado bota y aterriza en «thrilling»;
//    los policías derrapan y se quedan mareados en el centro (la cámara frena con ellos) mientras el camión se va;
// 4. la sala de pruebas: Jones y Dailly no lo recuerdan igual (bocadillos: el policía furioso / el mando de policía con
//    una X); Dailly coge el mando rojo del ladrón; Penn llega con el mando azul con sirena, lo deja en la mesa y se lo
//    acerca a Jones («nobody wanted»); Jones lo manda de un empujón a Dailly («cop»), Dailly lo devuelve, y acaba en la
//    punta de Penn con su sirena encendida; Penn, triste;
// 5. la sala de reuniones de Dundee: el de BMG entra con la carpeta roja del proyecto («the publisher, BMG»), habla
//    al equipo, y en «cancel» se gira y la tira a la papelera; el equipo se queda de piedra, Penn se enfada;
// 6. la oficina de Londres de BMG (discos de oro, la ciudad bajo la lluvia, el autobús): el jefe de Londres pelea al
//    teléfono («fought for it»: golpea la mesa) y en «survived» levanta la caja del juego, sonríe y los de detrás del
//    cristal lo celebran.''', AUX + r'''
const f = (x) => en('fallo', x), c = (x) => en('cancelar', x);
const P2 = f(0.3055), P3 = f(0.6744), P4 = c(-0.0204), P5 = c(0.398), P6 = c(0.7931);
const golpe = f(0.0075), bug = f(0.4195), locos = f(0.5089), persigue = f(0.6088), furia = f(0.7057), programado = f(0.7921), escapar = f(0.8785), rampa = f(0.9016), emocion = f(0.9568);
const recuerdan = c(0), otros = c(0.1335), nadie = c(0.2423), poli = c(0.2962), poli2 = c(0.3489), editorial = c(0.5285), bmg = c(0.5695), cancelar = c(0.6865), ninguna = c(0.7451), londres = c(0.8732), lucha = c(0.9048), salvo = c(0.9599);
const sin = (t, v = 7) => Math.sin(t * v) > 0;

// ── 1 · la persecución estalla (ciudad de juguete desde arriba, sin personajes) ─────────────────────────────────
const p1 = (t) => {
  const e = t - golpe, p = e < 0 ? 0 : e < 1.3 ? 0.62 : e < 2.6 ? 0.78 : 0.92;
  const g = T.ciudad(R, t, { persecucion: p }) || {};
  if (e >= 0 && e < 1.1 && g.rojo) {   // la onda de sirena que sale del coche rojo
    const [rx, ry] = g.rojo, r = 5 + e * 30;
    for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2, x = Math.round(rx + Math.cos(a) * r), y = Math.round(ry + Math.sin(a) * r * 0.8); if (y > 15 && !(x > 270 && y < 48)) R.pset(x, y, (k + Math.floor(t * 8)) % 8 < 4 ? ROJO : AZUL); }
  }
  if (e >= 0 && g.rojo) resplandor(g.rojo[0], g.rojo[1], 24, Math.floor(t * 6) % 2 ? ROJO : AZUL, 0.5);
  if (e >= 0 && e < 0.14) T.tinte(R, 0, 179, [255, 250, 235], 0.6);
};

// ── 2 · Penn ante el monitor: el fallo ───────────────────────────────────────────────────────────────────────────
const SX0 = 166, SY0 = 109, SX1 = 189, SY1 = 124;   // la pantalla del monitor de la mesa (ciudadDelante, 'boton')
const p2 = (t) => {
  const o = { camara: 'boton', pantalla: 'ciudad' }, loco = t >= locos, falla = t > bug && t < locos, rojo = Math.floor(t * 6) % 2 === 0;
  T.ciudad(R, t, o);
  if (loco) resplandor(178, 104, 62, rojo ? ROJO : AZUL, 0.45);
  // Dailly entra al fondo con un montón de papeles; con el estallido da un bote y se le vuelan
  const w = tramo(t, P2 + 0.2, P2 + 2.4), dx = Math.round(lerp(-20, 36, w)), bote = t > locos && t < locos + 0.35;
  const d = R.actor(EL.daillyGT, dx, 144, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: t > locos, salto: bote ? 3 : 0, sostiene: t < locos ? true : false, habla: t > bug + 0.2 && t < locos && sin(t, 9) });
  if (t < locos) { const [mx, my] = d.mano; caja(mx - 3, my - 5, mx + 5, my + 1, hex('#f6f6ee')); R.rect(mx - 2, my - 3, mx + 4, my - 3, BLS); R.rect(mx - 2, my - 1, mx + 3, my - 1, BLS); }
  else for (let k = 0; k < 5; k++) { const u = Math.min(1, (t - locos) / 1.6), px = Math.round(dx + 10 + (k - 2) * 9 * u + Math.sin(t * 5 + k) * 3), py = Math.round(122 - 30 * Math.sin(Math.min(1, u * 1.4) * Math.PI * 0.9) + u * 26 + k); if (py < 146) { R.rect(px, py, px + 4, py + 2, C.k); R.rect(px + 1, py + 1, px + 3, py + 1, BL); } }
  // Penn, de pie delante, con la palanca de mando en la mano
  const loca = t > persigue ? Math.sin(t * 22) * 3 : t > locos ? Math.sin(t * 9) * 1.5 : Math.sin(t * 3);
  const salto = t > locos && t < locos + 0.4 ? Math.round(4 * Math.sin((t - locos) / 0.4 * Math.PI)) : 0;
  const pn = R.actor(EL.pennGT, 104, 162, t, { dir: 1, sostiene: [128 + Math.round(loca), 147], sorpresa: t > locos, habla: t < bug && sin(t, 6), salto });
  { const [mx, my] = pn.mano; caja(mx - 5, my + 1, mx + 6, my + 6, hex('#2a2832')); R.rect(mx - 4, my + 2, mx + 5, my + 2, hex('#4a4856')); R.pset(mx + 3, my + 4, ROJO); R.linea(mx, my + 1, mx + Math.round(loca * 0.7), my - 5, C.k); R.disco(mx + Math.round(loca * 0.7), my - 6, 2, C.k); R.disco(mx + Math.round(loca * 0.7), my - 6, 1, ROJO); }
  T.ciudadDelante(R, t, o);
  // la pantalla: normal, el fallo (rayas que corren) y la locura (luces que llenan la pantalla y coches que dan vueltas)
  if (falla) for (let y = SY0; y <= SY1; y++) if ((y + Math.floor(t * 20)) % 5 < 2) for (let x = SX0; x <= SX1; x++) R.pset(x, y, h(x, y + Math.floor(t * 30), 3) < 0.5 ? hex('#e8e8f0') : hex('#5a5a68'));
  if (loco) {
    R.rect(SX0, SY0, SX1, SY1, rojo ? hex('#e8303a') : hex('#3a6aff')); for (let y = SY0; y <= SY1; y += 3) R.rect(SX0, y, SX1, y, rojo ? hex('#ff7a7a') : hex('#8ab0ff'));
    for (let k = 0; k < 4; k++) { const a = t * 5 - k * 0.7, x = Math.round(177 + Math.cos(a) * 8), y = Math.round(116 + Math.sin(a) * 5); R.rect(x - 1, y - 1, x + 1, y + 1, k === 0 ? ROJO : hex('#f6f6f6')); if (k) R.pset(x, y - 1, (Math.floor(t * 8) + k) % 2 ? ROJO : AZUL); }
  }
  if (falla && t > bug + 0.15) R.icono('?', 116, 116, hex('#f0c040'), C.k, 2);
  if (t > locos && t < locos + 1.3) R.icono('!', 120, 114 - salto, ROJO, C.k, 2);
};

// ── 3 · gag 4: el camión de los helados perseguido (fondo local en marcha) ───────────────────────────────────────
const V = 150, T1 = emocion + 0.05;
const camX = (t) => { const u = t - P3, u1 = T1 - P3, D = 0.7; if (u < u1) return V * u; const d = Math.min(u - u1, D); return V * u1 + V * (d - d * d / (2 * D)); };
const frena = (t, t0, D) => { const d = Math.max(0, Math.min(t - t0, D)); return V * (d - d * d / (2 * D)); };
const CIELO3 = [hex('#5ab0f0'), hex('#78c4f6'), hex('#9ad4f8'), hex('#c4e6fa')];
const NUBE3 = [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8de')];
const BLOQUES = [[hex('#e84a4a'), hex('#a8303a')], [hex('#4a8ae8'), hex('#2e5aa8')], [hex('#f0c040'), hex('#b88a20')], [hex('#3ac8a8'), hex('#24887a')], [hex('#e87ab8'), hex('#a84a80')], [hex('#8ad04a'), hex('#5a9a2a')]];
const camion = (x, y, t, bola) => {   // el camión de los helados de juguete, de perfil hacia la derecha (x centro, y ruedas)
  x = Math.round(x); y = Math.round(y); const x0 = x - 31, y0 = y - 40, CR = hex('#fff2d8'), CRs = hex('#e8d0a8'), RS = hex('#ff8ac8'), RSs = hex('#d0569a');
  caja(x0 + 1, y0 + 14, x0 + 46, y0 + 35, CR); R.rect(x0 + 2, y0 + 30, x0 + 45, y0 + 34, RS); R.rect(x0 + 2, y0 + 33, x0 + 45, y0 + 34, RSs); R.rect(x0 + 2, y0 + 15, x0 + 45, y0 + 15, hex('#ffffff'));
  for (let i = 0; i < 11; i++) R.rect(x0 + 6 + i * 2, y0 + 15, x0 + 6 + i * 2, y0 + 17, i % 2 ? RS : hex('#ffffff'));   // el toldo de rayas
  caja(x0 + 6, y0 + 18, x0 + 30, y0 + 27, hex('#3a2a40')); R.rect(x0 + 7, y0 + 25, x0 + 29, y0 + 26, CRs);
  for (let k = 0; k < 3; k++) { const bx = x0 + 10 + k * 7; R.disco(bx, y0 + 23, 2, [RS, hex('#8a5a2a'), hex('#9ae0a8')][k]); }   // las bolas del escaparate
  R.rect(x0 + 34, y0 + 18, x0 + 42, y0 + 27, C.k); R.rect(x0 + 35, y0 + 19, x0 + 41, y0 + 26, hex('#a8d8f0')); R.pset(x0 + 36, y0 + 20, hex('#ffffff'));
  R.poligono([[x0 + 46, y0 + 20], [x0 + 55, y0 + 20], [x0 + 61, y0 + 28], [x0 + 61, y0 + 35], [x0 + 46, y0 + 35]], C.k);
  R.poligono([[x0 + 47, y0 + 21], [x0 + 54, y0 + 21], [x0 + 60, y0 + 28], [x0 + 60, y0 + 34], [x0 + 47, y0 + 34]], CR);
  R.poligono([[x0 + 49, y0 + 22], [x0 + 54, y0 + 22], [x0 + 58, y0 + 27], [x0 + 49, y0 + 27]], hex('#a8d8f0')); R.pset(x0 + 51, y0 + 23, hex('#ffffff'));
  R.rect(x0 + 47, y0 + 30, x0 + 60, y0 + 34, RS); R.rect(x0 + 59, y0 + 29, x0 + 61, y0 + 30, hex('#ffe890')); R.rect(x0, y0 + 30, x0 + 1, y0 + 32, hex('#ff3a3a'));
  for (const wx of [x0 + 13, x0 + 50]) { R.disco(wx, y - 4, 5, C.k); R.disco(wx, y - 4, 2, hex('#c0c4d4')); R.pset(wx + Math.round(Math.cos(t * 30) * 2), y - 4 + Math.round(Math.sin(t * 30) * 2), C.k); }
  // el cucurucho del techo con su bola (bola: cuánto se ha levantado la bola)
  R.poligono([[x0 + 17, y0 + 4], [x0 + 31, y0 + 4], [x0 + 24, y0 + 14]], C.k); R.poligono([[x0 + 18, y0 + 5], [x0 + 30, y0 + 5], [x0 + 24, y0 + 13]], hex('#e8b060'));
  for (let i = 0; i < 3; i++) R.linea(x0 + 19 + i * 4, y0 + 5, x0 + 22 + i * 3, y0 + 11, hex('#b8803a'));
  const by = y0 + 2 - Math.round(bola); R.disco(x0 + 24, by, 7, C.k); R.disco(x0 + 24, by, 6, RS); R.disco(x0 + 22, by - 2, 2, hex('#ffc8e4')); R.disco(x0 + 24, by - 7, 2, C.k); R.disco(x0 + 24, by - 7, 1, hex('#e82a3a'));
};
const policia = (x, y, t, furia, mareo) => {   // el coche de policía de juguete grande, con cejas de enfado y la sirena
  x = Math.round(x); y = Math.round(y); G.cochePolicia(R, x, y, { s: 2, t });
  const x0 = x - 32, y0 = y - 32, on = Math.floor(t * 6) % 2;
  resplandor(x0 + 32, y0 + 3, 12, on ? ROJO : AZUL, 0.35);
  if (furia > 0) { // los ojos en el parabrisas y las cejas en V
    for (const ex of [x0 + 24, x0 + 35]) { R.rect(ex, y0 + 11, ex + 3, y0 + 14, hex('#ffffff')); R.rect(ex + 2, y0 + 12, ex + 3, y0 + 14, C.k); }
    R.linea(x0 + 23, y0 + 9, x0 + 28, y0 + 11, C.k); R.linea(x0 + 23, y0 + 8, x0 + 28, y0 + 10, C.k); R.linea(x0 + 34, y0 + 11, x0 + 39, y0 + 9, C.k); R.linea(x0 + 34, y0 + 10, x0 + 39, y0 + 8, C.k);
    if (furia > 1) for (let k = 0; k < 2; k++) { const u = (t * 2 + k * 0.5) % 1, px = x0 + 14 + k * 30, py = Math.round(y0 - 2 - u * 10); R.disco(px, py, 2 + Math.round(u * 2), mez(hex('#ffffff'), hex('#c8ccd8'), u)); }
  }
  if (mareo) for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.1; R.icono('X', Math.round(x0 + 30 + Math.cos(a) * 12), Math.round(y0 - 6 + Math.sin(a) * 3), hex('#f0c040'), C.k, 1); }
};
const p3 = (t) => {
  const cam = camX(t), u = t - P3;
  capa('cielo3', () => { degradado(0, 0, 319, 92, CIELO3, 1); trama(0, 93, 319, 117, [hex('#7a86a0'), hex('#6e7a94'), hex('#7a86a0')], 2); });
  // nubes de tres tonos a tres velocidades y pájaros
  for (const [k, cy, w, hh, v] of [[0, 22, 26, 8, 0.03], [1, 36, 18, 6, 0.06], [2, 18, 14, 5, 0.1], [3, 40, 30, 9, 0.03]]) { const x = ((k * 97 - cam * v - t * (2 + k)) % 420 + 420) % 420 - 50; nube(x, cy, w, hh, NUBE3); }
  for (let k = 0; k < 3; k++) pajaro(((k * 70 + t * 14) % 360) - 20, 26 + k * 5 + Math.sin(t * 2 + k) * 2, t, hex('#3a4a6a'));
  // la ciudad lejana (pálida, lenta)
  { const k = 0.12, o = cam * k; for (let i = Math.floor(o / 26) - 1; i < Math.floor(o / 26) + 15; i++) { const x = Math.round(i * 26 - o), hgt = 22 + Math.round(h(i, 1, 5) * 26), top = Math.max(i % 3 === 0 ? 48 : 52, 92 - hgt); R.rect(x, top, x + 22, 92, hex('#a8bcd8')); R.rect(x + 20, top, x + 22, 92, hex('#94a8c8')); for (let yy = top + 3; yy < 90; yy += 5) for (let xx = x + 3; xx < x + 19; xx += 5) R.pset(xx, yy, hex('#c8d8ec')); } }
  // los bloques de juguete de la calle (con ventanas, toldos y puertas)
  { const k = 0.45, o = cam * k; let i0 = Math.floor(o / 60) - 1;
    for (let i = i0; i < i0 + 8; i++) { const x = Math.round(i * 60 - o), w = 50 + Math.round(h(i, 2, 5) * 8), [c1, c2] = BLOQUES[((i % 6) + 6) % 6], top = 46 + Math.round(h(i, 3, 5) * 22);
      R.rect(x - 1, top - 1, x + w + 1, 116, C.k); R.rect(x, top, x + w, 116, c1); R.rect(x + w - 4, top, x + w, 116, c2); R.rect(x, top, x + w, top + 2, mez(c1, hex('#ffffff'), 0.35));
      for (let yy = top + 7; yy < 98; yy += 10) for (let xx = x + 5; xx < x + w - 8; xx += 9) { const luz = h(i * 7 + xx, yy, 6) < 0.25; caja(xx, yy, xx + 5, yy + 6, luz ? hex('#ffe890') : hex('#a8d8f0')); R.pset(xx + 1, yy + 1, hex('#ffffff')); }
      for (let j = 0; j < Math.floor(w / 6); j++) R.rect(x + 2 + j * 6, 100, x + 4 + j * 6, 102, j % 2 ? hex('#ffffff') : c2);   // el toldo
      R.rect(x + 2, 103, x + w - 2, 103, C.k); caja(x + w / 2 - 5, 104, x + w / 2 + 5, 116, hex('#5a3a2a')); R.pset(Math.round(x + w / 2 + 3), 110, hex('#f0c040'));
      caja(x + 4, 106, x + w / 2 - 8, 114, hex('#a8d8f0'));
      if (h(i, 4, 5) < 0.5) { R.rect(x + 8, top - 6, x + 16, top - 1, C.k); R.rect(x + 9, top - 5, x + 15, top - 2, hex('#c0c4d4')); } else { R.rect(x + w - 16, top - 9, x + w - 8, top - 1, C.k); R.rect(x + w - 15, top - 8, x + w - 9, top - 2, hex('#8a6a3a')); }
    } }
  // la acera del fondo: losas, farolas, árboles y la gente que salta al pasar la persecución
  R.rect(0, 117, 319, 128, hex('#d8d0c0')); for (let x = 0; x < 320; x++) { const wx = x + Math.round(cam); if (wx % 14 === 0) R.rect(x, 117, x, 127, hex('#b8ae9c')); } R.rect(0, 122, 319, 122, hex('#c8c0ae')); R.rect(0, 128, 319, 130, hex('#8a8478')); R.rect(0, 128, 319, 128, hex('#e8e2d4'));
  for (let i = Math.floor(cam / 120) - 1; i < Math.floor(cam / 120) + 4; i++) {
    const x = Math.round(i * 120 - cam);
    if (i % 2) { R.rect(x - 1, 70, x + 1, 127, C.k); R.rect(x, 71, x, 126, hex('#5a6a7a')); caja(x - 5, 66, x + 5, 72, hex('#ffe890')); }
    else { R.rect(x - 1, 100, x + 1, 127, C.k); R.rect(x, 101, x, 126, hex('#8a5a2a')); R.disco(x, 92, 11, C.k); R.disco(x, 92, 10, hex('#3a9a3a')); R.disco(x - 3, 89, 6, hex('#5ac83a')); R.disco(x - 4, 87, 2, hex('#8ae08a')); }
    const px = x + 50, cerca = Math.abs(px - 200) < 70 && u < T1 - P3 + 0.2;
    persona(px, 126, t, [hex('#e84a4a'), hex('#4a8ae8'), hex('#f0c040')][((i % 3) + 3) % 3], hex('#4a2a14'), { salta: cerca, brazos: cerca, dir: -1 });
    persona(px + 14, 126, t + 0.3, hex('#5ac83a'), hex('#1c1222'), { salta: cerca, brazos: cerca && sin(t, 12) });
  }
  // la calzada: asfalto con grano, rayas que pasan y una tapa
  for (let y = 131; y <= 171; y++) for (let x = 0; x < 320; x++) { const wx = x + Math.round(cam); R.pset(x, y, h(wx, y, 7) < 0.12 ? hex('#5e6068') : h(wx, y, 8) < 0.1 ? hex('#3a3c44') : hex('#4a4c54')); }
  for (let x = 0; x < 320; x++) { const wx = x + Math.round(cam); if (wx % 40 < 20) R.rect(x, 150, x, 151, hex('#f0e8c8')); }
  for (let i = Math.floor(cam / 230); i < Math.floor(cam / 230) + 3; i++) { const x = Math.round(i * 230 + 90 - cam); R.disco(x, 140, 6, C.k); R.disco(x, 140, 5, hex('#6a6c74')); R.rect(x - 4, 140, x + 4, 140, C.k); }
  // la rampa: una tabla sobre dos ladrillos (el camión la coge en «escaping»)
  const xr = Math.round(176 + 26 + V * (rampa - P3) - cam);
  if (xr > -40 && xr < 360) { R.poligono([[xr - 22, 168], [xr + 4, 156], [xr + 6, 158], [xr - 20, 170]], C.k); R.poligono([[xr - 20, 168], [xr + 4, 157], [xr + 4, 158], [xr - 19, 169]], hex('#c8964a')); caja(xr - 2, 158, xr + 8, 168, hex('#c8543a')); R.rect(xr - 1, 163, xr + 7, 163, hex('#8a3424')); }
  // el camión, los policías y sus rayas de velocidad
  const vuelo = t > rampa && t < emocion ? Math.sin((t - rampa) / (emocion - rampa) * Math.PI) : 0, aterriza = t > emocion && t < emocion + 0.35;
  const tx = 176 + V * u - cam, ty = 166 - Math.round(vuelo * 26) + (aterriza ? 1 : 0) + (u < T1 - P3 ? Math.round(Math.sin(t * 18)) : 0);
  const bola = t > rampa ? Math.max(0, Math.sin(Math.min(1, (t - rampa - 0.12) / 0.95) * Math.PI) * 14) : 0;
  const tb = emocion + 0.05;
  const w1 = (t < tb ? V * u : V * (tb - P3) + frena(t, tb, 0.7)) + lerp(-80, 100, tramo(t, P3, furia + 0.3)) - cam;
  const w2 = (t < tb + 0.2 ? V * u : V * (tb + 0.2 - P3) + frena(t, tb + 0.2, 0.6)) + lerp(-150, 12, tramo(t, programado - 0.4, programado + 0.8)) - cam;
  const parado = t > tb + 0.7;
  if (!parado) for (let k = 0; k < 6; k++) { const yy = 136 + k * 6, l = 14 + (k * 7) % 12, xx = Math.round(((k * 53 - t * 400) % 320 + 320) % 320); R.rect(xx, yy, xx + l, yy, mez(hex('#4a4c54'), hex('#ffffff'), 0.45)); }
  const rastro = (x, y) => { for (let k = 0; k < 3; k++) { const a = ((t * 3 + k * 0.33) % 1); R.disco(Math.round(x - 6 - a * 22), Math.round(y - 3 - a * 6), Math.round(2 + a * 3), mez(hex('#d8d0c0'), hex('#4a4c54'), a)); } };
  if (w2 > -40) { rastro(w2 - 30, 166); policia(w2, 166 + (parado ? 0 : Math.round(Math.sin(t * 25 + 1))), t, t > programado ? 1 : 0, parado); }
  rastro(w1 - 30, 166); policia(w1, 166 + (t > furia && !parado ? Math.round(Math.sin(t * 30) * 2) : 0), t, t > furia ? 2 : t > P3 + 0.2 ? 1 : 0, parado);
  if (t > tb && t < tb + 0.9) for (let k = 0; k < 6; k++) { const a = (t - tb) / 0.9; R.disco(Math.round(w1 + 26 + k * 3), Math.round(160 - a * 8 - k), Math.round(2 + a * 4), mez(hex('#e8e8f0'), hex('#4a4c54'), a)); }   // el humo del derrape
  if (tx < 360) { if (vuelo === 0) rastro(tx - 30, 166); if (vuelo > 0) R.rect(Math.round(tx) - 26, 170, Math.round(tx) + 26, 171, hex('#34363c')); camion(tx, ty, t, bola); }
  if (aterriza) for (let k = 0; k < 8; k++) { const a = (t - emocion) / 0.35; R.disco(Math.round(tx - 30 + k * 8), Math.round(168 - a * 6), Math.round(1 + a * 3), hex('#e8e2d4')); }
  // el bordillo de delante: piedras, hierba con flores y bolardos que pasan rápido
  { const o = cam * 1.6; R.rect(0, 172, 319, 174, hex('#b8b4a8')); R.rect(0, 172, 319, 172, hex('#e8e4d8')); for (let x = 0; x < 320; x++) { const wx = x + Math.round(o); if (wx % 22 === 0) R.rect(x, 172, x, 174, hex('#8a8478')); for (let y = 175; y < 180; y++) R.pset(x, y, h(wx, y, 11) < 0.3 ? hex('#3a8a2a') : h(wx, y, 12) < 0.04 ? hex('#ff8ac8') : h(wx, y, 13) < 0.04 ? hex('#f0e040') : hex('#5ab83a')); }
    for (let i = Math.floor(o / 90); i < Math.floor(o / 90) + 5; i++) { const x = Math.round(i * 90 + 30 - o); caja(x - 3, 160, x + 3, 179, hex('#2a2832')); R.rect(x - 2, 163, x + 2, 164, hex('#f0c040')); R.pset(x - 1, 161, hex('#5a5868')); } }
};

// ── 4 · la sala de pruebas: nadie quiere ser el policía (fondo local) ────────────────────────────────────────────
const MESA4 = [hex('#d8c8a0'), hex('#b8a478'), hex('#8a7a58')];
const sala4 = () => {
  // el techo de placas con dos fluorescentes
  trama(0, 0, 319, 11, [hex('#e8e6dc'), hex('#e8e6dc'), hex('#d8d6cc')], 21); for (let x = 0; x < 320; x += 40) R.rect(x, 0, x, 11, hex('#c0beb4')); R.rect(0, 11, 319, 12, hex('#a8a69c'));
  for (const x0 of [40, 190]) { caja(x0, 3, x0 + 70, 8, hex('#f8f8f0'), hex('#b8b6ac')); R.rect(x0 + 2, 5, x0 + 68, 6, hex('#ffffff')); }
  // la pared de bloques pintados con sus juntas, el zócalo verde y el rodapié
  for (let y = 13; y < 98; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 13) / 7), junta = (y - 13) % 7 === 6 || (x + (fila % 2) * 12) % 24 === 0; R.pset(x, y, junta ? hex('#b4b0c0') : h(x, y, 22) < 0.12 ? hex('#cccadc') : hex('#d6d4e4')); }
  trama(0, 98, 319, 117, [hex('#7a9a8a'), hex('#7a9a8a'), hex('#6e8e7e')], 23); R.rect(0, 98, 319, 99, hex('#5a7a6a')); R.rect(0, 116, 319, 118, hex('#4a5a50'));
  // la ventana de aluminio con la persiana a medias (fuera, la lluvia y las naves)
  caja(14, 24, 86, 90, hex('#c0c4cc')); R.rect(16, 26, 84, 88, hex('#7a8a9a')); R.rect(49, 26, 51, 88, hex('#c0c4cc')); R.rect(14, 90, 88, 93, hex('#e0e0e8')); R.rect(14, 93, 88, 93, hex('#8a8c94'));
  for (let y = 27; y < 87; y++) for (let x = 17; x < 84; x++) { if (x >= 49 && x <= 51) continue; R.pset(x, y, y > 62 ? (h(x, y, 24) < 0.2 ? hex('#6a7480') : hex('#5a6470')) : h(x, y, 25) < 0.3 ? hex('#9aa8b8') : hex('#8a98aa')); }
  for (const [x0, x1, top] of [[18, 40, 58], [42, 48, 62], [52, 82, 54]]) { R.rect(x0, top, x1, 86, hex('#6a6e78')); R.rect(x0, top, x1, top + 1, hex('#8a8e98')); for (let x = x0 + 2; x < x1; x += 4) R.rect(x, top + 3, x + 1, 84, hex('#5e626c')); }
  for (let y = 26; y < 44; y += 2) { R.rect(16, y, 84, y, hex('#e8e8ee')); R.rect(16, y + 1, 84, y + 1, hex('#c8c8d0')); } R.rect(16, 44, 84, 45, hex('#a8a8b0'));
  // el corcho con bocetos (una manzana de calles, un cochecito, un bichito)
  caja(100, 26, 160, 72, hex('#c8935a'), hex('#7a5a3a')); trama(101, 27, 159, 71, [hex('#c8935a'), hex('#b8834a'), hex('#d8a36a')], 26);
  caja(104, 30, 124, 48, hex('#f6f6ee')); R.rect(106, 38, 122, 39, hex('#3a3a4a')); R.rect(113, 32, 114, 46, hex('#3a3a4a')); R.rect(107, 33, 111, 36, hex('#4a8ae8')); R.rect(116, 41, 120, 45, hex('#5ac83a')); R.pset(114, 30, ROJO);
  caja(130, 32, 154, 46, hex('#fff4c8')); R.rect(134, 38, 148, 41, hex('#e84a4a')); R.rect(137, 36, 145, 37, hex('#e84a4a')); R.pset(136, 42, C.k); R.pset(146, 42, C.k); R.pset(142, 32, AZUL);
  caja(110, 52, 128, 68, hex('#f6f6ee')); R.disco(119, 61, 4, hex('#f08a2a')); R.rect(116, 55, 122, 57, hex('#5ac83a')); R.pset(118, 60, C.k); R.pset(120, 60, C.k); R.pset(118, 52, ROJO);
  caja(134, 52, 156, 68, hex('#e8f0f8')); for (let k = 0; k < 4; k++) R.rect(137, 55 + k * 3, 150 - k * 2, 55 + k * 3, hex('#8a9ab0')); R.pset(146, 52, hex('#5ac83a'));
  // el póster de cine sin letras (la ciudad de noche) y la balda con cajas de juegos y una planta
  caja(172, 22, 204, 70, hex('#1e2a50')); for (let k = 0; k < 6; k++) { const bx = 175 + k * 5, bh = 10 + Math.round(h(k, 1, 27) * 18); R.rect(bx, 66 - bh, bx + 4, 66, hex('#3a4a7a')); R.pset(bx + 2, 62 - bh + 4, hex('#ffe890')); } R.disco(196, 30, 3, hex('#f6e890')); R.rect(176, 64, 200, 66, hex('#e84a4a'));
  R.rect(214, 64, 272, 66, hex('#8a6a3a')); R.rect(214, 66, 272, 66, hex('#5a3a1a'));
  for (let k = 0; k < 6; k++) { const bx = 216 + k * 7, col = BLOQUES[k % 6][0]; caja(bx, 46 + (k % 2) * 2, bx + 6, 63, col); R.rect(bx + 2, 50, bx + 4, 51, hex('#f6f6ee')); }
  R.rect(258, 56, 268, 63, C.k); R.rect(259, 57, 267, 63, hex('#c8543a')); for (const [dx, dy] of [[-4, -6], [0, -9], [4, -7], [-2, -4], [3, -3]]) { R.disco(263 + dx, 54 + dy, 3, hex('#3a8a2a')); R.disco(263 + dx - 1, 53 + dy, 1, hex('#5ac83a')); }
  // la fuente de agua al fondo a la derecha
  caja(282, 78, 304, 117, hex('#e8e8f0')); R.rect(284, 100, 302, 101, hex('#c0c4d4')); R.rect(290, 92, 296, 94, hex('#4a4856'));
  caja(284, 52, 302, 78, hex('#9ad0f0'), hex('#3a6a9a')); R.rect(286, 54, 288, 76, hex('#c8ecff'));
  // la moqueta de losetas en perspectiva, con un cable encintado
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 119) / 61, lx = Math.round((x - 160) / (0.5 + z * 0.8) + 1000), ly = Math.floor(Math.pow(z, 0.8) * 9); const junta = lx % 30 === 0 || (y > 119 && Math.floor(Math.pow((y - 120) / 61, 0.8) * 9) !== ly); R.pset(x, y, junta ? hex('#5a6278') : (ly + Math.floor(lx / 30)) % 2 ? (h(x, y, 28) < 0.3 ? hex('#7a84a0') : hex('#727c98')) : (h(x, y, 29) < 0.3 ? hex('#6a7490') : hex('#646e8a'))); }
  R.linea(300, 119, 248, 179, hex('#2a2832')); R.rect(268, 148, 276, 151, hex('#c8c0a8'));
};
const mesa4 = () => {   // la mesa de delante, con disquetes y una libreta (se pinta después de los de detrás)
  R.rect(62, 145, 258, 151, C.k); R.rect(63, 146, 257, 149, MESA4[0]); R.rect(63, 146, 257, 146, hex('#ece0c0')); R.rect(63, 150, 257, 150, MESA4[2]);
  R.rect(66, 151, 254, 160, C.k); R.rect(67, 151, 253, 159, MESA4[1]); for (let x = 70; x < 252; x += 23) R.rect(x, 152, x, 158, MESA4[2]);
  for (const lx of [70, 248]) { R.rect(lx - 2, 160, lx + 2, 178, C.k); R.rect(lx - 1, 160, lx + 1, 177, hex('#8a8c94')); }
  R.rect(64, 178, 256, 179, hex('#4a5068'));
  caja(228, 139, 244, 145, hex('#f6f6ee')); for (let k = 0; k < 3; k++) R.rect(230, 141 + k, 240 - k * 2, 141 + k, hex('#8a9ab0'));
  for (let k = 0; k < 3; k++) { caja(80 + k * 3, 140 - k, 88 + k * 3, 145 - k, [hex('#3a3a4a'), hex('#4a8ae8'), hex('#e84a4a')][k]); }
};
const p4 = (t) => {
  capa('sala4', sala4);
  // vida: el fluorescente que parpadea, la lluvia, las burbujas de la fuente
  if (Math.sin(t * 13) > 0.85) R.rect(192, 5, 258, 6, hex('#c8c8c0'));
  R.recorte([17, 46, 83, 87]); for (let k = 0; k < 26; k++) { const x = Math.round((k * 37 + t * 40) % 66) + 17, y = Math.round((k * 23 + t * 160) % 42) + 46; R.linea(x, y, x - 1, y + 3, hex('#c8d4e4')); } R.recorte(null);
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k * 0.33) % 1; R.disco(294 + (k - 1) * 3, Math.round(74 - u * 18), 1, hex('#e8f8ff')); }
  const disputa = t > recuerdan - 0.1 && t < nadie - 0.4;
  // el mando del policía: Penn lo deja en la mesa (nadie), lo empuja a Jones; Jones lo manda a Dailly (poli); Dailly lo devuelve (poli2)
  const deja = t > nadie, e1 = tramo(t, nadie + 0.15, nadie + 0.5), e2 = tramo(t, poli - 0.35, poli + 0.1), e3 = tramo(t, poli2 - 0.55, poli2 - 0.1);
  const empJ = t > poli - 0.45 && t < poli + 0.15, empD = t > poli2 - 0.65 && t < poli2 - 0.05;
  const mx4 = Math.round(e3 > 0 ? lerp(212, 84, e3) : e2 > 0 ? lerp(102, 212, e2) : lerp(72, 102, e1));
  // Jones (izquierda) y Dailly (derecha), detrás de la mesa
  const coge = t > otros + 0.6, jx = 92, dx = 196;
  R.actor(EL.jonesGT, jx, 146, t, { dir: 1, habla: t > recuerdan && t < otros && sin(t, 8), dedo: (t > recuerdan + 0.3 && t < otros - 0.3) || empJ, sonrisa: t > nadie + 0.3 && t < poli - 0.5, enfado: t > poli - 0.5 && t < poli2 });
  const da = R.actor(EL.daillyGT, dx, 146, t, { dir: -1, habla: t > otros && t < nadie && sin(t, 8), sostiene: coge && !empD ? [dx - 2, 134] : false, dedo: empD, sonrisa: coge && !empD, enfado: empD });
  // Penn entra por la izquierda con el mando de policía y se queda en su punta de la mesa
  const pe = tramo(t, nadie - 1.2, nadie - 0.2), px = Math.round(lerp(-22, 44, pe));
  const pn = R.actor(EL.pennGT, px, 160, t, { dir: 1, anda: pe > 0 && pe < 1, sostiene: !deja ? [px + 24, 141] : t < nadie + 0.5 ? [mx4 - 4, 141] : false, habla: t > nadie - 0.3 && t < nadie + 0.6 && sin(t, 9), triste: t > poli2 - 0.2, dedo: t > poli - 0.1 && t < poli + 0.4 });
  mesa4();
  G.monitorTubo(R, 160, 145, { pantalla: 'ciudad', t });
  // el mando rojo del ladrón: en la mesa y luego en la mano de Dailly (en la mesa mientras empuja)
  if (coge && !empD) { const [mx, my] = da.mano; mando(mx + 1, my + 4, hex('#e84a4a'), hex('#a8303a'), t); }
  else mando(coge ? 184 : 182, 145, hex('#e84a4a'), hex('#a8303a'), t);
  // el mando azul del policía
  if (!deja && px > -12) { const [mx, my] = pn.mano; mando(mx + 2, my + 4, hex('#4a8ae8'), hex('#2e5aa8'), t, 1); }
  else if (deja) {
    mando(mx4, 145, hex('#4a8ae8'), hex('#2e5aa8'), t, t > poli2 ? 1 : 0.3);
    const ida = (e1 > 0 && e1 < 1) || (e2 > 0 && e2 < 1), vuelve = e3 > 0 && e3 < 1;
    if (ida || vuelve) for (let k = 0; k < 3; k++) { const x0 = vuelve ? mx4 + 14 : mx4 - 22; R.rect(x0, 138 + k * 2, x0 + 7, 138 + k * 2, hex('#f6f6ee')); }
  }
  if (t > poli - 0.4 && t < poli2 - 0.6) R.icono('X', jx + 4, 104, ROJO, C.k, 2);
  if (t > poli2 - 0.6) R.icono('X', dx + 4, 104, ROJO, C.k, 2);
  // los bocadillos de la discusión: el policía furioso que persigue / el mando de policía con una X
  if (disputa && t < otros + 0.2) bocadillo(46, 62, 90, 94, jx + 8, 116, () => { G.cochePolicia(R, 68, 88, { t }); for (const ex of [62, 70]) { R.rect(ex, 78, ex + 2, 79, C.k); } R.icono('!', 82, 68, ROJO, C.k, 1); });
  if (t > otros - 0.1 && t < nadie - 0.3) bocadillo(208, 64, 252, 94, dx + 7, 116, () => { mando(226, 88, hex('#4a8ae8'), hex('#2e5aa8'), t, 1); R.icono('X', 238, 68, ROJO, C.k, 2); });
};

// ── 5 · la sala de reuniones: BMG lo quiere cancelar ────────────────────────────────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'oficina', camara: 'reunion' };
  T.dundee(R, t, o);
  const ent = tramo(t, P5 + 0.15, P5 + 1.9), bx = Math.round(lerp(330, 256, ent)), gira = t > cancelar - 0.2, tira = tramo(t, cancelar, cancelar + 0.5);
  const susto = t > cancelar + 0.25;
  R.actor(EL.jonesGT, 40, 150, t, { dir: 1, sonrisa: t < editorial, sorpresa: susto && t < cancelar + 1.1, triste: t > cancelar + 1.1 });
  R.actor(EL.pennGT, 82, 150, t, { dir: 1, habla: t < P5 + 1.2 && sin(t, 7), sorpresa: susto && t < cancelar + 0.8, enfado: t > cancelar + 0.8, dedo: t > ninguna && t < ninguna + 0.8 });
  R.actor(EL.daillyGT, 166, 150, t, { dir: 1, sorpresa: susto, salto: t > cancelar + 0.25 && t < cancelar + 0.45 ? 2 : 0 });
  const b = R.actor(EL.ejecutivoBMG, bx, 150, t, { dir: gira ? 1 : -1, anda: ent > 0 && ent < 1, habla: (t > editorial && t < cancelar && sin(t, 7)) || (t > ninguna && sin(t, 6)), sostiene: tira === 0 ? (gira ? [bx + 24, 124] : (t > bmg && t < bmg + 0.8 ? [bx - 8, 118 + Math.round(Math.abs(Math.sin(t * 9)) * 3)] : true)) : false, dedo: tira >= 1 && t < ninguna + 0.2, enfado: t > bmg });
  const carpeta = (x, y) => { x = Math.round(x); y = Math.round(y); caja(x - 6, y - 8, x + 6, y, hex('#d8303a')); R.rect(x - 5, y - 7, x + 5, y - 7, hex('#f49a9a')); R.rect(x - 3, y - 5, x + 3, y - 4, hex('#f6f6ee')); R.pset(x + 4, y - 2, hex('#f0c040')); };
  if (tira === 0) { const [mx, my] = b.mano; carpeta(mx, my + 4); }
  else if (tira < 1) { const x = lerp(b.mano[0], 294, tira), y = lerp(b.mano[1] + 4, 136, tira) - Math.sin(tira * Math.PI) * 10; if (y < 133) carpeta(x, y); }
  if (tira > 0.9) { R.rect(289, 129, 299, 131, C.k); R.rect(290, 129, 298, 130, hex('#d8303a')); }
  T.dundeeDelante(R, t, o);
  if (t > cancelar + 0.3 && t < cancelar + 1.3) R.icono('!', 172, 108 - (t < cancelar + 0.45 ? 2 : 0), ROJO, C.k, 2);
};

// ── 6 · la oficina de Londres de BMG (fondo local) ──────────────────────────────────────────────────────────────
const VERDE6 = [hex('#2e6a6a'), hex('#28605f'), hex('#347272')];
const oficina6 = () => {
  // pared verde azulada con molduras, luz de techo suave arriba a la derecha
  trama(0, 0, 319, 118, VERDE6, 31); R.rect(0, 0, 319, 4, hex('#e8e0c8')); R.rect(0, 5, 319, 6, hex('#b8ae94'));
  for (const [x0, x1] of [[118, 254]]) { R.rect(x0, 16, x1, 16, hex('#3e8484')); R.rect(x0, 16, x0, 80, hex('#3e8484')); R.rect(x0, 80, x1, 80, hex('#1e4a4a')); R.rect(x1, 16, x1, 80, hex('#1e4a4a')); }
  // el ventanal: Londres bajo la lluvia (torre del reloj genérica, tejados, chimeneas)
  caja(10, 22, 108, 104, hex('#e8e4d8'), hex('#5a4a3a')); R.rect(13, 25, 105, 101, hex('#7a8494'));
  degradado(13, 25, 105, 74, [hex('#8a94a4'), hex('#9aa4b2'), hex('#aab2be')], 32);
  for (const [cx, cy, w, hh] of [[40, 36, 16, 5], [92, 32, 10, 4], [60, 46, 18, 6]]) nube(cx, cy, w, hh, [hex('#c0c6d0'), hex('#a8b0bc'), hex('#8e96a4')]);
  R.rect(70, 38, 82, 101, hex('#5a5e6a')); R.poligono([[68, 38], [76, 26], [84, 38]], hex('#4a4e5a')); R.disco(76, 47, 4, hex('#e8e0b8')); R.disco(76, 47, 3, hex('#d8c890')); R.pset(76, 45, C.k); R.pset(77, 47, C.k); R.pset(76, 47, C.k); for (let y = 56; y < 100; y += 6) R.rect(72, y, 80, y + 2, hex('#6a6e7a'));
  for (let i = 0; i < 7; i++) { const x0 = 13 + i * 14, top = 66 + Math.round(h(i, 1, 33) * 14); if (x0 > 66 && x0 < 86) continue; R.rect(x0, top, x0 + 13, 101, hex('#6a5a5a')); R.poligono([[x0, top], [x0 + 6, top - 5], [x0 + 13, top]], hex('#4a4a56')); R.rect(x0 + 9, top - 8, x0 + 11, top - 3, hex('#5a4a44')); for (let y = top + 4; y < 99; y += 7) { R.rect(x0 + 2, y, x0 + 4, y + 3, h(i, y, 34) < 0.4 ? hex('#f0d890') : hex('#3a3e4a')); R.rect(x0 + 8, y, x0 + 10, y + 3, h(i + 3, y, 34) < 0.4 ? hex('#f0d890') : hex('#3a3e4a')); } }
  R.rect(58, 25, 60, 101, hex('#e8e4d8')); R.rect(13, 62, 105, 64, hex('#e8e4d8')); R.rect(8, 104, 110, 108, hex('#d8d0bc')); R.rect(8, 108, 110, 109, hex('#8a8270'));
  // los tres discos de oro enmarcados (sin letras) y un cuadro con una guitarra
  for (let k = 0; k < 3; k++) { const x0 = 126 + k * 42; caja(x0, 22, x0 + 32, 58, hex('#1c1222'), hex('#c8a040')); R.rect(x0 + 1, 23, x0 + 31, 23, hex('#f0d878')); R.disco(x0 + 16, 37, 11, hex('#c8962a')); R.disco(x0 + 16, 37, 10, hex('#f0c040')); for (let r = 3; r < 10; r += 2) for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(x0 + 16 + Math.cos(a) * r), Math.round(37 + Math.sin(a) * r), hex('#d8a830')); R.disco(x0 + 16, 37, 3, hex('#e84a4a')); R.pset(x0 + 16, 37, C.k); R.rect(x0 + 6, 51, x0 + 26, 54, hex('#c8a040')); }
  // el aparador del fondo con el equipo de música, discos y una planta
  R.rect(128, 84, 252, 112, C.k); R.rect(129, 85, 251, 111, hex('#5a3a28')); R.rect(129, 85, 251, 86, hex('#7a5a40')); for (let x = 160; x < 250; x += 31) R.rect(x, 88, x, 110, hex('#3a2418')); for (const x of [146, 177, 208, 239]) R.rect(x - 2, 97, x + 2, 98, hex('#c8a040'));
  caja(136, 66, 170, 84, hex('#2a2832')); R.rect(138, 70, 168, 71, hex('#4a4856')); R.rect(138, 76, 168, 77, hex('#4a4856')); R.disco(144, 74, 2, hex('#8c90a4'));
  for (let k = 0; k < 9; k++) R.rect(178 + k * 3, 70 + (k % 3), 179 + k * 3, 84, [hex('#e84a4a'), hex('#4a8ae8'), hex('#f0c040'), hex('#f6f6ee')][k % 4]);
  R.rect(228, 72, 240, 84, C.k); R.rect(229, 73, 239, 84, hex('#c8543a')); for (const [dx, dy] of [[-6, -6], [0, -12], [5, -8], [-3, -16], [4, -18]]) { R.disco(234 + dx, 68 + dy, 4, hex('#2e7a3a')); R.disco(233 + dx, 67 + dy, 2, hex('#4ab85a')); }
  // la mampara de cristal de la derecha (los compañeros detrás) y su marco
  R.rect(262, 50, 319, 118, hex('#8ab8b8')); trama(263, 51, 319, 117, [hex('#9ac8c8'), hex('#8ab8b8'), hex('#8ab8b8')], 35); R.rect(262, 50, 263, 118, hex('#e0e4e8')); R.rect(262, 50, 319, 51, hex('#e0e4e8')); R.rect(290, 50, 291, 118, hex('#e0e4e8'));
  // el parqué en espiga
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.floor((x + (y - 118) * ((Math.floor(x / 12) % 2) ? 1 : -1)) / 6); R.pset(x, y, (x % 12 === 0) ? hex('#6a4024') : a % 2 ? (h(x, y, 36) < 0.25 ? hex('#a8703c') : hex('#b07a44')) : (h(x, y, 37) < 0.25 ? hex('#98623a') : hex('#a06a3e'))); }
  for (let y = 118; y < 180; y++) for (let x = 100; x < 230; x++) if (h(x, y, 38) < 0.35 * (1 - Math.abs(x - 165) / 65)) R.pset(x, y, mez(R.pget(x, y), hex('#e8d0a0'), 0.25));
};
const MADERA6 = [hex('#5a3420'), hex('#4a2a18'), hex('#6a4028')];
const mesa6 = () => {
  R.rect(50, 150, 268, 157, C.k); R.rect(51, 151, 267, 155, hex('#7a4a2c')); R.rect(51, 151, 267, 151, hex('#9a6a44')); R.rect(51, 155, 267, 155, hex('#3a2014'));
  R.rect(54, 157, 264, 179, C.k); trama(55, 158, 263, 179, MADERA6, 39, 1); for (const x0 of [60, 200]) { caja(x0, 161, x0 + 58, 179, hex('#5a3420'), hex('#2a160c')); R.rect(x0 + 24, 168, x0 + 34, 169, hex('#c8a040')); }
  for (let y = 160; y < 179; y += 6) R.linea(124, y, 194, y + 2, hex('#4a2a18'));
};
const p6 = (t) => {
  capa('oficina6', oficina6);
  // la lluvia y el autobús rojo que pasa por la calle del ventanal
  R.recorte([13, 25, 105, 101]);
  const bu = ((t - P6) * 34) % 220 - 60; if (bu < 110) { const x = Math.round(bu); R.poligono([[x, 84], [x + 38, 84], [x + 38, 100], [x, 100]], hex('#c82a2a')); for (let k = 0; k < 5; k++) { R.poligono([[x + 3 + k * 7, 86], [x + 8 + k * 7, 86], [x + 8 + k * 7, 90], [x + 3 + k * 7, 90]], hex('#f0d890')); R.poligono([[x + 3 + k * 7, 93], [x + 8 + k * 7, 93], [x + 8 + k * 7, 96], [x + 3 + k * 7, 96]], hex('#f0d890')); } }
  for (let k = 0; k < 30; k++) { const x = Math.round((k * 31 + t * 30) % 92) + 13, y = Math.round((k * 17 + t * 150) % 76) + 25; R.linea(x, y, x - 1, y + 3, hex('#c8d0dc')); }
  R.recorte(null);
  // las lucecitas del equipo de música
  for (let k = 0; k < 6; k++) R.pset(150 + k * 3, 80, (Math.floor(t * 8) + k) % 3 ? hex('#5ac83a') : hex('#1e4a2a'));
  // los compañeros tras la mampara: trabajan y, en «survived», lo celebran
  const fiesta = t > salvo + 0.1;
  R.actor(EL.chica, 268, 117, t, { dir: 1, brazos: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0, sonrisa: fiesta, habla: !fiesta && t > londres && sin(t, 6) });
  R.actor(EL.chico, 296, 117, t, { dir: -1, brazos: fiesta && sin(t, 10), dedo: !fiesta && t > lucha, sonrisa: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin(t * 9 + 1)) * 3) : 0 });
  for (let y = 52; y < 118; y++) for (let x = 264; x < 320; x++) if ((x + y) % 7 === 0 || (x - y) % 23 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#c8f0f0'), 0.4));
  R.rect(262, 50, 263, 118, hex('#e0e4e8')); R.rect(290, 50, 291, 118, hex('#e0e4e8')); R.rect(262, 117, 319, 118, hex('#a8b0b8'));
  // el jefe de Londres al teléfono: escucha, pelea, golpea la mesa y levanta la caja del juego
  const gx = 148, golpea = t > lucha && t < lucha + 0.6, alza = t > salvo;
  const ex = R.actor(EL.ejecutivo, gx, 153, t, { dir: -1, sostiene: alza ? [gx - 10, 124] : [gx + 1, 132], habla: t < salvo && sin(t, golpea ? 12 : 7), enfado: t > londres && t < salvo, dedo: golpea, sonrisa: alza, salto: alza && t < salvo + 0.4 ? 2 : 0 });
  mesa6();
  const bote = golpea && Math.floor((t - lucha) * 10) % 3 === 0 ? 1 : 0;
  // en la mesa: el teléfono descolgado, papeles, la taza y el flexo
  telefonoCogido(108, 151 - bote);
  if (!alza) auricular(ex.mano[0], ex.mano[1], 100, 143); else auricular(gx + 2, 146, 100, 143);
  caja(196, 146 - bote, 214, 151 - bote, hex('#f6f6ee')); R.rect(198, 148 - bote, 210, 148 - bote, BLS);
  caja(236, 143, 244, 151, hex('#e8e0d0')); R.rect(244, 145, 246, 148, C.k); for (let k = 0; k < 2; k++) { const u = (t * 0.7 + k * 0.5) % 1; R.pset(239 + k * 2 + Math.round(Math.sin(t * 3 + k) * 1.5), Math.round(140 - u * 8), mez(hex('#ffffff'), VERDE6[0], u)); }
  R.rect(70, 130, 72, 151, C.k); R.rect(64, 149, 78, 151, C.k); R.poligono([[60, 130], [72, 122], [78, 130]], C.k); R.poligono([[62, 129], [72, 123], [76, 129]], hex('#2e6a3a')); resplandor(70, 136, 10, hex('#fff0b0'), 0.4);
  // la caja del juego: en la mesa y, en «survived», en alto junto a la cabeza (con el visto bueno)
  if (alza) { const [mx, my] = ex.mano; G.cajaJuego(R, mx - 6, my + 6, { color: '#3a6ad8' }); T.visto(R, mx - 22, my - 26, 1); } else G.cajaJuego(R, 180, 151 - bote, { color: '#3a6ad8' });
  if (golpea) R.icono('!', gx - 8, 112, ROJO, C.k, 2);
};

const año = 1996;
const efectos = [[golpe + 0.05, 'claxon'], [golpe + 1.4, 'coche'], [bug + 0.05, 'bip'], [locos + 0.02, 'claxon'], [persigue + 0.1, 'golpecito'],
  [P3 + 0.15, 'coche'], [furia + 0.05, 'claxon'], [rampa + 0.02, 'boing'], [emocion + 0.02, 'golpecito'], [emocion + 0.2, 'whoosh'],
  [nadie + 0.15, 'golpecito'], [poli - 0.3, 'whoosh'], [poli2 - 0.45, 'whoosh'], [poli2 + 0.05, 'bip'],
  [cancelar + 0.45, 'papel'], [lucha + 0.05, 'toc'], [salvo + 0.05, 'brillo'], [salvo + 0.3, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

E['gt-clifford'] = ('Clifford', '''// GT-CLIFFORD (frase 13), Londres, 1997. Tres planos:
// 1. la redacción del tabloide: el de BMG espera junto a la pizarra de ruedas; Max Clifford entra por la izquierda y se
//    dan la mano («hired Max Clifford»); Clifford coge el rotulador y empieza a dibujar flechas en la pizarra («tabloid
//    press», con un puntero de rotulador); el redactor de la mesa contesta al teléfono y levanta una plana; al fondo teclean;
// 2. la pizarra grande de cerca: Clifford, abajo, dibuja con un puntero largo con rotulador: de la caja del juego salen
//    flechas a tres políticos («politicians»: un lord con peluca, un ministro con corbata, uno con gafas), que se enfadan en
//    «complain»; de ellos bajan flechas a tres periódicos («newspapers») que echan humo en «join in»;
// 3. de madrugada, en una calle de casas blancas de Londres: Clifford en la cabina roja, con el teléfono de la cabina al
//    hombro y el móvil que le suena («according to Jones»); en «came true» pasa la furgoneta del reparto y tira dos fardos
//    de periódicos por la puerta de atrás (la plana: coche y rayo); las palomas salen volando, el del perro se vuelve y
//    Clifford sonríe.''', AUX + r'''
const l = (x) => en('clifford', x);
const P2 = l(0.391), P3 = l(0.8107);
const contrata = l(0.1106), max = l(0.1284), tabloide = l(0.3078), politicos = l(0.5532), quejar = l(0.6168), periodicos = l(0.688), sumar = l(0.7478), jones = l(0.8539), palabra = l(0.9023), cumplio = l(0.9506);
const sin = (t, v = 7) => Math.sin(t * v) > 0;
// la furgoneta del reparto (220 px/s) y los dos fardos que tira por detrás
const v0 = palabra - 0.4, t1 = v0 + 200 / 220, t2 = v0 + 250 / 220, cae = t1 + 0.3;

// ── 1 · la redacción: el apretón de manos y la primera flecha ──────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'redaccion', pizarra: true, suena: t > 0.3 && t < 1.6 };
  const g = T.londres(R, t, o) || {}, ms = g.mesaSuelo ?? 158;
  // Clifford entra, da la mano al de BMG y se va a la pizarra
  const a = tramo(t, 0.7, contrata), b = tramo(t, contrata + 1.4, contrata + 2.2), cx = Math.round(lerp(-20, 98, a) + lerp(0, 38, b)), cs = Math.round(lerp(165, 158, b));
  const mano = t > contrata && t < contrata + 1.2, dibuja = t > contrata + 2.3;
  const bm = R.actor(EL.ejecutivoBMG, 70, 160, t, { dir: 1, sostiene: mano ? [92, 151 + Math.round(Math.sin(t * 14))] : false, sonrisa: t > contrata, habla: t < contrata && t > 1.2 && sin(t, 6), dedo: dibuja && t > tabloide && t < tabloide + 0.7 });
  // la flecha y los iconos que va dibujando (dentro de la pizarra)
  const u = tramo(t, contrata + 2.4, tabloide + 0.4), v = tramo(t, tabloide, P2 - 0.3);
  R.recorte([153, 99, 213, 131]);
  if (u > 0) { R.rect(157, 108, 165, 118, C.k); R.rect(158, 109, 164, 117, hex('#4a8ae8')); R.pset(160, 111, ROJO); R.pset(162, 114, hex('#f0c040')); }
  if (u > 0.3) { const ex = Math.round(lerp(168, 186, (u - 0.3) / 0.7)); R.linea(168, 112, ex, 106, ROJO); if (u >= 1) { R.linea(186, 106, 182, 105, ROJO); R.linea(186, 106, 183, 109, ROJO); } }
  if (u >= 1) { R.disco(194, 104, 3, C.k); R.rect(191, 108, 197, 112, C.k); R.pset(193, 103, hex('#f8f6ee')); }
  if (v > 0) { const ex = Math.round(lerp(168, 186, v)); R.linea(168, 116, ex, 123, ROJO); if (v >= 1) { R.rect(190, 119, 202, 128, C.k); R.rect(191, 120, 201, 121, ROJO); R.rect(191, 123, 199, 123, hex('#8a8a96')); R.rect(191, 125, 196, 125, hex('#8a8a96')); } }
  R.recorte(null);
  const tipX = u < 1 ? (u < 0.3 ? 161 : lerp(168, 186, (u - 0.3) / 0.7)) : v > 0 && v < 1 ? lerp(168, 186, v) : v >= 1 ? 196 : 194, tipY = u < 1 ? (u < 0.3 ? 113 : lerp(112, 106, (u - 0.3) / 0.7)) : v > 0 && v < 1 ? lerp(116, 123, v) : v >= 1 ? 124 : 106;
  const cl = R.actor(EL.clifford, cx, cs, t, { dir: mano ? -1 : 1, anda: (a > 0 && a < 1) || (b > 0 && b < 1), sostiene: mano ? [91, 151 + Math.round(Math.sin(t * 14))] : dibuja ? [Math.round(tipX), Math.round(tipY)] : false, habla: dibuja && sin(t, 7), sonrisa: mano });
  if (dibuja) { const [mx, my] = cl.mano, ex = Math.round(tipX), ey = Math.round(tipY); R.linea(mx, my, ex, ey, C.k); R.linea(mx + 1, my, ex + 1, ey, hex('#8c90a4')); R.rect(ex - 1, ey - 1, ex + 1, ey + 1, ROJO); }
  // el redactor: contesta y luego levanta una plana recién hecha
  const rd = R.actor(EL.periodistaTabloide, 234, ms, t, { dir: -1, habla: t > 1.6 && t < 4.6 && sin(t, 8), sostiene: t > 1.6 && t < 4.6 ? [236, ms - 22] : t > tabloide ? [226, ms - 26] : false, sonrisa: t > tabloide });
  T.londresDelante(R, t, o);
  if (t > 1.6 && t < 4.6) { const [mx, my] = rd.mano; R.rect(mx - 1, my - 3, mx + 1, my + 3, C.k); R.rect(mx - 2, my - 4, mx, my - 3, C.k); R.rect(mx - 2, my + 3, mx, my + 4, C.k); }
  if (t > tabloide) { const [mx, my] = rd.mano; G.periodico(R, mx, my + 8, {}); }
};

// ── 2 · la pizarra grande de cerca: políticos y periódicos ───────────────────────────────────────────────────────
const POL = [[170, 34, 'lord'], [170, 68, 'corbata'], [170, 104, 'gafas']], PER = [[248, 54], [248, 90], [248, 126]], CAJA = [90, 104];
const pared2 = () => {
  // el techo con los fluorescentes, la pared de planas a los lados y la moqueta
  trama(0, 0, 319, 12, [hex('#e0dccc'), hex('#d4d0c0')], 41); for (let x = 0; x < 320; x += 36) R.rect(x, 0, x, 12, hex('#bcb8a8')); caja(20, 4, 100, 9, hex('#f8f8f0'), hex('#a8a498')); caja(200, 4, 270, 9, hex('#f8f8f0'), hex('#a8a498'));
  trama(0, 13, 319, 150, [hex('#d8ccb0'), hex('#d0c4a8'), hex('#d8ccb0')], 42);
  for (const [x, y] of [[8, 34], [8, 68], [8, 102], [296, 62], [296, 96]]) { caja(x, y, x + 16, y + 22, hex('#f2ecd8')); R.rect(x + 1, y + 1, x + 15, y + 4, hex('#d8303a')); R.rect(x + 2, y + 7, x + 14, y + 8, C.k); R.rect(x + 2, y + 10, x + 10, y + 11, C.k); R.rect(x + 3, y + 14, x + 8, y + 18, hex('#5a5868')); R.rect(x + 10, y + 14, x + 14, y + 14, hex('#8a8a96')); R.rect(x + 10, y + 16, x + 14, y + 16, hex('#8a8a96')); R.pset(x + 8, y, ROJO); }
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const l2 = Math.floor(x / 24) + Math.floor((y - 151) / 10); R.pset(x, y, (x % 24 === 0 || (y - 151) % 10 === 0) ? hex('#4a5060') : l2 % 2 ? (h(x, y, 43) < 0.2 ? hex('#6a7084') : hex('#646a7e')) : (h(x, y, 44) < 0.2 ? hex('#5e6478') : hex('#585e72'))); }
  for (const [x, y, r] of [[60, 170, 4], [250, 160, 3]]) for (let j = -r; j <= r; j++) for (let i = -2 * r; i <= 2 * r; i++) if ((i / (2 * r)) ** 2 + (j / r) ** 2 < 1 && h(x + i, y + j, 45) < 0.6) R.pset(x + i, y + j, hex('#4e5468'));
  // la pizarra: el marco de aluminio, el blanco con restos borrados, la bandeja y las patas con ruedas
  R.rect(40, 19, 280, 140, C.k); R.rect(41, 20, 279, 139, hex('#c0c4cc')); R.rect(41, 20, 279, 20, hex('#e8eaf0')); R.rect(44, 23, 276, 136, hex('#f6f6f2'));
  for (let y = 24; y < 136; y++) for (let x = 45; x < 276; x++) if (h(x >> 2, y >> 1, 46) < 0.06) R.pset(x, y, hex('#e8e8ee'));
  for (const [x0, y0] of [[60, 30], [230, 100]]) for (let k = 0; k < 14; k++) R.pset(x0 + k * 2, y0 + Math.round(Math.sin(k) * 2), hex('#dcdce6'));
  for (const [x, y, col] of [[50, 27, hex('#f8e870')], [62, 31, hex('#f8a0c8')], [52, 120, hex('#a0e0f8')], [258, 27, hex('#f8e870')]]) { R.rect(x, y, x + 10, y + 10, col); R.rect(x, y + 10, x + 10, y + 10, mez(col, C.k, 0.3)); R.rect(x + 2, y + 3, x + 8, y + 3, mez(col, C.k, 0.45)); R.rect(x + 2, y + 6, x + 6, y + 6, mez(col, C.k, 0.45)); }
  for (const [x, y, col] of [[56, 26, ROJO], [67, 30, AZUL], [263, 26, hex('#3ac85a')]]) { R.disco(x, y, 2, C.k); R.disco(x, y, 1, col); }
  caja(74, 110, 96, 130, hex('#f6f6ee')); R.rect(76, 112, 94, 124, hex('#8aa0c0')); R.rect(76, 120, 94, 124, hex('#6a7a5a')); R.disco(82, 116, 3, hex('#f0d0a0')); R.rect(73, 109, 78, 111, hex('#e8e0b0')); R.rect(92, 109, 97, 111, hex('#e8e0b0'));
  for (let k = 0; k < 5; k++) R.rect(110, 120 + k * 3, 140 - k * 4, 120 + k * 3, hex('#e2e2ea')); for (let a = 0; a < 6.2; a += 0.3) R.pset(Math.round(128 + Math.cos(a) * 10), Math.round(36 + Math.sin(a) * 7), hex('#e2e2ea'));
  R.rect(44, 136, 276, 138, hex('#8a8c94')); R.rect(40, 140, 280, 143, C.k); R.rect(41, 140, 279, 142, hex('#a8acb4'));
  for (const [x, col] of [[70, ROJO], [80, AZUL], [90, hex('#2a2832')], [100, hex('#3ac85a')]]) { R.rect(x, 137, x + 7, 139, C.k); R.rect(x + 1, 138, x + 5, 138, col); }
  caja(240, 134, 258, 139, hex('#2a2832')); R.rect(241, 135, 257, 136, hex('#c8a87a'));
  for (const lx of [56, 264]) { R.rect(lx - 2, 143, lx + 2, 170, C.k); R.rect(lx - 1, 143, lx + 1, 170, hex('#8a8c94')); R.rect(lx - 10, 170, lx + 10, 172, C.k); R.disco(lx - 8, 174, 3, C.k); R.disco(lx + 8, 174, 3, C.k); R.pset(lx - 8, 174, hex('#8a8c94')); R.pset(lx + 8, 174, hex('#8a8c94')); }
};
// un político dibujado a rotulador (azul), que se enfada (e 0–1) y se le ve el «!»
const politico = (x, y, tipo, e, t) => {
  const K = hex('#2a4aa8'), bote = e > 0 ? Math.round(Math.abs(Math.sin(t * 12)) * 2 * (e < 1 ? 1 : 0.5)) : 0; y -= bote;
  for (let a = 0; a < 6.28; a += 0.12) R.pset(Math.round(x + Math.cos(a) * 8), Math.round(y + Math.sin(a) * 9), K);
  R.linea(x - 12, y + 18, x - 8, y + 10, K); R.linea(x + 12, y + 18, x + 8, y + 10, K); R.linea(x - 12, y + 18, x + 12, y + 18, K);
  if (tipo === 'lord') for (const s of [-1, 1]) for (let k = 0; k < 4; k++) R.disco(x + s * 9, y - 4 + k * 4, 2, K);
  if (tipo === 'corbata') { R.linea(x, y + 10, x - 2, y + 16, ROJO); R.linea(x, y + 10, x + 2, y + 16, ROJO); R.pset(x, y + 11, ROJO); }
  if (tipo === 'gafas') { for (const s of [-1, 1]) { R.rect(x + s * 4 - 2, y - 2, x + s * 4 + 2, y - 2, K); R.rect(x + s * 4 - 2, y + 1, x + s * 4 + 2, y + 1, K); R.pset(x + s * 4 - 2, y - 1, K); R.pset(x + s * 4 + 2, y - 1, K); } R.pset(x, y - 1, K); }
  if (tipo !== 'gafas') { R.pset(x - 3, y - 1, K); R.pset(x + 3, y - 1, K); }
  if (e > 0) { R.linea(x - 5, y - 4, x - 2, y - 2, K); R.linea(x + 5, y - 4, x + 2, y - 2, K); R.linea(x - 3, y + 5, x + 3, y + 5, K); R.pset(x - 4, y + 6, K); R.pset(x + 4, y + 6, K); R.icono('!', x - 22, y - 6, ROJO, C.k, 2); for (let k = 0; k < 2; k++) { const u = (t * 1.6 + k * 0.5) % 1; R.disco(x - 6 + k * 12, Math.round(y - 12 - u * 8), 1 + Math.round(u * 2), mez(hex('#c8ccd8'), hex('#f6f6f2'), u)); } }
  else { R.linea(x - 3, y + 4, x - 1, y + 5, K); R.linea(x + 1, y + 5, x + 3, y + 4, K); }
};
// una flecha a rotulador de (x0, y0) a (x1, y1), dibujada hasta la fracción u
const flecha = (x0, y0, x1, y1, u, col) => { if (u <= 0) return; const ex = lerp(x0, x1, u), ey = lerp(y0, y1, u); R.linea(Math.round(x0), Math.round(y0), Math.round(ex), Math.round(ey), col); R.linea(Math.round(x0), Math.round(y0) + 1, Math.round(ex), Math.round(ey) + 1, col); if (u >= 1) { const a = Math.atan2(y1 - y0, x1 - x0); for (const s of [-1, 1]) R.linea(x1, y1, Math.round(x1 - Math.cos(a + s * 0.5) * 6), Math.round(y1 - Math.sin(a + s * 0.5) * 6), col); } };
const p2 = (t) => {
  capa('pared2', pared2);
  if (Math.sin(t * 11) > 0.8) R.rect(202, 6, 268, 7, hex('#c8c8c0'));
  // la hoja de la pared que se mueve con el aire del ventilador
  { const s = Math.round(Math.sin(t * 4) * 1.5); R.rect(298, 98 + s, 310, 99 + s, hex('#f2ecd8')); }
  R.recorte([45, 24, 275, 135]);
  G.cajaJuego(R, CAJA[0], CAJA[1], { s: 2, color: '#3a6ad8' }); R.rect(84, 46, 96, 49, hex('#e8e0b0'));
  // tres flechas hacia los políticos, una tras otra
  const tp = [tramo(t, P2 + 0.9, politicos - 0.1), tramo(t, politicos, politicos + 0.55), tramo(t, politicos + 0.55, quejar - 0.05)];
  POL.forEach(([x, y, tipo], k) => { flecha(114, 62 + k * 14, x - 15, y + 6, tp[k], ROJO); if (tp[k] >= 1) politico(x, y, tipo, t > quejar + k * 0.12 ? 1 : 0, t); });
  // y de cada político, una flecha que baja a su periódico
  const tq = [tramo(t, periodicos - 0.3, periodicos + 0.15), tramo(t, periodicos + 0.15, periodicos + 0.55), tramo(t, periodicos + 0.55, sumar - 0.05)];
  PER.forEach(([x, y], k) => { flecha(POL[k][0] + 15, POL[k][1] + 8, x - 13, y - 12, tq[k], AZUL); });
  R.recorte(null);
  PER.forEach(([x, y], k) => { if (tq[k] >= 1) { const hu = tramo(t, sumar + k * 0.15, sumar + 0.8 + k * 0.15); const sx = hu > 0 ? Math.round(Math.sin(t * 20 + k) * 1) : 0; G.periodico(R, x + sx, y, { humo: hu, t }); } });
  // Clifford abajo, con el puntero de rotulador que llega a donde dibuja
  const fase = t < periodicos - 0.3 ? tp.findIndex((v) => v < 1) : tq.findIndex((v) => v < 1);
  let px, py;
  if (t < periodicos - 0.3) { const k = fase < 0 ? 2 : fase, u = tp[k]; px = lerp(114, POL[k][0] - 15, u); py = lerp(62 + k * 14, POL[k][1] + 6, u); }
  else { const k = fase < 0 ? 2 : fase, u = tq[k]; px = lerp(POL[k][0] + 15, PER[k][0] - 13, u); py = lerp(POL[k][1] + 8, PER[k][1] - 12, u); }
  if (t < P2 + 0.9) { px = lerp(96, 114, tramo(t, P2, P2 + 0.9)); py = 62; }
  if (t > periodicos - 0.8 && t < periodicos - 0.3) { px = POL[0][0] + 15; py = POL[0][1] + 8; }
  const cam2 = tramo(t, periodicos - 0.75, periodicos - 0.3), cxp = Math.round(lerp(76, 150, cam2)), cl = R.actor(EL.clifford, cxp, 176, t, { dir: 1, anda: cam2 > 0 && cam2 < 1, sostiene: true, habla: !(cam2 > 0 && cam2 < 1) && sin(t, 6), sonrisa: t > quejar });
  const [mx, my] = cl.mano; R.linea(mx, my, Math.round(px), Math.round(py), C.k); R.linea(mx + 1, my, Math.round(px) + 1, Math.round(py), hex('#8c90a4')); R.rect(Math.round(px) - 1, Math.round(py) - 1, Math.round(px) + 1, Math.round(py) + 1, ROJO);
  R.rect(mx - 1, my - 1, mx + 1, my + 1, C.k);
};

// ── 3 · la cabina roja al amanecer: todo se cumplió ─────────────────────────────────────────────────────────────
const AMANECER = [hex('#5a6ab0'), hex('#7a80c0'), hex('#b890c0'), hex('#f0a8a0'), hex('#f8c890')];
const calle3 = () => {
  degradado(0, 0, 319, 92, AMANECER, 51); trama(0, 93, 319, 140, [hex('#c8bcb4'), hex('#bcb0aa')], 57);
  // las casas blancas de estuco con sus ventanas de guillotina, la barandilla negra y los escalones
  for (let i = 0; i < 6; i++) {
    const x0 = i * 56 - 10, top = 40 + (i % 2) * 4, base = 140;
    if (x0 + 54 > 268) { /* la esquina de Atom: el último tejado más bajo */ }
    const tp = x0 + 54 > 268 ? 52 : top;
    R.rect(x0, tp, x0 + 54, base, C.k); trama(x0 + 1, tp + 1, x0 + 53, base, [hex('#f2ece0'), hex('#ece4d6'), hex('#f2ece0')], 52 + i);
    R.rect(x0 + 1, tp + 1, x0 + 53, tp + 4, hex('#d8d0c0')); R.rect(x0, tp - 2, x0 + 54, tp, hex('#b8b0a0'));
    R.rect(x0 + 40, tp - 10, x0 + 48, tp - 2, C.k); R.rect(x0 + 41, tp - 9, x0 + 47, tp - 2, hex('#a8543a')); R.rect(x0 + 42, tp - 12, x0 + 43, tp - 10, hex('#8a6a5a')); R.rect(x0 + 45, tp - 12, x0 + 46, tp - 10, hex('#8a6a5a'));
    for (const fy of [tp + 10, tp + 36]) for (const fx of [x0 + 6, x0 + 22, x0 + 38]) { caja(fx, fy, fx + 10, fy + 18, hex('#3a4258')); R.rect(fx + 1, fy + 9, fx + 9, fy + 9, hex('#f2ece0')); R.rect(fx + 5, fy + 1, fx + 5, fy + 17, hex('#f2ece0')); R.rect(fx - 1, fy + 19, fx + 11, fy + 20, hex('#d8d0c0')); }
    R.rect(x0 + 4, 108, x0 + 26, 140, C.k); R.rect(x0 + 5, 109, x0 + 25, 140, [hex('#2a3a6a'), hex('#1c1222'), hex('#6a2a2a')][i % 3]); R.rect(x0 + 8, 112, x0 + 22, 116, hex('#c8d0e0')); R.pset(x0 + 20, 126, hex('#c8a040'));
    R.rect(x0 + 2, 106, x0 + 28, 107, hex('#d8d0c0')); R.rect(x0 + 28, 110, x0 + 52, 136, hex('#3a4258')); R.rect(x0 + 29, 111, x0 + 51, 135, hex('#4a5268')); R.rect(x0 + 29, 122, x0 + 51, 122, hex('#f2ece0'));
    for (let x = x0 + 28; x < x0 + 54; x += 3) R.rect(x, 128, x, 140, C.k); R.rect(x0 + 28, 128, x0 + 54, 128, C.k);
  }
  // la acera de losas mojadas y la calzada con su bordillo
  for (let y = 140; y < 166; y++) for (let x = 0; x < 320; x++) { const junta = (y - 140) % 9 === 0 || (x + ((Math.floor((y - 140) / 9)) % 2) * 15) % 30 === 0; R.pset(x, y, junta ? hex('#8a8494') : h(x, y, 53) < 0.15 ? hex('#c8b8b8') : hex('#b0a8b4')); }
  for (let y = 142; y < 165; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 54) < 0.12) R.pset(x, y, hex('#e8c0a8'));
  R.rect(0, 166, 319, 168, hex('#d8d4d0')); R.rect(0, 168, 319, 169, hex('#6a6470'));
  for (let y = 170; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x, y, 55) < 0.12 ? hex('#5a5868') : hex('#4a4858'));
  for (let x = 0; x < 320; x += 30) R.rect(x, 175, x + 14, 175, hex('#e8e0c0'));
  // la farola (todavía encendida)
  R.rect(129, 70, 131, 164, C.k); R.rect(130, 71, 130, 163, hex('#3a3e4a')); caja(124, 62, 136, 72, hex('#ffe8a0')); R.rect(123, 60, 137, 62, C.k);
};
const cabina = (x, suelo, puerta) => {   // la cabina roja genérica (sin letras ni escudo): x el borde izquierdo
  const R1 = hex('#d8303a'), R2 = hex('#a81e26'), R3 = hex('#f05a5a');
  R.rect(x - 2, suelo - 90, x + 40, suelo, C.k); R.rect(x - 1, suelo - 89, x + 39, suelo - 1, R1); R.poligono([[x - 2, suelo - 90], [x + 19, suelo - 98], [x + 40, suelo - 90]], C.k); R.poligono([[x, suelo - 91], [x + 19, suelo - 96], [x + 38, suelo - 91]], R1);
  R.rect(x - 1, suelo - 89, x + 39, suelo - 82, R2); R.rect(x + 6, suelo - 88, x + 32, suelo - 84, hex('#f2ece0')); R.rect(x - 1, suelo - 89, x + 1, suelo - 1, R3); R.rect(x + 37, suelo - 89, x + 39, suelo - 1, R2);
  // el hueco de dentro (la puerta abierta deja ver al de dentro): el fondo oscuro con el teléfono de la cabina
  R.rect(x + 3, suelo - 80, x + 35, suelo - 4, hex('#8a6a5a')); R.rect(x + 3, suelo - 80, x + 35, suelo - 74, hex('#a8826a')); caja(x + 14, suelo - 81, x + 24, suelo - 77, hex('#ffe8a0')); for (let y = suelo - 76; y < suelo - 4; y++) for (let xx = x + 4; xx < x + 35; xx++) if (h(xx, y, 56) < 0.08) R.pset(xx, y, hex('#7a5a4a')); R.rect(x + 22, suelo - 64, x + 32, suelo - 50, C.k); R.rect(x + 23, suelo - 63, x + 31, suelo - 51, hex('#4a4856')); for (let k = 0; k < 6; k++) R.pset(x + 25 + (k % 3) * 2, suelo - 59 + Math.floor(k / 3) * 3, hex('#c0c4d4'));
  R.rect(x - 1, suelo - 4, x + 39, suelo - 1, R2);
};
const cabinaDelante = (x, suelo, t) => {   // la puerta abierta (de cristales en cuadrícula) a la izquierda y los marcos
  const R1 = hex('#d8303a'), R2 = hex('#a81e26');
  R.rect(x - 22, suelo - 80, x - 2, suelo - 3, C.k); R.rect(x - 21, suelo - 79, x - 3, suelo - 4, R1);
  for (let j = 0; j < 7; j++) for (let i = 0; i < 2; i++) { const px = x - 19 + i * 8, py = suelo - 77 + j * 10; R.rect(px, py, px + 6, py + 8, hex('#e8b8a8')); R.rect(px, py, px + 6, py, hex('#ffe0c8')); R.pset(px + 5, py + 2, hex('#ffffff')); }
  R.rect(x + 1, suelo - 80, x + 3, suelo - 3, R2);
};
const p3 = (t) => {
  capa('calle3', calle3);
  // nubes del amanecer a tres velocidades, las chimeneas que humean y las gaviotas
  for (const [k, cy, w, hh, v] of [[0, 18, 28, 6, 1.2], [1, 30, 18, 4, 2.4], [2, 12, 16, 4, 3.6]]) nube(((k * 120 + t * v) % 380) - 40, cy, w, hh, [hex('#ffe0c0'), hex('#f0b0a8'), hex('#a88ab0')]);
  for (let i = 0; i < 5; i++) { const x0 = i * 56 - 10 + 42, tp = (i * 56 - 10 + 54 > 268 ? 52 : 40 + (i % 2) * 4) - 12; for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3 + i * 0.2) % 1; R.disco(Math.round(x0 + u * 8 + Math.sin(t + k) * 1), Math.round(tp - u * 16), 1 + Math.round(u * 2), mez(hex('#e8e0e8'), AMANECER[1], u)); } }
  for (let k = 0; k < 2; k++) pajaro(((k * 150 + t * 18) % 360) - 20, 46 + k * 8, t, hex('#3a3050'));
  // la furgoneta del reparto que pasa en «came true» y tira los fardos
  const fx = Math.round(-80 + (t - v0) * 220), fu = t > v0 && fx < 380 ? 0.5 : 0;
  const f1 = Math.min(1, Math.max(0, (t - t1) / 0.3)), f2 = Math.min(1, Math.max(0, (t - t2) / 0.3));
  const cx = 186, suelo = 156;
  cabina(cx, suelo, 1);
  // Clifford dentro: el auricular de la cabina sujeto al hombro y el móvil que le suena y se lleva a la otra oreja
  const movil = t > jones, suenaM = t > P3 + 0.4 && t < jones + 0.1, ale = t > cae;
  const cl = R.actor(EL.clifford, cx + 10, suelo - 4, t, { dir: -1, sostiene: movil ? [cx + 11, suelo - 25] : false, habla: !ale && sin(t, 7), sonrisa: ale, sorpresa: suenaM && t > jones - 0.25 });
  const [hx, hy] = cl.cabeza;
  // el auricular de la cabina, apoyado en el hombro derecho, con su cable a la caja
  R.rect(hx + 5, hy + 3, hx + 7, hy + 12, C.k); R.rect(hx + 4, hy + 2, hx + 8, hy + 4, C.k); R.rect(hx + 4, hy + 11, hx + 8, hy + 13, C.k); R.linea(hx + 8, hy + 12, cx + 24, suelo - 52, C.k);
  if (movil) { const [mx, my] = cl.mano; caja(mx - 2, my - 6, mx + 2, my + 2, hex('#2a2832')); R.rect(mx - 1, my - 5, mx + 1, my - 4, hex('#8ae08a')); R.rect(mx + 1, my - 9, mx + 1, my - 6, C.k); }
  else { caja(cx + 12, suelo - 16, cx + 16, suelo - 9, hex('#2a2832')); R.rect(cx + 15, suelo - 19, cx + 15, suelo - 16, C.k); if (suenaM && Math.floor(t * 8) % 2) for (const [a, b] of [[-3, -2], [-4, 0], [7, -2], [8, 0]]) R.pset(cx + 12 + a, suelo - 14 + b, hex('#f8f6ee')); }
  cabinaDelante(cx, suelo, t);
  resplandor(cx + 19, suelo - 76, 14, hex('#fff0b0'), 0.35);
  // un vecino pasea al perro por la acera; se para y se gira con el ruido de los fardos
  { const w = tramo(t, P3 + 0.1, cae - 0.3), vx = Math.round(lerp(4, 70, w)), para = t > cae - 0.3;
    R.actor(EL.senor30, vx, 162, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: para && t > cae && t < cae + 0.7, sonrisa: t > cae + 0.7 });
    const px = vx + 22, pa = !para && Math.floor(t * 8) % 2; R.linea(vx + 13, 150, px + 2, 156, C.k);
    R.rect(px, 155, px + 9, 159, C.k); R.rect(px + 1, 156, px + 8, 158, hex('#c8964a')); R.rect(px + 8, 152, px + 11, 156, C.k); R.rect(px + 9, 153, px + 10, 155, hex('#c8964a')); R.pset(px + 10, 153, C.k);
    R.rect(px + 1, 159, px + 1, 161 - pa, C.k); R.rect(px + 7, 159, px + 7, 161 - (1 - pa), C.k); R.pset(px - 1, 155 + (Math.floor(t * 10) % 2), C.k); }
  // las palomas de la acera: picotean y salen volando cuando cae el primer fardo
  const vuela = t > cae;
  for (let k = 0; k < 3; k++) { const vx = 100 + k * 14, vu = vuela ? Math.min(1, (t - cae - k * 0.08) * 1.4) : 0; if (vu <= 0) { const pk = Math.floor(t * 3 + k) % 3 === 0 ? 1 : 0; R.rect(vx - 3, 156, vx + 2, 159, C.k); R.rect(vx - 2, 157, vx + 1, 158, hex('#8a8aa0')); R.rect(vx + 2, 154 + pk, vx + 4, 156 + pk, C.k); R.pset(vx + 3, 155 + pk, hex('#8a8aa0')); R.pset(vx + 5, 156 + pk, hex('#e8a040')); R.pset(vx - 1, 160, hex('#e8a040')); R.pset(vx + 1, 160, hex('#e8a040')); } else pajaro(vx - vu * 60 + k * 10, 156 - vu * 70, t, hex('#5a5a70')); }
  // los fardos de periódicos (la plana de arriba: coche y rayo)
  const fardo = (x, y, ang) => { x = Math.round(x); y = Math.round(y); caja(x - 12, y - 8, x + 12, y, hex('#e8e2cc')); R.rect(x - 11, y - 4, x + 11, y - 4, hex('#b8b0a0')); R.rect(x - 1, y - 8, x, y, hex('#c8a060')); R.rect(x - 12, y - 6, x + 12, y - 6, hex('#c8a060')); };
  if (f1 > 0) { const x = lerp(124, 150, f1), y = lerp(152, 164, f1) - Math.sin(f1 * Math.PI) * 16; fardo(x, y); if (f1 >= 1) G.periodico(R, 150, 157, { t }); }
  if (f2 > 0) fardo(lerp(174, 236, f2), lerp(152, 164, f2) - Math.sin(f2 * Math.PI) * 14);
  if (fu > 0) {   // la furgoneta verde del reparto (va por delante de todo)
    const y = 178; caja(fx, y - 30, fx + 56, y - 6, hex('#2e7a5a')); R.rect(fx + 1, y - 29, fx + 55, y - 27, hex('#4a9a7a')); R.rect(fx + 6, y - 22, fx + 30, y - 12, hex('#f2ece0')); R.rect(fx + 8, y - 20, fx + 14, y - 14, hex('#d8303a')); R.rect(fx + 17, y - 19, fx + 28, y - 18, C.k); R.rect(fx + 17, y - 16, fx + 25, y - 15, C.k);
    R.poligono([[fx + 56, y - 26], [fx + 66, y - 18], [fx + 68, y - 6], [fx + 56, y - 6]], C.k); R.poligono([[fx + 57, y - 24], [fx + 65, y - 17], [fx + 67, y - 7], [fx + 57, y - 7]], hex('#2e7a5a')); R.poligono([[fx + 58, y - 23], [fx + 64, y - 17], [fx + 58, y - 17]], hex('#a8d8f0'));
    for (const wx of [fx + 14, fx + 54]) { R.disco(wx, y - 5, 5, C.k); R.disco(wx, y - 5, 2, hex('#c0c4d4')); }
    R.rect(fx + 66, y - 12, fx + 68, y - 10, hex('#ffe890')); resplandor(fx + 70, y - 11, 10, hex('#fff0b0'), 0.4);
  }
};

const efectos = [[0.35, 'ring'], [contrata + 0.2, 'palmada'], [contrata + 2.5, 'lapiz'], [tabloide + 0.1, 'papel'],
  [P2 + 1.0, 'lapiz'], [quejar + 0.05, 'pop'], [periodicos - 0.25, 'lapiz'], [sumar + 0.05, 'vapor'],
  [P3 + 0.45, 'ring'], [palabra - 0.3, 'coche'], [cae, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1997 });
''')
