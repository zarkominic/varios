E = {}

# Ayudas comunes de las tres escenas (se copian dentro de cada una): tramos, tramado ordenado 4 × 4, ruido de valor,
# mezcla de colores, fondo fijo en búfer (con R.usar(b)/R.usar(prev)), cifras diminutas de 3 × 5 y «detrás de»
AYUDA = r'''
const C = T.C;
const lin = (t, x, y) => Math.max(0, Math.min(1, (t - x) / (y - x)));
const entre = (t, x, y) => t >= x && t < y;
const parp = (t, v = 6) => Math.sin(t * v) > 0;
const suave = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const by = (x, y) => BY[((y & 3) << 2) | (x & 3)];
const rampa = (s) => s.split(' ').map(hex);
const tono = (ram, v, x, y) => { let l = Math.floor(v); if (v - l > by(x, y)) l++; return ram[l < 0 ? 0 : l >= ram.length ? ram.length - 1 : l]; };
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ruido = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hs(xi, yi, 9), b = hs(xi + 1, yi, 9), c = hs(xi, yi + 1, 9), d = hs(xi + 1, yi + 1, 9); return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy; };
const mezcla = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const aclara = (x, y, c, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mezcla(R.pget(x, y), c, a)); };
const FIJOS = new Map();
const fijo = (clave, dibuja) => { let b = FIJOS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); FIJOS.set(clave, b); } R.copiar(b); };
const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];
const cifras = (txt, x, y, c, s = 1) => { for (const ch of String(txt)) { const g = DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); x += 4 * s; } };
// lo que va detrás de una pieza del decorado: guarda esos rectángulos, dibuja y los repone encima
const detras = (rects, dibuja) => { const g = rects.map(([x0, y0, x1, y1]) => { const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y)); return v; });
  dibuja(); rects.forEach(([x0, y0, x1, y1], k) => { let i = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, g[k][i++]); }); };
// un dibujo de letras (cada letra, un color de pal; '.' transparente) en (x, y), con escala k
const pinta = (filas, x, y, pal, k = 1) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c != null) R.rect(x + i * k, y + j * k, x + i * k + k - 1, y + j * k + k - 1, c); } });
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-nombres'] = ('Nombres', '''// HU-NOMBRES (frase 18), sin cartela, 1953 → 1979 → 1985. Cuatro planos, cada uno con su composición:
// 1. el mapa de papel del sureste en la mesa de los pronosticadores («so many storms»): cuatro tormentas aparecen una tras
//    otra (golfo, Bahamas, Carolina, Atlántico) y giran con su estela de puntos; una mano coge el lápiz graso y traza a
//    puntos la trayectoria de la del golfo («keep track»); la sombra del ventilador del techo barre el mapa, humea un café
//    en la esquina y una mosca pasea por Kentucky; en «names» la mano de otro pronosticador clava una ficha con el
//    pictograma de mujer junto a una tormenta y las otras tres reciben la suya (barra en 1953);
// 2. la sala de pronóstico entera, en 1953 («only women's names»): el pronosticador recorre con el puntero el tablero de
//    las listas, todas de mujer; el de la mesa teclea y la pronosticadora lee el teletipo; en «1979» se enciende la placa
//    del año (la barra salta a 1979) y en «alternating men and women» las fichas de hombre se dan la vuelta una a una
//    mientras el puntero las sigue; la pronosticadora se vuelve y sonríe;
// 3. el tablero de cerca («six lists that repeat every six years»): el marco amarillo recorre las seis listas, la placa y la
//    barra cuentan de 1979 a 1984 y en «years» vuelven a la lista 1 con 1985 (el marco parpadea); el meteorólogo señala
//    cada lista; en «except» la pronosticadora va al archivador y abre el cajón de los retirados; por el cristal
//    esmerilado pasa una sombra;
// 4. el archivador de cerca (gag): la mano trae una ficha tachada y la deja caer en el cajón en «its name»; en «retired»
//    lo empuja y el cajón se cierra de golpe: el archivador tiembla, sale polvo por las rendijas, saltan la cafetera y las
//    tazas, y una ficha se escapa y cae revoloteando al suelo en «forever».''', AYUDA + r'''
const a = (f) => en('nombres', f);
// cortes: «Only» (4.39), «from» six lists (10.87), «destructive» (15.09)
const P2 = a(0.221), P3 = a(0.588), P4 = a(0.828);
const muchas = a(0.037), tormentas = a(0.057), pronos = a(0.114), nombres = a(0.164);
const mujeres = a(0.237), a1953 = a(0.290), a1979 = a(0.394), alternan = a(0.479), yMujeres = a(0.542);
const seis = a(0.596), cada = a(0.662), anios = a(0.697), salvo = a(0.748), tormenta = a(0.782), tan = a(0.813);
const su = a(0.883), nombre = a(0.893), retira = a(0.930), siempre = a(0.958);

// ── piezas ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const ROSA = hex('#c8466a'), ROSAS = hex('#8a2a48'), AZUL = hex('#2e5aa8'), AZULS = hex('#1e3a70'), FICHA = hex('#f4f0e2'), FICHAS = hex('#d4ccb4');
const MUJER = ['.###.', '.###.', '..#..', '.###.', '.###.', '#####', '.#.#.'];
// la ficha con el pictograma de mujer (7 × 9 por k), con su sombra; tacha: el aspa roja de los nombres retirados
const ficha = (x, y, k = 1, tacha = false, sombra = true) => {
  if (sombra) R.rect(x + 1, y + 1, x + 7 * k + 1, y + 9 * k + 1, hex('#5a5048'));
  R.rect(x - 1, y - 1, x + 7 * k, y + 9 * k, C.k); R.rect(x, y, x + 7 * k - 1, y + 9 * k - 1, FICHA); R.rect(x, y + 9 * k - 1, x + 7 * k - 1, y + 9 * k - 1, FICHAS);
  MUJER.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.rect(x + (1 + i) * k, y + (1 + j) * k, x + (2 + i) * k - 1, y + (2 + j) * k - 1, i > 2 && j > 2 ? ROSAS : ROSA); });
  if (tacha) for (let d = -Math.floor(k / 2); d <= Math.floor(k / 2); d++) { R.linea(x + d, y, x + 7 * k - 1 + d, y + 9 * k - 1, C.rojo); R.linea(x + 7 * k - 1 + d, y, x + d, y + 9 * k - 1, C.rojo); }
};
// el símbolo del huracán de los mapas del tiempo: el ojo y dos brazos que giran al revés que las agujas del reloj
const simbolo = (x, y, t, s = 1, c = hex('#c83a3a')) => {
  const rot = -t * 2.6;
  for (let k = 0; k < 2; k++) for (let u = 0; u <= 1.7; u += 0.12) { const g = rot + k * Math.PI + u, r = (2.6 + u * 2.4) * s; const px = Math.round(x + Math.cos(g) * r), py = Math.round(y + Math.sin(g) * r);
    R.pset(px + 1, py + 1, hex('#6a5040')); R.pset(px, py, c); if (u < 1.1) R.pset(px + (Math.cos(g) > 0 ? -1 : 1), py, c); }
  R.disco(x, y, 2.6 * s, C.k); R.disco(x, y, 1.9 * s, c); R.pset(x, y, hex('#f4ecd8'));
};

// ── 1 · el mapa: tantas tormentas, y sus nombres ──────────────────────────────────────────────────────────────────────
// [lon, lat] de salida y de llegada de cada tormenta, y cuándo aparece
const TORM = [[[-86.8, 28.6], [-88.0, 29.2], a(0) - 0.15], [[-75.4, 26.9], [-77.3, 28.4], a(0.014)], [[-72.4, 30.9], [-73.7, 32.7], muchas + 0.05], [[-70.8, 27.3], [-72.5, 28.7], tormentas]];
const ORDEN = [1, 0, 2, 3];   // la primera ficha, la que clava la mano; luego las otras
const clava = nombres;
const p1 = (t) => {
  const P = T.mapa(R, t, { zona: 'sureste' });
  // la sombra del ventilador del techo que barre el mapa (cuatro aspas que giran, tramadas)
  for (let k = 0; k < 4; k++) { const g = t * 2.2 + k * Math.PI / 2, ca = Math.cos(g), sa = Math.sin(g);
    for (let d = 14; d < 120; d++) for (let w = -5; w <= 5; w++) { const x = Math.round(150 + ca * d - sa * w * (0.6 + d / 120)), y = Math.round(70 + (sa * d + ca * w) * 0.55); if (x < 8 || x > 311 || y < 8 || y > 171 || (x + y) % 2) continue; aclara(x, y, hex('#3a3428'), 0.16); } }
  // las tormentas: aparecen con un salto, giran y avanzan despacio dejando su estela de puntos
  const pos = TORM.map(([p0, p1_, t0]) => { const u = lin(t, t0, P2 + 2), q = P([p0[0] + (p1_[0] - p0[0]) * u, p0[1] + (p1_[1] - p0[1]) * u]); return [Math.round(q[0]), Math.round(q[1]), t0]; });
  TORM.forEach(([p0], k) => { const [x, y, t0] = pos[k]; if (t < t0) return; const e = lin(t, t0, t0 + 0.25), q0 = P(p0);
    for (let i = 0; i < 9; i++) { const f = i / 9; const sx = Math.round(q0[0] - (x - q0[0]) * (1.5 - f * 0.5) * 2), sy = Math.round(q0[1] - (y - q0[1]) * (1.5 - f * 0.5) * 2) + i; if (i % 2 === 0) R.pset(Math.round(lerp(sx, x, f)), Math.round(lerp(sy, y, f)), hex('#c85a4a')); }
    simbolo(x, y - Math.round(Math.sin(e * Math.PI) * 3), t + k, e < 1 ? 0.7 + e * 0.6 : 1.3); });
  // las fichas: la de la mano en «names» y las otras detrás, una a una, colgadas de su hilo
  ORDEN.forEach((k, i) => { const tk = clava + i * 0.24; if (t < tk) return; const [x, y] = pos[k], fx = x + 7, fy = y - 18, b = i === 0 ? 0 : Math.round(Math.sin(lin(t, tk, tk + 0.25) * Math.PI) * 3);
    R.linea(x + 2, y - 2, fx + 1, fy + 11 - b, hex('#7a6a5a')); ficha(fx, fy - b, 1); R.disco(fx + 3, fy - 1 - b, 1, C.rojo); R.pset(fx + 3, fy - 2 - b, C.blanco); });
  // la otra mano coge el lápiz graso y traza a puntos la trayectoria de la tormenta del golfo («keep track»)
  { const [gx, gy] = pos[0], va = lin(t, a(0) - 0.35, a(0) + 0.1), traza = lin(t, a(0) + 0.15, tormentas + 0.2), vuelve = lin(t, tormentas + 0.3, pronos), lleva = va >= 1 && vuelve < 1;
    for (let i = 0; i < 14 * traza; i++) if (i % 2 === 0) { const u = i / 14; R.rect(gx - 4 - Math.round(u * 34), gy - 4 - Math.round(u * 14 + Math.sin(u * 3) * 4), gx - 3 - Math.round(u * 34), gy - 3 - Math.round(u * 14 + Math.sin(u * 3) * 4), hex('#c83a3a')); }
    if (va > 0 && vuelve < 1) { const tx = lerp(gx - 6, gx - 40, traza), ty = lerp(gy - 6, gy - 22, traza) - Math.sin(traza * 3) * 4, hx = Math.round(lerp(lerp(-30, tx - 12, suave(va)), -40, suave(vuelve))), hy = Math.round(lerp(lerp(176, ty + 7, suave(va)), 178, suave(vuelve)));
      R.linea(hx + 8, hy - 2, hx + 13, hy - 7, C.k); R.linea(hx + 9, hy - 2, hx + 14, hy - 7, hex('#c83a3a')); T.mano(R, hx, hy, 1, '#e8e4d8'); } }
  // la mano del pronosticador trae la primera ficha y la clava
  { const [x, y] = pos[ORDEN[0]], fx = x + 7, fy = y - 18, ida = lin(t, pronos + 0.1, clava - 0.05), vuelta = lin(t, clava + 0.2, P2 - 0.1);
    if (ida > 0 && vuelta < 1) { const hx = Math.round(lerp(lerp(350, fx + 15, suave(ida)), 360, suave(vuelta))), hy = Math.round(lerp(lerp(178, fy + 3, suave(ida)), 176, suave(vuelta)) + (entre(t, clava - 0.08, clava + 0.06) ? 1 : 0));
      if (t < clava) ficha(hx - 13, hy - 3, 1); T.mano(R, hx, hy, -1, '#e8e4d8'); } }
  // sobre el mapa: el compás de puntas abierto, la tira del teletipo enrollada y una mosca que pasea por Kentucky
  { R.linea(176, 40, 168, 58, C.k); R.linea(177, 40, 169, 58, hex('#c8ccd4')); R.linea(176, 40, 186, 57, C.k); R.linea(177, 40, 187, 57, hex('#9aa2ae')); R.disco(176, 39, 2, C.k); R.disco(176, 39, 1, hex('#c8a040')); R.pset(168, 59, C.k); R.pset(186, 58, C.k);
    for (let i = 0; i < 46; i++) { const x = 40 + i, y = 72 + Math.round(Math.sin(i * 0.12) * 2); R.pset(x, y - 3, hex('#b8b0a0')); R.rect(x, y - 2, x, y + 4, hex('#f6f2e4')); R.pset(x, y + 5, hex('#b8b0a0')); if (i % 6 < 4 && i > 2) R.pset(x, y + (i % 12 < 6 ? 0 : 2), hex('#6a6458')); }
    R.disco(88, 73, 4, C.k); R.disco(88, 73, 3, hex('#f6f2e4')); R.disco(88, 73, 1, hex('#d8d0c0'));
    const u = (t % 5.2) / 5.2, fx = Math.round(150 + Math.sin(u * 6.28) * 16 + (u > 0.5 ? 4 : 0)), fy = Math.round(62 + Math.cos(u * 12.56) * 5), vuela = (t % 5.2) > 4.6;
    R.pset(fx, fy - (vuela ? 4 : 0), C.k); R.pset(fx + 1, fy - (vuela ? 4 : 0), C.k); R.pset(fx, fy - 1 - (vuela ? 4 : 0), Math.floor(t * 20) % 2 ? hex('#c8d8e8') : hex('#8898a8')); if (!vuela) R.pset(fx + 2, fy + 1, hex('#8a7a60')); }
  // en la esquina de la mesa, la taza de café humeante y el lápiz graso rojo
  { const x = 284, y = 160; R.rect(x - 1, y - 9, x + 9, y, C.k); R.rect(x, y - 8, x + 8, y - 1, hex('#e8e4d8')); R.rect(x, y - 8, x + 8, y - 7, hex('#5a3a1a')); R.rect(x, y - 6, x, y - 2, C.blanco); R.rect(x + 10, y - 7, x + 11, y - 3, C.k);
    for (let i = 0; i < 4; i++) { const u = ((t * 0.6 + i / 4) % 1), sx = Math.round(x + 4 + Math.sin(u * 7 + i) * 2), sy = Math.round(y - 11 - u * 16); if (by(sx, sy) < 0.8 - u * 0.6) R.pset(sx, sy, hex('#f6f2ea')); }
    if (t < a(0) - 0.1 || t > pronos) { R.linea(30, 166, 52, 158, C.k); R.linea(30, 165, 52, 157, hex('#c83a3a')); R.linea(31, 166, 51, 159, hex('#8a2424')); R.pset(29, 166, hex('#e8c8a8')); } }
};

