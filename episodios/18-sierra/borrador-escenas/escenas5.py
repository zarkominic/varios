E = {}

E['si-muerte'] = ('Todo te mata', '''// SI-MUERTE (frases 30–32), 1987. Cinco planos:
// 1. el camino de los peligros al atardecer: Graham avanza de puntillas; en «wolf» llega un lobo trotando y aúlla; en
//    «ogre» el ogro asoma de la cueva y da un garrotazo en el suelo, Graham salta y se escapa hacia el tronco;
// 2. (corta en «A river») el barranco de cerca: el disquete llega corriendo y guarda antes del tronco (gag 4); un pez salta
//    en el río; Graham cruza, en «wrong step» el tronco cruje y él se tambalea (el disquete se tapa los ojos), y llega;
// 3. (corta en «Police») la comisaría de día: el policía baja la escalinata, da la vuelta al coche patrulla por detrás y
//    por delante y mira las dos ruedas (✓ verde en cada una); pasan el cartero y una vecina;
// 4. (corta en «You had to follow») inserto: el reglamento abierto en la mesa de la comisaría: las huellas rodean el coche
//    dibujado y la mano del policía marca las tres casillas en «follow», «rulebook» y «letter»; la radio llama;
// 5. (corta en «patrol car») el aparcamiento: el otro policía sale, sube sin dar la vuelta y arranca; el primero menea el
//    dedo; en «tire» la rueda revienta (¡pum!), las palomas salen volando y el coche se queda torcido; en «game was over»
//    sale con las manos a la cabeza y se abre el cuadro de la muerte, que guiña.''', r'''
const a = (f) => en('lobo', f), b = (f) => en('police', f), c = (f) => en('cuneta', f);
const P2 = a(0.64), P3 = b(0.015), P4 = b(0.727), P5 = c(0.124);
const K = hex('#16121c');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const suave = (u) => u * u * (3 - 2 * u);
// sprite de filas de letras; i0–i1: solo esas columnas
const spr = (rows, x, y, dir, pal, i0 = 0, i1 = 99) => { const w = rows.reduce((m, r) => Math.max(m, r.length), 0); rows.forEach((r, j) => { for (let i = Math.max(0, i0); i < Math.min(r.length, i1 + 1); i++) { const ch = r[i]; if (ch !== '.' && pal[ch] !== undefined) R.pset(x + (dir > 0 ? i : w - 1 - i), y + j, pal[ch]); } }); };

// el lobo de cuento, gris, de perfil (26 × 16): o.dir, o.anda (trota), o.aulla (0–1: estira el cuello y aúlla)
const LOBO = [
  '..................k..k....',
  '.................kMkkMk...',
  '.................kMMMMk...',
  '................kMMMMMMk..',
  '................kMeMMMMLkk',
  '..kk............kMMMMLLLLk',
  '.kMMk..........kMMMMMLLLk.',
  'kMMk.kkkkkkkkkkMMMMMMkkk..',
  'kMk.kMMMMMMMMMMMMMMMMk....',
  '.k.kMMMMMMMMMMMMMMMMMMk...',
  '...kmMMMMMMMMMMMMMMMMmk...',
  '...kmmMMMLLLLLLLLMMMmmk...',
  '....kmmkkkkkkkkkkkmmk.....'];
const PATAS_L = [['....kmk.kmk....kmk.kmk....', '....kmk.kmk....kmk.kmk....', '....kkk.kkk....kkk.kkk....'],
                 ['...kmk...kmk..kmk...kmk...', '..kmk.....kmk.kmk....kmk..', '..kkk.....kkk.kkk....kkk..']];
const lobo = (x, suelo, t, o = {}) => {
  const dir = o.dir ?? 1, f = o.anda ? Math.floor(t * 10) % 2 : 0, y = suelo - 16 - (o.anda && f ? 1 : 0);
  const pal = { k: K, M: hex('#8a8a9a'), m: hex('#5e5e70'), L: hex('#d0d0da'), e: hex('#f0c830') };
  const dy = Math.round((o.aulla ?? 0) * 3), cola = Math.sin(t * (o.anda ? 14 : 7)) > 0 ? 1 : 0;
  R.disco(x + 13, suelo, 0, K); for (let i = 3; i < 23; i++) R.pset(x + i, suelo, hex('#3a2a20'));   // sombra
  spr(LOBO.slice(0, 8), x, y - cola, dir, pal, 0, 4);                 // la cola, que se menea
  spr(LOBO.slice(7), x, y + 7, dir, pal);                             // el cuerpo
  spr(PATAS_L[f], x, y + 13, dir, pal);
  if (dy) spr(LOBO.slice(5, 8), x, y + 5, dir, pal, 14, 25);         // el cuello estirado
  spr(LOBO.slice(0, 8), x, y - dy, dir, pal, 14, 25);                 // la cabeza
  if ((o.aulla ?? 0) > 0.6) {   // el aullido: ondas que salen del hocico hacia arriba
    const X = x + (dir > 0 ? 25 : 0), Y = y + 4 - dy;
    for (let k = 0; k < 3; k++) { const r = 3 + k * 3 + ((t * 8) % 3); for (let an = -1.9; an <= -0.5; an += 0.12) R.pset(Math.round(X + dir * Math.cos(an) * r), Math.round(Y + Math.sin(an) * r), k === 2 ? hex('#c8c0d8') : hex('#f4f0ff')); }
  }
};
// el ogro asoma de la cueva (u 0–1) con su garrote (golpe 0–1: lo baja contra el suelo)
const ogro = (t, u, golpe) => {
  const cx = 31, cy = Math.round(lerp(166, 140, u)), V = hex('#6a9a3a'), VS = hex('#466e26'), VL = hex('#9ac85a');
  R.recorte([9, 117, 53, 157]);
  const an = lerp(-1.25, 0.15, golpe), gx = cx + 12, gy = cy + 12, ex = Math.round(gx + Math.cos(an) * 20), ey = Math.round(gy + Math.sin(an) * 20);
  for (let d = -1; d <= 1; d++) R.linea(gx + d, gy, ex + d, ey, hex('#6a4424'));
  R.disco(ex, ey, 5, K); R.disco(ex, ey, 4, hex('#8a5a30')); R.pset(ex - 1, ey - 2, hex('#b07a44'));
  R.disco(cx + 9, cy - 1, 3, K); R.disco(cx - 9, cy - 1, 3, K); R.disco(cx + 9, cy - 1, 2, VS); R.disco(cx - 9, cy - 1, 2, VS);
  R.disco(cx, cy, 10, K); R.disco(cx, cy, 9, VS); R.disco(cx - 1, cy - 1, 8, V); R.disco(cx - 3, cy - 4, 3, VL);
  const mira = 1; for (const s of [-4, 4]) { R.rect(cx + s - 2, cy - 3, cx + s + 1, cy, hex('#f4f0e0')); R.rect(cx + s + mira - 1, cy - 2, cx + s + mira, cy - 1, K); R.linea(cx + s - 3, cy - 5 + (s < 0 ? 0 : 1), cx + s + 2, cy - 5 + (s < 0 ? 1 : 0), K); }
  R.rect(cx - 2, cy + 1, cx + 1, cy + 2, VS); R.linea(cx - 5, cy + 5, cx + 5, cy + 5, K); R.pset(cx - 4, cy + 4, hex('#f4f0e0')); R.pset(cx + 4, cy + 4, hex('#f4f0e0')); R.pset(cx - 4, cy + 3, hex('#f4f0e0')); R.pset(cx + 4, cy + 3, hex('#f4f0e0'));
  for (let i = -3; i <= 3; i += 2) R.pset(cx + i, cy - 10, K);
  R.recorte(null);
};

const p1 = (t) => {
  const L = 'tarde';
  T.reino(R, t, { encuadre: 'peligros', luz: L });
  const og = tramo(t, a(0.46), a(0.52)), golpe = tramo(t, a(0.535), a(0.56)) - tramo(t, a(0.62), a(0.7));
  if (og > 0) ogro(t, og, golpe);
  if (golpe > 0.9 && t < a(0.6)) for (let k = 0; k < 6; k++) { const u = tramo(t, a(0.555), a(0.6)); R.disco(Math.round(48 + k * 3 + u * 6), Math.round(152 - u * 6 - (k % 2) * 2), 2 - (u > 0.6 ? 1 : 0), hex('#c8a878')); }
  // Graham: de puntillas hasta el lobo; se queda helado; en el garrotazo salta y corre hacia el tronco
  const g1 = a(0.40), g2 = a(0.555);
  const gx = t < g1 ? lerp(2, 56, tramo(t, 0.3, g1)) : t < g2 ? 56 : lerp(56, 100, tramo(t, g2, P2));
  const anda = (t > 0.3 && t < g1) || t > g2;
  R.actor(EL.graham, Math.round(gx), 154, t, { dir: 1, anda, sorpresa: t > a(0.41) && t < a(0.62), salto: t > g2 && t < g2 + 0.25 ? 4 : 0, brazos: t > g2 && t < g2 + 0.35 });
  if (t > a(0.41) && t < a(0.5)) R.bocadillo(Math.round(gx) + 8, 120, {});
  // el lobo llega trotando desde la derecha y aúlla
  const lx = lerp(330, 176, suave(tramo(t, a(0.24), a(0.39))));
  lobo(Math.round(lx), 157, t, { dir: -1, anda: t > a(0.24) && t < a(0.39), aulla: tramo(t, a(0.41), a(0.44)) - tramo(t, a(0.52), a(0.55)) });
  T.reinoDelante(R, t, { encuadre: 'peligros', luz: L });
};

const p2 = (t) => {
  T.reino(R, t, { encuadre: 'peligros', camara: 'barranco' });
  // un pez salta en el río del fondo (en «river»)
  const pz = tramo(t, P2 + 0.1, P2 + 0.75);
  if (pz > 0 && pz < 1) { const px = Math.round(lerp(132, 156, pz)), py = Math.round(176 - Math.sin(pz * Math.PI) * 24); R.rect(px - 3, py - 1, px + 3, py + 1, K); R.rect(px - 2, py, px + 2, py, hex('#f08a3a')); R.pset(px + 2, py - 1, hex('#f8c070')); R.pset(px - 4, py - 1, K); R.pset(px - 4, py + 1, K); R.pset(px - 3, py, hex('#f08a3a')); }
  if (pz >= 1 && pz < 1.01 || (t > P2 + 0.75 && t < P2 + 1.1)) { const u = tramo(t, P2 + 0.75, P2 + 1.1); R.anillo(158, 176, Math.round(2 + u * 6), hex('#c8e4f4')); }
  // el disquete llega corriendo y guarda antes del tronco; cuando el tronco cruje, se tapa los ojos
  const dq = tramo(t, P2 + 0.05, P2 + 0.5), wob0 = a(0.79), wob1 = a(0.88);
  T.disquete(R, Math.round(lerp(-12, 20, dq)), 122, t, { corre: dq > 0 && dq < 1 ? 1 : 0, dir: 1, guarda: tramo(t, P2 + 0.5, P2 + 1.1) - tramo(t, P2 + 1.5, P2 + 1.7), tapa: tramo(t, wob0, wob0 + 0.15) - tramo(t, wob1 + 0.2, wob1 + 0.4), expresion: t > wob1 + 0.4 ? 'feliz' : 'normal' });
  // Graham espera, cruza; en «wrong step» se tambalea con los brazos arriba
  const s1 = P2 + 1.1;
  const gx = t < s1 ? 40 : t < wob0 ? lerp(40, 104, tramo(t, s1, wob0)) : t < wob1 ? 104 : lerp(104, 214, tramo(t, wob1, P3 - 0.1));
  const tamb = t > wob0 && t < wob1 ? Math.round(Math.sin(t * 38) * 1.6) : 0;
  R.actor(EL.graham, Math.round(gx) + tamb, 122, t, { dir: 1, anda: (t > s1 && t < wob0) || t > wob1, brazos: t > wob0 && t < wob1, sorpresa: t > wob0 && t < wob1 + 0.3, dedo: t < s1 && t > P2 + 0.4 });
  if (t > wob0 && t < wob1 + 0.6) {   // el tronco cruje: astillas que caen al vacío y polvo
    const u = tramo(t, wob0, wob1 + 0.6);
    for (let k = 0; k < 5; k++) { const x = 104 + k * 4 - 6 + Math.round(Math.sin(k * 3) * 2), y = Math.round(130 + u * u * (40 + k * 8)); R.rect(x, y, x + 2, y + 1, hex('#6a4424')); R.rect(x, y - 1, x + 1, y - 1, hex('#a87a4a')); }
    if (u < 0.5) for (const [dx, dy] of [[-6, 0], [22, -1], [-9, -3], [25, -3]]) R.pset(104 + dx, 120 + dy, hex('#e8dcc0'));
    if (u < 0.6) for (let i = 0; i < 3; i++) { const yy = 118 - i * 3, v = Math.floor(t * 20) % 2; R.rect(98 - i * 3 - v, yy, 99 - i * 3 - v, yy + 1, hex('#f4f0e0')); R.rect(126 + i * 3 + v, yy, 127 + i * 3 + v, yy + 1, hex('#f4f0e0')); }
    if (u < 0.7) for (const [dx, r] of [[-2, 3], [20, 3], [-6, 2], [24, 2]]) { R.disco(104 + dx, Math.round(124 - u * 4), r, hex('#d8ccb0')); R.disco(104 + dx - 1, Math.round(123 - u * 4), Math.max(1, r - 1), hex('#f0e8d4')); }
  }
};

const p3 = (t) => {
  T.ciudad(R, t, { encuadre: 'calle', luz: 'dia' });
  const s = P3;
  // el policía: baja la escalinata, va al coche, lo rodea por detrás y por delante y mira las ruedas
  const tr = [[s + 0.05, 109, 134], [s + 0.8, 109, 152], [s + 1.9, 222, 160], [s + 2.9, 306, 160], [s + 3.3, 306, 178], [s + 3.7, 280, 178], [s + 4.3, 280, 178], [s + 4.7, 242, 178], [s + 9, 242, 178]];
  let px = 109, py = 134, anda = false, dir = 1;
  for (let i = 0; i < tr.length - 1; i++) { const [t0, x0, y0] = tr[i], [t1, x1, y1] = tr[i + 1]; if (t >= t0 && t < t1) { const u = (t - t0) / (t1 - t0); px = lerp(x0, x1, u); py = lerp(y0, y1, u); anda = x0 !== x1 || y0 !== y1; dir = x1 > x0 ? 1 : x1 < x0 ? -1 : (t > s + 3.3 ? -1 : 1); } }
  if (t >= tr[tr.length - 1][0]) { px = 242; py = 178; dir = -1; }
  const mira1 = t > s + 3.7 && t < s + 4.3, mira2 = t > s + 4.7 && t < s + 5.4;
  const yo = () => R.actor(EL.policia, Math.round(px), Math.round(py), t, { dir, anda, dedo: mira1 || mira2, sonrisa: mira2 || t > s + 5.2, habla: t > s + 5.0 && Math.sin(t * 9) > 0 });
  // los vecinos de la acera
  const cj = tramo(t, s - 0.5, s + 5.6); R.actor(EL.cajera, Math.round(lerp(-18, 150, cj)), 154, t, { dir: 1, anda: true });
  if (py < 158) yo();
  const g = T.cochePatrulla(R, 266, 172, t, { dir: -1 });
  if (py >= 158) yo();
  const ca = tramo(t, s, s + 5.6); R.actor(EL.cartero, Math.round(lerp(204, 20, ca)), 157, t, { dir: -1, anda: true });
  if (mira1 && t > s + 3.95) T.visto(R, g.trasera[0] - 5, g.trasera[1] - 22, 1);
  if (mira2 && t > s + 4.95) T.visto(R, g.rueda[0] - 5, g.rueda[1] - 22, 1);
};

// ── el inserto del reglamento: la mesa de la comisaría vista desde arriba (fondo local) ──
let B4 = null;
const MAD = [hex('#5e3a20'), hex('#7a4e2c'), hex('#8e5e36'), hex('#a26e40'), hex('#b8844e'), hex('#c8965a')];
const PAP = hex('#f2ecd8'), PAPS = hex('#d8ceb4'), TINTA = hex('#4a4a5a'), RAYA = hex('#b8b0a0');
const COLS = [184, 211, 238];
const huellas = []; for (let k = 0; k < 11; k++) { const an = -Math.PI / 2 + k / 11 * Math.PI * 2 * 0.95; huellas.push([Math.round(113 + Math.cos(an) * 36), Math.round(94 + Math.sin(an) * 47), an]); }
const fondo4 = () => {
  if (!B4) {
    B4 = R.nuevo(); const prev = R.usar(B4);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const tabla = Math.floor((y + 8) / 32), yy = (y + 8) % 32;
      const veta = Math.sin(x * 0.05 + tabla * 2.1 + Math.sin(y * 0.4 + tabla) * 1.4 + Math.sin(x * 0.013 + tabla * 5) * 3);
      let k = 3 + (veta > 0.65 ? 1 : veta < -0.75 ? -1 : 0) + (hh(x >> 1, y, tabla) > 0.94 ? -1 : 0);
      const luz = 1 - Math.hypot((x - 170) / 190, (y - 100) / 120);
      if (luz > 0.6) k++; if (luz < 0.05) k--;
      if (((x + y * 1.25) % 34) < 11 && x + y < 210) k--;   // la sombra de la persiana
      if (yy === 0) k = 0; else if (yy === 1) k = Math.min(k, 1);
      R.pset(x, y, MAD[Math.max(0, Math.min(5, k))]);
    }
    for (const [nx, ny] of [[44, 126], [300, 70], [214, 176], [8, 20]]) { R.anillo(nx, ny, 3, MAD[1]); R.anillo(nx, ny, 1, MAD[0]); }
    // la gorra de plato (desde arriba), con su visera y la estrella
    R.disco(36, 76, 15, MAD[0]); R.disco(34, 72, 15, K); R.disco(34, 72, 14, hex('#141c30'));
    R.disco(34, 56, 23, MAD[1]); R.disco(32, 54, 22, K); R.disco(32, 54, 21, hex('#1e2c5a')); R.disco(30, 51, 16, hex('#2a3c72')); R.disco(27, 47, 7, hex('#34488a'));
    R.anillo(32, 54, 21, hex('#14203e'));
    const est = [[0, -4], [-1, -2], [1, -2], [-4, -1], [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [-1, 1], [1, 1], [2, 1], [-3, 2], [-2, 2], [2, 2], [3, 2], [0, -3], [0, -2]];
    for (const [i, j] of est) R.pset(32 + i, 66 + j, hex('#e8c040')); R.pset(32, 63, hex('#fff0a0'));
    // el dónut en su servilleta
    R.poligono([[14, 98], [52, 92], [58, 128], [20, 134]], MAD[1]); R.poligono([[12, 96], [50, 90], [56, 126], [18, 132]], hex('#f4f4f0'));
    for (let i = 0; i < 6; i++) R.linea(16 + i * 6, 96 - i, 22 + i * 6, 131 - i, hex('#e0e0dc'));
    R.disco(35, 112, 11, MAD[0]); R.disco(34, 111, 11, hex('#b8783a')); R.disco(34, 111, 10, hex('#d89a54')); R.disco(34, 110, 8, hex('#f08ab4')); R.disco(32, 108, 4, hex('#f8b4d0'));
    R.disco(34, 111, 3, hex('#d89a54')); R.disco(34, 111, 2, hex('#f4f4f0'));
    for (let k = 0; k < 14; k++) { const an = k * 2.4, r = 5 + (k % 3); R.pset(Math.round(34 + Math.cos(an) * r), Math.round(110 + Math.sin(an) * r), [hex('#5ac8f0'), hex('#f8f0a0'), hex('#8ae06a'), hex('#ffffff')][k % 4]); }
    // las llaves
    R.anillo(30, 156, 6, K); R.anillo(30, 156, 5, hex('#c0c4cc')); R.rect(36, 154, 50, 157, K); R.rect(37, 155, 49, 156, hex('#e0c060')); R.rect(44, 157, 45, 159, K); R.rect(47, 157, 48, 160, K); R.disco(36, 155, 3, K); R.disco(36, 155, 2, hex('#e0c060'));
    R.linea(24, 160, 14, 172, K); R.linea(25, 160, 15, 172, hex('#c0c4cc')); R.disco(14, 173, 3, K); R.disco(14, 173, 2, hex('#a8acb4'));
    // la carpeta del reglamento, abierta: sombra, tapas azules, hojas, canto de las hojas y anillas
    R.rect(66, 36, 270, 174, MAD[0]); R.rect(60, 30, 264, 168, K); R.rect(61, 31, 263, 167, hex('#2a3e74')); R.rect(61, 31, 263, 32, hex('#4a62a4'));
    R.rect(66, 34, 160, 162, PAP); R.rect(164, 34, 258, 162, PAP);
    R.rect(66, 163, 160, 165, PAPS); R.rect(164, 163, 258, 165, PAPS); R.rect(66, 162, 160, 162, hex('#e8e0c8')); R.rect(164, 162, 258, 162, hex('#e8e0c8'));
    R.rect(152, 34, 160, 162, hex('#ebe4cc')); R.rect(157, 34, 160, 162, PAPS); R.rect(164, 34, 167, 162, PAPS);
    for (let y = 40; y < 160; y += 10) { R.rect(156, y, 168, y + 3, K); R.rect(157, y + 1, 167, y + 2, hex('#c8ccd4')); R.pset(158, y + 1, hex('#ffffff')); }
    // renglones (sin letras): rayas grises
    for (const [x0, x1, y0, n] of [[74, 150, 146, 4], [174, 250, 144, 5]]) for (let i = 0; i < n; i++) { const y = y0 + i * 4, w = Math.round((x1 - x0) * (0.55 + hh(i, y0) * 0.45)); for (let x = x0; x < x0 + w; x += 1) if (hh(x, y) > 0.18) R.pset(x, y, RAYA); }
    // la hoja izquierda: el coche patrulla desde arriba, y el camino de puntos alrededor (la vuelta)
    R.rect(98, 70, 128, 118, K); R.rect(99, 71, 127, 117, hex('#f6f4ee'));
    R.rect(99, 71, 127, 80, hex('#22222c')); R.rect(99, 108, 127, 117, hex('#22222c')); R.rect(101, 81, 125, 85, hex('#6a9ac8')); R.rect(101, 102, 125, 106, hex('#6a9ac8'));
    R.rect(103, 92, 112, 95, hex('#e84a3a')); R.rect(114, 92, 123, 95, hex('#3a6ae8')); R.pset(106, 72, hex('#f8f0a0')); R.pset(120, 72, hex('#f8f0a0'));
    for (const [wx, wy] of [[95, 74], [128, 74], [95, 104], [128, 104]]) { R.rect(wx, wy, wx + 3, wy + 9, K); R.rect(wx + 1, wy + 1, wx + 2, wy + 8, hex('#4a4a54')); }
    for (let k = 0; k < 110; k++) { if (k % 4 > 1) continue; const an = -Math.PI / 2 + k / 110 * Math.PI * 2 * 0.95; R.pset(Math.round(113 + Math.cos(an) * 36), Math.round(94 + Math.sin(an) * 47), hex('#9a9aa8')); }
    { const an = -Math.PI / 2 + Math.PI * 2 * 0.95, x = Math.round(113 + Math.cos(an) * 36), y = Math.round(94 + Math.sin(an) * 47); R.poligono([[x - 1, y - 4], [x + 5, y], [x - 1, y + 4]], TINTA); }
    R.numero('1', 80, 52, { centro: true });
    // la hoja derecha: tres pasos numerados con su pictograma y su casilla
    COLS.forEach((cx, k) => {
      R.rect(cx - 12, 44, cx + 12, 114, hex('#e8e0c6')); R.rect(cx - 11, 45, cx + 11, 113, PAP);
      R.numero(String(k + 1), cx, 58, { centro: true });
      if (k === 0) { R.disco(cx, 86, 10, K); R.disco(cx, 86, 9, hex('#34343e')); for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * 8), Math.round(86 + Math.sin(an) * 8), hex('#5a5a66')); } R.disco(cx, 86, 4, hex('#b8bcc4')); R.disco(cx, 86, 1, hex('#6a6e78')); R.pset(cx - 2, 84, hex('#ffffff')); }
      if (k === 1) { R.poligono([[cx - 10, 86], [cx - 4, 79], [cx + 4, 79], [cx + 10, 86], [cx + 4, 93], [cx - 4, 93]], K); R.poligono([[cx - 8, 86], [cx - 3, 81], [cx + 3, 81], [cx + 8, 86], [cx + 3, 91], [cx - 3, 91]], hex('#ffffff')); R.disco(cx, 86, 4, hex('#3a7ac8')); R.disco(cx, 86, 2, K); R.pset(cx - 1, 84, hex('#ffffff')); }
      if (k === 2) { R.anillo(cx, 78, 5, K); R.anillo(cx, 78, 4, hex('#d8b040')); R.anillo(cx, 78, 3, K); R.rect(cx - 1, 82, cx + 1, 100, K); R.rect(cx, 83, cx, 99, hex('#e8c860')); R.rect(cx + 2, 92, cx + 5, 94, K); R.rect(cx + 2, 97, cx + 4, 99, K); }
      R.rect(cx - 7, 120, cx + 7, 134, K); R.rect(cx - 6, 121, cx + 6, 133, hex('#ffffff'));
    });
    R.usar(prev);
  }
  R.copiar(B4);
};
const T1 = b(0.795), T2 = b(0.856), T3 = b(0.937), LLAMA = c(-0.06);
const marca = (cx, u) => {   // la «✓» a lápiz, que se dibuja con u 0–1
  const P = [[cx - 4, 127], [cx - 1, 130], [cx + 5, 123]], n = Math.round(u * 12);
  for (let i = 0; i <= n; i++) { const v = i / 12, [x, y] = v < 0.33 ? [lerp(P[0][0], P[1][0], v / 0.33), lerp(P[0][1], P[1][1], v / 0.33)] : [lerp(P[1][0], P[2][0], (v - 0.33) / 0.67), lerp(P[1][1], P[2][1], (v - 0.33) / 0.67)]; R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#2a5ab0')); }
};
const p4 = (t) => {
  fondo4();
  // la vuelta: las huellas aparecen una tras otra alrededor del coche dibujado
  huellas.forEach(([x, y, an], k) => { if (t > P4 + 0.15 + k * 0.13) { const nx = Math.round(-Math.sin(an) * 2), ny = Math.round(Math.cos(an) * 2); R.rect(x + nx, y + ny, x + nx + 1, y + ny + 2, TINTA); R.rect(x - nx, y - ny, x - nx + 1, y - ny + 2, TINTA); } });
  // las casillas que se marcan
  const ticks = [T1, T2, T3];
  ticks.forEach((tk, k) => { const u = tramo(t, tk - 0.08, tk + 0.18); if (u > 0) marca(COLS[k], u); });
  // la mano con el lápiz: entra desde abajo a la derecha, marca y, cuando llama la radio, se va
  let wx, wy;
  const W = (k) => [COLS[k] + 13, 141];
  if (t < T1 - 0.1) { const u = suave(tramo(t, P4 + 0.05, T1 - 0.15)); wx = lerp(W(0)[0] + 30, W(0)[0], u); wy = lerp(210, W(0)[1], u); }
  else if (t < T2 - 0.1) { const u = suave(tramo(t, T1 + 0.2, T2 - 0.12)); wx = lerp(W(0)[0], W(1)[0], u); wy = W(0)[1] - Math.sin(u * Math.PI) * 4; }
  else if (t < T3 - 0.1) { const u = suave(tramo(t, T2 + 0.2, T3 - 0.12)); wx = lerp(W(1)[0], W(2)[0], u); wy = W(1)[1] - Math.sin(u * Math.PI) * 4; }
  else { const u = suave(tramo(t, LLAMA + 0.1, LLAMA + 0.7)); wx = lerp(W(2)[0], W(2)[0] + 40, u); wy = lerp(W(2)[1] + (t > T3 + 0.4 ? 3 : 0), 215, u); }
  for (let k = 0; k < 3; k++) { const u = tramo(t, ticks[k] - 0.08, ticks[k] + 0.18); if (u > 0 && u < 1) { const v = u, cx = COLS[k]; const dx = v < 0.33 ? lerp(-4, -1, v / 0.33) : lerp(-1, 5, (v - 0.33) / 0.67), dy = v < 0.33 ? lerp(1, 4, v / 0.33) : lerp(4, -3, (v - 0.33) / 0.67); wx = cx + 13 + dx; wy = 141 + dy - 3; } }
  wx = Math.round(wx); wy = Math.round(wy);
  if (wy < 205) {
    // el lápiz: de la mano a la punta (arriba a la izquierda)
    const tx = wx - 13, ty = wy - 12;
    R.linea(wx - 2, wy + 1, tx + 2, ty + 2, K); R.linea(wx - 1, wy + 1, tx + 3, ty + 2, K); R.linea(wx - 2, wy, tx + 2, ty + 1, hex('#f0c030')); R.linea(wx - 3, wy, tx + 1, ty + 1, hex('#d89a20'));
    R.pset(tx + 1, ty, hex('#e8c8a0')); R.pset(tx, ty, K); R.pset(tx + 2, ty + 1, hex('#e8c8a0'));
    T.brazo(R, wx + 24, wy + 40, wx, wy, '#2e3e6e', -1);
  }
  // la radio: el piloto verde; cuando llama, rojo que parpadea y ondas
  const x0 = 266, y0 = 66, llama = t > LLAMA;
  R.rect(x0 + 2, y0 + 2, x0 + 28, y0 + 54, MAD[0]); R.rect(x0, y0, x0 + 24, y0 + 50, K); R.rect(x0 + 1, y0 + 1, x0 + 23, y0 + 49, hex('#2e2e36')); R.rect(x0 + 1, y0 + 1, x0 + 2, y0 + 49, hex('#4a4a56'));
  R.rect(x0 + 18, y0 - 12, x0 + 21, y0, K); R.rect(x0 + 19, y0 - 11, x0 + 20, y0, hex('#3a3a44')); R.disco(x0 + 19, y0 - 13, 2, K);
  for (let i = 0; i < 6; i++) R.rect(x0 + 5, y0 + 22 + i * 3, x0 + 19, y0 + 22 + i * 3, hex('#18181e'));
  R.rect(x0 + 5, y0 + 6, x0 + 19, y0 + 15, hex('#1a2a1a')); R.rect(x0 + 6, y0 + 7, x0 + 18, y0 + 14, llama ? hex('#c8f0a0') : hex('#5a8a4a'));
  if (llama) for (let i = 0; i < 4; i++) R.rect(x0 + 7 + i * 3, y0 + 13 - ((Math.floor(t * 12) + i * 2) % 5), x0 + 8 + i * 3, y0 + 13, hex('#2a4a1a'));
  const led = llama ? (Math.floor(t * 8) % 2 ? hex('#ff4a3a') : hex('#6a1a1a')) : (Math.floor(t * 1.5) % 2 ? hex('#5ae86a') : hex('#1a4a24'));
  R.rect(x0 + 4, y0 + 42, x0 + 6, y0 + 44, led);
  if (llama) for (let k = 0; k < 3; k++) { const r = 4 + k * 4 + ((t * 10) % 4); for (let an = 2.3; an <= 4.0; an += 0.1) R.pset(Math.round(x0 + 19 + Math.cos(an) * r), Math.round(y0 - 13 + Math.sin(an) * r), hex('#fff0a0')); }
  // la taza de café con su vapor
  R.disco(294, 150, 14, MAD[0]); R.disco(292, 147, 13, K); R.disco(292, 147, 12, hex('#e8e8ec')); R.disco(292, 147, 9, hex('#5a3018')); R.disco(290, 145, 3, hex('#7a4a28')); R.anillo(307, 150, 4, K); R.anillo(307, 150, 3, hex('#e8e8ec'));
  for (let k = 0; k < 3; k++) for (let j = 0; j < 14; j++) { const y = 140 - j * 2 - ((t * 14 + k * 9) % 4), x = Math.round(292 + (k - 1) * 3 + Math.sin(t * 2 + j * 0.5 + k) * 2); if (y < 108) continue; if (hh(j, k, Math.floor(t * 6)) > 0.35) R.pset(x, Math.round(y), hex('#f0ece4')); }
  // una mosca que ronda el dónut
  const fx = Math.round(38 + Math.cos(t * 1.7) * 18 + Math.sin(t * 4.1) * 4), fy = Math.round(106 + Math.sin(t * 2.3) * 12);
  R.rect(fx, fy, fx + 1, fy + 1, K); if (Math.floor(t * 30) % 2) { R.pset(fx - 1, fy - 1, hex('#e0e8f0')); R.pset(fx + 2, fy - 1, hex('#e0e8f0')); }
};

// las palomas del aparcamiento: picotean y, con el reventón, salen volando
const paloma = (x, y, t, k, vuela) => {
  const G = hex('#8a8ea0'), GS = hex('#5e6274'), GL = hex('#c8ccd8');
  if (vuela > 0) {
    const X = Math.round(x + vuela * (150 + k * 20)), Y = Math.round(y - vuela * (70 + k * 14)), ala = Math.floor(t * 16 + k) % 2;
    if (X > 330) return;
    R.rect(X - 2, Y - 1, X + 2, Y + 1, K); R.rect(X - 1, Y, X + 1, Y, G); R.rect(X + 2, Y - 2, X + 3, Y - 1, GS);
    if (ala) { R.linea(X - 1, Y - 1, X - 4, Y - 5, K); R.linea(X, Y - 1, X - 2, Y - 5, GL); } else { R.linea(X - 1, Y + 1, X - 4, Y + 4, K); R.linea(X, Y + 1, X - 2, Y + 4, GL); }
    return;
  }
  const pica = Math.sin(t * 5 + k * 2) > 0.5 ? 1 : 0;
  R.rect(x - 3, y - 4, x + 2, y - 1, K); R.rect(x - 2, y - 3, x + 1, y - 2, G); R.rect(x - 2, y - 3, x - 1, y - 3, GL); R.pset(x - 3, y - 4, GS);
  R.rect(x + 2, y - 6 + pica * 2, x + 4, y - 4 + pica * 2, K); R.pset(x + 3, y - 5 + pica * 2, GS); R.pset(x + 5, y - 4 + pica * 2, hex('#e8a040'));
  R.pset(x - 1, y, hex('#e86a4a')); R.pset(x + 1, y, hex('#e86a4a'));
};
let PUERTA = [112, 174];
const p5 = (t) => {
  T.ciudad(R, t, { encuadre: 'calle', luz: 'dia', camara: 'coche' });
  const s = P5, abre1 = c(0.37), dentro = c(0.45), arranca = c(0.555), REV = c(0.752), FIN = c(0.915), sale = c(0.86);
  // el policía con cuidado, junto al portón: menea el dedo, se enfada, se sobresalta y, al final, «te lo dije»
  R.actor(EL.policia, 38, 170, t, { dir: 1, dedo: (t > c(0.24) && t < c(0.5) && Math.sin(t * 9) > -0.2) || t > FIN + 0.2, enfado: t > c(0.45) && t < REV, sorpresa: t > REV && t < REV + 0.7, sonrisa: t > FIN + 0.4 });
  // el otro: sale por la puerta de servicio (por detrás del coche), da la vuelta por la izquierda y sube sin mirar
  const tr = [[s - 0.3, 124, 152], [s + 0.6, 70, 152], [s + 1.0, 74, 174], [abre1, PUERTA[0], 174], [99, PUERTA[0], 174]];
  let px = 124, py = 152, anda = false, dir = -1;
  for (let i = 0; i < tr.length - 1; i++) { const [t0, x0, y0] = tr[i], [t1, x1, y1] = tr[i + 1]; if (t >= t0 && t < t1) { const u = (t - t0) / (t1 - t0); px = lerp(x0, x1, u); py = lerp(y0, y1, u); anda = x0 !== x1 || y0 !== y1; dir = x1 > x0 ? 1 : x1 < x0 ? -1 : 1; } }
  const fuera1 = t < dentro, fuera2 = t > sale;
  if (fuera1 && py < 165) R.actor(EL.policia2, Math.round(px), Math.round(py), t, { dir, anda, sonrisa: true });
  // el coche: arranca, avanza y revienta la rueda
  const avance = suave(tramo(t, arranca + 0.15, REV)), cx = Math.round(125 + avance * 30);
  const rueda = t < REV ? 0.12 * tramo(t, REV - 0.75, REV) : 0.12 + 0.88 * tramo(t, REV, REV + 1.7);
  const puerta = tramo(t, abre1, abre1 + 0.25) - tramo(t, dentro + 0.05, dentro + 0.3) + tramo(t, sale - 0.25, sale);
  const g = T.cochePatrulla(R, cx, 166, t, { dir: 1, anda: t > arranca && t < REV + 0.1 ? 1 : 0, rueda, puerta, conductor: t > dentro && t < sale ? EL.policia2 : undefined, conductorOpc: { dir: 1, sorpresa: t > REV } });
  if (g && g.puerta) PUERTA = [g.puerta[0] - 7, 174];
  if (fuera1 && py >= 165) R.actor(EL.policia2, Math.round(px), Math.round(py), t, { dir, anda, sonrisa: true });
  if (fuera2) { const u = tramo(t, sale, sale + 0.3); R.actor(EL.policia2, Math.round(PUERTA[0] - u * 10), 175, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > FIN - 0.1, manos: t > FIN - 0.1 && t < FIN + 1.0, triste: t > FIN + 1.0 }); }
  // las palomas
  [[196, 174], [206, 177], [222, 173]].forEach(([x, y], k) => paloma(x, y, t, k, tramo(t, REV + k * 0.05, REV + 1.1 + k * 0.1)));
  // «game over»: el cuadro de la muerte se abre encima y guiña
  const ab = tramo(t, FIN, FIN + 0.35);
  if (ab > 0) T.cuadroMuerte(R, 176, 44, t, { w: 84, abre: ab, guino: tramo(t, FIN + 0.8, FIN + 0.95) - tramo(t, FIN + 1.1, FIN + 1.25) });
};

const efectos = [[a(0.42), 'guau'], [a(0.55), 'golpecito'], [P2 + 0.3, 'chof'], [P2 + 0.55, 'bip'], [a(0.79), 'toc'],
  [P3 + 0.1, 'puerta'], [b(0.55), 'tic'], [b(0.62), 'tic'], [T1, 'lapiz'], [T3, 'lapiz'], [LLAMA, 'bip'],
  [c(0.37), 'puerta'], [c(0.555), 'arranque'], [c(0.752), 'boom'], [c(0.915), 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1987 });
''')


