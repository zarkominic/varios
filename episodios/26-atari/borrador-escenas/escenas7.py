E = {}

# lo común de las tres escenas (cada escena es su propia página): reparto del 26, piezas, ruido, trama, mezcla, capas fijas
COMUN = r'''
import { ELENCO_AT } from '/atomo/plato/kits/pixel-chibi.js';
const A = ELENCO_AT, PZ = T.PIEZAS_AT, K = hex('#24222c'), BL = hex('#ffffff');
const pl = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));   // paleta de cadenas → colores
const H = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// capa fija en un búfer: entera (copia) o encima (solo los píxeles pintados)
const cache = {};
const capa = (clave, pinta, encima = false) => { if (!cache[clave]) { const b = R.nuevo(), prev = R.usar(b); pinta(); R.usar(prev); cache[clave] = b; }
  if (!encima) { R.copiar(cache[clave]); return; } const B = R.buf, b = cache[clave]; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i]; };
// destello de cuatro puntas (u 0–1: crece y se apaga)
const destello = (x, y, u, c = hex('#fff6b0')) => { if (u <= 0 || u >= 1) return; const l = Math.round(2 + Math.sin(u * Math.PI) * 7), m = Math.floor(l / 2);
  for (let i = -l; i <= l; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } for (let i = -m; i <= m; i++) { R.pset(x + i, y + i, BL); R.pset(x + i, y - i, BL); } R.disco(x, y, 1, BL); };
// nube de tres tonos (sombra, cuerpo, luz) de ancho w; ok(x, y) dice dónde se puede pintar (el cielo)
const nube = (x0, y0, w, [S, Cc, L], ok = () => true) => {
  const bs = [[0.2, 0.62, 0.2], [0.42, 0.4, 0.27], [0.66, 0.5, 0.24], [0.85, 0.66, 0.15]].map(([a, b, r]) => [a * w, b * w * 0.4, r * w]), h = Math.round(w * 0.36);
  for (let j = 0; j <= h; j++) for (let i = 0; i <= w; i++) {
    let dm = 9, dy = 0; for (const [cx, cy, r] of bs) { const d = Math.hypot(i - cx, (j - cy) * 1.7) / r; if (d < dm) { dm = d; dy = (j - cy) / r; } }
    if (dm > 1) continue; const x = Math.round(x0 + i), y = Math.round(y0 + j); if (x < 0 || x > 319 || !ok(x, y)) continue;
    R.pset(x, y, j > h * 0.66 - (bay(x, y) > 0.5 ? 1 : 0) ? S : dy < -0.45 && dm > 0.55 ? L : dm > 0.86 && bay(x, y) < 0.45 ? L : Cc); } };
// cielo tramado en cuatro tonos, de y 0 a y1 (las bandas se funden con la trama de Bayer)
const cieloTramado = (y1, cs) => { for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) { const u = y / y1 * (cs.length - 1.001), k = Math.floor(u), f = u - k;
  R.pset(x, y, f > bay(x, y) ? cs[k + 1] : cs[k]); } };
// un cuervo pequeño que aletea
const cuervo = (x, y, t) => { const a = Math.sin(t * 9 + x) > 0; R.pset(x, y, K); R.pset(x + 1, y, K); R.pset(x - 1, y + (a ? -1 : 1), K); R.pset(x + 2, y + (a ? -1 : 1), K); R.pset(x - 2, y + (a ? -2 : 1), K); R.pset(x + 3, y + (a ? -2 : 1), K); };
const papel = (x, y) => { R.rect(x, y, x + 8, y + 10, K); R.rect(x + 1, y + 1, x + 7, y + 9, hex('#f6f0dc')); for (const j of [3, 5, 7]) R.rect(x + 2, y + j, x + 6, y + j, hex('#a8a090')); R.pset(x + 6, y + 8, hex('#c8303a')); R.pset(x + 5, y + 8, hex('#c8303a')); };
// la cámara de televisión al hombro (mira hacia dir) con su piloto rojo
const camaraTV = (x, y, dir, t) => { const x0 = dir > 0 ? x - 4 : x - 8; R.rect(x0, y - 4, x0 + 12, y + 2, K); R.rect(x0 + 1, y - 3, x0 + 11, y + 1, hex('#4a4a56')); R.rect(x0 + 1, y - 3, x0 + 11, y - 3, hex('#7a7a88'));
  const lx = dir > 0 ? x0 + 13 : x0 - 3; R.rect(lx, y - 3, lx + 2, y + 1, K); R.pset(lx + 1, y - 1, hex('#6a9ad8')); R.rect(x0 + 3, y - 6, x0 + 8, y - 5, K); if (Math.sin(t * 6) > 0) R.pset(dir > 0 ? x0 + 2 : x0 + 10, y - 2, hex('#e83a3a')); };
'''

