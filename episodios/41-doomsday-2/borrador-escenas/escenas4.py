# Grupo S4 del ep41: dd-sue, dd-anuncios, dd-etiqueta.
# Los instantes se escriben como @marca@segundos@ (segundos de la escena, de linea.json) y al final se cambian por
# en('marca', fracción) con las marcas reales de atomo/plato/escenas/marcas-ep41.json.
import json, os, re

_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
_MARCAS = json.load(open(os.path.join(_RAIZ, 'atomo', 'plato', 'escenas', 'marcas-ep41.json')))

E = {}

COMUN = r'''
import * as DO from '/atomo/plato/escenas/do-comun.js';
const K = hex('#141018');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const azar = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const velo = (x0, y0, x1, y1, col, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
const dentro = (t, a, b) => t >= a && t < b;
const parpa = (t, f = 7) => Math.sin(t * f) > 0;
// un actor medio transparente (la Mujer Invisible): se pinta aparte y se mezcla con lo de detrás
const BUFA = R.nuevo();
const fantasma = (def, x, suelo, t, o, a) => { R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); const r = R.actor(def, x, suelo, t, o); R.usar(prev);
  for (let j = Math.max(0, suelo - 46); j <= Math.min(179, suelo + 2); j++) for (let i = Math.max(0, x - 8); i <= Math.min(319, x + 24); i++) { const c = BUFA[j * 320 + i]; if (c) R.pset(i, j, mez(R.pget(i, j), c, a)); }
  return r; };
// un actor a media escala (Ant-Man encogido): se pinta aparte y se copia uno de cada dos píxeles, con su contorno
const mini = (def, x, suelo, t, o) => { R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); R.actor(def, 40, 60, t, o); R.usar(prev);
  for (let j = 14; j < 62; j += 2) for (let i = 36; i < 60; i += 2) { const c = BUFA[j * 320 + i] || BUFA[j * 320 + i + 1] || BUFA[(j + 1) * 320 + i]; if (c) R.pset(x + (i - 40) / 2, suelo - (60 - j) / 2, c); } };
// un corazón pequeño (7 × 6) con contorno; s escala
const CORA = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
const corazon = (x, y, c = hex('#e83a5a'), s = 1) => { for (let j = 0; j < CORA.length; j++) for (let i = 0; i < 7; i++) if (CORA[j][i] === '#') { const borde = j === 0 || i === 0 || i === 6 || CORA[j - 1]?.[i] !== '#' || CORA[j][i - 1] !== '#' || CORA[j][i + 1] !== '#' || CORA[j + 1]?.[i] !== '#';
  R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, borde ? K : c); } if (s > 1) R.rect(x + 2 * s, y + s, x + 2 * s + s - 1, y + 2 * s - 1, hex('#ffd0d8')); };
// el bocadillo con un icono que sale (x, y = su punta) y sube un poco
const globo = (x, y, u, ic, col = hex('#e83a3a')) => { if (u <= 0) return; const yy = Math.round(y - 4 * Math.min(1, u * 2)); caja(x - 7, yy - 13, x + 7, yy - 1, hex('#fbf6ea')); R.pset(x - 1, yy, K); R.pset(x, yy, K); R.pset(x - 1, yy - 1, hex('#fbf6ea'));
  if (ic === 'corazon') corazon(x - 3, yy - 10, hex('#e83a5a')); else R.icono(ic, x - 2, yy - 11, col, K, 1); };
// un escudo redondo (sin emblema): rojo, blanco y azul en anillos
const escudo = (x, y, r = 4) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#c8303a')); R.disco(x, y, r - 1, hex('#f2eee2')); R.disco(x, y, r - 2, hex('#c8303a')); R.disco(x, y, Math.max(1, r - 3), hex('#2a4fa8')); R.pset(x - 1, y - r + 1, hex('#ffffff')); };
'''


def _frac(m, tau):
    k = _MARCAS[m]['marcas']
    a, b = k[m], k[m + '_fin']
    return (tau - a) / (b - a)


def _poner(esc, s):
    return re.sub(r"@([a-z]+)@(-?[0-9.]+)@", lambda mm: "en('%s', %.4f)" % (mm.group(1), _frac_esc(esc, mm.group(1), float(mm.group(2)))), s)


def _frac_esc(esc, m, tau):
    k = _MARCAS[esc]['marcas']
    a, b = k[m], k[m + '_fin']
    return (tau - a) / (b - a)


# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dd-sue'] = ('Sue de negro', '''// DD-SUE (frases 20–21), 2026; las viñetas de cómic sin año. Ocho planos, cortados en la palabra:
// 1. la zona de ensayo de peleas: Yelena ataca a Mística (en «Yelena»), Mística salta atrás; Shang-Chi da una patada en
//    el aire y Gambito le lanza una carta rosa que él para (en «Shang-Chi»); la coordinadora aplaude (corta en «and a group»);
// 2. el bosque de decorado: el claquetazo y seis héroes de equipos distintos llegan a sus marcas entre la niebla; en
//    «surprise» todos se vuelven a la derecha con un «!» (corta en «In one brief shot»);
// 3. el plató a oscuras (fondo local): Sue de negro entra en la marca del foco en «Sue Storm»; en «invisible» se vuelve
//    medio transparente y vuelve; el foco se enciende entero en «all-black»; el carro de la cámara avanza y la pértiga la
//    sigue (corta en «a flash»);
// 4. el taller de vestuario (fondo local): el traje negro en su maniquí lanza el destello azul en «flash of blue»; la
//    figurinista llega, se sorprende y en «why» se encoge de hombros con un «?»; la costurera cose (corta en «Doom»);
// 5. (cómic) el salón del trono: Sue y Reed entran por la alfombra; Doom baja del estrado y en «soft spot» le ofrece una
//    rosa a Sue con un corazón; Reed se enfada (corta en «in 2002»);
// 6. (cómic) la habitación del hospital: el cartucho «2002»; Reed llega por la puerta; Doom mece la cuna con cuidado y en
//    «daughter» sale un corazón; Sue saluda desde la cama (corta en «he named»);
// 7. (cómic, fondo local) el balcón del castillo al atardecer: Doom sostiene a la bebé envuelta; en «Valeria» se
//    despliega una cinta rosa con flores; en «love of his youth» un bocadillo con una chica entre flores y un corazón
//    (corta en «That's why»);
// 8. una tienda de cómics de hoy (fondo local): el cartel de Sue de negro se enciende en «black»; los dos lectores miran
//    el cómic, el cartel, el cómic y otra vez el cartel («look twice»); el dependiente ordena cajas.''', COMUN + r'''
const P2 = @imagenes@6.10@, P3 = @imagenes@10.75@, P4 = @imagenes@16.19@, P5 = @valeria@20.96@, P6 = @valeria@25.49@, P7 = @valeria@29.83@, P8 = @valeria@33.89@;
// 1 · la zona de ensayo: dos peleas a la vez
const p1 = (t) => {
  const o = { encuadre: 'bosque', camara: 'ensayo' }; T.plato(R, t, o);
  const YE = @imagenes@2.98@, SC = @imagenes@4.58@;
  // Yelena contra Mística: tantean; en «Yelena» ella ataca y Mística salta atrás
  const ata = tramo(t, YE - 0.15, YE + 0.25) * (1 - tramo(t, YE + 0.9, YE + 1.5));
  const yx = Math.round(56 + Math.sin(t * 2.2) * 2 + ata * 12), sal = Math.max(0, Math.sin(Math.PI * tramo(t, YE, YE + 0.55)));
  const mx = Math.round(86 + Math.sin(t * 2.2 + 1) * 2 + tramo(t, YE, YE + 0.55) * 10 - tramo(t, YE + 1.2, YE + 2.2) * 8);
  R.actor(EL.yelena, yx, 160, t, { dir: 1, dedo: ata > 0.3, enfado: t > YE - 0.3, anda: t > 0.3 && t < YE - 0.3 && Math.sin(t * 3) > 0 });
  R.actor(EL.mistica, mx, 160, t, { dir: -1, salto: Math.round(sal * 8), sorpresa: dentro(t, YE, YE + 0.6), sonrisa: t > YE + 0.8 });
  if (dentro(t, YE + 0.5, YE + 0.9)) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI, f = (t - YE - 0.5) / 0.4; R.pset(Math.round(mx + 7 + Math.cos(a) * (4 + f * 8)), Math.round(158 - Math.sin(a) * (2 + f * 4)), hex('#c8ccd8')); }
  // Shang-Chi contra Gambito: la patada en el aire y la carta rosa que él para
  const pat = Math.max(0, Math.sin(Math.PI * tramo(t, SC - 0.1, SC + 0.6)));
  const sx = Math.round(158 + tramo(t, SC - 0.1, SC + 0.6) * 6 - tramo(t, SC + 1.2, SC + 1.4) * 6);
  R.actor(EL.shangchi, sx, 160, t, { dir: 1, salto: Math.round(pat * 12), brazos: pat > 0.4, dedo: dentro(t, SC + 0.8, SC + 1.3), enfado: t > SC - 0.5 });
  const lanza = SC + 0.55, g = R.actor(EL.gambito, 184, 160, t, { dir: -1, dedo: dentro(t, lanza - 0.25, lanza + 0.2), sonrisa: t > lanza + 0.4 });
  const vu = (t - lanza) / 0.45; if (vu > 0 && vu < 1) { const cx = Math.round(lerp(184, sx + 12, vu)), cy = Math.round(lerp(138, 140, vu) - Math.sin(vu * Math.PI) * 6); R.rect(cx - 2, cy - 1, cx + 2, cy + 1, K); R.rect(cx - 1, cy, cx + 1, cy, Math.sin(t * 30) > 0 ? hex('#ff8ad8') : hex('#e84aa8')); R.pset(cx + 3, cy, hex('#ffd0f0')); }
  if (dentro(t, lanza + 0.45, lanza + 0.75)) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, f = (t - lanza - 0.45) / 0.3; R.pset(Math.round(sx + 13 + Math.cos(a) * (2 + f * 6)), Math.round(140 + Math.sin(a) * (2 + f * 6)), hex('#ff8ad8')); }
  // la coordinadora de peleas con su carpeta: mira, apunta y aplaude
  const ap = t > @imagenes@5.60@;
  const c = R.actor(EL.tecnica, 30, 160, t, { dir: 1, salto: ap ? Math.round(Math.abs(Math.sin((t - @imagenes@5.60@) * 9)) * 3) : 0, sostiene: true, habla: dentro(t, YE - 0.6, YE) && parpa(t, 8), sonrisa: ap });
  { const [hx, hy] = c.mano; caja(hx - 3, hy - 8, hx + 3, hy + 1, hex('#8a5a30')); R.rect(hx - 2, hy - 6, hx + 2, hy, hex('#f2eee2')); for (const yy of [-5, -3, -1]) R.linea(hx - 1, hy + yy, hx + 1, hy + yy, hex('#7a7e86')); R.rect(hx - 1, hy - 9, hx + 1, hy - 8, hex('#c8c4bc')); }
  T.platoDelante(R, t, o);
};
// 2 · el bosque de decorado: llegan seis héroes de equipos distintos; en «surprise» se vuelven a la derecha
const GRUPO = [[EL.thor, 26], [EL.shuri, 56], [EL.johnny, 86], [EL.ciclope, 146], [EL.bucky, 176], [EL.sam, 206]];
const p2 = (t) => {
  const o = { encuadre: 'bosque' }; T.plato(R, t, o);
  const SU = @imagenes@9.85@;
  // el claquetazo: el auxiliar entra, cierra la claqueta en el arranque y se va
  const ca = tramo(t, P2 - 0.2, P2 + 0.3), va = tramo(t, P2 + 0.9, P2 + 2.2), cx = Math.round(lerp(330, 236, ca) + va * 100);
  if (cx < 330) { const a = R.actor(EL.tecnico, cx, 158, t, { dir: va > 0 ? 1 : -1, anda: (ca > 0 && ca < 1) || (va > 0 && va < 1), sostiene: true }); const [hx, hy] = a.mano, cerr = t > P2 + 0.45;
    R.rect(hx - 6, hy - 3, hx + 1, hy + 2, K); R.rect(hx - 5, hy - 2, hx, hy + 1, hex('#2a2a30')); for (let i = 0; i < 3; i++) R.pset(hx - 4 + i * 2, hy - 1, hex('#f2eee2'));
    if (cerr) R.linea(hx - 6, hy - 4, hx + 1, hy - 4, hex('#f2eee2')); else R.linea(hx - 6, hy - 4, hx, hy - 8, hex('#f2eee2')); }
  GRUPO.forEach(([d, x0], k) => {
    const ll = tramo(t, P2 + 0.2 + k * 0.25, P2 + 1.6 + k * 0.25), x = Math.round(lerp(-20 - k * 6, x0, ll)), gira = t > SU + k * 0.06;
    R.actor(d, x, 158, t, { dir: gira ? 1 : (k % 2 ? -1 : 1), anda: ll > 0 && ll < 1, sorpresa: gira && t < SU + 1.1, sonrisa: ll >= 1 && !gira && k % 2 === 0, habla: ll >= 1 && !gira && k % 2 === 1 && parpa(t, 6 + k) });
    if (gira) globo(x + 7, 158 - 32, tramo(t, SU + k * 0.06, SU + 0.3 + k * 0.06), '!', hex('#e8b848'));
  });
  T.platoDelante(R, t, o);
};
// 3 · el plató a oscuras (fondo local): Sue de negro en la marca del foco
const BUF3 = R.nuevo(); let ok3 = false;
const plato3 = () => { R.recorte(null); const prev = R.usar(BUF3);
  // el terciopelo negro del fondo, con pliegues verticales y una franja de luz baja
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const f = (x * 0.21 + Math.sin(y * 0.05 + x * 0.02) * 1.2) % 6; R.pset(x, y, f < 1.2 ? hex('#2e2a3a') : f < 3.6 ? hex('#1e1a28') : hex('#16131e')); }
  for (let y = 112; y < 132; y++) for (let x = 0; x < 320; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#3a3050'), (y - 112) / 30));
  // el telón pintado de la ciudad de noche, en su bastidor
  caja(70, 34, 250, 112, hex('#1a2048'), hex('#3a3022'));
  for (let y = 35; y < 112; y++) R.rect(71, y, 249, y, mez(hex('#141a40'), hex('#3a2a5a'), (y - 35) / 77));
  for (let k = 0; k < 40; k++) R.pset(72 + Math.floor(azar(k, 1) * 176), 36 + Math.floor(azar(k, 2) * 40), k % 3 ? hex('#c8c8f0') : hex('#f6f0c8'));
  R.disco(222, 52, 7, hex('#f6eec8')); R.disco(225, 50, 6, hex('#141a40'));
  for (let x = 71; x < 250; x += 1) { const b = Math.floor((x - 71) / 9), hh = 18 + Math.floor(azar(b, 4) * 34); R.rect(x, 111 - hh, x, 111, (b % 2) ? hex('#0e1028') : hex('#141634'));
    if ((x - 71) % 9 >= 2 && (x - 71) % 9 <= 6 && (x - 71) % 9 !== 4) for (let y = 114 - hh; y < 109; y += 4) if (azar(x * 3 + y, 6) > 0.55) R.pset(x, y, azar(b, y) > 0.5 ? hex('#e8c86a') : hex('#f6e8a0')); }
  for (let x = 96; x < 104; x++) R.rect(x, 42, x, 111, hex('#101230')); R.rect(99, 34, 100, 42, hex('#101230')); R.pset(99, 33, hex('#ff5a4a'));
  for (const x of [70, 250]) { R.rect(x - 1, 112, x + 1, 150, hex('#3a3022')); R.linea(x, 120, x + (x < 160 ? 14 : -14), 150, hex('#3a3022')); }
  R.rect(80, 146, 96, 152, hex('#5a4a2a')); R.rect(224, 146, 240, 152, hex('#5a4a2a'));
  // el suelo de cemento pulido, con juntas, cinta y cables
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const j = (x % 40 === 0) || (y % 16 === 4); R.pset(x, y, j ? hex('#24242a') : (azar(x >> 1, y >> 1) > 0.94 ? hex('#3a3a42') : hex('#2e2e36'))); }
  for (let x = 0; x < 320; x++) R.pset(x, 132, hex('#3a3646'));
  for (const [x, y] of [[148, 160], [160, 160], [154, 156], [154, 164]]) R.pset(x, y, hex('#e8b848'));
  R.rect(146, 160, 162, 160, hex('#e8b848')); R.rect(154, 154, 154, 166, hex('#e8b848'));
  for (let k = 0; k < 3; k++) { let x = 0, y = 150 + k * 9; for (let i = 0; i < 80; i++) { const nx = x + 4, ny = y + Math.round(Math.sin(i * 0.4 + k) * 1.2); R.linea(x, y, nx, ny, hex('#141418')); x = nx; y = ny; if (x > 120 + k * 20) break; } }
  // la parrilla de focos (por debajo de la barra del año) y la escalera de mano a la izquierda
  R.rect(30, 22, 266, 24, hex('#4a4a54')); R.rect(30, 27, 266, 28, hex('#4a4a54'));
  for (let x = 30; x < 266; x += 6) R.linea(x, 24, x + 6, 27, hex('#6a6a74'));
  for (let y = 30; y < 150; y += 8) { R.rect(10, y, 26, y, hex('#8a8a94')); } R.rect(10, 28, 11, 150, hex('#8a8a94')); R.rect(25, 28, 26, 150, hex('#8a8a94'));
  // el carro del monitor de combo (izquierda)
  caja(34, 118, 64, 140, hex('#2a2a30')); R.rect(36, 140, 38, 158, hex('#4a4a54')); R.rect(60, 140, 62, 158, hex('#4a4a54')); R.rect(34, 150, 64, 152, hex('#4a4a54'));
  for (const x of [37, 61]) { R.disco(x, 160, 2, K); }
  // el sitio del rail del carro de cámara, por delante
  R.usar(prev); ok3 = true; };
