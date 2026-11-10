E = {}

# ayudantes comunes de las tres escenas (cielos tramados, nubes de tres tonos, la pirámide de piedra, la arena, la lluvia de
# muones con cabeza clara y cola tramada); van al principio de cada cuerpo
COMUN = r'''
const C = T.C, { pset, rect, linea, disco, poligono } = R;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const tono = (P, v, x, y) => { v = Math.max(0, Math.min(P.length - 1, v)); const i = Math.floor(v); return P[Math.min(P.length - 1, i + (v - i > bay(x, y) ? 1 : 0))]; };
const mix = (a, b, u) => { u = Math.max(0, Math.min(1, u)); const f = (s) => Math.round(((a >>> s) & 255) + (((b >>> s) & 255) - ((a >>> s) & 255)) * u); return (0xff000000 | (f(16) << 16) | (f(8) << 8) | f(0)) >>> 0; };
const H = (s) => s.split(' ').map(hex);
// la zona de Atom y la barra del año se quedan tranquilas: lo que se mueve no entra ahí
const libre = (x, y) => !((x >= 274 && y <= 47) || (x >= 16 && x <= 174 && y <= 16));
const ps = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (libre(x, y)) pset(x, y, c); };
const fijo = new Map();
const capa = (k, f) => { if (!fijo.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); fijo.set(k, b); } return fijo.get(k); };
const cielo = (y0, y1, P, k = 0) => { for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(P, (y - y0) / (y1 - y0) * (P.length - 1) + (h(x >> 3, y >> 2, k) - 0.5) * 0.35, x, y)); };
// una nube de tres bultos, en tres tonos (P: sombra, medio, luz), con el fondo plano
const nube = (cx, cy, w, sem, P, dentro = null) => {
  const a = Math.round(w * 0.34);
  for (let j = -a; j <= Math.round(a * 0.45); j++) for (let i = -w; i <= w; i++) {
    const d = Math.min(Math.hypot(i / (w * 0.55), (j + a * 0.25) / (a * 0.95)), Math.hypot((i + w * 0.45) / (w * 0.5), (j - a * 0.05) / (a * 0.62)), Math.hypot((i - w * 0.42) / (w * 0.52), (j - a * 0.1) / (a * 0.58)));
    if (d > 1) continue;
    const v = (j / a) * 1.1 + d * 0.45 - 0.25 + (h((i + sem * 13) >> 1, j >> 1, sem) - 0.5) * 0.45;
    if (dentro && !dentro(Math.round(cx + i), Math.round(cy + j))) continue;
    ps(cx + i, cy + j, v > 0.4 ? P[0] : v > -0.12 ? P[1] : P[2]);
  }
};
// ¿este píxel es todavía el cielo del búfer b? (las nubes pasan por detrás de lo que hay delante)
const esCielo = (b, bc) => (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && b[y * 320 + x] === bc[y * 320 + x];
// la pirámide de piedra: hiladas de 3 px con su canto de luz y su junta, sillares escalonados, desconchones; la cara de
// la izquierda al sol y la de la derecha en sombra (arista en ar), la cima plana con el mástil (Keops)
const PL = H('#7a5a32 #a8864e #c8a86c #dec290 #f0dcac'), PS = H('#4a3420 #604430 #7a5a3a #94744c #a88a5e');
const piramide = (cx, ap, ba, half, o = {}) => {
  const L = o.luz ?? PL, S = o.sombra ?? PS, ar = o.arista ?? 0.24, pa = o.paso ?? 3;
  for (let y = ap; y <= ba; y++) {
    const wy = (y - ap) / (ba - ap), hw = wy * half, xr = cx + ar * half * wy, fila = Math.floor((ba - y) / pa), r = (ba - y) % pa;
    for (let x = Math.ceil(cx - hw); x <= Math.floor(cx + hw); x++) {
      const lit = x < xr, P = lit ? L : S;
      let v = 2.4 - wy * 0.5 + (h(x >> 2, fila, 3) - 0.5) * 0.9;
      if (r === pa - 1) v += 0.9; else if (r === 0) v -= 1.2;
      if ((x + fila * 5) % 8 === 0 && r !== pa - 1) v -= 1;
      if (h(x, y, 7) > 0.95) v -= 1.2; else if (h(x, y, 8) > 0.97) v += 1;
      if (x - (cx - hw) < 1.2 || (cx + hw) - x < 1.2) v -= 0.8;
      if (Math.abs(x - xr) < 0.8) v += lit ? 1 : -0.6;
      pset(x, y, tono(P, v, x, y));
    }
  }
  if (o.mastil !== false) { const ty = ap + 2; rect(cx - 2, ty, cx + 2, ty + 1, L[1]); linea(cx, ty - 7, cx, ty - 1, S[0]); pset(cx, ty - 8, L[4]); }
};
const AR = H('#9a7a46 #b8955a #d0ae72 #e2c488 #f0d8a6');
// arena con ondas, piedrecitas y huellas
const arena = (y0, P = AR) => {
  for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const u = (y - y0) / (180 - y0);
    let v = 1.6 + u * 1.3 + Math.sin(x * 0.09 + y * 0.8 + Math.sin(x * 0.027 + y * 0.05) * 3) * 0.55 + (h(x >> 1, y, 9) - 0.5) * 0.7;
    if (h(x, y, 21) > 0.985) v -= 1.6;
    pset(x, y, tono(P, v, x, y));
  }
};
// la lluvia de muones: rayitas que caen casi en vertical, cabeza clara, dos píxeles ámbar y cola tramada;
// o.borde: un filo oscuro a la izquierda (para que se lean sobre piedra o arena clara)
const MU = { l: hex('#fff6c8'), m: C.muon, s: hex('#c88a20'), k: hex('#3a2208') };
const muon = (x, y, n = 7, dx = 0.18, borde = false) => {
  for (let i = n - 1; i >= 0; i--) { const xx = Math.round(x - dx * i), yy = Math.round(y - i);
    if (borde && i < 3) ps(xx - 1, yy, MU.k);
    if (i === 0) ps(xx, yy, MU.l); else if (i < 3) ps(xx, yy, MU.m); else if ((xx + yy + i) & 1) ps(xx, yy, MU.s); }
};
const lluvia = (t, n, [x0, y0, x1, y1], o = {}) => {
  const alto = y1 - y0 + 24, dx = o.dx ?? 0.18;
  for (let k = 0; k < n; k++) {
    const v = (o.v ?? 150) * (0.75 + h(k, 1, 4) * 0.5), y = y0 - 8 + ((t * v + h(k, 2, 4) * 900) % alto), x = x0 + h(k, 3, 4) * (x1 - x0) + dx * (y - y0);
    if (o.filtro && !o.filtro(x, y, k)) continue;
    muon(x, y, o.n ?? 7, dx, o.borde);
  }
};
// una caja de madera con flejes (lo que se lleva en la mano: x centro, y base)
const caja = (x, y, w = 10, a = 8) => { rect(x - w / 2 - 1, y - a - 1, x + w / 2 + 1, y, C.k); rect(x - w / 2, y - a, x + w / 2, y - 1, hex('#b07a3e')); rect(x - w / 2, y - a, x + w / 2, y - a, hex('#d49a5a')); rect(x - w / 2, y - 3, x + w / 2, y - 3, hex('#6a4420')); rect(x - 1, y - a, x, y - 1, hex('#5a5a66')); };
'''

