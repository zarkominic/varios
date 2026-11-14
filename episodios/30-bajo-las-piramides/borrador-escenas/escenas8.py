E = {}

# Utilidades comunes de los fondos LOCAL (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k, BL = hex('#fbf6e6');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
// una capa con huecos (lo que no se pinta deja ver lo de detrás: las nubes pasan por detrás de la pirámide)
const capa = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } for (let i = 0; i < b.length; i++) if (b[i]) R.pset(i % 320, (i / 320) | 0, b[i]); }; };
// cielo tramado de seis tonos hasta y1
const cieloT = (y1, r) => { for (let y = 0; y < y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(r, (y / y1) * (r.length - 0.4) + (h(x >> 3, y >> 2, 3) - 0.5) * 0.35, x, y)); };
// nubes de tres tonos a tres velocidades (la fila alta no entra en la esquina de Atom)
const nubes = (t, filas) => { for (const [x0, y, w, v, ancho] of filas) { const A = ancho ?? 380; R.nube(((x0 + t * v) % A + A) % A - 30, y, w); } };
// el rollo de papiro abierto en la mano (x, y): abierto 0–1
const rollo = (x, y, ab = 1, escrito = 0) => { const w = Math.round(3 + 8 * ab); R.rect(x - 1, y - 5, x + w + 1, y + 2, K); R.rect(x, y - 4, x + w, y + 1, hex('#f0e2b8')); R.rect(x, y + 1, x + w, y + 1, hex('#c8b488'));
  for (let i = 2; i < w - 1; i++) if (i / (w - 2) < escrito && i % 2 === 0) { R.pset(x + i, y - 3, hex('#3a2a1a')); if (i % 4 === 0) R.pset(x + i, y - 1, hex('#3a2a1a')); }
  R.rect(x - 2, y - 6, x - 1, y + 3, hex('#8a5a2a')); R.rect(x + w + 1, y - 6, x + w + 2, y + 3, hex('#8a5a2a')); R.pset(x - 2, y - 6, hex('#c88a4a')); R.pset(x + w + 1, y - 6, hex('#c88a4a')); };
// el candil de barro con su llama (x, y = la mano)
const candil = (x, y, t, k = 0) => { R.rect(x - 4, y - 1, x + 4, y + 2, K); R.rect(x - 3, y - 1, x + 3, y + 1, hex('#b8703a')); R.rect(x - 3, y - 1, x + 1, y - 1, hex('#d8925a')); R.pset(x + 4, y - 2, K);
  const f = Math.sin(t * 17 + k) > 0 ? 1 : 0; R.halo(x + 4, y - 4, 7, [hex('#5a3a1a'), hex('#a8642a'), hex('#e8a040')], 0.9);
  R.pset(x + 4, y - 3, hex('#ffd060')); R.pset(x + 4 + f, y - 4, hex('#ffe890')); R.pset(x + 4, y - 5 - f, hex('#fff4c0')); };
// el sombrero de viaje (pétaso) suelto: f = fotograma del giro (0 de frente, 1 de canto)
const PETASO = ['.....kkkkk.....', '....kJJJjJk....', '...kJjJJJJJk...', 'kkkkkkkkkkkkkkk', 'kJJJJJJJJJJJJJk', '.kkkkkkkkkkkkk.'];
const PETASO_C = ['..kkkkkkkkkkk..', 'kkJJJJjJJJJJJkk', '.kkkkkkkkkkkkk.'];
const sombrero = (x, y, f, dir = 1) => R.dibujo(f ? PETASO_C : PETASO, x, y - (f ? 3 : 6), dir, { k: K, J: hex('#c8a46a'), j: hex('#e0c08a') });
// globo de pensamiento (cx, cy) con su cola hacia (hx, hy); u 0–1 crece
const globo = (cx, cy, w, hh, hx, hy, u) => { if (u <= 0) return; const s = Math.min(1, u * 1.4), W = w * s, H = hh * s; const P = (d) => Array.from({ length: 28 }, (_, i) => [cx + Math.cos(i / 28 * 6.283) * (W / 2 + d), cy + Math.sin(i / 28 * 6.283) * (H / 2 + d)]);
  R.poligono(P(1), K); R.poligono(P(0), BL); R.poligono(P(0).filter((_, i) => i > 3 && i < 12).map(([x, y]) => [x, y]).concat([[cx, cy]]), hex('#e8e0cc'));
  for (const [k, r] of [[0.45, 3], [0.75, 2]]) { const x = Math.round(cx + (hx - cx) * k), y = Math.round(cy + H / 2 + (hy - cy - H / 2) * k); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); } };
