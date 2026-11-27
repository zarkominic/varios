E = {}

# Ayudas comunes de pintura (tramas de Bayer, ruido, nubes de tres tonos), repetidas en cada escena.
AYUDAS = r'''
const { rect, pset, linea, disco, poligono } = R;
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const trama = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const rampa = (cs, v, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(v + trama(x, y))))];
const h2 = (x, y) => { let n = (x * 374761393 + y * 668265263) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const H = (s) => hex(s);
// nube de tres tonos (sombra, cuerpo, luz) hecha de bolas; w de ancho
const nube = (x, y, w, [cS, c, cL]) => {
  const r = w / 5, b = [[-0.32, 0.1, 0.75], [-0.1, -0.25, 1], [0.14, -0.15, 0.95], [0.34, 0.12, 0.7], [0, 0.2, 0.9]];
  for (const [dx, dy, k] of b) disco(x + dx * w, y + dy * r * 2 + 1.5, r * k, cS);
  for (const [dx, dy, k] of b) disco(x + dx * w, y + dy * r * 2, r * k - 0.6, c);
  for (const [dx, dy, k] of b.slice(1, 3)) disco(x + dx * w - 1, y + dy * r * 2 - 1.2, r * k * 0.55, cL);
};
// un pájaro que aletea (2 tonos), en (x, y)
const pajaro = (x, y, t, c) => { const f = Math.floor(t * 6 + x) % 2; x = Math.round(x); y = Math.round(y);
  pset(x, y, c); if (f) { pset(x - 1, y - 1, c); pset(x + 1, y - 1, c); pset(x - 2, y - 1, c); pset(x + 2, y - 1, c); } else { pset(x - 1, y, c); pset(x + 1, y, c); pset(x - 2, y + 1, c); pset(x + 2, y + 1, c); } };
const fondoFijo = (cache, clave, pinta) => { let b = cache[clave]; if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); pinta(); R.recorte(null); R.usar(prev); cache[clave] = b; } R.copiar(b); };
const CACHE = {};
'''