E['gz-mezcla'] = ('Lo que se mezcla', '''// GZ-MEZCLA (frase 11). Lo que mucha gente mezcla: el satélite (lo que dicen, en código de plano azul) y lo que sí se
// encontró dentro de Keops, por otro equipo y con otra técnica. Cuatro planos:
// 1. pantalla partida: la misma Keops de día dibujada dos veces; a la izquierda en plano azul con el satélite que barre,
//    a la derecha de verdad, con el equipo que llega con sus cajas; en «mix up» las dos mitades se cruzan en zigzag y
//    vuelven; en «found» se enciende una lucecita dentro de la pirámide de verdad y el técnico la señala;
// 2. (en «inside») el satélite en órbita con sus ondas; en «radar» una X roja sobre el satélite, las ondas se apagan y el
//    satélite se aleja;  3. (en «It») la calzada de Kefrén de día: el japonés, la francesa y el técnico egipcio suben con
//    las cajas de detectores; en «technique» la francesa levanta el detector, que se enciende;
// 4. (en «raining») el cielo sobre Giza desde el suelo: empieza a llover ámbar (los muones), cada vez más; un camellero y
//    dos turistas miran arriba y uno abre un paraguas que los muones atraviesan.''', COMUN + r'''
const w = (s) => en('mezcla', (s - 0.9) / 15.81);
const P2 = w(5.32), P3 = w(10.07), P4 = w(14.13);
const mixT = w(2.34), vuelve = w(3.42), found = w(4.98), equis = w(8.09), team = w(10.89), tecnica = w(12.17), cielo2 = w(15.37), siempre = w(15.67);
// ── plano 1: la pantalla partida ──
const AZ = H('#050c22 #08142e #0c1a3a #102248 #162d58'), RJ = hex('#132c56'), RJM = hex('#1c3c70'), RJC = hex('#2a568e'), CO = hex('#2a8ab6'), CI = C.planoLinea, BR = C.planoBrillo, HAL = hex('#113a62');
const CIE = H('#3a6ab0 #4a7cc0 #5a8ecc #74a4d6 #92bce0 #b4d2e8');
const fondoAzul = () => capa('azul', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let v = 2.6 - Math.hypot(x - 80, y - 100) / 150 * 2 + (h(x >> 2, y >> 2, 5) - 0.5) * 0.4;
    pset(x, y, tono(AZ, v, x, y));
    if (x % 8 === 0 || y % 8 === 0) pset(x, y, (x % 32 === 0 || y % 32 === 0) ? RJM : RJ);
  }
  // la pirámide en líneas: el contorno con su halo, las hiladas, las salas que se conocen y la base con sus cotas
  const cx = 80, ap = 46, ba = 150, hf = 70;
  for (let y = ap; y <= ba; y++) { const hw = (y - ap) / (ba - ap) * hf; if ((ba - y) % 6 === 0) linea(Math.round(cx - hw) + 2, y, Math.round(cx + hw) - 2, y, RJC); }
  for (const s of [-1, 1]) { linea(cx, ap, cx + s * hf, ba, HAL); linea(cx + s, ap + 1, cx + s * (hf + 1), ba, HAL); linea(cx, ap, cx + s * hf, ba, CI); }
  linea(cx - hf - 6, ba, cx + hf + 6, ba, CI); linea(cx, ap, cx + 18, ba, CO);
  linea(cx - 4, 132, cx + 30, 104, CO); rect(cx + 30, 100, cx + 42, 106, HAL); linea(cx + 30, 100, cx + 42, 100, CI); linea(cx + 30, 106, cx + 42, 106, CI); linea(cx + 30, 100, cx + 30, 106, CI); linea(cx + 42, 100, cx + 42, 106, CI);
  rect(cx - 6, 124, cx + 6, 129, HAL); linea(cx - 6, 124, cx + 6, 124, CI); linea(cx - 6, 129, cx + 6, 129, CI);
  linea(cx - 30, 150, cx - 4, 132, CO, 2);
  for (let x = cx - hf; x <= cx + hf; x += 10) linea(x, ba + 3, x, ba + 6, CO);
  linea(cx - hf, ba + 8, cx + hf, ba + 8, CO, 2);
  // el suelo: líneas de corte en perspectiva
  for (let k = 0; k < 7; k++) linea(80 + (k - 3) * 30, 158, 80 + (k - 3) * 70, 179, RJC);
  for (const y of [162, 168, 176]) linea(0, y, 319, y, RJC);
});
const fondoReal = () => capa('real', () => {
  cielo(0, 152, CIE, 2);
  // Kefrén lejos, en la bruma, y la reina de Keops
  piramide(176, 74, 150, 60, { luz: H('#9a8a78 #ac9a84 #bca88e #c8b498 #d4c0a2'), sombra: H('#7a6e66 #867a70 #928678 #9e9080 #a89a88'), mastil: false });
  for (let y = 70; y <= 76; y++) rect(176 - (y - 74 + 4) * 0.8, y, 176 + (y - 74 + 4) * 0.8, y, hex('#e0d2b8'));
  piramide(240, 52, 150, 74, { paso: 3 });
  piramide(304, 126, 152, 20, { mastil: false });
  arena(150);
  // la entrada de Al-Mamún y la de verdad, la escalera de los turistas
  rect(232, 112, 236, 116, hex('#3a2a1a')); rect(222, 128, 230, 134, hex('#2a1e14')); rect(223, 129, 229, 133, hex('#120c08'));
  for (let k = 0; k < 6; k++) pset(232 + k * 2, 136 + k * 2, hex('#7a5a3a'));
  // piedras caídas y la pista
  for (let k = 0; k < 9; k++) { const x = 172 + h(k, 1, 30) * 140, y = 154 + h(k, 2, 30) * 6; rect(x, y, x + 4, y + 2, hex('#a8865a')); rect(x, y, x + 4, y, hex('#e8d0a0')); rect(x, y + 2, x + 4, y + 2, hex('#6a4a2a')); }
  for (let x = 160; x < 320; x++) { const y = Math.round(166 + Math.sin(x * 0.03) * 2); if (x % 3) pset(x, y, hex('#b8955a')); }
});
const p1 = (t) => {
  const bA = fondoAzul(), bR = fondoReal();
  const amp = 70 * Math.sin(Math.PI * tramo(t, mixT - 0.15, vuelve - 0.1));
  const seam = (y) => 160 + amp * Math.sin(y * 0.11 + t * 9) + amp * 0.35 * Math.sin(y * 0.29 - t * 5);
  for (let y = 0; y < 180; y++) { const s = seam(y); for (let x = 0; x < 320; x++) pset(x, y, x < s ? bA[y * 320 + x] : bR[y * 320 + x]); }
  // la mitad azul: el barrido del holograma, el parpadeo y el satélite que barre la pirámide
  R.recorte([0, 0, 156 - Math.round(amp), 179]);
  { const sy = 20 + ((t * 28) % 160); for (let x = 0; x < 160; x++) if ((x + Math.round(sy)) % 2 === 0) pset(x, Math.round(sy), BR); for (let x = 0; x < 160; x += 2) pset(x + 1, Math.round(sy) - 2, CO); }
  const sx = 54 + Math.sin(t * 0.7) * 6, sy = 34;
  for (const s of [-1, 1]) { const x0 = sx + s * 9, x1 = sx + s * 23; rect(Math.min(x0, x1), sy - 3, Math.max(x0, x1), sy + 3, HAL); linea(x0, sy - 3, x1, sy - 3, CI); linea(x0, sy + 3, x1, sy + 3, CI); linea(x1, sy - 3, x1, sy + 3, CI); for (let k = 1; k < 4; k++) linea(x0 + s * k * 3.5, sy - 3, x0 + s * k * 3.5, sy + 3, CO); }
  rect(sx - 7, sy - 5, sx + 7, sy + 5, AZ[2]); linea(sx - 7, sy - 5, sx + 7, sy - 5, BR); linea(sx - 7, sy + 5, sx + 7, sy + 5, CI); linea(sx - 7, sy - 5, sx - 7, sy + 5, CI); linea(sx + 7, sy - 5, sx + 7, sy + 5, CI); linea(sx - 4, sy, sx + 4, sy, CO);
  linea(sx, sy + 5, sx, sy + 9, CI); disco(sx, sy + 10, 2, CO); pset(sx, sy + 10, BR);
  const ang = Math.sin(t * 1.8) * 0.35, gx = 80 + Math.sin(t * 1.8) * 46;
  for (let k = 0; k < 2; k++) { const ex = gx + (k ? 12 : -12); linea(sx, sy + 11, ex, 140, CO, 3); }
  for (let k = 0; k < 4; k++) { const u = ((t * 1.4 + k * 0.25) % 1), y = sy + 12 + u * 110, hw = 3 + u * 12, cx = sx + (gx - sx) * u; if (u < 0.95) linea(cx - hw, y, cx + hw, y, (k & 1) ? CI : CO); }
  for (let k = 0; k < 6; k++) if (Math.sin(t * 7 + k * 2.1) > 0.85) pset(20 + h(k, Math.floor(t * 3), 61) * 130, 30 + h(k, Math.floor(t * 3), 62) * 120, BR);
  R.recorte(null);
  // la mitad de verdad: nubes de tres tonos a dos velocidades, golondrinas
  R.recorte([164 + Math.round(amp), 0, 319, 179]);
  const sc = esCielo(bR, capa('realCielo', () => cielo(0, 152, CIE, 2)));
  nube(170 + ((t * 4) % 200), 32, 22, 1, H('#9cb6d4 #d6e4f0 #ffffff'), sc); nube(230 + ((t * 2.5) % 120), 66, 16, 2, H('#a2bad6 #d8e6f2 #f8fcff'), sc);
  nube(200 + ((t * 6) % 160), 96, 12, 3, H('#b0c4dc #dce8f2 #f4f8fc'), sc);
  T.bandada(R, t, { tipo: 'golondrina', n: 3, y: 74, v: 34, cada: 6 });
  // lo que se encontró dentro: una lucecita cálida que late en la piedra
  const lz = tramo(t, found - 0.2, found + 0.4);
  if (lz > 0) { const r = 3 + lz * 4 + Math.sin(t * 8) * 0.8; disco(242, 108, Math.round(r + 2), hex('#7a5428')); disco(242, 108, Math.round(r), hex('#ffd890')); disco(242, 108, Math.round(r * 0.5), C.blanco);
    for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 0.8, l = r + 4 + lz * 6 + Math.sin(t * 6 + k) * 2; linea(242 + Math.cos(a) * (r + 2), 108 + Math.sin(a) * (r + 2), 242 + Math.cos(a) * l, 108 + Math.sin(a) * l, k & 1 ? hex('#ffe8a0') : C.blanco); }
    R.anillo(242, 108, Math.round(r + 9 + Math.sin(t * 5) * 2), hex('#fff0c0'), 2); }
  R.recorte(null);
  // la costura que brilla
  for (let y = 0; y < 180; y++) { const s = Math.round(seam(y)); pset(s, y, BR); pset(s - 1, y, CO); pset(s + 1, y, hex('#f4f0e0')); }
  // el equipo que llega con sus cajas
  const u = tramo(t, 0.2, found - 0.4), anda = u > 0 && u < 1;
  const xs = [Math.round(lerp(352, 214, u)), Math.round(lerp(376, 252, u)), Math.round(lerp(398, 290, u))];
  const a = R.actor(EL.tecnicoEgipcio, xs[0], 170, t, { dir: -1, anda, dedo: t > found - 0.3, sonrisa: t > found, sostiene: t > found - 0.3 ? null : true });
  if (a && a.mano && t <= found - 0.3) caja(a.mano[0], a.mano[1] + 3);
  if (t > found - 0.3) caja(xs[0] + 8, 170, 12, 9);
  const b = R.actor(EL.cientificoJapones, xs[1], 172, t, { dir: -1, anda, sostiene: true, sorpresa: t > found + 0.2 });
  if (b && b.mano) T.PIEZAS_GZ.detectorMuones(R, b.mano[0], b.mano[1] + 6, { t, dir: -1 });
  const c = R.actor(EL.cientificaFrancesa, xs[2], 171, t, { dir: -1, anda, sostiene: true, sonrisa: t > found });
  if (c && c.mano) caja(c.mano[0], c.mano[1] + 3, 12, 7);
};
// ── plano 2: el satélite en órbita; una X roja en «radar» y se aleja ──
const equisRoja = (x, y, s) => {
  const r = Math.round(12 * s); if (r < 2) return;
  for (const [dx, dy] of [[1, 1], [1, -1]]) for (let i = -r; i <= r; i++) { const px = x + i, py = y + i * dx * dy; disco(px, py, Math.max(1, Math.round(3 * s)) + 1, C.k); }
  for (const [dx, dy] of [[1, 1], [1, -1]]) for (let i = -r; i <= r; i++) { const px = x + i, py = y + i * dx * dy; disco(px, py, Math.max(1, Math.round(3 * s)), hex('#e03a3a')); pset(px - 1, py - 1, hex('#ff8a7a')); }
};
const p2 = (t) => {
  const fuera = tramo(t, equis + 0.6, P3 - 0.2), satX = lerp(118, 40, fuera ** 1.5), satY = lerp(46, 60, fuera);
  T.hoy(R, t, { encuadre: 'orbita', ondas: tramo(t, P2 + 0.1, P2 + 0.8) * (1 - tramo(t, equis + 0.1, equis + 0.5)), satX, satY });
  const e = tramo(t, equis - 0.05, equis + 0.2), s = e < 1 ? e * 1.25 : 1 + 0.08 * Math.sin((t - equis) * 10) * Math.exp(-(t - equis) * 3);
  if (e > 0) equisRoja(Math.round(satX + 4), Math.round(satY + 2), s * 1.2);
};
// ── plano 3: la calzada: el equipo sube con sus cajas ──
const p3 = (t) => {
  const g = T.giza(R, t, { encuadre: 'meseta', camara: 'calzada', hora: 'dia' }), su = g?.suelo ?? 166;
  const u = tramo(t, P3 + 0.1, tecnica - 0.15), v = tramo(t, tecnica + 1.1, P4), anda = (u > 0 && u < 1) || (v > 0 && v < 1);
  const x0 = Math.round(lerp(-30, 24, u) + v * 40), alza = tramo(t, tecnica - 0.1, tecnica + 0.25) * (1 - tramo(t, tecnica + 0.9, tecnica + 1.2));
  const a = R.actor(EL.tecnicoEgipcio, x0 + 86, su, t, { dir: 1, anda, sostiene: true, habla: t > tecnica + 0.3 && t < tecnica + 1 && Math.sin(t * 9) > 0 });
  if (a && a.mano) caja(a.mano[0], a.mano[1] + 3, 12, 9);
  const b = R.actor(EL.cientificaFrancesa, x0 + 46, su, t, { dir: 1, anda, sostiene: [x0 + 46 + 14, su - 14 - Math.round(alza * 9)], sonrisa: alza > 0.5 });
  if (b && b.mano) T.PIEZAS_GZ.detectorMuones(R, b.mano[0] + 4, b.mano[1] + 7, { t: alza > 0.5 ? t * 2 : 0 });
  if (alza > 0.6 && b && b.mano) { const r = Math.round(10 + ((t * 20) % 8)); R.anillo(b.mano[0] + 4, b.mano[1] - 1, r, hex('#9aff9a'), 2); }
  if (alza > 0.6) for (let k = 0; k < 3; k++) if (Math.sin(t * 10 + k * 2) > 0.3) pset(x0 + 50 + k * 4, su - 30 - Math.round(alza * 9) - k, hex('#9aff9a'));
  const c = R.actor(EL.cientificoJapones, x0 + 16, su, t, { dir: 1, anda, sostiene: true, sonrisa: alza > 0.5 });
  if (c && c.mano) T.PIEZAS_GZ.placaEmulsion(R, c.mano[0] + 2, c.mano[1] + 6, {});
  T.gizaDelante(R, t, { encuadre: 'meseta', camara: 'calzada', hora: 'dia' });
};
// ── plano 4: el cielo sobre Giza: llueven muones ──
const CN = H('#0c1438 #121c48 #1a2a5e #243a74 #304c8a #42629e #5a7cae');
const fondoCielo = () => capa('cielo', () => {
  cielo(0, 136, CN, 4);
  for (let k = 0; k < 40; k++) { const x = h(k, 1, 40) * 320, y = h(k, 2, 40) * 70; if (libre(x, y)) pset(x, y, k % 3 ? hex('#8a9ac8') : C.blanco); }
  // el brillo del oeste en el horizonte
  for (let y = 112; y < 136; y++) for (let x = 0; x < 320; x++) { const g = (y - 112) / 24 * (1 - x / 520); if (g > bay(x, y) * 1.2) pset(x, y, mix(R.pget(x, y), hex('#c8805a'), 0.45 * g)); }
  const LD = H('#5a3a32 #6e4838 #84583e #9a6a48 #b07e56'), SD = H('#2a1e2a #34242e #3e2a32 #4a3236 #563a3a');
  piramide(206, 76, 138, 62, { luz: LD, sombra: SD, mastil: false });
  piramide(112, 84, 138, 56, { luz: LD, sombra: SD });
  piramide(36, 112, 140, 26, { luz: LD, sombra: SD, mastil: false });
  arena(136, H('#3a2a2a #4e3830 #644636 #7a563e #8e6648'));
  // palmeras al fondo y las luces de El Cairo
  for (const px of [268, 284, 300]) { linea(px, 136, px + 2, 112, hex('#2a1e1a')); for (let k = 0; k < 5; k++) linea(px + 2, 112, px + 2 + Math.cos(k * 1.3) * 9, 112 + Math.sin(k * 1.3) * 4 + 2, hex('#1e2a1e')); }
});
const p4 = (t) => {
  R.copiar(fondoCielo());
  for (let k = 0; k < 14; k++) if (Math.sin(t * 2 + k * 1.7) > 0.2) pset(250 + k * 5, 133 - (k % 3), k % 2 ? hex('#ffd080') : hex('#fff0c0'));
  const sc = esCielo(fondoCielo(), capa('soloCielo', () => cielo(0, 136, CN, 4)));
  nube(40 + ((t * 3) % 360) - 40, 62, 20, 5, H('#202c58 #2c3c6e #3e5084'), sc); nube(240 - ((t * 2) % 300), 92, 14, 6, H('#24305c #34447a #48608e'), sc);
  T.bandada(R, t, { tipo: 'golondrina', n: 3, y: 96, v: 30, cada: 7 });
  const n = Math.round(6 + 64 * tramo(t, P4 + 0.05, cielo2 + 0.4));
  lluvia(t, n, [0, 18, 319, 179], { v: 170 });
  // un camellero con su camello, dos turistas: miran arriba; uno abre el paraguas y los muones lo atraviesan
  const cx = 70 + Math.round(Math.sin(t * 0.6) * 2);
  const cam = (x, y) => { rect(x - 14, y - 16, x + 10, y - 9, C.k); rect(x - 13, y - 15, x + 9, y - 10, hex('#b08850')); rect(x - 6, y - 19, x + 2, y - 15, hex('#9a7444')); rect(x + 8, y - 22, x + 11, y - 12, hex('#b08850')); rect(x + 9, y - 25, x + 15, y - 21, hex('#b08850')); pset(x + 13, y - 24, C.k); for (const lx of [-11, -6, 3, 7]) rect(x + lx, y - 9, x + lx + 1, y, hex('#8a6a3a')); };
  cam(cx - 28, 168);
  R.actor(EL.camellero, cx, 170, t, { dir: -1, sorpresa: t > cielo2, habla: t > P4 + 0.6 && t < cielo2 && Math.sin(t * 8) > 0 });
  const u = tramo(t, P4 + 0.2, P4 + 1.6);
  R.actor(EL.turista1, Math.round(lerp(240, 176, u)), 172, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > P4 + 1.4 && t < siempre, sorpresa: t > siempre });
  const ab = tramo(t, siempre, siempre + 0.35), tx = 214;
  const q = R.actor(EL.turista2, tx, 174, t, { dir: -1, sostiene: [tx - 2, 150], sonrisa: ab > 0.9 });
  if (q && q.mano) { const [mx, my] = q.mano; linea(mx, my, mx, my - 16, C.k); if (ab > 0) { const r = Math.round(4 + ab * 10), y = my - 16; for (let i = -r; i <= r; i++) { const yy = y - Math.round(Math.sqrt(Math.max(0, r * r - i * i)) * 0.55); linea(mx + i, yy, mx + i, y, Math.floor((i + r) / 4) % 2 ? hex('#d04a4a') : hex('#f2e2c8')); pset(mx + i, yy - 1, C.k); } linea(mx - r, y, mx + r, y, C.k); } }
  // los muones del primer término, más gordos, que lo atraviesan todo (también el paraguas)
  lluvia(t, Math.round(3 + 10 * tramo(t, P4, cielo2)), [120, 60, 260, 179], { v: 120, n: 9, borde: false });
};
const efectos = [[mixT - 0.1, 'whoosh'], [found, 'brillo'], [P2 + 0.2, 'zumbido'], [equis, 'pop'], [tecnica + 0.05, 'bip'], [P4 + 0.1, 'brillo'], [siempre + 0.05, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P3 ? 2026 : 2017 });
''')

