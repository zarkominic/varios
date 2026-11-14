E = {}

# utilidades comunes de este grupo (cada escena las lleva dentro: no hay fichero compartido)
HELP = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const CAPAS = {};
// un fondo fijo en su búfer (se pinta una vez y se copia entero en cada fotograma)
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const K = hex('#1a1420');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tramado = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1); for (let x = x0; x <= x1; x++) { const k = Math.min(cols.length - 1, Math.floor(u + BAY[(y & 3) * 4 + (x & 3)] / 16)); R.pset(x, y, cols[k]); } } };
const BOLAS = [[-14, 2, 5], [-7, -1, 7], [2, -3, 8], [11, 0, 6], [18, 2, 4], [-19, 3, 3]];
const nube = (cx, cy, s, tonos) => tonos.forEach((c, k) => { for (const [dx, dy, r] of BOLAS) R.disco(cx + dx * s, cy + dy * s - k * 1.5 * s, Math.max(1, r * s - k * 1.25 * s), c); });
// madera con vetas: tablas verticales (vert) u horizontales de ancho a
const madera = (x0, y0, x1, y1, cols, a = 9, vert = false, sem = 1) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const p = vert ? x - x0 : y - y0, q = vert ? y : x, tabla = Math.floor(p / a), en = p % a;
    let k = 1 + (h(tabla, sem, 3) > 0.6 ? 1 : 0);
    const veta = Math.sin(q * 0.11 + tabla * 2.3 + Math.sin(q * 0.031 + tabla) * 3 + en * 0.9);
    if (veta > 0.82) k = Math.max(0, k - 1); else if (veta < -0.9) k = Math.min(cols.length - 1, k + 1);
    if (en === 0) k = 0; else if (en === 1) k = Math.min(cols.length - 1, k + 1);
    if (h(q >> 2, tabla, sem + 7) < 0.012) k = 0;   // un nudo
    R.pset(x, y, cols[k]);
  }
};
// azulejos de İznik (10 px): flor turquesa con corazón rojo, hojas azules, juntas
const izn = (x0, y0, x1, y1, P) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = (x - x0) % 10, j = (y - y0) % 10, dx = i - 5, dy = j - 5, d = Math.abs(dx) + Math.abs(dy);
    let c = P.bl;
    if (i === 0 || j === 0) c = P.ju;
    else if (d === 0) c = P.ro;
    else if (d <= 2) c = P.tu;
    else if (d === 3 && (dx === 0 || dy === 0)) c = P.az;
    else if ((i === 1 || i === 9) && (j === 1 || j === 9)) c = P.az;
    else if ((i === 2 || i === 8) && (j === 2 || j === 8)) c = P.ve;
    else if (h(x, y, 5) < 0.04) c = P.bs;
    R.pset(x, y, c);
  }
};
// un estante de libros (lomos de colores, legajos atados, rollos)
const libros = (x0, y0, x1, y1, sem, P) => {
  let x = x0;
  while (x < x1 - 1) {
    const r = h(x, sem, 11);
    if (r < 0.12 && x + 12 < x1) {   // legajo tumbado: papeles con su cinta
      const al = 6 + Math.floor(h(x, sem, 12) * 4);
      for (let k = 0; k < al; k++) { R.rect(x, y1 - k, x + 11, y1 - k, k % 2 ? P.pa : P.pa2); }
      R.rect(x + 5, y1 - al + 1, x + 5, y1, P.cin); R.rect(x, y1 - al, x + 11, y1 - al, K);
      x += 13; continue;
    }
    if (r < 0.2 && x + 6 < x1) {   // rollos con la boca redonda
      for (let k = 0; k < 2; k++) { R.disco(x + 2 + k * 3, y1 - 2 - k * 3, 2, K); R.disco(x + 2 + k * 3, y1 - 2 - k * 3, 1, P.pa); R.pset(x + 2 + k * 3, y1 - 2 - k * 3, P.pa2); }
      x += 7; continue;
    }
    const w = 2 + Math.floor(h(x, sem, 13) * 3), al = Math.min(y1 - y0, 9 + Math.floor(h(x, sem, 14) * 6)), c = P.lomos[Math.floor(h(x, sem, 15) * P.lomos.length)];
    const incl = h(x, sem, 16) < 0.08;
    R.rect(x, y1 - al, x + w - 1, y1, c); R.rect(x, y1 - al, x, y1, mez(c, K, 0.4)); R.rect(x + w - 1, y1 - al, x + w - 1, y1, mez(c, K, 0.25));
    R.rect(x, y1 - al, x + w - 1, y1 - al, mez(c, hex('#ffffff'), 0.25));
    if (al > 10) { R.rect(x, y1 - al + 2, x + w - 1, y1 - al + 2, P.oro); R.rect(x, y1 - 3, x + w - 1, y1 - 3, P.oro); }
    x += w + (incl ? 1 : 0);
  }
};
const cifra = (s, x, y, o = {}) => R.numero(String(s), x, y, { centro: true, ...o });
// una hoja que vuela, de 4 × 3, que gira (fase)
const hoja = (x, y, fase, c1, c2) => { x = Math.round(x); y = Math.round(y); const f = Math.floor(fase) % 3;
  if (f === 0) { R.rect(x - 2, y - 1, x + 2, y + 1, K); R.rect(x - 1, y, x + 1, y, c1); R.pset(x + 1, y, c2); }
  else if (f === 1) { R.rect(x - 1, y - 2, x + 1, y + 2, K); R.rect(x, y - 1, x, y + 1, c1); }
  else { R.linea(x - 2, y + 1, x + 2, y - 1, K); R.pset(x, y, c1); R.pset(x - 1, y, c2); } };
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-palacio'] = ('Palacio', '''// PR-PALACIO (frase 4), 1929, cartela «1929». Cinco planos:
// 1. (0 → «where») el patio de Topkapı en otoño: en «autumn» una ráfaga arranca hojas al plátano; dos mozos cruzan el
//    paseo con un cajón de museo y lo posan en «Topkapı»; en «Istanbul» una bandada de palomas levanta el vuelo.
// 2. («where» → «and») LOCAL el salón del trono: en «centuries» un mozo tira de la sábana y aparece el trono de oro; en
//    «museum» engancha el cordón entre dos postes y cuelga la chapa «1»; la mujer de la limpieza quita el polvo.
// 3. («and» → «library») la biblioteca: en «director» entra Edhem (traje, bigote blanco, sombrero de ala) con Deissmann
//    detrás; en «Halil Edhem» se vuelve y sonríe; en «library» señala las estanterías; el archivero baja libros de la
//    escalera.
// 4. («library» → «Among») LOCAL el depósito abovedado: Edhem alumbra con su linterna y Deissmann (gafas, barba blanca,
//    tres piezas) levanta la tapa del cofre en «German scholar»: polvo y un ratón que huye; en «Deissmann» saca un legajo.
// 5. («Among» → fin) LOCAL la sala de los papeles olvidados: Edhem rebusca entre pilas de libros, vuelan hojas; en
//    «found» saca el pergamino doblado y en «parchment» lo levanta en el haz de luz; Deissmann «!»; cae un libro.''', HELP + r'''
const pa = (f) => en('palacio', f);
const P2 = pa(0.245), P3 = pa(0.437), P4 = pa(0.630), P5 = pa(0.799);
const otono = pa(0.046), estambulW = pa(0.134), topkapi = pa(0.195), siglos = pa(0.314), museo = pa(0.400);
const director = pa(0.447), halil = pa(0.530), biblio = pa(0.617), aleman = pa(0.662), deiss = pa(0.755);
const pilas = pa(0.806), papeles = pa(0.875), hallo = pa(0.927), perg = pa(0.963);
const CREMA = hex('#f2e6c8'), CREMA2 = hex('#d8c8a0'), ORO = hex('#e8b830'), ORO2 = hex('#b07a18'), ORO3 = hex('#fff0a0');
const PI = { bl: hex('#f4f0e4'), ju: hex('#c8c0b0'), ro: hex('#c83a2a'), tu: hex('#3aa8a8'), az: hex('#2a4a9a'), ve: hex('#4a8a4a'), bs: hex('#e0d8c8') };
const PL = { pa: hex('#efe2c0'), pa2: hex('#cdb98e'), cin: hex('#b03424'), oro: hex('#e0b040'), lomos: ['#8a2a2a', '#2a4a7a', '#3a6a3a', '#7a5a2a', '#5a2a5a', '#a86a2a', '#2a5a5a', '#6a6a6a'].map(hex) };
const MAD = ['#3a2010', '#5e3a1c', '#7a4e26', '#946436'].map(hex);

// 1 · el patio del palacio en otoño: los mozos con el cajón y las palomas
const p1 = (t) => {
  const o = { encuadre: 'palacio' };
  T.estambul(R, t, o);
  // los mozos: entran por la derecha con el cajón, lo posan en «Topkapı» y se secan la frente
  const u = tramo(t, 1.0, topkapi - 0.1), posado = t > topkapi - 0.1;
  const x1 = Math.round(lerp(330, 166, u)), x2 = x1 + 40;
  const cy = posado ? 160 - 12 : 160 - 18 + (Math.floor(t * 5) % 2);
  // el cajón de madera con sus listones y su número de inventario en tiza
  const cx0 = x1 + 12, cx1 = x1 + 38;
  R.rect(cx0 - 1, cy - 1, cx1 + 1, cy + 12, K); madera(cx0, cy, cx1, cy + 11, MAD, 4, false, 3);
  R.rect(cx0, cy, cx1, cy + 1, MAD[3]); R.rect(cx0, cy + 10, cx1, cy + 11, MAD[0]); R.linea(cx0 + 1, cy + 2, cx1 - 1, cy + 9, MAD[0]);
  R.rect(cx0 + 10, cy + 4, cx0 + 15, cy + 7, hex('#f4ecd8')); R.rect(cx0 + 11, cy + 5, cx0 + 14, cy + 6, hex('#3a3a4a'));
  if (posado) for (let i = 0; i < 6; i++) { const d = tramo(t, topkapi - 0.1, topkapi + 0.6); if (d < 1) R.pset(cx0 - 2 - i * 2 * d, 159 - (i & 1), hex('#d8ccb0')), R.pset(cx1 + 2 + i * 2 * d, 159 - (i & 1), hex('#d8ccb0')); }
  const anda = u > 0 && u < 1;
  R.actor(EL.obrero, x1, 160, t, { dir: -1, anda, sostiene: posado ? undefined : [cx0 + 1, cy + 3], sonrisa: posado, dedo: posado && t > topkapi + 0.5 && t < topkapi + 1.2 });
  R.actor(EL.estibador, x2, 160, t, { dir: -1, anda, sostiene: posado ? undefined : [cx1 - 1, cy + 3], brazos: posado && t > topkapi + 0.3 && t < topkapi + 0.9 });
  // el jardinero con el rastrillo a la izquierda, que amontona hojas
  const jx = 66 + Math.round(Math.sin(t * 0.6) * 6), jr = R.actor(EL.obreroEscoces ?? EL.obrero, jx, 162, t, { dir: 1, sostiene: [jx + 22, 160] });
  if (jr && jr.mano) { R.linea(jr.mano[0], jr.mano[1], jr.mano[0] + 9 + Math.round(Math.sin(t * 3) * 3), 161, MAD[1]); R.rect(jr.mano[0] + 6 + Math.round(Math.sin(t * 3) * 3), 160, jr.mano[0] + 14 + Math.round(Math.sin(t * 3) * 3), 161, hex('#5a5a5a')); }
  for (let k = 0; k < 18; k++) R.pset(jx + 24 + (k * 5) % 13, 160 - (k % 3), [hex('#d86a1a'), hex('#e8a030'), hex('#a8481a')][k % 3]);
  // la bandada de palomas que se levanta en «Istanbul»
  for (let k = 0; k < 6; k++) {
    const v = tramo(t, estambulW + k * 0.06, estambulW + 1.6 + k * 0.06), px = 226 + k * 9 - v * (30 + k * 12), py = 163 - (k % 2) * 3 - v * v * (120 - k * 8);
    if (v <= 0) { R.rect(226 + k * 9, 161 - (k % 2) * 3, 228 + k * 9, 162 - (k % 2) * 3, hex('#8a8a96')); R.pset(229 + k * 9, 161 - (k % 2) * 3, K); continue; }
    if (v < 1 && py > 0) { const ala = Math.sin(t * 22 + k) > 0; R.rect(Math.round(px), Math.round(py), Math.round(px) + 2, Math.round(py) + 1, hex('#9a9aa6')); R.pset(Math.round(px) - 1 + (ala ? 0 : 4), Math.round(py) - (ala ? 2 : 1), hex('#c8c8d0')); R.pset(Math.round(px) + 1, Math.round(py) - (ala ? 2 : 0), hex('#6a6a76')); }
  }
  // la ráfaga de «autumn»: un remolino de hojas sale del plátano y cruza el patio
  const g = tramo(t, otono - 0.1, otono + 2.4);
  if (g > 0 && g < 1) for (let k = 0; k < 26; k++) { const s = g * (1.2 + h(k, 1) * 0.6) - h(k, 2) * 0.3; if (s < 0 || s > 1) continue;
    const x = 30 + s * (240 + h(k, 3) * 60), y = 70 + h(k, 4) * 60 + Math.sin(s * 9 + k) * 10 + s * 30;
    hoja(x, y, t * 8 + k, [hex('#e8781a'), hex('#f0b030'), hex('#b8461a')][k % 3], hex('#fff0a0')); }
  T.estambulDelante(R, t, o);
};

