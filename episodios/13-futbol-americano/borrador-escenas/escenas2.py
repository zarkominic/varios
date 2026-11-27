E = {}

# Piezas comunes de las tres escenas (se pegan al principio de cada cuerpo): la trama de Bayer, el azar fijo, las rampas
# tramadas, el búfer de fondo fijo (con R.usar(prev), para no romper los fundidos), las nubes de noche de tres tonos y el
# público pequeño de los estadios de hoy.
COMUN = r'''
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const dz = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const rampa = (x, y, v, cs) => { const q = Math.max(0, Math.min(cs.length - 1.001, v * (cs.length - 1))), i = Math.floor(q); return q - i > dz(x, y) ? cs[i + 1] : cs[i]; };
const H = (a) => a.map(hex);
const FIJOS = new Map();
const fijo = (k, dib) => { let b = FIJOS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); FIJOS.set(k, b); } R.copiar(b); };
const sombraSuelo = (cx, y, rx, c) => { for (let i = -rx; i <= rx; i++) { R.pset(cx + i, y, c); if (Math.abs(i) < rx - 2) R.pset(cx + i, y + 1, c); } };
// una nube de noche: puffs con la sombra arriba, el cuerpo y el borde de abajo encendido por el estadio
const nube = (cx, cy, w, c, sem = 0) => { cx = Math.round(cx); cy = Math.round(cy); const n = 3 + Math.floor(hs(sem, 1, 2) * 4);
  for (let k = 0; k < n; k++) { const dx = Math.round((k - (n - 1) / 2) * w * 0.8 / n + (hs(sem, k, 3) - 0.5) * 6), r = Math.max(2, Math.round(w * (0.1 + 0.14 * hs(sem, k, 4)))), y = cy - Math.round(r * 0.35) + Math.round((hs(sem, k, 5) - 0.5) * 4);
    R.disco(cx + dx, y, r, c[0]); R.disco(cx + dx, y + 1, r - 1, c[1]); if (r > 3) R.disco(cx + dx, y + 2, r - 3, c[2]); }
  R.rect(cx - Math.round(w * 0.42), cy + 1, cx + Math.round(w * 0.42), cy + 2, c[1]); R.linea(cx - Math.round(w * 0.36), cy + 3, cx + Math.round(w * 0.36), cy + 3, c[2]); };
// el público: filas de asientos y aficionados de 2 × 4 px con la camiseta de los dos equipos inventados
const PIEL = H(['#f2c8a0', '#d8a070', '#a86a40', '#6e4224', '#f6d8b8']);
const CAMIS = H(['#1e8a8a', '#e8783a', '#8a2a3a', '#f2eee2', '#146464', '#641e2a', '#2a3458', '#c8a040']);
const MOVIL = hex('#f4f6ff'), PELO = H(['#1c1424', '#3a2418', '#8a5a2a', '#c8a050', '#5a3418']);
const publico = (x0, x1, y0, y1, t, o = {}) => {
  const as = hex(o.asiento ?? '#262a40'), asL = hex(o.asientoL ?? '#363c58'), esc = hex('#4a4e60'), escL = hex('#5e6274');
  const g = o.g ?? 1, fila = g > 1 ? 7 : 4, paso = g > 1 ? 4 : 3;
  for (let y = y0; y <= y1; y++) R.rect(x0, y, x1, y, (y - y0) % fila === fila - 1 ? asL : as);
  if (o.pasillo) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (o.pasillo(x, y)) R.pset(x, y, (y & 1) ? escL : esc);
  for (let fy = y0; fy <= y1 - fila + 1; fy += fila) for (let x = x0 + (Math.floor(fy / fila) & 1) * (g > 1 ? 2 : 1); x < x1 - 2; x += paso) {
    if (o.pasillo && (o.pasillo(x, fy) || o.pasillo(x + 1, fy))) continue;
    const r = hs(x, fy, 3); if (r < (o.vacio ?? 0.07)) continue;
    const s = o.salta ? o.salta(x, fy, r) : 0, yy = fy - Math.round(s), cam = CAMIS[Math.floor(hs(x, fy, 5) * (o.colores ?? 6))];
    if (g > 1) { const pi = PIEL[Math.floor(hs(x, fy, 7) * 5)], pe = PELO[Math.floor(hs(x, fy, 8) * 5)];
      R.rect(x, yy + 4, x + 2, yy + 6, cam); R.pset(x + 2, yy + 6, as); R.rect(x, yy + 1, x + 2, yy + 3, pi); R.rect(x, yy, x + 2, yy, pe); if (r > 0.5) R.pset(x, yy + 1, pe); else R.pset(x + 2, yy + 1, pe);
      if (s > 1.2) { R.rect(r > 0.5 ? x + 3 : x - 1, yy - 1, r > 0.5 ? x + 3 : x - 1, yy + 3, cam); R.pset(r > 0.5 ? x + 3 : x - 1, yy - 2, pi); }
      else if (o.moviles && r > 1 - o.moviles * 0.1 && Math.sin(t * 2.2 + r * 60) > -0.2) { R.rect(x + 3, yy - 1, x + 3, yy + 1, MOVIL); }
      continue; }
    R.rect(x, yy + 2, x + 1, yy + 3, cam); R.rect(x, yy, x + 1, yy + 1, PIEL[Math.floor(hs(x, fy, 7) * 5)]);
    if (s > 1.2) { R.pset(r > 0.5 ? x + 2 : x - 1, yy, cam); R.pset(r > 0.5 ? x + 2 : x - 1, yy - 1, PIEL[0]); }
    else if (o.moviles && r > 1 - o.moviles * 0.1 && Math.sin(t * 2.2 + r * 60) > -0.2) { R.pset(x + 1, yy - 1, MOVIL); R.pset(x + 1, yy - 2, hex('#9aa0c8')); }
  }
};
'''

# ── FA-PREGUNTA ───────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-pregunta'] = ('La pregunta', '''// FA-PREGUNTA (frase 5), hoy (2026). Cuatro planos:
// 1. «Today, every Sunday, a quarterback throws that same pass»: el estadio de hoy de noche, de lejos; el saque, la línea
//    que empuja, el quarterback retrocede y lanza en «throws»; el balón sube en espiral por encima de la grada y sale por
//    arriba; el receptor arranca por la banda con un defensa detrás. Corta en «A ball».
// 2. «a ball spinning about 600 times a minute that, halfway through its flight»: cámara lenta en el cielo de la noche,
//    sobre el borde del estadio (focos con polillas, banderas, la skycam, un avión, nubes a tres velocidades y el público
//    de la grada alta): el balón grande cruza girando despacio; en «600» sale el número y un aro que gira; en «halfway»
//    llega arriba y la estela marca el arco. Corta tras «flight» (fondo local).
// 3. «tips its nose down as if it knows where it's going»: la zona de anotación, con la portería amarilla, la grada de
//    detrás y los fotógrafos; el balón entra por arriba, baja la punta en «Tips … down» y cae en las manos del receptor
//    en «going»; touchdown: brazos arriba, la grada salta, los flashes (fondo local).
// 4. «How does it do that? And why is it shaped so strangely?»: inserto sobre el estadio en penumbra: el balón grande
//    flota y gira; «?» en «How»; en «shaped» un círculo de puntos (la pelota redonda) se dibuja a su alrededor y otro
//    «?» en «strangely»; abajo, el receptor mira el balón que tiene en la mano y el quarterback llega y se encoge.''', COMUN + r'''
const p = (f) => en('pregunta', f);
const P2 = p(0.2587), P3 = p(0.5442), P4 = p(0.7932);
const lanza = p(0.1304), seiscientos = p(0.3252), mitad = p(0.4686), baja = p(0.5735), bajaFin = p(0.6413), atrapa = p(0.7290), como = P4, forma = p(0.9203), rara = p(0.9464);