E['dc-sputnik'] = ('Sputnik', '''// DC-SPUTNIK (frase 4), octubre de 1957, barra 1957. Cinco planos:
// 1. el patio de noche: el padre baja del porche y enciende la radio de la mesa, la madre sale a la puerta, el niño llega
//    corriendo y da un salto señalando el cielo, donde asoma un puntito; el gato espía, en la valla («October 1957»);
// 2. el cielo: el Sputnik cruza las estrellas y el brazo del niño lo sigue con el dedo («The Soviet Union launched Sputnik»);
// 3. inserto local de la mesa de jardín: la mano del padre gira el dial y la radio de onda corta pita al paso del puntito,
//    que destella en el cielo a cada bip («anyone with a shortwave radio could hear it beeping»);
// 4. el despacho de la Fuerza Aérea: el general lee el periódico con el satélite y se entristece; entra otro general y
//    hace la pregunta, con su «?» («Americans felt they were losing… somebody in the Air Force asked a question»);
// 5. la mesa del despacho de cerca: la maqueta de la Luna gira, sale un «?» que se vuelve «!», la Luna se ilumina y la
//    mano del general sella la carpeta de la Luna («What if we did something on the moon that the whole Earth could see?»).''', AYUDAS + r'''
const a = (f) => en('sputnik', f);
const P2 = a(0.1343), P3 = a(0.3278), P4 = a(0.5699), P5 = a(0.8472);
const SPUTNIK = a(0.1998), BEEP = a(0.4453), PASA = a(0.4867), LOSING = a(0.6296), AIRF = a(0.7471), PREG = a(0.8087);
const LUNA = a(0.9088), TIERRA = a(0.9435), VER = a(0.979);

// 1 · el patio
const ENCIENDE = P2 - 1.25;
const p1 = (t) => {
  const sp = t > P2 - 1.0 ? tramo(t, P2 - 1.0, P2) * 0.14 : null;
  T.carrera(R, t, { encuadre: 'patio57', pitido: t > ENCIENDE + 0.15, sputnik: sp });
  T.gatoEspia(R, 302, 112, t, { cara: t > P2 - 0.9 ? 'travieso' : 'normal', dir: -1 });
  // la madre sale por la puerta mosquitera al porche
  const m = tramo(t, 0.2, 1.5), mx = Math.round(lerp(68, 100, m));
  R.actor(EL.madre57, mx, 134, t, { dir: 1, anda: m > 0 && m < 1, sonrisa: m >= 1 && t < P2 - 0.8, sorpresa: t > P2 - 0.6, dedo: t > P2 - 0.75 });
  // el padre baja los escalones y enciende la radio
  const p = tramo(t, 0.1, 1.5), px = Math.round(lerp(116, 148, p));
  const gira = t > ENCIENDE - 0.5 && t < ENCIENDE + 0.5;
  R.actor(EL.padre57, px, 158, t, { dir: 1, anda: p > 0 && p < 1, sostiene: gira ? [178, 131] : false, sonrisa: t > ENCIENDE + 0.4 });
  // el niño llega corriendo y salta señalando el cielo
  const n = tramo(t, 0.5, 2.0), nx = Math.round(lerp(-18, 214, n)), sal = t > P2 - 0.95 && t < P2 - 0.45 ? Math.round(4 * Math.sin(Math.PI * tramo(t, P2 - 0.95, P2 - 0.45))) : 0;
  R.actor(EL.nino57, nx, 158, t, { dir: n >= 1 ? -1 : 1, anda: n > 0 && n < 1, salto: sal, dedo: t > P2 - 0.85, sorpresa: t > P2 - 0.85 });
  T.carreraDelante(R, t, { encuadre: 'patio57', pitido: t > ENCIENDE + 0.15 });
};

// 2 · el cielo: el Sputnik y el dedo del niño
const p2 = (t) => {
  const g = T.carrera(R, t, { encuadre: 'patio57', camara: 'cielo', sputnik: tramo(t, P2 + 0.1, P3 - 0.15) });
  const sp = g.sputnik ?? [12, 150];
  // el satélite se lee: un halo que late y las ondas de su bip que salen a cada paso
  if (t > P2 + 0.1) { const [x, y] = sp; for (let k = 0; k < 3; k++) { const w = ((t - P2) * 1.6 + k / 3) % 1; R.anillo(x, y, Math.round(4 + w * 16), H(w < 0.5 ? '#c8d0f0' : '#5a6498'), 2); }
    for (const [ox, oy] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) pset(x + ox, y + oy, H('#dfe6ff')); }
  const sube = tramo(t, P2 + 0.5, SPUTNIK - 0.1), hx = 26, hy = 214;
  const dx = sp[0] - hx, dy = sp[1] - hy, d = Math.hypot(dx, dy) || 1, L = lerp(10, 76, sube);
  if (sube > 0) T.brazo(R, hx, hy, Math.round(hx + dx / d * L), Math.round(hy + dy / d * L), '#c8403a', 1);
};

// 3 · inserto local: la radio de onda corta en la mesa de jardín (fondo local)
const RX = 252, RY = 142;   // la radio, s 3 (66 × 39): x 219–285, y 103–142
const beeps = []; for (let k = 0; k < 6; k++) beeps.push(BEEP - 0.5 + k * 0.56);
const fondo3 = () => fondoFijo(CACHE, 'radio', () => {
  const SK = ['#080b22', '#0c1230', '#121a3e', '#18224a', '#202c56', '#2a3662'].map(H);
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) {
    let v = y / 100 * 4.6 + 0.3; const dv = Math.abs(x * 0.5 + y - 150) / 34;
    if (dv < 1) v += (1 - dv) * 1.1 * (0.5 + 0.5 * h2(x >> 1, y >> 1));
    pset(x, y, rampa(SK, v, x, y));
  }
  for (let k = 0; k < 170; k++) { const x = (h2(k, 1) * 320) | 0, y = (h2(k, 2) * 92) | 0; if (x > 276 && y < 46) continue; pset(x, y, H(h2(k, 3) > 0.75 ? '#dfe6ff' : h2(k, 3) > 0.4 ? '#8a96c8' : '#5a6698')); }
  // la casa del vecino (izquierda): tejado de tejas, chimenea y dos ventanas
  poligono([[0, 66], [52, 50], [118, 70], [118, 100], [0, 100]], H('#14182a'));
  for (let y = 54; y < 72; y += 3) for (let x = 0; x < 118; x++) { const yy = 66 - (x < 52 ? x * 16 / 52 : 16 - (x - 52) * 20 / 66); if (y > yy && (x + (y >> 1) * 3) % 7 === 0) pset(x, y, H('#22283e')); }
  linea(0, 66, 52, 50, H('#2c3450')); linea(52, 50, 118, 70, H('#2c3450'));
  rect(26, 40, 36, 58, H('#1c1a28')); rect(25, 39, 37, 41, H('#2a2838')); for (let y = 43; y < 58; y += 3) linea(26, y, 36, y, H('#262234'));
  rect(0, 72, 118, 100, H('#1a2034')); for (let y = 74; y < 100; y += 4) linea(0, y, 118, y, H('#222a40'));
  rect(66, 76, 90, 92, H('#2a2416')); rect(67, 77, 89, 91, H('#e8b860')); rect(67, 77, 89, 79, H('#c8783a')); rect(78, 77, 78, 91, H('#6a4a24')); rect(67, 84, 89, 84, H('#6a4a24'));
  rect(67, 77, 70, 91, H('#c8584a')); rect(86, 77, 89, 91, H('#c8584a'));
  rect(12, 78, 32, 92, H('#1a1e30'));
  // la valla blanca a la luz del porche
  for (let x = 118; x < 320; x += 9) { const l = x < 200 ? 1 : 0; rect(x, 80, x + 5, 98, H(l ? '#a8a49a' : '#6e6c74')); pset(x + 2, 79, H(l ? '#a8a49a' : '#6e6c74')); pset(x + 3, 79, H(l ? '#a8a49a' : '#6e6c74')); rect(x + 5, 80, x + 5, 98, H('#3a3a46')); rect(x, 80, x, 98, H(l ? '#c8c4b8' : '#8a8890')); }
  rect(118, 85, 319, 86, H('#5a5866')); rect(118, 93, 319, 94, H('#4a4856'));
  // el arce en silueta (derecha), con hojas que cogen la luz
  for (const [cx, cy, r] of [[262, 66, 22], [292, 70, 20], [312, 60, 16], [240, 78, 14], [276, 52, 12]]) disco(cx, cy, r, H('#10141e'));
  for (let k = 0; k < 120; k++) { const x = 226 + h2(k, 7) * 94, y = 50 + h2(k, 8) * 44; if (y < 47 && x > 276) continue; if (Math.hypot(x - 268, y - 66) < 34) pset(x, y, H(h2(k, 9) > 0.6 ? '#5a2e22' : '#2a1e24')); }
  rect(262, 86, 270, 100, H('#0c0e16'));
  // el tablero de la mesa: cinco tablas con vetas, nudos, clavos y la luz cálida del porche por la izquierda
  const MD = ['#3a2010', '#56321a', '#704424', '#8c5a30', '#a8703c', '#c08a50'].map(H);
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tb = Math.floor((y - 98) / 17), yy = (y - 98) % 17;
    if (yy === 0) { pset(x, y, MD[0]); continue; }
    let v = 4.4 - x / 320 * 2.0 - (yy > 14 ? 1 : 0) + (yy === 1 ? 0.8 : 0);
    v += 0.7 * Math.sin(x * 0.05 + tb * 2.1 + Math.sin(x * 0.013 + tb) * 3 + yy * 0.45);
    v += (h2(x >> 2, y) - 0.5) * 0.6;
    pset(x, y, rampa(MD, v, x, y));
  }
  for (const [nx, ny] of [[64, 122], [190, 156], [296, 106]]) { disco(nx, ny, 3, MD[1]); disco(nx, ny, 1.5, MD[0]); }
  for (let tb = 0; tb < 5; tb++) for (const x of [14, 160, 306]) { pset(x, 104 + tb * 17, H('#b8b8c0')); pset(x, 105 + tb * 17, H('#5a5a64')); }
  rect(0, 97, 319, 97, H('#d8a868'));
  // el periódico doblado, con el dibujo del satélite (rayas, sin letras)
  poligono([[24, 132], [104, 126], [110, 164], [30, 170]], H('#3a2414'));
  poligono([[22, 129], [102, 123], [108, 161], [28, 167]], H('#e4dcc4'));
  linea(22, 129, 102, 123, H('#fff6e0')); linea(28, 167, 108, 161, H('#a8a08a'));
  for (let k = 0; k < 2; k++) { const y0 = 133 + k; linea(28, y0, 98, y0 - 5, H('#2a2832')); }
  for (let r = 0; r < 9; r++) { const y0 = 140 + r * 3; linea(30, y0, 60, y0 - 2, H('#8a8678')); }
  poligono([[66, 135], [98, 133], [100, 155], [68, 157]], H('#3a3a4a'));
  disco(83, 145, 5, H('#d8d8e0')); disco(82, 144, 2, H('#ffffff'));
  for (const [ex, ey] of [[74, 152], [92, 152], [76, 139], [90, 139]]) linea(83, 145, ex, ey, H('#d8d8e0'));
  // el vaso de limonada con hielo y pajita
  rect(124, 156, 142, 158, H('#2a1a0e'));
  rect(122, 128, 138, 156, H('#9ab8c4')); rect(123, 129, 137, 155, H('#c8e0e8')); rect(123, 136, 137, 155, H('#f0d060')); rect(123, 136, 137, 137, H('#fff0a0'));
  rect(126, 139, 130, 143, H('#fffbe8')); rect(131, 145, 135, 149, H('#fffbe8')); rect(124, 129, 125, 155, H('#ffffff'));
  linea(132, 140, 141, 112, H('#c8303a')); linea(133, 140, 142, 112, H('#f0eaea'));
  disco(130, 128, 3, H('#e8e040')); pset(130, 128, H('#a8a020'));
  // el plato de galletas
  for (let y = -6; y <= 6; y++) for (let x = -22; x <= 22; x++) { const q = (x / 22) ** 2 + (y / 6) ** 2; if (q <= 1) pset(176 + x, 166 + y, q > 0.75 ? H('#a8a8b8') : H('#ecebf2')); }
  for (const [cx, cy] of [[166, 164], [178, 162], [188, 166], [174, 168]]) { disco(cx, cy, 5, H('#7a4a1e')); disco(cx, cy - 1, 4.5, H('#c08840')); for (let k = 0; k < 4; k++) pset(cx - 2 + k * 1.5, cy - 2 + (k % 2) * 2, H('#3a2010')); }
  // la linterna
  rect(32, 172, 72, 178, H('#2a0e0e')); rect(34, 171, 70, 176, H('#a83030')); rect(34, 171, 70, 172, H('#d85050'));
  rect(26, 169, 36, 178, H('#5a5e6a')); rect(27, 170, 35, 177, H('#c8ccd8')); rect(24, 171, 26, 176, H('#fff0a0'));
  rect(52, 170, 56, 171, H('#2a2832'));
  // el cuaderno del niño (cuenta los bips) y el lápiz; la pipa del padre en su cenicero
  poligono([[150, 150], [198, 147], [201, 176], [153, 179]], H('#2a1a0e'));
  poligono([[148, 148], [196, 145], [199, 174], [151, 177]], H('#f2eee2'));
  for (let r = 0; r < 5; r++) linea(152, 156 + r * 4, 196, 153 + r * 4, H('#9ab0d0')); linea(158, 148, 161, 176, H('#e09090'));
  rect(203, 160, 236, 162, H('#2a1a0e')); rect(203, 159, 234, 160, H('#e8c040')); rect(203, 159, 206, 160, H('#f0b0a0')); rect(233, 159, 236, 161, H('#3a3a3a'));
  for (let y = -5; y <= 5; y++) for (let x = -12; x <= 12; x++) { const q = (x / 12) ** 2 + (y / 5) ** 2; if (q <= 1) pset(298 + x, 168 + y, q > 0.6 ? H('#5a5e6a') : H('#2a2c34')); }
  rect(288, 162, 300, 164, H('#3a2010')); disco(302, 162, 3, H('#6a3a1a')); disco(302, 161, 2, H('#2a1a0e'));
  // sombra de la radio
  for (let y = 140; y < 147; y++) for (let x = 214; x < 292; x++) if ((x + y) % 2 === 0 || y > 142) pset(x, y, H('#3a2010'));
});
const humo = (x, y, t, n = 5) => { for (let k = 0; k < n; k++) { const u = ((t * 0.25 + k / n) % 1), px = x + Math.sin(u * 5 + k) * 4 + u * 10, py = y - u * 30; disco(px, py, 1.5 + u * 3, H(u > 0.6 ? '#1a2040' : '#262c48')); } };
const p3 = (t) => {
  fondo3();
  // nubes nocturnas a tres velocidades
  nube(((40 + t * 3) % 380) - 30, 28, 46, [H('#121836'), H('#1a2244'), H('#262e56')]);
  nube(((210 + t * 1.6) % 380) - 30, 46, 34, [H('#141a38'), H('#1c2446'), H('#283058')]);
  nube(((120 + t * 5) % 380) - 30, 64, 24, [H('#161c3a'), H('#20284a'), H('#2c3660')]);
  // estrellas que titilan
  for (let k = 0; k < 24; k++) { const x = (h2(k, 21) * 270) | 0, y = 4 + ((h2(k, 22) * 70) | 0); if (Math.sin(t * (2 + k % 3) + k) > 0.3) { pset(x, y, H('#ffffff')); if (k % 5 === 0) { pset(x - 1, y, H('#8a96c8')); pset(x + 1, y, H('#8a96c8')); } } }
  humo(31, 38, t);
  // la tele azul del vecino
  const tv = Math.sin(t * 13) + Math.sin(t * 7.3) > 0.4; rect(13, 79, 31, 91, H(tv ? '#7aa4ff' : '#4a6ad0')); rect(13, 79, 31, 80, H('#b4ccff'));
  // el Sputnik cruza el cielo y destella a cada bip
  const u = tramo(t, P3 + 0.1, P4 - 0.1), sx = lerp(10, 262, u), sy = lerp(74, 30, u) - Math.sin(u * Math.PI) * 10;
  for (let i = 1; i < 12; i++) { const v = u - i * 0.008; if (v < 0) break; const tx = lerp(10, 262, v), ty = lerp(74, 30, v) - Math.sin(v * Math.PI) * 10; if (i % 2) pset(tx, ty, H(i < 5 ? '#a8b0d4' : '#4a5488')); }
  const flash = beeps.some((b) => t > b && t < b + 0.16);
  pset(sx, sy, H('#ffffff')); for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pset(sx + ox, sy + oy, H(flash ? '#ffffff' : '#98a2cc'));
  if (flash) for (let r = 2; r <= 4; r++) for (const [ox, oy] of [[r, 0], [-r, 0], [0, r], [0, -r]]) pset(sx + ox, sy + oy, H(r < 4 ? '#dfe6ff' : '#6a74a4'));
  // polillas en la luz del porche
  for (let k = 0; k < 4; k++) { const mx = 40 + 30 * Math.sin(t * (1.7 + k * 0.3) + k * 2), my = 112 + 10 * Math.sin(t * (2.3 + k * 0.4) + k); pset(mx, my, H('#d8d0b8')); pset(mx + (Math.floor(t * 12 + k) % 2 ? 1 : -1), my, H('#a8a090')); }
  // la radio: el dial se gira y el altavoz pita
  const gira = tramo(t, P3 + 0.55, P3 + 1.7), dial = 0.2 + 0.55 * gira + (gira > 0 && gira < 1 ? 0.04 * Math.sin(t * 20) : 0);
  for (let r = 10; r > 0; r -= 2) for (let k = 0; k < 18; k++) { const an = k / 18 * Math.PI * 2, x = 264 + Math.cos(an) * r * 1.8, y = 121 + Math.sin(an) * r; if ((k + r) % 3 === 0) pset(x, y, H(r > 6 ? '#6a4a24' : '#9a7030')); }
  T.PIEZAS_DC.radioOnda(R, RX, RY, { t, encendida: true, dial, s: 3 });
  for (const b of beeps) { const w = (t - b) / 0.7; if (w > 0 && w < 1) for (let k = 0; k < 3; k++) { const r = 8 + w * 34 + k * 7; if (r > 46) continue; for (let an = 2.35; an <= 3.95; an += 0.06) pset(Math.round(224 + Math.cos(an) * r), Math.round(122 + Math.sin(an) * r * 0.9), H(w < 0.5 ? '#fff0a0' : '#d8b860')); } }
  // en el cuaderno, una raya por cada bip
  const n = beeps.filter((b) => t > b).length;
  for (let k = 0; k < n; k++) { const x = 166 + k * 5 + (k >= 4 ? 4 : 0); linea(x, 158 - k * 0.3, x + 1, 168 - k * 0.3, H('#2a2a3a')); if (k === 4) linea(162, 166, 186, 158, H('#2a2a3a')); }
  if (n > 0) R.numero(String(n), 186, 175, { centro: true });
  // la mano del padre entra por la derecha, gira el mando y se va
  const entra = tramo(t, P3 + 0.15, P3 + 0.55) - tramo(t, P3 + 1.85, P3 + 2.35);
  if (entra > 0) { const wx = Math.round(lerp(336, 286, entra)), wy = Math.round(lerp(176, 137, entra) + (gira > 0 && gira < 1 ? Math.sin(t * 20) : 0)); T.brazo(R, 352, 196, wx, wy, '#8a6a44', -1); }
};

// 4 · el despacho de la Fuerza Aérea
const p4 = (t) => {
  T.carrera(R, t, { encuadre: 'despachoAF' });
  // el gato espía escucha en el alféizar, por fuera del cristal
  R.recorte([202, 22, 266, 108]); T.gatoEspia(R, 254, 108, t, { dir: -1, cara: t > PREG ? 'travieso' : 'normal' }); R.recorte(null);
  // el general de la mesa lee el periódico del satélite y se entristece
  const lee = t < PREG - 0.3;
  const g1 = R.actor(EL.generalAF, 140, 133, t, { dir: 1, sostiene: lee ? [158, 108] : false, triste: t > LOSING - 0.2 && t < AIRF, sorpresa: t > PREG + 0.1, habla: t > P4 + 0.3 && t < P4 + 1.1 && Math.sin(t * 14) > 0 });
  if (lee) { const [hx, hy] = g1.mano; rect(hx - 1, hy - 9, hx + 13, hy + 2, T.C.k); rect(hx, hy - 8, hx + 12, hy + 1, H('#e8e2cc')); rect(hx + 1, hy - 7, hx + 11, hy - 6, H('#2a2832'));
    disco(hx + 8, hy - 2, 2, H('#3a3a4a')); pset(hx + 8, hy - 2, H('#ffffff')); for (let k = 0; k < 3; k++) linea(hx + 1, hy - 4 + k * 2, hx + 4, hy - 4 + k * 2, H('#8a8678')); disco(hx, hy, 1.5, H('#f0b888')); }
  // entra el otro general por la derecha, se para y hace la pregunta
  const w = tramo(t, P4 + 0.2, P4 + 1.9), x2 = Math.round(lerp(332, 236, w));
  R.actor(EL.generalAF2, x2, 160, t, { dir: -1, anda: w > 0 && w < 1, triste: t > LOSING && t < AIRF - 0.5, dedo: t > AIRF - 0.1, habla: t > AIRF && t < PREG + 0.2 && Math.sin(t * 13) > 0 });
  const q = tramo(t, PREG, PREG + 0.3); if (q > 0) { const y = Math.round(lerp(126, 116, q)); R.icono('?', x2 + 1, y - 6, H('#fff0a0'), T.C.k, 2); }
  T.carreraDelante(R, t, { encuadre: 'despachoAF' });
};

// 5 · la mesa de cerca: la maqueta de la Luna y la carpeta que se sella
const SELLA = VER + 0.15;
const p5 = (t) => {
  T.carrera(R, t, { encuadre: 'despachoAF', camara: 'mesa' });
  // la Luna se ilumina: «que toda la Tierra la vea»
  const ilum = tramo(t, TIERRA - 0.1, TIERRA + 0.4) * (1 - tramo(t, SELLA + 0.6, SELLA + 1.4));
  if (ilum > 0) for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2 + t * 0.6, r0 = 33, r1 = 33 + ilum * (k % 2 ? 7 : 12); linea(64 + Math.cos(an) * r0, 60 + Math.sin(an) * r0, 64 + Math.cos(an) * r1, 60 + Math.sin(an) * r1, H(k % 2 ? '#fff0a0' : '#ffe070')); }
  // «?» que se vuelve «!» sobre la Luna
  const q = tramo(t, LUNA - 0.2, LUNA + 0.15); if (q > 0) R.icono(t < TIERRA ? '?' : '!', 102, Math.round(lerp(42, 24, q)), H('#fff0a0'), T.C.k, 3);
  // la carpeta de la Luna: sin sello hasta que baja la mano
  T.PIEZAS_DC.carpeta(R, 176, 160, { s: 3, dibujo: 'luna', sello: t > SELLA ? true : false });
  const baja = tramo(t, P5 + 0.6, P5 + 1.4) - tramo(t, SELLA + 0.5, SELLA + 1.3);
  const golpe = t > SELLA - 0.25 && t < SELLA + 0.15 ? 1 : 0;
  if (baja > 0) {
    const wx = Math.round(lerp(226, 196, baja)), wy = Math.round(lerp(204, 128, baja) + (golpe ? 6 : 0) - (t > SELLA - 0.6 && t < SELLA - 0.25 ? 4 : 0));
    T.PIEZAS_DC.sello(R, wx - 8, wy + 12, { s: 2 });
    T.brazo(R, 230, 232, wx, wy, '#46587e', -1);
  }
  if (t > SELLA) { const e = tramo(t, SELLA, SELLA + 0.25); if (e < 1) for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2, r = 10 + e * 14; pset(188 + Math.cos(an) * r, 142 + Math.sin(an) * r * 0.6, H('#f08aa0')); } }
};

const efectos = [[ENCIENDE, 'interruptor'], [SPUTNIK, 'brillo'], [P3 + 0.7, 'tic'], ...beeps.map((b) => [b, 'bip']), [P4 + 0.3, 'papel'], [PREG, 'pop'], [TIERRA, 'brillo'], [SELLA - 0.05, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1957 });
''')

