E = {}

# piezas comunes de las tres escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), GUANTE = '#5a8ad0', LONA = '#c8bc98';
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// lo que pasa por detrás de una pieza del decorado (la borda): guarda esos rectángulos, dibuja y los repone
const detras = (rects, dibuja) => {
  const g = rects.map(([x0, y0, x1, y1]) => { const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y)); return v; });
  dibuja();
  rects.forEach(([x0, y0, x1, y1], k) => { let i = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, g[k][i++]); });
};
// un fondo fijo propio, en su búfer (se pinta una vez)
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
// una burbuja de aire (r 1–3) con su brillo
const burbuja = (x, y, r) => { x = Math.round(x); y = Math.round(y); if (r <= 1) { R.pset(x, y, hex('#d8f0ff')); return; } R.disco(x, y, r, hex('#a8d8f0')); R.disco(x, y, r - 1, hex('#3a7aa8')); R.pset(x - 1, y - 1, BL); };
// un chorro de burbujas que sube desde (x, y) hasta yTope
const chorro = (x, y, yTope, t, n = 9, k = 0) => { for (let i = 0; i < n; i++) { const f = ((t * 0.9 + i / n + hh(i, k, 3)) % 1), yy = lerp(y, yTope, f); burbuja(x + Math.sin(t * 5 + i * 2) * (2 + f * 3), yy, f < 0.3 ? 1 : 1 + (i % 3)); } };
// bocadillo blanco con un icono dentro (cx, cy: centro; hx, hy: hacia dónde apunta el piquito)
const bocadillo = (cx, cy, w, hgt, hx, hy) => {
  R.disco(cx - w / 2 + 4, cy, hgt / 2 + 1, K); R.disco(cx + w / 2 - 4, cy, hgt / 2 + 1, K); R.rect(cx - w / 2 + 4, cy - hgt / 2 - 1, cx + w / 2 - 4, cy + hgt / 2 + 1, K);
  R.poligono([[cx - 3, cy + hgt / 2 - 1], [cx + 3, cy + hgt / 2 - 1], [hx, hy]], K);
  R.disco(cx - w / 2 + 4, cy, hgt / 2, BL); R.disco(cx + w / 2 - 4, cy, hgt / 2, BL); R.rect(cx - w / 2 + 4, cy - hgt / 2, cx + w / 2 - 4, cy + hgt / 2, BL);
  R.poligono([[cx - 2, cy + hgt / 2 - 1], [cx + 2, cy + hgt / 2 - 1], [hx, hy - 2]], BL);
};
// la exclamación de susto sobre una cabeza (u 0–1 la hace saltar)
const susto = (x, y, u) => { if (u <= 0) return; const dy = Math.round(Math.sin(Math.min(1, u) * Math.PI) * -3); R.disco(x, y + dy, 6, K); R.disco(x, y + dy, 5, hex('#f6e04a')); R.icono('!', x - 2, y - 4 + dy, hex('#c83a2a'), hex('#f6e04a'), 1); };
'''

E['ak-gancho'] = ('Gancho', '''// AK-GANCHO (frases 1–2), sin cartela. Siete planos; golpe «maquina+12.6» = corte seco al plano de las ruedas en «gears»:
// 1. la terraza griega de día (antigua taller 'cielo'): Hiparco junto a la esfera armilar; el artesano entra con la caja
//    de la máquina («someone built a machine»); Hiparco señala al Sol y el eclipse oscurece todo («eclipses»): sorpresa;
// 2. corte en «1901»: el terrón verde en la arena del naufragio; el brazo de lona del buzo entra («divers pulled it out»),
//    tira de él, lo frota («lump of green») y el rayo descubre la rueda dorada («Inside it were»);
// 3. corte seco en «gears»: las ruedas dentro de la caja, girando; en «cut by hand» una mano con una lima repasa un diente;
// 4. «It's called the Antikythera mechanism»: el mecanismo entero de frente; el artesano entra, señala la esfera y sonríe
//    («oldest computer»); Hiparco asiente;
// 5. «sponge divers who saw people»: la cubierta del caíque de día; la bomba gira; un buzo asoma por la escalerilla, salta a
//    cubierta y se asusta «!»; el capitán se vuelve sorprendido;
// 6. «a scientist who counted teeth… an eight-ton machine squeezed into a museum»: la investigadora cuenta dientes en el
//    monitor (bocadillo con la rueda y la cifra que sube) y el escáner entra por la puerta con un píxel de margen;
// 7. «a calendar for the Olympic Games»: Olimpia, los atletas salen corriendo; dos espectadores los animan.''', COMUN + r'''
const A = (s) => en('maquina', (s - 0.5) / 14.497), B = (s) => en('nombre', (s - 17.598) / 16.197);
const P2 = A(6.1), P3 = A(13.1), P4 = B(17.6), P5 = B(22.62), P6 = B(26.36), P7 = B(31.72);
// 1 · el eclipse
const p1 = (t) => {
  const e = ease(tramo(t, A(2.4), A(4.7)));
  const o = { encuadre: 'taller', camara: 'cielo', luz: 'dia', eclipse: e };
  T.antigua(R, t, o);
  const u = tramo(t, A(2.4), A(3.7)), xa = Math.round(lerp(-18, 104, ease(u)));
  const a = R.actor(EL.artesanoAK, xa, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sorpresa: e > 0.85, sonrisa: t > A(5.5) });
  // la caja de madera de la máquina, en sus manos: tablas, la esfera de bronce y la manivela
  const [mx, my] = a.mano; R.rect(mx - 5, my - 8, mx + 6, my + 2, K); R.rect(mx - 4, my - 7, mx + 5, my + 1, hex('#8a5a34')); R.rect(mx - 4, my - 7, mx + 5, my - 6, hex('#b07a48'));
  R.disco(mx, my - 3, 2, hex('#c8963a')); R.pset(mx, my - 3, hex('#f0c868')); R.rect(mx + 6, my - 4, mx + 7, my - 3, hex('#c8963a'));
  const apunta = t > A(3.75);
  R.actor(EL.hiparcoAK, 142, 160, t, { dir: 1, dedo: apunta, habla: !apunta && Math.sin(t * 6) > 0.3, sorpresa: e > 0.85 && t < A(5.6), sonrisa: t > A(5.6) });
  T.antiguaDelante(R, t, o);
  susto(150, 118, tramo(t, A(4.75), A(5.2)));
};
// 2 · el terrón en la arena del naufragio; el brazo del buzo
const p2 = (t) => {
  const b = tramo(t, A(11.3), A(12.95));
  const o = { camara: 'terron', brillo: b };
  T.fondo(R, t, o);
  // el chorro de burbujas de la escafandra (fuera de cuadro a la izquierda)
  chorro(70 + Math.sin(t) * 2, 150, 24, t, 10, 1);
  const ent = ease(tramo(t, A(7.25), A(8.0))), tira = tramo(t, A(7.9), A(8.25)) - tramo(t, A(8.25), A(8.7));
  const frota = t > A(9.7) && t < A(11.2) ? Math.round(Math.sin(t * 14) * 2) : 0, susp = ease(tramo(t, A(11.9), A(12.4)));
  const wx = Math.round(133 - tira * 5 - susp * 8), wy = Math.round(115 + frota + susp * 4);
  const wx2 = Math.round(lerp(100, wx, ent)), wy2 = Math.round(lerp(160, wy, ent));
  if (ent > 0) T.brazo(R, 96, 152, wx2, wy2, LONA, 1);
  // la mata de posidonia de la que sale el brazo (el buzo, detrás, fuera de cuadro)
  for (let k = 0; k < 9; k++) { let x = 84 + k * 3, y = 166; for (let q = 0; q < 22 + (k % 3) * 5; q++) { x += Math.sin(t * 2 + k + q * 0.25) * 0.45 + (k - 4) * 0.04; y -= 1; R.pset(Math.round(x), y, q > 16 ? hex('#6aaa4a') : k % 2 ? hex('#3a7a3a') : hex('#2a6a30')); R.pset(Math.round(x) + 1, y, hex('#1e4a24')); } }
  // la arena que levanta el tirón
  const nube = tramo(t, A(8.0), A(9.2)); if (nube > 0 && nube < 1) for (let k = 0; k < 14; k++) { const a = k * 0.45, r = 6 + nube * 16; R.pset(Math.round(160 + Math.cos(a) * r * 1.6), Math.round(132 - Math.abs(Math.sin(a)) * r * 0.5), mez(hex('#c8b898'), hex('#2a6a9a'), nube)); }
  T.fondoDelante(R, t, o);
};
// 3 · las ruedas por dentro (golpe) y la lima
const p3 = (t) => {
  const o = { encuadre: 'caja', camara: 'dentro', giro: (t - P3) * 0.22 + 0.3 };
  T.maquina(R, t, o);
  const u = ease(tramo(t, A(14.15), A(14.6))) - ease(tramo(t, B(17.0), B(17.5)));
  if (u > 0) {
    const lima = t > A(14.6) && t < B(16.9) ? Math.round(Math.sin(t * 13) * 3) : 0, wx = Math.round(lerp(340, 288, u)) + lima, wy = 78 + Math.round(lima * 0.3);
    // la lima: hoja de acero rayada que va de la mano al diente de la ruedecita m
    R.linea(wx - 8, wy, wx - 22, wy - 4, K); R.linea(wx - 8, wy + 1, wx - 22, wy - 3, hex('#8a8e98')); R.linea(wx - 8, wy + 2, wx - 22, wy - 2, K);
    for (let k = 0; k < 6; k++) R.pset(wx - 10 - k * 2, wy - 1 - Math.round(k * 0.6), hex('#c8ccd4'));
    T.brazo(R, 332, 104, wx, wy, '#8a5a34', -1, { codo: [314, 96] });
    if (lima) for (let k = 0; k < 3; k++) { const f = (t * 3 + k / 3) % 1; R.pset(Math.round(wx - 23 - f * 6 + k), Math.round(wy - 2 + f * 14), hex('#f0c868')); }
  }
  T.maquinaDelante(R, t, o);
};
// 4 · el mecanismo entero de frente
const p4 = (t) => {
  const o = { encuadre: 'caja', giro: (t - P4) * 0.3 + 1.2, fecha: true };
  T.maquina(R, t, o);
  const u = tramo(t, B(17.7), B(18.9)), xa = Math.round(lerp(-18, 44, ease(u)));
  R.actor(EL.hiparcoAK, 18, 160, t, { dir: 1, habla: t > B(19.2) && t < B(20.5) && Math.sin(t * 7) > 0, sonrisa: t > B(21.0) });
  R.actor(EL.artesanoAK, xa, 160, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > B(19.1), sonrisa: t > B(20.8) });
  T.maquinaDelante(R, t, o);
  // el destello en la esfera cuando dice «computer»
  const d = tramo(t, B(21.1), B(21.7)); if (d > 0 && d < 1) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, r = 46 + d * 10; R.pset(Math.round(194 + Math.cos(a) * r), Math.round(84 + Math.sin(a) * r), hex('#f0c868')); }
};
// 5 · la cubierta del caíque de día: el buzo que sube asustado
const p5 = (t) => {
  const o = { encuadre: 'cala', camara: 'cubierta', luz: 'dia', bomba: 1 };
  const g = T.mar(R, t, o);
  const sube = ease(tramo(t, B(23.5), B(24.3))), salta = tramo(t, B(24.35), B(24.85));
  if (salta === 0) detras([[244, 101, 296, 140]], () => R.actor(EL.stadiatisAK, 262, Math.round(lerp(132, 101, sube)), t, { dir: -1, quieto: sube === 0 }));
  else { const x = Math.round(lerp(262, 236, salta)), y = Math.round(lerp(101, 158, salta) - Math.sin(salta * Math.PI) * 10); R.actor(EL.stadiatisAK, x, y, t, { dir: -1, salto: 0, sorpresa: true }); }
  const susp = t > B(24.85);
  R.actor(EL.kontosAK, 168, 158, t, { dir: t > B(24.6) ? 1 : -1, sorpresa: t > B(25.0), habla: t < B(24.0) && Math.sin(t * 6) > 0.4 });
  T.marDelante(R, t, o);
  if (salta > 0 || susp) susto(243, 118, tramo(t, B(24.9), B(25.3)));
};
// 6 · el escáner que entra en el museo; la investigadora cuenta dientes
const p6 = (t) => {
  const en1 = tramo(t, P6, B(29.1)) * 0.3 + tramo(t, B(29.1), B(30.5)) * 0.2 + tramo(t, B(30.5), B(31.0)) * 0.15 + tramo(t, B(31.0), B(31.7)) * 0.35;
  const o = { encuadre: 'escaner', entra: en1, escanea: en1 > 0.97 };
  T.museo(R, t, o);
  const cuenta = tramo(t, B(27.2), B(28.6));
  const aparta = tramo(t, B(30.3), B(31.0)), xi = Math.round(lerp(160, 136, aparta));
  R.actor(EL.investigadoraAK, xi, 160, t, { dir: aparta > 0 && aparta < 1 ? -1 : aparta >= 1 ? 1 : -1, anda: aparta > 0 && aparta < 1, dedo: cuenta > 0 && cuenta < 1, sonrisa: t > B(28.6) && t < B(29.6), sorpresa: t > B(29.9) && t < B(30.3) });
  R.actor(EL.investigadorAK, 106, 160, t, { dir: -1, brazos: t > B(29.6) && t < B(30.6), dedo: t > B(30.6) && t < B(31.2), sonrisa: t > B(31.1), habla: t < B(29.6) && Math.sin(t * 6) > 0.4 });
  T.museoDelante(R, t, o);
  if (cuenta > 0 && t < B(29.3)) { bocadillo(178, 114, 40, 16, 170, 130); { const gx = 165, gy = 114, a0 = t * 3; for (let k = 0; k < 10; k++) { const a = a0 + k / 10 * Math.PI * 2; R.disco(Math.round(gx + Math.cos(a) * 5), Math.round(gy + Math.sin(a) * 5), 1, K); } R.disco(gx, gy, 5, K); R.disco(gx, gy, 4, hex('#c8963a')); R.disco(gx, gy, 1, K); R.pset(gx - 2, gy - 2, hex('#f0c868')); } R.numero(String(Math.round(cuenta * 223)), 184, 118, { centro: true }); }
};
// 7 · Olimpia: la carrera
const p7 = (t) => {
  const o = { encuadre: 'olimpia', carrera: tramo(t, B(32.0), B(33.6) + 2) };
  T.antigua(R, t, o);
  const sal = Math.sin(t * 9) > 0;
  // dos atletas de cerca que cruzan la pista corriendo (por delante de la tribuna, detrás de los espectadores)
  for (const [k, d, y] of [[0, 0, 150], [1, 0.45, 156]]) { const u = tramo(t, B(31.9) + d, B(31.9) + d + 3.2); if (u > 0 && u < 1) R.actor(EL.atletaAK, Math.round(lerp(-20, 330, u)), y, t + k, { dir: 1, anda: true, sonrisa: k === 0 }); }
  R.actor(EL.artesanoAK, 250, 170, t, { dir: -1, brazos: t > B(32.4) && sal, sonrisa: true });
  R.actor(EL.atletaAK, 268, 171, t, { dir: -1, salto: t > B(32.4) && sal ? 2 : 0, sonrisa: true, dedo: t < B(32.4) });
  T.antiguaDelante(R, t, o);
};
const efectos = [[A(4.75), 'brillo'], [P2 + 0.2, 'burbujas'], [A(8.05), 'golpecito'], [A(12.6), 'brillo'],
  [P3 + 0.05, 'maquina'], [A(14.6), 'lapiz'], [B(19.3), 'tic'], [B(21.1), 'brillo'],
  [P5 + 0.1, 'ola'], [B(24.4), 'chof'], [B(24.95), 'boing'],
  [P6 + 0.3, 'carro'], [B(27.3), 'tecleo'], [B(30.1), 'golpecito'],
  [P7 + 0.2, 'publico'], [B(32.1), 'whoosh']];
