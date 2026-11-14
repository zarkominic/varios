E = {}

# Comunes a las tres escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = T.C.k;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tiñe = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const nubecilla = (x, y, r, c, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) tiñe(x + i, y + j, c, a); };
const FIJOS = new Map();
// un fondo quieto se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (clave, dibuja) => { let b = FIJOS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); dibuja(); R.usar(prev); FIJOS.set(clave, b); } R.copiar(b); };
// el rollo sellado de una orden en la mano (x, y): pergamino enrollado con el sello rojo colgando
const rolloSellado = (x, y, abierto = 0) => {
  x = Math.round(x); y = Math.round(y);
  const L = Math.round(4 + abierto * 9);
  R.rect(x - 2, y - 2, x + 2, y + L, K); R.rect(x - 1, y - 1, x + 1, y + L - 1, hex('#ecdcb0')); R.rect(x + 1, y - 1, x + 1, y + L - 1, hex('#c8b080'));
  R.rect(x - 3, y - 3, x + 3, y - 2, hex('#a08a5a'));
  R.linea(x, y + L, x + 1, y + L + 3, hex('#c8303a')); R.disco(x + 1, y + L + 5, 2, hex('#6a1a1e')); R.disco(x + 1, y + L + 4, 1.6, hex('#c8303a')); R.pset(x, y + L + 3, hex('#e86a6a'));
};
// una antorcha en la mano (x, y): mango, estopa y la llama que tiembla con su halo de chispas
const antorcha = (x, y, t, k = 0) => {
  x = Math.round(x); y = Math.round(y);
  R.linea(x, y + 3, x, y - 6, hex('#3a2414')); R.linea(x + 1, y + 3, x + 1, y - 6, hex('#6a4426'));
  R.rect(x - 1, y - 8, x + 2, y - 6, hex('#2a1a10')); R.pset(x, y - 8, hex('#5a3a20'));
  const f = Math.sin(t * 17 + k * 2.1), g = Math.sin(t * 11 + k);
  for (let j = 0; j < 8; j++) { const w = Math.max(0, Math.round((8 - j) / 3 + (j < 3 ? 0.5 : 0))), dx = Math.round((f * j) / 5);
    for (let i = -w; i <= w + 1; i++) { const r = Math.abs(i - 0.5) / (w + 1); R.pset(x + i + dx, y - 9 - j, j > 5 ? hex('#e84a1a') : r < 0.35 && j < 4 ? hex('#fff6c0') : r < 0.7 ? hex('#ffc040') : hex('#f07a20')); } }
  if (g > 0.3) R.pset(x + 2 + Math.round(f * 2), y - 19 - Math.round(g * 2), hex('#ffc040'));
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j * 1.1); if (d < 14 && d > 5 && hh(x + i, y + j, Math.floor(t * 8)) < 0.5) tiñe(x + i, y - 12 + j, hex('#ffb040'), 0.16 * (1 - d / 14)); }
};
// polvo o salpicaduras detrás de un caballo que corre
const polvo = (x, suelo, t, c = '#a89070', k = 0) => { for (let i = 0; i < 5; i++) { const u = (t * 3 + i / 5 + k * 0.3) % 1; nubecilla(Math.round(x - 3 - u * 16), Math.round(suelo - 2 - u * 6), Math.round(1 + u * 2.5), hex(c), 0.5 * (1 - u)); } };
// un jinete: el caballo de lado y el personaje encima (x: borde izquierdo del caballo)
const jinete = (def, x, suelo, t, o = {}) => {
  x = Math.round(x);
  T.b_caballo(R, x, suelo, t, { dir: 1, anda: !!o.anda, silla: true, cola: true, color: o.color });
  const oa = { dir: 1, quieto: true, ...(o.a || {}) };
  if (o.rollo) oa.sostiene = o.alto ? [x + 22, suelo - 40] : [x + 24, suelo - 30];
  const m = R.actor(def, x + 8, suelo - 13, t, oa).mano;
  if (o.rollo) rolloSellado(m[0], m[1] - 6, 0);
  if (o.anda && o.polvo !== false) polvo(x, suelo, t, o.polvoCol, o.k || 0);
  return m;
};
'''

E['te-rey'] = ('El rey', '''// TE-REY (frases 14–15), 1307. Cuatro planos:
// 1. (palacio, la mesa de las cuentas) Felipe IV entra con su tesorero; en «Philip» señala el libro y las páginas empiezan
//    a pasar solas, cada vez más deprisa (gag 2): el reguero de pliegos cae por el canto; encima del libro la cuenta sube
//    sin parar; el tesorero lee una lista que se desenrolla hasta el suelo; en «fortune» el rey da un manotazo en la mesa,
//    enfadado (corta en «And in 1307»);
// 2. (palacio, el salón) el escribano escribe la orden en su atril; en «gives the order» el rey se levanta del trono y
//    señala; en «Arrest them all» el escribano sella el rollo y llega un soldado; en «same day» se lo entrega y el soldado
//    se va con él (corta en «The secret orders»);
// 3. (el patio de noche) tres mensajeros a caballo con el rollo sellado en alto; el oficial con la antorcha da la salida
//    («go out»): salen uno tras otro al galope; en «September 14» el oficial dice «14» en un bocadillo (corta en «So»);
// 4. (la calle de noche) dos mensajeros cruzan al galope delante de la puerta del Temple, que sigue cerrada («strikes on
//    the same day»); en «no one can warn» la puerta se entreabre, un templario asoma con un farol, mira a un lado y a
//    otro y no ve a nadie («?»), y vuelve a cerrar.''', COMUN + r'''
const F = (f) => en('felipe', f), Cc = (f) => en('cartas', f);
const P2 = F(0.498), P3 = Cc(-0.005), P4 = Cc(0.490);
const FELIPE = F(0.151), DEBE = F(0.342), FORTUNA = F(0.393);
const ANYO = F(0.527), ORDEN = F(0.666), ARRESTO = F(0.816), MISMO = F(0.919);
const SALEN = Cc(0.104), SEPT = Cc(0.306), CATORCE = Cc(0.338);
const GOLPE = Cc(0.548), NADIE = Cc(0.778), TEMPLE = Cc(0.914);

// ── 1. la mesa de las cuentas: el libro que no se acaba
const lista = (x, y, suelo, L) => {
  // la lista del tesorero: de la mano cae al suelo y se alarga hacia la izquierda
  x = Math.round(x); y = Math.round(y); const caida = suelo - y, P0 = hex('#efe2bc'), P1 = hex('#c8b488'), Tn = hex('#6a5a48');
  for (let j = 0; j <= caida; j++) { R.pset(x - 2, y + j, K); R.pset(x - 1, y + j, P0); R.pset(x, y + j, P0); R.pset(x + 1, y + j, P1); R.pset(x + 2, y + j, K); if (j % 3 === 1) R.pset(x, y + j, Tn); }
  for (let i = 0; i <= L; i++) { const xx = x - i; R.pset(xx, suelo - 3, K); R.pset(xx, suelo - 2, P0); R.pset(xx, suelo - 1, i % 3 === 1 ? Tn : P0); R.pset(xx, suelo, P1); R.pset(xx, suelo + 1, K); }
  if (L > 2) { const xr = x - L - 2; R.disco(xr, suelo - 1, 2.5, K); R.disco(xr, suelo - 1, 1.6, P0); R.pset(xr, suelo - 1, P1); }
};
const p1 = (t) => {
  const pag = tramo(t, FELIPE - 0.05, P2 + 0.4);
  const g = T.temple(R, t, { encuadre: 'palacio', camara: 'mesa', paginas: pag }), S = g.suelo;
  // el tesorero entra detrás del rey y lee la lista de lo que se debe, que se desenrolla hasta el suelo
  const xe = Math.round(lerp(-8, 20, tramo(t, 0.0, 1.2)));
  const me = R.actor(EL.escribano, xe, S, t, { dir: 1, anda: t < 1.2, sostiene: [xe + 15, S - 16 + Math.round(Math.sin(t * 3) * 0.6)], sorpresa: t > DEBE && t < FORTUNA, triste: t > FORTUNA + 0.2 }).mano;
  lista(me[0] + 1, me[1] + 2, S, Math.round(lerp(0, 34, tramo(t, 1.6, P2))));
  // el rey: entra, señala el libro, se sorprende y en «fortune» da un manotazo en la mesa
  const xf = Math.round(lerp(8, 72, tramo(t, 0.0, 1.5))), anda = t < 1.5;
  const golpe = t > FORTUNA - 0.12 && t < FORTUNA + 0.6;
  const of = { dir: 1, anda, dedo: t > FELIPE && t < DEBE, sorpresa: t > DEBE && t < FORTUNA - 0.12, enfado: t >= FORTUNA - 0.12 };
  if (golpe) of.sostiene = [xf + 21, 139 + Math.round(Math.max(0, Math.sin((t - FORTUNA + 0.12) * 10)) * -4)];
  const mf = R.actor(EL.felipe, xf, S, t, of).mano;
  if (golpe && t > FORTUNA && t < FORTUNA + 0.25) for (const [i, j] of [[3, -4], [5, -1], [4, 3], [-1, -5]]) R.pset(mf[0] + i, mf[1] + j, hex('#fff0c0'));
  // la cuenta que sube encima del libro (una moneda y la cifra)
  if (t > FELIPE) {
    const u = tramo(t, FELIPE, FORTUNA), n = Math.max(1, Math.floor(1 + 998 * u * u * u));
    const bx = 182, by = 116;
    R.rect(bx - 22, by - 11, bx + 24, by + 3, K); R.rect(bx - 21, by - 10, bx + 23, by + 2, hex('#2a1e3a')); R.rect(bx - 21, by - 10, bx + 23, by - 10, hex('#4a3a5a'));
    R.disco(bx - 15, by - 4, 4, K); R.disco(bx - 15, by - 4, 3, hex('#e8b830')); R.pset(bx - 16, by - 5, hex('#fff0a0')); R.pset(bx - 14, by - 3, hex('#a87a18'));
    R.numero(String(n), bx + 5, by + 1, { centro: true });
    R.linea(bx, by + 3, bx, by + 6, K); R.pset(bx - 1, by + 4, K); R.pset(bx + 1, by + 4, K);
    if (t > FORTUNA && Math.floor(t * 6) % 2) for (const [i, j] of [[-24, -12], [26, -12], [-24, 4], [26, 4]]) R.pset(bx + i, by + j, hex('#fff0a0'));
  }
};

