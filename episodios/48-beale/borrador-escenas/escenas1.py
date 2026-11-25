E = {}

# Ayudas comunes (se pegan al principio de cada cuerpo)
AYUDAS = r'''
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const ORO = pal('#7a4a10', '#c8901c', '#f0c040', '#fff0a0');
const capas = {};
const capa = (k, f) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } return capas[k]; };
// mezcla un color sobre lo que ya hay
const tine = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
// halo de luz tramado alrededor de (cx, cy)
const halo = (cx, cy, r, c, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const q = Math.floor(((1 - d) * (1 - d)) * 4 + BAY[y & 3][x & 3] / 16) / 4; if (q > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(0.9, q * a))); } };
// nube de bolitas en tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, cols, k) => { const n = Math.max(3, Math.round(w / 7)), r = (i) => 3 + hh(k, i, 3) * 3 + (i > 0 && i < n - 1 ? 2 : 0), X = (i) => Math.round(cx - w / 2 + (i + 0.5) * w / n);
  for (let i = 0; i < n; i++) R.disco(X(i), Math.round(cy + 1), r(i), cols[0]);
  for (let i = 0; i < n; i++) { R.disco(X(i), Math.round(cy), r(i) - 1, cols[1]); R.disco(X(i) - 1, Math.round(cy - 2), Math.max(1, r(i) - 3), cols[2]); } };
// pasa todo el lienzo por un tinte (a 0–1) hacia el color c
const velo = (c, a) => { if (a <= 0) return; const B = R.buf, cr = c & 255, cg = (c >>> 8) & 255, cb = (c >>> 16) & 255;
  for (let i = 0; i < 57600; i++) { const v = B[i], r = v & 255, g = (v >>> 8) & 255, b = (v >>> 16) & 255;
    B[i] = (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0; } };
// una hoja de árbol caída (elipse con su nervio), girada ang; c: [borde, cuerpo, nervio]
const hojaArbol = (x, y, ang, L, W, c) => { const ca = Math.cos(ang), sa = Math.sin(ang);
  for (let j = -W; j <= W; j += 0.5) for (let i = -L; i <= L; i += 0.5) { const e = (i / L) ** 2 + (j / W) ** 2; if (e > 1) continue;
    R.pset(Math.round(x + i * ca - j * sa), Math.round(y + i * sa + j * ca), e > 0.62 ? c[0] : Math.abs(j) < 0.5 ? c[2] : j < 0 ? c[1] : mez(c[1], c[0], 0.35)); }
  R.linea(Math.round(x + L * ca), Math.round(y + L * sa), Math.round(x + (L + 2) * ca), Math.round(y + (L + 2) * sa), c[0]); };
// el farol de Atom (asa arriba en x, y): cristal encendido, armazón y su luz que tiembla
const farol = (x, y, t, a = 1) => { x = Math.round(x); y = Math.round(y); const fl = 0.9 + Math.sin(t * 11) * 0.06 + Math.sin(t * 17) * 0.04;
  halo(x, y + 6, 36, hex('#ffc870'), 0.42 * a * fl);
  R.linea(x - 2, y - 1, x + 2, y - 1, K); R.pset(x - 3, y, K); R.pset(x + 3, y, K);
  R.rect(x - 3, y + 1, x + 3, y + 2, hex('#2a1e14')); R.rect(x - 2, y + 1, x + 2, y + 1, hex('#8a6a3a'));
  R.rect(x - 3, y + 3, x + 3, y + 9, hex('#2a1e14')); R.rect(x - 2, y + 3, x + 2, y + 9, hex('#ffe6a0')); R.rect(x - 1, y + 4, x + 1, y + 8, hex('#fff8e0'));
  R.pset(x, y + 6 + (Math.sin(t * 13) > 0 ? 0 : 1), hex('#ff9a30')); R.linea(x, y + 3, x, y + 9, hex('#c89a50'));
  R.rect(x - 4, y + 10, x + 4, y + 11, hex('#2a1e14')); R.rect(x - 3, y + 10, x + 3, y + 10, hex('#6a4a2a')); };
// una llave dorada (anilla a la izquierda) de unos 16 × 7 a escala 1
const llave = (x, y, s = 1, a = 1) => { const O = pal('#7a5010', '#c8901c', '#f0c040', '#fff0a0'); x = Math.round(x); y = Math.round(y);
  for (let j = -3 * s; j <= 3 * s; j++) for (let i = -3 * s; i <= 3 * s; i++) { const r = Math.hypot(i, j) / s; if (r > 3.4 || r < 1.4) continue; R.pset(x + i, y + j, r > 2.9 ? O[0] : j < 0 ? O[3] : O[2]); }
  R.rect(x + 3 * s, y - s, x + 13 * s, y + s - 1 + (s > 1 ? 0 : 1), O[1]); R.rect(x + 3 * s, y - s, x + 13 * s, y - s, O[3]); R.rect(x + 3 * s, y + s, x + 13 * s, y + s, O[0]);
  R.rect(x + 9 * s, y + s, x + 10 * s, y + 3 * s, O[1]); R.rect(x + 12 * s, y + s, x + 13 * s, y + 4 * s, O[1]); R.pset(x + 13 * s, y + 4 * s, O[0]); R.pset(x + 10 * s, y + 3 * s, O[0]); };
// destellos en estrella alrededor de (x, y)
const chispas = (x, y, t, n, r, c, sem = 0) => { for (let k = 0; k < n; k++) { const a = hh(k, 3, sem) * 6.28 + t * 0.8, d = r * (0.4 + hh(k, 4, sem) * 0.6), on = Math.sin(t * 9 + k * 2.3) > 0.2;
  if (!on) continue; const X = Math.round(x + Math.cos(a) * d), Y = Math.round(y + Math.sin(a) * d * 0.8); R.pset(X, Y, hex('#ffffff')); tine(X - 1, Y, c, 0.8); tine(X + 1, Y, c, 0.8); tine(X, Y - 1, c, 0.8); tine(X, Y + 1, c, 0.8); } };
// un pergamino pequeño en la mano (u 0–1 se desenrolla hacia abajo), con «1776» arriba
const rollo = (x, y, u, t) => { x = Math.round(x); y = Math.round(y); const L = Math.round(3 + u * 17), P = pal('#a88850', '#d8c08a', '#f0e2b8');
  for (let j = 0; j <= L; j++) for (let i = -7; i <= 7; i++) R.pset(x + i, y + j, Math.abs(i) === 7 ? P[0] : tono(P, 1.6 + (i < -3 ? 0.6 : 0) + hh(i, j) * 0.4, x + i, y + j));
  if (u > 0.4) for (let j = 7; j < L - 1; j += 2) for (let i = -5; i <= 5; i++) if (hh(i >> 1, j, 3) > 0.25) R.pset(x + i, y + j, hex('#6a5a4a'));
  if (u > 0.8) { R.pset(x - 3, y + 3, hex('#3a2a1a')); R.linea(x - 5, y + 4, x + 5, y + 4, hex('#3a2a1a')); }
  for (const yy of [y - 1, y + L + 1]) { R.rect(x - 8, yy - 1, x + 8, yy + 1, P[0]); R.rect(x - 8, yy - 1, x + 8, yy - 1, P[2]); R.pset(x - 9, yy, hex('#6a4a2a')); R.pset(x + 9, yy, hex('#6a4a2a')); } };
'''