E['at-nintendo'] = ('Nintendo', '''// AT-NINTENDO (frase 19), 1985, cartela «1985». Cuatro planos:
// 1. (ny85) la calle nevada de Nueva York: el dependiente sale de la juguetería con la campanilla y saluda; la familia
//    llega por la acera, el niño corre delante y salta junto al escaparate en «feet»; los taxis pasan por delante;
// 2. (mapa) un barco cruza el Pacífico hasta la costa en «arrived», la consola gris viaja por la ruta roja y en
//    «United States» cae la chincheta de Nueva York; destello en «Nintendo's»;
// 3. (ny85 escaparate) la familia ante el cristal: en «approved» salen los vistos verdes en las cajas, en «seal» el
//    sello dorado echa rayos y el niño salta; el padre señala el sello en «quality» y habla con la madre;
// 4. (juntas/gráfica) una gráfica propia: 83 alta, 84–85 hundidas con el montón de cartuchos del «chaos»; en «came
//    back» crecen 86–89, cada barra con su sello, y en «bigger than ever» la última pasa la raya del pico de 1983
//    (destello y «!»); el puntero láser las sigue; la barra del año va de 1985 a 1989.''', COMUN + r'''
const a = (f) => en('nintendo', f);
const P2 = a(0.2245), P3 = a(0.4395), P4 = a(0.7902);
const pies = a(0.096), llega = a(0.285), estados = a(0.347), nint = a(0.391);
const aprob = a(0.512), sello = a(0.6385), calidad = a(0.664), resp = a(0.714);
const vuelven = a(0.8636), vino = a(0.9104), mayor = a(0.9424);
const NY = { encuadre: 'ny85' }, NYE = { encuadre: 'ny85', camara: 'escaparate' };
// la bolsa de papel de la madre, colgada de la mano
const bolsa = ([x, y]) => { R.rect(x - 4, y - 1, x + 3, y + 8, K); R.rect(x - 3, y, x + 2, y + 7, hex('#b8925a')); R.rect(x - 3, y, x + 2, y + 1, hex('#d8b47a')); R.pset(x - 2, y - 2, K); R.pset(x + 1, y - 2, K); R.rect(x - 2, y + 3, x + 1, y + 5, hex('#c8303a')); };
// 1 · la calle
const p1 = (t) => {
  T.mundo(R, t, NY);
  const s = tramo(t, 1.5, 2.2);
  R.actor(A.dependiente, Math.round(lerp(214, 232, s)), Math.round(lerp(140, 150, s)), t, { dir: -1, anda: s > 0 && s < 1, sonrisa: true, habla: t > 2.4 && t < 3.4 && Math.sin(t * 9) > 0, dedo: t > 3.4 });
  const m = tramo(t, 0.7, P2 - 1.2), xm = Math.round(lerp(-50, 100, m)), xp = Math.round(lerp(-30, 122, m));
  const rm = R.actor(A.madre85, xm, 151, t, { dir: 1, anda: m > 0 && m < 1, sostiene: true, sonrisa: m >= 1 }); bolsa(rm.mano);
  R.actor(A.padre85, xp, 150, t, { dir: 1, anda: m > 0 && m < 1, habla: m >= 1 && Math.sin(t * 8) > 0 });
  const k = tramo(t, 0.4, pies - 0.15), xn = Math.round(lerp(-14, 154, k));
  const sj = t > pies - 0.1 && t < pies + 0.4 ? Math.round(Math.sin((t - pies + 0.1) / 0.5 * Math.PI) * 5) : 0;
  R.actor(A.nino85, xn, 149, t, { dir: 1, anda: k > 0 && k < 1, salto: sj, sorpresa: k >= 1 && t < pies + 0.4, sonrisa: t > pies + 0.4, dedo: t > pies + 0.4 });
  T.mundoDelante(R, t, NY);
};
// 2 · el mapa: del Pacífico a Nueva York
const p2 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const [sx, sy] = P([-122.4, 37.8]).map(Math.round), [nx, ny] = P([-74.0, 40.7]).map(Math.round);
  const b = tramo(t, P2, llega), bx = Math.round(lerp(4, sx - 10, b)), by = sy + 10 + Math.round(Math.sin(t * 4));
  if (b < 1) for (let i = 1; i < 7; i++) { R.pset(bx - 4 - i * 3, by + 1 + (i % 2), hex('#e8f0f6')); R.pset(bx - 5 - i * 3, by + 2, hex('#c8d8e8')); }
  if (t < llega + 0.5) { R.icono('barco', bx - 7, by - 13, hex('#f2eee2'), K, 2); R.rect(bx - 2, by - 9, bx + 3, by - 6, hex('#9a9aa6')); R.rect(bx - 2, by - 9, bx + 3, by - 9, hex('#c8c8d2')); }
  const fin = [nx - 22, ny - 6];
  const pts = [[sx + 2, sy + 4], [Math.round(lerp(sx, fin[0], 0.35)), Math.round(lerp(sy, fin[1], 0.35)) - 16], [Math.round(lerp(sx, fin[0], 0.7)), Math.round(lerp(sy, fin[1], 0.7)) - 12], fin];
  const v = tramo(t, llega + 0.1, estados - 0.1);
  if (v > 0) R.ruta(pts, v, hex('#c8303a'), { grueso: 1, flecha: false });
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let q = tot * v, i = 0; while (i < L.length - 1 && q > L[i]) { q -= L[i]; i++; }
  const f = Math.min(1, q / L[i]), cx = Math.round(lerp(pts[i][0], pts[i + 1][0], f)), cy = Math.round(lerp(pts[i][1], pts[i + 1][1], f));
  if (t > llega - 0.1) { const salta = v > 0 && v < 1 ? Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0; R.rect(cx - 15, cy + 5, cx + 15, cy + 6, hex('#8a7a5a')); PZ.consolaGris(R, cx, cy + 4 - salta, {}); }
  if (t > estados - 0.3) T.chincheta(R, nx + 4, ny + 2, t, hex('#c8303a'), { baja: tramo(t, estados - 0.3, estados), pulso: t > estados + 0.4 });
  destello(fin[0] + 12, fin[1] - 12, tramo(t, nint, nint + 0.7));
};
// 3 · el escaparate
const p3 = (t) => {
  T.mundo(R, t, NYE);
  [[57, 84], [46, 124], [80, 124]].forEach(([x, y], i) => { const t0 = aprob + i * 0.22; if (t > t0) T.visto(R, x - 8, y - 8 - Math.round((1 - tramo(t, t0, t0 + 0.2)) * 5), 2); });
  const b = tramo(t, sello - 0.05, sello + 1.1);
  if (b > 0 && b < 1) { R.recorte([26, 34, 294, 146]); for (let k = 0; k < 12; k++) { const g = k / 12 * 6.283 + t * 0.7, r0 = 24 + b * 6, r1 = r0 + 5 + Math.sin(b * Math.PI) * 12;
    R.linea(Math.round(246 + Math.cos(g) * r0), Math.round(72 + Math.sin(g) * r0), Math.round(246 + Math.cos(g) * r1), Math.round(72 + Math.sin(g) * r1), k % 2 ? hex('#fff0a0') : hex('#e8b830')); } R.recorte(null); }
  destello(264, 52, tramo(t, sello, sello + 0.6)); destello(230, 92, tramo(t, sello + 0.3, sello + 0.9));
  const rm = R.actor(A.madre85, 94, 178, t, { dir: 1, sonrisa: t > sello, habla: t > resp && t < resp + 1.2 && Math.sin(t * 8) > 0, sostiene: true }); bolsa(rm.mano);
  const sj = t > sello && t < sello + 0.5 ? Math.round(Math.sin((t - sello) / 0.5 * Math.PI) * 6) : 0;
  R.actor(A.nino85, 146, 177, t, { dir: 1, salto: sj, sorpresa: t > sello && t < sello + 1.4, brazos: t > sello && t < sello + 0.7, sonrisa: t > sello + 1.4, dedo: t > aprob && t < sello });
  const w = tramo(t, P3 + 0.3, P3 + 1.7), xp = Math.round(lerp(336, 204, w));
  R.actor(A.padre85, xp, 178, t, { dir: t > calidad ? 1 : -1, anda: w > 0 && w < 1, dedo: t > calidad && t < resp + 0.3, habla: t > resp + 0.3 && Math.sin(t * 7) > 0, sonrisa: t > calidad });
  T.mundoDelante(R, t, NYE);
};
// 4 · la gráfica que vuelve a subir (sobre la pantalla de la sala de juntas)
const BAR = [[83, 80, '#4a78c8', '#7aa8e8'], [84, 22, '#c8484a', '#e8787a'], [85, 3, '#c8484a', '#e8787a'], [86, 11, '#3aa85a', '#7ad88a'], [87, 28, '#3aa85a', '#7ad88a'], [88, 58, '#3aa85a', '#7ad88a'], [89, 88, '#3aa85a', '#7ad88a']];
const CRECE = [[-9, -8], [-9, -8], [-9, -8], [vuelven, vuelven + 0.4], [vuelven + 0.35, vuelven + 0.8], [vino - 0.1, vino + 0.35], [vino + 0.25, mayor + 0.55]];
const BASE = 124, X0 = 64, DX = 27, PICO = BASE - 80;
const p4 = (t) => {
  T.atari(R, t, { encuadre: 'juntas', camara: 'grafica', grafica: 0 });
  capa('panel', () => {
    for (let y = 30; y <= 138; y++) for (let x = 36; x <= 256; x++) { const d = Math.hypot((x - 150) / 92, (y - 82) / 44); let c = d < 0.8 && bay(x, y) < 0.9 - d ? hex('#f6f2e6') : hex('#ece6d6'); if (H(x, y, 3) < 0.04) c = hex('#e2dccb'); R.pset(x, y, c); }
    for (let y = BASE - 20; y > 32; y -= 20) for (let x = 52; x < 252; x += 3) R.pset(x, y, hex('#d2cab4'));
    R.rect(50, 34, 51, BASE, K); R.rect(50, BASE, 252, BASE + 1, K);
    for (let i = 0; i < 4; i++) R.rect(46, BASE - i * 20 - 20, 49, BASE - i * 20 - 20, K);
    BAR.forEach(([an], i) => R.numero(String(an), X0 + i * DX, 136, { centro: true, color: hex('#3a3a46'), sombra: false }));
  }, true);
  // la raya punteada del pico de 1983
  const cruza = mayor + 0.3, flash = t > cruza && t < cruza + 0.8 && Math.floor(t * 8) % 2;
  for (let x = 52; x < 252; x += 6) R.rect(x, PICO, x + 3, PICO, flash ? hex('#e8b830') : hex('#c8484a'));
  let lx = 120, ly = 110;
  BAR.forEach(([an, h, c1, c2], i) => { const [t0, t1] = CRECE[i], u = tramo(t, t0, t1), hh = Math.round(h * (1 - (1 - u) ** 2)); if (hh <= 0) return;
    const x = X0 + i * DX - 8, y = BASE - hh; R.rect(x, y, x + 16, BASE - 1, K); R.rect(x + 1, y + 1, x + 15, BASE - 1, hex(c1)); R.rect(x + 1, y + 1, x + 3, BASE - 1, hex(c2)); R.rect(x + 13, y + 1, x + 15, BASE - 1, mez(hex(c1), K, 0.3));
    if (i >= 3) { PZ.selloCalidad(R, x + 8, y - 1, { t }); if (u > 0 && u < 1) { lx = x + 8; ly = y - 20; } } });
  // el «caos»: el montón de cartuchos malos junto a las barras hundidas
  const CAOS = [[94, 'rojo', 'foso'], [104, 'gris', 'flor'], [114, 'morado', 'nave'], [100, 'verde', 'foso'], [110, 'naranja', 'flor']];
  CAOS.forEach(([x, col, ic], i) => { const cae = tramo(t, P4 + 0.1 + i * 0.12, P4 + 0.45 + i * 0.12), y = Math.round(lerp(40, i < 3 ? BASE : BASE - 12, cae ** 2)); if (cae > 0) PZ.cartucho(R, x + Math.round(Math.sin(t * 3 + i) * (cae < 1 ? 2 : 0)), y, { color: col, icono: ic }); });
  if (t < vuelven) { lx = 104 + Math.round(Math.sin(t * 5) * 12); ly = 104 + Math.round(Math.cos(t * 7) * 6); } else if (t > mayor + 0.55) { lx = X0 + 6 * DX; ly = BASE - 96 + Math.round(Math.sin(t * 6) * 2); }
  if (t > cruza) { destello(X0 + 6 * DX + 14, PICO - 4, tramo(t, cruza, cruza + 0.7)); if (t > cruza + 0.2) R.icono('!', X0 + 6 * DX + 16, PICO - 18, hex('#c8303a'), K, 2); }
  // el puntero láser
  for (let g = 0; g < 6.28; g += 0.4) R.pset(Math.round(lx + Math.cos(g + t * 4) * 5), Math.round(ly + Math.sin(g + t * 4) * 5), hex('#ff9a9a'));
  R.disco(lx, ly, 3, hex('#ff6a6a')); R.disco(lx, ly, 2, hex('#ff2a2a')); R.pset(lx - 1, ly - 1, BL);
};
const año = (t) => t < vuelven ? 1985 : Math.min(1989, 1985 + Math.floor(tramo(t, vuelven, mayor + 0.55) * 4.99));
const efectos = [[1.55, 'campana'], [P2 + 0.25, 'ola'], [estados, 'pop'], [aprob, 'sello'], [sello, 'brillo'], [P4 + 0.5, 'golpecito'], [mayor + 0.3, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1985', efectos, año });
''')