// ── 2. el salón: el escribano escribe la orden, el rey la da, se sella y sale con un soldado
const atril = (x, S, t, escribe) => {
  const M0 = hex('#5a3a20'), M1 = hex('#8a5a30'), M2 = hex('#b07a40');
  R.rect(x - 1, S - 15, x + 2, S, K); R.rect(x, S - 15, x + 1, S - 1, M1); R.pset(x, S - 12, M2);
  R.rect(x - 5, S - 1, x + 6, S, K); R.rect(x - 4, S - 1, x + 5, S - 1, M0);
  // el tablero inclinado con el pergamino
  for (let i = -8; i <= 8; i++) { const y = Math.round(S - 17 + i * 0.35); R.pset(x + i, y - 1, K); R.pset(x + i, y, M2); R.pset(x + i, y + 1, M0); R.pset(x + i, y + 2, K); }
  for (let i = -6; i <= 5; i++) { const y = Math.round(S - 19 + i * 0.35); R.pset(x + i, y, hex('#f2e8cc')); R.pset(x + i, y - 1, hex('#f2e8cc')); if (i % 2 && i < (escribe ? Math.floor(t * 4) % 12 - 6 : 5)) R.pset(x + i, y, hex('#6a5a48')); }
  R.rect(x + 7, S - 18, x + 9, S - 16, hex('#2a2a34')); R.pset(x + 8, S - 18, hex('#6a6a7a'));
};
const p2 = (t) => {
  const g = T.temple(R, t, { encuadre: 'palacio' }), S = g.suelo;
  // ya anochece: el salón en penumbra azul y el brillo de las velas
  T.tinte(R, 0, 179, [36, 34, 88], 0.38);
  for (const [cx, cy] of [[80, 110], [240, 110], [160, 120]]) for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j); if (d < 22 && hh(cx + i, cy + j, 5) < 0.7) tiñe(cx + i, cy + j, hex('#ffc070'), 0.14 * (1 - d / 22)); }
  // el rey en el estrado: se levanta y señala en «gives the order»
  const ordena = t > ORDEN && t < ARRESTO + 0.5;
  R.actor(EL.felipe, 153, 128 - (ordena && t < ORDEN + 0.25 ? 2 : 0), t, { dir: -1, dedo: ordena, enfado: ordena, sonrisa: t > MISMO + 0.3 });
  // el soldado entra por la izquierda, recibe el rollo y se va con él
  const entra = tramo(t, ARRESTO - 0.7, ARRESTO + 0.45), sale = tramo(t, MISMO + 0.55, P3 + 0.2);
  const xs = Math.round(sale > 0 ? lerp(66, -26, sale) : lerp(-24, 66, entra)), tiene = t > MISMO + 0.15;
  const os = { dir: sale > 0 ? -1 : 1, anda: (entra > 0 && entra < 1) || (sale > 0 && sale < 1) };
  if (tiene) os.sostiene = sale > 0 ? [xs - 1, S - 20] : [xs + 15, S - 18];
  else if (t > ARRESTO + 0.5) os.dedo = t > ARRESTO + 0.6 && t < ARRESTO + 1.0;
  const ms = R.actor(EL.soldado, xs, S, t, os).mano;
  // el escribano: escribe; en «Arrest» se vuelve, sella el rollo y se lo da
  atril(118, S, t, t < ARRESTO);
  const vuelto = t > ARRESTO - 0.1, xe = 96;
  const oe = { dir: vuelto ? -1 : 1 };
  if (!vuelto) oe.sostiene = [xe + 16 + Math.round(Math.sin(t * 9) * 1.5), S - 19 + Math.round(Math.sin(t * 13))];
  else if (!tiene) oe.sostiene = [xe - 3, S - 18 - Math.round(tramo(t, ARRESTO, ARRESTO + 0.3) * 4)];
  else oe.sonrisa = true;
  const me = R.actor(EL.escribano, xe, S, t, oe).mano;
  if (!vuelto) { R.linea(me[0], me[1], me[0] + 3, me[1] - 6, hex('#f2eee2')); R.pset(me[0] + 4, me[1] - 7, hex('#f2eee2')); }
  else if (!tiene) rolloSellado(me[0], me[1] - 6, 0);
  if (tiene) rolloSellado(ms[0], ms[1] - 6, 0);
  // el lacre que chispea al sellar
  if (t > ARRESTO + 0.1 && t < ARRESTO + 0.5) for (const [i, j] of [[-3, -2], [3, -3], [0, -5]]) R.pset(me[0] + i, me[1] + j, hex('#ff9040'));
};

// ── 3. el patio de noche: los mensajeros salen al galope
const p3 = (t) => {
  const g = T.temple(R, t, { encuadre: 'calle', camara: 'patio', campana: 0 }), S = g.suelo;
  T.tinte(R, 0, 179, [16, 22, 60], 0.55);
  // estrellas y luna sobre el cielo oscurecido
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 1, 901) * 270 + 4), y = Math.round(16 + hh(k, 2, 901) * 40); if ((x > 20 && x < 172 && y < 16) || (x > 274 && y < 48)) continue;
    const c = R.pget(x, y), l = (c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255); if (l < 200 && Math.sin(t * 3 + k * 1.7) > -0.5) R.pset(x, y, hex('#e8ecff')); }
  // el oficial del rey con la antorcha
  const xo = 238, mo = R.actor(EL.soldado, xo, S, t, { dir: -1, sostiene: [xo - 2, S - 17], habla: t > SEPT - 0.1 && t < CATORCE + 0.6 && Math.sin(t * 9) > 0 }).mano;
  antorcha(mo[0], mo[1], t, 1);
  // tres mensajeros con el rollo en alto; salen uno tras otro
  const J = [[EL.soldado, 116, 176, '#6a4a2a'], [EL.soldado, 72, 171, '#8a5a34'], [EL.soldado, 28, 166, '#4a3a2a']];
  for (let k = 2; k >= 0; k--) {
    const [def, x0, sy, col] = J[k], sale = SALEN + k * 0.72, d = Math.max(0, t - sale), x = x0 + 40 * d + 60 * d * d;
    if (x > 340) continue;
    jinete(def, x, sy, t, { anda: d > 0, rollo: true, alto: d <= 0, color: col, k, a: { sonrisa: d > 0 } });
  }
  // el bocadillo con la fecha: «14»
  if (t > CATORCE - 0.05 && t < P4) {
    const bx = 214, by = 96, u = tramo(t, CATORCE - 0.05, CATORCE + 0.15), w = Math.round(17 * u);
    R.rect(bx - w - 1, by - 9, bx + w + 1, by + 9, K); R.rect(bx - w, by - 8, bx + w, by + 8, hex('#f6f2e6')); R.rect(bx - w, by + 7, bx + w, by + 8, hex('#d8d0bc'));
    R.linea(bx + 6, by + 9, bx + 14, by + 20, K); R.linea(bx + 7, by + 9, bx + 13, by + 18, hex('#f6f2e6'));
    if (u > 0.9) R.numero('14', bx, by + 5, { centro: true });
  }
};

// ── 4. la calle de noche: los mensajeros pasan; el templario asoma y no ve a nadie
const farol = (x, y, t) => { x = Math.round(x); y = Math.round(y); R.linea(x, y - 4, x, y, K); R.rect(x - 2, y, x + 2, y + 6, K); R.rect(x - 1, y + 1, x + 1, y + 5, Math.sin(t * 13) > 0 ? hex('#ffd070') : hex('#ffb040'));
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 9 && hh(x + i, y + j, 77) < 0.6) tiñe(x + i, y + 3 + j, hex('#ffd890'), 0.2 * (1 - d / 9)); } };
const p4 = (t) => {
  const pu = tramo(t, NADIE - 0.4, NADIE + 0.05);
  const g = T.temple(R, t, { encuadre: 'calle', luz: 'noche', puerta: pu }), S = g.suelo;
  // el templario que asoma con su farol, mira a un lado y a otro, «?», y se mete
  if (pu > 0.35) {
    const mira = t < NADIE + 0.6 ? -1 : t < TEMPLE - 0.1 ? 1 : -1;
    const m = R.actor(EL.templario2, 215, 147, t, { dir: mira, sostiene: mira > 0 ? [231, 133] : [214, 133], sorpresa: t > TEMPLE - 0.1 && t < TEMPLE + 0.5, parpadea: t < NADIE + 0.3, habla: t > TEMPLE + 0.7 && Math.sin(t * 8) > 0 }).mano;
    farol(m[0], m[1] + 1, t);
    if (t > TEMPLE) R.bocadillo(222, 116, { icono: '?' });
  }
  // dos mensajeros cruzan al galope; el carro y el tonel de delante los tapan al entrar y al salir
  R.recorte([61, 0, 285, 179]);
  const A = tramo(t, P4 - 0.6, P4 + 1.5), B = tramo(t, P4 + 0.2, P4 + 2.3);
  if (B > 0 && B < 1) jinete(EL.soldado, lerp(-30, 330, B), 160, t, { anda: true, rollo: true, color: '#4a3a2a', polvoCol: '#5a6a8a', k: 1 });
  if (A > 0 && A < 1) jinete(EL.soldado, lerp(-40, 330, A), 170, t, { anda: true, rollo: true, color: '#8a5a34', polvoCol: '#6a7a9a' });
  R.recorte(null);
};

