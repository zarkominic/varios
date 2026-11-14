E = {}

# utilidades comunes de este grupo (cada escena las lleva dentro: no hay fichero compartido)
HELP = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const CAPAS = {};
// un fondo fijo en su búfer (se pinta una vez y se copia entero en cada fotograma)
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
// una pieza fija con transparencia (se pinta una vez y luego se calca píxel a píxel, con un desplazamiento dy)
const SPR = {};
const sprite = (k, dib, dx = 0, dy = 0) => { if (!SPR[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); const L = []; for (let i = 0; i < b.length; i++) if (b[i]) L.push(i, b[i]); SPR[k] = L; } const L = SPR[k]; for (let j = 0; j < L.length; j += 2) R.pset(L[j] % 320 + dx, ((L[j] / 320) | 0) + dy, L[j + 1]); };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const K = hex('#1a1420');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
// franjas tramadas (cielo o mar) entre y0 e y1 con los colores cols, de arriba abajo
const tramado = (y0, y1, cols) => { for (let y = y0; y < y1; y++) { const u = (y - y0) / (y1 - y0) * (cols.length - 1); for (let x = 0; x < 320; x++) { const k = Math.min(cols.length - 1, Math.floor(u + BAY[(y & 3) * 4 + (x & 3)] / 16)); R.pset(x, y, cols[k]); } } };
// nube de tres tonos (sombra, cuerpo, luz)
const BOLAS = [[-14, 2, 5], [-7, -1, 7], [2, -3, 8], [11, 0, 6], [18, 2, 4], [-19, 3, 3]];
const nube = (cx, cy, s, tonos) => tonos.forEach((c, k) => { for (const [dx, dy, r] of BOLAS) R.disco(cx + dx * s, cy + dy * s - k * 1.5 * s, Math.max(1, r * s - k * 1.25 * s), c); });
// tres capas de nubes a tres velocidades (las lejanas más azuladas)
const TONOS = [[hex('#8aa4c4'), hex('#aec2da'), hex('#cad8ea')], [hex('#a4b8d0'), hex('#d2dcea'), hex('#eef2f8')], [hex('#b4c4d8'), hex('#e2e8f2'), hex('#ffffff')]];
const nubes = (t, ys, sem = 0) => { for (let k = 0; k < 7; k++) { const c = k % 3, v = [1.6, 3.4, 6][c], s = [0.55, 0.8, 1.1][c], x = ((k * 113 + sem * 37 + t * v) % 420) - 50; nube(Math.round(x), ys[c] + (k * 7) % 9, s, TONOS[c]); } };
// el rollito de cartas atado con su cinta (lo que se lleva en la mano)
const rollito = (x, y) => { R.rect(x - 6, y - 3, x + 5, y + 2, K); R.rect(x - 5, y - 2, x + 4, y + 1, hex('#e8d4a4')); R.rect(x - 5, y + 1, x + 4, y + 1, hex('#b89a64')); R.rect(x - 4, y - 2, x + 2, y - 2, hex('#fff4d8')); R.rect(x - 1, y - 3, x, y + 2, hex('#a83224')); R.pset(x - 6, y - 1, hex('#c8a870')); R.pset(x + 5, y - 1, hex('#c8a870')); };
'''

E['pr-galipoli'] = ('Galípoli', '''// PR-GALIPOLI (frase 7), 1465–1500. Cuatro planos:
// 1. el puerto de Galípoli: el niño Piri cruza el muelle corriendo, espanta a una gaviota que picotea un pescado, se para
//    junto a la galera y la señala en «Gallipoli»; da un salto de alegría en «Dardanelles»; el pescador le saluda y un
//    mozo con un saco pasa por delante (corta en «As a boy»);
// 2. el muelle: Kemal Reis llega y sube por la pasarela; en «Kemal Reis» pisa la cubierta, se vuelve y llama al niño, que
//    sube detrás; los marineros de la borda le vitorean en «corsair» y en «admirals» (corta en «With him»);
// 3. un mapa del Mediterráneo sobre la mesa: la ruta roja de la galera se dibuja desde Galípoli hasta España
//    («sailing across the whole Mediterranean») y en «battle… battle» estallan dos batallas (corta en «learning»);
// 4. de noche en la galera: Kemal enseña al niño las estrellas (se unen en una constelación), el viento («winds») y las
//    luces de los puertos de la costa («harbors»); en «by heart» el niño sonríe y señala él también.''', HELP + r'''
const P2 = en('galipoli', .289), P3 = en('galipoli', .6312), P4 = en('galipoli', .8649);
const gali = en('galipoli', .1449), darda = en('galipoli', .2289), kem = en('galipoli', .398), cors = en('galipoli', .4607), almi = en('galipoli', .5834);
const medi = en('galipoli', .751), bat1 = en('galipoli', .808), bat2 = en('galipoli', .8346);
const costas = en('galipoli', .8736), vientos = en('galipoli', .9142), puertos = en('galipoli', .9441), memoria = en('galipoli', .976);

// ── 1 · el puerto ──
const GAV = ['.kkk.....', 'kWWWk....', 'YkWWWkkkk', '.kWWGGGGk', '..kWWGGk.', '...kkkk..', '....k.k..'];
const PGAV = { k: hex('#2a2a34'), W: hex('#f4f4f0'), G: hex('#9aa4b4'), Y: hex('#e8b030') };
const saco = (x, y) => { R.rect(x - 5, y - 8, x + 4, y + 1, K); R.rect(x - 4, y - 7, x + 3, y, hex('#c8a870')); R.rect(x - 4, y - 2, x + 3, y, hex('#a88850')); R.pset(x - 2, y - 5, hex('#e8d4a0')); R.pset(x + 1, y - 3, hex('#a88850')); R.rect(x - 1, y - 10, x, y - 8, K); };
const red = (x0, y0) => {
  const N = hex('#9a7a4c'), Ns = hex('#5a4228');
  for (let j = 0; j < 7; j++) for (let i = 0; i < 28 - j * 3; i++) { const x = x0 + i + Math.round(j * 1.5), y = y0 - j; R.pset(x, y, (i + j) % 2 ? N : Ns); }
  R.linea(x0 - 1, y0 + 1, x0 + 28, y0 + 1, hex('#3a2a1a'));
  for (const [dx, dy] of [[6, -2], [14, -5], [22, -1]]) { R.disco(x0 + dx, y0 + dy, 1.8, hex('#d8562e')); R.pset(x0 + dx - 1, y0 + dy - 1, hex('#f4a070')); }
};
const p1 = (t) => {
  T.galipoli(R, t, { encuadre: 'puerto' });
  // el pescador remienda la red y saluda al niño
  red(64, 160);
  const sal = t > 2.7 && t < 3.9;
  R.actor(EL.marineroOtomano2, 46, 160, t, { dir: 1, dedo: sal, sonrisa: t > 2.7, habla: sal && Math.sin(t * 9) > 0 });
  // la gaviota picotea un pescado y echa a volar cuando llega el niño
  const v = tramo(t, 2.75, 5.4);
  R.rect(143, 158, 150, 159, hex('#9ab4c8')); R.rect(144, 157, 148, 157, hex('#c4d8e4')); R.pset(142, 157, hex('#9ab4c8')); R.pset(142, 159, hex('#9ab4c8')); R.pset(149, 158, K);
  if (v === 0) R.dibujo(GAV, 151, 153 + (Math.sin(t * 6) > 0.3 ? 1 : 0), 1, PGAV);
  else R.gaviota(Math.round(lerp(155, 60, v)), Math.round(lerp(150, 32, v) + Math.sin(v * 10) * 3), t, 3);
  // el niño cruza corriendo, se para junto a la galera y la señala; salta de alegría
  const u = tramo(t, 0.4, 3.3), x = Math.round(lerp(292, 190, u));
  const sj = tramo(t, darda, darda + 0.5), salto = sj > 0 && sj < 1 ? Math.round(Math.sin(sj * Math.PI) * 6) : 0;
  R.actor(EL.piriNino, x, 160, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > gali - 0.1 && t < P2 - 0.4, sonrisa: t > gali - 0.3, sorpresa: t > 2.75 && t < 3.3, salto });
  // un mozo con un saco al hombro pasa por delante
  const m = tramo(t, 0.2, P2 + 0.3), mx = Math.round(lerp(334, -24, m));
  const a = R.actor(EL.marineroOtomano1, mx, 178, t, { dir: -1, anda: m > 0 && m < 1, sostiene: [mx - 2, 152] });
  saco(a.mano[0], a.mano[1]);
  T.galipoliDelante(R, t, { encuadre: 'puerto' });
};

// ── 2 · el muelle: Kemal sube y el niño detrás ──
const sube = (u) => [lerp(236, 186, u), lerp(160, 110, u)];
const p2 = (t) => {
  T.galipoli(R, t, { encuadre: 'puerto', camara: 'muelle' });
  const viva = (t > cors && t < cors + 1.2) || (t > almi - 0.1 && t < almi + 1.2);
  R.actor(EL.marineroOtomano1, 112, 110, t, { dir: 1, brazos: viva && Math.sin(t * 8) > -0.3, sonrisa: viva || t > almi });
  R.actor(EL.marineroOtomano2, 136, 110, t, { dir: 1, dedo: t > kem - 0.6 && t < cors, brazos: viva && Math.sin(t * 8 + 1.5) > -0.3, habla: t > kem - 0.6 && t < cors && Math.sin(t * 8) > 0, sonrisa: viva });
  // Kemal Reis
  const k1 = tramo(t, P2 + 0.1, P2 + 1.5), k2 = tramo(t, P2 + 1.5, kem), k3 = tramo(t, kem, kem + 0.5);
  let kx, ky; if (k2 === 0) { kx = lerp(334, 236, k1); ky = 162; } else if (k3 === 0) [kx, ky] = sube(k2); else { kx = lerp(186, 172, k3); ky = 110; }
  const kAnda = (k1 > 0 && k1 < 1) || (k2 > 0 && k2 < 1) || (k3 > 0 && k3 < 1);
  R.actor(EL.kemal, Math.round(kx) - 7, Math.round(ky), t, { dir: k3 >= 1 ? 1 : -1, anda: kAnda, dedo: t > kem + 0.5 && t < cors, brazos: t > cors && t < cors + 0.9, sonrisa: t > kem, habla: t > kem + 0.5 && t < cors && Math.sin(t * 7) > 0 });
  // el niño: llega, espera abajo mirando arriba y sube
  const b1 = tramo(t, P2 + 0.5, P2 + 2.3), b2 = tramo(t, kem + 0.6, kem + 2.3);
  let bx, by; if (b2 === 0) { bx = lerp(336, 238, b1); by = 162; } else [bx, by] = sube(b2);
  const bs = tramo(t, almi, almi + 0.45), bsal = bs > 0 && bs < 1 ? Math.round(Math.sin(bs * Math.PI) * 5) : 0;
  R.actor(EL.piriNino, Math.round(bx) - 7, Math.round(by), t, { dir: -1, anda: (b1 > 0 && b1 < 1) || (b2 > 0 && b2 < 1), sorpresa: b1 >= 1 && b2 === 0 && t > kem, sonrisa: b2 >= 1, salto: bsal, dedo: t > almi + 0.5 });
  T.galipoliDelante(R, t, { encuadre: 'puerto', camara: 'muelle' });
};

