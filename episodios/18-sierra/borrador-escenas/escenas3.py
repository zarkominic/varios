E = {}

# Piezas pequeñas compartidas (se repiten en cada cuerpo porque cada escena es su propia página).
PIEZAS = r'''
const C = T.C;
const K = { k: hex('#1a1420'), carton: hex('#c8925a'), cartonL: hex('#e0b07a'), cartonS: hex('#9a6a3a'), cinta: hex('#e8d8a8'),
  blanco: hex('#f2eee2'), papel: hex('#fbf6e6'), papelS: hex('#d8d0b8'), oro: hex('#f8d040'), oroS: hex('#c89a28'), rojo: hex('#c83a3a') };
// una caja de cartón de envíos (x, y: esquina de arriba a la izquierda; w × h), con su cinta y la sombra del canto
const caja = (x, y, w = 9, h = 7) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 1, x + w, y + h, K.k); R.rect(x, y, x + w - 1, y + h - 1, K.carton); R.rect(x, y, x + w - 1, y, K.cartonL);
  R.rect(x + w - 2, y + 1, x + w - 1, y + h - 1, K.cartonS); R.rect(x + (w >> 1), y, x + (w >> 1), y + h - 1, K.cinta);
};
// el saco del cartero (lo lleva en la mano: x, y es la mano)
const saco = (x, y, lleno = 1) => {
  x = Math.round(x); y = Math.round(y); const h = 9 + Math.round(lleno * 3);
  R.rect(x - 5, y, x + 5, y + h, K.k); R.rect(x - 4, y + 1, x + 4, y + h - 1, hex('#8a7a5a')); R.rect(x - 4, y + 1, x - 3, y + h - 1, hex('#a8966e'));
  R.rect(x - 1, y - 1, x + 1, y + 1, K.k); R.rect(x - 3, y + 4, x + 3, y + 4, hex('#6a5a40')); R.pset(x + 2, y + 6, hex('#c83a3a'));
};
// estrellitas de brillo que se abren y se apagan (u 0–1)
const brillo = (x, y, u, r = 8, col = K.oro) => {
  if (u <= 0 || u >= 1) return; const d = Math.round(r * Math.sin(u * Math.PI)), e = Math.round(d * 0.6);
  for (let i = -d; i <= d; i++) { R.pset(x + i, y, Math.abs(i) < d * 0.4 ? K.blanco : col); R.pset(x, y + i, Math.abs(i) < d * 0.4 ? K.blanco : col); }
  for (let i = -e; i <= e; i += 2) { R.pset(x + i, y + i, col); R.pset(x + i, y - i, col); }
};
// un pajarito azul de cuento (x, y: las patas), mirando a dir; o.vuela: alas arriba/abajo; o.salta: px
const pajaro = (x, y, t, o = {}) => {
  x = Math.round(x); y = Math.round(y - (o.salta ?? 0)); const d = o.dir ?? 1, X = (i) => x + d * i;
  const az = hex('#3a7ad8'), azS = hex('#2a52a0'), pe = hex('#f0c060'), k = K.k;
  for (let i = -3; i <= 3; i++) for (let j = -6; j <= -2; j++) if ((i * i) / 10 + ((j + 4) * (j + 4)) / 5 <= 1.05) R.pset(X(i), y + j, j > -3 ? pe : az);
  R.pset(X(-4), y - 5, azS); R.pset(X(-5), y - 6, azS); R.pset(X(-4), y - 4, azS);   // la cola
  R.pset(X(2), y - 7, az); R.pset(X(3), y - 7, az); R.pset(X(2), y - 8, az); R.pset(X(3), y - 6, az);   // la cabeza
  R.pset(X(3), y - 7, k); R.pset(X(4), y - 7, hex('#f0a020')); R.pset(X(5), y - 7, hex('#f0a020'));
  const ala = o.vuela ? (Math.sin(t * 30) > 0 ? -3 : 1) : 0;
  R.pset(X(-1), y - 5 + ala, azS); R.pset(X(0), y - 5 + ala, azS); R.pset(X(-2), y - 5 + ala, azS); if (o.vuela) R.pset(X(-1), y - 6 + ala, az);
  if (!o.vuela) { R.pset(X(-1), y - 1, k); R.pset(X(1), y - 1, k); R.pset(X(-1), y, k); R.pset(X(1), y, k); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-sierra'] = ('Sierra', '''// SI-SIERRA (frases 16–17), sin cartela; año 1980 en el salón y 1981 en la montaña. Tres planos:
