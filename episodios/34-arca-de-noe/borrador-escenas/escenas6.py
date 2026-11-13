"""Borrador de escenas del ep34 (grupo S6): nx-geologia y nx-wyatt. Formato del 11: E[id] = (título, comentario de
cabecera, cuerpo). Los cortes y las acciones van en segundos de la voz inglesa (linea.json), pasados a fracción de su
frase con en('marca', f)."""
E = {}

# lo común a las dos: el negro de contorno, el globo de hablar con su pico, el aspa roja y el destello
COMUN = r'''
const K = hex('#1a1622'), BL = hex('#ffffff'), NUBE = hex('#f4f0e4'), ROJO = hex('#d8323a'), ROJOS = hex('#8a1c24'), AMA = hex('#f4c020'), AMAS = hex('#c88a10');
const sua = (u) => u * u * (3 - 2 * u);
const globo = (cx, cy, w, h, px, py) => {
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2), x1 = x0 + w, y1 = y0 + h;
  R.rect(x0 + 1, y0 - 1, x1 - 1, y1 + 1, K); R.rect(x0 - 1, y0 + 1, x1 + 1, y1 - 1, K);
  if (px != null) { const bx = Math.max(x0 + 4, Math.min(x1 - 4, px)); R.poligono([[bx - 4, y1], [bx + 4, y1], [px, py]], K); R.poligono([[bx - 2, y1], [bx + 2, y1], [px, py - 2]], NUBE); }
  R.rect(x0 + 1, y0, x1 - 1, y1, NUBE); R.rect(x0, y0 + 1, x1, y1 - 1, NUBE); R.rect(x0 + 2, y1, x1 - 2, y1, hex('#d4ccb8'));
};
const aspa = (cx, cy, r, u = 1) => { const n = Math.round(r * 2 * Math.min(1, u * 2)), m = Math.round(r * 2 * Math.max(0, u * 2 - 1));
  for (const d of [-1, 0, 1, 2]) { const c = d === 2 || d === -1 ? ROJOS : ROJO; for (let i = 0; i <= n; i++) R.pset(cx - r + i + d, cy - r + i, c); for (let i = 0; i <= m; i++) R.pset(cx + r - i + d, cy - r + i, c); } };
const destello = (x, y, r, c = BL) => { R.rect(x - r, y, x + r, y, c); R.rect(x, y - r, x, y + r, c); if (r > 2) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
const aro = (cx, cy, r, c, t, n = 40) => { for (let k = 0; k < n; k++) if ((k + Math.floor(t * 10)) % 4 < 3) { const an = k / n * 6.283, x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r); R.rect(x, y, x + 1, y + 1, K); R.pset(x, y, c); } };
'''

