E = {}

# Utilidades de los fondos LOCAL (copiadas de escenas8.py: cada escena es un .html independiente)
# Utilidades comunes de los fondos LOCAL (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
// mezcla de dos colores (a: cuánto del segundo) y aclarado/oscurecido de una zona (luz de un foco, sombra)
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const k = f ? f(x, y) : 1; if (k > 0) R.pset(x, y, mez(R.pget(x, y), col, a * k)); } };
// relleno tramado con ruido (paredes, suelos): r rampa, v0 tono base, amp ruido
const relleno = (x0, y0, x1, y1, r, v0, amp = 0.6, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(r, v0 + (h(x >> 1, y >> 1, k) - 0.5) * amp, x, y)); };
// madera con vetas (tablas horizontales de alto ht)
const madera = (x0, y0, x1, y1, r, ht = 12, k = 0) => { for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / ht), fy = (y - y0) % ht;
  for (let x = x0; x <= x1; x++) { const v = 1.6 + Math.sin(x * 0.045 + tb * 1.7 + Math.sin(y * 0.55 + tb) * 1.4) * 0.8 + (h(x >> 2, y, k + tb) - 0.5) * 0.5 - (fy === 0 ? 1.6 : 0) + (fy === 1 ? 0.6 : 0);
    R.pset(x, y, tono(r, v, x, y)); }
  if (fy === 0) for (let x = x0 + ((tb * 53) % 70); x <= x1; x += 70 + (tb % 3) * 9) R.pset(x, y + 4, r[0]); } };
// cuarterón de madera en relieve (paneles de pared)
const cuarteron = (x0, y0, x1, y1, r) => { R.rect(x0, y0, x1, y1, r[1]); R.rect(x0, y0, x1, y0, r[3]); R.rect(x0, y0, x0, y1, r[3]); R.rect(x0, y1, x1, y1, r[0]); R.rect(x1, y0, x1, y1, r[0]);
  for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) R.pset(x, y, tono(r, 1.4 + Math.sin(y * 0.3 + x * 0.02) * 0.5 + (h(x, y >> 1, 7) - 0.5) * 0.4, x, y)); };
// nube de tres tonos
const nube3 = (cx, cy, w, c) => { const B = [[0, 0, .32], [-.32, .06, .24], [.3, .05, .26], [-.1, -.12, .26], [.14, -.08, .22]];
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c[0]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), c[1]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.7), c[2]); };
// la esquina de Atom (x 272–319, y 0–48) tranquila: dos tonos casi iguales, sin dibujo
const calma = (c1, c2) => { for (let y = 0; y <= 64; y++) for (let x = 252; x < 320; x++) { const k = Math.min(1, Math.min(x - 252, 64 - y) / 18); if (BY[(y & 3) * 4 + (x & 3)] < k * 16) R.pset(x, y, BY[(y & 3) * 4 + (x & 3)] < 3 ? c2 : c1); } };
// una estrella de cinco puntas (emblemas sin letras)
const estrella = (x, y, r, c) => { const P = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; P.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } R.poligono(P, c); };
// una caja de juego genérica (sin letras) vista de frente: x, y arriba a la izquierda, 22 × 30; n: la cifra grande
const cajaN = (x, y, n, c1, c2, k = 0) => { x = Math.round(x); y = Math.round(y);
  R.rect(x, y, x + 21, y + 29, K); R.rect(x + 1, y + 1, x + 20, y + 28, c1); R.rect(x + 1, y + 1, x + 20, y + 1, mez(c1, hex('#ffffff'), 0.4)); R.rect(x + 20, y + 2, x + 20, y + 28, c2);
  R.rect(x + 3, y + 3, x + 18, y + 21, hex('#1e2a50')); for (let i = 0; i < 4; i++) { const bx = x + 3 + i * 4, bh = 5 + ((i * 7 + k) % 5) * 2; R.rect(bx, y + 21 - bh, bx + 3, y + 21, hex('#3a3458')); if ((i + k) % 2) R.pset(bx + 1, y + 21 - bh + 2, hex('#f0c040')); }
  R.disco(x + 15, y + 7, 2, hex('#f6e890'));
  R.rect(x + 3, y + 23, x + 18, y + 27, hex('#f2ecd8')); R.rect(x + 5, y + 25, x + 16, y + 25, c2);
  if (n != null) R.numero(String(n), x + 11, y + 20, { tam: 16, centro: true }); };
// la caja de juego pequeña que se lleva en la mano (x, y = el centro de abajo; 11 × 15): la ilustración de la noche, la
// etiqueta blanca y el canto
const cajaMini = (x, y, c, k = 0) => { x = Math.round(x) - 5; y = Math.round(y) - 15; const C1 = hex(c);
  R.rect(x, y, x + 10, y + 14, K); R.rect(x + 1, y + 1, x + 9, y + 13, C1); R.rect(x + 9, y + 1, x + 9, y + 13, mez(C1, K, 0.35)); R.rect(x + 1, y + 1, x + 8, y + 1, mez(C1, hex('#ffffff'), 0.45));
  R.rect(x + 2, y + 2, x + 7, y + 8, hex('#1e2a50')); R.rect(x + 2, y + 6, x + 3, y + 8, hex('#3a3458')); R.rect(x + 5, y + 4, x + 6, y + 8, hex('#3a3458')); R.pset(x + 6, y + 3, hex('#f6e890')); R.pset(x + 2 + (k % 3), y + 7, hex('#f0c040'));
  R.rect(x + 2, y + 10, x + 7, y + 12, hex('#f2ecd8')); R.pset(x + 3, y + 11, K); R.pset(x + 5, y + 11, K); };
// figurita de público de espaldas o de frente (bustos pequeños de 6 px) para gradas
const cabecita = (x, y, c, piel, t, k) => { const dy = Math.sin(t * 3 + k) > 0.92 ? -1 : 0; R.rect(x - 2, y + dy, x + 2, y + 3 + dy, piel); R.rect(x - 2, y + dy, x + 2, y + dy, c); R.rect(x - 3, y + 4, x + 3, y + 7, c); };
const PIELES = RA('#f2c49a', '#d8a070', '#a86a40', '#7a4a2a', '#f6d4b4');
const ROPA = RA('#c8303a', '#3a6ad8', '#3ac85a', '#f0c040', '#8a4ad8', '#e8e8ee', '#2a2a34', '#f08a2a');
'''

# utilidades propias de este grupo
UTIL9 = r'''
const b4 = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const ease = (u) => u * u * (3 - 2 * u);
// un triángulo de reproducción genérico (blanco, con su sombra), sin insignia ni marca
const triangulo = (x, y, s, c = hex('#ffffff')) => { R.poligono([[x - s + 1, y - s + 1], [x - s + 1, y + s + 1], [x + s + 1, y + 1]], hex('#1a1a2a')); R.poligono([[x - s, y - s], [x - s, y + s], [x + s, y]], c); };
// la carpeta de papel manila que vuela (x, y el centro; a: aleteo de la tapa en px)
const carpetaV = (x, y, t, s = 1) => { x = Math.round(x); y = Math.round(y); const w = 13 * s, hh = 9 * s, ala = Math.round(Math.sin(t * 13) * 3 * s), sub = Math.abs(ala);
  R.rect(x - w, y - hh, x + w, y + hh, K); R.rect(x - w + 1, y - hh + 1, x + w - 1, y + hh - 1, hex('#c89a40'));
  R.rect(x - w, y - hh - 3 * s, x - w + 9 * s, y - hh, K); R.rect(x - w + 1, y - hh - 3 * s + 1, x - w + 9 * s - 1, y - hh, hex('#c89a40'));
  R.rect(x - w + 2, y - hh - 1, x + w - 3, y - hh + 3 * s, hex('#f4f0e4')); R.linea(x - w + 4, y - hh + 1, x + w - 6, y - hh + 1, hex('#a8a8b8'));
  R.poligono([[x - w, y + hh], [x + w, y + hh], [x + w + ala, y - hh + 3 + sub], [x - w + ala, y - hh + 3 + sub]], K);
  R.poligono([[x - w + 1, y + hh - 1], [x + w - 1, y + hh - 1], [x + w - 1 + ala, y - hh + 4 + sub], [x - w + 1 + ala, y - hh + 4 + sub]], hex('#f0c868'));
  R.linea(x - w + 1 + ala, y - hh + 4 + sub, x + w - 1 + ala, y - hh + 4 + sub, hex('#fff0b8'));
  R.linea(x - w + 1, y + hh - 1, x + w - 1, y + hh - 1, hex('#b0802c'));
  triangulo(x + Math.round(ala / 2), y + 2 + Math.round(sub / 2), 3 * s, hex('#3a2a1a')); };
// una hoja que revolotea (x, y; fase)
const hoja = (x, y, f) => { x = Math.round(x); y = Math.round(y); const g = Math.sin(f) ; const w = Math.max(1, Math.round(Math.abs(g) * 4));
  R.rect(x - w, y - 3, x + w, y + 3, hex('#8a8a9a')); R.rect(x - w + (w > 1 ? 1 : 0), y - 2, x + w - (w > 1 ? 1 : 0), y + 2, g > 0 ? hex('#f8f6ee') : hex('#d8d4c8')); if (w > 2) { R.pset(x - 1, y - 1, hex('#a0a0b0')); R.pset(x, y + 1, hex('#a0a0b0')); } };
// el átomo pequeño con su halo (cuando Atom entra en el plano)
const atomPeq = (x, y, t, e, r = 10) => { x = Math.round(x); y = Math.round(y); const rr = r * 1.75; for (let j = -Math.ceil(rr); j <= Math.ceil(rr); j++) for (let i = -Math.ceil(rr); i <= Math.ceil(rr); i++) { const gg = 1 - Math.hypot(i, j) / rr; if (gg > 0.3 && ((i + j) & 1 || gg > 0.6)) R.pset(x + i, y + j, gg > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); } R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e }); };
'''

# ─────────────────────────────────────────────────────────────── gt-filtracion ──
E['gt-filtracion'] = ('La filtración', '''// GT-FILTRACION (frase 29), 2022 → 2023, sin cartela. Cuatro planos:
// 1. hoy/records/filtracion (2022): de noche, el joven pirata entra por la izquierda y se planta junto a la mesa con
//    el móvil; teclea mientras la voz dice «a young hacker»; en «leaked» salta la sirena, la carpeta se escapa volando
//    con sus hojas y él se vuelve a mirarla con media sonrisa; el vigilante entra por la derecha con la linterna y se
//    lleva las manos a la cabeza. Corta en «and in December».
// 2. (LOCAL) la carpeta vuela sobre una ciudad de noche en diciembre: azoteas con luces de colores, nieve fina, la
//    ropa tendida, la antena que la sigue y el gato del pretil; el panel de una azotea pasa de 11 a 12 en «December» y
//    de 2022 a 2023 en «2023»; las ventanas se encienden a su paso; en «Trailer» suelta una tira de película. Corta en
//    «leaked».
// 3. (LOCAL) un mar de pantallas: la pared de móviles de una tienda de noche; en «released» se encienden en ola con el
//    triángulo de reproducción y la barra que avanza; en «It got» vibran todos. Corta en «90».
// 4. (LOCAL) el contador de cerca: una mano baja la palanca, los tambores ruedan hasta 90,000,000 en «views», el ojo de
//    buey pasa de la mañana a la noche y el reloj da la vuelta entera; en «single day» suena la campana y salta el
//    confeti.''', UTIL + UTIL9 + r'''
const at = (s) => en('filtracion', (s - 0.5) / 18.829);
const P2 = at(6.60), P3 = at(11.85), P4 = at(16.44);
// ── 1: la oficina de noche, la alarma y la carpeta que se escapa ──
const LLEGA = at(2.7), TECLEA = at(4.4), LEAK = at(5.0), MIRA = at(5.45), GUARDIA = at(5.35);
const movil = (m, t, on, rojo) => { const [mx, my] = m; R.rect(mx - 2, my - 7, mx + 2, my + 1, K); R.rect(mx - 1, my - 6, mx + 1, my, rojo ? (Math.floor(t * 6) % 2 ? hex('#ff5a5a') : hex('#a02a2a')) : on ? hex('#6ad0ff') : hex('#2a4a6a'));
  if (on && !rojo && Math.floor(t * 8) % 2) R.pset(mx, my - 4, hex('#ffffff')); };
