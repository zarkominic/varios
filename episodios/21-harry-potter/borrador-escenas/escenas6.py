E = {}

# Ayudas comunes (cada escena es su propia página, así que van repetidas en cada cuerpo)
AYUDAS = r'''
const PZ = T.PIEZAS_HP, K = hex('#14111a');
const mix = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
// un halo de luz tramado alrededor de (x, y): aclara hacia col en la proporción a, que cae hacia el borde
const halo = (x, y, r, col, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const X = Math.round(x + i), Y = Math.round(y + j); if (X < 0 || X > 319 || Y < 0 || Y > 179) continue; R.pset(X, Y, mix(R.pget(X, Y), col, a * (1 - d / r))); } };
// un destello en cruz que parpadea
const brilla = (x, y, t, col = hex('#fff6c8'), r = 2) => { x = Math.round(x); y = Math.round(y); if (Math.sin(t * 9 + x) > -0.2) { for (let i = 1; i <= r; i++) { R.pset(x, y - i, col); R.pset(x, y + i, col); R.pset(x - i, y, col); R.pset(x + i, y, col); } R.pset(x, y, hex('#ffffff')); } };
// sube y baja suave: 0 → 1 → 0 entre a y b
const campana = (t, a, b) => { const u = tramo(t, a, b); return u > 0 && u < 1 ? Math.sin(u * Math.PI) : 0; };
// un salto corto que empieza en t0
const brinco = (t, t0, d = 0.45, h = 6) => (t > t0 && t < t0 + d ? Math.round(Math.sin((t - t0) / d * Math.PI) * h) : 0);
'''

