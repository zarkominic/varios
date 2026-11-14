# Borrador de las escenas del grupo S4 del ep23: tr-tarjetas, tr-huevos, tr-liebre (con el movimiento hecho).
# Los instantes se escriben @(t) en segundos de la escena (sacados de las palabras de la voz inglesa, linea.json) y se
# convierten aquí en en('marca', fracción).
import re

E = {}


def _con(marca, ini, fin, cuerpo):
    def f(m):
        t = float(m.group(1))
        return "en('%s', %.4f)" % (marca, (t - ini) / (fin - ini))
    return re.sub(r'@\(([0-9.]+)\)', f, cuerpo)


COMUN = r'''
const PZ = T.PIEZAS_TR;
const pz = (k, x, y, o = {}) => { if (PZ[k]) PZ[k](R, Math.round(x), Math.round(y), o); };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const cada = (t, f) => Math.floor(t * f) % 2 === 0;
const K = T.C.k, c = (s) => hex(s);
// el cielo tramado de cinco tonos (en un búfer, una vez)
const cieloTramado = (hor, tonos) => { const C5 = tonos.map(c); for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) { const u = y / hor * C5.length + (((x + y) & 1) ? 0.32 : -0.32) + (hh(x >> 2, y >> 2, 9) - 0.5) * 0.18; R.pset(x, y, C5[Math.max(0, Math.min(C5.length - 1, Math.floor(u)))]); } };
// nubes de tres tonos a tres velocidades
const nubes = (t, lista) => { for (const [x0, cy, w, v] of lista) { const cx = ((x0 + t * v) % 400 + 400) % 400 - 40; R.nube(Math.round(cx), cy, w); } };
// pájaros lejanos que cruzan
const pajaros = (t, lista) => { for (const [x0, y0, v, k] of lista) { const x = ((x0 + t * v) % 380 + 380) % 380 - 30, y = Math.round(y0 + Math.sin(t * 1.3 + k) * 2); const a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(Math.round(x), y, K); R.pset(Math.round(x) - 1, y - a, K); R.pset(Math.round(x) + 1, y - a, K); R.pset(Math.round(x) - 2, y - 1 + (a ? -1 : 1) * 0, K); R.pset(Math.round(x) + 2, y - 1, K); } };
'''

# ── tr-tarjetas ─────────────────────────────────────────────────────────────────────────────────────────
E['tr-tarjetas'] = ('Tarjetas', '''// TR-TARJETAS (frase 11), 1840 → 1848 → hoy. Cuatro planos:
// 1. (0 → «and» tras «penny post») la oficina de correos de Londres nevada: un caballero entra con su tarjeta, se la da al
//    cartero, que deja de repartir cartas en los casilleros, la arrastra por el mostrador y la sella en «penny»;
// 2. («and within a few years» → «In») el mostrador de cerca: las tarjetas llegan cada vez más seguidas por el mostrador,
//    el cartero las sella a ritmo y van al montón, que crece; 10,000 en «tens», 100,000 en «hundreds»;
// 3. («In the United States» → «and») el taller de Worcester: Esther Howland entra con la caja de encaje, la deja en la
//    mesa, recorta el encaje (los recortes caen) y en «1840s» enseña la tarjeta acabada; su ayudanta trae otro montón;
// 4. («and today» → fin) la mesa de cerca: el lazo acaba la tarjeta, Esther se va, la barra salta a 2026 y la cuenta sube
//    hasta 100,000,000 en «million»; gag 3: la uva se pinta un corazón con el pincel de la cola, se lo da a la uva verde
//    y la verde se va rodando de vergüenza.''', _con('correo', 0.5, 20.684, COMUN + r'''
const P2 = @(5.94), P3 = @(11.34), P4 = @(16.94);
const penny = @(4.98), tens = @(8.26), hundreds = @(9.66), numero = @(7.06), miles = @(10.24);
const recorta = @(14.46), anios40 = @(15.70), hoyT = @(17.12), mas = @(18.38), millon = @(19.36);
const ENC = '#f6f0e4', ROJO = '#b8202a';
// la tarjeta pequeña de encaje (en la mano o en el mostrador) y el sello de mano con su tampón
const tarjetita = (x, y, sellada) => { R.rect(x - 5, y - 4, x + 5, y + 3, K); R.rect(x - 4, y - 3, x + 4, y + 2, c(ENC)); for (let i = -4; i <= 4; i += 2) { R.pset(x + i, y - 3, c('#d8c8b0')); R.pset(x + i, y + 2, c('#d8c8b0')); } R.pset(x - 1, y - 1, c(ROJO)); R.pset(x + 1, y - 1, c(ROJO)); R.rect(x - 1, y, x + 1, y, c(ROJO)); R.pset(x, y + 1, c(ROJO)); if (sellada) { R.rect(x + 2, y - 3, x + 4, y - 1, c('#24202c')); R.pset(x + 3, y - 2, c('#e8e4dc')); } };
const sellador = (x, y) => { R.rect(x - 2, y - 8, x + 2, y - 5, K); R.rect(x - 1, y - 7, x + 1, y - 6, c('#8a5a30')); R.rect(x, y - 5, x, y - 2, c('#4a2a14')); R.rect(x - 4, y - 2, x + 4, y + 1, K); R.rect(x - 3, y - 1, x + 3, y - 1, c('#6a6470')); R.rect(x - 3, y, x + 3, y, c('#24202c')); };
const p1 = (t) => {
  T.amor(R, t, { encuadre: 'correos', tarjetas: 0.3 });
  // la señora de la cola se calienta junto a la estufa y le habla al perrito; luego mira al mostrador
  R.actor(EL.mildred, 72, 151, t, { dir: t < 2.4 ? -1 : 1, habla: t > 0.5 && t < 2.2 && cada(t, 4), sonrisa: t > 2.4 });
  // el caballero entra con su tarjeta y se la tiende al cartero
  const u = tramo(t, 0.2, 2.6), xb = Math.round(lerp(-18, 120, u)), da = tramo(t, 3.0, 3.55);
  const sb = t < 3.7 ? (da > 0 ? [Math.round(lerp(xb + 16, 150, da)), Math.round(lerp(134, 129, da))] : true) : false;
  const b = R.actor(EL.burgues, xb, 152, t, { dir: 1, anda: u > 0 && u < 1, sinObjeto: true, sostiene: sb, habla: t > 2.7 && t < 3.4 && cada(t, 6), sonrisa: t > penny });
  // el cartero reparte en los casilleros, se vuelve, arrastra la tarjeta y la sella en «penny»
  const s = tramo(t, 3.7, 4.3), cx = Math.round(lerp(152, 194, s)), mira = t > 2.5;
  let mc = null;
  if (!mira) mc = [Math.round(252 + 5 * Math.sin(t * 2.4)), cada(t, 1.2) ? 104 : 110];
  else if (t > 3.6 && t < 4.35) mc = [cx + 6, 131];
  else if (t >= 4.35 && t < 5.25) mc = [194, Math.abs(t - penny) < 0.16 ? 124 : 116];
  else if (t >= 5.25) mc = [206, Math.round(lerp(126, 112, tramo(t, 5.25, 5.6)))];
  const cart = R.actor(EL.carteroVictoriano, 220, 146, t, { dir: mira ? -1 : 1, sostiene: mc ?? false, habla: t > 2.6 && t < 3.5 && cada(t, 7), sonrisa: t > 5.3, saca: 'llena' });
  T.amorDelante(R, t, { encuadre: 'correos', tarjetas: 0.3 });
  if (t < 3.7) tarjetita(b.mano[0], b.mano[1] - 3, false);
  if (!mira) { R.rect(cart.mano[0] - 2, cart.mano[1] - 4, cart.mano[0] + 2, cart.mano[1], K); R.rect(cart.mano[0] - 1, cart.mano[1] - 3, cart.mano[0] + 1, cart.mano[1] - 1, c('#f2eee2')); }
  if (t >= 3.7 && t < 5.25) tarjetita(cx, 132, t > penny);
  if (t >= 4.35 && t < 5.25) sellador(cart.mano[0], cart.mano[1] + 7);
  if (t >= 5.25) { pz('tarjeta', cart.mano[0], cart.mano[1] + 1, {}); R.rect(cart.mano[0] + 3, cart.mano[1] - 12, cart.mano[0] + 6, cart.mano[1] - 9, c('#24202c')); R.pset(cart.mano[0] + 4, cart.mano[1] - 11, c('#e8e4dc')); if (t < 5.8) for (const [dx, dy] of [[-12, -14], [12, -14], [0, -20]]) R.pset(cart.mano[0] + dx, cart.mano[1] + dy, c('#ffe08a')); }
  // el golpe del sello: un destello
  if (t > penny && t < penny + 0.35) for (const [dx, dy] of [[-8, -2], [8, -2], [-6, -7], [6, -7]]) R.pset(194 + dx, 128 + dy, c('#ffe08a'));
};
const p2 = (t) => {
  const n = 0.12 + 0.88 * tramo(t, numero, miles);
  T.amor(R, t, { encuadre: 'correos', camara: 'mostrador', tarjetas: n });
  // el cartero sella a ritmo: cada vez más deprisa
  const rit = t < tens ? 1.6 : t < hundreds ? 3 : 4.6, fase = ((t - P2) * rit) % 1, abajo = t > P2 + 0.7 && fase < 0.32;
  const cart = R.actor(EL.carteroVictoriano, 150, 152, t, { dir: 1, sostiene: [176, abajo ? 132 : 122], sonrisa: t > hundreds + 0.5, sorpresa: t > hundreds - 0.1 && t < hundreds + 0.5, sinObjeto: true });
  T.amorDelante(R, t, { encuadre: 'correos', camara: 'mostrador', tarjetas: n });
  // las tarjetas llegan por el mostrador desde la izquierda, se sellan y saltan al montón
  for (let k = 0; k < 18; k++) {
    const s0 = P2 + 0.25 + (k < 4 ? k * 0.75 : 3.0 + (k - 4) * 0.27), a = t - s0;
    if (a < 0 || a > 1.0) continue;
    let x, y;
    if (a < 0.42) { x = lerp(-14, 176, a / 0.42); y = 143; }
    else if (a < 0.6) { x = 176; y = 143; }
    else { const v = (a - 0.6) / 0.4; x = lerp(176, 224, v); y = 143 - Math.sin(v * Math.PI) * 20 - v * (2 + n * 10); }
    pz('tarjeta', x, y, {});
  }
  sellador(cart.mano[0], cart.mano[1] + 8);
  if (abajo) for (const [dx, dy] of [[-10, 8], [10, 8], [-8, 3], [8, 3]]) R.pset(176 + dx, 134 + dy, c('#ffe08a'));
  if (t > tens) { const e = tramo(t, tens, tens + 0.3), e2 = tramo(t, hundreds, hundreds + 0.3); R.numero(t < hundreds ? '10,000' : '100,000', 136, Math.round(lerp(84, 74, t < hundreds ? e : e2)), { tam: 16, centro: true }); }
};
const p3 = (t) => {
  T.amor(R, t, { encuadre: 'taller' });
  // Esther entra con la caja de encaje, la deja en la mesa, recorta y enseña la tarjeta acabada
  const u = tramo(t, P3 + 0.1, @(12.9)), xe = Math.round(lerp(-18, 172, u)), deja = @(13.54);
  let me = true;
  if (t > deja - 0.3 && t < recorta - 0.2) me = [190, 128];
  else if (t >= recorta - 0.2 && t < anios40 - 0.1) me = [Math.round(194 + 3 * Math.sin(t * 9)), cada(t, 4) ? 126 : 129];
  else if (t >= anios40 - 0.1) me = [190, Math.round(lerp(126, 114, tramo(t, anios40 - 0.1, anios40 + 0.3)))];
  const es = R.actor(EL.esther, xe, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: me, sonrisa: t > anios40, habla: t > deja && t < recorta && cada(t, 6) });
  // la ayudanta trae otro montón de tarjetas desde la chimenea y se queda mirando
  const v = tramo(t, P3 + 0.3, @(12.8)), xa = Math.round(lerp(330, 230, v)), dejaA = @(13.3);
  const ay = R.actor(EL.ayudanta2, xa, 152, t, { dir: -1, anda: v > 0 && v < 1, sostiene: t < dejaA ? true : false, habla: t > recorta + 0.3 && t < anios40 - 0.2 && cada(t, 5), sonrisa: t > anios40 });
  T.amorDelante(R, t, { encuadre: 'taller' });
  // lo que llevan en las manos y lo que dejan en la mesa
  const caja = (x, y) => { R.rect(x - 6, y - 5, x + 6, y, K); R.rect(x - 5, y - 4, x + 5, y - 1, c('#c8a8d8')); for (let i = -5; i <= 5; i += 2) R.pset(x + i, y - 4, c(ENC)); R.rect(x - 4, y - 3, x + 4, y - 3, c(ENC)); };
  if (t < deja - 0.3) caja(es.mano[0] + 2, es.mano[1] + 2); else caja(196, 135);
  if (t >= recorta - 0.2 && t < anios40 - 0.1) {
    const [mx, my] = es.mano; R.linea(mx + 1, my - 1, mx + 5, my - 5, c('#c8ccd8')); R.linea(mx + 1, my - 5, mx + 5, my - 1, c('#8c90a4')); R.pset(mx + 3, my - 3, K);
    for (let k = 0; k < 6; k++) { const a = ((t - recorta) * 0.9 + k / 6) % 1; R.pset(Math.round(mx + 4 + Math.sin(k * 3 + t * 4) * 4), Math.round(my + a * 10), c(ENC)); }
  }
  if (t >= anios40 - 0.1) { pz('tarjeta', es.mano[0], es.mano[1] - 1, {}); if (t > anios40 && t < anios40 + 0.8) for (const [dx, dy] of [[-12, -10], [12, -12], [-10, -18], [10, -20]]) R.pset(es.mano[0] + dx, es.mano[1] + dy, c('#ffe08a')); }
  const pila = (x, y) => { for (let k = 0; k < 4; k++) tarjetita(x + (k % 2), y - k * 2, false); };
  if (t < dejaA) pila(ay.mano[0] - 2, ay.mano[1] + 1); else pila(220, 135);
};
const p4 = (t) => {
  const tj = lerp(0.62, 1, tramo(t, P4, P4 + 0.9));
  T.amor(R, t, { encuadre: 'taller', camara: 'mesa', tarjeta: tj });
  // Esther ata el lazo y se va: la tarjeta queda hecha
  const sale = tramo(t, @(17.9), @(19.1)), xe = Math.round(lerp(78, -26, sale));
  R.actor(EL.esther, xe, 150, t, { dir: sale > 0 ? -1 : 1, anda: sale > 0 && sale < 1, sostiene: sale === 0 ? [Math.round(122 + 3 * Math.sin(t * 8)), 140] : false, sonrisa: t > @(17.5), sinObjeto: true });
  T.amorDelante(R, t, { encuadre: 'taller', camara: 'mesa', tarjeta: tj });
  // hoy: la cuenta sube hasta cien millones
  if (t > mas - 0.1) { const e = tramo(t, mas, millon); R.numero(Math.round(1e8 * e).toLocaleString('en-US'), 150, 44, { tam: 16, centro: true }); }
  // gag 3: la uva se pinta un corazón, se lo da a la uva verde y la verde se va rodando
  const pinta = tramo(t, @(19.6), @(20.3)), va = tramo(t, @(20.4), @(21.0)), da = tramo(t, @(21.0), @(21.4)), rueda = tramo(t, @(21.7), @(23.0));
  const xa = Math.round(lerp(220, 244, va)), xb = Math.round(lerp(274, 352, rueda)), yb = 174 - (rueda > 0 ? Math.round(Math.abs(Math.sin(t * 16)) * 3) : 0);
  T.uva(R, xa, 174, t, { s: 2, cara: rueda > 0.25 ? 'susto' : pinta > 0 && pinta < 1 ? 'feliz' : 'normal', corre: va > 0 && va < 1, corazon: pinta >= 1 && da === 0 });
  if (pinta > 0 && pinta < 1) { const px = xa + 10, py = 160 - Math.round(Math.abs(Math.sin(t * 14)) * 4); R.linea(px, py, px + 7, py - 8, c('#8a5a30')); R.linea(px + 1, py, px + 8, py - 8, c('#5a3418')); R.rect(px - 1, py, px + 1, py + 2, c(ROJO)); }
  T.uva(R, xb, yb, t, { s: 2, color: 'verde', cara: da >= 1 ? 'feliz' : 'normal', corre: rueda > 0, corazon: da >= 1, dir: rueda > 0 ? (cada(t, 7) ? 1 : -1) : -1 });
  if (da > 0 && da < 1) R.icono('corazon', Math.round(lerp(xa - 4, xb - 8, da)), Math.round(150 - Math.sin(da * Math.PI) * 14), c('#d8303a'), K, 2);
};
const efectos = [[3.75, 'papel'], [penny, 'sello'], [tens, 'sello'], [hundreds, 'sello'], [recorta, 'papel'], [anios40, 'brillo'], [millon, 'brillo'], [@(19.65), 'lapiz'], [@(21.4), 'pop'], [@(21.75), 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P3 ? 1840 : t < hoyT ? 1848 : 2026 });
'''))

