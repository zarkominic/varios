# Borrador de escenas del ep15, grupo S7: ny-llegan, ny-ellis, ny-distritos (con el movimiento hecho).
E = {}

# piezas comunes de los fondos locales (se copian en cada escena)
H = r'''
const K = hex('#1a1420');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const um = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const rn = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
const io = (u) => u * u * (3 - 2 * u), sale = (u) => 1 - (1 - u) * (1 - u);
// una capa fija en su búfer (0 = transparente) y cómo ponerla encima (con desplazamiento)
const capa = (fn) => { const b = R.nuevo(), prev = R.usar(b); fn(); R.usar(prev); return b; };
const poner = (b, dy = 0, dx = 0) => { const B = R.buf;
  if (!dy && !dx) { for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } return; }
  for (let y = 0; y < 180; y++) { const ys = y - dy; if (ys < 0 || ys > 179) continue; for (let x = 0; x < 320; x++) { const xs = x - dx; if (xs < 0 || xs > 319) continue; const c = b[ys * 320 + xs]; if (c) B[y * 320 + x] = c; } } };
// degradado tramado (Bayer) entre bandas de color, de y0 a y1
const degradado = (cols, y0, y1, x0 = 0, x1 = 319) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, k = Math.min(n - 1, Math.floor(f)), r = f - k; for (let x = x0; x <= x1; x++) R.pset(x, y, r > um(x, y) ? cols[k + 1] : cols[k]); } };
// nube de tres tonos y nubes a varias velocidades ([x0, y, ancho, px/s])
const nube3 = (cx, cy, w, [s, c, l]) => { const bs = [[0, 0, .32], [-.32, .06, .24], [.3, .05, .26], [-.1, -.12, .26], [.14, -.08, .22]];
  for (const [dx, dy, r] of bs) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), s);
  for (const [dx, dy, r] of bs) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), c);
  for (const [dx, dy, r] of bs) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * .68), l);
  R.rect(Math.round(cx - w * .5), Math.round(cy + w * .17), Math.round(cx + w * .5), Math.round(cy + w * .26), s); };
const nubes = (t, lista, tonos) => { for (const [x0, y, w, v] of lista) nube3(((x0 + t * v) % 420 + 420) % 420 - 50, y, w, tonos); };
// gaviotas que cruzan en arco
const gaviotas = (t, n, y0, y1, v = 14, x0 = -10, x1 = 330) => { for (let k = 0; k < n; k++) { const u = ((t * v / 340) + rn(k, 7)) % 1, x = Math.round(x0 + (x1 - x0) * (k % 2 ? u : 1 - u)), y = Math.round(y0 + (y1 - y0) * rn(k, 8) + Math.sin(t * 1.4 + k) * 4); if (!(x > 274 && y < 48)) R.gaviota(x, y, t, k); } };
// olas: trazos claros y su sombra que corren (más largos y rápidos abajo)
const olas = (t, y0, y1, cl, cs, v = 6, dens = 0.07) => { for (let y = y0; y <= y1; y += 2) { const e = (y - y0) / Math.max(1, y1 - y0), L = 2 + Math.round(e * 6), off = t * v * (0.4 + e), n = Math.round(320 * dens * (0.5 + e)); for (let k = 0; k < n; k++) { const x = Math.round(((rn(k, y) * 360 - off) % 360 + 360) % 360) - 20; R.linea(x, y, x + L, y, cl); R.linea(x + 1, y + 1, x + L + 1, y + 1, cs); } } };
// nieve que cae despacio (fuera de la esquina de Atom)
const nieve = (t, n = 60, y1 = 179, c = hex('#f4f6fa')) => { for (let k = 0; k < n; k++) { const v = 9 + rn(k, 1) * 12, x = Math.round(((rn(k, 2) * 360 + Math.sin(t * 1.3 + k) * 6 + t * 5) % 340) - 10), y = Math.round((rn(k, 3) * 200 + t * v) % 200) - 10; if (y <= y1 && !(x > 274 && y < 48)) { R.pset(x, y, c); if (k % 3 === 0) R.pset(x + 1, y, c); } } };
// una persona pequeña de la multitud (13 px): o.brazo saluda, o.salta, o.anda
const mini = (x, yb, ropa, piel, gorro, t = 0, k = 0, o = {}) => { x = Math.round(x);
  const y = Math.round(yb - (o.salta ? Math.max(0, Math.round(Math.sin(t * 9 + k) * 2)) : 0) - (o.anda ? Math.floor(t * 6 + k) % 2 : 0)), osc = o.pierna ?? hex('#2a2430');
  R.rect(x - 2, y - 3, x - 1, y, osc); R.rect(x + 1, y - 3, x + 2, y, osc);
  R.rect(x - 2, y - 8, x + 2, y - 4, ropa); R.rect(x + 2, y - 8, x + 2, y - 4, o.ropaS ?? K); R.rect(x - 1, y - 11, x + 1, y - 9, piel); R.pset(x + 1, y - 10, K);
  if (gorro) { R.rect(x - 2, y - 12, x + 2, y - 12, gorro); R.rect(x - 1, y - 13, x + 1, y - 13, gorro); } else R.rect(x - 1, y - 12, x + 1, y - 12, o.pelo ?? hex('#5a3418'));
  if (o.brazo) { const a = Math.sin(t * 10 + k) > 0; R.rect(x + 3, y - (a ? 12 : 11), x + 3, y - 7, ropa); R.pset(x + 3, y - (a ? 13 : 12), piel); if (o.panuelo) { R.rect(x + 4, y - (a ? 14 : 13), x + 6, y - (a ? 12 : 11), hex('#f4f2ea')); } } };
const ROPAS = ['#3a4a6a', '#6a3a2a', '#4a5a3a', '#5a3a5a', '#7a6a4a', '#2a2a3a', '#8a4a3a', '#3a5a6a'].map(hex), PIELES = ['#f2c8a0', '#e0a878', '#c88a5a', '#f6d2b0'].map(hex), GORROS = [hex('#2a2430'), hex('#5a4a3a'), null, hex('#3a3a4a'), null, hex('#6a2a2a')];
// una bandera de barras sin escudo (w×h): v true = barras verticales
const BANDERAS = { irlanda: [['#3a9a4a', '#f4f2ea', '#e8883a'], true], alemania: [['#1c1c1c', '#c8303a', '#e8c030'], false], italia: [['#3a9a4a', '#f4f2ea', '#c8303a'], true], suecia: [['#2a5aa8', '#e8c030', '#2a5aa8'], false], grecia: [['#3a6ac8', '#f4f2ea', '#3a6ac8', '#f4f2ea', '#3a6ac8'], false], china: [['#e8c030', '#e8c030', '#e8c030'], false], polonia: [['#f4f2ea', '#c8303a'], false], rusia: [['#f4f2ea', '#2a4aa8', '#c8303a'], false] };
const bandera = (x, y, w, h, nom, t = 0, ondea = false) => { const [cols, v] = BANDERAS[nom], n = cols.length;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const dy = ondea ? Math.round(Math.sin(t * 6 - i * 0.7) * (i / w) * 1.2) : 0, k = v ? Math.floor(i * n / w) : Math.floor(j * n / h); R.pset(x + i, y + j + dy, hex(cols[k])); }
  R.linea(x - 1, y - 1, x - 1, y + h + (ondea ? 6 : 0), K); };
const baul = (x, y, w, h, c, nom) => { R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, c); R.rect(x + 1, y + 1, x + w - 1, y + 2, hex('#a8743c')); R.rect(x + 1, y + h - 2, x + w - 1, y + h - 1, hex('#3a2418')); for (const xx of [x + 1, x + w - 2]) R.rect(xx, y + 1, xx, y + h - 1, hex('#c8a040')); R.rect(x + (w >> 1) - 1, y + 3, x + (w >> 1), y + 4, hex('#e8c860')); if (nom) bandera(x + 3, y + 4, 7, 5, nom); };
// personajes niños (los hermanos Moore y otros): el cuerpo más corto
const CUN = EL.hermanoMoore.cuerpo;
const NINO1 = { ...EL.hermanoMoore, cuerpo: [0, 1, 2, 5, 6, 7, 8, 9, 12].map((i) => CUN[i]), altoCuerpo: 9 };
const NINO2 = { ...NINO1, tocado: undefined, pal: { ...EL.hermanoMoore.pal, C: hex('#5a4a8a'), c: hex('#3a2e64') } };
const NINA = { ...NINO1, cab: EL.annie.cab, tocado: undefined, pal: { ...EL.annie.pal, C: hex('#a83a3a'), c: hex('#7a2a2a') } };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-llegan'] = ('Los que llegan', '''// NY-LLEGAN (frase 36), 1847–1880. Tres planos:
// 1. alta mar: un velero de vapor de emigrantes navega a toda vela, con la cubierta llena de familias asomadas a la borda y los
//    baúles con banderitas apilados en la proa; en «Ships arrive» la chimenea pita y un niño salta y señala delante (corta en «with»);
// 2. 1855, el muelle de Castle Garden: por la pasarela bajan una familia irlandesa (en «Irish») y, en «Germans», otra alemana;
//    un estibador cruza con un baúl y lo deja en la pila; un carro de caballos pasa por delante al final (corta en «Then»);
// 3. el mapa del mundo: de Irlanda y Alemania ya salen sus rutas; en «Italians», «Eastern European Jews» y «Chinese» se clavan
//    las chinchetas y crecen sus rutas hasta Nueva York con barquitos; en «many more» brotan muchas más.''', H + r'''
const A = (f) => en('barcos', f);
const P2 = A(0.284), P3 = A(0.653);   // «with Irish», «Then»
const ships = A(0.196), arrive = A(0.222), irish = A(0.307), germans = A(0.48), italians = A(0.666), judios = A(0.758), chinos = A(0.895), muchos = A(0.947);

