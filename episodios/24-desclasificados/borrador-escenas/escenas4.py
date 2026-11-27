E = {}

# lo común a las tres escenas: piezas, ruido, recorte por búfer, cascos, cifras de 3 × 5 y la pantalla entera de un búfer
COMUN = r'''
const P = T.PIEZAS_DC, k = T.C.k;
const hh = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const mez = (a, b, u) => { const A = hex(a), B = hex(b); const c = (s) => Math.round(((A >>> s) & 255) + (((B >>> s) & 255) - ((A >>> s) & 255)) * u); return (0xff000000 | (c(16) << 16) | (c(8) << 8) | c(0)) >>> 0; };
// pinta algo en un búfer aparte y lo copia solo dentro del hueco [x0, y0, x1, y1] (ventanas, escotillas)
const enHueco = (dibuja, huecos) => { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); for (const [x0, y0, x1, y1] of huecos) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = b[y * 320 + x]; if (c) R.pset(x, y, c); } };
// un fondo fijo pintado una vez en su búfer y puesto en pantalla de un recorrido
const capas = new Map();
const fondo = (clave, dibuja) => { let b = capas.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); capas.set(clave, b); } const d = R.usar(b); R.usar(d); d.set(b); };
// los auriculares de escuchar sobre la cabeza que devuelve R.actor
const cascos = ([cx, cy]) => { const Z = hex('#3a3a44'), z = hex('#6a6a78'); for (let i = -6; i <= 6; i++) { const y = cy + 1 + Math.round((i * i) / 9); R.pset(cx + i, y - 1, k); R.pset(cx + i, y, Z); } for (const s of [-1, 1]) { R.rect(cx + s * 7 - 1, cy + 4, cx + s * 7 + 1, cy + 9, k); R.rect(cx + s * 7 - (s < 0 ? 0 : 0), cy + 5, cx + s * 7, cy + 8, z); } };
// cifras de 3 × 5 (las fechas de una etiqueta o de un papel: números, no letras)
const CIF = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 3: ['###', '..#', '.##', '..#', '###'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };
const cifras = (s, x, y, c, e = 1) => String(s).split('').forEach((d, n) => (CIF[d] || []).forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.rect(x + (n * 4 + i) * e, y + j * e, x + (n * 4 + i) * e + e - 1, y + j * e + e - 1, c); }));
// la paloma que picotea cuando la escena quiere (la pieza decide la pose con su t: se le da uno que cae en «pica»)
const palomaPica = (x, y, t, pica, o = {}) => P.paloma(R, x, y, { ...o, t: pica ? (0.05 - x) / 3 : 1.4 - x / 3, picotea: pica });
// el vaho del aliento en el frío: nubecitas que salen de la boca y se deshacen
const vaho = (x, y, t, dir, fase = 0) => { const u = ((t + fase) % 1.4) / 1.4; if (u > 0.7) return; const r = 1 + u * 3, cx = Math.round(x + dir * (2 + u * 9)), cy = Math.round(y - u * 5); R.disco(cx, cy, r, u < 0.35 ? hex('#f4f8fc') : hex('#d8e2ec')); };
'''

