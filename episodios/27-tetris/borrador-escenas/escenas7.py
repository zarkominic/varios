E = {}

# Grupo 7 del ep27: ts-bolsillo (acto 4, la consola de bolsillo), ts-sueldo y ts-tetriscompany (acto 5, el creador sin un
# rublo). Lo común de las tres escenas (cada .html es una página aparte): el reparto, el ruido, los búferes, las texturas,
# los cielos tramados con nubes de tres tonos y las piezas pequeñas que pinta la escena (la consola en la mano, la caja
# de la consola, el sobre, la taza, el avión de papel).
COMUN = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_TS, K = hex('#0c0a12'), BL = hex('#ffffff'), P = (s) => hex(s), Ri = Math.round;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (() => { const m = {}; return (clave, dibuja) => { if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; } R.copiar(m[clave]); }; })();
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tin = (x, y, c, a) => { x = Ri(x); y = Ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const zona = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) tin(x, y, c, a); };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const suave = (u) => u * u * (3 - 2 * u), sale = (u) => 1 - (1 - u) ** 3;
const osc = (c, a = 0.3) => mez(c, K, a), cla = (c, a = 0.3) => mez(c, BL, a);
// un relleno con grano: el color con motas de luz y sombra
const grano = (x0, y0, x1, y1, c, k = 0, a = 0.07) => { const L = cla(c, 0.12), S = osc(c, 0.14);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const n = h(x, y, k); R.pset(x, y, n < a ? S : n > 1 - a ? L : c); } };
// madera: tablas con vetas, juntas escalonadas y algún nudo; c = [medio, luz, sombra, junta]; o.hz false: tablas verticales
const madera = (x0, y0, x1, y1, c, o = {}) => { const [M, L, S, D] = c.map(P), alto = o.alto ?? 9, hz = o.hz !== false, k0 = o.k ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const a = hz ? y - y0 : x - x0, b = hz ? x : y, tb = Math.floor(a / alto), r = a - tb * alto, off = Math.floor(h(tb, k0, 3) * 200), corte = Math.floor((b + off) / 96);
    if (r === alto - 1 || (b + off) % 96 === 0) { R.pset(x, y, D); continue; }
    const v = Math.sin(b * 0.05 + tb * 2.3 + corte * 1.7 + Math.sin(b * 0.017 + tb + corte) * 2.6 + r * 0.7), n = h(x >> 1, y, tb + k0);
    const nudo = Math.hypot(((b + off) % 96) - 48, r - alto / 2) < 2.2 && h(tb, corte, 8) > 0.6;
    R.pset(x, y, nudo ? D : v > 0.86 ? S : (v < -0.93 || r === 0) ? L : n > 0.95 ? S : n < 0.03 ? L : M);
  } };
// cielo tramado en bandas (c0 arriba, c1 abajo)
const cieloT = (x0, y0, x1, y1, c0, c1) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0);
  for (let x = x0; x <= x1; x++) { const v = u + (h(x, y, 4) - 0.5) * 0.2; R.pset(x, y, mez(c0, c1, Math.max(0, Math.min(1, Math.round(v * 7) / 7)))); } } };
// una nube de tres tonos (luz arriba, medio, sombra abajo) y un grupo que pasa a tres velocidades, recortado a su hueco
const NUBES = [P('#ffffff'), P('#e4ecf6'), P('#b0bed6')];
const nube = (cx, cy, w, hh, cs, k) => { for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const d = (i * i) / (w * w) + (j * j) / (hh * hh);
  if (d > 1 - h(i >> 2, j, k) * 0.35) continue; R.pset(Ri(cx + i), cy + j, j >= hh * 0.4 ? cs[2] : (j <= -hh * 0.3 || (i < -w * 0.4 && j < 1)) ? cs[0] : cs[1]); } };
const nubes = (x0, y0, x1, y1, t, cs = NUBES, n = 5, k = 0) => { R.recorte([x0, y0, x1, y1]);
  for (let i = 0; i < n; i++) { const c3 = i % 3, v = [1.4, 3, 5.5][c3], w = [7, 11, 15][c3] + Ri(h(i, k) * 5), hh = Ri(w * 0.36) + 1, ancho = x1 - x0 + 2 * w + 24;
    const cx = x0 - w + ((h(i, k, 2) * ancho + t * v) % ancho), cy = y0 + 3 + Ri(h(i, k, 3) * Math.max(1, (y1 - y0) * 0.5));
    nube(cx, cy, w, hh, cs, i + k); }
  R.recorte(null); };
// pájaros (gaviotas) que cruzan entre x0 y x1 (fuera de la zona de Atom)
const pajaros = (x0, y0, x1, t, n = 3, k = 0) => { for (let i = 0; i < n; i++) { const w = x1 - x0, x = x0 + ((h(i, k) * w + t * (8 + i * 3)) % w), y = y0 + Ri(h(i, k, 5) * 14 + Math.sin(t * 1.3 + i) * 2); R.gaviota(Ri(x), y, t, i + k); } };
// destello en cruz (lo que aparece brilla un momento)
const destello = (x, y, u, c = P('#fff4c0')) => { if (u <= 0 || u >= 1) return; const r = Ri(2 + u * 6), a = 1 - u;
  for (let i = -r; i <= r; i++) { const f = a * (1 - Math.abs(i) / (r + 1)); tin(x + i, y, c, f); tin(x, y + i, c, f); } tin(x, y, BL, a); };
// la consola de bolsillo en la mano de un chibi (11 × 7), centrada en (x, y)
const consolita = (x, y, t, on = true) => { const x0 = Ri(x - 5), y0 = Ri(y - 3);
  R.rect(x0, y0, x0 + 10, y0 + 6, K); R.rect(x0 + 1, y0 + 1, x0 + 9, y0 + 5, P('#c8ccd8')); R.rect(x0 + 1, y0 + 5, x0 + 9, y0 + 5, P('#8c90a4'));
  R.rect(x0 + 3, y0 + 1, x0 + 7, y0 + 4, P('#26302a'));
  if (on) { R.rect(x0 + 4, y0 + 2, x0 + 6, y0 + 3, P('#8ae89a')); R.pset(x0 + 4 + (Math.floor(t * 3) % 3), y0 + 2 + (Math.floor(t * 2) % 2), P('#2a6a3a')); }
  R.pset(x0 + 2, y0 + 3, P('#3a6ad8')); R.pset(x0 + 8, y0 + 2, P('#d83a3a')); R.pset(x0 + 8, y0 + 4, P('#d83a3a')); };
// la caja de la consola (19 × 16, sin letras): azul con franjas, el dibujo de la consola; abre 0–1: las solapas se abren
// y la consola sube encendida. (x, y) = abajo en el centro
const cajaCons = (x, y, abre = 0, t = 0) => { const x0 = Ri(x - 9), y0 = Ri(y - 16);
  if (abre > 0) { consolita(x, y0 + 5 - Ri(sale(abre) * 8), t, true);
    const a = sale(abre); R.poligono([[x0, y0], [x0 + 8, y0], [x0 + 6 - Ri(a * 8), y0 - Ri(a * 5)], [x0 - Ri(a * 4), y0 - Ri(a * 4)]], P('#2a46b0'));
    R.poligono([[x0 + 10, y0], [x0 + 18, y0], [x0 + 22, y0 - Ri(a * 4)], [x0 + 12 + Ri(a * 8), y0 - Ri(a * 5)]], P('#2a46b0')); }
  caja(x0, y0, x0 + 18, y0 + 16, P('#3a5ad8')); R.rect(x0 + 1, y0 + 1, x0 + 17, y0 + 3, P('#f0c040')); R.rect(x0 + 1, y0 + 13, x0 + 17, y0 + 15, P('#e04a7a'));
  R.rect(x0 + 17, y0 + 4, x0 + 17, y0 + 12, P('#2a46b0'));
  R.rect(x0 + 4, y0 + 5, x0 + 14, y0 + 11, K); R.rect(x0 + 5, y0 + 6, x0 + 13, y0 + 10, P('#c8ccd8')); R.rect(x0 + 7, y0 + 6, x0 + 11, y0 + 8, P('#8ae89a'));
  R.pset(x0 + 6, y0 + 9, P('#3a6ad8')); R.pset(x0 + 12, y0 + 9, P('#d83a3a')); R.pset(x0 + 2, y0 + 2, P('#fff8d0')); };
// el sobre (11 × 7, centrado), con su solapa; abierto: la nómina asoma
const sobre = (x, y, abierto = 0) => { const x0 = Ri(x - 5), y0 = Ri(y - 3);
  if (abierto > 0) { const s = Ri(abierto * 5); R.rect(x0 + 2, y0 - s, x0 + 8, y0 + 2, K); R.rect(x0 + 3, y0 + 1 - s, x0 + 7, y0 + 2, P('#f6f2e6')); R.rect(x0 + 4, y0 + 2 - s, x0 + 6, y0 + 2 - s, P('#8a8a96')); }
  R.rect(x0, y0, x0 + 10, y0 + 6, K); R.rect(x0 + 1, y0 + 1, x0 + 9, y0 + 5, P('#e8d8b0'));
  R.linea(x0 + 1, y0 + 1, x0 + 5, y0 + 4, P('#b8a478')); R.linea(x0 + 9, y0 + 1, x0 + 5, y0 + 4, P('#b8a478')); R.pset(x0 + 5, y0 + 4, P('#c83a2a')); };
// una taza (7 × 7, abajo en el centro) que humea
const taza = (x, y, c, t, vapor = true) => { const x0 = Ri(x - 3), y0 = Ri(y - 7);
  R.rect(x0, y0, x0 + 6, y0 + 7, K); R.rect(x0 + 1, y0 + 1, x0 + 5, y0 + 6, c); R.rect(x0 + 1, y0 + 1, x0 + 5, y0 + 1, P('#5a3018')); R.pset(x0 + 1, y0 + 2, cla(c, 0.5));
  R.rect(x0 + 7, y0 + 2, x0 + 8, y0 + 2, K); R.rect(x0 + 8, y0 + 3, x0 + 8, y0 + 5, K); R.rect(x0 + 7, y0 + 6, x0 + 7, y0 + 6, K);
  if (vapor) for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); tin(x + Math.sin(t * 2.4 + k * 2) * 2 * u, y0 - 2 - u * 10, BL, 0.6 * (1 - u)); } };
'''

# ──────────────────────────────────────────────────────────────────
E['ts-bolsillo'] = ('La consola de bolsillo', '''// TS-BOLSILLO (frase 19), verano de 1989. Cuatro planos:
// 1. la juguetería: una madre y su hijo entran; en «console» el niño ve la pirámide de cajas y salta; en «Tetris» el
//    tendero levanta la caja de la consola y en «box» se abre y la consola sube encendida; la caja registradora suena.
//    Corta en «It».
// 2. el autobús: un señor juega sin parar; en «anyone» el niño le pasa la consola a la señora de al lado, que no la
//    entiende («?»); cuenta 1–5 en «five seconds» y ya juega («!»); el del periódico baja el periódico. Corta en «on».
// 3. (inserto) la chaqueta vaquera colgada en la entrada de casa: la mano trae la consola encendida en «machine» y la
//    mete en el bolsillo en «pocket»; le da dos palmaditas; el gato mira. Corta en «sold».
// 4. la nave de envíos: la cinta lleva cajas, el mozo las apila, el contador del tablero sube hasta 35,000,000 en
//    «million» y se ilumina; el del portapapeles levanta los brazos; pasa una carretilla elevadora.''', COMUN + r'''
const b = (f) => en('bolsillo', f);
const P2 = b(.3701), P3 = b(.6213), P4 = b(.8484);
const CONSOLA = b(.1009), TETRIS = b(.25), CAJA = b(.3016), PERFECTA = b(.3942), CUALQUIERA = b(.4783), ENTIENDE = b(.5203), SEG = b(.5936);
const MAQUINA = b(.6489), BOLSILLO = b(.7174), ANOS = b(.7727), TREINTA = b(.8881), MILLONES = b(.9193), COPIAS = b(.9518);
const NINO = { ...TS.ninoJuega, pal: { ...TS.ninoJuega.pal, C: hex('#3a8ad8'), c: hex('#2a68a8') } };
const SENORA = { ...TS.publica, pal: { ...TS.publica.pal, H: hex('#b8b8c4'), h: hex('#dadae2') } };

// ── 1 · la juguetería
const G1 = { encuadre: 'jugueteria' };
const p1 = (t) => {
  T.guerra(R, t, G1);
  // el tendero, detrás del mostrador: se vuelve a la balda a por la caja y la levanta en «Tetris»
  const vuelve = t > TETRIS - 1.3 && t < TETRIS - 0.55, alza = tramo(t, TETRIS - 0.55, TETRIS);
  const ten = R.actor(TS.tendero, 250, 140, t, { dir: vuelve ? 1 : -1, sostiene: alza > 0 ? [Ri(lerp(252, 238, alza)), Ri(lerp(124, 114, alza))] : undefined,
    sonrisa: t > CAJA - 0.2, habla: t > TETRIS && t < CAJA && Math.sin(t * 9) > 0 });
  // el niño de la caseta juega a la consola de demostración
  R.actor(TS.ninoJuega, 92, 158, t, { dir: 1, sonrisa: Math.sin(t * 0.9) > -0.3, salto: Math.sin(t * 7) > 0.92 ? 1 : 0 });
  T.guerraDelante(R, t, { ...G1, caja: tramo(t, CAJA + 0.45, CAJA + 0.7) });
  if (alza > 0) { const g = tramo(t, CAJA - 0.2, CAJA + 0.3) * (1 - tramo(t, P2 - 1.2, P2 - 0.2) * 0.6); if (g > 0) for (let j = -22; j <= 14; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j * 1.2); if (d < 22) tin(ten.mano[0] + i, ten.mano[1] - 4 + j, P('#fff2a0'), g * 0.45 * (1 - d / 22)); }
    for (let k = 0; k < 8 && g > 0; k++) { const a = k * Math.PI / 4 + t * 0.8; tin(ten.mano[0] + Math.cos(a) * 15, ten.mano[1] - 6 + Math.sin(a) * 12, P('#fff8d0'), g * 0.9); }
    cajaCons(ten.mano[0], ten.mano[1] + 6, tramo(t, CAJA - 0.15, CAJA + 0.3), t); }
  destello(ten.mano[0], ten.mano[1] - 10, tramo(t, CAJA + 0.1, CAJA + 0.7));
  // la madre entra, se para con el niño y va al mostrador a pagar
  const m1 = tramo(t, 0.2, 2.3), m2 = tramo(t, TETRIS - 1.6, TETRIS - 0.2), xm = Ri(lerp(-18, 112, m1) + (208 - 112) * m2);
  const paga = t > CAJA + 0.2 && t < CAJA + 1.0;
  const ma = R.actor(TS.publica, xm, 170, t, { dir: 1, anda: (m1 > 0 && m1 < 1) || (m2 > 0 && m2 < 1), sostiene: paga ? [224, 146] : undefined, sonrisa: t > CAJA, habla: t > TETRIS - 0.2 && t < TETRIS + 0.6 && Math.sin(t * 8) > 0 });
  if (paga) { R.rect(ma.mano[0] - 1, ma.mano[1] - 3, ma.mano[0] + 6, ma.mano[1], K); R.rect(ma.mano[0], ma.mano[1] - 2, ma.mano[0] + 5, ma.mano[1] - 1, P('#7ab868')); }
  // el niño corre delante, ve la pirámide de cajas en «console» (salta y señala) y luego corre al mostrador
  const n1 = tramo(t, 0.3, CONSOLA - 0.1), n2 = tramo(t, TETRIS, CAJA - 0.2), xn = Ri(lerp(-30, 104, n1) + (186 - 104) * n2);
  const ve = t > CONSOLA - 0.1 && t < TETRIS, bote = t > CONSOLA && t < CONSOLA + 1.0 ? Ri(Math.abs(Math.sin((t - CONSOLA) * 9)) * 4) : 0;
  const fin = t > CAJA + 0.1 ? Ri(Math.abs(Math.sin((t - CAJA) * 8)) * 4) : 0;
  R.actor(NINO, xn, 176, t, { dir: 1, sinObjeto: true, anda: (n1 > 0 && n1 < 1) || (n2 > 0 && n2 < 1), sorpresa: ve && t < CONSOLA + 0.6, dedo: ve, sonrisa: t > CONSOLA + 0.5, salto: bote || fin, brazos: t > CAJA + 0.1 });
  if (t > CONSOLA - 0.1 && t < CONSOLA + 0.9) R.bocadillo(xn + 8, 146, { icono: '!' });
};