E['bl-gancho'] = ('El gancho', '''// BL-GANCHO (frases 1–3). Doce planos cortados en la voz inglesa:
// 1. (0) el bosque de Bedford de noche bajo la luna, la hoja de números en el suelo con su haz de luna; Atom luciérnaga
//    entra por la izquierda en «fortune», baja a la hoja en «map» y la rodea con su órbita; GOLPE en «numbers»: la hoja
//    se enciende en oro y suben de ella 71, 194 y 38;
// 2. («Picture», 2026 → 1885) la imprenta de Lynchburg: Atom entra hasta el mostrador; en «pamphlet» el impresor deja la
//    prensa y le tiende un folleto amarillo; en «1885» brilla el almanaque; en «50 cents» Atom alza la moneda (brilla el
//    cartel de 50 ¢) y cambia la moneda por el folleto;
// 3. («and when») la mesa de cerca a la luz de la vela: Atom a escala 2 abre el folleto en «open»; en «no words» se
//    sorprende («?»); en «columns and columns» señala y una luz recorre las dos columnas de números;
// 4. («71») el suelo del bosque de noche (fondo local): 71, 194 y 38 caen en su palabra como hojas, meciéndose, hacia un
//    punto entre las raíces; Atom con su farol los sigue y se para a mirar donde caen;
// 5. («as if») el mapa de Virginia: los números quedan a la vista sobre el papel; Atom lo recorre con la lupa (en «plain
//    sight», un «?»); en «pamphlet swears» saca el folleto y una órbita rodea el condado de Bedford;
// 6. («says exactly») el corte del terreno (fondo local): arriba el bosque de noche, abajo las capas de tierra con raíces,
//    un topo y un gusano; en «corner» cae la chincheta en el suelo; Atom luciérnaga baja por la tierra en «Bedford County»
//    hasta la cámara de piedra; en «gold» y en «silver» brillan las ollas de hierro;
// 7. («And the most») la caja de hierro de cerca, con el candado roto: la tapa se abre y suben las tres hojas; en «three
//    pages» se encienden por turno; en «cracked» la del medio estalla en luz y Atom luciérnaga se sorprende;
// 8. («with a key») una biblioteca de día (fondo local): una lectora pasa la página, el bibliotecario empuja el carrito;
//    en «key» brilla una llave dorada junto a un rollo del estante; en «Declaration» Atom lo saca y lo desenrolla («1776»);
// 9. («And what it reveals») la mesa de lectura de cerca (fondo local): la Declaración desenrollada y las tres hojas; la
//    mano canónica señala la del medio, que se ilumina y, desde «inventory», se vuelve lingotes, monedas, joyas y ollas;
// 10. («The other two», 1898) la sesión de los Hart: el médium mueve las manos sobre la bola; en «where» Clayton alza la
//    hoja 1 («?» y un árbol) y en «for whom» George alza la 3 («?» y gente);
// 11. («have gone», 1934) la mesa del SIS: sube un «140» en «hundred and forty»; el lápiz canónico prueba en la hoja 1 y
//    luego en la 3, y en «not even» lo suelta;
// 12. («best code breakers») el aula del SIS: Friedman en la pizarra, dos descifradores en los pupitres y un tercero que
//    pasa con papeles; en «managing to read them» uno levanta los brazos, otro se hunde y Friedman se encoge («?»).''', AYUDAS + r'''
const g = (f) => en('giro', f), fo = (f) => en('folleto', f), cv = (f) => en('clave', f);
const fortune = g(0.2784), map = g(0.7684), numbers = g(0.8797), P2 = g(1.2621);
const pamphlet = fo(0.0402), y1885 = fo(0.0714), cents = fo(0.153), P3 = fo(0.1931), open = fo(0.2146), nowords = fo(0.2492), columns = fo(0.3031), columns2 = fo(0.3246);
const P4 = fo(0.3889), n71 = fo(0.4083), n194 = fo(0.456), n38 = fo(0.519), P5 = fo(0.5564), hide = fo(0.6034), plain = fo(0.6346), pamph2 = fo(0.7127), swears = fo(0.7273);
const P6 = fo(0.7722), corner = fo(0.8352), bedfordW = fo(0.8573), hiding = fo(0.9037), gold = fo(0.9314), silver = fo(0.9577), under = fo(0.9694);
const P7 = cv(0), three = cv(0.0873), cracked = cv(0.1397), P8 = cv(0.1708), key = cv(0.187), library = cv(0.2342), declaration = cv(0.2737);
const P9 = cv(0.3443), reveals = cv(0.3598), inventory = cv(0.3851), goldB = cv(0.4168), silverB = cv(0.4524), jewels = cv(0.4738), pots = cv(0.5223);
const P10 = cv(0.5579), where = cv(0.6421), whom = cv(0.7043), P11 = cv(0.7263), hundred = cv(0.7431), years = cv(0.7807), noteven = cv(0.8273);
const P12 = cv(0.8622), army = cv(0.9276), managing = cv(0.9568), fin = cv(0.9982);

// ── 1 · el bosque de Bedford de noche con la hoja ──────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'bosque', noche: true, hoja: true };
  const gB = T.bedford(R, t, o) || {};
  const [hx, hy] = gB.hoja || [170, 163];
  // GOLPE en «numbers»: la hoja se enciende y suben tres números
  const luz = t < numbers - 0.08 ? 0 : t < numbers + 0.3 ? 1 : Math.max(0.35, 1 - (t - numbers - 0.3) / 1.2);
  if (luz > 0) { halo(hx, hy - 2, 46, hex('#ffd860'), 0.55 * luz); chispas(hx, hy - 4, t, 10, 26, hex('#ffe890'), 1); }
  if (t > numbers) [['71', -14, 0], ['194', 6, 0.25], ['38', 18, 0.5]].forEach(([s, dx, d], k) => { const u = cl((t - numbers - d) / 1.8); if (u <= 0) return;
    const y = Math.round(hy - 8 - u * 46), x = Math.round(hx + dx + Math.sin(u * 5 + k) * 4);
    R.numero(s, x, y, { centro: true, rampa: ORO }); if (u > 0.85) tine(x, y - 3, hex('#0a1020'), (u - 0.85) * 4); });
  // Atom luciérnaga: entra por la izquierda en «fortune», baja a la hoja en «map» y la rodea
  const u1 = ease(tramo(t, fortune - 0.9, map - 0.1)), ang = (t - map) * 2.4;
  let ax = lerp(-12, hx - 34, u1), ay = lerp(96, hy - 34, u1) - Math.sin(u1 * Math.PI) * 26;
  if (t > map) { const r = tramo(t, map, map + 0.5); ax = lerp(ax, hx + Math.cos(ang + 3.6) * 30, r); ay = lerp(ay, hy - 16 + Math.sin(ang + 3.6) * 10, r); }
  if (t > map - 0.2) T.AT.anillo(R, hx, hy - 1, 30, 12, t, tramo(t, map - 0.2, numbers));
  T.AT.luciernaga(R, Math.round(ax), Math.round(ay + Math.sin(t * 3) * 2), t, { dir: t < map ? 1 : (Math.cos(ang + 3.6) > 0 ? -1 : 1), brillo: luz > 0.5 ? 1 : 0.75, cara: t > numbers ? 'sorpresa' : 'normal' });
  T.bedfordDelante(R, t, o);
};

// ── 2 · la imprenta: el folleto de 50 centavos ─────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'imprenta' };
  const gI = T.cuarto(R, t, o) || {};
  // el almanaque «1885» brilla en su palabra; el cartel de 50 ¢ en la suya
  const b1 = cl(1 - Math.abs(t - y1885 - 0.2) / 0.6), b2 = cl(1 - Math.abs(t - cents - 0.25) / 0.7);
  if (b1 > 0) { halo(188, 62, 22, hex('#fff0b0'), 0.6 * b1); chispas(188, 62, t, 5, 14, hex('#fff0b0'), 2); }
  if (b2 > 0) { halo(274, 93, 26, hex('#fff0b0'), 0.55 * b2); chispas(274, 93, t, 6, 18, hex('#fff0b0'), 3); }
  const pu = gI.puesto || [222, 148], pl = gI.palanca || [227, 114];
  // Atom entra hasta delante de la prensa
  const va = ease(tramo(t, P2 + 0.1, pamphlet + 0.3)), ax = Math.round(lerp(20, 188, va));
  const ofrece = t > pamphlet - 0.1, cambio = t > cents + 0.5;
  const imp = R.actor(T.BL.impresorBL, pu[0], pu[1], t, { dir: ofrece ? -1 : 1, sostiene: ofrece ? (cambio ? true : [pu[0] - 3, 128]) : pl, habla: ofrece && !cambio && t < y1885 + 0.8 && voz(t) > 0.2, sonrisa: cambio });
  if (ofrece && !cambio && imp && imp.mano) T.d_folleto(R, imp.mano[0] - 2, imp.mano[1] - 5, { escala: 0.5, t });
  const moneda = t > cents - 0.45 && !cambio;
  const pose = va > 0 && va < 1 ? 'camina' : moneda || cambio ? 'sostiene' : 'quieto';
  const r = T.AT.atom(R, ax, 150, t, { dir: 1, pose, cara: cambio ? 'sonrisa' : t > pamphlet ? 'sorpresa' : 'normal', habla: 0 });
  if (r && r.mano) { const [mx, my] = r.mano.map(Math.round);
    if (moneda) { R.disco(mx + 1, my - 3, 4, K); R.disco(mx + 1, my - 3, 3, ORO[2]); R.disco(mx, my - 4, 1, ORO[3]); if (t > cents - 0.1) { chispas(mx + 1, my - 3, t, 4, 8, ORO[3], 4); R.numero('50', mx + 1, my - 12 - Math.round(tramo(t, cents - 0.1, cents + 0.3) * 4), { centro: true, rampa: ORO }); } }
    if (cambio) T.d_folleto(R, mx + 2, my - 5, { escala: 0.5, t }); }
  T.cuartoDelante(R, t, o);
};

// ── 3 · la mesa de cerca: el folleto se abre ───────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  const o = { camara: 'mesa', vela: 0.35 };
  T.cuarto(R, t, o);
  T.cuartoDelante(R, t, o);
  const ab = ease(tramo(t, open - 0.2, open + 0.5));
  const F = T.d_folleto(R, 176, 138, { escala: 2, abierto: ab, t, brillo: tramo(t, columns - 0.2, columns + 0.4) * (1 - tramo(t, columns2 + 0.6, columns2 + 1.4)) }) || {};
  // la luz que recorre las dos columnas de números
  if (F.pagina && t > columns - 0.1) { const [x0, y0, x1, y1] = F.pagina, xm = (x0 + x1) >> 1;
    for (const [c0, c1, tt] of [[x0 + 1, xm, columns], [xm, x1 - 1, columns2]]) { const u = tramo(t, tt - 0.1, tt + 0.5); if (u <= 0) continue;
      const yy = Math.round(lerp(y0 + 2, y1 - 2, u)); for (let y = y0 + 1; y <= yy; y++) for (let x = c0; x <= c1; x++) if (((x + y) & 1) === 0) tine(x, y, hex('#ffe070'), 0.28 * (1 - u * 0.6)); } }
  // Atom a escala 2 sobre la mesa: empuja la tapa, se sorprende y señala las columnas
  const llega = ease(tramo(t, P3, open - 0.3)), ax = Math.round(lerp(40, 92, llega));
  const pose = llega > 0 && llega < 1 ? 'camina' : t < open + 0.5 ? 'brazos' : t > columns - 0.2 ? 'senala' : 'quieto';
  T.AT.atom(R, ax, 168, t, { s: 2, dir: 1, pose, cara: t > nowords - 0.1 && t < columns ? 'sorpresa' : t > columns ? 'sonrisa' : 'normal', habla: voz(t) });
  if (t > nowords - 0.05 && t < columns + 0.2) { const u = tramo(t, nowords - 0.05, nowords + 0.15); R.icono('?', ax - 5, Math.round(104 - u * 4), hex('#fff0a0'), K, 2); }
};

// ── 4 · el suelo del bosque de noche (fondo local) ─────────────────────────────────────────────────────────────────
const HOJAS_C = [pal('#2a1408', '#7a3a1e', '#a85a2a'), pal('#2a1c08', '#7a5a22', '#a8843a'), pal('#1e1008', '#5a2a18', '#7a4228'), pal('#240c0c', '#6a2420', '#8a3a2a'), pal('#1a1a0c', '#4a4a22', '#6a6a32')];
const SUELO = () => capa('suelo', () => {
  // el fondo de bruma: azul noche que se aclara hacia la bruma del fondo (y ~96)
  const SK = pal('#070a12', '#0c1220', '#121a2c', '#1a2438', '#243048', '#2e3c56');
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(SK, 1 + Math.max(0, 1 - Math.abs(y - 92) / 50) * 3.2 + hh(x >> 2, y >> 2) * 0.4, x, y));
  // follaje lejano: matas redondas azul verdosas, con el canto de arriba plateado
  for (let k = 0; k < 70; k++) { const cx = hh(k, 51) * 330 - 5, cy = 8 + hh(k, 52) * 84, r = 5 + hh(k, 53) * 11, lej = cy / 92;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.2) / r; if (d > 1 + (hh(Math.round(cx + i), Math.round(cy + j)) - 0.5) * 0.3) continue;
      const X = Math.round(cx + i), Y = Math.round(cy + j); if (X < 0 || X > 319 || Y < 0 || Y > 111) continue;
      R.pset(X, Y, tono(pal('#0a1014', '#0e181c', '#142224', '#1c2e30', '#2a3e44'), 1 + lej * 1.4 + (j < -r * 0.5 && i < r * 0.3 ? 1.2 : 0) + (hh(X >> 1, Y >> 1, k) > 0.7 ? 0.6 : 0), X, Y)); } }
  // troncos lejanos azulados en la bruma
  for (let k = 0; k < 16; k++) { const x0 = Math.round(hh(k, 7) * 312), w = 2 + Math.round(hh(k, 8) * 3);
    for (let y = 12; y < 112; y++) for (let x = x0; x < x0 + w; x++) R.pset(x, y, tono(pal('#141c2c', '#1c2638', '#26324a', '#30405a'), 1 + (x === x0 ? 1 : 0) + (y > 76 ? 1 : 0) + (hh(x, y >> 3) > 0.8 ? 0.5 : 0), x, y)); }
  // la bruma entre los dos términos
  for (let y = 70; y < 112; y++) for (let x = 0; x < 320; x++) if (hh(x >> 3, y >> 2, 4) > 0.35) R.pset(x, y, mez(R.pget(x, y), hex('#5a6a86'), 0.16 * (1 - Math.abs(y - 94) / 26)));
  // los troncos de en medio, con corteza en surcos, musgo, nudos y una rama
  for (const [x0, w] of [[24, 10], [100, 13], [168, 9], [214, 11]]) { for (let y = 0; y < 116; y++) for (let x = x0; x < x0 + w + (y > 104 ? (y - 104) : 0); x++) {
      const surco = Math.sin(x * 1.7 + Math.sin(y * 0.15) * 1.5) > 0.55 ? -0.9 : 0, mus = x - x0 < 4 && hh(x, y >> 1) > 0.6;
      R.pset(x, y, x === x0 ? hex('#08070a') : mus ? tono(pal('#1a2a1a', '#24381e', '#30482a'), 1 + hh(x, y), x, y) : tono(pal('#0e0a0c', '#1a1414', '#28201e', '#3a302c', '#4a4038'), 1.6 + (x - x0 < 3 ? 1.3 : 0) - (x - x0 > w - 3 ? 0.8 : 0) + surco + hh(x, y >> 2) * 0.5, x, y)); }
    R.disco(x0 + (w >> 1), 60 + (x0 % 30), 2, hex('#08070a')); R.pset(x0 + (w >> 1) - 1, 59 + (x0 % 30), hex('#3a302c'));
    const ry = 30 + (x0 % 20), d = x0 < 160 ? 1 : -1; for (let i = 0; i < 26; i++) { const yy = ry - Math.round(i * 0.5 + Math.sin(i * 0.4) * 2); R.pset(x0 + (d > 0 ? w : 0) + d * i, yy, hex('#1a1414')); R.pset(x0 + (d > 0 ? w : 0) + d * i, yy + 1, hex('#08070a')); } }
  // matas y helechos al pie de los troncos y un tronco caído con musgo
  for (let k = 0; k < 26; k++) { const bx = hh(k, 61) * 320, by = 104 + hh(k, 62) * 10, n = 5 + Math.floor(hh(k, 63) * 4);
    for (let f = 0; f < n; f++) { const a = -Math.PI / 2 + (f - n / 2) * 0.35; for (let i = 0; i < 9; i++) { const X = Math.round(bx + Math.cos(a) * i), Y = Math.round(by + Math.sin(a) * i * 0.9); R.pset(X, Y, i > 6 ? hex('#2e4a30') : hex('#1e3222')); if (i % 2) R.pset(X + 1, Y, hex('#16261a')); } } }
  for (let y = 102; y <= 110; y++) for (let x = 124; x <= 196; x++) { const e = Math.abs(y - 106) / 4; if (e > 1) continue; R.pset(x, y, y < 104 ? tono(pal('#1e3a1e', '#2a4a26', '#3a5a30'), 1 + hh(x, y) * 2, x, y) : tono(pal('#140e0c', '#241a16', '#342620'), 1.4 + (y < 106 ? 0.8 : 0) + (x % 7 === 0 ? -0.8 : 0), x, y)); }
  for (let y = 101; y <= 111; y++) for (let x = 196; x <= 202; x++) if (Math.hypot(x - 199, y - 106) < 5) R.pset(x, y, Math.hypot(x - 199, y - 106) < 3 ? (Math.hypot(x - 199, y - 106) < 1.5 ? hex('#5a4030') : hex('#3a2a20')) : hex('#140e0c'));
  // las copas arriba: racimos de hojas en tres tonos, con el canto plateado por la luna
  for (let k = 0; k < 46; k++) { const cx = hh(k, 71) * 330 - 5, cy = hh(k, 72) * 16, r = 7 + hh(k, 73) * 9; if (cx > 262) continue;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const X = Math.round(cx + i), Y = Math.round(cy + j); if (X < 0 || X > 319 || Y < 0 || Y > 111) continue; const d = Math.hypot(i, j) / r; if (d > 1 + (hh(X, Y, 2) - 0.5) * 0.35) continue;
      R.pset(X, Y, tono(pal('#05070a', '#0a1012', '#10181a', '#1a2628', '#3a4a58'), 1 + (j < -r * 0.4 ? 1 : 0) + (hh(X >> 1, Y >> 1, 3) > 0.72 ? 0.9 : 0) + (d > 0.85 && j > 0 && hh(X, Y) > 0.6 ? 2 : 0), X, Y)); } }
  // los haces de luna que bajan en diagonal entre los troncos
  for (let y = 10; y < 150; y++) for (let x = 0; x < 320; x++) { const b = (x - y * 0.45) % 90; if (b > 56 && b < 70 && ((x + y) & 1) === 0) R.pset(x, y, mez(R.pget(x, y), hex('#8a9ac0'), 0.1)); }
  // el roble grande de la derecha, con sus raíces que se abren sobre la hojarasca
  for (let y = 0; y < 150; y++) { const w = 34 + Math.max(0, y - 104) * 0.9; for (let x = Math.round(296 - w / 2); x < 320; x++) {
    const v = Math.sin(y * 0.4 + x * 1.3) > 0.5 ? 0 : 1, borde = x === Math.round(296 - w / 2);
    R.pset(x, y, borde ? hex('#08060a') : tono(pal('#140e0c', '#241a16', '#342620', '#4a3a30'), 1.2 + v + (x - (296 - w / 2) < 5 ? 1.2 : 0), x, y)); } }
  for (let k = 0; k < 18; k++) { let x = 282 + hh(k, 5) * 36; for (let y = 0; y < 150; y++) { x += Math.sin(y * 0.1 + k) * 0.3; if (y > 46 && hh(k, y >> 3) > 0.25) { R.pset(Math.round(x), y, hex('#0a0708')); R.pset(Math.round(x) - 1, y, hex('#4a3a30')); } } }
  for (let k = 0; k < 160; k++) { const x = 280 + Math.round(hh(k, 3) * 14), y = 50 + Math.round(hh(k, 4) * 90); R.pset(x, y, hex(hh(k, 6) > 0.5 ? '#3a5a2a' : '#4a6a32')); R.pset(x + 1, y, hex('#2a4a22')); }   // musgo
  // la hojarasca: suelo de y 108 hacia abajo, cada vez más cerca y más grande
  const FD = pal('#0c0806', '#1a120c', '#281a12', '#38261a');
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(FD, 1.2 + (y - 108) / 50 + hh(x >> 1, y >> 1) * 0.6, x, y));
  for (let k = 0; k < 900; k++) { const y = 108 + Math.pow(hh(k, 5), 0.8) * 74, p = (y - 108) / 72, x = hh(k, 6) * 330 - 5, c = HOJAS_C[Math.floor(hh(k, 7) * 5)];
    const L = 1.5 + p * 7, W = Math.max(1, L * 0.45), sombra = 0.25 + p * 0.75;
    hojaArbol(x, y, hh(k, 8) * 6.28, L, W, c.map((cc) => mez(cc, hex('#141a2a'), 0.55 - p * 0.35))); }
  // ramitas, bellotas, setas que brillan un poco y una piedra con musgo
  for (let k = 0; k < 22; k++) { const x = Math.round(hh(k, 11) * 300), y = Math.round(120 + hh(k, 12) * 56), l = 6 + Math.round(hh(k, 13) * 12); R.linea(x, y, x + l, y - Math.round(hh(k, 14) * 4), hex('#2a1e16')); R.linea(x, y + 1, x + l, y + 1 - Math.round(hh(k, 14) * 4), hex('#4a3626')); }
  for (const [x, y] of [[62, 160], [150, 172], [240, 140], [96, 132]]) { R.disco(x, y, 2, hex('#3a2410')); R.rect(x - 2, y - 3, x + 2, y - 2, hex('#5a4a2a')); R.pset(x - 1, y - 1, hex('#8a5a2a')); }
  for (const [x, y, s] of [[248, 146, 1], [256, 150, 0], [34, 166, 1]]) { R.rect(x, y - 4 - s, x + 1, y, hex('#d8d0b8')); for (let i = -3 - s; i <= 3 + s; i++) R.pset(x + i, y - 5 - s, hex('#e8e0c8')); for (let i = -2 - s; i <= 2 + s; i++) R.pset(x + i, y - 6 - s, hex('#f4ecd8')); }
  for (let y = 138; y <= 158; y++) for (let x = 14; x <= 52; x++) { const e = ((x - 33) / 19) ** 2 + ((y - 152) / 12) ** 2; if (e > 1 || y > 158) continue; R.pset(x, y, e > 0.85 ? hex('#141418') : y < 146 ? tono(pal('#2a4a2a', '#3a5a32', '#4a6a3a'), 1 + hh(x, y), x, y) : tono(pal('#2a2a32', '#3a3a44', '#4a4a56'), 1 + (x < 30 ? 1 : 0), x, y)); }
  // la bruma baja entre los troncos
  for (let y = 86; y < 116; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0 && hh(x >> 3, y >> 2) > 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#6a7a96'), 0.18));
});
const p4 = (t) => {
  R.copiar(SUELO());
  // vida: luciérnagas, una hoja de verdad que cae, la bruma que se arrastra
  for (let k = 0; k < 9; k++) { const x = (hh(k, 21) * 320 + t * (4 + k)) % 320, y = 70 + hh(k, 22) * 70 + Math.sin(t * 1.3 + k) * 6; if (Math.sin(t * 2.2 + k * 1.7) > 0) { tine(x, y, hex('#e8ff90'), 0.9); halo(x, y, 4, hex('#c8ff60'), 0.3); } }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.18 + k * 0.5) % 1); hojaArbol(60 + k * 150 + Math.sin(u * 12) * 10, u * 150, u * 9, 3, 2, HOJAS_C[k]); }
  for (let x = 0; x < 320; x += 2) { const y = 100 + Math.round(Math.sin(x * 0.05 + t * 0.6) * 3); tine(x + ((t * 6) | 0) % 2, y, hex('#8a9ab6'), 0.15); }
  // los números caen como hojas, cada uno en su palabra, hacia el claro entre las raíces
  const caen = [['71', n71, 120, 196, 148], ['194', n194, 210, 218, 154], ['38', n38, 150, 204, 160]];
  for (const [s, t0, x0, xf, yf] of caen) { if (t < t0 - 0.05) continue; const D = s === '38' ? 1.0 : 2.2, u = cl((t - t0) / D), e = ease(u);
    const x = Math.round(lerp(x0, xf, e) + Math.sin(u * 9) * 14 * (1 - u)), y = Math.round(lerp(36, yf, e));
    if (u < 0.15) halo(x, y - 6, 18, hex('#ffe070'), 0.5 * (1 - u / 0.15));
    R.numero(s, x, y, { centro: true, tam: 16, rampa: u >= 1 ? pal('#6a3a18', '#8a5a2a', '#a8743a', '#c89a50') : ORO });
    if (u >= 1) halo(x, y - 6, 16, hex('#ffd890'), 0.12); }
  // Atom con su farol sigue los números y se para a mirar dónde caen
  const va = ease(tramo(t, P4 + 0.1, n38 - 0.2)), ax = Math.round(lerp(26, 166, va));
  const r = T.AT.atom(R, ax, 158, t, { dir: 1, pose: va > 0 && va < 1 ? 'camina' : 'sostiene', cara: t > n38 ? 'sorpresa' : 'normal', habla: 0 });
  if (r && r.mano) farol(r.mano[0] + 1, r.mano[1] - 1, t);
  // los helechos de delante en las esquinas de abajo
  for (const [bx, d] of [[0, 1], [320, -1]]) for (let k = 0; k < 5; k++) { const a = -1.2 + k * 0.32 + Math.sin(t * 1.1 + k) * 0.04;
    for (let i = 0; i < 28; i++) { const x = bx + d * (i * Math.cos(a) * 1.1 + 6), y = 182 + i * Math.sin(a) * 1.4; R.pset(Math.round(x), Math.round(y), hex('#16261a'));
      if (i % 3 === 0 && i > 4) { R.linea(Math.round(x), Math.round(y), Math.round(x + d * 3), Math.round(y - 2), hex('#22381e')); R.linea(Math.round(x), Math.round(y), Math.round(x - d * 1), Math.round(y - 4), hex('#1c301c')); } } }
};

// ── 5 · el mapa de Virginia: a la vista de todos ────────────────────────────────────────────────────────────────────
const BEDFORD = [-79.52, 37.33];
const p5 = (t) => {
  const P = T.mapa(R, t, { zoom: 6, centro: [-78.6, 37.7] });
  const [bx, by] = P(BEDFORD).map(Math.round);
  // los números, quietos sobre el papel, a la vista de todos
  for (const [s, dx, dy] of [['71', -40, -18], ['194', 30, -30], ['38', -6, 22], ['1701', 64, 12], ['89', -70, 30]]) {
    const x = bx + dx, y = by + dy, lup = t > hide && Math.abs(x - (60 + (t - P5) * 32)) < 14; R.numero(s, x, y, { centro: true, rampa: lup ? ORO : pal('#3a2818', '#5a3a22', '#7a5030', '#8a6040') }); }
  if (t > swears - 0.1) { T.AT.anillo(R, bx, by - 2, 26, 12, t, tramo(t, swears - 0.1, swears + 0.8)); halo(bx, by, 22, hex('#ffe070'), 0.25 * tramo(t, swears, swears + 0.6)); }
  // Atom recorre el mapa con la lupa y luego saca el folleto
  const va = ease(tramo(t, P5 + 0.2, pamph2 - 0.4)), ax = Math.round(lerp(40, Math.min(250, bx + 56), va)), folleto = t > pamph2 - 0.2;
  const r = T.AT.atom(R, ax, 172, t, { s: 2, dir: folleto ? -1 : 1, pose: va > 0 && va < 1 ? 'camina' : 'sostiene', cara: t > plain - 0.1 && t < pamph2 ? 'sorpresa' : folleto ? 'sonrisa' : 'normal', habla: voz(t) });
  if (r && r.mano) { const [mx, my] = r.mano.map(Math.round);
    if (folleto) T.d_folleto(R, mx - 4, my - 10, { escala: 1, t, brillo: tramo(t, swears, swears + 0.5) }); else T.AT.lupa(R, mx, my, 2, 1); }
  if (t > plain - 0.1 && t < pamph2 - 0.2) R.icono('?', ax - 4, 108 - Math.round(tramo(t, plain - 0.1, plain + 0.1) * 4), hex('#fff0a0'), K, 2);
};

// ── 6 · el corte del terreno (fondo local) ─────────────────────────────────────────────────────────────────────────
const SUP = 68;   // la superficie
const CORTE = () => capa('corte', () => {
  const SK = pal('#080c18', '#0e1424', '#162038', '#1e2a48', '#2a3a5e');
  for (let y = 0; y < SUP; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(SK, 0.8 + y / SUP * 2.6 + Math.max(0, 1 - Math.hypot(x - 186, y - 26) / 60) * 1.5, x, y));
  R.disco(186, 26, 8, hex('#c8ccc0')); R.disco(185, 25, 7, hex('#e8ecd8')); R.pset(188, 24, hex('#c8ccc0')); R.disco(183, 28, 1, hex('#c8ccc0'));
  for (let k = 0; k < 34; k++) { const x = Math.round(hh(k, 31) * 270), y = Math.round(hh(k, 32) * 44); if (Math.hypot(x - 186, y - 26) > 13 && !(x > 20 && x < 172 && y < 22)) R.pset(x, y, hex('#9aa4c0')); }
  // los picos de Otter lejos y el bosque en la ladera
  for (let x = 0; x < 320; x++) { const pk = 46 - Math.max(0, 22 - Math.abs(x - 112) * 0.55) - Math.max(0, 12 - Math.abs(x - 190) * 0.18);
    for (let y = Math.round(pk); y < SUP; y++) R.pset(x, y, tono(pal('#1a2236', '#232c44', '#2c3650'), 1 + (y - pk) / 16 + (x < 112 && y < 40 ? 0.6 : 0), x, y)); }
  for (let x = 0; x < 320; x++) { const h = 6 + Math.round(Math.abs(Math.sin(x * 0.45)) * 6 + hh(x >> 1, 3) * 3);
    for (let y = SUP - h; y < SUP; y++) R.pset(x, y, tono(pal('#0a1210', '#121c18', '#1a2820'), 1 + (y === SUP - h ? 1 : 0) + hh(x, y) * 0.5, x, y)); }
  // el roble grande con las raíces que bajan por la tierra
  for (let y = 4; y < SUP; y++) for (let x = 226; x < 244 + Math.max(0, y - 56); x++) R.pset(x, y, x === 226 ? hex('#08060a') : tono(pal('#140e0c', '#241a16', '#342620'), 1 + (x < 231 ? 1 : 0) + (Math.sin(y * 0.6 + x) > 0.6 ? -0.6 : 0), x, y));
  for (let x = 200; x < 276; x++) for (let y = 0; y < 18 + Math.round(Math.sin(x * 0.2) * 4); y++) R.pset(x, y, tono(pal('#06080c', '#0e141a', '#162020'), 1 + (hh(x >> 1, y >> 1) > 0.6 ? 1 : 0), x, y));
  // la tierra en capas: mantillo con raíces, tierra parda con piedras, arcilla roja y la roca
  for (let y = SUP; y < 180; y++) { for (let x = 0; x < 320; x++) {
    const c1 = SUP + 22 + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.17) * 2, c2 = SUP + 58 + Math.sin(x * 0.04 + 2) * 5;
    const capaN = y < c1 ? 0 : y < c2 ? 1 : 2, P = [pal('#160e08', '#22160c', '#2e1e12', '#3c2818'), pal('#2a1a10', '#3a2416', '#4a301c', '#5a3c24'), pal('#3a1c12', '#4e2618', '#62321e', '#764028')][capaN];
    const v = 1.2 + hh(x >> 1, y >> 1, capaN) * 0.9 + (capaN === 1 && Math.sin(y * 0.9 + Math.sin(x * 0.08) * 3) > 0.85 ? 0.8 : 0) + (Math.abs(y - c1) < 1 || Math.abs(y - c2) < 1 ? -1 : 0);
    R.pset(x, y, tono(P, v, x, y)); } }
  // la hojarasca y la hierba de la superficie
  for (let x = 0; x < 320; x++) { R.pset(x, SUP, hex('#2a1e12')); R.pset(x, SUP + 1, tono(pal('#3a2414', '#5a3a1e', '#7a4a22'), 1 + hh(x, 1) * 2, x, SUP + 1)); if (hh(x, 7) > 0.6) { R.pset(x, SUP - 1, hex('#2a4a2a')); if (hh(x, 8) > 0.5) R.pset(x, SUP - 2, hex('#3a5a32')); } }
  // las piedras metidas en la tierra
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 41) * 320), y = Math.round(SUP + 8 + hh(k, 42) * 100), rx = 3 + Math.round(hh(k, 43) * 6), ry = 2 + Math.round(hh(k, 44) * 3);
    if (x > 112 && x < 220 && y > 118) continue;
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue; R.pset(x + i, y + j, e > 0.75 ? hex('#1a1210') : tono(pal('#4a4a52', '#5e5e66', '#76767e'), 1 + (j < 0 ? 1 : 0) + (i < 0 ? 0.4 : 0), x + i, y + j)); } }
  // gravilla y raicillas por toda la tierra
  for (let k = 0; k < 520; k++) { const x = Math.round(hh(k, 81) * 320), y = Math.round(SUP + 4 + hh(k, 82) * 106); if (x > 114 && x < 218 && y > 116) continue; R.pset(x, y, hh(k, 83) > 0.5 ? hex('#8a7a6a') : hex('#140c08')); if (hh(k, 84) > 0.8) R.pset(x + 1, y, hex('#5a4a3e')); }
  for (let k = 0; k < 30; k++) { let x = hh(k, 91) * 320, y = SUP + 2 + hh(k, 92) * 30; for (let i = 0; i < 14; i++) { x += hh(k, i, 1) - 0.5; y += 0.7; R.pset(Math.round(x), Math.round(y), hex('#4a3626')); } }
  // las raíces del roble, que se ramifican hacia abajo
  const raiz = (x, y, a, l, w, k) => { for (let i = 0; i < l; i++) { a += (hh(k, i, 5) - 0.5) * 0.3; x += Math.cos(a); y += Math.sin(a);
    for (let d = 0; d < w; d++) R.pset(Math.round(x + d), Math.round(y), d === 0 ? hex('#140c08') : hex(d === 1 ? '#5a4030' : '#3a2a1e'));
    if (i > 8 && i % 11 === 0 && w > 1 && k < 40) raiz(x, y, a + (hh(k, i) > 0.5 ? 0.7 : -0.7), l * 0.5, w - 1, k * 3 + i); } };
  raiz(230, SUP, 2.2, 60, 3, 1); raiz(238, SUP, 1.4, 70, 3, 2); raiz(244, SUP, 0.7, 64, 3, 3); raiz(234, SUP, 1.8, 40, 2, 4);
  // LA CÁMARA DE PIEDRA: muros de piedras encajadas y la tapa de losas
  for (let y = 120; y <= 174; y++) for (let x = 118; x <= 214; x++) { const muro = x < 126 || x > 206 || y < 128 || y > 168;
    if (muro) { const fila = Math.floor((y - 120) / 5), col = Math.floor((x + (fila % 2) * 4) / 9), junta = (y - 120) % 5 === 0 || (x + (fila % 2) * 4) % 9 === 0;
      R.pset(x, y, junta ? hex('#1a1614') : tono(pal('#3a3a40', '#4e4e56', '#62626a', '#76767e'), 1.2 + hh(col, fila) * 1.6 + (y < 124 ? 0.8 : 0), x, y)); }
    else R.pset(x, y, tono(pal('#0a0808', '#120e0c', '#1a1410'), 1 + (y - 128) / 30 + hh(x >> 1, y >> 1) * 0.4, x, y)); }
  // tres ollas de hierro dentro
  for (const cx of [140, 166, 192]) { for (let y = 146; y <= 167; y++) for (let x = cx - 10; x <= cx + 10; x++) { const e = ((x - cx) / 10) ** 2 + ((y - 157) / 10.5) ** 2; if (e > 1) continue; R.pset(x, y, e > 0.8 ? hex('#08080a') : tono(pal('#141418', '#22222a', '#32323c', '#46464e'), 1 + (x < cx - 3 ? 1.2 : 0) + (y < 152 ? 0.6 : 0), x, y)); }
    R.rect(cx - 9, 145, cx + 9, 147, hex('#08080a')); R.rect(cx - 8, 145, cx + 8, 145, hex('#4a4a54')); R.rect(cx - 12, 152, cx - 10, 154, hex('#22222a')); R.rect(cx + 10, 152, cx + 12, 154, hex('#22222a'));
    for (let i = -7; i <= 7; i++) { const h = Math.round(3 - Math.abs(i) * 0.35 + hh(i, cx) * 1.5); for (let j = 0; j < h; j++) R.pset(cx + i, 144 - j, tono(pal('#3a2a10', '#5a4418', '#6a5420'), 1 + (j === h - 1 ? 1 : 0), cx + i, 144 - j)); } }
});
const p6 = (t) => {
  R.copiar(CORTE());
  // vida: estrellas que titilan, una nube con canto de plata, un murciélago, el gusano y el topo
  for (let k = 0; k < 10; k++) if (Math.sin(t * 3 + k * 2.1) > 0.6) R.pset(Math.round(hh(k, 31) * 260), Math.round(hh(k, 32) * 40), hex('#ffffff'));
  nube(((t * 5 + 120) % 400) - 40, 30, 40, pal('#1a2236', '#2a3450', '#4a5a7a'), 3);
  { const x = Math.round(150 + Math.sin(t * 1.2) * 70), y = Math.round(28 + Math.sin(t * 2.3) * 6), a = Math.sin(t * 16) > 0 ? 1 : 0; R.pset(x, y, K); R.pset(x - 1, y - a, K); R.pset(x + 1, y - a, K); R.pset(x - 2, y - 1 + a, K); R.pset(x + 2, y - 1 + a, K); }
  { const gx = 60 + Math.round(Math.sin(t * 0.8) * 6); for (let i = 0; i < 9; i++) R.pset(gx + i, 96 + Math.round(Math.sin(i * 0.9 + t * 4)), i === 8 ? hex('#e8a0a0') : hex('#c87a7a')); }
  { const tx = Math.round(20 + ((t - P6) * 6) % 40), ty = 138; for (let j = -4; j <= 4; j++) for (let i = -6; i <= 6; i++) if ((i / 6) ** 2 + (j / 4) ** 2 <= 1) R.pset(tx + i, ty + j, j < -1 ? hex('#4a3a3a') : hex('#3a2a2a'));
    R.pset(tx + 6, ty, hex('#e8a0b0')); R.pset(tx + 7, ty, hex('#e8a0b0')); R.pset(tx + 3, ty - 2, K); R.rect(tx + 4, ty + 2, tx + 6, ty + 3, hex('#e8b0b8'));
    for (let i = 0; i < 30; i++) if (tx - 8 - i > 0) R.pset(tx - 8 - i, ty + (i % 4 < 2 ? 2 : 3), hex('#1a120c')); }
  // en «corner» cae la chincheta sobre la superficie, justo encima de la cámara
  if (t > corner) { const u = tramo(t, corner, corner + 0.25); halo(166, SUP - 2, 20, hex('#ffe070'), 0.4 * u); R.icono('X', 159, SUP - 16 - Math.round((1 - u) * 6), ORO[2], K, 3); }
  T.chincheta(R, 166, SUP + 1, t, hex('#d83a2a'), { baja: tramo(t, corner - 0.5, corner) });
  if (t > hiding - 0.2) { const u = tramo(t, hiding - 0.2, hiding + 0.6); for (let y = SUP + 4; y < SUP + 4 + u * 48; y += 3) R.pset(166, y, hex('#ffd860')); }
  // el oro y la plata brillan en su palabra
  const bo = tramo(t, gold - 0.1, gold + 0.3), bp = tramo(t, silver - 0.1, silver + 0.3);
  if (bo > 0) { halo(160, 146, 44, hex('#ffd040'), 0.45 * bo); for (const cx of [140, 192]) { for (let i = -6; i <= 6; i++) for (let j = 0; j < 4; j++) if (hh(i, j, cx) > 0.3) R.pset(cx + i, 144 - j, tono(ORO, 1.5 + hh(i, j) * 2 + Math.sin(t * 6 + i) * 0.4, cx + i, 144 - j)); chispas(cx, 140, t, 5, 10, ORO[3], cx); } }
  if (bp > 0) { halo(166, 144, 30, hex('#e8f0ff'), 0.4 * bp); for (let i = -6; i <= 6; i++) for (let j = 0; j < 4; j++) if (hh(i, j, 9) > 0.3) R.pset(166 + i, 144 - j, tono(pal('#6a7080', '#a8b0c0', '#e0e8f4', '#ffffff'), 1.5 + hh(i, j) * 2 + Math.sin(t * 6 + i) * 0.4, 166 + i, 144 - j)); chispas(166, 140, t, 5, 10, hex('#ffffff'), 7); }
  if (t > under - 0.1) halo(166, 150, 60, hex('#ffd860'), 0.18 * tramo(t, under - 0.1, under + 0.5));
  // Atom luciérnaga: espera junto a la chincheta y baja por la tierra hasta la cámara, alumbrándola
  const baja = ease(tramo(t, bedfordW - 0.2, gold - 0.2)), ax = lerp(lerp(110, 150, tramo(t, P6, corner)), 214, baja), ay = lerp(48, 136, baja);
  halo(ax, ay, 26, hex('#fff0b0'), 0.25);
  T.AT.luciernaga(R, Math.round(ax), Math.round(ay + Math.sin(t * 3) * 2), t, { dir: -1, brillo: 1, cara: t > gold ? 'sorpresa' : 'normal' });
};

// ── 7 · la caja de hierro abierta: las tres hojas ──────────────────────────────────────────────────────────────────
const p7 = (t) => {
  const ab = ease(tramo(t, P7 + 0.3, three - 0.4));
  const o = { encuadre: 'despacho', camara: 'caja', abierta: ab, roto: true };
  const gC = T.lynchburg(R, t, o) || {};
  const H = gC.hojas || [[138, 78], [164, 78], [190, 78]];
  // en «three pages» se encienden por turno; en «cracked» la del medio estalla en luz
  H.forEach((h, k) => { const [hx, hy] = Array.isArray(h) ? h : [h, 78]; const u = cl(1 - Math.abs(t - three - k * 0.22) / 0.3); if (u > 0 && ab > 0.9) halo(hx, hy, 18, hex('#fff0b0'), 0.5 * u); });
  const [cx, cy] = Array.isArray(H[1]) ? H[1] : [164, 78];
  if (t > cracked - 0.1 && ab > 0.9) { const u = tramo(t, cracked - 0.1, cracked + 0.3), dec = Math.max(0.5, 1 - (t - cracked - 0.3) / 1.2);
    halo(cx, cy, 40, hex('#ffd860'), 0.7 * u * dec); chispas(cx, cy, t, 12, 26, hex('#fff0a0'), 5);
    for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28, r1 = 18 + u * 6, r2 = r1 + 4 + u * 6; R.linea(Math.round(cx + Math.cos(a) * r1), Math.round(cy + Math.sin(a) * r1 * 0.8), Math.round(cx + Math.cos(a) * r2), Math.round(cy + Math.sin(a) * r2 * 0.8), ORO[3]); } }
  // Atom luciérnaga: entra por la derecha, mira cada hoja y se sorprende en «cracked»
  const ent = ease(tramo(t, P7 + 0.2, three - 0.6)), recorre = tramo(t, three - 0.2, cracked - 0.2);
  let ax = lerp(330, 252, ent), ay = lerp(70, 54, ent);
  if (t > three - 0.2) { const k = Math.min(2, Math.floor(recorre * 3)), hx = (Array.isArray(H[k]) ? H[k][0] : 138 + k * 26); ax = lerp(252, hx + 2, ease(cl(recorre * 3 - k)) * 0.5 + 0.5); ay = 40; }
  if (t > cracked - 0.2) { const u = ease(tramo(t, cracked - 0.2, cracked + 0.6)); ax = lerp(ax, 236, u); ay = lerp(ay, 50, u); }
  T.AT.luciernaga(R, Math.round(ax), Math.round(ay + Math.sin(t * 3) * 2), t, { dir: t > cracked ? -1 : (t > three - 0.2 ? 1 : -1), brillo: 0.9, cara: t > cracked - 0.05 ? 'sorpresa' : 'normal' });
};

// ── 8 · la biblioteca (fondo local) ─────────────────────────────────────────────────────────────────────────────────
const LOMOS = ['#6a2a22', '#2e4a5a', '#5a5a2a', '#4a2a4a', '#2a4a2e', '#7a4a1e', '#3a3a5a', '#8a6a3a'];
const estante = (x0, y0, x1, y1, baldas, k0) => {
  const MD = pal('#24140c', '#3a2214', '#52321e', '#6c4428', '#8a5a36');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, x === x0 || x === x1 ? K : tono(MD, 2 + (x - x0 < 3 ? 1 : 0) - (x1 - x < 3 ? 0.8 : 0) + Math.sin(y * 0.4 + x * 0.1) * 0.2, x, y));
  const h = Math.floor((y1 - y0 - 6) / baldas);
  for (let b = 0; b < baldas; b++) { const yb = y0 + 4 + (b + 1) * h, ya = yb - h + 3;
    for (let y = ya; y < yb; y++) for (let x = x0 + 4; x <= x1 - 4; x++) R.pset(x, y, tono(pal('#0c0806', '#160e0a', '#20140e'), 1 + (y - ya) / h, x, y));
    let x = x0 + 4; let k = k0 + b * 37;
    while (x < x1 - 6) { const w = 3 + Math.floor(hh(k, 1) * 4), alto = h - 4 - Math.floor(hh(k, 2) * 6), c = hex(LOMOS[Math.floor(hh(k, 3) * LOMOS.length)]), inc = hh(k, 4) > 0.93;
      if (hh(k, 5) > 0.9) { x += 3; k++; continue; }
      for (let i = 0; i < w && x + i < x1 - 4; i++) for (let j = 0; j < alto; j++) { const yy = yb - 1 - j, xx = x + i + (inc ? Math.round(j * 0.15) : 0);
        R.pset(xx, yy, i === 0 ? K : (j === alto - 4 || j === 3) && hh(k, 6) > 0.4 ? hex('#d8a840') : i === 1 ? mez(c, hex('#ffffff'), 0.18) : c); }
      x += w + (inc ? 2 : 0); k++; }
    for (let x = x0 + 2; x <= x1 - 2; x++) { R.pset(x, yb, MD[4]); R.pset(x, yb + 1, MD[3]); R.pset(x, yb + 2, K); } }
  for (let x = x0 - 2; x <= x1 + 2; x++) { R.pset(x, y0, K); R.pset(x, y0 + 1, MD[4]); R.pset(x, y0 + 2, MD[3]); } };
const BIBLIO = () => capa('biblio', () => {
  // techo de casetones, pared de yeso cálido (tranquila arriba a la derecha) y friso
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#6a5a48', '#7e6c56', '#928064', '#a89474'), 1.6 + hh(x >> 2, y >> 2) * 0.5 + (y < 20 ? -0.6 : 0), x, y));
  for (let x = 0; x < 320; x++) { for (let y = 0; y < 8; y++) R.pset(x, y, tono(pal('#24140c', '#3a2214', '#52321e'), 1 + (x % 40 < 3 ? 1 : 0), x, y)); R.pset(x, 8, K); R.pset(x, 9, hex('#c8a870')); R.pset(x, 10, hex('#8a6a42')); }
  // el yeso con una trama de flores de lis muy suave, pilastras y el friso de cuarterones de abajo
  for (let y = 12; y < 104; y++) for (let x = 0; x < 320; x++) if (((x + 6) % 14 === 0 && (y + 4) % 14 === 0) || ((x - 1) % 14 === 0 && y % 14 === 3) || ((x + 13) % 14 === 0 && y % 14 === 3)) if (!(x > 272 && y < 48)) R.pset(x, y, hex('#8a7860'));
  for (let y = 104; y < 146; y++) for (let x = 0; x < 320; x++) { const px = x % 40, pnl = px > 4 && px < 36 && y > 110 && y < 140, cant = px === 4 || px === 36 || y === 110 || y === 140;
    R.pset(x, y, y === 104 ? K : y < 108 ? tono(pal('#52321e', '#6c4428', '#8a5a36'), 2 - (y - 104) * 0.4, x, y) : cant ? hex('#2a1810') : tono(pal('#3a2214', '#4a2c1a', '#5c3820', '#6c4428'), 1.6 + (pnl ? 0.6 : 0) + Math.sin(x * 0.2 + y * 0.05) * 0.3 + hh(x >> 2, y) * 0.3, x, y)); }
  for (const px of [112, 184]) for (let y = 10; y < 146; y++) for (let x = px; x < px + 6; x++) R.pset(x, y, x === px || x === px + 5 ? hex('#5a4a38') : tono(pal('#8a7860', '#a08c70', '#b8a484'), 1.4 + (x === px + 1 ? 1 : 0), x, y));
  // la ventana alta en arco del centro, con su marco y el cielo (lo vivo lo pinta el plano)
  for (let y = 22; y <= 116; y++) for (let x = 120; x <= 180; x++) { const arco = y < 52 && Math.hypot(x - 150, y - 52) > 30; if (arco) continue;
    const marco = Math.hypot(x - 150, y - 52) > 26 && y < 52 || x < 124 || x > 176 || y > 112; if (marco) R.pset(x, y, tono(pal('#3a2214', '#52321e', '#6c4428'), 1.5 + (x < 126 ? 1 : 0), x, y)); }
  // estanterías a los lados
  estante(6, 20, 110, 146, 5, 1); estante(190, 20, 276, 146, 5, 7);
  // la escalera de mano apoyada en el estante de la derecha
  for (let y = 26; y < 150; y++) { const x1 = Math.round(250 + (y - 26) * 0.12); R.pset(x1, y, hex('#8a5a36')); R.pset(x1 + 1, y, hex('#52321e')); R.pset(x1 + 12, y, hex('#8a5a36')); R.pset(x1 + 13, y, hex('#52321e')); if ((y - 26) % 12 === 0) R.linea(x1 + 1, y, x1 + 12, y, hex('#6c4428')); }
  R.linea(186, 24, 280, 24, hex('#c8a040')); R.linea(186, 25, 280, 25, hex('#6a5020'));
  // a la derecha: un reloj de pared y un globo terráqueo en su pie (bajo la esquina de Atom, que queda lisa de yeso)
  R.disco(298, 70, 9, K); R.disco(298, 70, 8, hex('#c89a40')); R.disco(298, 70, 6, hex('#f4ead0')); for (let k = 0; k < 12; k++) R.pset(Math.round(298 + Math.cos(k / 12 * 6.28) * 5), Math.round(70 + Math.sin(k / 12 * 6.28) * 5), hex('#6a5a48'));
  R.rect(296, 79, 300, 100, hex('#52321e')); R.disco(298, 104, 4, hex('#c89a40'));
  R.rect(292, 128, 304, 146, hex('#3a2214')); R.rect(297, 118, 299, 128, hex('#c89a40')); R.disco(298, 110, 9, K); R.disco(298, 110, 8, hex('#3a6a8a')); for (let j = -6; j <= 6; j += 2) for (let i = -6; i <= 6; i++) if (hh(i >> 1, j, 3) > 0.5 && i * i + j * j < 50) R.pset(298 + i, 110 + j, hex('#6a8a4a'));
  // el suelo de espiga y la alfombra
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x + (y >> 2) * 4) >> 3) + (y >> 2); R.pset(x, y, (x + y * 2) % 16 === 0 ? hex('#2a1810') : tono(pal('#3a2414', '#52321e', '#6c4428', '#86583a'), 1.6 + (d % 2) * 0.7 + hh(x >> 3, y >> 2) * 0.4, x, y)); }
  for (let y = 158; y < 176; y++) for (let x = 118; x < 260; x++) { const b = y === 158 || y === 175 || x === 118 || x === 259, m = (y < 161 || y > 172 || x < 122 || x > 255); R.pset(x, y, b ? hex('#3a1a12') : m ? ((x + y) % 4 < 2 ? hex('#c89a40') : hex('#6a2a22')) : tono(pal('#4a1a18', '#6a2a22', '#8a3a2a'), 1 + Math.abs(Math.sin((x - 188) * 0.12) * Math.cos((y - 167) * 0.4)) * 2, x, y)); }
});
const p8 = (t) => {
  R.copiar(BIBLIO());
  // el cielo y las nubes por la ventana en arco, recortado a su hueco
  R.recorte([125, 24, 175, 111]);
  for (let y = 24; y <= 111; y++) for (let x = 125; x <= 175; x++) if (y >= 52 || Math.hypot(x - 150, y - 52) <= 25) R.pset(x, y, tono(pal('#6a9ac8', '#8ab4dc', '#aacce8', '#c8e0f0'), 3 - (y - 24) / 40, x, y));
  for (let k = 0; k < 3; k++) nube(((t * (3 + k * 2) + k * 60) % 110) + 110, 40 + k * 18, 22, pal('#a8b8d0', '#dce8f4', '#ffffff'), k);
  for (let k = 0; k < 6; k++) { const a = Math.sin(t * 1.2 + k) * 2; R.linea(125, 98 - k * 3, 140 + k * 2, 92 - k * 4 + Math.round(a), hex('#3a5a2a')); R.disco(140 + k * 2, 92 - k * 4 + Math.round(a), 2, hex('#4a7a3a')); }
  { const x = Math.round(170 - ((t * 14) % 60)), y = 46 + Math.round(Math.sin(t * 2) * 3), a = Math.sin(t * 14) > 0 ? 1 : 0; R.pset(x, y, K); R.pset(x - 1, y - a, K); R.pset(x + 1, y - a, K); }
  R.recorte(null);
  R.rect(149, 24, 151, 111, hex('#52321e')); R.rect(125, 70, 175, 71, hex('#52321e'));
  // el rayo de sol con motas
  for (let k = 0; k < 14; k++) { const u = (t * 0.06 + k / 14) % 1; tine(140 + u * 60 + Math.sin(t + k) * 3, 60 + u * 90, hex('#fff6d0'), 0.6); }
  // la lectora en la mesa del fondo pasa la página; el bibliotecario empuja el carrito
  const fase = (t - P8) / 1.6, pag = Math.floor(fase) % 2 === 1, vuelta = fase % 1;
  R.actor(T.BL.mujerAmigoBL, 74, 136, t, { dir: 1, dedo: pag && vuelta < 0.4, sonrisa: pag });
  // la mesa de lectura: tablero con su canto, patas torneadas, el libro abierto (pasa la hoja) y la lámpara verde
  for (let y = 128; y <= 152; y++) for (let x = 48; x <= 182; x++) { const top = y < 133, canto = y >= 133 && y <= 136, pata = y > 136 && ((x >= 52 && x <= 55) || (x >= 175 && x <= 178));
    if (!top && !canto && !pata) continue; R.pset(x, y, top ? tono(pal('#4a2c1a', '#6c4428', '#8a5a36', '#a8743a'), 2 + (y === 128 ? 1 : 0) + Math.sin(x * 0.15) * 0.3, x, y) : canto ? (y === 136 ? K : tono(pal('#2a1810', '#3a2214', '#52321e'), 1.4, x, y)) : (x === 52 || x === 175 ? K : tono(pal('#3a2214', '#52321e', '#6c4428'), 1.5 + (y % 6 === 0 ? 1 : 0), x, y))); }
  for (let i = -9; i <= 9; i++) for (let j = 0; j < 4; j++) R.pset(98 + i, 127 + j - (i !== 0 && Math.abs(i) < 8 ? 1 : 0), i === 0 ? hex('#a89070') : j === 0 ? hex('#fffaec') : hex('#f0e6cc'));
  if (pag && vuelta < 0.4) { const a = vuelta / 0.4 * Math.PI, ex = Math.round(98 + Math.cos(a) * 8), ey = Math.round(126 - Math.sin(a) * 5); R.poligono([[98, 126], [ex, ey - 1], [ex, ey + 2]], hex('#fffaec')); }
  R.rect(140, 125, 148, 127, hex('#c89a40')); R.rect(143, 116, 145, 125, hex('#c89a40'));
  for (let y = 110; y <= 117; y++) for (let x = 132; x <= 156; x++) { const e = Math.abs(x - 144) / (5 + (y - 110) * 1.4); if (e > 1) continue; R.pset(x, y, e > 0.86 ? K : y > 115 ? hex('#c89a40') : tono(pal('#0e3a22', '#145a30', '#1e7a40', '#3aa060'), 1 + (y - 110) / 3 + (x < 144 ? 1 : 0), x, y)); }
  halo(144, 124, 26, hex('#ffe8a0'), 0.35);
  for (const [bx, c] of [[160, '#2e4a5a'], [164, '#6a2a22']]) { R.rect(bx - 4, 124 - (bx - 160) / 2, bx + 8, 127 - (bx - 160) / 2, hex(c)); R.rect(bx - 4, 124 - (bx - 160) / 2, bx + 8, 124 - (bx - 160) / 2, mez(hex(c), hex('#ffffff'), 0.3)); }
  const cx = Math.round(lerp(212, 96, tramo(t, P8 + 0.5, declaration + 1.2)));
  R.actor(T.BL.wardBL, cx + 22, 166, t, { dir: -1, anda: t > P8 + 0.5 && t < declaration + 1.2 });
  for (let y = 146; y <= 160; y++) for (let x = cx - 6; x <= cx + 18; x++) R.pset(x, y, y === 146 || y === 153 || y === 160 ? hex('#3a2214') : x === cx - 6 || x === cx + 18 ? hex('#52321e') : (y < 153 ? hex(LOMOS[(x >> 2) % 8]) : hex(LOMOS[((x >> 2) + 3) % 8])));
  for (const wx of [cx - 3, cx + 15]) { R.disco(wx, 163, 2, K); R.pset(wx, 163, hex('#8a8a8a')); } R.linea(cx + 18, 146, cx + 22, 142, hex('#52321e'));
  // en «key» brilla una llave junto al rollo del estante; en «Declaration» Atom saca el rollo y lo desenrolla
  const rx = 224, ry = 64, saca = t > declaration - 0.2;
  if (!saca) { rollo(rx, ry - 6, 0, t); }
  const bk = tramo(t, key - 0.15, key + 0.3); if (t > key - 0.15 && !saca) { llave(rx - 34, ry - 22 + Math.round(Math.sin(t * 3) * 2), 2); halo(rx - 20, ry - 22, 22, hex('#ffe070'), 0.5 * bk); chispas(rx - 20, ry - 22, t, 6, 16, ORO[3], 8); }
  const sube = ease(tramo(t, P8 + 0.2, key - 0.3)), ax = Math.round(lerp(320, 238, sube));
  const r = T.AT.atom(R, ax, 150, t, { dir: -1, pose: sube > 0 && sube < 1 ? 'camina' : saca ? 'sostiene' : t > key - 0.2 ? 'senala' : 'quieto', cara: saca ? 'sonrisa' : t > key ? 'sorpresa' : 'normal', habla: voz(t) });
  if (saca && r && r.mano) { const [mx, my] = r.mano.map(Math.round); const u = tramo(t, declaration, declaration + 0.8); rollo(mx - 4, my - 8, u, t); if (u > 0.8) R.numero('1776', mx - 4, my - 12, { centro: true, rampa: ORO }); }
};

// ── 9 · la mesa de lectura de cerca (fondo local): la hoja del medio se descifra ────────────────────────────────────
const LECTURA = () => capa('lectura', () => {
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#5a4a3a', '#6a5a48', '#7e6c56', '#928064'), 1.4 + hh(x >> 2, y >> 2) * 0.5, x, y));
  estante(-4, 4, 244, 66, 2, 21);
  // la mesa de caoba con su cuero verde y el filete dorado
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.04 + Math.sin(y * 0.11) * 2 + y * 0.03) * 0.5;
    R.pset(x, y, y === 70 ? K : y < 75 ? tono(pal('#3a1a10', '#5a2a18', '#7a3a22'), 2 - (y - 70) * 0.3, x, y) : tono(pal('#2a120a', '#3e1c10', '#542816', '#6a341c'), 1.5 + veta + hh(x >> 2, y) * 0.3, x, y)); }
  for (let y = 82; y < 176; y++) for (let x = 14; x < 306; x++) { const b = y === 82 || y === 175 || x === 14 || x === 305, f = y === 85 || y === 172 || x === 17 || x === 302;
    R.pset(x, y, b ? K : f ? hex('#c89a40') : tono(pal('#142a1c', '#1c3826', '#244630', '#2e543a'), 1.6 + hh(x >> 1, y >> 1) * 0.6, x, y)); }
  // LA DECLARACIÓN desenrollada a la izquierda, con «1776» y renglones de rayitas
  for (let y = 92; y <= 168; y++) for (let x = 24; x <= 96; x++) { const b = x === 24 || x === 96; R.pset(x, y, b ? hex('#8a6a3a') : tono(pal('#b89a60', '#d8c08a', '#ecdcb0', '#f8ecc8'), 2.4 - (x - 24) / 90 + hh(x >> 1, y >> 1) * 0.4, x, y)); }
  for (const yy of [90, 170]) { R.rect(22, yy - 2, 98, yy + 2, hex('#8a6a3a')); R.rect(22, yy - 2, 98, yy - 2, hex('#d8c08a')); R.disco(20, yy, 2, hex('#52321e')); R.disco(100, yy, 2, hex('#52321e')); }
  R.rect(36, 98, 84, 101, hex('#3a2a1a'));
  for (let y = 112; y < 162; y += 3) for (let x = 30; x < 92; x++) if (hh(x >> 1, y, 2) > 0.22) R.pset(x, y, hex('#5a4a3a'));
  for (let x = 40; x < 80; x++) R.pset(x, 164 + Math.round(Math.sin(x * 0.6) * 1.2), hex('#3a2a1a'));
  // la pila de libros y el tintero con la pluma a la derecha; las gafas
  for (const [x0, y0, x1, y1, c] of [[262, 146, 314, 158, '#6a2a22'], [266, 134, 312, 146, '#2e4a5a'], [270, 124, 308, 134, '#5a5a2a']]) { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex(c)); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, mez(hex(c), hex('#ffffff'), 0.25)); R.rect(x0 + 6, y0 + 1, x0 + 7, y1 - 1, hex('#d8a840')); for (let y = y0 + 1; y < y1; y++) R.pset(x1, y, y % 2 ? hex('#e8dcc0') : hex('#b8a888')); }
  R.disco(284, 112, 6, K); R.disco(284, 112, 5, hex('#1a2436')); R.rect(281, 104, 287, 107, hex('#c89a40')); for (let k = 0; k < 22; k++) R.pset(287 + Math.round(k * 0.5), 106 - k, k < 6 ? hex('#e8e0d0') : hex('#f4ecd8'));
  R.disco(110, 160, 4, K); R.disco(124, 160, 4, K); R.disco(110, 160, 3, hex('#a8c0d8')); R.disco(124, 160, 3, hex('#a8c0d8')); R.linea(114, 159, 120, 159, K);
  // la lámpara de banquero (la pantalla verde, arriba a la izquierda del tablero)
  R.rect(112, 76, 120, 80, hex('#c89a40')); R.rect(115, 62, 117, 76, hex('#c89a40'));
  for (let y = 54; y <= 64; y++) for (let x = 96; x <= 136; x++) { const e = Math.abs(x - 116) / (8 + (y - 54) * 1.8); if (e > 1) continue; R.pset(x, y, e > 0.88 ? K : y > 62 ? hex('#c89a40') : tono(pal('#0e3a22', '#145a30', '#1e7a40', '#3aa060'), 1 + (y - 54) / 5 + (x < 116 ? 1 : 0), x, y)); }
});
const p9 = (t) => {
  R.copiar(LECTURA());
  // la luz de la lámpara sobre el cuero, que tiembla un poco, y el polvo en el cono
  halo(116, 96, 70, hex('#ffe8a0'), 0.32 + Math.sin(t * 7) * 0.02);
  for (let k = 0; k < 10; k++) { const u = (t * 0.1 + k / 10) % 1; tine(100 + hh(k, 1) * 34 + Math.sin(t + k) * 3, 66 + u * 30, hex('#fff6d0'), 0.6); }
  // una polilla que ronda la lámpara
  { const a = t * 2.2, x = Math.round(116 + Math.cos(a) * 18), y = Math.round(64 + Math.sin(a * 1.3) * 6), al = Math.floor(t * 16) % 2; R.pset(x, y, hex('#a89880')); R.pset(x - 1, y - al, hex('#7a6a58')); R.pset(x + 1, y - al, hex('#7a6a58')); }
  // las tres hojas: la 1 y la 3 a oscuras, la del medio se ilumina y se descifra
  const des = tramo(t, inventory - 0.1, pots + 0.3), br = tramo(t, reveals - 0.2, reveals + 0.4);
  T.d_hoja(R, 148, 122, { n: 1, escala: 2, t, oscura: 0.65 });
  T.d_hoja(R, 254, 122, { n: 3, escala: 2, t, oscura: 0.65 });
  if (br > 0) halo(200, 120, 48, hex('#ffe070'), 0.35 * br);
  const H = T.d_hoja(R, 200, 120, { n: 2, escala: 2, t, brillo: br, descifrada: des }) || {};
  for (const [tt, f] of [[goldB, 0.25], [silverB, 0.45], [jewels, 0.65], [pots, 0.9]]) { const u = cl(1 - Math.abs(t - tt - 0.15) / 0.4); if (u > 0) chispas(200, 92 + f * 56, t, 5, 14, ORO[3], Math.round(f * 10)); }
  // la mano canónica señala la fila que se está descifrando
  const fy = Math.round(lerp(98, 146, des)), fx = 226 + Math.round(Math.sin(t * 5) * (des > 0 && des < 1 ? 1 : 0));
  const entra = ease(tramo(t, P9 + 0.1, reveals + 0.3));
  T.brazo(R, 300, 214, Math.round(lerp(330, fx, entra)), Math.round(lerp(200, fy, entra)), '#3a4a7a', -1, { codo: [Math.round(lerp(330, 270, entra)), Math.round(lerp(210, 176, entra))] });
};

// ── 10 · la sesión de los Hart (1898): dónde y para quién ──────────────────────────────────────────────────────────
const p10 = (t) => {
  const o = { encuadre: 'sesion' };
  T.buscadores(R, t, o);
  const pasa = Math.sin(t * 2.4) > 0;
  R.actor(T.BL.mediumBL, 180, 146, t, { dir: -1, brazos: pasa || (t > where - 0.2 && t < whom + 0.6), habla: voz(t) > 0.3 && Math.sin(t * 9) > 0 });
  const g1 = t > where - 0.25, g3 = t > whom - 0.25;
  const a1 = R.actor(T.BL.claytonBL, 76, 152, t, { dir: 1, sostiene: g1 ? [100, 112] : [96, 132], sorpresa: g1 && t < where + 0.8, habla: g1 && t > where + 0.8 && Math.sin(t * 8) > 0 });
  const a3 = R.actor(T.BL.georgeBL, 234, 152, t, { dir: -1, sostiene: g3 ? [218, 112] : [222, 132], sorpresa: g3, triste: !g3 && t > where + 0.5 });
  const BD = T.buscadoresDelante(R, t, o) || {};
  if (a1 && a1.mano) T.d_hoja(R, a1.mano[0] + 2, a1.mano[1] - 5, { n: 1, escala: 0.5, t });
  if (a3 && a3.mano) T.d_hoja(R, a3.mano[0] - 2, a3.mano[1] - 5, { n: 3, escala: 0.5, t });
  // la bola se enciende cuando el médium pasa las manos
  const [bx, by] = BD.bola || [148, 132]; halo(bx, by, 20, hex('#c8a0ff'), 0.25 + 0.15 * Math.sin(t * 3));
  // «?» con un árbol (dónde) y «?» con gente (para quién)
  if (g1 && a1 && a1.mano) { const u = tramo(t, where - 0.25, where); const x = a1.mano[0] - 2, y = a1.mano[1] - 34 - Math.round(u * 4);
    R.icono('?', x - 18, y - 6, hex('#fff0a0'), K, 3); const tx = x + 4, ty = y; R.rect(tx + 3, ty + 8, tx + 4, ty + 12, hex('#6a4a2a')); R.disco(tx + 4, ty + 5, 4, K); R.disco(tx + 4, ty + 5, 3, hex('#4a8a3a')); R.pset(tx + 3, ty + 3, hex('#8ac86a')); }
  if (g3 && a3 && a3.mano) { const u = tramo(t, whom - 0.25, whom); const x = a3.mano[0] - 16, y = a3.mano[1] - 34 - Math.round(u * 4);
    R.icono('?', x - 6, y - 6, hex('#fff0a0'), K, 3); for (let k = 0; k < 3; k++) { const px = x + 14 + k * 6, py = y + 4; R.disco(px, py, 2, hex('#e8e0d0')); R.rect(px - 2, py + 3, px + 2, py + 8, hex('#e8e0d0')); R.pset(px, py, K); } }
};

// ── 11 · la mesa del SIS (1934): ciento cuarenta años ──────────────────────────────────────────────────────────────
const p11 = (t) => {
  const o = { encuadre: 'sis', camara: 'mesa' };
  const gS = T.buscadores(R, t, o) || {};
  const H = gS.hojas || [[112, 98], [162, 92], [214, 100]];
  // la del medio ya está descifrada; la 1 y la 3 siguen cerradas
  T.d_hoja(R, H[1][0], H[1][1], { n: 2, escala: 2, t, descifrada: 1 });
  // «140» sube en «hundred and forty»
  const u = tramo(t, hundred - 0.1, years), dec = t > noteven + 0.3 ? cl(1 - (t - noteven - 0.3) / 0.6) : 1;
  if (u > 0 && dec > 0) { const y = Math.round(lerp(60, 44, ease(u))); halo(160, y - 8, 30, hex('#ffe070'), 0.3 * u * dec); R.numero('140', 160, y, { centro: true, tam: 16, rampa: ORO }); }
  // el lápiz en la mano canónica: prueba en la hoja 1, luego en la 3, y en «not even» lo suelta
  const k = t < (hundred + years) / 2 + 0.6 ? 0 : 2, [hx, hy] = H[k], tg = t > noteven - 0.1;
  const garab = !tg && t > P11 + 0.4;
  const wx = hx + 4 + (garab ? Math.round(Math.sin(t * 18) * 4) : 0), wy = hy + 18 + (garab ? Math.round(Math.sin(t * 7) * 4) : 0);
  const sal = ease(tramo(t, noteven + 0.2, noteven + 0.9));
  const X1 = Math.round(lerp(wx + 8, wx + 40, sal)), Y1 = Math.round(lerp(wy + 8, 210, sal));
  if (tg) { const fall = tramo(t, noteven - 0.1, noteven + 0.4), lx = hx + 10, ly = Math.round(hy + 26 + fall * 14); R.linea(lx, ly, lx + 10, ly - 3, hex('#e8c040')); R.linea(lx, ly + 1, lx + 10, ly - 2, hex('#a88020')); R.pset(lx, ly, hex('#3a3a3a')); }
  T.brazo(R, X1 + 22, 200, X1, Y1, '#4a5a4a', -1, { codo: [X1 + 30, Y1 + 30] });
  if (!tg) for (let i = 0; i < 13; i++) { const px = X1 - 7 + i, py = Y1 - 7 + Math.round(i * 0.5); R.pset(px, py, i < 2 ? hex('#3a3a3a') : i < 11 ? hex('#e8c040') : hex('#e88aa0')); R.pset(px, py + 1, i < 2 ? hex('#3a3a3a') : i < 11 ? hex('#a88020') : hex('#c86a80')); }
  // tachones que deja en las hojas 1 y 3
  for (const [kk, t0] of [[0, P11 + 0.8], [2, (hundred + years) / 2 + 1.2]]) if (t > t0) { const [qx, qy] = H[kk]; R.linea(qx - 12, qy + 14, qx + 12, qy + 22, hex('#c83a2a')); R.linea(qx - 12, qy + 22, qx + 12, qy + 14, hex('#c83a2a')); }
};

// ── 12 · el aula del SIS: los mejores descifradores se rinden ──────────────────────────────────────────────────────
const p12 = (t) => {
  const o = { encuadre: 'sis' };
  T.buscadores(R, t, o);
  const rinde = t > managing - 0.1;
  R.actor(T.BL.friedmanBL, 150, 150, t, { dir: rinde ? 1 : -1, dedo: !rinde && Math.floor(t * 0.8) % 2 === 0, brazos: rinde && t < managing + 1.0, habla: !rinde && voz(t) > 0.3 && Math.sin(t * 9) > 0, triste: rinde });
  R.actor(T.BL.alumnoBL, 72, 146, t, { dir: 1, brazos: rinde, enfado: rinde, sorpresa: !rinde && t > army - 0.2 });
  R.actor(T.BL.alumna2BL, 262, 146, t, { dir: -1, triste: rinde, dedo: !rinde && t < army });
  // un tercero cruza con papeles por el pasillo y los deja caer al final
  const cx = Math.round(lerp(236, 120, tramo(t, P12 + 0.3, managing - 0.3)));
  const a = R.actor(T.BL.alumnoBL, cx, 154, t, { dir: -1, anda: t > P12 + 0.3 && t < managing - 0.3, sostiene: rinde ? null : true, sorpresa: rinde });
  if (!rinde && a && a.mano) { const [mx, my] = a.mano; R.rect(mx - 5, my - 4, mx + 3, my + 1, hex('#f0e8d0')); R.rect(mx - 5, my - 4, mx + 3, my - 4, hex('#a89878')); }
  if (rinde) for (let k = 0; k < 4; k++) { const u = tramo(t, managing - 0.1 + k * 0.08, managing + 0.7 + k * 0.1), x = cx + 4 + (k - 1.5) * 8 * u + Math.sin(u * 8 + k) * 3, y = 136 + u * 32; R.rect(Math.round(x) - 3, Math.round(y), Math.round(x) + 3, Math.round(y) + 1, hex('#f0e8d0')); }
  T.buscadoresDelante(R, t, o);
  if (rinde) { const u = tramo(t, managing, managing + 0.25); R.icono('?', 150, Math.round(102 - u * 4), hex('#fff0a0'), K, 3); R.icono('X', 69, Math.round(100 - u * 3), hex('#e86a5a'), K, 3); }
};

const año = (t) => t < P2 ? 2026 : t < P7 ? 1885 : t < P8 ? 1845 : t < P10 ? 1885 : t < P11 ? 1898 : 1934;
const efectos = [[0.5, 'whoosh'], [numbers, 'brillo'], [P2 + 0.2, 'pasos'], [pamphlet + 0.1, 'papel'], [cents, 'golpecito'], [cents + 0.5, 'papel'],
  [open, 'papel'], [nowords, 'pop'], [n71, 'brillo'], [n194 + 0.3, 'viento'], [n38 + 0.6, 'papel'], [P5 + 0.3, 'pasos'], [pamph2, 'papel'], [corner, 'toc'], [gold, 'brillo'], [silver, 'brillo'],
  [P7 + 0.4, 'cerrojo'], [three, 'papel'], [cracked, 'brillo'], [P8 + 0.6, 'carro'], [key, 'brillo'], [declaration + 0.1, 'papel'], [reveals, 'brillo'], [pots, 'brillo'],
  [where, 'pop'], [whom, 'pop'], [P11 + 0.5, 'lapiz'], [hundred, 'brillo'], [noteven + 0.3, 'toc'], [managing, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12]], { efectos, año });
''')

