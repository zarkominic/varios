E = {}

# ── ayudas comunes de este grupo (se pegan al principio de cada cuerpo) ──
AYUDAS = r'''
const mez = (c1, c2, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c1 >>> s) & 255) * (1 - k) + ((c2 >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const hh = (a, b, c = 0) => { let n = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 1274126177); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const rr = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
const aclara = (x, y, k, col = 0xffffffff) => { const c = R.pget(x, y); if (c) R.pset(x, y, mez(c, col, k)); };
const K0 = hex('#14101c');
R.ICONOS.corazon = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
R.ICONOS.nota = ['..##', '..#.', '..#.', '..#.', '###.', '###.'];
// un cono de luz desde arriba (foco): aclara lo que ya está pintado
const foco = (xc, y0, y1, w0, w1, k = 0.28, col = hex('#fff6d8')) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0), w = w0 + (w1 - w0) * u; for (let x = Math.round(xc - w); x <= Math.round(xc + w); x++) aclara(x, y, Math.abs(x - xc) > w - 1.5 ? k * 0.45 : k, col); } };
// charco de luz en el suelo
const charco = (xc, yc, rx, ry, k = 0.3, col = hex('#fff6d8')) => { for (let y = Math.round(yc - ry); y <= Math.round(yc + ry); y++) for (let x = Math.round(xc - rx); x <= Math.round(xc + rx); x++) { const u = (x - xc) / rx, v = (y - yc) / ry, d = u * u + v * v; if (d <= 1) aclara(x, y, d > 0.7 ? k * 0.5 : k, col); } };
// un pájaro pequeño que vuela (alas arriba y abajo); col, colS, pico
const pajarito = (x, y, t, dir, col, colS, pico = hex('#f0b030'), aleteo = true) => {
  x = Math.round(x); y = Math.round(y); const ala = aleteo ? Math.floor(t * 12) % 2 : 1, X = (i) => x + dir * i;
  for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) if (i * i / 10 + j * j / 4 <= 1) R.pset(X(i), y + j, j > 0 ? colS : col);
  for (let i = -4; i <= 4; i++) for (let j = -3; j <= 3; j++) if (i * i / 16 + j * j / 7 <= 1 && !(i * i / 10 + j * j / 4 <= 0.6)) { const c = R.pget(X(i), y + j); if (c !== col && c !== colS) R.pset(X(i), y + j, K0); }
  R.pset(X(2), y - 1, K0); R.pset(X(4), y, pico); R.pset(X(5), y, pico); R.pset(X(-4), y - 1, colS); R.pset(X(-5), y - 2, colS);
  if (ala) { R.linea(X(-1), y - 1, X(-3), y - 5, K0); R.linea(X(0), y - 1, X(-2), y - 5, colS); R.pset(X(-1), y - 4, col); }
  else { R.linea(X(-1), y + 1, X(-3), y + 4, K0); R.linea(X(0), y + 1, X(-2), y + 4, colS); }
};
// confeti que cae (fuera de la barra del año y de la esquina de Atom)
const confeti = (t, n, x0, x1, y0, y1, semilla = 1, desde = 0) => { if (t < desde) return; const cols = [hex('#ff5aa8'), hex('#3ad0c8'), hex('#ffd84a'), hex('#a86aff'), hex('#8ae04a'), hex('#ffffff')];
  for (let i = 0; i < n; i++) { const vel = 18 + hh(i, 2, semilla) * 22, x = Math.round(x0 + hh(i, 1, semilla) * (x1 - x0) + Math.sin(t * 3 + i) * 3), y = Math.round(y0 + ((hh(i, 3, semilla) * (y1 - y0) + (t - desde) * vel) % (y1 - y0)));
    if (y < 16 || (x > 274 && y < 48)) continue; const c = cols[i % 6]; R.pset(x, y, c); if (Math.floor(t * 8 + i) % 2) R.pset(x + 1, y, mez(c, K0, 0.3)); else R.pset(x, y + 1, mez(c, K0, 0.3)); } };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-reparto'] = ('El reparto', '''// JH-REPARTO (frases 27–28), Juegos 50. Cuatro planos:
