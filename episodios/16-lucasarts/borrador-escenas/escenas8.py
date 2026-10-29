E = {}
E['la-xwing'] = ('X-Wing y The Dig', '''// LA-XWING (frases 44–45), 1993 → 1995. Cuatro planos:
// 1. el caza de alas en X (propio, sin marcas) entre estrellas con el crucero arriba; un dron enemigo se acerca, el caza
//    dispara con las cuatro alas en «completely different» y el dron estalla; el tentáculo verde con casco, feliz;
// 2. (corta en «in 1993») la cabina de cerca: el verde pilota, se inclina en «X-Wing» y el radar pita; gag: en «cockpit»
//    el morado asoma por detrás del asiento con pose de conquistador; el verde lo mira harto y el morado se esconde;
// 3. (corta tras «fighter», antes de «And in 1995») el asteroide: el astronauta baja por la rampa de la nave y camina
//    hasta la puerta de luz; en «the Dig» la señala; el verde con casco salta detrás de él;
// 4. (corta en «based») la puerta de cerca: en «idea» las hojas se abren y sale la luz; el astronauta se sorprende y en
//    «Spielberg» entra en la luz; el verde se queda boquiabierto.''', r'''
const a = (f) => en('xwing', f), b = (f) => en('dig', f);
const P2 = a(0.5075), P3 = b(-0.08), P4 = b(0.545);
const dispara = a(0.33), estalla = a(0.4), xw = a(0.685), cabina = a(0.787), fighter = a(0.89);
const dig = b(0.236), idea = b(0.693), spiel = b(0.861);
const K = hex('#14101c');
// un dron enemigo propio: platillo gris con un ojo rojo y dos aletas
const dron = (x, y, t) => { x = Math.round(x); y = Math.round(y); const Q = (pts) => pts.map(([a, b]) => [x + a * 1.6, y + b * 1.6]);
  R.poligono(Q([[-10, 0], [-4, -5], [4, -5], [10, 0], [4, 4], [-4, 4]]), K);
  R.poligono(Q([[-9, 0], [-4, -4], [4, -4], [9, 0], [4, 3], [-4, 3]]), hex('#7a7e8e'));
  R.poligono(Q([[-9, 0], [9, 0], [4, 3], [-4, 3]]), hex('#4a4e5e')); R.linea(x - 6, y - 6, x + 6, y - 6, hex('#c8ccd8'));
  R.disco(x, y - 2, 3.4, K); R.disco(x, y - 2, 2.4, Math.floor(t * 6) % 2 ? hex('#ff4a3a') : hex('#c82a2a')); R.pset(x - 1, y - 3, hex('#ffd0c0'));
  for (const sx of [-1, 1]) { R.linea(x + sx * 9, y + 5, x + sx * 14, y + 10, K); R.linea(x + sx * 10, y + 5, x + sx * 15, y + 10, hex('#5a5e6e')); }
  if (Math.floor(t * 8) % 2) { R.pset(x - 16, y, hex('#ffb04a')); R.pset(x + 16, y, hex('#ffb04a')); } };
// el estallido: anillos que crecen, chispas y humo
const boom = (x, y, u) => { if (u <= 0 || u >= 1) return; const r = 3 + u * 16;
  R.disco(x, y, r * (1 - u * 0.4), hex('#5a4a52')); R.disco(x, y, r * 0.8 * (1 - u * 0.6), hex('#e86a2a')); R.disco(x, y, r * 0.5 * (1 - u), hex('#ffe070'));
  for (let k = 0; k < 10; k++) { const an = k * 0.63 + 0.3, d = r * 1.3; R.pset(Math.round(x + Math.cos(an) * d), Math.round(y + Math.sin(an) * d), k % 2 ? hex('#ffe070') : hex('#ff9a3a')); } };
const rayo = (x0, y0, x1, y1) => { R.linea(x0, y0 + 1, x1, y1 + 1, hex('#8a1a1a')); R.linea(x0, y0 - 1, x1, y1 - 1, hex('#c82a2a')); R.linea(x0, y0, x1, y1, hex('#ffb0a0')); };
const p1 = (t) => {
  const g = T.espacio(R, t, { encuadre: 'combate' });
  // el dron llega por la derecha haciendo eses; los rayos de las cuatro alas lo alcanzan en «completely different»
  const u = tramo(t, 1.2, estalla), dx = lerp(340, 292, u), dy = 96 + Math.sin(t * 3.1) * 10 * (1 - u);
  if (t < estalla) dron(dx, dy, t);
  // dos ráfagas de rayos desde las puntas de los cañones (arriba y abajo) hasta el dron
  for (const [r0, r1] of [[dispara - 0.45, dispara - 0.05], [dispara, estalla]]) if (t > r0 && t < r1) { const v = tramo(t, r0, r1), my = g.cabina[1] - 118;
    for (const [x0, y0] of [[142, 47 + my], [152, 162 + my]]) { const tx = lerp(x0, dx, v), ty = lerp(y0, dy, v), k = 16 / Math.hypot(dx - x0, dy - y0); rayo(tx - (dx - x0) * k, ty - (dy - y0) * k, tx, ty); }
    if (v < 0.15) for (const [x0, y0] of [[142, 47 + my], [152, 162 + my]]) R.disco(x0, y0, 3, hex('#ffd0c0')); }
  boom(292, 96, tramo(t, estalla, estalla + 1.1));
  // el piloto en su hueco
  const prev = R.recorte(g.hueco);
  const ex = t < 2.4 ? 'normal' : t < estalla ? 'sorpresa' : 'feliz';
  T.tentaculo(R, g.cabina[0], g.suelo, t, { color: 'verde', accesorio: 'casco', dir: 1, expresion: ex, mira: [1, t > 2.4 && t < estalla ? -0.2 : 0], salto: t > estalla + 0.2 && t < estalla + 0.6 ? 2 : 0 });
  R.recorte(null);
  T.espacioDelante(R, t, { encuadre: 'combate' });
};
const p2 = (t) => {
  const g = T.espacio(R, t, { encuadre: 'combate', camara: 'cabina' });
  R.recorte(g.hueco);
  // el morado se asoma por detrás del asiento en «cockpit», con pose de conquistador, y se esconde al ver al verde harto
  const sube = tramo(t, cabina - 0.2, cabina + 0.3) - tramo(t, fighter + 0.7, fighter + 1.1);
  if (sube > 0) T.tentaculo(R, 130, Math.round(g.suelo + 34 - sube * 40), t, { color: 'morado', s: 1.4, brazos: 1, pose: t > fighter - 0.3 ? 'arriba' : 'normal', expresion: 'malvado', dir: 1 });
  const harto = t > fighter && t < fighter + 1.0;
  T.tentaculo(R, g.cabina[0] + 10, g.suelo, t, { color: 'verde', accesorio: 'casco', s: 1.5, dir: harto ? -1 : 1, expresion: harto ? 'harto' : t > xw ? 'feliz' : 'normal', inclina: t > xw - 0.2 && t < xw + 1.2 ? 2 * Math.sin(tramo(t, xw - 0.2, xw + 1.2) * Math.PI) : 0, mira: [harto ? -1 : 1, 0] });
  R.recorte(null);
  // el radar pita cuando aparece un blanco
  if (t > xw && Math.floor(t * 4) % 2) R.disco(g.radar[0] + 3, g.radar[1] - 2, 1.5, hex('#ff4a3a'));
  T.espacioDelante(R, t, { encuadre: 'combate', camara: 'cabina' });
};
// el casco de cristal del astronauta (una burbuja con brillo) y su mochila
const escafandra = (h, dir, x) => { const [cx, cy0] = h, cy = cy0 + 6;
  R.rect(dir > 0 ? x - 3 : x + 14, cy0 + 12, dir > 0 ? x + 1 : x + 18, cy0 + 22, K); R.rect(dir > 0 ? x - 2 : x + 15, cy0 + 13, dir > 0 ? x : x + 17, cy0 + 21, hex('#c8c8d4'));
  R.anillo(cx, cy, 10.5, K); R.anillo(cx, cy, 9.7, hex('#bfe6ff'));
  for (const [i, j] of [[-5, -6], [-6, -5], [-6, -4], [-4, -7]]) R.pset(cx + i, cy + j, hex('#ffffff')); };
const p3 = (t) => {
  const luz = 0.06 + 0.12 * tramo(t, dig - 0.3, dig + 0.6) + 0.03 * Math.sin(t * 4);
  const g = T.espacio(R, t, { encuadre: 'asteroide', abre: luz });
  // baja por la rampa de la nave y camina hasta la puerta; en «the Dig» la señala
  const u = tramo(t, P3 + 0.3, dig), x = Math.round(lerp(64, 150, u)), y = Math.round(u < 0.25 ? lerp(140, 150, u / 0.25) : 150);
  // las huellas que deja en el polvo
  for (let k = 0; k < 10; k++) { const hx = lerp(84, 150, k / 10); if (hx < x - 4) R.pset(Math.round(hx), 151 + (k % 2), hex('#5a5048')); }
  const r = R.actor(EL.astronauta, x, y, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > dig && t < dig + 1.8, sorpresa: t > dig + 1.8 });
  escafandra(r.cabeza, 1, x);
  // el verde con casco, detrás, da saltitos de emoción
  const v = tramo(t, P3 + 0.9, dig + 0.4);
  T.tentaculo(R, Math.round(lerp(60, 118, v)), 150, t, { color: 'verde', accesorio: 'casco', anda: v > 0 && v < 1, expresion: t > dig ? 'sorpresa' : 'feliz', s: 0.8 });
  T.espacioDelante(R, t, { encuadre: 'asteroide', abre: luz });
};
const p4 = (t) => {
  const ab = tramo(t, idea - 0.15, idea + 0.9);
  const g = T.espacio(R, t, { encuadre: 'asteroide', camara: 'puerta', abre: ab });
  const w = tramo(t, spiel, spiel + 1.4), x = Math.round(lerp(62, 118, w));
  const r = R.actor(EL.astronauta, x, 172, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: t > idea && t < spiel, brazos: t > idea + 0.3 && t < spiel - 0.2 });
  escafandra(r.cabeza, 1, x);
  T.tentaculo(R, 262, 172, t, { color: 'verde', accesorio: 'casco', dir: -1, expresion: t > idea ? 'sorpresa' : 'normal', salto: t > idea && t < idea + 0.4 ? 4 : 0 });
  T.espacioDelante(R, t, { encuadre: 'asteroide', camara: 'puerta', abre: ab });
};
const año = (t) => t < P3 ? 1993 : 1995;
const efectos = [[0.3, 'jet'], [dispara - 0.45, 'flash'], [dispara, 'flash'], [estalla, 'boom'], [xw, 'jet'], [xw + 0.3, 'bip'], [cabina, 'boing'], [fighter + 0.8, 'pop'], [P3 + 0.5, 'arranque'], [dig, 'brillo'], [idea, 'zumbido'], [idea + 0.4, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['la-hoy'] = ('Hoy', '''// LA-HOY (frases 46–48), 2026, cartela «2026». Cinco planos:
// 1. el cuarto de hoy de noche: el chico juega en el monitor ancho; el padre entra, se pone detrás, mira por encima y en
//    «memory» señala la estantería de cajas viejas; el chico se vuelve y sonríe en «generation»;
// 2. (corta en «Today») los aparatos sobre la mesa: una mano toca la tableta en «modern computers» y la mansión responde;
// 3. (corta antes de «single») el monitor ancho de cerca con el teclado: la mano pulsa la tecla en «switches» (dibujo
//    nuevo → píxeles), otra vez en «new art» y otra en «original pixels»;
// 4. (corta en «And since 2001») el cuarto del foro: la pared de pantallas con avatares; dos aficionados teclean, llega
//    un tercero en «fans» y celebran en «maintained» (la barra del año sube de 2001 a 2026);
// 5. (corta en «that lets you play») una pantalla del foro de cerca: suben mensajes; en «computer» y en «phone» llegan
//    los pictogramas de un ordenador y de un teléfono, y el avatar del tentáculo manda un corazón.''', r'''
const m = (f) => en('memoria', f), r = (f) => en('remaster', f), s = (f) => en('scummvm', f);
const P2 = r(0), P3 = r(0.512), P4 = s(0), P5 = s(0.5);
const memory = m(0.577), gener = m(0.785), modern = r(0.15), tecla1 = r(0.615), tecla2 = r(0.745), tecla3 = r(0.86);
const fans = s(0.17), mant = s(0.24), compu = s(0.883), phone = s(0.949);
const K = hex('#14101c');
// el mando del chico, en su mano: cuerpo gris, cruceta y botones que se encienden al pulsar
const mando = ([x, y], t) => { R.rect(x - 6, y - 2, x + 6, y + 3, K); R.rect(x - 5, y - 1, x + 5, y + 2, hex('#4a4a5a')); R.rect(x - 5, y - 1, x + 5, y - 1, hex('#6a6a7a'));
  R.pset(x - 4, y + 1, hex('#e8e8ee')); R.pset(x - 3, y, hex('#e8e8ee')); R.pset(x - 3, y + 2, hex('#e8e8ee')); R.pset(x - 2, y + 1, hex('#e8e8ee'));
  R.pset(x + 3, y, Math.floor(t * 5) % 2 ? hex('#ff5a7a') : hex('#8a2a3a')); R.pset(x + 4, y + 1, Math.floor(t * 3) % 2 ? hex('#5affd8') : hex('#2a8a6a')); };
const p1 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cuartoHoy' });
  // en «memory» las cajas viejas de la estantería brillan, como un recuerdo
  if (t > memory - 0.2 && t < gener + 1.2) { const [x0, y0, x1, y1] = g.estanteria; for (let k = 0; k < 9; k++) { const f = (t * 1.6 + k * 0.37) % 1, x = Math.round(x0 + 6 + ((k * 23) % (x1 - x0 - 12))), y = Math.round(y1 - 4 - f * (y1 - y0 + 10)); if (f < 0.8) { R.pset(x, y, hex('#fff2a8')); if (k % 3 === 0) { R.pset(x - 1, y, hex('#e8c040')); R.pset(x + 1, y, hex('#e8c040')); R.pset(x, y - 1, hex('#e8c040')); R.pset(x, y + 1, hex('#e8c040')); } } } }
  // el padre entra por la izquierda y se queda detrás del chico, un paso más al fondo, mirando por encima
  const u = tramo(t, 1.3, 3.3), px = Math.round(lerp(-20, 158, u));
  R.actor(EL.padre, px, 149, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > memory && t < memory + 1.6, sonrisa: t > 3.3 });
  const vuelve = t > gener;
  const c = R.actor(EL.chico, 182, 154, t, { dir: vuelve ? -1 : 1, sostiene: true, sonrisa: vuelve || Math.sin(t * 1.3) > 0.6, habla: vuelve && t < gener + 1 && Math.sin(t * 8) > 0 });
  mando(c.mano, t);
};
const p2 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cuartoHoy', camara: 'aparatos' });
  const [x0, y0, x1, y1] = g.tableta, tx = (x0 + x1) / 2 + 6, ty = (y0 + y1) / 2 + 10;
  const u = tramo(t, P2 + 0.4, modern + 0.4) - tramo(t, modern + 1.4, modern + 2.2), toca = t > modern + 0.4 && t < modern + 1.4;
  if (u > 0) T.brazo(R, lerp(250, 222, u), lerp(220, 176, u), lerp(240, tx, u), lerp(220, ty + (toca ? 2 : 0), u), '#3e8a6a', -1, {});
  if (toca) { const f = tramo(t, modern + 0.4, modern + 1.0); for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(tx - 8 + Math.cos(a) * f * 10), Math.round(ty - 4 + Math.sin(a) * f * 10), hex('#ffffff')); }
};
const p3 = (t) => {
  const pulsa = (k) => tramo(t, k - 0.12, k) - tramo(t, k + 0.1, k + 0.25);
  const hd = 1 - tramo(t, tecla1, tecla1 + 0.5) + tramo(t, tecla2, tecla2 + 0.5) - tramo(t, tecla3, tecla3 + 0.5);
  const g = T.hoy(R, t, { encuadre: 'cuartoHoy', camara: 'pantalla', hd });
  const [kx, ky] = g.tecla, e = tramo(t, P3, P3 + 0.7), p = Math.max(pulsa(tecla1), pulsa(tecla2), pulsa(tecla3));
  // la tecla que se pulsa: se ilumina y suelta chispas
  R.rect(kx - 7, ky - 3, kx + 7, ky + 3, K); R.rect(kx - 6, ky - 2 + Math.round(p), kx + 6, ky + 2, p > 0.3 ? hex('#fff8c8') : hex('#e8c040')); R.rect(kx - 6, ky + 2, kx + 6, ky + 2, hex('#a8842a'));
  if (p > 0.3) for (const [dx, dy] of [[-10, -6], [10, -6], [-12, 0], [12, 0], [0, -8]]) R.pset(kx + dx, ky + dy, hex('#fff8c8'));
  for (const k of [tecla1, tecla2, tecla3]) { const f = tramo(t, k, k + 0.5); if (f > 0 && f < 1) R.anillo(kx, ky, 4 + f * 14, f < 0.5 ? hex('#fff8c8') : hex('#e8c040')); }
  // la mano entra desde abajo a la izquierda y pulsa con el índice
  T.brazo(R, lerp(60, 92, e), lerp(222, 200, e), lerp(70, kx - 9, e), lerp(222, ky + 1 + p * 2, e), '#7a5a3a', 1, { codo: [lerp(66, 108, e), lerp(222, 188, e)] });
};
const p4 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'foro' });
  const v = tramo(t, fans - 0.6, fans + 0.8), x3 = Math.round(lerp(340, 286, v));
  const fiesta = t > mant && t < mant + 1.6;
  R.actor(EL.joven, 140, 160, t, { dir: 1, brazos: fiesta, sonrisa: t > mant });
  R.actor(EL.joven2, 236, 160, t, { dir: -1, dedo: t > fans && !fiesta, sonrisa: t > mant, salto: fiesta ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0 });
  R.actor(EL.chicaRara, x3, 160, t, { dir: -1, anda: v > 0 && v < 1, brazos: fiesta });
};
// una caja que respeta el recorte (R.rect no lo hace)
const caja = (x0, y0, x1, y1, c) => R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], c);
const corazon = (x, y, c) => { R.disco(x - 1.5, y, 2, c); R.disco(x + 1.5, y, 2, c); R.poligono([[x - 3.5, y + 0.5], [x + 3.5, y + 0.5], [x, y + 5]], c); };
// la mansión en miniatura dentro de un aparato: cielo de atardecer, la loma verde y la casa con su ventana encendida
const mini = (x0, y0, x1, y1, t) => { const h = y1 - y0; caja(x0, y0, x1, y1, hex('#5a3a7a')); caja(x0, y0 + Math.round(h * 0.35), x1, y1, hex('#e8844a')); caja(x0, y0 + Math.round(h * 0.6), x1, y1, hex('#3e8a3a'));
  const cx = Math.round((x0 + x1) / 2); caja(cx - 4, y0 + Math.round(h * 0.25), cx + 4, y0 + Math.round(h * 0.62), hex('#2a1a3a')); caja(cx - 6, y0 + Math.round(h * 0.18), cx - 4, y0 + Math.round(h * 0.4), hex('#2a1a3a'));
  if (Math.floor(t * 2) % 2) R.pset(cx, y0 + Math.round(h * 0.4), hex('#ffe070')); };
