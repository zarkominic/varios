E = {}

# piezas comunes de las dos escenas (tramas, cielo de noche en búfer, nubes de tres tonos, vapor, madera, antenas
# parabólicas que apuntan). Los brazos, siempre con T.brazo / T.mano o con R.actor(..., { sostiene }).
PRE = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea');
const cl = (u) => Math.max(0, Math.min(1, u));
const ease = (u) => { u = cl(u); return u * u * (3 - 2 * u); };
const hs = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(cl(f) * (cs.length - 1) + bay(x, y))))];
const mez = (a, b, k) => { let r = 0; for (const sh of [0, 8, 16]) r |= Math.round(((a >>> sh) & 255) * (1 - k) + ((b >>> sh) & 255) * k) << sh; return (r | 0xff000000) >>> 0; };
const tinta = (x, y, c, f) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, f)); };
const tranquila = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 22);
const curva = (t, pts) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * ease((t - a) / Math.max(1e-6, b - a)); } return pts[pts.length - 1][1]; };
const fijo = (() => { const B = {}; return (k, f) => { if (!B[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); B[k] = b; } R.copiar(B[k]); }; })();
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const trama = (x0, y0, x1, y1, cs, f0, f1, sem = 1, ruido = 0.12) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cs, f0 + (f1 - f0) * (y - y0) / Math.max(1, y1 - y0) + (hs(x >> 1, y >> 1, sem) - 0.5) * ruido, x, y)); };
const NOCHE = ['#070a1a', '#0c1228', '#121a38', '#1a2448', '#24305a', '#2e3c6a'].map(hex);
const cieloNoche = (x0, y0, x1, y1, sem, via = true, P = NOCHE) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let f = (y - y0) / Math.max(1, y1 - y0) * 0.95; if (via) { const d = Math.abs((x - x0) * 0.42 - (y - y0) - 30 + Math.sin(x * 0.05) * 8); if (d < 26) f += (1 - d / 26) * 0.24 * (0.6 + hs(x >> 2, y >> 2, sem) * 0.6); } R.pset(x, y, tono(P, f, x, y)); }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 80; k++) { const x = x0 + Math.floor(hs(k, 1, sem) * (x1 - x0)), y = y0 + Math.floor(hs(k, 2, sem) * (y1 - y0)); if (tranquila(x, y) && hs(k, 3, sem) > 0.25) continue; const b = hs(k, 4, sem);
    R.pset(x, y, b > 0.9 ? hex('#ffffff') : b > 0.6 ? hex('#c8d4f0') : b > 0.3 ? hex('#8a9ac8') : hex('#5a6a98'));
    if (b > 0.97 && !tranquila(x, y)) { for (const [a, c] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(x + a, y + c, hex('#6a7ab0')); } }
};
const titilan = (t, x0, y0, x1, y1, n, sem) => { for (let k = 0; k < n; k++) { const x = x0 + Math.floor(hs(k, 5, sem) * (x1 - x0)), y = y0 + Math.floor(hs(k, 6, sem) * (y1 - y0)); if (tranquila(x, y)) continue; const s = Math.sin(t * (2 + hs(k, 7, sem) * 3) + k); if (s > 0.7) { R.pset(x, y, BL); if (s > 0.93) { R.pset(x - 1, y, hex('#8a9ac8')); R.pset(x + 1, y, hex('#8a9ac8')); R.pset(x, y - 1, hex('#8a9ac8')); R.pset(x, y + 1, hex('#8a9ac8')); } } } };
const NUBE = [hex('#2a3458'), hex('#3c4874'), hex('#5a6894'), hex('#8a96b8')];
const nubes = (t, x0, x1, y0, y1, n, sem, P = NUBE) => {
  const an = x1 - x0 + 90;
  for (let k = 0; k < n; k++) { const capa = k % 3, v = [1.1, 2.2, 3.6][capa], w = 14 + hs(k, 1, sem) * 20 + capa * 4, hh = 3 + hs(k, 2, sem) * 3 + capa;
    const cx = x0 - 45 + ((hs(k, 3, sem) * an + t * v) % an), cy = y0 + hs(k, 4, sem) * (y1 - y0);
    for (let dy = -hh; dy <= hh; dy++) for (let dx = -w; dx <= w; dx++) { const d = (dx / w) ** 2 + (dy / hh) ** 2 + Math.sin(dx * 0.6 + k) * 0.08; if (d > 1) continue;
      const x = Math.round(cx + dx), y = Math.round(cy + dy); if (x < x0 || x > x1 || y < y0 || y > y1 || tranquila(x, y)) continue;
      if (d > 0.8 && bay(x, y) > 0.5) continue; const f = (dy + hh) / (2 * hh); R.pset(x, y, f < 0.25 ? P[3] : f < 0.55 ? P[2] : f < 0.85 ? P[1] : P[0]); } }
};
const vapor = (t, x, y, k = 0) => { for (let i = 0; i < 4; i++) { const q = (t * 0.7 + i / 4 + k * 0.13) % 1; tinta(x + Math.sin(q * 6 + i + k) * 1.6, y - q * 11, hex('#f0f0f4'), 0.55 * (1 - q)); } };
const madera = (x0, y0, x1, y1, sem, C = ['#4a2c18', '#5e3a20', '#70482a', '#86583a', '#9a6a46'].map(hex)) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.045 + y * 0.02) * 2.4 + hs(y >> 3, 1, sem) * 3) * 0.5 + 0.5; const f = 0.25 + v * 0.45 + (hs(x >> 4, y >> 1, sem) - 0.5) * 0.1; R.pset(x, y, tono(C, f, x, y)); }
  for (let k = 0; k < 5; k++) { const cx = x0 + hs(k, 1, sem + 3) * (x1 - x0), cy = y0 + hs(k, 2, sem + 3) * (y1 - y0); for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 1.6), C[0]); }
};
const murcielago = (x, y, t, k) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y)) return; const ar = Math.sin(t * 22 + k * 2) > 0, N = hex('#0a0810');
  R.rect(x - 1, y, x + 1, y + 1, N); if (ar) { R.linea(x - 2, y, x - 5, y - 3, N); R.linea(x + 2, y, x + 5, y - 3, N); } else { R.linea(x - 2, y + 1, x - 6, y + 2, N); R.linea(x + 2, y + 1, x + 6, y + 2, N); } };
const luciernagas = (t, x0, x1, y0, y1, n, sem) => { for (let k = 0; k < n; k++) { const s = Math.sin(t * (1.5 + hs(k, 1, sem)) + k * 2); if (s < 0.2) continue; const x = Math.round(x0 + hs(k, 2, sem) * (x1 - x0) + Math.sin(t * 0.7 + k) * 6), y = Math.round(y0 + hs(k, 3, sem) * (y1 - y0) + Math.cos(t * 0.9 + k) * 3); tinta(x, y, hex('#e8f070'), 0.4 + s * 0.5); if (s > 0.8) { tinta(x + 1, y, hex('#c8e040'), 0.4); tinta(x - 1, y, hex('#c8e040'), 0.4); } } };
// un aro que se cierra (f 0–1), empezando arriba a la derecha
const aro = (cx, cy, rx, ry, f, c, g = 1) => { const n = Math.round(80 * f); for (let i = 0; i <= n; i++) { const a = -0.6 - i / 80 * 6.6; for (let k = 0; k < g; k++) R.pset(Math.round(cx + Math.cos(a) * (rx + k)), Math.round(cy + Math.sin(a) * (ry + k)), c); } };
// una antena parabólica grande vista de frente-lado: plato (centro cx, cy, radio r) que mira en la dirección ang
// (radianes, 0 = derecha, −π/2 = arriba), con su cara cóncava clara, el borde, las cuatro patas del foco y el foco.
const plato = (cx, cy, r, ang, luz = ['#3a4058', '#5a627e', '#8a92ac', '#b8c0d4', '#dfe4ee'].map(hex)) => {
  const dx = Math.cos(ang), dy = Math.sin(ang), px = -dy, py = dx, k = 0.42 + 0.5 * Math.abs(dy);
  const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; pts.push([cx + px * Math.cos(a) * r + dx * Math.sin(a) * r * (1 - k) * 0.9, cy + py * Math.cos(a) * r + dy * Math.sin(a) * r * (1 - k) * 0.9]); }
  R.poligono(pts.map(([x, y]) => [x + 1, y + 2]), K);
  R.poligono(pts, (x, y) => { const u = ((x - cx) * px + (y - cy) * py) / r; return tono(luz, 0.75 - u * 0.35 + (hs(x, y, 9) - 0.5) * 0.08, x, y); });
  for (let i = 0; i < 40; i++) { const [a, b] = pts[i], [c, d] = pts[(i + 1) % 40]; R.linea(Math.round(a), Math.round(b), Math.round(c), Math.round(d), K); }
  for (let q = 0.35; q < 1; q += 0.3) for (let i = 0; i < 40; i += 2) { const a = i / 40 * Math.PI * 2; R.pset(Math.round(cx + (px * Math.cos(a) * r + dx * Math.sin(a) * r * (1 - k) * 0.9) * q), Math.round(cy + (py * Math.cos(a) * r + dy * Math.sin(a) * r * (1 - k) * 0.9) * q), luz[1]); }
  const fx = cx + dx * r * 0.8, fy = cy + dy * r * 0.8;
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) R.linea(Math.round(cx + px * Math.cos(a) * r * 0.85 + dx * Math.sin(a) * r * 0.3), Math.round(cy + py * Math.cos(a) * r * 0.85 + dy * Math.sin(a) * r * 0.3), Math.round(fx), Math.round(fy), luz[0]);
  R.disco(fx, fy, Math.max(1.5, r * 0.07), K); R.disco(fx, fy, Math.max(1, r * 0.05), luz[3]);
  return [fx, fy];
};
'''

E['wo-busqueda'] = ('Buscarla otra vez', '''// WO-BUSQUEDA (frases 18–19), cartela «1995». La barra dice la verdad: 1995 → 1996 (en «1996») → 1998 (Tasmania) →
// 2020 (las antenas de California y Caballero) → 2022 («two big telescopes»). Siete planos:
// 1. (cartela) el desierto de Nuevo México: Gray y Marvel llegan andando a la llanura y las 27… antenas giran a la vez en
//    «better telescopes»; Gray señala la grande; furgoneta con polvo, rodadora, cuervos. Corta en «amateur».
// 2. fondo local: la sala de control del conjunto (1996): ventana con las antenas que giran, consola con tres monitores
//    de tubo (espectro, cielo, cascada), rack con cintas que giran; Gray señala la pantalla en «Robert Gray», Marvel
//    entra con dos cafés en «Kevin Marvel» y deja uno; en «listened» se encienden los barridos. Corta en «Later».
// 3. Tasmania (1998): Gray llega bajo la llovizna y señala la antena; la antena gira en «Tasmania»; un técnico sale de la
//    caseta y saluda en «Australia»; ovejas, gaviotas, pesquero. Corta en «And in 2020».
// 4. California (2020), luz de tarde: tres del equipo suben por el camino; las 21 antenas giran a la vez en «SETI
//    Institute's antennas»; la científica señala en «California»; ciervos, camioneta. Corta antes de «Also».
// 5. el despacho de Caballero de noche (2020): entra, mira por su telescopio y va a la mesa; señala el monitor en
//    «Caballero». Corta en «searched».
// 6. fondo local: la pantalla de cerca con el mapa de estrellas: la retícula barre la franja («searched that patch»),
//    se para en la estrella amarilla («like the Sun»), el círculo rojo se cierra en «candidate» y la regla desde la
//    Tierra crece con el «1800» en «eighteen hundred»; la mano mueve el ratón. Corta en «In 2022».
// 7. fondo local: dos grandes antenas de noche giran hasta apuntar a la estrella en «listened to it»; la pantallita del
//    carro se queda plana y la técnica se encoge de hombros en «Nothing there either»; murciélagos, coche que pasa.''', PRE + r'''
const v = (f) => en('vla', f), c = (f) => en('caballero', f);
const P2 = v(0.258), P3 = v(0.588), P4 = v(0.765), P5 = c(-0.1), P6 = c(0.31), P7 = c(0.75);
const BETTER = v(0.035), A96 = v(0.18), GRAY = v(0.333), MARVEL = v(0.41), LISTEN = v(0.44), NM = v(0.555);
const TAS = v(0.66), AUS = v(0.71), SETI = v(0.875), CAL = v(0.955);
const ALB = c(0.22), PATCH = c(0.355), SOL = c(0.43), CAND = c(0.525), MIL = c(0.6), LEJOS = c(0.68);
const DOS = c(0.82), ESCUCHA = c(0.87), NADA = c(0.95);