E['si-guardar'] = ('Guarda a menudo', '''// SI-GUARDAR (frases 33–35), 1987. Tres planos:
// 1. el monitor de cerca: se abre el cuadro de la muerte; en «joke» la calavera guiña, en «narrator» se pone las gafas de
//    broma y en «laughing» se ríe (la mandíbula bota, ondas de risa); al final la manita del cursor pulsa «otra vez»;
// 2. (corta tras «a little») la sala de las partidas, junto a la pila: el disquete corre de la caja a la pila con un
//    disquete cada vez y la pila crece; luego, a la derecha de la pila, piensa en un puente, una puerta y un monstruo
//    (bocadillos en «bridge», «door», «monster») y cada vez corre a guardar: destello, ✓, otro disquete en la pila y un
//    buzón que se enciende (gag 4);
// 3. (corta antes de «That's how») la sala entera: el disquete pequeño empuja el disquete gigante, el escudo con su reloj
//    de arena; en «born» el escudo brilla y en «Save your game often» el pequeño saluda militarmente y los buzones se
//    encienden en ola.''', r'''
const ch = (f) => en('chiste', f), pa = (f) => en('partidas', f), cs = (f) => en('consejo', f);
const P2 = ch(1.05), P3 = pa(1.03);
const K = hex('#16121c'), BL = hex('#f8f8f4');
const suave = (u) => u * u * (3 - 2 * u);

const p1 = (t) => {
  const rie = tramo(t, ch(0.71), ch(0.76)) - tramo(t, ch(0.98), ch(1.02));
  T.muerte(R, t, { encuadre: 'pantalla', camara: 'cerca', abre: Math.max(0.001, tramo(t, 0.05, 0.45)), guino: tramo(t, ch(0.29), ch(0.33)) - tramo(t, ch(0.4), ch(0.44)), gafas: tramo(t, ch(0.53), ch(0.62)), rie, risa: rie, cursor: tramo(t, P2 - 0.75, P2 - 0.2) });
  // ondas de risa a los dos lados de la calavera
  if (rie > 0.3) for (let k = 0; k < 3; k++) { const r = 30 + k * 5 + ((t * 12) % 5); for (const [s, a0, a1] of [[1, -0.7, 0.7], [-1, Math.PI - 0.7, Math.PI + 0.7]]) for (let an = a0; an <= a1; an += 0.06) { const x = Math.round(96 + Math.cos(an) * r), y = Math.round(80 + Math.sin(an) * r * 0.8); if (x > 58 && x < 220 && y > 40 && y < 128 && (s < 0 || x < 132)) R.pset(x, y, k === 2 ? hex('#e8a040') : hex('#f04a3a')); } }
};

// el bocadillo grande con un peligro dentro: 'puente' | 'puerta' | 'monstruo'
const bocadillo = (cx, cy, kind, u, t, ox, oy) => {
  if (u <= 0) return;
  const s = Math.min(1, u * 1.4) * (u < 0.7 ? 1 + Math.sin(u / 0.7 * Math.PI) * 0.12 : 1), rx = Math.round(22 * s), ry = Math.round(17 * s);
  for (const [i, r] of [[0.25, 2], [0.55, 3]]) { const x = Math.round(lerp(ox, cx - 6, i)), y = Math.round(lerp(oy, cy + ry, i)); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); }
  for (let y = -ry - 1; y <= ry + 1; y++) for (let x = -rx - 1; x <= rx + 1; x++) { const d = (x * x) / ((rx + 1) * (rx + 1)) + (y * y) / ((ry + 1) * (ry + 1)), w = 1 + 0.05 * Math.sin(Math.atan2(y, x) * 7); if (d <= w * w) R.pset(cx + x, cy + y, K); }
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const d = (x * x) / (rx * rx) + (y * y) / (ry * ry), w = 1 + 0.05 * Math.sin(Math.atan2(y, x) * 7); if (d <= w * w) R.pset(cx + x, cy + y, y > ry * 0.5 ? hex('#e4e8f0') : BL); }
  if (s < 0.9) return;
  if (kind === 'puente') {
    R.rect(cx - 15, cy + 4, cx + 15, cy + 9, hex('#4a8ad8')); for (let x = -14; x < 15; x += 4) R.pset(cx + x + Math.floor(t * 6) % 4, cy + 6, hex('#bfe0f8'));
    for (let x = -14; x <= 14; x++) { const y = Math.round(cy + 2 - Math.cos(x / 14 * Math.PI / 2) * 6); R.rect(cx + x, y, cx + x, y + 2, x % 3 === 0 ? K : hex('#a8743c')); R.pset(cx + x, y - 5, hex('#6a4424')); }
    for (const x of [-14, 0, 14]) R.rect(cx + x, cy - 9 + (x === 0 ? -1 : 4), cx + x, cy + 2 + (x === 0 ? -5 : 0), K);
  } else if (kind === 'puerta') {
    R.rect(cx - 10, cy - 12, cx + 10, cy + 11, hex('#8a8a96')); R.disco(cx, cy - 4, 8, K); R.rect(cx - 8, cy - 4, cx + 8, cy + 10, K); R.disco(cx, cy - 4, 7, hex('#8a5428')); R.rect(cx - 7, cy - 4, cx + 7, cy + 10, hex('#8a5428'));
    for (const x of [-4, 0, 4]) R.rect(cx + x, cy - 9, cx + x, cy + 10, hex('#6a3a1a')); R.rect(cx - 7, cy + 1, cx + 7, cy + 2, K); R.disco(cx + 4, cy + 5, 1, hex('#f0c840'));
    R.rect(cx + 2, cy - 1, cx + 7, cy + 4, K); R.rect(cx + 3, cy, cx + 6, cy + 3, hex('#e8c040')); R.rect(cx + 4, cy - 3, cx + 5, cy - 1, K);
  } else {
    const b = Math.round(Math.sin(t * 8) * 1); R.disco(cx, cy + 3 + b, 11, K); R.disco(cx, cy + 3 + b, 10, hex('#8a4ab8')); R.disco(cx - 3, cy + b, 5, hex('#aa6ad8'));
    R.poligono([[cx - 8, cy - 4 + b], [cx - 11, cy - 13 + b], [cx - 4, cy - 7 + b]], hex('#f0e8d0')); R.poligono([[cx + 8, cy - 4 + b], [cx + 11, cy - 13 + b], [cx + 4, cy - 7 + b]], hex('#f0e8d0'));
    for (const x of [-4, 4]) { R.disco(cx + x, cy + 1 + b, 3, BL); R.rect(cx + x, cy + 1 + b, cx + x + 1, cy + 2 + b, K); }
    R.rect(cx - 6, cy + 7 + b, cx + 6, cy + 9 + b, K); for (const x of [-4, 0, 4]) R.pset(cx + x, cy + 7 + b, BL);
  }
};
// un disquete pequeñito (el que se lleva a la pila)
const mini = (x, y) => { R.rect(x - 4, y - 4, x + 4, y + 4, K); R.rect(x - 3, y - 3, x + 3, y + 3, hex('#2a2e3a')); R.rect(x - 2, y - 3, x + 2, y - 2, hex('#e8e4d8')); R.pset(x - 2, y - 3, hex('#e84a3a')); R.disco(x, y + 1, 1, hex('#c0c4cc')); };

const D = [pa(0.08), pa(0.2), pa(0.31)], S = [pa(0.575), pa(0.772), pa(0.887)];
const p2 = (t) => {
  let n = 0; for (const d of D) if (t > d + 0.25) n++; for (const s of S) if (t > s + 0.15) n++;
  const luz = S.findIndex((s) => t > s && t < s + 0.7);
  const g = T.muerte(R, t, { encuadre: 'partidas', camara: 'pila', pila: 0.18 + n * 0.11, luz: luz >= 0 ? [2, 4, 7][luz] : undefined });
  // la caja de disquetes de la que coge
  R.rect(4, 148, 36, 171, K); R.rect(5, 149, 35, 170, hex('#c89a5a')); R.rect(5, 149, 35, 152, hex('#e0b878')); R.rect(5, 166, 35, 170, hex('#a87a3a'));
  for (let i = 0; i < 5; i++) { R.rect(8 + i * 5, 141 + (i % 2) * 2, 12 + i * 5, 149, K); R.rect(9 + i * 5, 142 + (i % 2) * 2, 11 + i * 5, 148, hex('#2a2e3a')); R.pset(10 + i * 5, 143 + (i % 2) * 2, hex('#e8e4d8')); }
  R.rect(14, 157, 26, 162, hex('#e8e4d8')); R.rect(15, 158, 25, 158, hex('#e84a3a'));
  const top = g && g.pila ? g.pila[2] : 120;
  // dónde está el disquete y qué hace
  let x = 44, dir = 1, corre = 0, lleva = false, guarda = 0, expr = 'normal', salto = 0;
  for (let k = 0; k < 3; k++) {
    const d = D[k], i0 = d - 0.5, i1 = d + 0.35;
    if (t >= i0 && t < d) { x = lerp(44, 110, (t - i0) / 0.5); corre = 1; lleva = true; }
    else if (t >= d && t < i1) { x = lerp(110, 44, (t - d) / 0.35); corre = 1; dir = -1; }
    else if (k < 2 && t >= i1 && t < D[k + 1] - 0.5) { x = 44; lleva = true; }
  }
  const pasa0 = D[2] + 0.35, pasa1 = S[0] - 0.9;
  if (t >= pasa0 && t < pasa1) { const u = tramo(t, pasa0 + 0.2, pasa1 - 0.1); x = lerp(44, 214, u); corre = u > 0 && u < 1 ? 0.6 : 0; dir = 1; expr = 'feliz'; }
  if (t >= pasa1) {
    x = 214; dir = 1;
    for (let k = 0; k < 3; k++) {
      const sk = S[k], va = sk - 0.85, ve = sk - 0.45;
      if (t >= va && t < ve) { x = lerp(214, 236, (t - va) / 0.4); corre = 0.3; }
      else if (t >= ve && t < sk) { x = lerp(236, 214, (t - ve) / 0.45); corre = 1; dir = -1; expr = 'susto'; }
      else if (t >= sk && t < sk + 0.45) { guarda = tramo(t, sk, sk + 0.45); salto = Math.round(Math.sin(guarda * Math.PI) * 6); dir = -1; expr = 'feliz'; }
    }
    if (t > S[2] + 0.45) { expr = 'feliz'; dir = -1; }
  }
  const dq = T.disquete(R, Math.round(x), 170, t, { s: 2, dir, corre, guarda, expresion: expr, salto });
  if (lleva && dq && dq.mano) mini(dq.mano[0], dq.mano[1] - 2);
  // el disquete que vuela a la pila
  for (const d of D) { const u = tramo(t, d, d + 0.25); if (u > 0 && u < 1) mini(Math.round(lerp(122, 160, u)), Math.round(lerp(150, top - 4, u) - Math.sin(u * Math.PI) * 16)); }
  for (const s of S) { const u = tramo(t, s + 0.05, s + 0.2); if (u > 0 && u < 1) mini(160, Math.round(lerp(40, top - 4, u))); }
  // los bocadillos de los tres peligros
  ['puente', 'puerta', 'monstruo'].forEach((kind, k) => { const sk = S[k], u = tramo(t, sk - 0.55, sk - 0.3) * (1 - tramo(t, sk + 0.15, sk + 0.3)); if (u > 0) bocadillo(262, 92, kind, u, t, Math.round(x) + 10, 136); });
};

const p3 = (t) => {
  const ola = t > cs(0.76) ? Math.floor((t - cs(0.76)) * 14) % 30 : -1;
  T.muerte(R, t, { encuadre: 'partidas', llenas: 24, luz: ola >= 0 && ola < 24 ? ola : undefined });
  // el pequeño empuja el escudo gigante hasta su sitio
  const e = suave(tramo(t, P3 - 0.1, P3 + 1.7)), gx = Math.round(lerp(4, 104, e));
  const brilla = tramo(t, cs(0.53), cs(0.66)) - tramo(t, cs(0.9), cs(1.0));
  T.disquete(R, gx, 164, t, { s: 4, cara: false, icono: 'reloj', guarda: brilla });
  if (e > 0.97 && t < P3 + 2.1) for (let k = 0; k < 5; k++) { const u = tramo(t, P3 + 1.7, P3 + 2.1); R.disco(Math.round(gx - 30 + k * 15), Math.round(163 - u * 4), Math.max(1, 3 - Math.round(u * 2)), hex('#e8dcc8')); }
  const empuja = t < P3 + 1.75, sx = empuja ? gx - 50 : Math.round(lerp(gx - 50, 168, suave(tramo(t, P3 + 2.0, P3 + 3.2))));
  const vuelta = !empuja && t < P3 + 3.2;
  T.disquete(R, sx, 164, t, { s: 2, dir: 1, corre: empuja ? 1 : vuelta ? 0.4 : 0, expresion: t > cs(0.55) ? 'feliz' : 'normal', saluda: t > cs(0.76) ? 'militar' : undefined });
  // una estrellita en el escudo cuando nace el consejo
  if (brilla > 0.2) for (let k = 0; k < 4; k++) { const an = t * 3 + k * Math.PI / 2, x = Math.round(gx + Math.cos(an) * 40), y = Math.round(126 + Math.sin(an) * 34); R.pset(x, y, hex('#fff0a0')); R.pset(x - 1, y, hex('#f0c840')); R.pset(x + 1, y, hex('#f0c840')); R.pset(x, y - 1, hex('#f0c840')); R.pset(x, y + 1, hex('#f0c840')); }
};

const efectos = [[0.1, 'pop'], [ch(0.3), 'tic'], [ch(0.55), 'boing'], [P2 - 0.25, 'golpecito'],
  [D[0] + 0.2, 'toc'], [D[2] + 0.2, 'toc'], [S[0], 'bip'], [S[1], 'bip'], [S[2], 'bip'],
  [P3 + 1.7, 'golpecito'], [cs(0.54), 'brillo'], [cs(0.76), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1987 });
''')


