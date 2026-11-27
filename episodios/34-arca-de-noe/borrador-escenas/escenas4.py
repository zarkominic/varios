E = {}

E['nx-smith'] = ('La tablilla de George Smith', '''// NX-SMITH (frases «smith» y «tablilla»), Londres, 1872, cartela «1872». Golpe en «tablilla». Siete planos:
// 1. fachada: el Museo Británico entre la niebla; pasa el coche de caballos y Smith, con su cartera, saluda a un colega,
//    cruza la cancela, sube la escalinata y entra («in London»);
// 2. mesa de fragmentos: dos manos ordenan y juntan los trozos de una tablilla («sorting and piecing together»);
// 3. la ciudad de adobe entre los ríos, de donde venían: una tablilla sale de la ciudad por una línea de puntos («Iraq»);
// 4. el cuaderno, de noche: la mano copia cuñas con la pluma y pasa la hoja («taught himself»);
// 5. la tablilla, de cerca (golpe: destello): la luz de la lectura recorre las filas; con «flood» las cuñas dejan paso a
//    la lluvia y al barco («He builds a boat»);
// 6. desde un tejado, agua hasta el horizonte: amaina, un barco diminuto y sin nadie a lo lejos, y cruza la paloma («dove»);
// 7. gag 4, la sala: Smith salta («jumped up»), corre por el pasillo («ran») y empieza a quitarse la chaqueta («began»:
//    solo la chaqueta); sus dos colegas le miran y vuelan unos papeles.''', r'''
const sa = (w) => en('smith', (w - 1.5) / 16.57), sb = (w) => en('tablilla', (w - 18.828) / 17.864);   // el segundo de cada palabra inglesa
const P2 = sa(6.2), P3 = sa(9.95), P4 = sa(13.55), P5 = en('tablilla', 0), P6 = sb(25.4), P7 = sb(30.9);
const FLOOD = sb(23.0), BOAT = sb(24.0), BAJA = sb(27.94), DOVE = sb(30.06), JUMP = sb(31.81), RAN = sb(32.53), BEGAN = sb(34.71), FUERA = sb(35.45);
const sua = (u) => u * u * (3 - 2 * u), lim = (u) => Math.max(0, Math.min(1, u));
const mez = (c1, c2, a) => { const r = (c) => c & 255, g = (c) => (c >>> 8) & 255, b = (c) => (c >>> 16) & 255; return (0xff000000 | (Math.round(b(c1) + (b(c2) - b(c1)) * a) << 16) | (Math.round(g(c1) + (g(c2) - g(c1)) * a) << 8) | Math.round(r(c1) + (r(c2) - r(c1)) * a)) >>> 0; };
const K = hex('#14121c');
const chispa = (x, y, r, c) => { R.pset(x, y, c); for (let q = 1; q <= r; q++) { R.pset(x + q, y, c); R.pset(x - q, y, c); R.pset(x, y + q, c); R.pset(x, y - q, c); } if (r > 2) { R.pset(x + 1, y + 1, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); } };
// la cartera de cuero de Smith, colgada de la mano
const cartera = (x, y) => { R.rect(x - 4, y + 1, x + 4, y + 8, K); R.rect(x - 3, y + 2, x + 3, y + 7, hex('#7a4a2a')); R.rect(x - 3, y + 2, x + 3, y + 2, hex('#a06a3c')); R.rect(x - 3, y + 7, x + 3, y + 7, hex('#4e2c18')); R.pset(x, y + 4, hex('#e8c060')); R.rect(x - 1, y, x + 1, y, K); };

// 1. la fachada: el coche pasa primero; Smith llega andando, saluda, cruza la cancela, sube y entra
const p1 = (t) => {
  const o = { encuadre: 'fachada', coche: Math.round(54 + t * 78) };
  const G = T.vistas(R, t, o);
  const anda = tramo(t, 1.5, 4.2), sube = tramo(t, 4.2, P2 - 0.55), dentro = t > P2 - 0.55;
  // el colega que espera junto a la cancela, con su paraguas cerrado: saluda y entra detrás
  const sig1 = tramo(t, P2 - 1.7, P2 - 0.7), sig2 = tramo(t, P2 - 0.7, P2 + 0.3), sig = (sig1 + sig2) / 2, cx = Math.round(lerp(204, 166, sig1)), cy = Math.round(lerp(150, 138, sig2));
  const col = R.actor(EL.colega1NX, cx, cy, t, { dir: -1, anda: sig > 0 && sig < 1, sonrisa: t > 3.2, dedo: t > 3.3 && t < 4.3, sostiene: t > 3.3 && t < 4.3 ? false : [cx - 3, cy - 9] });
  if (!(t > 3.3 && t < 4.3)) { const [mx, my] = col.mano; R.linea(mx, my - 6, mx - 1, my + 9, K); R.linea(mx + 1, my - 5, mx, my + 8, hex('#3a3a4a')); R.pset(mx, my - 7, hex('#c8a868')); }
  if (!dentro) {
    const x = Math.round(lerp(-18, 153, anda)), y = Math.round(lerp(150, 127, sube));
    const s = R.actor(EL.smith, x, y, t, { dir: 1, anda: (anda > 0 && anda < 1) || (sube > 0 && sube < 1), sonrisa: t > 3.2 && t < 4.6, sostiene: [x + 15, y - 9] });
    cartera(s.mano[0], s.mano[1]);
  }
  T.vistasDelante(R, t, o);
};

// 2. la mesa: dos manos ordenan y juntan los trozos
const MANGA = '#2e3a56';
const p2 = (t) => {
  const ord = sua(tramo(t, P2 + 0.35, P3 - 0.45)), o = { encuadre: 'fragmentos', orden: ord };
  const G = T.mesas(R, t, o), tz = G.trozos, n = tz.length;
  const q = (ord * 1.45 - 0.225) / 0.14;
  for (const m of [0, 1]) {
    const reposo = m ? [236, 150] : [150, 172];
    let pos = reposo;
    if (ord > 0.01 && ord < 0.995 && n) {
      const f = (q - m) / 2, i = Math.floor(f), fr = f - i, k0 = m + 2 * i, k1 = k0 + 2;
      const a = k0 < 0 ? reposo : k0 >= n ? reposo : [tz[k0][0] + 6, tz[k0][1] + 6], b = k1 < 0 ? reposo : k1 >= n ? reposo : [tz[k1][0] + 6, tz[k1][1] + 6];
      const u = sua(lim((fr - 0.55) / 0.45)); pos = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
    }
    const tiembla = Math.round(Math.sin(t * 9 + m * 2) * 0.6);
    if (m) T.mano(R, Math.round(pos[0]) + 12, Math.round(pos[1]) + 3 + tiembla, -1, MANGA, { sinManga: true });
    else T.mano(R, Math.round(pos[0]) - 12, Math.round(pos[1]) + 3 + tiembla, 1, MANGA, { sinManga: true });
  }
  if (ord >= 0.995) { const u = (t - (P3 - 0.45)) * 3; if (u < 1) chispa(G.tablilla[0] + 14, G.tablilla[1] - 22, 1 + Math.round(u * 3), hex('#fff6d0')); }
  T.mesasDelante(R, t, o);
};

// 3. la ciudad de adobe entre los ríos: de ahí venían; una tablilla sale por una línea de puntos
const p3 = (t) => {
  const o = { encuadre: 'ciudad', crecida: 0 };
  const G = T.mesopotamia(R, t, o);
  const [px, py] = G.puerta, sale = sua(tramo(t, P3 + 0.5, P4 - 0.35));
  // el aro que late en la puerta de la ciudad
  const lat = (t * 1.6) % 1; for (let a = 0; a < 20; a++) { const an = a / 20 * 6.283, r = 5 + lat * 7; if (lat < 0.8) R.pset(Math.round(px + Math.cos(an) * r), Math.round(py - 6 + Math.sin(an) * r * 0.7), hex('#fff0b0')); }
  // la curva: de la puerta hacia arriba a la derecha, por debajo de la esquina de Atom
  const cur = (u) => [px + 4 + (296 - px) * u, py - 2 - Math.sin(u * Math.PI) * 10 + u * 12];
  for (let i = 0; i < 40; i++) { const u = i / 40; if (u > sale) break; if (i % 2) continue; const [x, y] = cur(u); R.rect(Math.round(x) - 1, Math.round(y) - 1, Math.round(x) + 2, Math.round(y) + 2, hex('#fff6d8')); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#a8302a')); }
  T.mesopotamiaDelante(R, t, o);
  const [tx, ty] = cur(sale), bamb = Math.round(Math.sin(t * 6) * 1.5);
  for (let j = -30; j <= 30; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j) / 30; if (d < 1 && ((i + j) & 1) === 0 && d > 0.6 + 0.15 * Math.sin(t * 5)) { const x = Math.round(tx) + i, y = Math.round(ty) - 12 + j; R.pset(x, y, mez(R.pget(x, y), hex('#fff0b0'), 0.45)); } }
  T.PIEZAS_NX.tablilla(R, Math.round(tx), Math.round(ty) + 8 + bamb, { t, s: 2 });
};

// 4. el cuaderno, de noche: copia cuñas y pasa la hoja
const p4 = (t) => {
  const D = P5 - P4, v = (t - P4) / D;
  // dos tandas de copia y, entre ellas, la hoja que pasa
  const pasa1 = tramo(v, 0.4, 0.52);
  const esc = v < 0.4 ? lerp(0.2, 1, tramo(v, 0.02, 0.38)) : lerp(0, 0.92, tramo(v, 0.54, 1));
  const o = { encuadre: 'cuaderno', paginas: pasa1 / 4, escribe: esc };
  const G = T.mesas(R, t, o), [ux, uy] = G.punta, f = G.pasando;
  if (f > 0 && f < 1) {
    // la mano acompaña la hoja por la esquina de arriba y la suelta
    const sq = Math.abs(Math.cos(f * Math.PI)), dir = f < 0.5 ? 1 : -1, x = 160 + dir * Math.round(84 * sq), y = 52 - Math.round(Math.sin(f * Math.PI) * 9);
    T.h_pluma(R, x + 16, y + 20, 1, t); T.mano(R, x + 13, y + 10, -1, MANGA, { sinManga: true });
  } else {
    const r = Math.round(Math.sin(t * 13) * 1.2), s = Math.round(Math.cos(t * 9) * 0.8);
    T.h_pluma(R, ux + r, uy + s, 1, t); T.mano(R, ux + r + 22, uy + s - 9, -1, MANGA, { sinManga: true });
  }
  T.mesasDelante(R, t, o);
};

// 5. la tablilla, de cerca: el golpe, la lectura fila a fila y, con «flood», la lluvia y el barco
const p5 = (t) => {
  const dib = t < BOAT ? 0.088 * tramo(t, FLOOD, BOAT - 0.1) : lerp(0.088, 0.6, tramo(t, BOAT, P6 - 0.25));
  const o = { encuadre: 'sala', camara: 'tablilla', unidos: 1, dibujo: dib };
  const G = T.museo(R, t, o), [x0, y0, x1, y1] = G.tablilla;
  // la luz de la lectura: una ventana que recorre las filas de cuñas, de izquierda a derecha
  if (t < FLOOD + 0.2) { const u = tramo(t, P5 + 0.5, FLOOD), fila = Math.min(6, Math.floor(u * 7)), fr = u * 7 - fila, cx = Math.round(lerp(x0 + 18, x1 - 20, fr)), cy = y0 + 16 + fila * 13;
    for (let j = -6; j <= 6; j++) for (let i = -13; i <= 13; i++) { const d = Math.hypot(i / 13, j / 6); if (d >= 1) continue; const x = cx + i, y = cy + j; if (x > x1 - 4 || y > y1 - 4) continue; const c = R.pget(x, y), l = (c & 255) + ((c >>> 8) & 255); if (l > 250) R.pset(x, y, mez(c, hex('#fff6d0'), 0.25 + (1 - d) * 0.35)); else if (l > 90) R.pset(x, y, d < 0.8 ? hex('#fffbe0') : hex('#ffd870')); }
    for (let i = -14; i <= 14; i++) { if (cx + i < x1 - 4) { R.pset(cx + i, cy + 8, hex('#ffd870')); } } }
  // el brazo de Smith, que sigue la lectura con el dedo en el borde y da un respingo con «flood»
  { const u = tramo(t, P5 + 0.5, FLOOD), resp = t > FLOOD ? Math.sin(Math.min(1, (t - FLOOD) * 2.5) * Math.PI) * 6 : 0, hx = Math.round(80 + ((u * 7) % 1) * 7 - resp), hy = Math.round(147 + Math.floor(Math.min(6, u * 7)) * 0.8 + resp * 0.4 + (t > BOAT ? Math.sin(t * 14) * 1 : 0));
    T.brazo(R, 30, 179, hx, hy, MANGA, 1); }
  // el golpe: el destello sobre la arcilla
  { const u = (t - P5) / 0.8; if (u >= 0 && u < 1) { const r = Math.round(2 + u * 6); chispa(x0 + 30, y0 + 22, r, hex('#fffbe8')); chispa(x1 - 22, y1 - 30, Math.max(1, r - 3), hex('#fff0b0')); for (let a = 0; a < 28; a++) { const an = a / 28 * 6.283, rr = 20 + u * 70; R.pset(Math.round(160 + Math.cos(an) * rr), Math.round(84 + Math.sin(an) * rr * 0.8), hex('#fff0b0')); } } }
  if (dib > 0.55 && Math.floor(t * 6) % 2) chispa(206, 62, 3, hex('#fffbe8'));
  T.museoDelante(R, t, o);
};

// 6. desde el tejado: agua hasta el horizonte; amaina, el barco lejano (sin nadie) y la paloma
const p6 = (t) => {
  const o = { encuadre: 'ciudad', camara: 'tejado', crecida: lerp(1, 0.82, sua(tramo(t, BAJA, P7))), lluvia: 1 - tramo(t, P6 + 1.2, BAJA + 0.6) };
  const G = T.mesopotamia(R, t, o), hz = G.horizonte;
  // el barco, muy lejos, en el horizonte: un casco oscuro con su caseta, que cabecea y deja estela
  { const bx = Math.round(196 + (t - P6) * 8), by = hz + 5 + Math.round(Math.sin(t * 1.7) * 0.6); R.rect(bx - 8, by - 2, bx + 8, by, hex('#3a2a20')); R.rect(bx - 7, by + 1, bx + 7, by + 1, hex('#241a16')); R.rect(bx - 9, by - 3, bx - 8, by - 2, hex('#3a2a20')); R.rect(bx + 8, by - 3, bx + 9, by - 2, hex('#3a2a20')); R.rect(bx - 4, by - 6, bx + 4, by - 3, hex('#5a4030')); R.rect(bx - 5, by - 7, bx + 5, by - 7, hex('#7a5a40')); R.rect(bx - 8, by - 2, bx + 8, by - 2, hex('#6a4c36'));
    for (let i = 0; i < 9; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(bx - 11 - i * 2, by + 2 + (i & 1), hex('#d8ecf0')); }
  T.mesopotamiaDelante(R, t, o);
  // la paloma (sin hoja) cruza el cielo y el agua de izquierda a derecha
  { const u = tramo(t, DOVE - 1.0, P7 + 0.3); if (u > 0) { const x = Math.round(lerp(-26, 252, u)), y = Math.round(104 - Math.sin(u * Math.PI * 0.8) * 46 + Math.sin(t * 6) * 2); T.PIEZAS_NX.paloma(R, x, y, { t, s: 2 }); } }
};

// 7. gag 4: salta, corre por la sala y empieza a quitarse la chaqueta; los colegas le miran
const p7 = (t) => {
  const o = { encuadre: 'sala' };
  const G = T.museo(R, t, o), [mx, my] = G.mesa, [c1, c2] = G.colegas, pas = 152;
  // el recorrido: detrás de la mesa → el pasillo → ida y vuelta → se para en el centro
  const ruta = [[mx, 0], [130, 0.24], [216, 0.56], [140, 0.84], [196, 1]], u = tramo(t, RAN, BEGAN - 0.1);
  let sx = mx, dir = 1; for (let i = 1; i < ruta.length; i++) if (u >= ruta[i - 1][1]) { sx = lerp(ruta[i - 1][0], ruta[i][0], lim((u - ruta[i - 1][1]) / (ruta[i][1] - ruta[i - 1][1]))); dir = ruta[i][0] > ruta[i - 1][0] ? 1 : -1; }
  sx = Math.round(sx); const sy = sx < 127 ? my : pas, corre = u > 0 && u < 1;
  const brinco = t > JUMP && t < RAN ? Math.round(Math.abs(Math.sin((t - JUMP) * Math.PI / 0.36)) * 9) : corre ? Math.floor(t * 8) % 2 : 0;
  // los colegas: charlan; con el salto se vuelven, asombrados, y le siguen con la mirada
  const pasmo = t > JUMP + 0.15;
  R.actor(EL.colega1NX, c1[0] - (pasmo && sx < 150 && sy === pas ? 3 : 0), c1[1], t, { dir: pasmo ? (sx < c1[0] ? -1 : 1) : 1, habla: !pasmo && Math.sin(t * 7) > 0, dedo: !pasmo, sorpresa: pasmo, salto: pasmo && t < JUMP + 0.4 ? 2 : 0 });
  R.actor(EL.colega2NX, c2[0], c2[1], t, { dir: pasmo ? (sx < c2[0] ? -1 : 1) : -1, sorpresa: pasmo, salto: pasmo && t > JUMP + 0.1 && t < JUMP + 0.5 ? 2 : 0 });
  if (t > RAN + 0.9 && t < BEGAN) R.bocadillo(c2[0] + 8, c2[1] - 30, { icono: '?' });
  if (t > FUERA + 0.2) R.bocadillo(c1[0] + 8, c1[1] - 30);
  // Smith
  if (t < FUERA) {
    const quita = t > BEGAN, tir = quita ? Math.round(Math.sin((t - BEGAN) * 22) * 1) : 0;
    R.actor(EL.smith, sx + tir, sy, t, { dir, anda: corre, salto: brinco + (quita ? Math.floor(t * 6) % 2 : 0), brazos: (t > JUMP && t < RAN) || quita, sorpresa: t < JUMP + 0.3, sonrisa: t > JUMP + 0.3 });
  } else {
    // en mangas de camisa, agita la levita en alto
    // en mangas de camisa, con la levita en alto, cogida con las dos manos, que ondea
    const w = (t - FUERA), c = Math.round(Math.sin(w * 10) * 2), br = Math.floor(t * 5) % 2;
    R.actor(EL.smithSinChaqueta, sx, sy, t, { dir: 1, sonrisa: true, salto: br, brazos: true });
    const jx = sx + 7, jy = sy - 33 - br - Math.round(tramo(w, 0, 0.35) * 5), AZ = hex('#2e3a56'), AS = hex('#1e2840'), AL = hex('#5a6a8c');
    R.poligono([[jx - 12, jy - 1], [jx + 12, jy - 1], [jx + 13, jy + 8 + c], [jx, jy + 6], [jx - 13, jy + 8 - c]], K);
    for (const d of [-1, 1]) { const q = d * c; R.rect(jx + d * 12 - 2, jy + 1, jx + d * 12 + 2, jy + 12 + q, K); R.rect(jx + d * 12 - 1, jy + 1, jx + d * 12 + 1, jy + 11 + q, d < 0 ? AZ : AS); R.pset(jx + d * 12, jy + 11 + q, hex('#f6f2ea')); }
    R.poligono([[jx - 11, jy], [jx + 11, jy], [jx + 12, jy + 7 + c], [jx, jy + 5], [jx - 12, jy + 7 - c]], AZ);
    R.linea(jx - 10, jy, jx + 10, jy, AL); R.linea(jx, jy + 1, jx - 4, jy + 5, AL); R.linea(jx, jy + 1, jx + 4, jy + 5, AL); R.linea(jx + 6, jy + 2, jx + 10, jy + 6 + c, AS);
    R.pset(jx - 6, jy + 3, hex('#e8c060')); R.pset(jx - 8, jy + 5, hex('#e8c060'));
  }
  T.museoDelante(R, t, o);
  // los papeles que saltan de la mesa con el brinco
  { const w = t - JUMP; if (w > 0 && w < 1.6) for (let k = 0; k < 5; k++) { const vx = -26 + k * 15, x = Math.round(mx + 24 + vx * w + Math.sin(w * 7 + k) * 3), y = Math.round(138 - (46 + k * 5) * w + 46 * w * w); if (y < 150) { const g = Math.floor(w * 9 + k) % 2; R.rect(x - 1, y - 1, x + 5 + g, y + 4 - g, K); R.rect(x, y, x + 4 + g, y + 3 - g, hex('#f4ecd8')); R.rect(x + 1, y + 1, x + 3, y + 1, hex('#8a7a66')); } } }
};
const efectos = [[0.4, 'carro'], [P2 - 0.5, 'puerta'], [P2 + 0.9, 'golpecito'], [P3 - 0.5, 'toc'], [P3 + 0.6, 'whoosh'], [P4 + 0.3, 'lapiz'], [P4 + (P5 - P4) * 0.42, 'papel'], [P4 + (P5 - P4) * 0.56, 'lapiz'],
  [P5 + 0.1, 'brillo'], [FLOOD, 'lluvia'], [P6 + 0.2, 'lluvia'], [BAJA, 'ola'], [DOVE - 0.5, 'rafaga'], [JUMP, 'boing'], [JUMP + 0.25, 'papel'], [BEGAN + 0.1, 'pop'], [FUERA, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1872', efectos, año: 1872 });
''')

