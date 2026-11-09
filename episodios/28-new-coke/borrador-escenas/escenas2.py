E = {}

# Lo común a las tres escenas del grupo 2 (se antepone a cada cuerpo): el reparto, el búfer de las capas fijas, el
# tramado y las piezas pequeñas que se pintan en la escena (vasito, pluma, cajón de botellas, carruaje, nubes, pájaros).
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC;
const K0 = hex('#1a1420');
const rp = (...a) => a.map((s) => hex(s));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c, d, a) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, r2 = d & 255, g2 = (d >>> 8) & 255, b2 = (d >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const luz = (cx, cy, r, col, a) => { for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g > 0) R.pset(x, y, mez(R.pget(x, y), col, a * g * g)); } };
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / Math.max(1e-6, a1 - a0)));
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en un búfer y en cada fotograma se copia (sin R.usar() a secas)
const capa = (k, f) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); f(); R.usar(p); CAPAS.set(k, b); } R.copiar(b); };
const llena = (x0, y0, x1, y1, ramp, f) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(ramp, f(x, y), x, y)); };
// ladrillo: hiladas de 4 px a matajunta, cada pieza con su tono y la arista de arriba más clara
const ladrillos = (x0, y0, x1, y1, ramp, junta, k = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 4), off = fila % 2 ? 4 : 0;
  for (let x = x0; x <= x1; x++) { const jx = (x - x0 + off) % 8 === 0, jy = (y - y0) % 4 === 3;
    if (jx || jy) R.pset(x, y, junta); else R.pset(x, y, R.tone(ramp, 1.4 + (hh(Math.floor((x - x0 + off) / 8), fila, k) - 0.5) * 1.8 + ((y - y0) % 4 === 0 ? 0.7 : 0), x, y)); } } };
// tablas horizontales con veta, juntas y algún nudo
const tablas = (x0, y0, x1, y1, ramp, alto = 6, k = 0, luz = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1;
  for (let x = x0; x <= x1; x++) { const largo = 40 + Math.floor(hh(fila, 3, k) * 40), jx = (x + Math.floor(hh(fila, 7, k) * 60)) % largo === 0;
    if (jy || jx) { R.pset(x, y, ramp[0]); continue; }
    const veta = Math.sin(x * 0.11 + fila * 2.7 + Math.sin(x * 0.03 + fila) * 2 + ((y - y0) % alto) * 0.8) * 0.45;
    const nudo = Math.hypot(((x * 7 + fila * 31) % 97) - 48, (((y - y0) % alto) - alto / 2) * 3) < 3 ? -0.9 : 0;
    R.pset(x, y, R.tone(ramp, 1.6 + veta + nudo + (hh(fila, 1, k) - 0.5) * 0.6 + luz, x, y)); } } };
// nube de tres tonos (sombra abajo, luz arriba)
const nube = (cx, cy, w, T3, ok = null) => { const bs = [[0, -w * 0.13, w * 0.24], [-w * 0.27, 0, w * 0.19], [w * 0.27, 0, w * 0.2], [-w * 0.06, 0.02 * w, w * 0.26]];
  const x0 = Math.floor(cx - w * 0.5), x1 = Math.ceil(cx + w * 0.5), y0 = Math.floor(cy - w * 0.4), y1 = Math.ceil(cy + w * 0.12);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let d = 9; for (const [dx, dy, r] of bs) { const q = Math.hypot(x + 0.5 - cx - dx, (y + 0.5 - cy - dy) * 1.35) / r; if (q < d) d = q; }
    if (d > 1 || (ok && !ok(x, y))) continue; R.pset(x, y, R.tone(T3, 2.7 - (y - y0) / Math.max(1, y1 - y0) * 2.4 - (d > 0.82 ? 0.5 : 0), x, y)); } };
// pájaros que cruzan aleteando (en uve)
const pajaros = (t, y, c, n = 3, v = 14, x1 = 270) => { for (let k = 0; k < n; k++) { const x = Math.round(((t * v + k * 23 + k * k * 9) % (x1 + 20)) - 10), yy = Math.round(y + k * 5 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0;
  if (x < 0 || x > x1) continue; R.pset(x, yy, c); R.pset(x - 1, yy - (a ? 1 : 0), c); R.pset(x + 1, yy - (a ? 1 : 0), c); R.pset(x - 2, yy - (a ? 2 : -1), c); R.pset(x + 2, yy - (a ? 2 : -1), c); } };
// un vaso de soda de cristal (6 × 8) con el refresco oscuro y burbujas; (x, y) el centro de abajo
const vasito = (x, y, t = 0, lleno = 1) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 3, y - 8, x + 3, y, K0); R.rect(x - 2, y - 7, x + 2, y - 1, hex('#cfe0e8'));
  if (lleno > 0) { const top = Math.round(y - 1 - 5 * lleno); R.rect(x - 2, top, x + 2, y - 1, hex('#4a2414')); R.rect(x - 2, top, x + 2, top, hex('#f4ece0')); if (Math.sin(t * 9 + x) > 0) R.pset(x, top + 2, hex('#8a5030')); }
  R.pset(x - 2, y - 6, hex('#ffffff')); R.pset(x - 2, y - 5, hex('#ffffff')); };
// el cajón de madera con botellas rectas (sin letras): 28 × 14 (x, y la esquina de abajo a la izquierda)
const cajon = (x, y, n = 5) => { x = Math.round(x); y = Math.round(y);
  for (let k = 0; k < n; k++) { const bx = x + 3 + k * 5; R.rect(bx, y - 20, bx + 3, y - 10, K0); R.rect(bx + 1, y - 19, bx + 2, y - 11, hex('#5a3418')); R.rect(bx + 1, y - 22, bx + 2, y - 20, K0); R.pset(bx + 1, y - 19, hex('#c88a50')); R.pset(bx + 1, y - 22, hex('#c8c8d0')); R.pset(bx + 2, y - 22, hex('#c8c8d0')); }
  R.rect(x, y - 13, x + 27, y, K0); R.rect(x + 1, y - 12, x + 26, y - 1, hex('#b07a44'));
  for (const yy of [y - 9, y - 5]) R.rect(x + 1, yy, x + 26, yy, hex('#7a4e28'));
  R.rect(x + 1, y - 12, x + 26, y - 12, hex('#d8a468')); for (const xx of [x + 1, x + 26]) R.rect(xx, y - 12, xx, y - 1, hex('#7a4e28'));
  R.pset(x + 3, y - 3, hex('#3a2a20')); R.pset(x + 24, y - 3, hex('#3a2a20')); };
// la calesa de caballos (de 1886–1899), que pasa por delante: x = el carro, dir del movimiento
const calesa = (x, suelo, t, dir = -1) => { x = Math.round(x);
  R.caballo(dir > 0 ? x + 30 : x - 34, suelo, t, { dir, galopa: false });
  const cx = x, cy = suelo - 6, W = hex('#2a2430');
  R.rect(cx - 2, suelo - 26, cx + 30, suelo - 24, W); R.rect(cx, suelo - 24, cx + 28, suelo - 23, hex('#4a4058'));
  R.rect(cx + 2, suelo - 23, cx + 3, suelo - 14, W); R.rect(cx + 25, suelo - 23, cx + 26, suelo - 14, W);
  R.rect(cx, suelo - 14, cx + 28, suelo - 8, W); R.rect(cx + 1, suelo - 13, cx + 27, suelo - 9, hex('#5a2a32')); R.rect(cx + 1, suelo - 13, cx + 27, suelo - 13, hex('#8a4a52'));
  for (let i = 0; i < 18; i++) R.pset(dir > 0 ? cx + 28 + i : cx - i, suelo - 11 + Math.round(i * 0.1), K0);
  for (const wx of [cx + 6, cx + 22]) { R.disco(wx, cy, 6, K0); R.disco(wx, cy, 5, hex('#c89a40')); R.disco(wx, cy, 3, hex('#6a4a2a')); const g = t * 6 * -dir; for (let k = 0; k < 4; k++) R.linea(wx, cy, Math.round(wx + Math.cos(g + k * 0.8) * 5), Math.round(cy + Math.sin(g + k * 0.8) * 5), K0); R.pset(wx, cy, hex('#e8d090')); }
};
// la hoja de coca (o.s escala) y la nuez de cola: piezas pequeñas para el inserto
const hojaCoca = (cx, cy, s = 1, ang = 0) => { const ca = Math.cos(ang), sa = Math.sin(ang), L = 9 * s, A = 4 * s;
  for (let j = -A - 1; j <= A + 1; j++) for (let i = -L - 1; i <= L + 1; i++) { const q = (i / L) ** 2 + (j / (A * (1 - 0.35 * (i / L)))) ** 2; if (q > 1.18) continue;
    const x = Math.round(cx + i * ca - j * sa), y = Math.round(cy + i * sa + j * ca); R.pset(x, y, q > 0.9 ? hex('#1e3a14') : Math.abs(j) < 0.6 * s ? hex('#a8d070') : j < 0 ? hex('#5a9a34') : hex('#3e7a26')); }
  for (let i = L; i <= L + 3 * s; i++) R.pset(Math.round(cx + i * ca), Math.round(cy + i * sa), hex('#5a4a1e')); };
const nuez = (cx, cy, s = 1) => { const r = 4 * s; R.disco(cx, cy, r + 1, K0); R.disco(cx, cy, r, hex('#a85a3a')); R.disco(cx - s, cy - s, r * 0.55, hex('#d08a5a')); R.pset(Math.round(cx - 2 * s), Math.round(cy - 2 * s), hex('#f0c8a0'));
  R.linea(Math.round(cx), Math.round(cy - r), Math.round(cx + s), Math.round(cy + r), hex('#6a3020')); };
'''

# ───────────────────────────────────────── NC-PEMBERTON ─────────────────────────────────────────
E['nc-pemberton'] = ('Pemberton', '''// NC-PEMBERTON (frase 4), 1886 (cartela «1886»), la barra pasa a 1888 en el último plano. Cinco planos:
// 1. la farmacia de Atlanta: entra una señora por la puerta; Pemberton, detrás de su mesa, saca el cucharón del perol,
//    prueba el jarabe y sonríe con su «!» («a pharmacist named John Pemberton»); el dependiente saca brillo a un vaso;
// 2. la fuente de soda («served with soda water»): el vaso se llena con el chorro, el dependiente limpia el mármol y una
//    mano entra desde abajo y se lleva el vaso («soda fountain»);
// 3. inserto de la mesa de la botica: el «2» de los dos ingredientes; una mano saca la hoja de coca del tarro («coca
//    leaf») y la otra la nuez de cola («cola nut»), que caen en el mortero;
// 4. la fachada de la farmacia de día: los clientes entran de uno en uno, la pizarra de la acera cuenta palotes y el «9»
//    salta («nine glasses»); pasa una calesa; la tarde cae;
// 5. 1888, la trastienda de noche: Pemberton escribe la receta, se levanta, se despide desde la puerta y sale; el papel se
//    queda brillando y en la pared la sombra de una botella se multiplica en una fila larga («what he had created»).''', COMUN + r'''
const a = (f) => en('pemberton', f);
const P2 = a(0.242), P3 = a(0.468), P4 = a(0.645), P5 = a(0.811);