// ── 1 · el velero de vapor en alta mar ──
let CIELO1 = null, BARCO1 = null, BORDA1 = null;
const VELAS = [[72, 26], [150, 24], [236, 30]];
const p1 = (t) => {
  if (!CIELO1) {
    CIELO1 = capa(() => { degradado(['#3e5e90', '#4c6c9c', '#5e7eaa', '#7292b8', '#8aa6c4', '#a8bccc', '#c8d2d6'].map(hex), 0, 100); R.rect(0, 100, 319, 101, hex('#9eb2bc')); degradado(['#4a7494', '#3a6080', '#2e4e6c', '#243e5a', '#1c3250'].map(hex), 102, 179); });
    BARCO1 = capa(() => {
      // palos, vergas y velas (cuadras de lona con costuras, panza y sombra)
      for (const [mx, top] of VELAS) {
        R.rect(mx - 1, top, mx + 1, 116, hex('#5a3a22')); R.rect(mx - 1, top, mx - 1, 116, hex('#7a5232')); R.rect(mx - 2, top - 2, mx + 2, top, hex('#3a2416'));
        const vs = [[top + 6, top + 22, 15], [top + 26, top + 48, 21], [top + 52, top + 78, 26]];
        for (const [y0, y1, w] of vs) {
          R.linea(mx - w - 3, y0 - 1, mx + w + 3, y0 - 1, hex('#3a2416')); R.linea(mx - w - 3, y0 - 2, mx + w + 3, y0 - 2, hex('#6a4a2a'));
          for (let y = y0; y <= y1; y++) { const e = (y - y0) / (y1 - y0), ww = Math.round(w + e * 2), panza = Math.round(Math.sin(e * Math.PI) * 2);
            for (let x = mx - ww; x <= mx + ww; x++) { const r = (x - mx + ww) / (2 * ww); let c = r < 0.18 ? hex('#c8bc9e') : r > 0.86 ? hex('#d6ccb0') : hex('#ece2c8'); if ((x - mx) % 7 === 0) c = hex('#d2c6a8'); if (e > 0.85) c = hex('#c0b496'); if (r > 0.3 && r < 0.5 && e < 0.4) c = hex('#f8f2e2'); R.pset(x + panza * 0, y, c); }
            R.pset(mx - ww - 1, y, hex('#8a7e64')); R.pset(mx + ww + 1, y, hex('#8a7e64')); }
          R.linea(mx - w - 1, y1 + 1, mx + w + 1, y1 + 1, hex('#8a7e64'));
        }
        // obenques hasta la borda
        for (const d of [-1, 1]) for (let k = 0; k < 3; k++) R.linea(mx, top + 6, mx + d * (10 + k * 5), 110, hex('#4a3a2a'));
      }
      R.linea(236, 32, 312, 104, hex('#4a3a2a')); R.linea(150, 26, 236, 32, hex('#4a3a2a')); R.linea(72, 28, 150, 26, hex('#4a3a2a')); R.linea(72, 28, 10, 92, hex('#4a3a2a'));
      // la chimenea de la máquina, entre el palo mayor y el de mesana
      R.rect(187, 54, 203, 112, K); R.rect(188, 55, 202, 112, hex('#2a2a30')); R.rect(189, 55, 191, 112, hex('#4a4a54')); R.rect(188, 62, 202, 68, hex('#b8302a')); R.rect(189, 62, 191, 68, hex('#d8504a')); R.rect(186, 53, 204, 55, hex('#3a3a44'));
      R.rect(206, 60, 208, 70, hex('#c8a040')); R.rect(205, 59, 209, 60, hex('#e8c860'));   // el pito de vapor
      // la pila de baúles en la proa, con sus banderitas, y el gallinero
      const bs = [[246, 106, 16, 10, '#6a3a2a', 'irlanda'], [264, 107, 14, 9, '#3a4a6a', 'alemania'], [250, 96, 14, 9, '#4a5a3a', 'italia'], [266, 98, 12, 8, '#7a5a3a', 'suecia'], [280, 108, 12, 8, '#5a3a4a', 'irlanda']];
      for (const [x, y, w, h, c, n] of bs) baul(x, y, w, h, hex(c), n);
      R.rect(22, 102, 44, 114, K); R.rect(23, 103, 43, 113, hex('#a8743c')); for (let x = 25; x < 43; x += 3) R.rect(x, 104, x, 112, hex('#5a3a22'));
      // el casco: borda de madera, franja de portas pintadas, cobre en la flotación y la proa con su bauprés
      R.poligono([[12, 114], [292, 110], [310, 113], [300, 132], [286, 150], [22, 150], [14, 134]], K);
      R.poligono([[14, 116], [290, 112], [306, 114], [297, 132], [284, 148], [24, 148], [16, 134]], hex('#22242c'));
      for (let x = 16; x < 300; x++) { const yt = Math.round(116 - (x - 14) * 4 / 276); R.rect(x, yt + 9, x, yt + 13, hex('#e8dcb8')); if (x % 14 > 9) R.rect(x, yt + 10, x, yt + 12, hex('#22242c')); R.pset(x, yt + 14, hex('#3a3c46')); R.pset(x, yt + 1, hex('#3a3c46')); }
      for (let x = 24; x < 286; x++) { R.rect(x, 145, x, 148, (x + 1) % 6 ? hex('#a8642c') : hex('#7a4a22')); R.pset(x, 145, hex('#c8844a')); }
      for (let x = 30; x < 280; x += 20) R.linea(x, 132, x + 8, 132, hex('#30323a'));
      R.linea(300, 112, 319, 100, hex('#5a3a22')); R.linea(300, 113, 319, 101, hex('#3a2416')); R.linea(296, 120, 319, 104, hex('#4a3a2a'));
      R.rect(302, 112, 306, 116, hex('#e8dcb8'));   // el mascarón
      R.rect(10, 92, 11, 112, hex('#5a3a22'));   // el asta de popa
    });
    BORDA1 = capa(() => {
      // la regala con sus balaustres por delante de la gente, y la borda maciza
      for (let x = 14; x < 300; x++) { const yt = Math.round(116 - (x - 14) * 4 / 276); R.rect(x, yt - 12, x, yt - 11, x % 2 ? hex('#8a5a32') : hex('#a8743c')); R.pset(x, yt - 10, hex('#5a3a22')); if (x % 6 === 0) R.rect(x, yt - 9, x, yt - 1, hex('#7a4e2c')); R.rect(x, yt, x, yt + 2, hex('#6a4426')); }
    });
  }
  R.copiar(CIELO1);
  nubes(t, [[10, 28, 44, -2.5], [190, 20, 36, -2.5], [100, 56, 26, -6], [300, 64, 22, -6], [230, 82, 16, -11], [40, 84, 14, -11]], [hex('#8c9cb2'), hex('#c6d0dc'), hex('#f0f2f4')]);
  // un velero lejano en el horizonte y las gaviotas que siguen al barco
  { const x = Math.round(150 - t * 3); R.rect(x, 97, x + 10, 99, hex('#3a4a5a')); R.poligono([[x + 4, 86], [x + 4, 97], [x + 10, 97]], hex('#d8dce0')); R.linea(x + 4, 86, x + 4, 98, hex('#3a4a5a')); }
  olas(t + 3, 104, 179, hex('#6a94b0'), hex('#1c3250'), 9, 0.06);
  const dy = Math.round(Math.sin(t * 1.5) * 1.2);
  poner(BARCO1, dy);
  // la bandera de popa y el humo de la chimenea, que se va hacia atrás
  { const y = 92 + dy; for (let j = 0; j < 8; j++) for (let i = 0; i < 12; i++) { const yy = y + j + Math.round(Math.sin(t * 7 - i * 0.6) * (i / 12) * 1.5); R.pset(9 - i, yy, j < 4 && i < 5 ? hex('#2a3a7a') : (j % 2 ? hex('#f4f2ea') : hex('#c8303a'))); } }
  for (let k = 0; k < 9; k++) { const a = (t * 0.7 + k / 9) % 1, x = Math.round(195 - a * 80), y = Math.round(52 + dy - a * 12 + Math.sin(t * 2 + k) * 2), r = Math.round(2 + a * 6); R.disco(x, y, r, a > 0.6 ? hex('#8a8e96') : hex('#5a5e66')); R.disco(x - 1, y - 1, Math.max(1, r - 2), a > 0.6 ? hex('#a4a8ae') : hex('#74787e')); }
  const pito = tramo(t, arrive, arrive + 0.9); if (pito > 0 && pito < 1) { const r = Math.round(2 + pito * 7); R.disco(212 + Math.round(pito * 8), 56 + dy - Math.round(pito * 8), r, hex('#f4f6f8')); R.disco(211 + Math.round(pito * 8), 55 + dy - Math.round(pito * 8), Math.max(1, r - 2), hex('#ffffff')); }
  // la gente en cubierta: dos filas (los de atrás un poco más arriba); el marinero recorre la cubierta con el cabo
  const s = 121 + dy, fila = [[EL.colono, 30], [EL.emigranta, 54, { pal: { C: hex('#4a6a3a') } }], [EL.estibador2, 92], [EL.colona, 110], [EL.emigrante2, 178], [EL.dama, 198, { pal: { C: hex('#3a4a6a') } }], [EL.marinero2, 222]];
  fila.forEach(([d, x, o = {}], k) => R.actor(d, x, s - 3, t, { dir: k % 3 === 0 ? -1 : 1, ...o, habla: t < ships && k % 2 === 1 && Math.sin(t * 7 + k) > 0.2, sorpresa: t > arrive + 0.2 && k % 2 === 0, dedo: t > arrive + 0.5 && k === 4 }));
  const um1 = tramo(t, 0.4, 3.4); R.actor(EL.marinero, Math.round(lerp(4, 70, um1)), s, t, { dir: 1, anda: um1 > 0 && um1 < 1, sostiene: um1 >= 1 ? true : undefined });
  if (um1 >= 1) { const x = 70 + 15, y = s - 12; R.anillo(x + 2, y + 1, 3, hex('#c8a46a')); R.anillo(x + 2, y + 1, 2, hex('#8a6a3a')); }
  R.actor(EL.emigranta, 126, s, t, { dir: 1, sonrisa: t > ships + 0.4 });
  R.actor(EL.emigrante, 142, s, t, { dir: 1, dedo: t > arrive + 0.3, sonrisa: t > arrive + 0.6, habla: t > arrive + 0.6 && t < arrive + 1.4 });
  const sal = tramo(t, ships, ships + 0.5) - tramo(t, P2 - 0.6, P2 - 0.1); R.actor(NINO1, 160, s, t, { dir: 1, salto: Math.round(Math.abs(Math.sin(t * 7)) * 3 * sal), dedo: sal > 0.5, sorpresa: sal > 0 });
  poner(BORDA1, dy);
  // la espuma de la proa y de la flotación, y las olas de delante que lamen el casco
  for (let k = 0; k < 14; k++) { const a = (t * 1.6 + k / 14) % 1, x = Math.round(296 - a * 60 - k * 3), y = 148 + dy + Math.round(Math.sin(k * 2.1) * 1.5); R.pset(x, y, hex('#f4f8fa')); R.pset(x + 1, y, hex('#d8e4ec')); }
  for (let k = 0; k < 6; k++) { const y = 138 + k * 2 + dy, x = 294 - k * 2 + Math.round(Math.sin(t * 9 + k) * 1.5); R.rect(x, y, x + 3 + (k >> 1), y, hex('#f4f8fa')); }
  olas(t, 151, 179, hex('#8ab0c8'), hex('#1a2e48'), 14, 0.08);
  gaviotas(t, 4, 30, 80, 10, 330, -10);
};

// ── 2 · el muelle de Castle Garden (1855) ──
let CG = null;
const tabla = [[284, 104], [214, 146]];
const enTabla = (u) => [Math.round(lerp(tabla[0][0], tabla[1][0], u)), Math.round(lerp(tabla[0][1], tabla[1][1], u))];
// la gente que baja: recorre la pasarela y luego la plaza hasta x final; devuelve [x, suelo, anda]
const baja = (t, t0, xFin, sFin, v = 32) => { const L1 = Math.hypot(70, 42), d = (t - t0) * v; if (d <= 0) return null;
  if (d < L1) { const [x, y] = enTabla(d / L1); return [x - 7, y, true]; }
  const d2 = d - L1, L2 = Math.hypot(214 - xFin, sFin - 146); if (d2 < L2) { const u = d2 / L2; return [Math.round(lerp(214, xFin, u)) - 7, Math.round(lerp(146, sFin, u)), true]; } return [xFin - 7, sFin, false]; };
