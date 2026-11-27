E = {}

E['nv-poema'] = ('El poema', '''// NV-POEMA (frase 9), cartela «1823»; barra 1823 → 1863–1886. Cinco planos (la frase dura 23 s):
// 1. la imprenta de Nueva York de 1823: el impresor tira de la barra, la platina baja y el aprendiz levanta el pliego
//    recién impreso; otro aprendiz entinta con las balas; por la ventana pasa el coche de caballos (corta en «In 1823»);
// 2. el periódico de cerca: brilla la tinta en «published»; en «without a name» la firma en blanco y un «?»; en «made»
//    el grabado se enciende y de él sale volando el trineo de ocho renos (corta en «the sleigh»);
// 3. el campo nevado: el trineo de ocho renos cruza el cielo, da la vuelta y baja por la chimenea de la granja en
//    «chimney» (bocanada de hollín); el público de la cerca lo señala y aplaude (corta en «Then»);
// 4. el estudio del dibujante (Nast): entra, coge el lápiz y dibuja; el Santa del tablero engorda; un chico le trae el
//    periódico con el Santa impreso y la barra corre de 1863 a 1886 («for decades») (corta en «making»);
// 5. la hoja vista desde arriba (fondo local): la mano con el lápiz redondea la barriga en «rounder» y le pone la
//    sonrisa en «merrier»; alrededor, los bocetos flacos de antes.''', r'''
const a = (f) => en('poema', f);
const P2 = a(0.229), P3 = a(0.443), P4 = a(0.640), P5 = a(0.909), FIN = E.duracion;
const tira = 1.5, ano1823 = a(0.17), publica = a(0.248), sinNombre = a(0.274), titulo = a(0.333), hace = a(0.392);
const renos = a(0.464), baja = a(0.516), chimenea = a(0.55), famoso = a(0.566);
const guerra = a(0.68), nast = a(0.786), decadas = a(0.857), redonda = a(0.934), alegre = a(0.97);
const K = T.C.k;
// un pliego de periódico pequeño (sin letras: columnas de rayas), centrado abajo en (x, y)
const pliego = (x, y, w = 12, h = 9) => { const x0 = Math.round(x - w / 2), y0 = Math.round(y - h); R.rect(x0, y0, x0 + w, y0 + h, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + h - 1, hex('#f2ead6'));
  R.rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + 2, hex('#3a3440')); for (let c = 0; c < 3; c++) for (let r = 4; r < h - 1; r += 2) R.linea(x0 + 2 + c * Math.floor((w - 3) / 3), y0 + r, x0 + Math.floor((w - 3) / 3) * (c + 1), y0 + r, hex('#8a8494')); };
// el trineo lejano, en silueta: ocho puntitos de renos y el trineo (para cuando está lejos)
const trineoLejos = (x, y, dir, t) => { for (let i = 0; i < 4; i++) for (const dy of [0, 4]) { const xx = x + dir * (9 + i * 6), sb = Math.sin(t * 14 + i + dy) > 0 ? 1 : 0, yy = y - dy - 1 - sb;
    R.rect(xx - 1, yy - 1, xx + 3, yy + 1, K); R.rect(xx, yy, xx + 2, yy, hex('#7a5230')); R.pset(xx + (dir > 0 ? 3 : -1), yy - 2, hex('#3a2414')); R.pset(xx + (dir > 0 ? 3 : -1), yy - 1, hex('#7a5230')); R.pset(xx + 1, yy + 2, K); }
  R.linea(x, y - 2, x + dir * 30, y - 3, hex('#c8a040')); R.rect(x - 5, y - 4, x + 4, y + 1, K); R.rect(x - 4, y - 3, x + 3, y, hex('#b8202a')); R.rect(x - 5, y + 2, x + 5, y + 2, hex('#e0c040')); R.disco(x - 1, y - 5, 2, hex('#f2f0ec')); R.pset(x - 1, y - 7, hex('#b8202a'));
  for (let k = 1; k < 6; k++) R.pset(x - dir * (6 + k * 4), y - 2 + (k % 2), k % 2 ? hex('#fff4c0') : hex('#f0c040')); };
const chispas = (x, y, t, n = 6, r = 10) => { for (let k = 0; k < n; k++) { const ang = k * 2.4 + t * 3, rr = r * ((t * 1.7 + k * 0.37) % 1); const px = Math.round(x + Math.cos(ang) * rr), py = Math.round(y + Math.sin(ang) * rr * 0.7); R.pset(px, py, k % 2 ? hex('#fff4c0') : hex('#f0c040')); } };

const p1 = (t) => {
  const ti = tramo(t, tira, tira + 0.6) - tramo(t, tira + 1.2, tira + 1.7);
  const g = T.epoca(R, t, { encuadre: 'imprenta', tira: ti });
  const bar = (g.prensa && g.prensa.barra) || [192, 104];
  // el impresor tira de la barra con las dos manos y luego la suelta y señala el pliego
  R.actor(EL.impresor, 190, 160, t, { dir: -1, sostiene: t < tira + 1.4 ? bar : false, habla: t > tira + 1.9 && Math.sin(t * 7) > 0, dedo: t > tira + 1.9, sonrisa: t > ano1823 });
  // el aprendiz espera junto al tímpano, levanta el pliego recién impreso y lo enseña (sube con él)
  const le = tramo(t, tira + 1.6, tira + 2.2), x1 = Math.round(lerp(96, 86, le));
  const m = R.actor(EL.aprendiz, x1, 160, t, { dir: 1, sostiene: le > 0 ? [x1 + 14, Math.round(lerp(134, 122, le))] : false, sorpresa: t > ano1823 && t < ano1823 + 0.8, sonrisa: t > ano1823 + 0.8 });
  if (le > 0) pliego(m.mano[0] + 2, m.mano[1] + 2, 16, 12);
  // el otro aprendiz entinta con las balas en la mesa de entintar (arriba y abajo, cada 0,6 s)
  const ent = Math.sin(t * 10) > 0;
  const m2 = R.actor(EL.aprendiz2, 46, 160, t, { dir: 1, sostiene: [62, ent ? 114 : 118] });
  R.disco(m2.mano[0] + 1, m2.mano[1] - 1, 3, K); R.disco(m2.mano[0] + 1, m2.mano[1] - 1, 2, hex('#6a4a34')); R.rect(m2.mano[0] + 1, m2.mano[1] - 1, m2.mano[0] + 1, m2.mano[1] + 3, hex('#8a6a44'));
  T.epocaDelante(R, t, { encuadre: 'imprenta' });
};
const p2 = (t) => {
  const g = T.epoca(R, t, { encuadre: 'imprenta', camara: 'prensa', tinta: tramo(t, publica - 0.1, publica + 1.4) });
  const hj = g.hoja || [48, 36, 60, 80];
  // el título del poema que se enciende en «A Visit from St. Nicholas» (renglón dorado, sin letras)
  const ti = tramo(t, titulo, titulo + 0.3) - tramo(t, hace - 0.2, hace);
  if (ti > 0) { R.rect(66, 46, 85, 49, hex('#f0c040')); R.rect(67, 47, 84, 48, hex('#fff0a0')); }
  // la firma en blanco: la raya de la firma vacía y el «?» grande que salta encima
  const fi = tramo(t, sinNombre, sinNombre + 0.3);
  if (fi > 0) { for (let x = 70; x < 84; x += 3) R.linea(x, 106, x + 1, 106, hex('#3a3440')); R.icono('?', 72, Math.round(lerp(106, 94, fi)), hex('#c8303a'), K, 2); }
  // el grabado del trineo se enciende y el trineo sale volando del papel hacia la derecha y arriba
  const gr = tramo(t, hace - 0.4, hace);
  if (gr > 0 && t < P3) { R.recorte([69, 52, 82, 64]); for (let y = 52; y <= 64; y++) for (let x = 69; x <= 82; x++) if ((x + y + Math.floor(t * 8)) % 3 === 0) R.pset(x, y, hex('#fff0a0')); R.recorte(null); }
  const vu = tramo(t, hace, P3 + 0.1);
  const camino = (v) => [Math.round(lerp(78, 380, v)), Math.round(lerp(62, 92, v) - Math.sin(v * Math.PI) * 18)];
  if (vu > 0) { const [x, y] = camino(vu);
    for (let k = 1; k < 9; k++) { const [xx, yy] = camino(Math.max(0, vu - k * 0.025)); R.pset(xx - 40, yy + 4, k % 2 ? hex('#fff4c0') : hex('#f0c040')); R.pset(xx - 40, yy + 5, hex('#f0c040')); }
    T.PIEZAS_NV.trineo(R, x, y + 9, { renos: 8, t, dir: 1 }); }
  // el impresor lee, señala la firma vacía y se encoge de hombros; el aprendiz asoma y se asombra con el trineo
  R.actor(EL.impresor, 250, 166, t, { dir: -1, dedo: t > sinNombre - 0.2 && t < titulo + 0.4, sorpresa: t > hace, habla: t < sinNombre && Math.sin(t * 7) > 0.2, sostiene: t < P2 + 0.9 ? (g.barra || [239, 141]) : false });
  const ap = tramo(t, P2 + 0.3, P2 + 1.6);
  R.actor(EL.aprendiz2, Math.round(lerp(340, 200, ap)), 166, t, { dir: -1, anda: ap > 0 && ap < 1, sorpresa: t > hace + 0.2, brazos: t > hace + 0.5 && t < P3 - 0.3 });
};
const p3 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'trineos', carrera: false });
  // el trineo grande cruza el cielo de izquierda a derecha (a ×2: se cuentan los ocho renos), sube y gira
  const u = tramo(t, P3 + 0.05, baja - 0.15);
  if (u > 0 && u < 1) { const x = Math.round(lerp(-120, 250, u)), y = Math.round(100 - Math.sin(u * Math.PI) * 12);
    for (let k = 1; k < 14; k++) { const xx = Math.round(lerp(-120, 250, u - k * 0.015)) - 100, yy = Math.round(100 - Math.sin((u - k * 0.015) * Math.PI) * 12) - 8 + (k % 3); R.pset(xx, yy, k % 2 ? hex('#fff4c0') : hex('#f0c040')); R.pset(xx - 1, yy, hex('#f0c040')); }
    T.PIEZAS_NV.trineo(R, x, y, { renos: 8, t, dir: 1, s: 2 }); }
  // ya lejos, el trineo vuelve en silueta y baja en picado por la chimenea de la granja
  const chim = g.chimenea || [146, 62];
  const v = tramo(t, baja - 0.1, chimenea);
  if (v > 0 && v < 1) trineoLejos(Math.round(lerp(250, chim[0], v)), Math.round(lerp(30, chim[1] - 2, v * v)), -1, t);
  // la bocanada de hollín y chispas al entrar
  const bo = tramo(t, chimenea, chimenea + 1.2);
  if (bo > 0.3) for (let k = 0; k < 10; k++) { const f = (t * 0.6 + k * 0.1) % 1, xx = Math.round(chim[0] + Math.sin(k * 3 + t * 2) * 3 + f * 6), yy = Math.round(chim[1] - 4 - f * 30); if (Math.sin(t * 9 + k) > -0.3) R.pset(xx, yy, k % 3 ? hex('#fff4c0') : hex('#f0c040')); }
  if (bo > 0 && bo < 1) { for (let k = 0; k < 6; k++) { const r = 1 + bo * (3 + k % 3), yy = chim[1] - 4 - bo * (8 + k * 3), xx = chim[0] + Math.sin(k * 2 + bo * 4) * (2 + k); R.disco(Math.round(xx), Math.round(yy), r, k % 2 ? hex('#4a4450') : hex('#6a6470')); } chispas(chim[0], chim[1] - 6, t, 8, 10); }
  // el público tras la cerca: miran al cielo, señalan y aplauden cuando el trineo entra en la chimenea
  const pub = [[EL.senor1857, 52, 1], [EL.dama1857, 84, 1], [EL.chico, 196, -1], [EL.senor1857, 238, -1], [EL.dama1857, 268, -1]];
  pub.forEach(([el, x, d], i) => { const sigue = u > 0.1 && u < 0.95; R.actor(el, x, 160, t, { dir: sigue ? (lerp(-120, 250, u) - 104 > x ? 1 : -1) : d, dedo: sigue && i % 2 === 0, sorpresa: sigue && i % 2 === 1, brazos: t > chimenea + 0.1 && Math.sin((t - chimenea) * 5 + i * 1.3) > -0.4, sonrisa: t > chimenea, salto: t > chimenea + 0.1 && Math.sin((t - chimenea) * 7 + i * 2) > 0.7 ? 2 : 0 }); });
  T.hoyDelante(R, t, { encuadre: 'trineos', carrera: false });
};
const p4 = (t) => {
  const go = lerp(0.1, 0.75, tramo(t, guerra, P5 - 0.3));
  const g = T.epoca(R, t, { encuadre: 'estudio', gordo: go });
  // Nast entra desde la izquierda, se pone ante el tablero y dibuja (la mano va y viene sobre la hoja)
  const e = tramo(t, P4 + 0.1, P4 + 1.4), x = Math.round(lerp(-10, 128, e));
  const dib = t > guerra - 0.2 && t < P5 - 0.2 && !(t > decadas && t < decadas + 1.2);
  R.actor(EL.nast, x, 160, t, { dir: decadas < t && t < decadas + 1.2 ? 1 : 1, anda: e > 0 && e < 1, sostiene: dib ? [150 + Math.round(Math.sin(t * 9) * 3), 128 + Math.round(Math.cos(t * 7) * 2)] : false, sonrisa: t > nast, habla: t > decadas && t < decadas + 1.2 });
  // el chico de los periódicos entra por la derecha con el semanario del Santa, lo enseña y se va
  const c1 = tramo(t, nast - 0.4, nast + 0.6), c2 = tramo(t, decadas + 1.4, P5);
  const cx = Math.round(lerp(340, 226, c1) + lerp(0, 120, c2));
  if (c1 > 0) { const m = R.actor(EL.aprendiz2, cx, 160, t, { dir: c2 > 0 ? 1 : -1, anda: (c1 > 0 && c1 < 1) || c2 > 0, sostiene: c1 >= 1 && c2 === 0 ? [cx - 4, 128] : false, sonrisa: c1 >= 1 });
    if (c1 >= 1 && c2 === 0) { pliego(m.mano[0] - 2, m.mano[1] + 6, 18, 14); R.rect(m.mano[0] - 7, m.mano[1] - 4, m.mano[0] - 3, m.mano[1] + 2, hex('#c8303a')); } }
  T.epocaDelante(R, t, { encuadre: 'estudio', gordo: go });
};
// 5: la hoja del dibujante vista desde arriba (fondo local fijo en su búfer) y, encima, el Santa que se redondea
let F5 = null;
const fondo5 = () => {
  if (F5) return F5; F5 = R.nuevo(); const prev = R.usar(F5);
  const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // la mesa de nogal: tablas horizontales con vetas, nudos y juntas
  const MAD = [hex('#5a361e'), hex('#6a4226'), hex('#7a4e2e'), hex('#4a2c18')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), v = Math.sin(x * 0.05 + tabla * 3 + Math.sin(x * 0.013 + tabla) * 3 + y * 0.6) + h(x >> 3, y, tabla) * 0.6; R.pset(x, y, y % 30 === 0 ? MAD[3] : v > 0.9 ? MAD[2] : v < -0.7 ? MAD[0] : MAD[1]); }
  for (const [nx, ny] of [[30, 48], [292, 132], [12, 150]]) { R.disco(nx, ny, 3, MAD[0]); R.disco(nx, ny, 1, MAD[3]); }
  // la esquina de Atom: la sombra suave de la lámpara (tranquila)
  { const OSC = new Map(MAD.map((c, i) => [c, [hex('#3a2212'), hex('#40261a'), hex('#46301e'), hex('#2e1a0e')][i]])); for (let y = 0; y < 100; y++) for (let x = 200; x < 320; x++) { const d = Math.hypot(320 - x, y + 10) / 110; if (h(x, y, 9) > d * d * 1.3) { const c = R.pget(x, y); if (OSC.has(c)) R.pset(x, y, OSC.get(c)); } } }
  // el secante verde bajo la hoja, con su cantonera de cuero
  R.rect(52, 10, 258, 176, hex('#24402e')); R.rect(54, 12, 256, 174, hex('#2e5a3e')); for (let k = 0; k < 220; k++) R.pset(54 + Math.floor(h(k, 1, 5) * 202), 12 + Math.floor(h(k, 2, 5) * 162), hex('#346646'));
  for (const [x0, y0, sx, sy] of [[52, 10, 1, 1], [258, 10, -1, 1], [52, 176, 1, -1], [258, 176, -1, -1]]) for (let i = 0; i < 12; i++) R.linea(x0, y0 + sy * i, x0 + sx * (12 - i), y0 + sy * i, hex('#6a2a1e'));
  // la hoja grande, con su sombra y las chinchetas
  R.rect(84, 22, 240, 170, hex('#1c1820')); R.rect(80, 18, 236, 166, hex('#f4ecd8')); R.rect(80, 160, 236, 166, hex('#e6dcc4')); R.rect(230, 18, 236, 166, hex('#e6dcc4'));
  for (let k = 0; k < 120; k++) R.pset(82 + Math.floor(h(k, 3, 6) * 150), 20 + Math.floor(h(k, 4, 6) * 140), hex('#ece2cc'));
  for (const [x, y] of [[84, 22], [232, 22], [84, 162], [232, 162]]) { R.disco(x, y, 2, hex('#c8a040')); R.pset(x - 1, y - 1, hex('#fff0a0')); }
  // las miniaturas de prueba arriba a la izquierda, las líneas de encaje a lápiz, el aro de café y la regla
  const GR = hex('#c8c0b0'), GR2 = hex('#a8a090');
  for (let k = 0; k < 3; k++) { const x = 100 + k * 18, y = 40; R.disco(x, y + 6, 5 + k * 2, GR2); R.disco(x, y + 6, 4 + k * 2, hex('#f4ecd8')); R.disco(x, y - 4, 3, GR2); R.disco(x, y - 4, 2, hex('#f4ecd8')); }
  R.linea(96, 30, 156, 30, GR); for (let a = 0; a < 6.28; a += 0.05) { const x = 158 + Math.cos(a) * 30, y = 108 + Math.sin(a) * 30; if (h(Math.round(a * 20), 3, 8) > 0.35) R.pset(Math.round(x), Math.round(y), GR); }
  R.linea(158, 40, 158, 156, GR); R.linea(110, 150, 206, 150, GR);
  for (let a = 0; a < 6.28; a += 0.04) { const x = 212 + Math.cos(a) * 9, y = 140 + Math.sin(a) * 9; R.pset(Math.round(x), Math.round(y), hex('#c8a888')); if (a < 2) R.pset(Math.round(x), Math.round(y) + 1, hex('#d8bc9c')); }
  R.rect(92, 154, 200, 161, K); R.rect(93, 155, 199, 160, hex('#d8b46a')); R.rect(93, 160, 199, 160, hex('#a87a3a')); for (let x = 96; x < 199; x += 4) R.linea(x, 155, x, x % 20 === 0 ? 158 : 156, hex('#5a3a22'));
  R.disco(222, 36, 4, hex('#d8a0a0')); R.disco(222, 36, 3, hex('#e8b8b8'));
  // los bocetos flacos de antes (a la izquierda, en hojitas sueltas), con su Santa delgado a tinta
  const flaco = (x, y) => { R.rect(x - 3, y - 26, x + 3, y - 20, hex('#3a3440')); R.pset(x + 3, y - 27, hex('#3a3440')); R.disco(x, y - 17, 3, hex('#3a3440')); R.disco(x, y - 17, 2, hex('#f4ecd8')); R.rect(x - 2, y - 14, x + 2, y - 4, hex('#3a3440')); R.rect(x - 1, y - 13, x + 1, y - 5, hex('#f4ecd8')); R.linea(x - 2, y - 4, x - 3, y, hex('#3a3440')); R.linea(x + 2, y - 4, x + 3, y, hex('#3a3440')); };
  for (const [x0, y0, k] of [[6, 70, 0], [20, 118, 1], [258, 76, 2]]) { R.rect(x0 + 2, y0 + 2, x0 + 44, y0 + 50, hex('#1c1820')); R.rect(x0, y0, x0 + 42, y0 + 48, hex('#efe4c8')); R.rect(x0, y0, x0 + 42, y0 + 2, hex('#e0d4b4')); flaco(x0 + 14, y0 + 42); flaco(x0 + 30, y0 + 42); R.numero(['63', '66', '72'][k], x0 + 34, y0 + 10, { color: hex('#6a6070') }); }
  // el tintero de cristal, las plumillas en su bandeja, la goma y un lápiz suelto
  R.disco(30, 30, 12, hex('#1c1820')); R.disco(30, 30, 11, hex('#5a7aa0')); R.disco(30, 30, 7, hex('#1c1c2a')); R.pset(25, 24, hex('#e8f0ff')); R.pset(26, 23, hex('#e8f0ff'));
  R.rect(8, 150, 46, 160, hex('#1c1820')); R.rect(9, 151, 45, 159, hex('#8a6a3a')); for (let i = 0; i < 4; i++) { R.linea(12 + i * 8, 153, 18 + i * 8, 157, hex('#c8c8d0')); R.pset(18 + i * 8, 157, K); }
  R.rect(262, 150, 280, 158, K); R.rect(263, 151, 279, 157, hex('#d8a0a0')); R.linea(270, 136, 310, 120, hex('#c8a040')); R.linea(270, 137, 310, 121, hex('#a87a18')); R.pset(269, 137, K);
  // el pliego del semanario doblado a la derecha (columnas de rayas, sin letras)
  R.rect(262, 160, 316, 180, K); R.rect(263, 161, 316, 180, hex('#e8e0cc')); for (let c = 0; c < 4; c++) for (let r = 166; r < 180; r += 2) R.linea(266 + c * 12, r, 274 + c * 12, r, hex('#8a8494'));
  R.usar(prev); return F5;
};
const p5 = (t) => {
  R.copiar(fondo5());
  // la luz de la lámpara de gas que tiembla un poco sobre la hoja
  T.tinte(R, 0, 179, [255, 200, 120], 0.04 + 0.02 * Math.sin(t * 5));
  const INK = hex('#2a2430'), PAP = hex('#f4ecd8'), ROJ = hex('#c8303a');
  // el Santa grande a tinta: la barriga se redondea en «rounder» y la sonrisa crece en «merrier»
  const ro = tramo(t, redonda - 0.4, redonda + 0.5), al = tramo(t, alegre - 0.2, alegre + 0.4);
  const cx = 158, pie = 150, rb = Math.round(lerp(14, 26, ro));
  // piernas y botas
  R.rect(cx - 12, pie - 16, cx - 4, pie, INK); R.rect(cx + 4, pie - 16, cx + 12, pie, INK); R.rect(cx - 11, pie - 15, cx - 5, pie - 5, ROJ); R.rect(cx + 5, pie - 15, cx + 11, pie - 5, ROJ); R.rect(cx - 15, pie - 4, cx - 3, pie, INK); R.rect(cx + 3, pie - 4, cx + 15, pie, INK);
  // la barriga (tinta y aguada roja) y el cinturón
  const by = pie - 16 - Math.round(rb * 0.8);
  R.disco(cx, by, rb + 1, INK); R.disco(cx, by, rb, ROJ); R.disco(cx - Math.round(rb * 0.35), by - Math.round(rb * 0.35), Math.round(rb * 0.35), hex('#e05a5a'));
  R.rect(cx - rb, by + 2, cx + rb, by + 5, INK); R.rect(cx - 3, by + 1, cx + 3, by + 6, hex('#e0c040')); R.rect(cx - 1, by + 3, cx + 1, by + 4, INK);
  R.rect(cx - 2, by - rb, cx + 2, by + rb, PAP); R.linea(cx - 2, by - rb, cx - 2, by + rb, INK); R.linea(cx + 2, by - rb, cx + 2, by + rb, INK);
  // la cabeza, la barba blanca y el gorro con la borla
  const hy = by - rb - 10;
  R.disco(cx, hy + 6, 14, INK); R.disco(cx, hy + 6, 13, PAP); for (let k = 0; k < 7; k++) R.linea(cx - 10 + k * 3, hy + 10, cx - 9 + k * 3, hy + 17, hex('#c8c0b0'));
  R.disco(cx, hy - 2, 9, INK); R.disco(cx, hy - 2, 8, hex('#f6c290')); R.rect(cx - 9, hy - 2, cx + 9, hy + 2, PAP); R.linea(cx - 10, hy - 2, cx + 10, hy - 2, INK);
  R.poligono([[cx - 10, hy - 6], [cx + 10, hy - 6], [cx + 18, hy - 18], [cx + 2, hy - 15]], ROJ); R.rect(cx - 11, hy - 8, cx + 11, hy - 5, PAP); R.linea(cx - 11, hy - 8, cx + 11, hy - 8, INK); R.disco(cx + 19, hy - 18, 3, INK); R.disco(cx + 19, hy - 18, 2, PAP);
  // los ojos, las mejillas y la sonrisa (que crece y guiña en «merrier»)
  const guina = al > 0.6 && Math.sin(t * 3) > 0.5;
  R.rect(cx - 5, hy - 4, cx - 4, hy - 3, INK); if (guina) R.linea(cx + 3, hy - 3, cx + 5, hy - 3, INK); else R.rect(cx + 4, hy - 4, cx + 5, hy - 3, INK);
  R.disco(cx - 7, hy, 2, hex('#e88a8a')); R.disco(cx + 7, hy, 2, hex('#e88a8a'));
  const sw = Math.round(lerp(2, 5, al)); R.linea(cx - sw, hy + 3, cx + sw, hy + 3, INK); R.linea(cx - sw - 1, hy + 2, cx - sw, hy + 3, INK); R.linea(cx + sw, hy + 3, cx + sw + 1, hy + 2, INK); if (al > 0.5) R.linea(cx - sw + 1, hy + 4, cx + sw - 1, hy + 4, ROJ);
  // los brazos del dibujo (manoplas negras) que se abren cuando sonríe
  const ab = Math.round(al * 6 + (al >= 1 ? Math.sin(t * 7) * 2 : 0)); R.linea(cx - rb, by - rb + 8, cx - rb - 8, by - 4 - ab, INK); R.linea(cx + rb, by - rb + 8, cx + rb + 8, by - 4 - ab, INK); R.disco(cx - rb - 9, by - 5 - ab, 3, INK); R.disco(cx + rb + 9, by - 5 - ab, 3, INK);
  if (al > 0.3) for (const [sx, sy] of [[cx + 20, hy - 6], [cx - 24, hy + 2], [cx + 26, hy + 8]]) { if (Math.sin(t * 8 + sx) > 0) { R.pset(sx, sy, hex('#f0c040')); R.pset(sx - 1, sy, hex('#f0c040')); R.pset(sx + 1, sy, hex('#f0c040')); R.pset(sx, sy - 1, hex('#f0c040')); R.pset(sx, sy + 1, hex('#f0c040')); } }
  // la mano con el lápiz: repasa el contorno de la barriga mientras crece, luego la sonrisa, y se aparta
  // (la mano entra por abajo a la derecha: el lápiz largo llega al contorno de la barriga, que repasa mientras crece; en
  // «merrier» la mano se aparta y el dibujo sonríe solo)
  const sale = tramo(t, alegre - 0.5, alegre + 0.1), ang = Math.PI * (0.18 + 0.2 * Math.sin(t * 4));
  const px = lerp(cx + Math.cos(ang) * (rb + 1), 330, sale), py = lerp(by + Math.sin(ang) * (rb + 1), 200, sale);
  const fx = Math.round(px + 16), fy = Math.round(py + 14), wx = fx + 13, wy = fy + 2;
  R.linea(Math.round(px), Math.round(py), fx, fy, hex('#e0b030')); R.linea(Math.round(px) + 1, Math.round(py), fx + 1, fy, hex('#a87a18')); R.linea(Math.round(px), Math.round(py), Math.round(px) + 2, Math.round(py) + 2, hex('#e8c8a0')); R.pset(Math.round(px), Math.round(py), INK);
  T.brazo(R, wx + 22, 206, wx, wy, '#e8e0cc', -1, { codo: [wx + 20, Math.round(lerp(wy, 206, 0.5))] });
};
const efectos = [[tira + 0.55, 'golpecito'], [tira + 1.65, 'papel'], [publica, 'brillo'], [sinNombre + 0.05, 'pop'], [hace + 0.05, 'whoosh'], [P3 + 0.4, 'campana'], [chimenea + 0.05, 'chof'], [famoso, 'publico'],
  [P4 + 0.3, 'puerta'], [guerra, 'lapiz'], [nast + 0.6, 'papel'], [P5 + 0.2, 'lapiz'], [alegre, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1823', efectos, año: (t) => t < P4 ? 1823 : Math.round(lerp(1863, 1886, tramo(t, P4 + 0.5, FIN - 0.5))) });
''')