const p1 = (t) => {
  T.atlanta(R, t, { encuadre: 'farmacia', vasos: 1, fuego: true });
  // el dependiente detrás del mostrador: saca brillo a un vaso; cuando llega la señora, la atiende
  const llega = a(0.165);
  const dp = R.actor(NC.dependiente1886, 270, 138, t, { dir: -1, sostiene: t < llega ? [262 + Math.round(Math.sin(t * 7) * 2), 126 + Math.round(Math.cos(t * 7))] : [260, 124], habla: t > llega && t < llega + 1.2 && Math.sin(t * 9) > 0, sonrisa: t > llega + 1.2 });
  vasito(dp.mano[0], dp.mano[1] + 3, t, t > llega ? 0 : 0);
  // Pemberton remueve el perol (el cucharón da vueltas) y luego lo saca, prueba el jarabe y sonríe
  const prueba = t > a(0.17) && t < a(0.215), saca = tramo(t, a(0.15), a(0.17));
  const pm = R.actor(NC.pemberton, 158, 138, t, { dir: -1, sostiene: t < a(0.15) ? [150, 116] : [Math.round(lerp(152, 161, saca)), Math.round(lerp(116, 113, saca))], habla: prueba && Math.sin(t * 11) > 0, sonrisa: t > a(0.215), sorpresa: t > a(0.205) && t < a(0.215) });
  T.atlantaDelante(R, t, { encuadre: 'farmacia', fuego: true });
  PZ.jarabe(R, 146, 127, { t, vapor: true });
  if (t < a(0.15)) { const g = t * 5, bx = Math.round(146 + Math.cos(g) * 5), by = Math.round(111 + Math.sin(g) * 1);   // el mango asoma del perol y gira
    R.linea(bx, by, bx + 6, by - 12, K0); R.linea(bx + 1, by, bx + 7, by - 12, hex('#a8743c')); R.pset(bx + 7, by - 13, hex('#c8944c')); }
  else { const [hx, hy] = pm.mano;   // el cucharón de latón en la mano, con jarabe; cae una gota
    R.linea(hx - 1, hy - 1, hx - 4, hy - 6, hex('#8a6a24')); R.rect(hx - 8, hy - 9, hx - 3, hy - 6, K0); R.rect(hx - 7, hy - 8, hx - 4, hy - 7, hex('#4a2414')); R.pset(hx - 4, hy - 8, hex('#c8a040'));
    if (saca > 0 && saca < 1 && Math.floor(t * 6) % 2) R.pset(hx - 5, hy - 3, hex('#4a2414')); }
  if (t > a(0.215) && t < P2) R.icono('!', 163, 96 + Math.round(Math.sin(t * 8)), hex('#ffd36a'), K0);
  // la señora que entra por la puerta y va al mostrador
  const u = lin(t, a(0.07), a(0.165));
  R.actor(EL.dama, Math.round(lerp(10, 196, u)), 166, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1 });
};

const p2 = (t) => {
  const u = tramo(t, a(0.32), a(0.4)), coge = tramo(t, a(0.405), a(0.43)), saca = tramo(t, a(0.435), P3 - 0.05);
  T.atlanta(R, t, { encuadre: 'farmacia', camara: 'fuente', llena: u, chorro: u > 0 && u < 1, vaso: coge < 1 });
  // el dependiente pasa el paño por el mármol; cuando el vaso está lleno, lo señala
  const dd = R.actor(NC.dependiente1886, 204, 152, t, { dir: -1, sostiene: u < 1 ? [194 + Math.round(Math.sin(t * 6) * 3), 146] : undefined, dedo: u >= 1 && saca < 0.5, sonrisa: u >= 1 });
  if (u < 1) { const [px, py] = dd.mano; R.rect(px - 4, py, px + 2, py + 2, K0); R.rect(px - 3, py, px + 1, py + 1, hex('#f2f0e6')); }
  T.atlantaDelante(R, t, { encuadre: 'farmacia', camara: 'fuente', llena: u, chorro: u > 0 && u < 1, vaso: coge < 1 });
  // la mano de un cliente entra desde abajo, coge el vaso y se lo lleva
  if (coge > 0 || saca > 0) {
    const wx = Math.round(lerp(lerp(118, 136, coge), 96, saca)), wy = Math.round(lerp(lerp(184, 140, coge), 196, saca));
    T.brazo(R, wx - 26, wy + 40, wx, wy, '#6a4a5a', 1, { codo: [wx - 18, wy + 18] });
    if (coge >= 1) { R.rect(wx + 4, wy - 12, wx + 15, wy + 6, K0); R.rect(wx + 5, wy - 11, wx + 14, wy + 5, hex('#cfe0e8')); R.rect(wx + 5, wy - 6, wx + 14, wy + 5, hex('#4a2414')); R.rect(wx + 5, wy - 7, wx + 14, wy - 7, hex('#f4ece0')); R.pset(wx + 6, wy - 9, hex('#ffffff')); T.mano(R, wx, wy, 1, '#6a4a5a', { sinManga: true }); }
  }
};

// 3 · inserto: la mesa de la botica con los dos tarros
const fondoMesa = () => {
  const PV = rp('#18302a', '#203c32', '#2a4a3e', '#36584a');
  llena(0, 0, 319, 90, PV, (x, y) => 1.5 + y / 90 * 0.7 + ((x < 270 || y > 52) && Math.abs((x % 16) - 8) + Math.abs(((y + (Math.floor(x / 16) % 2) * 10) % 20) - 10) * 0.8 < 4 ? 0.8 : 0));
  R.rect(0, 8, 319, 10, hex('#4a2a18')); R.rect(0, 8, 319, 8, hex('#7a4a2a'));
  // la estantería de la izquierda con frascos de colores y la balanza
  for (const sy of [40, 66]) { R.rect(4, sy, 112, sy + 3, K0); R.rect(5, sy, 111, sy + 2, hex('#7a4a2a')); R.rect(5, sy, 111, sy, hex('#a8743c')); }
  const FR = ['#3a6aa8', '#a83a3a', '#e0c070', '#5a8a4a', '#8a5aa8', '#d8d0c0', '#c87a3a'];
  for (let k = 0; k < 14; k++) { const sy = k < 7 ? 40 : 66, x = 8 + (k % 7) * 15, h = 12 + (k * 5) % 7, c = hex(FR[(k * 3) % 7]);
    R.rect(x, sy - h, x + 9, sy - 1, K0); R.rect(x + 1, sy - h + 3, x + 8, sy - 1, c); R.rect(x + 1, sy - h + 3, x + 2, sy - 1, mez(c, hex('#ffffff'), 0.45)); R.rect(x + 2, sy - h, x + 7, sy - h + 2, hex('#c8c0b0')); R.rect(x + 3, sy - h + 6, x + 6, sy - h + 8, hex('#f2eedf')); }
  // el grabado botánico enmarcado (la hoja y la nuez, sin letras)
  R.rect(134, 16, 200, 70, K0); R.rect(135, 17, 199, 69, hex('#b08a3a')); R.rect(137, 19, 197, 67, hex('#e0c070')); R.rect(139, 21, 195, 65, hex('#efe4c8'));
  llena(139, 21, 195, 65, rp('#d8ccb0', '#e4d8bc', '#efe4c8'), (x, y) => 1.6 + (hh(x >> 1, y >> 1) - 0.5) * 0.8);
  hojaCoca(158, 40, 1.4, -0.5); nuez(182, 48, 1.3); R.linea(146, 58, 188, 58, hex('#8a7a5a'));
  // el manojo de hierbas secas colgado y la lámpara de pared
  R.linea(236, 10, 236, 30, hex('#6a5030')); for (let k = 0; k < 7; k++) R.linea(236, 30, 230 + k * 2, 52 + (k % 3) * 3, hex(['#6a7a3a', '#8a8a4a', '#5a6a30'][k % 3]));
  R.rect(226, 30, 246, 33, hex('#a8743c'));
  // el canto de la mesa y el tablero de nogal en perspectiva, con la mancha del sol
  R.rect(0, 88, 319, 93, hex('#2a160c')); R.rect(0, 88, 319, 88, hex('#7a4a2a'));
  const MD = rp('#3a2214', '#5a341e', '#7a4a2a', '#9a643a', '#b8804a');
  for (let y = 94; y < 180; y++) { const fila = Math.floor(Math.pow((y - 94) / 86, 0.8) * 9), jy = Math.floor(Math.pow((y + 1 - 94) / 86, 0.8) * 9) !== fila;
    for (let x = 0; x < 320; x++) { if (jy) { R.pset(x, y, MD[0]); continue; } const sol = (x + (y - 94) * 0.9 > 70 && x + (y - 94) * 0.9 < 150) ? 0.8 : 0;
      R.pset(x, y, R.tone(MD, 1.6 + Math.sin(x * 0.09 + fila * 2.3 + Math.sin(x * 0.02 + fila) * 2) * 0.5 + sol + (hh(fila, 4) - 0.5) * 0.5, x, y)); } }
  for (let k = 0; k < 9; k++) R.linea(30 + k * 31, 120 + (k * 13) % 50, 44 + k * 31, 118 + (k * 13) % 50, hex('#4a2a18'));   // arañazos
  // en la mesa: el libro cerrado, el tintero con la pluma, la balanza pequeña, papeles con croquis, hojas y nueces sueltas
  R.rect(206, 98, 252, 114, K0); R.rect(207, 99, 251, 111, hex('#6a2a2a')); R.rect(207, 111, 251, 113, hex('#efe4c8')); R.rect(209, 101, 249, 101, hex('#c8a040'));
  R.rect(84, 100, 96, 112, K0); R.rect(85, 101, 95, 111, hex('#2a2a3a')); R.rect(86, 102, 88, 104, hex('#5a5a7a')); R.linea(92, 100, 102, 84, hex('#f2eee2')); R.linea(93, 100, 103, 85, hex('#c8c4bc'));
  R.rect(104, 150, 136, 172, K0); R.rect(105, 151, 135, 171, hex('#efe4c8')); for (let k = 0; k < 4; k++) R.linea(108, 155 + k * 4, 128 - (k % 2) * 6, 155 + k * 4, hex('#8a7a5a')); R.disco(126, 166, 3, hex('#a8c88a'));
  R.rect(190, 140, 230, 146, K0); R.rect(191, 141, 229, 145, hex('#c8a040')); R.rect(208, 128, 212, 141, hex('#8a6a24')); R.rect(194, 134, 202, 140, hex('#c8a040')); R.rect(218, 134, 226, 140, hex('#c8a040'));
  hojaCoca(70, 170, 0.8, 0.4); hojaCoca(244, 160, 0.7, -0.3); nuez(232, 172, 0.8); nuez(84, 132, 0.7);
  // los dos tarros grandes de cristal: la hoja (izquierda) y la nuez (derecha), con la boca abierta
  for (const [x0, verde] of [[4, true], [266, false]]) {
    R.rect(x0, 106, x0 + 48, 172, K0); R.rect(x0 + 1, 112, x0 + 47, 171, hex('#a8c8c8'));
    for (let k = 0; k < 16; k++) { const cx = x0 + 8 + (k * 13) % 34, cy = 124 + Math.floor(k / 4) * 11 + (k % 2) * 3; if (verde) hojaCoca(cx, cy, 0.7, (k % 3) - 1); else nuez(cx, cy, 1); }
    R.rect(x0 + 2, 114, x0 + 4, 168, hex('#e8f4f4')); R.rect(x0 + 40, 118, x0 + 42, 164, mez(hex('#a8c8c8'), hex('#ffffff'), 0.4));
    R.rect(x0 - 1, 104, x0 + 49, 110, K0); R.rect(x0, 105, x0 + 48, 109, hex('#c8d8d8')); R.rect(x0, 105, x0 + 48, 105, hex('#ffffff'));
    R.rect(x0 + 6, 160, x0 + 42, 168, hex('#efe4c8')); R.rect(x0 + 6, 160, x0 + 42, 160, K0); R.rect(x0 + 6, 168, x0 + 42, 168, K0);
    if (verde) hojaCoca(x0 + 24, 164, 0.5, 0); else nuez(x0 + 24, 164, 0.7);
  }
  // el mortero de piedra en el centro
  R.disco(160, 150, 22, K0); R.disco(160, 150, 21, hex('#8a8698')); R.disco(160, 147, 17, hex('#3a3644')); R.disco(160, 148, 15, hex('#5a5668'));
  R.rect(140, 150, 180, 166, K0); R.rect(141, 150, 179, 165, hex('#9a96a8')); R.rect(141, 158, 179, 165, hex('#6a6678')); R.rect(143, 151, 146, 157, hex('#c8c4d4'));
};
const p3 = (t) => {
  capa('mesa', fondoMesa);
  // vida: motas de polvo en el rayo de sol y el manojo de hierbas que se mece
  for (let k = 0; k < 14; k++) { const x = 70 + ((k * 37 + t * 4) % 80), y = 30 + ((k * 23 + t * (3 + k % 3)) % 70); if (Math.sin(t * 3 + k) > -0.2) R.pset(Math.round(x + (90 - y) * 0.5), Math.round(y), hex('#fff0c0')); }
  const m = Math.round(Math.sin(t * 1.3) * 1.5); for (let k = 0; k < 3; k++) R.linea(236, 33, 232 + k * 4 + m, 48 + k * 2, hex('#7a8a40'));
  // el «2» de los dos ingredientes
  const dos = tramo(t, a(0.505), a(0.52)) - tramo(t, a(0.56), a(0.575)); if (dos > 0) { R.numero('2', 160, Math.round(lerp(112, 98, dos)), { tam: 16, centro: true }); for (const x of [28, 290]) { R.icono('!', x - 3, 90 + Math.round(Math.sin(t * 9) * 1), hex('#ffd36a'), K0); } }
  // la mano izquierda saca la hoja de coca del tarro y la lanza al mortero
  const r1 = tramo(t, a(0.525), a(0.56)), s1 = tramo(t, a(0.565), a(0.585)), l1 = lin(t, a(0.59), a(0.615)), v1 = tramo(t, a(0.6), a(0.63));
  if (r1 > 0 && v1 < 1) { const wx = Math.round(lerp(lerp(-30, 22, r1), 20, v1)), wy = Math.round(lerp(lerp(140, 112, r1) - s1 * 26, 150, v1));
    T.brazo(R, wx - 34, wy + 36, wx, wy, '#e8e2d2', 1, { codo: [wx - 22, wy + 12] });
    if (s1 > 0 && l1 === 0) hojaCoca(wx + 12, wy - 5, 1.4, -0.3);
    R.rect(0, 104, 54, 110, K0); R.rect(1, 105, 52, 109, hex('#c8d8d8')); R.rect(1, 105, 52, 105, hex('#ffffff'));   // la boca del tarro, por delante de la muñeca
    if (wy > 110) T.mano(R, wx, wy, 1, '#e8e2d2', { sinManga: true }); }
  if (l1 > 0) { const x = lerp(36, 156, l1), y = lerp(80, 146, l1) - Math.sin(l1 * Math.PI) * 34; if (l1 < 1) hojaCoca(x, y, 1.4, -0.3 + l1 * 4); }
  // la mano derecha saca la nuez de cola y la lanza
  const r2 = tramo(t, a(0.575), a(0.605)), s2 = tramo(t, a(0.61), a(0.625)), l2 = lin(t, a(0.628), a(0.642)), v2 = tramo(t, a(0.632), P4);
  if (r2 > 0 && v2 < 1) { const wx = Math.round(lerp(lerp(350, 296, r2), 300, v2)), wy = Math.round(lerp(lerp(140, 112, r2) - s2 * 26, 150, v2));
    T.brazo(R, wx + 34, wy + 36, wx, wy, '#e8e2d2', -1, { codo: [wx + 22, wy + 12] });
    if (s2 > 0 && l2 === 0) nuez(wx - 12, wy - 4, 1.6);
    R.rect(265, 104, 319, 110, K0); R.rect(266, 105, 314, 109, hex('#c8d8d8')); R.rect(266, 105, 314, 105, hex('#ffffff'));
    if (wy > 110) T.mano(R, wx, wy, -1, '#e8e2d2', { sinManga: true }); }
  if (l2 > 0 && l2 < 1) nuez(lerp(284, 164, l2), lerp(80, 146, l2) - Math.sin(l2 * Math.PI) * 30, 1.6);
  // lo que ya ha caído en el mortero asoma por el borde
  if (l1 >= 1) hojaCoca(154, 140, 1, 0.3);
  if (l2 >= 1) nuez(166, 141, 1.3);
};

