E = {}

# piezas comunes de las dos escenas (cada escena es su propia página, así que van en cada cuerpo)
LIB = r'''
const K = hex('#1a1420');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const dz = (x, y, u) => u * 16 > BY[((y & 3) << 2) | (x & 3)] + 0.5;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// una capa fija: se pinta una vez en su búfer; pegar() la pone encima (los píxeles sin pintar dejan ver lo de debajo)
const capa = (f) => { const b = R.nuevo(), p = R.usar(b); f(); R.usar(p); return b; };
const pegar = (b) => { const B = R.buf; for (let i = 0; i < B.length; i++) if (b[i]) B[i] = b[i]; };
// degradado tramado (orden de Bayer) entre varios colores, por filas
const degr = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, dz(x, y, f) ? cols[i + 1] : cols[i]); } };
// nube de tres tonos (sombra, cuerpo y luz), con la base plana
const NUB = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
const nube = (cx, cy, w, cs) => { for (const [dx, dy, r] of NUB) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), cs[0]);
  for (const [dx, dy, r] of NUB) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w * 0.92), cs[1]);
  for (const [dx, dy, r] of NUB) if (dy <= 0.02) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.55), cs[2]);
  for (let x = Math.round(cx - w * 0.5); x <= Math.round(cx + w * 0.5); x++) R.pset(x, Math.round(cy + w * 0.3), cs[0]); };
// nubes a tres velocidades (lejanas, medias y cercanas), dentro de [y0, y1]
const nubes = (t, y0, y1, cs, n = 5) => { for (let k = 0; k < n; k++) { const v = [1.2, 2.4, 4][k % 3], w = [16, 24, 34][k % 3], x = ((k * 113 + t * v) % 440) - 60, y = y0 + Math.round(hh(k, 3, 9) * (y1 - y0)); nube(Math.round(x), y, w, cs); } };
// pájaros que aletean
const pajaros = (t, n, y0, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round(((k * 71 + t * (9 + k * 2)) % 360) - 20), y = Math.round(y0 + k * 5 + Math.sin(t * 1.3 + k) * 3); if (x > 266 && y < 48) continue; const a = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - a * 2 + (a ? 0 : 1), c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - a * 2 + (a ? 0 : 1), c); } };
// paloma pequeña (o.vuela: aletea y sube)
const paloma = (x, y, t, o = {}) => { x = Math.round(x); y = Math.round(y); const g = hex('#8a8a96'), gs = hex('#5a5a66'), gl = hex('#c8c8d0');
  if (o.vuela) { const a = Math.sin(t * 22 + x) > 0; R.rect(x - 2, y - 1, x + 2, y, g); R.pset(x + 3, y - 1, gs); if (a) { R.linea(x - 1, y - 1, x - 4, y - 4, gl); R.linea(x + 1, y - 1, x + 3, y - 4, gl); } else { R.linea(x - 1, y, x - 4, y + 2, gs); R.linea(x + 1, y, x + 3, y + 2, gs); } return; }
  const p = Math.sin(t * 6 + x) > 0.6 ? 1 : 0, d = o.dir ?? 1; R.rect(x - 2, y - 3, x + 2, y - 1, g); R.rect(x - 1, y - 3, x + 1, y - 3, gl); R.pset(x + 3 * d, y - 4 + p, gs); R.pset(x + 3 * d, y - 5 + p, g); R.pset(x + 4 * d, y - 4 + p, hex('#e8a040')); R.pset(x - 3 * d, y - 2, gs); R.pset(x - 1, y, hex('#c86a4a')); R.pset(x + 1, y, hex('#c86a4a')); };
// ── piezas propias de las escenas del canal y de las brownstones ──
const CIELO = [hex('#3a78c4'), hex('#4a88ce'), hex('#5e98d8'), hex('#76aade'), hex('#92bee6'), hex('#b4d2ea')];
const NUBC = [hex('#a8b8d0'), hex('#e8eef4'), hex('#ffffff')];
// punto de una polilínea a la fracción u de su largo
const sobre = (pts, u) => { let tot = 0; const lg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lg.push(l); tot += l; }
  let r = Math.max(0, Math.min(1, u)) * tot; for (let i = 1; i < pts.length; i++) { if (r <= lg[i - 1] || i === pts.length - 1) { const f = lg[i - 1] ? Math.min(1, r / lg[i - 1]) : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; } r -= lg[i - 1]; }
  return [...pts[pts.length - 1], 0]; };
// traza la polilínea hasta u (c: color o función)
const trazo = (pts, u, c, punteado = 0) => { let tot = 0; const lg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lg.push(l); tot += l; }
  let r = u * tot; for (let i = 1; i < pts.length && r > 0; i++) { const f = Math.min(1, r / lg[i - 1]), [ax, ay] = pts[i - 1], bx = ax + (pts[i][0] - ax) * f, by = ay + (pts[i][1] - ay) * f; R.linea(ax, ay, bx, by, c, punteado); r -= lg[i - 1]; } };
// gira puntos locales alrededor de (cx, cy)
const giro = (cx, cy, pts, a) => { const c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [Math.round(cx + x * c - y * s), Math.round(cy + x * s + y * c)]); };
// bocanada de humo de tres tonos (r crece con la edad e, 0–1)
const bocanada = (x, y, e, cs = [hex('#8a8a92'), hex('#b8b8c0'), hex('#e0e0e6')]) => { if (e <= 0 || e >= 1) return; const r = Math.round(2 + e * 6); R.disco(Math.round(x), Math.round(y + 1), r, cs[0]); R.disco(Math.round(x - 1), Math.round(y), Math.max(1, r - 1), cs[1]); R.disco(Math.round(x - 2), Math.round(y - 1), Math.max(1, r - 3), cs[2]); };
// saco de arpillera con espigas (x, y = abajo en el centro)
const saco = (x, y, s = 1) => { x = Math.round(x); y = Math.round(y); const w = Math.round(6 * s), h = Math.round(10 * s);
  R.poligono([[x - w, y], [x - w - 1, y - h + 3], [x - w + 2, y - h], [x + w - 2, y - h], [x + w + 1, y - h + 3], [x + w, y]], K);
  R.poligono([[x - w + 1, y - 1], [x - w, y - h + 3], [x - w + 2, y - h + 1], [x + w - 2, y - h + 1], [x + w, y - h + 3], [x + w - 1, y - 1]], hex('#c8a86a'));
  for (let yy = y - h + 2; yy < y - 1; yy += 2) for (let xx = x - w + 1; xx < x + w; xx += 3) R.pset(xx + (yy % 4 ? 1 : 0), yy, hex('#a88a52'));
  R.linea(x - w + 1, y - h + 1, x - w + 1, y - 2, hex('#e0c890')); R.linea(x + w - 1, y - h + 2, x + w - 1, y - 2, hex('#8a6a3a'));
  R.linea(x - 2, y - h, x + 2, y - h, hex('#6a4a2a')); for (const dx of [-2, 0, 2]) { R.linea(x + dx, y - h, x + dx * 2, y - h - 4, hex('#d8b040')); R.pset(x + dx * 2, y - h - 4, hex('#f0d060')); R.pset(x + dx * 2 + 1, y - h - 3, hex('#f0d060')); } };
// gaviota que planea (x, y), aleteo con t
const gaviota = (x, y, t, k = 0) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 7 + k) > 0.2; const bl = hex('#f4f4f4'), gr = hex('#9aa4b0');
  R.pset(x, y, bl); R.pset(x + 1, y, bl); R.pset(x + 2, y, hex('#e8a040')); if (a) { R.linea(x - 1, y - 1, x - 4, y - 3, gr); R.linea(x + 1, y - 1, x + 3, y - 3, gr); } else { R.linea(x - 1, y, x - 4, y + 1, gr); R.linea(x + 1, y, x + 4, y + 1, gr); } };
// la perca del lago Erie: (x, y) centro, a = giro, o.cara 0 normal, 1 prueba (abre y cierra la boca), 2 salada
const pez = (x, y, a, t, o = {}) => { const d = o.dir ?? 1, F = (pts) => giro(x, y, pts.map(([u, v]) => [u * d, v]), a);
  const elip = (ra, rb, sel) => { const p = []; for (let k = 0; k < 20; k++) { const q = k / 20 * Math.PI * 2, u = Math.cos(q) * ra, v = Math.sin(q) * rb; if (!sel || sel(u, v)) p.push([u, v]); } return p; };
  const sal = o.cara === 2, temb = sal ? Math.round(Math.sin(t * 50)) : 0; x += temb;
  R.poligono(F([[-10, 0], [-17, -6], [-15, 0], [-17, 6]]), K); R.poligono(F([[-10, 0], [-16, -4], [-14, 0], [-16, 4]]), hex('#e07a2a'));   // la cola
  R.poligono(F([[-6, -5], [-2, -10], [3, -9], [5, -5]]), K); R.poligono(F([[-5, -5], [-2, -9], [2, -8], [4, -5]]), hex('#c8a040'));   // la aleta de espinas
  for (const u of [-2, 1]) R.pset(...F([[u, -8]])[0], K);
  R.poligono(F(elip(12, 7)), K); R.poligono(F(elip(11, 6)), sal ? hex('#a8c050') : hex('#d8c040'));
  R.poligono(F(elip(11, 6, (u, v) => v <= -1).concat([[-11, -1]])), hex('#7a8a2a')); R.poligono(F(elip(10, 5, (u, v) => v >= 2.5)), hex('#f4e8b0'));
  for (const u of [-6, -2, 2]) R.linea(...F([[u, -5]])[0], ...F([[u + 1, 2]])[0], hex('#3a4a1a'));   // las barras
  R.poligono(F([[0, 4], [-3, 9], [2, 6]]), hex('#e07a2a'));   // la aleta de abajo
  const [ex, ey] = F([[6, -2]])[0];
  if (sal) { R.linea(ex - 2, ey - 2, ex + 1, ey, K); R.linea(ex - 2, ey + 2, ex + 1, ey, K); R.pset(...F([[3, 1]])[0], hex('#7aa040')); R.pset(...F([[4, 2]])[0], hex('#7aa040')); }
  else { R.disco(ex, ey, 2, hex('#ffffff')); R.pset(ex, ey - 2, K); R.pset(ex + 2, ey, K); R.pset(ex - 2, ey, K); R.pset(ex, ey + 2, K); R.pset(ex + (d > 0 ? 1 : -1), ey, K); R.pset(ex + (d > 0 ? 1 : 0), ey + 1, K); }
  const abre = o.cara === 1 ? Math.sin(t * 18) > 0 : sal;
  if (abre) { R.poligono(F([[9, 0], [13, -2], [13, 3]]), hex('#5a1a2a')); if (sal) { R.poligono(F([[11, 1], [16, 2], [16, 4], [12, 3]]), hex('#e86a8a')); R.pset(...F([[15, 3]])[0], hex('#c84a6a')); } }
  else R.linea(...F([[9, 1]])[0], ...F([[12, 1]])[0], K);
};
// carretilla de obra delante de quien la empuja: (x, y) = la rueda en el suelo, dir hacia donde va, (hx, hy) la mano
const carretilla = (x, y, d, hx, hy, carga = true) => { x = Math.round(x); y = Math.round(y);
  R.linea(hx, hy, x - d * 4, y - 6, hex('#5a3a20')); R.linea(hx, hy + 1, x - d * 4, y - 5, hex('#7a5a30'));
  R.poligono([[x - d * 14, y - 9], [x + d * 1, y - 9], [x - d * 2, y - 3], [x - d * 11, y - 3]], K); R.poligono([[x - d * 13, y - 8], [x, y - 8], [x - d * 2, y - 4], [x - d * 10, y - 4]], hex('#8a6a3a'));
  R.linea(x - d * 13, y - 8, x, y - 8, hex('#b08a50'));
  if (carga) { R.disco(x - d * 7, y - 9, 4, hex('#5a3a22')); R.disco(x - d * 8, y - 10, 3, hex('#7a5232')); R.pset(x - d * 9, y - 12, hex('#9a7048')); R.pset(x - d * 5, y - 11, hex('#8a8a80')); }
  R.linea(x - d * 10, y - 3, x - d * 11, y, hex('#3a2a1a'));
  R.disco(x, y - 3, 3, K); R.disco(x, y - 3, 2, hex('#6a5a4a')); R.pset(x, y - 3, hex('#c8b090')); };
// pala en la mano (hx, hy), con la hoja en (px, py)
const pala = (hx, hy, px, py, tierra) => { R.linea(hx, hy, px, py, hex('#7a5a30')); R.linea(hx + 1, hy, px + 1, py, hex('#a07a48')); R.rect(px - 2, py, px + 2, py + 3, K); R.rect(px - 1, py, px + 1, py + 2, hex('#9aa0a8')); if (tierra) { R.rect(px - 1, py - 1, px + 2, py, hex('#6a4a2a')); R.pset(px, py - 2, hex('#8a6a3a')); } };
// arbolito recién plantado con su tutor (x, y = el pie)
const arbolito = (x, y, t, h = 1) => { if (h <= 0) return; const H = Math.round(18 * h); R.linea(x + 3, y, x + 3, y - H + 2, hex('#c8a870')); R.linea(x, y, x, y - H, hex('#5a3a20')); R.linea(x + 1, y, x + 1, y - H + 4, hex('#7a5232'));
  const s = Math.round(Math.sin(t * 2.2 + x) * 1); for (const [dx, dy, r, c] of [[0, -H, 5, '#3a6a2a'], [-3, -H + 3, 4, '#3a6a2a'], [3, -H + 2, 4, '#4a7a32'], [s, -H - 1, 3, '#6a9a3a'], [-2 + s, -H - 2, 2, '#8aba4a']]) R.disco(x + dx, y + dy, Math.max(1, Math.round(r * h)), hex(c)); };
'''