'''

# ───────────────────────────────────────────────────────────── gz-herodoto ──
E['gz-herodoto'] = ('Heródoto', '''// GZ-HERODOTO (frase 24), hacia el 450 a. C. (barra -450). Tres planos:
// 1. (LOCAL) la barca de vela del viajero de cerca, en mitad del lago: Heródoto lee su rollo en la proa mientras el guía
//    lleva el remo de popa y le habla; en «450» señala adelante; en «BC» una racha hincha la vela; nenúfares y ondas que
//    pasan, nubes, ibis, una barquilla lejana y la bruma que tapa la orilla. Corta en «the Greek».
// 2. hawara/lago: la barca cruza el lago; en «lake»–«building» el laberinto sale de la bruma; Heródoto señala en «saw» y
//    en «speechless» se queda boquiabierto con los brazos arriba. Corta en «He wrote».
// 3. hawara/lago/patio: Heródoto y el guía entran (las columnas grandes los tapan al pasar), Heródoto se planta en el
//    haz de sol, abre el rollo y escribe; en «pyramids» le sale un globo: el laberinto (grande) > la pirámide (pequeña).''', UTIL + r'''
const P2 = en('herodoto', .378), P3 = en('herodoto', .808);
const anyo = en('herodoto', .224), bc = en('herodoto', .287), lago = en('herodoto', .603), vio = en('herodoto', .639), edif = en('herodoto', .664), mudo = en('herodoto', .733);
const surpass = en('herodoto', .891), piram = en('herodoto', .954);
// ── plano 1: la barca de cerca ──
const CIELO1 = RA('#6c9ad6', '#80a8de', '#98b8e4', '#b2c8e8', '#ccd8e6', '#e4e2d4');
const AGUA = RA('#a8c4d0', '#8ab0c8', '#6c98b8', '#5284a8', '#3e6e96', '#2e5a82', '#244a70');
const fondo1 = fijo(() => {
  cieloT(76, CIELO1);
  // la sierra lejana con calima y la bruma que esconde la orilla
  for (let x = 0; x < 320; x++) { const yr = Math.round(64 + Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11 + 1) * 1.5 + h(x >> 2, 0, 5) * 1.5);
    for (let y = yr; y < 80; y++) R.pset(x, y, tono(RA('#c4c0b4', '#b4b0a6', '#d6d0c0', '#e6e0d0'), (y - yr) / 4 + h(x, y, 6) * 0.4, x, y)); }
  for (let y = 70; y < 82; y++) for (let x = 0; x < 320; x++) if ((BY[(y & 3) * 4 + (x & 3)] / 16) < 0.75 - Math.abs(y - 76) / 8) R.pset(x, y, hex('#ece6d6'));
  // palmeras lejanas, apenas siluetas en la bruma
  for (const px of [22, 60, 74, 250, 268, 300]) { R.linea(px, 79, px + 1, 71, hex('#a8a89a')); for (const d of [-3, -2, 2, 3]) R.linea(px + 1, 71, px + 1 + d, 72 + Math.abs(d) / 2, hex('#9aa092')); }
  // el agua: degradado tramado con rayas de ola
  for (let y = 80; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 80) / 100 * 6.3 + (h(x >> 4, y >> 1, 7) - 0.5) * 0.6 + (Math.sin(x * 0.09 + y * 0.7) > 0.86 ? -1 : 0); R.pset(x, y, tono(AGUA, v, x, y)); }
});
const casco = (bx, by) => {   // el casco de madera de la barca (por delante de los personajes): la borda en y≈by
  const top = (x) => by + 3 + Math.round(Math.pow(Math.abs(x - 160) / 140, 3) * -22);
  const pts = []; for (let x = 22; x <= 300; x += 6) pts.push([x + bx, top(x)]); pts.push([300 + bx, top(300)], [272 + bx, by + 26], [64 + bx, by + 28], [22 + bx, top(22)]);
  R.poligono(pts.map(([x, y]) => [x - 1, y - 1]).concat([]), K);
  R.poligono(pts, (x, y) => { const v = (y - by) / 30 * 4 + (y % 5 === 0 ? 1.2 : 0) + (h(x >> 3, y, 9) - 0.5) * 0.5; return tono(RA('#c88a4a', '#a86e34', '#8a5626', '#6a3e1a', '#4a2a12'), v, x, y); });
  for (let x = 26; x <= 296; x++) { const y = top(x - bx); R.pset(x + bx, y, hex('#e0a868')); R.pset(x + bx, y + 1, hex('#d89a58'));
    const seg = Math.floor((x - 26) / 10) % 4; R.pset(x + bx, y + 4, [hex('#3a6ab0'), hex('#e0b040'), hex('#c04030'), hex('#3a8a5a')][seg]); R.pset(x + bx, y + 5, [hex('#2a4a80'), hex('#b08a28'), hex('#902818'), hex('#2a6a40')][seg]); }
  for (let x = 40; x < 290; x += 22) for (let y = by + 2; y < by + 24; y++) if (y < top(x) + 30) R.pset(x + bx, y, hex('#5a3418'));
  // el ojo pintado de la proa
  R.dibujo(['...kkkkk...', '.kkWWWWWkk.', 'kWWWkkkWWWk', '.kkWWkWWkk.', '...kkkkkk..', '......k....', '.....k.....'], 266 + bx, by - 6, 1, { k: K, W: BL });
  for (let x = 30; x < 296; x += 3) { const y = top(x) + 9 + Math.round(Math.sin(x * 0.4) * 1); R.pset(x + bx, y, hex('#e0a868')); }
};
const p1 = (t) => {
  fondo1();
  nubes(t, [[20, 34, 30, 2, 280], [140, 52, 44, 3.5], [260, 64, 26, 6]]);
  T.bandada(R, t, { tipo: 'ibis', n: 4, y: 44, cada: 9 });
  // una barquilla lejana con su vela pequeña
  { const x = Math.round(30 + t * 3), y = 79; R.rect(x - 4, y, x + 4, y + 1, hex('#5a4a3a')); R.poligono([[x, y - 7], [x + 4, y - 1], [x, y - 1]], hex('#f4eedc')); R.linea(x, y - 7, x, y, hex('#5a4a3a')); }
  // ondas y destellos que pasan (vamos hacia la derecha: el agua corre a la izquierda)
  for (let k = 0; k < 46; k++) { const y = 84 + Math.round(h(k, 1, 11) * 90), v = 4 + (y - 80) * 0.35, L = 2 + Math.round((y - 80) / 14), x = Math.round(((h(k, 2, 11) * 360 - t * v) % 360 + 360) % 360 - 20);
    R.rect(x, y, x + L, y, (k % 3) ? hex('#c8dce4') : hex('#f4fbff')); }
  const dy = Math.round(Math.sin(t * 1.7) * 1.2), by = 134 + dy, racha = tramo(t, bc - 0.2, bc + 0.5) - tramo(t, bc + 1.2, bc + 2.2);
  // el mástil, la verga y la vela (detrás de los personajes), con su panza que respira y la racha en «BC»
  const mx = 180; R.rect(mx - 1, 24 + dy, mx + 1, by, K); R.rect(mx, 25 + dy, mx, by, hex('#8a5a2a'));
  R.rect(124, 28 + dy, 236, 30 + dy, K); R.rect(125, 29 + dy, 235, 29 + dy, hex('#a8743a'));
  const panza = 3 + Math.sin(t * 2.1) * 1.5 + racha * 6;
  R.poligono([[126, 31 + dy], [234, 31 + dy], [236 + panza, 70 + dy], [230 + panza * 0.6, 108 + dy], [130 - panza * 0.3, 108 + dy], [124 + panza * 0.5, 70 + dy]], K);
  R.poligono([[127, 32 + dy], [233, 32 + dy], [235 + panza, 70 + dy], [229 + panza * 0.6, 107 + dy], [131 - panza * 0.3, 107 + dy], [125 + panza * 0.5, 70 + dy]], (x, y) => tono(RA('#fffaf0', '#f2ead6', '#dcd0b4', '#c4b494'), (x - 127) / 108 * 2.4 + Math.sin((x - 127) * 0.33) * 0.4 + (y - 32 - dy) / 80 * 0.6, x, y));
  for (let x = 140; x < 232; x += 13) R.linea(x, 32 + dy, x + Math.round(panza * 0.4), 106 + dy, hex('#cabb98'));
  R.linea(180, 24 + dy, 26, by - 26, hex('#4a3020')); R.linea(180, 24 + dy, 300, by - 30, hex('#4a3020'));
  // el remo de popa, que el guía mece
  const a = Math.sin(t * 1.3) * 0.12, gx = 54;
  R.linea(gx + 10, by - 10, Math.round(gx - 26 + a * 60), 172, K); R.linea(gx + 11, by - 10, Math.round(gx - 25 + a * 60), 172, hex('#8a5a2a'));
  R.poligono([[gx - 30 + a * 60, 160], [gx - 22 + a * 60, 160], [gx - 24 + a * 60, 176], [gx - 32 + a * 60, 176]].map(([x, y]) => [Math.round(x), y]), hex('#6a4220'));
  if (Math.sin(t * 1.3) > 0.85) for (let i = 0; i < 4; i++) R.pset(Math.round(gx - 30 + a * 60 + i * 3), 158 - (i % 2), BL);
  // los personajes
  const lee = t < 2.9, señala = t > anyo && t < anyo + 1.8;
  R.actor(EL.guiaEgipcio450, gx, by, t, { dir: 1, sostiene: [gx + 13, by - 13], habla: t > 0.9 && t < 2.7 && Math.sin(t * 8) > -0.2, sonrisa: t > 3 });
  const H = R.actor(EL.herodoto, 236, by, t, { dir: 1, sostiene: lee, dedo: señala, sorpresa: t > bc && t < bc + 0.8 });
  if (lee) rollo(H.mano[0] - 4, H.mano[1], tramo(t, 0.2, 0.7), 0);
  casco(0, by);
  // los nenúfares del primer plano, que pasan por delante del casco
  for (let k = 0; k < 5; k++) { const x = Math.round(((k * 97 + 40 - t * 22) % 400 + 400) % 400 - 40), y = 170 + (k % 3) * 3;
    R.disco(x, y, 6, K); R.disco(x, y, 5, hex('#3a8a4a')); R.disco(x - 1, y - 1, 3, hex('#5aaa5a')); R.linea(x, y, x + 5, y - 1, hex('#2a6a3a'));
    if (k % 2) { R.disco(x + 2, y - 3, 2, hex('#f0a0c0')); R.pset(x + 2, y - 4, BL); } }
};
// ── plano 2: el lago, el laberinto sale de la bruma ──
const p2 = (t) => {
  const u = tramo(t, P2 + 0.2, mudo - 0.3), o = { encuadre: 'lago', revela: tramo(t, lago - 0.2, edif + 0.5), barca: Math.round(lerp(64, 150, u * (2 - u))), vela: 1 };
  const r = T.hawara(R, t, o), b = r.barca ?? { x: o.barca, suelo: 156 };
  R.actor(EL.guiaEgipcio450, b.x + 22, b.suelo, t, { dir: 1, habla: t > mudo + 0.3 && Math.sin(t * 8) > 0 });
  const asombro = t > mudo && t < mudo + 1.0;
  const lee = t < en('herodoto', .52);
  const H = R.actor(EL.herodoto, b.x - 10, b.suelo, t, { dir: 1, dedo: t > vio && t < mudo, brazos: asombro, sorpresa: t > edif, sostiene: lee });
  if (lee) rollo(H.mano[0] - 4, H.mano[1], 1 - tramo(t, en('herodoto', .49), en('herodoto', .52)), 0.6);
  T.hawaraDelante(R, t, o);
};
// ── plano 3: el patio techado ──
const p3 = (t) => {
  const o = { encuadre: 'lago', camara: 'patio' };
  T.hawara(R, t, o);
  const u = tramo(t, P3 + 0.05, P3 + 1.25), v = tramo(t, P3, P3 + 1.45);
  const gx = Math.round(lerp(-34, 200, v)), hx = Math.round(lerp(-14, 140, u));
  R.actor(EL.guiaEgipcio450, gx, 160, t, { dir: v < 1 ? 1 : -1, anda: v > 0 && v < 1, dedo: v >= 1 && t < piram, habla: v >= 1 && Math.sin(t * 7) > 0 });
  const escribe = u >= 1 && t > surpass - 0.6;
  const H = R.actor(EL.herodoto, hx, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: escribe ? true : false, sonrisa: t > piram });
  if (escribe) { const [mx, my] = H.mano; rollo(mx - 6, my, tramo(t, surpass - 0.6, surpass - 0.1), tramo(t, surpass, piram + 0.8));
    const px = mx - 4 + Math.round(tramo(t, surpass, piram + 0.8) * 8) + (Math.sin(t * 20) > 0 ? 1 : 0); R.linea(px, my - 4, px + 3, my - 9, K); R.linea(px + 1, my - 4, px + 3, my - 8, hex('#c8a46a')); }
  T.hawaraDelante(R, t, o);
  // el globo: el laberinto (grande) supera a la pirámide (pequeña)
  const g = tramo(t, piram - 0.1, piram + 0.25);
  if (g > 0) { globo(150, 98, 70, 30, hx + 8, 134, g);
    if (g > 0.6) { const c1 = hex('#e8dcc0'), c2 = hex('#8a6a3e');
      // el laberinto: una fachada de columnas, ancha
      R.rect(122, 92, 152, 106, K); R.rect(123, 93, 151, 105, c1); R.rect(123, 93, 151, 95, hex('#c04030')); for (let x = 125; x < 151; x += 4) R.rect(x, 97, x + 1, 105, c2);
      R.numero('>', 158, 105, { centro: true });
      R.poligono([[166, 106], [172, 98], [178, 106]], K); R.poligono([[168, 105], [172, 100], [176, 105]], hex('#a8805a')); R.linea(172, 100, 176, 105, hex('#76563a')); } }
};
const efectos = [[1.2, 'ola'], [2.95, 'papel'], [bc, 'viento'], [P2 + 0.4, 'ola'], [edif, 'brillo'], [mudo, 'pop'], [surpass - 0.5, 'papel'], [surpass + 0.1, 'lapiz'], [piram, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: -450 });
''')

# ───────────────────────────────────────────────────────────── gz-escalera ──
E['gz-escalera'] = ('La escalera', '''// GZ-ESCALERA (frase 25), hacia el 450 a. C. (barra -450). Cuatro planos:
// 1. hawara/escalera/pasillos: el guía con su candil y Heródoto avanzan por el laberinto de columnas; en «12» y en
//    «3,000» salen las cifras; Heródoto se para y mira a un lado y a otro. Corta en «1,500».
// 2. (LOCAL) el laberinto en corte: arriba, la planta de las salas con sus lámparas; bajo el suelo, dos filas de salas a
//    oscuras y la escalera con su guardián; «1,500» arriba en «above» (las salas se encienden) y «1,500» abajo en «below»;
//    en «walked» Heródoto y el guía cruzan las salas de arriba de puerta en puerta. Corta en «But».
// 3. hawara/escalera (gag 8): Heródoto va hacia la escalera, el guardián le dice que no con el dedo y cierra la puerta en
//    «lower ones»; el portazo levanta polvo y le vuela el sombrero, que cae lejos; Heródoto vuelve y lo recoge; el guía se
//    encoge de hombros. Corta en «tombs».
// 4. (LOCAL) la pintura del muro de cerca, a la luz del candil: el rey en su trono (en «kings») y el cocodrilo sagrado
//    con el disco solar (en «crocodiles», le brilla el ojo); el guardián lo cuenta y lo señala.''', UTIL + r'''
const P2 = en('escalera', .233), P3 = en('escalera', .514), P4 = en('escalera', .783);
const doce = en('escalera', .063), tres = en('escalera', .149), arriba = en('escalera', .267), abajo = en('escalera', .358), anda = en('escalera', .41);
const nolet = en('escalera', .576), cierra = en('escalera', .60), golpe = en('escalera', .645), they = en('escalera', .686);
const reyes = en('escalera', .818), cocod = en('escalera', .945), sacred = en('escalera', .926);
// ── plano 1: los pasillos ──
const p1 = (t) => {
  T.hawara(R, t, { encuadre: 'escalera', camara: 'pasillos' });
  const u = tramo(t, 0.2, 3.5), gx = Math.round(lerp(78, 170, u)), hx = Math.round(lerp(40, 132, u));
  const G = R.actor(EL.guiaEgipcio450, gx, 168, t, { dir: u < 1 ? 1 : -1, anda: u > 0 && u < 1, sostiene: true, habla: u >= 1 && Math.sin(t * 8) > 0 });
  candil(G.mano[0], G.mano[1], t);
  const mira = u >= 1 ? (Math.floor((t - 3.5) * 1.3) % 2 ? -1 : 1) : 1;
  R.actor(EL.herodoto, hx, 168, t, { dir: mira, anda: u > 0 && u < 1, sorpresa: t > tres && t < tres + 1.2 });
  const a = tramo(t, doce, doce + 0.3), b = tramo(t, tres, tres + 0.4);
  if (a > 0) R.numero('12', 104, Math.round(lerp(78, 66, a)), { tam: 16, centro: true });
  if (b > 0) R.numero('3,000', 216, Math.round(lerp(78, 66, b)), { tam: 16, centro: true });
};
// ── plano 2: el laberinto en corte ──
const PIEDRA = RA('#f2e4c4', '#e4d2aa', '#d2bc90', '#bca274', '#a0865a');
const TIERRA = RA('#c8a870', '#b08e5a', '#967448', '#7a5c38', '#5e462a', '#46341f');
const SALA = RA('#2a2c3c', '#22232f', '#1a1a24');
const XS = [14, 58, 102, 146, 190, 234, 278, 306];
const fondo2 = fijo(() => {
  cieloT(96, RA('#6a9ad8', '#7eaade', '#96bae4', '#aecae8', '#c8d8e8', '#e0e2d8'));
  // la pirámide de adobe detrás, a la izquierda
  R.poligono([[34, 54], [86, 22], [138, 54]], K); R.poligono([[35, 54], [86, 23], [86, 54]], (x, y) => tono(RA('#c49a6a', '#a8805a', '#8a6646'), (y % 4 === 0 ? 1 : 0) + h(x >> 1, y, 2) * 0.6, x, y));
  R.poligono([[86, 23], [137, 54], [86, 54]], (x, y) => tono(RA('#8a6646', '#76563a', '#5e442c'), (y % 4 === 0 ? 1 : 0) + h(x >> 1, y, 2) * 0.6, x, y));
  // palmeras a la derecha (quietas aquí: las hojas se mecen en el dibujo de cada fotograma)
  // la tierra bajo el suelo, con estratos y piedras
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(TIERRA, (y - 96) / 84 * 5 + Math.sin(x * 0.05 + y * 0.2) * 0.3 + (h(x >> 2, y >> 1, 4) - 0.5) * 0.7, x, y));
  for (let k = 0; k < 140; k++) { const x = Math.round(h(k, 1, 8) * 320), y = 100 + Math.round(h(k, 2, 8) * 78); R.rect(x, y, x + 2, y + 1, hex('#d8c094')); R.pset(x, y + 2, hex('#5e462a')); }
  // las salas de abajo: dos filas de cámaras de piedra a oscuras, con tinajas y una estatuilla de cocodrilo
  for (const [y0, y1] of [[104, 134], [142, 172]]) for (let i = 0; i < 6; i++) { const x0 = 20 + i * 46, x1 = x0 + 38;
    R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#6a5a44')); for (let y = y0 - 2; y <= y1 + 2; y += 4) R.rect(x0 - 2, y, x1 + 2, y, hex('#544632'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(SALA, (y - y0) / (y1 - y0) * 1.5 + h(x >> 2, y >> 2, i) * 0.8, x, y));
    const cx = x0 + 12 + (i % 3) * 6; if ((i + y0) % 3 === 0) { R.rect(cx - 3, y1 - 8, cx + 3, y1, hex('#3a3444')); R.rect(cx - 2, y1 - 10, cx + 2, y1 - 9, hex('#3a3444')); }
    else if ((i + y0) % 3 === 1) { R.rect(cx - 8, y1 - 3, cx + 8, y1, hex('#36404a')); R.rect(cx + 6, y1 - 5, cx + 10, y1 - 3, hex('#36404a')); R.pset(cx + 9, y1 - 5, hex('#4a5a5a')); }
    else { R.rect(cx - 6, y1 - 6, cx + 6, y1, hex('#34303e')); R.rect(cx - 6, y1 - 6, cx + 6, y1 - 6, hex('#44404e')); } }
  // la escalera que baja desde la sala del extremo derecho
  for (let k = 0; k < 9; k++) { const x = 268 - k * 4, y = 100 + k * 4; R.rect(x - 6, y, x + 6, y + 3, hex('#4a3c2c')); R.rect(x - 6, y, x + 6, y, hex('#8a7454')); }
  // el suelo y la arena de fuera
  R.rect(0, 92, 13, 97, hex('#e8cc8a')); R.rect(307, 92, 319, 97, hex('#e8cc8a')); for (let x = 0; x < 320; x += 3) R.pset(x, 92 + (x % 2), hex('#c4a060'));
  // la planta de arriba: muros, salas con friso, columnas y hornacinas
  R.rect(12, 50, 308, 58, K); for (let y = 51; y <= 57; y++) for (let x = 13; x <= 307; x++) R.pset(x, y, tono(PIEDRA, (y - 51) / 6 * 2 + h(x >> 3, 1, 9) * 0.5, x, y));
  R.rect(13, 51, 307, 52, hex('#fbf2dc')); for (let x = 14; x < 306; x += 5) R.rect(x, 54, x + 2, 55, [hex('#3a6ab0'), hex('#c04030'), hex('#e0b040')][Math.floor(x / 5) % 3]);
  for (let i = 0; i < 7; i++) { const x0 = XS[i] + 4, x1 = XS[i + 1] - 1;
    for (let y = 58; y < 96; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(PIEDRA, 1 + (y - 58) / 38 * 2.2 + (h(x >> 3, y >> 2, 10 + i) - 0.5) * 0.6 + ((y - 58) % 7 === 0 ? 0.8 : 0), x, y));
    for (let x = x0; x <= x1; x++) { R.pset(x, 61, [hex('#3a6ab0'), hex('#e0b040'), hex('#c04030'), hex('#3a8a5a')][Math.floor(x / 3) % 4]); R.pset(x, 62, hex('#8a6a3e')); }
    for (let k = 0; k < 3; k++) { const x = x0 + 6 + k * 11; for (let y = 66; y < 80; y += 3) R.rect(x, y, x + 1, y, hex('#a0865a')); }
    const nx = Math.round((x0 + x1) / 2); R.rect(nx - 4, 70, nx + 4, 78, hex('#5a4630')); R.rect(nx - 3, 71, nx + 3, 78, hex('#3a2a1c'));
    R.rect(x0, 94, x1, 95, hex('#a0865a')); }
  // los muros entre salas: dintel arriba (las puertas quedan abiertas en el corte)
  for (const x of XS) { R.rect(x, 58, x + 3, 70, K); R.rect(x + 1, 58, x + 2, 69, hex('#d2bc90')); if (x === 14 || x === 306) R.rect(x, 58, x + 3, 96, hex('#bca274')); }
  R.rect(12, 96, 308, 99, K); for (let x = 13; x <= 307; x++) { R.pset(x, 97, hex('#e4d2aa')); R.pset(x, 98, hex('#bca274')); }
  R.rect(258, 96, 276, 99, hex('#4a3c2c'));   // el hueco de la escalera
});
const p2 = (t) => {
  fondo2();
  nubes(t, [[10, 30, 26, 2, 270], [150, 40, 34, 4]]);
  T.bandada(R, t, { tipo: 'ibis', n: 3, y: 26, cada: 7 });
  // las lámparas de las hornacinas; en «above» las salas se encienden una a una
  const ar = tramo(t, arriba - 0.1, arriba + 0.7), ab = tramo(t, abajo - 0.1, abajo + 0.6);
  for (let i = 0; i < 7; i++) { const nx = Math.round((XS[i] + 4 + XS[i + 1] - 1) / 2), f = Math.sin(t * 13 + i * 2) > 0 ? 1 : 0;
    if (ar * 7 > i) R.halo(nx, 74, 12, [hex('#c8a060'), hex('#e8c078'), hex('#f8e0a0')], 0.8);
    R.rect(nx - 1, 76, nx + 1, 77, hex('#b8703a')); R.pset(nx, 75 - f, hex('#ffd060')); R.pset(nx, 74 - f, hex('#fff0b0')); }
  if (ab > 0) for (const [y0, y1] of [[104, 134], [142, 172]]) for (let i = 0; i < 6; i++) if (ab * 6 > i) { const x0 = 20 + i * 46; R.rect(x0 - 2, y0 - 2, x0 + 40, y0 - 2, hex('#e8c078')); R.rect(x0 - 2, y1 + 2, x0 + 40, y1 + 2, hex('#e8c078')); R.rect(x0 - 2, y0 - 2, x0 - 2, y1 + 2, hex('#e8c078')); R.rect(x0 + 40, y0 - 2, x0 + 40, y1 + 2, hex('#e8c078')); }
  // el guardián arriba de la escalera, y Heródoto con el guía, de sala en sala
  R.actor(EL.guardian450, 262, 96, t, { dir: -1, enfado: t > P3 - 1.2 });
  const u = tramo(t, anda, P3 + 0.1), gx = Math.round(lerp(38, 150, u)), hx = Math.round(lerp(19, 128, u));
  const G = R.actor(EL.guiaEgipcio450, gx, 96, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true }); candil(G.mano[0], G.mano[1], t);
  R.actor(EL.herodoto, hx, 96, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true });
  const a = tramo(t, arriba, arriba + 0.3), b = tramo(t, abajo, abajo + 0.3);
  if (a > 0) R.numero('1,500', 176, Math.round(lerp(50, 42, a)), { tam: 16, centro: true });
  if (b > 0) R.numero('1,500', 160, Math.round(lerp(146, 140, b)), { tam: 16, centro: true });
};
// ── plano 3: la puerta de la escalera (gag 8) ──
const p3 = (t) => {
  const o = { encuadre: 'escalera', puerta: tramo(t, cierra, golpe), portazo: tramo(t, golpe, golpe + 0.8) };
  const r = T.hawara(R, t, o), [gdx, gdy] = r.guardian ?? [206, 150];
  R.actor(EL.guardian450, gdx - 7, gdy, t, { dir: -1, enfado: t > nolet - 0.4, dedo: t > nolet - 0.3 && t < cierra + 0.1, habla: t > nolet - 0.3 && t < cierra && Math.sin(t * 9) > 0 });
  // Heródoto llega; el portazo le vuela el sombrero; vuelve a por él
  const ida = tramo(t, P3 + 0.1, nolet - 0.2), vuelta = tramo(t, they - 0.1, they + 1.0), hat = tramo(t, golpe + 0.05, golpe + 0.95);
  const hx = Math.round(lerp(40, 160, ida) - (160 - 92) * vuelta), sinSombrero = t > golpe + 0.05 && t < they + 1.2;
  const G = R.actor(EL.guiaEgipcio450, Math.round(lerp(4, 70, tramo(t, P3 + 0.4, nolet + 0.4))), 168, t, { dir: 1, anda: t > P3 + 0.4 && t < nolet + 0.4, sostiene: t < golpe + 0.3 || t > golpe + 1.2, brazos: t > golpe + 0.3 && t < golpe + 1.2, habla: t > they + 1.3 && Math.sin(t * 8) > 0 });
  if (t < golpe + 0.3 || t > golpe + 1.2) candil(G.mano[0], G.mano[1], t);
  R.actor(EL.herodoto, hx, 166, t, { dir: vuelta > 0 && vuelta < 1 ? -1 : 1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), tocado: sinSombrero ? '' : undefined,
    sorpresa: t > golpe && t < they + 0.3, salto: t > golpe && t < golpe + 0.25 ? 2 : 0, sonrisa: t > they + 1.3 });
  T.hawaraDelante(R, t, o);
  // el sombrero vuela girando y cae al suelo
  if (t > golpe + 0.05 && t < they + 1.2) { const x0 = 160, y0 = 138, xf = 92, yf = 166;
    const pos = (q) => [Math.round(lerp(x0, xf, q)), Math.round(y0 + (yf - y0) * q - Math.sin(Math.PI * q) * 44)], [x, y] = pos(hat);
    if (hat < 1) { R.rect(x + 2, yf - 1, x + 12, yf, hex('#9a8a6a')); R.rect(x + 4, yf, x + 10, yf, hex('#7a6a4e'));   // la sombra en el suelo
      for (let k = 1; k <= 4; k++) { const q = Math.max(0, hat - k * 0.05); if (q <= 0) break; const [ax, ay] = pos(q), [bx, by] = pos(Math.max(0, q + 0.05));
        for (const d of [-2, 1]) R.linea(ax + 7, ay - 3 + d, bx + 7, by - 3 + d, k < 3 ? hex('#fff4d8') : hex('#e8dcc0')); } }
    sombrero(x, y, hat < 1 ? Math.floor(t * 10) % 2 : 0, hat < 1 && Math.floor(t * 5) % 2 ? -1 : 1);
    if (t < golpe + 0.9) R.icono('!', hx + 5, 116, hex('#ffd060'), K, 2);
    if (hat >= 1 && t < golpe + 1.3) for (let i = 0; i < 5; i++) R.pset(x + i * 3, yf - 1 - (i % 2), hex('#d8c8a0')); }
};
// ── plano 4: la pintura del muro a la luz del candil ──
const MURO = RA('#e8d6ae', '#d8c296', '#c4aa7e', '#a88e64', '#8a7250');
const pintaMural = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 15), jx = (x + (fila % 2) * 22) % 44, jy = y % 15;
    R.pset(x, y, jx === 0 || jy === 0 ? hex('#8a7250') : tono(MURO, 0.8 + (h(Math.floor((x + (fila % 2) * 22) / 44), fila, 3) - 0.5) * 1.4 + (h(x >> 1, y >> 1, 4) - 0.5) * 0.6 + (jy === 1 ? -0.6 : 0), x, y)); }
  // el zócalo y el suelo de losas
  for (let y = 140; y < 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#7a5e3e', '#62492e', '#4e3a24'), (y - 140) / 12 * 2 + h(x >> 2, y, 5) * 0.5, x, y));
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const w = 40 + (y - 152) * 2; R.pset(x, y, (x + Math.floor((y - 152) / 9) * 17) % w === 0 || (y - 152) % 9 === 0 ? hex('#6a5438') : tono(RA('#c8b08a', '#b49a74', '#9a805c'), (y - 152) / 28 * 1.5 + h(x >> 3, y >> 2, 6) * 0.9, x, y)); }
  // el panel pintado
  const X0 = 22, X1 = 268, Y0 = 26, Y1 = 132;
  R.rect(X0 - 2, Y0 - 2, X1 + 2, Y1 + 2, K);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, tono(RA('#f2e6c6', '#e8d8b0', '#dcc898'), 0.6 + (h(x >> 2, y >> 2, 7) - 0.5) * 1.2 + (h(x >> 4, y >> 4, 8) > 0.85 ? 1 : 0), x, y));
  const CB = [hex('#3a6ab0'), hex('#c04030'), hex('#e0b040'), hex('#3a8a5a')];
  for (let x = X0; x <= X1; x++) { const c = CB[Math.floor((x - X0) / 6) % 4]; R.rect(x, Y0, x, Y0 + 3, c); R.rect(x, Y1 - 3, x, Y1, c); }
  for (let y = Y0; y <= Y1; y++) { const c = CB[Math.floor((y - Y0) / 6) % 4]; R.rect(X0, y, X0 + 3, y, c); R.rect(X1 - 3, y, X1, y, c); }
  // el friso de arriba (kheker)
  for (let x = X0 + 6; x < X1 - 6; x += 6) { R.rect(x, Y0 + 5, x + 3, Y0 + 11, hex('#3a8a5a')); R.rect(x + 1, Y0 + 5, x + 2, Y0 + 6, hex('#c04030')); R.pset(x + 1, Y0 + 12, K); R.pset(x + 2, Y0 + 12, K); }
  // el rey en su trono (de perfil, mirando a la derecha)
  const kx = 46, ky = 118;
  R.rect(kx - 2, ky - 26, kx + 18, ky, K); R.rect(kx - 1, ky - 25, kx + 17, ky - 1, hex('#e0b040'));
  for (let y = ky - 22; y < ky - 2; y += 4) for (let x = kx; x < kx + 16; x += 4) { R.rect(x, y, x + 2, y + 1, hex('#3a6ab0')); R.pset(x + 3, y + 2, hex('#c04030')); }
  R.rect(kx + 12, ky - 36, kx + 26, ky - 24, K); R.rect(kx + 13, ky - 35, kx + 25, ky - 25, BL);   // el faldellín
  R.rect(kx + 22, ky - 24, kx + 30, ky - 20, K); R.rect(kx + 23, ky - 23, kx + 29, ky - 21, hex('#b05a34'));   // el muslo
  R.rect(kx + 27, ky - 22, kx + 31, ky - 1, K); R.rect(kx + 28, ky - 21, kx + 30, ky - 2, hex('#b05a34')); R.rect(kx + 27, ky - 2, kx + 35, ky, K);   // la pierna y el pie
  R.rect(kx + 13, ky - 54, kx + 25, ky - 35, K); R.rect(kx + 14, ky - 53, kx + 24, ky - 36, hex('#b05a34')); R.rect(kx + 14, ky - 48, kx + 24, ky - 46, hex('#e0b040'));   // el torso y el collar
  R.rect(kx + 14, ky - 68, kx + 28, ky - 53, K); R.rect(kx + 15, ky - 67, kx + 27, ky - 54, hex('#b05a34'));   // la cabeza
  R.poligono([[kx + 10, ky - 72], [kx + 26, ky - 72], [kx + 22, ky - 64], [kx + 18, ky - 48], [kx + 10, ky - 50]], K);
  R.poligono([[kx + 11, ky - 71], [kx + 25, ky - 71], [kx + 21, ky - 64], [kx + 17, ky - 49], [kx + 11, ky - 51]], (x, y) => (y % 3 === 0 ? hex('#3a6ab0') : hex('#e0b040')));   // el nemes a rayas
  R.rect(kx + 25, ky - 62, kx + 26, ky - 61, K); R.rect(kx + 26, ky - 58, kx + 27, ky - 57, hex('#7a3a20'));   // el ojo y la boca
  R.rect(kx + 22, ky - 55, kx + 23, ky - 50, hex('#5a4a8a'));   // la barba postiza
  R.linea(kx + 30, ky - 50, kx + 34, ky - 34, K); R.linea(kx + 34, ky - 50, kx + 30, ky - 54, K); R.linea(kx + 31, ky - 50, kx + 35, ky - 34, hex('#e0b040'));   // el cayado
  R.rect(kx + 24, ky - 46, kx + 32, ky - 42, K); R.rect(kx + 25, ky - 45, kx + 31, ky - 43, hex('#b05a34'));   // el brazo
  // columnas de trazos (sin letras) entre los dos
  for (let c = 0; c < 4; c++) { const x = 98 + c * 9; R.linea(x - 2, Y0 + 16, x - 2, Y1 - 8, hex('#a0865a')); for (let y = Y0 + 18; y < Y1 - 10; y += 5) { const k = Math.floor(h(c, y, 9) * 4);
    if (k === 0) R.rect(x, y, x + 3, y + 1, hex('#3a6ab0')); else if (k === 1) { R.pset(x + 1, y, hex('#c04030')); R.pset(x + 2, y + 1, hex('#c04030')); } else if (k === 2) R.rect(x, y + 1, x + 4, y + 1, hex('#3a2a1a')); else R.disco(x + 2, y + 1, 1, hex('#3a8a5a')); } }
  // el altar a rayas y el cocodrilo sagrado con el disco solar y las plumas
  const ax = 140, ay = 116;
  R.rect(ax, ay, ax + 118, ay + 12, K); for (let x = ax + 1; x < ax + 118; x++) for (let y = ay + 1; y < ay + 12; y++) R.pset(x, y, [hex('#e0b040'), hex('#3a6ab0'), hex('#c04030'), hex('#f2e6c6')][Math.floor((x - ax) / 4) % 4]);
  R.rect(ax, ay, ax + 118, ay + 1, hex('#fff2c8'));
  const CR = RA('#7ab05a', '#5a9a46', '#3e7a34', '#2a5a26');
  const cuerpo = [[150, 104], [164, 98], [190, 96], [218, 97], [236, 100], [252, 98], [262, 90], [258, 104], [244, 110], [214, 112], [180, 112], [160, 112], [146, 110]];
  R.poligono(cuerpo.map(([x, y]) => [x, y - 1]), K); R.poligono(cuerpo.map(([x, y]) => [x - 1, y + 1]), K); R.poligono(cuerpo, (x, y) => tono(CR, (y - 96) / 16 * 3 + ((x + y) % 5 === 0 ? 0.8 : 0), x, y));
  for (let x = 166; x < 240; x += 5) { R.pset(x, 97 + (x % 2), hex('#a8d07a')); R.pset(x + 2, 99, hex('#2a5a26')); }
  R.poligono([[146, 104], [150, 100], [164, 98], [162, 106], [146, 108]], K); R.poligono([[147, 104], [151, 101], [163, 99], [161, 106], [147, 107]], hex('#5a9a46'));   // la cabeza
  R.poligono([[128, 104], [148, 102], [148, 107], [128, 106]], K); R.poligono([[129, 104], [147, 103], [147, 106], [129, 105]], hex('#7ab05a'));   // el hocico
  for (let x = 131; x < 146; x += 3) R.pset(x, 106, BL);
  for (const [lx, ly] of [[170, 112], [190, 112], [222, 112], [240, 112]]) { R.rect(lx, ly, lx + 4, ly + 4, K); R.rect(lx + 1, ly, lx + 3, ly + 3, hex('#3e7a34')); }
  R.disco(158, 86, 8, K); R.disco(158, 86, 7, hex('#d84a2a')); R.disco(156, 84, 3, hex('#f07a4a'));   // el disco solar
  R.poligono([[150, 90], [152, 74], [156, 90]], K); R.poligono([[162, 90], [166, 72], [168, 90]], K); R.poligono([[151, 89], [152, 76], [155, 89]], hex('#3a6ab0')); R.poligono([[163, 89], [166, 74], [167, 89]], hex('#3a6ab0'));
  // ofrendas en la base: dos tinajas y un ramo de loto
  for (const vx of [276, 300]) { R.disco(vx, 158, 6, K); R.disco(vx, 158, 5, hex('#b06a3a')); R.rect(vx - 2, 150, vx + 2, 153, K); R.rect(vx - 1, 151, vx + 1, 152, hex('#c88a5a')); R.pset(vx - 2, 156, hex('#e8a070')); }
};
const brillo4 = fijo(pintaMural);
let medio4 = null, oscuro4 = null;
const capas4 = () => { if (oscuro4) return; const prev = R.usar(R.nuevo()); brillo4(); const base = new Uint32Array(320 * 180); for (let i = 0; i < base.length; i++) base[i] = R.pget(i % 320, Math.floor(i / 320));
  const mez = (c, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, d = [26, 18, 24]; return (0xff000000 | (Math.round(b + (d[2] - b) * a) << 16) | (Math.round(g + (d[1] - g) * a) << 8) | Math.round(r + (d[0] - r) * a)) >>> 0; };
  medio4 = base.map((c) => mez(c, 0.42)); oscuro4 = base.map((c) => mez(c, 0.72)); R.usar(prev); };