// 4 · la fachada de la farmacia de día: los clientes entran y la pizarra cuenta
const fondoFachada = () => {
  llena(0, 0, 319, 60, rp('#4a7ac0', '#6a96d4', '#8ab2e2', '#b4d0ee', '#d6e6f4'), (x, y) => y / 60 * 4.2);
  // la casa vecina de tablas (izquierda) y el edificio del fondo (derecha)
  for (let y = 26; y < 140; y++) for (let x = 0; x < 42; x++) R.pset(x, y, (y - 26) % 5 === 4 ? hex('#6a7484') : R.tone(rp('#8a94a4', '#a8b0bc', '#c4cad2'), 1.3 + ((y - 26) % 5 === 0 ? 0.7 : 0) + (hh(x >> 4, y) - 0.5) * 0.4, x, y));
  R.rect(0, 22, 44, 26, hex('#4a5060')); R.rect(8, 50, 30, 80, K0); R.rect(10, 52, 28, 78, hex('#3a4a6a')); R.rect(18, 52, 19, 78, K0); R.rect(10, 64, 28, 64, K0); R.rect(10, 52, 13, 62, hex('#8aa8c8'));
  R.rect(6, 48, 32, 49, hex('#e8e8e0')); R.rect(6, 81, 32, 82, hex('#e8e8e0'));
  for (let y = 66; y < 140; y++) for (let x = 248; x < 320; x++) R.pset(x, y, (y - 66) % 4 === 3 ? hex('#5a4a3a') : R.tone(rp('#8a6a4a', '#a8845a', '#c09a6a'), 1.4 + (hh(x >> 3, (y - 66) >> 2, 5) - 0.5), x, y));
  R.poligono([[244, 68], [284, 50], [320, 64], [320, 68]], hex('#5a3a3a')); R.linea(244, 68, 284, 50, K0); R.linea(284, 50, 320, 64, K0);
  for (const wx of [262, 294]) { R.rect(wx, 82, wx + 16, 108, K0); R.rect(wx + 1, 83, wx + 15, 107, hex('#3a4a5a')); R.rect(wx + 1, 83, wx + 4, 92, hex('#8aa0b8')); R.rect(wx + 8, 83, wx + 8, 107, K0); }
  // la farmacia de ladrillo, dos pisos, con la cornisa de piedra
  ladrillos(44, 28, 246, 140, rp('#5a2a22', '#7a3a2a', '#984a32', '#b05e40'), hex('#c8b49a'), 3);
  R.rect(40, 16, 250, 28, K0); R.rect(41, 17, 249, 27, hex('#d8ccb0')); R.rect(41, 17, 249, 18, hex('#f2eadb')); R.rect(41, 25, 249, 27, hex('#a89c80'));
  for (let x = 44; x < 248; x += 6) { R.rect(x, 22, x + 2, 25, hex('#8a7e64')); } for (const x of [46, 144, 240]) { R.rect(x - 2, 28, x + 2, 36, hex('#d8ccb0')); R.rect(x - 2, 36, x + 2, 36, K0); }
  // las ventanas de arriba con dintel de piedra y visillos
  for (const wx of [62, 132, 202]) { R.rect(wx - 2, 36, wx + 26, 40, hex('#d8ccb0')); R.rect(wx - 2, 40, wx + 26, 40, K0);
    R.rect(wx, 41, wx + 24, 66, K0); R.rect(wx + 1, 42, wx + 23, 65, hex('#2a3a4a')); R.rect(wx + 1, 42, wx + 23, 52, hex('#5a7a9a')); R.rect(wx + 12, 42, wx + 12, 65, K0); R.rect(wx + 1, 53, wx + 23, 53, K0);
    R.rect(wx + 2, 43, wx + 5, 64, hex('#efe8d8')); R.rect(wx + 19, 43, wx + 22, 64, hex('#efe8d8')); R.rect(wx - 2, 66, wx + 26, 68, hex('#d8ccb0')); R.rect(wx - 2, 69, wx + 26, 69, K0);
    for (let k = 0; k < 4; k++) R.disco(wx + 3 + k * 6, 64, 2, hex(['#c84a4a', '#e8a040', '#c84a8a', '#4a8a4a'][k])); }
  R.rect(44, 72, 246, 74, hex('#d8ccb0'));
  // el frente de la tienda pintado de verde con filete dorado
  R.rect(46, 86, 244, 140, K0); R.rect(47, 87, 243, 139, hex('#244a3a')); R.rect(49, 89, 241, 89, hex('#c8a040'));
  // el escaparate grande: dentro la botica con los dos globos de colores y los tarros
  R.rect(54, 92, 140, 132, K0); llena(55, 93, 139, 131, rp('#1a1a24', '#2a2a36', '#3a3644'), (x, y) => 1 + (y - 93) / 40);
  for (const sy of [104, 118]) { R.rect(56, sy, 138, sy + 1, hex('#5a3a22')); for (let k = 0; k < 11; k++) { const c = hex(['#3a6aa8', '#a83a3a', '#e0c070', '#5a8a4a', '#8a5aa8'][(k + sy) % 5]); R.rect(58 + k * 7, sy - 6, 62 + k * 7, sy - 1, c); R.pset(58 + k * 7, sy - 6, hex('#f0f0f0')); } }
  R.rect(56, 125, 138, 131, hex('#5a3a22')); for (let k = 0; k < 6; k++) { R.rect(60 + k * 13, 119, 68 + k * 13, 124, K0); R.rect(61 + k * 13, 120, 67 + k * 13, 124, hex(['#e8d8b0', '#a8c8a8', '#d8a8a8'][k % 3])); }
  R.rect(96, 92, 97, 132, K0); R.rect(54, 111, 140, 112, K0); R.linea(56, 94, 70, 108, hex('#9ab0c8')); R.linea(58, 94, 72, 108, hex('#7a90a8'));
  // la puerta con su cristal y el montante
  R.rect(148, 82, 178, 140, K0); R.rect(149, 83, 177, 88, hex('#e8c870')); R.rect(150, 90, 176, 139, hex('#3a2418')); R.rect(153, 93, 173, 116, hex('#e8d090')); R.rect(153, 93, 155, 116, hex('#fff4d0'));
  R.rect(153, 120, 173, 136, hex('#5a3422')); R.rect(155, 122, 171, 134, hex('#4a2c1c')); R.rect(171, 126, 172, 128, hex('#e8c060'));
  // el escaparate pequeño con tarros grandes
  R.rect(186, 92, 238, 132, K0); llena(187, 93, 237, 131, rp('#1a1a24', '#2a2a36', '#3a3644'), (x, y) => 1 + (y - 93) / 40);
  for (let k = 0; k < 3; k++) { const x = 192 + k * 16, c = hex(['#c84a4a', '#4a7ac8', '#e0b040'][k]); R.disco(x + 5, 110, 6, K0); R.disco(x + 5, 110, 5, c); R.disco(x + 3, 108, 2, hex('#ffffff')); R.rect(x + 3, 116, x + 7, 130, K0); R.rect(x + 4, 116, x + 6, 130, hex('#c8a040')); }
  R.rect(186, 120, 238, 120, hex('#7a90a8'));
  // la acera de tablas y la calle de tierra con roderas, charco y adoquines sueltos
  tablas(0, 140, 319, 152, rp('#3a2a1a', '#5a4430', '#7a5e42', '#98785a'), 4, 2);
  R.rect(0, 152, 319, 154, hex('#6a6070')); R.rect(0, 152, 319, 152, hex('#9a92a0'));
  llena(0, 155, 319, 179, rp('#6a5240', '#86684e', '#a08060', '#b89a74'), (x, y) => 1.9 + (hh(x >> 1, y >> 1, 9) - 0.5) * 1.2 - ((Math.abs(y - 164) < 2 || Math.abs(y - 174) < 2) ? 0.9 : 0));
  for (let k = 0; k < 14; k++) { const x = (k * 53) % 320, y = 157 + (k * 7) % 20; R.rect(x, y, x + 3, y + 1, hex('#5a4434')); R.pset(x + 1, y, hex('#c8b090')); }
  R.poligono([[74, 169], [88, 165], [106, 167], [110, 171], [92, 174], [78, 173]], hex('#4a5a74')); R.linea(82, 168, 96, 167, hex('#a8b8d0')); R.linea(94, 171, 102, 171, hex('#7a8aa8'));
  // el poste de enganchar caballos y la farola de gas
  R.rect(28, 128, 30, 152, K0); R.rect(22, 130, 36, 131, K0);
  R.rect(252, 70, 254, 152, K0); R.rect(253, 71, 253, 151, hex('#3a3a44')); R.rect(248, 60, 258, 70, K0); R.rect(249, 61, 257, 69, hex('#c8c0a0')); R.poligono([[247, 60], [253, 54], [259, 60]], K0);
};
const p4 = (t) => {
  capa('fachada', fondoFachada);
  const tarde = lin(t, a(0.76), P5);   // cae la tarde: el cielo y la luz se tiñen
  // nubes a tres velocidades y pájaros, por debajo de la barra y lejos de Atom
  for (const [x0, y, w, v, c] of [[30, 34, 44, 3, 0], [150, 24, 36, 5, 1], [230, 44, 30, 8, 2]]) { const x = ((x0 + t * v) % 300) - 30; if (x < 240) nube(x, y, w, [rp('#a8b8d0', '#d4e0ee', '#ffffff'), rp('#98a8c4', '#c4d2e6', '#eef4fa'), rp('#b4c4da', '#dce6f2', '#ffffff')][c], (px, py) => py < 16 || (px < 40 && py < 22)); }
  // el toldo a rayas que ondea sobre el escaparate
  for (let x = 50; x <= 142; x++) { const o = Math.round(Math.sin(t * 4 + x * 0.25) * 1.2), r = Math.floor((x - 50) / 8) % 2; R.rect(x, 76, x, 86 + o, r ? hex('#f2eadb') : hex('#b83a32')); R.pset(x, 87 + o, K0); R.pset(x, 75, K0); }
  // el cartel colgado del mortero (sin letras) que se balancea
  const sw = Math.sin(t * 2) * 2; R.rect(180, 76, 198, 77, K0); R.linea(184, 77, Math.round(184 + sw), 82, K0); R.linea(194, 77, Math.round(194 + sw), 82, K0);
  { const cx = Math.round(189 + sw); R.rect(cx - 7, 82, cx + 7, 84, K0); R.poligono([[cx - 7, 84], [cx + 7, 84], [cx + 4, 92], [cx - 4, 92]], hex('#c8a040')); R.linea(cx - 7, 84, cx - 4, 92, K0); R.linea(cx + 7, 84, cx + 4, 92, K0); R.linea(cx + 2, 80, cx + 6, 76, hex('#8a6a24')); }
  // la pizarra de la acera con el vaso dibujado y los palotes
  R.linea(200, 112, 194, 142, K0); R.linea(222, 112, 228, 142, K0); R.rect(196, 112, 226, 136, K0); R.rect(197, 113, 225, 135, hex('#4a3a2a')); R.rect(199, 115, 223, 133, hex('#2a3a30'));
  R.icono('vaso', 202, 117, hex('#e8e8dc'), hex('#2a3a30'));
  const n = Math.min(9, Math.floor(lin(t, P4 + 0.3, a(0.739)) * 9 + 0.001));
  for (let k = 0; k < n; k++) { const g = Math.floor(k / 5), i = k % 5; if (i === 4) R.linea(201 + g * 12, 131, 211 + g * 12, 125, hex('#e8e8dc')); else R.linea(202 + g * 12 + i * 2, 125, 202 + g * 12 + i * 2, 131, hex('#e8e8dc')); }
  if (n > 0) R.numero(String(n), 216, 124, { color: hex('#ffe8a0') });
  const nueve = tramo(t, a(0.739), a(0.755)); if (nueve > 0) { R.numero('9', 212, Math.round(lerp(108, 104, nueve)), { tam: 16, centro: true }); R.icono('vaso', 226, 92, hex('#ffd36a'), K0); }
  // los clientes que entran por la puerta de uno en uno (la puerta se abre mientras pasan)
  const gente = [[EL.vecino, -1, 236], [EL.comerciante, 1, 70], [EL.vecina, -1, 236], [EL.oficinista, 1, 70]];
  let abierta = false;
  gente.forEach(([def, dir, x0], k) => { const s = P4 + 0.05 + k * 0.72, u = lin(t, s, s + 1.0), x = Math.round(lerp(x0, 156, u));
    if (u > 0.9 && u < 1) abierta = true; if (u >= 1) return; R.actor(def, x, 146, t, { dir: -dir * (x0 > 156 ? 1 : -1) || dir, anda: u > 0 }); });
  if (abierta) { R.rect(150, 90, 176, 139, hex('#e8c880')); R.rect(150, 90, 156, 139, hex('#3a2418')); }
  // dos que esperan en la acera y charlan
  R.actor(EL.dama, 104, 148, t, { dir: 1, habla: Math.sin(t * 5) > 0.3 });
  R.actor(EL.granjera, 124, 148, t, { dir: -1, sonrisa: true });
  // la calesa que pasa por delante
  const c = lin(t, a(0.7), P5 + 0.3); if (c > 0 && c < 1) calesa(lerp(360, -60, c), 176, t, -1);
  if (tarde > 0) T.tinte(R, 0, 179, [255, 150, 70], tarde * 0.22);
};