E['ny-canal'] = ('El canal del Erie', '''// NY-CANAL (frases 31–33), 1825 → 1850, cartela «1825». Siete planos:
// 1. el mapa del estado de Nueva York: en «Erie Canal» el canal se dibuja de Albany a Buffalo; en «Hudson River» el río se
//    enciende; en «Great Lakes» ondas en el lago Erie; el barco del gobernador con el barril verde baja por el canal y el
//    Hudson hasta Nueva York (corta en «And the governor»);
// 2. la cubierta del barco engalanado: DeWitt Clinton avanza, sujeta el barril y lo vacía en la bahía, serio; el marinero
//    dispara la salva y los invitados lo celebran (corta en «New York Harbor»);
// 3. inserto a ras de agua junto al casco (fondo local): el agua del lago cae a la bahía; la perca cae con el chorro, se
//    zambulle, asoma, prueba el agua y pone cara de salada (gag); escupe y salta de vuelta hacia el barril (corta en «deep»);
// 4. el porqué (mapa del continente): en «deep» la lupa enseña el puerto hondo y el cabo que lo protege del Atlántico; en
//    «river» la ruta sube por el Hudson, el canal y los lagos hasta Chicago; en «heart» se enciende el medio oeste, brota el
//    trigo y los sacos bajan hacia Nueva York; de allí salen veleros al mundo (corta en «Western»);
// 5. el canal: la barcaza de trigo baja tirada por las mulas, la esclusa se llena, un granjero trae otro saco con su perro;
//    en «sails out to the world» el patrón saluda (corta en «Shipping»);
// 6. la casa de contratación (fondo local): el estibador deja el saco de una tonelada en la balanza en «ton»; en «$100»
//    sale el precio y el comerciante va quitando monedas hasta «$10»; el estibador se queda con la boca abierta (corta en «And»);
// 7. South Street a la luz de la tarde: los muelles llenos de veleros; el comerciante los señala, el estibador carga sacos,
//    otro rueda un barril; un coche de caballos pasa por delante al final.''', LIB + r'''
const fa = (f) => en('barril', f), fs = (f) => en('secreto', f), fn = (f) => en('tonelada', f);
const P2 = fa(.554), P3 = fa(.902), P4 = fs(.16), P5 = fs(.671), P6 = fn(0), P7 = fn(.572);   // «And the governor», «New York Harbor», «deep», «Western», «Shipping», «And New York»
const RC = [[-73.75, 42.68], [-74.2, 42.85], [-74.9, 42.95], [-75.23, 43.1], [-75.8, 43.08], [-76.15, 43.05], [-76.9, 43.1], [-77.6, 43.16], [-78.2, 43.12], [-78.7, 43.0], [-78.88, 42.89]];
const RH = [[-74.02, 40.69], [-74.0, 40.9], [-73.93, 41.2], [-73.95, 41.5], [-73.94, 41.75], [-73.95, 42.1], [-73.8, 42.4], [-73.75, 42.65]];
const aro = (cx, cy, r, c) => { for (let q = 0; q < 6.283; q += 0.6 / Math.max(2, r)) R.pset(Math.round(cx + Math.cos(q) * r), Math.round(cy + Math.sin(q) * r * 0.8), c); };
// el barco del gobernador en el mapa, con el barril verde en cubierta y su gallardete
const barquita = (x, y, t, d) => { x = Math.round(x); y = Math.round(y + Math.sin(t * 5) * 0.6);
  R.poligono([[x - 8, y - 2], [x + 8, y - 2], [x + 6, y + 2], [x - 6, y + 2]], K); R.poligono([[x - 7, y - 1], [x + 7, y - 1], [x + 5, y + 1], [x - 5, y + 1]], hex('#8a5a2a')); R.linea(x - 7, y - 1, x + 7, y - 1, hex('#c89a5a'));
  R.rect(x - 4 * d - 2, y - 5, x - 4 * d + 2, y - 2, K); R.rect(x - 4 * d - 1, y - 4, x - 4 * d + 1, y - 3, hex('#f2eee2'));
  R.rect(x + 3 * d - 2, y - 6, x + 3 * d + 2, y - 2, K); R.rect(x + 3 * d - 1, y - 5, x + 3 * d + 1, y - 3, hex('#3a9a3a')); R.pset(x + 3 * d, y - 4, hex('#9ae07a'));
  R.linea(x, y - 2, x, y - 11, K); const f = Math.sin(t * 9) > 0 ? 1 : 0; R.rect(x + 1 * -d, y - 11, x + 4 * -d, y - 10 + f, hex('#c83a3a')); R.pset(x + 5 * -d, y - 10, hex('#c83a3a')); };

// 1 · el mapa: el canal se dibuja de Albany a Buffalo; el barco del gobernador baja con el barril hasta Nueva York
const p1 = (t) => {
  const c = tramo(t, fa(.17), fa(.34));
  const P = T.mapaNY(R, t, { vista: 'noreste', canal: c });
  const can = RC.map((p) => P(p)), hud = RH.map((p) => P(p));
  const gh = tramo(t, fa(.39), fa(.43)) - tramo(t, fa(.5), fa(.55));   // «Hudson River»: el río se enciende
  if (gh > 0) for (let i = 1; i < hud.length; i++) { const cl = mez(hex('#4a7aa8'), hex('#f8f0b0'), gh); R.linea(hud[i - 1][0] - 1, hud[i - 1][1], hud[i][0] - 1, hud[i][1], cl); R.linea(hud[i - 1][0] + 2, hud[i - 1][1], hud[i][0] + 2, hud[i][1], cl); }
  const [bx, by] = P.sitios.buffalo, gl = tramo(t, fa(.49), fa(.56)) * (1 - tramo(t, P2 - 0.6, P2));   // «Great Lakes»: ondas en el lago Erie
  if (gl > 0) for (let k = 0; k < 3; k++) { const r = 3 + ((t * 0.9 + k / 3) % 1) * 16; aro(bx - 8, by + 2, r, mez(hex('#2a5a8a'), hex('#f0e8b0'), 1 - (r - 3) / 16)); }
  const u = tramo(t, fa(.36), P2 - 0.05);
  if (u > 0) { const ruta = [...can].reverse().concat([...hud].reverse()); trazo(ruta, u, hex('#e8b830'), 3); const [x, y, an] = sobre(ruta, u); barquita(x, y - 2, t, Math.cos(an) >= -0.2 ? 1 : -1); }
};

// 2 · la cubierta del barco del gobernador, 4 de noviembre de 1825: DeWitt Clinton vacía el barril en la bahía con trato serio
const p2 = (t) => {
  const v = tramo(t, fa(.65), fa(.86));
  const g = T.puerto(R, t, { encuadre: 'boda', barril: true, vierte: v });
  const viva = t > fa(.84);
  R.actor(EL.marinero83, 40, 168, t, { dir: 1, sostiene: t > fa(.8) ? [70, 150] : true, sorpresa: t > fa(.86) && t < fa(.86) + 0.5 });
  if (t > fa(.86)) { const e = tramo(t, fa(.86), fa(.86) + 0.9); bocanada(84 + e * 14, 146 - e * 8, e); bocanada(78 + e * 6, 150 - e * 4, e * 0.8); }
  R.actor(EL.dama, 96, 168, t, { dir: 1, sonrisa: viva, habla: t < fa(.7) && Math.sin(t * 7) > 0 });
  R.actor(EL.comerciante, 120, 168, t, { dir: 1, brazos: viva, sonrisa: viva, sorpresa: t > fa(.7) && !viva });
  const w = tramo(t, P2 + 0.05, fa(.64)), cx = Math.round(lerp(150, 196, w));
  R.actor(EL.clinton, cx, 168, t, { dir: 1, anda: w > 0 && w < 1, sostiene: w >= 1 && t < fa(.87) ? [g.barril[0] - 3, g.barril[1] + 3] : false });
};

// 3 · inserto, a ras de agua junto al casco: el agua del lago cae a la bahía; la perca salta, prueba el agua salada y pone cara de salada (gag)
let F3 = null;
const fondo3 = () => {
  const cielo = capa(() => { degr(0, 0, 319, 78, CIELO); });
  const costa = capa(() => {
    R.poligono([[96, 78], [130, 66], [170, 64], [214, 68], [250, 60], [290, 62], [320, 66], [320, 80], [96, 80]], hex('#5a8a4a'));
    for (let x = 98; x < 320; x++) for (let y = 60; y < 80; y++) { if (R.pget(x, y) !== hex('#5a8a4a')) continue; R.pset(x, y, hh(x, y) > 0.7 ? hex('#4a7a3a') : hh(x, y, 2) > 0.85 ? hex('#7aa05a') : hex('#5a8a4a')); }
    for (let k = 0; k < 16; k++) { const x = 140 + k * 11 + Math.round(hh(k, 1) * 5), y = 68 + Math.round(hh(k, 2) * 6), w = 4 + Math.round(hh(k, 3) * 4); R.rect(x, y - 5, x + w, y, K); R.rect(x + 1, y - 4, x + w - 1, y, [hex('#c87a5a'), hex('#e8dcc0'), hex('#a8584a')][k % 3]); R.rect(x, y - 7, x + w, y - 6, hex('#5a3a3a')); R.pset(x + 2, y - 3, hex('#3a3a5a')); }
    R.rect(204, 56, 205, 68, K); R.poligono([[202, 58], [204.5, 48], [207, 58]], hex('#8a8a96'));   // la aguja de la iglesia
    R.disco(118, 76, 7, K); R.disco(118, 76, 6, hex('#a8705a')); R.rect(111, 76, 125, 80, hex('#a8705a')); for (let x = 112; x < 125; x += 3) R.pset(x, 73, K);   // el fuerte redondo
    R.rect(96, 79, 320, 80, hex('#3a5a4a'));
  });
  const casco = capa(() => {
    const top = (x) => 52 + x * 6 / 60, bot = (x) => 150 - x * 10 / 70, der = (y) => 60 + (y - 56) * 12 / 94;
    for (let x = 0; x < 74; x++) for (let y = Math.round(top(x)); y <= Math.round(bot(x)); y++) { if (x > der(y)) continue; const fy = y - top(x);
      let c = (Math.floor(fy / 5) % 2) ? hex('#5a3a22') : hex('#6a4428'); if (Math.round(fy) % 5 === 0) c = hex('#3a2414'); if (hh(x, Math.floor(fy / 5)) > 0.93 && x % 9 === 0) c = hex('#2a1a10');
      if (fy > 18 && fy < 24) c = fy < 19.5 || fy > 22.5 ? K : hex('#e8dcb8');
      if (y > bot(x) - 14) c = hh(x, y) > 0.78 ? hex('#5a9a7a') : (y + x) % 4 === 0 ? hex('#9a5a2a') : hex('#b8743a');
      R.pset(x, y, c); }
    for (const gx of [10, 38]) { const gy = Math.round(top(gx) + 32); R.rect(gx, gy, gx + 11, gy + 8, K); R.rect(gx + 1, gy + 1, gx + 10, gy + 7, hex('#1a1210')); R.rect(gx + 4, gy + 3, gx + 12, gy + 5, hex('#2a2a2a')); R.pset(gx + 12, gy + 4, K); R.poligono([[gx, gy - 1], [gx + 11, gy - 1], [gx + 13, gy - 9], [gx + 2, gy - 9]], hex('#b83a2a')); R.linea(gx, gy - 1, gx + 2, gy - 9, K); R.linea(gx + 11, gy - 1, gx + 13, gy - 9, K); }
    for (let x = 0; x < 64; x++) { const y = Math.round(top(x)); R.rect(x, y - 3, x, y, hex('#8a6038')); R.pset(x, y - 3, hex('#c8955a')); R.pset(x, y + 1, K); }
    for (let x = 4; x < 62; x += 9) { const y = Math.round(top(x)); R.rect(x, y - 9, x + 1, y - 3, hex('#5a3a20')); R.pset(x, y - 9, hex('#c8955a')); }
    for (let x = 0; x < 62; x++) { const y = Math.round(top(x) - 8); R.pset(x, y, hex('#a87a48')); }
    for (let y = 56; y < 150; y++) R.pset(Math.round(der(y)) + 1, y, K);
  });
  return { cielo, costa, casco };
};
const p3 = (t) => {
  F3 = F3 || fondo3(); R.copiar(F3.cielo);
  nubes(t, 16, 44, NUBC, 5); pajaros(t, 3, 30, hex('#3a4a6a'));
  pegar(F3.costa);
  for (let k = 0; k < 3; k++) { const x = Math.round(150 + k * 62 + t * (1.2 + k * 0.4)) % 360 - 10, y = 82 + k * 2; R.poligono([[x - 9, y - 3], [x + 9, y - 3], [x + 7, y], [x - 7, y]], K); R.rect(x - 7, y - 2, x + 7, y - 1, hex('#3a2a1a'));
    for (const mx of [-4, 3]) { R.linea(x + mx, y - 3, x + mx, y - 19, K); R.rect(x + mx - 4, y - 16, x + mx + 3, y - 12, hex('#f0ece0')); R.rect(x + mx - 3, y - 11, x + mx + 2, y - 7, hex('#e0dcd0')); }
    for (let i = 0; i < 7; i++) R.pset(x - 9 + i * 3, y - 20 + Math.abs(i - 3), [hex('#c83a3a'), hex('#f2eee2'), hex('#2a4a9a')][i % 3]); }
  { const e = ((t - P3 + 0.3) % 2.6) / 2.6, x0 = 212 - Math.round(((t * 1.6) % 360)); if (e < 0.6) bocanada(204 + 62 + e * 10, 70 - e * 6, e / 0.6); }   // la salva lejana
  // el agua de la bahía, con brillos que corren más deprisa cuanto más cerca
  for (let y = 80; y < 180; y++) { const p = (y - 80) / 100, v = 4 + p * 26, w = 4 + p * 9;
    const base = dz(0, y, (p * 3) % 1) ? 0 : 0, c0 = p < 0.33 ? hex('#5a96c8') : p < 0.66 ? hex('#3a78b0') : hex('#2a5e98'), c1 = p < 0.33 ? hex('#4a86bc') : p < 0.66 ? hex('#2e6aa2') : hex('#22508a');
    for (let x = 0; x < 320; x++) { const k = Math.floor((x + t * v + y * 13) / w); let c = dz(x, y, (p * 3) % 1) ? c1 : c0;
      if (y % 3 === 0 && hh(k, y) > 0.84) c = hex('#a8d0ec'); else if (y % 3 === 1 && hh(k, y, 3) > 0.88) c = hex('#1e4a7a'); R.pset(x, y, c); } }
  for (let x = 0; x < 80; x++) { const y = Math.round(150 - x * 10 / 70) + 1; for (let j = 0; j < 4; j++) if (hh(x, j + Math.floor(t * 3)) > 0.4) R.pset(x, y + j, j === 0 ? hex('#e8f2f8') : hex('#1a3a5a')); }
  // el bote de remos con dos que saludan
  { const x = 238 + Math.round(Math.sin(t * 0.7) * 3), y = 112 + Math.round(Math.sin(t * 2.4)); R.poligono([[x - 12, y - 3], [x + 12, y - 3], [x + 9, y + 2], [x - 9, y + 2]], K); R.rect(x - 10, y - 2, x + 10, y + 1, hex('#e8dcc0')); R.linea(x - 10, y - 2, x + 10, y - 2, hex('#b83a2a'));
    for (const [dx, col] of [[-5, '#2a3a6a'], [4, '#6a3a2a']]) { R.rect(x + dx - 2, y - 9, x + dx + 2, y - 3, hex(col)); R.rect(x + dx - 1, y - 12, x + dx + 1, y - 10, hex('#f0c8a0')); const up = Math.sin(t * 8 + dx) > 0 ? 1 : 0; R.linea(x + dx + 2, y - 8, x + dx + 4, y - 12 - up, hex(col)); R.rect(x + dx + 3, y - 15 - up, x + dx + 6, y - 13 - up, K); }
    R.linea(x - 10, y, x - 18, y + 4, hex('#8a6a44')); R.linea(x + 10, y, x + 18, y + 4, hex('#8a6a44')); for (let i = -14; i <= 14; i += 3) R.pset(x + i, y + 3, hex('#a8d0ec')); }
  { const x = Math.round(196 - (t * 2.5) % 60), y = 98 + Math.round(Math.sin(t * 1.8)); R.poligono([[x - 14, y - 3], [x + 14, y - 3], [x + 10, y + 2], [x - 10, y + 2]], K); R.rect(x - 12, y - 2, x + 12, y, hex('#f2eee2')); R.linea(x - 12, y - 2, x + 12, y - 2, hex('#2a4a9a')); R.linea(x + 2, y - 3, x + 2, y - 30, K);
    R.poligono([[x + 3, y - 29], [x + 13, y - 5], [x + 3, y - 5]], hex('#f8f4e8')); R.poligono([[x + 1, y - 27], [x - 12, y - 5], [x + 1, y - 5]], hex('#e8e4d4')); R.linea(x + 3, y - 29, x + 13, y - 5, hex('#c8c4b4'));
    for (let i = 0; i < 8; i++) R.pset(x + 2 - i * 2, y - 30 + i * 3 + (Math.sin(t * 6 + i) > 0 ? 1 : 0), [hex('#c83a3a'), hex('#f2eee2'), hex('#2a4a9a')][i % 3]); for (let i = -14; i <= 14; i += 4) R.pset(x + i, y + 3, hex('#a8d0ec')); }
  { const x = 270 + Math.round(Math.sin(t * 0.5) * 4), y = 156 + Math.round(Math.sin(t * 2.2) * 1.2); R.rect(x - 3, y - 2, x + 3, y, hex('#f4f4f4')); R.rect(x - 3, y, x + 3, y, hex('#b8c0c8')); R.rect(x + 2, y - 5, x + 4, y - 3, hex('#f4f4f4')); R.pset(x + 5, y - 4, hex('#e8a040')); R.pset(x + 3, y - 4, K); R.rect(x - 4, y - 2, x - 2, y - 1, hex('#9aa4b0')); for (let i = -6; i <= 6; i += 3) R.pset(x + i, y + 2, hex('#a8d0ec')); }
  pegar(F3.casco);
  // los banderines de la borda, que se mecen
  for (let i = 0; i < 9; i++) { const x = 2 + i * 7, y = Math.round(44 + i * 0.9 + Math.sin(i * 0.9) * 1.5), sw = Math.round(Math.sin(t * 5 + i) * 1.5); R.pset(x, y, hex('#5a4a3a')); R.pset(x + 3, y + 1, hex('#5a4a3a'));
    R.poligono([[x, y + 1], [x + 5, y + 1], [x + 2 + sw, y + 7]], [hex('#c83a3a'), hex('#f2eee2'), hex('#2a4a9a')][i % 3]); }
  // el barril inclinado sobre la borda, sujeto por la mano del gobernador, y el chorro de agua dulce
  const an = 1.95 + Math.sin(t * 3) * 0.04, bc = [34, 40];
  const B = (pts) => giro(bc[0], bc[1], pts, an);
  R.poligono(B([[-9, -11], [9, -11], [10, 0], [9, 11], [-9, 11], [-10, 0]]), K); R.poligono(B([[-8, -10], [8, -10], [9, 0], [8, 10], [-8, 10], [-9, 0]]), hex('#2a8a3a'));
  R.poligono(B([[-8, -10], [-3, -10], [-3, 10], [-8, 10], [-9, 0]]), hex('#4aaa4a'));
  for (const v of [-6, 6]) { const [p, q] = B([[-9, v], [9, v]]); R.linea(p[0], p[1], q[0], q[1], hex('#3a3a3a')); const [p2, q2] = B([[-9, v + 1], [9, v + 1]]); R.linea(p2[0], p2[1], q2[0], q2[1], hex('#8a8a8a')); }
  { const [m] = B([[0, -11]]); R.disco(m[0], m[1], 3, hex('#1a4a2a')); }
  const [boca] = B([[0, -12]]);
  for (let i = 0; i < 40; i++) { const u = i / 40, x = boca[0] + u * 34, y = boca[1] + u * u * 84 + 0; R.pset(Math.round(x), Math.round(y), (i + Math.floor(t * 30)) % 4 ? hex('#b8e0f4') : hex('#ffffff')); R.pset(Math.round(x) + 1, Math.round(y), hex('#7ab8e0')); if (hh(i, Math.floor(t * 12)) > 0.8) R.pset(Math.round(x) + 2, Math.round(y) - 1, hex('#e8f6ff')); }
  const ix = boca[0] + 34, iy = boca[1] + 84;
  for (let k = 0; k < 3; k++) { const r = 2 + ((t * 1.4 + k / 3) % 1) * 9; aro(ix, iy + 1, r, hex('#d8eef8')); }
  for (let k = 0; k < 5; k++) { const e = (t * 2 + k / 5) % 1; R.pset(Math.round(ix - 4 + k * 2 + e * (k - 2) * 2), Math.round(iy - Math.sin(e * Math.PI) * 7), hex('#ffffff')); }
  T.brazo(R, -12, 62, 12, 50, '#1c1c24', 1, { puno: '#f2eee2' });
  // la perca: cae con el chorro, se zambulle, asoma, prueba el agua y pone cara de salada; escupe y salta hacia el barril
  const f0 = P3 + 0.12, f1 = fa(.97), sube = fa(1.01), prueba = fa(1.05), salada = fs(0.01), escupe = fs(0.07), salta = fs(0.1);
  if (t >= f0 && t < f1) { const u = tramo(t, f0, f1); pez(boca[0] + u * 34, boca[1] + u * u * 84 - 4, lerp(0.3, 1.5, u), t, { dir: 1 }); }
  if (t >= f1 && t < f1 + 0.5) { const e = tramo(t, f1, f1 + 0.5); for (let k = 0; k < 8; k++) { const q = k / 8 * Math.PI; R.pset(Math.round(ix + Math.cos(q) * (4 + e * 10)), Math.round(iy - Math.sin(q) * 10 * Math.sin(e * Math.PI)), hex('#ffffff')); } }
  if (t >= sube && t < salta) { const e = tramo(t, sube, sube + 0.25), y = Math.round(lerp(148, 140, e)); R.recorte([0, 0, 319, 141]);
    pez(150, y, -1.15, t, { dir: 1, cara: t > salada ? 2 : t > prueba ? 1 : 0 }); R.recorte(null);
    for (let k = -6; k <= 6; k++) R.pset(150 + k, 142, Math.abs(k) > 3 ? hex('#d8eef8') : hex('#ffffff'));
    if (t > salada) { R.icono('!', 160, 106, hex('#e8402a'), K); for (let k = 0; k < 3; k++) { const yy = 118 - k * 4 - Math.round(((t * 6) % 4)); for (let i = 0; i < 5; i++) R.pset(136 + k * 9 + i, yy + (i % 2), hex('#7ac040')); } }
    if (t > escupe) { const e2 = tramo(t, escupe, escupe + 0.35); for (let k = 0; k < 6; k++) { const q = e2 * (1 + k * 0.12); R.pset(Math.round(158 + q * 26), Math.round(122 - Math.sin(q * 2.2) * 10 + q * 12), hex('#d8f0ff')); } } }
  if (t >= salta) { const e = tramo(t, salta, P4 - 0.05); pez(lerp(150, 70, e), 140 - Math.sin(e * Math.PI * 0.9) * 80, lerp(-1.3, -2.2, e), t, { dir: 1, cara: 2 }); }
};

// 4 · el porqué: el mapa del continente; la lupa enseña el puerto hondo y protegido; la ruta sube por el río y el canal
// hasta los Grandes Lagos, el trigo brota en el medio oeste y baja en sacos hasta Nueva York, y de allí sale al mundo
const RUTA4 = [[-74.0, 40.7], [-73.95, 41.2], [-73.94, 41.75], [-73.8, 42.4], [-73.75, 42.68], [-74.9, 42.95], [-75.8, 43.08], [-76.9, 43.1], [-77.6, 43.16], [-78.7, 43.0], [-78.9, 42.88], [-79.8, 42.35], [-81.7, 41.6], [-83.0, 41.75], [-83.1, 42.3], [-82.5, 43.0], [-82.3, 44.3], [-83.5, 45.6], [-84.8, 45.8], [-86.3, 45.3], [-87.0, 44.0], [-87.5, 42.6], [-87.6, 41.9]];
const TRIGO = [[-88.6, 40.4], [-86.8, 39.9], [-85.2, 40.6], [-83.4, 40.2], [-89.4, 41.4], [-87.8, 39.0], [-84.3, 39.5], [-86.1, 41.3], [-90.2, 40.0], [-82.4, 39.6]];
let LB = null;
const espiga = (x, y, h) => { x = Math.round(x); y = Math.round(y); const H = Math.round(9 * h); if (H < 1) return; for (const dx of [-2, 0, 2]) { R.linea(x, y, x + dx, y - H, hex('#a8862a')); R.rect(x + dx - (dx < 0 ? 1 : 0), y - H - 2, x + dx + (dx > 0 ? 1 : 0), y - H, hex('#f0c840')); R.pset(x + dx, y - H - 3, hex('#f8e080')); } R.rect(x - 1, y - Math.round(H / 2), x + 1, y - Math.round(H / 2), hex('#c84a2a')); R.pset(x - 2, y + 1, K); R.pset(x + 2, y + 1, K); };
const velero = (x, y, t) => { x = Math.round(x); y = Math.round(y); R.rect(x - 4, y - 1, x + 4, y, K); R.rect(x - 3, y - 1, x + 3, y - 1, hex('#7a4a2a')); R.linea(x, y - 1, x, y - 9, K); R.poligono([[x + 1, y - 9], [x + 5, y - 3], [x + 1, y - 3]], hex('#f8f4e8')); R.poligono([[x - 1, y - 8], [x - 4, y - 3], [x - 1, y - 3]], hex('#e0dccc')); R.pset(x, y - 10, hex('#c83a3a')); };
const corte = (cx, cy, t, A) => {
  degr(cx - 34, cy - 34, cx + 34, cy - 9, [hex('#76aade'), hex('#b4d2ea'), hex('#dceaf0')]); nube(cx - 12 + Math.round(t * 2) % 20, cy - 26, 14, NUBC);
  for (let y = cy - 8; y <= cy + 34; y++) { const p = (y - cy + 8) / 30; for (let x = cx - 34; x <= cx + 34; x++) R.pset(x, y, dz(x, y, (p * 2) % 1) ? (p < 0.5 ? hex('#3a78b0') : hex('#1e4a80')) : (p < 0.5 ? hex('#4a8ac0') : hex('#2a5a90'))); }
  for (let x = cx - 34; x <= cx + 34; x++) { const yb = cy + 21 + Math.round(Math.sin(x * 0.4) * 0.8); for (let y = yb; y <= cy + 34; y++) R.pset(x, y, hh(x, y) > 0.8 ? hex('#a8885a') : hex('#c8a870')); }
  // el cabo que protege: roca y hierba; fuera, las olas grandes del Atlántico que rompen contra él
  R.poligono([[cx + 8, cy + 22], [cx + 11, cy - 6], [cx + 14, cy - 16], [cx + 19, cy - 18], [cx + 24, cy - 12], [cx + 26, cy + 22]], hex('#7a5a3a'));
  for (let y = cy - 18; y < cy + 22; y++) for (let x = cx + 8; x < cx + 27; x++) if (R.pget(x, y) === hex('#7a5a3a') && hh(x, y) > 0.7) R.pset(x, y, hex('#5a4228'));
  R.poligono([[cx + 12, cy - 9], [cx + 14, cy - 17], [cx + 19, cy - 19], [cx + 24, cy - 13], [cx + 22, cy - 11], [cx + 16, cy - 13]], hex('#5a8a3a'));
  for (let x = cx + 26; x <= cx + 34; x++) { const sy = cy - 8 + Math.round(Math.sin(x * 0.7 - t * 7) * 3 * A); for (let y = cy - 14; y < sy; y++) R.pset(x, y, R.pget(x, y)); for (let y = sy; y < cy - 8; y++) R.pset(x, y, hex('#4a8ac0')); R.pset(x, sy, hex('#ffffff')); }
  if (A > 0) for (let k = 0; k < 7; k++) { const e = (t * 1.6 + k / 7) % 1; R.pset(Math.round(cx + 26 - e * 6 + k % 3), Math.round(cy - 10 - Math.sin(e * Math.PI) * 10 * A), hex('#ffffff')); }
  // el barco grande, quieto en el agua mansa y honda, con su ancla hasta el fondo
  const by = cy - 8 + Math.round(Math.sin(t * 2) * 0.6);
  R.poligono([[cx - 26, by - 3], [cx + 2, by - 3], [cx - 2, by + 4], [cx - 22, by + 4]], K); R.poligono([[cx - 25, by - 2], [cx + 1, by - 2], [cx - 3, by + 3], [cx - 21, by + 3]], hex('#5a3a22')); R.linea(cx - 25, by - 2, cx + 1, by - 2, hex('#c8955a')); R.linea(cx - 14, by + 4, cx - 12, by + 9, K);
  for (const mx of [-18, -8]) { R.linea(cx + mx, by - 3, cx + mx, by - 22, K); R.rect(cx + mx - 5, by - 19, cx + mx + 4, by - 14, hex('#f4f0e4')); R.rect(cx + mx - 4, by - 12, cx + mx + 3, by - 7, hex('#e4e0d4')); }
  R.rect(cx - 7, by - 24, cx - 4, by - 22, hex('#c83a3a'));
  R.linea(cx + 1, by - 1, cx + 5, cy + 19, hex('#3a3a46'), 2); R.linea(cx + 3, cy + 17, cx + 7, cy + 17, K); R.linea(cx + 5, cy + 14, cx + 5, cy + 19, K); R.pset(cx + 3, cy + 16, K); R.pset(cx + 7, cy + 16, K);
  // la cota de lo hondo
  R.linea(cx - 30, cy - 6, cx - 30, cy + 19, hex('#f8f0b0'), 2); R.linea(cx - 32, cy - 4, cx - 30, cy - 6, hex('#f8f0b0')); R.linea(cx - 28, cy - 4, cx - 30, cy - 6, hex('#f8f0b0')); R.linea(cx - 32, cy + 17, cx - 30, cy + 19, hex('#f8f0b0')); R.linea(cx - 28, cy + 17, cx - 30, cy + 19, hex('#f8f0b0'));
};
const p4 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.4, centro: [-80, 41.5], rosa: [298, 74] });
  const ny = P([-74.0, 40.7]).map(Math.round);
  // el corazón del continente que se enciende y el trigo que brota
  const hc = tramo(t, fs(.5), fs(.56)), [hx, hy] = P([-86.6, 40.4]).map(Math.round);
  if (hc > 0) for (let y = hy - 26; y <= hy + 26; y++) for (let x = hx - 34; x <= hx + 34; x++) { const d = Math.hypot((x - hx) / 34, (y - hy) / 26); if (d < 1 && dz(x, y, hc * (1 - d) * 0.7)) R.pset(x, y, mez(R.pget(x, y), hex('#f0c040'), 0.45)); }
  TRIGO.forEach((p, k) => { const h = tramo(t, fs(.57) + k * 0.09, fs(.57) + k * 0.09 + 0.35); if (h > 0) { const [x, y] = P(p); espiga(x, y, h); } });
  // la ruta: del puerto, río arriba, por el canal y los lagos hasta Chicago
  const ruta = RUTA4.map((p) => P(p)), ur = tramo(t, fs(.38), fs(.57));
  if (ur > 0) { const off = ruta.map(([x, y]) => [x + 1, y + 1]); trazo(off, ur, hex('#3a2a1a')); trazo(ruta, ur, (x, y, k) => ((k + Math.floor(t * 12)) % 6 < 3 ? hex('#f0c840') : hex('#2a6ab0'))); if (ur < 1) { const [x, y] = sobre(ruta, ur); R.disco(Math.round(x), Math.round(y), 2, hex('#fff4c0')); } }
  // los sacos de trigo que bajan hacia Nueva York y los veleros que salen al mundo
  const sb = tramo(t, fs(.6), fs(.64));
  if (sb > 0) for (let k = 0; k < 4; k++) { const u = 1 - ((t - fs(.6)) * 0.22 + k / 4) % 1; const [x, y] = sobre(ruta, u); saco(x, y + 3, 0.5); }
  if (t > fs(.4)) for (let k = 0; k < 3; k++) { const e = ((t - fs(.4)) * 0.16 + k / 3) % 1; velero(ny[0] + 8 + e * (330 - ny[0]), ny[1] + 6 + k * 7 + Math.round(e * 10), t); }
  // la lupa: en «deep» se abre sobre el puerto; en «sheltered» rompen las olas fuera del cabo; se va en «river»
  const ab = tramo(t, P4 + 0.02, fs(.2)) * (1 - tramo(t, fs(.37), fs(.41)));
  if (ab > 0) {
    const cx = Math.min(268, ny[0] + 36), cy = Math.min(140, ny[1] + 34), r = Math.round(32 * ab), A = tramo(t, fs(.23), fs(.27));
    for (let k = 0; k < 4; k++) R.linea(ny[0] + k % 2, ny[1] + (k >> 1), cx - r * 0.7, cy - r * 0.7, hex('#c8a040'), 2);
    LB = LB || R.nuevo(); const pv = R.usar(LB); corte(cx, cy, t, A); R.usar(pv);
    for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) R.pset(x, y, LB[y * 320 + x]);
    const ra = Math.round(r * 0.7), hx2 = cx + ra + 14, hy2 = cy + ra + 14;
    R.linea(cx + ra, cy + ra, hx2, hy2, K); R.linea(cx + ra + 1, cy + ra, hx2 + 1, hy2, hex('#6a3a1a')); R.linea(cx + ra, cy + ra + 1, hx2, hy2 + 1, hex('#8a5a2a')); R.linea(cx + ra + 1, cy + ra + 1, hx2 + 1, hy2 + 1, hex('#6a3a1a'));
    for (let q = 0; q < 6.283; q += 0.02) { const c = Math.cos(q), s2 = Math.sin(q); R.pset(Math.round(cx + c * (r + 1)), Math.round(cy + s2 * (r + 1)), q > 3.6 && q < 5.4 ? hex('#f0d878') : hex('#c8a040')); R.pset(Math.round(cx + c * (r + 2)), Math.round(cy + s2 * (r + 2)), hex('#8a6a20')); R.pset(Math.round(cx + c * (r + 3)), Math.round(cy + s2 * (r + 3)), K); }
    for (let q = 3.7; q < 4.4; q += 0.05) R.pset(Math.round(cx + Math.cos(q) * (r - 4)), Math.round(cy + Math.sin(q) * (r - 4)), hex('#ffffff'));
    if (ab > 0.5) T.brazo(R, 336, 200, hx2 + 6, hy2 + 4, '#3a3a4a', -1, { codo: [318, 196] });
  }
  R.disco(ny[0], ny[1], 2 + Math.round((Math.sin(t * 5) + 1)), hex('#c83a3a')); R.pset(ny[0], ny[1], hex('#ffffff'));
};

// 5 · el canal: la barcaza de trigo baja tirada por las mulas; la esclusa se llena; el patrón saluda en «sails out to the world»
const p5 = (t) => {
  const g = T.puerto(R, t, { encuadre: 'canal', esclusa: tramo(t, P5 + 0.2, fs(.86)), barcaza: lerp(0.12, 0.62, tramo(t, P5, P6)) });
  const [bx, by] = g.barcaza, mundo = t > fs(.88);
  R.actor(EL.estibador, Math.round(bx) - 2, Math.round(by) - 4, t, { dir: 1, sostiene: !mundo ? [Math.round(bx) - 6, Math.round(by) - 6] : false, brazos: mundo, sonrisa: mundo });
  // el granjero que trae otro saco por la senda, con su perro
  const w = tramo(t, P5 + 0.1, P6 - 0.4), gx = Math.round(lerp(-14, 128, w));
  const m = R.actor(EL.emigrante2, gx, 166, t, { dir: 1, anda: w > 0 && w < 1, sostiene: [gx + 18, 150] }).mano; saco(m[0] + 3, m[1] + 6, 0.9);
  { const dx = gx + 26 + Math.round(Math.sin(t * 3) * 6), dy = 172, a = Math.floor(t * 8) % 2; R.rect(dx - 5, dy - 5, dx + 4, dy - 2, hex('#8a5a2a')); R.rect(dx + 3, dy - 8, dx + 7, dy - 4, hex('#8a5a2a')); R.pset(dx + 8, dy - 6, K); R.pset(dx + 6, dy - 7, K); R.rect(dx + 3, dy - 9, dx + 4, dy - 8, hex('#5a3a1a')); R.linea(dx - 5, dy - 4, dx - 8, dy - 7 + a, hex('#8a5a2a'));
    R.linea(dx - 4, dy - 2, dx - 4 - a, dy, hex('#6a4220')); R.linea(dx + 3, dy - 2, dx + 3 + a, dy, hex('#6a4220')); R.linea(dx - 2, dy - 2, dx - 2 + a, dy, hex('#6a4220')); R.linea(dx + 1, dy - 2, dx + 1 - a, dy, hex('#6a4220')); }
  for (let k = 0; k < 18; k++) { const x = Math.round(hh(k, 5) * 300) + 8, y = 150 + Math.round(hh(k, 6) * 26), c = [hex('#e8d040'), hex('#f2eee2'), hex('#c85a8a'), hex('#8a6ac8')][k % 4]; if (x > 140 && x < 210) continue; R.pset(x, y, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y - 1, c); R.pset(x, y - 2, c); R.pset(x, y + 1, hex('#3a6a2a')); }
  for (let x = 2; x < 96; x += 12) { R.rect(x, 162, x + 1, 176, hex('#6a4a2a')); R.pset(x, 162, hex('#a87a48')); } R.rect(0, 165, 97, 166, hex('#8a6a3a')); R.rect(0, 171, 97, 172, hex('#8a6a3a')); R.rect(0, 165, 97, 165, hex('#b08a50'));
  // la pila de sacos que espera en la orilla, con su carretón
  for (const [x, y] of [[254, 176], [266, 176], [260, 168], [278, 176]]) saco(x, y, 1);
  R.rect(286, 166, 312, 172, K); R.rect(287, 167, 311, 171, hex('#8a6a3a')); R.disco(292, 174, 4, K); R.disco(292, 174, 3, hex('#6a4a2a')); R.disco(306, 174, 4, K); R.disco(306, 174, 3, hex('#6a4a2a')); R.linea(312, 168, 319, 160, hex('#5a3a20'));
};

// 6 · la casa de contratación: la balanza; el estibador pone el saco de una tonelada; el precio baja de $100 a $10
let F6 = null;
const fondo6 = () => capa(() => {
  for (let y = 0; y < 106; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12 < 2) ? hex('#a8946a') : (x % 12 === 6 && y % 8 === 3) ? hex('#8a6a4a') : dz(x, y, 0.15) ? hex('#b8a47a') : hex('#c4b086'));
  R.rect(0, 0, 319, 5, hex('#5a3a22')); R.rect(0, 6, 319, 7, hex('#8a6038')); R.rect(0, 8, 319, 8, K);
  R.rect(0, 104, 319, 132, hex('#6a4428')); R.rect(0, 104, 319, 105, hex('#8a6038')); R.rect(0, 106, 319, 106, K);
  for (let x = 6; x < 320; x += 38) { R.rect(x, 110, x + 30, 128, hex('#5a3820')); R.rect(x, 110, x + 30, 110, hex('#3a2414')); R.rect(x, 128, x + 30, 128, hex('#8a5a32')); R.rect(x, 110, x, 128, hex('#3a2414')); R.rect(x + 30, 110, x + 30, 128, hex('#8a5a32')); }
  for (let y = 133; y < 180; y++) { const p = (y - 133) / 47; for (let x = 0; x < 320; x++) { const cx = (x - 160) / (0.6 + p * 0.8) + 160, seam = Math.round(cx) % 22 === 0, junta = (y + Math.floor(cx / 22) * 7) % 19 === 0; R.pset(x, y, seam || junta ? hex('#4a2e18') : dz(x, y, p * 0.6) ? hex('#8a5e36') : hex('#9a6a3e')); } }
  R.rect(0, 132, 319, 132, hex('#3a2414'));
  // la alfombra
  R.poligono([[96, 150], [224, 150], [244, 176], [76, 176]], hex('#7a2a2a')); R.poligono([[100, 152], [220, 152], [238, 174], [82, 174]], hex('#a83a32')); for (let x = 110; x < 220; x += 8) R.pset(x, 162, hex('#e8b840'));
  // la ventana al puerto (el exterior se pinta en cada fotograma)
  R.rect(14, 20, 98, 94, K); R.rect(16, 22, 96, 92, hex('#5a3a22')); R.rect(16, 92, 96, 96, hex('#8a6038')); R.rect(12, 96, 100, 99, hex('#6a4428'));
  // las cortinas
  for (const [x0, d] of [[6, 1], [96, -1]]) for (let y = 19; y < 104; y++) for (let i = 0; i < 12; i++) { const x = x0 + i, w = Math.sin(i * 1.2 + y * 0.03); R.pset(x, y, w > 0.5 ? hex('#c84a3a') : w > -0.3 ? hex('#a83a2e') : hex('#7a2a22')); }
  R.rect(4, 17, 110, 18, hex('#c8a040')); R.disco(4, 17, 2, hex('#e8c860')); R.disco(110, 17, 2, hex('#e8c860'));
  // el cuadro del velero
  R.rect(176, 66, 212, 94, hex('#c8a040')); R.rect(178, 68, 210, 92, hex('#8a6a20')); degr(180, 70, 208, 90, [hex('#5a88b8'), hex('#a8c8e0')]); R.rect(180, 84, 208, 90, hex('#2a5a8a')); R.linea(188, 83, 200, 83, K); R.linea(194, 83, 194, 72, K); R.poligono([[195, 73], [201, 81], [195, 81]], hex('#f4f0e4')); R.poligono([[193, 74], [188, 81], [193, 81]], hex('#e4e0d4'));
  // las estanterías con los libros de cuentas
  R.rect(234, 50, 306, 104, hex('#4a2e18')); R.rect(236, 52, 304, 102, hex('#2a1a10'));
  for (const sy of [68, 86, 102]) R.rect(234, sy, 306, sy + 2, hex('#7a5232'));
  for (let k = 0; k < 3; k++) { let x = 238; let i = 0; while (x < 300) { const w = 3 + Math.round(hh(i, k) * 3), h = 10 + Math.round(hh(i, k, 2) * 5), c = [hex('#8a2a2a'), hex('#2a4a6a'), hex('#3a5a2a'), hex('#8a6a2a'), hex('#5a2a4a')][Math.floor(hh(i, k, 3) * 5)];
    const base = [67, 85, 101][k]; R.rect(x, base - h, x + w, base, c); R.rect(x, base - h, x, base, K); R.pset(x + 1, base - h + 3, hex('#e8c860')); R.pset(x + 1, base - 3, hex('#e8c860')); x += w + 1; i++; } }
  // la mesa de escribir con el libro abierto, el tintero y la pluma
  R.rect(244, 112, 316, 116, hex('#7a5232')); R.rect(244, 112, 316, 112, hex('#a87a48')); R.rect(248, 117, 250, 140, hex('#5a3820')); R.rect(310, 117, 312, 140, hex('#5a3820'));
  R.poligono([[256, 111], [272, 109], [288, 111], [272, 112]], hex('#f2eee2')); for (let i = 0; i < 5; i++) { R.linea(259, 110 - 0, 270, 110, hex('#a8a090')); } R.linea(272, 109, 272, 112, hex('#a8a090'));
  R.rect(292, 106, 297, 111, K); R.rect(293, 107, 296, 110, hex('#2a2a4a')); R.linea(296, 106, 302, 96, hex('#f2eee2')); R.linea(297, 106, 303, 97, hex('#c8c0b0'));
  // el reloj de pared
  R.disco(132, 34, 12, K); R.disco(132, 34, 11, hex('#8a5a2a')); R.disco(132, 34, 9, hex('#f2eadc')); for (let k = 0; k < 12; k++) R.pset(Math.round(132 + Math.cos(k * 0.5236) * 7), Math.round(34 + Math.sin(k * 0.5236) * 7), K);
  R.rect(126, 46, 138, 74, K); R.rect(127, 47, 137, 73, hex('#6a4428')); R.rect(129, 49, 135, 71, hex('#3a2414'));
});
const balanza = (t, cg, monedas, saco0) => {
  const pv = [160, 62], L = 58, tilt = cg, dy = Math.round(tilt * 9);
  const lx = pv[0] - L, ly = pv[1] + dy, rx = pv[0] + L, ry = pv[1] - dy;
  // la columna y su pie
  R.rect(150, 160, 170, 166, K); R.rect(151, 161, 169, 165, hex('#8a6a20')); R.rect(151, 161, 169, 161, hex('#e8c860')); R.rect(156, 66, 164, 160, K); R.rect(157, 66, 163, 160, hex('#c8a040')); R.rect(157, 66, 158, 160, hex('#f0d878')); R.rect(162, 66, 163, 160, hex('#8a6a20'));
  for (const yy of [90, 120, 150]) { R.rect(154, yy, 166, yy + 2, K); R.rect(155, yy, 165, yy + 1, hex('#e8c860')); }
  // el astil
  R.linea(lx, ly - 1, rx, ry - 1, K); R.linea(lx, ly, rx, ry, hex('#e8c860')); R.linea(lx, ly + 1, rx, ry + 1, hex('#a8862a')); R.linea(lx, ly + 2, rx, ry + 2, K);
  R.disco(pv[0], pv[1], 4, K); R.disco(pv[0], pv[1], 3, hex('#f0d878')); R.poligono([[pv[0] - 2, pv[1] - 4], [pv[0], pv[1] - 14], [pv[0] + 2, pv[1] - 4]], K); R.linea(pv[0], pv[1] - 12, pv[0], pv[1] - 5, hex('#c83a3a'));
  const plato = (x, y) => { const py = y + 64; for (const dx of [-12, 0, 12]) R.linea(x, y + 2, x + dx, py, hex('#8a8a92')); R.poligono([[x - 16, py], [x + 16, py], [x + 12, py + 5], [x - 12, py + 5]], K); R.poligono([[x - 15, py + 1], [x + 15, py + 1], [x + 11, py + 4], [x - 11, py + 4]], hex('#c8a040')); R.linea(x - 15, py + 1, x + 15, py + 1, hex('#f0d878')); return [x, py]; };
  const pl = plato(lx, ly), pr = plato(rx, ry);
  if (saco0) saco(pl[0], pl[1] + 1, 1.5);
  if (saco0) R.numero('1', pl[0] - 1, pl[1] - 4, { color: hex('#5a3a1a') });
  for (let k = 0; k < monedas; k++) { const x = pr[0] - 6 + (k % 3) * 6, y = pr[1] - 1 - Math.floor(k / 3) * 3; R.rect(x - 3, y - 2, x + 3, y, K); R.rect(x - 2, y - 2, x + 2, y - 1, hex('#f0c840')); R.pset(x - 2, y - 2, hex('#fff0a0')); }
  return { pl, pr, rx, ry };
};
const p6 = (t) => {
  F6 = F6 || fondo6(); R.copiar(F6);
  // por la ventana: el cielo, las nubes y los mástiles del puerto que pasan
  R.recorte([18, 22, 94, 90]);
  for (let y = 22; y <= 90; y++) for (let x = 18; x <= 94; x++) R.pset(x, y, y > 74 ? (dz(x, y, 0.4) ? hex('#2a5a8a') : hex('#3a6a9a')) : y > 70 ? hex('#7a8a7a') : dz(x, y, (y - 22) / 48) ? hex('#b4d2ea') : hex('#7cb2e4'));
  nube(40 + (t * 3) % 80, 34, 16, NUBC);
  for (let k = 0; k < 4; k++) { const x = Math.round(((k * 41 + t * 4) % 130) - 10); R.poligono([[x - 14, 76], [x + 14, 76], [x + 11, 82], [x - 11, 82]], hex('#2a1a10')); for (const mx of [-6, 6]) { R.linea(x + mx, 76, x + mx, 26, hex('#3a2a1a')); for (const yy of [34, 46, 58]) R.linea(x + mx - 7, yy, x + mx + 7, yy, hex('#3a2a1a')); R.poligono([[x + mx - 6, 47], [x + mx + 6, 47], [x + mx + 5, 57], [x + mx - 5, 57]], hex('#f0ece0')); } }
  gaviota(30 + (t * 9) % 70, 30 + Math.sin(t) * 3, t);
  R.recorte(null);
  R.rect(55, 20, 57, 92, hex('#5a3a22')); R.rect(16, 55, 96, 57, hex('#5a3a22'));
  // el péndulo del reloj
  { const a = Math.sin(t * Math.PI) * 0.3, ex = Math.round(132 + Math.sin(a) * 18), ey = Math.round(50 + Math.cos(a) * 18); R.linea(132, 50, ex, ey, hex('#c8a040')); R.disco(ex, ey, 2, hex('#e8c860')); const hm = t * 0.3; R.linea(132, 34, Math.round(132 + Math.cos(hm) * 6), Math.round(34 + Math.sin(hm) * 6), K); R.linea(132, 34, 132 + Math.round(Math.cos(-1.2) * 4), 34 + Math.round(Math.sin(-1.2) * 4), K); }
  // la vela de la mesa
  { const f = Math.sin(t * 13) > 0.3 ? 1 : 0; R.rect(262, 104, 266, 111, hex('#f2eee2')); R.rect(260, 111, 268, 112, hex('#c8a040')); R.pset(264, 102 - f, hex('#f0c840')); R.pset(264, 103, hex('#f8a040')); R.pset(264, 101 - f, hex('#fff4c0')); }
  // la balanza: sin el saco se va a la derecha; con el saco se equilibra; cuando el precio baja se inclina a la izquierda
  const puesto = t > fn(.07), baja = tramo(t, fn(.29), fn(.46)), precio = Math.round(lerp(100, 10, baja ** 0.8));
  const cg = puesto ? lerp(0, 0.9, baja) + Math.sin((t - fn(.07)) * 9) * 0.25 * Math.max(0, 1 - (t - fn(.07)) * 1.5) : -0.8;
  const mon = Math.max(1, Math.round(lerp(15, 2, baja)));
  const b = balanza(t, cg, mon, puesto);
  if (t > fn(.27)) { const e = tramo(t, fn(.27), fn(.3)), fin = t > fn(.46); R.numero('$' + precio, 232, Math.round(lerp(62, 50, e)), { tam: 16, centro: true, color: fin && Math.floor(t * 6) % 2 ? hex('#7ae07a') : undefined }); }
  // el comerciante quita monedas del platillo y las echa a la bolsa
  const coge = baja > 0 && baja < 1 && (t * 3) % 1 < 0.5;
  R.actor(EL.comerciante, 236, 168, t, { dir: -1, sostiene: coge ? [b.pr[0] + 10, b.pr[1] - 4] : [232, 154], sonrisa: t > fn(.47), habla: t > fn(.5) && Math.sin(t * 7) > 0 });
  R.rect(226, 150, 234, 158, K); R.rect(227, 151, 233, 157, hex('#8a6a3a')); R.rect(228, 149, 232, 150, hex('#5a3a1a')); R.pset(230, 154, hex('#f0c840'));
  if (coge) { const e = (t * 3) % 0.5 * 2; R.disco(Math.round(lerp(b.pr[0] + 8, 230, e)), Math.round(lerp(b.pr[1] - 6, 148, e) - Math.sin(e * Math.PI) * 8), 1, hex('#f0c840')); }
  // el estibador trae el saco al hombro, lo deja en «ton» y se queda mirando, con la boca abierta en «under ten»
  const v = tramo(t, P6 + 0.02, fn(.06)), ex = Math.round(lerp(20, 70, v));
  const m = R.actor(EL.estibador, ex, 168, t, { dir: 1, anda: v > 0 && v < 1, sostiene: !puesto ? [ex + 20, 140] : false, sorpresa: t > fn(.45), dedo: t > fn(.3) && t < fn(.44) }).mano;
  if (!puesto) saco(m[0] + 4, m[1] + 6, 1.5);
};

// 7 · South Street a la luz de la tarde: los muelles llenos de veleros; el comerciante los cuenta con el dedo; un coche pasa por delante
const p7 = (t) => {
  T.puerto(R, t, { encuadre: 'muelles' }); T.tinte(R, 0, 179, [255, 170, 90], 0.12);
  const w = tramo(t, P7, fn(.67)), cx = Math.round(lerp(96, 150, w));
  R.actor(EL.comerciante, cx, 168, t, { dir: 1, anda: w > 0 && w < 1, dedo: t > fn(.67) && t < fn(.86), sonrisa: t > fn(.8) });
  const e = tramo(t, P7 + 0.3, fn(.95)), sx = Math.round(lerp(248, 176, e));
  const m = R.actor(EL.estibador, sx, 164, t, { dir: -1, anda: e > 0 && e < 1, sostiene: [sx - 2, 140] }).mano; saco(m[0], m[1] + 4, 1.1);
  R.actor(EL.dama, 214, 170, t, { dir: -1, sonrisa: true, habla: t > fn(.7) && Math.sin(t * 6) > 0 });
  R.actor(EL.estibador2, 66, 166, t, { dir: 1, sostiene: [84, 158] }); { const r = Math.round((t * 6) % 3); R.disco(88 + r, 160, 6, K); R.disco(88 + r, 160, 5, hex('#8a5a2a')); R.linea(83 + r, 157, 93 + r, 157, hex('#4a4a4a')); R.linea(83 + r, 163, 93 + r, 163, hex('#4a4a4a')); }
  const c = tramo(t, fn(.82), fn(1.12)), kx = Math.round(lerp(380, -60, c));
  if (c > 0 && c < 1) { T.carruaje(R, kx, 177, t, { parte: 'detras', dir: -1, cochero: EL.estibador2 }); T.carruaje(R, kx, 177, t, { parte: 'delante', dir: -1 }); }
};

const efectos = [[fa(.18), 'lapiz'], [fa(.33), 'pop'], [fa(.5), 'ola'], [fa(.65), 'burbujas'], [fa(.86), 'boom'], [fa(.97), 'chof'], [fa(1.05), 'masca'], [fs(0.01), 'boing'], [fs(.17), 'brillo'], [fs(.24), 'ola'], [fs(.57), 'brillo'], [fs(.72), 'burbujas'], [fs(.89), 'silbato'], [fn(.07), 'golpecito'], [fn(.28), 'pop'], [fn(.46), 'brillo'], [fn(.68), 'silbato']];
const año = (t) => t < P4 ? 1825 : t < P6 ? 1830 : t < P7 ? Math.round(lerp(1830, 1850, tramo(t, fn(.29), fn(.46)))) : 1850;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1825', efectos, año });
''')

