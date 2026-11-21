E = {}
E['jm-escultor'] = ('El escultor', '''// JM-ESCULTOR (frases 4–5), 1949 → 1979, cartela «1979». Ocho planos:
// 1. el mapa: «1949» y una mano clava la chincheta en Michigan;  2. el taller de día: el joven escultor usa un libro de
// escalón (no pensaba hacer libros) y talla con el mazo;  3. la costa de cerca: la furgoneta de la mudanza llega a
// Providence por la línea de puntos y cae la chincheta;  4. la clase de dibujo: entra con una escultura pequeña, la deja
// en la tarima y explica; una alumna levanta la mano;  5. el banco del taller: cae la tarde, el radiador se apaga
// (el termómetro baja), tirita con vaho y se va;  6. su dibujo a lápiz (NUESTRA cocina): la mano acaba de sombrear y se
// retira; una puerta se entorna y una bola sale rodando: algo está a punto de pasar;  7. en casa, de noche: Lisa entra,
// mira los dibujos de la pared y él le da uno;  8. Lisa, con la carpeta, de puerta en puerta por el pasillo de editoriales.''', r'''
const a = (f) => en('chris', f), n = (f) => en('noche', f), P = T.PIEZAS_JM;
const P2 = a(0.297), P3 = a(0.556), P4 = a(0.7735), P5 = a(1) + 0.2, P6 = n(0.243), P7 = n(0.611), P8 = n(0.854);
const VERDE = '#2e5a3e', K = hex('#1a1420');
const mez = (c1, c2, f) => { const m = (s) => Math.round(((c1 >>> s) & 255) + (((c2 >>> s) & 255) - ((c1 >>> s) & 255)) * f); return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
// el mazo de madera en la mano (la cabeza hacia dir)
const mazo = (x, y, dir, alza) => { const hy = y - 3 - alza; R.linea(x, y + 2, x + dir * 2, hy + 2, K); R.linea(x + 1, y + 2, x + dir * 2 + 1, hy + 2, hex('#8a5a30'));
  R.rect(x + dir * 2 - 3, hy - 3, x + dir * 2 + 4, hy + 2, K); R.rect(x + dir * 2 - 2, hy - 2, x + dir * 2 + 3, hy + 1, hex('#c89a5a')); R.rect(x + dir * 2 - 2, hy + 1, x + dir * 2 + 3, hy + 1, hex('#8a5a30')); };
const esquirlas = (x, y, t, t0, dir) => { const u = (t - t0) * 2.6; if (u < 0 || u > 1) return; for (let k = 0; k < 5; k++) { const ang = -0.4 - k * 0.45, d = 3 + u * (9 + k * 2); R.pset(Math.round(x + dir * Math.cos(ang) * d), Math.round(y + Math.sin(ang) * d + u * u * 9), k % 2 ? hex('#f0e8d8') : hex('#c8b89a')); } };
const hoja = (x, y) => { R.rect(x - 5, y - 7, x + 5, y + 6, K); R.rect(x - 4, y - 6, x + 4, y + 5, hex('#f4f0e4')); R.rect(x - 2, y - 3, x + 2, y + 2, hex('#b8b8c0')); R.linea(x - 3, y + 3, x + 3, y + 3, hex('#7a7a86')); R.pset(x - 1, y - 1, hex('#5a5a66')); R.pset(x + 1, y, hex('#5a5a66')); };

// 1 · el mapa: «1949», la chincheta en Michigan
const nace = a(0.101), clava = a(0.186);
const p1 = (t) => {
  const g = T.taller(R, t, { encuadre: 'mapa', ruta: 0 }), [mx, my] = g.michigan;
  const b = suave(tramo(t, clava - 1.1, clava)), s = suave(tramo(t, clava + 0.45, clava + 1.3));
  const wx = Math.round(lerp(-30, mx - 12, b) - s * 60), wy = Math.round(lerp(my - 44, my - 9, b) + s * 26);
  if (t >= clava) T.chincheta(R, mx, my, t, hex('#d8303a'), { baja: 1, pulso: true }); else if (b > 0) T.chincheta(R, wx + 12, wy + 9, t, hex('#d8303a'), { baja: 1 });
  if (b > 0 && s < 1) T.brazo(R, wx - 44, wy + 34, wx, wy, VERDE, 1, { codo: [wx - 26, wy + 8] });
  const e = tramo(t, nace, nace + 0.35); if (e > 0) R.numero('1949', mx + 40, Math.round(lerp(my - 14, my - 24, e)), { tam: 16, centro: true });
};

// 2 · el taller de día: el libro de escalón y el mazo
const deja = a(0.40), sube = a(0.44), talla = a(0.492), GOLPES = [0.08, 0.5, 0.92];
const p2 = (t) => {
  const o = { encuadre: 'taller' }; T.taller(R, t, o);
  const u = tramo(t, P2 + 0.1, deja - 0.25), x = Math.round(lerp(128, 219, u)), arriba = t >= sube;
  const bj = tramo(t, deja - 0.25, deja);   // baja el libro al suelo
  const lib = (bx, by) => { R.rect(bx - 7, by - 5, bx + 7, by, K); R.rect(bx - 6, by - 4, bx + 6, by - 1, hex('#c8303a')); R.rect(bx - 6, by - 2, bx + 6, by - 1, hex('#f4f0e4')); R.rect(bx - 6, by - 4, bx - 5, by - 1, hex('#8a1e28')); R.pset(bx + 2, by - 4, hex('#f0c040')); };
  const salto = arriba ? Math.round(Math.sin(tramo(t, sube, sube + 0.3) * Math.PI) * 3) : 0;
  let gk = -1, alza = 3; if (t >= talla) { const q = (t - talla) / 0.45; gk = Math.floor(q); const fr = q - gk; alza = fr < 0.6 ? Math.round(fr / 0.6 * 6) : Math.round((1 - fr) / 0.4 * 6); }
  if (bj >= 1) lib(229, 152);
  const act = R.actor(EL.vanallsburg, arriba ? 221 : x, arriba ? 147 : 152, t, { dir: 1, anda: u > 0 && u < 1, salto, sostiene: arriba ? [239, 118 - (t >= talla ? alza : 0)] : bj < 1 ? [x + 17, Math.round(lerp(134, 147, bj))] : undefined, sonrisa: arriba && t < talla });
  if (!arriba && bj < 1) lib(act.mano[0] + 4, act.mano[1] + 4);
  if (arriba) { mazo(act.mano[0], act.mano[1], 1, t >= talla ? 0 : 2); if (gk >= 0) esquirlas(246, 112, t, talla + gk * 0.45 + 0.42, 1); }
  T.tallerDelante(R, t, o);
};

// 3 · la costa: la mudanza llega a Providence
const llega = a(0.641);
const p3 = (t) => {
  const g = T.taller(R, t, { encuadre: 'mapa', camara: 'costa' }), [px, py] = g.providence;
  const f = suave(tramo(t, P3 + 0.15, llega - 0.15)), A = [22, py + 30], B = [px - 9, py + 6], N = 40; let hx = A[0], hy = A[1];
  R.recorte([24, 18, 296, 166]);
  for (let i = 0; i <= N * f; i++) { const w = i / N, x = Math.round(lerp(A[0], B[0], w)), y = Math.round(lerp(A[1], B[1], w) - Math.sin(w * Math.PI) * 12); if (i % 3 < 2) { R.disco(x, y, 1.2, K); R.pset(x, y, hex('#e8404a')); R.pset(x + 1, y, hex('#e8404a')); } hx = x; hy = y; }
  if (f > 0 && f < 1) { const y = hy - 2 - (Math.floor(t * 9) % 2);   // la furgoneta de la mudanza, con un bulto en el techo
    R.poligono([[hx - 8, y - 7], [hx + 3, y - 7], [hx + 3, y - 4], [hx + 7, y - 4], [hx + 7, y + 1], [hx - 8, y + 1]], K);
    for (let j = -6; j <= 0; j++) for (let i = -7; i <= 2; i++) R.pset(hx + i, y + j, j < -4 ? hex('#fff8e8') : hex('#e8dcc0'));
    for (let j = -3; j <= 0; j++) for (let i = 3; i <= 6; i++) R.pset(hx + i, y + j, j === -3 ? hex('#9ad0e8') : hex('#d85a4a'));
    R.disco(hx - 4, y + 2, 1.6, K); R.disco(hx + 4, y + 2, 1.6, K); R.pset(hx - 4, y + 2, hex('#9a9aa6')); R.pset(hx + 4, y + 2, hex('#9a9aa6'));
    for (let i = -5; i <= -1; i++) { R.pset(hx + i, y - 9, hex('#8a5a30')); R.pset(hx + i, y - 8, hex('#c89a5a')); } R.pset(hx - 6, y - 8, K); R.pset(hx, y - 8, K);
    for (let k = 1; k <= 3; k++) R.pset(hx - 9 - k * 3, y - 1 - ((Math.floor(t * 8) + k) % 2), hex('#c8c0b0')); }
  R.recorte(null);
  T.chincheta(R, px, py + 5, t, hex('#d8303a'), { baja: tramo(t, llega - 0.25, llega + 0.1), pulso: true });
  const e7 = tramo(t, a(0.716), a(0.716) + 0.35); if (e7 > 0) R.numero('1979', px - 52, Math.round(lerp(py - 8, py - 18, e7)), { tam: 16, centro: true });
};

// 4 · la clase: deja la escultura en la tarima y explica
const posa = a(0.855), mano4 = a(0.935);
const p4 = (t) => {
  const o = { encuadre: 'clase' }; T.taller(R, t, o);
  const u = tramo(t, P4 + 0.1, posa - 0.1), x = Math.round(lerp(262, 208, u)), puesta = t >= posa;
  const esc = (ex, ey) => { R.poligono([[ex - 5, ey], [ex + 5, ey], [ex + 2, ey - 13], [ex - 1, ey - 14]], K); R.poligono([[ex - 4, ey - 1], [ex + 1, ey - 1], [ex, ey - 12]], hex('#f4ecd8')); R.poligono([[ex + 1, ey - 1], [ex + 4, ey - 1], [ex + 1, ey - 12]], hex('#c0b292')); R.pset(ex - 1, ey - 6, hex('#5a5248')); R.pset(ex - 2, ey - 3, hex('#5a5248')); R.rect(ex - 6, ey, ex + 6, ey + 1, K); };
  if (puesta) esc(198, 127);
  R.actor(EL.chica ?? EL.estudiante, 78, 157, t, { dir: 1, dedo: t > mano4 && t < mano4 + 1.6, sonrisa: t > mano4 });
  const act = R.actor(EL.vanallsburg, x, 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: puesta ? undefined : [x - 3, 138 - Math.round(tramo(t, posa - 0.35, posa) * 6)], dedo: puesta && t < mano4 + 0.2, habla: puesta && Math.sin(t * 8) > 0, sonrisa: t > mano4 });
  if (!puesta) esc(act.mano[0] - 2, act.mano[1] + 3);
  T.tallerDelante(R, t, o);
};

// 5 · el banco: cae la tarde, se apaga el radiador
const apaga = n(0.101), sale = n(0.185);
const p5 = (t) => {
  const frio = tramo(t, n(0.0), n(0.14)), calor = 1 - tramo(t, apaga, apaga + 0.5), tallando = t < apaga - 0.15;
  const o = { encuadre: 'taller', camara: 'banco', frio, virutas: 0.25 + 0.4 * tramo(t, P5, apaga) }; T.taller(R, t, o);
  const AZ = hex('#3a4a7a'), fr = (c) => mez(c, AZ, frio * 0.45);
  // el radiador de hierro, bajo la ventana
  R.rect(50, 98, 53, 127, K); R.rect(51, 99, 52, 126, fr(hex('#8a8478'))); R.rect(50, 110, 53, 111, K);
  R.rect(3, 100, 49, 127, K); for (let k = 0; k < 9; k++) { const x0 = 4 + k * 5; R.rect(x0, 101, x0 + 3, 126, fr(hex('#d8d0c0'))); R.rect(x0, 101, x0, 126, fr(hex('#f4eee0'))); R.rect(x0 + 3, 102, x0 + 3, 126, fr(hex('#9a9484'))); R.rect(x0, 101, x0 + 3, 101, fr(hex('#f4eee0'))); if (calor > 0.05) R.rect(x0 + 1, 120, x0 + 2, 125, mez(fr(hex('#d8d0c0')), hex('#f08a4a'), calor * 0.6)); }
  R.rect(46, 106, 50, 108, fr(hex('#8a8478'))); R.disco(49, 104, 2.4, K); R.disco(49, 104, 1.4, calor > 0.5 ? hex('#e8404a') : fr(hex('#7a2a30')));
  // el calor que sube (se muere al apagarse)
  if (calor > 0) for (let k = 0; k < 5; k++) { const x0 = 8 + k * 9; for (let j = 0; j < 16 * calor; j++) { const y = 98 - j, x = x0 + Math.round(Math.sin(j * 0.7 + t * 5 + k) * 1.6); if ((j + Math.floor(t * 8) + k) % 3) R.pset(x, y, mez(R.pget(x, y), hex('#ffb070'), 0.55 * (1 - j / 18))); } }
  // el termómetro de pared
  const col = Math.round(lerp(26, 7, suave(tramo(t, apaga, apaga + 1.5))));
  R.rect(51, 58, 61, 96, K); R.rect(52, 59, 60, 95, fr(hex('#f4f0e4'))); for (let k = 0; k < 6; k++) R.rect(58, 63 + k * 5, 59, 63 + k * 5, hex('#5a5a66'));
  R.rect(55, 62, 56, 90, hex('#c8c8d0')); R.rect(55, 90 - col, 56, 90, hex('#e8303a')); R.disco(55.5, 91.5, 2.2, K); R.disco(55.5, 91.5, 1.4, hex('#e8303a'));
  const v = tramo(t, sale, P6 + 0.2), x = Math.round(lerp(184, 78, v)), tirita = t > apaga + 0.5 && v === 0;
  let alza = 0; if (tallando) { const q = ((t - P5) / 0.5) % 1; alza = q < 0.6 ? Math.round(q / 0.6 * 6) : Math.round((1 - q) / 0.4 * 6); }
  const act = R.actor(EL.vanallsburg, x + (tirita && Math.floor(t * 14) % 2 ? 1 : 0), 134, t, { dir: v > 0 ? -1 : 1, anda: v > 0 && v < 1, sostiene: tallando ? [205, 113 - alza] : undefined, sorpresa: t > apaga && t < apaga + 0.6, triste: tirita, brazos: false });
  if (tallando) { mazo(act.mano[0], act.mano[1], 1, 0); esquirlas(213, 108, t, P5 + Math.floor((t - P5) / 0.5) * 0.5 + 0.47, 1); }
  if (t > apaga + 0.4) { const d = v > 0 ? -1 : 1, bx = act.cabeza[0] + d * 6, by = act.cabeza[1] + 9; T.a_vaho(R, bx, by, t, d, 1); for (let k = 0; k < 2; k++) { const z = (t * 0.8 + k * 0.5) % 1; if (z < 0.7) { const cx = Math.round(bx + d * (3 + z * 12)), cy = Math.round(by - z * 6); R.disco(cx, cy, 1.5 + z * 3, hex('#b8c8e4')); R.disco(cx, cy, 0.8 + z * 2.4, hex('#eef4fc')); } } }
  T.tallerDelante(R, t, o);
};

// 6 · su dibujo a lápiz (NUESTRA cocina, quieta): la mano sombrea y se retira; la puerta se entorna y sale una bola
const entorna = n(0.483), rueda = n(0.51);
const p6 = (t) => {
  const o = { encuadre: 'cocina' }; T.casaJuego(R, t, o);
  const G = ['#2a2a30', '#5a5a62', '#8a8a92', '#c4c4c8', '#ecece8'].map(hex);
  const ab = suave(tramo(t, entorna, entorna + 1.1)), w = Math.round(ab * 6);
  if (w > 0) { R.rect(285, 61, 285 + w, 123, G[0]); R.rect(285 + w, 61, 285 + w, 123, G[3]);
    for (let j = 0; j < 30; j++) { const y = 125 + j, xa = Math.round(284 - j * 0.9 * ab), xb = Math.round(286 + w - j * 0.25); for (let x = xa; x <= xb; x++) if ((x + y) % 2 === 0) R.pset(x, y, G[4]); } }
  const rb = tramo(t, rueda, n(0.6)), q = 1 - (1 - rb) * (1 - rb);
  if (rb > 0) { const bx = Math.round(lerp(287, 238, q)), by = Math.round(lerp(130, 157, q)); for (let i = -6; i <= 8; i++) { if ((i + by) % 2) R.pset(bx + i + 2, by + 7, G[0]); R.pset(bx + i + 2, by + 6, G[1]); }
    R.disco(bx, by, 6.6, G[0]); R.disco(bx, by, 5.6, G[4]); const an = -q * 7; for (let d = -5; d <= 5; d++) { const ex = Math.round(bx + Math.cos(an) * d), ey = Math.round(by + Math.sin(an) * d); R.pset(ex, ey, G[1]); R.pset(ex + 1, ey, G[1]); } for (let d = 2; d <= 5; d++) R.pset(bx + d, by + 7 - d + 2, G[2]); R.pset(bx - 2, by - 3, hex('#ffffff')); R.pset(bx - 3, by - 2, hex('#ffffff')); }
  T.casaJuegoDelante(R, t, o);
  // la mano con la barrita de lápiz (abajo a la izquierda): sombrea y se retira
  const fuera = suave(tramo(t, n(0.41), n(0.47))), rasca = t < n(0.39) ? Math.sin(t * 13) : 0;
  if (fuera < 1) { const wx = Math.round(52 - rasca * 4 - fuera * 70), wy = Math.round(152 - rasca * 3 + fuera * 34);
    for (let k = 0; k < 7; k++) { const z = tramo(t, P6 + 0.2 + k * 0.25, P6 + 0.5 + k * 0.25); if (z > 0) R.linea(94 - k * 4, 170, Math.round(94 - k * 4 - 9 * z), Math.round(170 - 9 * z), G[1]); }
    P.lapizConte(R, wx + 15, wy + 12, { s: 2, dir: -1 }); T.brazo(R, wx - 56, wy + 40, wx, wy, VERDE, 1, { codo: [wx - 30, wy + 12] }); }
};

// 7 · en casa: Lisa mira los dibujos
const entra = n(0.69), piensa = n(0.743), da = n(0.80), coge = n(0.84);
const p7 = (t) => {
  const o = { encuadre: 'casa' }; T.taller(R, t, o);
  const u = tramo(t, P7 + 0.1, entra), lx = Math.round(lerp(-10, 100, u));
  // los dibujos de la pared se encienden uno a uno cuando ella los mira
  const D = [[136, 30, 26, 19], [168, 26, 20, 26], [194, 31, 26, 19], [226, 28, 20, 24]]; const k = Math.floor((t - piensa) / 0.42);
  if (t > piensa && k < 4) { const [x0, y0, w, h] = D[k]; for (let i = -2; i <= w + 1; i++) { R.pset(x0 + i, y0 - 2, hex('#ffe08a')); R.pset(x0 + i, y0 + h + 1, hex('#ffe08a')); } for (let j = -2; j <= h + 1; j++) { R.pset(x0 - 2, y0 + j, hex('#ffe08a')); R.pset(x0 + w + 1, y0 + j, hex('#ffe08a')); } }
  const dando = t >= da, cogida = t >= coge;
  const van = R.actor(EL.vanallsburg, 136, 156, t, { dir: dando ? -1 : 1, sostiene: dando ? (cogida ? undefined : [Math.round(lerp(140, 128, tramo(t, da, coge))), 136]) : [158 + Math.round(Math.sin(t * 9) * 2), 141 - Math.round(Math.cos(t * 9) * 1)], sonrisa: cogida });
  if (!dando) { R.linea(van.mano[0], van.mano[1] - 5, van.mano[0] + 3, van.mano[1] + 2, K); R.linea(van.mano[0] + 1, van.mano[1] - 5, van.mano[0] + 4, van.mano[1] + 2, hex('#f0c030')); } else if (!cogida) hoja(van.mano[0] - 3, van.mano[1] - 3);
  const lisa = R.actor(EL.lisa, lx, 156, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > piensa && t < piensa + 0.5, sonrisa: t > piensa + 0.5, dedo: t > piensa + 0.4 && t < da, sostiene: cogida ? [119, 134] : undefined });
  if (cogida) hoja(lisa.mano[0] + 3, lisa.mano[1] - 3);
  if (t > piensa + 0.5 && t < da) R.icono('!', lx + 4, 118 - Math.round(Math.abs(Math.sin(t * 6)) * 2), hex('#ffe08a'));
  T.tallerDelante(R, t, o);
};

// 8 · el pasillo de editoriales: de puerta en puerta
const T1 = P8 + 1.0, T2 = n(0.93) + 0.75;
const p8 = (t) => {
  const o = { encuadre: 'pasillo', puertas: 0 }; T.editorial(R, t, o);
  const u1 = tramo(t, P8 + 0.05, T1 - 0.1), u2 = tramo(t, T1 + 0.75, T2 - 0.1), u3 = tramo(t, T2 + 0.75, E.duracion);
  const x = Math.round(lerp(lerp(lerp(8, 50, u1), 134, u2), 196, u3)), anda = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1) || (u3 > 0 && u3 < 1);
  const llama = (t > T1 && t < T1 + 0.7) || (t > T2 && t < T2 + 0.7);
  // la señora de los manuscritos, que cruza al fondo
  const vx = Math.round(lerp(300, 150, tramo(t, P8, E.duracion))); const sra = R.actor(EL.senora75 ?? EL.senora30, vx, 146, t, { dir: -1, anda: true, sostiene: true }); R.rect(sra.mano[0] - 5, sra.mano[1] - 3, sra.mano[0] + 3, sra.mano[1] + 3, K); R.rect(sra.mano[0] - 4, sra.mano[1] - 2, sra.mano[0] + 2, sra.mano[1] + 2, hex('#f4f0e4')); R.rect(sra.mano[0] - 4, sra.mano[1], sra.mano[0] + 2, sra.mano[1], hex('#b8b8c0'));
  if (!llama) P.carpeta(R, x + 18, 152 - 6 - (anda && Math.floor(t * 5) % 2 ? 1 : 0), {});
  const lisa = R.actor(EL.lisa, x, 152, t, { dir: 1, anda, dedo: llama && Math.sin(t * 20) > -0.3, sostiene: llama ? undefined : [x + 17, 138], sonrisa: true });
  if (llama) { P.carpeta(R, x - 6, 152, {}); for (let k = 0; k < 3; k++) { const r = 3 + k * 3 + Math.round(((t * 4) % 1) * 3); R.pset(x + 19 + r, 128 - k, hex('#fff8e0')); R.pset(x + 19 + r, 132 + k, hex('#fff8e0')); } }
  T.editorialDelante(R, t, o);
};
const efectos = [[nace, 'pop'], [clava, 'toc'], [deja, 'golpecito'], ...GOLPES.map((g, k) => [talla + k * 0.45 + 0.42, 'toc']).filter(([x]) => x < P3), [P3 + 0.3, 'motor'], [llega + 0.1, 'toc'], [a(0.716), 'pop'], [posa, 'golpecito'], [mano4, 'pop'],
  [P5 + 0.47, 'toc'], [P5 + 0.97, 'toc'], [apaga, 'interruptor'], [apaga + 0.9, 'viento'], [P6 + 0.3, 'lapiz'], [entorna, 'puerta'], [piensa + 0.5, 'brillo'], [coge, 'papel'], [T1 + 0.1, 'toc'], [T2 + 0.1, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '1979', efectos, año: (t) => (t < P2 ? 1949 : t < P3 ? 1972 : Math.round(lerp(1972, 1979, tramo(t, P3 + 0.2, a(0.72))))) });
''')