E['hp-bosque'] = ('El bosque y el partido', '''// HP-BOSQUE (frase 20), 1992 en la barra (el curso del libro), sin cartela. Cuatro planos:
// 1. el claro del bosque prohibido con la luna: Hagrid con su farol entra delante y detrás, en fila, Harry, Hermione,
//    Neville (con su sapo) y Draco; al final de la fila queda un hueco de puntos con «?» en «Ron isn't even» (Ron no
//    está); en «Forbidden Forest» se encienden unos ojos y Draco y Neville dan un brinco; corta en «It's»;
// 2. el bosque cerrado con niebla: Hagrid levanta el farol y cada chico entra en su luz cuando la voz lo nombra (Harry,
//    Hermione, Neville —al que se le escapa el sapo—, Draco); en «one centaur» sale el primer centauro con un «1» y en
//    «three» salen los otros dos y el número pasa a «3»; Draco corre a esconderse detrás de Hagrid; corta en la pausa
//    antes de «And Harry plays»;
// 3. la grada del campo: Harry cruza en escoba por delante del público detrás de la snitch, con el buscador de
//    Hufflepuff (amarillo) pegado; Ron, Hermione y Neville lo jalean; en «Hufflepuff» la mitad amarilla y negra de la
//    grada agita sus banderas; corta en «Snape»;
// 4. (fondo local) el cielo del partido sobre el campo: Snape, de árbitro en su escoba, pita en «Snape as referee»;
//    Harry baja en picado y caza la snitch en «wins it»; el reloj de bolsillo corre y en «5 minutes» sale un «5» dorado;
//    Snape frunce el ceño y el buscador amarillo llega tarde.''', AYUDAS + r'''
const c = (f) => en('castigo', f);
const P2 = c(0.238), P3 = c(0.563), P4 = c(0.787);
const RON = c(0.035), BOSQ = c(0.157), HARRY = c(0.253), HERM = c(0.288), NEV = c(0.336), DRACO = c(0.371), UNO = c(0.450), TRES = c(0.511);
const PARTIDO = c(0.637), HUFF = c(0.729), ARBITRO = c(0.827), GANA = c(0.889), CINCO = c(0.940);
const FAROL = hex('#ffd890');

// 1 · el claro: la fila entra detrás de Hagrid y falta Ron
const p1 = (t) => {
  T.exterior(R, t, { encuadre: 'bosque', camara: 'claro' });
  const u = tramo(t, 0.1, 2.5), dx = Math.round(lerp(-176, 0, u * (2 - u))), anda = u > 0 && u < 1;
  // la luz del farol que va con Hagrid
  const hx = 214 + dx;
  halo(hx + 22, 128, 34, FAROL, 0.22);
  R.actor(EL.hagridFarol, hx, 164, t, { dir: 1, anda, habla: t > BOSQ && t < BOSQ + 0.9 && Math.sin(t * 9) > 0, sorpresa: t > BOSQ + 0.9 });
  const fila = [[EL.harry, 176], [EL.hermione, 148], [EL.nevilleSapo, 120], [EL.draco, 92]];
  fila.forEach(([d, x0], k) => {
    const x = x0 + dx, mira = k === 0 && t > RON + 0.15 && t < BOSQ - 0.2;
    const sal = k >= 2 ? brinco(t, BOSQ + 0.15 + k * 0.08, 0.45, 6) : 0;
    R.actor(d, x, 164, t, { dir: mira ? -1 : 1, anda, salto: sal, sorpresa: (k === 0 && mira) || (k >= 2 && t > BOSQ + 0.1), habla: k === 1 && t > RON + 0.5 && t < RON + 1.4 && Math.sin(t * 8) > 0 });
  });
  // el hueco de Ron al final de la fila: una silueta de puntos con su «?»
  const hu = campana(t, RON - 0.05, BOSQ + 0.4);
  if (hu > 0.15) {
    const x = 64 + dx, y0 = 139, on = (i, j) => ((i + j + Math.floor(t * 6)) & 1) === 0;
    for (let j = 0; j < 25; j++) for (let i = 0; i < 15; i++) { const borde = (j < 12 ? Math.abs(Math.hypot(i - 7, j - 6) - 6.5) < 0.6 : (i === 1 || i === 13 || j === 24)); if (borde && on(i, j)) { R.pset(x + i, y0 + j, hex('#e8f0ff')); R.pset(x + i + 1, y0 + j + 1, hex('#5a6a9a')); } }
    R.bocadillo(x + 7, y0 - 4 - Math.round(Math.sin(t * 5)), { icono: '?' });
  }
  // los ojos rojos que se encienden en lo oscuro en «Forbidden Forest»
  if (t > BOSQ) { const on = (t - BOSQ) % 1.6 < 1.4; if (on) for (const [x, y] of [[262, 118], [272, 118], [36, 104], [44, 104]]) { R.pset(x, y, hex('#ff5a3a')); R.pset(x + 1, y, hex('#ffb08a')); } }
  T.exteriorDelante(R, t, { encuadre: 'bosque', camara: 'claro' });
};

// 2 · el bosque cerrado: cada uno a la luz del farol cuando lo nombran; salen los centauros
const p2 = (t) => {
  const nc = 0.42 * tramo(t, UNO - 0.1, UNO + 0.6) + 0.58 * tramo(t, TRES - 0.15, TRES + 0.7);
  T.exterior(R, t, { encuadre: 'bosque', centauros: nc });
  const lev = tramo(t, P2 + 0.1, P2 + 0.5);
  // Draco corre a esconderse detrás de Hagrid cuando salen los tres
  const huye = tramo(t, TRES + 0.1, TRES + 1.1), dxD = Math.round(lerp(256, 18, huye));
  const nombres = [[EL.harry, 124, HARRY], [EL.hermione, 150, HERM], [EL.nevilleSapo, 214, NEV], [EL.draco, 256, DRACO]];
  // la luz de cada uno cuando la voz lo nombra
  for (const [d, x, tn] of nombres) { const a = campana(t, tn - 0.1, tn + 1.1); if (a > 0 && d !== EL.draco) halo(x + 7, 150, 18, FAROL, 0.3 * a); }
  { const a = campana(t, DRACO - 0.1, DRACO + 1.1); if (a > 0) halo(dxD + 7, 150, 18, FAROL, 0.3 * a); }
  if (huye > 0) R.actor(EL.draco, dxD, 166, t, { dir: huye < 1 ? -1 : 1, anda: huye > 0 && huye < 1, sorpresa: true });
  const fy = Math.round(lerp(140, 112, lev));
  halo(66, fy + 4, 46, FAROL, 0.2);
  const hg = R.actor(EL.hagrid, 40, 166, t, { dir: 1, sostiene: [66, fy], sorpresa: t > UNO && t < TRES + 1.2, habla: (t < HARRY - 0.1 || t > TRES + 1.2) && Math.sin(t * 8) > 0 });
  PZ.farol(R, hg.mano[0], hg.mano[1] + 9, { t });
  for (const [d, x, tn] of nombres) {
    if (d === EL.draco && huye > 0) continue;
    const vio = t > UNO + 0.1;
    R.actor(d, x, 166, t, { dir: d === EL.draco ? -1 : 1, salto: brinco(t, tn, 0.4, 5), sonrisa: t > tn && t < tn + 1 && d !== EL.draco, enfado: d === EL.draco && t > tn && !vio, sorpresa: vio, dedo: d === EL.harry && t > TRES && t < TRES + 1.4 });
  }
  // el sapo de Neville se escapa en «Neville» y vuelve a saltos
  const sp = tramo(t, NEV + 0.1, NEV + 1.6);
  if (sp > 0) { const sx = Math.round(lerp(228, 270, sp)), sy = 166 - Math.round(Math.abs(Math.sin(sp * Math.PI * 3)) * 10); PZ.sapo(R, sx, sy, {}); }
  // el número que cuenta los centauros: «1» y luego «3»
  if (t > UNO && t < UNO + 3.4) {
    const tres = t > TRES, e = tramo(t, tres ? TRES : UNO, (tres ? TRES : UNO) + 0.25), y = Math.round(lerp(112, 100, e));
    halo(200, y - 8, 14, hex('#fff2b0'), 0.35);
    R.numero(tres ? '3' : '1', 200, y, { tam: 16, centro: true });
  }
  T.exteriorDelante(R, t, { encuadre: 'bosque' });
};

// 3 · la grada: Harry pasa volando; la mitad amarilla y negra agita sus banderas
const ROJ = [hex('#b8282e'), hex('#7a1820'), hex('#e8b830')], AMA = [hex('#e8b830'), hex('#a87a18'), hex('#26222a')];
const vuela = (def, x, y, t, o = {}) => { R.actor(def, Math.round(x) - 8, Math.round(y) + 8, t, { quieto: true, ...o }); PZ.escoba(R, Math.round(x), Math.round(y) + 2, { dir: o.dir ?? 1 }); };
const bandera = (x, y, t, k) => { R.linea(x, y, x, y - 22, hex('#5a3a1a')); R.pset(x, y - 23, hex('#e8c060')); for (let i = 0; i < 16; i++) { const o = Math.round(Math.sin(t * 9 + i * 0.5 + k) * 1.6 * (i / 16)); for (let j = 0; j < 10; j++) R.pset(x + 1 + i, y - 22 + j + o, j === 0 || j === 9 || i === 15 ? K : (Math.floor(i / 4) % 2 ? AMA[2] : AMA[0])); } };
const p3 = (t) => {
  T.exterior(R, t, { encuadre: 'quidditch', camara: 'gradas' });
  // la mitad derecha de la tribuna es de Hufflepuff: el rojo pasa a amarillo y el oro a negro
  for (let y = 46; y <= 120; y++) for (let x = 146; x <= 252; x++) { const p = R.pget(x, y); const k = ROJ.indexOf(p); if (k >= 0) R.pset(x, y, AMA[k]); }
  // Harry cruza por delante con la snitch delante y el buscador de Hufflepuff detrás
  const v = tramo(t, P3 + 0.15, HUFF + 0.6), hx = lerp(-40, 360, v), hy = 122 + Math.sin(v * 9) * 5;
  if (v > 0 && v < 1) {
    T.snitch(R, hx + 34 + Math.sin(t * 13) * 4, hy - 6 + Math.sin(t * 17) * 3, t, { cara: 'feliz' });
    vuela(EL.harry, hx, hy, t, { dir: 1, sonrisa: true });
    vuela(EL.alumno, hx - 46, hy + 6 + Math.sin(t * 3) * 3, t, { dir: 1, enfado: true });
    for (let i = 1; i < 5; i++) R.pset(Math.round(hx - 14 - i * 5), Math.round(hy + 8), hex('#f8f4e8'));
  }
  // los de Gryffindor (Ron, Hermione, Neville) a la izquierda; los de Hufflepuff, con banderas, a la derecha
  const pasa = (x) => { const xs = lerp(-40, 360, v); return Math.abs(xs - x) < 50 && v > 0 && v < 1; };
  [[EL.ronJersey, 56], [EL.hermione, 84], [EL.neville, 112]].forEach(([d, x], k) => {
    const j = pasa(x) || (t > PARTIDO && t < PARTIDO + 0.8);
    R.actor(d, x, 168, t, { dir: 1, brazos: j, salto: j ? Math.round(Math.abs(Math.sin(t * 10 + k)) * 4) : 0, sonrisa: true, habla: !j && Math.sin(t * 6 + k) > 0.6 });
  });
  const hf = t > HUFF - 0.1;
  [[EL.alumno, 170], [EL.alumna, 204, { pal: { C: hex('#e8b830'), c: hex('#a87a18') } }], [EL.alumno, 238]].forEach(([d, x, ex], k) => {
    const sal = hf ? Math.round(Math.abs(Math.sin(t * 9 + k * 1.3)) * 5) : 0;
    const r = R.actor(d, x, 168, t, { dir: -1, sostiene: [x - 2, 140 - sal], salto: sal, sonrisa: hf, sorpresa: pasa(x) && !hf, ...(ex || {}) });
    bandera(r.mano[0], r.mano[1] + 6, t * (hf ? 1.6 : 0.6), k);
  });
  T.exteriorDelante(R, t, { encuadre: 'quidditch', camara: 'gradas' });
};

// 4 · (fondo local) el cielo del partido: Snape pita, Harry caza la snitch, el reloj y el «5»
let CIELO = null;
const pintaCielo = () => {
  const b = R.nuevo(), prev = R.usar(b), B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const um = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
  const AZ = [hex('#3a72c8'), hex('#4a86d6'), hex('#5e9ae0'), hex('#7ab0ea'), hex('#9cc6f0'), hex('#c0dcf4')];
  for (let y = 0; y < 128; y++) { const f = y / 128 * (AZ.length - 1), i = Math.floor(f), a = f - i; for (let x = 0; x < 320; x++) R.pset(x, y, AZ[Math.min(AZ.length - 1, i + (um(x, y) < a ? 1 : 0))]); }
  // los montes con bruma y el lago
  for (let x = 0; x < 320; x++) { const a = 112 + Math.round(Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11 + 1) * 3); for (let y = a; y < 128; y++) R.pset(x, y, y < a + 2 ? hex('#a8bcd8') : um(x, y) < 0.4 ? hex('#8aa0c4') : hex('#7a92b8')); }
  for (let x = 220; x < 320; x++) for (let y = 124; y < 130; y++) R.pset(x, y, um(x, y) < 0.3 ? hex('#c8e0f4') : hex('#6a8ac0'));
  // el campo abajo, en perspectiva, con franjas de siega, el óvalo de cal y las sombras de las gradas
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const g = Math.floor((x - 160) / (y - 100) * 4) & 1, e = ((x - 160) / 150) ** 2 + ((y - 156) / 22) ** 2; let col = e < 1 ? (g ? hex('#5aa83a') : hex('#4c9632')) : (um(x, y) < 0.5 ? hex('#3e7a2c') : hex('#346a26')); if (Math.abs(e - 1) < 0.04) col = hex('#d8ecc8'); if (Math.abs(e - 0.18) < 0.03) col = hex('#d8ecc8'); R.pset(x, y, col); }
  // las torres de gradas alrededor del campo (de colores, sin escudos) con su andamio
  const CAS = [[hex('#b8282e'), hex('#e8b830')], [hex('#e8b830'), hex('#26222a')], [hex('#22784a'), hex('#c8ccd4')], [hex('#2a4aa8'), hex('#b88a4a')]];
  [[14, 132], [52, 128], [96, 126], [224, 126], [268, 128], [306, 132]].forEach(([x, y], k) => { const [a, b] = CAS[k % 4];
    R.rect(x - 7, y, x + 7, y + 14, hex('#6a4a2a')); for (let i = -6; i <= 6; i += 3) R.linea(x + i, y + 4, x + i, y + 14, hex('#4a3018'));
    for (let i = -7; i <= 7; i++) for (let j = 0; j < 5; j++) R.pset(x + i, y + j, (Math.floor((i + 8) / 2) % 2) ? a : b);
    for (let i = -6; i <= 6; i++) R.pset(x + i, y - 1, hex('#f0c8a0'));
    R.poligono([[x - 8, y - 2], [x + 8, y - 2], [x, y - 9]], a); R.linea(x, y - 9, x + 3, y - 2, b); });
  // los aros dorados en los dos fondos
  for (const [x, y] of [[124, 140], [132, 136], [140, 141], [180, 141], [188, 136], [196, 140]]) { R.rect(x, y + 3, x, 152, hex('#a87a18')); for (let a = 0; a < 20; a++) { const an = a / 20 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * 2.5), Math.round(y + Math.sin(an) * 3), hex('#f0d060')); } }
  R.usar(prev); return b;
};
// el reloj de bolsillo de cerca (cx, cy): la aguja corre de 0 a 5 minutos con u
const reloj = (cx, cy, u, t) => {
  R.disco(cx, cy, 17, K); R.disco(cx, cy, 16, hex('#c89a3a')); R.disco(cx, cy, 13, hex('#f6f0dc')); R.disco(cx - 4, cy - 4, 4, hex('#fffaf0'));
  R.rect(cx - 2, cy - 22, cx + 2, cy - 18, hex('#c89a3a')); R.rect(cx - 1, cy - 25, cx + 1, cy - 23, K);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.sin(a) * 11), Math.round(cy - Math.cos(a) * 11), k % 3 ? hex('#8a7a5a') : K); }
  // la porción de los cinco minutos que se colorea
  const fin = u * 5 / 60 * Math.PI * 2 * 4;
  for (let r = 3; r < 10; r++) for (let a = 0; a < fin; a += 0.08) { const px = Math.round(cx + Math.sin(a) * r), py = Math.round(cy - Math.cos(a) * r); if (((px + py) & 1) === 0) R.pset(px, py, hex('#e8b830')); }
  const a = fin; R.linea(cx, cy, Math.round(cx + Math.sin(a) * 10), Math.round(cy - Math.cos(a) * 10), hex('#a8202a')); R.disco(cx, cy, 1, K);
};
const p4 = (t) => {
  if (!CIELO) CIELO = pintaCielo();
  R.copiar(CIELO);
  // nubes de tres tonos a tres velocidades, la de delante tapa a medias
  for (const [x0, y, w, v] of [[30, 26, 30, 2], [190, 18, 40, 3.4], [120, 64, 26, 5], [300, 92, 50, 7]]) R.nube(((x0 + t * v) % 400) - 40, y, w);
  // pájaros
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * (14 + k * 3) + k * 90) % 380) - 30), y = 40 + k * 9 + Math.round(Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); R.pset(x - 2, y - (a ? 2 : -1), K); R.pset(x + 2, y - (a ? 2 : -1), K); }
  // jugadores lejanos sobre el campo
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x = d > 0 ? ((t * 18 + k * 120) % 360) - 20 : 340 - ((t * 15 + k * 90) % 360), y = 116 + k * 5; R.linea(x - 3 * d, y + 1, x + 3 * d, y, hex('#6a4a2a')); R.rect(x - 1, y - 3, x, y, k ? hex('#e8b830') : hex('#b8282e')); }
  // Snape, el árbitro, en su escoba a la izquierda: pita en «referee» y frunce el ceño cuando Harry gana
  const sy = 84 + Math.round(Math.sin(t * 1.8) * 3), pita = t > ARBITRO - 0.6 && t < ARBITRO + 0.4;
  vuela(EL.snape, 58, sy, t, { dir: 1, enfado: t > GANA, habla: pita });
  if (pita) { R.rect(70, sy - 9, 73, sy - 8, hex('#c8ccd4')); for (let i = 0; i < 3; i++) R.linea(76 + i, sy - 12 - i * 3, 80 + i * 2, sy - 14 - i * 4, hex('#ffffff')); }
  // la snitch que zigzaguea y Harry que baja en picado y la caza en «wins»
  const caza = t > GANA;
  const d = tramo(t, P4 + 0.3, GANA), hx = caza ? lerp(176, 168, tramo(t, GANA, GANA + 1)) : lerp(238, 176, d * d), hy = caza ? lerp(110, 96, tramo(t, GANA, GANA + 1)) : lerp(46, 110, d);
  if (!caza) { const sx = lerp(230, 200, d) + Math.sin(t * 11) * 9, sny = 112 + Math.sin(t * 15) * 5; halo(sx, sny - 3, 9, hex('#fff2b0'), 0.4); T.snitch(R, sx, sny, t, { cara: 'feliz' }); }
  const r = R.actor(EL.harry, Math.round(hx) - 8, Math.round(hy) + 8, t, { dir: -1, quieto: true, sostiene: caza ? [Math.round(hx) - 14, Math.round(hy) - 16] : false, sonrisa: caza, sorpresa: !caza && d > 0.6 });
  PZ.escoba(R, Math.round(hx), Math.round(hy) + 2, { dir: -1 });
  if (!caza && d > 0 && d < 1) for (let i = 1; i < 5; i++) R.pset(Math.round(hx + 8 + i * 3), Math.round(hy - 4 - i * 3), hex('#ffffff'));
  if (caza) { const a = campana(t, GANA, GANA + 0.8); if (a > 0) halo(r.mano[0], r.mano[1], 16, hex('#fff2b0'), 0.6 * a); T.snitch(R, r.mano[0], r.mano[1] + 2, t, { cara: 'susto' }); if (a > 0) for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 3; R.pset(Math.round(r.mano[0] + Math.cos(an) * (8 + a * 6)), Math.round(r.mano[1] + Math.sin(an) * (8 + a * 6)), hex('#fff6c8')); } }
  // el buscador de Hufflepuff llega tarde por abajo
  const bu = tramo(t, GANA - 0.6, GANA + 1.2); vuela(EL.alumno, lerp(250, 214, bu), lerp(150, 126, bu), t, { dir: -1, triste: caza, sorpresa: !caza });
  // el reloj de bolsillo: la aguja corre los cinco minutos y en «5» sale el número dorado
  const ru = tramo(t, P4 + 0.2, CINCO);
  reloj(252, 74, ru, t);
  if (t > CINCO - 0.05) { const e = tramo(t, CINCO - 0.05, CINCO + 0.25); halo(226, 66, 14, hex('#fff2b0'), 0.5 * e); R.numero('5', 226, Math.round(lerp(84, 74, e)), { tam: 16, centro: true }); }
};

const efectos = [[BOSQ + 0.15, 'boing'], [NEV + 0.12, 'boing'], [UNO, 'whoosh'], [TRES, 'pop'], [P3 + 1.1, 'whoosh'], [HUFF, 'publico'],
  [ARBITRO - 0.5, 'silbato'], [GANA - 0.5, 'whoosh'], [GANA, 'brillo'], [CINCO, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1992 });
''')

