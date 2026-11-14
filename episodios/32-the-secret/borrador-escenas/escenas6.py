E = {}

# utilidades del grupo S6 (cf-bonos, cf-adios y cf-tele): cada escena las lleva dentro.
HELP = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const sube = (u) => u * u * (3 - 2 * u);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };
const caja = (x0, y0, x1, y1, c, borde = Q.k) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const madera = (x0, y0, x1, y1, r, o = {}) => { const al = o.tabla ?? 9, k0 = o.k ?? 0, lg = o.largo ?? 96; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = o.v ? x - x0 : y - y0, b = o.v ? y : x, tb = Math.floor(a / al), jx = (b + tb * 53 + k0 * 17) % lg; const v = (o.base ?? 1.6) + Math.sin(b * 0.13 + tb * 2.1 + Math.sin(a * 0.9 + b * 0.05) * 1.2) * 0.45 + (h(b >> 1, a, k0) - 0.5) * 0.5 + (tb % 2) * 0.3; R.pset(x, y, a % al === al - 1 || jx === 0 ? r[0] : tono(r, v, x, y)); } };
const ladrillo = (x0, y0, x1, y1, r, o = {}) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor(y / 6), xx = x + (f % 2) * 7, junta = y % 6 === 5 || xx % 14 === 13, cal = o.calma ? o.calma(x, y) : false; const v = 1.6 + (h(Math.floor(xx / 14), f, 3) - 0.5) * (cal ? 0.3 : 1.2) + (h(x, y, 5) - 0.5) * 0.3 - (y - y0) / (y1 - y0 + 1) * 0.5; R.pset(x, y, junta ? (cal ? r[1] : r[0]) : tono(r, v, x, y)); } };
const hoja = (x0, y0, w, hh, o = {}) => { R.rect(x0 + 2, y0 + 2, x0 + w + 2, y0 + hh + 2, o.sombra ?? Q.sombra); caja(x0, y0, x0 + w, y0 + hh, o.c ?? Q.papel); R.rect(x0 + w - 1, y0 + 1, x0 + w - 1, y0 + hh - 1, Q.papelS); R.rect(x0 + 1, y0 + hh - 1, x0 + w - 1, y0 + hh - 1, Q.papelS); const p = o.paso ?? 3, n = o.n ?? Math.floor((hh - 5) / p); for (let k = 0; k < n; k++) { if (o.estrofa && k % (o.estrofa + 1) === o.estrofa) continue; const l = Math.round((w - 7) * (0.5 + h(k, x0 + (o.k ?? 0), 9) * 0.5)); R.rect(x0 + 3, y0 + 3 + k * p, x0 + 3 + l, y0 + 3 + k * p + (o.gr ?? 1) - 1, o.tinta ?? Q.tintaL); } };
const perfila = (f) => { const w = f[0].length + 2, g = ['.'.repeat(w), ...f.map((r) => '.' + r + '.'), '.'.repeat(w)].map((r) => r.split('')), o = g.map((r) => r.slice()); for (let j = 0; j < g.length; j++) for (let i = 0; i < w; i++) if (g[j][i] === '.') for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const c = (g[j + b] || [])[i + a]; if (c && c !== '.') { o[j][i] = 'k'; break; } } return o.map((r) => r.join('')); };
const sprite = (f, x, y, s, dir, pal) => { const w = f[0].length, x0 = Math.round(x - w * s / 2), y0 = Math.round(y - f.length * s); f.forEach((r, j) => { for (let i = 0; i < w; i++) { const c = pal[r[i]]; if (c == null) continue; const xx = x0 + (dir > 0 ? i : w - 1 - i) * s; R.rect(xx, y0 + j * s, xx + s - 1, y0 + j * s + s - 1, c); } }); };
const nube = (cx, cy, w, col) => { for (let i = -w; i <= w; i++) { const a = Math.round((Math.sqrt(Math.max(0, w * w - i * i)) / w) * (w * 0.42) * (0.75 + 0.25 * Math.sin(i * 0.7 + w))); for (let j = -a; j <= Math.round(a * 0.35); j++) { const x = Math.round(cx + i), y = Math.round(cy + j), v = j < -a * 0.4 ? 0 : j < a * 0.1 ? 1 : 2; R.pset(x, y, col[Math.min(2, v + (h(x, y) > 0.8 ? 1 : 0))]); } } };
const lomos = (x0, x1, y, k0, alt = 30, cols) => { const cs = cols ?? [Q.rojo, Q.azul, Q.verde, Q.morado, Q.vino, Q.oroS, Q.bot1, Q.azulS, Q.naranja, Q.grisS]; let x = x0, k = 0; while (x < x1 - 3) { const w = 3 + Math.floor(h(k, k0, 1) * 5), hh = Math.round(alt * (0.68 + h(k, k0, 2) * 0.32)), c = cs[Math.floor(h(k, k0, 3) * cs.length)], xe = Math.min(x1, x + w); caja(x, y - hh, xe, y, c); R.rect(x + 1, y - hh + 1, x + 1, y - 1, mez(c, Q.bl, 0.3)); if (w > 3) { R.rect(x + 1, y - hh + 4, xe - 1, y - hh + 4, Q.oro); R.rect(x + 1, y - 6, xe - 1, y - 5, h(k, k0, 4) > 0.5 ? Q.oro : Q.papel); } if (w > 5) R.rect(x + 3, y - Math.round(hh / 2) - 1, xe - 2, y - Math.round(hh / 2) + 1, Q.papel); x = xe; k++; } };
const PZ = T.PIEZAS_CF, X = (s) => hex(s);
const CAPAS = {};
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.recorte(null); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
// como capa(), pero solo pega lo pintado (lo de debajo queda a la vista por los huecos)
const capaEncima = (k, dib) => { if (!CAPAS[k]) { const bb = R.nuevo(), prev = R.usar(bb); dib(); R.recorte(null); R.usar(prev); CAPAS[k] = bb; } const B = CAPAS[k]; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = B[y * 320 + x]; if (c) R.pset(x, y, c); } };
const Q = Object.fromEntries(Object.entries({
  k: '#17151d', bl: '#f6f4ea', papel: '#efe6d0', papelS: '#cfc4a8', papelD: '#a89c80', tinta: '#2a2a3a', tintaL: '#7a7888', sombra: '#3a2c24',
  lad0: '#b8a486', lad1: '#d2c2a2', lad2: '#e2d4b6', lad3: '#eee2c8', rl0: '#6e3428', rl1: '#8e4632', rl2: '#a85a3e', rl3: '#c0704c',
  nog0: '#3e2616', nog1: '#5a3a20', nog2: '#74502c', nog3: '#8e683c', nog4: '#a8824e',
  pino0: '#8a6238', pino1: '#b0844c', pino2: '#c89c60', pino3: '#dcb67c',
  rojo: '#c8382e', rojoS: '#8e2420', rojoL: '#ec6a54', azul: '#3a5aa8', azulS: '#26407a', azulL: '#6e92d8', cian: '#58b8c8',
  verde: '#3e8a4a', verdeS: '#2a6436', verdeL: '#64b45a', verdeD: '#1c4428', oro: '#f0c040', oroS: '#b07e1c', oroL: '#ffe890',
  morado: '#6a4a9a', moradoS: '#46306e', naranja: '#e8842a', rosa: '#e88aa8',
  gris: '#8c8e96', grisS: '#606268', grisL: '#babcc4', grisD: '#3a3c46', acero: '#a4acb8', aceroL: '#ccd4dc', aceroS: '#7a8494', aceroD: '#525a6a',
  ci0: '#7e9cc4', ci1: '#96b0d2', ci2: '#b0c6de', ci3: '#cadaea', nubeL: '#f4f6f4', nubeM: '#d4dce2', nubeS: '#aab6c4',
  pr0: '#3a7436', pr1: '#4e8e40', pr2: '#66a84c', pr3: '#84c05c', tierra: '#7a5434', tierraS: '#523622', tierraL: '#9c7248',
  noc0: '#141a36', noc1: '#1e2850', noc2: '#2e3c70', noc3: '#44568e', calido: '#ffd890', calidoS: '#e8a850',
  vino: '#7a2a34', vinoS: '#561c26', vinoL: '#a04450', vinoD: '#3c121a', bot0: '#1a3e32', bot1: '#235040', bot2: '#2c624e', bot3: '#3a7a62',
  laton: '#c8a040', latonS: '#8a6a20', latonL: '#f0d478', tapete: '#2e6a52', tapeteS: '#225240', tapeteL: '#3c8266',
  bono: '#cfe6c0', bonoS: '#9cc494', bonoD: '#5e8e62', bonoL: '#e8f6dc', hor0: '#787c86', hor1: '#8e929a', hor2: '#a2a6ac', hor3: '#b6babe',
}).map(([k, v]) => [k, hex(v)]));
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lin = (t, a, b) => cl((t - a) / (b - a));
// un resplandor suave (mezcla con c, más en el centro)
const halo = (cx, cy, r, c, f) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1) tin(cx + i, cy + j, c, f * (1 - d) * (1 - d)); } };
// la sombra de alguien o de algo en el suelo
const sombra = (cx, cy, w, a = 0.3) => { for (let j = -2; j <= 2; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / 2.4) ** 2 < 1) tin(cx + i, cy + j, Q.k, a); };
// un destello de cuatro puntas
const chispa = (x, y, u, c = Q.bl) => { const r = u > 0.66 ? 3 : u > 0.33 ? 2 : 1; R.pset(x, y, c); for (let k = 1; k <= r; k++) { R.pset(x - k, y, c); R.pset(x + k, y, c); R.pset(x, y - k, c); R.pset(x, y + k, c); } };
// un bocadillo blanco con el pico hacia (px, py)
const globo = (x0, y0, x1, y1, px, py) => {
  const mx = Math.max(x0 + 6, Math.min(x1 - 6, px));
  R.poligono([[mx - 5, y1], [mx + 5, y1], [px, py]], Q.k);
  R.rect(x0 - 1, y0 + 1, x1 + 1, y1 - 1, Q.k); R.rect(x0 + 1, y0 - 1, x1 - 1, y1 + 1, Q.k); R.rect(x0, y0, x1, y1, Q.bl); R.rect(x0 + 1, y1, x1 - 1, y1, Q.papelS);
  R.poligono([[mx - 3, y1 - 1], [mx + 3, y1 - 1], [px, py - 2]], Q.bl);
};
// pinta a los personajes y las cosas por orden de suelo (los de más abajo, delante)
const enOrden = (l) => l.sort((a, b) => a[0] - b[0]).forEach((e) => e[1]());
'''

E['cf-bonos'] = ('Los bonos olvidados', '''// CF-BONOS (frase 17), Nueva York, 2004, sin cartela. Tres planos (gag 5):
// 1. A editorial/banco («when Zinn went to collect it»): el empleado, Preiss mayor y Zinn (con el cofre de Cleveland en
//    la mano) entran en la cámara; el empleado señala la caja de Preiss, que parpadea; corta en «Preiss opened»;
// 2. LOCAL el reservado del banco (papel verde, friso de nogal, cortina, mesa con lámpara): Preiss gira la llave de su
//    caja de acero («opened his safe deposit box»), levanta la tapa y, en «found something», salen volando los bonos
//    (gag 5): Preiss da un respingo, Zinn asoma por la cortina y el empleado caza uno al vuelo; corta en «twenty-five»;
// 3. LOCAL la mesa de cerca (inserto): la mano de Preiss (T.brazo) con un bono grande, la cifra «$25,000» que sube y el
//    montón que crece mientras siguen cayendo; en «a lost treasure of his own» la mano de Zinn acerca la aguamarina.''', HELP + r'''
const D0 = M('bonos', 0.5), D1 = M('bonos_fin', 14.1), te = (s) => en('bonos', (s - 0.5) / 13.601);
const P2 = te(4.08), P3 = te(8.55);
const MANGA_P = '#6e5a48', MANGA_Z = '#56627a';

// 1 · la cámara de las cajas: llegan los tres
const p1 = (t) => {
  const o = { encuadre: 'banco' }; T.editorial(R, t, o);
  const anda = (x0, x1, a, b) => { const u = lin(t, a, b); return [Math.round(lerp(x0, x1, u)), u < 1]; };
  const [ex, ea] = anda(268, 98, 0, te(2.2)), [px, pa] = anda(296, 136, 0, te(2.5)), [zx, za] = anda(326, 170, 0, te(2.75));
  const ya = t > te(2.6), mira = t > te(3.1);
  // la caja de Preiss parpadea en la pared
  if (ya) { const on = Math.floor(t * 5) % 2; R.rect(111, 70, 128, 70, on ? Q.oroL : Q.oro); R.rect(111, 85, 128, 85, on ? Q.oroL : Q.oro); R.rect(111, 70, 111, 85, on ? Q.oroL : Q.oro); R.rect(128, 70, 128, 85, on ? Q.oroL : Q.oro); chispa(128, 70, (t * 2) % 1, Q.oroL); }
  enOrden([
    [147, () => { const e = R.actor(EL.empleadoBancoCF, ex, 147, t, { dir: ea ? -1 : 1, anda: ea, sostiene: ea ? true : undefined, dedo: ya, sonrisa: ya }); if (ea) PZ.llave(R, e.mano[0] - 2, e.mano[1] + 5, {}); }],
    [150, () => R.actor(EL.preissMayor, px, 150, t, { dir: mira ? 1 : -1, anda: pa, habla: mira && Math.sin(t * 9) > 0, sonrisa: !pa })],
    [152, () => { const z = R.actor(EL.zinn, zx, 152, t, { dir: -1, anda: za, sostiene: true, sonrisa: true, habla: !za && !mira && Math.sin(t * 8) > 0.3 }); PZ.cofre(R, z.mano[0] - 6, z.mano[1] + 9, {}); }],
  ]);
  T.editorialDelante(R, t, o);
};

// 2 · el reservado: la caja de Preiss y los bonos que salen volando (gag 5)
const cortina = (t, mov) => {
  for (let y = 19; y <= 151; y++) { const an = 30 + Math.round(Math.sin(y * 0.05 + t * 1.2) * 1.2 + mov * 3 * Math.sin(y * 0.09 + t * 7) * (y / 150));
    for (let x = 0; x <= an; x++) { const pl = Math.sin(x * 0.85 + Math.sin(y * 0.03) * 0.8), fl = y > 147; R.pset(x, y, x === an ? Q.k : fl ? ((x + y) & 1 ? Q.laton : Q.latonS) : pl > 0.55 ? Q.vinoL : pl > -0.2 ? Q.vino : pl > -0.75 ? Q.vinoS : Q.vinoD); } }
  R.rect(0, 16, 40, 18, Q.k); R.rect(0, 17, 39, 17, Q.laton); R.disco(40, 17, 2, Q.laton);
  for (let x = 3; x < 32; x += 7) { R.rect(x, 15, x + 2, 20, Q.k); R.rect(x + 1, 16, x + 1, 19, Q.latonL); }
};
const cajaAcero = (x0, y0, w, hh, u, num) => {
  const lh = Math.round(27 * u);
  if (lh > 0) { R.poligono([[x0 - 1, y0], [x0 + w + 1, y0], [x0 + w + 3, y0 - lh - 1], [x0 + 1, y0 - lh - 1]], Q.k);
    if (lh > 3) { R.poligono([[x0 + 1, y0 - 1], [x0 + w - 1, y0 - 1], [x0 + w + 1, y0 - lh + 1], [x0 + 3, y0 - lh + 1]], (x, y) => ((x + y * 2) % 8 === 0 ? Q.vinoL : (x - y * 2 + 400) % 8 === 0 ? Q.vinoD : Q.vino)); R.linea(x0 + 2, y0 - lh, x0 + w + 2, y0 - lh, Q.aceroL); for (let x = x0 + 8; x < x0 + w - 2; x += 8) R.pset(x + 1, y0 - Math.round(lh / 2), Q.laton); } }
  R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh, Q.k); R.rect(x0, y0, x0 + w, y0 + hh - 1, Q.acero); R.rect(x0, y0, x0 + w, y0 + 1, Q.aceroL); R.rect(x0, y0 + hh - 3, x0 + w, y0 + hh - 1, Q.aceroS); R.rect(x0, y0, x0, y0 + hh - 1, Q.aceroL);
  for (let i = 0; i < 16; i++) { const x = x0 + 2 + Math.floor(h(i, 1, 41) * (w - 8)), y = y0 + 3 + Math.floor(h(i, 2, 41) * (hh - 7)); R.rect(x, y, x + 2 + (i % 3), y, i % 2 ? Q.aceroL : Q.aceroS); }
  R.rect(x0 + 21, y0 + 3, x0 + 47, y0 + hh - 4, Q.k); R.rect(x0 + 22, y0 + 4, x0 + 46, y0 + hh - 5, Q.laton); R.rect(x0 + 22, y0 + 4, x0 + 46, y0 + 4, Q.latonL);
  R.numero(String(num), x0 + 25, y0 + hh - 5, { color: X('#3a2a10'), sombra: false });
  R.disco(x0 + 8, y0 + 8, 3, Q.k); R.disco(x0 + 8, y0 + 8, 2, Q.laton); R.rect(x0 + 8, y0 + 8, x0 + 8, y0 + 10, Q.k);
  R.rect(x0 + 52, y0 + 6, x0 + 62, y0 + 10, Q.k); R.rect(x0 + 53, y0 + 7, x0 + 61, y0 + 7, Q.aceroL); R.rect(x0 + 53, y0 + 8, x0 + 61, y0 + 9, Q.aceroD);
};
const empapelado = (y1, paso) => { for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) { const cal = (y < 17 && x < 178) || (x > 268 && y < 52), ry = (x % paso) < paso / 2, m = paso / 4, rb = !cal && (x % (paso / 2)) === m && (y % 12) === ((x % paso) < paso / 2 ? 3 : 9);
  R.pset(x, y, rb ? Q.bot3 : tono([Q.bot0, Q.bot1, Q.bot2], 0.9 + (ry ? 0.45 : 0) * (cal ? 0.35 : 1) + (h(x, y, 2) - 0.5) * 0.3 - (y / y1) * 0.35, x, y)); } R.rect(0, 0, 319, 2, Q.nog1); R.rect(0, 3, 319, 3, Q.nog0); };