E['at-excavacion'] = ('La excavación', '''// AT-EXCAVACION (frase 20), 2014, cartela «2014», golpe en «excavacion». Cuatro planos:
// 1. (excavacion14) el vertedero en 2014: la excavadora cava; el productor llega desde las carpas, el concejal le da
//    el permiso en «permission» y él lo alza contento; un cámara lo graba;
// 2. (inserto local: la mesa de producción) la mano estampa el sello de la ciudad en el permiso en «Alamogordo»; la
//    claqueta se cierra de golpe en «documentary»; en «April 26, 2014» se iluminan sus cifras 4/26 y 2014;
// 3. (fondo local: el camino al vertedero) cientos de fans con camisetas de colores van andando hacia la excavación;
//    coches aparcados, la furgoneta de la tele; en «T-shirts» uno salta y alza su caja de cartucho;
// 4. (carpa) los fans tras la mesa miran la excavadora por la abertura («lift»: uno señala, flash de un móvil); en
//    «Among them» entra Howard Scott Warshaw, saluda en «Warshaw» y los fans se vuelven hacia él.''', COMUN + r'''
const a = (f) => en('excavacion', f);
const P2 = a(0.1846), P3 = a(0.5322), P4 = a(0.7865);
const prod = a(0.0591), permiso = a(0.1224), alamo = a(0.2163), docu = a(0.3471), abril = a(0.4204), dia = a(0.4331), anio = a(0.4837);
const gente = a(0.5597), camis = a(0.6778), mirar = a(0.7369), decadas = a(0.8245), entre = a(0.9073), howard = a(0.9336), warshaw = a(0.96);
const EX = { encuadre: 'excavacion14' }, CA = { encuadre: 'carpa' };
// 1 · el permiso junto a la valla
const p1 = (t) => {
  T.desierto(R, t, EX);
  const v = tramo(t, 1.0, prod + 0.6), xp = Math.round(lerp(78, 134, v)), da = t >= permiso, lev = tramo(t, permiso + 0.25, permiso + 0.7);
  const rc = R.actor(A.ejecutivoAtari2, 158, 160, t, { dir: -1, sostiene: da ? undefined : [150, 139], sonrisa: da, habla: !da && t > prod + 0.6 && Math.sin(t * 8) > 0, pal: pl({ C: '#dce8f4', c: '#b0c4d8', o: '#3a4a7a' }) });
  if (!da) papel(rc.mano[0] - 6, rc.mano[1] - 8);
  const rp = R.actor(A.espectador, xp, 160, t, { dir: 1, anda: v > 0 && v < 1, sostiene: da ? [xp + 17, Math.round(lerp(139, 126, lev))] : undefined, sonrisa: da, pal: pl({ C: '#2a2a34', c: '#1c1c24' }) });
  if (da) papel(rp.mano[0] - 3, rp.mano[1] - 9);
  if (da && t > permiso + 0.7) R.actor(A.ejecutivoAtari2, 158, 160, t, { dir: -1, dedo: true, sonrisa: true, pal: pl({ C: '#dce8f4', c: '#b0c4d8', o: '#3a4a7a' }) });
  const gira = t > permiso - 0.6, rt = R.actor(EL.tecnico, 190, 160, t, { dir: gira ? -1 : 1, sostiene: gira ? [178, 142] : [204, 142] });
  camaraTV(rt.mano[0], rt.mano[1] - 1, gira ? -1 : 1, t);
  T.desiertoDelante(R, t, EX);
};
// 2 · inserto: la mesa de producción con el permiso y la claqueta
const CLA = { x0: 166, x1: 304, y0: 80, y1: 164 };
const pintaMesa = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // el fondo desenfocado: cielo, sierra, la excavación y gente en manchas
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const u = y / 60; let c = u < 0.35 ? (u * 3 > bay(x, y) ? hex('#8ab8e8') : hex('#6a9ad8')) : u < 0.62 ? hex('#8ab8e8') : u < 0.68 ? (bay(x, y) < 0.5 ? hex('#a8a0c8') : hex('#8ab8e8')) : hex('#a8a0c8');
    const sie = 38 + Math.sin(x * 0.035) * 5 + Math.sin(x * 0.09 + 2) * 2; if (y > sie) c = y > sie + 4 ? hex('#9a8aa8') : hex('#b0a4c4'); if (y > 50 + Math.sin(x * 0.05) * 2) c = bay(x, y) < 0.5 ? hex('#d8b88a') : hex('#c8a87a'); pset(x, y, c); }
  // bokeh: discos de luz sueltos
  for (let k = 0; k < 14; k++) { const x = Math.floor(H(k, 1, 5) * 300) + 10, y = Math.floor(H(k, 2, 5) * 40) + 12; if (x > 262 && y < 48) continue; for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 9 && bay(x + i, y + j) < 0.45) pset(x + i, y + j, hex('#e8eef8')); }
  // desenfocado: las carpas blancas, la excavadora amarilla y la torre de focos
  const mancha = (x0, y0, x1, y1, c, c2) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x), by = Math.min(y - y0, y1 - y); if (bx + by < 2 && bay(x, y) < 0.6) continue; pset(x, y, by < 2 && bay(x, y) < 0.5 ? c2 : c); } };
  mancha(14, 42, 46, 54, hex('#e8e6e0'), hex('#f8f8f4')); mancha(52, 44, 80, 54, hex('#dedad2'), hex('#f2f0ea'));
  mancha(214, 36, 244, 52, hex('#d8a830'), hex('#f0c848')); mancha(236, 26, 246, 40, hex('#c89a28'), hex('#e8b838')); mancha(212, 50, 250, 56, hex('#4a4a52'), hex('#6a6a72'));
  mancha(286, 28, 290, 54, hex('#7a7a86'), hex('#9a9aa6'));
  for (let k = 0; k < 34; k++) { const x = 4 + k * 9 + Math.floor(H(k, 1, 6) * 6), yy = 49 + Math.floor(H(k, 2, 6) * 3); if (x > 206 && x < 254) continue; mancha(x, yy, x + 3 + (k % 2), 56, hex(['#c8303a', '#3a72cc', '#e8b830', '#3a8a5a', '#7a4ab8', '#e86a2a'][k % 6]), hex('#e8b898')); }
  // la mesa de tablas, en perspectiva
  const tablas = [58, 66, 76, 88, 102, 118, 136, 156, 180];
  for (let k = 0; k < tablas.length - 1; k++) { const y0 = tablas[k], y1 = tablas[k + 1] - 1; for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const tono = H(k, 9, 1), veta = Math.sin(x * 0.06 + k * 3 + Math.sin(x * 0.013 + k) * 3 + (y - y0) * 0.9); let c = tono < 0.33 ? hex('#a87848') : tono < 0.66 ? hex('#b8865a') : hex('#9a6a3e');
    if (veta > 0.82) c = mez(c, hex('#6a4426'), 0.45); if (y === y0) c = mez(c, hex('#e8c08a'), 0.5); if (y === y1) c = hex('#4a2e18'); if (H(x, y, 4) < 0.025) c = hex('#d8c8a0'); pset(x, y, c); }
    for (const x of [6, 313]) { disco(x, Math.round((y0 + y1) / 2), 1, hex('#5a5a66')); pset(x - 1, Math.round((y0 + y1) / 2) - 1, hex('#c8c8d2')); } }
  for (const [x, y] of [[60, 120], [236, 70], [150, 160]]) for (let g = 0; g < 6.28; g += 0.05) { const r = 7 + (x % 3); if (H(g * 10, x, 2) < 0.7) pset(Math.round(x + Math.cos(g) * r), Math.round(y + Math.sin(g) * r * 0.5), hex('#7a5232')); }
  rect(0, 56, 319, 57, hex('#5a3a20')); rect(0, 58, 319, 58, hex('#d8a870'));
  // el plano del vertedero (azul) debajo del permiso
  poligono([[14, 74], [128, 68], [136, 150], [20, 156]], hex('#2a4a7a')); poligono([[15, 75], [127, 69], [135, 149], [21, 155]], hex('#4a78b8'));
  for (let y = 74; y < 155; y += 8) linea(16, y + 1, 134, y - 5, hex('#6a98d0')); for (let x = 22; x < 132; x += 10) linea(x, 72, x + 6, 154, hex('#6a98d0'));
  // el permiso, crema, con sus renglones, la firma y el hueco del sello
  poligono([[34, 86], [118, 82], [122, 160], [38, 164]], hex('#5a5048')); poligono([[35, 87], [117, 83], [121, 159], [39, 163]], hex('#f4ecd4'));
  linea(118, 83, 122, 159, hex('#d8ccae')); linea(39, 163, 121, 159, hex('#c8bca0'));
  rect(48, 92, 106, 95, hex('#5a5a66')); for (let k = 0; k < 7; k++) { const y = 101 + k * 6, w = k === 6 ? 30 : 58 - (k * 13 % 17); rect(46, y, 46 + w, y + 1, hex('#a8a090')); }
  for (let x = 48; x < 80; x++) pset(x, 152 + Math.round(Math.sin(x * 0.6) * 2), hex('#2a3a7a'));
  for (let g = 0; g < 6.28; g += 0.15) pset(Math.round(100 + Math.cos(g) * 9), Math.round(146 + Math.sin(g) * 9), hex('#c8bca0'));
  // la piedra que sujeta la esquina
  disco(40, 158, 6, hex('#6a6058')); disco(39, 157, 5, hex('#8a8078')); disco(37, 155, 2, hex('#a89e94'));
  // la taza de café, las gafas de sol, el walkie y la tiza
  rect(140, 62, 156, 80, K); rect(141, 63, 155, 79, hex('#e8e4dc')); rect(141, 63, 155, 65, hex('#5a3a24')); rect(156, 67, 159, 75, K); rect(141, 70, 155, 72, hex('#c8303a')); rect(152, 66, 154, 78, hex('#c8c4bc'));
  rect(132, 148, 160, 152, K); disco(138, 152, 4, K); disco(154, 152, 4, K); disco(138, 152, 3, hex('#3a3a48')); disco(154, 152, 3, hex('#3a3a48')); pset(137, 151, hex('#8a8aa8')); pset(153, 151, hex('#8a8aa8'));
  rect(134, 100, 150, 134, K); rect(135, 101, 149, 133, hex('#3a3a42')); rect(137, 104, 147, 114, hex('#5a6a5a')); for (let y = 118; y < 132; y += 3) rect(137, y, 147, y, hex('#24242a')); rect(146, 84, 147, 100, K); rect(136, 135, 148, 136, hex('#1c1c22'));
  rect(150, 166, 162, 168, hex('#f2eee2')); rect(150, 169, 162, 169, hex('#c8c4b8'));
  // la claqueta: la pizarra negra con sus rayas de tiza
  rect(CLA.x0, CLA.y0, CLA.x1, CLA.y1, K); rect(CLA.x0 + 2, CLA.y0 + 2, CLA.x1 - 2, CLA.y1 - 2, hex('#2c2c34'));
  for (let i = 0; i < 160; i++) pset(CLA.x0 + 3 + Math.floor(H(i, 1, 7) * 134), CLA.y0 + 3 + Math.floor(H(i, 2, 7) * 78), hex('#3a3a44'));
  rect(CLA.x0 + 3, 106, CLA.x1 - 3, 106, hex('#d8d8d0')); rect(CLA.x0 + 3, 134, CLA.x1 - 3, 134, hex('#d8d8d0')); rect(236, CLA.y0 + 3, 236, 105, hex('#d8d8d0'));
  rect(CLA.x0 + 3, CLA.y1 + 1, CLA.x1 - 1, CLA.y1 + 2, hex('#4a2e18'));
};
const clapper = (ang) => {   // el palo de rayas, girado ang radianes alrededor de la bisagra (CLA.x0+2, CLA.y0)
  const hx = CLA.x0 + 2, hy = CLA.y0 - 1, Lg = CLA.x1 - CLA.x0, W = 12, ca = Math.cos(ang), sa = Math.sin(ang);
  for (let y = hy - 70; y <= hy + 2; y++) for (let x = hx - 2; x <= hx + Lg + 2; x++) { const dx = x - hx, dy = y - hy, u = dx * ca - dy * sa, v = -(dx * sa + dy * ca);
    if (u < 0 || u > Lg || v < 0 || v > W) continue; const borde = u < 1 || u > Lg - 1 || v < 1 || v > W - 1; R.pset(x, y, borde ? K : Math.floor((u + v * 0.9) / 9) % 2 ? hex('#f2eee2') : K); }
  R.disco(hx + 2, hy, 3, hex('#8a8a96')); R.disco(hx + 2, hy, 1, K);
  return [Math.round(hx + Lg * ca - 6), Math.round(hy - Lg * sa)];
};
const p2 = (t) => {
  capa('mesa', pintaMesa);
  // el vapor de la taza y el piloto del walkie
  for (let i = 0; i < 4; i++) { const f = (t * 0.6 + i / 4) % 1, x = 148 + Math.round(Math.sin(t * 2 + i * 2) * 3 * f), y = Math.round(60 - f * 30); if (y > 2) R.pset(x, y, f < 0.5 ? hex('#f2f2f2') : hex('#c8d4e4')); }
  if (Math.sin(t * 5) > 0) R.pset(144, 103, hex('#e83a3a')); else R.pset(144, 103, hex('#5aa86a'));
  // la esquina del permiso que el viento levanta
  const ond = Math.round(Math.sin(t * 3.4) * 1.5 + 1.5); R.poligono([[110, 158], [121, 159], [121 - ond, 152 - ond]], hex('#e8dcc0'));
  // el sello: la mano lo baja de golpe en «Alamogordo», lo levanta y se va
  const baja = tramo(t, alamo - 0.35, alamo), sube = tramo(t, alamo + 0.25, alamo + 0.9), fuera = tramo(t, alamo + 0.9, alamo + 1.6);
  if (t > alamo) { R.disco(100, 146, 8, hex('#c8303a')); R.disco(100, 146, 6, hex('#f4ecd4')); R.disco(100, 146, 4, hex('#c8303a')); R.icono('estrella' in R.ICONOS ? 'estrella' : '!', 98, 143, hex('#f4ecd4'), hex('#c8303a')); }
  if (fuera < 1) { const dy = Math.round((1 - baja) * -16 + sube * -14 + fuera * 60), dx = Math.round(fuera * -40), sx = 100 + dx, sy = 146 + dy;
    R.disco(sx + 4, Math.min(170, 150 + Math.round(-dy * 0.2)), 6, mez(hex('#a87848'), K, 0.35));
    R.rect(sx - 8, sy - 4, sx + 8, sy + 2, K); R.rect(sx - 7, sy - 3, sx + 7, sy + 1, hex('#8a5a2e')); R.rect(sx - 7, sy + 1, sx + 7, sy + 2, hex('#c8303a'));
    R.rect(sx - 2, sy - 14, sx + 2, sy - 4, K); R.rect(sx - 1, sy - 13, sx + 1, sy - 4, hex('#b8834a')); R.disco(sx, sy - 16, 4, K); R.disco(sx, sy - 16, 3, hex('#b8834a')); R.pset(sx - 1, sy - 18, hex('#e8c08a'));
    T.brazo(R, sx + 10, 204, sx - 6, sy - 15, '#dce8f4', 1); }
  // la claqueta: abierta, se cierra de golpe en «documentary»; la mano la sujeta por la punta
  const cierra = tramo(t, docu - 0.18, docu), abre = tramo(t, P2 + 0.3, P2 + 1.0), ang = t < docu - 0.18 ? 0.34 * abre : 0.34 * (1 - cierra) + (t > docu && t < docu + 0.15 ? -0.02 : 0);
  const [px, py] = clapper(ang);
  if (t < docu + 1.2) T.brazo(R, 346, py + 30, px + 6, py + 2, '#8a8a9a', -1);
  // las cifras de tiza: 1 (escena) y 3 (toma) arriba; 4/26 y 2014, que se iluminan cuando la voz las dice
  R.numero('1', 200, 101, { color: hex('#e8e8e0'), sombra: false }); R.numero('3', 270, 101, { color: hex('#e8e8e0'), sombra: false });
  const luz = (t0) => t > t0 && t < t0 + 0.9 ? hex('#ffe070') : hex('#e8e8e0');
  R.numero('4', 186, 128, { tam: 16, color: luz(abril), contorno: false, sombra: false }); R.numero('/', 206, 128, { tam: 16, color: hex('#c8c8c0'), contorno: false, sombra: false }); R.numero('26', 226, 128, { tam: 16, color: luz(dia), contorno: false, sombra: false });
  R.numero('2014', 188, 157, { tam: 16, color: luz(anio), contorno: false, sombra: false });
};
// 3 · fondo local: el camino al vertedero, lleno de fans con camisetas de videojuegos
const sierra = (x) => Math.round(46 + Math.sin(x * 0.031) * 6 + Math.sin(x * 0.083 + 1.3) * 3 + Math.sin(x * 0.21) * 1);
const cerro = (x) => Math.round(60 + Math.sin(x * 0.02 + 2) * 3 + Math.sin(x * 0.11) * 1.5);
const pintaCamino = () => {
  const { rect, pset, linea, disco, poligono } = R;
  cieloTramado(64, [hex('#3a72cc'), hex('#5a92dc'), hex('#82b4ea'), hex('#b8d8f2'), hex('#e0eef6')]);
  disco(36, 30, 8, hex('#fff4c8')); disco(36, 30, 6, hex('#fffbe8'));
  for (let x = 0; x < 320; x++) { const s = sierra(x); for (let y = s; y < 70; y++) { const d = y - s; let c = d < 2 ? hex('#a8a4d0') : H(x >> 2, y >> 1, 2) < 0.3 ? hex('#7e7aac') : hex('#8a86b8'); if ((x + d * 2) % 23 < 2 && d > 2) c = hex('#706ca0'); pset(x, y, c); } }
  for (let x = 0; x < 320; x++) { const s = cerro(x); for (let y = s; y < 74; y++) pset(x, y, y - s < 1 ? hex('#c8a07a') : H(x, y, 3) < 0.25 ? hex('#a07a5a') : hex('#b08a6a')); }
  // la llanura de arena con piedras y matas, de lejos a cerca
  for (let y = 72; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y, 5), d = (y - 72) / 108; let c = n < 0.18 ? hex('#c8a26a') : n > 0.9 ? hex('#ecd0a0') : hex('#dcb880'); if (H(x >> 1, y >> 1, 6) < 0.04 * (1 + d)) c = hex('#b08858'); pset(x, y, c); }
  // la excavación a lo lejos (derecha): montones de tierra, carpas y la torre de focos
  for (let x = 236; x < 320; x++) { const m = Math.round(70 - Math.max(0, Math.sin((x - 236) * 0.07)) * 6 - Math.max(0, Math.sin((x - 250) * 0.12)) * 3); for (let y = m; y < 76; y++) pset(x, y, H(x, y, 7) < 0.4 ? hex('#8a6a4a') : hex('#a07e5a')); }
  for (const x of [244, 262]) { poligono([[x, 66], [x + 6, 61], [x + 12, 66]], hex('#f2eee2')); rect(x, 66, x + 12, 70, hex('#d8d4cc')); rect(x + 1, 67, x + 11, 70, hex('#c8c4bc')); }
  rect(306, 52, 307, 70, hex('#5a5a66')); rect(303, 50, 310, 52, hex('#d8d8e0'));
  // el camino de tierra que cruza y sube hacia la excavación
  for (let x = 0; x < 320; x++) { const yc = x < 220 ? 150 : Math.round(150 - (x - 220) * 0.7), w = x < 220 ? 22 : Math.max(4, 22 - (x - 220) * 0.18);
    for (let y = Math.round(yc - w); y <= Math.round(yc + w * 0.5); y++) if (y > 72 && y < 180) { let c = H(x, y, 8) < 0.2 ? hex('#c8a87e') : hex('#e2c69a'); if (Math.abs(y - (yc - w * 0.45)) < 1 || Math.abs(y - (yc + w * 0.1)) < 1) c = hex('#b8966a'); pset(x, y, c); } }
  // matas de gobernadora y piedras
  for (let k = 0; k < 46; k++) { const x = Math.floor(H(k, 1, 9) * 320), y = 76 + Math.floor(H(k, 2, 9) * 100); if (y > 124 && y < 156 && x < 230) continue; const s = 1 + Math.floor((y - 76) / 30);
    for (let i = 0; i < 6 * s; i++) pset(x + Math.round((H(k, i, 10) - 0.5) * 4 * s), y - Math.round(H(k, i, 11) * 3 * s), i % 3 ? hex('#5a7a3a') : hex('#3e5a2a')); pset(x, y + 1, hex('#a88050')); }
  // la fila de coches aparcados (2014) y la furgoneta de la tele con su antena
  const COCHES = [[8, '#c8303a'], [40, '#e8e8ee'], [72, '#3a5a8a'], [104, '#2a2a34'], [136, '#e8b830'], [168, '#5a8a5a']];
  for (const [x, c] of COCHES) { const y = 114; rect(x, y - 8, x + 28, y + 2, K); rect(x + 1, y - 7, x + 27, y + 1, hex(c)); rect(x + 6, y - 14, x + 22, y - 8, K); rect(x + 7, y - 13, x + 21, y - 8, mez(hex(c), BL, 0.15));
    rect(x + 8, y - 12, x + 13, y - 9, hex('#8ab8e0')); rect(x + 15, y - 12, x + 20, y - 9, hex('#8ab8e0')); pset(x + 9, y - 12, BL); rect(x + 1, y - 3, x + 27, y - 3, mez(hex(c), K, 0.3)); rect(x + 1, y - 7, x + 27, y - 7, mez(hex(c), BL, 0.4));
    for (const rx of [x + 6, x + 22]) { disco(rx, y + 2, 3, K); disco(rx, y + 2, 1, hex('#8a8a96')); } rect(x + 25, y - 6, x + 27, y - 5, hex('#f8e8a0')); rect(x, y + 3, x + 28, y + 4, hex('#c09a6a')); }
  const vx = 200, vy = 116; rect(vx, vy - 24, vx + 40, vy + 2, K); rect(vx + 1, vy - 23, vx + 39, vy + 1, hex('#f2eee2')); rect(vx + 1, vy - 23, vx + 39, vy - 22, BL); rect(vx + 30, vy - 18, vx + 39, vy - 10, hex('#8ab8e0'));
  rect(vx + 1, vy - 12, vx + 29, vy - 9, hex('#3a72cc')); rect(vx + 1, vy - 8, vx + 29, vy - 7, hex('#c8303a')); for (const rx of [vx + 8, vx + 32]) { disco(rx, vy + 2, 4, K); disco(rx, vy + 2, 2, hex('#8a8a96')); }
  rect(vx + 10, vy - 46, vx + 11, vy - 24, hex('#8a8a96')); linea(vx + 4, vy - 24, vx + 10, vy - 40, hex('#6a6a76')); disco(vx + 22, vy - 30, 5, hex('#d8d8e0')); disco(vx + 22, vy - 30, 3, hex('#b8b8c4')); rect(vx + 22, vy - 30, vx + 23, vy - 24, hex('#6a6a76'));
  // el aseo portátil azul y los conos
  rect(250, 92, 262, 116, K); rect(251, 93, 261, 115, hex('#3a6ac8')); rect(251, 93, 261, 95, hex('#5a8ae8')); rect(258, 103, 259, 106, hex('#c8c8d2'));
  for (const x of [40, 120, 200]) { poligono([[x, 174], [x + 3, 164], [x + 6, 174]], hex('#e8702a')); rect(x + 2, 168, x + 4, 169, BL); rect(x - 1, 174, x + 7, 175, hex('#c8501a')); }
};
// la gente pequeña del fondo (12 px) que sube por el camino hacia la excavación
const figura = (x, y, c, t, k) => { const p = Math.floor(t * 5 + k) % 2; R.rect(x, y - 9, x + 3, y - 4, hex(c)); R.rect(x + 1, y - 12, x + 2, y - 10, hex('#e8a878')); R.pset(x + 1, y - 13, K); R.pset(x + 2, y - 13, K); R.rect(x + (p ? 0 : 1), y - 3, x + (p ? 0 : 1), y, hex('#3a3a4a')); R.rect(x + (p ? 3 : 2), y - 3, x + (p ? 3 : 2), y, hex('#3a3a4a')); };
const PAL = (c, d, q) => pl({ C: c, c: d, Q: q });
const PALS = [{}, PAL('#c8303a', '#962428', '#f0c040'), PAL('#3a8a5a', '#2a6a44', '#f2eee2'), PAL('#7a4ab8', '#5a3490', '#7ad88a'), PAL('#e8b830', '#b88a20', '#c8303a'), PAL('#2a6ac8', '#1e4e9a', '#f0c040'), PAL('#e86a2a', '#b84a1a', '#f2eee2')];
// los fans: [quién, x de partida, suelo, velocidad, paleta]; tres filas que andan hacia la derecha, repartidas por el cuadro
const FANS = [[A.publico2014, 10, 138, 14, 0], [A.publico2014b, 70, 138, 13, 3], [A.espectadora, 128, 138, 15, 4], [A.publico2014, 182, 138, 13, 5],
  [A.publico2014b, -10, 154, 18, 1], [A.publico2014, 44, 154, 17, 2], [A.espectador, 100, 154, 19, 6], [A.publico2014b, 156, 154, 17, 5], [A.publico2014, 214, 154, 18, 4],
  [A.publico2014, 20, 172, 22, 6], [A.publico2014b, 80, 172, 21, 2], [A.publico2014, 140, 172, 23, 3], [A.espectadora, 196, 172, 22, 1]];
const p3 = (t) => {
  capa('camino', pintaCamino);
  for (const [x0, y, w, v, tn] of [[40, 8, 46, 2.0, 0], [180, 18, 34, 3.2, 1], [260, 30, 24, 4.6, 2], [100, 34, 30, 3.8, 1]]) {
    const x = ((x0 + (t - P3) * v) % 400 + 400) % 400 - 60, ton = [[hex('#c8d4e4'), hex('#f2f6fa'), BL], [hex('#b0c0d8'), hex('#e0eaf4'), hex('#f8fbfd')], [hex('#a8b8d0'), hex('#d4e0ee'), hex('#eef4fa')]][tn];
    nube(x, y, w, ton, (px, py) => py < sierra(px) && !(px > 276 && py < 46)); }
  for (let k = 0; k < 3; k++) cuervo(Math.round(((t - P3) * (12 + k * 3) + k * 90) % 360) - 20, 22 + k * 7 + Math.round(Math.sin(t * 1.3 + k) * 2), t + k);
  // el polvo que levanta la excavación al fondo
  for (let i = 0; i < 7; i++) { const f = (t * 0.3 + i / 7) % 1, x = 286 + Math.round(f * 18 + Math.sin(i) * 3), y = Math.round(66 - f * 20); R.disco(x, y, 1 + Math.round(f * 2), f < 0.5 ? hex('#d8c4a0') : hex('#e8dcc4')); }
  // la gente pequeña que ya sube por el camino del fondo, y la que va por detrás de los coches
  for (let k = 0; k < 12; k++) { const f = ((t - P3) * 0.06 + k / 12) % 1, x = Math.round(lerp(226, 300, f)), y = Math.round(lerp(150, 98, f)) - 4; figura(x, y, ['#c8303a', '#3a72cc', '#e8b830', '#3a8a5a', '#7a4ab8'][k % 5], t, k); }
  for (let k = 0; k < 14; k++) { const x = Math.round(((t - P3) * 9 + k * 17 + H(k, 1, 30) * 8) % 230) - 6; figura(x, 128 - (k % 2), ['#e86a2a', '#3a72cc', '#c8303a', '#e8b830', '#3a8a5a', '#f2eee2', '#7a4ab8'][k % 7], t, k); }
  // los fans, de atrás hacia delante; en «T-shirts» uno salta con los brazos arriba y otro alza su caja de cartucho
  FANS.forEach(([d, x0, suelo, vel, pi], i) => { const x = Math.round(((x0 + (t - P3) * vel) % 360 + 360) % 360) - 30; if (x < -18 || x > 322) return;
    const salta = i === 11 && t > camis - 0.1 && t < camis + 0.45, sj = salta ? Math.round(Math.sin((t - camis + 0.1) / 0.55 * Math.PI) * 6) : 0, alza = i === 6 && t > gente;
    const r = R.actor(d, x, suelo, t, { dir: 1, anda: !salta, salto: sj, brazos: salta, sonrisa: true, habla: (i === 1 || i === 8) && Math.sin(t * 8 + i) > 0, sostiene: alza ? [x + 15, suelo - 30] : undefined, pal: PALS[pi] });
    if (alza) PZ.cajaCartucho(R, r.mano[0], r.mano[1] + 2, { color: 'naranja', icono: 'foso' }); });
  // el polvillo de los pasos
  for (let k = 0; k < 14; k++) { const f = (t * 1.5 + k * 0.37) % 1, x = Math.round(((t - P3) * 20 + k * 29) % 330) - 10, y = [138, 154, 172][k % 3] - Math.round(f * 3); if (f < 0.6) R.pset(x, y, hex('#ecd8b0')); }
};
// 4 · la carpa: los fans, delante de la mesa, miran la excavadora; llega Warshaw
const p4 = (t) => {
  T.desierto(R, t, CA);
  // detrás de la mesa, la arqueóloga clasifica (asoma por encima del tablero)
  R.actor(A.arqueologa, 150, 160, t, { dir: 1, sostiene: [168, 146], habla: t > warshaw && Math.sin(t * 7) > 0 });
  T.desiertoDelante(R, t, CA);
  const e = tramo(t, entre - 0.5, howard + 0.1), xw = Math.round(lerp(-18, 112, e)), llego = e >= 1;
  R.actor(A.publico2014, 60, 178, t, { dir: llego ? -1 : 1, sonrisa: llego, sorpresa: t > mirar && t < mirar + 1, habla: !llego && Math.sin(t * 6) > 0.4 });
  const foto = t > decadas - 0.4 && t < decadas + 0.7, flash = t > decadas && t < decadas + 0.15;
  const rb = R.actor(A.publico2014b, 214, 178, t, { dir: -1, dedo: t > mirar && t < decadas - 0.4, sostiene: foto ? [200, 150] : t > warshaw + 0.5 ? [198, 156] : undefined, sonrisa: llego, pal: PALS[3] });
  if (foto) { R.rect(rb.mano[0] - 3, rb.mano[1] - 6, rb.mano[0] + 1, rb.mano[1], K); R.rect(rb.mano[0] - 2, rb.mano[1] - 5, rb.mano[0], rb.mano[1] - 1, hex('#5a7ab8')); if (flash) R.disco(rb.mano[0] - 1, rb.mano[1] - 4, 5, BL); }
  if (t > warshaw + 0.5) PZ.cartucho(R, rb.mano[0] - 1, rb.mano[1] + 5, { color: 'naranja', icono: 'foso' });
  R.actor(A.espectadora, 250, 178, t, { dir: -1, sonrisa: true, sorpresa: t > warshaw - 0.2 && t < warshaw + 0.6, habla: t > warshaw + 0.6 && Math.sin(t * 7) > 0, pal: PALS[2] });
  R.actor(A.publico2014, 284, 178, t, { dir: -1, dedo: t > mirar + 0.3 && t < decadas + 0.8, sonrisa: llego, pal: PALS[6] });
  const rt = R.actor(EL.tecnico, 172, 178, t, { dir: -1, sostiene: llego ? [158, 158] : [160, 156] }); camaraTV(rt.mano[0], rt.mano[1] - 1, -1, t);
  if (e > 0) R.actor(A.warshawHoy, xw, 178, t, { dir: 1, anda: e > 0 && e < 1, sonrisa: llego, dedo: t > warshaw && t < warshaw + 1.4 });
  if (t > warshaw && t < warshaw + 1.1) { R.icono('!', 64, 136, hex('#f0c040'), K, 2); R.icono('!', 254, 136, hex('#f0c040'), K, 2); }
};
const efectos = [[1.6, 'motor'], [permiso, 'papel'], [alamo, 'sello'], [docu, 'toc'], [anio, 'brillo'], [gente, 'publico'], [decadas, 'flash'], [warshaw + 0.2, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2014', efectos, año: 2014 });
''')