// 1 · el estadio de noche: el saque y el lanzamiento
const p1 = (t) => {
  T.estadioHoy(R, t, { moviles: 0.7 });
  const empuja = Math.round(Math.sin(t * 9) * 1.2), salida = tramo(t, 0.35, 1.0);
  // la defensa (granate) al otro lado de la línea, de lejos a cerca; el ataque empuja
  const defensa = [[142, 140], [146, 154], [142, 168]], ataque = [[120, 141], [122, 155], [120, 169]];
  const qbx = Math.round(lerp(104, 78, tramo(t, 0.5, 1.7))), qby = 156;
  const vr = tramo(t, 0.8, P2), rx = Math.round(lerp(196, 330, vr)), dfx = Math.round(lerp(182, 318, tramo(t, 1.1, P2)));
  const gente = [];
  defensa.forEach(([x, y], k) => gente.push([y, () => R.actor(EL.liniero, x - (salida > 0 ? 3 + empuja : 0), y, t, { dir: -1, enfado: salida > 0, salto: k === 1 && t > lanza - 0.3 && t < lanza + 0.2 ? 2 : 0, dedo: k === 1 && t > lanza - 0.3 && t < lanza + 0.4 })]));
  ataque.forEach(([x, y], k) => gente.push([y, () => R.actor(k === 1 ? EL.pateador : EL.quarterback, x + (salida > 0 ? 3 + empuja : 0), y, t, { dir: 1, pal: k === 1 ? undefined : { H: '#3a2418', h: '#5a3a24' } })]));
  gente.push([136, () => R.actor(EL.receptor, rx, 136, t, { dir: 1, anda: vr > 0 && vr < 1 })]);
  gente.push([131, () => R.actor(EL.liniero, dfx, 131, t, { dir: 1, anda: t > 1.1 && dfx < 320, pal: { H: '#6e4224', h: '#8a5a34' } })]);
  let qb; gente.push([qby, () => { qb = R.actor(EL.quarterback, qbx, qby, t, { dir: 1, anda: t > 0.5 && t < 1.7, habla: t < 0.6 && Math.sin(t * 14) > 0, dedo: t > lanza - 0.45 && t < lanza + 0.5 }); }]);
  gente.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
  // el balón: en las manos del quarterback hasta «throws», luego sube en espiral hacia la derecha y sale por arriba
  if (t < lanza - 0.45) T.balon(R, qbx + 12, qby - 13, t, { ang: -0.3 });
  else if (t < lanza) { T.balon(R, qbx + 14, qby - 31, t, { ang: -0.6 }); }
  else { const u = (t - lanza) / 1.35; if (u < 1) { const x = lerp(qbx + 16, 262, u), y = lerp(qby - 32, -8, u) - 30 * Math.sin(Math.PI * u) * 0.4; T.balon(R, Math.round(x), Math.round(y), t, { ang: lerp(-0.75, -0.5, u), gira: 10, estela: 1.2 }); } }
  T.h_estadioDelante(R, t);
};