const friso = (y0, y1, paso) => { madera(0, y0, 319, y1, [Q.nog0, Q.nog1, Q.nog2, Q.nog3], { v: true, tabla: paso, base: 1.5 }); R.rect(0, y0, 319, y0 + 1, Q.nog4); R.rect(0, y0 + 2, 319, y0 + 2, Q.nog0);
  for (let x = 5; x < 320; x += paso) { R.rect(x, y0 + 7, x + paso - 11, y1 - 8, Q.nog0); R.rect(x + 1, y0 + 8, x + paso - 11, y1 - 8, Q.nog3); R.rect(x + 1, y0 + 8, x + paso - 12, y1 - 9, Q.nog2); for (let y = y0 + 9; y < y1 - 9; y++) for (let i = x + 2; i < x + paso - 12; i++) if (h(i >> 2, y, 77) < 0.16) R.pset(i, y, Q.nog1); }
  R.rect(0, y1 - 3, 319, y1, Q.nog1); R.rect(0, y1 - 3, 319, y1 - 3, Q.nog3); };
const fondoRes = () => capa('res', () => {
  empapelado(91, 16); friso(92, 135, 40); R.rect(0, 136, 319, 137, Q.k);
  // la moqueta granate con rombos y su cenefa
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const a = (x + (y - 138) * 2) % 24, b = (x - (y - 138) * 2 + 480) % 24, ce = y > 171 && y < 176; R.pset(x, y, ce ? ((x >> 2) & 1 ? Q.laton : Q.latonS) : a === 0 || b === 0 ? Q.vinoL : (a === 12 && b === 12) ? Q.oro : tono([Q.vinoD, Q.vinoS, Q.vino], 1.3 + (h(x, y, 9) - 0.5) * 0.9 - (y - 138) / 80, x, y)); }
  // el diploma enmarcado, el reloj y la placa del reservado
  caja(58, 34, 96, 70, Q.nog2); R.rect(60, 36, 94, 68, Q.nog0); R.rect(61, 37, 93, 67, Q.papel); for (let k = 0; k < 6; k++) R.rect(65, 42 + k * 3, 65 + 12 + Math.floor(h(k, 5) * 12), 42 + k * 3, Q.tintaL); R.disco(83, 60, 4, Q.rojoS); R.disco(83, 60, 3, Q.rojo); R.rect(66, 62, 76, 62, Q.tinta);
  R.disco(204, 44, 11, Q.k); R.disco(204, 44, 10, Q.laton); R.disco(204, 44, 8, Q.papel); for (let k = 0; k < 12; k++) R.pset(Math.round(204 + Math.sin(k * Math.PI / 6) * 7), Math.round(44 - Math.cos(k * Math.PI / 6) * 7), Q.tinta);
  caja(118, 30, 138, 44, Q.laton); R.rect(119, 31, 137, 31, Q.latonL); R.numero('3', 126, 41, { color: X('#3a2a10'), sombra: false });
  // el aplique de latón
  R.rect(259, 70, 265, 84, Q.k); R.rect(260, 71, 264, 83, Q.laton); R.rect(260, 71, 261, 83, Q.latonL); R.poligono([[254, 70], [270, 70], [267, 58], [257, 58]], Q.k); R.poligono([[256, 69], [268, 69], [266, 59], [258, 59]], Q.calido);
  // el helecho en su macetón
  caja(40, 144, 56, 158, Q.rl2); R.rect(41, 145, 55, 146, Q.rl3); R.rect(39, 142, 57, 144, Q.k); R.rect(40, 143, 56, 143, Q.rl3);
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.26, L = 15 + (k % 3) * 4; for (let i = 0; i < L; i++) { const x = Math.round(48 + Math.cos(a) * i), y = Math.round(142 + Math.sin(a) * i * 1.4 + i * i * 0.03); R.pset(x, y, i % 3 ? Q.verde : Q.verdeL); R.pset(x, y + 1, Q.verdeS); } }
  // la mesa de caoba con sus cajones y la lámpara de banquero
  sombra(186, 160, 66, 0.35);
  for (const x of [128, 240]) { R.rect(x, 142, x + 6, 159, Q.k); R.rect(x + 1, 142, x + 5, 158, Q.nog1); R.rect(x + 1, 142, x + 2, 158, Q.nog3); }
  R.rect(124, 137, 250, 149, Q.k); R.rect(125, 138, 249, 140, Q.nog4); R.rect(125, 141, 249, 148, Q.nog2); R.rect(125, 148, 249, 148, Q.nog1);
  for (const x of [140, 192]) { R.rect(x, 142, x + 42, 147, Q.nog0); R.rect(x + 1, 143, x + 41, 146, Q.nog3); R.rect(x + 18, 144, x + 24, 145, Q.laton); }
  R.rect(222, 134, 240, 137, Q.k); R.rect(223, 135, 239, 136, Q.laton); R.rect(230, 120, 232, 134, Q.k); R.rect(231, 120, 231, 134, Q.latonL); R.poligono([[216, 122], [246, 122], [242, 112], [220, 112]], Q.k); R.poligono([[218, 121], [244, 121], [241, 113], [221, 113]], Q.verde); R.rect(222, 114, 240, 115, Q.verdeL);
  R.rect(206, 134, 214, 137, Q.k); R.rect(207, 135, 213, 136, Q.papel);
  // el sillón de cuero a la derecha
  R.rect(284, 118, 312, 160, Q.k); R.rect(285, 119, 311, 150, Q.bot1); R.rect(285, 119, 311, 121, Q.bot3); for (let y = 126; y < 148; y += 8) for (let x = 290; x < 310; x += 8) R.pset(x, y, Q.laton); R.rect(281, 144, 315, 152, Q.k); R.rect(282, 145, 314, 151, Q.bot2); R.rect(286, 153, 289, 162, Q.nog0); R.rect(307, 153, 310, 162, Q.nog0);
});
const B0 = te(6.2), NB = 14;
// dónde va cada bono (k) a los tk segundos de salir: sube como un surtidor y baja planeando
const vuelo = (k, tk) => { const vx = (h(k, 1, 7) - 0.5) * 2 * (40 + 44 * h(k, 2, 7)) + (k % 2 ? 14 : -14), vy = 96 + 46 * h(k, 3, 7), g = 150, ta = vy / g;
  if (tk < ta) return [169 + vx * tk, 116 - vy * tk + 0.5 * g * tk * tk, false];
  const td = tk - ta, xa = 169 + vx * ta, ya = 116 - vy * vy / (2 * g), suelo = 150 + h(k, 4, 7) * 24, y = ya + 26 * td + 4 * td * td;
  return [xa + vx * 0.25 * td + Math.sin(td * 3.2 + k) * 9, Math.min(y, suelo), y >= suelo]; };
const p2 = (t) => {
  fondoRes();
  { const f = 0.5 + Math.sin(t * 9) * 0.04 + (Math.floor(t * 4) % 9 === 0 ? -0.1 : 0); halo(262, 62, 30, Q.calido, f); halo(231, 128, 22, Q.calido, 0.4); }
  { const a = t * Math.PI * 2 / 60 * 8; R.linea(204, 44, Math.round(204 + Math.sin(a) * 6), Math.round(44 - Math.cos(a) * 6), Q.rojo); R.linea(204, 44, 207, 41, Q.tinta); }
  T.motas(R, t, 60, 250, 30, 130, 8, Q.calido);
  const abre = sube(lin(t, te(5.2), te(5.72))), sale = t >= B0, llave = t < te(5.15);
  // Zinn asoma por la cortina con su cofre
  const uz = lin(t, P2 + 0.2, te(5.3)), zx = Math.round(lerp(4, 46, uz));
  const z = R.actor(EL.zinn, zx, 160, t, { dir: 1, anda: uz > 0 && uz < 1, sostiene: true, sorpresa: sale && t < B0 + 1.1, sonrisa: t > B0 + 1.1, salto: sale ? Math.max(0, Math.round(3 * Math.sin((t - B0) * 9) * Math.max(0, 1 - (t - B0) * 1.4))) : 0 });
  PZ.cofre(R, z.mano[0] + 7, z.mano[1] + 9, {});
  cortina(t, uz > 0 && uz < 1 ? 1 : 0);
  // la caja (con la aguamarina dentro) y lo que sale de ella
  if (abre > 0.5) PZ.piedra(R, 190, 127, { color: 'aguamarina', t: (t * 1.3) % 1 });
  for (let k = 0; k < NB; k++) { const tk = t - B0 - k * 0.1; if (tk < 0 || tk > 0.25) continue; const [x, y] = vuelo(k, tk); PZ.bono(R, Math.round(x), Math.round(y), {}); }
  cajaAcero(140, 120, 66, 17, abre, 204);
  if (llave) { const g = Math.floor(t * 6) % 2; R.rect(141, 128 + g, 146, 128 + g, Q.latonL); R.rect(139, 127, 141, 130, Q.laton); }
  // Preiss gira la llave, levanta la tapa y da un respingo
  const dt = t - B0, sal = sale ? Math.max(0, Math.round(5 * Math.abs(Math.sin(dt * 8)) * Math.max(0, 1 - dt * 1.1))) : 0, px = sale ? Math.round(lerp(116, 104, lin(dt, 0, 0.35))) : 116, caza = t > B0 + 1.5;
  const p = R.actor(EL.preissMayor, px, 160, t, { dir: 1, sostiene: caza ? [px + 16, 130] : sale ? undefined : [138, abre > 0 ? Math.round(lerp(130, 122, abre)) : 130], sorpresa: sale && !caza, sonrisa: caza, brazos: sale && dt > 0.45 && !caza, salto: sal });
  // el empleado, que esperaba, caza uno al vuelo
  const ec = t > B0 + 1.15; const e = R.actor(EL.empleadoBancoCF, 262, 161, t, { dir: -1, sostiene: ec ? [260, 132] : undefined, sorpresa: sale && !ec, sonrisa: ec, salto: sale && !ec ? Math.round(2 * Math.abs(Math.sin(dt * 10))) : 0 });
  // los bonos al vuelo
  for (let k = 0; k < NB; k++) { const tk = t - B0 - k * 0.1; if (tk < 0.25) continue; if (k === 3 && ec) { PZ.bono(R, e.mano[0] - 6, e.mano[1] + 2, {}); continue; } if (k === 6 && caza) { PZ.bono(R, p.mano[0] + 6, p.mano[1] + 2, {}); continue; }
    const [x, y, enSuelo] = vuelo(k, tk); if (enSuelo) sombra(Math.round(x), Math.round(y), 10, 0.2); PZ.bono(R, Math.round(x), Math.round(y - (enSuelo ? 0 : Math.abs(Math.sin(tk * 6 + k)) * 2)), { dir: enSuelo || Math.sin(tk * 5 + k * 2) > 0 ? 1 : -1 }); }
  if (sale && dt < 0.5) for (let k = 0; k < 6; k++) { const a = -Math.PI * (0.2 + 0.12 * k), r = 8 + dt * 60; chispa(Math.round(172 + Math.cos(a) * r), Math.round(116 + Math.sin(a) * r), 1 - dt * 2, Q.oroL); }
  if (sale && dt > 0.15 && dt < 1.3) R.icono('!', px + 5, 118 - sal, Q.oro, Q.k, 2);
};

