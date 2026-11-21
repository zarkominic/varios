E = {}

# ── AT-PACMAN (frase 10), 1982: el almacén lleno de cajas del juego del bocadito ───────────────────────────────────
E['at-pacman'] = ('Pac-Man', '''// AT-PACMAN (frase 10), 1982. Cuatro planos:
// 1. el pasillo del almacén entre estanterías de cajas: el gerente baja por el pasillo con su carpeta y a «wasn't alone»
//    señala las paredes de cajas del bocadito; el mozo entra empujando la carretilla de mano con las cajas verdes del
//    juego de los fosos y se para a mirar; al fondo cruza la carretilla elevadora;
// 2. el almacén entero: el camionero, dentro del remolque, tira cajas al otro, que las apila en el palé; el gerente
//    mira el marcador colgado del techo: a «12 million» cuenta hasta 12,000,000 junto a un cartucho, y a «consoles» se
//    enciende debajo 10,000,000 junto a una consola, con su barra más corta; el gerente señala la diferencia;
// 3. un salón recreativo (fondo local): en la tele del expositor, la versión de casa parpadea (el bocadito y dos bichos
//    que se ven a ratos); el ejecutivo mira con el cartucho en la mano y a «poor» se enfada; a «arcade» se gira hacia la
//    fila de recreativas nítidas, donde dos chicos juegan y saltan de alegría; a «unsold» tira el cartucho a la papelera;
// 4. un rincón del almacén al anochecer: a «filled up» las pilas de cajas crecen hasta el techo; a «nobody wanted» el
//    mozo baja la persiana de la puerta de carga, se sacude las manos y se va; un ratón cruza el suelo.''', r'''
import { ELENCO_AT as A, PIEZAS_AT as PZ } from '/atomo/plato/kits/pixel-chibi.js';
const C = T.C;
const a = (f) => en('pacman', f);
const P2 = a(0.2337), P3 = a(0.5846), P4 = a(0.8517);
const solo = a(0.0627), doce = a(0.2337), consolas = a(0.4702), mas = a(0.433), pobre = a(0.6446), recre = a(0.6934), millones = a(0.7478), sinVender = a(0.7889);
const llenas = a(0.8761), cajas = a(0.9138), nadie = a(0.936);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// el bocadito propio (no el de la marca): un queso redondo con agujeros y un mordisco arriba a la derecha
const bocadito = (x, y, r, fondo) => {
  R.disco(x, y, r + 1, C.k); R.disco(x, y, r, hex('#f0d040')); R.disco(x - 1, y + 1, Math.max(1, r - 2), hex('#e8b830'));
  R.disco(x + r - 1, y - r + 1, Math.max(1, Math.round(r * 0.55)), fondo);
  if (r >= 3) { R.pset(x - 1, y - 1, hex('#c87a20')); R.pset(x + 1, y + 2, hex('#c87a20')); R.pset(x - 2, y + 1, hex('#c87a20')); }
};
// una caja de cartón de almacén con su cinta y la pegatina del bocadito (x, yb: la esquina de abajo a la izquierda)
const carton = (x, yb, w, hh, verde = false) => {
  const cc = verde ? hex('#5a9a4a') : hex('#c8a06a'), cs = verde ? hex('#3a6a32') : hex('#8a6a3a'), cl = verde ? hex('#8ac87a') : hex('#e4c48c');
  R.rect(x, yb - hh, x + w - 1, yb - 1, C.k); R.rect(x + 1, yb - hh + 1, x + w - 2, yb - 2, cc);
  R.rect(x + 1, yb - hh + 1, x + w - 2, yb - hh + 2, cl); R.rect(x + w - 3, yb - hh + 3, x + w - 2, yb - 2, cs);
  R.rect(x + (w >> 1), yb - hh + 1, x + (w >> 1), yb - 2, hex('#a88050'));
  if (w >= 12 && hh >= 9) { if (verde) { R.rect(x + 3, yb - 6, x + 6, yb - 4, C.k); R.disco(x + 4, yb - 7, 1, hex('#f0d040')); } else bocadito(x + 4, yb - (hh >> 1) - 1, 2, cc); }
};
// la carpeta del gerente, en su mano
const carpeta = (m, abierta = 0) => { const [x, y] = m; R.rect(x - 4, y - 7, x + 3, y + 3, C.k); R.rect(x - 3, y - 6, x + 2, y + 2, hex('#8a5a2e')); R.rect(x - 2, y - 5, x + 1, y + 1, C.blanco); R.rect(x - 1, y - 8, x, y - 6, hex('#9a9aa8')); if (abierta) for (let k = 0; k < 3; k++) R.pset(x - 2 + k, y - 3 + k, hex('#3a3a8a')); };

// ── 1 · el pasillo ───────────────────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.tiendas(R, t, { encuadre: 'almacen', camara: 'pasillo' });
  // el gerente baja por el pasillo, se para a «wasn't alone» y señala las paredes de cajas
  const g = tramo(t, 0.15, solo - 0.05), gx = Math.round(lerp(150, 112, g)), gy = Math.round(lerp(150, 163, g));
  const señala = t > solo && t < solo + 1.5, anota = t > solo + 1.8;
  // el mozo empuja la carretilla de mano desde la derecha y se para junto al gerente
  const m = tramo(t, 0.5, 2.9), mx = Math.round(lerp(300, 196, m)), my = 166, anda = m > 0 && m < 1;
  const dibGerente = () => {
    const r = R.actor(A.gerenteAlmacen, gx, gy, t, { dir: señala ? 1 : -1, anda: g > 0 && g < 1, dedo: señala, habla: señala && parp(t, 8), sostiene: !señala ? [gx + (señala ? 16 : -2), gy - 11] : undefined });
    if (!señala) carpeta(r.mano, anota);
  };
  const dibMozo = () => {
    const r = R.actor(A.operario, mx, my, t, { dir: -1, anda, sostiene: [mx - 3, my - 12], sorpresa: t > solo + 1.6 && t < solo + 2.6 });
    // la carretilla de mano: el asa en la mano, el larguero, la pala, la rueda y tres cajas verdes del juego de los fosos
    const [hx, hy] = r.mano, bx = hx - 18;
    R.linea(hx, hy, bx + 14, my - 2, C.k); R.linea(hx + 1, hy, bx + 15, my - 2, hex('#c83a3a'));
    R.rect(bx - 2, my - 2, bx + 15, my - 1, C.k); R.rect(bx - 1, my - 2, bx + 14, my - 2, hex('#9a9aa8'));
    carton(bx - 1, my - 2, 14, 10, true); carton(bx, my - 12, 13, 9, true); carton(bx + 1, my - 21, 12, 8, true);
    const an = mx * 0.6; R.disco(bx + 13, my, 3, C.k); R.disco(bx + 13, my, 2, hex('#4a4856')); R.pset(Math.round(bx + 13 + Math.cos(an) * 2), Math.round(my + Math.sin(an) * 2), hex('#c8ccd8'));
  };
  if (gy > my) { dibMozo(); dibGerente(); } else { dibGerente(); dibMozo(); }
};

// ── 2 · el almacén y el marcador ─────────────────────────────────────────────────────────────────────────────────
const marcador = (t) => {
  const { rect, linea, pset } = R;
  for (const x of [66, 200]) for (let y = 15; y < 22; y += 2) { pset(x, y, hex('#6a6a76')); pset(x, y + 1, hex('#3a3a46')); }
  rect(54, 21, 212, 68, C.k); rect(55, 22, 211, 67, hex('#3a3a46')); rect(57, 24, 209, 65, hex('#14161e'));
  for (let y = 25; y < 65; y += 3) linea(58, y, 208, y, hex('#1a1d28'));
  for (const [x, y] of [[56, 23], [210, 23], [56, 66], [210, 66]]) pset(x, y, hex('#9a9aa8'));
  // fila 1: el cartucho del bocadito y los 12 millones (cuenta a «12 million»)
  const u1 = tramo(t, doce, doce + 0.9), u2 = tramo(t, consolas - 0.2, consolas + 0.7), brilla1 = t > mas && t < mas + 1.2 && parp(t, 14);
  rect(66, 26, 86, 44, hex('#5a6a8a')); rect(67, 27, 85, 43, hex('#8a9ab8')); PZ.cartucho(R, 76, 43, { color: 'amarillo', icono: 'comecocos' });
  if (u1 > 0) R.numero(fmt(Math.round(12e6 * u1 / 1e5) * 1e5), 98, 39, { color: brilla1 ? hex('#ffffff') : hex('#f0d040') });
  rect(98, 42, 98 + Math.round(80 * u1), 43, hex('#f0d040'));
  // fila 2: la consola y los 10 millones (a «consoles»), con su barra más corta
  rect(57, 46, 95, 63, hex('#5a6a8a')); rect(58, 47, 94, 62, hex('#8a9ab8')); PZ.consolaVieja(R, 76, 62, { s: 1 });
  if (u2 > 0) R.numero(fmt(Math.round(10e6 * u2 / 1e5) * 1e5), 98, 58, { color: hex('#7ac8f0') });
  rect(98, 61, 98 + Math.round(67 * u2), 62, hex('#7ac8f0'));
  if (u2 >= 1) { const x = 98 + 67; for (let y = 59; y < 64; y += 2) pset(x + 2, y, hex('#f06a5a')); R.icono('!', 183 - 2, 52, hex('#f06a5a'), C.k); }
};
const p2 = (t) => {
  T.tiendas(R, t, { encuadre: 'almacen' });
  marcador(t);
  // el camionero tira cajas desde el remolque; el otro las coge y las deja en el palé
  const per = 1.5, f = ((t - P2) % per) / per, n = Math.floor((t - P2) / per);
  const lanza = f < 0.35, vuela = f >= 0.35 && f < 0.7;
  R.actor(A.camionero, 266, 118, t, { dir: -1, sostiene: lanza ? [262, 104] : undefined, habla: f > 0.75 && parp(t, 7) });
  const cogida = f >= 0.7;
  const r2 = R.actor(A.camionero2, 226, 160, t, { dir: cogida && f > 0.85 ? -1 : 1, sostiene: cogida ? [cogida && f > 0.85 ? 222 : 240, 145] : undefined, sonrisa: f > 0.7 });
  if (lanza) carton(258, 106, 12, 9);
  if (vuela) { const v = (f - 0.35) / 0.35, x = lerp(258, 236, v), y = lerp(106, 150, v) - Math.sin(v * Math.PI) * 18; carton(Math.round(x), Math.round(y), 12, 9); }
  if (cogida) carton(r2.mano[0] - 6, r2.mano[1] + 5, 12, 9);
  // el gerente mira el marcador, apunta y a «more than» señala la diferencia
  const mira = t > doce - 0.3;
  const rg = R.actor(A.gerenteAlmacen, 138, 160, t, { dir: 1, dedo: (t > doce && t < doce + 1.2) || (t > mas && t < consolas + 1.5), sorpresa: t > doce + 0.4 && t < doce + 1.0, habla: t > consolas + 1.5 && parp(t, 8), sostiene: !((t > doce && t < doce + 1.2) || (t > mas && t < consolas + 1.5)) ? [150, 148] : undefined });
  if (!((t > doce && t < doce + 1.2) || (t > mas && t < consolas + 1.5))) carpeta(rg.mano, mira && Math.floor(t * 3) % 2);
  T.tiendasDelante(R, t, { encuadre: 'almacen' });
};

// la pantalla de la versión de casa: laberinto azul, puntos, el bocadito y dos bichos que solo se ven a ratos
const juegoPobre = (t, [x0, y0, x1, y1]) => {
  const { rect, pset } = R, malo = t > pobre;
  rect(x0, y0, x1, y1, hex('#0a0a1a'));
  const az = hex('#3a5ad8');
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, az); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, az); rect(x0 + 1, y0 + 1, x0 + 2, y1 - 1, az); rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, az);
  rect(x0 + 7, y0 + 7, x0 + 12, y0 + 9, az); rect(x1 - 12, y0 + 7, x1 - 7, y0 + 9, az); rect(x0 + 13, y0 + 15, x1 - 13, y0 + 17, az); rect(x0 + 7, y1 - 9, x0 + 12, y1 - 7, az); rect(x1 - 12, y1 - 9, x1 - 7, y1 - 7, az);
  for (let i = x0 + 5; i < x1 - 3; i += 4) { pset(i, y0 + 4, hex('#e8d8a8')); pset(i, y1 - 4, hex('#e8d8a8')); }
  const k = (t * 0.35) % 1, bx = Math.round(lerp(x0 + 6, x1 - 6, k));
  R.disco(bx, y0 + 4, 2, hex('#f0d040')); pset(bx + 1, y0 + 3, hex('#0a0a1a')); pset(bx + 2, y0 + 3, hex('#0a0a1a'));
  // los bichos parpadean: uno por fotograma (y casi nada cuando la versión «es pobre»)
  const fr = Math.floor(t * 15);
  const bicho = (x, y, c) => { rect(x - 2, y - 2, x + 2, y + 2, c); pset(x - 2, y + 2, hex('#0a0a1a')); pset(x + 2, y + 2, hex('#0a0a1a')); pset(x - 1, y - 1, C.blanco); pset(x + 1, y - 1, C.blanco); };
  if (fr % (malo ? 3 : 2) === 0) bicho(Math.round(lerp(x1 - 6, x0 + 6, (t * 0.27) % 1)), y1 - 4, hex('#e86a9a'));
  if (fr % (malo ? 3 : 2) === 1) bicho(Math.round(lerp(x0 + 6, x1 - 6, (t * 0.21 + 0.4) % 1)), y0 + 12, hex('#5ad8d8'));
  // la imagen tiembla y una franja de interferencia baja
  if (malo) { const yb = y0 + Math.floor((t * 22) % (y1 - y0)); for (let i = x0; i <= x1; i += 1) if ((i + fr) % 3) pset(i, yb, hex('#4a4a6a')); }
};
// la recreativa de verdad, de pie en el pasillo: mueble con su marquesina encendida, la pantalla nítida y brillante
const recreativa = (t, x, suelo, cu = '#3a2a6a', mq = '#f0d040') => {
  const { rect, pset, linea, disco } = R, y = suelo - 60;
  rect(x, y, x + 30, suelo, C.k); rect(x + 1, y + 1, x + 29, suelo - 1, hex(cu));
  for (let j = y + 18; j < suelo - 2; j += 4) linea(x + 1, j, x + 3, j - 2, hex('#e8803a'));
  rect(x + 2, y + 2, x + 28, y + 10, hex(mq)); for (let k = 0; k < 3; k++) R.icono('estrella', x + 3 + k * 9, y + 3, Math.floor(t * 4 + k) % 3 ? hex('#d0383a') : hex('#ffffff'), hex('#a87a20'));
  rect(x + 4, y + 13, x + 26, y + 31, hex('#1a1a2a')); rect(x + 5, y + 14, x + 25, y + 30, hex('#06061a'));
  // el juego nítido: un bocadito grande que se come una fila de puntos y tres bichos de colores fijos que lo persiguen
  const k = (t * 0.5) % 1, bx = Math.round(lerp(x + 7, x + 23, k));
  for (let i = x + 7; i < x + 24; i += 3) if (i > bx) pset(i, y + 22, hex('#ffe8a8'));
  rect(x + 5, y + 15, x + 25, y + 15, hex('#3a6ae8')); rect(x + 5, y + 29, x + 25, y + 29, hex('#3a6ae8')); rect(x + 9, y + 18, x + 21, y + 18, hex('#3a6ae8')); rect(x + 9, y + 26, x + 21, y + 26, hex('#3a6ae8'));
  disco(bx, y + 22, 2, hex('#f0d040')); pset(bx + 2, y + 21, hex('#06061a'));
  [['#e86a9a', 0.25], ['#5ad8d8', 0.45], ['#f0a040', 0.65]].forEach(([c, d]) => { const gx = Math.round(lerp(x + 7, x + 23, (k + 1 - d) % 1)); if (gx < bx) { rect(gx - 1, y + 21, gx + 1, y + 23, hex(c)); pset(gx, y + 21, C.blanco); } });
  rect(x + 2, y + 33, x + 28, y + 38, hex('#5a4a8a')); rect(x + 2, y + 33, x + 28, y + 33, hex('#8a7ab8'));
  disco(x + 9, y + 34, 1, hex('#d0383a')); rect(x + 9, y + 35, x + 9, y + 37, C.k); disco(x + 18, y + 36, 1, hex('#f0d040')); disco(x + 22, y + 36, 1, hex('#5adc5a'));
  rect(x + 9, y + 44, x + 21, y + 54, hex('#2a1a4a')); for (const dx of [12, 17]) { rect(x + dx, y + 46, x + dx + 1, y + 49, parpSlow(t) ? hex('#f06a5a') : hex('#8a2a2a')); }
  // el resplandor de la pantalla en el suelo
  for (let i = x - 4; i < x + 34; i += 2) pset(i, suelo + 1 + ((i >> 1) % 2), hex('#9a9ad8'));
};
const parpSlow = (t) => Math.sin(t * 3) > 0;
// ── 3 · el salón recreativo (fondo local): la versión de casa junto a la recreativa ──────────────────────────────
let fondo3 = null;
const pinta3 = () => {
  const { rect, linea, pset, disco } = R;
  const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // el techo negro con las placas y la pared morada con el mural de estrellas y planetas
  rect(0, 0, 319, 20, hex('#12101c')); for (let x = 0; x < 320; x += 32) linea(x, 0, x, 20, hex('#1c1a2a')); rect(0, 10, 319, 10, hex('#1c1a2a'));
  for (let y = 21; y < 128; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x, y, 1) > 0.985 ? hex('#e8e0ff') : hh(x >> 3, y >> 3, 2) > 0.8 ? hex('#2e1e4e') : hex('#261840'));
  disco(214, 52, 14, hex('#5a3a8a')); disco(210, 48, 10, hex('#7a5aaa')); linea(192, 58, 238, 44, hex('#e8a8f0')); linea(192, 59, 238, 45, hex('#c878d8'));
  disco(40, 40, 6, hex('#d86a3a')); disco(38, 38, 3, hex('#f0a060'));
  // la franja de neón del techo (rosa y azul)
  rect(0, 21, 319, 22, hex('#f05ac8')); rect(0, 23, 319, 23, hex('#7a2a6a')); rect(0, 125, 319, 126, hex('#4ad8f0'));
  // un neón de rayo en la pared, sin letras
  for (let k = 0; k < 3; k++) R.linea(160 + k * 8, 44 + (k % 2) * 8, 168 + k * 8, 52 - (k % 2) * 8, hex('#f05ac8'));
  // la máquina de cambio a la derecha, con su ranura y su luz
  rect(286, 60, 312, 128, C.k); rect(287, 61, 311, 127, hex('#8a8e9a')); rect(289, 64, 309, 76, hex('#d0383a')); rect(293, 80, 305, 92, hex('#2a2a3a')); for (let k = 0; k < 4; k++) disco(294 + k * 4, 104, 1, hex('#c8a040'));
  // la moqueta cósmica: azul oscuro con formas de colores
  for (let y = 127; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 2, y >> 2, 3); pset(x, y, q > 0.93 ? [hex('#f05ac8'), hex('#4ad8f0'), hex('#f0d040'), hex('#5adc5a')][Math.floor(hh(x >> 2, y >> 2, 4) * 4)] : (x + y) % 7 === 0 ? hex('#1a1a4a') : hex('#14143a')); }
};
const CABS = [[14, '#3a2a6a', '#f0d040'], [50, '#1a4a6a', '#5ad8d8'], [86, '#6a1a2a', '#f06a5a'], [122, '#1a5a2a', '#5adc5a']];
const p3 = (t) => {
  if (!fondo3) { fondo3 = R.nuevo(); const prev = R.usar(fondo3); pinta3(); R.usar(prev); }
  R.copiar(fondo3);
  const { rect, linea, pset, disco } = R;
  // la fila de recreativas al fondo con sus pantallas nítidas y sus resplandores
  CABS.forEach(([x, cu, mq], i) => recreativa(t + i * 0.7, x, 128, cu, mq));
  // los chicos juegan; a «arcade one» saltan de alegría
  const gana = t > recre + 0.1 && t < recre + 1.3;
  R.actor(EL.chicoPueblo, 54, 134, t, { dir: 1, sostiene: gana ? undefined : [62, 116], brazos: gana, salto: gana ? Math.round(Math.abs(Math.sin((t - recre) * 9)) * 4) : 0, sonrisa: true });
  R.actor(EL.chicaPueblo, 92, 134, t, { dir: -1, sostiene: gana ? undefined : [96, 116], brazos: gana && t > recre + 0.3, sonrisa: true, habla: !gana && parp(t, 6) });
  if (gana) for (let k = 0; k < 8; k++) { const an = t * 3 + k * 0.8, rr = 16 + 3 * Math.sin(t * 6 + k); pset(Math.round(78 + Math.cos(an) * rr * 1.4), Math.round(96 + Math.sin(an) * rr), hex('#fff0a0')); }
  // la papelera de rejilla
  rect(176, 150, 188, 164, C.k); rect(177, 151, 187, 163, hex('#6a6a76')); for (let x = 178; x < 187; x += 2) linea(x, 152, x, 162, hex('#4a4856')); rect(178, 149, 186, 150, hex('#e8e4d8'));
  // el ejecutivo de la versión de casa: mira la tele del expositor, se enfada, se gira y tira el cartucho a la papelera
  const giro = t > recre && t < millones, tira = tramo(t, millones, sinVender);
  const r = R.actor(EL.ejecutivoAtari, 196, 168, t, { dir: giro || tira > 0 ? -1 : 1, sostiene: tira < 0.15 ? (giro ? [190, 154] : [212, 154]) : undefined, enfado: t > pobre && t < recre, sorpresa: giro, triste: tira > 0.5, habla: t < pobre && parp(t, 7) });
  if (tira < 0.15) PZ.cartucho(R, r.mano[0], r.mano[1] + 5, { color: 'amarillo', icono: 'comecocos' });
  else if (tira < 1) { const v = (tira - 0.15) / 0.85, x = lerp(r.mano[0], 182, v), y = lerp(r.mano[1] + 5, 152, v) - Math.sin(v * Math.PI) * 14; PZ.cartucho(R, Math.round(x), Math.round(y), { color: 'amarillo', icono: 'comecocos' }); }
  else { rect(179, 146, 186, 149, C.k); rect(180, 147, 185, 148, hex('#e8c840')); }
  // el expositor de la consola de casa (delante): el mueble, la tele con la versión que parpadea y la consola
  rect(218, 140, 312, 179, C.k); rect(219, 141, 311, 179, hex('#c8c0b0')); rect(219, 141, 311, 144, hex('#e8e0d0')); rect(219, 160, 311, 161, hex('#a8a090'));
  for (let x = 224; x < 310; x += 18) { rect(x, 148, x + 12, 157, hex('#3a3a46')); PZ.cajaCartucho && PZ.cartucho(R, x + 6, 172, { color: ['amarillo', 'rojo', 'azul', 'verde', 'naranja'][((x - 224) / 18) % 5], icono: 'comecocos' }); }
  PZ.consolaVieja(R, 290, 140, { s: 1, cartucho: 'amarillo' });
  PZ.teleCRT(R, 248, 140, { s: 2, t, pantalla: (RR, rc) => juegoPobre(t, rc) });
  if (t > pobre && t < recre) R.icono('X', 240, 76, hex('#f06a5a'), C.k, 2);
};

// ── 4 · un rincón del almacén al anochecer (fondo local) ─────────────────────────────────────────────────────────
let fondo4 = null;
const pinta4 = () => {
  const { rect, linea, pset, disco, poligono } = R;
  const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // el techo de chapa con las cerchas
  rect(0, 0, 319, 30, hex('#2a2c38'));
  for (let x = 0; x < 320; x += 6) linea(x, 0, x, 30, hex('#30323e'));
  for (let i = 0; i < 6; i++) { const x0 = i * 60 - 10; linea(x0, 30, x0 + 30, 18, hex('#5a5a66')); linea(x0 + 30, 18, x0 + 60, 30, hex('#5a5a66')); linea(x0 + 30, 18, x0 + 30, 30, hex('#4a4a56')); }
  rect(0, 29, 319, 31, hex('#6a6a76')); rect(0, 18, 319, 18, hex('#5a5a66'));
  // la pared de chapa ondulada con remaches, óxido y una ventana alta
  for (let y = 32; y < 150; y++) for (let x = 0; x < 320; x++) { const r = x % 6, base = r < 2 ? hex('#7a8494') : r < 4 ? hex('#5e6878') : hex('#4a5262'); pset(x, y, base); }
  for (const y of [64, 108]) { rect(0, y, 319, y + 1, hex('#3e4654')); for (let x = 3; x < 320; x += 12) pset(x, y - 1, hex('#aab2c0')); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(hh(k, 1) * 300) + 6, y0 = 66 + Math.floor(hh(k, 2) * 40), l = 6 + Math.floor(hh(k, 3) * 18); for (let j = 0; j < l; j++) if (hh(k, j) > 0.3) pset(x + (j % 3 === 0 ? 1 : 0), y0 + j, hex('#9a5a3a')); }
  // el cuadro eléctrico y el extintor
  rect(196, 70, 214, 94, C.k); rect(197, 71, 213, 93, hex('#8a8e9a')); rect(199, 73, 211, 76, hex('#c8c84a')); for (let y = 80; y < 92; y += 3) rect(200, y, 210, y, hex('#5a5e6a'));
  rect(204, 112, 210, 132, C.k); rect(205, 113, 209, 131, hex('#d0383a')); rect(205, 113, 206, 131, hex('#f06a5a')); rect(206, 108, 208, 112, C.k);
  // la puerta de carga (x 228–312): el marco amarillo y negro
  rect(226, 46, 314, 150, C.k);
  for (let y = 46; y < 150; y += 6) { rect(226, y, 229, y + 2, hex('#e8c840')); rect(311, y + 3, 314, y + 5, hex('#e8c840')); }
  rect(230, 44, 310, 50, hex('#4a4a56')); rect(230, 44, 310, 45, hex('#6a6a76'));
  // el suelo de hormigón con juntas, la línea amarilla, manchas de aceite y un charco
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 1, y >> 1, 4) > 0.9 ? hex('#7a7a80') : (y - 150) % 10 === 0 ? hex('#6a6a70') : hex('#8a8a90'));
  for (let x = -40; x < 360; x += 48) linea(x + 20, 150, x, 179, hex('#6a6a70'));
  rect(0, 166, 319, 167, hex('#d8b830'));
  for (const [x, y, rr] of [[60, 172, 5], [150, 160, 3], [280, 176, 4]]) { disco(x, y, rr, hex('#5a5a62')); disco(x + 1, y, rr - 2, hex('#4a4a52')); }
  rect(0, 148, 319, 150, hex('#4a4a52'));
  // la telaraña del rincón
  for (let k = 0; k < 5; k++) linea(0, 32, 4 + k * 6, 32 + 24 - k * 5, hex('#c8ccd8'));
  for (const r of [6, 12, 18]) for (let k = 0; k < 5; k++) pset(Math.round(r * Math.cos(k * 0.35)), 32 + Math.round(r * Math.sin(k * 0.35 + 0.1)), hex('#c8ccd8'));
};
// el exterior por el hueco de la puerta: el patio al anochecer con nubes que pasan y el remolque de un camión
const fuera = (t) => {
  const { rect, pset, disco } = R;
  R.recorte([230, 51, 310, 149]);
  for (let y = 51; y < 150; y++) { const u = (y - 51) / 70; const c = u < 0.3 ? hex('#3a3a6a') : u < 0.55 ? hex('#7a4a7a') : u < 0.75 ? hex('#d07a5a') : hex('#e8a85a'); for (let x = 230; x <= 310; x++) pset(x, y, ((x + y) % 4 === 0 && u > 0.25 && u < 0.8) ? hex('#a85a6a') : c); }
  for (const [x0, y0, w, v, c] of [[240, 60, 22, 1.2, '#5a4a7a'], [290, 72, 16, 2.0, '#8a5a7a'], [250, 82, 26, 3.1, '#c87a6a']]) { const x = ((x0 + t * v * 4) % 110) + 220; disco(Math.round(x), y0, 4, hex(c)); disco(Math.round(x) + 5, y0 + 1, 3, hex(c)); disco(Math.round(x) - 5, y0 + 1, 3, hex(c)); }
  for (let k = 0; k < 2; k++) { const x = 300 - ((t * 9 + k * 40) % 90); pset(Math.round(x), 66 + k * 5, C.k); pset(Math.round(x) - 1, 65 + k * 5, C.k); pset(Math.round(x) + 1, 65 + k * 5, C.k); }
  rect(230, 120, 310, 149, hex('#6a6060')); for (let x = 230; x < 311; x += 7) pset(x, 121, hex('#8a7a70'));
  rect(250, 100, 310, 132, C.k); rect(251, 101, 310, 131, hex('#c8ccd8')); rect(251, 101, 310, 103, hex('#e8ecf0')); for (let x = 256; x < 310; x += 9) rect(x, 104, x, 130, hex('#9a9eaa'));
  disco(262, 136, 5, C.k); disco(262, 136, 2, hex('#6a6a76')); disco(292, 136, 5, C.k); disco(292, 136, 2, hex('#6a6a76'));
  // una farola que se enciende en el patio
  rect(240, 70, 241, 120, hex('#3a3a46')); disco(242, 70, 2, Math.sin(t * 2) > -0.6 ? hex('#fff0a0') : hex('#c8a85a'));
  R.recorte(null);
};
const p4 = (t) => {
  if (!fondo4) { fondo4 = R.nuevo(); const prev = R.usar(fondo4); pinta4(); R.usar(prev); }
  R.copiar(fondo4);
  const { rect, linea, pset, disco } = R;
  // la persiana: abierta hasta «nobody wanted»; el mozo tira de la cadena y baja
  const baja = tramo(t, nadie - 0.15, nadie + 1.0), yP = Math.round(lerp(52, 149, baja));
  fuera(t);
  for (let y = 51; y < yP; y++) { const c = y % 5 === 0 ? hex('#4a505e') : y % 5 === 1 ? hex('#aab2c0') : hex('#7a8494'); for (let x = 230; x <= 310; x++) pset(x, y, c); }
  if (baja > 0.02) { rect(230, yP - 2, 310, yP, C.k); rect(268, yP - 6, 272, yP - 2, hex('#3a3a46')); }
  // la luz de la puerta en el suelo, que desaparece al cerrar
  if (baja < 1) for (let y = 150; y < 180; y++) for (let x = 200 + (180 - y); x < 330 - (y - 150); x++) if ((x + y) % 2 === 0 && x >= 0 && x < 320 && y - 150 < 30 * (1 - baja)) R.pset(x, y, hex('#d8b88a'));
  // las pilas de cajas: cinco columnas que crecen hasta el techo a «filled up»
  // las pilas de cajas sobre sus palés: de alturas y tamaños distintos, que crecen hasta el techo a «filled up»
  const cols = [[4, 2, 30, 14, 8], [36, 3, 26, 12, 9], [64, 1, 32, 16, 7], [98, 2, 24, 13, 8], [124, 1, 30, 15, 7], [156, 0, 28, 12, 9], [186, 0, 22, 11, 4]];
  const crece = tramo(t, llenas - 0.1, cajas + 0.3);
  cols.forEach(([x, n0, w, hh, nmax], i) => {
    rect(x - 1, 146, x + w, 150, C.k); rect(x, 147, x + w - 1, 148, hex('#a8844a')); for (let px = x + 2; px < x + w - 2; px += 7) rect(px, 149, px + 3, 149, hex('#6a4a2a'));
    const n = Math.min(nmax, n0 + Math.floor(Math.max(0, crece * 1.15 - i * 0.03) * (nmax - n0 + 0.99)));
    for (let k = 0; k < n; k++) { const yb = 146 - k * hh - (k === n - 1 && crece > 0 && crece < 1 ? Math.round(3 * (1 - ((t * 7 + i) % 1))) : 0), dx = ((k * 7 + i * 3) % 5) - 2; carton(x + dx, yb, w - (k % 3 === 2 ? 4 : 0), hh, false); if (k % 4 === 1 && w > 24) R.numero(String(12 + ((k + i) % 7)), x + dx + w - 16, yb - 3, { color: hex('#5a3a1a'), sombra: false, fina: true }); }
  });
  // la lámpara colgada que se mece por delante de las pilas, y motas de polvo en su luz
  const ang = Math.sin(t * 1.7) * 0.18, lx = Math.round(150 + Math.sin(ang) * 22), ly = Math.round(30 + Math.cos(ang) * 22);
  linea(150, 30, lx, ly, C.k); rect(lx - 5, ly, lx + 5, ly + 3, hex('#3a5a3a')); rect(lx - 6, ly + 3, lx + 6, ly + 4, hex('#2a3a2a')); disco(lx, ly + 5, 2, t > nadie + 0.9 && parp(t, 23) ? hex('#a89858') : hex('#fff0a0'));
  for (let k = 0; k < 10; k++) { const x = Math.round(lx - 12 + ((k * 37 + t * 4) % 26)), y = Math.round(ly + 10 + ((k * 23 + t * 6) % 60)); pset(x, y, hex('#e8d8a8')); }
  // el ratón que cruza el suelo y se para a olisquear
  const rt = tramo(t, nadie + 0.6, nadie + 1.8), rx = Math.round(lerp(-8, 186, rt));
  if (rt > 0) { rect(rx, 172, rx + 5, 175, C.k); rect(rx + 1, 173, rx + 4, 174, hex('#8a8a9a')); pset(rx + 6, 173, C.k); pset(rx + 2, 171, hex('#e8a8b8')); linea(rx - 4, 175, rx, 174, hex('#e8a8b8')); if (rt >= 1 && parp(t, 20)) pset(rx + 7, 173, hex('#e8a8b8')); }
  // el mozo baja la persiana tirando de la cadena, se sacude las manos y se va
  const va = tramo(t, nadie + 1.3, nadie + 3.4), ox = Math.round(lerp(212, -24, va));
  linea(232, 54, 232, 128, hex('#9a9aa8'));
  const r = R.actor(A.operario, ox, 168, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, sostiene: t > nadie - 0.4 && t < nadie + 1.0 ? [232, 128 + Math.round(6 * Math.sin(t * 12))] : undefined, brazos: t > nadie + 1.0 && t < nadie + 1.3, triste: t > nadie + 1.0, dedo: t < nadie - 0.6 && t > llenas + 0.3 });
  if (t < nadie - 0.6 && t > llenas + 0.3) R.icono('!', ox + 6, 130, hex('#f0d040'), C.k);
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: 1982,
  efectos: [[0.4, 'carro'], [solo + 0.05, 'toc'], [doce, 'maquina'], [P2 + 1.5 * 0.7, 'golpecito'], [consolas, 'bip'], [pobre, 'zumbido'], [recre + 0.25, 'brillo'], [sinVender, 'golpecito'], [llenas, 'golpecito'], [nadie, 'cerrojo']],
});
''')