// ── 2 · el autobús
const G2 = { encuadre: 'jugueteria', camara: 'autobus' };
const p2 = (t) => {
  T.guerra(R, t, G2);
  // sentados: el señor que juega sin parar, la señora y el del periódico
  R.actor(TS.adultoJuega, 34, 156, t, { dir: 1, sonrisa: (t > PERFECTA - 0.1 && t < PERFECTA + 1.3) || t > SEG, salto: t > PERFECTA && t < PERFECTA + 0.3 ? 1 : 0 });
  R.actor({ ...TS.publica, pal: { ...TS.publica.pal, H: hex('#c8902a'), C: hex('#3a8a8a'), c: hex('#2a6a6a') } }, 62, 156, t, { dir: -1, sorpresa: t > PERFECTA - 0.1 && t < PERFECTA + 0.6, sonrisa: t > PERFECTA + 0.6, habla: t > PERFECTA + 0.6 && t < PERFECTA + 1.4 && Math.sin(t * 9) > 0 });
  R.actor({ ...TS.publico, pal: { ...TS.publico.pal, C: hex('#6a6a3a'), c: hex('#4a4a2a') } }, 242, 156, t, { dir: -1, sonrisa: t > SEG, sorpresa: t > ENTIENDE && t < SEG });
  const pasa = tramo(t, CUALQUIERA - 0.3, CUALQUIERA + 0.15), tiene = pasa >= 1, juega = t > ENTIENDE;
  const sen = R.actor(SENORA, 120, 156, t, { dir: 1, sostiene: tiene ? [141, juega ? 141 : 139] : undefined, sorpresa: tiene && t < ENTIENDE, sonrisa: t > SEG, salto: t > SEG && t < SEG + 0.35 ? 1 : 0 });
  const baja = tramo(t, ENTIENDE + 0.3, ENTIENDE + 0.7);
  const lee = R.actor(TS.publico, 214, 156, t, { dir: -1, sostiene: [206, Ri(lerp(136, 148, baja))], sorpresa: baja > 0.5 && t < SEG + 0.2, sonrisa: t > SEG + 0.2 });
  { const [x, y] = lee.mano; R.rect(x - 7, y - 7, x + 2, y + 4, K); R.rect(x - 6, y - 6, x + 1, y + 3, P('#ece6d6')); for (let j = y - 5; j <= y + 2; j += 2) R.rect(x - 5, j, x, j, P('#9a968a')); R.rect(x - 5, y - 5, x - 3, y - 4, P('#5a5a66')); R.pset(x - 2, y + 3, P('#c8c0b0')); }
  T.guerraDelante(R, t, { ...G2, capa: 'asientos' });
  // de pie: el niño (le pasa la consola en «anyone» y le explica con el dedo) y un viajero que se agarra a la barra
  R.actor({ ...TS.publico, pal: { ...TS.publico.pal, C: hex('#8a4a6a'), c: hex('#6a3450') } }, 262, 177, t, { dir: -1, dedo: true, sonrisa: t > SEG });
  const nin = R.actor(TS.ninoJuega, 150, 177, t, { dir: -1, sostiene: pasa < 1 ? [Ri(lerp(146, 141, pasa)), Ri(lerp(160, 139, pasa))] : undefined, dedo: tiene && t > ENTIENDE - 0.6 && t < SEG, habla: tiene && t < SEG && Math.sin(t * 9) > 0, sonrisa: true });
  if (pasa < 1) consolita(nin.mano[0], nin.mano[1], t, true); else consolita(sen.mano[0], sen.mano[1], t, juega);
  // la cuenta: de 1 a 5 en «five seconds», y el «!» de la señora
  if (t > ENTIENDE + 0.15 && t < SEG + 0.1) { const n = Math.min(5, 1 + Math.floor((t - ENTIENDE - 0.15) / ((SEG - ENTIENDE - 0.05) / 5))); R.numero(String(n), 128, 125, { centro: true }); }
  if (tiene && t < ENTIENDE) R.bocadillo(128, 126, { icono: '?' });
  if (t > SEG + 0.05) R.bocadillo(128, 126, { icono: '!' });
  T.guerraDelante(R, t, { ...G2, capa: 'barras' });
};
// ── 3 · (inserto) la chaqueta vaquera colgada en la entrada de casa
const DEN = [P('#3e5f90'), P('#5a7cae'), P('#2c4670'), P('#22385a')], COST = P('#d89a48');
const vaquero = (x, y) => { const n = h(x, y, 21); return ((x + y) % 3 === 0) ? DEN[2] : n > 0.93 ? DEN[1] : n < 0.04 ? DEN[3] : DEN[0]; };
const S1 = P('#010203'), S2 = P('#020304');
const recibidor = () => {
  // la moldura del techo; el papel pintado de rayas con florecitas; el zócalo de cuarterones
  R.rect(0, 0, 319, 5, P('#f2ead8')); R.rect(0, 6, 319, 7, P('#c8bc9e'));
  for (let y = 8; y <= 127; y++) for (let x = 0; x <= 271; x++) { const i = x % 16, j = (y - 8) % 20; let c = i < 7 ? P('#cfdcbc') : P('#e2e8cc');
    if (i === 7 || i === 15) c = P('#b8c8a4'); if (i === 11 && (j === 6 || j === 16)) c = P('#c88a7a'); if (i === 11 && (j === 5 || j === 7 || j === 15 || j === 17)) c = P('#8aa878'); if (h(x, y, 5) > 0.97) c = osc(c, 0.08); R.pset(x, y, c); }
  R.rect(0, 128, 271, 131, P('#8a5a32')); R.rect(0, 128, 271, 128, P('#b07a48'));
  madera(0, 132, 271, 179, ['#9a6a3e', '#b48250', '#7a5030', '#5a3820'], { hz: false, alto: 40, k: 2 });
  for (let x = 6; x < 266; x += 52) { R.rect(x, 140, x + 40, 140, P('#c89a62')); R.rect(x, 140, x, 172, P('#c89a62')); R.rect(x + 40, 141, x + 40, 172, P('#5a3820')); R.rect(x + 1, 172, x + 40, 172, P('#5a3820')); }
  // a la derecha, la puerta abierta al salón en penumbra (la esquina de Atom queda tranquila): el marco, la pared lisa, la alfombra
  for (let y = 0; y <= 179; y++) for (let x = 279; x <= 319; x++) R.pset(x, y, y > 150 ? (h(x, y, 2) > 0.8 ? P('#6a3a3a') : P('#7a4440')) : mez(P('#4a3c38'), P('#5e4c44'), y / 150));
  R.rect(272, 0, 278, 179, P('#efe8d6')); R.rect(272, 0, 272, 179, P('#c8bc9e')); R.rect(278, 0, 278, 179, P('#a89c80'));
  caja(288, 104, 318, 132, P('#3a3a44')); R.rect(290, 106, 316, 126, P('#26303a')); R.rect(300, 132, 306, 150, P('#2a2420'));
  R.rect(284, 60, 286, 150, P('#8a7a5a')); R.poligono([[280, 60], [290, 60], [288, 50], [282, 50]], P('#d8c090'));
  // la balda de los sombreros con sus cosas: la sombrerera, la manta, el balón, el guante, el robot de juguete y los juegos de mesa
  madera(0, 40, 270, 45, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 6, k: 7 }); R.rect(0, 46, 270, 46, K);
  for (const x of [20, 136, 252]) { R.poligono([[x, 46], [x + 6, 46], [x, 54]], P('#5a321c')); }
  zona(0, 47, 270, 49, K, 0.2);
  caja(12, 22, 40, 39, P('#e8c0c8')); for (let x = 14; x < 40; x += 4) R.rect(x, 23, x + 1, 38, P('#c87a8a')); R.rect(12, 22, 40, 24, P('#d8a0b0')); R.rect(12, 22, 40, 22, K);
  for (let k = 0; k < 4; k++) { R.rect(50, 28 + k * 3, 82, 30 + k * 3, k % 2 ? P('#c84a3a') : P('#3a6a9a')); R.rect(50, 30 + k * 3, 82, 30 + k * 3, osc(P('#3a6a9a'), 0.3)); } R.rect(49, 27, 49, 39, K);
  R.disco(100, 32, 8, K); R.disco(100, 32, 7, P('#e07a2a')); R.linea(93, 32, 107, 32, P('#7a3a14')); R.linea(100, 25, 100, 39, P('#7a3a14')); R.pset(97, 28, P('#f8b070')); R.pset(96, 29, P('#f8b070'));
  R.poligono([[118, 39], [118, 28], [124, 24], [132, 26], [136, 34], [134, 39]], P('#a8642a')); R.linea(124, 26, 124, 38, P('#7a4418')); R.linea(129, 27, 129, 38, P('#7a4418'));
  caja(150, 24, 162, 39, P('#a8b0c0')); R.rect(152, 27, 154, 29, P('#e83a3a')); R.rect(158, 27, 160, 29, P('#e83a3a')); R.rect(153, 33, 159, 34, K); R.rect(155, 20, 157, 23, P('#8a92a2')); R.pset(156, 19, P('#f0d040'));
  for (let k = 0; k < 4; k++) { const c = ['#2a8a5a', '#d8a030', '#7a4ab0', '#c83a3a'][k]; caja(178 + k, 26 + k * 3, 222 - k, 29 + k * 3, P(c)); }
  R.rect(236, 32, 254, 38, K); R.rect(237, 33, 253, 37, P('#3a3a44')); R.rect(237, 33, 253, 33, P('#6a6a74')); R.rect(253, 32, 256, 38, P('#c8c8d0')); R.pset(255, 35, P('#fff4b0'));
  // la percha de pared con sus pomos
  madera(6, 56, 268, 62, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 7, k: 9 }); R.rect(6, 63, 268, 63, K);
  for (const x of [40, 110, 196]) { R.disco(x, 66, 3, K); R.disco(x, 66, 2, P('#c8a060')); R.pset(x - 1, 65, P('#f0d890')); }
  // la gorra roja en el segundo pomo (sin escudo)
  R.poligono([[100, 76], [101, 68], [106, 64], [114, 64], [119, 68], [120, 76]], P('#c83a3a')); R.linea(100, 76, 120, 76, K); R.rect(98, 76, 126, 78, P('#9a2a2a')); R.rect(98, 79, 126, 79, K); R.pset(110, 64, P('#e86a5a')); R.linea(110, 65, 110, 75, P('#9a2a2a'));
  // la chaqueta vaquera: cuerpo y mangas (rellenos con la sarga), contorno negro
  R.poligono([[166, 66], [226, 66], [244, 80], [244, 176], [148, 176], [148, 80]], S1);
  R.poligono([[148, 80], [132, 94], [126, 168], [145, 171], [149, 108]], S2); R.poligono([[244, 80], [260, 94], [266, 168], [247, 171], [243, 108]], S2);
  const borde = []; for (let y = 60; y <= 179; y++) for (let x = 120; x <= 272; x++) { const c = R.pget(x, y); if (c !== S1 && c !== S2) continue; const fuera = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, bb]) => { const d = R.pget(x + a, y + bb); return d !== S1 && d !== S2; }); if (fuera) borde.push([x, y]); }
  for (let y = 60; y <= 179; y++) for (let x = 120; x <= 272; x++) { const c = R.pget(x, y); if (c === S1) R.pset(x, y, vaquero(x, y)); else if (c === S2) R.pset(x, y, osc(vaquero(x, y), x < 148 ? 0.16 : 0.1)); }
  for (const [x, y] of borde) R.pset(x, y, K);
  for (const s of [-1, 1]) { const x0 = s < 0 ? 128 : 246; for (let x = x0; x <= x0 + 18; x++) { R.pset(x, 160, COST); R.pset(x, 164, DEN[3]); } }
  R.linea(149, 108, 146, 168, DEN[3]); R.linea(243, 108, 246, 168, DEN[3]);
  // el cuello de borrego, la tira de botones, los bolsillos del pecho con solapa, el de la cadera izquierda y el bajo
  R.poligono([[166, 66], [196, 63], [226, 66], [216, 82], [196, 74], [176, 82]], P('#e8dcc0'));
  for (let k = 0; k < 50; k++) { const x = 168 + Ri(h(k, 1, 7) * 56), y = 66 + Ri(h(k, 2, 7) * 12); if (y < 66 + Math.abs(x - 196) * 0.5 + 1) R.pset(x, y, P('#c8b890')); }
  R.linea(166, 66, 176, 82, K); R.linea(226, 66, 216, 82, K); R.linea(176, 82, 196, 74, K); R.linea(216, 82, 196, 74, K);
  R.rect(196, 75, 196, 175, DEN[3]); R.rect(198, 75, 198, 175, COST);
  for (const y of [92, 114, 136, 158]) { R.disco(201, y, 2, K); R.disco(201, y, 1, P('#c87a3a')); R.pset(200, y - 1, P('#f0b070')); }
  for (const x0 of [160, 208]) { R.rect(x0, 98, x0 + 24, 116, DEN[3]); for (let y = 99; y <= 115; y++) for (let x = x0 + 1; x <= x0 + 23; x++) R.pset(x, y, vaquero(x + 1, y)); R.rect(x0, 98, x0 + 24, 103, DEN[2]); R.linea(x0, 103, x0 + 12, 107, K); R.linea(x0 + 24, 103, x0 + 12, 107, K); R.disco(x0 + 12, 105, 1, P('#c87a3a')); for (let x = x0 + 2; x <= x0 + 22; x += 2) R.pset(x, 114, COST); }
  for (let y = 148; y <= 172; y++) for (let x = 154; x <= 188; x++) R.pset(x, y, vaquero(x + 2, y + 1)); R.rect(154, 148, 188, 148, K); R.rect(154, 148, 154, 172, K); R.rect(188, 148, 188, 172, K); R.rect(154, 172, 188, 172, K);
  for (let x = 156; x <= 186; x += 2) R.pset(x, 151, COST); for (let y = 151; y <= 170; y += 2) { R.pset(156, y, COST); R.pset(186, y, COST); }
  for (let x = 150; x <= 242; x++) if (x % 2) R.pset(x, 174, COST);
  for (let y = 84; y <= 170; y += 3) { R.pset(151, y, COST); R.pset(241, y, COST); }
  // la bufanda va en la vida; el paragüero con el paraguas rojo; el reloj de pared; la mesita con la lámpara, el teléfono y el cuenco de las llaves
  R.rect(8, 146, 32, 179, K); R.rect(9, 147, 31, 179, P('#6a7a8a')); for (let x = 10; x <= 30; x += 4) R.rect(x, 147, x, 179, P('#8a9aaa')); R.rect(9, 147, 31, 149, P('#aab8c4'));
  R.linea(16, 146, 12, 110, K); R.linea(17, 146, 13, 110, P('#3a3a44')); R.poligono([[10, 110], [18, 106], [24, 126], [14, 134]], P('#c83a3a')); R.linea(12, 110, 14, 134, P('#8a2a2a')); R.rect(8, 106, 13, 108, P('#3a3a44'));
  R.disco(80, 92, 11, K); R.disco(80, 92, 10, P('#8a5a32')); R.disco(80, 92, 8, P('#f6f0e0'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Ri(80 + Math.cos(a) * 7), Ri(92 + Math.sin(a) * 7), P('#5a4a3a')); }
  madera(52, 136, 120, 141, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 6, k: 4 }); R.rect(52, 142, 120, 142, K);
  R.rect(56, 143, 58, 179, P('#5a321c')); R.rect(114, 143, 116, 179, P('#5a321c')); R.rect(58, 160, 114, 162, P('#6a3a1e'));
  R.rect(66, 120, 70, 135, P('#c8a060')); R.rect(62, 132, 74, 135, P('#8a6a3a')); R.poligono([[58, 120], [78, 120], [74, 106], [62, 106]], P('#f0e0b0')); R.linea(58, 120, 62, 106, P('#c8b080')); R.linea(78, 120, 74, 106, P('#c8b080'));
  R.poligono([[80, 135], [96, 135], [93, 130], [83, 130]], P('#3a7a8a')); R.pset(86, 129, P('#e0c060')); R.pset(90, 128, P('#c0c0c8'));
  for (let y = 60; y < 180; y++) for (let x = 20; x < 150; x++) { const d = Math.hypot(x - 68, (y - 116) * 1.2); if (d < 50) tin(x, y, P('#fff0c0'), 0.2 * (1 - d / 50)); }
};
const bolsilloFrente = (dentro, t) => {   // el bolsillo de la cadera derecha (x 206–242, boca en y 148, fondo y 174), por delante de la consola
  for (let y = 148; y <= 173; y++) for (let x = 206; x <= 242; x++) { let c = vaquero(x + 2, y + 1); if (dentro && x > 209 && x < 239 && y > 150 && y < 162) c = cla(c, 0.08); if (dentro && (x === 209 || x === 239) && y > 149 && y < 163) c = DEN[2]; R.pset(x, y, c); }
  R.rect(206, 148, 242, 148, K); R.rect(206, 149, 242, 150, DEN[2]); R.rect(206, 148, 206, 173, K); R.rect(242, 148, 242, 173, K); R.rect(206, 173, 242, 173, K);
  for (let x = 208; x <= 240; x += 2) R.pset(x, 152, COST); for (let y = 152; y <= 171; y += 2) { R.pset(208, y, COST); R.pset(240, y, COST); }
  R.pset(208, 151, P('#e0a050')); R.pset(240, 151, P('#e0a050'));
  if (dentro) for (let x = 212; x <= 236; x++) tin(x, 147, P('#8ae89a'), 0.3 + 0.15 * Math.sin(t * 5 + x * 0.3));
};
const p3 = (t) => {
  capa('recibidor', recibidor);
  // el reloj, la bufanda que se mece, la tele del salón que parpadea y el gato de la mesita
  { const a = t * Math.PI / 30 - 1.2, m = 0.4; R.linea(80, 92, Ri(80 + Math.cos(a) * 7), Ri(92 + Math.sin(a) * 7), P('#c83a2a')); R.linea(80, 92, Ri(80 + Math.cos(m) * 5), Ri(92 + Math.sin(m) * 5), K); R.linea(80, 92, 80, 87, K); }
  { const s = Math.sin(t * 1.6) * 2; for (let y = 67; y <= 128; y++) { const dx = Ri(s * (y - 67) / 61); for (let x = 34; x <= 44; x++) R.pset(x + dx, y, x === 34 || x === 44 ? K : Math.floor((y - 67) / 6) % 2 ? P('#c83a3a') : P('#f2ece0')); }
    for (let k = 0; k < 5; k++) R.linea(35 + k * 2 + Ri(s), 129, 35 + k * 2 + Ri(s * 1.2), 133, P('#c83a3a')); }
  { const f = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 2.3); R.rect(290, 106, 316, 126, mez(P('#2a4a6a'), P('#8ab0d0'), f * 0.6)); zona(280, 132, 319, 160, P('#8ab0d0'), 0.06 * f); }
  T.gato(R, 104, 136, t, { dir: 1 });
  for (let k = 0; k < 7; k++) { const u = (t * 0.06 + h(k, 3)) % 1; tin(46 + h(k, 4) * 46 + Math.sin(t + k) * 4, 140 - u * 60, P('#fff8e0'), 0.7); }
  // la consola: sube con la mano en «machine» (la pantalla destella), baja al bolsillo en «pocket» y la mano da dos palmaditas
  const sube = sale(tramo(t, P3, MAQUINA)), mete = suave(tramo(t, MAQUINA + 0.5, BOLSILLO)), dentro = mete >= 1;
  const cx = Ri(lerp(268, 224, sube)), by = Ri(lerp(212, 142, sube) + (160 - 142) * mete);
  PZ.consolaBolsillo(R, cx, by, { encendida: true, t });
  if (!dentro) for (let i = 0; i < 3; i++) tin(cx - 6 + i * 4 + (Math.floor(t * 4) % 3), by - 8, P('#2a5a30'), 0.6);
  destello(cx, by - 8, tramo(t, MAQUINA - 0.1, MAQUINA + 0.5));
  bolsilloFrente(dentro, t);
  const pal = tramo(t, BOLSILLO + 0.1, BOLSILLO + 0.9), va = tramo(t, BOLSILLO + 1.0, ANOS + 0.6);
  let wx = cx + 25, wy = by - 7;
  if (dentro) { wx = 246 + Ri(va * 20); wy = 156 - Ri(Math.abs(Math.sin(pal * Math.PI * 2)) * 5) + Ri(va * 50); }
  if (wy < 200) T.brazo(R, wx + 28, wy + 54, wx, wy, '#c83a3a', -1, { codo: [wx + 24, wy + 28] });
};