const p2 = (t) => {
  if (!CG) CG = capa(() => {
    degradado(['#4a7ec0', '#5a8cc8', '#6e9cd0', '#88b0da', '#a6c4e2', '#c8d8e4', '#e2e4dc'].map(hex), 0, 88);
    // la orilla lejana de Brooklyn y Governors Island, y la bahía
    R.poligono([[150, 88], [170, 82], [200, 84], [236, 80], [262, 83], [300, 81], [319, 84], [319, 89], [150, 89]], hex('#7a9488')); for (let x = 152; x < 319; x += 5) R.rect(x, 85 - (x % 3), x + 1, 88, hex('#5e7a70'));
    degradado(['#6a98b4', '#5a88a6', '#4a7896', '#3e6a88'].map(hex), 89, 128, 140, 319);
    for (let k = 0; k < 40; k++) { const x = 140 + Math.round(rn(k, 3) * 180), y = 92 + Math.round(rn(k, 4) * 32); R.linea(x, y, x + 3, y, hex('#8ab4cc')); }
    // los árboles del Battery a la izquierda
    for (const [x, y, r] of [[8, 60, 18], [26, 50, 14], [4, 88, 14], [30, 78, 12]]) { R.disco(x, y + 2, r, hex('#2e5a2a')); R.disco(x, y, r, hex('#3e7a36')); R.disco(x - 3, y - 4, Math.round(r * 0.6), hex('#5a9a46')); for (let k = 0; k < 10; k++) R.pset(x + Math.round((rn(k, x) - 0.5) * r * 1.6), y + Math.round((rn(k, y) - 0.5) * r * 1.4), hex('#7ab85a')); }
    R.rect(12, 92, 14, 128, hex('#4a3420')); R.rect(28, 90, 29, 126, hex('#4a3420'));
    // Castle Garden: el fuerte redondo de piedra rojiza con su tejado y la cúpula
    const cx = 120, rx = 96;
    for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.abs(x - cx) / rx, curva = Math.round(Math.sqrt(1 - e * e) * 8), jw = Math.max(3, Math.round(12 * Math.sqrt(1 - e * e)));
      for (let y = 58 + curva - 8; y <= 124 + curva; y++) { const yy = y - curva; let c = e > 0.86 ? hex('#7a4630') : e > 0.68 ? hex('#a8683e') : hex('#c4845a'); if (e > 0.6 && e < 0.86 && um(x, y) < (e - 0.6) * 3) c = e > 0.76 ? hex('#8a5236') : hex('#a8683e'); if (x < cx - 40 && x > cx - 66 && um(x, y) > 0.7) c = hex('#d8a074');
        const fila = Math.floor((yy - 50) / 5); if ((yy - 50) % 5 === 0 || ((x + (fila % 2) * Math.round(jw / 2)) % jw === 0)) c = hex('#7a4630'); R.pset(x, y, c); } }
    R.poligono([[cx - rx + 2, 50], [cx - 40, 36], [cx + 40, 36], [cx + rx - 2, 50], [cx + 60, 56], [cx, 58], [cx - 60, 56]], hex('#5e6874'));
    for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.abs(x - cx) / rx, cv = Math.round(Math.sqrt(1 - e * e) * 8); R.rect(x, 46 + cv, x, 49 + cv, e > 0.8 ? hex('#c4a47a') : hex('#e0c49a')); R.pset(x, 46 + cv, hex('#f2dcb8')); R.pset(x, 50 + cv, hex('#8a6a4a')); } for (let x = cx - rx + 8; x < cx + rx - 6; x += 6) R.linea(x, 45 + Math.round(Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)) * 8), Math.round(cx + (x - cx) * 0.42), 37, hex('#4a525e')); R.linea(cx - 40, 36, cx + 40, 36, hex('#7a8492'));
    R.rect(cx - 12, 22, cx + 12, 36, K); R.rect(cx - 11, 23, cx + 11, 36, hex('#ece4d0')); for (let x = cx - 9; x < cx + 10; x += 5) R.rect(x, 26, x + 2, 33, hex('#3a4a5a')); R.poligono([[cx - 14, 23], [cx, 15], [cx + 14, 23]], hex('#5e6874'));
    // las troneras convertidas en ventanas, la puerta grande en arco y su farol
    for (let x = cx - 84; x <= cx + 84; x += 18) { if (Math.abs(x - cx) < 20) continue; const w = Math.abs(x - cx) > 70 ? 3 : 5; R.rect(x - w, 72, x + w, 84, hex('#e0c49a')); R.rect(x - w + 1, 74, x + w - 1, 84, hex('#2a2430')); R.rect(x - w + 1, 74, x + w - 1, 75, hex('#4a5a6a')); R.rect(x - w + 1, 99, x + w - 1, 108, hex('#2a2430')); R.rect(x - w, 98, x + w, 98, hex('#e0c49a')); }
    R.rect(cx - 17, 92, cx + 17, 126, hex('#e0c49a')); R.disco(cx, 100, 14, hex('#e0c49a')); R.disco(cx, 101, 12, hex('#2a2028')); R.rect(cx - 12, 101, cx + 12, 126, hex('#2a2028')); R.rect(cx - 12, 108, cx - 9, 126, hex('#6a4426')); R.rect(cx + 9, 108, cx + 12, 126, hex('#6a4426'));
    R.disco(cx, 108, 3, hex('#f8d870')); R.rect(cx - 6, 116, cx + 6, 126, hex('#3a2a2a'));
    // el agua junto al fuerte y el muelle de piedra
    R.rect(200, 118, 319, 126, hex('#3e6a88')); R.rect(206, 124, 319, 130, hex('#8a7a66')); R.rect(206, 124, 319, 124, hex('#b8a88e')); for (let x = 206; x < 319; x += 9) R.rect(x, 125, x, 130, hex('#5a4e40'));
    // el casco del barco atracado, su palo con la vela aferrada y la porta de la pasarela
    R.poligono([[240, 70], [319, 66], [319, 122], [250, 122], [236, 92]], K); R.poligono([[242, 72], [319, 68], [319, 120], [252, 120], [239, 92]], hex('#22242c'));
    for (let x = 240; x < 319; x++) { const yt = Math.round(72 - (x - 240) * 4 / 79); R.rect(x, yt + 12, x, yt + 15, hex('#e8dcb8')); if (x % 12 > 7) R.rect(x, yt + 13, x, yt + 14, hex('#22242c')); R.rect(x, yt - 2, x, yt, hex('#8a5a32')); }
    R.rect(278, 90, 292, 104, hex('#3a2a20')); R.rect(279, 91, 291, 104, hex('#5a3a22'));
    R.rect(262, 20, 264, 70, hex('#5a3a22')); R.rect(262, 20, 262, 70, hex('#7a5232')); for (const [y, w] of [[30, 20], [46, 26], [60, 30]]) { R.rect(263 - w, y, 263 + w, y + 2, hex('#3a2416')); R.rect(263 - w + 2, y + 2, 263 + w - 2, y + 4, hex('#d8ccb0')); R.rect(263 - w + 2, y + 4, 263 + w - 2, y + 4, hex('#a89c80')); }
    for (const d of [-1, 1]) for (let k = 0; k < 3; k++) R.linea(263, 24, 263 + d * (12 + k * 6), 68, hex('#4a3a2a'));
    // la plaza empedrada, con charcos, paja, barriles, cajas y un carretón de baúles
    for (let y = 126; y < 180; y++) { const fila = Math.floor((y - 126) / 4); for (let x = 0; x < 320; x++) { const w = 6 + fila, jo = (x + (fila % 2) * 4) % w; let c = (y - 126) % 4 === 0 || jo === 0 ? hex('#6e6252') : rn(Math.floor(x / w), fila) > 0.6 ? hex('#a69680') : hex('#968672'); if (jo === 1 && (y - 126) % 4 === 1) c = hex('#bcac94'); R.pset(x, y, c); } }
    for (const [x, y, w] of [[40, 150, 22], [160, 168, 30], [250, 156, 18]]) for (let j = 0; j < 4; j++) R.linea(x - w / 2 + j * 2, y + j, x + w / 2 - j * 2, y + j, j === 0 ? hex('#a8c4d8') : hex('#7a9ab0'));
    for (let k = 0; k < 30; k++) { const x = Math.round(rn(k, 11) * 320), y = 130 + Math.round(rn(k, 12) * 48); R.linea(x, y, x + 2, y - 1, hex('#d8c070')); }
    for (const [x, y] of [[188, 124], [200, 126], [194, 114]]) { R.rect(x - 5, y - 10, x + 5, y, K); R.rect(x - 4, y - 9, x + 4, y - 1, hex('#8a5a32')); R.rect(x - 4, y - 7, x + 4, y - 7, hex('#4a4a52')); R.rect(x - 4, y - 3, x + 4, y - 3, hex('#4a4a52')); R.rect(x - 2, y - 9, x - 1, y - 1, hex('#a8743c')); }
    baul(210, 132, 16, 10, hex('#5a3a2a'), 'alemania'); baul(228, 134, 14, 9, hex('#3a4a5a'), 'irlanda'); baul(214, 124, 13, 8, hex('#6a5a3a'), null);
    R.rect(36, 146, 74, 152, K); R.rect(37, 147, 73, 151, hex('#8a5a32')); R.disco(42, 156, 5, K); R.disco(42, 156, 4, hex('#6a4426')); R.disco(42, 156, 1, K); R.disco(68, 156, 5, K); R.disco(68, 156, 4, hex('#6a4426')); R.disco(68, 156, 1, K); R.linea(74, 148, 88, 142, hex('#5a3a22'));
    baul(40, 136, 14, 10, hex('#4a5a3a'), 'italia'); baul(56, 138, 14, 8, hex('#6a3a2a'), 'irlanda');
    // la farola de gas
    R.rect(84, 96, 85, 140, hex('#2a2a30')); R.rect(81, 90, 88, 96, hex('#2a2a30')); R.rect(82, 91, 87, 95, hex('#f8e4a0'));
  });
  R.copiar(CG);
  nubes(t, [[30, 22, 34, 2.5], [210, 30, 28, 2.5], [130, 52, 18, 6], [270, 62, 14, 9]], [hex('#a8bcd4'), hex('#dce6ee'), hex('#ffffff')]);
  // el humo de un vapor que cruza la bahía, al fondo
  { const x = Math.round(lerp(232, 214, tramo(t, P2, P3))); R.poligono([[x, 116], [x + 6, 104], [x + 6, 116]], hex('#f2eee0')); R.rect(x - 1, 116, x + 8, 117, hex('#5a3a22')); R.linea(x + 6, 102, x + 6, 117, K); }
  // las banderas del fuerte y del barco
  for (const [x, y] of [[120, 8 + 8], [263, 12]]) { R.linea(x, y, x, y + 8, K); for (let j = 0; j < 6; j++) for (let i = 0; i < 10; i++) R.pset(x + 1 + i, y + j + Math.round(Math.sin(t * 6 - i * 0.6) * (i / 10) * 1.2), j < 3 && i < 4 ? hex('#2a3a7a') : (j % 2 ? hex('#f4f2ea') : hex('#c8303a'))); }
  gaviotas(t, 3, 40, 70, 12);
  // la gente pequeña que entra y sale por la puerta del fuerte
  for (let k = 0; k < 5; k++) { const u = ((t * 0.08 + k / 5) % 1), x = Math.round(80 + u * 80), sale = k % 2; mini(sale ? 160 - (x - 80) : x, 128 - (k % 2), ROPAS[k], PIELES[k % 4], GORROS[k % 6], t, k, { anda: true }); }
  // el oficinista de la puerta que les da la bienvenida
  R.actor(EL.comerciante, 92, 138, t, { dir: 1, dedo: t > irish + 0.8 && t < germans, sonrisa: t > irish + 0.6, habla: t > germans + 0.3 && Math.sin(t * 8) > 0 });
  // la pasarela (tablón con listones) y los que bajan: la familia irlandesa y luego la alemana
  R.poligono([[280, 101], [287, 104], [217, 148], [210, 145]], K); R.poligono([[281, 102], [285, 104], [216, 146], [212, 145]], hex('#9a6a3a'));
  for (let u = 0.05; u < 1; u += 0.1) { const [x, y] = enTabla(u); R.linea(x - 3, y - 1, x + 2, y + 2, hex('#6a4426')); }
  const gente = [[EL.emigranta, P2 - 1.4, 150, 162, { pal: { C: hex('#4a6a3a') } }], [NINA, P2 - 0.9, 168, 166], [EL.emigrante, P2 - 0.2, 186, 160, { sostiene: true }], [EL.emigrante2, germans - 0.5, 222, 158, { sostiene: true }], [EL.dama, germans + 0.1, 238, 164, { pal: { C: hex('#2a3a5a') } }]];
  gente.forEach(([d, t0, xf, sf, o = {}], k) => { const p = baja(t, t0, xf, sf); if (!p) return; const [x, y, anda] = p, llega = !anda;
    const m = R.actor(d, x, y, t, { dir: llega && k < 3 ? (Math.sin(t * 0.8 + k) > 0 ? -1 : 1) : -1, anda, sonrisa: llega, ...o, sorpresa: llega && k === 1 && t < germans + 1.5 });
    if (o.sostiene) { const [mx, my] = m.mano; R.rect(mx - 4, my - 3, mx + 4, my + 3, K); R.rect(mx - 3, my - 2, mx + 3, my + 2, k === 2 ? hex('#c8b48a') : hex('#6a4a7a')); R.linea(mx - 3, my, mx + 3, my, hex('#8a6a4a')); } });
  // el pasamanos de cuerda de la pasarela, por delante de la gente
  for (let u = 0; u < 1; u += 0.01) { const [x, y] = enTabla(u); R.pset(x + 2, y - 12 - Math.round(Math.sin(u * Math.PI) * -2), hex('#c8a46a')); }
  for (const u of [0, 0.33, 0.66, 1]) { const [x, y] = enTabla(u); R.linea(x + 2, y - 12, x + 2, y, hex('#5a3a22')); }
  // el estibador cruza la plaza con un baúl y lo deja en la pila
  const ue = tramo(t, irish + 0.2, A(0.6)), xe = Math.round(lerp(330, 246, ue)), deja = t > A(0.6);
  const me = R.actor(EL.estibador, xe, 176, t, { dir: -1, anda: ue > 0 && ue < 1, sostiene: deja ? undefined : true, sonrisa: deja });
  if (!deja) { const [mx, my] = me.mano; baul(mx - 12, my - 9, 15, 10, hex('#6a3a2a'), 'alemania'); } else baul(232, 166, 15, 10, hex('#6a3a2a'), 'alemania');
  R.actor(EL.estibador2, 290, 170, t, { dir: -1, dedo: t > A(0.55), habla: t > A(0.55) && Math.sin(t * 8) > 0 });
  // un mozo empuja por delante un carretón de mano cargado de baúles y fardos
  const uc = tramo(t, A(0.5), P3 + 0.5); if (uc > 0 && uc < 1) { const x = Math.round(lerp(-70, 330, uc));
    R.actor(EL.marinero2, x - 18, 182, t, { dir: 1, anda: true, sostiene: [x - 2, 166] });
    R.linea(x - 4, 166, x + 6, 170, K); R.rect(x + 4, 162, x + 44, 172, K); R.rect(x + 5, 163, x + 43, 171, hex('#8a5a32')); R.rect(x + 5, 163, x + 43, 164, hex('#a8743c'));
    baul(x + 6, 151, 16, 11, hex('#3a4a5a'), 'italia'); baul(x + 24, 153, 14, 9, hex('#6a3a2a'), 'irlanda'); R.disco(x + 34, 148, 6, K); R.disco(x + 34, 148, 5, hex('#c8b48a')); R.linea(x + 30, 146, x + 38, 150, hex('#8a6a4a'));
    R.disco(x + 24, 175, 6, K); R.disco(x + 24, 175, 5, hex('#6a4426')); for (let a2 = 0; a2 < 4; a2++) { const g = a2 * 0.785 + x * 0.15; R.linea(x + 24, 175, x + 24 + Math.round(Math.cos(g) * 4), 175 + Math.round(Math.sin(g) * 4), K); } }
};