const p3 = (t) => {
  if (!ok3) plato3(); R.copiar(BUF3);
  const SS = @imagenes@12.25@, INV = @imagenes@13.23@, NEG = @imagenes@15.19@, ll = tramo(t, P3 + 0.1, SS + 0.3);
  // los focos de la parrilla: el del centro se enciende sobre la marca; los otros dos, conos tenues
  const on = tramo(t, SS - 0.3, SS) * 0.6 + tramo(t, NEG - 0.15, NEG + 0.1) * 0.4;
  for (const [fx, a] of [[90, 0.18], [230, 0.18], [154, on]]) {
    R.rect(fx - 4, 29, fx + 4, 36, hex('#2a2a30')); R.rect(fx - 3, 36, fx + 3, 37, a > 0.3 ? hex('#fff0b0') : hex('#5a5a64'));
    if (a > 0.02) for (let y = 38; y < 166; y++) { const w = 4 + (y - 38) * 0.22; for (let x = Math.round(fx - w); x <= fx + w; x++) if ((x + y) % 2 === 0 || a > 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), a * (0.35 - (y - 38) / 600))); } }
  if (on > 0.05) for (let y = 156; y < 168; y++) for (let x = 126; x < 184; x++) { const d = Math.hypot((x - 154) / 28, (y - 161) / 6); if (d < 1) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d8'), on * 0.5 * (1 - d))); }
  for (let k = 0; k < 14; k++) { const u = (t * 0.08 + azar(k, 3)) % 1, x = Math.round(140 + azar(k, 4) * 28 + Math.sin(t + k) * 3), y = Math.round(60 + u * 90); if (on > 0.2) R.pset(x, y, hex('#fff6d8')); }
  // el monitor de combo enseña lo que graba la cámara: el destello azul
  R.rect(37, 121, 61, 137, hex('#0e0e18')); if (on > 0.2) { R.rect(46, 125, 52, 136, hex('#1c1820')); R.rect(47, 122, 51, 125, hex('#f0d070')); if (t > NEG) R.pset(49, 129, parpa(t, 9) ? hex('#4a8ae8') : hex('#c8e8ff')); }
  // la pértiga del micro: el técnico a la derecha la sigue
  const bm = R.actor(EL.tecnico, 262, 160, t, { dir: -1, sostiene: [256, 128] }), px = Math.round(lerp(250, 168, ll)), py = 50 + Math.round(Math.sin(t * 1.3) * 2);
  R.linea(bm.mano[0], bm.mano[1], px, py, hex('#8a8a94')); R.linea(bm.mano[0], bm.mano[1] + 1, px, py + 1, hex('#4a4a54'));
  for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) if (i * i / 9 + j * j / 4 <= 1) R.pset(px + i, py + 3 + j, (i + j + Math.floor(t * 4)) % 3 ? hex('#8a8a90') : hex('#c8c8d0'));
  // Sue entra por la derecha, se para en la marca y se vuelve a la cámara; en «invisible» se desvanece y vuelve
  const sx = Math.round(lerp(236, 147, ll)), inv = Math.sin(Math.PI * tramo(t, INV, INV + 1.1)), opc = { dir: ll < 1 ? -1 : 1, anda: ll > 0 && ll < 1, sonrisa: t > NEG + 0.2, dedo: dentro(t, NEG + 0.5, NEG + 1.4) };
  if (inv > 0.05) { fantasma(EL.sueNegraDD, sx, 160, t, opc, 1 - inv * 0.8); for (let k = 0; k < 8; k++) { const a = t * 3 + k * 0.8; R.pset(Math.round(sx + 7 + Math.cos(a) * 10), Math.round(146 + Math.sin(a) * 14), hex('#a8d8ff')); } }
  else R.actor(EL.sueNegraDD, sx, 160, t, opc);
  if (t > NEG - 0.1) { const f = 0.5 + 0.5 * Math.sin(t * 6); R.pset(sx + 8, 145, hex('#c8e8ff')); if (f > 0.6) { R.pset(sx + 8, 143, hex('#4a8ae8')); R.pset(sx + 8, 147, hex('#4a8ae8')); R.pset(sx + 6, 145, hex('#4a8ae8')); R.pset(sx + 10, 145, hex('#4a8ae8')); } }
  // el carro de cámara por su rail, con el operador, por delante de todo
  for (let x = 0; x < 320; x += 1) { R.pset(x, 170, hex('#6a6a74')); R.pset(x, 174, hex('#6a6a74')); if (x % 10 === 0) R.rect(x, 169, x + 3, 175, hex('#3a3022')); }
  const dx = Math.round(lerp(18, 88, tramo(t, P3, P4)));
  caja(dx, 160, dx + 30, 168, hex('#3a3a44')); for (const w of [dx + 4, dx + 26]) { R.disco(w, 170, 3, K); R.disco(w, 170, 1, hex('#8a8a94')); }
  R.actor(EL.camarografo, dx + 4, 160, t, { dir: 1, sostiene: [dx + 22, 140] });
  caja(dx + 16, 132, dx + 30, 142, hex('#2a2a30')); R.rect(dx + 30, 135, dx + 34, 139, K); R.pset(dx + 33, 137, hex('#5a8ae8')); R.pset(dx + 18, 134, parpa(t, 5) ? hex('#ff3a3a') : hex('#5a1a1a'));
  R.rect(dx + 22, 142, dx + 23, 160, hex('#4a4a54'));
};
// 4 · el taller de vestuario (fondo local): el traje negro en su maniquí
const BUF4 = R.nuevo(); let ok4 = false;
const MANI = [140, 158];
const vestuario = () => { R.recorte(null); const prev = R.usar(BUF4);
  // la pared de yeso melocotón con su textura, y el zócalo
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const n = azar(x >> 1, y >> 1); R.pset(x, y, n > 0.93 ? hex('#d8b49a') : n < 0.05 ? hex('#f4dcc4') : hex('#ecccb0')); }
  R.rect(0, 120, 319, 127, hex('#b88a6a')); R.rect(0, 120, 319, 120, hex('#d8a88a')); R.rect(0, 127, 319, 127, hex('#7a5a44'));
  // la ventana alta con su luz de día (debajo de la barra del año)
  caja(74, 24, 126, 46, hex('#bfe0f0'), hex('#f2eee2')); R.rect(100, 25, 100, 45, hex('#f2eee2')); R.rect(75, 35, 125, 35, hex('#f2eee2'));
  for (const [x, y] of [[80, 28], [110, 30], [88, 39]]) R.rect(x, y, x + 6, y + 1, hex('#f6fbff'));
  for (let y = 46; y < 120; y++) { const d = (y - 46) * 0.5; for (let x = Math.round(74 + d); x <= 126 + d; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff4e0'), 0.35)); }
  // la estantería alta de la izquierda: cajas de botas, cascos y rollos de tela
  caja(4, 30, 62, 150, hex('#8a6040'), hex('#4a2e1a')); for (const y of [56, 82, 108, 134]) R.rect(5, y, 61, y + 2, hex('#5a3a24'));
  const cosas = [[8, 34, 20, 54, '#c8303a'], [24, 40, 38, 54, '#3a5a9a'], [42, 36, 58, 54, '#e8b848'], [8, 66, 24, 80, '#5a8a48'], [28, 62, 42, 80, '#8a8a94'], [46, 68, 58, 80, '#2a2a30'], [8, 90, 22, 106, '#f2eee2'], [26, 96, 40, 106, '#a83a8a'], [44, 88, 58, 106, '#3a9aa8'], [8, 116, 30, 132, '#c8963a'], [34, 120, 58, 132, '#6a4a8a']];
  for (const [x0, y0, x1, y1, c] of cosas) { caja(x0, y0, x1, y1, hex(c)); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, mez(hex(c), hex('#ffffff'), 0.4)); R.rect(x0 + 2, Math.round((y0 + y1) / 2), x0 + 5, Math.round((y0 + y1) / 2) + 1, hex('#f2eee2')); }
  R.disco(33, 74, 6, K); R.disco(33, 74, 5, hex('#c8ccd8')); R.rect(27, 74, 39, 80, hex('#c8ccd8')); R.poligono([[26, 70], [20, 64], [27, 72]], hex('#f2eee2')); R.poligono([[40, 70], [46, 64], [39, 72]], hex('#f2eee2'));
  // el burro largo con los trajes colgados (capas, monos azules, chaquetas)
  R.rect(70, 50, 200, 51, hex('#8a8a94')); R.rect(70, 50, 71, 150, hex('#8a8a94')); R.rect(199, 50, 200, 150, hex('#8a8a94')); R.rect(66, 150, 76, 152, hex('#5a5a64')); R.rect(194, 150, 204, 152, hex('#5a5a64'));
  const trajes = [[76, '#c8303a', '#8a1e28', 1], [92, '#2a5ab8', '#1e3e90', 0], [106, '#2a5ab8', '#1e3e90', 0], [120, '#2a5ab8', '#1e3e90', 0], [160, '#2a6a3a', '#1a4a26', 1], [176, '#5a4a34', '#3a2e1e', 0], [188, '#8a1e28', '#5a1220', 1]];
  for (const [x, c, cs, capa] of trajes) { R.linea(x + 5, 46, x + 5, 52, hex('#c8c8d0')); R.linea(x, 54, x + 10, 54, hex('#c8c8d0'));
    if (capa) { R.poligono([[x, 54], [x + 10, 54], [x + 13, 118], [x - 3, 118]], hex(c)); for (let k = 0; k < 3; k++) R.linea(x + 2 + k * 3, 58, x + 1 + k * 4, 116, hex(cs)); R.linea(x - 3, 118, x + 13, 118, hex(cs)); }
    else { R.rect(x, 54, x + 10, 86, hex(c)); R.rect(x - 2, 56, x - 1, 80, hex(c)); R.rect(x + 11, 56, x + 12, 80, hex(c)); R.rect(x + 1, 86, x + 4, 112, hex(c)); R.rect(x + 6, 86, x + 9, 112, hex(c)); R.rect(x + 4, 56, x + 6, 86, hex(cs)); R.rect(x, 82, x + 10, 83, hex('#f2eee2')); R.disco(x + 5, 64, 2, hex('#f2eee2')); } }
  // el tablero de herramientas: tijeras, cintas, carretes de hilo de colores, reglas
  caja(206, 32, 270, 96, hex('#c8a878'), hex('#7a5a40')); for (let y = 36; y < 94; y += 4) for (let x = 210; x < 268; x += 4) R.pset(x, y, hex('#8a6a48'));
  for (let k = 0; k < 10; k++) { const x = 212 + (k % 5) * 11, y = 40 + Math.floor(k / 5) * 12; R.rect(x, y, x + 5, y + 7, hex('#e8e0d0')); R.rect(x + 1, y + 1, x + 4, y + 6, hex(['#c8303a', '#3a5a9a', '#e8b848', '#5a8a48', '#a83a8a', '#2a2a30', '#f2eee2', '#e86a2a', '#3a9aa8', '#8a5a30'][k])); }
  R.linea(214, 70, 226, 82, hex('#c8ccd8')); R.linea(226, 70, 214, 82, hex('#c8ccd8')); R.disco(213, 69, 2, hex('#c8303a')); R.disco(227, 69, 2, hex('#c8303a'));
  R.disco(244, 76, 6, hex('#e8b848')); R.disco(244, 76, 3, hex('#c8a878')); R.rect(256, 66, 258, 92, hex('#f2eee2')); for (let y = 68; y < 92; y += 3) R.pset(257, y, K);
  // el espejo de cuerpo entero en su pie (a la derecha, por debajo de Atom)
  caja(282, 56, 306, 150, hex('#b8d0d8'), hex('#8a6040')); for (let k = 0; k < 3; k++) R.linea(286 + k * 6, 60, 296 + k * 6, 76, hex('#e8f4f8')); R.rect(283, 120, 305, 149, hex('#a8c0c8'));
  // el suelo de tablas con retales, alfileres y un cesto de rollos
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 7), v = (x + tb * 37) % 64; R.pset(x, y, y % 7 === 0 ? hex('#6a4428') : v === 0 ? hex('#6a4428') : (Math.sin(x * 0.2 + tb) > 0.85 ? hex('#a87448') : hex('#94643c'))); }
  for (const [x, y, c] of [[30, 162, '#c8303a'], [92, 170, '#3a5a9a'], [250, 166, '#e8b848'], [196, 174, '#5a8a48']]) R.poligono([[x, y], [x + 8, y - 2], [x + 10, y + 3], [x + 2, y + 4]], hex(c));
  for (let k = 0; k < 9; k++) R.pset(60 + k * 23, 164 + (k * 7) % 12, hex('#e8e8f0'));
  caja(10, 150, 40, 174, hex('#c8963a'), hex('#5a3a1a')); for (let x = 12; x < 40; x += 4) R.linea(x, 151, x + 2, 173, hex('#a87428')); for (const [x, c] of [[16, '#c8303a'], [24, '#3a5a9a'], [32, '#f2eee2']]) { R.disco(x, 146, 4, K); R.disco(x, 146, 3, hex(c)); R.pset(x, 146, K); }
  R.usar(prev); ok4 = true; };
const p4 = (t) => {
  if (!ok4) vestuario(); R.copiar(BUF4);
  const FL = @imagenes@16.27@, CH = @imagenes@17.25@, MV = @imagenes@18.12@, WHY = @imagenes@19.06@;
  // la lámpara de trabajo sobre el maniquí, y el maniquí con el traje negro y su destello azul
  const [mx, ms] = MANI; R.linea(mx, 22, mx, 60, hex('#4a4a54')); R.poligono([[mx - 8, 66], [mx - 4, 58], [mx + 4, 58], [mx + 8, 66]], hex('#3a3a44')); R.rect(mx - 6, 66, mx + 6, 67, hex('#fff0b0'));
  for (let y = 68; y < 150; y++) { const w = 6 + (y - 68) * 0.25; for (let x = Math.round(mx - w); x <= mx + w; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d8'), 0.25)); }
  R.rect(mx - 1, 136, mx + 1, ms - 2, hex('#8a8a94')); R.rect(mx - 8, ms - 2, mx + 8, ms, hex('#5a5a64'));
  R.disco(mx, 84, 6, K); R.disco(mx, 84, 5, hex('#e8dcc8')); R.rect(mx - 1, 90, mx + 1, 93, hex('#e8dcc8'));
  R.poligono([[mx - 11, 94], [mx + 11, 94], [mx + 9, 120], [mx + 7, 136], [mx - 7, 136], [mx - 9, 120]], K); R.poligono([[mx - 10, 95], [mx + 10, 95], [mx + 8, 120], [mx + 6, 135], [mx - 6, 135], [mx - 8, 120]], hex('#24202c'));
  R.linea(mx - 6, 98, mx - 4, 132, hex('#3a3646')); R.linea(mx + 5, 98, mx + 3, 132, hex('#16131c')); R.rect(mx - 8, 118, mx + 8, 119, hex('#3a3646'));
  const fl = Math.max(Math.exp(-Math.pow((t - FL - 0.1) * 5, 2)), Math.exp(-Math.pow((t - CH) * 5, 2)) * 0.8, 0.25 + 0.1 * Math.sin(t * 4));
  R.disco(mx, 104, 2, hex('#4a8ae8')); R.pset(mx, 104, hex('#c8e8ff'));
  if (fl > 0.4) { R.halo(mx, 104, Math.round(6 + fl * 12), [hex('#1a2a5a'), hex('#2a5ab8'), hex('#a8d8ff')], fl); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t; R.linea(mx, 104, Math.round(mx + Math.cos(a) * fl * 16), Math.round(104 + Math.sin(a) * fl * 16), hex('#c8e8ff')); } }
  // la figurinista llega, mira el destello, se sorprende y en «why» se encoge de hombros
  const ll = tramo(t, P4 + 0.2, FL + 1.0), fx = Math.round(lerp(-16, 108, ll)), encoge = dentro(t, WHY - 0.3, WHY + 1.0);
  R.actor(EL.disenadora, fx, 160, t, { dir: t > MV ? -1 : 1, anda: ll > 0 && ll < 1, sorpresa: dentro(t, CH - 0.2, MV), brazos: encoge, habla: dentro(t, MV, WHY - 0.3) && parpa(t, 8), triste: t > WHY + 1.0 });
  globo(fx + 7, 160 - 30, tramo(t, WHY - 0.05, WHY + 0.25), '?', hex('#3a5a9a'));
  // la costurera tras su mesa con la máquina de coser (la aguja sube y baja y la tela avanza)
  R.actor(EL.senora30, 236, 160, t, { dir: -1, sostiene: [226, 136], sorpresa: dentro(t, FL, FL + 0.8) });
  caja(204, 136, 274, 142, hex('#a87448'), hex('#4a2e1a')); R.rect(208, 142, 211, 170, hex('#6a4428')); R.rect(268, 142, 271, 170, hex('#6a4428'));
  caja(212, 120, 238, 136, hex('#f2eee2')); R.rect(214, 122, 236, 124, hex('#c8c4bc')); R.rect(230, 126, 236, 134, hex('#e8e2d4')); R.disco(232, 118, 2, hex('#c8303a'));
  const ag = Math.floor(t * 14) % 2; R.rect(216, 125 + ag, 216, 132 + ag, hex('#8a8a94'));
  for (let x = 196; x < 224; x++) { const v = (x + Math.floor(t * 10)) % 6; R.pset(x, 135, v < 3 ? hex('#2a5ab8') : hex('#1e3e90')); R.pset(x, 134, hex('#2a5ab8')); }
};
// 5 · (cómic) el salón del trono: Doom le ofrece una rosa a Sue; Reed, celoso
const p5 = (t) => {
  const o = { encuadre: 'latveria' }; T.comic(R, t, o);
  const SP = @valeria@23.91@, ll = tramo(t, P5 - 0.1, P5 + 1.6), baja = tramo(t, SP - 1.6, SP - 0.2);
  const sx = Math.round(lerp(40, 112, ll)), rx = Math.round(lerp(18, 88, ll));
  R.actor(EL.reed, rx, 160, t, { dir: 1, anda: ll > 0 && ll < 1, enfado: t > SP, habla: dentro(t, SP + 0.3, SP + 1.2) && parpa(t, 9) });
  R.actor(EL.sue, sx, 160, t, { dir: 1, anda: ll > 0 && ll < 1, sorpresa: dentro(t, SP - 0.1, SP + 0.7), sonrisa: t > SP + 0.7 });
  const dx = Math.round(lerp(153, 132, baja)), dy = Math.round(lerp(127, 160, baja));
  const d = R.actor(EL.doom, dx, dy, t, { dir: -1, anda: baja > 0 && baja < 1, sostiene: t > SP - 0.3 ? [dx - 2, dy - 16] : undefined });
  if (t > SP - 0.3) { const [hx, hy] = d.mano; R.linea(hx, hy, hx - 4, hy + 4, hex('#3a8a3a')); R.disco(hx - 1, hy - 2, 2, K); R.disco(hx - 1, hy - 2, 1, hex('#e83a3a')); R.pset(hx - 2, hy - 3, hex('#ff8a8a')); }
  const h = tramo(t, SP, SP + 0.6); if (h > 0) corazon(Math.round((dx + sx) / 2) + 4, Math.round(118 - h * 10), hex('#e83a5a'));
  T.comicDelante(R, t, o);
};
// 6 · (cómic) el hospital, 2002: Doom mece la cuna con cuidado; Reed llega; Sue saluda desde la cama
const p6 = (t) => {
  const o = { encuadre: 'latveria', camara: 'cuna' }; T.comic(R, t, o);
  const DA = @valeria@28.29@, ll = tramo(t, P6 + 0.3, P6 + 2.0);
  // Sue, incorporada en la cama, con la manta por delante
  R.actor(EL.sue, 288, 130, t, { dir: -1, sonrisa: true, dedo: dentro(t, @valeria@27.3@, @valeria@28.6@) });
  R.rect(286, 120, 310, 150, hex('#4270aa')); R.rect(286, 120, 310, 121, hex('#2a4a7a')); for (let x = 288; x < 310; x += 5) R.linea(x, 124, x + 2, 148, hex('#3a5a8a'));
  R.actor(EL.reed, Math.round(lerp(24, 64, ll)), 160, t, { dir: 1, anda: ll > 0 && ll < 1, sorpresa: dentro(t, P6 + 2.0, P6 + 2.8), sonrisa: t > P6 + 2.8 });
  // Doom junto a la cuna: la mano en el borde, la mece despacio
  const mece = Math.round(Math.sin(t * 2.4) * 2);
  R.actor(EL.doom, 192, 160, t, { dir: -1, sostiene: [185 + mece, 116] });
  const h = tramo(t, DA - 0.2, DA + 0.6); if (h > 0) corazon(156, Math.round(104 - h * 12), hex('#e83a5a'));
  T.comicDelante(R, t, o);
  const c = tramo(t, @valeria@25.59@ - 0.1, @valeria@25.59@ + 0.2); if (c > 0) { const w = Math.round(46 * c); caja(14, 22, 14 + Math.max(4, w), 38, hex('#f6d860')); if (c > 0.8) R.numero('2002', 37, 34, { centro: true, rampa: ['#2a2030', '#141018', '#141018', '#141018', '#141018'].map(hex) }); }
};
// 7 · (cómic, fondo local) el balcón del castillo al atardecer: Doom con la bebé; la cinta; el recuerdo de juventud
const BUF7 = R.nuevo(); let ok7 = false;
const balcon = () => { R.recorte(null); const prev = R.usar(BUF7);
  const cie = [hex('#f6d8a0'), hex('#f0b080'), hex('#d88a8a'), hex('#a8789a')];
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) { const f = (y - 8) / 120, b = cie[Math.min(3, Math.floor((1 - f) * 4))]; R.pset(x, y, ((x + (y >> 1)) % 4 === 0 && (y & 1)) ? mez(b, K, 0.12) : b); }
  R.disco(96, 96, 14, K); R.disco(96, 96, 13, hex('#fbe8a8')); R.disco(96, 96, 9, hex('#fff6d0'));
  const sierra = (base, alto, paso, sem, col, nieve) => { const pts = [[9, 171]]; for (let x = 9; x <= 311; x += paso) pts.push([x, base - alto * (0.35 + 0.65 * azar(x, sem))]); pts.push([311, 171]); R.poligono(pts, col);
    for (let i = 1; i < pts.length - 2; i++) { R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], K); if (nieve && pts[i][1] < base - alto * 0.6) R.poligono([[pts[i][0] - 5, pts[i][1] + 6], [pts[i][0], pts[i][1]], [pts[i][0] + 5, pts[i][1] + 6], [pts[i][0], pts[i][1] + 4]], nieve); } };
  sierra(104, 40, 16, 3, hex('#8a7aa8'), hex('#f4eedc')); sierra(122, 26, 12, 4, hex('#6a6a8a'), null);
  // el pueblo de abajo: tejados rojos con chimeneas y ventanas encendidas
  for (let k = 0; k < 16; k++) { const x = 20 + k * 18 + Math.floor(azar(k, 5) * 6), y = 118 + Math.floor(azar(k, 6) * 10), w = 12 + Math.floor(azar(k, 7) * 6);
    R.rect(x, y, x + w, y + 12, hex('#efe2c4')); R.poligono([[x - 2, y], [x + w / 2, y - 7], [x + w + 2, y]], k % 3 ? hex('#b84a3a') : hex('#6a5a7a')); R.linea(x - 2, y, x + w / 2, y - 7, K); R.linea(x + w / 2, y - 7, x + w + 2, y, K); R.rect(x, y, x, y + 12, K); R.rect(x + w, y, x + w, y + 12, K);
    R.rect(x + 3, y + 4, x + 5, y + 7, hex('#f6d860')); R.rect(x + w - 3, y - 6, x + w - 2, y - 2, hex('#8a5a3a')); }
  // dos torres a los lados con su estandarte verde (sin escudo)
  for (const [x0, x1] of [[14, 48], [262, 296]]) { R.rect(x0, 50, x1, 171, hex('#a8a8b8')); R.rect(x0, 50, x0, 171, K); R.rect(x1, 50, x1, 171, K);
    for (let y = 54; y < 171; y += 8) for (let x = x0 + 2; x < x1; x += 10) R.rect(x + ((y >> 3) % 2) * 5, y, x + ((y >> 3) % 2) * 5 + 8, y, hex('#7a7a8c'));
    for (let x = x0; x <= x1; x += 8) { R.rect(x, 44, x + 4, 50, hex('#a8a8b8')); R.rect(x, 44, x + 4, 44, K); }
    R.rect(x0 + 8, 60, x1 - 8, 64, K); R.rect(x0 + 10, 66, x1 - 10, 92, hex('#2a6a3a')); R.poligono([[x0 + 10, 92], [(x0 + x1) / 2, 100], [x1 - 10, 92]], hex('#2a6a3a')); R.rect(x0 + 12, 68, x0 + 13, 90, hex('#1a4a26')); }
  // el suelo del balcón y la balaustrada (la balaustrada va por delante: en p7)
  R.rect(9, 150, 310, 171, hex('#b8b0a0')); for (let x = 9; x < 310; x += 14) R.linea(x, 150, x - 6, 171, hex('#8a8478')); R.linea(9, 150, 310, 150, K);
  R.usar(prev); ok7 = true; };
