"""Borrador de escenas del ep34 (grupo S7): nx-articulo, nx-geologos, nx-radar. Formato del 11: E[id] = (título,
comentario de cabecera, cuerpo). Los cortes y las acciones van en segundos de la voz inglesa (linea.json), pasados a
fracción de su frase con en('marca', f)."""
E = {}

# lo común a las tres: el negro de contorno, el globo de hablar con su pico y el aspa roja
COMUN = r'''
const K = hex('#1a1622'), BL = hex('#ffffff'), NUBE = hex('#f4f0e4'), ROJO = hex('#d8323a'), ROJOS = hex('#8a1c24');
const globo = (cx, cy, w, h, px, py) => {
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2), x1 = x0 + w, y1 = y0 + h;
  R.rect(x0 + 1, y0 - 1, x1 - 1, y1 + 1, K); R.rect(x0 - 1, y0 + 1, x1 + 1, y1 - 1, K);
  if (px != null) { const bx = Math.max(x0 + 4, Math.min(x1 - 4, px)); R.poligono([[bx - 4, y1], [bx + 4, y1], [px, py]], K); R.poligono([[bx - 2, y1], [bx + 2, y1], [px, py - 2]], NUBE); }
  R.rect(x0 + 1, y0, x1 - 1, y1, NUBE); R.rect(x0, y0 + 1, x1, y1 - 1, NUBE); R.rect(x0 + 2, y1, x1 - 2, y1, hex('#d4ccb8'));
};
const aspa = (cx, cy, r, u = 1) => { const n = Math.round(r * 2 * Math.min(1, u * 2)), m = Math.round(r * 2 * Math.max(0, u * 2 - 1));
  for (const d of [-1, 0, 1, 2]) { const c = d === 2 || d === -1 ? ROJOS : ROJO; for (let i = 0; i <= n; i++) R.pset(cx - r + i + d, cy - r + i, c); for (let i = 0; i <= m; i++) R.pset(cx + r - i + d, cy - r + i, c); } };
'''