// ── 3 · el mapa del mundo: las rutas de los que llegan ──
const RUTAS = [
  ['irlanda', -1, '#3a9a4a', [[-8.5, 51.9], [-25, 50.5], [-50, 45], [-68, 41.5], [-74, 40.7]]],
  ['alemania', -1, '#c89a20', [[9.9, 53.6], [3, 53.6], [-3, 50], [-20, 48], [-50, 44], [-74, 40.7]]],
  ['italia', italians, '#c8303a', [[14.3, 40.8], [8, 38.6], [-5.6, 36], [-25, 37], [-55, 39], [-74, 40.7]]],
  ['rusia', judios, '#7a4ab8', [[30.5, 50.4], [24, 52.5], [17, 53.5], [9.9, 53.6], [3, 54.4], [-3, 51], [-25, 48], [-55, 43], [-74, 40.7]]],
  ['china', chinos, '#e8862a', [[113.3, 23.1], [109, 10], [104, 1.3], [80, -6], [55, -24], [20, -36], [-5, -15], [-32, 8], [-60, 32], [-74, 40.7]]],
];
const MAS = [['suecia', '#3a6ac8', [[10.7, 59.9], [-2, 59], [-35, 52], [-74, 40.7]]], ['grecia', '#2a8aa8', [[23.7, 37.9], [5, 37.5], [-5.6, 36], [-40, 38], [-74, 40.7]]], ['polonia', '#a85a8a', [[21, 52.2], [14.5, 53.4], [5, 55], [-20, 50], [-74, 40.7]]], [null, '#6a8a3a', [[-66, 18], [-70, 28], [-74, 40.7]]], [null, '#8a6a3a', [[-96, 19.2], [-88, 25], [-81, 25], [-78, 33], [-74, 40.7]]]];
const enRuta = (pts, f) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let q = tot * f; for (let i = 1; i < pts.length; i++) { if (q <= L[i - 1]) { const u = q / L[i - 1]; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u]; } q -= L[i - 1]; } return pts[pts.length - 1]; };
const barquito = (x, y, t, k) => { x = Math.round(x); y = Math.round(y + Math.sin(t * 4 + k) * 0.6); R.rect(x - 3, y, x + 3, y + 1, K); R.rect(x - 2, y, x + 2, y, hex('#6a4426')); R.poligono([[x, y - 5], [x, y - 1], [x + 3, y - 1]], hex('#f6f0e0')); R.linea(x, y - 5, x, y, K); };
const p3 = (t) => {
  const P = T.mapaNY(R, t, { vista: 'mundo' }), Q = (pts) => pts.map((p) => P(p).map(Math.round));
  R.recorte([9, 11, 311, 169]);
  RUTAS.forEach(([nom, w, col, pts], k) => { const sp = Q(pts), p = w < 0 ? 1 : tramo(t, w - 0.05, w + (nom === 'china' ? 0.95 : 0.9));
    if (p > 0) R.ruta(sp, p, hex(col), { grueso: true });
    const [ox, oy] = sp[0], baj = w < 0 ? 1 : tramo(t, w - 0.35, w);
    if (baj >= 1) bandera(ox + 3, oy - 13, 8, 5, nom, t, true);
    T.chincheta(R, ox, oy, t, hex(col), { baja: baj });
    if (p >= 1) for (let b = 0; b < 2; b++) { const f = ((t - (w < 0 ? 0 : w + 0.9)) * 0.09 + b * 0.5 + k * 0.17) % 1; const [bx, by] = enRuta(sp, f); barquito(bx, by - 1, t, k * 2 + b); }
    else if (p > 0) { const [bx, by] = enRuta(sp, p); barquito(bx, by - 1, t, k); } });
  MAS.forEach(([nom, col, pts], k) => { const w = muchos + k * 0.12, sp = Q(pts), p = tramo(t, w, w + 0.7); if (p <= 0) return; R.ruta(sp, p, hex(col), { grueso: 1 }); const [ox, oy] = sp[0]; R.disco(ox, oy, 2, K); R.disco(ox, oy, 1, hex(col)); if (nom && p >= 1) bandera(ox + 2, oy - 9, 6, 4, nom, t, true); });
  R.recorte(null);
};
const año = (t) => t < P2 ? 1847 : t < P3 ? 1855 : Math.round(lerp(1880, 1890, tramo(t, italians, chinos)));
const efectos = [[0.6, 'ola'], [arrive, 'vapor'], [A(0.6), 'golpecito'], [italians, 'pop'], [judios, 'pop'], [chinos, 'pop'], [muchos + 0.2, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-ellis'] = ('Ellis Island', '''// NY-ELLIS (frases 37–39), 1892 y 1883, cartela «1892». Siete planos:
// 1. el 1 de enero de 1892, nieva: el ferry de ruedas llega a la estación de madera de Ellis Island con Annie Moore y sus dos
//    hermanos en la proa; en «opens» sube la bandera y los de la isla saludan (corta en «And the first person»);
// 2. la sala de registro: Annie, la primera de la fila, llega a la mesa con sus hermanos; en «Annie Moore» el funcionario le
//    sonríe y sella el papel; en «brothers» ella se vuelve hacia ellos (corta al acabar la frase);
// 3. inserto, la mesa del registro: la mano del funcionario le da la moneda de oro de 10 a la mano de Annie; en «twelve million»
//    las hojas del libro pasan y el contador sube hasta 12,000,000 (corta en «see»);
// 4. la cubierta de un vapor que entra en el puerto: la gente corre a la borda y en «Statue of Liberty» la estatua llega a su
//    sitio; todos señalan (corta en «standing»);
// 5. la estatua de cerca contra el cielo de la tarde, la antorcha que brilla y las gaviotas; desde la borda la saludan; en
//    «1886» sale la cifra junto al pedestal (corta en «The Brooklyn Bridge»);
// 6. 1883, el puente de Brooklyn engalanado: en «the first to ride across» entra el carruaje de Emily Roebling con el gallo y
//    llega al centro en «Emily Roebling»; la gente de la pasarela la aclama (corta en la pausa);
// 7. el cuarto de Brooklyn Heights: Washington Roebling, con la manta, mira el puente con el catalejo; Emily entra con los
//    planos, se los enseña y él señala; en «fell ill» tose y ella le sonríe; él vuelve al catalejo.''', H + r'''
const a = (f) => en('annie', f), s = (f) => en('estatua', f), b = (f) => en('puente', f);
const P2 = a(0.4885), P3 = a(1), P4 = s(0.3688), P5 = s(0.7509), P6 = b(0.0726), P7 = b(0.6086);
const abre = a(0.383), primera = a(0.508), chica = a(0.648), moore = a(0.73), sello = a(0.80), hermanos = a(0.93);
const doce = s(0.0128), ver = s(0.3688), estatua = s(0.6306), y1886 = s(0.8146);
const cruza = b(0.2729), emily = b(0.5268), proyecto = b(0.6705), marido = b(0.7593), jefe = b(0.8709), enferma = b(0.9473);

// ── 1 · el ferry llega a la estación de madera de Ellis Island, nevando ──
let ELLIS = null;
const torre = (x, y0, w, alto) => { R.rect(x - w, y0, x + w, 112, K); R.rect(x - w + 1, y0 + 1, x + w - 1, 112, hex('#d4c8a0')); R.rect(x + w - 3, y0 + 1, x + w - 1, 112, hex('#a89c78')); for (let y = y0 + 3; y < 112; y += 2) R.linea(x - w + 1, y, x + w - 1, y, hex('#c4b890'));
  for (let y = y0 + 6; y < 104; y += 14) { R.rect(x - 3, y, x + 2, y + 7, hex('#f2ecd8')); R.rect(x - 2, y + 1, x + 1, y + 6, hex('#2a3446')); R.pset(x - 2, y + 1, hex('#8aa4bc')); }
  R.poligono([[x - w - 2, y0 + 1], [x, y0 - alto], [x + w + 2, y0 + 1]], hex('#4e5a6e')); R.poligono([[x, y0 - alto], [x + w + 2, y0 + 1], [x + 2, y0 + 1]], hex('#3a4456')); R.linea(x - w - 2, y0 + 1, x, y0 - alto, hex('#f2f4f8')); R.linea(x - w - 1, y0 + 1, x, y0 - alto + 1, hex('#dfe4ec')); R.rect(x, y0 - alto - 4, x, y0 - alto, K); };
const ferry = (x0, yw, t, mueve) => {
  const B0 = hex('#e8e4d8'), BS = hex('#c4bca8');
  // la chimenea, el balancín y la caseta del piloto
  R.rect(x0 + 132, yw - 62, x0 + 140, yw - 34, K); R.rect(x0 + 133, yw - 61, x0 + 139, yw - 34, hex('#2a2a30')); R.rect(x0 + 133, yw - 56, x0 + 139, yw - 53, hex('#b8302a')); R.rect(x0 + 131, yw - 64, x0 + 141, yw - 62, hex('#3a3a44'));
  const r = Math.round(Math.sin(t * 4) * 3); R.linea(x0 + 102, yw - 34, x0 + 112, yw - 52, hex('#5a3a22')); R.linea(x0 + 122, yw - 34, x0 + 112, yw - 52, hex('#5a3a22')); R.linea(x0 + 100, yw - 52 + r, x0 + 124, yw - 52 - r, K); R.linea(x0 + 100, yw - 51 + r, x0 + 124, yw - 51 - r, hex('#7a5a3a'));
  R.rect(x0 + 92, yw - 46, x0 + 116, yw - 34, K); R.rect(x0 + 93, yw - 45, x0 + 115, yw - 34, B0); for (let x = x0 + 95; x < x0 + 114; x += 5) R.rect(x, yw - 43, x + 2, yw - 39, hex('#2a3a4e')); R.rect(x0 + 91, yw - 47, x0 + 117, yw - 46, hex('#6a2a2a'));
  // la cabina larga con sus ventanas, la cubierta de arriba y su barandilla
  R.rect(x0 + 44, yw - 34, x0 + 188, yw - 14, K); R.rect(x0 + 45, yw - 33, x0 + 187, yw - 14, B0); R.rect(x0 + 45, yw - 33, x0 + 187, yw - 32, BS);
  for (let x = x0 + 48; x < x0 + 184; x += 8) { R.rect(x, yw - 28, x + 4, yw - 20, hex('#2a3a4e')); R.pset(x, yw - 28, hex('#8aa4bc')); R.rect(x, yw - 18, x + 4, yw - 18, BS); }
  R.rect(x0 + 40, yw - 36, x0 + 192, yw - 34, hex('#6a4426'));
  // el tambor de la rueda, con su abanico
  const cx = x0 + 80, cy = yw - 12; for (let j = -18; j <= 0; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j); if (d <= 18) R.pset(cx + i, cy + j, d > 16.5 ? K : d > 15 ? hex('#6a2a2a') : (Math.round(Math.atan2(j, i) * 5) % 2 ? B0 : hex('#d8c060'))); }
  // el casco y la franja blanca
  R.poligono([[x0, yw - 14], [x0 + 196, yw - 14], [x0 + 190, yw + 2], [x0 + 10, yw + 2]], K); R.poligono([[x0 + 1, yw - 13], [x0 + 195, yw - 13], [x0 + 189, yw + 1], [x0 + 11, yw + 1]], hex('#2a3a34')); R.rect(x0 + 2, yw - 13, x0 + 194, yw - 11, B0);
  // la gente de la cubierta de arriba
  for (let k = 0; k < 9; k++) { const x = x0 + 54 + k * 14 + (k > 2 ? 6 : 0); if (x > x0 + 88 && x < x0 + 120) continue; mini(x, yw - 35, ROPAS[k % 8], PIELES[k % 4], GORROS[k % 6], t, k, { brazo: t > abre && k % 2 === 0 }); }
  R.rect(x0 + 44, yw - 38, x0 + 190, yw - 38, B0); for (let x = x0 + 44; x < x0 + 190; x += 4) R.rect(x, yw - 37, x, yw - 35, B0);
  // la bandera de proa
  R.linea(x0 + 3, yw - 40, x0 + 3, yw - 14, K); for (let j = 0; j < 6; j++) for (let i = 0; i < 9; i++) R.pset(x0 + 4 + i, yw - 40 + j + Math.round(Math.sin(t * 6 - i * 0.6) * (i / 9)), j < 3 && i < 4 ? hex('#2a3a7a') : (j % 2 ? hex('#f4f2ea') : hex('#c8303a')));
  // la espuma de la rueda
  if (mueve) for (let k = 0; k < 16; k++) { const a = (t * 2 + k / 16) % 1, x = Math.round(cx - 10 + a * 70 + k), y = yw + 1 + Math.round(Math.sin(k * 3) * 1.5); R.rect(x, y, x + 2, y, hex('#f4f8fa')); }
};
const p1 = (t) => {
  if (!ELLIS) ELLIS = capa(() => {
    degradado(['#6a7898', '#7a88a6', '#8e9ab4', '#a2acc2', '#b8bece', '#ccccd4', '#dcd4d4'].map(hex), 0, 104);
    // la orilla de Nueva Jersey lejana
    R.poligono([[0, 104], [40, 98], [90, 100], [140, 97], [319, 99], [319, 106], [0, 106]], hex('#8a94a4'));
    // la estación de madera de 1892: tres plantas de tablas, tejado de pizarra con nieve y cuatro torres
    R.rect(30, 56, 262, 112, K); R.rect(31, 57, 261, 112, hex('#d4c8a0')); for (let y = 58; y < 112; y += 2) R.linea(31, y, 261, y, hex('#c4b890'));
    for (const y of [62, 80, 98]) for (let x = 40; x < 256; x += 11) { R.rect(x, y, x + 6, y + 10, hex('#f2ecd8')); R.rect(x + 1, y + 1, x + 5, y + 9, hex('#2a3446')); R.rect(x + 1, y + 5, x + 5, y + 5, hex('#f2ecd8')); R.pset(x + 1, y + 1, hex('#8aa4bc')); if (rn(x, y) > 0.7) R.rect(x + 2, y + 6, x + 4, y + 8, hex('#f0c870')); }
    R.rect(31, 76, 261, 77, hex('#f2ecd8')); R.rect(31, 94, 261, 95, hex('#f2ecd8'));
    R.poligono([[26, 57], [52, 40], [240, 40], [266, 57]], hex('#4e5a6e')); for (let x = 30; x < 264; x += 5) R.linea(x, 56, x + (x < 146 ? 4 : -4), 44, hex('#424c5e')); R.linea(52, 40, 240, 40, hex('#f2f4f8')); R.rect(54, 40, 238, 41, hex('#e4e8f0'));
    for (const x of [80, 120, 172, 212]) { R.rect(x - 5, 44, x + 5, 54, hex('#d4c8a0')); R.poligono([[x - 7, 45], [x, 38], [x + 7, 45]], hex('#4e5a6e')); R.linea(x - 7, 45, x, 38, hex('#f2f4f8')); R.rect(x - 3, 47, x + 2, 53, hex('#2a3446')); }
    torre(40, 46, 10, 18); torre(250, 46, 10, 18); torre(146, 34, 13, 14); torre(100, 50, 7, 12); torre(196, 50, 7, 12);
    // la isla con nieve, el muelle de piedra, farolas y los bultos
    R.rect(0, 108, 319, 124, hex('#e8ecf2')); for (let k = 0; k < 120; k++) R.pset(Math.round(rn(k, 1) * 320), 108 + Math.round(rn(k, 2) * 15), hex('#c4cad8'));
    R.rect(0, 124, 319, 131, hex('#7a7a84')); R.rect(0, 124, 319, 124, hex('#f2f4f8')); for (let x = 0; x < 320; x += 10) R.rect(x, 125, x, 131, hex('#5a5a64')); for (let x = 5; x < 320; x += 20) R.rect(x, 128, x, 128, hex('#5a5a64'));
    for (const x of [16, 286]) { R.rect(x, 96, x + 1, 124, hex('#2a2a30')); R.rect(x - 2, 92, x + 3, 96, hex('#2a2a30')); R.rect(x - 1, 93, x + 2, 95, hex('#f8e4a0')); R.rect(x - 2, 91, x + 3, 91, hex('#f2f4f8')); }
    for (const [x, w] of [[64, 14], [214, 10], [118, 8]]) { R.disco(x, 124, w, hex('#c4cad8')); R.disco(x - 1, 123, w - 1, hex('#f2f4f8')); R.disco(x - 3, 121, Math.max(1, w - 5), hex('#ffffff')); }
    R.rect(82, 116, 86, 124, K); R.rect(83, 117, 85, 124, hex('#3a3a44')); R.rect(82, 115, 86, 116, hex('#f2f4f8'));
    R.rect(240, 112, 262, 120, K); R.rect(241, 113, 261, 119, hex('#8a5a32')); R.disco(244, 122, 3, K); R.disco(258, 122, 3, K); baul(242, 104, 10, 8, hex('#5a3a2a'), 'irlanda'); baul(252, 105, 9, 7, hex('#3a4a5a'), 'italia');
    for (const [x, y] of [[262, 118], [272, 120]]) { R.rect(x, y - 6, x + 8, y, K); R.rect(x + 1, y - 5, x + 7, y - 1, hex('#8a5a32')); R.rect(x + 1, y - 6, x + 7, y - 6, hex('#f2f4f8')); }
    degradado(['#5a7088', '#4a6278', '#3c5468', '#30465a', '#263a4e'].map(hex), 132, 179);
  });
  R.copiar(ELLIS);
  nubes(t, [[40, 18, 36, 1.5], [240, 26, 30, 1.5], [150, 54, 18, 4]], [hex('#9aa2b4'), hex('#c4c8d4'), hex('#e2e4ea')]);
  // la bandera que sube por el asta de la torre grande en «opens»
  { const u = io(tramo(t, abre - 0.6, abre + 0.3)), y = Math.round(lerp(30, 16, u)); R.linea(146, 15, 146, 30, K); for (let j = 0; j < 6; j++) for (let i = 0; i < 10; i++) R.pset(147 + i, y + j + Math.round(Math.sin(t * 6 - i * 0.6) * (i / 10) * 1.2 * u), j < 3 && i < 4 ? hex('#2a3a7a') : (j % 2 ? hex('#f4f2ea') : hex('#c8303a'))); }
  // los de la isla, de abrigo oscuro, que esperan al ferry y saludan cuando abre
  for (let k = 0; k < 9; k++) { const x = 30 + k * 13 + (k > 4 ? 120 : 0); mini(x, 123, k % 3 ? hex('#2a3450') : hex('#5a3a2a'), PIELES[k % 4], k % 2 ? hex('#1c1c24') : hex('#3a3a4a'), t, k, { brazo: t > abre && k % 2 === 0, salta: t > abre && t < abre + 1.2 && k % 3 === 0 }); }
  // témpanos que bajan con la corriente y las olas
  for (let k = 0; k < 7; k++) { const x = Math.round(((rn(k, 5) * 360 - t * (5 + k)) % 360 + 360) % 360) - 20, y = 136 + Math.round(rn(k, 6) * 40), w = 4 + Math.round(rn(k, 9) * 8); R.rect(x, y, x + w, y + 1, hex('#e4ecf2')); R.rect(x + 1, y + 2, x + w - 1, y + 2, hex('#9ab0c4')); }
  olas(t, 134, 179, hex('#7a94a8'), hex('#1e3044'), 5, 0.05);
  // el ferry de ruedas llega de la derecha y atraca; en la proa, Annie y sus hermanos
  const u = sale(tramo(t, 0, primera - 2.4)), x0 = Math.round(lerp(330, 92, u)), yw = 160 + Math.round(Math.sin(t * 1.4) * 0.8);
  ferry(x0, yw, t, u < 1);
  const s0 = yw - 13, mira = t > a(0.3);
  R.actor(EL.annie, x0 + 14, s0, t, { dir: -1, dedo: mira && t < abre + 0.4, sonrisa: t > abre, sostiene: mira ? undefined : true });
  R.actor(NINO1, x0 + 2, s0, t, { dir: -1, salto: t > abre && t < abre + 1 ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0, sorpresa: t > abre });
  R.actor(NINO2, x0 + 28, s0, t, { dir: -1, sonrisa: t > abre - 0.5 });
  R.rect(x0 + 1, yw - 22, x0 + 44, yw - 22, hex('#e8e4d8')); for (let x = x0 + 2; x < x0 + 44; x += 4) R.rect(x, yw - 21, x, yw - 15, hex('#e8e4d8'));
  // el pito del ferry
  const pi = tramo(t, 2.6, 3.4); if (pi > 0 && pi < 1) { const r = Math.round(1 + pi * 6); R.disco(x0 + 136 + Math.round(pi * 10), yw - 66 - Math.round(pi * 6), r, hex('#f4f6f8')); }
  for (let k = 0; k < 6; k++) { const aa = (t * 0.6 + k / 6) % 1; R.disco(x0 + 136 + Math.round(aa * 26), yw - 66 - Math.round(aa * 20), 1 + Math.round(aa * 4), aa > 0.5 ? hex('#8a8e96') : hex('#5a5e66')); }
  // el marinero del ferry echa la amarra al noray del muelle
  const am = tramo(t, primera - 2.2, primera - 1.4); if (am > 0) { const xa = 84, ya = 117, xb = x0 + 40, yb = yw - 15; for (let k = 0; k <= 24; k++) { const f = k / 24 * am, x = Math.round(lerp(xb, xa, f)), y = Math.round(lerp(yb, ya, f) - Math.sin(f * Math.PI) * (am < 1 ? 10 : 2) * (1 - am * 0.6)); R.pset(x, y, hex('#c8a46a')); } }
  olas(t + 7, 164, 179, hex('#8aa4b8'), hex('#1e3044'), 9, 0.05);
  nieve(t, 70);
};

// ── 2 · la sala de registro: Annie, la primera de la fila ──
const p2 = (t) => {
  T.llegada(R, t, { encuadre: 'ellis', detras: () => {
    const sel = tramo(t, sello - 0.35, sello) - tramo(t, sello + 0.15, sello + 0.5);
    const f = R.actor(EL.funcionario, 226, 150, t, { dir: -1, sonrisa: t > moore - 0.3, habla: t > moore && t < moore + 1.1 && Math.sin(t * 9) > 0, sostiene: t > sello - 0.6 && t < sello + 0.6 ? [212, Math.round(126 + sel * 6)] : undefined });
    if (t > sello - 0.6 && t < sello + 0.6) { const [mx, my] = f.mano; R.rect(mx - 2, my - 6, mx + 1, my - 1, hex('#6a4426')); R.rect(mx - 3, my, mx + 2, my + 1, K); }
  } });
  // la fila: Annie delante, sus dos hermanos, y detrás los demás con sus bultos, que avanzan un paso
  const ua = io(tramo(t, P2 + 0.1, chica)), xa = Math.round(lerp(98, 184, ua));
  R.actor(EL.annie, xa, 168, t, { dir: t > hermanos ? -1 : 1, anda: ua > 0 && ua < 1, sonrisa: t > moore - 0.2, dedo: t > hermanos + 0.1, habla: t > hermanos && t < hermanos + 0.8 });
  const sh = t > hermanos && t < hermanos + 0.8 ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0;
  R.actor(NINO1, xa - 16, 168, t, { dir: 1, anda: ua > 0 && ua < 1, salto: sh, sonrisa: t > hermanos });
  R.actor(NINO2, xa - 30, 168, t, { dir: 1, anda: ua > 0 && ua < 1, salto: sh ? 3 - sh : 0, sonrisa: t > hermanos });
  const cola = [[EL.emigrante, 40, { sostiene: true }], [EL.emigranta, 22], [EL.emigrante2, 4], [EL.dama, -12, { pal: { C: hex('#3a4a6a') } }]];
  cola.forEach(([d, x0, o = {}], k) => { const u = io(tramo(t, P2 + 0.6 + k * 0.25, chica + 0.8 + k * 0.25)), x = Math.round(x0 + u * 40);
    const m = R.actor(d, x, 168, t, { dir: 1, anda: u > 0 && u < 1, ...o, habla: k === 1 && t > moore && Math.sin(t * 7) > 0.3, sorpresa: k === 2 && t > moore && t < moore + 1 });
    if (o.sostiene) { const [mx, my] = m.mano; R.rect(mx - 5, my - 4, mx + 3, my + 3, K); R.rect(mx - 4, my - 3, mx + 2, my + 2, hex('#c8b48a')); R.linea(mx - 4, my - 1, mx + 2, my - 1, hex('#8a6a4a')); } });
};

// ── 3 · inserto: la moneda de oro y el contador de doce millones ──
let MESA = null;
const p3 = (t) => {
  if (!MESA) MESA = capa(() => {
    // la pared de azulejos en espiga de la sala, con un ventanal y la bandera colgada
    for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const q = ((x >> 2) + (y >> 1)) % 4, c = (x + y * 2) % 8 === 0 ? hex('#b8a888') : q < 2 ? hex('#e4d8bc') : hex('#d6c8aa'); R.pset(x, y, c); }
    R.rect(208, 6, 270, 52, hex('#c8b898')); R.disco(239, 22, 30, hex('#c8b898')); R.rect(212, 22, 266, 52, hex('#a8c4d8')); R.disco(239, 22, 27, hex('#a8c4d8')); R.rect(208, 52, 270, 54, hex('#b8a888'));
    R.recorte([212, 0, 266, 52]); for (let x = 220; x < 266; x += 12) R.linea(x, 0, x, 52, hex('#7a6a5a')); for (let y = 16; y < 52; y += 12) R.linea(212, y, 266, y, hex('#7a6a5a')); R.recorte(null);
    for (let j = 0; j < 30; j++) for (let i = 0; i < 40; i++) R.pset(8 + i, 18 + j + Math.round(Math.sin(i * 0.3) * 1), j < 14 && i < 16 ? (((i + j) % 4 === 0) ? hex('#f4f2ea') : hex('#2a3a7a')) : (Math.floor(j / 3) % 2 ? hex('#f4f2ea') : hex('#c8303a')));
    R.rect(6, 16, 50, 17, hex('#8a6a3a'));
    // el tablero de la mesa, con vetas
    for (let y = 62; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 1.6 + y * 0.02); R.pset(x, y, v > 0.82 ? hex('#5a3418') : v > 0.2 ? hex('#7a4a2a') : hex('#8a5632')); }
    R.rect(0, 62, 319, 64, hex('#a8703e')); R.rect(0, 65, 319, 65, hex('#3a2010'));
    // el libro de registro abierto: dos páginas con renglones de tinta (sin letras), el lomo y su sombra
    R.poligono([[60, 76], [160, 72], [260, 76], [266, 160], [160, 164], [54, 160]], hex('#3a2010'));
    R.poligono([[62, 74], [158, 70], [158, 158], [56, 156]], hex('#f2ead2')); R.poligono([[162, 70], [258, 74], [264, 156], [162, 158]], hex('#ece2c6'));
    R.rect(157, 70, 162, 158, hex('#c8bc98')); R.rect(159, 70, 160, 158, hex('#8a7a5a'));
    for (let y = 84; y < 152; y += 6) { R.linea(66, y, 154, y, hex('#d0c4a4')); R.linea(166, y, 258, y, hex('#d0c4a4')); }
    R.linea(84, 78, 84, 154, hex('#d89a9a')); R.linea(184, 78, 184, 154, hex('#d89a9a'));
    for (let y = 84; y < 152; y += 6) for (const [x0, x1] of [[68, 82], [88, 150], [168, 182], [188, 254]]) { let x = x0; while (x < x1 - 2) { const l = 3 + Math.round(rn(x, y) * 9); if (rn(y, x) > 0.82 && y > 120 && x0 > 100) break; for (let i = 0; i < Math.min(l, x1 - x); i++) R.pset(x + i, y - 1 - ((i + x) % 3 === 0 ? 1 : 0), hex('#2a2a4a')); x += l + 2; } }
    R.numero('1', 72, 84, { tam: 8 });
    // el tintero con la pluma, el sello y su almohadilla, las gafas y los billetes del barco
    R.disco(286, 128, 10, K); R.disco(286, 127, 9, hex('#2a2a3a')); R.rect(280, 116, 292, 122, K); R.rect(281, 117, 291, 121, hex('#3a3a5a')); R.disco(286, 117, 3, hex('#1a1a2a')); R.linea(284, 116, 304, 86, hex('#f2f0e8')); R.linea(285, 116, 305, 86, hex('#c8c4b8')); R.linea(304, 86, 310, 80, hex('#f4f2ea'));
    R.rect(14, 136, 46, 156, K); R.rect(15, 137, 45, 155, hex('#3a2a4a')); R.rect(18, 140, 42, 152, hex('#5a3a6a')); R.rect(20, 116, 30, 136, K); R.rect(21, 117, 29, 128, hex('#8a5a32')); R.rect(19, 128, 31, 135, hex('#4a4a52')); R.disco(25, 115, 5, K); R.disco(25, 114, 4, hex('#a8743c'));
    R.anillo(28, 92, 5, hex('#c8a040')); R.anillo(42, 92, 5, hex('#c8a040')); R.linea(33, 92, 37, 92, hex('#c8a040'));
    for (const [x, y, c] of [[266, 150, '#e8d8a8'], [272, 160, '#d8c4e0']]) { R.rect(x, y, x + 30, y + 14, K); R.rect(x + 1, y + 1, x + 29, y + 13, hex(c)); R.rect(x + 3, y + 3, x + 12, y + 4, hex('#8a6a4a')); R.rect(x + 20, y + 3, x + 27, y + 11, hex('#c8a040')); }
  });
  R.copiar(MESA);
  T.motas(R, t, 204, 276, 50, 120, 10, hex('#fff4c8'));
  // las hojas pasan deprisa en «twelve million»
  const fl = tramo(t, doce + 0.05, doce + 1.6); if (fl > 0 && fl < 1) { const k = (fl * 6) % 1, w = Math.round(Math.cos(k * Math.PI) * 96); const x0 = 160, x1 = 160 + w;
    R.poligono([[x0, 70], [x1, 70 + Math.round(Math.abs(w) * 0.04) - Math.round(Math.sin(k * Math.PI) * 10)], [x1, 156 - Math.round(Math.sin(k * Math.PI) * 6)], [x0, 158]], w > 0 ? hex('#ece2c6') : hex('#f2ead2'));
    R.linea(x1, 70 - Math.round(Math.sin(k * Math.PI) * 10), x1, 156 - Math.round(Math.sin(k * Math.PI) * 6), hex('#a89c7c')); }
  // la moneda: la mano del funcionario la trae y la empuja por la página; la de Annie la recoge y se la lleva
  const e1 = io(tramo(t, P3 + 0.05, P3 + 0.6)), d1 = io(tramo(t, P3 + 0.75, P3 + 1.3)), r1 = io(tramo(t, P3 + 1.6, P3 + 2.2));
  const fwx = Math.round(lerp(118, 140, e1) + 20 * d1 - 20 * r1), fwy = Math.round(lerp(204, 152, e1) + r1 * 56);
  const e2 = io(tramo(t, P3 + 0.9, P3 + 1.4)) - io(tramo(t, ver - 1.3, ver - 0.6)), awx = Math.round(lerp(232, 190, e2)), awy = Math.round(lerp(208, 152, e2));
  const coge = t > P3 + 1.45;
  if (e2 > 0) T.brazo(R, 242, 216, awx, awy, '#3a5a3a', -1, { codo: [Math.round(lerp(238, 216, e2)), Math.round(lerp(212, 184, e2))] });
  if (e1 > 0 && r1 < 1) T.brazo(R, 112, 216, fwx, fwy, '#2a3450', 1, { codo: [Math.round(lerp(120, 134, e1) + 8 * d1), Math.round(lerp(212, 186, e1) + r1 * 20)] });
  const [cx, cy] = coge ? [awx - 7, awy - 1] : [fwx + 12, fwy - 1];
  if (e1 > 0.4 && cy < 176 && !(coge && e2 <= 0)) { R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#c8962a')); R.disco(cx - 1, cy - 1, 7, hex('#f0c040')); R.anillo(cx, cy, 6, hex('#c8962a')); R.numero('10', cx - 6, cy + 3, { tam: 8, rampa: [hex('#7a4a10'), hex('#7a4a10'), hex('#7a4a10'), hex('#7a4a10')] });
    if (Math.sin(t * 6) > 0.6) { R.pset(cx + 3, cy - 4, hex('#ffffff')); R.pset(cx + 4, cy - 5, hex('#ffffff')); R.pset(cx + 2, cy - 5, hex('#fff4c8')); } }
  // el contador sube hasta doce millones
  const c = tramo(t, doce - 0.1, doce + 1.6); if (c > 0) { const n = Math.max(1, Math.round(12e6 * c ** 3 / 1000) * 1000); R.numero(n.toLocaleString('en-US'), 128, 44, { tam: 16, centro: true }); }
};