// 2 · LOCAL el salón del trono: la sábana fuera en «centuries», el cordón y la chapa «1» en «museum»
const fondoTrono = () => {
  // el techo de madera con vigas pintadas (tranquilo arriba a la derecha)
  madera(0, 0, 319, 15, ['#2a160c', '#3e2414', '#4e2e1a', '#5a361e'].map(hex), 5, false, 8);
  for (let x = 6; x < 270; x += 26) { R.rect(x, 0, x + 3, 15, hex('#1e100a')); R.rect(x + 1, 2, x + 2, 13, hex('#6a3a1e')); R.pset(x + 1, 6, ORO2); R.pset(x + 2, 10, ORO2); }
  // el friso azul con arabescos de oro
  R.rect(0, 16, 319, 23, hex('#1e3a7a')); R.rect(0, 16, 319, 16, ORO2); R.rect(0, 23, 319, 23, ORO2);
  for (let x = 0; x < 320; x += 12) { R.linea(x, 21, x + 4, 18, ORO); R.linea(x + 4, 18, x + 8, 21, ORO); R.pset(x + 10, 19, hex('#c83a2a')); R.pset(x + 2, 20, hex('#5ab8c8')); }
  // la pared de yeso crema con motivos pintados
  for (let y = 24; y < 94; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 9) < 0.5 ? CREMA : mez(CREMA, CREMA2, 0.35));
  for (let y = 30; y < 90; y += 14) for (let x = 8 + ((y / 14) % 2) * 9; x < 272; x += 18) { R.pset(x, y, hex('#5ab8c8')); R.pset(x - 1, y + 1, hex('#3a8a4a')); R.pset(x + 1, y + 1, hex('#3a8a4a')); R.pset(x, y + 2, hex('#c83a2a')); }
  // dos ventanas en arco con vidrieras de colores
  for (const wx of [18, 236]) {
    R.rect(wx - 2, 30, wx + 34, 90, hex('#8a6a3a')); R.disco(wx + 16, 36, 19, hex('#8a6a3a'));
    R.rect(wx, 36, wx + 32, 88, K); R.disco(wx + 16, 36, 16, K);
    for (let y = 21; y < 88; y++) for (let x = wx + 1; x < wx + 32; x++) { if (y < 36 && Math.hypot(x - wx - 16, y - 36) > 15) continue;
      const i = Math.floor((x - wx - 1) / 5), j = Math.floor((y - 21) / 6), borde = (x - wx - 1) % 5 === 0 || (y - 21) % 6 === 0;
      R.pset(x, y, borde ? hex('#3a2a1a') : ['#e8d070', '#5ab8c8', '#c84a3a', '#f4ecc8', '#4a9a5a', '#f4ecc8'].map(hex)[(i * 3 + j * 2) % 6]); }
    R.rect(wx - 3, 88, wx + 35, 91, hex('#b8a888')); R.rect(wx - 3, 91, wx + 35, 91, hex('#6a5a3a'));
  }
  // el zócalo de İznik, con su moldura
  izn(0, 94, 319, 127, PI); R.rect(0, 92, 319, 93, ORO2); R.rect(0, 128, 319, 129, hex('#3a2a1a'));
  // el suelo de mármol con vetas y la alfombra grande
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const lo = (Math.floor((x + (y >> 4) * 11) / 22) + (y >> 4)) % 2; let c = lo ? hex('#e4dccc') : hex('#d0c6b2'); if ((x + (y >> 4) * 11) % 22 === 0 || y % 16 === 2) c = hex('#a89c88'); if (Math.sin(x * 0.2 + y * 0.5 + Math.sin(y * 0.3) * 2) > 0.94) c = hex('#bcb09c'); R.pset(x, y, c); }
  R.poligono([[60, 140], [260, 140], [300, 179], [20, 179]], (x, y) => { const bx = Math.min(x - (60 - (y - 140)), (260 + (y - 140)) - x, y - 140, 179 - y); if (bx < 3) return hex('#2a3a6a'); if (bx < 6) return (x + y) % 4 < 2 ? hex('#e8b830') : hex('#2a3a6a'); const cx = Math.abs(x - 160) / 50 + Math.abs(y - 160) / 12; if (cx < 1) return cx < 0.5 ? hex('#e8b830') : hex('#2a3a6a'); return (x * 3 + y * 5) % 11 === 0 ? hex('#e8a040') : (x + y) % 7 === 0 ? hex('#8a1a1a') : hex('#a82a24'); });
  // dos hornacinas con jarrones de porcelana y un espejo dorado entre ellas
  for (const nx of [70, 196]) { R.rect(nx, 46, nx + 26, 86, ORO2); R.disco(nx + 13, 46, 13, ORO2); R.rect(nx + 2, 48, nx + 24, 86, hex('#3a5a7a')); R.disco(nx + 13, 47, 11, hex('#3a5a7a'));
    for (let y = 36; y < 86; y++) for (let x = nx + 2; x < nx + 25; x++) if ((y > 47 || Math.hypot(x - nx - 13, y - 47) < 11) && (x + y) % 5 === 0) R.pset(x, y, hex('#4a6a8a'));
    R.rect(nx + 2, 66, nx + 24, 67, ORO2);
    for (const [vx, vy, vr] of [[nx + 8, 60, 4], [nx + 18, 61, 3], [nx + 13, 80, 5]]) { R.disco(vx, vy, vr + 1, K); R.disco(vx, vy, vr, hex('#f4f4fa')); R.rect(vx - 1, vy - vr - 2, vx + 1, vy - vr, K); R.pset(vx, vy - vr - 1, hex('#f4f4fa')); R.rect(vx - vr + 1, vy, vx + vr - 1, vy, hex('#2a4a9a')); R.pset(vx - 1, vy - 1, hex('#ffffff')); } }
  // el tapiz colgado detrás del trono
  R.rect(128, 34, 192, 92, K); R.rect(129, 35, 191, 91, hex('#7a1a24'));
  for (let y = 38; y < 90; y += 4) for (let x = 132; x < 190; x += 4) R.pset(x + ((y >> 2) & 1) * 2, y, hex('#c8902a'));
  R.rect(129, 35, 191, 37, ORO2); for (let x = 130; x < 191; x += 3) R.rect(x, 91, x, 94, ORO);
  // el turbante de un sultán en su soporte, y el arcón dorado de la derecha
  R.rect(212, 112, 214, 140, MAD[0]); R.rect(206, 140, 220, 142, MAD[1]);
  R.disco(213, 104, 8, K); R.disco(213, 104, 7, hex('#f4f0e4')); for (let k = -6; k <= 6; k += 3) R.linea(213 + k, 98, 213 + k + 2, 110, hex('#d8d0c0')); R.rect(209, 92, 217, 98, hex('#c83a2a')); R.pset(213, 101, ORO); R.pset(213, 100, hex('#3aa83a'));
  // la lámpara de aceite colgada, a la izquierda
  R.linea(112, 24, 112, 40, hex('#5a4a2a')); R.disco(112, 46, 6, ORO2); R.disco(112, 45, 5, ORO); R.rect(108, 40, 116, 42, ORO2); R.pset(110, 44, ORO3); for (let k = 0; k < 3; k++) R.pset(108 + k * 4, 53, hex('#c83a2a'));
};
const trono = (bril) => {
  R.rect(124, 128, 196, 138, K); R.rect(125, 129, 195, 137, MAD[1]); R.rect(125, 129, 195, 130, ORO); for (let x = 128; x < 194; x += 8) R.rect(x, 132, x + 4, 135, ORO2);
  for (const px of [134, 184]) { R.rect(px, 70, px + 3, 128, K); R.rect(px + 1, 71, px + 2, 127, ORO); R.pset(px + 1, 80, hex('#c83a2a')); R.pset(px + 1, 100, hex('#3aa83a')); }
  for (let y = 46; y <= 72; y++) { const w = Math.round(Math.sqrt(Math.max(0, 26 * 26 - (72 - y) ** 2))); R.rect(160 - w, y, 160 + w, y, K); if (w > 1) R.rect(161 - w, y, 159 + w, y, (y + Math.floor((160 - w) / 3)) % 5 === 0 ? ORO2 : y < 56 ? ORO3 : ORO); }
  R.rect(132, 70, 188, 73, ORO2);
  for (let x = 134; x < 188; x += 3) R.rect(x, 74, x, 77, ORO);
  R.rect(158, 42, 162, 47, K); R.disco(160, 44, 2, ORO3);
  for (let k = 0; k < 5; k++) R.pset(146 + k * 7, 60 - (k % 2) * 3, k % 2 ? hex('#c83a2a') : hex('#3aa83a'));
  R.rect(140, 104, 180, 128, K); R.rect(141, 105, 179, 127, ORO); R.rect(141, 105, 179, 107, ORO3); R.rect(141, 120, 179, 127, ORO2);
  for (let x = 144; x < 178; x += 6) { R.pset(x, 112, hex('#c83a2a')); R.pset(x + 3, 116, hex('#3aa83a')); R.pset(x + 1, 111, ORO3); }
  R.rect(144, 96, 176, 106, K); R.rect(145, 97, 175, 105, hex('#b82a2a')); R.rect(145, 97, 175, 98, hex('#e85a4a'));
  if (bril > 0) for (let k = 0; k < 8; k++) { const a = k * 0.785 + bril * 2, r = 30 * bril + 6; const x = Math.round(160 + Math.cos(a) * r), y = Math.round(104 + Math.sin(a) * r * 0.7); R.rect(x, y - 1, x, y + 1, ORO3); R.rect(x - 1, y, x + 1, y, ORO3); }
};
const p2 = (t) => {
  capa('trono', fondoTrono);
  // la luz de las vidrieras sobre el suelo
  R.poligono([[34, 92], [52, 92], [120, 179], [80, 179]], (x, y) => mez(R.pget(x, y), hex('#fff4d0'), 0.22));
  for (let k = 0; k < 10; k++) { const u = (t * 0.05 + k * 0.1) % 1, y = Math.round(92 + u * 86), x = Math.round(40 + (y - 92) * 0.6 + Math.sin(t + k) * 4 + (k % 3) * 6); R.pset(x, y, hex('#fffbe8')); }
  const tira = tramo(t, siglos - 0.15, siglos + 0.45);
  trono(t > siglos ? Math.min(1, (t - siglos) * 1.5) * (t < siglos + 1.4 ? 1 : 0) : 0);
  // la sábana que lo tapa y se va hacia la derecha cuando el mozo tira
  if (tira < 1) {
    const dx = tira * 70, enc = tira * 0.6;
    R.poligono([[130 + dx, 44 + enc * 60], [190 + dx, 44 + enc * 70], [200 + dx, 138], [120 + dx + enc * 40, 138]].map(([x, y]) => [Math.round(x), Math.round(y)]), (x, y) => (x + y * 2) % 13 === 0 ? hex('#d8d8d0') : (y % 9 === 0) ? hex('#e0e0d8') : hex('#f4f4ee'));
    for (let k = 0; k < 4; k++) R.linea(Math.round(140 + dx + k * 14), Math.round(50 + enc * 60), Math.round(136 + dx + k * 16 + enc * 30), 136, hex('#c8c8c0'));
  } else {
    // la sábana arrugada en el suelo
    R.poligono([[228, 162], [262, 160], [270, 170], [222, 171]], hex('#f4f4ee')); R.linea(232, 165, 260, 163, hex('#c8c8c0')); R.linea(236, 168, 264, 167, hex('#d8d8d0'));
  }
  // los dos postes de latón y el cordón que se engancha en «museum»
  for (const px of [104, 216]) { R.rect(px - 1, 140, px + 1, 166, K); R.rect(px, 141, px, 165, ORO); R.disco(px, 139, 2, ORO2); R.pset(px, 138, ORO3); R.rect(px - 4, 166, px + 4, 168, ORO2); }
  const cuelga = tramo(t, museo - 0.6, museo);
  if (cuelga > 0) { const xe = Math.round(lerp(104, 216, cuelga)); for (let x = 104; x <= xe; x++) { const s = (x - 104) / 112, y = Math.round(142 + Math.sin(s * Math.PI) * 9 * (cuelga)); R.pset(x, y, hex('#a81a1a')); R.pset(x, y + 1, hex('#5a0a0a')); } }
  if (t > museo) { const sw = Math.round(Math.sin((t - museo) * 6) * Math.exp(-(t - museo) * 1.5) * 3); const cx = 160 + sw; R.linea(160, 151, cx, 155, K); R.rect(cx - 6, 155, cx + 6, 165, K); R.rect(cx - 5, 156, cx + 5, 164, hex('#f4ecd8')); R.rect(cx - 5, 164, cx + 5, 164, hex('#c8b890')); cifra('1', cx + 1, 164); }
  // el mozo: tira de la sábana, la deja y va a enganchar el cordón
  const v = tramo(t, siglos + 0.5, museo - 0.7), wx = t < siglos + 0.5 ? Math.round(lerp(200, 206, tira)) : Math.round(lerp(206, 112, v));
  R.actor(EL.obrero, wx, 170, t, { dir: t < siglos + 0.5 ? 1 : -1, anda: v > 0 && v < 1, sostiene: t < siglos + 0.4 ? [wx + 16, 150] : t > museo - 0.8 && t < museo + 0.2 ? [wx - 2 + Math.round(cuelga * 30), 146] : undefined, sorpresa: t > siglos + 0.1 && t < siglos + 0.6, sonrisa: t > museo });
  // la mujer de la limpieza con el plumero, junto al turbante
  const lx = 238, pl = R.actor(EL.operaria ?? EL.obrera, lx, 150, t, { dir: -1, sostiene: [lx - 10, 112 + Math.round(Math.sin(t * 7) * 4)], sorpresa: t > siglos && t < siglos + 0.8 });
  if (pl && pl.mano) { const [mx, my] = pl.mano; R.linea(mx, my, mx - 5, my - 6, MAD[1]); for (let k = 0; k < 5; k++) R.pset(mx - 6 - (k % 3), my - 7 - Math.floor(k / 2), [hex('#c84a3a'), hex('#e8b830'), hex('#3a6aa8')][k % 3]); if (Math.sin(t * 7) > 0.5) for (let k = 0; k < 3; k++) R.pset(mx - 10 - k * 2, my - 4 + k, hex('#e8e0c8')); }
};