// 3 · la mesa de cerca: el bono en la mano y los 25.000
const bonoGrande = (x0, y0) => { const w = 108, hh = 62;
  R.rect(x0 + 3, y0 + 4, x0 + w + 3, y0 + hh + 4, X('#12261e')); caja(x0, y0, x0 + w, y0 + hh, Q.bono, Q.k);
  for (let y = y0 + 1; y < y0 + hh; y++) for (let x = x0 + 1; x < x0 + w; x++) { const b = Math.min(x - x0, x0 + w - x, y - y0, y0 + hh - y), g = (Math.sin((x - x0) * 0.5) + Math.sin((y - y0) * 0.6 + (x - x0) * 0.12)) > 1.1;
    R.pset(x, y, b <= 1 ? Q.bonoL : b <= 4 ? (((x + y) & 1) ? Q.bonoD : Q.verde) : b === 5 ? Q.bonoD : g ? Q.bonoS : (h(x, y, 31) < 0.06 ? Q.bonoL : Q.bono)); }
  // el sello del centro (un águila no: un roble), las rayas y las cifras de las esquinas
  const cx = x0 + 54, cy = y0 + 30; R.disco(cx, cy, 15, Q.bonoD); R.disco(cx, cy, 13, Q.bonoL); R.disco(cx, cy, 11, Q.verde); for (let k = 0; k < 16; k++) R.pset(Math.round(cx + Math.cos(k * Math.PI / 8) * 12), Math.round(cy + Math.sin(k * Math.PI / 8) * 12), Q.bonoD);
  R.disco(cx, cy - 3, 6, Q.verdeD); R.disco(cx - 3, cy - 4, 3, Q.verdeS); R.disco(cx + 3, cy - 2, 3, Q.verdeS); R.rect(cx - 1, cy + 2, cx, cy + 8, Q.verdeD); R.rect(cx - 4, cy + 8, cx + 4, cy + 8, Q.verdeD);
  for (const [a, n] of [[x0 + 10, 5], [x0 + 74, 5]]) for (let k = 0; k < n; k++) R.rect(a, y0 + 21 + k * 4, a + 14 + Math.floor(h(k, a, 3) * 10), y0 + 21 + k * 4, Q.bonoD);
  R.rect(x0 + 10, y0 + 46, x0 + 34, y0 + 46, Q.tinta); R.rect(x0 + 74, y0 + 46, x0 + 98, y0 + 46, Q.tinta); for (let i = 0; i < 20; i++) R.pset(x0 + 76 + i, y0 + 44 + Math.round(Math.sin(i * 1.1) * 1.4), Q.azulS);
  for (const [a, b] of [[x0 + 11, y0 + 16], [x0 + 71, y0 + 16], [x0 + 11, y0 + 56], [x0 + 71, y0 + 56]]) R.numero('1000', a, b, { color: Q.verdeD, sombra: false });
};
const bonito = (x, y, k) => { const d = (k % 3) - 1; R.rect(x - 14, y - 8, x + 14, y + 8, Q.k); R.rect(x - 13, y - 7, x + 13, y + 7, Q.bono); R.rect(x - 13, y - 7, x + 13, y - 7, Q.bonoL); R.rect(x - 11, y - 5, x + 11, y + 5, Q.bonoD); R.rect(x - 10, y - 4, x + 10, y + 4, Q.bono); R.disco(x + d, y, 3, Q.verde); R.rect(x - 9, y - 2, x - 5, y - 2, Q.bonoD); R.rect(x + 5, y + 2, x + 9, y + 2, Q.bonoD); };
const fondoMesa = () => capa('mesa', () => {
  empapelado(60, 32); friso(61, 111, 80); R.rect(0, 112, 319, 113, Q.k);
  // el tablero de caoba y el vade de cuero verde con filete de latón
  madera(0, 114, 319, 179, [Q.nog0, Q.nog1, Q.nog2, Q.nog3], { tabla: 22, base: 1.7 }); R.rect(0, 114, 319, 115, Q.nog4);
  R.poligono([[30, 122], [290, 122], [312, 179], [8, 179]], Q.k); R.poligono([[32, 124], [288, 124], [309, 179], [11, 179]], (x, y) => ((x * 7 + y * 13) % 11 === 0 ? Q.tapeteL : (x * 5 + y * 3) % 9 === 0 ? Q.tapeteS : Q.tapete));
  R.linea(36, 127, 284, 127, Q.laton); R.linea(36, 127, 16, 179, Q.latonS); R.linea(284, 127, 304, 179, Q.latonS);
  // la caja de acero abierta, a la izquierda, con su forro
  R.poligono([[0, 104], [50, 104], [56, 60], [0, 60]], Q.k); R.poligono([[0, 102], [48, 102], [53, 63], [0, 63]], (x, y) => ((x + y * 2) % 10 === 0 ? Q.vinoL : (x - y * 2 + 400) % 10 === 0 ? Q.vinoD : Q.vino)); R.linea(0, 62, 54, 62, Q.aceroL);
  R.rect(0, 103, 52, 132, Q.k); R.rect(0, 104, 51, 131, Q.acero); R.rect(0, 104, 51, 106, Q.aceroL); R.rect(0, 127, 51, 131, Q.aceroS); for (let i = 0; i < 14; i++) { const x = Math.floor(h(i, 1, 43) * 44), y = 109 + Math.floor(h(i, 2, 43) * 16); R.rect(x, y, x + 4, y, i % 2 ? Q.aceroL : Q.aceroS); }
  R.rect(8, 110, 38, 124, Q.k); R.rect(9, 111, 37, 123, Q.laton); R.rect(9, 111, 37, 111, Q.latonL); R.numero('204', 13, 121, { color: X('#3a2a10'), sombra: false });
  // la lámpara de banquero, el tintero y la pluma
  R.rect(262, 118, 300, 124, Q.k); R.rect(263, 119, 299, 121, Q.latonL); R.rect(263, 122, 299, 123, Q.laton); R.rect(279, 90, 283, 118, Q.k); R.rect(280, 90, 281, 118, Q.latonL); R.rect(282, 90, 282, 118, Q.latonS);
  R.poligono([[250, 92], [312, 92], [304, 72], [258, 72]], Q.k); R.poligono([[252, 90], [310, 90], [303, 74], [259, 74]], Q.verde); R.rect(260, 75, 302, 77, Q.verdeL); R.rect(254, 88, 308, 90, Q.verdeS); R.rect(296, 93, 297, 100, Q.laton); R.disco(296, 101, 1, Q.latonL);
  caja(222, 106, 238, 120, Q.grisD); R.rect(223, 107, 237, 108, Q.gris); R.rect(226, 103, 234, 106, Q.k); R.rect(227, 104, 233, 105, Q.laton); R.linea(232, 103, 246, 84, Q.k); R.linea(233, 103, 247, 84, Q.azulS);
  // la tarjeta de firmas y la llave con su etiqueta
  R.poligono([[60, 160], [96, 156], [100, 174], [64, 178]], Q.k); R.poligono([[62, 161], [95, 158], [98, 173], [65, 176]], Q.papel); for (let k = 0; k < 4; k++) R.linea(66, 164 + k * 3, 86 + (k % 2) * 6, 162 + k * 3, Q.tintaL);
});
const p3 = (t) => {
  fondoMesa();
  halo(281, 110, 46, Q.calido, 0.34 + Math.sin(t * 8) * 0.02); T.motas(R, t, 120, 300, 20, 110, 8, Q.calido);
  PZ.llave(R, 128, 174, { s: 2 });
  // los que siguen cayendo se van posando en el montón de la derecha
  const cae = (k) => te(8.7) + k * 0.42, N = 9; let pila = 0;
  for (let k = 0; k < N; k++) if (t > cae(k) + 0.9) pila++;
  sombra(182, 162, 20, 0.3);
  for (let k = 0; k < 3 + pila; k++) bonito(182 + ((k * 5) % 7) - 3, 160 - k * 3, k);
  // otros dos, sueltos sobre el vade
  bonito(120, 146, 1); bonito(262, 150, 2);
  for (let k = 0; k < N; k++) { const u = (t - cae(k)) / 0.9; if (u < 0 || u >= 1) continue; const x = 182 + (h(k, 1, 17) - 0.5) * 60 * (1 - u) + Math.sin(u * 7 + k) * 10 * (1 - u), y = lerp(40, 160 - (3 + k) * 3, u * u * 0.4 + u * 0.6); bonito(Math.round(x), Math.round(y), k); }
  // el bono en la mano de Preiss
  const bob = Math.round(Math.sin(t * 2.2) * 2), tiem = t < te(9.9) ? Math.round(Math.sin(t * 30) * 1) : 0, bx = 34 + tiem, by = 42 + bob;
  bonoGrande(bx, by);
  T.brazo(R, 0, 132, bx + 5, by + 63, MANGA_P, 1, { codo: [16, 122] });
  // la cifra, que sube hasta 25.000
  const n = Math.round(25000 * lin(t, te(8.62), te(9.85)) / 500) * 500, hecho = n >= 25000, txt = '$' + n.toLocaleString('en-US');
  R.numero(txt, 216, 66 - (hecho && t < te(10.3) ? Math.round(Math.abs(Math.sin((t - te(9.85)) * 12)) * 3) : 0), { tam: 16, centro: true });
  if (hecho) for (let k = 0; k < 3; k++) { const u = (t * 1.4 + k * 0.33) % 1; chispa(166 + k * 46, 46 + (k % 2) * 24, u < 0.5 ? u * 2 : 2 - u * 2, Q.oroL); }
  // «un tesoro perdido propio»: la mano de Zinn acerca la aguamarina
  const uz = sube(lin(t, te(11.75), te(12.7))); if (uz > 0) { const hx = Math.round(lerp(336, 236, uz)), hy = Math.round(140 + Math.sin(t * 2.6) * 1.5), toca = t > te(13.1);
    T.brazo(R, hx + 44, hy + 38, hx + 14, hy, MANGA_Z, -1, { codo: [hx + 36, hy + 14] });
    PZ.piedra(R, hx + 2, hy - 2, { color: 'aguamarina', s: 2, t: (t * 1.2) % 1 });
    if (toca) for (let k = 0; k < 4; k++) { const u = ((t - te(13.1)) * 1.6 + k * 0.25) % 1; chispa(Math.round(hx + 2 + Math.cos(k * 1.7 + 0.4) * (10 + u * 10)), Math.round(hy - 14 + Math.sin(k * 1.7 + 0.4) * (8 + u * 8)), 1 - u, k % 2 ? Q.bl : Q.cian); } }
};
const efectos = [[te(2.7), 'brillo'], [te(4.75), 'cerrojo'], [te(5.4), 'toc'], [B0, 'whoosh'], [B0 + 0.35, 'papel'], [B0 + 0.45, 'boing'], [B0 + 1.2, 'papel'], [te(8.75), 'papel'], [te(9.85), 'sello'], [te(10.9), 'papel'], [te(13.1), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2004 });
''')

E['cf-adios'] = ('Adiós a Byron Preiss', '''// CF-ADIOS (frases 18–19), 2005, sin cartela. CON RESPETO: solo el hecho; ni coche ni accidente. Cuatro planos:
// 1. A editorial/estudio (o.epoca 2005, atardecer): la editorial vacía; el cartero entra con una carta, se para ante el
//    escritorio vacío («died»), baja la cabeza y se va despacio con la carta; la luz cae; el año pasa de 2004 a 2005;
// 2. LOCAL el mapa de la pared (T.mapa reducido, enmarcado en el ladrillo) y, delante, la mesa con la libreta en blanco,
//    las gafas, la pluma y el reloj de arena ya caído: las nueve chinchetas que faltan se apagan una a una como velas
//    («the nine remaining boxes») y la libreta pasa hojas en blanco («never written down»);
// 3. [familia] LOCAL el portal de la editorial desde la calle, meses después: mudanza («went bankrupt»): bajan el rótulo
//    del libro, cargan cajas en el camión, pasa un taxi; en «But his family» salen la viuda y las hijas con la caja;
// 4. A editorial/banco/caja: la hija mayor deja la última piedra (quedan diez), la viuda baja la tapa con cuidado
//    («honor the rules») y el bocadillo lo dice: quien encuentre un cofre, se lleva su piedra (cofre → piedra).''', HELP + r'''
const ta = (s) => en('adios', (s - 0.9) / 11.879), tf = (s) => en('familia', (s - 13.813) / 8.98);
const P2 = ta(7.0), P3 = ta(12.92), P4 = tf(17.42);

// 1 · la editorial vacía, al atardecer
const p1 = (t) => {
  const o = { encuadre: 'estudio', epoca: 2005 }; T.editorial(R, t, o);
  const died = ta(3.6), u1 = lin(t, ta(0.5), ta(3.3)), u2 = lin(t, ta(5.3), P2 + 0.4), vuelve = t > ta(5.3);
  const cx = vuelve ? Math.round(lerp(204, 300, u2)) : Math.round(lerp(326, 204, u1)), para = u1 >= 1 && !vuelve;
  const c = R.actor(EL.carteroCF, cx, 148, t, { dir: vuelve ? 1 : -1, anda: (u1 > 0 && u1 < 1) || (vuelve && u2 < 1), sostiene: true, triste: t > died - 0.2, quieto: false });
  PZ.sobre(R, c.mano[0] + (vuelve ? 3 : -3), c.mano[1] + 4, {});
  T.editorialDelante(R, t, o);
  // la luz se va
  T.tinte(R, 0, 179, [26, 20, 48], 0.26 * lin(t, died - 0.4, P2));
};

// 2 · el mapa de la pared y la libreta en blanco
const W = [24, 24, 232, 130];
const LAD_T = [X('#7a5c50'), X('#96705e'), X('#b08872'), X('#c49c84')];
const muro = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor(y / 6), xx = x + (f % 2) * 7, junta = y % 6 === 5 || xx % 14 === 13, cal = (y < 17 && x < 178) || (x > 266 && y < 52); const v = 1.7 + (h(Math.floor(xx / 14), f, 3) - 0.5) * (cal ? 0.3 : 1.2) + (h(x, y, 5) - 0.5) * 0.3 - y / 138 * 0.7; R.pset(x, y, junta ? (cal ? LAD_T[1] : LAD_T[0]) : tono(LAD_T, v, x, y)); } };
const fondoPared = () => capaEncima('pared', () => {
  muro(0, 0, 319, W[1] - 1); muro(0, W[3] + 1, 319, 139); muro(0, W[1], W[0] - 1, W[3]); muro(W[2] + 1, W[1], 319, W[3]);
  // el marco del mapa
  for (let k = 1; k <= 5; k++) { const c = k === 5 ? Q.k : k === 1 ? Q.k : k === 4 ? Q.nog4 : k === 2 ? Q.nog1 : Q.nog2; R.rect(W[0] - k, W[1] - k, W[2] + k, W[1] - k, c); R.rect(W[0] - k, W[3] + k, W[2] + k, W[3] + k, c); R.rect(W[0] - k, W[1] - k, W[0] - k, W[3] + k, c); R.rect(W[2] + k, W[1] - k, W[2] + k, W[3] + k, c); }
  for (let x = W[0] - 5; x <= W[2] + 5; x++) tin(x, W[3] + 6, Q.k, 0.35), tin(x, W[3] + 7, Q.k, 0.18);
  // el perchero con su chaqueta de pana y la bufanda
  R.rect(244, 58, 276, 61, Q.k); R.rect(245, 59, 275, 60, Q.nog3); for (const x of [250, 262, 272]) { R.rect(x, 61, x + 1, 65, Q.k); R.pset(x, 65, Q.laton); }
  R.poligono([[254, 64], [270, 64], [276, 74], [275, 112], [249, 112], [248, 74]], Q.k); R.poligono([[255, 66], [269, 66], [274, 75], [273, 110], [251, 110], [250, 75]], (x, y) => (x % 3 === 0 ? X('#524232') : X('#6e5a48'))); R.rect(261, 66, 263, 110, X('#3e3024')); R.rect(259, 66, 260, 80, X('#8a7460')); R.rect(264, 66, 265, 80, X('#8a7460')); for (const y of [84, 94, 104]) R.pset(264, y, Q.laton);
  for (let y = 62; y < 104; y++) { const x = 249 + Math.round(Math.sin(y * 0.2)); R.rect(x - 2, y, x + 1, y, (y >> 2) & 1 ? Q.vino : Q.vinoL); R.pset(x - 3, y, Q.k); R.pset(x + 2, y, Q.k); } for (let i = 0; i < 4; i++) R.rect(246 + i, 104, 246 + i, 107, i % 2 ? Q.vino : Q.vinoL);
  // uno de nuestros cuadros, pequeño, y el interruptor
  PZ.cuadro(R, 298, 100, { n: 3 }); R.rect(283, 118, 289, 127, Q.k); R.rect(284, 119, 288, 126, Q.papel); R.rect(286, 121, 286, 123, Q.grisS);
  // la mesa de nogal
  madera(0, 142, 319, 179, [Q.nog0, Q.nog1, Q.nog2, Q.nog3], { tabla: 13, base: 1.5 }); R.rect(0, 140, 319, 141, Q.k); R.rect(0, 142, 319, 143, Q.nog4);
  // la lámpara de brazo (apagada), a la izquierda
  R.rect(6, 150, 30, 156, Q.k); R.rect(7, 151, 29, 153, Q.grisL); R.rect(7, 154, 29, 155, Q.gris); R.linea(18, 150, 12, 120, Q.k); R.linea(19, 150, 13, 120, Q.grisL); R.linea(12, 120, 36, 108, Q.k); R.linea(12, 121, 36, 109, Q.grisL); R.poligono([[30, 104], [48, 100], [56, 116], [38, 122]], Q.k); R.poligono([[32, 106], [47, 102], [53, 115], [39, 120]], Q.verdeS); R.linea(33, 107, 46, 104, Q.verde);
  // la taza fría y las gafas plegadas
  caja(52, 147, 66, 163, Q.azulS); R.rect(53, 148, 65, 149, Q.azulL); R.rect(53, 150, 54, 162, Q.azul); R.rect(66, 151, 70, 158, Q.k); R.rect(67, 152, 68, 157, Q.azulS); R.rect(54, 148, 64, 148, X('#3a2a20'));
  for (const cx of [92, 108]) { R.disco(cx, 165, 6, Q.k); R.disco(cx, 165, 5, X('#9cb4c4')); R.disco(cx, 165, 4, X('#c4d8e4')); R.pset(cx - 2, 163, Q.bl); R.pset(cx - 1, 162, Q.bl); } R.rect(98, 164, 102, 165, Q.k); R.linea(86, 163, 80, 157, Q.k); R.linea(114, 163, 122, 158, Q.k);
  // la pluma, con su capuchón al lado
  R.linea(122, 172, 150, 166, Q.k); R.linea(122, 171, 150, 165, Q.azulS); R.linea(124, 170, 146, 165, Q.azul); R.rect(120, 171, 122, 173, Q.laton); R.rect(150, 164, 153, 166, Q.laton); R.rect(134, 175, 144, 177, Q.k); R.rect(135, 175, 143, 176, Q.azulS);
  // el reloj de arena, ya caído
  R.rect(288, 144, 304, 146, Q.k); R.rect(289, 144, 303, 145, Q.laton); R.rect(288, 170, 304, 172, Q.k); R.rect(289, 170, 303, 171, Q.laton); R.poligono([[290, 147], [302, 147], [297, 158], [302, 169], [290, 169], [295, 158]], Q.k); R.poligono([[292, 148], [300, 148], [296, 157], [300, 168], [292, 168], [296, 159]], X('#cfe6f0')); R.poligono([[293, 168], [299, 168], [296, 163]], Q.oro); R.rect(292, 167, 300, 168, Q.oroS); R.pset(293, 149, Q.bl);
});
const libreta = (t, pasa) => {
  // abierta, en blanco: dos hojas con sus renglones azules sin una sola nota
  R.poligono([[166, 149], [274, 149], [282, 178], [156, 178]], X('#241a14')); R.poligono([[168, 147], [272, 147], [279, 175], [159, 175]], Q.k);
  R.poligono([[169, 148], [219, 148], [218, 174], [161, 174]], Q.papel); R.poligono([[221, 148], [271, 148], [277, 174], [220, 174]], Q.bl);
  for (let k = 0; k < 6; k++) { const y = 152 + k * 4; R.linea(170 - k, y, 216, y, X('#b8cce0')); R.linea(223, y, 270 + k, y, X('#b8cce0')); }
  R.rect(219, 148, 220, 174, Q.papelD); R.linea(206, 148, 204, 178, Q.rojo); R.linea(207, 148, 205, 178, Q.rojoS);
  for (let y = 149; y < 174; y += 3) { R.pset(219, y, Q.grisD); R.pset(220, y, Q.gris); }
  if (pasa > 0 && pasa < 1) { const a = Math.PI * pasa, ex = Math.round(220 + Math.cos(a) * 54), ey = Math.round(Math.sin(a) * 22); R.poligono([[220, 148], [ex, 148 - ey], [ex + (ex > 220 ? 6 : -8), 174 - ey], [220, 174]], Q.k); R.poligono([[221, 149], [ex, 149 - ey], [ex + (ex > 220 ? 5 : -7), 173 - ey], [221, 173]], pasa < 0.5 ? Q.bl : Q.papel); }
};
const ORDEN = ['sanFrancisco', 'houston', 'nuevaOrleans', 'milwaukee', 'sanAgustin', 'charleston', 'roanoke', 'nuevaYork', 'montreal'];
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 0.78, centro: [-84.5, 34.6], vida: false, rosa: false });
  fondoPared();
  // el último sol cruza la pared y se va
  { const f = 0.16 * (1 - lin(t, P2, P3 - 0.3)), dx = Math.round((t - P2) * 3); for (let y = 20; y < 140; y++) for (let x = 60 + dx + ((y - 20) >> 1); x < 150 + dx + ((y - 20) >> 1); x++) if (x < 320) tin(x, y, Q.calidoS, f * (((x + y) & 1) ? 1 : 0.7)); }
  T.motas(R, t, 30, 230, 30, 138, 8, Q.calido);
  R.recorte(W);
  // las encontradas (Chicago y Cleveland), al final, para que queden encima de sus vecinas; la de Milwaukee, ladeada
  [...T.F_CIUDADES].sort((a, b) => (a[0] === 'chicago' || a[0] === 'cleveland') - (b[0] === 'chicago' || b[0] === 'cleveland')).forEach(([n, lon, lat], k) => {
    const [x0, y0] = P([lon, lat]).map(Math.round), x = x0 - (n === 'milwaukee' ? 6 : 0), y = y0 - (n === 'milwaukee' ? 4 : 0), hall = n === 'chicago' || n === 'cleveland', i = ORDEN.indexOf(n), tk = ta(8.8) + i * 0.4, off = i >= 0 && t > tk;
    R.linea(x0, y0, x, y - 4, Q.k); R.linea(x0 + 1, y0, x + 1, y - 3, Q.grisS);
    if (off) { R.disco(x, y - 7, 3, Q.k); R.disco(x, y - 7, 2, Q.grisS); R.pset(x - 1, y - 8, Q.gris); const u = (t - tk) / 1.1; if (u < 1) { R.recorte(null); for (let j = 0; j < 6; j++) { const yy = Math.round(y - 11 - u * 14 - j * 2), xx = Math.round(x + Math.sin(u * 6 + j * 0.9) * 2.5); tin(xx, yy, Q.bl, 0.8 * (1 - u)); tin(xx + 1, yy, Q.bl, 0.5 * (1 - u)); } R.recorte(W); } }
    else { const c = hall ? Q.verdeL : Q.oro, f = 0.62 + Math.sin(t * 7 + k * 2) * 0.14; R.recorte(null); halo(x, y - 7, 10, hall ? Q.verdeL : Q.oroL, f); R.recorte(W); R.disco(x, y - 7, 3, Q.k); R.disco(x, y - 7, 2, c); R.rect(x - 1, y - 8, x, y - 8, Q.bl); if (!hall && Math.sin(t * 5 + k * 1.7) > 0.5) chispa(x, y - 7, 0.5, Q.oroL); if (hall) { R.linea(x + 4, y - 9, x + 6, y - 7, Q.k); R.linea(x + 6, y - 7, x + 10, y - 13, Q.k); R.linea(x + 4, y - 10, x + 6, y - 8, Q.verdeL); R.linea(x + 6, y - 8, x + 10, y - 14, Q.verdeL); } }
  });
  R.recorte(null);
  const pasa = (t - ta(10.62)) / 0.55, pasa2 = (t - ta(11.4)) / 0.55;
  libreta(t, pasa > 0 && pasa < 1 ? pasa : pasa2);
  // se hace de noche
  T.tinte(R, 0, 179, [22, 18, 46], 0.04 + 0.2 * lin(t, P2 + 1.5, P3));
};

