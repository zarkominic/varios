E = {}

E['jh-gancho'] = ('Gancho', '''// JH-GANCHO (frases 1–2), Juegos 50 y hoy. Cuatro planos:
// 1. (0–«and the Capitol») la plaza del 12 al amanecer: Haymitch joven sale de su fila al pasillo, se planta y señala la
//    pantalla del Capitolio; en «beat the Capitol» levanta los brazos, las dos pantallas chisporrotean y se apagan
//    (chispas, palomas que se espantan); una chica de al lado se asusta; un agente de la paz se acerca sin prisa.
// 2. («and the Capitol»–«The Drunk») el escenario: Haymitch junto al micrófono; en «made him pay» la sombra de una rosa
//    blanca baja y le cubre, y la rosa cae a sus pies; él la mira; en «Haymitch» levanta la cabeza bajo un foco.
// 3. («The Drunk»–«November») el cine: en la pantalla, la silueta de Haymitch adulto con la petaca (bebe en «Drunk») y
//    un sinsajo dorado que llega en «his story»; el pan se ríe y luego señala; Atom en su butaca.
// 4. («November»–final) contraplano de las butacas: el pan levanta el calendario 11·20 (el 20 dorado en «20th»), lo
//    agita en «Hunger Games» y en «Reaping» se asusta, suelta el calendario y se esconde tras la butaca (gag 1).''', r'''
const a = (f) => en('antes', f), b = (f) => en('haymitch', f);
const P2 = a(0.741), P3 = b(0.16), P4 = b(0.574);
const beat = a(0.396), capitol = a(0.48), made = a(0.82), pay = a(0.886);
const kid = b(0), nombre = b(0.055), drunk = b(0.16), story = b(0.414), hits = b(0.465), veinte = b(0.604), hunger = b(0.72), reaping = b(0.94);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// mezcla un píxel ya pintado hacia [r, g, b] en la proporción k (sombras y focos sin tapar el dibujo)
const mezcla = (x, y, [cr, cg, cb], k) => {
  const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, bb = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(bb + (cb - bb) * k) << 16) | (Math.round(g + (cg - g) * k) << 8) | Math.round(r + (cr - r) * k)) >>> 0);
};
const ave = (x, y, t, k, c) => { const up = Math.sin(t * 16 + k) > 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - (up ? 1 : 0), c); R.pset(x + 1, y - (up ? 1 : 0), c); R.pset(x - 2, y - (up ? 2 : -1), c); R.pset(x + 2, y - (up ? 2 : -1), c); };

// ── plano 1: la plaza; Haymitch planta cara y las pantallas se apagan ────────────────────────────────────────────────
const glitch = (R, t, [x0, y0, x1, y1]) => {
  const f = Math.floor(t * 30), u = tramo(t, capitol, capitol + 0.35);
  for (let y = y0; y <= y1; y++) {
    const off = h(f, y >> 2) > 0.7 ? Math.round((h(y, f) - 0.5) * 16) : 0;
    for (let x = x0; x <= x1; x++) {
      const v = h(x + off, y, f);
      R.pset(x, y, v > 0.78 ? T.C.blanco : v > 0.5 ? hex('#8a8e96') : v > 0.3 ? hex('#3a3e4a') : hex('#14161e'));
    }
  }
  // la imagen se encoge a una raya y a un punto, como una tele vieja que se apaga
  if (u > 0) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, hex('#0c0e14'));
    const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, w = Math.round((x1 - x0) / 2 * (1 - u));
    if (u < 0.6) R.linea(cx - w, cy, cx + w, cy, T.C.blanco); else if (u < 1) { R.pset(cx, cy, T.C.blanco); R.pset(cx + 1, cy, T.C.blanco); }
  }
};
const p1 = (t) => {
  const pant = t < beat ? 'sello' : t < capitol + 0.35 ? (Math.floor(t * 12) % 3 === 0 ? 'sello' : glitch) : 'nada';
  const g = T.distrito(R, t, { encuadre: 'plaza', luz: 'amanecer', pantalla: pant });
  // chispas que saltan de los marcos de las dos pantallas y caen
  if (t > beat && t < capitol + 1.4) for (let i = 0; i < 26; i++) {
    const t0 = beat + h(i, 3) * (capitol - beat + 0.3), e = t - t0; if (e < 0 || e > 0.9) continue;
    const izq = i % 2 === 0, bx = izq ? 26 + h(i, 5) * 64 : 226 + h(i, 5) * 64, by = izq ? 84 : 88;
    const x = bx + (h(i, 7) - 0.5) * 40 * e, y = by - 14 * e + 40 * e * e;
    R.pset(Math.round(x), Math.round(y), e < 0.3 ? T.C.blanco : hex('#ffd36a')); if (e < 0.5) R.pset(Math.round(x), Math.round(y) - 1, hex('#f6a94f'));
  }
  // Haymitch sale de su fila al pasillo, se planta y señala la pantalla de la izquierda; en «beat» levanta los brazos
  const u = tramo(t, 0.3, 1.7), hx = Math.round(lerp(108, 150, u));
  const fila = t < 1.9;
  R.actor(EL.tributoChica, 176, 172, t, { dir: -1, sorpresa: t > capitol && t < capitol + 1.6, sonrisa: t > capitol + 1.6 });
  if (t > capitol && t < capitol + 1.2) R.icono('!', 182, 136, hex('#ffe890'), T.C.k, 2);
  R.actor(EL.haymitch, hx, 171, t, { dir: fila ? 1 : -1, anda: u > 0 && u < 1, dedo: t > 2 && t < beat, brazos: t >= beat && t < capitol + 0.9, enfado: t > 2 && t < capitol, sonrisa: t >= capitol + 0.9 });
  // un agente de la paz se acerca sin prisa por delante de las filas
  const v = tramo(t, capitol + 0.6, P2 - 0.1), ax = Math.round(lerp(330, 206, v));
  R.actor(EL.agentePaz, ax, 178, t, { dir: -1, anda: v > 0 && v < 1, sorpresa: t > capitol && v === 0 });
  // las palomas de la escalinata se espantan con el chasquido
  if (t > capitol) for (let i = 0; i < 7; i++) { const e = t - capitol - i * 0.06; if (e < 0) continue; ave(150 + i * 4 + e * (i % 2 ? 30 : -30) * (1 + h(i, 1)), 112 - e * (26 + h(i, 2) * 14), t, i, hex('#5a5a66')); }
};

// ── plano 2: el escenario; la sombra de la rosa ───────────────────────────────────────────────────────────────────────
const sombraRosa = (cx, cy, k) => {
  const dentro = (x, y) => {
    const dx = x - cx, dy = y - cy;
    const a = Math.atan2(dy, dx), r = Math.hypot(dx, dy), borde = 19 + 3 * Math.sin(a * 5) * (dy < 6 ? 1 : 0.4);
    if (r < borde && !(r > 9 && r < 11 && Math.sin(a * 3 + 1) > 0.2) && !(r > 4 && r < 5.5 && Math.sin(a * 2) > 0)) return true;
    if (dy > 4 && dy < 20 && Math.abs(dx) < 15 - (dy - 4) * 0.7) return true;
    if (Math.abs(dx - Math.sin(dy * 0.06) * 3) < 2.5 && dy > 16 && dy < 72) return true;
    return ((dx - 12) / 11) ** 2 + ((dy - 40) / 5) ** 2 < 1 || ((dx + 11) / 10) ** 2 + ((dy - 54) / 4.5) ** 2 < 1;
  };
  for (let y = Math.max(16, cy - 40); y <= Math.min(152, cy + 76); y++) for (let x = cx - 40; x <= cx + 40; x++) if (dentro(x, y)) mezcla(x, y, [16, 12, 34], k);
};
const p2 = (t) => {
  const g = T.distrito(R, t, { encuadre: 'plaza', camara: 'escenario', luz: 'amanecer', pantalla: 'nada', urna: 1 });
  // un agente de la paz entra por la derecha (pasa por detrás de la barandilla) y se queda vigilando
  const v = tramo(t, made - 0.2, made + 1.4), ax = Math.round(lerp(300, 214, v));
  R.actor(EL.agentePaz, ax, 146, t, { dir: -1, anda: v > 0 && v < 1 });
  // una escolta del Capitolio, al otro lado, aplaude sin ganas
  R.actor(EL.capitolino1, 92, 146, t, { dir: 1, habla: t > P2 + 0.3 && t < made && Math.sin(t * 9) > 0, sorpresa: t > made && t < pay + 0.6 });
  // Haymitch, junto al micrófono: mira al frente; la rosa cae a sus pies y la mira; en «Haymitch» levanta la cabeza
  const cae = tramo(t, made + 0.1, pay + 0.35), rx = 168, ry = Math.round(lerp(40, 146, cae * cae));
  const mira = t > pay + 0.35 && t < kid;
  R.actor(EL.haymitch, 134, 146, t, { dir: 1, triste: mira, sorpresa: t > made && t < pay + 0.35, enfado: t >= kid, dedo: t > nombre + 0.3 });
  if (cae > 0) { T.PIEZAS_JH.rosaBlanca(R, rx, ry, { s: 2 }); if (cae >= 1) { R.pset(rx - 4, ry, hex('#3a2a20')); R.pset(rx + 4, ry, hex('#3a2a20')); } }
  T.distritoDelante(R, t, { encuadre: 'plaza', camara: 'escenario', luz: 'amanecer' });
  // la sombra de la rosa baja desde arriba y le cubre
  const s = tramo(t, made - 0.1, pay + 0.2), q = tramo(t, kid - 0.4, nombre + 0.2);
  if (s > 0 && q < 1) sombraRosa(142, Math.round(lerp(-60, 118, s)), 0.55 * (1 - q));
  // el foco en «Haymitch»: un cono cálido sobre él
  const f = tramo(t, kid - 0.1, nombre + 0.2);
  if (f > 0) for (let y = 20; y <= 150; y++) { const w = 6 + (y - 20) * 0.16; for (let x = Math.round(141 - w); x <= 141 + w; x++) if (((x + y) & 1) === 0 || y > 112) mezcla(x, y, [255, 236, 190], 0.22 * f); }
};

// ── plano 3: el cine; Haymitch adulto en la pantalla ──────────────────────────────────────────────────────────────────
let BUF = null;
// dibuja un personaje en un búfer y lo pasa a la pantalla al doble, como silueta con un filo de luz
const silueta = (def, ox, oy, t, o, filo) => {
  if (!BUF) BUF = R.nuevo();
  BUF.fill(0); R.recorte(null); const prev = R.usar(BUF); const r = R.actor(def, 20, 60, t, o);
  let man = null; if (o.sostiene) { man = r.mano; T.PIEZAS_JH.petaca(R, man[0], man[1] + 3, {}); }
  R.usar(prev); R.recorte(CLIP);
  for (let j = 20; j <= 64; j++) for (let i = 8; i <= 46; i++) {
    if (!BUF[j * 320 + i]) continue;
    const borde = !BUF[j * 320 + i + 1] || !BUF[(j - 1) * 320 + i];
    const c = borde ? filo : hex('#0e0a18');
    const X = ox + (i - 20) * 2, Y = oy + (j - 60) * 2;
    R.pset(X, Y, c); R.pset(X + 1, Y, c); R.pset(X, Y + 1, c); R.pset(X + 1, Y + 1, c);
  }
};
let CLIP = null;
const peli = (R, t, [x0, y0, x1, y1]) => {
  CLIP = [x0, y0, x1, y1];
  // cielo de atardecer tramado, montes que pasan en travelling, el porche de la aldea
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (y1 - y0); for (let x = x0; x <= x1; x++) { const d = v + (((x * 7 + y * 13) & 3) / 4 - 0.4) * 0.12; R.pset(x, y, d < 0.25 ? hex('#2a1e48') : d < 0.45 ? hex('#5a2e5a') : d < 0.62 ? hex('#a84a4a') : hex('#e8904a')); } }
  R.disco(212, 82, 14, hex('#f6c46a')); R.disco(212, 82, 10, hex('#ffe6a0'));
  const sc = t * 6;
  for (let x = x0; x <= x1; x++) { const m = Math.round(78 + Math.sin((x + sc) * 0.045) * 7 + Math.sin((x + sc) * 0.11) * 3); for (let y = m; y <= y1; y++) R.pset(x, y, y < m + 2 ? hex('#3a2240') : hex('#22162e')); }
  for (let x = x0; x <= x1; x++) { const m = Math.round(88 + Math.sin((x + sc * 2) * 0.07) * 3); for (let y = m; y <= y1; y++) R.pset(x, y, hex('#140c1c')); }
  // las nubes que pasan, de tres tonos
  for (let k = 0; k < 3; k++) { const cx = x0 + ((k * 70 + t * (4 + k * 3)) % 230) - 20, cy = y0 + 14 + k * 9; for (let i = -12; i <= 12; i++) { R.pset(Math.round(cx + i), cy, hex('#7a3e6a')); if (Math.abs(i) < 8) R.pset(Math.round(cx + i), cy - 1, hex('#c8607a')); if (Math.abs(i) < 4) R.pset(Math.round(cx + i), cy - 2, hex('#f09a8a')); } }
  // Haymitch adulto en silueta, con la petaca: bebe en «Drunk» y se tambalea
  const bebe = t > drunk && t < drunk + 1.2, sw = Math.round(Math.sin(t * 2.2) * 2);
  silueta(EL.haymitchViejo, 118 + sw, 100, t, { dir: 1, sostiene: bebe ? [33, 41] : [34, 50], quieto: false }, hex('#f6a94f'));
  // el sinsajo dorado que llega volando en «his story» y brilla
  const v = tramo(t, story - 0.3, hits + 0.2);
  if (v > 0) {
    const sx = Math.round(lerp(236, 200, v)), sy = Math.round(lerp(56, 62, v) + Math.sin(t * 5) * 2);
    R.disco(sx, sy - 12, 17, hex('#a87a18')); R.disco(sx, sy - 12, 15, hex('#f0c040')); R.disco(sx, sy - 12, 12, hex('#ffe890'));
    if (v >= 1) for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + t * 1.5, r = 21 + Math.sin(t * 6 + k) * 2; R.pset(Math.round(sx + Math.cos(a) * r), Math.round(sy - 12 + Math.sin(a) * r), hex('#fffbe9')); }
    T.PIEZAS_JH.sinsajo(R, sx, sy - 1, { s: 2, dir: -1, t });
  }
};
const p3 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cine', pantalla: peli });
  // el pan en su butaca: se ríe con «Drunk Mentor» y luego señala el sinsajo
  const de = tramo(t, drunk, drunk + 0.3) - tramo(t, story - 0.4, story);
  T.pan(R, 148, 162 - Math.round(6 * Math.max(de, t > hits ? 1 : 0)), t, { expresion: t > drunk + 0.2 && t < story - 0.2 ? 'risa' : 'normal', señala: t > hits ? [196, 56] : undefined });
  R.atomo(174, 148 + Math.round(Math.sin(t * 2.6) * 1), t, { r: 8.4, energia: t > hits ? 0.6 : 0.2 });
  T.hoyDelante(R, t, { encuadre: 'cine' });
};

// ── plano 4: contraplano de las butacas; el calendario y el gag del pan ───────────────────────────────────────────────
const calendario = (cx, yb, k20, t) => {
  const x0 = cx - 21, x1 = cx + 21, y0 = yb - 32;
  R.rect(x0, y0, x1, yb, T.C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, yb - 1, hex('#1c2238'));
  R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 8, hex('#c8303a')); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#e86a7a')); R.rect(x0 + 1, y0 + 8, x1 - 1, y0 + 8, hex('#8a1e26'));
  for (const rx of [cx - 11, cx + 11]) { R.rect(rx - 1, y0 - 3, rx + 1, y0 + 3, T.C.k); R.pset(rx, y0 - 2, hex('#c8ccd8')); R.pset(rx, y0 - 1, hex('#c8ccd8')); }
  // cuadritos de días tenues abajo
  for (let i = 0; i < 7; i++) R.rect(x0 + 4 + i * 5, yb - 5, x0 + 6 + i * 5, yb - 4, hex('#2e3656'));
  T.a_cifras(R, '11', cx - 10, yb - 8);
  R.rect(cx - 1, yb - 13, cx, yb - 12, hex('#ffd36a'));
  if (k20 > 0) {
    T.a_cifras(R, '20', cx + 10, yb - 8);
    if (k20 < 1) R.rect(cx + 3, yb - 17 + Math.round(9 * k20), cx + 17, yb - 6, hex('#1c2238'));
    const br = tramo(t, veinte, veinte + 0.8); if (br > 0 && br < 1) for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + t * 3, r = 4 + br * 10; R.pset(Math.round(cx + 10 + Math.cos(a) * r), Math.round(yb - 12 + Math.sin(a) * r), hex('#fffbe9')); }
  }
};
const p4 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cine', camara: 'butacas' });
  // el pan levanta el calendario; en «Hunger Games» lo agita; en «Reaping» lo suelta y se esconde detrás de la butaca
  const sube = tramo(t, P4 + 0.05, P4 + 0.45), susto = t > reaping, baja = tramo(t, reaping + 0.25, reaping + 0.75), asoma = tramo(t, E.duracion - 1.3, E.duracion - 0.8);
  const py = Math.round(lerp(136, 172, baja) - 10 * asoma * (baja >= 1 ? 1 : 0));
  const agita = t > hunger && t < reaping ? Math.round(Math.sin(t * 14) * 2) : 0;
  const pr = T.pan(R, 128, py, t, { s: 2, dir: 1, expresion: susto ? 'susto' : t > hunger ? 'risa' : 'normal', señala: !susto && sube > 0 ? [128 + agita, 96] : undefined, esconde: baja });
  if (!susto && sube > 0) calendario(128 + agita, Math.round(lerp(140, pr.mano[1] + 2, sube)), tramo(t, veinte - 0.1, veinte + 0.25), t);
  // el calendario, suelto, cae sobre el cojín de la butaca
  if (susto) { const c = tramo(t, reaping, reaping + 0.35); calendario(124, Math.round(lerp(98, 128, c * c)), 1, t); }
  // las palomitas saltan del cubo con el susto
  if (t > reaping && t < reaping + 1) for (let i = 0; i < 6; i++) { const e = t - reaping - i * 0.05; if (e < 0) continue; const x = 160 + (i - 2.5) * 4 * (1 + e * 3), y = 84 - 30 * e + 60 * e * e; R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#fff2c8')); }
  // Atom se gira hacia el pan cuando se esconde
  const ax = Math.round(192 - 6 * tramo(t, reaping + 0.3, reaping + 0.9));
  R.atomo(ax, 112 + Math.round(Math.sin(t * 2.6) * 1.5), t, { r: 11, energia: t > veinte && t < veinte + 1 ? 0.8 : 0.25 });
  if (t > reaping + 1 && t < E.duracion - 1.4) R.icono('?', ax + 12, 92, hex('#ffe890'), T.C.k, 2);
  T.hoyDelante(R, t, { encuadre: 'cine', camara: 'butacas' });
};

const efectos = [[beat + 0.05, 'zumbido'], [capitol, 'interruptor'], [capitol + 0.2, 'publico'], [made, 'whoosh'], [pay + 0.35, 'golpecito'], [kid + 0.1, 'flash'],
  [hits, 'brillo'], [P4 + 0.1, 'papel'], [veinte, 'brillo'], [reaping + 0.1, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P3 ? 50 : null) });
''')

