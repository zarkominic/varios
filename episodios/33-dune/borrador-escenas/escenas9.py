E = {}

# Utilidades comunes (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k, C = T.C, PZ = T.PIEZAS_DU;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lin = (t, a0, a1) => cl((t - a0) / (a1 - a0));
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const k = f ? f(x, y) : 1; if (k > 0) R.pset(x, y, mez(R.pget(x, y), col, a * k)); } };
const elipse = (cx, cy, rx, ry, col, a) => baña(cx - rx, cy - ry, cx + rx, cy + ry, col, a, (x, y) => { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; return d < 1 ? 1 - d * d : 0; });
const ovalo = (cx, cy, rx, ry, col) => { for (let y = Math.ceil(cy - ry); y <= cy + ry; y++) { const w = rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)); R.rect(Math.round(cx - w), y, Math.round(cx + w), y, col); } };
const relleno = (x0, y0, x1, y1, r, v0, amp = 0.6, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(r, v0 + (h(x >> 1, y >> 1, k) - 0.5) * amp, x, y)); };
// madera con vetas (tablas horizontales de alto ht)
const madera = (x0, y0, x1, y1, r, ht = 12, k = 0) => { for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / ht), fy = (y - y0) % ht;
  for (let x = x0; x <= x1; x++) { const v = 1.6 + Math.sin(x * 0.045 + tb * 1.7 + Math.sin(y * 0.55 + tb) * 1.4) * 0.8 + (h(x >> 2, y, k + tb) - 0.5) * 0.5 - (fy === 0 ? 1.6 : 0) + (fy === 1 ? 0.6 : 0);
    R.pset(x, y, tono(r, v, x, y)); }
  if (fy === 0) for (let x = x0 + ((tb * 53) % 70); x <= x1; x += 70 + (tb % 3) * 9) R.pset(x, y + 4, r[0]); } };
const BL = hex('#f6f6f6'), ORO = hex('#f0c040'), OROL = hex('#f6e08a'), OROS = hex('#9a7420'), ROJO = hex('#d8303a');
// un globo de cómic blanco con su pico hacia abajo (para un símbolo)
const globo = (cx, cy, w, hh, px = 0) => { const x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2), y0 = Math.round(cy - hh / 2), y1 = Math.round(cy + hh / 2);
  R.rect(x0 - 1, y0, x1 + 1, y1, K); R.rect(x0, y0 - 1, x1, y1 + 1, K); R.rect(x0, y0, x1, y1, BL); R.rect(x0, y1, x1, y1, hex('#d0d4e0'));
  R.poligono([[cx + px - 3, y1 + 1], [cx + px + 3, y1 + 1], [cx + px, y1 + 6]], K); R.poligono([[cx + px - 2, y1], [cx + px + 2, y1], [cx + px, y1 + 4]], BL); };

const ease = (u) => u * u * (3 - 2 * u);
// un destello de cuatro puntas
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// una pieza (que pinta con rect) recortada a un hueco: se pinta en un búfer aparte y se copia con pset dentro de [x0, y0, x1, y1]
let TMP = null;
const recortada = (x0, y0, x1, y1, pinta, tinte = null) => { if (!TMP) TMP = R.nuevo(); TMP.fill(0); const prev = R.usar(TMP); pinta(); R.usar(prev);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const p = TMP[y * 320 + x]; if (p) R.pset(x, y, tinte ? tinte(p, x, y) : p); } };
// Atom cuando baja de su esquina: el resplandor tramado y el átomo
const atomAbajo = (ax, ay, t, o = {}) => {
  const r = o.r ?? 12, rr = r + 7; ax = Math.round(ax); ay = Math.round(ay);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r, orbita: R.PAL.ATOM[7], energia: o.e ?? 0.4, vel: o.vel ?? 1 });
};
// nube de tres tonos
const nube3 = (cx, cy, w, c) => { cx = Math.round(cx); ovalo(cx, cy + 1, w * 0.5, 3, c[0]); ovalo(cx + w * 0.3, cy + 3, w * 0.3, 2, c[0]); ovalo(cx - w * 0.08, cy - 1, w * 0.4, 2, c[1]); ovalo(cx + w * 0.2, cy, w * 0.26, 2, c[1]); ovalo(cx - w * 0.12, cy - 2, w * 0.24, 1, c[2]); ovalo(cx + w * 0.22, cy - 1, w * 0.12, 1, c[2]); };
// la mata de hierba de playa (briznas largas y curvas que se mecen); e = tamaño (1 = 24–40 px de alto)
const VERDES = RA('#24401e', '#3e6a30', '#5a8a3c', '#7aa850', '#b8d078');
const mata = (x, y, t, k = 0, e = 1, n = 13) => { if (e <= 0.05) return; x = Math.round(x); y = Math.round(y);
  for (const pasada of [0, 1]) for (let b = 0; b < n; b++) { const q = b - (n - 1) / 2, a0 = q * (2.2 / n) + (h(b, k, 50) - 0.5) * 0.12, L = (24 + h(b, k, 51) * 16) * e, vi = 0.3 + 0.22 * Math.sin(t * 2.6 + b * 0.7 + k), atras = b % 3 === 1;
    for (let i = 0; i <= L; i++) { const u = i / L, px = Math.round(x + q * 1.4 * Math.min(1, e + 0.3) + Math.sin(a0) * i + vi * u * u * 18 * e), py = Math.round(y - Math.cos(a0) * i * (1 - 0.3 * u * vi));
      if (pasada === 0) { R.pset(px - 1, py, VERDES[0]); R.pset(px + 1, py, VERDES[0]); R.pset(px, py - 1, VERDES[0]); } else { R.pset(px, py, u > 0.86 ? VERDES[4] : atras ? VERDES[1] : u > 0.5 ? VERDES[3] : VERDES[2]); if (!atras && u < 0.45) R.pset(px + 1, py, VERDES[1]); } } } };
// un fondo fijo que además sabe volver a pintar un trozo suyo por delante de un personaje (.tapa)
const fijo2 = (pinta) => { let b = null; const haz = () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } return b; };
  return { copia: () => R.copiar(haz()), tapa: (x0, y0, x1, y1) => { const d = haz(); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, d[y * 320 + x]); } }; };
'''

# ─────────────────────────────────────────────────────────────── du-taquilla ──
E['du-taquilla'] = ('La taquilla', '''// DU-TAQUILLA (frases 28–29), sin cartela; golpe musical en la marca «taquilla» (0,6 s). Seis planos:
// 1. salas 'sala'/butacas (2021, llena): Villeneuve señala la pantalla en penumbra; en el golpe la pantalla se enciende
//    de un fogonazo (el resplandor de arena abstracto del decorado) y él levanta los brazos y se va; en «400 million»
//    sale en la pantalla el contador (bolsa y 400 000 000) y saltan palomitas. Corta en «around the world».
// 2. (LOCAL) el escenario de los premios: el telón granate se abre («around the world») y en «won six» caen una a una
//    seis estatuillas sobre seis pilas de nuestro libro, cada una con su número; Villeneuve y el operador saltan, los
//    fotógrafos disparan. Corta en «The second».
// 3. (LOCAL) la taquilla de cerca (2024): el contador grande marca 400 y en «passed 700» corre hasta 700; la cola
//    avanza, cada uno recoge su entrada en la ventanilla y sale con ella (desde «The impossible book», alguno con el
//    libro bajo el brazo). Corta en «And the third».
// 4. salas 'sala'/general (2026, nieva, cola 1): la marquesina tiene dos lunas y en «third» se enciende la tercera y el
//    tercer cartel; un chaval lo señala y salta; una lectora enseña el segundo libro (globo con un 2). Corta en «scheduled».
// 5. (LOCAL) el vestíbulo: el calendario grande de 2026, mes 12, pasa hojas hasta el 18; el empleado, subido a la
//    escalera, lo rodea con un rotulador rojo en una pértiga («December 18»); nieva en la ventana, saltan las palomitas.
//    Corta en «almost».
// 6. (LOCAL) el cajón del escritorio, 70 años después: la hoja del reportaje que nunca se publicó, con su foto de las
//    dunas desde el aire (viva, en sepia: la avioneta la cruza en «that flight in a small plane»), el reloj de
//    bolsillo con su «70» y el hilo de arena que cae y la va tapando.''', UTIL + r'''
const a = (s) => en('taquilla', (s - 0.5) / 13.431), b = (s) => en('tres', (s - 15.32) / 10.561);
const P2 = a(4.58) - 0.05, P3 = a(8.34) - 0.05, P4 = b(15.32) - 0.12, P5 = b(18.94) - 0.05, P6 = b(22.89) - 0.12;
const GOLPE = a(0.6);
const ROJ = RA('#4a0c18', '#6e1420', '#96202c', '#b83038', '#d84848');

// ── 1. la sala llena: la pantalla se enciende con nuestro planeta ────────────────────────────────
const O1 = { encuadre: 'sala', camara: 'butacas', epoca: 2021, lleno: 1 };
const p1 = (t) => {
  const on = lin(t, GOLPE, GOLPE + 0.45), o = { ...O1, luz: lerp(0.12, 1, on), ...(t < GOLPE ? { pantalla: false } : {}) };
  const g = T.salas(R, t, o), PAN = g?.pantalla ?? [34, 24, 268, 108];
  // el fogonazo del golpe: la pantalla se enciende en blanco y se asienta; unas chispas saltan de sus bordes
  if (on > 0 && on < 1) { R.recorte(PAN); for (let y = PAN[1]; y <= PAN[3]; y++) for (let x = PAN[0]; x <= PAN[2]; x++) if (BY[(y & 3) * 4 + (x & 3)] / 16 < (1 - on) * 1.3) R.pset(x, y, on < 0.35 ? BL : OROL); R.recorte(null);
    for (let k = 0; k < 16; k++) { const an = k * 0.393, rr = on * 30; destello(151 + Math.cos(an) * (117 + rr), 66 + Math.sin(an) * (42 + rr * 0.5), 1 + (k % 2), k % 2 ? OROL : BL); } }
  // el contador de la recaudación, en la pantalla: la bolsa y 400 000 000
  const u4 = lin(t, a(2.84), a(3.1));
  if (u4 > 0) { const hh2 = Math.round(12 * ease(u4)); R.rect(73, 92 - hh2, 229, 92 + hh2, K); R.rect(74, 93 - hh2, 228, 91 + hh2, ORO); R.rect(75, 94 - hh2, 227, 90 + hh2, hex('#141a2c'));
    if (u4 >= 1) { const n = Math.round(400 * ease(lin(t, a(3.0), a(3.95))) / 5) * 5; R.icono('bolsa', 82, 85, ORO, K, 2); R.numero(String(n).padStart(3, '0'), 136, 101, { tam: 16, centro: true }); R.numero('000 000', 168, 99, {});
      if (n >= 400 && t < a(3.95) + 0.5) for (let k = 0; k < 6; k++) destello(80 + k * 28 + Math.sin(t * 9 + k) * 3, 78 + (k % 2) * 28, 1 + (Math.sin(t * 20 + k) > 0 ? 1 : 0), OROL); } }
  // Villeneuve, ante la pantalla: la señala, levanta los brazos en el golpe y se va por la izquierda
  const vx = t < 1.7 ? 46 : lerp(46, -18, lin(t, 1.7, 3.3));
  if (vx > -17) R.actor(EL.villeneuve, Math.round(vx), 124, t, { dir: t < 1.7 ? 1 : -1, dedo: t < GOLPE, brazos: t >= GOLPE && t < 1.5, anda: t >= 1.7, sonrisa: true, salto: t >= GOLPE && t < GOLPE + 0.4 ? Math.round(Math.sin((t - GOLPE) / 0.4 * Math.PI) * 5) : 0 });
  T.salasDelante(R, t, o);
  // las palomitas que saltan de las butacas en «400»
  const tp = t - a(3.5); if (tp > 0) for (let k = 0; k < 14; k++) { const q = (tp - (k % 5) * 0.16) / 0.65; if (q <= 0 || q >= 1) continue; const x = Math.round(22 + k * 21 + q * (k % 2 ? 7 : -7)), y = Math.round(134 + (k % 3) * 15 - Math.sin(q * Math.PI) * 17); R.rect(x, y, x + 1, y + 1, hex('#fff4c8')); R.pset(x, y, hex('#f8d870')); }
};

// ── 2. el escenario: seis estatuillas sobre seis pilas de nuestro libro ─────────────────────────────────
const TEL = RA('#141a3c', '#1c2450', '#26306a', '#324084');
const XS = [55, 97, 139, 181, 223, 265];
const fondoPrem = fijo(() => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(TEL, 1.5 + Math.sin(x * 0.21 + Math.sin(y * 0.02) * 1.5) * 1.1 - (y < 14 ? 1 : 0) - (y > 120 ? (y - 120) * 0.04 : 0), x, y));
  for (let k = 0; k < 46; k++) { const x = 8 + (k * 73) % 304, y = 22 + (k * 41) % 92; if (x > 266 && y < 52) continue; R.pset(x, y, hex('#8a94c8')); if (k % 5 === 0) destello(x, y, 1, hex('#aab4e0')); }
  // el emblema bordado: nuestro planeta con sus dos lunas y un aro
  for (let an = 0; an < 6.3; an += 0.05) R.pset(Math.round(160 + Math.cos(an) * 24), Math.round(35 + Math.sin(an) * 7), OROS);
  R.disco(160, 35, 11, K); R.disco(160, 35, 10, hex('#c06a2c')); R.disco(158, 33, 8, hex('#e09848')); R.disco(156, 31, 4, hex('#f4c078')); R.linea(152, 38, 168, 37, hex('#b06a2c')); R.linea(154, 42, 166, 41, hex('#964a26'));
  for (let an = 0.2; an < 2.9; an += 0.05) R.pset(Math.round(160 + Math.cos(an) * 24), Math.round(35 + Math.sin(an) * 7), ORO);
  R.disco(190, 26, 4, K); R.disco(190, 26, 3, hex('#f8eec8')); R.disco(128, 30, 3, K); R.disco(128, 30, 2, hex('#e8c8a0'));
  // las tablas del escenario
  madera(0, 150, 319, 179, RA('#3a2014', '#4e2c1a', '#643a22', '#7c4c2c', '#94603a'), 10, 61); R.rect(0, 148, 319, 149, K);
  ovalo(160, 165, 140, 4, hex('#2a160e'));
  // la mesa larga con su mantel y su fleco de oro
  R.rect(27, 121, 293, 162, K);
  for (let y = 122; y <= 161; y++) for (let x = 28; x <= 292; x++) R.pset(x, y, y < 127 ? tono(RA('#d8d0c0', '#f0ece0', '#fffdf4'), 1.6 + (h(x >> 1, y, 62) - 0.5), x, y) : tono(RA('#a8a090', '#c4bcac', '#dcd6c8', '#f0ece0'), 2 + Math.sin(x * 0.35) * 1.1 - (y - 127) * 0.02, x, y));
  R.rect(28, 127, 292, 127, hex('#a8a090')); for (let x = 30; x <= 290; x += 4) { R.pset(x, 157, ORO); R.pset(x + 1, 158, OROS); R.pset(x + 2, 157, ORO); R.pset(x + 1, 160, OROS); }
  // seis pilas de dos libros (el nuestro: azul noche con la duna naranja)
  XS.forEach((x, k) => { for (let j = 0; j < 2; j++) { const y = 121 - j * 5, dx = j ? (k % 2 ? 1 : -1) : 0; R.rect(x - 13 + dx, y - 5, x + 13 + dx, y, K); R.rect(x - 12 + dx, y - 4, x + 12 + dx, y - 1, hex(j ? '#1c2450' : '#26306a')); R.rect(x - 12 + dx, y - 4, x - 9 + dx, y - 1, hex('#e09848')); R.rect(x + 9 + dx, y - 3, x + 12 + dx, y - 2, hex('#efe6d0')); R.pset(x + dx - 2, y - 3, hex('#f8eec8')); R.pset(x + dx + 3, y - 2, hex('#f4c078')); } });
});
const telon = (u) => { const xl = Math.round(lerp(160, 9, u)), xr = Math.round(lerp(160, 311, u));
  for (let y = 0; y <= 153; y++) { for (let x = 0; x < xl; x++) R.pset(x, y, y > 150 ? ((x >> 1) & 1 ? ORO : OROS) : tono(ROJ, 2 + Math.sin(x * 80 / xl + Math.sin(y * 0.03) * 1.2) * 1.5 - (x > xl - 3 ? 1.5 : 0) - (y < 14 ? 0.8 : 0), x, y));
    for (let x = xr + 1; x < 320; x++) R.pset(x, y, y > 150 ? ((x >> 1) & 1 ? ORO : OROS) : tono(ROJ, 2 + Math.sin((319 - x) * 80 / (319 - xr) + Math.sin(y * 0.03) * 1.2) * 1.5 - (x < xr + 3 ? 1.5 : 0) - (y < 14 ? 0.8 : 0), x, y)); } };
