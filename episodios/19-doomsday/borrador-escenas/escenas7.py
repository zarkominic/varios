# Borrador de escenas del ep19, grupo S7: do-616 y do-thunder (con el movimiento ya hecho).
E = {}

# ayudas comunes (se pegan al principio de cada cuerpo)
AY = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const KK = hex('#1a1014'), BL = hex('#ffffff');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BUF = {};
const bufer = (clave, dibuja) => { if (!BUF[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); BUF[clave] = b; } return BUF[clave]; };
const fondo = (clave, dibuja) => R.copiar(bufer(clave, dibuja));
// capa con transparencia (lo que no se pintó en el búfer, 0, deja ver lo de debajo), de la fila y0 a la y1
const capa = (clave, dibuja, y0 = 0, y1 = 179) => { const b = bufer(clave, dibuja); for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const c = b[y * 320 + x]; if (c) R.pset(x, y, c); } };
const rampa = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[f > bay(x, y) ? i + 1 : i]); } };
const caja = (x0, y0, x1, y1, c, cl, cs) => { R.rect(x0, y0, x1, y1, KK); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cl); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cl); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cs); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, cs); };
// aclara u oscurece por tramado lo que ya hay (luz, flash, sombra); con (cx, cy, r) cae en redondo
const tinta = (x0, y0, x1, y1, col, a, cx = null, cy = null, r = 0) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let g = a; if (cx !== null) g *= Math.max(0, 1 - Math.hypot(x - cx, (y - cy) * 1.3) / r); if (g > 0.02 && g * 1.6 > bay(x, y) * 0.9) R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, g))); } };
const nubeT = (cx, cy, w, s, b, l) => { const bolas = [[0, 0, w * 0.3], [-w * 0.3, w * 0.07, w * 0.22], [w * 0.28, w * 0.06, w * 0.24], [-w * 0.1, -w * 0.12, w * 0.24]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), s);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy - 1), Math.round(r * 0.9), b);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2 - r * 0.2), Math.round(r * 0.5), l); };
const ave = (x, y, t, k, c) => { const a = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - 1 - a, c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - 1 - a, c); };
// línea gruesa con borde (w: medio grosor)
const trazo = (pts, c, w = 1, borde = KK) => { for (const [cc, ww] of [[borde, w + 1], [c, w]]) { if (cc == null) continue; for (let k = 1; k < pts.length; k++) { const [x0, y0] = pts[k - 1], [x1, y1] = pts[k], n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2));
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; for (let dy = -ww; dy <= ww; dy++) for (let dx = -ww; dx <= ww; dx++) if (dx * dx + dy * dy <= ww * ww + 0.5) R.pset(Math.round(x + dx), Math.round(y + dy), cc); } } } };
const pulso = (t, a, d = 0.5) => { const u = (t - a) / d; return u < 0 || u > 1 ? 0 : Math.sin(u * Math.PI); };
// ── el reparto que no está en ELENCO_DO ──
// el presidente (inventado, sin parecido): pelo blanco, bigote, traje azul marino y corbata roja
const PRESI = { ...EL.steveViejo, bigote: true, pal: { ...EL.steveViejo.pal, C: hex('#2a3256'), c: hex('#1c2240'), F: hex('#2a3256'), o: hex('#c8303a') } };
// el preso de la cabeza enorme: piel verde, mono naranja de presidiario (la cabeza la pinta cabezon() encima)
const LIDER = { ...EL.consejeroCalvo, pal: { ...EL.consejeroCalvo.pal, S: hex('#8ac86a'), s: hex('#5a9a4a'), C: hex('#e8782a'), c: hex('#b8561a'), F: hex('#e8782a'), W: hex('#e8782a'), o: hex('#e8782a') } };
// la que presenta al equipo: melena pelirroja corta y traje oscuro
const VALE = { ...EL.sue, pal: { ...EL.sue.pal, H: hex('#8a3418'), h: hex('#b04a24'), C: hex('#2a2a34'), c: hex('#1c1c24'), W: hex('#2a2a34'), F: hex('#2a2a34'), X: hex('#2a2a34'), a: hex('#2a2a34'), G: hex('#1c1c24'), I: hex('#1c1c24'), n: hex('#1c1c24') } };
// el escolta y el fotógrafo
const ESCOLTA = { ...EL.ejecutivo, pal: { ...EL.ejecutivo.pal, C: hex('#1c1c24'), c: hex('#f2eee2'), F: hex('#1c1c24'), W: hex('#1c1c24'), o: hex('#1c1c24') } };
// la cabeza enorme del preso: una cúpula verde por encima de los ojos, con su sombra, brillo y venas
const cabezon = (A, t) => { const [cx, yH] = A.cabeza, cy = yH + 2, rx = 11, ry = 12;
  for (let y = cy - ry - 1; y <= yH + 3; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) { const d = Math.hypot((x - cx) / (rx + 0.5), (y - cy) / (ry + 0.5)); if (d > 1.06) continue;
    const u = (x - cx) / rx, v = (y - cy) / ry, luz = -u * 0.6 - v * 0.7;
    R.pset(x, y, d > 0.94 && y < yH + 2 ? KK : luz > 0.55 ? hex('#c8f0a0') : luz > 0.1 ? hex('#9ad87a') : luz > -0.35 ? hex('#7ab85a') : hex('#5a9a4a')); }
  for (const [a, b] of [[[cx - 6, cy - 6], [cx - 3, cy - 8]], [[cx - 3, cy - 8], [cx - 1, cy - 6]], [[cx + 3, cy - 9], [cx + 6, cy - 6]], [[cx + 6, cy - 6], [cx + 5, cy - 3]]]) R.linea(a[0], a[1], b[0], b[1], hex('#4a8a3a'));
  R.pset(cx - 5, cy - 9, BL); R.pset(cx - 4, cy - 9, BL); R.pset(cx - 6, cy - 8, hex('#e8ffd0'));
  if (Math.sin(t * 1.7) > 0.8) { R.pset(cx + 2, cy - 4, hex('#4a8a3a')); } };
// el escudo de Sam (PIEZAS_DO.escudo) con un destello que lo cruza
const escudo = (x, y, r, t, brillo = 0) => { T.PIEZAS_DO.escudo(R, Math.round(x), Math.round(y), { r });
  if (brillo > 0) { const k = Math.round(brillo * 8); R.pset(Math.round(x) - 2, Math.round(y) - 2, BL); for (let i = 1; i <= k; i++) { R.pset(Math.round(x) - 2 + i, Math.round(y) - 2, BL); R.pset(Math.round(x) - 2 - i, Math.round(y) - 2, BL); R.pset(Math.round(x) - 2, Math.round(y) - 2 + i, BL); R.pset(Math.round(x) - 2, Math.round(y) - 2 - i, BL); } } };
// el escudo a la espalda de quien va de lado (antes de pintarlo)
const escudoEspalda = (x, suelo, dir, t) => escudo(x + (dir > 0 ? 2 : 13), suelo - 12, 6, t);
// bocadillo con contorno y piquito hacia (px, py); dentro, lo que pinte f(x0, y0, x1, y1)
const bocadillo = (x0, y0, x1, y1, px, py, f) => { const cx = Math.round((x0 + x1) / 2);
  R.poligono([[cx - 4, y1 - 1], [cx + 4, y1 - 1], [px, py]], KK); R.poligono([[cx - 3, y1 - 2], [cx + 3, y1 - 2], [px, py - 1]], BL);
  R.rect(x0 + 1, y0, x1 - 1, y1, KK); R.rect(x0, y0 + 1, x1, y1 - 1, KK); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 2, x1 - 2, y1 - 2, hex('#d8d8e0')); f(x0, y0, x1, y1); };
// el planeta rojo pequeño (para bocadillos) y el «!» rojo
const planetaRojo = (cx, cy, r) => { R.disco(cx, cy, r + 1, KK); R.disco(cx, cy, r, hex('#d8302a')); R.disco(cx - 1, cy - 1, Math.max(1, r - 2), hex('#f05a3a')); R.pset(cx - Math.round(r / 2), cy - Math.round(r / 2), BL); R.linea(cx - r - 3, cy + 1, cx + r + 3, cy - 1, hex('#f0a040')); };
const exclama = (x, y, c = hex('#d8302a')) => { R.rect(x - 1, y, x + 2, y + 9, KK); R.rect(x, y + 1, x + 1, y + 7, c); R.rect(x - 1, y + 10, x + 2, y + 13, KK); R.rect(x, y + 11, x + 1, y + 12, c); };
// el rayo (el símbolo del equipo nuevo), centrado en (cx, cy), alto 2s
const rayo = (cx, cy, s, c, cs = KK) => { const P = [[0.1, -1], [0.62, -1], [0.22, -0.12], [0.6, -0.12], [-0.3, 1], [-0.02, 0.18], [-0.42, 0.18]].map(([x, y]) => [Math.round(cx + x * s), Math.round(cy + y * s)]);
  R.poligono(P.map(([x, y]) => [x + 1, y + 1]), cs); R.poligono(P, c); R.linea(P[0][0] + 1, P[0][1] + 1, P[2][0], P[2][1], mez(c, BL, 0.5)); };
// el asterisco: seis brazos que giran (ang) de radio r
const asterisco = (cx, cy, r, ang, c, w = 2) => { const P = []; for (let k = 0; k < 3; k++) { const a = ang + k * Math.PI / 3; P.push([[cx - Math.cos(a) * r, cy - Math.sin(a) * r], [cx + Math.cos(a) * r, cy + Math.sin(a) * r]]); }
  for (const p of P) trazo(p, c, w); R.disco(Math.round(cx), Math.round(cy), w + 1, c); R.pset(Math.round(cx) - 1, Math.round(cy) - 1, BL); };
// la «A» del nombre nuevo dentro de un anillo (símbolo, no letra suelta), radio s
const emblemaA = (cx, cy, s, cA, cO) => { R.disco(cx, cy, s + 1, KK); R.disco(cx, cy, s, cO); R.disco(cx, cy, Math.round(s * 0.78), hex('#1a2448'));
  const w = Math.max(1, Math.round(s * 0.13)), top = [cx + s * 0.05, cy - s * 0.82], L = [cx - s * 0.55, cy + s * 0.62], Rr = [cx + s * 0.62, cy + s * 0.62];
  trazo([L, top, Rr], cA, w); trazo([[cx - s * 0.3, cy + s * 0.14], [cx + s * 1.05, cy + s * 0.14]], cA, Math.max(1, w - 1)); R.pset(Math.round(top[0]) - 1, Math.round(top[1]) + 2, BL); };