// 3 · el portal, meses después: la mudanza
const LADR = [Q.rl0, Q.rl1, Q.rl2, Q.rl3];
const ventana = (x0, y0, x1, y1, dentro) => { R.rect(x0 - 3, y0 - 5, x1 + 3, y0 - 2, Q.k); R.rect(x0 - 2, y0 - 4, x1 + 2, y0 - 3, Q.hor3); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, Q.k); R.rect(x0, y0, x1, y1, X('#2c3448'));
  dentro(); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x - y + 400) % 23 < 3) tin(x, y, Q.bl, 0.22);
  const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1; R.rect(mx, y0, mx, y1, Q.hor3); R.rect(x0, my, x1, my, Q.hor3); R.rect(x0 - 3, y1 + 2, x1 + 3, y1 + 4, Q.k); R.rect(x0 - 2, y1 + 2, x1 + 2, y1 + 3, Q.hor2); };
const cajaCarton = (x, y, w, hh, k = 0) => { R.rect(x, y - hh, x + w, y, Q.k); R.rect(x + 1, y - hh + 1, x + w - 1, y - 1, Q.pino1); R.rect(x + 1, y - hh + 1, x + w - 1, y - hh + 2, Q.pino3); R.rect(x + w - 2, y - hh + 3, x + w - 1, y - 1, Q.pino0); R.rect(x + 1, y - hh + Math.round(hh * 0.4), x + w - 1, y - hh + Math.round(hh * 0.4), Q.papelD); const cx = x + (w >> 1), cy = y - 4;
  if (k % 3 === 0) { R.rect(cx, cy - 4, cx, cy, Q.nog0); R.pset(cx - 1, cy - 3, Q.nog0); R.pset(cx + 1, cy - 3, Q.nog0); } else if (k % 3 === 1) { R.rect(cx - 2, cy - 4, cx + 2, cy - 3, Q.nog0); R.rect(cx, cy - 2, cx, cy - 1, Q.nog0); R.rect(cx - 1, cy, cx + 1, cy, Q.nog0); } else { R.rect(cx - 3, cy - 3, cx + 3, cy - 3, Q.nog0); R.rect(cx - 3, cy - 1, cx + 1, cy - 1, Q.nog0); } };
const fondoPortal = () => capa('portal', () => {
  // la fachada de ladrillo rojo y el zócalo de piedra
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 5), xx = x + (f % 2) * 6, junta = y % 5 === 4 || xx % 12 === 11, cal = (y < 17 && x < 178) || (x > 266 && y < 52); const v = 1.6 + (h(Math.floor(xx / 12), f, 13) - 0.5) * (cal ? 0.3 : 1.5) + (h(x, y, 15) - 0.5) * 0.3 - y / 122 * 0.4; R.pset(x, y, junta ? (cal ? LADR[1] : LADR[0]) : tono(LADR, v, x, y)); }
  for (let y = 122; y < 140; y++) for (let x = 0; x < 320; x++) { const jt = y === 122 || y === 130 || (x + (y > 130 ? 20 : 0)) % 40 === 0; R.pset(x, y, jt ? Q.hor0 : tono([Q.hor0, Q.hor1, Q.hor2, Q.hor3], 2 + (h(x >> 1, y, 19) - 0.5) * 1.4 - (y - 122) / 30, x, y)); }
  // las ventanas del primer piso (asoman por arriba) y las de la planta baja, con cajas y estantes vacíos dentro
  for (const x of [14, 172]) ventana(x, 22, x + 42, 40, () => { R.rect(x + 4, 30, x + 14, 40, Q.pino0); R.rect(x + 26, 34, x + 38, 40, Q.pino0); });
  ventana(14, 64, 56, 104, () => { for (const y of [76, 88, 100]) R.rect(15, y, 55, y, Q.nog1); R.rect(20, 92, 30, 100, Q.pino0); R.rect(21, 93, 29, 94, Q.pino2); R.rect(40, 70, 46, 76, Q.vinoS); });
  ventana(172, 64, 214, 104, () => { R.rect(176, 86, 192, 104, Q.pino0); R.rect(177, 87, 191, 89, Q.pino2); R.rect(194, 92, 210, 104, Q.pino1); R.rect(180, 76, 190, 86, Q.pino1); R.linea(204, 66, 208, 92, Q.nog2); R.linea(200, 66, 196, 92, Q.nog2); });
  // el portal de piedra con su número, la puerta verde de dos hojas y el aviso con su X
  R.rect(84, 44, 156, 139, Q.k); for (let y = 45; y < 139; y++) for (let x = 85; x <= 155; x++) R.pset(x, y, (y - 45) % 12 === 11 ? Q.hor0 : tono([Q.hor1, Q.hor2, Q.hor3], 1.2 + (h(x >> 1, y, 23) - 0.5) * 1.2, x, y));
  R.poligono([[80, 44], [160, 44], [156, 38], [84, 38]], Q.k); R.poligono([[82, 43], [158, 43], [155, 39], [85, 39]], Q.hor3);
  R.rect(94, 54, 146, 139, Q.k); R.rect(95, 55, 145, 68, X('#2c3448')); for (let x = 95; x <= 145; x++) for (let y = 55; y <= 68; y++) if ((x - y + 400) % 19 < 3) tin(x, y, Q.bl, 0.2); R.numero('24', 114, 66, { color: Q.latonL, sombra: false });
  R.rect(95, 69, 145, 70, Q.k);
  for (const x of [95, 121]) { R.rect(x, 71, x + 24, 139, Q.bot1); R.rect(x, 71, x + 1, 139, Q.bot3); R.rect(x + 23, 71, x + 24, 139, Q.bot0); R.rect(x + 4, 75, x + 20, 104, Q.k); R.rect(x + 5, 76, x + 19, 103, X('#34405a')); for (let y = 76; y <= 103; y++) for (let i = x + 5; i <= x + 19; i++) if ((i - y + 400) % 17 < 2) tin(i, y, Q.bl, 0.25); R.rect(x + 4, 110, x + 20, 133, Q.bot0); R.rect(x + 5, 111, x + 19, 132, Q.bot2); R.rect(x + 6, 112, x + 18, 131, Q.bot1); }
  R.rect(120, 71, 120, 139, Q.k); R.rect(116, 106, 118, 109, Q.laton); R.rect(122, 106, 124, 109, Q.laton);
  R.rect(126, 80, 138, 96, Q.k); R.rect(127, 81, 137, 95, Q.bl); R.linea(129, 84, 135, 90, Q.rojo); R.linea(135, 84, 129, 90, Q.rojo); R.rect(129, 92, 135, 92, Q.tintaL); R.rect(129, 94, 133, 94, Q.tintaL);
  // la placa de latón con sus rayas (sin letras), el farol y el timbre
  caja(66, 86, 80, 104, Q.laton); R.rect(67, 87, 79, 87, Q.latonL); for (let k = 0; k < 4; k++) R.rect(69, 91 + k * 3, 77 - (k % 2) * 2, 91 + k * 3, Q.latonS);
  R.rect(160, 84, 164, 92, Q.k); R.rect(161, 85, 163, 91, Q.laton); R.pset(162, 88, Q.rojo);
  R.rect(72, 58, 78, 60, Q.k); R.rect(73, 61, 77, 70, Q.k); R.rect(74, 62, 76, 69, X('#cfd6c0')); R.rect(72, 71, 78, 72, Q.k);
  // la escalera de dos peldaños
  R.rect(86, 136, 154, 139, Q.k); R.rect(87, 136, 153, 137, Q.hor3); R.rect(87, 138, 153, 139, Q.hor1); R.rect(80, 140, 160, 144, Q.k); R.rect(81, 140, 159, 141, Q.hor3); R.rect(81, 142, 159, 143, Q.hor1);
  // la acera de losas, el bordillo y el asfalto
  for (let y = 140; y < 164; y++) for (let x = 0; x < 320; x++) { if (y < 145 && x >= 80 && x <= 160) continue; const jt = (y - 140) % 12 === 0 || (x + (((y - 140) / 12) | 0) * 13) % 34 === 0; R.pset(x, y, jt ? Q.hor0 : tono([Q.hor1, Q.hor2, Q.hor3], 1.3 + (h(x >> 1, y >> 1, 29) - 0.5) * 1.6 - (y - 140) / 40, x, y)); }
  R.rect(0, 164, 319, 166, Q.hor3); R.rect(0, 167, 319, 167, Q.k);
  for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x, y, 31) < 0.1 ? X('#4a4c58') : h(x >> 2, y, 33) < 0.12 ? X('#2e3038') : X('#3a3c46'));
  for (let x = 6; x < 320; x += 46) R.rect(x, 175, x + 20, 176, Q.oroS);
  R.rect(34, 170, 58, 173, X('#2a2c34')); R.rect(36, 171, 56, 172, X('#50525e'));
  // el árbol de la acera (otoño) en su alcorque, la boca de riego y el poste con su señal (una flecha)
  R.rect(22, 150, 46, 154, Q.k); R.rect(23, 151, 45, 153, Q.tierraS); for (let x = 24; x < 45; x += 3) R.pset(x, 152, Q.tierraL);
  for (let y = 60; y < 152; y++) { const w = y > 140 ? 4 : 3, x = 33 + Math.round(Math.sin(y * 0.07) * 2); R.rect(x - w, y, x + w, y, Q.k); R.rect(x - w + 1, y, x + w - 1, y, Q.nog1); R.pset(x - w + 1, y, Q.nog3); if (y % 7 === 0) R.pset(x, y, Q.nog0); }
  for (const [a, L, y0] of [[-2.2, 26, 76], [-0.9, 24, 70], [-1.5, 22, 60], [-2.7, 18, 92], [-0.5, 16, 88]]) for (let i = 0; i < L; i++) { const x = Math.round(33 + Math.cos(a) * i), y = Math.round(y0 + Math.sin(a) * i * 0.8); R.pset(x, y, Q.k); R.pset(x, y + 1, Q.nog1); if (i > 6 && h(i, L, 37) < 0.5) { const c = [Q.naranja, Q.oro, Q.rojoL][i % 3]; R.rect(x - 1, y - 2, x + 1, y - 1, c); R.pset(x + 2, y - 2, Q.oroS); } }
  R.rect(196, 148, 202, 162, Q.k); R.rect(197, 149, 201, 161, Q.rojo); R.rect(197, 149, 198, 161, Q.rojoL); R.rect(195, 152, 203, 154, Q.k); R.rect(196, 153, 202, 153, Q.rojoS); R.rect(198, 146, 200, 148, Q.k);
});
const taxi = (x, y) => { R.rect(x + 6, y - 15, x + 34, y - 9, Q.k); R.rect(x + 7, y - 14, x + 33, y - 9, Q.oro); R.rect(x + 9, y - 13, x + 18, y - 9, X('#9cc4dc')); R.rect(x + 21, y - 13, x + 31, y - 9, X('#9cc4dc')); R.rect(x + 16, y - 18, x + 24, y - 16, Q.k); R.rect(x + 17, y - 17, x + 23, y - 17, Q.bl);
  R.rect(x, y - 9, x + 44, y - 2, Q.k); R.rect(x + 1, y - 8, x + 43, y - 3, Q.oro); R.rect(x + 1, y - 8, x + 43, y - 8, Q.oroL); for (let i = x + 4; i < x + 40; i += 4) R.rect(i, y - 6, i + 1, y - 5, Q.k); R.rect(x + 42, y - 7, x + 43, y - 6, Q.bl); R.rect(x + 1, y - 7, x + 1, y - 6, Q.rojo);
  for (const w of [x + 9, x + 35]) { R.disco(w, y - 2, 4, Q.k); R.disco(w, y - 2, 2, Q.gris); } };