// 1. el salón de 1980 lleno de cajas de envíos (o.cajas crece): Ken lleva una caja en brazos desde la pila; Roberta, de
//    pie en el sofá, clava chinchetas en el mapa de EE. UU.; en «10,000» se clava en el mapa la tarjeta con «10000»;
//    en «company» entra el cartero con su saco, Ken le da la caja, la mete en el saco y se va por la puerta; corta en
//    «Sierra»;
// 2. el pueblo de montaña cerca de Yosemite, 1981: la camioneta cargada sube por la carretera entre pinos («They moved»)
//    y se para delante de la tienda («mountain town»); el barrendero y el de la gasolinera; corta en «pines»;
// 3. la tienda de cerca: la camioneta llega y se para; Roberta sube por la escalera de fuera con una caja hasta la
//    oficina de arriba y entra; Ken baja de la camioneta con otra caja y la sigue; en «mountains» Roberta señala las
//    cumbres desde el rellano; el perro del porche se despierta y menea la cola.''', PIEZAS + r'''
const m = (f) => en('miles', f), n = (f) => en('montana', f);
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const P2 = m(0.864), P3 = n(0.451);
const diez = m(0.131), compania = m(0.559), mudan = n(0), yosemite = n(0.221), montes = n(0.862);
// p1 · el salón de las cajas
const SALTOS = [[0.9, 114], [2.2, 126], [3.4, 138], [4.5, 150]];   // [instante, x]: Roberta salta en el sofá y clava una chincheta
const p1 = (t) => {
  const g = T.casa(R, t, { encuadre: 'salon', cajas: 0.45 + 0.55 * tramo(t, 0, P2 - 0.6) });
  // las chinchetas que ya ha clavado (en el borde de abajo del mapa, donde llega de un salto)
  for (const [ti, x] of SALTOS) if (t > ti + 0.22) { const px = x + 13, py = 70 + (x % 7); R.pset(px, py + 1, K.k); R.rect(px - 1, py - 2, px + 1, py, K.rojo); R.pset(px - 1, py - 2, K.blanco); }
  // Roberta, de pie en el sofá: anda un poco, salta con el dedo arriba y clava la chincheta
  let rx = SALTOS[0][1], sal = 0, arriba = false;
  for (let i = 0; i < SALTOS.length; i++) { const [ti, x] = SALTOS[i]; if (t >= ti - 0.6) rx = i ? lerp(SALTOS[i - 1][1], x, lin(t, ti - 0.6, ti - 0.15)) : x;
    const s0 = (t - ti) / 0.45; if (s0 > 0 && s0 < 1) { sal = Math.round(Math.sin(s0 * Math.PI) * 11); arriba = true; } }
  const andaR = SALTOS.some(([ti], i) => i && t > ti - 0.6 && t < ti - 0.15);
  R.actor(EL.roberta, Math.round(rx), 120, t, { dir: 1, salto: sal, dedo: arriba, anda: andaR, sonrisa: t > diez, habla: !arriba && !andaR && Math.sin(t * 7) > 0.6 });
  // la tarjeta «10000» que aparece clavada en el mapa en «10,000»
  const tj = tramo(t, diez - 0.1, diez + 0.2);
  if (tj > 0) { const y = 42, w = Math.round(18 * tj); R.rect(176 - w - 1, y - 1, 176 + w + 1, y + 12, K.k); R.rect(176 - w, y, 176 + w, y + 11, K.papel); R.rect(176 - w, y + 11, 176 + w, y + 11, K.papelS);
    if (tj >= 1) { R.numero('10000', 176, y + 9, { centro: true, rampa: [K.k, K.k, hex('#2a3a6a'), hex('#2a3a6a')] }); R.disco(176, y + 1, 1, K.rojo); }
    brillo(196, 44, tramo(t, diez + 0.1, diez + 0.8), 7); }
  // Ken cruza el salón con una caja hasta el cartero
  const kv = lin(t, 0.4, compania + 0.45), dale = compania + 0.65;
  const kx = Math.round(lerp(70, 246, kv));
  const ken = R.actor(EL.ken, kx, 150, t, { dir: 1, anda: kv > 0 && kv < 1, sostiene: t < dale, dedo: t > dale + 0.3, sonrisa: t > dale, habla: t > dale - 0.5 && t < dale && Math.sin(t * 9) > 0 });
  if (t < dale) caja(ken.mano[0] - 4, ken.mano[1] - 7);
  // el cartero entra por la puerta, recoge la caja, la mete en el saco y se va
  const ce = lin(t, compania - 0.6, compania + 0.3), cs = lin(t, dale + 0.6, P2 + 0.1);
  if (ce > 0 && cs < 1) {
    const cx = Math.round(cs > 0 ? lerp(272, 322, cs) : lerp(318, 272, ce));
    const car = R.actor(EL.cartero, cx, 162, t, { dir: cs > 0 ? 1 : -1, anda: (ce > 0 && ce < 1) || cs > 0, sostiene: true, sonrisa: t > dale });
    saco(car.mano[0], car.mano[1], t > dale + 0.4 ? 1 : 0.4);
    const vu = tramo(t, dale, dale + 0.4); if (vu > 0 && vu < 1) caja(lerp(ken.mano[0] - 4, car.mano[0] - 4, vu), lerp(ken.mano[1] - 7, car.mano[1] - 4, vu) - Math.sin(vu * Math.PI) * 6);
  }
  T.a_casaDelante(R, t, { encuadre: 'salon' });
};
// p2 · el pueblo de montaña: la camioneta sube por la carretera; un ciervo pace en el prado y se va de un brinco con el claxon
const ciervo = (x, y, t, o = {}) => {
  x = Math.round(x); y = Math.round(y); const d = o.dir ?? 1, X = (i) => x + d * i, c = hex('#a8703a'), cS = hex('#7a4e26'), cL = hex('#c89058'), bl = hex('#f2e6cc'), k = K.k;
  const sal = o.brinco ? Math.round(Math.abs(Math.sin(t * 9)) * 5) : 0, yy = y - sal, paso = o.brinco ? Math.floor(t * 9) % 2 : 0;
  for (let i = -6; i <= 6; i++) for (let j = -12; j <= -7; j++) if ((i * i) / 40 + ((j + 9.5) * (j + 9.5)) / 7 <= 1) R.pset(X(i), yy + j, j > -8 ? cS : j < -11 ? cL : c);
  R.pset(X(-7), yy - 11, bl); R.pset(X(-7), yy - 10, bl);   // la cola blanca
  for (const [lx, f] of [[-4, 0], [-2, 1], [3, 0], [5, 1]]) { const dx = paso && f ? 1 : 0; R.rect(Math.min(X(lx + dx), X(lx + dx)), yy - 7, Math.min(X(lx + dx), X(lx + dx)), y - 1 - (o.brinco && f ? 2 : 0), cS); R.pset(X(lx + dx), y - (o.brinco && f ? 2 : 0), k); }
  const baja = o.come ? 6 : 0;   // el cuello: arriba, o abajo paciendo
  for (let j = 0; j < 6; j++) R.pset(X(5 + Math.round(j * (baja ? 0.5 : 0.3))), yy - 11 - (baja ? -j : j), c), R.pset(X(6 + Math.round(j * (baja ? 0.5 : 0.3))), yy - 11 - (baja ? -j : j), cS);
  const hx = X(baja ? 9 : 7), hy = yy - (baja ? 5 : 17);
  R.rect(Math.min(hx, hx + d * 3), hy, Math.max(hx, hx + d * 3), hy + 2, c); R.pset(hx + d * 3, hy + 1, k); R.pset(hx + d, hy, k);
  R.pset(hx - d, hy - 1, cS); R.pset(hx - d, hy - 2, cS); R.pset(hx, hy - 2, cS); R.pset(hx - 2 * d, hy - 3, cS); R.pset(hx + d, hy - 3, cS);   // las astas
};
const p2 = (t) => {
  T.oficina(R, t, { encuadre: 'pueblo', epoca: 1981, camioneta: tramo(t, P2 + 0.1, yosemite + 1.1) });
  const bota = yosemite + 1.05, hu = lin(t, bota + 0.2, P3 + 0.4);
  ciervo(lerp(196, 300, hu), 168, t, { dir: hu > 0 ? 1 : -1, come: t < bota && Math.sin(t * 1.3) > -0.4, brinco: hu > 0 });
  if (t > bota && t < bota + 0.7) R.bocadillo(196, 140, { icono: '!' });
};
// p3 · la tienda de cerca: llegan y suben a la oficina
const p3 = (t) => {
  const g = T.oficina(R, t, { encuadre: 'pueblo', camara: 'tienda', epoca: 1981, camioneta: tramo(t, P3 - 0.2, P3 + 1.2) });
  // Roberta sube la escalera con su caja (peldaño cada 3 px en x y 4 en y), cruza el rellano y entra
  const su = tramo(t, P3 + 0.2, montes - 0.5), re = tramo(t, montes + 0.6, E.duracion - 0.3);
  let rx, ry;
  if (su < 1) { const i = Math.floor(su * 13); rx = 312 - 3 * i - 7 - 4 * (1 - su); ry = 151 - 4 * i; } else { rx = lerp(265, 230, re); ry = 98; }
  if (re < 1) {
    const rob = R.actor(EL.roberta, Math.round(rx), Math.round(ry), t, { dir: -1, anda: (su > 0 && su < 1) || (re > 0 && re < 1), sostiene: t < montes - 0.5 || t > montes + 0.6, dedo: t > montes - 0.4 && t < montes + 0.6, sonrisa: true });
    if (t < montes - 0.5 || t > montes + 0.6) caja(rob.mano[0] - 6, rob.mano[1] - 7);
  }
  // Ken baja de la camioneta con otra caja y va hacia la escalera
  const kb = lin(t, P3 + 1.3, E.duracion);
  if (kb > 0) { const ken = R.actor(EL.ken, Math.round(lerp(64, 196, kb)), 174, t, { dir: 1, anda: kb < 1, sostiene: true }); caja(ken.mano[0] - 4, ken.mano[1] - 7); }
};
const efectos = [[SALTOS[0][0] + 0.22, 'golpecito'], [diez, 'sello'], [compania - 0.55, 'puerta'], [compania + 0.7, 'papel'], [P2 + 0.3, 'motor'], [yosemite + 1.0, 'claxon'], [P3 + 1.1, 'puerta'], [montes, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 1980 : 1981) });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-ibm'] = ('El encargo', '''// SI-IBM (frases 18–20), cartela «1983», año 1983. Cuatro planos:
// 1. la buhardilla de la oficina, 1983: entran los dos ejecutivos de traje con una caja; Roberta y Ken se vuelven;
//    en «IBM asks» el primero habla y señala; el segundo deja la caja en la mesa grande; corta en «for its new»;
// 2. la mesa de cerca: el ejecutivo pulsa y el ordenador nuevo se enciende («home computer»); Roberta abre su cuaderno
//    y en «designs» dibuja el castillo trazo a trazo; en la pantalla el caballero empieza a andar («King's Quest»);
// 3. el salón del trono: en «fairy tale» el caballero Graham entra por la alfombra; en «Graham» se para ante el rey y
//    hace la reverencia; el rey le encarga la misión: un bocadillo con los tres tesoros («three treasures»); en «save
//    the kingdom» Graham levanta el brazo y da un salto; el bufón hace malabares, un guardia bosteza;
// 4. los tres tesoros: Graham entra y mira; cada tesoro se enciende cuando la voz lo nombra («mirror», «shield»,
//    «chest»); el cofre echa monedas sin parar y Graham atrapa una en «gold».''', PIEZAS + r'''
const a = (f) => en('ibm', f), b = (f) => en('graham', f), c = (f) => en('tesoros', f);
const P2 = a(0.486), P3 = b(0), P4 = c(0);
const ibm = a(0.225), roberta = a(0.749), disena = a(0.804), kq = a(0.876);
const knight = b(0.292), graham = b(0.392), tres = b(0.646), salva = b(0.827);
const espejo = c(0.187), escudo = c(0.416), cofre = c(0.67), oro = c(0.904);
const deja = a(0.58);
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
// el gorro rojo con pluma de Graham, suelto (en la mano en la reverencia)
const gorro = (x, y) => { x = Math.round(x); y = Math.round(y); const r = hex('#c83a3a'), rs = hex('#8a2a2a');
  R.rect(x - 4, y - 1, x + 4, y + 1, K.k); R.rect(x - 3, y - 3, x + 2, y, K.k); R.rect(x - 3, y, x + 3, y, rs); R.rect(x - 2, y - 2, x + 1, y - 1, r); R.pset(x - 2, y - 2, hex('#e85a5a'));
  R.linea(x + 1, y - 2, x + 4, y - 6, K.k); R.linea(x + 1, y - 3, x + 4, y - 7, K.blanco); R.pset(x + 5, y - 7, K.blanco); };