// 1 · el desierto de Nuevo México (1995 → 1996)
const p1 = (t) => {
  const giro = curva(t, [[0, 0.22], [BETTER, 0.22], [BETTER + 1.3, 0.78]]);
  T.telescopios(R, t, { encuadre: 'vla', giro });
  const u = tramo(t, 1.2, 4.2), w = tramo(t, 1.6, 4.6);
  const gx = Math.round(lerp(-22, 112, ease(u))), mx = Math.round(lerp(-44, 146, ease(w)));
  R.actor(EL.grayWO, gx, 158, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > 4.6 && t < P2 - 0.2, sonrisa: t > 4.6, habla: t > 4.8 && t < A96 && Math.sin(t * 8) > 0 });
  const m = R.actor(EL.marvelWO, mx, 160, t, { dir: w < 1 ? 1 : -1, anda: w > 0 && w < 1, sostiene: true, habla: t > A96 && t < A96 + 1.3 && Math.sin(t * 7) > 0, sonrisa: t > A96 + 1.3 });
  // la carpeta de Marvel, en su mano
  const [hx, hy] = m.mano; caja(hx - 3, hy - 6, hx + 3, hy + 2, hex('#e8e0c8')); R.rect(hx - 1, hy - 7, hx + 1, hy - 6, hex('#8a8a94')); R.linea(hx - 2, hy - 3, hx + 2, hy - 3, hex('#9a9aa8')); R.linea(hx - 2, hy - 1, hx + 1, hy - 1, hex('#9a9aa8'));
  T.telescopiosDelante(R, t, { encuadre: 'vla', giro });
};

// 2 · fondo local: la sala de control del conjunto (1996)
const SALA = ['#8a8270', '#a29a84', '#b8b09a', '#ccc4ac', '#dcd6c0'].map(hex);
const MOQ = ['#2a3040', '#343c50', '#3e485e', '#4a566e'].map(hex);
const salaFija = () => {
  trama(0, 0, 319, 149, SALA, 0.7, 0.45, 21, 0.1);
  for (let x = 0; x < 320; x += 40) { R.linea(x, 12, x, 149, SALA[0]); R.linea(x + 1, 12, x + 1, 149, SALA[4]); }
  // techo de placas con su rejilla y un fluorescente lejos de las zonas tranquilas
  trama(0, 0, 319, 11, ['#b8b4a8', '#ccc8bc', '#dcd8cc'].map(hex), 0.6, 0.4, 22, 0.2);
  for (let x = 0; x < 320; x += 24) R.linea(x, 0, x, 11, hex('#9a968a')); R.linea(0, 11, 319, 11, hex('#7a766a'));
  caja(186, 2, 246, 7, hex('#f4f2e8'), hex('#8a8678'));
  R.rect(0, 140, 319, 149, hex('#6a6454')); R.linea(0, 140, 319, 140, hex('#4a4438'));
  // la ventana con persiana (el exterior se pinta en cada fotograma, recortado)
  caja(10, 28, 110, 102, hex('#c8ccd4'), hex('#4a4c54')); R.rect(12, 100, 108, 104, hex('#e0e2e8')); R.linea(10, 104, 110, 104, K);
  // la estantería de carpetas sobre la consola (lomos de colores, sin letras)
  R.rect(124, 58, 282, 60, hex('#5a4a38')); R.linea(124, 61, 282, 61, K);
  for (let x = 126, k = 0; x < 278; k++) { const w = 4 + Math.floor(hs(k, 2, 7) * 4), hgt = 14 + Math.floor(hs(k, 3, 7) * 6), col = hex(['#8a2a2a', '#2a4a8a', '#c8a030', '#3a6a3a', '#5a5a6a', '#a85a2a'][k % 6]);
    if (hs(k, 4, 7) > 0.85) { x += 6; continue; } caja(x, 58 - hgt, x + w, 57, col); R.linea(x + 1, 58 - hgt + 3, x + w - 1, 58 - hgt + 3, mez(col, BL, 0.4)); R.linea(x + 1, 52, x + w - 1, 52, mez(col, K, 0.4)); x += w + 1; }
  // la consola: tablero claro y frente oscuro con rejillas y cajones
  R.rect(116, 118, 290, 122, hex('#d8d0b8')); R.linea(116, 118, 290, 118, hex('#f0ead8')); R.linea(116, 123, 290, 123, K);
  R.rect(116, 124, 290, 139, hex('#4a4e5a'));
  for (let x = 122; x < 286; x += 34) { caja(x, 127, x + 28, 137, hex('#5a5e6c'), hex('#2a2c34')); R.rect(x + 11, 131, x + 17, 132, hex('#9a9eac')); }
  // el rack de la derecha (debajo de la zona de Atom)
  caja(292, 52, 319, 149, hex('#3a3e48'), K);
  for (let y = 58; y < 146; y += 16) { R.linea(294, y, 318, y, hex('#2a2c34')); R.rect(296, y + 2, 316, y + 3, hex('#5a5e6a')); }
  // la mesita del café bajo la ventana
  R.rect(14, 118, 64, 121, hex('#7a5a3a')); R.linea(14, 122, 64, 122, K); R.rect(17, 122, 19, 149, hex('#4a3a28')); R.rect(59, 122, 61, 149, hex('#4a3a28'));
  caja(20, 102, 36, 117, hex('#2a2a30')); R.rect(23, 112, 33, 116, hex('#5a3a24')); R.rect(22, 104, 34, 106, hex('#4a4a54'));
  for (let i = 0; i < 4; i++) caja(42 + i, 112 - i * 2, 58 + i, 117 - i * 2, hex('#f0ecdc'), hex('#a8a090'));
  // el suelo de moqueta en losetas
  trama(0, 150, 319, 179, MOQ, 0.3, 0.7, 23, 0.25);
  for (let x = 0; x < 320; x += 30) R.linea(x - Math.round((x - 160) * 0.0), 150, x + Math.round((x - 160) * 0.25), 179, hex('#262c3a'));
  for (const y of [158, 168]) R.linea(0, y, 319, y, hex('#262c3a'));
};
const salaVLA = (t, o) => {
  fijo('sala', salaFija);
  // fuera: el desierto con las antenas que giran (recortado a la ventana)
  R.recorte([12, 30, 108, 99]);
  for (let y = 30; y <= 99; y++) for (let x = 12; x <= 108; x++) R.pset(x, y, y < 70 ? tono(['#7aa8d8', '#9cc0e4', '#bcd6ee'].map(hex), (y - 30) / 40, x, y) : y < 78 ? tono(['#8a7aa8', '#a090b8'].map(hex), (x * 0.03 + Math.sin(x * 0.2) * 0.3) % 1, x, y) : tono(['#b8945a', '#c8a468', '#d8b87a'].map(hex), (y - 78) / 22 + (hs(x >> 1, y, 4) - 0.5) * 0.4, x, y));
  for (let i = 0; i < 3; i++) { const nx = 12 + ((i * 41 + t * (2 + i)) % 110) - 10; for (let k = -6; k <= 6; k++) for (let j = -2; j <= 1; j++) if (k * k / 36 + j * j / 4 < 1) R.pset(Math.round(nx + k), 38 + i * 9 + j, j < 0 ? BL : hex('#dde6f0')); }
  const g = o.giro;
  for (const [x, y, r] of [[26, 86, 6], [48, 83, 4.5], [66, 81, 3.5], [82, 80, 3], [96, 88, 7]]) { R.rect(x - 1, y, x + 1, y + r + 4, hex('#d8dce4')); R.linea(x - 3, y + r + 4, x + 3, y + r + 4, hex('#8a8e96'));
    const an = -0.9 + g * 1.6, ca = Math.cos(an), sa = Math.sin(an), pts = []; for (let i = 0; i < 24; i++) { const q = i / 24 * 6.283, ex = Math.cos(q) * r, ey = Math.sin(q) * r * 0.45; pts.push([x + ex * ca - ey * sa, y - 2 + ex * sa + ey * ca]); }
    R.poligono(pts.map(([u, w]) => [u, w + 1]), hex('#7a8090')); R.poligono(pts, (px, py) => tono(['#b8bcc8', '#dde0e8', '#f4f6fa'].map(hex), 0.5 + (px - x) / (r * 3), px, py)); R.pset(Math.round(x - sa * r * 0.6), Math.round(y - 2 - ca * r * 0.6) - 1, hex('#5a5e6a')); }
  R.recorte(null);
  // la persiana medio subida
  for (let y = 30; y < 44; y += 2) { R.linea(12, y, 108, y, hex('#e8e6dc')); R.linea(12, y + 1, 108, y + 1, hex('#b8b6aa')); }
  R.linea(60, 30, 60, 52, hex('#8a8678')); R.disco(60, 53, 1.5, hex('#8a8678'));
  // el café humea
  vapor(t, 28, 101, 1);
  // los tres monitores de tubo (beis)
  const scr = [[124, 76], [180, 76], [236, 76]];
  scr.forEach(([x, y], i) => { caja(x - 2, y - 2, x + 48, y + 41, hex('#d6ceb4'), hex('#5a5444')); R.rect(x + 18, y + 42, x + 28, y + 44, hex('#a8a088')); R.linea(x, y + 37, x + 46, y + 37, hex('#b8b098')); R.pset(x + 42, y + 39, Math.sin(t * 3 + i) > 0 ? hex('#5ae85a') : hex('#2a6a2a'));
    caja(x + 3, y + 2, x + 43, y + 34, hex('#0a1a12'), K); });
  const on = tramo(t, o.listen - 0.2, o.listen + 0.4);
  // 1: el espectro con su raya del hidrógeno marcada en ámbar
  { const [x, y] = scr[0]; for (let i = 0; i < 38; i++) { const n = (hs(i, Math.floor(t * 8), 3) - 0.5) * 6 * (0.4 + on), yy = y + 24 + Math.round(n); R.pset(x + 4 + i, yy, hex('#5ae88a')); R.pset(x + 4 + i, yy + 1, hex('#2a8a4a')); }
    for (let yy = y + 4; yy < y + 33; yy += 2) R.pset(x + 23, yy, hex('#e8b040')); const bx = x + 4 + Math.round(((t * 9) % 38)); if (on > 0) R.linea(bx, y + 4, bx, y + 32, hex('#2a6a4a')); }
  // 2: el trozo de cielo con la cruz que va a Sagitario
  { const [x, y] = scr[1]; for (let k = 0; k < 40; k++) R.pset(x + 4 + Math.floor(hs(k, 1, 31) * 38), y + 3 + Math.floor(hs(k, 2, 31) * 30), hs(k, 3, 31) > 0.7 ? BL : hex('#5a8a7a'));
    const cx = Math.round(lerp(x + 10, x + 26, ease(tramo(t, o.gray, o.gray + 1.2)))), cy = Math.round(lerp(y + 8, y + 18, ease(tramo(t, o.gray, o.gray + 1.2))));
    R.linea(cx - 4, cy, cx - 2, cy, hex('#e85a4a')); R.linea(cx + 2, cy, cx + 4, cy, hex('#e85a4a')); R.linea(cx, cy - 4, cx, cy - 2, hex('#e85a4a')); R.linea(cx, cy + 2, cx, cy + 4, hex('#e85a4a')); }
  // 3: la cascada de ruido que baja
  { const [x, y] = scr[2]; for (let j = 0; j < 31; j++) for (let i = 0; i < 39; i++) { const q = hs(i, j + Math.floor(t * 10 * (0.3 + on)), 5); R.pset(x + 4 + i, y + 3 + j, q > 0.92 ? hex('#8ae8a8') : q > 0.6 ? hex('#1a6a3a') : hex('#0e3a22')); } }
  // los teclados
  scr.forEach(([x], i) => { caja(x + 4, 113, x + 40, 117, hex('#d0c8b0'), hex('#5a5444')); for (let k = x + 6; k < x + 39; k += 3) R.pset(k, 115, hex('#8a846c')); });
  // el rack: luces que parpadean y dos bobinas de cinta que giran
  for (let k = 0; k < 18; k++) { const x = 296 + (k % 6) * 3, y = 66 + Math.floor(k / 6) * 16; R.pset(x, y, Math.sin(t * (3 + k % 4) + k) > 0.2 ? hex(['#e84a3a', '#5ae85a', '#e8c040'][k % 3]) : hex('#2a2c34')); }
  for (const cy of [112, 132]) { R.disco(300, cy, 5, hex('#1a1a20')); R.disco(312, cy, 5, hex('#1a1a20')); for (const cx of [300, 312]) { const a = t * 3 * (cx === 300 ? 1 : 1.3); R.disco(cx, cy, 4, hex('#6a5a4a')); R.disco(cx, cy, 1.4, hex('#c8c8d0')); R.pset(Math.round(cx + Math.cos(a) * 3), Math.round(cy + Math.sin(a) * 3), hex('#c8c8d0')); R.pset(Math.round(cx - Math.cos(a) * 3), Math.round(cy - Math.sin(a) * 3), hex('#c8c8d0')); } }
  // la foto aérea enmarcada del conjunto en Y (puntos blancos sobre la arena)
  caja(214, 16, 262, 46, hex('#c8a468'), hex('#5a4030')); for (let y = 18; y < 45; y++) for (let x = 216; x < 261; x++) R.pset(x, y, tono(['#b8945a', '#c8a468', '#d8b87a'].map(hex), hs(x >> 1, y >> 1, 25), x, y));
  for (let i = 0; i < 6; i++) { R.pset(238, 31 - i * 2, BL); R.pset(238 - i * 3, 31 + i * 2, BL); R.pset(238 + i * 3, 31 + i * 2, BL); } R.pset(238, 31, hex('#e84a3a'));
  // el reloj de pared
  R.disco(160, 32, 9, K); R.disco(160, 32, 8, hex('#f4f0e4')); for (let k = 0; k < 12; k++) R.pset(Math.round(160 + Math.cos(k / 6 * Math.PI) * 6.5), Math.round(32 + Math.sin(k / 6 * Math.PI) * 6.5), hex('#5a5a64'));
  R.linea(160, 32, 160 + Math.round(Math.cos(-1.2) * 4), 32 + Math.round(Math.sin(-1.2) * 4), K); const sa = t * 1.05 - Math.PI / 2; R.linea(160, 32, 160 + Math.round(Math.cos(sa) * 6), 32 + Math.round(Math.sin(sa) * 6), hex('#c83a3a'));
};
const salaDelante = (t) => {
  // la planta en su maceta a la derecha (las hojas se mecen) y la papelera con bolas de papel
  caja(256, 160, 276, 178, hex('#b8683a')); R.rect(257, 161, 275, 162, hex('#d8885a'));
  for (let k = 0; k < 11; k++) { const a = -1.9 + k * 0.33 + Math.sin(t * 1.5 + k) * 0.05, L = 14 + (k % 3) * 5; R.linea(266, 160, 266 + Math.round(Math.cos(a) * L), 160 + Math.round(Math.sin(a) * L), hex(k % 2 ? '#2a6a3a' : '#4a9a4a')); R.disco(266 + Math.round(Math.cos(a) * L), 160 + Math.round(Math.sin(a) * L), 1.6, hex('#5aaa4a')); }
  caja(290, 156, 306, 176, hex('#5a6a5a')); R.linea(291, 157, 305, 157, hex('#7a8a7a')); for (const [x, y] of [[294, 155], [300, 154], [297, 152]]) { R.disco(x, y, 2.5, hex('#f0ecdc')); R.pset(x, y, hex('#b8b4a4')); }
};
const p2 = (t) => {
  const giro = curva(t, [[P2, 0.3], [LISTEN, 0.3], [LISTEN + 1.6, 0.85]]);
  salaVLA(t, { giro, listen: LISTEN, gray: GRAY });
  R.actor(EL.grayWO, 150, 168, t, { dir: 1, dedo: t > GRAY - 0.1 && t < GRAY + 1.5, habla: t > GRAY - 0.1 && t < GRAY + 1.3 && Math.sin(t * 8) > 0, sonrisa: t > NM });
  // Marvel entra por la derecha con dos cafés, deja uno en la consola y se queda mirando
  const u = tramo(t, MARVEL - 0.9, MARVEL + 0.3), deja = t > LISTEN + 0.6;
  const mx = Math.round(lerp(336, 206, ease(u)));
  const m = R.actor(EL.marvelWO, mx, 170, t, { dir: -1, anda: u > 0 && u < 1, sostiene: deja ? false : [mx - 6, 150], habla: t > MARVEL + 0.3 && t < LISTEN + 0.4 && Math.sin(t * 7) > 0, sonrisa: deja });
  const taza = (x, y) => { caja(x - 2, y - 4, x + 2, y + 1, hex('#f4f0e4')); R.pset(x + 3, y - 2, hex('#f4f0e4')); R.pset(x + 3, y - 1, K); R.rect(x - 1, y - 3, x + 1, y - 3, hex('#5a3a24')); vapor(t, x, y - 5, 2); };
  if (!deja) { const [hx, hy] = m.mano; taza(hx, hy); }
  else { taza(Math.round(lerp(mx - 6, 176, ease(tramo(t, LISTEN + 0.6, LISTEN + 1.1)))), Math.round(lerp(150, 117, ease(tramo(t, LISTEN + 0.6, LISTEN + 1.1))))); }
  salaDelante(t);
};