const SEIS = a(6.18), CAE = 0.2, FLASH = [a(6.5), a(6.95), a(7.35), a(7.7), a(8.05)];
const p2 = (t) => {
  fondoPrem();
  // el foco sigue a la última estatuilla
  const n6 = cl(Math.floor((t - SEIS) / CAE) + 1, 0, 6), fx = n6 ? XS[n6 - 1] : 160 + Math.sin(t * 2) * 60;
  elipse(fx, 90, 30, 64, hex('#fff0c0'), 0.2); elipse(320 - fx, 96, 24, 56, hex('#c8d8ff'), 0.1);
  // las estatuillas caen una a una, con su número
  XS.forEach((x, k) => { const t0 = SEIS + k * CAE, q = lin(t, t0, t0 + 0.2); if (q <= 0) return;
    const dy = q < 1 ? -Math.round((1 - q) * (1 - q) * 40) : t < t0 + 0.32 ? -Math.round(Math.sin((t - t0 - 0.2) / 0.12 * Math.PI) * 3) : 0;
    PZ.estatuilla?.(R, x, 111 + dy, { s: 2, t: t + k * 0.37 });
    if (q >= 1) { R.numero(String(k + 1), x, 58, { centro: true }); if (t < t0 + 0.45) for (let i = 0; i < 4; i++) { const an = i * 1.57 + 0.8, r = 6 + (t - t0 - 0.2) * 40; R.pset(Math.round(x + Math.cos(an) * r), Math.round(109 + Math.sin(an) * r * 0.4), OROL); } } });
  if (n6 >= 6) for (let k = 0; k < 6; k++) if (Math.sin(t * 7 + k * 1.9) > 0.5) destello(XS[k] + (k % 2 ? 3 : -3), 70 + (k % 3) * 9, 2, BL);
  // el telón granate se abre
  telon(ease(lin(t, P2 + 0.1, a(5.95))));
  // delante de la mesa: Villeneuve y el operador; en las esquinas, los fotógrafos
  const fin = SEIS + 5 * CAE + 0.2, bote = (k) => (t > fin ? Math.round(Math.abs(Math.sin((t - fin) * 6.5 + k)) * 5) : 0);
  R.actor(EL.villeneuve, 110, 176, t, { dir: 1, dedo: t > a(5.2) && n6 < 1, sorpresa: n6 > 0 && n6 < 6, brazos: n6 >= 6, sonrisa: true, salto: bote(0) });
  R.actor(EL.operadorDU, 196, 176, t, { dir: -1, sorpresa: n6 > 0 && n6 < 6, brazos: n6 >= 6, sonrisa: n6 >= 6, salto: bote(1.3), habla: n6 < 1 && t > a(5.4) });
  [[EL.lector1DU, 14, 1], [EL.estudiante2DU, 292, -1]].forEach(([el, x, dir], k) => { const r = R.actor(el, x, 178, t, { dir, sostiene: [x + 7 + dir * 13, 152], sonrisa: true }); if (!r?.mano) return; const [mx, my] = r.mano;
    R.rect(mx - 4, my - 6, mx + 4, my, K); R.rect(mx - 3, my - 5, mx + 3, my - 1, hex('#5a6072')); R.disco(mx + dir, my - 3, 1, hex('#c8d8ff')); R.rect(mx - 2, my - 8, mx, my - 7, K);
    FLASH.forEach((tf, i) => { if (i % 2 === k && t >= tf && t < tf + 0.12) { destello(mx, my - 9, 5, BL); destello(mx, my - 9, 3, OROL); } }); });
  FLASH.forEach((tf) => { if (t >= tf && t < tf + 0.07) baña(0, 0, 319, 179, BL, 0.16); });
};

// ── 3. la taquilla de cerca: el contador pasa de 400 a 700 ───────────────────────────────────────────
const AZU = RA('#1c4a50', '#246068', '#2e7880', '#3c9098', '#58a8ac');
const cartel = (x, y, n, w = 54, hh2 = 78) => { R.rect(x - 2, y - 2, x + w + 1, y + hh2 + 1, K); R.rect(x - 1, y - 1, x + w, y + hh2, hex('#d8dce8')); R.rect(x + 1, y + 1, x + w - 2, y + hh2 - 2, K);
  for (let j = y + 2; j <= y + hh2 - 3; j++) for (let i = x + 2; i <= x + w - 3; i++) { const u = (j - y) / hh2, e1 = y + hh2 * 0.62 + Math.sin((i - x) * 0.16 + n) * hh2 * 0.05, e2 = y + hh2 * 0.78 + Math.sin((i - x) * 0.11 + 2 + n) * hh2 * 0.06;
    R.pset(i, j, j > e2 ? tono(RA('#964a26', '#c06a2c', '#e89444'), 1.2 + (Math.cos((i - x) * 0.11 + 2 + n) > 0 ? 0.9 : -0.3), i, j) : j > e1 ? tono(RA('#7a3a2c', '#a85430', '#cc7434'), 1 + (Math.cos((i - x) * 0.16 + n) > 0 ? 0.8 : -0.3), i, j) : tono(RA('#1c1840', '#3a2458', '#6a3058', '#b04c50', '#e08848'), u * 7.6, i, j)); }
  const r = Math.max(2, Math.round(w / 11));
  for (let k = 0; k < n; k++) { const mx = Math.round(x + w / 2 + (k - (n - 1) / 2) * (w / 3.6)), my = Math.round(y + hh2 * 0.26 + Math.abs(k - (n - 1) / 2) * 3); R.disco(mx, my, r, hex('#f8eec8')); R.disco(mx - 1, my - 1, Math.max(1, r - 2), hex('#fffbe8')); }
  for (let k = 0; k < 6; k++) R.pset(x + 5 + (k * 17) % (w - 10), y + 5 + (k * 7) % 12, hex('#c8d0f0')); };
const TAQ = fijo2(() => {
  // la pared de azulejo vidriado y el alero oscuro
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const jx = x % 12 === 0, jy = y % 8 === 0; R.pset(x, y, jx || jy ? hex('#16383e') : tono(AZU, 1.6 + (h((x / 12) | 0, (y / 8) | 0, 71) - 0.5) * 1.6 + ((y % 8) === 1 ? 0.8 : 0), x, y)); }
  for (let y = 0; y <= 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#0e1420', '#141c2c', '#1c2638'), 0.9 + (y / 22) * 1.2, x, y)); R.rect(0, 23, 319, 24, K); R.rect(0, 25, 319, 25, hex('#c89a3c'));
  for (let y = 26; y <= 47; y++) for (let x = 265; x < 320; x++) R.pset(x, y, tono(AZU, 0.9 + (y - 26) / 44, x, y));
  // el zócalo de mármol oscuro y la acera con su alfombra roja
  for (let y = 134; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#1a1c26', '#262a36', '#343846'), 1.3 + Math.sin(x * 0.09 + y * 0.4 + Math.sin(x * 0.03) * 3) * 0.9, x, y)); R.rect(0, 133, 319, 133, K); R.rect(0, 134, 319, 134, hex('#4a4e60'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = (x + (((y - 150) / 10) | 0) * 9) % 26 === 0, jy = (y - 150) % 10 === 0; R.pset(x, y, jx || jy ? hex('#3a3c4a') : tono(RA('#4a4c5c', '#5a5c6e', '#6a6c80', '#7c7e92'), 1.5 + (h(x >> 1, y >> 1, 72) - 0.5) * 1.2, x, y)); }
  R.rect(0, 149, 319, 149, K);
  for (let y = 152; y <= 164; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ROJ, 1.6 + (h(x, y, 73) - 0.5) * 1.3, x, y)); R.rect(0, 151, 319, 151, OROS); R.rect(0, 165, 319, 165, OROS);
  // la taquilla: el marco de latón, el panel del contador, el cristal iluminado, la repisa y el frente
  R.rect(93, 29, 227, 149, K); R.rect(94, 30, 226, 148, hex('#8a6420')); R.rect(96, 32, 224, 146, hex('#c89a3c')); R.rect(96, 32, 224, 33, OROL); R.rect(96, 32, 97, 146, OROL); R.rect(222, 34, 224, 146, hex('#8a6420'));
  R.rect(100, 36, 220, 70, K); R.rect(102, 38, 218, 68, hex('#10141e')); for (let x = 104; x <= 216; x += 4) { R.pset(x, 39, hex('#1c2638')); R.pset(x + 2, 67, hex('#1c2638')); }
  R.rect(100, 75, 220, 129, K); for (let y = 76; y <= 128; y++) for (let x = 101; x <= 219; x++) R.pset(x, y, tono(RA('#c88c40', '#e0a850', '#f0c468', '#f8dc90'), 1.2 + (128 - y) / 52 * 2.3 + (h(x >> 2, y >> 2, 74) - 0.5) * 0.6, x, y));
  // dentro: la balda con los rollos de entradas, el flexo y el reloj
  R.rect(104, 96, 132, 97, hex('#8a6420')); for (const [x, c] of [[110, '#e86a5a'], [122, '#58a8ac']]) { R.disco(x, 90, 6, K); R.disco(x, 90, 5, hex(c)); R.disco(x, 90, 2, hex('#f0ece0')); R.pset(x, 90, K); }
  R.disco(204, 88, 7, K); R.disco(204, 88, 6, hex('#f6f2ea')); R.linea(204, 88, 204, 84, K); R.linea(204, 88, 207, 89, K);
  R.rect(196, 104, 197, 128, K); R.poligono([[189, 104], [205, 104], [201, 97], [193, 97]], K); R.poligono([[191, 103], [203, 103], [200, 98], [194, 98]], hex('#2e7880'));
  R.rect(96, 130, 224, 136, K); R.rect(97, 131, 223, 135, hex('#e8e4dc')); R.rect(97, 134, 223, 135, hex('#b8b4ac')); for (let x = 102; x < 220; x += 9) R.pset(x + (x % 4), 132, hex('#b8b4ac'));
  R.rect(147, 122, 173, 130, K); R.rect(149, 124, 171, 130, hex('#2a1c10')); R.rect(149, 124, 171, 124, hex('#8a6420'));
  for (let x = 100; x <= 196; x += 32) { R.rect(x, 138, x + 26, 146, hex('#8a6420')); R.rect(x + 1, 139, x + 25, 145, hex('#a87c2c')); R.rect(x + 1, 139, x + 25, 139, OROL); R.rect(x + 5, 142, x + 21, 142, hex('#6a4c18')); }
  // los carteles iluminados: el de dos lunas (el que se estrena) y el de una
  cartel(18, 42, 2); cartel(250, 50, 1);
  for (const x of [18, 250]) { const y = x === 18 ? 42 : 50; R.rect(x + 14, y - 8, x + 40, y - 5, K); R.rect(x + 15, y - 7, x + 39, y - 6, hex('#fff4d0')); }
});
const COLA = ['lector1DU', 'estudiante1DU', 'lector2DU', 'voluntario2DU', 'lector3DU', 'estudiante3DU', 'voluntario1DU'];
const SETE = a(10.45), PER = 0.85;
const p3 = (t) => {
  TAQ.copia();
  // las bombillas del marco corren
  for (let k = 0; k < 14; k++) { const x = 100 + k * 9 + 2, onb = ((k + Math.floor(t * 6)) % 3) === 0; R.pset(x, 34, onb ? BL : hex('#8a6420')); if (onb) { R.pset(x - 1, 34, OROL); R.pset(x + 1, 34, OROL); } }
  // el contador: la bolsa y la cifra (400 → 700 en «passed 700»), que luego sigue subiendo con cada entrada
  const val = t < a(9.8) ? 400 + Math.floor((t - P3) * 2) : t < SETE ? Math.round(lerp(403, 700, ease(lin(t, a(9.8), SETE)))) : 700 + Math.floor((t - SETE) * 3);
  R.icono('bolsa', 105, 46, ORO, K, 2); R.numero(String(val), 147, 62, { tam: 16, centro: true }); R.numero('000 000', 176, 60, { fina: true });
  if (t >= a(9.8) && t < SETE && Math.floor(t * 30) % 2) R.rect(102, 66, 218, 67, ORO);
  if (t >= SETE && t < SETE + 0.7) { const e = (t - SETE) / 0.7; R.rect(100, 36, 220, 37, OROL); R.rect(100, 69, 220, 70, OROL); R.rect(100, 36, 101, 70, OROL); R.rect(219, 36, 220, 70, OROL); for (let k = 0; k < 8; k++) { const an = k * 0.785 + 0.3; destello(160 + Math.cos(an) * (40 + e * 34), 53 + Math.sin(an) * (12 + e * 14), 2, OROL); } }
  // la cola: avanza un sitio cada vez; quien llega a la ventanilla recoge su entrada y sale con ella
  const ph = (t - P3) / PER + 3, base = Math.floor(ph), fr = ph - base, mv = ease(Math.min(1, fr / 0.45)), nn = base + mv;
  // la taquillera, tras el cristal: habla y empuja la entrada por la ranura
  const tq = R.actor(EL.estudiante2DU, 153, 137, t, { dir: -1, habla: fr > 0.45 && fr < 0.8, sonrisa: true, sostiene: fr > 0.5 ? [152, 124] : false });
  TAQ.tapa(96, 130, 224, 148);
  if (fr > 0.5 && fr < 0.95) { const e = lin(fr, 0.5, 0.95), x = Math.round(lerp(158, 152, e)), y = Math.round(lerp(128, 139, e)); R.rect(x - 1, y - 3, x + 6, y + 1, K); R.rect(x, y - 2, x + 5, y, hex('#fff4d0')); R.pset(x + 2, y - 1, ROJO); }
  for (let i = base + 7; i >= base - 7; i--) { const x = Math.round(138 + 28 * (nn - i)); if (x < -18 || x > 322) continue;
    const con = x > 139, nom = COLA[((i % COLA.length) + COLA.length) % COLA.length], lib = con && ((i % 3) + 3) % 3 === 0 && t > a(11.6), llega = !con && x === 138 && fr > 0.5;
    const r = R.actor(EL[nom], x, 160, t, { dir: 1, anda: fr < 0.45, sonrisa: con || llega, sostiene: con ? true : llega ? [x + 17, 142] : false });
    if (con && r?.mano) { const [mx, my] = r.mano; if (lib) PZ.libro?.(R, mx + 3, my + 8, {}); else { R.rect(mx - 1, my - 5, mx + 6, my - 1, K); R.rect(mx, my - 4, mx + 5, my - 2, hex('#fff4d0')); R.pset(mx + 2, my - 3, ROJO); } } }
  // los postes de cordón de delante
  for (let k = 0; k < 4; k++) { const x = 24 + k * 91; if (k < 3) for (let i = 0; i <= 91; i++) { const y = 163 + Math.round(Math.sin(i / 91 * Math.PI) * 6); R.pset(x + i, y, hex('#b83038')); R.pset(x + i, y + 1, hex('#6e1420')); }
    R.rect(x - 2, 160, x + 2, 179, K); R.rect(x - 1, 161, x + 1, 179, ORO); R.rect(x - 1, 161, x - 1, 179, OROL); R.disco(x, 158, 3, K); R.disco(x, 158, 2, ORO); R.pset(x - 1, 157, OROL); }
};