const efectos = [[FELIPE + 0.1, 'papel'], [DEBE, 'whoosh'], [FORTUNA + 0.02, 'golpecito'], [ANYO + 0.2, 'lapiz'], [ARRESTO + 0.12, 'sello'],
  [SALEN + 0.05, 'whoosh'], [CATORCE, 'pop'], [P4 + 0.3, 'whoosh'], [NADIE - 0.38, 'puerta']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1307 });
''')

E['te-hoguera'] = ('La hoguera', '''// TE-HOGUERA (frases 16–17), 1312–1314. Cinco planos, sin violencia:
// 1. (fondo local: el concilio de 1312, sala de sillería con vidrieras, dosel, trono y bancos de obispos) los templarios
//    de pie ante el papa, cabizbajos; en «confess» cada uno habla a su turno y el escribano escribe una lista que cae
//    hasta el suelo; en «whatever they're told» el inquisidor señala; el papa alza el sello de plomo (corta en «And in»);
// 2. (el sello de la orden en su mesa, de día) cae desde arriba la bula de plomo del papa y en «dissolves» golpea el
//    pergamino; en «the order» el sello de cera de los templarios se agrieta y salta un trocito (corta en «Their last»);
// 3. (la gran torre por dentro) Molay, mayor y digno, mira la luz de la saetera; un soldado baja la escalera; en
//    «Jacques de Molay» se vuelve; en «burned» el soldado agacha la cabeza y Molay echa a andar tras él, despacio; el
//    escribano deja la pluma (corta tras «Paris»);
// 4. (el Sena al anochecer) el humo lejano detrás de la isla; dos vecinos llegan por la orilla y se paran a mirarlo; en
//    «the king» el humo dibuja una corona y en «the pope» una mitra (corta en «before God»);
// 5. (la orilla, los mirones de espaldas) la corona y la mitra de humo se deshacen en «die» y dos pájaros se van volando;
//    el viejo baja la cabeza y la mujer le habla.''', COMUN + r'''
const Pp = (f) => en('papa', f), Mo = (f) => en('molay', f);
const P2 = Pp(0.555), P3 = Mo(0.113), P4 = Mo(0.434), P5 = Mo(0.759);
const CONFIESAN = Pp(0.206), DICEN = Pp(0.343), DISUELVE = Pp(0.795), ORDEN = Pp(0.918);
const MAESTRO = Mo(0.119), JACQUES = Mo(0.253), QUEMA = Mo(0.363);
const LEYENDA = Mo(0.518), REY = Mo(0.640), PAPA = Mo(0.703), DIOS = Mo(0.784), AMBOS = Mo(0.869), MUEREN = Mo(0.910);

// ── 1. el concilio (fondo local)
const PI = pl => Object.fromEntries(Object.entries(pl).map(([k, v]) => [k, hex(v)]));
const C1 = PI({ m0: '#8a7e6e', m1: '#968a78', m2: '#7e7262', j: '#4e4538', mS: '#6a604f', mL: '#b4a690', osc: '#2a2430', rojo: '#9a2430', rojoS: '#6a1a22', rojoL: '#c83a40', oro: '#e8b830', oroS: '#a87a18', oroL: '#fff0a0',
  mad0: '#4a2e18', mad1: '#6a4426', mad2: '#8a5a30', mad3: '#b07a40', b0: '#c8b48c', b1: '#a89470', b2: '#e0d0a8', azulV: '#3a5ab8', rojoV: '#c8303a', oroV: '#f0c040', verdeV: '#3a9a5a', plomo: '#2a2a30' });
const SALA = () => {
  // la pared de sillería, más oscura arriba (la bóveda)
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor(y / 9), off = (fila % 2) * 10, bx = Math.floor((x + off) / 20), junta = y % 9 === 8 || (x + off) % 20 === 19;
    const n = hh(bx, fila, 3), r = hh(x, y, 4);
    let c = n < 0.33 ? C1.m0 : n < 0.66 ? C1.m1 : C1.m2;
    if (junta) c = C1.j; else if (r < 0.07) c = C1.mS; else if (r > 0.96) c = C1.mL; else if (y % 9 === 0 || (x + off) % 20 === 0) c = mez(c, C1.mL, 0.45);
    R.pset(x, y, mez(c, C1.osc, Math.max(0, 0.5 - y / 150)));
  }
  // los nervios de la bóveda y dos pilastras con capitel
  for (const cx of [96, 224]) { for (let y = 0; y < 118; y++) for (let i = -5; i <= 5; i++) R.pset(cx + i, y, i === -5 || i === 5 ? C1.j : i < -2 ? C1.mL : i > 2 ? C1.mS : mez(C1.m1, C1.osc, Math.max(0, 0.4 - y / 160)));
    R.rect(cx - 8, 24, cx + 8, 28, C1.j); R.rect(cx - 7, 24, cx + 7, 26, C1.mL); for (let i = -7; i <= 7; i += 3) R.pset(cx + i, 27, C1.mS); }
  for (const [x0, x1] of [[0, 96], [96, 224], [224, 320]]) { const cx = (x0 + x1) / 2, w = (x1 - x0) / 2; for (let i = -w; i <= w; i++) { const y = Math.round(22 - Math.sqrt(Math.max(0, 1 - (i / w) ** 2)) * 18); R.pset(Math.round(cx + i), y, C1.j); R.pset(Math.round(cx + i), y + 1, C1.mL); } }
  // dos ventanales ojivales con vidrieras de rombos
  for (const [vx0, vx1] of [[34, 62], [254, 276]]) {
    const vcx = (vx0 + vx1) / 2, vw = (vx1 - vx0) / 2, y0 = 34, y1 = 96;
    const dentro = (x, y) => { if (x < vx0 || x > vx1 || y > y1) return false; if (y >= y0 + vw) return true; const dy = y0 + vw - y, dx = Math.abs(x - vcx); return dx * dx + dy * dy * 0.9 < vw * vw * (1 - (dy / (vw * 1.6))); };
    for (let y = y0 - 6; y <= y1 + 4; y++) for (let x = vx0 - 4; x <= vx1 + 4; x++) {
      if (dentro(x, y)) { const a = Math.floor((x + y) / 5), b = Math.floor((x - y + 300) / 5), lead = (x + y) % 5 === 0 || (x - y + 300) % 5 === 0 || Math.abs(x - vcx) < 0.6;
        const col = [C1.azulV, C1.rojoV, C1.oroV, C1.azulV, C1.verdeV][(a * 3 + b * 7) % 5]; R.pset(x, y, lead ? C1.plomo : mez(col, hex('#ffffff'), y < y0 + 10 ? 0.25 : 0.1)); }
      else if (dentro(x - 2, y) || dentro(x + 2, y) || dentro(x, y + 3) || dentro(x, y - 2)) R.pset(x, y, x < vcx ? C1.mL : C1.mS);
    }
    R.rect(vx0 - 4, y1 + 1, vx1 + 4, y1 + 3, C1.mL); R.rect(vx0 - 4, y1 + 4, vx1 + 4, y1 + 4, C1.j);
  }
  // el tapiz rojo con rombos de oro detrás del trono, bajo el dosel
  for (let y = 26; y < 106; y++) for (let x = 118; x <= 202; x++) {
    const p = Math.sin((x - 118) * 0.4), borde = x < 121 || x > 199 || y > 102, d = (Math.abs(((x - 160) % 12 + 12) % 12 - 6) + Math.abs(((y - 26) % 12 + 12) % 12 - 6));
    let c = p > 0.6 ? C1.rojoL : p < -0.6 ? C1.rojoS : C1.rojo; if (borde) c = (x + y) % 2 ? C1.oro : C1.oroS; else if (d === 6) c = C1.oroS; else if (d === 0) c = C1.oro;
    R.pset(x, y, c);
  }
  R.rect(110, 12, 210, 24, K); R.rect(111, 13, 209, 22, C1.rojoS); R.rect(111, 13, 209, 14, C1.rojo); for (let x = 112; x < 209; x += 2) { R.pset(x, 23, C1.oro); R.pset(x, 24, x % 4 ? C1.oroS : C1.oro); R.pset(x, 25, x % 4 ? 0 : C1.oroS); }
  for (let x = 116; x < 206; x += 8) { R.pset(x, 17, C1.oro); R.pset(x + 1, 18, C1.oro); R.pset(x - 1, 18, C1.oro); R.pset(x, 19, C1.oro); }
  // el trono de respaldo apuntado
  { const x0 = 144, x1 = 176; for (let y = 52; y <= 112; y++) for (let x = x0; x <= x1; x++) { const cx = 160, top = 52 + Math.abs(x - cx) * 0.9; if (y < top) continue; const bor = x - x0 < 2 || x1 - x < 2 || y - top < 2;
      R.pset(x, y, y - top < 1 || x === x0 || x === x1 ? K : bor ? (x < cx ? C1.oroL : C1.oro) : y > 98 ? C1.mad2 : (x + y) % 6 === 0 ? C1.oro : C1.rojoS); }
    R.disco(160, 58, 2, C1.oroL); R.pset(160, 58, C1.rojo); }
  // el estrado de dos peldaños con la alfombra
  R.rect(92, 112, 228, 118, C1.b1); R.rect(92, 112, 228, 112, C1.b2); R.rect(84, 119, 236, 125, C1.b1); R.rect(84, 119, 236, 119, C1.b2); R.rect(84, 126, 236, 126, C1.j); R.rect(92, 118, 228, 118, C1.j);
  for (let x = 96; x < 228; x += 14) R.pset(x, 115, C1.b0); for (let x = 90; x < 236; x += 16) R.pset(x, 122, C1.b0);
  // el suelo de baldosas en perspectiva
  for (let y = 127; y < 180; y++) { const d = y - 96, fila = Math.floor(Math.log(y - 110) * 5); for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 26, col = Math.floor(u / 10), fu = u / 10 - col;
    let c = (fila + col) & 1 ? hex('#7a6a58') : hex('#b0a088'); if (fu < 0.05) c = C1.j; if (hh(x, y, 6) < 0.06) c = mez(c, K, 0.2); R.pset(x, y, c); } }
  // la alfombra roja que baja del estrado
  for (let y = 112; y < 180; y++) { const w = 12 + (y - 112) * 0.22; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) { const bor = x - (160 - w) < 2 || (160 + w) - x < 2; R.pset(x, y, bor ? C1.oro : (x + y) % 7 === 0 ? C1.rojoL : y < 126 && y % 6 === 0 ? C1.rojoS : C1.rojo); } }
  // los bancos de los obispos (el respaldo; el frente va por delante de ellos)
  for (const [x0, x1] of [[4, 90], [230, 316]]) { R.rect(x0, 92, x1, 114, K); R.rect(x0 + 1, 93, x1 - 1, 113, C1.mad1); for (let x = x0 + 4; x < x1; x += 9) R.rect(x, 95, x + 1, 112, C1.mad0); R.rect(x0 + 1, 93, x1 - 1, 94, C1.mad3); }
};
const bancoDelante = () => { for (const [x0, x1] of [[2, 92], [228, 318]]) { R.rect(x0, 110, x1, 124, K); R.rect(x0 + 1, 111, x1 - 1, 123, C1.mad2); R.rect(x0 + 1, 111, x1 - 1, 112, C1.mad3); R.rect(x0 + 1, 122, x1 - 1, 123, C1.mad0);
  for (let x = x0 + 3; x < x1; x += 4) if (hh(x, 1, 31) < 0.4) R.pset(x, 116, C1.mad1); for (const x of [x0 + 2, x1 - 4]) R.rect(x, 124, x + 2, 130, C1.mad0); } };