// 2 · cámara lenta en el cielo, sobre el borde del estadio (fondo local)
const N = H(['#070b22', '#0b1130', '#11183e', '#1a1f4c', '#262859', '#353064', '#4a3a6c', '#5e4672']);
const NUB = [H(['#141a3c', '#1c2248', '#262c58']), H(['#1e2350', '#2a2e60', '#3a3a70']), H(['#2a2c5c', '#3a3a6e', '#57507e'])];
const AC = H(['#1a1c28', '#2c3040', '#3e4458', '#5a6276', '#8a94a8']);
const borde = (x) => Math.round(126 + ((x - 160) / 160) ** 2 * 7);
const FOCOS = [[54, 22], [238, 22]];
const cielo2 = () => fijo('cielo2', () => {
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(x, y, Math.min(1, y / 128) ** 1.25, N));
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const r = hs(x, y, 1); if (r < 0.0045) R.pset(x, y, r < 0.0015 ? hex('#e8ecff') : hex('#8a90c0')); }
  // el resplandor de la ciudad: una banda tramada sobre el borde
  for (let y = 100; y < 130; y++) for (let x = 0; x < 320; x++) if (dz(x, y) < (y - 100) / 60 && hs(x >> 1, y, 4) < 0.6) R.pset(x, y, hex('#6a4a74'));
  // la marquesina del estadio: la viga con su celosía y el anillo de luces
  for (let x = 0; x < 320; x++) { const b = borde(x); for (let y = b; y < b + 7; y++) R.pset(x, y, y === b ? AC[3] : y === b + 6 ? AC[0] : ((x + y * 2) % 8 < 2 || (x - y * 2 + 64) % 8 < 2) ? AC[2] : AC[1]); if (x % 5 === 0) R.pset(x, b + 3, hex('#fff2c0')); }
  // la grada alta: escalones de hormigón y el pasamanos
  for (let x = 0; x < 320; x++) for (let y = borde(x) + 7; y < 180; y++) R.pset(x, y, (y - borde(x)) % 4 === 0 ? AC[2] : AC[1]);
  // las torres de focos sobre la marquesina: mástil de celosía y la batería
  for (const [fx, w] of FOCOS) { const b = borde(fx); for (let y = b - 34; y < b; y++) { R.pset(fx - 2, y, AC[3]); R.pset(fx + 2, y, AC[3]); if ((y + fx) % 5 === 0) R.linea(fx - 2, y, fx + 2, y + 3, AC[2]); }
    const y0 = b - 50; R.rect(fx - w / 2 - 2, y0 - 2, fx + w / 2 + 2, y0 + 14, AC[0]); R.rect(fx - w / 2 - 1, y0 - 1, fx + w / 2 + 1, y0 + 13, AC[2]);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) { const lx = fx - w / 2 + 1 + i * 4.4, ly = y0 + j * 4.4; R.rect(Math.round(lx), Math.round(ly), Math.round(lx) + 2, Math.round(ly) + 2, hex('#fff8dc')); R.pset(Math.round(lx), Math.round(ly), hex('#ffffff')); } }
  // los mástiles de las banderas
  for (const bx of [16, 112, 196, 300]) { const b = borde(bx); R.linea(bx, b - 26, bx, b, AC[3]); R.pset(bx, b - 27, hex('#c8a040')); }
});
const halo = (cx, cy, r, c, k) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.2) / r; if (d < 1 && dz(cx + i, cy + j) < (1 - d) * k) R.pset(cx + i, cy + j, c); } };
const p2 = (t) => {
  cielo2();
  // las nubes: tres capas a tres velocidades
  for (let k = 0; k < 5; k++) nube(((k * 89 + t * 2) % 420) - 50, 22 + ((k * 13) % 17), 22 + ((k * 29) % 18), NUB[0], k);
  for (let k = 0; k < 3; k++) nube(((k * 141 + 60 + t * 6) % 440) - 60, 50 + k * 13, 36 + k * 9, NUB[1], k + 10);
  for (let k = 0; k < 2; k++) nube(((k * 230 + 20 + t * 13) % 480) - 80, 92 + k * 10, 52 + k * 12, NUB[2], k + 20);
  // un avión que cruza con sus luces
  { const ax = Math.round(330 - ((t * 9) % 420)), ay = 36 + Math.round(ax * 0.02); if (ax > 0 && ax < 276) { R.rect(ax - 3, ay, ax + 3, ay, hex('#8a90a8')); R.pset(ax - 1, ay - 1, hex('#8a90a8')); R.pset(ax, ay + 1, hex('#5a607a')); if (Math.floor(t * 3) % 2) R.pset(ax - 3, ay, hex('#ff5a4a')); else R.pset(ax + 3, ay, hex('#7affb0')); } }
  // los halos de los focos (laten) y las polillas
  for (const [fx, w] of FOCOS) { const y0 = borde(fx) - 50; halo(fx, y0 + 6, 26, hex('#c8b890'), 0.45 + 0.05 * Math.sin(t * 7 + fx)); halo(fx, y0 + 6, 16, hex('#fff2c8'), 0.5);
    for (let k = 0; k < 5; k++) { const a = t * (2.4 + k * 0.5) + k * 1.7; R.pset(Math.round(fx + Math.cos(a) * (12 + k * 2)), Math.round(y0 + 6 + Math.sin(a * 1.3) * 9), hex('#f8f0d8')); } }
  // la skycam colgada de sus cables, que se pasea
  { const cx = Math.round(150 + Math.sin(t * 0.5) * 40), cy = 104; R.linea(-10, 70, cx, cy - 3, AC[2]); R.linea(330, 64, cx, cy - 3, AC[2]); R.rect(cx - 3, cy - 3, cx + 3, cy + 2, AC[0]); R.rect(cx - 2, cy - 2, cx + 2, cy + 1, AC[3]); R.pset(cx, cy + 1, hex('#3ac8e8')); if (Math.floor(t * 2) % 2) R.pset(cx + 2, cy - 2, hex('#ff4a3a')); }
  // las banderas, que ondean
  for (const [bx, c] of [[16, '#1e8a8a'], [112, '#8a2a3a'], [196, '#1e8a8a'], [300, '#e8783a']]) { const b = borde(bx) - 26; for (let i = 1; i <= 9; i++) { const o = Math.round(Math.sin(t * 6 - i * 0.7 + bx) * 1.4 * i / 9); R.linea(bx + i, b + o, bx + i, b + 5 + o, hex(i % 3 === 0 ? '#f2eee2' : c)); } }
  // el público de la grada alta, que se pone de pie y levanta los móviles cuando pasa el balón
  const u = tramo(t, P2, P3), bx = lerp(10, 300, u);
  publico(0, 319, 140, 179, t, { moviles: 0.6, vacio: 0.12, salta: (x, y, r) => (Math.abs(x - bx) < 40 ? 2 : 0) + (Math.sin(t * 9 + r * 30) > 0.6 ? 1 : 0), pasillo: (x) => ((x + 20) % 80) < 3 });
  T.tinte(R, 140, 179, [10, 12, 30], 0.3);
  for (let x = 0; x < 320; x++) { R.pset(x, 139, AC[3]); if (x % 6 === 0) R.linea(x, 139, x, 142, AC[2]); }
  // la estela de puntos (el arco) y el balón grande, a cámara lenta
  const pos = (v) => { const a = (v - 0.73) / 0.73; return [lerp(4, 286, v), 114 - 50 * (1 - a * a)]; };
  for (let v = 0; v < u - 0.04; v += 0.018) { const [x, y] = pos(v); R.pset(Math.round(x), Math.round(y), hex(t > mitad ? '#ffd860' : '#c8c8e8')); }
  const [x, y] = pos(u), [x2, y2] = pos(u + 0.01), ang = Math.atan2(y2 - y, x2 - x);
  // el aro del giro: puntos que corren alrededor del eje largo (la mitad de atrás va detrás del balón)
  const aro = (delante) => { for (let k = 0; k < 28; k++) { const th = k / 28 * Math.PI * 2 + t * 4, cu = Math.cos(th); if ((cu > 0) !== delante || k % 2) continue; const lu = -10 + cu * 4, lv = Math.sin(th) * 19; R.pset(Math.round(x + lu * Math.cos(ang) - lv * Math.sin(ang)), Math.round(y + lu * Math.sin(ang) + lv * Math.cos(ang)), hex('#ffd860')); } };
  const vis = t > seiscientos - 0.1;
  if (vis) aro(false);
  T.balon(R, Math.round(x), Math.round(y), t, { s: 4, ang, gira: 0.55, estela: 0.8 });
  if (vis) { aro(true); const e = tramo(t, seiscientos, seiscientos + 0.3); R.numero('600', 112, Math.round(52 - e * 6), { tam: 16, centro: true }); }
};