// ── 4. la fachada en 2026: la tercera luna ───────────────────────────────────────────────────────────
const TERC = b(15.56);
const p4 = (t) => {
  const f = t - TERC, o = { encuadre: 'sala', epoca: 2026, lunas: f >= 0 ? 3 : 2, cola: 1 };
  T.salas(R, t, o);
  // el tercer cartel se enciende
  if (f >= 0 && f < 1.2) { const e = f / 1.2, on = Math.floor(f * 10) % 2 === 0 || f > 0.5; if (on) { R.rect(238, 70, 268, 70, OROL); R.rect(238, 124, 268, 124, OROL); R.rect(238, 70, 238, 124, OROL); R.rect(268, 70, 268, 124, OROL); }
    for (let k = 0; k < 8; k++) { const an = k * 0.785 + f * 2; destello(253 + Math.cos(an) * (18 + e * 14), 97 + Math.sin(an) * (28 + e * 12), 1 + (k % 2), k % 2 ? OROL : BL); } }
  // el chaval que lo señala y salta, y la lectora con el segundo libro
  R.actor(EL.estudiante1DU, 240, 147, t, { dir: 1, dedo: f > 0.1 && f < 2.2, sorpresa: f > 0 && f < 0.7, sonrisa: f >= 0.7, salto: f > 0 && f < 1 ? Math.round(Math.abs(Math.sin(f * 6.3)) * 5) : 0 });
  const lee = t > b(16.5), lx = Math.round(lerp(300, 270, ease(lin(t, P4 + 0.2, b(16.4)))));
  const r = R.actor(EL.lector2DU, lx, 147, t, { dir: -1, anda: lx > 270, sonrisa: lee, sostiene: lee ? [lx - 6, 128] : true });
  if (r?.mano) { const [mx, my] = r.mano; PZ.libro?.(R, mx - 2, my + (lee ? 4 : 9), {}); }
  if (t > b(16.78) && t < b(18.7)) { const e = lin(t, b(16.78), b(16.78) + 0.18), y = 104 - Math.round(Math.sin(e * Math.PI) * 3); globo(lx + 4, y, 26, 16, 2); R.icono('libro', lx - 7, y - 4, hex('#1c2450'), BL, 1); R.numero('2', lx + 5, y + 5, { color: ROJO, sombra: false }); }
  T.salasDelante(R, t, o);
};

// ── 5. el calendario del vestíbulo: 18 del 12 de 2026 ────────────────────────────────────────────────
const CAL = fijo(() => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#b8a078', '#c8b088', '#d8c098', '#e4d0a8'), 1.9 + ((x % 16) < 2 ? -0.8 : 0) + (h(x >> 1, y >> 2, 81) - 0.5) * 0.5 - (y < 16 ? 0.5 : 0), x, y));
  R.rect(0, 128, 319, 129, K); R.rect(0, 130, 319, 132, hex('#7c4c2c')); R.rect(0, 130, 319, 130, hex('#b08046'));
  madera(0, 133, 319, 166, RA('#3a2014', '#4e2c1a', '#643a22', '#7c4c2c'), 34, 82);
  for (let x = 4; x < 320; x += 40) { R.rect(x, 138, x + 32, 162, hex('#3a2014')); R.rect(x + 1, 139, x + 31, 161, hex('#643a22')); R.rect(x + 1, 139, x + 31, 139, hex('#94603a')); R.rect(x + 3, 141, x + 29, 159, hex('#4e2c1a')); }
  R.rect(0, 167, 319, 167, K);
  for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x + y * 2) % 14 < 2) ? hex('#c89a3c') : tono(ROJ, 1.5 + (h(x, y, 83) - 0.5), x, y));
  // los tres carteles (una, dos y tres lunas) con su aplique
  [1, 2, 3].forEach((n, k) => { const x = 12 + k * 34; cartel(x, 40, n, 28, 44); R.rect(x + 8, 32, x + 20, 34, K); R.rect(x + 9, 33, x + 19, 33, hex('#fff4d0')); R.pset(x + 14, 35, K); });
  // la máquina de palomitas (el maíz que salta va vivo)
  R.rect(15, 100, 61, 166, K); R.rect(16, 101, 60, 106, hex('#b83038')); for (let x = 18; x < 60; x += 6) R.rect(x, 101, x + 2, 106, hex('#f6f2ea'));
  R.rect(16, 107, 60, 138, hex('#f8e8b0')); R.rect(16, 107, 17, 138, BL); R.rect(58, 107, 60, 138, hex('#d8c088')); R.rect(34, 108, 42, 113, K); R.rect(35, 109, 41, 112, hex('#9aa0b0'));
  for (let x = 17; x <= 59; x++) { const y0 = 128 - Math.round(Math.sin((x - 17) / 42 * Math.PI) * 7 + h(x, 1, 84) * 2); for (let y = y0; y <= 138; y++) R.pset(x, y, h(x, y, 85) < 0.3 ? hex('#f8d870') : h(x, y, 86) < 0.5 ? hex('#fff4c8') : BL); }
  R.rect(16, 139, 60, 165, hex('#96202c')); R.rect(16, 139, 60, 140, hex('#d84848')); for (let x = 22; x < 60; x += 8) R.rect(x, 142, x + 2, 163, hex('#f6f2ea')); R.disco(20, 166, 3, K); R.disco(56, 166, 3, K);
  // la ventana a la calle (la nieve va viva)
  R.rect(259, 51, 313, 113, K); R.rect(260, 52, 312, 112, hex('#f0ece0')); R.rect(263, 55, 309, 109, K);
  R.rect(257, 114, 315, 117, K); R.rect(258, 114, 314, 116, hex('#f0ece0'));
  // el calendario: el clavo, las anillas, la cabecera roja y la hoja
  R.rect(125, 29, 217, 135, hex('#a08860')); R.rect(121, 25, 215, 133, K); R.rect(122, 26, 214, 132, hex('#f6f2ea')); R.rect(122, 129, 214, 132, hex('#d0ccc0')); R.rect(122, 126, 214, 126, hex('#d0ccc0'));
  R.rect(122, 26, 214, 50, hex('#c83a3a')); R.rect(122, 26, 214, 27, hex('#e86a5a')); R.rect(122, 49, 214, 50, hex('#8a2020'));
  for (let x = 132; x <= 204; x += 12) { R.rect(x, 22, x + 2, 29, K); R.rect(x + 1, 22, x + 1, 28, hex('#c8ccd8')); }
  R.rect(126, 54, 150, 68, K); R.rect(127, 55, 149, 67, hex('#e8eef8'));
  for (let k = 0; k < 7; k++) { R.rect(128 + k * 12, 118, 136 + k * 12, 123, k === 4 ? hex('#c83a3a') : hex('#b8bcc8')); }
  // la escalera de mano
  for (const x of [226, 246]) { R.rect(x, 136, x + 2, 167, K); R.rect(x + 1, 136, x + 1, 167, hex('#c89858')); } for (let y = 139; y <= 163; y += 8) { R.rect(226, y, 248, y + 1, K); R.rect(227, y, 247, y, hex('#e0b878')); }
});
const DIA = b(20.48), RODEA0 = b(20.62), RODEA1 = b(21.4);
const p5 = (t) => {
  CAL();
  // la calle de noche por la ventana: farolas, un tranvía de luces y la nieve
  R.recorte([264, 56, 308, 108]);
  for (let y = 56; y <= 108; y++) for (let x = 264; x <= 308; x++) R.pset(x, y, y > 96 ? hex((x + y) & 1 ? '#c8d4e8' : '#e8eef8') : tono(RA('#141a3c', '#1c2450', '#26306a'), 0.6 + (y - 56) / 40 * 2, x, y));
  for (const [x, hh2] of [[266, 16], [278, 24], [292, 14], [302, 20]]) { for (let y = 96 - hh2; y <= 96; y++) for (let i = 0; i < 9; i++) R.pset(x + i, y, hex('#10142c')); for (let j = 0; j < hh2 - 3; j += 4) for (let i = 1; i < 8; i += 3) if (h(x + i, j, 87) < 0.6) R.pset(x + i, 94 - j, Math.sin(t * 0.7 + x + j) > -0.8 ? hex('#f8d870') : hex('#3a3448')); }
  { const x = 262 + ((t * 14) % 70) - 10; for (let i = 0; i < 12; i++) { R.pset(Math.round(x + i), 95, hex('#e86a5a')); R.pset(Math.round(x + i), 94, i % 3 ? hex('#fff4d0') : hex('#e86a5a')); R.pset(Math.round(x + i), 93, hex('#e86a5a')); } }
  for (let k = 0; k < 26; k++) { const x = 264 + ((k * 17 + Math.sin(t * 1.3 + k) * 3 + 44) % 44), y = 56 + ((k * 23 + t * (9 + (k % 4) * 4)) % 52); R.pset(Math.round(x), Math.round(y), BL); }
  R.recorte(null);
  R.rect(285, 55, 286, 109, hex('#f0ece0')); R.rect(263, 80, 309, 81, hex('#f0ece0'));
  // el maíz que salta en la máquina
  for (let k = 0; k < 7; k++) { const q = (t * 1.7 + k * 0.37) % 1, x = Math.round(24 + k * 5 + Math.sin(k * 3) * 2), y = Math.round(124 - Math.sin(q * Math.PI) * (8 + (k % 3) * 3)); R.rect(x, y, x + 1, y + 1, k % 2 ? hex('#fff4c8') : BL); }
  // la cabecera: el año; el mes en su casilla; el día pasa hojas hasta el 18
  const fl = t >= b(21.44) && t < b(21.44) + 0.8 && Math.floor(t * 8) % 2 === 0;
  R.numero('2026', 168, 47, { tam: 16, centro: true, color: fl ? OROL : BL, sombra: false });
  R.numero('12', 138, 66, { centro: true, color: hex('#1c2450'), sombra: false });
  const up = ease(lin(t, P5 + 0.25, DIA)), dia = t >= DIA ? 18 : Math.min(17, 1 + Math.floor(up * 17)), cae = t >= DIA && t < DIA + 0.2 ? Math.round(Math.sin((t - DIA) / 0.2 * Math.PI) * 3) : 0;
  R.numero(String(dia), 168, 112 + cae, { tam: 32, centro: true, color: hex('#1c2450'), sombra: false });
  // las hojas arrancadas que caen
  if (t < DIA + 0.5) for (let k = 0; k < 4; k++) { const q = ((t - P5) * 2.2 + k * 0.25) % 1, life = t - P5 - 0.25; if (life < 0 || (t > DIA && q < (t - DIA) * 2.2)) continue; const x = Math.round(150 - q * (50 + k * 14) + Math.sin(q * 9 + k) * 6), y = Math.round(100 + q * q * 70), w = 9 + Math.round(Math.sin(q * 12 + k) * 4);
    R.poligono([[x, y], [x + w, y - 2], [x + w + 2, y + 9], [x + 2, y + 11]], K); R.poligono([[x + 1, y + 1], [x + w - 1, y - 1], [x + w + 1, y + 8], [x + 3, y + 10]], hex(k % 2 ? '#f6f2ea' : '#d8d4c8')); }
  // el empleado, en la escalera, con el rotulador rojo en la pértiga: rodea el 18
  const ur = lin(t, RODEA0, RODEA1), an = -0.5 + ur * 6.6, ex = 168, ey = 96, rx = 38, ry = 21;
  for (let q = 0; q <= ur * 6.6; q += 0.02) { const xx = ex + Math.cos(-0.5 + q) * (rx - q * 0.4), yy = ey + Math.sin(-0.5 + q) * (ry - q * 0.25); R.rect(Math.round(xx), Math.round(yy), Math.round(xx) + 1, Math.round(yy) + 1, hex('#d8303a')); }
  const lev = lin(t, DIA - 0.2, RODEA0) - lin(t, RODEA1 + 0.15, RODEA1 + 0.5), tx = lerp(214, ex + Math.cos(an) * rx, lev), ty = lerp(74, ey + Math.sin(an) * ry, lev);
  const feliz = t > RODEA1 + 0.2, em = R.actor(EL.estudiante3DU, 230, 139, t, { dir: -1, sostiene: [222, 122 - Math.round(lev * 6)], sonrisa: feliz, habla: t < DIA - 0.3 && t > P5 + 0.6, salto: feliz && t < RODEA1 + 0.7 ? Math.round(Math.sin((t - RODEA1 - 0.2) / 0.5 * Math.PI) * 3) : 0 });
  if (em?.mano) { const [mx, my] = em.mano; R.linea(mx + 3, my + 5, tx, ty, K); R.linea(mx + 3, my + 4, tx, ty - 1, hex('#c89858')); R.disco(Math.round(tx), Math.round(ty), 2, K); R.rect(Math.round(tx) - 1, Math.round(ty) - 1, Math.round(tx), Math.round(ty), hex('#d8303a')); }
  // una niña que llega a mirar y aplaude
  const nx = Math.round(lerp(70, 104, ease(lin(t, P5 + 0.3, P5 + 1.5))));
  R.actor(EL.estudiante1DU, nx, 174, t, { dir: 1, anda: nx < 104, dedo: t > DIA && t < RODEA1, brazos: feliz, sonrisa: true, salto: feliz ? Math.round(Math.abs(Math.sin((t - RODEA1) * 6)) * 4) : 0 });
};