E['si-peor'] = ('Peor que morir', '''// SI-PEOR (frases 36–37), 1987 → 1989. Tres planos:
// 1. el bosque al principio del camino (tarde): Graham pasa silbando; en «Losing an item» se le cae la llave, que se
//    queda brillando en la hierba; un pajarito baja a mirarla; Graham sigue y se pierde detrás del árbol;
// 2. (corta en «and not noticing») al final del juego, la puerta con el candado: Graham llega, señala el candado (que
//    traquetea), busca en los bolsillos («?»), recuerda la llave en la hierba (bocadillo) y en «no going back» se lleva
//    las manos a la cabeza;
// 3. (corta en «The exact opposite») la pantalla partida: a la izquierda el cartel de la calavera tachada brilla en
//    «LucasArts» y al paseante le cae una piedra en la cabeza que rebota sin hacerle nada («never die»); a la derecha el
//    disquete corre al pedestal y guarda, y Graham le aplaude con el dedo.''', r'''
const pe = (f) => en('peor', f), lu = (f) => en('lucas', f);
const P2 = pe(0.482), P3 = lu(-0.01);
const K = hex('#16121c');
const suave = (u) => u * u * (3 - 2 * u);
const llave = (x, y, s = 1) => {   // la llave dorada, tumbada (x, y: el centro del ojo)
  const O = hex('#f0c030'), OS = hex('#b8861a'), OL = hex('#fff0a0');
  R.disco(x, y, 3 * s, K); R.disco(x, y, 2 * s, O); R.disco(x, y, Math.max(0, s - 1), K); if (s === 1) R.pset(x, y, K);
  R.rect(x + 3 * s, y - s, x + 11 * s, y + s - (s === 1 ? 0 : 0), K); R.rect(x + 3 * s, y - s + 1, x + 11 * s - 1, y + s - 1, O);
  R.rect(x + 7 * s, y + s, x + 8 * s, y + 3 * s, K); R.rect(x + 10 * s, y + s, x + 11 * s, y + 3 * s, K); R.pset(x - s, y - 2 * s, OL); R.pset(x + 5 * s, y - s + 1, OL);
  R.rect(x + 3 * s, y + s, x + 6 * s, y + s, OS);
};
const destello = (x, y, t, r = 3) => { const v = 0.5 + 0.5 * Math.sin(t * 7); const n = Math.round(1 + v * r); for (let i = -n; i <= n; i++) { R.pset(x + i, y, hex('#fffbe0')); R.pset(x, y + i, hex('#fffbe0')); } R.pset(x, y, hex('#ffffff')); };

const p1 = (t) => {
  const L = 'tarde';
  T.reino(R, t, { encuadre: 'bosque', luz: L });
  const gx = lerp(116, 244, tramo(t, 0.15, P2 + 0.2));
  const cae = pe(0.284), kx0 = 168, gc = Math.round(lerp(116, 244, tramo(cae, 0.15, P2 + 0.2))) + 6;
  // la llave: cae del cinto, bota y se queda en la hierba brillando
  if (t > cae) {
    const u = tramo(t, cae, cae + 0.35), bo = tramo(t, cae + 0.35, cae + 0.55);
    const x = Math.round(lerp(gc, kx0, u)) + Math.round(bo * 3), y = Math.round(lerp(142, 156, u * u) - Math.sin(bo * Math.PI) * 3);
    llave(x, y, 1);
    if (bo >= 1) { for (const [dx, h] of [[-3, 3], [2, 2], [6, 3], [10, 2]]) R.linea(x + dx, 158, x + dx + 1, 158 - h, hex('#3a8a3a')); destello(x + 8, y - 4, t, 3); }
  }
  R.actor(EL.graham, Math.round(gx), 154, t, { dir: 1, anda: true, sonrisa: true, habla: Math.sin(t * 6) > 0.3 });
  // las notitas de su silbido
  for (let k = 0; k < 3; k++) { const u = ((t * 0.9 + k / 3) % 1); const x = Math.round(gx + 14 + u * 10 + Math.sin(u * 9) * 2), y = Math.round(128 - u * 14); if (x < 230 && gx < 226) { R.rect(x, y, x + 1, y + 1, K); R.rect(x + 1, y - 4, x + 1, y, K); R.pset(x + 2, y - 4, K); } }
  // un pajarito baja a mirar la llave
  const pj = tramo(t, pe(0.42), pe(0.47)), px = Math.round(lerp(212, kx0 + 16, suave(pj))), py = Math.round(lerp(96, 155, pj) - Math.sin(pj * Math.PI) * 8);
  if (t > pe(0.4)) { const vu = pj < 1, ala = Math.floor(t * 14) % 2, mira = !vu && Math.sin(t * 4) > 0 ? 1 : 0;
    R.rect(px - 3, py - 4, px + 1, py - 1, K); R.rect(px - 2, py - 3, px, py - 2, hex('#c8642a')); R.rect(px - 4, py - 6 - mira, px - 2, py - 4 - mira, K); R.pset(px - 3, py - 5 - mira, hex('#8a4a20')); R.pset(px - 5, py - 5 - mira, hex('#e8b040')); R.pset(px + 2, py - 3, K);
    if (vu) { if (ala) R.linea(px - 1, py - 4, px + 2, py - 8, K); else R.linea(px - 1, py - 2, px + 2, py + 1, K); } else { R.pset(px - 2, py, K); R.pset(px, py, K); } }
  T.reinoDelante(R, t, { encuadre: 'bosque', luz: L });
};

const p2 = (t) => {
  T.cuento(R, t, { encuadre: 'alcoba', camara: 'puerta' });
  const llega = P2 + 1.0, senala = pe(0.6), duda = pe(0.66), recuerda = pe(0.7), manos = pe(0.855);
  const gx = lerp(-14, 140, suave(tramo(t, P2 + 0.05, llega)));
  // el candado traquetea cuando lo señala
  if (t > senala + 0.1 && t < senala + 0.6) { const v = Math.floor(t * 20) % 2; for (const [dx, dy] of [[-12, -6], [12, -6], [-13, 2], [13, 2]]) R.linea(196 + dx, 112 + dy + v, 196 + dx + Math.sign(dx) * 3, 112 + dy + v - 2, hex('#fff0a0')); }
  R.actor(EL.graham, Math.round(gx), 162, t, { dir: t > senala - 0.2 && t < duda ? 1 : 1, anda: t < llega, dedo: t > senala && t < senala + 0.6, sorpresa: t > manos, manos: t > manos && t < manos + 1.0, triste: t > manos + 1.0 || (t > duda && t < manos) });
  if (t > duda && t < recuerda + 0.1) R.bocadillo(Math.round(gx) + 8, 128, { icono: '?' });
  // el recuerdo: la llave olvidada en la hierba, en un bocadillo de nube
  const u = tramo(t, recuerda, recuerda + 0.3) * (1 - tramo(t, manos + 0.15, manos + 0.3));
  if (u > 0) {
    const cx = 80, cy = 70, rx = Math.round(42 * Math.min(1, u * 1.2)), ry = Math.round(28 * Math.min(1, u * 1.2));
    for (const [i, r] of [[0.2, 2], [0.45, 3], [0.7, 4]]) { const x = Math.round(lerp(gx + 6, cx + 26, i)), y = Math.round(lerp(132, cy + ry - 2, i)); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#f4f2fa')); }
    const forma = (x, y, e) => { const an = Math.atan2(y, x), w = 1 + 0.07 * Math.sin(an * 9 + t * 2); return (x * x) / ((rx + e) * (rx + e)) + (y * y) / ((ry + e) * (ry + e)) <= w * w; };
    for (let y = -ry - 3; y <= ry + 3; y++) for (let x = -rx - 3; x <= rx + 3; x++) {
      if (!forma(x, y, 2)) continue;
      if (!forma(x, y, 0)) { R.pset(cx + x, cy + y, forma(x, y, 1) ? hex('#f4f2fa') : K); continue; }
      // dentro: el cielo de la tarde, los troncos, el camino y la hierba
      const Y = y / ry;
      let col = Y < -0.1 ? (Y < -0.55 ? hex('#f0b080') : hex('#f4d0a0')) : Y < 0.25 ? hex('#5a8a4a') : Y < 0.5 ? hex('#c8a070') : hex('#4a9a3a');
      if (Y < 0.25 && ((x + 60) % 23 < 4)) col = hex('#6a4a2a');
      if (Y >= 0.5 && ((x * 7 + y * 3) % 5 === 0)) col = hex('#6aba4a');
      R.pset(cx + x, cy + y, col);
    }
    if (Math.min(1, u * 1.2) > 0.6) { llave(cx - 6, cy + 14, 2); destello(cx + 18, cy + 6, t, 4); for (const dx of [-14, -9, 6, 12]) R.linea(cx + dx, cy + 24, cx + dx + 1, cy + 18, hex('#2a7a2a')); }
  }
};

const p3 = (t) => {
  const ranura = tramo(t, lu(0.73), lu(0.8)) - tramo(t, lu(0.95), lu(1.05));
  T.muerte(R, t, { encuadre: 'dividido', brillo: ranura });
  // el cartel de la calavera tachada brilla en «LucasArts»
  const br = tramo(t, lu(0.17), lu(0.2)) - tramo(t, lu(0.32), lu(0.38));
  if (br > 0) for (let k = 0; k < 2; k++) { const r = 28 + k * 3 + Math.round(Math.sin(t * 12) * 1); for (let an = 0; an < Math.PI * 2; an += 0.04) { const x = Math.round(50 + Math.cos(an) * r), y = Math.round(100 + Math.sin(an) * r * 0.8); if (x < 156 && (Math.floor(an * 8) % 2 === 0)) R.pset(x, y, k ? hex('#f0c840') : hex('#fff4a0')); } }
  // el paseante: le cae una piedra en la cabeza y rebota; él, tan contento
  const cae0 = lu(0.42), toca = lu(0.52);
  const ax = Math.round(lerp(76, 112, tramo(t, P3 + 0.1, cae0)));
  R.actor(EL.chico, ax, 158, t, { dir: 1, anda: t > P3 + 0.1 && t < cae0, sorpresa: t > toca && t < toca + 0.3, sonrisa: t > toca + 0.3, dedo: t > toca + 0.4 && t < lu(0.9) });
  if (t > cae0 && t < toca + 0.9) {
    const u1 = tramo(t, cae0, toca), u2 = tramo(t, toca, toca + 0.9);
    const rx = u2 > 0 ? Math.round(ax + 7 - u2 * 30) : ax + 7, ry = u2 > 0 ? Math.round(130 - Math.sin(u2 * Math.PI) * 26 + u2 * u2 * 30) : Math.round(lerp(40, 130, u1 * u1));
    R.disco(rx, ry, 5, K); R.disco(rx, ry, 4, hex('#8a8494')); R.disco(rx - 1, ry - 1, 2, hex('#b0aabc'));
  }
  if (t > toca && t < toca + 1.0) for (let k = 0; k < 3; k++) { const an = t * 8 + k * 2.1, x = Math.round(ax + 7 + Math.cos(an) * 8), y = Math.round(126 + Math.sin(an) * 3); R.pset(x, y, hex('#f0c840')); R.pset(x - 1, y, hex('#fff0a0')); R.pset(x + 1, y, hex('#fff0a0')); R.pset(x, y - 1, hex('#fff0a0')); }
  // a la derecha: Graham mira el cuadro; el disquete corre al pedestal, sube y guarda
  const salta0 = lu(0.62), sube = lu(0.69), guarda0 = lu(0.73);
  R.actor(EL.graham, 238, 158, t, { dir: t < salta0 ? 1 : -1, dedo: t > guarda0 + 0.2 && t < lu(1), sonrisa: t > guarda0 });
  let dx = 300, dy = 158, corre = 0;
  if (t < salta0) { const u = tramo(t, lu(0.5), salta0); dx = lerp(330, 214, u); corre = u > 0 && u < 1 ? 1 : 0; }
  else if (t < sube) { const u = (t - salta0) / (sube - salta0); dx = lerp(214, 196, u); dy = lerp(158, 131, u) - Math.sin(u * Math.PI) * 10; }
  else { dx = 196; dy = 131; }
  T.disquete(R, Math.round(dx), Math.round(dy), t, { dir: -1, corre, guarda: tramo(t, guarda0, guarda0 + 0.5) - tramo(t, lu(0.98), lu(1.05)), expresion: t > guarda0 ? 'feliz' : 'normal', saluda: t > lu(0.86) ? 'mano' : undefined });
};

const año = (t) => t < P3 ? 1987 : 1989;
const efectos = [[pe(0.3), 'tic'], [pe(0.36), 'brillo'], [pe(0.62), 'cerrojo'], [pe(0.7), 'pop'], [pe(0.855), 'boing'],
  [lu(0.18), 'brillo'], [lu(0.52), 'boing'], [lu(0.73), 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
