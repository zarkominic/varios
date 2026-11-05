import re

# los instantes se escriben @escena:segundos (segundos desde el inicio de la escena, de linea.json) y aquí se pasan a
# en('marca', fracción), que es como van en el código
_IN = {'festivo': (0.9, 14.109), 'tregua': (1.5, 17.175), 'cierre': (0.5, 22.202)}


def _t(m):
    sc, s = m.group(1), float(m.group(2))
    a, b = _IN[sc]
    return "en('%s', %.4f)" % (sc, (s - a) / (b - a))


def W(code):
    return re.sub(r'@(festivo|tregua|cierre):([0-9.]+)', _t, code)


# ayudas comunes de las tres escenas
H = r'''
const K = hex('#1a1418'), PZ = T.PIEZAS_NV;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mz = (a, b, u) => { u = Math.max(0, Math.min(1, u)); const m = (s) => Math.round(((a >>> s) & 255) + (((b >>> s) & 255) - ((a >>> s) & 255)) * u); return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const di = (x, y, u) => u * 16 > BAY[(x & 3) + ((y & 3) << 2)];
// degradado vertical tramado (Bayer 4×4) entre varios colores
const degr = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, di(x, y, f) ? cols[i + 1] : cols[i]); } };
// un fondo fijo en su búfer (se pinta una vez); R.usar(prev), nunca R.usar() a secas
const CACHE = {};
const capa = (k, fn) => { if (!CACHE[k]) { const b = R.nuevo(), prev = R.usar(b); fn(); R.usar(prev); CACHE[k] = b; } return CACHE[k]; };
const fijo = (k, fn) => R.copiar(capa(k, fn));
const suave = (u) => u * u * (3 - 2 * u);
// la zona de Atom y la barra del año quedan tranquilas
const quieta = (x, y) => (x >= 272 && y <= 48) || (y <= 16 && x >= 14 && x <= 176);
// nieve que cae en un recuadro (uno de cada seis copos, más grande)
const copos = (t, n, x0, y0, x1, y1, c1, c2, k = 0) => {
  for (let i = 0; i < n; i++) {
    const v = 7 + hs(i, 1, k) * 12, w = x1 - x0 + 1, hh = y1 - y0 + 1;
    const x = x0 + Math.round(((hs(i, 2, k) * w + Math.sin(t * 1.3 + i) * 3 + t * 4) % w + w) % w), y = y0 + Math.round((hs(i, 3, k) * hh + t * v) % hh);
    if (quieta(x, y)) continue;
    R.pset(x, y, i % 6 ? c1 : c2); if (i % 6 === 0) { R.pset(x + 1, y, c1); R.pset(x, y + 1, c1); }
  }
};
// la nota musical (corchea) con su contorno, y la chispa de cuatro puntas
const NOTA = ['..##', '..#.', '..#.', '..#.', '###.', '###.'];
const nota = (x, y, c) => { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) NOTA.forEach((f, j) => { for (let i = 0; i < 4; i++) if (f[i] === '#') R.pset(x + i + dx, y + j + dy, K); }); NOTA.forEach((f, j) => { for (let i = 0; i < 4; i++) if (f[i] === '#') R.pset(x + i, y + j, c); }); };
const chispa = (x, y, c, r = 2) => { for (let k = 1; k <= r; k++) { R.pset(x + k, y, c); R.pset(x - k, y, c); R.pset(x, y + k, c); R.pset(x, y - k, c); } R.pset(x, y, hex('#ffffff')); };
// las notas que suben de quien canta (x, y: la boca), cada 0,5 s, desde t0
const canto = (t, t0, x, y, c, k = 0, t1 = 99) => { if (t < t0) return; for (let i = 0; i < 3; i++) { const u = ((t - t0) * 0.7 + i / 3 + k * 0.17) % 1, tn = t - u / 0.7; if (tn < t0 || tn > t1) continue; nota(Math.round(x + Math.sin(u * 6 + i + k) * 4 + u * 6), Math.round(y - u * 26), c); } };
// la vela encendida en la mano y su halo
const halo = (x, y, r, c, a = 0.35) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1 && di(x + i, y + j, (1 - d) * a)) R.pset(x + i, y + j, mz(R.pget(x + i, y + j), c, 0.45)); } };
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-festivo'] = ('Festivo', '''// NV-FESTIVO (frase 27), sin cartela; barra en 1870. Tres planos:
// 1. la casa del vecino del pastel en Boston, ahora en 1870 (la misma puerta del gancho): llegan cantando tres vecinos
//    con farol y librito; la vieja multa del «5», clavada en la puerta, salta del clavo en «didn't last» y cae girando
//    a la nieve; en «1870» se abre la puerta y el vecino sale con un pastel en alto; un niño pasa con su trineo y
//    señala el árbol de la ventana;  2. el escritorio de Washington, 1870 (fondo local): la ventana con la cúpula del
//    Capitolio nevada, la bandera, el reloj y el quinqué; una mano aparta la vieja multa puritana («Puritan colonies»),
//    firma el papel («made Christmas») y le planta el sello de lacre («federal holiday»); el 25 del calendario se rodea
//    de rojo («holiday»);  3. Boston Common al anochecer (fondo local): la gente patina en el estanque, el farolero
//    enciende la farola, un trineo pasa por delante; una niña le pone acebo al muñeco de nieve con sombrero puritano
//    («Christmas»), el gran abeto se enciende de abajo arriba en «can't» y la estrella estalla en «banned»: todos saltan.''', W(H + r'''
const P2 = @festivo:5.20, P3 = @festivo:10.51;
const last = @festivo:1.88, n1870 = @festivo:3.02, puritan = @festivo:6.78, made = @festivo:8.18, federal = @festivo:9.12, holiday = @festivo:9.46;
const history = @festivo:10.93, xmas = @festivo:12.69, cant = @festivo:13.03, banned = @festivo:13.61;
const ORO = hex('#ffd860'), CREMA = hex('#efe4c8');
// el farol de los cantores (en la mano) y el librito abierto
const farol = (x, y, t) => { R.linea(x, y, x, y + 2, K); R.rect(x - 3, y + 2, x + 3, y + 11, K); R.rect(x - 2, y + 4, x + 2, y + 9, Math.sin(t * 13) > -0.3 ? hex('#ffe890') : hex('#ffc860')); R.rect(x - 3, y + 3, x + 3, y + 3, hex('#3a3a44')); R.pset(x, y + 6, hex('#ffffff')); halo(x, y + 7, 9, hex('#ffd890'), 0.4); };
const librito = (x, y) => { R.rect(x - 5, y - 1, x + 5, y + 4, K); R.rect(x - 4, y, x - 1, y + 3, hex('#f4ecd8')); R.rect(x + 1, y, x + 4, y + 3, hex('#e8dcc0')); R.pset(x, y, K); for (const yy of [1, 2]) { R.linea(x - 3, y + yy, x - 2, y + yy, hex('#a89880')); R.linea(x + 2, y + yy, x + 3, y + yy, hex('#a89880')); } };
// el trineo de madera del niño, con la cuerda hasta la mano
const trineoMano = (x, suelo, mano) => {
  R.rect(x - 9, suelo - 6, x + 9, suelo - 3, K); R.rect(x - 8, suelo - 5, x + 8, suelo - 4, hex('#b8742e')); R.rect(x - 8, suelo - 5, x + 8, suelo - 5, hex('#d8944a'));
  R.linea(x - 10, suelo - 1, x + 10, suelo - 1, K); R.linea(x - 10, suelo - 1, x - 11, suelo - 3, K); R.linea(x + 10, suelo - 1, x + 11, suelo - 3, K); R.pset(x - 6, suelo - 2, K); R.pset(x + 6, suelo - 2, K);
  if (mano) R.linea(x - 10, suelo - 4, mano[0], mano[1] + 1, hex('#6a4a2a'));
};
const p1 = (t) => {
  T.siglo17(R, t, { encuadre: 'boston', camara: 'casa', ano: 1870 });
  // la puerta se abre en «1870» hacia dentro: el recibidor encendido (papel, alfombra, la mesita con su lámpara) y la
  // hoja de canto
  const ab = tramo(t, n1870 - 0.05, n1870 + 0.4);
  if (ab > 0) {
    const w = Math.round(30 * ab);
    for (let y = 72; y <= 149; y++) for (let x = 102; x <= 101 + w; x++) {
      let c = di(x, y, (y - 72) / 110) ? hex('#d8964a') : hex('#f2c070');
      if ((x - 102) % 7 === 3 && y < 128) c = mz(c, hex('#c87a3a'), 0.4);
      if (y >= 140) c = (x + y) % 4 ? hex('#a8322a') : hex('#c84a3a');
      R.pset(x, y, c);
    }
    R.recorte([102, 72, 101 + w, 149]);
    R.rect(118, 116, 128, 118, K); R.rect(119, 117, 127, 117, hex('#7a4a2a')); R.linea(120, 118, 120, 139, K); R.linea(126, 118, 126, 139, K);
    R.disco(123, 108, 4, K); R.disco(123, 108, 3, hex('#fff0b0')); R.linea(123, 112, 123, 116, K);
    R.recorte(null);
    R.rect(101 + w, 71, 104 + w, 150, K); R.rect(102 + w, 72, 103 + w, 149, hex('#6a3e22'));
    halo(116, 150, 22, hex('#ffd890'), 0.5);
  }
  // los tres cantores llegan por la izquierda y cantan desde «either»
  const ll = tramo(t, 0, 1.7), cx = (d) => Math.round(lerp(-40 + d, 50 + d, ll)), canta = t > 2.0;
  const da = R.actor(EL.dama1857, cx(0), 166, t, { dir: 1, anda: ll < 1, sostiene: true, habla: canta && Math.sin(t * 8) > 0, sonrisa: t > n1870 });
  const se = R.actor(EL.senor1857, cx(18), 166, t, { dir: 1, anda: ll < 1, sostiene: true, habla: canta && Math.sin(t * 8 + 1) > 0, sonrisa: t > n1870 });
  const ni = R.actor(EL.ninaVictoriana, cx(34), 168, t, { dir: 1, anda: ll < 1, habla: canta && Math.sin(t * 8 + 2) > 0, sonrisa: true, salto: t > n1870 + 0.6 && t < n1870 + 1.4 ? Math.round(Math.abs(Math.sin((t - n1870) * 9)) * 3) : 0 });
  farol(da.mano[0] + 1, da.mano[1] - 2, t); librito(se.mano[0] + 1, se.mano[1]);
  canto(t, 2.05, cx(18) + 9, 128, ORO, 0); canto(t, 2.3, cx(34) + 9, 132, hex('#ffffff'), 2);
  // la vieja multa del «5» clavada en la puerta: salta del clavo en «didn't last» y cae girando a la nieve
  const cae = tramo(t, last, last + 0.95);
  if (cae === 0) { PZ.multa(R, 116, 104, { s: 2 }); R.pset(116, 80, hex('#c8ccd8')); }
  else if (cae < 1) { const x = Math.round(116 + Math.sin(cae * 7) * 9 + cae * 30), y = Math.round(104 + cae * cae * 60); PZ.multa(R, x, y, { s: Math.floor(cae * 9) % 3 === 2 ? 1 : 2, dir: Math.floor(cae * 9) % 2 ? 1 : -1 }); }
  else { R.rect(136, 161, 158, 165, K); R.rect(137, 162, 157, 164, hex('#e8dcbc')); R.rect(144, 162, 148, 163, hex('#3a2a2a')); R.rect(153, 163, 155, 164, hex('#c03030')); for (let x = 137; x <= 157; x += 3) R.pset(x, 162, hex('#ffffff')); }
  if (t > last && t < last + 0.18) { chispa(116, 80, hex('#fff0a0'), 3); }
  // el vecino del pastel sale en «1870» con el pastel en alto
  if (ab > 0.6) {
    const sal = tramo(t, n1870 + 0.3, n1870 + 0.8), arr = t > n1870 + 0.9;
    const v = R.actor(EL.vecinoPastel, 108, Math.round(lerp(150, 158, sal)), t, { dir: -1, anda: sal > 0 && sal < 1, sonrisa: true, sostiene: arr ? [100, 124] : true, salto: t > n1870 + 1.1 && t < n1870 + 1.7 ? Math.round(Math.abs(Math.sin((t - n1870) * 10)) * 2) : 0 });
    PZ.pastel(R, v.mano[0], v.mano[1] + 1, {});
    if (arr) for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(v.mano[0] - 3 + k * 3 + Math.round(Math.sin(u * 7 + k)), v.mano[1] - 7 - Math.round(u * 10), hex('#e8eef4')); }
  }
  // el niño del trineo entra por la derecha, se para ante la ventana y señala el árbol
  const nn = tramo(t, n1870 + 0.2, n1870 + 1.7), nx = Math.round(lerp(336, 194, nn));
  const nino = R.actor(EL.ninoVictoriano, nx, 170, t, { dir: -1, anda: nn > 0 && nn < 1, sostiene: nn < 1 ? [nx + 15, 158] : undefined, dedo: nn >= 1, sorpresa: nn >= 1 && t < n1870 + 2.0, sonrisa: t > n1870 + 2.0 });
  trineoMano(nx + 26, 172, nn < 1 ? nino.mano : [nx + 14, 160]);
  T.siglo17Delante(R, t, { encuadre: 'boston', camara: 'casa', ano: 1870 });
};

