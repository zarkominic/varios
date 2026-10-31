# Borrador de escenas del episodio 12 (acto 5, el tornado): hu-fujita, hu-tamano, hu-llanuras, hu-ivan.
# Formato del 11: E[id] = (título, comentario de cabecera, cuerpo). Las piezas comunes (ayudas de dibujo) van en
# trozos de JS que se pegan en cada escena que las usa, porque cada escena es una página aparte.

E = {}

# ── ayudas comunes ──────────────────────────────────────────────────────────────────────────────────────────────
COMUN = r'''
const C = T.C;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const entre = (t, a0, a1) => t >= a0 && t < a1;
const suave = (u) => u * u * (3 - 2 * u);
const parpadeo = (t, v = 6) => Math.sin(t * v) > 0;
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], umbral = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// mezcla dos colores del kit (ABGR) en la proporción a, y vela un píxel ya pintado con un color
const mezcla = (c1, c2, a) => { const f = (s) => ((c1 >>> s) & 255) + ((((c2 >>> s) & 255) - ((c1 >>> s) & 255)) * a); return (0xff000000 | (Math.round(f(16)) << 16) | (Math.round(f(8)) << 8) | Math.round(f(0))) >>> 0; };
const velo = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mezcla(R.pget(x, y), c, a)); };
// la mano que cuelga al andar: dónde lleva algo un personaje (x, suelo, dir)
const enMano = (x, suelo, dir) => [dir > 0 ? x + 11 : x - 5, suelo - 9];
// cifras diminutas de 3 × 5 (solo dígitos)
const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];
const cifras = (s, x, y, c) => { for (const ch of String(s)) { const d = DIG[+ch]; if (d) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (d[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } };
// un destello en cruz que late
const destello = (x, y, r, c = C.blanco) => { R.pset(x, y, c); for (let k = 1; k <= r; k++) { R.pset(x + k, y, c); R.pset(x - k, y, c); R.pset(x, y + k, c); R.pset(x, y - k, c); } };
'''

# el tornado de símbolo (de perfil, de 5 × 10 px con su contorno), para mapas, vistas desde arriba y el gag de los patitos
TORNADITO = r'''
const tornadito = (x, y, t, k = 0, o = {}) => {
  const col = o.col ?? hex('#5a5e72'), luz = o.luz ?? hex('#a8aec0'), s = o.s ?? 1, alto = Math.round(10 * s);
  for (let j = 0; j < alto; j++) { const f = j / alto, w = Math.max(1, Math.round((5 - 4 * f) * s)), dx = Math.round(Math.sin(t * 7 + k + j * 0.6) * f * 1.4 * s), x0 = x - Math.floor(w / 2) + dx, yy = y - alto + j;
    R.rect(x0 - 1, yy, x0 + w, yy, C.k); R.rect(x0, yy, x0 + w - 1, yy, (j + Math.floor(t * 12 + k)) % 3 === 0 ? luz : col); if (w > 2) R.pset(x0, yy, luz); }
  R.rect(x - Math.round(2.5 * s) - 1, y - alto - 1, x + Math.round(2.5 * s) + 1, y - alto - 1, C.k);
  if (o.polvo !== false) for (let i = 0; i < 4; i++) { const a = t * 9 + i * 1.6 + k; R.pset(Math.round(x + Math.cos(a) * 3 * s), Math.round(y + Math.sin(a) * 0.8), o.polvoC ?? hex('#c8b896')); }
};
'''

# el huracán en el mapa: la espiral de nubes que gira en sentido antihorario, con su ojo, su sombra sobre el papel y el
# borde tramado (r: el radio del núcleo; o.alfa 0–1 lo hace aparecer; o.brazos, cuánto se abren las bandas)
ESPIRAL = r'''
const espiral = (cx, cy, r, t, o = {}) => {
  const al = o.alfa ?? 1, rot = t * (o.giro ?? 0.9), ext = o.brazos ?? 1.5, N0 = hex('#ffffff'), N1 = hex('#e4e8f0'), N2 = hex('#b8c0d2'), N3 = hex('#8a94ac'), N4 = hex('#5e6884'), SOM = hex('#3e4a60');
  // q: la densidad de nube (el núcleo denso, la pared del ojo y dos bandas en espiral con huecos entre ellas)
  const v = (x, y) => { const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy) / r; if (d > ext) return [0, d, 0, 0, 0];
    const th = Math.atan2(dy, dx), br = Math.cos(2 * (th + rot) - 4.6 * Math.log(d + 0.05)), banda = br > 0.25 ? 1 : br > -0.05 ? (br + 0.05) / 0.3 : 0;
    const nucleo = d < 0.4 ? 1 : Math.max(0, 1 - (d - 0.4) * 4.5), lejos = Math.max(0, 1 - Math.max(0, d - 0.45) / (ext - 0.45));
    let q = Math.max(nucleo, banda * Math.min(1, lejos * 1.6)); if (d < 0.12) q = d < 0.07 ? 0 : q * 0.5; return [q * al, d, dx, dy, br]; };
  const x0 = Math.floor(cx - r * ext - 4), x1 = Math.ceil(cx + r * ext + 4), y0 = Math.floor(cy - r * ext - 4), y1 = Math.ceil(cy + r * ext + 4);
  // la sombra sobre el papel, corrida abajo a la derecha
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const [q] = v(x - 3, y - 3); if (q > 0.5 && umbral(x, y) < 0.75) velo(x, y, SOM, 0.3); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const [q, d, dx, dy, br] = v(x, y); if (q <= 0.2) continue; const u = umbral(x, y);
    if (q < 0.6 && u > (q - 0.2) / 0.4) continue;   // el borde deshilachado
    // la luz viene de arriba a la izquierda; las cimas de la coliflor brillan y el filo de cada banda queda en sombra
    const col = Math.sin(x * 0.9 + Math.sin(y * 0.7) * 2) * Math.sin(y * 0.8 + t * 0.5) * 0.12, luz = 0.55 + (-dx - dy) / (r * 2.6) + col + (d < 0.42 ? 0.25 : br * 0.18) - (q < 0.8 ? 0.2 : 0);
    R.pset(x, y, luz > 0.95 ? N0 : luz > 0.72 ? N1 : luz > 0.5 ? N2 : luz > 0.3 ? N3 : N4);
  }
  // el ojo: el papel de abajo se ve por el hueco, con la pared en sombra del lado de abajo a la derecha
  if (al > 0.5) { const re = Math.max(1.5, r * 0.1); for (let k = 0; k < 24; k++) { const g = k / 24 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(g) * (re + 1)), Math.round(cy + Math.sin(g) * (re + 1)), Math.cos(g - 0.8) > 0 ? N4 : N2); } }
};
'''

