E = {}

E['dc-gancho'] = ('Gancho', '''// DC-GANCHO (frases 1–2), sin cartela; barra del año 1958 → 2000 → 2026. Ocho planos:
// 1. (0–6,5 s) la pizarra de 1958: una mano con tiza pone el cohete en marcha desde la Tierra; el cohete de tiza vuela
//    por la trayectoria punteada y llega a la Luna en «moon»: estalla un destello DIBUJADO con tiza (rayos de tiza y la
//    nube de polvo que brilla al Sol), nada de explosión real (golpe en 'luna'). Corta en «so».
// 2. (6,5–11,2) por el telescopio: el ocular se abre; un trazo punteado de tiza cruza hasta la Luna y en «flash» brilla
//    el destello dibujado en la línea del día y la noche; en «conspiracy theory», un «?» enorme. Corta en «but».
// 3. (11,2–15,6) la redacción de Londres en 2000: Reiffel, ya mayor, entra y se lo cuenta al periodista (bocadillo con la
//    Luna y el cohete); el periodista apunta y en «2000» se sorprende («!»). Corta en «and one of his».
// 4. (15,6–22,6) hoy, la mesa de Atom: la carpeta de la Luna abierta; se escriben las cuentas y en «Carl Sagan» entra la
//    foto del joven Sagan con su regla; en «the Moon isn't the strangest file» la carpeta se cierra y el gato espía cruza
//    la mesa y se sienta encima (gag 1). Corta en «Along».
// 5. (22,6–27,7) inserto, mesa de nogal desde arriba: se abre la carpeta del gato («cat») y el sello cae en «microphone»;
//    se abre la de la gallina («bomb») y en «chickens» rueda un huevo y sale una pluma; sello. Corta en «spies».
// 6. (27,7–32,0) inserto, mesa de luz: la carpeta del ojo se abre y echa ondas («see things far away»); en «rubber tanks»
//    un tanque de goma se infla desplegable en la otra carpeta y se balancea. Corta en «an aircraft».
// 7. (32,0–36,4) inserto, mesa de acero con escarcha: la carpeta del barco de hielo se abre, el bloque de hielo gotea y la
//    escarcha se extiende en «ice»; dos sellos en «real» y «secret». Corta tras «secret».
// 8. (36,4–40,0) inserto, la caja de archivo de frente: la mano deja la última carpeta, la tapa baja y en «joke» el sello
//    cae sobre la tapa; una pluma de la gallina se escapa por la rendija.''', r'''
const a = (f) => en('luna', f), b = (f) => en('archivos', f);
const P2 = a(0.325), P3 = a(0.584), P4 = a(0.824), P5 = b(0.119), P6 = b(0.407), P7 = b(0.640), P8 = b(0.886);
const LUNA = a(0.286), FLASH = a(0.411), CONSP = a(0.508), CUENTA = a(0.67), DOSMIL = a(0.767), NUMEROS = a(0.86), CARL = a(0.94);
const NOES = b(0.010), FILE = b(0.075), GATO = b(0.181), MICRO = b(0.211), BOMBA = b(0.269), POLLOS = b(0.358);
const VER = b(0.473), LEJOS = b(0.502), GOMA = b(0.593), HIELO = b(0.647), ICE = b(0.72), REAL = b(0.802), SECRET = b(0.858), JOKE = b(0.966);
const { rect, pset, linea, disco, poligono } = R;
const K = hex('#14121a'), TIZA = hex('#e8ece4'), TIZAS = hex('#a8b4a8'), AMA = hex('#f8e070'), AMAS = hex('#e0a030');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16), bay = (x, y) => B4[(y & 3) * 4 + (x & 3)];
const ramp = (r, v, x, y) => { const n = r.length - 1, f = Math.max(0, Math.min(n, v * n)), i = Math.floor(f); return r[Math.min(n, i + (f - i > bay(x, y) ? 1 : 0))]; };
const capas = new Map();
const capa = (k, dib) => { let bf = capas.get(k); if (!bf) { bf = R.nuevo(); const prev = R.usar(bf); R.recorte(null); dib(); R.recorte(null); R.usar(prev); capas.set(k, bf); } return bf; };
const poner = (bf) => { const d = R.usar(bf); R.usar(d); d.set(bf); };
// la carpeta de PIEZAS_DC a escala s que se abre (u 0–1): la tapa gira sobre el lomo del centro; cerrada, tapa la hoja
const CARP = hex('#d8c8a0'), CARPS = hex('#a8946a'), CARPL = hex('#ece0bc'), CARPD = hex('#8a744a');
const carpeta = (cx, base, s, u, dib, o = {}) => {
  const w = 17 * s, hgt = 15 * s, y0 = base - hgt;
  const sx0 = u <= 0 ? cx - 1 : cx - w; for (let k = sx0; k <= cx + w + 2; k++) if ((k + base) % 2 === 0 || k > cx + w - 2) pset(k + 1, base + 1, K);
  if (u >= 1) { T.PIEZAS_DC.carpeta(R, cx, base, { s, abierta: true, dibujo: dib, sello: o.sello ?? false }); return; }
  // cerrada: el lado derecho; la tapa vuelve hacia la izquierda
  if (u <= 0) { T.PIEZAS_DC.carpeta(R, cx + Math.round(8.5 * s), base, { s, dibujo: dib, sello: o.selloTapa ?? true }); return; }
  T.PIEZAS_DC.carpeta(R, cx, base, { s, abierta: true, dibujo: dib, sello: false });
  const ex = Math.round(cx + w * Math.cos(Math.PI * u)), lev = Math.round(Math.sin(Math.PI * u) * 3 * s);
  const fuera = ex > cx;
  poligono([[cx, y0], [ex, y0 - lev], [ex, base - lev], [cx, base]], fuera ? CARP : CARPL);
  linea(cx, y0, ex, y0 - lev, K); linea(cx, base, ex, base - lev, K); linea(ex, y0 - lev, ex, base - lev, K);
  if (fuera) linea(ex - 1, y0 - lev + 1, ex - 1, base - lev - 1, CARPS); else linea(ex + 1, y0 - lev + 1, ex + 1, base - lev - 1, CARPS);
};
// la marca roja del sello (círculo con raya), a escala s, centrada en (x, y)
const marca = (x, y, s, v = 1) => { if (v > 0) T.PIEZAS_DC.sello(R, x, y + Math.round(3.5 * s), { tipo: 'marca', s }); };
// la mano que sella: el brazo canónico desde abajo a la derecha, con el sello en el puño; p 0–1 baja y vuelve a subir
const sellar = (mx, my, p, manga = '#3a4a6a') => {
  if (p <= 0 || p >= 1) return;
  const ent = Math.min(1, p / 0.35), sal = Math.max(0, (p - 0.75) / 0.25), baja = p > 0.35 && p < 0.75 ? Math.sin((p - 0.35) / 0.4 * Math.PI) : 0;
  const fuera = 70 * (1 - ent) + 70 * sal;
  const sx = mx, base = Math.round(my + 10 - 10 + (1 - baja) * -8 + fuera);
  T.PIEZAS_DC.sello(R, sx, base + 10, { s: 3 });
  const wx = sx + 8, wy = base - 30;
  T.brazo(R, wx + 30, wy + 66, wx, wy, manga, -1, { codo: [wx + 24, wy + 30], sombra: false });
};
const golpeSello = (x, y, t, t0) => { const d = t - t0; if (d < 0 || d > 0.35) return; const r = Math.round(14 + d * 40); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.6), hex('#f4ecd8')); pset(Math.round(x + Math.cos(an) * (r - 2)), Math.round(y + Math.sin(an) * (r - 2) * 0.6), hex('#c8b890')); } };
// el destello de tiza: rayos discontinuos que crecen y titilan (dibujado, sin fuego)
const destello = (x, y, u, t, c1 = AMA, c2 = TIZA, L = 16) => {
  if (u <= 0) return;
  const r = L * Math.min(1, u * 1.6), tw = 1 + 0.15 * Math.sin(t * 18);
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6 + 0.13, rr = (k % 2 ? 0.55 : 1) * r * tw; for (let q = 4; q < rr; q += 1) if (Math.floor(q) % 4 !== 3) pset(Math.round(x + Math.cos(an) * q), Math.round(y + Math.sin(an) * q), k % 2 ? c2 : c1); }
  disco(x, y, Math.max(1, Math.round(3 * Math.min(1, u * 2))), c2); pset(x, y, AMA);
};

// 1 · la pizarra: la mano lanza el cohete de tiza; llega a la Luna en «moon» y sale el destello dibujado
const p1 = (t) => {
  const vuelo = tramo(t, 1.1, LUNA - 0.05), nube = tramo(t, LUNA, LUNA + 0.9);
  T.carrera(R, t, { encuadre: 'laboratorio', camara: 'pizarra', cohete: 0, nube: Math.min(0.58, nube) });
  // el cohete de tiza grande (el doble que el del decorado) con su estela, sobre la trayectoria punteada
  const bz = (v) => { const A = (1 - v) * (1 - v), Bq = 2 * (1 - v) * v, Cq = v * v; return [A * 52 + Bq * 140 + Cq * 215, A * 132 + Bq * 30 + Cq * 52]; };
  if (vuelo > 0 && vuelo < 1) {
    for (let i = 0; i < 50 * vuelo; i++) { const [x, y] = bz(i / 50); if (i % 2 === 0 && i < 50 * vuelo - 4) disco(Math.round(x), Math.round(y), 1, TIZAS); }
    const [x, y] = bz(vuelo), [x2, y2] = bz(Math.min(1, vuelo + 0.02)), an = Math.atan2(y2 - y, x2 - x), ca = Math.cos(an), sa = Math.sin(an);
    const Q = (i, j) => [Math.round(x + ca * i - sa * j), Math.round(y + sa * i + ca * j)];
    for (let i = -12; i <= 9; i++) { const ww = i > 4 ? Math.max(0, (9 - i) * 0.9) : 4; for (let j = -ww; j <= ww; j += 0.5) { const [px, py] = Q(i, j); pset(px, py, Math.abs(Math.abs(j) - ww) < 0.6 || i === -12 ? TIZA : hex('#3a5a48')); } }
    for (const [i, j] of [[-12, -7], [-11, -6], [-10, -5], [-12, 7], [-11, 6], [-10, 5], [-9, 4], [-9, -4]]) { const [px, py] = Q(i, j); pset(px, py, TIZA); }
    const [wx0, wy0] = Q(1, 0); disco(wx0, wy0, 2, TIZA); pset(wx0, wy0, hex('#3a5a48'));
    for (let k = 0; k < 5; k++) { const [px, py] = Q(-14 - k * 2 - (Math.floor(t * 10) % 2) * 2, (k % 2 ? 2 : -2) * Math.min(1, k / 2)); pset(px, py, AMA); pset(px - 1, py, AMAS); }
  }
  const dz = tramo(t, LUNA - 0.02, LUNA + 0.5);
  destello(215, 54, dz, t, AMA, TIZA, 22);
  // la mano con la tiza: dibuja la salida (0,5–1,2 s) y se retira
  const sube = tramo(t, 0.3, 0.7), retira = tramo(t, 1.3, 2.0), traza = tramo(t, 0.6, 1.2);
  if (sube > 0 && retira < 1) {
    const wx = Math.round(lerp(30, 44, traza)), wy = Math.round(lerp(150, 140, traza) + (1 - sube) * 50 + retira * 60);
    rect(wx + 9, wy - 3, wx + 14, wy - 1, TIZA); pset(wx + 14, wy - 2, TIZAS);
    T.brazo(R, wx - 26, wy + 52, wx, wy, '#e8e8e0', 1, { codo: [wx - 20, wy + 22], sombra: false });
  }
};
// 2 · por el telescopio: el ocular se abre, el trazo de tiza cruza y el destello brilla en «flash»; «?» en «conspiracy»
const p2 = (t) => {
  T.carrera(R, t, { encuadre: 'observatorio', camara: 'luna' });
  R.recorte([84, 18, 230, 166]);
  const tr = tramo(t, P2 + 0.3, FLASH - 0.05);
  for (let k = 0; k < 40 * tr; k++) { const u = k / 40, x = lerp(96, 192, u), y = lerp(160, 82, u) - Math.sin(u * Math.PI) * 26; if (k % 2 === 0) { disco(Math.round(x), Math.round(y), 1, TIZA); } }
  R.recorte(null);
  destello(192, 82, tramo(t, FLASH - 0.05, FLASH + 0.35), t, AMA, TIZA, 18);
  const q = tramo(t, CONSP, CONSP + 0.25);
  if (q > 0) R.numero('?', 214, Math.round(lerp(64, 56, q)), { tam: 16, centro: true });
  // el iris del ocular que se abre al principio
  const ab = tramo(t, P2, P2 + 0.6);
  if (ab < 1) { const r = 6 + ab * 80; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (Math.hypot(x - 156, y - 92) > r) pset(x, y, K); }
};
// 3 · la redacción de 2000: Reiffel mayor entra y se lo cuenta al periodista
const p3 = (t) => {
  T.carrera(R, t, { encuadre: 'redaccion' });
  const u = tramo(t, P3 + 0.1, P3 + 1.5), rx = Math.round(lerp(326, 226, u));
  const habla = u >= 1 && Math.sin(t * 9) > -0.2;
  R.actor(EL.periodista2000, 100, 141, t, { dir: 1, habla: false, sorpresa: t > DOSMIL && t < DOSMIL + 1.2, sonrisa: t > DOSMIL + 1.2, dedo: t > CUENTA && t < DOSMIL && Math.sin(t * 6) > 0 });
  R.actor(EL.reiffelMayor, rx, 160, t, { dir: -1, anda: u > 0 && u < 1, habla, dedo: t > a(0.72) && t < a(0.8), sonrisa: t > DOSMIL });
  T.carreraDelante(R, t, { encuadre: 'redaccion' });
  // el bocadillo con la Luna y el cohete
  const bo = tramo(t, CUENTA - 0.3, CUENTA);
  if (bo > 0 && t < P4 - 0.15) {
    const bx = 190, by = Math.round(lerp(140, 128, bo));
    rect(bx - 1, by - 23, bx + 41, by + 1, K); rect(bx, by - 22, bx + 40, by, hex('#f8f6ee')); rect(bx + 1, by - 1, bx + 40, by, hex('#d8d4c8'));
    poligono([[bx + 28, by], [bx + 36, by], [bx + 34, by + 7]], K); poligono([[bx + 29, by], [bx + 35, by], [bx + 34, by + 5]], hex('#f8f6ee'));
    disco(bx + 30, by - 11, 7, K); disco(bx + 30, by - 11, 6, hex('#e8e4d0')); disco(bx + 28, by - 13, 2, hex('#b8b4a0')); disco(bx + 32, by - 8, 1, hex('#b8b4a0'));
    const cu = (t * 0.6) % 1, cx = Math.round(bx + 6 + cu * 14), cy = Math.round(by - 4 - cu * 6);
    linea(bx + 4, by - 3, cx, cy, hex('#a8a8a8')); rect(cx, cy - 1, cx + 3, cy, hex('#c83030')); pset(cx + 4, cy - 1, K);
  }
  if (t > DOSMIL && t < DOSMIL + 1.2) R.numero('!', 107, 108 - Math.round(tramo(t, DOSMIL, DOSMIL + 0.2) * 4), { tam: 8, centro: true });
};
// 4 · hoy, en la mesa de Atom: la carpeta de la Luna abierta, las cuentas, la foto de Sagan; el gato se sienta encima
const p4 = (t) => {
  const geo = T.hoy(R, t, { encuadre: 'archivo', camara: 'mesa', carpetas: [], sello: false });
  const cierra = tramo(t, NOES, NOES + 0.4), cx = 150, base = 158;
  carpeta(cx, base, 4, 1 - cierra, 'luna', { sello: true });
  // las cuentas de Sagan en la hoja
  if (cierra === 0) {
    const n = tramo(t, NUMEROS - 0.4, NUMEROS + 0.6);
    const filas = [['384', 158], ['2', 158], ['16', 158]];
    filas.forEach(([s, xx], i) => { const v = tramo(n, i / 3, (i + 1) / 3); if (v > 0) R.numero(s, xx + 8, 116 + i * 12, { n: Math.ceil(v * s.length * 8), color: hex('#2a3a7a'), sombra: false }); });
    // la foto del joven Sagan con su regla, que entra en «Carl»
    const f = tramo(t, CARL - 0.5, CARL);
    if (f > 0) {
      const fx = Math.round(lerp(330, 222, f)), fy = 100;
      rect(fx - 1, fy - 1, fx + 33, fy + 41, K); rect(fx, fy, fx + 32, fy + 40, hex('#f4f0e4'));
      rect(fx + 3, fy + 3, fx + 29, fy + 31, hex('#5a7aa8')); rect(fx + 3, fy + 24, fx + 29, fy + 31, hex('#6a5a4a'));
      R.recorte([fx + 3, fy + 3, fx + 29, fy + 31]);
      R.actor(EL.sagan, fx + 9, fy + 33, t, { dir: -1, sonrisa: true, quieto: true });
      R.recorte(null);
      rect(fx + 3, fy + 32, fx + 29, fy + 33, hex('#f4f0e4'));
      rect(fx + 12, fy - 3, fx + 20, fy + 1, hex('#c8b8a0')); rect(fx + 12, fy - 3, fx + 20, fy - 3, hex('#a89880'));
    }
  }
  // el gato espía cruza la mesa y se sienta en la carpeta cerrada (gag 1)
  const g = tramo(t, NOES + 0.2, FILE - 0.05);
  if (g > 0) {
    if (g < 1) T.gatoEspia(R, Math.round(lerp(-14, cx + 30, g)), base - 4, t, { anda: true, s: 2, microfono: true });
    else { T.gatoEspia(R, cx + 34, base - 52, t, { s: 2, cara: t > FILE + 0.4 ? 'travieso' : undefined, microfono: true }); }
  }
};
// los insertos: fondos locales (búfer) con su vida
const fondoNogal = () => capa('nogal', () => {
  const W = [hex('#2a160c'), hex('#3a2214'), hex('#4e2e1a'), hex('#64391f'), hex('#7a4a28')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const g = Math.sin(y * 0.42 + Math.sin(x * 0.021 + y * 0.03) * 2.6 + hh(0, Math.floor(y / 30)) * 6), vig = Math.hypot((x - 160) / 200, (y - 120) / 150);
    const v = 0.62 + 0.18 * g + 0.08 * hh(x >> 1, y) - vig * 0.5 - (x > 268 && y < 50 ? 0.12 : 0);
    pset(x, y, ramp(W, v, x, y));
    if (y % 46 === 0) pset(x, y, W[0]);
  }
  // el cartapacio de piel verde con su filete
  const G = [hex('#1a3424'), hex('#24462e'), hex('#2e5a3a'), hex('#3a6a46')];
  rect(14, 58, 306, 179, K);
  for (let y = 59; y < 180; y++) for (let x = 15; x < 306; x++) pset(x, y, ramp(G, 0.55 + 0.2 * hh(x >> 1, y >> 1, 3) - Math.hypot((x - 160) / 260, (y - 130) / 160) * 0.5, x, y));
  rect(18, 62, 302, 62, hex('#b8943a')); rect(18, 62, 18, 179, hex('#b8943a')); rect(302, 62, 302, 179, hex('#b8943a'));
  for (const [x0, s] of [[15, 1], [305, -1]]) poligono([[x0, 59], [x0 + s * 24, 59], [x0, 83]], hex('#5a2e1a'));
  // el lápiz, los clips, las fichas, la regla
  poligono([[22, 30], [92, 16], [93, 20], [23, 34]], hex('#e8b830')); linea(22, 34, 93, 20, hex('#b88a20')); poligono([[92, 16], [100, 16], [93, 20]], hex('#e8c8a0')); pset(99, 16, K);
  rect(20, 30, 24, 34, hex('#e86a7a'));
  for (const [x, y] of [[120, 30], [130, 36], [142, 28]]) { rect(x, y, x + 8, y + 3, hex('#a8acb8')); rect(x + 1, y + 1, x + 7, y + 2, W[2]); }
  rect(160, 20, 196, 44, K); rect(161, 21, 195, 43, hex('#f0ead8')); for (let y = 25; y < 42; y += 3) linea(164, y, 192, y, hex('#a8c8e0')); linea(164, 23, 192, 23, hex('#e86a6a'));
  rect(204, 22, 256, 28, K); rect(205, 23, 255, 27, hex('#d8c070')); for (let x = 207; x < 255; x += 3) pset(x, 23, K);
  // la taza en su platillo (vista desde arriba)
  disco(240, 44, 13, K); disco(240, 44, 12, hex('#d8d4cc')); disco(240, 44, 10, hex('#b8b4ac')); disco(240, 44, 9, K); disco(240, 44, 8, hex('#f4f2ec')); disco(240, 44, 6, hex('#4a2a14')); disco(238, 42, 2, hex('#8a5a30')); pset(237, 41, hex('#c8a070'));
  rect(249, 41, 255, 47, K); rect(250, 42, 254, 46, hex('#f4f2ec')); rect(251, 43, 253, 45, hex('#b8b4ac'));
  // sobre el cartapacio: el sobre con su cordel rojo, la foto de un gato con su clip, las gafas, el tampón de tinta y la pluma
  rect(28, 70, 84, 104, K); rect(29, 71, 83, 103, hex('#c8a46a')); poligono([[29, 71], [56, 88], [83, 71]], hex('#b08a50')); linea(29, 71, 56, 88, hex('#8a6a3a')); linea(56, 88, 83, 71, hex('#8a6a3a'));
  disco(56, 88, 3, hex('#c83030')); linea(56, 88, 62, 100, hex('#c83030')); linea(56, 88, 48, 99, hex('#c83030'));
  rect(98, 68, 124, 96, K); rect(99, 69, 123, 95, hex('#f0ece0')); rect(101, 71, 121, 89, hex('#5a6a7a'));
  disco(111, 82, 5, hex('#2a2832')); pset(108, 76, hex('#2a2832')); pset(114, 76, hex('#2a2832')); pset(107, 77, hex('#2a2832')); pset(115, 77, hex('#2a2832')); pset(109, 81, hex('#e8e070')); pset(113, 81, hex('#e8e070')); rect(104, 86, 118, 89, hex('#4a5060'));
  rect(108, 65, 110, 73, hex('#c8ccd4')); rect(109, 66, 109, 72, hex('#8a8e98'));
  for (const gx of [146, 166]) { disco(gx, 86, 7, K); disco(gx, 86, 6, hex('#9ab8c8')); disco(gx - 2, 84, 2, hex('#d8eaf2')); } linea(153, 85, 159, 85, K); linea(139, 85, 134, 80, K);
  rect(194, 72, 232, 98, K); rect(195, 73, 231, 97, hex('#2a2a34')); rect(198, 76, 228, 94, hex('#8a1c22')); for (let y = 77; y < 94; y += 2) for (let x = 199 + (y % 4); x < 228; x += 4) pset(x, y, hex('#a82a30'));
  poligono([[246, 104], [292, 80], [294, 84], [248, 107]], K); poligono([[247, 104], [292, 81], [293, 83], [248, 106]], hex('#1a1a2a')); poligono([[286, 84], [296, 79], [298, 82], [288, 87]], hex('#d8b040'));
  for (const [x, y] of [[132, 104], [180, 104]]) { rect(x, y, x + 8, y + 3, K); rect(x + 1, y + 1, x + 7, y + 2, hex('#c8ccd4')); }
});
const fondoLuz = () => capa('luz', () => {
  // la mesa de luz: marco de aluminio, cristal lechoso azulado con su retícula y la luz que sale de dentro
  const A = [hex('#2a3038'), hex('#4a525e'), hex('#7a8494'), hex('#a8b2c0')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, ramp(A, 0.4 + 0.25 * Math.sin(x * 0.9) * 0.2 + 0.1 * hh(x, y >> 2), x, y));
  for (let x = 0; x < 320; x += 2) { pset(x, 10, A[3]); pset(x + 1, 170, A[0]); }
  const L = [hex('#9ab8d0'), hex('#b8d0e4'), hex('#d4e4f0'), hex('#eef6fc')];
  rect(10, 18, 309, 168, K);
  for (let y = 19; y < 168; y++) for (let x = 11; x < 309; x++) pset(x, y, ramp(L, 0.9 - Math.hypot((x - 160) / 240, (y - 92) / 140) * 0.8, x, y));
  for (let x = 30; x < 300; x += 20) for (let y = 20; y < 167; y += 2) pset(x, y, L[0]);
  for (let y = 38; y < 167; y += 20) for (let x = 12; x < 308; x += 2) pset(x, y, L[0]);
  // un negativo de foto, una lupa de cuentahílos, cinta adhesiva y un lápiz graso rojo
  rect(22, 26, 86, 40, K); for (let x = 24; x < 86; x += 12) { rect(x, 29, x + 9, 37, hex('#5a4a3a')); rect(x + 2, 31, x + 7, 35, hex('#8a6a4a')); } for (let x = 23; x < 86; x += 3) { pset(x, 27, L[3]); pset(x, 39, L[3]); }
  rect(232, 26, 252, 46, K); rect(233, 27, 251, 45, hex('#3a3a44')); disco(242, 36, 7, hex('#c8dcec')); disco(240, 34, 2, hex('#ffffff'));
  rect(96, 24, 124, 30, hex('#e8e0b0')); rect(96, 24, 124, 24, hex('#c8c090'));
  poligono([[150, 30], [212, 24], [212, 27], [150, 33]], hex('#c83030')); poligono([[212, 24], [218, 25], [212, 27]], hex('#e8b8a0'));
  // diapositivas con su marco blanco (fotos aéreas: costa, bosque, un hangar), en fila sobre el cristal
  [[20, 52, '#6a8a5a', '#3a5a8a'], [52, 56, '#8a7a5a', '#5a7a4a'], [196, 54, '#4a6a8a', '#c8b88a'], [228, 50, '#7a8a6a', '#4a4a52'], [262, 56, '#5a7a9a', '#8aa86a']].forEach(([x, y, c1, c2], i) => {
    rect(x - 1, y - 1, x + 25, y + 25, K); rect(x, y, x + 24, y + 24, hex('#f4f4f0')); rect(x + 4, y + 4, x + 20, y + 20, hex(c1));
    for (let yy = y + 4; yy <= y + 20; yy++) for (let xx = x + 4; xx <= x + 20; xx++) if (hh(xx, yy, i) > 0.62 || (xx - x + yy - y + i * 5) % 9 < 2) pset(xx, yy, hex(c2));
    rect(x + 2, y + 21, x + 9, y + 22, hex('#c8c8c0'));
  });
  // cinta adhesiva que sujeta un mapa de contactos y la sombra del brazo del flexo
  rect(110, 52, 168, 84, K); rect(111, 53, 167, 83, hex('#e8e4d8')); for (let x = 113; x < 166; x += 9) for (let y = 55; y < 82; y += 9) { rect(x, y, x + 7, y + 7, hex('#6a6a72')); if (hh(x, y) > 0.5) pset(x + 3, y + 3, hex('#e8e070')); }
  rect(106, 50, 116, 54, hex('#e8e0b0')); rect(162, 50, 172, 54, hex('#e8e0b0'));
});
const fondoAcero = () => capa('acero', () => {
  // la mesa de acero de la cámara fría: chapa con su trama de rombos, remaches, escarcha en los bordes
  const S = [hex('#3a4450'), hex('#566270'), hex('#748290'), hex('#98a6b4'), hex('#c4d0dc')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const rombo = ((x + y) % 12 === 0 || (x - y + 600) % 12 === 0) && (x >> 2) % 2 === (y >> 2) % 2;
    let v = 0.45 + 0.18 * Math.sin((x - y) * 0.05) + 0.06 * hh(x, y) - (x > 266 && y < 50 ? 0.12 : 0);
    if (rombo) v += 0.2;
    const esc = Math.min(x, 319 - x, y, 179 - y);
    if (esc < 14 && hh(x, y, 5) > esc / 14) v = 0.95;
    pset(x, y, ramp(S, v, x, y));
  }
  for (const x of [8, 312]) for (let y = 30; y < 170; y += 28) { disco(x, y, 2, S[0]); pset(x - 1, y - 1, S[4]); }
  // una bandeja de cubitos y un termómetro
  rect(20, 24, 84, 50, K); rect(21, 25, 83, 49, S[3]); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { rect(24 + i * 15, 28 + j * 11, 35 + i * 15, 36 + j * 11, hex('#c8e4f0')); pset(26 + i * 15, 30 + j * 11, hex('#ffffff')); }
  rect(212, 22, 258, 28, K); rect(213, 23, 257, 27, hex('#f0f0f0')); rect(214, 24, 226, 26, hex('#3a7ae8')); disco(212, 25, 4, K); disco(212, 25, 3, hex('#3a7ae8'));
  for (let x = 228; x < 256; x += 4) pset(x, 23, K);
  // la tablilla con la gráfica de temperaturas, un rollo de cinta y unos guantes gruesos
  rect(120, 30, 182, 86, K); rect(121, 31, 181, 85, hex('#8a5a34')); rect(125, 36, 177, 82, hex('#f0ece0')); rect(140, 27, 162, 35, K); rect(141, 28, 161, 34, hex('#c8ccd4'));
  for (let y = 44; y < 80; y += 6) linea(128, y, 174, y, hex('#c8d8e8')); let py = 50; for (let x = 128; x < 174; x += 4) { const ny = 50 + Math.round(Math.sin(x * 0.3) * 4 + (x - 128) * 0.5); linea(x, py, x + 4, ny, hex('#3a6ac8')); py = ny; }
  R.numero('0', 132, 42, { color: hex('#c83030'), sombra: false });
  disco(98, 70, 9, K); disco(98, 70, 8, hex('#e8e0b0')); disco(98, 70, 4, S[1]);
  for (const [gx, gy] of [[228, 60], [244, 66]]) { rect(gx, gy, gx + 12, gy + 16, K); rect(gx + 1, gy + 1, gx + 11, gy + 15, hex('#2a5a8a')); rect(gx + 1, gy + 12, gx + 11, gy + 15, hex('#e8e8e8')); }
});
const fondoCaja = () => capa('caja', () => {
  // el suelo del archivo y la caja de archivo de frente: cartón ondulado, asideros, la etiqueta en blanco
  const P = [hex('#3a2416'), hex('#5a3820'), hex('#74482a'), hex('#8a5a34')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor((x + (Math.floor(y / 20) % 2) * 30) / 60);
    let v = 0.5 + 0.18 * Math.sin(x * 0.3 + tabla * 7 + Math.sin(y * 0.2) * 1.5) + 0.08 * hh(x >> 1, y, tabla) - Math.hypot((x - 160) / 260, (y - 110) / 170) * 0.5;
    if (y % 20 === 0 || (x + (Math.floor(y / 20) % 2) * 30) % 60 === 0) v = 0;
    pset(x, y, ramp(P, v, x, y));
  }
  // la pared con zócalo arriba (fondo tranquilo) y una alfombra granate abajo
  const W = [hex('#2a2430'), hex('#3a3240'), hex('#4a4050')];
  for (let y = 0; y < 52; y++) for (let x = 0; x < 320; x++) pset(x, y, ramp(W, 0.5 + 0.1 * hh(x >> 2, y >> 2) + (x % 24 === 0 ? -0.3 : 0), x, y));
  rect(0, 52, 319, 56, hex('#5a3a24')); rect(0, 52, 319, 52, hex('#8a5a34'));
  // en la pared: un mapa clavado con chinchetas, el interruptor y el reloj (su aguja la mueve el plano)
  rect(196, 20, 248, 48, K); rect(197, 21, 247, 47, hex('#d8d0b0')); for (let y = 22; y < 47; y++) for (let x = 198; x < 247; x++) if (Math.sin(x * 0.18) * 6 + Math.cos(y * 0.3) * 4 + (x - 222) * 0.1 > 2) pset(x, y, hex('#8ab07a')); else if (hh(x, y) > 0.92) pset(x, y, hex('#6a8ab0'));
  for (const [x, y] of [[198, 22], [246, 22], [198, 46], [246, 46]]) pset(x, y, hex('#c83030'));
  rect(254, 30, 260, 40, K); rect(255, 31, 259, 39, hex('#e8e4d8')); rect(256, 33, 258, 36, hex('#a8a498'));
  disco(40, 34, 12, K); disco(40, 34, 11, hex('#c8a040')); disco(40, 34, 9, hex('#f4f0e4')); for (let k = 0; k < 12; k++) pset(Math.round(40 + Math.cos(k * 0.5236) * 8), Math.round(34 + Math.sin(k * 0.5236) * 8), K);
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 6 === 0 ? hex('#c8a040') : ramp([hex('#5a1820'), hex('#7a2430'), hex('#8a3038')], 0.5 + 0.2 * hh(x, y), x, y));
  // cajas de archivo apiladas a los lados
  for (const [x0, y0, w, h] of [[8, 96, 60, 64], [14, 50, 52, 46], [254, 104, 60, 56]]) {
    rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + h, K);
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) pset(x, y, ramp([hex('#9a7a4a'), hex('#b8945a'), hex('#c8a46a')], 0.6 + 0.15 * hh(x >> 1, y) - (y - y0) / h * 0.3 + (x % 3 === 0 ? -0.1 : 0), x, y));
    rect(x0 + w / 2 - 8, y0 + 10, x0 + w / 2 + 8, y0 + 18, hex('#f0ead8')); rect(x0 + w / 2 - 6, y0 + h - 14, x0 + w / 2 + 6, y0 + h - 10, K);
    R.numero(String(1940 + (x0 * 7 + y0) % 60), x0 + w / 2, y0 + 28, { centro: true, color: hex('#3a2a1a'), sombra: false });
  }
});
// 5 · la mesa de nogal: las carpetas del gato y de la gallina se abren y se sellan
const p5 = (t) => {
  poner(fondoNogal());
  // el vapor de la taza
  for (let k = 0; k < 10; k++) { const v = ((t * 0.7 + k / 10) % 1), x = Math.round(236 - v * 22 + Math.sin(v * 6 + k) * 3), y = Math.round(40 - v * 24); if (bay(x, y) < 1 - v) { pset(x, y, hex('#d8d0c4')); pset(x + 1, y, hex('#b8b0a4')); } }
  // la luz de la lámpara que tiembla un poco sobre la foto y una mota de polvo
  if (Math.sin(t * 13) > 0.85) pset(118, 72, hex('#ffffff'));
  { const v = (t * 0.15) % 1; pset(Math.round(40 + v * 240), Math.round(60 + Math.sin(t * 2) * 8), hex('#c8b890')); }
  const ua = tramo(t, GATO - 0.2, GATO + 0.25), ub = tramo(t, BOMBA - 0.2, BOMBA + 0.25);
  carpeta(88, 168, 4, ua, 'gato'); carpeta(232, 168, 4, ub, 'gallina');
  const sa = MICRO + 0.15, sb = POLLOS + 0.1;
  if (t > sa) marca(132, 156, 4); if (t > sb) marca(276, 156, 4);
  golpeSello(132, 156, t, sa); golpeSello(276, 156, t, sb);
  // el huevo que rueda y la pluma que se escapa de la carpeta de la gallina
  const hv = tramo(t, POLLOS - 0.3, POLLOS + 0.9);
  if (hv > 0) { const x = Math.round(lerp(214, 176, hv)), y = Math.round(150 - Math.abs(Math.sin(hv * 9)) * 3 * (1 - hv)); disco(x, y, 4, K); disco(x, y, 3, hex('#f6efe0')); pset(x - 1, y - 2, hex('#ffffff')); }
  const pl = tramo(t, b(0.33), P6);
  if (pl > 0) { const x = Math.round(214 + pl * 60 + Math.sin(t * 5) * 6), y = Math.round(128 - pl * 70); linea(x, y, x + 5, y - 2, hex('#f6f2e6')); linea(x, y + 1, x + 5, y - 1, hex('#d8d0c4')); pset(x - 1, y + 1, K); }
  sellar(132, 156, tramo(t, sa - 0.45, sa + 0.55)); sellar(276, 156, tramo(t, sb - 0.45, sb + 0.55));
};
// 6 · la mesa de luz: la carpeta del ojo echa ondas; el tanque de goma se infla desplegable en la otra
const p6 = (t) => {
  poner(fondoLuz());
  const uo = tramo(t, P6 + 0.15, P6 + 0.6), ut = tramo(t, b(0.56), b(0.585));
  carpeta(96, 150, 4, uo, 'ojo'); carpeta(234, 150, 4, ut, 'tanque');
  // las ondas que salen del ojo, hasta «far away», recortadas a la mesa de luz
  const on = tramo(t, VER - 0.2, LEJOS + 0.8);
  if (on > 0 && on < 1) { R.recorte([11, 19, 308, 167]); for (let k = 0; k < 4; k++) { const r = ((t * 30 + k * 16) % 64) + 8; for (let q = 0; q < 64; q++) { const an = q / 64 * Math.PI * 2; if (q % 3) pset(Math.round(66 + Math.cos(an) * r), Math.round(118 + Math.sin(an) * r * 0.7), hex('#3a6ac8')); } } R.recorte(null); }
  // el tanque que se infla en «rubber tanks» y se mece
  const inf = tramo(t, GOMA, GOMA + 0.6);
  if (inf > 0) {
    const mec = Math.round(Math.sin(t * 5) * (inf >= 1 ? 1 : 0));
    T.guerraTanque(R, 230 + mec, Math.round(lerp(150, 132, inf)), t, { escala: 2, inflado: inf, dir: -1 });
  }
  if (t > LEJOS && t < LEJOS + 0.8) R.numero('!', 66, 90, { tam: 8, centro: true });
};
// 7 · la mesa de acero: la carpeta del portaaviones de hielo, el bloque que gotea, la escarcha y dos sellos
const p7 = (t) => {
  poner(fondoAcero());
  const u = tramo(t, P7 + 0.1, HIELO + 0.3);
  carpeta(120, 166, 5, u, 'hielo');
  // la escarcha que se extiende en «ice» por la carpeta
  const es = tramo(t, ICE - 0.2, ICE + 0.6);
  if (es > 0) for (let k = 0; k < 220 * es; k++) { const x = Math.round(38 + hh(k, 1) * 164), y = Math.round(94 + hh(k, 2) * 70); pset(x, y, k % 3 ? hex('#e8f6fc') : hex('#a8d8f0')); if (k % 7 === 0) { pset(x + 1, y, hex('#ffffff')); pset(x, y - 1, hex('#ffffff')); } }
  // el bloque de hielo a la derecha, con sus gotas y el charco que crece
  const bx = 256, by = 156;
  disco(bx, by + 3, Math.round(16 + tramo(t, P7, E.duracion) * 8), hex('#5a8ab0')); disco(bx, by + 3, Math.round(14 + tramo(t, P7, E.duracion) * 8), hex('#7ab0d0'));
  T.PIEZAS_DC.bloqueHielo(R, bx, by, { s: 3, tipo: 'hielo' });
  for (let k = 0; k < 3; k++) { const v = (t * 0.9 + k / 3) % 1, x = bx - 20 + k * 20; pset(x, Math.round(by - 6 + v * 12), hex('#c8ecff')); pset(x, Math.round(by - 5 + v * 12), hex('#e8f8ff')); }
  if (Math.sin(t * 3) > 0.9) { pset(bx - 6, by - 26, hex('#ffffff')); pset(bx - 5, by - 27, hex('#ffffff')); pset(bx - 7, by - 27, hex('#ffffff')); }
  // «real»: el visto verde en la hoja; «secret»: el sello rojo en el propio bloque de hielo
  const s1 = REAL, s2 = SECRET;
  if (t > s1) { for (let d = 0; d < 3; d++) { linea(172 + d, 148, 178 + d, 156, hex('#2a8a3a')); linea(178 + d, 156, 192 + d, 136, hex('#2a8a3a')); } }
  if (t > s2) marca(256, 146, 3);
  golpeSello(182, 148, t, s1); golpeSello(256, 146, t, s2);
  sellar(182, 150, tramo(t, s1 - 0.45, s1 + 0.45), '#4a5a4a'); sellar(256, 146, tramo(t, s2 - 0.45, s2 + 0.4), '#4a5a4a');
};
// 8 · la caja de archivo: cae la última carpeta, baja la tapa, el sello en «joke»; la pluma se escapa
const p8 = (t) => {
  poner(fondoCaja());
  { const an = t * 1.2 - Math.PI / 2; linea(40, 34, Math.round(40 + Math.cos(an) * 7), Math.round(34 + Math.sin(an) * 7), hex('#c83030')); linea(40, 34, 44, 31, K); pset(40, 34, K); }
  const cx = 160, y0 = 92, w = 120, h = 70;
  // el interior oscuro y las carpetas dentro (asoman las pestañas con su dibujo); la última cae desde arriba
  rect(cx - w / 2 - 1, y0 - 1, cx + w / 2 + 1, y0 + h + 1, K);
  rect(cx - w / 2, y0, cx + w / 2, y0 + 8, hex('#3a2818'));
  const dib = ['gato', 'gallina', 'ojo', 'tanque', 'hielo'];
  const cae = tramo(t, P8 + 0.15, P8 + 0.6);
  dib.forEach((d, i) => { const fin = y0 + 24 - (i % 2) * 2; const yy = i === 4 ? Math.round(lerp(-10, fin, cae * cae)) : fin; if (i === 4 && cae <= 0) return; T.PIEZAS_DC.carpeta(R, cx - 44 + i * 22, yy, { s: 2, dibujo: d }); });
  // el frente de la caja (delante de las carpetas)
  for (let y = y0 + 10; y <= y0 + h; y++) for (let x = cx - w / 2; x <= cx + w / 2; x++) pset(x, y, ramp([hex('#8a6a3a'), hex('#a8844c'), hex('#c49e62'), hex('#d4b070')], 0.65 + 0.12 * hh(x >> 1, y) - (y - y0) / h * 0.35 + (x % 4 === 0 ? -0.08 : 0), x, y));
  rect(cx - w / 2, y0 + 10, cx + w / 2, y0 + 10, K);
  rect(cx - 16, y0 + 22, cx + 16, y0 + 36, K); rect(cx - 15, y0 + 23, cx + 15, y0 + 35, hex('#f0ead8')); rect(cx - 15, y0 + 23, cx + 15, y0 + 24, hex('#c83030'));
  rect(cx - 10, y0 + h - 16, cx + 10, y0 + h - 10, K); rect(cx - 9, y0 + h - 15, cx + 9, y0 + h - 11, hex('#3a2414'));
  rect(cx - w / 2, y0 + h, cx + w / 2, y0 + h + 3, hex('#2a1810'));
  // la tapa que baja en «and all of them» y tapa las pestañas
  const tp = tramo(t, b(0.925), b(0.95)), ty = Math.round(lerp(-14, y0 - 2, tp * tp)), tw = w / 2 + 4;
  if (tp > 0) { rect(cx - tw - 1, ty - 1, cx + tw + 1, ty + 13, K); for (let y = ty; y <= ty + 12; y++) for (let x = cx - tw; x <= cx + tw; x++) pset(x, y, ramp([hex('#9a7a44'), hex('#b8945a'), hex('#d0aa6c')], 0.75 - (y - ty) / 16 + 0.1 * hh(x, y), x, y)); rect(cx - tw, ty + 12, cx + tw, ty + 12, hex('#6a4a24')); }
  if (tp >= 1 && t < b(0.95) + 0.25) for (const sx of [-1, 1]) for (let k = 0; k < 4; k++) pset(cx + sx * (tw + 4 + k * 3), y0 - 2 - k, hex('#c8b890'));
  if (t > JOKE + 0.1) marca(cx + 36, y0 + 52, 3);
  golpeSello(cx + 36, y0 + 52, t, JOKE + 0.1);
  sellar(cx + 36, y0 + 52, tramo(t, JOKE - 0.35, JOKE + 0.6));
  // la pluma de la gallina que se escapa por la rendija de la tapa y sube
  const pl = tramo(t, JOKE + 0.5, E.duracion);
  if (pl > 0) { const x = Math.round(cx - 30 - pl * 46 + Math.sin(t * 5) * 5), y = Math.round(y0 - 4 - pl * 36); linea(x, y, x + 5, y - 2, hex('#f6f2e6')); linea(x, y + 1, x + 5, y - 1, hex('#d8d0c4')); pset(x - 1, y + 1, K); }
};
const efectos = [[0.55, 'lapiz'], [LUNA, 'brillo'], [P2 + 0.05, 'whoosh'], [FLASH, 'brillo'], [P3 + 0.3, 'tecleo'], [DOSMIL, 'pop'], [NUMEROS, 'lapiz'], [CARL, 'papel'], [NOES + 0.1, 'papel'], [FILE + 0.4, 'miau'],
  [GATO, 'papel'], [MICRO + 0.15, 'sello'], [BOMBA, 'papel'], [POLLOS + 0.1, 'sello'], [P6 + 0.15, 'papel'], [VER, 'bip'], [GOMA, 'vapor'], [HIELO, 'papel'], [REAL, 'sello'], [SECRET, 'sello'], [P8 + 0.55, 'papel'], [b(0.95), 'golpecito'], [JOKE + 0.1, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: (t) => (t < P3 ? 1958 : t < P4 ? 2000 : 2026) });
''')