// ── 6. el cajón: la hoja del reportaje, setenta años después ─────────────────────────────────────────
let BA = null;
const SEP = RA('#3a2a1c', '#5e4630', '#8a6c48', '#b89868', '#dcc49a', '#f0e2c0');
const FX = 58, FY = 62, FW = 128, FH = 64;
const PINO = RA('#6a4a26', '#8a6434', '#a88046', '#c49c5c', '#dcb878');
const CAJ = fijo(() => {
  // la sombra de debajo del tablero
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#140c08', '#1c120c', '#261810'), 0.7 + y / 60 + (h(x >> 2, y >> 1, 91) - 0.5) * 0.4, x, y));
  // el fondo del cajón, forrado con un papel verde de rombos, más oscuro hacia el fondo
  for (let y = 30; y <= 150; y++) for (let x = 16; x <= 303; x++) { const dm = ((x + y) % 12 === 0) || ((x - y + 600) % 12 === 0); R.pset(x, y, tono(RA('#1c2420', '#33423a', '#4a5a48', '#5a6c56', '#6a7e64', '#7c9074'), 3.6 + (dm ? -0.9 : 0) + (h(x >> 1, y >> 1, 93) - 0.5) * 0.9 - (y < 62 ? (62 - y) * 0.11 : 0) - (x < 34 ? (34 - x) * 0.08 : 0) - (x > 290 ? (x - 290) * 0.08 : 0), x, y)); }
  // las paredes del cajón, de pino
  for (let y = 24; y <= 150; y++) for (const x0 of [4, 304]) for (let x = x0; x <= x0 + 11; x++) R.pset(x, y, tono(PINO, 1.2 + (x - x0) / 11 * 2 + Math.sin(y * 0.08 + x0) * 0.6 - (y < 60 ? (60 - y) * 0.05 : 0), x, y));
  for (let y = 24; y <= 29; y++) for (let x = 4; x <= 315; x++) R.pset(x, y, tono(PINO, 0.6 + (y - 24) * 0.25, x, y));
  R.rect(3, 23, 316, 23, K); R.rect(3, 23, 3, 150, K); R.rect(316, 23, 316, 150, K); R.rect(16, 30, 16, 150, K); R.rect(303, 30, 303, 150, K); R.rect(16, 30, 303, 30, K);
  // el frente del cajón, de nogal, con su tirador de latón
  madera(0, 152, 319, 179, RA('#3a2014', '#4e2c1a', '#643a22', '#7c4c2c', '#94603a'), 15, 95); R.rect(0, 150, 319, 151, K); R.rect(0, 152, 319, 152, hex('#b08046'));
  R.rect(126, 160, 194, 174, K); R.rect(127, 161, 193, 173, hex('#a87c2c')); R.rect(127, 161, 193, 161, OROL); R.rect(138, 164, 182, 169, K); R.rect(139, 165, 181, 167, ORO); R.rect(139, 168, 181, 168, OROS); for (const x of [131, 189]) { R.disco(x, 167, 1, OROL); }
  // la hoja del reportaje: los titulares en barras, la foto, las columnas de rayas y el doblez
  R.rect(43, 51, 253, 149, hex('#1c2420')); R.rect(39, 47, 251, 147, K);
  for (let y = 48; y <= 146; y++) for (let x = 40; x <= 250; x++) R.pset(x, y, tono(RA('#c8b890', '#d8caa4', '#e8dcb8', '#f2e8cc'), 2.2 + (h(x >> 2, y >> 2, 96) - 0.5) * 1.2 - (y === 97 || x === 145 ? 0.9 : 0), x, y));
  R.rect(58, 52, 150, 56, hex('#3a3440')); R.rect(156, 52, 186, 56, hex('#3a3440'));
  R.rect(FX - 2, FY - 2, FX + FW + 1, FY + FH + 1, K); R.rect(FX - 1, FY - 1, FX + FW, FY + FH, BL);
  for (let y = 62; y <= 126; y += 4) R.rect(194, y, 242 - ((y * 7) % 13), y, hex('#8a8474'));
  for (let y = 132; y <= 142; y += 4) R.rect(58, y, 186 - ((y * 5) % 23), y, hex('#8a8474'));
  R.rect(46, 44, 50, 58, K); R.rect(47, 45, 49, 57, hex('#c8ccd8')); R.rect(48, 47, 48, 55, hex('#8a90a0'));
  R.icono('X', 206, 130, ROJO, hex('#e8dcb8'), 2);
  // lo demás del cajón: el lápiz, la goma, la llave, dos monedas y una brizna seca
  R.linea(262, 124, 296, 132, K); R.linea(262, 123, 296, 131, hex('#e8c040')); R.linea(262, 122, 296, 130, K); R.rect(296, 130, 299, 132, hex('#f0d8b0')); R.pset(300, 132, K);
  R.rect(266, 138, 280, 145, K); R.rect(267, 139, 279, 144, hex('#e88a8a')); R.rect(267, 139, 271, 144, hex('#5a7ab0'));
  R.disco(26, 136, 4, K); R.disco(26, 136, 3, ORO); R.disco(26, 136, 1, hex('#33423a')); R.rect(24, 140, 27, 148, K); R.rect(25, 140, 26, 147, ORO); R.rect(27, 144, 29, 145, ORO);
  for (const [x, y] of [[24, 112], [30, 117]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#b87840')); R.pset(x - 1, y - 1, hex('#e8a868')); }
  for (let i = 0; i < 26; i++) { const x = 20 + Math.round(i * 0.5 + Math.sin(i * 0.3) * 2), y = 100 - i * 2; R.pset(x, y, hex('#a89858')); if (i > 16) R.pset(x + 1, y, hex('#c8b870')); }
  // la telaraña del rincón
  for (let k = 0; k < 4; k++) R.linea(17, 31, 17 + Math.round(Math.cos(k * 0.5) * 26), 31 + Math.round(Math.sin(k * 0.5) * 26), hex('#5a6c56')); for (const r of [9, 17, 25]) for (let an = 0; an < 1.5; an += 0.07) R.pset(17 + Math.round(Math.cos(an) * r), 31 + Math.round(Math.sin(an) * (r - 2)), hex('#6a7e64'));
});
const foto = (t) => { if (!BA) BA = R.nuevo(); const prev = R.usar(BA);
  T.oregon(R, t, { encuadre: 'dunas', camara: 'aire', epoca: 1957, sombra: false });
  R.usar(prev);
  for (let j = 0; j < FH; j++) for (let i = 0; i < FW; i++) { const p = BA[(30 + j * 2) * 320 + 32 + i * 2], l = ((p & 255) * 0.3 + ((p >>> 8) & 255) * 0.5 + ((p >>> 16) & 255) * 0.2) / 255; R.pset(FX + i, FY + j, tono(SEP, l * 5.6 + 0.1 - (i < 3 || j < 3 || i > FW - 4 || j > FH - 4 ? 0.8 : 0), FX + i, FY + j)); }
  // la avioneta cruza la foto (con su sombra en las dunas), recortada al marco y en sepia
  const u = lin(t, b(23.45), b(26.5)), ax = Math.round(FX - 28 + u * (FW + 60)), ay = Math.round(FY + 46 - u * 20 + Math.sin(t * 2.2) * 1.5);
  R.recorte([FX, FY, FX + FW - 1, FY + FH - 1]);
  for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3) ** 2 < 1 && ((i + j) & 1)) R.pset(ax - 16 + i, ay + 16 + j, SEP[0]);
  R.recorte(null);
  recortada(FX, FY, FX + FW - 1, FY + FH - 1, () => PZ.avioneta?.(R, ax, ay, { helice: true, t }), (p, x, y) => { const l = ((p & 255) * 0.3 + ((p >>> 8) & 255) * 0.5 + ((p >>> 16) & 255) * 0.2) / 255; return l < 0.2 ? SEP[0] : tono(SEP, 1.6 + l * 4.3, x, y); }); };
const ARE = RA('#a8884c', '#c4a870', '#e6d2a0', '#f4e8c4');
const p6 = (t) => {
  CAJ(); foto(t);
  // el reloj de bolsillo, que anda, y su «70»
  { const x = 280, y = 86; ovalo(x + 2, y + 3, 13, 12, hex('#1c2420')); R.disco(x, y, 12, K); R.disco(x, y, 11, ORO); R.disco(x, y, 9, K); R.disco(x, y, 8, hex('#f6f2ea')); R.rect(x - 2, y - 16, x + 2, y - 12, K); R.rect(x - 1, y - 15, x + 1, y - 13, ORO);
    for (let k = 0; k < 12; k++) R.pset(Math.round(x + Math.cos(k * 0.5236) * 7), Math.round(y + Math.sin(k * 0.5236) * 7), hex('#5a5048'));
    const s = Math.floor(t * 2) * 0.5236; R.linea(x, y, x + Math.cos(s - 1.57) * 6, y + Math.sin(s - 1.57) * 6, ROJO); R.linea(x, y, x + 3, y - 3, K); R.pset(x, y, K);
    for (let i = 0; i < 16; i++) R.pset(x - 12 - i, y + 10 + Math.round(Math.sin(i * 0.6) * 2 + i * 0.5), i % 2 ? ORO : OROS); }
  if (t > b(23.17) - 0.05 && t < b(25.3)) { const e = lin(t, b(23.17) - 0.05, b(23.17) + 0.15), y = 58 - Math.round(Math.sin(e * Math.PI) * 3); globo(278, y, 34, 16, 2); R.icono('reloj', 264, y - 4, hex('#3a2418'), BL, 1); R.numero('70', 283, y + 5, { centro: true, color: hex('#1c2450'), sombra: false }); }
  // el hilo de arena que cae del tablero y el montón que crece y va tapando la esquina de la hoja
  const g = lin(t, P6, E.duracion - 0.2), hm = 5 + g * 24, w = 16 + g * 26, cx = 226;
  for (let dx = -Math.round(w); dx <= Math.round(w); dx++) { const top = Math.round(150 - hm * Math.pow(1 - Math.abs(dx) / w, 1.25)); for (let y = top; y <= 150; y++) R.pset(cx + dx, y, tono(ARE, 1.5 + (dx < 0 ? 0.9 : -0.3) + (h(cx + dx, y, 97) - 0.5) * 1.6 - (y - top) * 0.03, cx + dx, y)); if (top < 150) R.pset(cx + dx, top, dx < 2 ? ARE[3] : ARE[1]); }
  for (let y = 24; y < 150 - hm; y++) { const q = (y + Math.floor(t * 60)) % 3; R.pset(cx + (q === 0 ? 1 : 0), y, q ? ARE[2] : ARE[3]); if ((y + Math.floor(t * 40)) % 7 === 0) R.pset(cx - 1, y, ARE[1]); }
  for (let k = 0; k < 9; k++) { const q = (t * 2.2 + k * 0.13) % 1, s = k % 2 ? 1 : -1; R.pset(Math.round(cx + s * q * (6 + k)), Math.round(150 - hm - Math.sin(q * Math.PI) * 5 + q * (hm * 0.5)), ARE[3]); }
  // la araña que baja por su hilo
  { const y = 40 + Math.round((Math.sin(t * 0.9) * 0.5 + 0.5) * 16); R.linea(34, 31, 34, y, hex('#6a7e64')); R.rect(33, y, 35, y + 2, K); R.pset(32, y + (Math.sin(t * 8) > 0 ? 0 : 2), K); R.pset(36, y + (Math.sin(t * 8) > 0 ? 2 : 0), K); }
  // motas de polvo en el rayo de luz
  for (let k = 0; k < 16; k++) { const x = 40 + (k * 37 + t * (3 + k % 4)) % 240, y = 34 + (k * 29 + Math.sin(t * 0.8 + k) * 6) % 110; if (Math.sin(t * 1.5 + k * 2) > 0.2) R.pset(Math.round(x), Math.round(y), hex('#f0e2c0')); }
};

const efectos = [[0.15, 'interruptor'], [GOLPE + 0.35, 'publico'], [a(3.0), 'tic'], [a(3.95), 'bip'],
  [P2 + 0.15, 'whoosh'], [SEIS + 0.2, 'toc'], [SEIS + 0.6, 'toc'], [SEIS + 1.0, 'toc'], [a(7.35), 'flash'], [a(7.8), 'palmada'],
  [a(9.8), 'tic'], [SETE, 'bip'], [a(11.9), 'papel'], [a(13.2), 'publico'],
  [TERC, 'brillo'], [b(16.9), 'pop'], [P5 + 0.3, 'papel'], [DIA, 'golpecito'], [RODEA0 + 0.1, 'lapiz'], [b(21.9), 'palmada'],
  [P6 + 0.25, 'cerrojo'], [b(23.17), 'tic'], [b(24.3), 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P3 ? 2021 : t < P4 ? 2024 : 2026) });
''')

# ─────────────────────────────────────────────────────────────── du-dunas ──
PICTOS = r'''
// las seis piezas del sistema (las mismas casillas de la lámina de oregon 'corte'): 0 viento, 1 arena, 2 hierba, 3 agua,
// 4 escarabajo, 5 pájaro. Rejillas de 11 × 11; (cx, cy) = el centro; s = escala
const PIC = [
  ['...........', '..WWWW.....', '.W....W....', '......W....', 'WWWWWW..bb.', '.......b..b', 'bbbbbbbb..b', '..........b', 'WWWWWWW.bb.', '.......W...', '.....WW....'],
  ['...........', '...........', '.....T.....', '....TAa....', '...TAAaa...', '..TAAAAaa..', '.TAAAAAaaa.', 'TAAAAAAAaaa', 'AAAAAAAAAaa', '...........', '...........'],
  ['L....L....L', '.G...G...G.', '.G..LG..G..', '..G.G.G.G..', '..G.GGG.G..', '...GGgGG...', '...GgGgG...', '....GgG....', '....ggg....', '...........', '...........'],
  ['.....B.....', '.....B.....', '....BBB....', '....BBB....', '...BBBBB...', '..BVBBBBd..', '..BVBBBBd..', '..BBBBBdd..', '...BBBdd...', '....ddd....', '...........'],
  ['...........', '.k.......k.', '..k.kkk.k..', '...kkkkk...', 'k.knnknnk.k', '.kknoknokk.', '..knnknnk..', '.kknnknnkk.', 'k.knnknnk.k', '...kkkkk...', '..k.....k..'],
  ['...........', '......rrr..', '.....rCCkr.', '..rrrrCCCkk', '.rCCCrrrC..', 'rCCCCCCCC..', '.rCCCCCCr..', '..rrCCrr...', '....o.o....', '....o.o....', '...oo.oo...'],
];
const PICPAL = { W: hex('#f6f6f6'), b: hex('#8ac0e8'), T: hex('#f4e8c4'), A: hex('#e6d2a0'), a: hex('#c4a870'), L: hex('#b8d078'), G: hex('#5a8a3c'), g: hex('#3e6a30'), B: hex('#4a90d0'), V: hex('#c8e4f8'), d: hex('#2a5a9a'),
  k: hex('#17151d'), n: hex('#7a4a2a'), o: hex('#e8a030'), r: hex('#7a7468'), C: hex('#f0e8d4') };