// 3 · la zona de anotación: el balón baja la punta y cae en las manos (fondo local)
const VB = [190, 8, 266, 30], YEL = H(['#b88a10', '#e8b820', '#ffe060']);
const zona3 = () => fijo('zona3', () => {
  // el techo: la cara de abajo de la cubierta, con su celosía y el anillo de luces
  for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(x, y, y / 34, H(['#0c0e1a', '#141826', '#1c2132', '#252b3e'])));
  for (let x = -40; x < 360; x += 24) { R.linea(x, 0, x + 12, 32, hex('#2c3246')); R.linea(x + 24, 0, x + 12, 32, hex('#2c3246')); }
  for (let x = 2; x < 320; x += 6) R.pset(x, 32, hex('#fff0c0'));
  // el videomarcador: marco, pantalla (se pinta encima) y sus tirantes
  R.rect(VB[0] - 2, VB[1] - 2, VB[2] + 2, VB[3] + 2, hex('#0a0a12')); R.linea(VB[0] + 6, 0, VB[0] + 6, VB[1] - 2, hex('#3e4458')); R.linea(VB[2] - 6, 0, VB[2] - 6, VB[1] - 2, hex('#3e4458'));
  // la fascia de la grada alta (su cinta de LED se pinta encima)
  R.rect(0, 34, 319, 39, hex('#2c3040')); R.rect(0, 34, 319, 34, hex('#5a6276'));
  // el muro acolchado y la banda de LED
  R.rect(0, 98, 319, 106, hex('#1c2a3a')); R.rect(0, 98, 319, 98, hex('#5a6276')); R.rect(0, 105, 319, 106, hex('#146464'));
  // el césped de la zona de anotación: franjas de corte, la pintura de rayas diagonales y las líneas de cal
  const G = H(['#2e5e26', '#3a6e2e', '#4a8a3a', '#5a9a44']);
  for (let y = 107; y < 180; y++) for (let x = 0; x < 320; x++) { const franja = Math.floor((y - 107) / 12) % 2, n = hs(x, y, 2);
    let c = G[1 + franja + (n < 0.18 ? -1 : n > 0.9 ? 1 : 0)];
    if (y >= 114 && y < 166 && x > 18 && x < 302 && ((x + (y - 114) * 1.6) % 28) < 13) c = n < 0.15 ? hex('#146464') : n > 0.94 ? hex('#3aa8a0') : hex('#1e8a8a');
    R.pset(x, y, c); }
  R.rect(0, 111, 319, 113, hex('#f2f2ea')); R.rect(0, 166, 319, 169, hex('#f2f2ea')); for (let x = 0; x < 320; x += 3) { R.pset(x, 113, hex('#c8c8b8')); R.pset(x + 1, 169, hex('#c8c8b8')); }
  for (let y = 107; y < 180; y++) { R.pset(10, y, hex('#f2f2ea')); R.pset(11, y, hex('#f2f2ea')); R.pset(308, y, hex('#f2f2ea')); R.pset(309, y, hex('#f2f2ea')); }
  // los conos (pylons) naranjas de las esquinas
  for (const [x, y] of [[10, 113], [308, 113], [10, 169], [308, 169]]) { R.rect(x - 2, y - 7, x + 2, y, hex('#e8783a')); R.rect(x - 2, y - 7, x - 1, y, hex('#f8a060')); R.rect(x + 2, y - 7, x + 2, y, hex('#b8582a')); }
  // la portería: el poste acolchado, el cuello de cisne, el larguero y los palos
  sombraSuelo(160, 113, 6, hex('#2a4a22'));
});
const p3 = (t) => {
  zona3();
  // la cinta de LED de la fascia y la banda del muro, que corren
  for (let x = 0; x < 320; x++) { const k = Math.floor((x + t * 30) / 6) % 3; R.pset(x, 36, hex(['#1e8a8a', '#e8783a', '#f2eee2'][k])); R.pset(x, 37, hex(['#146464', '#b8582a', '#c8c8c0'][k])); }
  for (let x = 0; x < 320; x++) if (((x - t * 40) % 16 + 16) % 16 < 8) { R.pset(x, 101, hex('#3ac8e8')); R.pset(x + 1, 102, hex('#3ac8e8')); R.pset(x, 103, hex('#3ac8e8')); }
  // el videomarcador: la repetición del arco con el balón pequeño
  for (let y = VB[1]; y <= VB[3]; y++) for (let x = VB[0]; x <= VB[2]; x++) R.pset(x, y, rampa(x, y, (y - VB[1]) / 22, H(['#0e1a2e', '#14304a', '#1a4a3a', '#2a6a3a'])));
  { const v = ((t * 0.5) % 1); for (let k = 0; k <= 20; k++) { const w = k / 20; if (w > v) break; R.pset(VB[0] + 6 + Math.round(w * 64), VB[3] - 4 - Math.round(16 * Math.sin(Math.PI * w)), hex('#ffd860')); } R.disco(VB[0] + 6 + Math.round(v * 64), VB[3] - 4 - Math.round(16 * Math.sin(Math.PI * v)), 1, hex('#b65c30')); }
  // la grada de detrás de la portería: salta cuando el receptor atrapa
  const fiesta = tramo(t, atrapa, atrapa + 0.3);
  publico(0, 319, 40, 97, t, { g: 2, moviles: 0.5, salta: (x, y, r) => fiesta > 0 ? (Math.sin(t * 14 + r * 40) > 0 ? 2 : 0) : (r > 0.96 && Math.sin(t * 6 + x) > 0 ? 1 : 0), pasillo: (x, y) => Math.abs(((x + 40) % 106) - 53) < 2 + (y - 40) / 30 });
  // la portería: el poste acolchado, el larguero y los palos (delante de la grada)
  { const Y = YEL; R.rect(157, 76, 162, 112, Y[1]); R.rect(157, 76, 157, 112, Y[2]); R.rect(162, 76, 162, 112, Y[0]);
  R.rect(155, 96, 164, 112, hex('#1e2a3a')); R.rect(155, 96, 155, 112, hex('#3a4a5a')); R.rect(155, 100, 164, 100, hex('#2a3a4a')); R.rect(155, 106, 164, 106, hex('#2a3a4a'));
  R.rect(130, 72, 190, 75, Y[1]); R.rect(130, 72, 190, 72, Y[2]); R.rect(130, 75, 190, 75, Y[0]);
  for (const ux of [130, 188]) { R.rect(ux, 40, ux + 2, 74, Y[1]); R.rect(ux, 40, ux, 74, Y[2]); R.rect(ux + 2, 40, ux + 2, 74, Y[0]); }
  for (const ux of [130, 188]) { const o = Math.round(Math.sin(t * 5 + ux) * 1.2); R.linea(ux + 1, 39, ux + 4 + o, 33, hex('#e8783a')); R.linea(ux + 2, 39, ux + 5 + o, 34, hex('#b8582a')); } }
  for (const vx of [27, 239]) { R.rect(vx - 7, 84, vx + 7, 97, hex('#0a0c14')); R.rect(vx - 7, 84, vx + 7, 84, hex('#5a6276')); R.rect(vx - 6, 92, vx + 6, 97, hex('#141826')); }
  // los fotógrafos de rodillas tras la línea de fondo, con sus flashes
  for (const [fx, k] of [[36, 0], [74, 1], [214, 2], [262, 3], [290, 4]]) { const y = 110; R.rect(fx, y - 5, fx + 3, y - 1, hex('#2a2a36')); R.rect(fx + 1, y - 8, fx + 2, y - 6, PIEL[k % 5]); R.rect(fx + 4, y - 6, fx + 7, y - 4, hex('#1a1a22')); R.pset(fx + 8, y - 5, hex('#5a6a8a'));
    if ((t > atrapa && t < atrapa + 1.2 && Math.sin(t * 11 + k * 2.1) > 0.7) || Math.sin(t * 2.3 + k * 3.7) > 0.985) { R.disco(fx + 9, y - 5, 2, hex('#ffffff')); R.pset(fx + 12, y - 5, hex('#ffffff')); R.pset(fx + 9, y - 9, hex('#ffffff')); } }
  // el receptor corre hacia la zona y atrapa en «going»; un defensa llega tarde
  const rx = Math.round(lerp(100, 196, tramo(t, P3, atrapa))) + Math.round(lerp(0, 16, tramo(t, atrapa, atrapa + 0.6))), ry = 160;
  const dx = Math.round(lerp(40, 160, tramo(t, P3 + 0.2, atrapa + 0.5)));
  sombraSuelo(dx + 7, 165, 6, hex('#2a4a22')); R.actor(EL.liniero, dx, 165, t, { dir: 1, anda: t < atrapa + 0.5, sorpresa: t > atrapa, triste: t > atrapa + 1.2 });
  sombraSuelo(rx + 7, ry, 6, hex('#2a4a22'));
  const brazos = t > atrapa - 0.45, gol = t > atrapa + 0.7;
  R.actor(EL.receptor, rx, ry, t, { dir: 1, anda: t < atrapa + 0.6, brazos, salto: gol && Math.sin(t * 12) > 0 ? 2 : 0, sonrisa: t > atrapa });
  // el balón: entra por arriba casi plano, baja la punta en «Tips … down» y cae entre las manos
  const meta = [rx + 7 + 1, ry - 33];
  if (t < atrapa) { const u = tramo(t, P3, atrapa), x = lerp(-14, meta[0], u), y = lerp(18, meta[1], u * u), ang = Math.atan2(2 * u * (meta[1] - 18), meta[0] + 14) * (0.35 + 0.65 * tramo(t, baja - 0.2, bajaFin));
    for (let k = 1; k < 9; k++) { const w = u - k * 0.05; if (w < 0) break; R.pset(Math.round(lerp(-14, meta[0], w)), Math.round(lerp(18, meta[1], w * w)), hex('#f2eee2')); }
    T.balon(R, Math.round(x), Math.round(y), t, { s: 2, ang, gira: 1.6, estela: 0.7 }); }
  else T.balon(R, meta[0] + 1, meta[1] + (gol ? -2 : 3), t, { s: 2, ang: gol ? -1.2 : 0.5 });
};