const p4 = (t) => {
  capas4(); brillo4();
  const u = tramo(t, P4 + 0.2, sacred), hx = Math.round(lerp(64, 176, u));
  const lx = hx + 18 + Math.round(Math.sin(t * 9) * 1), ly = 84, rad = 74 + Math.sin(t * 11) * 2 + Math.sin(t * 5.3) * 2;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - lx) * 0.75, y - ly) / rad, v = (1 - d) * 2.6 + BY[(y & 3) * 4 + (x & 3)] / 16;
    if (v < 0.9) R.pset(x, y, oscuro4[y * 320 + x]); else if (v < 1.7) R.pset(x, y, medio4[y * 320 + x]); }
  // el ojo del cocodrilo brilla cuando lo nombra
  const ojo = tramo(t, cocod - 0.1, cocod + 0.2) - tramo(t, cocod + 1.2, cocod + 1.6);
  R.pset(150, 102, ojo > 0.3 && Math.floor(t * 8) % 3 ? hex('#fff8c0') : hex('#e0b040')); if (ojo > 0.5) R.halo(150, 102, 6, [hex('#a87a2a'), hex('#e8c060'), hex('#fff0a0')], 0.9);
  // el guardián lo cuenta y lo señala; Heródoto avanza con el candil en alto
  R.actor(EL.guardian450, 240, 172, t, { dir: -1, habla: Math.sin(t * 8) > -0.1 && t < E.duracion - 0.8, dedo: t > sacred - 0.2 && t < cocod + 1.2 });
  const H = R.actor(EL.herodoto, hx, 172, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > reyes && t < reyes + 0.9 || t > cocod });
  candil(H.mano[0], H.mano[1], t, 1);
};
const efectos = [[doce, 'pop'], [arriba, 'brillo'], [abajo, 'pop'], [cierra + 0.1, 'puerta'], [golpe, 'boom'], [golpe + 0.95, 'toc'], [cocod, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: -450 });
''')

# ───────────────────────────────────────────────────────────── gz-petrie ──
E['gz-petrie'] = ('Petrie', '''// GZ-PETRIE (frase 26), Hawara 1888 (barra 1888; en el último plano el tiempo corre de 100 a 1888). Cinco planos:
// 1. (LOCAL) la pirámide de adobe de Amenemhat III de cerca, derruida, con el campo de esquirlas, las estacas y el
//    teodolito; Petrie llega con un trabajador y en «pyramid» la señala; luego apunta en su cuaderno. Corta en «from».
// 2. (LOCAL) delante de la tienda de Petrie: la mesa de campaña con cuadernos, cascos y la cabeza de granito del rey;
//    Petrie la mira con la lupa y en «3,800» sale la cifra; en «1888» deja la lupa y se va a cavar. Corta en «British».
// 3. hawara/petrie/zanja: Petrie cava con el pico (golpe en «dug»), saltan esquirlas, la polea sube la cesta; en «found
//    under» aparece en la losa la línea recta de un muro y Petrie la señala. Corta en «the footprint».
// 4. hawara/petrie (o.huella): en «footprint»–«long» la huella del edificio asoma de nuestros pies hasta lo lejos;
//    Petrie la señala, levanta los brazos y apunta en su cuaderno; un trabajador pasa con su cesta. Corta en «taken».
// 5. hawara/lago (2.ª vez): el laberinto tal como era, que se desvanece en la bruma mientras unas barcazas cargadas de
//    sillares se lo llevan piedra a piedra; la barra del año corre de 100 a 1888.''', UTIL + r'''
const P2 = en('petrie', .254), P3 = en('petrie', .453), P4 = en('petrie', .673), P5 = en('petrie', .883);
const piram = en('petrie', .143), tres8 = en('petrie', .289), y1888 = en('petrie', .400), dug = en('petrie', .546), found = en('petrie', .576), chips = en('petrie', .657);
const huella = en('petrie', .686), largo = en('petrie', .765), todo = en('petrie', .801), stone = en('petrie', .977);
const CIELO = RA('#7aa6d8', '#90b4de', '#a8c4e2', '#c2d2e2', '#dcdcd2', '#ece2c8');
const ESQ = RA('#fbf6e6', '#ece2c8', '#d8ccae', '#c0b090', '#a8967a');
const libreta = (x, y, abierta = true) => { R.rect(x - 1, y - 5, x + 8, y + 1, K); R.rect(x, y - 4, x + 7, y, abierta ? hex('#f4ecd4') : hex('#4a3a2a')); if (abierta) { R.rect(x + 3, y - 4, x + 4, y, hex('#c8bc9a')); R.pset(x + 1, y - 2, hex('#6a6a7a')); R.pset(x + 5, y - 3, hex('#6a6a7a')); } };
const pico = (x, y, a) => { const ex = x + Math.cos(a) * 14, ey = y + Math.sin(a) * 14, px = -Math.sin(a), py = Math.cos(a);
  R.linea(x, y, ex, ey, K); R.linea(x + 1, y, ex + 1, ey, hex('#8a5a32'));
  R.linea(Math.round(ex - px * 6), Math.round(ey - py * 6), Math.round(ex + px * 6), Math.round(ey + py * 6), K); R.linea(Math.round(ex - px * 5 - 1), Math.round(ey - py * 5), Math.round(ex + px * 5 - 1), Math.round(ey + py * 5), hex('#9aa0a8')); };