const p7 = (t) => {
  const o = { encuadre: 'latveria', camara: 'cuna' }; T.comic(R, t, o);
  if (!ok7) balcon(); for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) R.pset(x, y, BUF7[y * 320 + x]);
  const NA = @valeria@29.91@, VA = @valeria@30.63@, LO = @valeria@32.37@;
  // nubes que pasan y pájaros
  for (const [x0, y, w, v] of [[30, 40, 26, 3], [170, 30, 34, 2], [240, 58, 22, 4]]) { const x = ((x0 + t * v) % 330) - 10; for (const [dx, dy, r] of [[0, 0, w / 4], [w / 4, -3, w / 4], [w / 2, 1, w / 5]]) { R.disco(Math.round(x + dx), Math.round(y + dy), Math.round(r) + 1, K); } for (const [dx, dy, r] of [[0, 0, w / 4], [w / 4, -3, w / 4], [w / 2, 1, w / 5]]) R.disco(Math.round(x + dx), Math.round(y + dy), Math.round(r), hex('#fbf0dc')); }
  for (let k = 0; k < 4; k++) { const x = Math.round(300 - ((t * 14 + k * 9) % 300)), y = 70 + k * 3 + Math.round(Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); }
  // el humo de las chimeneas
  for (let k = 0; k < 5; k++) { const f = (t * 0.5 + k / 5) % 1; R.disco(Math.round(60 + k * 46 + f * 6), Math.round(110 - f * 18), 1 + Math.round(f * 2), hex('#e8e0d0')); }
  // Doom sostiene a la bebé envuelta; en «named» la sube un poco
  // el resplandor de viñeta detrás de Doom: un abanico de rayos amarillos con su contorno, que gira despacio
  for (let k = 0; k < 16; k++) { const a0 = k / 16 * Math.PI * 2 + t * 0.15, a1 = a0 + Math.PI / 16, r = 40;
    R.poligono([[160, 134], [Math.round(160 + Math.cos(a0) * r), Math.round(134 + Math.sin(a0) * r * 0.7)], [Math.round(160 + Math.cos(a1) * r), Math.round(134 + Math.sin(a1) * r * 0.7)]], k % 2 ? hex('#fbe8a8') : hex('#f6d070')); }
  R.disco(160, 134, 12, hex('#fff6d8'));
  const sube = tramo(t, NA, NA + 0.5) * (1 - tramo(t, LO + 0.6, LO + 1.2)), d = R.actor(EL.doom, 152, 158, t, { dir: 1, sostiene: [168, 134 - Math.round(sube * 6)] });
  const [hx, hy] = d.mano, r = Math.sin(t * 1.6) > 0 ? 1 : 0;
  R.disco(hx + 1, hy - 1, 5, K); R.disco(hx + 1, hy - 1, 4, hex('#f0a8c0')); R.rect(hx - 3, hy - 3, hx + 5, hy - 2 - r, hex('#f8c8d8')); R.disco(hx + 3, hy - 4 - r, 2, K); R.disco(hx + 3, hy - 4 - r, 1, hex('#f0c8a8'));
  // la cinta rosa con flores que se despliega en «Valeria»
  const ci = tramo(t, VA - 0.1, VA + 0.5); if (ci > 0) { const w = Math.round(70 * ci), cx = 168, cy = 46;
    R.poligono([[cx - w, cy], [cx + w, cy], [cx + w - 4, cy + 6], [cx + w, cy + 12], [cx - w, cy + 12], [cx - w + 4, cy + 6]], K); R.poligono([[cx - w + 1, cy + 1], [cx + w - 1, cy + 1], [cx + w - 4, cy + 6], [cx + w - 1, cy + 11], [cx - w + 1, cy + 11], [cx - w + 4, cy + 6]], hex('#f0a8c0'));
    for (let x = cx - w + 8; x < cx + w - 6; x += 10) { R.disco(x, cy + 6, 2, hex('#fbf6ea')); R.pset(x, cy + 6, hex('#e8b848')); R.pset(x + 4, cy + 4, hex('#5a8a48')); R.pset(x + 5, cy + 8, hex('#5a8a48')); } }
  // el recuerdo: un bocadillo de pensamiento con la chica de su juventud entre flores y un corazón
  const re = tramo(t, LO - 0.15, LO + 0.35); if (re > 0) { const bx = 66, by = 52, rr = Math.round(22 * re);
    R.disco(150, 118, 2, K); R.disco(150, 118, 1, hex('#fbf6ea')); R.disco(140, 108, 3, K); R.disco(140, 108, 2, hex('#fbf6ea')); R.disco(126, 98, 4, K); R.disco(126, 98, 3, hex('#fbf6ea'));
    for (let y = by - rr; y <= by + rr; y++) for (let x = bx - rr - 8; x <= bx + rr + 8; x++) { const d2 = Math.pow((x - bx) / (rr + 8), 2) + Math.pow((y - by) / rr, 2); if (d2 <= 1) R.pset(x, y, d2 > 0.86 ? K : hex('#f4e4c8')); }
    if (re > 0.8) { R.recorte([bx - 26, by - 18, bx + 26, by + 18]); for (let y = by + 10; y <= by + 18; y++) for (let x = bx - 26; x <= bx + 26; x++) R.pset(x, y, hex('#8aa070'));
      for (let k = 0; k < 7; k++) { const fx = bx - 22 + k * 7, fy = by + 9 + (k % 2); R.disco(fx, fy, 1, k % 2 ? hex('#e8b848') : hex('#f0a8c0')); }
      R.actor(EL.chicaHoy, bx - 8, by + 12, t, { dir: 1, sonrisa: true, pal: { C: hex('#e8d0a0'), c: hex('#c8a878'), W: hex('#e8d0a0'), F: hex('#c8a878') } }); R.recorte(null);
      corazon(bx + 12, by - 12 + Math.round(Math.sin(t * 5)), hex('#e83a5a')); } }
  // la balaustrada de piedra, por delante
  R.rect(9, 152, 310, 155, hex('#d8d0c0')); R.linea(9, 152, 310, 152, K); R.linea(9, 155, 310, 155, K);
  for (let x = 14; x < 308; x += 12) { R.rect(x, 156, x + 5, 165, hex('#cfc6b4')); R.rect(x + 1, 157, x + 4, 159, hex('#e8e0d0')); R.rect(x, 156, x, 165, K); R.rect(x + 5, 156, x + 5, 165, K); R.rect(x + 4, 160, x + 4, 164, hex('#a8a090')); }
  R.rect(9, 165, 310, 171, hex('#d8d0c0')); R.linea(9, 165, 310, 165, K); for (let x = 9; x < 310; x += 3) R.pset(x, 168 + (x % 2), hex('#9a9282'));
  for (const [x, y] of [[40, 150], [262, 150]]) { R.rect(x, y - 6, x + 8, y, hex('#b84a3a')); R.rect(x, y - 6, x + 8, y - 6, K); for (let k = 0; k < 4; k++) { R.disco(x + 1 + k * 2, y - 9 - (k % 2) * 2, 2, [hex('#f0a8c0'), hex('#e8b848'), hex('#fbf6ea'), hex('#e83a5a')][k]); } }
  T.comicDelante(R, t, o);
};
// 8 · una tienda de cómics de hoy (fondo local): los lectores miran dos veces
const BUF8 = R.nuevo(); let ok8 = false;
const tienda = () => { R.recorte(null); const prev = R.usar(BUF8);
  // la pared de arriba lisa y cálida bajo la barra del año, con la luz de los focos de carril
  for (let y = 0; y < 36; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x + y) % 4 === 0 && y > 20) ? hex('#d8c4a4') : hex('#e8d8bc'));
  R.rect(0, 34, 319, 36, hex('#5a3a24')); for (let x = 30; x < 270; x += 48) { R.rect(x, 37, x + 6, 41, hex('#2a2a30')); R.pset(x + 3, 41, hex('#fff0b0')); }
  // la pared de los cómics: tres baldas de portadas de colores (sin letras: dibujos)
  R.rect(0, 37, 319, 122, hex('#6a3a4a')); for (let x = 0; x < 320; x += 4) R.linea(x, 37, x, 122, hex('#5e3242'));
  const port = ['#c8303a', '#2a5ab8', '#e8b848', '#5a8a48', '#a83a8a', '#2a2a30', '#e86a2a', '#3a9aa8', '#f2eee2', '#8a5a30'];
  for (const y0 of [46, 72, 98]) { R.rect(66, y0 + 22, 252, y0 + 23, hex('#3a2418'));
    for (let k = 0; k < 13; k++) { const x0 = 70 + k * 14, c = hex(port[(k * 3 + y0) % 10]), s = (k * 7 + y0) % 5; caja(x0, y0, x0 + 11, y0 + 20, c);
      R.rect(x0 + 1, y0 + 1, x0 + 10, y0 + 4, mez(c, hex('#ffffff'), 0.4));
      if (s === 0) { R.disco(x0 + 6, y0 + 12, 3, hex('#f2eee2')); R.pset(x0 + 6, y0 + 12, K); } else if (s === 1) { R.poligono([[x0 + 2, y0 + 18], [x0 + 6, y0 + 7], [x0 + 10, y0 + 18]], hex('#141018')); } else if (s === 2) { R.rect(x0 + 4, y0 + 8, x0 + 7, y0 + 18, hex('#f6c290')); R.disco(x0 + 5, y0 + 7, 2, hex('#f6c290')); } else if (s === 3) { for (let i = 0; i < 4; i++) R.linea(x0 + 2, y0 + 8 + i * 3, x0 + 9, y0 + 6 + i * 3, hex('#f6d860')); } else { R.disco(x0 + 6, y0 + 13, 4, hex('#e83a3a')); R.disco(x0 + 6, y0 + 13, 2, hex('#f6d860')); } } }
  // la ventana a la calle (izquierda), con su cristal y su marco
  caja(6, 44, 58, 118, hex('#a8c8d8'), hex('#2a2a30')); R.rect(31, 45, 32, 117, hex('#2a2a30'));
  for (let y = 46; y < 90; y++) R.rect(7, y, 57, y, mez(hex('#a8c8d8'), hex('#e8d8bc'), (y - 46) / 50)); R.rect(7, 90, 57, 117, hex('#8a8a94')); R.rect(7, 100, 57, 101, hex('#c8c8d0'));
  for (const [x, w, hh] of [[8, 10, 30], [20, 8, 20], [34, 12, 36], [48, 8, 24]]) { R.rect(x, 90 - hh, x + w, 90, hex('#b8a088')); for (let y = 92 - hh; y < 88; y += 5) R.rect(x + 2, y, x + 3, y + 2, hex('#6a7a8a')); }
  // el cartel de Sue de negro en su marco (debajo de la zona de Atom)
  caja(256, 50, 290, 112, hex('#141220'), hex('#c8a878')); for (let y = 51; y < 112; y++) R.rect(257, y, 289, y, mez(hex('#141220'), hex('#2a2850'), (y - 51) / 61));
  for (let k = 0; k < 12; k++) R.pset(258 + Math.floor(azar(k, 9) * 30), 52 + Math.floor(azar(k, 8) * 30), hex('#8a8ac8'));
  // el mostrador de la derecha con la caja registradora y una pila de cómics; la puerta trasera
  caja(226, 126, 318, 160, hex('#8a5a3a'), hex('#3a2418')); for (let x = 230; x < 318; x += 8) R.linea(x, 128, x, 158, hex('#7a4a2e'));
  caja(286, 112, 310, 126, hex('#4a4a54')); R.rect(290, 114, 306, 118, hex('#5ae88a')); R.rect(288, 120, 308, 125, hex('#2a2a30'));
  for (let k = 0; k < 6; k++) caja(240, 120 - k * 2, 262, 122 - k * 2, hex(port[k]));
  // el suelo de baldosas en damero y la mesa de cajas largas (detrás de los lectores)
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) { const s = Math.floor((x - 160) / (10 + (y - 122) * 0.25) + 100) + Math.floor(Math.log(y - 110) * 6); R.pset(x, y, s % 2 ? hex('#e8e0d0') : hex('#3a3a44')); }
  R.rect(0, 122, 319, 123, hex('#2a1a12'));
  caja(80, 128, 214, 146, hex('#c8a878'), hex('#4a2e1a')); R.rect(84, 146, 86, 166, hex('#4a2e1a')); R.rect(208, 146, 210, 166, hex('#4a2e1a'));
  for (const x0 of [86, 130, 172]) { caja(x0, 120, x0 + 38, 132, hex('#f2eee2')); for (let x = x0 + 2; x < x0 + 37; x += 2) R.rect(x, 117 + ((x * 7) % 3), x, 121, hex(port[(x >> 1) % 10])); }
  R.usar(prev); ok8 = true; };