const camion = (t) => { // el camión de mudanzas, aparcado junto al bordillo: la caja abierta por detrás, hacia la puerta
  sombra(276, 170, 48, 0.35);
  R.rect(228, 88, 319, 160, Q.k); R.rect(229, 89, 319, 159, X('#e8e2d0')); R.rect(229, 89, 319, 91, Q.bl); R.rect(229, 150, 319, 159, X('#c4bca4')); for (let x = 250; x < 320; x += 22) R.rect(x, 92, x, 149, X('#cfc8b4'));
  R.rect(232, 94, 262, 154, Q.k); R.rect(233, 95, 261, 153, X('#2a2630')); cajaCarton(236, 153, 14, 12, 0); cajaCarton(238, 141, 12, 10, 1); cajaCarton(250, 153, 10, 16, 2);
  R.rect(270, 110, 312, 136, Q.azul); R.rect(270, 110, 312, 111, Q.azulL); R.rect(276, 116, 288, 130, Q.pino1); R.rect(277, 117, 287, 118, Q.pino3); R.linea(292, 128, 306, 116, Q.bl); R.linea(300, 116, 306, 116, Q.bl); R.linea(306, 116, 306, 122, Q.bl);
  R.rect(224, 158, 319, 163, Q.k); R.rect(225, 159, 319, 161, Q.grisS); R.poligono([[204, 166], [232, 156], [232, 159], [206, 168]], Q.k); R.linea(206, 166, 231, 157, Q.grisL);
  for (const w of [262, 304]) { R.disco(w, 166, 8, Q.k); R.disco(w, 166, 5, Q.grisD); R.disco(w, 166, 2, Q.grisL); }
  R.rect(229, 96, 231, 152, Q.rojo); if (Math.floor(t * 2) % 2) R.rect(229, 144, 231, 150, Q.naranja);
};
const rotulo = (x, y) => { R.rect(x - 11, y, x + 11, y + 18, Q.k); R.rect(x - 10, y + 1, x + 10, y + 17, Q.bot1); R.rect(x - 10, y + 1, x + 10, y + 1, Q.bot3); R.rect(x - 7, y + 5, x - 1, y + 13, Q.papel); R.rect(x + 1, y + 5, x + 7, y + 13, Q.papel); R.rect(x, y + 5, x, y + 14, Q.laton); for (const j of [7, 9, 11]) { R.rect(x - 6, y + j, x - 2, y + j, Q.tintaL); R.rect(x + 2, y + j, x + 6, y + j, Q.tintaL); } };
const MOZO = { C: hex('#4a7a5a'), c: hex('#365c44'), W: hex('#4a7a5a'), H: hex('#5a3418'), h: hex('#8a5428') }, MOZO2 = { C: hex('#3a5a8a'), c: hex('#2a4468'), W: hex('#3a5a8a') };
const cajaPiedras = (x, y) => { R.rect(x - 9, y - 9, x + 9, y, Q.k); R.rect(x - 8, y - 8, x + 8, y - 1, Q.acero); R.rect(x - 8, y - 8, x + 8, y - 7, Q.aceroL); R.rect(x - 8, y - 2, x + 8, y - 1, Q.aceroS); R.rect(x - 3, y - 6, x + 3, y - 3, Q.laton); R.pset(x + 6, y - 5, Q.k); };
const p3 = (t) => {
  fondoPortal();
  // hojas que caen, el farol y dos palomas
  for (let k = 0; k < 7; k++) { const u = (t * (0.11 + h(k, 1, 51) * 0.08) + h(k, 2, 51)) % 1, x = Math.round(8 + h(k, 3, 51) * 70 + Math.sin(u * 9 + k) * 6 + u * 20), y = Math.round(58 + u * 104); R.rect(x, y, x + 1, y, [Q.naranja, Q.oro, Q.rojoL][k % 3]); R.pset(x + (Math.floor(t * 4 + k) % 2), y + 1, Q.oroS); }
  const susto = lin(t, P3 + 0.5, P3 + 0.9);
  for (const [x0, k] of [[178, 0], [190, 1]]) { const x = x0 + Math.round(susto * (40 + k * 30)), y = 162 - Math.round(susto * (70 + k * 20)), pica = susto === 0 && Math.floor(t * 3 + k) % 3 === 0, al = susto > 0 && Math.floor(t * 10) % 2; if (y < 10) continue; R.rect(x, y - 3, x + 4, y - 1, Q.gris); R.rect(x + 4, y - 4 + (pica ? 2 : 0), x + 5, y - 3 + (pica ? 2 : 0), Q.grisS); R.pset(x - 1, y - 2, Q.grisD); if (susto > 0) R.rect(x, y - (al ? 6 : 1), x + 3, y - (al ? 5 : 0), Q.grisL); else { R.pset(x + 1, y, Q.naranja); R.pset(x + 3, y, Q.naranja); } }
  // el rótulo del libro baja de su escuadra con una cuerda («went bankrupt»)
  const ub = sube(lin(t, tf(13.9), tf(15.1))), ry = Math.round(lerp(50, 118, ub)), sw = ub > 0 && ub < 1 ? Math.round(Math.sin(t * 6) * 1.5) : 0;
  R.rect(50, 46, 74, 48, Q.k); R.rect(50, 47, 73, 47, Q.grisL); R.linea(62, 48, 62 + sw, ry, Q.papelD);
  const lleva = t > tf(15.2), ul = lin(t, tf(15.25), tf(16.9));
  const bx = lleva ? Math.round(lerp(48, 196, ul)) : 48;
  const ac = [];
  // el mozo B espera el rótulo y se lo lleva al camión
  ac.push([153, () => { const b = R.actor(EL.turista, bx, 153, t, { pal: MOZO, dir: 1, anda: lleva && ul < 1, sostiene: lleva ? true : ub > 0.3 ? [bx + 16, 132] : undefined, dedo: !lleva && ub <= 0.3, sonrisa: false }); if (lleva) rotulo(b.mano[0] + 4, b.mano[1] - 14); }]);
  if (!lleva) rotulo(62 + sw, ry);
  // el mozo A lleva cajas de la pila al camión, ida y vuelta
  { const T0 = P3 - 0.3, ciclo = 3.3, f = ((t - T0) % ciclo + ciclo) % ciclo, ida = f < 1.6, u = ida ? f / 1.6 : (f - 1.6) / 1.7, ax = Math.round(ida ? lerp(164, 208, u) : lerp(208, 164, u));
    ac.push([156, () => { const a = R.actor(EL.dibujante, ax, 156, t, { pal: MOZO2, dir: ida ? 1 : -1, anda: true, sostiene: ida }); if (ida) cajaCarton(a.mano[0] - 3, a.mano[1] + 5, 12, 10, Math.floor((t - T0) / ciclo)); }]); }
  // la pila de cajas, el cuadro envuelto, la alfombra enrollada y el caballete plegado, junto a la puerta
  ac.push([150, () => { cajaCarton(160, 152, 16, 13, 0); cajaCarton(176, 152, 14, 11, 1); cajaCarton(163, 139, 13, 10, 2); R.rect(152, 124, 158, 150, Q.k); R.rect(153, 125, 157, 149, Q.vino); for (let y = 127; y < 149; y += 4) R.rect(153, y, 157, y, Q.vinoL); R.linea(186, 150, 192, 116, Q.nog2); R.linea(194, 150, 192, 116, Q.nog1); R.linea(188, 138, 194, 138, Q.nog0); }]);
  // «But his family»: se abre una hoja de la puerta y la viuda y las hijas salen con la caja de las piedras
  if (t > tf(16.05)) { R.rect(95, 71, 119, 139, X('#14161e')); for (let y = 120; y < 140; y++) for (let x = 96; x < 119; x++) if ((x + y) % 5 === 0) R.pset(x, y, X('#2a2c3a')); R.rect(99, 96, 101, 99, Q.calidoS); R.rect(92, 71, 95, 139, Q.k); R.rect(93, 72, 94, 138, Q.bot2); }
  const uf = lin(t, tf(16.3), P4 + 0.6);
  if (uf > 0) { const fx = (d) => Math.round(lerp(112, 60, lin(uf, d, d + 0.75))), sale = (d) => uf > d;
    if (sale(0)) ac.push([149, () => { const v = R.actor(EL.viudaCF, fx(0), 149, t, { dir: -1, anda: uf < 0.75, sostiene: true, triste: true }); cajaPiedras(v.mano[0] - 4, v.mano[1] + 5); }]);
    if (sale(0.12)) ac.push([150, () => R.actor(EL.hija1CF, fx(0.12) + 16, 150, t, { dir: -1, anda: uf > 0.12 && uf < 0.87, triste: true })]);
    if (sale(0.25)) ac.push([151, () => R.actor(EL.hija2CF, fx(0.25) + 32, 151, t, { dir: uf > 0.9 ? 1 : -1, anda: uf > 0.25 && uf < 0.99 })]); }
  enOrden(ac);
  camion(t);
  // pasa un taxi por delante
  { const x = Math.round(lerp(-60, 340, lin(t, P3 + 0.3, P3 + 2.4))); if (x < 330 && t > P3 + 0.3) taxi(x, 180); }
};

// 4 · la caja de las piedras: la guardan y la cierran con cuidado. Quedan diez: la esmeralda (hueco 0) y la aguamarina
// (hueco 2) ya se entregaron, así que esos dos huecos se reponen vacíos encima de lo que pinta el decorado
let CERR = null, VAC = null;
const p4 = (t) => {
  const cierra = lin(t, tf(19.15), tf(19.85)), cerrada = cierra >= 1;
  const upi = lin(t, tf(17.75), tf(18.7));   // la última piedra: de la mano de la hija a su hueco
  const o = { encuadre: 'banco', camara: 'caja', piedras: 11 + lin(upi, 0.55, 1), tapa: cerrada ? 1 : 0 };
  if (!CERR) { let b = R.nuevo(), prev = R.usar(b); T.editorial(R, 0, { ...o, tapa: 1 }); R.usar(prev); CERR = b; b = R.nuevo(); prev = R.usar(b); T.editorial(R, 0, { ...o, piedras: 0, tapa: 0 }); R.usar(prev); VAC = b; }
  T.editorial(R, t, o);
  // detrás de la mesa: la hija mayor (izquierda) y la viuda (derecha); delante, la pequeña con la llave
  const h1 = R.actor(EL.hija1CF, 82, 131, t, { dir: 1, sostiene: upi < 0.55 ? [100, 112] : undefined, sonrisa: upi >= 1 && t > tf(20.4), triste: upi < 0.05 });
  const baja = cierra > 0 && !cerrada;
  R.actor(EL.viudaCF, 224, 130, t, { dir: -1, sostiene: baja ? [218, Math.round(lerp(100, 113, cierra))] : cierra === 0 && t > tf(18.9) ? [218, 100] : undefined, habla: t > tf(20.4) && t < tf(22.5) && Math.sin(t * 8) > 0, sonrisa: t > tf(22.5) });
  const g = T.editorialDelante(R, t, o), HU = g.huecos ?? Array.from({ length: 12 }, (_, k) => [123 + (k % 6) * 15, k < 6 ? 122 : 131]);
  if (!cerrada) { for (const k of [0, 2]) { const [x, y] = HU[k]; for (let j = y - 13; j <= y + 1; j++) for (let i = x - 7; i <= x + 7; i++) R.pset(i, j, VAC[j * 320 + i]); }
    PZ.piedra(R, HU[6][0], HU[6][1], { color: 'peridoto' }); PZ.piedra(R, HU[8][0], HU[8][1], { color: '#e86aa0' }); }
  if (upi > 0 && upi < 0.55) { const u = upi / 0.55, x = Math.round(lerp(h1.mano[0] + 4, HU[11][0], sube(u))), y = Math.round(lerp(h1.mano[1], 104, u) - Math.sin(u * Math.PI) * 10); PZ.piedra(R, x, y, { color: '#e8e0f0', t: (t * 2) % 1 }); }
  else if (upi === 0) PZ.piedra(R, h1.mano[0] + 4, h1.mano[1] + 1, { color: '#e8e0f0', t: (t * 1.5) % 1 });
  if (baja) { // la tapa baja despacio: se repone la pared de detrás y se pinta la tapa a medio cerrar
    for (let y = 76; y <= 111; y++) for (let x = 104; x <= 215; x++) R.pset(x, y, CERR[y * 320 + x]);
    const yT = Math.round(lerp(77, 108, cierra)), s = Math.round(4 * cierra);
    R.poligono([[109, 113], [211, 113], [215 - s, yT], [105 + s, yT]], Q.k);
    if (113 - yT > 5) { R.poligono([[111, 112], [209, 112], [213 - s, yT + 2], [107 + s, yT + 2]], Q.aceroL); R.poligono([[115, 110], [205, 110], [208 - s, yT + 5], [112 + s, yT + 5]], (x, y) => ((x + y * 2) % 12 === 0 ? Q.vinoD : (x - y * 2 + 480) % 12 === 0 ? Q.vinoL : Q.vino)); }
  }
  // la pequeña, delante a la izquierda, con la llave de la caja
  const h2 = R.actor(EL.hija2CF, 36, 166, t, { dir: 1, sostiene: cerrada ? [54, 140] : true, sonrisa: cerrada });
  PZ.llave(R, h2.mano[0] + 3, h2.mano[1] + 6, {});
  if (cerrada && t < tf(19.85) + 0.5) for (let k = 0; k < 5; k++) tin(112 + k * 24, 110 - Math.round((t - tf(19.85)) * 14), Q.bl, 0.5);
  // la regla: quien encuentre un cofre se lleva su piedra
  if (t > tf(20.35)) { const s = Math.min(1, (t - tf(20.35)) / 0.2), y0 = Math.round(lerp(60, 44, s)), dos = t > tf(21.5), tres = t > tf(22.1);
    globo(132, y0, 222, y0 + 36, 228, 104);
    PZ.cofre(R, 152, y0 + 31, {});
    if (dos) { const a = Math.round(Math.sin(t * 7)); R.rect(170 + a, y0 + 17, 180 + a, y0 + 19, Q.tinta); R.poligono([[180 + a, y0 + 13], [187 + a, y0 + 18], [180 + a, y0 + 23]], Q.tinta); }
    if (tres) PZ.piedra(R, 204, y0 + 30, { s: 2, color: 'peridoto', t: (t * 1.4) % 1 }); }
};
const efectos = [[ta(8.8), 'tic'], [ta(8.8) + 1.2, 'tic'], [ta(8.8) + 2.4, 'tic'], [ta(8.8) + 3.2, 'tic'], [ta(10.62), 'papel'], [P3 + 0.4, 'coche'], [tf(15.1), 'toc'], [tf(16.05), 'puerta'], [tf(18.7), 'golpecito'], [tf(19.85), 'cerrojo'], [tf(22.1), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < ta(1.66) ? 2004 : t < P3 ? 2005 : 2006) });
''')

E['cf-tele'] = ('La tele lo cambia todo', '''// CF-TELE (frase 20), 2005–2018, sin cartela. Cuatro planos (uno AÑADIDO al registro: con tres, el de la tele duraba 9 s):
// 1. LOCAL un sótano de aficionados («a hobby for a few»): bloque de hormigón, lavadora que gira, corcho con un mapa,
//    chinchetas e hilos; uno clava una chincheta, otra lee el libro y el tercero baja la escalera con una pizza; la barra
//    del año corre de 2006 a 2017;
// 2. LOCAL el programa de la tele, genérico («in 2018, the TV show…»): selva de noche, un templo escalonado, campamento
//    y hoguera; el presentador (presentadorCF) alumbra con su linterna, se vuelve a la cámara y enseña el libro
//    («dedicated an episode to it»); delante, el cámara y la pértiga; punto rojo y código de tiempo (solo números);
// 3. F hoy/mapa/tele («used copies of the old book»): el salón con la tele; en el portátil de la subasta el precio sube
//    (o.precio) y pasa de 1.000 en «a thousand dollars» (la cifra, grande, en el bocadillo); la familia da un bote;
// 4. LOCAL un parque cualquiera de día («Suddenly, a lot more people»): entra gente de los dos lados con mapas y palas,
//    un detector de metales y un perro que escarba; al fondo llega el guarda con su silbato (lo que viene después).''', HELP + r'''
const te = (s) => en('tele', (s - 0.5) / 14.648);
const P2 = te(4.03), P3 = te(8.38), P4 = te(13.0);
const mapaPapel = (x, y, s = 1) => { R.rect(x - 6 * s, y - 5 * s, x + 6 * s, y + 4 * s, Q.k); R.rect(x - 6 * s + 1, y - 5 * s + 1, x + 6 * s - 1, y + 4 * s - 1, Q.papel); R.rect(x - 6 * s + 1, y - 5 * s + 1, x - 2 * s, y - s, X('#7ab0d8')); R.linea(x - 4 * s, y + 3 * s - 1, x + s, y - s, Q.verde); R.linea(x + s, y - s, x + 5 * s - 1, y + 2 * s, Q.verde); R.linea(x + s, y - 4 * s + 1, x + 4 * s, y - s, Q.rojo); R.linea(x + 4 * s, y - 4 * s + 1, x + s, y - s, Q.rojo); R.rect(x, y - 5 * s + 1, x, y + 4 * s - 1, Q.papelS); };