const p1 = (t) => {
  const o = { encuadre: 'records', camara: 'filtracion', carpeta: tramo(t, LEAK + 0.05, P2 - 0.1), alarma: t > LEAK };
  const g = T.hoy(R, t, o);
  // el pirata: entra, se planta junto a la mesa y teclea en el móvil; en «leaked» se vuelve a mirar la carpeta
  const u = tramo(t, 0.2, LLEGA), x = Math.round(lerp(-18, 98, ease(u)));
  const mira = t > MIRA, sost = t > LLEGA - 0.2 && !mira;
  const a = R.actor(EL.hackerGT, x, 158, t, { dir: mira ? -1 : 1, anda: u > 0 && u < 1, sostiene: sost ? [x + 20, 133] : false, sonrisa: t > LEAK, dedo: mira && t < P2 - 0.3 });
  if (sost && a && a.mano) movil(a.mano, t, t > TECLEA - 0.6, t > LEAK);
  // el brillo del móvil en la cara mientras teclea
  if (sost && t > TECLEA - 0.6) baña(x + 6, 132, x + 22, 146, t > LEAK ? hex('#ff4a4a') : hex('#6ad0ff'), 0.25, (xx, yy) => b4(xx, yy) < 0.5 ? 1 : 0);
  // el vigilante entra por la derecha con la linterna, ve volar la carpeta y se lleva las manos a la cabeza
  const v = tramo(t, GUARDIA, GUARDIA + 0.8), gx = Math.round(lerp(328, 268, ease(v)));
  if (t > GUARDIA) {
    const ga = R.actor(EL.guardia, gx, 158, t, { dir: -1, anda: v > 0 && v < 1, sostiene: v < 1 ? [gx - 4, 140] : false, brazos: v >= 1, sorpresa: v >= 1 });
    if (v < 1 && ga && ga.mano) { const [lx, ly] = ga.mano; R.rect(lx - 4, ly - 1, lx, ly + 1, K); R.rect(lx - 3, ly, lx, ly, hex('#c8c8d0')); R.pset(lx - 4, ly, hex('#fff6c0'));
      baña(lx - 70, ly - 18, lx - 5, ly + 20, hex('#fff2c0'), 0.35, (xx, yy) => { const d = lx - 5 - xx; return d > 0 && Math.abs(yy - ly) < 2 + d * 0.22 && b4(xx, yy) < 0.6 ? 1 : 0; }); }
  }
  T.hoyDelante(R, t, o);
  // la carpeta que se escapa, más grande que la del decorado para que se lea (va encima, en su misma trayectoria)
  if (g.carpeta && g.carpeta.f > 0.02 && g.carpeta.f < 0.98) carpetaV(g.carpeta.x, g.carpeta.y, t, 1.1);
};
// ── 2: la carpeta sobre la ciudad de noche (LOCAL) ──
const CIE = RA('#0a0820', '#110f2e', '#191640', '#231e52', '#302660', '#43306e', '#5a3a78');
const VENT = []; // ventanas del término medio [x, y, k]
const fondo2 = fijo(() => {
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIE, (y / 140) * 6.2 + (h(x >> 2, y >> 2, 3) - 0.5) * 0.5, x, y));
  calma(CIE[0], CIE[1]);
  // la luna con sus mares y su halo
  R.halo(54, 36, 18, [hex('#1e1c48'), hex('#2a2858')], 0.7); R.disco(54, 36, 9, hex('#f4ecd0')); R.disco(56, 34, 8, hex('#fff8e4')); R.disco(51, 38, 2, hex('#d8ceb0')); R.disco(57, 40, 1, hex('#d8ceb0')); R.disco(55, 31, 1, hex('#e4dcc0'));
  // el término lejano: torres con ventanitas y antenas
  let x = -4, k = 0;
  while (x < 330) { const w = 10 + Math.floor(h(k, 1, 11) * 16), top = 66 + Math.floor(h(k, 2, 11) * 40); const c = k % 2 ? hex('#1c1a3c') : hex('#201e44');
    if (!(x + w > 266 && top < 50)) { R.rect(x, top, x + w, 140, c); R.rect(x, top, x + w, top, hex('#2c2a54'));
      for (let yy = top + 3; yy < 136; yy += 4) for (let xx = x + 2; xx < x + w - 1; xx += 3) if (h(xx, yy, 13) > 0.72) R.pset(xx, yy, h(xx, yy, 14) > 0.5 ? hex('#a08850') : hex('#6a6080'));
      if (h(k, 3, 11) > 0.6) R.rect(x + (w >> 1), top - 8, x + (w >> 1), top, hex('#3a3860')); }
    x += w + 1; k++; }
  // el término medio: bloques de ladrillo con cornisas, depósitos de agua y ventanas en rejilla
  const MED = [[-2, 96, 42], [42, 104, 36], [80, 92, 50], [132, 100, 30], [164, 88, 44], [210, 98, 34], [246, 106, 40], [288, 94, 36]];
  MED.forEach(([x0, top, w], i) => { const c1 = i % 2 ? hex('#2e2440') : hex('#34283e'), c2 = i % 2 ? hex('#3a2e4e') : hex('#40324a');
    for (let yy = top; yy < 146; yy++) for (let xx = x0; xx < x0 + w; xx++) R.pset(xx, yy, ((yy - top) % 4 === 0 || (xx + ((yy - top) >> 2) * 3) % 7 === 0) ? c1 : (h(xx >> 1, yy, 17) > 0.8 ? c1 : c2));
    R.rect(x0 - 1, top - 2, x0 + w, top, hex('#4a3e5c')); R.rect(x0 - 1, top - 2, x0 + w, top - 2, hex('#5e5070'));
    for (let yy = top + 5; yy < 136; yy += 9) for (let xx = x0 + 3; xx < x0 + w - 4; xx += 7) { R.rect(xx, yy, xx + 3, yy + 4, hex('#16122a')); VENT.push([xx, yy, VENT.length]); } });
  // el depósito de agua de madera sobre su torre
  { const cx = 186, b = 88; for (const dx of [-7, 7]) R.linea(cx + dx, b, cx + dx * 0.6, b - 10, hex('#2a2030')); R.rect(cx - 9, b - 26, cx + 9, b - 10, hex('#5a3a2a'));
    for (let yy = b - 25; yy < b - 10; yy++) for (let xx = cx - 8; xx <= cx + 8; xx += 3) R.pset(xx, yy, hex('#4a2e22')); R.rect(cx - 9, b - 21, cx + 9, b - 21, hex('#2a2030')); R.rect(cx - 9, b - 15, cx + 9, b - 15, hex('#2a2030'));
    R.poligono([[cx - 11, b - 26], [cx + 11, b - 26], [cx, b - 33]], hex('#3a2a2a')); }
  // el panel de leds en su azotea (la pantalla se pinta en cada fotograma)
  R.rect(92, 64, 152, 90, K); R.rect(93, 65, 151, 89, hex('#3a3a46')); for (const lx of [100, 144]) R.rect(lx, 90, lx + 1, 92, hex('#2a2a34'));
  // el pretil de ladrillo de la azotea de delante, con su albardilla
  for (let yy = 140; yy < 152; yy++) for (let xx = 0; xx < 320; xx++) { const f = (yy - 140) >> 2, off = f % 2 ? 4 : 0;
    R.pset(xx, yy, (yy - 140) % 4 === 3 || (xx + off) % 8 === 0 ? hex('#3a2228') : tono(RA('#5a2e2a', '#6a3830', '#7a4434'), 1 + (h((xx + off) >> 3, f, 21) - 0.5) * 1.6, xx, yy)); }
  R.rect(0, 137, 319, 140, hex('#8a8090')); R.rect(0, 137, 319, 137, hex('#b0a8b8')); R.rect(0, 141, 319, 141, hex('#2a1a20'));
  // el suelo de tela asfáltica con grava, charcos y la caseta de la escalera
  for (let yy = 152; yy < 180; yy++) for (let xx = 0; xx < 320; xx++) R.pset(xx, yy, tono(RA('#1e1a26', '#26222e', '#2e2a38', '#3a3646'), 1.4 + (h(xx, yy, 23) - 0.5) * 1.4 + (yy - 152) * 0.03, xx, yy));
  for (const [cx, cy, rx] of [[118, 168, 16], [214, 174, 22], [40, 176, 12]]) for (let yy = cy - 3; yy <= cy + 3; yy++) for (let xx = cx - rx; xx <= cx + rx; xx++) if (((xx - cx) / rx) ** 2 + ((yy - cy) / 3.5) ** 2 < 1) R.pset(xx, yy, b4(xx, yy) < 0.5 ? hex('#2a2850') : hex('#3a3466'));
  R.rect(262, 108, 304, 160, K); R.rect(263, 109, 303, 159, hex('#4a4250')); for (let yy = 112; yy < 159; yy += 5) R.linea(264, yy, 302, yy, hex('#3e3646')); R.rect(260, 104, 306, 108, hex('#2a2430'));
  R.rect(272, 120, 290, 159, K); R.rect(273, 121, 289, 159, hex('#2a2030'));
  // el aire acondicionado
  R.rect(14, 134, 56, 162, K); R.rect(15, 135, 55, 161, hex('#9aa0b0')); R.rect(15, 135, 55, 136, hex('#c8ccd8')); for (let yy = 140; yy < 160; yy += 2) R.linea(17, yy, 22, yy, hex('#6a7080'));
  R.disco(38, 148, 10, hex('#3a3e4a')); R.disco(38, 148, 9, hex('#22252e'));
  // los postes del tendedero y el pie de la antena
  for (const px of [86, 174]) { R.rect(px, 112, px + 1, 156, hex('#4a4450')); R.rect(px - 3, 112, px + 4, 113, hex('#4a4450')); }
  R.rect(232, 134, 234, 160, hex('#5a5a68')); R.rect(228, 158, 238, 160, hex('#3a3a46'));
  // la claraboya con luz cálida, las chimeneas de ventilación, la silla de plástico con macetas y un palé
  R.poligono([[96, 172], [150, 172], [144, 160], [102, 160]], K); R.poligono([[98, 171], [148, 171], [143, 161], [103, 161]], hex('#e8b860'));
  for (const x of [112, 124, 136]) R.linea(x, 161, x - (x - 124) * 0.15, 171, hex('#6a4a2a')); R.linea(100, 166, 146, 166, hex('#6a4a2a')); for (let x = 104; x < 142; x += 3) if (b4(x, 163) < 0.5) R.pset(x, 163, hex('#fff0c0'));
  for (const [vx, vy] of [[66, 158], [252, 168], [304, 170]]) { R.rect(vx - 2, vy - 10, vx + 2, vy, K); R.rect(vx - 1, vy - 9, vx + 1, vy, hex('#8a8a96')); R.rect(vx - 4, vy - 13, vx + 4, vy - 10, K); R.rect(vx - 3, vy - 12, vx + 3, vy - 11, hex('#a8a8b4')); }
  R.rect(184, 150, 200, 152, K); R.rect(185, 150, 199, 151, hex('#e8e8f0')); R.rect(185, 140, 187, 150, hex('#e8e8f0')); R.rect(185, 152, 186, 162, hex('#c8c8d0')); R.rect(198, 152, 199, 162, hex('#c8c8d0'));
  for (const [px, c] of [[210, '#a84a2a'], [222, '#8a5a3a']]) { R.rect(px - 4, 154, px + 4, 162, K); R.rect(px - 3, 155, px + 3, 161, hex(c)); R.disco(px, 150, 5, hex('#2a5a3a')); R.disco(px - 1, 149, 3, hex('#3a7a4a')); }
  for (let k = 0; k < 3; k++) { R.rect(30, 166 + k * 4, 72, 167 + k * 4, hex('#8a6a4a')); R.rect(30, 166 + k * 4, 72, 166 + k * 4, hex('#a8885a')); } for (const x of [32, 50, 68]) R.rect(x, 166, x + 3, 178, hex('#6a4a2a'));
});
const P2_PATH = (tt) => { const u = tramo(tt, P2 - 0.6, P3 + 0.3); return [lerp(304, 22, u), 62 - u * 20 + Math.sin(u * 6.5) * 6]; };
const p2 = (t) => {
  fondo2();
  // estrellas que titilan (fuera de la esquina de Atom y de la barra)
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 31) * 320), y = 16 + Math.floor(h(k, 2, 31) * 46); if (x > 266 && y < 50) continue; if (Math.sin(t * (1.5 + k % 3) + k * 2.1) > 0.2) R.pset(x, y, k % 5 ? hex('#c8c8f0') : hex('#ffffff')); }
  // nubes de tres tonos a tres velocidades (no llegan a la esquina de Atom)
  for (const [k, y, w, v] of [[0, 30, 30, 1.2], [1, 50, 22, 2.4], [2, 22, 18, 3.6], [3, 58, 26, 1.8]]) { const cx = ((h(k, 1, 33) * 300 + t * v) % 300) - 40; nube3(cx, y, w, [hex('#1c1a3e'), hex('#2a2652'), hex('#3c3668')]); }
  // un avión que parpadea
  { const u = ((t + 3) / 14) % 1, x = Math.round(250 - u * 230), y = 20 + Math.round(u * 6); R.pset(x, y, hex('#c8c8d8')); R.pset(x + 1, y, hex('#8a8aa0')); if (Math.floor(t * 2.5) % 2) R.pset(x - 1, y, hex('#ff4a4a')); }
  const [fx, fy] = P2_PATH(t);
  // ventanas: unas encendidas desde el principio y las demás se encienden cuando pasa la carpeta
  for (const [x, y, k] of VENT) { const base = h(k, 1, 41) > 0.62, pasa = fx < x - 6 && h(k, 2, 41) > 0.25 && t - P2 > 0.3; const on = base ? Math.sin(t * 0.3 + k) > -0.8 : pasa;
    if (!on) continue; const c = h(k, 3, 41) > 0.5 ? hex('#f8d88a') : hex('#8ad0f0'); R.rect(x, y, x + 3, y + 4, c); R.pset(x, y, mez(c, hex('#ffffff'), 0.5));
    if (pasa && h(k, 4, 41) > 0.5) { R.rect(x + 1, y + 2, x + 2, y + 4, hex('#2a2030')); R.pset(x + 1, y + 1, hex('#2a2030')); } }
  // el panel de leds: el mes (11 → 12) y el año (2022 → 2023)
  { const dic = t > at(7.73), a23 = t > at(8.01), c = hex('#ffa040'); for (let yy = 66; yy < 89; yy++) for (let xx = 94; xx < 151; xx++) R.pset(xx, yy, b4(xx, yy) < 0.25 ? hex('#2a1810') : hex('#140c08'));
    if (dic) R.numero('12', 122, 75, { centro: true, color: dic && t < at(7.73) + 0.4 && Math.floor(t * 10) % 2 ? hex('#fff0c0') : c, sombra: false });
    R.numero(a23 ? '2023' : '2022', 122, 86, { centro: true, color: a23 && t < at(8.01) + 0.4 && Math.floor(t * 10) % 2 ? hex('#fff0c0') : c, sombra: false });
    R.halo(122, 77, 30, [hex('#2a1c28'), hex('#3a2228')], 0.25); }
  // la luz roja de las antenas lejanas
  if (Math.floor(t * 1.5) % 2) { R.pset(17, 72, hex('#ff3a3a')); R.pset(203, 80, hex('#ff3a3a')); }
  // las luces de colores del pretil (diciembre), en guirnalda
  for (let x = 0; x < 320; x++) { const y = 138 - Math.round(Math.sin(((x % 40) / 40) * Math.PI) * -4) - 4; R.pset(x, y, hex('#3a3040')); if (x % 8 === 4) { const c = [hex('#ff5a5a'), hex('#5aff8a'), hex('#ffd85a'), hex('#5ab0ff')][((x >> 3) + Math.floor(t * 2)) % 4]; R.pset(x, y + 1, c); R.pset(x, y + 2, c); R.pset(x - 1, y + 1, mez(c, hex('#000000'), 0.4)); } }
  // el ventilador del aire acondicionado
  for (let k = 0; k < 3; k++) { const a = t * 9 + k * 2.094; R.linea(38, 148, Math.round(38 + Math.cos(a) * 8), Math.round(148 + Math.sin(a) * 8), hex('#8a90a0')); } R.disco(38, 148, 2, hex('#c8ccd8'));
  // el tendedero con la ropa al viento
  for (let x = 88; x < 174; x++) { const y = 114 + Math.round(Math.sin(((x - 88) / 86) * Math.PI) * 6); R.pset(x, y, hex('#c8c0b0'));
    if ([100, 118, 140, 158].some((c) => x === c)) { const i = [100, 118, 140, 158].indexOf(x), col = RA('#d84a4a', '#f0e8d8', '#4a8ad8', '#f0c040')[i], sw = Math.round(Math.sin(t * 3 + i) * 2);
      R.poligono([[x - 4, y], [x + 4, y], [x + 4 + sw, y + 9], [x - 4 + sw, y + 9]], col); R.linea(x - 4, y, x + 4, y, mez(col, hex('#000000'), 0.3)); R.pset(x - 2, y, hex('#e8e0d0')); R.pset(x + 2, y, hex('#e8e0d0')); } }
  // la antena parabólica que sigue a la carpeta
  { const ang = Math.atan2(fy - 128, fx - 233), dx = Math.cos(ang), dy = Math.sin(ang);
    R.linea(233, 136, Math.round(233 + dx * 4), Math.round(128 + dy * 4), hex('#6a6a78'));
    for (let s = -8; s <= 8; s++) { const px = Math.round(233 - dy * s - dx * Math.abs(s) * 0.35 * 0.6), py = Math.round(128 + dx * s - dy * Math.abs(s) * 0.35 * 0.6); R.rect(px - 1, py, px, py, s === -8 || s === 8 ? K : hex('#d8d8e4')); }
    R.pset(Math.round(233 + dx * 7), Math.round(128 + dy * 7), Math.floor(t * 4) % 2 ? hex('#ff4a4a') : hex('#8a2a2a')); }
  // la carpeta, sus hojas y, en «Trailer», la tira de película que se desenrolla detrás
  const tira = Math.floor(tramo(t, at(10.7), at(11.5)) * 9);
  for (let k = tira; k >= 1; k--) { const [px, py] = P2_PATH(t - k * 0.11); const x0 = Math.round(px) + 8, y0 = Math.round(py) - 5;
    R.rect(x0 - 1, y0 - 1, x0 + 11, y0 + 10, K); R.rect(x0, y0, x0 + 10, y0 + 9, hex('#2a2a34')); R.rect(x0 + 2, y0 + 2, x0 + 8, y0 + 7, k % 2 ? hex('#3a6ab8') : hex('#8a4aa8'));
    for (let i = 0; i < 11; i += 3) { R.pset(x0 + i, y0, hex('#e8e8f0')); R.pset(x0 + i, y0 + 9, hex('#e8e8f0')); } if (k % 3 === 1) triangulo(x0 + 5, y0 + 4, 2); }
  for (let k = 0; k < 4; k++) { const s = (t - P2) * 0.9 - k * 0.32; if (s < 0) continue; const [px, py] = P2_PATH(t - 0.25 - k * 0.3); hoja(px + 14 + s * 10, py + s * s * 18 + k * 3, t * 7 + k); }
  carpetaV(fx, fy, t, 1.7);
  if (tira > 0 && tira < 9) R.halo(Math.round(fx), Math.round(fy), 16, [hex('#4a4a7a'), hex('#8a8ac8')], 0.35);
  // el gato del pretil: mira a la carpeta y da un zarpazo a la hoja que le cae
  { const gx = 200, gy = 136, mira = fx < gx ? -1 : 1, zarpa = t > at(9.9) && t < at(10.5);
    R.rect(gx - 5, gy - 6, gx + 5, gy, K); R.rect(gx - 4, gy - 5, gx + 4, gy - 1, hex('#3a3440')); R.disco(gx + mira * 5, gy - 8, 3, K); R.disco(gx + mira * 5, gy - 8, 2, hex('#3a3440'));
    R.pset(gx + mira * 5 - 2, gy - 11, K); R.pset(gx + mira * 5 + 2, gy - 11, K); R.pset(gx + mira * 6, gy - 9, hex('#f0e060'));
    const cola = Math.round(Math.sin(t * 3) * 2); R.linea(gx - mira * 5, gy - 2, gx - mira * 9, gy - 6 + cola, hex('#3a3440'));
    if (zarpa) { R.linea(gx + mira * 4, gy - 4, gx + mira * 9, gy - 12, hex('#3a3440')); hoja(gx + mira * 10, gy - 14 + Math.round(tramo(t, at(9.9), at(10.5)) * 4), t * 9); } }
  // los reflejos de las luces en los charcos y dos palomas que picotean en la azotea
  for (const [cx, cy, rx] of [[214, 174, 22], [40, 176, 12]]) for (let x = cx - rx + 2; x < cx + rx - 2; x += 4) if (Math.sin(t * 2 + x) > 0) R.pset(x, cy + (x % 3) - 1, [hex('#ff5a5a'), hex('#5aff8a'), hex('#ffd85a'), hex('#5ab0ff')][(x >> 2) % 4]);
  for (const [px, k] of [[160, 0], [172, 1]]) { const pic = Math.sin(t * 5 + k * 2) > 0.6, x = px + Math.round(Math.sin(t * 0.5 + k * 3) * 5), y = 170; R.rect(x - 2, y - 3, x + 2, y - 1, hex('#7a7a8a')); R.pset(x + 2, y - (pic ? 2 : 4), hex('#9a9aaa')); R.pset(x + 3, y - (pic ? 1 : 4), hex('#e0a040')); R.pset(x - 3, y - 2, hex('#5a5a6a')); R.pset(x, y, hex('#e0a040')); }
  // la nieve fina de diciembre
  for (let k = 0; k < 46; k++) { const x = Math.round((h(k, 1, 51) * 340 + Math.sin(t * 1.2 + k) * 6 + t * 4) % 330) - 5, y = Math.round((h(k, 2, 51) * 200 + t * (10 + (k % 3) * 5)) % 190) - 5; if (x > 272 && y < 48) continue; R.pset(x, y, k % 3 ? hex('#e8e8f8') : hex('#b8b8d8')); }
};
// ── 3: la pared de móviles de una tienda de noche (LOCAL) ──
const ROWS = [86, 126, 166], COLS = [92, 120, 148, 176, 204, 232, 260, 288];
const fondo3 = fijo(() => {
  // la pared de lamas claras y el techo oscuro con su carril de focos
  for (let y = 16; y < 180; y++) for (let x = 64; x < 320; x++) R.pset(x, y, (x - 64) % 6 === 0 ? hex('#a8b4c8') : tono(RA('#bcc8da', '#c8d4e4', '#d4dfec', '#e0e8f2'), 1.6 + (h(x >> 2, y >> 3, 61) - 0.5) * 0.6 - (y - 16) * 0.004, x, y));
  calma(hex('#d4dfec'), hex('#c8d4e4'));
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#1c1e2a', '#24263a', '#2c2e44'), 1 + (h(x >> 1, y, 62) - 0.5) * 0.5, x, y));
  R.rect(0, 14, 319, 16, hex('#3a3c50')); R.rect(0, 14, 319, 14, hex('#5a5c74'));
  for (const fx of [96, 150, 204, 252]) { R.rect(fx - 3, 16, fx + 3, 20, K); R.rect(fx - 2, 17, fx + 2, 19, hex('#4a4c60')); R.rect(fx - 2, 20, fx + 2, 21, hex('#fff6d0')); }
  // las baldas blancas con su tira de luz y las peanas inclinadas
  for (const yb of ROWS) { R.rect(70, yb, 319, yb + 3, hex('#f4f6fa')); R.rect(70, yb + 3, 319, yb + 3, hex('#9aa4b8')); R.rect(70, yb + 4, 319, yb + 5, hex('#8ad0ff'));
    for (let x = 70; x < 320; x++) if (b4(x, yb + 6) < 0.4) R.pset(x, yb + 6, hex('#b8e4ff'));
    for (const cx of COLS) { R.poligono([[cx - 8, yb], [cx + 8, yb], [cx + 6, yb - 6], [cx - 6, yb - 6]], hex('#d0d6e2')); R.linea(cx - 8, yb, cx + 8, yb, hex('#8a94a8'));
      R.rect(cx + 4, yb + 7, cx + 12, yb + 11, K); R.rect(cx + 5, yb + 8, cx + 11, yb + 10, hex('#fff8e0')); R.rect(cx + 6, yb + 9, cx + 9, yb + 9, hex('#8a8a9a')); } }
  // el escaparate a la calle de noche (la calle se pinta en cada fotograma, recortada)
  R.rect(0, 16, 66, 180, hex('#8a90a0')); R.rect(2, 22, 62, 150, K); R.rect(63, 16, 66, 180, hex('#6a7080')); R.rect(0, 150, 66, 180, hex('#5a6070')); for (let y = 154; y < 180; y += 4) R.linea(0, y, 62, y, hex('#4a5060'));
  R.rect(0, 84, 62, 86, hex('#8a90a0'));
});
const p3 = (t) => {
  fondo3();
  // la calle por el escaparate: edificios, farolas, gente que pasa y faros
  R.recorte([3, 23, 61, 149]);
  for (let y = 23; y < 150; y++) R.linea(3, y, 61, y, tono(RA('#0e0c22', '#16143a', '#201c4a'), (y - 23) / 60, 3, y));
  for (let k = 0; k < 4; k++) { const bx = 4 + k * 15, top = 40 + (k * 17) % 30; R.poligono([[bx, top], [bx + 13, top], [bx + 13, 132], [bx, 132]], hex('#2a2440')); for (let yy = top + 3; yy < 128; yy += 6) for (let xx = bx + 2; xx < bx + 12; xx += 4) if (h(xx, yy, 63) > 0.5) R.pset(xx, yy, hex('#e8c070')); }
  R.poligono([[3, 132], [61, 132], [61, 149], [3, 149]], hex('#2a2838'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k * 0.37) % 1), x = Math.round(lerp(-6, 70, k % 2 ? 1 - u : u)), y = 140, d = k % 2 ? -1 : 1; R.poligono([[x - 2, y - 9], [x + 2, y - 9], [x + 2, y], [x - 2, y]], hex('#0a0814')); R.disco(x, y - 11, 2, hex('#0a0814'));
    if ((Math.floor(t * 5) + k) % 2) { R.pset(x - 1 + d, y - 3, hex('#0a0814')); } R.pset(x + d * 2, y - 7, hex('#6ad0ff')); }
  { const u = (t * 0.5) % 1, x = Math.round(lerp(80, -30, u)); R.poligono([[x - 12, 146], [x + 12, 146], [x + 12, 140], [x - 12, 140]], hex('#c83a3a')); R.disco(x - 12, 143, 2, hex('#fff6c0')); }
  R.recorte(null);
  // el reflejo que barre el cristal
  { const u = ((t - P3) * 0.25) % 1, x0 = Math.round(-30 + u * 120); for (let y = 23; y < 150; y++) for (let s = 0; s < 6; s++) { const x = x0 + s + Math.round((150 - y) * 0.35); if (x > 2 && x < 62 && b4(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#ffffff'), 0.35)); } }
  // los focos del techo: su cono sobre la pared
  for (const fx of [96, 150, 204, 252]) baña(fx - 24, 22, fx + 24, 60, hex('#fff8e0'), 0.18, (x, y) => { const d = Math.abs(x - fx) / (2 + (y - 22) * 0.55); return d < 1 && b4(x, y) < 1 - d ? 1 : 0; });
  // los móviles: en reposo con su fondo; en «released» se encienden en ola con el triángulo y la barra; en «It got» vibran
  const SUELTA = at(13.83), VIBRA = at(15.55);
  ROWS.forEach((yb, j) => COLS.forEach((cx, i) => {
    const k = j * 8 + i, on = t > SUELTA + i * 0.07 + j * 0.05, vib = t > VIBRA + (k % 5) * 0.04 && Math.floor(t * 30 + k) % 2 ? 1 : 0, x0 = cx - 7 + vib, y0 = yb - 30;
    R.rect(x0, y0, x0 + 14, y0 + 26, K); R.rect(x0 + 1, y0 + 1, x0 + 13, y0 + 25, hex('#3a3c48')); R.rect(x0 + 6, y0 + 2, x0 + 8, y0 + 2, hex('#1a1a22'));
    const sx0 = x0 + 2, sy0 = y0 + 4, sx1 = x0 + 12, sy1 = y0 + 22;
    if (!on) { const c1 = RA('#4a6ad8', '#d84a8a', '#3ab890', '#e8a040', '#8a5ad8')[k % 5]; for (let y = sy0; y <= sy1; y++) R.linea(sx0, y, sx1, y, tono([mez(c1, K, 0.5), c1, mez(c1, hex('#ffffff'), 0.4)], (y - sy0) / 7 + Math.sin(t + k) * 0.3, sx0, y));
      R.rect(sx0 + 2, sy0 + 3, sx1 - 2, sy0 + 4, hex('#ffffff')); }
    else { for (let y = sy0; y <= sy1; y++) R.linea(sx0, y, sx1, y, tono(RA('#0e1630', '#16224a', '#1e2e62'), (y - sy0) / 7, sx0, y));
      const e = tramo(t, SUELTA + i * 0.07 + j * 0.05, SUELTA + i * 0.07 + j * 0.05 + 0.25); triangulo(x0 + 7, y0 + 12, e < 1 ? Math.round(1 + e * 2) : 3);
      const pr = Math.min(1, Math.max(0, (t - SUELTA - i * 0.07) * 0.18)); R.linea(sx0 + 1, sy1 - 2, sx1 - 1, sy1 - 2, hex('#4a5070')); R.linea(sx0 + 1, sy1 - 2, sx0 + 1 + Math.round(pr * 8), sy1 - 2, hex('#8ad0ff'));
      if (e < 1) baña(x0 - 3, y0 - 3, x0 + 17, y0 + 29, hex('#c8e4ff'), 0.4 * (1 - e), (x, y) => b4(x, y) < 0.5 ? 1 : 0); }
    R.pset(x0 + 2, y0 + 2, hex('#8a8ca0'));
    if (t > VIBRA && (k % 3 === 0)) { R.disco(x0 + 13, y0 + 1, 3, K); R.disco(x0 + 13, y0 + 1, 2, hex('#e83a4a')); R.pset(x0 + 13, y0 + 1, hex('#ffffff')); }
  }));
  // las rayas de la vibración
  if (t > VIBRA) for (const [cx, yb] of [[120, 86], [232, 126], [176, 166]]) for (const s of [-1, 1]) { const x = cx + s * 10; R.linea(x, yb - 24, x + s, yb - 20, hex('#6a7890')); R.linea(x + s * 2, yb - 18, x + s * 3, yb - 14, hex('#6a7890')); }
  // el mostrador de delante (madera clara) con una tableta que también se enciende
  madera(0, 168, 319, 179, RA('#6a4a2e', '#8a6038', '#a87a48', '#c89a62'), 6, 3); R.rect(0, 167, 319, 168, hex('#d8b480')); R.rect(0, 167, 319, 167, hex('#f0d0a0'));
  { const on = t > at(14.4); R.rect(20, 160, 50, 168, K); R.rect(21, 161, 49, 167, on ? hex('#1e2e62') : hex('#2a2c38')); if (on) triangulo(35, 164, 2); }
};
// ── 4: el contador de cerca (LOCAL) ──
const fondo4 = fijo(() => {
  // la pared de paneles acústicos azul marino (pirámides tramadas)
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const px = x % 12, py = y % 12, d = Math.min(px, py, 11 - px, 11 - py), s = (px < py) === (px < 11 - py);
    R.pset(x, y, tono(RA('#141a34', '#1c2444', '#24305a', '#2e3c6e'), 1.2 + d * 0.3 + (s ? 0.5 : -0.2) + (h(x >> 2, y >> 2, 71) - 0.5) * 0.3, x, y)); }
  calma(hex('#1c2444'), hex('#141a34'));
  for (let y = 0; y < 2; y++) R.linea(0, 128 + y, 319, 128 + y, hex('#0e1226'));
  // el ojo de buey (marco de latón con remaches) y el reloj de 24 horas (sus agujas se pintan en cada fotograma)
  R.disco(44, 40, 21, K); R.disco(44, 40, 20, hex('#b08a3a')); R.disco(44, 40, 18, hex('#d8b050')); R.disco(44, 40, 16, K); for (let a = 0; a < 6.28; a += 0.785) R.pset(Math.round(44 + Math.cos(a) * 19), Math.round(40 + Math.sin(a) * 19), hex('#fff0a0'));
  R.disco(240, 40, 17, K); R.disco(240, 40, 16, hex('#8a6a3a')); R.disco(240, 40, 14, hex('#f4ecd8'));
  for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12 - Math.PI / 2; R.pset(Math.round(240 + Math.cos(a) * 12), Math.round(40 + Math.sin(a) * 12), k % 6 ? hex('#8a8070') : K); if (k % 6 === 0) R.pset(Math.round(240 + Math.cos(a) * 11), Math.round(40 + Math.sin(a) * 11), K); }
  // la caja del contador: madera con filete de latón
  R.rect(40, 62, 280, 126, K); madera(41, 63, 279, 125, RA('#3a1e12', '#4e2a18', '#663820', '#7e4a2c'), 9, 4); R.rect(41, 63, 279, 64, hex('#d8b050')); R.rect(41, 124, 279, 125, hex('#8a6a2a'));
  R.rect(52, 72, 268, 116, K); R.rect(53, 73, 267, 115, hex('#b08a3a')); R.rect(53, 73, 267, 73, hex('#fff0a0'));
  // el escritorio de mando de delante
  madera(0, 130, 319, 179, RA('#4a2c18', '#5e3a20', '#76492a', '#8e5c36'), 10, 5); R.rect(0, 130, 319, 132, hex('#a87444')); R.rect(0, 130, 319, 130, hex('#c89a62'));
  // los relojes de aguja, los interruptores, los papeles y la taza (lo que se mueve va en cada fotograma)
  for (const [cx, cy] of [[104, 150], [136, 150]]) { R.disco(cx, cy, 10, K); R.disco(cx, cy, 9, hex('#d8d4c8')); R.disco(cx, cy, 8, hex('#f4f0e4')); for (let a = -2.6; a <= -0.5; a += 0.35) R.pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), K); }
  for (let k = 0; k < 5; k++) { const x = 162 + k * 9; R.rect(x, 144, x + 5, 156, K); R.rect(x + 1, 145, x + 4, 155, hex('#3a3a46')); }
  R.poligono([[248, 158], [300, 154], [304, 172], [252, 176]], hex('#d8d0bc')); R.poligono([[250, 157], [298, 153], [300, 168], [252, 172]], hex('#f4f0e4')); for (let k = 0; k < 4; k++) R.linea(258, 160 + k * 3, 290, 157 + k * 3, hex('#a8a8b8'));
  R.rect(20, 146, 36, 166, K); R.rect(21, 147, 35, 165, hex('#e04a4a')); R.rect(21, 147, 23, 165, hex('#f07a6a')); R.rect(36, 151, 40, 160, K); R.rect(36, 153, 38, 158, hex('#e04a4a')); R.rect(21, 147, 35, 148, hex('#4a2a1a'));
  // el pie de la palanca
  R.rect(212, 150, 232, 160, K); R.rect(213, 151, 231, 159, hex('#5a5a68')); R.rect(213, 151, 231, 152, hex('#8a8a9a'));
});
const DRUMS = (() => { const L = []; let x = 60; for (let i = 0; i < 8; i++) { L.push(x); x += 22 + 2; if (i === 1 || i === 4) x += 6; } return L; })();
const p4 = (t) => {
  fondo4();
  const DIA = at(18.81), u = tramo(t, P4, DIA);
  // el ojo de buey: un día entero (amanecer, mediodía, atardecer y noche) con el sol que cruza
  R.recorte([28, 24, 60, 56]);
  { const cs = u < 0.15 ? [hex('#f0a070'), hex('#f8c890')] : u < 0.75 ? [hex('#5aa0e8'), hex('#9ad0f8')] : u < 0.95 ? [hex('#e86a4a'), hex('#f8b060')] : [hex('#0e1030'), hex('#1e2050')];
    for (let y = 24; y <= 56; y++) for (let x = 28; x <= 60; x++) if (Math.hypot(x - 44, y - 40) <= 16) R.pset(x, y, (y - 24) / 32 + b4(x, y) * 0.3 > 0.55 ? cs[1] : cs[0]);
    const a = Math.PI * (1 - Math.min(1, u * 1.05)), sx = 44 + Math.cos(a) * 14, sy = 50 - Math.sin(a) * 14;
    if (u < 0.97) R.disco(Math.round(sx), Math.round(sy), 3, u > 0.75 ? hex('#ff8a4a') : hex('#fff4a0')); else { R.disco(48, 34, 3, hex('#f4ecd0')); R.pset(36, 32, hex('#ffffff')); R.pset(40, 46, hex('#c8c8f0')); }
    for (let x = 28; x <= 60; x++) for (let y = 50; y <= 56; y++) if (Math.hypot(x - 44, y - 40) <= 16 && y > 51 + Math.sin(x * 0.4) * 1.5) R.pset(x, y, u > 0.95 ? hex('#0a0c20') : hex('#3a7a4a')); }
  R.recorte(null);
  R.pset(38, 30, hex('#ffffff')); R.pset(37, 31, hex('#ffffff'));
  // el reloj de 24 horas: la aguja da una vuelta entera en el día
  { const a = -Math.PI / 2 + u * Math.PI * 2, m = -Math.PI / 2 + u * Math.PI * 48; R.linea(240, 40, Math.round(240 + Math.cos(m) * 11), Math.round(40 + Math.sin(m) * 11), hex('#4a4a5a')); R.linea(240, 40, Math.round(240 + Math.cos(a) * 8), Math.round(40 + Math.sin(a) * 8), K); R.pset(240, 40, hex('#c83a3a')); }
  // las bombillas del marco que corren
  for (let x = 44; x <= 276; x += 6) for (const y of [66, 121]) { const on = (Math.floor(t * 10) + x / 6) % 3 !== 0; R.pset(x, y, on ? hex('#fff0a0') : hex('#6a5020')); R.pset(x + 1, y, on ? hex('#f8c850') : hex('#4a3a18')); }
  // los tambores: ruedan hasta 90,000,000 en «views»
  const PARA = at(16.55), FIN = at(17.65), v = 90000000 * Math.pow(ease(tramo(t, PARA, FIN)), 0.6);
  DRUMS.forEach((x0, i) => { const pos = 7 - i, p = (v / Math.pow(10, pos)) % 10, d = Math.floor(p), fr = p - d, off = Math.round(fr * 30);
    R.rect(x0, 76, x0 + 21, 112, K); for (let y = 77; y < 112; y++) R.linea(x0 + 1, y, x0 + 20, y, tono(RA('#c8c4b8', '#e8e4d8', '#fbf8f0', '#e8e4d8', '#b8b4a8'), (y - 77) / 34 * 4, x0, y));
    R.recorte([x0 + 1, 77, x0 + 20, 111]);
    R.numero(String(d), x0 + 11, 102 - off, { tam: 16, centro: true }); R.numero(String((d + 1) % 10), x0 + 11, 132 - off, { tam: 16, centro: true });
    R.recorte(null);
    for (let y = 77; y < 112; y++) for (let x = x0 + 1; x <= x0 + 20; x++) { const e = Math.abs(y - 94) / 17; if (e > 0.6 && b4(x, y) < (e - 0.6) * 2) R.pset(x, y, hex('#5a5448')); }
    R.pset(x0 + 2, 79, hex('#ffffff')); });
  for (const cx of [DRUMS[1] + 25, DRUMS[4] + 25]) { R.rect(cx - 1, 104, cx + 1, 108, K); R.rect(cx, 105, cx, 107, hex('#fff0a0')); R.pset(cx - 1, 109, K); }
  // la palanca: la mano entra por abajo a la derecha, la baja y se va
  { const baja = tramo(t, at(16.5), at(16.8)), m = t < at(17.2) ? tramo(t, P4, at(16.45)) : 1 - tramo(t, at(17.2), at(17.6));
    const ang = lerp(-1.2, 0.5, ease(baja)), lx = Math.round(222 + Math.cos(ang - Math.PI / 2) * 22), ly = Math.round(152 + Math.sin(ang - Math.PI / 2) * 22);
    R.linea(222, 152, lx, ly, K); R.linea(223, 152, lx + 1, ly, hex('#b8b8c8')); R.disco(lx, ly, 3, K); R.disco(lx, ly, 2, hex('#e04a4a')); R.pset(lx - 1, ly - 1, hex('#ff9a8a'));
    if (m > 0) { const wx = Math.round(lerp(300, lx + 8, ease(m))), wy = Math.round(lerp(196, ly + 4, ease(m))); T.brazo(R, wx + 34, wy + 30, wx, wy, '#3a5a8a', -1, { codo: [wx + 22, wy + 22] }); } }
  // las ruedas dentadas de los lados que giran mientras cuenta
  const giro = t < FIN ? (t - P4) * 9 : (FIN - P4) * 9 + (t - FIN) * 0.6;
  for (const [cx, cy, r, s] of [[24, 96, 11, 1], [296, 96, 11, -1], [14, 116, 6, -1]]) { R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, hex('#a8883a')); R.disco(cx, cy, r - 3, hex('#c8a850')); R.disco(cx, cy, 2, K);
    for (let k = 0; k < 8; k++) { const a = giro * s * (11 / r) + k * Math.PI / 4; R.rect(Math.round(cx + Math.cos(a) * (r + 1)) - 1, Math.round(cy + Math.sin(a) * (r + 1)) - 1, Math.round(cx + Math.cos(a) * (r + 1)) + 1, Math.round(cy + Math.sin(a) * (r + 1)) + 1, hex('#8a6a2a')); } }
  // la cinta de papel que sale por debajo y se enrosca en la mesa
  { const l = Math.min(30, Math.max(0, (t - PARA) * 22)); for (let s = 0; s <= l; s++) { const x = 150 + Math.round(Math.sin(s * 0.25) * 3 + s * 0.5), y = 126 + Math.round(s * 0.7); R.rect(x, y, x + 4, y, hex('#f4f0e4')); if (s % 3 === 0) R.pset(x + 2, y, hex('#8a8aa0')); } }
  // las agujas de los relojes de la mesa, los pilotos y el vapor de la taza
  for (const [cx, cy, k] of [[104, 150, 0], [136, 150, 1]]) { const a = -2.6 + Math.min(1, tramo(t, PARA, FIN) + Math.sin(t * 9 + k) * 0.05) * 2.1; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), hex('#c83a3a')); R.pset(cx, cy, K); }
  for (let k = 0; k < 5; k++) { const on = t > PARA && (Math.floor(t * 6) + k) % 2; R.rect(163 + k * 9, on ? 146 : 151, 166 + k * 9, on ? 149 : 154, hex('#d8d8e4')); R.pset(164 + k * 9, 142, on ? hex('#4ae06a') : hex('#1a4a2a')); }
  for (let k = 0; k < 6; k++) { const s = (t * 0.6 + k / 6) % 1, x = 28 + Math.round(Math.sin(s * 7 + k) * 2), y = 144 - Math.round(s * 18); if (b4(x, y) < 0.8 - s * 0.7) R.pset(x, y, hex('#e8e8f0')); }
  // en «single day»: la campana de arriba suena y salta el confeti
  { const tin = t > DIA - 0.1, sw = tin ? Math.round(Math.sin(t * 30) * 2 * Math.max(0, 1 - (t - DIA) * 0.8)) : 0;
    R.rect(158, 56, 162, 62, K); R.poligono([[152 + sw, 58], [168 + sw, 58], [164 + sw, 46], [156 + sw, 46]], K); R.poligono([[153 + sw, 57], [167 + sw, 57], [163 + sw, 47], [157 + sw, 47]], hex('#e8b840')); R.rect(157 + sw, 48, 158 + sw, 55, hex('#fff0a0'));
    if (tin) { for (const s of [-1, 1]) for (let k = 0; k < 3; k++) R.pset(160 + s * (14 + k * 3), 50 + k * 2 - Math.round(Math.sin(t * 20) * 1), hex('#fff6c0'));
      for (let k = 0; k < 30; k++) { const e = t - DIA, side = k % 2 ? 1 : -1, vx = side * (20 + h(k, 1, 81) * 50), vy = -50 - h(k, 2, 81) * 40, x = Math.round((side > 0 ? 270 : 50) + vx * e), y = Math.round(70 + vy * e + 60 * e * e);
        if (x > 266 && y < 48) continue; R.rect(x, y, x + 1, y, RA('#ff5a6a', '#ffd84a', '#5ae08a', '#5ab0ff', '#f0f0f0')[k % 5]); } } }
};
const efectos = [[TECLEA, 'tecleo'], [LEAK, 'aviso'], [LEAK + 0.25, 'papel'], [GUARDIA + 0.85, 'pop'],
  [P2 + 0.5, 'whoosh'], [at(8.03), 'bip'], [at(9.95), 'miau'], [at(11.35), 'brillo'],
  [at(13.85), 'brillo'], [at(15.6), 'zumbido'],
  [at(16.5), 'interruptor'], [at(16.6), 'maquina'], [at(18.85), 'campana']];