// 1. el plató a oscuras: Haymitch joven entra por la izquierda; en «Haymitch» se enciende el foco y en la pantalla su
//    silueta de rizos; en «Zada» saluda al público, que aplaude, y cae confeti;
// 2. (corte en «and Lenore») el lago del bosque, de tarde: Lenore Dove canta junto al agua; Haymitch llega con una flor;
//    en «loves» sale un corazón; en «Whitney Peak» un ganso de Lenore le pica la bota y él da un salto;
// 3. (corte en «McKenna») el balcón del Capitolio: Maysilee sale por el ventanal y se pone lejos de Haymitch, de morros;
//    entre los dos, el hueco; un pájaro rosa de caramelo cruza el hueco; en «tribute» la multitud aplaude;
// 4. (corte al final de «tribute») el porche de Haymitch en la Veta, de día: él tira una piedrecita al aire junto a su
//    puerta; Maysilee, de rosa, salta un cubo de carbón en «town girl»; en «nothing like him» él sonríe, una gallina cruza entre los dos
//    y ella se va muy digna.''', AYUDAS + r'''
const a = (f) => en('zada', f), g = (f) => en('grace', f);
const P2 = a(0.418), P3 = g(0), P4 = g(0.631);
const HAY = a(0.032), ZADA = a(0.195), LOVES = a(0.697), PEAK = a(0.839);
const MAY = g(0.15), TRIB = g(0.544), TOWN = g(0.726), NADA = g(0.85);
// la silueta de Haymitch en la pantalla: hombros, cuello, cabeza y rizos, con el filo dorado
const siluetaRizos = (cx, base, cuerpo, filo) => {
  const hombros = (d) => [[cx - 34 - d, base + 2], [cx - 28 - d, base - 14 - d], [cx - 12, base - 21 - d], [cx + 12, base - 21 - d], [cx + 28 + d, base - 14 - d], [cx + 34 + d, base + 2]];
  const cab = (d) => { R.disco(cx, base - 36, 13 + d, d ? filo : cuerpo); for (let k = 0; k < 9; k++) { const an = Math.PI * (1.05 + k * 0.11); R.disco(cx + Math.cos(an) * 13, base - 38 + Math.sin(an) * 13, 5 + d, d ? filo : cuerpo); } };
  R.poligono(hombros(1), filo); cab(1); R.poligono(hombros(0), cuerpo); rr(cx - 6, base - 26, cx + 6, base - 18, cuerpo); cab(0);
};
const pantallaHaymitch = (R_, t, [x0, y0, x1, y1]) => {
  const on = tramo(t, HAY - 0.1, HAY + 0.35);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (on < 1 && hh(x, y, Math.floor(t * 15)) > on) { const v = hh(y, x, Math.floor(t * 15) + 7); R.pset(x, y, v > 0.5 ? hex('#8a8aa0') : hex('#3a3a4a')); continue; }
    const u = (y - y0) / (y1 - y0), ray = Math.sin((x - 160) * 0.09 + t * 0.6) > 0.55 && (x + y) % 2 === 0;
    R.pset(x, y, ray ? mez(hex('#3a5ac8'), hex('#5ad0e8'), u) : mez(hex('#1a1a5a'), hex('#2a7aa8'), u));
  }
  if (on > 0.5) { siluetaRizos(160, y1 + 2, hex('#0c0a18'), Math.sin(t * 6) > 0 ? hex('#ffd84a') : hex('#f0b030'));
    if (t > ZADA) for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2 + t, r = 30 + (Math.floor(t * 6 + i) % 3) * 4; R.pset(160 + Math.cos(an) * r, 60 + Math.sin(an) * r * 0.6, hex('#fff4b0')); } }
};
const p1 = (t) => {
  const ap = 0.15 + 0.85 * tramo(t, ZADA - 0.1, ZADA + 0.6);
  T.capitolio(R, t, { encuadre: 'plato', pantalla: pantallaHaymitch, aplausos: ap, audiencia: 0.3 + 0.6 * tramo(t, HAY, ZADA + 0.5) });
  const luz = tramo(t, HAY - 0.05, HAY + 0.15);
  T.tinte(R, 16, 179, [12, 6, 34], 0.42 - 0.12 * luz);
  const u = tramo(t, 0.2, HAY - 0.1), x = Math.round(lerp(58, 132, u));
  if (luz > 0) { foco(x + 7, 22, 150, 3, 17, 0.3 * luz); charco(x + 7, 150, 20, 5, 0.35 * luz); }
  const saluda = t > ZADA && t < ZADA + 1.3, mira = t > HAY + 0.4 && t < ZADA - 0.1;
  R.actor(EL.haymitch, x, 150, t, { dir: mira ? -1 : 1, anda: u > 0 && u < 1, sorpresa: t > HAY && t < HAY + 0.5, dedo: saluda && Math.floor(t * 4) % 2 === 0, brazos: saluda && Math.floor(t * 4) % 2 === 1, sonrisa: t > ZADA - 0.2 });
  confeti(t, 40, 60, 262, 18, 150, 3, ZADA + 0.1);
};
// ── plano 2: el lago, de tarde ──
const ganso = (x, y, t, dir, anda, pica) => {
  x = Math.round(x); y = Math.round(y); const X = (i) => x + dir * i, paso = anda ? Math.floor(t * 8) % 2 : 0, B = hex('#f4f2ea'), S = hex('#c8c4b8'), N = hex('#f08a20');
  for (let i = -6; i <= 5; i++) for (let j = -4; j <= 3; j++) if (i * i / 36 + j * j / 14 <= 1) R.pset(X(i), y - 5 + j, j > 1 ? S : B);
  for (let i = -7; i <= 6; i++) for (let j = -5; j <= 4; j++) if (i * i / 49 + j * j / 22 <= 1 && !(i * i / 36 + j * j / 14 <= 1)) R.pset(X(i), y - 5 + j, K0);
  R.pset(X(-7), y - 7, B); R.pset(X(-8), y - 8, K0);
  const cy = pica ? y - 6 : y - 14, cx = pica ? 9 : 5;
  R.linea(X(3), y - 7, X(cx - 1), cy + 2, K0); R.linea(X(4), y - 7, X(cx), cy + 2, B); R.linea(X(5), y - 7, X(cx + 1), cy + 2, K0);
  R.disco(X(cx), cy, 2.2, B); R.pset(X(cx + 1), cy - 1, K0); R.pset(X(cx + 3), cy, N); R.pset(X(cx + 4), cy, N); R.pset(X(cx + 3), cy + 1, hex('#c86a10'));
  R.pset(X(-1), y - 1 + (paso ? -1 : 0), N); R.pset(X(-1), y, N); R.pset(X(1), y - 1 + (paso ? 0 : -1), N); R.pset(X(1), y, N); R.pset(X(2), y, N); R.pset(X(0), y, N);
};
const notas = (t, x, y, desde, hasta, col, semilla) => { for (let i = 0; i < 4; i++) { const f = ((t - desde) * 0.8 + i * 0.25) % 1; if (t < desde || t > hasta) continue; R.icono('nota', Math.round(x + Math.sin(f * 6 + i) * 4 + f * 18 * semilla), Math.round(y - f * 34), col, K0, 1); } };
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'bosque', luz: 'tarde' });
  const llega = tramo(t, P2 + 0.15, LOVES - 0.45), xh = Math.round(lerp(300, 184, llega));
  const salta = t > PEAK + 0.35 && t < PEAK + 0.75, canta = t < LOVES - 0.6 || t > PEAK + 0.9;
  R.actor(EL.lenore, 150, 162, t, { dir: 1, habla: canta && Math.sin(t * 9) > 0, sorpresa: t > LOVES - 0.6 && t < LOVES - 0.1, sonrisa: t > LOVES - 0.1 });
  const ofrece = t > LOVES - 0.45 && t < PEAK + 0.3;
  const h = R.actor(EL.haymitch, xh, 162, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: ofrece ? true : undefined, sonrisa: t > LOVES - 0.2, sorpresa: salta, salto: salta ? Math.round(Math.sin((t - PEAK - 0.35) / 0.4 * Math.PI) * 6) : 0 });
  if (ofrece) { const [mx, my] = h.mano; R.linea(mx, my, mx - 2, my - 6, hex('#3a7a2a')); for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2 + t; R.pset(Math.round(mx - 2 + Math.cos(an) * 2), Math.round(my - 8 + Math.sin(an) * 2), hex('#ffd84a')); } R.pset(mx - 2, my - 8, hex('#e86a20')); }
  if (t > LOVES - 0.05 && t < PEAK + 0.2) { const u = tramo(t, LOVES - 0.05, LOVES + 0.4), s = 2 + (Math.floor(t * 4) % 2); R.icono('corazon', 172 - (s === 3 ? 3 : 0), Math.round(124 - u * 16), hex('#ff4a7a'), hex('#ffffff'), s);
    if (u < 1) for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2; R.pset(Math.round(179 + Math.cos(an) * (6 + u * 14)), Math.round(114 - u * 10 + Math.sin(an) * (4 + u * 10)), hex('#ffd0e0')); } }
  notas(t, 160, 132, P2, LOVES - 0.6, hex('#ffe8a0'), 1); notas(t, 160, 132, PEAK + 0.9, E.duracion, hex('#ffe8a0'), 1);
  // el ganso de Lenore: viene por la orilla y le pica la bota a Haymitch
  const gv = tramo(t, LOVES + 0.1, PEAK + 0.3), gx = lerp(96, xh - 6, gv);
  ganso(gx, 166, t, 1, gv > 0 && gv < 1, t > PEAK + 0.2 && t < PEAK + 0.6);
  if (t > PEAK + 0.3 && t < PEAK + 0.9) R.icono('!', xh + 6, 120, hex('#ffffff'), K0, 1);
  T.distritoDelante(R, t, { encuadre: 'bosque', luz: 'tarde' });
};
// ── plano 3: el balcón ──
const pajaroCaramelo = (x, y, t, dir) => { pajarito(x, y, t, dir, hex('#ff8ad0'), hex('#d84aa0'), hex('#ffe0f4')); R.pset(Math.round(x) + dir * -1, Math.round(y) - 1, hex('#ffffff')); R.pset(Math.round(x), Math.round(y) - 2, hex('#ffd0ee'));
  for (let i = 1; i <= 3; i++) { const f = Math.floor(t * 10 + i) % 3; if (f === 0) R.pset(Math.round(x) - dir * (6 + i * 3), Math.round(y) + (i % 2), hex('#ffc0e8')); } };