// iconos de los tres tesoros (para el bocadillo del rey): espejo, escudo y cofre, de unos 11 px
const icEspejo = (x, y) => { R.disco(x, y - 1, 5, K.oroS); R.disco(x, y - 1, 4, K.oro); R.disco(x, y - 1, 3, hex('#a8d8f0')); R.pset(x - 1, y - 3, K.blanco); R.pset(x - 2, y - 2, K.blanco); R.rect(x - 1, y + 4, x + 1, y + 6, K.oroS); R.rect(x - 3, y + 6, x + 3, y + 6, K.oroS); };
const icEscudo = (x, y) => { for (let j = -5; j <= 6; j++) { const w = j < 2 ? 5 : 5 - (j - 1); for (let i = -w; i <= w; i++) R.pset(x + i, y + j, Math.abs(i) === w || j === -5 ? K.k : hex('#2a52a0')); }
  R.pset(x, y - 2, K.oro); R.rect(x - 1, y - 1, x + 1, y + 1, K.oro); R.pset(x, y + 2, K.oro); R.pset(x - 2, y, K.oro); R.pset(x + 2, y, K.oro); };
const icCofre = (x, y) => { R.rect(x - 6, y - 4, x + 6, y + 5, K.k); R.rect(x - 5, y - 3, x + 5, y + 4, hex('#8a5a2a')); R.rect(x - 5, y - 3, x + 5, y - 2, hex('#a8743c')); R.rect(x - 5, y, x + 5, y, K.oroS);
  R.rect(x - 1, y - 1, x + 1, y + 1, K.oro); R.rect(x - 4, y - 6, x + 4, y - 4, K.oro); R.pset(x - 2, y - 7, K.oro); R.pset(x + 2, y - 7, K.oro); R.pset(x, y - 8, K.blanco); };