// 5 · 1888: la trastienda de noche
const fondoCuarto = () => {
  llena(0, 0, 319, 98, rp('#141a2e', '#1c2440', '#242e4e', '#2c385a'), (x, y) => 1.2 + (x % 10 < 5 && !(x > 266 && y < 50) ? 0.6 : 0) + y / 98 * 0.6 + ((x % 10 === 7 && (y + x) % 14 < 3 && !(x > 266 && y < 50)) ? 0.8 : 0));
  R.rect(0, 4, 319, 6, hex('#3a2418'));
  tablas(0, 98, 319, 140, rp('#1a0e08', '#2a1a10', '#3a2416', '#4a301c'), 7, 4);
  for (let x = 6; x < 316; x += 34) { R.rect(x, 104, x + 28, 134, hex('#140a06')); R.rect(x + 1, 105, x + 27, 105, hex('#5a3a22')); R.rect(x + 1, 105, x + 1, 133, hex('#5a3a22')); }
  R.rect(0, 97, 319, 100, hex('#4a2c18')); R.rect(0, 97, 319, 97, hex('#7a4a2a'));
  tablas(0, 140, 319, 179, rp('#140a06', '#24160c', '#341f12', '#462c18'), 5, 6);
  // la ventana con la luna, las estrellas y los tejados de Atlanta (recortado a su hueco)
  R.rect(22, 26, 86, 92, K0); R.rect(23, 27, 85, 91, hex('#0e1430'));
  R.recorte([24, 28, 84, 90]); for (let k = 0; k < 20; k++) R.pset(24 + (k * 37) % 60, 28 + (k * 23) % 40, hex(k % 3 ? '#8a94c8' : '#ffffff'));
  R.disco(70, 40, 6, hex('#fff4d0')); R.disco(68, 38, 2, hex('#e8d8a8'));
  R.poligono([[24, 78], [34, 66], [46, 70], [52, 62], [66, 66], [72, 58], [84, 64], [84, 91], [24, 91]], hex('#0a0c1c'));
  for (const [x, y] of [[36, 74], [58, 72], [76, 70], [30, 84], [66, 82]]) R.pset(x, y, hex('#ffd36a')); R.rect(44, 56, 47, 64, hex('#0a0c1c'));
  R.recorte(null);
  R.rect(53, 27, 54, 91, K0); R.rect(23, 58, 85, 59, K0); R.rect(18, 92, 90, 95, hex('#5a3a22'));
  for (const x of [14, 82]) { R.rect(x, 20, x + 10, 96, K0); R.rect(x + 1, 21, x + 9, 95, hex('#5a1e2a')); for (let y = 22; y < 95; y += 3) R.pset(x + 4, y, hex('#3a1018')); }
  R.rect(10, 18, 96, 20, hex('#c8a040'));
  // el reloj de pared, el diploma enmarcado (sin letras), la estantería con frascos
  R.disco(110, 36, 9, K0); R.disco(110, 36, 8, hex('#e8dcc0')); for (let k = 0; k < 12; k++) R.pset(Math.round(110 + Math.cos(k * 0.52) * 6), Math.round(36 + Math.sin(k * 0.52) * 6), K0);
  R.linea(110, 36, 110, 31, K0); R.linea(110, 36, 114, 38, K0);
  R.rect(104, 45, 116, 72, K0); R.rect(105, 46, 115, 71, hex('#4a2c18'));
  R.rect(134, 30, 172, 60, K0); R.rect(135, 31, 171, 59, hex('#b08a3a')); R.rect(137, 33, 169, 57, hex('#e8dcc0')); for (let k = 0; k < 4; k++) R.linea(142, 38 + k * 4, 164, 38 + k * 4, hex('#a89c80')); R.disco(160, 52, 3, hex('#c83a32'));
  for (const sy of [58, 80]) { R.rect(198, sy, 244, sy + 2, hex('#5a3a22')); R.rect(198, sy, 244, sy, hex('#8a5a32')); for (let k = 0; k < 5; k++) { const x = 202 + k * 8, c = hex(['#3a5a8a', '#8a3a3a', '#c8a050', '#4a7a4a', '#7a4a8a'][(k + sy) % 5]); R.rect(x, sy - 10, x + 5, sy - 1, K0); R.rect(x + 1, sy - 8, x + 4, sy - 1, c); R.pset(x + 1, sy - 8, hex('#c8d0e0')); } }
  // la puerta del fondo y el perchero con el abrigo y el bombín
  R.rect(252, 62, 290, 150, K0); R.rect(253, 63, 289, 150, hex('#3a2416')); R.rect(256, 66, 286, 102, hex('#2a1a10')); R.rect(256, 108, 286, 146, hex('#2a1a10')); R.rect(284, 104, 286, 106, hex('#c8a040'));
  R.rect(298, 70, 300, 152, hex('#3a2418')); R.rect(294, 70, 304, 72, hex('#3a2418')); R.rect(292, 74, 306, 106, K0); R.rect(293, 75, 305, 105, hex('#3a3040')); R.rect(293, 75, 294, 105, hex('#5a5068'));
  R.rect(292, 64, 306, 66, K0); R.rect(294, 58, 304, 64, K0); R.rect(295, 59, 303, 63, hex('#2a2430')); R.rect(294, 150, 304, 152, hex('#3a2418'));
  // la alfombra raída
  R.poligono([[60, 160], [250, 160], [270, 178], [40, 178]], hex('#4a1a22')); R.poligono([[66, 162], [246, 162], [262, 176], [48, 176]], hex('#6a2a2a'));
  for (let x = 70; x < 250; x += 10) R.pset(x, 169, hex('#c8a040'));
};
const escritorio = () => {
  R.rect(108, 138, 216, 168, K0); R.rect(109, 139, 215, 143, hex('#6a3a20')); R.rect(109, 139, 215, 139, hex('#9a5a30'));
  R.rect(111, 144, 213, 168, hex('#4a2814')); for (const x of [116, 166]) { R.rect(x, 148, x + 42, 164, hex('#3a1e10')); R.rect(x + 1, 148, x + 41, 148, hex('#5a3418')); R.rect(x + 19, 155, x + 23, 157, hex('#c8a040')); }
  // encima: los libros, el tintero y el quinqué
  R.rect(114, 126, 134, 138, K0); R.rect(115, 127, 133, 132, hex('#6a2a2a')); R.rect(115, 133, 133, 137, hex('#2a4a6a')); R.rect(115, 129, 133, 129, hex('#c8a040'));
  R.rect(140, 132, 147, 138, K0); R.rect(141, 133, 146, 138, hex('#2a2a3a')); R.pset(142, 134, hex('#6a6a8a'));
  R.rect(184, 134, 196, 138, K0); R.rect(185, 135, 195, 137, hex('#c8a040')); R.rect(187, 118, 193, 134, hex('#d8e8e8')); R.rect(186, 118, 194, 118, K0); R.rect(188, 120, 188, 132, hex('#ffffff'));
};
const p5 = (t) => {
  capa('cuarto', fondoCuarto);
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5;
  luz(190, 126, 90 + fl * 3, hex('#e8a050'), 0.32);
  // el péndulo del reloj y el humo de una chimenea por la ventana
  R.linea(110, 46, Math.round(110 + Math.sin(t * 3.1) * 4), 66, hex('#c8a040')); R.disco(Math.round(110 + Math.sin(t * 3.1) * 4), 66, 2, hex('#e8c060'));
  R.recorte([24, 28, 84, 90]); for (let k = 0; k < 6; k++) { const f = (t * 0.25 + k / 6) % 1; R.disco(46 + f * 10 + Math.sin(f * 6) * 2, 56 - f * 24, 1 + f * 2.5, hex('#2a3050')); } R.recorte(null);
  // la sombra de la botella en la pared se multiplica en una fila (lo que había creado)
  const nb = Math.floor(tramo(t, a(0.925), a(0.985)) * 15);
  for (let k = 0; k < nb; k++) { const x = 166 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 12, s = 1 - Math.ceil(k / 2) * 0.05; if (x < 100 || x > 250) continue; const h = Math.round(24 * s), yb = 96; R.rect(x - 2, yb - h, x + 2, yb - h + 7, hex('#0a0c18')); R.rect(x - 4, yb - h + 7, x + 4, yb, hex('#0a0c18')); R.rect(x - 3, yb - h - 1, x + 3, yb - h, hex('#0a0c18')); }
  // Pemberton escribe, se levanta, va a la puerta, se despide y sale
  const anda = lin(t, a(0.84), a(0.875)), x = Math.round(lerp(150, 258, anda)), fuera = t > a(0.905);
  const puerta = tramo(t, a(0.888), a(0.897)) - tramo(t, a(0.91), a(0.922));
  if (puerta > 0) { const w = Math.round(36 * puerta); R.rect(253, 63, 253 + w, 150, hex('#e8c880')); R.rect(253, 63, 253 + w, 66, hex('#fff0c0')); R.rect(253 + w, 63, 255 + w, 150, K0); }
  if (!fuera) { const escribe = anda === 0;
    const pm = R.actor(NC.pemberton, x, 146, t, { dir: anda > 0 && anda < 1 ? 1 : anda >= 1 ? -1 : 1, anda: anda > 0 && anda < 1, sostiene: escribe ? [x + 20 + Math.round(Math.sin(t * 9) * 2), 138] : undefined, dedo: anda >= 1, sonrisa: anda >= 1 || t < a(0.83) });
    if (escribe) { const [hx, hy] = pm.mano; R.linea(hx + 1, hy - 1, hx + 5, hy - 8, hex('#f2eee2')); R.pset(hx + 5, hy - 9, hex('#c8c4bc')); } }
  escritorio();
  const brillo = tramo(t, a(0.915), a(0.95));
  if (brillo > 0) luz(167, 136, 14 + 4 * brillo + Math.sin(t * 5), hex('#ffe8a0'), 0.8 * brillo);
  PZ.papelito(R, 167, 139, {});
  if (brillo > 0.5 && Math.sin(t * 6) > 0) { R.pset(172, 129, hex('#ffffff')); R.pset(171, 129, hex('#fff0c0')); R.pset(173, 129, hex('#fff0c0')); R.pset(172, 128, hex('#fff0c0')); R.pset(172, 130, hex('#fff0c0')); }
  // la llama del quinqué que tiembla
  R.disco(190, 127 + Math.round(fl), 2, hex('#ffd36a')); R.pset(190, 124 + Math.round(fl), hex('#fff4d0'));
};