// el papel de abogado con la ® gigante (el gag 6): hoja con renglones en barras y la ® en un círculo
const papelR = (x, y, t) => { const x0 = x - 13, y0 = y - 30, x1 = x + 13, y1 = y + 4;
  R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, mez(R.pget(x1 + 2, y1 + 2), KK, 0.5)); caja(x0, y0, x1, y1, hex('#f6f2e4'), BL, hex('#d8d0b8'));
  R.poligono([[x1 - 5, y0], [x1, y0], [x1, y0 + 5]], hex('#d8d0b8')); R.linea(x1 - 5, y0, x1 - 5, y0 + 5, KK); R.linea(x1 - 5, y0 + 5, x1, y0 + 5, KK);
  const cx = x, cy = y0 + 15; R.disco(cx, cy, 11, hex('#c8303a')); R.disco(cx, cy, 9, hex('#f6f2e4'));
  const G = ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'];
  G.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.rect(cx - 5 + i * 2, cy - 7 + j * 2, cx - 4 + i * 2, cy - 6 + j * 2, hex('#c8303a')); });
  for (let k = 0; k < 2; k++) R.rect(x0 + 4, y1 - 6 + k * 3, x1 - 4 - k * 6, y1 - 6 + k * 3, hex('#8a8a9a'));
  R.rect(x0 + 4, y0 + 3, x0 + 12, y0 + 3, hex('#8a8a9a')); };
// las alas de metal abiertas de Sam en vuelo (detrás del cuerpo): x, suelo del actor
const alas = (x, suelo, t) => { const sx = x + 7, sy = suelo - 13, bat = Math.sin(t * 9) * 2;
  for (const s of [-1, 1]) for (let k = 0; k < 5; k++) { const L = 20 - k * 3, a = (-0.35 + k * 0.2) + bat * 0.03, ex = sx + s * Math.cos(a) * L, ey = sy - Math.sin(-a) * L * 0.6 - 4 + k * 2 + bat;
    trazo([[sx + s * 3, sy - 2 + k], [ex, ey]], k % 2 ? hex('#8a90a4') : hex('#c8ccd8'), 1); R.pset(Math.round(ex), Math.round(ey), BL); } };
'''

# =====================================================================================================================
E['do-616'] = ('La Tierra 616', '''// DO-616 (frases 42–44), cartela «2025». Seis planos:
// 1. la torre vacía (polvo, la Tierra 616 en la pantalla): el cubo de palomitas entra, mira la pantalla en «616», recoge
//    del suelo la foto polvorienta del equipo, sopla el polvo y, en «no longer exist as a team», llora;
// 2. (fondo local) Washington desde una azotea: cielo tramado, el obelisco y la cúpula, el río, cerezos y la calle con un
//    coche patrulla; en «threats» una pantalla lejana se pone en alerta y las palomitas se asustan con los prismáticos;
//    en «Captain America» Sam cruza el cielo volando con las alas abiertas (corta en «Brave»);
// 3. el despacho: se abre la puerta y entra Sam con el escudo; en «new Captain America» lo levanta y brilla; el
//    presidente le sale al encuentro y, en «Sam Wilson», se dan la mano con el flash del fotógrafo (corta en «Carrying»);
// 4. el escritorio de cerca: el presidente habla, en «asks» señala a Sam, enciende el proyector y, en «back together»,
//    seis figuritas de colores se juntan en un anillo; Sam sonríe; el escolta vigila;
// 5. la celda de cerca: Sam llega al interfono; el preso de la cabeza enorme se acerca al cristal y, en «warning», le
//    avisa (bocadillo con el planeta rojo y «!»); en «attack» late el planeta rojo de su pantalla (corta en «from»);
// 6. la celda entera: el preso se ríe; en «other worlds» el planeta rojo late; en «isn't ready» Sam baja la vista, se da
//    la vuelta y se va hacia la puerta, que se abre.''', AY + r'''
const P2 = en('equipo', 0.754), P3 = en('sam', 0.245), P4 = en('sam', 0.608), P5 = en('advertencia', 0), P6 = en('advertencia', 0.591);
const t616 = en('equipo', 0.095), tOurs = en('equipo', 0.297), tExist = en('equipo', 0.526), tTeam = en('equipo', 0.632), tThreat = en('equipo', 0.912);
const tCap = en('sam', 0.127), tNew = en('sam', 0.399), tSamW = en('sam', 0.511), tAsks = en('sam', 0.778), tBack = en('sam', 0.886), tJunto = en('sam', 0.951);
const tVill = en('advertencia', 0.25), tWarn = en('advertencia', 0.359), tAtt = en('advertencia', 0.497), tWorlds = en('advertencia', 0.643), tReady = en('advertencia', 0.808);
// ── 1 · la torre vacía ──
const fotoEquipo = (x, y, polvo) => { caja(x - 13, y - 19, x + 13, y + 1, hex('#8a5a30'), hex('#b07a44'), hex('#5a3418')); R.rect(x - 11, y - 17, x + 11, y - 1, hex('#8ab8e8')); R.rect(x - 11, y - 6, x + 11, y - 1, hex('#5a9a4a'));
  for (const [i, c, c2] of [[-10, '#c8303a', '#e8b830'], [-5, '#2a4fa8', '#f2eee2'], [0, '#5aa83a', '#3a7a2a'], [5, '#e0c070', '#c8303a']]) { R.rect(x + i, y - 14, x + i + 4, y - 10, KK); R.rect(x + i + 1, y - 13, x + i + 3, y - 11, hex(c)); R.pset(x + i + 2, y - 12, hex(c2)); R.rect(x + i, y - 9, x + i + 4, y - 3, KK); R.rect(x + i + 1, y - 8, x + i + 3, y - 3, hex(c2 === '#f2eee2' ? '#2a4fa8' : c)); R.pset(x + i + 2, y - 7, hex(c2)); }
  R.pset(x - 10, y - 16, BL); R.pset(x - 9, y - 16, BL);
  if (polvo > 0) for (let j = y - 18; j <= y; j++) for (let i = x - 12; i <= x + 12; i++) if (hh(i, j, 5) < polvo * 0.8) R.pset(i, j, hex('#a8a49c')); };