// ── 4 · la nave de envíos con el contador
const nave = () => {
  // cerchas del techo, la chapa ondulada, la fila de ventanas altas (el cielo va en la vida) y las estanterías de cajas
  R.rect(0, 0, 319, 17, P('#2a2e3a')); for (let x = -20; x < 340; x += 24) { R.linea(x, 16, x + 12, 2, P('#5a6070')); R.linea(x + 12, 2, x + 24, 16, P('#5a6070')); } R.rect(0, 1, 319, 2, P('#6a7080')); R.rect(0, 16, 319, 17, P('#6a7080'));
  for (let y = 18; y <= 117; y++) for (let x = 0; x <= 319; x++) { const r = x % 8; let c = r < 2 ? P('#7a8aa0') : r < 5 ? P('#9aaabe') : r < 7 ? P('#8a9ab0') : P('#5a6a80'); if (h(x >> 2, y >> 3, 6) > 0.96) c = P('#9a8a70'); R.pset(x, y, c); }
  for (let x = 0; x < 320; x += 80) { R.rect(x, 18, x + 1, 117, P('#4a5466')); for (let y = 24; y < 117; y += 18) R.pset(x + 3, y, P('#c8ccd8')); }
  for (const x0 of [4, 262]) { caja(x0 + 4, 66, x0 + 6, 68, P('#3a3a44')); }
  // las ventanas altas entre x 0–60 y 262–320 se tapan con baldas; las ventanas, bajo el tablero
  for (const [x0, x1] of [[8, 56], [266, 312]]) { for (const y of [56, 86, 116]) { R.rect(x0, y, x1, y + 2, P('#d87a2a')); R.rect(x0, y + 3, x1, y + 3, K); }
    R.rect(x0, 30, x0 + 1, 118, P('#3a6ab0')); R.rect(x1 - 1, 30, x1, 118, P('#3a6ab0'));
    for (const y of [56, 86, 116]) for (let x = x0 + 3; x < x1 - 14; x += 19) cajaCons(x + 9, y, 0, 0); }
  R.rect(64, 70, 256, 100, K); for (const x of [64, 128, 192, 256]) R.rect(x, 70, x + 1, 100, P('#4a5466'));
  // el suelo de hormigón: juntas, la línea amarilla, manchas de aceite
  for (let y = 118; y <= 179; y++) for (let x = 0; x <= 319; x++) { const n = h(x, y, 8); let c = n < 0.06 ? P('#8a8a86') : n > 0.95 ? P('#b8b8b0') : P('#a2a29a'); if ((x % 64 === 0) || (y === 140)) c = P('#7a7a74'); R.pset(x, y, c); }
  for (let x = 0; x <= 319; x++) { R.pset(x, 170, P('#e8c040')); R.pset(x, 171, P('#e8c040')); if (x % 12 < 6) { R.pset(x, 172, P('#2a2a2a')); } }
  for (const [x, y, r] of [[60, 160, 7], [210, 150, 5], [300, 166, 6]]) for (let j = -3; j <= 3; j++) for (let i = -r; i <= r; i++) if (i * i / (r * r) + j * j / 9 < 1 - h(i, j, 3) * 0.4) tin(x + i, y + j, P('#3a3a40'), 0.35);
  // la cinta transportadora: bastidor, patas y rodillos
  R.rect(0, 118, 236, 120, K); R.rect(0, 121, 236, 126, P('#4a4e5a')); R.rect(0, 127, 236, 128, K);
  for (let x = 6; x < 236; x += 40) { R.rect(x, 129, x + 2, 150, P('#5a5e6a')); R.rect(x - 2, 150, x + 4, 152, K); }
  // el palé de la derecha
  R.rect(232, 146, 316, 152, P('#a8743c')); for (let x = 234; x < 316; x += 10) R.rect(x, 152, x + 4, 156, P('#7a5028')); R.rect(232, 146, 316, 146, P('#c89058'));
};
const p4 = (t) => {
  capa('nave', nave);
  // el cielo por las ventanas altas, recortado
  R.recorte([66, 72, 254, 98]); for (let y = 72; y <= 98; y++) for (let x = 66; x <= 254; x++) R.pset(x, y, ((x + y) & 1) && h(x, y) > (y - 72) / 26 ? P('#a8c8ec') : P('#cfe2f6')); R.recorte(null);
  nubes(66, 72, 254, 98, t, NUBES, 5, 3); for (const x of [128, 192]) R.rect(x, 70, x + 1, 100, P('#4a5466'));
  pajaros(70, 76, 250, t, 2, 4);
  // el tablero del contador: marco dorado con bombillas que corren; en «million» se iluminan todas
  const u = tramo(t, P4 + 0.15, MILLONES + 0.45), v = Math.round(35e6 * (1 - (1 - u) ** 2.2) / 1000) * 1000, lleno = u >= 1;
  caja(62, 20, 258, 64, P('#1c1a24')); R.rect(63, 21, 257, 22, P('#c8a040')); R.rect(63, 62, 257, 63, P('#8a6a20'));
  for (let i = 0; i < 25; i++) { const x = 66 + i * 8, on = lleno ? Math.floor(t * 8) % 2 === 0 : (i + Math.floor(t * 10)) % 5 === 0; R.pset(x, 24, on ? P('#fff0a0') : P('#6a5a30')); R.pset(x, 60, on ? P('#fff0a0') : P('#6a5a30')); }
  R.rect(70, 29, 250, 56, P('#24222e')); R.rect(70, 42, 250, 42, P('#121018')); for (let x = 74; x < 250; x += 16) R.pset(x, 42, P('#3a3846'));
  R.numero(v.toLocaleString('en-US'), 160, 53, { tam: 16, centro: true });
  if (lleno) { destello(80, 40, tramo(t, MILLONES + 0.45, MILLONES + 1.1)); destello(240, 40, tramo(t, MILLONES + 0.6, MILLONES + 1.3)); }
  // las cajas por la cinta (la goma corre) y el montón del palé que crece
  for (let x = 0; x <= 236; x++) if ((x + Math.floor(t * 30)) % 6 === 0) R.pset(x, 123, P('#6a6e7a'));
  const per = 0.9, vel = 36;
  for (let k = -1; k < 10; k++) { const x = ((t * vel + k * vel * per) % (10 * vel * per)) - 20; if (x < -10 || x > 226) continue; cajaCons(Ri(x), 118, 0, 0); }
  const n = Math.min(18, 5 + Math.floor(u * 13));
  for (let i = 0; i < n; i++) { const fila = Math.floor(i / 6), col = i % 6; cajaCons(250 + col * 11 - (fila % 2) * 5, 146 - fila * 16, 0, 0); }
  // el mozo: coge la caja al final de la cinta y la apila; el capataz del portapapeles mira el contador
  const fase = (t * 1.1) % 1, lleva = fase < 0.5;
  const mozo = R.actor(TS.operario, 228, 160, t, { dir: lleva ? 1 : -1, sostiene: [lleva ? 246 : 232, 138], sonrisa: lleno });
  if (lleva) cajaCons(mozo.mano[0], mozo.mano[1] + 6, 0, 0);
  const capataz = { ...TS.operario, pal: { ...TS.operario.pal, J: hex('#c83a2a'), C: hex('#6a6a7a') } };
  const cp = R.actor(capataz, 120, 164, t, { dir: 1, sorpresa: t > TREINTA - 0.2 && t < MILLONES + 0.4, dedo: t > TREINTA - 0.2 && t < MILLONES + 0.4, brazos: t > MILLONES + 0.45, salto: t > MILLONES + 0.45 && Math.sin(t * 10) > 0 ? 2 : 0, sonrisa: lleno, sostiene: t < TREINTA - 0.2 ? true : undefined });
  if (t < TREINTA - 0.2) { const [x, y] = cp.mano; R.rect(x - 2, y - 6, x + 4, y + 2, K); R.rect(x - 1, y - 5, x + 3, y + 1, P('#f2eee2')); R.rect(x, y - 6, x + 2, y - 5, P('#5a5a66')); R.pset(x, y - 3, P('#8a8a96')); R.pset(x, y - 1, P('#8a8a96')); }
  // delante a la izquierda, el palé de cajas ya flejado (con su lámina de plástico que brilla)
  R.rect(0, 170, 52, 176, P('#a8743c')); for (let x = 2; x < 52; x += 10) R.rect(x, 176, x + 4, 179, P('#7a5028'));
  for (let f = 0; f < 3; f++) for (let k = 0; k < 3; k++) cajaCons(9 + k * 17, 170 - f * 16, 0, 0);
  R.rect(26, 122, 27, 170, P('#e8e0d0')); R.rect(0, 140, 52, 140, P('#e8e0d0')); for (let k = 0; k < 4; k++) tin(4 + k * 13 + Math.sin(t * 2 + k) * 2, 128 + k * 9, BL, 0.5);
  // la carretilla elevadora pasa por delante con su palé de cajas
  const fx = Ri(lerp(-70, 340, tramo(t, P4 + 1.6, P4 + 5.2)));
  if (fx > -70 && fx < 340) {
    R.actor(TS.operario, fx + 6, 166, t, { dir: 1 });
    R.rect(fx, 154, fx + 30, 172, K); R.rect(fx + 1, 155, fx + 29, 171, P('#e8b830')); R.rect(fx + 1, 155, fx + 29, 157, P('#f8d860')); R.rect(fx + 1, 167, fx + 29, 171, P('#b88a20'));
    R.rect(fx + 2, 128, fx + 3, 156, K); R.rect(fx + 22, 128, fx + 23, 156, K); R.rect(fx + 2, 128, fx + 23, 129, K);
    R.rect(fx + 31, 132, fx + 34, 172, P('#4a4a54')); R.rect(fx + 34, 168, fx + 50, 170, P('#6a6a74')); R.rect(fx + 34, 164, fx + 50, 167, P('#a8743c'));
    cajaCons(fx + 42, 164, 0, 0); cajaCons(fx + 42, 148, 0, 0);
    for (const wx of [fx + 7, fx + 24]) { R.disco(wx, 173, 5, K); R.disco(wx, 173, 3, P('#3a3a44')); R.pset(wx + Ri(Math.cos(t * 9) * 2), 173 + Ri(Math.sin(t * 9) * 2), P('#8a8a96')); }
    R.pset(fx + 2, 126 + (Math.floor(t * 4) % 2), P('#ffa020'));
  }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[CONSOLA, 'pop'], [CAJA, 'brillo'], [CAJA + 0.5, 'timbre'], [ENTIENDE + 0.1, 'bip'], [SEG + 0.05, 'pop'], [MAQUINA, 'bip'], [BOLSILLO - 0.1, 'papel'],
    [P4 + 0.2, 'maquina'], [MILLONES + 0.45, 'campana'], [MILLONES + 0.9, 'publico']],
  año: (t) => (t < P4 ? 1989 : Math.round(lerp(1989, 1998, tramo(t, P4 + 0.2, MILLONES + 0.45)))),
});
''')

# ──────────────────────────────────────────────────────────────────
E['ts-sueldo'] = ('El sueldo', '''// TS-SUELDO (frase 20), 1990. Tres planos:
// 1. el centro de cálculo de día (ventanas a Moscú nevado con sol, haces de luz en el suelo): el compañero de la mesa
//    de la derecha juega y salta en «world»; la científica cruza con listados; el burócrata trae el sobre de la nómina
//    y se lo da a Pázhitnov en «salary». Corta en «as».
// 2. (inserto) la mesa de Pázhitnov a ras de tablero: su mano saca la nómina («120»); la mano del funcionario sella los
//    contratos en «signed» y «contracts»; las monedas saltan a la caja del Estado (la estrella roja) en «money went to
//    the state»; la última rebota, rueda por la mesa, da vueltas y se para junto a su mano (gag 6). Corta en «The only».
// 3. el pasillo del instituto: dos operarios traen en la carretilla una caja grande, llaman en «got» a la puerta 214;
//    Pázhitnov abre; en «better computer» la caja se abre y sube el ordenador nuevo; salta en «office».''', COMUN + r'''
const s = (f) => en('sueldo', f);
const P2 = s(.3296), P3 = s(.7227);
const MUNDO = s(.1807), SUELDO = s(.2456), FIRMA = s(.514), CONTRATOS = s(.5435), DINERO = s(.6128), ESTADO = s(.6629), RECIBE = s(.7831), MEJOR = s(.8672), ORDENADOR = s(.8834), OFICINA = s(.9513);
const MANGA_PZ = '#5e6e58', MANGA_BUR = '#6a6c72';
// Moscú nevado de día por el hueco [x0, y0, x1, y1] (recortado): cielo, nubes, bloques con nieve, humo, la torre y la nieve
const vistaDia = (x0, y0, x1, y1, t, k = 0, torre = false) => {
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0); R.pset(x, y, ((x + y) & 1) && h(x, y, 2) > u ? P('#a6c4e2') : P('#d6e4f2')); }
  nubes(x0, y0, x1, y0 + 20, t + k * 7, NUBES, 3, k);
  if (torre) { const cx = x0 + 14; R.rect(cx - 3, y0 + 14, cx + 3, y1, P('#b8aa98')); R.rect(cx - 6, y0 + 26, cx + 6, y1, P('#c8baa6')); R.rect(cx - 1, y0 + 6, cx + 1, y0 + 14, P('#a89a88')); R.pset(cx, y0 + 4, P('#d83a2a')); R.pset(cx, y0 + 5, P('#d83a2a')); for (let y = y0 + 28; y < y1; y += 4) for (let x = cx - 4; x <= cx + 4; x += 3) R.pset(x, y, P('#8a8478')); }
  for (let f = 0; f < 2; f++) { let x = x0 - 4 + f * 7; while (x < x1) { const w = 10 + Ri(h(x, f, k) * 10), al = (f ? 12 : 22) + Ri(h(x, f, 2) * 8), top = y1 - al; R.rect(x, top, x + w, y1, f ? P('#9a948a') : P('#b4ac9e')); R.rect(x, top, x + w, top + 1, P('#f6f8fc'));
    for (let y = top + 4; y < y1 - 1; y += 4) for (let i = x + 2; i < x + w - 1; i += 3) R.pset(i, y, P('#6a7080'));
    if (h(x, f, 6) > 0.5) { const c = x + Ri(w / 2); R.rect(c, top - 3, c + 1, top, P('#7a6a5a')); for (let j = 0; j < 4; j++) { const u = (t * 0.3 + j / 4 + h(x, 1)) % 1; tin(c + u * 6 + Math.sin(t + j) * 1, top - 4 - u * 12, P('#eef0f4'), 0.7 * (1 - u)); } }
    x += w + 2; } }
  for (let i = 0; i < 18; i++) { const w = x1 - x0, hh = y1 - y0, x = x0 + ((h(i, k, 1) * w + Math.sin(t + i) * 2 + t * 3) % w), y = y0 + ((h(i, k, 2) * hh + t * (6 + i % 4)) % hh); R.pset(Ri(x), Ri(y), BL); }
  R.recorte(null);
};
const marco = (x0, y0, x1, y1, mx, ty) => { const F = P('#e2ded0'), S = P('#a8a496');
  R.rect(x0, y0, x1, y0 + 1, F); R.rect(x0, y1 - 1, x1, y1, F); R.rect(x0, y0, x0 + 1, y1, F); R.rect(x1 - 1, y0, x1, y1, F);
  R.rect(mx, y0, mx + 1, y1, F); R.rect(mx + 2, y0 + 2, mx + 2, y1 - 2, S); R.rect(x0, ty, x1, ty + 1, F); R.rect(x0 + 2, ty + 2, x1 - 2, ty + 2, S);
  for (let x = x0 + 2; x < x1 - 1; x++) { R.pset(x, y1 - 2, P('#f6f8fc')); if (h(x, 3) > 0.5) R.pset(x, y1 - 3, P('#f6f8fc')); } };
