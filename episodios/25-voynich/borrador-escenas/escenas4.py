import re

# Grupo S4 del ep25: vm-rodolfo, vm-mondragone y vm-kraus (frases 9–11).
# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): marca, inicio y _fin de la frase de cada escena
MARCAS = {'vm-rodolfo': ('rodolfo', 0.5, 26.258), 'vm-mondragone': ('voynich', 1.5, 18.544), 'vm-kraus': ('kraus', 0.5, 24.907)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    k, a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)


# lo que comparten los fondos locales y los insertos del grupo: la paleta, el ruido, las mezclas, los búferes fijos (con
# su capa transparente), el cielo tramado con nubes de tres tonos a tres velocidades y pájaros, la madera con vetas, el
# ladrillo, las monedas y el libro grande que hace la reverencia
COMUN = r'''
const PIEZAS_VM = T.PIEZAS_VM;
const Q = Object.fromEntries(Object.entries({
  k: '#1a1014', blanco: '#ffffff', luz: '#fff0c4',
  c0: '#4a7ad0', c1: '#5e8ed8', c2: '#78a4e2', c3: '#98bcec', c4: '#bcd4f2', c5: '#dce8f6',
  nube: '#ffffff', nubeS: '#dde6f2', nubeS2: '#b4c4da',
  hierba: '#5a9e44', hierbaL: '#86c058', hierbaS: '#3e7a34', hierbaD: '#285a28',
  seto: '#356e32', setoL: '#4e8c40', setoS: '#22501f', setoD: '#163a16',
  grava: '#dccaa0', gravaL: '#ede0bf', gravaS: '#bba77c', gravaD: '#957f58',
  piedra: '#d4c8b0', piedraL: '#eee6d4', piedraS: '#a89a80', piedraD: '#7a6e5a',
  cobre: '#58a88e', cobreL: '#8cceb2', cobreS: '#3a7a66', cobreD: '#26584a',
  teja: '#b8503a', tejaL: '#d8785a', tejaS: '#86362a',
  lejos: '#9aaccc', lejosL: '#b8c6dc', lejosS: '#7a8cae', lejosD: '#64769a',
  rojo: '#c43a34', rojoL: '#e8665a', rojoS: '#8a2424', rojoD: '#5a1618',
  amar: '#f0c840', amarL: '#fff09a', amarS: '#c89a20',
  rosa: '#e87ab0', rosaS: '#b84a80', blancoS: '#d8d4e0', lila: '#9a7ad8', lilaS: '#6a4aa8',
  oro: '#e8b830', oroL: '#ffe890', oroS: '#a87a18', oroD: '#6a4a10',
  bronce: '#a8743a', bronceL: '#d4a060', bronceS: '#6e4a24',
  nog: '#6a4228', nogL: '#8a5a36', nogS: '#4a2c18', nogD: '#2e1a0e',
  roble: '#9a6a3a', robleL: '#b8864e', robleS: '#744c28', robleD: '#4e3018',
  perg: '#ecdcb2', pergL: '#f7ecd2', pergS: '#d2bc90', pergD: '#a88c60', tinta: '#4a2e1c', tintaL: '#7a5034',
  terc: '#a82a36', tercL: '#cc4a52', tercS: '#741a24', tercD: '#4a1018',
  estuco: '#7e9a70', estucoL: '#9cb68a', estucoS: '#62805a', estucoD: '#4a6444',
  ladr: '#a85a42', ladrL: '#c47a5a', ladrS: '#844432', ladrD: '#5e2e22', junta: '#cbbca4',
  acera: '#b4b0a8', aceraL: '#cecac2', aceraS: '#8e8a84', asf: '#4a4a52', asfL: '#5e5e66', asfS: '#36363e',
  taxi: '#f2c218', taxiS: '#c4940c', vidrio: '#2a3a4a', vidrioL: '#4a6a82', vidrioS: '#18222e',
  verde: '#3e7a52', verdeL: '#5e9e6e', verdeS: '#285438', toldo: '#2e6a48', toldoL: '#f0ece0',
  noche: '#141a3a', noche2: '#1e2650', noche3: '#2a3466', ventL: '#ffd870', ventS: '#c89a40',
  papel: '#f2eedc', papelS: '#cfc8b0', damasco: '#7a2430', damascoL: '#94343e', damascoS: '#5a1822',
  piel: '#f2c49a', pielS: '#d4946a', gris: '#8a8a96', grisL: '#b8b8c4', grisS: '#5e5e6a', negro: '#2a2430',
  lampV: '#3e8a5a', lampVL: '#6ab884', lampVS: '#24583a', agua: '#8ac8e8', aguaL: '#d4f0ff', aguaS: '#4a8ab8',
}).map(([k, v]) => [k, hex(v)]));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tine = (x, y, k, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, k)); };
const ease = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const BUF = {};
// un fondo fijo, pintado una sola vez en su búfer y copiado en cada fotograma
const fijo = (k, f) => { if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; } R.copiar(BUF[k]); };
// una capa fija con huecos (lo que no se pinta queda transparente): se pinta una vez y se pone encima de lo que haya
const capa = (k, f) => {
  if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; }
  const dst = R.usar(null); R.usar(dst); const b = BUF[k];
  for (let i = 0; i < b.length; i++) { const c = b[i]; if (c) dst[i] = c; }
};
// una trayectoria por fotogramas clave [t, x, y] con entrada y salida suaves
const camino = (K, t) => { if (t <= K[0][0]) return [K[0][1], K[0][2]]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = ease((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); return [lerp(K[i - 1][1], K[i][1], u), lerp(K[i - 1][2], K[i][2], u)]; } const L = K[K.length - 1]; return [L[1], L[2]]; };
const parpadeo = (t, f = 8) => Math.sin(t * f) > 0;
// el cielo tramado de día: cinco bandas con su trama de transición (para el búfer)
const cieloFijo = (y1) => {
  const B = [Q.c0, Q.c1, Q.c2, Q.c3, Q.c4, Q.c5];
  for (let y = 0; y <= y1; y++) { const v = (y / y1) * (B.length - 1), i = Math.floor(v), f = v - i; for (let x = 0; x < 320; x++) { const d = ((x + y * 2) % 4) / 4 + (((x >> 1) + y) % 2) * 0.12; R.pset(x, y, B[Math.min(B.length - 1, f > d ? i + 1 : i)]); } }
};
// una nube de tres tonos (sombra de abajo, cuerpo y luz arriba)
const nube = (cx, cy, w) => {
  const bolas = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), Q.nubeS2);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), Q.nubeS);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.8), Q.nube);
  for (let x = Math.round(cx - w * 0.5); x <= cx + w * 0.5; x++) R.pset(x, Math.round(cy + w * 0.28), Q.nubeS2);
};
// las nubes en tres planos (lentas y pequeñas arriba, rápidas y grandes abajo) y una bandada; y0/y1: la franja del cielo
const nubes = (t, y0, y1, k = 0) => {
  for (const [v, w, n, yy] of [[1.2, 14, 3, 0.15], [2.6, 22, 3, 0.45], [4.4, 30, 2, 0.75]]) for (let i = 0; i < n; i++) {
    const x = ((i * 137 + k * 61 + t * v) % 420) - 50, y = Math.round(y0 + (y1 - y0) * (yy + hh(i, k, 3) * 0.12));
    nube(Math.round(x), y, Math.round(w * (0.85 + hh(i, k, 5) * 0.3)));
  }
  for (let i = 0; i < 4; i++) { const x = Math.round(((t * 14 + i * 9 + k * 40) % 380) - 30), y = Math.round(y0 + 6 + i % 2 * 4 + Math.sin(t * 2 + i) * 2), a = Math.sin(t * 10 + i * 2) > 0;
    R.pset(x, y, Q.k); R.pset(x - 1, y - (a ? 1 : 0), Q.k); R.pset(x + 1, y - (a ? 1 : 0), Q.k); R.pset(x - 2, y - (a ? 2 : 0), Q.k); R.pset(x + 2, y - (a ? 2 : 0), Q.k); }
};
// madera con vetas (tablas horizontales de alto h), con las juntas y nudos
const madera = (x0, y0, x1, y1, c, cL, cS, cD, h = 7, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const tb = Math.floor((y - y0) / h), j = (y - y0) % h, ve = Math.sin((x + tb * 37) * 0.09 + Math.sin(x * 0.03 + tb) * 2 + j * 0.9);
    let col = ve > 0.75 ? cS : ve < -0.85 ? cL : c;
    if (j === h - 1) col = cD; else if (j === 0) col = cL;
    if (((x + tb * 53) % 61) === 0 && j > 0 && j < h - 1) col = cD;
    if (hh(x, y, k) > 0.97) col = cS;
    R.pset(x, y, col);
  }
};
// ladrillo de tres tonos con sus juntas y algún ladrillo más oscuro
const ladrillo = (x0, y0, x1, y1, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = Math.floor((y - y0) / 5), j = (y - y0) % 5, o = (x - x0 + (f % 2) * 5) % 10, id = Math.floor((x - x0 + (f % 2) * 5) / 10);
    if (j === 4 || o === 9) { R.pset(x, y, hh(x, y, k) > 0.8 ? Q.piedraS : Q.junta); continue; }
    const v = hh(id, f, k + 9); let c = v < 0.18 ? Q.ladrS : v > 0.85 ? Q.ladrL : Q.ladr; if (v > 0.95) c = Q.ladrD;
    if (j === 0 && hh(x, y, k + 1) > 0.6) c = mez(c, Q.ladrL, 0.4);
    R.pset(x, y, c);
  }
};
// una moneda de oro de canto o de cara, con su brillo
const moneda = (x, y, t = 0, k = 0) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 3, Q.oroD); R.disco(x, y, 2.4, Q.oro); R.pset(x - 1, y - 1, Q.oroL); R.pset(x + 1, y + 1, Q.oroS); if (Math.sin(t * 6 + k) > 0.8) { R.pset(x - 2, y - 3, Q.blanco); R.pset(x - 3, y - 3, Q.oroL); } };
// el destello de cuatro puntas
const destello = (x, y, r, c = Q.blanco) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, Math.abs(i) > r / 2 ? Q.oroL : c); R.pset(x, y + i, Math.abs(i) > r / 2 ? Q.oroL : c); } };
// el libro cerrado visto de frente o desde arriba, como el de los decorados (pergamino claro, manchas, la tira de
// cuero): x0, y0 su esquina, w × hgt
const libroPlano = (x0, y0, w, hgt, k = 0) => {
  x0 = Math.round(x0); y0 = Math.round(y0);
  R.poligono([[x0, y0], [x0 + w, y0 - 1], [x0 + w + 1, y0 + hgt], [x0 + 1, y0 + hgt + 1]], Q.k);
  R.poligono([[x0 + 1, y0 + 1], [x0 + w - 1, y0], [x0 + w, y0 + hgt - 1], [x0 + 2, y0 + hgt]], Q.perg);
  for (let y = y0 + 2; y < y0 + hgt - 1; y++) for (let x = x0 + 2; x < x0 + w - 1; x++) { const n = hh(x - x0, y - y0, 688 + k); if (n < 0.08) R.pset(x, y, Q.pergS); else if (n > 0.96) R.pset(x, y, Q.pergL); }
  R.linea(x0 + 2, y0 + hgt - 1, x0 + w, y0 + hgt - 2, Q.pergD); R.linea(x0 + 1, y0 + 2, x0 + 1, y0 + hgt - 1, Q.pergL);
  R.linea(x0 + w, y0 + Math.round(hgt * 0.4), x0 + w + 7, y0 + Math.round(hgt * 0.5), Q.nogS); R.linea(x0 + w, y0 + Math.round(hgt * 0.62), x0 + w + 6, y0 + Math.round(hgt * 0.78), Q.nogS);
};
// un bocadillo grande con un icono a escala 2 (se lee a 640 px)
const globo = (x, y, icono, c = Q.rojo) => { x = Math.round(x); y = Math.round(y); R.rect(x - 8, y - 18, x + 8, y, Q.k); R.rect(x - 7, y - 17, x + 7, y - 1, Q.blanco); R.rect(x - 7, y - 2, x + 7, y - 1, Q.blancoS); R.poligono([[x - 3, y], [x + 1, y], [x - 4, y + 4]], Q.k); R.pset(x - 2, y, Q.blanco); R.pset(x - 1, y, Q.blanco); R.icono(icono, x - 4, y - 15, c, Q.blancoS, 2); };
// el libro de pergamino cerrado y grande, de pie: la tapa flexible con las manchas de los siglos, el canto de las hojas,
// las tiras de cuero; bow 0–1: se inclina hacia la derecha (la reverencia), anclado por abajo
const libroGrande = (cx, yb, w, hgt, bow = 0) => {
  const dx = Math.round(bow * hgt * 0.55), dy = Math.round(bow * hgt * 0.28);
  const P = (u, v) => [Math.round(cx - w / 2 + u * w + dx * (1 - v)), Math.round(yb - hgt * (1 - v) + dy * (1 - v))];
  const quad = (u0, u1, v0, v1, c) => R.poligono([P(u0, v0), P(u1, v0), P(u1, v1), P(u0, v1)], c);
  // el canto de las hojas a la derecha y abajo
  R.poligono([P(1, 0), [P(1, 0)[0] + 5, P(1, 0)[1] + 3], [P(1, 1)[0] + 5, P(1, 1)[1] - 2], P(1, 1)], Q.k);
  R.poligono([[P(1, 0)[0] + 1, P(1, 0)[1] + 2], [P(1, 0)[0] + 4, P(1, 0)[1] + 4], [P(1, 1)[0] + 4, P(1, 1)[1] - 3], [P(1, 1)[0] + 1, P(1, 1)[1] - 2]], Q.pergL);
  for (let v = 0.08; v < 0.95; v += 0.07) { const [a, b] = P(1, v); R.pset(a + 2, b + 1, Q.pergS); R.pset(a + 3, b + 1, Q.pergS); }
  quad(-0.02, 1.02, -0.02, 1.02, Q.k);
  quad(0, 1, 0, 1, Q.perg);
  quad(0, 0.12, 0, 1, Q.pergS); quad(0.12, 0.15, 0, 1, Q.pergD);
  quad(0.88, 1, 0, 0.06, Q.pergL);
  for (let i = 0; i < 260; i++) { const u = 0.15 + hh(i, 1, 41) * 0.83, v = hh(i, 2, 41) * 0.98, [a, b] = P(u, v); R.pset(a, b, hh(i, 3, 41) > 0.5 ? Q.pergS : Q.pergL); }
  for (let v = 0; v <= 1; v += 0.02) { const [a, b] = P(0.99, v); R.pset(a, b, Q.pergD); const [c, d] = P(0.16, v); R.pset(c, d, Q.pergD); }
  for (let u = 0.15; u <= 1; u += 0.02) { const [a, b] = P(u, 0.99); R.pset(a, b, Q.pergD); const [c, d] = P(u, 0.01); R.pset(c, d, Q.pergL); }
  for (const [u, v, r] of [[0.6, 0.25, 3], [0.35, 0.7, 4], [0.78, 0.8, 2], [0.5, 0.48, 2]]) { const [a, b] = P(u, v); R.disco(a, b, r, Q.pergS); R.pset(a - 1, b - 1, Q.pergM ?? Q.pergS); }
  // las dos tiras de cuero que cierran la tapa
  for (const v of [0.3, 0.7]) { const [a, b] = P(0.82, v), [c, d] = P(1.04, v); R.linea(a, b, c, d, Q.nogS); R.linea(a, b + 1, c, d + 1, Q.nog); R.disco(a, b, 1, Q.bronce); }
  // la cartela de pergamino en la tapa
  { const [a, b] = P(0.3, 0.12), [c, d] = P(0.72, 0.3); R.poligono([[a, b], [c, b + (d - b) * 0], [c, d], [a, d]], Q.pergL); R.linea(a, d, c, d, Q.pergD); }
  return P;
};
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-rodolfo'] = ('El emperador', '''// VM-RODOLFO (frase 9): Rodolfo II y la firma borrada de Tepenec. Cinco planos:
// 1. el gabinete de rarezas (Praga, 1610): el emperador entra, abre los brazos con «everything» y señala lo que
//    colecciona según la voz: el reloj del armario («clocks»), su alquimista, cuyo matraz echa humo verde
//    («alchemists»), su astrónomo, que alza el anteojo y una estrella destella («astronomers»), y el cocodrilo colgado
//    («curiosities»), que le arranca un salto de alegría;
// 2. inserto, la primera página con la lámpara de luz negra: se enciende con «ultraviolet» (la barra pasa a hoy) y con
//    «faded name» aparece la firma borrada; una mano de bata blanca la señala y la recorre;
// 3. fondo local, los jardines reales del castillo (cielo con nubes y pájaros, la catedral al fondo, el palacete del
//    Belvedere con su tejado de cobre, la fuente que canta, parterres de setos y tulipanes): Tepenec entra con su
//    regadera y, con «royal gardens», riega los tulipanes, que crecen y se abren; el pavo real abre la cola; un jardinero
//    rastrilla al fondo;
// 4. inserto local, gag 3: la mesa de terciopelo del emperador; su mano deja la bolsa de monedas, se le escapan dos
//    monedas y el libro le hace dos reverencias; con «nobody there could read it» se abre de golpe y saltan tres «?»;
// 5. el estudio de Kircher en Roma (1665): con «great expert on symbols» señala, orgulloso, los jeroglíficos de la
//    pared; con «didn't manage it» vuelve al libro con la lupa, se entristece y le sale un «?»; un hermano pasa con la
//    vela.''', COMUN + marcas('vm-rodolfo', r'''
const P2 = @6.32@, P3 = @12.10@, P4 = @16.72@, P5 = @22.84@;
// 1 · el gabinete: el emperador presenta su colección
const p1 = (t) => {
  T.pragua(R, t, { encuadre: 'gabinete' });
  const CLOCK = @2.80@, ALQ = @3.48@, AST = @4.20@, CUR = @5.04@;
  // el reloj del armario: un halo dorado que late cuando lo señala
  if (t > CLOCK - 0.1 && t < CLOCK + 0.9) { const u = (t - CLOCK) * 6; for (let a = 0; a < 6.28; a += 0.5) tine(252 + Math.cos(a + u) * 9, 38 + Math.sin(a + u) * 9, 0.6, Q.oroL); destello(252 + Math.cos(u) * 10, 38 + Math.sin(u) * 10, 2); }
  // el alquimista (Tepenec, su químico) con el matraz: humo verde con «alchemists»
  const humo = tramo(t, ALQ - 0.05, ALQ + 1.2);
  const a = R.actor(EL.tepenec, 74, 150, t, { dir: 1, sostiene: [94, 126 - (humo > 0 && humo < 0.4 ? 3 : 0)], sorpresa: humo > 0.02 && humo < 0.45, sonrisa: humo >= 0.45 });
  { const [mx, my] = a.mano; R.disco(mx, my - 4, 3.5, Q.k); R.disco(mx, my - 4, 2.6, Q.hierbaL); R.pset(mx - 1, my - 5, Q.blanco); R.rect(mx - 1, my - 11, mx + 1, my - 7, Q.k); R.rect(mx, my - 11, mx, my - 7, Q.aguaL); R.pset(mx, my - 2, Q.hierbaS); }
  if (humo > 0 && humo < 1) for (let i = 0; i < 7; i++) { const v = (humo * 1.4 + i / 7) % 1, x = a.mano[0] + Math.sin(v * 7 + i) * 4 + v * 6, y = a.mano[1] - 12 - v * 30, r = 1.5 + v * 3.5; R.disco(Math.round(x), Math.round(y), Math.round(r), v > 0.7 ? Q.hierbaS : Q.hierbaL); R.pset(Math.round(x - 1), Math.round(y - 1), Q.blanco); }
  // el astrónomo con su anteojo de latón: lo alza al cielo de la ventana con «astronomers»
  const alza = ease(tramo(t, AST - 0.1, AST + 0.5));
  const b = R.actor(EL.cortesano, 186, 150, t, { dir: -1, sostiene: [180, Math.round(lerp(132, 122, alza))], sonrisa: alza > 0.8 });
  { const [mx, my] = b.mano, ex = Math.round(mx - 6 - alza * 6), ey = Math.round(my - 2 - alza * 10); R.linea(mx + 3, my + 2, ex, ey, Q.k); R.linea(mx + 3, my + 1, ex, ey - 1, Q.bronce); R.linea(mx + 2, my + 1, ex + 1, ey, Q.bronceL); R.disco(ex, ey, 2, Q.k); R.pset(ex, ey, Q.aguaL);
    if (t > AST + 0.4 && t < AST + 1.3) destello(ex - 10, ey - 10, 2 + Math.round(Math.sin((t - AST) * 9)), Q.blanco); }
  // el emperador: entra, abre los brazos y señala cada cosa
  const w = tramo(t, 0.15, 1.75), x = Math.round(lerp(14, 116, ease(w)));
  const dir = t > ALQ - 0.1 && t < AST - 0.1 ? -1 : 1;
  const salto = t > CUR + 0.15 && t < CUR + 0.55 ? Math.round(Math.sin((t - CUR - 0.15) / 0.4 * Math.PI) * 4) : 0;
  R.actor(EL.rodolfo, x, 150, t, { dir, anda: w > 0 && w < 1, brazos: t > @1.94@ - 0.1 && t < @2.62@, dedo: (t > CLOCK - 0.1 && t < CLOCK + 0.55) || (t > ALQ && t < ALQ + 0.6) || (t > AST && t < AST + 0.6), habla: w >= 1 && t < CUR && parpadeo(t, 7), sonrisa: t > CUR, salto });
  if (t > CUR + 0.1 && t < CUR + 1.1) R.bocadillo(x + 9, 116, { icono: '!' });
  // el cocodrilo: un brillo en su ojo cuando lo mira
  if (t > CUR && t < CUR + 0.9 && parpadeo(t, 14)) destello(178, 36, 2);
  T.praguaDelante(R, t, { encuadre: 'gabinete' });
};
// 2 · la luz negra: la firma borrada de Tepenec
const UV = @7.86@, NOMBRE = @10.24@;
const p2 = (t) => {
  const uv = ease(tramo(t, UV - 0.1, UV + 0.5)) * (0.55 + 0.45 * ease(tramo(t, NOMBRE - 0.2, NOMBRE + 0.4)));
  T.pragua(R, t, { encuadre: 'gabinete', camara: 'ultravioleta', uv });
  // el halo de la firma cuando la voz la nombra
  const f = tramo(t, NOMBRE - 0.1, NOMBRE + 0.6);
  if (f > 0) for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28 + t * 1.5, r = 30 + Math.sin(t * 4 + i) * 3; tine(224 + Math.cos(a) * r, 146 + Math.sin(a) * r * 0.35, 0.5 * f, Q.lila); }
  if (f > 0 && f < 1) destello(196 + f * 56, 140, 3);
  // la mano de bata blanca entra por abajo, señala la firma y la recorre
  const [hx, hy] = camino([[NOMBRE + 0.1, 330, 200], [NOMBRE + 0.6, 268, 162], [NOMBRE + 1.1, 266, 160], [NOMBRE + 1.8, 214, 162], [@12.0@, 210, 163]], t);
  if (t > NOMBRE + 0.1) T.brazo(R, 340, 214, Math.round(hx), Math.round(hy), '#ecebf2', -1, { codo: [Math.round((340 + hx) / 2 + 10), Math.round((214 + hy) / 2 + 6)] });
};
// 3 · los jardines reales: Tepenec riega los tulipanes
const RIEGA = @14.92@, JARDIN = @15.34@;
const p3 = (t) => {
  fijo('cieloJ', () => cieloFijo(96));
  nubes(t, 18, 62, 1);
  capa('jardin', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // a lo lejos, a la izquierda, la catedral de San Vito y el palacio: siluetas azuladas con ventanas
    poligono([[0, 96], [0, 74], [30, 74], [30, 68], [96, 68], [96, 96]], Q.lejos);
    for (let x = 4; x < 94; x += 6) for (const y of [76, 84]) { rect(x, y, x + 2, y + 3, Q.lejosD); pset(x, y, Q.lejosS); }
    rect(0, 72, 96, 72, Q.lejosL); poligono([[0, 74], [30, 74], [30, 68], [0, 68]], Q.lejosS);
    // la catedral: nave alta con arbotantes y dos agujas, y la torre grande con su cúpula verde
    poligono([[34, 68], [34, 46], [86, 46], [86, 68]], Q.lejosS);
    for (let x = 36; x < 86; x += 8) { poligono([[x, 46], [x + 4, 40], [x + 8, 46]], Q.lejosD); rect(x + 2, 50, x + 4, 62, Q.lejosD); pset(x + 3, 50, Q.lejosL); }
    for (const sx of [40, 80]) { rect(sx - 4, 30, sx + 4, 46, Q.lejosS); poligono([[sx - 4, 30], [sx, 18], [sx + 4, 30]], Q.lejosD); rect(sx - 1, 34, sx + 1, 40, Q.lejosD); linea(sx, 18, sx, 15, Q.lejosD); }
    rect(52, 34, 66, 46, Q.lejos); rect(52, 34, 53, 46, Q.lejosL); disco(59, 32, 6, Q.cobreS); disco(59, 31, 5, Q.cobre); pset(57, 29, Q.cobreL); linea(59, 25, 59, 21, Q.lejosD);
    // tejados rojos de la ciudad del castillo a la derecha de la catedral
    for (let i = 0; i < 6; i++) { const x = 88 + i * 14, y = 82 - (i % 3) * 3; poligono([[x, y], [x + 7, y - 6], [x + 14, y], [x + 14, y + 14], [x, y + 14]], i % 2 ? Q.tejaS : Q.teja); rect(x + 4, y + 3, x + 6, y + 6, Q.lejosD); }
    // el palacete del Belvedere: arcada de columnas, la planta noble y el tejado de cobre como un casco de barco del revés
    const bx0 = 176, bx1 = 304;
    poligono([[bx0 - 6, 70], [bx0 + 6, 54], [bx1 - 6, 54], [bx1 + 6, 70]], Q.cobreS);
    for (let x = bx0 - 4; x <= bx1 + 4; x++) { const u = (x - bx0 + 4) / (bx1 - bx0 + 8), yt = Math.round(70 - Math.sin(u * Math.PI) * 18); for (let y = yt; y < 70; y++) pset(x, y, y - yt < 2 ? Q.cobreL : ((x + y) % 7 === 0 ? Q.cobreS : (x % 9 === 0 ? Q.cobreD : Q.cobre))); pset(x, yt - 1, Q.k); }
    rect(bx0 - 6, 70, bx1 + 6, 72, Q.piedraS); rect(bx0 - 6, 70, bx1 + 6, 70, Q.piedraL);
    rect(bx0, 72, bx1, 88, Q.piedra); for (let x = bx0 + 4; x < bx1 - 4; x += 12) { rect(x, 75, x + 5, 85, Q.vidrioS); rect(x + 1, 76, x + 4, 84, Q.vidrioL); rect(x + 1, 80, x + 4, 80, Q.vidrioS); pset(x + 1, 76, Q.aguaL); rect(x - 1, 74, x + 6, 74, Q.piedraL); }
    rect(bx0 - 2, 88, bx1 + 2, 90, Q.piedraS); rect(bx0 - 2, 88, bx1 + 2, 88, Q.piedraL);
    rect(bx0, 90, bx1, 112, Q.piedraD);
    for (let x = bx0; x < bx1; x += 12) { rect(x, 90, x + 2, 112, Q.piedra); rect(x, 90, x, 112, Q.piedraL); for (let y = 92; y < 100; y++) { const ax = Math.round(Math.sqrt(Math.max(0, 36 - (y - 98) ** 2))); if (y < 98) { rect(x + 3, y, x + 6 - ax + 3, y, Q.piedra); rect(x + 6 + ax, y, x + 11, y, Q.piedra); } } }
    rect(bx1, 90, bx1 + 2, 112, Q.piedra); rect(bx0 - 2, 108, bx1 + 2, 112, Q.piedraS);
    // el seto alto del fondo con árboles redondos y cipreses
    for (let x = 0; x < 320; x++) { const yt = 98 + Math.round(Math.sin(x * 0.4) * 1); for (let y = yt; y < 114; y++) pset(x, y, y === yt ? Q.setoL : hh(x, y, 4) > 0.7 ? Q.setoS : Q.seto); }
    for (const [x, r] of [[14, 14], [104, 12], [150, 10], [316, 13]]) { disco(x, 92, r, Q.setoD); disco(x - 1, 90, r - 1, Q.setoS); disco(x - 3, 87, r - 4, Q.seto); for (let i = 0; i < 18; i++) pset(x - r + Math.round(hh(i, x, 2) * 2 * r), 82 + Math.round(hh(i, x, 3) * 18), Q.setoL); }
    for (const x of [126, 166]) { poligono([[x - 4, 112], [x, 64], [x + 4, 112]], Q.setoD); linea(x - 1, 70, x - 2, 110, Q.seto); }
    // el suelo: la grava rastrillada y los parterres de boj con sus flores
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 7); pset(x, y, n > 0.9 ? Q.gravaS : n < 0.07 ? Q.gravaL : ((y - x * 0.1) % 5 < 1 ? Q.gravaS : Q.grava)); }
    const parterre = (x0, y0, x1, y1, k) => {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const b = y - y0 < 3 || y1 - y < 3 || x - x0 < 3 || x1 - x < 3; pset(x, y, b ? (y - y0 < 1 ? Q.setoL : hh(x, y, k) > 0.6 ? Q.setoS : Q.seto) : (hh(x, y, k) > 0.5 ? Q.hierbaS : Q.hierba)); }
      for (let y = y0 + 5; y < y1 - 3; y += 4) for (let x = x0 + 5; x < x1 - 3; x += 4) { const c = [Q.rojo, Q.amar, Q.rosa, Q.blanco][Math.floor(hh(x, y, k + 1) * 4)]; pset(x, y, c); pset(x, y + 1, Q.hierbaS); }
    };
    parterre(4, 118, 92, 134, 11); parterre(212, 118, 316, 134, 12); parterre(-10, 150, 56, 176, 13);
    // la fuente que canta: dos tazas de bronce sobre su pilón
    disco(128, 134, 18, Q.piedraS); for (let x = 110; x <= 146; x++) for (let y = 128; y <= 140; y++) if (((x - 128) / 18) ** 2 + ((y - 134) / 6) ** 2 < 1) pset(x, y, y < 131 ? Q.piedraL : Q.piedra);
    for (let x = 114; x <= 142; x++) for (let y = 130; y <= 136; y++) if (((x - 128) / 14) ** 2 + ((y - 133) / 3.5) ** 2 < 1) pset(x, y, Q.aguaS);
    rect(126, 104, 130, 132, Q.bronceS); rect(127, 104, 128, 132, Q.bronce);
    for (const [y, r] of [[118, 11], [106, 6]]) { for (let x = 128 - r; x <= 128 + r; x++) { pset(x, y, Q.bronceL); pset(x, y + 1, Q.bronce); pset(x, y + 2, Q.bronceS); } pset(128 - r - 1, y - 1, Q.bronce); pset(128 + r + 1, y - 1, Q.bronce); }
    // la carretilla de madera con un saco y la maceta grande del primer término (delante, se pintan luego)
  });
  // la vida: el agua de la fuente, el jardinero del fondo que rastrilla y el pavo real
  for (let i = 0; i < 14; i++) { const v = (t * 1.6 + i / 14) % 1, s = i % 2 ? 1 : -1, r = i % 4 < 2 ? 11 : 6, y0 = r === 11 ? 118 : 106; R.pset(Math.round(128 + s * (r + v * 4)), Math.round(y0 + v * v * (r === 11 ? 14 : 12)), v < 0.5 ? Q.aguaL : Q.agua); }
  { const v = (t * 2) % 1; R.pset(128, 101 - Math.round(Math.sin(v * Math.PI) * 3), Q.aguaL); for (let k = 0; k < 4; k++) if (Math.sin(t * 5 + k) > 0.6) R.pset(118 + k * 6, 133, Q.aguaL); }
  // los naranjos en sus tinas de madera (el emperador tenía su invernadero) y la carretilla con un saco
  for (const tx of [196, 300]) { R.rect(tx - 8, 132, tx + 8, 146, Q.k); R.rect(tx - 7, 133, tx + 7, 145, Q.roble); for (let x = tx - 6; x < tx + 7; x += 3) R.linea(x, 133, x, 145, Q.robleS); R.rect(tx - 7, 136, tx + 7, 136, Q.k); R.rect(tx - 7, 142, tx + 7, 142, Q.k); R.rect(tx - 1, 118, tx + 1, 132, Q.nogS);
    R.disco(tx, 112, 11, Q.setoD); R.disco(tx - 1, 110, 10, Q.setoS); R.disco(tx - 3, 108, 7, Q.seto); for (let i = 0; i < 7; i++) { const ox = tx - 7 + Math.round(hh(i, tx, 5) * 14), oy = 104 + Math.round(hh(i, tx, 6) * 14); R.disco(ox, oy, 1.5, Q.amarS); R.pset(ox - 1, oy - 1, Q.amar); } }
  { const cx = 96, cy = 160; R.linea(cx - 18, cy - 14, cx - 2, cy - 4, Q.nogS); R.linea(cx - 18, cy - 13, cx - 2, cy - 3, Q.nog); R.poligono([[cx - 2, cy - 12], [cx + 20, cy - 12], [cx + 16, cy - 2], [cx + 2, cy - 2]], Q.k); R.poligono([[cx - 1, cy - 11], [cx + 19, cy - 11], [cx + 15, cy - 3], [cx + 3, cy - 3]], Q.roble); R.linea(cx, cy - 11, cx + 18, cy - 11, Q.robleL);
    R.disco(cx + 9, cy - 14, 6, Q.k); R.disco(cx + 9, cy - 14, 5, Q.gravaS); R.pset(cx + 7, cy - 17, Q.grava); R.disco(cx + 18, cy - 1, 4, Q.k); R.disco(cx + 18, cy - 1, 2, Q.nog); R.linea(cx + 4, cy - 2, cx + 3, cy + 2, Q.nogS); }
  // el jardinero del fondo rastrilla la grava
  { const rx = 254 + Math.round(Math.sin(t * 0.6) * 8), r = Math.sin(t * 5), g = R.actor(EL.cortesano, rx, 148, t, { dir: -1, sostiene: [rx - 4 + Math.round(r * 2), 140] });
    const [mx, my] = g.mano, px = mx - 12 + Math.round(r * 3); R.linea(mx, my - 3, px, 147, Q.nog); R.linea(mx + 1, my - 3, px + 1, 147, Q.nogL); R.linea(px - 4, 148, px + 4, 148, Q.k); for (let i = -4; i <= 4; i += 2) R.pset(px + i, 149, Q.k); }
  // el pavo real por el camino: abre la cola con «royal gardens»
  { const pv = tramo(t, P3, JARDIN), px = Math.round(lerp(28, 70, pv)), py = 146, cola = ease(tramo(t, JARDIN, JARDIN + 0.6));
    const anda = pv < 1, pata = anda && Math.sin(t * 12) > 0;
    if (cola > 0) for (let a = -1.5; a <= 1.5; a += 0.12) for (let r = 4; r < 4 + cola * 18; r++) { const x = Math.round(px - 2 + Math.sin(a) * r), y = Math.round(py - 10 - Math.cos(a) * r * 0.9); R.pset(x, y, r > 3 + cola * 16 ? Q.cobreL : (r % 5 === 0 ? Q.amar : (r % 5 === 1 ? Q.aguaS : Q.cobre))); }
    if (cola > 0.5) for (let a = -1.4; a <= 1.4; a += 0.35) { const r = 3 + cola * 15; R.disco(Math.round(px - 2 + Math.sin(a) * r), Math.round(py - 10 - Math.cos(a) * r * 0.9), 1, Q.aguaS); }
    R.linea(px - 2, py - 2, px - 3, py, Q.k); R.linea(px + 2, py - 2, px + (pata ? 3 : 1), py, Q.k);
    R.disco(px, py - 6, 4, Q.k); R.disco(px, py - 6, 3, Q.aguaS); R.pset(px - 1, py - 8, Q.agua);
    if (cola <= 0) for (let i = 0; i < 12; i++) R.pset(px - 4 - i, py - 6 + Math.round(i * 0.25), i % 3 ? Q.cobre : Q.cobreL);
    R.linea(px + 2, py - 9, px + 4, py - 16, Q.aguaS); R.disco(px + 4, py - 17, 1.5, Q.aguaS); R.pset(px + 6, py - 17, Q.amarS); R.pset(px + 4, py - 18, Q.blanco); R.pset(px + 3, py - 20, Q.aguaS); R.pset(px + 5, py - 20, Q.aguaS); }
  // los tulipanes del parterre del primer término, que crecen y se abren con el agua
  const crece = ease(tramo(t, RIEGA + 0.2, RIEGA + 1.4));
  // Tepenec entra con la regadera y riega
  const w = tramo(t, P3 + 0.1, P3 + 1.6), x = Math.round(lerp(330, 210, ease(w))), inclina = ease(tramo(t, RIEGA - 0.2, RIEGA + 0.2)) * (1 - ease(tramo(t, @16.3@, @16.6@)));
  const tp = R.actor(EL.tepenec, x, 160, t, { dir: -1, anda: w > 0 && w < 1, sostiene: [x - 8, 146 + Math.round(inclina * 3)], habla: t > @14.2@ && t < @14.9@ && parpadeo(t, 8), sonrisa: crece > 0.6 });
  { const [mx, my] = tp.mano, a = inclina * 0.6;
    // la regadera de cobre: cuerpo, asa y el pitorro con su alcachofa
    R.rect(mx - 10, my - 2, mx - 1, my + 6, Q.k); R.rect(mx - 9, my - 1, mx - 2, my + 5, Q.bronce); R.rect(mx - 9, my - 1, mx - 8, my + 5, Q.bronceL); R.rect(mx - 9, my + 3, mx - 2, my + 3, Q.bronceS);
    R.linea(mx - 7, my - 4, mx - 2, my - 4, Q.k); R.pset(mx - 8, my - 3, Q.k);
    const sx = Math.round(mx - 10 - 9), sy = Math.round(my - 3 + a * 9); R.linea(mx - 10, my + 3, sx, sy, Q.k); R.linea(mx - 10, my + 2, sx + 1, sy - 1, Q.bronceL); R.disco(sx, sy, 1.6, Q.bronceS);
    if (inclina > 0.6) for (let i = 0; i < 10; i++) { const v = (t * 2.5 + i / 10) % 1; R.pset(sx - 2 + (i % 5) - Math.round(v * 3), Math.round(sy + 2 + v * 14), v < 0.5 ? Q.aguaL : Q.agua); } }
  // el parterre de delante con los tulipanes (por delante de Tepenec)
  for (let y = 162; y < 180; y++) for (let x = 140; x < 320; x++) R.pset(x, y, y < 164 ? Q.setoL : hh(x, y, 21) > 0.55 ? Q.hierbaS : Q.hierba);
  for (let x = 140; x < 320; x++) { R.pset(x, 164 + (x % 7 === 0 ? 1 : 0), Q.setoS); }
  for (let i = 0; i < 16; i++) {
    const tx = 146 + i * 11, cerca = Math.abs(tx - (tp.mano[0] - 22)) < 36, g = cerca ? crece : 0.55 + 0.45 * crece, hgt = Math.round(3 + g * 10), sway = Math.round(Math.sin(t * 2 + i) * 0.6);
    const by = 172 - hgt, c = [Q.rojo, Q.amar, Q.rojo, Q.rosa][i % 4], cS = [Q.rojoS, Q.amarS, Q.rojoS, Q.rosaS][i % 4];
    R.linea(tx, 174, tx + sway, by, Q.hierbaS); R.pset(tx - 1, 170, Q.hierbaL); R.pset(tx - 2, 169, Q.hierbaL); R.pset(tx + 1, 171, Q.hierba); R.pset(tx + 2, 170, Q.hierba);
    const ab = g > 0.85 ? 1 : 0; R.rect(tx + sway - 2 - ab, by - 5, tx + sway + 2 + ab, by, Q.k); R.rect(tx + sway - 1 - ab, by - 4, tx + sway + 1 + ab, by, c); R.pset(tx + sway, by - 4, cS); R.pset(tx + sway - 1 - ab, by - 4, mez(c, Q.blanco, 0.4));
    if (ab) { R.pset(tx + sway - 2, by - 5, c); R.pset(tx + sway + 2, by - 5, c); }
  }
  // la maceta grande con un agave y la carretilla del primer término, a la izquierda
  { const mx = 26; R.poligono([[mx - 14, 152], [mx + 14, 152], [mx + 10, 178], [mx - 10, 178]], Q.k); R.poligono([[mx - 13, 153], [mx + 13, 153], [mx + 9, 177], [mx - 9, 177]], Q.teja); R.rect(mx - 15, 150, mx + 15, 155, Q.tejaS); R.rect(mx - 15, 150, mx + 15, 151, Q.tejaL); R.linea(mx - 6, 160, mx - 4, 176, Q.tejaL);
    for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33 + Math.sin(t * 1.3 + k) * 0.03, L = 16 + (k % 3) * 6; for (let r = 0; r < L; r++) { const x = Math.round(mx + Math.cos(a) * r), y = Math.round(150 + Math.sin(a) * r * 0.9); R.pset(x, y, r > L - 3 ? Q.hierbaD : (r % 4 ? Q.hierbaL : Q.hierba)); R.pset(x + 1, y, Q.hierbaS); } } }
  // una mariposa que revolotea sobre los tulipanes
  { const bx = 220 + Math.sin(t * 0.9) * 50, by = 150 + Math.sin(t * 2.1) * 8, a = parpadeo(t, 18); R.pset(Math.round(bx), Math.round(by), Q.k); R.rect(Math.round(bx) - 2, Math.round(by) - (a ? 2 : 1), Math.round(bx) - 1, Math.round(by), Q.amar); R.rect(Math.round(bx) + 1, Math.round(by) - (a ? 2 : 1), Math.round(bx) + 2, Math.round(by), Q.amar); }
};
// 4 · gag 3: la bolsa del emperador y la reverencia del libro
const DEJA = @17.05@, NADIE = @20.67@;
const p4 = (t) => {
  fijo('mesaRod', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // la pared de estuco verde con rosetas en rombo y el friso de roleos
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 2); pset(x, y, n > 0.92 ? Q.estucoS : n < 0.05 ? Q.estucoL : (y > 100 ? Q.estucoS : Q.estuco)); }
    for (let y = 26; y < 100; y += 18) for (let x = ((y / 18) % 2) * 18; x < 270; x += 36) { disco(x, y, 4, Q.estucoD); disco(x, y, 3, Q.estucoL); pset(x, y, Q.oro); for (const [dx, dy] of [[-6, 0], [6, 0], [0, -6], [0, 6]]) pset(x + dx, y + dy, Q.estucoS); }
    for (let x = 0; x < 320; x++) { rect(x, 14, x, 22, Q.estucoD); const y = 18 + Math.round(Math.sin(x * 0.3) * 2.5); pset(x, y, Q.oroS); pset(x, y - 1, Q.oro); if (x % 10 === 0) disco(x, 18, 1, Q.oro); }
    rect(0, 22, 319, 23, Q.oroS); rect(0, 13, 319, 13, Q.oroS);
    // el arrimadero de nogal con cuarterones
    madera(0, 100, 319, 114, Q.nog, Q.nogL, Q.nogS, Q.nogD, 5, 3);
    // el dosel rojo del trono a la izquierda, con su fleco de oro, y su sombra
    for (let y = 0; y < 112; y++) for (let x = 0; x < 52 - Math.round(y * 0.08); x++) { const f = Math.sin(x * 0.55) ; pset(x, y, f > 0.6 ? Q.tercL : f < -0.6 ? Q.tercS : Q.terc); }
    for (let y = 0; y < 112; y++) { const x = 52 - Math.round(y * 0.08); pset(x, y, Q.k); pset(x + 1, y, Q.oroS); for (let s = 2; s < 6; s++) tine(x + s, y, 0.3 - s * 0.05, Q.k); }
    for (let x = 0; x < 50; x++) { pset(x, 24, Q.oro); pset(x, 25, x % 3 ? Q.oroS : Q.oroL); pset(x, 26, x % 2 ? Q.oro : Q.oroS); }
    // un cuadro con marco dorado (un paisaje con un jardín) y la estantería pequeña de rarezas
    rect(74, 32, 128, 76, Q.oroD); rect(76, 34, 126, 74, Q.oro); rect(76, 34, 126, 34, Q.oroL); rect(80, 38, 122, 70, Q.c4);
    for (let y = 54; y <= 70; y++) rect(80, y, 122, y, y < 60 ? Q.hierbaL : Q.hierba); disco(96, 52, 6, Q.setoS); disco(110, 50, 5, Q.seto); rect(100, 44, 104, 54, Q.piedraL); poligono([[98, 44], [102, 39], [106, 44]], Q.tejaS); disco(115, 44, 3, Q.amarL);
    // la ventana a la derecha (fuera de la zona de Atom: de y 50 abajo) con vidrios emplomados
    rect(206, 50, 262, 100, Q.piedraS); rect(208, 52, 260, 98, Q.c4);
    for (let y = 52; y < 99; y++) for (let x = 208; x < 261; x++) { if ((x - 208) % 9 === 0 || (y - 52) % 9 === 0) pset(x, y, Q.grisS); else if (hh(x >> 2, y >> 2, 6) > 0.6) pset(x, y, Q.c5); }
    rect(233, 52, 235, 98, Q.piedraS); rect(208, 74, 260, 76, Q.piedraS); rect(204, 98, 264, 101, Q.piedraL);
    // el mantel de terciopelo de la mesa: el tablero visto un poco desde arriba y la caída con pliegues y el fleco
    for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) {
      if (y < 150) { const n = hh(x, y, 5); pset(x, y, (y - 114) < 2 ? Q.tercL : n > 0.93 ? Q.tercL : n < 0.06 ? Q.tercS : Q.terc); }
      else { const f = Math.sin(x * 0.18 + Math.sin(x * 0.05) * 2); pset(x, y, f > 0.55 ? Q.tercL : f < -0.5 ? Q.tercD : f < 0 ? Q.tercS : Q.terc); }
    }
    for (let x = 0; x < 320; x++) { pset(x, 150, Q.oroL); pset(x, 151, Q.oro); pset(x, 152, Q.oroS); if (x % 3 === 0) for (let y = 153; y < 158; y++) pset(x, y, y % 2 ? Q.oro : Q.oroS); }
    // los objetos de la mesa: el candelabro de tres velas, el reloj de arena, un tintero con su pluma, el astrolabio
    rect(36, 112, 40, 142, Q.bronceS); rect(37, 112, 38, 142, Q.bronceL); poligono([[26, 144], [50, 144], [44, 138], [32, 138]], Q.bronce); rect(26, 144, 50, 145, Q.bronceS);
    linea(22, 112, 54, 112, Q.bronceS); linea(22, 111, 54, 111, Q.bronce);
    for (const x of [22, 38, 54]) { rect(x - 2, 96, x + 2, 110, Q.papel); rect(x + 1, 96, x + 2, 110, Q.papelS); rect(x - 3, 110, x + 3, 112, Q.bronce); }
    rect(70, 120, 86, 122, Q.nog); rect(70, 140, 86, 142, Q.nog); for (const x of [71, 85]) rect(x, 122, x, 140, Q.nogS);
    poligono([[72, 123], [84, 123], [79, 131], [77, 131]], Q.aguaL); poligono([[77, 131], [79, 131], [84, 139], [72, 139]], Q.aguaL);
    rect(64, 140, 76, 148, Q.k); rect(65, 141, 75, 147, Q.vidrio); rect(66, 142, 68, 144, Q.vidrioL); linea(72, 140, 88, 122, Q.blanco); linea(73, 140, 89, 123, Q.blancoS); linea(88, 122, 92, 118, Q.blancoS);
    disco(222, 132, 13, Q.bronceS); disco(222, 132, 12, Q.bronce); disco(222, 132, 9, Q.bronceS); disco(222, 132, 8, Q.oroD); rect(220, 116, 224, 120, Q.bronce);
    for (let a = 0; a < 6.28; a += 0.26) pset(Math.round(222 + Math.cos(a) * 11), Math.round(132 + Math.sin(a) * 11), Q.bronceL);
    // el cojín de terciopelo granate con borlas donde está el libro
    for (let x = 122; x <= 198; x++) for (let y = 126; y <= 140; y++) if (((x - 160) / 38) ** 2 + ((y - 133) / 7) ** 2 < 1) pset(x, y, y < 131 ? Q.rojoL : y > 136 ? Q.rojoD : Q.rojoS);
    for (const x of [124, 196]) { disco(x, 138, 2, Q.oroS); linea(x, 139, x, 145, Q.oro); }
  });
  // la vida: las llamas de las velas, la luz de la ventana y la red del astrolabio, que gira
  for (const [k, x] of [[0, 22], [1, 38], [2, 54]]) { const f = Math.sin(t * 13 + k * 2) > 0 ? 1 : 0; R.disco(x, 92 - f, 2, Q.amar); R.pset(x, 90 - f, Q.amarL); R.pset(x, 93, Q.rojoL); for (let r = 6; r < 12; r++) tine(x + Math.cos(t + r) * r, 92 + Math.sin(t * 1.3 + r) * r * 0.6, 0.15, Q.amarL); }
  { const a = t * 0.8; for (let r = 2; r < 9; r++) { R.pset(Math.round(222 + Math.cos(a) * r), Math.round(132 + Math.sin(a) * r), Q.oroL); R.pset(Math.round(222 + Math.cos(a + 2.1) * r * 0.7), Math.round(132 + Math.sin(a + 2.1) * r * 0.7), Q.oro); } R.disco(222 + Math.round(Math.cos(a * 1.5) * 5), 132 + Math.round(Math.sin(a * 1.5) * 5), 1, Q.oroL); }
  { const g = (t * 0.25) % 1; for (let i = 0; i < 6; i++) tine(208 + ((g * 60 + i * 9) % 52), 56 + ((i * 13) % 40), 0.4, Q.blanco); }
  { const v = (t * 0.8) % 1; if (v < 0.9) R.pset(78, 131 + Math.round(v * 8), Q.amarS); }
  // la bolsa baja en la mano del emperador y se posa; las monedas ruedan
  const baja = ease(tramo(t, P4, DEJA)), suelta = ease(tramo(t, DEJA + 0.3, DEJA + 1.1));
  const bx = 276, by = Math.round(lerp(84, 146, baja));
  const rueda = tramo(t, DEJA, DEJA + 0.9);
  if (t > DEJA) for (const [k, dx] of [[0, 1], [1, 1]]) { const x = bx + 10 + k * 6 + rueda * (18 + k * 16), y = 142 - Math.abs(Math.sin(rueda * 6 + k)) * 4 * (1 - rueda); moneda(2 * bx - x - 20, y + 2, t, k); }
  PIEZAS_VM.bolsaMonedas(R, bx, by, { s: 3, abierta: t > DEJA + 0.1 });
  if (suelta < 1) { const hx = bx + 8 + Math.round(suelta * 40), hy = by - 42 - Math.round(suelta * 30); T.brazo(R, 352, hy - 30, hx, hy, '#2a2430', -1, { codo: [Math.round(hx + 30), Math.round(hy + 4)], puno: '#f4eee0' }); }
  if (t > DEJA && t < DEJA + 0.5) for (let i = 0; i < 5; i++) destello(bx - 16 + i * 8, by - 44 - (i % 2) * 6, 2);
  // el libro: dos reverencias a la bolsa, y con «nobody» se abre de golpe; saltan tres «?»
  const r1 = tramo(t, DEJA + 0.5, DEJA + 1.3), r2 = tramo(t, DEJA + 1.5, DEJA + 2.3);
  const bow = Math.sin(r1 * Math.PI) * (r1 > 0 && r1 < 1 ? 0.55 : 0) + Math.sin(r2 * Math.PI) * (r2 > 0 && r2 < 1 ? 0.55 : 0);
  const abre = ease(tramo(t, NADIE - 0.15, NADIE + 0.25));
  if (abre < 0.5) libroGrande(160, 132, 46 - abre * 20, 60, bow);
  else {
    // abierto de cara: las dos páginas con signos y una planta que tiemblan
    const P = [[112, 132], [208, 132], [204, 78], [116, 78]];
    R.poligono([[110, 134], [210, 134], [206, 76], [114, 76]], Q.k); R.poligono(P, Q.perg);
    R.rect(158, 78, 161, 132, Q.pergD); R.rect(159, 78, 159, 132, Q.pergS);
    for (let y = 84; y < 128; y += 6) for (let x = 166; x < 200; x += 3) if (hh(x, y, 9) > 0.35) { const j = Math.round(Math.sin(t * 20 + x) * 1); R.pset(x, y + j, Q.tinta); R.pset(x + 1, y + j - 1, Q.tinta); }
    R.linea(136, 126, 136, 98, Q.hierbaS); for (const [cx, cy, a] of [[128, 104, 2.4], [144, 100, 0.6], [130, 92, 2.8], [142, 90, 0.4]]) for (let r = 0; r < 8; r++) R.pset(Math.round(cx + Math.cos(a) * r * 0.6), Math.round(cy + Math.sin(a) * r * 0.4), Q.hierba);
    R.disco(136, 86, 4, Q.rojoL); R.disco(136, 86, 2, Q.rojo); for (const dx of [-5, 0, 5]) R.linea(136 + dx, 126, 136 + dx * 2, 130, Q.tinta);
    for (let x = 114; x < 206; x++) tine(x, 77, 0.4, Q.blanco);
  }
  for (const [k, x, y] of [[0, 100, 74], [1, 160, 62], [2, 220, 72]]) { const q = tramo(t, NADIE + 0.2 + k * 0.45, NADIE + 0.5 + k * 0.45); if (q > 0) globo(x, y - Math.round((1 - q) * 6) + Math.round(Math.sin(t * 6 + k) * 1), '?'); }
  if (bow > 0.3) for (let i = 0; i < 3; i++) tine(196 + i * 4, 70 - i * 3, 0.8, Q.oroL);
};
// 5 · Kircher, en Roma, tampoco lo consigue
const EXPERTO = @23.58@, NOPUDO = @25.10@;
const p5 = (t) => {
  T.pragua(R, t, { encuadre: 'colegio' });
  // un hermano va a la estantería con su vela y saca un libro
  { const w = tramo(t, P5 + 0.3, P5 + 2.6), x = Math.round(lerp(-20, 44, ease(w))); R.actor(EL.monje, x, 150, t, { dir: w >= 1 ? -1 : 1, anda: w > 0 && w < 1, dedo: w >= 1 && t < P5 + 3.6 }); }
  // Kircher, delante del escritorio: lee el libro, presume de sus jeroglíficos y se rinde
  const presume = t > EXPERTO - 0.1 && t < NOPUDO - 0.2, rinde = t > NOPUDO;
  T.praguaDelante(R, t, { encuadre: 'colegio' });
  const k = R.actor(EL.kircher, 128, 150, t, { dir: presume ? -1 : 1, dedo: presume && t < EXPERTO + 1.0, sonrisa: presume, triste: rinde, sostiene: !presume ? [150, 128 + (rinde ? 3 : 0)] : undefined, habla: presume && parpadeo(t, 7) });
  // el libro abierto en su mano, con los signos que se le escapan (tiemblan); al rendirse lo baja
  if (!presume) { const [mx, my] = k.mano; PIEZAS_VM.libroVoynich(R, mx + 12, my + 6, { abierto: true, pagina: 'estrellas', mueve: true, t }); if (!rinde && parpadeo(t, 4)) destello(mx + 20, my - 14, 2); }
  else PIEZAS_VM.libroVoynich(R, 222, 126, { abierto: true, pagina: 'estrellas', mueve: true, t });
  // los signos del friso se encienden en fila mientras los señala
  if (presume) { const u = (t - EXPERTO) * 1.5; for (let i = 0; i < 5; i++) if (u > i * 0.2 && u < 1.6) destello(20 + i * 30, 28, 3); }
  if (rinde && t > NOPUDO + 0.15) globo(k.cabeza[0] + 12, k.cabeza[1] - 6 + Math.round(Math.sin(t * 5)), '?');
};
const efectos = [
  [@1.94@, 'whoosh'], [@2.80@, 'tic'], [@3.52@, 'vapor'], [@4.30@, 'brillo'], [@5.10@, 'boing'],
  [UV, 'interruptor'], [NOMBRE, 'brillo'], [@12.0@, 'papel'],
  [@14.0@, 'pop'], [RIEGA, 'burbujas'], [JARDIN + 0.1, 'whoosh'],
  [DEJA, 'golpecito'], [DEJA + 0.3, 'campana'], [DEJA + 0.9, 'boing'], [DEJA + 1.9, 'boing'], [NADIE, 'papel'], [NADIE + 0.3, 'pop'],
  [EXPERTO, 'brillo'], [NOPUDO + 0.15, 'pop'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t >= P2 && t < P3 ? 2026 : t >= P5 ? 1665 : 1610) });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-mondragone'] = ('La villa', '''// VM-MONDRAGONE (frase 10, cartela 1912): el libro desaparece dos siglos y Voynich lo compra. Cuatro planos:
// 1. la sala de la villa Mondragone: un jesuita viejo barre el polvo mientras la barra corre de 1665 a 1912 y un ratón
//    cruza; con «until in 1912» entra Voynich por la derecha, entre las cajas, y se queda de piedra («!»); el jesuita le
//    señala las cajas del fondo;
// 2. inserto, la caja de libros de los jesuitas desde arriba: las manos de Voynich apartan la paja, con «bought it» sacan
//    el libro, y con «Jesuits were selling» la mano del jesuita recibe las monedas;
// 3. fondo local, una sala de exposiciones (1915): Voynich en el estrado alza el libro a un lado y a otro («showed it
//    everywhere»); con «treasure» el libro brilla en oro y salta el flash del fotógrafo; el público, de espaldas, se
//    asombra;
// 4. inserto local, el escritorio de Voynich: su mano entinta un sello y lo estampa en la tapa del libro; queda su
//    ex libris (la silueta del bigote y los quevedos, sin letras) y con «today» la barra salta a hoy y el ex libris
//    brilla.''', COMUN + marcas('vm-mondragone', r'''
const P2 = @6.20@, P3 = @12.80@, P4 = @17.12@;
const ANIO = @5.20@;
// 1 · la villa: pasan dos siglos y llega Voynich
const p1 = (t) => {
  T.pragua(R, t, { encuadre: 'villa' });
  // el ratón que cruza el suelo polvoriento y se esconde
  { const u = tramo(t, 2.0, 3.6); if (u > 0 && u < 1) { const x = Math.round(lerp(236, 70, u)), y = 158; R.rect(x, y - 3, x + 5, y, Q.k); R.rect(x + 1, y - 2, x + 4, y - 1, Q.gris); R.pset(x, y - 3, Q.rosa); R.pset(x + 1, y - 4, Q.grisL); R.linea(x + 5, y - 1, x + 9, y - 2 + (parpadeo(t, 20) ? 1 : 0), Q.rosaS); R.pset(x + 1, y + 1, Q.k); R.pset(x + 4, y + 1, Q.k); } }
  // el jesuita viejo barre; cuando entra Voynich, se vuelve y le señala las cajas del fondo
  const llega = t > ANIO + 0.2, barre = !llega;
  const jx = 132 + (barre ? Math.round(Math.sin(t * 0.9) * 10) : 0);
  const j = R.actor(EL.monje, jx, 150, t, { dir: llega ? 1 : -1, sostiene: barre ? [jx - 4 + Math.round(Math.sin(t * 6) * 3), 140] : [jx - 4, 138], dedo: llega && t > ANIO + 0.5, sonrisa: llega, pal: { H: '#d8d8d0', h: '#a8a8a0' } });
  if (barre) { const [mx, my] = j.mano, sx = mx - 6 + Math.round(Math.sin(t * 6) * 3); R.linea(mx, my - 2, sx, 148, Q.nog); R.linea(mx + 1, my - 2, sx + 1, 148, Q.nogL); R.poligono([[sx - 4, 151], [sx + 5, 151], [sx + 3, 146], [sx - 2, 146]], Q.amarS); for (let i = 0; i < 4; i++) { const v = (t * 1.5 + i / 4) % 1; tine(sx - 6 - v * 10, 148 - v * 8, 0.5 * (1 - v), Q.piedraL); } }
  else { const [mx, my] = j.mano; R.linea(mx, my, mx - 10, 150, Q.nog); R.poligono([[mx - 14, 151], [mx - 6, 151], [mx - 7, 146], [mx - 12, 146]], Q.amarS); }
  // Voynich entra por la derecha entre las cajas y se asombra
  const w = tramo(t, @4.76@, ANIO + 0.6), vx = Math.round(lerp(330, 206, ease(w)));
  R.actor(EL.voynich, vx, 150, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: w >= 1, sonrisa: t > ANIO + 1.0 });
  if (w >= 1 && t < ANIO + 1.0) globo(vx + 10, 118, '!');
  T.praguaDelante(R, t, { encuadre: 'villa' });
};
// 2 · la caja: Voynich aparta la paja, saca el libro hacia nosotros y deja las monedas, que recoge el jesuita
const COMPRA = @8.66@, VENDEN = @10.74@;
const p2 = (t) => {
  T.pragua(R, t, { encuadre: 'villa', camara: 'caja', libro: false });
  const sube = ease(tramo(t, COMPRA - 0.3, COMPRA + 0.7));
  const w = lerp(50, 84, sube), hgt = lerp(36, 60, sube), x0 = lerp(136, 120, sube) + Math.sin(t * 2) * sube, y0 = lerp(82, 104, sube);
  if (sube > 0) for (let y = 116; y < 128; y++) for (let x = 132; x < 192; x++) if (((x - 162) / 30) ** 2 + ((y - 122) / 6) ** 2 < 1) tine(x, y, 0.45 * (1 - sube * 0.5), Q.k);
  libroPlano(x0, y0, Math.round(w), Math.round(hgt), 3);
  if (sube > 0.95 && t < COMPRA + 1.6) { const u = (t - COMPRA) * 6; for (let i = 0; i < 4; i++) destello(x0 + w / 2 + Math.cos(u + i * 1.57) * (w * 0.6), y0 + hgt / 2 + Math.sin(u + i * 1.57) * (hgt * 0.6), 2); }
  const MAN = '#34343e', busca = t < COMPRA - 0.35;
  if (busca) {
    // las manos escarban en la paja a los dos lados del libro y la paja salta
    const u = (t - P2) * 3, lx = 112 + Math.round(Math.sin(u) * 8), ly = 140 + Math.round(Math.cos(u * 1.3) * 5), rx = 212 - Math.round(Math.sin(u + 1) * 8), ry = 138 + Math.round(Math.cos(u) * 5);
    for (let i = 0; i < 8; i++) { const v = (t * 1.8 + i / 8) % 1, sg = i % 2 ? 1 : -1, x = (sg > 0 ? rx : lx) + sg * v * 22, y = (sg > 0 ? ry : ly) - Math.sin(v * Math.PI) * 16; R.linea(Math.round(x), Math.round(y), Math.round(x + 4), Math.round(y + 1), Q.amar); R.pset(Math.round(x + 2), Math.round(y), Q.amarL); }
    T.brazo(R, lx - 22, 214, lx, ly, MAN, 1, { codo: [lx - 26, 186] });
    T.brazo(R, rx + 22, 214, rx, ry, MAN, -1, { codo: [rx + 26, 186] });
  } else {
    // la izquierda sujeta el libro; la derecha lo suelta, deja cuatro monedas en el canto de la caja y vuelve
    const yL = y0 + hgt * 0.62; T.brazo(R, x0 - 24, 214, Math.round(x0 - 1), Math.round(yL), MAN, 1, { codo: [Math.round(x0 - 30), 190] });
    const ida = ease(tramo(t, COMPRA + 0.9, COMPRA + 1.4)), vuelta = ease(tramo(t, COMPRA + 1.6, COMPRA + 2.1));
    const k = ida * (1 - vuelta), rx = lerp(x0 + w + 1, 244, k), ry = lerp(y0 + hgt * 0.62, 160, k);
    T.brazo(R, Math.round(rx + 22), 214, Math.round(rx), Math.round(ry), MAN, -1, { codo: [Math.round(rx + 28), 192] });
    // las monedas en el canto de abajo a la derecha; la mano del jesuita (manga negra) entra por la derecha y las recoge
    const coge = ease(tramo(t, VENDEN - 0.5, VENDEN)), lleva = ease(tramo(t, VENDEN + 0.35, VENDEN + 1.1));
    const jx = Math.round(lerp(340, 262, coge) + lleva * 80), jy = 152;
    if (t > COMPRA + 1.4 && lleva < 0.05) for (let i = 0; i < 4; i++) moneda(246 + (i % 2) * 7, 160 - Math.floor(i / 2) * 3, t, i);
    if (coge > 0 && jx < 345) { T.brazo(R, jx + 40, 176, jx, jy, '#1e1a22', -1, { codo: [jx + 24, jy + 10] }); if (lleva > 0) for (let i = 0; i < 3; i++) moneda(jx - 6 + i * 4, jy + 6, t, i); }
  }
};
// 3 · Voynich lo enseña por todas partes: el estrado, el público de espaldas y el flash
const MUESTRA = @13.24@, TESORO = @15.50@;
const p3 = (t) => {
  fijo('sala1915', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // la cornisa y el techo de escayola
    for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) pset(x, y, y > 14 ? Q.piedraS : y > 12 ? Q.piedraL : (hh(x >> 1, y, 1) > 0.9 ? Q.piedraS : Q.piedra));
    for (let x = 0; x < 320; x += 6) { rect(x, 15, x + 3, 17, Q.piedraL); pset(x + 4, 17, Q.piedraD); }
    // el papel de damasco granate con su dibujo de rombos y flores
    for (let y = 18; y < 96; y++) for (let x = 0; x < 320; x++) { const u = ((x % 20) - 10), v = (((y - 18) % 24) - 12), d = Math.abs(u) / 10 + Math.abs(v) / 12; pset(x, y, d > 0.93 ? Q.damascoS : (d < 0.35 && (x + y) % 2) ? Q.damascoL : Q.damasco); }
    for (let y = 30; y < 96; y += 24) for (let x = 10; x < 320; x += 20) { pset(x, y, Q.oroS); pset(x - 1, y, Q.damascoL); pset(x + 1, y, Q.damascoL); pset(x, y - 1, Q.damascoL); }
    // el zócalo de roble con cuarterones
    madera(0, 96, 319, 140, Q.roble, Q.robleL, Q.robleS, Q.robleD, 6, 4);
    for (let x = 4; x < 320; x += 40) { rect(x, 102, x + 32, 134, Q.robleD); rect(x + 1, 103, x + 31, 133, Q.robleS); rect(x + 2, 104, x + 30, 132, Q.roble); rect(x + 2, 104, x + 30, 104, Q.robleL); }
    rect(0, 95, 319, 97, Q.robleD); rect(0, 94, 319, 94, Q.robleL);
    // dos cuadros con marco dorado (un barco y un paisaje) y los apliques de gas
    for (const [x0, k] of [[22, 0], [234, 1]]) { rect(x0, 34, x0 + 40, 66, Q.oroD); rect(x0 + 2, 36, x0 + 38, 64, Q.oro); rect(x0 + 2, 36, x0 + 38, 36, Q.oroL); rect(x0 + 5, 39, x0 + 35, 61, k ? Q.c3 : Q.c2);
      if (k) { for (let y = 50; y <= 61; y++) rect(x0 + 5, y, x0 + 35, y, y < 54 ? Q.hierbaL : Q.hierbaS); disco(x0 + 14, 48, 5, Q.setoS); rect(x0 + 24, 44, x0 + 30, 52, Q.piedraL); poligono([[x0 + 23, 44], [x0 + 27, 40], [x0 + 31, 44]], Q.teja); }
      else { for (let y = 52; y <= 61; y++) rect(x0 + 5, y, x0 + 35, y, y % 2 ? Q.aguaS : Q.c0); poligono([[x0 + 12, 52], [x0 + 28, 52], [x0 + 25, 56], [x0 + 15, 56]], Q.nog); linea(x0 + 20, 52, x0 + 20, 40, Q.k); poligono([[x0 + 21, 41], [x0 + 28, 50], [x0 + 21, 50]], Q.papel); } }
    for (const x of [86, 214]) { rect(x - 1, 50, x + 1, 62, Q.bronceS); linea(x, 62, x - 4, 66, Q.bronce); rect(x - 4, 44, x + 4, 50, Q.k); rect(x - 3, 45, x + 3, 49, Q.amarL); }
    // el estrado de madera con su faldón de terciopelo verde y la mesita con paño
    rect(96, 128, 224, 132, Q.robleL); rect(96, 133, 224, 150, Q.roble);
    for (let y = 133; y < 150; y++) for (let x = 96; x <= 224; x++) { const f = Math.sin(x * 0.4); pset(x, y, f > 0.6 ? Q.verdeL : f < -0.5 ? Q.verdeS : Q.verde); }
    for (let x = 96; x <= 224; x++) { pset(x, 133, Q.oro); if (x % 4 === 0) pset(x, 151, Q.oroS); }
    // las cortinas del estrado recogidas con su borla
    for (const [xe, s] of [[74, 1], [246, -1]]) for (let y = 18; y < 152; y++) { const w = Math.round(y < 80 ? lerp(26, 9, (y - 18) / 62) : lerp(9, 22, (y - 80) / 72)); for (let i = 0; i <= w; i++) { const x = xe + s * i, f = Math.sin(i * (12 / w) + (y < 80 ? 0 : 0.5)); pset(x, y, i === w ? Q.k : f > 0.55 ? Q.tercL : f < -0.45 ? Q.tercD : f < 0 ? Q.tercS : Q.terc); } }
    for (const x of [84, 236]) { disco(x, 80, 3, Q.oroS); disco(x, 80, 2, Q.oro); linea(x, 83, x, 92, Q.oro); linea(x - 1, 90, x + 1, 92, Q.oroS); }
    // el suelo de parqué del pasillo
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((x + (Math.floor((y - 150) / 4) % 2) * 8) / 16); pset(x, y, (y - 150) % 4 === 3 ? Q.robleD : b % 2 ? Q.robleS : Q.roble); }
    // la lámpara eléctrica del techo, pequeña, a la derecha de la barra del año
    linea(176, 18, 176, 26, Q.k); rect(170, 26, 182, 30, Q.bronce); for (const dx of [-6, 0, 6]) { disco(176 + dx, 33, 2, Q.amarL); pset(176 + dx, 31, Q.bronceS); }
  });
  // el fotógrafo con su cámara de cajón sobre el trípode y la bandeja del magnesio
  const flash = tramo(t, TESORO - 0.05, TESORO + 0.5);
  { const fx = 252; R.actor(EL.cartero, fx, 150, t, { dir: -1, sostiene: [fx + 2, 108], sorpresa: flash > 0 && flash < 0.6 });
    R.linea(240, 132, 232, 152, Q.nogS); R.linea(244, 132, 246, 152, Q.nogS); R.linea(242, 132, 240, 152, Q.nog);
    R.rect(228, 118, 248, 132, Q.k); R.rect(229, 119, 247, 131, Q.nog); R.rect(229, 119, 247, 120, Q.nogL); R.rect(220, 121, 229, 129, Q.k); R.rect(221, 122, 228, 128, Q.negro); R.disco(219, 125, 3, Q.k); R.pset(218, 124, Q.aguaL);
    R.rect(250, 104, 262, 106, Q.k); R.rect(251, 104, 261, 105, Q.grisL);
    if (flash > 0 && flash < 1) { R.disco(256, 100, Math.round(4 + flash * 8), Q.blanco); for (let i = 0; i < 8; i++) { const v = flash, a = i * 0.8; R.pset(Math.round(256 + Math.cos(a) * 14 * v), Math.round(98 - v * 16 + Math.sin(a) * 4), Q.grisL); } } }
  // Voynich en el estrado alza el libro a un lado y a otro
  const lado = t < MUESTRA ? 1 : Math.floor((t - MUESTRA) / 0.7) % 2 ? -1 : 1, alza = t > MUESTRA - 0.3;
  const v = R.actor(EL.voynich, 152, 128, t, { dir: t > TESORO ? 1 : lado, sostiene: alza ? [lado > 0 ? 172 : 150, 100] : [168, 116], habla: t < MUESTRA + 1.6 && parpadeo(t, 7), sonrisa: t > TESORO });
  { const [mx, my] = v.mano; PIEZAS_VM.libroVoynich(R, mx, my + 6, { brilla: t > TESORO }); if (t > TESORO) { const g = (t - TESORO) * 3; for (let i = 0; i < 8; i++) { const a = i * 0.785 + g * 0.3, r1 = 12, r2 = 16 + Math.sin(g * 2 + i) * 3; R.linea(Math.round(mx + Math.cos(a) * r1), Math.round(my - 2 + Math.sin(a) * r1), Math.round(mx + Math.cos(a) * r2), Math.round(my - 2 + Math.sin(a) * r2), i % 2 ? Q.oroL : Q.oro); } } }
  // el público, de espaldas y por delante de todo: cabezas, sombreros y hombros; con «treasure» se asombran
  const PUB = [[8, 0, '#3a3a48', '#5a3418', 'bombin'], [36, 1, '#5a4a6a', '#2a1c14', 'flores'], [64, 0, '#2e3a4e', '#8a8a96', ''], [92, 1, '#6a3a3a', '#c8a050', 'pluma'], [122, 0, '#3a4a3a', '#3a2418', 'bombin'],
    [150, 1, '#4a3a5a', '#6a3a1a', 'flores'], [178, 0, '#3a3a48', '#1c1424', ''], [206, 1, '#5a5a3a', '#a8743c', 'pluma'], [234, 0, '#2a2a36', '#5a3418', 'bombin'], [262, 1, '#6a4a3a', '#2a1c14', 'flores'], [290, 0, '#3e4a5a', '#c8c4bc', '']];
  for (const [x0, fila, ropa, pelo, som] of PUB) {
    const asombro = t > TESORO + fila * 0.1 && t < TESORO + 1.6, gira = Math.round(Math.sin(t * 0.8 + x0) * 1), x = x0 + 12 + gira, y = 166 - (asombro ? 2 : 0) + fila * 4;
    const R1 = hex(ropa), R2 = mez(hex(ropa), Q.k, 0.35), P1 = hex(pelo), P2c = mez(hex(pelo), Q.k, 0.3);
    R.poligono([[x - 13, 181], [x - 11, y + 6], [x + 11, y + 6], [x + 13, 181]], Q.k); R.poligono([[x - 12, 181], [x - 10, y + 7], [x + 10, y + 7], [x + 12, 181]], R1); R.rect(x + 4, y + 8, x + 11, 180, R2); R.rect(x - 3, y + 6, x + 3, y + 8, Q.blancoS);
    R.disco(x, y, 8, Q.k); R.disco(x, y, 7, P1); R.disco(x + 2, y + 2, 5, P2c); R.pset(x - 3, y - 4, mez(P1, Q.blanco, 0.3)); R.pset(x - 8, y + 1, Q.pielS); R.pset(x + 8, y + 1, Q.pielS);
    if (som === 'bombin') { R.disco(x, y - 3, 7, Q.k); R.disco(x, y - 4, 6, Q.negro); R.rect(x - 10, y - 1, x + 10, y, Q.k); R.pset(x - 3, y - 8, Q.grisS); }
    if (som === 'flores') { R.rect(x - 9, y - 4, x + 9, y - 2, Q.k); R.rect(x - 8, y - 4, x + 8, y - 3, hex('#e8dcc8')); R.disco(x - 4, y - 6, 2, Q.rosa); R.disco(x + 3, y - 6, 2, Q.amar); R.pset(x, y - 7, Q.hierbaL); }
    if (som === 'pluma') { R.rect(x - 8, y - 4, x + 8, y - 2, Q.k); R.rect(x - 7, y - 4, x + 7, y - 3, Q.lilaS); for (let i = 0; i < 8; i++) R.pset(x + 4 + Math.round(i * 0.6), y - 5 - i + Math.round(Math.sin(t * 3 + i * 0.4) * 1), i < 6 ? Q.blanco : Q.blancoS); }
    if (asombro && fila === 1) { const hx = x + 12, hy = y - 6; R.disco(hx, hy, 3, Q.k); R.disco(hx, hy, 2, Q.piel); R.rect(hx - 1, hy + 2, hx + 1, hy + 10, R2); }
  }
  for (const [k, x] of [[0, 60], [1, 150], [2, 264]]) if (t > TESORO + 0.25 + k * 0.2 && t < TESORO + 1.5 + k * 0.2) globo(x, 156 - (k % 2) * 6, '!');
  if (flash > 0 && flash < 0.35) for (let y = 0; y < 180; y += 1) for (let x = (y % 2); x < 320; x += 2) tine(x, y, 0.55 * (1 - flash / 0.35), Q.blanco);
};
// 4 · el ex libris: la mano estampa el sello de Voynich en la tapa
const ESTAMPA = @17.70@, HOY = @17.96@;
const p4 = (t) => {
  fijo('mesaVoy', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // la pared: papel verde oscuro con rayas y una franja de friso; a la izquierda, la estantería con lomos
    for (let y = 0; y < 92; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 8 < 1 ? Q.verdeS : (x % 8 === 4 && y % 3 === 0 ? Q.verdeL : Q.verde));
    rect(0, 86, 319, 92, Q.nogS); rect(0, 86, 319, 86, Q.nogL);
    rect(0, 10, 92, 88, Q.nogD); for (const y of [12, 38, 64]) { rect(2, y + 22, 90, y + 24, Q.nogL); let x = 4; let i = 0; while (x < 86) { const w = 4 + Math.floor(hh(i, y, 3) * 4), hgt = 16 + Math.floor(hh(i, y, 4) * 6), c = [Q.rojoS, Q.verdeS, Q.nog, Q.lilaS, Q.amarS, Q.tercS][i % 6]; rect(x, y + 22 - hgt, x + w - 1, y + 21, c); rect(x, y + 22 - hgt, x, y + 21, mez(c, Q.blanco, 0.25)); pset(x + 1, y + 26 - hgt, Q.oro); x += w + (hh(i, y, 5) > 0.85 ? 3 : 0); i++; } }
    // un mapa de Europa enmarcado (sin letras), y un diploma con lacre
    rect(116, 22, 196, 76, Q.nogD); rect(118, 24, 194, 74, Q.perg); for (let y = 26; y < 73; y++) for (let x = 120; x < 193; x++) { const n = Math.sin(x * 0.12) + Math.cos(y * 0.15 + x * 0.03); if (n > 0.6) pset(x, y, Q.pergS); if (Math.abs(n - 0.6) < 0.06) pset(x, y, Q.pergD); }
    disco(150, 54, 2, Q.rojo); disco(160, 60, 2, Q.rojo); linea(150, 54, 160, 60, Q.rojoS);
    rect(212, 36, 248, 70, Q.oroS); rect(214, 38, 246, 68, Q.papel); for (let y = 44; y < 62; y += 4) linea(218, y, 242, y, Q.papelS); disco(238, 64, 3, Q.rojo);
    // el escritorio de caoba con vetas y el vade de cuero verde
    madera(0, 92, 319, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 9, 6);
    rect(70, 104, 300, 176, Q.lampVS); rect(72, 106, 298, 174, Q.lampV); rect(72, 106, 298, 106, Q.lampVL); for (let x = 74; x < 296; x += 2) pset(x, 108, Q.oroS);
    // el libro cerrado y grande en el centro, con la tapa de pergamino
    rect(116, 114, 204, 170, Q.k); rect(117, 115, 203, 169, Q.perg); rect(117, 115, 127, 169, Q.pergS); rect(128, 115, 129, 169, Q.pergD); rect(200, 116, 203, 168, Q.pergL);
    for (const [x, y, r] of [[176, 128, 4], [150, 156, 5], [190, 160, 3], [140, 124, 2]]) { disco(x, y, r, Q.pergS); }
    for (const y of [130, 154]) { rect(190, y, 210, y + 1, Q.nogS); disco(191, y, 1, Q.bronce); }
    rect(117, 170, 203, 172, Q.pergD);
    // la almohadilla de tinta, cartas con sellos, los quevedos y la pipa en su cenicero
    rect(222, 150, 254, 166, Q.k); rect(223, 151, 253, 165, Q.grisS); rect(225, 153, 251, 163, Q.negro); for (let x = 226; x < 250; x += 3) pset(x, 155 + (x % 2), Q.grisS);
    for (const [x, y] of [[24, 116], [30, 126]]) { rect(x, y, x + 34, y + 20, Q.papelS); rect(x, y, x + 33, y + 19, Q.papel); linea(x, y, x + 16, y + 10, Q.papelS); linea(x + 33, y, x + 17, y + 10, Q.papelS); rect(x + 26, y + 2, x + 31, y + 8, Q.rojo); rect(x + 27, y + 3, x + 30, y + 7, Q.rojoL); }
    disco(36, 160, 5, Q.k); disco(36, 160, 4, Q.aguaL); disco(52, 160, 5, Q.k); disco(52, 160, 4, Q.aguaL); linea(41, 158, 47, 158, Q.k); pset(34, 158, Q.blanco); pset(50, 158, Q.blanco); linea(57, 160, 66, 164, Q.k);
    disco(272, 132, 12, Q.k); disco(272, 132, 11, Q.piedraS); disco(272, 131, 9, Q.piedraD); rect(256, 128, 270, 131, Q.k); rect(257, 129, 270, 130, Q.nog); disco(280, 128, 4, Q.k); disco(280, 128, 3, Q.nogS); disco(280, 127, 2, Q.k);
  });
  // el humo de la pipa
  for (let i = 0; i < 6; i++) { const v = (t * 0.5 + i / 6) % 1; R.disco(Math.round(280 + Math.sin(v * 6 + i) * 3 + v * 6), Math.round(124 - v * 40), Math.round(1 + v * 2), mez(Q.grisL, Q.verde, v)); }
  // la mano con el sello: lo entinta, lo estampa con «today»… no: lo estampa y con «today» brilla
  const [sx, sy] = camino([[P4, 238, 146], [P4 + 0.18, 238, 130], [ESTAMPA - 0.12, 166, 112], [ESTAMPA, 166, 134], [ESTAMPA + 0.3, 166, 110], [@18.9@, 236, 132], [@19.15@, 236, 140]], t);
  const dejaSello = t > @19.15@;
  const marcado = t > ESTAMPA;
  if (marcado) { const g = tramo(t, HOY, HOY + 0.8); R.disco(166, 141, 11, Q.k); for (let x = 156; x <= 176; x++) for (let y = 132; y <= 150; y++) if (((x - 166) / 10) ** 2 + ((y - 141) / 9) ** 2 < 1) R.pset(x, y, Q.papel);
    // la silueta de Voynich: la cabeza, los quevedos y el gran bigote
    R.disco(166, 139, 5, Q.tinta); R.rect(161, 146, 171, 150, Q.tinta); R.pset(164, 139, Q.papel); R.pset(168, 139, Q.papel); R.linea(160, 143, 172, 143, Q.tinta); R.pset(159, 144, Q.tinta); R.pset(173, 144, Q.tinta);
    if (g > 0 && g < 1) for (let a = 0; a < 6.28; a += 0.4) tine(166 + Math.cos(a + g * 3) * 14, 141 + Math.sin(a + g * 3) * 12, 0.7, Q.oroL);
    if (t > HOY) { destello(180, 130, 2 + (parpadeo(t, 6) ? 1 : 0)); } }
  // el sello de madera y latón en la mano (la mano encima del mango)
  { const x = Math.round(sx), y = Math.round(sy);
    R.rect(x - 9, y + 6, x + 9, y + 10, Q.k); R.rect(x - 8, y + 6, x + 8, y + 9, Q.bronce); R.rect(x - 8, y + 6, x + 8, y + 6, Q.bronceL); R.rect(x - 7, y + 10, x + 7, y + 11, Q.negro);
    R.rect(x - 3, y - 4, x + 3, y + 6, Q.k); R.rect(x - 2, y - 4, x + 2, y + 5, Q.nog); R.disco(x, y - 6, 5, Q.k); R.disco(x, y - 6, 4, Q.nogL); R.pset(x - 2, y - 8, Q.robleL);
    const fuera = ease(tramo(t, @19.25@, @19.9@)); if (fuera < 1) { const wx = x + 8 + Math.round(fuera * 30), wy = y - 4 + Math.round(fuera * 70); T.brazo(R, wx + 34, 240, wx, wy, '#34343e', -1, { codo: [wx + 30, Math.max(wy + 40, 196)] }); } }
  // los años pasan hasta hoy: el polvo cae despacio sobre la mesa
  if (t > HOY + 0.4) for (let i = 0; i < 18; i++) { const v = ((t - HOY) * 0.35 + i / 18) % 1; tine(90 + (i * 53) % 220, 10 + v * 160, 0.55, Q.luz); }
};
const efectos = [
  [2.1, 'papel'], [@4.80@, 'puerta'], [ANIO + 0.6, 'pop'],
  [P2 + 0.3, 'papel'], [COMPRA, 'whoosh'], [VENDEN + 0.2, 'golpecito'], [VENDEN + 0.5, 'campana'],
  [MUESTRA, 'publico'], [TESORO, 'flash'], [TESORO + 0.2, 'brillo'],
  [ESTAMPA, 'sello'], [HOY, 'brillo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, cartela: '1912', año: (t) => (t < ANIO ? Math.round(lerp(1665, 1912, ease(tramo(t, 1.3, ANIO)))) : t < P3 ? 1912 : t < HOY ? 1915 : 2026) });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-kraus'] = ('Nueva York y Yale', '''// VM-KRAUS (frase 11): de la caja fuerte de la viuda a Yale. Cinco planos:
// 1. fondo local, el estudio de Voynich en Nueva York de noche (1930): escribe en sus hojas llenas de tachones; con
//    «without having deciphered it» se detiene, triste, con un «?»; se levanta y se va; la lámpara se apaga sola;
// 2. inserto, la caja fuerte: la mano de Ethel (manga azul) deja el libro dentro y con «a safe» se cierra la puerta y
//    gira la rueda; pasan los años (la barra corre a 1961, el polvo se posa); con «Ann Nill» la puerta se abre y la mano
//    de Anne (manga verde) entra a por él;
// 3. la librería de Kraus en Nueva York: Anne entra con el libro y se lo da a Kraus por encima del mostrador; con «paid
//    $24,500» suena la caja registradora y la cifra salta en oro;
// 4. fondo local, la fachada de la librería: en el escaparate, el cartel del precio sube de 24500 a 160000 con «asked»;
//    con «nobody wanted to buy it» una señora mira, se asombra y niega con la cabeza, un señor pasa de largo, la paloma
//    picotea y un taxi pasa por delante;
// 5. la sala de libros raros de Yale (1969): Kraus llega y presenta el libro en su atril, que brilla, a la bibliotecaria
//    («donated it to Yale»); se despide y se va, la barra salta a hoy y con «Manuscript 408» aparece la cartela.''', COMUN + marcas('vm-kraus', r'''
const P2 = @4.01@, P3 = @9.21@, P4 = @15.15@, P5 = @20.04@;
// 1 · el estudio de Voynich de noche
const NOPUDO = @2.08@, LUZ = @3.60@;
const p1 = (t) => {
  fijo('estudio1930', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // la pared de paneles de nogal oscuro y el papel de rayas encima
    for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 74 ? (x % 6 === 0 ? Q.damascoS : Q.damasco) : Q.nogS);
    madera(0, 74, 319, 140, Q.nogS, Q.nog, Q.nogD, Q.k, 6, 8);
    for (let x = 100; x < 320; x += 36) { rect(x, 80, x + 28, 132, Q.nogD); rect(x + 1, 81, x + 27, 131, Q.nogS); rect(x + 1, 81, x + 27, 81, Q.nog); }
    rect(0, 72, 319, 74, Q.nogL);
    // la ventana de guillotina a la izquierda con la ciudad de noche (se pinta encima, en cada fotograma)
    rect(14, 18, 88, 112, Q.nogD); rect(16, 20, 86, 110, Q.noche); rect(14, 112, 92, 116, Q.nogL);
    // la estantería alta de libros a la derecha (fuera de la zona de Atom: empieza en y 50)
    rect(186, 50, 270, 140, Q.nogD);
    for (const y of [52, 74, 96, 118]) { rect(188, y + 20, 268, y + 21, Q.nogL); let x = 190, i = 0; while (x < 264) { const w = 4 + Math.floor(hh(i, y, 3) * 4), hgt = 13 + Math.floor(hh(i, y, 4) * 6), c = [Q.rojoS, Q.verdeS, Q.nog, Q.lilaS, Q.amarS, Q.tercS, Q.aguaS][i % 7]; if (hh(i, y, 7) > 0.88) { poligono([[x, y + 20], [x + 3, y + 20], [x + 9, y + 20 - hgt + 3], [x + 6, y + 20 - hgt + 3]], c); x += 10; } else { rect(x, y + 20 - hgt, x + w - 1, y + 19, c); rect(x, y + 20 - hgt, x, y + 19, mez(c, Q.blanco, 0.25)); pset(x + 1, y + 23 - hgt, Q.oro); x += w; } i++; } }
    // el reloj de pared entre la ventana y la estantería
    disco(136, 40, 12, Q.k); disco(136, 40, 11, Q.bronce); disco(136, 40, 9, Q.papel); for (let a = 0; a < 6.28; a += 0.52) pset(Math.round(136 + Math.cos(a) * 8), Math.round(40 + Math.sin(a) * 8), Q.k);
    rect(130, 52, 142, 70, Q.nogD); rect(131, 53, 141, 69, Q.vidrioS);
    // el suelo de tablas y la alfombra
    madera(0, 140, 319, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 5, 9);
    for (let y = 150; y < 180; y++) for (let x = 20; x < 300; x++) { const b = x < 24 || x > 295 || y < 153; pset(x, y, b ? Q.tercS : ((x + y) % 6 === 0 ? Q.oroS : (Math.abs(((x - 160) % 24)) < 2 ? Q.tercL : Q.terc))); }
  });
  // la ciudad por la ventana: rascacielos con ventanas que se encienden y una aguja nueva, la luna y un haz de faro
  R.recorte([16, 20, 86, 110]);
  for (let y = 20; y <= 110; y++) R.linea(16, y, 86, y, y < 60 ? Q.noche : y < 90 ? Q.noche2 : Q.noche3);
  for (let k = 0; k < 12; k++) R.pset(18 + (k * 23) % 66, 22 + (k * 17) % 34, Math.sin(t * 2 + k) > 0.3 ? Q.blanco : Q.gris);
  R.disco(70, 32, 5, Q.papelS); R.disco(69, 31, 4, Q.papel);
  { const a = -1.2 + Math.sin(t * 0.7) * 0.5; for (let r = 0; r < 70; r++) tine(50 + Math.cos(a) * r, 108 + Math.sin(a) * r, 0.12, Q.c5); }
  for (const [x0, w, top] of [[16, 12, 70], [30, 10, 54], [42, 14, 40], [58, 10, 62], [70, 16, 76]]) { R.poligono([[x0, 111], [x0, top], [x0 + w, top], [x0 + w, 111]], Q.k);
    for (let y = top + 3; y < 110; y += 4) for (let x = x0 + 2; x < x0 + w - 1; x += 3) if (hh(x, y, Math.floor(t * 0.5)) > 0.55) R.pset(x, y, hh(x, y, 2) > 0.5 ? Q.ventL : Q.ventS); }
  R.poligono([[46, 40], [49, 22], [52, 40]], Q.grisS); R.linea(49, 22, 49, 16, Q.grisL);
  R.recorte(null);
  R.rect(50, 20, 51, 110, Q.nogD); R.rect(16, 64, 86, 66, Q.nogD);
  // las agujas del reloj y el péndulo
  { const a = t * 0.2, b = t * 2.4; R.linea(136, 40, Math.round(136 + Math.cos(a) * 6), Math.round(40 + Math.sin(a) * 6), Q.k); R.linea(136, 40, Math.round(136 + Math.cos(b * 0.08 - 1.2) * 4), Math.round(40 + Math.sin(b * 0.08 - 1.2) * 4), Q.k); const p = Math.sin(t * 3.2) * 4; R.linea(136, 53, Math.round(136 + p), 64, Q.bronce); R.disco(Math.round(136 + p), 65, 2, Q.oro); }
  // Voynich detrás del escritorio: escribe, se rinde, se levanta y se va
  const sale = tramo(t, @2.95@, @3.95@), vx = Math.round(lerp(140, 262, ease(sale)));
  const sentado = sale <= 0, escribe = t < NOPUDO - 0.1;
  const v = R.actor(EL.voynich, vx, sentado ? 141 : 140, t, { dir: sale > 0 ? 1 : 1, anda: sale > 0 && sale < 1, sostiene: escribe ? [vx + 22, 126] : undefined, triste: t > NOPUDO && sale <= 0, sorpresa: false });
  if (t > NOPUDO + 0.1 && sale <= 0.3) globo(vx + 10, 110 + Math.round(Math.sin(t * 5)), '?');
  // el escritorio por delante, con la lámpara de banquero (se apaga con LUZ), el libro, las hojas tachadas y el tintero
  const on = t < LUZ;
  if (on) for (let y = 120; y < 180; y++) for (let x = 100 + Math.round((y - 120) * 0.3); x < 236 - Math.round((y - 120) * 0.3); x++) if ((x + y) % 2 === 0) tine(x, y, 0.12, Q.amarL);
  R.rect(92, 128, 240, 132, Q.k); R.rect(93, 129, 239, 131, Q.nogL); madera(94, 132, 238, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 8, 12);
  for (const x0 of [100, 172]) { R.rect(x0, 140, x0 + 58, 170, Q.nogD); R.rect(x0 + 1, 141, x0 + 57, 169, Q.nogS); R.rect(x0 + 26, 150, x0 + 32, 152, Q.bronce); }
  // encima: las hojas con signos y tachones, el libro abierto, el tintero y la lámpara verde
  for (const [x, y, k] of [[100, 124, 0], [112, 122, 1]]) { R.rect(x, y, x + 14, y + 6, Q.papelS); R.rect(x, y, x + 13, y + 5, Q.papel); for (let j = 1; j < 5; j += 2) R.linea(x + 2, y + j, x + 11, y + j, Q.tintaL); R.linea(x + 2, y + 1, x + 11, y + 5, Q.rojo); }
  PIEZAS_VM.libroVoynich(R, 172, 129, { abierto: sale <= 0, pagina: 'estanques' });
  R.rect(198, 121, 204, 128, Q.k); R.rect(199, 122, 203, 127, Q.vidrio); R.pset(200, 123, Q.vidrioL);
  if (!escribe) { R.linea(202, 121, 208, 112, Q.blancoS); R.linea(203, 121, 209, 112, Q.blanco); }
  if (escribe) { const [mx, my] = v.mano, jx = Math.round(Math.sin(t * 22) * 1.5); R.linea(mx + jx, my, mx + 6 + jx, my - 8, Q.blanco); R.linea(mx + 1 + jx, my, mx + 7 + jx, my - 8, Q.blancoS); R.pset(mx + jx - 1, my + 1, Q.tinta); }
  R.rect(220, 126, 232, 128, Q.bronceS); R.rect(225, 112, 227, 126, Q.bronce); R.poligono([[212, 112], [240, 112], [236, 104], [216, 104]], Q.k); R.poligono([[214, 111], [238, 111], [235, 105], [217, 105]], on ? Q.lampVL : Q.lampVS); R.rect(214, 110, 238, 111, on ? Q.amarL : Q.lampVS);
  // las bolas de papel arrugado por el suelo y la papelera que rebosa
  for (const [x, y] of [[40, 170], [62, 164], [270, 168], [252, 174]]) { R.disco(x, y, 4, Q.k); R.disco(x, y, 3, Q.papel); R.pset(x - 1, y - 1, Q.blanco); R.pset(x + 1, y + 1, Q.papelS); }
  R.rect(264, 146, 284, 168, Q.k); R.rect(265, 147, 283, 167, Q.bronceS); for (let x = 266; x < 283; x += 3) R.linea(x, 148, x, 166, Q.bronce); R.disco(270, 145, 4, Q.papel); R.disco(278, 144, 4, Q.papelS);
  if (!on) for (let y = 0; y < 180; y++) for (let x = (y % 2); x < 320; x += 2) tine(x, y, 0.35 * ease(tramo(t, LUZ, LUZ + 0.3)), Q.noche);
};
// 2 · la caja fuerte: Ethel la cierra, pasan los años y Anne la abre
const CIERRA = @6.83@, ANNE = @8.65@;
const p2 = (t) => {
  const abre = 1 - ease(tramo(t, CIERRA - 0.45, CIERRA)) + ease(tramo(t, ANNE - 0.7, ANNE - 0.1));
  const mete = ease(tramo(t, P2, P2 + 1.4)), coge = ease(tramo(t, ANNE + 0.05, ANNE + 0.5));
  const dentro = mete >= 1 && coge <= 0;
  T.pragua(R, t, { encuadre: 'nuevaYork', camara: 'cajaFuerte', abre: Math.min(1, abre), libro: dentro });
  // el libro: la mano de Ethel lo mete desde abajo hasta la balda; luego la mano de Anne lo saca
  const bx = Math.round(lerp(150, 140, mete) + coge * 6), by = Math.round(lerp(176, 80, mete) + coge * 70);
  if (!dentro) libroPlano(bx, by, 40, 32, 5);
  if (t < P2 + 2.1) { const ret = ease(tramo(t, P2 + 1.5, P2 + 2.1)), hx = bx + 44, hy = by + 26 + Math.round(ret * 90); T.brazo(R, hx + 22, 250, hx, hy, '#5a78b8', -1, { codo: [hx + 26, Math.max(hy + 40, 192)] }); }
  if (t > ANNE - 0.1) { const ent = ease(tramo(t, ANNE - 0.1, ANNE + 0.05)), hx = bx - 4, hy = Math.round(lerp(200, by + 22, ent)); T.brazo(R, hx - 22, 250, hx, hy, '#4a7a52', 1, { codo: [hx - 26, Math.max(hy + 40, 192)] }); }
  // los años: el polvo se posa sobre la caja cerrada y una telaraña crece en la esquina
  const anos = tramo(t, CIERRA + 0.2, ANNE - 0.7);
  if (anos > 0 && anos < 1) for (let i = 0; i < 16; i++) { const v = (anos * 2 + i / 16) % 1; tine(100 + (i * 37) % 120, 26 + v * 130, 0.6, Q.piedraL); }
  if (anos > 0) { const n = Math.round(Math.min(1, anos * 1.5) * 12); for (let i = 0; i < n; i++) { R.linea(224, 30, 224 - i * 1.5, 30 + 12 - Math.abs(i - 6), Q.grisL); } }
};
// 3 · la librería de Kraus: Anne le vende el libro
const KRAUS = @11.63@, PAGA = @12.69@;
const p3 = (t) => {
  T.pragua(R, t, { encuadre: 'nuevaYork', precio: '24500' });
  // Anne entra con el libro y se lo tiende a Kraus
  const w = tramo(t, P3, P3 + 1.6), ax = Math.round(lerp(-16, 118, ease(w)));
  const da = tramo(t, KRAUS - 0.4, KRAUS + 0.2);
  const a = R.actor(EL.nill, ax, 150, t, { dir: 1, anda: w > 0 && w < 1, sostiene: da < 1 ? [ax + 20, 124] : undefined, habla: t > P3 + 1.7 && t < KRAUS - 0.4 && parpadeo(t, 7), sonrisa: t > PAGA });
  // Kraus detrás del mostrador: recibe el libro, lo deja y paga
  const kr = R.actor(EL.kraus, 184, 128, t, { dir: -1, sostiene: da > 0 && t < PAGA - 0.3 ? [186, 112] : undefined, dedo: t > KRAUS - 1.0 && t < KRAUS - 0.4, sonrisa: t > KRAUS, habla: t > KRAUS + 0.2 && t < PAGA && parpadeo(t, 8) });
  T.praguaDelante(R, t, { encuadre: 'nuevaYork', precio: '24500' });
  // el libro: en la mano de Anne, por el aire hasta la de Kraus y luego en el mostrador
  let lx, ly;
  if (da <= 0) [lx, ly] = [a.mano[0] + 2, a.mano[1] + 4];
  else if (t < PAGA - 0.3) { const u = ease(da); [lx, ly] = [lerp(a.mano[0] + 2, kr.mano[0] - 2, u), lerp(a.mano[1] + 4, kr.mano[1] + 4, u) - Math.sin(u * Math.PI) * 6]; }
  else [lx, ly] = [212, 123];
  PIEZAS_VM.libroVoynich(R, Math.round(lx), Math.round(ly), {});
  // la cifra que paga: salta en oro con el timbre de la caja
  const c = tramo(t, PAGA, PAGA + 0.35);
  if (c > 0) { const y = 52 - Math.round((1 - ease(c)) * 8); R.numero('$24500', 128, y, { tam: 16, centro: true }); if (t < PAGA + 1.0) for (let i = 0; i < 4; i++) destello(70 + i * 40, y - 22 + (i % 2) * 6, 2); }
  if (t > PAGA && t < PAGA + 0.6) for (let i = 0; i < 3; i++) R.pset(252 + i * 3, 92 - Math.round((t - PAGA) * 20) - i, Q.oroL);
};
// 4 · la fachada: el precio sube y nadie lo compra
const PIDE = @15.45@, NADIE = @17.61@, A69 = @19.20@;
const p4 = (t) => {
  fijo('cieloNY', () => cieloFijo(40));
  nubes(t, 16, 36, 3);
  capa('fachada', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // a la izquierda, la casa de piedra parda con su escalinata; a la derecha, otra de ladrillo claro
    for (let y = 18; y < 152; y++) for (let x = 0; x < 58; x++) pset(x, y, hh(x >> 1, y >> 1, 3) > 0.85 ? Q.nogS : (y % 9 === 0 ? Q.nogD : Q.nog));
    for (const y of [30, 70]) for (const x of [8, 34]) { rect(x, y, x + 16, y + 26, Q.piedraL); rect(x + 2, y + 2, x + 14, y + 24, Q.vidrio); rect(x + 2, y + 13, x + 14, y + 13, Q.piedraL); pset(x + 3, y + 3, Q.vidrioL); }
    for (let i = 0; i < 6; i++) rect(0, 124 + i * 5, 50 - i * 4, 128 + i * 5, i % 2 ? Q.piedraS : Q.piedra);
    for (let y = 22; y < 152; y++) for (let x = 264; x < 320; x++) pset(x, y, ((y % 5 === 4) || ((x + Math.floor(y / 5) * 4) % 9 === 0)) ? Q.piedraS : (hh(x, y, 5) > 0.9 ? Q.ladrL : Q.gravaL));
    for (const y of [52, 92]) for (const x of [272, 298]) { rect(x, y, x + 14, y + 24, Q.k); rect(x + 1, y + 1, x + 13, y + 23, Q.vidrioS); rect(x + 1, y + 12, x + 13, y + 12, Q.piedraS); rect(x - 1, y + 24, x + 15, y + 26, Q.piedraL); }
    // la casa de la librería: ladrillo, cornisa, ventanas con la escalera de incendios
    ladrillo(58, 8, 263, 84, 2);
    rect(56, 6, 265, 10, Q.piedraS); rect(56, 6, 265, 6, Q.piedraL); for (let x = 58; x < 264; x += 6) rect(x, 11, x + 2, 13, Q.piedraS);
    for (const x of [74, 124, 174, 224]) { rect(x - 1, 22, x + 24, 24, Q.piedraL); rect(x, 24, x + 22, 54, Q.k); rect(x + 1, 25, x + 21, 53, Q.vidrioS); rect(x + 1, 39, x + 21, 40, Q.piedraS); rect(x + 11, 25, x + 11, 53, Q.piedraS); rect(x + 2, 26, x + 9, 38, Q.vidrio); pset(x + 3, 27, Q.vidrioL); rect(x - 2, 54, x + 24, 56, Q.piedraL); }
    // la escalera de incendios de hierro negro
    for (const y of [56, 26]) { rect(110, y + 2, 212, y + 3, Q.k); for (let x = 110; x <= 212; x += 3) linea(x, y + 2, x, y - 8, Q.k); rect(110, y - 9, 212, y - 8, Q.k); }
    for (let i = 0; i < 8; i++) { linea(160 + i * 3, 56 - i * 4, 163 + i * 3, 56 - i * 4, Q.k); } linea(158, 58, 186, 26, Q.k); linea(162, 58, 190, 26, Q.k);
    // el letrero de la tienda, sin letras: una tabla verde con un libro dorado pintado
    rect(64, 62, 258, 76, Q.k); rect(65, 63, 257, 75, Q.verdeS); rect(65, 63, 257, 63, Q.verdeL); for (const x of [150]) { rect(x, 65, x + 20, 73, Q.oroS); rect(x + 1, 66, x + 9, 72, Q.oro); rect(x + 11, 66, x + 19, 72, Q.oroL); }
    for (let x = 70; x < 252; x += 12) { pset(x, 69, Q.oro); }
    // el escaparate y la puerta de cristal
    rect(58, 76, 263, 152, Q.verdeS);
    rect(68, 92, 196, 144, Q.k); rect(204, 92, 238, 150, Q.k); rect(206, 94, 236, 150, Q.vidrioS); rect(220, 96, 222, 148, Q.verdeS); disco(216, 124, 1, Q.oro);
    rect(64, 144, 200, 150, Q.verde); rect(64, 144, 200, 144, Q.verdeL);
    rect(240, 92, 260, 150, Q.verde); rect(242, 96, 258, 140, Q.verdeS);
    // la acera de losas, el bordillo y la calle
    for (let y = 150; y < 166; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y === 158) ? Q.aceraS : (hh(x, y, 8) > 0.92 ? Q.aceraS : Q.acera));
    rect(0, 150, 319, 150, Q.aceraL); rect(0, 166, 319, 168, Q.aceraL); rect(0, 168, 319, 169, Q.aceraS);
    for (let y = 170; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x, y, 9) > 0.9 ? Q.asfL : Q.asf);
    for (let x = 4; x < 320; x += 40) rect(x, 176, x + 16, 177, Q.amarS);
    // la boca de riego roja, la farola y la papelera de rejilla
    rect(32, 150, 40, 164, Q.k); rect(33, 151, 39, 163, Q.rojo); rect(31, 154, 41, 156, Q.rojoS); disco(36, 150, 4, Q.rojoS); pset(34, 152, Q.rojoL);
    rect(288, 60, 290, 164, Q.k); rect(289, 60, 289, 164, Q.grisS); rect(282, 50, 296, 60, Q.k); rect(283, 51, 295, 59, Q.amarL); rect(284, 162, 294, 166, Q.k);
    rect(246, 150, 258, 166, Q.k); for (let x = 247; x < 258; x += 2) linea(x, 151, x, 165, Q.grisS);
  });
  // dentro del escaparate: las baldas de libros, el atril de terciopelo con el libro y el cartel del precio
  R.recorte([70, 94, 194, 142]);
  for (let y = 94; y <= 142; y++) R.linea(70, y, 194, y, mez(Q.nogS, Q.k, 0.3));
  for (const y of [104, 118]) { R.linea(70, y + 10, 194, y + 10, Q.nog); for (let x = 72; x < 192; x += 5) R.linea(x, y + 9, x, y + 1 + Math.round(hh(x, y, 2) * 3), [Q.rojoS, Q.verdeS, Q.lilaS, Q.amarS][Math.floor(hh(x, y, 4) * 4)]); }
  R.poligono([[96, 142], [132, 142], [128, 126], [100, 126]], Q.terc); R.linea(100, 126, 128, 126, Q.tercL);
  PIEZAS_VM.libroVoynich(R, 114, 128, { s: 2 });
  R.recorte(null);
  // el cartel del precio colgado del cristal: la cifra sube de 24500 a 160000
  const sube = ease(tramo(t, PIDE, @16.90@)), n = Math.round((24500 + (160000 - 24500) * sube) / 500) * 500;
  { const cx = 160, cy = 114; R.linea(cx - 14, 94, cx - 10, cy - 8, Q.grisL); R.linea(cx + 14, 94, cx + 10, cy - 8, Q.grisL);
    R.rect(cx - 30, cy - 9, cx + 30, cy + 7, Q.k); R.rect(cx - 29, cy - 8, cx + 29, cy + 6, Q.papel); R.rect(cx - 29, cy + 6, cx + 29, cy + 6, Q.papelS);
    R.numero('$' + n, cx, cy + 3, { centro: true, color: sube > 0 && sube < 1 ? Q.rojo : Q.k, sombra: false });
    if (sube >= 1 && t < @17.4@) destello(cx + 32, cy - 10, 3); }
  // el reflejo que cruza el cristal
  { const g = (t * 0.3) % 1; for (let j = 0; j < 48; j++) { const x = 70 + g * 200 - j * 0.5; if (x > 70 && x < 194) { tine(x, 94 + j, 0.25, Q.blanco); tine(x + 3, 94 + j, 0.15, Q.blanco); } } }
  // el toldo a rayas que ondea encima del escaparate
  for (let x = 62; x < 202; x++) { const o = Math.round(Math.sin(t * 3 + x * 0.1) * 1), c = Math.floor((x - 62) / 7) % 2 ? Q.toldo : Q.toldoL; R.linea(x, 80, x, 90 + o, c); R.pset(x, 91 + o, Q.k); }
  R.linea(62, 79, 202, 79, Q.k);
  // la paloma picotea en la acera y sale volando cuando pasa el taxi
  const taxi = tramo(t, @18.55@, @19.75@), vuela = tramo(t, @18.4@, @19.4@);
  { const px = vuela > 0 ? 262 + vuela * 70 : 262, py = vuela > 0 ? 160 - vuela * 70 : 160, pic = vuela <= 0 && parpadeo(t, 5);
    R.disco(Math.round(px), Math.round(py - 3), 3, Q.k); R.disco(Math.round(px), Math.round(py - 3), 2, Q.gris); R.disco(Math.round(px + 3), Math.round(py - 6 + (pic ? 3 : 0)), 1.5, Q.grisS); R.pset(Math.round(px + 5), Math.round(py - 6 + (pic ? 3 : 0)), Q.amarS);
    if (vuela > 0) { const a = parpadeo(t, 20); R.linea(Math.round(px - 5), Math.round(py - 4 - (a ? 4 : -2)), Math.round(px), Math.round(py - 4), Q.grisL); } else { R.pset(Math.round(px), Math.round(py), Q.rosaS); } }
  // un señor con sombrero y maletín pasa de largo
  { const u = tramo(t, P4, P4 + 4.6), x = Math.round(lerp(330, -24, u)); R.actor(EL.oficinista, x, 162, t, { dir: -1, anda: u > 0 && u < 1 }); }
  // la señora: se para, se asombra con la cifra y niega con la cabeza; luego sigue
  const llega = tramo(t, @16.1@, NADIE - 0.2), sigue = tramo(t, @18.6@, P5);
  const sx = Math.round(lerp(-20, 142, ease(llega)) + sigue * 200), niega = t > NADIE && t < @18.55@;
  R.actor(EL.clienta, sx, 160, t, { dir: niega ? (Math.floor(t * 7) % 2 ? 1 : -1) : 1, anda: (llega > 0 && llega < 1) || (sigue > 0 && sigue < 1), sorpresa: t > NADIE - 0.2 && t < NADIE + 0.2, triste: false, enfado: niega });
  if (niega) R.bocadillo(sx + 10, 128, { icono: 'X' });
  // el taxi amarillo pasa por delante de todo
  if (taxi > 0 && taxi < 1) { const x = Math.round(lerp(-70, 340, taxi)), y = 178;
    R.rect(x, y - 14, x + 56, y - 4, Q.k); R.rect(x + 1, y - 13, x + 55, y - 5, Q.taxi); R.rect(x + 1, y - 7, x + 55, y - 5, Q.taxiS); R.poligono([[x + 12, y - 14], [x + 18, y - 22], [x + 40, y - 22], [x + 46, y - 14]], Q.k); R.poligono([[x + 14, y - 14], [x + 19, y - 21], [x + 39, y - 21], [x + 44, y - 14]], Q.taxi);
    R.rect(x + 20, y - 20, x + 28, y - 15, Q.vidrioL); R.rect(x + 31, y - 20, x + 38, y - 15, Q.vidrioL); R.rect(x + 26, y - 25, x + 32, y - 22, Q.k); R.rect(x + 27, y - 24, x + 31, y - 23, Q.blanco);
    for (let i = 0; i < 6; i++) R.pset(x + 4 + i * 9, y - 9, i % 2 ? Q.k : Q.taxi); R.disco(x + 12, y - 3, 5, Q.k); R.disco(x + 44, y - 3, 5, Q.k); R.disco(x + 12, y - 3, 2, Q.grisL); R.disco(x + 44, y - 3, 2, Q.grisL); R.rect(x + 54, y - 12, x + 56, y - 10, Q.amarL); }
};
// 5 · Yale: Kraus deja el libro y aparece su número, el 408
const DONA = @20.68@, SIGUE = @22.20@, N408 = @23.90@;
const p5 = (t) => {
  const brilla = t > DONA && t < SIGUE + 0.4;
  T.biblioteca(R, t, {});
  const w = tramo(t, P5, DONA - 0.1), kx = Math.round(lerp(-20, 112, ease(w))), va = tramo(t, SIGUE + 0.4, SIGUE + 2.4);
  const kx2 = va > 0 ? Math.round(lerp(112, -24, va)) : kx;
  R.actor(EL.kraus, kx2, 152, t, { dir: va > 0 ? -1 : 1, anda: (w > 0 && w < 1) || (va > 0 && va < 1), brazos: t > DONA && t < DONA + 0.9, dedo: t > SIGUE - 0.1 && t < SIGUE + 0.4, sonrisa: t > DONA });
  // la bibliotecaria lo recibe; con «408» señala la cartela
  const bx = 200; R.actor(EL.bibliotecaria, bx, 152, t, { dir: -1, sonrisa: t > DONA + 0.2, sorpresa: t > DONA - 0.1 && t < DONA + 0.2, dedo: t > N408 - 0.1 && t < N408 + 1.2, habla: t > SIGUE && t < N408 - 0.2 && parpadeo(t, 7) });
  // una estudiante de hoy entra por la derecha cuando la barra salta
  { const u = tramo(t, SIGUE + 0.6, N408 - 0.3), x = Math.round(lerp(330, 232, ease(u))); R.actor(EL.colega, x, 152, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > N408 && t < N408 + 0.6, sonrisa: t > N408 + 0.6 }); }
  T.bibliotecaDelante(R, t, { brilla, numero: t > N408 - 0.15 ? 408 : null });
  if (t > N408 - 0.15 && t < N408 + 0.8) { const g = (t - N408) * 6; for (let i = 0; i < 4; i++) destello(160 + Math.cos(g + i * 1.57) * 22, 137 + Math.sin(g + i * 1.57) * 9, 2); }
  // el número grande aparece encima del atril con «Manuscript» y baja a la cartela con «408»
  { const a = tramo(t, @23.26@, @23.5@), b = ease(tramo(t, N408 - 0.2, N408 + 0.2)); if (a > 0 && b < 1) R.numero('408', 160, Math.round(lerp(84, 140, b)) - Math.round((1 - a) * 6), { tam: 16, centro: true }); }
};
const efectos = [
  [0.6, 'lapiz'], [NOPUDO + 0.1, 'pop'], [LUZ, 'interruptor'],
  [P2 + 1.2, 'golpecito'], [CIERRA, 'cerrojo'], [ANNE - 0.4, 'cerrojo'],
  [P3 + 0.4, 'timbre'], [KRAUS - 0.1, 'papel'], [PAGA, 'ring'],
  [PIDE + 0.1, 'tic'], [@16.9@, 'brillo'], [NADIE + 0.1, 'pop'], [@18.6@, 'claxon'],
  [DONA, 'brillo'], [N408, 'brillo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < CIERRA + 0.2 ? 1930 : t < ANNE - 0.7 ? Math.round(lerp(1930, 1961, tramo(t, CIERRA + 0.2, ANNE - 0.7))) : t < A69 ? 1961 : t < SIGUE ? 1969 : 2026) });
'''))