const p5 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'foro', camara: 'cerca' });
  // (los avatares del decorado se salen del hueco arriba y abajo: se repinta la barra y el marco de abajo)
  R.rect(10, 10, 310, 20, hex('#3a3a6a')); for (let k = 0; k < 4; k++) R.rect(16 + k * 18, 14, 28 + k * 18, 16, hex('#8a8ab8')); R.disco(300, 15, 3, hex('#e8c040')); R.rect(65, 21, 310, 21, hex('#e8eaf2')); R.rect(65, 170, 310, 170, hex('#e8eaf2'));
  for (const y of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 171, 172, 173, 174, 175, 176, 177, 178, 179]) for (let x = 64; x < 104; x++) R.pset(x, y, R.pget(x + 60, y));
  // un mensaje nuevo sube desde abajo, con el borde dorado: el avatar del tentáculo verde y, en «computer», «tablet» y
  // «phone», los pictogramas de los tres aparatos con la mansión dentro; el contador de corazones sube y los corazones vuelan
  R.recorte([66, 22, 308, 169]);
  const y = Math.round(lerp(176, 104, tramo(t, P5 + 0.2, P5 + 1.1))), x0 = 70, x1 = 300;
  caja(x0 - 2, y - 2, x1 + 2, y + 60, K); caja(x0 - 1, y - 1, x1 + 1, y + 59, Math.floor(t * 3) % 2 ? hex('#ffd860') : hex('#e8b030')); caja(x0, y, x1, y + 58, hex('#ffffff'));
  // las líneas del mensaje (sin letras) que se van escribiendo
  for (let l = 0; l < 2; l++) { const w = Math.round(lerp(0, [150, 96][l], tramo(t, P5 + 1.1 + l * 0.6, P5 + 1.8 + l * 0.6))); if (w > 0) caja(x0 + 50, y + 5 + l * 5, x0 + 50 + w, y + 6 + l * 5, hex('#a8a8bc')); }
  caja(x0 + 6, y + 8, x0 + 40, y + 50, K); caja(x0 + 7, y + 9, x0 + 39, y + 49, hex('#2a6a3a'));
  T.tentaculo(R, x0 + 23, y + 48, t, { color: 'verde', s: 1.1, expresion: t > phone ? 'feliz' : 'normal', habla: t > P5 + 1.2 && t < compu && Math.sin(t * 9) > 0 });
  const sale = (k) => tramo(t, k - 0.05, k + 0.25), bote = (k) => Math.round(Math.sin(Math.min(1, tramo(t, k, k + 0.35)) * Math.PI) * -3);
  const tab = (compu + phone) / 2;
  // los huecos punteados de los tres aparatos, que esperan a la voz («any device»)
  if (t > P5 + 1.0) for (const [u0, v0, u1, v1, k] of [[52, 14, 96, 51, compu], [108, 14, 140, 52, tab], [152, 18, 170, 52, phone]]) if (t < k) { const c = Math.floor(t * 4) % 2 ? hex('#a8a8bc') : hex('#c8cad6'); R.linea(x0 + u0, y + v0, x0 + u1, y + v0, c, 4); R.linea(x0 + u0, y + v1, x0 + u1, y + v1, c, 4); R.linea(x0 + u0, y + v0, x0 + u0, y + v1, c, 4); R.linea(x0 + u1, y + v0, x0 + u1, y + v1, c, 4); }
  if (sale(compu) > 0) { const b = bote(compu); caja(x0 + 52, y + 14 + b, x0 + 96, y + 44 + b, K); caja(x0 + 54, y + 16 + b, x0 + 94, y + 42 + b, hex('#3a3a46')); mini(x0 + 56, y + 18 + b, x0 + 92, y + 40 + b, t); caja(x0 + 70, y + 45 + b, x0 + 78, y + 48 + b, hex('#8a8a9a')); caja(x0 + 62, y + 49 + b, x0 + 86, y + 51 + b, K); }
  if (sale(tab) > 0) { const b = bote(tab); caja(x0 + 108, y + 14 + b, x0 + 140, y + 52 + b, K); caja(x0 + 109, y + 15 + b, x0 + 139, y + 51 + b, hex('#3a3a46')); mini(x0 + 111, y + 18 + b, x0 + 137, y + 48 + b, t); }
  if (sale(phone) > 0) { const b = bote(phone); caja(x0 + 152, y + 18 + b, x0 + 170, y + 52 + b, K); caja(x0 + 153, y + 19 + b, x0 + 169, y + 51 + b, hex('#3a3a46')); mini(x0 + 155, y + 22 + b, x0 + 167, y + 47 + b, t); }
  const n = Math.round(lerp(37, 999, tramo(t, phone, phone + 0.9))), pul = t > phone && t < phone + 0.4 ? 1 : 0;
  corazon(x0 + 190, y + 34, hex('#e83a5a')); if (pul) corazon(x0 + 190, y + 33, hex('#ff8aa0'));
  R.recorte(null); if (y < 140) R.numero(String(n), x0 + 198, y + 41, { tam: 8 }); R.recorte([66, 22, 308, 169]);
  for (let k = 0; k < 5; k++) { const f = tramo(t, phone + k * 0.15, phone + 1.3 + k * 0.15); if (f > 0 && f < 1) corazon(Math.round(x0 + 190 + Math.sin(f * 6 + k) * 8), Math.round(y + 26 - f * 60), hex('#e83a5a')); }
  R.recorte(null);
};
const año = (t) => t < P4 ? 2026 : t < P5 ? Math.round(lerp(2001, 2026, tramo(t, P4 + 0.4, P5 - 0.3))) : 2026;
const efectos = [[1.2, 'puerta'], [memory, 'pop'], [modern + 0.4, 'golpecito'], [tecla1, 'interruptor'], [tecla2, 'interruptor'], [tecla3, 'interruptor'], [P4 + 0.3, 'tecleo'], [mant, 'palmada'], [compu, 'pop'], [phone, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '2026', efectos, año });
''')