// 3 · Tasmania (1998)
const p3 = (t) => {
  const giro = curva(t, [[P3, 0.25], [TAS - 0.1, 0.25], [TAS + 1.4, 0.7]]);
  T.telescopios(R, t, { encuadre: 'vla', camara: 'tasmania', giro });
  const u = tramo(t, P3 + 0.1, TAS - 0.2), gx = Math.round(lerp(14, 104, ease(u)));
  R.actor(EL.grayWO, gx, 152, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > TAS - 0.1 && t < AUS + 0.8, sonrisa: t > AUS });
  const w = tramo(t, P3 + 0.6, TAS + 0.6), tx = Math.round(lerp(282, 216, ease(w)));
  R.actor(EL.operario, tx, 150, t, { dir: -1, anda: w > 0 && w < 1, brazos: t > AUS && t < AUS + 0.9, sonrisa: t > AUS });
  T.telescopiosDelante(R, t, { encuadre: 'vla', camara: 'tasmania', giro });
};

// 4 · las antenas de California (2020), luz de tarde
const p4 = (t) => {
  const giro = curva(t, [[P4, 0.2], [SETI - 0.2, 0.2], [SETI + 1.4, 0.8]]);
  T.telescopios(R, t, { encuadre: 'ata', giro });
  T.tinte(R, 0, 179, [255, 170, 96], 0.13);
  const a = tramo(t, P4 + 0.1, P4 + 2.6), b = tramo(t, P4 + 0.4, P4 + 3.0), d = tramo(t, P4 + 0.8, P4 + 3.3);
  const xa = Math.round(lerp(-20, 118, ease(a))), xb = Math.round(lerp(-40, 94, ease(b))), xd = Math.round(lerp(-60, 156, ease(d)));
  R.actor(EL.cientifico, xb, 160, t, { dir: 1, anda: b > 0 && b < 1, habla: t > CAL + 0.4 && t < CAL + 1.6 && Math.sin(t * 7) > 0 });
  R.actor(EL.cientifica, xa, 168, t, { dir: 1, anda: a > 0 && a < 1, dedo: t > SETI - 0.1 && t < CAL + 1.2, sonrisa: t > CAL });
  const o = R.actor(EL.operario, xd, 172, t, { dir: d < 1 ? 1 : -1, anda: d > 0 && d < 1, sostiene: true, sonrisa: t > CAL + 0.8 });
  // el portátil abierto en la mano del operario, con la pantalla que brilla
  const [hx, hy] = o.mano; R.rect(hx - 5, hy, hx + 5, hy + 1, hex('#3a3a44')); caja(hx - 5, hy - 8, hx + 5, hy, hex('#1a2a3a')); R.linea(hx - 3, hy - 4 + Math.round(Math.sin(t * 4)), hx + 3, hy - 4, hex('#5ae8c8'));
  T.telescopiosDelante(R, t, { encuadre: 'ata', giro });
};

// 5 · el despacho de Caballero de noche (2020)
const p5 = (t) => {
  T.telescopios(R, t, { encuadre: 'ata', camara: 'estrella', rodea: 0 });
  const u = tramo(t, P5 + 0.1, P5 + 1.5), w = tramo(t, ALB - 1.0, ALB);
  const x = Math.round(w > 0 ? lerp(34, 100, ease(w)) : lerp(-20, 34, ease(u)));
  const mira = t > P5 + 1.6 && t < ALB - 1.1;
  R.actor(EL.caballeroWO, x, 160, t, { dir: mira ? -1 : 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), dedo: t > ALB + 0.1, sonrisa: mira || t > ALB + 0.4, habla: t > ALB + 0.5 && t < P6 - 0.2 && Math.sin(t * 7) > 0 });
  T.telescopiosDelante(R, t, { encuadre: 'ata', camara: 'estrella', rodea: 0 });
};

