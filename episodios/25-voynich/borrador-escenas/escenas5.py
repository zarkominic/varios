import re

# Grupo S5 del ep25: vm-newbold, vm-manly y vm-friedman (frases 12–14, los descifradores).
# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): marca, inicio y _fin de la frase de cada escena
MARCAS = {'vm-newbold': ('newbold', 1.5, 20.871), 'vm-manly': ('manly', 0.5, 14.91), 'vm-friedman': ('friedman', 0.5, 21.99)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    k, a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)


# lo que comparten los fondos locales y los insertos (copiado del grupo S4 para no depender de su módulo): la paleta, el
# ruido, las mezclas, los búferes fijos, el cielo tramado con nubes de tres tonos y pájaros, la madera, el ladrillo
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

# lo propio del grupo: más colores, los sillares, el arco apuntado, el renglón de signos inventados, la lámpara colgante
COMUN += r'''
Object.assign(Q, Object.fromEntries(Object.entries({
  muro: '#8a7e6e', muroL: '#a89c8a', muroS: '#6a5e50', muroD: '#4a4038',
  sepL: '#f2e0b8', sep: '#dcc092', sepS: '#ac8a5c', sepD: '#6a4c2e',
  hier: '#3e5a4a', hierL: '#5e8068', hierS: '#2a4034', hierD: '#18261e',
  oto: '#d8742a', otoL: '#f0a848', otoS: '#a84a1e', otoD: '#6e3014', otoA: '#e8c040',
  corcho: '#c4945a', corchoL: '#dab078', corchoS: '#a07440', corchoD: '#7a5430',
  vela: '#ffd060', velaL: '#fff6c0', noct: '#0c1230',
  yeso: '#d8dcc4', yesoL: '#e8ead8', yesoS: '#b8bea4', yesoD: '#98a086',
  ocaso: '#e88a5a', ocasoL: '#f4b878', malva: '#8a6a9a', malvaS: '#5a4a7a',
  tela: '#e8e2d0', tintaN: '#1c1820', rojoT: '#d23a30',
}).map(([k, v]) => [k, hex(v)])));
// sillares de piedra con sus juntas, la luz en el borde de arriba y alguna piedra más clara u oscura
const sillar = (x0, y0, x1, y1, c, cL, cS, cD, h = 9, w = 18, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = Math.floor((y - y0) / h), j = (y - y0) % h, xo = x - x0 + (f % 2) * Math.floor(w / 2), o = xo % w, id = Math.floor(xo / w);
    if (j === h - 1 || o === w - 1) { R.pset(x, y, cD); continue; }
    const v = hh(id, f, k); let col = v < 0.2 ? cS : v > 0.84 ? cL : c;
    if (j === 0 || o === 0) col = mez(col, cL, 0.45);
    if (j === h - 2) col = mez(col, cS, 0.35);
    if (hh(x, y, k + 3) > 0.94) col = mez(col, cS, 0.6);
    R.pset(x, y, col);
  }
};
// el arco apuntado: dentro si |x−cx| ≤ a, y ≤ yb y por debajo de los dos arcos (radio 1,5·a) que se cortan en la clave
const enArco = (x, y, cx, ys, a, yb) => {
  const d = x - cx; if (Math.abs(d) > a || y > yb) return false; if (y >= ys) return true;
  const r = 1.5 * a, dx = d < 0 ? d - a / 2 : d + a / 2; return y >= ys - Math.sqrt(Math.max(0, r * r - dx * dx));
};
// el marco de piedra moldurado alrededor de un arco (para el búfer)
const marcoArco = (cx, ys, a, yb, cL, cD) => {
  for (let y = ys - Math.ceil(a * 1.5) - 4; y <= yb + 2; y++) for (let x = cx - a - 4; x <= cx + a + 4; x++) {
    if (enArco(x, y, cx, ys, a, yb)) continue;
    if (enArco(x, y, cx, ys, a + 2, yb + 1)) R.pset(x, y, cD); else if (enArco(x, y, cx, ys, a + 4, yb + 2)) R.pset(x, y, (x + y) % 5 === 0 ? cD : cL);
  }
};
// un renglón de signos inventados (nunca letras): palabras de 2–4 signos con su hueco; px(x, y, c) pinta (para recortar)
const GLIFOS = [['ee', 'e.'], ['e.', 'ee'], ['.e', 'ee'], ['ee', '.e'], ['e.', '.e'], ['.e', 'e.'], ['ee', 'ee'], ['e.e', 'eee']];
const renglon = (x0, y0, ancho, sem, col, s = 1, px = R.pset) => {
  let x = x0, k = sem * 7 + 3; const rnd = () => { k = (k * 1103515245 + 12345) & 0x7fffffff; return k / 0x7fffffff; };
  while (x < x0 + ancho - 2 * s) { const n = 2 + Math.floor(rnd() * 3);
    for (let i = 0; i < n && x < x0 + ancho - 2 * s; i++) { const g = GLIFOS[Math.floor(rnd() * GLIFOS.length)];
      for (let j = 0; j < 2; j++) for (let ii = 0; ii < g[j].length; ii++) if (g[j][ii] === 'e') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) px(x + ii * s + a, y0 + j * s + b, col);
      x += (g[0].length + 1) * s; }
    x += 2 * s; }
};
// una lámpara de esmalte colgada que se mece; devuelve dónde queda la bombilla
const lamparaColgante = (x, y0, largo, t, k = 0, c = Q.lampV, cL = Q.lampVL, on = true) => {
  const a = Math.sin(t * 1.3 + k) * 0.08, lx = Math.round(x + Math.sin(a) * largo), ly = y0 + largo;
  R.linea(x, y0, lx, ly, Q.k);
  R.poligono([[lx - 8, ly + 6], [lx + 8, ly + 6], [lx + 4, ly], [lx - 4, ly]], Q.k); R.poligono([[lx - 7, ly + 5], [lx + 7, ly + 5], [lx + 3, ly + 1], [lx - 3, ly + 1]], c); R.linea(lx - 3, ly + 1, lx - 6, ly + 4, cL);
  if (on) { R.rect(lx - 2, ly + 6, lx + 2, ly + 7, Q.amarL); R.pset(lx, ly + 8, Q.amar); }
  return [lx, ly + 7];
};
// el resplandor cálido alrededor de una luz (tiñe un disco)
const halo = (cx, cy, r, k, c) => { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d < r && ((x + y) % 2 === 0 || d < r * 0.5)) tine(x, y, k * (1 - d / r), c); } };
// una ficha de cartulina con su renglón de signos y su número (x, y = esquina de arriba)
const ficha = (x, y, w, hgt, sem, n) => {
  R.rect(x, y, x + w, y + hgt, Q.k); R.rect(x + 1, y + 1, x + w - 1, y + hgt - 1, Q.papel); R.rect(x + 1, y + hgt - 1, x + w - 1, y + hgt - 1, Q.papelS); R.linea(x + 1, y + 3, x + w - 1, y + 3, Q.rojoL);
  renglon(x + 3, y + 6, w - 6, sem, Q.tinta); if (hgt > 14) renglon(x + 3, y + 10, w - 6, sem + 1, Q.tinta);
  if (n != null) R.numero(String(n), x + w - 3, y + hgt - 2, { color: Q.grisS, sombra: false, fina: true, centro: true });
};
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-newbold'] = ('Newbold', '''// VM-NEWBOLD (frase 12), Filadelfia, 1921, cartela «1921». Cuatro planos:
// 1. descifradores/filadelfia: con «the code breakers showed up» Newbold entra en su despacho con el libro bajo el brazo;
//    con «In 1921» se arranca la hoja del calendario (1920 → 1921) y cae revoloteando, y él se sorprende; con «a
//    professor in Philadelphia» entra un estudiante que le saluda; con «William Newbold» Newbold levanta el libro, que
//    brilla, con un «!»: lo ha leído (corta en «announced»);
// 2. fondo local, la celda de Roger Bacon en Oxford como la imagina Newbold (siglo XIII, en sepia por los bordes):
//    el fraile escribe el libro en su atril a la luz de la vela; con «written by the medieval scholar» deja la pluma y
//    mira la página con su lente; con «Roger Bacon» se vuelve, sonríe y el libro se enciende en oro (corta en «and»);
// 3. descifradores/filadelfia/ocular: por el microscopio, con «tiny marks» las grietas de la tinta se encienden en
//    ámbar (las «letras» de Newbold); con «inside each letter» entra andando una mosca (gag 4), se para y se frota las
//    patas como si fuera otra letra (un «!»), y con «microscope» se va volando;
// 4. fondo local, la sala de la rotativa de un periódico de 1921: la máquina imprime; con «The newspapers» los
//    periódicos salen disparados de la mesa y vuelan por toda la sala; con «went wild» el redactor levanta los brazos,
//    una portada (el libro y un «!», sin letras) cae delante y el repartidor sale corriendo con su fajo.''', COMUN + marcas('vm-newbold', r'''
const P2 = @7.15@, P3 = @13.45@, P4 = @18.8@;
// 1 · el despacho de Newbold
const ENTRA = @1.45@, ANIO = @3.3@, PROF = @4.5@, NOMBRE = @6.25@;
const p1 = (t) => {
  T.descifradores(R, t, { encuadre: 'filadelfia', año: t < ANIO ? 1920 : 1921 });
  // la hoja del calendario que se arranca con «In 1921» y cae revoloteando (por detrás del escritorio)
  { const u = tramo(t, ANIO, ANIO + 1.6); if (u > 0 && u < 1) { const x = Math.round(175 + u * 24 + Math.sin(u * 12) * 5), y = Math.round(50 + u * 90), w = Math.sin(u * 14) > 0 ? 6 : 3;
    R.rect(x - w, y - 3, x + w, y + 3, Q.k); R.rect(x - w + 1, y - 2, x + w - 1, y + 2, Q.papel); R.linea(x - w + 1, y - 2, x + w - 1, y - 2, Q.rojo); if (w > 4) R.pset(x, y, Q.k); } }
  // el estudiante entra por la izquierda, saluda, y se asombra cuando Newbold levanta el libro
  const ue = tramo(t, PROF - 0.2, PROF + 1.1), ex = Math.round(lerp(-18, 74, ease(ue)));
  R.actor(EL.estudiante, ex, 146, t, { dir: 1, anda: ue > 0 && ue < 1, dedo: t > PROF + 1.15 && t < PROF + 1.7, sorpresa: t > NOMBRE + 0.2 && t < NOMBRE + 0.8, sonrisa: t > NOMBRE + 0.8 });
  // Newbold entra con el libro, se para ante el calendario y, al decir su nombre, lo levanta: lo ha leído
  const un = tramo(t, ENTRA - 0.25, ANIO - 0.15), nx = Math.round(lerp(-20, 132, ease(un)));
  const alza = ease(tramo(t, NOMBRE - 0.05, NOMBRE + 0.3)), ndir = t > PROF + 0.9 ? -1 : 1;
  const nb = R.actor(EL.newbold, nx, 146, t, { dir: ndir, anda: un > 0 && un < 1, sostiene: alza > 0 ? [nx + 7 + ndir * 6, 108] : true, sorpresa: t > ANIO + 0.05 && t < ANIO + 0.6, sonrisa: t > NOMBRE, habla: t > PROF + 1.3 && t < NOMBRE - 0.1 && parpadeo(t, 7) });
  { const [mx, my] = nb.mano; PIEZAS_VM.libroVoynich(R, mx + ndir * 2, my + 4, {}); if (alza > 0.9 && t < P2 - 0.1) { destello(mx - 10, my - 14 + (parpadeo(t, 9) ? 1 : 0), 2); destello(mx + 10, my - 6, 2); } }
  if (t > NOMBRE + 0.35) R.bocadillo(nx + (ndir > 0 ? 18 : -4), 100 + (parpadeo(t, 5) ? 1 : 0), {});
  T.descifradoresDelante(R, t, { encuadre: 'filadelfia' });
};
// 2 · la celda de Roger Bacon, como la imagina Newbold
const ESCRIBE = @10.35@, LUPA = @10.9@, BACON = @12.1@;
const ARC = [229, 66, 30, 106];
const p2 = (t) => {
  fijo('celda', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // las vigas del techo (tranquilas bajo el año) y el muro de sillares
    for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 15 || y % 5 === 4 ? Q.nogD : (hh(x >> 3, y, 1) > 0.85 ? Q.nog : Q.nogS));
    sillar(0, 16, 319, 141, Q.muro, Q.muroL, Q.muroS, Q.muroD, 9, 18, 2);
    marcoArco(ARC[0], ARC[1], ARC[2], ARC[3], Q.muroL, Q.muroD);
    rect(193, 107, 265, 111, Q.k); rect(194, 107, 264, 110, Q.piedraL); rect(194, 110, 264, 110, Q.piedraS);
    // la carta del cielo clavada en el muro: un pergamino con la rueda de estrellas y sus rayos
    rect(96, 30, 150, 82, Q.k); rect(97, 31, 149, 81, Q.perg); rect(97, 31, 149, 32, Q.pergL); rect(97, 80, 149, 81, Q.pergS);
    for (const r of [20, 14, 7]) for (let a = 0; a < 6.283; a += 0.05) pset(Math.round(123 + Math.cos(a) * r), Math.round(56 + Math.sin(a) * r), r === 20 ? Q.tintaL : Q.tinta);
    for (let i = 0; i < 12; i++) { const a = i * 0.5236; linea(Math.round(123 + Math.cos(a) * 8), Math.round(56 + Math.sin(a) * 8), Math.round(123 + Math.cos(a) * 19), Math.round(56 + Math.sin(a) * 19), Q.pergD); pset(Math.round(123 + Math.cos(a + 0.26) * 17), Math.round(56 + Math.sin(a + 0.26) * 17), Q.rojoS); }
    disco(123, 56, 3, Q.oroS); disco(123, 56, 2, Q.oro); rect(99, 33, 102, 35, Q.bronce); rect(144, 33, 147, 35, Q.bronce);
    // el manojo de hierbas colgado de un clavo
    linea(170, 22, 170, 30, Q.k); for (let i = -4; i <= 4; i++) linea(170, 30, 170 + i, 50 + Math.abs(i), i % 2 ? Q.hierbaS : Q.hierba); rect(167, 29, 173, 32, Q.tercS);
    // la estantería de la izquierda: libros, rollos y albarelos
    rect(4, 28, 76, 142, Q.nogD); rect(7, 31, 73, 140, Q.nogS);
    for (const y of [56, 82, 108, 134]) { rect(5, y, 75, y + 2, Q.nog); rect(5, y, 75, y, Q.nogL); }
    let i = 0; for (const y of [56, 82]) { let x = 9; while (x < 70) { const w = 3 + Math.floor(hh(i, y, 3) * 3), hg = 14 + Math.floor(hh(i, y, 4) * 7), c = [Q.rojoS, Q.verdeS, Q.nog, Q.tercS, Q.amarS, Q.bronceS, Q.lilaS][i % 7];
      if (hh(i, y, 8) > 0.86 && x < 62) { poligono([[x, y - 1], [x + 3, y - 1], [x + 9, y - hg + 3], [x + 6, y - hg + 3]], c); x += 10; } else { rect(x, y - hg, x + w - 1, y - 1, c); rect(x, y - hg, x, y - 1, mez(c, Q.blanco, 0.3)); pset(x + 1, y - hg + 3, Q.oro); pset(x + 1, y - 4, Q.oro); x += w; } i++; } }
    for (let k = 0; k < 6; k++) { const x = 13 + k * 10; disco(x, 103, 4, Q.k); disco(x, 103, 3, Q.perg); disco(x, 103, 1, Q.pergD); }
    for (let k = 0; k < 5; k++) { const x = 18 + k * 10; disco(x, 95, 4, Q.k); disco(x, 95, 3, Q.pergL); disco(x, 95, 1, Q.pergS); }
    for (const [x, c] of [[15, Q.aguaS], [31, Q.verdeS], [47, Q.bronce], [63, Q.tercS]]) { rect(x - 5, 117, x + 5, 133, Q.k); rect(x - 4, 118, x + 4, 132, c); rect(x - 4, 122, x + 4, 126, Q.papel); renglon(x - 3, 123, 7, x, Q.tinta); rect(x - 3, 114, x + 3, 117, Q.k); rect(x - 2, 115, x + 2, 116, Q.nogL); pset(x - 3, 119, Q.blanco); }
    // el suelo de losas y la estera de juncos bajo el atril
    for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 142) / 10), j = (y - 142) % 10, xo = x + (f % 2) * 16, o = xo % 32; let c = hh(Math.floor(xo / 32), f, 6) > 0.6 ? Q.piedraS : Q.piedra; if (j === 9 || o === 31) c = Q.piedraD; else if (j === 0) c = mez(c, Q.piedraL, 0.4); if (hh(x, y, 7) > 0.95) c = Q.piedraD; pset(x, y, mez(c, Q.nogS, 0.3)); }
    for (let y = 151; y < 167; y++) for (let x = 100; x < 192; x++) pset(x, y, y === 151 || y === 166 ? Q.gravaD : (x + (y % 2) * 2) % 4 === 0 ? Q.gravaS : Q.grava);
    // el atril de roble: la tabla inclinada, el poste y los pies
    poligono([[140, 134], [178, 128], [180, 134], [142, 140]], Q.k); poligono([[141, 134], [177, 129], [178, 133], [142, 138]], Q.roble); linea(142, 138, 178, 133, Q.robleD);
    rect(157, 138, 161, 160, Q.k); rect(158, 138, 160, 159, Q.roble); pset(158, 145, Q.robleL); pset(158, 152, Q.robleL);
    rect(146, 158, 172, 162, Q.k); rect(147, 159, 171, 161, Q.robleS);
    // la mesa de la derecha: el tablero, las patas, el travesaño; encima, la palmatoria, la lente, los códices y el matraz
    rect(196, 136, 319, 141, Q.k); rect(197, 137, 319, 140, Q.nog); rect(197, 137, 319, 137, Q.nogL); madera(198, 141, 319, 147, Q.nogS, Q.nog, Q.nogD, Q.k, 7, 4);
    for (const x of [202, 300]) { rect(x, 147, x + 6, 179, Q.k); rect(x + 1, 147, x + 5, 179, Q.nogS); rect(x + 1, 147, x + 1, 179, Q.nog); }
    rect(208, 167, 300, 170, Q.k); rect(208, 168, 300, 169, Q.nogS);
    rect(204, 133, 220, 136, Q.k); rect(205, 133, 219, 135, Q.bronce); rect(210, 118, 214, 133, Q.k); rect(211, 118, 213, 133, Q.papel); pset(211, 120, Q.blanco);
    rect(235, 116, 237, 136, Q.k); rect(236, 116, 236, 135, Q.bronce); rect(230, 134, 242, 136, Q.bronceS); disco(236, 108, 8, Q.k); disco(236, 108, 7, Q.bronce); disco(236, 108, 5, Q.aguaL); pset(233, 105, Q.blanco); pset(234, 106, Q.blanco);
    for (const [y, c] of [[129, Q.tercS], [123, Q.verdeS], [117, Q.nog]]) { rect(250, y, 278, y + 6, Q.k); rect(251, y + 1, 277, y + 5, c); rect(251, y + 1, 251, y + 5, Q.pergL); rect(252, y + 2, 276, y + 2, mez(c, Q.blanco, 0.25)); }
    disco(296, 128, 8, Q.k); rect(293, 108, 299, 122, Q.k); disco(296, 128, 7, Q.vidrioL); rect(294, 109, 298, 121, Q.vidrioL); for (let y = 126; y < 135; y++) for (let x = 289; x < 304; x++) if (Math.hypot(x - 296, y - 128) < 7) pset(x, y, y < 128 ? Q.hierbaL : Q.hierba); pset(293, 124, Q.blanco);
  });
  // la noche de Oxford por la ventana: cielo tramado, estrellas, la luna, nubes y las torres con sus ventanas
  const [cx, ys, a, yb] = ARC, pin = (x, y, c) => { if (enArco(x, y, cx, ys, a, yb)) R.pset(x, y, c); };
  for (let y = ys - 46; y <= yb; y++) for (let x = cx - a; x <= cx + a; x++) { if (!enArco(x, y, cx, ys, a, yb)) continue; const v = (y - 20) / 86 + (((x + y * 2) % 4) / 4) * 0.22; R.pset(x, y, v < 0.42 ? Q.noct : v < 0.78 ? Q.noche : Q.noche2); }
  for (let k = 0; k < 16; k++) pin(cx - a + 2 + (k * 37) % (2 * a - 4), 26 + (k * 23) % 46, Math.sin(t * 3 + k * 1.7) > 0.3 ? Q.blanco : Q.grisS);
  for (let dy = -6; dy <= 6; dy++) for (let dx = -6; dx <= 6; dx++) { const r = Math.hypot(dx, dy); if (r <= 6) pin(246 + dx, 42 + dy, r > 5.2 ? Q.papelS : (dx + dy > 3 ? Q.papelS : Q.papel)); }
  for (let k = 0; k < 3; k++) { const nx0 = ((t * (3 + k * 2) + k * 41) % 110) + 170; for (const [dx, dy, r] of [[0, 0, 6], [7, 1, 5], [-6, 2, 4]]) for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) if (xx * xx + yy * yy <= r * r) pin(Math.round(nx0 + dx + xx), 34 + k * 16 + dy + yy, yy < -r / 2 ? Q.noche3 : mez(Q.noche2, Q.noche3, 0.4)); }
  const alto = (x) => { let h = 92 + Math.abs(((x - 200) % 12) - 6);
    if (Math.abs(x - 213) <= 6) h = Math.min(h, 58 + Math.abs(x - 213) * 4);
    if (x >= 234 && x <= 244) h = Math.min(h, x % 3 === 0 ? 70 : 72);
    { const d = x - 254; if (Math.abs(d) <= 8) h = Math.min(h, Math.round(84 - Math.sqrt(64 - d * d))); if (Math.abs(d) <= 1) h = Math.min(h, 72); }
    return h; };
  for (let x = cx - a; x <= cx + a; x++) { const h = alto(x); for (let y = h; y <= yb; y++) pin(x, y, y === h ? Q.noche3 : Q.vidrioS); }
  for (const [x, y] of [[214, 82], [238, 78], [238, 86], [253, 90], [206, 99], [224, 100], [246, 101], [218, 100]]) pin(x, y, Math.sin(t * 0.7 + x) > -0.6 ? Q.ventL : Q.ventS);
  { const u = ((t - P2) * 0.22 + 0.1) % 1, bx = Math.round(cx - a + u * 2 * a), by = Math.round(50 + Math.sin(u * 9) * 4), al = parpadeo(t, 10);
    for (const [dx, dy] of [[0, 0], [-1, al ? -1 : 0], [1, al ? -1 : 0], [-2, al ? -2 : 1], [2, al ? -2 : 1]]) pin(bx + dx, by + dy, Q.k); }
  // el parteluz y el óculo de la tracería
  R.rect(cx - 1, ys - 14, cx + 1, yb, Q.muroD); R.linea(cx, ys - 14, cx, yb, Q.muroL);
  for (let q = 0; q < 6.283; q += 0.04) { R.pset(Math.round(cx + Math.cos(q) * 8), Math.round(ys - 26 + Math.sin(q) * 8), Q.muroD); R.pset(Math.round(cx + Math.cos(q) * 7), Math.round(ys - 26 + Math.sin(q) * 7), Q.muroL); }
  R.rect(cx - a, ys + 14, cx + a, ys + 15, Q.muroD);
  // la esfera armilar de la estantería, que gira
  { const sx = 40, sy = 20; R.rect(39, 24, 41, 28, Q.bronceS); for (let q = 0; q < 6.283; q += 0.08) { R.pset(Math.round(sx + Math.cos(q) * 7), Math.round(sy + Math.sin(q) * 4), Q.bronce); R.pset(Math.round(sx + Math.cos(q) * 7 * Math.cos(t * 1.2)), Math.round(sy + Math.sin(q) * 6), Q.oro); } R.disco(sx, sy, 1, Q.oroL); }
  // el reloj de arena en la balda: la arena cae
  { const x = 66, y = 128; R.rect(x - 4, y - 14, x + 4, y - 13, Q.nog); R.rect(x - 4, y, x + 4, y + 1, Q.nog); const v = ((t - P2) / 6) % 1;
    R.poligono([[x - 3, y - 12], [x + 3, y - 12], [x, y - 6]], Q.vidrioL); R.poligono([[x - 3, y - 1], [x + 3, y - 1], [x, y - 6]], Q.vidrioL);
    R.poligono([[x - 2 + Math.round(v * 2), y - 11 + Math.round(v * 4)], [x + 2 - Math.round(v * 2), y - 11 + Math.round(v * 4)], [x, y - 7]], Q.grava); R.rect(x - 2, y - 1 - Math.round(v * 3), x + 2, y - 1, Q.grava); if (parpadeo(t, 20)) R.pset(x, y - 4, Q.grava); }
  // fray Roger escribe en el libro; deja la pluma y lo mira con la lente; al decir su nombre se vuelve y sonríe
  const escribe = t < ESCRIBE, conLupa = t > LUPA && t < BACON, gira = t > BACON + 0.05, jx = escribe ? Math.round(Math.sin(t * 18) * 1.5) : 0;
  const ba = R.actor(EL.copista, 120, 150, t, { dir: gira ? -1 : 1, sostiene: gira ? undefined : conLupa ? [148, 122] : escribe ? [146 + jx, 128] : undefined, dedo: gira && t < BACON + 1.0, sonrisa: gira, sorpresa: t > LUPA + 0.4 && t < LUPA + 0.8 });
  PIEZAS_VM.libroVoynich(R, 160, 133, { abierto: true, pagina: 'planta', brilla: t > BACON, t });
  if (escribe) { const [mx, my] = ba.mano; PIEZAS_VM.pluma(R, mx + 5, my + 2, {}); }
  if (conLupa) { const [mx, my] = ba.mano; PIEZAS_VM.lupa(R, mx + 4, my + 6, {}); }
  if (t > BACON) for (let k = 0; k < 4; k++) { const g = (t - BACON) * 3 + k * 1.57; destello(160 + Math.cos(g) * 24, 122 + Math.sin(g) * 10, 2); }
  // la llama de la vela que titila, con su resplandor; las burbujas del matraz
  { const fl = Math.sin(t * 13) + Math.sin(t * 7.3), hx = 212 + (fl > 1.2 ? 1 : 0); R.poligono([[hx - 2, 117], [hx + 2, 117], [hx, 110 - (fl > 0 ? 1 : 0)]], Q.vela); R.rect(hx - 1, 114, hx + 1, 117, Q.velaL); R.pset(212, 118, Q.k); halo(212, 114, 40, 0.16 + fl * 0.02, Q.vela); }
  for (let k = 0; k < 3; k++) { const v = ((t * 0.8 + k * 0.33) % 1); R.pset(295 + (k % 2) * 2, Math.round(130 - v * 18), Q.hierbaL); if (v > 0.9) R.pset(296, 107 - k, Q.blancoS); }
  // un ratón cruza la celda por delante
  { const u = tramo(t, @8.5@, @10.1@); if (u > 0 && u < 1) { const x = Math.round(lerp(330, -12, u)), y = 175, p = parpadeo(t, 24); R.disco(x, y - 2, 3, Q.k); R.disco(x, y - 2, 2, Q.gris); R.disco(x - 3, y - 4, 1, Q.rosa); R.pset(x - 4, y - 2, Q.k); R.linea(x + 3, y - 2, x + 9, y - 3 - (p ? 1 : 0), Q.rosaS); R.pset(x - 1, y + (p ? 1 : 0), Q.k); R.pset(x + 2, y + (p ? 0 : 1), Q.k); } }
  // el borde en sepia: es lo que imagina Newbold (y al entrar, todo el plano se tiñe un momento)
  const ini = 1 - tramo(t, P2, P2 + 0.7);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 90) / 90), k = Math.max(ini * 0.55, d > 0.74 ? (d - 0.74) * 1.6 : 0); if (k > 0.02) tine(x, y, Math.min(0.6, k), Q.sepD); }
};
// 3 · por el microscopio: las grietas de la tinta y la mosca
const MARCAS_T = @14.5@, MOSCA = @15.25@, MICRO = @18.55@;
const p3 = (t) => {
  const g = ease(tramo(t, MARCAS_T, MARCAS_T + 0.8)), m = tramo(t, MOSCA, MICRO);
  T.descifradores(R, t, { encuadre: 'filadelfia', camara: 'ocular', grietas: g, mosca: m });
  if (m > 0.36 && m < 0.66) R.bocadillo(236, 52 + (parpadeo(t, 6) ? 1 : 0), {});
};
// 4 · la rotativa del periódico: los periódicos se vuelven locos
const PAPELES = @19.62@, LOCOS = @19.99@, PORTADA = @20.3@;
const VUELA = Array.from({ length: 22 }, (_, i) => ({ vx: -70 + hh(i, 1, 2) * 150, vy: -110 + hh(i, 2, 3) * 50, sp: 6 + hh(i, 3, 4) * 10, d: i * 0.035 }));
const p4 = (t) => {
  fijo('rotativa', () => {
    const { rect, pset, linea, poligono, disco } = R;
    // la viga de hierro del techo con sus remaches (tranquila bajo el año)
    for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 2 || y > 11 ? Q.hierD : y === 2 ? Q.hierS : Q.negro);
    for (let x = 6; x < 320; x += 12) { pset(x, 4, Q.hierS); pset(x, 9, Q.hierS); }
    // la pared de ladrillo, el zócalo de cemento y el suelo de tablones con manchas de tinta y recortes
    ladrillo(0, 14, 319, 127, 4);
    rect(0, 126, 319, 131, Q.aceraS); rect(0, 126, 319, 126, Q.aceraL);
    madera(0, 132, 319, 179, Q.gris, Q.grisL, Q.grisS, Q.negro, 8, 5);
    for (const [x, y, r] of [[30, 172, 4], [150, 166, 3], [262, 176, 5], [210, 160, 2], [96, 176, 3]]) { disco(x, y, r, Q.negro); disco(x - 1, y - 1, r - 1, Q.tintaN); }
    for (const [x, y] of [[70, 150], [180, 172], [300, 158], [118, 160]]) { poligono([[x, y], [x + 6, y - 1], [x + 7, y + 3], [x + 1, y + 4]], Q.papel); linea(x + 1, y + 1, x + 5, y + 1, Q.grisL); }
    // la ventana de fábrica (el exterior se pinta en cada fotograma)
    rect(203, 21, 267, 97, Q.k); rect(201, 97, 269, 100, Q.aceraL);
    // el reloj de la pared
    disco(288, 70, 11, Q.k); disco(288, 70, 10, Q.bronce); disco(288, 70, 8, Q.papel); for (let a = 0; a < 6.28; a += 0.524) pset(Math.round(288 + Math.cos(a) * 7), Math.round(70 + Math.sin(a) * 7), Q.k);
    // las bobinas de papel de repuesto y las latas de tinta
    for (const [x, y] of [[282, 118], [306, 118], [294, 100]]) { disco(x, y, 10, Q.k); disco(x, y, 9, Q.papel); disco(x, y, 6, Q.papelS); disco(x, y, 3, Q.nog); disco(x, y, 2, Q.nogD); }
    for (const x of [246, 258]) { rect(x - 5, 112, x + 5, 129, Q.k); rect(x - 4, 113, x + 4, 128, Q.rojoS); rect(x - 4, 117, x + 4, 120, Q.papel); rect(x - 4, 113, x + 4, 113, Q.grisL); }
    // la mesa de salida a la derecha de la máquina
    rect(196, 128, 264, 132, Q.k); rect(197, 129, 263, 131, Q.nog); rect(197, 129, 263, 129, Q.nogL);
    for (const x of [199, 258]) { rect(x, 132, x + 4, 160, Q.k); rect(x + 1, 132, x + 3, 160, Q.nogS); }
    // la rotativa: la plancha de hierro verde con remaches, la batea de tinta, el volante rojo y el pie
    rect(62, 58, 186, 150, Q.k); rect(63, 59, 185, 149, Q.hier); rect(63, 59, 185, 61, Q.hierL); rect(63, 146, 185, 149, Q.hierS);
    for (let x = 66; x < 184; x += 7) { pset(x, 63, Q.hierL); pset(x, 144, Q.hierL); } for (let y = 66; y < 144; y += 7) { pset(66, y, Q.hierL); pset(182, y, Q.hierL); }
    rect(78, 52, 142, 58, Q.k); rect(79, 53, 141, 57, Q.hierS); rect(80, 54, 140, 55, Q.tintaN);
    rect(56, 148, 192, 156, Q.k); rect(57, 149, 191, 155, Q.hierS);
    rect(166, 66, 182, 82, Q.k); rect(167, 67, 181, 81, Q.negro); for (const [x, y] of [[171, 72], [177, 72], [171, 77], [177, 77]]) pset(x, y, Q.ventS);
    // el soporte de la bobina madre a la izquierda
    rect(8, 120, 44, 124, Q.k); rect(9, 121, 43, 123, Q.hierS); for (const x of [10, 38]) { rect(x, 124, x + 4, 152, Q.k); rect(x + 1, 124, x + 3, 152, Q.hier); }
  });
  // por la ventana: el cielo, las nubes, los tejados y la chimenea que humea
  R.recorte([204, 22, 266, 96]);
  for (let y = 22; y <= 96; y++) R.linea(204, y, 266, y, y < 46 ? Q.c2 : y < 70 ? Q.c3 : Q.c4);
  for (let k = 0; k < 3; k++) { const x = ((t * (2 + k * 1.5) + k * 37) % 100) + 190; nube(Math.round(x), 30 + k * 12, 14 + k * 4); }
  R.poligono([[204, 96], [204, 74], [220, 66], [236, 74], [236, 96]], Q.ladrS); R.poligono([[234, 96], [234, 80], [266, 80], [266, 96]], Q.ladr); R.rect(246, 44, 252, 80, Q.ladrD); R.rect(245, 42, 253, 44, Q.k);
  for (let k = 0; k < 6; k++) { const v = ((t * 0.35 + k / 6) % 1); R.disco(Math.round(249 + v * 18 + Math.sin(t + k) * 2), Math.round(40 - v * 22), 2 + Math.round(v * 3), mez(Q.grisL, Q.c3, v)); }
  for (const [x, y] of [[210, 84], [222, 84], [242, 88], [256, 88]]) R.rect(x, y, x + 3, y + 3, Q.ventS);
  R.recorte(null);
  for (const x of [224, 245]) R.rect(x, 22, x + 1, 96, Q.k); for (const y of [46, 71]) R.rect(204, y, 266, y + 1, Q.k);
  // los haces de luz de la ventana con sus motas
  for (let y = 98; y < 176; y++) { const x0 = Math.round(204 - (y - 98) * 0.9); for (let x = x0; x < x0 + 50; x += 2) tine(x + (y % 2), y, 0.08, Q.amarL); }
  for (let k = 0; k < 10; k++) { const v = (t * 0.06 + k * 0.1) % 1; R.pset(Math.round(180 - v * 60 + k * 4), Math.round(100 + v * 70), Q.amarL); }
  // las agujas del reloj y las lámparas que se mecen
  { const a = t * 0.3 - 1.5; R.linea(288, 70, Math.round(288 + Math.cos(a) * 6), Math.round(70 + Math.sin(a) * 6), Q.k); R.linea(288, 70, Math.round(288 + Math.cos(t * 0.03 + 2) * 4), Math.round(70 + Math.sin(t * 0.03 + 2) * 4), Q.k); }
  lamparaColgante(110, 14, 16, t, 0); lamparaColgante(176, 14, 12, t, 2);
  // la bobina madre que gira, el papel que corre por los rodillos y el volante rojo
  const g = t * 6;
  { R.disco(26, 136, 14, Q.k); R.disco(26, 136, 13, Q.papel); R.disco(26, 136, 9, Q.papelS); R.disco(26, 136, 4, Q.hierS); for (let k = 0; k < 3; k++) { const q = g * 0.6 + k * 2.09; R.pset(Math.round(26 + Math.cos(q) * 11), Math.round(136 + Math.sin(q) * 11), Q.grisL); } }
  { const cx = 46, cy = 92; R.disco(cx, cy, 17, Q.k); R.disco(cx, cy, 16, Q.rojoS); R.disco(cx, cy, 13, Q.k); R.disco(cx, cy, 12, Q.hierS); for (let k = 0; k < 6; k++) { const q = g + k * 1.047; R.linea(cx, cy, Math.round(cx + Math.cos(q) * 12), Math.round(cy + Math.sin(q) * 12), Q.rojo); } R.disco(cx, cy, 3, Q.rojoL); R.linea(cx + 10, cy - 12, 88, 70, Q.negro); R.linea(cx + 12, cy + 10, 88, 94, Q.negro); }
  const PAPEL = [[26, 122], [82, 66], [130, 66], [156, 80], [178, 104], [194, 114]];
  for (let i = 0; i < PAPEL.length - 1; i++) { const [x0, y0] = PAPEL[i], [x1, y1] = PAPEL[i + 1]; R.linea(x0, y0, x1, y1, Q.papel); R.linea(x0, y0 + 1, x1, y1 + 1, Q.papelS); const n = Math.hypot(x1 - x0, y1 - y0); for (let s = ((t * 40) % 6); s < n; s += 6) R.pset(Math.round(x0 + (x1 - x0) * s / n), Math.round(y0 + (y1 - y0) * s / n), Q.grisS); }
  for (const [x, y, r] of [[92, 82, 12], [128, 82, 12], [92, 120, 12], [128, 120, 12], [160, 100, 17]]) { R.disco(x, y, r + 1, Q.k); R.disco(x, y, r, Q.gris); R.disco(x - 2, y - 2, r - 4, Q.grisL); R.disco(x, y, 3, Q.k); for (let k = 0; k < 4; k++) { const q = (r > 14 ? -g : g) + k * 1.571; R.linea(Math.round(x + Math.cos(q) * 4), Math.round(y + Math.sin(q) * 4), Math.round(x + Math.cos(q) * (r - 1)), Math.round(y + Math.sin(q) * (r - 1)), Q.grisS); } }
  { const a = Math.sin(t * 9) * 0.3 - 0.6; R.disco(174, 64, 5, Q.k); R.disco(174, 64, 4, Q.papel); R.linea(174, 64, Math.round(174 + Math.cos(a) * 3), Math.round(64 + Math.sin(a) * 3), Q.rojo); }
  // el montón de periódicos en la mesa: crece hasta que salen todos volando
  const salen = t > PAPELES, n = salen ? 2 : Math.min(9, Math.floor((t - P4) * 6));
  for (let k = 0; k < n; k++) { R.rect(206, 127 - k, 240, 127 - k, k % 2 ? Q.papelS : Q.papel); } R.rect(206, 128 - Math.max(1, n), 206, 127, Q.grisS);
  if (!salen) { const u = ((t - P4) * 3) % 1; R.rect(Math.round(194 + u * 14), 112 + Math.round(u * 12), Math.round(206 + u * 14), 115 + Math.round(u * 12), Q.papel); }
  // el prensista engrasa la máquina y mira arriba cuando estallan los papeles
  const pr = R.actor(EL.aprendiz, 52, 168, t, { dir: 1, sostiene: !salen ? [66, 150 + (parpadeo(t, 4) ? 1 : 0)] : undefined, sorpresa: salen && t < LOCOS + 0.5, sonrisa: t > LOCOS + 0.5 });
  if (!salen) { const [mx, my] = pr.mano; R.rect(mx, my - 3, mx + 4, my + 1, Q.k); R.rect(mx + 1, my - 2, mx + 3, my, Q.bronce); R.linea(mx + 4, my - 2, mx + 7, my - 5, Q.k); }
  // el redactor con su visera lee un ejemplar; con «went wild» levanta los brazos
  const ed = R.actor(EL.periodista, 226, 168, t, { dir: -1, sostiene: t < LOCOS ? [214, 150] : undefined, brazos: t > LOCOS && t < LOCOS + 1.0, sorpresa: t > PAPELES && t < LOCOS + 0.3, sonrisa: t > LOCOS + 0.3 });
  if (t < LOCOS) { const [mx, my] = ed.mano; R.rect(mx - 6, my - 8, mx + 2, my + 2, Q.k); R.rect(mx - 5, my - 7, mx + 1, my + 1, Q.papel); for (let y = my - 5; y < my; y += 2) R.linea(mx - 4, y, mx, y, Q.grisS); }
  // el repartidor entra, coge un fajo y sale corriendo
  { const u1 = tramo(t, @19.1@, @19.9@), u2 = tramo(t, @20.9@, @22.2@), x = Math.round(u2 > 0 ? lerp(280, 344, u2) : lerp(340, 280, ease(u1)));
    const rp = R.actor(EL.aprendiz2, x, 170, t, { dir: u2 > 0 ? 1 : -1, anda: (u1 > 0 && u1 < 1) || u2 > 0, sostiene: t > @20.5@ ? true : undefined, sonrisa: t > @20.5@, habla: t > @20.6@ && parpadeo(t, 8) });
    if (t > @20.5@) { const [mx, my] = rp.mano; R.rect(mx - 4, my - 4, mx + 5, my + 3, Q.k); R.rect(mx - 3, my - 3, mx + 4, my + 2, Q.papel); R.linea(mx - 3, my, mx + 4, my, Q.tercS); } }
  // los periódicos vuelan por toda la sala dando vueltas
  if (salen) for (let i = 0; i < VUELA.length; i++) { const p = VUELA[i], dt = t - PAPELES - p.d; if (dt <= 0) continue;
    const x = Math.round(222 + p.vx * dt + Math.sin(dt * 3 + i) * 8), y = Math.round(118 + p.vy * dt + 70 * dt * dt), w = Math.max(1, Math.round(Math.abs(Math.cos(dt * p.sp)) * 6));
    if (y > 182 || x < -10 || x > 330) continue; R.rect(x - w - 1, y - 4, x + w + 1, y + 4, Q.k); R.rect(x - w, y - 3, x + w, y + 3, Q.papel); if (w > 2) { R.rect(x - w + 1, y - 2, x + w - 1, y - 2, Q.negro); R.linea(x - w + 1, y, x + w - 1, y, Q.grisL); } }
  // la portada que cae delante: la cabecera en barras, el libro, el «!» rojo, las columnas y el año
  { const u = tramo(t, PORTADA, PORTADA + 0.7); if (u > 0) { const e = ease(u), x0 = Math.round(118 + Math.sin(u * 7) * (1 - e) * 14), y0 = Math.round(lerp(190, 112, e) - Math.sin(u * Math.PI) * 10);
    R.rect(x0 + 2, y0 + 2, x0 + 86, y0 + 66, mez(Q.gris, Q.k, 0.4)); R.rect(x0 - 1, y0 - 1, x0 + 84, y0 + 64, Q.k); R.rect(x0, y0, x0 + 83, y0 + 63, Q.papel); R.rect(x0, y0 + 62, x0 + 83, y0 + 63, Q.papelS);
    R.rect(x0 + 4, y0 + 3, x0 + 79, y0 + 10, Q.negro); for (let x = x0 + 6; x < x0 + 78; x += 6) R.rect(x, y0 + 5, x + 3, y0 + 8, Q.papelS); R.linea(x0 + 4, y0 + 12, x0 + 79, y0 + 12, Q.negro);
    R.rect(x0 + 6, y0 + 16, x0 + 50, y0 + 38, Q.papelS); PIEZAS_VM.libroVoynich(R, x0 + 28, y0 + 36, { abierto: true, pagina: 'estrellas' });
    R.icono('!', x0 + 58, y0 + 14, Q.rojo, Q.rojoS, 4);
    for (let c = 0; c < 4; c++) for (let y = y0 + 42; y < y0 + 60; y += 3) R.linea(x0 + 5 + c * 19, y, x0 + 20 + c * 19 - (hh(c, y, 2) > 0.7 ? 5 : 0), y, Q.grisS);
    R.numero('1921', x0 + 72, y0 + 41, { color: Q.k, sombra: false, fina: true, centro: true }); } }
};
const efectos = [
  [ENTRA, 'puerta'], [ANIO + 0.05, 'papel'], [PROF + 1.2, 'toc'], [NOMBRE + 0.1, 'brillo'], [NOMBRE + 0.4, 'pop'],
  [P2 + 0.3, 'lapiz'], [@8.6@, 'tic'], [LUPA, 'golpecito'], [BACON + 0.05, 'brillo'],
  [MARCAS_T + 0.1, 'brillo'], [MOSCA + 0.2, 'zumbido'], [@17.6@, 'whoosh'],
  [P4 + 0.05, 'maquina'], [PAPELES, 'whoosh'], [LOCOS + 0.1, 'papel'], [PORTADA + 0.6, 'chof'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, cartela: '1921', año: 1921 });
'''))