const año = (t) => (t < P2 ? null : t < P3 ? 1901 : t < P5 ? null : t < P6 ? 1900 : t < P7 ? 2005 : null);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3, 'corte'], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['ak-hola'] = ('Hola', '''// AK-HOLA (frase 3), hoy (2026), sin cartela. Un plano: el estudio de Atom con su mecanismo de cartón. En «I'm Atom» el
// guante de Atom sale de su esquina y saluda; en «explain» baja a la manivela de lápiz y la gira (las ruedas de cartón
// giran); en «Let's find out» el mecanismo se atasca, tiembla y la rueda mediana salta y sale rodando por la alfombra;
// el guante se aparta sorprendido y sale un «?». Detrás: la ventana al Egeo con el velero, el reloj, las cortinas.''', COMUN + r'''
const H = (s) => en('hola', (s - 0.5) / 4.115);
const SALUDA = H(0.5), BAJA = [H(1.2), H(1.62)], GIRA = [H(1.65), H(3.5)], ATASCO = [H(3.5), H(5.3)];
const p1 = (t) => {
  const g = tramo(t, GIRA[0], GIRA[1]), a = tramo(t, ATASCO[0], ATASCO[1]);
  const o = { encuadre: 'estudio', gira: g, atasco: a };
  const geo = T.hoy(R, t, o);
  T.hoyDelante(R, t, o);
  const [mx, my] = geo.manivela ?? [182, 117];
  let hx, hy;
  if (t < BAJA[0]) { const s = ease(tramo(t, SALUDA - 0.2, SALUDA + 0.25)); hx = lerp(297, 262, s) + (t > SALUDA ? Math.round(Math.sin(t * 16) * 3) : 0); hy = lerp(26, 44, s); }
  else if (t < GIRA[0]) { const f = ease(tramo(t, BAJA[0], BAJA[1])); hx = lerp(262, mx + 6, f); hy = lerp(44, my, f); }
  else if (a < 0.3) { hx = mx + 6 + (a > 0 ? Math.round(Math.sin(t * 40) * 1) : 0); hy = my; }
  else { const f = ease(tramo(t, H(3.95), H(4.5))); hx = lerp(mx + 6, 250, f); hy = lerp(my, 70, f); }
  if (t > SALUDA - 0.2) T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true });
  const q = tramo(t, H(4.4), H(4.7)); if (q > 0) { const y = Math.round(lerp(64, 56, q)), x = 236; R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.icono('?', x - 2, y - 4, hex('#3a6ac8'), BL, 1); }
};
const efectos = [[SALUDA, 'pop'], [GIRA[0] + 0.05, 'tic'], [H(2.6), 'tic'], [ATASCO[0] + 0.05, 'golpecito'], [H(4.0), 'boing']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')

# piezas de pintar de los fondos locales de ak-buzos (cielo y agua tramados, nubes de tres tonos, gaviotas, ánforas)
PINTA = r'''
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tram = (x, y, v) => v * 16 > BAY[(y & 3) * 4 + (x & 3)] + 0.5;
// degradado vertical tramado entre una lista de colores (hex), de y0 a y1, con un ruido suave
const degradado = (x0, x1, y0, y1, cols, ruido = 0.25, k = 0) => {
  const C = cols.map(hex), n = C.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const v = Math.max(0, Math.min(n - 0.001, (y - y0) / Math.max(1, y1 - y0) * n + (hh(x >> 3, y >> 2, k) - 0.5) * ruido)), i = Math.floor(v);
    R.pset(x, y, tram(x, y, v - i) ? C[i + 1] : C[i]);
  }
};
// nube de tres tonos (sombra, cuerpo, luz)
const nube = (x, y, w, tonos) => { const [s, m, l] = tonos.map(hex); x = Math.round(x);
  const bolas = [[0, 0, 0.5], [-0.28, 0.12, 0.34], [0.3, 0.1, 0.36], [-0.1, -0.2, 0.38], [0.16, -0.14, 0.3]];
  for (const [dx, dy, r] of bolas) R.disco(x + Math.round(dx * w), y + Math.round(dy * w * 0.5) + 2, Math.round(r * w * 0.5), s);
  for (const [dx, dy, r] of bolas) R.disco(x + Math.round(dx * w), y + Math.round(dy * w * 0.5), Math.round(r * w * 0.5) - 1, m);
  for (const [dx, dy, r] of bolas.slice(3)) R.disco(x + Math.round(dx * w) - 1, y + Math.round(dy * w * 0.5) - 2, Math.max(1, Math.round(r * w * 0.5) - 3), l);
  R.rect(x - Math.round(w * 0.42), y + Math.round(w * 0.12), x + Math.round(w * 0.42), y + Math.round(w * 0.12) + 1, s); };