# ── tr-huevos ───────────────────────────────────────────────────────────────────────────────────────────
E['tr-huevos'] = ('Huevos', '''// TR-HUEVOS (frase 12), una aldea de hacia 1450. Cuatro planos:
// 1. (0 → «Christians») FONDO LOCAL: el corral en primavera, el gallinero de tablas con sus nidales, el almendro en flor
//    y, al fondo en la colina, la iglesia con su campana; la labriega recoge huevos del nidal, la gallina se levanta y en
//    «eggs» levanta uno a la luz; en «Easter» la campana se mece y la niña llega corriendo y la señala;
// 2. («Christians» → «why») la cocina: la madre ordena los huevos tras la mesa, el padre entra de domingo con un ramo de
//    lirios y lo pone en la jarra; por la ventana la campana de la iglesia; en «question» el niño se vuelve con un «?»;
// 3. («why» → «the hens») FONDO LOCAL, la despensa (inserto): la cesta grande en la mesa; en «rabbit» asoma una liebre con
//    su «?» y se va; una gallina pone en «explanation» y el huevo rueda a la cesta; en «Lent» la pizarra se llena de 40
//    rayas y el cuenco de huevos; una mano va a coger uno y la gallina se la picotea («didn't eat them»);
// 4. («the hens» → fin) la mesa de los tintes: la cesta se llena, la gallina pone en la ventana, la madre moja un huevo
//    en el tinte («boiled»), una mano con pincel pinta la fila («painted») y la madre le regala uno a la niña («given»).''', _con('huevos', 0.9, 26.202, COMUN + r'''
const P2 = @(6.54), P3 = @(13.58), P4 = @(20.04);
const huevosW = @(3.36), pascua = @(4.20), celebra = @(7.94), jesus = @(9.58), pregunta = @(11.14), ninos = @(12.70);
const conejo = @(14.14), explica = @(16.84), cuaresma = @(18.06), noComen = @(18.94), sobran = @(22.16), hierven = @(23.68), pintan = @(24.44), regalan = @(25.10);
// ── plano 1: el corral (fondo local) ──
let FC = null, FCS = null;
const corral = () => {
  if (FC) return FC;
  FCS = R.nuevo(); let prev = R.usar(FCS); cieloTramado(100, ['#5d9ad8', '#72aae0', '#88bae8', '#a2cbef', '#bedcf4']); R.usar(prev);
  const b = R.nuevo(); prev = R.usar(b); R.copiar(FCS);
  const ps = R.pset, rc = R.rect;
  // las colinas lejanas, azuladas
  for (let x = 0; x < 320; x++) { const top = Math.round(80 + 6 * Math.sin(x / 37) + 3 * Math.sin(x / 13 + 2)); for (let y = top; y < 112; y++) ps(x, y, (x + y) % 3 === 0 ? c('#a6c6ce') : c('#8eb4c4')); ps(x, top, c('#b8d4d8')); }
  // la colina de la iglesia, con lindes, setos y arbolitos
  const cima = (x) => Math.round(92 - 14 * Math.exp(-(((x - 226) / 58) ** 2)) + 3 * Math.sin(x / 19));
  const V1 = c('#6aa64a'), V2 = c('#5a963e'), V3 = c('#82ba58'), VD = c('#3e7a34');
  for (let x = 0; x < 320; x++) for (let y = cima(x); y < 126; y++) { const r = hh(x, y, 3); ps(x, y, y - cima(x) < 2 ? V3 : r < 0.12 ? V2 : r > 0.93 ? V3 : V1); }
  for (const [y0, k] of [[98, 1], [106, 2], [114, 3]]) for (let x = 0; x < 320; x++) { const y = Math.round(y0 + 3 * Math.sin(x / 23 + k)); if (y > cima(x) + 2 && hh(x, k) > 0.2) ps(x, y, V2); if (hh(x, k, 5) > 0.94 && y > cima(x) + 3) { R.disco(x, y - 1, 2, VD); ps(x - 1, y - 2, V3); } }
  const arbolito = (x, y, r) => { rc(x, y, x + 1, y + r + 2, c('#5a3a22')); R.disco(x, y, r, VD); R.disco(x - 1, y - 1, r - 1, c('#4e8a3a')); R.disco(x - 2, y - 2, Math.max(1, r - 3), c('#6aa84a')); };
  for (const [x, r] of [[18, 5], [92, 4], [130, 5], [166, 4], [276, 5], [300, 4]]) arbolito(x, cima(x) - r + 1, r);
  // el pueblo: casitas blancas de tejado rojo y el camino que sube a la iglesia
  for (const [x, w] of [[152, 12], [168, 10], [182, 12]]) { const y = cima(x + w / 2) + 2; rc(x, y - 7, x + w, y + 1, K); rc(x + 1, y - 6, x + w - 1, y, c('#efe8da')); for (let j = 0; j < 5; j++) rc(x - 1 + j, y - 8 - j, x + w + 1 - j, y - 8 - j, j === 0 ? K : c('#b8503a')); rc(x + 3, y - 4, x + 4, y - 2, c('#4a5a7a')); rc(x + w - 4, y - 3, x + w - 3, y, c('#6a4424')); }
  for (let k = 0; k < 30; k++) { const x = Math.round(196 - k * 1.5 + Math.sin(k / 3) * 4), y = cima(x) + 2 + Math.round(k * 0.6); if (k % 2) ps(x, y, c('#d8c89a')); }
  // la iglesia de piedra: nave, torre con el campanario y la cruz
  const PI = c('#d8d0c0'), PIS = c('#b4a890'), PIL = c('#ece6d8');
  const piedra = (x0, y0, x1, y1) => { rc(x0, y0, x1, y1, K); rc(x0 + 1, y0 + 1, x1 - 1, y1, PI); for (let y = y0 + 3; y < y1; y += 3) for (let x = x0 + 1 + ((y / 3) % 2) * 2; x < x1; x += 5) { ps(x, y, PIS); ps(x + 1, y, PIS); } rc(x0 + 1, y0 + 1, x0 + 1, y1, PIL); };
  piedra(196, 66, 228, 84);
  R.poligono([[194, 66], [230, 66], [224, 58], [200, 58]], K); R.poligono([[196, 65], [228, 65], [223, 59], [201, 59]], c('#9a4a3a'));
  for (let x = 199; x < 226; x += 3) R.linea(x, 60, x - 1, 65, c('#7a3428'));
  for (const wx of [203, 215]) { rc(wx, 70, wx + 3, 78, K); rc(wx + 1, 71, wx + 2, 77, c('#4a6aa8')); ps(wx + 1, 71, c('#8ab0e0')); }
  piedra(228, 38, 244, 84);
  rc(231, 45, 241, 57, K); rc(232, 46, 240, 57, c('#3a2e2a'));   // el hueco de la campana
  R.poligono([[226, 39], [246, 39], [236, 22]], K); R.poligono([[228, 38], [244, 38], [236, 24]], c('#5a6070')); R.linea(236, 25, 240, 37, c('#7a8090'));
  rc(235, 15, 237, 22, K); rc(233, 17, 239, 19, K); rc(236, 16, 236, 22, c('#e8d8a0')); rc(234, 18, 238, 18, c('#e8d8a0'));
  rc(232, 72, 239, 84, K); rc(233, 73, 238, 84, c('#6a3a1e')); ps(237, 79, c('#e8c840'));
  // el prado de delante, la cerca de mimbre y el almendro en flor
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < cima(x)) continue; const r = hh(x, y, 7); ps(x, y, r < 0.1 ? c('#68a83e') : r > 0.92 ? c('#9ad064') : c('#7cbc4c')); }
  for (let k = 0; k < 900; k++) { const x = Math.floor(hh(k, 1, 2) * 320), y = 124 + Math.floor(hh(k, 2, 2) * 56); rc(x, y - 1 - (k % 2), x, y, k % 3 ? c('#5a9a38') : c('#a2d46a')); }
  for (let x = 0; x < 320; x += 15) { rc(x, 110, x + 2, 134, K); rc(x + 1, 111, x + 1, 133, c('#7a5030')); }
  for (const y0 of [115, 120, 125, 130]) for (let x = 0; x < 320; x++) { const y = y0 + Math.round(Math.sin((x + y0 * 3) / 7.5)); ps(x, y, (Math.floor(x / 15) + y0) % 2 ? c('#a8763e') : c('#8a5a30')); }
  for (let y = -5; y <= 5; y++) for (let x = -26; x <= 26; x++) if ((x / 26) ** 2 + (y / 5) ** 2 <= 1 && (x + y) % 2 === 0) R.pset(46 + x, 152 + y, c('#5a963e'));
  // el patio de tierra con paja, guijarros y un charco
  for (let y = 146; y < 180; y++) for (let x = 60; x < 320; x++) { const d = ((x - 200) / 112) ** 2 + ((y - 166) / 18) ** 2; if (d > 1 + (hh(x, y, 4) - 0.5) * 0.3) continue; const r = hh(x, y, 5); ps(x, y, r < 0.18 ? c('#987448') : r > 0.85 ? c('#c8a46c') : c('#b08a5a')); }
  for (let k = 0; k < 70; k++) { const x = 100 + Math.floor(hh(k, 3, 6) * 200), y = 152 + Math.floor(hh(k, 4, 6) * 24), d = ((x - 200) / 112) ** 2 + ((y - 166) / 18) ** 2; if (d > 0.9) continue; if (k % 3) R.linea(x, y, x + 2, y - 1, c('#e8cc78')); else { ps(x, y, c('#9a948a')); ps(x + 1, y, c('#c8c2b8')); } }
  for (let y = -3; y <= 3; y++) for (let x = -15; x <= 15; x++) if ((x / 15) ** 2 + (y / 3.5) ** 2 <= 1) ps(118 + x, 170 + y, y < -1 ? c('#c8e0f4') : c('#9cc4e4'));
  R.linea(108, 169, 114, 169, c('#e8f4fc'));
  // el bebedero de madera
  rc(262, 149, 306, 160, K); rc(263, 150, 305, 159, c('#8a5a30')); rc(264, 151, 304, 152, c('#6aa0d0')); rc(268, 151, 276, 151, c('#b8dcf4')); for (let x = 266; x < 304; x += 8) ps(x, 156, c('#6a4424')); rc(264, 160, 266, 164, K); rc(302, 160, 304, 164, K);
  // el gallinero de tablas sobre patas, con tejado de tablillas, la puerta, la rampa y el nidal abierto
  for (const x of [152, 228]) rc(x, 140, x + 3, 154, K), rc(x + 1, 141, x + 2, 154, c('#5a3a1e'));
  rc(148, 102, 234, 141, K);
  for (let x = 149; x < 234; x++) for (let y = 103; y < 141; y++) { const p = (x - 149) % 7; ps(x, y, p === 0 ? c('#7a4e24') : p === 1 ? c('#c8925a') : hh(x, y, 8) > 0.9 ? c('#9a6a36') : c('#b07a40')); }
  for (let y = 88; y <= 104; y++) { const a = 142 + (104 - y) * 0.6, b2 = 240 - (104 - y) * 0.6; rc(Math.round(a), y, Math.round(b2), y, K); if (y > 88) for (let x = Math.round(a) + 1; x < Math.round(b2); x++) ps(x, y, ((x + (Math.floor((y - 88) / 3) % 2) * 3) % 6 === 0) ? c('#5a3428') : (Math.floor((y - 88) / 3) % 2 ? c('#94603e') : c('#7a4a34'))); }
  rc(152, 87, 230, 88, c('#4a2a20'));
  rc(155, 116, 169, 140, K); rc(156, 117, 168, 140, c('#3a2414')); rc(156, 117, 168, 118, c('#2a180c'));
  for (let i = 0; i <= 20; i++) { const x = Math.round(162 - i * 1.3), y = Math.round(141 + i * 0.9); rc(x - 4, y, x + 4, y + 1, K); rc(x - 3, y, x + 3, y, i % 4 === 0 ? c('#6a4424') : c('#a8763e')); }
  rc(193, 114, 231, 134, K); rc(194, 115, 230, 133, c('#4a2e18'));
  for (const x of [206, 218]) rc(x, 115, x + 1, 133, c('#7a4e24'));
  for (let x = 194; x <= 230; x++) { rc(x, 129 + (x % 3 === 0 ? -1 : 0), x, 133, x % 2 ? c('#e0c060') : c('#c8a040')); }
  rc(193, 134, 231, 138, K); rc(194, 135, 230, 137, c('#c8925a')); rc(194, 137, 230, 137, c('#8a5a30'));
  // el almendro en flor de la izquierda (tronco, ramas y copa rosa de tres tonos)
  rc(40, 92, 48, 152, K); rc(41, 93, 47, 152, c('#6a4428')); for (let y = 96; y < 150; y += 5) ps(43 + (y % 3), y, c('#4a2e1a')); rc(46, 93, 46, 150, c('#8a5e3a'));
  R.linea(44, 100, 26, 84, c('#5a3a22')); R.linea(45, 98, 66, 80, c('#5a3a22'));
  for (const [x, y, r] of [[44, 74, 22], [24, 84, 14], [66, 82, 15], [38, 62, 13], [56, 64, 12]]) R.disco(x, y + 2, r, c('#d07894'));
  for (const [x, y, r] of [[44, 74, 22], [24, 84, 14], [66, 82, 15], [38, 62, 13], [56, 64, 12]]) R.disco(x, y, r - 1, c('#f0a8be'));
  for (const [x, y, r] of [[40, 70, 13], [22, 80, 8], [62, 78, 9], [36, 58, 8], [54, 61, 7]]) R.disco(x, y, r, c('#fcd0de'));
  for (let k = 0; k < 90; k++) { const a = hh(k, 9) * 6.28, r = Math.sqrt(hh(k, 10)) * 30; const x = Math.round(44 + Math.cos(a) * r), y = Math.round(74 + Math.sin(a) * r * 0.8); ps(x, y, k % 3 ? c('#ffffff') : c('#b85a78')); }
  // flores del prado: margaritas y dientes de león
  for (let k = 0; k < 60; k++) { const x = Math.floor(hh(k, 11) * 320), y = 136 + Math.floor(hh(k, 12) * 44); const d = ((x - 200) / 112) ** 2 + ((y - 166) / 18) ** 2; if (d < 1.15) continue; if (k % 2) { for (const [a, b3] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) ps(x + a, y + b3, c('#ffffff')); ps(x, y, c('#f0c030')); } else { ps(x, y, c('#f0c030')); ps(x + 1, y, c('#f8d850')); ps(x, y + 1, c('#5a9a38')); } }
  R.usar(prev); return (FC = b);
};
const campana = (t, x0, y0, ini) => {
  const v = t > ini ? Math.sin((t - ini) * 5.5) * Math.min(1, (t - ini) * 2.5) : 0, ANCH = [1, 2, 2, 3, 3, 4, 4];
  for (let j = 0; j < 7; j++) { const cx = Math.round(x0 + v * 3 * (j / 6)); R.rect(cx - ANCH[j] - 1, y0 + j, cx + ANCH[j] + 1, y0 + j, K); R.rect(cx - ANCH[j], y0 + j, cx + ANCH[j], y0 + j, j === 6 ? c('#8a6a20') : c('#d8b040')); R.pset(cx - ANCH[j] + 1, y0 + j, c('#f8e090')); }
  R.pset(Math.round(x0 + v * 4), y0 + 8, K);
  if (Math.abs(v) > 0.6) for (const s of [-1, 1]) { const dx = s * (9 + Math.round((t * 6) % 3)); R.pset(x0 + dx, y0 + 2, c('#f8f4e0')); R.pset(x0 + dx + s, y0 + 3, c('#f8f4e0')); R.pset(x0 + dx, y0 + 4, c('#f8f4e0')); }
};
const pollitos = (t, x, y) => { for (let k = 0; k < 3; k++) { const px = Math.round(x - 10 - k * 6 + Math.sin(t * 3 + k) * 2), py = y - (cada(t * 1.3 + k * 0.3, 3) ? 1 : 0); R.rect(px - 2, py - 3, px + 1, py, K); R.rect(px - 1, py - 2, px, py - 1, c('#f8d850')); R.pset(px + 2, py - 2, c('#e08a20')); } };
const p1 = (t) => {
  R.copiar(corral());
  nubes(t, [[20, 24, 30, 2.2], [170, 32, 22, 3.4], [300, 20, 36, 1.6]]);
  pajaros(t, [[40, 50, 9, 1], [60, 46, 9, 2], [250, 58, -7, 3]]);
  for (let y = 12; y < 48; y++) for (let x = 224; x < 248; x++) { const i = y * 320 + x; if (FC[i] !== FCS[i]) R.pset(x, y, FC[i]); }
  campana(t, 236, 47, pascua);
  // los pétalos que caen del almendro
  for (let k = 0; k < 10; k++) { const a = (t * 0.22 + k / 10) % 1; R.pset(Math.round(20 + k * 7 + Math.sin(t * 2 + k) * 4 + a * 30), Math.round(70 + a * 90), k % 2 ? c('#fcd0de') : c('#f0a8be')); }
  // los huevos del nidal: el primero (2), el de la gallina (2) y el tercero (los coge la labriega)
  for (const x of [198, 203]) pz('huevo', x, 133, { color: x === 198 ? 'blanco' : 'marron' });
  const quedan3 = t < 0.6 ? 2 : t < 1.8 ? 1 : 0;
  for (let k = 0; k < quedan3; k++) pz('huevo', 222 + k * 5, 133, { color: k ? 'marron' : 'blanco' });
  const coge2 = t > 2.9;
  if (!coge2) pz('huevo', 214, 133, {}); pz('huevo', 209, 133, { color: 'marron' });
  // la gallina del nidal se levanta en «spring» y baja al patio
  const g = tramo(t, 2.0, 2.7), gx = Math.round(lerp(212, 250, g)), gy = Math.round(lerp(130, 166, g) - Math.sin(g * Math.PI) * 10);
  pz('gallina', gx, gy, { t, picotea: g >= 1, dir: 1 });
  pz('gallina', Math.round(112 + Math.sin(t * 0.6) * 10), 162, { t, picotea: true, dir: Math.cos(t * 0.6) > 0 ? 1 : -1 });
  pollitos(t, Math.round(112 + Math.sin(t * 0.6) * 10), 163);
  pz('gallina', Math.round(lerp(300, 268, tramo(t, 0, 6.5))), 170, { t, picotea: cada(t, 0.8), dir: -1, color: 'parda' });
  // la labriega coge los huevos y levanta uno a la luz en «eggs»; en «Easter» mira la campana
  let ml = false;
  if (t < 0.6) ml = [222, 128]; else if (t < 1.2) ml = [214, 140]; else if (t < 1.8) ml = [224, 128]; else if (t < 2.4) ml = [214, 140];
  else if (t > 2.75 && t < huevosW - 0.1) ml = [214, 128]; else if (t >= huevosW - 0.1 && t < 4.3) ml = [212, Math.round(lerp(128, 116, tramo(t, huevosW - 0.1, huevosW + 0.2)))];
  const lab = R.actor(EL.labriega, 196, 162, t, { dir: 1, sostiene: ml, sonrisa: t > huevosW, habla: t > 5.2 && t < 6.2 && cada(t, 5) });
  if (ml && ((t > 0.6 && t < 1.2) || (t > 1.8 && t < 2.4) || t >= huevosW - 0.1)) pz('huevo', lab.mano[0], lab.mano[1] + 1, { color: t >= huevosW - 0.1 ? 'blanco' : 'marron' });
  if (t >= huevosW && t < huevosW + 0.5) for (const [dx, dy] of [[-6, -10], [6, -10], [0, -14]]) R.pset(lab.mano[0] + dx, lab.mano[1] + dy, c('#ffe08a'));
  // la niña llega corriendo y señala la iglesia
  const n = tramo(t, pascua - 0.1, pascua + 0.9), xn = Math.round(lerp(-18, 124, n));
  if (n > 0) R.actor(EL.ninaCampo, xn, 166, t, { dir: 1, anda: n < 1, dedo: n >= 1, habla: n >= 1 && cada(t, 4), sonrisa: true });
  // las matas de delante
  for (let x = 2; x < 320; x += 9) { const y = 180, a = Math.round(Math.sin(t * 2 + x) * 1); R.linea(x, y, x + a - 1, y - 6, c('#3e7a2a')); R.linea(x + 2, y, x + 3 + a, y - 8, c('#5a9a38')); R.linea(x + 4, y, x + 5, y - 5, c('#3e7a2a')); }
};
// ── plano 2: la cocina ──
const p2 = (t) => {
  const hv = lerp(0.62, 0.9, tramo(t, jesus, jesus + 0.6));
  T.estaciones(R, t, { encuadre: 'gallinero', huevos: hv, pintados: 0 });
  // la madre ordena los huevos de la cesta al cuenco y le contesta al niño
  const f = ((t - P2) * 1.1) % 1;
  R.actor(EL.labriega, 142, 141, t, { dir: t > pregunta ? -1 : 1, sostiene: t < pregunta ? (f < 0.5 ? [128, 128] : [150, 128]) : t > ninos - 0.3 ? false : [140, 126], sonrisa: t > ninos - 0.3, habla: t > ninos && cada(t, 5), dedo: t > ninos + 0.4 });
  // el padre entra de domingo por la puerta con el ramo y lo deja en la jarra
  const e = tramo(t, P2 + 0.2, @(8.3)), xp = Math.round(lerp(232, 214, e)), yp = Math.round(lerp(126, 164, e)), deja = jesus;
  const pa = R.actor(EL.labriego, xp, yp, t, { dir: -1, anda: e > 0 && e < 1, sostiene: t < deja ? (t > deja - 0.5 ? [206, 128] : true) : false, sonrisa: t > celebra, habla: t > deja + 0.3 && t < pregunta && cada(t, 6) });
  // el niño mira el caldero y en «question» se vuelve a preguntar
  const nn = R.actor(EL.ninoCampo, 46, 170, t, { dir: t < pregunta ? -1 : 1, salto: t > pregunta && t < pregunta + 0.3 ? 2 : 0, dedo: t > pregunta + 0.5 && t < ninos + 0.6, habla: t > pregunta && t < ninos && cada(t, 6) });
  T.estacionesDelante(R, t, { encuadre: 'gallinero', huevos: hv, pintados: 0 });
  // los lirios: en la mano y luego en la jarra
  const ramo = (x, y) => { R.linea(x, y, x - 2, y - 9, c('#3e7a2a')); R.linea(x, y, x + 2, y - 8, c('#3e7a2a')); R.linea(x, y, x, y - 11, c('#4e8a3a')); for (const [a, b] of [[-3, -10], [3, -9], [0, -12]]) { R.rect(x + a - 1, y + b - 1, x + a + 1, y + b, c('#ffffff')); R.pset(x + a, y + b, c('#f0c030')); } };
  if (t < deja) ramo(pa.mano[0], pa.mano[1] + 2);
  R.rect(198, 126, 206, 136, K); R.rect(199, 127, 205, 135, c('#b86a3a')); R.rect(199, 127, 205, 128, c('#d88a5a')); R.rect(200, 125, 204, 126, K);
  if (t >= deja) ramo(202, 126);
  if (t > pregunta + 0.1 && t < P3 - 0.1) R.bocadillo(nn.cabeza[0], nn.cabeza[1] - 4, { icono: '?' });
};
// ── plano 3: la despensa (fondo local, inserto) ──
let FD = null;
const despensa = () => {
  if (FD) return FD;
  const b = R.nuevo(), prev = R.usar(b), ps = R.pset, rc = R.rect;
  // la pared encalada, con la piedra que asoma, manchas y grietas
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) { const r = hh(x >> 1, y >> 1, 1); ps(x, y, r < 0.08 ? c('#d8ccb4') : r > 0.95 ? c('#f6f0e2') : c('#ebe2cc')); }
  for (const [x, y, w, hgt] of [[96, 30, 14, 7], [128, 112, 12, 6], [300, 120, 10, 6], [180, 20, 9, 5], [12, 104, 11, 6], [150, 64, 8, 5]]) for (let j = -hgt; j <= hgt; j++) for (let i = -w; i <= w; i++) { const d = (i / w) ** 2 + (j / hgt) ** 2; if (d <= 1) ps(x + i, y + j, d > 0.75 ? c('#a89a80') : (i + j) % 4 === 0 ? c('#b8ac94') : c('#c8bca4')); }
  for (const [x, y, k] of [[190, 40, 1], [120, 84, 2], [304, 64, 3]]) { let xx = x, yy = y; for (let i = 0; i < 14; i++) { ps(xx, yy, c('#b8ac94')); xx += hh(i, k) > 0.5 ? 1 : 0; yy += 1; } }
  // la viga de arriba con su veta
  rc(0, 0, 319, 9, c('#5a3a22')); for (let x = 0; x < 320; x += 1) if (hh(x, 1, 4) > 0.86) rc(x, 2 + Math.floor(hh(x, 2, 4) * 5), x + 3, 2 + Math.floor(hh(x, 2, 4) * 5), c('#4e321e')); rc(0, 9, 319, 9, c('#3a2414')); rc(0, 10, 319, 11, c('#d0c4ac'));
  // las ristras colgadas: ajos, hierbas y cebollas
  for (const [x, tipo] of [[112, 'ajo'], [148, 'hierba'], [184, 'cebolla']]) { R.linea(x, 10, x, 24, c('#8a7a5a')); for (let k = 0; k < 6; k++) { const yy = 24 + k * 4, xx = x + (k % 2 ? 2 : -2); if (tipo === 'hierba') { R.linea(xx, yy, xx - 2, yy + 5, c('#4e8a3a')); R.linea(xx, yy, xx + 2, yy + 5, c('#6aa84a')); } else { R.disco(xx, yy + 2, 2, K); R.disco(xx, yy + 2, 1, tipo === 'ajo' ? c('#f2ecdc') : c('#c8803a')); ps(xx - 1, yy + 1, tipo === 'ajo' ? c('#ffffff') : c('#e8a050')); } } }
  // la ventana de la izquierda: el derrame, el marco, el cielo y una rama en flor; la maceta de prímulas
  rc(18, 22, 86, 92, c('#d4c8b0')); rc(24, 28, 80, 88, K);
  for (let y = 29; y < 88; y++) for (let x = 25; x < 80; x++) { const u = (y - 29) / 59 * 3 + ((x + y) & 1 ? 0.3 : -0.3); ps(x, y, u < 1 ? c('#78aee4') : u < 2 ? c('#94c2ec') : c('#b4d6f2')); }
  for (let x = 25; x < 80; x++) { const top = Math.round(74 + 4 * Math.sin(x / 9)); for (let y = top; y < 88; y++) ps(x, y, y === top ? c('#8ac060') : c('#6aa64a')); }
  R.nube(46, 40, 16);
  R.linea(80, 44, 50, 60, c('#5a3a22')); R.linea(66, 52, 60, 44, c('#5a3a22'));
  for (const [x, y] of [[56, 56], [62, 52], [70, 50], [60, 44], [74, 46], [52, 60]]) { R.disco(x, y, 2, c('#f0a8be')); ps(x, y, c('#fcd0de')); }
  rc(51, 28, 53, 88, c('#6a4a2a')); rc(25, 57, 79, 59, c('#6a4a2a')); rc(24, 28, 80, 29, c('#4a3018'));
  rc(16, 90, 88, 95, K); rc(17, 91, 87, 94, c('#c8bca4')); rc(17, 91, 87, 91, c('#e0d6c0'));
  rc(60, 82, 72, 90, K); rc(61, 83, 71, 90, c('#b86a3a')); for (const [x, y, col] of [[63, 79, '#f0d040'], [67, 77, '#f8e070'], [70, 80, '#f0d040']]) { R.disco(x, y, 2, c(col)); ps(x, y, c('#e08a20')); } R.linea(66, 82, 64, 79, c('#4e8a3a'));
  // la balda con orzas, una botella, el tarro de miel y un saquito
  rc(94, 96, 204, 99, K); rc(95, 96, 203, 98, c('#8a5a30')); rc(95, 96, 203, 96, c('#a8763e'));
  for (const x of [100, 196]) { R.linea(x, 99, x + 4, 106, K); R.linea(x + 1, 99, x + 5, 106, c('#6a4424')); }
  const orza = (x, w, hgt, col) => { rc(x - w, 96 - hgt, x + w, 95, K); rc(x - w + 1, 97 - hgt, x + w - 1, 95, c(col)); rc(x - w + 1, 97 - hgt, x - w + 2, 95, c('#f0d0a0')); rc(x - w + 2, 95 - hgt, x + w - 2, 96 - hgt, K); };
  orza(108, 6, 14, '#b86a3a'); orza(124, 5, 11, '#8a6a4a'); orza(160, 6, 12, '#e0a030'); orza(176, 4, 16, '#7ab0a0'); orza(190, 5, 9, '#c8b088');
  rc(138, 86, 150, 95, K); rc(139, 87, 149, 95, c('#d8c49a')); R.linea(139, 88, 149, 88, c('#8a7a5a'));
  // la pizarra de la Cuaresma colgada de un clavo
  R.linea(256, 40, 214, 52, c('#8a7a5a')); R.linea(256, 40, 298, 52, c('#8a7a5a')); ps(256, 39, K);
  rc(208, 50, 302, 106, K); rc(209, 51, 301, 105, c('#8a5a30')); rc(212, 54, 298, 102, c('#2e3438')); for (let k = 0; k < 40; k++) ps(214 + Math.floor(hh(k, 5) * 82), 56 + Math.floor(hh(k, 6) * 44), c('#3e464c'));
  // la mesa de tablas con el paño de lino
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const r = hh(x >> 2, y, 3); ps(x, y, (y - 132) % 12 === 0 ? c('#6a4024') : r < 0.12 ? c('#94603a') : r > 0.9 ? c('#c08a52') : c('#a87444')); }
  rc(0, 132, 319, 133, c('#c89a62'));
  for (let y = 138; y < 172; y++) for (let x = 96; x < 214; x++) ps(x, y, (x < 102 || x > 207) ? c('#5a7ab0') : (x + y) % 5 === 0 ? c('#ddd4c0') : c('#efe8d6'));
  rc(96, 137, 213, 137, c('#c8bea8')); rc(96, 172, 213, 172, c('#c8bea8'));
  // la jarra, el pan y el cuchillo
  rc(288, 120, 306, 158, K); rc(289, 121, 305, 157, c('#b86a3a')); rc(289, 121, 292, 157, c('#d88a5a')); for (let y = 126; y < 156; y += 6) rc(293, y, 304, y, c('#9a5428')); rc(290, 116, 304, 121, K); rc(291, 117, 303, 120, c('#9a5a2a')); R.linea(306, 126, 312, 132, K); R.linea(312, 132, 306, 146, K);
  for (let j = 0; j < 9; j++) rc(234 - (j < 4 ? j : 8 - j), 150 + j, 266 + (j < 4 ? j : 8 - j), 150 + j, j === 0 || j === 8 ? K : j < 3 ? c('#d8a060') : c('#b87a3a'));
  for (const x of [242, 250, 258]) R.linea(x, 152, x + 3, 151, c('#8a5428'));
  rc(236, 166, 266, 167, c('#c8ccd8')); rc(266, 165, 276, 168, c('#5a3418'));
  R.disco(282, 168, 3, K); R.disco(282, 168, 2, c('#e8e4dc')); R.pset(281, 167, c('#ffffff'));
  R.usar(prev); return (FD = b);
};
const cuenco = (x, y, n) => {
  const pos = [[-8, 0], [0, 0], [8, 0], [-4, -5], [4, -5], [0, -10], [-8, -6], [8, -6]];
  for (let k = 0; k < Math.min(8, n); k++) pz('huevo', x + pos[k][0], y - 2 + pos[k][1], { s: 2, color: k % 2 ? 'marron' : 'blanco' });
  for (let j = 0; j < 9; j++) { const w = 16 - Math.round(j * j * 0.12); R.rect(x - w - 1, y - 2 + j, x + w + 1, y - 2 + j, K); if (j < 8) R.rect(x - w, y - 2 + j, x + w, y - 2 + j, j < 2 ? c('#a8764a') : c('#7a5030')); }
};
const cestaGrande = (cx, base, n) => {
  // el asa por detrás, los huevos asomando y el cuerpo de mimbre trenzado con su borde
  for (let a = 0; a <= 60; a++) { const u = a / 60 * Math.PI, x = Math.round(cx - Math.cos(u) * 24), y = Math.round(base - 26 - Math.sin(u) * 22); R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, c('#c8964a')); }
  const pos = [[-14, 0], [-4, -2], [6, 0], [16, -1], [-9, -6], [1, -7], [11, -6]];
  for (let k = 0; k < Math.min(7, n); k++) pz('huevo', cx + pos[k][0], base - 22 + pos[k][1], { s: 2, color: k % 3 === 1 ? 'marron' : 'blanco' });
  for (let j = 0; j < 26; j++) { const w = 26 - Math.round(j * 0.2); R.rect(cx - w - 1, base - 26 + j, cx + w + 1, base - 26 + j, K); if (j > 0 && j < 25) for (let x = cx - w; x <= cx + w; x++) R.pset(x, base - 26 + j, ((x + (Math.floor(j / 3) % 2) * 3) % 6 < 3) ? (j % 3 === 0 ? c('#8a5a2a') : c('#c8964a')) : (j % 3 === 0 ? c('#6a4220') : c('#a8763a'))); }
  R.rect(cx - 27, base - 28, cx + 27, base - 25, K); R.rect(cx - 26, base - 27, cx + 26, base - 26, c('#d8a860'));
  for (let x = cx - 26; x <= cx + 26; x += 3) R.pset(x, base - 27, c('#8a5a2a'));
};
const rayas = (n) => { for (let k = 0; k < n; k++) { const g = Math.floor(k / 5), i = k % 5, fila = Math.floor(g / 4), gx = 218 + (g % 4) * 20, gy = 60 + fila * 22; if (i < 4) R.rect(gx + i * 3, gy, gx + i * 3, gy + 13, c('#eceee8')); else R.linea(gx - 2, gy + 11, gx + 12, gy + 2, c('#eceee8')); } };
const p3 = (t) => {
  R.copiar(despensa());
  // la pizarra: las rayas de los cuarenta días se llenan en «Lent»
  const nr = Math.round(40 * tramo(t, cuaresma, @(19.7))); rayas(nr);
  if (nr >= 40) R.numero('40', 255, Math.round(lerp(130, 124, tramo(t, @(19.7), @(19.95)))), { tam: 16, centro: true });
  // la liebre asoma en «rabbit» con su «?» y se va por la derecha
  const li = tramo(t, P3 + 0.1, conejo), lo = tramo(t, @(15.3), @(15.8));
  if (lo < 1) { const xl = Math.round(lerp(344, 222, li) + lo * 130); pz('liebre', xl, 168, { t, s: 2, salta: (li > 0 && li < 1) || lo > 0, dir: lo > 0 ? 1 : -1 }); if (li >= 1 && lo === 0 && t > conejo + 0.15) R.bocadillo(xl - 4, 128, { icono: '?' }); }
  // la cesta grande: 3 huevos; uno más cuando rueda el de la gallina, y otro en la Cuaresma
  const rueda = tramo(t, explica + 0.05, explica + 0.6);
  cestaGrande(156, 170, rueda >= 1 ? (t > @(19.2) ? 7 : 6) : 5);
  // la gallina llega por la izquierda, pone en «explanation» y le pica la mano al que quiere coger un huevo
  const g = tramo(t, @(15.5), @(16.4)), xg = Math.round(lerp(-24, 82, g)), pica = t > noComen - 0.1 && t < noComen + 0.35;
  pz('gallina', xg, 168 - (pica ? 2 : 0), { t, s: 2, picotea: (g >= 1 && t < explica - 0.3) || pica, dir: pica ? -1 : 1 });
  if (t > explica - 0.05 && rueda < 1) pz('huevo', Math.round(lerp(100, 132, rueda)), 170, { s: 2 });
  // el cuenco de huevos de la izquierda se llena en la Cuaresma
  cuenco(38, 160, 2 + Math.round(6 * tramo(t, cuaresma, @(19.7))));
  // la mano que va a coger un huevo y se retira
  const va = tramo(t, @(18.45), noComen), vuelve = tramo(t, noComen + 0.15, noComen + 0.6), am = va * (1 - vuelve);
  if (am > 0.02) T.brazo(R, -22, 214, Math.round(lerp(-6, 34, am)), Math.round(lerp(196, 150, am)), '#6a7a9a', 1, { codo: [Math.round(lerp(-12, 6, am)), Math.round(lerp(200, 176, am))] });
  if (pica) R.icono('!', 52, 128, c('#d83030'), K, 2);
};
// ── plano 4: la mesa de los tintes ──
const p4 = (t) => {
  const hv = lerp(0.55, 1, tramo(t, P4, sobran)), pin = tramo(t, pintan - 0.1, @(25.4));
  T.estaciones(R, t, { encuadre: 'gallinero', camara: 'cestas', huevos: hv, pintados: pin });
  // la gallina de la ventana pone en «kept laying»
  pz('gallina', 248, 90, { t, picotea: t > @(21.0), dir: -1 }); if (t > @(20.58)) pz('huevo', 260, 91, {});
  // la madre llena la cesta, moja un huevo en el tinte caliente y luego lleva uno pintado a la niña
  const f = ((t - P4) * 1.4) % 1, lleva = tramo(t, @(24.7), @(25.35));
  let ml = false;
  if (t < sobran) ml = f < 0.5 ? [84, 104] : [104, 110];
  else if (t > hierven - 0.4 && t < hierven + 0.5) ml = [136, t < hierven ? 112 : 118];
  else if (t >= @(24.7)) ml = [Math.round(lerp(122, 186, lleva)) + 10, lleva >= 1 ? 104 : 106];
  const xm = Math.round(lerp(106, 170, lleva));
  const ma = R.actor(EL.labriega, xm, 118, t, { dir: 1, anda: lleva > 0 && lleva < 1, sostiene: ml, sinObjeto: true, sonrisa: t > sobran, habla: t > regalan && cada(t, 5) });
  // la niña llega por la derecha y recibe el huevo pintado
  const n = tramo(t, @(24.3), @(25.0)), xn = Math.round(lerp(330, 202, n)), tiene = t > @(25.45);
  const ni = R.actor(EL.ninaCampo, xn, 118, t, { dir: -1, anda: n > 0 && n < 1, sostiene: tiene ? [200, 100] : false, sonrisa: tiene, salto: tiene && t < @(25.8) ? 2 : 0 });
  T.estacionesDelante(R, t, { encuadre: 'gallinero', camara: 'cestas', huevos: hv, pintados: pin });
  if (t < sobran && f < 0.5) pz('huevo', ma.mano[0], ma.mano[1] + 2, { color: 'marron' });
  if (t > hierven - 0.4 && t < hierven + 0.5) { pz('huevo', ma.mano[0], ma.mano[1] + 3, { color: t > hierven ? 'rojo' : 'blanco' }); for (let k = 0; k < 5; k++) { const a = (t * 0.8 + k / 5) % 1; R.pset(Math.round(124 + k * 6 + Math.sin(t * 3 + k) * 2), Math.round(118 - a * 26), c('#f4f0ea')); } }
  if (t >= hierven + 0.5) for (let k = 0; k < 3; k++) { const a = (t * 0.6 + k / 3) % 1; R.pset(Math.round(130 + k * 8 + Math.sin(t * 2 + k) * 2), Math.round(116 - a * 18), c('#e8e4dc')); }
  if (t >= @(24.7) && !tiene) pz('huevo', ma.mano[0], ma.mano[1] + 3, { color: 'azul', dibujo: 'rayas' });
  if (tiene) { pz('huevo', ni.mano[0], ni.mano[1] + 3, { color: 'azul', dibujo: 'rayas' }); if (t < @(26.1)) for (const [dx, dy] of [[-6, -8], [6, -8], [0, -12]]) R.pset(ni.mano[0] + dx, ni.mano[1] + dy, c('#ffe08a')); }
  // la mano con el pincel pinta la fila de huevos en «painted»
  if (pin > 0 && pin < 1) { const bx = Math.round(210 + pin * 7.6 * 13); T.brazo(R, bx + 34, 214, bx + 8, 160, '#a8503a', -1, { codo: [bx + 26, 186] }); R.linea(bx + 2, 160, bx - 3, 152, c('#8a5a30')); R.rect(bx - 4, 151, bx - 3, 152, c('#d8303a')); }
};
const efectos = [[huevosW, 'pop'], [pascua, 'campana'], [celebra, 'campana'], [jesus, 'golpecito'], [pregunta + 0.1, 'pop'], [conejo - 0.2, 'boing'], [explica, 'pop'], [noComen, 'toc'], [@(20.58), 'pop'], [hierven, 'burbujas'], [pintan, 'lapiz'], [@(25.45), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1450 });
'''))