const efectos = [[a(0.08), 'puerta'], [2.2, 'burbujas'], [a(0.215), 'brillo'], [a(0.32), 'burbujas'], [a(0.43), 'toc'], [a(0.507), 'pop'], [a(0.575), 'papel'], [a(0.642), 'toc'],
  [P4 + 0.6, 'campana'], [a(0.739), 'pop'], [a(0.72), 'carro'], [a(0.89), 'puerta'], [a(0.95), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '1886', año: (t) => t < P5 ? 1886 : 1888 });
''')

# ───────────────────────────────────────── NC-CANDLER ─────────────────────────────────────────
E['nc-candler'] = ('Candler y la fórmula', '''// NC-CANDLER (frase 5), de 1891 a hoy. Cuatro planos:
// 1. el despacho de Candler: entra el vendedor por la puerta con el papel, Candler firma («bought the company») y en el mapa
//    de la pared crecen las rutas («a huge brand»), que él señala;
// 2. la cámara acorazada (gag 2): Candler llega, el volante gira («the secret formula»), la puerta enorme se abre despacio…
//    y dentro solo hay un papelito doblado; Candler se queda de piedra y se encoge de hombros («bank vault»);
// 3. la sala de juntas de noche: los dos que sabían la receta, cada uno en una punta de la mesa con su papelito, se miran;
//    el «2» («only two people») y el dedo en los labios («knew it»);
// 4. hoy, el museo de Atlanta: la misma puerta abierta tras la cuerda de terciopelo; entran visitantes, la guía la señala
//    («a vault») y un visitante hace una foto con flash («visitors can see»).''', COMUN + r'''
const c = (f) => en('candler', f);
const P2 = c(0.248), P3 = c(0.546), P4 = c(0.787);

const p1 = (t) => {
  const pu = tramo(t, c(0.0), c(0.03)) - tramo(t, c(0.09), c(0.12)), rutas = tramo(t, c(0.14), c(0.2));
  T.atlanta(R, t, { encuadre: 'banco', camara: 'despacho', rutas, puerta: pu, abre: 0 });
  const firma = t > c(0.1) && t < c(0.14), senala = t > c(0.19);
  const cd = R.actor(NC.candler, 162, 136, t, { dir: 1, sostiene: firma ? [178 + Math.round(Math.sin(t * 12) * 2), 129] : undefined, dedo: senala, sonrisa: t > c(0.14), habla: t < c(0.09) && Math.sin(t * 8) > 0.2 });
  if (firma) { const [hx, hy] = cd.mano; R.linea(hx + 1, hy, hx + 4, hy - 6, hex('#2a2a3a')); R.pset(hx + 4, hy - 7, hex('#f2eee2')); }
  T.atlantaDelante(R, t, { encuadre: 'banco', camara: 'despacho', rutas, puerta: pu, abre: 0 });
  // el contrato: primero en la mano del vendedor, luego encima de la mesa
  const deja = tramo(t, c(0.085), c(0.1));
  // el vendedor entra por la puerta, baja al despacho y le tiende el papel
  const u = lin(t, c(0.02), c(0.075)), sx = Math.round(lerp(290, 216, u)), sy = Math.round(u < 0.3 ? 128 : lerp(128, 164, Math.min(1, (u - 0.3) / 0.4)));
  const vd = R.actor(EL.comerciante, sx, sy, t, { dir: -1, anda: u > 0 && u < 1, sostiene: u >= 1 && deja < 1 ? [206, 140] : undefined, sonrisa: t > c(0.14), habla: t > c(0.075) && t < c(0.095) && Math.sin(t * 9) > 0 });
  const [px, py] = deja < 1 && u >= 1 ? [vd.mano[0] - 6, vd.mano[1] - 4] : [Math.round(lerp(200, 176, deja)), Math.round(lerp(136, 128, deja))];
  if (u >= 1 || deja >= 1) { R.rect(px - 1, py - 1, px + 11, py + 5, K0); R.rect(px, py, px + 10, py + 4, hex('#f2eee2')); for (let k = 0; k < 2; k++) R.linea(px + 2, py + 1 + k * 2, px + 8, py + 1 + k * 2, hex('#9a96a8')); if (t > c(0.13)) R.linea(px + 5, py + 3, px + 9, py + 2, hex('#2a3a7a')); }
  if (rutas > 0 && rutas < 1 && Math.sin(t * 9) > 0) R.icono('!', 146, 22, hex('#ffd36a'), K0);
};

const p2 = (t) => {
  const abre = lin(t, c(0.31), c(0.355)) * 0.25 + tramo(t, c(0.36), c(0.465)) * 0.75;
  T.atlanta(R, t, { encuadre: 'banco', abre, papelito: true, guardia: true });
  T.atlantaDelante(R, t, { encuadre: 'banco', abre, papelito: true, guardia: true });
  // Candler llega, manda abrir, espera con impaciencia, se queda de piedra y se encoge de hombros
  const u = lin(t, P2 + 0.05, c(0.31)), x = Math.round(lerp(-18, 92, u)), ve = t > c(0.47);
  R.actor(NC.candler, x, 166, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > c(0.31) && t < c(0.36), sorpresa: ve && t < c(0.505), brazos: t > c(0.505) && t < c(0.54), sonrisa: t > c(0.38) && !ve });
  // el empleado del banco que ha girado el volante se aparta
  const e = lin(t, c(0.36), c(0.4)); R.actor(EL.oficinista2, Math.round(lerp(136, 222, e)), 168, t, { dir: e > 0 && e < 1 ? 1 : -1, anda: e > 0 && e < 1, sostiene: e === 0 ? [154, 150] : undefined, sorpresa: ve && t < c(0.51) });
  if (ve && t < c(0.51)) R.icono('!', x + 6, 128, hex('#ffd36a'), K0);
  if (t > c(0.505)) R.icono('?', x + 6, 128 + Math.round(Math.sin(t * 6)), hex('#e8e8f0'), K0);
};