// haces de sol que entran por una ventana y caen al suelo, en diagonal
const haz = (x0, x1, yv, yf, dx, a = 0.13) => { for (let y = yv; y <= yf; y++) { const e = (y - yv) / (yf - yv) * dx; for (let x = Ri(x0 + e); x <= Ri(x1 + e); x++) tin(x, y, P('#fff4d0'), a * (0.6 + 0.4 * (1 - (y - yv) / (yf - yv)))); } };

// ── 1 · el centro de cálculo de día
const p1 = (t) => {
  T.centro(R, t, {});
  vistaDia(10, 26, 54, 78, t, 0, true); marco(8, 24, 56, 80, 31, 36);
  vistaDia(66, 26, 110, 78, t, 1); marco(64, 24, 112, 80, 87, 36);
  T.tinte(R, 0, 179, [255, 238, 205], 0.07);
  haz(12, 52, 82, 150, 46, 0.08); haz(68, 108, 82, 150, 46, 0.08);
  // el compañero de la mesa de la derecha juega al juego de corchetes y salta en «world»
  R.actor(TS.cientifico, 232, 150, t, { dir: 1, sonrisa: true, salto: t > MUNDO - 0.15 && t < MUNDO + 0.5 ? Ri(Math.abs(Math.sin((t - MUNDO) * 9)) * 3) : 0, brazos: t > MUNDO - 0.1 && t < MUNDO + 0.6 });
  // Pázhitnov teclea; se vuelve al burócrata y coge el sobre en «salary»
  const coge = t > SUELDO;
  const pz = R.actor(TS.pazhitnov, 72, 150, t, { dir: t > SUELDO - 0.9 ? 1 : -1, sostiene: coge ? [88, 132] : undefined, habla: t > SUELDO - 0.6 && t < SUELDO && Math.sin(t * 9) > 0 });
  T.centroDelante(R, t, {});
  if (coge) sobre(pz.mano[0] + 2, pz.mano[1], tramo(t, SUELDO + 0.3, SUELDO + 0.8));
  if (t > SUELDO + 0.5) R.bocadillo(80, 117, { icono: 'factura' });
  // la científica cruza con los listados; el burócrata llega con el sobre
  const cu = tramo(t, 0.3, 3.4); if (cu > 0 && cu < 1) { const c = R.actor(TS.cientifica, Ri(lerp(-16, 334, cu)), 170, t, { dir: 1, anda: true, sostiene: true }); R.rect(c.mano[0] - 3, c.mano[1] - 4, c.mano[0] + 4, c.mano[1] + 1, K); R.rect(c.mano[0] - 2, c.mano[1] - 3, c.mano[0] + 3, c.mano[1], P('#f2eee2')); R.rect(c.mano[0] - 2, c.mano[1] - 2, c.mano[0] + 3, c.mano[1] - 2, P('#9ad8a0')); }
  const bu = tramo(t, 1.3, SUELDO - 0.5), entrega = t > SUELDO - 0.5 && t <= SUELDO;
  const br = R.actor(TS.burocrata, Ri(lerp(334, 128, bu)), 162, t, { dir: -1, anda: bu > 0 && bu < 1, sostiene: entrega ? [118, 136] : (bu < 1 ? true : undefined), habla: entrega && Math.sin(t * 8) > 0 });
  if (!coge && bu > 0) sobre(br.mano[0] - 2, br.mano[1]);
};