// 4 · inserto: el balón grande flota sobre el estadio en penumbra; «?» y la pelota redonda de puntos
const p4 = (t) => {
  T.estadioHoy(R, t, { moviles: 0.3 }); T.h_estadioDelante(R, t);
  T.tinte(R, 0, 179, [8, 10, 26], 0.62);
  // la luz del cañón sobre los dos jugadores
  for (let y = 150; y < 176; y++) for (let x = 100; x < 222; x++) { const d = Math.hypot((x - 160) / 62, (y - 166) / 12); if (d < 1 && dz(x, y) < (1 - d) * 0.8) R.pset(x, y, hex(d < 0.6 ? '#3e7a34' : '#2e5a28')); }
  const cx = 160, cy = 76 + Math.round(Math.sin(t * 1.6) * 2), ang = 0.18 * Math.sin(t * 0.9);
  // el resplandor detrás del balón
  for (let j = -34; j <= 34; j++) for (let i = -50; i <= 50; i++) { const d = Math.hypot(i / 50, j / 34); if (d < 1 && dz(cx + i, cy + j) < (1 - d) * 0.5) R.pset(cx + i, cy + j, hex('#2a3060')); }
  const circ = tramo(t, forma, forma + 0.5);
  if (circ > 0) for (let k = 0; k < 64 * circ; k++) { if (k % 2) continue; const a = k / 64 * Math.PI * 2 - Math.PI / 2; R.pset(Math.round(cx + Math.cos(a) * 25), Math.round(cy + Math.sin(a) * 25), hex('#f2eee2')); }
  T.balon(R, cx, cy, t, { s: 4.4, ang, gira: 0.3 });
  const q1 = tramo(t, como, como + 0.25), q2 = tramo(t, rara, rara + 0.25);
  if (q1 > 0) R.icono('?', 204, Math.round(62 - q1 * 8), hex('#ffd860'), hex('#1a1424'), 3);
  if (q2 > 0) R.icono('?', 102, Math.round(62 - q2 * 8), hex('#ffd860'), hex('#1a1424'), 3);
  // abajo: el receptor gira el balón en la mano; el quarterback llega y se encoge de hombros
  sombraSuelo(140, 168, 7, hex('#1e3a1c')); const rec = R.actor(EL.receptor, 132, 168, t, { dir: 1, dedo: true, sorpresa: t > como && t < como + 1.4 });
  T.balon(R, rec.mano[0], rec.mano[1] + 1, t, { ang: Math.sin(t * 3) * 0.8 });
  const qx = Math.round(lerp(240, 170, tramo(t, P4 + 0.1, P4 + 1.4))); sombraSuelo(qx + 7, 168, 7, hex('#1e3a1c'));
  R.actor(EL.quarterback, qx, 168, t, { dir: -1, anda: t > P4 + 0.1 && t < P4 + 1.4, habla: t > P4 + 1.5 && t < forma && Math.sin(t * 12) > 0, brazos: t > forma && t < forma + 0.9, pal: { H: '#3a2418', h: '#5a3a24' } });
};

const efectos = [[lanza, 'whoosh'], [P2 + 0.15, 'whoosh'], [seiscientos, 'pop'], [atrapa, 'palmada'], [atrapa + 0.25, 'flash'], [como + 0.05, 'pop'], [rara, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

# ── FA-HOLA ───────────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-hola'] = ('Hola', '''// FA-HOLA (frase 6), hoy. Un plano: el césped a ras de suelo con el estadio vacío detrás. El balón entra dando
// botes por la izquierda y se para en el centro en «Atom», mece y gira sobre su eje; al fondo, el operario pinta una raya
// con su carro y el cortacésped pasa; en «Let's find out» se encienden los focos, uno tras otro, y el balón da un saltito.''', COMUN + r'''
const h = (f) => en('hola', f);
const para = h(0.1393), luces = h(0.7969);
const p1 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'cesped' });
  // los focos del estadio que se encienden en «Let's find out»
  [[30, 34], [66, 30], [104, 34], [196, 34], [236, 30]].forEach(([fx, fy], k) => { const e = tramo(t, luces + k * 0.12, luces + k * 0.12 + 0.2); if (e <= 0) return;
    for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j) / 12; if (d < 0.45 * e) R.pset(fx + i, fy + j, hex(d < 0.25 ? '#ffffff' : '#fff6d8')); else if (d < 1 && dz(fx + i, fy + j) < (1 - d) * 0.6 * e) R.pset(fx + i, fy + j, hex('#f0dca0')); } });
  // al fondo, el operario empuja el carro de pintar y deja la raya fresca
  const ox = Math.round(lerp(40, 150, tramo(t, 0.2, 5.8)));
  for (let x = 30; x < ox - 2; x++) R.pset(x, 96, hex('#f8f8f0'));
  R.rect(ox - 3, 92, ox + 3, 95, hex('#c8c8d0')); R.rect(ox - 3, 92, ox + 3, 92, hex('#e8e8f0')); R.pset(ox - 2, 96, hex('#2a2a2a')); R.pset(ox + 2, 96, hex('#2a2a2a')); R.linea(ox - 3, 92, ox - 7, 87, hex('#5a5a66'));
  R.actor(EL.obrero, ox - 21, 97, t, { dir: 1, anda: true });
  // la bolsa de balones y el soporte de patada, en primer término a la izquierda
  R.rect(50, 150, 58, 156, hex('#e8783a')); R.rect(50, 150, 58, 150, hex('#f8a060')); R.poligono([[49, 157], [54, 150], [59, 157]], hex('#e8783a')); R.pset(54, 151, hex('#b8582a'));
  R.rect(252, 140, 278, 158, hex('#1a1a22')); R.rect(253, 141, 277, 157, hex('#2c2c38')); R.rect(253, 141, 277, 142, hex('#4a4a5a')); for (const bx of [258, 266, 273]) T.balon(R, bx, 139, t, { ang: -0.5 + (bx % 3) * 0.3 });
  R.linea(256, 141, 262, 132, hex('#1a1a22')); R.linea(274, 141, 268, 132, hex('#1a1a22')); R.linea(262, 132, 268, 132, hex('#1a1a22'));
  sombraSuelo(160, 149, 13, hex('#2e5a26'));
  // el balón: entra dando botes, se para en «Atom», mece y gira; salta en «Let's find out»
  if (t < para) { const u = tramo(t, 0, para), x = lerp(-20, 160, u), b = Math.abs(Math.sin(u * Math.PI * 2.5)) * 22 * (1 - u); T.balon(R, Math.round(x), Math.round(140 - b), t, { s: 3, volteretas: true, fase: 0.4 }); }
  else { const d = t - para, mece = Math.sin(d * 7) * 0.22 * Math.exp(-d * 1.1), salto = tramo(t, luces, luces + 0.25) - tramo(t, luces + 0.25, luces + 0.5);
    T.balon(R, 160, 140 - Math.round(salto * 8), t, { s: 3, ang: mece, giro: 0.15 + 1.2 * (1 - Math.exp(-d * 0.9)) + tramo(t, luces, luces + 0.5) * 0.5 }); }
  T.h_estadioDelante(R, t, { encuadre: 'cesped' });
};
const efectos = [[0.35, 'golpecito'], [0.8, 'golpecito'], [luces, 'interruptor'], [luces + 0.36, 'interruptor']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')

# ── FA-SUPERBOWL ──────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-superbowl'] = ('La Super Bowl', '''// FA-SUPERBOWL (frase 34), hoy (2026 → 2027). Tres planos:
// 1. «Right now, the 2026 season is on the road to»: el mapa de EE. UU.; caen las chinchetas de las ciudades de la liga
//    en «season»; de cada una sale una ruta de puntos hacia Inglewood y un balón pequeño viaja por la de Nueva York; el
//    mapa se acerca al oeste. Corta en «Super».
// 2. «Super Bowl 61, which will be played on February 14»: el cuarto de un aficionado de noche (fondo local): el chico
//    clava la entrada «61» en el corcho en «61», pasa las hojas del calendario en «played on» y en «14th» salta y rodea
//    el 14 (con su corazón) en rojo; el gato del escritorio lo mira; por la ventana, los reflectores del estadio.
// 3. «2027, at SoFi Stadium, near Los Angeles»: la explanada del estadio de la final con su techo translúcido; «2027» en
//    el cielo; el chico y su padre llegan con la entrada y en «Stadium» el chico señala el techo; el avión baja hacia el
//    aeropuerto en «near Los Angeles».''', COMUN + r'''
const s = (f) => en('superbowl', f);
const P2 = s(0.2932), P3 = s(0.6544);
const temporada = s(0.1546), camino = s(0.2535), sesenta = s(0.3446), jugara = s(0.4495), febrero = s(0.5160), catorce = s(0.5508), estadio = s(0.7902), cerca = s(0.9070);

// 1 · el mapa: las ciudades de la liga y las rutas hacia Inglewood
const CIUDADES = [[-93.27, 44.98], [-87.95, 44.5], [-74.0, 40.71], [-94.58, 39.1], [-104.99, 39.74], [-96.8, 32.8], [-80.2, 25.8], [-84.39, 33.75]];
const COLS = H(['#1e8a8a', '#8a2a3a', '#e8783a', '#2a3458', '#c8a040', '#146464', '#641e2a', '#3a6ac8']);
const p1 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  R.recorte([10, 9, 309, 170]);
  const [ix, iy] = P(T.LUGARES.inglewood);
  const arco = (x, y) => { const mx = lerp(x, ix, 0.5), my = Math.min(y, iy) - 10 - Math.abs(x - ix) * 0.12, pts = []; for (let k = 0; k <= 12; k++) { const u = k / 12; pts.push([Math.round((1 - u) * (1 - u) * x + 2 * u * (1 - u) * mx + u * u * ix), Math.round((1 - u) * (1 - u) * (y - 2) + 2 * u * (1 - u) * my + u * u * (iy - 2))]); } return pts; };
  CIUDADES.forEach((c, k) => { const [x, y] = P(c), r = tramo(t, temporada + 0.2 + k * 0.1, camino + 0.3 + k * 0.05);
    if (r > 0) R.ruta(arco(x, y), r, COLS[k], { grueso: 1, flecha: false }); });
  CIUDADES.forEach((c, k) => { const [x, y] = P(c); T.chincheta(R, Math.round(x), Math.round(y), t, COLS[k], { baja: tramo(t, 0.4 + k * 0.16, 0.75 + k * 0.16) }); });
  // el balón que viaja por la ruta de Nueva York
  const v = tramo(t, temporada + 0.3, P2 - 0.15); if (v > 0 && v < 1) { const [nx, ny] = P(CIUDADES[2]), pts = arco(nx, ny), q = v * 12, i = Math.min(11, Math.floor(q)), f = q - i, a = [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)];
    T.balon(R, Math.round(a[0]), Math.round(a[1]) - 4, t, { ang: Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0]), gira: 3, estela: 0.6 }); }
  T.chincheta(R, Math.round(ix), Math.round(iy), t, hex('#ffd860'), { baja: tramo(t, 0.2, 0.5), pulso: t > camino });
  R.recorte(null);
};