// 1 · el sótano de los aficionados
const BLOQ = [X('#5e6470'), X('#727884'), X('#868c96'), X('#989ea6')];
const fondoSotano = () => capa('sot', () => {
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 10), xx = x + (f % 2) * 10, junta = y % 10 === 9 || xx % 20 === 19, cal = (y < 17 && x < 178) || (x > 266 && y < 52); const v = 1.7 + (h(Math.floor(xx / 20), f, 61) - 0.5) * (cal ? 0.3 : 1.3) + (h(x, y, 63) - 0.5) * 0.5 - y / 152 * 0.6 + (h(x >> 3, y >> 4, 65) < 0.1 && !cal ? -0.7 : 0); R.pset(x, y, junta ? (cal ? BLOQ[1] : BLOQ[0]) : tono(BLOQ, v, x, y)); }
  R.rect(0, 0, 319, 3, Q.nog0); R.rect(0, 4, 319, 4, Q.k);
  // la bajante con su llave de paso y la mancha de humedad
  R.rect(4, 5, 11, 151, Q.k); R.rect(5, 5, 10, 151, X('#8a5a3a')); R.rect(5, 5, 6, 151, X('#b07a50')); for (const y of [40, 96]) { R.rect(3, y, 12, y + 4, Q.k); R.rect(4, y + 1, 11, y + 3, X('#a06a44')); } R.rect(11, 68, 16, 70, Q.k); R.disco(18, 69, 3, Q.k); R.disco(18, 69, 2, Q.rojo);
  for (let y = 100; y < 150; y++) for (let x = 12; x < 22 + ((y - 100) >> 3); x++) if (h(x, y, 67) < 0.5) tin(x, y, X('#3a4a44'), 0.3);
  // el ventanuco a ras de calle
  R.rect(34, 20, 88, 46, Q.k); R.rect(36, 22, 86, 44, X('#a8d0e8')); R.rect(36, 36, 86, 44, Q.pr2); for (let x = 37; x < 86; x += 2) R.rect(x, 34 - (h(x, 1, 69) > 0.5 ? 2 : 0), x, 36, Q.pr1); R.rect(60, 22, 61, 44, Q.k); R.rect(33, 47, 89, 49, Q.k); R.rect(34, 47, 88, 48, BLOQ[3]);
  // el corcho: el mapa con sus doce chinchetas, los hilos, las fotos y uno de nuestros cuadros
  R.rect(98, 36, 222, 108, Q.k); R.rect(99, 37, 221, 107, Q.nog3); for (let y = 40; y <= 104; y++) for (let x = 102; x <= 218; x++) R.pset(x, y, h(x, y, 71) < 0.18 ? X('#b88a52') : h(x >> 1, y >> 1, 73) < 0.2 ? X('#d8ac74') : X('#c89a62'));
  const mb = R.nuevo(), pv = R.usar(mb), PM = T.mapa(R, 0, { vida: false, rosa: false }); R.usar(pv);
  R.rect(110, 44, 180, 84, Q.k);
  for (let y = 45; y <= 83; y++) for (let x = 111; x <= 179; x++) { let r = 0, g = 0, bb = 0; for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const c = mb[(16 + (y - 45) * 4 + j) * 320 + 22 + (x - 111) * 4 + i]; r += c & 255; g += (c >> 8) & 255; bb += (c >> 16) & 255; } R.pset(x, y, (0xff000000 | ((bb >> 4) << 16) | ((g >> 4) << 8) | (r >> 4)) >>> 0); }
  const PINS = T.F_CIUDADES.map(([n, lon, lat]) => { const [x, y] = PM([lon, lat]); return [Math.round(111 + (x - 22) / 4), Math.round(45 + (y - 16) / 4), n]; });
  const fotos = [[190, 44, 0], [204, 60, 1], [188, 76, 2], [118, 90, 3], [146, 92, 4], [206, 88, 5]];
  for (const [x, y, k] of fotos) { R.rect(x, y, x + 13, y + 11, Q.k); R.rect(x + 1, y + 1, x + 12, y + 10, Q.bl); R.rect(x + 2, y + 2, x + 11, y + 7, [Q.pr2, Q.ci1, Q.tierraL, Q.verdeS, Q.azulL, Q.naranja][k]); R.rect(x + 3, y + 5, x + 6, y + 7, [Q.pr0, Q.grisS, Q.tierraS, Q.pr3, Q.azulS, Q.rojoS][k]); R.pset(x + 6, y, Q.rojo); }
  PINS.forEach(([x, y], k) => { const f = fotos[k % 6]; if (k % 2 === 0) R.linea(x, y, f[0] + 6, f[1], Q.rojo); });
  PINS.forEach(([x, y, n]) => { R.rect(x - 1, y - 1, x + 1, y + 1, Q.k); R.rect(x - 1, y - 1, x, y, n === 'chicago' || n === 'cleveland' ? Q.verdeL : Q.oro); });
  hoja(166, 88, 20, 16, { paso: 2, estrofa: 3 }); R.pset(176, 88, Q.azul);
  // la bombilla y su cable (la luz se pinta en cada fotograma)
  // la escalera de madera, a la derecha, con su barandilla y los trastos de debajo
  for (let i = 0; i < 8; i++) { const x1 = 318 - i * 11, y = 60 + i * 12; R.rect(x1 - 13, y, x1, y + 2, Q.k); R.rect(x1 - 12, y, x1, y + 1, Q.pino2); R.rect(x1 - 12, y, x1, y, Q.pino3); R.rect(x1 - 12, y + 3, x1 - 11, y + 11, Q.nog1); for (let yy = y + 3; yy < 152; yy++) if ((x1 + yy) % 9 === 0) R.pset(x1 - 6, yy, BLOQ[0]); }
  R.poligono([[319, 62], [319, 72], [240, 158], [228, 158]], Q.k); R.poligono([[319, 64], [319, 70], [239, 157], [231, 157]], Q.pino1); R.linea(319, 64, 231, 157, Q.pino3);
  for (let i = 2; i < 8; i += 2) { const x1 = 318 - i * 11, y = 60 + i * 12; R.rect(x1 - 7, y - 20, x1 - 6, y, Q.k); } R.linea(309, 47, 236, 126, Q.k); R.linea(309, 48, 236, 127, Q.pino2); R.rect(235, 126, 237, 152, Q.k);
  caja(284, 126, 304, 151, Q.pino1); R.rect(285, 127, 303, 128, Q.pino3); R.rect(285, 136, 303, 136, Q.papelD); caja(262, 136, 282, 151, Q.pino1); R.rect(263, 137, 281, 138, Q.pino3); for (const [x, c] of [[306, Q.rojo], [312, Q.azul]]) { R.rect(x, 142, x + 5, 151, Q.k); R.rect(x + 1, 143, x + 4, 150, c); R.rect(x + 1, 143, x + 4, 144, Q.grisL); }
  // la lavadora y el cesto de la ropa
  R.rect(22, 112, 58, 152, Q.k); R.rect(23, 113, 57, 151, X('#e4e6ea')); R.rect(23, 113, 57, 120, X('#c8ccd4')); R.rect(54, 113, 57, 151, X('#b8bcc6')); R.rect(26, 115, 34, 118, Q.grisD); R.disco(48, 117, 2, Q.k); R.disco(48, 117, 1, Q.rojo); R.disco(40, 136, 12, Q.k); R.disco(40, 136, 11, Q.grisL); R.disco(40, 136, 9, Q.k);
  R.rect(28, 104, 36, 112, Q.k); R.rect(29, 105, 35, 111, Q.naranja); R.rect(29, 105, 35, 106, Q.bl); R.rect(42, 107, 52, 112, Q.k); R.rect(43, 108, 51, 111, Q.cian);
  R.poligono([[62, 134], [88, 134], [85, 152], [65, 152]], Q.k); R.poligono([[64, 136], [86, 136], [84, 151], [66, 151]], (x, y) => ((x + y) % 4 === 0 ? Q.pino0 : Q.pino2)); R.rect(66, 130, 74, 135, Q.rosa); R.rect(74, 131, 84, 135, Q.azulL); R.rect(60, 133, 90, 134, Q.k);
  // el suelo de cemento con grietas, el sumidero y la alfombra vieja bajo la mesa
  R.rect(0, 152, 319, 153, Q.k); for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([X('#4c505a'), X('#5e626c'), X('#70747e')], 1.2 + (h(x >> 1, y, 77) - 0.5) * 1.4 - (y - 154) / 50 + (h(x >> 4, y >> 2, 79) < 0.15 ? -0.6 : 0), x, y));
  for (const [x0, y0, L] of [[20, 160, 30], [250, 172, 26], [140, 176, 18]]) for (let i = 0; i < L; i++) R.pset(x0 + i, y0 + Math.round(Math.sin(i * 0.7) * 1.5 + i * 0.15), X('#2e3038'));
  R.disco(84, 170, 5, Q.k); R.disco(84, 170, 4, Q.grisD); R.rect(81, 170, 87, 170, Q.gris); R.rect(84, 167, 84, 173, Q.gris);
  for (let y = 158; y < 174; y++) for (let x = 100 - (y - 158); x < 226 + (y - 158); x++) R.pset(x, y, y === 158 || y === 173 ? Q.oroS : ((x + y * 2) % 14 < 2 || (x - y * 2 + 400) % 14 < 2) ? Q.azulL : (x >> 1 + y) % 2 ? Q.azulS : Q.azul);
});
const mesaPlegable = (t) => { R.linea(118, 141, 140, 162, Q.k); R.linea(140, 141, 118, 162, Q.k); R.linea(188, 141, 210, 162, Q.k); R.linea(210, 141, 188, 162, Q.k); R.linea(119, 141, 141, 162, Q.grisL); R.linea(189, 141, 211, 162, Q.grisL);
  R.rect(108, 136, 220, 141, Q.k); R.rect(109, 137, 219, 138, Q.pino3); R.rect(109, 139, 219, 140, Q.pino1);
  hoja(112, 131, 14, 5, { paso: 2, n: 2 }); caja(186, 128, 194, 136, Q.rojo); R.rect(187, 129, 193, 130, Q.rojoL); R.rect(195, 130, 197, 134, Q.k); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k * 0.33) % 1; tin(189 + Math.round(Math.sin(u * 6 + k) * 2), Math.round(126 - u * 10), Q.bl, 0.5 * (1 - u)); }
  R.disco(204, 133, 3, Q.k); R.disco(204, 133, 2, X('#cfe6f0')); R.linea(206, 135, 210, 136, Q.nog2); };
const p1 = (t) => {
  fondoSotano();
  // el tambor de la lavadora gira; por el ventanuco pasan unos pies; la bombilla se mece
  { const a = t * 5; for (let k = 0; k < 3; k++) { const x = Math.round(40 + Math.cos(a + k * 2.1) * 5), y = Math.round(136 + Math.sin(a + k * 2.1) * 5); R.disco(x, y, 2, [Q.rojoL, Q.azulL, Q.bl][k]); } R.pset(36, 131, Q.bl); R.pset(37, 130, Q.bl); if (Math.floor(t * 8) % 2) R.rect(22, 112, 22, 152, X('#3a3c46')); }
  R.recorte([36, 22, 86, 44]); for (const [v, k, c] of [[26, 0, Q.rojoS], [-20, 1, Q.azulS]]) { const x = Math.round(((t * v + k * 37) % 90 + 90) % 90 + 18), p = Math.floor(t * 5 + k) % 2; R.linea(x, 22, x, 33, c); R.linea(x + 5, 22, x + 5, 33, c); R.linea(x + (v > 0 ? 1 : -1), 34 - p, x + (v > 0 ? 3 : -3), 34 - p, Q.k); R.linea(x + 5 + (v > 0 ? 1 : -1), 33 + p, x + 5 + (v > 0 ? 3 : -3), 33 + p, Q.k); } R.recorte(null);
  const bx = 236 + Math.round(Math.sin(t * 1.3) * 3); R.linea(236, 5, bx, 24, Q.k); R.rect(bx - 1, 24, bx + 1, 26, Q.grisD); R.disco(bx, 29, 3, Q.calido); R.pset(bx - 1, 28, Q.bl);
  for (let y = 32; y < 152; y += 1) { const w = Math.round((y - 30) * 0.55); for (let x = bx - w; x <= bx + w; x++) if (x >= 0 && x < 320 && ((x + y) & 1)) tin(x, y, Q.calido, 0.1 * (1 - (y - 30) / 150)); }
  halo(bx, 29, 16, Q.calido, 0.6);
  // una araña baja por su hilo
  { const y = 30 + Math.round(18 + Math.sin(t * 0.9) * 14); R.linea(186, 5, 186, y, X('#aab0bc')); R.rect(185, y, 187, y + 2, Q.k); R.pset(184, y + 1 + (Math.floor(t * 4) % 2), Q.k); R.pset(188, y + 1 + (Math.floor(t * 4 + 1) % 2), Q.k); }
  // el que clava una foto nueva en el corcho (subido a un taburete) y la que lee el libro, a los lados de la mesa
  const clava = t > te(1.0), ya = t > te(1.55);
  R.rect(86, 148, 106, 150, Q.k); R.rect(87, 148, 105, 149, Q.pino3); R.linea(88, 151, 86, 160, Q.k); R.linea(104, 151, 106, 160, Q.k); R.rect(88, 155, 104, 155, Q.pino0);
  const a = R.actor(EL.buscadorCF, 89, 148, t, { dir: 1, sostiene: clava && !ya ? [107, 112] : undefined, dedo: ya && t < te(2.6), habla: ya && Math.sin(t * 8) > 0.2, sonrisa: ya });
  const foto = (x, y) => { R.rect(x, y, x + 13, y + 11, Q.k); R.rect(x + 1, y + 1, x + 12, y + 10, Q.bl); R.rect(x + 2, y + 2, x + 11, y + 7, Q.pr2); R.rect(x + 5, y + 4, x + 8, y + 7, Q.tierra); };
  if (clava && !ya) foto(a.mano[0] - 2, a.mano[1] - 10);
  if (ya) { foto(103, 92); R.pset(109, 92, Q.rojo); R.pset(110, 92, Q.rojoL); R.linea(110, 93, 119, 60, Q.rojo); if (t < te(1.55) + 0.4) chispa(109, 92, 1 - (t - te(1.55)) / 0.4, Q.bl); }
  mesaPlegable(t);
  PZ.cofre(R, 152, 137, { sinCaja: true }); PZ.libro(R, 170, 136, {});
  const b = R.actor(EL.senora30, 222, 160, t, { dir: -1, sostiene: [219, 150 + (Math.sin(t * 2) > 0.6 ? -1 : 0)], habla: !ya && Math.sin(t * 7) > 0.3, sorpresa: ya && t < te(2.2), sonrisa: t > te(2.2) });
  PZ.libro(R, b.mano[0] - 8, b.mano[1] + 11, { abierto: true });
  // el tercero baja la escalera con la pizza
  const us = lin(t, 0.15, te(2.5)), enEsc = us < 0.78, i = 1.4 + (us / 0.78) * 5.6, px = enEsc ? Math.round(304 - i * 11) : Math.round(lerp(227, 244, (us - 0.78) / 0.22)), py = enEsc ? 60 + Math.floor(i) * 12 : 164;
  const c = R.actor(EL.comprador, px, py, t, { dir: -1, anda: us < 1, sostiene: true, sonrisa: true, habla: us >= 1 && t < te(3.4) && Math.sin(t * 9) > 0 });
  { const mx = c.mano[0] - 8, my = c.mano[1] + 2; R.rect(mx - 7, my - 2, mx + 9, my + 1, Q.k); R.rect(mx - 6, my - 1, mx + 8, my, Q.bl); R.rect(mx - 2, my - 1, mx + 2, my - 1, Q.rojo); for (let k = 0; k < 2; k++) { const u = (t * 0.8 + k * 0.5) % 1; tin(mx + k * 5 - 2, Math.round(my - 4 - u * 7), Q.bl, 0.5 * (1 - u)); } }
  if (us >= 1 && t < te(3.6)) R.icono('!', 226, 124 - Math.round(Math.abs(Math.sin(t * 6)) * 2), Q.oro, Q.k, 1);
  T.motas(R, t, 180, 290, 34, 140, 8, Q.calido);
};

