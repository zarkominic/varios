# Borrador de escenas del ep30, grupo S7: gz-hawass, gz-retirada, gz-permiso (con el movimiento ya hecho).
E = {}

# ayudantes comunes de los fondos locales (se pegan delante de cada cuerpo; ninguna línea empieza por «import»)
LIB = r'''
const K = T.C.k, cl = (v, a, b) => (v < a ? a : v > b ? b : v);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const H = (...a) => a.map((s) => hex(s));
// un fondo fijo en su búfer: se pinta una vez y se copia en cada fotograma (prev = R.usar(b) … R.usar(prev))
const capa = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); R.llenar(0); dib(); R.usar(prev); } R.copiar(b); }; };
// una capa con huecos (píxel 0 = transparente) que se pega encima de lo que haya
const capaT = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); R.llenar(0); dib(); R.usar(prev); } const d = R.buf; for (let i = 0; i < b.length; i++) if (b[i]) d[i] = b[i]; }; };
// degradado vertical tramado con una rampa de colores
const grad = (x0, y0, x1, y1, ramp) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * (ramp.length - 1); for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(ramp, v, x, y)); } };
// yeso con manchas, poros y alguna grieta fina
const yeso = (x0, y0, x1, y1, [c0, c1, c2], k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 1, y >> 1, k), m = hh(x >> 3, y >> 3, k + 3); R.pset(x, y, n < 0.07 || (m < 0.18 && n < 0.35) ? c0 : n > 0.95 ? c2 : c1); }
  for (let g = 0; g < 4; g++) { let x = x0 + Math.floor(hh(g, k, 9) * (x1 - x0)), y = y0 + Math.floor(hh(k, g, 8) * (y1 - y0)); for (let s = 0; s < 14; s++) { R.pset(x, y, c0); x += hh(s, g, k) > 0.5 ? 1 : 0; y += 1; if (y > y1) break; } } };
// ladrillo visto con llagas, ladrillos de tono distinto y alguno con brillo
const ladrillo = (x0, y0, x1, y1, [m, b0, b1, b2, b3]) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / 6), jy = (y - y0) % 6; for (let x = x0; x <= x1; x++) { const xx = x - x0 + (f % 2) * 6, i = Math.floor(xx / 12), jx = xx % 12;
  if (jy === 5 || jx === 11) { R.pset(x, y, m); continue; } const v = hh(i, f, 4); let c = v < 0.3 ? b0 : v < 0.75 ? b1 : b2; if (jy === 0 && v > 0.5) c = b3; if (hh(x, y, 2) < 0.06) c = b0; R.pset(x, y, c); } } };
// tablas de madera con vetas y nudos
const madera = (x0, y0, x1, y1, [c0, c1, c2, c3], alto = 6) => { for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / alto), jy = (y - y0) % alto; for (let x = x0; x <= x1; x++) { let c = c1; const v = Math.sin(x * 0.09 + tb * 3.1 + Math.sin(x * 0.027 + tb) * 2.6 + jy * 0.7);
  if (v > 0.86) c = c0; else if (v < -0.88) c = c2; if (jy === 0) c = c3; if (jy === alto - 1) c = c0; if (hh(x, tb, 6) < 0.004) c = c0; if (((x + tb * 37) % 71) === 0 && jy > 0 && jy < alto - 1) c = c0; R.pset(x, y, c); } } };
// estante con lomos de libros de colores (sin letras), alguno inclinado
const libros = (x0, y0, x1, y1, filas, k = 0) => { const cols = H('#8a2a2a', '#2a4a7a', '#3a6a3a', '#c89a3a', '#5a3a6a', '#2a6a6a', '#a8603a', '#6a6a7a', '#c8c0a8');
  const mad = H('#4a2c18', '#6a4024', '#8a5a34'); R.rect(x0, y0, x1, y1, mad[0]); const h = (y1 - y0) / filas;
  for (let f = 0; f < filas; f++) { const yb = Math.round(y0 + (f + 1) * h) - 2, yt = Math.round(y0 + f * h) + 3; R.rect(x0, yb, x1, yb + 2, mad[1]); R.rect(x0, yb, x1, yb, mad[2]);
    let x = x0 + 2; while (x < x1 - 3) { const w = 3 + Math.floor(hh(x, f, k) * 4), alto = Math.round((yb - yt) * (0.7 + hh(f, x, k) * 0.3)), c = cols[Math.floor(hh(x, f + 9, k) * cols.length)];
      if (hh(x, f, k + 5) < 0.06) { x += 5; continue; }
      R.rect(x, yb - alto, Math.min(x + w - 1, x1 - 2), yb - 1, K); R.rect(x + 1, yb - alto + 1, Math.min(x + w - 2, x1 - 3), yb - 1, c); R.rect(x + 1, yb - alto + 3, Math.min(x + w - 2, x1 - 3), yb - alto + 3, H('#e8d8a0')[0]); R.pset(x + 1, yb - alto + 1, H('#ffffff')[0]); x += w; } }
  R.rect(x0, y0, x1, y0 + 1, mad[2]); R.rect(x0, y0, x0 + 1, y1, mad[1]); R.rect(x1 - 1, y0, x1, y1, mad[0]); };
// pájaro pequeño que aletea
const pajaro = (x, y, t, k = 0, c = K) => { const a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - 1 - a, c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - 1 - a, c); };
// nube de tres tonos (dentro del recorte que haya)
const nube = (cx, cy, w, [s2, s, c]) => { const b = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
  for (const [dx, dy, r] of b) R.disco(cx + dx, cy + dy + 1.5, r, s2); for (const [dx, dy, r] of b) R.disco(cx + dx, cy + dy, r, s); for (const [dx, dy, r] of b) R.disco(cx + dx - 1, cy + dy - 2, r * 0.75, c); };
// marco de cuadro con su luz
const cuadro = (x0, y0, x1, y1, m = H('#3a2414', '#8a5a2a', '#c8904a')) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, m[1]); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, m[2]); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, m[0]); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, K); };
// la marca de los editores: aro rojo a mano
const aroRojo = (cx, cy, rx, ry, u = 1, c = hex('#e8303a')) => { const n = Math.round(60 * u); for (let i = 0; i < n; i++) { const a = -1.2 + i / 60 * 6.6, w = 1 + 0.06 * Math.sin(i); R.pset(Math.round(cx + Math.cos(a) * rx * w), Math.round(cy + Math.sin(a) * ry * w), c); R.pset(Math.round(cx + Math.cos(a) * (rx + 1) * w), Math.round(cy + Math.sin(a) * (ry + 1) * w), c); } };
// rejilla y barrido del plano azul (código de «según ellos») dentro de [x0..x1, y0..y1]
const planoAzul = (x0, y0, x1, y1, t, paso = 6) => { R.rect(x0, y0, x1, y1, T.C.planoFondo); for (let x = x0 + 2; x < x1; x += paso) R.linea(x, y0, x, y1, T.C.planoRejilla); for (let y = y0 + 2; y < y1; y += paso) R.linea(x0, y, x1, y, T.C.planoRejilla); };
const barrido = (x0, y0, x1, y1, t, vel = 0.6) => { const y = Math.round(y0 + ((t * vel) % 1) * (y1 - y0)); R.recorte([x0, y0, x1, y1]); R.linea(x0, y, x1, y, T.C.planoLinea); R.linea(x0, y - 1, x1, y - 1, T.C.planoRejilla); for (let x = x0; x <= x1; x += 3) if (hh(x, Math.floor(t * 8)) < 0.3) R.pset(x, y + 1, T.C.planoBrillo); R.recorte(null); };
// camello que anda (mira a dir), x centro, s suelo
const camello = (x, s, t, dir = -1, anda = true) => { const D = (dx) => Math.round(x + dx * dir); const ph = anda ? Math.sin(t * 7) : 0; const [cM, cS, cL] = H('#c89a5a', '#9a7040', '#e4c088');
  for (const [dx, f] of [[-7, 1], [-4, -1], [5, 1], [8, -1]]) { const a = Math.round(ph * f * 2); R.linea(D(dx), s - 12, D(dx) + a, s, K); R.linea(D(dx) - dir, s - 12, D(dx) + a - dir, s - 1, f > 0 ? cS : cM); }
  R.disco(D(0), s - 15, 8.5, K); R.disco(D(-1), s - 21, 5.5, K); R.disco(D(0), s - 15, 7.5, cM); R.disco(D(-1), s - 21, 4.5, cM); R.disco(D(-2), s - 23, 2, cL); R.rect(Math.min(D(-6), D(6)), s - 10, Math.max(D(-6), D(6)), s - 9, cS);
  for (let i = 0; i <= 8; i++) { const nx = D(7 + i * 0.7), ny = s - 16 - i; R.rect(nx - 2, ny - 1, nx + 2, ny + 1, K); } for (let i = 0; i <= 8; i++) { const nx = D(7 + i * 0.7), ny = s - 16 - i; R.rect(nx - 1, ny, nx + 1, ny, cM); }
  R.rect(Math.min(D(12), D(18)), s - 28, Math.max(D(12), D(18)), s - 24, K); R.rect(Math.min(D(13), D(17)), s - 27, Math.max(D(13), D(17)), s - 25, cM); R.pset(D(15), s - 27, K); R.pset(D(-9), s - 14, K); R.pset(D(-10), s - 12, K);
  R.rect(Math.min(D(-4), D(3)), s - 27, Math.max(D(-4), D(3)), s - 26, hex('#c83a3a')); R.rect(Math.min(D(-3), D(2)), s - 25, Math.max(D(-3), D(2)), s - 25, hex('#e8c040')); };
'''