// 3 · la biblioteca: entran Edhem y Deissmann; el archivero en la escalera
const p3 = (t) => {
  const o = { encuadre: 'biblioteca' };
  T.estambul(R, t, o);
  // el archivero en la escalera, que saca un libro y lo deja en la pila de abajo
  const lev = Math.sin(t * 2.2) > 0;
  const ar = R.actor(EL.archivista ?? EL.bibliotecaria, 170, 108, t, { dir: -1, sostiene: lev ? [158, 86] : [160, 98] });
  if (ar && ar.mano) { R.rect(ar.mano[0] - 3, ar.mano[1] - 5, ar.mano[0] + 1, ar.mano[1] + 1, K); R.rect(ar.mano[0] - 2, ar.mano[1] - 4, ar.mano[0], ar.mano[1], hex('#2a4a7a')); }
  // Edhem entra en «director» y Deissmann detrás
  const u = tramo(t, director - 0.2, halil - 0.3), u2 = tramo(t, director + 0.3, halil + 0.2);
  const ex = Math.round(lerp(-16, 128, u)), dx = Math.round(lerp(-30, 96, u2));
  R.actor(EL.deissmann, dx, 150, t, { dir: 1, anda: u2 > 0 && u2 < 1, sorpresa: t > biblio - 0.4, dedo: t > biblio - 0.1 });
  const vuelve = t > halil && t < halil + 0.9;
  R.actor(EL.edhem, ex, 150, t, { dir: vuelve ? -1 : 1, anda: u > 0 && u < 1, sonrisa: vuelve || t > biblio, dedo: t > biblio - 0.5, habla: vuelve && Math.sin(t * 9) > 0 });
  if (t > biblio - 0.3) { const k = Math.min(1, (t - biblio + 0.3) * 4); for (let i = 0; i < 3; i++) R.pset(146 + i * 3, Math.round(100 - k * 4 - i), hex('#fff4c0')); }
  T.estambulDelante(R, t, o);
};

// 4 · LOCAL el depósito abovedado: la linterna, el cofre y el ratón
const fondoDeposito = () => {
  // la bóveda de ladrillo en penumbra, tranquila arriba a la derecha
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) {
    const fila = y >> 2, of = (fila & 1) * 5, junta = y % 4 === 0 || (x + of) % 10 === 0;
    const luz = Math.max(0, 1 - Math.hypot(x - 70, y - 40) / 170);
    let c = junta ? hex('#3a2418') : h((x + of) / 10 | 0, fila, 3) < 0.3 ? hex('#7a4a30') : hex('#8a5838');
    if (x > 270 && y < 50) c = junta && y % 8 === 0 ? hex('#4a3024') : hex('#5a3a2a');
    R.pset(x, y, mez(c, hex('#1a0e0a'), 0.55 - luz * 0.45));
  }
  // dos nichos en arco con baldas de legajos y rollos
  for (const nx of [12, 206]) {
    R.rect(nx, 46, nx + 58, 134, K); R.disco(nx + 29, 46, 29, K);
    for (let y = 18; y < 134; y++) for (let x = nx + 2; x < nx + 57; x++) if (y > 46 || Math.hypot(x - nx - 29, y - 46) < 27) R.pset(x, y, hex('#2a1810'));
    for (const by of [72, 98, 124]) { libros(nx + 4, by - 20, nx + 54, by, nx + by, PL); R.rect(nx + 2, by + 1, nx + 56, by + 3, MAD[2]); R.rect(nx + 2, by + 3, nx + 56, by + 3, MAD[0]); }
    // telarañas en el arco
    for (let k = 0; k < 6; k++) R.linea(nx + 6, 40, nx + 6 + k * 4, 40 + (6 - k) * 3, hex('#9a8a7a'));
  }
  // la ventanita con reja, arriba a la izquierda
  R.rect(110, 18, 136, 40, K); R.rect(111, 19, 135, 39, hex('#cfe0e8')); for (let x = 114; x < 135; x += 5) R.rect(x, 19, x, 39, hex('#2a2a2a')); R.rect(111, 29, 135, 29, hex('#2a2a2a'));
  // el suelo de losas
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 140) / 10), of = (f & 1) * 14; let c = (x + of) % 28 === 0 || (y - 140) % 10 === 0 ? hex('#3a3430') : h((x + of) / 28 | 0, f, 4) < 0.5 ? hex('#6a625a') : hex('#5e5650'); if (h(x, y, 6) < 0.03) c = hex('#847a70'); R.pset(x, y, c); }
  R.rect(0, 138, 319, 140, hex('#2a1e18'));
  // cofres apilados a la izquierda, alfombras enrolladas a la derecha, una silla rota
  for (const [x, y, w, al] of [[8, 140, 44, 22], [14, 118, 34, 22], [262, 146, 50, 16]]) { R.rect(x - 1, y - al - 1, x + w + 1, y + 1, K); madera(x, y - al, x + w, y, MAD, 5, false, x); R.rect(x, y - al, x + w, y - al + 2, hex('#4a4a52')); R.rect(x, y - 6, x + w, y - 5, hex('#4a4a52')); R.rect(x + w / 2 - 2, y - al + 4, x + w / 2 + 2, y - al + 9, hex('#c8a040')); }
  for (let k = 0; k < 3; k++) { const ry = 132 - k * 8; R.rect(232, ry - 6, 300, ry, K); R.rect(233, ry - 5, 299, ry - 1, ['#a82a24', '#2a4a8a', '#c8902a'].map(hex)[k]); for (let x = 236; x < 298; x += 5) R.pset(x, ry - 3, hex('#f4e4b0')); R.disco(300, ry - 3, 3, K); R.disco(300, ry - 3, 2, hex('#7a1a1a')); }
  // al fondo, entre los nichos: cajas apiladas, un cuadro envuelto en tela y un farol colgado
  for (const [x, y, w, al] of [[142, 126, 30, 18], [176, 126, 24, 22], [150, 108, 26, 18]]) { R.rect(x - 1, y - al - 1, x + w + 1, y, K); madera(x, y - al, x + w, y - 1, MAD, 4, false, x + y); R.linea(x + 1, y - al + 1, x + w - 1, y - 2, MAD[0]); R.rect(x + 3, y - al + 3, x + 9, y - al + 6, hex('#e8dcc0')); }
  R.poligono([[86, 128], [118, 128], [114, 70], [90, 70]], hex('#c8bca0')); for (let y = 72; y < 128; y += 4) R.linea(90 - (y - 70) / 15, y, 114 + (y - 70) / 15, y + 2, hex('#a89c80')); R.rect(88, 96, 116, 98, hex('#7a5a3a')); R.poligono([[96, 74], [108, 74], [104, 80]], hex('#d8ccb0'));
  R.linea(200, 0, 200, 30, hex('#3a3a3a')); R.rect(196, 30, 204, 40, K); R.rect(197, 32, 203, 38, hex('#6a5a3a')); R.rect(198, 33, 202, 37, hex('#8a7a5a'));
  R.rect(62, 150, 64, 168, MAD[0]); R.rect(62, 150, 84, 152, MAD[1]); R.rect(82, 152, 84, 170, MAD[0]); R.linea(64, 140, 62, 150, MAD[0]);
};
const p4 = (t) => {
  capa('deposito', fondoDeposito);
  // el haz de la ventanita
  R.poligono([[111, 40], [135, 40], [176, 140], [140, 140]], (x, y) => mez(R.pget(x, y), hex('#e8e0c0'), 0.18));
  const abre = tramo(t, aleman - 0.25, aleman + 0.15);
  // el cofre grande del centro (la tapa se abre hacia atrás)
  const X0 = 128, X1 = 190, Y0 = 128, Y1 = 158;
  R.rect(X0 - 1, Y0 - 1, X1 + 1, Y1 + 1, K); madera(X0, Y0, X1, Y1, MAD, 6, false, 5);
  for (const bx of [X0 + 6, X1 - 8]) R.rect(bx, Y0, bx + 2, Y1, hex('#4a4a54'));
  R.rect(X0, Y0, X1, Y0 + 1, hex('#5a5a64')); R.rect(X0, Y1 - 2, X1, Y1, hex('#3a3a44'));
  R.rect(158, Y0 + 3, 162, Y0 + 9, hex('#c8a040')); R.pset(160, Y0 + 6, K);
  if (abre > 0) {
    // el hueco con los legajos dentro
    R.rect(X0 + 2, Y0 - 1, X1 - 2, Y0 + 2, hex('#2a160c'));
    for (let k = 0; k < 6; k++) { const lx = X0 + 6 + k * 9; R.rect(lx, Y0 - 3, lx + 7, Y0 + 1, PL.pa); R.rect(lx + 3, Y0 - 3, lx + 3, Y0 + 1, PL.cin); }
    const al = Math.round(26 * abre);
    R.rect(X0 - 1, Y0 - al - 1, X1 + 1, Y0 - 1, K); madera(X0, Y0 - al, X1, Y0 - 2, MAD, 4, false, 6); R.rect(X0, Y0 - al, X1, Y0 - al + 1, hex('#5a5a64'));
  } else {
    R.rect(X0 - 1, Y0 - 9, X1 + 1, Y0, K); madera(X0, Y0 - 8, X1, Y0 - 1, MAD, 4, false, 6); R.rect(X0, Y0 - 8, X1, Y0 - 7, hex('#5a5a64'));
    for (let k = 0; k < 30; k++) R.pset(X0 + 2 + (k * 7) % 58, Y0 - 8 + (k % 3), hex('#a89c88'));
  }
  // el polvo que sale al abrir
  const pv = tramo(t, aleman - 0.1, aleman + 1.4);
  if (pv > 0 && pv < 1) for (let k = 0; k < 40; k++) { const a = -Math.PI * (0.1 + h(k, 1) * 0.8), r = pv * (14 + h(k, 2) * 30); R.pset(Math.round(160 + Math.cos(a) * r * 1.4), Math.round(Y0 - 8 + Math.sin(a) * r), (k & 1) ? hex('#c8bca8') : hex('#a89c88')); }
  // el ratón que salta del cofre y huye a la derecha
  const rt = tramo(t, aleman + 0.1, aleman + 1.6);
  if (rt > 0 && rt < 1) { const rx = Math.round(lerp(176, 330, rt)), ry = Math.round(rt < 0.2 ? Y0 - 4 - Math.sin(rt / 0.2 * Math.PI) * 10 : 170); R.rect(rx, ry, rx + 5, ry + 2, hex('#7a7480')); R.pset(rx + 6, ry, hex('#7a7480')); R.pset(rx + 1, ry - 1, hex('#e8a0a8')); R.pset(rx + 5, ry + 1, K); R.linea(rx - 4, ry + 2 - (Math.floor(t * 12) % 2), rx - 1, ry + 1, hex('#c88a90')); }
  // Deissmann abre la tapa y en «Deissmann» saca un legajo
  const saca = t > deiss - 0.2;
  const d = R.actor(EL.deissmann, 196, 164, t, { dir: -1, sostiene: abre < 1 ? [X1 - 4, Y0 - 6 - Math.round(abre * 18)] : saca ? [188, 120] : undefined, sorpresa: t > aleman && t < aleman + 1, sonrisa: saca, habla: t > aleman + 1.1 && t < deiss - 0.3 && Math.sin(t * 8) > 0 });
  if (saca && d && d.mano) { const [mx, my] = d.mano; R.rect(mx - 9, my - 5, mx + 1, my + 2, K); for (let k = 0; k < 6; k++) R.rect(mx - 8, my - 4 + k, mx, my - 4 + k, k % 2 ? PL.pa : PL.pa2); R.rect(mx - 4, my - 4, mx - 4, my + 1, PL.cin); if (t < deiss + 0.8) for (let k = 0; k < 6; k++) R.pset(mx - 10 - k * 2, my - 6 - (k % 2), hex('#c8bca8')); }
  // Edhem alumbra con la linterna eléctrica
  const ex = 92, ap = [ex + 22, 136 + Math.round(Math.sin(t * 1.3) * 2)];
  const e = R.actor(EL.edhem, ex, 164, t, { dir: 1, sostiene: ap, sonrisa: t > deiss });
  if (e && e.mano) {
    const [mx, my] = e.mano, tx = 160 + Math.round(Math.sin(t * 0.9) * 10), ty = abre > 0.5 ? Y0 - 2 : Y0 + 6;
    R.poligono([[mx + 4, my - 2], [tx - 18, ty - 10], [tx + 18, ty + 10], [mx + 4, my + 2]], (x, y) => mez(R.pget(x, y), hex('#fff6c8'), 0.35));
  }
  if (e && e.mano) { const [mx, my] = e.mano; R.rect(mx - 1, my - 2, mx + 5, my + 1, K); R.rect(mx, my - 1, mx + 4, my, hex('#4a4a52')); R.rect(mx + 5, my - 2, mx + 6, my + 1, hex('#fff8c0')); }
  // telaraña que se mece arriba
  for (let k = 0; k < 5; k++) R.linea(250, 0, 250 + k * 5, 10 + Math.round(Math.sin(t * 2) * 1) + (5 - k) * 2, hex('#7a6a5a'));
};