const picto = (k, cx, cy, s = 1, dx = 0) => { const f = PIC[k], x0 = Math.round(cx - 5.5 * s), y0 = Math.round(cy - 5.5 * s);
  for (let j = 0; j < 11; j++) for (let i = 0; i < 11; i++) { const c = f[j][i]; if (c === '.') continue; const xx = x0 + i * s + (j % 2 ? dx : 0), yy = y0 + j * s; R.rect(xx, yy, xx + s - 1, yy + s - 1, PICPAL[c]); } };
'''

E['du-dunas'] = ('Las dunas, hoy', '''// DU-DUNAS (frases 30–31), sin cartela. Siete planos:
// 1. oregon 'dunas'/aire: empieza en 1957, con la avioneta que se va; en «what happened» una ola verde barre la franja
//    de dunas de izquierda a derecha (el mismo sitio, hoy) y la barra del año corre de 1957 a 2026; en «the strangest
//    part» sale un «?» grande y luego un «!». Corta en «The European grass».
// 2. (LOCAL) la duna en corte, hoy y a ras de suelo: de la mata vieja salen rizomas a los dos lados y brotan matas
//    nuevas una tras otra («worked too well»); las flores de la arena se marchitan y el chorlito sale corriendo; en
//    «invasive plant» el brazo del guarda entra por la izquierda y clava la señal de la planta tachada. Corta en «The open sand».
// 3. (LOCAL) el tablón del sendero: tres fotos aéreas (de 1957 a 2026) en las que la arena libre encoge («shrinks
//    every year»), el guarda lo explica; en «crews with bulldozers» llega la excavadora con el operario delante.
//    Corta en «and volunteers».
// 4. oregon 'dunas'/general (hoy): la excavadora empuja un montón de hierba, llegan los voluntarios con palas y cavan
//    («shovels»); en «clear it» la franja limpia crece, vuelven las rachas de arena («move again») y lo celebran.
//    Corta antes de «And that is exactly».
// 5. (LOCAL, 1957) el escritorio de Herbert desde arriba: sobre el vade, seis fichas con lo que se trajo (viento,
//    agua, pájaro; arena, escarabajo y hierba): su mano deja las dos últimas («the idea Herbert took home»); en «a
//    collection of separate things» cada una recibe su marco de puntos y su número, y en «things» una X los tacha.
//    Corta en «It is a system».
// 6. oregon 'pueblo'/corte (1957): la lámina con las seis piezas unidas («system»: corren puntos por las líneas y laten
//    los anclajes); Herbert la señala, va hasta la casilla de la hierba, salta y la arranca en «one grass»; todo se
//    apaga («everything else changes») y él se queda mirando la ficha. Corta en «That is called».
// 7. planeta 'desierto'/roca (1965, de noche): Herbert en la repisa con el libro abierto; las seis piezas giran en
//    corro unidas por puntos («ecology») y en «hid it inside» caen en espiral dentro del libro, que se cierra de un
//    bote y brilla; la loma se mueve bajo la arena y cruza una fugaz («a space adventure»).''', UTIL + PICTOS + r'''
const h2 = (s) => en('hoy', (s - 0.9) / 16.263), s2 = (s) => en('sistema', (s - 18.908) / 15.335);
const Q2 = h2(5.02) - 0.05, Q3 = h2(9.71) - 0.05, Q4 = h2(13.39) - 0.05, Q5 = s2(18.91) - 0.3, Q6 = s2(24.66) - 0.05, Q7 = s2(30.55) - 0.1;
const CIELO2 = RA('#5aa0d8', '#78b4e0', '#98c8e8', '#b8dcf0', '#d8ecf4');
const ARN = RA('#8a6c40', '#a8884c', '#c4a870', '#dcc490', '#e6d2a0', '#f4e8c4');
const NUB = RA('#8aa8cc', '#c8d8ec', '#ffffff');
const VERD = RA('#3e6a30', '#5a8a3c', '#7aa850', '#98bc68');

// ── 1. las dunas desde el aire: de 1957 a hoy ───────────────────────────────────────────────────────
let B57 = null;
const OA = { encuadre: 'dunas', camara: 'aire', sombra: false };
const VER0 = h2(1.0), VER1 = h2(2.95), RARO = h2(3.15);
const p1 = (t) => {
  const u = ease(lin(t, VER0, VER1));
  if (u < 1) { if (!B57) B57 = R.nuevo(); const prev = R.usar(B57); T.oregon(R, t, { ...OA, epoca: 1957 });
    const ua = lin(t, -0.5, h2(2.3)), ax = Math.round(lerp(130, 372, ua)), ay = Math.round(lerp(100, 74, ua) + Math.sin(t * 2) * 2);
    baña(ax - 62, ay + 26, ax - 26, ay + 36, K, 0.3, (x, y) => (((x - ax + 44) / 16) ** 2 + ((y - ay - 31) / 4) ** 2 < 1 ? 1 : 0));
    PZ.avioneta?.(R, ax, ay, { helice: true, t });
    R.usar(prev); }
  T.oregon(R, t, { ...OA, epoca: 'hoy' });
  if (u < 1) { const fr0 = -40 + u * 420; for (let y = 0; y < 180; y++) { const fr = fr0 + Math.sin(y * 0.09 + 1) * 12 + Math.sin(y * 0.31) * 4;
      for (let x = Math.max(0, Math.floor(fr - 8)); x < 320; x++) { const d = x - fr; if (d > 8 || d > BY[(y & 3) * 4 + (x & 3)] / 2) R.pset(x, y, B57[y * 320 + x]); }
      if (u > 0 && y > 46) { const xf = Math.round(fr); if (y % 2 === 0) R.pset(xf, y, hex('#e0f4a8')); R.pset(xf + 1, y, hex('#b8d078')); if (h(y, Math.floor(t * 12), 5) < 0.2) R.pset(xf + 3 + (y % 5), y, hex('#e0f4a8')); } } }
  // «the strangest part»: el «?» y luego el «!»
  if (t > RARO) { const e = lin(t, RARO, RARO + 0.2), y = 84 - Math.round(Math.sin(e * Math.PI) * 5 + Math.sin(t * 3) * 1.5), ex = t > h2(4.15);
    globo(138, y, 30, 28, 0); R.icono(ex ? '!' : '?', 128, y - 11, ex ? ROJO : hex('#1c2450'), hex('#d0d4e0'), 3);
    [[92, 122, 0.3], [182, 64, 0.5]].forEach(([x, yy, d], k) => { if (t > RARO + d) R.icono('?', x, yy - Math.round(Math.sin(t * 3 + k * 2) * 2), BL, K, 2); }); }
};

// ── 2. la duna en corte: la hierba funciona demasiado bien ─────────────────────────────────────────
const ys = (x) => 104 + Math.sin(x * 0.02 + 1) * 4 + Math.sin(x * 0.07) * 1.5;
const SUB = fijo(() => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIELO2, y / 84 * 4.4 + (h(x >> 2, y >> 1, 21) - 0.5) * 0.5, x, y));
  for (let y = 70; y <= 86; y++) for (let x = 0; x < 140; x++) R.pset(x, y, h(x >> 1, y, 22) < 0.1 ? BL : tono(RA('#2a5a7a', '#3a6a8a', '#4a82a0', '#6aa0b8'), 0.6 + (y - 70) / 6, x, y));
  R.rect(111, 48, 117, 71, K); R.rect(112, 49, 116, 71, BL); R.rect(112, 56, 116, 59, ROJO); R.rect(112, 65, 116, 67, ROJO); R.rect(110, 45, 118, 48, K); R.rect(112, 46, 116, 47, hex('#f8d870')); R.poligono([[110, 45], [118, 45], [114, 41]], ROJO);
  // las dunas del fondo, ya verdes, con calvas de arena, y el bosque a la derecha
  for (let x = 0; x < 320; x++) { const y0 = Math.round(80 - Math.max(0, Math.sin((x - 50) * 0.011)) * 22 - Math.sin(x * 0.05) * 2 + (x < 50 ? (50 - x) * 0.12 : 0));
    for (let y = y0; y < 116; y++) { const calva = Math.sin(x * 0.045 + 2) + Math.sin(y * 0.3 + x * 0.02) * 0.4 > 1.05; R.pset(x, y, calva ? tono(ARN, 4.2 + (h(x, y, 24) - 0.5), x, y) : tono(VERD, 1.3 + Math.sin(x * 0.3 + y * 0.7) * 0.8 + (h(x, y, 24) - 0.5) * 1.2 + (y - y0 < 2 ? 1 : 0), x, y)); } }
  for (let x = 226; x < 320; x += 5) { const hh2 = 9 + Math.round(h(x, 1, 26) * 8), yb = Math.round(64 + Math.sin((x - 50) * 0.011) * -4 + (x - 226) * 0.02); R.poligono([[x - 4, yb + 14], [x + 4, yb + 14], [x, yb + 14 - hh2]], hex(h(x, 2, 26) < 0.5 ? '#2e5a3c' : '#244a32')); }
  // el corte del terreno: la arena en capas, húmeda y oscura hacia abajo, con el agua al fondo
  for (let x = 0; x < 320; x++) { const s = Math.round(ys(x)); for (let y = s; y < 180; y++) { const dp = y - s, band = Math.sin(dp * 0.22 + Math.sin(x * 0.03) * 1.6 + x * 0.012);
      R.pset(x, y, dp < 1 ? hex('#6a5030') : dp < 3 ? ARN[5] : y > 168 + Math.sin(x * 0.05) * 2 ? tono(RA('#3a5a70', '#4a7088', '#6a8898'), 1 + (h(x >> 1, y, 27) - 0.5) * 1.6, x, y) : tono(ARN, 4.3 - dp * 0.05 + band * 0.7 + (h(x, y, 25) - 0.5) * 1.3, x, y)); } }
  for (let k = 0; k < 26; k++) { const x = 6 + (k * 67) % 308, y = Math.round(ys(x)) + 14 + (k * 29) % 44, w = 2 + (k % 3); ovalo(x, y, w, 1 + (k % 2), hex(k % 3 ? '#8a8474' : '#6a6458')); R.pset(x - 1, y - 1, hex('#c8c0b0')); }
  for (const [x, dy] of [[44, 30], [118, 46], [212, 38], [296, 28]]) { const y = Math.round(ys(x)) + dy; for (let an = 3.3; an < 6.2; an += 0.2) R.pset(Math.round(x + Math.cos(an) * 4), Math.round(y + Math.sin(an) * 3), BL); R.rect(x - 3, y, x + 3, y, hex('#d8c8b0')); }
  { const y = Math.round(ys(84)) + 22; R.rect(70, y, 100, y + 3, K); R.rect(71, y + 1, 99, y + 2, hex('#8a6c4a')); R.rect(71, y + 1, 99, y + 1, hex('#b89468')); R.pset(80, y + 2, K); R.pset(92, y + 1, K); }
});
const RIZ0 = h2(5.15), RIZ1 = h2(7.1), INV = h2(8.45);
const raiz = (x0, y0, len, k) => { for (let i = 0; i < len; i++) { const x = Math.round(x0 + Math.sin(i * 0.19 + k) * 3 + (h(k, 1, 31) - 0.5) * i * 0.5), y = y0 + i; R.pset(x, y, hex('#f0e4b8')); R.pset(x + 1, y, hex('#a88c58')); if (i % 9 === 5) { R.pset(x - 1 - (i % 2), y + 1, hex('#f0e4b8')); R.pset(x + 2 + (i % 2), y + 1, hex('#d8c898')); } } };
const flor = (x, t, tm) => { const m = lin(t, tm, tm + 0.8), y = Math.round(ys(x)), tx = Math.round(x + m * 6), ty = Math.round(y - 9 + m * 6); R.linea(x, y, tx, ty, hex(m > 0.5 ? '#8a7a40' : '#5a8a3c')); R.pset(x - 2, y - 2, hex('#7aa850')); R.pset(x + 2, y - 3, hex('#7aa850'));
  const c = m > 0.6 ? hex('#a88860') : hex('#f078b0'), c2 = m > 0.6 ? hex('#8a6c40') : hex('#ffb0d0'); R.rect(tx - 2, ty - 1, tx + 2, ty + 1, c); R.rect(tx - 1, ty - 2, tx + 1, ty + 2, c); R.pset(tx, ty, hex('#f8d870')); R.pset(tx - 1, ty - 1, c2); };