// ── 2 · la sala: solo mujeres (1953) y alternos (1979) ────────────────────────────────────────────────────────────────
const P53 = { C: '#f2eee2', c: '#c8c0b0', W: '#f2eee2', o: '#8a2a2a', F: '#4a4a5a' }, PA53 = { C: '#e8c8b8', c: '#c8a898', W: '#e8c8b8', o: '#f2eee2' };
const conPal = (p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, hex(v)]));
const PAL53 = conPal(P53), PALA53 = conPal(PA53);
// la punta del puntero: recorre la lista 1–6 (1953), sube a la placa (1979) y sigue las fichas que se dan la vuelta
const punta = (t) => {
  const col = (c, r) => [212 + 10 * c, 45 + 9 * r];
  if (t < a1979 - 0.3) { const u = lin(t, P2 + 0.3, a1953 + 0.6), c = Math.min(5, u * 5.99), r = 2 + Math.sin(t * 5) * 0.4; const [x, y] = col(c, r); return [x, y + (entre(t, mujeres, mujeres + 0.15) ? 2 : 0)]; }
  if (t < alternan - 0.1) return [lerp(254, 238, lin(t, a1979 - 0.3, a1979)), lerp(64, 30, lin(t, a1979 - 0.3, a1979))];
  const u = lin(t, alternan, yMujeres + 0.2); const [x, y] = col(u * 5.5, 1.5 + Math.sin(u * 9) * 1.2); return [x, y];
};
const p2 = (t) => {
  const alt = lin(t, alternan - 0.05, yMujeres + 0.25);
  T.salaPronostico(R, t, { listas: t < a1979 ? false : 0.3, alternos: alt, año0: 1979 });
  // el de la mesa teclea (se para y mira en «1979»)
  const teclea = !entre(t, a1979 - 0.1, alternan + 0.4);
  R.actor(EL.meteorologo, 74, 131 + (teclea && Math.sin(t * 18) > 0.3 ? 1 : 0), t, { dir: 1, quieto: teclea, sorpresa: entre(t, a1979, a1979 + 0.5), sonrisa: t > alternan + 0.4, pal: PAL53 });
  T.salaPronosticoDelante(R, t, {});
  // la pronosticadora lee la tira del teletipo; en «1979» se vuelve, y en «men and women» señala el tablero y sonríe
  const vuelta = t > a1979 + 0.2;
  R.actor(EL.pronosticadora, 47, 153, t, { dir: vuelta ? 1 : -1, sorpresa: entre(t, a1979 + 0.2, a1979 + 0.8), dedo: entre(t, alternan + 0.6, yMujeres + 0.4), sonrisa: t > yMujeres - 0.3, pal: PALA53 });
  if (!vuelta) { R.rect(38, 128, 44, 134, C.k); R.rect(39, 129, 43, 133, hex('#f6f2e4')); R.rect(40, 130, 42, 130, hex('#6a6458')); R.rect(40, 132, 41, 132, hex('#6a6458')); }   // la tira que lee
  // el pronosticador del puntero, delante de la mesa de trazar
  const anda = lin(t, P2, P2 + 0.9), px = Math.round(lerp(190, 214, anda));
  const r = R.actor(EL.pronosticador, px, 172, t, { dir: 1, anda: anda > 0 && anda < 1, dedo: anda >= 1, habla: entre(t, a1979 + 0.1, a1979 + 0.9) && parp(t, 9), sonrisa: t > yMujeres, pal: PAL53 });
  if (anda >= 1) { const [mx, my] = r.mano, [tx, ty] = punta(t), X = Math.round(tx), Y = Math.round(ty);
    R.linea(mx, my - 1, X + 1, Y, C.k); R.linea(mx - 2, my - 1, X - 1, Y, C.k); R.linea(mx - 1, my - 1, X, Y, hex('#b8844a')); R.linea(mx - 1, my - 2, X, Y - 1, hex('#d8a46a')); R.rect(X - 1, Y - 1, X + 1, Y + 1, C.k); R.pset(X, Y, hex('#f4ecd8')); }
};

// ── 3 · el tablero: seis listas que se repiten cada seis años ─────────────────────────────────────────────────────────
const L3 = (t) => 6.25 * lin(t, seis + 0.05, anios + 0.1);   // de la lista 1 (1979) a la 6 (1984) y vuelta a la 1 (1985)
const abre3 = salvo + 0.75;
const p3 = (t) => {
  const L = L3(t), cajon = t < abre3 ? undefined : 0.549 * (1 - lin(t, abre3, abre3 + 0.3));
  T.salaPronostico(R, t, { encuadre: 'tablero', listas: L, alternos: 1, año0: 1979, cajon });
  // el meteorólogo señala cada lista según pasa el marco; en «except» se vuelve hacia el archivador
  const mira = t > salvo + 0.2;
  R.actor(EL.meteorologo, 104, 168, t, { dir: 1, dedo: !mira && t > seis, habla: entre(t, seis, anios) && parp(t, 8), sorpresa: entre(t, abre3 + 0.2, abre3 + 0.8), sonrisa: entre(t, anios, salvo) });
  // la pronosticadora mira el tablero y en «except» va al archivador y tira del cajón de los retirados
  const va = lin(t, salvo, abre3 - 0.05), x = Math.round(lerp(168, 230, va));
  R.actor(EL.pronosticadora, x, Math.round(lerp(168, 164, va)), t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, dedo: entre(t, abre3 - 0.1, abre3 + 0.35), sorpresa: t > abre3 + 0.4, sonrisa: entre(t, anios, salvo) });
};

// ── 4 · el cajón de los retirados (gag) ──────────────────────────────────────────────────────────────────────────────
const suelta = nombre + 0.05, empuja = retira + 0.02, golpe = empuja + 0.32;
const cajon4 = (t) => (t < empuja ? 0 : t < golpe ? 0.55 * lin(t, empuja, golpe) : 0.55 + 0.45 * lin(t, golpe, golpe + 1.9));
const p4 = (t) => {
  const caj = cajon4(t);
  T.salaPronostico(R, t, { encuadre: 'archivador', cajon: caj });
  // el frente del cajón de los retirados: abierto baja 18 px; las fichas asoman por encima
  const op = caj < 0.55 ? 1 - (caj / 0.55) ** 2 : 0, fa = 104 + Math.round(op * 18);
  // la ficha tachada: la trae la mano, cae entre las demás y se queda dentro del cajón
  const cae = lin(t, suelta, suelta + 0.22), fx = 150, fy = Math.round(lerp(70, fa - 16, cae * cae));
  if (t >= suelta && op > 0) { R.recorte([0, 0, 319, fa - 1]); ficha(fx, t < suelta + 0.22 ? fy : fa - Math.round(16 * op), 2, true, false); R.recorte(null); }
  // la mano: entra con la ficha, la suelta en «its name», va al frente del cajón y en «retired» lo empuja de golpe
  const entra = lin(t, P4 + 0.15, su - 0.05), alFrente = lin(t, suelta + 0.15, empuja - 0.05), sale = lin(t, golpe + 0.35, golpe + 0.95);
  let hx, hy;
  if (t < suelta + 0.15) { hx = lerp(352, fx + 21, suave(entra)); hy = lerp(66, 74, suave(entra)); }
  else if (t < empuja) { hx = lerp(fx + 21, 226, suave(alFrente)); hy = lerp(74, 128, suave(alFrente)); }
  else { const u = lin(t, empuja, golpe); hx = 226 + 4 * u; hy = 128 - 18 * u * u; if (t > golpe) { hx = lerp(230, 360, suave(sale)); hy = lerp(110, 100, suave(sale)); } }
  if (t < suelta) ficha(Math.round(hx) - 21, Math.round(hy) - 2, 2, true, false);
  if (hx < 345) T.mano(R, Math.round(hx), Math.round(hy), -1, '#e8e4d8');
};

const efectos = [[a(0) - 0.15, 'pop'], [a(0.014), 'tic'], [muchas + 0.05, 'pop'], [tormentas, 'tic'], [clava, 'sello'], [clava + 0.24, 'tic'], [clava + 0.48, 'tic'], [clava + 0.72, 'tic'],
  [P2 + 0.25, 'tecleo', { dur: 2.6 }], [mujeres, 'golpecito'], [a1979, 'interruptor'], [alternan + 0.05, 'papel'], [alternan + 0.6, 'papel'], [yMujeres, 'papel'],
  ...[1, 2, 3, 4, 5, 6].map((k) => [seis + 0.05 + (anios + 0.05 - seis) * k / 6.25, 'tic']), [anios + 0.1, 'brillo'], [abre3, 'golpecito'],
  [suelta + 0.1, 'papel'], [golpe, 'cerrojo'], [golpe + 0.15, 'toc'], [golpe + 0.5, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < a1979 ? 1953 : t < P3 ? 1979 : t < P4 ? 1979 + Math.floor(L3(t)) : 1985) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-saffir'] = ('La escala', '''// HU-SAFFIR (frases 19–20), 1971, cartela «1971». Siete planos en el taller de Saffir (Coral Gables, Florida):
// 1. el taller entero: Saffir llega con la caja de herramientas, la deja junto a la mesa de prueba y ajusta la casita con
//    el destornillador; tras el mostrador, la ayudante lee un papel de la bandeja; en «Herbert Saffir» él se vuelve, sonríe
//    y se sube las gafas; fuera pasan coches y nubes, el gato del alféizar mueve la cola y un fluorescente parpadea;
// 2. el banco de viento de cerca («studying how houses fail»): la mano gira el mando, las aspas arrancan, la cinta se
//    estira y en «fail» las primeras tejas aletean y salen volando; la otra mano apunta en la libreta;
// 3. el taller («and Robert Simpson»): la puerta de la calle se abre y entra Simpson con el mapa doblado; Saffir se vuelve
//    sorprendido y lo saluda; la ayudante le saluda al pasar; se dan la mano y en «Center» Simpson despliega el mapa del
//    Atlántico con la espiral (Saffir, «!»);
// 4. el panel de la escala («a simple scale from one to five»): Saffir tira del interruptor y en «one to five» se encienden
//    las cinco ventanillas una tras otra, con su icono de daños y su umbral; en «what to expect» Saffir abre los brazos y
//    Simpson asiente y señala;
// 5. el mostrador (gag), categoría 1: en «74» salta el número sobre el banco del fondo; en «peels shingles» las tejas de la
//    casita se levantan y una cruza el taller y golpea la campanita en «roofs»: Simpson da un brinco y Saffir se ríe;
// 6. el banco de cerca, categoría 5: la mano gira el mando a tope en «blows», el contador y el «157» suben, se van las tejas,
//    los tableros y la armadura, y en «flatten» la casita se desmonta como una maqueta;
// 7. la mesa de dibujo (la explicación): en «each step up» la mano marca las cinco categorías y salen cinco casitas cada vez
//    más rotas; en «multiplies» saltan los «×» entre ellas; en «the force of the wind grows much faster» la mano traza la
//    curva roja de la fuerza, que se dispara, y en «than its speed» la recta azul de la velocidad, mucho más tendida; la
//    flecha marca la diferencia.''', AYUDA + r'''
const s = (f) => en('saffir', f), c = (f) => en('categorias', f);
// cortes: «who» (5,49, en la pausa), «and Robert» (9,57), «Create» (13,78), «A Category» (18,92), «while» (24,53), «and each» (30,46)
const P2 = s(0.240), P3 = s(0.485), P4 = s(0.739), P5 = c(0), P6 = c(0.323), P7 = c(0.664);
const herbert = s(0.172), saffirW = s(0.191);
const estudia = s(0.296), fallan = s(0.370), fuertes = s(0.409);
const director = s(0.576), centro = s(0.670);
const escalaW = s(0.787), uno = s(0.831), cinco = s(0.854), gente = s(0.911), espera = s(0.932);
const cat1 = c(0.006), n74 = c(0.082), arranca = c(0.197), tejados = c(0.270);
const sopla = c(0.387), n157 = c(0.435), arrasa = c(0.550), barrios = c(0.591);
const escalon = c(0.670), multiplica = c(0.703), fuerza = c(0.828), rapido = c(0.919), suVel = c(0.945);
const CAMISA = '#f2eee2';
// el ángulo de las aspas cuando el viento cambia dentro del plano: la integral de su velocidad de giro (1,5 + 24 v rad/s)
const giroDe = (vf, t0, t) => { let g = 0.35; for (let x = t0; x < t; x += 1 / 30) { const v = vf(x); if (v > 0) g += (1.5 + 24 * v) / 30; } return g; };
// el número grande que salta (el umbral en mph) y se queda temblando un poco
const numeroSalta = (txt, x, base, t, t0, t1) => { if (t < t0 || t > t1) return; const u = lin(t, t0, t0 + 0.3), b = Math.round(Math.sin(u * Math.PI) * -6 + (u < 1 ? (1 - u) * 6 : 0));
  R.numero(txt, x, base + b, { tam: 16, centro: true }); if (u >= 1 && Math.sin(t * 9) > 0.6) for (const [dx, dy] of [[-22, -16], [22, -14], [0, -22]]) { R.pset(x + dx, base + dy, C.oroL); R.pset(x + dx + 1, base + dy, C.oroL); R.pset(x + dx, base + dy - 1, C.oroL); } };
// la ayudante tras el mostrador del taller (asoman la cabeza y los hombros)
const ayudante = (t, o) => detras([[219, 102, 281, 137], [239, 96, 251, 101]], () => R.actor(EL.senora30, 240, 114, t, o));

// ── 1 · el taller y su ingeniero ─────────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.tallerSaffir(R, t, { categoria: 0, viento: 0, marca: 0 });
  const lee = entre(t, s(0.024), s(0.12));
  ayudante(t, { dir: t > s(0.132) ? -1 : 1, dedo: lee, habla: entre(t, s(0.138), s(0.186)) && parp(t, 8), sonrisa: t > s(0.132) });
  if (lee) { R.rect(256, 87, 263, 95, C.k); R.rect(257, 88, 262, 94, C.blanco); R.rect(258, 90, 261, 90, hex('#8a8a98')); R.rect(258, 92, 260, 92, hex('#8a8a98')); }
  // Saffir llega desde su mesa de dibujo con la caja de herramientas, la deja, ajusta la casita con el destornillador y en
  // «Herbert Saffir» se vuelve, sonríe y se sube las gafas
  const llega = lin(t, s(0) - 0.15, s(0.084)), x = Math.round(lerp(212, 176, suave(llega))), suelo = Math.round(lerp(158, 150, suave(llega))), deja = t > s(0.093);
  const vuelve = t > herbert, ajusta = !vuelve && t > s(0.108) && Math.sin(t * 7) > -0.2;
  const caja = (cx, cy) => { R.rect(cx - 1, cy - 6, cx + 9, cy, C.k); R.rect(cx, cy - 5, cx + 8, cy - 1, hex('#c83a3a')); R.rect(cx, cy - 5, cx + 8, cy - 5, hex('#e86a5a')); R.rect(cx + 3, cy - 8, cx + 5, cy - 6, C.k); R.pset(cx + 4, cy - 3, hex('#e8e4d8')); };
  if (deja) caja(194, 152);
  const r = R.actor(EL.saffir, x, suelo, t, { dir: vuelve || llega < 1 ? (llega < 1 ? -1 : 1) : -1, anda: llega > 0 && llega < 1, dedo: ajusta || entre(t, saffirW, saffirW + 0.5), sonrisa: t > saffirW - 0.1 || llega < 1, habla: entre(t, s(0.114), s(0.156)) && parp(t, 7) });
  if (!deja && llega > 0) caja(x - 6, suelo - 7);
  if (ajusta) { const [mx, my] = r.mano; R.linea(mx - 1, my, mx - 5, my - 2, C.k); R.pset(mx - 6, my - 2, hex('#c8ccd4')); R.rect(mx, my - 1, mx + 1, my + 1, hex('#c83a3a')); }
};