# ── tr-liebre ───────────────────────────────────────────────────────────────────────────────────────────
E['tr-liebre'] = ('La liebre', '''// TR-LIEBRE (frase 13), cartela «1682». Cinco planos (27,8 s: con cuatro, uno pasaba de 7 s):
// 1. (0 → «which») el jardín alemán de 1682: una liebre cruza el césped a saltos y se sienta en «hare»; el erudito de
//    peluca sale de la casa con su libro y en «writing» se pone a escribir; mira a la liebre, que se va hacia los arbustos;
// 2. («which» → «In») los arbustos de cerca: la liebre esconde los huevos de colores uno a uno («hides eggs»), los niños
//    de 1682 llegan en «children» y la niña encuentra uno; gag 4: la uva escondida entre los huevos, la liebre la pinta
//    de colores y se mete tras la mata;
// 3. («In the 1700s» → «And») FONDO LOCAL, el mar: el barco de los emigrantes alemanes cruza el océano y llega a la costa
//    de Pensilvania («Pennsylvania»: el padre señala, el niño salta);
// 4. («And the idea» → «The») la granja de Pensilvania: la madre sale y les cuenta a los niños lo de la diosa de la
//    primavera con su liebre (un bocadillo), y en «no evidence» el bocadillo se tacha con una X y se deshace;
// 5. («The hare was added» → fin) el porche: la niña deja el sombrero de paja como nido, la liebre llega y pone los
//    huevos de colores («century») y la niña asoma por la puerta.''', _con('liebre', 1.5, 25.018, COMUN + r'''
const P2 = @(7.04), P3 = @(13.92), P4 = @(18.16), P5 = @(22.64);
const liebreW = @(2.52), escribe = @(4.24), anio = @(5.98), esconde = @(10.00), huevosW = @(10.36), ninos = @(11.00);
const penn = @(16.88), primavera = @(19.74), sinPrueba = @(21.72), siglo = @(24.46);
const COLS = ['rojo', 'azul', 'amarillo', 'verde', 'morado', 'rosa', 'naranja', 'azul'];
// ── plano 1: el jardín ──
const p1 = (t) => {
  T.estaciones(R, t, { encuadre: 'jardin', huevos: 0 });
  // el erudito sale de la casa con su libro, baja al camino y escribe
  const e = tramo(t, @(3.0), @(4.1)), xe = Math.round(lerp(260, 226, e)), ye = Math.round(lerp(138, 156, e));
  const sale = t > @(2.9);
  let er = null;
  if (sale) er = R.actor(EL.erudito, xe, ye, t, { dir: t > anio ? -1 : 1, anda: e > 0 && e < 1, sostiene: e >= 1 ? [t > anio ? xe - 2 : xe + 17, ye - 13] : false, sorpresa: t > anio && t < anio + 0.5, sonrisa: t > anio + 0.5 });
  // la liebre llega a saltos, se sienta en «hare», mira al erudito y se va hacia la derecha
  const l = tramo(t, 0.9, liebreW), lv = tramo(t, @(6.2), P2 + 0.2), xl = Math.round(lerp(-30, 118, l) + lv * 220);
  pz('liebre', xl, 170, { t, s: 2, salta: (l > 0 && l < 1) || lv > 0, dir: 1 });
  if (l >= 1 && lv === 0 && t > anio && t < anio + 0.6) R.icono('!', xl - 2, 126, c('#d83030'), K, 2);
  T.estacionesDelante(R, t, { encuadre: 'jardin', huevos: 0 });
  // el libro abierto y la pluma que escribe
  if (er && e >= 1) { const [mx, my] = er.mano; R.rect(mx - 6, my - 3, mx + 6, my + 3, K); R.rect(mx - 5, my - 2, mx - 1, my + 2, c('#f4ecd6')); R.rect(mx + 1, my - 2, mx + 5, my + 2, c('#f4ecd6')); R.rect(mx, my - 2, mx, my + 2, c('#8a7a5a')); const n = Math.min(3, Math.floor((t - escribe) * 2)); for (let k = 0; k < n; k++) R.rect(mx + 2, my - 1 + k, mx + 4, my - 1 + k, c('#5a5060')); if (t > escribe && t < anio) { const q = Math.round(Math.sin(t * 12) * 1); R.linea(mx + 3 + q, my, mx + 8 + q, my - 7, c('#f8f4ec')); R.pset(mx + 3 + q, my, K); } }
};
// ── plano 2: los arbustos ──
const HUEVOS2 = [[36, 140], [92, 132], [138, 144], [184, 128], [222, 142], [116, 160]];
const p2 = (t) => {
  T.estaciones(R, t, { encuadre: 'jardin', camara: 'arbustos', huevos: 0 });
  // la liebre cruza con la cesta y deja un huevo en cada mata; luego se esconde tras la mata blanca
  const h0 = P2 + 0.9, paso = (huevosW + 0.5 - h0) / 4;
  const tiempos = HUEVOS2.map((q, k) => k < 5 ? h0 + k * paso : h0 + 1.6 * paso);
  const encontrado = @(12.3);
  HUEVOS2.forEach(([x, y], k) => { if (t > tiempos[k] && !(k === 1 && t > encontrado)) pz('huevo', x, y, { s: 2, color: COLS[k] }); });
  // la uva escondida entre los huevos (gag 4)
  const pinta = tramo(t, @(12.4), @(13.0)), uvaC = pinta >= 1;
  const ux = Math.round(lerp(340, 202, tramo(t, @(11.2), @(11.9))));
  if (t > @(11.2)) T.uva(R, ux, 166, t, { s: 2, corre: t < @(11.9), cara: t > @(12.2) && t < @(13.3) ? 'susto' : 'normal', color: uvaC ? 'colores' : 'morada', dir: -1 });
  if (uvaC && t < @(13.6)) for (const [dx, dy] of [[-16, -30], [16, -30], [0, -38], [-20, -16], [20, -16]]) R.pset(202 + dx, 166 + dy, c('#ffe08a'));
  let xl, sal = true, dl = 1;
  if (t < h0 - 0.4) xl = Math.round(lerp(-30, 20, tramo(t, P2, h0 - 0.4)));
  else if (t < huevosW + 0.9) xl = Math.round(lerp(20, 250, tramo(t, h0 - 0.4, huevosW + 0.9)));
  else if (t < @(12.2)) { xl = 300; sal = false; }
  else if (t < @(13.1)) { xl = Math.round(lerp(300, 226, tramo(t, @(12.2), @(12.45)))); sal = t < @(12.45); dl = -1; }
  else { xl = Math.round(lerp(226, 300, tramo(t, @(13.1), @(13.6)))); }
  if (xl < 296) pz('liebre', xl, 170, { t, s: 2, salta: sal, dir: dl, cesta: t < huevosW + 0.9 });
  if (t > @(12.45) && t < @(13.1)) { const q = Math.round(Math.sin(t * 16) * 3); R.linea(xl - 18, 150 + q, xl - 10, 142, c('#8a5a30')); R.rect(xl - 20, 150 + q, xl - 18, 152 + q, c(COLS[Math.floor(t * 8) % 7])); }
  // los niños de 1682 llegan en «children»; la niña encuentra el huevo azul
  const nn = tramo(t, ninos - 0.1, ninos + 0.7);
  if (nn > 0) {
    const tiene = t > encontrado;
    const na = R.actor(EL.ninaBarroca, Math.round(lerp(-20, 80, nn)), 170, t, { dir: 1, anda: nn < 1, sostiene: tiene ? [Math.round(lerp(-20, 80, nn)) + 12, 136] : false, sonrisa: tiene, salto: tiene && t < encontrado + 0.3 ? 2 : 0 });
    R.actor(EL.ninoBarroco, Math.round(lerp(-44, 34, nn)), 172, t, { dir: nn < 1 ? 1 : -1, anda: nn < 1, dedo: tiene, habla: tiene && cada(t, 5) });
    if (tiene) pz('huevo', na.mano[0], na.mano[1] + 4, { s: 2, color: COLS[1] });
  }
  T.estacionesDelante(R, t, { encuadre: 'jardin', camara: 'arbustos', huevos: 0 });
};
// ── plano 3: el mar (fondo local sobre el océano del 10) ──
let CM = null;
const cieloMar = () => { if (CM) return CM; const b = R.nuevo(), prev = R.usar(b); cieloTramado(86, ['#4f8ad0', '#6a9ed8', '#86b2e0', '#a4c6e8', '#c4dcf0']); for (let r = 14; r >= 9; r--) R.disco(236, 28, r, r > 11 ? c('#d8e8f4') : c('#eef4f8')); R.disco(236, 28, 8, c('#fff4c8')); R.disco(235, 27, 6, c('#fffae6')); R.usar(prev); return (CM = b); };
const barco = (t, cx, wl) => {
  const X = (i) => cx + i;
  // las velas y los mástiles (detrás de la gente)
  const vela = (mx, y0, y1, w, k) => { const s = Math.round(Math.sin(t * 2 + k) * 1); for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), ww = Math.round(w * (0.82 + 0.18 * u)), b = Math.round(Math.sin(u * Math.PI) * (3 + s)); R.rect(X(mx - ww), y, X(mx + ww + b), y, K); if (y > y0 && y < y1) R.rect(X(mx - ww + 1), y, X(mx + ww + b - 1), y, u > 0.7 ? c('#d6c8a8') : (X(mx) + y) % 7 === 0 ? c('#e4d8bc') : c('#f2ead6')); } R.rect(X(mx - w), y0 - 1, X(mx + w), y0, c('#5a3a22')); };
  for (const [mx, top] of [[-26, 34], [2, 22], [28, 40]]) { R.rect(X(mx), top, X(mx + 1), wl - 8, K); R.rect(X(mx), top, X(mx), wl - 8, c('#7a4e2a')); }
  for (const [x0, x1] of [[2, 52], [2, -54], [-26, -54], [28, 52]]) R.linea(X(x0), x0 === 2 ? 22 : x0 === -26 ? 34 : 40, X(x1), wl - 8, c('#4a3a2a'));
  vela(-26, 38, 54, 13, 1); vela(-26, 58, 76, 15, 2); vela(2, 26, 44, 15, 3); vela(2, 48, 72, 18, 4); vela(28, 44, 60, 12, 5); vela(28, 64, 80, 14, 6);
  R.poligono([[X(32), 82], [X(56), 82], [X(34), 46]], K); R.poligono([[X(34), 80], [X(54), 80], [X(35), 50]], c('#ece2c8'));
  const fl = Math.round(Math.sin(t * 8) * 1); R.poligono([[X(3), 16], [X(3), 22], [X(15), 19 + fl]], c('#c8303a')); R.linea(X(2), 14, X(2), 22, K);
  for (const [x, y] of [[-26, 34], [2, 22], [28, 40]]) R.rect(X(x - 1), y - 2, X(x + 2), y, K);
};
const casco = (t, cx, wl) => {
  const X = (i) => cx + i;
  for (let j = 0; j <= 14; j++) { const a = -50 + Math.round(j * j * 0.06), b = 48 - Math.round(j * 0.9); R.rect(X(a), wl - 10 + j, X(b), wl - 10 + j, K); if (j > 0 && j < 14) R.rect(X(a + 1), wl - 10 + j, X(b - 1), wl - 10 + j, j === 2 ? c('#d8b040') : j % 4 === 0 ? c('#3a2010') : j < 6 ? c('#7a4a26') : c('#5a3418')); }
  R.rect(X(-54), wl - 22, X(-36), wl - 9, K); R.rect(X(-53), wl - 21, X(-37), wl - 9, c('#6a3e20')); for (const x of [-50, -45, -40]) R.rect(X(x), wl - 18, X(x + 2), wl - 15, c('#f0c860'));
  R.rect(X(-53), wl - 22, X(-37), wl - 21, c('#d8b040'));
  R.linea(X(46), wl - 9, X(70), wl - 16, K); R.linea(X(46), wl - 8, X(70), wl - 15, c('#7a4e2a'));
  for (let k = 0; k < 14; k++) { const a = (t * 0.9 + k / 14) % 1, x = X(-48 - Math.round(a * 60)), y = wl + 3 + Math.round(Math.sin(k * 2) * 2 + a * 3); R.pset(x, y, c('#ffffff')); R.pset(x + 1, y, c('#d8ecf8')); }
  for (let k = 0; k < 4; k++) { const y = wl + 1 + k; R.rect(X(36 + k * 3), y, X(48 + k * 4), y, k % 2 ? c('#ffffff') : c('#cfe6f6')); }
};
const p3 = (t) => {
  ov.pacifico(R, t, { hor: 86, portaaviones: null, crucero: null, delfines: false });
  const cm = cieloMar(); for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) R.pset(x, y, cm[y * 320 + x]);
  nubes(t, [[30, 30, 38, 1.4], [200, 50, 26, 2.4], [110, 64, 18, 3.6]]);
  // la costa de Pensilvania que aparece por la derecha
  const cx0 = Math.round(lerp(70, 0, tramo(t, P3, penn)));
  for (let x = 226; x < 320; x++) { const xx = x + cx0; if (xx > 319) continue; const top = Math.round(78 + 3 * Math.sin(x / 9) - Math.min(4, (x - 226) * 0.1)); for (let y = top; y < 87; y++) R.pset(xx, y, y === top ? c('#8ac060') : y > 84 ? c('#c8b888') : (xx + y) % 4 === 0 ? c('#4e8a3a') : c('#6aa64a')); }
  for (const [x, w] of [[246, 6], [258, 8], [272, 6], [290, 7]]) { const xx = x + cx0; R.rect(xx, 76, xx + w, 81, K); R.rect(xx + 1, 77, xx + w - 1, 81, c('#efe8da')); R.rect(xx - 1, 74, xx + w + 1, 75, c('#b8503a')); R.pset(xx + 2, 79, c('#4a5a7a')); }
  R.rect(282 + cx0, 64, 284 + cx0, 76, K); R.pset(283 + cx0, 62, K); R.pset(283 + cx0, 63, K);
  R.rect(234 + cx0, 86, 252 + cx0, 87, c('#6a4424')); for (const x of [236, 242, 248]) R.rect(x + cx0, 88, x + cx0, 91, c('#4a2a14'));
  // gaviotas
  for (let k = 0; k < 3; k++) R.gaviota(Math.round(((60 + k * 90 + t * (6 + k * 2)) % 360) - 20), 46 + k * 9, t, k);
  // el barco de los emigrantes
  const bx = Math.round(lerp(40, 164, (t - P3) / (P4 - P3))), wl = 132 + Math.round(Math.sin(t * 2.1) * 1.5);
  barco(t, bx, wl);
  const llega = t > penn;
  R.actor(EL.colonaPA, bx - 30, wl - 10, t, { dir: 1, sonrisa: llega, habla: !llega && cada(t, 4) && t > P3 + 1 });
  R.actor(EL.colonoPA, bx - 12, wl - 10, t, { dir: 1, dedo: llega, sonrisa: llega });
  R.actor(EL.ninoBarroco, bx + 6, wl - 10, t, { dir: 1, salto: llega && cada(t, 3) ? 2 : 0, brazos: llega && t < penn + 0.8 });
  casco(t, bx, wl);
};
// ── plano 4: la granja de Pensilvania ──
const p4 = (t) => {
  T.estaciones(R, t, { encuadre: 'pensilvania' });
  // el padre lleva un cubo del granero a las vacas, al fondo
  const cp = tramo(t, P4 + 0.2, P5), xc = Math.round(lerp(196, 262, cp));
  const co = R.actor(EL.colonoPA, xc, 150, t, { dir: 1, anda: cp > 0 && cp < 1, sostiene: true });
  R.rect(co.mano[0] - 2, co.mano[1], co.mano[0] + 2, co.mano[1] + 4, K); R.rect(co.mano[0] - 1, co.mano[1] + 1, co.mano[0] + 1, co.mano[1] + 3, c('#9a9aa6'));
  // la madre sale de casa y les cuenta la historia a los niños, que llegan corriendo
  const m = tramo(t, P4 + 0.1, @(19.3)), xm = Math.round(lerp(62, 112, m)), ym = Math.round(lerp(130, 166, m));
  R.actor(EL.colonaPA, xm, ym, t, { dir: 1, anda: m > 0 && m < 1, habla: m >= 1 && t < sinPrueba && cada(t, 5), sonrisa: t > sinPrueba, dedo: t > primavera && t < sinPrueba });
  const nk = tramo(t, P4, @(19.0));
  const enc = t > sinPrueba && t < sinPrueba + 0.5;
  R.actor(EL.ninoBarroco, Math.round(lerp(236, 140, nk)), 168, t, { dir: -1, anda: nk > 0 && nk < 1, sorpresa: enc, brazos: t > sinPrueba + 0.5 });
  R.actor(EL.ninaBarroca, Math.round(lerp(256, 160, nk)), 166, t, { dir: -1, anda: nk > 0 && nk < 1, sorpresa: enc, sonrisa: t > sinPrueba + 0.5 });
  T.estacionesDelante(R, t, { encuadre: 'pensilvania' });
  // el bocadillo de la diosa de la primavera con su liebre, que se tacha en «no evidence»
  const b = tramo(t, primavera - 0.25, primavera + 0.1), fuera = t > sinPrueba + 0.55;
  if (b > 0 && !fuera) {
    const cxb = 144, cyb = 74;
    for (const [dx, dy, r] of [[-22, 4, 14], [0, -4, 18], [22, 4, 14], [0, 10, 15], [-12, -10, 10], [14, -10, 10]]) R.disco(cxb + dx, cyb + dy, Math.round((r + 1) * b), K);
    for (const [dx, dy, r] of [[-22, 4, 14], [0, -4, 18], [22, 4, 14], [0, 10, 15], [-12, -10, 10], [14, -10, 10]]) R.disco(cxb + dx, cyb + dy, Math.round(r * b), c('#f8f6f0'));
    R.disco(126, 112, 3, K); R.disco(126, 112, 2, c('#f8f6f0')); R.disco(120, 122, 2, K); R.pset(120, 122, c('#f8f6f0'));
    if (b >= 1) {
      R.actor(EL.noviaBlanca, 124, 92, t, { dir: 1, brazos: true, sonrisa: true });
      for (const [dx, col] of [[3, '#f0a8be'], [6, '#f0d040'], [9, '#f0a8be'], [12, '#8ac0f0']]) R.pset(124 + dx, 68, c(col));
      pz('liebre', 160, 90, { t, dir: -1 });
      for (const [x, col] of [[112, '#f0a8be'], [146, '#f0d040'], [176, '#f0a8be']]) { R.pset(x, 89, c(col)); R.pset(x, 90, c('#5a9a38')); }
      if (t > sinPrueba) { const e = tramo(t, sinPrueba, sinPrueba + 0.15); for (const [x0, y0, x1, y1] of [[116, 54, 172, 96], [172, 54, 116, 96]]) for (let d = -2; d <= 2; d++) R.linea(x0 + d, y0, Math.round(lerp(x0, x1, e)) + d, Math.round(lerp(y0, y1, e)), Math.abs(d) === 2 ? K : c('#d83030')); }
    }
  }
  if (fuera && t < sinPrueba + 0.9) for (let k = 0; k < 10; k++) { const a = k * 0.63, r = 20 + (t - sinPrueba - 0.55) * 60; R.pset(Math.round(144 + Math.cos(a) * r), Math.round(74 + Math.sin(a) * r * 0.7), c('#f8f6f0')); }
};
// ── plano 5: el porche ──
const p5 = (t) => {
  const pone = Math.round(5 * tramo(t, siglo - 0.1, @(25.4))), nido = t > @(23.9);
  T.estaciones(R, t, { encuadre: 'pensilvania', camara: 'porche', nido, huevos: pone });
  // el porche vivido: la alfombra trenzada, la mantequera, los zuecos, la paja y una gallina que cruza
  for (let y = -10; y <= 10; y++) for (let x = -44; x <= 44; x++) { const d = (x / 44) ** 2 + (y / 10) ** 2; if (d > 1) continue; const anillo = Math.floor(Math.sqrt(d) * 6); R.pset(84 + x, 162 + y, d > 0.92 ? K : [c('#b8503a'), c('#e0c070'), c('#4a6a9a'), c('#b8503a'), c('#6a8a4a'), c('#e0c070')][anillo % 6]); if ((x + y * 2) % 5 === 0 && d < 0.92) R.pset(84 + x, 162 + y, c('#5a3a2a')); }
  R.rect(72, 104, 88, 133, K); R.rect(73, 105, 87, 133, c('#a8763e')); for (let y = 108; y < 133; y += 6) R.rect(73, y, 87, y, c('#5a5a66')); R.rect(73, 105, 75, 133, c('#c8925a')); R.rect(78, 92, 80, 104, c('#6a4424')); R.rect(75, 103, 85, 105, K);
  for (const x of [128, 136]) { R.rect(x, 131, x + 6, 135, K); R.rect(x + 1, 132, x + 5, 134, c('#c89a5a')); R.pset(x + 1, 132, c('#e8c070')); }
  for (let k = 0; k < 16; k++) { const x = 180 + Math.floor(hh(k, 1, 3) * 130), y = 150 + Math.floor(hh(k, 2, 3) * 26); R.linea(x, y, x + 3, y - 1, c('#e0c070')); }
  const gx = Math.round(330 - ((t - P5) * 14) % 140); pz('gallina', gx, 176, { t, dir: -1, picotea: cada(t, 0.9), color: 'parda' });
  // la niña sale con el sombrero, lo deja en el suelo y vuelve; luego asoma por la puerta
  const a = tramo(t, P5 + 0.1, @(23.6)), v = tramo(t, @(24.1), @(24.9));
  if (t < @(24.9)) {
    const xn = Math.round(v > 0 ? lerp(152, 102, v) : lerp(102, 152, a)), yn = Math.round(v > 0 ? lerp(156, 130, v) : lerp(130, 156, a));
    const ni = R.actor(EL.ninaBarroca, xn, yn, t, { dir: v > 0 ? -1 : 1, anda: (a > 0 && a < 1) || (v > 0 && v < 1), sostiene: t < @(23.85) ? (a >= 1 ? [162, 142] : true) : false, sonrisa: true });
    if (t < @(23.85)) { const [mx, my] = ni.mano; R.rect(mx - 6, my + 1, mx + 6, my + 3, K); R.rect(mx - 5, my + 1, mx + 5, my + 2, c('#e8c870')); R.rect(mx - 3, my - 2, mx + 3, my + 1, K); R.rect(mx - 2, my - 1, mx + 2, my + 1, c('#d8b050')); R.rect(mx - 2, my, mx + 2, my, c('#c8303a')); }
  } else if (t > @(26.0)) R.actor(EL.ninaBarroca, 102, 130, t, { dir: 1, sorpresa: t < @(26.4), sonrisa: t >= @(26.4), dedo: t > @(26.6) });
  // la liebre llega por la derecha, deja los huevos en el nido en «century» y se va de un salto
  const l = tramo(t, @(23.9), siglo - 0.2), lv = tramo(t, @(25.8), @(26.7));
  if (l > 0 && lv < 1) pz('liebre', Math.round(lerp(344, 192, l) + lv * 170), 160, { t, s: 2, salta: (l < 1) || lv > 0, dir: lv > 0 ? 1 : -1, cesta: pone < 5 });
  T.estacionesDelante(R, t, { encuadre: 'pensilvania', camara: 'porche', nido, huevos: pone });
};
const efectos = [[liebreW - 0.1, 'boing'], [escribe, 'lapiz'], [esconde, 'pop'], [@(12.3), 'palmada'], [@(13.0), 'brillo'], [P3 + 0.1, 'ola'], [penn, 'campana'], [primavera, 'pop'], [sinPrueba, 'golpecito'], [@(23.9), 'golpecito'], [siglo, 'pop'], [@(25.9), 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1682', efectos, año: (t) => t < P3 ? 1682 : t < P4 ? 1732 : t < P5 ? 1750 : 1850 });
'''.replace("ov.pacifico", "OV.pacifico")).replace('const P2 = ', "import * as OV from '/atomo/plato/escenas/ov-comun.js';\nconst P2 = ", 1))