E['nx-gilgamesh'] = ('El Poema de Gilgamesh', '''// NX-GILGAMESH (frase «gilgamesh»), 1872. Tres planos:
// 1. la línea del tiempo sobre el rollo: con «That tablet» se enciende la tablilla grande; una mano la señala y, con
//    «centuries older», un arco de puntos salta hacia atrás desde el libro (apagado, a tinta) hasta la tablilla;
// 2. diciembre de 1872, la sala llena: el presentador le da paso, Smith sale al atril y lee («Smith read it in public»);
// 3. la primera fila desde el estrado: Gladstone, de patillas, escucha en el centro; un colega le cuchichea, él pide
//    silencio con el dedo y al final los tres aplauden.''', r'''
const g = (w) => en('gilgamesh', (w - 0.5) / 13.808);   // el segundo de cada palabra inglesa
const P2 = g(7.1), P3 = g(11.4);
const TABLET = g(0.68), OLDER = g(4.8), GENESIS = g(6.5), READ = g(9.04), PM = g(11.82);
const sua = (u) => u * u * (3 - 2 * u);
const K = hex('#14121c'), MANGA = '#2e3a56';
const mez = (c1, c2, a) => { const r = (c) => c & 255, g = (c) => (c >>> 8) & 255, b = (c) => (c >>> 16) & 255; return (0xff000000 | (Math.round(b(c1) + (b(c2) - b(c1)) * a) << 16) | (Math.round(g(c1) + (g(c2) - g(c1)) * a) << 8) | Math.round(r(c1) + (r(c2) - r(c1)) * a)) >>> 0; };

// 1. la línea del tiempo
const p1 = (t) => {
  const o = { encuadre: 'marnegro', camara: 'linea', marcas: tramo(t, 0.1, 0.5) + tramo(t, TABLET, TABLET + 0.7) };
  const G = T.diluvios(R, t, o), [xa, yi, yn] = G.marcas[1], [xb] = G.marcas[2];
  // el arco de «siglos antes»: sale del libro y cae sobre la tablilla, con su punta de flecha
  const arco = sua(tramo(t, OLDER, GENESIS - 0.2)), N = 26, pt = (u) => [Math.round(lerp(xb, xa, u)), Math.round(yi - 34 - Math.sin(u * Math.PI) * 6)];
  for (let i = 0; i <= N; i++) { const u = i / N; if (u > arco) break; const [x, y] = pt(u); if (i % 2 === 0) { R.rect(x, y, x + 1, y + 1, hex('#a8302a')); R.pset(x + 1, y + 2, hex('#d8c498')); } }
  if (arco >= 1) { const [x, y] = pt(1), lat = Math.floor(t * 4) % 2; R.poligono([[x - 3, y - lat], [x + 4, y - lat], [x, y + 4 - lat]], hex('#a8302a')); }
  // la mano: señala la tablilla, y luego el libro
  const va = sua(tramo(t, GENESIS - 0.5, GENESIS + 0.2)), entra = sua(tramo(t, TABLET - 0.4, TABLET + 0.2));
  const toque = Math.round(Math.abs(Math.sin(t * 5)) * 2 * (t > TABLET + 0.2 && t < OLDER ? 1 : t > GENESIS + 0.2 ? 1 : 0));
  const hx = Math.round(lerp(lerp(86, xa + 7, entra), xb + 7, va)), hy = Math.round(lerp(190, yn + 12, entra)) - toque;
  T.brazo(R, hx + 26, hy + 40, hx + 12, hy + 6, MANGA, -1, { codo: [hx + 24, hy + 24] });
  T.diluviosDelante(R, t, o);
};

// 2. la conferencia: el presentador da paso a Smith, que sale al atril y lee
const p2 = (t) => {
  const o = { encuadre: 'conferencia' };
  const G = T.museo(R, t, o), [ox, oy] = G.orador, [hx, hy] = G.hueco;
  const sale = sua(tramo(t, P2 + 0.2, READ - 0.25)), lee = t > READ - 0.2;
  const pv = tramo(t, P2 + 1.1, READ + 0.3);
  R.actor(EL.colega2NX, Math.round(lerp(114, 104, pv)), oy, t, { dir: pv > 0 && pv < 1 ? -1 : 1, anda: pv > 0 && pv < 1, dedo: pv === 0, habla: pv === 0 && Math.sin(t * 8) > 0, sonrisa: true });
  const sx = Math.round(lerp(208, ox, sale));
  const s = R.actor(EL.smith, sx, oy, t, { dir: -1, anda: sale > 0 && sale < 1, habla: lee && Math.sin(t * 7.5) > -0.1, sostiene: lee ? [sx - 4, oy - 12 + Math.round(Math.sin(t * 2.2))] : [sx - 2, oy - 9] });
  { const [mx, my] = s.mano; R.rect(mx - 4, my - 5, mx + 2, my + 2, K); R.rect(mx - 3, my - 4, mx + 1, my + 1, hex('#f4ecd8')); R.rect(mx - 2, my - 3, mx, my - 3, hex('#8a7a66')); R.rect(mx - 2, my - 1, mx, my - 1, hex('#8a7a66')); }
  R.actor(EL.gladstone, hx, hy, t, { dir: 1, salto: lee && Math.floor(t * 1.4) % 3 === 0 ? 1 : 0 });
  T.museoDelante(R, t, o);
};

// 3. la primera fila, desde el estrado
const p3 = (t) => {
  const o = { encuadre: 'primerafila' };
  const G = T.vistas(R, t, o), [a1, a2, a3] = G.asientos;
  const cuchi = t > P3 + 0.5 && t < PM + 0.5, chis = t > PM + 0.5 && t < PM + 1.7, aplauso = t > E.duracion - 1.5, pal = Math.floor(t * 7) % 2;
  // con «Prime Minister» la sala se apaga un poco y una luz cálida cae sobre su butaca
  { const f = tramo(t, PM - 0.3, PM + 0.5); if (f > 0) { T.tinte(R, 15, 138, [10, 6, 20], 0.34 * f); const cx = a2[0] + 7, cy = a2[1] - 16;
    for (let j = -30; j <= 24; j++) for (let i = -24; i <= 24; i++) { const d = Math.hypot(i / 24, j / 30); if (d >= 1) continue; const x = cx + i, y = cy + j; if (y > 138) continue; const a = (1 - d) * 0.75 * f; if (((x + y) & 1) === 0 || d < 0.6) R.pset(x, y, mez(R.pget(x, y), hex('#ffe8b0'), a * 0.6)); } } }
  R.actor(EL.colega1NX, a1[0] + (cuchi ? 4 : 0), a1[1], t, { dir: 1, habla: cuchi && Math.sin(t * 9) > 0, sorpresa: chis, sonrisa: aplauso, brazos: aplauso && pal === 0 });
  R.actor(EL.gladstone, a2[0], a2[1], t, { dir: chis ? -1 : 1, dedo: chis, enfado: chis, sonrisa: aplauso, brazos: aplauso && pal === 1, salto: !chis && !aplauso && Math.floor(t * 1.2) % 3 === 0 ? 1 : 0 });
  R.actor(EL.colega2NX, a3[0], a3[1], t, { dir: -1, sonrisa: t > PM, brazos: aplauso && pal === 0, salto: t > PM && !aplauso && Math.floor(t * 1.5 + 1) % 4 === 0 ? 1 : 0 });
  T.vistasDelante(R, t, o);
};
const efectos = [[TABLET, 'brillo'], [OLDER + 0.2, 'lapiz'], [GENESIS, 'toc'], [P2 + 0.3, 'publico'], [READ - 0.3, 'golpecito'], [P3 + 0.6, 'publico'], [E.duracion - 1.4, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1872 });
''')