const p3 = (t) => {
  T.capitolio(R, t, { encuadre: 'avenida', camara: 'balcon' });
  const sale = tramo(t, P3 + 0.1, MAY + 0.1), xm = Math.round(lerp(152, 200, sale)), aparta = tramo(t, TRIB + 0.1, TRIB + 0.6);
  const acerca = tramo(t, TRIB - 0.1, TRIB + 0.4), xh = Math.round(lerp(100, 120, acerca) - lerp(0, 8, tramo(t, TRIB + 0.9, TRIB + 1.4)));
  const vuela = tramo(t, MAY + 0.3, TRIB - 0.3), bx = lerp(232, 88, vuela), by = 100 + Math.sin(vuela * 9) * 6;
  const mira = vuela > 0.1 && vuela < 1 ? (bx > xh + 7 ? 1 : -1) : 1;
  R.actor(EL.haymitch, xh, 126, t, { dir: mira, anda: (acerca > 0 && acerca < 1), dedo: t > P3 && t < MAY - 0.2 && Math.floor(t * 3) % 2 === 0, sonrisa: t < TRIB + 0.6 || t > TRIB + 1.4, sorpresa: t > TRIB + 0.6 && t < TRIB + 1.4 });
  R.actor(EL.maysilee, Math.round(xm + aparta * 12), 126, t, { dir: sale < 1 ? 1 : (t > TRIB + 0.1 && t < TRIB + 0.8 ? -1 : 1), anda: (sale > 0 && sale < 1) || (aparta > 0 && aparta < 1), enfado: t > MAY - 0.2, habla: t > TRIB + 0.2 && t < TRIB + 0.7 });
  if (vuela > 0 && vuela < 1) pajaroCaramelo(bx, by, t, -1);
  T.capitolioDelante(R, t, { encuadre: 'avenida', camara: 'balcon' });
  confeti(t, 26, 20, 270, 18, 178, 7, TRIB);
};
// ── plano 4: la calle de la Veta ──
const gallina = (x, y, t, dir, corre) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + dir * i, b = corre ? Math.floor(t * 12) % 2 : 0, W = hex('#f0e6d0'), S = hex('#c0a888');
  for (let i = -4; i <= 3; i++) for (let j = -3; j <= 2; j++) if (i * i / 16 + j * j / 9 <= 1) R.pset(X(i), y - 4 - b + j, j > 0 ? S : W);
  R.disco(X(4), y - 8 - b, 1.8, W); R.pset(X(5), y - 9 - b, K0); R.pset(X(6), y - 8 - b, hex('#f0a020')); R.pset(X(4), y - 11 - b, hex('#e83a3a')); R.pset(X(5), y - 11 - b, hex('#e83a3a'));
  R.pset(X(-5), y - 6 - b, S); R.pset(X(-5), y - 7 - b, W); R.pset(X(-1), y - 1, hex('#f0a020')); R.pset(X(1 + b), y - 1 + b, hex('#f0a020')); R.pset(X(-1), y, hex('#f0a020')); R.pset(X(1), y, hex('#f0a020'));
  if (corre) for (let i = 0; i < 3; i++) R.pset(X(-7 - i * 3), y - 1 - (Math.floor(t * 8 + i) % 2), hex('#b8aa98')); };
const cubo = (x, y) => { R.poligono([[x - 7, y - 9], [x + 7, y - 9], [x + 5, y], [x - 5, y]], K0); R.poligono([[x - 6, y - 8], [x + 6, y - 8], [x + 4, y - 1], [x - 4, y - 1]], hex('#5a5e68')); R.linea(x - 6, y - 8, x + 6, y - 8, hex('#9aa0aa'));
  for (let i = -5; i <= 5; i += 2) R.disco(x + i, y - 10 - (i % 3 ? 0 : 1), 1.6, i % 4 ? hex('#2a2a30') : hex('#4a4a52')); R.pset(x - 2, y - 12, hex('#8a8a96')); R.linea(x - 7, y - 9, x - 2, y - 16, hex('#3a3a42')); R.linea(x + 7, y - 9, x + 2, y - 16, hex('#3a3a42')); };
