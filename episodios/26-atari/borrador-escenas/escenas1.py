E = {}

# Ayudas comunes a las dos escenas (van en el cuerpo de cada una)
AYUDAS = r'''
const K = hex('#05040a');
// un cartucho girado (ang en radianes) con centro en (cx, cy): se pinta una vez en un búfer y se rota píxel a píxel
const CART_CACHE = new Map();
const cartRot = (cx, cy, ang, color = 'rojo', icono = 'foso', s = 1) => {
  const k = color + icono + s;
  if (!CART_CACHE.has(k)) {
    const b = R.nuevo(), prev = R.usar(b); T.PIEZAS_AT.cartucho(R, 40, 50, { color, icono, s }); R.usar(prev);
    const px = []; for (let y = 0; y < 60; y++) for (let x = 0; x < 80; x++) { const c = b[y * 320 + x]; if (c) px.push([x - 40, y - 50 + 7.5 * s, c]); }
    CART_CACHE.set(k, px);
  }
  const px = CART_CACHE.get(k), ca = Math.cos(ang), sa = Math.sin(ang);
  for (const [x, y, c] of px) for (const [dx, dy] of [[0, 0], [0.5, 0], [0, 0.5]]) R.pset(Math.round(cx + (x + dx) * ca - (y + dy) * sa), Math.round(cy + (x + dx) * sa + (y + dy) * ca), c);
};
'''