E['dc-memo'] = ('El memo', '''// DC-MEMO (frase 9), 1967 → 2001. Cuatro planos:
// 1. «The technology worked»: dentro de la furgoneta, los dos ingenieros con auriculares escuchan contentos (salen las
//    ondas); en «cat» por las ventanitas una paloma alza el vuelo y el gato espía sale corriendo detrás; se corta la
//    señal, los dos se sorprenden y uno señala la ventana con un «?» (gag 3, primera mitad);
// 2. (corta en «It got hungry») el suelo del parque a ras de gato: entra el gato con su micrófono, olisquea el bocadillo
//    caído («hungry»), aterriza una paloma («distracted», «!») y se va detrás de ella («wandered off»); otra paloma se
//    queda con el bocadillo (gag 3, segunda mitad);
// 3. (corta en «A 1967») la oficina de 1967: el ingeniero entra con su informe y lo explica; el jefe de
//    gabardina sella la carpeta del gato («concluded») y le cae una X roja («wasn't practical»); el ingeniero, triste;
// 4. (corta en «and when it came out») 2001: la mesa de un despacho; una mano saca la hoja del sobre con el «2001»
//    («came out in 2001»), y la lupa pasa por el título tachado en negro («title… blacked out»).''', COMUN + r'''
const m = (f) => en('memo', f);
const P2 = m(0.200), P3 = m(0.423), P4 = m(0.741);
const GATO = m(0.077), OTRA = m(0.145), HAMBRE = m(0.217), DISTRAE = m(0.264), VAGA = m(0.320);
const MEMO = m(0.519), CONCLUYE = m(0.620), NOPRAC = m(0.682), SALE = m(0.799), TITULO = m(0.889), TACHADO = m(0.942);

// 1 · la furgoneta
const p1 = (t) => {
  const g = T.animales(R, t, { encuadre: 'parque', camara: 'furgoneta' });
  // por las ventanitas: la paloma alza el vuelo y el gato sale corriendo detrás (recortados a su hueco)
  const u = tramo(t, GATO - 0.1, GATO + 1.3), c = tramo(t, GATO + 0.15, GATO + 1.9);
  if (u > 0 && u < 1) enHueco(() => P.paloma(R, Math.round(lerp(112, 214, u)), Math.round(60 - Math.sin(u * Math.PI) * 16), { t, vuela: true }), g.ventanas);
  if (c > 0 && c < 1) enHueco(() => P.gatoEspia(R, Math.round(lerp(100, 222, c)), 64, { t, anda: true, microfono: true }), g.ventanas);
  const corta = t > GATO + 0.5, mira = t > OTRA;
  const a = R.actor(EL.ingenieroCIA, 66, g.detrasMesa, t, { dir: 1, sonrisa: !corta, sorpresa: corta, habla: t > 0.5 && t < 1.4 && Math.sin(t * 9) > 0 });
  cascos(a.cabeza);
  // el segundo, de pie en el pasillo: se vuelve hacia las puertas y señala la ventanita
  const b = R.actor(EL.ingenieroCIA2, 176, 166, t, { dir: mira ? -1 : 1, sonrisa: !corta, sorpresa: corta && !mira, dedo: mira, salto: t > GATO + 0.5 && t < GATO + 0.75 ? 2 : 0 });
  // el cable de sus auriculares hasta el receptor
  if (!mira) R.linea(b.cabeza[0] + 7, b.cabeza[1] + 9, 214, 138, k);
  // las ondas que llegan a los auriculares mientras hay señal
  if (!corta) for (const [x, y, d] of [[a.cabeza[0] + 9, a.cabeza[1] + 6, 1], [b.cabeza[0] - 9, b.cabeza[1] + 6, -1]]) for (let n = 0; n < 2; n++) { const r = 2 + ((t * 3 + n * 0.5) % 1) * 4; for (let q = -2; q <= 2; q++) R.pset(Math.round(x + d * r), y + q, hex('#f8e070')); }
  T.animalesDelante(R, t, { encuadre: 'parque', camara: 'furgoneta' });
  if (mira) R.bocadillo(a.cabeza[0] + 2, a.cabeza[1] - 4, { icono: '?' });
};

// 2 · el suelo del parque a ras de gato (inserto local, pintado entero)
const sueloParque = () => {
  const { rect, pset, linea, disco } = R;
  // el cielo tramado
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const u = y / 60 * 3, n = Math.floor(u), f = u - n, c = ['#8cbce2', '#a4cae8', '#bcd8ee', '#d2e6f2'];
    pset(x, y, hex(c[Math.min(3, n + (BAYER[(y % 4) * 4 + (x % 4)] / 16 < f ? 1 : 0))])); }
  // las fachadas del fondo (contraventanas verdes, cornisas y tejados de pizarra), más claras por la distancia
  for (let x = 0; x < 320; x += 46) { const top = 44 + Math.floor(hh(x, 1, 4) * 6), cr = ['#e8dcc0', '#dcc8a8', '#ecd8c4', '#d8d0bc'][x / 46 % 4 | 0];
    rect(x, top, x + 45, 92, hex(cr)); rect(x, top - 3, x + 45, top, hex('#7a8494')); rect(x, top + 2, x + 45, top + 2, hex('#b8a888'));
    for (let wx = x + 5; wx < x + 42; wx += 12) for (let wy = top + 6; wy < 88; wy += 14) { rect(wx, wy, wx + 6, wy + 8, hex('#6a7a8c')); rect(wx + 1, wy + 1, wx + 5, wy + 3, hex('#9ab0c4')); rect(wx - 2, wy, wx - 1, wy + 8, hex('#5a7a5a')); rect(wx + 7, wy, wx + 8, wy + 8, hex('#5a7a5a')); } }
  // los castaños: copas de tres verdes con flores blancas y los troncos
  for (const [cx, cy, r] of [[60, 46, 30], [26, 58, 20], [214, 44, 26], [250, 60, 18]]) {
    rect(cx - 2, cy, cx + 3, 100, hex('#4a3a2a')); rect(cx - 2, cy, cx - 1, 100, hex('#6a5038'));
    for (let j = -r; j <= r; j++) for (let i = -r - 6; i <= r + 6; i++) { const d = (i / (r + 6)) ** 2 + (j / r) ** 2; if (d > 1 + (hh(cx + i, cy + j, 5) - 0.5) * 0.3) continue; const l = -i * 0.4 - j * 0.6 + (hh(cx + i, cy + j, 6) - 0.5) * 9; pset(cx + i, cy + j, l > 6 ? hex('#7aa84a') : l > -4 ? hex('#4e8a3a') : hex('#2e5a2a')); }
    for (let n = 0; n < 16; n++) { const x = cx + Math.round((hh(cx, n, 7) - 0.5) * r * 2), y = cy + Math.round((hh(cy, n, 8) - 0.5) * r * 1.6); pset(x, y, hex('#f4f0e0')); pset(x, y - 1, hex('#f8e8e8')); }
  }
  // la farola de hierro
  rect(150, 30, 152, 104, k); rect(151, 30, 151, 104, hex('#4a5a5a')); rect(145, 22, 157, 30, k); rect(146, 23, 156, 29, hex('#f8f0c0')); rect(144, 20, 158, 21, k); rect(148, 104, 154, 108, k);
  // el seto recortado con florecillas
  for (let y = 92; y < 106; y++) for (let x = 0; x < 320; x++) { const v = hh(x, y, 9); pset(x, y, y === 92 ? hex('#3a6a2a') : v < 0.2 ? hex('#2a4a22') : v < 0.75 ? hex('#3e7030') : hex('#5a8e3a')); }
  for (let n = 0; n < 40; n++) pset(Math.floor(hh(n, 2, 10) * 320), 94 + Math.floor(hh(n, 3, 10) * 10), n % 3 ? hex('#f0d040') : hex('#e86a8a'));
  // la grava, con piedrecitas más grandes cuanto más cerca
  for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const v = hh(x, y, 11); pset(x, y, v < 0.12 ? hex('#a8946e') : v > 0.9 ? hex('#e6d8b4') : hex('#ccb890')); }
  for (let n = 0; n < 90; n++) { const y = 108 + Math.floor(hh(n, 1, 12) * 70), x = Math.floor(hh(n, 2, 12) * 320), r = 1 + (y - 106) / 40; disco(x, y, r, hex('#9a8a6e')); pset(x - 1, y - 1, hex('#f0e6cc')); }
  // el bordillo de piedra y el césped del primer plano con margaritas
  linea(0, 106, 320, 106, hex('#8a7a62'));
  for (let x = 0; x < 72; x++) for (let y = 150 + Math.round(x * 0.4); y < 180; y++) pset(x, y, hh(x, y, 13) < 0.3 ? hex('#3e7a2e') : hh(x, y, 14) < 0.6 ? hex('#5a9a3a') : hex('#78b24a'));
  for (const [x, y] of [[10, 166], [26, 172], [44, 176], [18, 178], [56, 178]]) { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) pset(x + a, y + b, hex('#f8f8f0')); pset(x, y, hex('#f0c030')); }
  // la papelera de rejilla en su poste, con un papel que asoma
  rect(36, 104, 38, 150, k); rect(37, 104, 37, 150, hex('#4a5a4a'));
  for (let y = 108; y < 134; y++) for (let x = 24; x < 52; x++) pset(x, y, (x + y) % 4 === 0 || (x - y) % 4 === 0 ? hex('#2a3a2a') : hex('#4a6a4a'));
  rect(22, 106, 53, 108, k); rect(30, 100, 40, 106, hex('#f4f0e4')); linea(30, 100, 40, 104, hex('#c8c0b0'));
  // el banco grande de listones con sus patas de hierro fundido
  for (const y of [72, 80, 88]) { rect(186, y, 306, y + 5, k); rect(187, y + 1, 305, y + 4, hex('#a8683a')); rect(187, y + 1, 305, y + 1, hex('#c8884a')); for (let x = 190; x < 304; x += 9) pset(x, y + 3, hex('#7a4824')); }
  rect(186, 108, 306, 114, k); rect(187, 109, 305, 113, hex('#a8683a')); rect(187, 109, 305, 109, hex('#c8884a'));
  for (const x of [194, 292]) { rect(x - 3, 70, x + 3, 146, k); rect(x - 2, 72, x + 2, 144, hex('#3a3a3a')); rect(x - 6, 140, x + 8, 146, k); rect(x - 5, 141, x + 7, 145, hex('#2a2a2a')); }
  for (let x = 196; x < 300; x++) for (let y = 146; y < 152; y++) if (hh(x, y, 15) < 0.6) pset(x, y, hex('#9a8664'));
  // hojas secas de castaño por el suelo
  for (let n = 0; n < 14; n++) { const x = Math.floor(hh(n, 4, 16) * 300) + 8, y = 120 + Math.floor(hh(n, 5, 16) * 50); rect(x, y, x + 3, y + 1, n % 2 ? hex('#c87a2a') : hex('#a85a2a')); pset(x + 1, y - 1, hex('#e8a040')); }
};
const p2 = (t) => {
  const { rect, pset, disco } = R;
  fondo('suelo', sueloParque);
  // nubes de tres tonos a tres velocidades y una bandada lejana
  for (const [x0, y, v, w, c] of [[20, 12, 3, 46, '#f8fbfd'], [180, 22, 5, 38, '#eef4f8'], [100, 34, 8, 30, '#dfe8f0']]) { const x = ((x0 + t * v) % 380) - 40; for (let i = 0; i < w; i++) { const hgt = Math.round(Math.sin(i / w * Math.PI) * 6); R.linea(Math.round(x + i), y - hgt, Math.round(x + i), y, hex(c)); } R.linea(Math.round(x), y + 1, Math.round(x + w), y + 1, hex('#c8d8e4')); }
  // hojas de castaño que caen meciéndose
  for (let n = 0; n < 4; n++) { const u = ((t * 0.18 + n * 0.27) % 1), x = Math.round(30 + n * 60 + Math.sin(t * 2 + n) * 8), y = Math.round(40 + u * 120); rect(x, y, x + 2, y + 1, hex('#c87a2a')); }
  // dos palomas al fondo, junto al banco, que picotean
  palomaPica(236, 150, t, Math.sin(t * 3) > 0.4); palomaPica(270, 148, t, Math.sin(t * 2.3 + 1) > 0.5, { dir: -1 });
  // el bocadillo caído (pan, jamón y lechuga); el gato le da un bocado
  const bocado = t > HAMBRE + 0.5 ? 1 : 0, bx = 128;
  const roba = tramo(t, P3 - 1.2, P3 - 0.4);
  if (roba < 1) { const ox = Math.round(roba * 0); rect(bx - 10 + ox, 152, bx + 10 - bocado * 4, 158, k); rect(bx - 9, 153, bx + 9 - bocado * 4, 154, hex('#e8c080')); rect(bx - 9, 155, bx + 9 - bocado * 4, 155, hex('#e87a8a')); rect(bx - 9, 156, bx + 9 - bocado * 4, 156, hex('#7ac84a')); rect(bx - 9, 157, bx + 9 - bocado * 4, 157, hex('#d8a860')); }
  // el gato: entra, se sienta junto al bocadillo, ve la paloma y se va detrás de ella
  const entra = tramo(t, P2, HAMBRE - 0.05), sigue = tramo(t, VAGA + 0.25, P3 - 0.3);
  const gx = sigue > 0 ? Math.round(lerp(104, 360, sigue)) : Math.round(lerp(-30, 104, entra));
  if (entra < 1 || sigue > 0) P.gatoEspia(R, gx, 160, { t, anda: true, microfono: true, s: 2, cara: t > DISTRAE ? 'travieso' : undefined });
  else { P.gatoEspia(R, 104, 160, { t, microfono: true, s: 2, cara: t > DISTRAE ? 'travieso' : undefined }); if (t < DISTRAE) for (let n = 0; n < 3; n++) if (Math.sin(t * 8 + n) > 0) pset(116 + n * 2, 138 - n, hex('#7a6a5a')); }
  // la paloma que baja aleteando, se posa y se va dando saltitos
  const baja = tramo(t, DISTRAE - 0.35, DISTRAE + 0.2), va = tramo(t, VAGA, P3 - 0.6);
  if (baja > 0) { const px = va > 0 ? Math.round(lerp(176, 350, va)) : Math.round(lerp(250, 176, baja)), py = va > 0 ? 158 - Math.round(Math.abs(Math.sin(va * Math.PI * 5)) * 6) : Math.round(lerp(60, 158, baja));
    P.paloma(R, px, py, { t, s: 2, vuela: baja < 1 || (va > 0 && Math.sin(va * Math.PI * 5) > 0.6) }); }
  if (t > DISTRAE && t < VAGA + 0.2) R.bocadillo(112, 118, {});
  // una tercera paloma se queda con el bocadillo
  if (t > P3 - 1.6) { const u = tramo(t, P3 - 1.6, P3 - 1.0); palomaPica(Math.round(lerp(-10, 118, u)), 158, t, u >= 1 && Math.sin(t * 9) > 0, { s: 2 }); }
};

// 3 · la oficina de 1967: el informe del gato y la X
const p3 = (t) => {
  const o = { encuadre: 'fortmeade' };
  T.psiquicos(R, t, o);
  const entra = tramo(t, P3, MEMO - 0.6);
  const sube = tramo(t, CONCLUYE - 0.3, CONCLUYE), baja = tramo(t, CONCLUYE + 0.2, CONCLUYE + 0.35), alza = tramo(t, CONCLUYE + 0.6, CONCLUYE + 0.9);
  const sx = 204, sy = Math.round(lerp(lerp(141, 114, sube), 128, baja) - alza * 14);
  // el compañero de la mesa A escribe a máquina y levanta la vista al oír la X
  R.actor(EL.ingenieroCIA2, 70, 150, t, { dir: 1, habla: t < NOPRAC && Math.sin(t * 6) > 0.5, sorpresa: t > NOPRAC && t < NOPRAC + 0.8 });
  const jefe = R.actor(EL.hombreBanco2, 176, 150, t, { dir: 1, sostiene: sube > 0 && alza < 1 ? [sx - 3, sy - 12] : false, enfado: t > NOPRAC, habla: t > MEMO + 0.6 && t < CONCLUYE - 0.4 && Math.sin(t * 8) > 0 });
  const ing = R.actor(EL.ingenieroCIA, Math.round(lerp(330, 252, entra)), 158, t, { dir: -1, anda: entra > 0 && entra < 1, dedo: entra >= 1 && t < CONCLUYE - 0.3, habla: entra >= 1 && t < MEMO + 1.4 && Math.sin(t * 7) > 0, triste: t > NOPRAC + 0.2 });
  T.psiquicosDelante(R, t, o);
  // la carpeta del gato sobre la mesa, el sello que cae y su marca, y la X roja que se traza
  P.carpeta(R, 204, 142, { dibujo: 'gato', sello: false });
  if (baja > 0) P.sello(R, 210, 139, { tipo: 'marca' });
  if (sube > 0 && alza < 1) P.sello(R, sx, sy, {});
  const x = tramo(t, NOPRAC - 0.1, NOPRAC + 0.4);
  if (x > 0) for (const [a, b, c, d] of [[193, 125, 215, 143], [215, 125, 193, 143]]) { const n = Math.round(x * 22); for (let i = 0; i <= n; i++) { const px = Math.round(a + (c - a) * i / 22), py = Math.round(b + (d - b) * i / 22); R.rect(px - 1, py - 1, px + 1, py + 1, hex('#d0202a')); } }
  if (t > NOPRAC + 0.2) R.bocadillo(jefe.cabeza[0] + 2, jefe.cabeza[1] - 4, { icono: 'X' });
  if (t > MEMO - 0.5 && t < CONCLUYE - 0.3) R.bocadillo(ing.cabeza[0] - 2, ing.cabeza[1] - 4, { icono: 'carpeta' });
};

// 4 · 2001: el sobre, la hoja tachada y la lupa (inserto local sobre la mesa)
const mesa2001 = () => {
  const { rect, pset, linea, disco } = R;
  // la mesa de roble con vetas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.21 + Math.sin(x * 0.012 + y * 0.03) * 3) + (hh(x >> 2, y, 20) - 0.5) * 0.5; pset(x, y, v > 0.75 ? hex('#a87444') : v < -0.7 ? hex('#7a4c28') : hex('#946036')); }
  for (let y = 44; y < 180; y += 45) { linea(0, y, 319, y, hex('#5a3a1e')); linea(0, y + 1, 319, y + 1, hex('#b8844e')); }
  // el charco de luz de la lámpara
  for (let y = 30; y < 180; y++) for (let x = 40; x < 300; x++) { const d = ((x - 170) / 140) ** 2 + ((y - 110) / 80) ** 2; if (d < 1 && hh(x, y, 21) > 0.35 + d * 0.6) { const c = R.pget(x, y); R.pset(x, y, ((c & 0xff000000) | Math.min(255, (c & 255) + 18) | (Math.min(255, ((c >>> 8) & 255) + 14) << 8) | (Math.min(255, ((c >>> 16) & 255) + 8) << 16)) >>> 0); } }
  // un CD de 2001 con su brillo de arco iris
  disco(40, 150, 20, k); disco(40, 150, 19, hex('#c8ccd8')); for (let a = 0; a < 6.28; a += 0.05) { const r = 14, x = Math.round(40 + Math.cos(a) * r), y = Math.round(150 + Math.sin(a) * r); pset(x, y, hex(['#f0a0c0', '#a0d0f0', '#f0e0a0', '#b0f0b0'][Math.floor(a * 2) % 4])); } disco(40, 150, 5, hex('#946036')); disco(40, 150, 6, k); disco(40, 150, 5, hex('#946036'));
  // el bolígrafo, los clips y una nota amarilla (sin letras)
  for (let i = 0; i < 52; i++) { const x = 236 + i, y = 64 + Math.round(i * 0.25); pset(x, y, k); pset(x, y + 1, hex('#2a4ab8')); pset(x, y + 2, k); } rect(286, 75, 290, 78, hex('#e8e8f0'));
  for (const [x, y] of [[214, 150], [226, 156]]) { rect(x, y, x + 9, y + 3, hex('#c8ccd4')); rect(x + 1, y + 1, x + 8, y + 2, hex('#946036')); }
  rect(250, 112, 280, 140, k); rect(251, 113, 279, 139, hex('#f8e870')); for (let y = 118; y < 136; y += 5) linea(255, y, 274, y, hex('#d8c040'));
};
const p4 = (t) => {
  const { rect, pset, linea, disco } = R;
  fondo('mesa2001', mesa2001);
  // la taza de café que humea (vista desde arriba)
  disco(286, 160, 13, k); disco(286, 160, 12, hex('#e8e4dc')); disco(286, 160, 9, hex('#5a3418')); pset(282, 156, hex('#8a5a30')); rect(298, 156, 304, 162, k); rect(299, 157, 303, 161, hex('#e8e4dc'));
  for (let n = 0; n < 3; n++) { const u = (t * 0.5 + n / 3) % 1; for (let j = 0; j < 8; j++) pset(Math.round(284 + n * 3 + Math.sin(u * 8 + j * 0.6 + n) * 2), Math.round(146 - u * 30 - j), u < 0.7 ? hex('#f0ece4') : hex('#c8b8a0')); }
  // la hoja: sale del sobre hacia la derecha
  const sale = tramo(t, SALE - 0.8, SALE + 0.3), hx = Math.round(lerp(40, 132, sale)), hy = 48;
  rect(hx, hy, hx + 108, hy + 136, hex('#5a3a1e')); rect(hx - 1, hy - 1, hx + 106, hy + 134, k); rect(hx, hy, hx + 105, hy + 133, hex('#f6f2e6'));
  rect(hx + 92, hy + 6, hx + 100, hy + 10, hex('#c8303a'));
  cifras(1967, hx + 8, hy + 6, hex('#3a3a44'));
  // el título: dos trocitos que se leen (rayas grises) y el resto tachado en negro
  rect(hx + 10, hy + 18, hx + 18, hy + 22, hex('#5a5a64')); rect(hx + 22, hy + 17, hx + 96, hy + 23, hex('#101014'));
  for (let y = hy + 32, n = 0; y < hy + 126; y += 7, n++) { const w = 70 + Math.floor(hh(n, 1, 22) * 20); rect(hx + 10, y, hx + 10 + w, y + 1, hex('#8a8a94')); if (n % 3 === 1) rect(hx + 20 + Math.floor(hh(n, 2, 22) * 30), y - 2, hx + 54 + Math.floor(hh(n, 3, 22) * 30), y + 3, hex('#101014')); }
  P.sello(R, hx + 86, hy + 128, { tipo: 'marca' });
  // el sobre de papel manila (va delante de la hoja) con su cordel y el «2001» en tinta
  rect(14, 40, 128, 168, k); rect(15, 41, 127, 167, hex('#d8b878')); for (let y = 44; y < 166; y += 3) for (let x = 18; x < 126; x += 5) if (hh(x, y, 23) < 0.2) pset(x, y, hex('#c8a464'));
  linea(127, 41, 127, 167, hex('#b8945a')); disco(70, 70, 4, k); disco(70, 70, 3, hex('#a8743c')); linea(70, 70, Math.round(lerp(70, 112, sale)), Math.round(lerp(90, 104, sale)), hex('#e8e0d0'));
  rect(30, 140, 72, 154, hex('#a8303a')); rect(31, 141, 71, 153, hex('#d8b878')); cifras(2001, 36, 144, hex('#a8303a'), 1);
  // la solapa (pliegues en V), el canto en sombra, la esquina doblada, la franja roja de sin letras y un cerco de taza
  linea(15, 41, 70, 76, hex('#b8945a')); linea(127, 41, 72, 76, hex('#b8945a')); linea(15, 42, 70, 77, hex('#e8cc90')); linea(126, 42, 72, 77, hex('#e8cc90'));
  rect(15, 162, 127, 167, hex('#c4a466')); rect(15, 41, 18, 167, hex('#e4c88c'));
  R.poligono([[15, 150], [15, 167], [32, 167]], hex('#b8945a')); linea(15, 150, 32, 167, k);
  for (let i = 0; i < 60; i++) { const x = 20 + i, y = 120 - Math.round(i * 0.35); rect(x, y, x, y + 4, i % 10 < 5 ? hex('#c8303a') : hex('#f0e4c8')); }
  for (let a = 0; a < 6.28; a += 0.08) { const r = 12 + Math.sin(a * 3) * 0.6; pset(Math.round(100 + Math.cos(a) * r), Math.round(108 + Math.sin(a) * r), hex('#a88450')); }
  for (let n = 0; n < 6; n++) linea(20 + n * 17, 46 + (n % 3) * 30, 26 + n * 17, 50 + (n % 3) * 30, hex('#c8a464'));
  // la mano que tira de la hoja por la esquina de abajo (luego suelta y coge la lupa)
  const tira = t < SALE + 0.6, lupa = tramo(t, TITULO - 0.7, TITULO + 0.1), lx = hx + 60, ly = Math.round(lerp(200, hy + 20, lupa));
  if (tira && t > P4 + 0.2) T.brazo(R, hx + 132, 216, hx + 96, 166, '#3a4a6a', -1, { codo: [hx + 112, 196] });
  if (lupa > 0) {
    // el cristal agranda lo tachado
    disco(lx, ly, 19, k); R.recorte([lx - 17, ly - 17, lx + 17, ly + 17]);
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) if (i * i + j * j <= 256) { const sx = Math.round(lx + i * 0.55), sy = Math.round(ly + j * 0.55); const enT = sy >= hy + 17 && sy <= hy + 23 && sx >= hx + 22 && sx <= hx + 96; R.pset(lx + i, ly + j, enT ? hex('#101014') : sy >= hy + 18 && sy <= hy + 22 && sx >= hx + 10 && sx <= hx + 18 ? hex('#5a5a64') : hex('#f2f6f8')); }
    R.recorte(null); disco(lx - 7, ly - 8, 2, hex('#ffffff'));
    for (let a = 0; a < 6.3; a += 0.04) { pset(Math.round(lx + Math.cos(a) * 18), Math.round(ly + Math.sin(a) * 18), hex('#c8a040')); pset(Math.round(lx + Math.cos(a) * 19), Math.round(ly + Math.sin(a) * 19), hex('#8a6a20')); }
    rect(lx - 3, ly + 19, lx + 3, ly + 62, k); rect(lx - 2, ly + 20, lx + 2, ly + 61, hex('#3a2a1a')); rect(lx - 1, ly + 20, lx - 1, ly + 61, hex('#6a4a2a'));
    T.brazo(R, lx + 30, ly + 150, lx + 4, ly + 54, '#3a4a6a', -1, { codo: [lx + 22, ly + 100] });
    if (t > TACHADO && Math.floor(t * 6) % 2) for (const [a, b] of [[-26, -8], [26, -10], [0, -26]]) R.icono('!', lx + a - 2, ly + b - 3, hex('#d0202a'), k);
  }
};
const efectos = [[GATO + 0.1, 'miau'], [GATO + 0.6, 'bip'], [HAMBRE + 0.5, 'masca'], [DISTRAE - 0.3, 'whoosh'], [VAGA + 0.3, 'miau'],
  [CONCLUYE + 0.2, 'sello'], [NOPRAC, 'lapiz'], [SALE - 0.7, 'papel'], [TITULO - 0.6, 'whoosh'], [TACHADO, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P4 ? 1967 : 2001) });
''')