const esquirlas = (t, x0, y0, t0, n = 7) => { const s = t - t0; if (s < 0 || s > 0.7) return; for (let k = 0; k < n; k++) { const vx = (h(k, 1, t0) - 0.5) * 70, vy = -30 - h(k, 2, t0) * 40; R.rect(Math.round(x0 + vx * s), Math.round(y0 + vy * s + 120 * s * s), Math.round(x0 + vx * s) + 1, Math.round(y0 + vy * s + 120 * s * s), k % 2 ? BL : hex('#d8ccae')); } };
const palmera = (x, y, t, k = 0) => { const s = Math.round(Math.sin(t * 1.4 + k) * 1.5); for (let j = 0; j < 22; j++) R.rect(x + Math.round(j * 0.15), y - j, x + 1 + Math.round(j * 0.15), y - j, j % 3 ? hex('#7a5a3a') : hex('#5a3e24'));
  const cx = x + 3, cy = y - 22; for (const [dx, dy] of [[-12, 5], [-9, -3], [-3, -7], [5, -6], [11, -1], [12, 6], [6, 4], [-6, 4]]) { R.linea(cx, cy, cx + dx + s, cy + dy, hex('#2a6a2a')); R.linea(cx, cy + 1, cx + dx + s, cy + dy + 1, hex('#4a9a3a')); } };