# ── AT-CHATARRA (frase 11), 1982: cualquiera hace juegos; las tiendas se llenan; el ordenador cuesta casi lo mismo ────
E['at-chatarra'] = ('Chatarra', '''// AT-CHATARRA (frase 11), 1982. Cinco planos:
// 1. un garaje de noche (fondo local): un aficionado teclea en su terminal; a «make games» sale un cartucho de su
//    grabadora casera, lo coge y a «Atari's console» lo pincha en la consola: la tele se enciende con su juego y él
//    levanta los brazos; fuera pasa un coche y titila la farola;
// 2. el estante de la juguetería de cerca: a «flooded» llueven cajas chillonas que se amontonan delante de las baldas;
//    a «rushed out» una mano mete deprisa una caja más en lo alto, que se tambalea y se cae;
// 3. la juguetería: el comprador duda con una caja en la mano (los «?»), la cambia por otra de la pirámide, vuelve a dudar
//    y a «stopped taking chances» la deja y se va con las manos vacías; el dependiente sonríe y luego se desinfla; al
//    fondo un niño juega a la tele de demostración;
// 4. el mostrador de cerca (fondo local): la consola con su precio y el ordenador con el suyo; a «starting to cost» la
//    mano del dependiente pega encima el precio nuevo, 199 junto a 149, y aparece la balanza;
// 5. la tele del salón de cerca: en el ordenador conectado a la tele, el juego da paso a la hoja de cálculo; a «use them»
//    las manos del padre teclean cifras y a «work» crecen las barras y sale el visto bueno.''', r'''
import { ELENCO_AT as A, PIEZAS_AT as PZ } from '/atomo/plato/kits/pixel-chibi.js';
const C = T.C;
const b = (f) => en('chatarra', f);
const P2 = b(0.182), P3 = b(0.4077), P4 = b(0.6608), P5 = b(0.8676);
const hacer = b(0.0686), consola = b(0.1134), inunda = b(0.2148), prisas = b(0.35), distinguir = b(0.4644), bueno = b(0.4863), malo = b(0.527), dejan = b(0.5718);
const ordenadores = b(0.7184), cuesta = b(0.7672), casi = b(0.8079), usar = b(0.9283), trabajo = b(0.963);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const COLS = ['rosa', 'naranja', 'turquesa', 'amarillo', 'morado', 'verde', 'rojo', 'azul'], ICOS = ['nave', 'flor', 'foso', 'comecocos'];

// ── 1 · el garaje (fondo local): cualquiera hacía juegos ────────────────────────────────────────────────────────
let fondo1 = null;
const pinta1 = () => {
  const { rect, linea, pset, disco } = R;
  const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // las vigas del techo y la pared de tablero perforado con herramientas colgadas
  rect(0, 0, 319, 18, hex('#3a2e24')); for (let x = 10; x < 320; x += 40) rect(x, 0, x + 5, 18, hex('#5a4634'));
  for (let y = 18; y < 132; y++) for (let x = 0; x < 230; x++) pset(x, y, (x % 6 === 3 && y % 6 === 3) ? hex('#7a5a3a') : hh(x >> 2, y >> 2, 1) > 0.9 ? hex('#c09a6a') : hex('#b48e5e'));
  // martillo, sierra, llave inglesa y destornilladores
  rect(20, 30, 22, 50, hex('#7a4a2a')); rect(16, 28, 26, 32, hex('#6a6a76'));
  for (let k = 0; k < 18; k++) pset(34 + k, 36 + (k % 2), hex('#9a9eaa')); rect(34, 30, 52, 35, hex('#c8ccd8')); rect(30, 30, 34, 38, hex('#8a4a2a'));
  linea(62, 28, 70, 48, hex('#9a9eaa')); disco(61, 27, 3, hex('#9a9eaa')); disco(61, 27, 1, hex('#b48e5e'));
  for (let k = 0; k < 4; k++) { rect(80 + k * 6, 28, 81 + k * 6, 40, hex('#c8ccd8')); rect(79 + k * 6, 40, 82 + k * 6, 46, [hex('#d0383a'), hex('#e8c840'), hex('#3a6ad8'), hex('#3a9a4a')][k]); }
  // la estantería con latas de pintura, cajas y un gato que duerme
  rect(110, 52, 222, 54, hex('#5a3a1a')); rect(110, 80, 222, 82, hex('#5a3a1a'));
  for (let k = 0; k < 5; k++) { rect(114 + k * 14, 40, 124 + k * 14, 51, C.k); rect(115 + k * 14, 41, 123 + k * 14, 50, hex(['#9a9eaa', '#c83a3a', '#3a6ad8', '#e8c840', '#5a9a4a'][k])); rect(115 + k * 14, 41, 123 + k * 14, 42, hex('#c8ccd8')); }
  for (let k = 0; k < 3; k++) { rect(114 + k * 24, 64, 134 + k * 24, 79, C.k); rect(115 + k * 24, 65, 133 + k * 24, 78, hex('#c8a06a')); rect(115 + k * 24, 65, 133 + k * 24, 67, hex('#e4c48c')); }
  // la puerta del garaje abierta a la calle de noche (x 230–319)
  rect(230, 18, 319, 150, C.k);
  for (let y = 19; y < 120; y++) for (let x = 232; x < 320; x++) pset(x, y, hh(x, y, 5) > 0.992 ? hex('#e8e8f8') : y < 60 ? hex('#141a3a') : hex('#1c2448'));
  rect(232, 88, 319, 120, hex('#2a2a3a')); rect(246, 72, 284, 100, hex('#3a2e3a')); R.poligono([[242, 72], [265, 58], [288, 72]], hex('#4a3a4a')); rect(252, 80, 260, 88, hex('#f0d878')); rect(270, 80, 278, 88, hex('#f0d878')); rect(262, 90, 268, 100, hex('#2a1e2a'));
  rect(232, 120, 319, 150, hex('#3a3a46')); rect(232, 132, 319, 132, hex('#c8c84a'));
  rect(300, 58, 301, 120, hex('#4a4a56')); rect(294, 56, 304, 59, hex('#4a4a56'));
  rect(230, 18, 319, 23, hex('#8a7a6a')); for (let x = 232; x < 320; x += 4) pset(x, 21, hex('#6a5a4a'));
  // el suelo de cemento con la mancha de aceite
  for (let y = 132; y < 180; y++) for (let x = 0; x < 232; x++) pset(x, y, hh(x >> 1, y >> 1, 6) > 0.92 ? hex('#7a7a80') : hex('#8e8e94'));
  disco(60, 170, 8, hex('#6a6a72')); disco(62, 170, 5, hex('#5a5a62'));
  // la entrada del garaje: el cemento de fuera, el carril de la puerta y la junta
  for (let y = 150; y < 180; y++) for (let x = 230; x < 320; x++) pset(x, y, hh(x >> 1, y >> 1, 7) > 0.9 ? hex('#6a6a72') : hex('#7a7a84'));
  rect(230, 150, 319, 151, hex('#4a4a52')); rect(226, 18, 229, 179, hex('#5a4a3a'));
  // la caja de herramientas roja y la caja de cartuchos vírgenes en el suelo
  rect(150, 158, 182, 176, C.k); rect(151, 159, 181, 175, hex('#c83a3a')); rect(151, 159, 181, 161, hex('#e86a5a')); rect(160, 154, 172, 158, C.k); rect(161, 155, 171, 157, hex('#8a8e9a'));
  rect(96, 160, 132, 178, C.k); rect(97, 161, 131, 177, hex('#c8a06a')); rect(97, 161, 131, 163, hex('#e4c48c'));
  for (let k = 0; k < 4; k++) { rect(100 + k * 8, 154, 106 + k * 8, 161, C.k); rect(101 + k * 8, 155, 105 + k * 8, 160, hex('#2a2a30')); }
  // las bobinas de cable y una caja de cartuchos vírgenes en el suelo
  disco(20, 160, 9, C.k); disco(20, 160, 8, hex('#3a3a46')); disco(20, 160, 3, hex('#8a8e9a'));
};
const p1 = (t) => {
  if (!fondo1) { fondo1 = R.nuevo(); const prev = R.usar(fondo1); pinta1(); R.usar(prev); }
  R.copiar(fondo1);
  const { rect, linea, pset, disco } = R;
  // la farola de la calle y un coche que pasa con los faros
  disco(300, 61, 2, hex('#fff0a0')); for (let k = 0; k < 4; k++) pset(296 + Math.round(Math.sin(t * 7 + k) * 5), 66 + k * 2, hex('#e8e0a0'));
  const cx = Math.round(lerp(350, 200, ((t * 0.5) % 1)));
  R.recorte([232, 18, 319, 150]); disco(cx, 124, 3, C.k); disco(cx + 22, 124, 3, C.k); R.poligono([[cx - 4, 122], [cx - 2, 112], [cx + 6, 108], [cx + 20, 108], [cx + 26, 114], [cx + 28, 122]], hex('#7a3a2a')); disco(cx - 3, 118, 1, hex('#fff8c0')); R.recorte(null);
  // el programador detrás del banco: teclea, coge el cartucho que sale a «make games» y lo pincha en la consola
  const coge = t > hacer, va = tramo(t, hacer + 0.3, consola + 0.2), pincha = t > consola + 0.2, x = Math.round(lerp(98, 168, va));
  R.actor(EL.jugadorPong, x, 128, t, { dir: 1, anda: va > 0 && va < 1, habla: !coge && parp(t, 9), sostiene: coge && !pincha ? [x + 18, 108] : undefined, brazos: t > consola + 1.1, sonrisa: t > consola + 0.6 });
  // el banco de trabajo (delante): tablero de madera, la terminal, la grabadora de cartuchos y la tele con la consola
  rect(10, 118, 226, 123, C.k); rect(11, 119, 225, 122, hex('#a8784a')); rect(11, 119, 225, 119, hex('#c89a6a'));
  rect(14, 123, 222, 150, hex('#6a4a2a')); for (let x = 20; x < 220; x += 50) rect(x, 128, x + 40, 146, hex('#7a5a36')); for (let x = 40; x < 220; x += 50) rect(x - 2, 136, x + 2, 137, hex('#c8a040'));
  // la terminal con texto verde que sale línea a línea
  rect(20, 88, 60, 118, C.k); rect(21, 89, 59, 117, hex('#c8bca0')); rect(25, 92, 55, 112, hex('#0a140a'));
  for (let k = 0; k < 6; k++) { const l = 6 + Math.floor(((t * 3 + k * 1.7) % 1) * 20); if (k < Math.floor(t * 4) % 7) rect(27, 94 + k * 3, 27 + l, 94 + k * 3, hex('#5adc5a')); }
  // la grabadora (caja gris con su luz) y el cartucho que sale a «make games»
  rect(66, 106, 96, 118, C.k); rect(67, 107, 95, 117, hex('#8a8e9a')); rect(70, 108, 92, 110, hex('#2a2a30')); disco(90, 114, 1, Math.floor(t * 6) % 2 ? hex('#f06a5a') : hex('#5a2a2a'));
  const sale = tramo(t, hacer - 0.4, hacer);
  if (!coge) PZ.cartucho(R, 81, Math.round(108 - 8 * sale), { color: 'turquesa', icono: 'flor' });
  else if (!pincha) { const tx = x + 18; PZ.cartucho(R, tx, 113, { color: 'turquesa', icono: 'flor' }); }
  // la pila de cartuchos ya hechos, la taza y el soldador que humea
  for (let k = 0; k < 4; k++) PZ.cartucho(R, 140 + (k % 2) * 13, 118 - Math.floor(k / 2) * 6, { color: ['rojo', 'naranja', 'morado', 'verde'][k], icono: ['nave', 'foso', 'flor', 'nave'][k] });
  rect(124, 110, 130, 118, C.k); rect(125, 111, 129, 117, hex('#e8e4d8'));
  for (let k = 0; k < 4; k++) { const f = (t * 0.7 + k / 4) % 1; pset(Math.round(127 + Math.sin(f * 8) * 2), Math.round(108 - f * 18), hex('#c8c8d0')); }
  // la tele pequeña con la consola: se enciende con el juego cuando pincha el cartucho
  PZ.consolaVieja(R, 194, 118, { s: 1, cartucho: pincha ? 'turquesa' : undefined });
  PZ.teleCRT(R, 194, 104, { s: 1, t, encendida: pincha ? undefined : false, pantalla: pincha ? (RR, [x0, y0, x1, y1]) => { RR.rect(x0, y0, x1, y1, hex('#3a8ae8')); RR.rect(x0, y1 - 4, x1, y1, hex('#5adc5a')); const gx = Math.round(lerp(x0 + 2, x1 - 4, (t * 0.6) % 1)); RR.rect(gx, y1 - 9 - Math.round(Math.abs(Math.sin(t * 5)) * 3), gx + 2, y1 - 5, hex('#f0d040')); RR.disco(x0 + 10, y1 - 6, 1, hex('#f07aa8')); } : undefined });
  if (t > consola + 0.6 && t < consola + 1.4) for (let k = 0; k < 6; k++) { const an = k * 1.05 + t * 5; pset(Math.round(194 + Math.cos(an) * 20), Math.round(90 + Math.sin(an) * 14), hex('#fff0a0')); }
};

// ── 2 · el estante: llueven cajas ────────────────────────────────────────────────────────────────────────────────
const MONTON = [[60, 186], [100, 186], [140, 186], [180, 186], [220, 186], [260, 186], [80, 146], [120, 146], [160, 146], [200, 146], [240, 146], [100, 106], [140, 106], [180, 106], [220, 106]];
const p2 = (t) => {
  T.tiendas(R, t, { encuadre: 'jugueteria82', camara: 'estante' });
  MONTON.forEach(([x, yb], i) => {
    const t0 = inunda - 0.1 + i * 0.16, u = (t - t0) / 0.45; if (u <= 0) return;
    const y = u < 1 ? lerp(-10, yb, u * u) : yb - Math.max(0, Math.sin((u - 1) * 9) * 6 * Math.exp(-(u - 1) * 5));
    PZ.cajaCartucho(R, x + (i % 3) - 1, Math.round(y), { s: 2, color: COLS[(i * 3) % 8], icono: ICOS[i % 4] });
  });
  // a «rushed out» una mano mete deprisa una caja más en lo alto; se tambalea y se cae
  const mete = tramo(t, prisas - 0.6, prisas - 0.1), quita = tramo(t, prisas + 0.1, prisas + 0.6);
  const hx = Math.round(lerp(340, 262, mete) + lerp(0, 80, quita)), hy = 70;
  const cae = tramo(t, prisas + 0.4, prisas + 1.0), tamb = t > prisas - 0.1 && t < prisas + 0.4 ? Math.round(Math.sin(t * 40) * 2) : 0;
  if (quita <= 0) PZ.cajaCartucho(R, hx - 19, hy + 20, { s: 2, color: 'rojo', icono: 'nave' });
  else if (cae < 1) PZ.cajaCartucho(R, 243 + tamb + Math.round(cae * 60), Math.round(66 + cae * cae * 130), { s: 2, color: 'rojo', icono: 'nave' });
  if (hx < 336) T.brazo(R, 352, 104, hx, hy, '#c83a3a', -1, { codo: [hx + 40, hy + 28] });
};

// ── 3 · la juguetería: el comprador que no se atreve ─────────────────────────────────────────────────────────────
const p3 = (t) => {
  T.tiendas(R, t, { encuadre: 'jugueteria82', ordenador: true, precioPC: 599, gente: true });
  // el niño juega a la tele de demostración
  R.actor(EL.nino77, 152, 140, t, { dir: -1, sostiene: [146, 128], salto: Math.sin(t * 5) > 0.85 ? 2 : 0, sonrisa: true });
  // el comprador: caja A en la mano, duda; la cambia por la B; duda; a «stopped» la deja y se va
  const cambia = tramo(t, malo - 0.25, malo + 0.25), deja = tramo(t, dejan - 0.1, dejan + 0.4), va = tramo(t, dejan + 0.5, P4 - 0.2);
  const x = Math.round(lerp(176, -24, va)), sostiene = deja < 0.5 && !(cambia > 0.3 && cambia < 0.7);
  const r = R.actor(A.comprador, x, 158, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, sostiene: sostiene ? [x + 18, 140 - (t > bueno && t < bueno + 0.6 ? 4 : 0)] : undefined, dedo: cambia > 0.3 && cambia < 0.7, triste: deja > 0, enfado: t > malo + 0.3 && t < dejan });
  if (sostiene) PZ.cajaCartucho(R, r.mano[0] + 2, r.mano[1] + 8, { color: cambia < 0.5 ? 'rosa' : 'turquesa', icono: cambia < 0.5 ? 'nave' : 'flor' });
  if ((t > P3 + 0.4 && t < malo - 0.3) || (t > malo + 0.3 && t < dejan)) R.icono('?', x + 4, 118 + (parp(t, 5) ? 0 : 1), hex('#f0d040'), C.k, 2);
  if (va > 0) R.icono('X', x + 5, 122, hex('#f06a5a'), C.k);
  // las dos cajas que se cambian van y vuelven a la pirámide
  if (!sostiene && deja < 0.5) PZ.cajaCartucho(R, 200, 145, { color: cambia < 0.5 ? 'turquesa' : 'rosa', icono: cambia < 0.5 ? 'flor' : 'nave' });
  if (deja >= 0.5) PZ.cajaCartucho(R, 200, 145, { color: 'turquesa', icono: 'flor' });
  // el dependiente: sonríe y señala la pirámide; cuando el comprador se va, se desinfla
  R.actor(A.dependiente, 262, 150, t, { dir: -1, sonrisa: t < dejan, dedo: t > P3 + 0.3 && t < P3 + 1.3, triste: t > dejan + 0.3, habla: t > P3 + 0.3 && t < P3 + 1.3 && parp(t, 8) });
  T.tiendasDelante(R, t, { encuadre: 'jugueteria82' });
};

// ── 4 · el mostrador de cerca: el precio del ordenador (fondo local) ─────────────────────────────────────────────
let fondo4 = null;
const pinta4 = () => {
  const { rect, linea, pset, disco } = R;
  const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // la pared de la tienda desenfocada: tablero perforado con cajitas borrosas de colores, la franja naranja y el reloj
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 8 === 4 && y % 8 === 4) ? hex('#b8a888') : hex('#d8c8a4'));
  rect(0, 16, 319, 21, hex('#e07a2a')); rect(0, 22, 319, 25, hex('#7a4a24'));
  const vivos = ['#e86a9a', '#e8803a', '#2aa8a0', '#e8c840', '#8a4ab8', '#3a9a4a', '#d0383a', '#3a6ad8'];
  for (let f = 0; f < 3; f++) { rect(0, 52 + f * 26, 270, 53 + f * 26, hex('#8a6a4a')); for (let k = 0; k < 15; k++) { const x = 6 + k * 17 + (f % 2) * 6, c = hex(vivos[(k + f * 3) % 8]); rect(x, 36 + f * 26, x + 11, 51 + f * 26, hex('#c8b898')); rect(x + 1, 37 + f * 26, x + 10, 50 + f * 26, c); rect(x + 2, 40 + f * 26, x + 9, 47 + f * 26, hex('#2a2a40')); } }
  rect(286, 50, 310, 74, hex('#c8b898')); disco(298, 62, 10, hex('#7a4a24')); disco(298, 62, 9, hex('#f4ecd8'));
  // el mostrador de madera con vetas, el canto de latón y el cristal con reflejos
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2 + y * 0.02); pset(x, y, v > 0.6 ? hex('#9a6a3a') : v > -0.2 ? hex('#8a5a2e') : hex('#7a4e26')); }
  rect(0, 112, 319, 114, hex('#d8b850')); rect(0, 115, 319, 115, hex('#8a6a2a'));
  for (let k = 0; k < 20; k++) { const x = Math.floor(hh(k, 9) * 320), y = 120 + Math.floor(hh(k, 8) * 56); linea(x, y, x + 6, y, hex('#a87a4a')); }
  // un bloc de recibos, el bolígrafo, un bote de caramelos y un cartucho suelto
  rect(14, 140, 46, 166, C.k); rect(15, 141, 45, 165, hex('#f4f0e4')); for (let y = 145; y < 164; y += 4) linea(18, y, 42, y, hex('#a8b8d8'));
  linea(50, 168, 70, 156, C.k); linea(51, 168, 71, 156, hex('#3a3ad8'));
  rect(274, 130, 300, 162, C.k); rect(275, 131, 299, 161, hex('#c8e0e8')); for (let k = 0; k < 14; k++) disco(279 + (k * 7) % 18, 136 + Math.floor(k / 3) * 5, 2, hex(vivos[k % 8])); rect(273, 126, 301, 130, hex('#d0383a'));
};
const ordenador = (x, y) => {
  // un ordenador doméstico genérico de teclado (sin marca): la carcasa beige en cuña, las teclas oscuras y la luz roja
  const { rect, pset, linea } = R;
  rect(x, y, x + 110, y + 30, C.k); rect(x + 1, y + 1, x + 109, y + 29, hex('#d8ccb0')); rect(x + 1, y + 1, x + 109, y + 4, hex('#ece4cc')); rect(x + 1, y + 25, x + 109, y + 29, hex('#b0a488'));
  for (let f = 0; f < 4; f++) for (let k = 0; k < 13 - (f === 3 ? 4 : 0); k++) { const kx = x + 8 + k * 7 + f * 2, ky = y + 6 + f * 5; rect(kx, ky, kx + 5, ky + 3, hex('#4a4038')); pset(kx + 1, ky, hex('#7a6e60')); }
  rect(x + 30, y + 26, x + 70, y + 27, hex('#4a4038')); rect(x + 100, y + 7, x + 103, y + 9, hex('#d0383a'));
  // el monitor encima, con la cuadrícula de cifras
  rect(x + 24, y - 52, x + 86, y - 2, C.k); rect(x + 25, y - 51, x + 85, y - 3, hex('#c8bca0')); rect(x + 30, y - 46, x + 80, y - 10, hex('#2a3a8a'));
  for (let f = 0; f < 5; f++) for (let k = 0; k < 4; k++) rect(x + 33 + k * 12, y - 43 + f * 7, x + 40 + k * 12, y - 41 + f * 7, hex('#8aa8f0'));
  rect(x + 40, y - 2, x + 70, y, hex('#a89c80'));
};
const etiqueta = (x, y, txt, c, brillo) => {
  const w = txt.length * 8 + 8;
  R.linea(x + (w >> 1), y - 8, x + (w >> 1), y, hex('#d8d8e0'));
  R.rect(x - 1, y - 1, x + w, y + 14, C.k); R.rect(x, y, x + w - 1, y + 13, brillo ? hex('#fff8c0') : hex('#fffaf0')); R.rect(x, y, x + 2, y + 13, c);
  R.numero(txt, x + 6, y + 11, { color: c });
};
const p4 = (t) => {
  if (!fondo4) { fondo4 = R.nuevo(); const prev = R.usar(fondo4); pinta4(); R.usar(prev); }
  R.copiar(fondo4);
  // las agujas del reloj de la pared
  const an = t * 0.8; R.linea(298, 62, Math.round(298 + Math.cos(an) * 7), Math.round(62 + Math.sin(an) * 7), C.k); R.linea(298, 62, 298, 56, C.k);
  // la consola a la izquierda con su precio, el ordenador a la derecha con el suyo
  PZ.consolaVieja(R, 76, 146, { s: 3, cartucho: 'amarillo' });
  ordenador(150, 120);
  const brilla = t > casi && t < casi + 1.4 && parp(t, 10);
  etiqueta(48, 78, '$149', hex('#3a6ad8'), brilla);
  const pega = tramo(t, cuesta - 0.5, cuesta), sale = tramo(t, cuesta + 0.35, cuesta + 0.9);
  // el precio viejo, y encima el nuevo que trae la mano del dependiente
  etiqueta(244, 78, '$599', hex('#d0383a'), false);
  const nx = Math.round(lerp(330, 244, pega)), ny = Math.round(lerp(60, 78, pega));
  if (pega > 0) etiqueta(nx, ny, '$199', hex('#3a9a4a'), brilla);
  if (pega > 0 && sale < 1) { const hx = nx + Math.round(lerp(0, 60, sale)) + 44, hy = ny + 7; T.brazo(R, 340, hy + 26, hx, hy, '#f4f4ec', -1); }
  // a «almost as much» aparece la balanza entre los dos precios
  if (t > casi) { const s = tramo(t, casi, casi + 0.3); if (s > 0.5) R.icono('balanza', 140, 66 + Math.round(Math.sin(t * 6)), hex('#f0d040'), C.k, 4); }
};

// ── 5 · el ordenador conectado a la tele del salón ───────────────────────────────────────────────────────────────
const pantalla = (t, [x0, y0, x1, y1]) => {
  const { rect, pset } = R;
  const hoja = t > usar - 0.2;
  rect(x0, y0, x1, y1, hex('#7a8ae8'));
  rect(x0 + 8, y0 + 8, x1 - 8, y1 - 8, hex('#2a32a8'));
  if (!hoja) {
    // el juego: un muñequito que salta entre plataformas
    const gx = Math.round(lerp(x0 + 14, x1 - 20, (t * 0.4) % 1)), gy = y1 - 22 - Math.round(Math.abs(Math.sin(t * 5)) * 10);
    rect(x0 + 10, y1 - 14, x1 - 10, y1 - 11, hex('#5adc5a')); rect(x0 + 40, y1 - 30, x0 + 70, y1 - 28, hex('#5adc5a'));
    rect(gx, gy, gx + 3, gy + 6, hex('#f0d040')); pset(gx + 1, gy + 1, C.k);
    return;
  }
  // la hoja de cálculo: cuadrícula con cifras que se van escribiendo y barras que crecen a «work»
  for (let x = x0 + 10; x < x1 - 9; x += 30) for (let y = y0 + 10; y < y1 - 10; y++) pset(x, y, hex('#4a5ad8'));
  for (let y = y0 + 20; y < y1 - 10; y += 11) for (let x = x0 + 10; x < x1 - 9; x++) pset(x, y, hex('#4a5ad8'));
  const filas = ['1983', '120', '45', '380', '75'], n = Math.floor((t - usar) * 10);
  filas.forEach((s, i) => { const vis = Math.max(0, Math.min(s.length, n - i * 3)); if (vis > 0) R.numero(s, x0 + 14, y0 + 19 + i * 11, { color: hex('#c8d8ff'), n: vis * 8, sombra: false }); });
  const cr = tramo(t, trabajo - 0.3, trabajo + 0.4);
  [16, 28, 22, 34].forEach((hgt, i) => { const h2 = Math.round(hgt * cr), bx = x0 + 74 + i * 12; if (h2 > 0) rect(bx, y1 - 14 - h2, bx + 7, y1 - 14, [hex('#f0d040'), hex('#5adc5a'), hex('#f06a5a'), hex('#5ad8d8')][i]); });
  if (t > trabajo + 0.3) T.visto(R, x1 - 26, y0 + 12, 1);
  if (Math.floor(t * 3) % 2) rect(x0 + 14 + Math.min(4, Math.max(0, n)) * 8, y0 + 64, x0 + 20 + Math.min(4, Math.max(0, n)) * 8, y0 + 66, hex('#c8d8ff'));
};
const p5 = (t) => {
  T.atari(R, t, { encuadre: 'salon77', camara: 'tele', pantalla: (RR, t2, rc) => pantalla(t, rc) });
  // el ordenador de teclado en la moqueta, delante de la consola, con su cable a la tele
  const { rect, pset, linea } = R;
  linea(204, 150, 230, 124, C.k);
  rect(96, 146, 206, 176, C.k); rect(97, 147, 205, 175, hex('#d8ccb0')); rect(97, 147, 205, 150, hex('#ece4cc')); rect(97, 171, 205, 175, hex('#b0a488'));
  const tecla = Math.floor(t * 9);
  for (let f = 0; f < 4; f++) for (let k = 0; k < 14 - (f === 3 ? 4 : 0); k++) { const kx = 102 + k * 7 + f * 2, ky = 152 + f * 5, pul = t > usar && (tecla * 7 + f * 3) % 37 === k; rect(kx, ky + (pul ? 1 : 0), kx + 5, ky + 3, pul ? hex('#2a2018') : hex('#4a4038')); pset(kx + 1, ky, hex('#7a6e60')); }
  rect(196, 153, 199, 155, t > usar ? hex('#f06a5a') : hex('#8a2a2a'));
  // las manos del padre: llegan a «use them» y teclean
  const llega = tramo(t, usar - 0.6, usar), golpe = t > usar ? Math.round(Math.abs(Math.sin(t * 16)) * 3) : 0, golpe2 = t > usar ? Math.round(Math.abs(Math.cos(t * 13)) * 3) : 0;
  const li = Math.round(lerp(200, 160, llega)), ld = Math.round(lerp(200, 160, llega));
  T.brazo(R, 92, 214, 128, li - golpe, '#8a5a3a', 1, { codo: [100, 186] });
  T.brazo(R, 224, 214, 176, ld - golpe2, '#8a5a3a', -1, { codo: [216, 186] });
};

const año = 1982;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], {
  año,
  efectos: [[0.4, 'pop'], [1.6, 'pop'], [consola - 0.3, 'whoosh'], [consola + 0.9, 'brillo'], [inunda, 'avalancha'], [prisas + 0.9, 'golpecito'], [bueno, 'papel'], [dejan + 0.1, 'toc'], [cuesta, 'papel'], [casi + 0.1, 'brillo'], [usar, 'tecleo'], [trabajo + 0.3, 'bip']],
});
''')

