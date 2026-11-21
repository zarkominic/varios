E = {}

# ── pa-gancho (frases 1–2) ───────────────────────────────────────────────────────────────────────────────────────────
E['pa-gancho'] = ('Gancho', '''// PA-GANCHO (frases 1–2). Año 0 hasta «twelve years later», luego 12. Cinco planos; golpe en «villain» (giro+2.5):
// 1. el desierto al ocaso (general): Paul sube a la cresta de la duna de delante y se para; en «villain» asoma detrás,
//    por el horizonte, un mar de estandartes (siluetas con banderolas verde y negro) y el cielo se enrojece un instante;
//    en «his own story» Paul alza los brazos hacia ellos; Atom (luciérnaga) se sorprende y se aparta;
// 2. el salón del trono (día): Shaddam en el trono; Paul entra por la alfombra; en «father» señala el estandarte del
//    halcón; en «defeat the Emperor» Shaddam se levanta sorprendido y se va por la plataforma, triste; Paul sube un paso;
// 3. el balcón sobre la multitud: Paul entra por la izquierda e Irulan por la derecha y se encuentran («marry his
//    daughter», sonríen); en «chants your name» la plaza entera alza los brazos y Paul también;
// 4. el planeta desde el espacio, doce años después: en «later» se enciende una luz en la cara de noche y se extiende
//    por todo el planeta («holy war»); luego, alrededor, los demás planetas del mapa de estrellas se encienden de rojo uno
//    a uno («billions of lives»); Atom luciérnaga, asustado;
// 5. de noche, en la repisa de roca: Paul emperador mira el desierto; en «saw it coming» señala y en la arena se abre un
//    árbol de caminos dorados (la visión); en «couldn't stop it» los caminos se vuelven rojos, él baja el brazo, triste,
//    y se da la vuelta; la loma de arena avanza a lo lejos.''', r'''
const g = (f) => en('giro', f), m = (f) => en('imagina', f);
const P2 = m(0), P3 = m(0.2814), P4 = m(0.5006), P5 = m(0.789);
const GOLPE = g(0) + 2.5, villain = g(0.367);
const K = hex('#17151d'), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const hh = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const voz = (t) => E.energia ? E.energia(t) : 0;
// banderola de los Fremen (sin letras): mástil, paño verde oscuro o negro con el halcón como un punto de oro
const banderola = (x, y, h, t, k, ver) => {
  const v = Math.round(Math.sin(t * 3 + k) * 1.2);
  R.linea(x, y, x, y - h, hex('#3a2a1c'));
  const c = k % 2 ? hex('#1f3a26') : hex('#1a1a20'), cs = k % 2 ? hex('#2e5a38') : hex('#34343e');
  R.poligono([[x + 1, y - h], [x + 8 + v, y - h + 1], [x + 7 + v, y - h + 6], [x + 1, y - h + 6]], c);
  R.linea(x + 1, y - h, x + 7 + v, y - h + 1, cs); R.linea(x + 1, y - h + 6, x + 7 + v, y - h + 6, hex('#e8c040'));
  if (ver) { R.pset(x + 4, y - h + 3, hex('#e8c040')); R.pset(x + 3, y - h + 2, hex('#e8c040')); R.pset(x + 5, y - h + 2, hex('#e8c040')); }
};
const banderolaG = (x, y, h, t, k) => {
  const v = Math.round(Math.sin(t * 2.6 + k) * 1.5), c = k % 2 ? hex('#1f4a2c') : hex('#18181e'), cs = k % 2 ? hex('#3a7048') : hex('#3a3a46');
  R.linea(x, y, x, y - h, hex('#4a3420')); R.pset(x, y - h - 1, hex('#e8c040'));
  R.poligono([[x + 1, y - h], [x + 11 + v, y - h + 1], [x + 10 + v, y - h + 9], [x + 1, y - h + 9]], K);
  R.poligono([[x + 1, y - h + 1], [x + 10 + v, y - h + 2], [x + 9 + v, y - h + 8], [x + 1, y - h + 8]], c);
  R.linea(x + 1, y - h + 1, x + 9 + v, y - h + 2, cs); R.linea(x + 1, y - h + 8, x + 9 + v, y - h + 8, hex('#c8a030'));
  const cx = x + 5 + Math.round(v / 2), cy = y - h + 4; R.pset(cx, cy, hex('#f0c848')); R.pset(cx - 1, cy - 1, hex('#f0c848')); R.pset(cx + 1, cy - 1, hex('#f0c848')); R.pset(cx, cy + 1, hex('#c89a30'));
};
// 1 · el desierto al ocaso: Paul en la cresta; en «villain», el mar de estandartes por el horizonte
const p1 = (t) => {
  const o = { encuadre: 'desierto', hora: 'ocaso', t0: 0 };
  const geo = T.planeta(R, t, o);
  const hor = geo?.hor ?? 92;
  // el mar de estandartes sube por detrás del horizonte (recortado a él)
  const sube = ease(tramo(t, villain - 0.3, villain + 0.45));
  if (sube > 0) {
    R.recorte([0, 0, 319, hor]);
    // un resplandor rojizo detrás, a ras del horizonte
    for (let y = hor - 10; y <= hor; y++) for (let x = 90 + (y & 1); x < 316; x += 2) if (((x >> 1) + y) % 3 === 0) R.pset(x, y, hex('#c8603a'));
    for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 13; k++) {
      const x = Math.round(104 + k * 16 + fila * 8 + hh(k, fila) * 4), ret = (hh(k, fila, 3) * 0.25 + fila * 0.1);
      const u = cl((sube - ret) / (1 - ret)); if (u <= 0) continue;
      const y = Math.round(hor + 3 - fila * 1 + (1 - u) * 26 - Math.max(0, Math.sin(t * 2 + k) * 0.6));
      R.poligono([[x - 2, y - 7], [x + 2, y - 7], [x + 3, y + 8], [x - 3, y + 8]], K); R.disco(x, y - 9, 2, K); R.pset(x - 1, y - 10, hex('#4a3020')); R.linea(x + 2, y - 6, x + 2, y + 4, hex('#3a2a20'));
      banderolaG(x + 3, y - 4, 22 + (k % 3) * 4 - fila * 5, t, k + fila);
    }
    R.recorte(null);
  }
  // Paul sube a la cresta y se para; en «his own story» alza los brazos
  const u = ease(tramo(t, 0.2, villain - 0.1)), px = Math.round(lerp(64, 132, u));
  const alza = t > g(0.45) && t < g(0.78);
  R.actor(T.PA.paul, px, 150, t, { dir: 1, anda: u > 0 && u < 1, brazos: alza, sorpresa: t > villain && t < villain + 0.6 });
  // Atom luciérnaga: se asusta con el golpe y retrocede
  const sp = tramo(t, villain, villain + 0.7);
  const ax = lerp(210, 238, ease(sp)) + Math.sin(t * 1.1) * 4, ay = lerp(118, 108, sp) + Math.sin(t * 2.3) * 3;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: 0.85, cara: t > villain && t < g(0.68) ? 'sorpresa' : t > g(0.68) ? 'triste' : 'normal' });
  T.planetaDelante(R, t, o);
  // el golpe: el cielo se enrojece un instante
  const fl = tramo(t, GOLPE - 0.25, GOLPE) * (1 - tramo(t, GOLPE, GOLPE + 0.9));
  if (fl > 0) T.tinte(R, 0, 179, [190, 40, 30], 0.28 * fl);
};
// 2 · el salón del trono (día): Shaddam se levanta y se va; Paul llega por la alfombra
const p2 = (t) => {
  const o = { encuadre: 'trono', luz: 'dia' };
  T.ciudadela(R, t, o);
  const sale = ease(tramo(t, m(0.2025), m(0.2025) + 1.2));
  const sx = Math.round(lerp(153, 190, sale));
  R.actor(T.PA.shaddam, sx, 122, t, { dir: 1, anda: sale > 0 && sale < 1, sorpresa: t > m(0.2025) - 0.1 && t < m(0.2025) + 0.5, triste: t > m(0.2025) + 0.5, enfado: t < m(0.2) && t > m(0.115) });
  const u = ease(tramo(t, P2 + 0.1, m(0.115))), px = Math.round(lerp(72, 138, u));
  const sube = ease(tramo(t, m(0.2354), P3 - 0.05));
  R.actor(T.PA.paul, Math.round(px + sube * 18), Math.round(150 - sube * 7), t, { dir: 1, anda: (u > 0 && u < 1) || (sube > 0 && sube < 1), dedo: t > m(0.135) && t < m(0.2), sonrisa: t > m(0.25) });
  T.AT.luciernaga(R, 264 + Math.sin(t * 0.9) * 4, 132 + Math.sin(t * 2.1) * 3, t, { dir: -1, brillo: 0.8, cara: t > m(0.2025) ? 'sorpresa' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 3 · el balcón: la boda y la multitud que corea
const p3 = (t) => {
  const corea = (tt) => ease(tramo(tt, m(0.405), m(0.45)));
  const o = { encuadre: 'balcon', aclaman: corea };
  T.ciudadela(R, t, o);
  const u = ease(tramo(t, P3 + 0.05, m(0.30))), w = ease(tramo(t, P3 + 0.1, m(0.305)));
  const px = Math.round(lerp(116, 140, u)), ix = Math.round(lerp(194, 170, w));
  const c = corea(t);
  R.actor(T.PA.paul, px, 132, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1, brazos: c > 0.4 });
  R.actor(T.PA.irulan, ix, 132, t, { dir: -1, anda: w > 0 && w < 1, sonrisa: w >= 1, dedo: c > 0.4 && c < 0.95 });
  T.AT.luciernaga(R, 124 + Math.sin(t * 1.2) * 6, 36 + Math.sin(t * 2.5) * 3, t, { dir: -1, brillo: 0.8, cara: c > 0.3 ? 'sonrisa' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 4 · el planeta desde el espacio: la guerra santa, solo luces
const LUCES = Array.from({ length: 90 }, (_, k) => ({ lon: hh(k, 1, 7) * 6.283, lat: (hh(k, 2, 7) - 0.5) * 2.6 }));
const SEM = { lon: 0.35, lat: 0.2 };
for (const L of LUCES) { const d = Math.acos(Math.max(-1, Math.min(1, Math.sin(L.lat) * Math.sin(SEM.lat) + Math.cos(L.lat) * Math.cos(SEM.lat) * Math.cos(L.lon - SEM.lon)))); L.d = d / Math.PI; }
const MUNDOS = [[40, 46, 3, '#8a9ab0'], [66, 140, 4, '#a07850'], [28, 98, 2, '#90a888'], [236, 60, 3, '#b0a070'], [262, 132, 4, '#7a88a8'], [292, 88, 2, '#a89090'], [222, 160, 2, '#9a9a80'], [92, 34, 2, '#88a0a0'], [214, 34, 2, '#a08aa0'], [300, 160, 3, '#90a070'], [16, 150, 3, '#a09080'], [250, 104, 2, '#8a8aa0']];
const p4 = (t) => {
  const giro = 0.03 * (t - P4);
  T.planeta(R, t, { encuadre: 'orbita', t0: P4, giro });
  const cx = 150, cy = 100, rr = 56, prog = tramo(t, m(0.5313), m(0.70)) ** 1.3;
  for (const L of LUCES) {
    const a = L.lon + giro * 1, z = Math.cos(L.lat) * Math.cos(a); if (z < 0.08) continue;
    const on = cl((prog - L.d * 0.95) * 6); if (on <= 0) continue;
    const x = Math.round(cx + rr * Math.cos(L.lat) * Math.sin(a)), y = Math.round(cy - rr * Math.sin(L.lat));
    const tw = Math.sin(t * 9 + L.lon * 20) > 0;
    if (on > 0.5) { for (const [dx, dy] of [[-1, 0], [-1, 1], [2, 0], [2, 1], [0, -1], [1, -1], [0, 2], [1, 2]]) R.pset(x + dx, y + dy, hex('#a83222')); if (tw && on > 0.8) for (const [dx, dy] of [[-2, 0], [3, 1], [1, -2], [0, 3]]) R.pset(x + dx, y + dy, hex('#6a1a16')); }
    R.rect(x, y, x + 1, y + 1, on > 0.6 ? (tw ? hex('#ffe08a') : hex('#ffb050')) : hex('#e05a30'));
    if (on > 0.8 && tw) R.pset(x, y, hex('#fff6d0'));
  }
  // los otros planetas del mapa de estrellas se encienden uno a uno
  const q = tramo(t, m(0.66), m(0.775));
  MUNDOS.forEach(([x, y, r, c], k) => {
    const on = cl((q * MUNDOS.length - k) * 1.5);
    R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(c)); R.pset(x - 1, y - 1, hex('#e8e8f0'));
    if (on > 0) { const pr = r + 2 + Math.round(on * 2) + (Math.floor(t * 4 + k) % 2);
      for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283; R.pset(Math.round(x + Math.cos(an) * pr), Math.round(y + Math.sin(an) * pr), on > 0.5 ? hex('#e84a2a') : hex('#8a2a20')); }
      R.disco(x, y, Math.max(1, r - 1), hex('#e86a30')); R.pset(x, y, hex('#ffd070')); }
  });
  const ax = 238 + Math.sin(t * 0.8) * 4, ay = 150 + Math.sin(t * 2) * 3;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: 0.85, cara: t > m(0.7176) ? 'triste' : t > m(0.6365) ? 'sorpresa' : 'normal' });
};
// 5 · la repisa de roca, de noche: la visión de los caminos que no puede parar
const RAMAS = (() => { const L = []; const rama = (x, y, an, len, n) => { const x1 = x + Math.cos(an) * len, y1 = y + Math.sin(an) * len * 0.5; L.push([x, y, x1, y1, n]); if (n < 4) { rama(x1, y1, an - 0.45, len * 0.75, n + 1); rama(x1, y1, an + 0.4, len * 0.72, n + 1); } }; rama(160, 120, -0.05, 30, 0); return L; })();
const p5 = (t) => {
  const o = { encuadre: 'desierto', camara: 'roca', hora: 'noche', silueta: 1, t0: P5 };
  T.planeta(R, t, o);
  const ve = tramo(t, m(0.8218), m(0.89)), roj = tramo(t, m(0.9434), m(0.98));
  if (ve > 0) {
    R.recorte([150, 66, 270, 128]);
    for (const [x0, y0, x1, y1, n] of RAMAS) {
      const u = cl(ve * 5 - n); if (u <= 0) continue;
      const xe = Math.round(lerp(x0, x1, u)), ye = Math.round(lerp(y0, y1, u));
      const c = roj > 0.5 ? hex('#8a2a2a') : (Math.floor(t * 6 + n) % 3 ? hex('#ffd060') : hex('#fff0b0'));
      R.linea(Math.round(x0), Math.round(y0), xe, ye, c); R.linea(Math.round(x0), Math.round(y0) + 1, xe, ye + 1, roj > 0.5 ? hex('#4a1a20') : hex('#a87020'));
    }
    R.recorte(null);
  }
  const alza = t > m(0.835) && t < m(0.9434);
  const vuelta = t > m(0.97);
  R.actor(T.PA.paulEmperador, 104, 131, t, { dir: vuelta ? -1 : 1, dedo: alza, triste: t > m(0.9434), sorpresa: t > m(0.8218) && t < m(0.84) });
  T.AT.luciernaga(R, 72 + Math.sin(t * 1.1) * 4, 96 + Math.sin(t * 2.2) * 3, t, { dir: 1, brillo: 0.7, cara: t > m(0.9434) ? 'triste' : 'normal' });
  T.planetaDelante(R, t, o);
};
const efectos = [[0.3, 'viento', { dur: 2.2 }], [GOLPE, 'boom'], [m(0.2025), 'golpecito'], [m(0.41), 'publico', { dur: 2.2 }], [m(0.5313), 'brillo'], [m(0.6365), 'trueno'], [m(0.825), 'brillo'], [m(0.95), 'viento', { dur: 1.6 }]];
const año = (t) => (t < P4 ? 0 : 12);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

# ── pa-aviso (frases 3–4) ────────────────────────────────────────────────────────────────────────────────────────────
E['pa-aviso'] = ('Aviso', '''// PA-AVISO (frases 3–4). Año 0 (el joven Paul), 12 (el emperador), y el estudio sin año. Seis planos:
// 1. el desierto de día, a ras del llano: el joven Paul camina por la cresta y Atom (chibi) lo sigue; en «Paul
//    Atreides» Atom se para y lo señala; en «you know him» Paul se vuelve y Atom saluda; la loma cruza el llano;
// 2. el laberinto de luz visto desde arriba: Paul llega al centro («comes to the desert») y, en «prophet», alza los
//    brazos y los caminos se encienden uno a uno;
// 3. los aposentos, de noche: Paul emperador va del diván a la ventana y mira la ciudad («his story»); Irulan se asoma
//    por la puerta; en «warning» él se vuelve, triste;
// 4. el globo del escritorio de Atom: Atom (al doble) levanta el cartel del ojo tapado en «a warning»; en «Dune
//    Messiah» el globo de la Tierra se vuelve de arena;
// 5. el estudio entero: Atom va a la pizarra; en «Part 3» sale un «3» de tiza y en «December 18th» la hoja de
//    calendario con el «18», que rodea con un círculo;
// 6. la mesa de cerca: Atom camina («walk into the theater»), se tapa los ojos con el cartel en «knowing nothing», lo
//    deja sobre el libro en «save this video» y guiña en «later».''', r'''
const p = (f) => en('paul', f), a = (f) => en('aviso', f);
const Q2 = p(0.4097), Q3 = p(0.7018), Q4 = a(0), Q5 = a(0.3239), Q6 = a(0.6665);
const K = hex('#17151d'), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const voz = (t) => E.energia ? E.energia(t) : 0;
const TIZA = hex('#eef0e4');
// el cartel del ojo tapado (sin letras): tarjeta blanca con borde, un ojo con pestañas y una venda oscura encima
const cartel = (x0, y0, w, hh) => {
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#fbf6e8')); R.rect(x0 + 1, y0 + hh - 2, x0 + w - 1, y0 + hh - 1, hex('#e0d6bc'));
  const cx = x0 + Math.round(w / 2), cy = y0 + Math.round(hh / 2) + 1, rx = Math.round(w * 0.34), ry = Math.max(2, Math.round(hh * 0.24));
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const e = (x / rx) ** 2 + (y / ry) ** 2; if (e <= 1) R.pset(cx + x, cy + y, e > 0.62 ? K : hex('#ffffff')); }
  R.disco(cx, cy, Math.max(1, ry - 1), hex('#3a7ad8')); R.pset(cx, cy, K);
  for (let k = -2; k <= 2; k++) R.linea(cx + k * Math.round(rx / 2.5), cy - ry - 1, cx + k * Math.round(rx / 2.2), cy - ry - 3, K);
  const bh = Math.max(2, Math.round(hh * 0.18)); R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy + Math.ceil(bh / 2) - 1, hex('#2a2a36'));
  R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy - Math.floor(bh / 2), hex('#4a4a5a'));
  R.linea(x0 + w - 3, cy + 1, x0 + w - 1, cy + 4, hex('#2a2a36')); R.linea(x0 + w - 4, cy + 1, x0 + w - 5, cy + 4, hex('#2a2a36'));
};
// el libro (nuestro, sin letras): tapas color arena con un halcón dorado de punto y un ojo azul
const libro = (x, y, w, h) => {
  R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 2, hex('#c8a060')); R.rect(x + 1, y + h - 2, x + w - 1, y + h - 1, hex('#efe6d0'));
  R.rect(x + 1, y + 1, x + 2, y + h - 2, hex('#8a6430')); R.rect(x + 3, y + 1, x + w - 1, y + 2, hex('#dcb878'));
  const cx = x + Math.round(w / 2) + 1, cy = y + Math.round(h / 2) - 1;
  R.disco(cx, cy, Math.round(h / 4), hex('#8a5a26')); R.disco(cx, cy, Math.max(1, Math.round(h / 4) - 1), hex('#3a6ad8')); R.pset(cx, cy, hex('#a8d8ff'));
  R.linea(x + 4, y + h - 5, x + w - 3, y + h - 5, hex('#a8803e'));
  R.rect(x + 1, y + 1, x + 4, y + h - 2, hex('#7a4a1c')); R.linea(x + 2, y + 3, x + 2, y + h - 4, hex('#c89a50')); R.pset(x + 3, y + 5, hex('#e8c040')); R.pset(x + 3, y + h - 6, hex('#e8c040'));
  for (let i = 0; i < 2; i++) R.linea(x + 5, y + h - 1 + 0, x + w - 1, y + h - 1, hex('#d8ccb0'));
  R.rect(x + 3, y + h, x + w + 1, y + h + 1, hex('#3a2414'));
};
// 1 · el desierto de día: Paul camina y Atom lo sigue
const q1 = (t) => {
  const o = { encuadre: 'desierto', hora: 'dia', silueta: 1, t0: 0 };
  T.planeta(R, t, o);
  const u = tramo(t, 0, p(0.35)), px = Math.round(lerp(56, 214, ease(u)));
  const vuelve = t > p(0.3589);
  R.actor(T.PA.paul, px, 150, t, { dir: vuelve ? -1 : 1, anda: u > 0 && u < 1, sonrisa: vuelve });
  const para = t > p(0.0654) && t < p(0.19);
  const ua = tramo(t, 0, p(0.0654)), ub = tramo(t, p(0.19), p(0.34));
  const ax = Math.round(lerp(14, 60, ease(ua)) + lerp(0, 90, ease(ub)));
  T.AT.atom(R, ax, 152, t, { dir: 1, pose: (ua > 0 && ua < 1) || (ub > 0 && ub < 1) ? 'camina' : para ? 'senala' : vuelve ? 'saluda' : 'quieto', cara: vuelve ? 'sonrisa' : para ? 'sorpresa' : 'normal', habla: voz(t) });
  T.planetaDelante(R, t, o);
};
// 2 · el laberinto de luz desde arriba: el profeta
const q2 = (t) => {
  const enc = ease(tramo(t, p(0.53), p(0.66)));
  const o = { encuadre: 'laberinto', camara: 'alto', apagados: 0.85 * (1 - enc) };
  T.sietch(R, t, o);
  const u = ease(tramo(t, Q2 + 0.05, p(0.53))), px = Math.round(lerp(96, 160, u));
  const pro = t > p(0.5768);
  R.actor(T.PA.paul, px, 166, t, { dir: 1, anda: u > 0 && u < 1, brazos: pro && t < p(0.68), sorpresa: pro && t < p(0.62) });
  const an = t * 1.3, va = ease(tramo(t, p(0.53), p(0.6)));
  T.AT.luciernaga(R, lerp(160 + Math.cos(an) * 42, 52 + Math.sin(t) * 3, va), lerp(112 + Math.sin(an) * 16, 150 + Math.sin(t * 2) * 2, va), t, { dir: Math.cos(an + 1.57) > 0 ? 1 : -1, brillo: 0.9, cara: pro ? 'sorpresa' : 'normal' });
  T.sietchDelante(R, t, o);
};
// 3 · los aposentos de noche: el emperador a solas
const q3 = (t) => {
  const o = { encuadre: 'aposentos' };
  T.ciudadela(R, t, o);
  const asoma = ease(tramo(t, p(0.80), p(0.84))) * (1 - ease(tramo(t, p(0.965), p(0.995))));
  R.actor(T.PA.irulan, Math.round(lerp(262, 256, asoma)), 150, t, { dir: -1, sorpresa: t > p(0.9575) && t < p(0.99) });
  const u = ease(tramo(t, Q3 + 0.1, p(0.86))), px = Math.round(lerp(76, 148, u));
  const vuelta = t > p(0.9575);
  R.actor(T.PA.paulEmperador, px, 150, t, { dir: vuelta ? -1 : 1, anda: u > 0 && u < 1, triste: vuelta, habla: 0 });
  T.AT.luciernaga(R, 177 + Math.sin(t * 1.2) * 3, 112 + Math.sin(t * 2.4) * 3, t, { dir: -1, brillo: 0.75, cara: vuelta ? 'triste' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 4 · el globo del escritorio: el cartel en «a warning»; la Tierra se vuelve de arena
const q4 = (t) => {
  const are = ease(tramo(t, a(0.2111), a(0.2562) + 0.4));
  const o = { encuadre: 'orbita', camara: 'globo', arena: are, t0: Q4 };
  const geo = T.planeta(R, t, o);
  const alza = ease(tramo(t, a(0.075), a(0.095)));
  const mira = t > a(0.2111);
  const r = T.AT.atom(R, 252, 132, t, { s: 2, dir: -1, pose: alza > 0 ? 'sostiene' : 'quieto', cara: mira ? 'sorpresa' : 'normal', habla: voz(t) });
  if (alza > 0 && r?.mano) { const [mx, my] = r.mano.map(Math.round); const cy0 = Math.round(my - 40 + (1 - alza) * 16);
    R.rect(mx, cy0 + 22, mx + 1, my, hex('#7a5230')); cartel(mx - 22, cy0, 32, 23); }
  T.planetaDelante(R, t, o);
};
// 5 · el estudio entero: el «3» y la hoja del calendario con el «18» en la pizarra
const q5 = (t) => {
  const tres = a(0.4198), dic = a(0.5727), ocho = a(0.589);
  const pizarra = (R, t, [x0, y0, x1, y1]) => {
    const u3 = tramo(t, tres - 0.1, tres + 0.3);
    if (u3 > 0) R.numero('3', x0 + 20, y0 + 30, { tam: 16, color: TIZA, contorno: false, sombra: false, n: Math.ceil(u3 * 16) });
    const uc = tramo(t, dic - 0.2, dic + 0.3);
    if (uc > 0) { const cx0 = x0 + Math.round((x1 - x0) * 0.48), cy0 = y0 + 6, w = 34, h = Math.round(34 * ease(uc));
      for (let y = cy0; y <= cy0 + h; y++) { R.linea(cx0, y, cx0 + w, y, y < cy0 + 8 ? hex('#c84a3a') : hex('#f4efe2')); }
      R.linea(cx0, cy0, cx0 + w, cy0, K); R.linea(cx0, cy0 + h, cx0 + w, cy0 + h, K); R.linea(cx0, cy0, cx0, cy0 + h, K); R.linea(cx0 + w, cy0, cx0 + w, cy0 + h, K);
      for (const dx of [8, 26]) { R.linea(cx0 + dx, cy0 - 2, cx0 + dx, cy0 + 2, hex('#8a8a90')); }
      if (uc >= 1) R.numero('18', cx0 + 17, cy0 + 29, { tam: 16, centro: true, color: K, contorno: false, sombra: false, n: t > ocho ? Infinity : 8 });
      const ur = tramo(t, ocho + 0.2, ocho + 0.9);
      if (ur > 0) for (let i = 0; i <= 48 * ur; i++) { const an = -1.6 + i / 48 * 6.4; R.pset(Math.round(cx0 + 17 + Math.cos(an) * 22), Math.round(cy0 + 20 + Math.sin(an) * 17), TIZA); R.pset(Math.round(cx0 + 17 + Math.cos(an) * 23), Math.round(cy0 + 20 + Math.sin(an) * 18), TIZA); }
    }
  };
  const o = { pizarra };
  const ge = T.estudio(R, t, o);
  const u = ease(tramo(t, Q5 + 0.1, tres - 0.3));
  const x = Math.round(lerp(74, 118, u));
  const senala = (t > tres - 0.2 && t < tres + 0.8) || t > dic - 0.2;
  T.AT.atom(R, x, 166, t, { s: 2, dir: 1, pose: u > 0 && u < 1 ? 'camina' : senala ? 'senala' : 'quieto', cara: t > ocho ? 'sonrisa' : 'normal', habla: voz(t) });
  T.estudioDelante(R, t, o);
};
// 6 · la mesa de cerca: Atom se tapa los ojos con el cartel y lo deja sobre el libro
const q6 = (t) => {
  const o = { camara: 'mesa', sin: ['lupa'] };
  const ge = T.estudio(R, t, o);
  libro(172, 134, 48, 18);
  const anda = tramo(t, a(0.7067), a(0.7624)), x = Math.round(lerp(120, 146, ease(anda)));
  const tapa = t > a(0.7842);
  const d = ease(tramo(t, a(0.8758), a(0.8758) + 0.4)), deja = d >= 1;
  const r = T.AT.atom(R, x, 156, t, { s: 2, dir: 1, pose: anda > 0 && anda < 1 ? 'camina' : !deja ? 'sostiene' : t > a(0.94) ? 'senala' : 'quieto', cara: t > a(0.9632) ? 'guino' : deja ? 'sonrisa' : 'normal', habla: voz(t) });
  if (!deja && r?.mano) { const [mx, my] = r.mano.map(Math.round); const sube = tapa ? ease(tramo(t, a(0.7842), a(0.7842) + 0.25)) : 0;
    const [fx, fy] = (r.centro ?? [mx - 10, my - 16]).map(Math.round);
    let cy0 = lerp(my - 14, fy - 10, sube), cx0 = lerp(mx - 8, fx - 14, sube);
    cx0 = lerp(cx0, 181, d); cy0 = lerp(cy0, 115, d);
    if (!tapa) R.rect(mx, my - 2, mx + 1, my, hex('#7a5230'));
    cartel(Math.round(cx0), Math.round(cy0), 30, 21); }
  if (deja) cartel(181, 115, 30, 21);
};
const efectos = [[0.3, 'viento', { dur: 2.6 }], [p(0.5768), 'brillo'], [a(0.092), 'aviso'], [a(0.2111), 'vapor'], [a(0.4198), 'lapiz'], [a(0.5727), 'papel'], [a(0.589) + 0.2, 'lapiz'], [a(0.7842), 'papel'], [a(0.8758), 'toc']];
const año = (t) => (t < Q3 ? 0 : t < Q4 ? 12 : null);
T.rodar(E, R, [[0, q1], [Q2, q2], [Q3, q3], [Q4, q4], [Q5, q5], [Q6, q6]], { efectos, año });
''')