// ── 4 · la cubierta: la estatua aparece por la proa ──
const p4 = (t) => {
  T.llegada(R, t, { encuadre: 'cubierta', estatua: io(tramo(t, ver - 0.2, estatua)), ciudad: true });
  // baúles con sus banderitas en la cubierta
  baul(64, 150, 16, 10, hex('#6a3a2a'), 'italia'); baul(82, 152, 14, 8, hex('#3a4a6a'), 'polonia'); baul(70, 141, 13, 9, hex('#4a5a3a'), 'irlanda');
  const corre = io(tramo(t, ver + 0.1, estatua - 0.3)), ve = t > estatua - 0.2;
  const gente = [[EL.emigrante2, 96, 150], [EL.emigranta, 118, 176, { pal: { C: hex('#7a3a4a') } }], [NINO2, 132, 196], [EL.emigrante, 150, 214], [EL.dama, 168, 232, { pal: { C: hex('#3a5a6a') } }]];
  gente.forEach(([d, x0, x1, o = {}], k) => { const u = tramo(corre, k * 0.08, 0.7 + k * 0.06), x = Math.round(lerp(x0, x1, u));
    R.actor(d, x, 160, t, { dir: 1, ...o, anda: u > 0 && u < 1, sorpresa: ve && k % 2 === 0, dedo: ve && (k === 0 || k === 3), sonrisa: ve && k % 2 === 1, salto: d === NINO2 && ve ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0, brazos: ve && k === 4 }); });
  // el marinero adujando el cabo junto a la chimenea
  R.actor(EL.marinero83, 44, 162, t, { dir: 1, sostiene: true, sorpresa: ve });
  { const x = 62, y = 150; R.anillo(x, y, 4, hex('#c8a46a')); R.anillo(x, y, 2, hex('#8a6a3a')); }
};