# ── hu-fujita ───────────────────────────────────────────────────────────────────────────────────────────────────
E['hu-fujita'] = ('Fujita', r'''// HU-FUJITA (frase 21), 1971. Tres planos:
// 1. el laboratorio de Fujita en Chicago («That same year, in Chicago»; por el ventanal, el Hancock y la Sears a medio
//    hacer con su grúa): Fujita repasa las fotos aéreas en la mesa de luz; la becaria entra por la derecha con un sobre
//    de fotos nuevas y se lo da («A Japanese-born»); él saca una y la pone en la mesa de luz («scientist»); en «Ted
//    Fujita» descubre las marcas en espiral: «!», se vuelve sonriendo con el dedo arriba y ella toma nota; corta en «who»;
// 2. desde su avioneta («who studies storms by flying over the damage»): la Cessna cruza el camino de daños del tornado
//    sobre las llanuras; su sombra pasa por la granja alcanzada (los vecinos recogen) y la cámara dispara dos veces
//    («photographing», «above»); corta en «creates»;
// 3. la mesa de luz de cerca: la mano de Fujita acaba de trazar con el lápiz graso los bucles de la espiral y apunta los
//    números («creates a scale»); otra vez la mano trae la tarjeta de su escala (seis barras del 0 al 5, cada una se
//    enciende al caer: «hurricane's smaller»); y en «fiercer cousin» desliza sobre la mesa la foto de un embudo; en «the
//    tornado» la toca con el dedo y la foto destella.''', COMUN + r'''
const a = (f) => en('fujita', f);
const P2 = a(0.364), P3 = a(0.6913);
// ── 1 · el laboratorio ──────────────────────────────────────────────────────────────────────────────────────────
const entrega = a(0.156), ponFoto = [a(0.198), a(0.226)], ted = a(0.2756), anota = a(0.318);
const sobre = (x, y) => { R.rect(x, y, x + 7, y + 5, C.k); R.rect(x + 1, y + 1, x + 6, y + 4, hex('#d8b878')); R.linea(x + 1, y + 1, x + 3, y + 3, hex('#a8844a')); R.linea(x + 6, y + 1, x + 4, y + 3, hex('#a8844a')); R.pset(x + 1, y + 4, hex('#f0d8a0')); };
// la foto aérea que saca del sobre: el camino de daños en gris, con las marcas en espiral en rojo
const fotito = (x, y, marcas) => { R.rect(x, y, x + 11, y + 8, C.k); R.rect(x + 1, y + 1, x + 10, y + 7, hex('#e8e4da')); R.rect(x + 2, y + 2, x + 9, y + 6, hex('#8a8a86')); R.linea(x + 2, y + 6, x + 9, y + 2, hex('#4a4a4e')); R.linea(x + 2, y + 5, x + 8, y + 2, hex('#5a5a5c'));
  for (const [px, py] of [[3, 3], [6, 5], [8, 3]]) R.pset(x + px, y + py, hex('#c4c0b8')); if (marcas) for (const [px, py] of [[3, 5], [4, 4], [5, 4], [6, 3], [7, 3]]) R.pset(x + px, y + py, hex('#d8282a')); };
// la tablilla de la becaria con su hoja
const tablilla = (x, y, t, escribe) => { R.rect(x, y, x + 6, y + 8, C.k); R.rect(x + 1, y + 1, x + 5, y + 7, hex('#a8743c')); R.rect(x + 1, y + 2, x + 5, y + 7, hex('#f6f2e2')); R.rect(x + 2, y, x + 4, y + 1, hex('#8a8e96'));
  for (let k = 0; k < 3; k++) R.rect(x + 2, y + 3 + k * 2, x + 2 + (escribe && k === 2 ? Math.floor(t * 6) % 3 : 2), y + 3 + k * 2, hex('#3a4a7a')); };
// la caja de fotos de cartón con su etiqueta
const cajaFotos = (x, y) => { R.rect(x, y, x + 9, y + 6, C.k); R.rect(x + 1, y + 1, x + 8, y + 5, hex('#c8a46a')); R.rect(x + 1, y + 1, x + 8, y + 1, hex('#e0c088')); R.rect(x + 3, y + 3, x + 6, y + 4, hex('#f6f2e2')); };
const p1 = (t) => {
  T.labFujita(R, t);
  // al fondo, el ayudante trae otra caja de fotos de la estantería a la mesa de luz, la deja y vuelve por más
  { const ida = lin(t, 0.9, 2.7), vuelta = lin(t, 3.4, 5.0), x = Math.round(lerp(34, 90, suave(ida)) - lerp(0, 50, suave(vuelta))), d = t > 3.2 && t < ted ? -1 : 1, anda = (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1);
    R.actor(EL.tecnico, x, 164, t, { dir: d, anda, dedo: entre(t, 2.75, 3.2), sonrisa: t > ted + 0.2, habla: entre(t, ted + 0.4, ted + 1.0) && parpadeo(t, 7) });
    if (t < 2.85) { const [cx, cy] = enMano(x, 164, d); cajaFotos(cx - 4, cy - 5); } else cajaFotos(76, 114);
    if (t > 5.0) { const [cx, cy] = enMano(x, 164, d); cajaFotos(cx - 4, cy - 5); } }
  // Fujita junto a la mesa de luz: repasa las fotos, se vuelve a coger el sobre, pone la foto nueva y descubre las marcas
  const haciaElla = entre(t, entrega - 0.45, ponFoto[0]), deVuelta = t >= ted - 0.05;
  const fd = haciaElla || deVuelta ? 1 : -1;
  R.actor(EL.fujita, 182, 160, t, { dir: fd, dedo: entre(t, 0.4, 1.0) || entre(t, 1.7, 2.3) || entre(t, entrega - 0.15, entrega + 0.2) || entre(t, ponFoto[0], ponFoto[1]) || t > ted + 0.2,
    habla: (entre(t, 0.4, 1.3) || entre(t, ted + 0.4, ted + 1.0)) && parpadeo(t, 8), sorpresa: entre(t, ted - 0.1, ted + 0.25), sonrisa: t > ted + 0.25 || entre(t, entrega, ponFoto[0]) });
  // el sobre: en la mano de ella, pasa a la de él, y de él sale la foto que va a la mesa
  const b = lin(t, 0.6, 3.15), bx = Math.round(lerp(338, 216, suave(b)));
  const [ex, ey] = enMano(bx, 170, -1), [fx, fy] = enMano(182, 160, 1);
  if (t < entrega - 0.1) sobre(ex - 3, ey - 2);
  else if (t < entrega + 0.2) { const v = lin(t, entrega - 0.1, entrega + 0.2); sobre(Math.round(lerp(ex - 3, fx - 2, v)), Math.round(lerp(ey - 2, fy - 3, v))); }
  else if (t < ponFoto[0]) sobre(fx - 2, fy - 3);
  const v = lin(t, ponFoto[0], ponFoto[1]); if (t >= ponFoto[0]) fotito(Math.round(lerp(170, 140, suave(v))), Math.round(lerp(150, 96, suave(v)) - Math.sin(v * Math.PI) * 6), t > ted - 0.1);
  if (t > ted - 0.1 && t < ted + 0.6 && parpadeo(t, 14)) destello(146, 99, 3, hex('#ffd0c0'));
  if (entre(t, ted - 0.05, ted + 0.95)) R.bocadillo(189, 128, {});
  // la becaria: entra por la derecha (por delante de la silla), le da el sobre y luego toma nota
  R.actor(EL.tecnica, bx, 170, t, { dir: -1, anda: b > 0 && b < 1, dedo: entre(t, entrega - 0.3, entrega + 0.15), sonrisa: t > ted, habla: entre(t, entrega + 0.2, ponFoto[0]) && parpadeo(t, 7) });
  if (t > ted + 0.3) { const [tx, ty] = enMano(bx, 170, -1); tablilla(tx - 4, ty - 6, t, t > anota); }
};
// ── 2 · desde la avioneta ───────────────────────────────────────────────────────────────────────────────────────
const fotos = [a(0.5603), a(0.6333)];
const p2 = (t) => {
  const u = lerp(0.2, 0.62, lin(t, P2, fotos[0])) + Math.max(0, t - fotos[0]) * 0.125;
  let foto = 0; for (const f of fotos) if (t >= f && t < f + 0.3) foto = 1 - (t - f) / 0.3;
  T.danosDesdeArriba(R, t, { u, avioneta: true, foto });
};
// ── 3 · la mesa de luz de cerca ─────────────────────────────────────────────────────────────────────────────────
// el trazo del lápiz graso (el mismo que pinta el decorado), para poner la punta del lápiz donde va
const TRAZO = (() => { const pts = []; let px = -1, py = -1; for (let tau = 0; tau < 120; tau += 0.05) { const x = Math.round(58 + tau * 0.75 - 7 * Math.sin(tau * 0.5)), y = Math.round(40 + tau * 0.48 + 7 * Math.cos(tau * 0.5) * 0.8 - 5); if (x > 150 || y > 118) break; if (x !== px || y !== py) { pts.push([x, y]); px = x; py = y; } } return pts; })();
const finTrazo = a(0.735), tarjetaIn = [a(0.745), a(0.8034)], fotoIn = [a(0.818), a(0.872)], toca = a(0.9441);
const COLS = ['#8ab0d8', '#7ac08a', '#e8d050', '#f0a040', '#e0603a', '#b02a3a'].map(hex);
// la tarjeta de la escala: seis barras del 0 al 5, cada una más alta y con su casita cada vez más rota encima
const tarjeta = (x, y, t, t0) => {
  R.rect(x + 2, y + 2, x + 62, y + 32, hex('#a8b8c8')); R.rect(x, y, x + 60, y + 30, C.k); R.rect(x + 1, y + 1, x + 59, y + 29, hex('#f6f2e2')); R.rect(x + 1, y + 1, x + 59, y + 2, hex('#e4d8bc')); R.rect(x + 1, y + 29, x + 59, y + 29, hex('#d8ceb4'));
  for (let k = 0; k < 6; k++) { const e = t0 == null ? 1 : lin(t, t0 + k * 0.07, t0 + k * 0.07 + 0.12), alto = Math.round((3 + k * 2.6) * e), bx = x + 4 + k * 9, by = y + 22;
    if (alto > 0) { R.rect(bx, by - alto, bx + 6, by, C.k); R.rect(bx + 1, by - alto + 1, bx + 5, by - 1, COLS[k]); R.rect(bx + 1, by - alto + 1, bx + 1, by - 1, mezcla(COLS[k], C.blanco, 0.4)); }
    if (e >= 1) { const hy = by - alto - 5; R.rect(bx + 1, hy + 2, bx + 5, hy + 4, hex('#8a6a4a')); if (k < 3) R.poligono([[bx, hy + 2], [bx + 3, hy - 1 + Math.min(k, 1)], [bx + 7, hy + 2]], hex('#c84a3a')); if (k >= 3) R.pset(bx + 2 + (k % 2), hy + 1, hex('#c84a3a')); if (k === 5) R.rect(bx + 1, hy + 3, bx + 5, hy + 4, hex('#6a5a4a')); }
    cifras(k, bx + 2, y + 24, hex('#2a2a32')); }
};
// la foto de un tornado: copia en blanco y negro con su borde blanco, la base de la nube, el embudo, el polvo, la granja y la cerca
const GR = ['#1e1e22', '#3a3a3e', '#58585a', '#7a7a78', '#9e9c96', '#c4c0b8', '#e6e2d8'].map(hex);
const fotoTornado = (x, y) => {
  R.rect(x + 2, y + 2, x + 46, y + 52, hex('#a8b8c8')); R.rect(x, y, x + 44, y + 50, hex('#d8d4c8')); R.rect(x + 1, y + 1, x + 43, y + 49, hex('#f8f6ee'));
  for (let j = 0; j < 38; j++) for (let i = 0; i < 38; i++) { const X = x + 3 + i, Y = y + 3 + j, base = 9 + Math.round(Math.sin(i * 0.4) * 1.5 + Math.sin(i * 1.3) * 0.7);
    let g = j < base ? 1 + (j > base - 3 ? 1 : 0) : j < 30 ? 4 + (j - base) / 18 * 1.6 : 2; const emb = j >= base - 1 && j < 31 ? Math.abs(i - (19 + Math.sin(j * 0.25) * 2.2 - (j - base) * 0.12)) < Math.max(0.6, 4.5 - (j - base) * 0.2) : false;
    if (emb) g = (i + j) % 5 === 0 ? 2 : 1; if (j >= 27 && j < 31 && Math.abs(i - 18) < 6 && umbral(X, Y) < 0.6) g = 3;
    if (j === 30 || (j > 30 && (i * 3 + j) % 11 === 0)) g = 3; if (j === 29 && i > 2 && i < 9) g = 1; if (j === 28 && i > 3 && i < 8) g = 0;
    R.pset(X, Y, GR[Math.max(0, Math.min(6, Math.round(g + (umbral(X, Y) - 0.5) * 0.9)))]); }
  for (let i = 0; i < 38; i += 4) R.pset(x + 3 + i, y + 33, GR[1]); R.rect(x + 3, y + 34, x + 40, y + 34, GR[2]);
  cifras(21, x + 33, y + 43, hex('#5a5a62'));
};
const lapiz = (px, py) => { R.linea(px, py, px + 10, py + 3, C.k); R.linea(px + 1, py - 1, px + 10, py + 2, hex('#d8282a')); R.pset(px, py, hex('#9a1a1e')); };
const p3 = (t) => {
  const mk = lerp(0.56, 1, lin(t, P3 - 0.3, finTrazo));
  T.labFujita(R, t, { encuadre: 'mesa', marca: mk, lupa: false });
  // la tarjeta de la escala entra por la derecha y cae; la foto del embudo entra desde abajo a la derecha
  const vt = suave(lin(t, tarjetaIn[0], tarjetaIn[1])), kx = Math.round(lerp(330, 166, vt));
  if (t > tarjetaIn[0]) tarjeta(kx, 28, t, tarjetaIn[1] - 0.05);
  const vf = suave(lin(t, fotoIn[0], fotoIn[1])), fx = Math.round(lerp(326, 204, vf)), fy = Math.round(lerp(132, 64, vf));
  if (t > fotoIn[0]) fotoTornado(fx, fy);
  if (t > toca && t < toca + 0.5) { const r = 8 + (t - toca) * 60; for (let k = 0; k < 20; k++) { const g = k / 20 * Math.PI * 2; R.pset(Math.round(fx + 22 + Math.cos(g) * r), Math.round(fy + 25 + Math.sin(g) * r * 0.9), k % 2 ? hex('#fff6c0') : C.blanco); } }
  if (t > toca && parpadeo(t, 7)) for (const [dx, dy] of [[-3, 6], [47, 10], [44, 50]]) destello(fx + dx, fy + dy, 2, hex('#fff2b0'));
  // la mano de Fujita: con el lápiz al final del trazo, luego con la tarjeta y luego con la foto (la que toca en «tornado»)
  const manga = '#f2eee2';
  if (t < finTrazo + 0.45) { const n = Math.max(0, Math.floor(TRAZO.length * mk) - 1), [px, py] = TRAZO[n], sale = lin(t, finTrazo + 0.05, finTrazo + 0.45), hx = Math.round(px + 13 + sale * 160), hy = Math.round(py + 4 - sale * 20);
    lapiz(hx - 13, hy - 4); T.mano(R, hx, hy, -1, manga); }
  if (t > tarjetaIn[0] && t < tarjetaIn[1] + 0.5) { const sale = lin(t, tarjetaIn[1] + 0.05, tarjetaIn[1] + 0.5); T.mano(R, kx + 64 + Math.round(sale * 120), 44 + Math.round(sale * 10), -1, manga); }
  if (t > fotoIn[0] && t < E.duracion) { const tap = t > toca - 0.08 && t < toca + 0.18 ? 2 : 0, sale = lin(t, toca + 0.6, toca + 1.1); T.mano(R, fx + 40 + Math.round(sale * 120), fy + 30 + tap + Math.round(sale * 20), -1, manga); }
};
const efectos = [[0.45, 'papel'], [entrega, 'papel'], [ponFoto[1], 'golpecito'], [ted, 'pop'],
  [P2 + 0.05, 'motor', { dur: P3 - P2 + 0.2 }], [fotos[0], 'flash'], [fotos[1], 'flash'],
  [P3 + 0.05, 'lapiz'], [tarjetaIn[0] + 0.1, 'papel'], [tarjetaIn[1], 'golpecito'], [fotoIn[1], 'toc'], [toca, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1971 });
''')