E['at-gancho'] = ('Gancho', '''// AT-GANCHO (frases 1–2), sin cartela; barra 1983 → 2013 → 2014 → 1983 → 2026. Siete planos:
// 1. (0–6,4 s) el vertedero de Alamogordo de noche, 1983: el volquete entra, bascula y suelta cajas de cartuchos a
//    chorro en la fosa; el operario de la linterna lo guía, el camionero mira el reloj; la hormigonera empieza a verter
//    (la promesa entera). Corta en «and».
// 2. (6,4–10,9) la fosa de cerca: el cemento avanza sobre las cajas en «covered them with concrete»; el obrero del borde
//    lo extiende; en «For 30 years» la barra corre de 1983 a 2013 y el cielo pasa de noche a día. Corta en «the story».
// 3. (10,9–14,4) Alamogordo de noche: dos chicos en la acera; él cuenta la leyenda señalando el desierto, ella se asusta
//    en «worst game» y un tercero llega con la linterna; pasa un coche. Corta en «until».
// 4. (14,4–19,5) 2014, la cuchara de la excavadora sube de la tierra con un cartucho que asoma en «check»; el arqueólogo
//    del saliente señala y se sorprende.
// 5. (19,5–25,3) la gráfica proyectada de 1983: la mano levanta un cronómetro en «five weeks» (cinco vueltas) y la línea
//    se desploma en «disappeared».
// 6. (25,3–29,1) hoy, el diván: el paciente habla; Warshaw entra con su libreta y escucha en «listening to people».
// 7. (29,1–34,2) el estudio de Atom: el foso se abre en «true» y el cartucho rueda por la mesa y cae dentro en «heard it»
//    (gag 1); el gato se asoma al borde.''', AYUDAS + r'''
const a = (f) => en('entierro', f), b = (f) => en('pistas', f);
const P2 = a(0.33), P3 = a(0.5767), P4 = a(0.776), P5 = a(1.06), P6 = b(0.437), P7 = b(0.7386), FIN = E.duracion;
const cubre = a(0.352), concreto = a(0.398), treinta = a(0.4575), leyenda = a(0.552);
const peor = a(0.638), bajo = a(0.704), y2014 = a(0.802), excav = a(0.926), comprobar = a(0.9712);
const cinco = b(0.149), industria = b(0.2298), desaparece = b(0.315), dos = b(0.3866);
const progr = b(0.4737), escucha = b(0.58), gente = b(0.6305);
const verdad = b(0.82), justo = b(0.89), oiste = b(0.965);

// 1 · el vertedero de noche: el volquete vuelca, la compactadora espera, la hormigonera empieza
const vuelca = 0.25 + 0.3 * 5.6;   // cuando empiezan a caer las cajas (o.camion 0,3)
const p1 = (t) => {
  const o = { encuadre: 'vertedero83', noche: true, camion: tramo(t, 0.25, 5.85), apisonadora: tramo(t, 2.6, 9.5) * 0.35, cemento: tramo(t, 3.9, 9.5) * 0.55 };
  T.desierto(R, t, o);
  // el operario con la linterna: guía al volquete con el dedo y se aparta cuando caen las cajas
  const ap = tramo(t, vuelca - 0.2, vuelca + 0.9), ox = Math.round(lerp(196, 168, ap));
  const op = R.actor(EL.operario, ox, 168, t, { dir: 1, anda: ap > 0 && ap < 1, dedo: t < vuelca - 0.2, sorpresa: t > vuelca && t < vuelca + 1.2, sostiene: t >= vuelca - 0.2 ? [ox + 16, 152] : undefined });
  // el haz de la linterna: barre la fosa
  const [hx, hy] = op.mano ?? [ox + 15, 150];
  const ang = t < vuelca ? -0.35 + Math.sin(t * 2.2) * 0.25 : 0.25 + Math.sin(t * 1.3) * 0.15;
  if (t >= vuelca - 0.2) { R.rect(hx - 1, hy - 2, hx + 3, hy, hex('#3a3a40')); R.pset(hx + 4, hy - 1, hex('#fff2a0')); }
  // el charco de luz de la linterna en el suelo, que barre por delante de la fosa
  const lx = Math.round(hx + 26 + Math.cos(ang * 3) * 10), ly = 164;
  for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = (i / 14) ** 2 + (j / 4) ** 2; if (d < 1 && ((i + j) & 1 || d < 0.45)) R.pset(lx + i, ly + j, d < 0.45 ? hex('#d8d0a0') : hex('#9a9478')); }
  for (let k = 0; k < 9; k++) { const f = k / 8; R.pset(Math.round(lerp(hx + 4, lx - 8 + k * 2, f)), Math.round(lerp(hy - 1, ly - 3, f)), hex('#e8e0a0')); }
  // el camionero, junto a la caseta: mira el reloj y habla con el operario
  R.actor(EL.camionero, 92, 168, t, { dir: 1, habla: t > 1 && t < 3 && Math.sin(t * 8) > 0, dedo: t > 4.2 && t < 5.6, sostiene: t > 1.2 && t < 3 ? [104, 150] : undefined });
  if (t > 1.2 && t < 3) { R.disco(106, 150, 2, hex('#d8c070')); R.pset(106, 150, K); }
  // un perro guardián que trota de lado a lado por delante
  const dx = Math.round(lerp(300, 236, tramo(t, 3.4, 6.2))), pf = Math.floor(t * 8) % 2;
  if (t > 3.4) { R.rect(dx, 160, dx + 9, 164, hex('#5a4a3a')); R.rect(dx - 3, 157, dx + 1, 161, hex('#5a4a3a')); R.pset(dx - 3, 158, K); R.rect(dx - 1, 155, dx, 157, hex('#3a2e24')); R.rect(dx + 9, 158 - pf, dx + 11, 159 - pf, hex('#5a4a3a')); for (const [lx, f] of [[dx + 1, pf], [dx + 8, 1 - pf]]) R.rect(lx, 165, lx + 1, 167 - f, hex('#3a2e24')); }
  T.desiertoDelante(R, t, o);
};

// 2 · la fosa de cerca: el cemento lo tapa todo y pasan treinta años
const p2 = (t) => {
  const cem = 0.12 + 0.73 * tramo(t, P2 + 0.1, concreto + 0.6);
  T.desierto(R, t, { encuadre: 'vertedero83', camara: 'cemento', cemento: cem });
  // el obrero del borde extiende el cemento con el rastrillo y se va cuando pasan los años
  const va = tramo(t, treinta + 0.2, leyenda + 0.9), wx = Math.round(lerp(196, 290, va));
  const ob = R.actor(EL.camionero2, wx, 52, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, sostiene: va === 0 ? [wx - 4, 46 + Math.round(Math.sin(t * 5) * 2)] : undefined });
  if (va === 0 && ob.mano) { const [mx, my] = ob.mano; R.linea(mx, my, mx - 16, my + 14, hex('#8a5a2a')); R.linea(mx + 1, my, mx - 15, my + 14, hex('#5a3a1a')); R.rect(mx - 21, my + 14, mx - 11, my + 15, hex('#4a4a50')); }
  // el paso de los años: la luz de la noche al día y la arena que se posa
  const dia = tramo(t, treinta, leyenda + 0.2);
  // con los años: grietas que crecen en el cemento, matas que brotan y arena que se posa
  if (dia > 0) {
    for (const [x0, y0, l, s] of [[40, 120, 46, 1], [120, 150, 38, -1], [70, 168, 30, 1], [150, 96, 26, 1]]) { let x = x0, y = y0; for (let i = 0; i < l * dia; i++) { R.pset(x, y, hex('#4a4a48')); x += 1; if (i % 3 === 0) y += s * ((i >> 2) & 1 ? 1 : -1); } }
    for (const [x, y] of [[30, 140], [96, 112], [138, 170], [60, 100], [176, 132]]) { const g = Math.round(5 * tramo(dia, 0.2, 0.9)); for (let i = -2; i <= 2; i++) if (g > 0) R.linea(x + i * 2, y, x + i * 3, y - g + Math.abs(i), i & 1 ? hex('#5a7a3a') : hex('#7a9a4a')); }
    for (let k = 0; k < 90 * dia; k++) { const x = (k * 53 + 17) % 200, y = 70 + ((k * 37) % 110); R.pset(x, y, (k & 3) ? hex('#d8b47a') : hex('#b8945a')); }
    // la planta rodadora que cruza el cemento
    const rx = Math.round(lerp(-20, 220, dia)), ry = 104 + Math.round(Math.abs(Math.sin(dia * 14)) * -6);
    for (let k = 0; k < 40; k++) { const an = k * 2.4 + dia * 30, rr = 3 + (k % 5); R.pset(Math.round(rx + Math.cos(an) * rr), Math.round(ry + Math.sin(an) * rr), k & 1 ? hex('#8a6a3a') : hex('#b8945a')); }
  }
  // la noche del vertido que se hace día con los años
  const noche = 1 - tramo(t, treinta, leyenda);
  if (noche > 0) T.tinte(R, 0, 179, [20, 26, 70], 0.5 * noche);
  // el contador de años sobre el cemento
  const n = Math.round(30 * tramo(t, treinta, treinta + 0.9));
  if (t > treinta - 0.05) R.numero(String(n), 210, 120, { tam: 16, centro: true });
};

// 3 · el pueblo de noche: la leyenda de boca en boca
const p3 = (t) => {
  const o = { encuadre: 'pueblo', coche: tramo(t, bajo + 0.3, P4 + 0.2) };
  T.desierto(R, t, o);
  R.actor(EL.chicoPueblo, 96, 148, t, { dir: 1, habla: Math.sin(t * 9) > -0.2 && t < bajo + 0.6, dedo: t > peor - 0.6 });
  R.actor(EL.chicaPueblo, 116, 148, t, { dir: -1, sorpresa: t > peor, triste: t > bajo, salto: t > peor && t < peor + 0.35 ? 3 : 0 });
  if (t > peor && t < peor + 1.4) R.bocadillo(124, 116, { icono: '!' });
  if (t > leyenda + 0.4 && t < peor) R.bocadillo(104, 116, { icono: '?' });
  // el tercero llega con la linterna desde la ferretería
  const v = tramo(t, P3 + 0.6, bajo), nx = Math.round(lerp(226, 140, v));
  const nn = R.actor(EL.nino77, nx, 148, t, { dir: -1, anda: v > 0 && v < 1, sostiene: [nx - 2, 136], sonrisa: v >= 1 });
  if (nn.mano) { const [mx, my] = nn.mano; R.rect(mx - 4, my - 1, mx, my + 1, hex('#3a3a40')); for (let k = 0; k < 10; k++) R.pset(mx - 5 - k, my - Math.round(k * 0.2) + (k & 1), hex('#f0e8a0')); }
  T.desiertoDelante(R, t, o);
};

// 4 · 2014: la cuchara sube con la basura y asoma el cartucho
const p4 = (t) => {
  const sa = tramo(t, P4 + 0.3, comprobar + 0.2);
  const g = T.desierto(R, t, { encuadre: 'excavacion14', camara: 'pala', saca: sa });
  const sor = t > comprobar - 0.15;
  R.actor(EL.arqueologo, 54, 172, t, { dir: 1, dedo: t > excav - 0.3, sorpresa: sor, salto: sor && t < comprobar + 0.3 ? 3 : 0 });
  R.actor(EL.operario, 22, 172, t, { dir: 1, habla: t < y2014 + 1.2 && Math.sin(t * 8) > 0, sonrisa: sor });
  if (sor) R.bocadillo(62, 138, { icono: '!' });
};

// 5 · la gráfica: cinco semanas en el cronómetro y la industria que se hunde
const p5 = (t) => {
  T.atari(R, t, { encuadre: 'juntas', camara: 'grafica', grafica: tramo(t, P5 + 0.3, dos + 0.3) });
  // el brazo que levanta el cronómetro en «five weeks» y lo baja cuando la línea se desploma
  const sube = tramo(t, cinco - 0.7, cinco - 0.1) - tramo(t, desaparece - 0.2, desaparece + 0.5);
  if (sube > 0) {
    const wx = 112, wy = Math.round(lerp(200, 134, sube));
    T.brazo(R, 74, 204, wx - 12, wy + 8, '#3a4a6a', 1, { codo: [88, wy + 34] });
    const cx = wx + 8, cy = wy - 14, vuelta = tramo(t, cinco - 0.1, b(0.205));
    R.disco(cx + 2, cy + 2, 17, hex('#b8b0a0'));
    R.disco(cx, cy, 17, K); R.disco(cx, cy, 16, hex('#c8c8d0')); R.disco(cx - 1, cy - 1, 15, hex('#e8e8f0')); R.disco(cx, cy, 13, hex('#f4f2e8'));
    R.rect(cx - 3, cy - 22, cx + 3, cy - 17, K); R.rect(cx - 2, cy - 21, cx + 2, cy - 18, hex('#c8c8d0')); R.rect(cx + 11, cy - 16, cx + 14, cy - 13, K);
    for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6, l = k % 3 ? 11 : 9; R.linea(Math.round(cx + Math.cos(an) * l), Math.round(cy + Math.sin(an) * l), Math.round(cx + Math.cos(an) * 12), Math.round(cy + Math.sin(an) * 12), K); }
    const an = -Math.PI / 2 + vuelta * 5 * 2 * Math.PI; R.linea(cx, cy, Math.round(cx + Math.cos(an) * 11), Math.round(cy + Math.sin(an) * 11), hex('#d0383a')); R.linea(cx + 1, cy, Math.round(cx + 1 + Math.cos(an) * 11), Math.round(cy + Math.sin(an) * 11), hex('#d0383a'));
    R.disco(cx, cy, 1, K); R.pset(cx - 6, cy - 8, hex('#ffffff')); R.pset(cx - 7, cy - 7, hex('#ffffff'));
    const n = Math.min(5, Math.floor(vuelta * 5 + 0.001) + (vuelta > 0 ? 1 : 0)); if (vuelta > 0) R.numero(String(n), cx + 22, cy - 2, { tam: 16 });
  }
};

// 6 · hoy, el diván: Warshaw escucha
const p6 = (t) => {
  T.hoy(R, t, { encuadre: 'consulta', camara: 'divan' });
  R.actor(EL.paciente, 160, 150, t, { dir: 1, habla: Math.sin(t * 8) > -0.3, dedo: t > escucha && t < gente + 0.5, triste: t < escucha });
  const bi = Math.floor((t - P6) / 0.9); if (t > P6 + 0.3 && t < gente + 0.4 && (t - P6) % 0.9 < 0.75) R.bocadillo(178, 112, { icono: ['?', '!', '?', 'X', '?'][bi % 5] });
  const v = tramo(t, P6 + 0.1, progr + 0.9), wx = Math.round(lerp(330, 252, v));
  const w = R.actor(EL.warshawHoy, wx, 168, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: t > gente, sostiene: [wx - 1, 152] });
  if (w.mano) { const [mx, my] = w.mano; R.rect(mx - 6, my - 7, mx + 1, my + 2, K); R.rect(mx - 5, my - 6, mx, my + 1, hex('#f4f0dc')); for (let y = my - 4; y < my; y += 2) R.linea(mx - 4, y, mx - 1, y, hex('#8a8aa0')); if (t > escucha && Math.floor(t * 6) % 2) R.pset(mx - 2, my, hex('#3a6ad8')); }
  T.hoyDelante(R, t, { encuadre: 'consulta', camara: 'divan' });
};

// 7 · el estudio: el foso se abre y el cartucho rueda y cae (gag 1)
const p7 = (t) => {
  const fo = tramo(t, verdad - 0.2, verdad + 0.5);
  const o = { encuadre: 'estudio', foso: fo };
  T.hoy(R, t, o);
  // el gato sale de debajo del puf, va hacia el foso y se asoma
  const gv = tramo(t, P7 + 0.4, justo), sal = tramo(t, oiste + 0.1, oiste + 0.5), gx = Math.round(lerp(28, 96, gv) - 14 * sal);
  const anda = (gv > 0 && gv < 1) || (sal > 0 && sal < 1), fr = anda ? Math.floor(t * 8) % 2 : 0, gy = 147 - (sal > 0 && sal < 1 ? Math.round(Math.sin(sal * Math.PI) * 8) : 0);
  const cuerpo = ['...............k..k.', '..............kGkkGk', '..............kGGGGk', '.k............kGYGYk', 'kGk...........kGGPGk', 'kGk..kkkkkkkkkkGWWk.', '.kGkkGGGGGGGGGGGWWk.', '..kGGGGgGGGgGGGGWk..', '...kGGGGGGGGGGGGGk..', '...kGGgkkkkkkkGGgk..'];
  const patas = fr ? ['....kGk.....kGk.....', '....kk......kk......'] : ['...kGk.......kGk....', '...kk........kk.....'];
  const pg = { k: K, G: hex('#8a8a96'), g: hex('#5a5a66'), W: hex('#f2f2f2'), Y: (t * 1.3) % 3 < 0.1 ? hex('#5a5a66') : hex('#c8e040'), P: hex('#e88aa0') };
  for (let i = 3; i < 17; i++) R.pset(gx + i, 159, hex('#6a4020'));
  R.dibujo([...cuerpo, ...patas], gx, gy, 1, pg);
  if (t > oiste + 0.1 && t < oiste + 1.6) R.bocadillo(gx + 16, gy - 4, { icono: '!' });
  // el cartucho: rueda por el tablero de x 214 a 172, cae dando vueltas y se hunde en el foso
  const ro = tramo(t, justo, oiste - 0.35), ca = tramo(t, oiste - 0.35, oiste + 0.15);
  if (ca < 1) {
    let x, y, ang;
    if (ca === 0) { x = lerp(212, 176, ro); y = 109 - Math.abs(Math.sin(ro * Math.PI * 5)) * 3; ang = -ro * Math.PI * 2.5; }
    else { x = lerp(176, 146, ca); y = 109 + ca * ca * 52; ang = -Math.PI * 2.5 - ca * Math.PI * 1.5; }
    if (ca > 0.7) R.recorte([0, 0, 319, 166]);
    cartRot(x, y, ang, 'rojo', 'foso', 2);
    R.recorte(null);
  }
  if (ca >= 1 && t < oiste + 0.6) for (let k = 0; k < 6; k++) { const f = tramo(t, oiste + 0.15, oiste + 0.6); R.pset(Math.round(146 + (k - 2.5) * 6 * f), Math.round(156 - 8 * f + k % 2), hex('#c8a878')); }
  T.hoyDelante(R, t, { ...o, tapaFoso: ca > 0.6 });
};

const efectos = [[0.4, 'motor'], [vuelca, 'avalancha'], [cubre, 'chof'], [treinta + 0.1, 'whoosh'], [peor, 'aviso'], [bajo + 0.6, 'coche'],
  [P4 + 0.3, 'arranque'], [comprobar, 'brillo'], [cinco, 'tic'], [desaparece, 'boom'], [escucha, 'lapiz'], [verdad, 'cerrojo'], [justo + 0.1, 'golpecito'], [oiste - 0.1, 'boing']];
const año = (t) => t < treinta ? 1983 : t < P3 ? Math.round(lerp(1983, 1998, tramo(t, treinta, P3))) : t < P4 ? Math.round(lerp(1998, 2013, tramo(t, P3, P4 - 0.3))) : t < P5 ? 2014 : t < P6 ? 1983 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['at-hola'] = ('Hola', '''// AT-HOLA (frase 3), hoy, 2026. Un plano: la mesa del estudio de cerca. Atom salta a saludar en «I'm Atom» junto a la
// consola vieja y el cajón de cartuchos; en «explain the things» hace flotar un cartucho y lo pincha en la consola; en
// «wondered about» salen los «?»; en «Let's find out» la tele se enciende con el juego de los fosos y Atom se acerca.''', AYUDAS + r'''
const h = (f) => en('hola', f);
R.companero = () => {};   // Atom está en el plano: la esquina queda tranquila
const atom = h(0.035), explica = h(0.218), cosas = h(0.35), pregunta = h(0.5405), vamos = h(0.80), fin = h(0.9);
const p1 = (t) => {
  const pincha = tramo(t, explica, pregunta - 0.2), tele = t > vamos;
  const o = { encuadre: 'estudio', camara: 'mesa', cartuchoPuesto: pincha >= 1 ? 'rojo' : false,
    pantalla: tele ? undefined : (R2, tt, [x0, y0, x1, y1]) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R2.pset(x, y, ((x * 7 + y * 13 + Math.floor(tt * 30)) % 17) < 2 ? hex('#3a4a4a') : hex('#141c1e')); } };
  T.hoy(R, t, o);
  // la tele se enciende: un destello que se abre desde la raya del centro
  const enc = tramo(t, vamos, vamos + 0.35);
  if (enc > 0 && enc < 1) { const hh = Math.round(26 * enc); R.recorte([42, 34, 110, 86]); for (let y = 60 - hh; y <= 60 + hh; y++) R.linea(42, y, 110, y, hex('#e8f4ff')); R.recorte(null); }
  // el cartucho que flota desde el cajón hasta la ranura de la consola
  if (pincha > 0 && pincha < 1) {
    const x = lerp(270, 196, pincha), y = lerp(112, 82, Math.sin(pincha * Math.PI) * 0.9) + pincha * 4;
    cartRot(x, y, (1 - pincha) * 0.6, 'rojo', 'foso', 2);
    for (let k = 0; k < 6; k++) { const an = t * 6 + k; R.pset(Math.round(x + Math.cos(an) * 16), Math.round(y + Math.sin(an) * 10), hex('#c8f0ff')); }
  }
  // los «?» de lo que siempre te has preguntado
  if (t > pregunta - 0.2 && t < vamos) for (let i = 0; i < 3; i++) { if (t < pregunta - 0.2 + i * 0.3) continue; R.icono('?', 54 + i * 18, 52 - (i & 1) * 8 - Math.round(Math.sin(t * 4 + i) * 2), hex('#ffe890'), K, 2); }
  // Atom: salta para saludar, guía el cartucho y vuela hacia la tele en «Let's find out»
  const sal = t > atom && t < explica ? Math.round(Math.abs(Math.sin((t - atom) * Math.PI * 2.2)) * 16) : 0;
  const lleva = tramo(t, explica - 0.3, explica + 0.2) - tramo(t, pregunta - 0.3, pregunta + 0.2), v = tramo(t, vamos, fin + 0.5);
  const ax = Math.round(lerp(lerp(162, 236, lleva), 126, v)), ay = Math.round(lerp(lerp(64, 56, lleva), 38, v)) - sal + Math.round(Math.sin(t * 2.6) * 2);
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / 19; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  if (sal > 0 || (v > 0 && v < 1)) for (let k = 0; k < 10; k++) { const an = k * Math.PI / 5 + t * 4, rr = 17 + Math.sin(t * 9) * 2; R.pset(Math.round(ax + Math.cos(an) * rr), Math.round(ay + Math.sin(an) * rr), hex('#c8f0ff')); }
  R.atomo(ax, ay, t, { r: 14 + (sal > 0 ? 1.5 : 0), orbita: R.PAL.ATOM[7], energia: sal > 0 || (pincha > 0 && pincha < 1) || v > 0 ? 0.7 : 0.3 });
  T.hoyDelante(R, t, o);
};
const efectos = [[atom + 0.05, 'pop'], [explica + 0.1, 'whoosh'], [pregunta - 0.25, 'golpecito'], [vamos, 'interruptor'], [vamos + 0.4, 'brillo']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