E['gz-muones'] = ('Los muones', '''// GZ-MUONES (frase 12). Qué son los muones y cómo hacen una radiografía con el cielo. Cuatro planos, en estilo real:
// 1. la atmósfera desde muy alto (la Tierra curva con el Nilo, el delta y el mar): unos muones diminutos caen (un anillo
//    señala uno en «tiny»); en «cosmic rays» baja un rayo cósmico y en «hit the air» choca y nace la cascada de muones;
// 2. (en «they») un corte de paisaje: una nube, una casa abierta con su gato y un gran sillar; la lluvia ámbar lo
//    atraviesa todo (un turista pasa sin enterarse); en «stone» un muon cruza el sillar brillando y en «Stone stops some»
//    unos cuantos se paran dentro con una chispa;  3. (en «So») un corte de pirámide de piedra: el japonés deja el
//    detector en la cámara; los muones que vienen por el hueco llegan muchos más que los que vienen por la roca (los dos
//    conos y sus cuentas); él señala el hueco;  4. (en «It's») la mesa de luz del laboratorio: una mano desliza la placa
//    de emulsión, en «X-ray» se enciende la mesa y aparece la mancha clara; por la ventana, el cielo de Giza.''', COMUN + r'''
const w = (s) => en('muones', (s - 0.5) / 18.646);
const P2 = w(5.40), P3 = w(10.39), P4 = w(17.23);
const tiny = w(1.82), rayo = w(3.40), choca = w(4.28), piedra = w(7.46), frena = w(8.83), pone = w(10.87), mas = w(13.05), hueco = w(14.19), roca = w(15.91), rx = w(18.03), sky = w(18.65);
// ── plano 1: la atmósfera desde muy alto ──
const ESP = H('#010208 #02050f #050a1c #0a142e #10204a'), ATM = H('#16306a #2456a0 #3a86cc #6abce8 #b8ecff');
const DES = H('#8a6a40 #a8844e #c09a5e #d4b06e #e2c488'), MAR = H('#163a6e #1e4a86 #2a5e9c'), VER = H('#2a5a2a #3a7234 #5a8a3a');
const TC = [160, 640], TR = 556;
const fondoAlto = () => capa('alto', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - TC[0], y - TC[1]);
    if (d > TR + 12) { pset(x, y, tono(ESP, 4.2 - (d - TR) / 30 + (h(x >> 3, y >> 3, 1) - 0.5) * 0.3, x, y)); continue; }
    if (d > TR) { pset(x, y, tono(ATM, (TR + 12 - d) / 12 * 4.2, x, y)); continue; }
    const borde = (TR - d) / 30;   // oscurece hacia el borde (limbo)
    const prof = TR - d, mar = (prof < 9 + 5 * Math.sin(x * 0.07) + 3 * Math.sin(x * 0.21) && x < 196) || Math.abs(x - (244 + (y - 92) * 0.55 + Math.sin(y * 0.12) * 3)) < 2.6 + (y - 92) * 0.02;
    const nilo = Math.abs(x - (174 + Math.sin(y * 0.06) * 7 + (y - 110) * 0.18)) < 1.4 && y > 110;
    const delta = y > 98 && y < 114 && Math.abs(x - 174) < (114 - y) * 1.6 && !mar;
    const verde = Math.abs(x - (174 + Math.sin(y * 0.06) * 7 + (y - 110) * 0.18)) < 4 && y > 108;
    let c;
    if (mar) c = tono(MAR, 1 + (h(x >> 2, y >> 2, 2) - 0.5) * 1.2 + Math.min(1, borde), x, y);
    else if (nilo) c = hex('#1e4a86');
    else if (delta || verde) c = tono(VER, 1 + (h(x >> 1, y >> 1, 3) - 0.5) * 1.6, x, y);
    else c = tono(DES, 2.2 + Math.sin(x * 0.08 + y * 0.3 + Math.sin(y * 0.05) * 4) * 0.6 + (h(x >> 2, y >> 2, 4) - 0.5) * 1.2 - (y - 90) * 0.01, x, y);
    if (borde < 1) c = mix(c, hex('#4a86c0'), (1 - borde) * 0.7);
    pset(x, y, c);
  }
  // nubes de la Tierra, con su sombra
  for (let k = 0; k < 14; k++) { const cx = Math.round(10 + h(k, 1, 77) * 300), cy = Math.round(104 + h(k, 2, 77) * 70), rx = 8 + h(k, 3, 77) * 18, ry = 1.5 + h(k, 4, 77) * 2.5, sl = (h(k, 5, 77) - 0.5) * 0.4;
    for (const [dx, dy, som] of [[2, 2, 1], [0, 0, 0]]) for (let j = -4; j <= 4; j++) for (let i = -28; i <= 28; i++) { const dd = Math.hypot(i / rx, (j - i * sl) / ry) + (h(cx + i >> 1, cy + j, 5) - 0.5) * 0.7; const x = cx + i + dx, y = cy + j + dy;
      if (dd < 1 && Math.hypot(x - TC[0], y - TC[1]) < TR - 2) pset(x, y, som ? mix(R.pget(x, y), C.k, 0.22) : dd < 0.55 ? C.blanco : (x + y) & 1 ? hex('#dfe8f0') : mix(R.pget(x, y), C.blanco, 0.5)); } }
  for (let k = 0; k < 70; k++) { const x = h(k, 1, 90) * 320, y = h(k, 2, 90) * 80; if (libre(x, y) && Math.hypot(x - TC[0], y - TC[1]) > TR + 14) pset(x, y, k % 4 ? hex('#6a7aa8') : C.blanco); }
});
const HIT = [176, 76];
const p1 = (t) => {
  R.copiar(fondoAlto());
  for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 5, 91) * 320), y = Math.round(h(k, 6, 91) * 60); if (libre(x, y) && Math.sin(t * 3 + k * 1.9) > 0.6) { pset(x, y, C.blanco); ps(x - 1, y, hex('#8a9ad0')); ps(x + 1, y, hex('#8a9ad0')); } }
  // los muones sueltos del principio, lentos; un anillo señala uno («tiny»)
  for (let k = 0; k < 5; k++) { const y = 20 + ((t * 26 + k * 37) % 150), x = 40 + k * 56 + (y - 20) * 0.1; muon(x, y, 8, 0.1);
    if (k === 2) { const a = tramo(t, tiny - 0.2, tiny + 0.2) * (1 - tramo(t, tiny + 1.4, tiny + 1.8)); if (a > 0) { const r = Math.round(4 + a * 5); R.anillo(Math.round(x), Math.round(y) - 2, r, hex('#fff0c0'), 0); R.anillo(Math.round(x), Math.round(y) - 2, r + 1, hex('#c88a20'), 2); } } }
  // el rayo cósmico baja en diagonal
  const A = [258, 18], u = tramo(t, rayo, choca);
  if (u > 0 && t < choca + 0.4) { const hx = lerp(A[0], HIT[0], u), hy = lerp(A[1], HIT[1], u), cola = Math.max(0, u - 0.45);
    const tx = lerp(A[0], HIT[0], cola), ty = lerp(A[1], HIT[1], cola), f = 1 - tramo(t, choca, choca + 0.4);
    if (f > 0) { linea(tx + 1, ty, hx + 1, hy, hex('#6a4ab8')); linea(tx, ty + 1, hx, hy + 1, hex('#6a4ab8')); linea(tx, ty, hx, hy, hex('#e8dcff')); disco(Math.round(hx), Math.round(hy), 2, C.blanco); } }
  // el choque: el destello y la cascada en abanico
  if (t > choca) { const e = t - choca;
    if (e < 0.6) { const r = Math.round(3 + e * 30); R.anillo(HIT[0], HIT[1], r, e < 0.3 ? C.blanco : hex('#ffd890'), 0); disco(HIT[0], HIT[1], Math.max(1, Math.round(6 - e * 10)), e < 0.2 ? C.blanco : hex('#ffe8a0')); }
    const L = Math.min(150, e * 110); for (let j = 4; j < L; j += 2) { const hw = j * 0.62; for (let i = -hw; i <= hw; i += 2) { const x = Math.round(HIT[0] + i + (j & 2 ? 1 : 0)), y = HIT[1] + j; if (y < 180 && bay(x, y) < 0.3 * (1 - j / 170)) pset(x, y, mix(R.pget(x, y), hex('#ffcc70'), 0.35)); } }
    for (let k = 0; k < 84; k++) { const a = (h(k, 1, 44) - 0.5) * 1.25, v = 60 + h(k, 2, 44) * 90, d = (e - h(k, 3, 44) * 0.4) * v; if (d <= 2) continue;
      const x = HIT[0] + Math.sin(a) * d, y = HIT[1] + Math.cos(a) * d; if (y < 190) muon(x, y, 10, Math.tan(a), true); } }
};
// ── plano 2: la nube, la casa y el sillar ──
const CM = H('#2a4a8a #34589a #3e66a8 #4c76b6 #5c88c2 #7aa0d0');
const LAD = H('#6a4a2a #86603a #a07848 #b88e58'), CAL = H('#8a7048 #a88a5a #c4a670 #d8bc86 #ead2a0');
const fondoCorte = () => capa('corte', () => {
  cielo(0, 150, CM, 6);
  // El Cairo lejos, en la bruma, con un alminar
  for (let k = 0; k < 22; k++) { const x = k * 15 + h(k, 1, 12) * 6, a = 4 + h(k, 2, 12) * 8; rect(x, 146 - a, x + 11, 150, hex('#6a78a0')); rect(x + 2, 147 - a, x + 3, 148 - a, hex('#8a96b8')); }
  rect(204, 120, 206, 150, hex('#6a78a0')); rect(203, 126, 207, 127, hex('#7a88b0')); disco(205, 119, 2, hex('#6a78a0'));
  arena(150);
  // la palmera
  for (let y = 108; y < 160; y++) { const x = 30 + Math.round((160 - y) * 0.08); rect(x - 1, y, x + 1, y, (y >> 1) & 1 ? hex('#6a4a2a') : hex('#8a6438')); }
  for (let k = 0; k < 7; k++) { const a = -0.3 + k * 0.62; for (let i = 0; i < 16; i++) { const x = 34 + Math.cos(a) * i, y = 108 + Math.sin(a) * i * 0.5 + i * i * 0.04; pset(x, y, hex('#2e6a2a')); pset(x, y + 1, hex('#1e4a1e')); } }
  // la casa abierta (adobe): muros, techo con el canto roto, el cuarto por dentro
  rect(112, 92, 198, 150, C.k);
  for (let y = 93; y < 150; y++) for (let x = 113; x < 198; x++) { const lad = ((x + ((Math.floor(y / 3) & 1) ? 3 : 0)) % 6 === 0) || y % 3 === 0; pset(x, y, tono(LAD, (lad ? 0.4 : 2.2) + (h(x >> 1, y, 13) - 0.5) * 0.8, x, y)); }
  rect(120, 102, 190, 146, hex('#d8c8a4'));
  for (let y = 102; y <= 146; y++) for (let x = 120; x <= 190; x++) { const v = 1.6 + (y - 102) / 44 + (h(x >> 2, y >> 2, 14) - 0.5) * 0.6; pset(x, y, tono(H('#e8dcc0 #d8c8a4 #c4b08a #ac9670'), v, x, y)); }
  rect(120, 140, 190, 146, hex('#7a5a3a')); for (let x = 128; x < 182; x++) pset(x, 141 + ((x >> 2) & 1), (x >> 2) % 3 ? hex('#b03a2a') : hex('#e8b04a')); rect(128, 143, 182, 145, hex('#a0302a'));
  rect(132, 110, 148, 124, hex('#5a4026')); rect(133, 111, 147, 123, hex('#8ab8e0')); linea(140, 111, 140, 123, hex('#5a4026')); linea(133, 117, 147, 117, hex('#5a4026'));
  rect(158, 118, 186, 119, hex('#6a4a2a')); for (let k = 0; k < 4; k++) { rect(160 + k * 7, 112, 164 + k * 7, 117, [hex('#b8603a'), hex('#3a6aa0'), hex('#d8a040'), hex('#6a8a4a')][k]); }
  for (let k = 0; k < 3; k++) rect(176 + k * 4, 128, 178 + k * 4, 139, hex('#8a6438'));
  // el techo: losa con varillas y un depósito
  rect(108, 86, 202, 92, hex('#8a8478')); rect(108, 86, 202, 86, hex('#b0aa9c')); for (let x = 110; x < 202; x += 7) pset(x, 89, hex('#5a5448'));
  rect(176, 72, 192, 85, C.k); rect(177, 73, 191, 85, hex('#2a3a5a')); rect(177, 73, 191, 74, hex('#4a5a7a'));
  // el sillar enorme
  rect(212, 96, 302, 150, C.k);
  for (let y = 97; y < 150; y++) for (let x = 213; x < 302; x++) { const top = y < 104; let v = top ? 3.4 : 2 + (h(x >> 2, y >> 1, 15) - 0.5) * 1.1 - (y - 104) * 0.012; if (h(x, y, 16) > 0.96) v -= 1.2; if ((x * 3 + y) % 23 === 0 && !top) v -= 0.6; pset(x, y, tono(CAL, v, x, y)); }
  linea(240, 110, 246, 128, hex('#6a5434')); linea(246, 128, 244, 140, hex('#6a5434')); linea(280, 104, 284, 118, hex('#6a5434'));
  for (let x = 302; x < 316; x++) for (let y = 140; y < 151; y++) if (x - 302 < (y - 140)) pset(x, y, mix(R.pget(x, y), C.k, 0.3));
  for (let x = 114; x < 312; x++) pset(x, 151, mix(R.pget(x, 151), C.k, 0.35));
});
const BLQ = [213, 104, 301, 149];
const p2 = (t) => {
  R.copiar(fondoCorte());
  nube(70 + Math.sin(t * 0.3) * 6, 50, 40, 8, H('#9cb0cc #d2deec #ffffff')); nube(250 + ((t * 3) % 60), 40, 16, 9, H('#9cb0cc #d2deec #ffffff'));
  T.bandada(R, t, { tipo: 'golondrina', n: 3, y: 74, v: 36, cada: 6 });
  // la lámpara que se mece y el gato que duerme
  const la = Math.sin(t * 1.6) * 3; linea(156, 102, 156 + la, 110, C.k); rect(153 + la, 110, 159 + la, 113, hex('#e8b84a')); pset(156 + la, 114, hex('#fff0a0'));
  T.gato(R, 150, 140, t, { dir: 1 });
  // la lluvia de muones por todas partes (con un filo oscuro, para que se lea sobre la piedra y la arena)
  lluvia(t, 52, [0, 18, 319, 179], { v: 150, borde: true, filtro: (x, y) => !(x > BLQ[0] && x < BLQ[2] && y > BLQ[1] + 6 && h(Math.round(x), 1, 50) < 0.35) });
  // los que la piedra frena: entran en el sillar y se paran con una chispa
  for (let k = 0; k < 7; k++) { const x = BLQ[0] + 8 + k * 12 + Math.round(h(k, 1, 51) * 6), stop = BLQ[1] + 12 + Math.round(h(k, 2, 51) * 28), per = 1.4 + h(k, 3, 51) * 0.6, f = ((t - P2 + h(k, 4, 51) * per) % per) / per, y = 10 + f * 220;
    if (y < stop) muon(x, y, 8, 0, true); else if (y < stop + 30) { const e = (y - stop) / 30; if (e < 0.5) { R.anillo(x, stop, Math.round(1 + e * 6), e < 0.25 ? C.blanco : MU.m, 0); } pset(x, stop, MU.l); } }
  // el muon que cruza el sillar de arriba abajo, brillando («including stone»)
  const g = tramo(t, piedra - 0.2, piedra + 0.5); if (g > 0 && g < 1) { const y = lerp(60, 182, g); for (let i = 0; i < 26; i++) { const yy = y - i; if (yy > BLQ[1] && yy < BLQ[3]) ps(258, yy, i < 2 ? C.blanco : i < 10 ? MU.l : MU.m); } disco(258, Math.round(y), 2, C.blanco); }
  // un turista pasa por delante sin enterarse
  const u = tramo(t, P2 + 0.2, P3 - 0.3); R.actor(EL.turista1, Math.round(lerp(-14, 206, u)), 172, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true });
  lluvia(t, 6, [60, 140, 240, 179], { v: 130, borde: true });
};
// ── plano 3: el corte de la pirámide, el detector y los dos conos ──
const CD = H('#3a6ab0 #4a7cc0 #5a8ecc #74a4d6 #92bce0 #b4d2e8');
const PC = [160, 26], PB = 160, PH = 148;
const enPir = (x, y) => y > PC[1] && y <= PB && Math.abs(x - PC[0]) <= (y - PC[1]) / (PB - PC[1]) * PH;
const enHueco = (x, y) => x >= 190 && x <= 216 && y >= 86 && y <= 96 - Math.max(0, (x - 208) * 0.6);
const enCamara = (x, y) => x >= 128 && x <= 192 && y >= 134 - Math.max(0, 10 - Math.abs(x - 160) * 0.35) && y <= 158;
const fondoPir = () => capa('pir', () => {
  cielo(0, 162, CD, 7);
  disco(44, 42, 9, hex('#fff4c8')); disco(44, 42, 7, hex('#ffffff'));
  arena(160);
  const SEC = H('#8a6c44 #a4845a #bc9c6c #d0b080 #e2c496');
  for (let y = PC[1]; y <= PB; y++) for (let x = 0; x < 320; x++) {
    if (!enPir(x, y)) continue;
    const fila = Math.floor((y - PC[1]) / 6), ry = (y - PC[1]) % 6, off = (fila * 7) % 13, bx = Math.floor((x + off) / 14), rx2 = (x + off) % 14;
    let v = 2.2 + (h(bx, fila, 17) - 0.5) * 1.2 - (y - PC[1]) * 0.004;
    if (ry === 0 || rx2 === 0) v = 0.3; else if (ry === 1) v += 0.6;
    if (h(x, y, 18) > 0.96) v -= 0.8;
    const dEdge = (y - PC[1]) / (PB - PC[1]) * PH - Math.abs(x - PC[0]); if (dEdge < 3) v = dEdge < 1 ? 4 : 3.4;
    let c = tono(SEC, v, x, y);
    if (enHueco(x, y)) c = tono(H('#140c06 #1e140c #2a1e14 #3a2a1a'), 1.5 + (h(x >> 1, y, 19) - 0.5), x, y);
    if (enCamara(x, y)) c = tono(H('#3a2818 #4e3820 #644a2c #7a5c38'), 1.6 + (y - 134) / 24 + ((x % 10 === 0 || y % 6 === 0) ? -0.8 : 0), x, y);
    pset(x, y, c);
  }
  rect(128, 156, 192, 158, hex('#8a6c44')); rect(128, 156, 192, 156, hex('#b89a6c'));
  // el contorno del hueco y de la cámara
  for (let x = 189; x <= 217; x++) { pset(x, 85, hex('#5a4228')); pset(x, 97, hex('#e2c496')); } for (let y = 85; y <= 97; y++) { pset(189, y, hex('#5a4228')); pset(217, y, hex('#e2c496')); }
});
const DET = [170, 158];
const cono = (x0, y0, x1, y1, a, c) => { for (let i = 0; i <= 1; i++) { const n = Math.round(Math.hypot(x1 - x0, y1 - y0)); for (let s = 0; s < n; s += 1) { const px = Math.round(x0 + (x1 - x0 + (i ? 10 : -10)) * s / n), py = Math.round(y0 + (y1 - y0) * s / n); if ((px + py + Math.floor(R.__t * 8)) % 3 === 0) pset(px, py, mix(R.pget(px, py), c, a)); } } };
const p3 = (t) => {
  R.copiar(fondoPir()); R.__t = t;
  const solo = (x, y) => y < 162 && !enPir(x, y);
  nube(50 + ((t * 4) % 300), 70, 18, 10, H('#9cb6d4 #d6e4f0 #ffffff')); T.bandada(R, t, { tipo: 'golondrina', n: 3, y: 60, v: 34, cada: 5 });
  // los conos de lo que ve el detector: hacia el hueco (arriba a la derecha) y hacia la roca (arriba a la izquierda)
  const on = tramo(t, pone, pone + 0.4), fuerte = tramo(t, mas, mas + 0.6), rocaD = tramo(t, roca - 0.2, roca + 0.3);
  if (on > 0) { cono(DET[0], DET[1] - 8, 226, 40, 0.25 + 0.45 * fuerte, MU.l); cono(DET[0], DET[1] - 8, 104, 46, 0.18 + 0.2 * rocaD, hex('#ff8a5a')); }
  // la lluvia: en la piedra se van parando; por el hueco siguen
  lluvia(t, 44, [0, 16, 319, 175], { v: 150, borde: true, filtro: (x, y, k) => { if (!enPir(x, y)) return true; const surf = PC[1] + Math.abs(x - PC[0]) / PH * (PB - PC[1]); const prof = 14 + h(k, 9, 4) * 50 + (x > 188 && x < 220 ? 80 : 0); return y < surf + prof; } });
  // los que llegan al detector: muchos por el hueco, pocos por la roca
  if (on > 0) for (const [ox, oy, n, v] of [[228, 40, 3 + Math.round(5 * fuerte), 1.2], [104, 46, 1 + Math.round(rocaD), 0.9]]) for (let k = 0; k < n; k++) { const f = ((t * v + k / n) % 1); const x = lerp(ox, DET[0], f), y = lerp(oy, DET[1] - 8, f); muon(x, y, 6, (DET[0] - ox) / (DET[1] - oy), true); if (f > 0.93) disco(DET[0], DET[1] - 8, 3, C.blanco); }
  // las cuentas: dos placas con su número
  if (on > 0) { const nh = Math.floor(4 + Math.max(0, t - pone) * (2 + 9 * fuerte)), nr = Math.floor(2 + Math.max(0, t - pone) * 1.1);
    for (const [x, n, c] of [[214, nh, MU.l], [98, nr, hex('#ffb08a')]]) { rect(x - 13, 108, x + 13, 122, C.k); rect(x - 12, 109, x + 12, 121, hex('#2a1e14')); R.numero(String(n), x, 119, { centro: true }); }
    if (fuerte > 0) { const s = Math.sin(t * 6) > 0; R.anillo(214, 115, 16, s ? MU.l : MU.m, 2); } }
  // el japonés trae el detector y lo deja; luego señala el hueco
  const u = tramo(t, P3 + 0.1, pone - 0.05), tiene = t < pone;
  const a = R.actor(EL.cientificoJapones, Math.round(lerp(132, 150, u)), 158, t, { dir: 1, anda: u > 0 && u < 1, sostiene: tiene ? true : null, dedo: t > mas - 0.2 && t < roca, sorpresa: t > hueco && t < roca + 0.3, sonrisa: t > roca + 0.3 });
  if (tiene && a && a.mano) T.PIEZAS_GZ.detectorMuones(R, a.mano[0] + 4, a.mano[1] + 6, { t: 0 }); else if (!tiene) T.PIEZAS_GZ.detectorMuones(R, DET[0] + 4, DET[1], { t });
};
// ── plano 4: la mesa de luz y la placa ──
const AZU = H('#86a098 #94aea4 #a2bcb2 #b0c8be');
const fondoLab = () => capa('lab', () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const jt = x % 10 === 0 || y % 10 === 0; pset(x, y, jt ? hex('#6e8480') : tono(AZU, 2.2 - y / 160 + (h(x / 10 | 0, y / 10 | 0, 22) - 0.5) * 0.5 + ((x % 10) < 2 ? 0.4 : 0), x, y)); }
  // la ventana con el cielo de Giza
  rect(12, 20, 94, 102, hex('#e8ece8')); rect(14, 22, 92, 100, hex('#9aa8a4'));
  for (let y = 23; y < 100; y++) for (let x = 15; x < 92; x++) pset(x, y, tono(CD, (y - 23) / 77 * 5, x, y));
  for (const [cx, ap, hw] of [[46, 70, 24], [74, 80, 16]]) for (let y = ap; y < 100; y++) { const ww = (y - ap) / (100 - ap) * hw; for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) if (x > 14 && x < 92) pset(x, y, x < cx + ww * 0.2 ? hex('#d8b880') : hex('#a88a5a')); }
  rect(15, 96, 91, 99, hex('#e2c488'));
  rect(52, 22, 54, 100, hex('#e8ece8')); rect(14, 60, 92, 61, hex('#e8ece8')); rect(10, 102, 96, 105, hex('#c8ccc8')); rect(10, 105, 96, 106, hex('#7a8480'));
  // la estantería con archivadores y cajas
  rect(224, 70, 312, 73, hex('#7a5a3a')); rect(224, 70, 312, 70, hex('#a07a50')); rect(230, 74, 232, 80, hex('#5a5a5a')); rect(304, 74, 306, 80, hex('#5a5a5a'));
  for (let k = 0; k < 7; k++) { const x = 228 + k * 7, a = 14 + (k % 3) * 2; rect(x, 70 - a, x + 5, 69, C.k); rect(x + 1, 71 - a, x + 4, 69, [hex('#c84a3a'), hex('#3a6aa0'), hex('#e8b84a'), hex('#4a8a5a')][k % 4]); rect(x + 2, 64 - a / 2, x + 3, 66 - a / 2, hex('#f0f0f0')); }
  rect(280, 54, 306, 69, C.k); rect(281, 55, 305, 69, hex('#c8a070')); rect(281, 55, 305, 57, hex('#e0bc8a'));
  // el banco
  rect(0, 132, 319, 141, hex('#3a4450')); rect(0, 132, 319, 133, hex('#6a7888')); for (let x = 0; x < 320; x += 1) if (h(x, 1, 23) > 0.9) pset(x, 136, hex('#4e5a68'));
  rect(0, 141, 319, 144, hex('#20262e'));
  for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(H('#4a5260 #56606e #626c7a #6e7888'), 2 - (y - 145) / 40 + (x % 80 < 2 ? -1.5 : 0) + (h(x >> 3, y >> 3, 24) - 0.5) * 0.3, x, y));
  for (let k = 0; k < 4; k++) { const x0 = k * 80 + 4, x1 = k * 80 + 76; linea(x0, 148, x1, 148, hex('#8a94a4')); linea(x0, 148, x0, 176, hex('#8a94a4')); linea(x1, 148, x1, 176, hex('#2e343e')); linea(x0, 176, x1, 176, hex('#2e343e')); rect(x0 + 6, 153, x1 - 6, 171, hex('#525c6a')); linea(x0 + 6, 153, x1 - 6, 153, hex('#3a424e')); linea(x0 + 6, 171, x1 - 6, 171, hex('#76808e')); rect(36 + k * 80, 156, 44 + k * 80, 158, hex('#c8ccd0')); rect(36 + k * 80, 158, 44 + k * 80, 158, hex('#5a5e66')); }
  // una papelera y una banqueta delante del banco
  rect(286, 158, 306, 179, C.k); rect(287, 159, 305, 179, hex('#3a6a8a')); for (let x = 289; x < 305; x += 3) linea(x, 160, x, 178, hex('#2a5070')); rect(286, 158, 306, 159, hex('#6a9ab8')); rect(290, 156, 296, 158, C.blanco);
  // la mesa de luz: el marco con tornillos y el cristal apagado
  rect(96, 56, 224, 133, C.k); rect(97, 57, 223, 132, hex('#8a929a')); rect(97, 57, 223, 58, hex('#c0c8d0')); rect(97, 130, 223, 132, hex('#5a626a'));
  for (const [x, y] of [[100, 60], [220, 60], [100, 128], [220, 128]]) pset(x, y, hex('#3a4048'));
  rect(212, 126, 218, 129, hex('#2a3038'));
  // en el banco: la lupa, la taza, una caja de placas y un lápiz
  rect(30, 122, 64, 132, C.k); rect(31, 123, 63, 131, hex('#d8c8a0')); rect(31, 123, 63, 124, hex('#f0e2bc')); rect(34, 126, 60, 127, hex('#a08a60'));
  rect(250, 120, 262, 132, C.k); rect(251, 121, 261, 131, hex('#e8e4dc')); rect(262, 124, 265, 128, C.k); rect(251, 121, 261, 122, hex('#5a3a20'));
  linea(272, 130, 296, 126, hex('#e8b84a')); linea(272, 131, 296, 127, hex('#a87a2a')); pset(271, 131, C.k);
});
const p4 = (t) => {
  R.copiar(fondoLab());
  // por la ventana: nubes que pasan
  R.recorte([15, 23, 51, 59]); nube(10 + ((t * 6) % 60), 40, 10, 11, H('#9cb6d4 #d6e4f0 #ffffff')); R.recorte(null);
  R.recorte([55, 23, 91, 59]); nube(30 + ((t * 6) % 60), 44, 9, 12, H('#9cb6d4 #d6e4f0 #ffffff')); R.recorte(null);
  // el vapor de la taza
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; ps(256 + Math.sin(t * 2 + k) * 2 * f, 118 - f * 16, f < 0.5 ? hex('#ffffff') : hex('#c8d4d0')); }
  // la mesa de luz se enciende
  const on = tramo(t, rx - 0.05, rx + 0.2);
  for (let y = 60; y <= 126; y++) for (let x = 100; x <= 220; x++) pset(x, y, on > 0 ? mix(hex('#4a5660'), (x + y) & 1 ? hex('#f4fbff') : hex('#e2f0fa'), on) : ((x + y) % 7 === 0 ? hex('#56626c') : hex('#4a5660')));
  if (on > 0) { for (let y = 50; y <= 140; y++) for (let x = 88; x <= 232; x++) { if (x > 95 && x < 225 && y > 55 && y < 134) continue; const d = Math.min(Math.abs(x - 96), Math.abs(x - 224), Math.abs(y - 56), Math.abs(y - 133)); if (d < 8 && bay(x, y) < (8 - d) / 16 * on) pset(x, y, mix(R.pget(x, y), hex('#e8f8ff'), 0.4)); } pset(215, 127, hex('#6aff6a')); }
  // la placa que llega en la mano y se queda
  const u = tramo(t, P4 + 0.2, P4 + 0.7), px = Math.round(lerp(300, 160, 1 - (1 - u) ** 2));
  T.PIEZAS_GZ.placaEmulsion(R, px, 122, { s: 4, luz: tramo(t, rx + 0.1, sky + 0.3) });
  if (on > 0.5) { const g = tramo(t, sky - 0.1, sky + 0.3) * (1 - tramo(t, sky + 0.6, sky + 1)); if (g > 0) { R.anillo(160, 90, Math.round(10 + g * 14), C.blanco, 2); } }
  // la mano empuja la placa desde el borde y la suelta en x 276; luego se va (se ve como mucho 45 px de brazo)
  const suelta = P4 + 0.2 + 0.5 * 0.3, ida = tramo(t, suelta, suelta + 0.4);
  if (ida < 1) { const wx = t < suelta ? px + 48 : lerp(276, 344, ida), wy = lerp(104, 130, ida); T.brazo(R, 352, 150, wx, wy, '#3a5a8a', -1, { codo: [lerp(326, 352, ida), 126] }); }
  // el reloj de pared con su segundero
  disco(196, 30, 10, C.k); disco(196, 30, 9, hex('#f4f4ee')); for (let k = 0; k < 12; k++) pset(196 + Math.cos(k * 0.52) * 7, 30 + Math.sin(k * 0.52) * 7, hex('#5a5a5a'));
  linea(196, 30, 196, 25, C.k); linea(196, 30, 200, 31, C.k); const sa = t * 1.047 - Math.PI / 2; linea(196, 30, 196 + Math.cos(sa) * 7, 30 + Math.sin(sa) * 7, hex('#d03a3a'));
};
const efectos = [[rayo + 0.05, 'whoosh'], [choca, 'brillo'], [piedra, 'brillo'], [frena, 'pop'], [pone, 'toc'], [mas, 'bip'], [P4 + 0.25, 'papel'], [rx, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2017 });
''')