const p2 = (t) => {
  SUB();
  // nubes de tres tonos a tres velocidades y gaviotas
  for (const [x0, y, w, v] of [[30, 30, 70, 2.4], [150, 46, 86, 1.5], [250, 60, 54, 3.2], [-40, 58, 46, 1.9], [96, 24, 40, 2.9]]) { const x = ((x0 + t * v + 60) % 420) - 60; if (y < 56 && x > 226) continue; nube3(x, y, w, NUB); nube3(x + w * 0.2, y + 2, w * 0.6, NUB); }
  for (let k = 0; k < 5; k++) R.gaviota(Math.round(50 + k * 34 + t * 9), Math.round(36 + k * 9 + Math.sin(t * 1.5 + k) * 3), t, k);
  // la espuma del mar
  for (let k = 0; k < 8; k++) { const x = (k * 37 + Math.floor(t * 6) * 3) % 136; R.pset(x, 74 + (k % 5) * 2, BL); R.pset(x + 1, 74 + (k % 5) * 2, BL); }
  // el escarabajo que recorre su galería y las hormigas
  { const x = 20 + ((t * 11) % 280), y = Math.round(ys(x)) + 36 + Math.round(Math.sin(x * 0.05) * 4); for (let i = 0; i < 14; i++) R.pset(Math.round(x - 6 - i * 3), Math.round(ys(x - 6 - i * 3)) + 37 + Math.round(Math.sin((x - 6 - i * 3) * 0.05) * 4), hex('#a88c58')); picto(4, Math.round(x), y, 1, Math.sin(t * 14) > 0 ? 1 : 0); }
  for (let k = 0; k < 7; k++) { const x = Math.round(300 - ((t * 7 + k * 9) % 120)), y = Math.round(ys(x)) + 20 + Math.round(Math.sin(x * 0.12) * 3); R.pset(x, y, K); R.pset(x + 1, y, K); }
  // los rizomas corren bajo la arena desde la mata vieja y, en cada nudo, brota una mata nueva con sus raíces
  const ur = lin(t, RIZ0, RIZ1), al = Math.round(156 * ur);
  for (const s of [-1, 1]) for (let dx = 0; dx <= al; dx++) { const x = 160 + s * dx; if (x < 0 || x > 319) continue; const y = Math.round(ys(x) + 9 + Math.sin(dx * 0.16) * 1.5); R.pset(x, y, hex('#f0e4b8')); R.pset(x, y + 1, hex('#a88c58')); if (dx === al && ur < 1) { R.pset(x + s, y, BL); R.pset(x + 2 * s, y, BL); } }
  raiz(156, Math.round(ys(156)) + 2, 58, 1); raiz(160, Math.round(ys(160)) + 2, 66, 2); raiz(165, Math.round(ys(165)) + 2, 50, 3);
  const nudo = (k, s) => RIZ0 + (RIZ1 - RIZ0) * (k * 30 / 156);
  // las flores de la arena, que se marchitan cuando les llega la hierba, y el chorlito, que sale corriendo
  flor(62, t, nudo(3) + 0.4); flor(78, t, nudo(3) + 0.25); flor(212, t, nudo(2) + 0.3);
  { const t0 = nudo(3) + 0.15, f = t - t0, x = f < 0 ? 246 + Math.round(Math.sin(t * 1.3) * 3) : 246 + Math.round(f * 70), salto = f > 0 && f < 0.3 ? Math.round(Math.sin(f / 0.3 * Math.PI) * 7) : 0, pica = f < 0 && Math.sin(t * 5) > 0.6 ? 1 : 0;
    if (x < 330) { picto(5, x, Math.round(ys(x)) - 6 - salto + pica, 1, f > 0 && Math.sin(t * 30) > 0 ? 1 : 0); if (f > 0 && f < 0.6) R.icono('!', x - 2, Math.round(ys(x)) - 24 - salto, ROJO, BL, 1); } }
  for (const s of [-1, 1]) for (let k = 5; k >= 1; k--) { const x = 160 + s * k * 30, e = lin(t, nudo(k), nudo(k) + 0.7); if (e <= 0 || x < 2 || x > 318) continue; const y = Math.round(ys(x));
    raiz(x, y + 10, Math.round(e * (26 + ((k * 7 + (s > 0 ? 3 : 0)) % 4) * 6)), k * 3 + s); mata(x, y + 1, t, k * 2 + s, e * (0.56 + ((k + (s > 0 ? 1 : 0)) % 3) * 0.1), 9);
    if (e < 0.5) for (let i = 0; i < 4; i++) R.pset(x - 4 + i * 3, y - 1 - Math.round(e * 8 * (i % 2 + 1)), ARN[5]); }
  mata(160, Math.round(ys(160)) + 1, t, 0, 1.15, 15);
  // la señal: el brazo del guarda la trae por la derecha y la clava en «invasive plant»
  const SX = 44, tr = lin(t, INV - 0.75, INV - 0.12), cl2 = lin(t, INV - 0.12, INV), sx = Math.round(lerp(-30, SX, ease(tr))), by = Math.round(ys(SX) - 12 + cl2 * 17 + (t > INV && t < INV + 0.25 ? Math.sin((t - INV) * 50) * 1.5 : 0));
  if (tr > 0) { PZ.senalHierba?.(R, sx, by, { s: 2 }); SUBtapa(sx, by);
    const suelta = lin(t, INV + 0.45, INV + 0.95); if (suelta < 1) { const gx = sx - 3 - suelta * 50, gy = by - 28 - suelta * 6; T.brazo(R, gx - 42, gy - 10, gx - 9, gy, '#4a6a3a', 1); }
    if (t > INV && t < INV + 0.35) for (let k = 0; k < 8; k++) { const q = (t - INV) / 0.35, s = k % 2 ? 1 : -1; R.pset(Math.round(SX + s * (4 + q * (6 + k * 2))), Math.round(ys(SX) - Math.sin(q * Math.PI) * (5 + k)), ARN[5]); } }
};
// el poste de la señal entra en la arena: se vuelve a pintar el corte por delante de lo que queda bajo tierra
const SUBtapa = (sx, by) => { const s = Math.round(ys(sx)); for (let y = s + 1; y <= by; y++) for (let x = sx - 4; x <= sx + 4; x++) { const dp = y - s, band = Math.sin(dp * 0.22 + Math.sin(x * 0.03) * 1.6 + x * 0.012); R.pset(x, y, Math.abs(x - sx) < 2 ? hex('#8a8474') : dp < 3 ? ARN[5] : tono(ARN, 4.3 - dp * 0.05 + band * 0.7 + (h(x, y, 25) - 0.5) * 1.3, x, y)); } };

// ── 3. el tablón del sendero: la arena libre encoge ─────────────────────────────────────────────────
const CEDRO = RA('#4a3020', '#644430', '#7e5a3e', '#98704e', '#b08862');
const FOT = [86, 139, 192], AÑOS = ['1957', '', '2026'];
const KIO = fijo(() => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIELO2, y / 110 * 4.4 + (h(x >> 2, y >> 1, 41) - 0.5) * 0.5, x, y));
  for (let x = 256; x < 320; x++) { const y0 = Math.round(112 - Math.sin((x - 250) * 0.04) * 8); for (let y = y0; y < 150; y++) R.pset(x, y, tono(VERD, 1.3 + Math.sin(x * 0.3 + y * 0.7) * 0.8 + (h(x, y, 42) - 0.5) * 1.2 + (y - y0 < 2 ? 1 : 0), x, y)); }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ARN, 4.3 + Math.sin(y * 0.9 + Math.sin(x * 0.05) * 2.5 + x * 0.04) * 0.7 + (h(x, y, 43) - 0.5) * 0.8, x, y));
  // la caseta del sendero: tablas de cedro, el alero en sombra y el poste de la esquina
  madera(0, 0, 250, 149, CEDRO, 13, 44); baña(0, 0, 250, 22, K, 0.5, (x, y) => (y < 14 ? 1 : (22 - y) / 8)); R.rect(0, 23, 250, 23, hex('#3a2418'));
  for (let x = 40; x < 250; x += 70) for (let y = 30; y < 149; y += 26) { R.pset(x, y, K); R.pset(x + 1, y, hex('#98704e')); }
  R.rect(250, 0, 262, 149, K); R.rect(251, 0, 260, 149, hex('#644430')); R.rect(251, 0, 253, 149, hex('#98704e')); R.rect(259, 0, 260, 149, hex('#4a3020'));
  baña(0, 140, 262, 149, K, 0.3); R.rect(0, 149, 262, 150, hex('#3a2418'));
  // el tablón de corcho con su tejadillo
  R.rect(76, 26, 248, 104, K); R.rect(77, 27, 247, 103, hex('#7e5a3e')); R.rect(77, 27, 247, 28, hex('#b08862')); R.rect(80, 31, 244, 100, K);
  for (let y = 32; y <= 99; y++) for (let x = 81; x <= 243; x++) R.pset(x, y, tono(RA('#a87a48', '#b88a54', '#c89a62', '#d4aa72'), 1.4 + (h(x, y, 45) - 0.5) * 1.6, x, y));
  FOT.forEach((x, k) => { R.rect(x + 1, 38, x + 50, 81, hex('#8a6438')); R.rect(x - 1, 36, x + 48, 79, K); R.rect(x, 37, x + 47, 78, BL); if (k !== 1) { R.rect(x + 4, 83, x + 43, 95, K); R.rect(x + 5, 84, x + 42, 94, hex('#f6f2ea')); } else for (let i = 0; i < 3; i++) { R.disco(x + 16 + i * 8, 89, 2, K); R.disco(x + 16 + i * 8, 89, 1, hex('#f6f2ea')); } R.disco(x + 24, 36, 2, K); R.disco(x + 24, 36, 1, hex(['#c83a3a', '#e8c040', '#3a6ab0'][k])); });
  for (const x of [133, 186]) { R.poligono([[x, 55], [x, 61], [x + 4, 58]], K); }
  // un folleto, un mapa del sendero y un buzón de hojas bajo el tablón
  R.rect(84, 112, 118, 142, K); R.rect(85, 113, 117, 141, hex('#f0e8d4')); for (let i = 0; i < 30; i++) R.pset(88 + i, 136 - Math.round(Math.sin(i * 0.2) * 6 + i * 0.4), hex('#c83a3a')); R.disco(90, 134, 1, K); R.disco(114, 118, 1, hex('#3a6ab0')); R.linea(88, 118, 100, 116, hex('#7aa850'));
  R.rect(130, 116, 166, 142, K); R.rect(131, 117, 165, 141, hex('#5a7a4a')); R.rect(131, 117, 165, 118, hex('#7aa850')); R.rect(136, 121, 160, 124, K); R.rect(137, 122, 159, 123, hex('#f6f2ea')); R.icono('hierba', 144, 128, hex('#b8d078'), K, 1);
  R.rect(180, 110, 240, 143, K); R.rect(181, 111, 239, 142, hex('#e8dcb8')); for (let j = 116; j <= 136; j += 4) R.rect(186, j, 234 - ((j * 7) % 15), j, hex('#8a8474')); R.icono('!', 226, 114, ROJO, hex('#e8dcb8'), 1);
});
// una foto aérea pequeña: el mar a la izquierda y la arena libre (una mancha que encoge con fr) entre la hierba
const fotoAerea = (x, y, fr, k) => { for (let j = 0; j < 40; j++) for (let i = 0; i < 46; i++) { const mar = i < 7 + Math.sin(j * 0.3 + k) * 2, d = Math.hypot((i - 27) / 21, (j - 20) / 18) + (h(i >> 1, j >> 1, 46 + k) - 0.5) * 0.3;
    R.pset(x + 1 + i, y + 1 + j, mar ? (h(i, j, 47) < 0.15 ? BL : hex(i < 4 ? '#3a6a8a' : '#4a82a0')) : d < fr ? tono(ARN, 4.4 + Math.sin(i * 0.5 + j * 0.25) * 0.8, x + i, y + j) : tono(VERD, 1.2 + Math.sin(i * 0.9 + j * 0.6) * 0.9 + (h(i, j, 48) - 0.5), x + i, y + j)); } };
const ENC = h2(10.3), EXC = h2(12.0);
const p3 = (t) => {
  KIO();
  for (let k = 0; k < 2; k++) R.gaviota(Math.round(270 + k * 22 + Math.sin(t * 0.7 + k) * 14), Math.round(64 + k * 12 + Math.sin(t * 1.4 + k) * 3), t, k);
  nube3(Math.round(296 + Math.sin(t * 0.2) * 6), 86, 30, NUB);
  // las tres fotos: la arena libre encoge de una a otra
  const f2 = lerp(1.15, 0.66, ease(lin(t, ENC, ENC + 0.55))), f3 = lerp(1.15, 0.3, ease(lin(t, ENC + 0.45, ENC + 1.25)));
  [1.15, f2, f3].forEach((fr, k) => { fotoAerea(FOT[k], 37, fr, k); if (AÑOS[k]) R.numero(AÑOS[k], FOT[k] + 24, 93, { centro: true, color: hex('#1c2450'), sombra: false }); });
  if (t > ENC + 0.3 && t < EXC + 0.2) { const k = t < ENC + 0.75 ? 1 : 2, x = FOT[k] + 24; for (const s of [-1, 1]) { const ax = x + s * (20 - Math.round(((t * 3) % 1) * 5)); R.poligono([[ax, 58], [ax + s * 6, 54], [ax + s * 6, 62]], ROJO); R.poligono([[ax, 58], [ax + s * 6, 54], [ax + s * 6, 55]], K); } }
  // la señal grande, en primer término, y el guarda que lo explica
  R.rect(27, 120, 33, 176, K); R.rect(28, 120, 31, 175, hex('#9aa0b0')); R.rect(28, 120, 28, 175, hex('#d8dce8')); ovalo(31, 176, 9, 2, hex('#a8884c')); PZ.senalHierba?.(R, 30, 142, { s: 2 });
  const llega = t > EXC + 0.3;
  R.actor(EL.voluntario1DU, 58, 172, t, { dir: 1, dedo: !llega && t > Q3 + 0.4, habla: !llega, brazos: llega && t < EXC + 1.2, sonrisa: llega });
  // la excavadora llega por la derecha con el operario delante
  const ue = lin(t, EXC - 0.1, E.duracion), bx = Math.round(lerp(372, 236, lin(t, EXC - 0.1, h2(13.5)))), ox = Math.round(lerp(326, 176, lin(t, EXC - 0.3, h2(13.45))));
  if (ue > 0) { const tb = Math.round(Math.sin(t * 22)); PZ.excavadoraDU?.(R, bx, 173 + (tb > 0 ? 1 : 0), { s: 2, dir: -1, t, pala: 0.35 });
    for (let k = 0; k < 5; k++) R.pset(bx + 30 + k * 4 + Math.round(Math.sin(t * 9 + k) * 2), 174 - (k % 3), ARN[2]); }
  if (ox < 322) { const r = R.actor(EL.operarioDU, ox, 174, t, { dir: -1, anda: ox > 177, sostiene: [ox - 2, 150], sonrisa: true }); if (r?.mano) { const [mx, my] = r.mano; R.linea(mx + 1, my + 6, mx - 3, my - 12, K); R.linea(mx + 2, my + 6, mx - 2, my - 12, hex('#c89858')); R.rect(mx - 6, my - 18, mx - 1, my - 12, K); R.rect(mx - 5, my - 17, mx - 2, my - 13, hex('#c8ccd8')); } }
  // matas en primer término
  mata(118, 181, t, 3, 0.5, 9); mata(214, 182, t, 5, 0.42, 9); mata(306, 181, t, 7, 0.5, 9);
};

// ── 4. las dunas hoy: la excavadora y los voluntarios quitan la hierba ───────────────────────────────
const PALAS = h2(14.5), LIMP0 = h2(15.0), LIMP1 = h2(17.0), FIESTA = h2(16.9);
const pala = (r, dir, baja) => { if (!r?.mano) return; const [mx, my] = r.mano, x1 = mx + dir * (baja ? 7 : 3), y1 = my + (baja ? 12 : -12); R.linea(mx - dir * 3, my + (baja ? -6 : 6), x1, y1, K); R.linea(mx - dir * 3 + 1, my + (baja ? -6 : 6), x1 + 1, y1, hex('#c89858'));
  R.rect(x1 - 2, y1 + (baja ? 0 : -5), x1 + 3, y1 + (baja ? 5 : 0), K); R.rect(x1 - 1, y1 + (baja ? 1 : -4), x1 + 2, y1 + (baja ? 4 : -1), hex('#c8ccd8')); };