// 2 · el escritorio de Washington, 1870 (fondo local)
const fondoDespacho = () => {
  const { rect, pset, disco, linea } = R;
  // el papel pintado verde de damasco, más liso en la barra del año y en la esquina de Atom
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) {
    let c = (x % 14) < 7 ? hex('#3a5444') : hex('#40604c');
    const lis = quieta(x, y + 2);
    if (!lis) { const gx = ((x + 7) % 14) - 7, gy = ((y + (Math.floor(x / 14) % 2) * 9) % 18) - 9; if (Math.abs(gx) + Math.abs(gy) * 0.7 < 4 && Math.abs(gx) + Math.abs(gy) * 0.7 > 2.4) c = hex('#56785e'); if (gx === 0 && gy === 0) c = hex('#a89a5a'); }
    else c = hex('#34503f');
    pset(x, y, c);
  }
  rect(0, 0, 319, 4, hex('#2a1810')); rect(0, 5, 319, 6, hex('#6a4428')); rect(0, 7, 319, 7, hex('#1a100a'));
  // el zócalo de cuarterones
  rect(0, 84, 319, 104, hex('#3a2014')); rect(0, 84, 319, 85, hex('#7a4a2a'));
  for (let x = 4; x < 320; x += 40) { rect(x, 89, x + 34, 101, hex('#2a160e')); rect(x + 1, 90, x + 33, 100, hex('#4a2a1a')); rect(x + 1, 90, x + 33, 90, hex('#6a3c22')); for (let y = 92; y < 100; y += 3) pset(x + 6 + (y * 7) % 20, y, hex('#3a2014')); }
  // la ventana: el Capitolio nevado al anochecer (el cielo y la cúpula; la nieve se pinta encima, recortada)
  rect(16, 14, 100, 88, hex('#2a1810'));
  degr(20, 18, 96, 84, [hex('#2a3460'), hex('#4a4a7a'), hex('#8a6a8a'), hex('#d89a7a')]);
  for (const [x, y] of [[30, 24], [44, 21], [80, 26], [90, 22], [66, 20]]) pset(x, y, hex('#e8e8ff'));
  // la cúpula: tambor con columnas, la cúpula con nervios, la linterna y la estatua; las alas a los lados
  rect(26, 66, 90, 80, hex('#c8c4d0')); for (let x = 28; x < 90; x += 4) linea(x, 68, x, 78, hex('#9a96a8')); rect(26, 66, 90, 66, hex('#e8e8f0'));
  rect(45, 54, 71, 66, hex('#d8d4e0')); for (let x = 47; x < 71; x += 3) linea(x, 56, x, 65, hex('#a8a4b8'));
  for (let j = 0; j <= 14; j++) { const w = Math.round(Math.sqrt(1 - (j / 14) ** 2) * 13); linea(58 - w, 54 - j, 58 + w, 54 - j, j % 3 === 0 ? hex('#b8b4c8') : hex('#eceaf4')); }
  rect(56, 34, 60, 40, hex('#e0dce8')); pset(58, 32, hex('#e0dce8')); pset(58, 31, hex('#a8a4b8'));
  for (let x = 20; x <= 96; x++) { const y = 80 + Math.round(Math.sin(x * 0.3) * 1); rect(x, y, x, 84, hex('#eef4fa')); }
  for (const tx of [30, 86]) { linea(tx, 80, tx, 66, hex('#3a3040')); linea(tx, 70, tx - 4, 64, hex('#3a3040')); linea(tx, 72, tx + 4, 66, hex('#3a3040')); }
  for (let k = 0; k < 6; k++) { pset(32 + k * 11, 74, hex('#ffe890')); }
  // los marcos y parteluces
  rect(57, 18, 59, 84, hex('#5a3a22')); rect(20, 50, 96, 52, hex('#5a3a22')); rect(16, 84, 100, 88, hex('#7a4a2a')); rect(16, 88, 100, 89, hex('#2a1810'));
  // las cortinas de terciopelo con sus pliegues, la galería y los alzapaños de oro
  for (const [x0, x1] of [[8, 24], [92, 108]]) for (let y = 10; y < 96; y++) for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 1.3 + (y > 60 ? (y - 60) * 0.08 * (x0 < 50 ? 1 : -1) : 0)); pset(x, y, f > 0.5 ? hex('#c03038') : f > -0.3 ? hex('#9a2028') : hex('#6a1018')); }
  rect(4, 8, 112, 14, hex('#6a1018')); for (let x = 6; x < 112; x += 6) { disco(x + 3, 15, 2, hex('#9a2028')); pset(x + 3, 17, hex('#d8a840')); } rect(4, 8, 112, 8, hex('#d8a840'));
  for (const x of [16, 100]) { rect(x - 4, 60, x + 4, 62, hex('#d8a840')); pset(x, 63, hex('#a87820')); pset(x, 64, hex('#d8a840')); }
  // el aplique de gas (el brazo; la llama va viva) y el reloj de pared (la caja; las agujas y el péndulo, vivos)
  linea(124, 50, 124, 40, hex('#a87820')); rect(120, 50, 128, 52, hex('#a87820')); disco(124, 36, 5, K); disco(124, 36, 4, hex('#f4eedc'));
  rect(146, 22, 170, 64, K); rect(147, 23, 169, 63, hex('#5a2e18')); rect(147, 23, 169, 23, hex('#8a4a28')); disco(158, 34, 9, K); disco(158, 34, 8, hex('#f0e8d0'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(158 + Math.round(Math.cos(a) * 6), 34 + Math.round(Math.sin(a) * 6), K); }
  rect(151, 46, 165, 61, K); rect(152, 47, 164, 60, hex('#2a1810'));
  // la bandera de 37 estrellas en su asta, recogida
  linea(196, 20, 196, 104, hex('#c8a040')); linea(197, 20, 197, 104, hex('#7a5a20')); disco(196, 18, 2, hex('#e8c050'));
  for (let y = 24; y < 78; y++) { const w = Math.round(22 - (y - 24) * 0.18), sw = Math.round(Math.sin(y * 0.22) * 2); for (let x = 199; x < 199 + w; x++) { const fold = Math.sin((x - 199) * 0.9 + y * 0.05); let c = (Math.floor((y - 24) / 3) % 2) ? hex('#f0ece4') : hex('#c02a34'); if (x < 210 && y < 40) c = (x + y) % 3 === 0 ? hex('#f0ece4') : hex('#24305e'); pset(x + sw, y, fold < -0.5 ? mz(c, K, 0.35) : c); } pset(198 + sw, y, K); pset(199 + w + sw, y, K); }
  // la librería (libros de lomos de colores con sus bandas), por debajo de la esquina de Atom
  rect(226, 52, 318, 104, K); rect(228, 54, 316, 103, hex('#3a2014'));
  [[56, 76], [79, 101]].forEach(([y0, y1], f) => { let x = 230; let i = 0; while (x < 312) { const w = 3 + Math.floor(hs(i, f, 5) * 4), hgt = y1 - y0 - Math.floor(hs(i, f, 6) * 6); const c = [hex('#8a2a2a'), hex('#2a4a6a'), hex('#5a6a2a'), hex('#7a5a2a'), hex('#3a2a4a')][Math.floor(hs(i, f, 7) * 5)]; rect(x, y1 - hgt, x + w - 1, y1, c); rect(x, y1 - hgt, x, y1, mz(c, K, 0.4)); pset(x + 1, y1 - hgt + 3, hex('#d8b850')); pset(x + 1, y1 - 4, hex('#d8b850')); x += w + (hs(i, f, 8) < 0.12 ? 3 : 0); i++; } rect(228, y1 + 1, 316, y1 + 2, hex('#6a3c22')); });
  // el escritorio de caoba con su veta
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.35 + x * 0.01) * 2.2 + y * 0.02); pset(x, y, v > 0.82 ? hex('#8a4426') : v < -0.7 ? hex('#4a2010') : hex('#6a321c')); }
  rect(0, 104, 319, 106, hex('#9a5430')); rect(0, 107, 319, 107, hex('#3a180c'));
  // la carpeta de cuero verde con su filete de oro y las esquinas de cuero
  rect(40, 114, 256, 179, K); rect(41, 115, 255, 179, hex('#2e5a3a'));
  for (let x = 44; x <= 252; x += 2) { pset(x, 118, hex('#b8943a')); } for (let y = 118; y <= 179; y += 2) { pset(44, y, hex('#b8943a')); pset(252, y, hex('#b8943a')); }
  for (let y = 115; y < 180; y++) for (let x = 41; x < 256; x++) if (hs(x, y, 9) < 0.06) pset(x, y, hex('#28503a'));
  for (const [cx, sx] of [[41, 1], [255, -1]]) for (let j = 0; j < 14; j++) for (let i = 0; i <= 14 - j; i++) pset(cx + sx * i, 115 + j, i === 14 - j ? K : hex('#5a2e18'));
  // el quinqué de pantalla verde a la izquierda
  rect(24, 120, 36, 128, K); rect(25, 121, 35, 127, hex('#c8a040')); rect(28, 104, 32, 120, hex('#c8a040')); linea(28, 104, 28, 120, hex('#f0d070'));
  for (let j = 0; j < 12; j++) linea(22 - Math.round(j * 0.3), 92 + j, 38 + Math.round(j * 0.3), 92 + j, j < 2 ? hex('#5aa870') : hex('#2a7a4a')); linea(19, 104, 41, 104, K);
  // el tintero de cristal con la tapa de latón y la bandeja de las plumas
  rect(214, 118, 250, 124, K); rect(215, 119, 249, 123, hex('#a87820')); rect(215, 119, 249, 119, hex('#e8c050'));
  rect(220, 108, 232, 119, K); rect(221, 109, 231, 118, hex('#1a1a2a')); rect(221, 109, 222, 118, hex('#5a6a8a')); rect(222, 106, 230, 108, hex('#c8a040'));
  // el montón de libros y las gafas
  [[262, 150, '#7a2a2a'], [264, 141, '#2a3a5a'], [261, 132, '#4a5a2a']].forEach(([x, y, c]) => { rect(x, y - 8, x + 40, y, K); rect(x + 1, y - 7, x + 39, y - 1, hex(c)); rect(x + 1, y - 7, x + 39, y - 7, mz(hex(c), hex('#ffffff'), 0.3)); rect(x + 36, y - 6, x + 38, y - 2, hex('#e8dcc0')); pset(x + 8, y - 4, hex('#d8b850')); pset(x + 26, y - 4, hex('#d8b850')); });
  for (const cx of [270, 280]) { disco(cx, 168, 4, K); disco(cx, 168, 3, hex('#4a6a5a')); pset(cx - 1, 167, hex('#c8e0d8')); } linea(274, 167, 276, 167, K); linea(266, 168, 260, 172, K);
  // el papel (sin letras: renglones grises), el sello de oro arriba y la raya de la firma
  rect(124, 120, 206, 174, hex('#3a2a1a')); rect(122, 118, 204, 172, K); rect(123, 119, 203, 171, CREMA);
  for (let y = 119; y <= 171; y++) for (let x = 123; x <= 203; x++) if (hs(x, y, 11) < 0.05) pset(x, y, hex('#e0d4b4'));
  disco(163, 128, 5, hex('#c8a040')); disco(163, 128, 3, CREMA); pset(163, 128, hex('#c8a040'));
  for (let r = 0; r < 6; r++) { const y = 138 + r * 4, w = [70, 66, 72, 60, 68, 40][r]; for (let x = 130; x < 130 + w; x++) if ((x * 7 + r * 3) % 11 > 1) pset(x, y, hex('#8a8070')); }
  linea(156, 164, 198, 164, hex('#5a5040'));
  // el calendario de mesa con el 25
  PZ.calendario(R, 78, 152, { s: 2, dia: 25 });
};
const p2 = (t) => {
  fijo('despacho', fondoDespacho);
  // la nieve tras la ventana (recortada a su hueco) y la llama del gas que tiembla
  R.recorte([20, 18, 96, 83]); copos(t, 40, 20, 18, 96, 83, hex('#f4f8ff'), hex('#ffffff'), 3); R.recorte(null);
  const fl = Math.sin(t * 17) > 0.2 ? 1 : 0; R.disco(124, 35 - fl, 2, hex('#ffe890')); R.pset(124, 33 - fl, hex('#ffffff')); halo(124, 36, 18, hex('#fff0b0'), 0.3);
  halo(30, 110, 26, hex('#ffe8a0'), 0.35);
  // las agujas del reloj y el péndulo que va y viene
  const am = t * 0.6; R.linea(158, 34, 158 + Math.round(Math.cos(am - 1.57) * 6), 34 + Math.round(Math.sin(am - 1.57) * 6), K); R.linea(158, 34, 162, 32, K);
  const pa = Math.sin(t * 3.2) * 0.35; R.linea(158, 47, 158 + Math.round(Math.sin(pa) * 9), 47 + Math.round(Math.cos(pa) * 9), hex('#c8a040')); R.disco(158 + Math.round(Math.sin(pa) * 10), 47 + Math.round(Math.cos(pa) * 10), 2, hex('#e8c050'));
  // la taza de té que humea
  R.disco(300, 168, 7, K); R.disco(300, 168, 6, hex('#f0ece4')); R.disco(300, 167, 4, hex('#9a5a2a')); R.pset(298, 165, hex('#c88a4a'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; R.pset(300 + Math.round(Math.sin(u * 8 + k) * 2), 160 - Math.round(u * 18), mz(hex('#e8e8f0'), hex('#6a321c'), u)); }
  // la vieja multa puritana, encima del papel: la mano la aparta en «Puritan colonies»
  const ap = suave(tramo(t, puritan - 0.15, puritan + 0.5)), mx = Math.round(lerp(178, 116, ap)), my = Math.round(lerp(160, 182, ap));
  PZ.multa(R, mx, my, { s: 2 });
  // la firma que se escribe en «made Christmas» y el sello de lacre en «federal»
  const fi = tramo(t, made, made + 0.75);
  if (fi > 0) { let px = null; for (let k = 0; k <= fi * 40; k++) { const u = k / 40, x = Math.round(158 + u * 38), y = Math.round(160 + Math.sin(u * 22) * 3 - u * 2); if (px) R.linea(px[0], px[1], x, y, hex('#1a1a3a')); px = [x, y]; } }
  const se = t > federal + 0.18;
  if (se) { const s = t < federal + 0.3 ? 1 : 0; R.disco(190, 166, 6 + s, K); R.disco(190, 166, 5 + s, hex('#b02028')); R.disco(189, 165, 3, hex('#d8404a')); R.icono('estrella', 187, 163, hex('#f0c040'), hex('#701018')); R.linea(185, 172, 182, 178, hex('#c8a040')); R.linea(194, 172, 197, 178, hex('#c8a040')); }
  // el 25 del calendario se rodea de rojo en «holiday»
  const ro = tramo(t, holiday, holiday + 0.4);
  if (ro > 0) { for (let k = 0; k <= ro * 48; k++) { const a = k / 48 * Math.PI * 2 - 1.2, x = Math.round(78 + Math.cos(a) * 15), y = Math.round(138 + Math.sin(a) * 11); R.rect(x, y, x + 1, y + 1, hex('#d02030')); } if (ro >= 1 && t < holiday + 0.9) for (const [dx, dy] of [[-18, -14], [18, -12], [16, 14]]) chispa(78 + dx, 138 + dy, hex('#fff0a0'), 2); }
  // la mano: entra con la pluma, la moja, aparta la multa, firma; luego coge el sello y lo planta
  const KEY = [[P2, 236, 196], [P2 + 0.6, 226, 120], [puritan - 0.35, 226, 112], [puritan - 0.15, 196, 160], [puritan + 0.5, 136, 176], [made - 0.35, 172, 166], [made, 172, 166], [made + 0.75, 210, 164], [federal - 0.1, 214, 176], [federal + 0.05, 202, 166], [federal + 0.18, 202, 172], [federal + 0.5, 210, 158], [P3, 250, 196]];
  let wx = KEY[0][1], wy = KEY[0][2];
  for (let i = 1; i < KEY.length; i++) if (t >= KEY[i - 1][0]) { const u = suave(tramo(t, KEY[i - 1][0], KEY[i][0])); wx = lerp(KEY[i - 1][1], KEY[i][1], u); wy = lerp(KEY[i - 1][2], KEY[i][2], u); }
  if (fi > 0 && fi < 1) { wx = 158 + fi * 38 + 13; wy = 160 + Math.sin(fi * 22) * 3 - fi * 2 - 6; }
  wx = Math.round(wx); wy = Math.round(wy);
  const sello = t > federal - 0.1;
  // la pluma, que se queda en la carpeta cuando la mano va a por el sello
  const pluma = (x, y) => { R.linea(x, y, x + 14, y - 16, K); R.linea(x + 1, y, x + 15, y - 16, hex('#f4f0e8')); for (let k = 3; k < 16; k += 2) { R.pset(x + k + 1, y - k - 2, hex('#f4f0e8')); R.pset(x + k + 2, y - k - 1, hex('#d8d0c0')); } R.pset(x, y + 1, K); };
  if (sello) pluma(222, 176); else pluma(wx - 13, wy + 6);
  if (!sello && t > P2 + 0.6 && t < puritan - 0.3) { /* la punta mojada */ R.pset(wx - 13, wy + 7, hex('#1a1a3a')); }
  if (sello && t < federal + 0.5) { R.rect(wx - 8, wy + 2, wx - 2, wy + 6, K); R.rect(wx - 7, wy + 3, wx - 3, wy + 5, hex('#b88a3a')); }
  if (!sello && t < federal - 0.1) { R.rect(212, 172, 220, 178, K); R.rect(213, 173, 219, 177, hex('#b88a3a')); R.rect(215, 170, 217, 172, hex('#6a3a1a')); }
  T.brazo(R, wx + 40, 214, wx, wy, '#24243a', -1, { codo: [wx + 30, wy + 26] });
};

// 3 · Boston Common al anochecer, 1870 (fondo local)
const fondoCommon = () => {
  const { rect, pset, disco, linea } = R;
  degr(0, 0, 319, 92, [hex('#26285a'), hex('#4a3a72'), hex('#8a5a82'), hex('#d8846a'), hex('#f0b478')]);
  for (const [x, y] of [[40, 22], [120, 30], [190, 18], [236, 34], [96, 18], [210, 40]]) pset(x, y, hex('#f0f0ff'));
  // Beacon Hill: casas de ladrillo con ventanas encendidas, chimeneas; la State House con su cúpula de oro
  for (let i = 0; i < 12; i++) {
    const x0 = i * 28 - 6, top = 64 + Math.floor(hs(i, 1, 21) * 12), c = [hex('#7a3a32'), hex('#8a4a3a'), hex('#6a3430')][i % 3];
    if (x0 > 168 && x0 < 262) continue;
    rect(x0, top, x0 + 27, 104, K); rect(x0 + 1, top + 1, x0 + 26, 104, c);
    for (let y = top + 3; y < 104; y += 3) for (let x = x0 + 1; x < x0 + 27; x += 6) pset(x + ((y / 3) % 2) * 3, y, mz(c, K, 0.25));
    rect(x0 + 4, top - 7, x0 + 8, top, K); rect(x0 + 5, top - 6, x0 + 7, top, hex('#5a2a22'));
    for (let f = 0; f < 3; f++) for (let k = 0; k < 3; k++) { const wx = x0 + 3 + k * 8, wy = top + 6 + f * 11; if (wy > 98) continue; const on = hs(i, f * 3 + k, 22) > 0.35; rect(wx, wy, wx + 4, wy + 6, K); rect(wx + 1, wy + 1, wx + 3, wy + 5, on ? hex('#ffd878') : hex('#3a3050')); if (on) pset(wx + 1, wy + 1, hex('#fff4c0')); }
  }
  // la State House: cuerpo de ladrillo con columnata blanca y la cúpula dorada (por debajo de la esquina de Atom)
  rect(178, 72, 258, 104, K); rect(179, 73, 257, 104, hex('#9a4a3a')); rect(190, 82, 246, 104, hex('#e8e0d0')); for (let x = 192; x < 246; x += 5) { linea(x, 84, x, 103, hex('#b8b0a0')); } rect(188, 80, 248, 82, hex('#f4f0e8'));
  for (let k = 0; k < 2; k++) for (let x = 182; x < 256; x += 9) { if (x > 188 && x < 246) continue; rect(x, 78 + k * 12, x + 3, 83 + k * 12, hex('#ffd878')); }
  rect(204, 64, 232, 72, K); rect(205, 65, 231, 72, hex('#e8e0d0'));
  for (let j = 0; j <= 13; j++) { const w = Math.round(Math.sqrt(1 - (j / 13) ** 2) * 15); linea(218 - w, 64 - j, 218 + w, 64 - j, j % 4 === 1 ? hex('#fff0a0') : (j % 4 === 3 ? hex('#c8962a') : hex('#e8b840'))); }
  rect(216, 46, 220, 51, hex('#e8e0d0')); disco(218, 45, 2, hex('#e8b840'));
  // la loma nevada y la verja de hierro
  for (let x = 0; x < 320; x++) { const y = 104 + Math.round(Math.sin(x * 0.03) * 2); rect(x, y, x, 180, hex('#dfe8f2')); }
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const u = hs(x, y, 23); if (u < 0.05) pset(x, y, hex('#c8d4e4')); else if (u > 0.985) pset(x, y, hex('#ffffff')); }
  for (let x = 0; x < 320; x += 4) { linea(x, 104, x, 112, hex('#2a2a3a')); pset(x, 103, hex('#2a2a3a')); } linea(0, 106, 319, 106, hex('#2a2a3a')); linea(0, 110, 319, 110, hex('#2a2a3a'));
  // el estanque helado con sus brillos y las rayas de los patines
  for (let y = 126; y <= 152; y++) for (let x = 170; x <= 316; x++) { const d = ((x - 243) / 72) ** 2 + ((y - 139) / 13) ** 2; if (d <= 1) pset(x, y, d > 0.86 ? hex('#8aa8c8') : di(x, y, (y - 126) / 40) ? hex('#a8c8e4') : hex('#c8e0f4')); }
  for (let k = 0; k < 9; k++) { const x = 190 + k * 13, y = 132 + (k * 5) % 14; linea(x, y, x + 9, y + 1, hex('#e8f4ff')); }
  // los olmos pelados con nieve en las ramas
  for (const [tx, s] of [[18, 1], [150, 0.8], [306, 1]]) {
    const b = 150, top = Math.round(60 + (1 - s) * 30);
    for (let y = top + 10; y <= b; y++) { const w = y > b - 8 ? 3 : 2; rect(tx - w + 1, y, tx + w - 1, y, hex('#3a2a2a')); }
    for (let k = 0; k < 7; k++) { const by = top + 12 + k * 7, dx = (k % 2 ? 1 : -1) * (10 + k * 2) * s; linea(tx, by + 6, Math.round(tx + dx), by - 4, hex('#3a2a2a')); linea(Math.round(tx + dx * 0.6), by, Math.round(tx + dx * 0.8), by - 8, hex('#3a2a2a')); pset(Math.round(tx + dx), by - 5, hex('#f4f8ff')); pset(Math.round(tx + dx * 0.5), by, hex('#f4f8ff')); }
  }
  // el muñeco de nieve con su sombrero puritano (negro, de copa, con hebilla) y botones de carbón
  disco(52, 160, 11, hex('#b8c8dc')); disco(51, 159, 10, hex('#f4f8ff')); disco(52, 142, 8, hex('#b8c8dc')); disco(51, 141, 7, hex('#f4f8ff'));
  for (const y of [154, 160]) disco(52, y, 1, K); pset(49, 139, K); pset(54, 139, K); for (const x of [49, 51, 53, 55]) pset(x, 144 + (x === 49 || x === 55 ? 0 : 1), K); rect(52, 141, 56, 142, hex('#e8782a'));
  rect(43, 133, 61, 134, K); rect(46, 122, 58, 133, K); rect(47, 123, 57, 132, hex('#2a2a32')); rect(47, 130, 57, 131, hex('#4a3a2a')); rect(51, 129, 53, 132, hex('#c8a040'));
  linea(40, 148, 30, 140, hex('#5a3a2a')); linea(63, 148, 72, 138, hex('#5a3a2a'));
  // el gran abeto del parque (las luces, apagadas: se encienden en vivo)
  for (let j = 0; j < 104; j++) { const y = 46 + j, w = Math.round(((j % 26) + 6) * (0.5 + j / 104) * 0.9); for (let x = 112 - w; x <= 112 + w; x++) { const sh = x > 112 + w * 0.3; pset(x, y, x === 112 - w || x === 112 + w ? hex('#0e2a1a') : sh ? hex('#1a4a2a') : (hs(x, y, 24) < 0.2 ? hex('#3a7a4a') : hex('#2a6238'))); } if (j % 26 === 25 || j % 26 === 0) for (let x = 112 - w; x <= 112 + w; x += 2) pset(x, y, hex('#f4f8ff')); }
  rect(108, 150, 116, 158, hex('#4a2a1a')); rect(104, 156, 120, 160, hex('#8a3a2a'));
  // la farola de gas (el farol, apagado hasta que llega el farolero)
  linea(272, 112, 272, 166, K); linea(273, 112, 273, 166, hex('#3a3a4a')); rect(268, 104, 277, 112, K); rect(269, 105, 276, 111, hex('#4a4a5a')); rect(267, 103, 278, 103, K); rect(266, 166, 279, 168, K);
};
const LUCES = Array.from({ length: 34 }, (_, i) => { const j = 6 + Math.floor(hs(i, 1, 30) * 96), w = Math.round((((j) % 26) + 6) * (0.5 + j / 104) * 0.9); return [Math.round(112 - w + 2 + hs(i, 2, 30) * (2 * w - 4)), 46 + j, ['#ff5a4a', '#ffd860', '#6ad0ff', '#7aff8a', '#ff8ad8'][i % 5]]; });
const p3 = (t) => {
  fijo('common', fondoCommon);
  // nubes de tres tonos a tres velocidades y los cuervos que cruzan
  for (const [x0, y, w, v, c] of [[30, 40, 40, 1.6, '#8a5a7a'], [180, 26, 52, 1.0, '#6a4a72'], [110, 56, 30, 2.4, '#c8786a']]) { const x = ((x0 + t * v) % 380) - 40; for (let k = 0; k < 4; k++) R.disco(Math.round(x + k * w / 4), y + (k % 2), Math.round(w / 5), hex(c)); R.rect(Math.round(x - 4), y + 3, Math.round(x + w), y + 5, hex(c)); for (let k = 0; k < 3; k++) R.disco(Math.round(x + k * w / 4 + 3), y - 2, Math.round(w / 8), mz(hex(c), hex('#ffe0c0'), 0.35)); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 14 + k * 40) % 200) + 40), y = 36 + k * 6 + Math.round(Math.sin(t * 3 + k) * 2), a = Math.sin(t * 10 + k) > 0; if (!quieta(x, y)) { R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); R.pset(x - 2, y - (a ? 2 : 0), K); R.pset(x + 2, y - (a ? 2 : 0), K); } }
  // el humo de las chimeneas
  for (const cx of [12, 68, 124, 292]) for (let k = 0; k < 3; k++) { const u = (t * 0.4 + k / 3 + cx * 0.01) % 1; R.disco(cx + Math.round(u * 8), 58 - Math.round(u * 20), 1 + Math.round(u * 2), mz(hex('#a898b0'), hex('#5a4a72'), u)); }
  // el farolero llega, sube la pértiga y la farola se enciende en «history»
  const fa = tramo(t, P3, history - 0.3), fx = Math.round(lerp(320, 256, fa)), luz = t > history;
  const fr = R.actor(EL.vecino, fx, 168, t, { dir: -1, anda: fa > 0 && fa < 1, sostiene: true, sonrisa: luz });
  R.linea(fr.mano[0], fr.mano[1], fr.mano[0] + 8, fr.mano[1] - 46, hex('#6a4a2a')); R.pset(fr.mano[0] + 8, fr.mano[1] - 47, luz ? hex('#ffe890') : hex('#a85a2a'));
  if (luz) { R.rect(269, 105, 276, 111, hex('#ffe890')); R.pset(272, 107, hex('#ffffff')); halo(272, 110, 24, hex('#ffe0a0'), 0.4); }
  // los patinadores en el estanque, que se deslizan de lado a lado
  for (const [d, k, y] of [[EL.dama1857, 0, 140], [EL.senor1857, 1.6, 146], [EL.ninaVictoriana, 3.1, 136]]) { const u = Math.sin(t * 0.9 + k), x = Math.round(235 + u * 48); R.actor(d, x, y, t, { dir: Math.cos(t * 0.9 + k) > 0 ? 1 : -1, sonrisa: true, brazos: t > banned && t < banned + 1.2 }); }
  // la niña pone acebo en el sombrero del muñeco en «Christmas»; la gente alrededor del abeto
  const ac = tramo(t, xmas - 0.9, xmas - 0.1);
  const nina = R.actor(EL.ninaVictoriana, Math.round(lerp(4, 58, ac)), 172, t, { dir: -1, anda: ac > 0 && ac < 1, sostiene: t < xmas ? [55, 128] : undefined, sonrisa: t > xmas, salto: t > banned ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0, brazos: t > banned });
  if (t < xmas && ac > 0) PZ.acebo(R, nina.mano[0], nina.mano[1] + 2, {});
  if (t >= xmas) PZ.acebo(R, 54, 125, {});
  const GENTE = [[EL.vecina, 76, 170, 1], [EL.ninoVictoriano, 92, 174, 1], [EL.obreroEscoces, 132, 172, -1], [EL.vecinoPastel, 150, 168, -1]];
  GENTE.forEach(([d, x, s, dir], i) => { const vi = t > banned + i * 0.08; R.actor(d, x, s, t, { dir, sonrisa: t > cant, sorpresa: t > cant && t < banned, habla: t < cant && Math.sin(t * 5 + i * 2) > 0.3, brazos: vi && t < banned + 1.6, salto: vi && t < banned + 1.6 ? Math.round(Math.abs(Math.sin((t - banned) * 9 + i)) * 4) : 0 }); });
  // las luces del abeto se encienden de abajo arriba en «can't»; la estrella estalla en «banned»
  const en_ = tramo(t, cant, cant + 0.5);
  for (const [x, y, c] of LUCES) { const on = (150 - y) / 104 < en_; const tw = Math.sin(t * 6 + x * 0.7 + y) > -0.6; R.pset(x, y, on ? (tw ? hex(c) : hex('#ffffff')) : hex('#3a4a3a')); if (on) R.pset(x, y + 1, mz(hex(c), K, 0.4)); }
  const es = t > banned, sb = es ? Math.min(1, (t - banned) * 4) : 0;
  R.icono('estrella', 109, 37, es ? hex('#ffe060') : hex('#8a7a4a'), K);
  if (es) { halo(112, 40, 16, hex('#fff0a0'), 0.5); for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 0.6, r = 9 + sb * 6; R.pset(112 + Math.round(Math.cos(a) * r), 40 + Math.round(Math.sin(a) * r), hex('#fff4c0')); } }
  // el trineo de caballos pasa por delante, cascabeles incluidos
  const tr = tramo(t, P3 + 0.2, P3 + 3.0);
  if (tr > 0 && tr < 1) T.e_trineo(R, Math.round(lerp(-30, 380, tr)), 182, t, { dir: 1, color: '#a8282a' });
  copos(t, 50, 0, 0, 319, 179, hex('#f4f8ff'), hex('#ffffff'), 7);
};
const efectos = [[last, 'toc'], [last + 0.1, 'papel'], [n1870, 'puerta'], [n1870 + 1.0, 'campana'],
  [P2 + 0.75, 'burbujas'], [puritan, 'papel'], [made, 'lapiz'], [federal + 0.18, 'sello'], [holiday + 0.1, 'brillo'],
  [P3 + 0.3, 'carro'], [history, 'interruptor'], [cant, 'brillo'], [banned, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1870 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-tregua'] = ('Tregua', '''// NV-TREGUA (frase 28), cartela 1914; barra en 1914. Tres planos (sin armas ni heridos):
// 1. la trinchera británica por dentro, Nochebuena (fondo local): sacos terreros, tablas, el brasero y el farol; un
//    soldado enciende una a una las velas del arbolito, otro toca la armónica; en «soldiers from both sides» llega un
//    canto del otro lado y asoma un farol por encima del parapeto: se miran, sonríen y uno sube la escalera («climbed»);
// 2. la tierra de nadie al atardecer: los nuestros salen por detrás del parapeto y los de enfrente de su trinchera,
//    caminan hasta el centro y se dan la mano en «shook hands»; en «sang carols» el alemán alza una vela y cantan;
// 3. el centro de la tierra de nadie a ras de nieve: patadas al balón entre los dos bandos («kicked a ball»); llega
//    un oficial, se para con un «?» en «Nobody had ordered it»… y en «They just did it» el balón le llega y lo chuta.''', W(H + r'''
const P1 = 1.3, P2 = @tregua:6.63, P3 = @tregua:12.69;
const war = @tregua:3.96, soldiers = @tregua:5.15, both = @tregua:5.96, shook = @tregua:9.72, sang = @tregua:10.79;
const kicked = @tregua:13.08, nobody = @tregua:14.81, ordered = @tregua:15.29, just = @tregua:16.28, did = @tregua:16.58;
const ORO = hex('#ffd860');
// 1 · la trinchera por dentro (fondo local)
const fondoTrinchera = () => {
  const { rect, pset, disco, linea } = R;
  degr(0, 0, 319, 60, [hex('#0c1028'), hex('#141c40'), hex('#202a56'), hex('#34386a')]);
  for (let i = 0; i < 60; i++) { const x = Math.floor(hs(i, 1, 40) * 320), y = Math.floor(hs(i, 2, 40) * 52); if (!quieta(x, y)) pset(x, y, hs(i, 3, 40) > 0.7 ? hex('#ffffff') : hex('#8a90c0')); }
  disco(234, 24, 9, hex('#e8e4d0')); disco(231, 22, 7, hex('#fff8e8')); pset(237, 27, hex('#c8c4b0')); pset(229, 20, hex('#d8d4c0'));
  // el parapeto de sacos terreros: hileras al tresbolillo con su atadura, nieve encima
  for (let f = 0; f < 10; f++) { const y = 54 + f * 8; for (let x0 = -((f % 2) * 9); x0 < 320; x0 += 18) {
    if (f >= 7 && x0 > 30 && x0 < 280) continue;
    rect(x0, y, x0 + 17, y + 7, K); const c = hs(x0, f, 41) > 0.5 ? hex('#8a7a5a') : hex('#7a6a4c'); rect(x0 + 1, y + 1, x0 + 16, y + 6, c); rect(x0 + 1, y + 1, x0 + 16, y + 1, mz(c, hex('#ffffff'), 0.25)); rect(x0 + 1, y + 6, x0 + 16, y + 6, mz(c, K, 0.35));
    pset(x0 + 3, y + 3, mz(c, K, 0.3)); pset(x0 + 12, y + 4, mz(c, K, 0.3)); pset(x0 + 15, y + 3, hex('#5a4a34')); pset(x0 + 16, y + 2, hex('#5a4a34'));
    if (f === 0) for (let x = x0; x < x0 + 18; x++) { const hgt = 2 + Math.round(hs(x, 0, 42) * 2); rect(x, y - hgt + 1, x, y + 1, hex('#eef4fa')); }
  } }
  // el revestimiento de tablas con sus postes (en medio) y el escalón de tiro
  for (let x = 30; x < 282; x += 3) { const c = Math.floor(x / 3) % 2 ? hex('#6a4a2a') : hex('#5a3c22'); rect(x, 110, x + 2, 132, c); if (hs(x, 1, 43) < 0.3) pset(x + 1, 112 + Math.floor(hs(x, 2, 43) * 18), hex('#3a2414')); }
  for (const x of [30, 100, 170, 240, 280]) { rect(x - 2, 104, x + 2, 140, K); rect(x - 1, 104, x + 1, 140, hex('#7a5530')); pset(x - 1, 104, hex('#a8784a')); }
  rect(0, 132, 319, 140, K); rect(0, 133, 319, 135, hex('#8a6a40')); rect(0, 136, 319, 139, hex('#5a3c22'));
  // el suelo de tablillas sobre el barro, con charcos helados y nieve en los rincones
  rect(0, 140, 319, 179, hex('#4a3626'));
  for (let y = 144; y < 180; y += 6) { rect(0, y, 319, y + 3, hex('#7a5a3a')); rect(0, y, 319, y, hex('#9a7a4a')); for (let x = 0; x < 320; x += 30) rect(x + (y % 12 ? 10 : 0), y, x + (y % 12 ? 10 : 0), y + 3, hex('#3a2818')); }
  for (const [cx, cy, w] of [[60, 176, 18], [250, 170, 22]]) for (let j = -3; j <= 3; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / 3) ** 2 < 1) pset(cx + i, cy + j, j < 0 ? hex('#a8c0d8') : hex('#88a0bc'));
  for (let x = 0; x < 320; x++) { if (hs(x, 9, 44) < 0.5) pset(x, 140, hex('#e8f0f8')); if (hs(x, 10, 44) < 0.25) pset(x, 141, hex('#c8d8e8')); }
  // la escalera de mano apoyada en el parapeto
  for (const x of [200, 214]) { linea(x, 60, x + 4, 166, K); linea(x + 1, 60, x + 5, 166, hex('#9a6a3a')); }
  for (let y = 70; y < 164; y += 12) { const dx = Math.round((y - 60) * 4 / 106); rect(200 + dx, y, 218 + dx, y + 1, hex('#7a5530')); rect(200 + dx, y + 2, 218 + dx, y + 2, K); }
  // el estante con la lata, la taza y la carta; la caja (sin letras) donde se sienta el de la armónica
  rect(120, 118, 160, 120, hex('#9a7a4a')); rect(120, 121, 160, 121, K); rect(124, 111, 130, 117, hex('#8a8a96')); rect(124, 111, 130, 111, hex('#c8c8d4')); rect(136, 113, 141, 117, hex('#e8e0d0')); pset(142, 115, hex('#e8e0d0')); rect(148, 114, 156, 117, hex('#f0e8d4')); linea(149, 115, 155, 115, hex('#c8382a'));
  rect(40, 156, 62, 168, K); rect(41, 157, 61, 167, hex('#8a6a3a')); rect(41, 157, 61, 158, hex('#a88a5a')); linea(41, 162, 61, 162, hex('#6a4a2a'));
  // el brasero (cubo agujereado sobre patas)
  rect(18, 140, 34, 156, K); rect(19, 141, 33, 155, hex('#3a3a42')); for (let y = 144; y < 154; y += 4) for (let x = 21; x < 32; x += 4) rect(x, y, x + 1, y + 1, hex('#e86a2a'));
  linea(19, 156, 16, 166, K); linea(33, 156, 36, 166, K);
  // el gancho del farol en el poste
  linea(240, 100, 248, 100, K); linea(248, 100, 248, 104, K);
};
const VELAS = [[150, 132], [142, 140], [158, 141], [150, 124]];
const arbolito = (t, enc) => {
  // el abeto pequeño en su cubo, con las velas que se van encendiendo
  for (let j = 0; j < 38; j++) { const y = 120 + j, w = Math.round(((j % 13) + 3) * 0.55 + j * 0.18); for (let x = 150 - w; x <= 150 + w; x++) R.pset(x, y, x === 150 - w || x === 150 + w ? hex('#0e2a1a') : (x > 150 + w * 0.3 ? hex('#1a4a2a') : (hs(x, y, 45) < 0.2 ? hex('#3a7a4a') : hex('#2a6238')))); if (j % 13 === 12) for (let x = 150 - w; x <= 150 + w; x += 2) R.pset(x, y, hex('#f4f8ff')); }
  R.rect(142, 158, 158, 166, K); R.rect(143, 159, 157, 165, hex('#7a7a86')); R.rect(143, 159, 157, 159, hex('#a8a8b4'));
  VELAS.forEach(([x, y], i) => { const on = enc > i; PZ.vela(R, x, y, { t: on ? t + i : 0, color: i % 2 ? 'roja' : undefined }); if (!on) { R.rect(x - 1, y - 9, x + 1, y - 6, hex('#2a6238')); R.pset(x, y - 6, K); } else halo(x, y - 8, 10, hex('#ffd890'), 0.45); });
};
const p1 = (t) => {
  fijo('trinchera', fondoTrinchera);
  // las nubes que pasan delante de la luna (tres tonos) y la nieve
  for (const [x0, y, w, v, c] of [[180, 20, 40, 2.2, '#2a3058'], [40, 36, 54, 1.2, '#3a4070'], [250, 44, 30, 3.0, '#4a4a7a']]) { const x = ((x0 + t * v) % 380) - 40; for (let k = 0; k < 4; k++) { const cx = Math.round(x + k * w / 4), cy = y + (k % 2); if (!quieta(cx, cy)) R.disco(cx, cy, Math.round(w / 6), hex(c)); } }
  // el brasero: brasas que laten, humo, y su luz en las tablas
  const br = Math.sin(t * 9) > 0; R.rect(20, 138, 32, 141, br ? hex('#ff8a3a') : hex('#e85a2a')); for (let k = 0; k < 4; k++) R.pset(21 + k * 3, 137 - (Math.floor(t * 8 + k) % 3), hex('#ffd060'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1; R.disco(26 + Math.round(Math.sin(u * 5 + k) * 4 + u * 8), 132 - Math.round(u * 50), 1 + Math.round(u * 3), mz(hex('#8a8a96'), hex('#2a3058'), u)); }
  halo(26, 140, 30, hex('#ff9a4a'), 0.3);
  // el farol que cuelga y se mece
  const fx = 248 + Math.round(Math.sin(t * 1.6) * 1); R.rect(fx - 4, 105, fx + 4, 116, K); R.rect(fx - 3, 107, fx + 3, 114, hex('#ffe08a')); R.rect(fx - 4, 106, fx + 4, 106, hex('#4a4a52')); halo(fx, 111, 20, hex('#ffe0a0'), 0.35);
  // las velas del arbolito: el soldado las enciende una a una con la cerilla
  const enc = t < 1.6 ? 0 : t < 2.3 ? 1 : t < 2.9 ? 2 : t < 3.6 ? 3 : 4;
  arbolito(t, enc);
  const sig = VELAS[Math.min(3, enc)], llega = tramo(t, P1, 1.6);
  const a = R.actor(EL.soldadoBritanico, Math.round(lerp(96, 112, llega)), 168, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: enc < 4 ? [sig[0] - 3, sig[1] - 7] : undefined, sorpresa: t > soldiers + 0.15 && t < both, sonrisa: t > both || (enc > 0 && enc < 4), dedo: t > both && t < both + 0.5 });
  if (enc < 4) { R.linea(a.mano[0], a.mano[1], a.mano[0] + 3, a.mano[1] - 2, hex('#e8d8b0')); if (Math.sin(t * 20) > -0.5) R.pset(a.mano[0] + 3, a.mano[1] - 3, hex('#ffb040')); }
  // el de la armónica, sentado en la caja: toca hasta que oye el canto de enfrente y mira arriba
  const toca = t < soldiers + 0.1;
  const b = R.actor(EL.soldadoBritanico, 44, 160, t, { dir: 1, sostiene: toca ? [57, 140] : undefined, sorpresa: !toca && t < both + 0.3, sonrisa: t > both + 0.3, habla: !toca && t > both + 0.3 && Math.sin(t * 8) > 0 });
  if (toca) { PZ.armonica(R, b.mano[0] + 2, b.mano[1] + 1, {}); canto(t, P1, 60, 132, hex('#c8e0ff'), 1, soldiers); }
  // el del estante, con su taza que humea, junto a la escalera
  const c = R.actor(EL.soldadoBritanico, 176, 170, t, { dir: -1, sostiene: true, sorpresa: t > soldiers + 0.2 && t < both + 0.2, sonrisa: t > both + 0.2 });
  R.rect(c.mano[0] - 2, c.mano[1] - 3, c.mano[0] + 2, c.mano[1] + 1, K); R.rect(c.mano[0] - 1, c.mano[1] - 2, c.mano[0] + 1, c.mano[1], hex('#e8e0d0'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(c.mano[0] + Math.round(Math.sin(u * 7 + k) * 2), c.mano[1] - 5 - Math.round(u * 12), mz(hex('#e8e8f0'), hex('#4a3626'), u)); }
  // «soldiers from both sides»: llega el canto de enfrente (notas doradas por encima del parapeto) y asoma su farol
  if (t > soldiers) { canto(t, soldiers, 96, 60, ORO, 3); canto(t, soldiers + 0.25, 268, 58, ORO, 5); }
  const fs = tramo(t, soldiers + 0.1, soldiers + 0.7); if (fs > 0) { const y = Math.round(lerp(58, 34, fs)); R.recorte([0, 0, 319, 55 + (y < 50 ? 0 : 0)]); R.linea(276, y + 10, 276, 56, hex('#4a3a2a')); R.recorte(null); R.rect(272, y, 280, y + 9, K); R.rect(273, y + 2, 279, y + 8, hex('#ffe08a')); halo(276, y + 5, 14, hex('#ffe0a0'), 0.5); }
  // «climbed»: el primero sube la escalera
  const su = tramo(t, both + 0.35, P2 + 0.3);
  if (t > both) { const sx = Math.round(lerp(196, 206, su)); R.actor(EL.soldadoBritanico, sx, Math.round(lerp(170, 132, su)), t, { dir: 1, anda: su > 0 && su < 1, sonrisa: true }); }
  copos(t, 40, 0, 0, 319, 179, hex('#e8eef8'), hex('#ffffff'), 2);
};
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'tregua', luz: 'tarde' });
  const sal = (t0) => tramo(t, t0, t0 + 0.7);
  // los de enfrente salen de su trinchera (y≈104) y bajan al centro
  const FR = [[EL.soldadoAleman, 250, P2 + 0.2, 168, 150], [EL.soldadoAleman, 280, P2 + 0.6, 222, 146]];
  const fr = FR.map(([d, x0, t0, x1, s1], i) => { const sa = sal(t0), ca = tramo(t, t0 + 0.8, shook - 0.25 + i * 0.4); return { d, x: Math.round(lerp(x0, x1, suave(ca))), s: Math.round(lerp(lerp(116, 104, sa), s1, ca)), anda: (sa > 0 && sa < 1) || (ca > 0 && ca < 1), vis: t > t0 }; });
  // los nuestros salen por detrás del parapeto (abajo) y suben hacia el centro
  const NU = [[EL.soldadoBritanico, 90, P2, 150, 150], [EL.soldadoBritanico, 40, P2 + 0.5, 204, 146]];
  const nu = NU.map(([d, x0, t0, x1, s1], i) => { const sa = sal(t0), ca = tramo(t, t0 + 0.8, shook - 0.25 + i * 0.4); return { d, x: Math.round(lerp(x0, x1 - 18, suave(ca))), s: Math.round(lerp(lerp(196, 172, sa), s1, ca)), anda: (sa > 0 && sa < 1) || (ca > 0 && ca < 1), vis: true }; });
  const mano = t > shook && t < sang + 0.2, apr = mano ? Math.round(Math.sin((t - shook) * 14) * 1.5) : 0;
  // el par del centro: apretón de manos en «shook hands»; luego el alemán alza la vela y cantan
  const pA = nu[0], pB = fr[0], canta = t > sang;
  const qa = R.actor(pA.d, pA.x, pA.s, t, { dir: 1, anda: pA.anda, sostiene: mano ? [pA.x + 17, pA.s - 12 + apr] : undefined, sonrisa: t > shook - 0.3, habla: canta && Math.sin(t * 8) > 0 });
  const qb = R.actor(pB.d, pB.x, pB.s, t, { dir: -1, anda: pB.anda, sostiene: mano ? [pA.x + 17, pA.s - 12 + apr] : canta ? [pB.x + 3, pB.s - 22] : undefined, sonrisa: t > shook - 0.3, habla: canta && Math.sin(t * 8 + 1) > 0 });
  if (canta) { PZ.vela(R, qb.mano[0], qb.mano[1] + 2, { t }); halo(qb.mano[0], qb.mano[1] - 6, 16, hex('#ffd890'), 0.5); canto(t, sang, pA.x + 6, pA.s - 30, ORO, 0); canto(t, sang + 0.2, pB.x + 4, pB.s - 30, hex('#ffffff'), 1); }
  if (t > shook && t < shook + 0.25) chispa(pA.x + 18, pA.s - 18, hex('#fff0a0'), 3);
  // el segundo par: se cambian una lata de galletas y luego cantan también
  const da = t > shook + 0.6 && t < sang + 0.6, pC = nu[1], pD = fr[1];
  const qc = R.actor(pC.d, pC.x, pC.s, t, { dir: 1, anda: pC.anda, sostiene: da ? [pC.x + 18, pC.s - 12] : true, sonrisa: t > shook, habla: canta && Math.sin(t * 8 + 2) > 0 });
  R.actor(pD.d, pD.x, pD.s, t, { dir: -1, anda: pD.anda, sostiene: da ? [pC.x + 20, pC.s - 12] : undefined, sonrisa: t > shook + 0.4, habla: canta && Math.sin(t * 8 + 3) > 0 });
  PZ.fiambrera(R, t > sang + 0.6 ? pD.x + 4 : qc.mano[0] + 1, t > sang + 0.6 ? pD.s - 10 : qc.mano[1] + 3, {});
  if (canta) canto(t, sang + 0.4, pC.x + 8, pC.s - 30, ORO, 2);
  T.hoyDelante(R, t, { encuadre: 'tregua', luz: 'tarde' });
};
const p3 = (t) => {
  // el balón: a «kicked» sale del primero hacia el de enfrente; rebota; luego al oficial, que lo chuta en «did»
  const KB = [[P3, 132, 148, 0], [kicked, 132, 148, 0], [kicked + 0.7, 222, 150, 24], [nobody - 0.2, 226, 150, 0], [nobody + 0.4, 196, 150, 8], [just + 0.1, 104, 152, 14], [did, 98, 152, 0], [did + 0.8, 250, 146, 30], [99, 250, 146, 0]];
  let bx = KB[0][1], by = KB[0][2];
  for (let i = 1; i < KB.length; i++) if (t >= KB[i - 1][0]) { const u = tramo(t, KB[i - 1][0], KB[i][0]); bx = lerp(KB[i - 1][1], KB[i][1], u); by = lerp(KB[i - 1][2], KB[i][2], u) - Math.sin(u * Math.PI) * KB[i][3]; }
  bx = Math.round(bx); by = Math.round(by);
  T.hoy(R, t, { encuadre: 'tregua', camara: 'cerca', balon: [bx, by] });
  // el británico corre al balón y lo chuta en «kicked»; los demás corren detrás
  const c1 = tramo(t, P3, kicked - 0.05);
  R.actor(EL.soldadoBritanico, Math.round(lerp(96, 118, c1)), 152, t, { dir: 1, anda: c1 < 1 || (t > did && t < did + 1.2), salto: t > kicked - 0.05 && t < kicked + 0.2 ? 2 : 0, sonrisa: true, brazos: t > did + 0.4 && t < did + 1.6 });
  // el alemán lo para con el pecho, se lo pasa al compañero
  R.actor(EL.soldadoAleman, 222, 150, t, { dir: -1, salto: t > kicked + 0.6 && t < kicked + 0.9 ? 3 : 0, sonrisa: t > kicked + 0.8, sorpresa: t > kicked + 0.2 && t < kicked + 0.8, brazos: t > did + 0.4 && t < did + 1.6 });
  R.actor(EL.soldadoAleman, Math.round(lerp(262, 200, tramo(t, nobody - 0.6, nobody - 0.1))), 146, t, { dir: -1, anda: t > nobody - 0.6 && t < nobody - 0.1, salto: t > nobody - 0.1 && t < nobody + 0.15 ? 2 : 0, sonrisa: true, habla: t > did + 0.6 && Math.sin(t * 9) > 0 });
  R.actor(EL.soldadoBritanico, Math.round(160 + Math.sin(t * 1.4) * 10), 156, t, { dir: Math.cos(t * 1.4) > 0 ? 1 : -1, anda: true, sonrisa: true, brazos: t > kicked && t < kicked + 0.6 });
  // el oficial entra por la izquierda, se para con un «?» en «ordered»… y chuta él en «did»
  const of = tramo(t, nobody - 0.4, ordered - 0.1);
  const ox = Math.round(lerp(-20, 84, of));
  R.actor(EL.soldadoBritanico, ox, 154, t, { dir: 1, anda: of > 0 && of < 1, enfado: t > ordered - 0.1 && t < just - 0.2, sorpresa: t > ordered - 0.1 && t < ordered + 0.4, sonrisa: t > just, salto: t > did - 0.05 && t < did + 0.2 ? 3 : 0, dedo: t > ordered + 0.4 && t < just - 0.2 });
  if (t > ordered && t < just) R.bocadillo(ox + 8, 120 - (t < ordered + 0.12 ? 2 : 0), { icono: '?' });
  if (t > did && t < did + 0.25) chispa(98, 146, hex('#ffffff'), 3);
  T.hoyDelante(R, t, { encuadre: 'tregua', camara: 'cerca' });
  copos(t, 30, 0, 0, 319, 179, hex('#eef4fa'), hex('#ffffff'), 5);
};
const efectos = [[1.6, 'brillo'], [soldiers + 0.2, 'campana'], [both + 0.4, 'golpecito'],
  [P2 + 0.2, 'golpecito'], [shook, 'palmada'], [sang, 'campana'],
  [kicked, 'golpecito'], [kicked + 0.7, 'golpecito'], [ordered, 'pop'], [did, 'golpecito'], [did + 0.5, 'publico']];