// 3 · la sala de juntas de noche, con los dos guardianes de la receta
const fondoJuntas = () => {
  const NG = rp('#1a110a', '#24170e', '#301f12', '#3c2817');
  llena(0, 0, 319, 118, NG, (x, y) => 1.5 + Math.sin(x * 0.21 + Math.sin(y * 0.1) * 2) * 0.25 + (hh(x >> 3, y >> 4) - 0.5) * 0.3 - (x > 270 && y < 50 ? 0.3 : 0));
  R.rect(0, 0, 319, 5, hex('#120b06')); R.rect(0, 5, 319, 7, hex('#6a4a2a')); R.rect(0, 8, 319, 8, hex('#120b06'));
  // paneles en relieve (fuera del ventanal y de la esquina de Atom)
  for (const [y0, y1] of [[18, 60], [68, 112]]) for (let x0 = 4; x0 < 312; x0 += 34) { if ((x0 + 30 > 112 && x0 < 206) || (x0 > 262 && y0 < 50)) continue;
    R.rect(x0, y0, x0 + 29, y0, hex('#5a3a22')); R.rect(x0, y0, x0, y1, hex('#5a3a22')); R.rect(x0, y1, x0 + 29, y1, hex('#0e0804')); R.rect(x0 + 29, y0, x0 + 29, y1, hex('#0e0804'));
    R.rect(x0 + 3, y0 + 3, x0 + 26, y0 + 3, hex('#0e0804')); R.rect(x0 + 3, y0 + 3, x0 + 3, y1 - 3, hex('#0e0804')); R.rect(x0 + 3, y1 - 3, x0 + 26, y1 - 3, hex('#4a3020')); R.rect(x0 + 26, y0 + 3, x0 + 26, y1 - 3, hex('#4a3020')); }
  // el ventanal en arco con la ciudad de noche (recortado a su hueco)
  R.rect(124, 30, 196, 106, K0); R.disco(160, 34, 36, K0); R.rect(128, 34, 192, 104, hex('#121a36')); R.disco(160, 34, 32, hex('#121a36'));
  R.recorte([128, 2, 192, 104]);
  for (let k = 0; k < 26; k++) R.pset(130 + (k * 29) % 62, 6 + (k * 17) % 52, hex(k % 4 ? '#7a84b8' : '#ffffff'));
  R.disco(176, 18, 5, hex('#e8e0c0'));
  for (let k = 0; k < 8; k++) { const x = 128 + k * 8, h = 20 + (k * 13) % 30; R.rect(x, 104 - h, x + 6, 104, hex('#0a0e20')); for (let j = 0; j < 6; j++) if ((k + j) % 3) R.pset(x + 2 + (j % 2) * 2, 106 - h + j * 4, hex('#e8c060')); }
  R.recorte(null);
  R.rect(159, 2, 160, 104, K0); R.rect(128, 62, 192, 63, K0); R.rect(120, 104, 200, 108, hex('#6a4a2a')); R.rect(120, 104, 200, 104, hex('#9a6a3a'));
  for (const x of [112, 198]) { R.rect(x, 22, x + 10, 110, K0); R.rect(x + 1, 23, x + 9, 109, hex('#4a1820')); for (let y = 24; y < 108; y += 4) R.pset(x + 5, y, hex('#2a0c10')); }
  R.rect(108, 20, 212, 22, hex('#c8a040'));
  // las dos librerías con lomos de colores
  for (const [x0, x1, y0] of [[6, 104, 26], [216, 266, 52]]) { R.rect(x0, y0, x1, 118, K0); R.rect(x0 + 1, y0 + 1, x1 - 1, 118, hex('#2a1608'));
    for (let sy = y0 + 4; sy < 116; sy += 16) { R.rect(x0 + 1, sy + 12, x1 - 1, sy + 13, hex('#5a3a22'));
      for (let x = x0 + 3; x < x1 - 4;) { const w = 3 + Math.floor(hh(x, sy) * 3), h = 8 + Math.floor(hh(sy, x) * 4), c = hex(['#6a2a2a', '#2a4a6a', '#3a5a2a', '#7a5a2a', '#4a2a5a', '#8a7a5a'][Math.floor(hh(x, sy, 2) * 6)]);
        R.rect(x, sy + 12 - h, x + w - 1, sy + 11, c); R.pset(x, sy + 12 - h, mez(c, hex('#ffffff'), 0.3)); R.pset(x + 1, sy + 12 - h + 2, hex('#c8a040')); x += w + (hh(x, sy, 5) > 0.85 ? 3 : 0); } } }
  // el reloj de pie
  R.rect(284, 56, 312, 152, K0); R.rect(285, 57, 311, 151, hex('#4a2814')); R.disco(298, 72, 10, K0); R.disco(298, 72, 9, hex('#e8dcc0')); R.linea(298, 72, 298, 66, K0); R.linea(298, 72, 302, 74, K0);
  R.rect(290, 88, 306, 140, K0); R.rect(291, 89, 305, 139, hex('#1a0e08'));
  // la alfombra en perspectiva con su cenefa
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = y < 124 || y > 172 || x < 10 + (180 - y) * 0.1 || x > 310 - (180 - y) * 0.1;
    R.pset(x, y, borde ? (((x >> 2) + (y >> 1)) % 3 === 0 ? hex('#c8a040') : hex('#3a1a2a')) : R.tone(rp('#4a1420', '#5a1a28', '#6a2230', '#7a2a36'), 1.5 + Math.sin(x * 0.3) * Math.sin(y * 0.6) * 0.8 + (y - 118) / 60, x, y)); }
  // la mesa de juntas detrás de los dos, con sillas, la jarra y la lámpara verde
  for (const x of [52, 96, 224, 268]) { R.rect(x, 104, x + 16, 124, K0); R.rect(x + 1, 105, x + 15, 123, hex('#5a1e1a')); R.rect(x + 1, 105, x + 15, 106, hex('#8a3a2a')); }
  R.rect(30, 120, 290, 142, K0); R.rect(31, 121, 289, 124, hex('#7a3a1a')); R.rect(31, 121, 289, 121, hex('#a85a30')); R.rect(31, 125, 289, 141, hex('#4a2010'));
  for (let x = 40; x < 290; x += 50) R.rect(x, 128, x + 30, 138, hex('#3a180c'));
  R.rect(86, 112, 92, 121, K0); R.rect(87, 113, 91, 120, hex('#a8c8d8')); R.rect(232, 114, 236, 121, K0); R.rect(233, 115, 235, 120, hex('#a8c8d8'));
  R.rect(158, 106, 162, 120, hex('#c8a040')); R.rect(154, 118, 166, 121, K0); R.poligono([[146, 108], [174, 108], [168, 98], [152, 98]], hex('#2a6a4a')); R.linea(146, 108, 174, 108, K0); R.linea(152, 98, 168, 98, hex('#5aa07a'));
};
const p3 = (t) => {
  capa('juntas', fondoJuntas);
  luz(160, 118, 60 + Math.sin(t * 3), hex('#c8e0a0'), 0.25);
  // la polilla que ronda la lámpara, la lluvia en el cristal y el péndulo del reloj
  const pa = Math.round(160 + Math.cos(t * 4.2) * 10), pb = Math.round(96 + Math.sin(t * 5.1) * 4); R.pset(pa, pb, hex('#e8dcc0')); R.pset(pa + (Math.sin(t * 30) > 0 ? 1 : -1), pb, hex('#c8bca0'));
  R.recorte([128, 2, 192, 104]); for (let k = 0; k < 12; k++) { const y = 10 + ((k * 31 + t * 30) % 94), x = 130 + (k * 23) % 60; R.pset(x, Math.round(y), hex('#6a7ab0')); R.pset(x, Math.round(y) + 1, hex('#4a5a90')); } R.recorte(null);
  const pe = Math.round(Math.sin(t * 2.8) * 4); R.linea(298, 90, 298 + pe, 128, hex('#c8a040')); R.disco(298 + pe, 130, 3, hex('#e8c060'));
  // los dos, uno a cada lado de la caja fuerte: se miran, levantan su papelito, «2», y el dedo en los labios
  const sube = tramo(t, c(0.585), c(0.61)), calla = t > c(0.67) && t < c(0.75), guarda = t > c(0.75);
  const iz = R.actor(EL.oficinista, 104, 168, t, { dir: 1, sostiene: sube > 0 && !calla && !guarda ? [124, Math.round(lerp(152, 140, sube))] : undefined, dedo: calla, habla: t < c(0.575) && Math.sin(t * 8) > 0, sonrisa: guarda });
  const de = R.actor(EL.oficinista2, 200, 168, t, { dir: -1, sostiene: sube > 0 && !calla && !guarda ? [196, Math.round(lerp(152, 140, sube))] : undefined, dedo: calla, sonrisa: t < c(0.575) || guarda });
  if (sube > 0 && !calla && !guarda) { PZ.papelito(R, iz.mano[0] + 5, iz.mano[1] + 1, {}); PZ.papelito(R, de.mano[0] - 5, de.mano[1] + 1, {}); }
  PZ.cajaFuerte(R, 160, 170, { s: 1, abre: 0 });
  const dos = tramo(t, c(0.612), c(0.627)); if (dos > 0) R.numero('2', 160, Math.round(lerp(92, 84, dos)), { tam: 16, centro: true });
  if (calla) for (const x of [110, 206]) { const y = 136 - Math.round((t * 8) % 6); R.pset(x, y, hex('#e8e8f0')); R.pset(x + 1, y - 1, hex('#e8e8f0')); R.pset(x + 2, y, hex('#e8e8f0')); }
};

const p4 = (t) => {
  T.atlanta(R, t, { encuadre: 'banco', museo: true });
  // los visitantes de detrás de la cuerda
  const v1 = lin(t, P4, P4 + 1.6), v2 = lin(t, P4 + 0.6, P4 + 2.4);
  R.actor(NC.estudiante, Math.round(lerp(330, 196, v1)), 145, t, { dir: -1, anda: v1 > 0 && v1 < 1, sorpresa: v1 >= 1 && t < c(0.88), sonrisa: t > c(0.88) });
  R.actor(NC.investigador, Math.round(lerp(340, 214, v2)), 146, t, { dir: -1, anda: v2 > 0 && v2 < 1, habla: v2 >= 1 && Math.sin(t * 7) > 0.3 });
  R.actor(NC.voluntario, 96, 144, t, { dir: 1, dedo: t > c(0.84) && t < c(0.9) });
  T.atlantaDelante(R, t, { encuadre: 'banco', museo: true });
  // la guía señala la cámara; el visitante de delante hace la foto con flash
  R.actor(NC.profesor, 24, 168, t, { dir: 1, dedo: t > c(0.83), habla: Math.sin(t * 8) > 0 && t < c(0.95) });
  const ft = c(0.9), foto = t > ft - 0.6;
  const vf = R.actor(NC.periodista2, 120, 170, t, { dir: 1, sostiene: foto ? [138, 150] : undefined, sonrisa: t > ft + 0.4 });
  if (foto) { const [hx, hy] = vf.mano; R.rect(hx - 1, hy - 4, hx + 5, hy, K0); R.rect(hx, hy - 3, hx + 4, hy - 1, hex('#3a3a46')); R.pset(hx + 3, hy - 3, hex('#a8c8e8'));
    const f = 1 - lin(t, ft, ft + 0.35); if (t > ft && f > 0) { R.disco(hx + 4, hy - 3, 2 + 8 * f, hex('#ffffff')); if (f > 0.6) T.tinte(R, 20, 179, [255, 255, 255], 0.2 * f); } }
  // un niño (pequeño) que pasa corriendo por delante
  const n = lin(t, c(0.93), c(1) + 0.9); if (n > 0 && n < 1) R.actor(NC.estudiante, Math.round(lerp(-20, 330, n)), 178, t, { dir: 1, anda: true, sonrisa: true });
};