const p1 = (t) => {
  T.washington(R, t, { encuadre: 'torre', polvo: true, pantalla: 'tierra', gente: false });
  // la foto en el suelo hasta que la recoge
  const coge = tOurs + 0.25, sopla = tOurs + 1.0;
  if (t < coge) fotoEquipo(96, 174, 1);
  const u = tramo(t, 1.3, tOurs), x = Math.round(lerp(-24, 78, u)), anda = u > 0 && u < 1;
  const exp = t > tExist ? 'llora' : t > t616 - 0.1 && t < t616 + 1.2 ? 'emocion' : 'normal';
  const P = T.palomitas(R, x, 172, t, { s: 2, dir: 1, anda, expresion: exp });
  if (t >= coge) { const [mx, my] = P.mano; fotoEquipo(mx + 10, my + 4, Math.max(0, 1 - tramo(t, sopla, sopla + 0.5))); }
  // el soplido: una nube de polvo que se va
  const s = tramo(t, sopla, sopla + 1.2); if (s > 0 && s < 1) for (let k = 0; k < 14; k++) { const a = hh(k, 1, 3) * 2.2 - 1.1, d = s * (10 + hh(k, 2, 3) * 16); R.pset(Math.round(P.mano[0] + 14 + Math.cos(a) * d), Math.round(P.mano[1] - 4 + Math.sin(a) * d - s * 6), mez(hex('#c8c4bc'), hex('#5a5e6a'), s)); }
  T.washingtonDelante(R, t, { encuadre: 'torre', polvo: true, pantalla: 'tierra', gente: false });
};
// ── 2 · Washington desde una azotea (fondo local) ──
const CIELO = ['#3a70c0', '#4a80c8', '#5a90d0', '#74a4d8', '#90b8e0', '#b0cce4', '#cadce6'].map(hex);
const lejos = () => {
  // la ciudad lejana en dos términos, el obelisco y la cúpula
  for (let k = 0; k < 26; k++) { const x0 = Math.floor(hh(k, 1, 9) * 330) - 10, w = 10 + Math.floor(hh(k, 2, 9) * 16), y0 = 86 + Math.floor(hh(k, 3, 9) * 16);
    R.rect(x0, y0, x0 + w, 114, hex('#a8b8cc')); R.rect(x0, y0, x0, 114, hex('#c0ccd8')); for (let y = y0 + 3; y < 112; y += 4) for (let x = x0 + 2; x < x0 + w - 1; x += 3) R.pset(x, y, hhx(x, y)); }
  for (let k = 0; k < 18; k++) { const x0 = Math.floor(hh(k, 4, 9) * 330) - 10, w = 12 + Math.floor(hh(k, 5, 9) * 18), y0 = 96 + Math.floor(hh(k, 6, 9) * 10);
    R.rect(x0, y0, x0 + w, 116, hex('#8a9cb4')); R.rect(x0, y0, x0 + w, y0, hex('#b0bccc')); for (let y = y0 + 3; y < 114; y += 3) for (let x = x0 + 2; x < x0 + w - 1; x += 3) R.pset(x, y, hh(x, y, 2) < 0.3 ? hex('#e8e0b0') : hex('#6a7c94')); }
  // la cúpula blanca con columnas
  R.rect(96, 92, 152, 116, hex('#dcdcd4')); R.rect(96, 92, 152, 93, BL); for (let x = 99; x < 150; x += 4) R.rect(x, 96, x + 1, 112, hex('#b8b8b0'));
  R.rect(108, 80, 140, 92, hex('#e8e8e0')); for (let x = 110; x < 140; x += 3) R.pset(x, 86, hex('#b8b8b0'));
  R.disco(124, 80, 14, hex('#b8b8b0')); R.disco(124, 80, 13, hex('#ececea')); R.disco(120, 76, 7, BL); R.rect(105, 80, 143, 92, hex('#e8e8e0')); R.rect(122, 62, 126, 66, hex('#dcdcd4')); R.pset(124, 60, hex('#c8c8c0'));
  for (let x = 108; x < 141; x += 3) R.rect(x, 82, x, 90, hex('#c0c0b8'));
  // el obelisco
  R.poligono([[228, 116], [244, 116], [240, 44], [232, 44]], hex('#e0dcd0')); R.poligono([[236, 116], [244, 116], [240, 44], [236, 44]], hex('#c8c4b8')); R.poligono([[232, 44], [240, 44], [236, 36]], hex('#f0ece0')); R.linea(232, 44, 228, 116, BL);
  for (let y = 50; y < 114; y += 7) R.linea(232 - Math.round((y - 44) * 0.06), y, 240 + Math.round((y - 44) * 0.06), y, hex('#d0ccc0'));
  R.pset(234, 40, hex('#d82a2a')); R.pset(238, 40, hex('#d82a2a'));
};
const hhx = (x, y) => hh(x, y, 1) < 0.25 ? hex('#e8e8d0') : hex('#90a0b8');
const medio = () => {
  // el río con su orilla
  rampa(0, 116, 319, 128, ['#5a8ab8', '#6a9ac4', '#7aa8cc', '#8ab4d0'].map(hex));
  for (let k = 0; k < 40; k++) R.rect(Math.floor(hh(k, 7, 9) * 320), 118 + Math.floor(hh(k, 8, 9) * 9), Math.floor(hh(k, 7, 9) * 320) + 3, 118 + Math.floor(hh(k, 8, 9) * 9), hex('#a8c8e0'));
  // los cerezos y los árboles de la orilla
  for (let k = 0; k < 30; k++) { const x = k * 11 + Math.floor(hh(k, 9, 9) * 6), y = 130, r = 6 + Math.floor(hh(k, 10, 9) * 3), rosa = k % 3 !== 1;
    R.disco(x, y, r + 1, hex('#3a5a3a')); R.disco(x, y, r, rosa ? hex('#e8a0b8') : hex('#5a9a4a')); R.disco(x - 2, y - 2, r - 3, rosa ? hex('#f8c8d8') : hex('#7ab85a'));
    for (let i = 0; i < 6; i++) R.pset(x - r + Math.floor(hh(k, i, 11) * r * 2), y - r + Math.floor(hh(k, i, 12) * r * 2), rosa ? hex('#c87090') : hex('#3a7a3a')); }
  // la calle con su acera
  R.rect(0, 136, 319, 146, hex('#5a5a64')); R.rect(0, 136, 319, 136, hex('#8a8a90')); for (let x = 4; x < 320; x += 16) R.rect(x, 141, x + 7, 141, hex('#e8d890'));
  // la azotea de delante: pretil de piedra y suelo de losetas
  R.rect(0, 147, 319, 154, hex('#c8b89a')); R.rect(0, 147, 319, 147, hex('#e8dcc0')); R.rect(0, 154, 319, 155, hex('#8a7a60'));
  for (let x = 0; x < 320; x += 12) R.rect(x, 148, x, 154, hex('#a8987a'));
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 16 === 0 || y % 8 === 0) ? hex('#8a8478') : hh(x >> 1, y >> 1, 4) < 0.1 ? hex('#a8a294') : hex('#b8b2a2'));
  // macetas y un banco
  for (const mx of [18, 300]) { caja(mx - 9, 158, mx + 9, 174, hex('#b8683a'), hex('#d8884a'), hex('#8a4a2a')); for (let k = 0; k < 9; k++) R.disco(mx - 8 + k * 2, 156 - Math.floor(hh(k, mx, 3) * 8), 3, k % 2 ? hex('#4a8a3a') : hex('#6aaa4a')); }
  caja(200, 162, 250, 166, hex('#8a5a30'), hex('#b07a44'), hex('#5a3418')); R.rect(204, 167, 206, 174, KK); R.rect(244, 167, 246, 174, KK);
};
const p2 = (t) => {
  fondo('cielo2', () => rampa(0, 0, 319, 116, CIELO));
  // el sol y las nubes de tres tonos a tres velocidades
  R.disco(44, 34, 10, hex('#f8f0c0')); R.disco(44, 34, 8, hex('#fffbe8'));
  for (let k = 0; k < 7; k++) { const v = [2, 4, 7][k % 3], w = [46, 34, 24][k % 3], x = ((k * 70 + t * v) % 420) - 50, y = 24 + (k % 3) * 14 + Math.floor(hh(k, 1, 2) * 8);
    if (x > 260 && y < 50) continue; nubeT(x, y, w, hex('#b8c8dc'), hex('#e8eef4'), BL); }
  for (let k = 0; k < 5; k++) ave(Math.round(((k * 53 + t * 14) % 360) - 20), 52 + Math.round(Math.sin(t + k) * 3) + k * 3, t, k, hex('#2a3446'));
  capa('lejos2', lejos, 34, 116);
  // la pantalla de un edificio lejano: en «threats» se pone en alerta
  const alerta = t > tThreat - 0.2; caja(168, 78, 196, 96, alerta && Math.floor(t * 4) % 2 ? hex('#c8302a') : hex('#2a3a5a'), hex('#5a6a8a'), hex('#1a2238'));
  if (alerta) { R.poligono([[182, 80], [192, 94], [172, 94]], hex('#f8d040')); exclama(181, 83, KK); } else for (let k = 0; k < 3; k++) R.rect(172, 82 + k * 4, 172 + Math.floor(8 + 12 * hh(k, Math.floor(t), 1)), 83 + k * 4, hex('#8ab8e8'));
  capa('medio2', medio, 116, 179);
  // el río: un barquito y brillos
  const bx = Math.round(((t * 6) % 360) - 20); R.rect(bx, 120, bx + 10, 122, BL); R.rect(bx + 3, 117, bx + 7, 119, hex('#c8302a')); R.rect(bx - 6, 122, bx, 122, hex('#a8c8e0'));
  for (let k = 0; k < 8; k++) if (Math.sin(t * 3 + k * 2) > 0.6) R.rect(k * 40 + 10, 124, k * 40 + 13, 124, BL);
  // la calle: el coche patrulla con las luces y otro coche
  const cx = Math.round(340 - ((t - P2) * 46) % 420), luz = Math.floor(t * 6) % 2;
  caja(cx, 137, cx + 18, 143, hex('#f2eee2'), BL, hex('#b8b4a8')); R.rect(cx + 4, 134, cx + 12, 137, hex('#2a2a34')); R.rect(cx + 6, 133, cx + 7, 133, luz ? hex('#ff3030') : hex('#5a1a1a')); R.rect(cx + 9, 133, cx + 10, 133, luz ? hex('#3a5ae8') : hex('#1a2a5a'));
  R.disco(cx + 4, 144, 2, KK); R.disco(cx + 14, 144, 2, KK);
  const c2 = Math.round(((t - P2) * 30) % 400) - 40; caja(c2, 138, c2 + 16, 143, hex('#3a7ac8'), hex('#5a9ae8'), hex('#2a5aa8')); R.rect(c2 + 3, 135, c2 + 11, 138, hex('#2a5aa8')); R.disco(c2 + 3, 144, 2, KK); R.disco(c2 + 13, 144, 2, KK);
  // la bandera de la azotea (rayas y cantón liso, sin estrellas) que ondea
  R.rect(286, 92, 287, 158, hex('#8a8a90')); R.pset(286, 91, hex('#e8c840'));
  for (let i = 0; i < 22; i++) { const o = Math.round(Math.sin(t * 5 - i * 0.4) * 1.5); for (let j = 0; j < 13; j++) { const c = i < 9 && j < 7 ? hex('#2a3a7a') : Math.floor(j / 2) % 2 ? BL : hex('#c8302a'); R.pset(288 + i, 94 + j + o, c); } }
  // las palomitas con los prismáticos: se asustan con la alerta y se emocionan al ver pasar a Sam
  const vuela = tramo(t, tCap - 0.45, tCap + 1.25);
  const exp = vuela > 0.2 ? 'emocion' : t > tThreat ? 'susto' : 'normal';
  const P = T.palomitas(R, 74, 176, t, { s: 2, dir: vuela > 0.55 ? -1 : 1, expresion: exp, salta: vuela > 0.4 ? 0.6 : 0 });
  if (exp !== 'emocion') { const [mx, my] = P.mano; R.rect(mx - 1, my - 6, mx + 9, my, KK); R.rect(mx, my - 5, mx + 3, my - 1, hex('#3a3a46')); R.rect(mx + 5, my - 5, mx + 8, my - 1, hex('#3a3a46')); R.pset(mx + 1, my - 4, hex('#8ab8e8')); R.pset(mx + 6, my - 4, hex('#8ab8e8')); }
  // Sam cruza el cielo volando: alas abiertas, el escudo en el brazo y la estela
  if (vuela > 0 && vuela < 1) { const sx = Math.round(lerp(340, -40, vuela)), sy = Math.round(78 - Math.sin(vuela * Math.PI) * 26);
    for (let k = 1; k < 18; k++) { const ex = sx + 7 + k * 4, ey = sy - 10 + Math.round(Math.sin(vuela * Math.PI + k * 0.08) * 2 + k * 0.6); if (k % 2) R.pset(ex, ey, hex('#e8eef8')); R.pset(ex, ey + 1, hex('#c8d8f0')); }
    alas(sx, sy, t); R.actor(EL.sam, sx, sy, t, { dir: -1, quieto: true }); escudo(sx - 1, sy - 9, 6, t, pulso(t, tCap + 0.35, 0.5)); }
};
// ── 3 · el despacho: entra Sam ──
const puerta3 = P3 + 0.15, sale3 = P3 + 0.55, llega3 = tNew - 0.1, mano3 = tSamW - 0.3;
const p3 = (t) => {
  T.washington(R, t, { encuadre: 'despacho' });
  // la puerta se abre: el pasillo con su luz
  const ab = tramo(t, puerta3, puerta3 + 0.4) * (1 - tramo(t, sale3 + 1.6, sale3 + 2.1));
  if (ab > 0) { const w = Math.round(30 * ab); R.rect(249, 57, 249 + w, 127, hex('#f0e4c0')); for (let y = 60; y < 126; y += 3) R.rect(250, y, 248 + w, y, hex('#e0d0a8')); R.rect(249, 120, 249 + w, 127, hex('#c8a878'));
    R.rect(249 + w, 56, 252 + w, 127, KK); R.rect(250 + w, 57, 251 + w, 126, hex('#f8f4e8')); }
  // Sam sale por la puerta y baja hasta el centro
  const u = tramo(t, sale3, llega3), sx = Math.round(lerp(257, 180, u)), ss = Math.round(lerp(128, 158, u)), anda = u > 0 && u < 1, alza = t > tNew - 0.05 && t < mano3 - 0.2;
  // el presidente sale de delante del escritorio y le da la mano
  const v = tramo(t, sale3 + 0.4, tNew + 0.6), px = Math.round(lerp(152, 146, v)), ps = Math.round(lerp(140, 158, v)), pAnda = v > 0 && v < 1;
  const dan = t > mano3, mx = 168, my = 144;
  // el fotógrafo detrás del sofá: dispara en «Sam Wilson»
  const F = R.actor(EL.fanArana, 40, 156, t, { dir: 1, sostiene: [62, 132], pal: { C: hex('#5a6a4a'), c: hex('#3e4a32') } });
  caja(F.mano[0] - 2, F.mano[1] - 6, F.mano[0] + 8, F.mano[1], hex('#2a2a34'), hex('#5a5a6a'), KK); R.disco(F.mano[0] + 6, F.mano[1] - 3, 2, hex('#5a8ab8'));
  const fl = pulso(t, tSamW, 0.3); if (fl > 0) { R.disco(F.mano[0] + 1, F.mano[1] - 7, 3, BL); tinta(0, 40, 319, 179, BL, fl * 0.35); }
  if (t < sale3) R.actor(EL.sam, 257, 128, t, { dir: -1, quieto: true });
  else { if (!alza) escudoEspalda(sx, ss, -1, t);
    const S = R.actor(EL.sam, sx, ss, t, { dir: -1, anda, sostiene: alza ? [sx + 3, ss - 34] : dan ? [mx, my] : false, sonrisa: t > tNew });
    if (alza) escudo(S.mano[0], S.mano[1] - 3, 8, t, pulso(t, tNew + 0.1, 0.6)); }
  R.actor(PRESI, px, ps, t, { dir: 1, anda: pAnda, sostiene: dan ? [mx, my] : false, sonrisa: t > sale3 + 0.6, habla: !dan && t > tNew + 0.6 && Math.sin(t * 9) > 0 });
  if (dan) { const bb = Math.round(Math.sin(t * 14) * 1); R.rect(mx - 2, my - 2 + bb, mx + 2, my + 1 + bb, hex('#f6c290')); R.rect(mx - 2, my + 2 + bb, mx + 2, my + 2 + bb, KK); }
  T.washingtonDelante(R, t, { encuadre: 'despacho' });
};
// ── 4 · el escritorio de cerca: el encargo ──
const holo = tAsks + 0.55;
const fig = (x, y, c1, c2) => { R.rect(x - 3, y - 15, x + 3, y + 1, KK); R.rect(x - 4, y - 8, x + 4, y - 3, KK); R.rect(x - 2, y - 14, x + 2, y - 10, c2); R.rect(x - 3, y - 7, x + 3, y - 4, c1); R.rect(x - 2, y - 9, x + 2, y, c1); R.pset(x - 1, y - 13, BL); R.rect(x - 1, y - 7, x + 1, y - 6, c2); };
const p4 = (t) => {
  T.washington(R, t, { encuadre: 'despacho', camara: 'cerca' });
  // el escolta, de pie a la izquierda: se toca el pinganillo de vez en cuando
  R.actor(ESCOLTA, 22, 170, t, { dir: 1, dedo: Math.sin(t * 0.9) > 0.75 });
  // el presidente detrás del escritorio: habla, en «asks» señala a Sam, luego pulsa el proyector
  R.actor(PRESI, 146, Math.round(lerp(146, 139, tramo(t, tAsks - 0.5, tAsks))), t, { dir: 1, habla: t < tJunto && Math.sin(t * 9) > -0.2, dedo: t > tAsks && t < holo, sostiene: t > holo && t < holo + 0.5 ? [196, 137] : false, sonrisa: t > tJunto });
  // Sam, a la derecha, con el escudo: se acerca un paso y sonríe al final
  const u = tramo(t, tAsks - 0.3, tAsks + 0.4), sx = Math.round(lerp(280, 268, u));
  R.actor(EL.sam, sx, 170, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: t > tJunto, sorpresa: t > tBack - 0.3 && t < tJunto });
  escudo(sx + 2, 158, 7, t, pulso(t, tJunto + 0.1, 0.6));
  T.washingtonDelante(R, t, { encuadre: 'despacho', camara: 'cerca' });
  // el proyector del escritorio y el holograma: seis figuritas que se juntan en un anillo
  caja(190, 134, 202, 139, hex('#3a3e4a'), hex('#5a5e6a'), KK); R.pset(196, 135, t > holo ? hex('#7af0ff') : hex('#5a1a1a'));
  const h = tramo(t, holo, holo + 0.4); if (h > 0) {
    for (let y = 62; y < 134; y++) { const w = (y - 62) / 72 * 5 + (134 - y) / 72 * 50; for (let x = Math.round(196 - w); x <= Math.round(196 + w); x++) if (bay(x, y) < 0.3 * h) R.pset(x, y, mez(R.pget(x, y), hex('#7af0ff'), 0.55)); }
    for (let k = 0; k < 50; k++) { const a = k / 50 * Math.PI * 2; R.pset(Math.round(196 + Math.cos(a) * 34), Math.round(110 + Math.sin(a) * 6), (k + Math.floor(t * 12)) % 4 ? hex('#7af0ff') : BL); }
    const j = tramo(t, tBack - 0.2, tJunto + 0.1), F6 = [['#c8303a', '#e8b830'], ['#2a4fa8', '#f2eee2'], ['#5aa83a', '#3a7a2a'], ['#3a3e90', '#e0c070'], ['#2a2430', '#c8402a'], ['#6a3a8a', '#e0b860']];
    F6.forEach(([a, b], k) => { const an = k / 6 * Math.PI * 2 + t * 0.8, sx0 = 196 + (k - 2.5) * 26 + Math.sin(t * 2 + k) * 3, sy0 = 84 + (k % 2) * 18, rx = 196 + Math.cos(an) * 26, ry = 106 + Math.sin(an) * 6;
      fig(Math.round(lerp(sx0, rx, j)), Math.round(lerp(sy0, ry, j)), hex(a), hex(b)); });
    if (j >= 1) { for (let k = 0; k < 40; k++) { const an = k / 40 * Math.PI * 2; if ((k + Math.floor(t * 10)) % 3) R.pset(Math.round(196 + Math.cos(an) * 32), Math.round(108 + Math.sin(an) * 9), hex('#bff8ff')); } } }
};
// ── 5 · la celda de cerca: el aviso ──
const p5 = (t) => {
  const habla = t > tWarn - 0.1 && t < P6;
  T.washington(R, t, { encuadre: 'celda', camara: 'cerca', habla });
  // el planeta rojo de su pantalla late en «attack» (recortado a la pantalla)
  const at = tramo(t, tAtt - 0.1, tAtt + 0.4); if (at > 0) { R.recorte([188, 48, 286, 102]); const r = 6 + at * 6 + Math.sin(t * 8) * 1.5; for (let k = 0; k < 2; k++) R.disco(262, 66, Math.round(r + 3 - k * 3), mez(hex('#ff5a3a'), hex('#1a1028'), 0.4 + k * 0.3)); R.disco(262, 66, Math.round(r - 3), hex('#e8402a')); R.recorte(null); }
  // un guardia al fondo, junto al monitor, que mira su tableta y luego al preso
  const G = R.actor(EL.guardia, 20, 150, t, { dir: t > tWarn ? 1 : -1, sostiene: true }); caja(G.mano[0] - 1, G.mano[1] - 5, G.mano[0] + 6, G.mano[1] + 1, hex('#2a2a34'), hex('#5a8ab8'), KK);
  // el preso se levanta del banco y se acerca al cristal
  const v = tramo(t, P5 + 0.6, tWarn - 0.3), vx = Math.round(lerp(262, 206, v));
  const L = R.actor(LIDER, vx, 154, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > tWarn && t < tAtt + 0.4, habla: habla && Math.sin(t * 10) > -0.3, sonrisa: t > tAtt + 0.4 });
  cabezon(L, t);
  // Sam llega por la izquierda hasta el interfono
  const u = tramo(t, P5, P5 + 1.4), sx = Math.round(lerp(-18, 92, u));
  escudoEspalda(sx, 170, 1, t);
  R.actor(EL.sam, sx, 170, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > tAtt, enfado: t > tWarn && t < tAtt });
  T.washingtonDelante(R, t, { encuadre: 'celda', camara: 'cerca', habla });
  // el aviso: un bocadillo con el planeta rojo y el «!»
  const b = tramo(t, tWarn, tWarn + 0.25); if (b > 0) bocadillo(150, 58, 190, 84, 200, 100, (x0, y0) => { planetaRojo(x0 + 13, y0 + 13, 6); exclama(x0 + 28, y0 + 6); });
};
// ── 6 · la celda entera: Sam no está preparado ──
const p6 = (t) => {
  const habla = t < tReady;
  T.washington(R, t, { encuadre: 'celda', habla });
  const w = tramo(t, tWorlds - 0.2, tWorlds + 0.3) * (1 - tramo(t, tWorlds + 2.2, tWorlds + 2.8)); if (w > 0) { R.recorte([163, 55, 259, 101]); const r = 5 + w * 6 + Math.sin(t * 8); R.disco(246, 66, Math.round(r + 3), hex('#7a2030')); R.disco(246, 66, Math.round(r), hex('#e8402a')); R.disco(244, 64, Math.max(1, Math.round(r - 4)), hex('#ff7a5a')); R.recorte(null); }
  // la puerta del fondo se abre cuando Sam va hacia ella
  const sale = tReady + 0.5, ab = tramo(t, sale + 0.6, sale + 1.0); if (ab > 0) { const w2 = Math.round(16 * ab); R.rect(18, 62, 18 + w2, 116, hex('#bfe8f0')); R.rect(36 - w2 + 16, 62, 50, 116, hex('#bfe8f0')); R.rect(18 + w2, 62, 19 + w2, 116, KK); }
  // el preso se ríe detrás del cristal
  const L = R.actor(LIDER, 200, 148, t, { dir: -1, sonrisa: true, habla: habla && Math.sin(t * 11) > -0.2, dedo: t > tWorlds - 0.2 && t < tWorlds + 1.2 });
  cabezon(L, t);
  // Sam: mira, baja la vista en «isn't ready», se da la vuelta y se va despacio hacia la puerta
  const u = tramo(t, sale, P6 + 5.0), sx = Math.round(lerp(88, 40, u)), dir = t > sale - 0.2 ? -1 : 1;
  if (dir > 0) escudoEspalda(sx, 158, dir, t); else escudoEspalda(sx, 158, dir, t);
  R.actor(EL.sam, sx, 158, t, { dir, anda: u > 0 && u < 1, triste: t > tReady - 0.1, sorpresa: t > tWorlds && t < tReady - 0.1 });
  T.washingtonDelante(R, t, { encuadre: 'celda', habla });
};
const efectos = [[t616, 'bip'], [tOurs + 0.25, 'golpecito'], [tOurs + 1.0, 'whoosh'], [tThreat, 'aviso'], [tCap - 0.2, 'jet'], [puerta3, 'puerta'], [tNew + 0.1, 'brillo'], [tSamW, 'flash'], [holo, 'zumbido'], [tJunto, 'brillo'], [tWarn, 'aviso'], [tAtt, 'zumbido'], [sale6(), 'puerta']];
function sale6() { return tReady + 1.1; }
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2025', efectos, año: 2025 });
''')

# =====================================================================================================================
E['do-thunder'] = ('Los Thunderbolts', '''// DO-THUNDER (frases 45–47). Siete planos:
// 1. la azotea de Nueva York al atardecer: llegan los cuatro Thunderbolts (Yelena salta desde la caseta en
//    «Thunderbolts», Bucky sale por la puerta, el Guardián Rojo llega resoplando y Bob mira el sol); en «complicated
//    pasts» se miran mal y discuten (corta en «Yelena»);
// 2. (fondo local) la rueda de reconocimiento: pared con las rayas de altura, números 1–4, focos; cada uno da un paso al
//    frente cuando la voz lo nombra (flash): Yelena, Bucky (alza el brazo de metal), el Guardián (saca músculo) y Bob, que
//    en «enormous power» brilla dorado y flota; los demás se apartan;
// 3. la rueda de prensa: la presentadora en el atril los presenta; ellos dan un paso; en «New Avengers» cae la tela del
//    panel y aparece la «A» en su anillo, con flashes;
// 4. el atril de cerca, la pantalla con el título (un rayo y un asterisco): en «asterisk» el asterisco late; en «turns
//    into» gira, se encoge y se convierte en la «A»; suben los créditos en barras; flashes;
// 5. la torre de noche: los tres en la mesa redonda, Bucky de pie; entra Sam con el escudo y, en «sued», levanta el papel
//    de abogado con la ® gigante (gag 6); en «brand» lo planta en la mesa y las palomitas se ríen;
// 6. (fondo local) la consola de cerca: baliza roja; en «detect» el radar marca un punto y Yelena pulsa el botón; en
//    «another dimension» se abre un portal en el monitor y en «entering our world» la nave va hacia la Tierra;
// 7. la pared de pantallas de noche (o.pantalla 'nave'): los cinco detrás de la mesa miran la nave; en «huge number» un
//    anillo rojo marca el 4 y en «four» destella y todos dan un salto (golpe musical).''', AY + r'''
const Q2 = en('thunderbolts', 0.49), Q3 = en('asterisco', 0), Q4 = en('asterisco', 0.51), Q5 = en('cuatro', 0), Q6 = en('cuatro', 0.388), Q7 = en('cuatro', 0.775);
const tThu = en('thunderbolts', 0.077), tComp = en('thunderbolts', 0.326);
const tYel = Q2, tBuc = en('thunderbolts', 0.664), tGua = en('thunderbolts', 0.714), tBob = en('thunderbolts', 0.823), tPow = en('thunderbolts', 0.857);
const tIntro = en('asterisco', 0.16), tWorld = en('asterisco', 0.227), tNA = en('asterisco', 0.414);
const tAst = en('asterisco', 0.735), tTurn = en('asterisco', 0.837), tCred = en('asterisco', 0.941);
const tSued = en('cuatro', 0.193), tBrand = en('cuatro', 0.312), tDet = en('cuatro', 0.488), tDim = en('cuatro', 0.599), tEnt = en('cuatro', 0.64), tHuge = en('cuatro', 0.85), tFour = en('cuatro', 0.96);
const TB = [EL.yelena, EL.bucky, EL.guardian, EL.sentry];
// la placa del atril con el rayo (tapa el emblema del decorado)
const placa = (x0, y0, x1, y1) => { caja(x0, y0, x1, y1, hex('#1c264a'), hex('#3a4a8a'), hex('#101830')); rayo(Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2), Math.round((y1 - y0) / 2) - 2, hex('#f0c830')); };
// el aura dorada de Bob (a: 0–1)
const aura = (cx, cy, r, a, t) => { if (a <= 0) return; tinta(cx - r, cy - r, cx + r, cy + r, hex('#ffd860'), a * 0.8, cx, cy, r);
  for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 + t * 2, d = r * (0.6 + 0.3 * Math.sin(t * 5 + k)); R.pset(Math.round(cx + Math.cos(an) * d), Math.round(cy + Math.sin(an) * d * 0.8), hex('#fff6c0')); } };