// ── 5 · la estatua de cerca, la antorcha que brilla ──
let LIB = null, EST = null;
const V = hex('#5aa898'), VS = hex('#3a7a6c'), VL = hex('#8ad0c0'), VD = hex('#24564c');
const p5 = (t) => {
  if (!LIB) LIB = capa(() => {
    degradado(['#4a6aa8', '#6078b0', '#7a86b4', '#9a94b4', '#c0a4ac', '#e0b49c', '#f2c890'].map(hex), 0, 132);
    R.poligono([[0, 130], [60, 126], [110, 129], [170, 125], [240, 128], [319, 126], [319, 134], [0, 134]], hex('#7a7a96')); for (let x = 4; x < 316; x += 9) R.rect(x, 128 - (x % 4), x + 2, 133, hex('#6a6a88'));
    for (let x = 0; x < 168; x += 5) { const h = 6 + Math.round(rn(x, 21) * 12) + (x > 40 && x < 70 ? 6 : 0); R.rect(x, 130 - h, x + 4, 131, hex('#8a86a6')); R.rect(x + 4, 130 - h, x + 4, 131, hex('#76728e')); for (let y = 132 - h; y < 130; y += 3) if (rn(x, y) > 0.5) R.pset(x + 2, y, hex('#f0d8a8')); }
    R.poligono([[56, 130], [59, 98], [62, 130]], hex('#8a86a6')); R.rect(54, 112, 64, 131, hex('#8a86a6')); R.rect(128, 112, 132, 131, hex('#9a96b2')); R.rect(146, 112, 150, 131, hex('#9a96b2')); R.linea(132, 114, 146, 114, hex('#9a96b2')); R.linea(110, 126, 132, 112, hex('#9a96b2')); R.linea(150, 112, 168, 124, hex('#9a96b2'));
    degradado(['#7a86a8', '#6a7aa0', '#5a6a90', '#4a5a80', '#3a4a70', '#2e3c60'].map(hex), 134, 179);
  });
  if (!EST) EST = capa(() => {
    // la isla con el fuerte en estrella, la hierba y los árboles
    R.poligono([[120, 170], [150, 156], [200, 152], [262, 154], [300, 162], [318, 170]], hex('#5a7a4a'));
    R.poligono([[146, 170], [160, 160], [178, 164], [204, 156], [230, 164], [250, 160], [268, 170]], hex('#8a8a92')); R.linea(146, 170, 268, 170, hex('#5a5a66'));
    for (let x = 150; x < 266; x += 3) R.pset(x, 166 - Math.round(Math.abs(Math.sin(x * 0.12)) * 3), hex('#6a6a74'));
    for (const [x, y] of [[134, 164], [148, 158], [276, 160], [292, 165]]) { R.disco(x, y, 6, hex('#2e4a2a')); R.disco(x - 1, y - 2, 4, hex('#4a6a3a')); R.pset(x - 2, y - 4, hex('#6a8a4a')); }
    // el pedestal de granito: sillares, la logia con sus huecos y la cornisa
    R.rect(178, 124, 230, 162, K); for (let y = 125; y < 162; y++) for (let x = 179; x < 230; x++) { const e = x > 216 ? hex('#a89e8a') : hex('#d0c6b0'); R.pset(x, y, ((y - 125) % 5 === 0 || (x + ((y - 125) / 5 | 0) * 4) % 10 === 0) ? hex('#968c78') : e); }
    R.rect(174, 122, 234, 126, hex('#e2d8c2')); R.rect(174, 126, 234, 127, hex('#7a7060')); R.rect(184, 132, 224, 146, hex('#bcb29c')); for (let x = 187; x < 224; x += 8) { R.rect(x, 135, x + 4, 145, hex('#4a4a5a')); R.disco(x + 2, 135, 2, hex('#4a4a5a')); }
    // la estatua: el manto de cobre con sus pliegues
    R.poligono([[185, 123], [183, 100], [187, 82], [194, 74], [204, 72], [214, 74], [221, 82], [225, 100], [227, 123]], K);
    R.poligono([[186, 122], [184, 100], [188, 83], [195, 75], [204, 73], [213, 75], [220, 83], [224, 100], [226, 122]], V);
    R.poligono([[213, 75], [220, 83], [224, 100], [226, 122], [217, 122], [215, 96]], VS);
    for (const [x0, x1] of [[191, 189], [197, 196], [203, 204], [209, 211]]) { R.linea(x0, 86, x1, 122, VS); R.linea(x0 - 1, 88, x1 - 1, 122, VL); }
    R.linea(188, 84, 214, 100, VL); R.linea(188, 85, 214, 101, VS); R.rect(184, 119, 228, 122, VS); R.rect(198, 120, 204, 123, VS);
    // la tabla en el brazo izquierdo
    R.poligono([[214, 86], [227, 82], [234, 104], [221, 108]], K); R.poligono([[215, 87], [226, 83], [232, 103], [222, 106]], VL); R.linea(217, 92, 228, 88, VS); R.linea(219, 99, 230, 95, VS); R.pset(220, 96, VS);
    // el brazo alzado con la antorcha
    R.poligono([[187, 79], [195, 74], [190, 40], [183, 42]], K); R.poligono([[188, 78], [194, 74], [189, 41], [184, 43]], V); R.linea(185, 44, 189, 76, VL); R.linea(191, 44, 194, 72, VS);
    R.rect(184, 38, 190, 42, K); R.rect(185, 39, 189, 41, V); R.rect(182, 31, 192, 36, K); R.rect(183, 32, 191, 35, hex('#c8a040')); R.rect(183, 32, 191, 32, hex('#f0d070')); R.rect(185, 36, 189, 38, hex('#a8802c'));
    // la cabeza, la cara y la corona de siete rayos
    R.rect(200, 66, 208, 73, VS); R.disco(204, 61, 8, K); R.disco(204, 61, 7, V); R.disco(202, 60, 4, VL); R.rect(209, 56, 211, 66, VS);
    R.pset(201, 60, VD); R.pset(207, 60, VD); R.linea(204, 61, 204, 63, VS); R.linea(203, 66, 205, 66, VD);
    R.rect(196, 53, 212, 55, VS); R.rect(196, 52, 212, 52, VL);
    for (let k = 0; k < 7; k++) { const g = -Math.PI / 2 + (k - 3) * 0.36, x0 = 204 + Math.round(Math.cos(g) * 7), y0 = 53 + Math.round(Math.sin(g) * 2), x1 = 204 + Math.round(Math.cos(g) * 16), y1 = 53 + Math.round(Math.sin(g) * 13); R.linea(x0, y0, x1, y1, VS); R.linea(x0 + 1, y0, x1, y1, VL); R.pset(x1, y1, VL); }
  });
  R.copiar(LIB);
  nubes(t, [[10, 40, 34, 2], [120, 30, 26, 2], [300, 56, 30, 2], [60, 74, 20, 5], [170, 92, 18, 5], [260, 100, 14, 8], [20, 104, 12, 8]], [hex('#b08ca0'), hex('#e2bcb4'), hex('#fadcc0')]);
  for (let k = 0; k < 5; k++) { const x = Math.round(((t * 9 + k * 7) % 200) - 20 + (k % 2) * 4), y = 58 + k * 3 + Math.round(Math.sin(t * 3 + k)); if (x > 0) R.gaviota(x, y, t, k + 5); }
  poner(EST);
  // la llama de oro que brilla, con su halo que late
  const lat = 0.5 + 0.5 * Math.sin(t * 5);
  for (let j = -13; j <= 13; j++) for (let i = -13; i <= 13; i++) { const d = Math.hypot(i, j); if (d < 13 && um(187 + i, 25 + j) < (1 - d / 13) * (0.45 + lat * 0.4)) R.pset(187 + i, 25 + j, hex('#fff0b0')); }
  R.poligono([[182, 31], [186, 18 - Math.round(lat * 2)], [188, 23], [192, 31]], hex('#f0b030')); R.poligono([[185, 31], [187, 22 - Math.round(lat * 2)], [189, 31]], hex('#fff4c0'));
  // las gaviotas que rodean la antorcha y un remolcador que pasa
  for (let k = 0; k < 3; k++) { const g = t * 0.9 + k * 2.1, x = Math.round(196 + Math.cos(g) * (40 + k * 8)), y = Math.round(52 + Math.sin(g) * (14 + k * 4)); if (y > 16 && !(x > 274 && y < 48)) R.gaviota(x, y, t, k); }
  { const x = Math.round(lerp(330, 120, tramo(t, P5, P6 + 0.5))); R.rect(x, 170, x + 24, 175, K); R.rect(x + 1, 170, x + 23, 174, hex('#6a2a2a')); R.rect(x + 1, 170, x + 23, 170, hex('#e8e4d8')); R.rect(x + 6, 163, x + 17, 170, hex('#e8e4d8')); R.rect(x + 8, 165, x + 15, 167, hex('#2a3a4e')); R.rect(x + 11, 157, x + 14, 163, K); R.rect(x + 11, 159, x + 14, 160, hex('#b8302a'));
    for (let k = 0; k < 5; k++) { const aa = (t * 0.6 + k / 5) % 1; R.disco(x + 12 + Math.round(aa * 18), 155 - Math.round(aa * 12), 1 + Math.round(aa * 3), hex('#9a9aa8')); }
    for (let k = 0; k < 6; k++) R.pset(x + 26 + k * 3, 175 + (k % 2), hex('#d8e4f0')); }
  olas(t, 172, 179, hex('#8a96b8'), hex('#26304e'), 6, 0.06);
  // «1886», al lado del pedestal
  const ap = tramo(t, y1886 - 0.1, y1886 + 0.3); if (ap > 0) R.numero('1886', 264, Math.round(122 - ap * 6), { tam: 16, centro: true });
  // la borda del barco a la izquierda, con la gente que mira arriba, señala y saluda
  R.rect(0, 166, 168, 179, hex('#e8e4d8')); R.rect(0, 166, 168, 167, hex('#c4bca8'));
  const gente = [[EL.emigrante, 18, { dedo: t > P5 + 0.3 }], [EL.emigranta, 40, { sostiene: t > P5 + 0.9 }], [NINO1, 60, {}], [EL.estibador2, 78, { brazos: t > y1886 + 0.6 }], [EL.dama, 100, { pal: { C: hex('#6a3a5a') } }], [EL.marinero83, 124, { dedo: t > y1886 }]];
  gente.forEach(([d, x, o], k) => { const m = R.actor(d, x, 172, t, { dir: 1, ...o, sonrisa: k % 2 === 1 || t > y1886, sorpresa: (k === 2 || k === 4) && t < y1886, salto: d === NINO1 && t > y1886 ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0 });
    if (o.sostiene) { const [mx, my] = m.mano, f = Math.sin(t * 12) > 0 ? 1 : 0; R.rect(mx + 1, my - 4 + f, mx + 6, my, hex('#f8f6ee')); R.pset(mx + 7, my - 3 + f, hex('#f8f6ee')); } });
  R.rect(0, 158, 168, 160, hex('#8a5a32')); R.rect(0, 158, 168, 158, hex('#c8945a')); R.rect(168, 158, 170, 179, hex('#6a4426')); for (let x = 4; x < 168; x += 7) R.rect(x, 161, x + 1, 172, hex('#f2eee2')); R.rect(0, 172, 168, 174, hex('#c4bca8'));
  R.disco(150, 166, 8, K); R.disco(150, 166, 7, hex('#e8e4d8')); R.disco(150, 166, 4, hex('#8a5a32')); for (const g of [0, 1.57, 3.14, 4.71]) R.disco(150 + Math.round(Math.cos(g) * 5), 166 + Math.round(Math.sin(g) * 5), 1, hex('#c8303a'));
};