// 2 · el cuarto del aficionado, de noche (fondo local)
const MAD = H(['#3e2414', '#5a361e', '#6e4428', '#845634', '#9a6a40']);
const CAL = [128, 92, 172, 140], CORCHO = [62, 98, 104, 136], VEN = [204, 16, 262, 60];
const cuarto = () => fijo('cuarto', () => {
  // la pared de tablas de madera con sus vetas, el friso y el zócalo
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 14), xx = x % 14, n = hs(tabla, Math.floor(y / 3) + Math.floor(Math.sin(y * 0.15 + tabla) * 2), 9);
    let c = MAD[2]; if (xx === 0) c = MAD[0]; else if (xx === 1) c = MAD[3]; else if (n < 0.12) c = MAD[1]; else if (n > 0.93) c = MAD[3];
    if (y > 118) c = xx === 0 ? MAD[0] : (n < 0.2 ? MAD[0] : MAD[1]); R.pset(x, y, c); }
  R.rect(0, 116, 319, 118, MAD[4]); R.rect(0, 118, 319, 118, MAD[0]);
  // el suelo: la alfombra de rayas sobre la tarima
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (y - 150) % 5 === 0 ? MAD[0] : hs(Math.floor(x / 22) + (y - 150) / 5 * 7, 3, 1) < 0.3 ? MAD[2] : MAD[1]; R.pset(x, y, c); }
  R.rect(0, 148, 319, 150, MAD[0]);
  for (let y = 158; y < 180; y++) for (let x = 14; x < 196; x++) { const b = Math.floor((y - 158) / 3) % 3; R.pset(x, y, ((x + y) % 7 === 0) ? hex('#4a2a2a') : b === 0 ? hex('#8a2a3a') : b === 1 ? hex('#a84a4a') : hex('#c8a060')); }
  R.rect(14, 157, 195, 157, hex('#c8a060')); for (let x = 14; x < 196; x += 3) R.pset(x, 180 - 1, hex('#e8d8a0'));
  // los banderines de los dos equipos inventados (sin letras: rayas y una estrella)
  const banderin = (x, y, w, c, c2) => { for (let i = 0; i < w; i++) { const hh = Math.round(8 * (1 - i / w)); R.linea(x + i, y - hh, x + i, y + hh, i % 7 < 2 ? hex(c2) : hex(c)); } R.rect(x - 2, y - 9, x - 1, y + 9, hex('#e8e0c8')); R.pset(x - 2, y - 10, hex('#c8c0a8')); };
  banderin(22, 30, 40, '#1e8a8a', '#e8783a'); banderin(80, 22, 34, '#8a2a3a', '#f2eee2');
  // el cuadro con el estadio de noche
  R.rect(22, 54, 86, 92, hex('#c8a040')); R.rect(23, 55, 85, 91, hex('#8a6a28')); R.rect(25, 57, 83, 89, hex('#0e1430'));
  for (let x = 25; x <= 83; x++) { const yb = 74 + Math.round(((x - 54) / 29) ** 2 * 6); for (let y = yb; y <= 89; y++) R.pset(x, y, y > 84 ? hex('#3a7a2e') : ((x + y) % 3 ? hex('#2a2e4a') : hex('#e8783a'))); }
  for (const fx of [32, 54, 76]) { R.rect(fx - 2, 64, fx + 2, 66, hex('#fff8dc')); R.linea(fx, 67, fx, 74, hex('#5a6276')); }
  // la ventana con la noche (los reflectores se pintan encima)
  R.rect(VEN[0] - 3, VEN[1] - 3, VEN[2] + 3, VEN[3] + 5, hex('#e8e0d0')); R.rect(VEN[0] - 3, VEN[3] + 3, VEN[2] + 3, VEN[3] + 5, hex('#c8c0b0'));
  for (let y = VEN[1]; y <= VEN[3]; y++) for (let x = VEN[0]; x <= VEN[2]; x++) R.pset(x, y, rampa(x, y, (y - VEN[1]) / 44, H(['#0a0e28', '#141a40', '#262a5a', '#4a3a6a', '#7a4a6a'])));
  for (let x = VEN[0]; x <= VEN[2]; x++) { const yb = 52 - Math.round(hs(Math.floor(x / 5), 0, 3) * 10); for (let y = yb; y <= VEN[3]; y++) R.pset(x, y, ((x * 3 + y * 5) % 11 === 0) ? hex('#f8d870') : hex('#1a1a2e')); }
  for (let x = 236; x <= 258; x++) { const yb = 46 + Math.round(((x - 247) / 11) ** 2 * 4); R.pset(x, yb, hex('#e8e8f8')); R.pset(x, yb + 1, hex('#8a8aa8')); }
  R.rect(232, VEN[1], 233, VEN[3], hex('#e8e0d0')); R.rect(VEN[0], 38, VEN[2], 39, hex('#e8e0d0'));
  // la estantería con los trofeos y un casco
  R.rect(200, 74, 268, 77, MAD[4]); R.rect(200, 77, 268, 78, MAD[0]); for (const bx of [204, 264]) R.rect(bx, 78, bx + 1, 82, MAD[0]);
  for (const [tx, c] of [[208, '#c8a040'], [222, '#c8c8d0'], [234, '#c8a040']]) { R.rect(tx, 70, tx + 6, 73, hex('#2a2a2a')); R.rect(tx + 2, 64, tx + 4, 70, hex(c)); R.rect(tx, 58, tx + 6, 64, hex(c)); R.pset(tx + 1, 59, hex('#ffffff')); R.pset(tx - 1, 60, hex(c)); R.pset(tx + 7, 60, hex(c)); }
  R.disco(254, 66, 7, hex('#1e8a8a')); R.rect(247, 66, 262, 73, hex('#1e8a8a')); R.rect(256, 66, 263, 70, hex('#c8c8d0')); R.linea(256, 68, 263, 68, hex('#8a8a9a')); R.pset(250, 62, hex('#7ad8d8')); R.rect(247, 73, 262, 73, hex('#146464'));
  // el corcho con fotos y notas
  R.rect(CORCHO[0] - 2, CORCHO[1] - 2, CORCHO[2] + 2, CORCHO[3] + 2, MAD[4]); for (let y = CORCHO[1]; y <= CORCHO[3]; y++) for (let x = CORCHO[0]; x <= CORCHO[2]; x++) R.pset(x, y, hs(x, y, 6) < 0.3 ? hex('#a8784a') : hs(x, y, 7) < 0.1 ? hex('#7a5a3a') : hex('#c4935e'));
  R.rect(66, 102, 80, 114, hex('#f2eee2')); R.rect(67, 103, 79, 111, hex('#3a7a2e')); R.disco(73, 107, 2, hex('#b65c30')); R.pset(73, 101, hex('#c83a3a'));
  R.rect(88, 118, 100, 130, hex('#f8e870')); R.linea(90, 121, 98, 121, hex('#a89a40')); R.linea(90, 124, 96, 124, hex('#a89a40')); R.pset(94, 117, hex('#3a6ac8'));
  // el calendario colgado de su clavo: la foto de arriba, la espiral y la rejilla del mes (las hojas se pintan encima)
  R.linea(150, 86, 150, 90, hex('#2a2a2a')); R.linea(150, 86, 140, 92, hex('#4a4a4a')); R.linea(150, 86, 160, 92, hex('#4a4a4a'));
  R.rect(CAL[0] + 2, CAL[1] + 2, CAL[2] + 2, CAL[3] + 2, MAD[0]);
  // el escritorio de la derecha: tablero, cajones con tirador, el flexo, la taza y el portátil
  R.rect(200, 132, 319, 137, MAD[4]); R.rect(200, 132, 319, 132, hex('#b88a5a')); R.rect(200, 137, 319, 138, MAD[0]); R.rect(204, 138, 210, 160, MAD[1]); R.rect(286, 138, 314, 160, MAD[2]); R.rect(286, 148, 314, 148, MAD[0]); R.rect(298, 142, 302, 143, hex('#c8a040')); R.rect(298, 153, 302, 154, hex('#c8a040'));
  R.rect(226, 118, 252, 131, hex('#2a2a36')); R.rect(228, 120, 250, 130, hex('#14304a')); R.rect(222, 131, 256, 132, hex('#4a4a5a'));
  for (let y = 121; y < 130; y++) for (let x = 229; x < 250; x++) if (y > 124) R.pset(x, y, (x + y) % 5 ? hex('#3a7a2e') : hex('#4a8a3a'));
  R.rect(276, 110, 278, 131, hex('#3a3a46')); R.rect(270, 128, 284, 131, hex('#2a2a36')); R.poligono([[268, 110], [282, 100], [288, 108]], hex('#1e8a8a')); R.pset(279, 104, hex('#7ad8d8'));
  R.rect(260, 124, 266, 131, hex('#f2eee2')); R.rect(266, 126, 268, 129, hex('#f2eee2')); R.rect(261, 124, 265, 125, hex('#5a3a24'));
});
const p2 = (t) => {
  cuarto();
  // la luz del flexo sobre la mesa
  for (let x = 252; x < 302; x++) { const d = Math.abs(x - 277) / 25; if (dz(x, 132) < 1 - d) R.pset(x, 132, hex('#f0d8a8')); if (dz(x, 133) < (1 - d) * 0.7) R.pset(x, 133, hex('#d8b080')); }
  for (let y = 111; y < 131; y++) for (let x = 262; x < 292; x++) { const d = Math.abs(x - 277) / ((y - 109) * 0.62 + 1); if (d < 1 && (x + y * 3) % 7 === 0 && dz(x, y) < 0.5) R.pset(x, y, hex('#a8845a')); }
  // el reloj de pared, con sus agujas
  { const cx = 116, cy = 50; R.disco(cx, cy, 8, hex('#2a1a10')); R.disco(cx, cy, 7, hex('#f4ecd8')); for (let k = 0; k < 12; k++) R.pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 6), Math.round(cy + Math.sin(k * Math.PI / 6) * 6), hex('#5a4a3a'));
    const am = t * 0.8 - 1.2, ah = -0.6; R.linea(cx, cy, Math.round(cx + Math.cos(am) * 5), Math.round(cy + Math.sin(am) * 5), hex('#1a1a1a')); R.linea(cx, cy, Math.round(cx + Math.cos(ah) * 3), Math.round(cy + Math.sin(ah) * 3), hex('#1a1a1a')); R.pset(cx, cy, hex('#c83a3a')); }
  // en el suelo: un balón, la mochila y las zapatillas
  T.balon(R, 34, 166, t, { ang: 0.2 }); R.rect(170, 160, 182, 172, hex('#2a3458')); R.rect(171, 158, 181, 160, hex('#3a4a78')); R.rect(172, 165, 180, 169, hex('#1e2a48')); R.pset(176, 162, hex('#c8a040'));
  for (const zx of [150, 160]) { R.rect(zx, 172, zx + 7, 174, hex('#f2eee2')); R.rect(zx, 171, zx + 3, 171, hex('#e8783a')); R.rect(zx, 175, zx + 7, 175, hex('#8a8a9a')); }
  // los reflectores del estadio, que barren el cielo por la ventana
  R.recorte([VEN[0], VEN[1], VEN[2], 50]);
  for (const [k, ox] of [[0, 214], [1, 250]]) { const a = -Math.PI / 2 + Math.sin(t * 0.8 + k * 2) * 0.5; for (let r = 0; r < 44; r += 1) { const x = Math.round(ox + Math.cos(a) * r), y = Math.round(50 + Math.sin(a) * r); if ((x + y + k) % 2 === 0) R.pset(x, y, hex('#8a8ab8')); } }
  R.recorte(null);
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const v = (t * 0.7 + k * 0.25) % 1; R.pset(263 + Math.round(Math.sin(v * 7 + k) * 2), 122 - Math.round(v * 12), hex('#c8c0b0')); }
  // la entrada «61» clavada en el corcho
  const clava = tramo(t, sesenta - 0.25, sesenta);
  const hoja = (x0, y0, c) => { R.rect(x0, y0, x0 + 17, y0 + 9, hex('#1a1a22')); R.rect(x0 + 1, y0 + 1, x0 + 16, y0 + 8, hex(c)); for (let y = y0 + 1; y < y0 + 9; y += 2) R.pset(x0 + 12, y, hex('#1a1a22')); R.numero('61', x0 + 6, y0 + 7, { color: hex('#1a1a22'), sombra: false }); };
  // el calendario: las hojas pasan (octubre → febrero) y el 14 se rodea en rojo
  const pasa = tramo(t, jugara, febrero + 0.15), n = Math.min(4, Math.floor(pasa * 4.0001)), meses = ['#3a6ac8', '#8a5a2a', '#2a8a6a', '#5a8ac8', '#c83a5a'];
  const pagina = (k, dy, alto) => { const [x0, y0, x1] = CAL; R.rect(x0, y0 + dy, x1, y0 + dy + alto, hex('#f4f0e6')); R.rect(x0, y0 + dy, x1, y0 + dy, hex('#c8c4b8'));
    if (alto < 40) return; R.rect(x0 + 2, y0 + 3, x1 - 2, y0 + 14, hex(meses[k]));
    for (let i = 0; i < 6; i++) R.pset(x0 + 6 + i * 7, y0 + 6 + (i % 2), hex('#f4f0e6'));
    for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const cx0 = x0 + 3 + i * 6, cy0 = y0 + 18 + j * 6; R.rect(cx0, cy0, cx0 + 4, cy0 + 4, (i === 0) ? hex('#f8d8d0') : hex('#e8e2d4')); R.pset(cx0 + 1, cy0 + 1, hex('#8a8478')); if ((i + j) % 3 === 0) R.pset(cx0 + 2, cy0 + 1, hex('#8a8478')); } };
  pagina(n, 0, 48);
  for (let x = CAL[0] + 3; x < CAL[2] - 2; x += 4) { R.pset(x, CAL[1] - 1, hex('#8a8a9a')); R.pset(x, CAL[1], hex('#5a5a6a')); }
  if (pasa > 0 && pasa < 1) { const f = (pasa * 4) % 1, alto = Math.round(48 * (1 - f)); R.rect(CAL[0], CAL[1] - Math.round(f * 10), CAL[2], CAL[1] - Math.round(f * 10) + Math.max(1, alto * 0.4), hex('#e8e2d4')); R.rect(CAL[0], CAL[1] - Math.round(f * 10), CAL[2], CAL[1] - Math.round(f * 10), hex('#a8a498')); }
  // el 14 de febrero: la celda (fila 2, domingo), el corazón y el círculo rojo que se dibuja
  if (n === 4) { const cx0 = CAL[0] + 3, cy0 = CAL[1] + 18 + 2 * 6, cxc = cx0 + 2, cyc = cy0 + 2;
    R.pset(cxc - 1, cyc, hex('#e84a6a')); R.pset(cxc + 1, cyc, hex('#e84a6a')); R.pset(cxc, cyc + 1, hex('#e84a6a')); R.pset(cxc, cyc, hex('#e84a6a'));
    const rc = tramo(t, catorce, catorce + 0.6); for (let k = 0; k < 40 * rc; k++) { const a = k / 40 * Math.PI * 2 - 2; R.pset(Math.round(cxc + Math.cos(a) * 5), Math.round(cyc + Math.sin(a) * 4.5), hex('#d82a2a')); }
    const e = tramo(t, catorce, catorce + 0.3); if (e > 0) R.numero('14', 150, Math.round(88 - e * 6), { tam: 16, centro: true, rampa: H(['#ff8a8a', '#e84a4a', '#b82a2a', '#7a1414']) }); }
  // el chico: clava la entrada, va al calendario, pasa las hojas y salta para rodear el 14
  const va = tramo(t, sesenta + 0.25, jugara - 0.1), kx = Math.round(lerp(70, 112, va)), ky = 170;
  sombraSuelo(kx + 7, ky, 7, hex('#3e2414'));
  const brazo = t < sesenta || (t > jugara - 0.1 && t < febrero + 0.2) || (t > catorce - 0.2 && t < catorce + 0.7);
  const chico = R.actor(EL.chico, kx, ky, t, { dir: 1, anda: va > 0 && va < 1, dedo: brazo, salto: t > catorce - 0.15 && t < catorce + 0.5 ? 5 : 0, sonrisa: t > catorce, pal: { C: '#1e8a8a', c: '#146464' } });
  if (t < sesenta) hoja(Math.round(lerp(chico.mano[0] - 6, 80, clava)), Math.round(lerp(chico.mano[1] - 4, 100, clava)), '#e8783a');
  else { hoja(80, 100, '#e8783a'); R.disco(88, 100, 1, hex('#c83a3a')); }
  if (t > catorce - 0.2 && t < catorce + 0.7) { R.rect(chico.mano[0], chico.mano[1] - 5, chico.mano[0] + 1, chico.mano[1] - 1, hex('#d82a2a')); R.pset(chico.mano[0], chico.mano[1] - 6, hex('#f8f0e0')); }
  // el gato del escritorio: mueve la cola y mira al chico cuando salta
  T.gato(R, 216, 131, t, { dir: t > catorce - 0.2 ? -1 : 1 });
};