// 5 · LOCAL la sala de los papeles olvidados: el hallazgo del pergamino doblado
const fondoPapeles = () => {
  // la pared de yeso gastada con su zócalo de madera
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 2, y >> 2, 21) < 0.5 ? hex('#d8c8a4') : hex('#ccbc96'); if (h(x, y, 22) < 0.02) c = hex('#b8a882'); if (x > 270 && y < 50) c = hex('#d0c09c'); R.pset(x, y, mez(c, hex('#3a2a1a'), Math.min(0.5, y / 400))); }
  // manchas de humedad
  for (let k = 0; k < 4; k++) { const cx = 30 + k * 70, cy = 30 + (k % 2) * 20; for (let y = -10; y < 10; y++) for (let x = -14; x < 14; x++) if (Math.hypot(x, y * 1.4) < 12 + Math.sin(x * 0.7 + k) * 2 && (x + y) % 3 === 0) tin(cx + x, cy + y, hex('#a8946c'), 0.3); }
  // la ventana redonda de arriba
  R.disco(70, 26, 14, K); R.disco(70, 26, 12, hex('#d8eaf2')); R.linea(58, 26, 82, 26, hex('#3a3a3a')); R.linea(70, 14, 70, 38, hex('#3a3a3a')); R.disco(70, 26, 3, hex('#3a3a3a')); R.disco(70, 26, 2, hex('#d8eaf2'));
  // una balda alta con alfombras enrolladas y rollos, un cuadro tapado con una tela y telarañas en las esquinas
  R.rect(108, 40, 252, 42, MAD[2]); R.rect(108, 43, 252, 43, MAD[0]); for (const bx of [114, 244]) { R.rect(bx, 43, bx + 2, 50, MAD[0]); }
  for (let k = 0; k < 4; k++) { const rx = 112 + k * 34; R.rect(rx, 31, rx + 30, 39, K); R.rect(rx + 1, 32, rx + 29, 38, ['#a82a24', '#2a4a8a', '#c8902a', '#3a6a3a'].map(hex)[k]); for (let x = rx + 3; x < rx + 29; x += 4) R.pset(x, 35, hex('#f4e4b0')); R.disco(rx + 30, 35, 4, K); R.disco(rx + 30, 35, 3, hex('#5a1a1a')); }
  R.rect(14, 46, 56, 84, K); R.rect(15, 47, 55, 83, hex('#8a6a3a')); R.poligono([[15, 47], [55, 47], [55, 70], [40, 84], [15, 80]], hex('#e8e0c8')); for (let k = 0; k < 5; k++) R.linea(20 + k * 7, 49, 18 + k * 8, 80, hex('#c8bca0'));
  for (const [cx, cy, sx] of [[0, 0, 1], [319, 0, -1]]) for (let k = 0; k < 6; k++) R.linea(cx, cy + 6 + k * 4, cx + sx * (6 + k * 4), cy, hex('#a89a88'));
  // dos nichos repletos de papeles
  for (const nx of [118, 196]) { R.rect(nx, 50, nx + 40, 120, K); R.rect(nx + 1, 51, nx + 39, 119, hex('#3a2818')); for (let by = 66; by < 120; by += 18) { for (let k = 0; k < 8; k++) R.rect(nx + 3, by - k * 2, nx + 37 - (k * 5) % 9, by - k * 2, k % 2 ? PL.pa : PL.pa2); R.rect(nx + 1, by + 1, nx + 39, by + 2, MAD[2]); } }
  R.rect(0, 120, 319, 131, MAD[1]); madera(0, 120, 319, 131, MAD, 4, false, 9);
  // el suelo de tablas, cubierto de hojas sueltas
  madera(0, 132, 319, 179, MAD, 8, false, 10);
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 30) * 300) + 6, y = 140 + Math.round(h(k, 2, 30) * 36); R.rect(x - 2, y, x + 3, y + 1, k % 3 ? PL.pa : PL.pa2); R.pset(x - 2, y + 2, K); }
  // las pilas de libros: altas a la izquierda y a la derecha
  const pila = (x, base, n, sem) => { let y = base; for (let k = 0; k < n; k++) { const w = 16 + Math.floor(h(k, sem, 31) * 10), of = Math.round((h(k, sem, 32) - 0.5) * 5), c = PL.lomos[Math.floor(h(k, sem, 33) * 8)], al = 3 + (k % 3 === 0 ? 1 : 0);
    if (h(k, sem, 34) < 0.25) { R.rect(x + of - 1, y - al - 1, x + of + w + 1, y, K); R.rect(x + of, y - al, x + of + w, y - 1, PL.pa); R.rect(x + of, y - 1, x + of + w, y - 1, PL.pa2); }
    else { R.rect(x + of - 1, y - al - 1, x + of + w + 1, y, K); R.rect(x + of, y - al, x + of + w, y - 1, c); R.rect(x + of + 1, y - al + 1, x + of + w - 2, y - al + 1, PL.pa); R.pset(x + of + w - 3, y - 2, PL.oro); }
    y -= al + 1; } return y; };
  pila(4, 168, 24, 1); pila(26, 170, 18, 2); pila(48, 166, 12, 3); pila(252, 168, 22, 4); pila(280, 170, 26, 5); pila(228, 166, 9, 6);
  // una escalera y rollos en un cesto
  R.linea(98, 60, 90, 140, MAD[0]); R.linea(108, 60, 100, 140, MAD[0]); for (let y = 70; y < 140; y += 12) R.linea(97 - (y - 60) / 10, y, 107 - (y - 60) / 10, y, MAD[1]);
  R.rect(200, 140, 222, 160, K); madera(201, 141, 221, 159, ['#5a3a1a', '#8a6a3a', '#a8844a', '#c8a060'].map(hex), 3, true, 11);
  for (let k = 0; k < 5; k++) { R.rect(203 + k * 4, 128 - (k % 2) * 4, 205 + k * 4, 141, PL.pa); R.pset(204 + k * 4, 127 - (k % 2) * 4, PL.pa2); }
};
const p5 = (t) => {
  capa('papeles', fondoPapeles);
  // el haz de luz de la ventana redonda, con motas
  R.poligono([[60, 34], [82, 34], [184, 170], [140, 170]], (x, y) => mez(R.pget(x, y), hex('#fff4d0'), 0.3));
  for (let k = 0; k < 16; k++) { const u = (t * 0.07 + k * 0.0625) % 1, y = Math.round(36 + u * 130), x = Math.round(66 + (y - 36) * 0.62 + Math.sin(t * 0.9 + k) * 6 + (k % 4) * 4); R.pset(x, y, hex('#fffbe8')); }
  // Edhem rebusca: las manos van y vienen y las hojas vuelan
  const busca = t < hallo - 0.1, alto = t > hallo;
  const ex = 150;
  const e = R.actor(EL.edhem, ex, 166, t, { dir: 1, sostiene: busca ? [ex + 20, 150 + Math.round(Math.sin(t * 9) * 4)] : [ex + 18, Math.round(lerp(146, 122, tramo(t, hallo, perg)))], sorpresa: t > hallo - 0.1 && t < perg, sonrisa: t > perg });
  // un montón delante de Edhem del que salen las hojas
  const pm = (x, y, n) => { for (let k = 0; k < n; k++) { R.rect(x - 1 + (k % 3), y - k * 2 - 1, x + 22 - (k * 3) % 5, y - k * 2, K); R.rect(x + (k % 3), y - k * 2, x + 21 - (k * 3) % 5, y - k * 2, k % 2 ? PL.pa : PL.pa2); } };
  pm(166, 166, 6);
  if (busca) for (let k = 0; k < 7; k++) { const s = ((t - pilas) * 0.9 + k / 7) % 1; if (t < pilas - 0.2 || s < 0) continue; const x = 178 + s * (k % 2 ? 50 : -60) * (0.6 + h(k, 5) * 0.6), y = 150 - Math.sin(s * Math.PI) * (30 + h(k, 6) * 26) + s * 16; hoja(x, y, t * 10 + k, PL.pa, PL.pa2); }
  // el pergamino doblado en la mano, con su brillo en el haz
  if (e && e.mano && !busca) { const [mx, my] = e.mano; T.PIEZAS_PR.pergamino(R, mx - 2, my - 10, { abierto: false });
    const g = tramo(t, hallo, hallo + 2.2); if (g < 1) for (let k = 0; k < 12; k++) { const a = k * 0.524 + g * 2, r = 12 + g * 12; const x = Math.round(mx + 6 + Math.cos(a) * r), y = Math.round(my - 4 + Math.sin(a) * r); R.rect(x, y - 1, x, y + 1, hex('#fff0a0')); R.rect(x - 1, y, x + 1, y, k & 1 ? hex('#ffd040') : hex('#fff8d0')); } }
  // Deissmann alumbra con la linterna y grita «!» en «parchment»
  const dx = 212, d = R.actor(EL.deissmann, dx, 168, t, { dir: -1, sostiene: [dx - 8, 146], sorpresa: t > perg, brazos: false });
  if (d && d.mano) { const [mx, my] = d.mano; R.poligono([[mx - 4, my - 2], [mx - 34, my + 4], [mx - 30, my + 18], [mx - 4, my + 2]], (x, y) => mez(R.pget(x, y), hex('#fff6c8'), 0.3)); R.rect(mx - 5, my - 2, mx + 1, my + 1, K); R.rect(mx - 4, my - 1, mx, my, hex('#4a4a52')); R.rect(mx - 6, my - 2, mx - 5, my + 1, hex('#fff8c0')); }
  if (t > perg) R.bocadillo(dx + 6, 136 - Math.round(Math.min(1, (t - perg) * 6) * 3), { icono: '!' });
  // el libro de lo alto de la pila de la derecha que se tambalea y cae
  const cae = tramo(t, perg + 0.6, perg + 1.2);
  const lx = 288 + Math.round(cae * 8), ly = Math.round(lerp(56, 166, cae * cae)), tb = t > perg && cae <= 0 ? Math.round(Math.sin(t * 30)) : 0;
  R.rect(lx - 1 + tb, ly - 4, lx + 15 + tb, ly, K); R.rect(lx + tb, ly - 3, lx + 14 + tb, ly - 1, hex('#8a2a2a')); R.rect(lx + 1 + tb, ly - 3, lx + 12 + tb, ly - 3, PL.pa);
  if (cae >= 1 && t < perg + 1.6) for (let k = 0; k < 8; k++) R.pset(lx - 4 + k * 3, 166 - (k % 2) - Math.round((t - perg - 1.2) * 8), hex('#c8bca8'));
  // un gato asoma por encima de la pila de la izquierda
  const gx = 20, gy = 90 + Math.round(Math.max(0, Math.sin(t * 0.8)) * 3);
  R.rect(gx, gy, gx + 8, gy + 5, K); R.rect(gx + 1, gy + 1, gx + 7, gy + 5, hex('#5a5a62')); R.pset(gx + 1, gy - 1, K); R.pset(gx + 7, gy - 1, K); R.pset(gx + 3, gy + 2, hex('#e8d040')); R.pset(gx + 5, gy + 2, hex('#e8d040'));
};

const efectos = [[otono, 'viento'], [topkapi - 0.05, 'toc'], [siglos, 'whoosh'], [museo, 'golpecito'], [director, 'puerta'], [aleman - 0.15, 'cerrojo'], [aleman + 0.3, 'pop'], [pilas, 'papel'], [hallo, 'brillo'], [perg + 1.2, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '1929', año: 1929 });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-firma'] = ('Firma', '''// PR-FIRMA (frase 5), 1929, sin cartela. Cinco planos:
// 1. (0 → «written») la mesa de la biblioteca: en «unfolded» Edhem y Deissmann despliegan el pergamino; en «ships» se
//    sigue desplegando por el canto hasta el suelo y el rollo rueda (gag 2); Deissmann «!», Edhem levanta los brazos.
// 2. («written» → «Paul») el pergamino entero, vivo: barcos que navegan, loros; en «many colors» se encienden las aguadas
//    de una en una; en «expert» entra una mano con la lupa y la posa sobre las notas.
// 3. («Paul» → «who») LOCAL el despacho de Kahle (libros orientales): Kahle llega de la estantería con un libro, lo deja y
//    estudia la copia con la lupa en «studied it»; en «Piri Reis» piensa en una galera.
// 4. («who» → «Islamic») el pergamino de muy cerca: la lupa recorre las notas y se para en la firma; en «919» sale el
//    número de oro.
// 5. («Islamic» → fin) LOCAL la mesa de Kahle desde arriba: gira el calendario de papel de la luna al sol y la mano
//    escribe «1513» en «in 1513».''', HELP + r'''
const fi = (f) => en('firma', f);
const P2 = fi(0.231), P3 = fi(0.428), P4 = fi(0.662), P5 = fi(0.850);
const despliega = fi(0.012), costas = fi(0.065), barcos = fi(0.133), notas = fi(0.157), colores = fi(0.281), experto = fi(0.342);
const estudia = fi(0.467), piri = fi(0.559), capitan = fi(0.626), almirante = fi(0.722), n919 = fi(0.778), calend = fi(0.868), n1513 = fi(0.954);
const ORO = hex('#e8b830'), ORO3 = hex('#fff0a0');
const PL = { pa: hex('#efe2c0'), pa2: hex('#cdb98e'), cin: hex('#b03424'), oro: hex('#e0b040'), lomos: ['#7a1a1a', '#1a3a6a', '#2a5a3a', '#6a4a1a', '#4a1a4a', '#8a5a1a', '#1a4a4a', '#2a2a3a'].map(hex) };
const MAD = ['#3a2010', '#5e3a1c', '#7a4e26', '#946436'].map(hex);
const NOG = ['#2a160a', '#4a2a14', '#5e381c', '#704626'].map(hex);