// 2 · el programa de la tele (genérico): selva, templo y linterna
const NOC = [Q.noc0, Q.noc1, Q.noc2, Q.noc3];
const fondoSelva = () => capa('selva', () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(NOC, 0.2 + y / 132 * 2.6 + (h(x >> 2, y >> 1, 81) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 46; k++) { const x = Math.floor(h(k, 1, 83) * 320), y = 16 + Math.floor(h(k, 2, 83) * 70); if (x > 268 && y < 52) continue; R.pset(x, y, k % 5 === 0 ? Q.bl : X('#8a9ad0')); }
  // la luna en creciente
  R.disco(52, 36, 9, X('#f4f0d0')); R.disco(56, 33, 8, NOC[0]); halo(50, 37, 22, X('#f4f0d0'), 0.25);
  // la selva lejana, en dos términos, con bruma
  for (let x = 0; x < 320; x++) { const y1 = 92 - Math.round(Math.sin(x * 0.05) * 6 + Math.sin(x * 0.21) * 3 + h(x >> 1, 1, 85) * 4), y2 = 106 - Math.round(Math.sin(x * 0.08 + 2) * 5 + Math.sin(x * 0.33) * 3 + h(x >> 1, 2, 85) * 5); for (let y = y1; y < 132; y++) R.pset(x, y, y < y2 ? (h(x, y, 87) < 0.2 ? X('#1c3a44') : X('#16303c')) : (h(x, y, 89) < 0.22 ? X('#18463a') : X('#103428'))); }
  for (let y = 100; y < 112; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) && h(x >> 3, y >> 1, 91) < 0.5) tin(x, y, X('#6a8aa8'), 0.25);
  // el templo escalonado, con su escalinata, la puerta y las lianas
  const PI = [X('#3a4450'), X('#4e5a64'), X('#647078'), X('#7c888c')];
  for (let i = 0; i < 6; i++) { const x0 = 150 + i * 9, x1 = 264 - i * 9, y0 = 120 - i * 11, y1 = y0 + 11; R.rect(x0 - 1, y0 - 1, x1 + 1, y1, Q.k); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const jt = y === y0 + 6 || (x + (y > y0 + 6 ? 5 : 0)) % 11 === 0; R.pset(x, y, jt ? PI[0] : tono(PI, 1.2 + (h(x >> 1, y >> 1, 93) - 0.5) * 1.4 + (x - 207) / 90 + (y === y0 ? 1 : 0), x, y)); } }
  R.rect(193, 46, 221, 65, Q.k); for (let y = 47; y <= 64; y++) for (let x = 194; x <= 220; x++) R.pset(x, y, tono(PI, 1.4 + (h(x >> 1, y >> 1, 95) - 0.5) * 1.2 + (x - 207) / 40, x, y)); R.rect(190, 43, 224, 46, Q.k); R.rect(191, 44, 223, 45, PI[3]); R.rect(202, 52, 212, 65, Q.k); R.rect(204, 54, 210, 65, X('#0c1018'));
  for (let i = 0; i < 6; i++) { const y0 = 120 - i * 11; R.rect(199, y0, 215, y0 + 11, Q.k); for (let s = 0; s < 4; s++) { R.rect(200, y0 + s * 3, 214, y0 + s * 3, PI[3]); R.rect(200, y0 + s * 3 + 1, 214, y0 + s * 3 + 2, PI[1]); } }
  for (const x of [164, 250]) { R.rect(x - 5, 108, x + 5, 131, Q.k); R.rect(x - 4, 109, x + 4, 131, PI[1]); R.rect(x - 4, 109, x - 3, 131, PI[3]); R.disco(x, 116, 3, PI[0]); R.pset(x - 1, 115, PI[3]); R.rect(x - 2, 122, x + 2, 122, PI[0]); R.rect(x - 1, 125, x + 1, 127, PI[0]); }
  for (const [x, L] of [[158, 30], [176, 18], [238, 24], [256, 34], [186, 12]]) for (let i = 0; i < L; i++) { const xx = x + Math.round(Math.sin(i * 0.4 + x) * 2), yy = 131 - Math.round((264 - Math.abs(x - 207) * 2 - 150) / 9) - 0 + i; if (yy > 60 && yy < 132) { R.pset(xx, yy - 30, X('#2a6a3a')); if (i % 4 === 0) R.pset(xx + 1, yy - 30, X('#4a9a4a')); } }
  // el claro: tierra, hierba, helechos y piedras caídas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const cam = Math.abs(x - (150 + (y - 132) * 0.9)) < 34 + (y - 132) * 0.7; R.pset(x, y, cam ? tono([X('#2a2620'), X('#3c342a'), X('#4e4434')], 1.2 + (h(x >> 1, y, 97) - 0.5) * 1.6, x, y) : tono([X('#0e2a20'), X('#16402c'), X('#205236')], 1.1 + (h(x, y >> 1, 99) - 0.5) * 1.8 - (y - 132) / 70, x, y)); }
  R.rect(0, 131, 319, 131, X('#0c2018'));
  for (const [x, y] of [[96, 150], [228, 160], [280, 142], [20, 166], [300, 170], [120, 174]]) { for (let k = 0; k < 7; k++) { const a = -2.7 + k * 0.38; for (let i = 0; i < 9; i++) R.pset(Math.round(x + Math.cos(a) * i), Math.round(y + Math.sin(a) * i * 1.2 + i * i * 0.05), i % 3 ? X('#2a7a44') : X('#4aa058')); } }
  for (const [x, y, w] of [[272, 156, 9], [246, 172, 7], [70, 172, 8]]) { R.rect(x - w, y - 5, x + w, y, Q.k); R.rect(x - w + 1, y - 4, x + w - 1, y - 1, PI[1]); R.rect(x - w + 1, y - 4, x + w - 1, y - 4, PI[3]); R.pset(x, y - 2, PI[0]); }
  // las palmeras de la izquierda y la tienda de campaña con su farol
  for (const [x, top] of [[14, 62], [44, 78]]) { for (let y = top; y < 150; y++) { const xx = x + Math.round(Math.sin((y - top) * 0.03) * 5); R.rect(xx - 2, y, xx + 2, y, Q.k); R.rect(xx - 1, y, xx + 1, y, (y >> 2) & 1 ? X('#4a3a26') : X('#5e4a30')); } }
  R.poligono([[60, 150], [84, 112], [112, 150]], Q.k); R.poligono([[63, 149], [84, 115], [108, 149]], Q.naranja); R.poligono([[84, 115], [108, 149], [92, 149]], X('#b05a14')); R.poligono([[80, 149], [84, 128], [88, 149]], X('#2a1808')); R.linea(84, 112, 58, 152, X('#aab0bc')); R.linea(84, 112, 114, 152, X('#aab0bc'));
});
const palma = (x, y, t, k) => { for (let j = 0; j < 7; j++) { const a = -Math.PI + (j / 6) * Math.PI + Math.sin(t * 1.1 + j + k) * 0.06, L = 22 + (j % 2) * 5; for (let i = 0; i < L; i++) { const xx = Math.round(x + Math.cos(a) * i), yy = Math.round(y + Math.sin(a) * i * 0.6 + i * i * 0.02); R.pset(xx, yy, Q.k); R.pset(xx, yy + 1, i % 3 ? X('#1e5a34') : X('#2e7a44')); if (i % 3 === 0) { R.pset(xx, yy + 2, X('#1e5a34')); R.pset(xx, yy + 3, X('#16442a')); } } } };
const p2 = (t) => {
  fondoSelva();
  for (let k = 0; k < 9; k++) if (Math.sin(t * (2 + k * 0.3) + k * 3) > 0.7) { const x = Math.floor(h(k, 5, 83) * 320), y = 16 + Math.floor(h(k, 6, 83) * 60); if (!(x > 268 && y < 52)) chispa(x, y, 0.4, Q.bl); }
  // nubes de noche a tres velocidades y murciélagos ante la luna
  for (const [v, y, w, k] of [[5, 26, 22, 0], [9, 58, 16, 1], [3, 74, 26, 2]]) nube(((t * v + k * 130) % 400) - 40, y, w, [X('#3a4a80'), X('#2c3a6a'), X('#222e58')]);
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * (22 + k * 5) + k * 90) % 380) - 30), y = Math.round(30 + k * 9 + Math.sin(t * 3 + k) * 5), al = Math.floor(t * 9 + k) % 2; if (x > 262 && y < 54) continue; R.rect(x, y, x + 1, y, Q.k); R.pset(x - 1, y - (al ? 1 : 0), Q.k); R.pset(x - 2, y - (al ? 2 : -1), Q.k); R.pset(x + 2, y - (al ? 1 : 0), Q.k); R.pset(x + 3, y - (al ? 2 : -1), Q.k); }
  palma(14, 62, t, 0); palma(46, 78, t, 3);
  // las antorchas del templo, el farol de la tienda y la hoguera
  for (const x of [164, 250]) { const f = Math.floor(t * 9 + x) % 3; R.rect(x - 1, 102 - f, x + 1, 107, Q.naranja); R.rect(x, 101 - f, x, 105, Q.oroL); halo(x, 104, 12, Q.calidoS, 0.4 + f * 0.05); }
  halo(84, 132, 14, Q.calido, 0.45 + Math.sin(t * 6) * 0.05); R.rect(83, 130, 85, 134, Q.oroL);
  { const fx = 124, fy = 152, f = Math.floor(t * 10) % 3; halo(fx, fy - 6, 26, Q.calidoS, 0.4 + f * 0.04); R.linea(fx - 7, fy, fx + 7, fy - 3, Q.nog0); R.linea(fx - 7, fy - 3, fx + 7, fy, Q.nog1); R.poligono([[fx - 5, fy - 2], [fx + 5, fy - 2], [fx + (f - 1) * 2, fy - 13 - f]], Q.naranja); R.poligono([[fx - 3, fy - 2], [fx + 3, fy - 2], [fx + (1 - f), fy - 8 - f]], Q.oroL); for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k * 0.25) % 1; tin(Math.round(fx + Math.sin(u * 5 + k) * 4), Math.round(fy - 16 - u * 30), Q.bl, 0.35 * (1 - u)); tin(Math.round(fx + Math.sin(u * 5 + k) * 4) + 1, Math.round(fy - 16 - u * 30), Q.bl, 0.2 * (1 - u)); } }
  T.b_luciernagas(R, t, 9, [10, 300, 96, 150]);
  // el presentador: alumbra el templo, se vuelve a la cámara y enseña el libro
  const mira = te(6.3), ensena = t > te(6.75), ux = lin(t, P2, te(5.2)), px = Math.round(lerp(132, 160, ux)), aCam = t > mira;
  if (!aCam) { const bar = Math.sin(t * 2.4) * 10, x0 = px + 18, y0 = 138; for (let i = 0; i < 70; i++) { const w = 2 + i * 0.2, cx = x0 + i * 0.75, cy = y0 - i * 0.62 + bar * (i / 70); for (let s = -w; s <= w; s++) { const x = Math.round(cx + s * 0.6), y = Math.round(cy + s * 0.8); if (((x + y) & 1) && x < 320 && y > 14) tin(x, y, X('#fff4c0'), 0.42 * (1 - i / 90)); } } }
  PZ.pala(R, 186, 153, {});
  const p = R.actor(EL.presentadorCF, px, 152, t, { dir: 1, anda: ux > 0 && ux < 1, sostiene: ensena ? [px + 20, 128] : !aCam ? [px + 17, 139] : undefined, habla: (t > te(5.0) && !ensena && Math.sin(t * 9) > 0) || (ensena && Math.sin(t * 8) > 0.3), sonrisa: ensena });
  if (ensena) { PZ.libro(R, p.mano[0] + 8, p.mano[1] + 3, {}); for (let k = 0; k < 3; k++) { const u = (t * 1.5 + k * 0.33) % 1; chispa(p.mano[0] + 8 + Math.round(Math.cos(k * 2.1) * 12), p.mano[1] - 6 + Math.round(Math.sin(k * 2.1) * 9), u < 0.5 ? u * 2 : 2 - u * 2, Q.oroL); } }
  else if (!aCam) { R.rect(p.mano[0], p.mano[1] - 1, p.mano[0] + 4, p.mano[1] + 1, Q.k); R.rect(p.mano[0] + 1, p.mano[1], p.mano[0] + 3, p.mano[1], Q.grisL); R.pset(p.mano[0] + 4, p.mano[1], Q.oroL); }
  // delante, el equipo: el cámara y el de la pértiga, a contraluz
  const cam = R.actor(EL.camarografo, 236, 172, t, { dir: -1 });
  const son = R.actor(EL.turista, 268, 174, t, { dir: -1, sostiene: [262, 144], pal: { C: hex('#2a3a4a'), c: hex('#1c2836'), W: hex('#2a3a4a'), H: hex('#3a2418'), h: hex('#5a3a24') } });
  { const hx = son.mano[0], hy = son.mano[1], ex = px + 22, ey = 112 + Math.round(Math.sin(t * 1.7) * 2); R.linea(hx, hy, ex, ey, Q.k); R.linea(hx, hy - 1, ex, ey - 1, Q.grisS); R.rect(ex - 5, ey - 3, ex + 1, ey + 2, Q.k); R.rect(ex - 4, ey - 2, ex, ey + 1, Q.grisD); R.pset(ex - 3, ey - 1, Q.gris); R.pset(ex - 1, ey, Q.gris); }
  void cam;
  // el visor: punto rojo, código de tiempo y batería (solo números y símbolos)
  if (Math.floor(t * 2) % 2) { R.disco(12, 26, 4, Q.k); R.disco(12, 26, 3, Q.rojo); R.pset(11, 25, Q.rojoL); }
  { const s = Math.floor(t * 30), ff = String(s % 30).padStart(2, '0'), ss = String(Math.floor(s / 30) % 60).padStart(2, '0'); R.numero('00:12:' + ss + ':' + ff, 10, 172, { color: Q.bl }); }
  R.rect(288, 163, 308, 173, Q.bl); R.rect(289, 164, 307, 172, Q.k); R.rect(309, 166, 310, 170, Q.bl); for (let k = 0; k < 3; k++) R.rect(291 + k * 5, 166, 294 + k * 5, 170, Q.verdeL);
  for (const [x, y, dx, dy] of [[6, 18, 1, 1], [6, 176, 1, -1], [313, 176, -1, -1], [313, 56, -1, 1]]) { R.rect(Math.min(x, x + dx * 9), y, Math.max(x, x + dx * 9), y, Q.bl); R.rect(x, Math.min(y, y + dy * 9), x, Math.max(y, y + dy * 9), Q.bl); }
};