const p4 = (t) => {
  const o = { encuadre: 'dunas', epoca: 'hoy', limpia: ease(lin(t, LIMP0, LIMP1)) };
  T.oregon(R, t, o);
  // la excavadora: entra, empuja un montón de hierba arrancada y levanta la pala
  const bx = Math.round(lerp(18, 104, ease(lin(t, Q4, h2(15.3))))), sube = lin(t, h2(15.3), h2(16.0));
  const ex = PZ.excavadoraDU?.(R, bx, 153 + (Math.sin(t * 22) > 0 && t < h2(15.3) ? 1 : 0), { s: 2, t, pala: sube * 0.8 });
  if (sube < 1) { const px = bx + 44, n = 5 + Math.round(lin(t, Q4, h2(15.3)) * 9); for (let k = 0; k < n; k++) { const x = px + (k * 5) % 16 - Math.round(sube * 0), y = 152 - (k % 4) * 3 - Math.floor(k / 5) * 2; R.rect(x, y - 2, x + 3, y, VERDES[1 + (k % 3)]); R.pset(x + 1, y - 3, VERDES[4]); R.pset(x + 3, y - 4, VERDES[3]); } }
  else { for (let k = 0; k < 14; k++) { const x = bx + 44 + (k * 5) % 16, y = 152 - (k % 4) * 3 - Math.floor(k / 5) * 2; R.rect(x, y - 2, x + 3, y, hex(k % 2 ? '#8a7a40' : '#a89858')); R.pset(x + 1, y - 3, VERDES[3]); } }
  // los voluntarios llegan con las palas, cavan y lo celebran
  [[EL.voluntario1DU, 262, 168, 0], [EL.voluntario2DU, 290, 198, 1], [EL.operarioDU, 318, 226, 2]].forEach(([el, xa, xb, k]) => { const ul = lin(t, Q4 + 0.1 + k * 0.12, h2(14.45) + k * 0.05), x = Math.round(lerp(xa, xb, ul)), anda = ul < 1, cava = !anda && t < FIESTA, fase = (t * 2.2 + k * 0.37) % 1, baja = fase < 0.5, fiesta = t >= FIESTA + k * 0.1;
    const r = R.actor(el, x, 152, t, { dir: -1, anda, brazos: fiesta, sonrisa: fiesta || anda, salto: fiesta ? Math.round(Math.abs(Math.sin((t - FIESTA) * 6 + k)) * 5) : 0, sostiene: fiesta ? false : anda ? [x + 2, 132] : baja ? [x - 3, 142] : [x - 4, 130] });
    if (!fiesta) pala(r, -1, cava && baja);
    if (cava && !baja) { const q = (fase - 0.5) / 0.5, cx = x - 8 - q * 26, cy = 138 - Math.sin(q * Math.PI) * 18; R.rect(Math.round(cx), Math.round(cy), Math.round(cx) + 3, Math.round(cy) + 2, VERDES[2]); R.pset(Math.round(cx) + 1, Math.round(cy) - 1, VERDES[4]); R.pset(Math.round(cx) + 2, Math.round(cy) + 3, ARN[3]); }
    if (fiesta) { R.linea(x + 20, 152, x + 23, 134, K); R.linea(x + 21, 152, x + 24, 134, hex('#c89858')); R.rect(x + 21, 128, x + 26, 134, K); R.rect(x + 22, 129, x + 25, 133, hex('#c8ccd8')); } });
  T.oregonDelante(R, t, o);
  // «so the dunes can move again»: las rachas de arena por la franja limpia
  const v = lin(t, h2(15.6), h2(16.6)); if (v > 0) for (let k = 0; k < 40; k++) { const x = Math.round((k * 43 + t * (70 + (k % 5) * 16)) % 380) - 30, y = 140 + (k * 11) % 36 + Math.round(Math.sin(t * 3 + k) * 2); if (k / 40 > v) continue; R.pset(x, y, hex('#fff4d0')); R.pset(x + 1, y, hex('#f4e8c4')); if (k % 3 === 0) R.pset(x + 2, y, hex('#e6d2a0')); }
};

// ── 5. el escritorio de Herbert desde arriba: seis cosas sueltas ─────────────────────────────────────
const FICHAS = [[62, 62, 0], [148, 62, 3], [234, 62, 5], [62, 124, 1], [148, 124, 4], [234, 124, 2]];
const PADV = RA('#1e3a2c', '#264836', '#2e5640', '#38644a');
const ESC = fijo(() => {
  // el vade de cuero verde con su pespunte, y el canto de nogal a la izquierda y abajo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PADV, 1.7 + (h(x >> 1, y >> 1, 51) - 0.5) * 1.1 + Math.sin(x * 0.011 + y * 0.017) * 0.5 - (y < 22 ? (22 - y) * 0.03 : 0), x, y));
  madera(0, 170, 319, 179, RA('#3a2014', '#4e2c1a', '#643a22', '#7c4c2c', '#94603a'), 11, 52); madera(0, 0, 12, 179, RA('#3a2014', '#4e2c1a', '#643a22', '#7c4c2c', '#94603a'), 60, 53);
  R.rect(13, 0, 14, 169, K); R.rect(13, 168, 319, 169, K); for (let y = 4; y < 164; y += 5) R.pset(18, y, hex('#c8b070')); for (let x = 18; x < 318; x += 5) R.pset(x, 164, hex('#c8b070'));
  elipse(150, 96, 150, 80, hex('#ffe8a8'), 0.14);
  // a la derecha: la cámara de fotos, la taza de café (el vapor va vivo) y el mapa doblado de la costa
  ovalo(294, 82, 22, 18, hex('#16281e')); R.rect(271, 60, 313, 96, K); R.rect(272, 61, 312, 95, hex('#3a3a44')); R.rect(272, 61, 312, 63, hex('#6a6a78')); R.rect(272, 90, 312, 95, hex('#26262e')); R.disco(292, 79, 12, K); R.disco(292, 79, 10, hex('#5a5a68')); R.disco(292, 79, 7, K); R.disco(292, 79, 5, hex('#3a5a8a')); R.disco(290, 77, 2, hex('#c8e4f8')); R.rect(276, 64, 282, 68, hex('#c8ccd8')); R.rect(303, 65, 309, 69, hex('#e8c040'));
  for (let an = 0; an < 3.2; an += 0.05) { R.pset(Math.round(292 + Math.cos(an + 3.14) * 26), Math.round(60 + Math.sin(an + 3.14) * 9), hex('#4a2c1a')); R.pset(Math.round(292 + Math.cos(an + 3.14) * 26), Math.round(61 + Math.sin(an + 3.14) * 9), hex('#7c4c2c')); }
  ovalo(296, 126, 13, 11, hex('#16281e')); R.disco(293, 123, 12, K); R.disco(293, 123, 11, hex('#f0ece0')); R.disco(293, 123, 8, hex('#4a2c1a')); R.disco(291, 121, 3, hex('#7c4c2c')); R.rect(304, 120, 310, 126, K); R.rect(305, 121, 309, 125, hex('#f0ece0')); R.rect(305, 122, 307, 124, PADV[1]);
  R.poligono([[264, 142], [316, 138], [318, 166], [266, 167]], K); R.poligono([[265, 143], [315, 139], [317, 165], [267, 166]], hex('#e8dcb8')); R.linea(282, 142, 284, 166, hex('#c8b890')); R.linea(299, 141, 301, 166, hex('#c8b890'));
  for (let i = 0; i < 24; i++) { const x = 272 + Math.round(Math.sin(i * 0.5) * 2 + i * 0.1), y = 142 + i; R.pset(x, y, hex('#3a6a8a')); R.pset(x - 1, y, hex('#8ac0e8')); R.pset(x - 2, y, hex('#8ac0e8')); } R.linea(280, 162, 306, 146, ROJO, 4); R.disco(306, 146, 1, ROJO);
  // la lupa y el lápiz
  ovalo(34, 152, 11, 10, hex('#16281e')); R.disco(32, 150, 10, K); R.disco(32, 150, 8, hex('#3a6850')); R.disco(32, 150, 7, hex('#4a7a60')); R.linea(28, 146, 31, 144, hex('#c8e4f8')); R.linea(39, 157, 50, 166, K); R.linea(40, 157, 51, 166, hex('#7c4c2c')); R.linea(40, 158, 50, 167, K);
  R.linea(98, 164, 138, 158, K); R.linea(98, 163, 138, 157, hex('#e8c040')); R.linea(98, 162, 138, 156, K); R.rect(138, 156, 141, 158, hex('#f0d8b0')); R.pset(142, 157, K); R.rect(94, 162, 97, 165, hex('#e88a8a'));
});
const ficha = (cx, cy, k, t) => { cx = Math.round(cx); cy = Math.round(cy);
  R.rect(cx - 20, cy - 16, cx + 24, cy + 21, hex('#16281e')); R.rect(cx - 23, cy - 20, cx + 21, cy + 18, K); R.rect(cx - 22, cy - 19, cx + 20, cy + 17, hex('#f2e8cc')); R.rect(cx - 22, cy + 15, cx + 20, cy + 17, hex('#d8caa4')); R.rect(cx - 22, cy - 19, cx - 21, cy + 17, hex('#fffbe8'));
  for (let i = -16; i <= 14; i += 3) R.pset(cx + i, cy + 13, hex('#b8a880'));
  picto(k, cx - 1, cy - 4, 2, k === 4 && Math.sin(t * 9) > 0 ? 1 : 0);
  if (k === 0) for (let i = 0; i < 3; i++) { const q = (t * 1.6 + i * 0.33) % 1; R.pset(cx - 14 + Math.round(q * 26), cy - 13 + i * 9, BL); }
  if (k === 1) for (let i = 0; i < 9; i++) R.pset(cx - 16 + (i * 7) % 34, cy + 6 + (i * 5) % 6, ARN[3 + (i % 3)]);
  R.disco(cx - 1, cy - 19, 2, K); R.disco(cx - 1, cy - 19, 1, hex(['#c83a3a', '#e8c040', '#3a6ab0'][k % 3])); };
const DEJA = [s2(19.55), s2(20.75)], MARCOS = s2(22.5), TACHA = s2(23.92);
const p5 = (t) => {
  ESC();
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; for (let i = 0; i < 3; i++) R.pset(Math.round(291 + k * 3 + Math.sin(u * 6 + k * 2 + i) * 2), Math.round(116 - u * 16 - i), hex('#c8d0d8')); }
  // las cuatro fichas que ya están, y las dos que deja la mano de Herbert: el escarabajo y, la última, la hierba
  FICHAS.forEach(([cx, cy, k], i) => { if (i < 4) ficha(cx, cy, k, t); });
  [4, 5].forEach((i, j) => { const [cx, cy, k] = FICHAS[i], t1 = DEJA[j], en2 = ease(lin(t, t1 - 0.6, t1)), sal = ease(lin(t, t1 + 0.12, t1 + 0.6));
    if (en2 <= 0) return; const fy = lerp(cy + 64, cy, en2) + (t >= t1 && t < t1 + 0.1 ? 1 : 0);
    ficha(cx, fy, k, t);
    if (sal < 1) { const wy = (t < t1 ? fy : lerp(cy, cy + 62, sal)) + 11; T.brazo(R, cx + 48, wy + 46, cx + 25, wy, '#6a5a44', -1); }
    if (t >= t1 && t < t1 + 0.25) for (let q = 0; q < 6; q++) { const an = q * 1.05, r = 26 + (t - t1) * 40; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.8), BL); } });
  // «a collection of separate things»: cada una con su marco de puntos y su número… y la X que lo tacha
  FICHAS.forEach(([cx, cy], i) => { const t0 = MARCOS + i * 0.17; if (t < t0) return; const x0 = cx - 28, y0 = cy - 25, x1 = cx + 26, y1 = cy + 23, col = t >= TACHA + i * 0.06 ? hex('#e86a5a') : hex('#f8f0d8'), f = Math.floor(t * 6) % 4;
    R.linea(x0 + f, y0, x1, y0, col, 4); R.linea(x1, y0 + f, x1, y1, col, 4); R.linea(x1 - f, y1, x0, y1, col, 4); R.linea(x0, y1 - f, x0, y0, col, 4);
    R.rect(x0 - 2, y0 - 5, x0 + 8, y0 + 5, K); R.rect(x0 - 1, y0 - 4, x0 + 7, y0 + 4, hex('#f8f0d8')); R.numero(String(i + 1), x0 + 3, y0 + 4, { centro: true, color: hex('#1c2450'), sombra: false });
    if (t >= TACHA + i * 0.06) { const e = lin(t, TACHA + i * 0.06, TACHA + i * 0.06 + 0.12); R.icono('X', x0 - 4 - Math.round((1 - e) * 2), y0 - 7, ROJO, K, 2); } });
};

// ── 6. la lámina: un sistema; se quita una pieza y cambia todo ───────────────────────────────────────
const CAS = [[28, 58], [28, 94], [28, 130], [290, 130], [290, 94], [290, 58]], ANC = [[88, 62], [150, 96], [112, 88], [222, 124], [208, 99], [164, 58]];
const SIST = s2(25.08), QUITA = s2(27.45), TODO = s2(28.66);
const p6 = (t) => {
  const falta = t >= QUITA, o = { encuadre: 'pueblo', camara: 'corte', piezas: 6, ...(falta ? { falta: 2 } : {}) };
  T.oregon(R, t, o);
  // «it is a system»: puntos que corren de cada casilla a su sitio en el corte y anclajes que laten
  if (!falta) CAS.forEach(([cx, cy], k) => { const [ax, ay] = ANC[k], x0 = cx + (cx < 160 ? 20 : -20);
    for (let j = 0; j < 2; j++) { const q = (t * 0.9 + k * 0.17 + j * 0.5) % 1, x = Math.round(lerp(x0, ax, q)), y = Math.round(lerp(cy, ay, q)); R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, OROL); }
    const e = (t - SIST - k * 0.08); if (e > 0 && e < 0.9) { const r = Math.round(3 + e * 9); for (let an = 0; an < 6.3; an += 0.35) R.pset(Math.round(ax + Math.cos(an) * r), Math.round(ay + Math.sin(an) * r), e < 0.5 ? OROL : ORO); } });
  // Herbert: señala la lámina, va hasta la casilla de la hierba, salta y la arranca
  const va = lin(t, s2(25.9), s2(27.1)), hx = Math.round(lerp(196, 74, ease(va))), f = t - QUITA, salto = t > QUITA - 0.22 && t < QUITA + 0.22 ? Math.round(Math.sin((t - QUITA + 0.22) / 0.44 * Math.PI) * 12) : 0;
  const r = R.actor(EL.herbert57, hx, 178, t, { dir: va > 0 && !falta ? -1 : va > 0 ? 1 : -1, anda: va > 0 && va < 1, dedo: t > SIST - 0.2 && va <= 0, habla: va <= 0, salto, sorpresa: falta && t > TODO - 0.2 && t < TODO + 1.1, triste: t >= TODO + 1.1,
    sostiene: f > 0.35 ? [hx + 18, 160] : t > QUITA - 0.22 ? [hx - 2, 150] : false });
  if (falta && r?.mano) { const [mx, my] = r.mano, q = lin(f, 0, 0.35), fx = Math.round(lerp(22, mx - 1, q)), fy = Math.round(lerp(124, my - 12, q) - Math.sin(q * Math.PI) * 14); R.rect(fx - 1, fy - 1, fx + 14, fy + 14, K); R.rect(fx, fy, fx + 13, fy + 13, hex('#f2e8cc')); picto(2, fx + 6, fy + 7, 1); }
  if (f >= 0 && f < 0.3) for (let q = 0; q < 8; q++) { const an = q * 0.785, rr = 8 + f * 60; R.linea(28 + Math.cos(an) * rr, 130 + Math.sin(an) * rr, 28 + Math.cos(an) * (rr + 4), 130 + Math.sin(an) * (rr + 4), BL); }
  if (t > TODO && t < TODO + 1.6) R.icono('?', hx + 5, 140 - Math.round(Math.sin(lin(t, TODO, TODO + 0.2) * Math.PI) * 3), ORO, K, 1);
};