const efectos = [[c(0.025), 'puerta'], [c(0.1), 'firma'], [c(0.15), 'whoosh'], [c(0.31), 'cerrojo'], [c(0.36), 'maquina'], [c(0.46), 'brillo'], [c(0.505), 'boing'],
  [c(0.61), 'papel'], [c(0.62), 'pop'], [c(0.9), 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P2 ? 1891 : t < P3 ? Math.round(lerp(1891, 1925, lin(t, P2, P3))) : t < P4 ? 1935 : 2026 });
''')

# ───────────────────────────────────────── NC-BOTELLAS ─────────────────────────────────────────
E['nc-botellas'] = ('Las botellas', '''// NC-BOTELLAS (frase 6), 1899. Cuatro planos:
// 1. la estación de 1899: el tren entra echando vapor, un mozo cruza con un carro de cajones de botellas rectas («the
//    bottles») y los dos abogados de bombín bajan del vagón y echan a andar («two lawyers from Tennessee»);
// 2. la farmacia de Atlanta: los abogados entran y le enseñan a Candler una botella («the rights to bottle it»); él no se
//    lo cree y señala la fuente de soda, donde el dependiente sirve («the soda fountains»);
// 3. el mostrador de mármol de cerca: el contrato pasa de una mano a otra y el dólar cae y gira («one dollar»); detrás el
//    dependiente se queda boquiabierto («worst deals»);
// 4. el mapa de EE. UU.: desde Atlanta salen las rutas con botellas, trenes y carros que llegan a cada rincón del país
//    («every corner of the country»), con una chincheta en cada ciudad; la barra corre de 1899 a 1920.''', COMUN + r'''
const b = (f) => en('botellas', f);
const P2 = b(0.209), P3 = b(0.548), P4 = b(0.755);

// 1 · la estación de 1899
const fondoEstacion = () => {
  llena(0, 0, 319, 70, rp('#5a86c8', '#7aa2d8', '#9cbce6', '#c0d6f0', '#dce8f4'), (x, y) => y / 70 * 4.2);
  // colinas y árboles lejanos
  R.poligono([[0, 70], [0, 58], [40, 50], [90, 56], [140, 48], [200, 56], [200, 70]], hex('#8aa8a0')); for (let k = 0; k < 18; k++) R.disco(6 + k * 11, 60 + (k % 3), 4, hex(k % 2 ? '#5a7a5a' : '#6a8a62'));
  // la estación de ladrillo a la derecha, con sus ventanas en arco y el reloj
  ladrillos(196, 30, 319, 118, rp('#6a2e24', '#863c2c', '#a04c34', '#b45e42'), hex('#d0bca0'), 7);
  R.rect(192, 24, 319, 32, K0); R.rect(193, 25, 319, 31, hex('#d8ccb0')); R.rect(193, 25, 319, 26, hex('#f2eadb'));
  for (const wx of [206, 238]) { R.rect(wx, 54, wx + 20, 96, K0); R.disco(wx + 10, 56, 10, K0); R.rect(wx + 1, 56, wx + 19, 95, hex('#3a4a5a')); R.disco(wx + 10, 56, 9, hex('#3a4a5a')); R.rect(wx + 10, 47, wx + 10, 95, K0); R.rect(wx + 1, 74, wx + 19, 74, K0); R.rect(wx + 2, 57, wx + 5, 72, hex('#8aa0b8')); }
  R.disco(290, 70, 13, K0); R.disco(290, 70, 12, hex('#efe4c8')); R.disco(290, 70, 11, hex('#e8dcc0')); for (let k = 0; k < 12; k++) R.pset(Math.round(290 + Math.cos(k * 0.52) * 9), Math.round(70 + Math.sin(k * 0.52) * 9), K0);
  R.linea(290, 70, 290, 62, K0); R.linea(290, 70, 296, 72, K0);
  llena(196, 112, 319, 139, rp('#6a6470', '#86808c', '#a29ca8', '#bab4c0'), (x, y) => 1.6 + ((x - 196) % 16 === 0 || (y - 112) % 9 === 0 ? -1.2 : (hh((x - 196) >> 4, (y - 112) / 9 | 0, 4) - 0.5) * 1.2));
  R.rect(196, 111, 319, 112, hex('#d8ccb0'));
  R.rect(270, 92, 310, 139, K0); R.rect(271, 93, 309, 139, hex('#4a2c1c')); R.rect(274, 96, 288, 136, hex('#3a2014')); R.rect(292, 96, 306, 136, hex('#3a2014')); R.rect(287, 116, 289, 118, hex('#c8a040')); R.rect(291, 116, 293, 118, hex('#c8a040'));
  for (const x of [222, 250]) { R.rect(x, 120, x + 12, 138, K0); R.rect(x + 1, 121, x + 11, 138, hex('#6a4a2a')); R.rect(x + 1, 121, x + 11, 122, hex('#8a6a3a')); }
  // bajo la marquesina, al otro lado de las vías: el almacén de ladrillo en sombra, la tapia y el balasto
  ladrillos(0, 74, 196, 112, rp('#3a1e1a', '#4a2620', '#5a3026', '#6a3a2c'), hex('#7a6a5a'), 11);
  for (const wx of [14, 58, 102, 146]) { R.rect(wx, 82, wx + 22, 100, K0); R.rect(wx + 1, 83, wx + 21, 99, hex('#2a3040')); R.rect(wx + 11, 83, wx + 11, 99, K0); R.rect(wx + 1, 91, wx + 21, 91, K0); R.rect(wx + 2, 84, wx + 4, 89, hex('#6a7a90')); }
  R.rect(0, 112, 196, 120, hex('#5a5048')); R.rect(0, 112, 196, 112, hex('#8a8070'));
  for (let y = 121; y < 138; y++) for (let x = 0; x < 196; x++) R.pset(x, y, R.tone(rp('#3a3430', '#5a524a', '#7a7064'), 1 + hh(x, y, 3) * 1.6, x, y));
  for (let x = 2; x < 196; x += 7) R.rect(x, 131, x + 4, 133, hex('#4a3020'));
  R.rect(0, 129, 196, 129, hex('#a8a8b4')); R.rect(0, 134, 196, 134, hex('#a8a8b4'));
  // la marquesina de hierro del andén, con sus columnas de fundición
  R.rect(0, 70, 196, 74, K0); R.rect(0, 71, 196, 73, hex('#3a4a3a'));
  for (let x = 0; x < 196; x += 6) { R.poligono([[x, 74], [x + 6, 74], [x + 3, 78]], hex('#4a5a4a')); R.pset(x + 3, 78, K0); }
  for (const x of [20, 100, 180]) { R.rect(x - 1, 74, x + 2, 140, K0); R.rect(x, 74, x + 1, 140, hex('#4a5a4a')); R.rect(x - 3, 136, x + 4, 140, K0); R.linea(x - 6, 74, x + 1, 82, K0); R.linea(x + 8, 74, x + 1, 82, K0); }
  // el andén de losas con su borde y las vías de abajo
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 140) / 8), jx = (x + fy * 9) % 22 === 0, jy = (y - 140) % 8 === 7;
    R.pset(x, y, jx || jy ? hex('#6a6470') : R.tone(rp('#8a8490', '#a29ca8', '#bab4c0', '#d0cad4'), 1.6 + (hh(Math.floor((x + fy * 9) / 22), fy) - 0.5) * 1.4 + ((y - 140) % 8 === 0 ? 0.6 : 0), x, y)); }
  R.rect(0, 138, 319, 141, hex('#e8d890')); R.rect(0, 141, 319, 141, K0);
  // un banco del andén, maletas y un farol
  R.rect(232, 146, 274, 148, hex('#6a4a2a')); R.rect(232, 140, 274, 142, hex('#6a4a2a')); R.rect(234, 148, 236, 156, K0); R.rect(270, 148, 272, 156, K0);
  R.rect(286, 150, 302, 160, K0); R.rect(287, 151, 301, 159, hex('#8a5a2a')); R.rect(293, 148, 296, 150, K0); R.rect(304, 154, 314, 162, K0); R.rect(305, 155, 313, 161, hex('#5a6a3a'));
};
const tren = (x, t) => {   // la locomotora (mira a la izquierda) y el vagón de pasajeros, sobre el andén del fondo
  x = Math.round(x); const y = 136;
  // vagón
  R.rect(x + 74, y - 46, x + 190, y - 8, K0); R.rect(x + 75, y - 45, x + 189, y - 9, hex('#5a1e22')); R.rect(x + 75, y - 45, x + 189, y - 43, hex('#8a3a3a')); R.rect(x + 72, y - 50, x + 192, y - 46, K0); R.rect(x + 73, y - 49, x + 191, y - 47, hex('#3a3a44'));
  for (let k = 0; k < 6; k++) { const wx = x + 80 + k * 18; if (k === 3) continue; R.rect(wx, y - 40, wx + 11, y - 28, K0); R.rect(wx + 1, y - 39, wx + 10, y - 29, hex('#e8d090')); R.rect(wx + 1, y - 39, wx + 3, y - 33, hex('#fff4d0')); }
  R.rect(x + 75, y - 24, x + 189, y - 23, hex('#c8a040'));
  for (const wx of [x + 90, x + 110, x + 156, x + 176]) { R.disco(wx, y - 5, 5, K0); R.disco(wx, y - 5, 4, hex('#4a4a54')); R.pset(wx, y - 5, hex('#c8c8d0')); }
  // locomotora
  R.rect(x + 8, y - 30, x + 60, y - 12, K0); R.rect(x + 9, y - 29, x + 59, y - 13, hex('#2a2a34')); R.rect(x + 9, y - 29, x + 59, y - 27, hex('#4a4a58'));
  R.rect(x + 50, y - 48, x + 72, y - 12, K0); R.rect(x + 51, y - 47, x + 71, y - 13, hex('#3a2a2a')); R.rect(x + 54, y - 44, x + 66, y - 36, hex('#e8d090')); R.rect(x + 48, y - 52, x + 74, y - 48, K0);
  R.rect(x + 14, y - 44, x + 22, y - 30, K0); R.rect(x + 15, y - 43, x + 21, y - 30, hex('#3a3a44')); R.rect(x + 12, y - 48, x + 24, y - 44, K0);
  R.disco(x + 36, y - 32, 4, K0); R.disco(x + 36, y - 32, 3, hex('#c8a040'));
  R.poligono([[x + 8, y - 12], [x - 6, y - 2], [x + 8, y - 2]], hex('#8a2a2a')); R.linea(x + 8, y - 12, x - 6, y - 2, K0);
  R.disco(x + 10, y - 22, 3, K0); R.disco(x + 10, y - 22, 2, hex('#ffe8a0'));
  const g = -t * 8; for (const [wx, r] of [[x + 24, 6], [x + 44, 8], [x + 62, 6]]) { R.disco(wx, y - r, r, K0); R.disco(wx, y - r, r - 1, hex('#8a2a2a')); for (let k = 0; k < 3; k++) R.linea(wx, y - r, Math.round(wx + Math.cos(g + k) * (r - 1)), Math.round(y - r + Math.sin(g + k) * (r - 1)), K0); }
  R.linea(x + 24, y - 6, x + 62, y - 6, hex('#c8c8d0'));
};
const p1 = (t) => {
  capa('estacion', fondoEstacion);
  for (const [x0, y, w, v, k] of [[20, 30, 40, 3, 0], [120, 18, 30, 5, 1], [60, 46, 26, 8, 2]]) { const x = ((x0 + t * v) % 240) - 30; nube(x, y, w, [rp('#a8b8d0', '#d4e0ee', '#ffffff'), rp('#98a8c4', '#c4d2e6', '#eef4fa'), rp('#b4c4da', '#dce6f2', '#ffffff')][k]); }
  pajaros(t, 26, hex('#2a3048'), 3, 16, 180);
  // el tren parado echa vapor
  const llega = 1, tx = 0;
  tren(tx, 0);
  for (let k = 0; k < 6; k++) { const f = (t * 0.8 + k / 6) % 1, x = tx + 18 - f * 20 + Math.sin(f * 7 + k) * 3, y = 88 - f * 40; R.disco(Math.round(x), Math.round(y), 3 + f * 6, R.tone(rp('#a8a8b4', '#d0d0d8', '#f2f2f6'), 2 - f * 1.5, Math.round(x), Math.round(y))); }
  if (llega > 0.6) for (let k = 0; k < 4; k++) { const f = (t * 1.3 + k / 4) % 1; R.disco(Math.round(tx + 30 + k * 10 + f * 6), Math.round(134 - f * 8), 2 + f * 3, hex('#e8e8f0')); }
  // la marquesina tapa la parte de arriba del tren (va delante)
  for (const x of [20, 100, 180]) { R.rect(x - 1, 74, x + 2, 140, K0); R.rect(x, 74, x + 1, 140, hex('#4a5a4a')); }
  // los abogados bajan del vagón (la puerta del centro) y echan a andar por el andén
  const baja = b(0.13), u1 = lin(t, baja, baja + 1.6), u2 = lin(t, baja + 0.45, baja + 2.1);
  if (t > baja - 0.3) { R.rect(tx + 133, 96, tx + 144, 128, hex('#1a1014')); }
  if (t > baja) R.actor(NC.abogado1, Math.round(lerp(132, 208, u1)), Math.round(u1 < 0.12 ? 136 : 150), t, { dir: 1, anda: u1 > 0 && u1 < 1, habla: u1 >= 1 && Math.sin(t * 8) > 0, sonrisa: true });
  if (t > baja + 0.3) R.actor(NC.abogado2, Math.round(lerp(132, 186, u2)), Math.round(u2 < 0.15 ? 136 : 152), t, { dir: 1, anda: u2 > 0 && u2 < 1, sostiene: u2 >= 1 ? [204, 136] : undefined });
  // las palomas que picotean
  for (let k = 0; k < 3; k++) { const x = 40 + k * 14 + Math.round(Math.sin(t * 0.7 + k) * 4), y = 168 + (k % 2) * 4, pc = Math.sin(t * 6 + k * 2) > 0.3 ? 1 : 0; R.rect(x, y - 3, x + 4, y, hex('#7a7a88')); R.rect(x + 4 + pc, y - 4 + pc * 2, x + 5 + pc, y - 3 + pc * 2, hex('#5a5a68')); R.pset(x + 5 + pc, y - 4 + pc * 2, K0); R.pset(x + 2, y + 1, hex('#c86a4a')); }
  // el mozo empuja la carretilla de cajones de botellas por delante
  const m = lin(t, b(0.0), b(0.12)), mx = Math.round(lerp(-60, 330, m));
  if (m > 0 && m < 1) { cajon(mx + 18, 164, 5); cajon(mx + 22, 150, 4); R.rect(mx + 14, 164, mx + 50, 166, K0); R.disco(mx + 46, 170, 4, K0); R.disco(mx + 46, 170, 3, hex('#6a4a2a')); R.linea(mx + 14, 164, mx + 6, 146, K0);
    R.actor(EL.cavador, mx - 10, 172, t, { dir: 1, anda: true }); }
};