const candelabro = (x, base, t, k) => {
  R.rect(x - 4, base - 2, x + 4, base, K); R.rect(x - 3, base - 2, x + 3, base - 1, C1.oroS); R.rect(x - 1, base - 46, x + 1, base - 2, K); R.rect(x, base - 46, x, base - 3, C1.oro);
  R.rect(x - 8, base - 47, x + 8, base - 45, K); R.rect(x - 7, base - 46, x + 7, base - 46, C1.oro);
  for (const i of [-7, 0, 7]) { R.rect(x + i - 1, base - 53, x + i + 1, base - 47, hex('#f2ecd8')); R.pset(x + i + 1, base - 50, hex('#c8c0b0')); const fl = Math.round(Math.sin(t * 11 + i + k) * 0.7);
    R.pset(x + i + fl, base - 56, hex('#fff4c0')); R.pset(x + i, base - 55, hex('#ffd070')); R.pset(x + i, base - 54, hex('#ff9030'));
    for (let j = -6; j <= 6; j++) for (let q = -6; q <= 6; q++) { const d = Math.hypot(q, j); if (d < 6 && d > 1.5) tiñe(x + i + q, base - 55 + j, hex('#ffd890'), 0.12 * (1 - d / 6)); } }
};
const haz = (vx, t) => { for (let y = 40; y < 178; y++) { const c = vx + (y - 40) * 0.55; for (let x = Math.round(c - 9); x <= Math.round(c + 9); x++) tiñe(x, y, hex('#fff0c0'), 0.1 * (1 - (y - 40) / 160)); }
  for (let k = 0; k < 10; k++) { const u = (t * 0.06 + hh(k, 1, 51)) % 1, y = 50 + u * 120, x = vx + (y - 40) * 0.55 + (hh(k, 2, 51) - 0.5) * 14 + Math.sin(t + k) * 2; if (Math.sin(t * 2 + k) > -0.3) R.pset(Math.round(x), Math.round(y), hex('#fff8e0')); } };
const bula = (x, y, s = 1) => { x = Math.round(x); y = Math.round(y); const r = Math.round(8 * s);
  R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#8a8e98')); R.disco(x - 1, y - 1, r - 2, hex('#a4a8b2')); R.disco(x, y, r - 3, hex('#8a8e98'));
  for (let q = 0; q < 16; q++) { const an = q / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * (r - 1.5)), Math.round(y + Math.sin(an) * (r - 1.5)), hex('#5a5e68')); }
  if (r >= 6) { for (const i of [-2, 2]) { R.disco(x + i, y - 1, 1.3, hex('#5a5e68')); R.pset(x + i, y + 1, hex('#5a5e68')); } R.linea(x - 3, y + 3, x + 3, y + 3, hex('#5a5e68')); }
  R.pset(x - r + 2, y - r + 3, hex('#e0e4ec')); R.pset(x - r + 3, y - r + 2, hex('#e0e4ec')); };
const p1 = (t) => {
  fijo('sala', SALA);
  haz(48, t); haz(265, t);
  candelabro(78, 150, t, 0); candelabro(242, 150, t, 2);
  // los obispos sentados en sus bancos
  [[EL.obispo, 14, 1], [EL.obispo, 40, 1], [EL.obispo, 66, 1], [EL.obispo, 238, -1], [EL.obispo, 264, -1], [EL.obispo, 290, -1]].forEach(([d, x, dir], k) =>
    R.actor(d, x, 120, t, { dir, habla: k === 2 && t > DICEN && t < DICEN + 0.8 && Math.sin(t * 9) > 0, triste: k === 4, pal: k % 2 ? { C: '#7a3a8a', c: '#5a2a6a' } : undefined }));
  bancoDelante();
  // el papa en el estrado: al final alza el sello de plomo
  const alza = t > DICEN + 0.5;
  const mp = R.actor(EL.papa, 153, 112, t, { dir: 1, sostiene: alza ? [168, 112 - 20 - Math.round(tramo(t, DICEN + 0.5, P2 - 0.3) * 8)] : undefined }).mano;
  if (alza) bula(mp[0] + 1, mp[1] - 4, 0.45);
  // el inquisidor de pie, a la izquierda: en «whatever they're told» señala a los templarios
  R.actor(EL.escribano, 54, 168, t, { dir: 1, dedo: t > DICEN - 0.1 && t < DICEN + 1.0, enfado: t > DICEN - 0.1, pal: { C: '#f2eee2', c: '#c8c0b0', o: '#2a2430', H: '#3a2a1a', h: '#5a3a24' } });
  // los templarios de pie ante el papa, cabizbajos; en «confess» cada uno habla a su turno
  [[EL.templario, 104, 1], [EL.molay, 124, 1], [EL.templario2, 180, -1], [EL.templario, 200, -1]].forEach(([d, x, dir], k) => {
    const turno = CONFIESAN + k * 0.32, habla = t > turno && t < turno + 0.4;
    R.actor(d, x, 174, t, { dir, habla: habla && Math.sin(t * 12) > 0, triste: !habla, parpadea: k === 1 });
  });
  // el escribano en su atril, a la derecha: la lista de confesiones cae hasta el suelo y se alarga
  { const xa = 262, S = 174; R.rect(xa - 1, S - 16, xa + 1, S, K); R.rect(xa, S - 16, xa, S - 1, C1.mad2); R.rect(xa - 6, S - 1, xa + 6, S, C1.mad0);
    for (let i = -8; i <= 8; i++) { const y = Math.round(S - 18 + i * 0.3); R.pset(xa + i, y - 1, K); R.pset(xa + i, y, C1.mad3); R.pset(xa + i, y + 1, C1.mad1); }
    const L = Math.round(lerp(4, 30, tramo(t, CONFIESAN - 0.3, P2)));
    for (let j = 0; j < 16; j++) { R.pset(xa - 9, S - 17 + j, K); R.pset(xa - 8, S - 17 + j, hex('#efe2bc')); R.pset(xa - 7, S - 17 + j, j % 3 ? hex('#efe2bc') : hex('#6a5a48')); R.pset(xa - 6, S - 17 + j, hex('#c8b488')); }
    for (let i = 0; i <= L; i++) { const x = xa - 9 - i; R.pset(x, S - 2, K); R.pset(x, S - 1, i % 3 === 1 ? hex('#6a5a48') : hex('#efe2bc')); R.pset(x, S, hex('#c8b488')); R.pset(x, S + 1, K); }
    const m = R.actor(EL.escribano, xa + 4, S, t, { dir: -1, sostiene: [xa - 1 + Math.round(Math.sin(t * 10) * 2), S - 21 + Math.round(Math.sin(t * 15))] }).mano;
    R.linea(m[0], m[1], m[0] - 3, m[1] - 6, hex('#f2eee2')); R.pset(m[0] - 4, m[1] - 7, hex('#f2eee2')); }
};