E['bl-aviso'] = ('El aviso', '''// BL-AVISO (frase 4). Tres planos cortados en la voz inglesa:
// 1. (0) el estudio de Atom de noche: Atom entra por la puerta con las tres hojas en la mano, va hasta la pizarra y en
//    «three pages» las lanza una a una, que vuelan y se quedan clavadas en la pizarra;
// 2. («lived») la mesa del estudio de cerca: Atom a escala 2 coloca sus figuritas sobre la mesa: en «innkeeper» el posadero
//    con la caja de hierro, y en «woman who rented a backhoe» una excavadora de juguete con la mujer, que entra rodando;
// 3. («And hold on») la pizarra de cerca (fondo local), con las tres hojas clavadas: Atom, flotando, traza con la pluma
//    una gran interrogación desde «question»; en «Who really wrote» la remata con su punto y en «numbers» la
//    interrogación se enciende y Atom guiña.''', AYUDAS + r'''
const pr = (f) => en('pregunta', f);
const three = pr(0.1404), pages = pr(0.1645), A2 = pr(0.2489), innkeeper = pr(0.4035), box = pr(0.466), woman = pr(0.4978), backhoe = pr(0.5537);
const A3 = pr(0.6349), question = pr(0.6798), endW = pr(0.7292), coming = pr(0.7982), who = pr(0.8947), wrote = pr(0.9276), numbers = pr(0.9605);

// ── 1 · el estudio: las tres hojas a la pizarra ────────────────────────────────────────────────────────────────────
const CL = [[138, 60], [158, 58], [178, 61]];
const pizarra1 = (R, t, [x0, y0, x1, y1]) => {
  // restos de tiza: unas cuentas viejas medio borradas
  for (let k = 0; k < 5; k++) for (let i = 0; i < 16; i++) if (hh(i, k, 4) > 0.45) tine(x0 + 8 + i * 2, y0 + 8 + k * 4, hex('#c8d0c0'), 0.18);
  CL.forEach(([cx, cy], k) => { if (t < three + k * 0.22 + 0.32) return; T.d_hoja(R, cx, cy, { n: k + 1, escala: 1, t });
    R.disco(cx, cy - 14, 1, hex('#d83a2a')); R.pset(cx - 1, cy - 15, hex('#ff8a7a')); });
};
const q1 = (t) => {
  const o = { pizarra: pizarra1 };
  T.estudio(R, t, o);
  const va = ease(tramo(t, 0.15, three - 0.3)), ax = Math.round(lerp(28, 158, va));
  const lanza = t > three - 0.25 && t < pages + 0.8;
  const r = T.AT.atom(R, ax, 160, t, { dir: 1, pose: va > 0 && va < 1 ? 'camina' : lanza ? 'senala' : t < three ? 'sostiene' : 'saluda', cara: t > pages + 0.5 ? 'sonrisa' : 'normal', habla: t > pages + 0.5 ? voz(t) : 0 });
  if (r && r.mano) { const [mx, my] = r.mano.map(Math.round);
    const quedan = 3 - CL.filter((c, k) => t > three + k * 0.22 - 0.1).length;
    for (let k = 0; k < quedan; k++) T.d_hoja(R, mx + 2 + k, my - 5 - k, { n: 3 - k, escala: 0.5, t, sombra: false });
    // las que vuelan en arco desde la mano hasta su sitio
    CL.forEach(([cx, cy], k) => { const t0 = three + k * 0.22 - 0.1, u = tramo(t, t0, t0 + 0.42); if (u <= 0 || u >= 1) return;
      const x = lerp(mx, cx, u), y = lerp(my, cy, u) - Math.sin(u * Math.PI) * 26; T.d_hoja(R, Math.round(x), Math.round(y), { n: k + 1, escala: lerp(0.5, 1, u) > 0.75 ? 1 : 0.5, t, sombra: false }); }); }
  T.estudioDelante(R, t, o);
};

// ── 2 · la mesa del estudio: las figuritas de la historia ─────────────────────────────────────────────────────────
const peana = (x, y) => { for (let i = -10; i <= 10; i++) for (let j = 0; j < 4; j++) R.pset(x + i, y + j, j === 0 ? hex('#a8743a') : Math.abs(i) === 10 || j === 3 ? hex('#3a2214') : hex('#6c4428')); };
const excavadora = (x, y, t, mueve) => {   // excavadora de juguete amarilla (x: el centro, y: el suelo)
  const Y = pal('#8a6a10', '#c8a020', '#f0c830', '#fff0a0'); x = Math.round(x);
  for (const wx of [x - 14, x + 2]) for (let j = -6; j <= 0; j++) for (let i = 0; i < 16; i++) R.pset(wx + i, y + j, j === -6 || j === 0 || i === 0 || i === 15 ? K : (i + Math.floor(t * (mueve ? 14 : 0))) % 4 === 0 ? hex('#4a4a4a') : hex('#2a2a2a'));
  for (let j = -18; j <= -7; j++) for (let i = -14; i <= 10; i++) R.pset(x + i, y + j, j === -18 || i === -14 || i === 10 ? K : tono(Y, 2 + (j < -15 ? 1 : 0) - (i > 6 ? 0.8 : 0), x + i, y + j));
  for (let j = -30; j <= -18; j++) for (let i = -10; i <= 2; i++) R.pset(x + i, y + j, j === -30 || i === -10 || i === 2 ? K : i > -8 && i < 0 && j > -28 && j < -21 ? hex('#a8d0e8') : tono(Y, 2.2, x + i, y + j));
  const a = -0.5 + Math.sin(t * 2) * 0.15 * (mueve ? 1 : 0.3), bx = x + 10, by = y - 14, ex = bx + Math.round(Math.cos(a) * 18), ey = by + Math.round(Math.sin(a) * 18);
  for (let d = -1; d <= 1; d++) R.linea(bx, by + d, ex, ey + d, d === 0 ? Y[2] : Y[0]);
  R.linea(ex, ey, ex + 6, ey + 12, Y[1]); R.linea(ex + 1, ey, ex + 7, ey + 12, Y[0]); R.poligono([[ex + 2, ey + 8], [ex + 10, ey + 14], [ex + 2, ey + 16]], hex('#6a6a72'));
};
const q2 = (t) => {
  const o = { camara: 'mesa', sin: ['cesta'] };
  T.estudio(R, t, o);
  // el posadero con su caja aparece en «innkeeper» (Atom lo deja en la mesa con una nubecilla de polvo)
  const pone1 = t > innkeeper - 0.15, pone2 = t > woman - 0.1;
  const polvo = (x, y, t0) => { const u = tramo(t, t0, t0 + 0.6); if (u <= 0 || u >= 1) return; for (let k = 0; k < 8; k++) { const a = k / 8 * 3.14, d = 4 + u * 10; tine(x + Math.cos(a) * d * 1.4, y - Math.sin(a) * d * 0.5, hex('#e8dcc0'), 0.7 * (1 - u)); } };
  if (pone1) { peana(150, 146); const m = R.actor(T.BL.morrissBL, 143, 146, t, { dir: 1, sostiene: [160, 136], sonrisa: t > box }); if (m && m.mano) T.d_caja(R, m.mano[0] + 1, m.mano[1] + 5, { t }); polvo(150, 148, innkeeper - 0.15); }
  // la excavadora de juguete entra rodando en «backhoe»; la mujer ya espera a su lado
  if (pone2) { peana(232, 146); R.actor(T.BL.parsonsBL, 225, 146, t, { dir: 1, dedo: t > backhoe, sonrisa: t > backhoe + 0.5 }); polvo(232, 148, woman - 0.1); }
  const ex = lerp(340, 270, ease(tramo(t, backhoe - 0.6, backhoe + 0.4)));
  if (t > backhoe - 0.6) excavadora(ex, 150, t, t < backhoe + 0.4);
  // Atom a escala 2: trae las figuritas y las coloca
  const xA = t < innkeeper - 0.15 ? lerp(104, 126, ease(tramo(t, A2, innkeeper - 0.4))) : t < woman - 0.1 ? lerp(126, 196, ease(tramo(t, innkeeper + 0.2, woman - 0.4))) : 196;
  const lleva = (t > A2 + 0.2 && t < innkeeper - 0.15) || (t > innkeeper + 0.3 && t < woman - 0.1);
  const anda = (t > A2 + 0.1 && t < innkeeper - 0.4) || (t > innkeeper + 0.2 && t < woman - 0.4);
  const r = T.AT.atom(R, Math.round(xA), 150, t, { s: 2, dir: 1, pose: anda ? 'camina' : lleva ? 'sostiene' : t > backhoe ? 'senala' : 'quieto', cara: t > backhoe + 0.3 ? 'sonrisa' : 'normal', habla: voz(t) });
  if (lleva && r && r.mano) { const [mx, my] = r.mano.map(Math.round); const def = t < innkeeper ? T.BL.morrissBL : T.BL.parsonsBL; R.actor(def, mx - 7, my + 14, t, { dir: 1, quieto: true }); }
  T.estudioDelante(R, t, o);
};

// ── 3 · la pizarra de cerca (fondo local): la gran interrogación ──────────────────────────────────────────────────
const PIZ = () => capa('piz', () => {
  // la pared de ladrillo alrededor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = y >> 3, j = (x + (f % 2) * 8) % 16 === 0 || y % 8 === 0;
    R.pset(x, y, j ? hex('#4a2a20') : tono(pal('#6a3424', '#7e3e2a', '#924a32', '#a65a3e'), 1.6 + hh((x + (f % 2) * 8) >> 4, f) * 1.2, x, y)); }
  // el marco de roble y la pizarra verde con restos de borrador
  for (let y = 10; y <= 156; y++) for (let x = 6; x <= 314; x++) { const m = x < 14 || x > 306 || y < 18 || y > 148;
    R.pset(x, y, m ? (x === 6 || x === 314 || y === 10 || y === 156 ? K : tono(pal('#3a2214', '#52321e', '#6c4428', '#8a5a36'), 2 + (y < 14 || x < 10 ? 1 : 0) + Math.sin((x + y) * 0.3) * 0.3, x, y))
      : tono(pal('#1a2a22', '#22342a', '#2a3e32', '#34483a'), 1.5 + hh(x >> 3, y >> 2) * 0.7 + Math.sin(x * 0.05 + y * 0.02) * 0.3, x, y)); }
  for (let k = 0; k < 6; k++) { const cx = 30 + hh(k, 1) * 260, cy = 30 + hh(k, 2) * 100; for (let i = 0; i < 40; i++) tine(cx + i, cy + Math.sin(i * 0.3) * 6 + (i % 5), hex('#8a9a90'), 0.12); }
  for (const [s_, x, y] of [['1701', 60, 140], ['89', 120, 34], ['76', 270, 140], ['1629', 296, 40], ['48', 180, 142], ['317', 30, 36]]) R.numero(s_, x, y, { centro: true, color: hex('#3c5044'), sombra: false });
  // la repisa con tizas y el borrador
  for (let y = 156; y <= 164; y++) for (let x = 2; x <= 318; x++) R.pset(x, y, y === 156 ? hex('#a8743a') : y === 164 ? K : tono(pal('#3a2214', '#52321e', '#6c4428'), 2 - (y - 156) * 0.2, x, y));
  R.rect(40, 151, 56, 155, hex('#f4f4ee')); R.rect(62, 152, 70, 155, hex('#e8b0b0')); R.rect(268, 148, 298, 155, hex('#6a4a2a')); R.rect(268, 153, 298, 155, hex('#c8c8c0'));
  for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#24140c', '#3a2214', '#52321e'), 1.4 + (x % 24 < 2 ? -1 : 0) + hh(x >> 3, y) * 0.4, x, y));
});
const SIG = (() => { const p = [];   // el trazo de la interrogación (cx 226): el gancho, el cuello y el pie
  for (let i = 0; i <= 40; i++) { const a = Math.PI * (1.1 - i / 40 * 1.55); p.push([226 + Math.cos(a) * 30, 62 - Math.sin(a) * 30]); }
  const [lx, ly] = p[p.length - 1]; for (let i = 1; i <= 12; i++) p.push([lerp(lx, 226, i / 12), lerp(ly, 112, i / 12)]); return p; })();
const q3 = (t) => {
  R.copiar(PIZ());
  // las tres hojas clavadas a la izquierda, con sus chinchetas
  [[52, 84], [102, 82], [152, 86]].forEach(([cx, cy], k) => { T.d_hoja(R, cx, cy, { n: k + 1, escala: 2, t, brillo: t > numbers ? 0.6 : 0 }); R.disco(cx, cy - 29, 2, hex('#d83a2a')); R.pset(cx - 1, cy - 30, hex('#ff9a8a')); });
  // la interrogación se traza desde «question» y se remata con el punto en «Who»
  const u = tramo(t, question - 0.1, coming + 0.3), n = Math.round(u * (SIG.length - 1)), luz = t > numbers - 0.05 ? 1 : 0;
  const C = luz ? ORO[3] : hex('#eef2e8'), C2 = luz ? ORO[2] : hex('#c8d0c0');
  for (let i = 1; i <= n; i++) { const [x0, y0] = SIG[i - 1], [x1, y1] = SIG[i]; for (let d = -2; d <= 2; d++) { R.linea(Math.round(x0 + d), Math.round(y0), Math.round(x1 + d), Math.round(y1), Math.abs(d) === 2 ? C2 : C); } }
  const punto = t > who - 0.05; if (punto) { R.disco(226, 128, 4, C); R.disco(225, 127, 2, luz ? hex('#ffffff') : hex('#ffffff')); }
  if (luz) { halo(226, 88, 64, hex('#ffd860'), 0.35 * cl(1 - (t - numbers) / 2) + 0.12); chispas(226, 88, t, 12, 50, ORO[3], 3); }
  // Atom flota con la pluma en la mano, siguiendo la punta del trazo
  const [px, py] = n > 0 ? SIG[n] : SIG[0], fin = u >= 1;
  const tx = punto && t < who + 0.6 ? 226 : fin ? 268 : px, ty = punto && t < who + 0.6 ? 128 : fin ? 120 : py;
  if (!q3.d) { const r0 = T.AT.atom(R, 100, 100, t, { s: 2, dir: -1, pose: 'senala' }); q3.d = r0 && r0.mano ? [r0.mano[0] - 100, r0.mano[1] - 100] : [-18, -30]; R.copiar(PIZ()); return q3(t); }
  const ax = Math.round(tx - q3.d[0] + 4), ay = Math.round(ty - q3.d[1] + 4 + (fin && !punto ? Math.sin(t * 2.5) * 2 : 0));
  const r = T.AT.atom(R, ax, ay, t, { s: 2, dir: -1, pose: 'senala', cara: t > numbers + 0.1 ? 'guino' : t > who ? 'sorpresa' : 'normal', habla: voz(t) });
  // la pluma: el cañón blanco con sus barbas, la punta en el trazo
  if (r && r.mano) { const [mx, my] = r.mano.map(Math.round); for (let k = 0; k <= 16; k++) { const x = mx + k * 0.6, y = my - k * 1.0; R.pset(Math.round(x), Math.round(y), k < 2 ? K : hex('#f0e8d8'));
    if (k > 5) for (let s = 1; s <= 2; s++) { R.pset(Math.round(x - s), Math.round(y - s * 0.4), hex('#e0d8c8')); R.pset(Math.round(x + s), Math.round(y + s * 0.4), hex('#fffaf0')); } } }
};
const año = 2026;
const efectos = [[0.3, 'puerta'], [1.0, 'pasos'], [three - 0.1, 'whoosh'], [three + 0.3, 'toc'], [three + 0.75, 'toc'], [innkeeper - 0.1, 'golpecito'], [woman, 'golpecito'], [backhoe - 0.5, 'motor'],
  [question, 'lapiz'], [who, 'toc'], [numbers, 'brillo']];
T.rodar(E, R, [[0, q1], [A2, q2], [A3, q3]], { efectos, año });
''')