E['dc-hola'] = ('Hola', '''// DC-HOLA (frase 3), 2026. Un plano: el archivo de Atom de noche, con la Luna por la ventana; Atom se presenta en la
// esquina. En «I'm Atom» el gato espía cruza por delante del escritorio y se esconde detrás de una caja de archivo; en
// «wondered» saca la cabeza con el micrófono en el collar y en «find out» vuelve a esconderse moviendo la cola. Una
// carpeta resbala del montón de la estantería y la lámpara de pie se mece.''', r'''
const m = (f) => en('hola', f);
const ATOM = m(0.04), WOND = m(0.55), FIND = m(0.87);
const { rect, pset, linea, disco } = R;
const K = hex('#14121a');
const caja = (x0, y0, w, h, t) => {
  // la caja de archivo de cartón: ondulado, solapas de arriba, cinta, asidero, etiqueta con el año y la marca roja
  rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + h, K);
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
    const v = 0.62 + (x % 3 === 0 ? -0.1 : 0) - (y - y0) / h * 0.3 + ((x * 7 + y * 13) % 11 === 0 ? -0.12 : 0) + (x < x0 + 4 ? -0.15 : 0);
    pset(x, y, v > 0.6 ? hex('#d4b070') : v > 0.45 ? hex('#c49e62') : v > 0.3 ? hex('#a8844c') : hex('#8a6a3a'));
  }
  rect(x0, y0, x0 + w - 1, y0 + 5, hex('#b8945a')); rect(x0, y0 + 5, x0 + w - 1, y0 + 5, hex('#6a4a24'));
  rect(x0 + w / 2 - 3, y0, x0 + w / 2 + 3, y0 + h - 1, hex('#c8b894')); rect(x0 + w / 2 - 3, y0, x0 + w / 2 - 3, y0 + h - 1, hex('#a89874'));
  rect(x0 + 6, y0 + 12, x0 + 22, y0 + 24, K); rect(x0 + 7, y0 + 13, x0 + 21, y0 + 23, hex('#f0ead8'));
  R.numero('58', x0 + 14, y0 + 22, { centro: true, color: hex('#3a2a1a'), sombra: false });
  T.PIEZAS_DC.sello(R, x0 + w - 13, y0 + 28, { tipo: 'marca', s: 2 });
  rect(x0 + 8, y0 + h - 10, x0 + 20, y0 + h - 6, K); rect(x0 + 9, y0 + h - 9, x0 + 19, y0 + h - 7, hex('#3a2414'));
  for (let x = x0 - 2; x <= x0 + w + 4; x++) if (x % 2) pset(x, y0 + h, hex('#2a1810'));
};
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'archivo' });
  T.hoyDelante(R, t, { encuadre: 'archivo' });
  // el gato cruza por delante del escritorio, de derecha a izquierda, y se mete detrás de la caja (x 30–86, suelo 176)
  const g = tramo(t, ATOM - 0.2, ATOM + 1.6);
  const asoma = tramo(t, WOND - 0.3, WOND) - tramo(t, FIND, FIND + 0.25);
  if (g < 1) T.gatoEspia(R, Math.round(lerp(300, 66, g)), 178, t, { anda: g > 0, dir: -1, microfono: true, s: 2 });
  else T.gatoEspia(R, 60, Math.round(176 - asoma * 26), t, { microfono: true, cara: asoma > 0.5 ? 'travieso' : undefined, dir: 1, s: 2 });
  caja(26, 140, 60, 38, t);
  if (asoma > 0.8 && t < FIND) R.numero('?', 98, 132, { tam: 8, centro: true });
};
const efectos = [[ATOM, 'brillo'], [WOND, 'miau']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