// ── 2. el sello de la orden en su mesa: la bula del papa cae y el sello se agrieta
const GRIETA = [[-18, -15], [-12, -9], [-14, -4], [-6, 0], [-8, 5], [1, 7], [-1, 12], [6, 14], [8, 20]];
const p2 = (t) => {
  const g = T.ultramar(R, t, { encuadre: 'sello', luz: 'dia' });
  const [sx, sy] = g.sello || [126, 140];
  const bx = 186, by = 94, u = tramo(t, P2 + 0.25, DISUELVE), cae = t < DISUELVE;
  // la sombra que crece en el pergamino antes del golpe
  if (u > 0 && cae) { const r = Math.round(3 + u * 7); for (let j = -2; j <= 2; j++) for (let i = -r; i <= r; i++) if ((i / r) ** 2 + (j / 2.4) ** 2 <= 1) tiñe(bx + i + 3, by + 9 + j, hex('#3a2a1a'), 0.15 + u * 0.25); }
  // los cordones de seda (rojo y oro) de la bula
  const y = cae ? lerp(-30, by, u * u) : by - Math.abs(Math.sin((t - DISUELVE) * 16)) * 4 * Math.exp(-(t - DISUELVE) * 5);
  if (u > 0) {
    if (cae) for (const [c, dx] of [['#c8303a', -2], ['#e8b830', 2]]) for (let j = 0; j < 22; j++) R.pset(Math.round(bx + dx + Math.sin(j * 0.4 + t * 9) * 1.5), Math.round(y - 8 - j), hex(c));
    else for (const [c, dx] of [['#c8303a', 0], ['#e8b830', 2]]) for (let i = 0; i < 26; i++) R.pset(Math.round(bx + 7 + i), Math.round(by + 2 + dx + Math.sin(i * 0.35) * 3), hex(c));
    bula(bx, y, 1.3);
  }
  // el golpe: polvo y el pergamino que tiembla
  if (t > DISUELVE && t < DISUELVE + 0.5) { const w = tramo(t, DISUELVE, DISUELVE + 0.5); for (let q = 0; q < 18; q++) { const an = q / 18 * Math.PI * 2; tiñe(bx + Math.cos(an) * (10 + w * 10), by + 4 + Math.sin(an) * (4 + w * 4), hex('#f2e8cc'), 0.8 * (1 - w)); } }
  // en «the order» el sello de cera de los templarios se agrieta y salta un trocito
  const gr = tramo(t, ORDEN, ORDEN + 0.4);
  if (gr > 0) { const n = Math.floor(gr * (GRIETA.length - 1));
    for (let k = 0; k < n; k++) { const [x0, y0] = GRIETA[k], [x1, y1] = GRIETA[k + 1]; R.linea(sx + x0 - 1, sy + y0, sx + x1 - 1, sy + y1, hex('#1a0406')); R.linea(sx + x0, sy + y0, sx + x1, sy + y1, hex('#1a0406')); R.linea(sx + x0 + 1, sy + y0, sx + x1 + 1, sy + y1, hex('#3a0a10')); R.linea(sx + x0 + 2, sy + y0, sx + x1 + 2, sy + y1, hex('#ff9a8a')); } }
  const tr = tramo(t, ORDEN + 0.35, ORDEN + 1.0);
  if (tr > 0) { const cx = lerp(sx + 20, sx + 44, tr), cy = sy + 18 - Math.abs(Math.sin(tr * Math.PI * 2)) * 14 * (1 - tr) + tr * 16; R.rect(Math.round(cx) - 2, Math.round(cy) - 1, Math.round(cx) + 2, Math.round(cy) + 1, hex('#2a0a0e')); R.rect(Math.round(cx) - 1, Math.round(cy) - 1, Math.round(cx) + 1, Math.round(cy), hex('#c8303a')); }
};

// ── 3. la torre: Molay, el soldado que baja y el escribano
const p3 = (t) => {
  const g = T.temple(R, t, { encuadre: 'torre' }), S = g.suelo;
  // de noche: la torre en penumbra, la luna por la saetera y la vela del escritorio
  T.tinte(R, 0, 179, [18, 24, 62], 0.45);
  for (let y = 70; y < 162; y++) { const c = 104 + (y - 70) * 0.35; for (let x = Math.round(c - 5); x <= Math.round(c + 5); x++) tiñe(x, y, hex('#b8c8ff'), 0.13); }
  for (let j = -26; j <= 26; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j * 1.1); if (d < 28 && hh(260 + i, 128 + j, 6) < 0.75) tiñe(260 + i, 128 + j, hex('#ffc070'), 0.22 * (1 - d / 28)); }
  // el escribano en su escritorio: escribe y en «burned» deja la pluma
  { const deja = t > QUEMA; const m = R.actor(EL.escribano, 220, S, t, { dir: deja ? -1 : 1, triste: deja, sostiene: deja ? undefined : [238 + Math.round(Math.sin(t * 9) * 1.5), S - 22 + Math.round(Math.sin(t * 13))] }).mano;
    if (!deja) { R.linea(m[0], m[1], m[0] + 3, m[1] - 6, hex('#f2eee2')); R.pset(m[0] + 4, m[1] - 7, hex('#f2eee2')); } }
  // el soldado baja la escalera; en «burned» agacha la cabeza y vuelve a subir delante de Molay
  const baja = tramo(t, MAESTRO - 0.1, MAESTRO + 1.3), sube = tramo(t, QUEMA + 0.1, P4 + 0.6);
  const xs = Math.round(sube > 0 ? lerp(58, 10, sube) : lerp(16, 58, baja)), ys = Math.round(sube > 0 ? lerp(S, S - 14, Math.max(0, sube - 0.4) / 0.6) : lerp(S - 22, S, baja));
  R.actor(EL.soldado, xs, ys, t, { dir: sube > 0 ? -1 : 1, anda: (baja > 0 && baja < 1) || (sube > 0 && sube < 1), triste: t > QUEMA - 0.2, dedo: t > JACQUES + 0.4 && t < QUEMA - 0.2 });
  // Molay: mira la saetera, se vuelve en su nombre, y echa a andar despacio, con la cabeza alta
  const va = tramo(t, QUEMA + 0.25, P4 + 0.6), xm = Math.round(lerp(112, 50, va));
  R.actor(EL.molay, xm, S, t, { dir: t < JACQUES - 0.2 ? 1 : -1, anda: va > 0 && va < 1, parpadea: t < JACQUES });
};

// ── 4 y 5. la corona y la mitra que dibuja el humo
const figuraHumo = (cx, cy, tipo, a, rompe, t, s = 1.5) => {
  if (a <= 0) return; cx = Math.round(cx); cy = Math.round(cy);
  const den = tipo === 'corona'
    ? (i, j) => (j >= 0 && j <= 5 && Math.abs(i) <= 9) || (j < 0 && j >= -6 && [-8, 0, 8].some((p) => Math.abs(i - p) <= 2 + j / 3))
    : (i, j) => j <= 8 && j >= -10 && Math.abs(i) <= 6 - Math.max(0, -j - 2) * 0.55 && !(Math.abs(i) < 1 && j < -4);
  const dentro = (i, j) => den(Math.round(i / s), Math.round(j / s));
  for (let j = Math.round(-11 * s); j <= Math.round(9 * s); j++) for (let i = Math.round(-11 * s); i <= Math.round(11 * s); i++) {
    if (!dentro(i, j)) continue; if (rompe > 0 && hh(i, j, 7) < rompe) continue;
    const borde = !dentro(i - 1, j) || !dentro(i + 1, j) || !dentro(i, j - 1) || !dentro(i, j + 1);
    const ox = Math.round(Math.sin(t * 2 + j * 0.5) * 0.8 + rompe * (hh(i, j, 9) - 0.5) * 12), oy = Math.round(-rompe * hh(i, j, 8) * 10);
    tiñe(cx + i + ox, cy + j + oy, borde ? hex('#f2ecf0') : hex('#d8d0dc'), a * (borde ? 0.75 : 0.5));
  }
};
const p4 = (t) => {
  const g = T.temple(R, t, { encuadre: 'sena', humo: 0.25 + 0.75 * tramo(t, P4 - 0.5, P4 + 1.6) }), S = g.suelo;
  const sube = (t - P4) * 1.5;
  figuraHumo(190 + sube * 0.4, 54 - sube, 'corona', tramo(t, REY - 0.15, REY + 0.5), 0, t);
  figuraHumo(222 + sube * 0.4, 44 - sube, 'mitra', tramo(t, PAPA - 0.15, PAPA + 0.5), 0, t);
  // dos vecinos llegan por la orilla, se paran y miran el humo
  const u = tramo(t, P4, P4 + 1.7), xa = Math.round(lerp(-20, 96, u)), xb = Math.round(lerp(-40, 120, u)), anda = u > 0 && u < 1;
  R.actor(EL.peregrino, xa, S, t, { dir: 1, anda, triste: t > LEYENDA });
  R.actor(EL.peregrina, xb, S, t, { dir: 1, anda, dedo: t > REY - 0.1 && t < PAPA + 0.6, sorpresa: t > REY - 0.1 && t < REY + 0.5 });
};
const p5 = (t) => {
  const g = T.temple(R, t, { encuadre: 'sena', camara: 'orilla', humo: 1 }), S = g.suelo;
  const sube = (t - P4) * 1.5, rompe = tramo(t, MUEREN - 0.1, MUEREN + 1.2);
  figuraHumo(208 + sube * 0.3, 64 - sube * 0.4, 'corona', 1 - rompe * 0.6, rompe, t, 1.3);
  figuraHumo(238 + sube * 0.3, 56 - sube * 0.4, 'mitra', 1 - rompe * 0.6, rompe, t, 1.3);
  // dos pájaros salen volando de donde estaban la corona y la mitra
  for (let k = 0; k < 2; k++) { const v = tramo(t, MUEREN + 0.1 + k * 0.2, MUEREN + 1.8 + k * 0.2); if (v <= 0 || v >= 1) continue;
    const x = Math.round(lerp(226 + k * 26, 120 + k * 40, v)), y = Math.round(lerp(60 - k * 6, 22 + k * 6, v) + Math.sin(v * 9) * 2), a = Math.sin(t * 14 + k) > 0;
    R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x - 2, y - (a ? 2 : -1), K); R.pset(x + 1, y - (a ? 1 : 0), K); R.pset(x + 2, y - (a ? 2 : -1), K); }
  // el viejo baja la cabeza; la mujer se vuelve y le habla; en «both» los dos miran arriba
  const mira = t > AMBOS - 0.1;
  R.actor(EL.peregrino, 150, S, t, { dir: 1, triste: t > DIOS && !mira, sorpresa: mira && t < MUEREN + 0.6 });
  R.actor(EL.peregrina, 174, S, t, { dir: t > DIOS + 0.2 && !mira ? -1 : 1, habla: t > DIOS + 0.3 && t < AMBOS - 0.2 && Math.sin(t * 9) > 0, sorpresa: mira && t < MUEREN + 0.6, dedo: t > MUEREN && t < MUEREN + 1.2 });
};