// 6 · fondo local: el mapa de estrellas de cerca, en la pantalla
const S0 = [40, 30, 252, 128];
const ESTR = Array.from({ length: 260 }, (_, k) => [S0[0] + 2 + Math.floor(hs(k, 1, 61) * (S0[2] - S0[0] - 4)), S0[1] + 2 + Math.floor(hs(k, 2, 61) * (S0[3] - S0[1] - 4)), hs(k, 3, 61), hs(k, 4, 61)]);
const SUN = [196, 64], TIERRA = [62, 112], PARCHE = [[150, 40, 214, 96], [172, 52, 236, 108]];
const CAND_ = [[160, 88], [178, 50], [206, 92], [188, 74]];
const mapaFijo = () => {
  // la pared oscura con el reflejo azul del monitor
  trama(0, 0, 319, 145, ['#141828', '#1a2034', '#222a40', '#2a344c'].map(hex), 0.15, 0.55, 62, 0.15);
  for (let y = 0; y < 146; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 146) / 1.6, y - 80); if (d < 150) tinta(x, y, hex('#3a5a9a'), 0.18 * (1 - d / 150)); }
  // a la izquierda, el borde de la ventana con la cortina
  R.rect(0, 24, 18, 145, hex('#0a0e1e')); for (let k = 0; k < 30; k++) R.pset(1 + Math.floor(hs(k, 1, 63) * 16), 26 + Math.floor(hs(k, 2, 63) * 110), hs(k, 3, 63) > 0.6 ? BL : hex('#6a7aa8'));
  R.rect(19, 22, 21, 145, hex('#c8ccd4')); for (let y = 20; y < 146; y++) for (let x = 22; x < 32; x++) R.pset(x, y, tono(['#4a1a24', '#6a2430', '#8a3440'].map(hex), 0.5 + Math.sin(x * 1.1 + y * 0.02) * 0.45, x, y));
  // el marco del monitor y su pie
  caja(34, 24, 258, 134, hex('#1c1c22'), K); R.linea(35, 25, 257, 25, hex('#3a3a44')); R.rect(140, 135, 152, 142, hex('#2a2a30')); R.rect(126, 142, 166, 145, hex('#2a2a30'));
  R.pset(250, 131, hex('#5ae85a'));
  // dentro: el cielo con su rejilla curva y la Vía Láctea
  for (let y = S0[1]; y <= S0[3]; y++) for (let x = S0[0]; x <= S0[2]; x++) { let f = 0.25 + (y - S0[1]) / 300; const d = Math.abs((x - S0[0]) * 0.45 - (y - S0[1]) * 0.9 - 30); if (d < 22) f += (1 - d / 22) * 0.35 * (0.6 + hs(x >> 1, y >> 1, 64)); R.pset(x, y, tono(['#060a1a', '#0a1028', '#101838', '#18224a', '#22305a'].map(hex), f, x, y)); }
  R.recorte(S0);
  for (let k = -3; k < 8; k++) for (let x = S0[0]; x <= S0[2]; x += 2) R.pset(x, Math.round(S0[1] + k * 16 + Math.pow((x - 146) / 60, 2) * 6), hex('#1e3a5a'));
  for (let k = -2; k < 14; k++) for (let y = S0[1]; y <= S0[3]; y += 2) R.pset(Math.round(S0[0] + k * 22 + (y - 80) * (k - 5) * 0.06), y, hex('#1e3a5a'));
  for (const [x, y, b, col] of ESTR) R.pset(x, y, b > 0.9 ? BL : b > 0.6 ? hex(col > 0.7 ? '#f0c8a0' : col > 0.4 ? '#c8d4f0' : '#a8b8e8') : hex('#5a6a98'));
  R.recorte(null);
  // la mesa con sus cosas
  madera(0, 146, 319, 179, 65);
  R.linea(0, 146, 319, 146, hex('#b8865a')); R.linea(0, 147, 319, 147, hex('#2a1a0e'));
  caja(76, 150, 210, 166, hex('#2a2a32')); for (let y = 153; y < 165; y += 3) for (let x = 79; x < 208; x += 4) caja(x, y, x + 3, y + 2, hex('#4a4a56'), hex('#1a1a20'));
  // la libreta con el lápiz y la taza
  caja(14, 152, 52, 174, hex('#f0e8c8'), hex('#8a7a5a')); for (let y = 156; y < 172; y += 3) R.linea(18, y, 48, y, hex('#b8c8e0')); R.linea(16, 170, 46, 158, hex('#e8c040')); R.linea(16, 171, 46, 159, hex('#a87a20')); R.pset(15, 171, K);
  caja(222, 150, 236, 166, hex('#c84a3a')); R.rect(224, 151, 234, 152, hex('#3a2014')); R.rect(237, 154, 240, 161, hex('#c84a3a')); R.pset(238, 157, hex('#4a1a14'));
  // el flexo de la derecha, debajo de la zona de Atom
  R.linea(306, 145, 300, 100, hex('#5a5a64')); R.linea(307, 145, 301, 100, hex('#3a3a44')); R.linea(300, 100, 280, 70, hex('#5a5a64')); R.linea(301, 100, 281, 70, hex('#3a3a44'));
  R.poligono([[272, 62], [290, 62], [286, 74], [276, 74]], hex('#2a5a4a')); R.rect(296, 143, 316, 146, hex('#3a3a44'));
  R.disco(281, 75, 3, hex('#f8e8a0'));
  // la alfombrilla del ratón
  caja(248, 158, 300, 178, hex('#3a4a6a'), hex('#1a2030'));
};
const p6 = (t) => {
  fijo('mapa', mapaFijo);
  R.recorte(S0);
  // estrellas que titilan, la franja de búsqueda en ámbar discontinuo que palpita
  for (let k = 0; k < 40; k++) { const [x, y] = ESTR[k * 6]; if (Math.sin(t * (2 + k % 3) + k) > 0.8) { R.pset(x, y, BL); R.pset(x + 1, y, hex('#8a9ac8')); } }
  const pal = 0.6 + 0.4 * Math.sin(t * 4);
  for (const [x0, y0, x1, y1] of PARCHE) for (let i = 0; i < 200; i++) { const per = 2 * (x1 - x0 + y1 - y0), p = i / 200 * per; if (Math.floor(p / 3) % 2) continue; let x, y; if (p < x1 - x0) { x = x0 + p; y = y0; } else if (p < x1 - x0 + y1 - y0) { x = x1; y = y0 + p - (x1 - x0); } else if (p < 2 * (x1 - x0) + y1 - y0) { x = x1 - (p - (x1 - x0) - (y1 - y0)); y = y1; } else { x = x0; y = y1 - (p - 2 * (x1 - x0) - (y1 - y0)); } tinta(x, y, hex('#e8a830'), 0.5 + pal * 0.4); }
  // la retícula barre la franja y se para en la estrella parecida al Sol
  const paso = Math.min(CAND_.length, Math.floor(tramo(t, PATCH - 0.4, SOL - 0.2) * CAND_.length));
  const pts = [[110, 70], ...CAND_, SUN], i0 = Math.min(paso, pts.length - 1), i1 = Math.min(paso + 1, pts.length - 1);
  const q = t >= SOL - 0.2 ? 1 : ease(((tramo(t, PATCH - 0.4, SOL - 0.2) * CAND_.length) % 1) * 1.6);
  const [rx, ry] = t < PATCH - 0.4 ? [lerp(110, 140, ease(tramo(t, P6, PATCH - 0.4))), 70] : t >= SOL - 0.2 ? SUN : [lerp(pts[i0][0], pts[i1][0], q), lerp(pts[i0][1], pts[i1][1], q)];
  // las candidatas descartadas: una cruz gris pequeña
  for (let k = 0; k < Math.min(paso, CAND_.length); k++) { const [x, y] = CAND_[k]; R.pset(x, y, hex('#c8d4f0')); R.linea(x - 2, y - 2, x + 2, y + 2, hex('#7a8aa8')); R.linea(x - 2, y + 2, x + 2, y - 2, hex('#7a8aa8')); }
  // la estrella amarilla: crece al llegar la retícula
  const sol = ease(tramo(t, SOL - 0.2, SOL + 0.6)), [sx, sy] = SUN, rr = 1.5 + sol * 2.5;
  for (let y = -12; y <= 12; y++) for (let x = -12; x <= 12; x++) { const d = Math.hypot(x, y); if (d < 10 * (0.4 + sol)) tinta(sx + x, sy + y, hex('#f0d060'), 0.35 * (1 - d / (10 * (0.4 + sol)))); }
  R.disco(sx, sy, rr, hex('#f8e070')); R.disco(sx, sy, rr * 0.5, BL); const pu = 3 + sol * 5 + Math.sin(t * 5) * sol; R.linea(Math.round(sx - pu), sy, Math.round(sx + pu), sy, hex('#f8e8a0')); R.linea(sx, Math.round(sy - pu), sx, Math.round(sy + pu), hex('#f8e8a0'));
  const g = 7 + Math.round(Math.sin(t * 6) * 0.6); for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const x = Math.round(rx + a * g), y = Math.round(ry + b * g); R.linea(x, y, x - a * 3, y, hex('#5ae8c8')); R.linea(x, y, x, y - b * 3, hex('#5ae8c8')); }
  // el círculo rojo se cierra en «candidate»
  const ro = tramo(t, CAND - 0.1, CAND + 0.7); if (ro > 0) aro(sx, sy, 12, 11, ro, hex('#e83a3a'), 2);
  // la regla desde la Tierra hasta la estrella y el 1800
  const [ex, ey] = TIERRA; R.disco(ex, ey, 4, hex('#3a7ae8')); R.disco(ex - 1, ey - 1, 2, hex('#6ab0f0')); R.pset(ex + 1, ey - 2, hex('#5ac85a')); R.pset(ex + 2, ey - 1, hex('#5ac85a'));
  const li = ease(tramo(t, MIL - 0.3, LEJOS + 0.2)); if (li > 0) { const n = Math.round(Math.hypot(sx - ex, sy - ey) * li); for (let i = 6; i < n - 12; i++) { const x = ex + (sx - ex) * i / Math.hypot(sx - ex, sy - ey), y = ey + (sy - ey) * i / Math.hypot(sx - ex, sy - ey); if (Math.floor(i / 3) % 2 === 0) { R.pset(Math.round(x), Math.round(y), hex('#f0e0a0')); } if (i % 12 === 0) R.pset(Math.round(x + 1), Math.round(y + 2), hex('#f0e0a0')); } }
  R.recorte(null);
  const ne = tramo(t, MIL - 0.15, MIL + 0.35); if (ne > 0) { const bx = 112, by = 60, sb = ne < 1 ? 1 + (1 - ne) * 0.3 : 1 + 0.04 * Math.sin(t * 5); caja(bx - 32, by - 14, bx + 32, by + 8, hex('#0e2a24'), hex('#5ae8a8')); R.numero('1800', bx, by + 4, { tam: 16, centro: true, color: hex('#f8e070') }); }
  // la mano en el ratón: sigue a la retícula
  const mx = Math.round(268 + (rx - 160) * 0.12), my = Math.round(166 + (ry - 70) * 0.1);
  caja(mx - 4, my - 3, mx + 5, my + 6, hex('#d8d8e0'), K); R.linea(mx, my - 3, mx, my, hex('#8a8a94'));
  T.brazo(R, 330, 192, mx + 4, my + 4, '#6a6e78', -1, { codo: [318, 182] });
};

// 7 · fondo local: dos grandes antenas de noche (2022)
const ESTRELLA = [170, 40];
const nocheFija = () => {
  cieloNoche(0, 0, 319, 128, 71);
  // colinas lejanas con bosque y luces de un pueblo
  for (let x = 0; x < 320; x++) { const h1 = 112 + Math.round(Math.sin(x * 0.03) * 5 + Math.sin(x * 0.11) * 2), h2 = 122 + Math.round(Math.sin(x * 0.05 + 2) * 4);
    for (let y = h1; y < 180; y++) R.pset(x, y, y < h2 ? tono(['#0e1424', '#141c30'].map(hex), (y - h1) / 12, x, y) : tono(['#0c1a14', '#12241a', '#182e20', '#1e3826'].map(hex), (y - h2) / 58 + (hs(x >> 1, y >> 1, 72) - 0.5) * 0.35, x, y));
    if (hs(x, 1, 73) > 0.6) R.pset(x, h1 - 1 - Math.floor(hs(x, 2, 73) * 3), hex('#0a1020')); }
  for (let k = 0; k < 14; k++) R.pset(20 + Math.floor(hs(k, 1, 74) * 120), 116 + Math.floor(hs(k, 2, 74) * 5), hex(hs(k, 3, 74) > 0.5 ? '#f0d080' : '#e8a050'));
  // el camino de grava y la cerca
  for (let y = 150; y < 180; y++) { const x0 = Math.round(220 + (y - 150) * 2.4); for (let x = x0; x < Math.min(320, x0 + 26 + (y - 150)); x++) R.pset(x, y, tono(['#2a2c30', '#3a3c40', '#4a4a4e'].map(hex), hs(x, y, 75), x, y)); }
  for (let x = 6; x < 210; x += 22) { R.rect(x, 150, x + 1, 160, hex('#3a2c20')); } R.linea(0, 152, 210, 152, hex('#5a5a5a')); R.linea(0, 156, 210, 156, hex('#4a4a4a'));
  // las monturas de las dos antenas (lo que no se mueve)
  R.poligono([[66, 158], [126, 158], [108, 112], [84, 112]], (x, y) => tono(['#4a5068', '#6a7088', '#8a90a8'].map(hex), 0.5 + (x - 96) / 60, x, y));
  R.rect(56, 158, 136, 164, hex('#3a3e4c')); R.linea(56, 158, 136, 158, hex('#6a7088'));
  for (let y = 116; y < 158; y += 8) R.linea(Math.round(84 - (y - 112) * 0.4), y, Math.round(108 + (y - 112) * 0.4), y, hex('#3a3e54'));
  R.poligono([[214, 138], [246, 138], [238, 110], [222, 110]], (x, y) => tono(['#3a4058', '#5a6078', '#7a8098'].map(hex), 0.5 + (x - 230) / 40, x, y));
  R.rect(208, 138, 252, 142, hex('#2e3240'));
  // la caseta de control con su ventana y la puerta
  caja(254, 128, 314, 166, hex('#5a5048'), K); for (let y = 132; y < 166; y += 4) R.linea(255, y, 313, y, hex('#4a4038')); R.poligono([[250, 128], [318, 128], [312, 120], [256, 120]], hex('#3a2e28'));
  caja(296, 140, 308, 166, hex('#3a2e26')); R.pset(298, 154, hex('#c8a040'));
};
const p7 = (t) => {
  fijo('noche', nocheFija);
  titilan(t, 0, 0, 319, 110, 60, 76);
  nubes(t, 0, 319, 60, 104, 7, 77);
  for (let k = 0; k < 3; k++) murcielago(40 + ((t * 18 + k * 90) % 300), 70 + Math.sin(t * 2 + k) * 10 + k * 8, t, k);
  // la estrella candidata, con su aro rojo
  const [sx, sy] = ESTRELLA; R.disco(sx, sy, 2, hex('#f8e070')); R.pset(sx, sy, BL); const pu = 4 + Math.sin(t * 5); R.linea(sx - pu, sy, sx + pu, sy, hex('#f8e8a0')); R.linea(sx, sy - pu, sx, sy + pu, hex('#f8e8a0')); aro(sx, sy, 7, 7, 1, hex('#e83a3a'));
  // las dos antenas giran hasta apuntar a la estrella en «listened to it»
  const gi = ease(tramo(t, DOS - 0.4, ESCUCHA + 0.2));
  const angA0 = -Math.PI / 2 - 0.9, angA1 = Math.atan2(sy - 84, sx - 96), angB0 = -Math.PI / 2 + 0.8, angB1 = Math.atan2(sy - 98, sx - 230);
  const fB = plato(230, 98, 24, lerp(angB0, angB1, gi), ['#2a3048', '#3e4662', '#5a6280', '#7a84a0', '#9aa4c0'].map(hex));
  const fA = plato(96, 84, 40, lerp(angA0, angA1, gi));
  // el haz punteado que sale de cada una cuando escuchan
  const hz = tramo(t, ESCUCHA, ESCUCHA + 0.6);
  if (hz > 0) for (const [fx, fy] of [fA, fB]) { const L = Math.hypot(sx - fx, sy - fy); for (let i = 0; i < L * hz; i += 1) if ((Math.floor(i - t * 20) % 6 + 6) % 6 < 2) tinta(fx + (sx - fx) * i / L, fy + (sy - fy) * i / L, hex('#9ae8f0'), 0.6); }
  // la ventana de la caseta, encendida
  for (let y = 136; y < 150; y++) for (let x = 262; x < 286; x++) R.pset(x, y, hex(Math.sin(t * 3) > 0.95 ? '#f0e0a0' : '#e8c878'));
  R.linea(274, 136, 274, 149, hex('#5a4a30')); R.linea(262, 142, 285, 142, hex('#5a4a30'));
  luciernagas(t, 10, 210, 140, 176, 10, 78);
  // el carro con la pantallita: la línea se queda plana
  caja(176, 150, 214, 172, hex('#4a4e5a')); R.rect(178, 172, 212, 174, hex('#2a2c34')); R.disco(182, 176, 2.5, K); R.disco(208, 176, 2.5, K);
  caja(180, 144, 210, 164, hex('#0a1a12'), hex('#8a8e9a'));
  for (let i = 0; i < 28; i++) { const n = (hs(i, Math.floor(t * 10), 81) - 0.5) * 2; R.pset(181 + i, 156 + Math.round(n), hex('#5ae88a')); }
  for (let y = 146; y < 163; y += 2) R.pset(195, y, hex('#e8b040'));
  if (t > NADA) { const bl = Math.floor((t - NADA) * 4) % 2 === 0; if (bl) R.linea(193, 146, 197, 146, hex('#e8b040')); }
  const nad = t > NADA - 0.1;
  const op = R.actor(EL.operadorRadio, 156, 172, t, { dir: 1, sostiene: true, habla: t > DOS && t < ESCUCHA + 0.4 && Math.sin(t * 7) > 0, triste: nad, sorpresa: t > ESCUCHA && t < NADA - 0.2 });
  { const [hx, hy] = op.mano; caja(hx - 2, hy - 7, hx + 2, hy + 2, hex('#c83a3a')); R.rect(hx - 1, hy - 8, hx + 1, hy - 7, hex('#c8ccd4')); vapor(t, hx, hy - 9, 5); }
  // un coche pasa por el camino con los faros
  const cu = tramo(t, P7 + 1.0, P7 + 3.4); if (cu > 0 && cu < 1) { const cx = Math.round(lerp(330, 222, cu)), cy = Math.round(lerp(176, 152, cu)), s = lerp(1, 0.5, cu);
    caja(cx - Math.round(10 * s), cy - Math.round(6 * s), cx + Math.round(10 * s), cy, hex('#6a2a2a')); R.rect(cx - Math.round(6 * s), cy - Math.round(9 * s), cx + Math.round(5 * s), cy - Math.round(6 * s), hex('#4a1a1a'));
    for (let i = 0; i < 18; i++) tinta(cx - Math.round(10 * s) - i, cy - 3 - Math.round(i * 0.1), hex('#f8f0c0'), 0.5 * (1 - i / 18)); R.pset(cx - Math.round(10 * s), cy - 3, BL); }
};