// ── 2 · (inserto) la mesa a ras de tablero
const MON = [P('#c8ccd8'), P('#8c90a4'), P('#ffffff')];
const mesa = () => {
  // la pared de dos tonos con su filete; la ventana (la vista va en la vida); el corcho, la balda de carpetas y el calendario
  grano(0, 0, 319, 63, P('#d8d4c4'), 11, 0.06); grano(0, 64, 319, 99, P('#5a8a6a'), 12, 0.05); R.rect(0, 63, 319, 63, P('#3a5a46')); R.rect(0, 64, 319, 64, P('#7aaa88'));
  caja(12, 6, 100, 86, P('#e2ded0')); R.rect(10, 86, 102, 90, P('#c8c4b6')); R.rect(10, 90, 102, 90, P('#8a8678'));
  caja(118, 16, 196, 52, P('#b8844a')); for (let k = 0; k < 160; k++) R.pset(119 + Ri(h(k, 1) * 76), 17 + Ri(h(k, 2) * 34), h(k, 3) > 0.5 ? P('#a07038') : P('#c8945a'));
  for (const [x, y, c] of [[124, 20, '#f2eee2'], [146, 24, '#f0e8a0'], [170, 19, '#f2eee2'], [178, 34, '#c8e0f0']]) { R.rect(x, y, x + 14, y + 12, P(c)); R.rect(x, y + 13, x + 14, y + 13, P('#8a6a3a')); R.disco(x + 7, y + 1, 1, P('#d83a2a')); }
  for (let i = 0; i < 4; i++) { R.rect(126 + i * 3, 25, 127 + i * 3, 26, K); } R.rect(150, 28, 156, 34, P('#3a3a44')); R.rect(152, 30, 154, 32, P('#f0e8a0'));
  R.numero('4', 186, 31, { color: P('#2a2a34'), sombra: false });
  madera(116, 54, 200, 58, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 5, k: 3 });
  for (let i = 0; i < 9; i++) { const x = 120 + i * 9, c = ['#c83a2a', '#3a5aa8', '#e8b830', '#5a8a5a', '#8a5aa8'][i % 5]; R.rect(x, 36, x + 7, 53, K); R.rect(x + 1, 37, x + 6, 53, P(c)); R.rect(x + 2, 44, x + 5, 46, P('#f2eee2')); }
  caja(218, 18, 262, 60, P('#f6f2e6')); R.rect(219, 19, 261, 27, P('#c83a2a')); R.disco(230, 18, 1, K); R.disco(250, 18, 1, K);
  R.numero('90', 240, 46, { centro: true, color: P('#2a2a34'), sombra: false });
  for (let k = 0; k < 7; k++) R.rect(222 + k * 5, 52, 224 + k * 5, 54, k === 3 ? P('#c83a2a') : P('#8a8a96'));
  // el radiador bajo la ventana con su tubo, el teléfono de pared, la lámina del cohete, el termómetro y el enchufe
  R.rect(18, 91, 94, 99, K); for (let x = 19; x < 94; x += 4) { R.rect(x, 92, x + 2, 99, P('#c8c4b6')); R.rect(x + 2, 92, x + 2, 99, P('#8a8678')); } R.rect(0, 96, 18, 97, P('#8a8678')); R.rect(94, 96, 116, 97, P('#8a8678'));
  caja(104, 60, 114, 82, P('#e8dcc0')); R.rect(106, 62, 112, 66, P('#c8bca0')); R.disco(109, 73, 3, P('#2a2a34')); R.disco(109, 73, 1, P('#e8dcc0')); R.rect(102, 64, 103, 78, P('#2a2a34'));
  for (let y = 82; y < 98; y++) R.pset(108 + Ri(Math.sin(y * 1.3)), y, P('#2a2a34'));
  caja(272, 50, 312, 92, P('#a8743c')); R.rect(274, 52, 310, 90, P('#1a2448')); for (let k = 0; k < 18; k++) R.pset(275 + Ri(h(k, 9) * 34), 53 + Ri(h(k, 10) * 36), P('#f2eee2'));
  R.disco(298, 60, 3, P('#e8b830')); R.poligono([[288, 84], [292, 66], [296, 84]], P('#e8e4dc')); R.poligono([[286, 84], [288, 78], [290, 84]], P('#d83a2a')); R.poligono([[294, 84], [296, 78], [298, 84]], P('#d83a2a'));
  for (let k = 0; k < 6; k++) tin(290 + h(k, 4) * 4, 86 + k, P('#f0a040'), 0.8);
  caja(202, 74, 208, 82, P('#e8e4dc')); R.pset(204, 77, K); R.pset(206, 77, K); caja(266, 66, 270, 92, P('#f2eee2')); R.rect(268, 76, 268, 90, P('#d83a2a')); R.disco(268, 90, 2, P('#d83a2a'));
  // el tablero de la mesa a ras: tablas horizontales que se ensanchan hacia delante
  let y = 100; for (const al of [6, 8, 10, 13, 16, 20, 10]) { madera(0, y, 319, Math.min(179, y + al - 1), ['#8a5a32', '#a87444', '#6a4224', '#4a2c16'], { alto: al, k: y }); y += al; }
  R.rect(0, 100, 319, 100, P('#4a2c16')); zona(0, 101, 319, 104, K, 0.18);
  // el ábaco al fondo a la izquierda, el vaso de té va en la vida, papeles y lápices
  caja(110, 80, 160, 104, P('#8a5a32')); R.rect(112, 82, 158, 102, P('#e8dcc0'));
  for (let f = 0; f < 5; f++) { const yy = 85 + f * 4; R.rect(112, yy, 158, yy, P('#5a4a3a')); for (let k = 0; k < 10; k++) { const x = (k < 4 ? 114 : 128) + k * 3 + ((f + k) % 3 === 0 ? 4 : 0); R.rect(x, yy - 1, x + 2, yy + 1, k % 2 ? P('#c83a2a') : P('#2a2a34')); } }
  R.poligono([[168, 112], [200, 108], [204, 120], [172, 124]], P('#f2eee2')); R.linea(168, 112, 172, 124, P('#c8c0b0')); for (let k = 0; k < 4; k++) R.linea(174, 113 + k * 2, 196, 110 + k * 2, P('#9a968a'));
  R.linea(150, 128, 178, 122, P('#e8b830')); R.pset(178, 122, P('#2a2a34')); R.linea(150, 129, 177, 123, P('#a87a18'));
  // la caja del Estado: metal gris con la estrella roja y la ranura
  R.poligono([[212, 100], [262, 100], [268, 108], [206, 108]], P('#8a8e98')); R.rect(206, 108, 268, 146, K); R.rect(207, 109, 267, 145, P('#6e727c'));
  R.rect(207, 109, 267, 110, P('#9aa0aa')); R.rect(228, 103, 246, 105, K); R.rect(229, 104, 245, 104, P('#2a2a34'));
  { const cx = 237, cy = 127, pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 5 : 12; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } R.poligono(pts, P('#d83a2a')); R.pset(cx - 3, cy - 4, P('#ff8a6a')); }
  for (const x of [210, 264]) for (const yy of [112, 142]) R.pset(x, yy, P('#c8ccd8'));
  zona(206, 147, 270, 150, K, 0.3);
};
const moneda = (x, y, giro) => PZ.rublo(R, Ri(x), Ri(y), { s: 2, giro });
const monedaPlana = (x, y) => { for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if (i * i / 81 + j * j / 6.5 <= 1) R.pset(Ri(x) + i, Ri(y) + j, j < 0 ? MON[0] : MON[1]); R.rect(Ri(x) - 5, Ri(y) - 2, Ri(x) - 2, Ri(y) - 2, MON[2]); R.rect(Ri(x) - 9, Ri(y) + 3, Ri(x) + 9, Ri(y) + 3, osc(P('#6a4224'), 0.3)); };
const p2 = (t) => {
  capa('mesaRublo', mesa);
  vistaDia(14, 8, 98, 84, t, 2, true); marco(12, 6, 100, 86, 55, 30);
  zona(0, 0, 319, 179, P('#fff2d8'), 0.04);
  // el vaso de té con su soporte de metal, que humea
  { const x = 94, y = 112; R.rect(x - 4, y - 13, x + 4, y, K); R.rect(x - 3, y - 12, x + 3, y - 6, P('#c87a2a')); R.rect(x - 3, y - 13, x + 3, y - 13, P('#e8eef4')); R.rect(x - 4, y - 6, x + 4, y, P('#a8a8b4')); R.rect(x - 4, y - 6, x + 4, y - 6, P('#d8d8e0')); R.rect(x + 5, y - 10, x + 6, y - 3, K);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); tin(x + Math.sin(t * 2 + k * 2) * 2 * u, y - 15 - u * 12, BL, 0.6 * (1 - u)); } }
  // los contratos de la derecha: el sello rojo en «signed» y otra vez en «contracts»
  for (let k = 0; k < 4; k++) { const yy = 146 - k * 3; R.rect(272 - k, yy, 314 - k, yy + 3, K); R.rect(273 - k, yy + 1, 313 - k, yy + 2, P('#f2eee2')); }
  R.rect(270, 134, 312, 138, K); R.rect(271, 134, 311, 137, P('#f6f2e6')); for (let k = 0; k < 4; k++) R.rect(276, 126 + k * 2, 300 - k * 5, 126 + k * 2, P('#9a968a'));
  R.poligono([[270, 120], [312, 120], [316, 134], [270, 134]], P('#f6f2e6')); R.linea(270, 120, 270, 134, K); R.linea(312, 120, 316, 134, K); R.linea(270, 120, 312, 120, K);
  for (let k = 0; k < 4; k++) R.linea(275, 123 + k * 2, 300 - k * 4, 123 + k * 2, P('#9a968a'));
  if (t > FIRMA) { R.disco(300, 129, 4, P('#d83a2a')); R.disco(300, 129, 2, P('#f6f2e6')); R.pset(300, 129, P('#d83a2a')); }
  if (t > CONTRATOS) { R.disco(284, 130, 3, P('#c83a2a')); R.pset(284, 130, P('#f6f2e6')); }
  const golpe = (t0) => Math.max(0, 1 - Math.abs(t - t0) / 0.28);
  const baja = Math.max(golpe(FIRMA), golpe(CONTRATOS)), entra = tramo(t, ELORG0, FIRMA - 0.3), sale2 = tramo(t, CONTRATOS + 0.3, CONTRATOS + 0.8);
  if (entra > 0 && sale2 < 1) { const wx = Ri(lerp(340, 306, entra) + 40 * sale2), wy = Ri(116 + baja * 6 - (1 - baja) * 4);
    R.rect(wx - 14, wy + 2, wx - 4, wy + 5, K); R.rect(wx - 13, wy + 3, wx - 5, wy + 4, P('#7a4a2a')); R.rect(wx - 11, wy - 4, wx - 7, wy + 2, P('#a8743c'));
    T.brazo(R, wx + 30, wy + 46, wx, wy, MANGA_BUR, -1, { codo: [wx + 26, wy + 22] }); }
  // las monedas: el montón; en «money went to the state» saltan a la ranura; la última rebota y rueda hasta la mano
  const N = 6, t0 = DINERO - 0.45, paso = (ESTADO - t0) / N;
  for (let k = N - 1; k >= 0; k--) { const tk = t0 + k * paso, u = tramo(t, tk, tk + 0.45); const x0 = 186, y0 = 146 - k * 3;
    if (u <= 0) { monedaPlana(x0, y0); continue; }
    if (k === N - 1) {   // la última
      const v = tramo(t, tk, tk + 0.4), r = tramo(t, tk + 0.4, tk + 1.0), g = tramo(t, tk + 1.0, tk + 1.4);
      if (v < 1) { moneda(lerp(x0, 222, v), lerp(y0, 104, v) - Math.sin(v * Math.PI) * 26, v * 3); continue; }
      if (r < 1) { const x = lerp(222, 70, sale(r)), yb = 152 - Math.abs(Math.sin(r * Math.PI * 2.5)) * 14 * (1 - r); moneda(x, yb, r * 6); continue; }
      if (g < 1) { moneda(70, 152, (t * (10 - g * 8)) % 1); for (let i = -6; i <= 6; i++) tin(70 + i, 153, K, 0.2); continue; }
      monedaPlana(70, 150); continue; }
    if (u < 1) { const x = lerp(x0, 237, u), y = lerp(y0, 104, u) - Math.sin(u * Math.PI) * 24; moneda(x, y, u * 2); if (u > 0.85) destello(237, 103, (u - 0.85) / 0.15 * 0.6); }
  }
  // la mano de Pázhitnov: saca la nómina del sobre al principio y al final toca la moneda
  const nom = tramo(t, P2 + 0.3, P2 + 1.1), toca = tramo(t, ESTADO + 1.0, ESTADO + 1.5);
  { const x = 40, y = 160; R.rect(x - 22, y - 10, x + 22, y + 10, K); R.rect(x - 21, y - 9, x + 21, y + 9, P('#e8d8b0')); R.linea(x - 21, y - 9, x, y + 2, P('#b8a478')); R.linea(x + 21, y - 9, x, y + 2, P('#b8a478'));
    const ny = Ri(y - 6 - nom * 18); R.rect(x - 16, ny - 14, x + 16, ny + 2, K); R.rect(x - 15, ny - 13, x + 15, ny + 1, P('#f6f2e6')); for (let k = 0; k < 2; k++) R.rect(x - 12, ny - 11 + k * 3, x + 4, ny - 11 + k * 3, P('#9a968a'));
    R.numero('120', x + 2, ny + 1, { centro: true, color: P('#2a2a34'), sombra: false });
    R.rect(x - 22, y - 2, x + 22, y + 10, K); R.rect(x - 21, y - 1, x + 21, y + 9, P('#e0d0a6')); R.pset(x, y + 2, P('#c83a2a')); }
  { const wx = Ri(lerp(58, 50, nom) + toca * 4), wy = Ri(150 - nom * 8 + toca * 6); T.brazo(R, wx - 24, wy + 46, wx, wy, MANGA_PZ, 1, { codo: [wx - 20, wy + 22] }); }
};
const ELORG0 = s(.47);