// 1 · la mesa: se despliega y se sigue desplegando hasta el suelo (gag 2)
const p1 = (t) => {
  const abre = tramo(t, despliega, despliega + 0.9), sigue = tramo(t, barcos, barcos + 1.4);
  const o = { encuadre: 'biblioteca', camara: 'mesa', abre, sigue };
  T.estambul(R, t, o);
  const asom = sigue > 0.3;
  R.actor(EL.edhem, 120, 112, t, { dir: 1, sostiene: abre < 1 ? [Math.round(lerp(152, 110, abre)), 118] : undefined, brazos: asom && t < barcos + 2.2, sonrisa: abre >= 1 && !asom, sorpresa: asom });
  R.actor(EL.deissmann, 204, 112, t, { dir: -1, sostiene: abre < 1 ? [Math.round(lerp(168, 214, abre)), 118] : undefined, dedo: t > costas && t < barcos, habla: t > costas && t < barcos && Math.sin(t * 8) > 0, sorpresa: asom });
  if (asom) R.bocadillo(214, 82 - Math.round(Math.min(1, (t - barcos - 0.4) * 6) * 3), { icono: '!' });
  // una polilla que ronda la lámpara
  const px = 46 + Math.round(Math.cos(t * 3.1) * 9), py = 98 + Math.round(Math.sin(t * 4.3) * 5); R.pset(px, py, hex('#d8ccb0')); R.pset(px + (Math.sin(t * 30) > 0 ? 1 : -1), py - 1, hex('#f4ecd8'));
  T.estambulDelante(R, t, o);
};

// 2 · el pergamino entero, vivo: los colores se encienden y entra la lupa
const p2 = (t) => {
  const ent = tramo(t, experto - 0.1, experto + 0.9);
  const lx = Math.round(lerp(330, 196, ent)), ly = Math.round(lerp(150, 60, ent));
  const r = T.pergamino(R, t, { vista: 'entero', vivo: true, lupa: ent > 0 ? { x: lx, y: ly, r: 20 } : undefined });
  // en «many colors» las aguadas se encienden de una en una: ocre, verde, almagre, azul
  const sitios = [[r.P(120, 560), '#f0c050'], [r.P(150, 420), '#7ad070'], [r.P(820, 300), '#f07050'], [r.P(500, 300), '#70b0f0'], [r.P(220, 140), '#f0e070']];
  sitios.forEach(([[x, y], c], k) => { const g = tramo(t, colores - 0.3 + k * 0.22, colores + 0.5 + k * 0.22); if (g <= 0 || g >= 1) return; const rr = 4 + g * 14;
    for (let a = 0; a < 6.28; a += 0.3) { const px = Math.round(x + Math.cos(a) * rr), py = Math.round(y + Math.sin(a) * rr * 0.8); R.pset(px, py, hex(c)); }
    R.rect(x - 1, y - 3, x + 1, y + 3, hex(c)); R.rect(x - 3, y - 1, x + 3, y + 1, hex(c)); R.pset(x, y, hex('#ffffff')); });
  if (ent > 0 && r.lupa && r.lupa.mango) { const [mx, my] = r.lupa.mango; T.brazo(R, mx + 46, my + 70, mx, my, '#6a5440', -1, { codo: [mx + 36, my + 30] }); }
};

// 3 · LOCAL el despacho de Kahle con sus libros orientales
const fondoKahle = () => {
  // la pared: papel pintado verde oscuro con una trama de rombos, tranquilo arriba a la derecha
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const d = ((x + y) % 12 === 0 || (x - y + 600) % 12 === 0); let c = d ? hex('#3a5a44') : hex('#2e4a38'); if ((x % 12 === 6) && (y % 12 === 0)) c = hex('#a89a5a'); if (x > 272 && y < 48) c = hex('#30483a'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 6, hex('#e8e0cc')); R.rect(0, 7, 319, 8, hex('#a89870'));
  R.rect(0, 104, 319, 127, NOG[2]); madera(0, 106, 319, 127, NOG, 5, true, 2); R.rect(0, 104, 319, 105, NOG[3]);
  // la estantería grande de la izquierda con libros orientales (lomos con oro) y manuscritos tumbados
  R.rect(4, 14, 104, 160, K); madera(5, 15, 103, 159, NOG, 6, true, 3);
  for (const by of [40, 66, 92, 118, 144]) { R.rect(8, by - 22, 100, by, hex('#1a0e08')); libros(9, by - 21, 99, by, by, PL); R.rect(6, by + 1, 102, by + 3, NOG[3]); R.rect(6, by + 3, 102, by + 3, NOG[0]); }
  // la ventana con la ciudad (tejados, torres de una catedral, el río) y un cielo tramado
  R.rect(132, 18, 210, 92, K); R.rect(134, 20, 208, 90, hex('#e8e0cc'));
  R.recorte([136, 22, 206, 88]);
  for (let y = 22; y <= 88; y++) for (let x = 136; x <= 206; x++) { const u = (y - 22) / 50 + BAY[(y & 3) * 4 + (x & 3)] / 40; R.pset(x, y, u < 0.4 ? hex('#7ab0d8') : u < 0.8 ? hex('#9ac4e0') : hex('#c4dcec')); }
  for (const [cx, cy, s] of [[160, 34, 0.5], [196, 44, 0.4]]) nube(cx, cy, s, [hex('#b8c8d8'), hex('#e8eef4'), hex('#ffffff')]);
  R.poligono([[136, 74], [150, 64], [160, 70], [172, 60], [186, 68], [206, 62], [206, 88], [136, 88]], hex('#8a6a5a'));
  for (let x = 138; x < 206; x += 7) { R.poligono([[x, 76], [x + 3, 70], [x + 6, 76]], hex('#a83a2a')); R.rect(x, 76, x + 6, 82, hex('#d8c8a8')); R.pset(x + 2, 79, hex('#3a3a4a')); }
  R.rect(176, 48, 180, 70, hex('#7a5a4a')); R.poligono([[175, 48], [178, 38], [181, 48]], hex('#4a5a6a')); R.rect(188, 52, 191, 70, hex('#7a5a4a')); R.poligono([[187, 52], [189, 44], [192, 52]], hex('#4a5a6a'));
  R.rect(136, 84, 206, 88, hex('#5a8aa8')); for (let x = 138; x < 206; x += 6) R.pset(x, 86, hex('#c8e0f0'));
  R.recorte(null);
  R.rect(170, 20, 172, 90, hex('#e8e0cc')); R.rect(134, 54, 208, 56, hex('#e8e0cc'));
  // cortinas a los lados
  for (const [x0, x1] of [[120, 134], [208, 222]]) for (let x = x0; x <= x1; x++) R.rect(x, 12, x, 98, (x - x0) % 4 < 2 ? hex('#8a2a2a') : hex('#6a1a1a'));
  R.rect(116, 10, 226, 13, hex('#c8a040'));
  // el reloj de pared y un mapa enmarcado del Mediterráneo
  R.disco(246, 34, 9, K); R.disco(246, 34, 8, hex('#7a4a2a')); R.disco(246, 34, 6, hex('#f4ecd8')); R.rect(240, 43, 252, 76, K); R.rect(241, 44, 251, 75, hex('#7a4a2a')); R.rect(243, 46, 249, 72, hex('#2a1a10'));
  // el suelo de parqué con una alfombra
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 128) / 4), b = Math.floor((x + (f % 2) * 8) / 16); let c = (b + f) % 2 ? hex('#7a4e2a') : hex('#8a5a32'); if ((x + (f % 2) * 8) % 16 === 0 || (y - 128) % 4 === 0) c = hex('#4a2e18'); R.pset(x, y, c); }
  R.rect(40, 156, 300, 179, K); R.rect(41, 157, 299, 179, hex('#8a2a24')); for (let x = 44; x < 298; x += 4) { R.pset(x, 159, hex('#e8b840')); R.pset(x + 2, 176, hex('#e8b840')); } for (let k = 0; k < 6; k++) R.disco(80 + k * 40, 168, 3, hex('#2a3a6a'));
  // una planta en su maceta y una pila de manuscritos en el suelo
  R.rect(110, 140, 122, 156, K); R.rect(111, 141, 121, 155, hex('#b85a2a')); for (let k = 0; k < 7; k++) R.linea(116, 140, 106 + k * 3, 116 + (k % 3) * 4, hex('#3a7a3a'));
  for (let k = 0; k < 5; k++) { R.rect(294 - k, 176 - k * 3, 318, 178 - k * 3, K); R.rect(295 - k, 176 - k * 3, 317, 177 - k * 3, k % 2 ? PL.pa : hex('#6a2a2a')); }
};
const escritorio = (t) => {
  // el escritorio, por delante: tablero, cajones y patas; encima, la copia del mapa, la lámpara verde, el té y libros
  R.rect(140, 142, 288, 148, K); madera(141, 143, 287, 147, NOG, 3, false, 4); R.rect(141, 143, 287, 143, NOG[3]);
  R.rect(144, 148, 284, 168, K); madera(145, 149, 283, 167, NOG, 5, true, 5);
  for (const cx of [164, 264]) { R.rect(cx - 12, 152, cx + 12, 159, NOG[0]); R.rect(cx - 2, 155, cx + 2, 156, hex('#c8a040')); }
  R.rect(164, 137, 214, 142, K); R.rect(165, 138, 213, 141, hex('#e8d8b0')); for (let x = 168; x < 212; x += 3) R.pset(x, 139 + (x % 2), (x % 9 < 3) ? hex('#3a7a5a') : hex('#a85a3a'));
  R.rect(258, 116, 262, 142, K); R.rect(259, 117, 261, 141, hex('#c8a040')); R.rect(254, 140, 266, 142, hex('#a88030')); R.poligono([[248, 122], [272, 122], [268, 112], [252, 112]], hex('#2a6a3a')); R.linea(252, 112, 268, 112, hex('#4a9a5a'));
  R.poligono([[236, 142], [286, 142], [266, 123], [254, 123]], (x, y) => mez(R.pget(x, y), hex('#fff4c0'), 0.22));
  R.rect(228, 133, 238, 141, K); R.rect(229, 134, 237, 140, hex('#f4f0e4')); R.rect(229, 134, 237, 135, hex('#a8481a')); R.rect(238, 135, 240, 138, K);
  for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1; R.pset(232 + Math.round(Math.sin(t * 2 + k * 2) * 2), Math.round(131 - s * 14), mez(hex('#ffffff'), hex('#2e4a38'), s)); }
  for (let k = 0; k < 3; k++) { R.rect(270, 138 - k * 4, 285, 141 - k * 4, K); R.rect(271, 139 - k * 4, 284, 140 - k * 4, PL.lomos[k * 2]); R.rect(271, 139 - k * 4, 271, 140 - k * 4, PL.oro); }
};
const p3 = (t) => {
  capa('kahle', fondoKahle);
  // el péndulo del reloj y un gorrión en el alféizar
  const pe = Math.round(Math.sin(t * 3.4) * 2); R.linea(246, 46, 246 + pe, 66, hex('#c8a040')); R.disco(246 + pe, 68, 2, hex('#e8c050'));
  const g = Math.floor(t * 1.7) % 4; R.rect(196, 88, 200, 90, hex('#7a5a3a')); R.pset(g === 0 ? 195 : 201, 88 - (g === 1 ? 1 : 0), hex('#5a3a2a')); R.pset(198, 87, K);
  // Kahle: llega desde la estantería con un libro, lo deja, coge la lupa y estudia la copia
  const v = tramo(t, P3 + 0.05, estudia - 0.1), kx = Math.round(lerp(96, 188, v));
  const lee = t > estudia - 0.1;
  const k = R.actor(EL.kahle, kx, 152, t, { dir: lee ? -1 : 1, anda: v > 0 && v < 1, sostiene: lee ? [kx - 14 + Math.round(Math.sin(t * 1.4) * 4), 134] : [kx + 18, 132], sorpresa: t > capitan && t < capitan + 0.6, sonrisa: t > piri && t < capitan });
  escritorio(t);
  if (k && k.mano) { const [mx, my] = k.mano;
    if (!lee) { R.rect(mx - 3, my - 4, mx + 5, my + 2, K); R.rect(mx - 2, my - 3, mx + 4, my + 1, hex('#7a1a1a')); R.rect(mx - 2, my - 3, mx - 2, my + 1, PL.oro); }
    else { R.linea(mx, my, mx - 3, my + 4, hex('#5a3a1a')); R.disco(mx - 6, my + 5, 5, K); R.disco(mx - 6, my + 5, 4, hex('#c8a040')); R.disco(mx - 6, my + 5, 3, hex('#cfe8f4')); R.pset(mx - 7, my + 4, hex('#ffffff')); R.pset(mx - 8, my + 3, hex('#ffffff')); } }
  if (lee) { R.rect(216, 137, 224, 141, K); R.rect(217, 138, 223, 140, hex('#7a1a1a')); R.rect(217, 138, 217, 140, PL.oro); }
  // en «Piri Reis» piensa en una galera otomana (bocadillo de pensar, con su galera de remos y su vela latina)
  const pb = tramo(t, piri - 0.15, piri + 0.15);
  if (pb > 0) { const bx = kx - 26, by = 76 + Math.round((1 - pb) * 6);
    R.disco(kx + 2, 116, 2, K); R.disco(kx + 2, 116, 1, hex('#ffffff')); R.disco(kx - 4, 108, 3, K); R.disco(kx - 4, 108, 2, hex('#ffffff'));
    R.rect(bx - 22, by - 16, bx + 22, by + 16, K); R.rect(bx - 21, by - 15, bx + 21, by + 15, hex('#ffffff')); R.rect(bx - 20, by - 14, bx + 20, by + 14, hex('#e8f0f8'));
    for (let x = bx - 19; x <= bx + 19; x++) R.pset(x, by + 9 + Math.round(Math.sin(x * 0.6 + t * 4)), hex('#5a8ac8'));
    R.poligono([[bx - 16, by + 4], [bx + 18, by + 4], [bx + 12, by + 9], [bx - 12, by + 9]], hex('#7a3a1a')); R.linea(bx - 16, by + 4, bx + 18, by + 4, K);
    for (let k = 0; k < 6; k++) R.linea(bx - 10 + k * 4, by + 8, bx - 12 + k * 4 + Math.round(Math.sin(t * 6) * 1), by + 13, hex('#3a2010'));
    R.linea(bx + 1, by - 12, bx + 1, by + 4, K); R.poligono([[bx - 12, by + 1], [bx + 12, by - 12], [bx + 4, by + 2]], hex('#f4f0e0')); R.linea(bx - 12, by + 1, bx + 12, by - 12, K);
    R.rect(bx + 1, by - 15, bx + 6, by - 13, hex('#c83a2a')); }
};