T.rodar(E, R, [[P1, p1], [P2, p2], [P3, p3]], { efectos, cartela: '1914', año: 1914 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-cierre'] = ('Cierre', '''// NV-CIERRE (frase 29), sin cartela; barra 1647 → 1914 → 2026. Cuatro planos:
// 1. el álbum de cerca (fondo local): en la página de la izquierda, la estampa de Canterbury (sepia) con su 1647, que
//    brilla en «Canterbury»; la mano trae la foto de la trinchera de 1914 y la pega en «trenches»; un hilo rojo une las
//    dos fechas en «same story»;  2. el bosque nevado de noche: una procesión de gente de todas las épocas (romano, monje,
//    puritana, San Nicolás, la dama de 1857, la mexicana, el filipino, el soldado, la japonesa) pasa la llama de vela en
//    vela («many hands»); el alguacil intenta pararlos con el dedo, una ráfaga tumba las llamas que vuelven a prender, y
//    en «stop them» un niño le da una vela y sonríe;  3. un edificio de noche con cuatro ventanas: en tres, una familia
//    hace su costumbre (el parol de Filipinas, el Tió de Cataluña, la cubeta de Japón); en «your family» se enciende la
//    cuarta, vacía, con un «?» grande; en «surprise» los vecinos se asoman a mirarla;  4. la mesa del salón con el álbum
//    abierto: Atom baja de su esquina, se lanza a por la galleta en «catch» y la galleta salta; Atom se da contra el
//    plato y se marea; la galleta cruza el álbum, se ríe en «again» y se escapa (gag 7).''', W(H + r'''
const P2 = @cierre:5.48, P3 = @cierre:12.53, P4 = @cierre:18.53;
const canter = @cierre:0.64, n1647 = @cierre:1.54, trenches = @cierre:3.32, story = @cierre:4.36;
const many = @cierre:6.80, hands = @cierre:8.02, centuries = @cierre:8.98, nobody = @cierre:9.94, stop = @cierre:11.54;
const comments = @cierre:13.45, family = @cierre:14.69, xmas = @cierre:15.55, surprise = @cierre:16.45, world = @cierre:17.73;
const going = @cierre:19.39, catchT = @cierre:19.97, cookie = @cierre:21.05, again = @cierre:21.41;
const ORO = hex('#ffd860');
// 1 · el álbum de cerca: las estampas se sacan de los decorados de verdad (Canterbury y la tregua), reducidas y en sepia
const SEPIA = [hex('#2e1e14'), hex('#5a3e28'), hex('#8a6a46'), hex('#bea07a'), hex('#ece0c4')];
const reduce = (buf, w, h, cx0 = 0, cy0 = 0, cw = 320, ch = 180) => { const out = new Uint32Array(w * h);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { let r = 0, g = 0, b = 0; for (const [a2, b2] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) { const c = buf[Math.min(179, Math.floor(cy0 + (j + b2) * ch / h)) * 320 + Math.min(319, Math.floor(cx0 + (i + a2) * cw / w))]; r += c & 255; g += (c >>> 8) & 255; b += (c >>> 16) & 255; }
    r /= 4; g /= 4; b /= 4; const l = (0.3 * r + 0.59 * g + 0.11 * b) / 255, q = Math.max(0, Math.min(4, Math.round(l * 4.6 - 0.3 + (BAY[(i & 3) + ((j & 3) << 2)] / 16 - 0.5) * 0.7)));
    out[j * w + i] = mz(SEPIA[q], (0xff000000 | (Math.round(b) << 16) | (Math.round(g) << 8) | Math.round(r)) >>> 0, 0.3); }
  return out; };
let EST = null;
const estampas = () => { if (EST) return EST;
  const b1 = capa('dec-canter', () => { T.siglo17(R, 2, { encuadre: 'canterbury' }); T.siglo17Delante(R, 2, { encuadre: 'canterbury' }); });
  const b2 = capa('dec-tregua', () => { T.hoy(R, 2, { encuadre: 'tregua', luz: 'tarde' }); T.hoyDelante(R, 2, { encuadre: 'tregua', luz: 'tarde' }); });
  EST = { can: reduce(b1, 104, 64, 0, 18, 300, 162), tre: reduce(b2, 104, 64, 0, 18, 300, 162) }; return EST; };
const pega = (arr, x0, y0, w, h) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) R.pset(x0 + i, y0 + j, arr[j * w + i]); };
const foto = (arr, x0, y0) => { R.rect(x0 - 4, y0 - 4, x0 + 108, y0 + 70, hex('#5a4630')); R.rect(x0 - 3, y0 - 3, x0 + 107, y0 + 69, hex('#f4ecd8')); R.rect(x0 + 109, y0 - 2, x0 + 110, y0 + 71, hex('#b8a888')); R.rect(x0 - 2, y0 + 71, x0 + 110, y0 + 72, hex('#b8a888')); pega(arr, x0, y0, 104, 64); };
const esquinas = (x0, y0) => { for (const [cx, cy, sx, sy] of [[x0 - 5, y0 - 5, 1, 1], [x0 + 109, y0 - 5, -1, 1], [x0 - 5, y0 + 71, 1, -1], [x0 + 109, y0 + 71, -1, -1]]) for (let j = 0; j < 8; j++) for (let i = 0; i < 8 - j; i++) R.pset(cx + sx * i, cy + sy * j, i === 7 - j || i === 0 || j === 0 ? hex('#4a3020') : hex('#8a5a30')); };
const fondoAlbum = () => {
  const { rect, pset, disco, linea } = R;
  // la mesa de nogal en penumbra (más lisa y oscura en la esquina de Atom)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.04 + Math.sin(y * 0.3 + x * 0.02) * 2 + y * 0.015); let c = v > 0.85 ? hex('#5a3a22') : v < -0.7 ? hex('#2a180e') : hex('#3e2616'); if (quieta(x, y)) c = hex('#2e1c10'); pset(x, y, c); }
  // el álbum: tapas de piel granate, las hojas que asoman por el canto, el lomo y las dos páginas de cartulina
  rect(4, 20, 274, 178, K); rect(5, 21, 273, 177, hex('#6a1e22')); for (let y = 21; y < 178; y++) for (let x = 5; x < 274; x++) if (hs(x, y, 50) < 0.08) pset(x, y, hex('#5a161a'));
  rect(9, 24, 269, 174, hex('#d8c8a8')); rect(10, 25, 268, 173, hex('#e8dcc0'));
  for (let y = 25; y < 174; y++) for (let x = 10; x < 269; x++) { const u = hs(x, y, 51); if (u < 0.04) pset(x, y, hex('#d8c8a8')); else if (u > 0.985) pset(x, y, hex('#c8b090')); }
  for (let x = 134; x <= 144; x++) { const d = Math.abs(x - 139) / 5; for (let y = 25; y < 174; y++) pset(x, y, mz(hex('#e8dcc0'), hex('#8a7a5a'), (1 - d) * 0.7)); }
  rect(139, 25, 139, 173, hex('#7a6a4a'));
  // las hojas que asoman por abajo, el cordón marcapáginas y una ramita de acebo prensada
  for (let k = 0; k < 3; k++) rect(10 + k, 174 + k, 268 - k, 174 + k, k % 2 ? hex('#c8b898') : hex('#e8dcc0'));
  linea(139, 173, 132, 179, hex('#c8282a')); linea(140, 173, 134, 179, hex('#a01818'));
  PZ.acebo(R, 30, 166, { s: 2 });
  PZ.multa(R, 118, 170, { mini: true });
  // la vela y la taza de la derecha (por debajo de la esquina de Atom)
  rect(286, 150, 310, 154, K); rect(287, 151, 309, 153, hex('#c8a040'));
  rect(294, 118, 302, 150, K); rect(295, 119, 301, 150, hex('#f4ecd8')); rect(295, 119, 296, 150, hex('#ffffff'));
  disco(298, 168, 8, K); disco(298, 168, 7, hex('#c83a3a')); disco(298, 167, 5, hex('#5a2a1a')); rect(306, 166, 309, 170, hex('#c83a3a'));
};
const p1 = (t) => {
  fijo('album', fondoAlbum);
  const e = estampas();
  // la vela que tiembla y su luz; el vapor de la taza
  const fl = Math.sin(t * 15) > 0 ? 1 : 0; R.disco(298, 113 - fl, 2, hex('#ffd060')); R.pset(298, 111 - fl, hex('#ffffff')); R.pset(298, 116, K); halo(298, 120, 34, hex('#ffd890'), 0.3);
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; R.pset(296 + Math.round(Math.sin(u * 7 + k) * 2), 158 - Math.round(u * 14), mz(hex('#e8e8f0'), hex('#3e2616'), u)); }
  // la estampa de Canterbury (1647), que brilla en «Canterbury»
  foto(e.can, 22, 40); esquinas(22, 40);
  if (t > canter && t < canter + 0.6) { const u = (t - canter) / 0.6; for (let x = 22; x < 126; x++) { const d = Math.abs(x - 22 - u * 130); if (d < 6) for (let y = 40; y < 104; y++) if ((x + y) % 2 === 0) R.pset(x, y, mz(R.pget(x, y), hex('#fff8e0'), 0.6 * (1 - d / 6))); } }
  if (t > n1647 - 0.1) R.numero('1647', 74, 128 - (t < n1647 + 0.05 ? 2 : 0), { centro: true, color: hex('#5a3a22') });
  // la foto de la trinchera: la mano la trae y la pega en «trenches»
  esquinas(156, 40);
  const tr = suave(tramo(t, trenches - 1.0, trenches)), sale = suave(tramo(t, trenches + 0.3, trenches + 1.0));
  const fx = Math.round(lerp(236, 156, tr)), fy = Math.round(lerp(150, 40, tr));
  if (tr > 0) { foto(e.tre, fx, fy); if (tr >= 1) esquinas(156, 40); }
  if (t > trenches) R.numero('1914', 208, 128 - (t < trenches + 0.15 ? 2 : 0), { centro: true, color: hex('#5a3a22') });
  if (tr > 0 && sale < 1) { const wx = Math.round(tr < 1 ? fx + 110 : lerp(266, 300, sale)), wy = Math.round(tr < 1 ? fy + 60 : lerp(100, 196, sale)); T.brazo(R, wx + 30, wy + 70, wx, wy, '#3a4a6a', -1, { codo: [wx + 26, wy + 34] }); }
  if (t > trenches && t < trenches + 0.25) for (const [x, y] of [[152, 36], [266, 36], [152, 110], [266, 110]]) chispa(x, y, hex('#fff0a0'), 2);
  // el hilo rojo que une las dos fechas en «same story», con un corazón en medio
  const hi = tramo(t, story - 0.2, story + 0.5);
  if (hi > 0) { for (let k = 0; k <= hi * 60; k++) { const u = k / 60, x = Math.round(lerp(94, 186, u)), y = Math.round(126 + Math.sin(u * Math.PI) * 14); if (k % 3 !== 2) R.rect(x, y, x, y + 1, hex('#c8282a')); } if (hi >= 1) R.icono('corazon', 137, 136, hex('#d83038'), K); }
  // la galleta se asoma por el borde del álbum, abajo a la derecha (y se esconde)
  const as = t > story + 0.3 ? Math.min(1, (t - story - 0.3) * 4) : 0;
  if (as > 0) { R.recorte([0, 0, 319, 179]); T.galleta(R, 258, 184 - Math.round(as * 12), t, { s: 2, cara: 'feliz' }); R.recorte(null); }
};
// 2 · la procesión de las velas por el bosque nevado (T.epoca 'bosque', uso libre)
const FILA = [EL.romanoPileo, EL.monje, EL.puritana, EL.nicolas, EL.dama1857, EL.mexicana, EL.filipino, EL.soldadoBritanico, EL.japonesa];
const p2 = (t) => {
  T.epoca(R, t, { encuadre: 'bosque' });
  const u0 = t - P2, rafaga = tramo(t, nobody + 0.2, nobody + 1.2);
  // la fila avanza de derecha a izquierda; la llama pasa de una vela a la siguiente desde «many hands»
  FILA.forEach((d, i) => {
    const x = Math.round(330 + i * 30 - u0 * 22 - 10), s = 168 + (i % 2) * 4;
    if (x < -20 || x > 330) return;
    const alza = t > hands + i * 0.08 && t < centuries + 0.6;
    const a = R.actor(d, x, s, t, { dir: -1, anda: true, sostiene: alza ? [x - 2, s - 26] : true, sonrisa: t > hands - 0.3 + i * 0.25 });
    const on = t > many + i * 0.28;
    const vy = a.mano[1] + 2, vx = a.mano[0];
    PZ.vela(R, vx, vy, { t: on ? t + i : 0, color: i % 3 === 1 ? 'roja' : undefined });
    if (!on) { R.rect(vx - 1, vy - 9, vx + 1, vy - 6, hex('#1a2a3a')); }
    else { if (rafaga > 0 && rafaga < 0.6) { R.rect(vx - 2, vy - 8, vx - 1, vy - 7, hex('#ffd060')); } halo(vx, vy - 7, 12, hex('#ffd890'), rafaga > 0 && rafaga < 0.6 ? 0.15 : 0.45); }
    if (on && t < many + i * 0.28 + 0.2) chispa(vx, vy - 9, hex('#fff0a0'), 2);
  });
  // la ráfaga de «nobody»: copos que barren el plano de derecha a izquierda
  if (rafaga > 0 && rafaga < 1) for (let k = 0; k < 18; k++) { const x = Math.round(330 - rafaga * 360 + k * 9), y = 110 + (k * 13) % 60; R.linea(x, y, x + 6, y, hex('#e8f0ff')); }
  // el alguacil, quieto en su sitio a la izquierda: dedo y enfado; en «stop them» un niño le da una vela y sonríe
  const da = t > stop - 0.4;
  const al = R.actor(EL.alguacil, 30, 172, t, { dir: 1, dedo: !da && t > nobody - 0.4, enfado: !da && t > nobody - 0.4, sorpresa: t > stop - 0.4 && t < stop + 0.1, sonrisa: t > stop + 0.1, sostiene: da ? true : undefined, habla: !da && t > nobody && Math.sin(t * 9) > 0 });
  const ni = tramo(t, stop - 1.2, stop - 0.45), nx = Math.round(lerp(96, 50, ni));
  if (t > stop - 1.4) { const n = R.actor(EL.ninoVictoriano, nx, 174, t, { dir: -1, anda: ni > 0 && ni < 1, sostiene: !da ? true : undefined, sonrisa: true }); if (!da) PZ.vela(R, n.mano[0], n.mano[1] + 2, { t }); }
  if (da) { PZ.vela(R, al.mano[0], al.mano[1] + 2, { t }); halo(al.mano[0], al.mano[1] - 5, 12, hex('#ffd890'), 0.45); }
  T.epocaDelante(R, t, { encuadre: 'bosque' });
};
// 3 · el edificio de las cuatro ventanas (fondo local)
const VEN = [[12, 78], [88, 154], [164, 230], [240, 306]], VY0 = 70, VY1 = 146;
const fondoEdificio = (lit) => () => {
  const { rect, pset, disco, linea } = R;
  degr(0, 0, 319, 54, [hex('#0a0e26'), hex('#141c44'), hex('#22305e')]);
  for (let i = 0; i < 40; i++) { const x = Math.floor(hs(i, 1, 60) * 320), y = Math.floor(hs(i, 2, 60) * 46); if (!quieta(x, y)) pset(x, y, hs(i, 3, 60) > 0.6 ? hex('#ffffff') : hex('#8a90c0')); }
  // la fachada de ladrillo con sus llagas, la cornisa con nieve y carámbanos
  for (let y = 54; y < 166; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 54) / 4), jx = (x + (fila % 2) * 6) % 12; let c = hs(Math.floor((x + (fila % 2) * 6) / 12), fila, 61) > 0.5 ? hex('#8a3e32') : hex('#7a362c'); if ((y - 54) % 4 === 3 || jx === 11) c = hex('#5a2a24'); pset(x, y, c); }
  rect(0, 50, 319, 58, K); rect(0, 51, 319, 55, hex('#a89a8a')); rect(0, 56, 319, 57, hex('#6a5e52')); for (let x = 0; x < 320; x++) { const hgt = 1 + Math.round(hs(x, 0, 62) * 2); rect(x, 51 - hgt, x, 51, hex('#eef4fa')); if (hs(x, 1, 62) < 0.12) rect(x, 58, x, 58 + Math.floor(hs(x, 2, 62) * 6), hex('#c8e0f4')); }
  // las ventanas: dintel de piedra, marco blanco; dentro, cada casa (encendida o a oscuras)
  VEN.forEach(([x0, x1], i) => {
    rect(x0 - 4, VY0 - 8, x1 + 4, VY0 - 3, hex('#c8bcaa')); rect(x0 - 4, VY0 - 3, x1 + 4, VY0 - 3, hex('#8a7e6e'));
    rect(x0 - 2, VY0 - 2, x1 + 2, VY1 + 2, hex('#f0ece4'));
    const pared = [hex('#f0d890'), hex('#e8e0d0'), hex('#e8d4b0'), hex('#d8e0c8')][i], suelo = [hex('#a87a4a'), hex('#c86a4a'), hex('#c8a870'), hex('#8a6a4a')][i];
    for (let y = VY0; y <= VY1; y++) for (let x = x0; x <= x1; x++) { let c = y > 132 ? (((x + y) % 6) ? suelo : mz(suelo, K, 0.25)) : pared;
      if (i === 1 && y > 112 && y <= 132) c = ((x - x0) % 8 < 7 && (y - 113) % 8 < 7) ? (((x - x0 + y) >> 3) % 2 ? hex('#3a7ab8') : hex('#e8eef4')) : hex('#c8c8c8');
      if (i === 2 && y <= 132 && ((x - x0) % 10 === 0 || (y - VY0) % 12 === 0)) c = hex('#a88a5a');
      if (i === 0 && y <= 132 && (x - x0) % 6 === 0) c = hex('#d8b870');
      if (i === 3 && y <= 132 && (x - x0) % 8 < 4) c = hex('#ccd6bc');
      pset(x, y, lit ? c : mz(c, hex('#141a3a'), 0.78)); }
    // un cuadro en cada pared y la lámpara de techo
    const cx = Math.round((x0 + x1) / 2); rect(cx - 8, VY0 + 10, cx + 8, VY0 + 22, lit ? hex('#6a4a2a') : hex('#1e1e30')); rect(cx - 6, VY0 + 12, cx + 6, VY0 + 20, i === 3 ? (lit ? hex('#f4f0e4') : hex('#24263a')) : lit ? hex('#7ab0d8') : hex('#22283e')); if (i !== 3 && lit) { rect(cx - 6, VY0 + 17, cx + 6, VY0 + 20, hex('#5a9a5a')); disco(cx + 3, VY0 + 15, 1, hex('#fff0a0')); }
    linea(cx + 18, VY0, cx + 18, VY0 + 6, lit ? K : hex('#0e1020')); disco(cx + 18, VY0 + 8, 3, lit ? hex('#ffe890') : hex('#3a3a4a'));
    // la mueble de cada casa: mesa baja (Japón), sofá (la cuarta), aparador, banco
    if (i === 2) { rect(x0 + 30, 128, x1 - 4, 134, lit ? hex('#6a3a22') : hex('#1e1a2a')); rect(x0 + 30, 134, x1 - 4, 140, lit ? hex('#c84a3a') : hex('#2a1a2a')); }
    if (i === 3) { rect(x0 + 10, 120, x1 - 10, 138, lit ? hex('#4a6a9a') : hex('#1a2038')); rect(x0 + 10, 116, x1 - 10, 122, lit ? hex('#5a7aaa') : hex('#1e2440')); rect(x0 + 8, 120, x0 + 12, 138, lit ? hex('#3a5a8a') : hex('#161c30')); rect(x1 - 12, 120, x1 - 8, 138, lit ? hex('#3a5a8a') : hex('#161c30')); }
    if (i === 0) { rect(x0 + 40, 124, x1 - 4, 132, lit ? hex('#8a5a2a') : hex('#1e1a28')); rect(x0 + 44, 132, x0 + 46, 140, lit ? hex('#6a4220') : hex('#18141e')); rect(x1 - 8, 132, x1 - 6, 140, lit ? hex('#6a4220') : hex('#18141e')); }
    if (i === 1) { rect(x0 + 4, 116, x0 + 18, 140, lit ? hex('#7a4a2a') : hex('#1e1a28')); }
    // el alféizar con nieve
    rect(x0 - 5, VY1 + 3, x1 + 5, VY1 + 6, hex('#c8bcaa')); for (let x = x0 - 5; x <= x1 + 5; x++) rect(x, VY1 + 2 - Math.round(hs(x, 3, 63) * 2), x, VY1 + 3, hex('#f4f8ff'));
  });
  // la acera nevada y el bordillo
  rect(0, 166, 319, 179, hex('#dfe8f2')); for (let x = 0; x < 320; x++) { if (hs(x, 5, 64) < 0.3) pset(x, 166, hex('#ffffff')); if (hs(x, 6, 64) < 0.1) pset(x, 170 + Math.floor(hs(x, 7, 64) * 9), hex('#b8c8dc')); }
  rect(0, 176, 319, 179, hex('#9aa8b8'));
  // la bajante con nieve entre la segunda y la tercera ventana
  rect(158, 54, 160, 166, hex('#3a3a44')); rect(158, 54, 158, 166, hex('#6a6a74'));
};
const EDIF = [];
const p3 = (t) => {
  fijo('edif1', fondoEdificio(true));
  const oscuro = capa('edif0', fondoEdificio(false));
  // las tres primeras casas se encienden al empezar; la cuarta, en «your family»
  const ON = [P3 + 0.15, P3 + 0.45, P3 + 0.75, family];
  VEN.forEach(([x0, x1], i) => { if (t < ON[i]) for (let y = VY0 - 2; y <= VY1 + 2; y++) for (let x = x0 - 2; x <= x1 + 2; x++) R.pset(x, y, oscuro[y * 320 + x]); });
  const vecinos = t > surprise;   // en «surprise» todos se asoman hacia la cuarta ventana
  // 1 · Filipinas: la madre cuelga el parol en la ventana y se enciende
  R.recorte([VEN[0][0], VY0, VEN[0][1], VY1]);
  if (t > ON[0]) { const cu = tramo(t, P3 + 0.4, comments), px = 32, py = Math.round(lerp(122, 98, cu));
    const f = R.actor(EL.filipina, 20, 140, t, { dir: 1, sostiene: cu < 1 ? [px - 4, py - 4] : undefined, sonrisa: true, dedo: vecinos, sorpresa: vecinos && t < surprise + 0.5 });
    if (cu >= 1) R.linea(px, VY0, px, py - 24, K); PZ.parol(R, cu < 1 ? f.mano[0] + 4 : px, cu < 1 ? f.mano[1] + 20 : py, { t, color: 'amarillo' }); if (cu >= 1) halo(px, py - 12, 16, hex('#fff0a0'), 0.4);
    R.actor(EL.filipino, 50, 140, t, { dir: vecinos ? 1 : -1, sonrisa: true, habla: !vecinos && Math.sin(t * 6) > 0 }); }
  R.recorte(null);
  // 2 · Cataluña: el niño da golpecitos al Tió con su palo, y salen dulces
  R.recorte([VEN[1][0], VY0, VEN[1][1], VY1]);
  if (t > ON[1]) { const g = Math.sin(t * 7) > 0.6 && !vecinos;
    PZ.tio(R, 130, 141, { golpe: g });
    const n = R.actor(EL.ninoCatalan, 100, 141, t, { dir: vecinos ? 1 : 1, sostiene: !vecinos ? [118, g ? 124 : 116] : undefined, sonrisa: true, habla: !vecinos && Math.sin(t * 7) > 0, sorpresa: vecinos && t < surprise + 0.5 });
    if (!vecinos) R.linea(n.mano[0], n.mano[1], n.mano[0] + 10, n.mano[1] + (g ? 6 : -4), hex('#8a5a2a'));
    if (t > comments) PZ.dulces(R, 136, 143, {});
    R.actor(EL.ninaCatalana, 132, 141, t, { dir: vecinos ? 1 : -1, sonrisa: true, salto: g ? 2 : 0 }); }
  R.recorte(null);
  // 3 · Japón: la cubeta de pollo en la mesa baja, que humea; la pareja brinda
  R.recorte([VEN[2][0], VY0, VEN[2][1], VY1]);
  if (t > ON[2]) { R.actor(EL.japones, 172, 141, t, { dir: 1, sonrisa: true, habla: !vecinos && Math.sin(t * 5) > 0, sostiene: !vecinos ? [192, 124] : undefined, sorpresa: vecinos && t < surprise + 0.5 });
    PZ.cubeta(R, 206, 128, {}); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(203 + k * 3 + Math.round(Math.sin(u * 7 + k)), 112 - Math.round(u * 12), mz(hex('#ffffff'), hex('#e8d4b0'), u)); }
    R.actor(EL.japonesa, 210, 141, t, { dir: vecinos ? 1 : -1, sonrisa: true, sostiene: !vecinos ? [212, 124] : undefined }); }
  R.recorte(null);
  // 4 · la cuarta casa: vacía hasta «your family»; entonces un «?» grande que late
  if (t > family) { const s = t < family + 0.15 ? 2 : 3, y = 92 + Math.round(Math.sin(t * 4) * 2); R.icono('?', 264, y - (t < family + 0.15 ? 3 : 0), hex('#ffd860'), K, s); if (t > surprise && t < surprise + 0.4) for (const [dx, dy] of [[-8, -6], [22, -4], [-6, 22], [24, 20]]) chispa(264 + dx, y + dy, hex('#fff0a0'), 2); }
  // los marcos de las ventanas (los parteluces, delante) y las cortinas recogidas
  VEN.forEach(([x0, x1], i) => { const cx = Math.round((x0 + x1) / 2); R.rect(cx - 1, VY0, cx + 1, VY1, hex('#f0ece4')); R.rect(x0, 106, x1, 107, hex('#f0ece4')); const on = t > ON[i];
    for (const [a, b] of [[x0, x0 + 6], [x1 - 6, x1]]) for (let y = VY0; y < VY1 - 10; y++) for (let x = a; x <= b; x++) R.pset(x, y, mz((x + Math.floor(y / 3)) % 3 ? hex('#c83a3a') : hex('#9a2a2a'), hex('#141a3a'), on ? 0 : 0.7));
    if (on) halo(cx, VY1 + 10, 26, hex('#ffd890'), 0.3); });
  // la nieve y el vecino que pasa por la acera con su perro… y su paraguas de nieve
  const vx = Math.round(-30 + (t - P3) * 30);
  R.actor(EL.vecino, vx, 176, t, { dir: 1, anda: true, sonrisa: true });
  copos(t, 50, 0, 0, 319, 179, hex('#eef4fa'), hex('#ffffff'), 8);
};
// 4 · la mesa del salón con el álbum: Atom intenta atrapar la galleta (gag 7)
const comp0 = R.companero;
R.companero = (t, e) => {
  if (t < going) return comp0(t, e);
  const baja = suave(tramo(t, going, catchT)), lan = tramo(t, catchT, catchT + 0.3), vuelve = suave(tramo(t, again + 0.9, again + 1.9));
  let x = lerp(297, 262, baja), y = lerp(24, 100, baja);
  if (lan > 0) { x = lerp(262, 270, lan); y = lerp(100, 134, lan * lan); }
  const mareo = t > catchT + 0.3 && t < again + 0.9;
  if (mareo) { x = 270 + Math.sin((t - catchT) * 30) * Math.max(0, 1 - (t - catchT - 0.3) * 2.5) * 3; y = 134; }
  if (vuelve > 0) { x = lerp(270, 297, vuelve); y = lerp(134, 24, vuelve) - Math.sin(vuelve * Math.PI) * 8; }
  x = Math.round(x); y = Math.round(y + Math.sin(t * 2.6) * 1.2);
  for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / 15; if (g > 0.3 && (g > 0.5 || ((i + j) & 1))) R.pset(x + i, y + j, g > 0.72 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: lan > 0 && lan < 1 ? 1 : e });
  if (mareo) for (let k = 0; k < 4; k++) { const a = k * 1.5708 + t * 7; chispa(Math.round(x + Math.cos(a) * 15), Math.round(y - 14 + Math.sin(a) * 4), hex('#ffe890'), 1); }
};
const p4 = (t) => {
  T.hoy(R, t, { encuadre: 'salon', camara: 'mesa', album: 1 });
  T.hoyDelante(R, t, { encuadre: 'salon', camara: 'mesa', album: 1 });
  // la galleta en el plato; salta en «catch», cruza el álbum, se ríe en «again» y se escapa por la izquierda
  const sa = tramo(t, catchT + 0.1, catchT + 0.6), co = tramo(t, catchT + 0.6, again - 0.1), fu = tramo(t, again + 0.6, again + 1.8);
  let gx = 270, gy = 142;
  if (sa > 0) { gx = lerp(270, 222, sa); gy = lerp(142, 136, sa) - Math.sin(sa * Math.PI) * 26; }
  if (co > 0) { gx = lerp(222, 120, co); gy = 136; }
  if (fu > 0) { gx = lerp(120, -20, fu); gy = 140; }
  const sal = t > again - 0.1 && t < again + 0.6 ? Math.round(Math.abs(Math.sin((t - again) * 12)) * 4) : 0;
  T.galleta(R, Math.round(gx), Math.round(gy) - sal, t, { s: 2, cara: t > again - 0.1 ? 'feliz' : (sa > 0 ? 'susto' : 'normal'), corre: (co > 0 && co < 1) || (fu > 0 && fu < 1), dir: co > 0 || fu > 0 ? -1 : 1 });
  if (t > again - 0.1 && t < again + 0.6) R.bocadillo(Math.round(gx), Math.round(gy) - 40, { icono: '!' });
  if (t > catchT + 0.3 && t < catchT + 0.5) for (const [dx, dy] of [[-12, -4], [12, -6], [0, 6]]) chispa(270 + dx, 140 + dy, hex('#ffffff'), 2);
};
const efectos = [[canter, 'brillo'], [trenches, 'papel'], [story, 'pop'],
  [many, 'brillo'], [hands, 'brillo'], [nobody + 0.2, 'viento'], [stop, 'pop'],
  [P3 + 0.15, 'interruptor'], [family, 'interruptor'], [surprise, 'pop'],
  [going, 'whoosh'], [catchT + 0.1, 'boing'], [catchT + 0.3, 'golpecito'], [again, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < trenches ? 1647 : t < P2 ? 1914 : t < P3 ? Math.round(lerp(354, 2026, tramo(t, P2 + 0.3, P3 - 0.3))) : 2026 });
'''))