// ── 3 · el pasillo: el ordenador nuevo llega en una caja
const PZD = { encuadre: 'pasillo' };
const cajaGrande = (x, y, abre, t) => {   // la caja de cartón de 26 × 28 (abajo en el centro) con su ordenador dentro
  const x0 = Ri(x - 13), y0 = Ri(y - 28), a = sale(abre);
  if (abre > 0) { const sy = Ri(y0 + 14 - a * 32);   // el ordenador sube: monitor beis con la pantalla azul y la torre
    R.rect(x0 + 4, sy, x0 + 22, sy + 15, K); R.rect(x0 + 5, sy + 1, x0 + 21, sy + 14, P('#e0d6bc')); R.rect(x0 + 7, sy + 3, x0 + 19, sy + 11, P('#2a4ab0'));
    for (let k = 0; k < 3; k++) R.rect(x0 + 9 + k * 4, sy + 6 + (k % 2) * 2, x0 + 11 + k * 4, sy + 7 + (k % 2) * 2, P('#f2f2f6')); R.pset(x0 + 18, sy + 13, P('#5ae85a'));
    R.rect(x0 + 8, sy + 15, x0 + 18, sy + 17, K); R.rect(x0 + 9, sy + 16, x0 + 17, sy + 16, P('#c8bea4')); }
  caja(x0, y0, x0 + 26, y0 + 28, P('#c8a06a')); R.rect(x0 + 1, y0 + 1, x0 + 25, y0 + 2, P('#d8b47e')); R.rect(x0 + 24, y0 + 3, x0 + 25, y0 + 27, P('#a8804a'));
  R.rect(x0 + 12, y0 + 1, x0 + 14, y0 + 27, P('#d8c49a')); for (const [i, j] of [[4, 6], [4, 5], [3, 6], [5, 6], [8, 6], [8, 5], [7, 6], [9, 6]]) R.pset(x0 + i, y0 + j, K);
  R.rect(x0 + 18, y0 + 18, x0 + 22, y0 + 23, K); R.rect(x0 + 19, y0 + 19, x0 + 21, y0 + 21, P('#f2eee2')); R.pset(x0 + 20, y0 + 22, P('#f2eee2'));
  if (abre > 0) { R.poligono([[x0, y0], [x0 + 12, y0], [x0 + 10 - Ri(a * 12), y0 - Ri(a * 8)], [x0 - Ri(a * 6), y0 - Ri(a * 6)]], P('#b48c58')); R.poligono([[x0 + 14, y0], [x0 + 26, y0], [x0 + 32, y0 - Ri(a * 6)], [x0 + 16 + Ri(a * 12), y0 - Ri(a * 8)]], P('#b48c58')); }
};
const p3 = (t) => {
  T.centro(R, t, PZD);
  vistaDia(122, 24, 174, 86, t, 3); marco(120, 22, 176, 88, 147, 40);
  T.tinte(R, 0, 179, [255, 238, 205], 0.06); haz(124, 172, 90, 150, 40, 0.1);
  // la puerta 214 se abre hacia dentro: el despacho con la lámpara y el terminal viejo
  const ab = tramo(t, RECIBE + 0.35, RECIBE + 0.75);
  if (ab > 0) { for (let y = 54; y <= 126; y++) for (let x = 16; x <= 46; x++) { const d = Math.hypot(x - 36, y - 92); R.pset(x, y, mez(P('#3a2e26'), P('#a8804a'), Math.max(0, 1 - d / 34) * 0.8)); }
    R.rect(16, 104, 46, 106, P('#6a4a2a')); R.rect(26, 92, 38, 103, K); R.rect(27, 93, 37, 101, P('#123a1e')); R.rect(29, 96, 35, 96, P('#5aff8a')); R.rect(29, 99, 33, 99, P('#5aff8a'));
    R.poligono([[40, 84], [46, 84], [44, 78]], P('#e8c060')); R.rect(42, 84, 43, 103, P('#3a3a44'));
    const w = Ri(30 * (1 - ab * 0.8)); R.poligono([[16, 54], [16 + w, 56], [16 + w, 124], [16, 126]], P('#7a4e2c')); R.linea(16 + w, 56, 16 + w, 124, K); if (w > 6) R.rect(16 + w - 4, 92, 16 + w - 3, 93, P('#e8c040')); }
  // la científica asoma por la puerta entreabierta
  if (t > ORDENADOR - 0.3) R.actor(TS.cientifica, 196, 127, t, { dir: -1, sorpresa: t < OFICINA, sonrisa: t >= OFICINA });
  // Pázhitnov sale por la puerta: sorpresa en «better computer», salta en «office», luego les indica que entren
  if (ab > 0.4) { const fuera = tramo(t, RECIBE + 0.6, MEJOR - 0.05), y = Ri(lerp(130, 152, fuera));
    const bote = t > OFICINA - 0.05 && t < OFICINA + 0.7 ? Ri(Math.abs(Math.sin((t - OFICINA) * 9)) * 4) : 0;
    R.actor(TS.pazhitnov, 24, y, t, { dir: 1, anda: fuera > 0 && fuera < 1, sorpresa: t > MEJOR - 0.1 && t < OFICINA, sonrisa: t >= OFICINA, salto: bote, brazos: bote > 0, dedo: t > OFICINA + 0.9, habla: t > OFICINA + 0.9 && Math.sin(t * 8) > 0 }); }
  // los dos operarios con la carretilla: el de delante llama a la puerta en «got»
  const llega = tramo(t, P3, RECIBE - 0.1), mete = tramo(t, OFICINA + 1.0, OFICINA + 2.2), bx = Ri(lerp(176, 104, sale(llega)) - 36 * mete);
  const o2 = tramo(t, P3, RECIBE - 0.25), x2 = Ri(lerp(130, 52, sale(o2)));
  R.actor({ ...TS.operario, pal: { ...TS.operario.pal, J: hex('#3a7a4a'), C: hex('#8a7a5a') } }, x2, 158, t, { dir: -1, anda: o2 > 0 && o2 < 1, dedo: t > RECIBE - 0.25 && t < RECIBE + 0.5, sonrisa: t > ORDENADOR });
  if (t > RECIBE - 0.1 && t < RECIBE + 0.4) R.bocadillo(48, 124, { icono: '!' });
  // la carretilla: ruedas, el bastidor y la caja; el operario de detrás la empuja
  R.rect(bx - 15, 134, bx - 14, 166, K); R.rect(bx - 14, 164, bx + 12, 166, P('#4a4a54')); R.disco(bx - 12, 167, 4, K); R.disco(bx - 12, 167, 2, P('#6a6a74'));
  cajaGrande(bx, 164, tramo(t, MEJOR - 0.05, ORDENADOR + 0.25), t);
  destello(bx, 126, tramo(t, ORDENADOR, ORDENADOR + 0.6));
  R.actor(TS.operario, bx + 14, 168, t, { dir: -1, anda: (llega > 0 && llega < 1) || (mete > 0 && mete < 1), sostiene: [bx + 12, 146], sonrisa: t > OFICINA });
  T.centroDelante(R, t, PZD);
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], {
  efectos: [[MUNDO, 'bip'], [SUELDO, 'papel'], [FIRMA, 'sello'], [CONTRATOS, 'sello'], [DINERO, 'golpecito'], [ESTADO + 0.25, 'boing'], [ESTADO + 1.0, 'tic'],
    [RECIBE, 'toc'], [RECIBE + 0.35, 'puerta'], [ORDENADOR, 'brillo'], [OFICINA, 'pop']],
  año: 1990,
});
''')

# ──────────────────────────────────────────────────────────────────
E['ts-tetriscompany'] = ('La compañía', '''// TS-TETRISCOMPANY (frase 21), 1991–1996, cartela «1996». Cuatro planos:
// 1. la oficina de Honolulu: Pázhitnov (mayor) entra con la maleta en «moved», la deja y mira el ventanal en «United
//    States»; Rogers deja la taza y viene; en «1996» se dan la mano (la barra pasa de 1991 a 1996). Corta en «when».
// 2. (la mesa de cerca) el contrato: en «rights came back to him» se marcan las tres casillas; la mano de Pázhitnov
//    firma en «founded»; la de Rogers firma en «Rogers»; las dos tazas brindan. Corta en «the same».
// 3. la terraza sobre el mar: Rogers se pone la ushanka en «same man», lanza un avión de papel en «flown» que vuela
//    hacia el mar (una gaviota lo esquiva); Pázhitnov se ríe y le da una palmada en «first time». Corta en «12».
// 4. la casa de Pázhitnov al atardecer: baja al buzón (el «12» de la casa), saca el sobre en «creator», lo abre: el
//    cheque; en «money» salta con los brazos arriba; la familia sale al porche y aplaude.''', COMUN + r'''
const c = (f) => en('compania', f);
const P2 = c(.2402), P3 = c(.5082), P4 = c(.7357);
const MUDA = c(.0705), EEUU = c(.1025), A96 = c(.1655), DERECHOS = c(.2499), FUNDA = c(.3331), COMPANIA = c(.3812), HANK = c(.442), ROGERS = c(.458);
const MISMO = c(.5136), VOLO = c(.5616), MOSCU = c(.5862), SIN = c(.6129), PRIMERA = c(.6823), INVENTAR = c(.7816), CREADOR = c(.836), TETRIS1 = c(.8681), GANAR = c(.9119), DINERO = c(.93), TETRIS2 = c(.962);
const MANGA_PM = '#6a5a48', MANGA_RO = '#c8403a';
const maletita = (x, y) => { const x0 = Ri(x - 6), y0 = Ri(y); R.rect(x0 + 4, y0 - 2, x0 + 8, y0 - 1, K); caja(x0, y0, x0 + 12, y0 + 9, P('#7a4a2a')); R.rect(x0 + 1, y0 + 1, x0 + 11, y0 + 1, P('#9a6438')); R.rect(x0 + 3, y0 + 1, x0 + 3, y0 + 8, P('#c8a040')); R.rect(x0 + 9, y0 + 1, x0 + 9, y0 + 8, P('#c8a040')); R.rect(x0 + 5, y0 + 4, x0 + 7, y0 + 5, P('#e8e0c8')); };

// ── 1 · la oficina de Honolulu
const O1 = { encuadre: 'oficina96' };
const p1 = (t) => {
  T.hoy(R, t, O1);
  // el calendario de la pared: pasa de 91 a 96 en «1996»
  { const x0 = 250, y0 = 50, u = tramo(t, A96 - 0.2, A96 + 0.2); caja(x0, y0, x0 + 22, y0 + 22, P('#f6f2e6')); R.rect(x0 + 1, y0 + 1, x0 + 21, y0 + 5, P('#2a8a9a')); R.disco(x0 + 11, y0, 1, K);
    R.numero(u < 0.5 ? '91' : '96', x0 + 12, y0 + 17, { centro: true, color: P('#2a2a34'), sombra: false });
    if (u > 0 && u < 1) { const hh = Ri(16 * Math.abs(Math.cos(u * Math.PI))); R.rect(x0 + 1, y0 + 6, x0 + 21, y0 + 6 + hh, P('#e8e4d8')); R.rect(x0 + 1, y0 + 6 + hh, x0 + 21, y0 + 6 + hh, P('#a8a496')); } }
  // la salamanquesa que sube por la pared
  { const u = (t * 0.06) % 1, x = 286 + Ri(Math.sin(t * 0.7) * 3), y = Ri(110 - u * 40); R.rect(x, y, x + 1, y + 6, P('#7ab848')); R.pset(x - 1, y + 1, P('#7ab848')); R.pset(x + 2, y + 1, P('#7ab848')); R.pset(x - 1, y + 5, P('#7ab848')); R.pset(x + 2, y + 5, P('#7ab848')); R.pset(x, y + 7, P('#5a9a38')); R.pset(x + 1, y + 8, P('#5a9a38')); R.pset(x, y, K); }
  // la caja de mudanza junto a la puerta (cinta, flechas y el asa)
  { const x0 = 30, y0 = 134; caja(x0, y0, x0 + 24, y0 + 20, P('#c8a06a')); R.rect(x0 + 1, y0 + 1, x0 + 23, y0 + 2, P('#d8b47e')); R.rect(x0 + 11, y0 + 1, x0 + 13, y0 + 19, P('#d8c49a')); R.rect(x0 + 22, y0 + 3, x0 + 23, y0 + 19, P('#a8804a'));
    R.rect(x0 + 1, y0 + 9, x0 + 23, y0 + 10, P('#d8c49a')); caja(x0 + 15, y0 + 13, x0 + 21, y0 + 17, P('#f2eee2')); R.rect(x0 + 16, y0 + 15, x0 + 20, y0 + 15, P('#9a968a')); zona(x0, y0 + 21, x0 + 26, y0 + 22, K, 0.25);
    R.rect(x0 + 3, y0 - 6, x0 + 19, y0, K); R.rect(x0 + 4, y0 - 5, x0 + 18, y0 - 1, P('#3a6a9a')); R.rect(x0 + 4, y0 - 5, x0 + 18, y0 - 5, P('#5a8aba')); }
  // Pázhitnov entra con la maleta; la deja en «United States» y mira el ventanal; en «1996» Rogers le da la mano
  const e1 = tramo(t, 0.2, MUDA + 0.1), deja = t > EEUU, xp = Ri(lerp(-18, 84, sale(e1)));
  const mano = t > A96 - 0.1 && t < A96 + 1.3, sacude = mano ? Ri(Math.sin((t - A96) * 18) * 1.5) : 0;
  const pm = R.actor(TS.pazhitnovMayor, xp, 154, t, { dir: deja && t < A96 - 0.6 ? -1 : 1, anda: e1 > 0 && e1 < 1, sostiene: mano ? [108, 136 + sacude] : (!deja ? [xp + 15, 142] : undefined), sorpresa: deja && t < A96 - 0.6, sonrisa: t > A96 - 0.6 });
  if (!deja) maletita(pm.mano[0], pm.mano[1]); else maletita(70, 145);
  const r1 = tramo(t, A96 - 1.2, A96 - 0.15), xr = Ri(lerp(156, 112, sale(r1)));
  const ro = R.actor(TS.rogers, xr, 154, t, { dir: -1, anda: r1 > 0 && r1 < 1, sostiene: mano ? [108, 136 + sacude] : (r1 <= 0 ? true : undefined), sonrisa: true, habla: t > A96 + 0.6 && t < A96 + 1.5 && Math.sin(t * 8) > 0 });
  if (r1 <= 0) taza(ro.mano[0] - 1, ro.mano[1] + 2, P('#2a6ab0'), t); else taza(206, 117, P('#2a6ab0'), t);
  if (mano) destello(108, 130, tramo(t, A96, A96 + 0.5));
  T.hoyDelante(R, t, O1);
};