const gaviota = (x, y, t, k = 0) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 9 + k) > 0, c = hex('#f6f6f2'), d = hex('#5a5a66');
  R.pset(x, y, c); R.pset(x + 1, y, c); if (a) { R.linea(x - 1, y - 1, x - 4, y - 3, d); R.linea(x + 2, y - 1, x + 5, y - 3, d); } else { R.linea(x - 1, y, x - 4, y + 1, d); R.linea(x + 2, y, x + 5, y + 1, d); } };
// tiñe un rectángulo hacia un color (a 0–1)
const tine = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// un ánfora (h de alto) inclinada ang, de barro (cS, cM, cL) con incrustaciones
const anfora = (x, y, h, ang, cM = '#a8643a', cS = '#6a3a22', cL = '#d08a5a', costra = 0.3) => {
  const ca = Math.cos(ang), sa = Math.sin(ang), P = (u, v) => [Math.round(x + u * ca - v * sa), Math.round(y + u * sa + v * ca)];
  for (let v = -h * 0.5; v <= h * 0.5; v++) { const f = (v + h * 0.5) / h, w = f < 0.18 ? h * 0.08 : f < 0.3 ? h * 0.08 + (f - 0.18) * h * 1.4 : f < 0.85 ? h * 0.25 * Math.sin((f - 0.12) / 0.8 * Math.PI) + 1 : Math.max(1, h * 0.12 * (1 - f) / 0.15);
    for (let u = -w; u <= w; u++) { const [px, py] = P(u, v); R.pset(px, py, u < -w * 0.4 ? hex(cL) : u > w * 0.5 ? hex(cS) : hh(px, py, 9) < costra * 0.4 ? hex('#8a9a7a') : hex(cM)); }
    const [a1, b1] = P(-w - 1, v), [a2, b2] = P(w + 1, v); R.pset(a1, b1, K); R.pset(a2, b2, K); }
  for (const s of [-1, 1]) { const [a, b] = P(s * h * 0.1, -h * 0.4), [c, d] = P(s * h * 0.22, -h * 0.22); R.linea(a, b, c, d, hex(cS)); }
};
'''

E['ak-buzos'] = ('Los buzos', '''// AK-BUZOS (frases 4–5), primavera de 1900, cartela «1900». Ocho planos:
// 1. (fondo local) el mar abierto de primavera: el caíque de Simi navega a vela, con las esponjas colgadas a secar; los
//    marineros faenan (uno escurre una esponja); un vapor lejano humea en el horizonte y una gaviota se lanza al agua;
// 2. corte en «a boat»: la cala de Anticitera en la tormenta; el caíque entra a refugiarse y fondea; el capitán señala la
//    cala; en «when» cae el primer rayo;
// 3. corte en «a storm»: el mapa: la ruta del caíque desde el norte de África, la nube de tormenta («storm») y el desvío
//    hasta Anticitera («Antikythera», chincheta); un aro en Creta («Crete») y otro en el Peloponeso («mainland Greece»);
// 4. corte en «While they waited»: la cubierta con lluvia; la bomba gira; Stadiatis, con la escafandra, cruza la cubierta
//    («Elias Stadiatis»), sube a la escalerilla y baja por la borda («went down»); el capitán le hace la señal;
// 5. (fondo local) la escalerilla de cerca desde el agua: un hervidero de burbujas, la escafandra sale disparada («came back
//    up») y sube a toda prisa; el capitán se asoma por la borda; en «He swore» el buzo agita los brazos «!»;
// 6. corte en «people»: el fondo del naufragio en la penumbra con las siluetas («people and horses lying on the seabed»);
//    Stadiatis retrocede asustado; la sonda marca «50» («fifty meters down»);
// 7. (fondo local) corte en «The captain»: la columna de agua con rayos; el capitán, con escafandra, baja por el cabo
//    («dove in to check»); peces, la manguera de aire; abajo asoman formas («They weren't people»);
// 8. (fondo local) corte en «they were statues»: el rayo de luz descubre las estatuas: una de bronce en su pedestal con el
//    brazo en alto, un mármol tumbado, un caballo de bronce, ánforas y las cuadernas del barco hundido; el agua hace que
//    el brazo parezca saludar y el capitán le devuelve el saludo (gag 2).''', COMUN + PINTA + r'''
const A = (s) => en('tormenta', (s - 1.5) / 18.698), G = (s) => en('gente', (s - 21.342) / 15.406);
const P2 = A(5.16), P3 = A(10.02), P4 = A(16.3), P5 = A(20.35), P6 = G(23.98), P7 = G(28.0), P8 = G(31.98);
const KONTOS_BUZO = { ...EL.buzoAK, cab: EL.kontosAK.cab, ceja: EL.kontosAK.ceja, pal: { ...EL.buzoAK.pal, H: hex('#1c1424'), h: hex('#3a3046') } };