// 3 · la explanada del estadio de la final: «2027»; el chico y su padre llegan; el avión baja
const p3 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'superbowl' });
  const e = tramo(t, P3, P3 + 0.3), fuera = tramo(t, estadio - 0.6, estadio - 0.2);
  if (e > 0 && fuera < 1) R.numero('2027', 74, Math.round(52 - e * 6 - fuera * 50), { tam: 16, centro: true });
  const u = tramo(t, P3 + 0.2, estadio - 0.1), w = tramo(t, cerca + 0.2, E.duracion), x = Math.round(lerp(96, 150, u) + lerp(0, 40, w));
  const andan = (u > 0 && u < 1) || (w > 0 && w < 1);
  sombraSuelo(x + 7, 171, 7, hex('#4a3a5a')); sombraSuelo(x + 27, 172, 7, hex('#4a3a5a'));
  R.actor(EL.senor30, x + 20, 172, t, { dir: 1, anda: andan, habla: !andan && t > estadio + 0.4 && Math.sin(t * 10) > 0, sonrisa: t > estadio });
  const chico = R.actor(EL.chico, x, 171, t, { dir: 1, anda: andan, dedo: t > estadio - 0.1 && t < cerca + 0.2, sonrisa: t > estadio, pal: { C: '#1e8a8a', c: '#146464' } });
  if (!(t > estadio - 0.1 && t < cerca + 0.2)) { R.rect(x + 12, 156, x + 18, 159, hex('#1a1a22')); R.rect(x + 13, 157, x + 17, 158, hex('#e8783a')); }
  else R.icono('!', chico.cabeza[0] - 1, chico.cabeza[1] - 12, hex('#ffd860'), hex('#1a1424'), 1);
};

const efectos = [[0.45, 'toc'], [temporada + 0.3, 'whoosh'], [sesenta, 'toc'], [jugara + 0.05, 'papel'], [catorce, 'lapiz'], [P3 + 0.05, 'brillo'], [cerca, 'jet']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 2026 : 2027) });
''')