// ── 2 · el banco de viento: cómo fallan las casas ─────────────────────────────────────────────────────────────────────
const v2 = (t) => 0.6 * suave(lin(t, P2 + 0.7, fallan)) + 0.12 * lin(t, fallan, P3);
const p2 = (t) => {
  T.tallerSaffir(R, t, { encuadre: 'banco', categoria: 1.3 * lin(t, estudia + 0.7, fuertes + 0.6), viento: v2(t), giro: giroDe(v2, P2, t) });
  // la mano gira el mando y se va
  const llega = lin(t, P2 + 0.1, P2 + 0.55), gira = lin(t, P2 + 0.55, P2 + 1.0), sale = lin(t, P2 + 1.1, P2 + 1.7);
  if (sale < 1) { const hx = Math.round(lerp(lerp(160, 111, suave(llega)), 345, suave(sale))), hy = 109 + (gira > 0 && gira < 1 ? Math.round(Math.sin(gira * Math.PI * 2) * 2) : 0); T.mano(R, hx, hy, -1, CAMISA); }
  // la otra mano apunta en la libreta con el lápiz mientras las tejas empiezan a fallar
  const escribe = lin(t, estudia - 0.3, estudia + 0.2), deja = lin(t, P3 - 0.6, P3 - 0.1);
  if (escribe > 0 && deja < 1) { const z = entre(t, estudia + 0.2, P3 - 0.6), px = Math.round(298 + (z ? ((t * 7) % 1) * 12 : 0)), py = 124 + (z ? Math.round(Math.sin(t * 31) * 1) : 0), hx = Math.round(lerp(lerp(345, px + 14, suave(escribe)), 345, suave(deja)));
    const ox = hx - (px + 14); R.linea(px + ox, py, px + 5 + ox, py - 6, C.k); R.linea(px + 1 + ox, py, px + 6 + ox, py - 6, hex('#f0c040')); R.pset(px + ox, py, hex('#3a3a46'));
    if (z) for (let i = 0; i < Math.floor(((t - estudia) * 7) % 12); i++) R.pset(296 + i, 124 + (i % 3 === 1 ? -1 : 0), hex('#4a4a5a'));
    T.mano(R, hx, py - 8, -1, CAMISA); }
};

// ── 3 · llega Simpson con su mapa ────────────────────────────────────────────────────────────────────────────────────
const entraS = P3 + 0.45, llegaS = director + 0.85, despliega = centro;
const p3 = (t) => {
  T.tallerSaffir(R, t, { categoria: 1.3, viento: 0.12, marca: 0, puerta: lin(t, P3 + 0.02, P3 + 1.0) });
  // la ayudante saluda a Simpson cuando pasa por delante del mostrador
  ayudante(t, { dir: 1, dedo: entre(t, entraS + 0.5, entraS + 1.3), sonrisa: t > entraS + 0.4 });
  // Simpson entra por la puerta y cruza el taller en diagonal hasta Saffir; en «Center» despliega el mapa
  const u = lin(t, entraS, llegaS), x = Math.round(lerp(293, 204, u)), suelo = Math.round(lerp(138, 152, u)), anda = u > 0 && u < 1;
  const abre = lin(t, despliega, despliega + 0.5), ensena = lin(t, despliega + 0.5, despliega + 0.8);
  const saluda = entre(t, llegaS + 0.05, despliega - 0.05);
  if (t > entraS - 0.1) { R.actor(EL.simpson, x, suelo, t, { dir: -1, anda, habla: entre(t, llegaS, despliega) && parp(t, 8), sonrisa: t > llegaS, dedo: ensena > 0 });
    if (!saluda) T.f_mapaSimpson(R, x - 2, suelo - 9 - Math.round(ensena * 7), t, abre, -1); }
  // Saffir: se vuelve al oír la puerta, se sorprende, saluda, le da la mano y mira el mapa
  R.actor(EL.saffir, 176, 150, t, { dir: t > P3 + 0.15 ? 1 : -1, sorpresa: entre(t, P3 + 0.2, P3 + 0.8), dedo: entre(t, P3 + 0.9, P3 + 1.5) || t > despliega + 0.7, sonrisa: t > P3 + 0.8, habla: entre(t, llegaS - 0.4, llegaS + 0.3) && parp(t, 8) });
  if (saluda) { const y = 141 + (Math.floor(t * 8) % 2); R.rect(191, y, 195, y + 1, hex(CAMISA)); R.rect(201, y, 204, y + 1, hex('#6a5a4a')); R.rect(195, y - 1, 201, y + 2, C.k); R.rect(196, y, 200, y + 1, hex('#f6c290')); R.pset(198, y, hex('#d48a5a')); }
  if (t > despliega + 0.6 && t < despliega + 1.4) R.bocadillo(184, 118, {});
};

// ── 4 · el panel de la escala: del 1 al 5 ────────────────────────────────────────────────────────────────────────────
const tira = uno - 0.22;
const marca4 = (t) => (t < tira ? 0 : t < uno + 0.12 ? lin(t, tira, uno + 0.12) : 1 + 4 * lin(t, uno + 0.12, cinco + 0.36));
const p4 = (t) => {
  T.tallerSaffir(R, t, { encuadre: 'escala', marca: marca4(t) });
  // el tirador del interruptor, que cuelga de la caja (abajo, encendido) y su piloto
  const baja = lin(t, tira - 0.12, tira + 0.08), ty = Math.round(118 + baja * 6);
  R.rect(267, 112, 268, ty, C.k); R.rect(266, ty, 269, ty + 2, C.k); R.rect(267, ty + 1, 268, ty + 1, hex('#c83a3a'));
  R.rect(264, 100, 266, 102, C.k); R.pset(265, 101, t > tira ? hex('#6af06a') : hex('#c83a3a'));
  // Saffir va al interruptor, tira, y en «what to expect» se vuelve con los brazos abiertos
  const va = lin(t, P4 + 0.2, tira - 0.3), x = Math.round(lerp(200, 252, suave(va)));
  R.actor(EL.saffir, x, 153, t, { dir: t > uno + 0.6 ? -1 : 1, anda: va > 0 && va < 1, dedo: entre(t, tira - 0.25, tira + 0.25), brazos: entre(t, gente - 0.2, espera + 0.7), sonrisa: t > cinco, habla: entre(t, gente, espera + 0.6) && parp(t, 8) });
  // Simpson mira el panel apagado, se asombra al encenderse y asiente y señala en «what to expect»
  R.actor(EL.simpson, 112, 162, t, { dir: 1, sorpresa: entre(t, uno, cinco + 0.5), sonrisa: t > cinco + 0.5, dedo: entre(t, espera - 0.1, espera + 1.2), habla: entre(t, P4 + 0.6, P4 + 1.6) && parp(t, 7) });
};

// ── 5 · categoría 1 en el mostrador: el gag de la teja y la campanita ────────────────────────────────────────────────
const gag0 = arranca - 0.1, gag1 = gag0 + 1.9, golpeT = gag0 + 0.7 * 1.9;
const p5 = (t) => {
  T.tallerSaffir(R, t, { encuadre: 'mostrador', categoria: 1, detras: true, gag: lin(t, gag0, gag1) });
  // Saffir, detrás del mostrador: señala el banco del fondo y se ríe con el golpe
  R.actor(EL.saffir, 150, 118, t, { dir: -1, dedo: entre(t, cat1, n74 + 0.4), sonrisa: t > n74 || t > golpeT + 0.1, habla: entre(t, P5 + 0.2, cat1 + 0.6) && parp(t, 7), salto: entre(t, golpeT + 0.2, golpeT + 0.45) ? 1 : 0 });
  numeroSalta('74', 70, 84, t, n74 - 0.05, arranca - 0.2);
  // Simpson, delante del mostrador (va después de lo que repinta el decorado delante)
  const antes = R.delante;
  R.delante = () => { antes?.(); R.actor(EL.simpson, 212, 170, t, { dir: -1, sorpresa: entre(t, golpeT, golpeT + 0.6), salto: entre(t, golpeT, golpeT + 0.3) ? 3 : 0, sonrisa: t > golpeT + 0.6 || entre(t, n74, arranca), dedo: entre(t, arranca, golpeT - 0.1) }); };
};

// ── 6 · categoría 5 en el banco: la casita se desmonta ───────────────────────────────────────────────────────────────
const cat6 = (t) => (t < n157 ? lerp(1.6, 3.6, lin(t, P6, n157)) : t < arrasa - 0.05 ? lerp(3.6, 4.4, lin(t, n157, arrasa - 0.05)) : lerp(4.4, 5, lin(t, arrasa - 0.05, barrios + 0.25)));
const v6 = (t) => lerp(0.62, 1, suave(lin(t, sopla - 0.1, sopla + 0.5)));
const p6 = (t) => {
  T.tallerSaffir(R, t, { encuadre: 'banco', categoria: cat6(t), viento: v6(t), giro: giroDe(v6, P6, t) + 2, mph: Math.round(t < n157 ? lerp(96, 157, lin(t, P6, n157)) : 157 + 3 * lin(t, n157, n157 + 1.2)) });
  const llega = lin(t, P6 + 0.25, sopla - 0.35), gira = lin(t, sopla - 0.3, sopla + 0.1), sale = lin(t, sopla + 0.25, sopla + 0.8);
  if (sale < 1) { const hx = Math.round(lerp(lerp(160, 111, suave(llega)), 345, suave(sale))), hy = 109 + (gira > 0 && gira < 1 ? Math.round(Math.sin(gira * Math.PI * 3) * 2) : 0); T.mano(R, hx, hy, -1, CAMISA); }
  numeroSalta('157', 194, 40, t, n157 - 0.05, arrasa - 0.2);
};