// 1 · el mar abierto de primavera (fondo local)
const p1 = (t) => {
  capa('abierto', () => {
    degradado(0, 319, 0, 95, ['#4a8ad0', '#6aa6e0', '#9ac8ee', '#cfe6f6'], 0.3, 1);
    // la costa de África que se queda atrás: colinas bajas y arenosas con bruma
    for (let x = 0; x < 150; x++) { const hgt = 4 + Math.round(5 * Math.sin(x * 0.05) + 3 * Math.sin(x * 0.13 + 1) - x * 0.03); for (let y = 95 - Math.max(1, hgt); y <= 95; y++) R.pset(x, y, tram(x, y, 0.5) ? hex('#d8c8a8') : hex('#c8b898')); R.pset(x, 95 - Math.max(1, hgt), hex('#e8dcc0')); }
    for (let x = 6; x < 120; x += 9) if (hh(x, 1) > 0.5) { R.rect(x, 91 - Math.round(hh(x, 2) * 3), x + 1, 92, hex('#a89878')); R.pset(x, 89 - Math.round(hh(x, 2) * 3), hex('#7a8a5a')); }
    degradado(0, 319, 96, 179, ['#5a9ac8', '#3a7ab0', '#2a6a9a', '#1e5280'], 0.35, 2);
    // la trama del mar: rayitas claras y oscuras, más juntas hacia el horizonte
    for (let k = 0; k < 900; k++) { const y = 97 + Math.floor(Math.pow(hh(k, 3), 1.6) * 82), x = Math.floor(hh(k, 4) * 320), w = 2 + Math.floor((y - 96) / 14);
      R.rect(x, y, x + w, y, hh(k, 5) < 0.55 ? hex('#1a4a72') : hex('#7ab8e0')); }
  });
  // el sol y su reguero en el agua
  R.disco(236, 58, 10, hex('#f6eac0')); R.disco(236, 58, 7, hex('#fff8dc'));
  for (let k = 0; k < 40; k++) { const y = 98 + Math.floor(hh(k, 7) * 60), x = 236 + Math.round((hh(k, 8) - 0.5) * (8 + (y - 96) * 0.5)); if (Math.sin(t * 6 + k * 1.7) > 0.2) R.rect(x, y, x + 2, y, hex('#fff8dc')); }
  // nubes de tres tonos a tres velocidades (lejos de Atom y del año)
  const TN = ['#a8c0d8', '#e8f0f8', '#ffffff'];
  for (const [x0, y, w, v] of [[30, 40, 46, 1.2], [150, 46, 60, 2.2], [80, 64, 34, 3.4], [210, 70, 40, 3.4], [-60, 54, 52, 2.2]]) { const x = ((x0 + t * v) % 330) - 10; if (!(x > 230 && y < 50)) nube(x, y, w, TN); }
  for (let k = 0; k < 3; k++) gaviota((60 + k * 50 + t * (8 + k * 3)) % 300, 40 + k * 9 + Math.sin(t + k) * 2, t, k);
  // el caíque: navega despacio hacia la derecha y cabecea
  const u = tramo(t, 0, P2), x0 = Math.round(lerp(26, 70, u)), dy = Math.round(Math.sin(t * 1.7) * 1.4), wl = 141 + dy;
  // la estela
  for (let k = 0; k < 18; k++) { const x = x0 - 6 - k * 5 - Math.round((t * 12) % 5), y = wl + Math.round(Math.sin(k * 1.3 + t * 3)); R.rect(x, y, x + 3, y, k % 2 ? hex('#cfe6f6') : BL); }
  // el palo y la vela (la tela tiembla con el viento)
  const mx = x0 + 64, hinch = Math.sin(t * 3) * 1.5;
  R.rect(mx, 58 + dy, mx + 2, 128 + dy, hex('#5e3c22')); R.rect(mx, 58 + dy, mx, 128 + dy, hex('#8a5a34'));
  R.poligono([[mx + 3, 62 + dy], [mx + 50 + hinch, 118 + dy], [mx + 3, 120 + dy]], K);
  R.poligono([[mx + 4, 65 + dy], [mx + 47 + hinch, 117 + dy], [mx + 4, 118 + dy]], hex('#f2e8d0'));
  for (let k = 1; k < 5; k++) R.linea(mx + 4, 65 + dy + k * 11, mx + 4 + Math.round((43 + hinch) * k * 11 / 52), 65 + dy + k * 11, hex('#d8c8a8'));
  R.poligono([[mx - 2, 70 + dy], [mx - 30, 118 + dy], [mx - 2, 118 + dy]], K); R.poligono([[mx - 3, 73 + dy], [mx - 27, 117 + dy], [mx - 3, 117 + dy]], hex('#e8dcc0'));
  R.linea(mx + 1, 58 + dy, x0 + 2, 124 + dy, hex('#3a2a1c')); R.linea(mx + 1, 58 + dy, x0 + 112, 126 + dy, hex('#3a2a1c'));
  // las esponjas colgadas a secar en el cabo de popa (se mecen)
  for (let k = 0; k < 6; k++) { const ex = x0 + 8 + k * 7, ey = 104 + dy + Math.round((ex - x0) * 0.3) - 8 + Math.round(Math.sin(t * 3 + k) * 1); R.disco(ex, ey + 4, 3, hex('#8a6a3a')); R.disco(ex - 1, ey + 3, 2, hex('#c8a060')); R.pset(ex, ey + 5, hex('#5e4424')); R.linea(ex, ey, ex, ey + 1, hex('#3a2a1c')); }
  // los marineros en cubierta: uno tira de la escota, el otro limpia una esponja
  R.actor(EL.bomberoAK, x0 + 14, 128 + dy, t, { dir: 1, dedo: Math.sin(t * 3) > 0 });
  { const m = R.actor(EL.stadiatisCubiertaAK, x0 + 82, 128 + dy, t, { dir: -1, sostiene: true, sonrisa: true }).mano, sq = Math.round(Math.sin(t * 6)); R.disco(m[0], m[1] + sq, 3, K); R.disco(m[0], m[1] + sq, 2, hex('#c8a060')); R.pset(m[0] - 1, m[1] - 1 + sq, hex('#e8c880')); R.pset(m[0] + 1, m[1] + 1 + sq, hex('#8a6a3a')); if (sq > 0) R.pset(m[0], m[1] + 4, hex('#a8d8f0')); }
  // el casco del caíque: madera con la traca blanca y azul, roda y codaste altos y curvos, tablas, clavos y la regala
  const casco = [[x0 - 10, 112 + dy], [x0 - 4, 122 + dy], [x0 + 14, wl], [x0 + 104, wl], [x0 + 122, 121 + dy], [x0 + 130, 108 + dy], [x0 + 126, 108 + dy], [x0 + 116, 123 + dy], [x0 + 2, 125 + dy], [x0 - 6, 112 + dy]];
  R.poligono(casco.map(([a, b], i) => [a + (i < 2 || i > 7 ? -1 : 0), b + (b === wl ? 1 : 0)]), K);
  R.poligono([[x0 - 4, 122 + dy], [x0 + 116, 123 + dy], [x0 + 104, wl], [x0 + 14, wl]], hex('#8a5a34'));
  for (let y = 126; y < wl; y += 3) R.linea(x0 + Math.round((y - 122) * 0.9), y + (y > 0 ? 0 : 0) + dy * 0, x0 + 114 - Math.round((y - 122) * 0.6), y, hex('#5e3c22'));
  R.poligono([[x0 - 6, 112 + dy], [x0 - 2, 112 + dy], [x0 + 2, 122 + dy], [x0 - 3, 122 + dy]], hex('#b07a48'));
  R.poligono([[x0 + 126, 108 + dy], [x0 + 129, 108 + dy], [x0 + 121, 121 + dy], [x0 + 117, 121 + dy]], hex('#b07a48'));
  R.linea(x0 - 3, 122 + dy, x0 + 117, 122 + dy, hex('#eeeae0')); R.linea(x0 - 2, 123 + dy, x0 + 116, 123 + dy, hex('#eeeae0'));
  R.linea(x0 - 1, 124 + dy, x0 + 115, 124 + dy, hex('#2a6aa8')); R.linea(x0, 125 + dy, x0 + 114, 125 + dy, hex('#2a6aa8'));
  R.linea(x0 + 2, 127 + dy, x0 + 112, 127 + dy, hex('#3a8a4a'));
  for (let k = 0; k < 16; k++) R.pset(x0 + 6 + k * 7, 130 + dy, hex('#3a2a1c'));
  R.linea(x0 + 14, wl - 1, x0 + 104, wl - 1, hex('#8a2a2a'));
  R.disco(x0 - 7, 111 + dy, 1, hex('#c8963a')); R.disco(x0 + 128, 107 + dy, 1, hex('#c8963a'));
  // la espuma de la proa
  for (let k = 0; k < 6; k++) R.pset(x0 + 112 + k, wl - 1 - (k % 3) + Math.round(Math.sin(t * 8 + k)), BL);
  // un vapor lejano en el horizonte, con su humo, y una gaviota que se lanza al agua y sale con un pez
  { const vx = Math.round(300 - (t - 1.3) * 3), vy = 94; R.rect(vx - 8, vy - 2, vx + 8, vy, hex('#3a3a4a')); R.rect(vx - 3, vy - 5, vx + 3, vy - 3, hex('#eeeae0')); R.rect(vx, vy - 9, vx + 1, vy - 5, hex('#8a2a2a'));
    for (let k = 0; k < 6; k++) R.disco(vx - 2 - k * 4 - Math.round(t % 1), vy - 11 - Math.round(k * 0.6), 1 + (k > 2 ? 1 : 0), hex('#9aa4b0')); }
  { const f = tramo(t, A(2.6), A(4.4)), x = Math.round(lerp(150, 230, f)), y = Math.round(150 - Math.sin(f * Math.PI) * -1 * 0 - (f < 0.45 ? lerp(90, 0, f / 0.45) : f < 0.55 ? 0 : lerp(0, 80, (f - 0.55) / 0.45)));
    if (f > 0 && f < 1) { if (f < 0.45 || f > 0.55) gaviota(x, y, t * (f < 0.45 ? 0.3 : 1), 4); if (f > 0.4 && f < 0.7) for (let k = 0; k < 7; k++) R.pset(190 + (k - 3) * 2, 150 - Math.round(Math.sin(k / 6 * Math.PI) * 5 * (1 - Math.abs(f - 0.5) * 3)), BL); if (f > 0.55) { R.rect(x - 1, y + 1, x + 2, y + 2, hex('#c8d0d8')); } } }
  // las olas de cerca, que corren
  for (let k = 0; k < 14; k++) { const x = ((k * 53 - t * 14) % 360 + 360) % 360 - 20, y = 166 + (k * 7) % 12; R.rect(x, y, x + 8, y, hex('#9ad0f0')); R.rect(x + 2, y - 1, x + 6, y - 1, BL); R.rect(x - 2, y + 1, x + 10, y + 1, hex('#1a4a72')); }
};

// 2 · la cala en la tormenta: el caíque entra y fondea
const p2 = (t) => {
  const o = { encuadre: 'cala', tormenta: lerp(0.65, 1, tramo(t, P2, A(9.4))), entra: ease(tramo(t, P2, A(9.6))) };
  const g = T.mar(R, t, o), dx = g.dx ?? 0, s = g.suelo;
  R.actor(EL.kontosAK, 150 + dx, s, t, { dir: -1, dedo: t > A(7.0), habla: t < A(7.0) && Math.sin(t * 6) > 0.3 });
  R.actor(EL.stadiatisCubiertaAK, 196 + dx, s, t, { dir: 1, sorpresa: t > A(9.45) });
  T.marDelante(R, t, o);
};