E['gz-hawass'] = ('Hawass', '''// GZ-HAWASS (frase 20), 2025. Cuatro planos:
// 1. (LOCAL, estilo real) la esquina de Kefrén de cerca: las hiladas de sillares, la arena, la cuerda; Hawass (sombrero de ala
//    ancha, camisa vaquera) llega andando, se para y en «no scientific basis» niega con el dedo (bocadillo con la X); un
//    camellero pasa con su camello por la base, turistas hacen fotos, un guarda;  corta en «that nobody»;
// 2. (LOCAL) su mesa: el libro de permisos con los sellos verdes de otros equipos y la casilla vacía de Kefrén, que el dedo
//    golpea en «permission»; a la derecha, la maqueta de la pirámide sobre su bloque de roca con estratos: los nudillos
//    llaman en «solid bedrock» (toc, toc: maciza);  corta en el silencio antes de «And the announcement»;
// 3. (LOCAL) un expositor de revistas: la bibliotecaria empuja su carrito, busca y en «never published» encuentra el hueco
//    vacío (sale un «?»); en «journal» se encoge de hombros;  corta en «it was presented»;
// 4. (B italia/prensa, 2.ª vez) la rueda de prensa con el plano azul en la pantalla: hablan, flashes en «press conference»
//    y una periodista lo graba con el móvil en «videos».''', LIB + r'''
const a = (f) => en('hawass', f);
const P2 = a(0.337), P3 = a(0.651), P4 = a(0.840);
const HARSH = a(0.193), NO = a(0.267), PERM = a(0.423), KAF = a(0.482), SOLID = a(0.599), BED = a(0.622), NEVER = a(0.733), JOUR = a(0.800), CONF = a(0.908), VID = a(0.965);

// ── 1 · la esquina de Kefrén ──
const AX = 118, AY = -150, CX = 226, CY = 132, RBX = 340, RBY = 114;
const xArista = (y) => CX + (y - CY) * (AX - CX) / (AY - CY);
const xLejos = (y) => RBX + (y - RBY) * (AX - RBX) / (AY - RBY);
const baseIzq = (x) => CY - (CX - x) * 0.04, baseDer = (x) => CY + (x - CX) * (RBY - CY) / (RBX - CX);
const cieloK = capa(() => { grad(0, 0, 319, 118, H('#3a78cc', '#5292dc', '#74ace6', '#9cc6ee', '#c4dcec', '#e8e0c8'));
  // la bruma de El Cairo y una pirámide lejana en el horizonte
  for (let x = 236; x < 320; x++) { const h = 3 + Math.round(2 * Math.sin(x * 0.2) + hh(x, 1) * 2); R.rect(x, 113 - h, x, 113, hex(hh(x, 2) < 0.5 ? '#c8bca8' : '#b4b0b4')); }
  R.poligono([[288, 113], [301, 98], [314, 113]], hex('#d4c4a4')); R.poligono([[301, 98], [314, 113], [304, 113]], hex('#bca888')); });
const piedraK = capaT(() => {
  const ch = 8, lit = H('#a8804e', '#c89c64', '#dcb47a', '#ecca92', '#f6dcaa'), sh = H('#7a5a36', '#8e6a42', '#a47c50', '#b48c5c');
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) {
    const xa = xArista(y);
    if (x <= xa) { const b = baseIzq(x); if (y > b) continue; const k = Math.floor((b - y) / ch), jy = (b - y) % ch, xc = CX + (k * ch) * (AX - CX) / (AY - CY); if (x > xc + 1) continue;
      const off = hh(k, 3) * 20, i = Math.floor((x + off) / (14 + hh(k, 7) * 10)), v = hh(i, k, 1);
      let c = jy >= ch - 1 ? lit[4] : jy >= ch - 2 ? lit[3] : jy < 2 ? lit[0] : v < 0.25 ? lit[1] : lit[2];
      const jx = (x + off) % (14 + hh(k, 7) * 10); if (jx < 1 && jy < ch - 1) c = sh[0]; else if (jx < 2 && jy < ch - 2) c = lit[3];
      const n = hh(x, y, 5); if (n < 0.05) c = lit[0]; else if (n > 0.97) c = lit[4]; if (v > 0.93 && jy > 1 && jy < ch - 2) c = sh[1];
      R.pset(x, y, c);
    } else if (x <= xLejos(y)) { const b = baseDer(x); if (y > b) continue; const k = Math.floor((b - y) / ch), jy = (b - y) % ch;
      const i = Math.floor((x + hh(k, 4) * 12) / 11), v = hh(i, k, 2); let c = jy >= ch - 1 ? sh[3] : jy < 2 ? sh[0] : v < 0.3 ? sh[1] : sh[2];
      if ((x + hh(k, 4) * 12) % 11 < 1) c = sh[0]; if (hh(x, y, 6) < 0.05) c = sh[0]; R.pset(x, y, c); }
  }
  // grietas y bloques que faltan
  for (let g = 0; g < 10; g++) { let x = 10 + Math.floor(hh(g, 1, 3) * 200), y = 20 + Math.floor(hh(1, g, 3) * 90); for (let s = 0; s < 10; s++) { if (x < xArista(y)) R.pset(x, y, hex('#7a5a36')); x += hh(s, g) < 0.5 ? 1 : -1; y++; } }
  for (const [x, y] of [[40, 66], [128, 92], [74, 34], [196, 52]]) { R.rect(x, y, x + 9, y + 5, hex('#6a4a2a')); R.rect(x, y, x + 9, y, hex('#4a3420')); R.rect(x + 1, y + 4, x + 8, y + 5, hex('#8a6a42')); }
});
const arenaK = capaT(() => { const ar = H('#a8844e', '#c8a46a', '#e6c486', '#f4daa2');
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const b = x <= CX ? baseIzq(x) : baseDer(x); if (y <= b) continue;
    const v = Math.sin(x * 0.12 + y * 0.9 + Math.sin(x * 0.05) * 2), n = hh(x, y, 7); let c = v > 0.82 ? ar[3] : v < -0.85 ? ar[1] : ar[2]; if (n < 0.04) c = ar[0]; if (n > 0.985) c = ar[3]; if (y < b + 3) c = ar[1]; R.pset(x, y, c); }
  // cascotes y sillares caídos al pie
  for (const [x, y, w] of [[176, 128, 16], [196, 133, 12], [150, 128, 10], [252, 126, 14], [24, 132, 9]]) { R.rect(x, y - 7, x + w, y, K); R.rect(x + 1, y - 6, x + w - 1, y - 1, hex('#d0aa72')); R.rect(x + 1, y - 6, x + w - 1, y - 6, hex('#ecca92')); R.rect(x + 1, y - 1, x + w - 1, y - 1, hex('#9a7448')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 2, 9) * 318), y = 136 + Math.floor(hh(2, k, 9) * 42); R.pset(x, y, hex('#9a7448')); R.pset(x + 1, y, hex('#f4daa2')); }
  // la sombra de la pirámide en la arena, a la derecha de la arista
  for (let y = 116; y < 150; y++) for (let x = 226; x < 320; x++) { const b = baseDer(x); if (y <= b) continue; if (x - 226 < (y - 116) * 2.6 && hh(x, y, 8) < 0.8) R.pset(x, y, hex('#c8a46a')); }
  // la garita del guarda con su toldo de rayas, un banco, una papelera y una señal (pictograma de cámara)
  R.rect(14, 104, 52, 140, K); R.rect(15, 105, 51, 139, hex('#e8dcc0')); for (let x = 15; x < 52; x += 6) R.rect(x, 105, x + 2, 139, hex('#d8ccb0'));
  R.rect(22, 112, 44, 124, K); R.rect(23, 113, 43, 123, hex('#5a7a9a')); R.rect(23, 113, 43, 114, hex('#9cc6ee')); R.rect(30, 126, 38, 140, hex('#6a4024'));
  for (let x = 10; x < 57; x++) R.rect(x, 98 + ((x >> 2) % 2), x, 104, Math.floor((x - 10) / 6) % 2 ? hex('#c83a3a') : hex('#f4f0e6')); R.rect(10, 104, 56, 105, K);
  R.rect(60, 136, 84, 138, K); R.rect(61, 136, 83, 137, hex('#8a5a34')); R.rect(62, 139, 63, 143, K); R.rect(81, 139, 82, 143, K);
  R.rect(104, 132, 112, 144, K); R.rect(105, 133, 111, 143, hex('#3a6a3a')); R.rect(105, 133, 111, 134, hex('#5a8a5a'));
  R.rect(92, 112, 93, 140, K); R.rect(82, 104, 104, 116, K); R.rect(83, 105, 103, 115, hex('#2a5a9a')); R.rect(88, 108, 97, 113, T.C.blanco); R.disco(92, 110, 2, hex('#2a5a9a')); R.rect(90, 107, 94, 107, T.C.blanco);
  // huellas por la pista
  for (let k = 0; k < 18; k++) { const x = 8 + k * 17, y = 160 + (k % 2) * 3; R.rect(x, y, x + 2, y + 1, hex('#c49c60')); }
  // postes y cuerda de la valla (delante va en el plano)
});
const valla = () => { for (const x of [6, 88, 170, 252]) { R.rect(x - 1, 158, x + 2, 178, K); R.rect(x, 159, x + 1, 177, hex('#7a6a5a')); R.pset(x, 159, hex('#b0a090')); }
  for (const [x0, x1] of [[6, 88], [88, 170], [170, 252], [252, 334]]) for (let x = x0 + 2; x < x1; x++) { const u = (x - x0) / (x1 - x0), y = Math.round(162 + Math.sin(u * Math.PI) * 4); R.pset(x, y, hex('#a88a5a')); R.pset(x, y - 1, hex('#e8d8b0')); } };
const p1 = (t) => {
  cieloK();
  R.recorte([200, 48, 319, 112]); nube(((290 + t * 2) % 150) + 200, 66, 24, H('#b8c8de', '#e6eef8', '#ffffff')); nube(((250 + t * 4) % 160) + 190, 92, 14, H('#c8d4e4', '#eef2f8', '#ffffff')); nube(((200 + t * 1.2) % 170) + 190, 102, 34, H('#c4cad8', '#dce4f0', '#f4f8fc')); R.recorte(null);
  R.recorte([200, 0, 276, 46]); nube(((t * 1.5) % 120) + 180, 22, 18, H('#b8c8de', '#e6eef8', '#ffffff')); R.recorte(null);
  pajaro(Math.round(310 - (t * 9) % 90), 56 + Math.round(Math.sin(t) * 3), t, 1); pajaro(Math.round(296 - (t * 9) % 90), 62, t, 2); pajaro(Math.round(320 - (t * 7) % 110), 78, t, 3);
  piedraK(); arenaK();
  // el camellero con su camello por la base, de derecha a izquierda
  const cu = tramo(t, 0, P2), cx = Math.round(lerp(300, 196, cu)); camello(cx + 34, 136, t, -1, true); R.linea(cx + 6, 120, cx + 18, 112, hex('#6a4024')); R.actor(EL.camellero, cx - 6, 137, t, { dir: -1, anda: true });
  // el guarda que pasea junto a los cascotes
  const gx = Math.round(160 + Math.sin(t * 0.6) * 16); R.actor(EL.guardia, gx, 145, t, { dir: Math.cos(t * 0.6) > 0 ? 1 : -1, anda: true });
  // turistas: uno hace fotos (flash), otro señala la cima
  const ft = R.actor(EL.turista1, 262, 152, t, { dir: -1, sostiene: true }); R.rect(ft.mano[0] - 3, ft.mano[1] - 3, ft.mano[0] + 1, ft.mano[1], K); R.pset(ft.mano[0] - 2, ft.mano[1] - 2, hex('#5a6a8a'));
  if (Math.sin(t * 1.7) > 0.96) for (let r = 1; r < 4; r++) { R.pset(ft.mano[0] - 4 - r, ft.mano[1] - 2, T.C.blanco); R.pset(ft.mano[0] - 4, ft.mano[1] - 2 - r, T.C.blanco); R.pset(ft.mano[0] - 4, ft.mano[1] - 2 + r, T.C.blanco); }
  R.actor(EL.turista2, 284, 156, t, { dir: -1, dedo: t > 1.5 && t < 4.5, sonrisa: true });
  // Hawass llega, se para y niega con el dedo
  const u = tramo(t, 0.2, 3.4), hx = Math.round(lerp(-18, 112, u));
  const nieg = t > NO && t < P2 - 0.1;
  R.actor(EL.hawass, hx, 166, t, { dir: 1, anda: u > 0 && u < 1, habla: t > HARSH + 0.6 && Math.sin(t * 9) > 0, dedo: nieg });
  if (nieg) { const w = Math.sin(t * 14) > 0 ? 1 : -1; R.pset(hx + 20 + w * 2, 128, K); R.pset(hx + 21 + w * 2, 127, K); R.pset(hx + 18 - w, 127, K); }
  if (t > NO + 0.1) { const e = tramo(t, NO + 0.1, NO + 0.35); R.bocadillo(hx + 26, Math.round(128 - e * 6), { icono: 'X' }); }
  valla();
  R.recorte([0, 120, 319, 179]); for (let k = 0; k < 12; k++) { const x = Math.round((k * 37 + t * (20 + k * 3)) % 340) - 10, y = 140 + (k * 13) % 36; R.pset(x, y, hex('#f4daa2')); R.pset(x - 1, y, hex('#e6c486')); } R.recorte(null);
};

// ── 2 · la mesa: el libro de permisos y la maqueta sobre su roca ──
const mesaH = capa(() => {
  yeso(0, 0, 319, 60, H('#cdbf9e', '#e2d6b8', '#f0e8d0'), 1);
  R.rect(0, 58, 319, 63, K); madera(0, 59, 319, 63, H('#3a2414', '#6a4428', '#8a5a34', '#a87444'), 5);
  // la foto enmarcada de las pirámides y el mapa de la meseta
  cuadro(24, 16, 84, 52); grad(28, 20, 80, 36, H('#5292dc', '#9cc6ee', '#e8e0c8')); R.rect(28, 37, 80, 48, hex('#e6c486'));
  R.poligono([[34, 44], [46, 26], [58, 44]], hex('#dcb47a')); R.poligono([[46, 26], [58, 44], [50, 44]], hex('#b48c5c')); R.poligono([[54, 46], [64, 30], [76, 46]], hex('#ecd09a')); R.poligono([[64, 30], [76, 46], [68, 46]], hex('#c39a66'));
  cuadro(100, 18, 170, 54, H('#2a2a30', '#4a4a54', '#7a7a84')); R.rect(104, 22, 166, 50, hex('#ecdcb4')); for (let y = 22; y < 51; y += 4) for (let x = 104; x < 167; x += 4) R.pset(x, y, hex('#d0bc94'));
  R.linea(160, 22, 152, 50, hex('#3a7ab0')); R.linea(161, 22, 153, 50, hex('#5a9ad0')); for (const [x, y, s] of [[118, 30, 5], [128, 38, 6], [140, 44, 4]]) { R.poligono([[x - s, y + s], [x, y - s], [x + s, y + s]], hex('#c89a5a')); R.linea(x, y - s, x + s, y + s, hex('#8a6a3e')); }
  R.rect(184, 22, 200, 50, hex('#3a2414')); R.rect(186, 24, 198, 48, hex('#2a5a3a')); R.rect(188, 26, 196, 28, hex('#e8c040'));   // un tablón con un diploma sin letras
  // la mesa
  madera(0, 64, 319, 179, H('#4a2c18', '#6a4024', '#7e4e2c', '#94603a'), 9);
  for (let y = 64; y < 70; y++) R.rect(0, y, 319, y, R.tone(H('#2a180c', '#4a2c18'), (y - 64) / 3, 0, y));
  // la luz del flexo en la mesa
  for (let y = 96; y < 180; y++) for (let x = 120; x < 300; x++) { const d = Math.hypot((x - 206) / 90, (y - 136) / 46); if (d < 1 && hh(x, y, 3) > d * 0.9 + 0.05) { const c = R.pget(x, y); R.pset(x, y, ((c & 0xff00ff00) | Math.min(255, (c & 255) + 18) | (Math.min(255, ((c >> 16) & 255) + 10) << 16)) >>> 0); } }
  // el vade verde y el libro de permisos abierto
  R.rect(6, 92, 168, 178, K); R.rect(7, 93, 167, 177, hex('#2a5a3a')); R.rect(7, 93, 167, 93, hex('#4a7a5a'));
  R.rect(12, 98, 162, 176, K); R.rect(13, 99, 86, 175, hex('#f2ead6')); R.rect(88, 99, 161, 175, hex('#f6efdc')); R.rect(86, 99, 88, 175, hex('#c8b894'));
  R.rect(13, 99, 86, 100, hex('#ffffff')); R.rect(13, 174, 161, 175, hex('#d8cca8'));
  for (let k = 0; k < 6; k++) for (const x0 of [16, 91]) { const y = 106 + k * 11; R.linea(x0 + 16, y + 8, x0 + 66, y + 8, hex('#b8a888')); for (let i = 0; i < 5; i++) R.rect(x0 + 18 + i * 9, y + 4, x0 + 23 + i * 9, y + 5, hex('#8a8a96'));
    if (x0 === 91 && k === 5) continue;
    R.disco(x0 + 7, y + 4, 4.5, hex('#3a8a4a')); R.disco(x0 + 7, y + 4, 3.2, hex('#f2ead6')); R.disco(x0 + 7, y + 4, 2, hex('#3a8a4a')); R.pset(x0 + 7, y + 4, hex('#f2ead6')); }
  // la fila de Kefrén: la casilla vacía y la pirámide con su remate
  R.poligono([[110, 171], [118, 157], [126, 171]], K); R.poligono([[112, 170], [118, 159], [124, 170]], hex('#c89a5a')); R.poligono([[118, 159], [124, 170], [120, 170]], hex('#9a7040')); R.poligono([[116, 162], [118, 159], [120, 162]], hex('#f4e6c4'));
  // pluma, vaso de té, tampón y placa
  R.linea(150, 160, 176, 146, K); R.linea(150, 161, 176, 147, hex('#2a2a36')); R.pset(176, 146, hex('#e8c040'));
  R.rect(172, 98, 186, 118, K); R.rect(173, 99, 185, 117, hex('#c8582a')); R.rect(173, 99, 185, 103, hex('#e8a87a')); R.rect(174, 100, 176, 116, hex('#f0c8a0')); R.rect(171, 118, 187, 120, hex('#c8a040'));
  R.rect(110, 70, 160, 86, K); R.rect(111, 71, 159, 85, hex('#c8a040')); R.rect(111, 71, 159, 72, hex('#f0d880')); R.rect(114, 75, 156, 81, hex('#a87a20'));
  // el flexo
  R.rect(176, 88, 196, 92, K); R.rect(177, 89, 195, 91, hex('#2a5a3a')); R.linea(186, 88, 196, 70, K); R.linea(187, 88, 197, 70, hex('#2a5a3a')); R.poligono([[190, 72], [206, 64], [210, 76]], K); R.poligono([[192, 72], [205, 66], [208, 75]], hex('#2a5a3a'));
  // la maqueta: el bloque de roca (de frente con estratos, el costado en sombra, arriba la arena) y Kefrén encima
  const est = H('#d8b880', '#c49c64', '#b08a58', '#9a7a5a', '#8a7a6a', '#6a5a4a');
  for (let y = 112; y <= 156; y++) { const e = est[Math.min(5, Math.floor((y - 112) / 8))]; for (let x = 206; x <= 284; x++) { let c = e; const n = hh(x, y, 11); if (n < 0.08) c = est[Math.min(5, Math.floor((y - 112) / 8) + 1)]; if (n > 0.97) c = est[0]; if (((y - 112) % 8) === 0) c = est[5]; R.pset(x, y, c); } }
  for (let k = 0; k < 9; k++) { const x = 212 + Math.floor(hh(k, 3) * 66), y = 118 + Math.floor(hh(3, k) * 34); R.disco(x, y, 1.2, hex('#ecdcb4')); R.pset(x, y, hex('#b08a58')); }   // fósiles (numulites)
  for (let y = 112; y <= 156; y++) { const d = Math.round((y - 112) * 0) ; for (let x = 285; x <= 300 - d; x++) { const yy = y - (x - 284) * 0.6; R.pset(x, Math.round(yy), est[Math.min(5, Math.floor((y - 112) / 8) + 1)]); } }
  R.poligono([[206, 112], [222, 102], [300, 102], [284, 112]], hex('#e6c486')); for (let k = 0; k < 30; k++) R.pset(222 + Math.floor(hh(k, 5) * 70), 103 + Math.floor(hh(5, k) * 8), hex('#c8a46a'));
  R.linea(206, 112, 284, 112, K); R.linea(206, 112, 206, 156, K); R.linea(284, 112, 284, 156, K); R.linea(206, 156, 284, 156, K); R.linea(284, 112, 300, 102, K); R.linea(284, 156, 300, 146, K); R.linea(300, 102, 300, 146, K); R.linea(206, 112, 222, 102, K); R.linea(222, 102, 300, 102, K);
  R.rect(204, 157, 302, 160, hex('#3a2414'));
  R.poligono([[226, 108], [254, 62], [270, 104]], hex('#dcb47a')); R.poligono([[254, 62], [270, 104], [282, 100]], hex('#ac8452')); R.poligono([[248, 72], [254, 62], [260, 72]], hex('#f4e6c4'));
  for (let y = 70; y < 106; y += 4) { const xl = 254 - (y - 62) * 28 / 46, xr = 254 + (y - 62) * 16 / 42; R.linea(Math.round(xl), y, Math.round(Math.min(xr, 270)), y, hex('#c39a66')); }
  R.linea(226, 108, 254, 62, K); R.linea(254, 62, 282, 100, K); R.linea(226, 108, 270, 104, K); R.linea(270, 104, 282, 100, K);
});
const p2 = (t) => {
  mesaH();
  // el vapor del té
  for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k * 0.33) % 1, x = Math.round(179 + Math.sin(t * 3 + k * 2) * 2), y = Math.round(96 - ph * 22); if (ph < 0.8) R.pset(x, y, hex('#f4f0e8')); }
  // la casilla vacía de Kefrén: parpadea en rojo desde «permission»
  const on = t > PERM - 0.2 && Math.floor(t * 4) % 2 === 0, cc = on ? hex('#e8303a') : hex('#8a8a96');
  for (let i = -6; i <= 6; i += 2) for (const d of [0, 1]) { R.pset(98 + i, 158 + d, cc); R.pset(98 + i, 172 - d, cc); R.pset(91 + d, 165 + i, cc); R.pset(105 - d, 165 + i, cc); } if (on) R.disco(98, 165, 3, hex('#f8c0c0'));
  // el dedo que golpea la casilla (dos veces)
  const toque = (t0) => Math.max(0, 1 - Math.abs(t - t0) / 0.12);
  const dy = Math.round(-6 + (toque(PERM) + toque(PERM + 0.35) + toque(KAF)) * 5), en1 = tramo(t, P2 + 0.3, PERM - 0.3);
  if (en1 > 0) T.brazo(R, 70, 204, 82, Math.round(lerp(198, 174 + dy, en1)), '#5a7aa8', 1);
  // los nudillos que llaman a la roca: maciza
  const k1 = Math.max(0, 1 - Math.abs(t - SOLID) / 0.1), k2 = Math.max(0, 1 - Math.abs(t - BED) / 0.1), k3 = Math.max(0, 1 - Math.abs(t - BED - 0.3) / 0.1), en2 = tramo(t, SOLID - 1.2, SOLID - 0.4);
  if (en2 > 0) T.brazo(R, 338, 182, Math.round(lerp(340, 306 - (k1 + k2 + k3) * 4, en2)), Math.round(lerp(170, 140, en2)), '#5a7aa8', -1, { codo: [326, 162] });
  for (const [k0, t0] of [[k1, SOLID], [k2, BED], [k3, BED + 0.3]]) if (t > t0 && t < t0 + 0.45) { const r = Math.round((t - t0) * 30); for (let i = -3; i <= 3; i++) { R.pset(301 - r, 132 + i * 3, hex('#fff0b0')); } R.pset(298 - r, 124, T.C.blanco); R.pset(298 - r, 140, T.C.blanco); }
};

// ── 3 · el expositor de revistas con un hueco ──
const COLS = H('#c83a3a', '#2a5a9a', '#3a8a4a', '#e8a030', '#6a3a8a', '#2a8a8a', '#c85a8a', '#4a4a5a');
const expo = capa(() => {
  yeso(0, 0, 319, 179, H('#b8a080', '#cdb896', '#dccaa8'), 4);
  R.rect(0, 0, 319, 15, hex('#cdb896'));
  // el expositor de madera con tres baldas inclinadas
  R.rect(10, 22, 274, 150, K); madera(11, 23, 273, 149, H('#4a2c18', '#6a4024', '#7e4e2c', '#94603a'), 8);
  for (let f = 0; f < 3; f++) { const y0 = 28 + f * 40; for (let i = 0; i < 10; i++) { const x0 = 16 + i * 25; if (f === 1 && i === 6) { R.rect(x0, y0, x0 + 20, y0 + 30, hex('#2a180c')); R.rect(x0 + 8, y0 + 2, x0 + 12, y0 + 4, hex('#a8a8b4')); continue; }
      const c = COLS[Math.floor(hh(i, f, 2) * COLS.length)]; R.rect(x0, y0, x0 + 20, y0 + 30, K); R.rect(x0 + 1, y0 + 1, x0 + 19, y0 + 29, hex('#f4f0e6')); R.rect(x0 + 1, y0 + 1, x0 + 19, y0 + 6, c);
      const k = Math.floor(hh(f, i, 3) * 5), ic = H('#5a7aa8', '#3a8a4a', '#c8582a', '#6a3a8a', '#2a8a8a')[k], cx = x0 + 10, cy = y0 + 16;
      if (k === 0) { R.disco(cx, cy, 5, ic); R.disco(cx - 1, cy - 1, 2, hex('#c8e8f8')); } else if (k === 1) { for (let j = -6; j <= 6; j++) { R.pset(cx + Math.round(Math.sin(j * 0.6) * 4), cy + j, ic); R.pset(cx - Math.round(Math.sin(j * 0.6) * 4), cy + j, hex('#c8582a')); } }
      else if (k === 2) { R.poligono([[cx - 6, cy + 5], [cx, cy - 6], [cx + 6, cy + 5]], ic); } else if (k === 3) { R.rect(cx - 6, cy - 4, cx + 6, cy + 5, ic); for (let j = -5; j <= 5; j += 2) R.rect(cx + j, cy + 5 - Math.round(hh(j, i) * 8), cx + j, cy + 5, hex('#f4f0e6')); } else { R.disco(cx, cy, 2, ic); for (let a2 = 0; a2 < 6.28; a2 += 0.4) R.pset(Math.round(cx + Math.cos(a2) * 6), Math.round(cy + Math.sin(a2) * 3), ic); }
      for (let j = 0; j < 3; j++) R.rect(x0 + 3, y0 + 24 + j * 2, x0 + 17 - j * 4, y0 + 24 + j * 2, hex('#a8a8b4')); R.rect(x0 + 1, y0 + 29, x0 + 19, y0 + 29, hex('#c8c0b0')); }
    R.rect(12, y0 + 31, 272, y0 + 34, K); R.rect(12, y0 + 31, 272, y0 + 32, hex('#a87444')); R.rect(12, y0 + 33, 272, y0 + 34, hex('#3a2414')); }
  // la columna y la planta de la derecha, el suelo de baldosas
  R.rect(280, 0, 319, 179, hex('#d8c8a4')); yeso(282, 46, 317, 150, H('#c0aa86', '#d6c4a0', '#e4d6b4'), 5); R.rect(280, 0, 281, 179, hex('#b8a080'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const i = Math.floor((x + (Math.floor(y / 10) % 2) * 10) / 20), j = Math.floor(y / 10); R.pset(x, y, ((x + (j % 2) * 10) % 20 === 0 || y % 10 === 0) ? hex('#8a6a4a') : hh(i, j, 3) < 0.5 ? hex('#c89a6a') : hex('#b88a5a')); }
  R.rect(286, 150, 312, 176, K); R.rect(287, 151, 311, 175, hex('#a8582a')); R.rect(287, 151, 311, 153, hex('#c8784a'));
});
const p3 = (t) => {
  expo();
  // las hojas de la planta que se mecen
  for (let k = 0; k < 7; k++) { const a2 = -1.2 + k * 0.4 + Math.sin(t * 1.5 + k) * 0.08, L = 22 + (k % 3) * 6; R.linea(299, 150, Math.round(299 + Math.cos(a2 - 1.57) * L), Math.round(150 + Math.sin(a2 - 1.57) * L), hex('#3a7a3a')); R.linea(300, 150, Math.round(300 + Math.cos(a2 - 1.57) * L), Math.round(150 + Math.sin(a2 - 1.57) * L), hex('#5aa85a')); }
  // la bibliotecaria con su carrito: busca y encuentra el hueco
  const u = tramo(t, P3 + 0.1, NEVER - 0.1), bx = Math.round(lerp(10, 158, u));
  const mira = t > NEVER - 0.2, hombros = t > JOUR + 0.15;
  R.actor(EL.bibliotecaria, bx, 168, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: mira && !hombros, brazos: hombros });
  const cx0 = bx - 34; R.rect(cx0, 146, cx0 + 28, 160, K); R.rect(cx0 + 1, 147, cx0 + 27, 159, hex('#6a4024')); R.rect(cx0 + 1, 147, cx0 + 27, 148, hex('#94603a'));
  for (let i = 0; i < 6; i++) { const c = COLS[i]; R.rect(cx0 + 2 + i * 4, 138 + (i % 2) * 2, cx0 + 5 + i * 4, 146, K); R.rect(cx0 + 3 + i * 4, 139 + (i % 2) * 2, cx0 + 4 + i * 4, 146, c); }
  for (const dx of [4, 24]) { R.disco(cx0 + dx, 163, 3, K); R.disco(cx0 + dx, 163, 1.5, hex('#8a8a96')); R.pset(cx0 + dx + Math.round(Math.cos(t * 8)), 163 + Math.round(Math.sin(t * 8)), K); }
  R.linea(cx0 + 28, 148, cx0 + 33, 142, K);
  // el «?» sobre el hueco
  if (t > NEVER) { const e = tramo(t, NEVER, NEVER + 0.3); R.icono('?', 170, Math.round(76 - e * 6), T.C.blanco, K, 3); }
  // un lector que pasa una página al fondo a la derecha (sentado en la columna)
};

// ── 4 · la rueda de prensa (2.ª vez): pantalla con el plano azul, flashes y vídeo ──
const p4 = (t) => {
  const o = { pantalla: 'plano', habla: t < CONF ? 0 : 1, flashes: t > CONF - 0.2 };
  T.italia(R, t, o);
  R.actor(EL.malanga, 113, 126, t, { dir: 1, habla: t < CONF && Math.sin(t * 8) > 0, dedo: t > P4 + 0.6 && t < CONF });
  R.actor(EL.biondi, 153, 126, t, { dir: -1, habla: t > CONF && Math.sin(t * 8) > 0 });
  R.actor(EL.mei, 193, 126, t, { dir: -1, sonrisa: true });
  const ph = R.actor(EL.periodista2025, 150, 166, t, { dir: 1, sostiene: t > VID - 0.5 ? [166, 136] : true });
  if (t > VID - 0.5) { const [mx, my] = ph.mano; R.rect(mx - 2, my - 9, mx + 3, my, K); R.rect(mx - 1, my - 8, mx + 2, my - 1, hex('#5ab8e8')); if (Math.floor(t * 3) % 2) R.pset(mx + 1, my - 7, hex('#e8303a')); }
  const pe = R.actor(EL.periodista1, 18, 160, t, { dir: 1, sostiene: true, habla: t > CONF && Math.sin(t * 6) > 0.3 }); R.rect(pe.mano[0] - 1, pe.mano[1] - 8, pe.mano[0] + 6, pe.mano[1], K); R.rect(pe.mano[0], pe.mano[1] - 7, pe.mano[0] + 5, pe.mano[1] - 1, hex('#f6f2e8')); R.rect(pe.mano[0] + 1, pe.mano[1] - 5, pe.mano[0] + 4, pe.mano[1] - 5, hex('#8a8a96'));
  T.italiaDelante(R, t, o);
  // los pilotos de las cámaras graban
  if (t > VID - 0.3 && Math.floor(t * 4) % 2) { R.disco(44, 132, 1.5, hex('#ff3040')); R.disco(286, 132, 1.5, hex('#ff3040')); }
};
const efectos = [[NO + 0.1, 'pop'], [PERM, 'toc'], [PERM + 0.35, 'toc'], [SOLID, 'toc'], [BED, 'toc'], [NEVER, 'pop'], [CONF, 'flash'], [VID, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2025 });
''')