E['dc-paloma'] = ('El proyecto Paloma', '''// DC-PALOMA (frase 10), 1943 → 1944. Cinco planos:
// 1. «not the first animal recruit… World War Two»: un campo de 1943 al atardecer; un soldado suelta una paloma mensajera
//    que se va hacia el sol; el otro abre la cesta y saca la siguiente;
// 2. (corta en «Skinner») el laboratorio de Skinner: coge una paloma de las jaulas, la lleva a la punta de la bomba y la
//    mete dentro («rode inside the nose»); el oficial de la Marina entra y mira con el ceño fruncido;
// 3. (corta en «in front of a little screen») dentro de la punta: el barco se va de lado, la paloma lo picotea
//    («pecked… correct the course») y lo deja en el centro («dead center», brillo);
// 4. (corta en «dead center») la sala de los mandos: Skinner les enseña la paloma; los cinco dicen que no con la cabeza
//    («nobody in charge»), y al «trust a pigeon» la paloma aletea, «X» y Skinner se pone triste;
// 5. (corta en «Project Pigeon») 1944: el oficial mete la carpeta de la paloma en el cajón, lo cierra («cancelled») y le
//    echa el candado («1944»); una paloma entra por el ventanuco y se posa encima del archivador.''', COMUN + r'''
const m = (f) => en('paloma', f);
const P2 = m(0.2175), P3 = m(0.409), P4 = m(0.676), P5 = m(0.859);
const RECLUTA = m(0.053), GUERRA = m(0.103), PALOMAS = m(0.254), BOMBA = m(0.302), PUNTA = m(0.379);
const PICA = [m(0.475), m(0.502), m(0.524), m(0.548)], BLANCO = m(0.663), NADIE = m(0.723), CONFIAR = m(0.809), PALOMA = m(0.829);
const CANCELA = m(0.909), ANNO = m(0.942);

// 1 · el campo de 1943: la paloma mensajera
const cesta = (x, y, t, abre) => { const { rect, pset } = R; rect(x - 13, y - 14, x + 13, y, k); for (let j = y - 13; j < y; j++) for (let i = x - 12; i <= x + 12; i++) pset(i, j, (i + j * 2) % 5 < 2 ? hex('#8a6a3a') : hex('#c8a060'));
  palomaPica(x - 5, y - 9, t, Math.sin(t * 2.4) > 0.6); palomaPica(x + 6, y - 9, t, Math.sin(t * 2 + 2) > 0.7, { dir: -1 });
  for (let i = x - 12; i <= x + 12; i += 4) rect(i, y - 13, i + 1, y - 1, hex('#a8844a'));
  const a = Math.round(abre * 12); R.poligono([[x - 13, y - 14], [x + 13, y - 14], [x + 13 - a, y - 18 - a], [x - 13, y - 18]], k); R.poligono([[x - 12, y - 15], [x + 12, y - 15], [x + 12 - a, y - 17 - a], [x - 12, y - 17]], hex('#b8904e')); };
const p1 = (t) => {
  T.guerra(R, t, { encuadre: 'campo44', tanque: false, altavoz: 0 });
  const suelta = RECLUTA + 0.35, u = tramo(t, suelta, P2 - 0.2);
  const a = R.actor(EL.soldadoGA, 112, 156, t, { dir: -1, sostiene: t < suelta ? [104, 128] : false, brazos: t >= suelta && t < suelta + 0.5, sonrisa: t > suelta, habla: t < RECLUTA && Math.sin(t * 8) > 0 });
  if (t < suelta) palomaPica(a.mano[0] - 1, a.mano[1] - 1, t, false, { dir: -1 });
  else if (u < 1) P.paloma(R, Math.round(lerp(100, 34, u)), Math.round(lerp(118, 26, u) - Math.sin(u * Math.PI) * 10), { t, vuela: true, dir: -1 });
  const abre = tramo(t, GUERRA, GUERRA + 0.5), saca = t > GUERRA + 1.1;
  cesta(158, 156, t, abre);
  const b = R.actor(EL.soldadoGA2, 168, 152, t, { dir: -1, sostiene: saca ? [162, 128] : false, dedo: t > suelta + 0.3 && t < GUERRA, sonrisa: true });
  if (saca) palomaPica(b.mano[0], b.mano[1] - 1, t, Math.sin(t * 3) > 0.7, { dir: -1 });
  // un tercero cruza al fondo con otra cesta
  const c = tramo(t, 0.4, P2 - 0.3); R.actor(EL.soldadoGA3, Math.round(lerp(300, 200, c)), 140, t, { dir: -1, anda: c > 0 && c < 1 });
  T.guerraDelante(R, t, { encuadre: 'campo44', tanque: false, altavoz: 0 });
};

// 2 · el laboratorio de Skinner: la paloma entra en la punta
const p2 = (t) => {
  const g = T.animales(R, t, { encuadre: 'labSkinner' });
  const va = tramo(t, PALOMAS + 0.2, BOMBA + 0.5), mete = tramo(t, PUNTA - 0.6, PUNTA - 0.1);
  const sx = Math.round(lerp(140, 196, va));
  const s = R.actor(EL.skinner, sx, 166, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, sostiene: mete < 1 ? (va >= 1 ? [Math.round(lerp(sx + 18, 238, mete)), Math.round(lerp(140, 118, mete))] : true) : false, sonrisa: mete >= 1, habla: t < PALOMAS && Math.sin(t * 8) > 0 });
  if (mete < 1) palomaPica(s.mano[0] + (va > 0 ? 2 : -2), s.mano[1] - 1, t, false, { dir: va > 0 ? 1 : -1 });
  else palomaPica(240, 120, t, Math.sin(t * 6) > 0.3);
  const o = tramo(t, P2 + 0.3, PALOMAS + 0.6);
  R.actor(EL.oficialNaval, Math.round(lerp(330, 280, o)), 170, t, { dir: -1, anda: o > 0 && o < 1, enfado: t > PUNTA, habla: t > BOMBA && t < PUNTA && Math.sin(t * 7) > 0.3 });
  R.actor(EL.reiffel, 62, g.detrasMesa, t, { dir: 1, sostiene: [82, 140], habla: Math.sin(t * 3) > 0.6 });
  T.animalesDelante(R, t, { encuadre: 'labSkinner' });
  if (t > PUNTA + 0.2) R.bocadillo(292, 136, { icono: '?' });
};

// 3 · dentro de la punta: picotea el barco hasta dejarlo en el centro
const rumboEn = (t) => { let n = PICA.filter((p) => t >= p).length; const base = [0.85, 0.55, 0.3, 0.12, 0][n]; const deriva = n < 4 ? tramo(t, n ? PICA[n - 1] : P3, n < 4 ? PICA[n] : P3) * 0.12 : 0; return base + deriva + (n === 4 ? Math.sin(t * 2) * 0.03 : 0); };
const p3 = (t) => {
  const r = rumboEn(t), g = T.animales(R, t, { encuadre: 'labSkinner', camara: 'punta', rumbo: r });
  const [cx, cy] = g.pantalla, bx = Math.round(cx + r * 24);
  const pica = PICA.some((p) => t >= p - 0.08 && t < p + 0.16);
  palomaPica(g.paloma[0], g.paloma[1], t, pica, { s: 3 });
  // el golpecito en la pantalla: un anillo sobre el barco
  for (const p of PICA) { const u = tramo(t, p, p + 0.4); if (u > 0 && u < 1) { const rr = 3 + u * 8; for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(bx + Math.cos(a) * rr), Math.round(cy - 4 + Math.sin(a) * rr * 0.6), hex('#e8fff0')); } }
  if (t > BLANCO && t < BLANCO + 0.9 && Math.floor(t * 8) % 2) for (const [dx, dy] of [[-10, -12], [12, -10], [0, 14]]) R.icono('X', cx + dx - 2, cy + dy - 3, hex('#f8f0a0'), k);
};

// 4 · los mandos dicen que no
const p4 = (t) => {
  const o = { encuadre: 'tallerHielo', camara: 'reunion', bloque: false };
  const g = T.hielo(R, t, o);
  const S = g.sillones, MANDOS = [EL.oficialAliado, EL.oficialNaval, EL.generalAF, EL.generalAF2, EL.oficialAliado2];
  MANDOS.forEach((d, n) => { const niega = t > NADIE + n * 0.15 && t < NADIE + 1.1 + n * 0.15; R.actor(d, S[n] - 7, g.detrasMesa, t, { dir: niega ? (Math.floor(t * 7) % 2 ? 1 : -1) : -1, enfado: t > NADIE + n * 0.15, habla: n === 1 && t > CONFIAR - 0.4 && t < CONFIAR + 0.5 && Math.sin(t * 9) > 0 }); });
  const aletea = t > PALOMA && t < PALOMA + 0.5;
  const s = R.actor(EL.skinner, 70, 168, t, { dir: 1, sostiene: [94, 136], habla: t < NADIE && Math.sin(t * 8) > 0, sonrisa: t < NADIE, triste: t > PALOMA + 0.3 });
  if (aletea) P.paloma(R, s.mano[0] + 2, s.mano[1] - 4, { t, vuela: true }); else palomaPica(s.mano[0] + 2, s.mano[1] - 1, t, Math.sin(t * 5) > 0.7);
  T.hieloDelante(R, t, o);
  if (t > CONFIAR) R.bocadillo(S[1], g.detrasMesa - 34, { icono: 'X' });
};

// 5 · 1944: el cajón se cierra con candado; una paloma se posa encima
const p5 = (t) => {
  const abre = tramo(t, P5 + 0.35, P5 + 0.85) - tramo(t, CANCELA, CANCELA + 0.5);
  const g = T.carrera(R, t, { encuadre: 'redaccion', camara: 'cajon', abre, candado: false });
  const [, , yF] = g.cajon;
  // la carpeta de la paloma tapa la del decorado
  if (abre > 0) { const [cx, cb] = g.carpeta; P.carpeta(R, cx, cb, { s: 3, dibujo: 'nada' }); P.paloma(R, cx - 6, cb - 8, { s: 2 }); }
  // la etiqueta del cajón con su año
  R.rect(140, yF + 6, 160, yF + 11, hex('#e8e0c8')); cifras(1944, 142, yF + 7, k);
  [1943, 1942, 1941].forEach((n, i) => { const y = 106 + i * 24; R.rect(140, y, 160, y + 5, hex('#e8e0c8')); cifras(n, 142, y + 1, k); });
  if (t > ANNO) { const y = yF + 15; R.rect(146, y, 154, y + 7, k); R.rect(147, y + 1, 153, y + 6, hex('#c8a040')); R.rect(147, y - 4, 148, y, k); R.rect(152, y - 4, 153, y, k); R.rect(147, y - 5, 153, y - 4, k); R.pset(150, y + 3, k); }
  const se = tramo(t, ANNO + 0.5, ANNO + 2.6);
  const of = R.actor(EL.oficialNaval, Math.round(lerp(196, 330, se)), 170, t, { dir: se > 0 ? 1 : -1, anda: se > 0 && se < 1, sostiene: t < P5 + 0.45 ? [190, 132] : t < CANCELA + 0.5 && t > CANCELA - 0.1 ? [190, yF + 12] : false, sonrisa: t > ANNO });
  if (t < P5 + 0.45 && abre <= 0) { P.carpeta(R, of.mano[0] - 6, of.mano[1] + 9, { dibujo: 'nada' }); P.paloma(R, of.mano[0] - 7, of.mano[1] + 5, {}); }
  const llega = tramo(t, ANNO + 0.6, ANNO + 1.8);
  if (llega > 0) { const x = Math.round(lerp(50, 166, llega)), y = Math.round(lerp(30, 64, llega) - Math.sin(llega * Math.PI) * 10); if (llega < 1) P.paloma(R, x, y, { t, vuela: true, s: 2 }); else palomaPica(166, 64, t, Math.sin(t * 2.5) > 0.6, { dir: -1, s: 2 }); }
};
const efectos = [[RECLUTA + 0.4, 'whoosh'], [GUERRA + 0.1, 'toc'], [PUNTA - 0.1, 'golpecito'], [PICA[0], 'golpecito'], [PICA[2], 'golpecito'], [PICA[3], 'golpecito'],
  [BLANCO, 'brillo'], [PALOMA, 'whoosh'], [CONFIAR, 'boing'], [P5 + 0.15, 'papel'], [CANCELA + 0.45, 'toc'], [ANNO, 'cerrojo'], [ANNO + 0.7, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P5 ? 1943 : 1944) });
''')