# ── AT-DERRUMBE (frase 12), 1983: la rebaja, la caída del 97 % y las empresas que cierran ─────────────────────────────
E['at-derrumbe'] = ('Derrumbe', '''// AT-DERRUMBE (frase 12), cartela «1983». Cinco planos:
// 1. la juguetería de 1984 de bajón: la torre de cajas del mostrador se viene abajo a «collapse» (golpe); el dependiente
//    se lleva las manos a la cara y, a «marked down», levanta el cartel con el 5; una clienta pasa sin mirar;
// 2. la cesta de saldo de cerca (gag 4): el cartel dice 35; a «to $5» la mano del dependiente tacha y el precio baja hasta
//    5 mientras el cartucho de encima se encoge de vergüenza (ojos, colores y gota de sudor); a «still didn't sell» una
//    mano se acerca, duda y se va; a «By 1985» baja una araña y teje su tela: pasa el tiempo;
// 3. un despacho con un rotafolio (fondo local): junto a la barra de 1982 se dibujan las de 1983, 1984 y 1985, cada vez
//    más bajas; a «fallen» cae la línea roja y el que presenta la sigue con el puntero; a «97» se escribe -97 % y los dos
//    consejeros sentados dan un respingo;
// 4. la mesa de juntas de cerca (fondo local): una mano apila fajos hasta la torre de 1983 ($3,200,000,000) y a «to about»
//    deja al lado el único fajo de 1985 ($100,000,000); el humo del cenicero sube;
// 5. el despacho de un programador de noche: a «companies» mete sus cosas en una caja, a «shut down» se apagan la
//    terminal, la tele y el flexo, y se va con la caja.''', r'''
import { ELENCO_AT as A, PIEZAS_AT as PZ } from '/atomo/plato/kits/pixel-chibi.js';
const C = T.C;
const c = (f) => en('derrumbe', f);
const P2 = c(0.1973), P3 = c(0.4564), P4 = c(0.6797), P5 = c(0.927);
const derrumbe = c(0.0509), rebaja = c(0.1347), treinta = c(0.2091), a5 = c(0.2453), cinco = c(0.2786), aun = c(0.3207), ochenta5 = c(0.3878);
const caido = c(0.569), noventa = c(0.6229), tres = c(0.7169), aCien = c(0.806), cien = c(0.856), empresas = c(0.9437), cierran = c(0.9613);
const parp = (t, v = 7) => Math.sin(t * v) > 0;

// ── 1 · la juguetería de 1984: la torre de cajas se derrumba ─────────────────────────────────────────────────────
const TORRE = [[252, 141, 'rosa', 'nave'], [270, 141, 'verde', 'foso'], [261, 121, 'amarillo', 'comecocos'], [252, 101, 'azul', 'flor'], [270, 101, 'naranja', 'nave']];
const SUELO = [[214, 172], [236, 176], [196, 178], [256, 179], [226, 166]];
const p1 = (t) => {
  T.tiendas(R, t, { encuadre: 'jugueteria84', gente: true });
  // la clienta pasa por delante sin mirar las cestas
  const v = tramo(t, 1.4, P2 - 0.2), vx = Math.round(lerp(-20, 200, v));
  R.actor(EL.espectadora, vx, 162, t, { dir: 1, anda: v > 0 && v < 1, triste: t > derrumbe + 0.4 });
  // el dependiente: susto al derrumbe y luego levanta el cartel del 5
  const cartel = t > rebaja - 0.2;
  const r = R.actor(A.dependiente, 262, 150, t, { dir: -1, sorpresa: t > derrumbe && t < derrumbe + 0.9, brazos: t > derrumbe + 0.1 && t < derrumbe + 0.6, triste: t > derrumbe + 0.9 && !cartel, sostiene: cartel ? [250, 124] : undefined, habla: cartel && parp(t, 8) });
  T.tiendasDelante(R, t, { encuadre: 'jugueteria84', precio: t < rebaja + 0.3 ? 35 : 5 });
  // la torre de cajas sobre la encimera: tiembla y se viene abajo a «collapse»
  const u = tramo(t, derrumbe - 0.05, derrumbe + 0.55);
  TORRE.forEach(([x, y, col, ico], i) => {
    if (u <= 0) { const tb = t > derrumbe - 0.6 ? Math.round(Math.sin(t * 30 + i) * (i > 2 ? 1 : 0)) : 0; PZ.cajaCartucho(R, x + tb, y, { color: col, icono: ico }); return; }
    const [sx, sy] = SUELO[i], uu = Math.min(1, u * (1.1 + i * 0.1));
    PZ.cajaCartucho(R, Math.round(lerp(x, sx, uu)), Math.round(lerp(y, sy, uu * uu) - Math.sin(uu * Math.PI) * 10), { color: col, icono: ico, dir: i % 2 ? -1 : 1 });
  });
  if (u > 0.9 && t < derrumbe + 1.2) for (let k = 0; k < 8; k++) { const an = k * 0.8, rr = 6 + (t - derrumbe) * 20; R.pset(Math.round(228 + Math.cos(an) * rr), Math.round(172 + Math.sin(an) * rr * 0.4), hex('#d8d0c0')); }
  // el cartel del 5 en la mano del dependiente
  if (cartel) { const [mx, my] = r.mano; R.rect(mx - 12, my - 15, mx + 6, my - 2, C.k); R.rect(mx - 11, my - 14, mx + 5, my - 3, hex('#d0383a')); R.numero('$5', mx - 9, my - 5, { color: hex('#fff8e0'), sombra: false }); }
};

// ── 2 · la cesta de saldo (gag 4): el precio baja y el cartucho se encoge ─────────────────────────────────────────
const p2 = (t) => {
  const baja = tramo(t, a5, cinco), precio = Math.round(lerp(35, 5, baja));
  T.tiendas(R, t, { encuadre: 'jugueteria84', camara: 'cesta', precio, precioAntes: baja >= 1 ? 35 : undefined });
  const { rect, pset, linea, disco } = R;
  // el cartucho de encima, con su foco: se encoge de vergüenza a medida que baja el precio
  const s = baja < 0.35 ? 4 : baja < 0.75 ? 3 : 2, x = 76, yb = 98;
  PZ.cartucho(R, x, yb, { s, color: 'amarillo', icono: 'comecocos' });
  // su cara sobre la etiqueta: dos ojos que miran el cartel, los colores de vergüenza, la gota de sudor y la boca triste
  const e = Math.max(2, s), ey = yb - 15 * s + 4 * s, ex1 = x - 3 * s - 1, ex2 = x + 2 * s - 1, mira = baja > 0 && baja < 1 ? 1 : 0;
  for (const ex of [ex1, ex2]) { rect(ex - 1, ey - 1, ex + e, ey + e, C.k); rect(ex, ey, ex + e - 1, ey + e - 1, C.blanco); rect(ex + mira * (e >> 1), ey + (e >> 1), ex + mira * (e >> 1) + Math.max(1, e >> 1) - 1, ey + e - 1, C.k); }
  if (baja > 0.15) { rect(ex1 - 1, ey + e + 1, ex1 + 1, ey + e + 2, hex('#f06a8a')); rect(ex2 + e - 2, ey + e + 1, ex2 + e, ey + e + 2, hex('#f06a8a')); }
  if (baja > 0.4 || t > cinco) { const gy = ey - 2 + Math.round(((t * 2) % 1) * 6); disco(ex2 + e + 3, gy, 1, hex('#8ac8f0')); pset(ex2 + e + 3, gy - 2, hex('#8ac8f0')); }
  { const my = ey + e + 4, mx0 = x - s - 1, mx1 = x + s + 1; rect(mx0, my, mx1, my, C.k); if (t > aun) { pset(mx0 - 1, my + 1, C.k); pset(mx1 + 1, my + 1, C.k); } }
  // la mano del dependiente que tacha el 35 con el rotulador
  const ent = tramo(t, a5 - 0.5, a5), sal = tramo(t, cinco + 0.1, cinco + 0.6);
  if (ent > 0 && sal < 1) { const hx = Math.round(lerp(340, 284, ent) + lerp(0, 60, sal) + (baja > 0 && baja < 1 ? Math.sin(t * 30) * 3 : 0)), hy = 60; T.brazo(R, 334, hy + 30, hx, hy, '#f4f4ec', -1); linea(hx - 9, hy - 2, hx - 15, hy - 8, C.k); linea(hx - 8, hy - 2, hx - 14, hy - 8, hex('#3a3a8a')); }
  // una mano se acerca al cartucho a «still didn't sell», duda y se va
  const acerca = tramo(t, aun - 0.5, aun + 0.1), vuelve = tramo(t, aun + 0.6, aun + 1.1);
  if (acerca > 0 && vuelve < 1) { const hx = Math.round(lerp(-20, 40, acerca) - lerp(0, 70, vuelve)), hy = Math.round(lerp(120, 100, acerca)); T.brazo(R, hx - 34, hy + 22, hx, hy, '#3a6ad8', 1); }
  // a «By 1985» baja la araña por su hilo y teje la tela entre el palo del cartel y el montón: pasa el tiempo
  const ar = tramo(t, ochenta5 - 0.4, ochenta5 + 0.5), tela = tramo(t, ochenta5 + 0.4, P3 - 0.4), cx = 196, cy = 46;
  if (tela > 0) {
    const rad = 26 * tela;
    for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.2; linea(cx, cy, Math.round(cx + Math.cos(an) * rad), Math.round(cy + Math.sin(an) * rad * 0.8), hex('#e4e4ee')); }
    for (const f of [0.35, 0.65, 0.95]) if (tela > f * 0.8) for (let k = 0; k < 8; k++) { const a1 = k * Math.PI / 4 + 0.2, a2 = a1 + Math.PI / 4; linea(Math.round(cx + Math.cos(a1) * rad * f), Math.round(cy + Math.sin(a1) * rad * f * 0.8), Math.round(cx + Math.cos(a2) * rad * f), Math.round(cy + Math.sin(a2) * rad * f * 0.8), hex('#c8c8d8')); }
  }
  if (ar > 0) {
    const ay = tela > 0 ? cy : Math.round(lerp(16, cy, ar)), axx = cx;
    linea(axx, 15, axx, ay, hex('#e8e8f0'));
    disco(axx, ay + 1, 3, C.k); disco(axx, ay - 2, 2, C.k); pset(axx - 1, ay - 3, hex('#f06a5a')); pset(axx + 1, ay - 3, hex('#f06a5a'));
    for (const [dx, dy] of [[-4, -1], [-5, 1], [-4, 3], [4, -1], [5, 1], [4, 3]]) { pset(axx + dx, ay + dy, C.k); pset(axx + dx + Math.sign(dx), ay + dy + 1, C.k); }
  }
};

// ── 3 · el rotafolio (fondo local): la caída del 97 % ───────────────────────────────────────────────────────────
let fondo3 = null;
const pinta3 = () => {
  const { rect, linea, pset, disco } = R;
  const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
  // la pared de papel pintado de rayas verde agua, el zócalo y la moqueta parda
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 12 < 2 ? hex('#8aa89a') : x % 12 < 6 ? hex('#a8c4b4') : hex('#9cb8a8'));
  rect(0, 0, 319, 6, hex('#e8e4d8')); rect(0, 7, 319, 8, hex('#c8c0b0'));
  rect(0, 140, 319, 150, hex('#6a4a2a')); rect(0, 140, 319, 141, hex('#8a6a4a'));
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 1, y, 2) > 0.85 ? hex('#6a4e3a') : hex('#7a5a42'));
  // la ventana con la persiana a la ciudad
  rect(14, 30, 76, 106, C.k); rect(16, 32, 74, 104, hex('#8ac0e8')); for (let k = 0; k < 6; k++) { const x = 18 + k * 9, hgt = 20 + Math.floor(hh(k, 1) * 40); rect(x, 104 - hgt, x + 7, 104, hex('#5a6a8a')); for (let j = 104 - hgt + 3; j < 102; j += 5) pset(x + 2, j, hex('#f0d878')); }
  for (let y = 32; y < 60; y += 3) rect(16, y, 74, y, hex('#e8e4d8')); rect(14, 106, 78, 109, hex('#e8e4d8'));
  // el ficus en su maceta
  rect(286, 118, 304, 140, C.k); rect(287, 119, 303, 139, hex('#c8603a'));
  for (let k = 0; k < 16; k++) { const x = 284 + Math.floor(hh(k, 3) * 24), y = 66 + Math.floor(hh(k, 4) * 50); disco(x, y, 3, hex('#3a8a3a')); pset(x - 1, y - 1, hex('#6ac86a')); } linea(295, 118, 295, 70, hex('#5a3a1a'));
  // el caballete: patas de madera y el bloc de papel grande con las pinzas
  linea(112, 160, 136, 20, hex('#5a3a1a')); linea(113, 160, 137, 20, hex('#8a5a2e')); linea(264, 160, 240, 20, hex('#5a3a1a')); linea(263, 160, 239, 20, hex('#8a5a2e')); linea(188, 20, 188, 170, hex('#6a4a2a'));
  rect(104, 18, 272, 146, C.k); rect(105, 19, 271, 145, hex('#f8f6ee')); rect(105, 19, 271, 23, hex('#e4e0d4'));
  for (const x of [130, 246]) { rect(x - 4, 14, x + 4, 20, hex('#3a3a46')); rect(x - 3, 15, x + 3, 16, hex('#9a9aa8')); }
  rect(100, 146, 276, 150, hex('#8a5a2e'));
  // los ejes: el vertical con sus marcas y el horizontal con los años
  rect(122, 34, 123, 128, hex('#2a2a3a')); rect(122, 127, 260, 128, hex('#2a2a3a')); for (let y = 40; y < 128; y += 22) rect(119, y, 121, y, hex('#2a2a3a'));
  // la barra de 1982, ya dibujada con rotulador azul, y su sombreado
  rect(132, 44, 152, 126, hex('#3a6ad8')); for (let y = 46; y < 126; y += 3) linea(134, y, 150, y, hex('#5a8af0'));
};
const AÑOS = [['82', 142], ['83', 172], ['84', 202], ['85', 232]], ALTOS = [82, 36, 12, 3];
const p3 = (t) => {
  if (!fondo3) { fondo3 = R.nuevo(); const prev = R.usar(fondo3); pinta3(); R.usar(prev); }
  R.copiar(fondo3);
  const { rect, linea, pset } = R;
  // las barras de 1983, 1984 y 1985 se dibujan una tras otra, y los años debajo
  AÑOS.forEach(([a, x], i) => {
    R.numero(a, x - 7, 140, { color: hex('#2a2a3a'), sombra: false });
    if (i === 0) return;
    const u = tramo(t, P3 + 0.3 + (i - 1) * 0.9, P3 + 0.9 + (i - 1) * 0.9), hgt = Math.round(ALTOS[i] * u);
    if (hgt > 0) { rect(x - 10, 126 - hgt, x + 10, 126, hex('#d0383a')); for (let y = 128 - hgt; y < 126; y += 3) linea(x - 8, y, x + 8, y, hex('#f06a5a')); }
  });
  // la línea roja que cae a «fallen», con su flecha al final
  const cae = tramo(t, caido - 0.3, noventa - 0.1), pts = AÑOS.map(([, x], i) => [x, 124 - ALTOS[i]]);
  for (let i = 0; i < 3; i++) { const u = Math.max(0, Math.min(1, cae * 3 - i)); if (u <= 0) break; const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; const xe = Math.round(lerp(x0, x1, u)), ye = Math.round(lerp(y0, y1, u)); for (const d of [0, 1]) linea(x0, y0 + d, xe, ye + d, hex('#b0202a')); }
  if (cae >= 1) R.poligono([[232, 126], [226, 116], [238, 116]], hex('#b0202a'));
  // a «97» se escribe el -97 % arriba a la derecha
  if (t > noventa) R.numero('-97%', 196, 50, { color: hex('#d0383a'), tam: 16, n: Math.round(tramo(t, noventa, noventa + 0.5) * 64) });
  // el que presenta, al lado del caballete, señala la caída con el puntero
  const señala = t > caido - 0.4;
  const r = R.actor(EL.ejecutivoAtari2, 274, 168, t, { dir: -1, sostiene: [262, 150], sorpresa: t > noventa && t < noventa + 0.8, habla: !señala && parp(t, 7), triste: t > noventa + 0.8 });
  const p = cae, [px, py] = señala ? [Math.round(lerp(150, 232, p)), Math.round(lerp(40, 118, p))] : [180, 100];
  linea(r.mano[0], r.mano[1], px, py, C.k); linea(r.mano[0], r.mano[1] - 1, px, py - 1, hex('#8a5a2e')); pset(px, py, C.blanco);
  // dos consejeros en sillas a la izquierda: se miran y a «97» dan un respingo
  const resp = t > noventa && t < noventa + 0.5 ? 3 : 0;
  R.actor(EL.ejecutivoAtari, 22, 170 - resp, t, { dir: 1, sorpresa: resp > 0, triste: t > noventa + 0.5, habla: t < caido && parp(t, 6) });
  R.actor(EL.ejecutivoWarner, 58, 172 - resp, t, { dir: 1, sorpresa: resp > 0, enfado: t > noventa + 0.5, dedo: t > P3 + 0.4 && t < P3 + 1.2 });
  for (const [x, y] of [[20, 170], [56, 172]]) { rect(x - 1, y - 12, x + 18, y - 9, C.k); rect(x, y - 11, x + 17, y - 10, hex('#5a3a2a')); rect(x + 1, y - 9, x + 2, y, hex('#3a2a1a')); rect(x + 15, y - 9, x + 16, y, hex('#3a2a1a')); }
  if (resp) { R.icono('!', 26, 132, hex('#f0d040'), C.k, 2); R.icono('!', 62, 134, hex('#f0d040'), C.k, 2); }
};

// ── 4 · la mesa de juntas de cerca: la torre de fajos de 1983 y el fajo de 1985 (fondo local) ───────────────────────
let fondo4 = null;
const pinta4 = () => {
  const { rect, linea, pset, disco } = R;
  // los paneles de nogal con sus molduras, el zócalo y un cuadro de un velero
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.11 + Math.sin(y * 0.07 + x * 0.01) * 3); pset(x, y, x % 64 < 2 ? hex('#3a2212') : v > 0.5 ? hex('#6a4224') : v > -0.4 ? hex('#5a361c') : hex('#4e2e16')); }
  for (let k = 0; k < 5; k++) { const x0 = k * 64 + 8; rect(x0, 24, x0 + 48, 24, hex('#7a5232')); rect(x0, 96, x0 + 48, 96, hex('#3a2212')); rect(x0, 24, x0, 96, hex('#7a5232')); rect(x0 + 48, 24, x0 + 48, 96, hex('#3a2212')); }
  rect(196, 30, 250, 72, hex('#c8a040')); rect(198, 32, 248, 70, hex('#7ab0d8')); rect(198, 58, 248, 70, hex('#3a6a9a')); for (let x = 200; x < 248; x += 5) pset(x, 60 + (x % 3), hex('#c8e0f0'));
  linea(222, 38, 222, 58, hex('#4a3a2a')); R.poligono([[223, 38], [236, 56], [223, 56]], hex('#f4f0e4')); R.poligono([[221, 42], [212, 56], [221, 56]], hex('#e8e0d0')); rect(214, 57, 234, 59, hex('#7a3a2a'));
  // la mesa de nogal pulido con el reflejo de la ventana
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.04 + Math.sin(y * 0.25) * 1.5 + y * 0.05); pset(x, y, v > 0.55 ? hex('#7a4a26') : v > -0.3 ? hex('#6a3e1e') : hex('#5a3418')); }
  for (let y = 120; y < 176; y += 2) for (let x = 20 + (y - 120); x < 60 + (y - 120); x += 2) pset(x, y, hex('#8a5a32'));
  rect(0, 116, 319, 117, hex('#9a6a3a'));
  // el cenicero de cristal, la carpeta de informes y la pluma
  disco(36, 160, 12, C.k); disco(36, 160, 11, hex('#a8c0c8')); disco(36, 160, 7, hex('#6a8088')); rect(30, 158, 44, 159, hex('#f4f0e4')); rect(42, 157, 44, 160, hex('#e8803a'));
  rect(274, 140, 318, 176, C.k); rect(275, 141, 317, 175, hex('#e8dcc0')); rect(275, 141, 317, 145, hex('#3a6ad8')); for (let y = 150; y < 172; y += 4) linea(280, y, 312, y, hex('#a8a090'));
  linea(250, 178, 272, 168, C.k); linea(250, 177, 272, 167, hex('#c8a040'));
  // el reloj de pared y el cuadro de la gráfica de barras de los buenos tiempos
  disco(150, 50, 13, C.k); disco(150, 50, 12, hex('#c8a040')); disco(150, 50, 10, hex('#f4ecd8')); for (let k = 0; k < 12; k++) pset(Math.round(150 + Math.cos(k * 0.5236) * 8), Math.round(50 + Math.sin(k * 0.5236) * 8), C.k);

};
const fajo = (x, y) => { R.rect(x, y, x + 39, y + 3, C.k); R.rect(x + 1, y + 1, x + 38, y + 2, hex('#7ab86a')); R.rect(x + 1, y + 1, x + 38, y + 1, hex('#a8d898')); R.rect(x + 17, y, x + 22, y + 3, hex('#f4ecd0')); };
const placa = (x, y, txt) => { R.rect(x, y, x + 36, y + 12, C.k); R.rect(x + 1, y + 1, x + 35, y + 11, hex('#c8a040')); R.rect(x + 1, y + 1, x + 35, y + 2, hex('#f0d878')); R.numero(txt, x + 3, y + 10, { color: hex('#3a2212'), sombra: false }); };
const p4 = (t) => {
  if (!fondo4) { fondo4 = R.nuevo(); const prev = R.usar(fondo4); pinta4(); R.usar(prev); }
  R.copiar(fondo4);
  // el reloj anda y el humo del cenicero sube
  { const an = t * 0.9 - 1.5; R.linea(150, 50, Math.round(150 + Math.cos(an) * 8), Math.round(50 + Math.sin(an) * 8), C.k); R.linea(150, 50, 150 + 4, 50 - 3, C.k); }
  for (let k = 0; k < 7; k++) { const f = ((t * 0.5 + k / 7) % 1), y = Math.round(156 - f * 50), x = Math.round(42 + Math.sin(f * 7 + t) * 4 * f); R.pset(x, y, hex('#c8c0b8')); if (f < 0.6) R.pset(x + 1, y, hex('#a8a098')); }
  // la torre de 1983: los fajos caen uno a uno hasta 32 y la cifra cuenta a la vez
  const sube = tramo(t, P4 + 0.2, tres + 0.4), n = Math.max(1, Math.round(32 * sube));
  for (let k = 0; k < n; k++) fajo(56, 156 - k * 3);
  placa(58, 162, '1983');
  // la mano que pone el fajo de arriba
  if (sube < 1) { const hy = 156 - n * 3 - 1; fajo(Math.round(lerp(10, 56, ((t * 4) % 1))), hy - 3); T.brazo(R, -14, hy + 24, Math.round(lerp(10, 56, ((t * 4) % 1))) + 4, hy - 2, '#3a3a5a', 1); }
  const v = Math.round(3200 * sube) * 1e6;
  R.numero('$' + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','), 76, Math.max(24, 156 - n * 3 - 8), { centro: true, color: hex('#a8f098') });
  // a «to about» llega el único fajo de 1985
  const llega = tramo(t, aCien, cien), hx = Math.round(lerp(340, 232, llega));
  if (llega > 0) { fajo(hx - 26, Math.round(lerp(120, 156, llega))); placa(208, 162, '1985'); }
  if (llega > 0 && t < cien + 0.6) T.brazo(R, 352, 100, hx + 18, Math.round(lerp(118, 154, llega)), '#3a3a5a', -1, { codo: [hx + 50, Math.round(lerp(118, 154, llega)) - 20] });
  if (t > cien) R.numero('$100,000,000', 226, 146, { centro: true, color: hex('#f06a5a') });
};

// ── 5 · el despacho de noche: recoge sus cosas y apaga ───────────────────────────────────────────────────────────
const p5 = (t) => {
  T.atari(R, t, { encuadre: 'despachoProg' });
  const apaga = t > cierran;
  const va = tramo(t, cierran + 0.35, cierran + 2.6), x = Math.round(lerp(104, 330, va));
  const r = R.actor(EL.ejecutivoAtari2, x, 152, t, { dir: 1, anda: va > 0 && va < 1, sostiene: [x + 18, 134], triste: true, dedo: t < empresas - 0.1 });
  // la caja de cartón con sus cosas: una planta y un cartucho
  const [mx, my] = r.mano, bx = mx - 4, by = my - 6;
  R.rect(bx - 6, by, bx + 10, by + 10, C.k); R.rect(bx - 5, by + 1, bx + 9, by + 9, hex('#c8a06a')); R.rect(bx - 5, by + 1, bx + 9, by + 2, hex('#e4c48c'));
  R.rect(bx - 2, by - 6, bx + 1, by, hex('#3a9a4a')); R.pset(bx - 3, by - 5, hex('#5ac85a')); R.pset(bx + 2, by - 4, hex('#5ac85a'));
  if (t > empresas - 0.3) { R.rect(bx + 4, by - 4, bx + 8, by, C.k); R.rect(bx + 5, by - 3, bx + 7, by - 1, hex('#e8c840')); }
  T.atariDelante(R, t, { encuadre: 'despachoProg' });
  // a «shut down» se apagan la terminal, la tele de pruebas y el flexo: la habitación se queda a oscuras
  if (apaga) {
    const k = tramo(t, cierran, cierran + 0.6);
    R.rect(38, 110, 76, 138, hex('#0a0e0a')); R.rect(214, 103, 242, 121, hex('#0a0a12'));
    if (k < 1) { R.rect(56 - Math.round((1 - k) * 18), 123, 56 + Math.round((1 - k) * 18), 124, hex('#8aff8a')); }
    T.tinte(R, 0, 179, [10, 12, 30], 0.35 * k);
  }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], {
  cartela: '1983',
  año: (t) => (t < ochenta5 ? 1983 : 1985),
  efectos: [[derrumbe, 'avalancha'], [rebaja, 'papel'], [a5, 'lapiz'], [cinco, 'boing'], [aun + 0.1, 'whoosh'], [ochenta5 + 0.2, 'tic'], [noventa, 'boom'], [P4 + 0.3, 'papel'], [aCien + 0.4, 'papel'], [cierran, 'interruptor']],
});
''')