E['hp-pociones'] = ('El acertijo de las pociones', '''// HP-POCIONES (frase 21), 1992 en la barra, sin cartela. Tres planos:
// 1. la sala subterránea: Harry y Hermione cruzan el fuego negro de la izquierda; en «stone» la piedra roja reluce un
//    instante tras el fuego morado; en «test» los dos fuegos se avivan y se asustan; en «skipped completely» Hermione va
//    hacia la mesa del acertijo y Harry la sigue; corta en «A riddle»;
// 2. la mesa de cerca: Hermione lee el pergamino; en «seven» salen los números del 1 al 7 sobre las botellas; en «without
//    a wand» deja la varita en la mesa (con su «X»); piensa (la luz va de botella en botella) y en «logic» señala la
//    pequeña, que brilla; Harry sonríe; corta en «Oh»;
// 3. la sala del espejo: Harry llega y se mira; en el cristal, su reflejo; en «green eyes» un destello verde en los ojos
//    del reflejo (no en Harry) y en «mother» aparece detrás de él, en el espejo, una mujer pelirroja que le pone la mano
//    en el hombro; Harry sonríe.''', AYUDAS + r'''
const a = (f) => en('acertijo', f);
const P2 = a(0.298), P3 = a(0.734);
const PIEDRA = a(0.111), PRUEBA = a(0.162), SALTA = a(0.214), ACERTIJO = a(0.311), SIETE = a(0.340), SNAPE = a(0.452), HERM = a(0.498), RESUELVE = a(0.529), VARITA = a(0.595), NADA = a(0.641), LOGICA = a(0.676);
const DETALLE = a(0.799), HARRY = a(0.875), VERDES = a(0.908), MADRE = a(0.974);
const MORADO = hex('#b04ae8'), NEGRO = hex('#3a2a4a');
// lenguas de fuego que se avivan (x0..x1, base y, alto h)
const llamas = (x0, x1, y, h, t, c1, c2) => { for (let x = x0; x <= x1; x += 2) { const hh = h * (0.6 + 0.4 * Math.abs(Math.sin(t * 7 + x * 0.7))); for (let j = 0; j < hh; j++) { const w = Math.sin(t * 9 + j * 0.4 + x) * 1.2; R.pset(Math.round(x + w), y - j, j > hh * 0.6 ? c2 : c1); } } };

// 1 · la sala del fuego: entran, la prueba se enciende, van a la mesa
const p1 = (t) => {
  const o = { encuadre: 'pociones' };
  T.exterior(R, t, o);
  // la piedra roja reluce tras el fuego morado en «stone»
  const pa = campana(t, PIEDRA - 0.2, PIEDRA + 1.0);
  if (pa > 0) { halo(270, 104, 18, hex('#ff4a4a'), 0.45 * pa); PZ.piedra(R, 270, 110, { brillo: true, t }); }
  // los dos fuegos se avivan en «test»
  const av = campana(t, PRUEBA - 0.1, PRUEBA + 1.6);
  if (av > 0) { llamas(28, 72, 150, 70 * av, t, NEGRO, hex('#6a4a8a')); llamas(248, 292, 150, 70 * av, t, hex('#7a2ab8'), hex('#e8b0ff')); halo(270, 110, 30, MORADO, 0.25 * av); }
  // Harry y Hermione salen del fuego negro y van a la mesa; Hermione se pone detrás, junto al pergamino
  const e = tramo(t, 0.2, 1.6), hx = Math.round(lerp(34, 76, e)), mx = Math.round(lerp(26, 52, e));
  const va = tramo(t, SALTA, SALTA + 1.2), mxv = Math.round(lerp(mx, 112, va)), suM = Math.round(lerp(168, 148, tramo(t, SALTA + 0.7, SALTA + 1.2)));
  const vh = tramo(t, SALTA + 0.5, SALTA + 1.6), hxv = Math.round(lerp(hx, 82, vh));
  const asusta = t > PRUEBA && t < PRUEBA + 0.9;
  R.actor(EL.hermione, mxv, suM, t, { dir: 1, anda: (e > 0 && e < 1) || (va > 0 && va < 1), sorpresa: asusta, dedo: t > SALTA - 0.6 && t < SALTA, habla: va >= 1 && Math.sin(t * 8) > 0 });
  R.actor(EL.harry, hxv, 168, t, { dir: 1, anda: (e > 0 && e < 1) || (vh > 0 && vh < 1), sorpresa: asusta || (pa > 0.4 && t < PRUEBA), salto: brinco(t, PRUEBA, 0.4, 5) });
  T.exteriorDelante(R, t, o);
  // el acertijo despierta: el pergamino brilla y sube un «?» dorado sobre las botellas
  const ac = tramo(t, PRUEBA, PRUEBA + 0.6);
  if (ac > 0) { halo(123, 146, 16, hex('#fff2b0'), 0.35 + 0.15 * Math.sin(t * 6)); const y = Math.round(lerp(132, 104, ac) + Math.sin(t * 3) * 2); halo(180, y + 6, 12, hex('#fff2b0'), 0.3); R.icono('?', 175, y, hex('#ffd84a'), K, 3); }
};

// 2 · la mesa: los siete números, la varita en la mesa y la pequeña que brilla
const p2 = (t) => {
  const piensa = tramo(t, NADA - 0.3, LOGICA), ciclo = [0, 6, 4, 1, 5, 2];
  const el = t > LOGICA ? 2 : piensa > 0 ? ciclo[Math.min(5, Math.floor(piensa * 6))] : undefined;
  const o = { encuadre: 'pociones', camara: 'mesa', elegida: el };
  T.exterior(R, t, o);
  // Hermione lee el pergamino (cabeza y hombros sobre la mesa), con la varita en la mano hasta «without a wand»
  const deja = tramo(t, VARITA - 0.4, VARITA + 0.1), tiene = deja < 1;
  const hr = R.actor(EL.hermione, 52, 142, t, { dir: 1, sostiene: tiene ? [Math.round(lerp(70, 78, deja)), Math.round(lerp(122, 134, deja))] : false, dedo: t > LOGICA - 0.1, habla: t > ACERTIJO && t < SIETE + 1.4 && Math.sin(t * 8) > 0, sonrisa: t > LOGICA + 0.4 });
  if (tiene) PZ.varita(R, hr.mano[0] + 3, hr.mano[1] + 2, { t });
  R.actor(EL.harry, 94, 142, t, { dir: 1, sorpresa: t > LOGICA && t < LOGICA + 0.6, sonrisa: t > LOGICA + 0.6, habla: t > HERM && t < RESUELVE && Math.sin(t * 7) > 0.3 });
  // el pergamino se mece con el aire del fuego
  // los números del 1 al 7 sobre las botellas, uno detrás de otro
  const B = [[128, 150, 46], [152, 148, 50], [172, 150, 26], [194, 148, 46], [220, 150, 40], [244, 148, 50], [270, 150, 42]];
  B.forEach(([x, , hh], k) => { const t0 = SIETE + k * 0.16, e = tramo(t, t0, t0 + 0.2), f = 1 - tramo(t, SNAPE + 0.6, SNAPE + 1.0); if (e > 0 && f > 0) { const y = Math.round(lerp(150 - hh, 150 - hh - 8, e)); R.numero(String(k + 1), x, y, { centro: true }); } });
  // la luz del pensamiento: la botella que mira se ilumina un poco (el decorado la hace brillar)
  if (t > LOGICA) { const g = campana(t, LOGICA, LOGICA + 1.2); halo(172, 138, 26, hex('#d8fff0'), 0.45 * g + 0.25); for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 + t * 2, rr = 15 + g * 5; R.pset(Math.round(172 + Math.cos(an) * rr), Math.round(138 + Math.sin(an) * rr * 1.2), hex('#ffffff')); } for (const [dx, dy] of [[-12, -30], [12, -22], [-4, -40]]) brilla(172 + dx, 150 + dy, t); }
  // la duda: «?» sobre Hermione mientras piensa
  if (piensa > 0 && t < LOGICA) R.bocadillo(66, 110, { icono: '?' });
  T.exteriorDelante(R, t, o);
  // la varita, dejada sobre la mesa, con su «X»: la resuelve sin magia
  if (!tiene) { PZ.varita(R, 78, 141, { t, dir: -1 }); const x = campana(t, VARITA, VARITA + 1.6); if (x > 0.1) { halo(77, 122, 9, hex('#ffffff'), 0.3); R.icono('X', 71, 114, hex('#e84a3a'), K, 2); } }
};

// 3 · el espejo: el reflejo, el destello verde y la madre
const reflejo = (t) => (R2, tt, [x0, y0, x1, y1]) => {
  const cx = (x0 + x1) >> 1, pie = y1 - 4;
  const m = tramo(t, MADRE - 0.6, MADRE + 0.3);
  if (m > 0) { const mx = Math.round(lerp(x1 + 4, cx - 2, m)); halo(mx + 7, pie - 16, 14, hex('#fff0d0'), 0.25 * m); R.actor(EL.vecina, mx, pie - 4, t, { dir: -1, pal: { H: hex('#c0401a'), h: hex('#e0602a'), C: hex('#5a7a4a'), c: hex('#3e5a34') }, sonrisa: true, sostiene: m >= 1 ? [cx - 4, pie - 16] : false }); }
  const llega = tramo(t, P3 + 0.2, DETALLE);
  if (llega > 0.3) R.actor(EL.harry, cx - 9, pie, t, { dir: -1, sonrisa: t > MADRE });
  // el destello verde en los ojos del reflejo
  const v = campana(t, VERDES - 0.1, VERDES + 1.3);
  if (v > 0) { halo(cx - 2, pie - 19, 12, hex('#5aff7a'), 0.6 * v); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + tt * 2; R.pset(Math.round(cx - 3 + Math.cos(an) * (6 + 3 * v)), Math.round(pie - 19 + Math.sin(an) * (6 + 3 * v)), hex('#b8ffc8')); } brilla(cx + 6, pie - 26, tt, hex('#9affb0'), 3); }
};
const p3 = (t) => {
  const o = { encuadre: 'espejo', reflejo: reflejo(t) };
  T.hogwarts(R, t, o);
  // Harry entra desde la izquierda y se para junto al espejo a mirarse
  const u = tramo(t, P3 + 0.1, DETALLE), x = Math.round(lerp(-16, 100, u));
  R.actor(EL.harry, x, 166, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > VERDES - 0.1 && t < VERDES + 0.7, sonrisa: t > MADRE, dedo: t > HARRY && t < VERDES - 0.1 });
  T.hogwartsDelante(R, t, o);
};

const efectos = [[0.4, 'whoosh'], [PIEDRA, 'brillo'], [PRUEBA, 'whoosh'], [ACERTIJO, 'papel'], [SIETE, 'burbujas'], [VARITA, 'golpecito'], [LOGICA, 'brillo'],
  [P3 + 0.3, 'whoosh'], [VERDES, 'brillo'], [MADRE, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1992 });
''')