const año = (t) => t < A96 ? 1995 : t < P3 ? 1996 : t < P4 ? 1998 : t < P7 ? 2020 : 2022;
const efectos = [[BETTER + 0.1, 'motor'], [GRAY, 'bip'], [LISTEN + 0.1, 'zumbido'], [LISTEN + 0.9, 'toc'], [TAS, 'motor'], [AUS + 0.1, 'silbato'], [SETI, 'motor'],
  [ALB + 0.2, 'tecleo'], [SOL, 'bip'], [CAND, 'brillo'], [MIL - 0.1, 'pop'], [P7 + 1.4, 'coche'], [DOS, 'motor'], [NADA, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, cartela: '1995', año });
''')

E['wo-explicaciones'] = ('Las explicaciones de aquí abajo', '''// WO-EXPLICACIONES (frases 20–21), sin cartela. La barra: 1977 (lo que se descartó entonces) → 2016 (en «In 2016») →
// 2017 (en «2017»). Siete planos:
// 1. fondo local: la oficina de la gran oreja en 1977, un tablero de acero con cuatro fichas (avión, satélite, torre de
//    radio y un cometa con «?»); el voluntario las toca con el puntero y caen UNA A UNA en «fell away one by one»; la del
//    cometa se queda. Corta en «A plane».
// 2. cielo2 'caminos' cámara 'franja' (2.º uso, otro estado: el calendario ya agotado, con las hojas en el suelo): la
//    cinta de estrellas pasa recta; un avión con sus luces la cruza en diagonal en «plane» y un satélite en sentido
//    contrario en «satellite»; la voluntaria los sigue con el dedo y en «differently» se vuelve. Corta en «And».
// 3. fondo local inserto: una emisora de radioaficionado de chapa sobre la mesa del cuarto de radio (micro, auriculares,
//    cables, ventana de noche): la escala horizontal con 1400 · 1420 · 1440, la banda protegida rayada en rojo; el
//    candado baja sobre ella en «protected»; la mano gira el mando y la aguja choca con la banda y rebota en «allowed» y
//    en «broadcast»; el piloto rojo no llega a encenderse. Corta en «In 2016».
// 4. cielo2 'hidrogeno' cámara 'cometas' (1.º uso): los dos cometas cruzan con su halo violeta, que se hincha en
//    «hydrogen»; una niña los señala y el granjero los sigue con los prismáticos. Corta en «and in 2017».
// 5. fondo local inserto: un rompecabezas del cielo sobre la mesa, con el hueco estrecho y alto de la señal; la mano trae
//    la pieza del cometa (redonda, con cola) en «2017», la aprieta en «confirmed» y en «didn't fit» salta fuera con una X.
//    Corta en «A comet».
// 6. fondo local: una pizarra blanca con las dos bocinas (1 y 2) y sus trazas reales (la 1 con la campana, la 2 plana);
//    la científica empuja con el puntero un imán con forma de cometa por encima de las dos y salen campanas rojas en LAS
//    DOS en «both horns». Corta en «we'd be hearing».
// 7. fondo local: una pared llena de listados; por la ventana de arriba pasan cometas sin parar y a cada uno un listado
//    se rodea y escribe su «Wow!» rojo (T.piezaListado), con un «!» que salta, hasta llenar la pared («all the time»).''', PRE + r'''
const a = (f) => en('tierra', f), b = (f) => en('cometas', f);
const P2 = a(0.232), P3 = a(0.54), P4 = b(-0.005), P5 = b(0.343), P6 = b(0.637), P7 = b(0.855);
const FELL = a(0.075), PLANE = a(0.24), SAT = a(0.29), DIFF = a(0.46);
const BAND = a(0.57), PROT = a(0.675), ALLOW = a(0.865), BROAD = a(0.905);
const PASS = b(0.165), HYD = b(0.295), Y17 = b(0.36), CONF = b(0.47), GOOD = b(0.53), FIT = b(0.6);
const COMET = b(0.665), BOTH = b(0.72), WOW = b(0.91);