const p4 = (t) => {
  T.distrito(R, t, { encuadre: 'calle', camara: 'puerta', luz: 'dia' });
  cubo(88, 164);
  const anda1 = tramo(t, P4 + 0.05, TOWN - 0.25), anda2 = tramo(t, TOWN + 0.25, NADA - 0.15), vete = tramo(t, NADA + 0.55, E.duracion - 0.1);
  const xm = Math.round(anda1 < 1 ? lerp(10, 64, anda1) : anda2 < 1 ? lerp(98, 128, anda2) : lerp(128, 330, vete)), xm2 = anda1 >= 1 && anda2 <= 0 ? Math.round(lerp(64, 98, tramo(t, TOWN - 0.25, TOWN + 0.25))) : xm;
  const salto = t > TOWN - 0.25 && t < TOWN + 0.25 ? Math.round(Math.sin((t - TOWN + 0.25) / 0.5 * Math.PI) * 8) : 0;
  const andando = (anda1 > 0 && anda1 < 1) || (anda2 > 0 && anda2 < 1) || (vete > 0 && vete < 1);
  // Haymitch tira una piedrecita al aire y la recoge
  const fase = ((t - P4) % 1.1) / 1.1, tira = t < NADA - 0.1, xh = 180;
  const h = R.actor(EL.haymitch, xh, 164, t, { dir: -1, sostiene: tira ? [xh - 2, 140] : undefined, sonrisa: t > NADA - 0.1, dedo: t > NADA - 0.1 && t < NADA + 0.6, sorpresa: t > TOWN - 0.25 && t < TOWN + 0.2 });
  if (tira) { const [mx, my] = h.mano, py = Math.round(my - 2 - Math.sin(fase * Math.PI) * 16); R.disco(mx, py, 1.4, hex('#3a3a42')); R.pset(mx, py - 1, hex('#8a8a96')); }
  R.actor(EL.maysilee, xm2, 164, t, { dir: 1, anda: andando || salto > 0, salto, enfado: t > NADA, sonrisa: t > P4 + 0.3 && t < TOWN + 0.4 });
  if (t > TOWN - 0.2 && t < TOWN + 0.4) for (let i = 0; i < 5; i++) { const f = tramo(t, TOWN - 0.2, TOWN + 0.4); R.pset(84 + i * 2, Math.round(150 - Math.sin(f * Math.PI) * (3 + i)), hex('#4a4a52')); }
  const gv = tramo(t, NADA + 0.1, NADA + 1.1); if (gv > 0 && gv < 1) gallina(lerp(250, 40, gv), 168, t, -1, true);
  if (t > NADA && t < NADA + 0.6) R.icono('!', xm2 + 6, 124, hex('#ffffff'), K0, 1);
  T.distritoDelante(R, t, { encuadre: 'calle', camara: 'puerta', luz: 'dia' });
};
const efectos = [[HAY - 0.05, 'interruptor'], [ZADA + 0.1, 'publico'], [LOVES, 'brillo'], [PEAK + 0.25, 'boing'], [P3 + 0.15, 'puerta'], [TRIB + 0.1, 'publico'], [TOWN - 0.1, 'boing'], [NADA + 0.15, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 50 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-capitolio'] = ('El Capitolio', '''// JH-CAPITOLIO (frases 29–30), Juegos 50. Tres planos:
// 1. el invernadero: Snow entra por el camino de grava, coge una rosa blanca y la huele («already in power»); el pan con
//    ojos, escondido junto al arriate, estornuda (gag 4) y vuelan los pétalos; en «white roses» Snow lo mira y el pan se
//    esconde;
// 2. (corte en «Jesse») los rosales de cerca: Plutarch escribe en su libreta; en «Plutarch» levanta la vista; entra Effie
//    joven y, en «Effie», se coloca la peluca rosa: un pájaro baja y hace nido en ella (gag 3); Plutarch lo apunta;
// 3. (corte en «Keep») la consola de los Vigilantes: un ojo-cámara del techo se gira hacia Plutarch («keep an eye»); en
//    «Catching Fire» la pantalla se llena de llamas; en «head gamemaker» gira el dial y en «secretly» sale un sinsajo en el
//    monitor; el vigilante sentado se gira y, en «rebellion», Plutarch vuelve el dial y sonríe como si nada.''', AYUDAS + r'''
const s = (f) => en('snow', f), p = (f) => en('plutarch', f);
const P2 = s(0.562), P3 = p(0);
const SNOW = s(0.082), PODER = s(0.229), ROSAS = s(0.377), PLUT = s(0.664), ELLE = s(0.771), EFFIE = s(0.896);
const OJO = p(0.043), FIRE = p(0.288), HEAD = p(0.545), SECRET = p(0.707), REBEL = p(0.894);
const BLANCA = hex('#f8f8f4');
// ── plano 1: el invernadero ──
const p1 = (t) => {
  T.capitolio(R, t, { encuadre: 'invernadero' });
  const u1 = tramo(t, 0.2, SNOW + 0.2), u2 = tramo(t, SNOW + 0.8, PODER - 0.3);
  const x = Math.round(u1 < 1 ? lerp(112, 150, u1) : lerp(150, 180, u2));
  const coge = t > PODER - 0.3, huele = t > PODER + 0.1 && t < 3.6, estornudo = 3.56;
  const susto = t > estornudo && t < estornudo + 0.6;
  const sn = R.actor(EL.snow, x, 160, t, { dir: 1, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), sostiene: coge ? (huele ? [x + 11, 140] : [x + 18, 146]) : undefined, sonrisa: huele || t > ROSAS + 0.8, sorpresa: susto, enfado: t > estornudo + 0.6 && t < ROSAS + 0.8 });
  if (coge) { const [mx, my] = sn.mano, pierde = tramo(t, estornudo, estornudo + 0.2);
    R.linea(mx, my, mx, my + 5, hex('#3a7a3a')); T.PIEZAS_JH.rosaBlanca(R, mx, my + 1, { s: 1 });
    // los pétalos que se lleva el estornudo
    if (pierde > 0) for (let i = 0; i < 7; i++) { const f = tramo(t, estornudo, estornudo + 1.6 + i * 0.1); if (f >= 1) continue; R.pset(Math.round(mx - f * (30 + i * 9) + Math.sin(t * 6 + i) * 2), Math.round(my - 4 - Math.sin(f * 3) * 12 + f * 24 + i), i % 2 ? BLANCA : hex('#e8e0e8')); } }
  // el pan, escondido en el arriate: coge aire, estornuda una nube de harina y se esconde
  const ex = t < 2.6 ? 'normal' : t < 3.95 ? 'estornudo' : t < ROSAS + 0.2 ? 'susto' : 'normal';
  T.pan(R, 228, 162, t, { dir: -1, expresion: ex, esconde: tramo(t, ROSAS + 0.3, ROSAS + 0.7) });
  if (t > estornudo && t < estornudo + 1) { const f = tramo(t, estornudo, estornudo + 1); for (let i = 0; i < 14; i++) { const an = Math.PI * (0.8 + hh(i, 1, 4) * 0.5); R.pset(Math.round(222 + Math.cos(an) * f * (14 + i)), Math.round(156 + Math.sin(an) * f * (6 + i * 0.6)), mez(hex('#fff8e8'), hex('#8ac06a'), f)); } }
  if (susto) R.icono('!', x + 6, 120, hex('#ffffff'), K0, 1);
};
// ── plano 2: los rosales de cerca ──
const libreta = (mx, my, t, rapido) => { rr(mx - 2, my - 7, mx + 5, my + 1, K0); rr(mx - 1, my - 6, mx + 4, my, hex('#f4ecd8')); for (let j = -5; j <= -1; j += 2) R.linea(mx, my + j, mx + 3, my + j, hex('#9aa0b8'));
  const f = Math.floor(t * (rapido ? 14 : 6)) % 4; R.linea(mx + 2 + f % 2, my - 3 - f, mx + 6, my - 9 - f, hex('#e8b830')); R.pset(mx + 1 + f % 2, my - 2 - f, K0); };
const nido = (x, y, t) => { for (let i = -6; i <= 6; i++) { const yy = y + Math.round(Math.abs(i) * 0.25); R.pset(x + i, yy, i % 3 ? hex('#8a5a2a') : hex('#c8945a')); R.pset(x + i, yy + 1, hex('#6a3e1a')); if (i % 2) R.pset(x + i, yy - 1, hex('#a8743a')); }
  R.linea(x - 7, y - 1, x - 4, y + 1, hex('#c8945a')); R.linea(x + 7, y - 2, x + 4, y + 1, hex('#8a5a2a')); };
const p2 = (t) => {
  T.capitolio(R, t, { encuadre: 'invernadero', camara: 'rosas' });
  const mira = t > PLUT - 0.1 && t < PLUT + 0.9, xp = 124;
  const pl = R.actor(EL.plutarch, xp, 162, t, { dir: mira ? 1 : 1, sostiene: [xp + 17, 146], sorpresa: mira && t < PLUT + 0.4, sonrisa: t > EFFIE + 0.9 });
  libreta(pl.mano[0], pl.mano[1], t, t > EFFIE + 0.7);
  if (mira) R.icono('?', xp + 2, 118, hex('#ffffff'), K0, 1);
  const llega = tramo(t, ELLE - 0.4, EFFIE - 0.2), xe = Math.round(lerp(220, 176, llega));
  const ajusta = t > EFFIE - 0.15 && t < EFFIE + 0.9;
  const ef = R.actor(EL.effie, xe, 162, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: ajusta ? [xe + 8, 124] : undefined, sonrisa: t < EFFIE + 0.9, sorpresa: t > EFFIE + 0.95 });
  // el pájaro baja del cristal y anida en la peluca
  const [cx, cy] = ef.cabeza, top = cy - 8, b = tramo(t, EFFIE + 0.05, EFFIE + 0.75);
  if (b > 0) { if (b >= 1) nido(cx - 1, top + 1, t);
    const bx = lerp(262, cx, b), by = lerp(40, top - 3, b) - Math.sin(b * Math.PI) * 10; pajarito(bx, b >= 1 ? top - 2 : by, t, -1, hex('#5ab0e8'), hex('#2a70b0'), hex('#f0b030'), b < 1);
    if (b >= 1 && Math.floor(t * 4) % 2) { R.pset(cx - 7, top - 4, hex('#ffffff')); R.pset(cx - 8, top - 5, hex('#ffffff')); } }
  if (t > EFFIE + 0.95 && t < EFFIE + 1.6) R.icono('!', xe + 4, top - 14, hex('#ffffff'), K0, 1);
  T.capitolioDelante(R, t, { encuadre: 'invernadero', camara: 'rosas' });
};
// ── plano 3: la consola ──
const llamas = (R_, t, [x0, y0, x1, y1]) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y1 - y) / (y1 - y0), v = Math.sin(x * 0.35 + t * 9) * 0.12 + Math.sin(x * 0.13 - t * 5) * 0.1 + hh(x, Math.floor(t * 12), 9) * 0.12;
  const k = u - v; R.pset(x, y, k < 0.25 ? hex('#fff0a0') : k < 0.45 ? hex('#ffb030') : k < 0.65 ? hex('#e8501a') : k < 0.8 ? hex('#8a1a10') : hex('#2a0a10')); } };
const ojoCamara = (t, mira) => { const x = 236, y = 18; R.linea(x, 0, x, y - 5, hex('#4a4e60')); rr(x - 5, y - 6, x + 5, y - 4, hex('#2a2e3a'));
  for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) if (i * i / 25 + j * j / 16 <= 1 && j >= -3) R.pset(x + i, y + j, j < 0 ? hex('#5a6278') : hex('#3a4052'));
  const ang = lerp(0.6, 2.4, mira), lx = Math.round(x + Math.cos(ang) * 3), ly = Math.round(y + Math.sin(ang) * 2.4);
  R.disco(lx, ly, 2, K0); R.pset(lx, ly, Math.floor(t * 3) % 2 ? hex('#ff3a3a') : hex('#a81a1a')); R.pset(lx - 1, ly - 1, hex('#ffffff')); };