// ── 3 · el mapa del Mediterráneo con la ruta de la galera ──
const LO0 = -10.5, LO1 = 37, LA1 = 47.2, MX0 = 18, MX1 = 266, MY0 = 22, MY1 = 160;
const SX = (MX1 - MX0) / (LO1 - LO0), SY = SX * 1.3;
const PM = ([lo, la]) => [MX0 + (lo - LO0) * SX, MY0 + (LA1 - la) * SY];
const MAR = [[-12, 48], [-2.2, 48], [-2.2, 47.1], [-1.2, 46.2], [-1.2, 44.6], [-1.8, 43.4], [-4, 43.5], [-8, 43.7], [-9.3, 43.2], [-8.9, 42], [-8.8, 41], [-9.4, 39.3], [-9.5, 38.7], [-8.9, 38.5], [-8.8, 37.9], [-9, 37], [-7.5, 37.1], [-6.3, 36.8], [-6, 36.2], [-5.6, 36.0], [-4.4, 36.7], [-2.1, 36.7], [-0.5, 38.3], [0.2, 38.8], [-0.3, 39.5], [0.9, 40.8], [3.2, 41.9], [3.0, 43.2], [4.8, 43.4], [6.5, 43.1], [7.5, 43.8], [8.9, 44.4], [10.2, 43.9], [11, 42.4], [12.4, 41.5], [14.2, 40.8], [15.6, 40.0], [15.6, 38.2], [16.1, 38.0], [17.1, 39.0], [16.6, 39.7], [17.2, 40.4], [18.5, 40.1], [18.0, 40.6], [16.0, 41.4], [14.0, 42.6], [12.4, 44.2], [12.3, 45.4], [13.6, 45.6], [14.0, 44.8], [15.2, 44.0], [16.4, 43.5], [18.1, 42.6], [19.4, 41.8], [19.4, 40.4], [20.2, 39.5], [20.7, 38.8], [21.1, 38.3], [21.6, 37.3], [21.9, 36.8], [22.5, 36.4], [23.0, 36.5], [23.2, 37.4], [24.0, 37.7], [23.2, 38.6], [22.9, 39.4], [22.9, 40.6], [23.8, 40.2], [24.4, 40.9], [25.5, 40.9], [26.1, 40.6], [26.2, 40.05], [26.45, 40.2], [26.7, 40.4], [27.0, 40.7], [28.0, 41.0], [29.0, 41.05], [29.1, 41.25], [28.9, 41.6], [28.0, 42.0], [27.8, 43.0], [28.6, 44.0], [29.7, 45.2], [30.5, 46.5], [31.5, 48], [38, 48], [38, 41.0], [37.5, 41.0], [36.0, 41.7], [35.0, 42.0], [33.0, 41.9], [31.5, 41.2], [30.0, 41.1], [29.2, 41.0], [29.0, 40.6], [28.0, 40.4], [27.3, 40.4], [26.8, 40.25], [26.4, 40.0], [26.2, 39.6], [26.8, 39.3], [26.8, 38.9], [26.3, 38.3], [27.3, 37.4], [28.0, 36.8], [29.1, 36.6], [30.6, 36.8], [32.0, 36.2], [34.0, 36.3], [35.5, 36.6], [36.2, 36.6], [35.9, 35.4], [35.6, 34.4], [35.0, 33.0], [34.5, 31.5], [33.0, 31.1], [32.3, 31.2], [31.0, 31.6], [30.0, 31.3], [29.0, 30.9], [27.0, 31.3], [25.0, 31.6], [23.1, 32.6], [21.5, 32.9], [20.0, 32.0], [20.0, 30.8], [19.0, 30.3], [17.5, 31.0], [15.5, 31.5], [15.2, 32.3], [13.2, 32.9], [11.5, 33.1], [10.5, 33.7], [10.0, 34.3], [11.0, 35.3], [10.5, 36.2], [11.1, 37.0], [10.2, 37.1], [9.6, 37.3], [8.5, 36.9], [6.5, 37.0], [5.0, 36.7], [3.0, 36.8], [1.0, 36.5], [-0.6, 35.8], [-2.0, 35.1], [-3.0, 35.3], [-4.5, 35.2], [-5.3, 35.9], [-6, 35.7], [-6.8, 34], [-8, 33.4], [-9.3, 32.5], [-9.8, 30.5], [-9.7, 29], [-10.5, 27.5], [-12, 26]];
const ISLAS = [
  [[12.4, 38.1], [13.3, 38.2], [15.6, 38.3], [15.1, 37.3], [15.1, 36.7], [14.3, 37.0], [12.6, 37.6]],
  [[8.4, 41.1], [9.6, 41.1], [9.7, 40.0], [9.5, 39.2], [8.6, 38.9], [8.4, 39.9]],
  [[8.6, 42.9], [9.4, 43.0], [9.5, 42.0], [9.2, 41.4], [8.6, 41.7]],
  [[23.5, 35.6], [24.5, 35.5], [26.3, 35.3], [26.2, 35.0], [24.8, 34.9], [23.6, 35.2]],
  [[32.3, 35.0], [33.0, 35.4], [34.6, 35.7], [34.0, 35.0], [33.0, 34.6]],
  [[2.4, 39.6], [3.2, 39.9], [3.4, 39.5], [2.8, 39.3]],
  [[33.0, 46.0], [32.5, 45.4], [33.5, 44.5], [34.5, 44.6], [35.5, 45.1], [36.5, 45.3], [36.5, 46.2]],
];
const PUNTOS = [[28.0, 36.3], [25.4, 37.1], [25.2, 36.6], [24.9, 37.7], [26.0, 36.8], [24.4, 38.6], [26.5, 39.2], [25.9, 38.4], [1.4, 38.9], [4.1, 39.9], [12.2, 36.0], [14.4, 35.9], [15.0, 38.8]];
const MONTES = [[7, 46], [9, 46.3], [11, 46.5], [13, 46.4], [-4, 40.2], [-2.5, 38.3], [-6, 38.6], [-1, 41.6], [-5, 32.2], [-1, 33.6], [3.5, 35.6], [7, 35.4], [32, 38.6], [35, 38.2], [30, 38.0], [21, 42.2], [23, 42.6], [19.5, 43.4], [16, 45.4], [14, 37.6], [33.5, 40.2]];
const PUEBLOS = [[29.0, 41.0], [12.3, 45.4], [8.9, 44.4], [2.2, 41.4], [-0.4, 39.5], [-4.4, 36.75], [10.2, 36.85], [29.9, 31.2], [28.2, 36.4], [14.3, 40.85], [23.7, 38.0], [35.5, 33.9]];
const GALIPOLI = [26.67, 40.41];
const RUTA = [GALIPOLI, [26.0, 39.6], [25.4, 38.2], [24.0, 36.9], [22.3, 36.3], [19.0, 36.6], [15.6, 36.3], [12.0, 37.3], [10.4, 37.6], [8.0, 38.2], [5.0, 38.6], [3.0, 39.0], [0.5, 38.2], [-1.6, 36.9]].map(PM);
const RL = [0]; for (let i = 1; i < RUTA.length; i++) RL.push(RL[i - 1] + Math.hypot(RUTA[i][0] - RUTA[i - 1][0], RUTA[i][1] - RUTA[i - 1][1]));
const BATALLAS = [[[21.7, 36.9], bat1], [[3.3, 39.25], bat2]];
const PAPEL = (x, y) => { const n = h(x >> 3, y >> 3, 3) * 0.5 + h(x >> 4, y >> 4, 4) * 0.5, f = h(x, y, 5); return n > 0.78 ? hex('#d2b680') : f > 0.93 ? hex('#dcc292') : n < 0.2 ? hex('#efdcae') : hex('#e6d0a0'); };
const fondoMapa = () => {
  // la mesa de tablas con vetas y una sombra suave arriba a la derecha (la esquina de Atom)
  const M = [hex('#4e301a'), hex('#5e3a22'), hex('#6e472a'), hex('#3a2212')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y + 5) / 24), v = Math.sin(x * 0.07 + tb * 7.3 + Math.sin(x * 0.015 + tb * 2) * 4 + Math.sin(y * 0.6 + tb) * 0.6); R.pset(x, y, (y + 5) % 24 === 0 ? M[3] : v > 0.8 ? M[2] : v < -0.7 ? M[0] : M[1]); }
  for (let tb = 0; tb < 8; tb++) for (const x of [6, 300]) { R.pset(x, tb * 24 + 4, hex('#9a8a70')); R.pset(x + 1, tb * 24 + 4, hex('#2a1a0e')); }
  for (let y = 0; y < 70; y++) for (let x = 250; x < 320; x++) { const d = Math.hypot((x - 320) / 80, y / 70); if (d < 1) tin(x, y, hex('#120a04'), 0.6 * (1 - d)); }
  // la sombra y el pergamino con el borde irregular
  const borde = []; for (let k = 0; k < 40; k++) { const u = k / 40, a = u * 4; let x, y; if (a < 1) { x = 12 + 260 * a; y = 17; } else if (a < 2) { x = 272; y = 17 + 149 * (a - 1); } else if (a < 3) { x = 272 - 260 * (a - 2); y = 166; } else { x = 12; y = 166 - 149 * (a - 3); } borde.push([x + (h(k, 1, 9) - 0.5) * 3, y + (h(k, 2, 9) - 0.5) * 3]); }
  R.poligono(borde.map(([x, y]) => [x + 3, y + 4]), hex('#2a180c'));
  R.poligono(borde, PAPEL);
  // el mar y la tierra (máscara: 1 mar)
  const mb = R.nuevo(), prev = R.usar(mb); R.poligono(MAR.map(PM), 1); for (const I of ISLAS) R.poligono(I.map(PM), 0); R.usar(prev);
  const esMar = (x, y) => x < MX0 || x > MX1 || y < MY0 || y > MY1 ? 0 : mb[y * 320 + x] === 1;
  for (let y = MY0; y <= MY1; y++) for (let x = MX0; x <= MX1; x++) {
    const m = esMar(x, y); let cerca = 9;
    for (let dy = -3; dy <= 3 && cerca > 1; dy++) for (let dx = -3; dx <= 3; dx++) if (esMar(x + dx, y + dy) !== m && x + dx >= MX0 && x + dx <= MX1 && y + dy >= MY0 && y + dy <= MY1) cerca = Math.min(cerca, Math.max(Math.abs(dx), Math.abs(dy)));
    if (m) { const ola = y % 7 === 0 && (x + (y >> 3) * 5) % 11 < 3 && cerca > 3; R.pset(x, y, cerca <= 2 ? hex('#c8d8c4') : ola ? hex('#6a96a0') : (x + y) % 2 && h(x >> 2, y >> 2, 6) > 0.5 ? hex('#a6c0bc') : hex('#b4ccc4')); if (ola) R.pset(x + 1, y - 1, hex('#6a96a0')); }
    else R.pset(x, y, cerca === 1 ? hex('#3a2818') : cerca <= 3 ? hex('#cfae72') : h(x >> 3, y >> 3, 7) > 0.7 ? hex('#cbcf94') : PAPEL(x, y));
  }
  // las líneas de rumbo de dos rosas (negras, verdes y rojas, tenues)
  R.recorte([MX0, MY0, MX1, MY1]);
  for (const c of [[18.2, 34.4], [4.6, 39.6]].map(PM)) for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, col = k % 4 === 0 ? hex('#3a2818') : k % 2 === 0 ? hex('#3a7a3a') : hex('#b03424'); R.linea(c[0], c[1], c[0] + Math.cos(a) * 400, c[1] + Math.sin(a) * 400, (x, y) => mez(R.pget(x, y), col, 0.3)); }
  R.recorte(null);
  for (const c of [[18.2, 34.4], [4.6, 39.6]].map(PM)) T.PIEZAS_PR.rosa(R, Math.round(c[0]), Math.round(c[1]) + 8);
  // montes, islitas y pueblos con su torre
  for (const p of MONTES) { const [x, y] = PM(p).map(Math.round); R.linea(x - 3, y + 2, x, y - 2, hex('#7a5a30')); R.linea(x, y - 2, x + 3, y + 2, hex('#4a3420')); R.pset(x - 1, y, hex('#a88a58')); }
  for (const p of PUNTOS) { const [x, y] = PM(p).map(Math.round); R.rect(x, y, x + 1, y, hex('#3a2818')); R.pset(x, y - 1, hex('#cfae72')); }
  for (const p of PUEBLOS) { const [x, y] = PM(p).map(Math.round); R.rect(x - 2, y - 5, x + 2, y, K); R.rect(x - 1, y - 4, x + 1, y, hex('#e8e0d0')); R.pset(x - 2, y - 6, K); R.pset(x + 2, y - 6, K); R.pset(x, y - 6, K); R.pset(x, y - 2, hex('#6a4a2a')); }
  // la escala de leguas y los garabatos (notas sin letras) en el desierto
  { const [x0, y0] = PM([-9.6, 28.4]).map(Math.round); for (let k = 0; k < 8; k++) { R.rect(x0 + k * 5, y0, x0 + k * 5 + 4, y0 + 2, k % 2 ? hex('#3a2818') : hex('#f2e6c4')); } R.rect(x0, y0 - 1, x0 + 39, y0 - 1, hex('#3a2818')); R.rect(x0, y0 + 3, x0 + 39, y0 + 3, hex('#3a2818')); }
  for (const [lo, la, n] of [[2, 31.5, 26], [18, 28.6, 30], [27, 28.2, 22], [-4, 30.4, 18], [33.4, 39.4, 16]]) { const [x0, y0] = PM([lo, la]).map(Math.round); for (let i = 0; i < n; i++) R.pset(x0 + i, y0 + Math.round(Math.sin(i * 1.3) * 1.2), hex('#4a3420')); }
  // un barquito pintado en el Atlántico y otro junto a Chipre
  for (const p of [[-9.3, 36.0], [30.6, 33.6]]) { const [x, y] = PM(p).map(Math.round); R.rect(x - 4, y, x + 4, y + 1, hex('#4a2a14')); R.linea(x, y - 6, x, y - 1, hex('#3a2818')); R.rect(x - 3, y - 6, x - 1, y - 2, hex('#e8e0d0')); R.rect(x + 1, y - 5, x + 3, y - 2, hex('#e8e0d0')); R.pset(x, y - 7, hex('#b03424')); }
  // la mesa a la derecha: el astrolabio, el compás y el tintero; una regla y la pluma abajo
  T.PIEZAS_PR.astrolabio(R, 295, 106); T.PIEZAS_PR.compas(R, 296, 140, { abre: 0.6 }); T.PIEZAS_PR.tintero(R, 300, 178);
  R.rect(40, 168, 150, 172, K); R.rect(41, 169, 149, 171, hex('#c8a060')); for (let x = 44; x < 148; x += 6) R.pset(x, 169, hex('#5a3a1a'));
};
const GAL = ['....R....', '....kR...', '....k.R..', 'kkkkkkkkk', '.kBBBBBk.', '..kkkkk..'];
const PGAL = { k: hex('#2a1810'), R: hex('#c03020'), B: hex('#7a4a24') };
const p3 = (t) => {
  capa('mapa', fondoMapa);
  // la bandera de Galípoli ondea y su anillo late al empezar
  const [gx, gy] = PM(GALIPOLI).map(Math.round);
  R.linea(gx, gy - 9, gx, gy, K); for (let i = 0; i < 5; i++) { const y = gy - 9 + Math.round(Math.sin(t * 8 - i) * 0.8); R.rect(gx + 1 + i, y, gx + 1 + i, y + 2, hex('#c8302a')); }
  const lat = tramo(t, P3, P3 + 1.2); if (lat > 0 && lat < 1) R.anillo?.(gx, gy, 3 + lat * 8, hex('#c8302a'));
  // la ruta de la galera, a trazos rojos, de Galípoli a España
  const u = tramo(t, P3 + 0.25, medi + 0.5), L = u * RL[RL.length - 1];
  R.recorte([MX0, MY0, MX1, MY1]);
  let cab = RUTA[0], dirx = -1;
  for (let i = 1; i < RUTA.length; i++) {
    if (RL[i - 1] >= L) break; const [ax, ay] = RUTA[i - 1], [bx, by] = RUTA[i], seg = RL[i] - RL[i - 1], hasta = Math.min(1, (L - RL[i - 1]) / seg);
    for (let s = 0; s <= seg * hasta; s += 0.5) { const d = RL[i - 1] + s; if (d % 7 < 4.5) { const x = Math.round(ax + (bx - ax) * s / seg), y = Math.round(ay + (by - ay) * s / seg); R.pset(x, y, hex('#b02818')); R.pset(x, y + 1, hex('#6a1a10')); } }
    cab = [ax + (bx - ax) * hasta, ay + (by - ay) * hasta]; dirx = bx < ax ? -1 : 1;
  }
  R.recorte(null);
  if (u > 0) R.dibujo(GAL, Math.round(cab[0]) - 4, Math.round(cab[1]) - 7 + (Math.sin(t * 5) > 0 ? 1 : 0), dirx, PGAL);
  // las batallas: una X roja con su fogonazo y su humo
  for (const [p, tb] of BATALLAS) { if (t < tb) continue; const [x, y] = PM(p).map(Math.round), e = t - tb;
    for (let k = 0; k < 5; k++) { const a = k * 1.3 + 0.4, r = 2 + Math.min(1, e * 1.5) * (5 + k), cx = x + Math.cos(a) * r * 0.8, cy = y - 2 - e * 4 - k + Math.sin(a) * r * 0.4; R.disco(Math.round(cx), Math.round(cy), Math.max(1, 3.4 - e * 0.8), k % 2 ? hex('#a49c90') : hex('#d4ccc0')); }
    if (e < 0.22) R.disco(x, y, 7 - e * 10, hex('#ffe08a'));
    const s = e < 0.15 ? 3 : 2; R.icono('X', x - Math.round(2.5 * s), y - Math.round(2.5 * s) - 1, hex('#c02818'), K, s);
  }
  // la sombra de una gaviota que cruza el mapa y la esquina del pergamino que levanta la brisa
  { const v = ((t - P3) * 70) % 600 - 60, sx = Math.round(v), sy = Math.round(130 - v * 0.25); for (const [dx, dy] of [[-4, -1], [-3, -1], [-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0], [3, -1], [4, -1]]) tin(sx + dx, sy + dy, hex('#2a1a10'), 0.35); }
  { const l = Math.round(3 + 3 * (Math.sin(t * 2.1) * 0.5 + 0.5)); R.poligono([[272 - l, 166], [272, 166 - l], [272 - l, 166 - l]], hex('#c8aa74')); R.linea(272 - l, 166, 272, 166 - l, hex('#8a6a40')); }
  // la pluma del tintero se mece
  { const a = Math.sin(t * 1.7) * 0.6; R.linea(300, 162, Math.round(304 + a * 3), 146, hex('#f2ead8')); R.pset(Math.round(305 + a * 3), 147, hex('#c8bca0')); }
};