E['dc-armour'] = ('Armour', '''// DC-ARMOUR (frase 5), 1958, cartela «1958». Cinco planos:
// 1. fondo local: la calle de Chicago con el edificio de ladrillo de la Armour Research Foundation, el tren elevado y
//    palomas; para un coche de la Fuerza Aérea, baja un general con la carpeta y se la da al físico en la puerta
//    («The job went to a laboratory in Chicago, the Armour Research Foundation»);
// 2. el laboratorio: Reiffel entra con la carpeta hasta las pizarras y explica; el joven Sagan, tras el banco, se
//    sorprende con la bomba («and to a physicist named Leonard Reiffel. The idea was to send a missile…»);
// 3. la pizarra de cerca: la mano de Reiffel lleva el puntero por la trayectoria; el cohete de tiza llega a la línea del
//    día y la noche y la nube de polvo crece y brilla al Sol («to the line between the moon's day and night… and glow»);
// 4. fondo local: la azotea al anochecer; Sagan sale con su regla de cálculo, hace cuentas y en su bocadillo la nube
//    crece; luego se asoma al telescopio; el gato espía lo mira tras la chimenea («A young Carl Sagan, still a student…»);
// 5. por el ocular: la Luna de verdad; en la línea del día y la noche, la marca de la nube que crece y su «?»
//    («…would grow and whether we could see it from here»).''', AYUDAS + r'''
import { coche1947 } from '/atomo/plato/escenas/ov-comun.js';
const a = (f) => en('armour', f);
const P2 = a(0.1906), P3 = a(0.4545), P4 = a(0.7167), P5 = a(0.8816);
const REIFFEL = a(0.2422), IDEA = a(0.3055), MISIL = a(0.3613), BOMBA = a(0.4245), NOCHE = a(0.5303), POLVO = a(0.5636), SOL = a(0.651), BRILLA = a(0.6818);
const SAGAN = a(0.7459), ESTUD = a(0.7916), CALCULA = a(0.8158), NUBE = a(0.8616), CRECE = a(0.904), SI = a(0.9365), AQUI = a(0.9789);

// ── 1 · la calle de Chicago (fondo local) ──
const LAD = ['#5a2418', '#7a3424', '#94432e', '#a8523a', '#bc6448'].map(H);
const ventana = (x, y, w, h) => {
  rect(x - 2, y - 2, x + w + 1, y + h + 2, H('#c8b898')); rect(x - 2, y + h + 1, x + w + 1, y + h + 2, H('#e8dcc0')); rect(x - 2, y - 2, x + w + 1, y - 2, H('#8a7a60'));
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) { const r = ((xx - x) + (yy - y) * 0.7) % 26; pset(xx, yy, r < 4 ? H('#7a9ac0') : yy - y < 3 ? H('#2a3650') : H((xx + yy) % 2 ? '#34466a' : '#3a4c70')); }
  for (let xx = x + Math.floor(w / 3); xx < x + w; xx += Math.floor(w / 3)) rect(xx, y, xx, y + h - 1, H('#c8b898'));
  rect(x, y + Math.floor(h / 2), x + w - 1, y + Math.floor(h / 2), H('#c8b898'));
};
const fondo1 = () => fondoFijo(CACHE, 'calle', () => {
  const SK = ['#4a7ac8', '#5a8ad0', '#6a9ad8', '#7caae0', '#90bae6', '#a8caec'].map(H);
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(SK, y / 110 * 5.2 + (h2(x >> 3, y >> 2) - 0.5) * 0.3, x, y));
  // la ciudad al fondo, azulada por la bruma, con sus ventanas
  const torres = [[0, 26, 64], [24, 50, 38], [252, 274, 56], [270, 300, 70], [296, 320, 60], [240, 256, 74], [36, 52, 58]];
  for (const [x0, x1, y0] of torres) { for (let y = y0; y < 150; y++) for (let x = x0; x <= x1; x++) pset(x, y, rampa(['#6e7e9e', '#7f90b0', '#8a9aba'].map(H), 1 + (x - x0) / (x1 - x0 + 1) * -0.8 + 0.6 + (y - y0) / 200, x, y));
    rect(x0, y0, x0, 150, H('#a8b6ce')); rect(x1, y0, x1, 150, H('#62729a')); rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, H('#5a6a8a'));
    for (let y = y0 + 4; y < 146; y += 6) for (let x = x0 + 3; x < x1 - 2; x += 5) { const c = h2(x, y) > 0.82 ? '#d8e2f0' : '#56668a'; rect(x, y, x + 2, y + 2, H(c)); pset(x, y, H('#9aaac4')); }
    if (x1 - x0 > 20) { rect(Math.round((x0 + x1) / 2), y0 - 8, Math.round((x0 + x1) / 2), y0 - 2, H('#5a6a8a')); } }
  rect(8, 18, 10, 26, H('#6a7a9a'));
  // el depósito de agua de la azotea
  rect(178, 30, 206, 46, H('#6a4a2a')); for (let x = 180; x < 206; x += 4) rect(x, 30, x, 46, H('#8a6238')); rect(178, 34, 206, 34, H('#3a2a1a')); rect(178, 42, 206, 42, H('#3a2a1a'));
  poligono([[176, 30], [192, 20], [208, 30]], H('#4a3a30')); linea(192, 20, 208, 30, H('#6a5a48'));
  for (const x of [182, 202]) linea(x, 46, x - 2, 54, H('#3a3030')); linea(182, 50, 202, 50, H('#3a3030'));
  // el edificio de ladrillo: cornisa, dos plantas de ventanas de fábrica y la planta baja con la entrada
  for (let y = 52; y < 148; y++) for (let x = 56; x < 244; x++) {
    const fila = (y - 52) >> 2, off = (fila % 2) * 4, jv = ((x - 56 + off) % 8) === 0, jh = ((y - 52) % 4) === 3;
    pset(x, y, jh || jv ? LAD[1] : rampa(LAD, 2.4 + (h2((x + off) >> 3, fila) - 0.5) * 1.6 - (x > 236 ? 1 : 0) + (x < 62 ? 0.8 : 0), x, y));
  }
  rect(52, 46, 247, 52, H('#d8c8a8')); rect(52, 46, 247, 46, H('#f0e4c8')); rect(52, 52, 247, 53, H('#6a5a48'));
  for (let x = 54; x < 246; x += 5) rect(x, 49, x + 2, 51, H('#b8a888'));
  for (const y of [84, 116]) { rect(56, y, 243, y + 2, H('#d8c8a8')); rect(56, y + 3, 243, y + 3, H('#6a3424')); }
  for (const x of [64, 92, 120, 160, 188, 216]) { ventana(x, 58, 20, 22); ventana(x, 90, 20, 22); }
  for (const x of [64, 92, 188, 216]) ventana(x, 122, 20, 18);
  // la entrada: portada de piedra, puerta doble de cristal, el medallón del átomo, farolillos y escalones
  rect(128, 112, 172, 148, H('#c8b898')); rect(128, 112, 172, 113, H('#efe2c4')); rect(171, 112, 172, 148, H('#8a7a60'));
  rect(136, 120, 164, 146, H('#3a2a1e')); rect(137, 121, 149, 146, H('#5a4030')); rect(151, 121, 163, 146, H('#5a4030'));
  for (const x0 of [139, 153]) { rect(x0, 123, x0 + 8, 136, H('#3a4c70')); rect(x0, 123, x0 + 2, 136, H('#7a9ac0')); }
  rect(147, 133, 148, 137, H('#e8c860')); rect(152, 133, 153, 137, H('#e8c860'));
  disco(150, 100, 8, H('#8a7a60')); disco(150, 100, 7, H('#e8dcc0')); R.anillo(150, 100, 5, H('#c8282a')); disco(150, 100, 1.5, H('#c8282a'));
  for (const [ex, ey] of [[144, 96], [156, 104]]) pset(ex, ey, H('#2a3a6a'));
  for (const x of [124, 176]) { rect(x - 2, 118, x + 2, 126, H('#2a2a2a')); rect(x - 1, 119, x + 1, 125, H('#f8e8a0')); rect(x, 126, x, 130, H('#2a2a2a')); }
  for (let k = 0; k < 3; k++) { rect(124 - k * 3, 146 + k * 2, 176 + k * 3, 147 + k * 2, H(k % 2 ? '#a8a090' : '#c8c0b0')); }
  // el edificio de la izquierda (piedra gris) con el toldo de rayas
  for (let y = 70; y < 150; y++) for (let x = 0; x < 52; x++) pset(x, y, ((y - 70) % 6 === 5 || (x + ((y - 70) / 6 | 0) * 7) % 14 === 0) ? H('#6e6a70') : rampa(['#7e7a80', '#8e8a90', '#a09ca0'].map(H), 1.2 + h2(x >> 2, y >> 2), x, y));
  rect(0, 66, 53, 70, H('#c8c0b0')); for (const x of [6, 28]) ventana(x, 78, 14, 16);
  for (let x = 0; x < 50; x++) { const c = (x >> 2) % 2 ? '#e8e0d0' : '#b83a32'; rect(x, 116, x, 124 - (x % 4 === 0 ? 1 : 0), H(c)); } rect(0, 124, 50, 125, H('#5a2420'));
  rect(4, 126, 46, 148, H('#2a2e3a')); rect(6, 128, 44, 146, H('#4a5a70')); rect(6, 128, 12, 146, H('#7a8aa0'));
  // el tren elevado de la derecha: viga de acero roblonada y pilares con cruces
  rect(244, 92, 319, 101, H('#4a5058')); rect(244, 92, 319, 93, H('#7a8088')); rect(244, 101, 319, 102, H('#2a2e34'));
  for (let x = 246; x < 320; x += 6) { pset(x, 95, H('#9aa0a8')); pset(x, 98, H('#9aa0a8')); }
  for (const x of [262, 304]) { rect(x, 102, x + 5, 150, H('#3e444c')); rect(x, 102, x, 150, H('#6a7078')); }
  for (let k = 0; k < 4; k++) { linea(267, 104 + k * 12, 303, 114 + k * 12, H('#3a4048')); linea(303, 104 + k * 12, 267, 114 + k * 12, H('#3a4048')); }
  // la acera de losas, el bordillo, la calzada con los raíles del tranvía y la tapa de alcantarilla
  for (let y = 148; y < 160; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 24 === 0 || y === 154) ? H('#8e8a80') : rampa(['#a8a498', '#b8b4a8', '#c8c4b8'].map(H), 1 + h2(x >> 1, y) * 0.8 + (y < 150 ? -0.6 : 0), x, y));
  rect(0, 160, 319, 162, H('#9a968c')); rect(0, 163, 319, 163, H('#4a4842'));
  for (let y = 164; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(['#34343c', '#3e3e46', '#4a4a52', '#56565e'].map(H), 1.3 + (h2(x, y) - 0.5) * 1.4 + (y - 164) * 0.05, x, y));
  for (const y of [171, 177]) { rect(0, y, 319, y, H('#8a8a90')); rect(0, y + 1, 319, y + 1, H('#24242a')); }
  for (let x = 6; x < 320; x += 30) rect(x, 168, x + 12, 168, H('#c8b040'));
  for (let y = -2; y <= 2; y++) for (let x = -7; x <= 7; x++) if ((x / 7) ** 2 + (y / 2.2) ** 2 <= 1) pset(226 + x, 174 + y, H((x + y) % 2 ? '#2a2a30' : '#5a5a60'));
  // la farola, la boca de incendios y el buzón
  rect(98, 108, 100, 150, H('#2a2e34')); rect(97, 148, 101, 150, H('#2a2e34')); disco(99, 104, 4, H('#2a2e34')); disco(99, 104, 3, H('#f0e8c8')); pset(98, 103, H('#ffffff'));
  rect(232, 140, 238, 150, H('#5a1414')); rect(233, 141, 237, 149, H('#c83a32')); rect(231, 143, 239, 145, H('#c83a32')); rect(233, 141, 234, 149, H('#e86a5a'));
  rect(26, 134, 40, 150, H('#1a2a4a')); rect(27, 135, 39, 149, H('#2a4a8a')); rect(27, 134, 39, 136, H('#3a6ab0')); rect(29, 140, 37, 140, H('#1a2a4a'));
});
const tren = (x0) => { // tres coches verdes y crema; solo se ve fuera del edificio
  const P = (x, y, c) => { if (x >= 246 || x < 56) pset(x, y, c); };
  for (let k = 0; k < 3; k++) { const cx = x0 + k * 44; for (let y = 76; y < 92; y++) for (let x = cx; x < cx + 42; x++) {
    const c = y < 78 ? '#3a4a3a' : y < 84 ? (((x - cx) % 7 < 4 && x - cx > 2 && x - cx < 40) ? (y < 80 ? '#c8d8e0' : '#6a8aa0') : '#e8dcb8') : y < 89 ? '#4a6a4a' : '#2a2e2a'; P(x, y, H(c)); } }
};
const bandera = (x, y, t) => { rect(x, y, x, y + 26, H('#2a2a2a')); pset(x, y - 1, H('#e8c860'));
  for (let i = 0; i < 18; i++) { const ond = Math.round(Math.sin(t * 6 - i * 0.5) * (i / 18) * 2); for (let j = 0; j < 11; j++) { const c = i < 8 && j < 6 ? ((i + j) % 3 === 0 ? '#ffffff' : '#2a3a7a') : (j % 2 ? '#ffffff' : '#c8282a'); pset(x + 1 + i, y + j + ond, H(c)); } } };
const p1 = (t) => {
  fondo1();
  nube(((30 + t * 2) % 380) - 30, 26, 52, [H('#c8d4e8'), H('#e4ecf6'), H('#ffffff')]);
  nube(((180 + t * 4) % 380) - 30, 40, 34, [H('#b8c8e0'), H('#dce6f2'), H('#f8fbff')]);
  nube(((250 + t * 7) % 380) - 30, 16, 22, [H('#c0cce2'), H('#e0e8f4'), H('#ffffff')]);
  bandera(66, 20, t);
  // humo de la chimenea del laboratorio
  rect(226, 36, 232, 46, H('#5a2a1e')); rect(226, 36, 232, 37, H('#8a4a34'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.35 + k / 5) % 1; disco(229 + u * 18 + Math.sin(u * 6) * 2, 33 - u * 22, 1.5 + u * 3, H(u > 0.5 ? '#c8ccd4' : '#a8acb4')); }
  // el tren elevado que pasa
  tren(Math.round(lerp(340, -150, tramo(t, 0.3, 4.6))));
  // palomas: en la cornisa y una bandada que cruza
  for (let k = 0; k < 4; k++) { const x = 90 + k * 37, y = 45, pic = Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0; rect(x, y - 3 + pic, x + 4, y - 1 + pic, H('#7a7a88')); pset(x + 4 + (pic ? 1 : 0), y - 4 + pic * 2, H('#5a5a68')); pset(x + 1, y - 2 + pic, H('#9a9aa8')); }
  for (let k = 0; k < 5; k++) pajaro(((t * 22 + k * 11) % 380) - 30, 30 + Math.sin(t + k) * 3 + (k % 2) * 5, t + k * 0.2, H('#3a3a4a'));
  // los paseantes de la acera
  const w1 = tramo(t, 0, 3.6); R.actor(EL.ingenieroCIA, Math.round(lerp(60, 340, w1)), 157, t, { dir: 1, anda: w1 < 1 });
  // el físico espera en la puerta; el general le da la carpeta
  const DA = a(0.1);   // la entrega, mientras dice «Chicago»
  const g = tramo(t, 2.5, DA - 0.25), gx = Math.round(lerp(70, 122, g));
  const baja = tramo(t, DA - 0.7, DA - 0.25), rx = Math.round(lerp(145, 136, baja));
  const r1 = R.actor(EL.reiffel, rx, Math.round(lerp(146, 150, baja)), t, { dir: -1, anda: baja > 0 && baja < 1, sostiene: t > DA ? [rx - 4, 138] : false, sonrisa: t > DA, habla: t > DA + 0.6 && Math.sin(t * 12) > 0 });
  const vuelve = tramo(t, DA + 1.1, P2 - 0.2), gx2 = Math.round(lerp(gx, 84, vuelve));
  if (t > 2.4) { const g2 = R.actor(EL.generalAF2, gx2, 157, t, { dir: vuelve > 0 ? -1 : 1, anda: (g > 0 && g < 1) || (vuelve > 0 && vuelve < 1), sostiene: t <= DA ? [gx + 20, 138] : false, dedo: t > DA + 0.3 && t < DA + 1.1, sonrisa: t > DA });
    if (t <= DA) { const [hx, hy] = g2.mano; T.PIEZAS_DC.carpeta(R, hx + 2, hy + 9, { s: 1, dibujo: 'luna' }); disco(hx, hy, 1.5, H('#f0b888')); } }
  if (t > DA) { const [hx, hy] = r1.mano; T.PIEZAS_DC.carpeta(R, hx - 2, hy + 9, { s: 1, dibujo: 'luna' }); disco(hx, hy, 1.5, H('#f0c8a0')); }
  // el coche de la Fuerza Aérea que llega y para; otro pasa por el carril de atrás
  const c2 = tramo(t, 3.0, 6.2); if (c2 > 0 && c2 < 1) coche1947(R, Math.round(lerp(340, -70, c2)), 170, t, { dir: -1, color: H('#8a3a2a'), sombra: H('#5a2418') });
  const c = tramo(t, 0.6, 2.4), cx = Math.round(lerp(-70, 40, 1 - (1 - c) * (1 - c)));
  coche1947(R, cx, 177, t, { dir: 1, color: H('#5a6a8a'), sombra: H('#3a4a6a') });
  const w2 = tramo(t, 3.2, 6.2); if (w2 > 0) R.actor(EL.ingenieroCIA2, Math.round(lerp(330, 236, w2)), 159, t, { dir: -1, anda: w2 < 1 });
};

// ── 2 · el laboratorio ──
const p2 = (t) => {
  T.carrera(R, t, { encuadre: 'laboratorio' });
  // un ayudante deja papeles en el carrito
  const w = tramo(t, P2 + 0.1, P2 + 1.4), ax = Math.round(lerp(-16, 70, w));
  const ay = R.actor(EL.ingenieroCIA, ax, 158, t, { dir: w < 1 ? 1 : -1, anda: w > 0 && w < 1, sostiene: w < 1 ? true : false, dedo: t > IDEA + 0.5 && t < IDEA + 1.4, sorpresa: t > BOMBA - 0.2 && t < BOMBA + 1 });
  if (w < 1) { const [hx, hy] = ay.mano; rect(hx - 4, hy - 2, hx + 6, hy + 4, T.C.k); rect(hx - 3, hy - 1, hx + 5, hy + 3, H('#f2eee2')); rect(hx - 2, hy, hx + 4, hy, H('#8a8678')); }
  else { rect(40, 120, 52, 124, T.C.k); rect(41, 120, 51, 123, H('#f2eee2')); rect(42, 121, 50, 121, H('#8a8678')); }
  // Reiffel llega con la carpeta a la pizarra pequeña y explica
  const r = tramo(t, P2 + 0.15, REIFFEL - 0.1), rx = Math.round(lerp(96, 160, r)), habla = t > REIFFEL + 0.4 && t < P3 - 0.2 && Math.sin(t * 11) > -0.2;
  const ri = R.actor(EL.reiffel, rx, 158, t, { dir: t < REIFFEL + 0.1 ? 1 : -1, anda: r > 0 && r < 1, sostiene: t < IDEA ? true : false, dedo: t > IDEA && t < P3 - 0.3, sonrisa: t > REIFFEL && t < IDEA, habla });
  if (t < IDEA) { const [hx, hy] = ri.mano; T.PIEZAS_DC.carpeta(R, hx, hy + 9, { s: 1, dibujo: 'luna' }); disco(hx, hy, 1.5, H('#f0c8a0')); }

  // el cohete de tiza de la pizarra grande sale de la Tierra hacia la Luna cuando dice «misil»
  const tr = tramo(t, MISIL - 0.2, BOMBA + 0.6);
  if (tr > 0) { const q = (u) => [(1 - u) ** 2 * 30 + 2 * (1 - u) * u * 56 + u * u * 112, (1 - u) ** 2 * 96 + 2 * (1 - u) * u * 26 + u * u * 50];
    for (let k = 0; k <= 30 * tr; k++) { const [x, y] = q(k / 30); if (k % 2 === 0) pset(x, y, H('#ffe070')); }
    const [x, y] = q(tr), [x2, y2] = q(Math.min(1, tr + 0.04)), an = Math.atan2(y2 - y, x2 - x), c = Math.cos(an), s = Math.sin(an);
    for (let i = -4; i <= 4; i++) for (let j = -1; j <= 1; j++) { if (i > 2 && j !== 0) continue; pset(x + c * i - s * j, y + s * i + c * j, H('#fff8e8')); }
    pset(x - c * 5, y - s * 5, H(Math.sin(t * 30) > 0 ? '#ffb040' : '#ff7030')); pset(x - c * 6, y - s * 6, H('#ff7030'));
    if (tr >= 1) R.anillo(118, 46, 4 + Math.round(4 * tramo(t, BOMBA + 0.6, BOMBA + 1)), H('#ffe070'), 2); }
  // tras el banco: el técnico de la calculadora y el joven Sagan con su regla
  R.actor(EL.ingenieroCIA2, 206, 147, t, { dir: 1, sostiene: [218, 138], habla: Math.sin(t * 3) > 0.7 });
  R.actor(EL.sagan, 262, 147, t, { dir: -1, sorpresa: t > BOMBA - 0.1 && t < BOMBA + 1.2, sonrisa: t < MISIL });
  T.carreraDelante(R, t, { encuadre: 'laboratorio' });
  if (t >= IDEA) T.PIEZAS_DC.carpeta(R, 197, 141, { s: 1, dibujo: 'luna' });
};

// ── 3 · la pizarra de cerca: el puntero de Reiffel ──
const tray = (u) => { const p0 = [52, 132], p1 = [140, 30], p2 = [215, 52], A = (1 - u) ** 2, B = 2 * (1 - u) * u, C2 = u * u; return [A * p0[0] + B * p1[0] + C2 * p2[0], A * p0[1] + B * p1[1] + C2 * p2[1]]; };
const p3 = (t) => {
  const coh = tramo(t, P3 + 0.15, NOCHE - 0.1), nb = tramo(t, POLVO, BRILLA);
  T.carrera(R, t, { encuadre: 'laboratorio', camara: 'pizarra', cohete: coh, nube: nb });
  // la punta del puntero: sigue al cohete, toca la línea del día y la noche, sube con la nube y señala el brillo
  let tip;
  if (t < NOCHE) tip = tray(Math.max(0.05, coh));
  else if (t < POLVO) tip = [215 + Math.sin(t * 9) * 1.5, 52 + (t < NOCHE + 0.3 ? Math.sin((t - NOCHE) * 20) * 2 : 0)];
  else if (t < BRILLA) tip = [lerp(215, 222, nb), lerp(52, 30, nb)];
  else tip = [232 + Math.sin(t * 6) * 2, 28];
  const hx = 182, hy = 176;
  const tx = tip[0], ty = tip[1];
  linea(hx - 4, hy - 3, tx + 1, ty + 1, T.C.k); linea(hx - 6, hy - 3, tx - 1, ty + 1, T.C.k); linea(hx - 5, hy - 4, tx, ty - 1, T.C.k);
  linea(hx - 5, hy - 3, tx, ty, H('#a8743c')); linea(hx - 6, hy - 4, tx - 1, ty, H('#d8a868'));
  disco(tx, ty, 1.5, H('#2a1a0e'));
  T.brazo(R, hx + 28, hy + 34, hx, hy, '#f4f4f8', -1);
};

// ── 4 · la azotea al anochecer (fondo local) ──
const fondo4 = () => fondoFijo(CACHE, 'azotea', () => {
  const SK = ['#2a2048', '#3a2a5a', '#5a3a6a', '#8a4a6a', '#c0606a', '#e08868', '#f0b070'].map(H);
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(SK, y / 122 * 6.4 + (h2(x >> 3, y >> 2) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 40; k++) { const x = (h2(k, 31) * 320) | 0, y = (h2(k, 32) * 40) | 0; if (x > 274 && y < 46) continue; pset(x, y, H(h2(k, 33) > 0.6 ? '#e8e0ff' : '#8a7ab0')); }
  // la Luna creciente, baja sobre el lago
  R.lunaLlena(232, 60, 9, 0.55);
  // la ciudad en silueta, con ventanas encendidas
  const torres = [[0, 30, 70], [28, 56, 86], [54, 70, 64], [70, 104, 92], [104, 120, 76], [120, 150, 98], [150, 176, 84], [176, 210, 102], [210, 236, 90], [236, 262, 80], [262, 290, 96], [290, 320, 88]];
  for (const [x0, x1, y0] of torres) { rect(x0, y0, x1, 140, H('#2a2440')); rect(x0, y0, x1, y0, H('#4a3a5a'));
    for (let y = y0 + 4; y < 136; y += 5) for (let x = x0 + 3; x < x1 - 2; x += 4) if (h2(x, y) > 0.55) pset(x, y, H(h2(y, x) > 0.5 ? '#f0c870' : '#c89850')); }
  rect(60, 52, 62, 64, H('#2a2440')); pset(61, 51, H('#ff4040'));
  // el pretil de ladrillo, la caseta de la escalera con su puerta y la chimenea
  for (let y = 128; y < 142; y++) for (let x = 0; x < 320; x++) { const f = (y - 128) >> 2, jv = (x + (f % 2) * 4) % 8 === 0, jh = (y - 128) % 4 === 3; pset(x, y, jh || jv ? H('#4a2a24') : rampa(['#5a3028', '#6e3a2e', '#844636'].map(H), 1 + h2(x >> 3, f), x, y)); }
  rect(0, 126, 319, 128, H('#9a8a7a')); rect(0, 126, 319, 126, H('#c8b8a0'));
  for (let y = 96; y < 160; y++) for (let x = 6; x < 62; x++) pset(x, y, ((y - 96) % 4 === 3 || (x + (((y - 96) >> 2) % 2) * 4) % 8 === 0) ? H('#4a2a24') : rampa(['#6e3a2e', '#844636', '#9a5440'].map(H), 1 + h2(x >> 3, y >> 2), x, y));
  rect(4, 92, 64, 96, H('#3a3a44')); rect(4, 92, 64, 92, H('#6a6a74'));
  rect(20, 116, 40, 160, H('#2a1a12')); rect(21, 117, 39, 160, H('#5a3a24')); for (const y of [122, 140]) rect(23, y, 37, y + 12, H('#4a2e1c')); disco(36, 140, 1.2, H('#e8c860'));
  rect(46, 104, 56, 112, H('#f0c870')); rect(46, 104, 56, 104, H('#2a1a12')); rect(51, 104, 51, 112, H('#2a1a12'));
  rect(270, 100, 290, 160, H('#5a3028')); for (let y = 102; y < 160; y += 4) rect(270, y, 290, y, H('#4a2a24')); rect(268, 96, 292, 100, H('#7a6a5a'));
  // el suelo de tela asfáltica con grava, el tragaluz y los tubos de ventilación
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(['#3a3440', '#48424e', '#56505c', '#666070'].map(H), 1.4 + (h2(x, y) - 0.5) * 1.6 + (y - 142) * 0.02, x, y));
  for (let k = 0; k < 160; k++) pset(h2(k, 41) * 320, 142 + h2(k, 42) * 38, H('#8a8090'));
  poligono([[84, 150], [130, 150], [136, 162], [78, 162]], H('#3a3a44')); poligono([[86, 151], [128, 151], [132, 160], [82, 160]], H('#6a8aa8'));
  for (let x = 92; x < 128; x += 9) linea(x, 151, x - 2, 160, H('#3a3a44')); linea(86, 151, 96, 160, H('#a8c8e0'));
  for (const [x, h] of [[226, 22], [240, 14]]) { rect(x, 160 - h, x + 5, 160, H('#7a7a84')); rect(x, 160 - h, x + 1, 160, H('#a8a8b0')); rect(x - 1, 160 - h - 2, x + 6, 160 - h, H('#5a5a64')); }
  // la caja con el cuaderno de cuentas y el termo
  rect(166, 146, 196, 166, H('#4a2e16')); rect(167, 147, 195, 165, H('#9a6a3a')); for (let y = 150; y < 166; y += 5) rect(167, y, 195, y, H('#7a4e28')); rect(167, 147, 195, 147, H('#c08a50'));
  rect(170, 142, 186, 147, H('#2a2a2a')); rect(171, 142, 185, 146, H('#f2eee2')); for (let k = 0; k < 3; k++) rect(172, 143 + k, 180 - k * 2, 143 + k, H('#6a6a7a'));
  rect(188, 134, 193, 147, H('#2a3a2a')); rect(189, 135, 192, 146, H('#5a8a5a')); rect(188, 134, 193, 136, H('#c8ccd8'));
});
const telescopio = (t, mira) => {
  // el trípode de madera y el tubo de latón apuntando a la Luna, con su buscador y el ocular abajo
  for (const [x1, c] of [[200, '#6a4424'], [226, '#6a4424'], [214, '#8a5a30']]) { linea(212, 128, x1, 163, T.C.k); linea(213, 128, x1 + 1, 163, H(c)); }
  rect(208, 125, 216, 130, H('#2a2a30')); rect(209, 126, 215, 129, H('#5a5a64'));
  const tubo = (x0, y0, x1, y1, w, c, cL, cS) => { const n = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / n, uy = (y1 - y0) / n;
    for (let i = 0; i <= n; i++) for (let k = -w - 1; k <= w + 1; k++) { const x = x0 + ux * i - uy * k, y = y0 + uy * i + ux * k; pset(x, y, Math.abs(k) > w ? T.C.k : k < -w / 2 ? H(cL) : k > w / 2 ? H(cS) : H(c)); } };
  tubo(194, 140, 246, 104, 3, '#c8a050', '#f0d890', '#8a6a30');
  tubo(206, 128, 236, 108, 1, '#2a2a30', '#5a5a64', '#1a1a20');
  for (const u of [0.2, 0.75]) { const x = lerp(194, 246, u), y = lerp(140, 104, u); linea(x - 2, y - 4, x + 3, y + 4, H('#6a4a24')); }
  disco(247, 103, 4, T.C.k); disco(247, 103, 3, H(mira ? '#a8c8f0' : '#3a4a6a')); pset(246, 102, H('#ffffff'));
  rect(190, 139, 195, 144, T.C.k); rect(191, 140, 194, 143, H('#3a3a44'));
};
const pichones = (t) => { for (const [x, k] of [[78, 0], [98, 1], [252, 2]]) { const pic = Math.sin(t * 3 + k * 2) > 0.5 ? 1 : 0, vuela = k === 1 && t > SAGAN - 0.3; const vx = vuela ? x + (t - SAGAN + 0.3) * 40 : x, vy = vuela ? 124 - (t - SAGAN + 0.3) * 30 : 124;
  if (vuela) { pajaro(vx, vy, t, H('#4a4a58')); continue; }
  rect(vx, vy - 3 + pic, vx + 5, vy - 1 + pic, H('#7a7a8a')); rect(vx + 1, vy - 2 + pic, vx + 3, vy - 2 + pic, H('#a0a0b0')); pset(vx + 5 + pic, vy - 4 + pic * 2, H('#5a5a6a')); pset(vx + 6 + pic, vy - 4 + pic * 2, H('#e8a040')); pset(vx + 1, vy, H('#c86a5a')); pset(vx + 3, vy, H('#c86a5a')); } };
const turbina = (t) => { const x = 304, y = 150; rect(x - 1, y, x + 1, 162, H('#5a5a64')); for (let k = 0; k < 7; k++) { const ph = (k / 7 + t * 0.8) % 1, xx = x - 6 + Math.round(Math.cos(ph * Math.PI) * -6 + 6); rect(xx, y - 10, xx, y, H(ph < 0.5 ? '#b8b8c4' : '#6a6a78')); } rect(x - 7, y - 12, x + 7, y - 11, H('#4a4a54')); rect(x - 7, y, x + 7, y + 1, H('#4a4a54')); };
const p4 = (t) => {
  fondo4();
  nube(((60 + t * 2.5) % 380) - 30, 30, 44, [H('#6a3a6a'), H('#a05a7a'), H('#e0909a')]);
  nube(((190 + t * 1.2) % 380) - 30, 44, 30, [H('#7a4a6a'), H('#b86a7a'), H('#f0a8a0')]);
  nube(((10 + t * 4.5) % 380) - 30, 62, 20, [H('#8a4a62'), H('#c87a7a'), H('#f8c0a0')]);
  for (let k = 0; k < 4; k++) pajaro(((t * 14 + k * 9 + 80) % 380) - 30, 50 + (k % 2) * 4 + Math.sin(t * 2 + k) * 2, t + k * 0.3, H('#2a1a2a'));
  // el tren elevado lejano con sus ventanas encendidas
  const tx = Math.round(lerp(330, -140, tramo(t, P4, P4 + 4))); for (let x = tx; x < tx + 120; x++) if (x >= 0 && x < 320) { pset(x, 123, H('#1a1626')); pset(x, 124, H(x % 5 < 3 ? '#f0d080' : '#1a1626')); pset(x, 125, H('#1a1626')); }
  // humo de la chimenea
  for (let k = 0; k < 5; k++) { const u = (t * 0.3 + k / 5) % 1; disco(280 + u * 14 + Math.sin(u * 5) * 2, 94 - u * 26, 2 + u * 3, H(u > 0.5 ? '#6a5a72' : '#5a4a62')); }
  // una luz que se enciende en la ciudad
  if (t > ESTUD) rect(122, 106, 124, 107, H('#ffe090'));
  // la puerta se abre y sale Sagan con su regla de cálculo
  const abre = tramo(t, P4, P4 + 0.3) - tramo(t, SAGAN + 0.2, SAGAN + 0.5);
  if (abre > 0) { rect(21, 117, 21 + Math.round(18 * abre), 160, H('#1a1410')); rect(21, 117, 21 + Math.round(3 * abre), 160, H('#f0c870')); }
  const s = tramo(t, P4 + 0.15, ESTUD - 0.1), sx = Math.round(lerp(22, 150, s));
  const mira = t > NUBE - 0.35;
  const sx2 = mira ? Math.round(lerp(150, 176, tramo(t, NUBE - 0.35, P5 - 0.2))) : sx;
  // la antena de la caseta y lo que se mueve en la azotea
  linea(44, 92, 44, 70, H('#2a2a34')); for (const [y, w] of [[72, 8], [77, 6], [82, 4]]) linea(44 - w, y, 44 + w, y, H('#2a2a34'));
  pichones(t); turbina(t);
  telescopio(t, mira);
  const gx = Math.round(lerp(300, 262, tramo(t, SAGAN, ESTUD)));
  T.gatoEspia(R, gx, 160, t, { dir: -1, cara: 'travieso', anda: t > SAGAN && t < ESTUD });
  R.actor(EL.sagan, sx2, 162, t, { dir: 1, anda: (s > 0 && s < 1) || (mira && t < P5 - 0.2), sonrisa: t > SAGAN && t < CALCULA, habla: t > CALCULA && t < NUBE && Math.sin(t * 12) > 0, sorpresa: mira && t > P5 - 0.25 });
  // el bocadillo del pensamiento: la Luna con la nube de polvo que crece
  const b = tramo(t, CALCULA - 0.3, CALCULA) * (1 - tramo(t, NUBE + 0.1, NUBE + 0.3));
  if (b > 0) {
    const bx = 118, by = 88;
    for (const [cx, cy, r] of [[150, 128, 1.5], [142, 118, 2.5]]) { disco(cx, cy, r + 1, T.C.k); disco(cx, cy, r, H('#f6f2e6')); }
    for (let y = -20; y <= 20; y++) for (let x = -36; x <= 36; x++) { const q = (x / 36) ** 2 + (y / 20) ** 2; if (q <= Math.min(1, b * b)) pset(bx + x, by + y, q > 0.88 ? T.C.k : H('#f6f2e6')); }
    if (b > 0.85) { const lx = bx - 14; disco(lx, by, 13, H('#5a5a6a')); for (let y = -13; y <= 13; y++) for (let x = -13; x <= 2; x++) if (x * x + y * y <= 169) pset(lx + x, by + y, H('#d8d4c4')); for (const [mx, my] of [[-9, -3], [-6, 5], [-3, -8]]) disco(lx + mx, by + my, 1.5, H('#a8a498'));
      const g = tramo(t, CALCULA, NUBE), rn = 2 + g * 8; for (let y = -rn; y <= rn; y++) for (let x = -rn; x <= rn; x++) if (x * x + y * y <= rn * rn && (x + y) % 2 === 0) pset(lx + 2 + x, by - 5 + y, H(x < 0 ? '#fff0a0' : '#c8b878'));
      R.numero(String(Math.round(10 + g * 290)), bx + 16, by + 4, { centro: true }); }
  }
};

// ── 5 · por el ocular: la Luna, la marca de la nube y su «?» ──
const p5 = (t) => {
  const g = T.carrera(R, t, { encuadre: 'observatorio', camara: 'luna' });
  const [cx, cy, rc] = g.circulo;
  R.recorte([cx - rc, cy - rc, cx + rc, cy + rc]);
  const m = tramo(t, P5 + 0.2, CRECE + 0.3), mx = 178, my = 70, r = 2 + m * 9;
  if (m > 0) { const rr = 1 + m * 6; for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) { const d = Math.hypot(x, y), X = Math.round(mx + x), Y = Math.round(my + y); if (d <= rr && h2(X, Y) < 0.75 - d / rr * 0.5) pset(X, Y, H(d < rr * 0.4 ? '#fff4c8' : '#d8cc98')); }
    R.anillo(mx, my, Math.round(rr + 6 + Math.sin(t * 5)), H('#ff6a5a'), 3); }
  R.recorte(null);
  const q = tramo(t, SI, SI + 0.3); if (q > 0 && (t < AQUI || Math.floor(t * 4) % 2 === 0)) R.icono('?', mx + 16, Math.round(lerp(64, 52, q)), H('#fff0a0'), T.C.k, 2);
};

const efectos = [[0.9, 'coche'], [a(0.1), 'papel'], [P2 + 0.6, 'tecleo'], [MISIL, 'lapiz'], [NOCHE - 0.05, 'toc'], [BRILLA, 'brillo'], [P4 + 0.05, 'puerta'], [CALCULA, 'tic'], [CRECE, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1958', efectos, año: 1958 });
''')