E['gz-vacio'] = ('El gran vacío', '''// GZ-VACIO (frase 13), cartela «2017»; la barra dice 2015 hasta «November 2017». Seis planos:
// 1. el despacho de El Cairo: la francesa entra con la carpeta del proyecto, la carpeta se desliza a la bandeja y la
//    investigadora egipcia la sella en «began» (el calendario de la mesa marca 2015); en «Cairo University» sonríe;
// 2. (en «France's») la mesa de trabajo con la maqueta: las banderitas de mesa; la de Egipto ya está, la de Francia sube
//    en «France's» y una mano planta la de Japón en «Japan»; el ventilador las hace ondear;
// 3. (en «They») la Cámara de la Reina: el japonés deja una placa en «films», la francesa enciende un detector en
//    «detectors»; empiezan a caer los muones y miran arriba;  4. (en «outside») fuera, al pie de Keops: los detectores de
//    gas en el suelo; el técnico egipcio deja el carrete de cable en «foot»; en «November 2017» la pantalla de la mesa
//    sube sus barras y la francesa levanta los brazos;  5. (en «they», fondo local) una mesa de lectura con la lámpara
//    de banquero y la librería: la revista cae sobre el cuero verde en «published» y levanta polvo; en «Nature» se
//    enciende el vacío de la foto de la portada;
// 6. (en «lies») la Gran Galería en corte: en «void» se enciende el gran vacío encima (destello) y en «30» se dibuja la
//    cota de treinta metros; los dos investigadores del rellano miran y señalan.''', COMUN + r'''
const w = (s) => en('vacio', (s - 1.5) / 24.38);
const P2 = w(6.74), P3 = w(11.22), P4 = w(14.96), P5 = w(19.0), P6 = w(22.70);
const began = w(4.04), cairo = w(5.30), hip = w(7.30), japan = w(9.58), france = w(9.98), films = w(12.02), dets = w(12.66), queen = w(13.58);
const foot = w(16.10), nov = w(17.84), pub = w(19.40), nature = w(20.32), huge = w(23.18), vacioT = w(23.46), treinta = w(24.58);
// ── plano 1: el despacho; el proyecto empieza ──
const p1 = (t) => {
  const o = { encuadre: 'redaccion', camara: 'despacho', carpeta: tramo(t, 2.5, 3.5) };
  T.hoy(R, t, o);
  const u = tramo(t, 1.35, 2.4);
  R.actor(EL.cientificaFrancesa, Math.round(lerp(-16, 28, u)), 177, t, { dir: 1, anda: u > 0 && u < 1, habla: t > 2.6 && t < 3.6 && Math.sin(t * 9) > 0, sonrisa: t > began });
  const sella = t > 3.2 && t < began + 0.6, baja = tramo(t, began - 0.25, began) * (1 - tramo(t, began + 0.1, began + 0.35));
  const e = R.actor(EL.egipcia2024, 176, 164, t, { dir: sella ? 1 : -1, sostiene: sella ? [204, 136 + Math.round(baja * 9)] : null, habla: t > 2 && t < 3 && Math.sin(t * 8) > 0, sonrisa: t > began, dedo: t > cairo - 0.2 && t < P2 - 0.2 });
  if (sella && e && e.mano) { const [mx, my] = e.mano; rect(mx - 2, my - 6, mx + 2, my - 1, C.k); rect(mx - 1, my - 5, mx + 1, my - 2, hex('#8a5a2a')); rect(mx - 4, my + 1, mx + 4, my + 3, C.k); rect(mx - 3, my + 1, mx + 3, my + 2, hex('#2a5a3a')); }
  T.hoyDelante(R, t, o);
  // el calendario de la mesa con el año
  rect(104, 144, 136, 160, C.k); rect(105, 145, 135, 159, hex('#f4efe2')); rect(105, 145, 135, 148, hex('#c83a3a')); for (const x of [110, 130]) { rect(x, 142, x + 1, 146, hex('#5a5a66')); }
  R.numero('2015', 120, 157, { centro: true, rampa: [hex('#3a2a2a'), hex('#2a1e1e'), hex('#1a1414')] });
  if (t > began) { const s = tramo(t, began, began + 0.15); T.visto(R, 206, 143 - Math.round((1 - s) * 3), 1); }
};
// ── plano 2: las banderitas de mesa ──
const MAD = H('#5a3a20 #6e4826 #84582e #9a6a38 #ae7c44');
const fondoMesa = () => capa('mesa', () => {
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(H('#b8a888 #c8b898 #d6c8aa #e2d6bc'), 2.4 - y / 120 + (h(x >> 2, y >> 2, 31) - 0.5) * 0.5, x, y));
  for (let y = 84; y < 104; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(MAD, 2 + ((x % 40) < 1 ? -1.5 : 0) + (y === 84 ? 1.5 : 0) + Math.sin(x * 0.4 + y) * 0.3, x, y));
  // el corcho con fotos, gráficas y chinchetas (sin letras)
  rect(116, 20, 238, 80, hex('#6a4a2a')); rect(118, 22, 236, 78, hex('#b88a54'));
  for (let y = 22; y <= 78; y++) for (let x = 118; x <= 236; x++) if (h(x, y, 32) > 0.7) pset(x, y, h(x, y, 33) > 0.5 ? hex('#a07444') : hex('#cc9e66'));
  // foto de la pirámide
  rect(124, 28, 152, 50, C.blanco); for (let y = 30; y < 48; y++) for (let x = 126; x < 150; x++) pset(x, y, y < 40 ? hex('#7aaee0') : hex('#e2c488')); for (let y = 32; y < 44; y++) { const ww = (y - 32) * 0.9; rect(138 - ww, y, 138 + ww, y, y > 38 ? hex('#c8a060') : hex('#d8b878')); }
  // un corte de pirámide con la cámara y la placa
  rect(160, 26, 196, 54, hex('#f4f0e6')); linea(164, 50, 178, 30, hex('#4a4a5a')); linea(178, 30, 192, 50, hex('#4a4a5a')); linea(164, 50, 192, 50, hex('#4a4a5a')); rect(175, 44, 181, 47, hex('#c83a3a'));
  // una gráfica de barras
  rect(204, 30, 230, 52, hex('#f4f0e6')); for (let k = 0; k < 5; k++) rect(207 + k * 5, 49 - [6, 10, 7, 15, 12][k], 210 + k * 5, 49, k === 3 ? C.muon : hex('#3a6aa0'));
  // una hoja con una cuadrícula y un plano del suelo
  rect(130, 56, 168, 74, hex('#e8eef4')); for (let x = 132; x < 168; x += 4) linea(x, 57, x, 73, hex('#b8c8d8')); for (let y = 58; y < 74; y += 4) linea(131, y, 167, y, hex('#b8c8d8')); rect(144, 62, 154, 68, hex('#3a6aa0'));
  rect(184, 58, 226, 74, hex('#fff6c8')); for (let k = 0; k < 4; k++) linea(188, 62 + k * 3, 220 - k * 4, 62 + k * 3, hex('#b0a070'));
  for (const [x, y, c] of [[138, 27, '#d03a3a'], [178, 25, '#3a8a3a'], [217, 29, '#3a6ad0'], [149, 55, '#e8b83a'], [205, 57, '#d03a3a']]) { disco(x, y, 1, hex(c)); pset(x, y - 1, C.blanco); }
  // la estantería con archivadores a la izquierda
  rect(6, 46, 100, 49, hex('#6a4a2a')); rect(6, 46, 100, 46, hex('#9a7048'));
  for (let k = 0; k < 11; k++) { const x = 10 + k * 8, a = 18 + (k % 3) * 3; rect(x, 46 - a, x + 6, 45, C.k); rect(x + 1, 47 - a, x + 5, 45, [hex('#3a6aa0'), hex('#c84a3a'), hex('#4a8a5a'), hex('#e8b84a'), hex('#7a5aa0')][k % 5]); rect(x + 2, 40 - a / 2, x + 4, 42 - a / 2, hex('#f0f0e8')); }
  // un mapa del Nilo enmarcado (sin letras), a la derecha
  rect(240, 58, 300, 100, hex('#5a3a20')); rect(242, 60, 298, 98, hex('#e8d6a8')); for (let y = 61; y < 98; y++) for (let x = 243; x < 298; x++) if (h(x, y, 35) > 0.85) pset(x, y, hex('#d8c290'));
  rect(243, 61, 297, 66, hex('#7aa8d0')); for (let y = 66; y < 98; y++) { const x = Math.round(268 + Math.sin(y * 0.2) * 3 + (y - 66) * 0.1); rect(x - 3, y, x + 3, y, hex('#9ac08a')); rect(x, y, x + 1, y, hex('#3a6aa0')); } for (let k = 0; k < 7; k++) linea(268, 66, 262 + k * 2, 62 + (k & 1), hex('#5a8a4a')); disco(264, 72, 1, hex('#d03a3a'));
  // el aplique de la pared
  rect(208, 86, 218, 88, hex('#5a5a5a')); poligono([[206, 88], [220, 88], [216, 96], [210, 96]], hex('#e8c87a')); rect(210, 96, 216, 97, hex('#fff0b0'));
  // la mesa: tablón con vetas, el canto de delante
  for (let y = 104; y < 172; y++) for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.05 + Math.sin(y * 0.3 + x * 0.01) * 2 + y * 0.9) * 0.5; pset(x, y, tono(MAD, 3 - (172 - y) / 60 + veta + (h(x >> 3, y, 34) - 0.5) * 0.4 + (y === 104 ? -2 : 0), x, y)); }
  rect(0, 172, 319, 179, hex('#3a2414')); rect(0, 172, 319, 172, hex('#9a6a38')); for (let x = 0; x < 320; x += 3) pset(x, 176, hex('#4a2e1a'));
  // la maqueta de la pirámide abierta, las placas, papeles y el lápiz
  for (let y = 120; y <= 160; y++) { const ww = (y - 120) * 1.2; for (let x = Math.round(70 - ww); x <= Math.round(70 + ww); x++) { const lit = x < 70 + ww * 0.25; pset(x, y, ((160 - y) % 4 === 0) ? hex('#8a6a3e') : lit ? hex('#dcbc84') : hex('#a08050')); } }
  rect(62, 146, 76, 152, hex('#3a2a1a')); rect(64, 148, 74, 152, hex('#5a4228'));
  rect(20, 160, 116, 162, hex('#3a2414'));
  for (let k = 0; k < 3; k++) { rect(96 + k, 150 - k * 2, 120 + k, 154 - k * 2, C.k); rect(97 + k, 151 - k * 2, 119 + k, 153 - k * 2, hex('#3a3a46')); }
  rect(228, 150, 270, 166, hex('#f2efe6')); for (let k = 0; k < 4; k++) linea(232, 154 + k * 3, 264 - k * 5, 154 + k * 3, hex('#9a9aa8'));
  T.PIEZAS_GZ.lapiz(R, 250, 170, {});
});
const banderita = (x, base, alto, cual, t, viento) => {
  if (alto <= 0) return;
  rect(x - 5, base - 1, x + 5, base, C.k); rect(x - 4, base - 1, x + 4, base - 1, hex('#3a3a46'));
  linea(x, base - 2, x, base - alto, hex('#d8d8d0')); pset(x, base - alto - 1, hex('#e8c040'));
  if (alto < 12) return;
  const W = 18, A = 12, y0 = base - alto;
  for (let i = 0; i < W; i++) { const dy = Math.round(Math.sin(t * 9 - i * 0.55) * (i / W) * 2 * viento);
    for (let j = 0; j < A; j++) { let c;
      if (cual === 'eg') c = j < 4 ? hex('#ce1126') : j < 8 ? C.blanco : hex('#1a1a1a');
      else if (cual === 'fr') c = i < 6 ? hex('#1a4aa4') : i < 12 ? C.blanco : hex('#e8383a');
      else c = Math.hypot(i - 8.5, j - 5.5) < 3.6 ? hex('#c8102e') : C.blanco;
      if (cual === 'eg' && j >= 4 && j < 8 && Math.abs(i - 9) < 2) c = hex('#c8a030');
      if (i === W - 1 || j === 0 || j === A - 1) c = mix(c, C.k, 0.45);
      pset(x + 1 + i, y0 + j + dy, c); }
    pset(x + 1 + i, y0 + A + dy, mix(R.pget(x + 1 + i, y0 + A + dy), C.k, 0.4)); }
};
const p2 = (t) => {
  R.copiar(fondoMesa());
  // el vapor de la taza y el ventilador que oscila
  rect(200, 154, 212, 168, C.k); rect(201, 155, 211, 167, hex('#e8e4dc')); rect(212, 158, 215, 163, C.k); rect(201, 155, 211, 156, hex('#5a3a20'));
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; ps(206 + Math.sin(t * 2 + k) * 2 * f, 150 - f * 18, f < 0.5 ? C.blanco : hex('#d8d0c0')); }
  const osc = Math.sin(t * 1.2), fx = 290, fy = 132;
  rect(fx - 8, 162, fx + 8, 166, C.k); rect(fx - 7, 163, fx + 7, 165, hex('#4a5a6a')); rect(fx - 1, 144, fx + 1, 162, hex('#5a6a7a'));
  disco(fx + Math.round(osc * 2), fy, 12, C.k); disco(fx + Math.round(osc * 2), fy, 11, hex('#9aaab8')); disco(fx + Math.round(osc * 2), fy, 9, hex('#c8d4dc'));
  for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.09; linea(fx + osc * 2, fy, fx + osc * 2 + Math.cos(a) * 8 * (0.6 + 0.4 * Math.abs(osc)), fy + Math.sin(a) * 8, hex('#5a6a7a')); }
  disco(fx + Math.round(osc * 2), fy, 2, C.k);
  for (let r = 0; r < 11; r += 2) pset(fx + osc * 2 + r * Math.cos(r), fy + r * Math.sin(r * 0.7) * 0.4, hex('#7a8a98'));
  const viento = 0.6 + 0.6 * Math.max(0, -osc) + 0.6 * tramo(t, france, france + 0.2) * (1 - tramo(t, france + 0.8, france + 1.2));
  const fr = tramo(t, w(6.85), w(7.15)), salta = fr > 0 && fr < 1 ? 0 : 0;
  banderita(130, 152, 30, 'eg', t, viento);
  banderita(166, 152, Math.round(30 * Math.min(1, fr * 1.15) - (fr > 0.85 && fr < 1 ? (1 - fr) * 10 : 0)) + salta, 'fr', t + 0.4, viento);
  // la de Japón: una mano la trae y la planta en «Japan»
  T.PIEZAS_GZ.detectorMuones(R, 256, 152, { t });
  const ll = tramo(t, japan - 0.6, japan), su = tramo(t, japan + 0.3, japan + 0.9);
  if (ll > 0) {
    const bx = 202, by = Math.round(lerp(200, 152, 1 - (1 - ll) ** 2));
    banderita(bx, by, 30, 'jp', t + 0.8, viento * (ll < 1 ? 0.3 : 1));
    // la mano sube desde abajo con la banderita cogida por la base y la planta en la mesa
    if (su < 1) { const wx = bx + 12 + su * 6, wy = Math.round(lerp(by + 2, 200, su)); T.brazo(R, bx + 34, 214, wx, wy, '#3a6aa0', -1, { codo: [bx + 30, Math.max(wy + 14, 184)] }); }
  }
};
// ── plano 3: la Cámara de la Reina ──
const p3 = (t) => {
  const o = { encuadre: 'reina', muones: 0.85 * tramo(t, queen - 0.2, P4 - 0.6) };
  T.keops(R, t, o);
  const u = tramo(t, P3 + 0.05, films - 0.1), deja = t > films;
  if (deja) T.PIEZAS_GZ.placaEmulsion(R, 100, 153, { luz: tramo(t, queen, P4) * 0.6 });
  const a = R.actor(EL.cientificoJapones, Math.round(lerp(66, 116, u)), 152, t, { dir: deja ? -1 : 1, anda: u > 0 && u < 1, sostiene: deja ? null : true, sorpresa: t > queen + 0.1, sonrisa: t > films && t < queen });
  if (!deja && a && a.mano) T.PIEZAS_GZ.placaEmulsion(R, a.mano[0] + 2, a.mano[1] + 7, {});
  const f = R.actor(EL.cientificaFrancesa, 210, 156, t, { dir: -1, dedo: t > dets - 0.3 && t < queen, sorpresa: t > queen + 0.3, habla: t > P3 + 0.3 && t < dets - 0.4 && Math.sin(t * 8) > 0 });
  if (t > dets && t < dets + 0.5) { R.anillo(183, 145, Math.round(4 + (t - dets) * 16), hex('#9aff9a'), 0); }
  T.keopsDelante(R, t, o);
};
// ── plano 4: fuera, al pie de Keops: los detectores de gas ──
const detGas = (x, y, t, k) => {
  for (const dx of [-14, 14]) { linea(x + dx, y, x + dx - 2, y - 6, C.k); linea(x + dx + 1, y, x + dx - 1, y - 6, hex('#7a7a84')); }
  rect(x - 18, y - 16, x + 18, y - 6, C.k); rect(x - 17, y - 15, x + 17, y - 7, hex('#a8acb4')); rect(x - 17, y - 15, x + 17, y - 14, hex('#d4d8e0')); rect(x - 17, y - 8, x + 17, y - 7, hex('#6a6e78'));
  rect(x - 15, y - 19, x + 15, y - 16, C.k); rect(x - 14, y - 18, x + 14, y - 17, hex('#3a7ab8')); pset(x - 10, y - 18, hex('#8ac8f0'));
  for (let i = 0; i < 4; i++) { const on = Math.sin(t * 5 + i * 1.7 + k) > 0; pset(x - 12 + i * 4, y - 11, on ? (i === 3 ? hex('#ff6a4a') : hex('#6aff6a')) : hex('#3a3a3a')); }
  rect(x + 6, y - 12, x + 14, y - 10, hex('#1a1a20'));
};
const p4 = (t) => {
  const o = { encuadre: 'cementerio', hora: 'dia', ele: 0 };
  T.giza(R, t, o);
  // los cables hasta la mesa
  for (let x = 108; x < 250; x++) pset(x, 160 + Math.round(Math.sin(x * 0.2) * 1), x < 170 ? hex('#e07a2a') : hex('#c86a20'));
  detGas(92, 162, t, 0); detGas(150, 162, t, 2);
  // en la pantalla de la mesa: las barras suben en «November 2017»
  const b = tramo(t, nov - 0.1, nov + 0.6);
  R.recorte([255, 129, 293, 145]); for (let y = 129; y <= 145; y++) for (let x = 255; x <= 293; x++) pset(x, y, (x + y) % 9 === 0 ? hex('#163a2a') : hex('#0a1e16'));
  for (let k = 0; k < 7; k++) { const a = Math.round((3 + [3, 5, 4, 9, 14, 6, 4][k] * b) * (0.9 + 0.1 * Math.sin(t * 4 + k))); for (let y = 145 - a; y <= 144; y++) for (let x = 258 + k * 5; x <= 260 + k * 5; x++) pset(x, y, k === 4 ? C.muon : hex('#5ae0a0')); }
  R.recorte(null);
  // el técnico trae el carrete y lo deja en «foot»; la francesa mira la pantalla
  const u = tramo(t, P4 + 0.05, foot - 0.1), deja = t > foot;
  const a = R.actor(EL.tecnicoEgipcio, Math.round(lerp(-14, 122, u)), 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: deja ? null : true, dedo: t > foot + 0.3 && t < nov, sonrisa: t > nov + 0.4 });
  const carrete = (x, y) => { disco(x, y - 6, 6, C.k); disco(x, y - 6, 5, hex('#a07040')); disco(x, y - 6, 3, hex('#e07a2a')); disco(x, y - 6, 1, hex('#5a3a20')); };
  if (!deja && a && a.mano) carrete(a.mano[0] + 2, a.mano[1] + 6); else if (deja) carrete(134, 162);
  R.actor(EL.cientificaFrancesa, 226, 162, t, { dir: 1, brazos: t > nov + 0.2 && t < nov + 1.4, sonrisa: t > nov + 0.2, habla: t < nov - 0.3 && Math.sin(t * 7) > 0.3 });
  T.gizaDelante(R, t, o);
};
// ── plano 5: la revista científica cae sobre una mesa de lectura (LOCAL; no es la redacción de la retirada) ──
const fondoLectura = () => capa('lectura', () => {
  // la librería del fondo: baldas de tomos de colores, con sus lomos sin letras
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(H('#2a1a10 #3a2414 #4a2e1a #5a3a22'), 1.6 + (h(x >> 2, y >> 2, 41) - 0.5) * 0.5, x, y));
  // la cornisa de arriba, tallada y tranquila (debajo van la barra del año y Atom)
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(H('#3a2414 #4a2e1a #5a3a22 #6a4628'), 1.4 + (y === 10 ? 1.5 : 0) + (y === 11 ? -1.4 : 0) + (h(x >> 3, y, 49) - 0.5) * 0.3, x, y));
  for (const yb of [30, 62, 94]) { rect(0, yb, 319, yb + 4, hex('#6a4426')); rect(0, yb, 319, yb, hex('#9a6a3e')); rect(0, yb + 4, 319, yb + 5, hex('#1e120a'));
    let x = 4; let k = 0; while (x < 316) { const wl = 4 + Math.floor(h(k, yb, 42) * 4), al = 20 + Math.floor(h(k, yb, 43) * 8); if (x > 262 && yb === 30) break;
      const c = [hex('#7a2a2a'), hex('#2a4a6a'), hex('#2a5a3a'), hex('#8a6a2a'), hex('#5a3a6a'), hex('#a04a2a'), hex('#3a3a46')][Math.floor(h(k, yb, 44) * 7)];
      if (h(k, yb, 45) > 0.93) { x += 8; k++; continue; }
      if ((yb === 30 && x < 192) || (yb === 62 && x > 266)) { x += 4; k++; continue; }
      rect(x, yb - al, x + wl - 1, yb - 1, c); linea(x, yb - al, x, yb - 1, mix(c, C.blanco, 0.25)); linea(x + wl - 1, yb - al, x + wl - 1, yb - 1, mix(c, C.k, 0.4));
      rect(x, yb - al + 3, x + wl - 1, yb - al + 4, hex('#c8a040')); rect(x, yb - 6, x + wl - 1, yb - 5, hex('#c8a040')); x += wl + (h(k, yb, 46) > 0.85 ? 2 : 0); k++; } }
  // la mesa: tablero de madera con el cuero verde y su filo dorado
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(MAD, 2.4 + Math.sin(x * 0.06 + y * 0.8) * 0.4 + (h(x >> 3, y, 47) - 0.5) * 0.4 - (y === 100 ? 2 : 0), x, y));
  rect(40, 112, 280, 172, hex('#c8a040'));
  for (let y = 113; y < 172; y++) for (let x = 41; x < 280; x++) pset(x, y, tono(H('#123a26 #1a4a30 #22583a #2c6644'), 1.8 + (h(x >> 1, y >> 1, 48) - 0.5) * 0.9 - (y - 113) * 0.008, x, y));
  // la lámpara de banquero, un montón de revistas, las gafas, la taza
  rect(52, 140, 76, 144, C.k); rect(53, 141, 75, 143, hex('#b08a3a')); rect(63, 116, 65, 140, hex('#b08a3a'));
  poligono([[46, 108], [82, 108], [78, 118], [50, 118]], hex('#1e5a3a')); linea(46, 108, 82, 108, hex('#4a9a6a')); rect(50, 118, 78, 119, hex('#fff0b0'));
  for (let k = 0; k < 5; k++) { const y = 150 - k * 3; rect(226 + k, y, 270 + k, y + 3, C.k); rect(227 + k, y + 1, 269 + k, y + 2, [hex('#e8e4dc'), hex('#c8d4e0'), hex('#f0e2c8'), hex('#d8e0d0'), hex('#e8e8f0')][k]); }
  rect(92, 160, 98, 164, C.k); rect(102, 160, 108, 164, C.k); linea(98, 162, 102, 162, C.k); rect(93, 161, 97, 163, hex('#a8c8e0')); rect(103, 161, 107, 163, hex('#a8c8e0'));
  rect(206, 148, 218, 162, C.k); rect(207, 149, 217, 161, hex('#e8e4dc')); rect(218, 152, 221, 157, C.k); rect(207, 149, 217, 150, hex('#5a3a20'));
});
const portada = (x, y, s, luz) => {
  // la revista: portada blanca con una franja azul arriba y la foto de la pirámide con el vacío que brilla (sin letras)
  rect(x - 1, y - 1, x + 40, y + 52, C.k); rect(x, y, x + 39, y + 51, C.blanco); rect(x, y, x + 39, y + 8, hex('#1e3a6a'));
  for (let k = 0; k < 6; k++) rect(x + 4 + k * 5, y + 3, x + 6 + k * 5, y + 5, hex('#c8d8f0'));
  for (let j = 12; j < 44; j++) for (let i = 4; i < 36; i++) pset(x + i, y + j, j < 30 ? hex('#7aa4d0') : hex('#d8b878'));
  for (let j = 14; j < 40; j++) { const ww = (j - 14) * 0.62; for (let i = Math.round(20 - ww); i <= Math.round(20 + ww); i++) pset(x + i, y + j, i < 20 + ww * 0.2 ? hex('#d4b47a') : hex('#a08050')); }
  for (let i = 14; i < 26; i++) { const yy = y + 26 - Math.round((i - 14) * 0.4); pset(x + i, yy, luz > 0.5 ? C.blanco : hex('#fff0c0')); pset(x + i, yy + 1, hex('#ffd060')); }
  for (let k = 0; k < 3; k++) rect(x + 4, y + 46 + k * 2, x + 30 - k * 6, y + 46 + k * 2, hex('#b8b8c0'));
};
const p5 = (t) => {
  R.copiar(fondoLectura());
  // la luz de la lámpara y el vapor de la taza
  for (let y = 120; y < 150; y++) for (let x = 44; x < 86; x++) if (Math.abs(x - 64) < (y - 116) * 0.8 && bay(x, y) < 0.22) pset(x, y, mix(R.pget(x, y), hex('#fff0b0'), 0.35));
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; ps(212 + Math.sin(t * 2 + k) * 2 * f, 144 - f * 18, f < 0.5 ? C.blanco : hex('#c8c0b0')); }
  // la revista cae sobre la mesa en «published», rebota un poco y levanta polvo; en «Nature» la foto se enciende
  const c = tramo(t, pub - 0.35, pub), y = c < 1 ? Math.round(lerp(-60, 112, c * c)) : 112 - Math.round(Math.max(0, Math.sin((t - pub) * 14)) * 3 * Math.exp(-(t - pub) * 5));
  if (c > 0) { if (c >= 1) rect(141, 165, 182, 166, hex('#0c2a1a')); portada(140, y, 1, tramo(t, nature, nature + 0.3)); }
  if (t > pub && t < pub + 0.7) { const e = (t - pub) / 0.7; for (let k = 0; k < 8; k++) { const dx = (k < 4 ? -1 : 1) * (6 + e * 18 + (k % 4) * 4), dy = -e * 6 - (k % 3) * 2; ps(160 + dx, 164 + dy, e < 0.5 ? hex('#e8e0c8') : hex('#a8a090')); } }
  if (t > nature && t < nature + 1) { const f = (t - nature); R.anillo(160, 138, Math.round(6 + f * 22), f < 0.5 ? C.blanco : hex('#fff0c0'), 2); }
};
// ── plano 6: la Gran Galería: el vacío se enciende ──
const p6 = (t) => {
  const o = { encuadre: 'reina', camara: 'galeria', vacio: tramo(t, huge - 0.15, vacioT + 0.25), muones: 0.35 };
  const g = T.keops(R, t, o), su = (x) => (g && g.sueloEn ? g.sueloEn(x) : 166 - Math.max(0, x - 96) * 0.4);
  R.actor(EL.cientificoJapones, 48, 166, t, { dir: 1, sorpresa: t > vacioT, habla: t < huge && Math.sin(t * 7) > 0.3 });
  R.actor(EL.cientificaFrancesa, 76, 166, t, { dir: 1, dedo: t > treinta - 0.3, sorpresa: t > vacioT && t < treinta - 0.3, sonrisa: t > treinta + 0.5 });
  T.keopsDelante(R, t, o);
  // el destello del golpe
  if (t > vacioT && t < vacioT + 0.45) T.tinte(R, 0, 179, [255, 246, 220], 0.4 * (1 - (t - vacioT) / 0.45));
  // la cota de treinta metros, paralela al vacío, que se dibuja
  const c = tramo(t, treinta - 0.45, treinta);
  if (c > 0) { const x0 = 112, x1 = Math.round(lerp(112, 252, c)), off = 16, y0 = su(x0) - 96 + off, y1 = su(x1) - 96 + off;
    linea(x0, y0 + 1, x1, y1 + 1, C.k); linea(x0, y0, x1, y1, C.blanco); linea(x0, y0 - 4, x0, y0 + 4, C.blanco);
    if (c >= 1) { linea(252, su(252) - 96 + off - 4, 252, su(252) - 96 + off + 4, C.blanco); const mx = 186, my = Math.round(su(mx) - 96 + off + 14); rect(mx - 12, my - 13, mx + 12, my + 2, C.k); rect(mx - 11, my - 12, mx + 11, my + 1, hex('#2a1e14')); R.numero('30', mx, my, { centro: true }); } }
};
const efectos = [[began, 'sello'], [w(6.85), 'pop'], [japan, 'toc'], [films, 'toc'], [dets, 'bip'], [foot, 'toc'], [nov, 'bip'], [pub, 'papel'], [nature, 'brillo'], [vacioT, 'brillo'], [treinta - 0.4, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2017', efectos, año: (t) => t < nov ? 2015 : 2017 });
''')