// ── 2 · el contrato en la mesa
const O2 = { encuadre: 'oficina96', camara: 'mesa', tazas: false };
const pixC = (i, j, c) => R.rect(139 + i * 2, 116 + j * 2, 140 + i * 2, 117 + j * 2, c);
const firmaPz = (u) => { const n = Ri(8 * u); for (let i = 10; i < 10 + n; i++) pixC(i, 24 - Math.round(Math.abs(Math.sin(i * 1.3)) * 2), P('#2a4ab0')); };
const firmaRo = (u) => { const n = Ri(8 * u); for (let i = 1; i < 1 + n; i++) pixC(i, 24 - Math.round(Math.abs(Math.cos(i * 1.7)) * 2), P('#7a2a2a')); };
const p2 = (t) => {
  const cas = t < DERECHOS ? 0 : t < DERECHOS + 0.4 ? 1 : t < DERECHOS + 0.8 ? 2 : 3;
  T.hoy(R, t, { ...O2, casillas: cas });
  // lo que hay en el tapete: la flor de hibisco, las gafas de sol, la pila de disquetes, el calendario de mesa
  { R.disco(118, 132, 5, P('#d83a4a')); R.disco(118, 132, 3, P('#f06a6a')); R.pset(118, 132, P('#f0d040')); R.pset(119, 131, P('#f0d040')); R.linea(118, 137, 124, 142, P('#3a8a3a')); R.disco(126, 140, 2, P('#4a9a4a')); }
  { R.rect(220, 160, 246, 162, K); R.disco(225, 164, 4, K); R.disco(241, 164, 4, K); R.disco(225, 164, 3, P('#2a3a4a')); R.disco(241, 164, 3, P('#2a3a4a')); R.pset(224, 163, P('#8ab0d0')); R.pset(240, 163, P('#8ab0d0')); }
  for (let k = 0; k < 3; k++) PZ.disquete(R, 230 + k * 2, 150 - k * 2, { etiqueta: ['#f6f2e6', '#f0d080', '#a8d0f0'][k] });
  PZ.bloques(R, 226, 132, { n: 2, filas: 2 });
  { R.rect(84, 160, 112, 166, K); R.rect(85, 161, 111, 165, P('#3a3a44')); R.rect(85, 161, 111, 161, P('#6a6a74')); R.rect(100, 156, 111, 160, K); R.rect(101, 157, 110, 159, P('#c8c8d0')); }
  for (let k = 0; k < 5; k++) { const y0 = 126 - k; R.rect(186 + k, y0, 206 + k, y0 + 22, K); R.rect(187 + k, y0 + 1, 205 + k, y0 + 21, k === 4 ? P('#f6f2e6') : P('#e8e4d8')); } for (let k = 0; k < 6; k++) R.rect(194, 125 + k * 3, 206, 125 + k * 3, P('#9a968a'));
  // las marcas de las casillas: un destello en cada una
  for (let k = 0; k < 3; k++) destello(145, 136 + k * 10, tramo(t, DERECHOS + k * 0.4, DERECHOS + k * 0.4 + 0.4));
  // la mano de Pázhitnov marca las casillas y firma en «founded»; la de Rogers firma en «Rogers»; brindan
  const fp = tramo(t, FUNDA - 0.1, FUNDA + 0.6), fr = tramo(t, HANK - 0.05, ROGERS + 0.35);
  firmaPz(fp); firmaRo(fr);
  if (t > COMPANIA) { const u = tramo(t, COMPANIA, COMPANIA + 0.25); R.disco(175, 124, Ri(1 + u * 3), P('#d83a2a')); if (u >= 1) { R.disco(175, 124, 2, P('#f6f2e6')); R.pset(175, 124, P('#d83a2a')); } destello(175, 124, tramo(t, COMPANIA, COMPANIA + 0.6)); }
  const brinda = tramo(t, ROGERS + 0.45, ROGERS + 0.95), choca = ROGERS + 0.95;
  // las tazas: en la mesa hasta el brindis
  const tz1 = brinda > 0 ? [Ri(lerp(104, 152, brinda)), Ri(lerp(150, 132, brinda))] : [104, 150];
  const tz2 = brinda > 0 ? [Ri(lerp(216, 170, brinda)), Ri(lerp(140, 132, brinda))] : [216, 140];
  taza(tz1[0], tz1[1], P('#f4f0e8'), t); taza(tz2[0], tz2[1], P('#2a6ab0'), t);
  if (t > choca - 0.05) destello(161, 124, tramo(t, choca - 0.05, choca + 0.5));
  // la mano de Pázhitnov: casillas (6,0–7,2), firma (7,6–8,4), luego descansa y coge la taza
  let pw = null;
  if (t < DERECHOS + 1.1) { const k = Math.min(2, Math.floor(Math.max(0, t - DERECHOS) / 0.4)), dy = Ri(Math.abs(Math.sin(t * 8)) * 2); pw = [134, 137 + k * 10 - dy]; if (t < DERECHOS - 0.3) pw = [Ri(lerp(100, 134, tramo(t, P2, DERECHOS - 0.3))), Ri(lerp(190, 137, tramo(t, P2, DERECHOS - 0.3)))]; }
  else if (t < FUNDA + 0.8) { const u = tramo(t, DERECHOS + 1.1, FUNDA - 0.1); pw = [Ri(lerp(134, 154, u) + fp * 14), Ri(lerp(157, 164, u) - Math.abs(Math.sin(t * 14)) * fp * (fp < 1 ? 2 : 0))]; }
  else if (brinda <= 0) pw = [Ri(lerp(168, 96, tramo(t, FUNDA + 0.8, ROGERS + 0.4))), Ri(lerp(164, 178, tramo(t, FUNDA + 0.8, FUNDA + 1.6)))];
  else pw = [tz1[0] - 10, tz1[1] - 4];
  if (pw && pw[1] < 196) { T.brazo(R, pw[0] - 16, pw[1] + 46, pw[0], pw[1], MANGA_PM, 1, { codo: [pw[0] - 16, pw[1] + 22] });
    if (t > DERECHOS - 0.3 && t < FUNDA + 0.8) { R.linea(pw[0] + 11, pw[1] - 4, pw[0] + 15, pw[1] + 2, K); R.linea(pw[0] + 12, pw[1] - 4, pw[0] + 16, pw[1] + 2, P('#2a4ab0')); } }
  // la mano de Rogers
  let rw = null;
  if (t > COMPANIA + 0.3 && brinda <= 0) { const u = tramo(t, COMPANIA + 0.3, HANK - 0.05); rw = [Ri(lerp(240, 162, u) + fr * 14), Ri(lerp(186, 166, u) - (fr > 0 && fr < 1 ? Math.abs(Math.sin(t * 14)) * 2 : 0))]; }
  else if (brinda > 0) rw = [tz2[0] + 10, tz2[1] - 4];
  if (rw) { T.brazo(R, rw[0] + 16, rw[1] + 46, rw[0], rw[1], MANGA_RO, -1, { codo: [rw[0] + 16, rw[1] + 22] });
    if (brinda <= 0) { R.linea(rw[0] - 12, rw[1] - 4, rw[0] - 15, rw[1] + 2, K); R.linea(rw[0] - 11, rw[1] - 4, rw[0] - 14, rw[1] + 2, P('#7a2a2a')); } }
};

// ── 3 · la terraza sobre el mar
const terraza = () => {
  cieloT(0, 0, 319, 78, P('#5aa0e0'), P('#cfe6f6'));
  // la isla lejana y el mar con su brillo
  R.poligono([[180, 78], [210, 66], [232, 62], [262, 70], [300, 78]], P('#7a9ab0')); R.poligono([[196, 78], [222, 70], [244, 68], [270, 78]], P('#6a8aa0'));
  for (let y = 79; y <= 112; y++) for (let x = 0; x <= 319; x++) { const u = (y - 79) / 33; R.pset(x, y, h(x >> 1, y, 7) > 0.92 ? P('#8ac8e8') : mez(P('#2a7ab8'), P('#1a6aa0'), u)); }
  for (let x = 0; x <= 319; x++) { const e = Ri(Math.sin(x * 0.08) * 1.5); R.pset(x, 112 + e, P('#f2f8fc')); for (let y = 113 + e; y <= 118; y++) R.pset(x, y, h(x, y, 3) > 0.85 ? P('#c8a868') : P('#e8d098')); }
  for (let x = 0; x <= 319; x++) { const al = 4 + Ri(h(x >> 2, 9) * 6); for (let y = 126 - al; y <= 126; y++) R.pset(x, y, h(x, y, 4) > 0.5 ? P('#3a8a3a') : P('#2a6a2a')); for (let y = 119; y < 126 - al; y++) R.pset(x, y, P('#d8c088')); }
  R.rect(0, 79, 319, 79, P('#a8d8f0'));
  // la barandilla blanca de balaústres, el suelo de tablas, la sombrilla con su mesa y la tabla de surf
  R.rect(0, 98, 319, 101, K); R.rect(0, 99, 319, 100, P('#f6f2e6')); R.rect(0, 101, 319, 101, P('#c8c0b0'));
  for (let x = 4; x < 320; x += 9) { R.rect(x, 102, x + 3, 126, K); R.rect(x + 1, 102, x + 2, 126, P('#eeeae0')); R.pset(x + 1, 108, P('#c8c0b0')); R.pset(x + 1, 120, P('#c8c0b0')); }
  R.rect(0, 124, 319, 127, K); R.rect(0, 125, 319, 126, P('#e8e2d4'));
  let y = 128; for (const al of [4, 5, 6, 7, 8, 9, 10, 11, 12]) { madera(0, y, 319, Math.min(179, y + al - 1), ['#b07a4a', '#c8925e', '#8a5a34', '#6a4224'], { alto: al, k: y }); y += al; }
  // las macetas de hibisco a la izquierda
  for (const [x, yy] of [[14, 150], [36, 158]]) { R.poligono([[x - 9, yy - 14], [x + 9, yy - 14], [x + 7, yy], [x - 7, yy]], P('#b85a2a')); R.rect(x - 10, yy - 16, x + 10, yy - 14, P('#d87a3a'));
    for (let k = 0; k < 40; k++) { const a = h(k, x) * 6.28, r = h(k, x, 2) * 12; R.pset(Ri(x + Math.cos(a) * r), Ri(yy - 24 + Math.sin(a) * r * 0.7), h(k, x, 3) > 0.5 ? P('#3a8a3a') : P('#2a6a2a')); }
    for (let k = 0; k < 4; k++) { const fx = x - 8 + Ri(h(k, x, 4) * 16), fy = yy - 30 + Ri(h(k, x, 5) * 12); R.disco(fx, fy, 2, P('#e83a4a')); R.pset(fx, fy, P('#f0d040')); } }
  // la mesa con la sombrilla a rayas (sin letras), la jarra y los vasos
  R.rect(252, 140, 296, 143, K); R.rect(253, 141, 295, 142, P('#f2eee2')); R.rect(272, 143, 274, 170, P('#8a8a96')); R.rect(264, 170, 282, 172, K);
  R.rect(273, 66, 274, 140, P('#8a6a3a'));
  for (const [x, c] of [[262, '#5ab8e8'], [286, '#e8d040']]) { R.rect(x - 3, 132, x + 3, 140, K); R.rect(x - 2, 133, x + 2, 139, P(c)); R.rect(x - 2, 133, x + 2, 133, P('#f6f2e6')); }
  for (let y = 86; y <= 150; y++) { const w = Ri(Math.sin((y - 86) / 64 * Math.PI) * 6) + 1, cx = 306 + Ri((y - 86) * 0.08); R.rect(cx - w, y, cx + w, y, K); if (w > 1) R.rect(cx - w + 1, y, cx + w - 1, y, (Math.abs(cx - 306 - (y - 86) * 0.08) < 1 || y % 40 < 2) ? P('#d83a2a') : P('#f0c840')); }
  R.rect(305, 90, 306, 146, P('#d83a2a')); R.pset(303, 96, P('#fff4b0')); R.pset(303, 97, P('#fff4b0'));
};
const p3 = (t) => {
  capa('terraza', terraza);
  nubes(0, 2, 319, 44, t, NUBES, 7, 11); nubes(0, 18, 319, 64, t, NUBES, 5, 14);
  pajaros(40, 18, 260, t, 3, 12);
  // la sombrilla que se mece con la brisa (por delante del cielo)
  { const s = Math.sin(t * 1.5) * 1.5; for (let k = 0; k < 8; k++) { const a0 = Math.PI + k * Math.PI / 8, a1 = a0 + Math.PI / 8; R.poligono([[273, 62 + s], [273 + Math.cos(a0) * 34, 76 + Math.sin(a0) * 4 + s], [273 + Math.cos(a1) * 34, 76 + Math.sin(a1) * 4 + s]], k % 2 ? P('#f2eee2') : P('#2a9a8a')); }
    R.rect(239, Ri(76 + s), 307, Ri(77 + s), P('#1a6a5a')); for (let x = 240; x < 307; x += 4) R.pset(x, Ri(78 + s), P('#2a9a8a')); }
  // el velero y los brillos del agua
  { const x = Ri(lerp(-20, 330, (t * 0.02) % 1)); R.poligono([[x, 88], [x + 10, 88], [x + 8, 92], [x + 2, 92]], P('#f2eee2')); R.poligono([[x + 5, 74], [x + 5, 87], [x + 12, 87]], P('#ffffff')); R.poligono([[x + 4, 76], [x + 4, 87], [x - 2, 87]], P('#e85a3a')); }
  for (let k = 0; k < 16; k++) { const x = (h(k, 3) * 320 + t * 6) % 320, yy = 82 + Ri(h(k, 4) * 18); if (Math.sin(t * 3 + k) > 0.3) { R.pset(Ri(x), yy, BL); R.pset(Ri(x) + 1, yy, P('#c8e8f8')); } }
  // las palmeras de la playa asoman por detrás de la barandilla
  for (const [x0, k] of [[110, 0], [190, 1], [24, 2]]) { const s = Math.sin(t * 1.2 + k) * 2; R.linea(x0, 122, x0 + 3, 84, P('#8a6a3a')); R.linea(x0 + 1, 122, x0 + 4, 84, P('#6a4a2a'));
    for (let f = 0; f < 6; f++) { const a = -Math.PI + f * Math.PI / 5; for (let r = 0; r < 16; r++) { const xx = x0 + 3 + Math.cos(a) * r + s * r / 16, yy = 84 + Math.sin(a) * r * 0.5 + r * r * 0.03; R.pset(Ri(xx), Ri(yy), r % 3 === 0 ? P('#2a7a3a') : P('#3a9a4a')); } } }
  // las antorchas de bambú con su llama
  for (const x of [72, 226]) { R.rect(x - 1, 104, x + 1, 160, P('#a8843c')); for (let y = 108; y < 160; y += 7) R.rect(x - 1, y, x + 1, y, P('#6a5020')); R.rect(x - 3, 98, x + 3, 104, K); R.rect(x - 2, 99, x + 2, 103, P('#6a4a2a'));
    for (let k = 0; k < 14; k++) { const u = ((t * 2.2 + k / 14) % 1), fx = x + Math.sin(t * 9 + k) * (1 - u) * 2, fy = 97 - u * 9; tin(fx, fy, u < 0.4 ? P('#fff0a0') : u < 0.7 ? P('#f0a030') : P('#d84a2a'), 0.9 * (1 - u * 0.6)); } }
  // Rogers se pone la ushanka en «same man» y lanza el avión de papel en «flown»; Pázhitnov se ríe
  const pone = t > MISMO + 0.45, enMano = t > MISMO - 0.2 && !pone, lanza = t > VOLO - 0.5 && t < VOLO + 0.1;
  const ro = R.actor(TS.rogers, 150, 164, t, { dir: -1, tocado: pone ? 'ushankaTS' : undefined, sostiene: enMano ? [146, 132] : lanza ? [Ri(lerp(150, 168, tramo(t, VOLO - 0.5, VOLO))), 130] : undefined,
    sonrisa: true, habla: t > MOSCU - 0.2 && t < SIN + 0.4 && Math.sin(t * 8) > 0, brazos: t > SIN + 0.1 && t < SIN + 0.7, dedo: t > VOLO + 0.15 && t < MOSCU + 0.3 });
  if (enMano) { const [x, y] = ro.mano; R.disco(x, y - 2, 4, K); R.disco(x, y - 2, 3, P('#8a6a4a')); R.rect(x - 4, y - 1, x + 4, y + 1, P('#6a4a30')); R.pset(x - 1, y - 4, P('#b0946e')); }
  const lleva = t > VOLO - 0.5 && t <= VOLO;
  const pm = R.actor(TS.pazhitnovMayor, 118, 164, t, { dir: 1, sonrisa: t > MISMO + 0.3, habla: (t > MISMO + 0.5 && t < VOLO - 0.2 && Math.sin(t * 9) > 0), salto: t > SIN && t < SIN + 0.5 && Math.sin(t * 12) > 0 ? 1 : 0, sostiene: t > PRIMERA - 0.1 ? [150, 144] : undefined });
  if (pone && t < MISMO + 0.9) destello(157, 136, tramo(t, MISMO + 0.45, MISMO + 0.9));
  // el avión de papel: de la mano al mar, con una curva; la gaviota lo esquiva
  const vu = tramo(t, VOLO, VOLO + 2.6);
  let px, py, ang = -0.4;
  if (lleva) { px = ro.mano[0]; py = ro.mano[1]; }
  else if (vu > 0 && vu < 1) { px = lerp(168, 330, vu) ; py = 130 - Math.sin(vu * Math.PI * 0.9) * 70 + vu * 20 + Math.sin(vu * 12) * 3; ang = -0.5 + vu * 0.6; }
  if (px != null) { const x = Ri(px), y = Ri(py); R.poligono([[x + 7, y], [x - 5, y - 4], [x - 2, y], [x - 5, y + 3]], P('#f6f6f0')); R.linea(x + 7, y, x - 5, y - 4, K); R.linea(x + 7, y, x - 5, y + 3, K); R.linea(x - 2, y, x + 7, y, P('#c8c8c0'));
    if (!lleva) for (let k = 1; k < 5; k++) tin(x - 6 - k * 3, y + k, BL, 0.4 - k * 0.07); }
  { const gu = tramo(t, VOLO + 0.6, VOLO + 1.8), gx = Ri(lerp(300, 196, gu)), gy = Ri(52 - Math.sin(gu * Math.PI) * (t > VOLO + 1.1 ? 14 : 4)); if (gu > 0 && gu < 1) { R.gaviota(gx, gy, t * 2.5, 5); R.gaviota(gx + 1, gy, t * 2.5, 5); } }
  if (t > MOSCU - 0.1 && t < SIN + 0.2) R.bocadillo(158, 126, { icono: 'estrella' });
};