// 3 · el mapa: la ruta, la tormenta y Anticitera
const p3 = (t) => {
  const o = { encuadre: 'olimpia', camara: 'mapa', marca: t > A(11.7) ? 'anticitera' : undefined };
  T.antigua(R, t, o);
  R.recorte([12, 9, 307, 170]);
  const ruta = [[150, 146], [160, 132], [168, 122], [176, 114]], desvio = [[176, 114], [170, 108], [174, 99]];
  const u1 = tramo(t, P3 - 0.2, A(10.6)), u2 = tramo(t, A(11.0), A(11.75));
  const rojo = hex('#a83a2a');
  const traza = (pts, u) => { let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; } let q = L * u, last = pts[0];
    for (let i = 1; i < pts.length && q > 0; i++) { const f = Math.min(1, q / seg[i - 1]); const b = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
      const n = Math.ceil(seg[i - 1] * f); for (let j = 0; j <= n; j++) { if (((j + i * 3) >> 1) % 2) continue; const x = Math.round(lerp(pts[i - 1][0], b[0], j / Math.max(1, n))), y = Math.round(lerp(pts[i - 1][1], b[1], j / Math.max(1, n))); R.pset(x, y, rojo); R.pset(x, y + 1, rojo); }
      q -= seg[i - 1]; last = b; } return last; };
  // la línea discontinua que llevaba a casa (a Simi), que la tormenta corta
  const casa = tramo(t, P3 - 0.5, P3 + 0.4); if (casa > 0) for (let j = 0; j < 50 * casa; j += 3) { const x = Math.round(lerp(176, 221, j / 50)), y = Math.round(lerp(114, 89, j / 50)); R.pset(x, y, hex('#5a4a3a')); R.pset(x + 1, y, hex('#5a4a3a')); }
  R.disco(221, 89, 2, K); R.disco(221, 89, 1, hex('#e8c060'));
  let [bx, by] = traza(ruta, u1); if (u2 > 0) [bx, by] = traza(desvio, u2);
  // la nube de tormenta sobre la ruta, con su lluvia y un rayo
  const nb = tramo(t, A(10.1), A(10.6));
  if (nb > 0) { const cx = 204, cy = Math.round(lerp(116, 124, nb)); for (let k = 0; k < 9; k++) { const x = cx - 10 + ((k * 5 + Math.round(t * 20)) % 22), y = cy + 6 + ((k * 3 + Math.round(t * 30)) % 10); R.linea(x, y, x - 1, y + 3, hex('#5a6a8a')); }
    R.disco(cx - 6, cy + 2, 6, hex('#2a2a3a')); R.disco(cx + 5, cy + 1, 7, hex('#2a2a3a')); R.disco(cx, cy - 3, 6, hex('#3a3a4a')); R.disco(cx - 6, cy + 1, 5, hex('#4a4a5e')); R.disco(cx + 5, cy, 6, hex('#4a4a5e')); R.disco(cx, cy - 4, 5, hex('#6a6a7e'));
    if (Math.sin(t * 5) > 0.6) { R.linea(cx + 2, cy + 6, cx - 1, cy + 11, hex('#f6e04a')); R.linea(cx - 1, cy + 11, cx + 2, cy + 11, hex('#f6e04a')); R.linea(cx + 2, cy + 11, cx - 2, cy + 17, hex('#f6e04a')); } }
  // el barquito
  const bb = Math.round(Math.sin(t * 4)); R.rect(bx - 4, by + bb, bx + 4, by + 2 + bb, K); R.rect(bx - 3, by + bb, bx + 3, by + 1 + bb, BL); R.linea(bx, by - 6 + bb, bx, by + bb, K); R.poligono([[bx + 1, by - 6 + bb], [bx + 5, by - 1 + bb], [bx + 1, by - 1 + bb]], hex('#f2e8d0'));
  // los aros de Creta y de la Grecia continental
  const aro = (cx, cy, rx, ry, u, c) => { if (u <= 0) return; const p = Math.min(1, u * 1.4), w = Math.sin(t * 6) > 0 ? 1 : 0; for (let k = 0; k < 64 * p; k++) { const a = k / 64 * Math.PI * 2 - Math.PI / 2; R.pset(Math.round(cx + Math.cos(a) * (rx + w)), Math.round(cy + Math.sin(a) * (ry + w)), c); R.pset(Math.round(cx + Math.cos(a) * (rx + w + 1)), Math.round(cy + Math.sin(a) * (ry + w)), c); } };
  aro(191, 104, 19, 7, tramo(t, A(14.05), A(14.5)), hex('#2a6aa8'));
  aro(166, 80, 16, 13, tramo(t, A(14.85), A(15.3)), hex('#3a8a4a'));
  R.recorte(null);
  T.antiguaDelante(R, t, o);
};

// 4 · la cubierta con lluvia: Stadiatis se pone en marcha y baja por la escalerilla
const p4 = (t) => {
  const o = { encuadre: 'cala', camara: 'cubierta', tormenta: 0.45, bomba: 1 };
  T.mar(R, t, o);
  const anda = tramo(t, A(17.6), A(18.7)), sube = ease(tramo(t, A(18.75), A(19.2))), baja = ease(tramo(t, A(19.3), A(20.1)));
  R.actor(EL.kontosAK, 186, 158, t, { dir: 1, dedo: t > A(18.4) && t < A(19.6), habla: t < A(18.4) && Math.sin(t * 6) > 0.4, sonrisa: t > A(19.6) });
  if (sube === 0) R.actor(EL.stadiatisAK, Math.round(lerp(212, 246, anda)), 158, t, { dir: 1, anda: anda > 0 && anda < 1 });
  else if (baja === 0) { const x = Math.round(lerp(246, 262, sube)), y = Math.round(lerp(158, 101, sube) - Math.sin(sube * Math.PI) * 6); R.actor(EL.stadiatisAK, x, y, t, { dir: -1, salto: 0 }); }
  else detras([[244, 101, 296, 140]], () => R.actor(EL.stadiatisAK, 262, Math.round(lerp(101, 134, baja)), t, { dir: -1, quieto: true }));
  T.marDelante(R, t, o);
  // el chapoteo al otro lado de la borda
  const ch = tramo(t, A(19.95), A(20.3)); if (ch > 0 && ch < 1) for (let k = 0; k < 9; k++) { const a = Math.PI * (0.15 + k / 8 * 0.7); R.pset(Math.round(270 + Math.cos(a) * 12 * ch), Math.round(100 - Math.sin(a) * 14 * ch), BL); }
};