const p8 = (t) => {
  if (!ok8) tienda(); R.copiar(BUF8);
  const BL = @valeria@35.29@, LK = @valeria@36.37@;
  // por la ventana pasa gente (recortada al cristal)
  R.recorte([7, 45, 57, 117]); for (let k = 0; k < 2; k++) { const x = Math.round(((t * (14 + k * 6) + k * 40) % 90) - 20); R.actor(k ? EL.vecina : EL.vecino, x, 112, t, { dir: 1, anda: true }); } R.recorte(null);
  // el cartel: Sue de negro con su destello, que se enciende en «black»
  const on = tramo(t, BL - 0.2, BL + 0.2); R.recorte([257, 51, 289, 111]); R.actor(EL.sueNegraDD, 266, 104, t, { dir: -1, quieto: true }); R.recorte(null);
  if (on > 0) { const f = 0.6 + 0.4 * Math.sin(t * 7); R.halo(275, 89, Math.round(5 + on * f * 8), [hex('#1a2a5a'), hex('#2a5ab8'), hex('#a8d8ff')], on * f); R.pset(275, 89, hex('#ffffff')); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + t; R.pset(Math.round(275 + Math.cos(a) * 6 * on), Math.round(89 + Math.sin(a) * 6 * on), hex('#c8e8ff')); } }
  // el dependiente ordena cómics en el mostrador
  const dep = R.actor(EL.dependiente, 270, 126, t, { dir: -1, sostiene: [262, 112 + Math.round(Math.sin(t * 3) * 2)] }); caja(dep.mano[0] - 5, dep.mano[1] - 3, dep.mano[0] + 3, dep.mano[1] + 3, hex('#2a5ab8'));
  // el gato que duerme en una caja y mueve la cola
  T.gato(R, 146, 120, t, { dir: 1 });
  // los dos lectores: leen; en «black» miran el cartel, vuelven al cómic, y otra vez al cartel («look twice»)
  const mira = (k) => { const d = k * 0.15; return (t > BL + d && t < LK - 0.15 + d) || t > LK + 0.35 + d; };
  [[EL.chicoHoy, 120], [EL.chicaHoy, 168]].forEach(([def, x], k) => {
    const m = mira(k), segunda = t > LK + 0.35 + k * 0.15, a = R.actor(def, x, 168, t, { dir: m ? 1 : -1, sostiene: [x + (m ? 16 : -2), 150], sorpresa: segunda, sonrisa: !m && t < BL });
    { const [hx, hy] = a.mano; R.rect(hx - 6, hy - 4, hx + 4, hy + 3, K); R.rect(hx - 5, hy - 3, hx - 1, hy + 2, hex('#f2eee2')); R.rect(hx, hy - 3, hx + 3, hy + 2, hex('#f2eee2')); R.rect(hx - 4, hy - 2, hx - 2, hy, hex('#2a5ab8')); R.rect(hx + 1, hy - 1, hx + 2, hy + 1, hex('#e83a3a'));
      if (!m && Math.floor(t * 0.7 + k) % 3 === 0 && t < BL) R.linea(hx - 1, hy - 4, hx - 1 + Math.round(Math.sin(t * 6) * 3), hy + 3, hex('#c8c4bc')); }
    if (segunda) globo(x + 7, 168 - 30, tramo(t, LK + 0.35 + k * 0.15, LK + 0.6 + k * 0.15), '!', hex('#e83a3a'));
  });
};
const año = (t) => (t >= P5 + 0.1 && t < P8) ? null : 2026;
const efectos = [[@imagenes@2.98@, 'whoosh'], [@imagenes@3.55@, 'golpecito'], [@imagenes@4.58@, 'whoosh'], [@imagenes@5.13@, 'papel'],
  [P2 + 0.45, 'toc'], [@imagenes@9.87@, 'aviso'],
  [@imagenes@11.95@, 'interruptor'], [@imagenes@13.3@, 'brillo'],
  [@imagenes@16.32@, 'brillo'], [@imagenes@19.06@, 'pop'],
  [@valeria@25.55@, 'papel'], [@valeria@28.2@, 'brillo'],
  [@valeria@30.6@, 'papel'], [@valeria@32.37@, 'brillo'],
  [@valeria@35.29@, 'interruptor'], [@valeria@36.72@, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año });