E['hp-aviso'] = ('Aviso de destripe', '''// HP-AVISO (frases 22–23), 2026 en el salón y 1997 (el libro) en las pistas; sin cartela. Cuatro planos:
// 1. el salón de la fan: en «Now» cae del techo un cartel de aviso (caballete amarillo con la señal y el rayo) y tiembla
//    con el golpe; vuelve a temblar en «warning»; la fan, con su libro, da un brinco y en «never read the books» levanta
//    el libro, sonriente (ella sí los ha leído); la abuela, que no, se va del salón en «skip this minute»; la tele
//    parpadea con la señal; en «spoilers» la snitch se posa en el cartel y se tapa los ojos (gag); corta en «The first»;
// 2. la puerta de la cabaña: Hagrid abre; Harry, con la lupa, repasa la moto aparcada: en «clues» la moto echa un «?»
//    dorado, en «disguised» el paraguas rosa, en «details» el farol; corta en «In chapter 1»;
// 3. Privet Drive de noche, la ventana del 4: la moto baja del cielo con el faro encendido y Hagrid con el bebé en
//    brazos; el gato de la tapia la sigue con la cabeza; en «mentions in passing» Hagrid habla; corta en «young»;
// 4. el callejón: la moto aparcada y Hagrid que la palmea; en «Sirius Black» llega un perro negro que la olfatea y menea
//    el rabo; en «That name» se va corriendo y deja las huellas; en «Book 3» sale un libro con un «3».''', AYUDAS + r'''
const a = (f) => en('aviso', f), m = (f) => en('moto', f);
const P2 = a(0.997), P3 = m(0.238), P4 = m(0.635);
const AHORA = a(0), AVISO = a(0.291), NUNCA = a(0.454), SALTA = a(0.598), DESTRIPE = a(0.869);
const PISTAS = m(0.072), DISFRAZ = m(0.092), DETALLES = m(0.157);
const LLEGA = m(0.304), VUELA = m(0.406), MENCIONA = m(0.504);
const SIRIUS = m(0.658), NOMBRE = m(0.815), LIBRO3 = m(0.939);
const AMARILLO = hex('#f0c020'), AMAS = hex('#b88a10');
// el cartel de aviso de destripe: un caballete de madera con el tablero amarillo, franjas de peligro y la señal
// triangular con el rayo (cx: centro, by: el suelo; sh: el temblor)
const cartel = (cx, by, sh, t) => {
  const x = Math.round(cx + sh), top = by - 48;
  for (const [a0, b0] of [[-18, -22], [18, 22]]) { R.linea(x + a0, top + 30, cx + b0, by, K); R.linea(x + a0 + (a0 < 0 ? 1 : -1), top + 30, cx + b0 + (a0 < 0 ? 1 : -1), by, hex('#8a5a2a')); }
  R.rect(x - 22, top - 1, x + 22, top + 33, K); R.rect(x - 21, top, x + 21, top + 32, AMARILLO); R.rect(x - 21, top + 29, x + 21, top + 32, AMAS);
  for (let i = -21; i <= 21; i++) for (const y0 of [top, top + 28]) for (let j = 0; j < 4; j++) if (((i + j + 40) >> 2) % 2) R.pset(x + i, y0 + j, K);
  // la señal triangular blanca con borde rojo y el rayo negro
  const ty = top + 5;
  R.poligono([[x, ty], [x + 12, ty + 22], [x - 12, ty + 22]], hex('#d82a2a'));
  R.poligono([[x, ty + 4], [x + 8, ty + 19], [x - 8, ty + 19]], hex('#fff8e8'));
  R.icono('rayo', x - 3, ty + 8, K, hex('#fff8e8'), 1);
  R.pset(x - 20, top + 6, hex('#fff8c8')); R.pset(x - 19, top + 6, hex('#fff8c8'));
  for (let i = -18; i <= 18; i += 6) R.pset(x + i, by, hex('#5a3a22'));
};
// el perro negro (Sirius, insinuado): de perfil, mira a dir; anda o menea el rabo
const perro = (x0, y0, t, dir, anda, rabo) => {
  x0 = Math.round(x0); y0 = Math.round(y0); const S = 2, x = 0, y = 0, X = (i) => dir * i, Q = { pset: (a, b, c) => { for (let p = 0; p < S; p++) for (let q = 0; q < S; q++) R.pset(x0 + a * S + p, y0 + b * S + q, c); }, pget: (a, b) => R.pget(x0 + a * S, y0 + b * S) }, N = hex('#16121c'), G = hex('#3a3444'), L = hex('#5a5468');
  for (let i = -8; i <= 6; i++) for (let j = -9; j <= -4; j++) Q.pset(X(i), y + j, j === -9 ? G : N);
  for (let i = 4; i <= 10; i++) for (let j = -13; j <= -7; j++) Q.pset(X(i), y + j, N);
  for (let i = 10; i <= 12; i++) for (let j = -10; j <= -8; j++) Q.pset(X(i), y + j, N);
  Q.pset(X(12), y - 10, G); Q.pset(X(5), y - 14, N); Q.pset(X(6), y - 14, N); Q.pset(X(5), y - 15, N); Q.pset(X(4), y - 12, G);
  Q.pset(X(8), y - 11, hex('#e8d040'));
  for (let i = 3; i <= 9; i++) Q.pset(X(i), y - 13, G);
  const f = anda ? Math.floor(t * 10) % 2 : 0;
  for (const [i, df] of [[-7, f], [-4, 1 - f], [3, f], [6, 1 - f]]) { Q.pset(X(i + (anda ? df : 0)), y - 3, N); Q.pset(X(i + (anda ? df : 0)), y - 2, N); Q.pset(X(i + (anda ? df * 2 : 0)), y - 1, N); Q.pset(X(i + (anda ? df * 2 : 0) + 1), y - 1, N); }
  const r = rabo ? Math.round(Math.sin(t * 18) * 2) : 0; Q.pset(X(-9), y - 8, N); Q.pset(X(-10), y - 9 + r, N); Q.pset(X(-11), y - 10 + r, N); Q.pset(X(-12), y - 11 + r * 2, L);
  for (let i = -8; i <= 10; i++) Q.pset(X(i), y, mix(Q.pget(X(i), y), K, 0.35));
};

// 1 · el salón: cae el cartel, la abuela se va, la snitch se tapa los ojos
const tele = (R2, t, [x0, y0, x1, y1]) => {
  const on = t > AHORA && Math.floor(t * 4) % 2 === 0;
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, on ? (((y >> 2) & 1) ? hex('#f0c020') : hex('#2a2a2a')) : hex('#1a1a2a'));
  const cx = (x0 + x1) >> 1;
  if (t > AHORA) { R.poligono([[cx, y0 + 4], [cx + 11, y1 - 3], [cx - 11, y1 - 3]], hex('#d82a2a')); R.poligono([[cx, y0 + 8], [cx + 7, y1 - 6], [cx - 7, y1 - 6]], hex('#fff8e8')); R.icono('rayo', cx - 3, y0 + 13, K, hex('#fff8e8'), 1); }
};
const p1 = (t) => {
  const o = { encuadre: 'salon', pantalla: tele };
  T.hoy(R, t, o);
  // la abuela, que no ha leído los libros, deja la taza y se va por la izquierda en «skip this minute»
  const va = tramo(t, SALTA + 0.1, SALTA + 2.1), ax = Math.round(lerp(64, -24, va));
  const ra = R.actor(EL.abuela, ax, 150, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, sorpresa: t > AHORA && t < AHORA + 0.8, sostiene: true, habla: t > NUNCA && t < SALTA && Math.sin(t * 7) > 0 });
  R.rect(ra.mano[0] - 2, ra.mano[1] - 2, ra.mano[0] + 2, ra.mano[1] + 2, K); R.rect(ra.mano[0] - 1, ra.mano[1] - 1, ra.mano[0] + 1, ra.mano[1] + 1, hex('#e8e4f0'));
  if (Math.sin(t * 5) > 0) R.pset(ra.mano[0], ra.mano[1] - 4 - Math.floor(t * 3) % 3, hex('#e8e4f0'));
  // el cartel cae del techo en «Now» con el golpe y tiembla; tiembla otra vez en «warning»
  const c = tramo(t, AHORA - 0.35, AHORA), by = Math.round(lerp(-10, 152, c * c));
  const sh = (t > AHORA && t < AHORA + 0.8 ? Math.sin(t * 60) * 3 * (1 - (t - AHORA) / 0.8) : 0) + (t > AVISO && t < AVISO + 0.7 ? Math.sin(t * 60) * 3 * (1 - (t - AVISO) / 0.7) : 0);
  if (c > 0) cartel(222, by, sh, t);
  if (t > AHORA && t < AHORA + 0.5) for (let k = 0; k < 6; k++) { const u = (t - AHORA) / 0.5; R.pset(Math.round(222 + (k - 2.5) * 10 * (1 + u)), Math.round(152 - u * 8 - (k % 2) * 3), hex('#e8dcc8')); }
  // la fan con su libro: brinco con el golpe, levanta el libro en «never read the books» y lo abraza
  const fx = 132, sal = brinco(t, AHORA + 0.05, 0.45, 7);
  const enseña = t > NUNCA && t < DESTRIPE;
  const rf = R.actor(EL.chica, fx, 150, t, { dir: 1, salto: sal, sorpresa: t > AHORA && t < AVISO + 0.6, sostiene: enseña ? [fx + 18, 122] : [fx + 14, 136], sonrisa: t > NUNCA, habla: t > SALTA && t < DESTRIPE && Math.sin(t * 8) > 0.2 });
  PZ.libro(R, rf.mano[0], rf.mano[1] + 6, {});
  if (enseña && t < NUNCA + 1.2) brilla(rf.mano[0] + 6, rf.mano[1] - 8, t);
  // la snitch revolotea y en «spoilers» se posa en el cartel y se tapa los ojos
  const llega = tramo(t, DESTRIPE - 0.8, DESTRIPE), sx = lerp(170 + Math.sin(t * 2.2) * 40, 222, llega), sy = lerp(64 + Math.sin(t * 3.1) * 14, 105, llega);
  if (t > AVISO) T.snitch(R, Math.round(sx + (llega < 1 ? Math.sin(t * 9) * 4 : 0)), Math.round(sy), t, t > DESTRIPE ? { cara: 'tapaOjos', s: 2 } : { cara: 'susto' });
  T.hoyDelante(R, t, o);
};

// 2 · la puerta de la cabaña: Hagrid abre, Harry repasa la moto con la lupa y salen las pistas
const p2 = (t) => {
  const o = { encuadre: 'cabana', camara: 'puerta', puerta: tramo(t, P2 + 0.1, P2 + 0.8) };
  T.exterior(R, t, o);
  // la moto aparcada bajo la ventana
  PZ.moto(R, 252, 170, { faro: false });
  // Hagrid sale a la puerta, sonríe y habla
  const hs = tramo(t, P2 + 0.7, P2 + 1.6), hgx = Math.round(lerp(124, 136, hs));
  R.actor(EL.hagrid, hgx, 168, t, { dir: 1, anda: hs > 0 && hs < 1, sonrisa: true, habla: t > P2 + 1.6 && t < PISTAS && Math.sin(t * 8) > 0, dedo: t > DETALLES });
  // Harry entra por la derecha con la lupa y la pasa por las pistas: la moto, el paraguas, el farol
  const e = tramo(t, P2, P2 + 1.0), hx = Math.round(lerp(330, 286, e));
  const objs = [[PISTAS, 248, 152], [DISFRAZ, 189, 136], [DETALLES, 188, 66]];
  let mira = [300, 150];
  for (const [t0, x, y] of objs) if (t > t0 - 0.5) mira = [x, y];
  const lx = mira[0] + 10, ly = Math.min(150, mira[1] + 8);
  const hr = R.actor(EL.harry, hx, 170, t, { dir: -1, anda: e > 0 && e < 1, sostiene: e >= 1 ? [Math.max(hx - 14, Math.min(lx, hx - 2)), Math.max(124, ly)] : true, sorpresa: t > PISTAS && t < PISTAS + 0.5, sonrisa: t > DETALLES });
  PZ.lupa(R, hr.mano[0] - 3, hr.mano[1] + 2, {});
  objs.forEach(([t0, x, y], k) => {
    if (t < t0) return;
    const g = campana(t, t0, t0 + 0.9);
    if (g > 0) halo(x, y, 14, hex('#ffe890'), 0.5 * g);
    brilla(x + 6, y - 6, t + k);
    R.icono('?', x - 3, y - 26 + Math.round(Math.sin(t * 4 + k) * 1.5), hex('#ffd84a'), K, 2);
  });
  T.exteriorDelante(R, t, o);
};

// 3 · Privet Drive de noche: la moto baja del cielo con Hagrid y el bebé, se para junto a la casa y baja a la calle
const p3 = (t) => {
  const o = { encuadre: 'calle', camara: 'ventana', luz: 'noche' };
  T.muggle(R, t, o);
  const u = tramo(t, P3 + 0.05, LLEGA + 0.9), s = 1 - (1 - u) * (1 - u), baja = tramo(t, P4 - 0.7, P4 + 0.1);
  const mx = Math.round(lerp(-50, 60, s)), my = Math.round(lerp(-20, 122, s) + Math.sin(t * 3) * 2 + baja * baja * 90);
  // el haz del faro por delante, hacia la derecha y abajo
  for (let i = 0; i < 34; i++) for (let j = -i * 0.4; j <= i * 0.4; j++) { const X = mx + 26 + i, Y = Math.round(my - 15 + j + i * 0.3); if (X >= 0 && X < 320 && Y >= 0 && Y < 180 && ((X + Y) & 1)) R.pset(X, Y, mix(R.pget(X, Y), hex('#fff2b0'), 0.5 - i / 80)); }
  // Hagrid montado (la moto le tapa las piernas) con el bebé en brazos
  const hr = R.actor(EL.hagrid, mx - 14, my - 6, t, { dir: 1, quieto: true, sostiene: [mx + 8, my - 24], sonrisa: t < MENCIONA, habla: t > MENCIONA && t < P4 - 0.6 && Math.sin(t * 8) > 0 });
  PZ.moto(R, mx, my, { faro: true });
  PZ.bebe(R, hr.mano[0] + 1, hr.mano[1] + 4, {});
  // el humo del tubo de escape
  for (let k = 0; k < 5; k++) { const v = ((t * 1.4 + k / 5) % 1); R.disco(Math.round(mx - 26 - v * 18 - k), Math.round(my - 4 - v * 10), 1 + v * 2, mix(hex('#8a8aa8'), hex('#2a2a48'), v)); }
  T.muggleDelante(R, t, o);
  // el gato atigrado en el alféizar sigue la moto con la cabeza; se sobresalta cuando llega
  const gsal = brinco(t, LLEGA, 0.4, 4);
  PZ.gato(R, 198, 128 - gsal, { dir: -1, s: 2 });
  if ((t + 0.3) % 2.4 > 0.15) { R.pset(186, 113 - gsal, hex('#f0e040')); R.pset(190, 113 - gsal, hex('#f0e040')); }
  if (t > LLEGA && t < LLEGA + 1.2) R.bocadillo(196, 98, { icono: '!' });
};

// 4 · el callejón: la moto aparcada, el perro negro que la olfatea y el libro 3
const p4 = (t) => {
  const o = { encuadre: 'calle' };
  T.diagon(R, t, o);
  PZ.moto(R, 120, 158, {});
  // Hagrid palmea la moto y habla en «lent it to him»
  R.actor(EL.hagrid, 56, 158, t, { dir: 1, habla: t < NOMBRE && Math.sin(t * 7) > 0.1, dedo: t > SIRIUS + 0.9 && t < NOMBRE, sorpresa: t > NOMBRE + 0.3 && t < LIBRO3, sonrisa: t > LIBRO3 });
  // el perro negro llega en «Sirius Black», olfatea, menea el rabo y en «That name» se va corriendo
  const lle = tramo(t, SIRIUS - 0.3, SIRIUS + 0.9), ve = tramo(t, NOMBRE + 0.2, NOMBRE + 1.4);
  const px = ve > 0 ? lerp(156, 340, ve) : lerp(330, 156, lle), dir = ve > 0 ? 1 : -1;
  // las huellas que deja en los adoquines
  for (let k = 0; k < 9; k++) { const hxp = 166 + k * 16; if ((ve > 0 && hxp < px) || (lle > 0 && hxp > px && ve === 0)) { R.pset(hxp, 162 + (k % 2) * 2, hex('#2a2430')); R.pset(hxp + 1, 162 + (k % 2) * 2, hex('#2a2430')); R.pset(hxp, 161 + (k % 2) * 2, hex('#3a3440')); } }
  if (px < 330) perro(px, 160, t, dir, (lle > 0 && lle < 1) || (ve > 0 && ve < 1), lle >= 1 && ve === 0);
  if (lle >= 1 && ve === 0 && Math.sin(t * 6) > 0) R.pset(Math.round(px) - 14, 148, hex('#c8ccd8'));
  // el libro 3 que sale en «Book 3»
  const lb = tramo(t, LIBRO3 - 0.1, LIBRO3 + 0.4);
  if (lb > 0) { const y = Math.round(lerp(140, 104, lb)); halo(240, y - 10, 22, hex('#fff2b0'), 0.5); PZ.libro(R, 236, y, { s: 2 }); R.numero('3', 266, y - 6, { tam: 16, centro: true }); brilla(220, y - 24, t); }
  T.diagonDelante(R, t, o);
};

const efectos = [[AHORA, 'aviso'], [AVISO, 'golpecito'], [DESTRIPE, 'whoosh'], [P2 + 0.15, 'puerta'], [PISTAS, 'brillo'], [DETALLES, 'pop'],
  [P3 + 0.3, 'motor'], [VUELA, 'miau'], [SIRIUS + 0.4, 'guau'], [LIBRO3, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? 2026 : 1997) });
''')