E['at-hallazgo'] = ('El hallazgo', '''// AT-HALLAZGO (frase 21). Cuatro planos:
// 1. (excavacion14/pala, gag 6) la cuchara sube de la fosa con periódicos y basura; encima, la caja del cartucho del
//    foso, que brilla en «Cartridge»; en «appeared» todo el público hace «¡oh!» (sorpresa, brazos y «!»);
// 2. (fondo local: el fondo de la fosa) la arqueóloga alza la caja en «true» y aplauden en el borde; en «many other
//    games» la cuchara vuelca otra carga y caen cartuchos al montón; en «hits» el operario alza uno que brilla;
// 3. (inserto local: la lona de los hallazgos) cartuchos en filas; una mano pone la consola en «consoles» y otra el
//    mando en «parts»; en «grave for E.T.» se marcan los tres del foso y luego todos los demás: solo eran una parte;
// 4. (almacen/pasillo, 1983) el almacén entero de la empresa: el gerente baja por el pasillo con su carpeta, un mozo
//    cruza con la carretilla de cajas, y en «trouble» se cae una caja y el gerente se hunde.''', COMUN + r'''
const a = (f) => en('hallazgo', f);
const P2 = a(0.3536), P3 = a(0.6215), P4 = a(0.8403);
const primero = a(0.1585), cartucho = a(0.2357), aparece = a(0.2583), verdad = a(0.3863), juegos = a(0.4670), exitos = a(0.5696);
const consolas = a(0.6215), piezas = a(0.6531), tumba = a(0.7219), et = a(0.7828), entero = a(0.8651), apuros = a(0.9733);
const PA = { encuadre: 'excavacion14', camara: 'pala' };
// 1 · la pala saca la caja (gag 6)
const p1 = (t) => {
  const g = T.desierto(R, t, { ...PA, saca: tramo(t, 0.3, primero) }), [cx, cy] = g.cuchara || [170, 112];
  const tb = t > cartucho && t < cartucho + 0.5 ? Math.round(Math.sin(t * 40)) : 0;
  PZ.cajaCartucho(R, 170 + tb, cy + 6, { color: 'naranja', icono: 'foso', s: 2 });
  destello(186, cy - 34, tramo(t, cartucho, cartucho + 0.7)); destello(154, cy - 20, tramo(t, cartucho + 0.25, cartucho + 0.9));
  // el público asomado al borde: «¡oh!»
  [14, 48, 92, 134, 190, 232].forEach((x, i) => { const u = tramo(t, aparece + i * 0.06, aparece + i * 0.06 + 0.15); if (u > 0 && t < aparece + 1.8) R.icono('!', x, 16 - Math.round(u * 2), hex('#f0c040'), K, 2); });
  const oh = t > aparece, mira = t > primero - 0.8;
  R.actor(A.publico2014, 22, 172, t, { dir: 1, dedo: mira && !oh, sorpresa: oh, brazos: oh && t < aparece + 0.9, salto: oh && t < aparece + 0.35 ? 3 : 0, habla: !mira && Math.sin(t * 7) > 0 });
  R.actor(A.publico2014b, 58, 172, t, { dir: 1, sorpresa: oh, brazos: oh && t > aparece + 0.15 && t < aparece + 1.1, sonrisa: t > aparece + 1.1 });
  R.actor(A.publico2014, 86, 172, t, { dir: -1, sorpresa: oh, habla: t > aparece + 0.8 && Math.sin(t * 8) > 0, pal: pl({ C: '#c8303a', c: '#962428', Q: '#f0c040', J: '#2a2a34' }) });
};
// 2 · fondo local: el fondo de la fosa
const borde = (x) => Math.round(28 + Math.sin(x * 0.05) * 2 + Math.sin(x * 0.17) * 1);
const capaY = (x, k) => Math.round(40 + k * 13 + Math.sin(x * 0.04 + k * 1.7) * 3 + Math.sin(x * 0.11 + k) * 1.5);
const ESTR = ['#c8a274', '#a8a29a', '#5a4a3e', '#7a5a3e', '#4a3a30', '#8a6a4a', '#3e3028'];
const pintaFosa = () => {
  const { rect, pset, disco, poligono, linea } = R;
  cieloTramado(30, [hex('#4a82d4'), hex('#6a9ee0'), hex('#9ac4ec'), hex('#c8e0f4')]);
  // la pared de la fosa en capas: tierra, caliche, basura con periódicos, bolsas, latas y cajas
  for (let x = 0; x < 320; x++) for (let y = borde(x); y < 112; y++) { let k = 0; while (k < 6 && y > capaY(x, k)) k++; let c = hex(ESTR[k]);
    const n = H(x, y, 12); if (n < 0.12) c = mez(c, K, 0.25); else if (n > 0.92) c = mez(c, BL, 0.15); if (y - borde(x) < 2) c = hex('#e0c49a'); c = mez(c, K, Math.max(0, (y - 70) / 110)); pset(x, y, c); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(H(k, 1, 13) * 316), y = 48 + Math.floor(H(k, 2, 13) * 60), tipo = Math.floor(H(k, 3, 13) * 5);
    if (tipo === 0) { rect(x, y, x + 6, y + 3, hex('#d8d4c8')); rect(x + 1, y + 1, x + 5, y + 1, hex('#8a8680')); }
    else if (tipo === 1) { disco(x, y, 2, hex('#e8e8ee')); pset(x + 1, y - 1, hex('#a8c8e8')); }
    else if (tipo === 2) { rect(x, y, x + 2, y + 3, hex('#c8303a')); pset(x + 1, y, hex('#e8e8ee')); }
    else if (tipo === 3) { rect(x, y, x + 5, y + 4, K); rect(x + 1, y + 1, x + 4, y + 2, hex(['#c8303a', '#3a72cc', '#e8b830', '#3a8a5a'][k % 4])); }
    else { rect(x, y, x + 7, y + 3, hex('#a8845a')); rect(x, y, x + 7, y, hex('#c8a47a')); } }
  // el suelo de la fosa con las huellas de las cadenas y piedras
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y, 14); let c = n < 0.2 ? hex('#5a4434') : n > 0.88 ? hex('#8a6e54') : hex('#6e563f');
    const sur = Math.abs(y - 150 - Math.round((x - 160) * 0.08)); if (sur < 9 && (x + y * 2) % 7 < 2) c = hex('#4a382a'); pset(x, y, c); }
  rect(0, 108, 319, 109, hex('#3e3028'));
  // el montón (derecha) con periódicos, bolsas y cartuchos medio enterrados
  for (let x = 160; x < 316; x++) { const top = Math.round(150 - Math.max(0, Math.sin((x - 160) / 156 * Math.PI)) * 40 + Math.sin(x * 0.3) * 1.5); for (let y = top; y < 160; y++) { const n = H(x, y, 15); pset(x, y, y - top < 2 ? hex('#a8845e') : n < 0.25 ? hex('#5a4434') : n < 0.4 ? hex('#d8d4c8') : hex('#7e6248')); } }
  for (const [x, y, col, ic] of [[184, 150, 'azul', 'nave'], [206, 132, 'verde', 'flor'], [252, 124, 'rojo', 'nave'], [278, 140, 'morado', 'comecocos'], [232, 146, 'amarillo', 'flor']]) PZ.cartucho(R, x, y, { color: col, icono: ic });
  // las cajas de plástico de los hallazgos (izquierda) y el banderín numerado
  for (const [x, y] of [[6, 166], [36, 170]]) { rect(x, y - 16, x + 28, y, K); rect(x + 1, y - 15, x + 27, y - 1, hex('#3a72cc')); for (let i = x + 3; i < x + 26; i += 4) rect(i, y - 12, i + 1, y - 3, hex('#2a5aa0')); rect(x + 1, y - 15, x + 27, y - 14, hex('#6a9ae8')); }
  PZ.cartucho(R, 14, 151, { color: 'rosa', icono: 'flor' }); PZ.cartucho(R, 46, 155, { color: 'turquesa', icono: 'nave' });
  rect(296, 112, 296, 126, hex('#5a5a66')); poligono([[297, 112], [306, 115], [297, 118]], hex('#e8702a'));
};
const CAEN = [[230, 'rojo', 'foso'], [246, 'azul', 'nave'], [262, 'verde', 'flor'], [240, 'amarillo', 'comecocos'], [256, 'morado', 'foso'], [272, 'naranja', 'nave']];
const p2 = (t) => {
  capa('fosa', pintaFosa);
  for (const [x0, y, w, v] of [[30, 3, 40, 2.2], [190, 10, 30, 3.4]]) nube(((x0 + (t - P2) * v) % 380) - 40, y, w, [hex('#c0d0e6'), hex('#f2f6fa'), BL], (px, py) => py < borde(px) - 1 && !(px > 276 && py < 46));
  // el público del borde, que aplaude en «true»
  for (let k = 0; k < 30; k++) { const x = 2 + Math.round(k * 9.2 + H(k, 1, 40) * 6), alto = H(k, 2, 40) < 0.25 ? 2 : 0, y = borde(x) - 1 + (H(k, 3, 40) < 0.4 ? 1 : 0); if (x > 272 || (x > 116 && x < 136)) continue;
    const ap = t > verdad && t < verdad + 1.8 && Math.floor(t * 8 + k) % 2, sal = ap && k % 3 === 0 ? 1 : 0;
    R.rect(x, y - 7 + alto - sal, x + 3, y - 2, hex(['#c8303a', '#3a72cc', '#e8b830', '#3a8a5a', '#7a4ab8', '#e86a2a', '#f2eee2'][k % 7])); R.rect(x + 1, y - 10 + alto - sal, x + 2, y - 8 + alto - sal, hex(k % 4 ? '#e8a878' : '#a8744a'));
    R.rect(x + 1, y - 11 + alto - sal, x + 2, y - 11 + alto - sal, hex(['#2a1c14', '#c8303a', '#3a72cc', '#6a4426'][k % 4]));
    if (ap) { R.pset(x - 1, y - 10 + alto, hex('#e8a878')); R.pset(x + 4, y - 10 + alto, hex('#e8a878')); } }
  // el trípode con la cámara del borde
  R.linea(122, 27, 118, 34, K); R.linea(124, 27, 128, 34, K); R.rect(119, 21, 129, 26, K); R.rect(120, 22, 128, 25, hex('#4a4a56')); if (Math.sin(t * 6) > 0) R.pset(121, 23, hex('#e83a3a'));
  // la cuchara entra por la derecha y vuelca otra carga en «many other games»
  const entra = tramo(t, P2 + 0.2, juegos - 0.3), vuelca = tramo(t, juegos - 0.3, juegos + 0.3), sale = tramo(t, exitos - 0.6, exitos + 0.4);
  const bx = Math.round(lerp(352, 262, entra) + sale * 90), by = 56 - Math.round(vuelca * 4);
  // el brazo de la excavadora, que entra por el borde derecho por debajo de la esquina de Atom, y la cuchara que gira
  const hx = bx + 24, hy = by, ang = -0.25 + vuelca * 1.2, ca = Math.cos(ang), sa = Math.sin(ang), rot = (pts) => pts.map(([u, v]) => [Math.round(hx + u * ca - v * sa), Math.round(hy + u * sa + v * ca)]);
  R.poligono([[340, 48], [hx, hy - 6], [hx, hy + 5], [340, 62]], K); R.poligono([[340, 49], [hx + 1, hy - 5], [hx + 1, hy + 4], [340, 61]], hex('#e8b830')); R.linea(hx + 2, hy - 4, 330, 50, hex('#f8d870'));
  R.linea(hx + 10, hy + 6, 336, 70, K); R.linea(hx + 10, hy + 7, 336, 71, hex('#c8c8d2'));
  R.poligono(rot([[0, -7], [12, -6], [20, 4], [18, 20], [6, 28], [-22, 26], [-26, 18]]), K);
  R.poligono(rot([[0, -5], [11, -4], [18, 4], [16, 19], [5, 26], [-20, 24], [-23, 18]]), hex('#e8b830'));
  R.poligono(rot([[-20, 18], [-4, -2], [6, 4], [4, 22]]), hex('#5a4434')); R.linea(...rot([[14, -2]])[0], ...rot([[12, 18]])[0], hex('#c89a20'));
  for (let i = 0; i < 4; i++) R.poligono(rot([[-24 + i * 6, 25], [-20 + i * 6, 25], [-22 + i * 6, 31]]), hex('#9a9aa6'));
  R.disco(hx, hy, 3, K); R.disco(hx, hy, 2, hex('#8a8a96'));
  CAEN.forEach(([x, col, ic], i) => { const u = tramo(t, juegos - 0.1 + i * 0.09, juegos + 0.45 + i * 0.09); if (u <= 0) return; const y = Math.round(lerp(80, 120 + (i % 3) * 6, u * u)); PZ.cartucho(R, x - Math.round((1 - u) * 20), y, { color: col, icono: ic }); });
  if (vuelca > 0 && vuelca < 1) for (let i = 0; i < 8; i++) R.disco(236 + i * 6, 84 + Math.round(H(i, Math.floor(t * 10), 1) * 20), 1 + (i % 2), hex('#a8845e'));
  // la arqueóloga alza la caja; el arqueólogo y el operario; el cámara graba
  const alza = tramo(t, P2 + 0.1, verdad - 0.1);
  const ra = R.actor(A.arqueologa, 112, 168, t, { dir: 1, sostiene: [128, Math.round(lerp(150, 126, alza))], sonrisa: t > verdad - 0.2 });
  PZ.cajaCartucho(R, ra.mano[0], ra.mano[1] + 4, { color: 'naranja', icono: 'foso' });
  R.actor(A.arqueologo, 70, 166, t, { dir: 1, habla: t > verdad && t < verdad + 1.2 && Math.sin(t * 8) > 0, sonrisa: t > verdad, dedo: t > juegos && t < exitos });
  const ho = t > exitos - 0.3, ro = R.actor(A.operario, 168, 162, t, { dir: 1, sostiene: ho ? [186, Math.round(lerp(150, 128, tramo(t, exitos - 0.3, exitos)))] : undefined, sonrisa: ho });
  if (ho) { PZ.cartucho(R, ro.mano[0] + 1, ro.mano[1] + 6, { color: 'azul', icono: 'nave' }); destello(ro.mano[0] + 6, ro.mano[1] - 10, tramo(t, exitos, exitos + 0.7)); }
  const rt = R.actor(EL.tecnico, 282, 172, t, { dir: -1, sostiene: [270, 152] }); camaraTV(rt.mano[0], rt.mano[1] - 1, -1, t);
};
// 3 · inserto local: la lona con los hallazgos en filas
const LONA = [[12, 22], [272, 16], [304, 172], [8, 174]];
const ITEMS = [];
for (let f = 0; f < 3; f++) for (let c = 0; c < 5; c++) { const k = f * 5 + c; ITEMS.push([40 + c * 36, 60 + f * 44, ['rojo', 'azul', 'verde', 'amarillo', 'morado', 'turquesa', 'rosa', 'gris', 'naranja'][(k * 4) % 9], ['nave', 'flor', 'comecocos', 'nave', 'flor'][(k + f) % 5]]); }
for (const k of [2, 6, 13]) { ITEMS[k][2] = 'naranja'; ITEMS[k][3] = 'foso'; }
const pintaLona = () => {
  const { rect, pset, poligono, linea, disco } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y, 21); pset(x, y, n < 0.15 ? hex('#c8a26a') : n > 0.9 ? hex('#ecd4a4') : hex('#dcb880')); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(H(k, 1, 22) * 320), y = Math.floor(H(k, 2, 22) * 180); disco(x, y, 1, hex('#a88a6a')); pset(x, y - 1, hex('#c8b090')); }
  poligono(LONA.map(([x, y]) => [x + 3, y + 3]), hex('#a8845a')); poligono(LONA, hex('#2a4a8a')); poligono([[14, 24], [270, 18], [302, 170], [10, 172]], hex('#3a6ab8'));
  for (let y = 18; y < 172; y++) for (let x = 10; x < 302; x++) { if (R.pget(x, y) !== hex('#3a6ab8')) continue; const ar = Math.sin(x * 0.09 + y * 0.03) + Math.sin(y * 0.15 - x * 0.02); if (ar > 1.5) pset(x, y, hex('#4a7ac8')); else if (ar < -1.6) pset(x, y, hex('#2e5aa0')); if (H(x, y, 23) < 0.03) pset(x, y, hex('#c8a87a')); }
  linea(140, 20, 154, 171, hex('#2e5aa0')); linea(11, 98, 288, 92, hex('#2e5aa0'));
  for (let k = 0; k <= 8; k++) { const u = k / 8; for (const [p, q] of [[LONA[0], LONA[1]], [LONA[3], LONA[2]]]) { const x = Math.round(lerp(p[0], q[0], u)), y = Math.round(lerp(p[1], q[1], u)); disco(x, y + (p === LONA[0] ? 3 : -3), 2, hex('#c8c8d2')); pset(x, y + (p === LONA[0] ? 3 : -3), hex('#5a5a66')); } }
  // la regla de escala, el pincel, la paleta y la punta de las botas
  for (let i = 0; i < 8; i++) rect(18 + i * 6, 163, 23 + i * 6, 166, i % 2 ? K : BL); rect(18, 162, 65, 162, K); rect(18, 167, 65, 167, K);
  rect(220, 158, 250, 160, hex('#b8834a')); rect(250, 157, 256, 161, hex('#c8c8d2')); rect(256, 157, 262, 161, hex('#4a3a2a'));
  poligono([[286, 176], [292, 166], [298, 176]], hex('#8a8a96')); rect(291, 176, 293, 179, hex('#6a4426'));
  for (const x of [118, 150]) { disco(x, 182, 9, K); disco(x, 182, 8, hex('#6a4a2e')); disco(x - 2, 179, 3, hex('#8a6a4a')); }
  // las etiquetas numeradas de cada fila
  for (let f = 0; f < 3; f++) { const y = 66 + f * 44; rect(16, y - 8, 26, y, K); rect(17, y - 7, 25, y - 1, BL); R.numero(String(f + 1), 19, y - 1, { color: K, sombra: false }); }
};
const p3 = (t) => {
  capa('lona', pintaLona);
  // los cartuchos de las filas (al doble) y sus marcas
  ITEMS.forEach(([x, y, col, ic], k) => { const foso = ic === 'foso', m1 = t > tumba && t < et + 0.2 && foso && Math.floor(t * 6) % 2, m2 = t > et && !foso && t > et + k * 0.05;
    if (m1 || m2) { R.rect(x - 14, y - 32, x + 13, y + 2, m1 ? hex('#f0c040') : hex('#7ad88a')); R.rect(x - 13, y - 31, x + 12, y + 1, hex('#3a6ab8')); }
    PZ.cartucho(R, x, y, { color: col, icono: ic, s: 2 }); });
  // la consola: una mano la trae desde abajo y la deja en «consoles»
  const c1 = tramo(t, consolas - 0.55, consolas + 0.05), r1 = tramo(t, consolas + 0.3, consolas + 0.8), cxx = Math.round(lerp(372, 250, c1));
  PZ.consolaVieja(R, cxx, 84, { s: 2, cartucho: 'naranja' });
  if (r1 < 1) { const hx = cxx + 34 + Math.round(r1 * 60); T.brazo(R, hx + 40, 96, hx, 74, '#d8c8a0', -1); }
  // el mando: otra mano desde la derecha en «parts»
  const c2 = tramo(t, piezas - 0.45, piezas + 0.1), r2 = tramo(t, piezas + 0.35, piezas + 0.9), jy = Math.round(lerp(214, 128, c2));
  PZ.joystick(R, 246, jy, { s: 2, inclina: Math.sin(t * 2) * 0.3 });
  if (r2 < 1) { const wy = jy + 2 + Math.round(r2 * 70); T.brazo(R, 262, wy + 44, 254, wy, '#3a5a8a', 1); }
  // los cables sueltos y la placa de circuito (las «piezas»)
  R.linea(220, 140, 236, 152, K); R.linea(236, 152, 262, 148, K); R.rect(268, 140, 290, 154, K); R.rect(269, 141, 289, 153, hex('#2a7a4a')); for (let i = 0; i < 4; i++) R.rect(272 + i * 5, 144, 274 + i * 5, 146, hex('#c8c8d2'));
  // una lagartija cruza la arena por abajo
  const lz = tramo(t, P3 + 0.6, P3 + 3.2); if (lz > 0 && lz < 1) { const x = Math.round(lerp(-10, 330, lz)), y = 176 - Math.round(Math.sin(lz * 6) * 1); R.rect(x, y, x + 6, y + 1, hex('#8a7a4a')); R.rect(x - 5, y, x - 1, y, hex('#7a6a3a')); R.pset(x + 7, y, hex('#8a7a4a')); R.pset(x + 1 + (Math.floor(t * 12) % 2), y + 2, hex('#7a6a3a')); R.pset(x + 5 - (Math.floor(t * 12) % 2), y + 2, hex('#7a6a3a')); }
};
// 4 · 1983: el almacén entero de una empresa en apuros
const AL = { encuadre: 'almacen', camara: 'pasillo', icono: 'consola' };
const p4 = (t) => {
  T.tiendas(R, t, AL);
  // el gerente baja por el pasillo con la carpeta
  const g = tramo(t, P4 + 0.1, entero + 1.0), xg = Math.round(lerp(168, 150, g)), sg = Math.round(lerp(150, 166, g)), hund = t > apuros;
  const rg = R.actor(A.gerenteAlmacen, xg, sg, t, { dir: -1, anda: g > 0 && g < 1, sostiene: hund ? undefined : true, triste: hund || t > entero + 1.4, sorpresa: t > apuros - 0.3 && t < apuros });
  if (!hund) { R.rect(rg.mano[0] - 5, rg.mano[1] - 4, rg.mano[0] + 2, rg.mano[1] + 5, K); R.rect(rg.mano[0] - 4, rg.mano[1] - 3, rg.mano[0] + 1, rg.mano[1] + 4, hex('#f2eee2')); R.rect(rg.mano[0] - 3, rg.mano[1] - 4, rg.mano[0], rg.mano[1] - 3, hex('#8a8a96')); }
  // el mozo cruza con la carretilla cargada de cajas
  const m = tramo(t, P4 + 0.1, P4 + 4.0), xm = Math.round(lerp(-30, 236, m));
  if (m > 0 && m < 1) { R.actor(A.operario, xm, 172, t, { dir: 1, anda: true, sostiene: [xm + 18, 156] });
    R.rect(xm + 18, 138, xm + 19, 170, hex('#5a5a66')); R.rect(xm + 18, 170, xm + 32, 171, hex('#5a5a66')); R.disco(xm + 22, 171, 2, K);
    for (let i = 0; i < 3; i++) { const y = 167 - i * 10; R.rect(xm + 20, y - 9, xm + 33, y, K); R.rect(xm + 21, y - 8, xm + 32, y - 1, hex('#c8a06a')); R.rect(xm + 21, y - 8, xm + 32, y - 7, hex('#e0bc88')); R.rect(xm + 25, y - 6, xm + 28, y - 3, hex(['#c8303a', '#3a72cc', '#e8b830'][i])); } }
  // la caja que se cae de la balda en «trouble»
  const c = tramo(t, apuros - 0.45, apuros), cx = Math.round(lerp(64, 84, c)), cyy = Math.round(lerp(78, 166, c * c)), rebota = t > apuros && t < apuros + 0.3 ? Math.round(Math.sin((t - apuros) / 0.3 * Math.PI) * 3) : 0;
  R.rect(cx - 9, cyy - 14 - rebota, cx + 9, cyy - rebota, K); R.rect(cx - 8, cyy - 13 - rebota, cx + 8, cyy - 1 - rebota, hex('#c8a06a')); R.rect(cx - 8, cyy - 13 - rebota, cx + 8, cyy - 12 - rebota, hex('#e0bc88')); R.rect(cx - 2, cyy - 10 - rebota, cx + 3, cyy - 5 - rebota, hex('#c8303a'));
  if (t > apuros) for (let i = 0; i < 6; i++) { const f = tramo(t, apuros, apuros + 0.8); if (f < 1) R.disco(cx - 12 + i * 5, 164 - Math.round(f * 6 * (i % 2 + 1)), 1 + Math.round(f), hex('#d8d0c0')); }
  T.tinte(R, 0, 179, [200, 160, 110], 0.12);
};
const año = (t) => t < P4 ? 2014 : 1983;
const efectos = [[0.5, 'motor'], [cartucho, 'brillo'], [aparece, 'publico'], [verdad + 0.1, 'palmada'], [juegos, 'golpecito'], [exitos, 'brillo'], [consolas + 0.1, 'golpecito'], [piezas + 0.1, 'toc'], [tumba, 'aviso'], [P4 + 0.4, 'carro'], [apuros, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