// ── 4 · la casa al atardecer
const casa = () => {
  cieloT(0, 0, 319, 92, P('#7a6ab8'), P('#f8c070'));
  R.poligono([[150, 92], [196, 58], [214, 52], [232, 58], [290, 92]], P('#8a7aa8')); R.poligono([[203, 58], [214, 52], [226, 58], [218, 62], [210, 60]], P('#f2eef8'));
  // los abetos del fondo
  for (let k = 0; k < 18; k++) { const x = k * 19 + Ri(h(k, 2) * 8) - 6, al = 26 + Ri(h(k, 3) * 18), base = 104; for (let j = 0; j < al; j++) { const w = Ri((j / al) * 6) + 1; R.rect(x - w, base - al + j, x + w, base - al + j, j % 4 === 0 ? P('#1e4a3a') : P('#2a5a44')); } }
  // el césped con las franjas de la segadora, el camino de losas, la acera y la calle
  for (let y = 104; y <= 160; y++) for (let x = 0; x <= 319; x++) { const n = h(x, y, 31); R.pset(x, y, (Math.floor(x / 22) % 2 ? n > 0.85 ? P('#5a9a3a') : P('#6aaa48') : n > 0.85 ? P('#6aaa48') : P('#7ab858'))); }
  for (let k = 0; k < 7; k++) { const yy = 132 + k * 4, x = 112 + k * 2; R.poligono([[x, yy], [x + 18, yy], [x + 19, yy + 3], [x + 1, yy + 3]], P('#c8bca4')); R.linea(x, yy + 3, x + 19, yy + 3, P('#8a806a')); }
  R.rect(0, 160, 319, 168, P('#c8c4b8')); for (let x = 0; x < 320; x += 24) R.rect(x, 160, x, 168, P('#a8a498')); R.rect(0, 168, 319, 169, P('#8a8a86'));
  for (let y = 170; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, h(x, y, 33) > 0.9 ? P('#4a4a52') : P('#3a3a42'));
  // la casa de madera: tablas azules, tejado de tejas, el porche con escalones, ventanas con luz cálida y la puerta
  R.poligono([[18, 62], [94, 24], [170, 62]], K); for (let y = 26; y <= 62; y++) { const w = (y - 24) * 2; for (let x = 94 - w; x <= 94 + w; x++) if (x > 18 && x < 170) R.pset(x, y, (y % 4 === 0 || (x + (y >> 2) * 5) % 9 === 0) ? P('#3a3040') : P('#5a4a5a')); }
  for (let y = 63; y <= 128; y++) for (let x = 24; x <= 164; x++) R.pset(x, y, (y - 63) % 5 === 4 ? P('#6a8aa8') : h(x >> 3, y, 2) > 0.9 ? P('#9ab8d0') : P('#8aaac4'));
  R.rect(24, 63, 164, 64, P('#f2eee2')); R.rect(24, 63, 25, 128, P('#f2eee2')); R.rect(163, 63, 164, 128, P('#f2eee2'));
  for (const x0 of [34, 132]) { caja(x0, 74, x0 + 24, 100, P('#f2eee2')); R.rect(x0 + 2, 76, x0 + 22, 98, P('#f8d888')); R.rect(x0 + 12, 76, x0 + 12, 98, P('#f2eee2')); R.rect(x0 + 2, 87, x0 + 22, 87, P('#f2eee2')); R.rect(x0 + 2, 76, x0 + 10, 80, P('#fff0c0'));
    R.rect(x0 - 4, 74, x0 - 1, 100, P('#3a5a7a')); R.rect(x0 + 25, 74, x0 + 28, 100, P('#3a5a7a')); }
  R.rect(84, 68, 104, 74, P('#f2eee2')); R.numero('12', 94, 73, { centro: true, color: P('#2a2a34'), sombra: false });
  R.rect(80, 120, 168, 128, P('#d8d2c4')); R.rect(80, 120, 168, 120, P('#f2eee2')); for (let k = 0; k < 3; k++) R.rect(104 - k * 2, 128 + k * 3, 126 + k * 2, 130 + k * 3, k % 2 ? P('#c8c0b0') : P('#e0dacc'));
  R.rect(80, 92, 82, 120, P('#f2eee2')); R.rect(166, 92, 168, 120, P('#f2eee2')); R.rect(78, 90, 170, 92, P('#f2eee2'));
  R.disco(70, 88, 2, P('#fff0a0'));
  // el arce de la derecha (la copa va en la vida, se mece), el seto y el buzón con su poste
  R.rect(286, 72, 292, 160, P('#5a3a24')); R.rect(286, 72, 287, 160, P('#7a5434'));
  for (let x = 170; x < 320; x++) { const al = 6 + Ri(h(x >> 2, 1) * 4); for (let j = 0; j < al; j++) R.pset(x, 104 + j - al + 4, h(x, j, 3) > 0.5 ? P('#3a7a34') : P('#2a6228')); }
  R.rect(221, 128, 223, 158, P('#7a5434')); R.rect(214, 156, 230, 158, P('#5a3a24'));
  // el arriate delante de la casa y la bici del niño tumbada en el césped, con la manguera enrollada
  for (const [x0, x1] of [[24, 78], [170, 200]]) { R.rect(x0, 128, x1, 133, P('#5a3a24')); for (let k = 0; k < (x1 - x0) / 3; k++) { const x = x0 + 2 + k * 3, y = 126 - Ri(h(k, x0) * 3), c = ['#e83a5a', '#f0c040', '#e8e8f0', '#a85ad8'][k % 4]; R.rect(x, y + 2, x, 128, P('#3a7a34')); R.pset(x, y, P(c)); R.pset(x + 1, y + 1, P(c)); R.pset(x - 1, y + 1, P(c)); } }
  for (const wx of [30, 50]) { R.disco(wx, 150, 6, K); R.disco(wx, 150, 5, P('#c8ccd8')); R.disco(wx, 150, 4, P('#5aa040')); R.pset(wx, 150, K); }
  R.linea(30, 150, 40, 145, P('#d84a3a')); R.linea(40, 145, 50, 150, P('#d84a3a')); R.linea(36, 145, 44, 145, P('#d84a3a')); R.linea(44, 145, 46, 141, K);
  R.disco(70, 132, 5, P('#2a8a3a')); R.disco(70, 132, 3, P('#3aa04a')); R.disco(70, 132, 1, P('#1a5a2a')); for (let x = 70; x < 98; x++) R.pset(x, 137 + Ri(Math.sin(x * 0.3) * 1), P('#2a8a3a'));
};
const p4 = (t) => {
  capa('casa', casa);
  nubes(0, 4, 270, 48, t, [P('#fde0c0'), P('#f0a8a0'), P('#a878a8')], 6, 21);
  pajaros(20, 20, 260, t, 3, 22);
  // la copa del arce que se mece
  { const s = Math.sin(t * 1.1) * 2; for (let k = 0; k < 260; k++) { const a = h(k, 1, 40) * 6.28, r = Math.sqrt(h(k, 2, 40)) * 30; const x = 289 + Math.cos(a) * r * 1.1 + s * (1 - r / 30), y = 64 + Math.sin(a) * r * 0.75; if (y < 46 && x > 276) continue; R.rect(Ri(x), Ri(y), Ri(x) + 1, Ri(y) + 1, h(k, 3, 40) > 0.6 ? P('#e8862a') : h(k, 4, 40) > 0.5 ? P('#c85a2a') : P('#f0b040')); } }
  // el aspersor del césped
  for (let k = 0; k < 14; k++) { const u = ((t * 1.2 + k / 14) % 1), a = Math.sin(t * 1.4) * 0.9 + (k % 3 - 1) * 0.25; const x = 60 + Math.sin(a) * u * 40, y = 140 - Math.sin(u * Math.PI) * 18 + u * 4; tin(x, y, P('#d8f0ff'), 0.8); }
  R.rect(58, 139, 62, 141, P('#4a4a54'));
  // el buzón: la tapa se abre al llegar, la banderita roja baja
  const ab = tramo(t, CREADOR - 0.6, CREADOR - 0.3);
  { const x0 = 212; caja(x0, 116, x0 + 20, 128, P('#2a3a5a')); R.rect(x0 + 1, 117, x0 + 19, 118, P('#4a5a7a')); R.rect(x0 + 3, 120, x0 + 9, 125, P('#f2eee2')); R.numero('12', x0 + 7, 125, { centro: true, color: P('#2a2a34'), sombra: false });
    if (ab > 0) { R.rect(x0 - 2, 116, x0, 128, K); R.rect(x0 - Ri(ab * 6), 126, x0, 128, P('#3a4a6a')); }
    const bf = ab > 0.5; if (bf) { R.rect(x0 + 20, 120, x0 + 22, 126, P('#c83a2a')); } else { R.rect(x0 + 20, 110, x0 + 21, 122, K); R.rect(x0 + 22, 110, x0 + 26, 113, P('#d83a2a')); } }
  // la familia en el porche: el hijo juega a la consola en el escalón; la mujer sale y aplaude
  R.actor(TS.ninoJuega, 132, 129, t, { dir: -1, sonrisa: t > DINERO, salto: t > TETRIS2 && Math.sin(t * 10) > 0 ? 1 : 0, sorpresa: t > DINERO - 0.2 && t < DINERO + 0.4 });
  const sa = tramo(t, GANAR, GANAR + 0.8);
  if (sa > 0) R.actor({ ...TS.publica, pal: { ...TS.publica.pal, C: hex('#3a8a6a'), c: hex('#2a6a4a') } }, Ri(lerp(100, 110, sa)), 121, t, { dir: 1, anda: sa < 1, sonrisa: true, brazos: t > TETRIS2 && Math.sin(t * 9) > 0 });
  // Pázhitnov baja del porche al buzón, saca el sobre en «creator», lo abre (el cheque) y salta en «money»
  const ba = tramo(t, P4 - 0.2, CREADOR - 0.7), x = Ri(lerp(110, 196, suave(ba))), y = Ri(lerp(130, 158, suave(ba)));
  const tiene = t > CREADOR, abre = tramo(t, TETRIS1 - 0.1, TETRIS1 + 0.4), salta = t > DINERO - 0.05 && t < TETRIS2 + 1.4;
  const pm = R.actor(TS.pazhitnovMayor, x, y, t, { dir: 1, anda: ba > 0 && ba < 1, sostiene: (t > CREADOR - 0.6 && !salta) ? (tiene ? [x + 13, y - 18] : [214, 122]) : undefined,
    sorpresa: abre > 0 && t < GANAR, sonrisa: t >= GANAR, brazos: salta, salto: salta ? Ri(Math.abs(Math.sin((t - DINERO) * 8)) * 6) : 0 });
  if (tiene && !salta) { const [hx, hy] = pm.mano; if (abre <= 0) sobre(hx, hy); else { R.rect(hx - 6, hy - 6, hx + 7, hy + 1, K); R.rect(hx - 5, hy - 5, hx + 6, hy, P('#c8e8c0')); R.rect(hx - 4, hy - 3, hx + 1, hy - 3, P('#6a8a6a')); R.icono('bolsa', hx + 1, hy - 5, P('#2a6a3a'), P('#c8e8c0')); } }
  if (salta) { const yy = y - 32; for (let k = 0; k < 6; k++) { const a = t * 3 + k * 1.05, r = 12 + Math.sin(t * 5 + k) * 2; const cx = x + 7 + Math.cos(a) * r, cy = yy + Math.sin(a) * r * 0.5; R.disco(Ri(cx), Ri(cy), 1, P('#f0c040')); R.pset(Ri(cx), Ri(cy) - 1, P('#fff4b0')); } }
  if (t > GANAR - 0.05 && t < DINERO + 0.6) R.bocadillo(x + 8, y - 30, { icono: 'bolsa' });
  // el niño del barrio pasa en bici por la acera
  { const u = tramo(t, P4 + 0.3, P4 + 4.2), bx = Ri(lerp(340, -40, u)); if (u > 0 && u < 1) {
    R.actor({ ...TS.ninoJuega, pal: { ...TS.ninoJuega.pal, C: hex('#d84a3a'), c: hex('#a83a2a') } }, bx - 6, 160, t, { dir: -1, sinObjeto: true, sonrisa: true, quieto: true });
    for (const wx of [bx - 10, bx + 10]) { R.disco(wx, 167, 5, K); R.disco(wx, 167, 4, P('#c8ccd8')); R.disco(wx, 167, 3, K); const a = t * 12; R.linea(wx, 167, Ri(wx + Math.cos(a) * 3), Ri(167 + Math.sin(a) * 3), P('#c8ccd8')); }
    R.linea(bx - 10, 167, bx, 158, P('#2a8ad8')); R.linea(bx, 158, bx + 10, 167, P('#2a8ad8')); R.linea(bx - 6, 158, bx + 4, 158, P('#2a8ad8')); R.linea(bx - 6, 158, bx - 8, 154, K); R.linea(bx + 4, 158, bx + 1, 152, K); } }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[EEUU, 'golpecito'], [A96, 'palmada'], [DERECHOS, 'lapiz'], [FUNDA, 'firma'], [COMPANIA, 'sello'], [HANK, 'firma'], [ROGERS + 0.95, 'tic'],
    [MISMO + 0.45, 'pop'], [VOLO, 'whoosh'], [CREADOR - 0.6, 'cerrojo'], [TETRIS1, 'papel'], [GANAR, 'brillo'], [DINERO + 0.6, 'palmada']],
  cartela: '1996',
  año: (t) => (t < A96 ? 1991 : 1996),
});
''')