// 5 · la escalerilla de cerca, desde el agua (fondo local): el buzo sube asustado
const TOPE5 = [];
const p5 = (t) => {
  const WL = 118, TOPE = TOPE5;
  capa('escala', () => {
    degradado(0, 319, 0, 90, ['#6a7a8c', '#8a98a8', '#a8b4c0', '#c0c8d0'], 0.35, 4);
    // el acantilado de Anticitera, calizo, con estratos y matas
    for (let x = 196; x < 320; x++) { const top = 58 + Math.round(8 * Math.sin(x * 0.04) + 3 * Math.sin(x * 0.17)) - Math.round((x - 196) * 0.06); for (let y = top; y < 96; y++) { const st = ((y + Math.round(Math.sin(x * 0.1) * 2)) % 7) < 1; R.pset(x, y, st ? hex('#7a6a54') : tram(x, y, hh(x >> 2, y >> 1, 6) * 0.8) ? hex('#a89878') : hex('#8a7a62')); } R.pset(x, top, hex('#c8b898')); if (hh(x, 7) > 0.8) { R.pset(x, top - 1, hex('#5a6a3a')); R.pset(x + 1, top - 1, hex('#4a5a2a')); } }
    // la capillita blanca en lo alto
    R.rect(236, 50, 248, 58, K); R.rect(237, 51, 247, 58, hex('#eeeae0')); R.disco(242, 50, 4, K); R.disco(242, 50, 3, hex('#3a6aa8')); R.rect(241, 54, 243, 58, hex('#5a4a3a'));
    for (let x = 0; x < 320; x++) TOPE[x] = 92; for (let x = 196; x < 320; x++) TOPE[x] = 58 + Math.round(8 * Math.sin(x * 0.04) + 3 * Math.sin(x * 0.17)) - Math.round((x - 196) * 0.06) - 1; for (let x = 0; x <= 213; x++) TOPE[x] = 44; TOPE[242] = Math.min(TOPE[242], 46); for (let x = 236; x <= 248; x++) TOPE[x] = Math.min(TOPE[x], 46);
    degradado(0, 319, 91, 179, ['#5a8a9a', '#3a7a8a', '#2a5a6a', '#1e4250'], 0.35, 5);
    for (let k = 0; k < 500; k++) { const y = 92 + Math.floor(Math.pow(hh(k, 13), 1.4) * 87), x = Math.floor(hh(k, 14) * 320), w = 2 + Math.floor((y - 90) / 16); R.rect(x, y, x + w, y, hh(k, 15) < 0.5 ? hex('#1e4250') : hex('#8ab8c0')); }
    // el costado del caíque: tablas blancas viejas con la franja azul, las juntas con brea, clavos y chorreras de óxido
    R.poligono([[0, 46], [212, 50], [208, 100], [190, 176], [0, 176]], K);
    for (let y = 48; y < 176; y++) { const xr = Math.round(211 - (y - 48) * 0.06 - Math.max(0, y - 100) ** 2 * 0.012); for (let x = 0; x < xr; x++) { const tabla = Math.floor((y - 48) / 7), junta = (y - 48) % 7 === 0, veta = hh(x >> 3, tabla, 21) < 0.12 && (x + tabla * 5) % 9 < 6;
      let c = y < 60 ? hex('#2a6aa8') : y < 62 ? hex('#1e4a80') : hex('#e8e2d4'); if (y >= 62 && y < 100 && hh(x >> 2, y >> 2, 22) < 0.08) c = hex('#c8c0b0'); if (veta) c = mez(c, hex('#8a8070'), 0.4); if (junta) c = hex('#3a3430'); if (y > 104) c = mez(c, hex('#5a4a34'), 0.35); if (y > 110 && y < 124 && hh(x >> 1, y, 23) < 0.35) c = hex('#3a6a3a'); if (y > 120 && hh(x, y, 24) < 0.04) c = hex('#e8e2d4');
      R.pset(x, y, c); } }
    for (let k = 0; k < 30; k++) { const x = 6 + k * 7, y = 52 + (k % 2) * 3; R.pset(x, y + 10, K); R.pset(x, y + 31, K); }
    for (let k = 0; k < 6; k++) { const x = 20 + k * 31; for (let y = 64; y < 64 + 8 + (k % 3) * 6; y++) R.pset(x + (y % 3 === 0 ? 1 : 0), y, hex('#a8643a')); }
    // la regala (por encima de todo, con su luz) y las defensas de cuerda
    R.rect(0, 44, 213, 49, K); R.rect(0, 45, 212, 47, hex('#8a5a34')); R.rect(0, 45, 212, 45, hex('#b07a48'));
    for (const fx of [40, 100, 194]) { R.linea(fx, 49, fx, 58, hex('#5a4a34')); R.disco(fx, 63, 4, K); R.disco(fx, 63, 3, hex('#c8a060')); R.pset(fx - 1, 62, hex('#e8c880')); }
  });
  // las nubes de la tormenta que se va
  for (const [x0, y, w, v] of [[20, 38, 50, 1.5], [140, 30, 64, 2.5], [-40, 50, 44, 3.5], [230, 46, 40, 3.5]]) { const x = ((x0 + t * v) % 330) - 10; if (!(x > 240 && y < 50)) nube(x, y, w, ['#5a6474', '#7a8494', '#9aa4b0']); }
  { const b = CAPAS.get('escala'); for (let x = 0; x < 320; x++) for (let y = TOPE[x]; y < 92; y++) R.pset(x, y, b[y * 320 + x]); }
  gaviota((120 + t * 10) % 320, 70 + Math.sin(t) * 3, t, 2);
  // la llovizna
  for (let k = 0; k < 50; k++) { const x = (k * 37 + Math.round(t * 40)) % 320, y = (k * 23 + Math.round(t * 160)) % 180; R.pset(x, y, hex('#c8d0d8')); R.pset(x - 1, y + 1, hex('#a8b4c0')); }
  // la escalerilla: dos largueros y peldaños, que siguen bajo el agua
  const lx = 146;
  for (const x of [lx, lx + 16]) { R.rect(x, 40, x + 2, 179, K); R.rect(x + 1, 40, x + 1, 179, hex('#8a5a34')); }
  for (let y = 46; y < 180; y += 8) { R.rect(lx + 2, y, lx + 15, y + 2, K); R.rect(lx + 2, y + 1, lx + 15, y + 1, hex('#b07a48')); }
  // la manguera del aire, que sale por la borda y entra en el agua
  for (let k = 0; k <= 40; k++) { const f = k / 40, x = Math.round(lerp(132, 150, f) + Math.sin(f * 3 + t) * 3), y = Math.round(lerp(44, 150, f)); R.rect(x - 1, y, x + 1, y, K); R.pset(x, y, hex('#5a4a3a')); }
  // el capitán asomado por la borda
  const susp = t > G(21.6);
  const asoma = ease(tramo(t, G(21.5), G(22.0)));
  detras([[0, 44, 213, 80]], () => R.actor(EL.kontosAK, Math.round(lerp(96, 122, asoma)), 50, t, { dir: 1, anda: asoma > 0 && asoma < 1, sorpresa: susp && t < G(23.2), habla: t > G(23.2) && Math.sin(t * 7) > 0, dedo: t > G(22.9) && t < G(23.2) }));
  // el buzo: primero las burbujas que hierven; luego la escafandra sale disparada y sube a toda prisa
  const hierve = tramo(t, P5, G(21.4)), sal = ease(tramo(t, G(21.35), G(22.4)));
  if (hierve > 0 && sal === 0) for (let k = 0; k < 12; k++) { const f = (t * 2 + k / 12) % 1; burbuja(lx + 8 + Math.sin(k * 2 + t * 6) * (4 + hierve * 6), WL + 10 - f * 14, 1 + (k % 3)); }
  if (sal > 0) {
    const sy = Math.round(lerp(150, 100, sal));
    R.actor(EL.stadiatisAK, lx + 1, sy, t, { dir: 1, anda: sal < 1, brazos: t > G(23.2), salto: 0 });
  }
  // el agua por delante de todo lo sumergido (el casco, la escalerilla, el buzo)
  tine(0, WL + 1, 207, 179, hex('#2a5a6a'), 0.5);
  { const sp = tramo(t, G(21.35), G(22.0)); if (sp > 0 && sp < 1) for (let k = 0; k < 14; k++) { const a = Math.PI * (0.1 + k / 13 * 0.8); R.pset(Math.round(lx + 8 + Math.cos(a) * 22 * sp), Math.round(WL - Math.sin(a) * 26 * sp + sp * sp * 16), BL); R.pset(Math.round(lx + 8 + Math.cos(a) * 18 * sp), Math.round(WL - Math.sin(a) * 18 * sp + sp * sp * 12), hex('#a8d8f0')); } }
  // la línea del agua que sube y baja y las crestas de cerca
  for (let x = 0; x < 320; x++) { const y = WL + Math.round(Math.sin(x * 0.12 + t * 3) * 1.2); if (x < 206) { R.pset(x, y, hex('#a8d0d8')); if ((x + Math.round(t * 10)) % 9 < 3) R.pset(x, y + 1, BL); } }
  for (let k = 0; k < 12; k++) { const x = ((k * 61 - t * 12) % 360 + 360) % 360 - 20, y = 150 + (k * 11) % 26; R.rect(x, y, x + 7, y, hex('#8ab8c0')); R.rect(x + 1, y - 1, x + 5, y - 1, BL); }
  susto(lx + 8, 66, tramo(t, G(23.22), G(23.6)));
};

// 6 · el naufragio en la penumbra: las siluetas
const p6 = (t) => {
  const o = { siluetas: lerp(0.7, 1, tramo(t, P6, G(25.0))), luz: 0.4 };
  T.fondo(R, t, o);
  const atras = tramo(t, G(24.2), G(25.2)), sube = ease(tramo(t, G(26.6), G(27.9)));
  R.actor(EL.stadiatisAK, Math.round(lerp(62, 36, atras)), Math.round(lerp(162, 120, sube)), t, { dir: 1, sorpresa: true, anda: atras > 0 && atras < 1, brazos: sube > 0 });
  T.fondoDelante(R, t, o);
  // la sonda: un cabo con su plomo que baja y marca la profundidad
  const p = ease(tramo(t, G(25.9), G(26.6)));
  R.linea(100, 22, 100, 22 + Math.round(p * 120), hex('#c8bc98'));
  for (let k = 0; k * 10 < p * 120; k++) R.rect(98, 26 + k * 10, 102, 26 + k * 10, hex('#e8dcc0'));
  if (p > 0) { R.rect(97, 22 + Math.round(p * 120), 103, 28 + Math.round(p * 120), K); R.rect(98, 23 + Math.round(p * 120), 102, 27 + Math.round(p * 120), hex('#6a6a7a')); }
  const n = tramo(t, G(26.45), G(26.75)); if (n > 0) { bocadillo(124, 82, 34, 16, 104, 100); R.numero('50', 118, 86, { centro: true }); R.linea(134, 77, 134, 86, hex('#2a6aa8')); R.linea(132, 84, 134, 87, hex('#2a6aa8')); R.linea(136, 84, 134, 87, hex('#2a6aa8')); }
};