# ── hu-tamano ───────────────────────────────────────────────────────────────────────────────────────────────────
E['hu-tamano'] = ('Tamaño', r'''// HU-TAMANO (frase 22), 1971 (la ciencia, con el año del relato). Tres planos:
// 1. el mapa del golfo: un huracán enorme avanza por su trayectoria punteada desde el sur, girando; en «300 miles
//    wide» se tiende la regla de lado a lado de la espiral y sale «300»; en «last two weeks», el calendario de dos
//    semanas tacha sus catorce días; dos barcos se apartan y un avión de reconocimiento le da vueltas; corta en «While»;
// 2. las llanuras con la luz verde de la tormenta: el granjero va al establo con su cubo; en «tornado» el embudo toca
//    tierra, como un hilo bajo la nube; se vuelve, deja el cubo y lo mira con los prismáticos; en «a few hundred yards across» la
//    horquilla marca lo estrecho que es; en «lives for minutes» saca el reloj de bolsillo (el cronómetro corre en su
//    bocadillo) y el embudo se recoge hacia la nube; él respira; corta en «But»;
// 3. el laboratorio de Fujita: gira el mando de la maqueta y el humo se retuerce en un embudo estrecho («inside that
//    narrow funnel»); aparece el anemómetro: la aguja sube, deja atrás la marca del huracán más fuerte y se clava en
//    «300» («even faster»); Fujita se sorprende y, en «strongest hurricane», señala la marca del huracán, que parpadea;
//    la becaria lo anota.''', COMUN + TORNADITO + ESPIRAL + r'''
import { avionMapa } from '/atomo/plato/escenas/ov-mapas.js';
const a = (f) => en('tamano', f);
const P2 = a(0.2621), P3 = a(0.6098);
// ── 1 · el huracán sobre el mapa ────────────────────────────────────────────────────────────────────────────────
const regla = [a(0.062), a(0.115)], cifra = a(0.07), dosSemanas = [a(0.18), a(0.236)];
const RUTA = [[-83.4, 22.2], [-84.6, 23.6], [-85.8, 25.0], [-87.0, 26.4], [-88.0, 27.5], [-88.6, 28.0]];
const enRuta = (P, u) => { const pts = RUTA.map((p) => P(p)); const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let q = tot * u; for (let i = 1; i < pts.length; i++) { if (q <= L[i - 1]) { const f = q / L[i - 1]; return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), pts.slice(0, i)]; } q -= L[i - 1]; } const z = pts[pts.length - 1]; return [z[0], z[1], pts]; };
// el calendario de dos semanas, sobre el papel: catorce casillas que se tachan
const calendario = (x, y, t, u) => {
  R.rect(x + 2, y + 2, x + 46, y + 30, hex('#5a6a7e')); R.rect(x, y, x + 44, y + 28, C.k); R.rect(x + 1, y + 1, x + 43, y + 27, hex('#f8f4e8')); R.rect(x + 1, y + 1, x + 43, y + 6, hex('#c8463a')); R.rect(x + 1, y + 1, x + 43, y + 1, hex('#e8705a'));
  for (const rx of [x + 10, x + 34]) { R.rect(rx, y - 2, rx + 1, y + 2, C.k); R.pset(rx, y - 1, hex('#c8ccd4')); }
  for (let k = 0; k < 14; k++) { const cx = x + 3 + (k % 7) * 6, cy = y + 9 + Math.floor(k / 7) * 9; R.rect(cx, cy, cx + 4, cy + 6, hex('#d8d2c0')); R.rect(cx + 1, cy + 1, cx + 3, cy + 5, hex('#fffdf6'));
    if (u * 14 > k + 0.5) { R.linea(cx, cy + 1, cx + 4, cy + 5, hex('#c8282a')); R.linea(cx + 4, cy + 1, cx, cy + 5, hex('#c8282a')); } }
};
const barco = (x, y, t, d) => { const b = Math.round(Math.sin(t * 3 + x) * 0.6); R.icono('barco', Math.round(x), Math.round(y) + b, hex('#3a3a46'), hex('#7898b0')); for (let k = 1; k < 4; k++) R.pset(Math.round(x + 3 - d * (k * 3 + 4)), Math.round(y + 7) + b, hex('#a4c0d0')); };
// el mapa del golfo no se mueve: se pinta una vez en su búfer (con R.usar(prev) para que los fundidos no se rompan)
let capaGolfo = null, P_GOLFO = null;
const p1 = (t) => {
  if (!capaGolfo) { capaGolfo = R.nuevo(); const prev = R.usar(capaGolfo); P_GOLFO = T.mapa(R, 0, { zona: 'golfo' }); R.usar(prev); }
  R.copiar(capaGolfo); const P = P_GOLFO;
  for (const [lon, lat] of [[-95.4, 29.8], [-90.1, 29.95], [-82.5, 27.9]]) { const [x, y] = P([lon, lat]); T.chincheta(R, Math.round(x), Math.round(y), t, C.rojo, { pulso: true }); }
  // dos barcos que se apartan de la tormenta
  barco(lerp(124, 92, lin(t, 0, P2)), lerp(128, 120, lin(t, 0, P2)), t, -1); barco(lerp(206, 236, lin(t, 0, P2)), lerp(96, 88, lin(t, 0, P2)), t, 1);
  // la trayectoria punteada que deja atrás y el huracán que avanza por ella, girando
  const u = lerp(0.42, 1, lin(t, 0, P2 + 0.3)), [hx, hy, pasados] = enRuta(P, u), r = 24 * lerp(0.8, 1, suave(lin(t, 0.2, 1.4)));
  const ruta = [...pasados, [hx, hy]]; for (let i = 1; i < ruta.length; i++) { const [ax, ay] = ruta[i - 1], [bx, by] = ruta[i], n = Math.ceil(Math.hypot(bx - ax, by - ay)); for (let k = 0; k <= n; k += 3) { const x = Math.round(lerp(ax, bx, k / n)), y = Math.round(lerp(ay, by, k / n)); R.pset(x, y + 1, hex('#5a6a7e')); R.pset(x, y, hex('#c8463a')); } }
  for (let i = 0; i < ruta.length - 1; i++) { const [x, y] = ruta[i].map(Math.round); R.disco(x, y, 2, C.k); R.disco(x, y, 1, hex('#f8f4e8')); }
  espiral(Math.round(hx), Math.round(hy), r, t, { alfa: lin(t, 0, 0.6) * 0.5 + 0.5 });
  // un avión de reconocimiento que le da vueltas
  { const g = t * 0.9, ax = hx + Math.cos(g) * (r * 1.5 + 8), ay = hy + Math.sin(g) * (r * 1.5 + 6) * 0.8; avionMapa(R, Math.round(ax), Math.round(ay), g + Math.PI / 2, hex('#2a2a36')); }
  // «300 miles wide»: la regla que cruza la espiral de lado a lado por el ojo, con sus topes, y la cifra encima
  const ru = suave(lin(t, regla[0], regla[1])); if (ru > 0) { const y = Math.round(hy), w = Math.round(r * 1.3 * ru), x = Math.round(hx);
    R.rect(x - w - 1, y - 2, x + w + 1, y + 1, C.k); R.rect(x - w, y - 1, x + w, y, C.blanco); R.rect(x - w, y, x + w, y, hex('#c8d0dc'));
    if (ru >= 1) for (const s of [-1, 1]) { R.rect(x + s * w - 1, y - 6, x + s * w + 1, y + 5, C.k); R.rect(x + s * w, y - 5, x + s * w, y + 4, C.blanco); for (const dy of [-1, 0]) { R.pset(x + s * (w - 2), y + dy - 2, C.k); R.pset(x + s * (w - 2), y + dy + 2, C.k); } } }
  const e = lin(t, cifra, cifra + 0.3); if (e > 0) R.numero('300', Math.round(hx), Math.round(hy - r * 1.5 - 3 + (1 - e) * 6), { tam: 16, centro: true });
  // «two weeks»: el calendario se tacha día a día
  calendario(254, 128, t, lin(t, dosSemanas[0], dosSemanas[1] + 0.25));
};
// ── 2 · el tornado como un hilo ─────────────────────────────────────────────────────────────────────────────────
const toca = a(0.299), ancho = [a(0.394), a(0.47)], reloj = [a(0.508), a(0.585)], seRecoge = [a(0.555), a(0.6)];
const cubo = (x, y) => { R.rect(x, y, x + 4, y + 4, C.k); R.rect(x + 1, y + 1, x + 3, y + 3, hex('#9aa4b4')); R.pset(x + 1, y + 1, hex('#c8d0dc')); R.linea(x, y - 1, x + 4, y - 1, hex('#5a5e68')); R.pset(x + 2, y - 2, hex('#5a5e68')); };
const p2 = (t) => {
  const tor = t < seRecoge[0] ? 0.35 * suave(lin(t, P2 + 0.05, toca)) : 0.35 * (1 - suave(lin(t, seRecoge[0], seRecoge[1] + 0.2)));
  T.llanuras(R, t, { luz: 'verde', tornado: tor, cosechadora: false });
  // «a few hundred yards across»: la horquilla bajo el embudo
  const h = lin(t, ancho[0], ancho[0] + 0.25); if (h > 0 && t < ancho[1] + 0.6) { const x = 214, y = 103, w = Math.round(3 * h); R.rect(x - w - 1, y, x + w + 1, y + 2, C.k); R.rect(x - w, y + 1, x + w, y + 1, C.blanco); for (const s of [-1, 1]) { R.rect(x + s * (w + 1), y - 3, x + s * (w + 1), y + 3, C.k); R.pset(x + s * w, y - 2, C.blanco); R.pset(x + s * w, y - 1, C.blanco); } if (parpadeo(t, 10)) destello(x, y - 7, 1, hex('#fff2b0')); }
  // el granjero llega con el cubo, se para al ver el embudo, lo mira con los prismáticos y saca el reloj
  const u = lin(t, P2 - 0.3, toca + 0.1), gx = Math.round(lerp(146, 116, suave(u))), sorp = entre(t, toca + 0.1, toca + 0.7), prism = entre(t, toca + 0.7, ancho[1] + 0.3), saca = t > reloj[0], alivio = t > seRecoge[1], gd = t < toca + 0.1 ? -1 : 1;
  R.actor(EL.granjero, gx, 144, t, { dir: gd, anda: u > 0 && u < 1, sorpresa: sorp || entre(t, ancho[0], ancho[0] + 0.3), dedo: prism || (saca && !alivio), sonrisa: alivio, habla: entre(t, reloj[0] + 0.2, reloj[0] + 0.8) && parpadeo(t, 8) });
  if (!prism && !saca) { const [cx, cy] = enMano(gx, 144, gd); cubo(cx - 2, cy - 2); } else { R.rect(gx - 8, 139, gx - 4, 143, C.k); R.rect(gx - 7, 140, gx - 5, 142, hex('#9aa4b4')); R.pset(gx - 7, 140, hex('#c8d0dc')); }
  if (prism) { const yH = 144 - 13 - 12; R.rect(gx + 11, yH + 4, gx + 16, yH + 7, C.k); R.rect(gx + 12, yH + 5, gx + 13, yH + 6, hex('#3a4a5a')); R.rect(gx + 15, yH + 5, gx + 16, yH + 6, hex('#3a4a5a')); if (parpadeo(t, 5)) R.pset(gx + 16, yH + 5, C.blanco); }
  // el reloj de bolsillo y su bocadillo: el cronómetro que corre unos minutos
  if (saca) { const [mx, my] = [gx + 15, 144 - 13 - 12 - 4]; R.disco(mx, my + 1, 2, C.k); R.disco(mx, my + 1, 1, hex('#e8c040'));
    const e = lin(t, reloj[0], reloj[0] + 0.25), cx = gx + 30, cy = 92, rr = Math.round(11 * e);
    if (rr > 2 && t < E.duracion) { R.disco(gx + 20, 108, 1.5, C.k); R.disco(gx + 24, 102, 2.5, C.k); R.disco(gx + 24, 102, 1.5, C.blanco);
      R.disco(cx, cy, rr + 2, C.k); R.disco(cx, cy, rr + 1, hex('#e8c040')); R.disco(cx, cy, rr, C.blanco); R.rect(cx - 1, cy - rr - 5, cx + 1, cy - rr - 2, C.k); R.rect(cx - 2, cy - rr - 6, cx + 2, cy - rr - 5, hex('#e8c040'));
      if (rr >= 10) { for (let k = 0; k < 12; k++) { const g = k * Math.PI / 6; R.pset(Math.round(cx + Math.cos(g) * 8), Math.round(cy + Math.sin(g) * 8), k % 3 ? hex('#9aa0aa') : C.k); }
        const g = (t - reloj[0]) * 9 - Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(g) * 7), Math.round(cy + Math.sin(g) * 7), hex('#c8282a')); const m = (t - reloj[0]) * 0.75 - Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(m) * 5), Math.round(cy + Math.sin(m) * 5), C.k);
        for (let k = 0; k < 5; k++) { const gg = -Math.PI / 2 + k * 0.3; R.pset(Math.round(cx + Math.cos(gg) * 6), Math.round(cy + Math.sin(gg) * 6), hex('#f0a0a0')); } R.pset(cx, cy, C.k); } } }
};
// ── 3 · el anemómetro que se dispara ────────────────────────────────────────────────────────────────────────────
const mando = a(0.618), embudo = [a(0.635), a(0.705)], sale = a(0.748), sube = [a(0.785), a(0.835)], fuerte = a(0.9114);
const ESC = 320, HUR = 200, TOR = 300;
// el anemómetro: esfera blanca con su bisel, el arco de colores, las marcas, la del huracán más fuerte (su espiral) y la del
// tornado (su embudo), la aguja y el contador
const anemometro = (cx, cy, s, v, t) => {
  if (s <= 0) return; const r = Math.round(25 * s);
  R.disco(cx + 2, cy + 3, r + 5, hex('#8a8478')); R.disco(cx, cy, r + 5, C.k); R.disco(cx, cy, r + 4, hex('#5a5e68')); R.disco(cx, cy, r + 3, hex('#9aa2ae')); R.disco(cx - 1, cy - 1, r + 2, hex('#c8d0dc')); R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, hex('#f8f6ee'));
  if (s < 1) return;
  const ang = (q) => Math.PI * (0.85 + 1.3 * q / ESC);   // de abajo a la izquierda, por arriba, a abajo a la derecha
  for (let q = 0; q <= ESC; q += 2) { const g = ang(q), col = q < 74 ? hex('#5ab85a') : q < 157 ? hex('#e8c040') : q < 250 ? hex('#f08a3a') : hex('#d83a3a'); for (let rr = r - 5; rr <= r - 2; rr++) R.pset(Math.round(cx + Math.cos(g) * rr), Math.round(cy + Math.sin(g) * rr), col); }
  for (let q = 0; q <= ESC; q += 20) { const g = ang(q), l = q % 100 === 0 ? 4 : 2; R.linea(Math.round(cx + Math.cos(g) * (r - 6)), Math.round(cy + Math.sin(g) * (r - 6)), Math.round(cx + Math.cos(g) * (r - 6 - l)), Math.round(cy + Math.sin(g) * (r - 6 - l)), C.k); }
  // la marca del huracán más fuerte (fuera del arco) y la del tornado
  { const g = ang(HUR), x = Math.round(cx + Math.cos(g) * (r + 13)), y = Math.round(cy + Math.sin(g) * (r + 13)), late = t > fuerte && t < fuerte + 1.4 && parpadeo(t, 12);
    R.disco(x, y, 9, C.k); R.disco(x, y, 8, late ? hex('#f0c040') : hex('#5a86b0')); espiral(x, y, 5, t, { giro: 2.2 });
    R.linea(Math.round(cx + Math.cos(g) * (r + 4)), Math.round(cy + Math.sin(g) * (r + 4)), Math.round(cx + Math.cos(g) * (r - 7)), Math.round(cy + Math.sin(g) * (r - 7)), C.k);
    R.linea(Math.round(cx + Math.cos(g) * (r - 1)) + 1, Math.round(cy + Math.sin(g) * (r - 1)), Math.round(cx + Math.cos(g) * (r - 7)) + 1, Math.round(cy + Math.sin(g) * (r - 7)), late ? hex('#f0c040') : hex('#2a4a8a')); }
  { const g = ang(TOR), x = Math.round(cx + Math.cos(g) * (r + 13)), y = Math.round(cy + Math.sin(g) * (r + 13)); R.disco(x, y, 9, C.k); R.disco(x, y, 8, hex('#c8b896')); tornadito(x, y + 6, t, 3, { polvo: false, s: 1.1 }); }
  // la aguja con su sombra y el eje
  const g = ang(v), tb = v >= TOR - 1 ? Math.sin(t * 40) * 0.015 : 0;
  R.linea(cx + 1, cy + 1, Math.round(cx + 1 + Math.cos(g + tb) * (r - 3)), Math.round(cy + 1 + Math.sin(g + tb) * (r - 3)), hex('#b8b4a8'));
  R.linea(cx, cy, Math.round(cx + Math.cos(g + tb) * (r - 3)), Math.round(cy + Math.sin(g + tb) * (r - 3)), hex('#c8282a')); R.disco(cx, cy, 2.5, C.k); R.disco(cx, cy, 1.5, hex('#9aa2ae'));
  // el contador
  R.rect(cx - 13, cy + 8, cx + 13, cy + 18, C.k); R.rect(cx - 12, cy + 9, cx + 12, cy + 17, hex('#1e2a1e')); R.numero(String(Math.round(v)), cx, cy + 17, { centro: true, color: v >= TOR - 1 && parpadeo(t, 10) ? hex('#fff2b0') : hex('#7aff8a'), sombra: false });
};
const p3 = (t) => {
  T.labFujita(R, t, { maqueta: suave(lin(t, embudo[0], embudo[1])) });
  // Fujita gira el mando de la maqueta, se vuelve hacia el anemómetro, se asombra y señala la marca del huracán
  const vuelve = t > sale + 0.3;
  R.actor(EL.fujita, 62, 160, t, { dir: vuelve ? 1 : -1, dedo: entre(t, mando - 0.1, embudo[0] + 0.3) || entre(t, fuerte - 0.1, fuerte + 1.0), sorpresa: entre(t, sube[1] - 0.1, sube[1] + 0.6), sonrisa: t > fuerte + 1.0 || entre(t, embudo[1], sale), habla: entre(t, fuerte, fuerte + 0.9) && parpadeo(t, 8) });
  if (entre(t, mando - 0.1, embudo[0] + 0.3) && parpadeo(t, 12)) destello(36, 118, 2, hex('#fff2b0'));
  // la becaria, a la derecha de la mesa de luz, con su tablilla
  R.actor(EL.tecnica, 204, 162, t, { dir: -1, sorpresa: entre(t, sube[1], sube[1] + 0.7), dedo: entre(t, fuerte + 0.6, fuerte + 1.3), sonrisa: t > fuerte + 1.3 });
  { const [tx, ty] = enMano(204, 162, -1); R.rect(tx - 4, ty - 6, tx + 2, ty + 2, C.k); R.rect(tx - 3, ty - 5, tx + 1, ty + 1, hex('#f6f2e2')); for (let k = 0; k < 3; k++) R.rect(tx - 2, ty - 4 + k * 2, tx, ty - 4 + k * 2, hex('#3a4a7a')); }
  // el anemómetro aparece y su aguja se dispara
  const s = suave(lin(t, sale - 0.05, sale + 0.25)), q = t < sube[0] ? 0 : t < sube[1] ? TOR * suave(lin(t, sube[0], sube[1])) ** 0.8 : TOR;
  anemometro(118, 60, s, q, t);
};
const efectos = [[regla[0], 'whoosh'], [cifra, 'pop'], [dosSemanas[0], 'lapiz'], [dosSemanas[0] + 0.5, 'lapiz'],
  [toca - 0.3, 'rafaga'], [ancho[0], 'pop'], [reloj[0], 'tic'], [reloj[0] + 0.3, 'tic'], [reloj[0] + 0.6, 'tic'], [reloj[0] + 0.9, 'tic'], [seRecoge[0] + 0.1, 'whoosh'],
  [mando, 'interruptor'], [embudo[0], 'zumbido'], [sale, 'pop'], [sube[0], 'tecleo', { dur: sube[1] - sube[0] }], [sube[1], 'boing'], [fuerte, 'aviso'], [fuerte + 1.2, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1971 });
''')