E['jh-peligro'] = ('Los Juegos más peligrosos', '''// JH-PELIGRO (frases 3–4), Juegos 50 y hoy. Tres planos:
// 1. (0–«and it will be») la sala de control: la maqueta de la arena se llena de lucecitas, de 24 a 48 en «twice the usual
//    tributes»; el contador pasa de 24 a 48; un vigilante cuenta con los dedos, se le acaban y se queda con «?»; otro
//    entra con una tablilla y se para.
// 2. («and it will be»–«do you need») la consola: el reloj de película cuenta hasta 2:38 en «longest movie» y la barra
//    dorada de la película nueva sube por encima de las otras cinco; el vigilante de pie se sorprende y señala.
// 3. («do you need»–final) el corcho de la fan: se encienden las pistas una a una (el broche en «remember», los carnés en
//    «who's who», la flecha en «clues»), el hilo rojo las une y el pan va señalándolas por la mesa; salta en «miss a thing».''', r'''
const a = (f) => en('peligro', f), b = (f) => en('preguntas', f);
const P2 = a(0.665), P3 = b(0.05);
const dang = a(0.153), twice = a(0.441), tributes = a(0.531), longest = a(0.74), saga = a(0.919);
const remember = b(0.131), whos = b(0.285), clues = b(0.488), earlier = b(0.603), miss = b(0.912), so = b(0);

// ── plano 1: la sala de control; 48 lucecitas ─────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const n = Math.round(24 + 24 * tramo(t, twice - 0.1, tributes + 0.4));
  const g = T.arena(R, t, { encuadre: 'control', arena: 'prado', luces: n, contador: n });
  // el que entra con la tablilla y se para a mirar
  const u = tramo(t, 0.3, 2.0), ex = Math.round(lerp(-18, 58, u));
  const r1 = R.actor(EL.vigilante, ex, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > tributes });
  R.rect(r1.mano[0] - 1, r1.mano[1] - 7, r1.mano[0] + 4, r1.mano[1] + 1, T.C.k); R.rect(r1.mano[0], r1.mano[1] - 6, r1.mano[0] + 3, r1.mano[1], hex('#4a8ae8'));
  if (Math.sin(t * 5) > 0) R.pset(r1.mano[0] + 1, r1.mano[1] - 4, hex('#c8f0ff'));
  // el vigilante que cuenta con los dedos: un número por cada golpe de dedo, hasta 10, y luego «?»
  const c = tramo(t, twice, tributes + 0.9), k = Math.min(10, Math.floor(c * 11));
  const sinDedos = c >= 1;
  R.actor(EL.vigilante, 214, 160, t, { dir: -1, dedo: c > 0 && !sinDedos && Math.floor(t * 7) % 2 === 0, brazos: sinDedos, sorpresa: sinDedos, habla: t > dang && t < twice && Math.sin(t * 8) > 0 });
  if (c > 0 && !sinDedos && k > 0) T.a_cifras(R, String(k), 221, 128);
  if (sinDedos) R.icono('?', 217, 118, hex('#ffe890'), T.C.k, 2);
  T.arenaDelante(R, t, { encuadre: 'control' });
};

// ── plano 2: la consola; 2:38 ─────────────────────────────────────────────────────────────────────────────────────────
const MIN = [142, 146, 123, 137, 157, 158];   // las cinco películas y la nueva, en minutos
const reloj = (R, t, [x0, y0, x1, y1]) => {
  R.rect(x0, y0, x1, y1, hex('#0c1220'));
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) if (((x + y) & 3) === 0) R.pset(x, y, hex('#141e34'));
  // la bobina que gira
  const cx = (x0 + x1) >> 1, cy = y0 + 17;
  R.disco(cx, cy, 12, hex('#3a4258')); R.disco(cx, cy, 10, hex('#1c2238')); R.disco(cx, cy, 3, hex('#8a8e96'));
  for (let k = 0; k < 5; k++) { const a = t * 4 + k * 2 * Math.PI / 5; R.disco(Math.round(cx + Math.cos(a) * 6.5), Math.round(cy + Math.sin(a) * 6.5), 2, hex('#5a6278')); }
  // la cuenta: 0:00 → 2:38
  const m = Math.round(158 * tramo(t, P2 + 0.2, longest + 0.5)), hh = Math.floor(m / 60), mm = m % 60;
  const s = `${hh}${String(mm).padStart(2, '0')}`, base = y1 - 6;
  T.a_cifras(R, s[0], cx - 10, base); T.a_cifras(R, s.slice(1), cx + 5, base);
  if (Math.floor(t * 2) % 2 === 0 || m >= 158) { R.rect(cx - 5, base - 7, cx - 4, base - 6, hex('#ffd36a')); R.rect(cx - 5, base - 3, cx - 4, base - 2, hex('#ffd36a')); }
};
const barras = (t) => {
  const [x0, y0, x1, y1] = [15, 25, 89, 71];
  R.rect(x0, y0, x1, y1, hex('#0c1220'));
  for (let x = x0; x <= x1; x += 6) for (let y = y0; y <= y1; y++) if (y % 2 === 0) R.pset(x, y, hex('#16223a'));
  const suelo = y1 - 4;
  R.rect(x0 + 2, suelo + 1, x1 - 2, suelo + 1, hex('#5a6278'));
  const top = suelo - Math.round((158 - 100) * 0.62);
  for (let x = x0 + 3; x <= x1 - 3; x += 2) R.pset(x, top - 1, hex('#5a6278'));
  MIN.forEach((m, i) => {
    const nueva = i === 5, k = nueva ? tramo(t, longest - 0.2, longest + 0.5) : 1, hgt = Math.round((m - 100) * 0.62 * k);
    const bx = x0 + 5 + i * 11;
    if (hgt <= 0) return;
    R.rect(bx, suelo - hgt, bx + 7, suelo, nueva ? hex('#f0c040') : hex('#4a8ae8'));
    R.rect(bx, suelo - hgt, bx + 7, suelo - hgt, nueva ? hex('#fff2a8') : hex('#8ac0ff'));
    R.rect(bx + 6, suelo - hgt + 1, bx + 7, suelo, nueva ? hex('#a87a18') : hex('#2a5aa8'));
    if (nueva && k >= 1 && Math.sin(t * 8) > 0) { R.pset(bx + 3, suelo - hgt - 3, hex('#fffbe9')); R.pset(bx + 2, suelo - hgt - 2, hex('#fffbe9')); R.pset(bx + 4, suelo - hgt - 2, hex('#fffbe9')); }
  });
};
const p2 = (t) => {
  const g = T.arena(R, t, { encuadre: 'control', camara: 'consola', pantalla: reloj, arena: 'prado', luces: 48, contador: 48 });
  barras(t);
  // el vigilante sentado gira el dial; el de pie se sorprende con «longest» y señala la barra dorada; en «So» se gira
  R.actor(EL.vigilante, 62, 148, t, { dir: 1, habla: t > saga && t < so && Math.sin(t * 7) > 0 });
  R.actor(EL.vigilante, 112, 158, t, { dir: t > so - 0.1 ? -1 : 1, sorpresa: t > longest && t < saga, dedo: t > longest + 0.3 && t < so - 0.2 });
  if (t > so) R.icono('?', 115, 112, hex('#ffe890'), T.C.k, 2);
  T.arenaDelante(R, t, { encuadre: 'control', camara: 'consola', dial: 0.5 + 0.4 * Math.sin(t * 1.3) });
};

// ── plano 3: el corcho; las pistas ────────────────────────────────────────────────────────────────────────────────────
const PISTAS = [[66, 38], [142, 42], [214, 38]];
const p3 = (t) => {
  const n = (t > remember ? 1 : 0) + (t > whos ? 1 : 0) + (t > clues ? 1 : 0);
  const g = T.hoy(R, t, { encuadre: 'cuarto', camara: 'corcho', luz: 'tarde', pistas: n, carnes: tramo(t, whos, whos + 0.6), hilo: tramo(t, clues + 0.2, earlier + 0.8), linea: 0 });
  // el pan anda por la mesa de pista en pista y señala la que se enciende; salta en «miss a thing»
  const xs = [118, 150, 196], i = Math.max(0, n - 1), x0 = i === 0 ? 108 : xs[i - 1], t0 = [remember, whos, clues][i] ?? remember;
  const u = tramo(t, t0 - 0.5, t0 + 0.1), x = Math.round(lerp(x0, xs[i], u)), salta = t > miss ? Math.round(Math.abs(Math.sin((t - miss) * 7)) * 8) : 0;
  T.pan(R, x, 162 - salta, t, { s: 2, dir: 1, anda: u > 0 && u < 1, expresion: t > miss ? 'risa' : 'normal', señala: n > 0 && t < miss ? PISTAS[i] : undefined });
};

const efectos = [[twice + 0.1, 'bip'], [tributes + 0.9, 'aviso'], [P2 + 0.3, 'maquina'], [longest + 0.4, 'brillo'], [remember, 'pop'], [whos + 0.1, 'papel'], [clues, 'pop'], [miss, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 50 : null) });
''')