E['nv-rojo'] = ('El traje rojo', '''// NV-ROJO (frase 10), sin cartela; barra 2026 → 1890 → 1931 → 1964. Cuatro planos:
// 1. el salón de hoy: un chico entra con la botella sin etiqueta y la levanta en «Coca-Cola»; la galleta salta en la
//    mesita y sale la «X» grande en «didn't»; la niña cuelga un adorno en el árbol (corta en «He»);
// 2. el estudio, el tendedero de postales: Santa, de rojo, señala las postales rojas («already red»); en «green»,
//    «brown» y «blue» se prueba esos trajes (bocanada a cada cambio) y la galleta llega con el traje rojo y se lo pasa
//    (gag 3) (corta en «What»);
// 3. 1931, la parada del autobús: el cartelero pega el cartel del Santa rojo con la botella sin etiqueta en «1931»;
//    los de la cola lo miran (corta en «the same way»);
// 4. la calle: el mismo cartel aparece en una fachada tras otra («every year»: la barra corre de 1931 a 1964) y en
//    «everywhere» brillan todos; pasa el autobús.''', r'''
const a = (f) => en('rojo', f);
const P2 = a(0.173), P3 = a(0.574), P4 = a(0.781), FIN = E.duracion;
const cola = a(0.041), noHizo = a(0.082), yaRojo = a(0.197), postales = a(0.317), aunque = a(0.376), verde = a(0.443), marron = a(0.482), azul = a(0.522);
const ano31 = a(0.672), pinta = a(0.749), cadaAno = a(0.827), hasta = a(0.867), traje = a(0.911), todas = a(0.962);
const K = T.C.k;
// el cartel de 1931: marco crema, fondo rojo oscuro, Santa rojo grande y la botella sin etiqueta (x0, y0 arriba a la
// izquierda; w × h; u 0–1 cuánto se ha desenrollado de arriba abajo)
const cartel = (x0, y0, w, h, u = 1, brilla = 0) => {
  const hv = Math.round(h * u); if (hv <= 0) return;
  R.rect(x0, y0, x0 + w, y0 + hv, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hv - 1, hex('#f2e6c8')); if (hv > 4) R.rect(x0 + 3, y0 + 3, x0 + w - 3, Math.min(y0 + hv - 3, y0 + h - 3), hex('#7a1a22'));
  R.recorte([x0 + 3, y0 + 3, x0 + w - 3, y0 + hv - 3]);
  const cx = x0 + Math.round(w * 0.42), s = h / 36;
  R.disco(cx, y0 + Math.round(h * 0.66), Math.round(8 * s), hex('#d8303a')); R.disco(cx - 2, y0 + Math.round(h * 0.6), Math.round(3 * s), hex('#f05a5a'));
  R.disco(cx, y0 + Math.round(h * 0.36), Math.round(6 * s), hex('#f6f2ea')); R.disco(cx, y0 + Math.round(h * 0.3), Math.round(4 * s), hex('#f6c290'));
  R.poligono([[cx - 5 * s, y0 + h * 0.25], [cx + 5 * s, y0 + h * 0.25], [cx + 8 * s, y0 + h * 0.1], [cx, y0 + h * 0.12]], hex('#d8303a')); R.disco(Math.round(cx + 8 * s), Math.round(y0 + h * 0.1), Math.max(1, Math.round(1.5 * s)), hex('#f6f2ea'));
  R.linea(cx - 7 * s, y0 + h * 0.68, cx + 7 * s, y0 + h * 0.68, K); R.pset(cx - 1, y0 + Math.round(h * 0.29), K); R.pset(cx + 1, y0 + Math.round(h * 0.29), K);
  const bx = x0 + Math.round(w * 0.78), bb = y0 + Math.round(h * 0.86);
  if (bb < y0 + hv - 3) R.rect(bx - 2 * s, bb - 13 * s, bx + 2 * s, bb, K); if (bb < y0 + hv - 3) { R.rect(bx - 1 * s, bb - 12 * s, bx + 1 * s, bb - 1, hex('#3a1a14')); R.rect(bx - 1, bb - 13 * s - 1, bx + 1, bb - 13 * s, hex('#c8c8d0')); R.pset(bx, bb - 9 * s, hex('#c87a5a')); }
  R.recorte(null);
  if (brilla > 0 && Math.sin(brilla * 20) > -0.2) { R.linea(x0 - 1, y0 - 1, x0 + w + 1, y0 - 1, hex('#fff0a0')); R.linea(x0 - 1, y0 + h + 1, x0 + w + 1, y0 + h + 1, hex('#fff0a0')); R.linea(x0 - 1, y0, x0 - 1, y0 + h, hex('#fff0a0')); R.linea(x0 + w + 1, y0, x0 + w + 1, y0 + h, hex('#fff0a0')); }
};
// la bocanada del cambio de traje: una nube blanca que se abre y se deshace
const bocanada = (x, y, u) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < 7; k++) { const ang = k / 7 * Math.PI * 2, r = 4 + u * 10; R.disco(Math.round(x + Math.cos(ang) * r), Math.round(y + Math.sin(ang) * r * 0.7), Math.round(5 * (1 - u) + 2), k % 2 ? hex('#f2f0ec') : hex('#d8dce4')); } };

const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'salon' });
  // la niña cuelga una bola en el árbol (sube la mano, la deja, baja)
  const cu = tramo(t, 0.5, 1.3) - tramo(t, 2.0, 2.6);
  const n = R.actor(EL.nina, 104, 146, t, { dir: 1, sostiene: cu > 0 ? [116, Math.round(lerp(120, 104, cu))] : false, sonrisa: t > 1.3 && t < noHizo, sorpresa: t > noHizo && t < noHizo + 0.8 });
  if (t < 1.6 && cu > 0) { R.disco(n.mano[0] + 2, n.mano[1] + 3, 2, hex('#c8303a')); R.pset(n.mano[0] + 1, n.mano[1] + 2, hex('#ffb0b0')); }
  if (t >= 1.6) { R.disco(119, 107, 2, hex('#c8303a')); R.pset(118, 106, hex('#ffb0b0')); }
  // el chico entra por la alfombra, se para junto a la mesita y señala la botella en «Coca-Cola»; en «didn't» se asombra
  const e = tramo(t, 0.1, cola - 0.1), x = Math.round(lerp(330, 232, e));
  R.actor(EL.chico, x, 172, t, { dir: -1, anda: e > 0 && e < 1, dedo: t > cola - 0.1 && t < noHizo + 0.1, sonrisa: t < noHizo, sorpresa: t > noHizo + 0.1 && t < noHizo + 1.2, habla: t > noHizo + 1.2 && Math.sin(t * 7) > 0 });
  T.hoyDelante(R, t, { encuadre: 'salon' });
  // la botella sin etiqueta, grande en la mesita, que destella en «Coca-Cola»
  const bx = 186; T.PIEZAS_NV.botella(R, bx, 154, { s: 2 });
  if (t > cola && t < cola + 0.5) { R.pset(bx - 2, 132, hex('#ffffff')); R.linea(bx - 5, 132, bx + 1, 132, hex('#fff0a0')); R.linea(bx - 2, 129, bx - 2, 135, hex('#fff0a0')); }
  // la galleta en la mesita: mira la botella, salta y niega; la «X» roja grande sale sobre la botella en «didn't»
  const sa = tramo(t, noHizo - 0.3, noHizo) - tramo(t, noHizo, noHizo + 0.3);
  const niega = t > noHizo + 0.3 && t < noHizo + 1.3 ? (Math.sin(t * 16) > 0 ? 1 : -1) : 1;
  T.galleta(R, 152, 154 - Math.round(sa * 10), t, { cara: t > noHizo - 0.3 ? 'susto' : 'normal', dir: niega });
  const xx = tramo(t, noHizo, noHizo + 0.25);
  if (xx > 0) { const k = Math.round(lerp(1, 4, xx)); R.icono('X', bx - Math.round(2.5 * k), 140 - 6 * k, hex('#e83a3a'), K, k); }
};
// el perchero con los trajes de colores (los que Santa se va probando desaparecen de su gancho) y el espejo de pie
const percha = (x, y, c1, c2) => { R.linea(x, y - 2, x, y, K); R.rect(x - 6, y, x + 6, y + 1, hex('#5a3a22')); R.rect(x - 5, y + 2, x + 5, y + 15, K); R.rect(x - 4, y + 2, x + 4, y + 14, c1); R.rect(x + 2, y + 3, x + 4, y + 14, c2); R.rect(x - 4, y + 12, x + 4, y + 13, hex('#f6f2ea')); R.rect(x - 1, y + 3, x, y + 11, hex('#f6f2ea')); };
const TRAJES = { verde: ['#3a8a4a', '#2a6a36'], marron: ['#8a5a34', '#64401f'], azul: ['#3a5ab0', '#2a4080'], rojo: ['#d23a3a', '#a02828'] };
const p2 = (t) => {
  // las postales: rojas casi todas, y una verde, una marrón y una azul que se encienden cuando la voz las nombra
  const g = T.epoca(R, t, { encuadre: 'estudio', camara: 'tablero', postales: ['rojo', 'verde', 'rojo', 'marron', 'rojo', 'azul'], gordo: 0.8 });
  const cajas = g.postales || [];
  const marco = (i, c) => { const b = cajas[i]; if (!b) return; R.linea(b[0] - 1, b[1] - 1, b[2] + 1, b[1] - 1, c); R.linea(b[0] - 1, b[3] + 1, b[2] + 1, b[3] + 1, c); R.linea(b[0] - 1, b[1] - 1, b[0] - 1, b[3] + 1, c); R.linea(b[2] + 1, b[1] - 1, b[2] + 1, b[3] + 1, c); };
  if (t > yaRojo && t < aunque && Math.sin(t * 9) > -0.3) for (const i of [0, 2, 4]) marco(i, hex('#fff0a0'));
  if (t > verde - 0.1 && t < marron - 0.1) marco(1, hex('#fff0a0')); if (t > marron - 0.1 && t < azul - 0.1) marco(3, hex('#fff0a0')); if (t > azul - 0.1 && t < P3) marco(5, hex('#fff0a0'));
  const da = a(0.53);   // la galleta le da el traje
  const tr = t < verde ? 'rojo' : t < marron ? 'verde' : t < azul ? 'marron' : t < da + 0.15 ? 'azul' : 'rojo';
  // el perchero de madera a la izquierda (pie, barra y tres trajes colgados)
  R.rect(20, 92, 22, 162, K); R.rect(21, 92, 21, 161, hex('#7a4e2e')); R.rect(14, 160, 28, 163, K); R.rect(15, 160, 27, 162, hex('#5a3a22'));
  R.rect(20, 92, 66, 94, K); R.rect(21, 93, 65, 93, hex('#8a5a34')); R.rect(64, 92, 66, 162, K); R.rect(65, 93, 65, 161, hex('#7a4e2e')); R.rect(58, 160, 72, 163, K); R.rect(59, 160, 71, 162, hex('#5a3a22'));
  [['verde', 30, verde], ['marron', 43, marron], ['azul', 56, azul]].forEach(([c, x, tc]) => { if (t < tc - 0.15) percha(x, 95, hex(TRAJES[c][0]), hex(TRAJES[c][1])); else R.linea(x - 5, 96, x + 5, 96, hex('#8a8494')); });
  // el espejo de pie: marco de nogal y el cristal con el reflejo del traje de ahora
  R.rect(148, 104, 170, 164, K); R.rect(149, 105, 169, 158, hex('#6a4226')); R.rect(152, 108, 166, 155, hex('#a8c4d8')); R.linea(153, 109, 160, 109, hex('#e8f4ff')); R.linea(153, 109, 153, 120, hex('#e8f4ff'));
  R.rect(155, 132, 163, 150, hex(TRAJES[tr][0])); R.rect(161, 132, 163, 150, hex(TRAJES[tr][1])); R.disco(159, 126, 4, hex('#f2f0ec')); R.disco(159, 124, 2, hex('#f6c290')); R.rect(155, 119, 163, 121, hex(TRAJES[tr][0]));
  R.rect(144, 158, 174, 164, K); R.rect(145, 159, 173, 163, hex('#5a3a22'));
  // Santa: de rojo señala las postales; se prueba el verde, el marrón y el azul (bocanada a cada cambio) y pone mala
  // cara; la galleta le pasa el rojo y Santa lo celebra
  const en2 = tramo(t, P2 + 0.05, yaRojo + 0.6), sx = Math.round(lerp(196, 104, en2));
  R.actor(EL.santa, sx, 164, t, { traje: tr, anda: en2 > 0 && en2 < 1, dir: t > verde - 0.4 && t < da - 0.4 ? 1 : -1, dedo: t > yaRojo + 0.6 && t < aunque, habla: t > yaRojo + 0.6 && t < postales + 0.5 && Math.sin(t * 7) > 0, sorpresa: (t > verde && t < verde + 0.4) || (t > marron && t < marron + 0.4), triste: t > azul && t < da, sonrisa: t > da + 0.2, brazos: t > da + 0.3 && t < P3 - 0.1 });
  for (const tc of [verde, marron, azul, da + 0.15]) bocanada(sx + 7, 146, tramo(t, tc - 0.1, tc + 0.35));
  // la galleta entra corriendo por la izquierda con el traje rojo doblado sobre la cabeza, se lo tiende y Santa lo coge
  const gx = Math.round(lerp(-10, 84, tramo(t, aunque + 0.3, marron + 0.2)));
  const corre = t > aunque + 0.3 && t < marron + 0.2;
  T.galleta(R, gx, 164 - (t > da - 0.2 && t < da + 0.1 ? 4 : t > marron + 0.3 && t < da - 0.3 && Math.sin(t * 14) > 0.6 ? 1 : 0), t, { corre, cara: t > da + 0.2 ? 'feliz' : 'normal', dir: 1 });
  if (t < da + 0.1 && t > aunque + 0.3) { const ty = 164 - 17 - (t > da - 0.3 ? 5 : 0); R.rect(gx - 6, ty - 6, gx + 7, ty + 1, K); R.rect(gx - 5, ty - 5, gx + 6, ty, hex('#d23a3a')); R.rect(gx - 5, ty - 1, gx + 6, ty, hex('#f6f2ea')); R.rect(gx - 1, ty - 5, gx, ty - 1, hex('#f6f2ea')); }
};
const p3 = (t) => {
  const g = T.siglo17(R, t, { encuadre: 'escocia', camara: 'parada', bus: tramo(t, pinta - 0.4, FIN) });
  // el cartelero llega con el rollo y la brocha, pega el cartel en «1931» y lo alisa
  const e = tramo(t, P3 + 0.1, ano31 - 0.7), x = Math.round(lerp(-20, 88, e));
  const pega = tramo(t, ano31 - 0.5, ano31 + 0.5);
  const cx0 = 100, cy0 = 70;
  cartel(cx0, cy0, 40, 50, pega, tramo(t, pinta, pinta + 0.8) > 0 && t < pinta + 0.8 ? t : 0);
  const brocha = t > ano31 - 0.5 && t < pinta + 0.6;
  const m = R.actor(EL.obrero, x, 168, t, { dir: 1, anda: e > 0 && e < 1, sostiene: brocha ? [cx0 + 6 + Math.round(Math.sin(t * 10) * 4), cy0 + Math.round(lerp(4, 46, pega))] : true, sonrisa: t > pinta });
  if (brocha) { R.rect(m.mano[0] + 1, m.mano[1] - 3, m.mano[0] + 2, m.mano[1] + 2, hex('#8a5a30')); R.rect(m.mano[0] + 3, m.mano[1] - 2, m.mano[0] + 7, m.mano[1] + 1, hex('#d8d0b8')); }
  else { R.rect(m.mano[0] - 2, m.mano[1] - 2, m.mano[0] + 8, m.mano[1] + 2, K); R.rect(m.mano[0] - 1, m.mano[1] - 1, m.mano[0] + 7, m.mano[1] + 1, hex('#f2e6c8')); }
  // la cola de la parada: miran el cartel; una señora sonríe y un niño lo señala
  R.actor(EL.obreraEscocesa, 150, 168, t, { dir: -1, sonrisa: t > ano31 + 0.3, habla: t > pinta && Math.sin(t * 6) > 0.3 });
  R.actor(EL.chico, 176, 168, t, { dir: -1, dedo: t > ano31 + 0.4 && t < pinta + 1.2, sorpresa: t > ano31 + 0.2 && t < ano31 + 0.9 });
  R.actor(EL.obreroEscoces, 204, 168, t, { dir: -1, sostiene: t > pinta + 0.3 ? true : false });
  T.siglo17Delante(R, t, { encuadre: 'escocia', camara: 'parada' });
};
const p4 = (t) => {
  T.siglo17(R, t, { encuadre: 'escocia', bus: tramo(t, traje - 1.4, FIN - 0.2) });
  // los carteles: uno por «año», por las fachadas y los cierres de las tiendas, hasta llenar la calle
  const sitios = [[30, 92, 20, 26], [70, 100, 18, 24], [118, 92, 20, 26], [160, 104, 16, 20], [196, 92, 20, 26], [236, 100, 18, 24], [10, 52, 16, 20], [104, 54, 16, 20], [214, 56, 16, 20], [258, 64, 16, 20]];
  sitios.forEach(([x, y, w, h], i) => { const ti = lerp(P4 + 0.4, todas - 0.3, i / (sitios.length - 1)); cartel(x, y, w, h, tramo(t, ti, ti + 0.3), t > todas ? t : 0); });
  // la gente por la acera: el obrero con la fiambrera mira los carteles; la señora y el niño con su botella
  const e = tramo(t, P4, FIN), x = Math.round(lerp(-20, 300, e));
  R.actor(EL.obreroEscoces, x, 168, t, { dir: 1, anda: true, sorpresa: t > todas });
  const e2 = tramo(t, P4 + 0.8, FIN), x2 = Math.round(lerp(340, 60, e2));
  const m = R.actor(EL.chico, x2, 172, t, { dir: -1, anda: true, sostiene: true, sonrisa: true });
  T.PIEZAS_NV.botella(R, m.mano[0] + 1, m.mano[1] + 4, {});
  R.actor(EL.obreraEscocesa, 150, 168, t, { dir: 1, dedo: t > hasta && t < todas + 0.6, sonrisa: t > todas });
  T.siglo17Delante(R, t, { encuadre: 'escocia' });
};
const efectos = [[cola + 0.05, 'pop'], [noHizo + 0.02, 'boing'], [yaRojo + 0.1, 'brillo'], [verde - 0.05, 'pop'], [marron - 0.05, 'pop'], [azul - 0.05, 'pop'], [a(0.53) + 0.15, 'brillo'],
  [P3 + 0.3, 'carro'], [ano31 - 0.4, 'papel'], [pinta + 0.2, 'motor'], [P4 + 0.5, 'papel'], [cadaAno, 'papel'], [traje - 1.2, 'motor'], [todas, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P2 ? 2026 : t < P3 ? 1890 : t < P4 ? 1931 : Math.round(lerp(1931, 1964, tramo(t, P4 + 0.4, todas))) });
''')