const año = (t) => t < at(8.01) ? 2022 : 2023;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────── gt-semana ──
E['gt-semana'] = ('Toda la historia', '''// GT-SEMANA (frase 30), 2026, sin cartela. Tres planos:
// 1. dundee/ciudad (2026, con la columna de los bichitos de bronce): una turista llega por el paseo y saca una foto a
//    las estatuas en «GTA» (flash); un niño llega corriendo y las señala en «story»; en «almost didn't exist» una
//    gaviota se posa en lo alto de la columna y el niño se ríe; un corredor cruza. Corta en «An idea».
// 2. (LOCAL) repaso en una vitrina de museo de noche: el botón rojo, la caja del juego, el periódico, el coche de
//    policía y el bichito, cada uno con su placa de año. En «boring» el bichito salta sobre el botón y sale una nube
//    gris de aburrimiento; en «chase» se enciende el coche y en «crazy» se vuelve loco por la balda; el periódico
//    echa humo; en «tiny creatures» el bichito abre el paraguas y baja flotando a la balda de abajo. Corta en «and
//    after».
// 3. hoy/espera: la cola ante la tienda al anochecer; la persiana baja un poco en «two» y otra vez en «delays» (la
//    cola se entristece); sale el dependiente con un calendario grande y lo levanta con el 19 rodeado en «November
//    19»; en «2026» la cola salta.''', UTIL + UTIL9 + r'''
const at = (s) => en('semana', (s - 0.9) / 18.042);
const P2 = at(6.66), P3 = at(13.42);
// ── 1: Dundee hoy, las estatuas ──
const FOTO = at(2.42), SEÑALA = at(4.06), CASI = at(5.12);
const p1 = (t) => {
  const o = { año: 2026, lluvia: 0.15, estatuas: true };
  T.dundee(R, t, o);
  // la gaviota que llega volando y se posa en lo alto de la columna en «almost didn't exist»
  { const u = tramo(t, CASI - 0.9, CASI + 0.1), x = Math.round(lerp(120, 253, ease(u))), y = Math.round(lerp(40, 72, ease(u)) - Math.sin(u * Math.PI) * 8), ala = u < 1 ? Math.sin(t * 16) > 0 : false;
    if (t > CASI - 0.9) { R.rect(x - 2, y - 2, x + 2, y, hex('#f0f0f4')); R.pset(x + 3, y - 2, hex('#f0f0f4')); R.pset(x + 4, y - 2, hex('#f0a020')); R.pset(x - 3, y - 1, hex('#8a8a96'));
      if (u < 1) { R.linea(x - 1, y - 2, x - 5, y - (ala ? 6 : 0), hex('#c8c8d0')); R.linea(x + 1, y - 2, x + 4, y - (ala ? 6 : 0), hex('#c8c8d0')); } else { R.pset(x - 1, y + 1, hex('#f0a020')); R.pset(x + 1, y + 1, hex('#f0a020')); if (Math.sin(t * 3) > 0.7) R.pset(x + 4, y - 3, hex('#f0a020')); } } }
  // el corredor que cruza por detrás (de derecha a izquierda)
  { const u = tramo(t, 0.3, P2 - 0.3), x = Math.round(lerp(330, -24, u)); if (u > 0 && u < 1) R.actor(EL.sudadera, x, 154, t * 1.6, { dir: -1, anda: true }); }
  // la turista: llega, se para, levanta el móvil y saca la foto en «GTA»
  const u1 = tramo(t, 0.1, FOTO - 0.5), x1 = Math.round(lerp(-18, 176, ease(u1))), alza = t > FOTO - 0.6;
  const a1 = R.actor(EL.chicaHoy, x1, 156, t, { dir: 1, anda: u1 > 0 && u1 < 1, sostiene: alza ? [x1 + 21, 128] : false, sonrisa: t > CASI + 0.2, sorpresa: t > CASI - 0.2 && t < CASI + 0.2 });
  if (alza && a1 && a1.mano) { const [mx, my] = a1.mano; R.rect(mx - 2, my - 7, mx + 2, my + 1, K); R.rect(mx - 1, my - 6, mx + 1, my, hex('#3a4a6a')); R.pset(mx + 1, my - 6, hex('#fff6c0'));
    if (t > FOTO && t < FOTO + 0.25) { const e = tramo(t, FOTO, FOTO + 0.25); R.halo(mx + 2, my - 4, 18 - e * 8, [hex('#fff6c0'), hex('#ffffff')], 0.9 - e * 0.6); baña(236, 72, 270, 148, hex('#ffffff'), 0.5 * (1 - e), (x, y) => b4(x, y) < 0.6 ? 1 : 0); } }
  // el niño: llega corriendo, señala a los bichitos de bronce en «story», salta y se ríe de la gaviota
  const u2 = tramo(t, 0.9, SEÑALA - 0.6), x2 = Math.round(lerp(-18, 212, ease(u2)));
  const salta = t > SEÑALA && t < SEÑALA + 0.5 ? Math.round(Math.sin(tramo(t, SEÑALA, SEÑALA + 0.5) * Math.PI) * 5) : t > CASI + 0.3 && t < CASI + 0.8 ? Math.round(Math.sin(tramo(t, CASI + 0.3, CASI + 0.8) * Math.PI) * 4) : 0;
  R.actor(EL.chico, x2, 156, t, { dir: 1, anda: u2 > 0 && u2 < 1, dedo: t > SEÑALA - 0.2 && t < CASI, salto: salta, sonrisa: t > CASI + 0.2, habla: t > SEÑALA && t < SEÑALA + 0.8 });
  if (t > SEÑALA && t < SEÑALA + 1.2) R.icono('!', x2 + 12, 112 - salta, hex('#ffe890'), K, 2);
  T.dundeeDelante(R, t, o);
};
// ── 2: la vitrina del repaso (LOCAL) ──
const fondo2 = fijo(() => {
  // la pared de la sala, añil con paneles, y el suelo de madera oscura que refleja
  for (let y = 0; y < 166; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 40 === 0) ? hex('#1a1638') : tono(RA('#1c1a40', '#24204c', '#2c2858', '#363064'), 1.4 + (h(x >> 2, y >> 2, 91) - 0.5) * 0.7 + Math.sin(x * 0.08) * 0.2, x, y));
  calma(hex('#24204c'), hex('#1c1a40'));
  madera(0, 166, 319, 179, RA('#2a1a12', '#3a2418', '#4a2e1e', '#5a3a26'), 5, 9);
  // los cuadros pequeños de los lados (sin letras): un mapa con chincheta y una foto de la oficina de noche
  R.rect(4, 52, 26, 80, K); R.rect(5, 53, 25, 79, hex('#c8a050')); R.rect(7, 55, 23, 77, hex('#e8dcb8')); R.linea(8, 70, 22, 60, hex('#6a8ab8')); R.linea(8, 64, 18, 74, hex('#8a6a4a')); R.disco(15, 63, 1, hex('#e04a4a'));
  R.rect(4, 96, 26, 124, K); R.rect(5, 97, 25, 123, hex('#8a6a3a')); R.rect(7, 99, 23, 121, hex('#1e2440')); R.rect(9, 108, 21, 121, hex('#3a3a4a')); for (const [wx, wy] of [[11, 111], [15, 111], [19, 111], [11, 116], [17, 116]]) R.pset(wx, wy, hex('#f8d88a'));
  // a la derecha: el aplique de pared, una palmera de interior en su maceta y el atril con los dos iconos
  R.rect(286, 78, 296, 86, K); R.rect(287, 79, 295, 85, hex('#c89a40')); R.poligono([[284, 78], [298, 78], [294, 72], [288, 72]], hex('#f8e0a0'));
  for (const [a, l] of [[-2.6, 18], [-2.1, 22], [-1.6, 20], [-1.1, 22], [-0.6, 18], [-2.9, 14], [-0.3, 14]]) for (let s = 0; s < l; s++) { const x = Math.round(300 + Math.cos(a) * s), y = Math.round(140 + Math.sin(a) * s + (s / l) ** 2 * 8); R.pset(x, y, s > l * 0.6 ? hex('#4a9a4a') : hex('#2a6a3a')); R.pset(x, y + 1, hex('#1a4a2a')); }
  R.rect(298, 140, 301, 152, hex('#6a4a2a')); R.poligono([[290, 152], [310, 152], [307, 166], [293, 166]], K); R.poligono([[291, 153], [309, 153], [306, 165], [294, 165]], hex('#b8603a')); R.rect(291, 153, 309, 154, hex('#d8805a'));
  R.rect(270, 124, 284, 166, K); R.rect(271, 125, 283, 165, hex('#3a2a20')); R.poligono([[266, 112], [288, 108], [288, 124], [266, 126]], K); R.poligono([[267, 113], [287, 109], [287, 123], [267, 125]], hex('#e8dcc0'));
  R.icono('bichito', 269, 113, hex('#e88a2a'), hex('#a89878')); R.icono('coche', 278, 112, hex('#d83a3a'), hex('#a89878'));
  // la vitrina: marco de nogal, cornisa con el carril de focos, terciopelo rojo dentro y baldas de cristal
  R.rect(30, 20, 262, 166, K); madera(31, 21, 261, 165, RA('#3a2014', '#4e2c1a', '#663a22', '#7e4c2c'), 8, 10);
  R.rect(28, 18, 264, 28, K); R.rect(29, 19, 263, 27, hex('#5a3420')); R.rect(29, 19, 263, 20, hex('#a8744a')); R.rect(29, 26, 263, 27, hex('#3a2014'));
  for (let y = 32; y < 152; y++) for (let x = 38; x < 255; x++) R.pset(x, y, tono(RA('#3a0c14', '#4e121c', '#641a24', '#7a222e'), 1.2 + (h(x >> 1, y >> 1, 93) - 0.5) * 0.8 + Math.sin(x * 0.5 + y * 0.1) * 0.15, x, y));
  for (let x = 38; x < 255; x++) { R.pset(x, 32, hex('#1e0408')); R.pset(x, 33, hex('#2a060c')); }
  // la balda de cristal de arriba (y 96) y la base de abajo (y 152), con sus placas de latón
  R.rect(38, 96, 254, 97, hex('#a8e0f0')); R.rect(38, 98, 254, 99, hex('#5a8a9a')); for (let x = 38; x < 255; x++) if (b4(x, 100) < 0.4) R.pset(x, 100, hex('#2a0a10'));
  R.rect(38, 152, 254, 158, K); madera(38, 153, 254, 165, RA('#4e2c1a', '#663a22', '#7e4c2c', '#9a6038'), 6, 11); R.rect(38, 152, 254, 152, hex('#c88a5a'));
  const placa = (cx, y, n) => { R.rect(cx - 17, y, cx + 17, y + 9, K); R.rect(cx - 16, y + 1, cx + 16, y + 8, hex('#c8a040')); R.rect(cx - 16, y + 1, cx + 16, y + 1, hex('#fff0a0')); R.numero(String(n), cx, y + 8, { centro: true, color: hex('#3a2410'), sombra: false }); };
  placa(78, 101, 1995); placa(150, 101, 1997); placa(222, 101, 1997); placa(100, 156, 1996); placa(206, 156, 1991);
  // los postes del cordón de terciopelo, delante
  for (const px of [12, 296]) { R.rect(px - 1, 140, px + 1, 176, K); R.rect(px, 141, px, 175, hex('#e8b840')); R.disco(px, 139, 3, K); R.disco(px, 139, 2, hex('#f8d060')); R.rect(px - 5, 176, px + 5, 179, K); R.rect(px - 4, 176, px + 4, 178, hex('#c89a30')); }
});
const FOCOS = [[78, 0], [150, 1], [222, 2], [100, 3], [206, 4]];
const BOR = at(7.60), CHASE = at(8.40), LOCO = at(9.22), BICHO = at(11.94), CAE = at(12.9);
const p2 = (t) => {
  fondo2();
  // los focos del carril: se encienden cuando la voz nombra lo suyo
  const enc = [t > BOR - 0.15, true, t > LOCO + 0.3, t > CHASE - 0.1, t > BICHO - 0.2];
  FOCOS.forEach(([fx, k]) => { const x = fx; R.rect(x - 3, 28, x + 3, 33, K); R.rect(x - 2, 29, x + 2, 32, hex('#3a3a46')); R.rect(x - 2, 33, x + 2, 34, enc[k] ? hex('#fff6c0') : hex('#5a5040'));
    if (enc[k]) { const y1 = k >= 3 ? 150 : 95; baña(x - 34, 35, x + 34, y1, hex('#fff2c8'), k === 1 ? 0.16 : 0.22, (xx, yy) => { const d = Math.abs(xx - x) / (3 + (yy - 35) * 0.42); return d < 1 && b4(xx, yy) < 1.1 - d ? 1 : 0; });
      for (let m = 0; m < 4; m++) { const u = (t * 0.15 + m / 4 + k * 0.13) % 1, mx = x + Math.round(Math.sin(u * 6 + m) * 10), my = 40 + Math.round(u * (y1 - 46)); R.pset(mx, my, hex('#fff6e0')); } } });
  // el botón rojo: el bichito salta encima en «boring» y lo hunde; sale una nube gris de aburrimiento
  const pulsa = tramo(t, BOR - 0.05, BOR + 0.1) * (t < BICHO - 0.3 ? 1 : 1 - tramo(t, BICHO - 0.3, BICHO));
  T.PIEZAS_GT.botonRojo(R, 78, 95, { pulsado: pulsa, s: 2 });
  if (t > BOR && t < CHASE + 0.4) { const e = tramo(t, BOR, CHASE + 0.4); for (const [dx, dy, r] of [[-8, 0, 5], [0, -3, 6], [8, 0, 5]]) R.disco(Math.round(52 + dx), Math.round(62 + dy - e * 8), Math.round(r * (0.5 + e * 0.5)), hex('#8a8a96'));
    for (const [dx, dy, r] of [[-8, -1, 4], [0, -4, 5], [8, -1, 4]]) R.disco(Math.round(52 + dx), Math.round(62 + dy - e * 8), Math.round(r * (0.5 + e * 0.5)), hex('#b0b0bc'));
    for (let k = 0; k < 3; k++) R.pset(46 + k * 6, Math.round(62 - e * 8), hex('#5a5a66')); }
  // la caja del juego, en el centro, con su brillo que pasa
  T.PIEZAS_GT.cajaJuego(R, 150, 95, { s: 2, color: '#e0a030' });
  { const u = ((t - P2) * 0.4) % 1.6; if (u < 1) for (let y = 40; y < 95; y++) { const x = Math.round(130 + u * 50 + (95 - y) * 0.3); for (const dx of [0, 1, 3]) if (x + dx > 129 && x + dx < 171) R.pset(x + dx, y, mez(R.pget(x + dx, y), hex('#ffffff'), 0.35)); } }
  // el periódico, que echa humo de indignación cuando el coche se vuelve loco
  T.PIEZAS_GT.periodico(R, 222, 95, { s: 2, humo: 0.5 * tramo(t, LOCO + 0.3, LOCO + 1.5), t });
  // el bichito: espera junto al botón, salta encima en «boring» y en «tiny creatures» abre el paraguas y baja flotando
  { let x, y, par = false, anda = false;
    const salto = tramo(t, BOR - 0.45, BOR - 0.05);
    if (t < BOR - 0.45) { x = 114; y = 95; anda = Math.sin(t * 2) > 0.5; }
    else if (t < BICHO) { x = Math.round(lerp(114, 80, ease(salto))); y = Math.round(lerp(95, 68, salto) - Math.sin(salto * Math.PI) * 14 + (t > BOR ? pulsa * 6 : 0)); }
    else if (t < BICHO + 0.3) { const b = tramo(t, BICHO - 0.15, BICHO + 0.15); x = Math.round(lerp(80, 110, b)); y = Math.round(lerp(74, 95, b) - Math.sin(b * Math.PI) * 10); }
    else { const c = tramo(t, BICHO + 0.35, CAE); par = true; x = Math.round(lerp(110, 198, ease(c)) + Math.sin(t * 3) * 2 * (1 - c)); y = Math.round(lerp(95, 150, c)); anda = c >= 1 && t < CAE + 1; if (c >= 1) x = Math.round(198 + Math.min(14, (t - CAE) * 10)); }
    if (t > BICHO + 0.25 && t < BICHO + 0.6) R.halo(x, y - 30, 14, [hex('#f8e0a0'), hex('#fff6d0')], 0.5);
    T.PIEZAS_GT.bichito(R, x, y, { s: 2, anda, paraguas: par && t < CAE + 0.2, t }); }
  // el coche de policía: se enciende en «chase» y en «crazy» se vuelve loco por la balda de abajo, con humo
  { const loco = tramo(t, LOCO, LOCO + 0.2) * (1 - tramo(t, BICHO - 0.5, BICHO + 0.2)), s = (t - LOCO);
    const x = Math.round(104 + (loco > 0 ? Math.sin(s * 4.5) * 32 * loco : 0)), dir = loco > 0 && Math.cos(s * 4.5) < 0 ? -1 : 1, bote = loco > 0 ? Math.round(Math.abs(Math.sin(s * 14)) * 2 * loco) : 0;
    if (loco > 0) for (let k = 1; k <= 4; k++) { const xs = Math.round(104 + Math.sin((s - k * 0.06) * 4.5) * 32 * loco) - dir * 30; R.disco(xs, 147 - k, 1 + k * 0.6, mez(hex('#d8d8e0'), hex('#6a6a7a'), k / 5)); }
    T.PIEZAS_GT.cochePolicia(R, x, 151 - bote, { s: 2, dir, t: t > CHASE ? t : null });
    if (t > CHASE) { const c = Math.floor(t * 6) % 2 ? hex('#ff4a4a') : hex('#4a7aff'); baña(x - 40, 110, x + 40, 150, c, 0.25, (xx, yy) => { const d = Math.hypot((xx - x) / 40, (yy - 124) / 22); return d < 1 && b4(xx, yy) < 1 - d ? 1 : 0; }); }
    if (loco > 0.5 && t < BICHO - 0.5) R.icono('!', x - 2, 104 - bote, hex('#ffe890'), K, 2); }
  // el cristal de la vitrina: dos reflejos que se deslizan y una visita que pasa reflejada
  for (const [k, w] of [[0, 5], [1, 2]]) { const x0 = Math.round(((t * 9 + k * 120) % 300) - 40); for (let y = 30; y < 152; y++) for (let s = 0; s < w; s++) { const x = x0 + s + Math.round((152 - y) * 0.5); if (x > 37 && x < 255 && b4(x, y) < 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#e8f4ff'), 0.3)); } }
  { const u = ((t - P2) / 6.5), x = Math.round(lerp(250, 40, u)); for (let y = 108; y < 150; y++) for (let xx = x - 5; xx <= x + 5; xx++) if (xx > 37 && xx < 255 && Math.abs(xx - x) < (y < 116 ? 3 : 5) && b4(xx, y) < 0.25) R.pset(xx, y, mez(R.pget(xx, y), hex('#8a8ab0'), 0.4)); }
  // el cordón de terciopelo que se mece, delante
  for (let x = 12; x <= 296; x++) { const y = 142 + Math.round(Math.sin(((x - 12) / 284) * Math.PI) * 14 + Math.sin(t * 1.5) * Math.sin(((x - 12) / 284) * Math.PI) * 1.5); R.pset(x, y, hex('#a8202c')); R.pset(x, y + 1, hex('#6a1018')); }
};
// ── 3: la tienda que espera (hoy/espera) ──
const DOS = at(13.72), RETRASOS = at(13.94), SALE = at(15.3), NOV = at(16.63), DIEZ9 = at(16.91), AÑO = at(17.87);
const calGrande = (x, y, t) => { x = Math.round(x) - 22; y = Math.round(y) - 40; R.rect(x, y, x + 44, y + 40, K); R.rect(x + 1, y + 1, x + 43, y + 39, hex('#fbf8f0')); R.rect(x + 1, y + 1, x + 43, y + 8, hex('#d8303a')); R.rect(x + 1, y + 8, x + 43, y + 8, hex('#a01e28'));
  for (const rx of [x + 10, x + 33]) { R.rect(rx, y - 2, rx + 1, y + 3, hex('#8a8a96')); }
  R.numero('19', x + 23, y + 28, { tam: 16, centro: true, color: hex('#1c1c2a'), sombra: false });
  const lat = t > DIEZ9 ? 1 + 0.5 * Math.sin(t * 8) : 0; if (t > DIEZ9 - 0.1) for (let a = 0; a < 6.28; a += 0.06) { const px = Math.round(x + 22 + Math.cos(a) * (20 + lat)), py = Math.round(y + 21 + Math.sin(a) * (10 + lat * 0.6)); R.pset(px, py, hex('#e83a3a')); R.pset(px, py + 1, hex('#b02a2a')); }
  for (let j = 0; j < 2; j++) for (let i = 0; i < 7; i++) R.pset(x + 7 + i * 5, y + 34 + j * 3, hex('#8a8a96')); };
const p3 = (t) => {
  const baja = (a, b, v0, v1) => { const u = tramo(t, a, a + 0.18); return u > 0 ? lerp(v0, v1, u) + (u >= 1 ? Math.max(0, 1 - (t - a - 0.18) * 6) * Math.sin((t - a) * 40) * 0.01 : 0) : v0; };
  const ps = t < RETRASOS ? baja(DOS, 0, 0.30, 0.39) : baja(RETRASOS, 0, 0.39, 0.47);
  const o = { encuadre: 'espera', persiana: ps };
  const g = T.hoy(R, t, o);
  // la cola: charlan, se entristecen con cada bajada de persiana, se asombran cuando sale el dependiente y saltan en «2026»
  const COLA = [[EL.comprador1GT, 116], [EL.comprador2GT, 94], [EL.chica, 72], [EL.senor30, 50], [EL.aficionado2005, 28]];
  COLA.forEach(([d, x], k) => { const triste = t > DOS + 0.1 && t < SALE + 0.2, asombro = t > SALE + 0.2 && t < DIEZ9, fiesta = t > AÑO;
    const sal = fiesta ? Math.max(0, Math.round(Math.sin((t - AÑO - k * 0.1) * 9) * 4)) : 0;
    R.actor(d, x, 158, t, { dir: 1, habla: t < DOS && Math.sin(t * 3 + k * 1.7) > 0.5, triste, sorpresa: asombro, sonrisa: t > DIEZ9 + 0.1, salto: sal, brazos: fiesta && k % 2 === 0, dedo: t > DIEZ9 && t < AÑO && k === 0 }); });
  // el dependiente sale por la puerta con el calendario grande y lo levanta en «November 19»
  if (t > SALE) { const u = tramo(t, SALE, NOV - 0.2), x = Math.round(lerp(152, 180, ease(u))), alto = Math.round(lerp(128, 112, ease(tramo(t, NOV - 0.2, NOV + 0.2))));
    const a = R.actor(EL.dependienteGT, x, 158, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [x - 8, alto], sonrisa: t > DIEZ9 });
    if (a && a.mano) calGrande(a.mano[0] - 6, a.mano[1] + 1, t); }
  T.hoyDelante(R, t, o);
};
const efectos = [[FOTO, 'flash'], [SEÑALA, 'boing'],
  [BOR, 'toc'], [LOCO, 'claxon'], [LOCO + 0.6, 'vapor'], [BICHO + 0.35, 'pop'],
  [DOS, 'cerrojo'], [RETRASOS, 'cerrojo'], [SALE, 'puerta'], [DIEZ9, 'campana'], [AÑO + 0.1, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────── gt-cierre ──
E['gt-cierre'] = ('Cierre', '''// GT-CIERRE (frase 31), 2026, sin cartela. Dos planos:
// 1. hoy/estudio (2.ª vez): Atom flota en el estudio; en «comments» suben tres bocadillos de comentario (un coche, un
//    bichito, una interrogación); en «video game story» brillan los juegos de la estantería; en «tell?» sale una «?»
//    grande y Atom gira; al final se lanza hacia la mesa. Corta en «Meanwhile».
// 2. hoy/estudio/mesa (gag 8, 2.ª vez): Atom cae en su coche de juguete y persigue al coche de policía; lo adelanta
//    por dentro y, en «escape», el de policía se pone a perseguirle a él, pegado a su parachoques («won't leave me
//    alone»: «!» y gotas de sudor); al final Atom salta del coche y vuelve volando a su esquina, y el de policía
//    sigue persiguiendo al coche vacío.''', UTIL + UTIL9 + r'''
R.companero = () => {};   // Atom está en el plano: la esquina queda tranquila hasta que vuelve
const at = (s) => en('cierre', (s - 0.5) / 9.785);
const P2 = at(5.22);
// ── 1: el estudio ──
const COM = at(1.38), JUEGOS = at(2.28), TELL = at(4.52), VA = at(4.75);
const bocadillo = (x, y, ic, e) => { x = Math.round(x); y = Math.round(y); const w = Math.round(12 * e), hh = Math.round(9 * e); if (w < 3) return;
  R.rect(x - w - 1, y - hh - 1, x + w + 1, y + hh + 1, K); R.rect(x - w, y - hh, x + w, y + hh, hex('#f8f8fc')); R.rect(x - w, y + hh - 1, x + w, y + hh, hex('#d0d4e0')); R.rect(x - w, y - hh, x + w, y - hh, hex('#ffffff'));
  R.poligono([[x + w - 6, y + hh], [x + w - 1, y + hh], [x + w + 3, y + hh + 5]], K); R.poligono([[x + w - 5, y + hh], [x + w - 2, y + hh], [x + w + 1, y + hh + 3]], hex('#f8f8fc'));
  if (e > 0.9) R.icono(ic, x - 7, y - 6, ic === '?' ? hex('#3a6ad8') : ic === 'coche' ? hex('#d83a3a') : hex('#e88a2a'), hex('#c8ccd8'), 2); };
const p1 = (t) => {
  const o = { encuadre: 'estudio', coche: 'para' };
  const g = T.hoy(R, t, o);
  // los juegos de la estantería brillan uno a uno en «video game story»
  if (t > JUEGOS - 0.2) for (let k = 0; k < 7; k++) { const tk = JUEGOS - 0.2 + k * 0.16; if (t < tk) continue; const e = Math.max(0, 1 - (t - tk) * 0.9), x = 200 + (k * 23) % 62, y = 36 + ((k * 37) % 72);
    if (e > 0) { R.pset(x, y - 2, hex('#fff6c0')); R.pset(x, y + 2, hex('#fff6c0')); R.pset(x - 2, y, hex('#fff6c0')); R.pset(x + 2, y, hex('#fff6c0')); R.pset(x, y, hex('#ffffff')); if (e > 0.5) { R.pset(x, y - 3, hex('#f8d870')); R.pset(x, y + 3, hex('#f8d870')); } } }
  T.hoyDelante(R, t, o);
  // los bocadillos de comentario que suben como en una lista
  [['coche', 64, 72, 0], ['bichito', 98, 58, 0.25], ['?', 132, 72, 0.5]].forEach(([ic, x, y, d]) => { const t0 = COM + d; if (t < t0) return; const e = Math.min(1, (t - t0) * 6), sube = (t - t0) * 3 + (t > VA ? (t - VA) * 30 : 0);
    if (y - sube < 20) return; bocadillo(x, y - sube, ic, e < 1 ? e * 1.15 : 1); });
  // Atom: flota, se acerca a la estantería en «video game story», gira con la «?» en «tell?» y se lanza a la mesa
  const bob = Math.round(Math.sin(t * 2.6) * 2);
  let ax = lerp(168, 182, ease(tramo(t, JUEGOS - 0.3, JUEGOS + 0.8))), ay = 96 + bob;
  if (t > VA) { const u = tramo(t, VA, P2), e = u * u; ax = lerp(ax, 150, e); ay = lerp(ay, 150, e); }
  const gira = t > TELL - 0.3 && t < VA + 0.2;
  if (t > TELL - 0.4 && t < VA + 0.3) R.icono('?', Math.round(ax) - 7, Math.round(ay) - 46 + Math.round(Math.sin(t * 8) * 2), hex('#ffe890'), K, 3);
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const gg = 1 - Math.hypot(i, j) / 19; if (gg > 0.3 && ((i + j) & 1 || gg > 0.6)) R.pset(Math.round(ax) + i, Math.round(ay) + j, gg > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  if (gira) for (let k = 0; k < 10; k++) { const an = k * Math.PI / 5 + t * 5, rr = 19 + Math.sin(t * 9) * 2; R.pset(Math.round(ax + Math.cos(an) * rr), Math.round(ay + Math.sin(an) * rr), hex('#c8f0ff')); }
  R.atomo(Math.round(ax), Math.round(ay), t, { r: 12, orbita: R.PAL.ATOM[7], energia: gira ? 0.8 : 0.4, vel: gira ? 3 : 1 });
  if (t > VA) for (let k = 1; k <= 5; k++) { const u = Math.max(0, tramo(t - k * 0.04, VA, P2)); R.pset(Math.round(lerp(182, 150, u * u)), Math.round(lerp(96, 150, u * u)) - 2, hex('#c8f0ff')); }
};
// ── 2: la mesa de cerca: la persecución al revés (gag 8) ──
const ISLA = [[100, 134, 'casa', 0], [124, 132, 'arbol', 0], [146, 133, 'casa', 1], [172, 131, 'farola', 0], [228, 134, 'arbol', 1], [116, 147, 'arbol', 2], [138, 150, 'casa', 2], [168, 149, 'cono', 0], [222, 148, 'casa', 3], [244, 144, 'cono', 1], [192, 152, 'farola', 1]];
const CAJAS = RA('#e04a3a', '#3a7ae0', '#f0b030', '#4ab86a', '#9a5ad8', '#f07a30', '#30b0c0', '#e8e0d0');
// los juguetes de la isla, como en el decorado, para repintarlos por profundidad con el segundo coche
const juguete = (x, yb, tipo, k, t) => {
  if (tipo === 'casa') { const c = CAJAS[[0, 1, 5, 2][k]];
    R.rect(x - 7, yb - 10, x + 7, yb, K); R.rect(x - 6, yb - 9, x + 6, yb - 1, hex('#f0dcb0')); R.rect(x + 4, yb - 9, x + 6, yb - 1, hex('#d0b88a'));
    R.poligono([[x - 9, yb - 9], [x + 9, yb - 9], [x, yb - 17]], K); R.poligono([[x - 7, yb - 10], [x + 7, yb - 10], [x, yb - 16]], c); R.poligono([[x, yb - 16], [x + 7, yb - 10], [x, yb - 10]], mez(c, K, 0.3));
    R.rect(x - 4, yb - 7, x - 2, yb - 5, hex('#8ac0e0')); R.rect(x + 1, yb - 6, x + 3, yb - 1, hex('#8a5a3a')); R.pset(x - 3, yb - 7, hex('#ffffff')); }
  else if (tipo === 'arbol') { const s = Math.sin(t * 1.5 + k) * 0.6; R.rect(x - 1, yb - 6, x + 1, yb, hex('#6a4024')); R.disco(x + s, yb - 10, 6, K); R.disco(x + s, yb - 10, 5, hex('#3a9a4a')); R.disco(x - 1 + s, yb - 12, 3, hex('#6ac06a')); R.pset(x - 2 + s, yb - 13, hex('#aae09a')); }
  else if (tipo === 'farola') { R.rect(x, yb - 14, x, yb, hex('#3a3a44')); R.rect(x, yb - 14, x + 3, yb - 14, hex('#3a3a44')); R.pset(x + 3, yb - 13, Math.sin(t * 2 + k) > -0.6 ? hex('#fff2a0') : hex('#c8a040')); R.rect(x - 1, yb, x + 1, yb, K); }
  else { R.poligono([[x - 4, yb], [x + 4, yb], [x, yb - 9]], K); R.poligono([[x - 3, yb - 1], [x + 3, yb - 1], [x, yb - 8]], hex('#f07a30')); R.rect(x - 2, yb - 5, x + 2, yb - 5, hex('#ffffff')); } };
const LLEGA = at(5.62), GO = at(5.8), SALTA = at(9.95), CASA = at(11.1);
const AP0 = 2.3, AA0 = 1.62;
// la persecución, integrada paso a paso: el de policía va despacio hasta que Atom le adelanta y entonces acelera tras él
const sim = (tt) => { let ap = AP0, aa = AA0, pas = false, tp = 0; const dt = 1 / 60;
  for (let s = P2; s < tt; s += dt) { const wp = s < P2 + 0.15 ? 0 : pas ? Math.min(2.7, 0.9 + (s - tp) * 5) : 0.9;
    const wa = s < GO ? 0 : !pas ? Math.min(3.9, (s - GO) * 9) : s < SALTA ? 2.55 + Math.sin(s * 3.1) * 0.3 : 2.8;
    ap += wp * dt; aa += wa * dt; if (!pas && aa > ap + 0.5) { pas = true; tp = s; } }
  return { ap, aa, pas }; };
const pista = (a, rx, ry) => [160 + Math.cos(a) * rx, 146 + Math.sin(a) * ry];
const p2 = (t) => {
  const S = sim(t), dt0 = Math.max(0.001, t);
  const o = { encuadre: 'estudio', camara: 'mesa', coche: 'persigue', vueltas: S.ap / dt0 };
  const g = T.hoy(R, t, o);
  // el coche de Atom, por el carril de dentro
  const [cx, cy] = pista(S.aa, 92, 15), cdir = -Math.sin(S.aa) >= 0 ? 1 : -1, X = Math.round(cx), Y = Math.round(cy);
  const pc = g.coche;
  // el humo de los dos coches cuando corren
  if (t > GO) for (let k = 1; k <= 4; k++) { const [x, y] = pista(S.aa - k * 0.07, 92, 15); R.disco(Math.round(x), Math.round(y - 2), 1 + k * 0.5, mez(hex('#e0e0e8'), hex('#9a9aa6'), k / 5)); }
  if (S.pas) for (let k = 1; k <= 3; k++) { const [x, y] = pista(S.ap - k * 0.07, 105, 23); R.disco(Math.round(x), Math.round(y - 2), 1 + k * 0.5, mez(hex('#e0e0e8'), hex('#9a9aa6'), k / 4)); }
  // repintado por profundidad: los juguetes de la isla, el coche de policía y el de Atom
  const L = ISLA.map(([x, yb, tipo, k]) => [yb, () => juguete(x, yb, tipo, k, t)]);
  L.push([pc.y, () => T.PIEZAS_GT.cochePolicia(R, pc.x, pc.y, { dir: pc.dir, t })]);
  const enCoche = t > LLEGA && t < SALTA;
  L.push([Y + 0.5, () => { T.PIEZAS_GT.cocheJuguete(R, X, Y, { dir: cdir, color: '#30b0c0' }); if (enCoche) { const b = Math.round(Math.abs(Math.sin(t * 12)) * (t > GO ? 1 : 0)); atomPeq(X + cdir * 2, Y - 18 - b, t, 0.7, 7); } }]);
  L.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
  // la luz de la sirena sobre la alfombrilla cuando le persigue
  if (S.pas) { const c = Math.floor(t * 6) % 2 ? hex('#ff4a4a') : hex('#4a7aff'); baña(pc.x - 26, pc.y - 26, pc.x + 26, pc.y + 4, c, 0.3, (x, y) => { const d = Math.hypot((x - pc.x) / 26, (y - pc.y + 10) / 16); return d < 1 && b4(x, y) < 1 - d ? 1 : 0; }); }
  // el «!» y las gotas de sudor mientras el de policía no le deja en paz
  if (S.pas && enCoche) { R.icono('!', X - 2, Y - 40 + Math.round(Math.sin(t * 8)), hex('#ffe890'), K, 2); for (const s of [-1, 1]) { const u = (t * 3 + (s > 0 ? 0.5 : 0)) % 1; R.pset(Math.round(X + s * (9 + u * 4)), Math.round(Y - 22 + u * 6), hex('#8ad0ff')); R.pset(Math.round(X + s * (9 + u * 4)), Math.round(Y - 21 + u * 6), hex('#8ad0ff')); } }
  T.hoyDelante(R, t, o);
  // Atom: baja del plano de antes, cae en su coche; al final salta y vuelve volando a su esquina
  if (t < LLEGA) { const u = tramo(t, P2, LLEGA), e = u * u; atomPeq(lerp(150, X + cdir * 2, e), lerp(-10, Y - 16, e), t, 0.6, Math.round(lerp(10, 6, e))); }
  if (t > SALTA) { const u = tramo(t, SALTA, CASA), e = ease(u), [sx, sy] = pista(sim(SALTA).aa, 92, 15);
    const ax = lerp(sx, 297, e), ay = lerp(sy - 16, 24, e) - Math.sin(u * Math.PI) * 30; atomPeq(ax, ay, t, u < 1 ? 0.9 : 0.4, Math.round(lerp(6, 10, e)));
    if (u > 0 && u < 1) for (let k = 1; k <= 5; k++) { const uu = Math.max(0, u - k * 0.04), ee = ease(uu); R.pset(Math.round(lerp(sx, 297, ee)), Math.round(lerp(sy - 16, 24, ee) - Math.sin(uu * Math.PI) * 30), hex('#c8f0ff')); } }
};
const efectos = [[COM, 'pop'], [JUEGOS, 'brillo'], [TELL, 'boing'], [VA + 0.1, 'whoosh'],
  [LLEGA, 'golpecito'], [GO, 'arranque'], [at(6.6), 'whoosh'], [at(7.6), 'silbato'], [SALTA, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')