E['nx-geologia'] = ('Lo que dice la geología', '''// NX-GEOLOGIA (frase 18), hoy. Cuatro planos:
// 1. el despacho del geólogo, sin la mesa: Collins llega junto a la vitrina fría y señala el cilindro de hielo; una
//    marca baja por el testigo capa a capa; al fondo, otro geólogo lleva una muestra a la cajonera;
// 2. (corta en «rocks») la ladera en corte: una lupa baja capa a capa por las rocas mientras la geóloga, en la orilla,
//    mira; en su globo, un planeta que el agua cubre entero… y un aspa («no trace»);
// 3. (corta en «That takes») los tres libros, intactos y con la misma luz: una mano deja la lupa en el paño, lejos de
//    ellos, y se retira; un mismo brillo recorre las tres tapas a la vez; llegan oyentes («those who believe»);
// 4. (corta en «It only means») la balanza: una mano posa la lupa en su platillo («science»), el astil oscila y se
//    queda nivelado; sobre cada platillo, un «?» de distinto color («different questions»).''', COMUN + r'''
const G0 = 0.5, G1 = 16.34, a = (s) => en('geologia', (s - G0) / (G1 - G0));   // el segundo s de la voz inglesa, como fracción de la frase
const P2 = a(3.62), P3 = a(9.2), P4 = a(12.98);
const AZ = hex('#3a8ae8'), AZS = hex('#1e4a9a');
const roca = (x, y) => { R.rect(x - 4, y - 5, x + 3, y, K); R.rect(x - 3, y - 6, x + 2, y - 6, K); R.rect(x - 3, y - 5, x + 2, y - 1, hex('#8a7a6a')); R.rect(x - 2, y - 5, x, y - 4, hex('#b8a890')); R.pset(x + 1, y - 2, hex('#5a4a40')); R.pset(x - 2, y - 2, hex('#c85a3a')); };

// ── 1 · el despacho: el testigo de hielo ──
const p1 = (t) => {
  const o = { encuadre: 'geologo', sinMesa: true }; T.hoy(R, t, o);
  // la marca que baja por el cilindro de hielo, capa a capa (x 174–186, y 56–134)
  const ub = tramo(t, a(1.5), a(3.3)), yb = Math.round(lerp(60, 130, ub));
  if (ub > 0) { for (let y = 62; y <= yb; y += 8) { R.rect(188, y, 191, y, BL); R.pset(192, y, K); }
    const c = Math.sin(t * 12) > 0 ? AMA : BL; R.poligono([[166, yb - 3], [166, yb + 3], [171, yb]], K); R.poligono([[167, yb - 2], [167, yb + 2], [170, yb]], c); R.poligono([[194, yb - 3], [194, yb + 3], [189, yb]], K); R.poligono([[193, yb - 2], [193, yb + 2], [190, yb]], c);
    if (Math.floor(t * 6) % 3 === 0) destello(180, yb, 2); }
  // al fondo, el otro geólogo lleva una muestra de la estantería a la cajonera
  const ug = tramo(t, 0.3, 2.4), gx = Math.round(lerp(34, 100, ug)), deja = tramo(t, 2.5, 2.9);
  const q = R.actor(EL.geologo2NX, gx, 168, t, { dir: 1, anda: ug > 0 && ug < 1, sostiene: deja < 1 ? true : undefined, sonrisa: deja >= 1 });
  if (deja < 1) roca(q.mano[0] + 1, q.mano[1] + 3);
  // Collins llega junto a la vitrina y señala el hielo
  const uc = tramo(t, 0.1, a(1.4)), cx = Math.round(lerp(290, 208, uc));
  R.actor(EL.collins, cx, 168, t, { dir: -1, anda: uc > 0 && uc < 1, dedo: uc >= 1, habla: uc >= 1 && Math.sin(t * 9) > 0 });
  T.hoyDelante(R, t, o);
};

// ── 2 · el corte: capa a capa, ni rastro ──
const p2 = (t) => {
  const o = { encuadre: 'corte', fase: 0 }; T.ladera(R, t, o);
  // la lupa baja por las capas del cuenco
  const ul = tramo(t, P2 + 0.2, a(5.9)), lx = Math.round(172 + Math.sin(ul * 9.4) * 46), ly = Math.round(lerp(92, 140, ul));
  for (let k = 0; k < 5; k++) if (ul > (k + 0.5) / 5.5) { const mx = Math.round(172 + Math.sin((k + 0.5) / 5.5 * 9.4) * 46), my = Math.round(lerp(92, 140, (k + 0.5) / 5.5)) - 14; R.rect(mx - 3, my - 3, mx + 3, my + 3, K); R.rect(mx - 2, my - 2, mx + 2, my + 2, NUBE); R.rect(mx - 1, my, mx + 1, my, hex('#8a8a94')); }
  T.PIEZAS_NX.lupa(R, lx + 6, ly + 6 + (ul >= 1 ? Math.round(Math.sin(t * 3)) : 0), { s: 2 });
  // la geóloga, en la orilla: mira, y cuenta lo que NO hay
  const g = R.actor(EL.geologa3NX, 6, 74, t, { dir: 1, habla: t > a(5.0) && t < a(8.6) && Math.sin(t * 9) > 0, dedo: t > a(4.2) && t < a(5.2) });
  const ug = tramo(t, a(5.15), a(5.4));
  if (ug > 0.5) { const gx = 50, gy = 37; globo(gx, gy, 32, 24, g.cabeza[0] + 4, g.cabeza[1] - 1);
    // el planeta: mares y tierras… y el agua que lo cubre entero
    const cu = sua(tramo(t, a(6.3), a(7.9))), r = 9, ya = Math.round(gy + r - cu * 2 * r);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = i * i + j * j; if (d > r * r + 2) continue; const x = gx + i, y = gy + j;
      const tierra = Math.sin(i * 0.7 + 1) + Math.cos(j * 0.9 + i * 0.3) > 0.5, agua = y >= ya + Math.round(Math.sin(i * 0.9 + t * 5));
      R.pset(x, y, d > r * r - 14 ? K : agua ? ((i + j + Math.floor(t * 4)) % 5 === 0 ? hex('#9ad0ff') : AZ) : tierra ? hex('#6aa84a') : hex('#bfe0f4')); }
    const ux = tramo(t, a(8.25), a(8.6)); if (ux > 0) aspa(gx, gy, 10, ux); }
  T.laderaDelante(R, t, o);
};

// ── 3 · los tres libros, intactos ──
const p3 = (t) => {
  const o = { encuadre: 'diluvio', camara: 'libros', cuantos: 3, gente: 0.75 * sua(tramo(t, a(11.1), a(12.5))) }; T.relato(R, t, o);
  // el mismo brillo, a la vez, en las tres tapas (x ± 22, y 81–138)
  for (const [t0, t1] of [[a(9.9), a(10.7)], [a(11.9), a(12.7)]]) { const ub = tramo(t, t0, t1); if (ub > 0 && ub < 1) for (const cx of [92, 160, 228]) { const d = Math.round(lerp(-70, 50, ub));
    for (let y = 83; y <= 136; y++) for (let w = 0; w < 5; w++) { const x = cx + d + (136 - y) / 2 + w | 0; if (x > cx - 21 && x < cx + 21 && (x + y) % 2 === 0) R.pset(x, y, w === 2 ? BL : hex('#ffe9a8')); } } }
  // una mano deja la lupa en el paño, lejos de los libros, y se retira: no les quita nada
  const e = sua(tramo(t, P3 + 0.1, a(10.0))), s = sua(tramo(t, a(10.3), a(11.0))), LX = 274, LY = 151;
  const hx = Math.round(lerp(330, LX + 12, e) + s * 60), hy = Math.round(lerp(140, LY - 8, e) - (e < 1 ? Math.sin(e * Math.PI) * 6 : 0));
  if (e >= 1) T.PIEZAS_NX.lupa(R, LX, LY, {});
  if (s < 1) { if (e < 1) T.PIEZAS_NX.lupa(R, hx - 12, hy + 8, {}); T.brazo(R, hx + 44, hy + 30, hx + 6, hy + 2, '#5a7a8a', -1, { codo: [hx + 30, hy + 12] }); }
  T.relatoDelante(R, t, o);
};

// ── 4 · la balanza: preguntas distintas ──
const p4 = (t) => {
  const pone = tramo(t, P4 + 0.15, a(13.95)), puesta = pone >= 1, eq = sua(tramo(t, a(14.0), a(15.3)));
  const o = { encuadre: 'balanza', lupa: puesta, equilibrio: puesta ? eq : 1, inclina: puesta ? (1 - eq) * 0.5 * Math.cos((t - a(13.95)) * 5) : 0.75 };
  const g = T.mesas(R, t, o), [dx, dy] = g.platillos[1], [ix, iy] = g.platillos[0];
  // la mano que trae la lupa al platillo derecho y se va
  const sale = sua(tramo(t, a(14.0), a(14.6)));
  if (sale < 1) { const u = sua(pone), hx = Math.round(lerp(330, dx + 12, u) + sale * 70), hy = Math.round(lerp(70, dy - 8, u) - sale * 20);
    if (!puesta) T.PIEZAS_NX.lupa(R, hx - 11, hy + 8, {});
    T.mano(R, hx, hy, -1, '#5a7a8a', { sinManga: true }); }
  // «different questions»: un «?» sobre cada platillo, cada uno de su color
  const q1 = tramo(t, a(15.26), a(15.45)), q2 = tramo(t, a(15.62), a(15.8));
  if (q1 > 0) R.icono('?', ix - 6, Math.round(iy - 46 - q1 * 4 + Math.sin(t * 3) * 1.5), AMA, K, 2);
  if (q2 > 0) R.icono('?', dx - 6, Math.round(dy - 46 - q2 * 4 + Math.sin(t * 3 + 2) * 1.5), hex('#6ac0ff'), K, 2);
  T.mesasDelante(R, t, o);
};

const efectos = [[a(1.5), 'brillo'], [2.5, 'toc'], [a(4.3), 'tic'], [a(5.2), 'pop'], [a(6.4), 'ola'], [a(8.3), 'golpecito'], [a(10.0), 'toc'], [a(11.2), 'publico'], [a(13.95), 'golpecito'], [a(15.26), 'pop'], [a(15.62), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

E['nx-wyatt'] = ('Wyatt y Fasold', '''// NX-WYATT (frases 19 y 20), 1977 → años noventa. Ocho planos:
// 1. el mapa: una línea de puntos llega desde el oeste hasta el alfiler de la ladera; Wyatt, con su mochila, entra por
//    delante del mapa y lo señala;  2. (corta en «arrived») gag 6: dentro de la forma, Wyatt clava una estaca y tira de
//    la cinta métrica… que se acaba a la mitad; el resto queda a puntos, con su «?», y la cinta se recoge sola;
// 3. (corta en «He came back») la manta de los hallazgos: una mano los va dejando; en un globo (lo dice él), la madera
//    y el remache;  4. (corta en «stones») el pueblo, a unos kilómetros: Wyatt llega a la gran piedra con agujero y la
//    señala; en su globo, un ancla («according to him»);  5. (corta al empezar la frase 20) la ladera de lejos, 1987:
//    llegan turistas con su libro y su cámara, y en «opened» aparece el centro de visitantes;
// 6. (corta en «Working») la mesa: una mano deja la gorra de marino; sobre el libro abierto de Fasold, una pluma dibuja
//    un barco dentro del contorno de la roca;  7. (corta en «But») el laboratorio: Fasold trae una muestra, el geólogo
//    la recibe y mira el monitor; pasan los años y a Fasold le sale un «?»;
// 8. (corta en «though») su escritorio: el «?» a lápiz sobre la foto; por la derecha, el globo de sus amigos (lo dicen
//    ellos): la roca = un barco. El «?» no se borra.''', COMUN + r'''
const W0 = 1.5, W1 = 20.251, F0 = 21.508, F1 = 40.224;
const w = (s) => en('wyatt', (s - W0) / (W1 - W0)), f = (s) => en('fasold', (s - F0) / (F1 - F0));   // el segundo s de la voz, como fracción de su frase
const P2 = w(6.42), P3 = w(11.52), P4 = w(16.82), P5 = f(21.4), P6 = f(26.4), P7 = f(32.28), P8 = f(36.25);
const MARINO = '#22304e';

// ── 1 · el mapa: de vuelta a la ladera ──
const p1 = (t) => {
  const g = T.papeles(R, t, { encuadre: 'mapa', judi: 0 }), [lx, ly] = g.ladera;
  // la línea de puntos llega desde el oeste
  const v = sua(tramo(t, w(1.5), w(3.3))), N = 64, pt = (s) => [lerp(18, lx, s), lerp(132, ly, s) - Math.sin(s * Math.PI) * 34];
  for (let i = 0; i < N * v; i++) if (i % 4 < 2) { const [x, y] = pt(i / N); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#7a2e2e')); }
  if (v > 0 && v < 1) { const [x, y] = pt(v), [x2, y2] = pt(Math.min(1, v + 0.03)), an = Math.atan2(y2 - y, x2 - x), q = (i, j) => [Math.round(x + i * Math.cos(an) - j * Math.sin(an)), Math.round(y + i * Math.sin(an) + j * Math.cos(an))];
    R.poligono([q(8, 0), q(-3, -6), q(-3, 6)], K); R.poligono([q(5, 0), q(-2, -4), q(-2, 4)], ROJO); }
  T.chincheta(R, lx, ly, t, T.C.rojo, { pulso: v >= 1 });
  if (v >= 1) { const r = 9 + Math.round(4 * tramo(t, w(3.3), w(3.7))); aro(lx, ly - 2, r, AMA, t, 36); }
  // Wyatt, por delante del mapa: entra, se para y señala el alfiler
  const u = tramo(t, w(3.5), w(5.5)), wx = Math.round(lerp(-18, 138, u));
  R.actor(EL.wyatt, wx, 179, t, { dir: 1, anda: u > 0 && u < 1, dedo: u >= 1, habla: u >= 1 && Math.sin(t * 9) > 0 });
};

// ── 2 · gag 6: la cinta se acaba a la mitad ──
const p2 = (t) => {
  const o = { camara: 'cerca', epoca: 1977 }; T.ladera(R, t, o);
  const X0 = 78, X1 = 248, SU = 160, LMAX = 84;
  // la estaca con su banderín
  R.rect(X0 - 1, SU - 13, X0 + 1, SU, K); R.rect(X0, SU - 12, X0, SU - 1, hex('#c8a060')); R.poligono([[X0 + 1, SU - 13], [X0 + 8, SU - 11 + Math.round(Math.sin(t * 6))], [X0 + 1, SU - 8]], ROJO);
  // Wyatt tira de la cinta hacia la otra borda
  const tir = tramo(t, P2 + 0.35, w(9.0)), rec = tramo(t, w(10.45), w(10.75));
  const tiron = tir >= 1 && rec === 0 ? Math.max(0, Math.sin((t - w(9.0)) * 11)) * (t < w(9.9) ? 3 : 0) : 0;
  const hx = Math.round(X0 + 6 + LMAX * sua(tir) + tiron), wx = hx - 20;
  const q = R.actor(EL.wyatt, wx, SU, t, { dir: 1, anda: tir > 0 && tir < 1, sostiene: [hx, SU - 9], sorpresa: tir >= 1 && t < w(9.9) });
  // lo que falta hasta la otra borda, a puntos, con su «?»
  const falta = tramo(t, w(9.5), w(10.2));
  if (falta > 0) { const xf = Math.round(lerp(hx + 8, X1, falta)); for (let x = hx + 8; x <= xf; x += 5) { R.rect(x, SU - 9, x + 2, SU - 8, K); R.rect(x, SU - 10, x + 1, SU - 9, BL); }
    if (falta >= 1) { R.rect(X1 - 1, SU - 15, X1 + 1, SU - 3, K); R.rect(X1, SU - 14, X1, SU - 4, BL); R.icono('?', Math.round((hx + X1) / 2) - 2, SU - 30 + Math.round(Math.sin(t * 4) * 1.5), AMA, K, 2); } }
  const mx = q.mano[0], my = q.mano[1], L = Math.max(0, Math.round((mx - X0 - 5) * (1 - rec)));
  T.PIEZAS_NX.cinta(R, mx, my + 6, { largo: L, dir: -1 });
  if (tiron > 1.5) R.icono('!', mx - 2, my - 26, ROJO, K, 1);
  // el cuervo de la borda, que se va cuando la cinta se recoge
  const vu = tramo(t, w(10.5), w(11.4)), bx = Math.round(lerp(228, 330, vu)), by = Math.round(lerp(112, 60, vu)), al = vu > 0 ? Math.sin(t * 22) > 0 : false, sal = vu === 0 && (t * 1.3) % 2 < 0.15 ? 1 : 0;
  R.rect(bx - 3, by - 4 - sal, bx + 2, by - 1 - sal, K); R.rect(bx + 2, by - 5 - sal, bx + 4, by - 3 - sal, K); R.pset(bx + 5, by - 4 - sal, hex('#c8a040')); R.pset(bx + 3, by - 5 - sal, BL); R.rect(bx - 5, by - 3 - sal, bx - 4, by - 2 - sal, K);
  if (vu > 0) { R.rect(bx - 2, by - (al ? 8 : 1), bx + 1, by - (al ? 5 : -1), K); } else { R.pset(bx - 1, by - sal, K); R.pset(bx + 1, by - sal, K); }
  T.laderaDelante(R, t, o);
};

// ── 3 · la manta: lo que dijo haber encontrado ──
const tronco = (x, y) => { R.rect(x - 11, y - 5, x + 11, y + 4, K); R.rect(x - 10, y - 4, x + 10, y + 3, hex('#7a5a3a')); R.rect(x - 10, y - 4, x + 10, y - 3, hex('#a8845a')); for (const [i, j, l] of [[-8, -1, 6], [1, 0, 7], [-5, 2, 9], [5, -2, 4]]) R.rect(x + i, y + j, x + i + l, y + j, hex('#4a3422')); R.rect(x + 8, y - 4, x + 10, y + 3, hex('#c8b08a')); R.pset(x + 9, y, hex('#7a5a3a')); R.rect(x - 4, y - 5, x - 3, y - 2, K); R.pset(x - 4, y - 4, hex('#9a9a9a')); };
const p3 = (t) => {
  const NH = 9, h = Math.min(1, tramo(t, P3 + 0.2, w(15.3)) * 1.02), k = Math.min(NH - 1, Math.floor(h * NH)), fr = h * NH - k;
  const mk = t > w(15.44) ? 0 : t > w(14.1) ? 4 : undefined;
  const o = { encuadre: 'manta', hallazgos: (k + (fr > 0.55 ? 1 : 0)) / NH, marca: mk }; const g = T.mesas(R, t, o);
  // la mano va de sitio en sitio, dejándolos
  if (h < 1) { const s0 = g.sitios[k], s1 = g.sitios[Math.min(NH - 1, k + 1)], baja = Math.sin(Math.min(1, fr / 0.55) * Math.PI / 2), u = fr > 0.55 ? sua((fr - 0.55) / 0.45) : 0;
    const mx = Math.round(lerp(s0[0], s1[0], u)) + 12, my = Math.round(lerp(s0[1], s1[1], u) - 10 + baja * 8 - Math.sin(u * Math.PI) * 6);
    T.mano(R, mx, my, -1, '#a03a2e', { sinManga: true }); }
  // «said he had found…»: lo dice él, en un globo: madera petrificada… y remaches de metal
  const b1 = tramo(t, w(13.3), w(13.5));
  if (b1 > 0.5) { const gx = 268, gy = 108, sal = Math.round(Math.max(0, 1 - Math.abs(t - w(14.15)) * 6) * 2 + Math.max(0, 1 - Math.abs(t - w(15.5)) * 6) * 2);
    globo(gx, gy - sal, 54, 30, 314, 150);
    if (t > w(14.05)) tronco(gx - 12, gy - sal);
    if (t > w(15.44)) T.PIEZAS_NX.remache(R, gx + 14, gy + 9 - sal, { s: 2 });
    else if (t <= w(14.05)) for (let i = 0; i < 3; i++) R.rect(gx - 8 + i * 7, gy - 1 - sal - (Math.floor(t * 5) % 3 === i ? 1 : 0), gx - 6 + i * 7, gy + 1 - sal - (Math.floor(t * 5) % 3 === i ? 1 : 0), hex('#6a6a76')); }
  T.mesasDelante(R, t, o);
};

// ── 4 · el pueblo: la gran piedra con agujero ──
const ancla = (x, y, c) => { R.rect(x - 1, y - 5, x + 1, y + 6, c); R.rect(x - 4, y - 3, x + 4, y - 2, c); R.rect(x - 2, y - 9, x + 2, y - 9, c); R.rect(x - 2, y - 6, x + 2, y - 6, c); R.rect(x - 2, y - 8, x - 2, y - 7, c); R.rect(x + 2, y - 8, x + 2, y - 7, c);
  for (const d of [-1, 1]) { R.rect(x + d * 6, y + 1, x + d * 6, y + 3, c); R.rect(x + d * 5, y + 4, x + d * 5, y + 5, c); R.rect(x + d * 2, y + 6, x + d * 4, y + 6, c); R.rect(x + d * 3, y + 5, x + d * 4, y + 5, c); R.pset(x + d * 7, y + 1, c); R.pset(x + d * 5, y + 1, c); } };
const p4 = (t) => {
  const o = { encuadre: 'pueblo' }; const g = T.vistas(R, t, o), [ax, ay] = [77, 113];
  // Wyatt llega a la piedra y la señala
  const u = tramo(t, P4 - 0.2, w(18.3)), x = Math.round(lerp(196, 100, sua(u)));
  const q = R.actor(EL.wyatt, x, g.suelo ?? 158, t, { dir: -1, anda: u > 0 && u < 1, dedo: u >= 1, habla: t > w(18.5) && t < w(20.2) && Math.sin(t * 9) > 0 });
  // «with holes»: un aro late en el agujero
  if (t > w(17.7) && t < w(19.4)) aro(ax, ay, 8 + Math.round(Math.sin(t * 8)), AMA, t, 28);
  // «according to him, were anchors»: el ancla, en SU globo
  const ub = tramo(t, w(19.35), w(19.56));
  if (ub > 0.5) { const sal = Math.round(Math.max(0, 1 - (t - w(19.56)) * 4) * 3); globo(138, 100 - sal, 30, 28, q.cabeza[0] + 5, q.cabeza[1] - 2); ancla(138, 101 - sal, hex('#4a5a7a')); }
  T.vistasDelante(R, t, o);
};

// ── 5 · la ladera, famosa: turistas y el centro de visitantes ──
const p5 = (t) => {
  const TA = f(24.5), abre = t >= TA, o = { epoca: 1977, centro: abre }; T.ladera(R, t, o);
  // «opened a visitor center»: aparece entre destellos, con una flecha que lo señala
  const da = t - TA;
  if (abre) { if (da < 1.1) for (let k = 0; k < 7; k++) { const an = k * 0.9 + da * 2, r = 8 + da * 16; destello(Math.round(52 + Math.cos(an) * r * 1.3), Math.round(51 + Math.sin(an) * r * 0.6), da < 0.6 ? 2 : 1, k % 2 ? AMA : BL); }
    const b = Math.round(Math.abs(Math.sin(t * 5)) * 3), fx = 52, fy = 36 - b; R.poligono([[fx - 6, fy - 5], [fx + 6, fy - 5], [fx, fy + 3]], K); R.rect(fx - 3, fy - 13, fx + 3, fy - 5, K); R.poligono([[fx - 4, fy - 4], [fx + 4, fy - 4], [fx, fy + 1]], AMA); R.rect(fx - 2, fy - 12, fx + 2, fy - 4, AMA); }
  // los turistas llegan a la terraza: una con el libro, otro hace una foto
  const u1 = tramo(t, P5, f(22.9)), x1 = Math.round(lerp(240, 150, u1)), foto = t > f(23.15) && t < f(23.4), va = tramo(t, f(25.0), f(26.6));
  const u2 = tramo(t, P5 + 0.3, f(23.4)), x2 = Math.round(lerp(262, 186, u2));
  const q2 = R.actor(EL.turista2NX, x2 - Math.round(va * 22), 163, t, { dir: -1, anda: (u2 > 0 && u2 < 1) || (va > 0 && va < 1), sostiene: true, sonrisa: true, sorpresa: abre && da < 0.6 });
  R.rect(q2.mano[0] - 4, q2.mano[1] - 3, q2.mano[0] + 3, q2.mano[1] + 6, K); R.rect(q2.mano[0] - 3, q2.mano[1] - 2, q2.mano[0] + 2, q2.mano[1] + 5, hex('#2a5a9a')); R.rect(q2.mano[0] - 2, q2.mano[1], q2.mano[0] + 1, q2.mano[1] + 1, AMA); R.rect(q2.mano[0] + 2, q2.mano[1] - 2, q2.mano[0] + 2, q2.mano[1] + 5, NUBE);
  const q1 = R.actor(EL.turista1NX, x1 - Math.round(va * 30), 161, t, { dir: -1, anda: (u1 > 0 && u1 < 1) || (va > 0 && va < 1), dedo: u1 >= 1 && t < f(24.3) && !foto, sorpresa: abre && da < 0.6, sonrisa: true });
  if (foto) { destello(q1.cabeza[0] - 9, q1.cabeza[1] + 9, 4); destello(q1.cabeza[0] - 9, q1.cabeza[1] + 9, 2, AMA); }
  T.laderaDelante(R, t, o);
};

// ── 6 · el libro de Fasold, marino mercante ──
const CR = hex('#f0e6cc'), CRS = hex('#d8c8a0'), TIN = hex('#4a4250'), TAPA = hex('#1e3a6a'), TAPAS = hex('#122448');
const gorra = (x, y) => { R.disco(x + 2, y + 3, 13, hex('#2a2018')); R.disco(x, y, 13, K); R.disco(x, y, 12, hex('#e8e8ee')); R.disco(x - 2, y - 2, 8, BL); R.disco(x, y, 6, hex('#cfd0da'));
  R.poligono([[x - 12, y + 6], [x + 12, y + 6], [x + 8, y + 15], [x - 8, y + 15]], K); R.poligono([[x - 10, y + 7], [x + 10, y + 7], [x + 7, y + 13], [x - 7, y + 13]], hex('#1a2a4a')); R.rect(x - 6, y + 8, x + 2, y + 8, hex('#3a5a8a'));
  R.rect(x - 11, y + 4, x + 11, y + 6, hex('#1a2a4a')); R.rect(x - 2, y + 2, x + 2, y + 6, AMA); R.pset(x, y + 4, AMAS); R.rect(x - 10, y + 6, x + 10, y + 6, AMA); };
// el contorno de la roca visto desde arriba (media anchura en s, de proa a popa) y las líneas del barco que la pluma dibuja
const hw = (s) => 15 * Math.pow(Math.sin(Math.PI * Math.pow(s, 0.8)), 0.7);
const TRAZOS = (() => { const L = [], cx = 208, cy = 104, X = (s) => cx - 38 + 76 * s; L.push([X(0.02), cy, X(0.98), cy]);
  for (const s of [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.86]) L.push([X(s), cy - hw(s) + 2, X(s), cy + hw(s) - 2]);
  L.push([X(0.4), cy - 5, X(0.66), cy - 5], [X(0.66), cy - 5, X(0.66), cy + 5], [X(0.66), cy + 5, X(0.4), cy + 5], [X(0.4), cy + 5, X(0.4), cy - 5]); return L; })();
const p6 = (t) => {
  const o = { encuadre: 'mapa', camara: 'revista', manos: 0 }; T.papeles(R, t, o);
  // el libro abierto, encima de la revista (la tapa azul asoma; lomo en x 160)
  R.rect(58, 60, 264, 178, hex('#2a2018')); R.rect(56, 57, 262, 175, K); R.rect(57, 58, 261, 174, TAPA); R.rect(57, 172, 261, 174, TAPAS); R.rect(57, 58, 261, 58, hex('#3a5a9a'));
  for (const [x0, x1] of [[61, 159], [161, 258]]) { R.rect(x0, 61, x1, 171, CRS); R.rect(x0, 61, x1, 169, CR); R.rect(x0, 170, x1, 170, hex('#b8a880')); }
  for (let i = 0; i < 6; i++) { R.rect(154 + i, 61, 154 + i, 169, [CR, CR, hex('#e4d8b8'), CRS, hex('#c0b088'), hex('#a09070')][i]); R.rect(165 - i, 61, 165 - i, 169, [CR, CR, hex('#e4d8b8'), CRS, hex('#c0b088'), hex('#a09070')][i]); }
  R.rect(160, 58, 160, 174, TAPAS); R.rect(196, 58, 199, 60, ROJO); R.rect(196, 172, 199, 179, ROJO); R.rect(196, 177, 199, 179, ROJOS);
  // página izquierda: la foto de la roca, sus cotas y las rayas del texto
  R.rect(70, 68, 148, 110, K); R.rect(71, 69, 147, 109, hex('#8a8468')); for (let y = 69; y <= 109; y++) for (let x = 71; x <= 147; x++) if ((x * 7 + y * 13) % 11 === 0) R.pset(x, y, hex('#a09a78')); else if ((x * 5 + y * 3) % 17 === 0) R.pset(x, y, hex('#6e6a52'));
  for (let i = 0; i <= 60; i++) { const s = i / 60, x = Math.round(79 + 60 * s), d = Math.round(hw(s) * 0.8); R.rect(x, 89 - d, x, 89 + d, hex('#5a5640')); R.pset(x, 89 - d, hex('#d8d0a8')); R.pset(x, 89 + d, hex('#3a3828')); }
  R.rect(79, 116, 139, 116, TIN); R.rect(79, 114, 79, 118, TIN); R.rect(139, 114, 139, 118, TIN); R.numero('300', 109, 128, { color: TIN, sombra: false, centro: true });
  for (let k = 0; k < 6; k++) { const y = 134 + k * 6; R.rect(70, y, 148 - (k === 5 ? 30 : (k * 7) % 12), y, hex('#8a8090')); if (k % 2) R.rect(70, y + 1, 100 + k * 6, y + 1, hex('#c8c0c8')); }
  // página derecha: el contorno de la roca (a puntos) y, encima, el barco que la pluma dibuja
  R.rect(170, 68, 250, 70, TIN); R.rect(170, 73, 222, 73, hex('#8a8090'));
  for (let i = 0; i <= 76; i++) { const s = i / 76, x = 170 + i, d = Math.round(hw(s)); if (i % 3 < 2) { R.pset(x, 104 - d, hex('#8a8090')); R.pset(x, 104 + d, hex('#8a8090')); } }
  for (let k = 0; k < 5; k++) { const y = 138 + k * 6; R.rect(170, y, 250 - (k === 4 ? 36 : (k * 5) % 11), y, hex('#8a8090')); }
  const ud = tramo(t, f(29.85), f(31.7)), n = ud * TRAZOS.length, AZT = hex('#1e3a8a'); let px = 172, py = 104;
  for (let k = 0; k < TRAZOS.length && k < n; k++) { const [x0, y0, x1, y1] = TRAZOS[k], uu = Math.min(1, n - k); px = Math.round(lerp(x0, x1, uu)); py = Math.round(lerp(y0, y1, uu)); R.linea(Math.round(x0), Math.round(y0), px, py, AZT); R.linea(Math.round(x0), Math.round(y0) + 1, px, py + 1, AZT); }
  if (ud >= 1) { for (let i = 0; i <= 76; i++) { const s = i / 76, x = 170 + i, d = Math.round(hw(s)); R.pset(x, 104 - d, AZT); R.pset(x, 104 + d, AZT); R.pset(x, 104 - d - 1, AZT); R.pset(x, 104 + d + 1, AZT); }
    R.rect(203, 122, 213, 123, AZT); R.rect(203, 126, 213, 127, AZT); R.icono('barco', 220, 119, AZT, null, 1); }
  // la gorra de marino, que una mano deja en la mesa («a merchant sailor»)
  const ug = sua(tramo(t, P6 + 0.2, f(27.5))), sg = sua(tramo(t, f(27.9), f(28.6))), GX = 291, GY = 118;
  const gx = Math.round(lerp(340, GX, ug)), gy = Math.round(lerp(96, GY, ug) - Math.sin(ug * Math.PI) * 8);
  gorra(gx, gy);
  if (sg < 1) T.brazo(R, gx + 44 + sg * 40, gy + 34, gx + 13 + sg * 40, gy + 12, MARINO, -1, { codo: [gx + 34 + sg * 40, gy + 20] });
  // la mano con la pluma
  const ep = sua(tramo(t, f(29.3), f(29.85))), sp = sua(tramo(t, f(31.8), f(32.2)));
  if (ep > 0 && sp < 1) { const mx = Math.round(lerp(250, px, ep) + sp * 40), my = Math.round(lerp(190, py, ep) + sp * 60); T.h_estilografica(R, mx, my, 15, 20, '#6a2a2a'); T.mano(R, mx + 14, my + 22, -1, MARINO, { sinManga: true }); }
  T.papelesDelante(R, t, o);
};

// ── 7 · el laboratorio: Fasold quiere comprobarlo ──
const p7 = (t) => {
  const o = { encuadre: 'geologo', camara: 'laboratorio', sobres: 0 }; T.hoy(R, t, o);
  const da = tramo(t, f(33.9), f(34.35));
  // el geólogo, ante el monitor: se vuelve, recibe la muestra y la mira
  const gq = R.actor(EL.geologo2NX, 226, 162, t, { dir: t > f(33.0) && t < f(34.6) ? -1 : 1, sostiene: da > 0.5 ? true : undefined, habla: t > f(34.7) && t < f(35.5) && Math.sin(t * 9) > 0 });
  // Fasold entra por la puerta con la bolsa de muestra
  const uf = tramo(t, P7, f(33.8)), fx = Math.round(lerp(92, 190, sua(uf))), duda = t > f(35.5);
  const fq = R.actor(EL.fasold, fx, 162, t, { dir: 1, anda: uf > 0 && uf < 1, sostiene: da <= 0.5 ? true : undefined, dedo: duda && Math.sin(t * 7) > -0.3, triste: duda });
  const bx = da <= 0.5 ? fq.mano[0] + 2 : gq.mano[0] - (t > f(34.6) ? -2 : 2), by = (da <= 0.5 ? fq.mano[1] : gq.mano[1]) + 9;
  T.PIEZAS_NX.bolsa(R, bx, by, { n: 7 });
  if (duda) R.icono('?', fq.cabeza[0] - 4, fq.cabeza[1] - 18 + Math.round(Math.sin(t * 4) * 1.5), AMA, K, 2);
  T.hoyDelante(R, t, o);
};

// ── 8 · el escritorio: la duda… y lo que dicen sus amigos ──
const p8 = (t) => {
  const d = tramo(t, P8 + 0.25, f(37.2)), o = { encuadre: 'fasold', duda: d }; const g = T.mesas(R, t, o);
  // la mano con el lápiz rojo marca el «?» y se retira
  const sl = sua(tramo(t, f(37.25), f(37.8)));
  if (sl < 1 && g.punta) { const e = sua(tramo(t, P8, P8 + 0.25)), mx = Math.round(g.punta[0] + (1 - e) * 30 + sl * 80), my = Math.round(g.punta[1] + (1 - e) * 50 + sl * 70);
    T.h_estilografica(R, mx, my, 15, 20, '#c83a3a'); T.mano(R, mx + 14, my + 22, -1, MARINO, { sinManga: true }); }
  // «some of his friends say…»: el globo de sus amigos entra por la derecha: la roca = un barco (lo dicen ellos)
  const ub = sua(tramo(t, f(37.3), f(37.9)));
  if (ub > 0) { const gx = Math.round(lerp(360, 262, ub)), gy = 122 + Math.round(Math.sin(t * 2.2) * 2);
    globo(gx, gy, 62, 28, 318, gy + 26);
    for (let i = 0; i <= 18; i++) { const s = i / 18, x = gx - 26 + i, dd = Math.round(hw(s) * 0.35); R.rect(x, gy - dd, x, gy + dd, hex('#8a7a5a')); R.pset(x, gy - dd, hex('#4a3a2a')); R.pset(x, gy + dd, hex('#4a3a2a')); }
    if (t > f(38.9)) { R.rect(gx - 3, gy - 2, gx + 3, gy - 1, TIN); R.rect(gx - 3, gy + 2, gx + 3, gy + 3, TIN); }
    if (t > f(39.14)) { const sal = Math.round(Math.max(0, 1 - (t - f(39.14)) * 4) * 3); R.icono('barco', gx + 9, gy - 8 - sal, hex('#8a4a2a'), null, 2); }
    else for (let i = 0; i < 3; i++) R.rect(gx + 8 + i * 6, gy - (Math.floor(t * 5) % 3 === i ? 2 : 1), gx + 10 + i * 6, gy + 1 - (Math.floor(t * 5) % 3 === i ? 1 : 0), hex('#6a6a76')); }
  T.mesasDelante(R, t, o);
};

const efectos = [[w(1.6), 'lapiz'], [w(3.3), 'toc'], [P2 + 0.2, 'golpecito'], [w(7.6), 'cerrojo'], [w(9.0), 'toc'], [w(9.55), 'toc'], [w(10.45), 'whoosh'], [w(12.0), 'golpecito'], [w(13.4), 'pop'], [w(14.1), 'toc'], [w(15.45), 'tic'],
  [P4 + 0.3, 'aldea', { k: 0 }], [w(17.75), 'brillo'], [w(19.5), 'pop'], [P5 + 0.2, 'viento'], [f(23.15), 'flash'], [f(24.5), 'campana'], [f(27.5), 'toc'], [f(29.9), 'lapiz'], [f(31.7), 'brillo'],
  [P7 + 0.1, 'puerta'], [f(34.1), 'papel'], [f(35.5), 'pop'], [P8 + 0.3, 'lapiz'], [f(37.6), 'whoosh'], [f(39.14), 'pop']];
const año = (t) => (t < P5 ? 1977 : t < P6 ? 1987 : t < P7 ? 1988 : t < P8 ? Math.round(lerp(1988, 1993, tramo(t, P7 + 0.5, P8 - 0.3))) : Math.round(lerp(1993, 1996, tramo(t, P8 + 1, f(40.0)))));
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, cartela: '1977', año });
''')