E['nx-articulo'] = ('El artículo de 1996', '''// NX-ARTICULO (frase 21), 1996. Cinco planos:
// 1. el despacho del geólogo: Fasold entra con el artículo en la mano y lo deja en la mesa de Collins, que le saluda;
//    al fondo, la geóloga coge una muestra de la estantería;  2. (corta en «he signed») el artículo desde arriba: una
//    mano firma, luego la otra, y el título queda subrayado («no doubt»);  3. (corta en «It said») la ladera en corte:
//    Collins señala las capas plegadas, una línea recorre el pliegue («folded layers») y la lluvia y el viento se llevan
//    lo blando («carved by erosion»);  4. (corta antes de «and later ringed») la ladera de lejos, sin nadie: el barro
//    del deslizamiento baja y rodea la forma por los dos lados, y el contorno del «barco» queda dibujado;
// 5. (corta en «The metal») la bandeja de muestras: un aro marca el «remache» y una mano señala su ficha (mineral de
//    hierro); después el «ancla» y la suya (piedra volcánica).''', COMUN + r'''
const A0 = 0.5, A1 = 20.818, a = (s) => en('articulo', (s - A0) / (A1 - A0));   // el segundo s de la voz inglesa, como fracción de la frase
const P2 = a(4.5), P3 = a(8.5), P4 = a(13.45), P5 = a(17.0);
const papelMesa = (x, y) => { R.rect(x - 9, y - 4, x + 9, y, K); R.rect(x - 8, y - 3, x + 8, y - 1, BL); R.rect(x - 6, y - 3, x + 2, y - 3, hex('#3a3a4a')); for (let i = -6; i < 7; i += 2) R.pset(x + i, y - 2, hex('#9a9aa8')); R.rect(x - 8, y - 1, x + 8, y - 1, hex('#d8d4c8')); };
const p1 = (t) => {
  const o = { encuadre: 'geologo' }; T.hoy(R, t, o);
  // al fondo, la geóloga va a la estantería y coge una muestra
  const ug = tramo(t, 0.2, 2.2); R.actor(EL.geologa3NX, Math.round(lerp(-16, 44, ug)), 168, t, { dir: ug < 1 ? 1 : -1, anda: ug > 0 && ug < 1, dedo: ug >= 1 && t < a(3.9), sonrisa: t > a(3.9) });
  // Collins, detrás de su mesa: saluda, se presenta y mira el papel
  R.actor(EL.collins, 152, 149, t, { dir: 1, habla: t > a(0.7) && t < a(2.2) && Math.sin(t * 9) > 0, dedo: t > a(2.5) && t < a(3.6), sonrisa: t > a(2.2) });
  // Fasold entra por la derecha con el artículo y lo deja en la mesa
  const uf = tramo(t, a(0.55), a(3.2)), fx = Math.round(lerp(324, 244, uf)), deja = tramo(t, a(3.4), a(3.95));
  const f = R.actor(EL.fasold, fx, 168, t, { dir: -1, anda: uf > 0 && uf < 1, sostiene: deja < 1 ? [fx - 6, lerp(152, 146, deja)] : undefined, sonrisa: deja >= 1, habla: uf >= 1 && deja === 0 && Math.sin(t * 9) > 0 });
  T.hoyDelante(R, t, o);
  if (deja < 1) T.PIEZAS_NX.articulo(R, Math.round(lerp(f.mano[0] - 2, 214, deja)), Math.round(lerp(f.mano[1] + 8, 150, deja)));
  else papelMesa(210, 148);
};
const p2 = (t) => {
  const s1 = tramo(t, a(4.85), a(5.8)), s2 = tramo(t, a(6.05), a(7.0)), o = { encuadre: 'firma', firmas: s1 + s2 };
  const g = T.mesas(R, t, o);
  // «with a title that left no doubt»: el título, enmarcado, y tres rayitas que lo señalan
  const br = tramo(t, a(7.05), a(7.3));
  if (br > 0) { const c = Math.sin(t * 9) > -0.3 ? hex('#f4c020') : hex('#c88a10'), x0 = 119, x1 = Math.round(lerp(119, 172, br)), y0 = 39, y1 = 50;
    R.rect(x0, y0, x1, y0, c); R.rect(x0, y1, x1, y1, c); R.rect(x0, y0, x0, y1, c); if (br >= 1) { R.rect(x1, y0, x1, y1, c); for (const [dx, dy] of [[5, -4], [7, 0], [5, 4]]) R.linea(x1 + 3, 44 + dy, x1 + 3 + dx, 44 + dy + Math.sign(dy) * 2, c); } }
  const firma = (k, s, entra, sale, manga, pluma) => {
    const e = tramo(t, entra, entra + 0.3) - tramo(t, sale, sale + 0.35); if (e <= 0) return;
    const p = g.puntas[k], px = p[0] + Math.round((1 - e) * 22), py = p[1] + Math.round((1 - e) * 36);
    T.h_estilografica(R, px, py, 19, -22, pluma);
    T.brazo(R, px + 42, py + 54, px + 15, py - 8, manga, -1, { codo: [px + 34, py + 18] });
  };
  firma(0, s1, P2 - 0.2, a(5.85), '#22304e', '#1e3a6a');
  firma(1, s2, a(5.8), a(7.05), '#8ab4dc', '#6a2a2a');
  T.mesasDelante(R, t, o);
};
// la cara de arriba de la capa dura del corte (la misma curva que el decorado)
const yDura = (x) => 78 + 56 * Math.cos(Math.max(-2, Math.min(2, (x - 172) / 84)) * Math.PI / 2);
const p3 = (t) => {
  const o = { encuadre: 'corte', fase: tramo(t, a(12.35), P4 - 0.1) }; T.ladera(R, t, o);
  // «folded layers of rock»: una línea clara recorre el pliegue de la capa dura
  const ut = tramo(t, a(11.2), a(12.3));
  if (ut > 0) { const xf = Math.round(lerp(92, 252, ut)); for (let x = 92; x <= xf; x++) if ((x + Math.floor(t * 12)) % 5 < 3) { const y = Math.round(yDura(x)); R.pset(x, y - 2, K); R.pset(x, y - 1, BL); R.pset(x, y, BL); }
    if (ut < 1) { const y = Math.round(yDura(xf)); R.rect(xf - 1, y - 3, xf + 1, y + 1, hex('#fff2a0')); R.rect(xf - 3, y - 1, xf + 3, y - 1, hex('#fff2a0')); } }
  // en la orilla, Fasold escucha y Collins explica: «la forma de barco la hizo la naturaleza»
  R.actor(EL.fasold, 5, 74, t, { dir: 1, sorpresa: t > a(12.5), sonrisa: t > a(10.6) && t < a(12.5) });
  const c = R.actor(EL.collins, 25, 74, t, { dir: 1, dedo: t > a(9.0), habla: t < a(11.2) && Math.sin(t * 9) > 0 });
  const ub = tramo(t, a(8.95), a(9.2)) - tramo(t, a(11.0), a(11.2));
  if (ub > 0.5) { globo(40, 33, 20, 15, c.cabeza[0] + 3, c.cabeza[1] - 2); R.icono('barco', 33, 26, hex('#8a4a2a'), hex('#d8c8a8'), 2); }
  T.laderaDelante(R, t, o);
};
const p4 = (t) => {
  const o = { epoca: 1959 }; T.ladera(R, t, o);
  // el barro del deslizamiento baja del monte (arriba a la derecha) y rodea la forma por los dos lados, de popa a proa
  const u = tramo(t, P4 + 0.5, a(16.2)), M0 = hex('#3a2212'), M1 = hex('#7a4a26'), M2 = hex('#d8a868'), M3 = hex('#a8703a'), N = 220;
  for (const lado of [-1, 1]) {
    const pts = []; for (let i = 0; i < 24; i++) pts.push([Math.round(lerp(308, 281, i / 24)), Math.round(lerp(72, 95, i / 24) + Math.sin(i * 0.5) * 1.5)]);
    for (let i = 0; i <= N; i++) { const s = 1 - 0.99 * i / N; pts.push(T.a_puntoForma(s, lado * (1.6 + 0.1 * Math.sin(i * 0.21)))); }
    const n = Math.floor(u * (pts.length - 1));
    for (const paso of [0, 1]) for (let i = 0; i <= n; i++) { const [x, y] = pts[i]; if (paso === 0) { R.rect(x - 1, y - 3, x + 1, y + 3, M0); R.rect(x - 3, y - 1, x + 3, y + 1, M0); R.rect(x - 2, y - 2, x + 2, y + 2, M0); } else { R.rect(x - 1, y - 2, x + 1, y + 2, M1); R.rect(x - 2, y - 1, x + 2, y + 1, M1); R.rect(x - 1, y - 2, x + 1, y - 1, M3); const q = (i - Math.floor(t * 30) + 6000) % 26; if (q < 7) R.rect(x - 1, y - 1, x + (q < 3 ? 1 : 0), y, M2); } }
    if (u > 0 && u < 1 && n > 1) { const [x, y] = pts[n], [xa, ya] = pts[Math.max(0, n - 6)], dx = x - xa, dy = y - ya, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
      R.poligono([[x + ux * 10, y + uy * 10], [x - uy * 7 - ux, y + ux * 7 - uy], [x + uy * 7 - ux, y - ux * 7 - uy]], M0); R.poligono([[x + ux * 7, y + uy * 7], [x - uy * 4, y + ux * 4], [x + uy * 4, y - ux * 4]], M2); }
  }
  // «…y dibuja el barco»: el contorno de la forma, a puntos claros que corren
  const ub = tramo(t, a(15.9), a(16.6));
  if (ub > 0) for (const lado of [-1, 1]) for (let i = 0; i <= 120 * ub; i++) { const [x, y] = T.a_puntoForma(1 - i / 120, lado * 1.06); if ((i + Math.floor(t * 10)) % 4 < 2) { R.pset(x, y, BL); R.pset(x, y - 1, BL); } }
  T.laderaDelante(R, t, o);
};
const p5 = (t) => {
  const f1 = tramo(t, a(17.6), a(18.05)), f2 = tramo(t, a(19.6), a(20.1)), o = { encuadre: 'muestras', fichas: 0.5 * f1 + 0.5 * f2 };
  const g = T.mesas(R, t, o);
  // el aro que marca cada piedra cuando la voz la nombra («the metal», «the anchors»)
  const aro = (cx, cy, e) => { if (e <= 0) return; const r = 21 + Math.round((1 - e) * 8); for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + t * 1.6; if (k % 4 < 2) { const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.86); R.rect(x, y, x + 1, y + 1, hex('#e83a30')); } } };
  aro(g.remache[0], g.remache[1], tramo(t, a(17.05), a(17.3)) - tramo(t, a(18.4), a(18.6)));
  aro(g.ancla[0], g.ancla[1], tramo(t, a(18.6), a(18.85)) - tramo(t, E.duracion - 0.9, E.duracion - 0.6));
  T.mesasDelante(R, t, o);
  // la mano de Collins señala la ficha de cada una cuando aparece su dibujo
  const en1 = tramo(t, P5 + 0.1, a(17.5)), v = tramo(t, a(18.7), a(19.4)), sale = tramo(t, E.duracion - 1.1, E.duracion - 0.5);
  const toque = (t > a(17.6) && t < a(17.8)) || (t > a(19.6) && t < a(19.8)) ? -2 : 0;
  const wx = Math.round(lerp(146, 242, v * v * (3 - 2 * v))), wy = 154 + Math.round((1 - en1) * 30 + sale * 30) + toque - Math.round(Math.sin(v * Math.PI) * 5);
  T.brazo(R, wx + 22, wy + 44, wx, wy, '#8ab4dc', -1, { codo: [wx + 20, wy + 18] });
};
const efectos = [[a(3.9), 'papel'], [a(4.9), 'firma'], [a(6.1), 'firma'], [a(7.2), 'brillo'], [a(11.3), 'lapiz'], [a(12.5), 'lluvia'], [P4 + 0.6, 'avalancha'], [a(17.6), 'golpecito'], [a(19.6), 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1996 });
''')