const p3 = (t) => {
  const dial = t < HEAD ? 0.2 : t < REBEL - 0.3 ? 0.2 + 0.7 * tramo(t, HEAD, HEAD + 0.5) : 0.9 - 0.7 * tramo(t, REBEL - 0.3, REBEL);
  const sinsajo = tramo(t, SECRET - 0.1, SECRET + 0.3) * (1 - tramo(t, REBEL - 0.2, REBEL + 0.05));
  const fuego = t > FIRE - 0.1 && t < HEAD - 0.1;
  T.arena(R, t, { encuadre: 'control', camara: 'consola', dial, sinsajo, ...(fuego ? { pantalla: llamas } : {}) });
  ojoCamara(t, tramo(t, OJO, OJO + 0.6));
  // el vigilante sentado teclea; se gira al ver el sinsajo
  const giro = t > SECRET + 0.3 && t < REBEL + 0.2;
  R.actor(EL.vigilante, 62, 158, t, { dir: giro ? 1 : 1, habla: false, sorpresa: giro, dedo: giro && t > SECRET + 0.6 });
  const xp = 150, sueloP = 152, opera = (t > HEAD - 0.2 && t < HEAD + 0.6) || (t > REBEL - 0.4 && t < REBEL + 0.1);
  R.actor(EL.plutarch, xp, sueloP, t, { dir: t > OJO + 0.3 && t < FIRE - 0.2 ? -1 : 1, dedo: opera, sonrisa: t > REBEL - 0.05 || (t > OJO + 0.4 && t < FIRE), sorpresa: t > SECRET && t < SECRET + 0.4 });
  T.arenaDelante(R, t, { encuadre: 'control', camara: 'consola', dial, sinsajo });
  if (t > SECRET && t < REBEL) R.icono('!', 72, 116, hex('#ffd84a'), K0, 1);
};
const efectos = [[0.3, 'puerta'], [PODER, 'brillo'], [3.56, 'whoosh'], [ROSAS + 0.35, 'pop'], [PLUT, 'lapiz'], [EFFIE + 0.6, 'pop'], [OJO + 0.1, 'zumbido'], [FIRE, 'flash'], [HEAD + 0.05, 'interruptor'], [SECRET, 'brillo'], [REBEL - 0.25, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 50 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-plato'] = ('El plató', '''// JH-PLATO (frases 31–32), Juegos 50 (y 75 en los cuadros de los vencedores). Cuatro planos:
// 1. los sillones del plató: Caesar entrevista a un tributo; en «Caesar» se vuelve al público con los brazos arriba y
//    aplauden; en «interview host» le acerca el micrófono al chico, que se asusta y contesta;
// 2. (corte en «And Glenn») la avenida: Drusilla cruza abanicándose con Haymitch y Maysilee detrás; en «escort» se vuelve
//    y les señala el camino; Haymitch se entretiene mirando los coches y ella le da un abanicazo de hollín;
// 3. (corte en «and three victors») el museo de los vencedores: tres retratos de Beetee, Wiress y Mags ya mayores
//    (canas); en «victors» se encienden uno a uno; dos capitolinos los señalan y en «come back» los retratos se giran;
// 4. (corte en «25») el cuadro de cerca: un reloj gira hacia atrás veinticinco años (la barra baja de 75 a 50) y aparecen
//    los tres jóvenes en sus sillas: Beetee levanta el cable que chispea, Wiress la aguja y Mags el anzuelo, cada uno en
//    su nombre.''', AYUDAS + r'''
const c = (f) => en('caesar', f), v = (f) => en('ganadores', f);
const P2 = c(0.499), P3 = v(0), P4 = v(0.485);
const CAESAR = c(0.136), HOST = c(0.335), DRU = c(0.611), ESCORT = c(0.846);
const VICT = v(0.048), CATCH = v(0.245), BACK = v(0.345), YOUNG = v(0.572), BEETEE = v(0.712), WIRESS = v(0.791), MAGS = v(0.915);
// ── plano 1: los sillones ──
const micro = (mx, my) => { R.linea(mx, my, mx + 3, my - 3, hex('#2a2a34')); R.disco(mx + 4, my - 4, 2, K0); R.pset(mx + 4, my - 4, hex('#c8ccd8')); R.pset(mx + 3, my - 5, hex('#ffffff')); };
const p1 = (t) => {
  const ap = t > CAESAR + 0.2 && t < HOST ? 1 : 0.35;
  T.capitolio(R, t, { encuadre: 'plato', camara: 'sillones', aplausos: ap });
  T.tinte(R, 16, 179, [90, 20, 70], 0.12);
  const ta = t > CAESAR + 0.15 && t < CAESAR + 0.95, tiende = t > HOST - 0.35 && t < P2 - 0.1;
  const ca = R.actor(EL.caesar, 112, 158, t, { dir: ta ? -1 : 1, brazos: ta, sostiene: tiende ? [134, 134] : undefined, sonrisa: true, habla: !ta && !tiende && Math.sin(t * 9) > 0 });
  if (tiende) micro(ca.mano[0], ca.mano[1]);
  const contesta = t > HOST + 0.4 && t < P2;
  R.actor(EL.tributoChico, 208, 158, t, { dir: -1, sorpresa: t > HOST - 0.3 && t < HOST + 0.4, habla: contesta && Math.sin(t * 11) > 0, sonrisa: t < HOST - 0.3 });
  if (t > HOST - 0.3 && t < HOST + 0.4) R.icono('!', 214, 112, hex('#ffffff'), K0, 1);
  if (ta) for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2, r = 12 + tramo(t, CAESAR + 0.15, CAESAR + 0.6) * 10; R.pset(Math.round(119 + Math.cos(an) * r), Math.round(118 + Math.sin(an) * r * 0.7), hex('#fff4b0')); }
  confeti(t, 24, 40, 270, 18, 170, 5, CAESAR + 0.2);
};
// ── plano 2: la avenida ──
const hollin = (x, y, f) => { for (let i = 0; i < 9; i++) { const an = i * 0.7, r = 2 + f * (6 + i); R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.6 - f * 6), mez(hex('#3a3a40'), hex('#8a8a90'), f)); } };
const p2 = (t) => {
  T.capitolio(R, t, { encuadre: 'avenida' });
  const llega = tramo(t, P2 + 0.05, DRU - 0.05), xd = Math.round(lerp(300, 168, llega));
  const vuelve = t > ESCORT - 0.2 && t < ESCORT + 0.9, sacude = t > ESCORT + 0.3 && t < ESCORT + 0.9;
  const sale = tramo(t, ESCORT + 1.0, P3 + 0.2), off = lerp(0, -200, sale);
  const xh = Math.round(lerp(340, 214, tramo(t, P2 + 0.4, DRU + 0.3)) + off), xm = Math.round(lerp(360, 240, tramo(t, P2 + 0.6, DRU + 0.5)) + off);
  const andH = (t > P2 + 0.4 && t < DRU + 0.3) || (sale > 0 && sale < 1), mirando = t > DRU + 0.5 && t < ESCORT + 0.3;
  R.actor(EL.maysilee, xm, 166, t, { dir: sale > 0 ? -1 : -1, anda: (t > P2 + 0.6 && t < DRU + 0.5) || (sale > 0 && sale < 1), enfado: t > DRU + 0.5 && t < ESCORT + 1 });
  R.actor(EL.haymitch, xh, 166, t, { dir: mirando ? 1 : -1, anda: andH, sorpresa: sacude, sonrisa: mirando, salto: sacude ? Math.round(Math.sin((t - ESCORT - 0.3) / 0.6 * Math.PI) * 4) : 0 });
  if (sacude) hollin(xh + 7, 150, tramo(t, ESCORT + 0.3, ESCORT + 0.9));
  R.actor(EL.drusilla, Math.round(xd + off), 166, t, { dir: vuelve ? 1 : -1, anda: (llega > 0 && llega < 1) || (sale > 0 && sale < 1), dedo: vuelve && !sacude, enfado: vuelve });
  if (vuelve && !sacude) R.icono('!', Math.round(xd + off) + 6, 112, hex('#ffd84a'), K0, 1);
};
// ── plano 3: el museo de los vencedores ──
const viejo = { H: hex('#b8b8c0'), h: hex('#e0e0e6') };
const retrato = (def, objeto, fondo, k) => (R_, t, [x0, y0, x1, y1]) => {
  const enc = tramo(t, VICT - 0.2 + k * 0.3, VICT + 0.3 + k * 0.3);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0), d = ((x * 3 + y) % 5 === 0); R.pset(x, y, mez(d ? mez(fondo, K0, 0.2) : fondo, hex('#2a1a2a'), u * 0.5)); }
  const cx = Math.round((x0 + x1) / 2);
  for (let y = y1 - 14; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x + y) % 3 ? hex('#5a3a2a') : hex('#4a2e20'));
  R.actor(def, cx - 7, y1 + 4, t, { dir: t > BACK && t < BACK + 1.6 ? -1 : 1, pal: viejo, sonrisa: t > BACK, quieto: t < BACK });
  objeto(R, cx + 18, y1 - 6, t);
  if (enc > 0 && enc < 1) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2) aclara(x, y, 0.5 * Math.sin(enc * Math.PI));
};
const objCable = (R_, x, y, t) => { T.PIEZAS_JH.cable(R, x, y, { s: 2 }); if (Math.floor(t * 6) % 3 === 0) { R.pset(x + 2, y - 14, hex('#fff4a0')); R.pset(x + 4, y - 16, hex('#a0e8ff')); } };
const objAguja = (R_, x, y, t) => T.PIEZAS_JH.aguja(R, x, y, { s: 2 });
const objAnzuelo = (R_, x, y, t) => T.PIEZAS_JH.anzuelo(R, x, y + Math.round(Math.sin(t * 2) * 1), { s: 2 });
const CUADROS = [retrato(EL.beetee, objCable, hex('#3a6a8a'), 0), retrato(EL.wiress, objAguja, hex('#8a6a9a'), 1), retrato(EL.mags, objAnzuelo, hex('#3a8a7a'), 2)];
const p3 = (t) => {
  T.capitolio(R, t, { encuadre: 'museo', cuadros: CUADROS });
  const u = tramo(t, P3 + 0.05, VICT + 0.3), x1 = Math.round(lerp(-16, 96, u));
  const senala = t > CATCH - 0.1 && t < BACK - 0.1, asombro = t > BACK && t < BACK + 0.8;
  R.actor(EL.capitolino1, x1, 162, t, { dir: 1, anda: u > 0 && u < 1, dedo: senala, sorpresa: asombro, sonrisa: t > BACK + 0.8 });
  const v2 = tramo(t, BACK + 0.6, P4 - 0.1);
  R.actor(EL.capitolino2, Math.round(lerp(204, 220, v2)), 162, t, { dir: t < VICT + 0.6 ? 1 : -1, anda: v2 > 0 && v2 < 1, sorpresa: asombro, sonrisa: !asombro, dedo: t > VICT + 0.6 && t < CATCH - 0.2 });
  if (asombro) { R.icono('!', x1 + 6, 124, hex('#ffffff'), K0, 1); R.icono('!', 212, 124, hex('#ffffff'), K0, 1); }
  T.capitolioDelante(R, t, { encuadre: 'museo', cuadros: CUADROS });
};
// ── plano 4: el cuadro grande — el reloj que vuelve atrás y los tres jóvenes ──
const silla = (x, base) => { rr(x - 9, base - 22, x + 9, base - 20, hex('#e8b830')); rr(x - 9, base - 20, x - 8, base, hex('#c8901a')); rr(x + 8, base - 20, x + 9, base, hex('#c8901a'));
  rr(x - 7, base - 19, x + 7, base - 8, hex('#a82a5a')); for (let i = -6; i <= 6; i += 3) R.pset(x + i, base - 14, hex('#e85a8a')); rr(x - 10, base - 8, x + 10, base - 6, hex('#e8b830')); R.linea(x - 10, base - 8, x + 10, base - 8, hex('#fff0a0')); };