E['nv-calendario'] = ('La fecha', '''// NV-CALENDARIO (frase 11), cartela «354», barra 354. Cuatro planos:
// 1. la Biblia abierta (inserto): el dedo recorre los renglones buscando la fecha y no la hay: «?» en «never says», y
//    el calendario de la mesa con la hoja en blanco (corta en «and the first»);
// 2. el scriptorium romano: el calígrafo pinta el calendario; en «354» sale el número; entra el cristiano rico de toga
//    con la bolsa en «made for a wealthy Christian» y se la tiende (corta tras «Christian»);
// 3. la hoja del calendario de cerca: la mano llega a la casilla del 25 en «December 25th», se enciende la estrella en
//    «Bethlehem» y, en «that same day», el sol a la vez (corta en «same day»);
// 4. el templo del Sol al alba: la fiesta del Sol Invicto; la gente con antorchas sube y en «Sun» el disco de la puerta
//    se enciende y alza los brazos.''', r'''
const a = (f) => en('fecha', f);
const P2 = a(0.211), P3 = a(0.566), P4 = a(0.866), FIN = E.duracion;
const biblia = a(0.082), nunca = a(0.097), nacio = a(0.179), romano = a(0.346), ano354 = a(0.42), hecho = a(0.489), rico = a(0.514);
const dic = a(0.618), cristo = a(0.681), belen = a(0.729), libro = a(0.781), mismo = a(0.849), fiesta = a(0.9), sol = a(0.975);
const K = T.C.k;
const p1 = (t) => {
  const g = T.epoca(R, t, { encuadre: 'copista', camara: 'pagina', ji: 0 });
  // el dedo recorre los últimos renglones de la página de la izquierda, buscando la fecha, y se aparta en «born»
  const u = tramo(t, 0.3, nunca + 0.3), fila = Math.min(2, Math.floor(u * 3)), fr = (u * 3) % 1, sale = tramo(t, nacio - 0.2, nacio + 0.5);
  const tx = Math.round(lerp(u >= 1 ? 150 : lerp(52, 150, fr), 330, sale)), ty = Math.round(lerp(122 + fila * 12, 210, sale));
  T.brazo(R, tx + 34, 204, tx + 13, ty + 3, '#7a5a3a', -1, { codo: [tx + 30, Math.round(lerp(ty, 204, 0.5))], puno: '#e8dcc0' });
  // donde iría la fecha, el recuadro azul vacío: el «?» dorado grande que salta y tiembla en «never says»
  const q = tramo(t, nunca, nunca + 0.3); if (q > 0) { const k = Math.round(lerp(2, 5, q)); R.icono('?', 214 - Math.round(2.5 * k) + Math.round(Math.sin(t * 12) * 0.7), 98 - Math.round(3.5 * k), hex('#f0c040'), K, k); }
  // el calendario de la mesa: la hoja en blanco con un «?» en lugar del día, que cae en «born»
  const c = tramo(t, nacio - 0.6, nacio);
  if (c > 0) { T.PIEZAS_NV.calendario(R, 252, Math.round(lerp(130, 176, c)), { s: 2 }); if (c >= 1) R.icono('?', 247, 146, hex('#c8303a'), K, 2); }
};
const p2 = (t) => {
  const g = T.roma(R, t, { encuadre: 'scriptorium' });
  // el calígrafo pinta (la mano va y viene sobre la hoja) y se vuelve a saludar al cliente
  const viene = tramo(t, hecho - 1.4, rico), tiende = t > rico + 0.2;
  R.actor(EL.caligrafo, 182, 158, t, { dir: -1, sostiene: t < rico ? [150 + Math.round(Math.sin(t * 9) * 4), 138 + Math.round(Math.cos(t * 6))] : (tiende ? [168, 128] : false), sonrisa: t > rico, habla: t > rico && Math.sin(t * 7) > 0.3 });
  // el 354 que sale sobre el pupitre
  const n = tramo(t, ano354, ano354 + 0.3) - tramo(t, hecho - 0.8, hecho - 0.4);
  if (n > 0) R.numero('354', 141, Math.round(lerp(128, 118, n)), { tam: 16, centro: true });
  // el cristiano rico entra por la izquierda con la bolsa, se para ante el pupitre y la tiende
  const x = Math.round(lerp(-20, 100, viene));
  if (viene > 0) { const m = R.actor(EL.cristianoRico, x, 158, t, { dir: 1, anda: viene > 0 && viene < 1, sostiene: tiende ? [x + 18, 130] : true, sonrisa: tiende });
    T.PIEZAS_NV.bolsa(R, m.mano[0] + 1, m.mano[1] + 5, {}); }
  T.romaDelante(R, t, { encuadre: 'scriptorium' });
};
const p3 = (t) => {
  const esc = lerp(0.68, 1, tramo(t, P3 + 0.2, dic + 0.2)), br = tramo(t, libro, libro + 0.6);
  const g = T.roma(R, t, { encuadre: 'scriptorium', camara: 'mesa', escrito: esc, brilla: br });
  const fy = g.fila || ((r) => r < 24 ? 48 + r * 3 : r === 24 ? 120 : 130 + (r - 25) * 3);
  // la estrella sola se enciende primero, en «Bethlehem»
  const es = tramo(t, cristo, belen);
  if (es > 0 && br === 0) { for (let r = 2; r <= 4 + es * 5; r++) for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 + t; if ((k + r) % 3 === 0) R.pset(Math.round(221 + Math.cos(an) * r), Math.round(123 + Math.sin(an) * r * 0.8), hex('#fff0a0')); } R.rect(220, 121, 222, 125, hex('#f0c040')); R.rect(219, 123, 223, 123, hex('#f0c040')); }
  // la mano con el cálamo escribe la columna de diciembre renglón a renglón, llega al 25 en «December 25th», lo señala
  // y se aparta en «Christ»
  const r = Math.min(31, Math.round(esc * 31)), sale = tramo(t, cristo - 0.2, cristo + 0.5);
  const tx = Math.round(lerp(r >= 25 && r < 31 ? 224 : 220 + Math.sin(t * 14) * 3, 330, sale)), ty = Math.round(lerp(r >= 25 && t > dic ? 124 : fy(Math.max(0, r - 1)), 200, sale));
  const fx = tx + 14, fyy = ty + 12;
  R.linea(tx, ty, fx, fyy, hex('#c8b070')); R.linea(tx + 1, ty, fx + 1, fyy, hex('#8a7040')); R.pset(tx, ty, K);
  T.brazo(R, fx + 34, 204, fx + 13, fyy + 2, '#e8dcc0', -1, { codo: [fx + 32, Math.round(lerp(fyy, 204, 0.5))] });
  T.romaDelante(R, t, { encuadre: 'scriptorium', camara: 'mesa' });
};
const p4 = (t) => {
  const g = T.roma(R, t, { encuadre: 'templo' });
  // el disco del Sol de la puerta se enciende en «Sun»
  const s = tramo(t, sol - 0.3, sol + 0.2);
  if (s > 0) for (let r = 4; r < 4 + s * 14; r += 2) for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2 + t * 0.6; if ((k + r) % 2 === 0) R.pset(Math.round(165 + Math.cos(an) * r), Math.round(86 + Math.sin(an) * r), hex('#fff0a0')); }
  // la gente de la fiesta: dos que suben con antorchas, una romana con laurel y uno que alza los brazos en «Sun»
  const u = tramo(t, P4 + 0.1, sol - 0.2);
  const m1 = R.actor(EL.romanoPileo, Math.round(lerp(40, 112, u)), 166, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, brazos: t > sol, sonrisa: true });
  if (!(t > sol)) { R.rect(m1.mano[0], m1.mano[1] - 8, m1.mano[0] + 1, m1.mano[1] + 2, hex('#6a4422')); R.disco(m1.mano[0], m1.mano[1] - 10, 2, hex('#f0a040')); R.pset(m1.mano[0], m1.mano[1] - 13 + (Math.sin(t * 20) > 0 ? 0 : 1), hex('#fff0a0')); }
  const m2 = R.actor(EL.romanoPileo2, Math.round(lerp(290, 218, u)), 166, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, brazos: t > sol + 0.1, sonrisa: true });
  if (!(t > sol + 0.1)) { R.rect(m2.mano[0], m2.mano[1] - 8, m2.mano[0] + 1, m2.mano[1] + 2, hex('#6a4422')); R.disco(m2.mano[0], m2.mano[1] - 10, 2, hex('#f0a040')); R.pset(m2.mano[0], m2.mano[1] - 13 + (Math.sin(t * 21) > 0 ? 0 : 1), hex('#fff0a0')); }
  R.actor(EL.romana, 160, 172, t, { dir: -1, dedo: t > fiesta && t < sol, brazos: t > sol + 0.2, sonrisa: true });
  R.actor(EL.cristianoRico, 252, 174, t, { dir: -1, sorpresa: t > sol, habla: t > fiesta && t < sol && Math.sin(t * 7) > 0 });
};
const efectos = [[0.5, 'papel'], [nunca + 0.05, 'pop'], [nacio, 'golpecito'], [P2 + 0.4, 'lapiz'], [ano354, 'brillo'], [hecho - 1.2, 'puerta'], [rico + 0.3, 'toc'],
  [P3 + 0.3, 'lapiz'], [belen, 'brillo'], [libro + 0.1, 'campana'], [P4 + 0.3, 'publico'], [sol, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '354', efectos, año: 354 });
''')