// ── plano 1: la pirámide de adobe de cerca ──
const fondo1 = fijo(() => {
  cieloT(106, CIELO);
  for (let x = 0; x < 320; x++) { const yr = 100 + Math.round(Math.sin(x * 0.04) * 2 + h(x >> 3, 0, 2) * 2); for (let y = yr; y < 108; y++) R.pset(x, y, tono(RA('#d0c4a4', '#c4b494', '#b8a684'), (y - yr) / 3, x, y)); }
  R.rect(232, 104, 319, 107, hex('#4a8a5a')); for (let x = 232; x < 320; x += 2) R.pset(x, 104, hex('#7ab06a'));
  for (let y = 108; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ESQ, 2 + (h(x >> 1, y >> 1, 15) - 0.5) * 1.6, x, y));
});
const frente1 = capa(() => {
  // la pirámide: adobe en hiladas, la cara de la luz y la de sombra, cima roma, surcos de erosión y la boca de entrada
  const ap = 136, base = 132, L = 8, Rr = 266;
  const izq = [[L, base], [ap - 18, 34], [ap + 16, 32], [ap + 4, base]], der = [[ap + 4, base], [ap + 16, 32], [ap + 20, 36], [Rr, base]];
  R.poligono(izq.map(([x, y]) => [x - 1, y - 1]), K); R.poligono(der.map(([x, y]) => [x + 1, y - 1]), K);
  R.poligono(izq, (x, y) => { const row = Math.floor(y / 4), jt = (y % 4 === 0) || ((x + row * 5) % 10 === 0); const g = Math.sin(x * 0.21 + Math.sin(y * 0.15) * 2) > 0.8 ? 1.2 : 0;
    return jt ? hex('#7a5a3e') : tono(RA('#c49a6e', '#b08a60', '#9a7650', '#7e5e40'), 0.6 + g + (h(x >> 1, row, 12) - 0.5) * 1.1 + (y - 34) / 98 * 0.6, x, y); });
  R.poligono(der, (x, y) => { const row = Math.floor(y / 4), jt = (y % 4 === 0) || ((x + row * 5) % 10 === 0); const g = Math.sin(x * 0.19 + Math.sin(y * 0.12) * 2) > 0.8 ? 1 : 0;
    return jt ? hex('#3e2c1e') : tono(RA('#8a6648', '#74543a', '#5e442e', '#4a3424'), 0.6 + g + (h(x >> 1, row, 13) - 0.5) * 1.1, x, y); });
  R.rect(ap - 16, 32, ap + 18, 34, hex('#d8b080'));   // la cima rota, al sol
  for (let k = 0; k < 18; k++) { const x = ap - 14 + Math.round(h(k, 1, 14) * 30), y = 34 + Math.round(h(k, 2, 14) * 6); R.rect(x, y, x + 2, y + 1, hex('#e0b888')); }
  R.rect(176, 96, 186, 106, K); R.rect(177, 97, 185, 106, hex('#1e1610')); R.rect(176, 94, 187, 95, hex('#d0c4a4'));   // la boca
  // los derrubios de la falda y el campo de esquirlas del primer plano
  for (let x = 0; x < 320; x++) { const yd = Math.round(120 + Math.sin(x * 0.05) * 5 + Math.sin(x * 0.17) * 2 - (x > 30 && x < 250 ? 6 : 0)); for (let y = yd; y < 180; y++) R.pset(x, y, tono(ESQ, (y - yd) / 60 * 2.4 + (h(x >> 1, y >> 1, 15) - 0.5) * 1.6, x, y)); }
  for (let k = 0; k < 260; k++) { const x = Math.round(h(k, 1, 16) * 320), y = 126 + Math.round(h(k, 2, 16) ** 0.7 * 52); R.rect(x, y, x + 1 + (k % 3 === 0 ? 1 : 0), y, k % 4 ? hex('#f8f2e0') : hex('#9a8a70')); if (k % 5 === 0) R.pset(x, y + 1, hex('#8a7a60')); }
  // un sillar roto, las estacas con el cordel y el teodolito en su trípode
  R.rect(22, 146, 60, 164, K); for (let y = 147; y < 164; y++) for (let x = 23; x < 60; x++) R.pset(x, y, tono(RA('#f2ead6', '#dcd0b4', '#c0b090'), (y - 147) / 17 * 2 + (h(x >> 2, y >> 2, 17) - .5), x, y)); R.poligono([[23, 147], [40, 147], [30, 156]], hex('#c0b090'));
  for (const [sx, sy] of [[72, 150], [124, 146], [176, 150], [228, 146]]) { R.rect(sx, sy - 9, sx + 1, sy, K); R.pset(sx, sy - 9, hex('#c04030')); }
  R.linea(73, 143, 125, 139, hex('#e8e0c8')); R.linea(125, 139, 177, 143, hex('#e8e0c8')); R.linea(177, 143, 229, 139, hex('#e8e0c8'));
  const tx = 172; R.linea(tx, 134, tx - 8, 160, K); R.linea(tx, 134, tx + 8, 160, K); R.linea(tx, 134, tx + 1, 160, K); R.linea(tx, 135, tx - 7, 159, hex('#a8743a'));
  R.rect(tx - 5, 128, tx + 5, 134, K); R.rect(tx - 4, 129, tx + 4, 133, hex('#c8a040')); R.rect(tx - 7, 129, tx - 5, 131, K); R.pset(tx + 3, 130, BL);
  // cestas, una criba y una carretilla de madera
  T.PIEZAS_GZ.cestaArena(R, 96, 172); T.PIEZAS_GZ.cestaArena(R, 112, 176); T.PIEZAS_GZ.cestaArena(R, 270, 170);
  R.disco(240, 158, 9, K); R.disco(240, 158, 8, hex('#b8a070')); for (let a = 0; a < 6.28; a += 0.6) R.linea(240, 158, Math.round(240 + Math.cos(a) * 7), Math.round(158 + Math.sin(a) * 7), hex('#8a7448'));
  R.poligono([[12, 168], [40, 166], [44, 176], [16, 178]], K); R.poligono([[13, 169], [39, 167], [42, 175], [17, 177]], hex('#a8743a')); R.disco(8, 174, 4, K); R.disco(8, 174, 3, hex('#6a4220')); R.linea(40, 166, 56, 158, K); R.linea(42, 175, 56, 162, K);
});
const p1 = (t) => {
  fondo1();
  nubes(t, [[30, 34, 30, 1.6, 260], [150, 58, 46, 3], [260, 76, 30, 5.5]]);
  for (const [px, k] of [[244, 0], [266, 1], [292, 2], [310, 3]]) palmera(px, 104, t, k);
  frente1();
  T.halcon(R, t, 216, 58, 20);
  // trabajadores diminutos que suben y bajan por los derrubios con sus cestas
  for (let k = 0; k < 4; k++) { const u = ((t * 0.12 + k * 0.25) % 1), x = Math.round(lerp(40, 96, u)), y = Math.round(lerp(124, 104, u)); R.rect(x, y - 5, x + 1, y, hex('#f2eee2')); R.pset(x, y - 6, hex('#5a3a2a')); R.rect(x - 1, y - 8, x + 2, y - 7, hex('#a8864a')); }
  T.viento(R, t, { y0: 132, y1: 176, fuerza: 0.7, color: hex('#fbf6e6') });
  for (let k = 0; k < 10; k++) if (Math.sin(t * 3 + k * 7) > 0.92) { const x = Math.round(h(k, 3, 18) * 300) + 10, y = 136 + Math.round(h(k, 4, 18) * 38); R.pset(x, y, BL); R.pset(x - 1, y, hex('#fff8d8')); R.pset(x + 1, y, hex('#fff8d8')); R.pset(x, y - 1, hex('#fff8d8')); }
  const w = tramo(t, 0.6, 6.3), u = tramo(t, 0.3, 2.8);
  R.actor(EL.trabajadorEgipcio1888, Math.round(lerp(330, -24, w)), 156, t, { dir: -1, anda: w > 0 && w < 1 });
  const px = Math.round(lerp(330, 188, u)), escribe = t > piram + 1.3;
  const P = R.actor(EL.petrie, px, 166, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > piram - 0.1 && t < piram + 1.2, sostiene: escribe, sonrisa: t > piram });
  if (escribe) { libreta(P.mano[0] - 6, P.mano[1]); if (Math.sin(t * 14) > 0) R.pset(P.mano[0] - 3, P.mano[1] - 2, K); }
};
// ── plano 2: la tienda de Petrie ──
const fondo2 = fijo(() => {
  cieloT(102, CIELO);
  for (let x = 0; x < 320; x++) { const yr = 98 + Math.round(Math.sin(x * 0.05) * 2); for (let y = yr; y < 180; y++) R.pset(x, y, tono(ESQ, 1.2 + (y - yr) / 80 * 2.2 + (h(x >> 1, y >> 1, 21) - 0.5) * 1.4, x, y)); }
  for (let k = 0; k < 200; k++) { const x = Math.round(h(k, 1, 22) * 320), y = 104 + Math.round(h(k, 2, 22) ** 0.7 * 74); R.rect(x, y, x + 1, y, k % 4 ? hex('#f8f2e0') : hex('#9a8a70')); }
  // la pirámide lejos, a la izquierda, roma
  R.poligono([[10, 100], [52, 64], [70, 63], [112, 100]], K); R.poligono([[11, 100], [52, 65], [60, 65], [60, 100]], (x, y) => tono(RA('#b08a60', '#9a7650'), (y % 3 === 0 ? 1 : 0) + h(x, y, 23) * 0.5, x, y)); R.poligono([[60, 65], [69, 64], [111, 100], [60, 100]], (x, y) => tono(RA('#76563a', '#5e442e'), (y % 3 === 0 ? 1 : 0) + h(x, y, 24) * 0.5, x, y));
  // la tienda de lona a dos aguas, con la puerta abierta y el catre dentro
  const tx = 248, ty = 54;
  R.poligono([[tx, ty - 1], [tx - 63, 151], [tx + 63, 151]], K);
  R.poligono([[tx, ty], [tx - 62, 150], [tx + 62, 150]], (x, y) => tono(RA('#f2e8d0', '#e2d4b4', '#cbb994', '#ae9a74'), (x > tx ? 1.4 : 0.3) + (y - ty) / 96 * 0.8 + ((x - tx + 200) % 14 === 0 ? 0.9 : 0) + (h(x >> 2, y >> 2, 25) - 0.5) * 0.4, x, y));
  R.poligono([[tx, ty + 10], [tx - 24, 150], [tx + 18, 150]], hex('#2a2016'));
  R.rect(tx - 18, 136, tx + 10, 141, hex('#6a5a3a')); R.rect(tx - 18, 136, tx + 10, 136, hex('#8a7a5a')); R.rect(tx - 14, 141, tx - 13, 150, hex('#4a3a24')); R.rect(tx + 6, 141, tx + 7, 150, hex('#4a3a24'));
  R.rect(tx - 6, 120, tx + 4, 135, hex('#4a3a2a')); R.rect(tx - 5, 121, tx + 3, 124, hex('#6a5a44'));
  R.poligono([[tx - 24, 150], [tx - 4, ty + 22], [tx - 2, 150]], hex('#d8c8a6')); R.linea(tx - 24, 150, tx - 4, ty + 22, hex('#ae9a74'));
  R.rect(tx - 1, ty - 4, tx + 1, ty, K); R.linea(tx, ty, tx - 74, 156, hex('#8a7a5a')); R.linea(tx, ty, tx + 70, 156, hex('#8a7a5a'));
  for (const gx of [tx - 74, tx + 70]) { R.rect(gx - 1, 154, gx + 1, 158, hex('#6a4a2a')); }
  // las cajas apiladas, la criba apoyada y la tinaja en su pie
  for (const [cx, cy, w, hh] of [[52, 160, 34, 18], [56, 142, 26, 16]]) { R.rect(cx - 1, cy - hh - 1, cx + w + 1, cy + 1, K);
    for (let y = cy - hh; y <= cy; y++) for (let x = cx; x <= cx + w; x++) R.pset(x, y, (y - cy + hh) % 6 === 0 ? hex('#7a5a34') : tono(RA('#d8a868', '#c09050', '#a0763e'), (h(x >> 3, (y - cy) / 6 | 0, 26) - .3) * 2, x, y));
    R.rect(cx + 2, cy - hh, cx + 3, cy, hex('#8a6a3a')); R.rect(cx + w - 3, cy - hh, cx + w - 2, cy, hex('#8a6a3a')); }
  R.disco(40, 150, 11, K); R.disco(40, 150, 10, hex('#b8a070')); for (let a = 0; a < 6.28; a += 0.5) R.linea(40, 150, Math.round(40 + Math.cos(a) * 9), Math.round(150 + Math.sin(a) * 9), hex('#8a7448')); R.disco(40, 150, 2, hex('#6a5434'));
  R.rect(16, 150, 28, 166, K); R.disco(22, 148, 7, K); R.disco(22, 148, 6, hex('#b06a3a')); R.disco(20, 146, 2, hex('#d08a5a')); R.linea(16, 166, 20, 156, hex('#5a3a1a')); R.linea(28, 166, 24, 156, hex('#5a3a1a'));
  // la mesa de campaña con sus cosas
  const mx0 = 120, mx1 = 206, my = 132;
  R.linea(mx0 + 4, my, mx0 + 16, 164, K); R.linea(mx0 + 16, my, mx0 + 4, 164, K); R.linea(mx1 - 4, my, mx1 - 16, 164, K); R.linea(mx1 - 16, my, mx1 - 4, 164, K);
  R.rect(mx0 - 1, my - 1, mx1 + 1, my + 3, K); R.rect(mx0, my, mx1, my + 2, hex('#b08a58')); R.rect(mx0, my, mx1, my, hex('#d0aa74'));
  R.rect(mx0 + 26, my - 5, mx0 + 40, my - 1, K); R.rect(mx0 + 27, my - 4, mx0 + 39, my - 2, hex('#7a4a2a')); R.rect(mx0 + 27, my - 4, mx0 + 39, my - 4, hex('#9a6a3a'));   // cuadernos
  R.rect(mx0 + 28, my - 8, mx0 + 38, my - 6, K); R.rect(mx0 + 29, my - 7, mx0 + 37, my - 7, hex('#3a5a7a'));
  R.rect(mx0 + 46, my - 4, mx0 + 66, my - 1, K); R.rect(mx0 + 47, my - 3, mx0 + 65, my - 2, hex('#c8b488')); for (let x = mx0 + 48; x < mx0 + 65; x += 3) R.pset(x, my - 3, [hex('#c04030'), hex('#6a8a6a'), hex('#d8a060')][x % 3]);   // la bandeja de cascos
  R.disco(mx0 + 76, my - 3, 3, K); R.disco(mx0 + 76, my - 3, 2, hex('#e8e0c8')); R.pset(mx0 + 76, my - 3, hex('#8a6a3a'));   // la cinta métrica
  R.rect(mx0 + 70, my - 6, mx0 + 72, my - 1, K); R.pset(mx0 + 71, my - 5, hex('#2a3a6a'));   // el tintero
  // la cabeza de granito del rey (con su nemes), sobre la mesa
  const sx = mx0 + 12, sy = my - 1; R.rect(sx - 7, sy - 16, sx + 7, sy, K); R.poligono([[sx - 8, sy - 14], [sx, sy - 19], [sx + 8, sy - 14], [sx + 8, sy - 2], [sx - 8, sy - 2]], K);
  R.poligono([[sx - 7, sy - 14], [sx, sy - 18], [sx + 7, sy - 14], [sx + 7, sy - 2], [sx - 7, sy - 2]], (x, y) => (y + x) % 3 === 0 ? hex('#3a3a46') : hex('#24242e'));
  R.rect(sx - 4, sy - 13, sx + 4, sy - 3, hex('#4a4a58')); R.rect(sx - 3, sy - 10, sx - 2, sy - 10, K); R.rect(sx + 2, sy - 10, sx + 3, sy - 10, K); R.pset(sx, sy - 7, hex('#2a2a34')); R.rect(sx - 2, sy - 5, sx + 2, sy - 5, hex('#2a2a34')); R.rect(sx - 4, sy - 13, sx - 3, sy - 6, hex('#6a6a7a'));
});
const p2 = (t) => {
  fondo2();
  nubes(t, [[40, 36, 28, 1.5, 230], [180, 60, 40, 3], [90, 80, 24, 5]]);
  T.bandada(R, t, { tipo: 'golondrina', n: 3, y: 48, cada: 6 });
  // la lona de la puerta que ondea, el farol de la mesa, la tetera en el fuego que humea
  const tx = 248, ty = 54, f = Math.sin(t * 3.2) * 4 + Math.sin(t * 7.1) * 1.5;
  R.poligono([[tx + 1, ty + 12], [tx + 18, 150], [tx + 34 + f, 150], [tx + 4, ty + 16]].map(([x, y]) => [Math.round(x), y]), (x, y) => tono(RA('#e2d4b4', '#cbb994', '#ae9a74'), 0.6 + (x - tx) / 30, x, y)); R.linea(tx + 1, ty + 12, Math.round(tx + 34 + f), 150, hex('#8a7a5a'));
  const fx = 230, fy = 170; R.rect(fx - 10, fy - 1, fx + 10, fy + 1, hex('#5a4a3a')); for (const dx of [-6, -2, 2, 6]) { const fl = Math.sin(t * 15 + dx) > 0 ? 1 : 0; R.rect(fx + dx - 1, fy - 4 - fl, fx + dx + 1, fy - 2, hex('#e86a2a')); R.pset(fx + dx, fy - 5 - fl, hex('#ffd060')); }
  R.disco(fx, fy - 9, 5, K); R.disco(fx, fy - 9, 4, hex('#4a4a52')); R.pset(fx - 2, fy - 11, hex('#7a7a84')); R.linea(fx + 4, fy - 10, fx + 8, fy - 13, K);
  for (let k = 0; k < 6; k++) { const s = ((t * 0.7 + k / 6) % 1); R.pset(Math.round(fx + 9 + Math.sin(t * 2 + k) * 2 + s * 6), Math.round(fy - 14 - s * 30), s < 0.5 ? BL : hex('#d8d4cc')); }
  const lx = 200, ly = 131; R.rect(lx - 3, ly - 10, lx + 3, ly, K); R.rect(lx - 2, ly - 8, lx + 2, ly - 2, hex('#f8e8a0')); R.pset(lx, ly - 5 + (Math.sin(t * 13) > 0 ? 1 : 0), hex('#ffb040')); R.rect(lx - 3, ly - 12, lx + 3, ly - 11, K); R.anillo(lx, ly - 14, 2, K);
  // gente diminuta en el horizonte, con cestas, y un burro
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 70 + t * 6) % 200) + 100), y = 100; R.rect(x, y - 4, x, y, hex('#f2eee2')); R.rect(x - 1, y - 6, x + 1, y - 5, hex('#a8864a')); }
  // Petrie con la lupa sobre la cabeza del rey; en «1888» la deja y se va
  const sale = tramo(t, y1888 + 0.1, P3 + 0.2), px = Math.round(lerp(100, -24, sale));
  const mira = t < y1888;
  const P = R.actor(EL.petrie, px, 160, t, { dir: sale > 0 ? -1 : 1, anda: sale > 0 && sale < 1, sostiene: mira ? [px + 20, 122] : false, sorpresa: t > tres8 && t < tres8 + 0.8, sonrisa: t > tres8 + 0.8 });
  if (mira) T.PIEZAS_GZ.lupa(R, P.mano[0] + 3, P.mano[1] + 3 + Math.round(Math.sin(t * 2) * 1));
  R.actor(EL.trabajadorEgipcio1888b, Math.round(lerp(-30, 60, tramo(t, P2 + 0.6, P2 + 2.6)) + lerp(0, 300, tramo(t, y1888 - 0.4, P3 + 1))), 174, t, { dir: 1, anda: t > P2 + 0.6 && t < P2 + 2.6 || t > y1888 - 0.4, habla: t > P2 + 2.6 && t < y1888 - 0.6 && Math.sin(t * 7) > 0 });
  const n = tramo(t, tres8, tres8 + 0.3); if (n > 0) R.numero('3,800', 140, Math.round(lerp(112, 104, n)), { tam: 16, centro: true });
};
// ── plano 3: la zanja ──
const golpes = [P3 + 0.55, dug - 0.8, dug, found + 0.1];
const p3 = (t) => {
  const o = { encuadre: 'petrie', camara: 'zanja' };
  T.hawara(R, t, o);
  // la línea recta de un muro que asoma en la losa al barrer las esquirlas
  const m = tramo(t, found + 0.3, chips + 0.2);
  if (m > 0) { // la zanja del muro en la losa: un surco recto que va de los pies de Petrie hacia el fondo y dobla en esquina
    const xa = 132, ya = 162, xb = Math.round(lerp(xa, 52, m)), yb = Math.round(lerp(ya, 146, m));
    R.poligono([[xb, yb - 2], [xa, ya - 3], [xa, ya + 2], [xb, yb + 1]], hex('#f8f0dc')); R.poligono([[xb, yb], [xa, ya - 1], [xa, ya + 3], [xb, yb + 2]], hex('#4a3a28'));
    for (let k = 0; k < 8; k++) { const q = k / 8; R.pset(Math.round(lerp(xb, xa, q)), Math.round(lerp(yb, ya, q)) + 1, hex('#6a5640')); }
    const c = tramo(t, chips - 0.4, chips + 0.3); if (c > 0) { R.poligono([[xb - 1, yb], [xb + 2, yb], [Math.round(xb - 8 * c), Math.round(yb + 22 * c)], [Math.round(xb - 11 * c), Math.round(yb + 22 * c)]], hex('#4a3a28')); R.linea(xb + 2, yb, Math.round(xb - 7 * c), Math.round(yb + 22 * c), hex('#f8f0dc')); }
    if (m < 1) for (let k = 0; k < 5; k++) R.pset(xb - 3 - k * 2, yb - 2 - (k % 2), hex('#d8ccae')); }
  R.actor(EL.trabajadorEgipcio1888, 190, 168, t, { dir: -1, sorpresa: t > found + 0.3, habla: t > P3 + 0.3 && t < dug && Math.sin(t * 7) > 0.3 });
  // Petrie con el pico: sube y baja, golpe a golpe
  let a = -2.3, mano = [-6, -2]; const g = golpes.find((gt) => t > gt - 0.45 && t < gt + 0.2);
  if (t < found + 0.35) { const ph = g != null ? (t < g ? (t - g + 0.45) / 0.45 : 1) : 0; a = lerp(-2.0, 0.9, ph ** 2); mano = [Math.round(lerp(4, -6, ph)), Math.round(lerp(-12, 0, ph))]; }
  const px = 140, cava = t < found + 0.35;
  const P = R.actor(EL.petrie, px, 166, t, { dir: -1, sostiene: cava ? [px + mano[0], 150 + mano[1]] : false, dedo: !cava && t > found + 0.6, sorpresa: t > found + 0.35 && t < found + 1.4, sonrisa: t > chips });
  if (cava) pico(P.mano[0], P.mano[1], a + Math.PI);
  else { R.linea(px + 18, 165, px + 26, 151, K); R.linea(px + 19, 165, px + 27, 151, hex('#8a5a32')); R.linea(px + 22, 150, px + 31, 154, K); }   // el pico apoyado
  for (const gt of golpes) esquirlas(t, px - 8, 164, gt);
  T.hawaraDelante(R, t, o);
};
// ── plano 4: la huella del edificio ──
const p4 = (t) => {
  const o = { encuadre: 'petrie', huella: tramo(t, huella - 0.1, largo) };
  T.hawara(R, t, o);
  const w = tramo(t, P4 + 0.2, todo + 0.3);
  R.actor(EL.trabajadorEgipcio1888b, Math.round(lerp(28, 104, w)), 150, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: t > largo });
  const escribe = t > todo;
  const P = R.actor(EL.petrie, 150, 164, t, { dir: -1, dedo: t > huella && t < largo, brazos: t > largo && t < todo, sorpresa: t > largo - 0.2 && t < todo, sostiene: escribe, sonrisa: t > todo });
  if (escribe) { libreta(P.mano[0] - 6, P.mano[1]); if (Math.sin(t * 14) > 0) R.pset(P.mano[0] - 3, P.mano[1] - 2, K); }
  T.hawaraDelante(R, t, o);
};
// ── plano 5: el laberinto que se llevan piedra a piedra ──
const barcaza = (x, y, t, carga, k) => { const b = Math.round(Math.sin(t * 1.8 + k) * 0.8); y += b;
  for (let i = 0; i < 4; i++) R.rect(x - 34 - i * 6, y + 5 + i, x - 30 - i * 6, y + 5 + i, hex('#c8dce4'));
  R.poligono([[x - 30, y - 4], [x + 30, y - 4], [x + 34, y - 9], [x + 26, y + 5], [x - 26, y + 5], [x - 34, y - 9]], K);
  R.poligono([[x - 29, y - 3], [x + 29, y - 3], [x + 32, y - 7], [x + 25, y + 4], [x - 25, y + 4], [x - 32, y - 7]], (xx, yy) => tono(RA('#a8743a', '#8a5a2a', '#6a4220'), (yy - y + 3) / 3, xx, yy));
  for (let i = 0; i < carga; i++) { const bx = x - 20 + (i % 4) * 11, by = y - 4 - Math.floor(i / 4) * 7; R.rect(bx - 1, by - 7, bx + 10, by, K); R.rect(bx, by - 6, bx + 9, by - 1, hex('#f2ead6')); R.rect(bx, by - 6, bx + 9, by - 6, BL); R.rect(bx + 7, by - 5, bx + 9, by - 1, hex('#c8bc9a')); }
  const A = R.actor(EL.guiaEgipcio450, x + 30, y - 4, t, { dir: 1, sostiene: [x + 40, y - 18] }); R.linea(A.mano[0], A.mano[1] - 8, A.mano[0] - 10, y + 12, K); R.linea(A.mano[0] + 1, A.mano[1] - 8, A.mano[0] - 9, y + 12, hex('#8a5a2a')); };
const p5 = (t) => {
  const u = tramo(t, P5 + 0.2, E.duracion - 0.4), o = { encuadre: 'lago', barca: false, revela: 1 - 0.85 * tramo(t, en('petrie', .921), E.duracion - 0.3) };
  T.hawara(R, t, o);
  barcaza(Math.round(lerp(40, 250, u)), 140, t, 8, 0);
  barcaza(Math.round(lerp(-60, 170, u)), 166, t, 12, 1);
  T.hawaraDelante(R, t, o);
};
const año = (t) => (t < P5 ? 1888 : Math.round(lerp(100, 1888, tramo(t, P5 + 0.3, E.duracion - 0.4))));
const efectos = [[0.7, 'viento'], [piram + 1.3, 'papel'], [tres8, 'pop'], [y1888 + 0.1, 'papel'], [golpes[0], 'golpecito'], [golpes[1], 'golpecito'], [dug, 'golpecito'], [golpes[3], 'golpecito'], [found + 0.5, 'brillo'], [huella, 'brillo'], [todo + 0.2, 'lapiz'], [P5 + 0.3, 'ola'], [stone - 0.6, 'viento']].sort((a, b) => a[0] - b[0]);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')