# ── hu-llanuras ─────────────────────────────────────────────────────────────────────────────────────────────────
E['hu-llanuras'] = ('Las llanuras', r'''// HU-LLANURAS (frase 23). La ciencia de hoy, sin barra del año. Cuatro planos:
// 1. el gag de la vaca, en el prado al atardecer: a lo lejos, un tornado toca tierra y cruza la llanura; la vaca lo mira
//    de perfil sin dejar de mascar y, en «favorite place on Earth», se vuelve hacia nosotros, impasible, masticando; una
//    mosca le ronda la cabeza; corta en «About»;
// 2. el mapa del mundo: en «1,200 tornadoes» EE. UU. se llena de puntos (sobre todo en las llanuras y el sureste) y el
//    contador sube hasta «1,200»; en «more than in any other country», unos pocos puntos en Canadá, México y Europa, y la
//    medalla del «1» sobre EE. UU.; pasan un barco y un avión; corta en «because»;
// 3. el mapa de las llanuras: en «Great Plains» se tiñen de trigo; en «warm, wet air from the Gulf» crece la flecha verde
//    desde el golfo hacia el norte, con gotas que corren; en «slips under dry air» la flecha marrón llega desde las
//    Rocosas por encima, con su sombra (la verde pasa por debajo); donde se cruzan, las nubes crecen y asoma un
//    tornadito; corta en «Rockies»;
// 4. la granja bajo la supercelda: el aire seco de las Rocosas cruza alto (flecha marrón) y el húmedo entra bajo (verde);
//    en «the winds speed up» una ráfaga le quita el sombrero al granjero, que lo ve volar; en «twist with height» las
//    flechas del viento se tuercen con la altura y un anillo gira alrededor de la base de la nube; él señala arriba.''', COMUN + TORNADITO + r'''
import { equirect, pintar, PAPEL, rosa, avionMapa } from '/atomo/plato/escenas/ov-mapas.js';
import { TIERRA, EEUU48, CANADA_P, MEXICO_P } from '/atomo/plato/escenas/geo-ov.js';
const a = (f) => en('llanuras', f);
const P2 = a(0.2123), P3 = a(0.5328), P4 = a(0.8059);
// ── 1 · la vaca ─────────────────────────────────────────────────────────────────────────────────────────────────
const vuelve = a(0.111);
const p1 = (t) => {
  T.llanuras(R, t, { encuadre: 'pasto', luz: 'tarde', tornado: lerp(0.28, 0.78, lin(t, 0, P2 + 0.4)) });
  T.g_vaca(R, 246, 174, t, { dir: -1, s: 2, luz: 'tarde', mira: t > vuelve ? 1 : 0 });
  // la mosca que le ronda la cabeza
  { const g = t * 5.3, x = Math.round(214 + Math.cos(g) * 9 + Math.sin(g * 2.3) * 3), y = Math.round(128 + Math.sin(g * 1.4) * 6); R.pset(x, y, C.k); if (Math.floor(t * 20) % 2) { R.pset(x - 1, y - 1, hex('#c8d4e0')); R.pset(x + 1, y - 1, hex('#c8d4e0')); } }
};
// ── 2 · el mapa del mundo ───────────────────────────────────────────────────────────────────────────────────────
const cuenta = [a(0.2232), a(0.39)], otros = [a(0.4264), a(0.47)], medalla = a(0.4702);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const dentro = (pols, lon, lat) => { for (const p of pols) { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c; } if (c) return true; } return false; };
// los puntos de los tornados: la densidad de verdad (las llanuras y el sureste, mucho; el oeste, casi nada)
const densidad = (lon, lat) => { if (lon < -106) return 0.05; if (lon > -104 && lon < -94 && lat > 30 && lat < 44) return 1; if (lon > -94 && lon < -83 && lat > 30 && lat < 37) return 0.95; if (lon > -94 && lon < -84 && lat >= 37 && lat < 43) return 0.75; if (lon > -83 && lat < 31) return 0.6; return 0.3; };
const PUNTOS = (() => { const v = []; for (let k = 0; v.length < 230 && k < 20000; k++) { const lon = -124 + hh(k, 1, 31) * 57, lat = 25 + hh(k, 2, 31) * 24; if (hh(k, 3, 31) < densidad(lon, lat) && dentro(EEUU48, lon, lat)) v.push([lon, lat, hh(k, 4, 31)]); } return v; })();
const FUERA = [[-80.5, 43.6], [-79.8, 44.4], [-97.4, 50.1], [-104.6, 50.5], [-106.7, 52.1], [-75.7, 45.4], [-73.6, 45.6], [-81.2, 42.9], [-100.3, 25.7], [-99.1, 19.4], [-103.4, 20.7],
  [-1.5, 52.4], [0.1, 51.5], [2.3, 48.9], [4.9, 52.4], [9.2, 48.8], [13.4, 52.5], [11.6, 48.1], [21.0, 52.2], [14.4, 50.1], [19.0, 47.5], [12.5, 41.9], [9.2, 45.5], [-3.7, 40.4], [16.4, 48.2], [26.1, 44.4], [27.6, 53.9], [30.5, 50.4], [24.1, 56.9], [18.1, 59.3], [-6.3, 53.3], [-2.2, 53.5], [7.3, 46.9], [3.1, 50.6], [6.8, 51.2], [23.7, 37.9], [28.9, 41.0], [20.5, 44.8], [-8.6, 41.1], [10.0, 53.6]].map(([lon, lat], k) => [lon, lat, hh(k, 9, 32)]);
const mapaMundo = (P, t) => {
  const { rect, pset } = R;
  rect(0, 0, 319, 179, PAPEL.mar); for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x++) if (hh(x >> 2, y, 150) < 0.1) pset(x, y, PAPEL.marS);
  for (let lon = -180; lon <= 60; lon += 15) for (let lat = -30; lat <= 85; lat += 0.5) { if (Math.round(lat * 2) % 4) continue; const [x, y] = P([lon, lat]); pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  for (let lat = -15; lat <= 75; lat += 15) for (let lon = -180; lon <= 60; lon += 0.5) { if (Math.round(lon * 2) % 4) continue; const [x, y] = P([lon, lat]); pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  const trama = (c1, c2, k) => (x, y) => (hh(x >> 1, y, k) < 0.08 ? c2 : c1);
  pintar(R, P, TIERRA, trama(PAPEL.tierra, PAPEL.tierraS, 151), { somera: PAPEL.somera });
  pintar(R, P, CANADA_P, trama(PAPEL.tierraS, PAPEL.tierra, 154)); pintar(R, P, MEXICO_P, trama(PAPEL.tierraS, PAPEL.tierra, 155));
  pintar(R, P, EEUU48, trama(hex('#f0d0a0'), hex('#e4bc88'), 156), { borde: hex('#8a4a2a') });
  rosa(R, 36, 146, t);
  // el papel: las esquinas más oscuras y la mesa de madera alrededor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 90) / 90); if (d > 0.82 && hh(x, y, 157) < (d - 0.82) * 4) { const c = R.pget(x, y); pset(x, y, ((((c & 0xfefefe) >>> 1) + (((c & 0xfcfcfc) >>> 2))) | 0xff000000) >>> 0); } }
  const m = 6; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (x < m || x > 319 - m || y < m || y > 179 - m) pset(x, y, (y + Math.round(Math.sin(x * 0.05) * 2)) % 6 < 2 ? hex('#4a2e1a') : PAPEL.mesa);
  rect(m - 1, m - 1, 320 - m, m - 1, C.k); rect(m - 1, 180 - m, 320 - m, 180 - m, C.k); rect(m - 1, m - 1, m - 1, 180 - m, C.k); rect(320 - m, m - 1, 320 - m, 180 - m, C.k);
};
const punto = (x, y, t, t0) => { const e = t - t0; if (e < 0) return; x = Math.round(x); y = Math.round(y); if (e < 0.15) { destello(x, y, 2, hex('#fff2b0')); return; } R.pset(x, y, hex('#a8202a')); R.pset(x + 1, y, hex('#7a1820')); R.pset(x, y + 1, hex('#7a1820')); };
const P_MUNDO = equirect([6, 6, 313, 173], [-132, 38, -6, 86.5]);
// un número grande con la coma de los millares a la americana («1,200»), con la coma estrecha (la de la fuente ocupa una casilla)
const miles = (n, x, base) => { if (n < 1000) { R.numero(String(n), x, base, { tam: 16 }); return; }
  const w = R.numero(String(Math.floor(n / 1000)), x, base, { tam: 16 }), cx = x + w - 1; R.rect(cx - 1, base - 4, cx + 3, base + 2, C.k); R.rect(cx, base - 3, cx + 2, base - 1, hex('#f0c030')); R.pset(cx, base, hex('#c88a1c')); R.pset(cx + 1, base, hex('#c88a1c'));
  R.numero(String(n % 1000).padStart(3, '0'), cx + 5, base, { tam: 16 }); };
let capaMundo = null;
const p2 = (t) => {
  const P = P_MUNDO; if (!capaMundo) { capaMundo = R.nuevo(); const prev = R.usar(capaMundo); mapaMundo(P, 0); R.usar(prev); } R.copiar(capaMundo);
  // un barco que cruza el Atlántico y un avión que va a Europa
  { const u = lin(t, P2 - 0.5, P3 + 0.5), [x, y] = P([lerp(-60, -30, u), lerp(38, 41, u)]); R.icono('barco', Math.round(x), Math.round(y), hex('#3a3a46'), hex('#7898b0')); for (let k = 1; k < 4; k++) R.pset(Math.round(x - k * 3), Math.round(y + 7), hex('#a4c0d0')); }
  { const u = lin(t, P2, P3 + 1), [x, y] = P([lerp(-70, -15, u), lerp(46, 52, u) + Math.sin(u * 3) * 1.5]); avionMapa(R, Math.round(x), Math.round(y), -0.08, hex('#2a2a36')); for (let k = 2; k < 9; k++) if (k % 2) R.pset(Math.round(x - k * 2), Math.round(y + 1), hex('#e8ecf4')); }
  // los tornados de EE. UU.: aparecen deprisa, en orden revuelto, y el contador sube con ellos
  const fr = lin(t, cuenta[0], cuenta[1]); PUNTOS.forEach(([lon, lat, q]) => { const [x, y] = P([lon, lat]); punto(x, y, t, cuenta[0] + q * (cuenta[1] - cuenta[0])); });
  FUERA.forEach(([lon, lat, q]) => { const [x, y] = P([lon, lat]); punto(x, y, t, otros[0] + q * (otros[1] - otros[0])); });
  if (t > cuenta[0] - 0.1) { const n = Math.round(1200 * suave(fr) ** 0.9); tornadito(30, 66, t, 0, { s: 1.4, polvo: false }); miles(n, 44, 66); }
  // la medalla del «1» sobre EE. UU.
  const e = lin(t, medalla, medalla + 0.3); if (e > 0) { const x = 136, y = Math.round(60 - (1 - e) * 8); R.poligono([[x - 4, y + 3], [x - 1, y + 3], [x - 3, y + 12], [x - 6, y + 10]], hex('#c8282a')); R.poligono([[x + 1, y + 3], [x + 4, y + 3], [x + 6, y + 10], [x + 3, y + 12]], hex('#2a4a9a'));
    R.disco(x, y, 7, C.k); R.disco(x, y, 6, hex('#c8941c')); R.disco(x - 1, y - 1, 5, hex('#f0c030')); R.numero('1', x + 1, y + 4, { centro: true, color: hex('#7a5a10'), sombra: false }); if (parpadeo(t, 6)) destello(x + 5, y - 5, 2); }
};
// ── 3 · el mapa de las llanuras, con las dos masas de aire ──────────────────────────────────────────────────────
const llanos = a(0.5644), verde = [a(0.6022), a(0.6989)], marron = [a(0.7135), a(0.765)], nubes = a(0.765);
const LLANOS = [[-104.5, 49], [-97, 49], [-96.5, 44], [-95.5, 39], [-96, 33], [-97.5, 29], [-101.5, 29.6], [-104.5, 32], [-105.2, 38], [-104.8, 44]];
const V_RUTA = [[-94.6, 26.6], [-96.2, 29.6], [-97.5, 33.0], [-97.9, 36.5], [-97.6, 39.6], [-96.6, 41.8]], M_RUTA = [[-108.6, 35.2], [-105.0, 36.1], [-101.0, 36.9], [-97.0, 37.3], [-93.4, 37.5]];
// una flecha gruesa que crece (p 0–1) por una ruta: contorno, cuerpo con su luz y su punta
const flecha = (pts, p, w, col, luz, osc) => {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const sigue = []; let q = tot * p; for (let i = 1; i < pts.length && q > 0; i++) { const f = Math.min(1, q / L[i - 1]), n = Math.ceil(L[i - 1] * f); for (let k = 0; k <= n; k++) sigue.push([lerp(pts[i - 1][0], pts[i][0], f * k / Math.max(1, n)), lerp(pts[i - 1][1], pts[i][1], f * k / Math.max(1, n))]); q -= L[i - 1]; }
  if (sigue.length < 2) return null; const fin = sigue[sigue.length - 1], pre = sigue[Math.max(0, sigue.length - 6)], an = Math.atan2(fin[1] - pre[1], fin[0] - pre[0]);
  const cuerpo = sigue.slice(0, Math.max(1, sigue.length - 4));
  for (const [x, y] of cuerpo) R.disco(x, y, w / 2 + 1, C.k);
  const pt = [[fin[0] + Math.cos(an) * 5, fin[1] + Math.sin(an) * 5], [fin[0] + Math.cos(an + 2.3) * (w * 0.9 + 1), fin[1] + Math.sin(an + 2.3) * (w * 0.9 + 1)], [fin[0] + Math.cos(an - 2.3) * (w * 0.9 + 1), fin[1] + Math.sin(an - 2.3) * (w * 0.9 + 1)]];
  R.poligono(pt.map(([x, y], i) => [Math.round(x + (i ? Math.cos(Math.atan2(y - fin[1], x - fin[0])) : Math.cos(an))), Math.round(y + (i ? Math.sin(Math.atan2(y - fin[1], x - fin[0])) : Math.sin(an)))]), C.k);
  for (const [x, y] of cuerpo) R.disco(x, y, w / 2, col); R.poligono(pt.map(([x, y]) => [Math.round(x), Math.round(y)]), col);
  for (const [x, y] of cuerpo) R.pset(Math.round(x - 1), Math.round(y - 1), luz); for (const [x, y] of cuerpo) R.pset(Math.round(x + 1), Math.round(y + w / 2 - 1), osc);
  return sigue;
};
let capaLlanos = null, P_LLANOS = null;
const p3 = (t) => {
  if (!capaLlanos) { capaLlanos = R.nuevo(); const prev = R.usar(capaLlanos); P_LLANOS = T.mapa(R, 0, { zona: 'llanuras' }); R.usar(prev); }
  R.copiar(capaLlanos); const P = P_LLANOS;
  // las Grandes Llanuras, teñidas de trigo, con la mies que ondea
  const tl = lin(t, llanos, llanos + 0.5); if (tl > 0) { const pts = LLANOS.map((p) => P(p).map(Math.round)), papel = [hex('#e8dcbc'), hex('#d8c8a4')];
    R.poligono(pts, (x, y) => { const c = R.pget(x, y); if (c !== papel[0] && c !== papel[1]) return c; const ola = Math.sin(x * 0.45 - t * 3 + y * 0.25) > 0.55; return umbral(x, y) < tl * 0.55 ? (ola ? hex('#f0d078') : hex('#e0bc5c')) : (ola && umbral(x, y) < tl * 0.8 ? hex('#ecd08c') : c); }); }
  // las Rocosas, a la izquierda: picos con nieve; y el golfo, abajo, con sus olas
  for (const [lon, lat, s] of [[-106.2, 39.6, 1.2], [-105.6, 37.6, 1], [-106.6, 35.6, 0.9], [-105.2, 41.4, 0.9], [-107.6, 38.4, 1.1], [-108.2, 36.4, 0.8], [-107.2, 40.6, 0.9]]) { const [x, y] = P([lon, lat]).map(Math.round), w = Math.round(6 * s), hgt = Math.round(7 * s);
    R.poligono([[x - w - 1, y + 1], [x, y - hgt - 1], [x + w + 1, y + 1]], C.k); R.poligono([[x - w, y], [x, y - hgt], [x + w, y]], hex('#9a8466')); R.poligono([[x, y - hgt], [x + w, y], [x + 1, y]], hex('#7a6448')); R.poligono([[x - 2, y - hgt + 3], [x, y - hgt], [x + 2, y - hgt + 3]], C.blanco); }
  for (const [lon, lat] of [[-93.0, 27.6], [-90.4, 27.2], [-91.8, 26.4], [-88.6, 26.6]]) { const [x, y] = P([lon, lat]).map(Math.round), d = Math.round(Math.sin(t * 2 + lon) * 1.5); for (let i = -4; i <= 4; i++) R.pset(x + i + d, y + Math.round(Math.sin((i + d) * 0.9) * 1), hex('#d8e8f0')); }
  // la flecha verde del aire cálido y húmedo, con sus gotas
  const vg = flecha(V_RUTA.map(P), suave(lin(t, verde[0], verde[1])), 9, hex('#3aa860'), hex('#7ad890'), hex('#24804a'));
  if (vg) for (let k = 0; k < 6; k++) { const i = Math.floor(((t * 0.35 + k / 6) % 1) * (vg.length - 8)); if (i < 0) continue; const [x, y] = vg[i].map(Math.round); R.pset(x, y - 1, hex('#e8f8ff')); R.pset(x, y, hex('#8ad0f0')); R.pset(x - 1, y + 1, hex('#5ab0e0')); R.pset(x + 1, y + 1, hex('#5ab0e0')); }
  // la flecha marrón del aire seco, por encima: primero su sombra sobre la verde
  const pm = suave(lin(t, marron[0], marron[1]));
  if (pm > 0) { const sm = M_RUTA.map(P).map(([x, y]) => [x + 2, y + 4]); const L = []; flecha(sm, pm, 9, hex('#5a6a7e'), hex('#5a6a7e'), hex('#5a6a7e'));
    const mg = flecha(M_RUTA.map(P), pm, 9, hex('#b07a3e'), hex('#e0a868'), hex('#7a4e24'));
    if (mg) for (let k = 0; k < 5; k++) { const i = Math.floor(((t * 0.5 + k / 5) % 1) * (mg.length - 8)); if (i < 0) continue; const [x, y] = mg[i].map(Math.round); R.pset(x, y, hex('#f0d8a8')); R.pset(x + 1, y, hex('#d8b880')); } }
  // donde se cruzan, las nubes de tormenta que crecen y un tornadito
  const nu = lin(t, nubes, nubes + 0.5); if (nu > 0) { const [x, y] = P([-98.4, 38.6]).map(Math.round); for (const [dx, dy, r] of [[0, 0, 5], [-5, 2, 4], [5, 1, 4], [-2, -4, 4], [3, -3, 3]]) R.disco(x + dx, y + dy + 1, r * nu + 1, C.k); for (const [dx, dy, r] of [[0, 0, 5], [-5, 2, 4], [5, 1, 4], [-2, -4, 4], [3, -3, 3]]) R.disco(x + dx, y + dy, r * nu, hex('#eef0f6')); for (const [dx, dy, r] of [[0, 0, 5], [-5, 2, 4]]) R.disco(x + dx + 1, y + dy + 2, r * nu * 0.6, hex('#b8c0d0')); if (nu >= 1) tornadito(x + 1, y + 16, t, 1, { polvoC: hex('#a89070') }); }
};
// ── 4 · la granja bajo la supercelda ────────────────────────────────────────────────────────────────────────────
const vientos = [a(0.8838), a(0.92)], tuerce = a(0.9361), vuela = a(0.8947);
const flechaFina = (x0, y0, x1, y1, p, col, osc) => { const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0); R.linea(Math.round(x0), Math.round(y0 + 1), Math.round(x), Math.round(y + 1), osc); R.linea(Math.round(x0), Math.round(y0), Math.round(x), Math.round(y), col); R.linea(Math.round(x0), Math.round(y0 - 1), Math.round(x), Math.round(y - 1), col);
  if (p > 0.2) for (const s of [-1, 1]) { R.linea(Math.round(x), Math.round(y), Math.round(x - Math.cos(an + s * 0.55) * 5), Math.round(y - Math.sin(an + s * 0.55) * 5), C.k); R.linea(Math.round(x), Math.round(y - 1), Math.round(x - Math.cos(an + s * 0.55) * 4), Math.round(y - 1 - Math.sin(an + s * 0.55) * 4), col); } };
// una flecha de viento gruesa (cuerpo de 3 px con su contorno y la punta), que crece con p
const flechaGorda = (x0, y0, x1, y1, p, col, osc) => { const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0), n = Math.max(1, Math.ceil(Math.hypot(x - x0, y - y0)));
  for (let i = 0; i <= n; i++) { const px = Math.round(lerp(x0, x, i / n)), py = Math.round(lerp(y0, y, i / n)); R.rect(px - 2, py - 2, px + 2, py + 2, C.k); }
  const pt = [[x + Math.cos(an) * 5, y + Math.sin(an) * 5], [x + Math.cos(an + 2.4) * 6, y + Math.sin(an + 2.4) * 6], [x + Math.cos(an - 2.4) * 6, y + Math.sin(an - 2.4) * 6]];
  if (p > 0.3) R.poligono(pt.map(([a, b]) => [Math.round(a + Math.cos(Math.atan2(b - y, a - x)) * 1.5), Math.round(b + Math.sin(Math.atan2(b - y, a - x)) * 1.5)]), C.k);
  for (let i = 0; i <= n; i++) { const px = Math.round(lerp(x0, x, i / n)), py = Math.round(lerp(y0, y, i / n)); R.rect(px - 1, py - 1, px + 1, py + 1, col); R.pset(px + 1, py + 1, osc); }
  if (p > 0.3) R.poligono(pt.map(([a, b]) => [Math.round(a), Math.round(b)]), col); };
const sombrero = (x, y, g) => { const c = Math.cos(g), s = Math.sin(g), q = (u, v) => [Math.round(x + u * c - v * s), Math.round(y + u * s + v * c)];
  for (let u = -4; u <= 4; u++) { const [px, py] = q(u, 0); R.pset(px, py, hex('#7a5430')); R.pset(px, py + 1, C.k); } for (let u = -2; u <= 2; u++) for (let v = -3; v <= -1; v++) { const [px, py] = q(u, v); R.pset(px, py, v === -1 ? hex('#5a3a20') : hex('#a8743c')); } };
const p4 = (t) => {
  T.llanuras(R, t, { luz: 'tarde' });
  // el aire seco de las Rocosas cruza alto y el húmedo del golfo entra bajo, por la derecha
  flechaFina(14, 40, 150, 34, suave(lin(t, P4, P4 + 0.6)), hex('#d8a060'), hex('#7a4e24'));
  flechaFina(306, 112, 196, 106, suave(lin(t, P4 + 0.2, P4 + 0.8)), hex('#5ad080'), hex('#24804a'));
  // «the winds speed up and twist with height»: tres flechas, una encima de otra, que se alargan y giran según suben
  const vv = lin(t, vientos[0], vientos[1] + 0.3), tw = lin(t, tuerce, tuerce + 0.6);
  for (const [k, y, l0, g0, g1] of [[0, 92, 14, Math.PI, Math.PI * 0.97], [1, 74, 22, Math.PI * 1.08, Math.PI * 1.4], [2, 54, 32, Math.PI * 1.15, Math.PI * 1.95]]) {
    const e = lin(vv, k * 0.2, k * 0.2 + 0.5); if (e <= 0) continue; const g = lerp(g0, g1, suave(tw)), l = l0 * (0.6 + 0.4 * e), x0 = 168;
    flechaGorda(x0 - Math.cos(g) * l / 2, y - Math.sin(g) * l * 0.4, x0 + Math.cos(g) * l / 2, y + Math.sin(g) * l * 0.4, e, hex('#fff2b0'), hex('#c8a040')); }
  // y un anillo que gira alrededor de la base de la nube (la mesociclón): la mitad de atrás queda tapada por la nube
  if (tw > 0) for (let k = 0; k < 64; k++) { if (k / 64 > tw || k % 8 > 5) continue; const g = k / 64 * Math.PI * 2 - t * 3, x = Math.round(198 + Math.cos(g) * 48), y = Math.round(70 + Math.sin(g) * 9); if (Math.sin(g) < 0 && x > 156 && x < 240) continue; R.rect(x - 1, y - 1, x + 1, y + 1, C.k); R.pset(x, y, hex('#fff2b0')); R.pset(x + (Math.sin(g) > 0 ? 1 : -1), y, hex('#fff2b0')); }
  // el granjero: se sujeta el sombrero con la ráfaga, se le vuela y señala arriba cuando el viento se tuerce
  const sinSombrero = t > vuela;
  R.actor(EL.granjero, 104, 146, t, { dir: 1, dedo: entre(t, P4 + 0.4, vuela) || t > tuerce, sorpresa: entre(t, vuela, vuela + 0.6), sonrisa: false, tocado: sinSombrero ? false : undefined, habla: t > tuerce + 0.3 && parpadeo(t, 8) });
  if (sinSombrero) { const u = t - vuela; sombrero(Math.round(117 - u * 52 + Math.sin(u * 5) * 4), Math.round(120 - u * 30 + Math.sin(u * 7) * 3 + u * u * 4), u * 8); }
};
const efectos = [[0.35, 'masca'], [vuelve, 'masca'], [vuelve + 1.0, 'masca'],
  ...[0, 1, 2, 3, 4, 5].map((k) => [cuenta[0] + k * (cuenta[1] - cuenta[0]) / 6, 'aldea', { k }]), [otros[0], 'pop'], [otros[0] + 0.4, 'pop'], [medalla, 'brillo'],
  [llanos, 'whoosh'], [verde[0] + 0.2, 'burbujas', { dur: 1.0 }], [marron[0], 'rafaga'], [nubes + 0.3, 'pop'],
  [vuela, 'rafaga'], [tuerce, 'trueno']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos });
''')

