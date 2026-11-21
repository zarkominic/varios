E = {}
E['lf-leonida'] = ('Leonida, de sur a norte', '''// LF-LEONIDA (frases 4–6), 2026, sin cartela. Diez planos, un viaje que empieza en el mapa y baja a los Cayos:
// 1. INSERTO de la mesa de los fans, desde arriba: la hoja de Leonida entra deslizándose; en «six» caen seis chinchetas y
//    las regiones se encienden cuando la voz las nombra (Vice City, los Cayos), con la lupa que va de una a otra;
// 2. la pared del mapa (salon/mapa): un fan entra y señala; Grassrivers, Port Gellhorn, Ambrosia y Mount Kalaga se
//    encienden en su nombre; en «never said» sale el «?» grande sobre el mapa y los fans de la mesa levantan la vista;
// 3. INSERTO del portátil y la libreta sobre la alfombrilla de corte: el vídeo pausado plano a plano (tres fotogramas, en
//    «shot by shot»), las tarjetas impresas que salen, y la mano con el rotulador rojo que rodea Miami en el mapa a lápiz;
// 4. la playa de Miami (vicecity/playa): el turista llega y en «Miami» hace la foto (flash);
// 5. la terraza del hotel (ocean 'terraza'): el neón se enciende en «glamour», el camarero corre con la bandeja en
//    «hustle» y el cliente se queda las dos copas en «greed»;
// 6. Ocean Drive (ocean general) del ocaso a la noche: la patinadora pasa, los neones se encienden uno a uno en «neon» y
//    los paseantes se vuelven a mirar los coches en «cars cruising»;
// 7. los Cayos, la carretera sobre el mar (cayos/puente): Atom baja de su esquina y cruza el puente en bici con el
//    bocadillo en la cesta;
// 8. a pie de puente (cayos 'barandilla'), gag 2: el pelícano del poste despega, se posa en la cesta (Atom frena en
//    seco, «!»), coge el bocadillo y se va volando con él por el cielo («?»);
// 9. Cayo Hueso (cayos/cayo): Atom llega por la acera, pasa ante el faro con la cesta vacía y en «Key West» se para y
//    da saltitos de alegría;
// 10. el muelle (cayos 'muelle'): el pelícano se traga el bocadillo; en «dangerous» el mar se pica y una ola salta el
//    muelle y Atom da un salto atrás.''', r'''
import { bici } from '/atomo/plato/escenas/ov-comun.js';
const a = (f) => en('mapa', f), b = (f) => en('vicecity', f), c = (f) => en('cayos', f);
// los cortes, en la palabra
const P2 = a(0.282), P3 = a(0.630), P4 = b(0), P5 = b(0.292), P6 = b(0.637), P7 = c(0), P8 = c(0.282), P9 = c(0.531), P10 = c(0.741);
// las palabras que mandan
const seis = a(0.088), vc = a(0.156), keys = a(0.216), grass = a(0.282), port = a(0.332), ambrosia = a(0.394), kalaga = a(0.458), nunca = a(0.599);
const players = a(0.764), shot1 = a(0.875), shot2 = a(0.894), dibujado = a(0.940);
const miami = b(0.113), y2002 = b(0.184), glamour = b(0.369), hustle = b(0.406), greed = b(0.457), city = b(0.558);
const neon = b(0.795), cars = b(0.850), look = b(0.934);
const islas = c(0.189), overseas = c(0.379), keywest = c(0.684), bonitas = c(0.805), peligrosas = c(0.869);

const K = hex('#14101c'), BL = hex('#fbf8f0');
const ease = (u) => u * u * (3 - 2 * u);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, q) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * q) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * q) << 8) | Math.round(r1 + ((c2 & 255) - r1) * q)) >>> 0; };
const rc = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); };
const ovalo = (cx, cy, rx, ry, c) => { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); R.linea(Math.round(cx - w), Math.round(cy + j), Math.round(cx + w), Math.round(cy + j), c); } };
const destello = (x, y, r, col = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, col); R.pset(x, y + i, col); } if (r > 1) for (const [p, q] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) R.pset(x + p, y + q, col); };
// un icono con su globo blanco (el «!» y el «?» de los personajes), que sube un poco al salir
const globoIcono = (nombre, cx, cy, u, esc = 2) => { if (u <= 0) return; const s = Math.min(1, u * 3), w = 7 * esc + 6, hh = 8 * esc + 4, y = Math.round(cy - 3 * s);
  const x0 = Math.round(cx - w / 2); rc(x0 - 1, y, x0 + w + 1, y + hh, K); rc(x0, y - 1, x0 + w, y + hh + 1, K); rc(x0, y, x0 + w, y + hh, BL); rc(x0, y + hh, x0 + w, y + hh, hex('#d0d4e0'));
  R.poligono([[cx - 3, y + hh + 1], [cx + 2, y + hh + 1], [cx - 2, y + hh + 5]], K); R.poligono([[cx - 2, y + hh], [cx + 1, y + hh], [cx - 2, y + hh + 3]], BL);
  R.icono(nombre, Math.round(cx - (nombre === '!' ? 1.5 : 2.5) * esc), y + 2, nombre === '!' ? hex('#e83a3a') : hex('#3a5ac8'), hex('#9aa0b8'), esc); };

// ATOM EN EL PLANO: baja de su esquina en el plano 7 (allí no queda nadie: la esquina se ve tranquila) y viaja en bici
const comp0 = R.companero; R.companero = (t, e) => { if (t < P7) comp0(t, e); };
const atomEn = (x, y, t, r = 7, e = 0.4) => { x = Math.round(x); y = Math.round(y); const rr = r + 5;
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.25 && ((i + j) & 1 || g > 0.6)) R.pset(x + i, y + j, g > 0.65 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e }); };
// el bocadillo (pan con sésamo, lechuga, tomate y queso), 12 × 6, (x, y) arriba a la izquierda
const PAN = hex('#e8a85a'), PANL = hex('#f8d08a'), PANS = hex('#b8743a'), LECH = hex('#5ac84a'), TOM = hex('#e83a3a'), QUESO = hex('#ffd84a');
const bocadillo = (x, y) => { x = Math.round(x); y = Math.round(y);
  rc(x + 1, y - 1, x + 10, y + 5, K); rc(x, y, x + 11, y + 4, K);
  rc(x + 1, y, x + 10, y + 1, PAN); R.linea(x + 2, y, x + 9, y, PANL); R.pset(x + 3, y, BL); R.pset(x + 7, y, BL);
  for (let i = 1; i <= 10; i++) R.pset(x + i, y + 2, i % 3 === 0 ? TOM : i % 3 === 1 ? LECH : QUESO);
  R.pset(x, y + 2, LECH); R.pset(x + 11, y + 2, LECH); rc(x + 1, y + 3, x + 10, y + 4, PANS); R.linea(x + 1, y + 3, x + 10, y + 3, PAN); };
// Atom en bici: x = la rueda de atrás, el bocadillo en una cesta de mimbre delante (lleva: false, cesta vacía)
const MIMBRE = hex('#c89a5a'), MIMBRES = hex('#8a6030');
const atomBici = (x, suelo, t, tr, o = {}) => { x = Math.round(x); const y = suelo - 6, xd = x + 20;
  R.disco(x + 10, suelo + 1, 0, K); for (let i = -2; i <= 22; i++) R.pset(x + i, suelo + 1, mez(R.pget(x + i, suelo + 1), K, 0.45));
  atomEn(x + 7, y - 18 - (o.salto ?? 0), t, 7, o.e ?? 0.45);
  bici(R, x, suelo, tr, { cesta: false, fondo: o.fondo ?? R.pget(x, y) });
  // la cesta (con el bocadillo asomando)
  if (o.lleva !== false) bocadillo(xd - 1, y - 20);
  rc(xd - 3, y - 16, xd + 8, y - 9, K); rc(xd - 2, y - 15, xd + 7, y - 10, MIMBRE); for (let i = xd - 2; i <= xd + 7; i += 2) R.linea(i, y - 15, i, y - 10, MIMBRES); R.linea(xd - 2, y - 13, xd + 7, y - 13, MIMBRES); };

// ── 1 · INSERTO: la mesa de los fans desde arriba, con la hoja de Leonida ─────────────────────────────────────────
const M1 = hex('#7a4a2a'), M2 = hex('#8a5a34'), M3 = hex('#9e6c3e'), M4 = hex('#b4844e'), MJ = hex('#3e2214'), MB = hex('#c89a62');
let BUF1 = null;
const mesaFans = () => { if (BUF1) return R.copiar(BUF1); BUF1 = R.nuevo(); const prev = R.usar(BUF1);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y + 6) / 24), yy = (y + 6) % 24, off = h(tab, 0, 5) * 300;
    const calma = (x > 268 && y < 50) || (x < 176 && y < 22), v = Math.sin((x + off) * 0.05 + Math.sin((x + off) * 0.011 + tab * 2) * 3.2 + yy * 0.42);
    const nudo = Math.hypot(((x + off * 3) % 140) - 70, (yy - 12) * 2.2) < 6 && !calma;
    let col = calma ? (v > 0.75 ? M3 : M2) : v > 0.82 ? M4 : v > 0.35 ? M3 : v > -0.5 ? M2 : M1;
    if (nudo) col = Math.hypot(((x + off * 3) % 140) - 70, (yy - 12) * 2.2) < 3 ? MJ : M1;
    if (yy === 0) col = MJ; else if (yy === 1) col = MB; else if (yy === 23) col = M1;
    if (!calma && h(x, y, 9) > 0.985) col = M1;
    R.pset(x, y, col); }
  // las juntas de testa de los tablones, con sus clavos
  for (let tab = 0; tab < 8; tab++) { const xj = Math.round(40 + h(tab, 3, 6) * 240), y0 = tab * 24 - 6; if (y0 + 23 < 0) continue; R.linea(xj, Math.max(0, y0 + 1), xj, Math.min(179, y0 + 23), MJ); for (const yy of [y0 + 6, y0 + 17]) if (yy > 22) { R.pset(xj - 3, yy, hex('#5a5a62')); R.pset(xj + 3, yy, hex('#5a5a62')); } }
  // la taza (arriba de todo, vista desde arriba), con su cerco de café en la madera
  R.disco(34, 150, 13, hex('#6a3a20')); R.disco(34, 150, 12, M2);
  R.disco(30, 146, 11, K); R.disco(30, 146, 10, hex('#e85a6a')); R.disco(29, 145, 8, hex('#f07a86')); R.disco(30, 146, 7, K); R.disco(30, 146, 6, hex('#5a2e18')); R.disco(29, 145, 4, hex('#7a4424')); R.pset(27, 143, hex('#c89a6a'));
  rc(41, 141, 46, 151, K); rc(42, 143, 44, 149, hex('#e85a6a')); rc(43, 144, 43, 148, M2);
  // los lápices de colores y el rotulador
  for (const [x0, y0, x1, y1, col] of [[8, 104, 44, 92, '#3a8ae8'], [10, 112, 50, 104, '#e8c83a'], [12, 120, 42, 118, '#3ac85a']]) { const dx = x1 - x0, dy = y1 - y0, n = Math.hypot(dx, dy);
    for (let i = 0; i <= n; i++) { const px = Math.round(x0 + dx * i / n), py = Math.round(y0 + dy * i / n); R.pset(px, py - 1, K); R.pset(px, py + 2, K); R.pset(px, py, i > n - 5 ? hex('#f0d8a8') : hex(col)); R.pset(px, py + 1, i > n - 5 ? hex('#c8a878') : mez(hex(col), K, 0.3)); if (i > n - 2) R.pset(px, py, hex(col)); if (i < 4) { R.pset(px, py, hex('#f4a0b0')); R.pset(px, py + 1, hex('#c87080')); } } }
  // la regla transparente con sus marcas (abajo)
  rc(74, 162, 230, 171, K); rc(75, 163, 229, 170, hex('#d8e8e4')); rc(75, 168, 229, 170, hex('#b8ccc8')); for (let x = 78; x < 228; x += 4) R.linea(x, 163, x, x % 20 === 18 ? 167 : 165, hex('#5a6a6a'));
  // la nota amarilla con una palmera dibujada y la rosa con un puente y un «?» (sin letras)
  rc(8, 30, 46, 66, hex('#c8a83a')); rc(8, 30, 45, 65, hex('#f8e070')); rc(8, 30, 45, 33, hex('#e8c850'));
  R.linea(22, 60, 26, 42, hex('#7a5a2a')); R.linea(23, 60, 27, 42, hex('#7a5a2a')); for (const [p, q] of [[16, 44], [36, 44], [18, 38], [34, 38], [26, 36]]) R.linea(27, 42, p, q, hex('#3a8a3a')); R.linea(12, 61, 41, 61, hex('#3a8ae8'));
  rc(272, 112, 306, 146, hex('#c87090')); rc(272, 112, 305, 145, hex('#f8a8c0')); rc(272, 112, 305, 115, hex('#f090b0'));
  R.linea(276, 134, 302, 134, hex('#5a3a5a')); for (const x of [280, 288, 296]) R.linea(x, 134, x, 140, hex('#5a3a5a')); R.icono('?', 285, 120, hex('#c83a6a'), hex('#f8c8d8'), 1);
  // el móvil boca arriba y una bola de papel arrugada
  rc(276, 58, 302, 104, K); rc(277, 59, 301, 103, hex('#2a2a36')); rc(279, 62, 299, 99, hex('#1a1a26')); R.pset(289, 60, hex('#5a5a6a'));
  R.disco(298, 162, 8, K); R.disco(298, 162, 7, hex('#f2ecd8')); for (let k = 0; k < 9; k++) R.linea(Math.round(292 + h(k, 1, 3) * 12), Math.round(156 + h(k, 2, 3) * 12), Math.round(294 + h(k, 3, 3) * 9), Math.round(158 + h(k, 4, 3) * 9), hex('#c8c0a8'));
  // el carrete de hilo rojo
  R.disco(20, 84, 7, K); R.disco(20, 84, 6, hex('#c83a3a')); for (let k = -5; k <= 5; k += 2) R.linea(15, 84 + k, 25, 84 + k, hex('#e85a5a')); R.disco(20, 84, 2, hex('#e8d0a0'));
  R.usar(prev); R.copiar(BUF1); };
const p1 = (t) => {
  mesaFans();
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; for (let i = 0; i < 10; i++) { const yy = Math.round(140 - ph * 30 - i * 1.4), xx = Math.round(30 + k * 3 - 3 + Math.sin(t * 2 + i * 0.5 + k) * 3); if (ph * 10 + i > 4 && ph < 0.85 && i % 2 === 0) R.pset(xx, yy, mez(R.pget(xx, yy), BL, 0.45)); } }
  // la hoja entra deslizándose desde abajo
  const sube = ease(tramo(t, 0.15, 0.95)), mx = 62, my = Math.round(lerp(190, 22, sube)), w = 196;
  rc(mx + 3, my + 4, mx + w + 3, my + 133, MJ);
  const enc = tramo(t, vc - 0.05, vc + 0.25) + tramo(t, keys - 0.05, keys + 0.25) + tramo(t, grass - 0.25, grass + 0.1) * 0.7;
  const m = T.a_mapaLeonida(R, mx, my, w, t, { encendidas: enc });
  rc(mx - 1, my - 1, mx + w, my - 1, K); rc(mx - 1, my + m.h, mx + w, my + m.h, K); R.linea(mx - 1, my, mx - 1, my + m.h, K); R.linea(mx + w, my, mx + w, my + m.h, K);
  // las seis chinchetas, en «six»
  const orden = ['vicecity', 'cayos', 'grassrivers', 'ambrosia', 'portgellhorn', 'kalaga'];
  orden.forEach((k, i) => { const p = m.regiones[k]; if (!p) return; const bj = tramo(t, seis + i * 0.13, seis + i * 0.13 + 0.25); if (bj > 0) T.chincheta(R, Math.round(p[0]), Math.round(p[1]), t, i < enc ? hex('#e83a3a') : hex('#f0f0f0'), { baja: bj }); });
  for (const [k, tt] of [['vicecity', vc], ['cayos', keys], ['grassrivers', grass]]) { const p = m.regiones[k], e = tramo(t, tt - 0.05, tt + 0.55); if (p && e > 0 && e < 1) { destello(p[0] - 6, p[1] - 12, Math.round(2 + e * 5), hex('#fff6c0')); destello(p[0] + 9, p[1] - 4, Math.round(1 + e * 3), BL); } }
  // la lupa va a la región que nombra la voz
  const P = (k) => m.regiones[k] ?? [160, 90], cen = [mx + w / 2, my + 60];
  const ir = (p0, p1_, t0) => { const u = ease(tramo(t, t0 - 0.35, t0)); return [lerp(p0[0], p1_[0], u), lerp(p0[1], p1_[1], u)]; };
  let L = [lerp(330, cen[0], ease(tramo(t, 1.0, 1.8))), lerp(200, cen[1], ease(tramo(t, 1.0, 1.8)))];
  if (t > vc - 0.35) L = ir(cen, P('vicecity'), vc); if (t > keys - 0.35) L = ir(P('vicecity'), P('cayos'), keys); if (t > grass - 0.6) L = ir(P('cayos'), P('grassrivers'), grass + 0.2);
  const lx = Math.round(L[0] + 6), ly = Math.round(L[1] - 4), lr = 13;
  for (let j = -lr; j <= lr; j++) for (let i = -lr; i <= lr; i++) { const d = Math.hypot(i, j); if (d > lr - 1) continue; const g = (i + j < -8 && d > lr - 5) ? 0.55 : 0.18; R.pset(lx + i, ly + j, mez(R.pget(lx + i, ly + j), BL, g)); }
  const dx = 0.7, dy = 0.7; for (let i = 0; i < 26; i++) { const px = Math.round(lx + (lr + 1 + i) * dx), py = Math.round(ly + (lr + 1 + i) * dy); R.disco(px, py, 3, K); R.disco(px, py, 2, i < 4 ? hex('#c8c8d0') : hex('#3a2a4a')); if (i >= 4) R.pset(px - 1, py - 1, hex('#6a5a7a')); }
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2; R.pset(Math.round(lx + Math.cos(an) * lr), Math.round(ly + Math.sin(an) * lr), K); R.pset(Math.round(lx + Math.cos(an) * (lr - 1)), Math.round(ly + Math.sin(an) * (lr - 1)), an > 3.4 && an < 5 ? hex('#f0f0f8') : hex('#9aa0b0')); }
  // el móvil vibra y se enciende cuando cae la última chincheta
  const vib = tramo(t, seis + 0.9, seis + 2.2); if (vib > 0 && vib < 1) { const s = Math.floor(t * 30) % 2; rc(279, 62, 299, 99, hex('#3a6ac8')); rc(281, 66, 297, 74, hex('#9ac8f0')); for (const yy of [58, 104]) R.linea(274 + s, yy, 276 + s, yy, hex('#f0f0f8')); R.icono('mano', 286, 82, BL, hex('#1a3a8a'), 1); }
};

// ── 2 · la pared del mapa ─────────────────────────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const enc = 2.7 + tramo(t, grass - 0.05, grass + 0.25) * 0.3 + tramo(t, port - 0.05, port + 0.25) + tramo(t, ambrosia - 0.05, ambrosia + 0.25) + tramo(t, kalaga - 0.05, kalaga + 0.25);
  const g = T.salon(R, t, { encuadre: 'mapa', encendidas: enc });
  // el fan entra por la izquierda y señala cada región; en «never said» se queda con la boca abierta
  const u = tramo(t, P2 + 0.05, P2 + 0.9), fx = Math.round(lerp(-18, 52, u)), duda = t > nunca;
  R.actor(T.ELENCO_LF.fanLF, fx, g.suelo, t, { dir: duda && Math.floor((t - nunca) * 2) % 2 ? -1 : 1, anda: u > 0 && u < 1, dedo: u >= 1 && !duda, habla: !duda && [port, ambrosia, kalaga].some((k) => t > k && t < k + 0.4), sorpresa: duda });
  // en la mesa: la fan dibuja con su rotulador (la mano va y viene) y el chico teclea; en «never said» los dos levantan la vista
  const d = Math.sin(t * 5) * 3, fanaX = 150;
  const ra = R.actor(T.ELENCO_LF.fanaLF, fanaX, g.suelo, t, { dir: 1, sostiene: duda ? undefined : [fanaX + 18 + Math.round(d), g.suelo - 12], sorpresa: duda && t < nunca + 1.2, sonrisa: t > nunca + 1.2 });
  if (!duda) { const [hx, hy] = ra.mano; R.linea(hx + 1, hy - 4, hx + 3, hy + 1, hex('#e83a3a')); R.pset(hx + 3, hy + 2, K); }
  R.actor(T.ELENCO_LF.ciudadanoLF, 206, g.suelo, t, { dir: t > kalaga && t < nunca ? -1 : 1, habla: t > kalaga + 0.2 && t < nunca && Math.sin(t * 9) > 0, brazos: duda && t < nunca + 1.4 });
  T.salonDelante(R, t, { encuadre: 'mapa', encendidas: enc });
  // la región que se enciende echa un destello
  for (const [k, tt] of [['grassrivers', grass], ['portgellhorn', port], ['ambrosia', ambrosia], ['kalaga', kalaga]]) { const p = g.regiones?.[k], e = tramo(t, tt, tt + 0.5); if (p && e > 0 && e < 1) destello(p[0], p[1] - 6, Math.round(2 + e * 4), hex('#fff6c0')); }
  // «never said which real place»: el «?» grande sobre el mapa
  const q = tramo(t, nunca, nunca + 0.25); if (q > 0) { const [x0, y0, x1, y1] = g.mapa, cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2) - 8 + Math.round(Math.sin(t * 6) * 1.5), e = q < 1 ? 2 + Math.round(q * 3) : 4;
    R.icono('?', cx - Math.round(2.5 * e) - 1, cy - Math.round(3.5 * e), K, K, e); R.icono('?', cx - Math.round(2.5 * e) + 1, cy - Math.round(3.5 * e) + 1, K, K, e); R.icono('?', cx - Math.round(2.5 * e), cy - Math.round(3.5 * e), hex('#ffd84a'), hex('#8a5a14'), e); }
};

// ── 3 · INSERTO: el portátil y la libreta sobre la alfombrilla de corte ──────────────────────────────────────────
const MAT = hex('#2e5a46'), MAT1 = hex('#3a6a54'), MAT2 = hex('#5a8a6e');
// los tres fotogramas del vídeo, en pequeño (k 0 el hotel al ocaso, 1 el puente sobre el mar, 2 la marisma)
const fotograma = (k, x0, y0, w, hh, t) => { const ps = (x, y, col) => { if (x >= x0 && x < x0 + w && y >= y0 && y < y0 + hh) R.pset(x, y, col); };
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) { const v = y / hh, tr = (x + y) % 2; let col;
    if (k === 0) col = v < 0.55 ? (v + tr * 0.06 < 0.25 ? hex('#ff9a5a') : v + tr * 0.06 < 0.42 ? hex('#ff7a8a') : hex('#c86aa8')) : v < 0.8 ? hex('#f4a8c0') : hex('#5a4a6a');
    else if (k === 1) col = v < 0.45 ? (v + tr * 0.06 < 0.25 ? hex('#7ac0f0') : hex('#a8d8f8')) : (Math.sin(x * 0.5 + t * 4 + y) > 0.8 ? hex('#a8f0f0') : v < 0.7 ? hex('#3ac8d0') : hex('#1a8a9a'));
    else col = v < 0.42 ? (v + tr * 0.06 < 0.22 ? hex('#8ac0e8') : hex('#c8e0f0')) : (h(x, y, 4) > 0.7 ? hex('#c8b860') : hex('#a8a050'));
    ps(x0 + x, y0 + y, col); }
  const X = (f) => Math.round(x0 + f * w), Y = (f) => Math.round(y0 + f * hh);
  if (k === 0) { for (let i = X(0.08); i < X(0.62); i++) for (let j = Y(0.3); j < Y(0.8); j++) ps(i, j, (i % 4 < 2 && j % 5 < 3 && j < Y(0.74)) ? hex('#5a4a8a') : hex('#f4a8c0')); for (let i = X(0.08); i < X(0.62); i++) ps(i, Y(0.3), hex('#ff4fa8')); for (let j = Y(0.2); j < Y(0.8); j++) ps(X(0.82), j, hex('#5a3a2a')); for (let i = -4; i <= 4; i++) { ps(X(0.82) + i, Y(0.2) + Math.abs(i) / 2 | 0, hex('#2a6a3a')); } ps(X(0.75), Y(0.3), hex('#ffe08a')); }
  else if (k === 1) { for (let i = 0; i < w; i++) { ps(x0 + i, Y(0.55), hex('#e8e8e0')); ps(x0 + i, Y(0.55) + 1, hex('#8a8a84')); if (i % 7 === 3) for (let j = 2; j < 5; j++) ps(x0 + i, Y(0.55) + j, hex('#6a6a64')); } for (let i = X(0.7); i < X(0.95); i++) ps(i, Y(0.45), hex('#3a8a4a')); }
  else { for (let i = 0; i < w; i++) { const yy = Y(0.66) + Math.round(Math.sin(i * 0.3) * 1.5); ps(x0 + i, yy, hex('#4a6a8a')); ps(x0 + i, yy + 1, hex('#5a7a9a')); } for (let i = X(0.62); i < X(0.9); i++) for (let j = Y(0.32); j < Y(0.46); j++) if (Math.hypot(i - X(0.76), (j - Y(0.44)) * 1.6) < w * 0.14) ps(i, j, hex('#2a5a34')); ps(X(0.3), Y(0.62), hex('#e8e8e0')); ps(X(0.3) + 1, Y(0.62), hex('#e8e8e0')); ps(X(0.3) + 2, Y(0.6), hex('#5a5a62')); }
};
// la Florida a lápiz de la libreta (en la caja de la libreta): contorno y los Cayos
const FL = [[0, 0.05], [0.56, 0.08], [0.6, 0.1], [0.63, 0.22], [0.69, 0.36], [0.77, 0.51], [0.84, 0.66], [0.88, 0.78], [0.87, 0.88], [0.81, 0.95], [0.74, 0.93], [0.68, 0.85], [0.62, 0.73], [0.56, 0.61], [0.51, 0.49], [0.47, 0.39], [0.44, 0.3], [0.37, 0.25], [0.28, 0.22], [0.2, 0.24], [0.1, 0.2], [0, 0.18], [0, 0.05]];
const LX = (f) => Math.round(190 + f * 104), LY = (f) => Math.round(70 + f * 88);
let BUF3 = null;
const alfombrilla = () => { if (BUF3) return R.copiar(BUF3); BUF3 = R.nuevo(); const prev = R.usar(BUF3);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const calma = (x > 268 && y < 50) || (x < 176 && y < 22); let col = h(x, y, 2) > 0.93 ? MAT1 : MAT;
    if (!calma) { if (x % 10 === 0 || y % 10 === 0) col = MAT1; if (x % 50 === 0 || y % 50 === 0) col = MAT2; if ((x - y) % 40 === 0 && x % 2) col = MAT1; }
    R.pset(x, y, col); }
  // el portátil: la pantalla (arriba) y el teclado (abajo), con su bisagra
  rc(6, 24, 140, 100, K); rc(7, 25, 139, 99, hex('#3a3e4a')); rc(12, 30, 134, 92, K); R.pset(73, 27, hex('#8a8e9a'));
  rc(4, 102, 142, 172, K); rc(5, 103, 141, 171, hex('#c8ccd4')); rc(5, 103, 141, 104, hex('#e8ecf0')); rc(5, 101, 141, 101, hex('#5a5e6a'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 13; i++) { const kx = 12 + i * 10 + (j % 2) * 2, ky = 108 + j * 8; if (j === 4 && (i < 4 || i > 9)) continue; rc(kx, ky, kx + 7, ky + 5, hex('#3a3e4a')); R.linea(kx, ky + 5, kx + 7, ky + 5, K); R.pset(kx + 1, ky + 1, hex('#5a5e6a')); }
  rc(48, 150, 98, 168, hex('#b0b4bc')); R.linea(48, 150, 98, 150, hex('#9a9ea8'));
  // la libreta de cuadros con su espiral
  rc(178, 50, 308, 172, K); rc(180, 52, 306, 170, hex('#a8a090')); rc(178, 52, 304, 168, K); rc(179, 53, 303, 167, hex('#f6f2e4'));
  for (let x = 183; x < 303; x += 6) R.linea(x, 60, x, 166, hex('#d8e4ec')); for (let y = 62; y < 167; y += 6) R.linea(180, y, 302, y, hex('#d8e4ec')); R.linea(186, 54, 186, 166, hex('#f0b0b0'));
  for (let x = 186; x < 300; x += 8) { R.disco(x, 54, 2, K); R.pset(x, 52, hex('#c8ccd4')); R.pset(x, 53, hex('#e8ecf0')); R.pset(x + 1, 53, hex('#9a9ea8')); }
  // la Florida a lápiz (gris) con los Cayos en puntos y la Georgia rayada arriba
  for (let i = 0; i < FL.length - 1; i++) R.linea(LX(FL[i][0]), LY(FL[i][1]), LX(FL[i + 1][0]), LY(FL[i + 1][1]), hex('#6a6a74'));
  for (let i = 0; i < 6; i++) R.pset(LX(0.78 - i * 0.04), LY(0.97 + i * 0.006), hex('#6a6a74'));
  for (let x = LX(0.02); x < LX(0.6); x += 4) R.linea(x, LY(0.0), x + 3, LY(-0.05), hex('#a8a8b0'));
  R.disco(LX(0.6), LY(0.62), 3, hex('#9a9aa4')); R.disco(LX(0.6), LY(0.62), 2, hex('#f6f2e4'));   // el lago
  // las gafas, la goma y el sacapuntas con sus virutas
  for (const cx of [156, 170]) { R.disco(cx, 160, 6, K); R.disco(cx, 160, 5, hex('#9ac8d8')); R.pset(cx - 2, 158, BL); } R.linea(161, 159, 165, 159, K);
  rc(150, 72, 166, 80, K); rc(151, 73, 165, 79, hex('#f4a0b0')); rc(151, 73, 157, 79, hex('#3a8ae8'));
  rc(152, 40, 160, 48, K); rc(153, 41, 159, 47, hex('#e8c83a')); for (let k = 0; k < 7; k++) R.pset(Math.round(150 + h(k, 1, 8) * 18), Math.round(50 + h(k, 2, 8) * 10), hex('#d8b080'));
  R.usar(prev); R.copiar(BUF3); };
const p3 = (t) => {
  alfombrilla();
  // el vídeo: tres fotogramas, plano a plano (en «shot by shot»), con la barra y la pausa
  const k = t < shot1 ? 0 : t < shot2 ? 1 : 2; fotograma(k, 13, 31, 121, 61, t);
  rc(13, 86, 133, 91, hex('#1a1a26')); const bx = Math.round(lerp(16, 130, [0.31, 0.47, 0.62][k])); R.linea(16, 88, 130, 88, hex('#6a6a74')); R.linea(16, 88, bx, 88, hex('#e83a3a')); R.disco(bx, 88, 2, BL);
  rc(118, 36, 120, 44, BL); rc(124, 36, 126, 44, BL);
  if (t > shot1 - 0.1 && t < shot1 + 0.12 || t > shot2 - 0.1 && t < shot2 + 0.12) rc(13, 31, 133, 85, hex('#f0f0f8'));
  // «which real place sits behind each one»: el «?» entre el vídeo y la libreta
  const q = tramo(t, P3 + 0.1, P3 + 0.4) - tramo(t, players - 0.4, players); if (q > 0) { const e = 3; R.icono('?', 152, 86, K, K, e); R.icono('?', 151, 85, hex('#ffd84a'), hex('#8a5a14'), e); }
  // las tarjetas impresas de cada fotograma salen del portátil y se apilan junto a la libreta
  [[shot1, 0, 146, 106], [shot2, 1, 148, 126]].forEach(([tt, kk, x1, y1]) => { const u = ease(tramo(t, tt, tt + 0.45)); if (u <= 0) return; const x = Math.round(lerp(60, x1, u)), y = Math.round(lerp(60, y1, u));
    rc(x - 1, y - 1, x + 26, y + 20, K); rc(x, y, x + 25, y + 19, BL); fotograma(kk, x + 2, y + 2, 22, 13, t); R.linea(x + 3, y + 17, x + 14, y + 17, hex('#c8c8d0')); });
  // el hilo rojo del vídeo a Miami, que se tiende solo desde «hand-drawn»
  const mia = [LX(0.87), LY(0.84)], hu = tramo(t, shot2 + 0.2, dibujado + 0.4);
  if (hu > 0) { const x0 = 134, y0 = 60, n = Math.round(Math.hypot(mia[0] - x0, mia[1] - y0) * hu); for (let i = 0; i <= n; i++) { const f = i / Math.hypot(mia[0] - x0, mia[1] - y0), px = Math.round(lerp(x0, mia[0], f)), py = Math.round(lerp(y0, mia[1], f) + Math.sin(f * Math.PI) * 10); if (i % 4 < 3) { R.pset(px, py, hex('#e83a3a')); R.pset(px, py + 1, hex('#8a1a1a')); } } }
  // la mano con el rotulador rojo: rodea Miami («worked that out») y después marca los Cayos con un visto
  const ROJO = hex('#e83a3a'); const circ = tramo(t, players + 0.3, players + 1.5), vis = tramo(t, dibujado - 0.2, dibujado + 0.5);
  for (let i = 0; i < Math.round(circ * 40); i++) { const an = -1.2 + i / 40 * Math.PI * 2.1; R.pset(Math.round(mia[0] + Math.cos(an) * 9), Math.round(mia[1] + Math.sin(an) * 6), ROJO); R.pset(Math.round(mia[0] + Math.cos(an) * 10), Math.round(mia[1] + Math.sin(an) * 6), ROJO); }
  const VI = [[LX(0.6), LY(1.02)], [LX(0.64), LY(1.06)], [LX(0.74), LY(0.97)]];
  if (vis > 0) { const n = vis * 2; for (let s = 0; s < Math.min(2, Math.ceil(n)); s++) { const f = Math.min(1, n - s); const [xa, ya] = VI[s], [xb, yb] = VI[s + 1]; R.linea(xa, ya, Math.round(lerp(xa, xb, f)), Math.round(lerp(ya, yb, f)), ROJO); R.linea(xa + 1, ya, Math.round(lerp(xa, xb, f)) + 1, Math.round(lerp(ya, yb, f)), ROJO); } }
  // dónde está la punta del rotulador
  const llega = tramo(t, players - 0.3, players + 0.3), vete = tramo(t, dibujado + 0.7, dibujado + 1.2);
  let tip; if (t < players + 1.5) { const an = -1.2 + circ * Math.PI * 2.1; tip = [mia[0] + Math.cos(an) * 10, mia[1] + Math.sin(an) * 6]; }
  else if (t < dibujado - 0.2) { const u = ease(tramo(t, players + 1.5, dibujado - 0.3)); tip = [lerp(mia[0] + 6, VI[0][0], u), lerp(mia[1] + 4, VI[0][1], u)]; }
  else { const n = Math.min(2, vis * 2), s = Math.min(1, Math.floor(n)), f = n - s; tip = s >= 2 ? VI[2] : [lerp(VI[s][0], VI[s + 1][0], f), lerp(VI[s][1], VI[s + 1][1], f)]; }
  const fuera = (1 - llega) + vete; tip = [tip[0] + fuera * 50, tip[1] + fuera * 40];
  if (fuera < 1) { const tx = Math.round(tip[0]), ty = Math.round(tip[1]);
    // el rotulador (por debajo de la mano), la punta en el papel
    for (let i = 0; i <= 12; i++) { const px = tx + Math.round(i * 0.6), py = ty - Math.round(i * 0.75); R.pset(px - 1, py, K); R.pset(px + 1, py, K); R.pset(px, py, i < 2 ? ROJO : i < 4 ? hex('#e8e8f0') : ROJO); }
    T.brazo(R, tx + 36, ty + 34, tx + 9, ty - 4, '#3a6ac8', -1); }
};

// ── 4 · la playa de Miami: el turista hace la foto ────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const o = { encuadre: 'playa', noche: 0.05 }; const g = T.vicecity(R, t, o);
  // el chico de la izquierda lanza la pelota de playa al aire y la recoge
  const bt = (t - P4) % 1.8, bu = bt / 1.8, by = Math.round(g.suelo - 22 - Math.sin(bu * Math.PI) * 34), bx = 52 + Math.round(Math.sin(bu * Math.PI) * 6);
  R.actor(T.ELENCO_LF.ciudadanoLF, 40, g.suelo, t, { dir: 1, sostiene: bu < 0.12 || bu > 0.88 ? [bx, g.suelo - 20] : undefined, brazos: bu >= 0.12 && bu <= 0.88, sonrisa: true });
  R.disco(bx, by, 5, K); R.disco(bx, by, 4, BL); for (const [ang, col] of [[0, '#e83a3a'], [2.1, '#3a8ae8'], [4.2, '#f8d040']]) { const a0 = ang + t * 6; for (let r = 1; r <= 4; r++) R.pset(bx + Math.round(Math.cos(a0) * r * 0.8), by + Math.round(Math.sin(a0) * r * 0.8), hex(col)); } R.pset(bx - 2, by - 2, BL);
  // el turista llega por la orilla, se para y en «Miami» hace la foto a los hoteles
  const u = tramo(t, P4 + 0.1, miami - 0.4), tx = Math.round(lerp(236, 132, u)), foto = t > miami - 0.2 && t < y2002 + 0.6;
  const ra = R.actor(T.ELENCO_LF.turistaLF, tx, g.suelo, t, { dir: -1, anda: u > 0 && u < 1, sostiene: foto ? true : undefined, sonrisa: t > y2002 + 0.6, habla: t > y2002 + 0.6 && Math.sin(t * 8) > 0 });
  if (foto) { const [hx, hy] = ra.mano; rc(hx - 5, hy - 4, hx + 1, hy + 1, K); rc(hx - 4, hy - 3, hx, hy, hex('#3a3e4a')); R.pset(hx - 5, hy - 2, hex('#9ac8f0'));
    const f = tramo(t, miami + 0.15, miami + 0.5); if (f > 0 && f < 1) { const r = Math.round(3 + f * 10); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.linea(hx - 6, hy - 2, Math.round(hx - 6 + Math.cos(an) * r), Math.round(hy - 2 + Math.sin(an) * r), hex('#fff8c0')); } R.disco(hx - 6, hy - 2, 2, BL); } }
  T.vicecityDelante(R, t, o);
};

// ── 5 · la terraza del hotel: glamour, ajetreo y codicia ──────────────────────────────────────────────────────────
const copa = (x, y, col) => { R.linea(x, y, x, y + 3, K); R.linea(x - 2, y + 4, x + 2, y + 4, K); R.poligono([[x - 3, y - 4], [x + 3, y - 4], [x, y]], K); R.poligono([[x - 2, y - 3], [x + 2, y - 3], [x, y - 1]], hex(col)); R.pset(x + 2, y - 5, hex('#ffd84a')); R.pset(x - 1, y - 3, BL); };
const p5 = (t) => {
  const o = { encuadre: 'ocean', camara: 'terraza', noche: 0.08 + 0.42 * tramo(t, glamour - 0.1, glamour + 0.5) }; const g = T.vicecity(R, t, o);
  // la invitada de la derecha posa en «glamour»; el cliente espera junto a la mesa
  R.actor(T.ELENCO_LF.bailarinaLF, 236, g.suelo, t, { dir: -1, sonrisa: true, brazos: t > glamour && t < glamour + 0.9, enfado: t > greed + 0.4 && t < city });
  // el camarero sale por la puerta y corre con la bandeja en «hustle»
  const w = tramo(t, hustle - 0.6, hustle + 0.45), wx = Math.round(lerp(72, 166, ease(w))), deja = t > greed - 0.15;
  const rw = R.actor(T.ELENCO_LF.empleadoLF, wx, g.suelo, t, { dir: 1, anda: w > 0 && w < 1, sostiene: true, sorpresa: t > greed && t < greed + 1.1, sonrisa: t > greed + 1.1 });
  { const [hx, hy] = rw.mano; R.linea(hx - 6, hy, hx + 6, hy, K); R.linea(hx - 6, hy - 1, hx + 6, hy - 1, hex('#c8ccd4')); if (!deja) { copa(hx - 3, hy - 3, '#ff5a9a'); copa(hx + 3, hy - 3, '#40e8f8'); } }
  // en «greed» el cliente se queda las dos copas de la bandeja
  const rg = R.actor(T.ELENCO_LF.golfistaLF, 196, g.suelo, t, { dir: -1, sostiene: deja ? true : undefined, sonrisa: deja, habla: !deja && Math.sin(t * 7) > 0.3 });
  if (deja) { const [hx, hy] = rg.mano; copa(hx - 2, hy - 3, '#ff5a9a'); copa(hx + 3, hy - 4, '#40e8f8'); const e = tramo(t, greed - 0.1, greed + 0.4); if (e < 1) for (let k = 0; k < 4; k++) destello(hx + Math.cos(k * 1.6) * (4 + e * 8), hy - 6 + Math.sin(k * 1.6) * (4 + e * 6), 1, hex('#ffd84a')); }
  globoIcono('!', wx + 7, g.suelo - 44, tramo(t, greed + 0.05, greed + 0.2) - tramo(t, greed + 1.1, greed + 1.2), 2);
  T.vicecityDelante(R, t, o);
};

// ── 6 · Ocean Drive del ocaso a los neones ────────────────────────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'ocean', noche: 0.08 + 0.92 * tramo(t, neon - 0.2, neon + 1.1) }; const g = T.vicecity(R, t, o);
  // la patinadora cruza el paseo
  const s = tramo(t, P6, P6 + 4.2); R.actor(T.ELENCO_LF.patinadoraLF, Math.round(lerp(-20, 330, s)), g.suelo + 2, t, { dir: 1, anda: true, sonrisa: true });
  // dos paseantes charlan; en «cars cruising» se vuelven a mirar los coches y el turista señala
  const mira = t > cars - 0.1;
  R.actor(T.ELENCO_LF.vecinaLF, 170, g.suelo, t, { dir: mira ? 1 : -1, habla: !mira && Math.sin(t * 6) > 0, sorpresa: mira && t < look, sonrisa: t > look });
  R.actor(T.ELENCO_LF.turistaLF, 148, g.suelo, t, { dir: 1, habla: !mira && Math.sin(t * 6 + 2) > 0, dedo: mira && t < look + 0.2, sonrisa: mira });
  T.vicecityDelante(R, t, o);
};

// ── 7 · la carretera sobre el mar: Atom cruza el puente en bici ───────────────────────────────────────────────────
const p7 = (t) => {
  const o = { encuadre: 'puente' }; const g = T.cayos(R, t, o);
  const u = tramo(t, P7 + 0.2, P8 + 0.2), x = Math.round(lerp(-32, 236, u)), salto = t > islas && t < islas + 0.5 ? Math.round(Math.sin((t - islas) / 0.5 * Math.PI) * 4) : 0;
  atomBici(x, g.suelo, t, t, { salto });
  T.cayosDelante(R, t, o);
  if (salto > 0) destello(x + 7, g.suelo - 34, 3, hex('#fff6c0'));
};

// ── 8 · a pie de puente, gag 2: el pelícano le roba el bocadillo ──────────────────────────────────────────────────
const p8 = (t) => {
  // el pelícano despega del poste, se posa en la cesta (Atom frena), coge el bocadillo y se va por el cielo con él
  const despega = overseas + 0.3, posa = overseas + 0.85, roba = posa + 0.3, vuela = posa + 0.7;
  const o = { encuadre: 'puente', camara: 'barandilla', pelicano: false, coche: t > vuela + 0.25 ? tramo(t, vuela + 0.25, vuela + 1.45) : false };
  const g = T.cayos(R, t, o);
  // Atom pedalea hasta que el pelícano se le posa en la cesta: frena en seco
  const xPara = 176, v = (tt) => tt < posa ? lerp(-34, xPara, tramo(tt, P8 + 0.1, posa)) : xPara + 6 * ease(tramo(tt, posa, posa + 0.25));
  const x = Math.round(v(t)), para = t > posa;
  const PX = 230, PY = 132, cesta = [xPara + 6 + 25, g.suelo - 6 - 16];
  let pel; if (t < despega) pel = { x: PX, y: PY, posado: true };
  else if (t < posa) { const u = tramo(t, despega, posa); pel = { x: lerp(PX, cesta[0], u), y: lerp(PY - 14, cesta[1] - 4, u) - Math.sin(u * Math.PI) * 40 }; }
  else if (t < vuela) pel = { x: cesta[0], y: cesta[1], posado: true, lleva: t > roba };
  else { const u = tramo(t, vuela, vuela + 1.6); pel = { x: lerp(cesta[0], -40, ease(u)), y: lerp(cesta[1] - 6, 40, Math.min(1, u * 1.8)), lleva: true }; }
  atomBici(x, g.suelo, t, para ? posa + 0.25 : t, { lleva: t < roba, salto: t > vuela + 0.5 && t < vuela + 0.9 ? Math.round(Math.sin((t - vuela - 0.5) / 0.4 * Math.PI) * 5) : 0, e: para ? 0.9 : 0.45 });
  if (pel.posado) { T.b_pelicano(R, Math.round(pel.x), Math.round(pel.y), t, { dir: -1, buche: pel.lleva ? 1 : 0 }); if (pel.lleva) bocadillo(Math.round(pel.x) - 15, Math.round(pel.y) - 13); }
  else { const px = Math.round(pel.x), py = Math.round(pel.y);
    // las rayas de velocidad detrás
    for (let k = 0; k < 3; k++) R.linea(px + 14 + k * 2, py - 3 + k * 3, px + 22 + k * 3, py - 3 + k * 3, mez(R.pget(px + 18, py), BL, 0.7));
    T.b_pelicano(R, px, py, t, { dir: -1, vuela: true, aleteo: true, buche: pel.lleva ? 1 : 0 }); if (pel.lleva) bocadillo(px - 19, py - 1); }
  // el «!» de Atom cuando se le posa; el «?» cuando se va volando
  globoIcono('!', x + 7, g.suelo - 54, tramo(t, posa + 0.05, posa + 0.2) - tramo(t, vuela + 0.2, vuela + 0.3), 2);
  globoIcono('?', x + 7, g.suelo - 54, tramo(t, vuela + 0.35, vuela + 0.55), 2);
  T.cayosDelante(R, t, o);
};

// ── 9 · Cayo Hueso: Atom llega con la cesta vacía ─────────────────────────────────────────────────────────────────
const p9 = (t) => {
  const o = { encuadre: 'cayo' }; const g = T.cayos(R, t, o);
  const u = tramo(t, P9 + 0.1, keywest - 0.1), x = Math.round(lerp(-34, 196, ease(u))), llegado = t > keywest;
  const salto = llegado && t < keywest + 0.9 ? Math.round(Math.abs(Math.sin((t - keywest) / 0.45 * Math.PI)) * 5) : 0;
  atomBici(x, g.suelo, t, u < 1 ? t : keywest, { lleva: false, salto, e: llegado ? 0.8 : 0.45 });
  if (llegado && t < keywest + 1.4) { const e = tramo(t, keywest, keywest + 0.6); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + t; destello(x + 7 + Math.cos(an) * (10 + e * 8), g.suelo - 24 - salto + Math.sin(an) * (10 + e * 8), 1 + (k % 2), hex('#fff6c0')); } }
  T.cayosDelante(R, t, o);
};

// ── 10 · el muelle: las aguas más bonitas y más peligrosas ────────────────────────────────────────────────────────
const p10 = (t) => {
  const pica = tramo(t, peligrosas - 0.2, peligrosas + 0.6), o = { encuadre: 'cayo', camara: 'muelle', pelicano: false, oleaje: pica };
  const g = T.cayos(R, t, o);
  // la bici aparcada junto a la nevera
  bici(R, 238, g.suelo, 0, { cesta: false, fondo: hex('#8a6a4a') }); rc(256, g.suelo - 22, 267, g.suelo - 15, K); rc(257, g.suelo - 21, 266, g.suelo - 16, MIMBRE);
  // el pelícano del pilote, con el bocadillo en el buche, se lo traga
  const traga = tramo(t, P10 + 0.6, P10 + 1.2), susto = t > peligrosas + 0.1 && t < peligrosas + 1.0;
  T.b_pelicano(R, 118, 101 - (susto ? Math.round(Math.sin((t - peligrosas - 0.1) / 0.9 * Math.PI) * 6) : 0), t, { dir: 1, buche: 1 - traga, vuela: susto, aleteo: susto });
  // Atom flota en el borde, mira el mar; en «dangerous» la ola salta el muelle y él da un salto atrás
  const atras = ease(tramo(t, peligrosas + 0.05, peligrosas + 0.5)), ax = Math.round(lerp(176, 108, atras)), ay = Math.round(128 - Math.sin(t * 2.4) * 2 - Math.sin(atras * Math.PI) * 18);
  ovalo(ax, g.suelo + 2, 6, 1, mez(R.pget(ax, g.suelo + 2), K, 0.4)); atomEn(ax, ay, t, 8, atras > 0 && atras < 1 ? 1 : 0.4);
  // el sol pinta destellos en el agua en «beautiful»
  const bri = tramo(t, bonitas - 0.1, bonitas + 0.4) - tramo(t, bonitas + 1.2, bonitas + 1.6); if (bri > 0) for (let k = 0; k < 7; k++) if (Math.sin(t * 9 + k * 2) > 0.2) destello(40 + k * 34 + Math.round(h(k, 1, 7) * 12), 100 + Math.round(h(k, 2, 7) * 10), 1 + (k % 2), BL);
  // la ola: un muro de espuma que sube por el borde del muelle y cae en gotas sobre los tablones
  const ola = tramo(t, peligrosas, peligrosas + 1.4); if (ola > 0 && ola < 1) { const alt = Math.sin(ola * Math.PI) * 46;
    for (let x = 122; x < 238; x++) { const f = (x - 122) / 116, env = Math.sin(f * Math.PI) ** 1.4 * (0.75 + 0.25 * Math.sin(f * 9 + t * 5)), top = Math.round(141 - alt * env - Math.max(0, Math.sin(x * 0.45 + t * 9)) * 3 * env); if (top > 140) continue;
      for (let y = top; y < 142; y++) { const d = (y - top) / Math.max(1, 141 - top); R.pset(x, y, y < top + 2 ? BL : d < 0.3 ? (h(x, y, Math.floor(t * 12)) > 0.35 ? hex('#effafc') : hex('#bfeaf0')) : d < 0.7 ? (h(x, y, Math.floor(t * 12)) > 0.6 ? hex('#bfeaf0') : hex('#5ac8d4')) : hex('#2a9aa8')); } R.pset(x, top - 1, mez(R.pget(x, top - 1), BL, 0.5)); }
    for (let k = 0; k < 30; k++) { const f = (ola * 1.3 + h(k, 1, 2) * 0.3), gx = Math.round(130 + h(k, 3, 2) * 100 + (h(k, 4, 2) - 0.5) * 30 * f), gy = Math.round(140 - Math.sin(Math.min(1, f) * Math.PI) * (30 + h(k, 5, 2) * 40) + Math.max(0, f - 0.6) * 40); if (gy < 170) { R.pset(gx, gy, BL); R.pset(gx + 1, gy, hex('#bfeaf0')); } } }
  globoIcono('!', ax, ay - 32, tramo(t, peligrosas + 0.2, peligrosas + 0.4) - tramo(t, peligrosas + 1.6, peligrosas + 1.7), 2);
  T.cayosDelante(R, t, o);
};

const efectos = [[0.3, 'papel'], [seis + 0.2, 'pop'], [vc, 'brillo'], [kalaga, 'brillo'], [nunca + 0.05, 'pop'], [players + 0.35, 'lapiz'], [shot1, 'tic'], [shot2, 'tic'], [dibujado - 0.15, 'lapiz'],
  [miami + 0.15, 'flash'], [glamour, 'interruptor'], [greed, 'pop'], [neon, 'interruptor'], [cars + 0.1, 'coche'],
  [islas, 'boing'], [overseas + 0.3, 'whoosh'], [overseas + 1.15, 'pop'], [overseas + 1.6, 'whoosh'], [overseas + 1.9, 'coche'], [keywest + 0.05, 'brillo'], [P10 + 0.9, 'masca'], [peligrosas, 'ola'], [peligrosas + 0.5, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, año: 2026 });
''')