// ── 7. el planeta: la ecología, escondida en una aventura espacial ───────────────────────────────────
const O7 = { encuadre: 'desierto', camara: 'roca', hora: 'noche', silueta: 1, brillo: 0.6, t0: Q7 };
const ECO = s2(30.85), HID0 = s2(32.3), HID1 = s2(33.0), AVEN = s2(33.23);
const p7 = (t) => {
  T.planeta(R, t, O7);
  // la fugaz de «a space adventure»
  { const q = lin(t, AVEN, AVEN + 0.7); if (q > 0 && q < 1) for (let i = 0; i < 16; i++) { const x = Math.round(40 + q * 200 - i * 3), y = Math.round(34 - q * 8 + i * 0.5); if (x > 20) R.pset(x, y, i < 4 ? BL : i < 9 ? hex('#c8d0f0') : hex('#6a70a0')); } }
  const dentro = ease(lin(t, HID0, HID1)), cerrado = t >= HID1, bote = cerrado && t < HID1 + 0.3 ? Math.round(Math.sin((t - HID1) / 0.3 * Math.PI) * 6) : 0;
  // Herbert, en la repisa: explica el corro y, cuando el libro se cierra, sonríe
  R.actor(EL.herbert, 40, 131, t, { dir: 1, dedo: t > ECO - 0.2 && t < HID0, habla: t < HID0, sonrisa: cerrado, salto: cerrado && t < HID1 + 0.4 ? Math.round(Math.sin((t - HID1) / 0.4 * Math.PI) * 3) : 0 });
  // el libro: abierto en la roca; luego cerrado y de pie, con su resplandor
  if (cerrado) { elipse(104, 108, 34, 34, hex('#ffe8a0'), 0.25 + Math.sin(t * 5) * 0.06); PZ.libro?.(R, 104, 131 - bote, { s: 2 }); for (let k = 0; k < 7; k++) { const an = k * 0.9 + t * 1.5, rr = 26 + Math.sin(t * 3 + k) * 5; if (Math.sin(t * 6 + k * 2) > 0) destello(104 + Math.cos(an) * rr, 106 + Math.sin(an) * rr * 0.9, 1 + (k % 2), k % 2 ? OROL : BL); } }
  else { elipse(104, 118, 44, 16, hex('#ffe8a0'), 0.16); PZ.libro?.(R, 104, 131, { s: 2, abierto: true }); }
  // las seis piezas, en corro, unidas por puntos; en «hid it inside» caen en espiral dentro del libro
  if (!cerrado) { const pos = PIC.map((_, k) => { const an = t * 1.1 + k * 1.047, rr = 34 * (1 - dentro); return [Math.round(104 + Math.cos(an) * rr * 1.3), Math.round(lerp(62, 112, dentro) + Math.sin(an) * rr * 0.62)]; });
    pos.forEach(([x, y], k) => { const [x2, y2] = pos[(k + 1) % 6], e = lin(t, Q7 + 0.15 + k * 0.1, Q7 + 0.35 + k * 0.1); if (e < 1) return; R.linea(x, y, x2, y2, ORO, 3); R.linea(x, y, pos[(k + 3) % 6][0], pos[(k + 3) % 6][1], OROS, 4); });
    pos.forEach(([x, y], k) => { const e = lin(t, Q7 + 0.15 + k * 0.1, Q7 + 0.35 + k * 0.1); if (e <= 0) return; const r = Math.round(9 * e * (1 - dentro * 0.5)); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#f2e8cc')); if (e >= 1 && dentro < 0.7) picto(k, x, y, 1); }); }
  T.planetaDelante(R, t, O7);
};

const efectos = [[0.2, 'motor'], [VER0 + 0.3, 'viento'], [RARO, 'pop'], [h2(4.15), 'aviso'],
  [nudo0(1), 'pop'], [nudo0(3), 'pop'], [nudo0(5), 'pop'], [INV, 'golpecito'],
  [ENC, 'papel'], [EXC, 'arranque'], [Q4 + 0.2, 'motor'], [PALAS + 0.2, 'toc'], [PALAS + 0.9, 'toc'], [h2(15.7), 'viento'], [FIESTA + 0.1, 'palmada'],
  [DEJA[0], 'golpecito'], [DEJA[1], 'golpecito'], [MARCOS, 'lapiz'], [TACHA, 'sello'],
  [SIST, 'brillo'], [QUITA, 'pop'], [TODO, 'aviso'], [Q7 + 0.3, 'viento'], [HID1, 'toc'], [AVEN + 0.1, 'brillo']];
function nudo0(k) { return RIZ0 + (RIZ1 - RIZ0) * (k * 30 / 156); }
const año = (t) => (t < VER0 ? 1957 : t < VER1 ? Math.round(lerp(1957, 2026, lin(t, VER0, VER1))) : t < Q5 ? 2026 : t < Q7 ? 1957 : 1965);
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3], [Q4, p4], [Q5, p5], [Q6, p6], [Q7, p7]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────── du-cierre ──
E['du-cierre'] = ('Cierre', '''// DU-CIERRE (frase 32), sin cartela. Dos planos, en el estudio de Atom (el reloj sigue rajado y la arena, en la mesa):
// 1. hoy 'estudio'/mesa, gag 8: Atom baja de su esquina con una brizna, la planta en el montón de arena en «idea»
//    y se aparta; la hierba brota y se va quedando con el tablero («too big»): Atom da un respingo con su «!»; en
//    «Too big for an article» la hoja de notas se lleva su X. Corta en «too strange».
// 2. hoy 'estudio'/general: la hierba se queda con toda la mesa, cuelga por los cajones y sale por el suelo; en «20
//    publishers» Atom saca el globo del 20 con su X; en «exactly the size of a planet» nuestro libro asoma por la
//    ventana, enorme, como un planeta, con sus dos lunas en órbita; Atom vuelve de un salto a su esquina y se despide
//    girando con chispas.''', UTIL + r'''
const c = (s) => en('cierre', (s - 0.5) / 8.869);
const Z2 = c(5.35) - 0.05, PLANTA = c(1.34), GRANDE = c(2.28), ARTI = c(4.67), VEINTE = c(6.27), PLAN = c(7.49), ADIOS = c(9.45);
R.companero = () => {};   // Atom está en el plano: baja a la mesa y al final vuelve a su esquina
const chispas = (x, y, t, r, n, col) => { for (let k = 0; k < n; k++) { const an = k * Math.PI * 2 / n + t * 4, q = r + Math.sin(t * 9 + k) * 2; R.pset(Math.round(x + Math.cos(an) * q), Math.round(y + Math.sin(an) * q), col); } };

// la brizna que planta Atom: tres píxeles de ancho, curva, con su hojita y la punta clara; (x, y) = el pie; cuelga o crece según dir
const brizna = (x, y, n, dir, vi) => { for (let i = 0; i < n; i++) { const xx = Math.round(x + Math.sin(i * 0.22) * 2 + vi * i * i * 0.012), yy = y + dir * i; R.pset(xx - 1, yy, VERDES[0]); R.pset(xx + 2, yy, VERDES[0]); R.pset(xx, yy, i > n - 4 ? VERDES[4] : VERDES[3]); R.pset(xx + 1, yy, i > n - 4 ? VERDES[3] : VERDES[2]);
    if (i === Math.floor(n * 0.45)) for (let q = 1; q <= 4; q++) { R.pset(xx + 1 + q, yy - dir * q, VERDES[3]); R.pset(xx + 1 + q, yy - dir * q + 1, VERDES[1]); } } };
// ── 1. gag 8: Atom planta una brizna en su montón de arena ──────────────────────────────────────────
const p1 = (t) => {
  const hi = 0.55 * ease(lin(t, PLANTA + 0.25, Z2 + 0.2));
  const o = { encuadre: 'estudio', camara: 'mesa', arena: 0.34, roto: true, nivel: 0.45, hierba: hi };
  const g = T.hoy(R, t, o), [mx, my] = g?.cimaMonton ?? [226, 142];
  T.hoyDelante(R, t, o);
  // la X de la hoja de notas: «too big for an article»
  if (t > ARTI) { const e = lin(t, ARTI, ARTI + 0.15); R.icono('X', 96 - Math.round((1 - e) * 3), 150 - Math.round((1 - e) * 3), ROJO, hex('#5a1418'), 3); }
  // Atom: baja con la brizna, la clava en la cima del montón, se aparta y da un respingo cuando la hierba se dispara
  const baja = ease(lin(t, 0.15, PLANTA - 0.22)), clava = lin(t, PLANTA - 0.22, PLANTA) - lin(t, PLANTA, PLANTA + 0.2), huye = ease(lin(t, PLANTA + 0.35, PLANTA + 0.9)), resp = t > GRANDE && t < GRANDE + 0.5 ? Math.sin((t - GRANDE) / 0.5 * Math.PI) : 0;
  const tx = mx - 20, ty = my - 30;
  const ax = lerp(lerp(297, tx, baja), 176, huye) + clava * 8, ay = lerp(lerp(24, ty, baja), 74, huye) - Math.sin(baja * Math.PI) * 10 + clava * 12 + Math.sin(t * 2.6) * 2 - resp * 9;
  if (t < PLANTA) brizna(Math.round(ax + 6), Math.round(ay + 27), 15, -1, Math.sin(t * 6) * 0.6);
  else if (hi < 0.2) brizna(mx - 1, my + 2, 15, -1, Math.sin(t * 5) * 0.5);
  if (t >= PLANTA && t < PLANTA + 0.3) for (let k = 0; k < 8; k++) { const q = (t - PLANTA) / 0.3, s = k % 2 ? 1 : -1; R.pset(Math.round(mx + s * (3 + q * (5 + k * 2))), Math.round(my - Math.sin(q * Math.PI) * (5 + k)), hex('#f8dc98')); }
  atomAbajo(ax, ay, t, { r: 12, e: clava > 0 || resp > 0 ? 0.9 : 0.5, vel: clava > 0 ? 2.5 : 1 });
  if (clava > 0.3) chispas(ax, ay, t, 20, 8, hex('#c8f0ff'));
  if (t > GRANDE && t < GRANDE + 1.2) R.icono('!', Math.round(ax) - 2, Math.round(ay) - 32, ROJO, K, 2);
};

// ── 2. la hierba se queda con la mesa; el libro, del tamaño de un planeta, en la ventana ──────────────────
const libroPlaneta = (t, V) => { const u = ease(lin(t, PLAN, PLAN + 1.1)); if (u <= 0) return; const cx = Math.round((V[0] + V[2]) / 2) - 16, by = Math.round(lerp(V[3] + 52, V[3] - 7, u)), cy = by - 24;
  for (let j = -34; j <= 34; j++) for (let i = -34; i <= 34; i++) { const d = Math.hypot(i, j); if (d < 34 && (d < 26 ? (i + j) & 1 : ((i + j) & 3) === 0)) R.pset(cx + i, cy + j, hex('#fff0b8')); }
  const lunas = [[t * 1.3, 30, 9, 3, '#f8eec8'], [t * 0.9 + 2.6, 36, 12, 2, '#e8c8a0']].map(([an, rx, ry, r, col]) => [Math.round(cx + Math.cos(an) * rx), Math.round(cy + Math.sin(an) * ry), r, col, Math.sin(an) < 0]);
  lunas.forEach(([x, y, r, col, atras]) => { if (atras) { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(col)); } });
  recortada(V[0], V[1], V[2], V[3], () => PZ.libro?.(R, cx, by, { s: 2 }));
  lunas.forEach(([x, y, r, col, atras]) => { if (!atras) { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(col)); R.pset(x - 1, y - 1, BL); } }); };
const p2 = (t) => {
  const hi = lerp(0.5, 1, ease(lin(t, Z2, c(9.2))));
  const o = { encuadre: 'estudio', arena: 0.15, roto: true, nivel: 0.3, hierba: hi, enVentana: (R2, tt, V) => libroPlaneta(t, V) };
  T.hoy(R, t, o);
  T.hoyDelante(R, t, o);
  // «too strange for 20 publishers»: el globo del 20 con su X
  if (t > VEINTE - 0.05 && t < PLAN + 0.1) { const e = lin(t, VEINTE - 0.05, VEINTE + 0.15), y = 66 - Math.round(Math.sin(e * Math.PI) * 4); globo(104, y, 64, 26, 8); R.numero('20', 92, y + 8, { tam: 16, centro: true, color: hex('#1c2450'), sombra: false }); R.icono('X', 115, y - 7, ROJO, hex('#f0c8c8'), 2); }
  // Atom: junto a la mesa; en «planet» va a mirar por la ventana; en la despedida vuelve a su esquina y gira
  const hx = 118, hy = 104, mira = ease(lin(t, PLAN - 0.1, PLAN + 0.5)), v = lin(t, ADIOS, ADIOS + 0.75), e = ease(v);
  const pos = (vv) => { const ee = ease(vv); return [lerp(lerp(hx, 160, mira), 297, ee), lerp(lerp(hy, 84, mira), 24, ee) - Math.sin(vv * Math.PI) * 18]; };
  const [px, py] = pos(v), bote = t > VEINTE - 0.05 && t < VEINTE + 0.5 ? Math.abs(Math.sin((t - VEINTE) * 9)) * 5 : v >= 1 ? Math.abs(Math.sin((t - ADIOS - 0.75) * 5.5)) * 5 * Math.max(0, 1 - (t - ADIOS - 0.75) * 0.9) : 0;
  const gira = v >= 1 && t < ADIOS + 2.0, ax = px, ay = py - bote + (v < 1 ? Math.sin(t * 2.6) * 2 : Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)));
  if (v > 0 && v < 1) for (let k = 1; k <= 7; k++) { const [qx, qy] = pos(Math.max(0, v - k * 0.04)); R.pset(Math.round(qx), Math.round(qy), hex('#c8f0ff')); if (k % 2) R.pset(Math.round(qx) + 1, Math.round(qy) + 1, BL); }
  atomAbajo(ax, ay, t, { r: Math.round(lerp(13, 10, e)), e: bote > 1 || (v > 0 && v < 1) || gira ? 0.85 : 0.45, vel: gira ? 3 : 1 });
  if (gira || (t > PLAN + 0.4 && t < PLAN + 1.3)) chispas(ax, ay, t, 21, 10, hex('#c8f0ff'));
};
const efectos = [[PLANTA, 'golpecito'], [PLANTA + 0.5, 'pop'], [GRANDE, 'aviso'], [ARTI, 'sello'], [VEINTE, 'pop'], [PLAN + 0.3, 'brillo'], [ADIOS + 0.1, 'whoosh'], [ADIOS + 0.9, 'boing']];
T.rodar(E, R, [[0, p1], [Z2, p2]], { efectos, año: 2026 });
''')