# ── hu-ivan ─────────────────────────────────────────────────────────────────────────────────────────────────────
E['hu-ivan'] = ('Iván', r'''// HU-IVAN (frases 24–25), 2004, cartela «2004». Cuatro planos:
// 1. la costa del golfo, de día: llega la banda exterior del huracán (cielo oscuro, lluvia, palmeras que se doblan,
//    banderas rojas); una familia recoge la sombrilla y la nevera y se va por la pasarela («they're family»); el
//    socorrista pita y les hace señas; en «comes ashore» el mar sube y el viento arrecia; corta en «The front»;
// 2. el huracán desde arriba, sobre la costa: en «front» la flecha de su marcha (hacia el norte); en «right side» se
//    marca el cuadrante delantero derecho; en «spins off tornadoes» van saliendo tornaditos sobre tierra, en ese cuadrante;
//    la cámara se aleja un poco; corta en «Hurricane Ivan»;
// 3. el mapa del sureste: la trayectoria de Iván sale del golfo y toca tierra en Gulf Shores (Alabama) en «Ivan»; sube
//    hacia el noreste mientras caen las chinchetas de los tornados por Florida, Alabama, Georgia, las Carolinas,
//    Virginia, Maryland y Delaware hasta Pensilvania («to Pennsylvania»), con el contador que llega a «120»; en «from
//    Florida» laten las de Florida; en «a few days», los días 15–18 se encienden; la cámara sigue a la tormenta;
// 4. el día después, en la playa (el chiste: «A storm with the sequels included»): el mar en calma; en el horizonte se
//    aleja la tormenta y detrás la siguen en fila sus tornaditos, dando saltitos como patitos; el último sale tarde y
//    corre a alcanzarlos («sequels»); la familia ha vuelto: el niño les dice adiós con la mano.''', COMUN + TORNADITO + ESPIRAL + r'''
import { albersEEUU, mapaPapel } from '/atomo/plato/escenas/ov-mapas.js';
const a = (f) => en('ivan', f), b = (f) => en('secuelas', f);
const P2 = a(0.2698), P3 = a(0.600), P4 = a(0.982);
// ── 1 · la costa: llega la tormenta y la familia se va ──────────────────────────────────────────────────────────
const familia = a(0.015), orilla = a(0.214), recogen = [1.4, 2.6];
const nevera = (x, y) => { R.rect(x, y, x + 8, y + 5, C.k); R.rect(x + 1, y + 1, x + 7, y + 4, hex('#3a7ac8')); R.rect(x + 1, y + 1, x + 7, y + 2, C.blanco); R.pset(x + 4, y, C.k); };
const sombrilla = (x, y, abierta) => { if (abierta) { R.poligono([[x - 7, y + 3], [x, y - 2], [x + 7, y + 3]], C.k); R.poligono([[x - 6, y + 2], [x, y - 1], [x + 6, y + 2]], hex('#e84a3a')); R.rect(x - 2, y, x + 2, y + 2, C.blanco); R.linea(x, y + 3, x, y + 15, hex('#5a5e68')); }
  else { R.linea(x - 1, y + 10, x + 6, y - 2, C.k); R.linea(x, y + 10, x + 7, y - 2, hex('#e84a3a')); R.pset(x + 2, y + 5, C.blanco); } };
const p1 = (t) => {
  const o = { huracan: lerp(0.3, 1, suave(lin(t, 1.3, orilla + 0.3))) };
  T.costa(R, t, o);
  // el cartel de la gasolinera con un precio de 2004 (el decorado lleva el de 2026, «319»): tapo las cifras con el fondo
  // del propio cartel y pinto «185» con su mismo color, así sigue la luz de la tormenta
  { const osc = (c) => (c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255), fg = [R.pget(129, 54), R.pget(130, 54), R.pget(131, 54)].reduce((m, c) => (osc(c) < osc(m) ? c : m)), bg = R.pget(140, 56);
    R.rect(129, 54, 139, 58, bg); cifras('185', 129, 54, fg); }
  // la familia: recoge en la arena y se va hacia la pasarela de la torre (x 182), y sube por ella
  const u = lin(t, recogen[1], orilla - 0.3), sube = lin(t, orilla - 0.3, P2 + 0.3);
  const camino = (x0, d) => { const x = Math.round(u < 1 ? lerp(x0, 182 + d, suave(u)) : 182 + d), y = Math.round(134 - sube * 20); return [x, y]; };
  const [px, py] = camino(214, 6), [mx, my] = camino(226, -8), [nx, ny] = camino(238, -2);
  const andan = u > 0 && (u < 1 || sube < 1);
  // la sombrilla clavada en la arena, que la madre cierra y se lleva
  if (t < recogen[1]) { const ab = t < recogen[0] + 0.5; sombrilla(ab ? 256 : 250, 114 + (ab ? 0 : 6), ab); if (ab) R.pset(262 + Math.round(Math.sin(t * 14)), 117, hex('#e84a3a')); }
  R.actor(EL.chico, nx, ny + 2, t, { dir: -1, anda: andan, sorpresa: entre(t, 1.3, 1.9), habla: entre(t, 2.0, 2.6) && parpadeo(t, 9) });
  R.actor(EL.chica, t < recogen[1] ? Math.round(lerp(226, 234, lin(t, 1.3, recogen[0]))) : mx, my, t, { dir: t < recogen[1] ? 1 : -1, anda: andan || entre(t, 1.3, recogen[0]), dedo: entre(t, recogen[0], recogen[1]) });
  if (t >= recogen[1]) { const [sx, sy] = enMano(mx, my, -1); sombrilla(sx - 3, sy - 12, false); }
  R.actor(EL.sudadera, px, py, t, { dir: -1, anda: andan, dedo: entre(t, orilla - 0.4, orilla + 0.2) });
  { const [cx, cy] = t < recogen[0] + 0.6 ? [204, 131] : enMano(px, py, -1); nevera(cx - 4, cy - 2); }
  // el socorrista, junto al mástil de las banderas, pita y hace señas para que salgan del agua y de la playa
  R.actor(EL.clienta, 272, 132, t, { dir: -1, dedo: parpadeo(t, 4) && t > 1.8, habla: entre(t, 1.9, 2.4) || entre(t, 3.6, 4.1), pal: { C: hex('#e8402a'), c: hex('#b02a1a') } });
  T.i_costaDelante(R, t, o);
};
// ── 2 · el cuadrante delantero derecho ──────────────────────────────────────────────────────────────────────────
const frente = a(0.2745), derecho = a(0.2894), suelta = [a(0.3792), a(0.585)];
// los tornaditos del cuadrante: en una rejilla polar con algo de desorden (ángulo, radio, cuándo salen)
const TORS = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const k = i * 4 + j, jit = (s) => ((Math.sin(k * 12.9898 + s * 78.233) * 43758.5453) % 1 + 1) % 1;
  TORS.push([-Math.PI / 2 + 0.2 + (i + 0.2 + jit(1) * 0.6) / 4 * (Math.PI / 2 - 0.36), 36 + (j + 0.15 + jit(2) * 0.7) / 4 * 50, (jit(3) + j * 0.6) / 3.4]); }
const RQ = 88, OJO = [126, 118];
const p2 = (t) => {
  const o = { vista: 'arriba', suelo: 'texas', zoom: lerp(1.5, 1.25, suave(lin(t, P2, P3))), centro: OJO }; T.ojo(R, t, o); const g = T.b_ojoArribaGeo(o);
  // el cuadrante delantero derecho: un velo cálido tramado, con sus bordes discontinuos que se dibujan
  const qd = suave(lin(t, derecho, derecho + 0.45)); if (qd > 0) {
    for (let y = g.y - RQ; y <= g.y; y++) for (let x = g.x; x <= g.x + RQ; x++) { const d = Math.hypot(x - g.x, y - g.y); if (d < 12 || d > RQ * qd) continue; if ((x + y) % 2 === 0) velo(x, y, hex('#f8a040'), d > RQ * qd - 2 ? 0.7 : 0.38); }
    for (let k = 12; k < RQ * qd; k++) { if (Math.floor(k / 3) % 2) continue; for (const [px, py] of [[g.x, g.y - k], [g.x + k, g.y]]) { R.rect(px - 1, py - 1, px + 1, py + 1, C.k); R.pset(px, py, hex('#fff2b0')); } }
    for (let an = -Math.PI / 2; an <= 0; an += 0.01) { if (Math.floor(an * 40) % 2) continue; const x = Math.round(g.x + Math.cos(an) * RQ * qd), y = Math.round(g.y + Math.sin(an) * RQ * qd); R.rect(x - 1, y - 1, x + 1, y + 1, C.k); R.pset(x, y, hex('#fff2b0')); } }
  // la flecha de la marcha: hacia el norte, a tierra (encima del cuadrante)
  const fm = suave(lin(t, frente - 0.05, frente + 0.4)); if (fm > 0) { const l = Math.round(44 * fm), x = g.x - 10; for (let y = g.y - 14; y >= g.y - 14 - l; y--) { R.rect(x - 3, y, x + 3, y, C.k); R.rect(x - 2, y, x + 2, y, C.blanco); R.pset(x + 2, y, hex('#c8d0dc')); }
    if (fm >= 1) { const ty = g.y - 58; R.poligono([[x - 8, ty + 1], [x, ty - 10], [x + 8, ty + 1]], C.k); R.poligono([[x - 6, ty], [x, ty - 8], [x + 6, ty]], C.blanco); } }
  // y los tornaditos que van saliendo en él, cada uno con su chispa al nacer
  TORS.forEach(([an, rr, q], k) => { const t0 = suelta[0] + q * (suelta[1] - suelta[0]); if (t < t0) return; const x = Math.round(g.x + Math.cos(an) * rr), y = Math.round(g.y + Math.sin(an) * rr), e = lin(t, t0, t0 + 0.2);
    if (e < 1) for (let i = 0; i < 12; i++) { const gg = i / 12 * Math.PI * 2; R.pset(Math.round(x + Math.cos(gg) * (3 + e * 7)), Math.round(y - 4 + Math.sin(gg) * (3 + e * 7) * 0.7), hex('#fff2b0')); }
    tornadito(x, y + 3, t, k, { s: 0.7 + 0.4 * e, col: hex('#6a2a2a'), luz: hex('#e06a3a'), polvoC: hex('#f0e0b8') }); });
};
// ── 3 · el mapa de Iván ─────────────────────────────────────────────────────────────────────────────────────────
const tocaTierra = a(0.655), florida = a(0.8044), pensilvania = a(0.855), dias = [a(0.9287), a(0.9793)];
// la trayectoria de verdad (NHC, HURDAT2), en horas desde el 15 de septiembre a las 00 UTC; tocó tierra a las 06:50 UTC del 16
const IVAN = [[0, -87.0, 24.7], [6, -87.4, 25.6], [12, -87.9, 26.7], [18, -88.2, 27.9], [24, -88.2, 28.9], [30, -87.9, 30.0], [30.8, -87.9, 30.2], [36, -87.7, 31.4], [42, -87.4, 32.5], [48, -86.5, 33.8], [54, -85.7, 34.7], [60, -84.0, 35.4], [66, -82.3, 36.2], [72, -80.5, 37.0], [78, -78.5, 37.7], [84, -76.7, 38.4]];
const enHora = (h) => { for (let i = 1; i < IVAN.length; i++) if (h <= IVAN[i][0]) { const f = (h - IVAN[i - 1][0]) / (IVAN[i][0] - IVAN[i - 1][0]); return [lerp(IVAN[i - 1][1], IVAN[i][1], f), lerp(IVAN[i - 1][2], IVAN[i][2], f)]; } const z = IVAN[IVAN.length - 1]; return [z[1], z[2]]; };
// la hora de la tormenta en cada instante del plano: del golfo a tierra en «Ivan», y de ahí a Pensilvania en «Pennsylvania»
const hora = (t) => t < tocaTierra ? lerp(14, 30.8, lin(t, P3, tocaTierra)) : lerp(30.8, 84, lin(t, tocaTierra, pensilvania + 0.3));
// las chinchetas de los tornados (unas 40 por unos 120 tornados), con la hora de la tormenta en que caen
const CH = [[-85.6, 30.2, 29], [-84.9, 30.0, 31], [-84.3, 30.4, 33], [-86.4, 30.6, 30], [-83.6, 30.1, 35],
  [-86.8, 31.3, 34], [-86.1, 32.4, 38], [-85.5, 31.5, 37],
  [-84.6, 31.6, 39], [-83.9, 32.3, 42], [-83.2, 31.1, 40], [-84.2, 33.5, 46], [-83.5, 33.0, 44], [-82.7, 32.6, 45], [-84.9, 32.9, 43], [-83.0, 34.0, 50], [-82.3, 33.4, 49], [-81.8, 31.9, 47],
  [-81.6, 34.2, 52], [-80.9, 33.6, 54], [-82.1, 34.8, 55], [-80.4, 34.6, 57],
  [-80.6, 35.4, 60], [-79.8, 36.0, 62], [-81.2, 36.1, 61],
  [-79.4, 36.8, 66], [-78.6, 37.2, 68], [-77.9, 37.6, 70], [-78.2, 36.9, 67], [-77.4, 38.0, 72], [-79.0, 37.9, 69], [-76.8, 37.3, 71], [-77.8, 38.5, 73], [-78.9, 38.4, 70], [-77.1, 36.8, 69],
  [-76.9, 39.2, 75], [-76.3, 38.8, 76], [-75.6, 39.0, 77], [-77.0, 40.1, 79], [-76.4, 40.5, 81], [-77.6, 40.3, 82]];
const COLS_CH = [hex('#d83a3a'), hex('#e87a2a'), hex('#c8282a')];
const proy = (t) => { const u = suave(lin(t, P3, pensilvania + 0.5)); return albersEEUU([20, 14, 300, 170], { zoom: lerp(2.35, 1.75, u), centro: [lerp(-86.6, -82.3, u), lerp(30.9, 35.6, u)] }); };
const p3 = (t) => {
  const P = proy(t); mapaPapel(R, t, P, { eeuu: true, rosa: [44, 150], mesa: 6 });
  const h = hora(t);
  // la trayectoria recorrida, punteada en rojo, con un punto por cada día a las 00 UTC
  let prev = null; for (let hh = 0; hh <= h; hh += 0.5) { const [x, y] = P(enHora(hh)).map(Math.round); if (prev && (Math.round(hh * 2) % 3 !== 0)) { R.pset(x, y + 1, hex('#5a6a7e')); R.pset(x, y, hex('#c8282a')); } prev = [x, y]; }
  for (const dh of [0, 24, 48, 72]) if (dh <= h) { const [x, y] = P(enHora(dh)).map(Math.round); R.disco(x, y, 2, C.k); R.disco(x, y, 1, hex('#f8f4e8')); }
  // Gulf Shores: el punto donde toca tierra, con su chincheta azul
  { const [x, y] = P([-87.7, 30.25]).map(Math.round); if (t > tocaTierra) { T.chincheta(R, x - 2, y, t, hex('#2a5ac8'), { baja: lin(t, tocaTierra, tocaTierra + 0.3), pulso: t > tocaTierra + 0.3 && t < tocaTierra + 1.5 }); } }
  // las chinchetas de los tornados, que caen detrás de la tormenta
  let n = 0; CH.forEach(([lon, lat, hc], k) => { if (h < hc) return; n++; const [x, y] = P([lon, lat]).map(Math.round), late = lat < 31 && t > florida && t < florida + 0.9;
    T.chincheta(R, x, y, t, COLS_CH[k % 3], { baja: Math.min(1, (h - hc) / 3), pulso: late }); });
  // la tormenta: la espiral que se debilita al entrar en tierra
  const [lon, lat] = enHora(h), [sx, sy] = P([lon, lat]), dentro = lin(h, 30.8, 70);
  espiral(Math.round(sx), Math.round(sy), lerp(11, 7, dentro), t, { alfa: 1 - dentro * 0.4, brazos: lerp(1.7, 1.3, dentro), giro: 1.4 });
  // el contador de tornados
  if (t > tocaTierra + 0.1) { const c = Math.round(120 * n / CH.length), fin = n === CH.length; tornadito(36, 42, t, 2, { s: 1.4, polvo: false }); R.numero(String(c), 72, 42, { tam: 16, centro: true }); if (fin && parpadeo(t, 8) && t < pensilvania + 1.4) destello(92, 26, 2, hex('#fff2b0')); }
  // «in just a few days»: los cuatro días, del 15 al 18 de septiembre
  if (t > dias[0] - 0.1) for (let k = 0; k < 4; k++) { const x = 228 + k * 18, y = 146, on = t > dias[0] + k * 0.22; R.rect(x, y, x + 15, y + 12, C.k); R.rect(x + 1, y + 1, x + 14, y + 11, on ? hex('#fff6d0') : hex('#e8e0c8')); R.rect(x + 1, y + 1, x + 14, y + 3, on ? hex('#c8463a') : hex('#a89a80')); cifras(15 + k, x + 4, y + 5, on ? hex('#2a2a32') : hex('#8a8270')); }
};
// ── 4 · las secuelas ────────────────────────────────────────────────────────────────────────────────────────────
const tarde = b(0.381), incluidas = b(0.609);
// la tormenta que se va por el horizonte, lejos: la torre de cúmulos en coliflor (la luz del sol, a la derecha y arriba,
// enciende sus cimas; la sombra, abajo a la izquierda), el yunque que se abre por arriba, la base plana y oscura y las
// cortinas de lluvia hasta el mar; un relámpago de vez en cuando. No pinta sobre la punta de tierra de la izquierda.
const TBOLAS = [[-46, -10, 12], [-30, -20, 15], [-12, -28, 18], [8, -32, 19], [26, -24, 16], [42, -14, 12], [-24, -6, 13], [0, -10, 15], [22, -6, 13], [-4, -40, 13], [12, -44, 11]].map(([x, y, r]) => [x * 0.8, y * 0.8, r * 0.8]);
const TK = ['#3e4660', '#566080', '#76809e', '#9ea6c0', '#c8cede', '#f0e8dc'].map(hex);
const tormenta = (cx, t) => {
  const hor = 83, base = hor - 8, x0 = cx - 54, x1 = cx + 62, yA = hor - 8 - 46;
  // las cortinas de lluvia bajo la base, inclinadas por el viento y más claras hacia los bordes
  for (let y = base + 1; y <= hor; y++) for (let x = Math.max(92, cx - 34); x <= Math.min(214, cx + 40); x++) { const f = Math.abs(x - cx - 3) / 37, k = (x + Math.round((y - base) * 0.6) + Math.floor(t * 9)) % 4;
    if (k === 0 && umbral(x, y) > f * 0.9) velo(x, y, TK[0], 0.6 * (1 - f * 0.6)); else if (k === 2 && umbral(x, y) > 0.4 + f * 0.6) velo(x, y, TK[1], 0.35); }
  for (let y = yA - 2; y <= base; y++) for (let x = Math.max(0, x0); x <= Math.min(214, x1); x++) {
    if (x < 92 && y > 71) continue;
    let mejor = -1, nx = 0, ny = 0; for (const [bx, by, r] of TBOLAS) { const dx = x - (cx + bx), dy = y - (base + by), d = r * r - dx * dx - dy * dy; if (d > mejor) { mejor = d; nx = dx / r; ny = dy / r; } }
    // el yunque: una cuña que sale de la cima y se estira a favor del viento, con su luz arriba y su sombra debajo
    const yt = yA + 1 - Math.round((x - cx) * 0.06), grueso = x < cx + 8 ? 4 + Math.max(0, (x - cx + 14) / 22) * 5 : 9 - (x - cx - 8) / 9, ya = y - yt, yunque = x > cx - 16 && x < cx + 58 && ya >= 0 && ya < grueso && umbral(x, y) < 0.6 + (grueso - ya) * 0.2;
    if (yunque) R.pset(x, y, ya === 0 ? TK[5] : ya >= grueso - 1.5 ? TK[2] : ya < 2 ? TK[4] : (x * 3 + y) % 7 ? TK[3] : TK[4]);
    else if (mejor > 0) { const luz = 0.5 + nx * 0.35 - ny * 0.45 + Math.sin(x * 1.3 + y * 0.9) * 0.06, k = Math.max(0, Math.min(5, Math.floor(luz * 5.2 + (umbral(x, y) - 0.5) * 0.8)));
      R.pset(x, y, mejor < 10 ? (ny < 0 && nx > -0.2 ? TK[5] : TK[1]) : y > base - 3 ? TK[0] : TK[k]); }
  }
  for (let x = cx - 36; x < cx + 42; x++) if (x >= 92 && x <= 214) R.pset(x, base, TK[0]);
  // el símbolo del huracán en su panza (el círculo con sus dos colas), para que se sepa quién es la madre
  { const sx = cx + 2, sy = base - 17, g = t * 2.5; for (const s of [0, Math.PI]) for (let k = 0; k < 9; k++) { const a = g + s + k * 0.2, rr = 4 + k * 0.8, px = Math.round(sx + Math.cos(a) * rr), py = Math.round(sy + Math.sin(a) * rr); R.rect(px - 1, py - 1, px + 1, py + 1, TK[0]); }
    for (const s of [0, Math.PI]) for (let k = 0; k < 9; k++) { const a = g + s + k * 0.2, rr = 4 + k * 0.8, px = Math.round(sx + Math.cos(a) * rr), py = Math.round(sy + Math.sin(a) * rr); R.pset(px, py, C.blanco); if (k < 6) R.pset(px + 1, py, C.blanco); }
    R.disco(sx, sy, 4.5, TK[0]); R.disco(sx, sy, 3.5, C.blanco); R.disco(sx, sy, 1.5, TK[1]); }
  if (Math.sin(t * 2.3) > 0.96) { let x = cx - 6, y = base - 12; for (let k = 0; k < 16; k++) { R.pset(x, y, C.blanco); if (k % 2) R.pset(x + 1, y, hex('#d8e0ff')); x += k % 3 ? 1 : -1; y++; } }
};
// el patito: un tornadito con su nubecilla de gorro
const patito = (x, y, t, k, s) => { tornadito(x, y, t, k, { s: 1.3 * s, col: hex('#566080'), luz: hex('#aab2cc'), polvo: false });
  const top = y - Math.round(13 * s) - 2; for (const [dx, dy, r] of [[-3, 0, 3], [2, -1, 3.5], [5, 1, 2.5]]) R.disco(x + dx * s, top + dy * s + 1, r * s + 1, C.k); for (const [dx, dy, r] of [[-3, 0, 3], [2, -1, 3.5], [5, 1, 2.5]]) R.disco(x + dx * s, top + dy * s, r * s, TK[2]); R.disco(x + 2 * s, top - 2 * s, 1.5 * s, TK[4]);
  R.pset(x + 1, top + 1, C.k); R.pset(x + 4, top + 1, C.k); };
const p4 = (t) => {
  T.costa(R, t, { encuadre: 'playa', calma: 1 });
  const cx = Math.round(lerp(114, 78, lin(t, P4, E.duracion)));
  tormenta(cx, t);
  // los tornaditos, en fila detrás de su madre, dando saltitos; el último sale tarde y corre a alcanzarlos
  for (let k = 0; k < 4; k++) { const ultimo = k === 3; if (ultimo && t < tarde) continue; const dx = ultimo ? lerp(60, 0, suave(lin(t, tarde, incluidas + 0.3))) : 0, x = Math.round(cx + 66 + k * 15 + dx);
    const fase = t * (ultimo && t < incluidas + 0.3 ? 10 : 5.5) - k * 0.9, salto = Math.round(Math.abs(Math.sin(fase)) * 4), y = 83 - salto;
    if (x > 212) continue; patito(x, y, t, k, ultimo ? 0.75 : 1 - k * 0.07);
    if (Math.abs(Math.sin(fase)) < 0.25) for (const s of [-1, 1]) { R.pset(x + s * 3, 84, hex('#f4fbff')); R.pset(x + s * 4, 83, hex('#c8e4f4')); R.pset(x + s * 5, 84, hex('#c8e4f4')); } }
  // la familia ha vuelto: el niño les dice adiós, la madre se ríe y el padre señala el horizonte
  const adios = t > P4 + 0.6;
  R.actor(EL.sudadera, 196, 166, t, { dir: -1, dedo: entre(t, P4 + 0.3, P4 + 1.2), sonrisa: t > tarde });
  R.actor(EL.chica, 176, 164, t, { dir: -1, sonrisa: true, habla: entre(t, incluidas, incluidas + 0.6) && parpadeo(t, 9) });
  R.actor(EL.chico, 132, 166, t, { dir: -1, dedo: adios && parpadeo(t, 7), brazos: entre(t, incluidas + 0.2, incluidas + 0.9), salto: entre(t, incluidas + 0.2, incluidas + 0.5) ? 2 : 0, sonrisa: true });
};
const efectos = [[1.4, 'rafaga'], [1.95, 'silbato'], [recogen[0] + 0.4, 'papel'], [3.4, 'lluvia'], [orilla, 'ola'],
  [frente, 'whoosh'], ...TORS.filter((_, k) => k % 3 === 0).map(([, , q]) => [suelta[0] + q * (suelta[1] - suelta[0]), 'pop']),
  [P3 + 0.2, 'rafaga'], [tocaTierra, 'boom'], [tocaTierra + 0.5, 'pop'], [a(0.72), 'pop'], [a(0.76), 'pop'], [florida, 'brillo'], [a(0.83), 'pop'], [pensilvania + 0.1, 'pop'], [pensilvania + 0.5, 'brillo'],
  [dias[0], 'tic'], [dias[0] + 0.22, 'tic'], [dias[0] + 0.44, 'tic'], [dias[0] + 0.66, 'tic'],
  [P4 + 0.1, 'ola'], [b(0.1), 'boing'], [tarde, 'pop'], [incluidas, 'boing'], [incluidas + 0.4, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2004', efectos, año: 2004 });
''')