// 4 · el pergamino de muy cerca: la lupa en la firma y el «919»
const p4 = (t) => {
  const v = tramo(t, P4 + 0.1, almirante);
  const lx = Math.round(lerp(236, 150, v) + (v < 1 ? Math.sin(t * 5) * 3 : 0)), ly = Math.round(lerp(70, 92, v));
  // la firma: un rasgo rojo y negro con su rúbrica bajo las notas, donde se para la lupa
  const r = T.pergamino(R, t, { vista: 'entero', camara: 'detalle', centro: [820, 522], lupa: { x: lx, y: ly, r: 28 } });
  const fx = 150, fy = 128; for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 3; R.pset(Math.round(fx - 24 + i * 0.8), Math.round(fy + Math.sin(a) * 3), hex('#8a1a12')); R.pset(Math.round(fx - 24 + i * 0.8), Math.round(fy + 1 + Math.sin(a) * 3), hex('#8a1a12')); }
  for (let i = 0; i < 30; i++) R.pset(Math.round(fx + 12 + Math.cos(i / 5) * 8), Math.round(fy + 4 + Math.sin(i / 5) * 3), hex('#2a1a12'));
  if (r.lupa && r.lupa.mango) { const [mx, my] = r.lupa.mango; T.brazo(R, mx + 40, 196, mx, my, '#6a5440', -1, { codo: [mx + 38, my + 26] }); }
  // la firma subrayada en oro y el «919»
  const s = tramo(t, almirante, almirante + 0.6);
  if (s > 0) for (let x = fx - 26; x < fx - 26 + 60 * s; x++) { R.pset(x, fy + 7, ORO); R.pset(x, fy + 8, hex('#a87a18')); }
  const n = tramo(t, n919 - 0.1, n919 + 0.3);
  if (n > 0) { const y = Math.round(lerp(ly + 4, ly - 34, n)); R.rect(lx - 26, y - 18, lx + 26, y + 3, K); R.rect(lx - 25, y - 17, lx + 25, y + 2, hex('#f4ecd0')); R.rect(lx - 25, y + 2, lx + 25, y + 2, hex('#c8b890')); cifra('919', lx + 1, y, { tam: 16 }); }
};

// 5 · LOCAL la mesa de Kahle desde arriba: el calendario de papel y el «1513»
const fondoMesa = () => {
  madera(0, 0, 319, 179, NOG, 12, false, 7);
  // la libreta abierta con renglones y el «919» con la luna
  R.rect(92, 40, 286, 150, K); R.rect(94, 42, 186, 148, hex('#f4ecd8')); R.rect(190, 42, 284, 148, hex('#f8f2e2')); R.rect(187, 42, 189, 148, hex('#c8b890'));
  for (let y = 52; y < 146; y += 8) { R.linea(98, y, 182, y, hex('#c8d4e0')); R.linea(194, y, 280, y, hex('#c8d4e0')); }
  for (let y = 120; y < 142; y += 8) for (let x = 196; x < 270; x += 1) if (h(x >> 1, y, 4) < 0.5) R.pset(x, y - 2, hex('#3a3a5a'));
  for (let y = 54; y < 76; y += 8) for (let x = 110; x < 176; x += 1) if (h(x >> 1, y, 3) < 0.6) R.pset(x, y - 2 + (h(x, y) < 0.3 ? -1 : 0), hex('#3a3a5a'));
  R.disco(120, 100, 8, hex('#3a3a5a')); R.disco(124, 98, 7, hex('#f4ecd8'));
  R.numero('919', 150, 106, { centro: true, tam: 16, rampa: [hex('#1a1a3a'), hex('#2a2a5a'), hex('#3a3a6a'), hex('#4a4a7a')] });
  // la foto del mapa, el tintero, las gafas, el té, los libros, un clip
  R.rect(8, 10, 70, 56, K); R.rect(10, 12, 68, 54, hex('#e8dcc0')); R.rect(14, 16, 64, 50, hex('#c8b890')); R.poligono([[16, 20], [30, 18], [34, 34], [26, 48], [18, 46]], hex('#8a7a5a')); R.poligono([[52, 18], [62, 20], [62, 48], [50, 40]], hex('#9a8a6a'));
  R.disco(300, 160, 12, K); R.disco(300, 160, 11, hex('#f4f0e4')); R.disco(300, 160, 8, hex('#a8481a')); R.disco(297, 157, 2, hex('#c86a3a'));
  R.disco(40, 150, 10, K); R.disco(40, 150, 9, hex('#2a2a3a')); R.disco(40, 150, 5, hex('#1a1a2a')); R.pset(37, 147, hex('#6a6a8a'));
  R.disco(26, 66, 5, K); R.disco(40, 66, 5, K); R.disco(26, 66, 4, hex('#cfe0e8')); R.disco(40, 66, 4, hex('#cfe0e8')); R.linea(31, 65, 35, 65, K); R.linea(45, 64, 54, 58, K);
  for (let k = 0; k < 3; k++) { R.rect(294 - k * 2, 64 + k * 14, 319, 76 + k * 14, K); R.rect(295 - k * 2, 65 + k * 14, 319, 75 + k * 14, PL.lomos[k + 1]); R.rect(295 - k * 2, 70 + k * 14, 319, 70 + k * 14, PL.oro); }
  R.rect(80, 160, 140, 178, K); R.rect(81, 161, 139, 177, hex('#e8e0cc')); for (let y = 164; y < 176; y += 3) R.linea(84, y, 134 - (y % 7), y, hex('#8a8aa0'));
};
const p5 = (t) => {
  capa('mesa', fondoMesa);
  // el calendario de papel: el disco de fuera fijo (soles) y el de dentro, con la luna, que gira en «Islamic calendar»
  const gira = tramo(t, P5 + 0.05, P5 + 1.4) * 2.4;
  const cx = 48, cy = 96;
  R.disco(cx, cy, 30, K); R.disco(cx, cy, 29, hex('#f0e4c0'));
  for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12; R.linea(Math.round(cx + Math.cos(a) * 24), Math.round(cy + Math.sin(a) * 24), Math.round(cx + Math.cos(a) * 28), Math.round(cy + Math.sin(a) * 28), k % 2 ? hex('#8a6a3a') : hex('#c84a2a')); }
  R.disco(cx, cy - 26, 2, hex('#e8a020'));
  R.disco(cx, cy, 20, K); R.disco(cx, cy, 19, hex('#dce4ec'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + gira; R.pset(Math.round(cx + Math.cos(a) * 15), Math.round(cy + Math.sin(a) * 15), hex('#3a3a5a')); }
  const am = -Math.PI / 2 + gira; const mx = Math.round(cx + Math.cos(am) * 11), my = Math.round(cy + Math.sin(am) * 11); R.disco(mx, my, 4, hex('#3a3a5a')); R.disco(mx + 2, my - 1, 3, hex('#dce4ec'));
  R.disco(cx, cy, 2, hex('#c8a040'));
  // la flecha de la luna al sol, que se dibuja
  const fl = tramo(t, P5 + 1.0, n1513 - 0.6);
  if (fl > 0) { const x1 = Math.round(lerp(176, 198, fl)); R.linea(176, 100, x1, 100, hex('#a82a24')); R.linea(176, 101, x1, 101, hex('#a82a24')); if (fl >= 1) { R.linea(198, 100, 194, 96, hex('#a82a24')); R.linea(198, 101, 194, 105, hex('#a82a24')); } }
  // el sol y el «1513» que escribe la mano
  const es = tramo(t, n1513 - 0.5, n1513 + 0.35);
  if (es > 0) {
    R.disco(208, 100, 5, hex('#e8a020')); for (let k = 0; k < 8; k++) { const a = k * 0.785; R.pset(Math.round(208 + Math.cos(a) * 8), Math.round(100 + Math.sin(a) * 8), hex('#e8a020')); }
    R.numero('1513', 250, 106, { centro: true, tam: 16, n: Math.round(es * 64), rampa: [hex('#6a1a1a'), hex('#8a2a24'), hex('#a83a2a'), hex('#c84a3a')] });
  }
  if (es >= 1) { const g = tramo(t, n1513 + 0.35, n1513 + 1.2); if (g < 1) for (let k = 0; k < 10; k++) { const a = k * 0.628 + g * 2; R.pset(Math.round(250 + Math.cos(a) * (36 + g * 8)), Math.round(98 + Math.sin(a) * (14 + g * 6)), ORO3); } R.linea(220, 111, 280, 111, hex('#a82a24')); }
  // la mano con el lápiz: espera junto a la libreta, golpea, y escribe
  const px = es > 0 && es < 1 ? 220 + Math.round(es * 60) + Math.round(Math.sin(t * 40) * 1) : t > n1513 + 0.35 ? 282 : 236 + Math.round(Math.sin(t * 1.5) * 4);
  const py = es > 0 && es < 1 ? 98 + Math.round(Math.sin(t * 30) * 4) : 108 - (Math.floor(t * 2) % 2 ? 2 : 0);
  R.linea(px, py, px + 10, py + 14, hex('#2a2a2a')); R.linea(px + 1, py, px + 11, py + 14, hex('#e8b830')); R.linea(px + 2, py + 1, px + 11, py + 13, hex('#c89820')); R.pset(px, py, K);
  T.brazo(R, 340, 196, px + 12, py + 18, '#6a5440', -1, { codo: [318, 160] });
};