// ── 6 · el puente de Brooklyn engalanado: Emily cruza la primera ──
const p6 = (t) => {
  T.llegada(R, t, { encuadre: 'puente', inauguracion: true });
  // la gente de la pasarela, que se vuelve y saluda cuando pasa el carruaje
  const vio = t > emily - 1.2;
  for (let k = 0; k < 12; k++) mini(126 + k * 15 + (k % 3), 131, ROPAS[k % 8], PIELES[k % 4], GORROS[(k + 2) % 6], t, k, { brazo: t > cruza + k * 0.15, salta: vio && k % 3 === 0, panuelo: k % 4 === 1 });
  // un remolcador pasa por el río bajo el puente y pita
  { const x = Math.round(lerp(330, -40, tramo(t, P6, P7 + 0.4))); R.rect(x, 172, x + 26, 177, K); R.rect(x + 1, 172, x + 25, 176, hex('#2a3a34')); R.rect(x + 1, 172, x + 25, 172, hex('#e8e4d8')); R.rect(x + 6, 165, x + 18, 172, hex('#e8e4d8')); R.rect(x + 8, 167, x + 16, 169, hex('#2a3a4e')); R.rect(x + 12, 158, x + 15, 165, K); R.rect(x + 12, 160, x + 15, 161, hex('#b8302a'));
    for (let k = 0; k < 5; k++) { const aa = (t * 0.7 + k / 5) % 1; R.disco(x + 14 + Math.round(aa * 16), 156 - Math.round(aa * 8), 1 + Math.round(aa * 3), hex('#c4c8d0')); }
    const pi = tramo(t, b(0.16), b(0.16) + 0.7); if (pi > 0 && pi < 1) R.disco(x + 10, 154 - Math.round(pi * 6), 1 + Math.round(pi * 4), hex('#ffffff')); }
  const u = io(tramo(t, cruza - 0.6, emily + 0.3)), x = Math.round(lerp(-60, 160, u) + tramo(t, emily + 0.3, P7) * 14);
  const c = T.carruaje(R, x, 148, t, { parte: 'detras', dir: 1, gallo: true, cochero: EL.estibador, quieto: u <= 0 || u >= 1 && t > P7 - 0.2 });
  const me = R.actor(EL.emily, c.asiento[0], c.asiento[1], t, { dir: 1, sonrisa: true, sostiene: t > emily - 0.4 ? [c.asiento[0] + 14, c.asiento[1] - 22] : undefined });
  if (t > emily - 0.4) { const [mx, my] = me.mano, f = Math.sin(t * 12) > 0 ? 1 : 0; R.rect(mx + 1, my - 5 + f, mx + 6, my - 1, hex('#f8f6ee')); R.pset(mx + 7, my - 4 + f, hex('#f8f6ee')); R.pset(mx + 1, my - 1, hex('#d8d4cc')); }
  T.carruaje(R, x, 148, t, { parte: 'delante', dir: 1, gallo: true, cochero: EL.estibador });
};