// 7 · la columna de agua: el capitán baja por el cabo (fondo local)
const p7 = (t) => {
  capa('columna', () => {
    degradado(0, 319, 0, 179, ['#6ab8c8', '#3a8ab0', '#2a6a9a', '#1a4a6a', '#0e2a40'], 0.4, 7);
    // la ladera de roca a la izquierda, oscura, con esponjas
    for (let y = 70; y < 180; y++) { const xr = Math.round(30 + (y - 70) * 0.55 + Math.sin(y * 0.15) * 5); for (let x = 0; x < xr; x++) R.pset(x, y, tram(x, y, hh(x >> 2, y >> 2, 8)) ? hex('#1e3442') : hex('#2a4452')); R.pset(xr, y, hex('#3a5a6a')); }
    for (let k = 0; k < 18; k++) { const y = 78 + Math.floor(hh(k, 41) * 96), x = Math.round((30 + (y - 70) * 0.55) * (0.3 + hh(k, 42) * 0.65)); R.disco(x, y, 1 + (k % 3 === 0 ? 1 : 0), hex(['#c87a3a', '#a8643a', '#c8a040', '#8a4a6a'][k % 4])); R.pset(x - 1, y - 1, hex('#f0b070')); if (k % 4 === 1) R.linea(x + 2, y, x + 2, y - 4, hex('#c8a040')); }
    // las motas de la luz en el agua (fijas) y el fondo que se adivina
    for (let k = 0; k < 160; k++) R.pset(Math.floor(hh(k, 31) * 320), Math.floor(hh(k, 32) * 180), hex('#8ac8d8'));
    for (let x = 0; x < 320; x++) { const y = 168 + Math.round(Math.sin(x * 0.05) * 3); for (let yy = y; yy < 180; yy++) R.pset(x, yy, tram(x, yy, 0.4) ? hex('#3a4a4a') : hex('#2a3a40')); }
  });
  // los rayos de luz que se mecen (por debajo del año y lejos de Atom)
  for (let k = 0; k < 4; k++) { const x0 = 40 + k * 62 + Math.sin(t * 0.7 + k) * 8; for (let y = 22; y < 170; y += 1) { const x = Math.round(x0 + (y - 22) * 0.35), w = 3 + (k % 2) * 2; if (x > 268 && y < 50) continue; for (let i = 0; i < w; i++) if ((x + i + y) % 2 === 0) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#b8e8f0'), 0.25 * (1 - y / 180))); } }
  // el casco del caíque visto desde abajo y la superficie que brilla
  for (let x = 176; x < 276; x++) { const y = 16 - Math.round(Math.pow((x - 226) / 50, 2) * 12); for (let yy = 0; yy <= y; yy++) R.pset(x, yy, yy === y ? hex('#3a2a20') : hex('#1e1814')); }
  // el cabo del ancla y la manguera
  const bajo = ease(tramo(t, P7 + 0.1, G(31.6))), kx = 206, ky = Math.round(lerp(46, 160, bajo));
  for (let y = 16; y < 180; y++) { const x = Math.round(kx + 10 + Math.sin(y * 0.05 + t) * 2); R.pset(x, y, hex('#c8bc98')); R.pset(x + 1, y, hex('#8a7a5a')); }
  for (let k = 0; k <= 50; k++) { const f = k / 50, x = Math.round(lerp(236, kx + 8, f) + Math.sin(f * 5 + t * 1.3) * 6), y = Math.round(lerp(14, ky - 22, f)); R.rect(x, y, x + 1, y, K); R.pset(x, y, hex('#4a3a2a')); }
  // un banco de peces que cruza y uno grande que pasa
  for (let k = 0; k < 14; k++) { const x = ((t * 26 + k * 9 + (k % 3) * 4) % 380) - 40, y = 92 + Math.round(Math.sin(k * 1.7) * 10 + Math.sin(t * 2 + k) * 2); R.rect(x, y, x + 3, y + 1, hex('#c8d8e0')); R.pset(x - 1, y, hex('#8aa0b0')); R.pset(x + 3, y, K); }
  { const x = Math.round(330 - (t - P7) * 30), y = 132; R.disco(x, y, 5, K); R.disco(x, y, 4, hex('#6a5a4a')); R.rect(x + 4, y - 3, x + 8, y + 3, hex('#5a4a3a')); R.pset(x - 3, y - 1, BL); }
  // las formas que asoman abajo (estatuas aún sin luz)
  const asoma = tramo(t, G(30.6), G(31.9)); if (asoma > 0) { const sombra = (x, y, s) => { const c = mez(hex('#1a4a6a'), hex('#0a1a24'), asoma); R.disco(x, y - 30 * s, Math.round(4 * s), c); R.poligono([[x - 6 * s, y - 25 * s], [x + 6 * s, y - 25 * s], [x + 4 * s, y], [x - 4 * s, y]], c); R.linea(x - 5 * s, y - 24 * s, x - 9 * s, y - 40 * s, c); R.linea(x - 6 * s, y - 24 * s, x - 10 * s, y - 40 * s, c); }; sombra(120, 170, 0.8); sombra(250, 172, 1); }
  R.actor(KONTOS_BUZO, kx, ky, t, { dir: 1, anda: bajo > 0 && bajo < 1, sostiene: [kx + 16, ky - 14], sorpresa: t > G(31.0) });
  chorro(kx + 8, ky - 22, -2, t, 8, 3);
};

// 8 · las estatuas: la luz las descubre; la de bronce parece saludar (fondo local)
const p8 = (t) => {
  capa('estatuas', () => {
    degradado(0, 319, 0, 135, ['#3a8ab0', '#2a6a9a', '#1e5276', '#16405e'], 0.4, 9);
    // la arena con ondas, conchas y piedras
    degradado(0, 319, 128, 179, ['#a89878', '#c8b898', '#d8c8a8'], 0.4, 10);
    for (let k = 0; k < 40; k++) { const y = 132 + k * 1.2 + (k % 3) * 4; for (let x = 0; x < 320; x++) if (Math.sin(x * 0.18 + k) > 0.85 && hh(x >> 3, k, 11) > 0.3) R.pset(x, Math.round(y + Math.sin(x * 0.07 + k) * 1.5), hex('#8a7a5a')); }
    for (let k = 0; k < 24; k++) { const x = Math.floor(hh(k, 12) * 320), y = 140 + Math.floor(hh(k, 13) * 38); R.disco(x, y, 1, hex(k % 3 ? '#eeeae0' : '#c87a5a')); }
    // las cuadernas del barco hundido, a la izquierda, con tablas rotas
    for (let k = 0; k < 6; k++) { const x0 = 16 + k * 20; for (let a = 0; a <= 20; a++) { const f = a / 20, x = Math.round(x0 + Math.sin(f * 1.4) * 14), y = Math.round(140 - f * (46 - k * 3)); R.rect(x, y, x + 2, y, hex('#3a2a1c')); R.pset(x, y, hex('#5e4430')); } }
    for (let k = 0; k < 4; k++) { const y = 118 + k * 6; R.linea(14, y, 120 - k * 8, y + 2, hex('#4a3424')); R.linea(14, y + 1, 120 - k * 8, y + 3, hex('#2a1e14')); }
    // ánforas esparcidas
    anfora(60, 150, 26, 1.3); anfora(98, 158, 22, -1.2, '#b8744a'); anfora(286, 152, 28, 0.25); anfora(304, 160, 18, 1.5, '#9a5a34'); anfora(140, 132, 18, 0.1, '#a86a40');
    // un caballo de bronce caído de costado, con las patas dobladas y verdín
    const elip = (cx, cy, rx, ry, c) => { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(1 - (y / ry) ** 2)); R.rect(cx - w, cy + y, cx + w, cy + y, c); } };
    elip(46, 134, 23, 9, K); elip(46, 134, 22, 8, hex('#6a5a3a')); elip(44, 131, 18, 4, hex('#8a7448'));
    R.poligono([[60, 130], [72, 114], [80, 116], [70, 136]], K); R.poligono([[61, 130], [72, 115], [79, 117], [69, 134]], hex('#6a5a3a'));
    elip(80, 114, 7, 4, K); elip(80, 114, 6, 3, hex('#6a5a3a')); R.rect(86, 113, 88, 116, hex('#4a3e28')); R.pset(76, 108, K); R.pset(75, 109, hex('#6a5a3a')); R.pset(79, 112, K);
    for (let k = 0; k < 7; k++) R.linea(64 + k, 120 + k * 2, 70 + k, 116 + k * 2, hex('#3e3422'));
    for (const [a, b, c, d] of [[34, 140, 46, 146], [46, 141, 58, 145], [26, 138, 22, 147], [56, 139, 66, 146]]) { R.linea(a, b, c, d, K); R.linea(a, b - 1, c, d - 1, hex('#5a4a30')); }
    for (let k = 0; k < 8; k++) R.linea(23 - k % 3, 132 + k, 18 - k, 128 + k * 2, hex('#3e3422'));
    // el mármol tumbado, comido por el mar: cabeza, torso con el manto de pliegues, piernas, sobre su plinto roto
    R.poligono([[82, 156], [158, 156], [162, 166], [86, 166]], K); R.poligono([[83, 157], [157, 157], [160, 165], [87, 165]], hex('#c8c2b4')); R.rect(84, 157, 156, 158, hex('#eeeae0'));
    R.poligono([[140, 162], [150, 158], [162, 166]], hex('#a8a090'));
    elip(118, 150, 20, 6, K); elip(118, 150, 19, 5, hex('#e8e2d4')); elip(116, 148, 16, 2, hex('#f6f2ea'));
    elip(94, 152, 13, 4, K); elip(94, 152, 12, 3, hex('#d8d2c4'));
    R.disco(143, 146, 6, K); R.disco(143, 146, 5, hex('#eeeae0')); R.disco(144, 144, 3, hex('#d8d2c4')); R.pset(141, 144, hex('#f6f2ea'));
    for (let k = 0; k < 7; k++) R.linea(104 + k * 5, 146, 100 + k * 5, 155, hex('#c8c2b4'));
    for (let k = 0; k < 40; k++) { const x = 84 + Math.floor(hh(k, 16) * 70), y = 144 + Math.floor(hh(k, 17) * 12); if (R.pget(x, y) !== K) R.pset(x, y, hex(k % 3 ? '#b8b2a4' : '#7ab89a')); }
    // el verdín del caballo, a manchas
    for (let y = 104; y < 150; y++) for (let x = 16; x < 92; x++) { const c = R.pget(x, y); if ((c === hex('#6a5a3a') || c === hex('#8a7448')) && hh(x >> 2, y >> 2, 44) > 0.6) R.pset(x, y, hh(x, y, 45) > 0.3 ? hex('#4a8a6a') : hex('#7ab89a')); }
    // el pedestal de la estatua de bronce
    R.rect(210, 146, 264, 168, K); R.rect(211, 147, 263, 167, hex('#d8d2c4')); R.rect(211, 147, 263, 149, hex('#eeeae0')); R.rect(214, 151, 260, 152, hex('#b8b2a4')); R.rect(211, 163, 263, 167, hex('#a8a294'));
    for (let k = 0; k < 20; k++) R.pset(214 + Math.floor(hh(k, 18) * 46), 153 + Math.floor(hh(k, 19) * 10), hex('#7ab89a'));
  });
  // la luz que entra y descubre (antes, todo en penumbra)
  const luz = ease(tramo(t, G(32.1), G(33.0)));
  // la estatua de bronce de pie: cuerpo, cabeza sin cara, el brazo izquierdo abajo y el derecho en alto que «saluda»
  const BR = hex('#6a5a3a'), BRL = hex('#9a8450'), BRS = hex('#3e3422'), VD = hex('#4a8a6a'), VDL = hex('#7ab89a');
  const sx = 237, pie = 147;
  const grueso = (a, b, c, d, w0, w1, col) => { const n = Math.max(1, Math.ceil(Math.hypot(c - a, d - b))), nx = -(d - b) / n, ny = (c - a) / n; for (let i = 0; i <= n; i++) { const w = lerp(w0, w1, i / n); for (let q = -w - 1; q <= w + 1; q += 0.5) R.pset(Math.round(a + (c - a) * i / n + nx * q), Math.round(b + (d - b) * i / n + ny * q), K); }
    for (let i = 0; i <= n; i++) { const w = lerp(w0, w1, i / n); for (let q = -w; q <= w; q += 0.5) R.pset(Math.round(a + (c - a) * i / n + nx * q), Math.round(b + (d - b) * i / n + ny * q), q < -w * 0.4 ? BRL : q > w * 0.5 ? BRS : col); } };
  // las piernas (la derecha un poco doblada: contrapposto)
  grueso(sx - 5, pie - 40, sx - 7, pie - 2, 3.5, 2.5, BR); grueso(sx + 5, pie - 40, sx + 9, pie - 21, 3.5, 3, BR); grueso(sx + 9, pie - 21, sx + 8, pie - 2, 3, 2.5, BR);
  R.rect(sx - 11, pie - 2, sx - 3, pie, K); R.rect(sx + 4, pie - 2, sx + 12, pie, K);
  // la cadera y el torso con el pecho y el vientre marcados
  R.poligono([[sx - 11, pie - 46], [sx + 11, pie - 46], [sx + 9, pie - 36], [sx - 9, pie - 36]], K); R.poligono([[sx - 10, pie - 45], [sx + 10, pie - 45], [sx + 8, pie - 37], [sx - 8, pie - 37]], BR);
  R.poligono([[sx - 14, pie - 72], [sx + 14, pie - 72], [sx + 10, pie - 45], [sx - 10, pie - 45]], K); R.poligono([[sx - 13, pie - 71], [sx + 13, pie - 71], [sx + 9, pie - 46], [sx - 9, pie - 46]], BR);
  for (let y = pie - 70; y < pie - 46; y++) R.pset(sx - 12 + Math.round((y - pie + 70) * 0.13), y, BRL);
  R.linea(sx - 8, pie - 62, sx - 1, pie - 60, BRS); R.linea(sx + 1, pie - 60, sx + 8, pie - 62, BRS); R.linea(sx, pie - 58, sx, pie - 48, BRS); R.linea(sx - 5, pie - 52, sx + 5, pie - 52, BRS);
  // la cabeza (sin cara: una estatua) con el pelo en rizos
  R.rect(sx - 3, pie - 76, sx + 3, pie - 71, K); R.rect(sx - 2, pie - 76, sx + 2, pie - 71, BR);
  R.disco(sx, pie - 82, 7, K); R.disco(sx, pie - 82, 6, BR); R.disco(sx - 2, pie - 84, 3, BRL);
  for (let k = 0; k < 7; k++) R.pset(sx - 6 + k * 2, pie - 87 + (k % 2), BRS);
  // el brazo izquierdo, abajo
  grueso(sx + 13, pie - 69, sx + 17, pie - 55, 3, 2.5, BR); grueso(sx + 17, pie - 55, sx + 15, pie - 43, 2.5, 2, BR); R.disco(sx + 15, pie - 41, 2, BR);
  // el brazo derecho en alto: el agua lo hace temblar como si saludara
  const saluda = t > G(34.3) && t < G(36.4) ? Math.sin(t * 8) * 0.3 : Math.sin(t * 1.5) * 0.04, ang = -1.95 + saluda * 0.4;
  const hx = sx - 12, hy = pie - 69, ex = hx + Math.round(Math.cos(ang) * 15), ey = hy + Math.round(Math.sin(ang) * 15), ang2 = -1.45 + saluda, mx = ex + Math.round(Math.cos(ang2) * 14), my = ey + Math.round(Math.sin(ang2) * 14);
  grueso(hx, hy, ex, ey, 3, 2.5, BR); grueso(ex, ey, mx, my, 2.5, 2, BR);
  // la mano abierta: palma y cuatro dedos
  R.disco(mx, my - 1, 3, K); R.disco(mx, my - 1, 2, BR);
  for (let k = 0; k < 4; k++) { const fx = mx - 3 + k * 2 + Math.round(Math.cos(ang2) * 2), fy = my - 4; R.linea(fx, fy, fx + Math.round((k - 1.5) * 0.6), fy - 3 - (k === 1 || k === 2 ? 1 : 0), K); }
  R.linea(mx + 3, my, mx + 5, my - 2, K);
  // el verdín a manchas
  for (let y = pie - 92; y < pie; y++) for (let x = sx - 30; x < sx + 24; x++) { const c = R.pget(x, y); if ((c === BR || c === BRL) && hh(x >> 2, y >> 2, 46) > 0.62) R.pset(x, y, hh(x, y, 47) > 0.35 ? VD : VDL); }
  // la penumbra que se retira
  if (luz < 1) tine(0, 0, 319, 179, hex('#0e2430'), 0.6 * (1 - luz));
  // motas que derivan y dos rayos quietos más débiles
  for (let k = 0; k < 40; k++) { const x = Math.round((hh(k, 51) * 340 + t * (3 + k % 4)) % 330) - 5, y = Math.round(28 + hh(k, 52) * 100 + Math.sin(t + k) * 3); if (!(x > 270 && y < 48)) R.pset(x, y, hex('#9ad0e0')); }
  for (const [x0, a] of [[150, 0.12], [20, 0.1]]) for (let y = 24; y < 130; y++) { const x = Math.round(x0 + Math.sin(t * 0.6 + x0) * 4 + (y - 24) * 0.25); for (let i = 0; i < 8; i++) if ((x + i + y) % 2 === 0) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#b8e8f0'), a)); }
  // el rayo que barre el fondo
  const rx = lerp(60, 250, ease(tramo(t, G(32.1), G(35.4))));
  for (let y = 24; y < 170; y++) { const x = Math.round(rx - 40 + (y - 24) * 0.3); for (let i = 0; i < 14; i++) if ((x + i + y) % 2 === 0) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#d8f4f8'), 0.22)); }
  // la posidonia que ondea y los peces; uno cruza por la mano de la estatua
  for (let k = 0; k < 16; k++) { const bx = 6 + k * 21 + (k % 3) * 5, by = 176 - (k % 2) * 6; if (bx > 200 && bx < 270) continue; for (let j = 0; j < 4; j++) { let x = bx + j * 2, y = by; for (let s = 0; s < 14 + (k % 4) * 3; s++) { x += Math.sin(t * 2 + k + s * 0.2) * 0.5; y -= 1; R.pset(Math.round(x), y, s > 10 ? hex('#5a9a4a') : hex('#3a7a3a')); } } }
  { const f = tramo(t, G(35.6), G(37.2)), x = Math.round(lerp(150, 300, f)), y = Math.round(my + 2 + Math.sin(f * 9) * 2); if (f > 0 && f < 1) { R.rect(x, y, x + 5, y + 2, hex('#e8c060')); R.pset(x + 5, y + 1, K); R.rect(x - 2, y, x - 1, y + 2, hex('#c8963a')); } }
  for (let k = 0; k < 7; k++) { const x = ((t * 18 + k * 13) % 360) - 30, y = 52 + (k % 3) * 6; R.rect(x, y, x + 3, y + 1, hex('#c8d8e0')); R.pset(x + 3, y, K); }
  // el capitán llega bajando, se asombra y devuelve el saludo
  const llega = ease(tramo(t, P8, G(32.7)));
  const da = t > G(35.0) && t < G(36.8);
  R.actor(KONTOS_BUZO, 172, Math.round(lerp(120, 168, llega)), t, { dir: 1, sorpresa: t > G(32.3) && t < G(34.9), dedo: da && Math.sin(t * 9) > -0.3, sonrisa: t > G(35.0), anda: llega > 0 && llega < 1 });
  chorro(180, Math.round(lerp(120, 168, llega)) - 24, -2, t, 8, 5);
};

const efectos = [[1.4, 'ola'], [A(3.45), 'chof'],
  [P2 + 0.1, 'lluvia'], [A(9.45), 'trueno'],
  [A(10.2), 'whoosh'], [A(11.75), 'pop'], [A(14.1), 'brillo'], [A(14.9), 'brillo'],
  [A(17.7), 'golpecito'], [A(18.8), 'toc'], [A(20.0), 'chof'],
  [P5 + 0.1, 'burbujas'], [G(21.4), 'chof'], [G(23.25), 'boing'],
  [G(26.5), 'pop'],
  [P7 + 0.05, 'chof'], [P7 + 0.3, 'burbujas'],
  [P8 + 0.1, 'burbujas'], [G(32.3), 'brillo'], [G(35.1), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '1900', efectos, año: 1900 });
''')