const año = (t) => (t < P3 ? 1312 : 1314);
const efectos = [[CONFIESAN, 'lapiz'], [DISUELVE, 'sello'], [ORDEN + 0.05, 'golpecito'], [MAESTRO + 0.2, 'cerrojo'], [P4 + 0.3, 'viento'], [REY, 'brillo'], [MUEREN, 'rafaga']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['te-flota'] = ('La flota', '''// TE-FLOTA (frases 18–20), 1312 y 1308. Cinco planos:
// 1. (la casa del Temple junto al mar) un templario sale cabizbajo por la puerta con un cofre y en «handed over» se lo
//    entrega a un hospitalario, que lo sube al carro con los otros cofres (corta en «to another order»);
// 2. (fondo local: lo alto de la torre, el cielo con nubes y gaviotas, el mar) el templario arría el estandarte blanco y
//    negro; el hospitalario iza el suyo, rojo con la cruz blanca, que llega arriba en «the Hospitallers» (corta en «But»);
// 3. (el tribunal de 1308) Jean de Châlons entra con un guardia y se planta ante el banco; en «Jean de Chalon» el
//    inquisidor le señala; en «told» habla; el escribano escribe (corta en «Inquisitors»);
// 4. (el banco de cerca) Jean cuenta lo que oyó: le sale un bocadillo con galeras que van apareciendo hasta dieciocho
//    en «18 galleys»; el guardia se sorprende (corta en «He had heard it»);
// 5. (el muelle, gag 4) el rumor pasa de boca en boca: dos barcos, cinco, dieciocho, cada bocadillo más grande; en
//    «found a record» el último mira al mar y no hay nada («?»); en «ships» los bocadillos revientan.''', COMUN + r'''
const Ho = (f) => en('hospitalarios', f), Ga = (f) => en('galeras', f), Oi = (f) => en('oido', f);
const P2 = Ho(0.534), P3 = Ga(-0.003), P4 = Ga(0.481), P5 = Oi(-0.049);
const TESORO = Ho(0.029), ENTREGA = Ho(0.430), HOSP = Ho(0.856);
const TEMPLARIO = Ga(0.184), CHALON = Ga(0.339), DIJO = Ga(0.414);
const OYO = Ga(0.605), ESCAPO = Ga(0.751), DIECIOCHO = Ga(0.866), GALERAS = Ga(0.915);
const OIDO2 = Oi(0.048), NOVISTO = Oi(0.234), NADIE = Oi(0.496), HALLO = Oi(0.675), BARCOS = Oi(0.874);

// ── 1. la casa del Temple: el cofre pasa al hospitalario y al carro
const MD = ['#3a2414', '#6a4426', '#8a5a30', '#b07a40'].map(hex);
const rueda = (cx, cy, r, a) => { R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, MD[2]); R.disco(cx, cy, r - 2, MD[0]);
  for (let k = 0; k < 6; k++) { const an = a + k * Math.PI / 3; R.linea(cx, cy, Math.round(cx + Math.cos(an) * (r - 1)), Math.round(cy + Math.sin(an) * (r - 1)), MD[2]); } R.disco(cx, cy, 1.5, MD[3]); };
const carreta = (x0, base) => {
  // varas hacia el caballo
  R.linea(x0 + 56, base - 15, x0 + 74, base - 20, K); R.linea(x0 + 56, base - 14, x0 + 74, base - 19, MD[1]);
  R.rect(x0 - 1, base - 19, x0 + 57, base - 11, K); R.rect(x0, base - 18, x0 + 56, base - 12, MD[2]); R.rect(x0, base - 18, x0 + 56, base - 18, MD[3]); R.rect(x0, base - 12, x0 + 56, base - 12, MD[0]);
  for (let x = x0 + 9; x < x0 + 56; x += 10) R.linea(x, base - 17, x, base - 13, MD[1]); for (let x = x0; x <= x0 + 56; x++) if (hh(x, 3, 811) < 0.2) R.pset(x, base - 15, MD[1]);
};
const carretaDelante = (x0, base, a) => { for (const x of [x0 + 2, x0 + 54]) { R.rect(x - 1, base - 25, x + 1, base - 18, K); R.pset(x, base - 24, MD[3]); R.pset(x, base - 21, MD[2]); }
  rueda(x0 + 12, base - 7, 7, a); rueda(x0 + 44, base - 7, 7, a); };
const p1 = (t) => {
  const g = T.ultramar(R, t, { encuadre: 'casa' }), S = g.suelo;
  const CX = 214, CB = 178;
  // el templario sale por la puerta con el cofre, baja y se lo da al hospitalario
  const u = tramo(t, 0.3, 2.9), xt = Math.round(lerp(150, 170, u)), yt = Math.round(lerp(143, 169, u));
  const pasa = tramo(t, ENTREGA - 0.15, ENTREGA + 0.25), sube = tramo(t, ENTREGA + 0.55, ENTREGA + 0.95);
  const mt = R.actor(EL.templario, xt, yt, t, { dir: 1, anda: u > 0 && u < 1, triste: true, sostiene: pasa < 1 ? [xt + 16, yt - 14] : undefined }).mano;
  // el segundo templario mira desde la puerta
  if (t > 1.4) R.actor(EL.templario2, 151, 143, t, { dir: 1, triste: true, parpadea: true });
  const xh = 194, gira = t > ENTREGA + 0.4;
  const oh = { dir: gira ? 1 : -1, sonrisa: t > ENTREGA + 0.1 };
  if (pasa > 0 && sube < 1) oh.sostiene = gira ? [xh + 17, 162 - Math.round(sube * 4)] : [xh - 1, 157];
  else if (t > ENTREGA + 1.0) oh.dedo = true;
  const mh = R.actor(EL.hospitalario, xh, 171, t, oh).mano;
  // el carro con los cofres (el tercero llega en «handed over»), y el caballo que espera
  carreta(CX, CB);
  T.cofre(R, CX + 30, CB - 18, t, { s: 0.8, k: 2 }); T.cofre(R, CX + 46, CB - 18, t, { s: 0.8, k: 4, brillo: 0.4 + 0.3 * Math.sin(t * 3) });
  if (sube >= 1) T.cofre(R, CX + 14, CB - 18, t, { s: 0.8, k: 1 });
  else if (pasa < 1) { const cx = lerp(mt[0] + 3, mh[0] - 2, Math.max(0, pasa)), cy = lerp(mt[1] + 5, mh[1] + 5, Math.max(0, pasa)) - Math.sin(Math.max(0, pasa) * Math.PI) * 3; T.cofre(R, Math.round(cx), Math.round(cy), t, { s: 0.7, k: 1 }); }
  else { const cx = lerp(mh[0] + 2, CX + 14, sube), cy = lerp(mh[1] + 5, CB - 18, sube) - Math.sin(sube * Math.PI) * 6; T.cofre(R, Math.round(cx), Math.round(cy), t, { s: lerp(0.7, 0.8, sube), k: 1 }); }
  carretaDelante(CX, CB, 0);
  T.b_caballo(R, CX + 66, CB + 1, t, { dir: 1, cola: true, come: t > TESORO && t < TESORO + 1.4, silla: false, color: '#7a5034' });
};

// ── 2. lo alto de la torre (fondo local): se arría un estandarte y se iza el otro
const AL = ['#c8a878', '#b89868', '#d8b888', '#8a6e4a', '#e8d0a0', '#6a5238'].map(hex);
const ALMENAS = [[40, 62], [80, 102], [120, 142], [160, 182], [200, 222], [240, 262], [280, 302]];
const sillar = (x, y, k, ancho = 16, alto = 8) => { const fila = Math.floor(y / alto), off = (fila % 2) * (ancho >> 1), bx = Math.floor((x + off) / ancho), j = y % alto === alto - 1 || (x + off) % ancho === ancho - 1;
  let c = hh(bx, fila, k) < 0.35 ? AL[1] : hh(bx, fila, k) > 0.8 ? AL[2] : AL[0]; if (j) c = AL[3]; else if (hh(x, y, k + 1) < 0.05) c = AL[5]; else if (y % alto === 0) c = mez(c, AL[4], 0.4); return c; };
const TORRE_M = [];
const TORRE = () => {
  // el cielo tramado de azul a casi blanco
  const B4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]], CI = ['#2e5aa8', '#3a6ab8', '#5a88c8', '#7aa6d8', '#a0c4e4', '#c8dcec'].map(hex);
  for (let y = 0; y < 98; y++) for (let x = 0; x < 320; x++) { const v = y / 98 * 5 + B4[y & 3][x & 3] / 16 - 0.5; R.pset(x, y, CI[Math.max(0, Math.min(5, Math.floor(v)))]); }
  // el mar que se ve entre las almenas, con la costa lejana y una vela
  for (let y = 96; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 97 ? hex('#5a8ab8') : hh(x >> 2, y, 3) < 0.08 ? hex('#c8e0f0') : y % 3 === 0 && hh(x >> 3, y, 4) < 0.3 ? hex('#3a6a98') : hex('#4a7aa8'));
  for (let x = 40; x < 140; x++) { const h = Math.round(4 + Math.sin(x * 0.07) * 2 + Math.sin(x * 0.21)); for (let y = 96 - h; y < 97; y++) R.pset(x, y, y < 97 - h + 2 ? hex('#7a9a8a') : hex('#5a7a6a')); }
  { const x = 186; R.rect(x - 6, 93, x + 6, 95, hex('#5a3a20')); R.linea(x, 80, x, 93, hex('#3a2414')); for (let j = 0; j < 11; j++) R.linea(x + 1, 82 + j, x + 1 + Math.round(j * 0.6), 82 + j, hex('#f2eee2')); }
  // las almenas y el parapeto de sillería
  for (let y = 80; y < 144; y++) for (let x = 40; x < 320; x++) {
    const al = ALMENAS.find(([a, b]) => x >= a && x <= b); if (y < 106 && !al) continue;
    let c = sillar(x, y, 9); if (y === 80 || y === 106) c = AL[4]; else if (y === 81 || y === 107) c = AL[2];
    if (al && y < 106 && (x === al[1] || x === al[1] - 1)) c = AL[3]; if (al && y < 106 && x === al[0]) c = AL[2];
    if (y > 138) c = mez(c, AL[5], 0.35); R.pset(x, y, c);
  }
  // una saetera en cada almena
  for (const [a, b] of ALMENAS) { const cx = (a + b) >> 1; R.rect(cx - 1, 86, cx + 1, 100, K); R.rect(cx, 87, cx, 99, hex('#1a1418')); }
  // el adarve: losas con juntas, musgo y un charco que refleja el cielo
  const filas = [144, 151, 159, 168, 180];
  for (let y = 144; y < 180; y++) { const f = filas.findIndex((v, i) => y >= v && y < filas[i + 1]), w = 18 + f * 6;
    for (let x = 40; x < 320; x++) { const u = (x - 160) * (1 + f * 0.08), col = Math.floor((u + (f % 2) * w / 2 + 1000) / w), j = y === filas[f] || Math.floor((u - 1 + (f % 2) * w / 2 + 1000) / w) !== col;
      let c = hh(col, f, 21) < 0.4 ? AL[1] : hh(col, f, 21) > 0.8 ? AL[2] : AL[0]; c = mez(c, AL[5], 0.15); if (j) c = AL[3]; else if (hh(x, y, 22) < 0.05) c = AL[5]; else if (hh(x, y, 23) < 0.03) c = hex('#6a8a4a'); R.pset(x, y, c); } }
  for (let j = -3; j <= 3; j++) for (let i = -16; i <= 16; i++) if ((i / 16) ** 2 + (j / 3.2) ** 2 <= 1) R.pset(96 + i, 172 + j, j < 0 ? hex('#7aa6d8') : hex('#5a88c8'));
  for (let x = 40; x < 320; x++) if (hh(x, 5, 24) < 0.35) R.pset(x, 143, hex('#6a8a4a'));
  // la torrecilla de la izquierda con su tejado cónico y su puerta
  for (let y = 40; y < 180; y++) for (let x = 0; x < 40; x++) R.pset(x, y, x > 35 ? AL[3] : x < 3 ? AL[2] : sillar(x, y, 30, 12, 7));
  for (let y = 18; y < 40; y++) { const w = (y - 18) * 1.0; for (let x = Math.max(0, Math.round(20 - w)); x <= Math.min(42, Math.round(20 + w)); x++) R.pset(x, y, x < 20 ? ((x + y) % 4 === 0 ? hex('#5a2a1a') : hex('#8a3a24')) : y % 3 === 0 ? hex('#5a2216') : hex('#6a2a1c')); }
  R.rect(0, 38, 42, 41, K); R.rect(0, 39, 42, 40, hex('#4a2a1a'));
  for (let y = 0; y < 80; y++) for (let x = 0; x < 44; x++) { const w = (y - 18) * 1.0; if (y >= 40 ? x < 40 : y >= 18 && x >= Math.round(20 - w) && x <= Math.round(20 + w) + 1) TORRE_M.push(y * 320 + x); }
  R.rect(17, 54, 21, 72, K); R.rect(18, 55, 20, 71, hex('#1a1418'));
  { const x0 = 8, x1 = 32, y0 = 128, y1 = 168; for (let y = y0 - 4; y <= y1; y++) for (let x = x0 - 3; x <= x1 + 3; x++) { const top = y0 + Math.round(10 - Math.sqrt(Math.max(0, 1 - ((x - 20) / 15) ** 2)) * 10); if (y < top - 3) continue;
      const dentro = x >= x0 && x <= x1 && y >= top; R.pset(x, y, !dentro ? AL[2] : (x - x0) % 6 === 5 ? MD[0] : y === 140 || y === 156 ? hex('#2a2a30') : (x + y) % 9 === 0 ? MD[1] : MD[2]); }
    R.disco(29, 150, 1.5, hex('#e8b830')); }
};
const nube3 = (cx, cy, w) => { const b = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  for (const [c, dy, dx, f] of [['#a8b8d0', 1, 0, 1], ['#d8e4f0', 0, 0, 1], ['#ffffff', -2, -1, 0.75]]) for (const [x, y, r] of b) R.disco(Math.round(cx + x * w + dx), Math.round(cy + y * w + dy), Math.round(r * w * f), hex(c)); };
const estandarte = (x, y, t, tipo) => {
  const W = 40, H = 24;
  for (let i = 0; i < W; i++) { const s = Math.sin(t * 7 - i * 0.3), dy = Math.round(s * 2 * (i / W)); for (let j = 0; j < H; j++) {
    const yy = y + j + dy, borde = i === W - 1 || j === 0 || j === H - 1; let c;
    if (tipo === 'temple') c = j < H / 2 ? hex('#1c1820') : hex('#f2eee2');
    else c = (i >= 12 && i <= 16 && j >= 3 && j <= 21) || (j >= 7 && j <= 10 && i >= 5 && i <= 23) ? hex('#f2eee2') : hex('#c8303a');
    if (s > 0.6) c = mez(c, hex('#ffffff'), 0.18); else if (s < -0.6) c = mez(c, K, 0.25);
    R.pset(x + i, yy, borde ? K : c); } }
};
const p2 = (t) => {
  fijo('torre', TORRE);
  // nubes a tres velocidades y gaviotas, solo sobre el cielo de arriba
  R.recorte([0, 0, 319, 79]);
  for (const [x0, y, w, v] of [[40, 28, 46, 3], [180, 54, 34, 6], [300, 70, 26, 10]]) nube3(((x0 + t * v) % 380) - 30, y, w);
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 110 + t * (14 + k * 4)) % 360) - 20), y = Math.round(48 + k * 10 + Math.sin(t * 1.3 + k) * 4), a = Math.sin(t * 9 + k) > 0;
    R.pset(x, y, hex('#f2f2f2')); R.pset(x - 1, y - (a ? 1 : 0), hex('#f2f2f2')); R.pset(x - 2, y - (a ? 2 : 0), hex('#8a8a8a')); R.pset(x + 1, y - (a ? 1 : 0), hex('#f2f2f2')); R.pset(x + 2, y - (a ? 2 : 0), hex('#8a8a8a')); }
  R.recorte(null);
  { const B = FIJOS.get('torre'); for (const q of TORRE_M) R.pset(q % 320, Math.floor(q / 320), B[q]); }
  // el brasero con su fuego y su humo, el rollo de cuerda, el cubo y las lanzas apoyadas
  { const x = 270, b = 168; R.rect(x - 9, b - 12, x + 9, b - 8, K); R.rect(x - 8, b - 11, x + 8, b - 9, hex('#3a3a44')); R.linea(x - 6, b - 8, x - 8, b, K); R.linea(x + 6, b - 8, x + 8, b, K); R.linea(x, b - 8, x, b, K);
    for (let i = -7; i <= 7; i++) { const hgt = Math.round(3 + Math.abs(Math.sin(t * 9 + i * 1.3)) * 4 - Math.abs(i) * 0.3); for (let j = 0; j < hgt; j++) R.pset(x + i, b - 12 - j, j > hgt - 2 ? hex('#e84a1a') : j > 1 ? hex('#ffc040') : hex('#fff6c0')); }
    for (let k = 0; k < 7; k++) { const u = (t * 0.35 + k / 7) % 1; nubecilla(Math.round(x + Math.sin(u * 5 + t) * 3 - u * 10), Math.round(b - 18 - u * 60), Math.round(1 + u * 4), hex('#9a9aa4'), 0.45 * (1 - u)); } }
  { const x = 228, y = 170; for (let r = 7; r >= 2; r -= 2) { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#c8b080')); R.disco(x, y, r - 1, hex('#a89060')); } R.pset(x - 2, y - 2, hex('#e8d8b0')); }
  { const x = 300, y = 168; R.rect(x - 6, y - 9, x + 6, y, K); R.rect(x - 5, y - 8, x + 5, y - 1, MD[2]); R.rect(x - 5, y - 6, x + 5, y - 6, hex('#5a5a64')); R.rect(x - 5, y - 2, x + 5, y - 2, hex('#5a5a64')); R.rect(x - 4, y - 8, x + 4, y - 8, hex('#5a88c8')); }
  for (const x of [200, 206]) { R.linea(x, 166, x + 6, 112, K); R.linea(x + 1, 166, x + 7, 112, MD[2]); R.rect(x + 5, 106, x + 8, 112, hex('#c0c4d4')); }
  // el mástil en su base de piedra, con la polea y la driza
  const PX = 150; R.rect(PX - 6, 160, PX + 5, 170, K); R.rect(PX - 5, 161, PX + 4, 169, AL[1]); R.rect(PX - 5, 161, PX + 4, 161, AL[4]);
  R.rect(PX - 2, 20, PX + 1, 160, K); R.rect(PX - 1, 21, PX, 160, hex('#8a5a30')); for (const y of [30, 70, 110, 140]) R.pset(PX - 1, y, hex('#b07a40'));
  R.disco(PX, 19, 2.5, K); R.disco(PX, 19, 1.6, hex('#e8b830'));
  R.linea(PX + 2, 20, PX + 2, 150, hex('#d8c8a0')); R.linea(PX + 3, 22, PX + 3, 150, hex('#b8a880')); R.rect(PX + 1, 149, PX + 4, 151, MD[0]);
  // el estandarte del Temple baja (el templario tira de la driza) y el de los hospitalarios sube
  const baja = tramo(t, P2 + 0.3, P2 + 1.6), iza = tramo(t, P2 + 1.9, HOSP + 0.05);
  if (baja < 1) estandarte(PX + 3, Math.round(lerp(22, 114, baja)), t, 'temple');
  if (iza > 0) estandarte(PX + 3, Math.round(lerp(114, 22, iza * (2 - iza))), t, 'hosp');
  // los dos caballeros en el adarve
  const tira = baja > 0 && baja < 1, plega = baja >= 1;
  const mt = R.actor(EL.templario, 124, 168, t, { dir: 1, triste: plega || tira, sostiene: tira ? [PX + 1, 140 + Math.round(Math.sin(t * 14) * 3)] : plega ? [140, 152] : undefined }).mano;
  if (plega) { R.rect(mt[0] - 5, mt[1] - 3, mt[0] + 5, mt[1] + 3, K); R.rect(mt[0] - 4, mt[1] - 2, mt[0] + 4, mt[1], hex('#1c1820')); R.rect(mt[0] - 4, mt[1] + 1, mt[0] + 4, mt[1] + 2, hex('#f2eee2')); }
  const izando = iza > 0 && iza < 1;
  const oh = { dir: -1, sonrisa: t > HOSP - 0.2 };
  if (izando) oh.sostiene = [PX + 4, 140 + Math.round(Math.sin(t * 14 + 1) * 3)]; else if (t < P2 + 1.9) oh.sostiene = [158, 152]; else if (t > HOSP + 0.3) oh.dedo = true;
  const mh = R.actor(EL.hospitalario, 160, 168, t, oh).mano;
  // el estandarte rojo plegado en la mano del hospitalario antes de izarlo
  if (t < P2 + 1.9) { R.rect(mh[0] - 5, mh[1] - 3, mh[0] + 5, mh[1] + 3, K); R.rect(mh[0] - 4, mh[1] - 2, mh[0] + 4, mh[1] + 2, hex('#c8303a')); R.rect(mh[0] - 1, mh[1] - 2, mh[0], mh[1] + 2, hex('#f2eee2')); }
};

// ── 3. el tribunal de 1308
const FRAILE = { C: '#f2eee2', c: '#c8c0b0', o: '#2a2430', H: '#3a2a1a', h: '#5a3a24' };
const p3 = (t) => {
  const g = T.puerto(R, t, { encuadre: 'tribunal', delante: false });
  R.actor(EL.escribano, 124, 136, t, { dir: -1, pal: FRAILE, parpadea: true });
  R.actor(EL.obispo, 160, 136, t, { dir: -1, dedo: t > CHALON - 0.1 && t < CHALON + 0.7, enfado: t > CHALON - 0.1 && t < DIJO });
  R.actor(EL.escribano, 196, 136, t, { dir: -1, pal: { ...FRAILE, H: '#8a8a9a', h: '#b0b0c0' }, habla: t > TEMPLARIO && t < TEMPLARIO + 0.6 && Math.sin(t * 10) > 0 });
  T.tribunalDelante(R, t);
  // el escribano en su atril escribe lo que dice
  { const m = R.actor(EL.escribano, 262, 168, t, { dir: 1, sostiene: [282 + Math.round(Math.sin(t * 9) * 1.5), 148 + Math.round(Math.sin(t * 13))] }).mano; R.linea(m[0], m[1], m[0] + 3, m[1] - 6, hex('#f2eee2')); }
  // Jean de Châlons entra con el guardia y se planta; en «told» habla
  const u = tramo(t, P3 + 0.1, TEMPLARIO), xj = Math.round(lerp(-18, 44, u)), xg = Math.round(lerp(-44, 14, u));
  R.actor(EL.soldado, xg, 170, t, { dir: 1, anda: u > 0 && u < 1 });
  R.actor(EL.templario2, xj, 168, t, { dir: 1, anda: u > 0 && u < 1, triste: t < DIJO, habla: t > DIJO && Math.sin(t * 9) > 0, dedo: t > DIJO + 0.3 });
};

// ── 4. el banco: el bocadillo con dieciocho galeras
const p4 = (t) => {
  const g = T.puerto(R, t, { encuadre: 'tribunal', camara: 'banco' }), S = g.suelo;
  const sor = t > DIECIOCHO && t < DIECIOCHO + 1.0;
  const mg = R.actor(EL.soldado, 230, S, t, { dir: -1, sostiene: [232, S - 16], sorpresa: sor }).mano;
  R.linea(mg[0], mg[1] - 22, mg[0], S, K); R.linea(mg[0] + 1, mg[1] - 22, mg[0] + 1, S, hex('#8a5a30')); R.rect(mg[0] - 1, mg[1] - 27, mg[0] + 2, mg[1] - 22, hex('#c0c4d4')); R.pset(mg[0], mg[1] - 28, hex('#c0c4d4'));
  R.actor(EL.templario2, 120, S, t, { dir: 1, habla: Math.sin(t * 9) > 0 && t < GALERAS + 0.6, dedo: t > ESCAPO && t < GALERAS, brazos: t > GALERAS && t < GALERAS + 0.7 });
  const u = tramo(t, OYO - 0.1, OYO + 0.5), n = Math.max(1, Math.round(lerp(1, 18, tramo(t, ESCAPO, DIECIOCHO))));
  T.bocadilloBarcos(R, 92, 22, n, t, { w: 124, h: 64, cola: [130, 136], u });
  if (t > DIECIOCHO) { const p = tramo(t, DIECIOCHO, DIECIOCHO + 0.2); R.numero('18', 240, 74 - Math.round((1 - p) * 4), { tam: 16, centro: true }); }
};

// ── 5. el muelle: el rumor crece de boca en boca (gag 4)
const p5 = (t) => {
  const g = T.puerto(R, t, { encuadre: 'puerto', camara: 'muelle' }), S = g.suelo;
  const susurra = (t0) => t > t0 && t < t0 + 0.55 && Math.sin(t * 11) > 0;
  const tA = P5 + 0.1, tB = OIDO2 + 0.55, tC = NOVISTO + 0.6;
  R.actor(EL.marinero, 78, S, t, { dir: 1, habla: susurra(tA), sonrisa: t > tA + 0.6 });
  R.actor(EL.peregrina, 116, S, t, { dir: t > tB - 0.1 ? 1 : -1, habla: susurra(tB), sorpresa: t > OIDO2 && t < tB - 0.1 });
  R.actor(EL.estibador, 160, S, t, { dir: t > tC - 0.1 ? 1 : -1, habla: susurra(tC), sorpresa: t > NOVISTO && t < tC - 0.1 });
  const mira = t > HALLO;
  R.actor(EL.peregrino, 202, S, t, { dir: mira ? 1 : -1, brazos: t > NADIE + 0.1 && t < HALLO - 0.1, sorpresa: t > NADIE && t < NADIE + 0.4 || (mira && t < HALLO + 0.8) });
  if (mira) R.bocadillo(218, 132, { icono: '?' });
  // los bocadillos: 2, 5 y 18 galeras; en «ships» revientan uno tras otro
  const pop = (k) => 1 - tramo(t, BARCOS + k * 0.18, BARCOS + k * 0.18 + 0.12);
  T.bocadilloBarcos(R, 62, 96, 2, t, { w: 52, h: 30, cola: [124, 136], u: tramo(t, OIDO2 - 0.05, OIDO2 + 0.35) * pop(0) });
  T.bocadilloBarcos(R, 88, 50, 5, t, { w: 72, h: 40, cola: [168, 136], u: tramo(t, NOVISTO - 0.05, NOVISTO + 0.35) * pop(1) });
  T.bocadilloBarcos(R, 154, 18, 18, t, { w: 118, h: 62, cola: [210, 136], u: tramo(t, NADIE - 0.1, NADIE + 0.4) * pop(2) });
  for (let k = 0; k < 3; k++) { const w = tramo(t, BARCOS + k * 0.18 + 0.1, BARCOS + k * 0.18 + 0.5); if (w <= 0 || w >= 1) continue; const [cx, cy] = [[88, 111], [124, 70], [213, 49]][k];
    for (let q = 0; q < 12; q++) { const an = q / 12 * Math.PI * 2, r = 8 + w * (14 + k * 8); R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.6), hex('#f6f2e6')); } }
};

const año = (t) => (t < P3 ? 1312 : 1308);
const efectos = [[ENTREGA + 0.95, 'golpecito'], [HOSP + 0.05, 'rafaga'], [P3 + 0.25, 'puerta'], [DIJO + 0.3, 'lapiz'], [OYO, 'pop'], [DIECIOCHO + 0.02, 'brillo'],
  [OIDO2, 'pop'], [NOVISTO, 'pop'], [NADIE - 0.05, 'boing'], [BARCOS, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')