// ── 1 · la azotea de Nueva York ──
const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'nyhoy' });
  // Bob, ya en la azotea, mira el atardecer y luego se vuelve
  R.actor(EL.sentry, 150, 164, t, { dir: t > tComp - 0.6 ? -1 : 1, triste: t > tComp });
  // Yelena salta desde el tejado de la caseta en «Thunderbolts»
  const y = tramo(t, tThu - 0.25, tThu + 0.25), yx = Math.round(lerp(34, 62, y)), salto = y < 1 ? Math.round(52 * (1 - y) + Math.sin(y * Math.PI) * 10) : 0;
  if (t > tThu - 0.3) R.actor(EL.yelena, yx, 164, t, { dir: 1, salto, enfado: t > tComp, brazos: t > tComp + 0.8 && t < tComp + 1.4 });
  // Bucky sale por la puerta de la caseta y avanza
  const b = tramo(t, tThu + 0.5, tThu + 2.2), bx = Math.round(lerp(16, 96, b)), bs = Math.round(lerp(152, 164, Math.min(1, b * 2.5)));
  if (t > tThu + 0.4) R.actor(EL.bucky, bx, bs, t, { dir: 1, anda: b > 0 && b < 1, enfado: t > tComp });
  // el Guardián llega por la derecha resoplando y discute
  const g = tramo(t, tThu + 1.2, tComp - 0.2), gx = Math.round(lerp(330, 200, g));
  R.actor(EL.guardian, gx, 164, t, { dir: -1, anda: g > 0 && g < 1, habla: t > tComp && Math.sin(t * 10) > -0.3, dedo: t > tComp + 0.3 });
  if (g > 0 && g < 1 && Math.floor(t * 4) % 2) { R.disco(gx - 2, 140, 2, hex('#e8eef4')); R.disco(gx - 5, 138, 1, hex('#e8eef4')); }
};
// ── 2 · la rueda de reconocimiento (fondo local) ──
const pared2 = () => {
  // pared de bloques pintados, con juntas y desconchones
  for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 8), junta = y % 8 === 7 || (x + (fila % 2) * 12) % 24 === 23;
    let c = junta ? hex('#9a9484') : hh(x >> 1, y >> 1, 3) < 0.06 ? hex('#c8c0a8') : hex('#b8b09a'); if (y < 10) c = mez(c, KK, 0.25); R.pset(x, y, c); }
  // las rayas de altura con los números (solo cifras)
  for (let k = 0; k <= 9; k++) { const y = 138 - k * 9; R.rect(36, y, 266, y, k % 2 ? hex('#5a5448') : hex('#2a2620')); }
  for (const [n, k] of [['4', 3], ['5', 5], ['6', 7], ['7', 9]]) R.numero(n, 26, 138 - k * 9 + 4, { tam: 8 });
  // las placas con los números 1–4
  [74, 122, 170, 218].forEach((x, i) => { caja(x - 6, 44, x + 6, 56, hex('#2a2a34'), hex('#4a4a5a'), KK); R.numero(String(i + 1), x - 3, 54, { tam: 8 }); });
  // la luna espía a la derecha (cristal oscuro con reflejos) y su marco
  caja(274, 60, 318, 124, hex('#1c2230'), hex('#3a4458'), KK); for (let k = 0; k < 3; k++) R.linea(280 + k * 12, 122, 298 + k * 12, 64, hex('#2e384c'));
  // la puerta de la izquierda con su ventanuco y la cámara del techo
  caja(2, 56, 22, 141, hex('#6a7a8a'), hex('#8a9aaa'), hex('#4a5a6a')); caja(6, 64, 18, 80, hex('#2a3446'), hex('#4a5468'), KK); R.rect(18, 100, 20, 102, hex('#e8c840'));
  // el techo: canaleta de luz y los cuatro focos
  R.rect(0, 0, 319, 6, hex('#3a3a42')); R.rect(0, 6, 319, 7, hex('#22222a'));
  [74, 122, 170, 218].forEach((x) => { R.rect(x - 1, 7, x + 1, 18, hex('#2a2a32')); caja(x - 6, 18, x + 6, 26, hex('#4a4a54'), hex('#6a6a74'), KK); });
  // manchas, desconchones, la tubería con abrazaderas, la caja de alarma, el reloj y el pictograma de «prohibido»
  for (let k = 0; k < 26; k++) { const x = Math.floor(hh(k, 1, 13) * 300) + 10, y = Math.floor(hh(k, 2, 13) * 120) + 12; if (x > 270 && y < 50) continue; R.rect(x, y, x + 1 + (k % 3), y + (k % 2), hex('#a8a08a')); if (k % 4 === 0) R.pset(x + 1, y + 2, hex('#8a846e')); }
  R.rect(28, 30, 262, 33, KK); R.rect(28, 31, 262, 32, hex('#8a8e96')); R.rect(28, 31, 262, 31, hex('#b8bcc4')); for (let x = 40; x < 262; x += 36) caja(x, 28, x + 4, 35, hex('#6a6e76'), hex('#9a9ea6'), KK);
  R.rect(259, 33, 262, 141, KK); R.rect(260, 33, 261, 141, hex('#8a8e96'));
  caja(240, 70, 252, 84, hex('#c8302a'), hex('#e85a4a'), hex('#8a1a1a')); R.disco(246, 76, 2, hex('#f8d8d0'));
  R.disco(296, 140 - 86, 7, KK); R.disco(296, 54, 6, hex('#f2eee2')); R.linea(296, 54, 296, 50, KK); R.linea(296, 54, 299, 55, KK); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(296 + Math.cos(a) * 5), Math.round(54 + Math.sin(a) * 5), hex('#5a5a62')); }
  R.disco(246, 104, 7, KK); R.disco(246, 104, 6, hex('#f2eee2')); R.rect(243, 103, 249, 105, KK); R.linea(241, 99, 251, 109, hex('#c8302a')); R.linea(242, 99, 251, 108, hex('#c8302a'));
  // el banco de la pared derecha con una bolsa de pruebas
  caja(272, 128, 316, 132, hex('#8a6a4a'), hex('#a8886a'), hex('#5a3a2a')); R.rect(276, 133, 278, 141, KK); R.rect(310, 133, 312, 141, KK); caja(290, 120, 302, 128, hex('#d8d0b8'), hex('#f2eee2'), hex('#a8a090')); R.rect(293, 123, 299, 124, hex('#c8302a'));
  // el suelo de cemento con las huellas pintadas y el sumidero
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 142 ? hex('#5a5448') : hh(x >> 1, y >> 1, 6) < 0.08 ? hex('#7a766c') : (y % 10 === 0 ? hex('#8a867a') : hex('#96928a')));
  [74, 122, 170, 218].forEach((x) => { for (const dx of [-4, 3]) { R.rect(x + dx, 160, x + dx + 3, 166, hex('#e8c840')); R.rect(x + dx, 167, x + dx + 3, 167, hex('#a88a28')); } });
  R.rect(40, 150, 280, 150, hex('#e8c840')); R.disco(296, 170, 4, hex('#5a5650')); for (let k = -3; k <= 3; k += 2) R.linea(293, 170 + k, 299, 170 + k, hex('#3a3630'));
};
const p2 = (t) => {
  fondo('pared2', pared2);
  const tiempos = [tYel, tBuc, tGua, tBob], xs = [66, 114, 162, 210];
  // los focos: se encienden con el nombre de cada uno
  xs.forEach((x, i) => { const on = t > tiempos[i]; R.rect(x + 3, 26, x + 11, 27, on ? hex('#fff6c0') : hex('#5a5a62'));
    if (on) for (let y = 28; y < 166; y++) { const w = 4 + (y - 28) * 0.11; for (let xx = Math.round(x + 7 - w); xx <= Math.round(x + 7 + w); xx++) if (bay(xx, y) < 0.22) R.pset(xx, y, mez(R.pget(xx, y), hex('#fff6d0'), 0.45)); } });
  // la luna espía: dos siluetas que se mueven detrás
  R.recorte([275, 61, 317, 123]); for (let k = 0; k < 2; k++) { const sx = 284 + k * 16 + Math.round(Math.sin(t * 0.7 + k * 2) * 4); R.disco(sx, 96, 4, hex('#2a3242')); R.rect(sx - 5, 101, sx + 5, 123, hex('#2a3242')); } R.recorte(null);
  // los cuatro: cada uno da un paso al frente cuando lo nombran
  TB.forEach((def, i) => { const paso = tramo(t, tiempos[i], tiempos[i] + 0.35), su = 150 + Math.round(paso * 8), bob = i === 3;
    const flota = bob ? Math.round(tramo(t, tPow, tPow + 0.8) * 6 + (t > tPow + 0.8 ? Math.sin(t * 3) * 1.5 : 0)) : 0;
    const mira = t > tPow + 0.2 && !bob ? 1 : (i % 2 ? -1 : 1), aparta = !bob && t > tPow + 0.3 ? Math.round(tramo(t, tPow + 0.3, tPow + 0.9) * -6 * (3 - i) / 3) : 0;
    if (bob) { const a = tramo(t, tPow - 0.1, tPow + 0.7); aura(xs[i] + 7, su - 14 - flota, 28, a * 1.4, t); if (a > 0) for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t, r0 = 18, r1 = 18 + a * 10 * (0.6 + 0.4 * Math.sin(t * 9 + k)); R.linea(Math.round(xs[i] + 7 + Math.cos(an) * r0), Math.round(su - 14 - flota + Math.sin(an) * r0), Math.round(xs[i] + 7 + Math.cos(an) * r1), Math.round(su - 14 - flota + Math.sin(an) * r1), hex('#ffe890')); } }
    R.actor(def, xs[i] + aparta, su, t, { dir: bob ? -1 : mira, anda: paso > 0 && paso < 1, salto: flota, sorpresa: !bob && t > tPow + 0.2,
      dedo: i === 1 && t > tBuc + 0.3 && t < tBuc + 1.4, brazos: i === 2 && t > tGua + 0.3 && t < tGua + 1.2, sonrisa: i === 0 && t > tYel + 0.6 && t < tBuc, enfado: i === 0 && t < tYel });
    if (i === 1 && t > tBuc + 0.3 && t < tBuc + 1.4 && Math.floor(t * 8) % 2) R.pset(xs[1] + 14, su - 26, BL); });
  // el flash de la cámara de fichar en cada nombre
  const fl = Math.max(...tiempos.map((a) => pulso(t, a + 0.35, 0.25))); if (fl > 0) tinta(0, 0, 319, 179, BL, fl * 0.4);
};
// ── 3 · la rueda de prensa ──
// el telón de fondo propio: paneles azul noche con rayos dorados y los expositores con el rayo
const telon3 = () => {
  for (let y = 0; y < 87; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 64 === 0 ? hex('#141a30') : hh(x >> 2, y >> 2, 7) < 0.05 ? hex('#22305a') : hex('#1c264a'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { const x = 18 + i * 36 + (j % 2) * 18, y = 18 + j * 20; if ((x > 266 && y < 50) || (y < 18 && x < 176) || (x > 104 && x < 216 && y > 14 && y < 92)) continue; rayo(x, y, 6, hex('#d8a830')); }
  for (const x0 of [18, 266]) { caja(x0, x0 > 200 ? 48 : 30, x0 + 36, 116, hex('#2a3e90'), hex('#4a5eb0'), hex('#1e2a6a')); rayo(x0 + 18, 74, 13, hex('#f0c830')); R.rect(x0 + 6, 96, x0 + 30, 97, hex('#f0c830')); R.rect(x0 + 6, 102, x0 + 22, 103, hex('#8a9ae8')); R.rect(x0 + 6, 106, x0 + 26, 107, hex('#8a9ae8')); }
  // el panel grande del centro con su marco plateado
  caja(114, 18, 206, 86, hex('#141c3a'), hex('#c8ccd8'), hex('#7c8094'));
};
const p3 = (t) => {
  const flashes = t > tNA ? 1 : 0.35;
  T.escenario(R, t, { encuadre: 'prensa', flashes });
  capa('telon3', telon3, 0, 118);
  // en «New Avengers» cae la tela del panel y aparece la «A» en su anillo
  const cae = tramo(t, tNA - 0.05, tNA + 0.45);
  if (cae > 0) { emblemaA(160, 52, 26, hex('#e8ecf8'), hex('#8a9ae8')); const g = pulso(t, tNA + 0.2, 0.8); if (g > 0) for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2, d = 30 + g * 8; R.pset(Math.round(160 + Math.cos(an) * d), Math.round(52 + Math.sin(an) * d * 0.9), BL); } }
  if (cae < 1) { const y1 = Math.round(85 + cae * 50); for (let y = 19 + Math.round(cae * 66); y <= Math.min(y1, 118); y++) for (let x = 115; x <= 205; x++) R.pset(x, y, (x + Math.round(Math.sin(y * 0.3) * 2)) % 9 < 2 ? hex('#5a1a24') : hex('#8a2a34')); }
  // la presentadora en el atril y los cuatro en la tarima
  R.actor(VALE, 146, 122, t, { dir: 1, habla: t < tNA + 0.6 && Math.sin(t * 9) > -0.2, dedo: t > tIntro && t < tNA - 0.3, sonrisa: t > tNA });
  const paso = tramo(t, tWorld, tWorld + 0.4), d = Math.round(paso * 6);
  R.actor(EL.yelena, 62 + d, 122, t, { dir: 1, anda: paso > 0 && paso < 1, enfado: t < tNA, sorpresa: t > tNA && t < tNA + 0.8 });
  R.actor(EL.bucky, 94 + d, 122, t, { dir: 1, anda: paso > 0 && paso < 1, sorpresa: t > tNA && t < tNA + 0.8 });
  R.actor(EL.guardian, 190 - d, 122, t, { dir: -1, anda: paso > 0 && paso < 1, dedo: t > tWorld + 0.5 && Math.sin(t * 6) > 0, sonrisa: t > tNA });
  R.actor(EL.sentry, 222 - d, 122, t, { dir: -1, anda: paso > 0 && paso < 1, triste: t < tNA, sorpresa: t > tNA });
  T.escenarioDelante(R, t, { encuadre: 'prensa', flashes });
  placa(152, 112, 168, 125);
};
// ── 4 · el atril de cerca: el asterisco se convierte en la «A» ──
const telon4 = () => {
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 48 === 0 ? hex('#141a30') : hh(x >> 2, y >> 2, 8) < 0.05 ? hex('#22305a') : hex('#1c264a'));
  for (let j = 0; j < 6; j++) for (const x of [16, 268]) { const y = 22 + j * 20; if (x > 260 && y < 52) continue; rayo(x + (j % 2) * 8, y, 6, hex('#d8a830')); }
  // la pantalla del título con su marco y sus focos
  caja(44, 16, 256, 112, hex('#0e1428'), hex('#c8ccd8'), hex('#7c8094')); R.rect(46, 18, 254, 110, hex('#0a1020'));
  for (let x = 50; x < 252; x += 6) R.pset(x, 108, hex('#2a3460'));
  for (const x of [60, 240]) { R.rect(x - 1, 112, x + 1, 120, hex('#5a5e6a')); caja(x - 8, 120, x + 8, 128, hex('#3a3e4a'), hex('#5a5e6a'), KK); }
};
const p4 = (t) => {
  const flashes = t > tTurn ? 1 : 0.4;
  T.escenario(R, t, { encuadre: 'prensa', camara: 'cerca', flashes });
  capa('telon4', telon4, 0, 139);
  R.recorte([46, 18, 254, 110]);
  // las estrellas del fondo de la pantalla que pasan
  for (let k = 0; k < 30; k++) { const x = 46 + ((hh(k, 1, 4) * 208 + t * (6 + k % 3 * 4)) % 208), y = 20 + hh(k, 2, 4) * 88; R.pset(Math.round(x), Math.round(y), k % 3 ? hex('#3a4a8a') : hex('#8a9ae8')); }
  // el título: el rayo grande y el asterisco que late y luego se convierte en la «A»
  rayo(112, 62, 30, hex('#f0c830'));
  const pul = t > tAst - 0.1 && t < tTurn ? 1 + 0.25 * Math.abs(Math.sin((t - tAst) * 7)) : 1, m = tramo(t, tTurn, tTurn + 0.7);
  if (m < 1) asterisco(190, 58, 22 * pul * (1 - m * 0.9), t * 0.3 + m * 6, hex('#f0c830'), 3);
  if (pul > 1) for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2; R.pset(Math.round(190 + Math.cos(an) * 30), Math.round(58 + Math.sin(an) * 30), hex('#fff6c0')); }
  if (m > 0.3) { const s = Math.round(lerp(4, 30, tramo(m, 0.3, 1))); emblemaA(190, 58, s, hex('#e8ecf8'), hex('#8a9ae8')); if (m < 1) for (let k = 0; k < 10; k++) { const an = k * 0.63 + t * 4; R.pset(Math.round(190 + Math.cos(an) * (s + 6)), Math.round(58 + Math.sin(an) * (s + 6)), BL); } }
  // los créditos: barras que suben
  if (t > tCred - 0.2) for (let k = 0; k < 12; k++) { const y = Math.round(110 - ((t - tCred + 0.2) * 22 + k * 9) % 100); if (y > 20) { R.rect(60, y, 60 + 10 + (k * 7) % 18, y + 1, hex('#8a9ae8')); R.rect(236 - (k * 5) % 14, y, 244, y + 1, hex('#8a9ae8')); } }
  R.recorte(null);
  // la presentadora señala la pantalla; Yelena y Bob a los lados la miran
  R.actor(VALE, 153, 150, t, { dir: -1, dedo: t > tAst - 0.1 && t < tTurn + 1.0, habla: Math.sin(t * 9) > -0.2 && t < tCred, sonrisa: t > tTurn + 0.7 });
  R.actor(EL.yelena, 84, 150, t, { dir: 1, sorpresa: t > tTurn && t < tTurn + 1.4, enfado: t < tAst });
  R.actor(EL.sentry, 214, 150, t, { dir: -1, sonrisa: t > tTurn + 0.6, triste: t < tAst });
  T.escenarioDelante(R, t, { encuadre: 'prensa', camara: 'cerca', flashes });
  placa(146, 149, 174, 167);
};
// ── 5 · la torre de noche: la ® gigante (gag 6) ──
const p5 = (t) => {
  const o = { encuadre: 'torre', luz: 'noche' };
  T.washington(R, t, o);
  // los tres detrás de la mesa y Bucky de pie
  const reac = t > tBrand;
  R.actor(EL.yelena, 128, 134, t, { dir: -1, enfado: reac });
  R.actor(EL.guardian, 160, 134, t, { dir: -1, sorpresa: reac, habla: t > tSued && t < tBrand && Math.sin(t * 9) > 0 });
  R.actor(EL.sentry, 192, 134, t, { dir: -1, triste: reac });
  R.actor(EL.bucky, 238, 162, t, { dir: -1, sorpresa: t > tSued + 0.2 && t < tBrand, dedo: reac && t < tBrand + 1.0 });
  // Sam entra con el escudo a la espalda y, en «sued», levanta el papel
  const u = tramo(t, Q5 + 0.2, tSued - 0.4), sx = Math.round(lerp(-18, 62, u)), alza = t > tSued - 0.3, planta = tramo(t, tBrand - 0.1, tBrand + 0.15);
  escudoEspalda(sx, 162, 1, t);
  const S = R.actor(EL.sam, sx, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza ? [sx + 22, Math.round(lerp(128, 134, planta))] : false, enfado: alza });
  T.washingtonDelante(R, t, o);
  if (alza) papelR(S.mano[0] + 6, S.mano[1] + 2, t);
  // las palomitas sentadas en la mesa se ríen del papel
  T.palomitas(R, 222, 128, t, { s: 1, dir: -1, expresion: t > tBrand + 0.1 ? 'risa' : t > tSued ? 'susto' : 'normal' });
};
// ── 6 · la consola de cerca (fondo local) ──
const consola6 = () => {
  // la pared de la sala: ventanal largo con la ciudad de noche, viga del techo
  rampa(0, 0, 319, 70, ['#14182a', '#1a2036', '#20283e'].map(hex));
  R.rect(0, 0, 319, 6, hex('#2a2e3a')); R.rect(0, 7, 319, 7, KK);
  R.rect(0, 14, 268, 62, KK); rampa(2, 16, 266, 60, ['#0a1028', '#141c3a', '#1e2a4e', '#2a3a62'].map(hex));
  for (let k = 0; k < 22; k++) { const x0 = 2 + k * 12 + Math.floor(hh(k, 1, 5) * 4), h = 12 + Math.floor(hh(k, 2, 5) * 30); R.rect(x0, 60 - h, x0 + 10, 60, hex('#0e1426')); for (let y = 62 - h; y < 58; y += 3) for (let x = x0 + 2; x < x0 + 9; x += 3) if (hh(x, y, 5) < 0.35) R.pset(x, y, hex('#e8c860')); }
  for (let x = 2; x < 268; x += 44) R.rect(x, 16, x + 1, 60, hex('#2a2e3a'));
  // la consola: encimera de metal, botoneras, teclado, taza, tableta
  R.rect(0, 118, 319, 179, hex('#2a2e3a')); R.rect(0, 118, 319, 120, hex('#5a5e6a')); R.rect(0, 121, 319, 121, KK);
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) if (hh(x >> 1, y >> 1, 9) < 0.05) R.pset(x, y, hex('#343846'));
  caja(130, 140, 220, 160, hex('#3a3e4a'), hex('#5a5e6a'), KK); for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) caja(133 + i * 7, 143 + j * 5, 138 + i * 7, 146 + j * 5, hex('#5a5e6a'), hex('#7a7e8a'), hex('#3a3e4a'));
  caja(236, 136, 262, 156, hex('#1a1e28'), hex('#3a3e4a'), KK); R.rect(239, 139, 259, 153, hex('#2a4a6a'));
  caja(278, 140, 292, 158, hex('#e8e4dc'), BL, hex('#b8b4a8')); R.rect(292, 145, 295, 150, KK); R.rect(280, 143, 290, 144, hex('#5a3418'));
  // papeles, notas amarillas, cables, los cascos, la palanca y los deslizadores
  for (const [x, y, w, h] of [[18, 132, 26, 18], [30, 140, 24, 20]]) { caja(x, y, x + w, y + h, hex('#e8e4d8'), BL, hex('#b8b4a8')); for (let k = 0; k < 4; k++) R.rect(x + 3, y + 4 + k * 4, x + w - 4 - (k % 2) * 6, y + 4 + k * 4, hex('#8a8a9a')); }
  for (const [x, y] of [[226, 124], [60, 124], [300, 124]]) { R.rect(x, y, x + 6, y + 6, hex('#f0d040')); R.rect(x + 1, y + 2, x + 4, y + 2, hex('#a88a28')); }
  for (let k = 0; k < 3; k++) { let px = 60 + k * 30, py = 179; for (let i = 0; i < 20; i++) { const nx = px + 2 + Math.round(Math.sin(i * 0.7 + k) * 2), ny = py - 1; R.pset(nx, ny, KK); R.pset(nx, ny - 1, hex('#3a3e4a')); px = nx; py = ny; } }
  R.disco(78, 128, 7, KK); R.disco(78, 128, 5, hex('#2a2e3a')); R.rect(70, 127, 73, 134, KK); R.rect(83, 127, 86, 134, KK); R.rect(71, 128, 72, 133, hex('#5a5e6a')); R.rect(84, 128, 85, 133, hex('#5a5e6a'));
  caja(176, 156, 196, 172, hex('#3a3e4a'), hex('#5a5e6a'), KK); for (let k = 0; k < 3; k++) { R.rect(180 + k * 6, 159, 181 + k * 6, 169, KK); R.rect(178 + k * 6, 161 + k * 3, 183 + k * 6, 163 + k * 3, hex('#c8ccd8')); }
  caja(226, 160, 236, 172, hex('#3a3e4a'), hex('#5a5e6a'), KK); R.rect(230, 150, 232, 160, KK); R.disco(231, 149, 3, hex('#c8302a'));
  // los monitores: el radar, el principal y el de avisos, con sus pies
  for (const [x0, y0, x1, y1] of [[14, 44, 104, 112], [112, 24, 232, 114], [240, 56, 306, 112]]) { caja(x0, y0, x1, y1, hex('#2a2e3a'), hex('#4a4e5a'), KK); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#06101a')); R.rect(Math.round((x0 + x1) / 2) - 3, y1, Math.round((x0 + x1) / 2) + 3, 118, hex('#3a3e4a')); }
};
const p6 = (t) => {
  fondo('consola6', consola6);
  // la ciudad: ventanas que titilan y una luz que cruza
  for (let k = 0; k < 10; k++) if (Math.sin(t * 2 + k * 3) > 0.7) R.pset(10 + k * 25, 40 + (k * 7) % 16, hex('#ffe890'));
  const av = Math.round(((t * 18) % 300) - 20); R.pset(av, 24, hex('#ff4a4a')); R.pset(av + 2, 24, BL);
  // el radar: barrido y el punto en «detect»
  const [rx, ry] = [59, 78]; R.recorte([17, 47, 101, 109]);
  for (const r of [10, 20, 30]) for (let k = 0; k < 60; k++) { const an = k / 60 * Math.PI * 2; R.pset(Math.round(rx + Math.cos(an) * r), Math.round(ry + Math.sin(an) * r), hex('#1a4a3a')); }
  const ba = t * 2.6; for (let r = 0; r < 31; r++) for (let k = 0; k < 6; k++) { const an = ba - k * 0.06; R.pset(Math.round(rx + Math.cos(an) * r), Math.round(ry + Math.sin(an) * r), mez(hex('#5af0a0'), hex('#06101a'), k / 6)); }
  if (t > tDet) { const r = 3 + Math.abs(Math.sin(t * 6)) * 2; R.disco(rx + 18, ry - 14, Math.round(r), hex('#ff3a3a')); R.pset(rx + 18, ry - 14, BL); }
  R.recorte(null);
  // el monitor principal: la Tierra, el portal que se abre y la nave que entra
  R.recorte([115, 27, 229, 111]);
  for (let k = 0; k < 40; k++) R.pset(115 + Math.floor(hh(k, 1, 6) * 114), 27 + Math.floor(hh(k, 2, 6) * 84), hex('#3a4a6a'));
  R.disco(200, 76, 22, hex('#1e5aa8')); R.disco(200, 76, 22, (x, y) => (hh(Math.floor((x + t * 4) / 3), Math.floor(y / 3), 2) < 0.4 ? hex('#3a9a4a') : (x - 200) + (y - 76) < -14 ? hex('#4a8ae8') : hex('#1e5aa8')));
  for (let k = 0; k < 50; k++) { const an = k / 50 * Math.PI * 2; R.pset(Math.round(200 + Math.cos(an) * 23), Math.round(76 + Math.sin(an) * 23), hex('#7ac8ff')); }
  const po = tramo(t, tDim - 0.2, tDim + 0.5); if (po > 0) { const pr = Math.round(po * 18); for (let r = pr; r > 0; r -= 2) R.disco(144, 56, r, r % 4 ? hex('#6a3ab0') : hex('#3a8ae8')); for (let k = 0; k < 24; k++) { const an = k * 0.6 + t * 5, d = k / 24 * pr; R.pset(Math.round(144 + Math.cos(an) * d), Math.round(56 + Math.sin(an) * d), hex('#d8b8ff')); } }
  const nv = tramo(t, tEnt - 0.3, Q7 + 0.2); if (nv > 0) { const nx = Math.round(lerp(144, 186, nv)), ny = Math.round(lerp(56, 70, nv)); for (let k = 1; k < 8; k++) R.pset(nx - k * 2, ny - Math.round(k * 0.6), hex('#a8c8ff')); R.rect(nx - 5, ny - 2, nx + 5, ny + 2, hex('#e8ecf8')); R.rect(nx - 5, ny - 2, nx + 5, ny - 2, BL); R.pset(nx + 6, ny, hex('#7af0ff')); R.rect(nx - 2, ny - 4, nx + 1, ny + 4, hex('#c8ccd8')); }
  if (t > tDet) { for (let x = 120; x < 226; x += 4) if ((x + Math.floor(t * 8)) % 8 < 4) { R.pset(x, 29, hex('#ff3a3a')); R.pset(x, 109, hex('#ff3a3a')); } }
  R.recorte(null);
  // el monitor de avisos: la onda que se dispara y el «!»
  R.recorte([243, 59, 303, 109]);
  for (let x = 244; x < 303; x++) { const amp = t > tDet ? 14 : 3, y = Math.round(92 + Math.sin(x * 0.5 + t * 8) * amp * hh(x, Math.floor(t * 6), 3)); R.pset(x, y, hex('#5af0a0')); }
  if (t > tDet && Math.floor(t * 3) % 2) { R.poligono([[273, 62], [285, 82], [261, 82]], hex('#f0c830')); exclama(272, 67, KK); }
  R.recorte(null);
  // la baliza roja que gira y barre la sala
  const ba2 = Math.sin(t * 7); caja(150, 116, 166, 120, hex('#3a3e4a'), hex('#5a5e6a'), KK); R.disco(158, 113, 4, ba2 > 0 ? hex('#ff4a3a') : hex('#a8201a')); R.pset(157, 111, BL);
  if (t > Q6 + 0.1) { tinta(0, 0, 319, 70, hex('#ff3030'), 0.3 + 0.3 * Math.max(0, ba2)); tinta(118, 100, 198, 179, hex('#ff3030'), 0.35 * Math.max(0, ba2), 158, 113, 60); }
  // la fila de pilotos del borde de la consola
  for (let k = 0; k < 26; k++) R.rect(8 + k * 12, 124, 9 + k * 12, 125, Math.sin(t * 5 + k * 1.7) > 0.3 ? (k % 3 ? hex('#5af0a0') : hex('#f0c830')) : hex('#1a3a2a'));
  // la taza con vapor
  for (let k = 0; k < 3; k++) { const y = 136 - ((t * 8 + k * 4) % 12); R.pset(284 + k * 2 + Math.round(Math.sin(t * 3 + k)), Math.round(y), hex('#c8ccd8')); }
  // el brazo de Yelena entra en diagonal y pulsa el botón rojo en «detect»
  const br = tramo(t, tDet - 0.5, tDet) * (1 - tramo(t, tDet + 1.2, tDet + 1.7)), pulsa = t > tDet && t < tDet + 1.2;
  caja(96, 152, 116, 160, hex('#5a5e6a'), hex('#7a7e8a'), KK); R.disco(106, 154, 5, pulsa ? hex('#a8201a') : hex('#e83a2a')); R.pset(104, 152, BL);
  if (br > 0) T.brazo(R, Math.round(lerp(40, 66, br)), 200, Math.round(lerp(70, 100, br)), Math.round(lerp(196, 150 + (pulsa ? 2 : 0), br)), '#2a2430', 1, { codo: [Math.round(lerp(50, 80, br)), Math.round(lerp(200, 172, br))] });
};
// ── 7 · la pared de pantallas: el 4 ──
const p7 = (t) => {
  const o = { encuadre: 'torre', camara: 'mesa', luz: 'noche', pantalla: 'nave' };
  T.washington(R, t, o);
  // el anillo rojo que marca el 4 en «huge number» y el destello en «four»
  R.recorte([97, 24, 222, 92]);
  const c4 = 152 - (t - 35.5) * 2.67, an = tramo(t, tHuge - 0.1, tHuge + 0.4); if (an > 0) for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, r = 17 + (1 - an) * 30 + Math.sin(t * 8) * 1; if (k % 2) { R.pset(Math.round(c4 + Math.cos(a) * r), Math.round(59 + Math.sin(a) * r), hex('#ff3a3a')); R.pset(Math.round(c4 + Math.cos(a) * (r + 1)), Math.round(59 + Math.sin(a) * (r + 1)), hex('#ff8a6a')); } }
  const fl = pulso(t, tFour - 0.05, 0.5); if (fl > 0) { tinta(97, 24, 222, 92, BL, fl * 0.6, c4, 59, 60); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, r = 20 + fl * 30; R.pset(Math.round(c4 + Math.cos(a) * r), Math.round(59 + Math.sin(a) * r * 0.8), BL); } }
  R.recorte(null);
  // los cinco detrás de la mesa: miran la pantalla y saltan en «four»
  const sal = t > tFour && t < tFour + 0.45 ? Math.round(Math.sin((t - tFour) / 0.45 * Math.PI) * 5) : 0, mira = (x) => (x < 140 ? 1 : -1);
  [[EL.sentry, 33], [EL.yelena, 81], [EL.sam, 129], [EL.bucky, 177], [EL.guardian, 225]].forEach(([def, x], i) => {
    R.actor(def, x, 150, t, { dir: mira(x), salto: sal, sorpresa: t > tFour - 0.1, dedo: i === 3 && t > tHuge && t < tFour - 0.1, habla: i === 4 && t < tHuge && Math.sin(t * 9) > 0 }); });
  T.washingtonDelante(R, t, o);
  // las palomitas en la esquina de la mesa: se asustan y se les caen
  T.palomitas(R, 292, 152, t, { s: 1, dir: -1, expresion: t > tFour ? 'susto' : 'normal', cae: tramo(t, tFour, tFour + 0.6) });
};
const efectos = [[tThu + 0.2, 'golpecito'], [tThu + 0.5, 'puerta'], [tYel + 0.35, 'flash'], [tBuc + 0.35, 'flash'], [tGua + 0.35, 'flash'], [tBob + 0.35, 'flash'], [tPow, 'zumbido'], [tWorld, 'publico'], [tNA, 'flash'], [tNA + 0.3, 'brillo'], [tAst, 'brillo'], [tTurn, 'whoosh'], [tTurn + 0.7, 'flash'], [tSued - 0.3, 'papel'], [tBrand, 'boing'], [Q6 + 0.1, 'aviso'], [tDet, 'bip'], [tDet + 0.1, 'interruptor'], [tDim, 'zumbido'], [tHuge, 'aviso'], [tFour + 0.2, 'pop']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3], [Q4, p4], [Q5, p5], [Q6, p6], [Q7, p7]], { efectos, año: 2025 });
''')