// 3 · el salón: la tele y la subasta del libro viejo
const p3 = (t) => {
  const pr = cl((t - te(9.95)) / (te(12.3) - te(9.95))), o = { encuadre: 'mapa', camara: 'tele', precio: pr };
  T.hoy(R, t, o);
  const mil = t > te(11.6), dt = t - te(11.6), bote = mil ? Math.max(0, Math.round(5 * Math.abs(Math.sin(dt * 7)) * Math.max(0, 1 - dt * 0.9))) : 0;
  // el niño señala la tele; los padres, en el sofá, miran el portátil
  R.actor(EL.nino85, 60, 160, t, { dir: -1, dedo: t < te(10.4), habla: t < te(9.6) && Math.sin(t * 9) > 0, sorpresa: mil, salto: Math.round(bote * 0.6) });
  const ul = lin(t, te(9.3), te(10.1));
  R.actor(EL.senora30, 250, 146, t, { dir: -1, sorpresa: mil, brazos: mil && dt > 0.2, salto: bote, habla: pr > 0 && !mil && Math.sin(t * 8) > 0.2 });
  R.actor(EL.librero, Math.round(lerp(222, 204, ul)), Math.round(lerp(146, 152, ul)), t, { dir: -1, anda: ul > 0 && ul < 1, dedo: ul >= 1 && !mil, sorpresa: mil, salto: bote });
  const g = T.hoyDelante(R, t, o);
  // la cifra, grande, sale del portátil
  if (pr > 0) { const s = Math.min(1, (t - te(9.95)) / 0.25), y0 = Math.round(lerp(72, 52, s)) - (mil ? Math.round(bote * 0.4) : 0), n = g.precio ?? Math.round(lerp(35, 1250, pr * pr * (3 - 2 * pr)));
    globo(148, y0, 246, y0 + 28, 166, 100);
    R.numero('$' + n, 190, y0 + 22, { tam: 16, centro: true, rampa: mil ? undefined : [Q.k, Q.k, Q.azulS, Q.azulS, Q.azul, Q.azul, Q.azulL, Q.azulL] });
    const a = Math.floor(t * 6) % 3; R.poligono([[232, y0 + 12 - a], [238, y0 + 4 - a], [244, y0 + 12 - a]], mil ? Q.verde : Q.verdeS); R.rect(236, y0 + 12 - a, 240, y0 + 20 - a, mil ? Q.verde : Q.verdeS);
    if (mil) for (let k = 0; k < 5; k++) { const u = (dt * 1.3 + k * 0.2) % 1; chispa(Math.round(197 + Math.cos(k * 1.3) * (40 + u * 16)), Math.round(y0 + 14 + Math.sin(k * 1.3) * (16 + u * 8)), 1 - u, Q.oroL); } }
};

// 4 · de repente, un parque lleno de gente con mapas y palas
const CIE = [Q.ci0, Q.ci1, Q.ci2, Q.ci3];
const fondoParque = () => capa('parque', () => {
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIE, 0.1 + y / 96 * 3 + (h(x >> 2, y >> 1, 101) - 0.5) * 0.3, x, y));
  // la ciudad lejana (ninguna en concreto) y la arboleda
  for (let k = 0; k < 26; k++) { const x = k * 13 - 4 + Math.floor(h(k, 1, 103) * 5), w = 7 + Math.floor(h(k, 2, 103) * 7), top = 60 + Math.floor(h(k, 3, 103) * 22), c = [X('#8aa2c0'), X('#9cb2cc'), X('#7e96b6')][k % 3]; if (x + w > 262 && top < 56) continue; R.rect(x, top, x + w, 96, c); R.rect(x, top, x, 96, X('#b4c6da')); for (let y = top + 3; y < 94; y += 4) for (let i = x + 2; i < x + w; i += 3) R.pset(i, y, X('#d8e4f0')); if (k % 4 === 0) R.rect(x + (w >> 1), top - 5, x + (w >> 1), top, c); }
  for (let x = 0; x < 320; x++) { const y0 = 86 - Math.round(Math.sin(x * 0.09) * 3 + Math.sin(x * 0.31) * 2 + h(x >> 1, 4, 103) * 3); for (let y = y0; y < 100; y++) R.pset(x, y, h(x, y, 105) < 0.25 ? Q.pr1 : y < y0 + 2 ? Q.pr2 : Q.pr0); }
  // el césped segado a franjas, con flores, y el sendero
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { const fr = Math.floor((x + (y - 98) * 0.6) / 22) % 2; R.pset(x, y, tono([Q.pr0, Q.pr1, Q.pr2, Q.pr3], 1.5 + fr * 0.6 + (h(x, y >> 1, 107) - 0.5) * 1.2 - (y - 98) / 110, x, y)); }
  for (let y = 104; y < 180; y++) { const cx = 250 - (y - 104) * 2.1 + Math.sin(y * 0.06) * 14, w = 7 + (y - 104) * 0.16; for (let x = Math.round(cx - w); x <= cx + w; x++) if (x >= 0 && x < 320) R.pset(x, y, Math.abs(x - cx) > w - 1 ? Q.pino0 : tono([Q.pino1, Q.pino2, Q.pino3], 1 + (h(x, y, 109) - 0.5) * 1.6, x, y)); }
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 111) * 320), y = 102 + Math.floor(h(k, 2, 111) * 76); if (R.pget(x, y) === Q.pino0) continue; R.pset(x, y, [Q.bl, Q.oro, Q.rosa, Q.rojoL][k % 4]); if (k % 3 === 0) R.pset(x, y + 1, Q.pr0); }
  // el templete del parque, los bancos y las farolas
  R.poligono([[136, 74], [184, 74], [176, 62], [144, 62]], Q.k); R.poligono([[138, 73], [182, 73], [175, 63], [145, 63]], Q.rojoS); R.rect(146, 64, 174, 65, Q.rojo); R.rect(159, 56, 161, 62, Q.k); R.disco(160, 55, 2, Q.oro);
  for (const x of [140, 152, 168, 180]) { R.rect(x - 1, 74, x + 1, 100, Q.k); R.rect(x, 74, x, 100, Q.bl); } R.rect(136, 99, 184, 104, Q.k); R.rect(137, 100, 183, 101, Q.hor3); R.rect(137, 102, 183, 103, Q.hor1); R.rect(140, 92, 180, 92, Q.bl); for (let x = 142; x < 180; x += 3) R.rect(x, 93, x, 98, Q.bl);
  for (const x of [96, 216]) { R.rect(x, 80, x + 1, 108, Q.k); R.rect(x - 2, 76, x + 3, 80, Q.k); R.rect(x - 1, 77, x + 2, 79, Q.calido); }
  for (const x of [58, 224]) { R.rect(x, 110, x + 22, 112, Q.k); R.rect(x + 1, 110, x + 21, 111, Q.pino2); R.rect(x, 105, x + 22, 107, Q.k); R.rect(x + 1, 105, x + 21, 106, Q.pino2); R.rect(x + 2, 112, x + 3, 116, Q.k); R.rect(x + 19, 112, x + 20, 116, Q.k); }
  // el estanque con sus patos
  for (let y = 112; y < 128; y++) for (let x = 6; x < 60; x++) { const d = ((x - 32) / 27) ** 2 + ((y - 120) / 8) ** 2; if (d < 1) R.pset(x, y, d > 0.82 ? Q.pino0 : (h(x >> 1, y, 113) < 0.3 ? X('#8ec8e4') : X('#5ea4cc'))); }
});
const copa = (cx, cy, r, t, k) => { for (const [dx, dy, rr] of [[0, 0, r], [-r * 0.7, r * 0.3, r * 0.75], [r * 0.7, r * 0.25, r * 0.8], [-r * 0.2, -r * 0.5, r * 0.7], [r * 0.4, -r * 0.4, r * 0.6]]) { const x = Math.round(cx + dx + Math.sin(t * 1.2 + k + dx) * 1), y = Math.round(cy + dy); R.disco(x, y, rr + 1, Q.k); R.disco(x, y, rr, Q.pr1); R.disco(x - rr * 0.25, y - rr * 0.25, rr * 0.65, Q.pr2); R.disco(x - rr * 0.4, y - rr * 0.45, rr * 0.3, Q.pr3); } };
const GENTE = [
  // [quién, x de llegada, suelo, lado de entrada (−1 izq., 1 dcha.), qué lleva (0 mapa, 1 pala, 2 detector, 3 cava), retraso, paleta]
  ['buscadorCF', 74, 138, -1, 1, 0.0], ['senora30', 108, 150, -1, 0, 0.15], ['comprador', 28, 160, -1, 3, 0.05], ['abuela', 142, 166, -1, 0, 0.35],
  ['turista1', 196, 134, 1, 0, 0.1], ['clienta', 232, 152, 1, 1, 0.0], ['senor30', 270, 164, 1, 2, 0.2], ['bibliotecaria', 176, 150, 1, 3, 0.3],
  ['nino85', 60, 172, -1, 1, 0.5], ['dibujante', 296, 140, 1, 0, 0.45], ['librero', 120, 126, -1, 1, 0.4],
];
const p4 = (t) => {
  fondoParque();
  for (const [v, y, w, k] of [[6, 24, 20, 0], [10, 50, 14, 1], [3.5, 66, 24, 2], [8, 38, 10, 3]]) { const x = ((t * v + k * 110) % 420) - 50; if (y < 50 && x + w > 262) continue; nube(x, y, w, [Q.nubeL, Q.nubeM, Q.nubeS]); }
  T.bandada(R, t, { y: 34, n: 5 });
  // los patos, y el agua que brilla
  for (let k = 0; k < 2; k++) { const x = Math.round(24 + k * 16 + Math.sin(t * 0.5 + k * 2) * 6), y = 119 + k * 3; R.rect(x, y, x + 4, y + 1, Q.bl); R.rect(x + 4, y - 2, x + 5, y - 1, k ? Q.verdeS : Q.bl); R.pset(x + 6, y - 1, Q.naranja); if (Math.floor(t * 3 + k) % 2) R.rect(x - 3, y + 2, x + 1, y + 2, X('#b8e0f0')); }
  // los árboles (el tronco aquí, la copa encima de la gente del fondo)
  for (const [x, y] of [[18, 110], [300, 118]]) { R.rect(x - 4, y - 44, x + 3, y, Q.k); R.rect(x - 3, y - 44, x + 2, y, Q.nog1); R.rect(x - 3, y - 44, x - 2, y, Q.nog3); sombra(x + 8, y + 1, 16, 0.22); }
  const lleg = (d) => lin(t, P4 - 0.2 + d, P4 + 1.25 + d * 1.2), ac = [];
  GENTE.forEach(([q, xf, ys, lado, que, d], k) => { const u = lleg(d), x = Math.round(lerp(lado < 0 ? -20 - k * 6 : 324 + k * 6, xf, u)), anda = u < 1, dir = anda ? -lado : (k % 2 ? 1 : -1);
    ac.push([ys, () => { sombra(x + 7, ys, 7, 0.2);
      if (que === 3 && !anda) { // cava: la pala sube y baja y el montón crece
        const f = (t * 2.2 + k) % 1, m = Math.min(5, Math.floor((t - P4 - 1.3 - d) * 2)); const a = R.actor(EL[q], x, ys, t, { dir, sostiene: [x + (dir > 0 ? 17 : -3), ys - 12 + Math.round(f < 0.5 ? f * 10 : (1 - f) * 10)] });
        PZ.pala(R, a.mano[0] + dir * 2, a.mano[1] + 9, { dir }); const mx = x + (dir > 0 ? 26 : -12); if (m > 0) { R.poligono([[mx - 4 - m, ys + 1], [mx + 4 + m, ys + 1], [mx, ys - 1 - m]], Q.tierraS); R.poligono([[mx - 2 - m, ys], [mx + 2 + m, ys], [mx, ys - m]], Q.tierra); } if (f > 0.5 && f < 0.7) R.rect(mx - 1, ys - 8, mx, ys - 7, Q.tierraL); return; }
      const mira = !anda && Math.sin(t * 2.3 + k * 1.9) > 0.2;
      const a = R.actor(EL[q], x, ys, t, { dir, anda, sostiene: que === 2 ? [x + (dir > 0 ? 18 : -4), ys - 6] : mira || anda || que === 1 ? true : undefined, dedo: !anda && !mira && que === 0, habla: !anda && k % 3 === 0 && Math.sin(t * 8 + k) > 0.3, sonrisa: k % 2 === 0 });
      if (que === 0 && (mira || anda)) mapaPapel(a.mano[0] + dir * 3, a.mano[1] - 1);
      if (que === 1) PZ.pala(R, a.mano[0] + dir * 2, a.mano[1] + 8, { dir });
      if (que === 2) { const bx = a.mano[0] + dir * (8 + Math.round(Math.sin(t * 4) * 4)), by = ys + 1; R.linea(a.mano[0], a.mano[1], bx, by - 2, Q.k); R.rect(bx - 4, by - 2, bx + 4, by - 1, Q.k); R.rect(bx - 3, by - 2, bx + 3, by - 2, Q.gris); if (!anda && Math.floor(t * 3) % 2) { R.pset(bx, by - 6, Q.rojo); R.pset(bx - 3, by - 5, Q.rojoL); R.pset(bx + 3, by - 5, Q.rojoL); } } }]); });
  // el perro que escarba (él sí que tiene prisa)
  ac.push([176, () => { const u = lin(t, P4 + 0.2, P4 + 1.1), x = Math.round(lerp(330, 206, u)), y = 176, f = Math.floor(t * 9) % 2, esc = u >= 1;
    R.rect(x, y - 8, x + 12, y - 3, Q.k); R.rect(x + 1, y - 7, x + 11, y - 4, Q.pino2); R.rect(x - 4 + (esc ? 0 : 0), y - 10 + (esc ? 3 : 0), x + 1, y - 5 + (esc ? 3 : 0), Q.k); R.rect(x - 3, y - 9 + (esc ? 3 : 0), x, y - 6 + (esc ? 3 : 0), Q.pino2); R.pset(x - 3, y - 8 + (esc ? 3 : 0), Q.k); R.rect(x - 1, y - 11 + (esc ? 3 : 0), x, y - 10 + (esc ? 3 : 0), Q.pino0);
    R.rect(x + 2, y - 3, x + 3, y - 1 - f, Q.k); R.rect(x + 9, y - 3, x + 10, y - 1 - (1 - f), Q.k); R.linea(x + 12, y - 8, x + 15, y - 11 - f, Q.k);
    if (esc) { for (let k = 0; k < 4; k++) { const v = (t * 3 + k * 0.25) % 1; R.rect(Math.round(x + 14 + v * 16), Math.round(y - 4 - Math.sin(v * Math.PI) * 9), Math.round(x + 15 + v * 16), Math.round(y - 3 - Math.sin(v * Math.PI) * 9), k % 2 ? Q.tierra : Q.tierraL); } R.poligono([[x + 22, y], [x + 36, y], [x + 29, y - 5]], Q.tierraS); R.rect(x - 6, y - 1, x + 1, y, Q.tierraS); } }]);
  // al fondo, por el sendero, llega el guarda con su silbato
  { const u = lin(t, te(14.9), te(15.9)), x = Math.round(lerp(330, 252, u)); if (u > 0) ac.push([118, () => { R.actor(EL.guardaCF, x, 118, t, { dir: -1, anda: u < 1, brazos: u >= 1 && Math.sin(t * 6) > 0, enfado: false, sorpresa: u >= 1 }); if (u >= 1) R.icono('?', x + 4, 84 - Math.round(Math.abs(Math.sin(t * 5)) * 2), Q.rojo, Q.bl, 2); }]); }
  enOrden(ac);
  copa(16, 52, 20, t, 0); copa(302, 68, 16, t, 2);
  // hojas y mariposas
  for (let k = 0; k < 4; k++) { const x = Math.round(80 + k * 60 + Math.sin(t * 1.3 + k * 2) * 14), y = Math.round(120 + k * 12 + Math.cos(t * 1.7 + k) * 6); R.pset(x, y, Q.bl); R.pset(x + (Math.floor(t * 8 + k) % 2 ? 1 : -1), y - 1, k % 2 ? Q.oro : Q.rosa); }
};
const efectos = [[0.3, 'maquina'], [te(1.55), 'toc'], [te(2.5), 'pop'], [P2 + 0.2, 'interruptor'], [te(6.75), 'brillo'], [te(10.0), 'bip'], [te(10.8), 'bip'], [te(11.6), 'timbre'], [P4 + 0.3, 'guau'], [te(14.0), 'toc'], [te(14.6), 'bip'], [te(15.9), 'silbato']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? Math.round(lerp(2006, 2017, lin(t, 0.3, P2 - 0.3))) : 2018) });
''')