// ── 7 · la mesa de dibujo: la fuerza crece mucho más deprisa que la velocidad ────────────────────────────────────────
const TAB = rampa('#6e8a78 #7a9884 #86a690 #94b49e #a4c2ac #b4d0bc'), PAP = rampa('#d4cdb6 #e2dcc6 #eee8d4 #f8f4e4 #fffcf0'), ROB = rampa('#3e2818 #5a3c24 #7a5432 #9a6e42 #b88a56 #d0a46c');
const TINTA = hex('#4a4a58'), ROJO = hex('#c8302a'), AZUL = hex('#2e5ab8');
const OX = 58, OY = 124, XK = (k) => OX + 36 * k, MPH = [0, 74, 96, 111, 130, 157];
const yF = (v) => OY - 20 * (v / 74) ** 2, yV = (v) => OY - 20 * (v / 74);
const vEn = (sk) => { const k = Math.min(4, Math.max(1, Math.floor(sk))); return lerp(MPH[k], MPH[k + 1], Math.min(1, sk - k)); };   // la velocidad en la categoría sk (1–5)
const CATC = ['#f0c030', '#f0a030', '#e8742a', '#d8402a', '#c8306a'].map(hex);
const CASAS = [
  ['.....kk.....', '....kRRk..S.', '...kRRRRk...', '..kRRRRRRk.S', '.kRRRRRRRRk.', '..kWWWWWWk..', '..kWkkWDWk..', '..kWkkWDWk..', '..kkkkkkkk..', 'GGGGGGGGGGGG'],
  ['.....k......', '....kRk..S..', '...kRRkk..S.', '..kRRRkbk...', '.kRRRRkbbkS.', '..kWWWWWWk..', '..kWkkWDWk..', '..kWkkWDWk..', '..kkkkkkkk..', 'GGGGGGGGGGGG'],
  ['.....k......', '....kbk.....', '...kb.bk.S..', '..kRRk.bk...', '.kRRRk..bk.S', '..kWWWWWWk..', '..kWkkWDWk..', '..kW.kWDWk..', '..kkkkkkkk..', 'GGGGGGGGGGGG'],
  ['............', '..........S.', '...b....b...', '..k......kb.', '..kWWkWWWk..', '..kWWWkWWk..', '..kW.kWDWk..', '..kWkkWDWk..', '..kkkkkkkk..', 'GGGGGGGGGGGG'],
  ['.....AAA....', '....A...A...', '.....AA.A...', '.b........S.', '..bb..b.b...', '...bbbbb....', '.bbBbBBbbb..', 'kbBBbBbBBbk.', 'kkkkkkkkkkk.', 'GGGGGGGGGGGG'],
];
const PCASA = { k: TINTA, R: hex('#a8483a'), W: hex('#f4ecd8'), D: hex('#5a7aa8'), b: hex('#8a6a40'), B: hex('#c8a06a'), S: hex('#5a4a40'), G: hex('#6aa84a'), A: hex('#8a98a8') };
const mesaFija = () => {
  // el tablero de dibujo forrado de vinilo verde, con la luz del flexo a la izquierda, y su canto de roble
  for (let y = 0; y < 166; y++) for (let x = 0; x < 320; x++) { const luz = Math.max(0, 1 - Math.hypot((x - 60) * 0.8, y - 70) / 250); R.pset(x, y, tono(TAB, 0.8 + luz * 3.6 + (ruido(x * 0.09, y * 0.09) - 0.5) * 0.7, x, y)); }
  R.rect(0, 165, 319, 165, hex('#2e2018'));
  for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ROB, (y === 166 ? 5 : y === 167 ? 4 : 2.6 - (y - 168) * 0.1) + (ruido(x * 0.035, y * 0.7) - 0.5) * 1.6, x, y));
  // la sombra del papel y el papel milimetrado, con su cuadrícula fina y la gruesa
  R.rect(33, 19, 265, 155, hex('#5e7866'));
  for (let y = 16; y <= 152; y++) for (let x = 30; x <= 262; x++) { const luz = Math.max(0, 1 - Math.hypot(x - 70, y - 60) / 240); let col = tono(PAP, 1.2 + luz * 2.6 + (ruido(x * 0.25, y * 0.25) - 0.5) * 0.4, x, y);
    const g = (x - 30) % 6 === 0 || (y - 16) % 6 === 0, G = (x - 30) % 30 === 0 || (y - 16) % 30 === 0; if (g) col = mezcla(col, hex('#7aa8c8'), G ? 0.5 : 0.22); R.pset(x, y, col); }
  // la cinta de carrocero en las esquinas
  for (const [x, y] of [[30, 16], [262, 16], [30, 152], [262, 152]]) for (let i = -5; i <= 5; i++) for (let j = -2; j <= 2; j++) { const px = x + i + (x > 100 ? -j : j), py = y + j + (y > 100 ? -i : i) * 0.4 | 0; aclara(px, Math.round(y + j + i * 0.4 * (x > 100 ? -1 : 1) * (y > 100 ? -1 : 1)), hex('#e8d49a'), 0.75); }
  // los ejes a lápiz con sus flechas; las cinco categorías (en sus colores) y sus umbrales en mph debajo
  R.linea(OX, OY, 252, OY, TINTA); R.linea(OX, OY, OX, 22, TINTA); R.linea(252, OY, 248, OY - 2, TINTA); R.linea(252, OY, 248, OY + 2, TINTA); R.linea(OX, 22, OX - 2, 26, TINTA); R.linea(OX, 22, OX + 2, 26, TINTA);
  for (let k = 1; k <= 5; k++) { const x = XK(k); R.linea(x, OY - 2, x, OY + 2, TINTA); R.numero(String(k), x + 1, 137, { centro: true, color: CATC[k - 1] }); const m = String(MPH[k]); cifras(m, x - Math.round((m.length * 4 - 1) / 2) + 1, 141, TINTA); }
  for (let j = 1; j <= 5; j++) R.linea(OX - 2, OY - 20 * j, OX + 2, OY - 20 * j, TINTA);
  // el icono del viento junto al eje (tres rayas onduladas) y, al pie del eje vertical, la casita
  for (let k = 0; k < 3; k++) for (let i = 0; i < 9; i++) R.pset(242 + i, 130 + k * 3 + Math.round(Math.sin(i * 0.9 + k) * 0.6), TINTA);
  // la muestra de tejas de asfalto clavada en el tablero, la foto de una casa dañada y su chincheta
  R.rect(4, 104, 26, 136, C.k); R.rect(5, 105, 25, 135, hex('#c8a46c')); for (let r = 0; r < 5; r++) for (let q = 0; q < 4; q++) { const x = 6 + q * 5 + (r % 2 ? 2 : 0), y = 106 + r * 6; R.rect(x, y, x + 4, y + 5, hex('#6a5e56')); R.rect(x, y + 5, x + 4, y + 5, hex('#3a322c')); R.pset(x + 1, y + 1, hex('#8a7e74')); }
  R.rect(3, 28, 25, 50, hex('#3e5446')); R.rect(2, 27, 24, 49, C.k); R.rect(3, 28, 23, 48, hex('#e8e4d8')); R.rect(5, 30, 21, 44, hex('#8a9098')); R.rect(5, 38, 21, 44, hex('#5a6068')); R.poligono([[8, 38], [13, 33], [19, 38]], hex('#3a3e44')); R.rect(9, 38, 18, 44, hex('#b0b4b8')); R.rect(12, 34, 14, 36, hex('#d8dce0')); R.disco(13, 28, 1, C.rojo);
  // la escuadra de plástico verde (translúcida), la goma con sus migas, dos lápices y el portaminas
  R.poligono([[272, 152], [312, 152], [272, 92]], C.k); for (let y = 93; y < 152; y++) for (let x = 273; x < 312; x++) if ((x - 272) * 60 < (y - 92) * 40 - 1) aclara(x, y, hex('#3ac898'), 0.32);
  for (let y = 108; y < 146; y++) for (let x = 278; x < 300; x++) if ((x - 272) * 60 < (y - 92) * 40 - 400 && (x - 272) * 60 > (y - 92) * 40 - 900) R.pset(x, y, mezcla(R.pget(x, y), hex('#7ab89a'), 0.5));
  R.rect(276, 156, 289, 162, C.k); R.rect(277, 157, 288, 161, hex('#f0c8c0')); R.rect(277, 157, 288, 157, hex('#fae0d8')); for (const [x, y] of [[292, 160], [295, 158], [291, 163], [299, 161]]) R.pset(x, y, hex('#e8c0b8'));
  for (const [x0, y0, x1, y1, cc] of [[236, 158, 262, 161, '#f0c040'], [228, 162, 258, 164, '#3a7ac8']]) { R.linea(x0, y0, x1, y1, C.k); R.linea(x0, y0 - 1, x1, y1 - 1, hex(cc)); R.pset(x0 - 1, y0, hex('#e8c8a0')); R.pset(x0 - 2, y0, TINTA); }
  // la taza de café a la derecha (su vapor va aparte)
  R.rect(281, 58, 299, 77, C.k); R.rect(282, 59, 298, 76, hex('#e8e4d8')); R.rect(282, 59, 298, 61, hex('#4a2c14')); R.rect(282, 62, 284, 74, C.blanco); R.rect(296, 62, 298, 76, hex('#c8c0b0')); R.rect(300, 63, 303, 72, C.k); R.rect(300, 64, 302, 71, hex('#e8e4d8')); R.rect(300, 65, 300, 70, C.k);
  R.rect(286, 66, 294, 70, hex('#c8302a'));   // la franja roja de la taza
};
// la regla paralela de aluminio que cruza el tablero por abajo, con sus marcas
const regla = (y) => { R.rect(0, y - 1, 319, y + 6, C.k); R.rect(0, y, 319, y + 5, hex('#c4c8cc')); R.rect(0, y, 319, y, hex('#eef0f2')); R.rect(0, y + 5, 319, y + 5, hex('#868c92'));
  for (let x = 2; x < 320; x += 4) R.rect(x, y + 1, x, y + (x % 20 === 2 ? 3 : 2), hex('#5a6068')); };
// el lápiz bicolor (rojo y azul) con la mano debajo, a la derecha (así nunca sube a la zona de Atom); la punta en (x, y);
// azul: la punta azul es la que pinta
const lapiz = (x, y, azul) => { const a = azul ? AZUL : ROJO, b = azul ? ROJO : AZUL;
  R.linea(x, y, x + 8, y + 12, C.k); R.linea(x + 1, y, x + 9, y + 12, C.k); R.linea(x + 1, y + 1, x + 4, y + 5, a); R.linea(x + 5, y + 7, x + 8, y + 11, b); R.pset(x, y, a); T.mano(R, x + 17, y + 15, -1, CAMISA); };
const p7 = (t) => {
  fijo('mesa-dibujo', mesaFija);
  regla(156 + Math.round(Math.sin(lin(t, P7 + 0.1, P7 + 0.6) * Math.PI) * -2));
  // el vapor de la taza (se para antes de la zona de Atom)
  for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1), x = Math.round(290 + Math.sin(u * 6 + i) * 3), y = Math.round(55 - u * 9); if (by(x, y) < 0.85 - u * 0.7) R.pset(x, y, hex('#f6f2ea')); }
  // las cinco categorías: el punto en la curva de la fuerza y su casita, cada vez más rota
  const sale = (k) => escalon + 0.18 * (k - 1);
  for (let k = 1; k <= 5; k++) { if (t < sale(k)) continue; const x = XK(k), y = Math.round(yF(MPH[k])), b = Math.round(Math.sin(lin(t, sale(k), sale(k) + 0.22) * Math.PI) * 3) + (entre(t, multiplica + 0.2 * k, multiplica + 0.2 * k + 0.15) ? 1 : 0);
    R.disco(x, y, 2, C.k); R.disco(x, y, 1, ROJO); pinta(CASAS[k - 1], x - 6, y - 14 - b, PCASA); }
  // «multiplies»: los «×» entre una casita y la siguiente
  for (let k = 1; k <= 4; k++) { const tk = multiplica + 0.22 * k; if (t < tk) continue; const x = Math.round((XK(k) + XK(k + 1)) / 2) - 2, y = Math.round((yF(MPH[k]) + yF(MPH[k + 1])) / 2) - 14, e = lin(t, tk, tk + 0.15);
    if (e > 0.3) { R.linea(x, y, x + 4, y + 4, ROJO); R.linea(x + 4, y, x, y + 4, ROJO); R.linea(x + 1, y, x + 5, y + 4, ROJO); R.linea(x + 5, y, x + 1, y + 4, ROJO); } }
  // la curva roja de la fuerza (de «force» a «faster») y la recta azul de la velocidad («than its speed»)
  const pF = lin(t, fuerza, rapido + 0.35), pV = lin(t, suVel - 0.05, suVel + 0.55);
  let punta = null;
  if (pF > 0) { const s1 = 1 + 4 * pF; let ant = null; for (let sk = 1; sk <= s1 + 1e-6; sk += 0.02) { const p = [Math.round(XK(sk)), Math.round(yF(vEn(sk)))]; if (ant) { R.linea(ant[0], ant[1], p[0], p[1], ROJO); R.linea(ant[0] + 1, ant[1], p[0] + 1, p[1], ROJO); } ant = p; } punta = [ant, false]; }
  if (pV > 0) { const s0 = 5 - 4 * pV, a = [XK(5), Math.round(yV(157))], b = [Math.round(XK(s0)), Math.round(yV(vEn(s0)))]; R.linea(a[0], a[1], b[0], b[1], AZUL); R.linea(a[0], a[1] + 1, b[0], b[1] + 1, AZUL); punta = [b, true];
    if (pV >= 1) for (let k = 0; k < 3; k++) R.pset(XK(5) + 6 + k * 2, Math.round(yV(157)) - 1 + (k % 2), AZUL); }
  // la flecha que mide la diferencia en la categoría 5
  if (t > suVel + 0.7) { const x = XK(5) + 8, y0 = Math.round(yF(157)) + 3, y1 = Math.round(yV(157)) - 3, n = lin(t, suVel + 0.7, suVel + 1.0); for (let y = y0; y <= lerp(y0, y1, n); y++) if (y % 3) R.pset(x, y, TINTA);
    if (n >= 1) { R.linea(x, y0, x - 2, y0 + 2, TINTA); R.linea(x, y0, x + 2, y0 + 2, TINTA); R.linea(x, y1, x - 2, y1 - 2, TINTA); R.linea(x, y1, x + 2, y1 - 2, TINTA); } }
  // la mano con el lápiz: marca las categorías, espera, traza la fuerza, da la vuelta al lápiz y traza la velocidad
  let hx, hy, azul = false;
  if (t < escalon - 0.25) { hx = lerp(330, 300, lin(t, P7, escalon - 0.25)); hy = 150; }
  else if (t < multiplica + 0.1) { const k = Math.min(5, 1 + Math.floor((t - escalon + 0.12) / 0.18)); hx = XK(k) + 1; hy = yF(MPH[k]) - 1 + (((t - escalon + 0.12) % 0.18) < 0.06 ? 0 : -3); }
  else if (t < fuerza) { const u = suave(lin(t, multiplica + 0.1, fuerza - 0.2)); hx = lerp(XK(5) + 4, XK(1), u); hy = lerp(yF(157) - 8, yF(74) - 1, u) - Math.sin(u * Math.PI) * 12; }
  else if (t < suVel - 0.05) { if (punta) { hx = punta[0][0]; hy = punta[0][1]; } else { hx = XK(1); hy = yF(74); } if (t > rapido + 0.35) { const u = lin(t, rapido + 0.35, suVel - 0.05); hx = XK(5); hy = lerp(yF(157), yV(157), suave(u)) - Math.sin(u * Math.PI) * 6; azul = u > 0.5; } }
  else if (t < suVel + 0.6) { azul = true; hx = punta ? punta[0][0] : XK(5); hy = punta ? punta[0][1] : yV(157); }
  else { azul = true; const u = suave(lin(t, suVel + 0.6, suVel + 1.0)); hx = lerp(XK(1), XK(5) + 10, u); hy = lerp(yV(74), (yF(157) + yV(157)) / 2 + 4, u) + (entre(t, suVel + 1.1, suVel + 1.25) ? 1 : 0); }
  lapiz(Math.round(hx), Math.round(hy), azul);
  // la sombra del ventilador del techo que barre el tablero
  for (let k = 0; k < 4; k++) { const g = t * 2.4 + k * Math.PI / 2, ca = Math.cos(g), sa = Math.sin(g);
    for (let d = 16; d < 140; d++) for (let w = -6; w <= 6; w++) { const x = Math.round(170 + ca * d - sa * w * (0.6 + d / 140)), y = Math.round(80 + (sa * d + ca * w) * 0.5); if (x < 0 || x > 319 || y < 16 || y > 165 || (x + y) % 2 || (x > 270 && y < 50)) continue; aclara(x, y, hex('#24301e'), 0.07); } }
};