E['dc-pavo'] = ('Blue Peacock', '''// DC-PAVO (frase 11), años cincuenta. Seis planos:
// 1. «the British had a cold problem»: el despacho de Londres; entra un técnico tiritando con una caja escarchada; el otro,
//    detrás de la mesa, se sorprende («?»);
// 2. (corta en «a nuclear landmine») el taller frío: la mina enorme en su carro, colgada de la báscula de cadena; la aguja
//    sube y sale un «7» («seven tons»); el otro técnico cuelga la chapa con la pluma del pavo real («Blue Peacock»);
// 3. (corta en «in Germany») el campo alemán nevado: uno echa nieve con la pala sobre la mina («bury»); el otro mira el
//    termómetro, que baja en «so cold», y tirita («!»);
// 4. (corta en «electronics») por dentro de la mina: las válvulas brillan, la escarcha crece desde los bordes y todo se
//    apaga en «stop working»; en «proposed solutions» asoma una gallina por la escotilla;
// 5. (corta en «put live chickens») el plano azul: el lápiz dibuja las gallinas con su comedero y su bebedero, y salen
//    las rayitas del calor («body heat»);
// 6. (corta en «would keep it warm») gag 4: en la nieve, una gallina sube a la mina y se echa a empollar encima, tan
//    tranquila; la escarcha se derrite a su alrededor y el técnico del fondo levanta el dedo.''', COMUN + r'''
const m = (f) => en('peacock', f);
const P2 = m(0.1806), P3 = m(0.383), P4 = m(0.599), P5 = m(0.7686), P6 = m(0.9524);
const FRIO = m(0.052), SIETE = m(0.257), PAVO = m(0.314), ENTIERRA = m(0.368), INVIERNO = m(0.528), TANFRIO = m(0.558);
const PARA = m(0.648), SOLUCION = m(0.724), GALLINAS = m(0.792), COMIDA = m(0.864), AGUA = m(0.889), CALOR = m(0.924), TEMPLADA = m(0.969);

// la caja de la electrónica escarchada que lleva el técnico
const cajaFria = (x, y, t) => { const { rect, pset } = R; rect(x - 6, y - 8, x + 6, y, k); rect(x - 5, y - 7, x + 5, y - 1, hex('#5a6a5a')); rect(x - 5, y - 7, x + 5, y - 6, hex('#eef6fc')); for (const i of [-4, -1, 2, 4]) pset(x + i, y + 1, hex('#c8e4f0')); pset(x - 2, y - 4, Math.sin(t * 9) > 0 ? hex('#f8f8ff') : hex('#8ab0c0')); rect(x + 2, y - 4, x + 3, y - 3, hex('#3a8a3a')); };

// 1 · el despacho de Londres: el problema del frío
const p1 = (t) => {
  const g = T.hielo(R, t, { encuadre: 'londres42' });
  const entra = tramo(t, 0.1, FRIO - 0.2), x = Math.round(lerp(-18, 112, entra)) + (entra >= 1 ? Math.round(Math.sin(t * 40)) : 0);
  const b = R.actor(EL.tecnicoBritanico2, 168, 162, t, { dir: -1, sorpresa: t > FRIO + 0.2 && t < P2 - 1.2, habla: t > P2 - 1.2 && Math.sin(t * 8) > 0, dedo: t > P2 - 1.2 });
  const a = R.actor(EL.tecnicoBritanico, x, 164, t, { dir: 1, anda: entra > 0 && entra < 1, sostiene: t > FRIO ? [x + 22, 130] : true, triste: entra >= 1 });
  cajaFria(a.mano[0] + 2, a.mano[1] + 2, t);
  vaho(a.cabeza[0] + 5, a.cabeza[1] + 9, t, 1); vaho(b.cabeza[0] - 5, b.cabeza[1] + 9, t, -1, 0.7);
  // copos de nieve que entran con él y se derriten en el parqué
  for (let n = 0; n < 7; n++) { const u = tramo(t, 0.1 + n * 0.12, 1.6 + n * 0.12); if (u > 0 && u < 1) R.pset(Math.round(lerp(0, 60 + n * 12, u)), Math.round(110 + n * 6 + Math.sin(u * 9 + n) * 3 + u * 30), hex('#f4f8ff')); }
  T.hieloDelante(R, t, { encuadre: 'londres42' });
  if (t > FRIO + 0.2) R.bocadillo(b.cabeza[0] + 3, b.cabeza[1] - 4, { icono: '?' });
};

// 2 · el taller frío: la báscula marca 7 y la chapa del pavo real
const p2 = (t) => {
  const { rect, pset, linea, disco } = R;
  const o = { encuadre: 'tallerHielo', bloques: false };
  T.hielo(R, t, o);
  // la viga de hierro con su carro y la cadena hasta la báscula
  rect(0, 18, 200, 23, k); rect(0, 19, 200, 20, hex('#6a7078')); rect(0, 21, 200, 22, hex('#4a5058')); for (let x = 4; x < 200; x += 10) pset(x, 21, hex('#9aa0a8'));
  rect(92, 23, 108, 28, k); rect(93, 24, 107, 27, hex('#c8a030'));
  const iza = tramo(t, P2 + 0.2, SIETE - 0.2), alto = Math.round(iza * 3);
  for (let y = 29; y < 40; y += 2) { rect(99, y, 101, y + 1, k); pset(100, y, hex('#9aa0a8')); }
  disco(100, 52, 13, k); disco(100, 52, 12, hex('#f0ece0')); for (let a = -2.4; a <= 0.6; a += 0.4) pset(Math.round(100 + Math.cos(a) * 10), Math.round(52 + Math.sin(a) * 10), k);
  const ang = lerp(-2.4, -0.2, tramo(t, P2 + 0.3, SIETE)) + (t > SIETE ? Math.sin((t - SIETE) * 14) * 0.08 * Math.max(0, 1 - (t - SIETE)) : 0);
  linea(100, 52, Math.round(100 + Math.cos(ang) * 9), Math.round(52 + Math.sin(ang) * 9), hex('#c8303a')); disco(100, 52, 1, k);
  for (let y = 66; y < 76; y += 2) { rect(99, y, 101, y + 1, k); pset(100, y, hex('#9aa0a8')); }
  linea(100, 76, 70, 104 - alto, k); linea(100, 76, 130, 104 - alto, k); linea(101, 76, 71, 104 - alto, hex('#9aa0a8')); linea(99, 76, 129, 104 - alto, hex('#9aa0a8'));
  if (t > SIETE) { const u = tramo(t, SIETE, SIETE + 0.3); R.numero('7', 126, Math.round(lerp(66, 60, u)), { tam: 16 }); }
  // el carro y la mina
  rect(52, 150, 150, 155, k); rect(53, 151, 149, 153, hex('#5a6a3a')); for (const wx of [62, 138]) { disco(wx, 158, 4, k); disco(wx, 158, 2, hex('#6a6a6a')); }
  P.minaPeacock(R, 100, 150 - alto, { s: 2, escarcha: true });
  // la chapa del pavo real (la pluma con su ojo) que cuelga el técnico
  const cuelga = tramo(t, PAVO - 0.5, PAVO);
  const b = R.actor(EL.tecnicoBritanico, Math.round(lerp(168, 146, tramo(t, P2 + 0.5, PAVO - 0.6))), 162, t, { dir: -1, anda: t > P2 + 0.5 && t < PAVO - 0.6, sostiene: cuelga > 0 && cuelga < 1 ? [140, 118] : false, dedo: t > SIETE && t < PAVO - 0.6, sonrisa: t > PAVO });
  const chapa = (x, y) => { R.linea(x, y - 6, x, y - 2, k); rect(x - 5, y - 2, x + 5, y + 10, k); rect(x - 4, y - 1, x + 4, y + 9, hex('#f0e8d0')); disco(x, y + 4, 3, hex('#1a7ab8')); disco(x, y + 4, 2, hex('#2ac0a8')); disco(x, y + 4, 1, hex('#1a2a6a')); for (const i of [-3, 3]) pset(x + i, y + 8, hex('#3a8a4a')); };
  if (cuelga > 0 && cuelga < 1) chapa(b.mano[0], b.mano[1] + 2); else if (cuelga >= 1) chapa(134, 118 - alto);
  if (t > PAVO && t < PAVO + 0.8 && Math.floor(t * 10) % 2) for (const [dx, dy] of [[-8, -4], [8, 0], [0, 14]]) pset(134 + dx, 118 + dy, hex('#ffffff'));
  R.actor(EL.tecnicoBritanico2, 248, 158, t, { dir: -1, habla: t > SIETE && t < SIETE + 1 && Math.sin(t * 9) > 0, sorpresa: t > SIETE && t < SIETE + 0.6 });
  T.hieloDelante(R, t, o);
};

// 3 · el campo nevado: enterrarla en Alemania; el termómetro baja
const p3 = (t) => {
  const frio = 0.25 + tramo(t, INVIERNO, TANFRIO + 0.6) * 0.75;
  const g = T.animales(R, t, { encuadre: 'campoNieve', frio });
  // el que echa nieve con la pala
  const ciclo = ((t - P3) % 1.2) / 1.2, carga = ciclo < 0.5, sx = 100;
  const a = R.actor(EL.tecnicoBritanico, sx, 164, t, { dir: 1, sostiene: carga ? [sx + 18, 150] : [sx + 22, 132] });
  const [hx, hy] = a.mano, px = carga ? sx + 28 : sx + 32, py = carga ? 160 : 136;
  R.linea(hx, hy, px, py, k); R.linea(hx + 1, hy, px + 1, py, hex('#8a6a3a')); R.rect(px - 2, py - 1, px + 3, py + 3, k); R.rect(px - 1, py, px + 2, py + 2, hex('#9aa0a8'));
  if (carga) R.rect(px - 1, py - 2, px + 2, py - 1, hex('#f4f8fc'));
  else { const u = (ciclo - 0.5) / 0.5; for (let n = 0; n < 4; n++) R.rect(Math.round(lerp(px, 150 + n * 6, u)), Math.round(lerp(py, 122 + n, u) - Math.sin(u * Math.PI) * 14), Math.round(lerp(px, 150 + n * 6, u)) + 1, Math.round(lerp(py, 122 + n, u) - Math.sin(u * Math.PI) * 14) + 1, hex('#f4f8fc')); }
  vaho(a.cabeza[0] + 5, a.cabeza[1] + 9, t, 1);
  // el del termómetro: lo mira, le da un golpecito y tirita
  const tirita = t > TANFRIO, golpe = t > INVIERNO && t < INVIERNO + 0.5;
  const b = R.actor(EL.tecnicoBritanico2, 212 + (tirita ? Math.round(Math.sin(t * 40)) : 0), 162, t, { dir: 1, sostiene: golpe ? [230, 122] : false, sorpresa: tirita, triste: !tirita && t > INVIERNO + 0.5 });
  vaho(b.cabeza[0] + 5, b.cabeza[1] + 9, t, 1, 0.5);
  T.animalesDelante(R, t, { encuadre: 'campoNieve', frio });
  if (tirita) R.bocadillo(b.cabeza[0] + 2, b.cabeza[1] - 4, {});
};

// 4 · por dentro de la mina: la electrónica se escarcha y se apaga (inserto local, pintado entero)
const tripas = () => {
  const { rect, pset, linea, disco } = R;
  // la chapa curva del cilindro, con sus costillas y remaches
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = Math.cos((y - 90) / 120); const v = c * 0.8 + (hh(x >> 1, y >> 1, 30) - 0.5) * 0.12; pset(x, y, v > 0.72 ? hex('#5a6270') : v > 0.55 ? hex('#4a5260') : hex('#363c48')); }
  for (const x of [20, 84, 276]) { rect(x, 0, x + 5, 179, k); rect(x + 1, 0, x + 3, 179, hex('#6a7280')); for (let y = 6; y < 180; y += 12) { pset(x + 2, y, hex('#a8b0bc')); pset(x + 2, y + 1, k); } }
  // la escotilla de arriba a la izquierda (luz de nieve)
  disco(52, 58, 22, k); disco(52, 58, 20, hex('#8a92a0')); disco(52, 58, 16, k); disco(52, 58, 15, hex('#dce6f0'));
  for (let a = 0; a < 6.28; a += 0.785) pset(Math.round(52 + Math.cos(a) * 18), Math.round(58 + Math.sin(a) * 18), hex('#c8ccd6'));
  // el bastidor de la electrónica
  rect(98, 44, 268, 152, k); rect(99, 45, 267, 151, hex('#4a5a4a')); rect(99, 45, 267, 46, hex('#6a7a6a'));
  for (let x = 104; x < 264; x += 4) pset(x, 148, hex('#3a4a3a'));
  // el transformador y los condensadores con sus bandas de color
  rect(104, 104, 140, 140, k); rect(105, 105, 139, 139, hex('#2a2e34')); for (let y = 108; y < 138; y += 3) linea(106, y, 138, y, hex('#5a4a2a'));
  for (let i = 0; i < 6; i++) { const x = 148 + i * 8; rect(x, 112, x + 4, 128, k); rect(x + 1, 113, x + 3, 127, hex(['#c8a040', '#3a6ac8', '#c84a3a'][i % 3])); for (const y of [116, 120, 124]) linea(x + 1, y, x + 3, y, hex(['#1a1a1a', '#c83a3a', '#e8c040'][(y + i) % 3])); linea(x + 2, 128, x + 2, 140, hex('#c8a060')); }
  // el haz de cables
  for (let n = 0; n < 5; n++) { const c = hex(['#c83a3a', '#e8c040', '#3a8ac8', '#e8e8e0', '#3aa84a'][n]); for (let x = 196; x < 300; x++) pset(x, 140 + n + Math.round(Math.sin(x * 0.05 + n) * 2), c); }
  // el suelo con cables y tornillos
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) if (hh(x, y, 31) < 0.06) pset(x, y, hex('#22262e'));
  // los tornillos de las esquinas del bastidor y la placa de rayas (sin letras)
  for (const [x, y] of [[102, 48], [264, 48], [102, 148], [264, 148]]) { disco(x, y, 2, k); pset(x, y, hex('#a8b0bc')); }
  rect(150, 132, 196, 140, k); rect(151, 133, 195, 139, hex('#c8c0a0')); for (const y of [135, 137]) linea(154, y, 192, y, hex('#7a7260'));
  // la caja de empalmes y el tubo que baja de la escotilla
  rect(30, 92, 70, 120, k); rect(31, 93, 69, 119, hex('#5a6270')); rect(31, 93, 69, 94, hex('#7a8290')); for (const [x, y] of [[34, 96], [66, 96], [34, 116], [66, 116]]) pset(x, y, hex('#c8ccd6'));
  rect(48, 120, 52, 152, k); rect(49, 120, 51, 152, hex('#6a7280')); for (let y = 126; y < 152; y += 8) { rect(46, y, 54, y + 1, k); }
  linea(70, 106, 98, 106, k); linea(70, 107, 98, 107, hex('#c83a3a'));
  // la batería del fondo, con sus bornes
  rect(8, 132, 44, 168, k); rect(9, 133, 43, 167, hex('#2a2e34')); rect(9, 133, 43, 135, hex('#4a4e58')); for (const x of [16, 36]) { rect(x - 2, 128, x + 2, 132, k); rect(x - 1, 129, x + 1, 131, x < 20 ? hex('#c83a3a') : hex('#3a3a3a')); }
  for (let y = 140; y < 166; y += 6) linea(12, y, 40, y, hex('#3a3e48'));
  // las costillas del cilindro, con remaches, por arriba y por abajo del bastidor
  for (const y of [30, 164]) { rect(0, y, 319, y + 3, k); rect(0, y + 1, 319, y + 2, hex('#6a7280')); for (let x = 4; x < 320; x += 10) pset(x, y + 1, hex('#a8b0bc')); }
  // el campo de ruido suave de la escarcha (una vez)
  const F = new Float32Array(320 * 180), vn = (x, y, e, s0) => { const X = Math.floor(x / e), Y = Math.floor(y / e), fx = x / e - X, fy = y / e - Y, sm = (u) => u * u * (3 - 2 * u), a = hh(X, Y, s0), b = hh(X + 1, Y, s0), c = hh(X, Y + 1, s0), d = hh(X + 1, Y + 1, s0); return lerp(lerp(a, b, sm(fx)), lerp(c, d, sm(fx)), sm(fy)); };
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) F[y * 320 + x] = vn(x, y, 14, 35) * 0.55 + vn(x, y, 5, 36) * 0.3 + hh(x, y, 37) * 0.15;
  capas.set('escarchaF', F);
};
const p4 = (t) => {
  const { rect, pset, disco, linea } = R;
  fondo('tripas', tripas);
  const vida = 1 - tramo(t, PARA - 0.1, PARA + 0.7), parpadea = vida > 0 && vida < 1 && Math.sin(t * 37) > 0;
  // las cuatro válvulas: el cristal y el filamento que brilla (y se apaga)
  for (let i = 0; i < 4; i++) { const x = 112 + i * 22, y = 56; rect(x - 6, y, x + 6, y + 34, k); rect(x - 5, y + 1, x + 5, y + 33, hex('#8aa0a8')); rect(x - 4, y + 2, x + 4, y + 30, hex('#2a3038'));
    const v = parpadea ? 0 : vida; if (v > 0) { for (let j = 0; j < 20; j++) pset(x + (j % 4 < 2 ? -1 : 1), y + 8 + j, v > 0.5 ? hex('#ffb040') : hex('#a85a20')); disco(x, y + 18, 6, v > 0.5 ? hex('#ff9a30') : hex('#6a3a20')); disco(x, y + 18, 3, hex('#fff0a0')); }
    pset(x - 3, y + 3, hex('#e8f4ff')); rect(x - 7, y + 34, x + 7, y + 38, k); rect(x - 6, y + 35, x + 6, y + 37, hex('#c8a040')); }
  // el medidor redondo con la aguja que cae
  disco(232, 74, 20, k); disco(232, 74, 18, hex('#f0ece0')); for (let a = -2.6; a <= -0.5; a += 0.3) pset(Math.round(232 + Math.cos(a) * 15), Math.round(74 + Math.sin(a) * 15), k);
  const ag = lerp(-2.6, -0.9, vida) + (vida > 0 ? Math.sin(t * 5) * 0.05 : 0); linea(232, 74, Math.round(232 + Math.cos(ag) * 14), Math.round(74 + Math.sin(ag) * 14), hex('#c8303a')); disco(232, 74, 2, k);
  // los pilotos: verdes con vida; luego uno rojo que parpadea
  for (let i = 0; i < 3; i++) { const x = 216 + i * 14, y = 118; disco(x, y, 4, k); disco(x, y, 3, vida > 0.5 && !parpadea ? hex('#3ae85a') : i === 1 && vida <= 0 && Math.floor(t * 3) % 2 ? hex('#ff3a3a') : hex('#2a3a2a')); if (vida > 0.5) pset(x - 1, y - 1, hex('#c8ffd0')); }
  // la escarcha que crece desde los bordes y los carámbanos del bastidor
  const e = 0.12 + tramo(t, P4 + 0.1, SOLUCION) * 0.88;
  const F = capas.get('escarchaF'), BL = hex('#f6fafe'), AZ = hex('#cfe2ef'), AZ2 = hex('#a8c6dc');
  if (F) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.min(x, 319 - x, y * 1.5, (179 - y) * 1.7) / 80, v = F[y * 320 + x] - d / e; if (v > -0.05) pset(x, y, v > 0.12 ? AZ : v > 0.02 ? BL : AZ2); }
  // las agujas de hielo que crecen desde los bordes (helechos de escarcha)
  for (let n = 0; n < 14; n++) { const x0 = n < 7 ? 0 : 319, y0 = 12 + (n % 7) * 26, l = Math.round(e * (30 + hh(n, 9, 38) * 40)), dir = n < 7 ? 1 : -1; for (let i = 0; i < l; i++) { const x = x0 + dir * i, y = y0 + Math.round(Math.sin(i * 0.12 + n) * 4); pset(x, y, BL); if (i % 6 === 3) for (let j = 1; j < 5; j++) { pset(x + dir * j, y - j, BL); pset(x + dir * j, y + j, AZ); } } }
  // destellos de la escarcha
  for (let n = 0; n < 8; n++) if (Math.sin(t * 5 + n * 1.7) > 0.85) { const x = Math.floor(hh(n, 1, 39) * 300) + 10, y = Math.floor(hh(n, 2, 39) * 160) + 10, d = Math.min(x, 319 - x, y * 1.5, (179 - y) * 1.7) / 80; if (F && F[y * 320 + x] - d / e > 0) { pset(x, y, hex('#ffffff')); pset(x - 1, y, AZ); pset(x + 1, y, AZ); pset(x, y - 1, AZ); pset(x, y + 1, AZ); } }
  for (let n = 0; n < 12; n++) { const x = 104 + n * 14, l = Math.round((2 + hh(n, 1, 34) * 6) * e * 1.3); linea(x, 152, x, 152 + l, hex('#d8ecf8')); pset(x, 152 + l, hex('#ffffff')); }
  // asoma la gallina por la escotilla
  const asoma = tramo(t, SOLUCION, SOLUCION + 0.6);
  if (asoma > 0) enHueco(() => P.gallina(R, 54, Math.round(lerp(96, 72, asoma)), { t, s: 2, picotea: Math.sin(t * 4) > 0.8 }), [[37, 43, 67, 73]]);
};

// 5 · el plano: el lápiz dibuja las gallinas y el calor
const p5 = (t) => {
  const trazo = tramo(t, P5 + 0.3, AGUA + 0.2);
  const g = T.animales(R, t, { encuadre: 'campoNieve', camara: 'plano', trazo });
  const G = g.gallinas || [[118, 104], [150, 106], [176, 104]];
  const i = Math.min(G.length - 1, Math.floor(trazo * G.length)), [gx, gy] = G[i], dibuja = trazo > 0 && trazo < 1;
  const tx = dibuja ? gx + Math.round(Math.sin(t * 13) * 5) : 230, ty = dibuja ? gy - 4 + Math.round(Math.cos(t * 11) * 3) : 150;
  // el calor: rayitas naranjas que suben de las gallinas
  if (t > CALOR - 0.2) for (const [x, y] of G) for (let n = 0; n < 3; n++) { const u = (t * 1.2 + n / 3) % 1; for (let j = 0; j < 5; j++) R.pset(x - 4 + n * 4 + Math.round(Math.sin(u * 6 + j) * 1.5), Math.round(y - 14 - u * 12 - j), hex('#e8742a')); }
  // el lápiz en la mano
  R.linea(tx, ty, tx + 18, ty + 18, k); R.linea(tx + 1, ty, tx + 19, ty + 18, hex('#e8c040')); R.linea(tx, ty + 1, tx + 18, ty + 19, hex('#c89a20')); R.pset(tx, ty, hex('#3a3a3a'));
  T.brazo(R, tx + 70, 236, tx + 20, ty + 22, '#4a5a7a', -1, { codo: [tx + 36, 192] });
};

// 6 · gag 4: la gallina empolla encima de la mina en la nieve (inserto local, pintado entero)
const nieveCerca = () => {
  const { rect, pset, disco, poligono } = R;
  for (let y = 0; y < 90; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x, y, 40) < y / 110 ? hex('#c8d0dc') : hex('#a8b2c0'));
  // el bosque de pinos nevados al fondo
  for (let n = 0; n < 26; n++) { const x = n * 13 + Math.floor(hh(n, 1, 41) * 8), h = 26 + Math.floor(hh(n, 2, 41) * 18), b = 92; if (x > 270 && b - h < 46) continue;
    poligono([[x, b - h], [x - 9, b], [x + 9, b]], hex('#2a4a3a')); poligono([[x, b - h], [x - 4, b - h + 12], [x + 2, b - h + 10]], hex('#e8eef4')); for (let j = b - h + 14; j < b; j += 7) R.linea(x - Math.round((j - b + h) * 0.3), j, x, j - 1, hex('#e8eef4')); }
  // la nieve con montones, sombras azules y huellas
  for (let y = 84; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.03 + y * 0.08) + (hh(x, y, 42) - 0.5) * 0.6; pset(x, y, v > 0.8 ? hex('#ffffff') : v < -0.7 ? hex('#c4d4e6') : hex('#e8eff6')); }
  // las sombras azules de los ventisqueros
  for (let n = 0; n < 7; n++) { const cx = 20 + n * 48, cy = 100 + (n % 3) * 22; for (let i = -36; i <= 36; i++) { const hgt = Math.round(Math.sqrt(Math.max(0, 1 - (i / 36) ** 2)) * 5); for (let j = 0; j < hgt; j++) pset(cx + i, cy + j, j === 0 ? hex('#ffffff') : hex('#cddbea')); } }
  // el hoyo: la tierra oscura removida alrededor de la mina, con nieve sucia
  for (let i = -112; i <= 112; i++) for (let j = -8; j <= 8; j++) { const d = (i / 112) ** 2 + (j / 8) ** 2; if (d <= 1 && d > 0.55) pset(160 + i, 150 + j, hh(i, j, 45) < 0.4 ? hex('#4a3a2e') : hh(i, j, 46) < 0.7 ? hex('#6a5444') : hex('#c8c0b8')); }
  // la valla de cuerda con estacas al fondo
  for (const x of [10, 44, 78, 244, 278, 312]) { rect(x - 1, 104, x + 1, 126, k); rect(x, 104, x, 126, hex('#8a6a3a')); rect(x - 1, 103, x + 1, 104, hex('#ffffff')); }
  for (const [a, b] of [[10, 78], [244, 312]]) for (let x = a; x <= b; x++) pset(x, 110 + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 4), hex('#c8303a'));
  // la pala clavada y la caja con el farol
  rect(64, 112, 66, 156, k); rect(65, 112, 65, 156, hex('#a87a44')); rect(60, 108, 70, 112, k); rect(61, 109, 69, 111, hex('#a87a44')); rect(60, 150, 70, 160, k); rect(61, 151, 69, 159, hex('#8a92a0'));
  rect(22, 146, 54, 168, k); rect(23, 147, 53, 167, hex('#9a6a3a')); for (let y = 152; y < 167; y += 5) R.linea(23, y, 53, y, hex('#7a4e28')); rect(23, 147, 53, 148, hex('#ffffff'));
  rect(32, 132, 42, 146, k); rect(33, 135, 41, 145, hex('#f8d870')); rect(31, 131, 43, 133, k); R.linea(37, 126, 37, 131, k);
  // las huellas de la gallina que llegan a la mina y las de las botas
  for (let n = 0; n < 9; n++) { const x = 30 + n * 11, y = 164 - (n % 2) * 3; pset(x, y, hex('#9ab0c8')); pset(x + 1, y + 1, hex('#9ab0c8')); pset(x - 1, y + 1, hex('#9ab0c8')); }
  for (let n = 0; n < 8; n++) { const x = 228 + n * 9, y = 124 + n * 4 + (n % 2) * 3; rect(x, y, x + 3, y + 2, hex('#b0c2d8')); }
  // el poste del termómetro
  rect(256, 96, 260, 168, k); rect(257, 96, 259, 168, hex('#8a6a3a')); rect(262, 100, 270, 140, k); rect(263, 101, 269, 139, hex('#f0ece0')); for (let y = 104; y < 138; y += 4) R.linea(264, y, 266, y, k);
};
const p6 = (t) => {
  const { rect, pset, disco } = R;
  fondo('nieveCerca', nieveCerca);
  // nubes de nieve de tres tonos a tres velocidades y dos cuervos
  for (const [x0, y, v, w, c] of [[30, 16, 2, 70, '#d4dae4'], [190, 30, 3.5, 56, '#bcc4d0'], [110, 48, 5, 48, '#9ca6b4']]) { const x = ((x0 + t * v) % 400) - 60; for (let i = 0; i < w; i++) { const hgt = Math.round(Math.sin(i / w * Math.PI) * 7 + Math.sin(i * 0.5) * 1.5); R.linea(Math.round(x + i), y - hgt, Math.round(x + i), y + 2, hex(c)); } }
  for (let n = 0; n < 2; n++) { const x = Math.round(((t * 14 + n * 140) % 360) - 20), y = 58 + n * 10 + Math.round(Math.sin(t * 3 + n) * 2), a = Math.floor(t * 6 + n) % 2; R.linea(x - 3, y - a, x, y, k); R.linea(x, y, x + 3, y - a, k); }
  // el técnico del fondo, pequeño, con su sombra, que mira y levanta el dedo
  for (let i = -8; i <= 8; i++) pset(229 + i, 112, hex('#c4d4e6'));
  R.actor(EL.tecnicoBritanico, 222, 112, t, { dir: -1, dedo: t > TEMPLADA - 0.2, sonrisa: t > TEMPLADA - 0.2 });
  vaho(229, 96, t, -1);
  // la mina medio enterrada, escarchada (menos alrededor de la gallina)
  P.minaPeacock(R, 160, 176, { s: 3, escarcha: true });
  const sube = tramo(t, P6 + 0.1, P6 + 0.9), echa = t > P6 + 1.1;
  // la nieve de delante tapa la panza de la mina
  for (let y = 150; y < 180; y++) for (let x = 60; x < 260; x++) { const top = 150 + Math.round(Math.sin(x * 0.06) * 4 + Math.abs(x - 160) * 0.12); if (y >= top) pset(x, y, y === top ? hex('#ffffff') : hh(x, y, 43) < 0.2 ? hex('#d0deec') : hex('#eef4fa')); }
  // la escarcha se derrite donde está la gallina: el acero mojado y una gota que cae
  const derrite = tramo(t, P6 + 1.3, P6 + 3.2);
  if (derrite > 0) { const w = Math.round(derrite * 20); for (let x = 160 - w; x <= 160 + w; x++) for (let y = 116; y <= 121; y++) pset(x, y, y < 118 ? hex('#c8d0dc') : hex('#9aa4b4')); const u = (t * 1.3) % 1; pset(160 + w, Math.round(122 + u * 20), hex('#a8d8f8')); }
  // la gallina: llega por la nieve, sube de un saltito y se echa a empollar
  if (!echa) { const x = Math.round(lerp(30, 150, sube)), y = sube < 0.6 ? 158 : Math.round(lerp(158, 117, (sube - 0.6) / 0.4) - Math.sin((sube - 0.6) / 0.4 * Math.PI) * 10); P.gallina(R, x, y, { t, s: 2 }); }
  else { const b = Math.sin(t * 3) > 0.7 ? 1 : 0; P.gallina(R, 160, 117 + b, { t, s: 2, sentada: true });
    // el calor que sube de ella
    for (let n = 0; n < 3; n++) { const u = (t * 0.9 + n / 3) % 1; for (let j = 0; j < 6; j++) pset(152 + n * 8 + Math.round(Math.sin(u * 6 + j) * 1.5), Math.round(92 - u * 16 - j), hex('#f0a060')); } }
  // el mercurio sube
  const sube2 = tramo(t, P6 + 1.2, TEMPLADA + 1.5); rect(265, Math.round(lerp(132, 108, sube2)), 267, 136, hex('#d0202a'));
  // la nieve que cae en tres capas (los copos que llegan encima de la gallina se derriten)
  for (let n = 0; n < 60; n++) { const capa = n % 3, v = [10, 18, 28][capa], x = Math.round((hh(n, 1, 44) * 340 + Math.sin(t + n) * 6 + t * 4) % 330) - 5, y = Math.round((hh(n, 2, 44) * 200 + t * v) % 200) - 10;
    if (echa && x > 140 && x < 180 && y > 70) continue; if (capa === 2) rect(x, y, x + 1, y + 1, hex('#ffffff')); else pset(x, y, capa ? hex('#ffffff') : hex('#dde6f0')); }
};
const efectos = [[0.3, 'viento'], [FRIO + 0.2, 'boing'], [P2 + 0.3, 'carro'], [SIETE, 'tic'], [SIETE + 0.05, 'pop'], [PAVO, 'brillo'],
  [P3 + 0.6, 'chof'], [P3 + 1.8, 'chof'], [INVIERNO + 0.1, 'golpecito'], [TANFRIO + 0.1, 'viento'], [PARA + 0.2, 'interruptor'], [SOLUCION + 0.2, 'pop'],
  [P5 + 0.4, 'lapiz'], [COMIDA, 'lapiz'], [CALOR, 'brillo'], [P6 + 0.8, 'pop'], [TEMPLADA, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1955 });
''')