// 1 · fondo local: el tablero de las explicaciones (1977)
const CARTAS = [[70, 74], [118, 74], [166, 74], [214, 74]];
const tableroFijo = () => {
  // la pared de madera con vetas en listones verticales (arriba a la derecha, más oscura y tranquila)
  madera(0, 0, 319, 149, 101, ['#3a2416', '#4a2e1a', '#5a3a22', '#6a4628', '#7a5432'].map(hex));
  for (let x = 0; x < 320; x += 26) { R.linea(x, 0, x, 149, hex('#2a180c')); R.linea(x + 1, 0, x + 1, 149, hex('#8a6440')); }
  for (let y = 0; y < 50; y++) for (let x = 270; x < 320; x++) tinta(x, y, hex('#2a1a10'), 0.45);
  for (let y = 0; y < 24; y++) for (let x = 14; x < 178; x++) tinta(x, y, hex('#2a1a10'), 0.35);
  R.rect(0, 140, 319, 149, hex('#2e1c10')); R.linea(0, 140, 319, 140, hex('#8a6440'));
  // el tablero de acero verde gris con marco de aluminio y su bandeja
  caja(52, 40, 262, 124, hex('#5a6a62'), hex('#9aa0a8')); R.rect(53, 41, 261, 42, hex('#c8ccd4'));
  for (let y = 43; y < 124; y++) for (let x = 53; x < 262; x++) R.pset(x, y, tono(['#4a5a52', '#56665e', '#62726a'].map(hex), 0.5 + (hs(x >> 2, y >> 1, 102) - 0.5) * 0.5 + (x - y) * 0.0015, x, y));
  for (let k = 0; k < 6; k++) { const x0 = 60 + k * 34; R.linea(x0, 46, x0 + 22, 118, hex('#6a7a72')); }
  R.rect(50, 124, 264, 128, hex('#a8acb4')); R.linea(50, 129, 264, 129, K); caja(70, 120, 86, 124, hex('#3a3a44')); R.rect(200, 121, 212, 123, hex('#e84a3a'));
  // el archivador a la derecha, con su planta, y el calendario de 1977 (números) a la izquierda
  caja(272, 70, 314, 150, hex('#7a7e86')); for (let y = 76; y < 148; y += 24) { caja(276, y, 310, y + 20, hex('#8a8e96'), hex('#4a4e56')); R.rect(288, y + 8, 298, y + 10, hex('#c8ccd4')); }
  caja(282, 58, 302, 70, hex('#b8683a')); for (let k = 0; k < 9; k++) R.linea(292, 58, 292 + Math.round(Math.cos(-0.4 - k * 0.3) * 14), 58 + Math.round(Math.sin(-0.4 - k * 0.3) * 12), hex(k % 2 ? '#3a8a3a' : '#5aaa4a'));
  caja(12, 50, 42, 92, hex('#f4f0e4')); R.rect(13, 51, 41, 58, hex('#c83a3a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.rect(15 + i * 4, 62 + j * 7, 16 + i * 4, 63 + j * 7, hex('#5a5a64'));
  R.numero('8', 27, 57, { centro: true, color: BL });
  // el suelo de linóleo a cuadros
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const q = ((Math.floor((x + (y - 150) * 0.6) / 16) + Math.floor((y - 150) / 8)) & 1); R.pset(x, y, tono(q ? ['#b8b0a0', '#c8c0b0'].map(hex) : ['#6a5a4a', '#7a6a5a'].map(hex), hs(x >> 1, y, 103), x, y)); }
};
const icAvion = (x, y, c) => { R.rect(x - 9, y - 1, x + 9, y + 1, c); R.poligono([[x - 2, y - 1], [x + 3, y - 1], [x - 4, y - 9], [x - 7, y - 9]], c); R.poligono([[x - 2, y + 1], [x + 3, y + 1], [x - 4, y + 9], [x - 7, y + 9]], c); R.rect(x - 9, y - 4, x - 7, y + 4, c); R.pset(x + 10, y, c); };
const icTorre = (x, y, c) => { R.linea(x, y - 10, x - 6, y + 10, c); R.linea(x, y - 10, x + 6, y + 10, c); for (let k = 0; k < 4; k++) R.linea(x - 1 - k * 1.5, y - 5 + k * 5, x + 1 + k * 1.5, y - 5 + k * 5, c); R.disco(x, y - 11, 1.5, hex('#e83a3a')); for (const r of [4, 7]) { R.pset(x - r - 1, y - 11, c); R.pset(x + r + 1, y - 11, c); R.pset(x - r, y - 11 - Math.round(r * 0.6), c); R.pset(x + r, y - 11 - Math.round(r * 0.6), c); } };
const icCometa = (x, y) => { for (let i = 0; i < 14; i++) for (let j = -3; j <= 3; j++) if (Math.abs(j) <= 3 - i * 0.18) R.pset(x + 2 + i, y - 2 - Math.round(i * 0.4) + j, i < 6 ? hex('#c8a8f0') : hex('#8a6ac8')); R.disco(x, y, 3, hex('#e8d8ff')); R.disco(x, y, 1.5, BL); };
const carta = (k, x, y, inc) => {
  const c = Math.cos(inc), s = Math.sin(inc), P = (dx, dy) => [x + dx * c - dy * s, y + dx * s + dy * c];
  R.poligono([P(-19, -15), P(19, -15), P(19, 15), P(-19, 15)].map(([u, v]) => [u + 1, v + 2]), hex('#2a3430'));
  R.poligono([P(-19, -15), P(19, -15), P(19, 15), P(-19, 15)], hex('#f4f0e4'));
  const ox = Math.round(x), oy = Math.round(y);
  if (k === 0) icAvion(ox, oy, hex('#3a4a6a')); else if (k === 1) R.icono('satelite', ox - 10, oy - 9, hex('#5a6a7a'), hex('#c8ccd4'), 3); else if (k === 2) icTorre(ox, oy + 2, hex('#5a4a3a')); else { icCometa(ox - 7, oy + 4); R.icono('?', ox + 8, oy - 12, hex('#c83a3a'), hex('#e8c8c8'), 2); }
};
const p1 = (t) => {
  fijo('tablero', tableroFijo);
  const cae = [FELL, FELL + 0.42, FELL + 0.84];
  CARTAS.forEach(([x, y], k) => {
    const t0 = cae[k] ?? 1e9, u = cl((t - t0) / 0.55);
    if (u <= 0) { carta(k, x, y + (k === 3 ? Math.sin(t * 2) * 0.6 : 0), k === 3 ? Math.sin(t * 2.2) * 0.05 : 0); R.disco(x, y - 13, 2.5, hex(['#e84a3a', '#3a6ae8', '#e8c040', '#5ab84a'][k])); R.pset(x - 1, y - 14, BL); }
    else { const yy = y + u * u * 92, dx = Math.sin(u * 5) * 6; carta(k, x + dx, Math.min(162, yy), (k % 2 ? -1 : 1) * u * 1.1); if (u < 0.3) R.disco(x, y - 13 - u * 20, 2.5, hex(['#e84a3a', '#3a6ae8', '#e8c040'][k])); }
  });
  // el voluntario toca cada ficha con el puntero justo antes de que caiga
  const obj = t < cae[0] - 0.1 ? 0 : t < cae[1] - 0.1 ? 1 : t < cae[2] - 0.1 ? 2 : 3;
  const quien = R.actor(EL.voluntario1WO, 26, 172, t, { dir: 1, sostiene: true, habla: t < cae[0] && Math.sin(t * 7) > 0, sorpresa: t > cae[2] + 0.3 });
  const [hx, hy] = quien.mano, [cx, cy] = CARTAS[obj], tx = cx - 10 + Math.sin(t * 3) * 2, ty = cy + 14;
  R.linea(hx, hy, Math.round(tx), Math.round(ty), hex('#7a4a24')); R.linea(hx + 1, hy, Math.round(tx) + 1, Math.round(ty), hex('#a87040')); R.pset(Math.round(tx), Math.round(ty), K);
  // una lámpara de techo que oscila un poco y su luz
  const lx = 214 + Math.round(Math.sin(t * 1.3) * 2); R.linea(214, 0, lx, 14, K); R.poligono([[lx - 10, 22], [lx + 10, 22], [lx + 5, 14], [lx - 5, 14]], hex('#2a5a4a')); R.rect(lx - 3, 22, lx + 3, 23, hex('#f8e8a0'));
};

// 2 · cielo2 'caminos' cámara 'franja': un avión y un satélite cruzan la cinta del cielo de otra manera
const avion = (x, y, t) => { x = Math.round(x); y = Math.round(y); const G = hex('#aab0bc'), D = hex('#6a7080');
  R.poligono([[x - 3, y - 1], [x + 3, y - 1], [x - 4, y - 11], [x - 8, y - 11]], D); R.poligono([[x - 3, y + 1], [x + 3, y + 1], [x - 4, y + 11], [x - 8, y + 11]], G);
  R.rect(x - 11, y - 1, x + 9, y + 1, G); R.linea(x - 11, y - 1, x + 9, y - 1, hex('#d8dce4')); R.pset(x + 10, y, G); R.poligono([[x - 11, y - 1], [x - 8, y - 1], [x - 11, y - 6], [x - 13, y - 6]], D);
  if (Math.sin(t * 9) > 0) { R.disco(x - 7, y + 11, 1.5, hex('#5ae85a')); R.disco(x - 7, y - 11, 1.5, hex('#e83a3a')); tinta(x - 7, y + 13, hex('#5ae85a'), 0.5); tinta(x - 7, y - 13, hex('#e83a3a'), 0.5); }
  if (Math.sin(t * 14) > 0.8) { for (let i = -3; i <= 3; i++) { tinta(x + 1 + i, y, BL, 0.9 - Math.abs(i) * 0.2); tinta(x + 1, y + i, BL, 0.9 - Math.abs(i) * 0.2); } } };
const p2 = (t) => {
  T.cielo2(R, t, { encuadre: 'caminos', camara: 'franja', dias: 60 });
  // el avión: entra abajo a la izquierda y sube en diagonal cortando la cinta; estela de puntos
  const ua = tramo(t, PLANE - 0.3, DIFF + 0.6), xa = lerp(-10, 262, ua), ya = lerp(108, 54, ua);
  for (let i = 8; i < 140; i++) { const q = ua - i * 0.003; if (q <= 0) break; for (const dd of [-1, 1]) tinta(lerp(-10, 262, q), lerp(108, 54, q) + dd, hex('#d8e0f0'), 0.5 * (1 - i / 140)); }
  if (ua > 0 && ua < 1) avion(xa, ya, t);
  // el satélite: un punto que cruza recto en sentido contrario, y brilla un instante
  const us = tramo(t, SAT - 0.1, DIFF + 0.8), xs = lerp(258, 10, us), ys = lerp(40, 84, us);
  if (us > 0 && us < 1) { R.disco(xs, ys, 1.6, BL); R.linea(Math.round(xs) - 4, Math.round(ys), Math.round(xs) - 2, Math.round(ys), hex('#5a8ae8')); R.linea(Math.round(xs) + 2, Math.round(ys), Math.round(xs) + 4, Math.round(ys), hex('#5a8ae8')); if (us > 0.45 && us < 0.55) { for (let i = -3; i <= 3; i++) { tinta(xs + i, ys, BL, 0.7 - Math.abs(i) * 0.2); tinta(xs, ys + i, BL, 0.7 - Math.abs(i) * 0.2); } } for (let i = 1; i < 30; i += 2) tinta(xs + i * 0.95, ys - i * 0.17, hex('#c8d4f0'), 0.3 * (1 - i / 30)); }
  const sigue = t < DIFF;
  R.actor(EL.voluntaria2WO, 168, 174, t, { dir: sigue ? -1 : 1, dedo: t > PLANE && t < DIFF, sorpresa: t > DIFF - 0.2 && t < DIFF + 0.5, habla: t > DIFF + 0.4 && Math.sin(t * 7) > 0 });
  T.cielo2Delante(R, t, { encuadre: 'caminos', camara: 'franja', dias: 60 });
};

// 3 · fondo local inserto: la emisora de radioaficionado con la banda protegida y su candado
const EM = [26, 46, 294, 140], ESC = [46, 60, 274, 92], MHZ = (f) => ESC[0] + 8 + (f - 1380) / 80 * (ESC[2] - ESC[0] - 16);
const radioFijo = () => {
  // la pared del cuarto de radio: tablero perforado con cables colgados y una ventana de noche
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#5a4a3a', '#6a5a46', '#7a6a52'].map(hex), 0.5 + (hs(x >> 2, y >> 2, 111) - 0.5) * 0.3, x, y));
  for (let y = 26; y < 44; y += 6) for (let x = 24; x < 120; x += 6) R.pset(x, y, hex('#3a2e22'));
  for (const [x0, c] of [[40, '#2a2a30'], [62, '#c83a3a'], [90, '#3a5aa8']]) for (let i = 0; i < 18; i++) R.pset(x0 + Math.round(Math.sin(i * 0.3) * 6), 26 + i, hex(c));
  caja(200, 6, 262, 42, hex('#0a1028'), hex('#c8c0a8')); for (let k = 0; k < 18; k++) R.pset(202 + Math.floor(hs(k, 1, 112) * 58), 8 + Math.floor(hs(k, 2, 112) * 32), hex(hs(k, 3, 112) > 0.5 ? '#f6f2ea' : '#8a9ac8')); R.linea(231, 6, 231, 42, hex('#c8c0a8')); R.disco(248, 16, 4, hex('#f0ead0')); R.disco(250, 15, 3, hex('#0a1028'));
  for (let y = 0; y < 24; y++) for (let x = 14; x < 178; x++) tinta(x, y, hex('#2a2018'), 0.35);
  // la mesa
  madera(0, 142, 319, 179, 113);
  R.linea(0, 142, 319, 142, hex('#b8865a'));
  // la emisora: caja de chapa verde gris con su frente, rejilla y tornillos
  caja(EM[0], EM[1], EM[2], EM[3], hex('#5a6458')); R.rect(EM[0] + 1, EM[1] + 1, EM[2] - 1, EM[1] + 3, hex('#7a8478')); R.rect(EM[0] + 1, EM[3] - 3, EM[2] - 1, EM[3] - 1, hex('#3a4238'));
  for (let y = EM[1] + 4; y < EM[3] - 3; y++) for (let x = EM[0] + 1; x < EM[2]; x++) if (hs(x, y, 114) > 0.93) R.pset(x, y, hex('#525c50'));
  for (const [x, y] of [[EM[0] + 4, EM[1] + 6], [EM[2] - 4, EM[1] + 6], [EM[0] + 4, EM[3] - 6], [EM[2] - 4, EM[3] - 6]]) { R.disco(x, y, 1.6, hex('#a8acb4')); R.pset(x, y, K); }
  // la escala (cristal claro iluminado) con sus marcas y cifras
  caja(ESC[0] - 2, ESC[1] - 2, ESC[2] + 2, ESC[3] + 2, hex('#2a2a24')); for (let y = ESC[1]; y <= ESC[3]; y++) for (let x = ESC[0]; x <= ESC[2]; x++) R.pset(x, y, tono(['#d8c890', '#e8dca8', '#f0e8c0'].map(hex), 0.75 - Math.abs(x - 160) / 300, x, y));
  for (let f = 1380; f <= 1460; f += 2) { const x = Math.round(MHZ(f)); R.linea(x, ESC[3] - (f % 10 ? 3 : 6), x, ESC[3], hex('#3a3428')); }
  for (const f of [1400, 1420, 1440]) R.numero(String(f), Math.round(MHZ(f)), ESC[1] + 12, { centro: true, color: hex('#3a3428'), sombra: false });
  // la banda protegida, rayada en rojo (1400–1427)
  const b0 = Math.round(MHZ(1400)), b1 = Math.round(MHZ(1427));
  for (let y = ESC[1] + 15; y <= ESC[3] - 7; y++) for (let x = b0; x <= b1; x++) if (((x + y) >> 1) % 3 === 0) R.pset(x, y, hex('#c83a3a')); else R.pset(x, y, hex('#f0c8a8'));
  R.linea(b0, ESC[1] + 14, b0, ESC[3] - 6, hex('#a82a2a')); R.linea(b1, ESC[1] + 14, b1, ESC[3] - 6, hex('#a82a2a'));
  // los mandos y medidores (asimétricos: no es una cara)
  caja(46, 104, 92, 130, hex('#e8e0c8'), hex('#2a2a24')); for (let k = 0; k < 9; k++) R.pset(50 + k * 5, 108, hex('#3a3428')); R.rect(84, 109, 90, 112, hex('#c83a3a'));
  for (const [x, y, r] of [[118, 120, 6], [144, 124, 4], [170, 124, 4]]) { R.disco(x, y + 1, r + 1, K); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#3a3a40')); R.pset(x - 1, y - r + 1, hex('#8a8a94')); }
  for (let x = 190; x < 232; x += 3) R.linea(x, 104, x, 132, hex('#3a4238'));
  // el micro de mesa, los auriculares y una taza
  R.rect(4, 132, 22, 141, hex('#3a3a40')); R.rect(11, 112, 13, 132, hex('#8a8a94')); caja(6, 98, 18, 114, hex('#a8acb4')); for (let y = 100; y < 112; y += 2) R.linea(8, y, 16, y, hex('#6a6e78'));
  R.disco(78, 164, 9, hex('#2a2a30')); R.disco(78, 164, 6, hex('#5a6458')); R.disco(78, 164, 3, hex('#2a2a30')); caja(196, 150, 212, 168, hex('#e8e0c8')); R.rect(198, 151, 210, 152, hex('#5a3a24')); R.rect(213, 154, 216, 162, hex('#e8e0c8'));
  for (let i = 0; i < 40; i++) R.pset(24 + i * 2, 146 + Math.round(Math.sin(i * 0.4) * 2), hex('#1a1a1e'));
  // la libreta de guardias con cifras
  caja(120, 150, 178, 176, hex('#f0ecdc'), hex('#8a8270')); for (let y = 154; y < 174; y += 4) R.linea(124, y, 174, y, hex('#b8c0d0'));
};
const p3 = (t) => {
  fijo('radio', radioFijo);
  // la aguja: va hacia la banda y rebota en ella en «allowed» y en «broadcast»
  const fq = curva(t, [[P3, 1384], [BAND, 1386], [PROT + 0.4, 1396], [ALLOW - 0.15, 1396], [ALLOW, 1399.3], [ALLOW + 0.3, 1393], [BROAD - 0.15, 1394], [BROAD, 1399.3], [BROAD + 0.35, 1390], [P4, 1390]]);
  const nx = Math.round(MHZ(fq)); R.linea(nx, ESC[1] - 1, nx, ESC[3] + 1, hex('#c83a3a')); R.linea(nx + 1, ESC[1] - 1, nx + 1, ESC[3] + 1, hex('#8a2a2a'));
  // el candado baja sobre la banda en «protected»
  const b0 = MHZ(1400), b1 = MHZ(1427), cx = Math.round((b0 + b1) / 2), ca = ease(tramo(t, PROT - 0.35, PROT + 0.1)), tiembla = (Math.abs(t - ALLOW) < 0.25 || Math.abs(t - BROAD) < 0.25) ? Math.round(Math.sin(t * 60)) : 0;
  if (ca > 0) { const y = Math.round(lerp(-20, ESC[1] + 16, ca)); R.icono('candado', cx - 10 + tiembla, y, hex('#e8b030'), K, 3); R.disco(cx + 1 + tiembla, y + 15, 1, K); }
  // el piloto «al aire» intenta encenderse y se apaga
  const on = (Math.abs(t - ALLOW) < 0.12 || Math.abs(t - BROAD) < 0.12); R.disco(240, 108, 5, K); R.disco(240, 108, 4, on ? hex('#ff5a3a') : hex('#5a1a14')); if (on) for (let i = 0; i < 12; i++) tinta(240 + Math.cos(i) * 7, 108 + Math.sin(i) * 7, hex('#ff8a5a'), 0.4);
  // la aguja del medidor tiembla
  const ma = -2.4 + 0.25 * Math.sin(t * 7) + (on ? 0.6 : 0); R.linea(69, 128, 69 + Math.round(Math.cos(ma) * 16), 128 + Math.round(Math.sin(ma) * 16), K);
  // el gran mando de sintonía y la mano que lo gira
  const ang = (fq - 1380) * 0.35; R.disco(262, 124, 13, K); R.disco(262, 124, 12, hex('#2a2a30')); for (let k = 0; k < 16; k++) { const q = ang + k / 16 * 6.28; R.pset(Math.round(262 + Math.cos(q) * 11), Math.round(124 + Math.sin(q) * 11), hex('#5a5a64')); } R.disco(262 + Math.round(Math.cos(ang) * 7), 124 + Math.round(Math.sin(ang) * 7), 2, hex('#c8ccd4'));
  T.brazo(R, 304, 198, 276, 140, '#4a5a7a', -1, { codo: [296, 176] });
  // la luna por la ventana y una polilla en la lámpara
  const px = 186 + Math.round(Math.cos(t * 5) * 6), py = 22 + Math.round(Math.sin(t * 6.5) * 4); R.pset(px, py, hex('#e8dcc0')); if (Math.sin(t * 40) > 0) { R.pset(px - 1, py - 1, hex('#bfb090')); R.pset(px + 1, py - 1, hex('#bfb090')); }
  R.linea(186, 0, 186, 10, K); R.poligono([[178, 16], [194, 16], [190, 10], [182, 10]], hex('#3a3a40')); R.rect(183, 16, 189, 17, hex('#f8e8a0'));
  vapor(t, 204, 149, 3);
};

// 4 · cielo2 'hidrogeno' cámara 'cometas' (2016)
const p4 = (t) => {
  const u = tramo(t, P4, P5 + 0.4);
  const g = T.cielo2(R, t, { encuadre: 'hidrogeno', camara: 'cometas', u, trazas: 0, candado: 0 });
  // el halo de hidrógeno se hincha en «hydrogen»
  const hi = Math.max(0, 1 - Math.abs(t - HYD - 0.4) / 1.2);
  if (hi > 0) for (const [cx, cy] of [g.cometa1, g.cometa2]) { if (!cx) continue; for (let y = -16; y <= 16; y++) for (let x = -16; x <= 16; x++) { const d = Math.hypot(x, y); if (d < 15 && d > 3) tinta(cx + x, cy + y, hex('#b88af0'), 0.32 * hi * (1 - d / 15)); } }
  const sig = t > PASS - 0.6;
  R.actor(EL.nina, 120, 174, t, { dir: -1, dedo: sig && t < HYD + 1, salto: t > PASS && t < PASS + 0.35 ? 2 : 0, sonrisa: sig });
  const gr = R.actor(EL.granjero, 196, 174, t, { dir: -1, sostiene: [182, 146] });
  const [hx, hy] = gr.mano; caja(hx - 4, hy - 3, hx + 1, hy + 1, hex('#2a2a30')); R.pset(hx - 4, hy - 2, hex('#5a8ac8'));
  T.cielo2Delante(R, t, { encuadre: 'hidrogeno', camara: 'cometas' });
};

// 5 · fondo local inserto: el rompecabezas del cielo y la pieza del cometa que no encaja (2017)
const PZ = [62, 54, 258, 172];
const HUECO = [[156, 164], [156, 152], [154, 152], [154, 138], [157, 138], [157, 120], [161, 120], [161, 110], [165, 110], [165, 120], [168, 120], [168, 138], [171, 138], [171, 152], [169, 152], [169, 164]];
const puzzleFijo = () => {
  madera(0, 0, 319, 179, 121, ['#5a3a20', '#6a4628', '#7a5432', '#8a623c', '#9a7048'].map(hex));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 1.4, y - 100); tinta(x, y, hex('#1a0e06'), Math.min(0.55, Math.max(0, (d - 70) / 140))); }
  // el tapete verde, tranquilo, arriba a la derecha y la sombra del tablero
  for (let y = 0; y < 56; y++) for (let x = 268; x < 320; x++) R.pset(x, y, tono(['#1e3a2a', '#244232'].map(hex), hs(x >> 2, y >> 2, 122), x, y));
  R.rect(PZ[0] + 3, PZ[1] + 4, PZ[2] + 4, PZ[3] + 5, hex('#2a1a0e'));
  // el tablero: un cielo de noche en piezas, con sus cortes y botones
  for (let y = PZ[1]; y <= PZ[3]; y++) for (let x = PZ[0]; x <= PZ[2]; x++) { let f = 0.3 + (y - PZ[1]) / 260; const d = Math.abs((x - PZ[0]) * 0.5 - (y - PZ[1]) - 20); if (d < 18) f += (1 - d / 18) * 0.3; R.pset(x, y, tono(['#0a1028', '#121a38', '#1a2448', '#24305a', '#2e3c6a'].map(hex), f, x, y)); }
  for (let k = 0; k < 160; k++) { const x = PZ[0] + 2 + Math.floor(hs(k, 1, 123) * (PZ[2] - PZ[0] - 4)), y = PZ[1] + 2 + Math.floor(hs(k, 2, 123) * (PZ[3] - PZ[1] - 4)); R.pset(x, y, hs(k, 3, 123) > 0.75 ? BL : hex('#8a9ac8')); }
  for (let gx = PZ[0] + 28; gx < PZ[2]; gx += 28) for (let y = PZ[1]; y <= PZ[3]; y++) { const yy = (y - PZ[1]) % 22, bump = yy > 8 && yy < 14 ? Math.round(Math.sin((yy - 8) / 6 * Math.PI) * 3 * (((gx + y) >> 4) % 2 ? 1 : -1)) : 0; R.pset(gx + bump, y, hex('#060a18')); }
  for (let gy = PZ[1] + 22; gy < PZ[3]; gy += 22) for (let x = PZ[0]; x <= PZ[2]; x++) { const xx = (x - PZ[0]) % 28, bump = xx > 11 && xx < 17 ? Math.round(Math.sin((xx - 11) / 6 * Math.PI) * 3 * (((gy + x) >> 4) % 2 ? 1 : -1)) : 0; R.pset(x, gy + bump, hex('#060a18')); }
  for (let i = 1; i <= 2; i++) { R.linea(PZ[0] - i, PZ[1] - i, PZ[2] + i, PZ[1] - i, hex(i === 1 ? '#e8d0a0' : '#c8a870')); R.linea(PZ[0] - i, PZ[3] + i, PZ[2] + i, PZ[3] + i, hex('#a88850')); R.linea(PZ[0] - i, PZ[1] - i, PZ[0] - i, PZ[3] + i, hex('#c8a870')); R.linea(PZ[2] + i, PZ[1] - i, PZ[2] + i, PZ[3] + i, hex('#a88850')); }
  // el hueco de la señal: estrecho y alto, con su fondo de cartón
  R.poligono(HUECO, hex('#8a6a4a')); R.poligono(HUECO.map(([x, y]) => [x + 1, y + 1]), hex('#a8845a')); for (let i = 0; i < HUECO.length; i++) { const [x0, y0] = HUECO[i], [x1, y1] = HUECO[(i + 1) % HUECO.length]; R.linea(x0, y0, x1, y1, hex('#3a2414')); }
  // la tapa de la caja, el listado del «Wow!», la lupa, la taza y un lápiz
  caja(4, 60, 54, 120, hex('#2a3a6a'), hex('#c8a870')); for (let k = 0; k < 20; k++) R.pset(8 + Math.floor(hs(k, 1, 124) * 42), 64 + Math.floor(hs(k, 2, 124) * 52), BL); icCometa(26, 90);
  T.piezaListado(R, 266, 70, { w: 50, hh: 104, s: 1, rodea: 1, wow: 1, margen: 14 });
  R.disco(28, 146, 14, hex('#3a3a40')); R.disco(28, 146, 12, hex('#9ab8c8')); R.disco(24, 142, 4, hex('#d8e8f0')); R.linea(38, 156, 48, 168, hex('#3a2414')); R.linea(39, 156, 49, 168, hex('#5a3a24'));
  R.linea(190, 40, 246, 28, hex('#e8c040')); R.linea(190, 41, 246, 29, hex('#a87a20')); R.pset(189, 41, K); caja(84, 26, 150, 46, hex('#f0ecdc'), hex('#8a8270')); for (let y = 30; y < 44; y += 3) R.linea(88, y, 146, y, hex('#b8c0d0'));
};
const piezaCometa = (x, y, inc) => {
  const c = Math.cos(inc), s = Math.sin(inc), P = (dx, dy) => [x + dx * c - dy * s, y + dx * s + dy * c];
  const borde = [P(-12, -2), P(-10, -9), P(-3, -12), P(5, -11), P(10, -6), P(30, -14), P(34, -8), P(14, 4), P(10, 9), P(2, 12), P(-6, 11), P(-11, 6)];
  R.poligono(borde.map(([u, v]) => [u + 2, v + 3]), hex('#1a0e06'));
  R.poligono(borde, (px, py) => { const d = Math.hypot(px - x, py - y); return d < 6 ? hex('#f0e8ff') : d < 11 ? hex('#c8a8f0') : hex('#7a5ab8'); });
  for (let i = 0; i < borde.length; i++) { const [x0, y0] = borde[i], [x1, y1] = borde[(i + 1) % borde.length]; R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), hex('#2a1a4a')); }
  R.disco(x, y, 3, BL);
};
const p5 = (t) => {
  fijo('puzzle', puzzleFijo);
  // la pieza: llega en «2017», se aprieta en «confirmed», se queda torcida y en «didn't fit» salta fuera
  const llega = ease(tramo(t, P5 + 0.1, Y17 + 0.6)), aprieta = t > CONF - 0.3 && t < GOOD ? Math.sin((t - CONF) * 30) * 1.5 : 0, salta = tramo(t, FIT - 0.1, FIT + 0.5);
  let x = lerp(300, 162, llega), y = lerp(184, 132, llega) + aprieta, inc = lerp(0.5, 0.15, llega);
  if (salta > 0) { x += salta * 52; y += -Math.sin(salta * Math.PI) * 30 + salta * 8; inc += salta * 1.4; }
  piezaCometa(x, y, inc);
  // la mano: sujeta la pieza y la suelta al saltar
  const suelta = salta > 0.05, sx0 = 162 + 16, sy0 = 138, mx = suelta ? lerp(sx0, 236, ease(tramo(t, FIT, P6 - 0.3))) : x + 16, my = suelta ? lerp(sy0, 190, ease(tramo(t, FIT, P6 - 0.3))) : y + 6;
  T.brazo(R, Math.round(mx + 30), 204, Math.round(mx + 10), Math.round(my + 4), '#5a6a8a', -1);
  // una X roja sobre el hueco en «didn't fit»
  if (t > FIT && t < FIT + 1.6 && Math.floor((t - FIT) * 5) % 2 === 0) R.icono('X', 152, 126, hex('#e83a3a'), K, 4);
  R.disco(236, 30, 9, K); R.disco(236, 30, 8, hex('#e8e0c8')); R.disco(236, 30, 6, hex('#4a2a14')); vapor(t, 236, 22, 4);
};