// p1 · la buhardilla: llegan los ejecutivos con la caja y la dejan en la mesa grande
const p1 = (t) => {
  const g = T.oficina(R, t, { encuadre: 'oficina', epoca: 1981 });
  const giro = t > 2.2, asombro = t > ibm - 0.3 && t < ibm + 0.7;
  R.actor(EL.ken, 74, 162, t, { dir: giro ? 1 : -1, sorpresa: asombro, sonrisa: t > ibm + 0.7, dedo: t > a(0.4) && t < a(0.47) });
  const rv = lin(t, ibm + 0.6, P2 - 0.2);
  R.actor(EL.roberta, Math.round(lerp(98, 110, rv)), 162, t, { dir: giro ? 1 : -1, anda: rv > 0 && rv < 1, sorpresa: asombro, sonrisa: t > ibm + 0.7 });
  const u = lin(t, 1.0, ibm - 0.2);
  R.actor(EL.ejecutivo, Math.round(lerp(330, 228, u)), 162, t, { dir: -1, anda: u > 0 && u < 1, habla: t > ibm && t < ibm + 1.4 && Math.sin(t * 9) > 0, dedo: t > ibm + 0.1 && t < ibm + 1.3 });
  const deja1 = tramo(t, a(0.38), a(0.46));
  const e2 = R.actor(EL.ejecutivo2, Math.round(lerp(352, 202, u)), 162, t, { dir: -1, anda: u > 0 && u < 1, sostiene: deja1 < 1 ? true : false, sonrisa: deja1 >= 1 });
  // la caja del ordenador pequeño: en sus brazos y luego en la mesa grande
  const bx = lerp(e2.mano[0] - 13, 168, deja1), by = lerp(e2.mano[1] - 10, 135, deja1) - Math.sin(deja1 * Math.PI) * 4;
  caja(bx, by, 14, 10); R.rect(Math.round(bx) + 3, Math.round(by) + 3, Math.round(bx) + 6, Math.round(by) + 5, hex('#3a3e4c'));   // el dibujo del ordenador en la caja
};
// p2 · la mesa de cerca: el ordenador se enciende, Roberta abre su cuaderno y dibuja el castillo
const p2 = (t) => {
  const g = T.oficina(R, t, { encuadre: 'oficina', camara: 'mesa', epoca: 1981, paso: lin(t, kq, P3) });
  const [x0, y0, x1, y1] = g.pantalla, on = tramo(t, deja, deja + 0.35);
  if (on < 1) {   // la pantalla apagada (cristal oscuro con su reflejo) y el encendido de tubo
    const cy = Math.round((y0 + y1) / 2), h = Math.round(on * (y1 - y0) / 2);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (on > 0 && Math.abs(y - cy) <= h) continue; R.pset(x, y, (x - y) % 23 === 0 || (x - y) % 23 === 1 ? hex('#3a4a46') : hex('#1e2624')); }
    if (on > 0) R.rect(x0 + 2, cy - 1, x1 - 2, cy + 1, K.blanco);
  }
  R.actor(EL.ejecutivo2, 262, 154, t, { dir: -1, sonrisa: t > deja, habla: t < deja - 0.6 && Math.sin(t * 8) > 0 });
  R.actor(EL.ejecutivo, 232, 154, t, { dir: -1, dedo: t > deja - 0.5 && t < deja + 0.6, sonrisa: t > deja + 0.6, habla: t > kq && Math.sin(t * 7) > 0.4 });
  const abre = tramo(t, roberta - 0.3, roberta + 0.3);
  const rob = R.actor(EL.roberta, 92, 154, t, { dir: 1, sostiene: true, sonrisa: t > roberta, sorpresa: t > deja && t < deja + 0.6 });
  T.d_oficinaDelante(R, t, { epoca: 1981 });
  // el cuaderno abierto en sus manos: en «designs» se dibuja a lápiz el castillo, trazo a trazo
  const [hx, hy] = rob.mano, w = Math.round(5 + 10 * abre), cx = hx + 1 + w, ny = hy - 14;
  R.rect(cx - w - 1, ny - 1, cx + w + 1, ny + 19, K.k); R.rect(cx - w, ny, cx + w, ny + 18, K.papel); R.rect(cx, ny, cx, ny + 18, K.papelS); R.rect(cx - w, ny + 18, cx + w, ny + 18, K.papelS);
  for (let j = 3; j < 17; j += 3) R.rect(cx - w + 2, ny + j, cx - 2, ny + j, hex('#b8c4dc'));
  if (abre >= 1) { R.linea(cx - 12, ny + 15, cx - 8, ny + 12, hex('#c83a3a')); R.linea(cx - 8, ny + 12, cx - 4, ny + 14, hex('#c83a3a')); R.pset(cx - 4, ny + 14, K.k); }   // el camino del mapa en la página de la izquierda
  const d = tramo(t, disena, kq + 0.4), lp = hex('#3a4a6a');
  const tr = [[2, 16, 2, 6], [2, 6, 5, 6], [5, 6, 5, 16], [10, 16, 10, 6], [10, 6, 13, 6], [13, 6, 13, 16], [5, 10, 10, 10], [1, 16, 14, 16], [7, 16, 7, 13], [7, 13, 9, 13], [9, 13, 9, 16], [12, 6, 12, 2], [12, 2, 14, 3], [14, 3, 12, 4]];
  if (abre >= 1 && d > 0) { const nT = d * tr.length, n = Math.floor(nT);
    for (let i = 0; i < Math.min(tr.length, n + 1); i++) { const [a0, b0, a1, b1] = tr[i], f = i < n ? 1 : nT - n; R.linea(cx + a0, ny + b0, Math.round(cx + lerp(a0, a1, f)), Math.round(ny + lerp(b0, b1, f)), lp); }
    if (d >= 1) for (const xx of [2, 4, 10, 12]) R.pset(cx + xx, ny + 5, lp);
    if (d < 1) { const [a0, b0, a1, b1] = tr[Math.min(tr.length - 1, n)], f = nT - n, px = Math.round(cx + lerp(a0, a1, f)), py = Math.round(ny + lerp(b0, b1, f)); R.linea(px + 1, py - 1, px + 6, py - 7, hex('#e8c040')); R.pset(px + 6, py - 7, hex('#e88a9a')); } }
};
// p3 · el salón del trono: la misión
const p3 = (t) => {
  const g = T.cuento(R, t, { encuadre: 'trono' });
  const manda = t > tres - 0.5 && t < salva + 0.2;
  R.actor(EL.reyCuento, 153, 132, t, { dir: -1, habla: manda && Math.sin(t * 8) > 0, dedo: manda, sonrisa: t > salva });
  const u = lin(t, P3, graham - 0.1), v = lin(t, salva + 0.7, E.duracion - 0.1);
  const gx = Math.round(v > 0 ? lerp(146, 70, v) : lerp(60, 146, u)), gy = Math.round(v > 0 ? lerp(158, 172, v) : lerp(172, 158, u));
  const rev = t > graham && t < graham + 0.9;
  const sj = t > salva && t < salva + 0.5 ? Math.round(Math.sin((t - salva) / 0.5 * Math.PI) * 6) : 0;
  const gr = R.actor(EL.graham, gx, gy, t, { dir: v > 0 ? -1 : 1, anda: (u > 0 && u < 1) || v > 0, tocado: rev ? false : undefined, sostiene: rev ? [gx + 18, gy - 12] : false, salto: sj, brazos: t > salva && t < salva + 0.6, sonrisa: t > graham });
  if (rev) gorro(gr.mano[0], gr.mano[1] - 1);
  // el bocadillo del rey con los tres tesoros
  const bo = tramo(t, tres - 0.5, tres - 0.2) * (1 - tramo(t, salva + 0.2, salva + 0.5));
  if (bo > 0) { const w = Math.round(32 * bo), cx = 206, cy = 76;
    R.rect(cx - w - 1, cy - 13, cx + w + 1, cy + 13, K.k); R.rect(cx - w, cy - 12, cx + w, cy + 12, K.blanco); R.rect(cx - w, cy + 10, cx + w, cy + 12, hex('#d8d4cc'));
    if (bo >= 1) for (let i = 0; i < 9; i++) { const x = 186 - i, y = cy + 13 + i, ww = Math.max(0, 3 - Math.floor(i / 3)); R.rect(x - 1, y, x + ww + 1, y, K.k); if (ww > 0) R.rect(x, y, x + ww, y, K.blanco); }
    if (bo >= 1) { if (t > tres) icEspejo(cx - 18, cy - 1); if (t > tres + 0.25) icEscudo(cx, cy - 1); if (t > tres + 0.5) icCofre(cx + 18, cy); } }
};
// p4 · los tres tesoros
const p4 = (t) => {
  const vis = [t > espejo - 0.1 && 'espejo', t > escudo - 0.1 && 'escudo', t > cofre - 0.1 && 'cofre'].filter(Boolean);
  const g = T.cuento(R, t, { encuadre: 'trono', camara: 'tesoros', tesoros: vis });
  brillo(92, 78, tramo(t, espejo - 0.1, espejo + 0.7), 16); brillo(160, 79, tramo(t, escudo - 0.1, escudo + 0.7), 16); brillo(228, 90, tramo(t, cofre - 0.1, cofre + 0.7), 16);
  const v = lin(t, cofre + 0.25, oro - 0.15);
  const gx = Math.round(lerp(119, 178, v));
  const d = t < escudo - 0.1 ? -1 : 1;
  const asombro = (t > espejo && t < espejo + 0.7) || (t > escudo && t < escudo + 0.7) || (t > cofre && t < cofre + 0.7);
  const gr = R.actor(EL.graham, gx, 160, t, { dir: d, anda: v > 0 && v < 1, sorpresa: asombro, dedo: t > P4 + 0.3 && t < espejo - 0.2, sostiene: t > oro ? true : false, sonrisa: t > oro || (!asombro && t > espejo) });
  // la moneda que salta del cofre y atrapa en «gold»
  const mo = lin(t, oro - 0.55, oro);
  if (mo > 0 && mo < 1) R.disco(Math.round(lerp(232, gr.mano[0], mo)), Math.round(lerp(84, gr.mano[1] - 3, mo) - Math.sin(mo * Math.PI) * 22), 2, K.oro);
  if (t > oro) { const [hx, hy] = gr.mano; R.disco(hx, hy - 3, 2, K.oro); R.pset(hx - 1, hy - 4, K.blanco); brillo(hx, hy - 3, tramo(t, oro, oro + 0.5), 5); }
};
const efectos = [[1.1, 'puerta'], [ibm + 0.2, 'golpecito'], [a(0.46), 'toc'], [deja + 0.05, 'interruptor'], [disena, 'lapiz'], [P3 + 0.3, 'campana'], [graham + 0.05, 'whoosh'], [salva, 'boing'], [espejo, 'brillo'], [escudo, 'brillo'], [cofre, 'brillo'], [oro, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1983', efectos, año: 1983 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['si-anda'] = ('Dentro del cuadro', '''// SI-ANDA (frases 21–23), sin cartela, año 1984. Cuatro planos, el gag 3 (el árbol):
// 1. el salón de 1984 desde la pantalla: la abuela, el chico y el adolescente en el sofá; en «never seen before» se
//    quedan con la boca abierta, a las palomitas les da un salto el bol; el chico señala la pantalla; corta en «knight»;
// 2. el bosque del reino por la tarde: el caballero anda por el borde de delante y pasa por delante del árbol grande
//    («in front of»), da la vuelta, sube al camino y entra por detrás del mismo tronco («behind the trees»)… y no sale:
//    ha desaparecido de verdad; un pájaro baja, mira a un lado y a otro del tronco, «?»;
// 3. el roble de cerca: el pájaro lo busca rama por rama; en «inside it» Graham sale por delante del tronco, saluda y
//    se va andando; el pájaro, «!»;
// 4. el ordenador del porche de cerca: las manos teclean («typed»), la línea de escribir se llena; en «now the world
//    moved» el caballero de la pantalla echa a andar por su mundo.''', PIEZAS + r'''
const a = (f) => en('arboles', f), b = (f) => en('dentro', f), c = (f) => en('escribe', f);
const P2 = a(0.435), P3 = b(0), P4 = c(0);
const nunca = a(0.08), delante = a(0.70), detras = a(0.848), dentro = b(0.786), teclea = c(0.098), mueve = c(0.755);
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
// p1 · el sofá: la cara de asombro; las palomitas saltan del bol
const p1 = (t) => {
  const g = T.casa(R, t, { encuadre: 'jugadores', camara: 'sofa', epoca: 1985 });
  const asombro = t > nunca && t < nunca + 1.5, ve = a(0.3);
  R.actor(EL.abuela, 75, 152, t, { dir: 1, sorpresa: asombro, sonrisa: t > nunca + 1.5, brazos: t > ve + 0.4 && t < ve + 1.1 });
  const sj = t > ve - 0.2 && t < ve + 0.3 ? Math.round(Math.sin((t - ve + 0.2) / 0.5 * Math.PI) * 7) : 0;
  R.actor(EL.chico, 139, 152, t, { dir: 1, sorpresa: asombro, salto: sj, dedo: t > ve, sonrisa: t > ve, habla: t > ve + 0.3 && Math.sin(t * 9) > 0 });
  R.actor(EL.adolescente, 203, 152, t, { dir: -1, sorpresa: asombro, sonrisa: t > nunca + 1.5 });
  T.a_casaDelante(R, t, { encuadre: 'jugadores', camara: 'sofa', epoca: 1985 });
  // los «!» del asombro, uno detrás de otro
  [[82, 0], [146, 0.15], [210, 0.3]].forEach(([x, d]) => { if (t > nunca + d && t < nunca + d + 1.1) R.bocadillo(x, 112, { icono: '!' }); });
  // las palomitas saltan del bol y caen
  const pu = (t - nunca - 0.05) / 1.1;
  if (pu > 0 && pu < 1) for (let k = 0; k < 9; k++) { const vx = (k - 4) * 7 + (k % 2) * 3, vy = 42 + (k * 13) % 17, x = Math.round(100 + vx * pu), y = Math.round(160 - vy * pu + 70 * pu * pu);
    if (y < 176) { R.rect(x - 1, y - 1, x + 1, y + 1, hex('#8a7a5a')); R.rect(x - 1, y, x + 1, y, K.blanco); R.rect(x, y - 1, x, y + 1, K.blanco); R.pset(x + 1, y + 1, hex('#e8c860')); } }
};
// p2 · el bosque: por delante del árbol… y por detrás, donde desaparece de verdad
const p2 = (t) => {
  const o = { encuadre: 'bosque', luz: 'tarde' }; T.reino(R, t, o);
  // por el borde de delante hacia la izquierda (pasa por delante del tronco), da la vuelta, sube al camino y entra por detrás
  const ida = lin(t, P2, delante + 0.25), sube = lin(t, delante + 0.45, detras + 0.15);
  const gx = Math.round(sube > 0 ? lerp(54, 92, sube) : lerp(176, 54, ida)), gy = Math.round(sube > 0 ? lerp(176, 154, Math.min(1, sube * 1.3)) : 176);
  const frente = gy > 166, oG = { dir: sube > 0 || (t > delante + 0.25) ? 1 : -1, anda: (ida > 0 && ida < 1) || (sube > 0 && sube < 1), sonrisa: true };
  if (!frente) R.actor(EL.graham, gx, gy, t, oG);
  T.reinoDelante(R, t, o);
  if (frente) R.actor(EL.graham, gx, gy, t, oG);
  // el pájaro baja y lo busca a un lado y a otro del tronco
  const pb = tramo(t, detras + 0.5, detras + 1.1), cambia = lin(t, detras + 1.7, detras + 2.0);
  if (pb > 0) { const x = pb < 1 ? lerp(190, 124, pb) : lerp(124, 66, cambia), lado = cambia > 0 && cambia < 1 ? -1 : cambia >= 1 ? 1 : -1;
    pajaro(x, lerp(96, 154, pb) - (cambia > 0 && cambia < 1 ? Math.sin(cambia * Math.PI) * 10 : 0), t, { dir: lado, vuela: pb < 1 || (cambia > 0 && cambia < 1), salta: pb >= 1 && Math.sin(t * 14) > 0.8 ? 1 : 0 });
    if (pb >= 1 && (cambia === 0 || cambia >= 1) && t > detras + 1.25) R.bocadillo(Math.round(x), 136, { icono: '?' }); }
};
// p3 · el roble: el pájaro lo busca rama por rama; Graham sale por delante del tronco
const ramas = [[44, 51], [80, 59], [110, 67], [184, 62], [220, 54]];
const p3 = (t) => {
  const o = { encuadre: 'bosque', camara: 'arbol', luz: 'tarde', pajaro: false }; T.reino(R, t, o);
  const sale = lin(t, dentro - 0.35, dentro + 0.25), va = lin(t, dentro + 1.0, E.duracion + 0.6);
  const s = Math.min(ramas.length - 1, (t - P3) * 1.25), i = Math.floor(s), f = s - i;
  const [x0, y0] = ramas[i], [x1, y1] = ramas[Math.min(ramas.length - 1, i + 1)];
  const vuela = f > 0.62 && i < ramas.length - 1, w = vuela ? (f - 0.62) / 0.38 : 0;
  let bx = lerp(x0, x1, w), by = lerp(y0, y1, w) - Math.sin(w * Math.PI) * 10;
  const baja = lin(t, dentro + 0.6, dentro + 1.2); if (baja > 0) { bx = lerp(bx, 236 + va * 60, baja); by = lerp(by, 132, baja) - Math.sin(baja * Math.PI) * 6; }
  pajaro(bx, by, t, { dir: baja > 0 ? 1 : x1 >= x0 ? 1 : -1, vuela: vuela || (baja > 0 && baja < 1), salta: !vuela && Math.sin(t * 13) > 0.85 ? 1 : 0 });
  if (!vuela && baja === 0 && t < dentro) R.bocadillo(Math.round(bx), Math.round(by) - 11, { icono: '?' });
  if (t > dentro && t < dentro + 0.9) R.bocadillo(Math.round(bx), Math.round(by) - 11, { icono: '!' });
  // Graham sale de detrás del tronco (recortado al borde derecho del tronco mientras sale), saluda y se va
  if (sale > 0) { const gx = Math.round(lerp(162, 192, sale) + va * 150);
    if (sale < 1) R.recorte([177, 0, 319, 179]);
    R.actor(EL.graham, gx, 166, t, { dir: 1, anda: sale < 1 || va > 0, dedo: sale >= 1 && va === 0, sonrisa: true, habla: sale >= 1 && va === 0 && Math.sin(t * 9) > 0 });
    R.recorte(null); }
  T.reinoDelante(R, t, o);
};
// p4 · el ordenador del porche: teclea y el mundo de la pantalla se mueve
const pantallaJuego = (sx, sy, sw, sh, t) => {
  const ps = R.pset, x1 = sx + sw - 1, y1 = sy + sh - 1, anda = lin(t, mueve - 0.1, E.duracion + 1.4);
  R.recorte([sx, sy, x1, y1]);
  for (let y = sy; y <= y1; y++) for (let x = sx; x <= x1; x++) {
    const yy = y - sy; let c;
    if (yy < 18) c = (yy < 6 && (x + y) % 2) ? hex('#7aa8f8') : hex('#5a8ae8');
    else if (yy < 20) c = (x + Math.floor(Math.sin(x * 0.4) * 1.5)) % 5 < 3 ? hex('#2a7a3a') : hex('#5a8ae8');
    else if (yy < 33) c = (x * 3 + y * 5) % 11 === 0 ? hex('#2a8a2a') : hex('#3aa83a');
    else c = hex('#0a0a0e');
    ps(x, y, c);
  }
  // la nube que pasa cuando el mundo se mueve, el castillo lejano, el árbol y el camino
  const nx = Math.round(sx + 8 + anda * 30 + (t % 30) * 0.3); for (const [dx, dy, r] of [[0, 6, 3], [4, 5, 4], [8, 6, 3]]) R.disco(nx + dx, sy + dy, r, hex('#f2f2f2'));
  for (let x = sx + 40; x <= sx + 52; x++) for (let y = sy + 9; y <= sy + 19; y++) ps(x, y, (x - sx) % 4 === 0 && y < sy + 12 ? hex('#5a8ae8') : hex('#a8a8a8'));
  for (const tx of [sx + 40, sx + 50]) { for (let y = sy + 5; y <= sy + 9; y++) for (let x = tx; x <= tx + 2; x++) ps(x, y, y < sy + 7 ? hex('#2a52a0') : hex('#c8c8c8')); }
  for (let y = sy + 15; y <= sy + 19; y++) ps(sx + 46, y, hex('#3a2a1a'));
  for (let y = sy + 20; y <= sy + 32; y++) { const c0 = Math.round(sx + 22 + (y - sy - 20) * 0.9); for (let x = c0; x <= c0 + 4 + (y - sy - 20) * 0.4; x++) ps(x, y, (x + y) % 3 ? hex('#c89a5a') : hex('#a87a3a')); }
  for (let y = sy + 14; y <= sy + 26; y++) { ps(sx + 7, y, hex('#6a3a1a')); ps(sx + 8, y, hex('#8a5a2a')); }
  R.disco(sx + 8, sy + 12, 6, hex('#1a6a1a')); R.disco(sx + 7, sy + 11, 4, hex('#2a9a2a')); ps(sx + 5, sy + 9, hex('#5ac85a'));
  // el caballerito: quieto mientras teclean; en «moved» echa a andar hacia el castillo
  const kx = Math.round(sx + 13 + anda * 24), ky = sy + 31, pa = anda > 0 && anda < 1 ? Math.floor(t * 6) % 2 : 0;
  for (let y = ky - 11; y <= ky - 3; y++) for (let x = kx; x <= kx + 3; x++) ps(x, y, y < ky - 9 ? hex('#c83a3a') : y < ky - 6 ? hex('#f0c8a0') : hex('#2a5aa8'));
  ps(kx + 4, ky - 12, hex('#f2f2f2')); ps(kx + 5, ky - 13, hex('#f2f2f2')); ps(kx + 2, ky - 8, hex('#1a1a1a'));
  for (const [lx, f] of [[0, pa], [3, !pa]]) { ps(kx + lx + (f ? 1 : 0), ky - 2, hex('#1a1a40')); ps(kx + lx + (f ? 1 : 0), ky - 1, hex('#3a2a1a')); }
  // la línea de escribir: «>» y los trazos que se teclean, el cursor que parpadea; con «Enter» se borra
  const ly = sy + 36, gr = hex('#e8e8e8'); ps(sx + 3, ly - 2, gr); ps(sx + 4, ly - 1, gr); ps(sx + 5, ly, gr); ps(sx + 4, ly + 1, gr); ps(sx + 3, ly + 2, gr);
  const nT = t < mueve - 0.35 ? Math.max(0, Math.floor((t - teclea + 0.1) * 8)) : 0;
  let cx = sx + 8; for (let k = 0; k < Math.min(nT, 26); k++) { if (k % 6 !== 5) { R.linea(cx, ly - 1, cx, ly + 2, gr); ps(cx + 1, ly - 1, gr); ps(cx + 1, ly + 2, gr); } cx += 2; if (cx > x1 - 4) break; }
  if (Math.floor(t * 3) % 2) R.linea(cx, ly + 2, cx + 2, ly + 2, gr);
  for (let y = sy; y <= y1; y += 2) for (let x = sx; x <= x1; x += 3) { }
  R.recorte(null);
};
const p4 = (t) => {
  const g = T.casa(R, t, { encuadre: 'porche', camara: 'cerca' });
  const [sx, sy, sw, sh] = g.pantalla; pantallaJuego(sx, sy, sw, sh, t);
  const tec = t > teclea - 0.2 && t < mueve - 0.3, k1 = tec ? Math.floor(t * 9) % 2 : 0, k2 = tec ? Math.floor(t * 9 + 1) % 2 : 0;
  const intro = t > mueve - 0.45 && t < mueve - 0.15 ? 3 : 0;   // la mano derecha pulsa «Enter»
  T.brazo(R, 84, 192, 114, 156 + k1, '#9a6a9a', 1, { codo: [96, 180] });
  T.brazo(R, 236, 192, 200 + intro, 156 + k2 + (intro ? 1 : 0), '#9a6a9a', -1, { codo: [224, 180] });
};
const efectos = [[nunca + 0.1, 'pop'], [a(0.3), 'boing'], [detras + 1.3, 'boing'], [dentro, 'pop'], [teclea, 'tecleo'], [mueve - 0.3, 'toc'], [mueve, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1984 });
''')