''')


# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dd-anuncios'] = ('Los anuncios', """// DD-ANUNCIOS (frases 22–24), 2026. Diez planos, cortados en la palabra:
// 1. el escaparate de una tienda de teles al anochecer (fondo local): seis teles pasan el mismo anuncio con su cuenta de
//    segundos; una fan se para, lo celebra en «trailers» y en «TV spots» la cuenta llega a 0 y se sorprende; pasa un perro
//    con su dueño y una bici por delante (corta en «In the late October»);
// 2. la azotea de Nueva York al atardecer: los tres Capitanes con su escudo; Ant-Man llega y en «which Captain» duda («?»);
//    los tres dan un paso con un «!» a la vez y él se encoge de vergüenza (corta en «a longer cut»);
// 3. el lago al atardecer: Steve espera; Thor llega y en «reunites» se abrazan (las manos arriba y la mano en el hombro);
//    en «Doom crosses» Doom cruza deprisa por detrás del banco con su estela verde y los dos se vuelven (corta en el silencio);
// 4. la sala de montaje (fondo local): el calendario de mesa pasa del 17 al 18 en «November 18»; la línea de tiempo corre
//    con el «26» en «26-second»; en «five teams» salen cinco bloques de colores (corta en «one after another»);
// 5. la sala de los Vengadores: el holograma pasa por los cinco iconos en cada nombre; por detrás llega un héroe de cada
//    equipo y se pone en fila; Steve los presenta (corta en «And Marvel posted»);
// 6. el salón con la tele: la invitación en la tele; en «In one month» la hoja de noviembre sale volando y queda diciembre
//    con el 18 en un círculo; en «return together» la familia salta junta (corta en «That week»);
// 7. una calle de Tokio de noche (fondo local): la pantalla gigante con la máscara de Doom y su voz (ondas); la gente se
//    para y señala; pasa el tren por el puente (corta en «And in another»);
// 8. la sala envolvente: la imagen se extiende por las paredes en «wraparound»; los Russo llegan a sus sillas y presentan
//    el formato (corta en «and according»);
// 9. la mesa de un café (inserto, fondo local): la mano con el móvil; en «new shots» salen tres miniaturas con «!»;
//    café que humea, cruasán y periódico (corta en «behind»);
// 10. el hangar al anochecer (fondo local): Steve, subido a una caja, habla a los Vengadores; Reed de pie detrás de él;
//    en «Avengers» todos levantan los brazos.""", COMUN + r"""
const A2 = @spot@5.11@, A3 = @spot@9.77@, A4 = @spot@15.0@, A5 = @equipos@21.86@, A6 = @equipos@28.63@, A7 = @japon@35.71@, A8 = @japon@39.85@, A9 = @japon@45.23@, A10 = @japon@49.15@;
// ── 1 · el escaparate de las teles (fondo local) ──
const BUF1 = R.nuevo(); let ok1 = false;
const LADR = [hex('#9a4a36'), hex('#b05a40'), hex('#7a3a2c'), hex('#5a2c24')];
const fachada = () => { R.recorte(null); const prev = R.usar(BUF1);
  // la fachada de ladrillo (tranquila arriba, bajo la barra del año)
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 5), m = (x + (f % 2) * 6) % 12; const llaga = y % 5 === 0 || m === 0;
    R.pset(x, y, y < 22 ? (llaga ? hex('#5a2c24') : hex('#6a3428')) : llaga ? LADR[3] : LADR[Math.floor(azar(Math.floor((x + (f % 2) * 6) / 12), f) * 3)]); }
  R.rect(0, 20, 319, 23, hex('#c8b8a0')); R.rect(0, 23, 319, 24, hex('#8a7a64'));
  // dos ventanas del primer piso con su cortina y una maceta
  for (const x0 of [180, 234]) { caja(x0, 26, x0 + 34, 44, hex('#f6d88a'), hex('#e8e0d0')); R.rect(x0 + 17, 27, x0 + 17, 43, hex('#e8e0d0')); R.rect(x0 + 1, 27, x0 + 8, 43, hex('#c8303a')); R.rect(x0 + 26, 27, x0 + 33, 43, hex('#c8303a')); R.rect(x0 - 2, 44, x0 + 36, 46, hex('#c8b8a0')); }
  // el toldo de rayas con su festón
  for (let x = 30; x <= 258; x++) { const c = Math.floor((x - 30) / 8) % 2 ? hex('#f2eee2') : hex('#2a7a5a'); R.rect(x, 48, x, 56, c); const fe = (x - 30) % 8; R.rect(x, 57, x, 57 + (fe < 4 ? fe : 7 - fe) / 2, c); }
  R.rect(30, 47, 258, 47, K); R.rect(30, 48, 258, 49, hex('#1a5a3a'));
  // el escaparate: marco, fondo oscuro, baldas
  caja(36, 60, 252, 134, hex('#1a1a26'), hex('#2a2a30')); R.rect(36, 60, 252, 62, hex('#4a4a54'));
  for (let y = 63; y < 133; y++) for (let x = 38; x < 251; x++) if ((x * 3 + y * 5) % 23 === 0) R.pset(x, y, hex('#22222e'));
  for (const y of [96, 130]) { R.rect(40, y, 248, y + 2, hex('#8a8a94')); R.rect(40, y + 3, 248, y + 3, hex('#4a4a54')); }
  // la puerta de cristal a la derecha, con su pomo y el icono de la tele en neón
  caja(260, 60, 300, 158, hex('#3a4a5a'), hex('#2a2a30')); R.rect(264, 66, 296, 150, hex('#5a7a8a')); for (let k = 0; k < 3; k++) R.linea(268 + k * 7, 70, 280 + k * 7, 92, hex('#a8c8d8')); R.rect(292, 108, 294, 114, hex('#e8b848'));
  // la acera de baldosas, el bordillo y la calle
  for (let y = 134; y < 162; y++) for (let x = 0; x < 320; x++) { const j = x % 24 === 0 || (y - 134) % 9 === 0; R.pset(x, y, j ? hex('#8a8478') : azar(x >> 1, y >> 1) > 0.93 ? hex('#a8a294') : hex('#b8b2a4')); }
  R.rect(0, 161, 319, 164, hex('#d8d2c4')); R.rect(0, 164, 319, 165, hex('#6a6458'));
  for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, azar(x, y) > 0.92 ? hex('#4a4a52') : hex('#3a3a42'));
  for (let x = 0; x < 320; x += 30) R.rect(x, 173, x + 14, 174, hex('#e8d8a0'));
  // la farola de la izquierda y una boca de incendios
  R.rect(14, 40, 16, 160, hex('#2a2a30')); R.rect(8, 36, 22, 40, hex('#2a2a30')); R.rect(10, 41, 20, 44, hex('#f6e8a0'));
  R.rect(250, 146, 256, 160, hex('#c8303a')); R.rect(248, 144, 258, 147, hex('#a81e28')); R.rect(246, 150, 260, 152, hex('#a81e28'));
  R.usar(prev); ok1 = true; };
const tele = (x0, y0, t, cuenta, k) => {
  caja(x0, y0, x0 + 44, y0 + 30, hex('#06060c'), hex('#2a2a30')); R.rect(x0 + 18, y0 + 31, x0 + 26, y0 + 32, hex('#2a2a30'));
  const X0 = x0 + 2, Y0 = y0 + 2, X1 = x0 + 42, Y1 = y0 + 28;
  if (cuenta <= 0) { for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, azar(x + Math.floor(t * 20), y) > 0.5 ? hex('#8a8a94') : hex('#3a3a44')); return; }
  for (let y = Y0; y <= Y1; y++) R.rect(X0, y, X1, y, mez(hex('#f0a060'), hex('#5a2a5a'), (y - Y0) / (Y1 - Y0)));
  R.disco(X0 + 30, Y0 + 14, 5, hex('#fff0b0'));
  for (let x = X0; x <= X1; x++) { const hh = 3 + Math.floor(azar(Math.floor(x / 4), 2) * 6); R.rect(x, Y1 - hh, x, Y1, hex('#2a1a2a')); }
  for (let i = 0; i < 4; i++) { const hx = X0 + 6 + i * 8 + Math.round(Math.sin(t * 6 + i + k) * 1), hy = Y1 - 6 - (Math.floor(t * 8 + i) % 2); R.rect(hx, hy - 4, hx + 2, hy, hex('#141018')); R.rect(hx, hy - 6, hx + 2, hy - 5, hex('#141018')); }
  R.numero(String(cuenta), X0 + 2, Y0 + 7, { color: hex('#ffffff') });
};
const p1 = (t) => {
  if (!ok1) fachada(); R.copiar(BUF1);
  const TR = @spot@2.64@, SP = @spot@4.16@, cuenta = Math.max(0, Math.ceil(30 * (1 - tramo(t, 0.6, SP))));
  for (let k = 0; k < 6; k++) tele(44 + (k % 3) * 70 + (k > 2 ? 8 : 0), k < 3 ? 64 : 98, t, cuenta, k);
  // el neón de la puerta: una tele pequeña que parpadea
  const ne = parpa(t, 3) ? hex('#5ae8ff') : hex('#2a8aa8'); R.rect(271, 72, 289, 84, ne); R.rect(273, 74, 287, 82, hex('#3a4a5a')); R.rect(278, 85, 282, 86, ne);
  // la luz del escaparate en la acera
  for (let y = 135; y < 160; y++) for (let x = 40; x < 250; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#8ab8e8'), 0.18 + 0.05 * Math.sin(t * 9)));
  // la fan se para delante, lo celebra en «trailers» y en «spots» se sorprende
  const ll = tramo(t, 0, 1.6), fx = Math.round(lerp(-16, 128, ll));
  R.actor(EL.chicaHoy, fx, 160, t, { dir: 1, anda: ll > 0 && ll < 1, brazos: dentro(t, TR - 0.3, TR + 0.8) && parpa(t, 18), sonrisa: t < SP, sorpresa: t > SP, dedo: dentro(t, 1.7, TR - 0.3) });
  if (t > SP) globo(fx + 7, 130, tramo(t, SP, SP + 0.3), '?', hex('#3a5a9a'));
  // un señor con su perro pasa de derecha a izquierda
  const dx = Math.round(330 - (t * 26) % 380); R.actor(EL.vecino, dx, 160, t, { dir: -1, anda: true });
  { const px = dx - 16, py = 160, pa = Math.floor(t * 8) % 2; R.rect(px, py - 7, px + 9, py - 4, hex('#c8963a')); R.rect(px - 3, py - 10, px + 1, py - 6, hex('#c8963a')); R.pset(px - 3, py - 9, K); R.rect(px, py - 3, px, py - 1 + pa, hex('#a87428')); R.rect(px + 8, py - 3, px + 8, py - pa, hex('#a87428')); R.linea(px + 9, py - 7, px + 12, py - 10 + pa, hex('#c8963a')); R.linea(px + 2, py - 8, dx + 4, 144, hex('#c8303a')); }
  // una bici por la calle, por delante de todos
  const bx = Math.round(((t - 1.2) * 70) % 420) - 40; if (t > 1.2) { const by = 172; for (const w of [bx, bx + 16]) { R.anillo(w, by, 5, K); R.pset(w, by, K); } R.linea(bx, by, bx + 8, by - 6, hex('#2a7ab8')); R.linea(bx + 8, by - 6, bx + 16, by, hex('#2a7ab8')); R.linea(bx + 8, by - 6, bx + 6, by - 12, hex('#2a7ab8'));
    R.actor(EL.chicoHoy, bx, by - 6, t, { dir: 1, quieto: true }); }
};
// ── 2 · la azotea: Ant-Man y los tres Capitanes ──
const p2 = (t) => {
  const o = { encuadre: 'nyhoy' }, g = DO.mundo(R, t, o) || {}, su = g.suelo ?? 164;
  const AM = @spot@6.89@, WC = @spot@7.83@, TO = @spot@9.01@;
  const ll = tramo(t, A2, AM + 0.3), ax = Math.round(lerp(10, 104, ll)), encoge = tramo(t, TO - 0.1, TO + 0.25);
  // los tres Capitanes con su escudo redondo; en «Captain America» dan un paso a la vez con un «!»
  const paso = tramo(t, WC + 0.2, WC + 0.45) * (1 - tramo(t, TO + 0.3, TO + 0.7));
  [[EL.steve, 148], [EL.sam, 180], [EL.usAgentDD, 212]].forEach(([d, x], k) => {
    const xx = Math.round(x - paso * 6), dd = dentro(t, WC + 0.2, TO + 0.3);
    const a = R.actor(d, xx, su, t, { dir: -1, salto: dd ? Math.round(Math.abs(Math.sin((t - WC) * 7)) * 3) : 0, sostiene: true, sonrisa: dd, habla: (dentro(t, AM - 0.6, AM) && k === 1 && parpa(t, 8)) || (dd && parpa(t, 9)) });
    escudo(a.mano[0], a.mano[1] + 1, 5);
    if (dd) globo(xx + 7, su - 30, tramo(t, WC + 0.2, WC + 0.45), '!', hex('#e83a3a'));
  });
  // Ant-Man llega, duda ante los tres y se encoge
  if (encoge < 0.98) R.actor(EL.antman, ax, su, t, { dir: 1, anda: ll > 0 && ll < 1, dedo: dentro(t, AM, WC), salto: Math.round(encoge * 2) });
  else { mini(EL.antman, ax + 4, su, t, { dir: -1, triste: true }); for (let k = 0; k < 6; k++) { const a = t * 4 + k; R.pset(Math.round(ax + 8 + Math.cos(a) * 9), Math.round(su - 8 + Math.sin(a) * 5), k % 2 ? hex('#ff8a8a') : hex('#ffffff')); } }
  if (t > WC - 0.1 && t < TO + 0.3) globo(ax + 7, su - 30, tramo(t, WC - 0.1, WC + 0.2), '?', hex('#3a5a9a'));
  if (dentro(t, TO - 0.1, TO + 0.4)) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, f = (t - TO + 0.1) / 0.5; R.pset(Math.round(ax + 7 + Math.cos(a) * f * 10), Math.round(su - 12 + Math.sin(a) * f * 10), hex('#c8c8f0')); }
};
// ── 3 · el lago: Steve y Thor se reencuentran; Doom cruza la otra orilla ──
const p3 = (t) => {
  const o = { encuadre: 'lago' }, g = DO.lago(R, t, o) || {}, su = 168;
  const RE = @spot@11.09@, DM = @spot@12.83@, IN = @spot@14.45@;
  // Doom cruza la orilla de enfrente, una figurita verde con su halo
  const dm = (t - DM + 0.1) / (IN - DM + 0.5); if (dm > 0 && dm < 1) { const dx = Math.round(lerp(330, -30, dm)), dy = 150;
    for (let k = 1; k < 8; k++) for (let j = 0; j < 20; j += 3) R.pset(dx + 7 + k * 4, dy - 4 - j, mez(R.pget(dx + 7 + k * 4, dy - 4 - j), hex('#3ae88a'), 0.5 - k * 0.06));
    R.halo(dx + 7, dy - 12, 14, [hex('#0e3a24'), hex('#1a8a4a'), hex('#3ae88a')], 0.7); R.actor(EL.doom, dx, dy, t, { dir: -1, anda: true }); }
  const ll = tramo(t, A3, RE - 0.1), tx = Math.round(lerp(-18, 88, ll)), abr = dentro(t, RE - 0.05, RE + 0.9), mira = t > DM - 0.1;
  R.actor(EL.steve, 104, su, t, { dir: mira ? 1 : -1, brazos: abr, sonrisa: t > RE - 0.4 && !mira, sorpresa: mira && t < IN + 0.4, habla: dentro(t, RE + 1.0, DM - 0.2) && parpa(t, 7) });
  R.actor(EL.thor, tx, su, t, { dir: 1, anda: ll > 0 && ll < 1, brazos: abr, sostiene: t > RE + 0.9 && !mira ? [110, su - 18] : undefined, sonrisa: t > RE - 0.4, sorpresa: mira && t < IN + 0.4 });
  if (dentro(t, RE - 0.05, RE + 0.8)) corazon(100, Math.round(su - 40 - (t - RE) * 8), hex('#e83a5a'));
  if (mira) globo(112, su - 30, tramo(t, DM, DM + 0.3), '!', hex('#3ae88a'));
  DO.lagoDelante(R, t, o);
};
// ── 4 · la sala de montaje (fondo local) ──
const BUF4 = R.nuevo(); let ok4 = false;
const montaje = () => { R.recorte(null); const prev = R.usar(BUF4);
  // la pared de espuma acústica (cuñas en damero) y el techo oscuro tranquilo
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#1c1a24'));
  R.rect(0, 24, 319, 26, hex('#2a2632'));
  for (let y = 26; y < 120; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor(x / 10), cy = Math.floor((y - 26) / 10), u = (x % 10) / 10, v = ((y - 26) % 10) / 10, horiz = (cx + cy) % 2;
    const s = horiz ? Math.abs(v - 0.5) : Math.abs(u - 0.5); R.pset(x, y, s > 0.42 ? hex('#16141e') : s > 0.25 ? hex('#2a2636') : hex('#363044')); }
  // la ventana con la ciudad de noche (a la derecha, por debajo de Atom)
  caja(240, 50, 300, 108, hex('#141a3a'), hex('#4a4a54')); for (let k = 0; k < 14; k++) R.pset(242 + Math.floor(azar(k, 1) * 56), 52 + Math.floor(azar(k, 2) * 20), hex('#c8c8f0'));
  for (let x = 241; x < 300; x++) { const hh = 10 + Math.floor(azar(Math.floor(x / 7), 5) * 22); R.rect(x, 107 - hh, x, 107, hex('#0e1028')); if ((x % 7) === 3) for (let y = 110 - hh; y < 105; y += 4) if (azar(x, y) > 0.5) R.pset(x, y, hex('#e8c86a')); }
  R.rect(270, 51, 270, 107, hex('#4a4a54'));
  // la estantería con discos duros, latas de película y una planta (izquierda)
  caja(8, 40, 56, 128, hex('#3a3a44'), hex('#1a1a20')); for (const y of [62, 84, 106]) R.rect(9, y, 55, y + 1, hex('#5a5a64'));
  for (let k = 0; k < 6; k++) { caja(11 + k * 7, 48, 16 + k * 7, 61, hex(['#c8303a', '#2a5ab8', '#e8b848', '#5a8a48', '#a83a8a', '#3a9aa8'][k])); R.pset(13 + k * 7, 59, hex('#5ae88a')); }
  for (let k = 0; k < 3; k++) { R.disco(18 + k * 14, 78, 6, K); R.disco(18 + k * 14, 78, 5, hex('#8a8a94')); R.disco(18 + k * 14, 78, 2, hex('#c8c8d0')); }
  R.rect(14, 92, 30, 105, hex('#b85a3a')); for (const [x, hh] of [[16, 12], [21, 18], [26, 10]]) R.poligono([[x, 92], [x + 2, 92 - hh], [x + 4, 92]], hex('#4a8a3a'));
  caja(36, 90, 52, 105, hex('#e8e0d0')); for (let y = 92; y < 104; y += 3) R.rect(38, y, 50, y, hex('#a8a090'));
  // la mesa larga de montaje y el suelo de moqueta
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + y * 3) % 7 === 0 ? hex('#3a3444') : hex('#2e2a38'));
  R.rect(0, 120, 319, 121, hex('#14121a'));
  R.usar(prev); ok4 = true; };
const p4 = (t) => {
  if (!ok4) montaje(); R.copiar(BUF4);
  const N18 = @equipos@17.70@, S26 = @equipos@18.82@, FT = @equipos@20.92@;
  // la mesa, los dos monitores grandes y el de vista previa
  caja(60, 128, 300, 136, hex('#4a4a54'), hex('#1a1a20')); R.rect(70, 136, 74, 176, hex('#2a2a30')); R.rect(286, 136, 290, 176, hex('#2a2a30'));
  for (const [x0, y0, x1, y1] of [[64, 82, 132, 124], [140, 76, 232, 124]]) { caja(x0, y0, x1, y1, hex('#0a0a12'), hex('#2a2a30')); R.rect(Math.round((x0 + x1) / 2) - 3, y1 + 1, Math.round((x0 + x1) / 2) + 3, 127, hex('#2a2a30')); }
  // monitor izquierdo: la vista previa del anuncio (cielo de atardecer, siluetas que corren)
  for (let y = 84; y <= 122; y++) R.rect(66, y, 130, y, mez(hex('#f0a060'), hex('#5a2a5a'), (y - 84) / 38));
  for (let i = 0; i < 5; i++) { const hx = 72 + i * 11 + Math.round(Math.sin(t * 5 + i) * 1), hy = 120 - (Math.floor(t * 8 + i) % 2); R.rect(hx, hy - 6, hx + 3, hy, hex('#141018')); R.rect(hx, hy - 9, hx + 3, hy - 8, hex('#141018')); }
  // monitor grande: la línea de tiempo con sus pistas; la cabeza que corre y el «26»
  R.rect(142, 78, 230, 122, hex('#1a1a26'));
  for (let p = 0; p < 4; p++) for (let k = 0; k < 6; k++) { const x0 = 146 + k * 14 + (p % 2) * 4, w = 10 + (k + p) % 3 * 2, c = [hex('#3a6ac8'), hex('#c8963a'), hex('#5aa86a'), hex('#a85ac8')][p]; R.rect(x0, 96 + p * 6, Math.min(228, x0 + w), 99 + p * 6, c); }
  const cab = 146 + Math.round(80 * tramo(t, S26 - 0.2, FT - 0.2)); R.rect(cab, 92, cab, 120, hex('#e83a3a')); R.poligono([[cab - 2, 90], [cab + 2, 90], [cab, 93]], hex('#e83a3a'));
  if (t > S26 - 0.1) R.numero('26', 150, 89, { color: hex('#f6d860') });
  if (t > FT - 0.1) for (let k = 0; k < 5; k++) { const ap = tramo(t, FT + k * 0.12, FT + 0.2 + k * 0.12); if (ap > 0) caja(186 + k * 8, 81, 192 + k * 8, 87 - Math.round((1 - ap) * 3), [hex('#c8303a'), hex('#e8b848'), hex('#a83ae8'), hex('#2a5ab8'), hex('#f2eee2')][k]); }
  // el calendario de mesa: la hoja del 17 se levanta y queda el 18
  caja(244, 112, 270, 128, hex('#f2eee2')); R.rect(245, 113, 269, 116, hex('#c8303a')); R.numero('11', 251, 116, { color: hex('#ffffff'), sombra: false });
  const vu = tramo(t, N18 - 0.15, N18 + 0.25); R.numero(vu < 0.5 ? '17' : '18', 251, 126, { color: hex('#2a2430'), sombra: false });
  if (vu > 0 && vu < 1) { const yy = Math.round(118 - vu * 20), xx = Math.round(246 + vu * 10); R.poligono([[xx, yy], [xx + 22, yy - 3], [xx + 24, yy + 8], [xx + 2, yy + 10]], hex('#e8e2d4')); }
  // la taza que humea, el teclado y las lucecitas
  R.rect(84, 124, 128, 127, hex('#2a2a30')); for (let x = 86; x < 127; x += 3) R.pset(x, 125, parpa(t + x, 2) ? hex('#5ae8ff') : hex('#3a3a44'));
  R.rect(276, 118, 282, 127, K); R.rect(277, 119, 281, 126, hex('#e8e0d0')); for (let k = 0; k < 3; k++) { const f = (t * 0.8 + k / 3) % 1; R.pset(Math.round(279 + Math.sin(t * 3 + k * 2)), Math.round(116 - f * 8), f > 0.6 ? hex('#6a6a74') : hex('#a8a8b0')); }
  // el resplandor de los monitores en las caras
  for (let y = 110; y < 128; y++) for (let x = 110; x < 232; x++) if ((x + y) % 4 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#5a7ac8'), 0.12));
  // la silla de ruedas que gira un poco, los cables, la papelera y la alfombra
  for (let y = 150; y < 176; y++) for (let x = 120; x < 250; x++) { const d = Math.pow((x - 185) / 65, 2) + Math.pow((y - 163) / 13, 2); if (d < 1) R.pset(x, y, d > 0.85 ? hex('#5a3a4a') : ((x + y) % 5 ? hex('#4a2e3c') : hex('#6a4a5a'))); }
  for (let k = 0; k < 3; k++) { let x = 74, y = 140 + k * 2; for (let i = 0; i < 16; i++) { const nx = x - 4, ny = y + 2 + Math.round(Math.sin(i + k) * 1); R.linea(x, y, nx, ny, hex('#141418')); x = nx; y = ny; } }
  caja(26, 150, 40, 170, hex('#4a4a54')); for (const [x, y] of [[29, 148], [35, 147], [31, 146]]) { R.disco(x, y, 2, hex('#f2eee2')); R.pset(x, y, hex('#c8c4bc')); }
  { const ch = Math.round(Math.sin(t * 0.8) * 2); R.rect(150 + ch, 140, 170 + ch, 154, K); R.rect(151 + ch, 141, 169 + ch, 153, hex('#2a2a36')); R.rect(154 + ch, 156, 166 + ch, 158, hex('#1a1a20')); R.rect(159 + ch, 154, 161 + ch, 168, hex('#4a4a54')); for (const dx of [-8, 0, 8]) R.disco(160 + ch + dx, 170, 1, K); }
  // el editor y la directora, delante: él señala la línea de tiempo; ella llega y lo celebra
  R.actor(EL.editor, 126, 172, t, { dir: 1, habla: dentro(t, S26, S26 + 1.0) && parpa(t, 8), sonrisa: t > FT, dedo: dentro(t, S26 - 0.3, S26 + 0.6) || dentro(t, FT, FT + 1.2) });
  const dl = tramo(t, A4, A4 + 1.5); R.actor(EL.director, Math.round(lerp(330, 222, dl)), 172, t, { dir: -1, anda: dl > 0 && dl < 1, dedo: dentro(t, N18 - 0.2, N18 + 0.8), sorpresa: dentro(t, FT, FT + 0.6), brazos: t > FT + 0.8 && t < FT + 1.6, sonrisa: t > FT + 0.6 });
};
// ── 5 · la sala de los Vengadores: el holograma de los cinco equipos ──
const EQUIPOS = [[EL.thor, @equipos@23.16@, 104], [EL.yelena, @equipos@24.18@, 122], [EL.shuri, @equipos@24.92@, 196], [EL.johnny, @equipos@25.96@, 216], [EL.ciclope, @equipos@27.66@, 236]];
const p5 = (t) => {
  let k = -1; for (let i = 0; i < 5; i++) if (t >= EQUIPOS[i][1]) k = i;
  const holo = k < 0 ? null : (k + Math.min(0.99, (t - EQUIPOS[k][1]) / 1.2)) / 5;
  const o = { encuadre: 'reunion', holo }; const g = T.sala(R, t, o), fo = g.fondo ?? 126;
  EQUIPOS.forEach(([d, T0, x], i) => { const ll = tramo(t, T0 - 0.6, T0 + 0.3); if (ll <= 0) return; const xx = Math.round(lerp(330, x, ll));
    R.actor(d, xx, fo, t, { dir: ll < 1 ? -1 : (xx < 160 ? 1 : -1), anda: ll > 0 && ll < 1, sonrisa: ll >= 1 && i === k, brazos: ll >= 1 && i === k && t < T0 + 0.9 }); });
  R.actor(EL.steve, 40, 160, t, { dir: 1, dedo: k >= 0 && t < EQUIPOS[Math.max(0, k)][1] + 0.7, habla: parpa(t, 7) && t > A5 + 0.3 && t < @equipos@28.2@ });
  T.salaDelante(R, t, o);
};
// ── 6 · el salón con la tele: la invitación; la hoja de noviembre vuela; la familia salta ──
const p6 = (t) => {
  const IV = @equipos@29.93@, OM = @equipos@31.27@, RT = @equipos@32.31@, vuela = tramo(t, OM - 0.1, OM + 0.6);
  const imagen = (R, t, [x0, y0, x1, y1]) => { for (let y = y0; y <= y1; y++) R.rect(x0, y, x1, y, mez(hex('#1a2a4a'), hex('#5a2a3a'), (y - y0) / (y1 - y0)));
    for (let k = 0; k < 5; k++) { const ap = tramo(t, A6 + k * 0.15, A6 + 0.3 + k * 0.15), cx = x0 + 16 + k * 22, cy = y0 + 46; if (ap <= 0) continue; R.disco(cx, cy, 8, hex('#0e1a2a')); R.disco(cx, cy, 7, [hex('#c8303a'), hex('#e8b848'), hex('#a83ae8'), hex('#2a5ab8'), hex('#f2eee2')][k]); R.disco(cx, cy, 3, hex('#0e1a2a')); }
    if (t > IV) { const m = tramo(t, IV, IV + 0.5); R.halo(x0 + 60, y0 + 20, Math.round(10 * m), [hex('#0e3a24'), hex('#1a8a4a'), hex('#3ae88a')], 0.9); R.icono('mascara', x0 + 53, y0 + 12, hex('#c8f8d8'), hex('#0e3a24'), 2); }
    if (t > OM) R.numero('1', x0 + 98, y0 + 30, { tam: 16 }); };
  const o = { encuadre: 'estudio', camara: 'tele', mes: vuela < 0.5 ? 11 : 12, inicio: vuela < 0.5 ? 0 : 2, diasMes: vuela < 0.5 ? 30 : 31, tachados: vuela < 0.5 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] : [], imagen };
  T.estudio(R, t, o);
  // la hoja de noviembre sale volando; el 18 de diciembre queda rodeado
  if (vuela > 0 && vuela < 1) { const xx = Math.round(34 + vuela * 70), yy = Math.round(32 - Math.sin(vuela * Math.PI) * 24 + vuela * 30), w = Math.round(64 * (1 - vuela * 0.5));
    R.poligono([[xx, yy], [xx + w, yy + 4], [xx + w - 6, yy + w], [xx - 4, yy + w - 6]], K); R.poligono([[xx + 1, yy + 1], [xx + w - 1, yy + 5], [xx + w - 7, yy + w - 1], [xx - 3, yy + w - 7]], hex('#e8e2d4')); }
  if (vuela >= 1) { const u = tramo(t, OM + 0.6, OM + 1.0), n = Math.floor(u * 30); for (let i = 0; i < n; i++) { const a = -2 + i / 30 * Math.PI * 2.1; R.pset(Math.round(85 + Math.cos(a) * 7), Math.round(75 + Math.sin(a) * 5), hex('#e8202a')); R.pset(Math.round(86 + Math.cos(a) * 7), Math.round(75 + Math.sin(a) * 5), hex('#e8202a')); } }
  // la familia delante del sofá: miran la tele, se vuelven al calendario, y saltan juntos en «together»
  const salta = t > RT && t < RT + 1.8, s = salta ? Math.round(Math.abs(Math.sin((t - RT) * 8)) * 5) : 0, miraCal = dentro(t, OM, RT);
  [[EL.padreDD, 30], [EL.ninoNavidad || EL.chico, 52], [EL.chicaHoy, 74], [EL.madreDD, 96]].forEach(([d, x], i) => R.actor(d, x, 160, t, { dir: miraCal ? -1 : 1, brazos: salta, salto: salta ? s : 0, sonrisa: salta || t > RT, sorpresa: dentro(t, IV, IV + 0.8), habla: dentro(t, A6 + 0.3, IV) && i === 0 && parpa(t, 7) }));
  T.estudioDelante(R, t, o);
};
// ── 7 · una calle de Tokio de noche (fondo local): Doom en la pantalla gigante ──
const BUF7 = R.nuevo(); let ok7 = false;
const tokio = () => { R.recorte(null); const prev = R.usar(BUF7);
  for (let y = 0; y < 180; y++) R.rect(0, y, 319, y, mez(hex('#0e0c22'), hex('#2a1a3a'), Math.min(1, y / 110)));
  for (let k = 0; k < 30; k++) R.pset(Math.floor(azar(k, 3) * 320), 22 + Math.floor(azar(k, 4) * 20), hex('#8a8ab0'));
  // los edificios: fachadas con ventanas y letreros verticales de colores (sin letras: bloques y rayas)
  const edif = [[0, 30, 64, '#2a2a3a'], [64, 22, 100, '#24243a'], [222, 26, 270, '#2a2438'], [270, 48, 320, '#24203a']];
  for (const [x0, y0, x1, c] of edif) { R.rect(x0, y0, x1 - 1, 150, hex(c)); for (let y = y0 + 4; y < 146; y += 7) for (let x = x0 + 3; x < x1 - 4; x += 6) R.rect(x, y, x + 2, y + 3, azar(x, y) > 0.45 ? hex('#e8c86a') : hex('#1a1a28')); }
  const letrero = (x, y0, n, c1, c2) => { caja(x, y0, x + 9, y0 + n * 9, hex(c1), hex('#141018')); for (let i = 0; i < n; i++) { const f = i % 3; if (f === 0) R.disco(x + 5, y0 + 5 + i * 9, 2, hex(c2)); else if (f === 1) { R.pset(x + 3, y0 + 4 + i * 9, hex(c2)); R.pset(x + 6, y0 + 6 + i * 9, hex(c2)); R.pset(x + 4, y0 + 7 + i * 9, hex(c2)); } else R.poligono([[x + 2, y0 + 7 + i * 9], [x + 5, y0 + 2 + i * 9], [x + 8, y0 + 7 + i * 9]], hex(c2)); } };
  letrero(8, 46, 9, '#c8303a', '#f6e8a0'); letrero(46, 40, 10, '#2a8aa8', '#f2eee2'); letrero(70, 50, 8, '#e8b848', '#c8303a'); letrero(226, 46, 8, '#5aa86a', '#f2eee2'); letrero(256, 64, 7, '#a83a8a', '#f6e8a0');
  // el edificio de la pantalla gigante, en el centro
  R.rect(100, 22, 222, 150, hex('#1e1c30')); caja(104, 28, 218, 96, hex('#06060c'), hex('#4a4a54'));
  for (let y = 100; y < 148; y += 6) for (let x = 104; x < 218; x += 8) R.rect(x, y, x + 4, y + 3, azar(x, y) > 0.5 ? hex('#f6e8a0') : hex('#2a2a3a'));
  // el puente del tren elevado
  R.rect(0, 112, 319, 118, hex('#4a4a5a')); R.rect(0, 112, 319, 112, hex('#8a8a9a')); for (let x = 10; x < 320; x += 50) R.rect(x, 118, x + 6, 150, hex('#3a3a4a'));
  // la acera y la calle con pasos de cebra
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 162 ? ((x % 20 === 0 || y === 150) ? hex('#5a5a68') : hex('#6a6a78')) : hex('#2a2a34'));
  for (let x = 120; x < 220; x += 10) R.rect(x, 166, x + 5, 179, hex('#d8d8e0'));
  // los farolillos rojos colgados de un cable
  for (let x = 4; x < 100; x++) R.pset(x, 104 + Math.round(Math.sin((x - 4) / 96 * Math.PI) * 4), hex('#141018'));
  // la máquina expendedora
  caja(278, 120, 300, 150, hex('#e8e0d0'), hex('#4a4a54')); R.rect(281, 123, 297, 134, hex('#8ac8e8')); for (let k = 0; k < 6; k++) R.rect(282 + (k % 3) * 5, 124 + Math.floor(k / 3) * 5, 284 + (k % 3) * 5, 127 + Math.floor(k / 3) * 5, hex(['#c8303a', '#e8b848', '#5aa86a'][k % 3]));
  R.usar(prev); ok7 = true; };
const p7 = (t) => {
  if (!ok7) tokio(); R.copiar(BUF7);
  const DM = @japon@37.41@, SP = @japon@37.55@, JP = @japon@38.07@;
  // la pantalla: un sol rojo, la máscara de Doom y las ondas de su voz
  R.recorte([105, 29, 217, 95]);
  for (let y = 29; y <= 95; y++) for (let x = 105; x <= 217; x++) R.pset(x, y, mez(hex('#2a1a4a'), hex('#e88aa8'), (y - 29) / 66));
  R.poligono([[105, 95], [140, 70], [150, 66], [172, 66], [182, 70], [217, 95]], hex('#4a4a7a')); R.poligono([[140, 70], [150, 66], [172, 66], [182, 70], [170, 74], [161, 71], [152, 74]], hex('#f2eee2'));
  for (let k = 0; k < 14; k++) { const px = 105 + ((azar(k, 1) * 112 + t * 8) % 112), py = 29 + ((azar(k, 2) * 66 + t * (10 + k)) % 66); R.pset(Math.round(px), Math.round(py), hex('#ffc8d8')); R.pset(Math.round(px) + 1, Math.round(py), hex('#f08aa8')); }
  const ap = tramo(t, A7 + 0.2, DM); R.halo(161, 54, Math.round(16 + ap * 8), [hex('#0e3a24'), hex('#1a8a4a'), hex('#3ae88a')], 0.7 * ap);
  if (ap > 0.2) DO.e_mascara(R, 161, 56, 3, { ojos: t > DM ? 1 : 0.2, capucha: true, brillo: (t * 0.4) % 1 });
  if (t > SP) for (let k = 0; k < 3; k++) { const r = 18 + ((t - SP) * 22 + k * 8) % 26; for (let a = -0.6; a <= 0.6; a += 0.08) { R.pset(Math.round(161 + 14 + Math.cos(a) * r), Math.round(56 + Math.sin(a) * r), hex('#3ae88a')); R.pset(Math.round(161 - 14 - Math.cos(a) * r), Math.round(56 + Math.sin(a) * r), hex('#3ae88a')); } }
  for (let y = 29; y <= 95; y += 2) for (let x = 105; x <= 217; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.12));
  R.recorte(null);
  // el resplandor de la pantalla en la calle
  for (let y = 150; y < 180; y++) for (let x = 90; x < 232; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#e86a5a'), 0.12));
  // los farolillos que se mecen
  for (let k = 0; k < 6; k++) { const x = 12 + k * 16, y = 106 + Math.round(Math.sin((x - 4) / 96 * Math.PI) * 4) + Math.round(Math.sin(t * 2 + k) * 1); R.disco(x, y + 4, 4, K); R.disco(x, y + 4, 3, hex('#e83a3a')); R.rect(x - 2, y + 4, x + 2, y + 4, hex('#f6a07a')); R.pset(x, y, K); }
  // los letreros que parpadean
  if (parpa(t, 3)) { R.rect(47, 42, 54, 43, hex('#f2eee2')); R.rect(227, 48, 234, 49, hex('#ffffff')); }
  // el tren que cruza el puente
  const tx = Math.round(360 - ((t - A7) * 90) % 700); for (let c = 0; c < 4; c++) { const x0 = tx + c * 44; caja(x0, 98, x0 + 42, 112, hex('#e8e8f0'), hex('#4a4a54')); R.rect(x0 + 1, 104, x0 + 41, 105, hex('#5aa86a')); for (let w = 0; w < 5; w++) R.rect(x0 + 3 + w * 8, 100, x0 + 7 + w * 8, 103, hex('#f6e8a0')); }
  // la gente se para, mira y señala
  const gente = [[EL.japonesa, 108, 1], [EL.japones, 132, 1], [EL.ninoJapones, 156, -1], [EL.vendedorTokio, 196, -1], [EL.chicaHoy, 240, -1]];
  gente.forEach(([d, x, dr], i) => { const TP = DM - 0.4 + i * 0.1, para = t > TP; R.actor(d, x - Math.round(Math.max(0, TP - t) * 6 * dr), 162, t, { dir: para ? (x < 161 ? 1 : -1) : dr, anda: !para, sorpresa: dentro(t, DM, JP), dedo: para && i % 2 === 0 && t > JP, sonrisa: t > JP + 0.4 }); });
  T.gato(R, 290, 162, t, { dir: -1 });
};
// ── 8 · la sala envolvente: los Russo presentan el formato ──
const p8 = (t) => {
  const WR = @japon@41.07@, RU = @japon@43.13@, FO = @japon@44.35@;
  const o = { encuadre: 'reunion', camara: 'pantalla', planos: tramo(t, WR - 0.1, WR + 0.9) }; T.sala(R, t, o);
  const ll = tramo(t, A8 + 0.2, RU - 0.2);
  R.actor(EL.russoJoeDD, Math.round(lerp(96, 122, ll)), 165, t, { dir: 1, anda: ll > 0 && ll < 1, brazos: dentro(t, FO - 0.3, FO + 0.8), habla: dentro(t, RU, FO - 0.3) && parpa(t, 8), sonrisa: t > FO + 0.8 });
  R.actor(EL.russoAnthonyDD, Math.round(lerp(226, 190, ll)), 165, t, { dir: -1, anda: ll > 0 && ll < 1, dedo: dentro(t, WR + 0.3, RU) || dentro(t, FO + 0.5, A9), sonrisa: t > RU });
  T.salaDelante(R, t, o);
};
// ── 9 · la mesa de un café (inserto, fondo local): la noticia en el móvil ──
const BUF9 = R.nuevo(); let ok9 = false;
const mesaCafe = () => { R.recorte(null); const prev = R.usar(BUF9);
  // el tablero de madera clara con vetas y nudos, de lado a lado
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 30), v = Math.sin(x * 0.05 + Math.sin(y * 0.3 + tb * 2) * 2 + tb); R.pset(x, y, y % 30 === 0 ? hex('#7a5434') : v > 0.8 ? hex('#b8865a') : v < -0.7 ? hex('#c89a6a') : hex('#d0a676')); }
  for (const [x, y] of [[60, 50], [230, 140], [280, 74]]) { R.anillo(x, y, 4, hex('#9a6a44')); R.anillo(x, y, 2, hex('#9a6a44')); }
  // el periódico doblado, sin letras: renglones grises y una foto
  R.poligono([[18, 60], [120, 52], [130, 140], [26, 150]], hex('#7a7468')); R.poligono([[16, 56], [118, 48], [128, 136], [24, 146]], hex('#ece6d6'));
  R.rect(30, 62, 70, 82, hex('#8a8a94')); for (let k = 0; k < 12; k++) R.linea(30, 90 + k * 4, 112, 84 + k * 4, hex('#a8a294'));
  for (let k = 0; k < 4; k++) R.linea(76, 64 + k * 4, 112, 61 + k * 4, hex('#a8a294')); R.rect(30, 56, 110, 58, hex('#3a3a44'));
  // el plato con el cruasán y el sobre de azúcar
  R.disco(250, 50, 24, hex('#8a8478')); R.disco(250, 48, 23, hex('#f6f2ea')); R.disco(250, 48, 18, hex('#ece6da'));
  R.poligono([[232, 52], [240, 38], [252, 34], [264, 40], [270, 54], [258, 48], [250, 46], [242, 50]], hex('#c87a2a')); for (let k = 0; k < 4; k++) R.linea(242 + k * 7, 38 + (k % 2) * 2, 238 + k * 8, 50, hex('#e8a848'));
  R.rect(204, 92, 216, 100, hex('#f2eee2')); R.rect(204, 92, 216, 93, hex('#c8303a'));
  R.usar(prev); ok9 = true; };
const p9 = (t) => {
  if (!ok9) mesaCafe(); R.copiar(BUF9);
  const NS = @japon@46.77@, RE = @japon@48.09@;
  // la taza con su platito, la espuma con un corazón y el vapor
  const CX = 254, CY = 122; R.disco(CX, CY + 3, 20, hex('#8a8478')); R.disco(CX, CY + 1, 19, hex('#f6f2ea')); R.disco(CX, CY, 13, K); R.disco(CX, CY, 12, hex('#f2eee2')); R.disco(CX, CY, 10, hex('#8a5a34')); R.disco(CX, CY, 7, hex('#d8b088')); corazon(CX - 3, CY - 3, hex('#f2e6d0'));
  R.rect(CX + 13, CY - 5, CX + 19, CY + 3, K); R.rect(CX + 14, CY - 4, CX + 18, CY + 2, hex('#f2eee2')); R.rect(CX + 15, CY - 3, CX + 17, CY + 1, hex('#8a8478'));
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1; R.disco(Math.round(CX - 4 + k * 3 + Math.sin(t * 2 + k) * 3), Math.round(CY - 16 - f * 26), f > 0.6 ? 1 : 2, mez(hex('#f6f2ea'), hex('#d0a676'), f)); }
  // el móvil en la mano: la noticia con su foto; en «new shots» salen tres miniaturas con «!»
  const yb = Math.round(Math.sin(t * 1.4) * 1);
  caja(132, 60 + yb, 176, 138 + yb, hex('#141018'), hex('#2a2a30')); R.rect(135, 64 + yb, 173, 134 + yb, hex('#f6f6f2'));
  const sc = Math.round(tramo(t, A9 + 0.4, NS - 0.4) * 10);
  R.recorte([135, 64 + yb, 173, 134 + yb]);
  R.rect(135, 64 + yb, 173, 70 + yb, hex('#c8303a')); R.disco(141, 67 + yb, 2, hex('#f2eee2'));
  const y0 = 74 + yb - sc; for (let y = y0; y < y0 + 24; y++) R.rect(137, y, 171, y, mez(hex('#f0a060'), hex('#5a2a5a'), (y - y0) / 24));
  R.rect(150, y0 + 12, 153, y0 + 22, hex('#1e3680')); R.rect(150, y0 + 9, 153, y0 + 11, hex('#e0b860')); R.rect(144, y0 + 14, 147, y0 + 22, t > RE ? hex('#3a6ac8') : hex('#2a2a46')); R.rect(144, y0 + 11, 147, y0 + 13, hex('#4a3020'));
  for (let k = 0; k < 5; k++) R.rect(137, y0 + 28 + k * 4, 137 + 30 - (k % 3) * 6, y0 + 29 + k * 4, hex('#a8a8b0'));
  for (let k = 0; k < 3; k++) { const ap = tramo(t, NS + k * 0.15, NS + 0.25 + k * 0.15); if (ap <= 0) continue; const tx = 137 + k * 12, ty = y0 + 50; R.rect(tx, ty, tx + 10, ty + 8, [hex('#5a3a7a'), hex('#2a5ab8'), hex('#3ae88a')][k]); R.rect(tx + 4, ty + 3, tx + 6, ty + 7, hex('#141018')); if (ap > 0.6) { R.disco(tx + 9, ty, 3, hex('#e8b848')); R.pset(tx + 9, ty - 1, K); R.pset(tx + 9, ty + 1, K); } }
  R.recorte(null);
  R.disco(154, 136 + yb, 1, hex('#4a4a54'));
  T.brazo(R, 222, 179, 176, 134 + yb, '#3a5a7a', -1, { codo: [204, 166] });
};
// ── 10 · el hangar al anochecer (fondo local): Steve habla a los Vengadores; Reed detrás ──
const BUF10 = R.nuevo(); let ok10 = false;
const hangar = () => { R.recorte(null); const prev = R.usar(BUF10);
  // el techo de cerchas (tranquilo bajo la barra del año) y la pared de chapa
  for (let y = 0; y < 30; y++) R.rect(0, y, 319, y, hex('#1e2028'));
  for (let x = 0; x < 320; x += 40) { R.linea(x, 30, x + 20, 22, hex('#4a4e5a')); R.linea(x + 20, 22, x + 40, 30, hex('#4a4e5a')); } R.rect(0, 29, 319, 31, hex('#5a5e6a'));
  for (let y = 31; y < 130; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 8 === 0 ? hex('#2e323c') : x % 8 === 1 ? hex('#4a4e5a') : hex('#3a3e48'));
  // el portón abierto con el anochecer y la pista con sus luces
  R.rect(110, 40, 250, 130, hex('#14141c'));
  for (let y = 42; y < 104; y++) R.rect(112, y, 248, y, mez(hex('#2a2a5a'), hex('#e88a5a'), (y - 42) / 62));
  R.disco(212, 98, 7, hex('#fbd88a'));
  for (let x = 112; x < 249; x++) { const hh = 4 + Math.floor(azar(Math.floor(x / 9), 7) * 8); R.rect(x, 104 - hh, x, 104, hex('#2a2a3a')); }
  R.rect(112, 104, 248, 128, hex('#3a3a44')); for (let k = 0; k < 8; k++) R.rect(120 + k * 16, 115 + (k % 2), 123 + k * 16, 116 + (k % 2), hex('#5a5a64'));
  R.rect(108, 38, 112, 130, hex('#6a6e7a')); R.rect(248, 38, 252, 130, hex('#6a6e7a')); R.rect(108, 36, 252, 39, hex('#6a6e7a'));
  // la nariz del avión a la izquierda, gris con su cabina
  R.poligono([[0, 70], [70, 74], [100, 92], [96, 104], [60, 112], [0, 114]], hex('#8a8e9a')); R.poligono([[0, 104], [96, 104], [60, 112], [0, 114]], hex('#5a5e6a'));
  R.poligono([[46, 76], [74, 78], [90, 90], [52, 90]], hex('#2a3a5a')); R.linea(50, 80, 74, 82, hex('#8ab8e8')); R.rect(10, 114, 14, 130, hex('#3a3a44')); R.disco(12, 132, 4, K);
  // cajas de material a la derecha y el suelo de hormigón con líneas amarillas
  for (const [x0, y0, x1, y1] of [[262, 104, 300, 130], [270, 84, 296, 104], [300, 112, 319, 130]]) { caja(x0, y0, x1, y1, hex('#6a5a3a'), hex('#3a2e1a')); R.linea(x0 + 2, y0 + 2, x1 - 2, y1 - 2, hex('#5a4a2e')); R.linea(x1 - 2, y0 + 2, x0 + 2, y1 - 2, hex('#5a4a2e')); }
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, azar(x >> 1, y >> 1) > 0.94 ? hex('#4a4a52') : hex('#5a5a62'));
  for (let x = 0; x < 320; x += 1) { if ((x >> 3) % 2) R.pset(x, 142, hex('#e8b848')); } R.rect(0, 130, 319, 130, hex('#2a2a30'));
  for (let x = 0; x < 320; x += 64) R.rect(x, 131, x, 179, hex('#4a4a52')); for (let y = 152; y < 180; y += 14) R.rect(0, y, 319, y, hex('#4a4a52'));
  for (const [x, y, rx] of [[40, 160, 10], [252, 172, 14], [120, 176, 8]]) for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) if (i * i / (rx * rx) + j * j / 9 < 1) R.pset(x + i, y + j, hex('#3e3e46'));
  // el carro de herramientas rojo y el rollo de cable
  caja(282, 136, 312, 166, hex('#c8303a'), hex('#5a1418')); for (const y of [144, 152, 160]) { R.rect(284, y, 310, y, hex('#8a1e28')); R.rect(294, y - 4, 300, y - 3, hex('#c8c8d0')); } for (const x of [286, 308]) R.disco(x, 168, 2, K);
  R.disco(196, 168, 7, hex('#2a2a30')); R.disco(196, 168, 5, hex('#e8b848')); R.disco(196, 168, 2, hex('#2a2a30')); R.linea(203, 168, 236, 174, hex('#2a2a30'));
  R.usar(prev); ok10 = true; };
const p10 = (t) => {
  if (!ok10) hangar(); R.copiar(BUF10);
  const AD = @japon@51.49@, AV = @japon@52.27@;
  // las luces de trabajo que cuelgan y se mecen
  for (const x of [60, 160, 270]) { const sw = Math.round(Math.sin(t * 1.2 + x) * 2); R.linea(x, 31, x + sw, 46, hex('#2a2a30')); R.rect(x + sw - 4, 46, x + sw + 4, 49, hex('#4a4a54')); R.rect(x + sw - 3, 50, x + sw + 3, 50, hex('#fff0b0')); }
  // las luces de la pista que parpadean y un avión lejos
  for (let k = 0; k < 8; k++) if (Math.sin(t * 3 - k) > 0.3) R.pset(120 + k * 16, 115 + (k % 2), hex('#ff5a4a'));
  { const ax = Math.round(120 + ((t * 8) % 140)); R.pset(ax, 60, hex('#ffffff')); R.pset(ax - 1, 60, hex('#c8c8d0')); }
  // la caja donde se sube Steve
  caja(150, 150, 176, 162, hex('#6a5a3a'), hex('#3a2e1a'));
  // Reed detrás de Steve (más al fondo), los brazos cruzados; Steve en la caja, habla y señala
  R.actor(EL.reed, 170, 146, t, { dir: -1, sonrisa: t > AV, habla: false });
  R.actor(EL.steve, 155, 150, t, { dir: -1, habla: parpa(t, 8) && t < AV, dedo: dentro(t, AD - 0.4, AV), brazos: t > AV });
  // los Vengadores escuchan, de espaldas o de lado; en «Avengers» levantan los brazos
  [[EL.thor, 30, 1], [EL.sam, 56, 1], [EL.shuri, 82, 1], [EL.yelena, 108, 1], [EL.bucky, 210, -1], [EL.shangchi, 236, -1]].forEach(([d, x, dr], i) => R.actor(d, x, 170, t, { dir: dr, brazos: t > AV + i * 0.05, sonrisa: t > AV, habla: dentro(t, A10 + 0.5 + i * 0.3, A10 + 0.8 + i * 0.3) }));
};
const efectos = [[@spot@2.64@, 'palmada'], [@spot@3.2@, 'timbre'], [@spot@4.16@, 'bip'],
  [@spot@7.83@, 'pop'], [@spot@8.15@, 'boing'], [@spot@9.01@, 'whoosh'],
  [@spot@11.09@, 'golpecito'], [@spot@12.83@, 'whoosh'],
  [@equipos@17.70@, 'papel'], [@equipos@20.92@, 'bip'],
  [@equipos@23.16@, 'brillo'], [@equipos@24.92@, 'bip'], [@equipos@27.66@, 'brillo'],
  [@equipos@29.93@, 'brillo'], [@equipos@31.27@, 'papel'], [@equipos@32.31@, 'palmada'],
  [@japon@37.41@, 'boom'], [@japon@38.6@, 'publico'],
  [@japon@41.07@, 'whoosh'], [@japon@44.35@, 'publico'],
  [@japon@46.77@, 'pop'],
  [@japon@52.27@, 'publico']];
T.rodar(E, R, [[0, p1], [A2, p2], [A3, p3], [A4, p4], [A5, p5], [A6, p6], [A7, p7], [A8, p8], [A9, p9], [A10, p10]], { efectos, año: 2026 });
""")

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dd-etiqueta'] = ('Una etiqueta nueva', """// DD-ETIQUETA (frases 25–26), 2026. Nueve planos, cortados en la palabra:
// 1. el archivo de la oficina de calificación (fondo local): el cartero deja un sobre con el «13» en la bandeja
//    («arrived»); la archivera abre un cajón y en «1968» saca la carpeta vieja con su «1968» (corta en «it's given»);
// 2. la sala de proyección pequeña: el panel de padres mira la película; en «assign» suben las tarjetas; en «G» todas
//    verdes; en «NC-17» todas moradas (corta en «adults only»);
// 3. el cine de lado: un chico entra solo por el pasillo; el acomodador levanta la tarjeta roja con «!» en «R»; en
//    «grown-up» llega su padre, le da la mano y suben (corta en «and underneath»);
// 4. la mesa de las fichas de cerca: la mano escribe los renglones del porqué; en «Doomsday is PG-13» el sello baja
//    tres veces y solo al tercero deja el «13» rojo (el gag del sello) (corta en «the letter with»);
// 5. la estantería de las cinco películas: en «strong warning» sale el aviso; un niño alarga la mano y su madre le dice
//    que no; en «every Avengers film» las cinco cajas reciben su pegatina naranja del «13» (corta en el silencio);
// 6. la rueda de prensa: el portavoz en el atril; en «new» una estrella; en el caballete, la ficha recibe el puño
//    («violence»), la gota («bloody») y el bocadillo con símbolos («language»); flashes (corta en «The four»);
// 7. el pasillo de los diplomas (fondo local): cuatro marcos con 2012, 2015, 2018 y 2019 y su cohete se encienden en
//    «four before»; el quinto, 2026: en «drop sci-fi» el cohete se tacha; un conserje friega (corta en «and warn»);
// 8. la cabina del proyector (fondo local): las bobinas giran, el haz sale por la ventanilla y se ve al panel; en
//    «bloody images» la gota roja en la ficha del tablero; en «the panel saw» el proyeccionista mira por la ventanilla;
// 9. la zona de ensayo: el Guardián Rojo salta y cae con todo su peso en «more weight»; polvo, la colchoneta se hunde;
//    Bucky se aparta; la coordinadora aplaude.""", COMUN + r"""
const Q2 = @panel@5.36@, Q3 = @panel@12.30@, Q4 = @panel@16.40@, Q5 = @panel@21.48@, Q6 = @sangre@27.0@, Q7 = @sangre@33.73@, Q8 = @sangre@38.83@, Q9 = @sangre@43.70@;
// ── 1 · el archivo (fondo local) ──
const BUF1 = R.nuevo(); let ok1 = false;
const archivo = () => { R.recorte(null); const prev = R.usar(BUF1);
  // la pared verde de oficina con su textura, tranquila arriba; el zócalo
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const n = azar(x >> 1, y >> 1); R.pset(x, y, y < 22 ? hex('#a8c0a8') : n > 0.94 ? hex('#98b098') : n < 0.04 ? hex('#c0d4bc') : hex('#b0c8b0')); }
  R.rect(0, 124, 319, 131, hex('#6a7a6a')); R.rect(0, 124, 319, 124, hex('#8a9a8a'));
  // la ventana con persiana (derecha, por debajo de Atom) y su luz en el suelo
  caja(232, 50, 280, 106, hex('#d8ecf4'), hex('#e8e0d0')); for (let y = 52; y < 104; y += 3) R.rect(233, y, 279, y, hex('#e8e8e0')); R.rect(256, 51, 256, 105, hex('#c8c8c0'));
  // el reloj de pared
  R.disco(212, 42, 9, K); R.disco(212, 42, 8, hex('#f6f2ea')); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R.pset(Math.round(212 + Math.cos(a) * 6), Math.round(42 + Math.sin(a) * 6), K); }
  // los archivadores grises de cuatro cajones, con sus etiquetas de colores y tiradores
  for (let k = 0; k < 5; k++) { const x0 = 12 + k * 36; caja(x0, 52, x0 + 32, 150, hex('#8a9098'), hex('#3a3e46')); R.rect(x0 + 1, 53, x0 + 31, 55, hex('#a8aeb6'));
    for (let d = 0; d < 4; d++) { const y0 = 58 + d * 23; caja(x0 + 3, y0, x0 + 29, y0 + 20, hex('#9aa0a8'), hex('#5a5e66')); R.rect(x0 + 10, y0 + 4, x0 + 22, y0 + 8, hex('#f2eee2')); R.rect(x0 + 10, y0 + 4, x0 + 12, y0 + 8, hex(['#c8303a', '#2a5ab8', '#e8b848', '#5a8a48', '#a83a8a'][(k + d) % 5])); R.rect(x0 + 12, y0 + 12, x0 + 20, y0 + 13, hex('#4a4e56')); } }
  // latas de película apiladas encima, un globo terráqueo y una planta
  for (let k = 0; k < 4; k++) { R.rect(14 + k * 9, 46 - k * 0, 22 + k * 9, 51, hex('#5a5e66')); R.rect(14 + k * 9, 46, 22 + k * 9, 46, hex('#8a9098')); }
  R.disco(100, 42, 7, K); R.disco(100, 42, 6, hex('#3a8ac8')); R.rect(97, 40, 101, 43, hex('#5aa86a')); R.rect(99, 49, 101, 51, hex('#8a6a3a'));
  R.rect(156, 38, 166, 51, hex('#b85a3a')); for (const [x, hh] of [[157, 12], [160, 18], [164, 10]]) R.poligono([[x, 38], [x + 2, 38 - hh], [x + 4, 38]], hex('#4a8a3a'));
  // la mesa con la bandeja de entrada a la derecha
  caja(200, 112, 310, 120, hex('#a87448'), hex('#4a2e1a')); R.rect(204, 120, 208, 156, hex('#6a4428')); R.rect(302, 120, 306, 156, hex('#6a4428'));
  caja(222, 104, 250, 112, hex('#c8c4bc')); R.rect(224, 106, 248, 107, hex('#e8e4dc'));
  R.rect(262, 92, 290, 111, K); R.rect(263, 93, 289, 110, hex('#e8e0d0')); R.rect(266, 96, 286, 106, hex('#3a4a5a'));
  // el suelo de linóleo en baldosas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (Math.floor(x / 20) + Math.floor((y - 132) / 12)) % 2; R.pset(x, y, s ? hex('#d8d0bc') : hex('#c8c0a8')); if (azar(x, y) > 0.97) R.pset(x, y, hex('#a8a090')); }
  for (let y = 132; y < 180; y++) for (let x = 210 + Math.round((y - 132) * -0.6); x < 270 + Math.round((y - 132) * -0.6); x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff8e8'), 0.35));
  R.usar(prev); ok1 = true; };
const p1 = (t) => {
  if (!ok1) archivo(); R.copiar(BUF1);
  const AR = @panel@1.30@, Y68 = @panel@3.82@;
  // las agujas del reloj y el fluorescente que parpadea
  R.linea(212, 42, Math.round(212 + Math.cos(t * 0.5) * 6), Math.round(42 + Math.sin(t * 0.5) * 6), K); R.linea(212, 42, 215, 39, K);
  R.rect(178, 22, 262, 24, hex('#8a9098')); R.rect(180, 25, 260, 26, (t % 3.1) < 0.08 ? hex('#a8b0a8') : hex('#f6fbff'));
  // el cartero entra, deja el sobre en la bandeja y se va
  const ll = tramo(t, 0, AR - 0.1), va = tramo(t, AR + 0.5, AR + 2.2), cx = Math.round(lerp(330, 238, ll) + va * 100);
  if (cx < 330) { const a = R.actor(EL.cartero, cx, 156, t, { dir: va > 0 ? 1 : -1, anda: (ll > 0 && ll < 1) || (va > 0 && va < 1), sostiene: t < AR ? true : undefined, sonrisa: t > AR }); if (t < AR) { const [hx, hy] = a.mano; caja(hx - 5, hy - 3, hx + 3, hy + 2, hex('#f2eee2')); R.disco(hx, hy, 1, hex('#e8783a')); } }
  if (t >= AR) { const yy = Math.round(lerp(96, 102, tramo(t, AR, AR + 0.3))); caja(226, yy, 246, yy + 6, hex('#f2eee2')); R.linea(226, yy, 236, yy + 4, hex('#c8c4bc')); R.linea(246, yy, 236, yy + 4, hex('#c8c4bc')); R.disco(242, yy + 3, 2, hex('#e8783a')); }
  // la archivera abre el cajón y saca la carpeta de 1968
  const ab = tramo(t, Y68 - 1.0, Y68 - 0.4), dx0 = 120, dy0 = 81, sale = Math.round(ab * 10);
  caja(dx0 + 3 - sale, dy0 + sale, dx0 + 29 + 0, dy0 + 20 + sale, hex('#9aa0a8'), hex('#5a5e66'));
  for (let k = 0; k < 6; k++) R.rect(dx0 + 5 - sale + k * 4, dy0 - 2 + sale, dx0 + 7 - sale + k * 4, dy0 + 4 + sale, hex(['#e8d8a8', '#d8c890', '#c8303a', '#e8d8a8', '#5a8a48', '#d8c890'][k]));
  const sube = tramo(t, Y68 - 0.3, Y68 + 0.2), a = R.actor(EL.archivista, 150, 156, t, { dir: -1, sostiene: t > Y68 - 0.4 ? [146, Math.round(128 - sube * 10)] : undefined, dedo: dentro(t, Y68 - 1.2, Y68 - 0.5), sonrisa: t > Y68 + 0.3 });
  if (t > Y68 - 0.4) { const [hx, hy] = a.mano; caja(hx - 14, hy - 10, hx + 2, hy + 2, hex('#e8d8a8'), hex('#8a6a3a')); R.rect(hx - 13, hy - 9, hx - 6, hy - 8, hex('#c8a868'));
    const n = tramo(t, Y68 - 0.1, Y68 + 0.4); if (n > 0) R.numero('1968', 150, Math.round(hy - 14 - n * 8), { tam: 16, centro: true }); }
};
// ── 2 · la sala de proyección: el panel de padres y sus tarjetas ──
const PANEL = [EL.padreDD, EL.madreDD, EL.vecino, EL.abuela, EL.senor30, EL.vecina, EL.espectador, EL.senora30, EL.espectadora, EL.profesor];
const p2 = (t) => {
  const AS = @panel@8.14@, G = @panel@9.34@, NC = @panel@11.10@;
  const tar = tramo(t, AS, AS + 0.6) * (1 - 0.5 * Math.max(0, 1 - Math.abs(t - NC) / 0.3));
  const votos = t < G ? undefined : t < NC ? Array(10).fill('G') : Array(10).fill('NC17');
  const o = { encuadre: 'calificacion', tarjetas: tar, votos }; const g = T.sala(R, t, o);
  (g.asientos ?? []).forEach(([x, su], k) => R.actor(PANEL[k % PANEL.length], x, su, t, { dir: -1, sorpresa: dentro(t, NC, NC + 0.6) && k % 3 === 0, sonrisa: dentro(t, G, NC) && k % 2 === 0, habla: dentro(t, Q2 + 0.4 + k * 0.1, Q2 + 0.8 + k * 0.1) }));
  T.salaDelante(R, t, o);
};
// ── 3 · el cine de lado: el chico, el acomodador con la tarjeta roja y el padre ──
const p3 = (t) => {
  const o = { encuadre: 'cine', publico: 'normal', pantalla: 'martillo' }; DO.hoy(R, t, o);
  const RR = @panel@13.38@, GU = @panel@15.44@, su = 172;
  const ll = tramo(t, Q3, RR - 0.2), kx = Math.round(lerp(-16, 48, ll)) + Math.round(tramo(t, GU + 0.6, Q4 + 0.4) * 30);
  const pl = tramo(t, GU - 0.9, GU), px = Math.round(lerp(-20, 30, pl)) + Math.round(tramo(t, GU + 0.6, Q4 + 0.4) * 30);
  const sube = t > GU + 0.6;
  const alza = dentro(t, RR - 0.2, GU + 0.4), u = R.actor(EL.conserje, 80, su, t, { dir: -1, sostiene: alza ? [72, su - 26] : true, enfado: dentro(t, RR, GU - 0.3), sonrisa: t > GU });
  { const [hx, hy] = u.mano; caja(hx - 6, hy - 12, hx + 4, hy, hex('#c8303a')); R.icono('!', hx - 2, hy - 10, hex('#ffffff'), K, 1); }
  R.actor(EL.ninoNavidad || EL.chico, kx, su, t, { dir: 1, anda: (ll > 0 && ll < 1) || sube, triste: dentro(t, RR, GU), sonrisa: t > GU });
  if (pl > 0) R.actor(EL.padreDD, px, su, t, { dir: 1, anda: (pl > 0 && pl < 1) || sube, sostiene: t > GU - 0.1 ? [kx + 4, su - 12] : undefined, sonrisa: t > GU });
  if (dentro(t, RR, GU)) globo(kx + 7, su - 28, tramo(t, RR + 0.1, RR + 0.4), '?', hex('#3a5a9a'));
  DO.hoyDelante(R, t, o);
};
// ── 4 · la mesa de las fichas: los renglones del porqué y el sello que no marca hasta el tercer golpe ──
const p4 = (t) => {
  const PG = @panel@20.20@, g1 = PG - 1.3, g2 = PG - 0.65, g3 = PG;
  // o.sello sube de golpe en golpe: 1 tras el primero, 2 tras el segundo, 3 en el tercero (deja el «13»)
  const sello = t < g1 - 0.25 ? 0 : t < g2 - 0.25 ? tramo(t, g1 - 0.25, g1) : t < g3 - 0.25 ? 1 + tramo(t, g2 - 0.25, g2) : 2 + tramo(t, g3 - 0.25, g3);
  const o = { encuadre: 'calificacion', camara: 'fichas', sello }; const g = T.sala(R, t, o), f5 = (g.fichas ?? [[44, 104], [102, 106], [160, 103], [218, 105], [276, 104]])[4];
  // la mano con el lápiz escribe los renglones del porqué en la quinta ficha
  const es = tramo(t, Q4 + 0.2, @panel@18.66@);
  for (let k = 0; k < 3; k++) { const w = Math.round(Math.max(0, Math.min(1, es * 3 - k)) * 26); if (w > 0) R.linea(f5[0] - 14, f5[1] + 6 + k * 5, f5[0] - 14 + w, f5[1] + 6 + k * 5 + (k % 2), hex('#3a3a4a')); }
  if (es > 0 && es < 1) { const k = Math.min(2, Math.floor(es * 3)), w = Math.round((es * 3 - k) * 26), hx = f5[0] - 14 + w, hy = f5[1] + 6 + k * 5 + Math.round(Math.sin(t * 20));
    T.brazo(R, 319, hy + 16, hx + 8, hy + 8, '#5a6a8a', -1); R.linea(hx, hy, hx + 7, hy + 7, hex('#e8b848')); R.linea(hx + 1, hy, hx + 8, hy + 7, hex('#c8963a')); R.pset(hx, hy, K); }
  // el polvo de cada golpe en falso
  for (const gg of [g1, g2]) if (dentro(t, gg, gg + 0.35)) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, f = (t - gg) / 0.35; R.pset(Math.round(f5[0] + Math.cos(a) * (8 + f * 10)), Math.round(f5[1] + Math.sin(a) * (4 + f * 6)), hex('#e8e0d0')); }
  if (dentro(t, g1 + 0.1, g3 - 0.2)) globo(f5[0] - 30, f5[1] - 24, 1, '?', hex('#3a5a9a'));
  if (t > g3) { const b = tramo(t, g3, g3 + 0.3); if (b < 1) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; R.linea(f5[0] + Math.round(Math.cos(a) * 14), f5[1] + Math.round(Math.sin(a) * 14), f5[0] + Math.round(Math.cos(a) * (18 + b * 8)), f5[1] + Math.round(Math.sin(a) * (18 + b * 8)), hex('#e8b848')); } }
};
// ── 5 · la estantería de las cinco películas: el aviso y las pegatinas del «13» ──
const pegatina = (x, y) => { R.rect(x - 11, y - 6, x + 11, y + 6, K); R.rect(x - 10, y - 5, x + 10, y + 5, hex('#e8783a')); R.rect(x - 10, y - 5, x + 10, y - 4, hex('#f6a05a')); R.pset(x - 11, y - 6, 0 | R.pget(x - 11, y - 7)); R.numero('13', x + 1, y + 4, { centro: true, color: hex('#ffffff') }); };
const p5 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'estanteria' }; const g = DO.hoy(R, t, o) || {}, su = g.suelo ?? 172;
  const SW = @panel@22.06@, KI = @panel@22.94@, EV = @panel@24.28@;
  for (let k = 0; k < 5; k++) { const ap = tramo(t, EV + k * 0.17, EV + 0.2 + k * 0.17); if (ap > 0) pegatina(46 + k * 38 + 22, 62 - Math.round((1 - ap) * 10)); }
  if (t > SW) { const u = tramo(t, SW, SW + 0.3); R.disco(250, 40, Math.round(12 * u), K); R.disco(250, 40, Math.max(1, Math.round(11 * u)), hex('#e8783a')); if (u > 0.8) { R.numero('13', 241, 46, { tam: 8, color: hex('#ffffff'), sombra: false }); R.icono('!', 262, 26, hex('#e83a3a'), K, 2); } }
  const nl = tramo(t, Q5 + 0.1, KI - 0.3), nx = Math.round(lerp(-16, 120, nl));
  R.actor(EL.ninoNavidad || EL.chico, nx, su, t, { dir: 1, anda: nl > 0 && nl < 1, dedo: dentro(t, KI - 0.3, KI + 0.9), triste: t > KI + 0.9 && t < EV, sonrisa: t > EV + 0.8 });
  const ml = tramo(t, KI - 0.4, KI + 0.4), mx = Math.round(lerp(330, 152, ml));
  R.actor(EL.madreDD, mx, su, t, { dir: -1, anda: ml > 0 && ml < 1, dedo: dentro(t, KI + 0.3, EV), sonrisa: t > EV + 0.6, habla: dentro(t, KI + 0.3, EV) && parpa(t, 8) });
  if (dentro(t, KI + 0.3, EV)) globo(mx + 7, su - 28, tramo(t, KI + 0.3, KI + 0.6), 'X', hex('#e83a3a'));
  // la barra del año, sobre la balda de arriba: se apaga un poco esa franja
  velo(18, 0, 174, 22, hex('#1a1622'), 0.6);
};
// ── 6 · la rueda de prensa: el porqué nuevo en el caballete ──
const PUNO = ['.####.', '######', '######', '######', '.#####', '..###.'];
const p6 = (t) => {
  const NW = @sangre@29.51@, VI = @sangre@30.29@, BL = @sangre@31.43@, LA = @sangre@32.65@;
  const o = { encuadre: 'prensa', flashes: 0.3 + 0.5 * tramo(t, VI - 0.2, LA + 0.3) }; const g = DO.escenario(R, t, o) || {}, su = g.suelo ?? 122;
  // el caballete con la ficha grande
  R.linea(214, 76, 206, 122, hex('#6a4428')); R.linea(244, 76, 252, 122, hex('#6a4428')); R.linea(229, 80, 229, 122, hex('#5a3418'));
  caja(204, 40, 254, 100, hex('#f6f2ea'), hex('#3a2a20')); R.rect(205, 41, 253, 46, hex('#e8783a')); pegatina(229, 56);
  const fila = (y, u, pinta) => { if (u <= 0) return; R.rect(212, y + 3, 212 + Math.round(30 * u), y + 3, hex('#a8a8b0')); if (u > 0.5) pinta(244, y); };
  fila(66, tramo(t, VI - 0.1, VI + 0.3), (x, y) => { for (let j = 0; j < PUNO.length; j++) for (let i = 0; i < 6; i++) if (PUNO[j][i] === '#') R.pset(x - 3 + i, y + j, j === 0 || i === 0 ? K : hex('#f6c290')); });
  fila(76, tramo(t, BL - 0.1, BL + 0.3), (x, y) => R.icono('gota', x - 3, y, hex('#c8303a'), K, 1));
  fila(86, tramo(t, LA - 0.1, LA + 0.3), (x, y) => { caja(x - 4, y - 1, x + 5, y + 6, hex('#ffffff')); R.pset(x - 2, y + 2, hex('#e83a3a')); R.pset(x, y + 2, K); R.pset(x + 2, y + 2, hex('#2a5ab8')); R.pset(x - 2, y + 7, K); });
  // el portavoz en el atril: habla, y en «new» sale una estrella
  R.actor(EL.portavoz || EL.ejecutivoDD, 153, su, t, { dir: 1, habla: parpa(t, 8) && t < LA + 0.8, dedo: dentro(t, VI - 0.2, LA + 0.6), sonrisa: t > LA + 0.8 });
  const nw = tramo(t, NW - 0.1, NW + 0.3); if (nw > 0 && t < VI + 0.5) { const cx = 190, cy = 58; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t, r = k % 2 ? 4 * nw : 9 * nw; R.linea(cx, cy, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#e8b848')); } R.icono('!', cx - 1, cy - 3, hex('#e83a3a'), K, 1); }
  DO.escenarioDelante(R, t, o);
};
// ── 7 · el pasillo de los diplomas (fondo local) ──
const BUF7 = R.nuevo(); let ok7 = false;
const COHETE = ['..#..', '.###.', '.#o#.', '.###.', '#####', '#.#.#'];
const cohete2 = (x, y, c, luz) => { for (let j = 0; j < 6; j++) for (let i = 0; i < 5; i++) { const ch = COHETE[j][i]; if (ch === '.') continue; R.rect(x + i * 2 - 1, y + j * 2 - 1, x + i * 2, y + j * 2, K); } for (let j = 0; j < 6; j++) for (let i = 0; i < 5; i++) { const ch = COHETE[j][i]; if (ch === '#') R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, c); else if (ch === 'o') R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, luz ? hex('#5ac8e8') : hex('#3a6a8a')); } };
const cohete = (x, y, c = hex('#c8ccd8')) => { for (let j = 0; j < 6; j++) for (let i = 0; i < 5; i++) { const ch = COHETE[j][i]; if (ch === '#') R.pset(x + i, y + j, c); else if (ch === 'o') R.pset(x + i, y + j, hex('#5ac8e8')); } };
const pasillo = () => { R.recorte(null); const prev = R.usar(BUF7);
  // pared crema con friso de madera, una moldura arriba (tranquila bajo la barra del año)
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 24 ? hex('#e8dcc4') : ((x + y * 2) % 9 === 0 ? hex('#ddd0b4') : hex('#ecdfc6')));
  R.rect(0, 24, 319, 26, hex('#c8a878')); R.rect(0, 26, 319, 26, hex('#8a6a48'));
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, Math.sin(x * 0.15 + y * 0.4) > 0.8 ? hex('#7a4a28') : hex('#8e5a30'));
  for (let k = 0; k < 8; k++) caja(4 + k * 40, 124, 38 + k * 40, 146, hex('#8e5a30'), hex('#5a3418')); R.rect(0, 118, 319, 120, hex('#5a3418'));
  // el suelo encerado con el reflejo
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = (x + Math.floor((y - 150) / 6) * 13) % 26; R.pset(x, y, tb === 0 ? hex('#6a4428') : (y - 150) % 6 === 0 ? hex('#7a5030') : hex('#a87448')); }
  // la fuente de agua con su garrafa y una planta
  caja(280, 96, 300, 150, hex('#e8e8f0'), hex('#8a8a94')); R.rect(282, 72, 298, 96, hex('#8ac8e8')); R.rect(282, 72, 298, 73, hex('#5a9ac8')); R.rect(286, 110, 294, 114, hex('#5a5a64'));
  R.rect(10, 128, 26, 150, hex('#b85a3a')); for (const [x, hh] of [[11, 26], [16, 34], [21, 22]]) R.poligono([[x, 128], [x + 3, 128 - hh], [x + 6, 128]], hex('#3a7a3a'));
  R.usar(prev); ok7 = true; };
const ANOS = ['2012', '2015', '2018', '2019', '2026'];
const p7 = (t) => {
  if (!ok7) pasillo(); R.copiar(BUF7);
  const FB = @sangre@33.83@, FI = @sangre@36.93@, DR = @sangre@38.15@;
  for (let k = 0; k < 5; k++) { const x0 = 40 + k * 48, y0 = 44, on = k < 4 ? tramo(t, FB + 0.2 + k * 0.35, FB + 0.5 + k * 0.35) : tramo(t, FI - 0.2, FI + 0.2);
    // el foco de cada marco
    R.rect(x0 + 14, 30, x0 + 26, 33, hex('#8a6a48')); if (on > 0) for (let y = 34; y < 44; y++) { const w = 4 + (y - 34); for (let x = x0 + 20 - w; x <= x0 + 20 + w; x++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d0'), 0.5 * on)); }
    caja(x0, y0, x0 + 40, y0 + 56, hex('#f6f2ea'), hex('#8a6a3a')); R.rect(x0 + 2, y0 + 2, x0 + 38, y0 + 54, on > 0 ? mez(hex('#f6f2ea'), hex('#fff8e0'), on) : hex('#efe8d8'));
    R.numero(ANOS[k], x0 + 20, y0 + 14, { centro: true, color: hex('#3a3a4a'), sombra: false });
    pegatina(x0 + 13, y0 + 30);
    if (k < 4 || t < DR + 0.1) { cohete2(x0 + 27, y0 + 22, on > 0.5 ? hex('#f2eee2') : hex('#a8acb8'), on > 0.5); if (on > 0.5 && k < 4) { R.pset(x0 + 31, y0 + 35, parpa(t + k, 12) ? hex('#e8783a') : hex('#e8b848')); R.pset(x0 + 32, y0 + 36, hex('#e8b848')); } }
    if (k === 4 && t > DR) { const u = tramo(t, DR, DR + 0.3); for (const d of [0, 1]) { R.linea(x0 + 24 + d, y0 + 20, Math.round(x0 + 24 + d + 14 * u), Math.round(y0 + 20 + 14 * u), hex('#e8202a')); R.linea(x0 + 38 - d, y0 + 20, Math.round(x0 + 38 - d - 14 * u), Math.round(y0 + 20 + 14 * u), hex('#e8202a')); } }
    for (let i = 0; i < 3; i++) R.rect(x0 + 6, y0 + 42 + i * 4, x0 + 34 - i * 6, y0 + 42 + i * 4, hex('#a8a8b0')); }
  // el conserje friega el pasillo (la fregona va y viene)
  const cx = Math.round(30 + ((t - Q7) * 10) % 100), f = Math.round(Math.sin(t * 5) * 5);
  const a = R.actor(EL.conserje, cx, 166, t, { dir: 1, sostiene: [cx + 16, 150] }); R.linea(a.mano[0], a.mano[1], cx + 20 + f, 166, hex('#a87448')); R.rect(cx + 16 + f, 164, cx + 26 + f, 167, hex('#e8e0d0'));
  for (let k = 0; k < 6; k++) R.pset(cx + 10 - k * 4, 168 + (k % 2), hex('#c8a878'));
  // una visitante mira el quinto marco y se sorprende cuando se tacha el cohete
  const vl = tramo(t, FI - 1.4, FI), vx = Math.round(lerp(330, 252, vl));
  R.actor(EL.madreDD, vx, 166, t, { dir: -1, anda: vl > 0 && vl < 1, sorpresa: dentro(t, DR, DR + 0.8), dedo: t > DR + 0.6 });
  // las burbujas de la garrafa
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; R.pset(289 + k * 2, Math.round(94 - u * 20), hex('#e8f8ff')); }
};
// ── 8 · la cabina del proyector (fondo local) ──
const BUF8 = R.nuevo(); let ok8 = false;
const cabina = () => { R.recorte(null); const prev = R.usar(BUF8);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 140 ? ((x % 16 === 0 || y % 12 === 0) ? hex('#2a2632') : hex('#363040')) : ((x + y) % 5 === 0 ? hex('#2a2a30') : hex('#3a3a42')));
  R.rect(0, 0, 319, 22, hex('#24202c'));
  // la ventanilla a la sala (izquierda): el marco
  caja(22, 52, 102, 102, hex('#0e0e18'), hex('#5a5a64'));
  // el estante de latas de película, a la derecha
  caja(246, 48, 312, 132, hex('#4a3a2a'), hex('#2a1e14')); for (const y of [74, 100, 126]) R.rect(247, y, 311, y + 1, hex('#6a5038'));
  for (let s = 0; s < 3; s++) for (let k = 0; k < 5; k++) { const x = 254 + k * 12, y = 66 + s * 26; R.rect(x - 5, y - 4, x + 5, y + 6, hex('#8a8e9a')); R.rect(x - 5, y - 4, x + 5, y - 3, hex('#c8ccd8')); R.rect(x - 2, y, x + 2, y + 1, hex(['#c8303a', '#2a5ab8', '#e8b848', '#5a8a48', '#a83a8a'][(k + s) % 5])); }
  // la mesa de rebobinar con el libro de registro y el tablero de corcho
  caja(110, 132, 180, 140, hex('#6a4428'), hex('#3a2418')); R.rect(114, 140, 118, 170, hex('#3a2418')); R.rect(172, 140, 176, 170, hex('#3a2418'));
  caja(186, 50, 236, 92, hex('#c8963a'), hex('#6a4428')); for (let k = 0; k < 30; k++) R.pset(188 + Math.floor(azar(k, 1) * 46), 52 + Math.floor(azar(k, 2) * 38), hex('#a87428'));
  caja(192, 56, 208, 74, hex('#f2eee2')); R.rect(194, 58, 206, 61, hex('#e8783a')); caja(214, 60, 230, 78, hex('#e8e0d0')); for (let i = 0; i < 3; i++) R.rect(216, 64 + i * 4, 228, 64 + i * 4, hex('#a8a8b0'));
  // en el suelo: latas apiladas, la papelera con tiras de película, un taburete, el carro de bobinas y cables
  for (let k = 0; k < 4; k++) { const x = 22 + (k % 2) * 6, y = 168 - k * 5; R.rect(x - 9, y - 4, x + 9, y, hex('#5a5e6a')); R.rect(x - 9, y - 4, x + 9, y - 4, hex('#a8acb8')); R.pset(x, y - 2, hex('#2a2a30')); }
  caja(60, 150, 76, 172, hex('#4a4a54')); for (let k = 0; k < 5; k++) R.linea(62 + k * 3, 150, 60 + k * 4, 140 + (k % 2) * 3, hex('#3a2a20'));
  R.rect(200, 152, 216, 155, hex('#8a3a2a')); R.rect(202, 156, 203, 172, hex('#5a5e6a')); R.rect(213, 156, 214, 172, hex('#5a5e6a')); R.rect(203, 165, 213, 166, hex('#5a5e6a'));
  caja(250, 140, 300, 168, hex('#6a6e7a'), hex('#2a2a30')); for (const [cx, cy] of [[262, 134], [288, 134]]) { R.disco(cx, cy, 8, K); R.disco(cx, cy, 7, hex('#8a8e9a')); R.disco(cx, cy, 2, hex('#3a3e48')); } for (const x of [254, 296]) R.disco(x, 171, 2, K);
  for (let k = 0; k < 3; k++) { let x = 120, y = 174 - k * 2; for (let i = 0; i < 14; i++) { const nx = x + 9, ny = y + Math.round(Math.sin(i * 0.7 + k) * 1.5); R.linea(x, y, nx, ny, hex('#141418')); x = nx; y = ny; } }
  R.usar(prev); ok8 = true; };
const p8 = (t) => {
  if (!ok8) cabina(); R.copiar(BUF8);
  const BI = @sangre@40.13@, SW = @sangre@42.68@;
  // por la ventanilla: la pantalla lejos que parpadea y las cabezas del panel (recortado al hueco)
  R.recorte([23, 53, 101, 101]);
  for (let y = 53; y <= 101; y++) for (let x = 23; x <= 101; x++) R.pset(x, y, hex('#141220'));
  const fl = 0.6 + 0.4 * Math.sin(t * 9) * Math.sin(t * 2.3); for (let y = 58; y <= 80; y++) for (let x = 30; x <= 94; x++) R.pset(x, y, mez(hex('#3a5a9a'), hex('#c8e0ff'), fl * ((x + y) % 3 ? 0.7 : 1)));
  for (let k = 0; k < 6; k++) { const hx = 30 + k * 12, gira = t > SW + k * 0.08 ? (k % 2 ? 2 : -2) : 0; R.disco(hx + gira, 92, 4, hex('#0a0a12')); R.rect(hx - 5, 95, hx + 5, 101, hex('#0a0a12')); }
  R.recorte(null);
  // el proyector con sus dos bobinas que giran, la lámpara y el haz hacia la ventanilla
  caja(120, 96, 168, 130, hex('#5a5e6a'), hex('#2a2a30')); R.rect(150, 100, 166, 112, hex('#3a3e48')); R.rect(102, 108, 120, 116, hex('#2a2a30'));
  for (const [rx, ry] of [[128, 78], [160, 78]]) { R.disco(rx, ry, 14, K); R.disco(rx, ry, 13, hex('#8a8e9a')); R.disco(rx, ry, 4, hex('#3a3e48')); for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.09; R.linea(rx, ry, Math.round(rx + Math.cos(a) * 11), Math.round(ry + Math.sin(a) * 11), hex('#3a3e48')); } }
  R.linea(128, 92, 140, 104, hex('#2a2a30')); R.linea(160, 92, 150, 104, hex('#2a2a30'));
  R.rect(166, 114, 170, 118, (t % 0.3) < 0.15 ? hex('#fff0b0') : hex('#e8c86a'));
  for (let x = 24; x < 104; x++) { const w = Math.round(2 + (104 - x) * 0.08); for (let y = 112 - w; y <= 112 + w; y++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d8'), 0.25)); }
  // la gota roja que se pega en la ficha del tablero en «bloody images»
  if (t > BI) { const u = tramo(t, BI, BI + 0.3); R.icono('gota', 222, Math.round(80 - (1 - u) * 6), hex('#c8303a'), K, 1); }
  // el proyeccionista: revisa el libro y en «the panel saw» se asoma a la ventanilla
  const mira = t > SW - 0.3, px = Math.round(lerp(132, 104, tramo(t, SW - 0.6, SW)));
  const a = R.actor(EL.tecnico, px, 170, t, { dir: mira ? -1 : 1, anda: dentro(t, SW - 0.6, SW), sostiene: mira ? undefined : [px + 16, 136], dedo: dentro(t, BI - 0.2, BI + 0.8) && !mira });
  { const [hx, hy] = mira ? [150, 128] : a.mano; caja(hx - 4, hy - 4, hx + 6, hy + 2, hex('#2a5a3a')); R.rect(hx - 3, hy - 3, hx + 5, hy + 1, hex('#f2eee2')); R.linea(hx - 2, hy - 1, hx + 4, hy - 1, hex('#a8a8b0')); }
  // motas en el haz
  for (let k = 0; k < 10; k++) { const u = (t * 0.2 + azar(k, 6)) % 1; R.pset(Math.round(104 - u * 80), Math.round(110 + Math.sin(t + k) * 3), hex('#fff6d8')); }
};
// ── 9 · la zona de ensayo: la caída con todo su peso ──
const p9 = (t) => {
  const o = { encuadre: 'bosque', camara: 'ensayo' }; T.plato(R, t, o);
  const HI = @sangre@45.04@, MW = @sangre@47.20@;
  const sal = tramo(t, MW - 0.9, MW - 0.4), cae = tramo(t, MW - 0.4, MW), gx = Math.round(lerp(150, 170, Math.min(1, (t - MW + 0.9) / 0.9)));
  const alto = t < MW - 0.4 ? Math.round(Math.sin(sal * Math.PI / 2) * 22) : Math.round((1 - cae) * 22);
  const golpe = t > MW && t < MW + 0.6, temb = golpe ? Math.round(Math.sin(t * 60) * 2) : 0;
  R.actor(EL.guardian, Math.max(150, gx), 160, t, { dir: 1, salto: Math.max(0, alto), brazos: t > MW - 0.9 && t < MW + 0.2, enfado: t > MW - 1.2, sonrisa: t > MW + 0.8 });
  R.actor(EL.bucky, 196 + Math.round(tramo(t, MW - 0.3, MW + 0.2) * 22), 160, t, { dir: -1, sorpresa: dentro(t, MW - 0.5, MW + 1.2), anda: dentro(t, MW - 0.3, MW + 0.2) });
  if (golpe) { const f = (t - MW) / 0.6; for (let k = 0; k < 14; k++) { const a = Math.PI + k / 13 * Math.PI; R.disco(Math.round(gx + 7 + Math.cos(a) * (10 + f * 22)), Math.round(160 + Math.sin(a) * (3 + f * 10)), 2 - Math.round(f), hex('#c8ccd8')); }
    for (let x = gx - 20; x < gx + 34; x++) R.pset(x, 161 + temb, hex('#1e3a8a')); }
  R.actor(EL.tecnica, 40, 160 + temb, t, { dir: 1, sorpresa: golpe, brazos: t > MW + 0.6 && parpa(t, 16), habla: dentro(t, Q9 + 0.3, HI) && parpa(t, 8), dedo: dentro(t, HI, MW - 1.0) });
  if (dentro(t, HI - 0.1, MW - 1.0)) globo(47, 130, tramo(t, HI - 0.1, HI + 0.2), '!', hex('#e8b848'));
  if (golpe) { R.icono('balanza', 176, 104, hex('#e8b848'), K, 2); }
  T.platoDelante(R, t, o);
};
const efectos = [[@panel@1.30@, 'papel'], [@panel@3.40@, 'cerrojo'], [@panel@3.82@, 'brillo'],
  [@panel@8.30@, 'papel'], [@panel@9.34@, 'pop'], [@panel@11.10@, 'pop'],
  [@panel@13.38@, 'aviso'],
  [@panel@16.8@, 'lapiz'], [@panel@18.90@, 'sello'], [@panel@19.55@, 'sello'], [@panel@20.20@, 'sello'],
  [@panel@22.06@, 'aviso'], [@panel@24.30@, 'pop'], [@panel@24.95@, 'pop'],
  [@sangre@29.51@, 'brillo'], [@sangre@30.29@, 'flash'], [@sangre@31.43@, 'pop'], [@sangre@32.65@, 'pop'],
  [@sangre@34.1@, 'interruptor'], [@sangre@38.15@, 'lapiz'],
  [@sangre@39.0@, 'maquina'], [@sangre@40.13@, 'pop'],
  [@sangre@46.4@, 'whoosh'], [@sangre@47.20@, 'boom'], [@sangre@47.9@, 'palmada']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3], [Q4, p4], [Q5, p5], [Q6, p6], [Q7, p7], [Q8, p8], [Q9, p9]], { efectos, año: 2026 });
""")

for _k in list(E):
    _t, _c, _b = E[_k]
    E[_k] = (_t, _c, _poner(_k, _b))