const efectos = [[s(0.027), 'papel'], [s(0.093), 'golpecito'], [s(0.114), 'tic'], [saffirW, 'brillo'],
  [P2 + 0.6, 'interruptor'], [P2 + 0.75, 'zumbido'], [estudia, 'lapiz'], [fallan, 'rafaga'], [fuertes + 0.2, 'golpecito'],
  [P3 + 0.05, 'puerta'], [llegaS + 0.05, 'palmada'], [despliega, 'papel'], [despliega + 0.6, 'pop'],
  [tira, 'interruptor'], ...[0, 1, 2, 3, 4].map((k) => [uno + 0.12 + k * 0.6 * (cinco + 0.36 - uno - 0.12) / 2.4, k < 4 ? 'tic' : 'brillo']), [espera, 'palmada'],
  [cat1 + 0.1, 'rafaga'], [n74, 'pop'], [arranca, 'rafaga'], [golpeT, 'aviso'], [golpeT + 0.35, 'golpecito'],
  [sopla - 0.3, 'interruptor'], [sopla, 'rafaga'], [n157, 'pop'], [n157 + 0.9, 'rafaga'], [arrasa, 'avalancha'], [barrios + 0.4, 'golpecito'],
  ...[1, 2, 3, 4, 5].map((k) => [escalon + 0.18 * (k - 1), 'tic']), [multiplica + 0.22, 'pop'], [fuerza, 'lapiz'], [fuerza + 1.0, 'lapiz'], [suVel - 0.05, 'lapiz'], [suVel + 1.1, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1971', efectos, año: 1971 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-tiros'] = ('Ojos en el cielo', '''// HU-TIROS (frase 17), 1960 → 1961, cartela «1960». Cuatro planos:
// 1. Cabo Cañaveral al amanecer del 1 de abril de 1960 (decorado propio): el cielo del alba tramado con nubes lilas que se
//    encienden por debajo, el sol que asoma en el mar, la torre de servicio roja retirada, el mástil umbilical, los focos,
//    el búnker, el depósito de agua, el faro de bandas y palmitos; el Thor-Able humea en la rampa y en «Then» se enciende,
//    en «eyes in the sky» despega entre nubes de humo iluminadas y sube hacia el este dejando su estela; en la duna, el
//    fotógrafo dispara su flash, el oficial mira con los prismáticos, el niño salta y señala y su madre se tapa los oídos;
//    junto a la ranchera, un técnico; por el camino de arena pasa un jeep, los pelícanos se espantan, la laguna refleja el
//    alba (y las llamas) y el faro gira;
// 2. la Tierra entera en 1960 («the first successful weather satellite»): la última etapa trae al TIROS-1 por detrás del
//    planeta y en «successful» lo suelta con un muelle (se aleja dando vueltas); el tambor gira, destella al sol en
//    «TIROS-1», en «pictures» hace la foto (fogonazo y visor sobre el golfo) y en «clouds from orbit» manda las ondas a
//    Fort Monmouth, donde aparece la foto de nubes;
// 3. la órbita baja en 1961 («the very next year»): un sucesor cruza grande sobre el Atlántico; frente a África crece un
//    remolino con relámpagos; en «spots» el fogonazo y el visor lo fotografían y en «brewing hurricane» queda marcado con
//    un aro rojo que late y un «!»;
// 4. en alta mar (decorado C sin boya ni lancha): bajo un sol tranquilo, un pesquero avanza hacia la derecha con su
//    estela, la ropa tendida, el humo de la chimenea y el perro en la proa; el marinero remienda la red silbando (notas) y
//    el patrón toma café en la puerta de la caseta; detrás, en el horizonte, la torre de nubes del huracán que se está
//    formando crece y relampaguea sin que nadie la mire; en «before anyone» el patrón mira con los prismáticos hacia
//    delante, no ve nada, y en «knows it exists» se encoge de hombros y vuelve a su café.''', AYUDA + r'''
const a = (f) => en('tiros', f);
// cortes: «the first» (5,28), la pausa antes de «And» (10,9) y «far» (15,0)
const P2 = a(0.213), P3 = a(0.529), P4 = a(0.760);
const enciende = a(0.0), despega = a(0.029), cieloW = a(0.060), a1960 = a(0.129);
const suelta = a(0.232), tirosW = a(0.337), fotos = a(0.427), nubesW = a(0.460), orbitaW = a(0.494);
const siguiente = a(0.573), sucesor = a(0.629), ve = a(0.668), gesta = a(0.707), huracan = a(0.724);
const antes = a(0.829), nadie = a(0.849), sabe = a(0.919), existe = a(0.958);

// ── 1 · el despegue del TIROS-1 (Cabo Cañaveral, al amanecer) ────────────────────────────────────────────────────────
const HOR = 108, SX = 226, SY = 107;
const CIELO = rampa('#10142e #161b3e #1e234e #28295c #342f68 #443672 #583e7a #6e4680 #884e84 #a45884 #be6680 #d4787a #e48e76 #f0a874 #f8c27a #fcdc90 #fff0b8');
const MAR = rampa('#3a2e5e #4a386c #5e4478 #7a5282 #9c6086 #c07484 #e09480 #f4b682');
const NUBE = rampa('#2e2a54 #463868 #64467a #8a5684 #b46a86 #e08c82 #f8b48a #ffd8a0');
const MATO = rampa('#1c1a2c #262438 #302e40 #3a3a48 #4a4650 #5e5458 #786660');
const ARENA = rampa('#7a5c62 #94706e #ae8680 #c69c90 #dcb4a2 #ecc8b0 #f8dcc0');
const TORRE = rampa('#5a1e1a #7a2a1e #9e3a24 #c24c2a #e06838');
const nubeAlba = (cx, cy, w, hh, k) => {
  for (let y = Math.round(cy - hh); y <= cy + hh; y++) for (let x = Math.round(cx - w); x <= cx + w; x++) {
    const dx = (x - cx) / w, dy = (y - cy) / hh, d = dx * dx * (1 + 0.4 * Math.sin(y * 0.7 + k)) + dy * dy * 1.6 - ruido(x * 0.12 + k * 7, y * 0.3) * 0.55;
    if (d > 0.55 || y < 0 || y > HOR) continue;
    const abajo = (y - (cy - hh)) / (2 * hh), sol = Math.max(0, 1 - Math.abs(x - SX) / 260);
    R.pset(x, y, tono(NUBE, 0.6 + abajo * 4.4 + sol * 1.4 - d * 1.2, x, y));
  }
};
const palmito = (x, base, alto, t, k) => {
  for (let y = base - alto; y <= base; y++) { const xx = x + Math.round(Math.sin((base - y) * 0.04 + k) * 2); R.pset(xx - 1, y, MATO[0]); R.pset(xx, y, (y + k) % 3 ? MATO[1] : MATO[0]); R.pset(xx + 1, y, (y + k) % 3 === 1 ? MATO[2] : MATO[1]); R.pset(xx + 2, y, MATO[3]); }
  const cx = x + Math.round(Math.sin(alto * 0.04 + k) * 2), cy = base - alto, m = Math.sin(t * 1.3 + k) * 0.06;
  for (let f = 0; f < 15; f++) { const g = -Math.PI * 1.08 + f * Math.PI * 1.16 / 14 + m * (1 + f % 3), L = 12 + ((f * 7) % 5), sol = Math.cos(g) > 0.2;
    for (let i = 1; i < L; i++) { const px = Math.round(cx + Math.cos(g) * i), py = Math.round(cy + Math.sin(g) * i * 0.8 + i * i * 0.04); const ab = i > L - 5 ? 1 : 0;
      for (let q = -ab; q <= ab + (i < 4 ? 1 : 0); q++) R.pset(px - Math.round(Math.sin(g) * q), py + Math.round(Math.cos(g) * q * 0.5) + (q > 0 ? 1 : 0), MATO[q > 0 ? 0 : 1]);
      if (sol && i > 3) R.pset(px, py - 1, i % 2 ? MATO[6] : MATO[5]); } }
  R.disco(cx + 1, cy + 1, 2, MATO[0]); R.pset(cx + 2, cy, MATO[4]);
};
const caboFijo = () => {
  // el cielo del alba: tramado del índigo al oro, con el halo del sol
  for (let y = 0; y < HOR; y++) for (let x = 0; x < 320; x++) { const g = Math.max(0, 1 - Math.hypot((x - SX) * 0.48, (y - SY) * 1.3) / 120);
    R.pset(x, y, tono(CIELO, Math.pow(y / HOR, 1.15) * 13.2 + g * 4.2 + (ruido(x * 0.04, y * 0.15) - 0.5) * 0.5, x, y)); }
  // el sol que asoma (la mitad de arriba) con su borde encendido
  for (let y = SY - 9; y < HOR; y++) for (let x = SX - 10; x <= SX + 10; x++) { const d = Math.hypot(x - SX, y - SY); if (d < 9.5) R.pset(x, y, d > 8 ? hex('#ffd890') : y < SY - 5 ? hex('#fff8e0') : hex('#fff0c0')); }
  // el mar: una banda tras la costa, del lila al oro, con el camino del sol
  for (let y = HOR; y < 120; y++) for (let x = 0; x < 320; x++) { const g = Math.max(0, 1 - Math.abs(x - SX) / (40 + (y - HOR) * 10)); R.pset(x, y, tono(MAR, 4.6 - (y - HOR) * 0.32 + g * 2.8 + (ruido(x * 0.3, y) - 0.5) * 0.6, x, y)); }
  R.rect(0, HOR, 319, HOR, hex('#f0a880'));
  // la costa del cabo: el matorral lejano (oscuro, con el borde encendido por el alba), la laguna que refleja el cielo con
  // sus juncos, el monte bajo de palmitos con las puntas rosadas y el camino de arena
  for (let x = 0; x < 320; x++) { const top = 117 + Math.round(ruido(x * 0.15, 3) * 3 + Math.max(0, Math.sin(x * 0.07)) * 1.5), sol = Math.max(0, 1 - Math.abs(x - SX) / 160);
    for (let y = top; y < 125; y++) { let v = 0.9 + (ruido(x * 0.25, y * 0.4) - 0.5) * 1.6 + sol * 0.9; if (y === top) v = 5.2 + sol; else if (y === top + 1) v = 3.4; R.pset(x, y, tono(MATO, v, x, y)); }
    for (let y = 125; y < 133; y++) { const g = Math.max(0, 1 - Math.abs(x - SX) / (24 + (y - 125) * 5)); R.pset(x, y, tono(MAR, 3.4 - (y - 125) * 0.14 + g * 3.2 + (ruido(x * 0.2, y * 0.9) - 0.5) * 0.9, x, y)); }
    R.pset(x, 125, MATO[2]);
    for (let y = 133; y < 141; y++) R.pset(x, y, tono(MATO, 1.1 + (y - 133) * 0.22 + (ruido(x * 0.18, y * 0.3) - 0.5) * 2.2 + sol * 0.7, x, y)); }
  for (let k = 0; k < 70; k++) { const x = Math.round(hs(k, 5, 2) * 320), y = 127 + Math.round(hs(k, 6, 2) * 5), alto = 2 + Math.round(hs(k, 7, 2) * 3); for (let i = 0; i < alto; i++) R.pset(x + (i > 2 ? 1 : 0), y - i, i === alto - 1 ? MATO[4] : MATO[1]); }
  for (let k = 0; k < 34; k++) { const x = Math.round(hs(k, 8, 2) * 330) - 5, y = 134 + Math.round(hs(k, 9, 2) * 5), w = 4 + Math.round(hs(k, 10, 2) * 4);
    for (let f = 0; f < 6; f++) { const g = -Math.PI * 0.92 + f * Math.PI * 0.84 / 5; for (let i = 0; i < w; i++) { const px = Math.round(x + Math.cos(g) * i), py = Math.round(y + Math.sin(g) * i * 0.75); R.pset(px, py, i >= w - 2 && Math.cos(g) > -0.3 ? MATO[5] : i > w / 2 ? MATO[2] : MATO[1]); } } }
  for (let x = 0; x < 320; x++) { const y0 = 140 + Math.round(Math.sin(x * 0.02) * 1.5); for (let y = y0; y < y0 + 5; y++) R.pset(x, y, tono(ARENA, 2.4 + (y - y0) * 0.3 + (ruido(x * 0.3, y) - 0.5), x, y)); if (x % 7 < 4) { R.pset(x, y0 + 1, ARENA[1]); R.pset(x, y0 + 3, ARENA[1]); } }
  // la torre de servicio retirada, roja, en celosía, con sus plataformas, sus focos y los raíles hasta la rampa
  R.rect(56, 120, 132, 121, hex('#3a3440')); R.rect(56, 120, 132, 120, hex('#8a7a88'));
  for (let y = 60; y <= 120; y++) for (const x of [64, 70, 78, 84]) R.pset(x, y, TORRE[x === 84 ? 1 : 3]);
  for (let y = 66; y <= 116; y += 9) { R.rect(63, y, 85, y, TORRE[4]); R.rect(63, y + 1, 85, y + 1, TORRE[1]); for (let i = 0; i < 6; i++) { R.pset(65 + i, y + 2 + i, TORRE[2]); R.pset(77 - i, y + 2 + i, TORRE[2]); R.pset(79 + i % 5, y + 2 + i, TORRE[1]); } }
  R.rect(58, 56, 90, 58, TORRE[3]); R.rect(58, 59, 90, 59, TORRE[0]); R.linea(90, 58, 98, 52, TORRE[2]); R.linea(98, 52, 98, 62, hex('#6a6070'));
  // el mástil umbilical gris junto a la rampa, la rampa de hormigón y el foso de las llamas
  for (let y = 84; y <= 121; y++) { R.pset(118, y, hex('#9a96a8')); R.pset(121, y, hex('#5e5a6c')); if (y % 4 === 0) { R.pset(119, y, hex('#7a7688')); R.pset(120, y + 1, hex('#7a7688')); } }
  R.rect(92, 119, 132, 123, hex('#2e2836')); R.rect(93, 119, 131, 121, hex('#c8b0b4')); R.rect(93, 119, 131, 119, hex('#f0d8d0')); R.rect(104, 121, 118, 123, hex('#1a1622'));
  // las torres de los focos, el búnker (cúpula de hormigón), el depósito de agua y el faro de bandas
  for (const x of [44, 150]) { R.rect(x, 72, x + 1, 121, hex('#4a4456')); R.pset(x, 72, hex('#8a8098')); for (let i = 0; i < 4; i++) R.rect(x - 3 + i * 2, 68, x - 2 + i * 2, 70, hex('#3a3444')); }
  for (let y = 111; y <= 121; y++) for (let x = 152; x <= 178; x++) { const e = ((x - 165) / 13) ** 2 + ((y - 121) / 10) ** 2; if (e < 1) R.pset(x, y, tono(rampa('#4a3c48 #7a6470 #a88a90 #d8b4b0 #f4d0c0'), 1 + (1 - e) * 1.6 + (x > 168 ? 1.2 : 0) - (y > 118 ? 0.8 : 0), x, y)); }
  R.rect(158, 118, 172, 118, hex('#1a1620'));
  { const x = 214; R.linea(x - 5, 121, x - 3, 104, MATO[2]); R.linea(x + 5, 121, x + 3, 104, MATO[2]); R.linea(x - 4, 113, x + 4, 113, MATO[2]); for (let y = 96; y <= 104; y++) for (let i = -7; i <= 7; i++) if ((i / 7) ** 2 + ((y - 100) / 4.5) ** 2 < 1) R.pset(x + i, y, tono(rampa('#3a3444 #6a5a68 #a88690 #e8bcb0'), 1 + (i > 2 ? 1.4 : 0) + (y < 98 ? 1 : 0), x + i, y)); }
  { const x = 238; for (let y = 88; y <= 121; y++) { const w = 2 + Math.round((y - 88) / 16); for (let i = -w; i <= w; i++) R.pset(x + i, y, (Math.floor((y - 88) / 5) % 2 ? hex('#2a2430') : hex('#e8dcd8'))); R.pset(x + w, y, hex('#1a1620')); }
    R.rect(x - 4, 86, x + 4, 87, hex('#2a2430')); R.rect(x - 2, 81, x + 2, 85, hex('#3a3440')); R.rect(x - 1, 82, x + 1, 84, hex('#f8e8a0')); R.rect(x - 2, 80, x + 2, 80, hex('#2a2430')); R.pset(x, 79, hex('#2a2430')); }
  for (const [x, h] of [[14, 14], [272, 11]]) { for (let y = 121 - h; y <= 121; y++) { R.pset(x, y, MATO[3]); R.pset(x + 4, y, MATO[3]); if (y % 3 === 0) R.rect(x, y, x + 4, y, MATO[3]); } }
  // los postes del teléfono a lo largo del camino, con sus hilos
  const postes = [-10, 76, 162, 248, 334];
  for (const x of postes) { R.rect(x, 114, x + 1, 143, MATO[1]); R.pset(x + 1, 114, MATO[5]); R.rect(x - 4, 116, x + 5, 116, MATO[1]); R.pset(x - 4, 115, MATO[4]); R.pset(x + 5, 115, MATO[4]); }
  for (let k = 0; k < postes.length - 1; k++) for (const dy of [116, 119]) for (let x = postes[k]; x <= postes[k + 1]; x++) { const u = (x - postes[k]) / 86; R.pset(x, Math.round(dy + Math.sin(u * Math.PI) * 4), hex('#2a2434')); }
  // la duna de delante con sus ondas, huellas y conchas
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.2 + (y - 146) * 0.13 + Math.max(0, 1 - Math.abs(x - SX) / 200) * 1.4 + (ruido(x * 0.06, y * 0.2) - 0.5) * 1.6 - (Math.sin(x * 0.18 + y * 0.9) > 0.92 ? 1 : 0); R.pset(x, y, tono(ARENA, v, x, y)); }
  for (let y = 146; y < 149; y++) for (let x = 0; x < 320; x++) if (by(x, y) < 0.5 - (y - 146) * 0.15) R.pset(x, y, MATO[3]);
  for (let k = 0; k < 9; k++) { const x = 104 + k * 9 + (k % 2) * 3, y = 160 + (k % 2) * 3; R.pset(x, y, ARENA[1]); R.pset(x + 1, y, ARENA[1]); }
  for (const [x, y] of [[132, 174], [86, 177], [222, 176]]) { R.pset(x, y, hex('#fff4ec')); R.pset(x + 1, y, hex('#e8c8c0')); }
};
// el Thor-Able: base en (bx, by) y dirección (dx, dy) hacia la punta; s: la escala (se aleja y encoge)
const cohete = (bx, by, dx, dy, s) => {
  const L = Math.round(40 * s), nx = -dy, ny = dx;
  for (let i = 0; i <= L; i++) { const f = i / L, w = f > 0.9 ? 0.6 : f > 0.68 ? 1.2 : 2.2;
    for (let q = -Math.ceil(w); q <= Math.ceil(w); q++) { const x = Math.round(bx + dx * i + nx * q * s), y = Math.round(by + dy * i + ny * q * s); const borde = Math.abs(q) >= Math.ceil(w);
      let col = borde ? hex('#1a1620') : q > 0 ? hex('#c8bcc8') : hex('#fff4ee'); if (!borde && f < 0.68 && Math.floor(f * 8) % 2 === 0 && q < 0) col = hex('#22202a'); if (!borde && f > 0.68 && f < 0.75) col = hex('#22202a'); R.pset(x, y, col); } }
};
const tRise = (t) => Math.max(0, t - despega), sube = (t) => 0.5 * 19 * tRise(t) ** 2;
const base = (t) => { const r = sube(t); return [111 + 0.012 * r * r, 119 - r]; };
const p1 = (t) => {
  fijo('cabo', caboFijo);
  // nubes del alba que se desplazan despacio, encendidas por debajo
  for (const [x0, y, w, hh, v, k] of [[40, 36, 46, 7, 1.4, 1], [170, 52, 60, 8, 1.0, 2], [290, 70, 38, 6, 1.8, 3], [100, 82, 34, 5, 2.4, 4]]) nubeAlba(((x0 + t * v) % 420) - 50, y, w, hh, k);
  // estrellas que se apagan en lo alto (fuera de la barra y de la zona de Atom)
  for (let k = 0; k < 16; k++) { const x = Math.round(hs(k, 1, 9) * 320), y = 16 + Math.round(hs(k, 2, 9) * 24); if ((x > 170 || y > 15) && !(x > 274 && y < 48) && Math.sin(t * 3 + k * 1.7) > 0.2) R.pset(x, y, hex('#c8c0e8')); }
  // los destellos del sol en el mar
  for (let k = 0; k < 14; k++) { const y = HOR + 1 + (k % 10), x = Math.round(SX + (hs(k, Math.floor(t * 5), 3) - 0.5) * (8 + (y - HOR) * 6)); if (hs(k, Math.floor(t * 7), 4) < 0.6) { R.pset(x, y, hex('#fff4c8')); R.pset(x + 1, y, hex('#ffd890')); } }
  // los pelícanos en fila sobre el mar; al encenderse el cohete aletean y suben
  for (let k = 0; k < 5; k++) { const x = Math.round(300 - (t * 9) + k * 9 - (t > enciende ? (t - enciende) ** 2 * 6 : 0)), y = Math.round(100 + k * 1.5 - (t > enciende ? (t - enciende) * 5 : 0)), ala = t > enciende ? Math.floor(t * 9 + k) % 2 : 0;
    if (x < -6 || x > 330) continue; R.rect(x - 1, y, x + 2, y, hex('#3a2c44')); R.pset(x - 2, y - 1, hex('#3a2c44')); R.pset(x + 3, y + 1, hex('#e0a070')); R.pset(x - 3, y - (ala ? 2 : 0), hex('#3a2c44')); R.pset(x + 4, y - (ala ? 2 : 0), hex('#3a2c44')); }
  // el faro gira: su destello cada dos segundos y medio
  if ((t % 2.5) < 0.3) for (let i = 3; i < 9; i++) { R.pset(238 - i, 83, hex('#fff0b0')); R.pset(238 + i, 83, hex('#fff0b0')); }
  // los focos de la rampa, encendidos (parpadean un poco)
  for (const x of [44, 150]) for (let i = 0; i < 4; i++) R.rect(x - 3 + i * 2, 68, x - 2 + i * 2, 69, Math.sin(t * 13 + i + x) > -0.8 ? hex('#fff6c8') : hex('#e8c880'));
  for (const x of [63, 85]) R.pset(x, 55, Math.sin(t * 3 + x) > 0 ? hex('#ff5040') : hex('#8a2a24'));
  palmito(10, 146, 58, t, 0); palmito(182, 146, 40, t, 2); palmito(306, 146, 50, t, 4);
  // un jeep del ejército que pasa despacio por el camino de arena, con su polvareda
  { const x = Math.round(-30 + t * 15), y = 143; if (x < 340) { for (let k = 0; k < 6; k++) { const u = ((t * 1.2 + k / 6) % 1); if (by(x + k, y) < 1 - u) R.disco(Math.round(x - 4 - u * 14), Math.round(y - 2 - u * 4), 1 + u * 2, ARENA[3 + (k % 2)]); }
    R.rect(x, y - 6, x + 16, y - 2, hex('#2a3022')); R.rect(x + 1, y - 5, x + 15, y - 3, hex('#5a6440')); R.rect(x + 1, y - 5, x + 15, y - 5, hex('#7a8458')); R.rect(x + 11, y - 9, x + 12, y - 6, hex('#2a3022')); R.rect(x + 12, y - 9, x + 14, y - 9, hex('#8a90b8'));
    R.disco(x + 3, y - 1, 2, C.k); R.disco(x + 13, y - 1, 2, C.k); R.pset(x + 3, y - 1, hex('#6a6a70')); R.pset(x + 13, y - 1, hex('#6a6a70'));
    R.rect(x + 7, y - 10, x + 9, y - 7, hex('#f0c8a0')); R.rect(x + 7, y - 11, x + 9, y - 10, hex('#4a5430')); R.pset(x + 16, y - 4, hex('#fff2b0')); } }
  // el humo del suelo: nace con el encendido, se ensancha por los dos lados, iluminado por las llamas
  const r = sube(t), fuego = t > enciende ? Math.min(1, (t - enciende) / 0.3) * Math.max(0, 1 - r / 60) : 0;
  if (fuego > 0) { const fl = 0.85 + Math.sin(t * 37) * 0.15; for (let y = 92; y < 125; y++) for (let x = 66; x < 156; x++) { const d = Math.hypot(x - 111, (y - 119) * 1.5) / 44; if (d < 1) aclara(x, y, hex('#ffb060'), (1 - d) * (1 - d) * 0.6 * fuego * fl); }
    for (let y = 125; y < 133; y++) for (let x = 104; x < 119; x++) if (by(x, y + Math.floor(t * 12)) < 0.75 * fuego * (1 - Math.abs(x - 111) / 8)) R.pset(x, y, Math.abs(x - 111) < 3 ? hex('#ffe8a0') : hex('#ff9a4a')); }
  // la laguna se riza: rayitas de luz que se desplazan
  for (let k = 0; k < 12; k++) { const x = Math.round(((k * 37 + t * (3 + k % 3)) % 340) - 10), y = 126 + (k * 5) % 6; R.rect(x, y, x + 2 + k % 3, y, MAR[5 + (k % 2)]); }
  for (let i = 0; i < 34; i++) { const t0 = enciende + 0.15 + i * 0.06; if (t < t0) continue; const age = t - t0, lado = i % 2 ? 1 : -1, v = 18 + (i % 5) * 5;
    const x = 111 + lado * (6 + v * (1 - Math.exp(-age * 1.2))), y = 121 - 2 - age * 2.4 - (i % 3), rr = Math.min(11, 3 + age * 3.4);
    R.disco(Math.round(x + 1), Math.round(y + 1), rr, hex('#8a7088')); R.disco(Math.round(x), Math.round(y), rr - 0.8, age < 0.5 && fuego > 0.3 ? hex('#ffd0a0') : hex('#f4dcd8')); R.disco(Math.round(x + 2), Math.round(y - 1), rr * 0.5, hex('#fff2ea')); }
  // la estela: bolas de humo que deja el cohete, que crecen, se las lleva el viento y se apagan
  if (t > despega) for (let i = 0; ; i++) { const tb = despega + i * 0.05; if (tb > t) break; const [qx, qy] = base(tb), age = t - tb, rr = Math.min(6, 1.2 + age * 1.6), x = Math.round(qx - age * 3), y = Math.min(116, Math.round(qy + 2 + age * 1.2));
    if (age > 2.8 && by(x, y) < (age - 2.8) / 1.5) continue; R.disco(x + 1, y + 1, rr, hex('#9a88a8')); R.disco(x, y, rr * 0.85, age < 0.25 ? hex('#ffe0b0') : hex('#f8e8e4')); }
  // el cohete: humea antes de encenderse; luego sube, se inclina hacia el este y encoge al alejarse, con su llama
  const [bx, by0] = base(t), dxr = 0.024 * r, nn = Math.hypot(dxr, 1), dx = dxr / nn, dy = -1 / nn, sc = Math.max(0.35, 1 - r / 150);
  if (t < enciende) for (let k = 0; k < 4; k++) { const u = ((t * 0.7 + k / 4) % 1); R.pset(Math.round(108 - u * 6 + Math.sin(u * 9) * 1), Math.round(98 - u * 5), by(k, Math.floor(t * 10)) < 1 - u ? hex('#f4eef0') : hex('#c8b8c8')); }
  if (t > enciende) { const L = Math.round((8 + Math.sin(t * 40) * 2 + (r > 0 ? 6 : 0)) * Math.max(0.5, sc)); for (let i = 0; i < L; i++) { const w = Math.max(0, 2.2 * (1 - i / L)), cx = bx - dx * i, cy = by0 - dy * i + 1;
      for (let q = -Math.ceil(w); q <= Math.ceil(w); q++) { const cc = i < L * 0.3 && Math.abs(q) < 1 ? hex('#fffbe8') : i < L * 0.6 ? hex('#ffd860') : hex('#ff8a3a'); R.pset(Math.round(cx - dy * q), Math.round(cy + dx * q), cc); } }
    for (let k = 0; k < 20; k++) { const g = k / 20 * Math.PI * 2, rr = 6 + Math.sin(t * 30 + k) * 1.5; aclara(Math.round(bx + Math.cos(g) * rr), Math.round(by0 + 2 + Math.sin(g) * rr), hex('#fff0b0'), 0.5); } }
  cohete(bx, by0, dx, dy, sc);
  // los brazos del mástil umbilical: se retiran al despegar
  const ret = lin(t, despega - 0.25, despega + 0.1); for (const yy of [94, 104]) { const L = Math.round(5 * (1 - ret)); for (let i = 0; i < L; i++) R.pset(117 - i, yy - Math.round(ret * 3), hex('#8a869a')); }
  // la gente de la duna: el fotógrafo con su trípode, el oficial con prismáticos, la madre y el niño, el técnico tras la ranchera
  const dispara = despega + 0.55;
  R.actor(EL.periodista, 20, 168, t, { dir: 1, dedo: entre(t, dispara - 0.3, dispara + 0.3), sorpresa: entre(t, despega, despega + 0.4), sonrisa: t > dispara + 0.4 });
  { R.linea(40, 168, 44, 152, hex('#2a2430')); R.linea(48, 168, 45, 152, hex('#2a2430')); R.linea(44, 168, 45, 152, hex('#4a4250')); R.rect(38, 145, 49, 152, C.k); R.rect(39, 146, 48, 151, hex('#3a3644')); R.rect(47, 143, 51, 148, C.k); R.disco(49, 145, 1, hex('#8a90c8')); R.rect(40, 143, 43, 145, hex('#c8c8d0'));
    if (entre(t, dispara, dispara + 0.15)) { for (let i = 2; i < 9; i++) { R.pset(41 + i, 144, C.blanco); R.pset(41 - i, 144, C.blanco); R.pset(41, 144 - i, C.blanco); R.pset(41, 144 + i, C.blanco); } } }
  const prism = t > enciende - 0.2;
  const ro = R.actor(EL.oficial, 66, 170, t, { dir: 1, dedo: prism, sonrisa: t > a1960, habla: entre(t, cieloW + 0.3, a1960) && parp(t, 8) });
  if (prism) { const [mx, my] = ro.mano; R.rect(mx - 3, my - 2, mx + 1, my + 1, C.k); R.pset(mx - 2, my - 1, hex('#5a6a9a')); R.pset(mx, my - 1, hex('#5a6a9a')); }
  R.actor(EL.senora30, 174, 166, t, { dir: -1, brazos: entre(t, enciende + 0.1, despega + 0.8), sonrisa: t > despega + 0.8, sorpresa: entre(t, enciende, enciende + 0.5) });
  R.actor(EL.chico, 194, 169, t, { dir: -1, dedo: entre(t, despega, a1960 + 0.6), salto: entre(t, cieloW - 0.1, cieloW + 0.3) || entre(t, a1960, a1960 + 0.3) ? 3 : 0, sorpresa: entre(t, enciende, despega + 0.3), sonrisa: t > despega + 0.3, habla: entre(t, a1960 + 0.6, P2) && parp(t, 9) });
  R.actor(EL.tecnico, 299, 171, t, { dir: -1, dedo: entre(t, despega + 0.2, a1960 + 0.4), sonrisa: t > a1960, sorpresa: entre(t, enciende, despega + 0.2) });
  // la ranchera de 1960, turquesa y blanca, aparcada en la arena (por delante del técnico)
  { const x = 232, y = 174; R.disco(262, y + 1, 1, hex('#5a4450')); for (let i = -30; i <= 30; i++) R.pset(262 + i, y + 1, hex('#6a5058'));
    R.poligono([[x, y - 4], [x + 2, y - 15], [x + 12, y - 16], [x + 18, y - 24], [x + 54, y - 25], [x + 60, y - 17], [x + 62, y - 6], [x + 60, y - 3]], C.k);
    R.poligono([[x + 1, y - 5], [x + 3, y - 14], [x + 13, y - 15], [x + 19, y - 23], [x + 53, y - 24], [x + 59, y - 17], [x + 61, y - 6], [x + 59, y - 4]], hex('#3aa8a0'));
    R.poligono([[x + 19, y - 22], [x + 53, y - 23], [x + 57, y - 17], [x + 16, y - 16]], hex('#f4ece8'));
    for (const [w0, w1] of [[21, 30], [32, 42], [44, 55]]) R.poligono([[x + w0, y - 21], [x + w1, y - 21], [x + w1 + (w1 > 50 ? 2 : 0), y - 17], [x + w0 - (w0 < 25 ? 2 : 0), y - 17]], hex('#8a86b8'));
    R.linea(x + 23, y - 20, x + 27, y - 18, hex('#f0b0a8')); R.linea(x + 35, y - 20, x + 39, y - 18, hex('#f0b0a8'));
    R.rect(x + 2, y - 10, x + 60, y - 10, hex('#f0f4f8')); R.rect(x + 2, y - 9, x + 60, y - 9, hex('#7a8a98')); R.rect(x + 3, y - 6, x + 60, y - 4, hex('#2a7a74'));
    R.rect(x - 1, y - 7, x + 3, y - 4, hex('#e8ecf0')); R.rect(x + 59, y - 7, x + 63, y - 4, hex('#e8ecf0')); R.pset(x + 2, y - 12, hex('#fff6c8')); R.rect(x + 58, y - 22, x + 61, y - 15, hex('#3aa8a0')); R.pset(x + 60, y - 13, hex('#e83a3a'));
    for (const wx of [x + 13, x + 49]) { R.disco(wx, y - 2, 5, C.k); R.disco(wx, y - 2, 3.6, hex('#f4f0ec')); R.disco(wx, y - 2, 2.4, hex('#2a2430')); R.disco(wx, y - 2, 1.4, hex('#c8ccd4')); R.pset(wx - 1, y - 3, C.blanco); } }
  // la avena de mar de la duna, que se mece
  for (const [x0, n] of [[0, 9], [126, 6], [300, 7]]) for (let k = 0; k < n; k++) { const x = x0 + k * 3 + (k % 2), alto = 10 + (k * 7) % 8, m = Math.sin(t * 2 + k * 0.7) * 2;
    for (let i = 0; i < alto; i++) R.pset(Math.round(x + m * i / alto), 180 - i - (x0 === 126 ? 14 : 0), i > alto - 4 ? hex('#e8c890') : hex('#6a7a48')); }
};

// ── 2 · la Tierra en 1960: el TIROS-1 llega y manda la primera foto ──────────────────────────────────────────────────
const camino = (u) => { const f = Math.PI * (1.12 - 1.24 * u), px = 95 * Math.cos(f), py = 30 * Math.sin(f), cc = Math.cos(-0.32), ss = Math.sin(-0.32); return [116 + px * cc - py * ss, 99 + px * ss + py * cc, Math.sin(f) > -0.02]; };
const u2 = (t) => lerp(0.15, 0.62, lin(t, P2, P3));
// la última etapa del Thor-Able: un cilindro blanco y negro que sigue al satélite y, suelto, se queda atrás dando vueltas
const etapa = (x, y, g) => { const dx = Math.cos(g), dy = Math.sin(g);
  for (let i = -9; i <= 9; i++) for (let q = -3; q <= 3; q++) { const px = Math.round(x + dx * i - dy * q), py = Math.round(y + dy * i + dx * q); R.pset(px, py, Math.abs(q) === 3 || Math.abs(i) === 9 ? hex('#141420') : (i > 3 ? hex('#2a2a34') : q < 0 ? hex('#f4f0ea') : hex('#a8a8b8'))); }
  for (let q = -2; q <= 2; q++) R.pset(Math.round(x - dx * 10 - dy * q), Math.round(y - dy * 10 + dx * q), hex('#5a5a68')); };
const p2 = (t) => {
  const u = u2(t), { P } = T.orbita(R, t, { lat: 22, lon: -74, vel: 1.2, t0: P2 + 3, tiros: u, foto: lin(t, fotos, fotos + 0.85), objetivo: [30, -85], envia: lin(t, nubesW - 0.05, P3 - 0.15) });
  // la etapa: pegada detrás del satélite hasta «successful»; luego un muelle la separa y se queda atrás dando vueltas
  const tras = 0.045 + (t > suelta ? (t - suelta) * 0.018 : 0), ue = u - tras, [ex, ey, delante] = camino(ue), [ax, ay] = camino(ue - 0.01), g0 = Math.atan2(ey - ay, ex - ax);
  if (delante && ue > 0.1) etapa(Math.round(ex), Math.round(ey), g0 + (t > suelta ? (t - suelta) * 1.6 : 0));
  if (entre(t, suelta, suelta + 0.5)) { const [sx, sy] = camino(u), q = lin(t, suelta, suelta + 0.5); for (let k = 0; k < 8; k++) { const g = k / 8 * Math.PI * 2, rr = 3 + q * 9; if (by(k, 3) < 1 - q) R.pset(Math.round((sx + ex) / 2 + Math.cos(g) * rr), Math.round((sy + ey) / 2 + Math.sin(g) * rr * 0.6), C.blanco); } }
  // el destello del sol en el tambor, en «TIROS-1»
  if (entre(t, tirosW, tirosW + 0.45)) { const [sx, sy] = camino(u), L = Math.round(3 + Math.sin(lin(t, tirosW, tirosW + 0.45) * Math.PI) * 6); for (let i = 1; i <= L; i++) { R.pset(Math.round(sx) - 6 + i, Math.round(sy) - 4, C.blanco); R.pset(Math.round(sx) - 6 - i, Math.round(sy) - 4, C.blanco); R.pset(Math.round(sx) - 6, Math.round(sy) - 4 - i, C.blanco); R.pset(Math.round(sx) - 6, Math.round(sy) - 4 + i, C.blanco); } }
  // la foto que llega a Fort Monmouth: la primera imagen de nubes desde la órbita
  if (t > orbitaW) { const [fx, fy] = P([40.3, -74.1]), e = lin(t, orbitaW, orbitaW + 0.3), x = Math.round(fx) + 8, y = Math.round(fy) - 22 - Math.round(Math.sin(e * Math.PI) * 4);
    R.rect(x - 1, y - 1, x + 19, y + 15, C.k); R.rect(x, y, x + 18, y + 14, hex('#f4f0e6')); R.rect(x + 2, y + 2, x + 16, y + 11, hex('#2a2e36'));
    for (let j = 0; j < 10; j++) for (let i = 0; i < 15; i++) { const n = ruido((x + i) * 0.35, (y + j) * 0.5 + 3); if (n > 0.55) R.pset(x + 2 + i, y + 2 + j, n > 0.72 ? hex('#f0f0f0') : hex('#9aa0a8')); }
    R.linea(x + 3, y + 9, x + 9, y + 6, hex('#6a6a72')); R.pset(fx | 0, (fy | 0) - 2, C.blanco); R.linea(Math.round(fx), Math.round(fy) - 2, x + 2, y + 14, hex('#c8c8d0')); }
};

// ── 3 · la órbita baja en 1961: un sucesor ve el remolino frente a África ────────────────────────────────────────────
const p3 = (t) => {
  T.orbita(R, t, { encuadre: 'cerca', remolino: lerp(0.3, 1, lin(t, P3, huracan + 0.4)), tiros: lerp(0.12, 0.7, lin(t, P3, P4)), foto: lin(t, ve, ve + 0.85) });
  // marcado: el aro rojo que late alrededor del remolino y el «!»
  if (t > ve + 0.85) { const q = lin(t, ve + 0.85, ve + 1.1), rr = 30 + Math.sin(t * 6) * 1.5; for (let k = 0; k < 72; k++) { if (k % 6 >= 4 || k / 72 > q) continue; const g = k / 72 * Math.PI * 2; for (const d of [0, 1]) { R.pset(Math.round(150 + Math.cos(g) * (rr + d) * 1.35), Math.round(146 + Math.sin(g) * (rr + d) * 0.72), d ? hex('#ff8a6a') : hex('#e8281e')); } }
    if (t > gesta) R.bocadillo(184, 128, {}); }
};

// ── 4 · en alta mar, nadie lo sabe ───────────────────────────────────────────────────────────────────────────────────
const CASCO = rampa('#123038 #1c4450 #285a66 #367080'), BLANCO = rampa('#9a988c #c8c4b4 #e8e4d6 #fbf8ee');
const barca = (t, W) => {
  const S = 172, B = 312, borda = (x) => Math.round(W - 20 - Math.max(0, (x - 230) / 82) ** 1.6 * 9);
  // la estela y la ola de proa
  for (let i = 0; i < 70; i++) { const x = S - 2 - i, sp = i * 0.18, f = Math.floor(t * 6 + i * 0.3); for (const s of [-1, 1]) { const y = Math.round(W + 1 + s * sp * 0.25 + (s > 0 ? sp * 0.12 : 0)); if (y < W - 2 || (i + f) % 3 === 0 || by(x, y) < i / 80) continue; R.pset(x, y, i < 20 ? hex('#f4fbff') : hex('#bcd8ee')); } }
  for (let k = 0; k < 6; k++) { const ph = (t * 3 + k * 0.4) % 1, x = Math.round(B - 4 + ph * 6), y = Math.round(W - 2 - Math.sin(ph * Math.PI) * 3); R.pset(x, y, hex('#f4fbff')); R.pset(x + 1, y, hex('#bcd8ee')); }
  // el mástil con la cruceta, el farol, la banderola, los obenques y la pluma con su aparejo
  R.rect(214, W - 98, 215, W - 22, hex('#5a4030')); R.rect(214, W - 98, 214, W - 22, hex('#9a7450')); R.rect(208, W - 84, 221, W - 83, hex('#5a4030')); R.pset(215, W - 100, hex('#f8e8a0'));
  { const fl = Math.sin(t * 7) > 0 ? 1 : 0; R.poligono([[216, W - 98], [228, W - 96 + fl], [216, W - 93]], hex('#c83a3a')); }
  R.linea(214, W - 96, B - 2, borda(B - 2), hex('#3a3440')); R.linea(214, W - 96, S + 2, W - 21, hex('#3a3440'));
  R.linea(214, W - 60, 182, W - 44, hex('#5a4030')); R.linea(214, W - 61, 182, W - 45, hex('#9a7450')); R.linea(182, W - 44, 186, W - 30, hex('#3a3440'));
  // la caseta del patrón: blanca, con el techo verde azulado, ventanas, la puerta abierta, el salvavidas y la sirena
  for (let y = W - 56; y < W - 20; y++) for (let x = 246; x <= 284; x++) R.pset(x, y, tono(BLANCO, 2.6 - (x > 278 ? 1 : 0) - (y > W - 26 ? 0.8 : 0) + (by(x, y) - 0.5) * 0.3, x, y));
  R.rect(244, W - 60, 288, W - 57, hex('#1e5a68')); R.rect(244, W - 60, 288, W - 60, hex('#4a8a98')); R.rect(244, W - 56, 288, W - 56, hex('#123038'));
  for (const wx of [258, 266, 274]) { R.rect(wx, W - 52, wx + 5, W - 46, C.k); R.rect(wx + 1, W - 51, wx + 4, W - 47, hex('#8ac0e0')); R.pset(wx + 1, W - 51, C.blanco); }
  R.rect(248, W - 50, 254, W - 21, C.k); R.rect(249, W - 49, 253, W - 22, hex('#2a2a34'));
  R.disco(279, W - 36, 3, hex('#e8642a')); R.disco(279, W - 36, 1, hex('#f0ece0')); R.pset(277, W - 37, C.blanco);
  R.rect(270, W - 64, 273, W - 61, hex('#3a3440')); R.rect(274, W - 63, 276, W - 62, hex('#c8c8d0'));
  // la chimenea negra con su franja roja y el humo que se lleva el viento hacia atrás
  R.rect(238, W - 72, 243, W - 57, C.k); R.rect(239, W - 71, 242, W - 58, hex('#2a2a34')); R.rect(239, W - 66, 242, W - 64, hex('#c83a3a'));
  for (let k = 0; k < 8; k++) { const u = ((t * 0.45 + k / 8) % 1), x = Math.round(240 - u * 40 + Math.sin(u * 7 + k) * 2), y = Math.round(W - 74 - u * 10), rr = 1 + u * 3; if (by(x, y) < 1 - u * 0.8) R.disco(x, y, rr, u < 0.3 ? hex('#5a5a62') : hex('#9a9aa2')); }
  // la ropa tendida entre el mástil y la caseta, que ondea
  for (let x = 216; x <= 246; x++) R.pset(x, Math.round(W - 66 + Math.sin((x - 216) / 30 * Math.PI) * 3), hex('#3a3440'));
  for (const [x, c, k] of [[222, hex('#f4f0e6'), 0], [231, hex('#c84a4a'), 1], [239, hex('#4a6ab0'), 2]]) { const sw = Math.round(Math.sin(t * 6 + k) * 2), y = Math.round(W - 66 + Math.sin((x - 216) / 30 * Math.PI) * 3);
    R.poligono([[x, y], [x + 6, y], [x + 6 + sw, y + 7], [x + sw, y + 7]], c); R.linea(x, y, x + sw, y + 7, C.k); }
  // la red amontonada a popa con sus boyas naranjas y las cajas de pescado
  for (let y = W - 32; y < W - 19; y++) for (let x = 176; x < 206; x++) { const d = ((x - 191) / 15) ** 2 + ((y - (W - 19)) / 13) ** 2; if (d < 1) R.pset(x, y, (x + y) % 3 === 0 ? hex('#2a4a3a') : (x - y) % 4 === 0 ? hex('#6a9a6a') : hex('#3e6a4e')); }
  for (const [x, y] of [[182, W - 29], [192, W - 31], [200, W - 27]]) { R.disco(x, y, 2, C.k); R.disco(x, y, 1.4, hex('#f08a2a')); R.pset(x - 1, y - 1, hex('#ffc080')); }
  R.rect(222, W - 28, 234, W - 20, C.k); R.rect(223, W - 27, 233, W - 21, hex('#a87a4a')); R.rect(223, W - 24, 233, W - 24, hex('#7a5232'));
};
const casco = (W) => {
  const S = 172, B = 312, borda = (x) => Math.round(W - 20 - Math.max(0, (x - 230) / 82) ** 1.6 * 9);
  for (let x = S; x <= B; x++) { const top = borda(x), bot = x > 300 ? Math.round(W - (x - 300) * 2.2) : x < 176 ? W - (176 - x) : W;
    for (let y = top; y <= bot; y++) { let col; if (y === top) col = hex('#e8e4d6'); else if (y === top + 1) col = hex('#123038'); else if (y >= bot - 1) col = hex('#a83a2a'); else col = tono(CASCO, 3 - (y - top) / 7 + (by(x, y) - 0.5) * 0.4, x, y); if (x === S || x === B) col = hex('#0e2228'); R.pset(x, y, col); } }
  for (let x = S; x <= B; x++) { R.pset(x, borda(x) + 4, hex('#3a7a88')); if (x % 23 === 5) for (let j = 6; j < 12; j++) R.pset(x, borda(x) + j, hex('#7a4a3a')); }
  for (const px of [292, 300]) { R.disco(px, borda(px) + 8, 1.5, hex('#c8d0d8')); R.pset(px, borda(px) + 8, hex('#3a4a5a')); }
  R.rect(303, borda(303) + 3, 306, borda(303) + 5, hex('#2a2a30'));
};
const p4 = (t) => {
  T.maquinaCalor(R, t, { crece: lerp(0.8, 0.97, lin(t, P4, P4 + 4.6)), boya: false, barco: false });
  const W = 164 + Math.round(Math.sin(t * 1.7) * 1);
  barca(t, W);
  // el perro de la proa, con las patas en la borda, las orejas al viento y la lengua fuera
  { const oreja = Math.floor(t * 6) % 2, F = oreja ? ['..kk........', '.kOOk.......', 'kOOOkkkkk...'] : ['............', 'kkk..kk.....', 'kOOOkkkkk...'];
    pinta([...F, '.kkHHHHHHkk.', '..kHHeHHHHHk', '..kHHHHHHHHk', '..kHHHHHkkkk', '..kHHHHHkR..', '...kHHHHkR..', '..kHk.kHk...'], 282, W - 39, { k: hex('#2a1e18'), O: hex('#8a5a2a'), H: hex('#d8a05a'), e: C.k, R: hex('#e87a8a') }); }
  // el marinero remienda la red silbando (las notas suben); el patrón toma café en la puerta y mira con los prismáticos
  R.actor(EL.navegante, 190, W - 15, t, { dir: 1, dedo: Math.sin(t * 5) > 0, sonrisa: true, pal: { C: hex('#3a5a8a'), c: hex('#2a4468'), W: hex('#3a5a8a') }, tocado: 'gorra' });
  for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1), x = Math.round(206 + u * 12 + Math.sin(u * 8 + k) * 2), y = Math.round(W - 44 - u * 18); if (u > 0.85) continue; R.rect(x, y - 3, x, y, hex('#1e2a3a')); R.pset(x - 1, y, hex('#1e2a3a')); R.pset(x + 1, y - 3, hex('#1e2a3a')); R.pset(x + 2, y - 2, hex('#1e2a3a')); }
  const mira = entre(t, antes, sabe + 0.1), encoge = entre(t, sabe + 0.15, existe + 0.5), bebe = !mira && !encoge && (t % 2.4) < 0.9;
  const rp = R.actor(EL.oficial, 230, W - 14, t, { dir: 1, dedo: mira || bebe, brazos: encoge, sonrisa: !mira, habla: entre(t, existe + 0.5, existe + 1.1) && parp(t, 8), pal: { C: hex('#e8e4d8'), c: hex('#c0bcb0'), W: hex('#e8e4d8'), F: hex('#3a3a4a') }, tocado: 'general' });
  { const [mx, my] = rp.mano; if (mira) { R.rect(mx - 1, my - 2, mx + 3, my + 1, C.k); R.pset(mx, my - 1, hex('#5a6a9a')); R.pset(mx + 2, my - 1, hex('#5a6a9a')); }
    else if (bebe) { R.rect(mx - 1, my - 2, mx + 2, my + 2, C.k); R.rect(mx, my - 1, mx + 1, my + 1, hex('#f0ece0')); } }
  casco(W);
  // una gaviota que da vueltas y se posa en la cruceta
  { const pos = t < sabe ? [Math.round(200 + Math.cos(t * 1.4) * 30), Math.round(W - 108 + Math.sin(t * 2.8) * 6)] : [Math.round(lerp(200 + Math.cos(sabe * 1.4) * 30, 220, lin(t, sabe, sabe + 0.8))), Math.round(lerp(W - 108 + Math.sin(sabe * 2.8) * 6, W - 87, lin(t, sabe, sabe + 0.8)))];
    if (t < sabe + 0.8) R.gaviota(pos[0], pos[1], t, 1); else { R.rect(219, W - 88, 222, W - 86, hex('#f4f4f0')); R.pset(223, W - 88, hex('#e8a040')); R.pset(219, W - 87, hex('#8a8a90')); } }
};

const efectos = [[enciende, 'boom'], [despega - 0.1, 'jet', { dur: 2.8 }], [despega + 0.55, 'flash'],
  [suelta, 'pop'], [tirosW, 'brillo'], [fotos, 'flash'], [nubesW, 'bip'], [nubesW + 0.35, 'bip'], [orbitaW, 'papel'],
  [P3 + 0.4, 'whoosh'], [ve, 'flash'], [ve + 0.85, 'bip'], [gesta, 'pop'],
  [P4 + 0.1, 'ola'], [P4 + 0.3, 'motor', { dur: 3.2 }], [antes, 'tic'], [sabe + 0.2, 'ola'], [existe + 0.4, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1960', efectos, año: (t) => (t < P3 ? 1960 : 1961) });
''')