const cuadroGrande = (R_, t, [x0, y0, x1, y1]) => {
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2) - 4;
  // el fondo: un salón de los vencedores pintado, con columnas y cortinas
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0), col = ((x - x0) % 40) < 6; R.pset(x, y, col ? mez(hex('#e8d8c8'), hex('#a89888'), u) : mez(((x + y) & 3) === 0 ? hex('#5a2a6a') : hex('#4a2258'), hex('#2a1238'), u)); }
  for (let y = y1 - 18; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x >> 2) + (y >> 1)) % 2 ? hex('#7a4a2a') : hex('#6a3e22'));
  const reloj = 1 - tramo(t, YOUNG + 0.2, YOUNG + 0.7);
  const jovenes = tramo(t, YOUNG + 0.3, YOUNG + 0.8);
  if (jovenes > 0) {
    const sitios = [[cx - 62, EL.beetee, BEETEE], [cx, EL.wiress, WIRESS], [cx + 62, EL.mags, MAGS]];
    for (const [x, def, T0] of sitios) {
      const luz = tramo(t, T0 - 0.1, T0 + 0.3); silla(x, y1 - 6);
      if (luz > 0) { foco(x, y0, y1 - 4, 4, 18, 0.25 * luz); charco(x, y1 - 6, 18, 3, 0.3 * luz); }
      const a = R.actor(def, x - 7, y1 - 4, t, { dir: 1, sostiene: luz > 0.5 ? [x + 10, y1 - 34] : undefined, sonrisa: luz > 0, quieto: luz === 0 });
      if (luz > 0.5) { const [mx, my] = a.mano;
        if (def === EL.beetee) { T.PIEZAS_JH.cable(R, mx, my + 3, { s: 1 }); if (Math.floor(t * 8) % 2) for (let i = 0; i < 4; i++) R.pset(mx + Math.round(Math.cos(i * 1.6 + t * 9) * 4), my - 3 + Math.round(Math.sin(i * 1.6 + t * 9) * 3), i % 2 ? hex('#fff4a0') : hex('#a0e8ff')); }
        if (def === EL.wiress) T.PIEZAS_JH.aguja(R, mx, my + 3, { s: 1 });
        if (def === EL.mags) T.PIEZAS_JH.anzuelo(R, mx, my + 4, { s: 1 }); }
      if (luz > 0 && luz < 1) for (let i = 0; i < 6; i++) { const an = i / 6 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * (8 + luz * 12)), Math.round(y1 - 30 + Math.sin(an) * (6 + luz * 8)), hex('#fff4b0')); }
    }
  }
  if (reloj > 0) {
    // el reloj: esfera de oro con 12 marcas; las agujas giran hacia atrás cada vez más deprisa
    const r = 34 * (0.4 + 0.6 * reloj);
    R.disco(cx, cy, r + 3, hex('#8a5a10')); R.disco(cx, cy, r + 2, hex('#e8b830')); R.disco(cx, cy, r, hex('#fbf4dc'));
    for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; R.linea(Math.round(cx + Math.cos(an) * r * 0.8), Math.round(cy + Math.sin(an) * r * 0.8), Math.round(cx + Math.cos(an) * r * 0.93), Math.round(cy + Math.sin(an) * r * 0.93), k % 3 ? hex('#8a7a5a') : K0); }
    const gira = tramo(t, P4 + 0.1, YOUNG + 0.3), ang = -Math.PI / 2 - gira * gira * Math.PI * 2 * 25;
    R.linea(cx, cy, Math.round(cx + Math.cos(ang) * r * 0.85), Math.round(cy + Math.sin(ang) * r * 0.85), hex('#a82a2a'));
    R.linea(cx, cy, Math.round(cx + Math.cos(ang / 12) * r * 0.55), Math.round(cy + Math.sin(ang / 12) * r * 0.55), K0);
    R.disco(cx, cy, 2, hex('#e8b830'));
    // la flecha que gira hacia atrás alrededor de la esfera
    for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 - k * 0.18 - t * 4; R.pset(Math.round(cx + Math.cos(an) * (r + 7)), Math.round(cy + Math.sin(an) * (r + 7)), k === 0 ? hex('#ffffff') : hex('#ffd84a')); }
    if (gira > 0) R.numero(String(Math.round(25 * Math.min(1, gira * 1.2))), cx + Math.round(r) + 14, cy + 6, { tam: 16 });
  }
};
const CUADROS4 = [CUADROS[0], cuadroGrande, CUADROS[2]];
const p4 = (t) => {
  T.capitolio(R, t, { encuadre: 'museo', camara: 'cuadro', cual: 1, cuadros: CUADROS4 });
  const aplaude = t > MAGS + 0.2;
  R.actor(EL.capitolino2, 26, 172, t, { dir: 1, sorpresa: t > P4 + 0.2 && t < YOUNG + 0.4, sonrisa: t > YOUNG + 0.4, brazos: aplaude && Math.floor(t * 6) % 2 === 0, dedo: t > BEETEE && t < MAGS });
  T.capitolioDelante(R, t, { encuadre: 'museo', camara: 'cuadro', cual: 1, cuadros: CUADROS4 });
};
const año = (t) => t < P3 ? 50 : t < P4 + 0.1 ? 75 : Math.round(75 - 25 * tramo(t, P4 + 0.1, YOUNG + 0.3));
const efectos = [[CAESAR + 0.2, 'publico'], [HOST - 0.3, 'pop'], [DRU, 'claxon'], [ESCORT + 0.3, 'palmada'], [VICT, 'brillo'], [BACK, 'flash'], [P4 + 0.15, 'tic'], [YOUNG + 0.3, 'brillo'], [BEETEE, 'zumbido'], [WIRESS, 'pop'], [MAGS, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['jh-vuelven'] = ('Vuelven', '''// JH-VUELVEN (frase 33), Juegos 74. Dos planos:
// 1. el cine: en la pantalla, la cuenta atrás de película 3·2·1; en «Jennifer Lawrence» se enciende la silueta de la
//    trenza de Katniss; en «October» cae una hoja de calendario con un 10; el pan con ojos se asusta y luego se ríe en su
//    butaca, junto a Atom;
// 2. (corte en «She») la pantalla de cerca, desde las butacas (fondo local): la trenza ya encendida; en «Josh Hutcherson»
//    se enciende el pan de Peeta y en «Woody Harrelson» la petaca de Haymitch; en «coming back» el pan con ojos salta de
//    la butaca y vuelan las palomitas.''', AYUDAS + r'''
const l = (f) => en('lawrence', f);
const P2 = l(0.521), SURP = l(0.011), JEN = l(0.223), OCT = l(0.368), JOSH = l(0.542), WOODY = l(0.742), BACK = l(0.856);
// las tres siluetas (trenza, pan, petaca), apagadas (sombra) o encendidas (luz de oro con halo)
const halo = (x, y, r, col, k) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1 && ((i + j) & 1 || d < 0.5)) aclara(x + i, y + j, k * (1 - d), col); } };
const trenza = (x, base, col, filo, e = 1) => { const cab = (d, c) => { R.disco(x, base - 26 * e, 9 * e + d, c); R.poligono([[x - 16 * e - d, base + 1], [x - 12 * e - d, base - 10 * e - d], [x + 12 * e + d, base - 10 * e - d], [x + 16 * e + d, base + 1]], c); for (let k = 0; k < 7; k++) R.disco(x + (8 + Math.sin(k * 0.6) * 2) * e, base + (-22 + k * 3.2) * e, 2.6 * e + d, c); };
  cab(1, filo); cab(0, col); if (e > 1) for (let k = 0; k < 7; k++) R.linea(Math.round(x + 6 * e), Math.round(base + (-23 + k * 3.2) * e), Math.round(x + 10 * e), Math.round(base + (-21 + k * 3.2) * e), filo); };
const panP = (x, base, col, filo, e = 1) => { for (const [d, c] of [[1, filo], [0, col]]) { const rx = 15 * e + d, ry = 5 * e + d, yc = base - 4 * e - 4.5 * e; for (let j = Math.floor(-ry); j <= ry; j++) for (let i = Math.floor(-rx); i <= rx; i++) { const u = i / rx, v = j / ry; if (u * u + v * v <= 1) R.pset(Math.round(x + i), Math.round(yc + j), c); } }
  for (const i of [-8, 0, 8]) R.linea(Math.round(x + (i - 2) * e), Math.round(base - 12 * e), Math.round(x + (i + 2) * e), Math.round(base - 7 * e), filo); };
const petaca = (x, base, col, filo, e = 1) => { for (const [d, c] of [[1, filo], [0, col]]) { R.poligono([[x - 9 * e - d, base], [x - 9 * e - d, base - 18 * e], [x - 5 * e - d, base - 24 * e - d], [x + 5 * e + d, base - 24 * e - d], [x + 9 * e + d, base - 18 * e], [x + 9 * e + d, base]], c); rr(x - 3 * e - d, base - 30 * e - d, x + 3 * e + d, base - 24 * e, c); }
  if (e > 1 && c0(col)) { R.linea(Math.round(x - 6 * e), Math.round(base - 16 * e), Math.round(x - 6 * e), Math.round(base - 4 * e), hex('#ffffff')); } };
const c0 = (col) => col !== hex('#0e0a1a');
const escena3 = (t, [x0, y0, x1, y1], esc) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, ((x + y) & 3) === 0 ? mez(hex('#2a2a6a'), hex('#5a2a5a'), u) : mez(hex('#1a1a4a'), hex('#3a1a3a'), u)); }
  // estrellas y un horizonte de montes en la película
  for (let i = 0; i < 30; i++) { const x = Math.round(x0 + hh(i, 1, 21) * (x1 - x0 - 24)), y = Math.round(y0 + 6 + hh(i, 2, 21) * (y1 - y0) * 0.55); if (Math.sin(t * 3 + i) > -0.3) R.pset(x, y, hex('#c8c8f0')); }
  for (let x = x0; x <= x1; x++) { const h = Math.round((Math.sin(x * 0.05) * 6 + Math.sin(x * 0.13 + 1) * 3 + 10) * esc); for (let y = y1 - h; y <= y1; y++) R.pset(x, y, y === y1 - h ? hex('#3a2a5a') : hex('#1a1230')); }
  const W = x1 - x0, base = y1 - Math.round(6 * esc), xs = [x0 + W * 0.2, x0 + W * 0.5, x0 + W * 0.8].map(Math.round);
  const enc = [tramo(t, JEN - 0.05, JEN + 0.3), tramo(t, JOSH - 0.05, JOSH + 0.3), tramo(t, WOODY - 0.05, WOODY + 0.3)];
  const fig = [trenza, panP, petaca];
  xs.forEach((x, k) => { const on = enc[k] > 0.5, col = on ? [hex('#6a3a1a'), hex('#c8843a'), hex('#9aa0b0')][k] : hex('#0e0a1a'), filo = on ? (Math.floor(t * 5 + k) % 2 ? hex('#ffe070') : hex('#f0b030')) : hex('#2a2440');
    if (on) halo(x, base - Math.round(14 * esc), Math.round(26 * esc), hex('#ffd860'), 0.55);
    fig[k](x, base, col, filo, esc);
    if (enc[k] > 0 && enc[k] < 1) for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * (10 + enc[k] * 22) * esc), Math.round(base - 14 * esc + Math.sin(an) * (8 + enc[k] * 14) * esc), hex('#fff4b0')); } });
};
// ── plano 1: la sala ──
const pantalla1 = (R_, t, P) => {
  const [x0, y0, x1, y1] = P, cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  if (t < JEN - 0.05) { // la cuenta atrás de película
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, hh(x, y, Math.floor(t * 12)) > 0.93 ? hex('#5a5a5a') : hex('#b8b0a0'));
    R.linea(x0, cy, x1, cy, hex('#3a3a3a')); R.linea(cx, y0, cx, y1, hex('#3a3a3a'));
    for (const r of [26, 30]) for (let k = 0; k < 90; k++) { const an = k / 90 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#3a3a3a')); }
    const f = (t * 1.25) % 1, an0 = -Math.PI / 2; for (let r = 0; r < 26; r++) for (let k = 0; k <= 40 * f; k++) { const an = an0 + k / 40 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#8a8478')); }
    R.numero(String(Math.max(1, 3 - Math.floor(t * 1.25))), cx + 1, cy + 8, { tam: 16, centro: true });
  } else escena3(t, P, 1);
  if (t > OCT - 0.1) { const u = tramo(t, OCT - 0.1, OCT + 0.25), x = x1 - 34, y = Math.round(lerp(y0 - 30, y0 + 6, u));
    rr(x, y, x + 26, y + 26, K0); rr(x + 1, y + 1, x + 25, y + 25, hex('#fbf4e4')); rr(x + 1, y + 1, x + 25, y + 7, hex('#d83a3a')); for (const i of [6, 13, 20]) { R.pset(x + i, y, hex('#c8ccd8')); R.pset(x + i, y - 1, hex('#8a8e9a')); }
    R.numero('10', x + 14, y + 22, { centro: true, color: K0, sombra: false }); }
};
const p1 = (t) => {
  const r = T.hoy(R, t, { encuadre: 'cine', pantalla: pantalla1 });
  const salta = t > JEN && t < JEN + 0.5 ? Math.round(Math.sin((t - JEN) / 0.5 * Math.PI) * 5) : 0;
  const ex = t < SURP + 0.1 ? 'normal' : t < JEN + 0.6 ? 'susto' : 'risa';
  T.pan(R, 148, 162 - salta, t, { dir: 1, expresion: ex });
  R.atomo(174, 148, t, { r: 7 });
  // el que llega tarde, por el pasillo
  const v = tramo(t, 0.4, P2), xl = Math.round(lerp(10, 26, v)); R.actor(EL.capitolino1, xl, 174 - Math.round(v * 2), t, { dir: 1, anda: v > 0 && v < 1, sorpresa: t > JEN && t < JEN + 0.8 });
  T.hoyDelante(R, t, { encuadre: 'cine', pantalla: pantalla1 });
};
// ── plano 2: la pantalla desde las butacas (fondo local, en un búfer) ──
let fondo2 = null;
const pintaFondo2 = () => {
  fondo2 = R.nuevo(); const prev = R.usar(fondo2);
  // la pared acolchada de la sala (capitoné granate con botones)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const a = ((x + y * 1.0) % 14 + 14) % 14, b = ((x - y) % 14 + 14) % 14, linea = a < 1 || b < 1;
    R.pset(x, y, linea ? hex('#3a0e1a') : ((x * 7 + y * 3) % 11 === 0 ? hex('#6a1e30') : hex('#5a1828'))); if (a < 1 && b < 1) R.pset(x, y, hex('#d8a040')); }
  // el marco de la pantalla y la pantalla
  rr(28, 18, 292, 134, hex('#0a0608')); rr(30, 20, 290, 132, hex('#1a1418'));
  // el telón de los lados con sus pliegues
  for (const [xa, xb, lado] of [[0, 40, 1], [280, 319, -1]]) for (let x = xa; x <= xb; x++) for (let y = 14; y < 150; y++) { const f = Math.sin((x - xa) * 0.55) * 0.5 + 0.5, recog = lado > 0 ? (y > 96 ? (y - 96) * 0.25 : 0) : (y > 96 ? (y - 96) * 0.25 : 0);
    if (lado > 0 ? x > xb - recog : x < xa + recog) continue; R.pset(x, y, f > 0.8 ? hex('#e84a5a') : f > 0.45 ? hex('#b82a3e') : f > 0.15 ? hex('#8a1a2e') : hex('#5a0e1e')); }
  // los faldones de terciopelo de las esquinas de arriba (tranquilos: detrás va Atom), con su fleco
  for (const [xa, xb] of [[0, 56], [264, 319]]) for (let x = xa; x <= xb; x++) { const d = xa === 0 ? xb - x : x - xa, yb = Math.round(16 + Math.min(34, d * 0.9));
    for (let y = 14; y <= yb; y++) R.pset(x, y, Math.sin(x * 0.18) > 0.6 ? hex('#8a1a2e') : hex('#7a1628'));
    R.pset(x, yb + 1, hex('#e8b830')); if (x % 2) R.pset(x, yb + 2, hex('#a87a10')); }
  for (const x of [22, 298]) { R.disco(x, 100, 3, hex('#e8b830')); R.linea(x - 4, 102, x + 4, 102, hex('#a87a10')); R.pset(x - 1, 99, hex('#fff0a0')); }
  // la bambalina de arriba con flecos de oro
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.3) * 0.5 + 0.5; if (y > 13 + Math.sin(x * 0.3) * 2) continue; R.pset(x, y, f > 0.7 ? hex('#c83a4a') : f > 0.3 ? hex('#9a2236') : hex('#6a1426')); }
  for (let x = 0; x < 320; x++) { const y = Math.round(14 + Math.sin(x * 0.3) * 2); R.pset(x, y, hex('#e8b830')); if (x % 2) R.pset(x, y + 1, hex('#a87a10')); if (x % 4 === 0) R.pset(x, y + 2, hex('#e8b830')); }
  // el escenario de tablas con su tira de luces
  rr(0, 134, 319, 146, hex('#3a2418')); for (let x = 0; x < 320; x += 13) R.linea(x, 135, x, 146, hex('#2a180e')); rr(0, 134, 319, 134, hex('#8a5a3a'));
  // el suelo y las butacas de la primera fila (respaldos rojos, de espaldas)
  rr(0, 147, 319, 179, hex('#1a0e14'));
  for (let i = 0; i < 9; i++) { const x = 4 + i * 36; if (i === 4) continue; rr(x, 150, x + 30, 179, K0); rr(x + 1, 151, x + 29, 179, hex('#8a1a2a')); rr(x + 1, 151, x + 29, 152, hex('#c83a4a')); for (let y = 156; y < 179; y += 5) R.linea(x + 3, y, x + 27, y, hex('#6a1020')); }
  // la salida de emergencia (verde, solo una flecha)
  rr(6, 120, 22, 128, K0); rr(7, 121, 21, 127, hex('#2ac85a')); R.linea(10, 124, 17, 124, hex('#eaffea')); R.pset(16, 123, hex('#eaffea')); R.pset(16, 125, hex('#eaffea'));
  R.usar(prev);
};
const p2 = (t) => {
  if (!fondo2) pintaFondo2();
  R.copiar(fondo2);
  const S = [32, 22, 288, 130];
  R.recorte(S); escena3(t, S, 2);
  // el grano de la película y una raya que baja
  for (let i = 0; i < 40; i++) { const x = Math.round(32 + hh(i, Math.floor(t * 12), 1) * 256), y = Math.round(22 + hh(i, Math.floor(t * 12), 2) * 108); aclara(x, y, 0.4); }
  { const x = 60 + Math.floor(t * 7) % 220; for (let y = 22; y <= 130; y += 2) aclara(x, y, 0.15); }
  R.recorte(null);
  // las luces del escenario que corren
  for (let x = 2; x < 320; x += 6) R.pset(x, 140, (x / 6 + Math.floor(t * 8)) % 4 === 0 ? hex('#fff0a0') : hex('#a87a30'));
  // el haz del proyector, por encima de las cabezas, con motas
  for (let i = 0; i < 26; i++) { const x = Math.round(160 + (hh(i, 1, 3) - 0.5) * 120 + Math.sin(t + i) * 4), y = Math.round(140 - ((hh(i, 2, 3) * 120 + t * 6) % 120)); if (y > 16) aclara(x, y, 0.35); }
  // el público de espaldas en la primera fila: cabezas con el filo de la luz de la pantalla
  const cabezas = [[24, hex('#3a2418')], [62, hex('#c8a060')], [96, hex('#1a1a20')], [204, hex('#8a3a1a')], [238, hex('#2a2a30')], [276, hex('#d8c8a8')]];
  cabezas.forEach(([x, pelo], i) => { const y = 148 + (i % 2) * 2 + Math.round(Math.sin(t * 1.3 + i) * 0.6); R.disco(x, y, 8, pelo); R.disco(x, y + 12, 11, hex('#14101a')); for (let k = -6; k <= 6; k++) aclara(x + k, y - Math.round(Math.sqrt(Math.max(0, 64 - k * k))), 0.45, hex('#ffe8a0')); });
  // palomitas en el reposabrazos y el pan con ojos que salta de su butaca
  const sube = tramo(t, BACK - 0.1, BACK + 0.3), baja = tramo(t, BACK + 0.8, E.duracion), y = Math.round(186 - 40 * Math.sin(sube * Math.PI / 2) + 30 * baja * baja);
  { const x = 150; rr(x - 6, 160, x + 6, 176, K0); rr(x - 5, 161, x + 5, 176, hex('#e83a3a')); for (let k = -4; k <= 4; k += 4) R.linea(x + k, 162, x + k, 176, hex('#ffffff')); for (let k = 0; k < 7; k++) R.disco(x - 5 + k * 1.7, 159 - (k % 2), 1.6, hex('#fff4d0')); }
  T.pan(R, 122, y, t, { s: 2, expresion: t > BACK - 0.1 ? 'risa' : 'normal', dir: 1, saluda: t > BACK + 0.2 });
  if (sube > 0) for (let i = 0; i < 10; i++) { const f = tramo(t, BACK, BACK + 1.2 + i * 0.05); if (f > 0 && f < 1) R.disco(Math.round(150 + (i - 5) * 4 * f), Math.round(156 - Math.sin(f * Math.PI) * (26 + i * 2) + f * 20), 1.4, hex('#fff4d0')); }
};
const efectos = [[0.45, 'tic'], [1.25, 'tic'], [JEN, 'flash'], [OCT, 'papel'], [JOSH, 'flash'], [WOODY, 'flash'], [BACK, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 74 });
''')