E['ny-brownstones'] = ('Brownstones', '''// NY-BROWNSTONES (frases 34–35), 1851 → 1873, sin cartela. Cuatro planos:
// 1. el viaducto de piedra (fondo local): la locomotora de 1850 cruza con su humo; delante, la calle nueva: la grúa sube un
//    bloque de piedra rojiza y en «rise» se asienta una hilera nueva; el chico saluda al tren; el cantero labra (corta en «reddish»);
// 2. la fila de brownstones a la luz de la tarde: el vecino sale por la puerta y baja la escalinata, la vecina llega por la
//    acera y en «famous brownstones» se saludan; un chico corre con el aro; el tren elevado pasa al fondo (corta en «And in 1858»);
// 3. la obra de Central Park, 1858: el cavador echa tierra, el carretillero cruza, voladura lejana en «Work begins»; en
//    «Central Park» el capataz desenrolla el plano del parque (corta en «where the lakes»);
// 4. el parque terminado: barcas y cisnes; el chico señala el lago y salta en «hills»; la pareja pasea; el jardinero planta
//    el último olmo y en «made by hand» le da unas palmadas a la tierra.''', LIB + r'''
const fb = (f) => en('brownstones', f), fp = (f) => en('parque', f);
const B2 = fb(.514), B3 = fp(0), B4 = fp(.583);   // «reddish», «And in 1858», «where the lakes»

// la locomotora de 1850 (chimenea de globo, quitapiedras, cabina roja), su ténder de leña y dos coches; x = el morro, y = los raíles
const ruedaT = (x, y, r, t, c = hex('#b83a2a')) => { R.disco(x, y, r, K); R.disco(x, y, r - 1, c); R.disco(x, y, Math.max(1, r - 3), hex('#3a2a2a')); const a = t * 14; for (let k = 0; k < 4; k++) { const q = a + k * Math.PI / 2; R.pset(Math.round(x + Math.cos(q) * (r - 2)), Math.round(y + Math.sin(q) * (r - 2)), hex('#e8c860')); } R.pset(x, y, hex('#e8c860')); };
const tren = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  for (const [c0, c1] of [[x - 140, x - 106], [x - 102, x - 68]]) { R.rect(c0, y - 21, c1, y - 5, K); R.rect(c0 + 1, y - 19, c1 - 1, y - 6, hex('#d8b040')); R.rect(c0 + 1, y - 19, c1 - 1, y - 18, hex('#f0d060')); R.rect(c0 + 1, y - 8, c1 - 1, y - 6, hex('#a83a2a')); R.rect(c0 - 1, y - 23, c1 + 1, y - 21, hex('#3a2a2a')); R.rect(c0 + 2, y - 24, c1 - 2, y - 24, hex('#5a4a4a'));
    for (let wx = c0 + 3; wx < c1 - 4; wx += 6) { R.rect(wx, y - 16, wx + 3, y - 11, K); R.rect(wx + 1, y - 15, wx + 2, y - 12, hex('#e8f0f4')); if (hh(wx, 3) > 0.5) { R.pset(wx + 1, y - 14, hex('#f0c8a0')); R.pset(wx + 2, y - 14, hex('#f0c8a0')); R.pset(wx + 1, y - 15, hex('#3a2a1a')); } }
    ruedaT(c0 + 6, y - 2, 3, t, hex('#3a3a3a')); ruedaT(c1 - 6, y - 2, 3, t, hex('#3a3a3a')); R.rect(c1 + 1, y - 9, c1 + 3, y - 8, K); }
  R.rect(x - 64, y - 14, x - 48, y - 4, K); R.rect(x - 63, y - 13, x - 49, y - 5, hex('#2a4a3a')); R.rect(x - 63, y - 13, x - 49, y - 12, hex('#e8c860'));
  for (let k = 0; k < 5; k++) { R.rect(x - 62 + k * 3, y - 17, x - 60 + k * 3, y - 14, hex('#7a5232')); R.pset(x - 61 + k * 3, y - 17, hex('#c89a5a')); } ruedaT(x - 60, y - 2, 3, t); ruedaT(x - 52, y - 2, 3, t);
  R.rect(x - 47, y - 27, x - 33, y - 7, K); R.rect(x - 46, y - 25, x - 34, y - 8, hex('#b83a2a')); R.rect(x - 49, y - 29, x - 31, y - 27, hex('#3a2a2a')); R.rect(x - 44, y - 23, x - 38, y - 18, K); R.rect(x - 43, y - 22, x - 39, y - 19, hex('#f0d878'));
  R.rect(x - 34, y - 17, x - 6, y - 7, K); R.rect(x - 33, y - 16, x - 7, y - 8, hex('#2a4a3a')); R.rect(x - 33, y - 16, x - 7, y - 15, hex('#4a7a5a')); for (const bx of [-28, -18, -10]) R.rect(x + bx, y - 16, x + bx, y - 8, hex('#e8c860'));
  R.rect(x - 24, y - 21, x - 19, y - 17, K); R.rect(x - 23, y - 20, x - 20, y - 17, hex('#e8c860'));
  R.rect(x - 14, y - 23, x - 11, y - 17, K); R.poligono([[x - 18, y - 30], [x - 7, y - 30], [x - 10, y - 23], [x - 15, y - 23]], K); R.poligono([[x - 17, y - 29], [x - 8, y - 29], [x - 11, y - 24], [x - 14, y - 24]], hex('#3a3a3a')); R.rect(x - 18, y - 31, x - 7, y - 30, hex('#5a5a5a'));
  R.rect(x - 8, y - 22, x - 3, y - 17, K); R.rect(x - 7, y - 21, x - 4, y - 18, hex('#e8c860')); R.pset(x - 3, y - 20, hex('#fff4c0'));
  R.poligono([[x - 6, y - 7], [x + 2, y], [x - 6, y]], hex('#b83a2a')); for (let k = 0; k < 3; k++) R.linea(x - 5, y - 6 + k * 2, x - 5 + k * 2, y, K);
  const a = t * 14; ruedaT(x - 40, y - 5, 5, t); ruedaT(x - 29, y - 5, 5, t); ruedaT(x - 12, y - 3, 3, t);
  const ox = Math.round(Math.cos(a) * 3), oy = Math.round(Math.sin(a) * 3); R.linea(x - 40 + ox, y - 5 + oy, x - 29 + ox, y - 5 + oy, hex('#c8c8d0')); R.linea(x - 29 + ox, y - 5 + oy, x - 20, y - 9, hex('#a8a8b0'));
};
let F1 = null;
const fondoB1 = () => {
  const cielo = capa(() => {
    degr(0, 0, 319, 112, CIELO);
    for (let k = 0; k < 26; k++) { const x = k * 13 + Math.round(hh(k, 1) * 6), h = 8 + Math.round(hh(k, 2) * 14), w = 8 + Math.round(hh(k, 3) * 6); R.rect(x, 108 - h, x + w, 112, hex('#a8a8c0')); R.rect(x, 108 - h, x, 112, hex('#9898b0')); for (let wy = 110 - h; wy < 108; wy += 4) for (let wx = x + 2; wx < x + w - 1; wx += 3) R.pset(wx, wy, hex('#8888a4')); }
    for (const sx of [46, 132, 238]) { R.rect(sx, 82, sx + 3, 108, hex('#9898b0')); R.poligono([[sx - 1, 84], [sx + 1.5, 70], [sx + 4, 84]], hex('#8a8aa4')); }
    for (let x = 0; x < 320; x++) for (let y = 112; y < 140; y++) R.pset(x, y, hh(x, y) > 0.82 ? hex('#7a9a52') : y < 118 ? hex('#8aa868') : dz(x, y, (y - 118) / 22) ? hex('#6a8a42') : hex('#7a9a4e'));
    for (let k = 0; k < 14; k++) { const x = 6 + k * 23 + Math.round(hh(k, 7) * 8), y = 116 + Math.round(hh(k, 8) * 8); R.disco(x, y - 4, 5, hex('#4a6a32')); R.disco(x - 1, y - 6, 3, hex('#6a8a42')); R.rect(x, y - 1, x, y + 2, hex('#5a3a20')); }
    for (const [x, y] of [[30, 124], [170, 120]]) { R.rect(x, y - 7, x + 12, y, K); R.rect(x + 1, y - 6, x + 11, y, hex('#e8dcc0')); R.poligono([[x - 1, y - 7], [x + 6, y - 12], [x + 13, y - 7]], hex('#8a3a2a')); R.rect(x + 5, y - 4, x + 7, y, hex('#5a3a20')); }
  });
  const viaducto = capa(() => {
    const pila = (x0, x1) => { for (let y = 64; y < 140; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - 64) / 5), junta = (y - 64) % 5 === 0 || (x + fila * 4) % 10 === 0; R.pset(x, y, junta ? hex('#6a5a4a') : hh(x, fila) > 0.8 ? hex('#a8907a') : x < x0 + 2 ? hex('#c8b098') : x > x1 - 3 ? hex('#8a7a66') : hex('#b8a08a')); } };
    for (let x = 0; x < 320; x++) for (let y = 62; y < 108; y++) { const k = Math.floor((x + 18) / 64), cx = k * 64 + 14 + 32 - 18, ins = (x - (cx)) ** 2 + ((y - 108) * 1.0) ** 2 < 24 * 24 && y > 80; if (ins) continue;
      const fila = Math.floor((y - 62) / 5), junta = (y - 62) % 5 === 0 || (x + fila * 4) % 10 === 0; R.pset(x, y, junta ? hex('#6a5a4a') : hh(x, fila) > 0.8 ? hex('#a8907a') : hex('#b8a08a')); }
    for (let k = -1; k < 6; k++) { const x0 = k * 64 - 4; if (x0 + 13 >= 0) pila(Math.max(0, x0), Math.min(319, x0 + 12)); }
    for (let k = 0; k < 6; k++) { const cx = k * 64 + 28; for (let q = Math.PI; q <= 2 * Math.PI; q += 0.02) { R.pset(Math.round(cx + Math.cos(q) * 24), Math.round(108 + Math.sin(q) * 24), hex('#6a5a4a')); R.pset(Math.round(cx + Math.cos(q) * 25), Math.round(108 + Math.sin(q) * 25), hex('#d0bca4')); } }
    R.rect(0, 58, 319, 63, hex('#8a7a66')); R.rect(0, 58, 319, 58, hex('#d0bca4')); R.rect(0, 64, 319, 65, hex('#5a4a3a'));
    for (let x = 2; x < 320; x += 8) { R.rect(x, 50, x + 1, 57, hex('#3a3a3a')); } R.rect(0, 50, 319, 50, hex('#3a3a3a')); R.rect(0, 54, 319, 54, hex('#5a5a5a'));
    R.rect(0, 57, 319, 57, hex('#4a4a52'));
  });
  const casas = capa(() => {
    // la primera casa terminada y la segunda a medio subir, con su andamio y la grúa de madera
    for (let y = 74; y < 146; y++) for (let x = 196; x < 256; x++) { const fila = Math.floor((y - 74) / 4); R.pset(x, y, (y - 74) % 4 === 0 || (x + fila * 5) % 12 === 0 ? hex('#5a3022') : hh(x, fila) > 0.85 ? hex('#7a4230') : hex('#8a4a36')); }
    R.rect(194, 70, 258, 75, K); R.rect(195, 71, 257, 74, hex('#6a3a2a')); for (let x = 198; x < 256; x += 6) R.rect(x, 75, x + 2, 77, hex('#5a3022'));
    for (const wy of [82, 104]) for (const wx of [202, 220, 238]) { R.rect(wx - 1, wy - 3, wx + 11, wy - 1, hex('#a86a52')); R.rect(wx, wy, wx + 10, wy + 14, K); R.rect(wx + 1, wy + 1, wx + 9, wy + 13, hex('#3a4a6a')); R.rect(wx + 5, wy + 1, wx + 5, wy + 13, hex('#e8dcc0')); R.rect(wx + 1, wy + 7, wx + 9, wy + 7, hex('#e8dcc0')); R.pset(wx + 2, wy + 2, hex('#a8c0e0')); R.rect(wx - 1, wy + 14, wx + 11, wy + 15, hex('#c8a890')); }
    R.rect(224, 126, 234, 146, K); R.rect(225, 127, 233, 146, hex('#3a2418')); R.disco(229, 127, 5, K); R.disco(229, 127, 4, hex('#3a2418'));
    for (let k = 0; k < 6; k++) R.rect(214 + k * 2, 140 + k, 244 - k * 2, 140 + k, hex('#7a4230'));
    for (let y = 104; y < 146; y++) for (let x = 258; x < 320; x++) { const fila = Math.floor((y - 104) / 4); R.pset(x, y, (y - 104) % 4 === 0 || (x + fila * 5) % 12 === 0 ? hex('#5a3022') : hh(x, fila) > 0.85 ? hex('#7a4230') : hex('#8a4a36')); }
    for (const wx of [266, 286, 304]) { R.rect(wx, 112, wx + 9, 126, hex('#1a1210')); }
    for (const px of [262, 290, 316]) { R.rect(px, 72, px + 1, 150, hex('#8a6a3a')); R.pset(px, 72, hex('#c89a5a')); }
    for (const py of [100, 128]) { R.rect(258, py, 319, py + 2, hex('#a87a48')); R.rect(258, py + 3, 319, py + 3, hex('#5a3a20')); }
    for (let k = 0; k < 8; k++) R.linea(262 + k * 7, 100, 266 + k * 7, 128, hex('#7a5a30'));
    R.rect(276, 66, 278, 100, hex('#6a4a2a')); R.linea(277, 66, 306, 70, hex('#6a4a2a')); R.linea(277, 67, 306, 71, hex('#8a6a3a')); R.linea(277, 66, 262, 100, hex('#8a6a3a'), 2);
  });
  const calle = capa(() => {
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 140) / 40; let c = dz(x, y, p * 0.7) ? hex('#8a6a48') : hex('#9a7a52'); if ((Math.abs(y - 158 - Math.sin(x * 0.05) * 2) < 1) || (Math.abs(y - 170 - Math.sin(x * 0.04 + 2) * 2) < 1)) c = hex('#6a4e34'); if (hh(x, y) > 0.94) c = hex('#b8986a'); if (hh(x >> 1, y >> 1, 4) > 0.97) c = hex('#a8a090'); R.pset(x, y, c); }
    for (const [cx, cy, w] of [[118, 164, 14], [40, 174, 10]]) for (let x = cx - w; x <= cx + w; x++) { const h = Math.round(Math.sqrt(1 - ((x - cx) / w) ** 2) * 2.5); for (let y = cy - h; y <= cy + h; y++) R.pset(x, y, hh(x, y) > 0.7 ? hex('#c8dcec') : hex('#7aa0c0')); }
    for (const [x, y] of [[150, 158], [162, 158], [156, 152], [172, 160], [140, 160]]) { R.rect(x - 5, y - 5, x + 5, y, K); R.rect(x - 4, y - 4, x + 4, y, hex('#8a4a36')); R.rect(x - 4, y - 4, x + 4, y - 4, hex('#a8604a')); R.pset(x - 2, y - 2, hex('#7a4230')); }
    for (let k = 0; k < 5; k++) { R.rect(204, 168 - k * 3, 250 - k * 4, 170 - k * 3, K); R.rect(205, 168 - k * 3, 249 - k * 4, 169 - k * 3, k % 2 ? hex('#b08a50') : hex('#c89a5a')); R.pset(249 - k * 4, 169 - k * 3, hex('#7a5a30')); }
    R.rect(262, 160, 274, 174, K); R.rect(263, 161, 273, 173, hex('#8a5a2a')); R.rect(263, 164, 273, 164, hex('#4a4a4a')); R.rect(263, 170, 273, 170, hex('#4a4a4a')); R.rect(264, 161, 266, 173, hex('#a87a48'));
    R.rect(184, 140, 190, 168, hex('#3a3a3a')); R.rect(182, 136, 192, 140, K); R.rect(183, 137, 191, 139, hex('#e8dcb0')); R.rect(181, 135, 193, 135, hex('#2a2a2a'));
  });
  return { cielo, viaducto, casas, calle };
};
const p1b = (t) => {
  F1 = F1 || fondoB1(); R.copiar(F1.cielo);
  nubes(t, 14, 40, NUBC, 5); pajaros(t, 4, 34, hex('#3a4a6a'));
  // el humo de la locomotora (detrás del viaducto no: va por encima del tren)
  const xf = (tt) => lerp(10, 460, tramo(tt, 0, B2 + 0.4) ** 0.9);
  for (let k = 0; k < 14; k++) { const te = Math.floor(t / 0.12) * 0.12 - k * 0.12; if (te < 0) continue; const e = (t - te) / 1.5, x = xf(te) - 12 - e * 16, y = 26 - e * 10; if (x > 262 || y < 16) continue; bocanada(x, y, e); }
  tren(xf(t), 57, t);
  pegar(F1.viaducto);
  // por los arcos: un carro lejano que va por el campo
  pegar(F1.casas);
  pegar(F1.calle);
  // la piedra que sube con la grúa y se asienta en «rise»: la fila nueva aparece
  const sube = tramo(t, fb(.08), fb(.33)), puesta = t > fb(.334);
  const by = Math.round(lerp(146, 98, sube)), bx = puesta ? 290 : 300;
  R.linea(306, 70, 306, by - 4, hex('#c8b088'));
  if (!puesta) { R.rect(bx - 9, by - 4, bx + 9, by + 5, K); R.rect(bx - 8, by - 3, bx + 8, by + 4, hex('#8a4a36')); R.rect(bx - 8, by - 3, bx + 8, by - 3, hex('#b8705a')); R.rect(bx - 8, by + 4, bx + 8, by + 4, hex('#5a3022')); R.pset(bx - 3, by, hex('#7a4230')); R.pset(bx + 4, by + 2, hex('#7a4230')); R.linea(bx, by - 4, 306, by - 4, hex('#c8b088')); }
  const fila = puesta ? 1 : 0; for (let k = 0; k < fila; k++) for (let x = 258; x < 320; x++) for (let y = 98; y < 104; y++) R.pset(x, y, (y === 98 || (x + 3) % 12 === 0) ? hex('#5a3022') : hex('#8a4a36'));
  if (puesta && t < fb(.334) + 0.4) for (let k = 0; k < 6; k++) R.pset(282 + k * 4, 96 - Math.round(((t - fb(.334)) * 20) % 4), hex('#d8c8a8'));
  R.actor(EL.estibador, 292, 128, t, { dir: -1, sostiene: !puesta ? [298, by] : false, sonrisa: puesta, dedo: puesta && t < fb(.334) + 0.8 });
  const tira = !puesta && sube > 0 && sube < 1, ty = tira ? Math.round(Math.sin(t * 9) * 2) : 0;
  R.actor(EL.estibador2, 238, 152, t, { dir: 1, sostiene: [254, 130 + ty] }); R.linea(254, 130 + ty, 263, 100, hex('#c8b088'));
  // el chico saluda al tren; el cantero labra un bloque
  const pasa = t > 0.5 && t < 3.2;
  R.actor(EL.hermanoMoore, 66, 170, t, { dir: 1, brazos: pasa && Math.sin(t * 8) > -0.3, sonrisa: pasa, salto: pasa && t > 1.6 && t < 2.2 ? Math.round(Math.sin((t - 1.6) / 0.6 * Math.PI) * 4) : 0 });
  const golpe = (t * 3) % 1; const m = R.actor(EL.emigrante, 120, 172, t, { dir: 1, sostiene: [138, golpe < 0.5 ? 152 : 160] }).mano;
  R.linea(m[0], m[1], m[0] + 3, m[1] - 4, hex('#7a5a30')); R.rect(m[0] + 2, m[1] - 6, m[0] + 5, m[1] - 4, hex('#5a5a62'));
  if (golpe > 0.5 && golpe < 0.7) for (let k = 0; k < 4; k++) R.pset(m[0] + 4 + k, m[1] + 2 - k * 2, hex('#d8b8a0'));
};

// 2 · la fila de brownstones a la luz de la tarde: el vecino sale por la puerta y baja la escalinata; la vecina pasea; los chicos con el aro
const p2b = (t) => {
  const g = T.puerto(R, t, { encuadre: 'brownstones', luz: 'tarde', coche: false, tren: tramo(t, B2, B2 + 3.5) });
  const sale = tramo(t, B2 + 0.2, B2 + 0.6), baja = tramo(t, B2 + 0.7, fb(.79));
  if (t > B2 + 0.1 && t < B2 + 1.2) { R.rect(138, 98, 148, 115, hex('#2a1810')); R.rect(139, 99, 147, 115, hex('#f0b860')); R.rect(139, 99, 147, 104, hex('#c88a40')); }
  const ys = g.escalones[2].ys, sy = baja <= 0 ? 116 : Math.round(lerp(116, 156, baja));
  if (sale > 0) R.actor(EL.comerciante, 136, sy, t, { dir: baja >= 1 ? -1 : 1, anda: baja > 0 && baja < 1, sonrisa: t > fb(.8), habla: t > fb(.8) && t < fb(.99) && Math.sin(t * 7) > 0 });
  const w = tramo(t, B2 + 0.1, fb(.78)), dx = Math.round(lerp(-16, 104, w));
  R.actor(EL.dama, dx, 160, t, { dir: 1, anda: w > 0 && w < 1, sonrisa: t > fb(.8), habla: t > fb(.9) && Math.sin(t * 6) > 0 });
  // los chicos: él corre con el aro por la acera; ella salta en la escalinata de la última casa
  const h = tramo(t, B2 + 0.4, B3 - 0.1), hx = Math.round(lerp(300, 168, h));
  R.actor(EL.hermanoMoore, hx, 166, t, { dir: -1, anda: h > 0 && h < 1, sonrisa: true });
  { const rx = hx - 6, ry = 160; R.disco(rx, ry, 6, K); R.disco(rx, ry, 5, hex('#c8a040')); R.disco(rx, ry, 4, K); R.disco(rx, ry, 3, R.pget(rx, ry - 20)); R.linea(hx + 2, 152, rx + 1, ry - 2, hex('#7a5a30')); }
  R.actor(EL.annie, 200, 140, t, { dir: 1, salto: Math.max(0, Math.round(Math.sin(t * 7) * 3)), sonrisa: true, brazos: t > fb(.8) });
};

// 3 · 1858, la obra de Central Park: el carretillero cruza, el cavador echa tierra, una voladura lejana en «Work begins»;
// en «Central Park» el capataz desenrolla el plano del parque
const p3b = (t) => {
  const g = T.puerto(R, t, { encuadre: 'parque', obra: 0 });
  const vol = tramo(t, fp(.35), fp(.35) + 1.8); if (vol > 0 && vol < 1) for (let k = 0; k < 6; k++) bocanada(236 + k * 5 - vol * 8, 96 - vol * 22 - (k % 3) * 4, Math.min(0.99, vol * 1.2), [hex('#9a8a72'), hex('#b8a88a'), hex('#d8c8a8')]);
  const dig = (t * 1.3) % 1, arriba = dig > 0.55;
  const m = R.actor(EL.estibador2, 92, 146, t, { dir: 1, sostiene: arriba ? [104, 130] : [108, 140] }).mano;
  pala(m[0], m[1], m[0] + (arriba ? -6 : 8), m[1] + (arriba ? -4 : 8), arriba);
  if (dig > 0.55 && dig < 0.8) { const e = (dig - 0.55) / 0.25; R.rect(Math.round(lerp(98, 70, e)), Math.round(126 - Math.sin(e * Math.PI) * 10), Math.round(lerp(98, 70, e)) + 1, Math.round(126 - Math.sin(e * Math.PI) * 10) + 1, hex('#6a4a2a')); }
  for (let k = 0; k < 9; k++) R.disco(64 + (k % 4) * 3, 146 - Math.floor(k / 4) * 2, 2, k % 2 ? hex('#6a4a2a') : hex('#7a5a36'));
  const plano = t > fp(.43), cx = 238;
  const c = R.actor(EL.comerciante, cx, 160, t, { dir: -1, dedo: t > fp(.5) && t < fp(.56), sostiene: !plano ? true : [cx - 8, 140], habla: t > fp(.44) && t < fp(.54) && Math.sin(t * 7) > 0 }).mano;
  if (!plano) { R.rect(c[0] - 2, c[1] - 6, c[0] + 1, c[1] + 4, K); R.rect(c[0] - 1, c[1] - 5, c[0], c[1] + 3, hex('#f2eee2')); }
  else { const e = tramo(t, fp(.43), fp(.47)), w = Math.round(lerp(2, 30, e)), x1 = c[0], x0 = x1 - w; R.rect(x0 - 1, c[1] - 12, x1 + 1, c[1] + 4, K); R.rect(x0, c[1] - 11, x1, c[1] + 3, hex('#f2eadc'));
    if (w > 10) { R.rect(x0 + 2, c[1] - 9, x1 - 2, c[1] + 1, hex('#5a9a4a')); R.rect(x0 + 2, c[1] - 9, x1 - 2, c[1] - 9, hex('#7aba5a')); const lx = Math.round((x0 + x1) / 2); R.rect(lx - 5, c[1] - 6, lx + 3, c[1] - 3, hex('#3a7ac0')); R.pset(lx + 4, c[1] - 5, hex('#3a7ac0')); for (const ax of [x0 + 4, x1 - 5, lx + 6]) R.disco(ax, c[1] - 1, 1, hex('#2a6a2a')); } }
  const w = tramo(t, B3 + 0.1, B4 - 0.2), wx = Math.round(lerp(-20, 200, w));
  const mw = R.actor(EL.estibador, wx, 174, t, { dir: 1, anda: w > 0 && w < 1, sostiene: [wx + 20, 166] }).mano; carretilla(wx + 30, 174, 1, mw[0], mw[1], true);
};

// 4 · el parque terminado: barcas y cisnes en el lago; el chico señala el lago y salta en «hills»; la pareja pasea;
// el jardinero planta el último olmo y en «made by hand» le da unas palmadas a la tierra
const p4b = (t) => {
  T.puerto(R, t, { encuadre: 'parque', obra: 1 });
  R.actor(EL.hermanoMoore, 128, 146, t, { dir: 1, dedo: t > fp(.6) && t < fp(.7), salto: t > fp(.7) && t < fp(.7) + 0.5 ? Math.round(Math.sin((t - fp(.7)) / 0.5 * Math.PI) * 5) : 0, sonrisa: t > fp(.6) });
  const w = tramo(t, B4, fp(1.1)), px = Math.round(lerp(4, 74, w));
  R.actor(EL.dama, px, 170, t, { dir: 1, anda: w > 0 && w < 1, sonrisa: true, habla: Math.sin(t * 2.4) > 0.6 });
  R.actor(EL.comerciante, px - 16, 171, t, { dir: 1, anda: w > 0 && w < 1, habla: Math.sin(t * 2.4) < -0.6 });
  const cava = tramo(t, B4 + 0.1, fp(.8)), dig = (t * 1.4) % 1, gx = 190;
  const planta = tramo(t, fp(.8), fp(.86)), palma = t > fp(.92) && t < fp(.92) + 0.8, seca = t > fp(.92) + 0.8;
  arbolito(gx + 26, 172, t, planta);
  const m = R.actor(EL.estibador2, gx, 172, t, { dir: 1, sostiene: palma ? [gx + 22, 168 + (Math.floor(t * 8) % 2) * 2] : cava < 1 ? (dig > 0.55 ? [gx + 18, 154] : [gx + 20, 162]) : true, dedo: seca, sonrisa: planta >= 1 }).mano;
  if (cava < 1) pala(m[0], m[1], m[0] + (dig > 0.55 ? 4 : 8), m[1] + (dig > 0.55 ? 2 : 8), dig > 0.55); else if (!palma) { R.linea(gx + 34, 172, gx + 38, 150, hex('#7a5a30')); R.rect(gx + 33, 170, gx + 37, 173, hex('#9aa0a8')); }
  for (let k = 0; k < 5; k++) R.disco(gx + 22 + k * 2, 173 - (k % 2), 2, hex('#6a4a2a'));
};

const efectos = [[fb(0), 'silbato'], [fb(.15), 'vapor'], [fb(.334), 'golpecito'], [B2 + 0.15, 'puerta'], [fp(.35), 'boom'], [fp(.43), 'papel'], [fp(.6), 'brillo'], [fp(.92), 'golpecito']];
const año = (t) => t < B2 ? 1851 : t < B3 ? 1855 : t < B4 ? 1858 : 1873;
T.rodar(E, R, [[0, p1b], [B2, p2b], [B3, p3b], [B4, p4b]], { efectos, año });
''')