E['nx-geologos'] = ('Los geólogos', '''// NX-GEOLOGOS (frase 22), 1996 → hoy. Tres planos:
// 1. sobre una roca de la ladera, un martillo de geólogo y un libro cerrado: una mano se posa en el martillo («another
//    curious fact», «some geologists») y otra en el libro («who take the flood literally»);
// 2. (corta en «have said the same») dentro de la forma, tres geólogos con su martillo dicen lo mismo, uno tras otro
//    (tres globos con el barco) y en «is not a ship» el aspa cae sobre los tres y niegan con la cabeza;
// 3. (corta en «Since then») la ladera de lejos, al caer la tarde: los geólogos se van, la barra del año corre de 1996
//    a 2025, anochece… y en «But the story did not end there» unos faros bajan por el camino.''', COMUN + r'''
const G0 = 0.5, G1 = 13.869, a = (s) => en('geologos', (s - G0) / (G1 - G0));
const P2 = a(4.95), P3 = a(8.6);
const p1 = (t) => {
  const o = { encuadre: 'martillo' }; T.insertos(R, t, o);
  const MANGA = '#e4d6b4';
  // la mano del martillo: entra, se posa y da dos golpecitos en «some geologists»
  const e1 = tramo(t, 0.55, 1.1), g1 = (t > a(2.9) && t < a(3.05)) || (t > a(3.3) && t < a(3.45)) ? -2 : 0, r1 = Math.round(Math.sin(t * 1.7) * 0.6);
  T.brazo(R, -12 - (1 - e1) * 50, 138, 44 - Math.round((1 - e1) * 52), 113 + g1 + r1, MANGA, 1, { codo: [18 - (1 - e1) * 50, 130] });
  // la mano del libro: entra en «who take the flood literally» y se queda sobre la tapa
  const e2 = tramo(t, a(3.75), a(4.3)), g2 = t > a(4.5) && t < a(4.65) ? -2 : 0;
  if (e2 > 0) T.brazo(R, 330 + (1 - e2) * 50, 144, 283 + Math.round((1 - e2) * 52), 121 + g2, MANGA, -1, { codo: [308 + (1 - e2) * 50, 136] });
  T.insertosDelante(R, t, o);
};
const p2 = (t) => {
  const o = { camara: 'cerca', epoca: 1977 }; T.ladera(R, t, o);
  const no = t > a(7.4) && t < a(8.5) ? Math.round(Math.sin(t * 16)) : 0, quien = [[EL.geologo2NX, 96, 1], [EL.geologa3NX, 150, 1], [EL.collins, 204, -1]];
  quien.forEach(([def, x, dir], k) => {
    const dice = a(5.45 + k * 0.32), sale = tramo(t, dice, dice + 0.18), golpe = k === 0 && t < a(5.4) ? Math.abs(Math.sin((t - P2) * 9)) * 5 : 0;
    const q = R.actor(def, x + no * (k % 2 ? -1 : 1), 160, t, { dir, sostiene: [x + 7 + dir * 10, 153 - golpe], habla: sale > 0 && t < dice + 0.8 && Math.sin(t * 10 + k) > 0, enfado: false });
    T.PIEZAS_NX.martillo(R, q.mano[0] + dir * 5, q.mano[1] + 7, { dir });
    if (sale > 0) { const cx = x + 7, cy = 116 - Math.round((1 - sale) * 4); globo(cx, cy, 22, 18, q.cabeza[0], q.cabeza[1] - 3); R.icono('barco', cx - 7, cy - 8, hex('#8a4a2a'), hex('#d8c8a8'), 2);
      const ux = tramo(t, a(7.42 + k * 0.1), a(7.7 + k * 0.1)); if (ux > 0) aspa(cx, cy, 8, ux); }
  });
  T.laderaDelante(R, t, o);
};
// el camino del pueblo a la terraza, por donde bajan los faros
const CAMINO = [[291, 82], [296, 96], [300, 112], [303, 128], [306, 146]];
const enCamino = (u) => { const f = Math.max(0, Math.min(0.999, u)) * (CAMINO.length - 1), i = Math.floor(f), [x0, y0] = CAMINO[i], [x1, y1] = CAMINO[i + 1]; return [lerp(x0, x1, f - i), lerp(y0, y1, f - i)]; };
const halo = (cx, cy, r, fuerza) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const c = R.pget(cx + i, cy + j), k = (1 - d) * (1 - d) * fuerza, rr = c & 255, gg = (c >> 8) & 255, bb = (c >> 16) & 255;
  R.pset(cx + i, cy + j, (0xff000000 | (Math.round(bb + (150 - bb) * k) << 16) | (Math.round(gg + (232 - gg) * k) << 8) | Math.round(rr + (255 - rr) * k)) >>> 0); } };
const p3 = (t) => {
  const o = { epoca: 1977, centro: true, hora: 'tarde' }; T.ladera(R, t, o);
  // los tres geólogos se marchan por la terraza con su martillo
  const uv = tramo(t, P3 + 0.1, a(12.0));
  [[EL.collins, 176], [EL.geologa3NX, 150], [EL.geologo2NX, 122]].forEach(([def, x0], k) => { const x = Math.round(x0 - uv * (190 + k * 8)); if (x < -18) return;
    const q = R.actor(def, x, 162, t, { dir: -1, anda: uv > 0 && uv < 1, sostiene: [x - 3, 154] }); T.PIEZAS_NX.martillo(R, q.mano[0] - 5, q.mano[1] + 7, { dir: -1 }); });
  T.laderaDelante(R, t, o);
  // anochece
  const noche = tramo(t, a(10.4), a(12.6)); if (noche > 0) T.tinte(R, 0, 179, [16, 20, 58], noche * 0.46);
  // se encienden las ventanas del pueblo y del centro de visitantes, y salen las primeras estrellas
  if (noche > 0.45) { for (const [k, x, y] of [[0, 252, 80], [1, 262, 77], [2, 273, 82], [3, 284, 78], [4, 297, 83], [5, 306, 79], [6, 44, 50], [7, 52, 50], [8, 60, 50]]) if (noche > 0.45 + k * 0.05) { R.rect(x, y, x + 1, y + 1, Math.sin(t * 3 + k * 2) > -0.9 ? hex('#ffd870') : hex('#e8a840')); }
    for (let k = 0; k < 16; k++) { const z = (k * 0.618) % 1, x = Math.round(4 + z * 268), y = 22 + (k * 7) % 22; if ((x > 150 && x < 262) || Math.sin(t * 2 + k * 1.7) < -0.5 || noche < 0.5 + (k % 5) * 0.1) continue; R.pset(x, y, hex('#e8ecff')); } }
  // «But the story did not end there»: dos vehículos bajan por el camino con los faros encendidos
  for (const k of [0, 1]) { const u = tramo(t, a(12.2) + k * 0.8, E.duracion + 0.2 + k * 0.6); if (u <= 0) continue;
    const [x, y] = enCamino(u * 0.96), s = 0.7 + u * 1.1, xi = Math.round(x), yi = Math.round(y), w = Math.round(2 + s * 2);
    R.rect(xi - w, yi - w - 2, xi + w, yi, hex('#141826')); R.rect(xi - w + 1, yi - w - 1, xi + w - 1, yi - w, hex('#2a3250'));
    const p = Math.sin(t * 22 + k) > -0.8 ? 1 : 0.7; halo(xi - w, yi + 1, Math.round(8 + s * 6), 0.95 * p); halo(xi + w, yi + 1, Math.round(8 + s * 6), 0.95 * p); halo(xi, yi + 12 + Math.round(s * 5), Math.round(10 + s * 6), 0.4);
    for (const dx of [-w, w]) { R.rect(xi + dx, yi, xi + dx, yi + 1, hex('#fff8c8')); for (let j = 2; j < 5 + s * 5; j++) if ((j + Math.floor(t * 14)) % 2) R.pset(xi + dx + Math.round((dx > 0 ? 1 : -1) * j * 0.3), yi + j, hex('#f4e08a')); }
  }
};
const efectos = [[a(2.9), 'golpecito'], [a(4.5), 'toc'], [P2 + 0.2, 'golpecito'], [a(5.5), 'pop'], [a(7.45), 'golpecito'], [P3 + 0.6, 'viento'], [a(12.4), 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1996 : Math.round(lerp(1996, 2025, tramo(t, P3 + 0.3, a(12.6))))) });
''')