// ── 7 · el cuarto de Brooklyn Heights: él mira, ella dirige la obra ──
const p7 = (t) => {
  T.llegada(R, t, { encuadre: 'puente', ventana: true });
  const habla = t > marido - 0.2 && t < enferma - 0.3, tose = t > enferma && t < enferma + 1, vuelve = t > enferma + 1.4;
  // Washington Roebling, con la manta por los hombros, y su catalejo
  const catalejo = !habla && !tose;
  const m = R.actor(EL.roebling, 92, 162, t, { dir: 1, sostiene: catalejo ? [118, 132] : undefined, dedo: habla && t > jefe - 0.4, habla: habla && Math.sin(t * 8) > 0, triste: tose, sonrisa: vuelve });
  for (let j = 0; j < 6; j++) for (let i = j >> 1; i < 14 - (j >> 1); i++) R.pset(92 + i, 149 + j, j === 5 ? (i % 2 ? hex('#c8303a') : hex('#e8d8b0')) : (i + j) % 4 === 0 ? hex('#c8303a') : (j % 3 === 0 ? hex('#4a6a9a') : hex('#2a4070')));
  if (catalejo) { const [mx, my] = m.mano; R.linea(mx - 2, my + 2, mx + 14, my - 4, K); R.linea(mx - 2, my + 1, mx + 14, my - 5, hex('#c8a040')); R.linea(mx - 1, my + 3, mx + 13, my - 3, hex('#8a6a20')); R.rect(mx + 12, my - 7, mx + 15, my - 3, K); R.rect(mx + 13, my - 6, mx + 14, my - 4, hex('#e8c860')); }
  if (tose) for (let k = 0; k < 3; k++) { const aa = ((t - enferma) * 1.6 + k / 3) % 1; R.pset(110 + Math.round(aa * 6), 144 - Math.round(aa * 4) - k, hex('#f2f2f2')); }
  // Emily entra con los planos enrollados, los despliega y se los enseña
  const ue = io(tramo(t, P7 + 0.2, proyecto + 0.4)), xe = Math.round(lerp(330, 132, ue)), abiertos = t > marido - 0.4 && t < enferma + 0.6;
  const me = R.actor(EL.emily, xe, 162, t, { dir: -1, anda: ue > 0 && ue < 1, sostiene: abiertos ? [xe - 4, 136] : true, habla: t > proyecto && t < marido && Math.sin(t * 9) > 0, sonrisa: t < enferma || vuelve, triste: tose });
  const [ex, ey] = me.mano;
  if (abiertos) { R.rect(ex - 22, ey - 12, ex, ey + 2, K); R.rect(ex - 21, ey - 11, ex - 1, ey + 1, hex('#2a5aa0')); for (let y = ey - 9; y < ey; y += 3) R.linea(ex - 19, y, ex - 3, y, hex('#a8c8f0')); R.linea(ex - 18, ey - 2, ex - 10, ey - 9, hex('#e8f0fa')); R.linea(ex - 10, ey - 9, ex - 3, ey - 2, hex('#e8f0fa')); R.rect(ex - 22, ey - 12, ex - 21, ey + 2, hex('#e8e4d8')); }
  else { R.rect(ex - 9, ey - 2, ex + 4, ey + 2, K); R.rect(ex - 8, ey - 1, ex + 3, ey + 1, hex('#e8e4d8')); R.rect(ex - 8, ey - 1, ex - 7, ey + 1, hex('#2a5aa0')); }
};
const año = (t) => t < P6 ? 1892 : 1883;
const efectos = [[2.6, 'vapor'], [abre + 0.1, 'publico'], [sello, 'sello'], [P3 + 1.0, 'brillo'], [doce + 0.1, 'papel'], [ver + 0.1, 'whoosh'], [estatua, 'publico'], [y1886, 'brillo'], [b(0.16), 'vapor'], [emily, 'publico'], [marido - 0.4, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1892', efectos, año });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-distritos'] = ('Cinco distritos', '''// NY-DISTRITOS (frase 40), 1898, cartela «1898». Tres planos:
// 1. la noche de Año Nuevo de 1898 ante el ayuntamiento nevado: el reloj de la cúpula da las doce, suben los cohetes y en
//    «1898» estalla el grande; la multitud salta, un caballero lanza el sombrero al aire (corta en «Brooklyn»);
// 2. el mapa: las cinco piezas de cartón llegan y encajan como un puzle mientras se nombran, y en «merge» la ciudad queda
//    entera (corta en «city»);
// 3. el globo terráqueo gira: en «second largest» se clava el «2» junto a Nueva York y en «London» el «1» junto a Londres.''', H + r'''
const d = (f) => en('distritos', f);
const P2 = d(0.314), P3 = d(0.6935);   // «Brooklyn», «city»
const y1898 = d(0.1443), merge = d(0.59), segunda = d(0.784), londres = d(0.945);

// ── 1 · fuegos artificiales sobre el ayuntamiento ──
let CH = null;
const p1 = (t) => {
  if (!CH) CH = capa(() => {
    degradado(['#0e1230', '#141a3e', '#1c2250', '#262a5e', '#343068', '#4a3a70'].map(hex), 0, 120);
    for (let k = 0; k < 50; k++) { const x = Math.round(rn(k, 1) * 320), y = Math.round(rn(k, 2) * 90); if (!(x > 274 && y < 48) && !(x < 172 && y < 16)) R.pset(x, y, rn(k, 3) > 0.5 ? hex('#e8e8f8') : hex('#8a8ab8')); }
    // los edificios de la plaza al fondo, con ventanas encendidas
    for (const [x0, x1, y0] of [[0, 40, 84], [270, 319, 80], [40, 70, 96], [250, 272, 92]]) { R.rect(x0, y0, x1, 132, hex('#2a2440')); for (let y = y0 + 4; y < 128; y += 8) for (let x = x0 + 3; x < x1 - 3; x += 7) R.rect(x, y, x + 2, y + 3, rn(x, y) > 0.45 ? hex('#f0c870') : hex('#3a3456')); R.rect(x0, y0, x1, y0, hex('#e8ecf6')); }
    // el ayuntamiento de mármol: alas, cuerpo central con pórtico, la cúpula con el reloj y la Justicia
    const M0 = hex('#d8d4cc'), MS = hex('#a8a4a8'), ML = hex('#eeeae4');
    R.rect(56, 86, 264, 136, K); R.rect(57, 87, 263, 136, M0); R.rect(57, 87, 263, 89, ML); R.rect(57, 112, 263, 113, MS);
    for (const y of [94, 118]) for (let x = 62; x < 260; x += 12) { if (x > 114 && x < 204) continue; R.rect(x, y, x + 5, y + 12, MS); R.rect(x + 1, y + 1, x + 4, y + 11, rn(x, y) > 0.35 ? hex('#f0c870') : hex('#4a4466')); R.disco(x + 2, y + 1, 2, MS); }
    R.rect(112, 74, 208, 136, K); R.rect(113, 75, 207, 136, ML); R.rect(113, 75, 207, 78, hex('#f6f4f0'));
    for (let x = 118; x < 204; x += 10) { R.rect(x, 96, x + 4, 132, hex('#f2f0ea')); R.rect(x + 3, 96, x + 4, 132, MS); R.rect(x - 1, 94, x + 5, 95, hex('#c8c4c0')); }
    R.rect(114, 92, 206, 94, MS); R.rect(118, 100, 204, 132, hex('#8a8494')); for (let x = 118; x < 204; x += 10) { R.rect(x, 96, x + 4, 132, hex('#f2f0ea')); R.rect(x + 3, 96, x + 4, 132, MS); }
    for (let x = 123; x < 200; x += 10) R.rect(x, 104, x + 4, 128, rn(x, 3) > 0.3 ? hex('#f0c870') : hex('#4a4466'));
    R.rect(108, 70, 212, 74, hex('#f6f4f0')); for (let x = 110; x < 212; x += 3) R.rect(x, 66, x, 70, hex('#d8d4cc')); R.rect(108, 66, 212, 66, hex('#f6f4f0'));
    R.rect(142, 44, 178, 70, K); R.rect(143, 45, 177, 70, M0); for (let x = 146; x < 176; x += 6) R.rect(x, 50, x + 1, 68, MS);
    R.rect(146, 30, 174, 44, K); R.rect(147, 31, 173, 44, ML); R.rect(147, 31, 149, 44, MS); R.disco(160, 38, 6, K); R.disco(160, 38, 5, hex('#f6f0dc')); for (let k = 0; k < 12; k++) R.pset(160 + Math.round(Math.cos(k * 0.52) * 4), 38 + Math.round(Math.sin(k * 0.52) * 4), hex('#8a8494'));
    R.rect(144, 28, 176, 30, hex('#f6f4f0')); for (let y = 18; y < 28; y++) { const w = Math.round(Math.sqrt(1 - ((28 - y) / 10) ** 2) * 13); R.linea(160 - w, y, 160 + w, y, y < 22 ? hex('#c8c4c8') : hex('#a8a4b0')); R.pset(160 - w, y, K); R.pset(160 + w, y, K); } R.disco(155, 23, 2, hex('#e8e4e8')); for (let x = 150; x < 172; x += 4) R.linea(x, 21, x, 27, hex('#8a8494'));
    R.rect(159, 14, 161, 18, hex('#c8a040')); R.rect(158, 17, 162, 18, hex('#c8a040')); R.rect(156, 15, 164, 15, hex('#c8a040'));
    // la nieve en las cornisas y la escalinata
    for (const [x0, x1, y] of [[56, 264, 86], [112, 208, 74], [108, 212, 66], [142, 178, 44]]) R.rect(x0, y - 1, x1, y, hex('#f2f4fa'));
    for (let k = 0; k < 4; k++) R.rect(124 - k * 4, 136 + k * 2, 196 + k * 4, 137 + k * 2, k % 2 ? hex('#b8b4b8') : hex('#e4e0e0'));
    // la plaza nevada con faroles de gas y árboles pelados
    degradado(['#c8cce0', '#b4b8d0', '#a0a4c0'].map(hex), 144, 179); for (let k = 0; k < 140; k++) R.pset(Math.round(rn(k, 4) * 320), 144 + Math.round(rn(k, 5) * 36), hex('#e8ecf6'));
    for (const x of [24, 296]) { R.rect(x, 70, x + 2, 144, hex('#2a2030')); for (let k = 0; k < 7; k++) R.linea(x + 1, 90 + k * 6, x + 1 + (k % 2 ? 14 : -14), 74 + k * 6, hex('#2a2030')); }
    for (const x of [92, 228]) { for (let j = -8; j <= 8; j++) for (let i = -30; i <= 30; i++) { const e = Math.hypot(i / 30, j / 8); if (e < 1 && um(x + i, 152 + j) < (1 - e) * 1.4) R.pset(x + i, 152 + j, hex('#f0e2b8')); } R.rect(x, 108, x + 1, 150, hex('#1a1a24')); R.rect(x - 3, 102, x + 4, 108, hex('#1a1a24')); R.rect(x - 2, 103, x + 3, 107, hex('#fff0a8')); R.rect(x - 3, 101, x + 4, 101, hex('#f2f4fa')); }
    for (let k = 0; k < 40; k++) { const x = 20 + k * 7, y = 172 + Math.round(Math.sin(k * 0.7) * 3); R.pset(x, y, hex('#8a8eaa')); R.pset(x + 2, y + 1, hex('#8a8eaa')); }
    for (const [x, w] of [[10, 16], [300, 18], [250, 10]]) { R.poligono([[x - w, 150], [x - w / 2, 144], [x + w / 2, 143], [x + w, 150]], hex('#a8acc4')); R.poligono([[x - w + 2, 149], [x - w / 2, 145], [x + w / 2 - 2, 144], [x + w - 3, 149]], hex('#e8ecf6')); }
    R.rect(266, 166, 296, 168, hex('#6a2a2a')); R.rect(264, 160, 290, 166, hex('#a83a3a')); R.linea(262, 169, 298, 169, hex('#3a2a2a')); R.linea(296, 169, 300, 165, hex('#3a2a2a'));
  });
  R.copiar(CH);
  // el reloj marca las doce: el minutero llega arriba
  { const g = -Math.PI / 2 - (1 - tramo(t, 0.4, 1.8)) * 0.5; R.linea(160, 38, 160 + Math.round(Math.cos(g) * 4), 38 + Math.round(Math.sin(g) * 4), K); R.linea(160, 38, 160, 35, K); }
  // los cohetes: suben con su estela y estallan en palmeras de chispas que caen
  const fuegos = [[1.3, 2.2, 82, 50, '#f0c040', 26], [2.2, y1898, 214, 52, '#e84a5a', 38], [2.8, 3.6, 128, 44, '#5ae0a0', 24], [3.3, 4.1, 262, 74, '#f4f4ff', 18], [3.8, 4.6, 52, 72, '#a070f0', 22], [4.3, 4.95, 178, 60, '#f0c040', 26]];
  let luz = 0;
  for (const [t0, t1, x, y, col, r] of fuegos) {
    if (t > t0 && t < t1) { const u = (t - t0) / (t1 - t0), yy = Math.round(lerp(150, y, sale(u))); R.rect(x, yy, x + 1, yy + 1, hex('#fff4c0')); for (let k = 1; k < 8; k++) if ((k + Math.floor(t * 20)) % 2) R.pset(x + (k % 2), yy + k * 2, k < 4 ? hex('#f8c060') : hex('#a86030')); }
    const e = t - t1; if (e > 0 && e < 1.8) { luz = Math.max(luz, 1 - e / 0.5); const C1 = hex(col);
      if (e < 0.25) { R.disco(x, y, Math.round(3 + e * 20), hex('#fffbe8')); }
      for (let k = 0; k < 40; k++) { const g = k / 40 * Math.PI * 2 + (k % 2) * 0.04, rr = r * sale(Math.min(1, e / 0.6)) * (k % 2 ? 1 : 0.8), caida = e * e * 9;
        const px = Math.round(x + Math.cos(g) * rr), py = Math.round(y + Math.sin(g) * rr * 0.9 + caida);
        const dentro = (qx, qy) => !(qy < 16 && qx < 172) && !(qx > 274 && qy < 48) && qy < 150;
        if (e < 1.3 && dentro(px, py)) { const c = e > 1.0 ? hex('#a87a4a') : (k % 3 ? C1 : hex('#ffffff')); R.pset(px, py, c); if (k % 2 === 0) R.pset(px + 1, py, c); }
        for (let q = 1; q <= 3; q++) { const f = 1 - q * 0.12, qx = Math.round(x + Math.cos(g) * rr * f), qy = Math.round(y + Math.sin(g) * rr * 0.9 * f + caida * f); if (e < 1.1 && dentro(qx, qy) && (q + k) % 2) R.pset(qx, qy, q === 1 ? C1 : hex('#8a5a3a')); }
        if (e > 0.9 && e < 1.8 && k % 4 === 0) { const sx = px + Math.round(Math.sin(t * 20 + k)), sy = py + Math.round((e - 0.9) * 14); if (dentro(sx, sy) && Math.sin(t * 30 + k) > 0) R.pset(sx, sy, hex('#fff0b0')); } } } }
  if (luz > 0) T.tinte(R, 30, 140, [255, 230, 190], luz * 0.22);
  // la multitud de la plaza: salta y saluda con cada estallido
  const fiesta = t > 2.2;
  for (let k = 0; k < 34; k++) { const x = 6 + k * 9 + (k % 2) * 3, yb = 152 + (k % 3) * 4; mini(x, yb, ROPAS[k % 8], PIELES[k % 4], GORROS[k % 6], t, k, { brazo: fiesta && k % 3 !== 1, salta: fiesta && k % 4 === 0, panuelo: k % 7 === 0 }); }
  // delante, una familia de 1898: el caballero lanza la chistera, la señora aplaude y la niña salta
  const lanza = tramo(t, y1898 + 0.2, y1898 + 1.4);
  R.actor(EL.comerciante, 128, 175, t, { dir: 1, tocado: lanza > 0 ? undefined : 'chistera', brazos: t > y1898, sorpresa: t > 2.2 && t < y1898, sonrisa: t > y1898 });
  if (lanza > 0) { const hx = 136 + Math.round(lanza * 10), hy = Math.round(147 - Math.sin(lanza * Math.PI) * 40); R.rect(hx - 4, hy, hx + 4, hy + 1, K); R.rect(hx - 3, hy - 7, hx + 3, hy, hex('#1c1c24')); R.rect(hx - 3, hy - 2, hx + 3, hy - 2, hex('#6a2a2a')); }
  R.actor(EL.dama, 150, 175, t, { dir: -1, sonrisa: true, dedo: t > 2.2 && t < y1898, brazos: t > y1898 + 0.3 });
  R.actor(NINA, 168, 175, t, { dir: -1, salto: t > 2.2 ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0, sorpresa: t > 2.2 && t < y1898 + 0.4, sonrisa: t > y1898 + 0.4 });
  nieve(t, 40, 179, hex('#e8ecf8'));
};

// ── 2 · el mapa: las cinco piezas encajan ──
const p2 = (t) => {
  const u = tramo(t, P2 - 0.2, merge);
  T.mapaNY(R, t, { vista: 'distritos', u: u * 0.98 + (t > merge ? 0.02 : 0) });
  // en «merge», un destello que recorre el borde de la ciudad entera
  const g = tramo(t, merge, merge + 0.8); if (g > 0 && g < 1) for (let k = 0; k < 12; k++) { const a = g * Math.PI * 2 + k * 0.52, x = Math.round(196 + Math.cos(a) * 70), y = Math.round(100 + Math.sin(a) * 58); if (!(x > 274 && y < 48)) { R.pset(x, y, hex('#fffbe8')); R.pset(x + 1, y, hex('#f0c040')); } }
};

// ── 3 · el globo: Nueva York, la segunda; Londres, la primera ──
const p3 = (t) => {
  const tg = t - P3 + 0.5;
  T.mapaNY(R, tg, { vista: 'mundo', globo: true });
  const l0 = (-40 + tg * 5) * Math.PI / 180, f0 = 28 * Math.PI / 180, sf = Math.sin(f0), cf = Math.cos(f0);
  const pr = (lo, la) => { const lam = lo * Math.PI / 180 - l0, phi = la * Math.PI / 180; return [Math.round(160 + 62 * Math.cos(phi) * Math.sin(lam)), Math.round(94 - 62 * (cf * Math.sin(phi) - sf * Math.cos(phi) * Math.cos(lam)))]; };
  const medalla = (x, y, n, u, col) => { if (u <= 0) return; const r = Math.round(9 * sale(Math.min(1, u * 1.4))); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(col)); R.anillo(x, y, Math.max(1, r - 2), hex('#fff4c8')); if (u > 0.5) R.numero(n, x - 3, y + 4, { tam: 8, rampa: [K, K, K, K] }); R.linea(x - 3, y + r, x - 6, y + r + 6, hex('#c8303a')); R.linea(x + 3, y + r, x + 6, y + r + 6, hex('#2a4a8a')); };
  const [nx, ny] = pr(-74, 40.7), [lx, ly] = pr(-0.13, 51.5);
  medalla(nx - 16, ny - 18, '2', tramo(t, segunda - 0.1, segunda + 0.4), '#c8c8d0');
  medalla(lx + 16, ly - 18, '1', tramo(t, londres - 0.1, londres + 0.4), '#e8b830');
};
const efectos = [[1.0, 'tic'], [2.2, 'boom'], [y1898, 'boom'], [y1898 + 0.3, 'publico'], [d(0.33), 'golpecito'], [d(0.47), 'golpecito'], [merge, 'brillo'], [segunda, 'pop'], [londres, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1898', efectos, año: 1898 });
''')