const p2 = (t) => {
  T.atlanta(R, t, { encuadre: 'farmacia', vasos: 6 });
  // el dependiente sirve en la fuente cuando Candler la señala
  const sirve = t > b(0.47);
  const dp = R.actor(NC.dependiente1886, 252, 138, t, { dir: -1, sostiene: sirve ? [246, 124] : [244 + Math.round(Math.sin(t * 6) * 2), 128], sonrisa: sirve });
  vasito(dp.mano[0], dp.mano[1] + 4, t, sirve ? lin(t, b(0.47), b(0.52)) : 0);
  T.atlantaDelante(R, t, { encuadre: 'farmacia' });
  // los dos abogados entran por la puerta y se acercan; uno levanta la botella
  const u1 = lin(t, P2, b(0.27)), u2 = lin(t, P2 + 0.35, b(0.29)), ensena = t > b(0.285) && t < b(0.44);
  const a1 = R.actor(NC.abogado1, Math.round(lerp(8, 150, u1)), 166, t, { dir: 1, anda: u1 > 0 && u1 < 1, sostiene: ensena ? [172, 138] : undefined, habla: t > b(0.21) && t < b(0.33) && Math.sin(t * 9) > 0 });
  if (ensena) PZ.botella(R, a1.mano[0] + 1, a1.mano[1] + 6, { color: 'marron' });
  R.actor(NC.abogado2, Math.round(lerp(6, 124, u2)), 170, t, { dir: 1, anda: u2 > 0 && u2 < 1, sonrisa: t > b(0.3) });
  // Candler escucha, niega con la cabeza y señala la fuente de soda
  const gira = t > b(0.46);
  R.actor(NC.candler, 214, 166, t, { dir: gira ? 1 : -1, dedo: gira, sonrisa: gira, enfado: t > b(0.36) && t < b(0.44), habla: t > b(0.36) && t < b(0.46) && Math.sin(t * 8) > 0 });
  if (t > b(0.37) && t < b(0.45)) R.icono('X', 222, 132 + Math.round(Math.sin(t * 9)), hex('#e85a4a'), K0);
};

const p3 = (t) => {
  const da = tramo(t, P3 + 0.1, b(0.585)), cae = lin(t, b(0.585), b(0.62)), pasa = tramo(t, b(0.6), b(0.66));
  T.atlanta(R, t, { encuadre: 'farmacia', camara: 'fuente', llena: 1, chorro: false, vaso: true });
  R.actor(NC.dependiente1886, 232, 152, t, { dir: -1, sorpresa: t > b(0.665), sonrisa: t < b(0.6) });
  T.atlantaDelante(R, t, { encuadre: 'farmacia', camara: 'fuente', llena: 1, chorro: false, vaso: true });
  // la mano del abogado (manga gris) suelta el dólar sobre el mármol
  const wx = Math.round(lerp(40, 82, da) - lerp(0, 40, tramo(t, b(0.62), b(0.69)))), wy = Math.round(lerp(176, 140, da) + lerp(0, 40, tramo(t, b(0.62), b(0.69))));
  T.brazo(R, wx - 30, wy + 34, wx, wy, '#4a4a52', 1, { codo: [wx - 20, wy + 10] });
  // el dólar: en los dedos, luego cae y gira sobre el mármol
  const gx = cae > 0 ? Math.round(lerp(wx + 12, 110, cae)) : wx + 12, gy = cae > 0 ? Math.round(lerp(wy - 2, 150, cae) - Math.sin(cae * Math.PI) * 10) : wy - 2;
  PZ.dolar(R, gx, gy, { s: 3, giro: cae > 0 ? (t * (cae < 1 ? 3 : Math.max(0, 3 - (t - b(0.62)) * 2))) % 1 : 0 });
  if (cae >= 1) { R.numero('$1', 110, 116, { tam: 16, centro: true }); }
  // la mano de Candler (manga oscura) recoge el contrato enrollado y se lo pasa
  const cx = Math.round(lerp(330, 196, tramo(t, P3, b(0.58))) + lerp(0, -40, pasa) + lerp(0, 120, tramo(t, b(0.7), P4))), cy = Math.round(lerp(150, 140, tramo(t, P3, b(0.58))));
  const rx = cx - 14; R.rect(rx - 10, cy - 6, rx + 2, cy + 2, K0); R.rect(rx - 9, cy - 5, rx + 1, cy + 1, hex('#f2eee2')); R.rect(rx - 9, cy - 2, rx + 1, cy - 2, hex('#a8a090')); R.rect(rx - 6, cy - 5, rx - 5, cy + 1, hex('#c83a32'));
  T.brazo(R, cx + 30, cy + 36, cx, cy, '#2e2e3a', -1, { codo: [cx + 22, cy + 12] });
  if (t > b(0.67) && t < P4) R.icono('!', 236, 112 + Math.round(Math.sin(t * 9)), hex('#ffd36a'), K0);
};

// 4 · el mapa: de Atlanta a cada rincón
const ATL = [-84.39, 33.75];
const DESTINOS = [[[-85.31, 35.05], 0.0], [[-86.78, 36.16], 0.08], [[-90.07, 29.95], 0.15], [[-87.63, 41.88], 0.22], [[-74.0, 40.71], 0.3], [[-80.19, 25.76], 0.38], [[-96.8, 32.78], 0.44],
  [[-90.2, 38.63], 0.5], [[-104.99, 39.74], 0.58], [[-93.27, 44.98], 0.62], [[-122.42, 37.77], 0.7], [[-118.24, 34.05], 0.74], [[-122.68, 45.52], 0.8], [[-71.06, 42.36], 0.84]];
const p4 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const [ax, ay] = P(ATL), U = lin(t, P4 + 0.2, b(0.95));
  R.recorte([24, 18, 296, 166]);
  DESTINOS.forEach(([lugar, s], k) => { const [dx, dy] = P(lugar), u = Math.max(0, Math.min(1, (U - s) / 0.16)); if (u <= 0) return;
    const mx = (ax + dx) / 2, my = (ay + dy) / 2 - Math.hypot(dx - ax, dy - ay) * 0.15, pts = [];
    for (let i = 0; i <= 12; i++) { const q = i / 12; pts.push([Math.round((1 - q) * (1 - q) * ax + 2 * (1 - q) * q * mx + q * q * dx), Math.round((1 - q) * (1 - q) * ay + 2 * (1 - q) * q * my + q * q * dy)]); }
    R.ruta(pts, u, hex('#c83a32'), { grueso: 1, flecha: false });
    if (u < 1) { const i = Math.min(11, Math.floor(u * 12)), f = u * 12 - i, x = Math.round(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f), y = Math.round(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f);
      if (k % 3 === 0) { R.rect(x - 4, y - 3, x + 3, y + 1, K0); R.rect(x - 3, y - 2, x + 2, y, hex('#3a3a44')); R.rect(x + 1, y - 5, x + 2, y - 3, K0); R.pset(x + 3, y - 1, hex('#ffe8a0')); }
      else { R.rect(x - 1, y - 6, x + 1, y + 1, K0); R.pset(x, y - 5, hex('#c8c8d0')); R.rect(x, y - 3, x, y, hex('#5a3418')); } }
  });
  R.recorte(null);
  DESTINOS.forEach(([lugar, s], k) => { const [dx, dy] = P(lugar), u = (U - s) / 0.16; if (u >= 1) T.chincheta(R, dx, dy, t, hex('#c83a32'), { baja: Math.min(1, (u - 1) * 3) }); });
  // Atlanta: la botella recta grande de pie y su halo
  R.halo(ax, ay - 8, 14 + Math.sin(t * 4) * 2, rp('#c8a040', '#e8c060', '#fff0b0'), 0.7);
  PZ.botella(R, ax, ay + 2, { color: 'marron', s: 1 });
};

const efectos = [[0.15, 'vapor'], [b(0.03), 'carro'], [b(0.145), 'golpecito'], [b(0.25), 'puerta'], [b(0.31), 'toc'], [b(0.49), 'burbujas'], [b(0.585), 'papel'], [b(0.6), 'tic'],
  [b(0.69), 'boing'], [P4 + 0.2, 'whoosh'], [b(0.82), 'pop'], [b(0.92), 'pop'], [b(0.96), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P4 ? 1899 : Math.round(lerp(1899, 1920, lin(t, P4, b(0.97)))) });
''')