// 6 · fondo local: la pizarra blanca con las dos bocinas y el imán del cometa
const PB = [24, 28, 268, 150];
const BOX1 = [40, 40, 140, 82], BOX2 = [156, 40, 256, 82];
const pizarraFijo = () => {
  // la pared clara con la luz de la ventana y una ventana a la derecha (debajo de la zona de Atom)
  trama(0, 0, 319, 179, ['#a8b0b8', '#b8c0c8', '#c8d0d6', '#d8dee2'].map(hex), 0.75, 0.35, 131, 0.1);
  caja(276, 56, 316, 130, hex('#a8d0f0'), hex('#e8eaee')); for (let y = 58; y < 129; y++) for (let x = 278; x < 315; x++) R.pset(x, y, y > 110 ? tono(['#5a8a4a', '#6a9a5a'].map(hex), hs(x, y, 132), x, y) : tono(['#8ac0e8', '#a8d0f0', '#c8e0f4'].map(hex), (y - 58) / 52, x, y)); R.linea(296, 56, 296, 130, hex('#e8eaee')); R.linea(276, 93, 316, 93, hex('#e8eaee'));
  // la pizarra con su marco de aluminio, sombras de lo borrado y la bandeja con rotuladores y borrador
  caja(PB[0], PB[1], PB[2], PB[3], hex('#f8f8f6'), hex('#8a8e96')); R.rect(PB[0] + 1, PB[1] + 1, PB[2] - 1, PB[1] + 1, hex('#c8ccd4'));
  for (let k = 0; k < 12; k++) { const x = PB[0] + 10 + hs(k, 1, 133) * 220, y = PB[1] + 10 + hs(k, 2, 133) * 100; for (let i = 0; i < 26; i++) tinta(x + i, y + Math.sin(i * 0.3 + k) * 3, hex('#b8c0c8'), 0.25); }
  R.rect(PB[0] - 2, PB[3] + 1, PB[2] + 2, PB[3] + 4, hex('#a8acb4')); R.linea(PB[0] - 2, PB[3] + 5, PB[2] + 2, PB[3] + 5, K);
  for (const [x, c] of [[60, '#2a2a30'], [74, '#c83a3a'], [88, '#3a6ac8']]) { R.rect(x, PB[3] - 1, x + 11, PB[3] + 1, hex(c)); R.rect(x + 11, PB[3] - 1, x + 12, PB[3] + 1, hex('#e8e8ec')); }
  caja(220, PB[3] - 3, 240, PB[3] + 1, hex('#3a3a44')); R.rect(221, PB[3] - 2, 239, PB[3] - 2, hex('#c8ccd4'));
  // las dos cajas de traza con su chapa y la traza real: la 1 con la campana, la 2 plana
  for (const [B, n] of [[BOX1, 1], [BOX2, 2]]) { for (let x = B[0]; x <= B[2]; x++) { R.pset(x, B[3], hex('#3a3a44')); } R.linea(B[0], B[1], B[0], B[3], hex('#3a3a44'));
    R.disco(B[0] + 8, B[1] + 6, 6, hex('#2a2a40')); R.disco(B[0] + 8, B[1] + 6, 5, hex('#f8f8f6')); R.numero(String(n), B[0] + 9, B[1] + 10, { centro: true, color: hex('#2a2a40'), sombra: false });
    for (let x = B[0] + 2; x < B[2] - 2; x++) { const u = (x - B[0]) / (B[2] - B[0]), h = n === 1 ? Math.exp(-((u - 0.5) ** 2) / 0.012) * 30 : 0; const y = Math.round(B[3] - 4 - h + (hs(x, n, 134) - 0.5) * 2); R.pset(x, y, hex('#2a2a30')); R.pset(x, y + 1, hex('#5a5a64')); } }
  // las dos bocinas dibujadas con rotulador, mirando arriba, con su cono punteado
  for (const cx of [90, 206]) { R.poligono([[cx - 14, 106], [cx + 14, 106], [cx + 5, 132], [cx - 5, 132]], hex('#e0e4ea')); R.linea(cx - 14, 106, cx - 5, 132, hex('#2a2a30')); R.linea(cx + 14, 106, cx + 5, 132, hex('#2a2a30')); R.linea(cx - 14, 106, cx + 14, 106, hex('#2a2a30')); R.rect(cx - 5, 132, cx + 5, 138, hex('#2a2a30'));
    for (let i = 0; i < 18; i += 2) { R.pset(cx - 14 - i, 104 - i, hex('#8a8e96')); R.pset(cx + 14 + i, 104 - i, hex('#8a8e96')); } }
};
const p6 = (t) => {
  fijo('pizarra', pizarraFijo);
  // el imán del cometa cruza por encima de las dos bocinas, empujado con el puntero
  const u = tramo(t, P6 + 0.2, BOTH + 0.9), mx = lerp(44, 246, ease(u)), my = 94 + Math.sin(u * 6) * 1.5;
  for (const [B, cx, tc] of [[BOX1, 90, lerp(P6 + 0.2, BOTH + 0.9, 0.24)], [BOX2, 206, BOTH]]) {
    const r = ease(tramo(t, tc - 0.15, tc + 0.5)); if (r <= 0) continue;
    for (let x = B[0] + 2; x < B[0] + 2 + (B[2] - B[0] - 4) * r; x++) { const q = (x - B[0]) / (B[2] - B[0]), h = Math.exp(-((q - 0.5) ** 2) / 0.012) * 30; const y = Math.round(B[3] - 6 - h); R.pset(x, y, hex('#e83a3a')); R.pset(x, y - 1, hex('#e83a3a')); }
    if (Math.abs(mx - cx) < 16) for (let i = 0; i < 16; i += 2) { R.pset(cx - 14 - i, 104 - i, hex('#e8a030')); R.pset(cx + 14 + i, 104 - i, hex('#e8a030')); }
  }
  if (t > BOTH + 0.4) { const on = Math.floor(t * 4) % 2 === 0; if (on) { R.icono('!', BOX2[2] - 14, BOX2[1] + 4, hex('#e83a3a'), K, 2); R.icono('!', BOX1[2] - 14, BOX1[1] + 4, hex('#e83a3a'), K, 2); } }
  // el imán (cometa de plástico morado)
  for (let i = 0; i < 16; i++) for (let j = -3; j <= 3; j++) if (Math.abs(j) <= 3 - i * 0.18) R.pset(Math.round(mx - 6 - i), Math.round(my - 2 - i * 0.3 + j), i < 6 ? hex('#c8a8f0') : hex('#8a6ac8'));
  R.disco(mx + 1, my + 1, 5, hex('#5a5a64')); R.disco(mx, my, 5, hex('#7a4ac8')); R.disco(mx - 1, my - 1, 2, hex('#e8d8ff'));
  // la científica empuja el imán con el puntero
  const px = Math.round(mx - 38), ci = R.actor(EL.cientifica, px, 176, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > BOTH, habla: t > BOTH + 0.3 && Math.sin(t * 7) > 0 });
  const [hx, hy] = ci.mano; R.linea(hx, hy, Math.round(mx - 6), Math.round(my + 4), hex('#7a4a24')); R.linea(hx + 1, hy, Math.round(mx - 5), Math.round(my + 4), hex('#a87040'));
  // la persiana de la ventana se mece y un pájaro pasa
  const bx = 278 + ((t * 12) % 60); if (bx < 314) { R.pset(Math.round(bx), 70 + Math.round(Math.sin(t * 3) * 3), K); R.pset(Math.round(bx) - 1, 69 + Math.round(Math.sin(t * 3) * 3) + (Math.sin(t * 20) > 0 ? 0 : 2), K); R.pset(Math.round(bx) + 1, 69 + Math.round(Math.sin(t * 3) * 3) + (Math.sin(t * 20) > 0 ? 0 : 2), K); }
};