E['jm-perro'] = ('El perro blanco', '''// JM-PERRO (frase 6), 1979. Cinco planos:
// 1. el despacho del editor en Boston: Lisa le pasa un dibujo por encima de la mesa y él lo mira con asombro; el autor
// espera;  2. la mesa desde arriba: los dibujos salen de la carpeta, el editor tiende la pluma y la mano del autor la
// coge y se pone a escribir (rayas);  3. NUESTRA lámina del libro de 1979: el perro blanco echa a correr por el jardín de
// setos y un niño lo persigue;  4. la verja: el perro se sienta, se cuela entre los barrotes y el niño llega tarde;
// 5. gag 2: el lápiz rojo cerca al perrito escondido en la esquina de cada lámina; para los dos de abajo, más
// escondidos, sube una lupa por el borde.''', r'''
const e = (f) => en('editor', f), P = T.PIEZAS_JM;
const P2 = e(0.166), P3 = e(0.397), P4 = e(0.642), P5 = e(0.8265);
const K = hex('#1a1420'), suave = (u) => u * u * (3 - 2 * u);

// 1 · el despacho: el editor mira un dibujo
const pasa = 0.9, ve = e(0.113), asombro = e(0.137);
const p1 = (t) => {
  const o = { encuadre: 'despacho' }; T.editorial(R, t, o);
  const u = suave(tramo(t, pasa, pasa + 0.9)), enMano = u >= 1;
  R.actor(EL.vanallsburg, 84, 158, t, { dir: 1, sonrisa: t > asombro + 0.3, triste: t < ve });
  const lor = R.actor(EL.lorraine, 206, 144, t, { dir: -1, sostiene: enMano ? [199, Math.round(lerp(126, 120, tramo(t, ve - 0.3, ve)))] : u > 0.5 ? [198, 128] : undefined, sorpresa: t > asombro && t < asombro + 0.5, sonrisa: t > asombro + 0.5, habla: t < pasa && Math.sin(t * 8) > 0 });
  P.carpeta(R, 142, 158, {});
  const lisa = R.actor(EL.lisa, 122, 158, t, { dir: 1, sostiene: u < 1 ? [Math.round(lerp(140, 152, u)), Math.round(lerp(140, 128, u))] : undefined, sonrisa: true, habla: t > pasa + 1 && t < ve && Math.sin(t * 7) > 0 });
  if (!enMano) P.dibujo(R, lisa.mano[0] + Math.round(u * 26), lisa.mano[1] + 6 - Math.round(Math.sin(u * Math.PI) * 6), { tema: 'salon' });
  T.editorialDelante(R, t, o);
  if (enMano) { P.dibujo(R, lor.mano[0] - 12, lor.mano[1] + 9, { tema: 'salon' }); if (t > asombro && t < asombro + 0.9) R.icono('!', 214, 104 - Math.round(Math.abs(Math.sin(t * 7)) * 2), hex('#ffe08a')); }
};

// 2 · la mesa: la pluma cambia de mano
const coge = e(0.2115) + 0.5, ofrece = e(0.282), toma = e(0.31) + 0.3, escribe = e(0.352);
const p2 = (t) => {
  const of = suave(tramo(t, coge, ofrece)), es = tramo(t, escribe, P3 - 0.05), lin = Math.min(2, Math.floor(es * 3)), fl = es * 3 - lin;
  const tip = es > 0 ? [Math.round(178 + (es >= 1 ? 1 : fl) * 40), Math.round(155 + lin * 6 + Math.sin(t * 22) * 1.2)] : [Math.round(lerp(lerp(262, 204, of), 178, suave(tramo(t, toma + 0.15, escribe)))), Math.round(lerp(lerp(150, 160, of), 155, suave(tramo(t, toma + 0.15, escribe))))];
  T.editorial(R, t, { encuadre: 'despacho', camara: 'mesa', dibujos: 2 + 3 * tramo(t, P2 + 0.1, e(0.2115) + 0.3), pluma: [400, 150] });
  // la hoja en blanco que le pone delante, y las rayas que escribe (onduladas: nada de letras)
  for (let j = 0; j < 30; j++) for (let i = 0; i < 62; i++) if ((i + j) % 2) R.pset(172 + i, 149 + j, hex('#141a14'));
  R.rect(167, 145, 229, 175, K); R.rect(168, 146, 228, 174, hex('#f6f2e6')); R.rect(168, 173, 228, 174, hex('#d8d2c0')); R.rect(227, 146, 228, 174, hex('#d8d2c0')); R.poligono([[222, 146], [228, 146], [228, 152]], hex('#c8c0aa')); R.linea(222, 146, 228, 152, K); R.rect(172, 150, 196, 150, hex('#c8c0aa')); R.rect(170, 146, 171, 152, hex('#9a9aa6'));
  for (let k = 0; k <= lin && es > 0; k++) { const w = k < lin || es >= 1 ? 40 : fl * 40; for (let i = 0; i < w; i++) { const y = 155 + k * 6 + Math.round(Math.sin(i * 0.9 + k) * 1.3); R.pset(178 + i, y, hex('#22306a')); if (i % 9 === 8) R.pset(178 + i, y, hex('#f6f2e6')); } }
  const pl = (x, y) => { R.linea(x + 3, y + 1, x + 25, y - 17, hex('#2a1a10')); for (let w = -1; w <= 1; w++) R.linea(x + 4 + w, y - 4 + w, x + 22 + w, y - 22 + w, w < 0 ? hex('#5a6ab0') : w ? hex('#141a3a') : hex('#2e3e84')); R.linea(x + 14, y - 15, x + 16, y - 13, hex('#e8c860')); R.linea(x + 18, y - 21, x + 24, y - 23, hex('#e8c860')); R.linea(x, y, x + 4, y - 4, hex('#e8c860')); R.linea(x + 1, y, x + 4, y - 3, hex('#c8a040')); R.pset(x, y, K); };
  pl(tip[0], tip[1]);
  if (of > 0.3 && t < toma) { const c2 = hex('#fff8c0'), sx = tip[0] + 25, sy = tip[1] - 25, r = Math.floor(t * 6) % 2 ? 3 : 2; for (let d = -r; d <= r; d++) { R.pset(sx + d, sy, c2); R.pset(sx, sy + d, c2); } }
  const ed = suave(tramo(t, coge - 0.8, coge)) - suave(tramo(t, toma + 0.15, toma + 0.8));   // la mano del editor entra, ofrece y se va
  if (ed > 0) { const wx = tip[0] + 25 + Math.round((1 - ed) * 80), wy = tip[1] - 13 - Math.round((1 - ed) * 12); T.brazo(R, wx + 50, wy + 26, wx, wy, '#8a6a48', -1, { codo: [wx + 26, wy + 4] }); }
  const au = suave(tramo(t, toma - 0.6, toma + 0.1));   // la mano del autor
  if (au > 0) { const wx = tip[0] - 12 - Math.round((1 - au) * 26), wy = tip[1] - 9 + Math.round((1 - au) * 36); T.brazo(R, wx - 30, wy + 42, wx, wy, '#2e5a3e', 1, { codo: [wx - 22, wy + 14] }); }
};

// 3 · la lámina de 1979: el niño persigue al perro
const corre = e(0.502), para = e(0.575), mira = e(0.612);
const perroX = (t) => t < corre ? lerp(-14, 92, suave(tramo(t, P3, P3 + 1.2))) : t < mira ? lerp(92, 204, suave(tramo(t, corre, para))) : lerp(204, 330, tramo(t, mira, P4) ** 1.4);
const p3 = (t) => {
  const dx = Math.round(perroX(t)), va = t < P3 + 1.2 || (t > corre && t < para) || t > mira, bote = va ? Math.round(Math.abs(Math.sin(t * 15)) * 2) : 0;
  const o = { encuadre: 'libro1979', perro: [dx, 140 - bote], perroDir: t >= para && t < mira ? -1 : 1, perroSentado: t > P3 + 1.3 && t < corre - 0.15 };
  T.editorial(R, t, o);
  if (va) for (let k = 1; k <= 3; k++) { const px = dx - 10 - k * 5, py = 139 - ((Math.floor(t * 9) + k) % 3); R.pset(px, py, hex('#e8e8e4')); R.pset(px + 1, py, hex('#b8b8c0')); }
  const u = tramo(t, corre - 0.5, P4), bx = Math.min(dx - 34, Math.round(lerp(-18, 214, u ** 0.9)));
  R.actor(EL.nino77 ?? EL.chico, bx, 141, t, { dir: 1, anda: u > 0, dedo: t > para && t < mira, sorpresa: t > para && t < mira });
  T.editorialDelante(R, t, o);
};

// 4 · la verja: el perro se cuela
const sienta = e(0.70), cuela = e(0.744), dentro = e(0.765), llegaN = e(0.80);
const p4 = (t) => {
  const v = tramo(t, P4, sienta), c = suave(tramo(t, cuela, dentro + 0.5)), tras = t >= dentro;
  const dx = Math.round(t < cuela ? lerp(-12, 148, suave(v)) : lerp(148, 152, c)), dy = Math.round(t < cuela ? 158 : lerp(158, 143, c));
  const bote = (v > 0 && v < 1) || (t > cuela && c < 1) ? Math.round(Math.abs(Math.sin(t * 15)) * 2) : 0;
  const o = { encuadre: 'libro1979', camara: 'verja', abre: 0.25 + 0.6 * suave(tramo(t, cuela - 0.25, cuela + 0.3)), perro: tras ? [dx, dy - bote] : undefined, perroDir: 1 };
  T.editorial(R, t, o);
  if (!tras) P.perro(R, dx, dy - bote, { t, dir: 1, sentado: t >= sienta && t < cuela - 0.1 });
  // los destellos del jardín del mago
  if (t > dentro) for (let k = 0; k < 6; k++) { const ph = (t * 1.3 + k * 0.37) % 1, sx = 126 + ((k * 37) % 68), sy = Math.round(120 - k * 9 - ph * 14); if (ph < 0.7) { const c2 = k % 2 ? hex('#fff8c0') : hex('#ffe08a'); R.pset(sx, sy, c2); if (ph > 0.15 && ph < 0.5) { R.pset(sx - 1, sy, c2); R.pset(sx + 1, sy, c2); R.pset(sx, sy - 1, c2); R.pset(sx, sy + 1, c2); } } }
  const u = tramo(t, cuela, llegaN), bx = Math.round(lerp(-18, 118, u));
  if (u > 0) R.actor(EL.nino77 ?? EL.chico, bx, 160, t, { dir: 1, anda: u < 1, sorpresa: u >= 1 && t < llegaN + 0.8, dedo: u >= 1 && t > llegaN + 0.3 });
  if (u >= 1 && t < llegaN + 1) R.icono('?', bx + 4, 122 - Math.round(Math.abs(Math.sin(t * 6)) * 2), hex('#ffe08a'));
  T.editorialDelante(R, t, o);
};

// 5 · gag 2: el perro escondido en todos los libros
const C = [e(0.902), e(0.922), e(0.955), e(0.985)], Q = [[73, 83], [223, 83], [130, 161], [166, 162]];
const p5 = (t) => {
  const paradas = [[P5, [240, 212]], [P5 + 0.8, [212, 170]], [C[0], [226, 166]], [C[1] + 0.1, [204, 168]], [C[2] - 0.12, Q[2]], [C[2] + 0.22, Q[2]], [C[3] - 0.12, Q[3]], [E.duracion, [Q[3][0] + 1, Q[3][1] - 1]]];
  let lupa = paradas[0][1]; for (let k = 0; k < paradas.length - 1; k++) if (t >= paradas[k][0]) { const z = suave(tramo(t, paradas[k][0], paradas[k + 1][0])); lupa = [Math.round(lerp(paradas[k][1][0], paradas[k + 1][1][0], z)), Math.round(lerp(paradas[k][1][1], paradas[k + 1][1][1], z))]; }
  T.editorial(R, t, { encuadre: 'esquinas', cuantos: C.reduce((s, c) => s + tramo(t, c, c + 0.25), 0), lupa, radio: 15 });
};
const efectos = [[pasa + 0.3, 'papel'], [asombro, 'pop'], [P2 + 0.3, 'papel'], [escribe, 'firma'], [corre, 'guau'], [mira, 'guau'], [sienta + 0.2, 'guau'], [cuela, 'cerrojo'], [dentro + 0.2, 'brillo'], [C[0], 'lapiz'], [C[2], 'pop'], [C[3] + 0.2, 'guau']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P5 ? 1979 : Math.round(lerp(1979, 2026, tramo(t, P5 + 0.5, E.duracion - 0.8)))) });
''')