E['gz-retirada'] = ('La retirada', '''// GZ-RETIRADA (frase 21), agosto de 2026, cartela «2026» y golpe «retirada» (cae el sello). Cuatro planos:
// 1. (LOCAL) la revista de 2022 de cerca sobre la mesa del editor (la portada con el plano azul, «2022»): el sello rojo cae
//    con el golpe (1,6 s) y deja su marca; saltan los papeles y tiembla el café («another blow»);  corta en «journal»;
// 2. (F hoy/redaccion) la redacción: el editor enseña la revista sellada a la editora y en «retracted» la mete en la
//    bandeja roja de los retirados; al fondo, la redacción trabaja;  corta en «saying»;
// 3. (LOCAL) la pantalla de la sala de reuniones con las figuras del artículo (en plano azul): el puntero rojo de la
//    editora rodea los fallos en «flaws», el método en «methods», las barras tiemblan en «statistics» y en «not reliable»
//    la torre de datos se cae;  corta en «The authors»;
// 4. (LOCAL) los autores en su estudio de Italia al anochecer: niegan con la cabeza en «disagree» y en «still stand by
//    their work» vuelven a lo suyo (escribe, teclea, repasa una lámina).''', LIB + r'''
const a = (f) => en('retirada', f);
const GOLPE = 1.6, P2 = a(0.183), P3 = a(0.420), P4 = a(0.778);
const KHUFU = a(0.335), RETR = a(0.364), FLAWS = a(0.485), METH = a(0.537), STATS = a(0.574), NOTREL = a(0.711), DIS = a(0.808), STILL = a(0.918);

// ── 1 · la portada de cerca y el sello ──
const mesaR = capa(() => {
  madera(0, 0, 319, 179, H('#8a5a30', '#b07a44', '#c08a50', '#d4a066'), 12);
  // papeles, gafas, lápices, revistas apiladas, tampón
  for (const [x, y, w, h2, r] of [[14, 120, 62, 54, 0], [22, 112, 58, 50, 1]]) { R.rect(x + 2, y + 2, x + w + 2, y + h2 + 2, hex('#6a4024')); R.rect(x, y, x + w, y + h2, K); R.rect(x + 1, y + 1, x + w - 1, y + h2 - 1, hex(r ? '#f6f2e8' : '#e8e2d4')); for (let j = y + 6; j < y + h2 - 4; j += 4) R.rect(x + 5, j, x + w - 5 - (j * 7) % 14, j, hex('#a8a8b4')); }
  for (let i = 0; i < 4; i++) { const y = 120 + i * 13, c = H('#c83a3a', '#2a5a9a', '#3a8a4a', '#e8a030')[i]; R.rect(232, y, 304, y + 12, K); R.rect(233, y + 1, 303, y + 11, hex('#f4f0e6')); R.rect(233, y + 1, 303, y + 3, c); R.rect(236, y + 6, 290, y + 6, hex('#a8a8b4')); }
  R.rect(244, 62, 282, 84, K); R.rect(245, 63, 281, 83, hex('#3a3a46')); R.rect(248, 66, 278, 80, hex('#a8202a')); R.rect(248, 66, 278, 67, hex('#c8404a'));
  R.linea(26, 70, 70, 52, K); R.linea(26, 71, 70, 53, hex('#e8c040')); R.linea(30, 80, 76, 70, K); R.linea(30, 81, 76, 71, hex('#3a5aa8'));
  // la portada: papel, banda, «2022», la imagen en plano azul y las rayas
  R.rect(110, 26, 222, 176, hex('#6a4024')); R.rect(104, 20, 216, 170, K); R.rect(105, 21, 215, 169, hex('#f4f0e6'));
  R.rect(106, 22, 214, 42, hex('#1e4a8a')); R.rect(106, 22, 214, 23, hex('#3a6aaa')); R.disco(116, 32, 6, hex('#e8c040')); R.disco(116, 32, 4, hex('#1e4a8a')); R.disco(116, 32, 2, hex('#e8c040'));
  R.numero('2022', 168, 36, { color: hex('#f4f0e6'), sombra: false });
  for (let j = 148; j < 166; j += 4) R.rect(112, j, 208 - (j * 13) % 30, j + 1, hex('#8a8a96'));
});
const p1 = (t) => {
  mesaR();
  // la imagen de la portada en el código del plano azul, con su barrido
  planoAzul(110, 48, 210, 142, t, 7);
  const g = 0.6 + 0.4 * Math.sin(t * 3);
  R.linea(160, 58, 118, 132, T.C.planoLinea); R.linea(160, 58, 202, 132, T.C.planoLinea); R.linea(118, 132, 202, 132, T.C.planoLinea); R.linea(160, 58, 168, 132, T.C.planoRejilla);
  for (const [x, y, w] of [[146, 104, 10], [162, 92, 12], [154, 118, 8]]) { R.rect(x, y, x + w, y, T.C.planoLinea); R.rect(x, y + 4, x + w, y + 4, T.C.planoLinea); R.rect(x, y, x, y + 4, T.C.planoLinea); R.rect(x + w, y, x + w, y + 4, T.C.planoLinea); }
  for (const x of [140, 160, 180]) for (let y = 134; y < 141; y += 2) R.pset(x, y, g > 0.7 ? T.C.planoBrillo : T.C.planoLinea);
  barrido(110, 48, 210, 142, t, 0.5);
  // el sello que cae con el golpe, estampa y se va
  const baja = tramo(t, GOLPE - 0.35, GOLPE), sube = tramo(t, GOLPE + 0.3, GOLPE + 1);
  const sy = Math.round(baja < 1 ? lerp(-70, 98, baja ** 2) : lerp(98, -80, sube));
  if (t > GOLPE) { R.recorte([105, 21, 215, 169]); const mx = 160, my = 96; for (let a2 = 0; a2 < 6.3; a2 += 0.02) for (let r = 22; r <= 26; r++) { const x = Math.round(mx + Math.cos(a2) * r), y = Math.round(my + Math.sin(a2) * r * 0.9); if (hh(x, y, 3) > 0.12) R.pset(x, y, hex('#d8283a')); }
    for (let x = mx - 22; x <= mx + 22; x++) for (let y = my - 3; y <= my + 3; y++) { const yy = Math.round(y - (x - mx) * 0.12); if (hh(x, yy, 4) > 0.15) R.pset(x, yy, hex('#d8283a')); } R.recorte(null); }
  if (sy > -60) { R.rect(136, sy - 4, 184, sy + 2, K); R.rect(137, sy - 3, 183, sy + 1, hex('#c8303a')); R.rect(134, sy - 14, 186, sy - 4, K); R.rect(135, sy - 13, 185, sy - 5, hex('#a8743c')); R.rect(135, sy - 13, 185, sy - 12, hex('#d8a060'));
    R.rect(154, sy - 34, 166, sy - 14, K); R.rect(155, sy - 33, 165, sy - 15, hex('#6a4422')); R.disco(160, sy - 40, 11, K); R.disco(160, sy - 40, 10, hex('#a8743c')); R.disco(157, sy - 43, 4, hex('#d8a060')); }
  // el golpe: rayitas, papeles que saltan y el café que tiembla
  if (t > GOLPE && t < GOLPE + 0.35) for (const [dx, dy] of [[-40, -6], [40, -6], [-44, 4], [44, 4], [-36, 14], [36, 14]]) R.linea(160 + dx, 100 + dy, 160 + dx * 1.2, 100 + dy * 1.4, T.C.blanco);
  const sal = Math.max(0, Math.sin(Math.min(1, (t - GOLPE) / 0.5) * Math.PI)) * (t > GOLPE ? 1 : 0);
  for (const [x, y, k] of [[34, 126, 0], [228, 108, 1], [70, 96, 2]]) { const yy = Math.round(y - sal * (6 + k * 3)), xx = x + Math.round((t > GOLPE ? tramo(t, GOLPE, GOLPE + 0.8) : 0) * (k - 1) * 10); R.rect(xx, yy, xx + 18, yy + 12, K); R.rect(xx + 1, yy + 1, xx + 17, yy + 11, hex('#f6f2e8')); R.rect(xx + 3, yy + 4, xx + 14, yy + 4, hex('#a8a8b4')); R.rect(xx + 3, yy + 7, xx + 10, yy + 7, hex('#a8a8b4')); }
  const tz = (t > GOLPE && t < GOLPE + 0.8) ? Math.round(Math.sin(t * 40) * 1.5) : 0;
  R.disco(46 + tz, 154, 13, K); R.disco(46 + tz, 154, 12, hex('#f4f0e6')); R.disco(46 + tz, 154, 9, hex('#5a3420')); R.disco(44 + tz, 152, 3, hex('#8a5a34')); R.rect(58 + tz, 150, 64 + tz, 158, K); R.rect(59 + tz, 151, 62 + tz, 157, hex('#f4f0e6'));
  if (tz) R.anillo(46 + tz, 154, 6, hex('#8a5a34'));
  for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k * 0.33) % 1; R.pset(Math.round(46 + Math.sin(t * 2 + k * 2) * 3), Math.round(138 - ph * 26), hex('#f4f0e8')); }
  // las gafas de leer
  const gy = Math.round(150 - sal * 5); R.anillo(276, gy, 6, K); R.anillo(292, gy, 6, K); R.linea(282, gy, 286, gy, K); R.linea(270, gy - 1, 262, gy - 4, K);
};

// ── 2 · la redacción: la revista sellada a la bandeja de retirados ──
const p2 = (t) => {
  const o = { encuadre: 'redaccion', revista: false, sello: 0 };
  T.hoy(R, t, o);
  // al fondo trabajan dos de la redacción y otro cruza con papeles
  R.actor(EL.tecnica, 232, 140, t, { dir: 1, habla: Math.sin(t * 5) > 0.5 }); R.actor(EL.conserje, 262, 140, t, { dir: -1, dedo: Math.sin(t * 0.9) > 0.6 });
  // el editor enseña la revista sellada y la mete en la bandeja roja en «retracted»
  const mete = tramo(t, RETR - 0.15, RETR + 0.35), alza = t > KHUFU - 0.2 && t < RETR - 0.1 ? -4 : 0;
  const ed = R.actor(EL.editor1, 62, 170, t, { dir: 1, sostiene: mete < 1 ? [84, 140 + alza + Math.round(mete * 16)] : false, habla: t < RETR && Math.sin(t * 8) > 0 });
  R.actor(EL.editora2, 128, 170, t, { dir: -1, sorpresa: t > RETR && t < RETR + 0.8, habla: t > RETR + 0.8 && Math.sin(t * 7) > 0.3 });
  T.hoyDelante(R, t, o);
  const w = tramo(t, P2 + 0.4, RETR + 0.6), wx = Math.round(lerp(330, 286, w)); const pa = R.actor(EL.tecnico, wx, 156, t, { dir: -1, anda: w > 0 && w < 1, sostiene: true }); R.rect(pa.mano[0] - 6, pa.mano[1] - 5, pa.mano[0] + 1, pa.mano[1], K); R.rect(pa.mano[0] - 5, pa.mano[1] - 4, pa.mano[0], pa.mano[1] - 1, hex('#f6f2e8'));
  // la portada enmarcada de la pirámide recibe la banda roja de «retirado» en «retracted»
  const ba = tramo(t, RETR, RETR + 0.4); if (ba > 0) { R.recorte([179, 25, 199, 53]); const L = Math.round(ba * 40); for (let i = 0; i < L; i++) { const x = 176 + i * 0.7, y = 56 - i; R.linea(Math.round(x), Math.round(y), Math.round(x) + 9, Math.round(y), hex('#d8283a')); R.pset(Math.round(x), Math.round(y), K); R.pset(Math.round(x) + 9, Math.round(y), K); } R.recorte(null); }
  // la bandeja roja de los retirados, en la mesa
  R.rect(30, 154, 52, 162, K); R.rect(31, 155, 51, 161, hex('#a8202a')); R.rect(31, 155, 51, 156, hex('#d8404a'));
  if (mete < 1) { const [mx, my] = ed.mano; if (PIEZAS_GZ_OK) T.PIEZAS_GZ.revista(R, mx, my + 6, { sello: true }); }
  else { R.rect(34, 152, 48, 155, hex('#f4f0e6')); R.rect(34, 152, 48, 152, hex('#1e4a8a')); R.pset(41, 153, hex('#d8283a')); }
};
const PIEZAS_GZ_OK = !!(T.PIEZAS_GZ && T.PIEZAS_GZ.revista);

// ── 3 · las figuras del artículo en la pantalla y el puntero rojo ──
const salaR = capa(() => {
  ladrillo(0, 0, 268, 150, H('#c8b8a0', '#8a3a24', '#a84a2e', '#b85a3a', '#c86a48'));
  R.rect(270, 0, 319, 150, hex('#e2d6c0')); yeso(272, 50, 319, 150, H('#cec0a6', '#e2d6c0', '#eee6d6'), 7); R.rect(268, 0, 269, 150, hex('#b8a888'));
  // la pantalla grande (el contenido se pinta en cada fotograma)
  R.rect(30, 18, 258, 124, K); R.rect(31, 19, 257, 123, hex('#3a3a46')); R.rect(34, 22, 254, 120, K);
  R.rect(140, 124, 148, 132, hex('#3a3a46')); R.rect(110, 132, 178, 134, K);
  // un reloj, una planta y la mesa de reuniones con portátiles y tazas
  R.disco(290, 76, 9, K); R.disco(290, 76, 8, hex('#f4f0e6')); for (let k = 0; k < 12; k++) R.pset(Math.round(290 + Math.cos(k / 12 * 6.28) * 6), Math.round(76 + Math.sin(k / 12 * 6.28) * 6), K);
  madera(0, 150, 319, 179, H('#6a4024', '#8a5a34', '#9a6a3c', '#b07a48'), 6);
  R.rect(278, 128, 306, 150, K); R.rect(279, 129, 305, 149, hex('#3a5a7a')); R.rect(279, 129, 305, 131, hex('#5a7a9a'));
});
const p3 = (t) => {
  salaR();
  R.recorte([35, 23, 253, 119]);
  planoAzul(35, 23, 253, 119, t, 7);
  // izquierda: el método (satélite, onda, pirámide y pozos)
  R.rect(50, 32, 62, 38, T.C.planoLinea); R.rect(42, 34, 49, 36, T.C.planoRejilla); R.rect(63, 34, 70, 36, T.C.planoRejilla); R.linea(42, 34, 49, 34, T.C.planoLinea); R.linea(63, 34, 70, 34, T.C.planoLinea);
  for (let k = 0; k < 5; k++) { const y = 44 + k * 8 + Math.round(((t * 12) % 8)); if (y < 80) R.linea(56 - 4 - k, y, 56 + 4 + k, y, k % 2 ? T.C.planoLinea : T.C.planoBrillo); }
  R.linea(90, 76, 62, 112, T.C.planoLinea); R.linea(90, 76, 118, 112, T.C.planoLinea); R.linea(56, 112, 124, 112, T.C.planoLinea);
  for (const x of [80, 90, 100]) for (let y = 113; y < 119; y += 2) R.pset(x, y, T.C.planoBrillo);
  R.linea(140, 30, 140, 112, T.C.planoRejilla);
  // derecha: la estadística (puntos, barras y la torre de datos)
  R.linea(152, 112, 246, 112, T.C.planoLinea); R.linea(152, 30, 152, 112, T.C.planoLinea);
  for (let k = 0; k < 22; k++) { const x = 160 + Math.floor(hh(k, 1) * 40), y = 48 + Math.floor(hh(1, k) * 28); R.pset(x, y, T.C.planoBrillo); R.pset(x + 1, y, T.C.planoLinea); }
  const tiembla = t > STATS - 0.1 ? Math.sin(t * 18) * 2 : 0;
  for (let i = 0; i < 4; i++) { const hgt = 14 + i * 7 + Math.round(tiembla * (i % 2 ? 1 : -1)), x = 162 + i * 10; R.poligono([[x, 112 - hgt], [x + 7, 112 - hgt], [x + 7, 112], [x, 112]], T.C.planoRejilla); R.linea(x, 112 - hgt, x + 6, 112 - hgt, T.C.planoLinea); R.linea(x, 112 - hgt, x, 111, T.C.planoLinea); R.linea(x + 6, 112 - hgt, x + 6, 111, T.C.planoLinea); }
  const cae = tramo(t, NOTREL - 0.15, NOTREL + 0.9);
  for (let i = 0; i < 5; i++) { const y0 = 104 - i * 9, d = cae * (1 + i * 0.35), x = Math.min(240, Math.round(222 + Math.min(1, d) * (i - 1.5) * 9)), y = Math.round(lerp(y0, 104 - (i % 2) * 2, Math.min(1, d)) - Math.sin(Math.min(1, d) * Math.PI) * 6);
    R.poligono([[x, y], [x + 11, y], [x + 11, y + 8], [x, y + 8]], T.C.planoRejilla); R.linea(x, y, x + 10, y, T.C.planoLinea); R.linea(x, y + 7, x + 10, y + 7, T.C.planoLinea); R.linea(x, y, x, y + 7, T.C.planoLinea); R.linea(x + 10, y, x + 10, y + 7, T.C.planoLinea); }
  barrido(35, 23, 253, 119, t, 0.45);
  // las marcas rojas de la editora
  if (t > FLAWS) aroRojo(180, 62, 26, 18, tramo(t, FLAWS, FLAWS + 0.4) * 1.1);
  if (t > METH) aroRojo(56, 60, 18, 30, tramo(t, METH, METH + 0.4) * 1.1);
  if (t > STATS) aroRojo(186, 96, 30, 18, tramo(t, STATS, STATS + 0.4) * 1.1);
  if (t > NOTREL + 0.4) R.icono('?', 228, 50, hex('#e8303a'), K, 2);
  R.recorte(null);
  // la editora con el puntero láser y el editor sentado que asiente
  const ed = R.actor(EL.editora2, 8, 168, t, { dir: 1, sostiene: [26, 140], habla: Math.sin(t * 7) > 0.2 });
  const obj = t < METH - 0.1 ? [180, 62] : t < STATS - 0.1 ? [56, 60] : t < NOTREL - 0.2 ? [186, 96] : [228, 80];
  const pt = [obj[0] + Math.round(Math.sin(t * 5) * 3), obj[1] + Math.round(Math.cos(t * 4) * 2)];
  R.linea(ed.mano[0], ed.mano[1], ed.mano[0] + 4, ed.mano[1] - 2, hex('#2a2a36'));
  if (t > P3 + 0.4) { R.disco(pt[0], pt[1], 1.6, hex('#ff3040')); R.pset(pt[0], pt[1], hex('#ffd0d0')); }
  R.actor(EL.editor1, 252, 160, t, { dir: -1, salto: t > STATS && t < STATS + 0.2 ? 1 : 0 });
  R.actor(EL.conserje, 224, 160, t, { dir: -1, sorpresa: t > NOTREL && t < NOTREL + 1 });
  R.rect(200, 150, 319, 154, K); R.rect(201, 151, 319, 153, hex('#6a4024')); R.rect(201, 151, 319, 151, hex('#94603a')); R.rect(206, 154, 210, 179, hex('#4a2c18')); R.rect(300, 154, 304, 179, hex('#4a2c18'));
  R.rect(236, 142, 250, 150, K); R.rect(237, 143, 249, 149, hex('#8a8a96')); R.rect(214, 144, 220, 150, K); R.rect(215, 145, 219, 149, hex('#f4f0e6'));
  // la aguja del reloj
  R.linea(290, 76, Math.round(290 + Math.cos(t * 0.5) * 6), Math.round(76 + Math.sin(t * 0.5) * 6), K);
};

// ── 4 · los autores en su estudio de Italia, al anochecer ──
const estudioI = capa(() => {
  yeso(0, 0, 319, 160, H('#b88a4e', '#d0a464', '#e0b878'), 9);
  R.rect(0, 116, 319, 118, hex('#8a5a30')); R.rect(0, 119, 319, 160, hex('#c09058')); for (let x = 0; x < 320; x += 16) { R.rect(x, 121, x + 14, 158, hex('#b07e48')); R.rect(x + 1, 122, x + 13, 122, hex('#d0a464')); }
  libros(4, 20, 62, 158, 5, 3);
  // la ventana con contraventanas verdes (el cielo va en cada fotograma)
  R.rect(112, 18, 206, 104, K); R.rect(100, 20, 111, 102, hex('#2a5a3a')); R.rect(207, 20, 218, 102, hex('#2a5a3a'));
  for (let y = 22; y < 102; y += 4) { R.rect(101, y, 110, y, hex('#3a7a4a')); R.rect(208, y, 217, y, hex('#3a7a4a')); }
  R.rect(108, 104, 210, 108, K); R.rect(109, 105, 209, 107, hex('#e8dcc0'));
  R.rect(140, 96, 150, 104, K); R.rect(141, 97, 149, 103, hex('#a8582a')); R.disco(145, 92, 5, hex('#3a7a3a')); R.disco(143, 90, 2, hex('#e8303a'));   // un geranio en el alféizar
  // el corcho con las láminas (sus figuras en plano azul) a la altura de la mano
  R.rect(232, 74, 300, 122, K); R.rect(233, 75, 299, 121, hex('#b8844a')); for (let k = 0; k < 80; k++) R.pset(234 + Math.floor(hh(k, 2) * 64), 76 + Math.floor(hh(2, k) * 44), hex('#8a5a2a'));
  for (const [x, y] of [[238, 80], [258, 82], [278, 78], [240, 100]]) { R.rect(x, y, x + 16, y + 14, K); R.rect(x + 1, y + 1, x + 15, y + 13, T.C.planoFondo); R.linea(x + 3, y + 11, x + 8, y + 3, T.C.planoLinea); R.linea(x + 8, y + 3, x + 13, y + 11, T.C.planoLinea); R.rect(x + 6, y + 8, x + 10, y + 9, T.C.planoLinea); R.pset(x + 8, y, hex('#e8303a')); }
  R.rect(262, 100, 280, 116, K); R.rect(263, 101, 279, 115, hex('#f4f0e6')); for (let x = 264; x < 279; x++) R.pset(x, 108 + Math.round(Math.sin(x * 0.9) * 4), hex('#3a5aa8'));
  // la lámpara de pie, un cuadro pequeño y el suelo
  R.rect(306, 60, 308, 160, K); R.poligono([[296, 62], [318, 62], [312, 48], [302, 48]], hex('#e8c88a')); R.linea(296, 62, 318, 62, K); R.rect(300, 158, 314, 160, K);
  cuadro(72, 40, 94, 62); grad(76, 44, 90, 58, H('#5292dc', '#c4dcec', '#e6c486'));
  madera(0, 160, 319, 179, H('#5a3420', '#7a4a2c', '#8a5a34', '#a06a3e'), 5);
  R.rect(80, 170, 250, 179, hex('#8a2a2a')); for (let x = 82; x < 250; x += 4) R.pset(x, 172 + (x % 8 ? 2 : 4), hex('#e8c040'));   // la alfombra
});
const p4 = (t) => {
  estudioI();
  // por la ventana: el cielo del anochecer, las nubes, las golondrinas, el campanario, una cúpula y los tejados
  R.recorte([113, 19, 205, 103]);
  grad(113, 19, 205, 84, H('#2e2e6a', '#5a3c80', '#9a4c84', '#d8687a', '#f09060'));
  nube(((t * 3) % 140) + 100, 34, 20, H('#7a4a7a', '#a86a8a', '#d89a9a')); nube(((t * 5 + 70) % 140) + 100, 52, 14, H('#a85a6a', '#d88a7a', '#f0b090'));
  for (let k = 0; k < 3; k++) pajaro(Math.round(120 + ((t * (14 + k * 4) + k * 30) % 90)), 40 + k * 7 + Math.round(Math.sin(t * 2 + k) * 2), t, k, hex('#2a1a2a'));
  R.rect(178, 42, 188, 82, hex('#8a5a4a')); R.rect(178, 42, 179, 82, hex('#a87a5a')); R.poligono([[176, 42], [183, 30], [190, 42]], hex('#6a3a3a')); R.rect(181, 48, 185, 54, hex('#2a1a2a')); R.rect(181, 60, 185, 64, hex('#f0c060'));
  R.disco(134, 80, 8, hex('#8a7a8a')); R.disco(132, 77, 3, hex('#a89aa8')); R.rect(125, 80, 143, 90, hex('#b89a7a')); for (let x = 127; x < 143; x += 4) R.rect(x, 83, x + 1, 87, hex('#6a5a5a')); R.rect(133, 68, 135, 72, hex('#6a5a6a'));
  for (let x = 113; x <= 205; x++) { const h2 = 84 + ((Math.floor(x / 18) % 3) * 4); R.rect(x, h2, x, 103, ((x + Math.floor(x / 18)) % 4 === 0) ? hex('#8a4030') : hex('#b8583a')); if (((x - h2) % 6) === 0) R.pset(x, h2 + 3, hex('#e8a07a')); if ((x % 13) === 0) R.rect(x, h2 + 7, x + 2, h2 + 10, Math.sin(t + x) > -0.5 ? hex('#f0c060') : hex('#5a3a3a')); }
  R.recorte(null);
  R.rect(158, 19, 160, 103, K); R.rect(113, 60, 205, 61, K);
  R.disco(307, 64, 2, hex('#fff0b0'));
  // los tres autores: Malanga de pie con sus papeles, Biondi tras la mesa baja con el portátil, Mei ante el corcho
  const no = (k) => (t > DIS + k * 0.15 && t < DIS + 1.1 + k * 0.15 ? (Math.floor((t - DIS - k * 0.15) * 3.2) % 2 ? -1 : 1) : null);
  const vuelve = t > STILL;
  const ma = R.actor(EL.malanga, 78, 170, t, { dir: no(0) ?? 1, sostiene: [98, vuelve ? 150 + Math.round(Math.sin(t * 4)) : 152], habla: t < DIS && Math.sin(t * 6) > 0.5 });
  { const [x, y] = ma.mano; R.rect(x - 1, y - 12, x + 11, y + 1, K); R.rect(x, y - 11, x + 10, y, hex('#f6f2e8')); for (let j = y - 9; j < y - 1; j += 2) R.rect(x + 2, j, x + 8 - (j % 3), j, hex('#a8a8b4')); if (vuelve && Math.floor(t * 6) % 2) R.rect(x + 2, y - 2, x + 6, y - 2, hex('#3a5aa8')); }
  R.actor(EL.biondi, 150, 160, t, { dir: no(1) ?? 1, habla: t > DIS + 1.3 && t < STILL && Math.sin(t * 8) > 0 });
  const mei = R.actor(EL.mei, 236, 170, t, { dir: no(2) ?? (vuelve ? 1 : -1), sostiene: vuelve ? [254, 118 - Math.round(tramo(t, STILL, STILL + 0.6) * 6)] : false, sonrisa: t > STILL + 0.8 });
  if (vuelve) { const [x, y] = mei.mano; R.rect(x, y - 13, x + 14, y, K); R.rect(x + 1, y - 12, x + 13, y - 1, T.C.planoFondo); R.linea(x + 3, y - 2, x + 7, y - 10, T.C.planoLinea); R.linea(x + 7, y - 10, x + 11, y - 2, T.C.planoLinea); R.pset(x + 7, y - 13, hex('#e8303a')); }
  // la mesa baja de Biondi con el portátil, papeles y la cafetera
  R.rect(118, 148, 214, 152, K); madera(119, 149, 213, 151, H('#4a2c18', '#6a4024', '#7e4e2c', '#94603a'), 3); R.rect(122, 153, 210, 168, K); madera(123, 153, 209, 167, H('#3a2414', '#5a3420', '#6a4024', '#7e4e2c'), 5); R.rect(124, 168, 128, 172, K); R.rect(204, 168, 208, 172, K);
  if (T.PIEZAS_GZ.portatil) T.PIEZAS_GZ.portatil(R, 180, 148, { pantalla: 'piramide' });
  if (vuelve && Math.floor(t * 8) % 2) R.pset(174 + Math.floor(hh(Math.floor(t * 8), 1) * 10), 145, hex('#f4f0e6'));
  for (const [x, y] of [[124, 142]]) { R.rect(x, y, x + 20, y + 5, K); R.rect(x + 1, y + 1, x + 19, y + 4, hex('#f6f2e8')); R.rect(x + 3, y + 2, x + 14, y + 2, hex('#a8a8b4')); }
  R.rect(200, 136, 208, 148, K); R.rect(201, 137, 207, 147, hex('#a8a8b4')); R.rect(201, 137, 207, 139, hex('#d8d8e0')); R.rect(198, 134, 210, 137, K); R.rect(208, 140, 211, 143, K);
  for (let k = 0; k < 2; k++) { const ph = (t * 0.6 + k * 0.5) % 1; R.pset(Math.round(204 + Math.sin(t * 2 + k) * 2), Math.round(132 - ph * 14), hex('#f4f0e8')); }
};
const efectos = [[GOLPE, 'sello'], [GOLPE + 0.15, 'papel'], [RETR + 0.3, 'papel'], [FLAWS, 'bip'], [METH, 'bip'], [STATS, 'bip'], [NOTREL, 'avalancha'], [STILL + 0.1, 'tecleo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2026', efectos, año: 2026 });
''')