// 7 · fondo local: la pared de los «Wow!» que no paran
const HOJAS = [[20, 64], [94, 64], [168, 64], [242, 64], [20, 120], [94, 120], [168, 120], [242, 120]];
const paredFijo = () => {
  trama(0, 0, 319, 179, ['#4a3a2e', '#5a4636', '#6a5240'].map(hex), 0.5, 0.6, 141, 0.15);
  for (let x = 0; x < 320; x += 20) R.linea(x, 0, x, 179, hex('#3e3026'));
  // la ventana alargada de arriba (el cielo de noche va en cada fotograma)
  caja(18, 24, 268, 58, hex('#0a1028'), hex('#c8c0a8')); R.linea(18, 59, 268, 59, hex('#2a2018'));
  for (const [x, y] of HOJAS) { T.piezaListado(R, x, y, { w: 70, hh: 54, s: 1 }); R.disco(x + 35, y + 1, 2, hex('#c83a3a')); }
  R.rect(0, 176, 319, 179, hex('#2a1e16'));
};
const p7 = (t) => {
  fijo('pared', paredFijo);
  // el cielo de la ventana, con cometas que pasan sin parar
  R.recorte([19, 25, 267, 57]);
  for (let y = 25; y <= 57; y++) for (let x = 19; x <= 267; x++) R.pset(x, y, tono(NOCHE, (y - 25) / 40 + 0.1, x, y));
  for (let k = 0; k < 50; k++) R.pset(20 + Math.floor(hs(k, 1, 142) * 246), 26 + Math.floor(hs(k, 2, 142) * 30), hs(k, 3, 142) > 0.7 ? BL : hex('#8a9ac8'));
  const cada = 0.42;
  for (let k = 0; k < 12; k++) { const t0 = P7 - 0.3 + k * cada, q = (t - t0) / 1.1; if (q < 0 || q > 1) continue; const x = lerp(280, 0, q), y = 30 + (k * 7) % 22 + q * 6;
    for (let i = 0; i < 18; i++) for (let j = -2; j <= 2; j++) if (Math.abs(j) <= 2 - i * 0.1) tinta(x + 3 + i, y - i * 0.25 + j, hex(i < 6 ? '#e0c8ff' : '#9a7ad8'), 0.8 - i * 0.04); R.disco(x, y, 2, BL); }
  R.recorte(null);
  R.linea(143, 24, 143, 58, hex('#c8c0a8'));
  // cada cometa, un listado se rodea y escribe su «Wow!»
  HOJAS.forEach(([x, y], k) => { const t0 = P7 + 0.15 + k * cada, ro = tramo(t, t0, t0 + 0.22), wo = tramo(t, t0 + 0.18, t0 + 0.42);
    if (ro > 0) T.piezaListado(R, x, y, { w: 70, hh: 54, s: 1, soloRojo: true, rodea: ro, wow: wo });
    const sal = tramo(t, t0 + 0.3, t0 + 0.55); if (sal > 0 && sal < 1) { const yy = Math.round(y + 6 - sal * 8); R.icono('!', x + 60, yy, hex('#f8e070'), K, 2); } });
};

const año = (t) => t < P4 ? 1977 : t < Y17 ? 2016 : 2017;
const efectos = [[FELL, 'papel'], [FELL + 0.84, 'papel'], [PLANE, 'jet'], [PROT - 0.05, 'cerrojo'], [ALLOW + 0.02, 'toc'], [BROAD + 0.02, 'toc'],
  [P4 + 0.6, 'whoosh'], [HYD, 'brillo'], [CONF - 0.1, 'golpecito'], [FIT, 'boing'], [BOTH, 'bip'], [P7 + 0.6, 'pop'], [P7 + 1.4, 'pop'], [WOW, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