// ── 4 · de noche en la galera: las estrellas, el viento y los puertos ──
const ESTR = [[70, 42], [82, 33], [96, 39], [107, 30], [113, 47]];
const p4 = (t) => {
  const g = T.mar(R, t, { hora: 'noche' }), hor = g.horizonte ?? 70;
  // la costa lejana a la izquierda, con las luces de sus puertos
  for (let x = 0; x < 124; x++) { const alt = Math.round(2 + 4 * (Math.sin(x * 0.06) * 0.5 + 0.5) + 1.5 * Math.sin(x * 0.21) - Math.max(0, x - 100) * 0.2); for (let y = hor - alt; y < hor; y++) R.pset(x, y, y === hor - alt ? hex('#5a6a9a') : y === hor - alt + 1 ? hex('#2e3a62') : hex('#161c38')); }
  for (const [x, k] of [[18, 0], [46, 1], [78, 2], [104, 3]]) { if (t < puertos + k * 0.18) continue; const on = Math.sin(t * 5 + k * 2) > -0.6, e = Math.min(1, (t - puertos - k * 0.18) * 3); for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < 6) tin(x + i, hor - 3 + j, hex('#ffd070'), e * 0.35 * (1 - d / 6)); } R.rect(x, hor - 4, x + 1, hor - 3, on ? hex('#fff0a0') : hex('#e0a040')); for (let j = 1; j < 9; j += 2) R.rect(x, hor + j + 1, x + 1, hor + j + 1, hex('#c8a050')); }
  // las estrellas que enseña Kemal: brillan y se unen una a una
  for (const [i, [x, y]] of ESTR.entries()) { const b = Math.sin(t * 4 + i * 1.7) > 0; R.pset(x, y, hex('#ffffff')); R.pset(x - 1, y, hex('#bcd0ff')); R.pset(x + 1, y, hex('#bcd0ff')); R.pset(x, y - 1, b ? hex('#ffffff') : hex('#8aa0d8')); R.pset(x, y + 1, b ? hex('#ffffff') : hex('#8aa0d8')); }
  const lc = tramo(t, P4 + 0.15, costas + 0.4) * (ESTR.length - 1);
  for (let i = 0; i < ESTR.length - 1; i++) { if (lc <= i) break; const f = Math.min(1, lc - i), [ax, ay] = ESTR[i], [bx, by] = ESTR[i + 1]; R.linea(ax, ay, Math.round(ax + (bx - ax) * f), Math.round(ay + (by - ay) * f), hex('#e8d890'), 2); }
  // el viento: ráfagas blancas que cruzan
  const w = tramo(t, vientos - 0.1, vientos + 1.1); if (w > 0 && w < 1) for (let k = 0; k < 7; k++) { const x = Math.round(-40 + w * 420 - k * 23), y = 44 + k * 13 + Math.round(Math.sin(w * 9 + k) * 2); R.rect(x, y, x + 12 + (k % 3) * 4, y, hex('#c8d4f0')); R.rect(x + 16 + (k % 3) * 4, y, x + 19 + (k % 3) * 4, y, hex('#c8d4f0')); }
  // Kemal señala las estrellas y luego la costa; el niño mira, sonríe y señala él también
  const kx = 166, k = R.actor(EL.kemal, kx, 150, t, { dir: -1, dedo: t > P4 + 0.1 && t < puertos - 0.05, sostiene: t >= puertos - 0.05 && t < memoria + 0.4 ? [kx - 14, 128] : false, habla: t > P4 + 0.1 && t < memoria && Math.sin(t * 7) > 0, sonrisa: t > memoria });
  R.actor(EL.piriNino, 136, 150, t, { dir: t < P4 + 0.6 ? 1 : -1, sorpresa: t > costas && t < vientos + 0.6, sonrisa: t > memoria - 0.2, dedo: t > memoria, salto: t > memoria && t < memoria + 0.35 ? 3 : 0 });
  T.marDelante(R, t, { hora: 'noche' });
};
const año = (t) => t < P2 ? 1465 : t < P3 ? 1481 : Math.round(lerp(1487, 1500, tramo(t, P3, E.duracion)));
const efectos = [[0.3, 'aldea'], [2.75, 'whoosh'], [kem, 'toc'], [almi, 'palmada'], [P3 + 0.3, 'lapiz'], [bat1, 'boom'], [bat2, 'boom'], [vientos, 'viento'], [puertos, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['pr-captura'] = ('La captura', '''// PR-CAPTURA (frase 8), 1501, cartela «1501». Cuatro planos:
// 1. frente a la costa de España, desde la proa de la galera: un marinero mira con el catalejo («Spain»), Kemal manda
//    («Kemal Reis») y señala las naos que huyen («captured»); el cañón dispara y en «seven ships» sale un 7 con siete
//    barquitos mientras los marineros lo celebran (corta en «Among»);
// 2. las naos rendidas: la nao grande, con la bandera blanca, abarloada a la galera; los prisioneros bajan por la plancha;
//    el marinero rubio se para ante Kemal y le cuenta, con un bocadillo, que cruzó el océano «3» veces (un barquito), y en
//    «Columbus» Kemal se queda de piedra (corta tras «Columbus»);
// 3. la bodega: un marinero abre el cofre del oro («something») y las monedas brillan, pero en «worth more» el prisionero
//    desenrolla su carta sobre el barril y en «gold» la carta brilla más; Kemal y el marinero se vuelven, boquiabiertos
//    (corta en «charts»);
// 4. gag 3, en la cubierta: el prisionero enseña la carta, una ráfaga se lleva tres hojas y Kemal salta y atrapa una al
//    vuelo; las otras dos se van al mar.''', HELP + r'''
const P2 = en('captura', .3425), P3 = en('captura', .6616), P4 = en('captura', .9009);
const espana = en('captura', .1155), kem = en('captura', .1634), capt = en('captura', .2024), siete = en('captura', .2257), naves = en('captura', .2841);
const marinero = en('captura', .4216), tres = en('captura', .5526), veces = en('captura', .576), colon = en('captura', .6227);
const llevaba = en('captura', .74), algo = en('captura', .7595), vale = en('captura', .779), oro = en('captura', .836), nuevas = en('captura', .9515);

// ── 1 · la caza frente a la costa de España ──
const catalejo = (x, y) => { R.linea(x, y, x + 10, y - 2, K); R.linea(x, y - 1, x + 10, y - 3, K); R.linea(x + 1, y - 1, x + 6, y - 2, hex('#d8a838')); R.linea(x + 6, y - 2, x + 9, y - 3, hex('#a87a28')); R.pset(x + 10, y - 3, hex('#cfe8ff')); };
const p1 = (t) => {
  const g = T.mar(R, t, { encuadre: 'costa' });
  // al rendirse, la nao más cercana iza una bandera blanca
  const nao = g.naos?.[0]; const iza = tramo(t, capt + 0.3, capt + 1.1);
  if (nao && iza > 0) { const x = nao[0] + 3, y0 = nao[1] - 70; const y = Math.round(y0 + 10 - iza * 10); for (let i = 0; i < 6; i++) { const yy = y + Math.round(Math.sin(t * 9 - i) * 0.8); R.rect(x + i, yy, x + i, yy + 3, i % 2 ? hex('#e4e4dc') : hex('#ffffff')); } R.linea(x - 1, y0 - 2, x - 1, y0 + 14, K); }
  // el 7 y los siete barquitos
  const e = tramo(t, siete, siete + 0.25);
  if (e > 0) { R.numero('7', 194, Math.round(lerp(60, 48, e)), { tam: 16, centro: true }); for (let k = 0; k < 7; k++) if (t > siete + 0.12 * k) R.icono('barco', 162 + k * 9, 54, hex('#fbf6e8'), K); }
  const a = R.actor(EL.marineroOtomano1, 10, 148, t, { dir: 1, sostiene: t > espana - 0.4 && t < siete ? [30, 128] : false, brazos: t > siete && t < naves + 0.7 && Math.sin(t * 9) > -0.4, sonrisa: t > siete });
  if (t > espana - 0.4 && t < siete) catalejo(a.mano[0], a.mano[1]);
  R.actor(EL.marineroOtomano2, 30, 148, t, { dir: 1, brazos: t > siete + 0.15 && t < naves + 0.8 && Math.sin(t * 9 + 1) > -0.4, habla: t > espana && t < kem && Math.sin(t * 8) > 0, sonrisa: t > siete });
  R.actor(EL.kemal, 56, 148, t, { dir: 1, dedo: t > capt - 0.15 && t < P2, habla: t > kem && t < capt && Math.sin(t * 7) > 0, sonrisa: t > siete });
  T.marDelante(R, t, { encuadre: 'costa' });
};

// ── 2 · la nao rendida y los prisioneros (fondo local) ──
const HOR2 = 92;
const borda = (x) => 98 - Math.max(0, x - 200) * 0.12;   // la regala de la nao, que sube hacia popa
const fondoNao = () => {
  tramado(0, HOR2, [hex('#3e7cc0'), hex('#5a94d0'), hex('#7eaedc'), hex('#a4c6e6'), hex('#c4dcee')]);
  // la costa de España, lejos: sierra azulada, un pueblo blanco y una torre
  for (let x = 0; x < 168; x++) { const y0 = Math.round(HOR2 - 6 - 9 * Math.exp(-(((x - 60) / 40) ** 2)) - 3 * Math.sin(x * 0.17) - h(x >> 1, 1) * 1.5); for (let y = y0; y < HOR2; y++) R.pset(x, y, y === y0 ? hex('#a8bcd4') : y < y0 + 3 ? hex('#8ca4c0') : (x + y) % 2 ? hex('#7a94b4') : hex('#86a0be')); }
  for (let k = 0; k < 9; k++) { const x = 30 + k * 6 + Math.round(h(k, 3) * 3), y = HOR2 - 6 - Math.round(h(k, 4) * 3); R.rect(x, y, x + 3, y + 2, hex('#f2eee4')); R.pset(x, y - 1, hex('#c86a4a')); R.pset(x + 1, y + 1, hex('#5a6a80')); }
  R.rect(118, HOR2 - 16, 121, HOR2 - 4, hex('#c8c0b0')); R.rect(117, HOR2 - 17, 122, HOR2 - 16, hex('#9a9284'));
  tramado(HOR2, 180, [hex('#4a8ab8'), hex('#3a78a6'), hex('#2e6894'), hex('#265a84')]);
};
const casco = () => {
  // los palos, las vergas con la vela aferrada y la jarcia (detrás del casco)
  for (const [px, top] of [[214, 14], [262, 22]]) { R.rect(px - 2, top, px + 2, 100, K); R.rect(px - 1, top, px + 1, 100, hex('#8a5a30')); R.pset(px - 1, top + 3, hex('#b07a44')); R.rect(px - 4, top + 6, px + 4, top + 9, K); R.rect(px - 3, top + 7, px + 3, top + 8, hex('#6a4022')); }
  for (const [x0, x1, y] of [[184, 244, 30], [236, 276, 40]]) { R.rect(x0, y, x1, y + 2, K); R.rect(x0 + 1, y + 1, x1 - 1, y + 1, hex('#7a4a28')); for (let x = x0 + 2; x < x1 - 1; x++) { const b = Math.round(2 + 2 * Math.abs(Math.sin(x * 0.35))); R.rect(x, y + 3, x, y + 3 + b, (x % 5) ? hex('#e8dcc0') : hex('#c4b494')); R.pset(x, y + 4 + b, K); } }
  for (const [ax, ay, bx, by] of [[214, 18, 186, 96], [214, 18, 240, 92], [262, 26, 238, 92], [262, 26, 288, 86], [214, 18, 262, 26]]) R.linea(ax, ay, bx, by, hex('#4a3624'));
  // el castillo de popa con sus ventanas y el farol
  R.rect(284, 56, 319, 90, K); R.rect(285, 57, 319, 90, hex('#6a4026'));
  for (let y = 58; y < 90; y += 4) R.rect(285, y, 319, y, hex('#4a2a18'));
  for (const x of [290, 302, 314]) { R.rect(x, 64, x + 6, 72, K); R.rect(x + 1, 65, x + 5, 71, hex('#e8c060')); R.pset(x + 3, 65, K); R.rect(x + 1, 68, x + 5, 68, K); }
  R.rect(283, 54, 319, 56, hex('#b07a44')); for (let x = 285; x < 320; x += 5) R.rect(x, 50, x + 1, 54, hex('#8a5a30'));
  // el casco: tracas que siguen el arrufo, dos cintas, portas con su tapa, clavos y el verdín de la flotación
  const top = (x) => Math.round(borda(x)), inf = 150;
  for (let x = 172; x < 320; x++) { const yt = x < 180 ? top(x) + (180 - x) * 2 : top(x); for (let y = yt; y <= inf; y++) { const d = y - top(x), tr = Math.floor(d / 5); let c = tr % 2 ? hex('#6a4026') : hex('#7a4c2e'); if (d % 5 === 0) c = hex('#3e2414'); if (tr === 3 || tr === 7) c = d % 5 === 0 ? hex('#a87040') : hex('#2a1a10'); if (y > inf - 4) c = (x + y) % 3 ? hex('#3a4a2a') : hex('#2a3620'); if ((x * 7 + tr * 13) % 23 === 0 && d % 5 === 2) c = hex('#c8a060'); R.pset(x, y, c); } R.pset(x, yt, K); R.pset(x, yt + 1, hex('#b07a44')); }
  R.linea(172, 100, 182, 150, K); R.linea(173, 100, 183, 150, hex('#4a2a18'));
  for (const x of [222, 250, 278, 306]) { const y = top(x) + 27; R.rect(x, y, x + 7, y + 6, K); R.rect(x + 1, y + 1, x + 6, y + 5, hex('#120a06')); R.rect(x, y - 6, x + 7, y - 1, K); R.rect(x + 1, y - 5, x + 6, y - 2, hex('#a83a2a')); R.linea(x + 3, y - 5, x + 3, y - 9, hex('#4a3624')); }
  // la escala de cuerda por el costado
  for (let y = 104; y < 146; y += 4) R.rect(236, y, 242, y, hex('#c8a870')); R.linea(236, 102, 236, 146, hex('#8a6a44')); R.linea(242, 102, 242, 146, hex('#8a6a44'));
};
const cubierta2 = () => {
  // nuestra galera: la regala de delante (con hueco para la plancha) y la cubierta de tablas con sus cosas
  for (let y = 150; y < 180; y++) { const fila = Math.floor((y - 150) / 6); for (let x = 0; x < 320; x++) { const s = (x + fila * 37) % 61; R.pset(x, y, (y - 150) % 6 === 0 ? hex('#4a2c16') : s === 0 ? hex('#4a2c16') : h(x >> 2, y, 11) > 0.85 ? hex('#a87a48') : fila % 2 ? hex('#8a6038') : hex('#946a40')); } }
  for (let x = 4; x < 320; x += 30) for (let y = 152; y < 180; y += 6) R.pset(x + (y % 12 ? 0 : 15), y, hex('#2a1a0e'));
  for (const [x0, x1] of [[0, 146], [182, 320]]) { R.rect(x0, 138, x1, 150, K); for (let y = 139; y < 150; y++) R.rect(x0, y, x1, y, y < 141 ? hex('#c08a50') : y % 4 === 0 ? hex('#4a2c16') : hex('#7a4c2a')); for (let x = x0 + 8; x < x1 - 4; x += 18) { R.rect(x, 142, x + 4, 147, K); R.rect(x + 1, 143, x + 3, 146, hex('#1a0e08')); } }
  // nuestro palo con la entena y la vela aferrada, y su jarcia
  for (const [ax, ay, bx, by] of [[59, 26, 18, 140], [59, 26, 104, 140], [59, 40, 6, 140]]) R.linea(ax, ay, bx, by, hex('#3a2a1c'));
  R.rect(55, 22, 63, 150, K); for (let y = 22; y < 150; y++) { R.rect(56, y, 62, y, hex('#8a5a30')); R.pset(57, y, hex('#b07a44')); R.pset(62, y, hex('#5a3418')); if (y % 11 === 0) R.rect(56, y, 62, y, hex('#6a4022')); }
  for (let s = 0; s <= 1; s += 0.004) { const x = Math.round(lerp(2, 152, s)), y = Math.round(lerp(106, 20, s)); R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, hex('#a87440')); const b = Math.round(3 + 2 * Math.abs(Math.sin(s * 40))); if (s > 0.05 && s < 0.95) for (let j = 2; j <= b + 2; j++) R.pset(x, y + j, j === b + 2 ? K : (Math.round(s * 250) % 9 === 0) ? hex('#a87440') : j < 4 ? hex('#fbf4e2') : hex('#e2d6bc')); }
  // un rollo de cabo, un cubo y una tinaja
  for (let r = 7; r >= 2; r -= 1.5) R.disco(262, 168, r, r % 3 < 1 ? hex('#8a6a40') : hex('#c8a870'));
  R.disco(262, 168, 1.5, hex('#4a3420'));
  R.rect(292, 156, 302, 168, K); R.rect(293, 157, 301, 167, hex('#7a5a3a')); R.rect(293, 160, 301, 160, hex('#3a3a40')); R.rect(293, 165, 301, 165, hex('#3a3a40')); R.rect(294, 157, 300, 158, hex('#3a6a8a'));
};
const PLANCHA = [[208, 101], [160, 165]];
const plancha = () => { const [[ax, ay], [bx, by]] = PLANCHA; for (let k = -2; k <= 2; k++) R.linea(ax, ay + k, bx, by + k, k === -2 ? hex('#d8a868') : k === 2 ? K : hex('#a87440')); for (let u = 0.1; u < 1; u += 0.15) { const x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u); R.rect(x - 2, y - 2, x + 2, y - 2, hex('#5a3a1e')); } };
const bajaPlancha = (u) => [lerp(PLANCHA[0][0] - 2, PLANCHA[1][0], u), lerp(PLANCHA[0][1] + 2, PLANCHA[1][1] + 2, u)];
const bocadillo = (bx, by, t) => {
  R.rect(bx - 14, by - 14, bx + 14, by, K); R.rect(bx - 13, by - 13, bx + 13, by - 1, hex('#fbf8ee'));
  R.poligono([[bx - 6, by], [bx - 1, by], [bx - 8, by + 5]], K); R.poligono([[bx - 5, by - 1], [bx - 2, by - 1], [bx - 7, by + 3]], hex('#fbf8ee'));
  if (t > tres) R.numero('3', bx - 11, by - 3, { tam: 8 });
  if (t > veces) R.icono('barco', bx + 2, by - 11, hex('#2a4a7a'), hex('#a8c0dc'));
};
const p2 = (t) => {
  capa('nao', fondoNao);
  nubes(t, [30, 52, 12], 1); nubes(t + 40, [20, 60, 30], 2);
  for (let k = 0; k < 3; k++) R.gaviota(Math.round(((t * (12 + k * 5) + k * 120) % 380) - 30), Math.round(54 + k * 7 + Math.sin(t * 1.3 + k) * 3), t, k);
  // dos naos más, rendidas, en el horizonte
  for (const [x, k] of [[130, 0], [156, 1]]) { const y = HOR2 - 1 + (Math.sin(t * 1.6 + k) > 0 ? 1 : 0); R.rect(x - 6, y - 3, x + 6, y, hex('#3a2a20')); R.linea(x, y - 12, x, y - 3, hex('#3a2a20')); R.rect(x - 4, y - 11, x + 4, y - 10, hex('#e8e0d0')); R.rect(x + 1, y - 15, x + 3, y - 13, hex('#ffffff')); }
  // el mar que se mueve
  for (let k = 0; k < 70; k++) { const y = HOR2 + 2 + Math.floor(h(k, 1) * 58), d = (y - HOR2) / 60, L = 2 + Math.round(d * 7), x = ((h(k, 2) * 360 + t * (3 + d * 6) + Math.sin(t * 1.5 + k) * 2) % 360) - 20; R.rect(Math.round(x), y, Math.round(x + L), y, d < 0.3 ? hex('#a8d0ec') : hex('#78b0d8')); R.rect(Math.round(x + 1), y + 1, Math.round(x + L - 1), y + 1, hex('#1e4e74')); }
  const dy = Math.sin(t * 1.4) > 0.3 ? 1 : 0;
  // los prisioneros que esperan en la nao (asoman por encima de la regala)
  const e1 = tramo(t, P2 + 0.1, P2 + 0.7), e2 = tramo(t, P2 + 0.7, P2 + 1.7), e3 = tramo(t, P2 + 1.7, P2 + 3.6);
  const p1 = tramo(t, P2 + 0.5, P2 + 1.1), p2_ = tramo(t, P2 + 1.1, marinero + 0.3), p3_ = tramo(t, marinero + 0.3, marinero + 1.3);
  if (e2 === 0) R.actor(EL.marineroEspanol, Math.round(lerp(222, 199, e1)), 104 + dy, t, { dir: -1, anda: e1 > 0 && e1 < 1, triste: true });
  if (p2_ === 0) R.actor(EL.prisionero, Math.round(lerp(244, 199, p1)), 104 + dy, t, { dir: -1, anda: p1 > 0 && p1 < 1, quieto: p1 === 0 });
  sprite('casco', casco, 0, dy);
  // la espuma contra el casco
  for (let k = 0; k < 18; k++) { const x = 180 + ((k * 23 + Math.floor(t * 9)) % 140), y = 147 + dy + Math.round(Math.sin(t * 3 + k) * 1.5); R.rect(x, y, x + 2 + (k % 3), y, hex('#e8f4fa')); }
  // la bandera blanca en el trinquete, que ondea
  for (let i = 0; i < 12; i++) { const yy = 13 + dy + Math.round(Math.sin(t * 7 - i * 0.7) * 1.2); R.rect(212 - i, yy, 212 - i, yy + 6, i === 11 ? K : (i + Math.floor(t * 7)) % 4 === 0 ? hex('#d8d8d0') : hex('#fbfbf6')); R.pset(212 - i, yy - 1, K); R.pset(212 - i, yy + 7, K); }
  capa2(t);
  // el gallardete rojo en lo alto de nuestro palo
  for (let i = 0; i < 14; i++) { const y = 23 + Math.round(Math.sin(t * 8 - i * 0.6) * 1.3 + i * 0.15); R.rect(64 + i, y, 64 + i, y + Math.max(1, 3 - (i >> 2)), i % 5 === 4 ? hex('#8a1a14') : hex('#c8302a')); }
  // por la plancha bajan los prisioneros
  if (e2 > 0 && e3 === 0) { const [x, y] = bajaPlancha(e2); R.actor(EL.marineroEspanol, Math.round(x) - 7, Math.round(y), t, { dir: -1, anda: e2 < 1, triste: true }); }
  if (p2_ > 0 && p3_ === 0) { const [x, y] = bajaPlancha(p2_); R.actor(EL.prisionero, Math.round(x) - 7, Math.round(y), t, { dir: -1, anda: p2_ < 1 }); }
  // en cubierta: un marinero tira del garfio, el guardia indica el camino, Kemal escucha
  const gx = 222, ga = R.actor(EL.marineroOtomano1, gx, 170, t, { dir: 1, sostiene: [gx + 22, 150 + Math.round(Math.sin(t * 2) * 2)] });
  R.linea(ga.mano[0], ga.mano[1], 252, 128 + dy, hex('#c8a870')); R.linea(ga.mano[0], ga.mano[1] + 1, 252, 129 + dy, hex('#6a5030'));
  R.actor(EL.marineroOtomano2, 120, 168, t, { dir: -1, dedo: t > P2 + 0.8 && t < marinero + 1.4, habla: t > P2 + 0.8 && t < P2 + 2 && Math.sin(t * 8) > 0 });
  const k = R.actor(EL.kemal, 36, 168, t, { dir: 1, dedo: t > P2 + 0.2 && t < P2 + 1.2, sorpresa: t > colon && t < P3 + 0.2, habla: t > P2 + 0.2 && t < P2 + 1.2 && Math.sin(t * 7) > 0 });
  if (p3_ > 0) { const x = Math.round(lerp(153, 72, p3_)); R.actor(EL.prisionero, x, 168, t, { dir: -1, anda: p3_ < 1, habla: p3_ >= 1 && t < colon + 0.4 && Math.sin(t * 8) > -0.2, dedo: t > tres && t < colon }); if (t > tres) bocadillo(x + 12, 128, t); }
  if (e3 > 0 && e3 < 1) R.actor(EL.marineroEspanol, Math.round(lerp(153, -20, e3)), 176, t, { dir: -1, anda: true, triste: true });
};
const capa2 = (t) => { sprite('cubierta2', cubierta2); plancha(); };

// ── 3 · la bodega: el oro y la carta ──
const p3 = (t) => {
  T.mar(R, t, { camara: 'bodega' });
  const ab = tramo(t, P3 + 0.3, algo), gira = t > oro - 0.05;
  R.actor(EL.marineroOtomano1, 254, 157, t, { dir: -1, sostiene: ab > 0 && ab < 1 ? [244, 132] : false, sonrisa: ab >= 1 && !gira, sorpresa: gira && t < oro + 1 });
  T.PIEZAS_PR.cofre(R, 236, 158, { abre: ab, s: 1.5 });
  // las monedas brillan… hasta que brilla más la carta
  if (ab > 0.6) for (let k = 0; k < 4; k++) { const f = (t * 1.7 + k * 0.37) % 1; if (f < 0.35) { const x = 228 + Math.round(h(k, Math.floor(t * 1.7 + k * 0.37)) * 16), y = 136 + Math.round(h(k + 9, Math.floor(t * 1.7)) * 5), c = gira ? hex('#c8a040') : hex('#fff4b0'); R.pset(x, y, c); R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); } }
  R.actor(EL.kemal, 186, 157, t, { dir: gira ? -1 : 1, sorpresa: gira && t < oro + 0.9, sonrisa: (t > algo && !gira) || t > oro + 0.9, habla: t > P3 + 0.2 && t < algo && Math.sin(t * 8) > 0 });
  const des = tramo(t, vale, vale + 0.8);
  R.actor(EL.prisionero, 128, 157, t, { dir: 1, sostiene: t > vale - 0.35 && t < vale + 0.8 ? [148, 137] : false, dedo: t >= vale + 0.8, habla: t > llevaba - 0.2 && t < vale - 0.35 && Math.sin(t * 7) > 0, sonrisa: t > oro });
  T.marDelante(R, t, { camara: 'bodega' });
  // el halo de la carta (más fuerte que el oro)
  const gl = tramo(t, oro - 0.15, oro + 0.3);
  if (gl > 0) { const r0 = 18 + Math.sin(t * 6) * 1.5; for (let y = 104; y < 146; y++) for (let x = 132; x < 190; x++) { const d = Math.hypot((x - 160) / 1.25, y - 126); if (d < r0) tin(x, y, hex('#ffe8a0'), gl * 0.35 * (1 - d / r0)); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.6, r1 = 16, r2 = 16 + gl * 7 + Math.sin(t * 9 + k) * 1.5; R.linea(Math.round(160 + Math.cos(a) * r1), Math.round(126 + Math.sin(a) * r1 * 0.8), Math.round(160 + Math.cos(a) * r2), Math.round(126 + Math.sin(a) * r2 * 0.8), hex('#fff0b0')); } }
  T.PIEZAS_PR.rollo(R, 160, 140, { abre: des });
};

// ── 4 · gag 3: la ráfaga se lleva las cartas y Kemal atrapa una al vuelo (fondo local) ──
const HOR4 = 100;
const fondoCubierta = () => {
  tramado(0, HOR4, [hex('#4a88c8'), hex('#649cd4'), hex('#86b4e0'), hex('#aacce8'), hex('#cae0f0')]);
  for (let x = 0; x < 96; x++) { const y0 = Math.round(HOR4 - 3 - 4 * Math.exp(-(((x - 40) / 26) ** 2)) - Math.sin(x * 0.3)); for (let y = y0; y < HOR4; y++) R.pset(x, y, y === y0 ? hex('#a4b8d0') : hex('#8aa2c0')); }
  tramado(HOR4, 132, [hex('#5a9ac4'), hex('#4686b4'), hex('#3a76a4'), hex('#2e6894')]);
  // la regala y la borda con las portas de los remos
  R.rect(0, 126, 319, 129, K); R.rect(0, 127, 319, 128, hex('#c8925a')); R.rect(0, 127, 319, 127, hex('#e0b07a'));
  for (let y = 130; y < 147; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y % 4 === 1 ? hex('#4a2c16') : (x * 3 + y) % 47 === 0 ? hex('#a87a48') : y < 138 ? hex('#7a4c2a') : hex('#6e4426'));
  for (let x = 14; x < 320; x += 34) { R.disco(x, 138, 3, K); R.disco(x, 138, 2, hex('#160c06')); R.rect(x - 1, 137, x + 7, 138, hex('#b08050')); R.pset(x + 7, 136, K); }
  for (let x = 0; x < 320; x += 12) { R.rect(x, 129, x + 1, 146, hex('#5a3418')); R.pset(x, 130, hex('#a87a48')); }
  // la cubierta de tablas en perspectiva
  const filas = [147, 152, 158, 165, 173, 181];
  for (let f = 0; f < filas.length - 1; f++) for (let y = filas[f]; y < filas[f + 1]; y++) for (let x = 0; x < 320; x++) { const s = (x + f * 53) % (70 + f * 10); R.pset(x, y, y === filas[f] ? hex('#3e2412') : s === 0 ? hex('#3e2412') : h(x >> 2, y >> 1, 12) > 0.88 ? hex('#b4864e') : f % 2 ? hex('#906440') : hex('#9a6e46')); }
  for (let f = 0; f < 5; f++) for (let x = 10 + f * 7; x < 320; x += 40) R.pset(x, filas[f] + 2, hex('#2a1a0e'));
  // el palo con sus cabillas y la jarcia; balas, un rollo de cabo y una tinaja
  R.rect(260, 0, 270, 147, K); for (let y = 0; y < 147; y++) { R.rect(261, y, 269, y, hex('#8a5a30')); R.pset(262, y, hex('#b07a44')); R.pset(268, y, hex('#5a3418')); if (y % 9 === 0) R.pset(265, y, hex('#6a4022')); }
  R.rect(252, 120, 278, 124, K); R.rect(253, 121, 277, 123, hex('#a87440')); for (const x of [255, 260, 272, 276]) { R.rect(x - 1, 116, x, 126, hex('#d8c8a0')); R.pset(x - 1, 116, K); }
  for (const [ax, ay, bx, by] of [[266, 20, 232, 127], [266, 20, 296, 127], [266, 40, 214, 127]]) { R.linea(ax, ay, bx, by, hex('#3a2a1c')); }
  for (let y = 40; y < 126; y += 9) { const u1 = (y - 20) / 107, u2 = (y - 20) / 107; R.linea(Math.round(266 - 34 * u1), y, Math.round(266 + 30 * u2), y, hex('#5a4630')); }
  for (const [x, y] of [[14, 168], [22, 168], [30, 168], [18, 163], [26, 163], [22, 158]]) { R.disco(x, y, 3.6, K); R.disco(x, y, 3, hex('#3a3a44')); R.pset(x - 1, y - 1, hex('#8a8a9a')); }
  for (let r = 9; r >= 2; r -= 1.5) R.disco(214, 166, r, Math.round(r * 2) % 3 ? hex('#c8a870') : hex('#8a6a40'));
  R.disco(214, 166, 1.5, hex('#3a2a1a'));
  R.poligono([[296, 172], [312, 172], [316, 160], [310, 146], [298, 146], [292, 160]], K); R.poligono([[297, 171], [311, 171], [315, 160], [309, 147], [299, 147], [293, 160]], hex('#c8683a')); R.rect(300, 142, 308, 147, K); R.rect(301, 143, 307, 146, hex('#a8502a')); R.linea(296, 158, 312, 158, hex('#8a3a1e')); R.pset(299, 152, hex('#e8a070'));
};
const hoja = (cx, cy, ang, esc) => {
  const w = 11 * Math.max(0.2, esc), hh = 7, ca = Math.cos(ang), sa = Math.sin(ang);
  const q = (u, v) => [Math.round(cx + u * w * ca - v * hh * sa), Math.round(cy + u * w * sa + v * hh * ca)];
  const pts = [q(-1, -1), q(1, -1), q(1, 1), q(-1, 1)];
  R.poligono(pts, hex('#ecd8a8')); for (let k = 0; k < 4; k++) R.linea(...pts[k], ...pts[(k + 1) % 4], K);
  R.linea(...q(-0.7, -0.6), ...q(-0.2, 0.1), hex('#3a6a3a')); R.linea(...q(-0.2, 0.1), ...q(0.1, 0.7), hex('#3a6a3a')); R.linea(...q(0.3, -0.7), ...q(0.6, 0.4), hex('#2a2018'));
  const [rx, ry] = q(0.45, -0.3); R.pset(rx, ry, hex('#c03020'));
};
const g0 = P4 + 0.35, tc = P4 + 1.6;
const p4 = (t) => {
  capa('cubierta', fondoCubierta);
  nubes(t, [22, 46, 10], 4);
  for (let k = 0; k < 2; k++) R.gaviota(Math.round(((t * (14 + k * 6) + k * 170) % 380) - 30), Math.round(60 + k * 9 + Math.sin(t * 1.2 + k) * 3), t, k + 2);
  for (const [x, k] of [[176, 0], [206, 1], [234, 2]]) { const y = HOR4 - 1 + (Math.sin(t * 1.5 + k) > 0 ? 1 : 0); R.rect(x - 5, y - 2, x + 5, y, hex('#3a2a20')); R.linea(x, y - 10, x, y - 2, hex('#3a2a20')); R.rect(x - 3, y - 9, x + 3, y - 8, hex('#e8e0d0')); }
  for (let k = 0; k < 40; k++) { const y = HOR4 + 2 + Math.floor(h(k, 5) * 24), d = (y - HOR4) / 26, L = 2 + Math.round(d * 6), x = ((h(k, 6) * 360 + t * (4 + d * 5)) % 360) - 20; R.rect(Math.round(x), y, Math.round(x + L), y, hex('#a8d0ec')); }
  // la vela latina hinchada (y que flamea con la ráfaga), la entena y el marinero que caza la escota
  const fl = tramo(t, g0, g0 + 1.4), bol = 10 + Math.sin(fl * Math.PI) * 8, ond = fl > 0 && fl < 1 ? 2.5 : 0.6;
  const A = [254, 20], B = [26, 96], C = [250, 118], pie = []; for (let s = 0; s <= 1.0001; s += 0.05) pie.push([lerp(B[0], C[0], s) + Math.sin(s * Math.PI) * bol * 0.4, lerp(B[1], C[1], s) + Math.sin(s * Math.PI) * bol + Math.sin(s * 14 + t * 9) * ond]);
  R.poligono([A, B, ...pie, C].map(([x, y]) => [Math.round(x), Math.round(y)]), (x, y) => { const d = (y - lerp(A[1], B[1], (A[0] - x) / (A[0] - B[0]))), cos = (x + Math.floor(y * 0.35)) % 15; return cos === 0 ? hex('#c8bc9e') : d > 34 ? hex('#d8ccae') : d > 18 ? hex('#ece2c8') : hex('#faf4e4'); });
  // remiendos, las dos filas de tomadores de rizos y la sombra de la jarcia sobre la lona
  for (const [x, y] of [[150, 64], [196, 84], [96, 82]]) { R.rect(x, y, x + 7, y + 5, hex('#e2d4b2')); for (let i = 0; i < 8; i += 2) { R.pset(x + i, y, hex('#a89a7a')); R.pset(x + i, y + 5, hex('#a89a7a')); } }
  for (const f of [0.78, 0.9]) for (let s = 0.08; s < 0.95; s += 0.035) { const x = Math.round(lerp(lerp(A[0], B[0], s), lerp(C[0], B[0], s), f) ), y = Math.round(lerp(lerp(A[1], B[1], s), lerp(C[1], B[1], s) + Math.sin(s * Math.PI) * bol, f)); R.pset(x, y, hex('#8a7a5a')); R.pset(x, y + 1, hex('#5a4a34')); }
  for (let s = 0.1; s < 0.9; s += 0.01) { const x = Math.round(lerp(150, 238, s)), y = Math.round(lerp(40, 116, s)); if (R.pget(x, y) !== 0) tin(x + 2, y, K, 0.12); }
  for (let k = 1; k < pie.length; k++) R.linea(Math.round(pie[k - 1][0]), Math.round(pie[k - 1][1]), Math.round(pie[k][0]), Math.round(pie[k][1]), K);
  R.linea(C[0], C[1], A[0], A[1], hex('#b8ac90'));
  for (let s = -0.05; s <= 1.05; s += 0.003) { const x = Math.round(lerp(A[0], B[0], s)), y = Math.round(lerp(A[1], B[1], s)); R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, hex('#a87440')); }
  const mo = R.actor(EL.marineroOtomano2, 226, 168, t, { dir: 1, sostiene: [240, 150], sorpresa: fl > 0 && fl < 0.7 });
  R.linea(mo.mano[0], mo.mano[1], C[0], C[1], hex('#c8a870'));
  // el fardo de cartas a los pies del prisionero (pierde dos hojas con la ráfaga)
  R.rect(50, 163, 68, 168, K); R.rect(51, 164, 67, 167, hex('#e0c890')); R.rect(51, 167, 67, 167, hex('#b89a64')); R.rect(58, 163, 59, 168, hex('#a83224'));
  if (t < g0 + 0.15) { R.rect(53, 160, 63, 163, K); R.rect(54, 161, 62, 162, hex('#ecd8a8')); }
  if (t < g0 + 0.3) { R.rect(56, 158, 66, 161, K); R.rect(57, 159, 65, 160, hex('#f2e2b8')); }
  // Kemal: salta y atrapa la hoja; luego la mira contento
  const sj = tramo(t, tc - 0.4, tc + 0.4), salto = sj > 0 && sj < 1 ? Math.round(Math.sin(sj * Math.PI) * 13) : 0;
  const kx = 136, agarra = t > tc - 0.4;
  const k = R.actor(EL.kemal, kx, 168, t, { dir: -1, salto, sostiene: agarra ? (t < tc + 0.4 ? [kx - 2, 118 - salto] : [kx - 10, 152]) : false, habla: t < g0 && Math.sin(t * 7) > 0, sorpresa: t > g0 && t < tc - 0.4, sonrisa: t > tc + 0.2 });
  if (t >= tc) T.PIEZAS_PR.carta(R, k.mano[0] - (t > tc + 0.4 ? 8 : 0), k.mano[1] + (t > tc + 0.4 ? 6 : 2));
  // el prisionero enseña su carta; la ráfaga se la lleva
  const px = 72, pr = R.actor(EL.prisionero, px, 168, t, { dir: 1, sostiene: t < g0 ? [px + 22, 136] : false, brazos: t > g0 + 0.2 && t < tc - 0.2, sorpresa: t > g0 && t < tc + 0.3, sonrisa: t > tc + 0.5, habla: t < g0 && Math.sin(t * 8 + 1) > 0 });
  if (t < g0) T.PIEZAS_PR.carta(R, pr.mano[0] + 4, pr.mano[1] + 2);
  // las tres hojas al vuelo
  const ua = tramo(t, g0, g0 + 1.7); if (ua > 0 && ua < 1) hoja(lerp(pr.mano[0] + 4, 350, ua), pr.mano[1] - 6 - Math.sin(ua * Math.PI) * 46 - ua * 20, t * 7, Math.abs(Math.cos(t * 9)));
  const ub = tramo(t, g0 + 0.15, tc); if (ub > 0 && ub < 1) hoja(lerp(58, k.mano[0], ub), lerp(160, k.mano[1] - 6, ub) - Math.sin(ub * Math.PI) * 36, t * 6 + 1, Math.abs(Math.cos(t * 8 + 1)));
  const uc = tramo(t, g0 + 0.3, g0 + 2.4); if (uc > 0 && uc < 1) hoja(lerp(61, 300, uc), 158 - Math.sin(uc * Math.PI) * 78 + uc * 12, -t * 5, Math.abs(Math.cos(t * 10 + 2)));
  // la ráfaga
  const w = tramo(t, g0 - 0.1, g0 + 1.1); if (w > 0 && w < 1) for (let i = 0; i < 9; i++) { const x = Math.round(-60 + w * 440 - i * 19), y = 70 + i * 11 + Math.round(Math.sin(w * 8 + i) * 3); R.rect(x, y, x + 10 + (i % 3) * 5, y, hex('#f2f6fa')); R.rect(x + 14 + (i % 3) * 5, y, x + 17 + (i % 3) * 5, y, hex('#f2f6fa')); }
};
const efectos = [[1.4, 'ola'], [5.0, 'boom'], [siete + 0.35, 'palmada'], [P2 + 0.8, 'toc'], [tres, 'pop'], [P3 + 0.3, 'cerrojo'], [oro, 'brillo'], [g0, 'rafaga'], [tc, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1501', efectos, año: 1501 });
''')

E['pr-taller'] = ('El taller', '''// PR-TALLER (frase 9), 1511–1513. Cuatro planos:
// 1. 1511: de noche, el temporal; la galera de Kemal sube y baja entre olas enormes; un relámpago en «1511»; Kemal
//    aprieta contra el pecho el rollo de cartas, que brilla en «those charts» (sin hundimientos ni nadie en el agua);
// 2. el taller de Galípoli: un marinero entra con el rollo y se lo da a Piri («passed to his nephew»), que lo recibe
//    serio; en «Two years later» (1513) Piri cruza el taller, se sienta a la mesa en «sat down» y extiende la carta;
// 3. la mesa desde arriba: la mano de Piri dibuja la costa mientras cuatro cartas de estilos distintos llegan volando
//    («gather in a single map») y en «everything» se unen con hilos de oro a la rosa del centro;
// 4. la piel de gacela en su bastidor: la mano la alisa («gazelle skin») y dibuja una rosa («compass roses»), dos
//    barcos («ships»), un loro y una torre («little drawings»), y escribe tres notas que se unen con un hilo de puntos
//    a las cartas clavadas en el bastidor («where each piece came from»).''', HELP + r'''
const P2 = en('taller', .1404), P3 = en('taller', .4236), P4 = en('taller', .712);
const a1511 = en('taller', .0761), sobrino = en('taller', .2256), dos = en('taller', .265), gal = en('taller', .3103), sienta = en('taller', .3774);
const reunir = en('taller', .5033), unico = en('taller', .5496), todo = en('taller', .5667), mundo = en('taller', .649);
const gacela = en('taller', .7149), rosas = en('taller', .7647), barcos = en('taller', .8073), dibujos = en('taller', .8589), escribe = en('taller', .907), pieza = en('taller', .955);

// ── 1 · el temporal de 1511 ──
const p1 = (t) => {
  const g = T.mar(R, t, { encuadre: 'costa', camara: 'tormenta', rayo: 1.68 }), c = g.galera.cubierta;
  const [ax, ay] = c(-34), [bx, by] = c(-10), [kx, ky] = c(22);
  R.actor(EL.marineroOtomano1, ax - 7, ay, t, { dir: 1, brazos: g.rayo > 0.3, sorpresa: g.rayo > 0.3 || (t > a1511 && t < a1511 + 0.6), dedo: t > 0.6 && t < 1.6 });
  R.actor(EL.marineroOtomano2, bx - 7, by, t, { dir: 1, sostiene: [bx + 8, by - 22], triste: true });
  const k = R.actor(EL.kemal, kx - 7, ky, t, { dir: -1, sostiene: true, triste: t > 2.6 });
  rollito(k.mano[0] - 2, k.mano[1]);
  const gl = tramo(t, 2.75, 3.3); if (gl > 0) { const [x, y] = k.mano; for (let j = -9; j <= 9; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i / 1.2, j); if (d < 9) tin(x - 2 + i, y + j, hex('#ffe8a0'), gl * 0.45 * (1 - d / 9)); } }
  T.marDelante(R, t, { encuadre: 'costa', camara: 'tormenta' });
};

// ── 2 · el taller: el rollo llega a manos de Piri, que se sienta a la mesa ──
const p2 = (t) => {
  T.galipoli(R, t, {});
  // el marinero entra con el rollo, se lo da y se va
  const s1 = tramo(t, P2 + 0.1, sobrino - 0.4), s2 = tramo(t, dos - 0.6, dos + 0.9);
  const sx = Math.round(s2 > 0 ? lerp(44, -22, s2) : lerp(-18, 44, s1));
  const da = t < sobrino + 0.1;
  const sm = R.actor(EL.marineroOtomano2, sx, 168, t, { dir: s2 > 0 ? -1 : 1, anda: (s1 > 0 && s1 < 1) || (s2 > 0 && s2 < 1), sostiene: da ? [sx + 20, 152] : false, habla: t > sobrino - 0.6 && t < sobrino && Math.sin(t * 8) > 0, triste: true });
  if (da) rollito(sm.mano[0] + 2, sm.mano[1]);
  // Piri: recibe el rollo, cruza el taller y se sienta detrás de la mesa
  const w1 = tramo(t, dos + 0.15, gal + 0.3), w2 = tramo(t, gal + 0.3, sienta - 0.1), si = tramo(t, sienta - 0.1, sienta + 0.2);
  let px = 72, py = 168; if (w2 > 0) { px = lerp(132, 192, w2); py = lerp(168, 145, w2); } else if (w1 > 0) px = lerp(72, 132, w1);
  py += si * 4;
  const deja = tramo(t, sienta + 0.35, sienta + 0.7), lleva = t > sobrino - 0.05 && deja < 1;
  const pi = R.actor(EL.piri, Math.round(px), Math.round(py), t, { dir: w1 > 0 ? 1 : -1, anda: (w1 > 0 && w1 < 1) || (w2 > 0 && w2 < 1), sostiene: (t > sobrino - 0.3 && t < sobrino + 0.1) ? [px - 6, 152] : lleva ? true : false, triste: t > sobrino && t < dos, sonrisa: t > sienta + 0.4, habla: t > sienta + 0.4 && Math.sin(t * 6) > 0.3 });
  // el rollo en la mano va detrás de la mesa mientras Piri está detrás; al dejarlo, encima del tablero
  const rx = pi.mano[0] + (deja > 0 ? Math.round(deja * 14) : 1), ry = pi.mano[1] - Math.round(Math.sin(deja * Math.PI) * 4);
  if (lleva && t > sobrino + 0.1 && deja === 0) rollito(rx, ry);
  T.galipoliDelante(R, t, {});
  if (lleva && deja > 0) rollito(rx, ry);
  // la carta se extiende sobre la mesa
  const ex = tramo(t, sienta + 0.7, sienta + 1.0);
  if (ex > 0) { const x0 = 206, x1 = Math.round(206 + ex * 30); R.poligono([[x0, 136], [x1, 136], [x1 + 3, 140], [x0 + 3, 140]], hex('#ecd8a8')); R.linea(x0, 136, x1, 136, K); R.linea(x0 + 3, 140, x1 + 3, 140, hex('#b89a64')); if (ex > 0.6) { R.linea(x0 + 6, 137, x0 + 10, 139, hex('#3a6a3a')); R.pset(x0 + 18, 138, hex('#c03020')); R.linea(x0 + 22, 137, x0 + 27, 138, hex('#2a2018')); } }
};

// ── 3 · la mesa desde arriba: las cartas de todo el mundo llegan a la piel ──
const CARTAS = [['ptolomeo', -30, 30, 66, 40, reunir], ['arabe', 140, -24, 136, 28, reunir + 0.35], ['portugues', 350, 70, 232, 42, unico], ['colon', 352, 160, 236, 124, unico + 0.35]];
const p3 = (t) => {
  const tr = lerp(0.12, 0.62, tramo(t, P3 + 0.2, P4 - 0.2));
  T.galipoli(R, t, { camara: 'mesa', trazo: tr });
  for (const [est, x0, y0, x1, y1, t0] of CARTAS) {
    const u = tramo(t, t0, t0 + 0.8); if (u <= 0) continue; const e = 1 - (1 - u) ** 3;
    const x = Math.round(lerp(x0, x1, e)), y = Math.round(lerp(y0, y1, e) - Math.sin(u * Math.PI) * 10);
    T.c_carta(R, x, y, est, { levanta: u < 1 ? 0.6 : Math.max(0, Math.sin(t * 2 + x) * 0.3) });
    const v = tramo(t, todo + (x1 > 160 ? 0.3 : 0), mundo); if (v > 0) { const tx = 166, ty = 92, dx = tx - x1, dy = ty - y1, n = Math.hypot(dx, dy), m = Math.round(v * (n - 16));
      for (let s = 16; s < 16 + m; s++) if (s % 4 < 2) { const px = Math.round(x1 + dx * s / n), py = Math.round(y1 + dy * s / n); R.pset(px, py, hex('#ffd860')); R.pset(px + 1, py + 1, hex('#8a5a10')); }
      if (v >= 1 && Math.sin(t * 10 + x1) > 0) for (const [ix, iy] of [[-16, -12], [15, -12], [-16, 11], [15, 11]]) R.pset(x1 + ix, y1 + iy, hex('#fff4b0')); }
  }
  T.galipoliDelante(R, t, { camara: 'mesa', trazo: tr });
};

// ── 4 · la piel de gacela en su bastidor (fondo local): la rosa, los barcos, los dibujos y las notas ──
const PIEL = []; for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), l = 1 + 0.05 * Math.cos(4 * a) + 0.025 * Math.sin(9 * a); PIEL.push([152 + Math.sign(c) * Math.abs(c) ** 0.5 * 110 * l, 99 + Math.sign(s) * Math.abs(s) ** 0.5 * 58 * l]); }
const SUR = [[20, 20], [62, 40], [66, 52], [78, 66], [86, 82], [98, 96], [108, 112], [114, 126], [120, 140], [114, 172], [20, 172]];
const AFR = [[300, 20], [238, 34], [228, 44], [234, 54], [222, 68], [228, 86], [224, 102], [236, 118], [244, 132], [250, 150], [300, 172]];
const ISL = [[[82, 44], [92, 42], [96, 46], [86, 48]], [[100, 52], [108, 50], [110, 55], [102, 56]], [[116, 46], [122, 45], [123, 49], [117, 49]], [[150, 46], [157, 45], [158, 49], [151, 50]], [[200, 60], [204, 59], [205, 62], [201, 63]]];
const dentro = (x, y, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const S = new Uint8Array(320 * 180);   // 0 fuera de la piel, 1 mar, 2 tierra del oeste, 3 tierra del este
for (let y = 30; y < 168; y++) for (let x = 30; x < 276; x++) if (dentro(x, y, PIEL)) S[y * 320 + x] = dentro(x, y, SUR) || ISL.some((I) => dentro(x, y, I)) ? 2 : dentro(x, y, AFR) ? 3 : 1;
const sv = (x, y) => x < 0 || x > 319 || y < 0 || y > 179 ? 0 : S[y * 320 + x];
const fondoPiel = () => {
  // la pared encalada (tranquila arriba a la derecha), con grietas, desconchones y el zócalo de azulejos
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 2, 21), f = h(x, y, 22), luz = (x + y * 0.8) < 200 ? 0.06 : 0; R.pset(x, y, mez(f > 0.97 ? hex('#d4c09a') : n > 0.82 ? hex('#e6d6b2') : hex('#eee0c0'), hex('#fff6e0'), luz)); }
  for (const [x, y, l] of [[8, 34, 16], [290, 124, 18], [6, 120, 12], [16, 150, 10]]) for (let i = 0; i < l; i++) R.pset(x + Math.round(Math.sin(i * 0.9) * 2), y + i, hex('#b8a07a'));
  for (const [x, y] of [[12, 90], [298, 84], [306, 172]]) { R.disco(x, y, 4, hex('#c8b08a')); R.disco(x + 1, y, 3, hex('#d8c4a0')); for (let i = -3; i <= 3; i++) R.pset(x + i, y + 4, hex('#a8906a')); }
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = x % 10, cy = (y - 172) % 10; R.pset(x, y, cx === 0 || cy === 0 ? hex('#e8e8e0') : (cx - 5) ** 2 + (cy - 5) ** 2 < 6 ? hex('#2a5aa8') : (cx + cy) % 4 === 0 ? hex('#3a9a9a') : hex('#f4f2ec')); }
  // a la izquierda, el astrolabio colgado de su clavo; a la derecha, la repisa con botes de tinta y un rollo apoyado
  R.linea(13, 52, 13, 60, hex('#4a3624')); R.pset(13, 51, K); T.PIEZAS_PR.astrolabio(R, 13, 80);
  R.rect(281, 104, 319, 107, K); R.rect(282, 105, 319, 106, hex('#8a5a30')); for (const [x, c] of [[287, '#2a4a7a'], [297, '#a83224'], [307, '#3a6a3a']]) { R.rect(x - 3, 96, x + 3, 104, K); R.rect(x - 2, 97, x + 2, 104, hex(c)); R.rect(x - 2, 95, x + 2, 96, hex('#d8c8a8')); R.pset(x - 1, 99, hex('#ffffff')); }
  R.rect(296, 124, 304, 171, K); R.rect(297, 125, 303, 170, hex('#e8d4a4')); R.rect(297, 125, 303, 127, hex('#fff4d8')); R.rect(297, 146, 303, 148, hex('#a83224')); R.rect(303, 126, 303, 170, hex('#c8b080'));
  // el bastidor: cuatro listones con vetas, clavijas en las esquinas y sus patas
  const MD = [hex('#5a3418'), hex('#7a4a26'), hex('#9a6436')];
  const liston = (x0, y0, x1, y1, vert) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin((vert ? y : x) * 0.3 + (vert ? x : y) * 1.7); R.pset(x, y, v > 0.7 ? MD[2] : v < -0.5 ? MD[0] : MD[1]); } };
  R.rect(42, 170, 48, 179, K); R.rect(43, 170, 47, 179, MD[1]); R.rect(256, 170, 262, 179, K); R.rect(257, 170, 261, 179, MD[1]);
  liston(26, 26, 278, 31, false); liston(26, 164, 278, 169, false); liston(24, 26, 29, 169, true); liston(273, 26, 278, 169, true);
  for (const [x, y] of [[26, 28], [276, 28], [26, 166], [276, 166]]) { R.disco(x, y, 2.4, K); R.disco(x, y, 1.6, hex('#c8a060')); }
  // los cordones que tensan la piel al bastidor
  for (let k = 0; k < PIEL.length; k += 2) { const [x, y] = PIEL[k], dx = x - 152, dy = (y - 99) * 1.9, n = Math.hypot(dx, dy) || 1; let u = 400; if (dx) u = Math.min(u, ((dx > 0 ? 272 : 31) - x) / (dx / n)); if (dy) u = Math.min(u, ((dy > 0 ? 163 : 32) - y) / (dy / n)); const fx = x + dx / n * u, fy = y + dy / n * u; R.linea(x, y, fx, fy, hex('#8a7044')); R.linea(x + 1, y, fx + 1, fy, hex('#d8c090')); }
  // la piel: mar de pergamino, las tierras del oeste (verde) y del este (ocre), costas a tinta, el borde oscuro
  for (let y = 30; y < 168; y++) for (let x = 30; x < 276; x++) { const s = sv(x, y); if (!s) continue; let borde = 9; for (let d = 1; d <= 3 && borde > 3; d++) if (!sv(x + d, y) || !sv(x - d, y) || !sv(x, y + d) || !sv(x, y - d)) borde = d;
    const n = h(x >> 3, y >> 3, 23) * 0.6 + h(x >> 1, y >> 1, 24) * 0.4, f = h(x, y, 25);
    let c = s === 2 ? (n > 0.7 ? hex('#a8bc80') : (x + y) % 2 ? hex('#b8c890') : hex('#bccc94')) : s === 3 ? (n > 0.7 ? hex('#d4b07a') : (x + y) % 2 ? hex('#e0c088') : hex('#e4c690')) : (n > 0.74 ? hex('#dcc08c') : f > 0.95 ? hex('#cfb07a') : n < 0.25 ? hex('#f2e2b8') : hex('#ead6a6'));
    if (s > 1 && (sv(x + 1, y) === 1 || sv(x - 1, y) === 1 || sv(x, y + 1) === 1 || sv(x, y - 1) === 1)) c = hex('#2a2018'); else if (s > 1 && (sv(x + 2, y) === 1 || sv(x - 2, y) === 1 || sv(x, y + 2) === 1 || sv(x, y - 2) === 1)) c = mez(c, hex('#6a4a2a'), 0.35);
    if (borde === 1) c = hex('#8a6a40'); else if (borde <= 3) c = mez(c, hex('#a8844c'), 0.4 / borde);
    R.pset(x, y, c); }
  // las líneas de rumbo desde la rosa de en medio (solo sobre la piel)
  for (let k = 0; k < 32; k++) { const a = k * Math.PI / 16, col = k % 4 === 0 ? hex('#2a2018') : k % 2 ? hex('#b03424') : hex('#3a7a3a'); R.linea(166, 72, 166 + Math.cos(a) * 260, 72 + Math.sin(a) * 260, (x, y) => sv(x, y) ? mez(R.pget(x, y), col, 0.3) : null); }
  T.PIEZAS_PR.rosa(R, 166, 81);
  // lo que ya está dibujado: árboles y un mono en el oeste; montes, un castillo y una bandera en el este; dos naos; notas
  for (const [x, y] of [[44, 70], [52, 84], [40, 100], [60, 102], [70, 118], [50, 128], [84, 128], [64, 142], [96, 150]]) if (sv(x, y) === 2) { R.poligono([[x - 3, y + 2], [x, y - 4], [x + 3, y + 2]], hex('#2a6a2a')); R.pset(x, y + 3, hex('#5a3a1a')); R.pset(x - 1, y - 1, hex('#5a9a4a')); }
  for (const [x, y] of [[246, 60], [252, 76], [244, 94], [258, 104], [262, 122]]) if (sv(x, y) === 3) { R.linea(x - 4, y + 2, x, y - 3, hex('#7a5a30')); R.linea(x, y - 3, x + 4, y + 2, hex('#4a3420')); R.pset(x - 1, y - 1, hex('#a88a58')); }
  { const x = 248, y = 46; R.rect(x - 4, y - 7, x + 4, y, K); R.rect(x - 3, y - 6, x + 3, y, hex('#e8e0d0')); for (const dx of [-4, -1, 2]) R.rect(x + dx, y - 9, x + dx + 1, y - 8, K); R.linea(x, y - 15, x, y - 9, K); R.rect(x + 1, y - 15, x + 4, y - 13, hex('#c8302a')); }
  for (const [x, y] of [[146, 58], [190, 104], [130, 96]]) { R.poligono([[x - 5, y], [x + 5, y], [x + 3, y + 2], [x - 3, y + 2]], hex('#6a3a1a')); R.linea(x, y - 7, x, y, K); R.rect(x - 3, y - 6, x - 1, y - 2, hex('#f4ecd8')); R.rect(x + 1, y - 5, x + 3, y - 2, hex('#f4ecd8')); R.pset(x - 2, y - 4, hex('#b03424')); R.pset(x + 2, y - 4, hex('#b03424')); }
  for (const [x, y, n] of [[236, 112, 14], [240, 126, 10], [48, 116, 12], [56, 60, 10], [180, 50, 12]]) for (let i = 0; i < n; i++) R.pset(x + i, y + Math.round(Math.sin(i * 1.4)), hex('#4a3420'));
  for (let k = 0; k < 26; k++) { const x = 70 + Math.floor(h(k, 31) * 170), y = 50 + Math.floor(h(k, 32) * 100); if (sv(x, y) === 1 && sv(x + 3, y) === 1) { R.pset(x, y, hex('#9aa89a')); R.pset(x + 1, y - 1, hex('#9aa89a')); R.pset(x + 2, y, hex('#9aa89a')); } }
  // las dos cartas clavadas en el bastidor (de dónde salió cada pieza)
  for (const [cx, cy, est] of [[38, 146, 'arabe'], [266, 146, 'portugues']]) { T.c_carta(R, cx, cy, est); R.disco(cx, cy - 10, 1.5, hex('#c8302a')); R.pset(cx - 1, cy - 11, hex('#ff8070')); }
};
// las piezas nuevas, que se dibujan trazo a trazo
const ROSA = [150, 131];
const rosaNueva = (p) => {
  const [cx, cy] = ROSA;
  for (let k = 0; k < 16; k++) { if (k / 16 >= p) break; const a = k * Math.PI / 8 - Math.PI / 2, r = k % 4 === 0 ? 14 : k % 2 === 0 ? 9 : 6, w = k % 4 === 0 ? 3 : 2, nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
    const col = k % 4 === 0 ? (k % 8 === 0 ? hex('#b03424') : hex('#2a4a7a')) : k % 2 === 0 ? hex('#d8a838') : hex('#3a2818');
    R.poligono([[cx + nx, cy + ny], [cx + Math.cos(a) * r, cy + Math.sin(a) * r], [cx - nx, cy - ny]].map(([x, y]) => [Math.round(x), Math.round(y)]), col); }
  if (p > 0.9) { for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; if (k % 2) R.pset(Math.round(cx + Math.cos(a) * 15), Math.round(cy + Math.sin(a) * 15), hex('#3a2818')); } R.disco(cx, cy, 2, hex('#d8a838')); R.pset(cx, cy, K); }
};
const barco = (x, y, p) => {
  if (p > 0) { R.poligono([[x - 7, y], [x + 7, y], [x + 5, y + 3], [x - 5, y + 3]], hex('#6a3a1a')); R.linea(x - 7, y, x + 7, y, K); }
  if (p > 0.35) R.linea(x, y - 10, x, y, hex('#3a2818'));
  if (p > 0.65) { R.rect(x - 4, y - 9, x - 1, y - 2, hex('#f4ecd8')); R.rect(x + 1, y - 8, x + 4, y - 3, hex('#f4ecd8')); R.rect(x - 4, y - 6, x - 1, y - 5, hex('#b03424')); R.rect(x + 1, y - 6, x + 4, y - 5, hex('#b03424')); R.pset(x, y - 11, hex('#b03424')); }
};
const loro = (x, y, p) => {
  if (p > 0) { R.rect(x - 2, y - 6, x + 1, y, hex('#2a8a3a')); R.pset(x + 2, y - 2, hex('#2a8a3a')); R.rect(x - 1, y + 1, x - 1, y + 4, hex('#2a8a3a')); }
  if (p > 0.4) { R.rect(x - 2, y - 9, x + 1, y - 7, hex('#c83024')); R.pset(x + 2, y - 8, hex('#e8b030')); R.pset(x, y - 8, K); }
  if (p > 0.75) { R.rect(x - 4, y - 5, x - 3, y - 1, hex('#2a5aa8')); R.linea(x - 6, y + 1, x + 4, y + 1, hex('#6a4a2a')); }
};
const torre = (x, y, p) => {
  if (p > 0) { R.rect(x - 4, y - 10, x + 4, y, hex('#d8c4a0')); R.linea(x - 4, y - 10, x - 4, y, K); R.linea(x + 4, y - 10, x + 4, y, K); R.linea(x - 4, y, x + 4, y, K); }
  if (p > 0.5) { for (const dx of [-4, -1, 2]) R.rect(x + dx, y - 12, x + dx + 1, y - 11, K); R.rect(x - 1, y - 5, x + 1, y, K); }
  if (p > 0.8) { R.linea(x, y - 18, x, y - 12, K); R.rect(x + 1, y - 18, x + 4, y - 16, hex('#c8302a')); }
};
const NOTAS = [[122, 152, 24], [176, 156, 20], [96, 156, 18]];
const PLUMA = [[P4, 236, 176], [gacela, 226, 150], [gacela + 0.5, 176, 148], [rosas - 0.25, 156, 142], [rosas, 150, 131], [rosas + 0.6, 150, 131], [barcos - 0.1, 196, 134], [barcos + 0.4, 196, 134], [barcos + 0.5, 222, 148], [barcos + 0.85, 222, 148], [dibujos - 0.15, 88, 142], [dibujos + 0.4, 88, 142], [dibujos + 0.5, 250, 126], [dibujos + 0.9, 250, 126], [escribe - 0.05, 122, 152], [escribe + 0.45, 146, 152], [escribe + 0.55, 176, 156], [escribe + 1.0, 196, 156], [escribe + 1.1, 96, 156], [escribe + 1.6, 114, 156], [escribe + 2.4, 140, 178]];
const pluma = (t) => { let i = 0; while (i + 1 < PLUMA.length && PLUMA[i + 1][0] < t) i++; const a = PLUMA[i], b = PLUMA[Math.min(i + 1, PLUMA.length - 1)]; const u = b[0] > a[0] ? Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0]))) : 0; return [lerp(a[1], b[1], u), lerp(a[2], b[2], u)]; };
const p4 = (t) => {
  capa('piel', fondoPiel);
  // el haz de sol que entra en diagonal, con sus motas
  for (let k = 0; k < 16; k++) { const f = (t * 0.06 + k / 16) % 1, x = Math.round(30 + f * 150 + Math.sin(t * 0.7 + k) * 3), y = Math.round(10 + f * 120 + h(k, 3) * 30); if (Math.sin(t * 3 + k) > -0.2) tin(x, y, hex('#fff8e0'), 0.7); }
  rosaNueva(tramo(t, rosas - 0.05, rosas + 0.6));
  barco(196, 138, tramo(t, barcos - 0.05, barcos + 0.35)); barco(222, 152, tramo(t, barcos + 0.5, barcos + 0.85));
  loro(88, 146, tramo(t, dibujos - 0.1, dibujos + 0.4)); torre(250, 130, tramo(t, dibujos + 0.5, dibujos + 0.9));
  // las notas (garabatos de tinta) y el hilo de puntos que las une a su carta
  for (const [i, [x, y, n]] of NOTAS.entries()) { const t0 = escribe + i * 0.55 - (i === 2 ? 0 : 0), u = tramo(t, t0, t0 + 0.45); for (let k = 0; k < Math.round(n * u); k++) R.pset(x + k, y + Math.round(Math.sin(k * 1.2) * 1.3), hex('#2a2018'));
    const v = tramo(t, pieza + i * 0.2, pieza + i * 0.2 + 0.5); if (v > 0) { const [tx, ty] = x > 150 ? [256, 140] : [48, 140], sx = x > 150 ? x + n : x, dx = tx - sx, dy = ty - y, m = Math.hypot(dx, dy); for (let s = 0; s < m * v; s += 3) R.pset(Math.round(sx + dx * s / m), Math.round(y + dy * s / m), hex('#b03424')); } }
  // la mano de Piri con la pluma (el brazo canónico, que entra por abajo)
  const [px0, py0] = pluma(t), trazando = (t > rosas && t < rosas + 0.6) || (t > barcos && t < barcos + 0.85) || (t > dibujos && t < dibujos + 0.9) || (t > escribe && t < escribe + 1.6);
  const px = Math.round(px0 + (trazando ? Math.sin(t * 17) * 1.2 : 0)), py = Math.round(py0 + (trazando ? Math.cos(t * 13) * 0.8 : 0));
  const fx = px + 18, fy = py - 20; R.linea(px, py, fx, fy, hex('#c8bca0')); R.linea(px + 1, py, fx + 1, fy, K);
  for (let k = 6; k <= 20; k++) { const x = px + k * 0.9, y = py - k; R.pset(Math.round(x - 1), Math.round(y), k % 3 ? hex('#6a8ac0') : hex('#c8bca0')); R.pset(Math.round(x - 2), Math.round(y + 1), hex('#6a8ac0')); R.pset(Math.round(x + 1), Math.round(y - 1), hex('#f2ead8')); }
  T.brazo(R, px + 14 + Math.round((184 - py) * 0.5), 186, px + 14, py + 1, '#2e5a9a', -1, { puno: '#f6f2e8' });
};
const año = (t) => t < dos ? 1511 : 1513;
const efectos = [[0.1, 'lluvia'], [a1511, 'trueno'], [sobrino, 'papel'], [sienta, 'golpecito'], [P3 + 0.2, 'lapiz'], [reunir, 'papel'], [unico, 'papel'], [rosas, 'lapiz'], [barcos, 'pop'], [dibujos, 'lapiz'], [escribe, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