E['nx-radar'] = ('El radar de suelo', '''// NX-RADAR (frases 23 y 24), 2026, cartela «2026». Siete planos:
// 1. la ladera con la cuadrícula: el fundador llega y señala la forma; el técnico trae el radar de suelo sobre ruedas;
//    por la izquierda llega el arqueólogo y se saludan;  2. (corta en «archaeologists») GAG 7, dentro de la forma: el
//    técnico empuja el radar, que pita; los otros dos llegan corriendo, el técnico escarba… y saca una hebilla vieja;
// 3. (corta en «The first is») la ladera en corte: el radar baja al cuenco, las ondas bajan («sends waves downward»),
//    rebotan en la capa dura y la pantalla dibuja lo que vuelve («draws what bounces back»); en la orilla, el
//    arqueólogo clava la pala, que no hace falta («without digging»: aspa);
// 4. (corta en «According to them») SEGÚN ELLOS, en plano azul: el fundador lo cuenta y bajo la forma se trazan
//    rectas y ángulos, como pasillos;  5. (corta en «They have also tested») la mesa de campaña desde arriba: la
//    bandeja se llena de bolsitas de suelo y una mano encaja la última (la 318);  6. (corta en «holds more») SEGÚN ELLOS, en
//    plano azul: las dos barras (fuera, dentro) crecen; el fundador dice «como si ahí se hubiera podrido madera» (un
//    tablón que se deshace en su globo) y el arqueólogo escucha;  7. (corta en «In 2026») el laboratorio: el técnico
//    trae otra caja de bolsitas a la pila; la geóloga mira el monitor, que sigue con su «?».''', COMUN + r'''
const R0 = 1.5, R1 = 18.503, S0 = 19.003, S1 = 38.672;
const a = (s) => (s < S0 ? en('radar', (s - R0) / (R1 - R0)) : en('segun', (s - S0) / (S1 - S0)));   // el segundo s de la voz inglesa
const P2 = a(6.2), P3 = a(11.9), P4 = a(18.9), P5 = a(25.3), P6 = a(29.4), P7 = a(34.5);
const PZ = T.PIEZAS_NX;
const p1 = (t) => {
  const o = { epoca: 2026 }; T.ladera(R, t, o);
  // el técnico, con el radar sobre ruedas (va por delante de él, hacia la izquierda)
  const ut = tramo(t, 1.0, 4.6), tx = Math.round(lerp(330, 206, ut)), cx = tx - 14;
  PZ.radar(R, cx, 162 - (ut < 1 ? Math.floor(t * 9) % 2 : 0), { dir: -1, t });
  R.actor(EL.tecnicoNX, tx, 162, t, { dir: -1, anda: ut > 0 && ut < 1, sostiene: [tx - 2, 141] });
  // el fundador llega primero, se para y señala la forma
  const uf = tramo(t, 0.3, 3.4), fx = Math.round(lerp(300, 138, uf));
  R.actor(EL.fundadorNX, fx, 162, t, { dir: -1, anda: uf > 0 && uf < 1, dedo: uf >= 1 && t < a(5.0), habla: uf >= 1 && t < a(5.0) && Math.sin(t * 9) > 0, sonrisa: t >= a(5.0) });
  // «now working with archaeologists»: el arqueólogo llega por la izquierda y saluda
  const ua = tramo(t, a(3.5), a(5.7)), ax = Math.round(lerp(-18, 100, ua));
  R.actor(EL.arqueologoNX, ax, 162, t, { dir: 1, anda: ua > 0 && ua < 1, dedo: ua > 0.55, sonrisa: true });
  T.laderaDelante(R, t, o);
};
const p2 = (t) => {
  const o = { camara: 'cerca', epoca: 2026 }; T.ladera(R, t, o);
  const pita0 = P2 + 1.45, llegan = P2 + 2.6, saca = P2 + 3.55;
  const pita = t > pita0 && t < saca, ue = tramo(t, P2, pita0), tx = Math.round(lerp(40, 104, ue)), cx = tx + 28, fin = t > saca + 0.3;
  // los otros dos llegan corriendo por la derecha y miran
  const uc = tramo(t, pita0 + 0.25, llegan), ax = Math.round(lerp(352, 204, uc)), fx = Math.round(lerp(330, 166, uc));
  const brinco = fin && t < saca + 1.5 ? Math.round(Math.abs(Math.sin((t - saca) * 9)) * 3) : 0;
  R.actor(EL.arqueologoNX, ax, 160, t, { dir: -1, anda: uc > 0 && uc < 1, sorpresa: uc > 0 && !fin, sonrisa: fin, salto: brinco });
  R.actor(EL.fundadorNX, fx, 160, t, { dir: -1, anda: uc > 0 && uc < 1, sorpresa: uc > 0 && !fin, sonrisa: fin, dedo: uc >= 1 && t < saca });
  // el radar, que pita, y el técnico, que lo suelta, escarba detrás de él y saca… una hebilla
  PZ.radar(R, cx, 160 - (ue > 0 && ue < 1 ? Math.floor(t * 9) % 2 : 0), { pita, t });
  const cava = t > llegan - 0.5 && t < saca, arriba = tramo(t, saca, saca + 0.3), suelta = t > llegan - 0.6;
  const q = R.actor(EL.tecnicoNX, tx, 160, t, { dir: suelta ? -1 : 1, anda: ue > 0 && ue < 1, sorpresa: pita && !cava, sonrisa: fin,
    sostiene: !suelta ? [cx - 12, 139] : [tx - 5, cava ? 152 + Math.round(Math.abs(Math.sin((t - llegan) * 14)) * 5) : lerp(154, 141, arriba)] });
  if (pita && !cava) R.bocadillo(q.cabeza[0], q.cabeza[1] - 15);
  if (cava) for (let k = 0; k < 6; k++) { const u = ((t - llegan) * 2.4 + k * 0.17 + 4) % 1, x = tx - 8 - Math.round(u * (6 + k * 2)), y = 158 - Math.round(Math.sin(u * Math.PI) * (5 + k)); R.rect(x, y, x + 1, y + 1, k % 2 ? hex('#8a6c44') : hex('#d8c090')); }
  if (t >= saca) { PZ.hebilla(R, q.mano[0] - 3, q.mano[1] + 5);
    // la hebilla, de cerca, en un globo
    const e = tramo(t, saca + 0.15, saca + 0.4); if (e > 0) { const gx = 84, cy = 108 - Math.round((1 - e) * 6); globo(gx, cy, 46, 32, q.mano[0] - 3, q.mano[1] - 8); PZ.hebilla(R, gx, cy + 11, { s: 2 });
      if (Math.sin(t * 8) > 0.2) for (const [dx, dy] of [[-19, -12], [19, -10], [18, 12]]) { R.rect(gx + dx - 1, cy + dy, gx + dx + 1, cy + dy, hex('#f4c020')); R.rect(gx + dx, cy + dy - 1, gx + dx, cy + dy + 1, hex('#f4c020')); } } }
  T.laderaDelante(R, t, o);
};
// el corte: el suelo del cuenco erosionado y la cara de arriba de la capa dura (las mismas curvas que el decorado)
const yDura = (x) => 78 + 56 * Math.cos(Math.max(-2, Math.min(2, (x - 172) / 84)) * Math.PI / 2);
const ySuelo = (x) => Math.round(Math.min(96, yDura(x)));
const p3 = (t) => {
  const o = { encuadre: 'corte', fase: 3 }; T.ladera(R, t, o);
  const baja = a(14.47), rebota = a(15.5), dibuja = a(16.0), sin = a(17.5);
  const um = tramo(t, P3 + 0.2, a(14.2)), tx = Math.round(lerp(250, 226, um)), cx = tx - 14, sy = ySuelo(cx);
  // las ondas que bajan desde la antena y las que vuelven de la capa dura (recortadas al subsuelo)
  if (t > baja) { const yc = Math.round(yDura(cx));
    for (let k = 0; k < 4; k++) { const r = ((t - baja) * 22 + k * 13) % 52; if ((t - baja) * 22 < r) continue; const c = r < yc - sy ? hex('#eaffff') : hex('#7ad0e8'), n = Math.ceil(r * 3.2);
      for (let i = 0; i <= n; i++) { const an = 0.25 + (i / n) * 2.64, x = Math.round(cx + Math.cos(an) * r), y = Math.round(sy + 1 + Math.sin(an) * r); if (y > ySuelo(x) + 1 && y < 176 && (i + k) % 6 < 5) { R.pset(x, y + 1, hex('#12364e')); R.pset(x, y, c); R.pset(x, y - 1, c); } } }
    if (t > rebota) for (let k = 0; k < 3; k++) { const r = ((t - rebota) * 20 + k * 9) % 27, n = Math.ceil(r * 3) + 1; if ((t - rebota) * 20 < r) continue;
      for (let i = 0; i <= n; i++) { const an = 3.4 + (i / n) * 2.6, x = Math.round(cx + Math.cos(an) * r), y = Math.round(yc + Math.sin(an) * r); if (y > ySuelo(x) + 1 && y < yDura(x) - 1) { R.pset(x, y + 1, hex('#7a3a10')); R.pset(x, y, hex('#ffb030')); R.pset(x, y - 1, hex('#fff0a0')); } } }
    // el punto donde rebotan
    if (t > rebota - 0.4 && Math.sin(t * 12) > 0) { R.rect(cx - 2, yc - 1, cx + 2, yc - 1, hex('#fff0a0')); R.rect(cx, yc - 3, cx, yc + 1, hex('#fff0a0')); } }
  // el radar baja al cuenco con su técnico
  PZ.radar(R, cx, sy + 1 - (um > 0 && um < 1 ? Math.floor(t * 8) % 2 : 0), { dir: -1, t });
  R.actor(EL.tecnicoNX, tx, ySuelo(tx + 7) + 1, t, { dir: -1, anda: um > 0 && um < 1, sostiene: [tx - 2, sy - 20], sonrisa: t > dibuja });
  // «draws what bounces back»: la pantalla, de cerca, traza las capas columna a columna
  const ug = tramo(t, dibuja - 0.35, dibuja - 0.1);
  if (ug > 0) { const gx = 236, gy = 42 - Math.round((1 - ug) * 5); globo(gx, gy, 62, 34, cx + 2, sy - 29);
    R.rect(gx - 28, gy - 14, gx + 28, gy + 14, K); R.rect(gx - 27, gy - 13, gx + 27, gy + 13, hex('#0c2418'));
    const ud = tramo(t, dibuja, a(17.4)), xn = Math.round(ud * 52);
    for (let i = 0; i <= 52; i += 13) for (let j = -12; j <= 12; j += 2) R.pset(gx - 26 + i, gy + j, hex('#1c4a30'));
    for (let i = 0; i < xn; i++) { const x = gx - 26 + i, v = (i - 26) / 26, cu = Math.cos(v * 1.45);
      R.pset(x, gy - 10 + Math.round(Math.sin(i * 0.9) * 0.6), hex('#6ae890'));
      const y1 = gy - 9 + Math.round(cu * 13); R.pset(x, y1, hex('#ffb030')); R.pset(x, y1 + 1, hex('#c86a20'));
      const y2 = gy - 4 + Math.round(cu * 13); if (y2 < gy + 13) R.pset(x, y2, hex('#3aa860')); const y3 = gy + 1 + Math.round(cu * 13); if (y3 < gy + 13 && i % 2) R.pset(x, y3, hex('#2a7a48')); }
    if (ud > 0 && ud < 1) R.rect(gx - 26 + xn, gy - 13, gx - 26 + xn, gy + 13, hex('#c8ffd8')); }
  // en la orilla, el arqueólogo con su pala: la clava y no la usa
  const clava = tramo(t, sin - 0.5, sin - 0.2), px = 31, py = 62 + Math.round(clava * 9);
  const q = R.actor(EL.arqueologoNX, 10, 74, t, { dir: 1, sostiene: clava < 1 ? [27, 60 + Math.round(clava * 6)] : undefined, sonrisa: clava >= 1, dedo: clava >= 1 && t > sin + 0.3 });
  R.rect(px - 1, py - 16, px + 1, py, K); R.rect(px, py - 15, px, py - 1, hex('#b07a40')); R.rect(px - 2, py - 17, px + 2, py - 15, K); R.rect(px - 1, py - 16, px + 1, py - 16, hex('#b07a40'));
  R.rect(px - 3, py, px + 3, py + 7, K); R.rect(px - 2, py + 1, px + 2, py + 6, hex('#aab4c2')); R.rect(px - 2, py + 1, px - 1, py + 5, hex('#dfe6ee'));
  T.laderaDelante(R, t, o);
  const ux = tramo(t, sin, sin + 0.3); if (ux > 0) aspa(px + 1, py - 6, 9, ux);
};
const p4 = (t) => {
  const o = { encuadre: 'corte', plano: true, barras: 0, pasillos: 0.5 * tramo(t, a(20.6), a(22.6)) + 0.5 * tramo(t, a(23.2), a(24.9)) }; T.ladera(R, t, o);
  // SEGÚN ELLOS: el fundador lo cuenta desde la orilla y el técnico asiente
  R.actor(EL.tecnicoNX, 5, 74, t, { dir: 1, sonrisa: t > a(22) });
  const f = R.actor(EL.fundadorNX, 25, 74, t, { dir: 1, dedo: t > a(20.3), habla: Math.sin(t * 9) > 0 });
  const ub = tramo(t, P4 + 0.15, P4 + 0.4) - tramo(t, a(20.4), a(20.6));
  if (ub > 0.5) { globo(42, 34, 20, 15, f.cabeza[0] + 3, f.cabeza[1] - 2); R.rect(37, 28, 46, 32, hex('#e8782a')); R.rect(37, 28, 46, 28, hex('#ffb060')); R.rect(38, 33, 39, 34, K); R.rect(44, 33, 45, 34, K); R.linea(46, 28, 49, 25, K); for (const r of [3, 6]) for (let i = 0; i <= 8; i++) { const an = 0.5 + i / 8 * 2.14; if (Math.floor(t * 6 + r) % 3) R.pset(Math.round(42 + Math.cos(an) * r * 1.3), Math.round(35 + Math.sin(an) * r * 0.8), hex('#2a6ab8')); } }
  T.laderaDelante(R, t, o);
};
// una bolsita como las de la bandeja (22 × 27): el cierre, la etiqueta con su número y la tierra al fondo
const CIF = { 3: ['###', '..#', '.##', '..#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 8: ['###', '#.#', '###', '#.#', '###'] };
const bolsita = (x, y, num) => {
  R.rect(x + 1, y, x + 20, y + 26, K); R.rect(x, y + 1, x + 21, y + 25, K); R.rect(x + 1, y + 1, x + 20, y + 25, hex('#dfeaf0')); R.rect(x + 20, y + 4, x + 20, y + 25, hex('#b4c8d4'));
  R.rect(x + 1, y + 1, x + 20, y + 3, hex('#8ab4e8')); R.rect(x + 1, y + 2, x + 20, y + 2, BL); R.rect(x + 16, y + 1, x + 19, y + 3, ROJO);
  for (let i = 1; i <= 20; i++) { const top = y + 17 + ((i * 7) % 3) - (i > 6 && i < 15 ? 1 : 0); R.rect(x + i, top, x + i, y + 25, i > 16 ? hex('#6a4e2c') : hex('#8a6c44')); R.pset(x + i, top, hex('#b89868')); if (i % 3 === 0) R.pset(x + i, top + 3, hex('#6a4e2c')); }
  R.rect(x + 3, y + 5, x + 18, y + 13, BL); R.rect(x + 3, y + 13, x + 18, y + 13, hex('#cfc4a8'));
  String(num).split('').forEach((d, k) => CIF[d].forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.pset(x + 5 + k * 4 + i, y + 6 + j, hex('#2a2a3a')); }));
};
const p5 = (t) => {
  const puesta = a(28.3), o = { encuadre: 'bolsitas', cuantas: t >= puesta ? 1 : 17 * tramo(t, P5 + 0.15, a(27.3)) / 18 };
  const g = T.insertos(R, t, o);
  T.insertosDelante(R, t, o);
  // una mano trae desde abajo la última bolsita (la 318) y la encaja en su hueco
  const e = tramo(t, a(26.5), puesta), ee = e * e * (3 - 2 * e), sale = tramo(t, puesta + 0.15, a(29.2)), [hx, hy] = g.celda(17);
  const bx = hx + 1, by = hy + 1 + Math.round((1 - ee) * 58);
  if (t < puesta) bolsita(bx, by, 318);
  const wx = bx + 31 + Math.round(sale * 6), wy = by + 24 + Math.round(sale * 46) - (t >= puesta && t < puesta + 0.15 ? 1 : 0);
  if (e > 0 && sale < 1) T.brazo(R, wx + 18, wy + 52, wx, wy, '#2a3a5e', -1, { codo: [wx + 16, wy + 22] });
};
const p6 = (t) => {
  const o = { encuadre: 'azul', barras: tramo(t, P6 + 0.25, a(31.3)) }; const g = T.vistas(R, t, o);
  const dice = a(32.76), fin = a(34.0);
  // SEGÚN ELLOS: el fundador señala las barras y lo cuenta; el arqueólogo escucha
  const f = R.actor(EL.fundadorNX, 214, 150, t, { dir: -1, dedo: t < dice - 0.3, habla: Math.sin(t * 9) > 0 });
  R.actor(EL.arqueologoNX, 258, 150, t, { dir: -1, sonrisa: t > a(31.5) && t < dice });
  // «as if wood had rotted there»: en su globo, un tablón que se deshace
  const ub = tramo(t, dice - 0.2, dice + 0.05);
  if (ub > 0.5) { const cx = 226, cy = 100; globo(cx, cy, 50, 26, f.cabeza[0], f.cabeza[1] - 3);
    const pud = tramo(t, dice + 0.5, fin + 0.4);
    for (let j = -5; j <= 4; j++) for (let i = -20; i <= 20; i++) { const z = (Math.sin((i >> 1) * 12.9898 + (j >> 1) * 78.233) * 43758.5453) % 1, zz = z < 0 ? z + 1 : z; if (zz < pud * 0.42) { if ((i + j) % 4 === 0) R.pset(cx + i, Math.min(cy + 10, cy + j + Math.round((pud - zz) * 14)), hex('#5a3a22')); if (Math.abs(j) < 4 && zz > pud * 0.3) R.pset(cx + i, cy + j - 2, hex('#3a2416')); continue; }
      R.pset(cx + i, cy + j, j === 4 || j === -5 || Math.abs(i) === 20 ? hex('#4e2c18') : (j === -1 || j === 2) && (i + j * 3) % 9 < 6 ? hex('#7a4a2a') : j < -1 ? hex('#c08a50') : hex('#a8703a')); } }
  T.vistasDelante(R, t, o);
};
// una caja de bolsitas: la bandeja azul con las etiquetas blancas asomando
const caja = (x, y) => { R.rect(x - 11, y - 9, x + 11, y, K); R.rect(x - 10, y - 6, x + 10, y - 1, hex('#2a4a8a')); R.rect(x - 10, y - 6, x + 10, y - 6, hex('#4a72b8')); R.rect(x - 10, y - 1, x + 10, y - 1, hex('#1a2e5a'));
  for (let i = -9; i <= 7; i += 4) { R.rect(x + i, y - 8, x + i + 2, y - 7, BL); R.pset(x + i + 2, y - 8, ROJO); } };
const p7 = (t) => {
  const o = { encuadre: 'geologo', camara: 'laboratorio', sobres: 4, resultado: false }; T.hoy(R, t, o);
  // la pila de cajas que ya esperan y la que llega
  caja(204, 162); caja(205, 152);
  const ut = tramo(t, P7 + 0.1, a(36.6)), tx = Math.round(lerp(40, 172, ut)), pone = tramo(t, a(36.7), a(37.2)), uv = tramo(t, a(37.9), E.duracion - 0.9);
  const x = Math.round(tx - uv * 48), va = uv > 0 && uv < 1;
  const q = R.actor(EL.tecnicoNX, x, 162, t, { dir: va ? -1 : 1, anda: (ut > 0 && ut < 1) || va, sostiene: pone < 1 ? [x + 21, lerp(150, 141, pone)] : undefined, sonrisa: pone >= 1 });
  if (pone < 1) caja(Math.round(lerp(q.mano[0] + 10, 204, pone)), Math.round(lerp(q.mano[1] + 6, 142, pone))); else caja(204, 142);
  // la geóloga, ante el monitor: mira la pila, mira el «?» y se encoge
  const mira = t > a(36.9) && t < a(37.7);
  R.actor(EL.geologa3NX, 236, 162, t, { dir: mira ? -1 : 1, dedo: t < a(36.6) && Math.sin(t * 5) > 0, sorpresa: mira, triste: t > a(37.9) });
  T.hoyDelante(R, t, o);
};
const efectos = [[1.3, 'carro'], [P2 + 0.1, 'carro'], [P2 + 1.45, 'bip'], [P2 + 1.8, 'bip'], [P2 + 2.15, 'bip'], [P2 + 2.8, 'golpecito'], [P2 + 3.6, 'boing'],
  [P3 + 0.3, 'carro'], [a(14.5), 'zumbido'], [a(16.0), 'tecleo'], [a(17.4), 'toc'], [P4 + 0.2, 'pop'], [a(20.7), 'lapiz'], [a(23.3), 'lapiz'],
  [a(28.3), 'papel'], [a(37.1), 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, cartela: '2026', año: 2026 });
''')