E['gz-permiso'] = ('Sin permiso aún', '''// GZ-PERMISO (frase 22), 2026. Cuatro planos:
// 1. (LOCAL) una balanza de latón ante la ventana: en «proven» cae una lupa en un platillo; en «doesn't mean» una cruz roja
//    en el otro; en «lie» sale el «≠» entre los dos (no son lo mismo); en «no proof yet» sube un «?» sobre la lupa y el
//    reloj de arena se da la vuelta;  corta en «According»;
// 2. (F hoy/redaccion/despacho) un despacho de El Cairo: el mensajero desliza la carpeta de solicitud en «asked Egypt»;
//    de la carpeta salen el carrito del radar en «measurements» y una pala en «dig»; el funcionario la deja en la bandeja;
//    corta en «So far»;
// 3. (LOCAL) la carpeta espera en su bandeja: pasan los días por la ventana (sol, luna, sol), el reloj corre, una araña
//    baja por su hilo; el sello sigue en su tampón, sin usar;  corta en «goes»;
// 4. (A giza/osiris/fondo, 2.ª vez) una linterna con una cámara baja por el pozo de verdad en «goes down», alumbra la
//    escalera y en «we'll know for sure» su luz llega al sarcófago.''', LIB + r'''
const a = (f) => en('permiso', f);
const P2 = a(0.288), P3 = a(0.562), P4 = a(0.745);
const PROVEN = a(0.109), DOESNT = a(0.127), LIE = a(0.173), NOPROOF = a(0.234), YET = a(0.254);
const ASKED = a(0.376), EGYPT = a(0.392), PERMI = a(0.424), MEAS = a(0.467), DIG = a(0.540), GRANT = a(0.672);
const DOWN = a(0.764), CAMERA = a(0.794), CORR = a(0.897), KNOW = a(0.958);

// ── 1 · la balanza ──
const salaB = capa(() => {
  madera(0, 120, 319, 179, H('#2a180c', '#3a2414', '#4a2c18', '#5a3420'), 8);
  yeso(0, 0, 319, 130, H('#3a5a4a', '#4a6a5a', '#5a7a68'), 12);
  R.rect(0, 96, 319, 130, K); madera(0, 97, 319, 130, H('#2a180c', '#4a2c18', '#5a3420', '#6a4024'), 11);
  for (let x = 10; x < 320; x += 50) { R.rect(x, 101, x + 40, 126, hex('#3a2414')); R.rect(x + 2, 103, x + 38, 124, hex('#5a3420')); R.rect(x + 2, 103, x + 38, 103, hex('#7a4a2c')); }
  libros(0, 20, 64, 96, 3, 1); libros(256, 48, 319, 96, 2, 2);
  // la ventana en arco detrás de la balanza (el cielo va en cada fotograma)
  R.rect(104, 18, 216, 96, K);
  // la mesa
  R.rect(20, 128, 300, 136, K); madera(21, 129, 299, 135, H('#4a2c18', '#6a4024', '#7e4e2c', '#a06a3e'), 7);
  madera(0, 136, 319, 179, H('#2a180c', '#3a2414', '#4a2c18', '#5a3420'), 8); R.rect(28, 136, 292, 179, K); madera(29, 137, 291, 179, H('#3a2414', '#5a3420', '#6a4024', '#7e4e2c'), 10);
  for (const x0 of [40, 120, 200]) { R.rect(x0, 146, x0 + 72, 172, hex('#2a180c')); R.rect(x0 + 2, 148, x0 + 70, 170, hex('#5a3420')); R.rect(x0 + 2, 148, x0 + 70, 148, hex('#7e4e2c')); R.disco(x0 + 36, 159, 2, hex('#c8a040')); }
  // libros en la mesa y la vela
  for (let i = 0; i < 3; i++) { const c = H('#8a2a2a', '#2a4a7a', '#3a6a3a')[i]; R.rect(34, 120 - i * 6, 72 - i * 3, 126 - i * 6, K); R.rect(35, 121 - i * 6, 71 - i * 3, 125 - i * 6, c); R.rect(35, 121 - i * 6, 71 - i * 3, 121 - i * 6, hex('#e8d8a0')); }
  R.rect(84, 112, 90, 128, K); R.rect(85, 113, 89, 127, hex('#f4ecd8')); R.rect(80, 126, 94, 128, hex('#c8a040'));
});
const p1 = (t) => {
  salaB();
  // la ventana: cielo de tarde tramado, nubes de tres tonos y pájaros
  R.recorte([105, 19, 215, 95]); grad(105, 19, 215, 95, H('#3a78cc', '#5292dc', '#74ace6', '#9cc6ee', '#c4dcec'));
  nube(((t * 3) % 160) + 90, 36, 22, H('#b8c8de', '#e6eef8', '#ffffff')); nube(((t * 6 + 80) % 160) + 90, 60, 14, H('#c8d4e4', '#eef2f8', '#ffffff')); nube(((t * 1.5 + 40) % 160) + 90, 80, 30, H('#c4cad8', '#dce4f0', '#f4f8fc'));
  for (let k = 0; k < 3; k++) pajaro(Math.round(110 + ((t * (10 + k * 3) + k * 40) % 105)), 30 + k * 9, t, k);
  R.recorte(null); R.rect(158, 19, 160, 95, K); R.rect(105, 56, 215, 57, K);
  // la llama de la vela
  const fl = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(86, 107 - fl, 88, 111, hex('#e8a030')); R.pset(87, 106 - fl, hex('#fff0a0')); R.pset(87, 109, hex('#fff0a0'));
  // la balanza: el pie, la columna, el fiel y los dos platillos que oscilan
  const osc = (t0) => (t > t0 ? Math.exp(-(t - t0) * 1.6) * Math.sin((t - t0) * 7) : 0);
  const ang = 0.12 * osc(PROVEN) - 0.12 * osc(DOESNT) + 0.02 * Math.sin(t * 1.3);
  const Oro = H('#8a5a1a', '#c8902a', '#e8b84a', '#fff0a0');
  R.poligono([[140, 128], [180, 128], [172, 120], [148, 120]], K); R.poligono([[142, 127], [178, 127], [171, 121], [149, 121]], Oro[1]); R.rect(149, 121, 171, 122, Oro[2]);
  R.rect(157, 52, 163, 120, K); R.rect(158, 53, 162, 119, Oro[1]); R.rect(158, 53, 159, 119, Oro[2]); R.rect(155, 86, 165, 90, K); R.rect(156, 87, 164, 89, Oro[2]);
  const bx = Math.cos(ang) * 58, by = Math.sin(ang) * 58, L = [160 - bx, 52 - by], Rr = [160 + bx, 52 + by];
  R.linea(L[0], L[1] - 1, Rr[0], Rr[1] - 1, K); R.linea(L[0], L[1] + 2, Rr[0], Rr[1] + 2, K); R.linea(L[0], L[1], Rr[0], Rr[1], Oro[2]); R.linea(L[0], L[1] + 1, Rr[0], Rr[1] + 1, Oro[1]);
  R.disco(160, 50, 5, K); R.disco(160, 50, 4, Oro[2]); R.disco(159, 49, 1.5, Oro[3]); R.poligono([[158, 44], [162, 44], [160, 34]], K); R.poligono([[159, 43], [161, 43], [160, 37]], Oro[2]);
  const platillo = ([px, py]) => { const yp = Math.round(py + 46); R.linea(px, py + 1, px - 15, yp, K); R.linea(px, py + 1, px + 15, yp, K); R.linea(px, py + 1, px, yp, Oro[0]);
    R.poligono([[px - 18, yp], [px + 18, yp], [px + 12, yp + 6], [px - 12, yp + 6]], K); R.poligono([[px - 16, yp + 1], [px + 16, yp + 1], [px + 11, yp + 5], [px - 11, yp + 5]], Oro[1]); R.rect(px - 15, yp + 1, px + 15, yp + 1, Oro[3]); return [Math.round(px), yp]; };
  const pl = platillo(L), pr = platillo(Rr);
  // la lupa cae en el platillo de la izquierda
  const cl1 = tramo(t, PROVEN - 0.45, PROVEN), ly = Math.round(lerp(-20, pl[1] - 8, cl1 ** 2));
  if (t > PROVEN - 0.45) { const lx = pl[0] - 3, yl = ly - 2; R.disco(lx, yl, 10, K); R.disco(lx, yl, 9, Oro[1]); R.disco(lx, yl, 7, hex('#bfe4f4')); R.disco(lx - 2, yl - 2, 2, T.C.blanco); for (let i = 0; i < 4; i++) R.linea(lx + 7 + i, yl + 7 - i * 0 + i, lx + 14 + i, yl + 9 + i, i === 0 || i === 3 ? K : hex('#6a4024')); }
  // la cruz roja cae en el de la derecha
  const cl2 = tramo(t, DOESNT - 0.4, DOESNT + 0.05), xy = Math.round(lerp(-30, pr[1] - 16, cl2 ** 2));
  if (t > DOESNT - 0.4) { const xx = pr[0]; for (const s of [-1, 1]) for (let i = -9; i <= 9; i++) { R.rect(xx + i - 3, xy + 6 + i * s - 3, xx + i + 3, xy + 6 + i * s + 3, K); } for (const s of [-1, 1]) for (let i = -8; i <= 8; i++) { R.rect(xx + i - 2, xy + 6 + i * s - 2, xx + i + 2, xy + 6 + i * s + 2, hex('#d8283a')); } for (let i = -7; i <= -2; i++) R.pset(xx + i, xy + 5 + i, hex('#f08a90')); }
  // el «≠» entre los platillos
  if (t > LIE) { const e = tramo(t, LIE, LIE + 0.3), cy = 112, c = Math.floor(t * 3) % 2 ? Oro[3] : Oro[2]; if (e > 0.2) { const yy = 74; R.rect(140, yy - 13, 180, yy + 13, K); R.rect(141, yy - 12, 179, yy + 12, hex('#2a2a3a')); R.rect(146, yy - 6, 174, yy - 3, c); R.rect(146, yy + 3, 174, yy + 6, c); for (let i = -10; i <= 10; i++) { R.rect(160 - Math.round(i * 0.5) - 1, yy + i, 160 - Math.round(i * 0.5) + 1, yy + i, c); } R.rect(141, yy - 12, 179, yy - 12, hex('#4a4a5a')); } }
  // el «?» sobre la lupa y el reloj de arena que se da la vuelta
  if (t > NOPROOF) { const e = tramo(t, NOPROOF, NOPROOF + 0.4); const qy = Math.round(pl[1] - 30 - e * 6); R.rect(pl[0] - 44, qy - 4, pl[0] - 22, qy + 24, K); R.rect(pl[0] - 43, qy - 3, pl[0] - 23, qy + 23, hex('#2a2a3a')); R.rect(pl[0] - 43, qy - 3, pl[0] - 23, qy - 3, hex('#4a4a5a')); R.icono('?', pl[0] - 40, qy, T.C.blanco, K, 3); }
  const gira = tramo(t, YET - 0.1, YET + 0.3), hx = 240, hy = 116;
  const arriba = gira < 0.5; R.rect(hx - 8, hy - 14, hx + 8, hy - 12, K); R.rect(hx - 8, hy + 10, hx + 8, hy + 12, K); R.rect(hx - 7, hy - 13, hx + 7, hy - 13, hex('#8a5a30')); R.rect(hx - 7, hy + 11, hx + 7, hy + 11, hex('#8a5a30'));
  R.poligono([[hx - 6, hy - 11], [hx + 6, hy - 11], [hx, hy - 1], [hx + 6, hy + 9], [hx - 6, hy + 9], [hx, hy - 1]], hex('#d8ecf4'));
  const fl2 = t > YET + 0.3 ? tramo(t, YET + 0.3, P2 + 3) : 0; const ar = hex('#e8c060');
  if (gira > 0 && gira < 1) { R.linea(hx - 8, hy - 12, hx + 8, hy + 10, K); }
  else { for (let y = Math.round(hy - 10 + fl2 * 8); y < hy - 2; y++) R.rect(hx - Math.round((hy - 1 - y) * 0.55), y, hx + Math.round((hy - 1 - y) * 0.55), y, ar); for (let y = Math.round(hy + 8 - fl2 * 6); y <= hy + 8; y++) R.rect(hx - 5, y, hx + 5, y, ar); if (t > YET + 0.3) R.linea(hx, hy - 1, hx, hy + 7, ar); }
  // motas de polvo en la luz de la ventana
  for (let k = 0; k < 10; k++) { const x = 110 + ((k * 23 + t * 3) % 100), y = 30 + ((k * 17 + t * 2) % 80); if ((x < 140 || x > 180)) R.pset(Math.round(x), Math.round(y), hex('#f4f0d8')); }
};

// ── 2 · el despacho de El Cairo: llega la carpeta ──
const p2 = (t) => {
  const o = { encuadre: 'redaccion', camara: 'despacho', carpeta: t < ASKED - 0.3 ? false : tramo(t, ASKED - 0.3, PERMI + 0.2) };
  T.hoy(R, t, o);
  R.actor(EL.tecnico, 150, 164, t, { dir: -1, habla: t > EGYPT && t < MEAS && Math.sin(t * 8) > 0, dedo: t > PERMI && t < PERMI + 0.8, sonrisa: t > DIG + 0.2 });
  const sale = tramo(t, DIG + 0.1, P3), cx = Math.round(lerp(18, -30, sale));
  const en1 = tramo(t, P2 + 0.1, ASKED - 0.4), cx2 = Math.round(lerp(-20, 18, en1));
  const lleva = t < ASKED - 0.3, ca = R.actor(EL.cartero, sale > 0 ? cx : cx2, 177, t, { dir: sale > 0 ? -1 : 1, anda: (en1 > 0 && en1 < 1) || (sale > 0 && sale < 1), sostiene: lleva ? true : t < PERMI ? [40 + Math.round(tramo(t, ASKED - 0.3, PERMI) * 8), 160] : false });
  if (lleva && T.PIEZAS_GZ.carpeta) T.PIEZAS_GZ.carpeta(R, ca.mano[0] + 4, ca.mano[1] + 6, {});
  T.hoyDelante(R, t, o);
  // de la carpeta salen lo que piden: medir (el carrito del radar) y excavar (una pala)
  const bub = (t0, x, y, dib) => { if (t < t0) return; const e = tramo(t, t0, t0 + 0.3); const yy = Math.round(y + (1 - e) * 10); R.rect(x - 20, yy - 18, x + 20, yy + 12, K); R.rect(x - 19, yy - 17, x + 19, yy + 11, hex('#f6f2e8')); R.pset(x - 2, yy + 13, K); R.pset(x - 1, yy + 14, K); dib(x, yy); };
  bub(MEAS, 188, 112, (x, y) => { if (T.PIEZAS_GZ.carritoRadar) T.PIEZAS_GZ.carritoRadar(R, x + 1, y + 10, { t }); });
  bub(DIG, 236, 112, (x, y) => { R.linea(x - 8, y - 10, x + 4, y + 2, K); R.linea(x - 7, y - 10, x + 5, y + 2, hex('#8a5a30')); R.poligono([[x + 2, y + 1], [x + 8, y - 3], [x + 12, y + 6], [x + 6, y + 10]], K); R.poligono([[x + 3, y + 1], [x + 8, y - 2], [x + 11, y + 6], [x + 6, y + 9]], hex('#a8a8b4')); R.rect(x - 10, y - 12, x - 6, y - 10, K); });
};

// ── 3 · la carpeta que espera ──
const salaE = capa(() => {
  yeso(0, 0, 319, 128, H('#d8c8a8', '#e8dcc0', '#f2ead6'), 13);
  for (let y = 128; y < 150; y++) for (let x = 0; x < 320; x++) { const i = x % 12, j = (y - 128) % 11; const c = (i === 0 || j === 0) ? hex('#e8e0d0') : (Math.abs(i - 6) + Math.abs(j - 5) < 4) ? hex('#2a8a8a') : (Math.abs(i - 6) + Math.abs(j - 5) < 6) ? hex('#e8c040') : hex('#3a5a9a'); R.pset(x, y, c); }
  R.rect(0, 150, 319, 151, K); madera(0, 152, 319, 179, H('#6a4024', '#8a5a34', '#9a6a3c', '#b07a48'), 7);
  // la ventana en arco (el cielo va en cada fotograma)
  R.rect(14, 26, 86, 112, K);
  // el armario de cajones con la bandeja y el tampón
  R.rect(98, 112, 226, 179, K); madera(99, 113, 225, 179, H('#4a2c18', '#6a4024', '#7e4e2c', '#94603a'), 22);
  for (let k = 0; k < 3; k++) { const y = 118 + k * 20; R.rect(104, y, 220, y + 16, hex('#3a2414')); R.rect(105, y + 1, 219, y + 15, hex('#6a4024')); R.rect(105, y + 1, 219, y + 1, hex('#94603a')); R.rect(156, y + 7, 168, y + 9, hex('#c8a040')); }
  R.rect(110, 96, 196, 112, K); R.rect(111, 97, 195, 111, hex('#8a5a34')); R.rect(111, 97, 195, 98, hex('#b07a48'));
  for (let i = 0; i < 6; i++) { const c = H('#c8a868', '#b89858', '#d8b878')[i % 3]; R.rect(116 + (i % 2), 104 - i * 2, 190 - (i % 2), 106 - i * 2, K); R.rect(117, 105 - i * 2, 189, 105 - i * 2, c); }
  R.rect(200, 104, 220, 112, K); R.rect(201, 105, 219, 111, hex('#3a3a46')); R.rect(203, 106, 217, 109, hex('#a8202a'));
  // una balda con archivadores sobre el armario
  R.rect(100, 40, 226, 44, K); R.rect(101, 41, 225, 43, hex('#8a5a34')); for (let i = 0; i < 10; i++) { const c = H('#3a5a9a', '#8a2a2a', '#3a6a3a', '#c89a3a')[i % 4], x = 104 + i * 12; R.rect(x, 16 + (i % 3) * 2, x + 10, 40, K); R.rect(x + 1, 17 + (i % 3) * 2, x + 9, 39, c); R.disco(x + 5, 32, 2, hex('#f4f0e6')); R.rect(x + 2, 20 + (i % 3) * 2, x + 8, 23 + (i % 3) * 2, hex('#f4f0e6')); }
  // el reloj de pared y la planta
  R.disco(262, 66, 16, K); R.disco(262, 66, 15, hex('#8a5a30')); R.disco(262, 66, 13, hex('#f4f0e6')); for (let k = 0; k < 12; k++) R.rect(Math.round(262 + Math.cos(k / 12 * 6.28) * 11), Math.round(66 + Math.sin(k / 12 * 6.28) * 11), Math.round(262 + Math.cos(k / 12 * 6.28) * 11), Math.round(66 + Math.sin(k / 12 * 6.28) * 11), K);
  R.rect(282, 150, 308, 176, K); R.rect(283, 151, 307, 175, hex('#a8582a')); R.rect(283, 151, 307, 153, hex('#c8784a'));
});
const p3 = (t) => {
  salaE();
  // pasan los días por la ventana: día, atardecer, noche, amanecer
  const d = tramo(t, P3 + 0.2, P4 - 0.2) * 1.5, fase = d % 1;
  const cielos = [H('#3a78cc', '#74ace6', '#c4dcec'), H('#5a3c80', '#d8687a', '#f8c070'), H('#0c1030', '#141a3e', '#1e2650'), H('#5a6aa8', '#e8a0a0', '#f8d8a0')];
  const ci = cielos[Math.floor(d * 2.6) % 4];
  R.recorte([15, 27, 85, 111]); grad(15, 27, 85, 111, ci);
  const sa = fase * Math.PI, sx = Math.round(20 + fase * 60), sy = Math.round(100 - Math.sin(sa) * 60);
  const noche = ci === cielos[2]; if (noche) { R.disco(sx, sy, 6, hex('#f4f0d8')); R.disco(sx + 2, sy - 1, 5, ci[1]); for (let k = 0; k < 10; k++) R.pset(18 + (k * 23) % 64, 30 + (k * 17) % 50, Math.sin(t * 3 + k) > 0 ? T.C.blanco : hex('#8a8aa8')); }
  else { R.disco(sx, sy, 7, hex('#fff0b0')); R.disco(sx, sy, 5, hex('#ffe070')); nube(((t * 8) % 90) + 10, 44, 16, H('#b8c8de', '#e6eef8', '#ffffff')); }
  R.poligono([[15, 111], [15, 94], [30, 90], [44, 96], [60, 88], [85, 92], [85, 111]], noche ? hex('#2a2a3a') : hex('#c8b090'));
  R.rect(66, 70, 70, 96, noche ? hex('#2a2a3a') : hex('#b8a080')); R.poligono([[64, 70], [68, 62], [72, 70]], noche ? hex('#2a2a3a') : hex('#b8a080')); R.disco(36, 92, 8, noche ? hex('#2a2a3a') : hex('#c0a888'));
  R.recorte(null);
  R.rect(49, 27, 51, 111, K); R.rect(15, 68, 85, 69, K); R.rect(10, 112, 90, 116, K); R.rect(11, 113, 89, 115, hex('#e8dcc0'));
  // la luz que entra y se mueve por el suelo
  for (let k = 0; k < 8; k++) { const x = Math.round(30 + k * 12 + fase * 40), y = 156 + (k % 3) * 6; if (!noche) { R.pset(x, y, hex('#d8a868')); R.pset(x + 1, y, hex('#d8a868')); } }
  // nuestra carpeta encima de todo, el tampón sin usar
  if (T.PIEZAS_GZ.carpeta) T.PIEZAS_GZ.carpeta(R, 152, 98, { s: 2 }); R.poligono([[158, 92], [164, 82], [170, 92]], K); R.poligono([[160, 91], [164, 84], [168, 91]], hex('#3a6ab0'));
  R.disco(208, 98, 3, K); R.rect(206, 98, 210, 104, K); R.rect(207, 99, 209, 103, hex('#a8743c')); R.disco(208, 97, 2, hex('#a8743c'));
  // el reloj que corre
  const ah = t * 3, am = t * 36; R.linea(262, 66, Math.round(262 + Math.sin(ah) * 6), Math.round(66 - Math.cos(ah) * 6), K); R.linea(262, 66, Math.round(262 + Math.sin(am) * 10), Math.round(66 - Math.cos(am) * 10), hex('#c83a3a')); R.disco(262, 66, 1.5, K);
  // la araña que baja por su hilo hasta la carpeta, y vuelve a subir
  const ar = tramo(t, P3 + 0.6, GRANT) - tramo(t, GRANT + 0.6, P4 - 0.1) * 0.6, ay = Math.round(lerp(46, 84, ar));
  R.linea(150, 45, 150, ay, hex('#c8c8d0')); R.disco(150, ay + 2, 2.5, K); for (const s of [-1, 1]) for (let j = 0; j < 3; j++) { const w = Math.sin(t * 9 + j) > 0 ? 1 : 0; R.pset(150 + s * 3, ay + 1 + j, K); R.pset(150 + s * 4, ay + j + w, K); }
  // las hojas de la planta
  for (let k = 0; k < 7; k++) { const a2 = -1.2 + k * 0.4 + Math.sin(t * 1.2 + k) * 0.07, L = 20 + (k % 3) * 6; R.linea(295, 150, Math.round(295 + Math.cos(a2 - 1.57) * L), Math.round(150 + Math.sin(a2 - 1.57) * L), hex('#3a7a3a')); R.linea(296, 150, Math.round(296 + Math.cos(a2 - 1.57) * L), Math.round(150 + Math.sin(a2 - 1.57) * L), hex('#5aa85a')); }
};

// ── 4 · la linterna baja por el pozo de verdad ──
const p4 = (t) => {
  const o = { encuadre: 'osiris', camara: 'fondo' };
  T.giza(R, t, o);
  const b = tramo(t, P4 + 0.1, CORR + 0.3), lx = 50, ly = Math.round(lerp(22, 128, b));
  const vaiven = Math.round(Math.sin(t * 2.2) * 2 * (1 - b * 0.5)), gira = tramo(t, KNOW - 0.4, KNOW + 0.2);
  R.linea(lx, 16, lx + vaiven, ly - 8, hex('#c8b8a0')); R.linea(lx + 1, 16, lx + 1 + vaiven, ly - 8, hex('#7a6a5a'));
  const x = lx + vaiven;
  // el haz: hacia abajo mientras baja; en «know for sure» gira hacia el sarcófago
  const tx = Math.round(lerp(x, 164, gira)), ty = Math.round(lerp(ly + 50, 124, gira));
  for (let k = 0; k < 220; k++) { const u = hh(k, Math.floor(t * 6)) , v = hh(Math.floor(t * 6), k) - 0.5, px = Math.round(lerp(x, tx, u) + v * u * 26 * (1 - gira * 0.4)), py = Math.round(lerp(ly + 6, ty, u) + v * u * 10 * gira); R.pset(px, py, u < 0.5 ? hex('#fff0b0') : hex('#f0d080')); }
  if (gira > 0.6) for (let k = 0; k < 6; k++) { const s = Math.sin(t * 6 + k) > 0.3; if (s) R.pset(132 + k * 12, 108 + (k % 2) * 6, T.C.blanco); }
  if (T.PIEZAS_GZ.linterna) T.PIEZAS_GZ.linterna(R, x + (gira > 0.5 ? 6 : 0), ly + (gira > 0.5 ? 2 : 6), { encendida: true, abajo: gira <= 0.5, haz: false });
  // la cámara que cuelga debajo, con su piloto rojo
  R.rect(x - 3, ly + 8, x + 3, ly + 13, K); R.rect(x - 2, ly + 9, x + 2, ly + 12, hex('#3a3a46')); R.pset(x, ly + 11, hex('#5ab8e8')); if (Math.floor(t * 3) % 2) R.pset(x + 2, ly + 9, hex('#ff3040'));
  T.gizaDelante(R, t, o);
};
const efectos = [[PROVEN, 'toc'], [DOESNT + 0.05, 'toc'], [LIE, 'brillo'], [YET, 'tic'], [ASKED, 'papel'], [MEAS, 'pop'], [DIG, 'pop'], [P3 + 0.4, 'tic'], [P4 + 0.15, 'interruptor'], [KNOW, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