const año = 1929;
const efectos = [[despliega + 0.1, 'papel'], [barcos + 0.2, 'whoosh'], [barcos + 1.4, 'toc'], [colores, 'brillo'], [experto + 0.4, 'golpecito'], [P3 + 0.4, 'tic'], [piri, 'pop'], [almirante, 'lapiz'], [n919, 'brillo'], [P5 + 0.1, 'papel'], [n1513 - 0.4, 'lapiz'], [n1513 + 0.4, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['pr-colon'] = ('Colón', '''// PR-COLON (frase 6), sin cartela. Tres planos:
// 1. (0 → «from») LOCAL la nota de cerca, sobre el pergamino: la lupa recorre los renglones y en «stopped» se para en
//    seco; en «cold» la escarcha le cubre el borde y salta «!»; en «coasts and islands of the west» la carabela de tinta
//    se enciende y navega por su línea de puntos hasta las islas, que brillan.
// 2. («from» → «Soon») LOCAL el camarote de Colón (1498): Colón dibuja su carta a la luz del farol que se mece; en
//    «Columbus» la levanta orgulloso; en «charts… had all been lost» sus cartas (la de la mano, las de la pared y las de
//    la mesa) se deshacen en polvo que sale por las ventanas de popa; Colón «?».
// 3. («Soon» → fin) la imprenta de 1929: la rotativa escupe pliegos; en «news» el impresor levanta un periódico con el
//    mapa; en «around the world» un chico de los periódicos coge un fajo y sale corriendo.''', HELP + r'''
const co = (f) => en('colon', f);
const P2 = co(0.393), P3 = co(0.868);
const para = co(0.046), frio = co(0.082), costas = co(0.206), oeste = co(0.310), colon = co(0.524), cartas = co(0.676), perdidas = co(0.796);
const noticia = co(0.906), mundo = co(0.939);
const ORO = hex('#e8b830'), ORO3 = hex('#fff0a0');
const MAD = ['#3a2010', '#5e3a1c', '#7a4e26', '#946436'].map(hex);
const PAP = [hex('#c8a870'), hex('#dcc08a'), hex('#e8d4a4'), hex('#f2e2b8')];

// 1 · LOCAL la nota de Colón de cerca
const fondoNota = () => {
  // la piel de gacela de cerca: fibras, poros, manchas y un pliegue
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let k = 2; const n = h(x >> 3, y >> 3, 41) * 0.6 + h(x >> 1, y >> 1, 42) * 0.4;
    if (n < 0.25) k = 1; else if (n > 0.8) k = 3;
    if (Math.sin(x * 0.05 + y * 0.31 + Math.sin(x * 0.02) * 4) > 0.97) k = 1;
    if (h(x, y, 43) < 0.012) k = 0;
    if (Math.abs(x - 214 - Math.sin(y * 0.05) * 3) < 2) k = Math.abs(x - 214 - Math.sin(y * 0.05) * 3) < 1 ? 0 : 3;
    R.pset(x, y, PAP[k]);
  }
  // aureolas de agua y una mancha
  for (const [cx, cy, rr] of [[60, 150, 22], [270, 40, 18]]) for (let a = 0; a < 6.28; a += 0.02) { R.pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr * 0.8), hex('#b8945a')); R.pset(Math.round(cx + Math.cos(a) * (rr - 2)), Math.round(cy + Math.sin(a) * (rr - 2) * 0.8), hex('#d0b07a')); }
  // el mar: aguada verdeazul junto a la costa de las islas, a la izquierda, y líneas de rumbo
  R.poligono([[0, 20], [34, 26], [48, 52], [40, 80], [52, 100], [30, 128], [0, 120]], hex('#b8c8a0'));
  R.poligono([[0, 24], [28, 30], [40, 52], [32, 80], [44, 100], [24, 122], [0, 116]], hex('#d8a860'));
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 44) * 30), y = 30 + Math.round(h(k, 2, 44) * 86); R.pset(x, y, hex('#3a7a3a')); }
  R.poligono([[60, 140], [74, 132], [86, 140], [78, 150], [64, 150]], hex('#d8a860')); R.poligono([[96, 160], [104, 156], [110, 164], [100, 168]], hex('#c84a3a'));
  for (const [x0, y0, x1, y1, c] of [[0, 60, 320, 20, '#2a2a2a'], [0, 170, 320, 110, '#3a7a3a'], [40, 0, 200, 180, '#a83a2a']]) for (let i = 0; i < 400; i++) { const u = i / 400, x = Math.round(lerp(x0, x1, u)), y = Math.round(lerp(y0, y1, u)); if (i % 6 < 4) R.pset(x, y, mez(hex(c), PAP[2], 0.55)); }
  // el contorno de tinta de la costa
  for (const pts of [[[0, 24], [28, 30], [40, 52], [32, 80], [44, 100], [24, 122], [0, 116]], [[60, 140], [74, 132], [86, 140], [78, 150], [64, 150], [60, 140]], [[96, 160], [104, 156], [110, 164], [100, 168], [96, 160]]]) for (let i = 0; i < pts.length - 1; i++) R.linea(...pts[i], ...pts[i + 1], hex('#2a1a10'));
  // una rosa de los vientos abajo a la derecha, olas, palmeras y un loro en la costa
  const rx = 268, ry = 150; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, L = k % 4 === 0 ? 26 : k % 2 === 0 ? 18 : 11, c = k % 4 === 0 ? hex('#a82a1a') : k % 2 === 0 ? hex('#3a7a3a') : hex('#c8a040');
    R.poligono([[rx + Math.cos(a) * L, ry + Math.sin(a) * L], [rx + Math.cos(a + 0.25) * 4, ry + Math.sin(a + 0.25) * 4], [rx + Math.cos(a - 0.25) * 4, ry + Math.sin(a - 0.25) * 4]].map(([x, y]) => [Math.round(x), Math.round(y)]), c); }
  for (let a = 0; a < 6.28; a += 0.02) R.pset(Math.round(rx + Math.cos(a) * 20), Math.round(ry + Math.sin(a) * 20), hex('#2a1a10')); R.disco(rx, ry, 3, hex('#2a1a10')); R.disco(rx, ry, 2, hex('#e8b830'));
  for (let k = 0; k < 22; k++) { const x = 110 + Math.round(h(k, 7, 47) * 150), y = 18 + Math.round(h(k, 8, 47) * 150); if (x > 86 && x < 200 && y > 44 && y < 124) continue; if (x > 222 && y > 60 && y < 108) continue; if (Math.hypot(x - rx, y - ry) < 30) continue; R.pset(x, y, hex('#3a6aa8')); R.pset(x + 1, y - 1, hex('#3a6aa8')); R.pset(x + 2, y, hex('#3a6aa8')); R.pset(x + 3, y - 1, hex('#3a6aa8')); }
  for (const [px, py] of [[14, 50], [10, 92], [22, 70]]) { R.linea(px, py, px + 1, py - 8, hex('#5a3a1a')); for (const d of [-3, -1, 1, 3]) R.linea(px + 1, py - 8, px + 1 + d, py - 6 + Math.abs(d) * 0, hex('#2a6a2a')); R.pset(px + 1, py - 9, hex('#3a8a3a')); }
  R.rect(28, 98, 31, 101, hex('#c83a2a')); R.pset(29, 97, hex('#3a8a3a')); R.pset(32, 99, hex('#e8b830')); R.pset(30, 102, hex('#3a6aa8'));
  for (const [ix, iy, c] of [[120, 24, '#3a8a5a'], [150, 20, '#c84a3a'], [176, 28, '#d8a860'], [298, 120, '#3a8a5a']]) { R.disco(ix, iy, 4, hex('#2a1a10')); R.disco(ix, iy, 3, hex(c)); }
  // la nota: seis renglones de garabatos rojos y negros (de derecha a izquierda, sin letras)
  for (let r = 0; r < 6; r++) { const y = 56 + r * 12, x0 = 92, x1 = 196 - (r === 5 ? 40 : 0), c = r === 0 ? hex('#a82a1a') : hex('#2a1a12');
    for (let x = x0; x < x1; x++) { const q = h(x >> 1, r, 45); if (q < 0.55) R.pset(x, y + (q < 0.15 ? -1 : 0), c); if (q < 0.08) { R.pset(x, y - 2, c); R.pset(x, y - 3, c); } if (q > 0.93) R.pset(x, y + 2, c); }
    for (let k = 0; k < 4; k++) R.pset(x0 + Math.round(h(k, r, 46) * (x1 - x0)), y - 5, c); }
  // la cartela sin letras con un barquito
  R.rect(226, 64, 290, 104, hex('#2a1a10')); R.rect(228, 66, 288, 102, hex('#f2e2b8')); R.rect(230, 68, 286, 100, hex('#c84a3a')); R.rect(232, 70, 284, 98, hex('#f2e2b8'));
  for (const [cx, cy] of [[226, 64], [290, 64], [226, 104], [290, 104]]) { R.disco(cx, cy, 4, hex('#2a1a10')); R.disco(cx, cy, 3, hex('#e8b830')); }
  R.poligono([[244, 90], [272, 90], [268, 96], [248, 96]], hex('#7a4a2a')); R.linea(258, 74, 258, 90, hex('#2a1a10')); R.poligono([[259, 75], [270, 86], [259, 86]], hex('#f8f0e0')); R.poligono([[257, 76], [248, 86], [257, 86]], hex('#e8d8b8')); R.rect(258, 72, 262, 74, hex('#a82a1a'));
  for (let x = 236; x < 282; x += 5) R.pset(x, 98, hex('#3a6aa8'));
};
const carabela = (x, y, c, vela) => { x = Math.round(x); y = Math.round(y);
  R.poligono([[x - 9, y], [x + 9, y], [x + 6, y + 4], [x - 6, y + 4]], c); R.linea(x - 9, y, x + 9, y, K);
  R.linea(x, y - 14, x, y, K); R.linea(x - 5, y - 10, x - 5, y, K);
  R.poligono([[x + 1, y - 13], [x + 8, y - 6], [x + 1, y - 3]], vela); R.linea(x + 1, y - 13, x + 8, y - 6, K);
  R.poligono([[x - 4, y - 9], [x - 1, y - 4], [x - 4, y - 2]], vela); R.rect(x, y - 16, x + 3, y - 15, hex('#a82a1a')); };
const p1 = (t) => {
  capa('nota', fondoNota);
  const base = CAPAS.nota;
  // la carabela de tinta, que en «coasts» se enciende y navega por sus puntos hasta las islas
  const nv = tramo(t, costas, oeste + 0.6), cx = lerp(200, 70, nv), cy = lerp(130, 124, nv) + Math.sin(t * 3) * 1.5;
  for (let x = 72; x < 200; x += 4) R.pset(x, 132 + Math.round(Math.sin(x * 0.1)), nv > 0 && x > cx ? ORO : hex('#6a4a2a'));
  if (nv > 0) for (let a = 0; a < 6.28; a += 0.25) R.pset(Math.round(cx + Math.cos(a) * 14), Math.round(cy - 6 + Math.sin(a) * 12), (Math.floor(t * 8) + a * 4) % 2 < 1 ? ORO : ORO3);
  carabela(cx, cy, nv > 0 ? hex('#7a4a2a') : hex('#5a3a22'), nv > 0 ? hex('#fff8e0') : hex('#e8d8b8'));
  // en «west» las islas brillan
  const isl = tramo(t, oeste, oeste + 0.8);
  if (isl > 0) for (const pts of [[[0, 24], [28, 30], [40, 52], [32, 80], [44, 100], [24, 122], [0, 116]], [[60, 140], [74, 132], [86, 140], [78, 150], [64, 150], [60, 140]]]) for (let i = 0; i < pts.length - 1; i++) { const n = 20; for (let s = 0; s <= n; s++) { const x = Math.round(lerp(pts[i][0], pts[i + 1][0], s / n)), y = Math.round(lerp(pts[i][1], pts[i + 1][1], s / n)); if ((s + Math.floor(t * 10)) % 3) R.pset(x - 1, y, (s + i) % 2 ? ORO : ORO3); } }
  // la lupa: recorre los renglones y se para en seco en «stopped»
  const rec = tramo(t, 0.05, para), sacude = t > para && t < para + 0.35 ? Math.round(Math.sin(t * 70) * 2) : 0;
  const lx = Math.round(lerp(196, 128, rec)) + sacude, ly = Math.round(lerp(58, 70, rec)), rr = 24;
  for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) { const d = Math.hypot(x, y); if (d > rr) continue; const sx = Math.round(lx + x / 2), sy = Math.round(ly + y / 2); if (sx < 0 || sx > 319 || sy < 0 || sy > 179) continue; let c = base[sy * 320 + sx]; if (d > rr - 3) c = mez(c, hex('#ffffff'), 0.25); R.pset(lx + x, ly + y, c); }
  for (let a = 0; a < 6.28; a += 0.02) { for (let q = 0; q < 3; q++) R.pset(Math.round(lx + Math.cos(a) * (rr + 1 + q)), Math.round(ly + Math.sin(a) * (rr + 1 + q)), q === 1 ? (Math.cos(a - 2.3) > 0.4 ? ORO3 : ORO) : hex('#6a4a1a')); }
  R.pset(lx - 10, ly - 12, hex('#ffffff')); R.pset(lx - 11, ly - 11, hex('#ffffff')); R.pset(lx - 12, ly - 10, hex('#ffffff'));
  // la escarcha de «cold»: cristales que crecen en el borde de la lupa
  const es = tramo(t, frio - 0.05, frio + 0.7);
  if (es > 0) for (let k = 0; k < 18; k++) { const a = k * 0.349 + 0.2, L = Math.round(es * (4 + (k % 3) * 3)); const bx = lx + Math.cos(a) * (rr - 1), by = ly + Math.sin(a) * (rr - 1);
    for (let i = 0; i < L; i++) { const x = Math.round(bx - Math.cos(a) * i), y = Math.round(by - Math.sin(a) * i); R.pset(x, y, i % 2 ? hex('#e8f8ff') : hex('#a8d8f0')); if (i === 2) { R.pset(x + 1, y - 1, hex('#ffffff')); R.pset(x - 1, y + 1, hex('#ffffff')); } } }
  if (t > frio) R.icono('!', lx + 30, ly - 22 - Math.round(Math.min(1, (t - frio) * 6) * 3), hex('#ffe890'), K, 2);
  // el mango de la lupa baja recto hasta la mano de Kahle, que entra por abajo
  for (let y = ly + rr + 3; y < ly + rr + 62; y++) { R.rect(lx - 2, y, lx + 2, y, K); R.rect(lx - 1, y, lx + 1, y, y < ly + rr + 8 ? ORO : (y % 7 === 0 ? hex('#3a2410') : hex('#6a4220'))); R.pset(lx - 1, y, y < ly + rr + 8 ? ORO3 : hex('#8a5a2e')); }
  T.brazo(R, lx + 14, 206, lx + 2, ly + rr + 56, '#6a5440', -1);
};

// 2 · LOCAL el camarote de Colón: dibuja su carta, la levanta, y sus cartas se pierden
const fondoCamarote = () => {
  // tablas del mamparo y baos del techo, tranquilo arriba a la derecha
  madera(0, 0, 319, 139, ['#2a1a0e', '#4a2e18', '#5a3a20', '#6a4628'].map(hex), 10, true, 12);
  for (let y = 0; y < 50; y++) for (let x = 274; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), hex('#3a2414'), 0.6));
  for (const by of [0, 22]) { R.rect(0, by, 270, by + 6, hex('#1e1008')); R.rect(0, by + 1, 270, by + 4, hex('#5a3a1e')); R.rect(0, by + 1, 270, by + 1, hex('#7a5430')); }
  // dos ventanas de popa con su marco y parteluces (el mar se pinta luego, recortado)
  for (const wx of [24, 206]) { R.rect(wx - 4, 36, wx + 58, 100, hex('#1e1008')); R.rect(wx - 2, 38, wx + 56, 98, hex('#8a5a2a')); R.rect(wx, 40, wx + 54, 96, K); }
  // las cartas clavadas en la pared, entre las ventanas
  // el suelo de cubierta
  madera(0, 140, 319, 179, ['#3a2210', '#5a3a1c', '#6a4626', '#7a5430'].map(hex), 7, false, 13);
  R.rect(0, 138, 319, 140, hex('#1e1008'));
  // un cofre, un barril y unos cabos adujados
  R.rect(8, 146, 52, 172, K); madera(9, 147, 51, 171, MAD, 4, false, 14); R.rect(9, 147, 51, 149, hex('#4a4a54')); R.rect(28, 152, 32, 158, ORO);
  R.rect(270, 132, 302, 174, K); for (let x = 271; x < 302; x++) R.rect(x, 133, x, 173, (x - 271) % 6 === 0 ? hex('#3a2210') : Math.abs(x - 286) < 6 ? hex('#8a5a2e') : hex('#6a4220')); for (const y of [140, 152, 166]) R.rect(271, y, 301, y + 1, hex('#4a4a54'));
  for (let k = 0; k < 4; k++) { R.disco(70, 168 - k * 2, 10 - k * 2, K); R.disco(70, 168 - k * 2, 9 - k * 2, k % 2 ? hex('#c8a870') : hex('#a88850')); }
};
const p2 = (t) => {
  capa('camarote', fondoCamarote);
  const bal = Math.sin(t * 1.1) * 3;
  // el mar por las ventanas: cielo tramado, nubes, horizonte que sube y baja con el balanceo, olas y una gaviota
  for (const wx of [24, 206]) {
    R.recorte([wx + 1, 41, wx + 53, 95]);
    const hor = Math.round(70 + bal);
    for (let y = 41; y <= 95; y++) for (let x = wx + 1; x <= wx + 53; x++) { let c;
      if (y < hor) { const u = (y - 41) / (hor - 41) + BAY[(y & 3) * 4 + (x & 3)] / 30; c = u < 0.5 ? hex('#5a90c8') : u < 0.85 ? hex('#8ab8e0') : hex('#d0e4f0'); }
      else { const u = (y - hor) / 26; c = u < 0.2 ? hex('#3a6a9a') : hex('#2a5080'); if (Math.sin(x * 0.4 + t * 2 + y * 1.3) > 0.85) c = hex('#8ab8d8'); }
      R.pset(x, y, c); }
    nube(wx + 18 + ((t * 2) % 60) - 10, 50, 0.35, [hex('#b8c8d8'), hex('#e8eef4'), hex('#ffffff')]);
    const gx = wx + ((t * 9 + wx) % 70) - 8, gy = 56 + Math.sin(t * 2) * 3, ala = Math.sin(t * 9) > 0; R.linea(Math.round(gx - 3), Math.round(gy - (ala ? 2 : 0)), Math.round(gx), Math.round(gy), hex('#ffffff')); R.linea(Math.round(gx), Math.round(gy), Math.round(gx + 3), Math.round(gy - (ala ? 2 : 0)), hex('#ffffff'));
    R.recorte(null);
    R.rect(wx + 26, 40, wx + 28, 96, hex('#5a3a1e')); R.rect(wx, 67, wx + 54, 68, hex('#5a3a1e'));
  }
  // las cartas clavadas entre las ventanas (y en «lost» se deshacen)
  const pierde = tramo(t, perdidas - 0.25, perdidas + 1.0);
  const carta = (x0, y0, w, al, sem, vis) => { if (vis <= 0) return; for (let y = y0; y < y0 + al; y++) for (let x = x0; x < x0 + w; x++) { if (h(x, y, sem) > vis) continue; let c = (x === x0 || y === y0 || x === x0 + w - 1 || y === y0 + al - 1) ? K : PAP[2 + ((x + y) & 1) * 0];
      const u = (x - x0) / w, v = (y - y0) / al; if (Math.abs(u - 0.3 - Math.sin(v * 6 + sem) * 0.08) < 0.06) c = hex('#6a8a4a'); if ((Math.floor(u * 10) + Math.floor(v * 8)) % 7 === 0 && u > 0.5) c = hex('#b8c890'); if (Math.abs(v - u * 0.8 - 0.1) < 0.02) c = hex('#a83a2a'); R.pset(x, y, c); }
    R.disco(x0 + Math.floor(w / 2), y0 + 1, 1, hex('#c8a040')); };
  carta(98, 38, 30, 24, 51, 1 - pierde); carta(134, 34, 34, 28, 52, 1 - tramo(t, perdidas - 0.1, perdidas + 1.1)); carta(174, 40, 24, 22, 53, 1 - tramo(t, perdidas, perdidas + 1.2));
  for (const [x, y] of [[113, 38], [151, 34], [186, 40]]) R.pset(x, y, hex('#c8a040'));
  // el farol que se mece colgado del bao
  const fa = Math.sin(t * 1.1 + 0.6) * 0.18, fx = Math.round(160 + Math.sin(fa) * 20), fy = Math.round(6 + Math.cos(fa) * 20);
  R.linea(160, 6, fx, fy, K); R.rect(fx - 4, fy, fx + 4, fy + 11, K); R.rect(fx - 3, fy + 2, fx + 3, fy + 9, hex('#ffd860')); R.rect(fx - 1, fy + 4, fx + 1, fy + 7, hex('#fff8d0')); R.rect(fx - 4, fy, fx + 4, fy + 1, hex('#5a5a5a')); R.rect(fx - 4, fy + 10, fx + 4, fy + 11, hex('#5a5a5a'));
  for (let y = 0; y < 140; y += 2) for (let x = Math.max(0, fx - 60); x < Math.min(320, fx + 60); x += 2) { const d = Math.hypot(x - fx, (y - fy - 6) * 1.2); if (d < 56 && h(x, y, Math.floor(t * 6)) < 0.5 * (1 - d / 56)) tin(x, y, hex('#ffd890'), 0.12); }
  // Colón detrás de su mesa
  const levanta = t > colon - 0.1 && t < perdidas + 0.3, triste = t > perdidas + 0.2;
  const dib = !levanta && !triste;
  // el grumete que barre junto al barril y mira cuando las cartas se pierden
  const gx = 244 + Math.round(Math.sin(t * 0.9) * 8), gr = R.actor(EL.marineroEspanol, gx, 168, t, { dir: t > perdidas ? -1 : 1, sostiene: t > perdidas ? undefined : [gx + 20, 166], sorpresa: t > perdidas + 0.1 });
  if (gr && gr.mano && t <= perdidas) { const [mx, my] = gr.mano, sw = Math.round(Math.sin(t * 6) * 3); R.linea(mx, my, mx + 6 + sw, 167, hex('#8a6a3a')); for (let k = -3; k <= 3; k++) R.linea(mx + 6 + sw + k, 166, mx + 6 + sw + k * 2, 169, hex('#c8a050')); }
  const cx = 150, c = R.actor(EL.colon, cx, 136, t, { dir: 1, sostiene: dib ? [cx + 18 + Math.round(Math.sin(t * 6) * 3), 124] : levanta ? [cx + 18, Math.round(lerp(118, 100, tramo(t, colon - 0.1, colon + 0.3)))] : undefined, sonrisa: levanta, triste, habla: t > colon + 0.3 && t < cartas && Math.sin(t * 8) > 0 });
  // la carta en la mano, alzada, que también se deshace
  if (levanta && c && c.mano) { const [mx, my] = c.mano; const vis = 1 - pierde; for (let y = my - 14; y < my + 2; y++) for (let x = mx - 2; x < mx + 20; x++) { if (h(x, y, 54) > vis) continue; const borde = x === mx - 2 || x === mx + 19 || y === my - 14 || y === my + 1; R.pset(x, y, borde ? K : (x - mx) % 7 === 3 && y < my - 4 ? hex('#6a8a4a') : PAP[3]); }
    if (vis > 0.5) { R.poligono([[mx + 4, my - 10], [mx + 9, my - 11], [mx + 8, my - 4], [mx + 5, my - 5]], hex('#c8a060')); R.poligono([[mx + 12, my - 8], [mx + 15, my - 9], [mx + 16, my - 6]], hex('#c8a060')); } }
  if (dib && c && c.mano) { const [mx, my] = c.mano; R.linea(mx, my, mx + 4, my - 8, hex('#f4f4f4')); R.pset(mx + 4, my - 9, hex('#ffffff')); }
  if (triste) R.icono('?', cx + 16, 92 - Math.round(Math.min(1, (t - perdidas - 0.2) * 6) * 3), hex('#ffe890'), K, 2);
  // la mesa, por delante, con cartas, el astrolabio, el tintero y la vela
  R.rect(96, 128, 234, 134, K); madera(97, 129, 233, 133, MAD, 3, false, 15); R.rect(97, 129, 233, 129, MAD[3]);
  R.rect(100, 134, 230, 156, K); madera(101, 135, 229, 155, MAD, 6, true, 16); for (const lx of [104, 222]) R.rect(lx, 156, lx + 4, 168, MAD[0]);
  const vm = 1 - tramo(t, perdidas + 0.1, perdidas + 1.2);
  if (vm > 0) { for (let y = 124; y < 129; y++) for (let x = 172; x < 210; x++) if (h(x, y, 55) < vm) R.pset(x, y, (x + y) % 9 === 0 ? hex('#6a8a4a') : PAP[3]); }
  R.disco(120, 124, 5, K); R.disco(120, 124, 4, hex('#c8a040')); R.disco(120, 124, 2, hex('#7a5a1a')); R.linea(116, 124, 124, 124, K);
  R.rect(218, 120, 224, 128, K); R.rect(219, 121, 223, 127, hex('#2a2a3a')); R.linea(222, 121, 228, 112, hex('#f4f4f4'));
  R.rect(134, 120, 137, 128, hex('#f4ecd8')); const ll = Math.floor(t * 9) % 2; R.pset(135 + ll, 118, hex('#ffd040')); R.pset(135, 117, hex('#fff8c0'));
  // el polvo de las cartas perdidas, que sale por las ventanas
  if (pierde > 0) for (let k = 0; k < 60; k++) { const s = pierde * (0.8 + h(k, 1, 56) * 0.6) - h(k, 2, 56) * 0.3; if (s <= 0 || s >= 1) continue;
    const ox = k % 3 === 0 ? 113 : k % 3 === 1 ? 151 : 186 + (k % 5), oy = 48 + (k % 7) * 2, dx = (k % 2 ? 56 : -100) + h(k, 3, 56) * 20;
    R.pset(Math.round(ox + dx * s), Math.round(oy + Math.sin(s * 8 + k) * 6 - s * 10), s < 0.5 ? PAP[3] : PAP[1]); }
};

// 3 · la imprenta: la noticia da la vuelta al mundo
const p3 = (t) => {
  const o = { encuadre: 'prensa' };
  T.estambul(R, t, o);
  // los pliegos que vuelan de la boca de la rotativa
  for (let k = 0; k < 5; k++) { const s = (t * 1.3 + k / 5) % 1; hoja(150 + s * 26, 98 + Math.sin(s * Math.PI) * -10 + s * 18, t * 8 + k, hex('#f4f0e4'), hex('#c8c4b8')); }
  // el impresor levanta un periódico con el mapa en «news»
  const alza = tramo(t, noticia - 0.3, noticia + 0.1);
  const ix = 160, im = R.actor(EL.impresor, ix, 152, t, { dir: 1, sostiene: alza > 0 ? [ix + 18, Math.round(lerp(134, 112, alza))] : [ix + 16, 130], sonrisa: alza > 0.5, habla: t > noticia + 0.4 && Math.sin(t * 8) > 0 });
  if (im && im.mano) { const [mx, my] = im.mano; const w = alza > 0 ? 20 : 12, al = alza > 0 ? 24 : 8;
    R.rect(mx - 2, my - al, mx + w, my + 1, K); R.rect(mx - 1, my - al + 1, mx + w - 1, my, hex('#f4f0e4'));
    if (alza > 0) { R.rect(mx, my - al + 2, mx + w - 2, my - al + 4, hex('#2a2a2a')); for (let y = my - al + 7; y < my - 1; y += 2) { R.linea(mx, y, mx + 6, y, hex('#8a8a8a')); }
      R.rect(mx + 8, my - al + 7, mx + w - 2, my - 3, hex('#e8d8b0')); R.poligono([[mx + 9, my - al + 9], [mx + 12, my - al + 8], [mx + 11, my - 5], [mx + 9, my - 7]], hex('#8a6a3a')); R.pset(mx + 15, my - 10, hex('#8a6a3a')); R.pset(mx + 16, my - 12, hex('#a83a2a')); } }
  // el chico de los periódicos: entra, coge el fajo y sale corriendo en «around the world»
  const ent = tramo(t, P3 + 0.1, noticia - 0.1), sale = tramo(t, mundo - 0.3, mundo + 1.6);
  const nx = sale > 0 ? Math.round(lerp(196, -30, sale)) : Math.round(lerp(330, 196, ent));
  const ch = R.actor(EL.chico, nx, 158, t, { dir: sale > 0 ? -1 : -1, anda: (ent > 0 && ent < 1) || (sale > 0 && sale < 1), sostiene: sale > 0 ? [nx - 4, 140] : undefined, sonrisa: sale > 0, dedo: ent >= 1 && sale <= 0 });
  if (sale > 0 && ch && ch.mano) { const [mx, my] = ch.mano; for (let k = 0; k < 4; k++) { R.rect(mx - 6, my - 4 - k * 2, mx + 6, my - 3 - k * 2, K); R.rect(mx - 5, my - 4 - k * 2, mx + 5, my - 4 - k * 2, hex('#f4f0e4')); } R.rect(mx - 1, my - 11, mx - 1, my - 3, hex('#a82a1a')); }
  if (sale > 0.05 && sale < 1) for (let k = 0; k < 3; k++) hoja(nx + 16 + k * 8, 136 - k * 6 + Math.sin(t * 6 + k) * 3, t * 10 + k, hex('#f4f0e4'), hex('#c8c4b8'));
  // el gato de la imprenta mueve la cola encima del chibalete (lo pinta el decorado); delante, la carretilla
  T.estambulDelante(R, t, o);
};

const año = (t) => (t >= P2 && t < P3 ? 1498 : 1929);
const efectos = [[para, 'golpecito'], [frio + 0.05, 'brillo'], [costas + 0.1, 'ola'], [colon, 'papel'], [perdidas, 'whoosh'], [P3 + 0.05, 'maquina'], [noticia, 'papel'], [mundo, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