E['jh-hola'] = ('Soy Atom', '''// JH-HOLA (frase 5), hoy. Un plano: el cuarto de la fan por la tarde. Atom, en el sofá junto al pan, salta a saludar en
// «I'm Atom» y el pan saluda con él; en «wondered about» se clavan las chinchetas del mapa de los distritos y salen «?»;
// en «Let's find out» la tele se enciende con la portada del sinsajo, Atom se acerca a ella y el pan, asustado, se tapa
// los ojos.''', r'''
const a = (f) => en('hola', f);
const atom = a(0.03), explain = a(0.254), wonder = a(0.539), lets = a(0.822), out = a(0.876);
const p1 = (t) => {
  const tele = t > lets ? 1 : 0;
  const g = T.hoy(R, t, { encuadre: 'cuarto', luz: 'tarde', mapa: 12 * tramo(t, explain, wonder + 0.4), tele, linea: 0, pistas: 0 });
  // la tele que se enciende: un destello blanco en el hueco
  const f = tramo(t, lets, lets + 0.3); if (f > 0 && f < 1) { R.recorte([224, 92, 300, 120]); for (let y = 92; y <= 120; y++) for (let x = 224; x <= 300; x++) if (((x + y) & 1) === 0) R.pset(x, y, T.C.blanco); R.recorte(null); }
  // el pan saluda con Atom; se asusta con la tele y se tapa los ojos
  T.pan(R, 140, 126, t, { dir: 1, saluda: t > atom && t < explain, expresion: t > lets + 0.2 ? 'susto' : t > wonder && t < lets ? 'normal' : 'normal', esconde: tramo(t, lets + 0.4, out + 0.4) });
  if (t > wonder && t < lets) { const k = Math.floor((t - wonder) * 3); for (let i = 0; i <= Math.min(2, k); i++) R.icono('?', 128 + i * 9, 102 - i * 3 - Math.round(Math.sin(t * 4 + i) * 1), hex('#ffe890'), T.C.k, 1); }
  // Atom salta dos veces para saludar y en «Let's find out» vuela hacia la tele
  const sal = t > atom && t < explain + 0.3 ? Math.round(Math.abs(Math.sin((t - atom) * Math.PI * 1.6)) * 14) : 0;
  const v = tramo(t, lets, out + 0.6), ax = Math.round(lerp(176, 206, v)), ay = Math.round(lerp(112, 100, v)) - sal + Math.round(Math.sin(t * 2.6));
  if (sal > 0 || (v > 0 && v < 1)) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + t * 4, rr = 15 + Math.sin(t * 9) * 2; R.pset(Math.round(ax + Math.cos(an) * rr), Math.round(ay + Math.sin(an) * rr), hex('#c8f0ff')); }
  R.atomo(ax, ay, t, { r: 10 + (sal > 0 ? 1.5 : 0), energia: sal > 0 || v > 0 ? 0.7 : 0.25 });
  T.hoyDelante(R, t, { encuadre: 'cuarto', luz: 'tarde' });
};
const efectos = [[atom + 0.1, 'pop'], [explain + 0.3, 'golpecito'], [lets + 0.02, 'interruptor'], [lets + 0.45, 'boing']];
T.rodar(E, R, [[0, p1]], { efectos, año: null });
''')
