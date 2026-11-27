E = {}
E['dc-medalla'] = ('La medalla', '''// DC-MEDALLA (frase 18). Cuatro planos:
// 1. 1945, de noche, en la tienda de radio: en el mapa clavado salen las chinchetas de las operaciones una a una y,
//    con «20», el número grande; el oficial las señala, el radio teclea y, con «saved thousands of lives», entra un
//    soldado con la noticia y los tres lo celebran (corta en «But»);
// 2. la caja de archivo con el candado, el polvo y la telaraña; la etiqueta cuenta los años de 1945 a 1996 (la barra
//    también) y, con «1996», el candado salta y cae, y la tapa se abre (corta en «Some»);
// 3. 1960, el taller de los artistas: la modelo desfila con el vestido granate; con «fashion designer» el diseñador
//    la presenta y, con «Bill Blass», le pone la banda de oro al maniquí; con «painter» el pintor, subido a su cajón,
//    pinta un campo de color en el cuadro (corta en «and in 2024»);
// 4. 2024, la sala del Capitolio: los tres veteranos muy mayores en la tarima; con «received» la presentadora y el
//    presentador les cuelgan la medalla (el primero se la pone a su compañero), y con «Gold Medal» brilla la medalla
//    grande sobre el telón; flashes.''', r'''
const a = (f) => en('medalla', f);
const P2 = a(0.273), P3 = a(0.488), P4 = a(0.79);
const veinte = a(0.048), salvan = a(0.18), noventa6 = a(0.41), moda = a(0.619), blass = a(0.676), pintor = a(0.715), reciben = a(0.898), oro = a(0.964);
const k = T.C.k, ORO = hex('#f0c840'), AZ = hex('#2a4a9a'), BL = hex('#fff6d0');
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const suave = (u) => u * u * (3 - 2 * u);
// la medalla pequeña en la mano: la cinta azul y el disco de oro
const medallita = (x, y) => { R.rect(x - 1, y - 5, x + 1, y - 2, k); R.pset(x, y - 4, AZ); R.pset(x, y - 3, AZ); R.disco(x, y, 2, k); R.disco(x, y, 1, ORO); R.pset(x - 1, y - 1, BL); };
const destello = (x, y, r, c = BL) => { for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } R.pset(x, y, hex('#ffffff')); };

// 1 · la tienda de radio, 1945: las chinchetas de las operaciones
const TIENDA = { encuadre: 'campo44', camara: 'tienda' };
const PINES = [];
for (let i = 0; PINES.length < 20 && i < 600; i++) {
  const x = 62 + Math.round(hh(i, 1) * 72), y = 62 + Math.round(hh(i, 2) * 34);
  if (x < 102 && y > 72) continue;   // ahí la tapa la radio
  if (PINES.some(([u, v]) => Math.abs(u - x) < 6 && Math.abs(v - y) < 6)) continue;
  PINES.push([x, y]);
}
const p1 = (t) => {
  T.guerra(R, t, TIENDA);
  const n = Math.floor(20 * tramo(t, 0.45, veinte));
  for (let i = 0; i < n; i++) {
    const [x, y] = PINES[i], nueva = i === n - 1 && t < veinte + 0.2;
    R.pset(x + 1, y + 2, hex('#6a5a3a')); R.pset(x + 2, y + 2, hex('#6a5a3a'));
    R.rect(x - 1, y - 1, x + 1, y + 1, k); R.pset(x, y, i % 5 === 4 ? hex('#3a6ad8') : hex('#e8402a')); R.pset(x - 1, y - 1, i % 5 === 4 ? hex('#a8c8ff') : hex('#ffb0a0'));
    if (nueva) destello(x, y - 3, 2);
  }
  // el número grande: veinte operaciones
  const e = tramo(t, veinte, veinte + 0.3);
  if (e > 0) R.numero('20', 100, Math.round(lerp(60, 52, suave(e))) + Math.round(Math.sin(t * 3) * 0.6), { tam: 16, centro: true });
  // el oficial señala el mapa; el radio teclea el Morse; con «saved» entra el soldado con la noticia
  const fiesta = t > salvan + 0.15 && t < salvan + 1.3;
  R.actor(EL.oficialAliado2, 104, 160, t, { dir: -1, dedo: t > 0.5 && t < veinte + 1.6, habla: t > veinte + 0.4 && t < salvan - 0.4 && Math.sin(t * 7) > 0, brazos: fiesta, sonrisa: t > salvan });
  const vuelve = t > salvan;
  R.actor(EL.operadorRadio, 156, 160, t, { dir: vuelve ? -1 : 1, sostiene: !vuelve && !fiesta ? [171, 150] : undefined, brazos: fiesta, sonrisa: vuelve });
  const u = tramo(t, 2.6, salvan - 0.1), xs = Math.round(lerp(270, 240, u));
  R.actor(EL.soldadoGA2, xs, 160, t, { dir: -1, anda: u > 0 && u < 1, brazos: t > salvan && t < salvan + 1.5, sonrisa: t > salvan, habla: t > salvan + 1.5 && Math.sin(t * 6) > 0 });
  T.guerraDelante(R, t, { ...TIENDA, morse: vuelve ? 0 : true });
};

// 2 · la caja de archivo cerrada con candado hasta 1996
const CAJA = { encuadre: 'archivos2004', camara: 'caja' };
const LATON = hex('#c8a040'), LATONL = hex('#f0d880'), LATONS = hex('#7a5a20'), ACERO = hex('#a8b0bc'), ACEROS = hex('#5a6270');
const candado = (x, y, abierto, ang = 0) => {   // (x, y): el centro de arriba del cuerpo
  const dy = abierto ? -3 : 0;
  // el arco
  for (const [i, j] of [[-3, 0], [-3, -1], [-3, -2], [-3, -3], [-2, -4], [-1, -5], [0, -5], [1, -5], [2, -4], [3, -3], [3, -2], [3, -1], [3, 0]]) {
    const xx = x + i + Math.round(ang * j), yy = y + j + (i > 0 ? dy : dy) - (i > 0 && abierto ? 0 : 0);
    R.pset(xx - 1, yy, k); R.pset(xx + 1, yy, k); R.pset(xx, yy - 1, k); R.pset(xx, yy, i < 0 ? ACERO : ACEROS);
  }
  R.rect(x - 6, y, x + 6, y + 10, k); R.rect(x - 5, y + 1, x + 5, y + 9, LATON); R.rect(x - 5, y + 1, x + 5, y + 2, LATONL); R.rect(x - 5, y + 8, x + 5, y + 9, LATONS); R.rect(x + 4, y + 3, x + 5, y + 7, LATONS);
  R.disco(x, y + 5, 1, k); R.rect(x, y + 6, x, y + 8, k);
};
let candadoCae = null;
const p2 = (t) => {
  const abre = tramo(t, noventa6 + 0.45, P3 - 0.35);
  T.animales(R, t, { ...CAJA, abre });
  // el polvo sobre la tapa y la telaraña de la esquina (hasta que se abre)
  if (abre === 0) {
    for (let i = 0; i < 70; i++) { const x = 100 + Math.round(hh(i, 7) * 140), y = 83 + Math.round(hh(i, 8) * 8); R.pset(x, y, (i & 1) ? hex('#d8d4c8') : hex('#b8b4a8')); }
    const [cx, cy] = [233, 84];
    for (const [ex, ey] of [[262, 60], [270, 80], [246, 52], [276, 96]]) R.linea(cx, cy, ex, ey, hex('#d8dce4'));
    for (let r = 6; r <= 24; r += 6) for (let s = 0; s < 3; s++) { const a1 = -1.3 + s * 0.45, a2 = a1 + 0.45; R.linea(cx + Math.round(Math.cos(a1) * r * 1.3), cy + Math.round(Math.sin(a1) * r), cx + Math.round(Math.cos(a2) * r * 1.3), cy + Math.round(Math.sin(a2) * r), hex('#c8ccd4')); }
    // la araña que baja por su hilo
    const ay = 30 + Math.round(10 * Math.sin(t * 1.3));
    R.linea(258, 0, 258, ay, hex('#c8ccd4')); R.rect(257, ay, 259, ay + 2, hex('#2a2430')); R.pset(256, ay + 1, k); R.pset(260, ay + 1, k);
  } else {
    const s = tramo(t, noventa6 + 0.45, noventa6 + 1.4);
    if (s < 1) for (let i = 0; i < 24; i++) { const a0 = hh(i, 3) * Math.PI - Math.PI, d = s * (12 + hh(i, 4) * 26); R.pset(Math.round(170 + Math.cos(a0) * d * 2.2), Math.round(86 + Math.sin(a0) * d), (i & 1) ? hex('#e4e0d4') : hex('#bcb8ac')); }
  }
  // la etiqueta que cuenta los años y el candado
  const año = Math.round(lerp(1945, 1996, tramo(t, P2 + 0.3, noventa6)));
  const caida = tramo(t, noventa6 + 0.2, noventa6 + 0.75);
  const lx = Math.round(170 - 52 * caida), ly = Math.round(93 + 70 * caida * caida), ang = -caida * 0.6;
  // el pasador de la tapa
  if (abre === 0) { R.rect(165, 84, 175, 95, k); R.rect(166, 85, 174, 94, ACERO); R.rect(166, 85, 174, 86, hex('#d8e0ea')); R.rect(169, 89, 171, 92, k); }
  if (caida < 1) {
    candado(lx, ly, t > noventa6, ang);
    const tx = lx + 12, ty = ly + 6;
    R.linea(lx + 3, ly + 4, tx, ty, hex('#8a7a5a'));
    R.rect(tx, ty - 4, tx + 34, ty + 8, k); R.rect(tx + 1, ty - 3, tx + 33, ty + 7, hex('#e0c890')); R.rect(tx + 1, ty + 6, tx + 33, ty + 7, hex('#b89a60')); R.disco(tx + 4, ty + 2, 1, hex('#8a7a5a'));
    R.numero(String(año), tx + 20, ty + 6, { centro: true, color: año >= 1996 ? hex('#c8282a') : hex('#3a2a1a'), sombra: false });
  } else {
    // en la mesa, abierto, con su etiqueta
    candado(118, 163, true, 0.0);
    R.linea(121, 167, 128, 170, hex('#8a7a5a')); R.rect(128, 165, 162, 177, k); R.rect(129, 166, 161, 176, hex('#e0c890')); R.disco(132, 171, 1, hex('#8a7a5a'));
    R.numero('1996', 147, 175, { centro: true, color: hex('#c8282a'), sombra: false });
  }
  if (t > noventa6 && t < noventa6 + 0.35) destello(lx + 5, ly - 4, 3);
};

// 3 · el taller de los artistas, 1960
const TALLER = { encuadre: 'capitolio', camara: 'taller' };
const VESTIDO = { C: hex('#9a1a3e'), c: hex('#62102a') };
const p3 = (t) => {
  T.guerra(R, t, TALLER);
  // el cajón del pintor (para llegar al cuadro)
  R.rect(110, 136, 138, 150, k); R.rect(111, 137, 137, 149, hex('#8a6a3a')); R.rect(111, 137, 137, 138, hex('#b8925a'));
  for (const y of [141, 145]) R.rect(112, y, 136, y, hex('#6a4a24')); R.rect(113, 150, 136, 151, hex('#5a4630'));
  // el campo de color nuevo que pinta (de abajo a la izquierda del cuadro)
  const pin = tramo(t, pintor, P4 - 0.3);
  if (pin > 0) { const x1 = 146 + Math.round(16 * Math.min(1, pin * 1.4)), y0 = 112 - Math.round(26 * pin); R.rect(146, y0, x1, 112, hex('#1e8a4a')); R.rect(146, y0, x1, y0, hex('#3ab06a')); }
  // el pintor, con el pincel largo
  const pinta = t > pintor - 0.1 && t < P4 - 0.2;
  const tipX = pinta ? 150 + Math.round(6 + 6 * Math.sin(t * 9)) : 150 + Math.round(Math.sin(t * 2) * 2), tipY = pinta ? 112 - Math.round(26 * pin * (0.5 + 0.5 * Math.abs(Math.sin(t * 4.5)))) : 104;
  const pi = R.actor(EL.pintorGA, 118, 136, t, { dir: 1, sostiene: [tipX - 10, Math.min(118, tipY + 14)], sonrisa: t > pintor + 1 });
  const [mx, my] = pi.mano; R.linea(mx, my, tipX, tipY, k); R.linea(mx + 1, my, tipX + 1, tipY, hex('#c89a5a')); R.rect(tipX - 1, tipY - 1, tipX + 1, tipY + 1, k); R.pset(tipX, tipY, hex('#1e8a4a'));
  // la modelo desfila con el vestido granate
  let xm = 168, dm = 1, anda = false;
  if (t < P3 + 1.6) { const u = tramo(t, P3 + 0.1, P3 + 1.6); xm = Math.round(lerp(168, 198, u)); anda = u > 0 && u < 1; }
  else if (t < moda + 0.8) { xm = 198; dm = t < P3 + 2.0 || (t > P3 + 2.25 && t < P3 + 2.45) ? 1 : -1; }
  else { const u = tramo(t, moda + 0.8, moda + 2.0); xm = Math.round(lerp(198, 164, u)); dm = -1; anda = u > 0 && u < 1; }
  R.actor(EL.madre62, xm, 152, t, { dir: dm, anda, pal: VESTIDO, sonrisa: t > P3 + 1.6, salto: t > P3 + 2.1 && t < P3 + 2.4 ? 1 : 0 });
  // el diseñador: la presenta y luego le pone la banda de oro al maniquí
  const alManiqui = t > moda + 0.9;
  const xd = alManiqui ? Math.round(lerp(222, 230, tramo(t, moda + 0.9, moda + 1.2))) : 222;
  R.actor(EL.disenadorModa, xd, 150, t, { dir: alManiqui ? 1 : -1, dedo: t > moda && t < moda + 0.9, sostiene: alManiqui && t < pintor + 0.4 ? [248, 112] : undefined, sonrisa: t > moda, habla: t > moda - 1 && t < moda && Math.sin(t * 7) > 0, anda: t > moda + 0.9 && t < moda + 1.2 });
  const banda = tramo(t, blass - 0.3, blass + 0.4);
  if (banda > 0) { const n = Math.round(16 * banda); for (let i = 0; i <= n; i++) { const x = 245 + i, y = 100 + Math.round(i * 0.7); R.pset(x, y, ORO); R.pset(x, y + 1, hex('#a87a18')); } if (t > blass && t < blass + 0.5) destello(253, 104, 3); }
  T.guerraDelante(R, t, TALLER);
};

// 4 · el Capitolio, 2024: la medalla de oro del Congreso
const CAP = { encuadre: 'capitolio' };
const p4 = (t) => {
  T.guerra(R, t, CAP);
  const g1 = reciben + 0.1, g3 = reciben + 0.5, g2 = reciben + 1.0;
  // el presentador sale de detrás del atril con dos medallas; la presentadora entra por la derecha
  const ua = tramo(t, P4 + 0.3, reciben - 0.4), xa = Math.round(lerp(150, 175, ua));
  const da = R.actor(EL.portavoz, xa, 131, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: t < g1 + 0.3 ? (t > reciben - 0.4 ? [198, 116] : true) : undefined, sonrisa: t > g1, habla: t < P4 + 0.3 && Math.sin(t * 6) > 0 });
  if (t < g1) { medallita(da.mano[0], da.mano[1] + 2); }
  const ub = tramo(t, P4 + 0.6, reciben - 0.3), xb = Math.round(lerp(290, 250, ub));
  const db = R.actor(EL.expertoAIR2, xb, 131, t, { dir: -1, anda: ub > 0 && ub < 1, sostiene: t < g3 + 0.3 ? (t > reciben - 0.2 ? [238, 116] : true) : undefined, sonrisa: t > g3 });
  if (t < g3) medallita(db.mano[0], db.mano[1] + 2);
  // los tres veteranos, muy mayores
  const v1 = R.actor(EL.veterano, 192, 131, t, { dir: t > g1 + 0.4 && t < g2 + 0.8 ? 1 : -1, medalla: t > g1, sonrisa: t > g1, sostiene: t > g1 + 0.4 && t < g2 + 0.2 ? [211, 117] : undefined });
  if (t > g1 && t < g2) medallita(v1.mano[0], v1.mano[1] + 2);
  R.actor(EL.veterano2, 212, 131, t, { dir: -1, medalla: t > g2, sonrisa: t > g2, dedo: t > P4 + 0.8 && t < P4 + 1.8 });
  R.actor(EL.veterana, 232, 131, t, { dir: -1, medalla: t > g3, sonrisa: t > g3 || t < P4 + 1.5, brazos: t > P4 + 0.2 && t < P4 + 1.2 });
  for (const [g, x] of [[g1, 199], [g2, 219], [g3, 239]]) if (t > g && t < g + 0.4) destello(x, 118, 3);
  T.guerraDelante(R, t, { ...CAP, medalla: t > oro - 0.25, medallaEn: [165, 66] });
};

const efectos = [[veinte, 'pop'], [salvan + 0.15, 'palmada'], [noventa6, 'cerrojo'], [noventa6 + 0.75, 'golpecito'], [P3 - 0.9, 'papel'],
  [moda, 'flash'], [blass, 'brillo'], [pintor + 0.1, 'lapiz'], [reciben + 0.1, 'flash'], [oro - 0.2, 'brillo'], [oro + 0.4, 'publico']];
const año = (t) => t < P2 ? 1945 : t < P3 ? Math.round(lerp(1945, 1996, tramo(t, P2 + 0.3, noventa6))) : t < P4 ? 1960 : 2024;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['dc-pyke'] = ('Geoffrey Pyke', '''// DC-PYKE (frase 19), 1942. Cuatro planos:
// 1. el Atlántico Norte de perfil, con aguanieve: el mercante del convoy navega; con «submarines» el submarino sube a cota
//    de periscopio y saca el periscopio; con «sinking ships» el torpedo llega al casco: la columna de agua y el barco se
//    escora (sin fuego ni nadie); corta en «middle»;
// 2. el despacho de Londres con la lluvia: el oficial señala la zona sin aviones del mapa y, con «out of reach of
//    planes», los avioncitos dan la vuelta en el borde; con «and an inventor» entra Pyke chorreando y, con
//    «proposed», levanta el dedo; los oficiales se sorprenden (corta en «a solution»);
// 3. el mapa de cerca: a lápiz se dibuja el iceberg en mitad de la zona sin aviones y se convierte en el portaaviones
//    con «aircraft carrier made of ice»; corta en «it's cheap»;
// 4. el norte helado: icebergs y témpanos a montones; una foca se tira al agua y asoma, un oso pasa, una gaviota se posa;
//    la cámara se desliza a la derecha y salen más icebergs con «plenty».''', r'''
const a = (f) => en('pyke', f);
const P2 = a(0.34), P3 = a(0.654), P4 = a(0.887);
const subs = a(0.224), hunden = a(0.281), atlantico = a(0.378), aviones = a(0.464), inventor = a(0.508), pike = a(0.588), propone = a(0.612), portaav = a(0.711), hieloW = a(0.791), flota = a(0.842), norte = a(0.927), mucho = a(0.96);
const k = T.C.k;
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dith = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const grad = (pal, f, x, y) => { const q = Math.max(0, Math.min(0.999, f)) * (pal.length - 1), i = Math.floor(q); return pal[Math.min(pal.length - 1, i + (q - i > dith(x, y) ? 1 : 0))]; };
const suave = (u) => u * u * (3 - 2 * u);
// una nube de varias bolas en tres tonos (luz arriba, cuerpo, sombra abajo), que se funde con el cielo cerca de Atom
const nube = (cx, cy, w, tonos, s) => { const [cl, cm, cs] = tonos; for (let i = 0; i < 7; i++) { const bx = cx + Math.round((i - 3) * w / 7), r = Math.round(w * (0.13 + 0.1 * hh(i, s)) * (i === 0 || i === 6 ? 0.65 : 1)), by = cy - Math.round(r * 0.5 * hh(i, s + 1));
  for (let y = by - r; y <= cy + 2; y++) for (let x = bx - r; x <= bx + r; x++) { const q = ((x - bx) ** 2 + ((y - by) * 1.5) ** 2) / (r * r); if (q > 1 || x < 0 || x > 319 || y < 0) continue;
    const v = (y - (by - r)) / (cy + 2 - by + r); let c = v < 0.3 && q > 0.35 ? cl : v > 0.72 ? cs : cm; if (q > 0.8 && dith(x, y) < 0.5) c = R.pget(x, y);
    const f = Math.max(Math.min(1, Math.max(0, (x - 248) / 24)) * (y < 50 ? 1 : 0), y < 18 ? 1 : 0); R.pset(x, y, f > 0 ? mez(c, R.pget(x, y), f) : c); } } };

// 1 · el Atlántico de perfil
const CIELO = ['#343c4a', '#3e4654', '#4a5260', '#586070', '#687280', '#7c8692', '#929ca6'].map(hex);
const MARL = ['#56687a', '#46596a', '#3a4e60', '#30455a'].map(hex);
const BAJO = ['#2e6a82', '#285e76', '#22526a', '#1c465e', '#173c52', '#123246', '#0d283a', '#0a2030'].map(hex);
let fMar = null;
const fijoMar = () => {
  if (!fMar) { fMar = R.nuevo(); const prev = R.usar(fMar);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 60 ? grad(CIELO, y / 60, x, y) : y < 93 ? grad(MARL, (y - 60) / 33, x, y) : grad(BAJO, (y - 93) / 87, x, y));
    for (let x = 0; x < 320; x++) { R.pset(x, 60, hex('#a8b2bc')); if (x % 3) R.pset(x, 61, hex('#7a8a98')); }
    R.usar(prev); }
  R.copiar(fMar);
};
const rot = (cx, cy, ang) => ([x, y]) => [Math.round(cx + x * Math.cos(ang) - y * Math.sin(ang)), Math.round(cy + x * Math.sin(ang) + y * Math.cos(ang))];
const mercante = (cx, wl, ang, t) => {
  const P = rot(cx, wl, ang), pol = (pts, c) => R.poligono(pts.map(P), c);
  const CASCO = [[-50, -9], [48, -9], [58, -12], [50, 12], [-44, 12], [-52, -8]];
  pol(CASCO.map(([x, y]) => [x + 1, y + 1]), k); pol(CASCO, hex('#3c3e46'));
  pol([[-50, -9], [48, -9], [58, -12], [57, -10], [-51, -7]], hex('#6a6e78'));
  for (let i = -40; i <= 44; i += 7) { const [x, y] = P([i, -5]); R.pset(x, y, hex('#1e2026')); }
  // bajo la línea de flotación, el rojo de la obra viva, apagado por el agua
  R.recorte([0, 93, 319, 179]); pol(CASCO, hex('#6a3a40')); pol([[-44, 10], [50, 10], [50, 12], [-44, 12]], hex('#4a2a30')); R.recorte(null);
  // las bodegas, la superestructura, la chimenea y los palos
  pol([[-40, -9], [-24, -9], [-24, -13], [-40, -13]], hex('#5a4a3a')); pol([[26, -9], [42, -9], [42, -13], [26, -13]], hex('#5a4a3a'));
  pol([[-12, -9], [16, -9], [16, -22], [-10, -22]], k); pol([[-11, -10], [15, -10], [15, -21], [-9, -21]], hex('#c8ccd0'));
  pol([[-9, -21], [14, -21], [14, -24], [-7, -24]], hex('#e4e8ea')); for (let i = -7; i <= 12; i += 4) { const [x, y] = P([i, -17]); R.rect(x, y, x + 1, y, hex('#2a3a4a')); }
  pol([[0, -24], [7, -24], [8, -34], [1, -34]], k); pol([[1, -25], [6, -25], [7, -33], [2, -33]], hex('#2a2a30')); pol([[1, -30], [7, -30], [7, -32], [1, -32]], hex('#b83a2a'));
  for (const m of [-34, 34]) { const [x0, y0] = P([m, -9]), [x1, y1] = P([m, -40]); R.linea(x0, y0, x1, y1, k); const [d0, e0] = P([m, -30]), [d1, e1] = P([m + (m < 0 ? 10 : -10), -14]); R.linea(d0, e0, d1, e1, hex('#4a4c52')); }
  { const [x0, y0] = P([-34, -40]), [x1, y1] = P([34, -40]); R.linea(x0, y0, x1, y1, hex('#4a4c52')); const [x2, y2] = P([-52, -8]); R.linea(x0, y0, x2, y2, hex('#4a4c52')); }
  // el humo de la chimenea
  const [hx, hy] = P([4, -35]);
  for (let i = 0; i < 6; i++) { const f = ((t * 0.5 + i / 6) % 1); R.disco(Math.round(hx - f * 40), Math.round(hy - f * 12), 2 + Math.round(f * 4), mez(hex('#3a3a40'), hex('#7a828c'), f)); }
};
const submarino = (x, y) => {
  const S = hex('#1c303c'), SL = hex('#5a7a8a'), SK = hex('#0c161c');
  const C1 = [[-32, 0], [-26, -4], [24, -4], [33, 0], [24, 4], [-26, 4]];
  R.poligono(C1.map(([a1, b]) => [x + a1, y + b + 1]), SK); R.poligono(C1.map(([a1, b]) => [x + a1, y + b]), S); for (let i = -26; i <= 24; i++) { R.pset(x + i, y - 4, SL); if (i % 3 === 0) R.pset(x + i, y + 4, SK); }
  R.poligono([[x - 6, y - 4], [x - 4, y - 11], [x + 6, y - 11], [x + 8, y - 4]], S); R.linea(x - 4, y - 11, x + 6, y - 11, SL);
  R.linea(x + 12, y - 5, x + 16, y - 7, S); R.linea(x - 30, y + 1, x - 36, y - 1, S); R.linea(x - 30, y + 1, x - 36, y + 3, S);
  for (const i of [-20, -10, 10, 18]) R.pset(x + i, y - 1, hex('#22343e'));
};
const p1 = (t) => {
  fijoMar();
  // las nubes de tormenta, en tres tonos y a tres velocidades
  for (const [v, y, c, n, w] of [[2, 24, ['#5a6270', '#3a424e', '#2a303a'], 4, 64], [4, 36, ['#7a8290', '#56606c', '#3e4652'], 5, 48], [8, 50, ['#a8b0ba', '#848e9a', '#626c78'], 6, 34]])
    for (let i = 0; i < n; i++) { const x = ((hh(i, v) * 400 + t * v) % 400) - 40; nube(Math.round(x), y + Math.round(hh(i, v + 3) * 6), w, c.map(hex), i + v * 10); }
  // el aguanieve
  for (let i = 0; i < 90; i++) { const x = Math.round((hh(i, 21) * 340 - t * 30) % 340 + 340) % 340 - 10, y = Math.round((hh(i, 22) * 92 + t * 70) % 92); if (y < 16 || (x > 272 && y < 48)) continue; R.pset(x, y, hex('#c8d2dc')); R.pset(x - 1, y - 1, hex('#8a96a2')); }
  // dos gaviotas
  for (let i = 0; i < 2; i++) { const x = Math.round(200 - t * (6 + i * 3) - i * 70), y = 52 + i * 5, f = Math.floor(t * 5 + i) % 2; R.pset(x, y, k); R.pset(x - 1, y - f, k); R.pset(x - 2, y - 1 + f, k); R.pset(x + 1, y - f, k); R.pset(x + 2, y - 1 + f, k); }
  // el convoy a lo lejos, con su humo
  for (let i = 0; i < 3; i++) { const x = Math.round(20 + i * 52 + t * 1.5); R.rect(x, 57, x + 12, 59, hex('#3a3e48')); R.rect(x + 4, 54, x + 7, 56, hex('#3a3e48')); R.pset(x + 6, 53, hex('#3a3e48')); for (let j = 0; j < 4; j++) R.pset(x + 5 - j * 2, 52 - j, hex('#6a7480')); }
  // las olas del mar de fondo
  for (let i = 0; i < 110; i++) { const y = 62 + Math.floor(hh(i, 5) ** 0.7 * 29), l = 2 + Math.round((y - 60) / 6), x = Math.round(((hh(i, 6) * 340 - t * (3 + (y - 60) * 0.25)) % 340 + 340) % 340) - 10; R.linea(x, y, x + l, y, hex('#7a8c9a')); if ((i & 3) === 0) R.linea(x + 1, y - 1, x + l - 1, y - 1, hex('#b8c6d0')); }
  // bajo el agua: rayos de luz, motas y un banco de peces
  for (let r = 0; r < 4; r++) { const x0 = Math.round(30 + r * 80 + Math.sin(t * 0.4 + r) * 6); for (let y = 94; y < 170; y++) { const w = 2 + (y - 94) * 0.06, xc = x0 + (y - 94) * 0.35; for (let x = Math.round(xc - w); x <= Math.round(xc + w); x++) if (((x + y) & 1) && y % 3) R.pset(x, y, mez(R.pget(x, y), hex('#5aa0b8'), 0.35 * (1 - (y - 94) / 76))); } }
  for (let i = 0; i < 40; i++) { const x = Math.round((hh(i, 31) * 320 + Math.sin(t * 0.7 + i) * 4)), y = 96 + Math.round(((hh(i, 32) * 84 - t * 3) % 84 + 84) % 84); R.pset(x, y, hex('#6aa8bc')); }
  for (let i = 0; i < 9; i++) { const x = Math.round(((260 - t * 9 + hh(i, 41) * 30) % 360 + 360) % 360) - 20, y = 160 + Math.round(hh(i, 42) * 10 + Math.sin(t * 2 + i) * 1.5); R.linea(x, y, x + 2, y, hex('#3a7088')); R.pset(x + 3, y - 1, hex('#3a7088')); R.pset(x + 3, y + 1, hex('#3a7088')); }
  for (let i = 0; i < 2; i++) { const x = Math.round(90 + i * 140 + Math.sin(t * 0.5 + i) * 6), y = Math.round(130 + i * 18 - ((t * 2 + i * 7) % 10)), p = Math.floor(t * 3 + i) % 2;
    R.disco(x, y, 4, hex('#7ab8cc')); R.rect(x - 4, y + 1, x + 4, y + 2, hex('#2a5a72')); R.disco(x, y - 1, 2, hex('#b8e4f0')); for (let j = -3; j <= 3; j += 2) R.linea(x + j, y + 2, x + j + (p ? 1 : -1), y + 7 + (j & 2), hex('#6aa8bc')); }
  for (let i = 0; i < 3; i++) { const x = Math.round(((330 - t * 14 + i * 37) % 380 + 380) % 380) - 30, y = 120 + i * 14; R.poligono([[x, y], [x + 5, y - 2], [x + 9, y], [x + 5, y + 2]], hex('#4a8aa0')); R.poligono([[x + 9, y], [x + 12, y - 2], [x + 12, y + 2]], hex('#3a7088')); R.pset(x + 2, y - 1, hex('#0a2030')); }
  // el submarino: avanza hondo y sube a cota de periscopio con «submarines»
  const sx = Math.round(lerp(-40, 64, tramo(t, 0, hunden - 0.4))), sy = Math.round(lerp(150, 116, suave(tramo(t, subs - 0.5, subs + 0.4))));
  const per = tramo(t, subs + 0.1, subs + 0.6);
  if (per > 0) { const top = Math.round(lerp(sy - 11, 85, per)); R.linea(sx + 1, sy - 11, sx + 1, top, hex('#14222c')); R.rect(sx + 1, top, sx + 4, top + 1, hex('#14222c')); if (top < 93) { R.rect(sx + 1, Math.max(top, 86), sx + 1, 92, hex('#2a3a44')); R.pset(sx + 4, top, hex('#d8e4ea')); for (let j = 1; j < 9; j++) { R.pset(sx - j, 92 - Math.round(j * 0.3), hex('#e4eef2')); R.pset(sx + 3 + Math.round(j * 0.5), 92, hex('#c8d8e0')); } } }
  submarino(sx, sy);
  for (let i = 0; i < 6; i++) { const f = (t * 1.5 + i / 6) % 1; R.pset(Math.round(sx - 36 - f * 18), Math.round(sy - f * 6 + Math.sin(i + t * 4)), hex('#8ac8dc')); }
  if (t > subs - 0.5 && t < subs + 0.6) for (let i = 0; i < 10; i++) { const b = (t * 2 + i / 10) % 1; R.pset(sx - 20 + i * 4, Math.round(sy - 6 - b * 20), hex('#9ad0e0')); }
  // el torpedo y el golpe (una columna de agua, sin fuego)
  const cx = 206, ux = tramo(t, hunden - 0.45, hunden + 0.08), tx = Math.round(lerp(sx + 34, cx - 40, ux)), ty = Math.round(lerp(sy, 99, ux));
  if (ux > 0 && ux < 1) { R.rect(tx - 4, ty, tx + 2, ty + 1, hex('#8a949e')); R.pset(tx + 3, ty, hex('#c8ccd0')); for (let j = 1; j < 12; j++) R.pset(tx - 4 - j * 3, ty - (j & 1) - Math.round(hh(j, Math.floor(t * 8)) * 2), hex('#b8e0ec')); }
  const golpe = tramo(t, hunden + 0.08, hunden + 1.0), esc = tramo(t, hunden + 0.15, P2);
  mercante(cx, 92 + Math.round(Math.sin(t * 1.6) * 0.8 + esc * 2), -0.055 * suave(esc) + Math.sin(t * 1.1) * 0.006, t);
  // la línea del agua, con sus crestas
  for (let x = 0; x < 320; x++) { const yw = 92 + Math.round(Math.sin(x * 0.09 + t * 2.2) * 1.2 + Math.sin(x * 0.23 - t * 3.1) * 0.6); R.pset(x, yw, hex('#d4e2ea')); R.pset(x, yw + 1, hex('#6a9ab0')); if ((x + Math.floor(t * 4)) % 11 === 0) R.pset(x, yw - 1, hex('#ffffff')); }
  if (golpe > 0 && golpe < 1) { const h = Math.round(46 * Math.sin(Math.PI * golpe)), x0 = cx - 40; R.poligono([[x0 - 8, 93], [x0 - 4, 93 - h * 0.7], [x0, 93 - h], [x0 + 5, 93 - h * 0.8], [x0 + 9, 93]].map(([a1, b]) => [a1, Math.round(b)]), hex('#e8f2f6'));
    R.poligono([[x0 - 4, 93], [x0, 93 - h * 0.6], [x0 + 4, 93]].map(([a1, b]) => [a1, Math.round(b)]), hex('#b8d8e4'));
    for (let i = 0; i < 14; i++) { const ang = -Math.PI * (0.2 + 0.6 * hh(i, 51)), d = golpe * (14 + hh(i, 52) * 24); R.pset(Math.round(x0 + Math.cos(ang) * d), Math.round(93 - h * 0.5 + Math.sin(ang) * d + golpe * golpe * 20), hex('#e8f2f6')); }
    for (let i = 0; i < 12; i++) R.pset(x0 - 6 + Math.round(hh(i, 53) * 14), 96 + Math.round(((t * 30 + i * 5) % 30)), hex('#a8dcec')); }
};

// 2 · el despacho de Londres
const LON = { encuadre: 'londres42' };
const avion = (x, y, d, c) => { R.linea(x - 2, y, x + 2, y, c); R.linea(x, y - 2, x, y + 2, c); R.pset(x - 2 * d, y - 1, c); R.pset(x - 2 * d, y + 1, c); R.pset(x + 3 * d, y, c); };
const p2 = (t) => {
  T.hielo(R, t, LON);
  // los avioncitos del mapa no llegan al centro: dan la vuelta en el borde de su alcance
  R.recorte([84, 34, 214, 110]);
  for (const [x0, x1, y0, y1, s] of [[100, 128, 72, 64, 0], [200, 180, 52, 58, 0.25]]) {
    const ida = tramo(t, atlantico - 0.2 + s, aviones), vuelta = tramo(t, aviones + 0.1, inventor + 0.6);
    const u = ida - vuelta, d = vuelta > 0 ? Math.sign(x0 - x1) : Math.sign(x1 - x0);
    if (ida > 0 && vuelta < 1) { const x = Math.round(lerp(x0, x1, u)), y = Math.round(lerp(y0, y1, u) + (vuelta > 0 ? 3 * Math.sin(Math.PI * vuelta) : 0)); avion(x + 1, y + 1, d, hex('#f4f0e4')); avion(x, y, d, hex('#1e2a4a')); }
    if (t > aviones - 0.1 && t < aviones + 0.5) { const xx = x1 + Math.sign(x1 - x0) * 6; R.linea(xx, y1 - 6, xx, y1 + 6, hex('#c8282a')); R.linea(xx - 1, y1 - 6, xx - 1, y1 + 6, hex('#c8282a')); }
  }
  R.recorte(null);
  // las huellas mojadas y las gotas de Pyke
  const up = tramo(t, inventor + 0.05, pike - 0.1), xp = Math.round(lerp(-18, 104, up));
  for (let i = 0; i < 14; i++) { const x = -10 + i * 9; if (x < xp - 6) { const f = Math.max(0, 1 - (t - (inventor + (x + 18) / 122 * (pike - 0.15 - inventor))) / 6); if (f > 0) { R.rect(x, 168 + (i & 1) * 2, x + 3, 169 + (i & 1) * 2, mez(hex('#5a3a22'), hex('#2a1a10'), f)); } } }
  if (up > 0) for (let i = 0; i < 6; i++) { const f = (t * 2.5 + i / 6) % 1; R.pset(xp + 2 + i * 2, Math.round(146 + f * 16), hex('#8ac0e0')); }
  // el oficial delante del mapa y el de la mesa
  const sorpresa = t > propone + 0.2;
  R.actor(EL.oficialAliado, 150, 164, t, { dir: -1, dedo: t > atlantico - 0.3 && t < aviones, triste: t > aviones && t < propone, sorpresa, habla: t > P2 + 0.2 && t < atlantico - 0.3 && Math.sin(t * 7) > 0 });
  R.actor(EL.oficialNaval, 236, 150, t, { dir: -1, habla: t > atlantico && t < aviones && Math.sin(t * 6) > 0, triste: t > aviones && t < propone, sorpresa, sonrisa: t > propone + 0.7 });
  R.actor(EL.pyke, xp, 166, t, { dir: 1, anda: up > 0 && up < 1, dedo: t > propone - 0.05, habla: t > pike && Math.sin(t * 7) > 0, sonrisa: t > propone + 0.3 });
  T.hieloDelante(R, t, LON);
};

// 3 · el mapa de cerca: el iceberg que se convierte en portaaviones
const MAPA = { encuadre: 'londres42', camara: 'mapa' };
const p3 = (t) => {
  const d = t < portaav - 0.05 ? 0.45 * tramo(t, P3 + 0.15, portaav - 0.05) : t < portaav + 0.25 ? 0.45 + 0.1 * tramo(t, portaav - 0.05, portaav + 0.25) : 0.55 + 0.45 * tramo(t, portaav + 0.25, hieloW + 0.5);
  const g = T.hielo(R, t, { ...MAPA, dibuja: d });
  // con «Ice floats» el portaaviones de lápiz se mece en su mar
  if (t > flota) { const [cx, cy] = g.iceberg; const w = Math.round(Math.sin((t - flota) * 6) * 1.4); for (let x = -38; x <= 38; x += 2) R.pset(cx + x, cy + 11 + ((x / 2 + w) & 1), hex('#3a6a9a')); }
};

// 4 · el norte: hielo a montones
const CIELO4 = ['#5a9cd0', '#6aa8d8', '#7ab6e0', '#8ec4e6', '#a6d2ec', '#c2e2f2', '#dceff6'].map(hex);
const MAR4 = ['#4a88b8', '#3a78a8', '#2e6a9a', '#245c8c', '#1c4e7e'].map(hex);
let fNorte = null;
const fijoNorte = () => {
  if (!fNorte) { fNorte = R.nuevo(); const prev = R.usar(fNorte);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 72 ? grad(CIELO4, y / 72, x, y) : grad(MAR4, (y - 72) / 108, x, y));
    // el halo del sol bajo
    for (let y = 18; y < 72; y++) for (let x = 20; x < 110; x++) { const r = Math.hypot(x - 62, (y - 40) * 1.2); if (r < 30 && dith(x, y) < (1 - r / 30) * 0.8) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d8'), 0.5)); }
    R.disco(62, 40, 7, hex('#fff2c8')); R.disco(62, 40, 5, hex('#ffffff'));
    // la costa helada del fondo: montes y glaciares
    for (let x = 0; x < 320; x++) { const h = 8 + Math.round(6 * Math.sin(x * 0.05) + 4 * Math.sin(x * 0.13 + 1) + 2 * Math.sin(x * 0.4)); for (let y = 72 - h; y < 72; y++) R.pset(x, y, (x * 3 + y * 5) % 17 < 6 + (y - 72 + h) ? hex('#a8c8de') : hex('#e8f4fa')); R.pset(x, 72 - h, hex('#ffffff')); }
    for (let x = 0; x < 320; x++) R.pset(x, 72, hex('#c8e0ee'));
    R.usar(prev); }
  R.copiar(fNorte);
};
const iceberg = (x, base, w, h, s, pico) => {
  const pts = []; for (let i = 0; i <= 8; i++) { const u = i / 8, xx = x - w / 2 + u * w, yy = base - h * (pico ? Math.max(0.25, 1 - Math.abs(u - 0.45) * 1.9) * (0.85 + 0.15 * hh(i, s)) : (u < 0.1 || u > 0.9 ? 0.6 : 0.95 + 0.05 * hh(i, s))); pts.push([Math.round(xx), Math.round(yy)]); }
  const poly = [[Math.round(x - w / 2 - 2), base], ...pts, [Math.round(x + w / 2 + 2), base]];
  // lo de bajo el agua, turquesa y difuso
  R.poligono([[Math.round(x - w / 2), base], [Math.round(x + w / 2), base], [Math.round(x + w / 3), base + Math.round(h * 0.5)], [Math.round(x - w / 3), base + Math.round(h * 0.6)]], (xx, yy) => ((xx + yy) & 1) ? hex('#5ab0c8') : R.pget(xx, yy));
  R.poligono(poly.map(([a1, b]) => [a1 + 1, b]), hex('#5a8ab0')); R.poligono(poly, hex('#f4fbff'));
  R.poligono(poly.map(([a1, b]) => [a1, b]), (xx, yy) => xx > x + w * 0.08 ? (((xx + yy) % 3) ? hex('#b8daec') : hex('#94c2dc')) : (yy > base - 3 ? hex('#d4ecf6') : hex('#f4fbff')));
  for (let i = 0; i < pts.length - 1; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], hex('#ffffff'));
  for (let xx = Math.round(x - w / 2 - 2); xx <= x + w / 2 + 2; xx++) if (xx & 1) R.pset(xx, base + 1, hex('#e4f4fa'));
};
const tempano = (x, y, w, c, t, i) => { const b = Math.round(Math.sin(t * 1.8 + i) * 0.8); R.poligono([[x - w, y + b], [x - w + 4, y - 4 + b], [x + w - 3, y - 5 + b], [x + w, y - 1 + b], [x + w - 4, y + 2 + b], [x - w + 3, y + 2 + b]], hex('#5a90b8')); R.poligono([[x - w, y - 1 + b], [x - w + 4, y - 5 + b], [x + w - 3, y - 6 + b], [x + w, y - 2 + b], [x + w - 4, y + b], [x - w + 3, y + 1 + b]], c); R.linea(x - w + 4, y - 5 + b, x + w - 3, y - 6 + b, hex('#ffffff')); return b; };
const p4 = (t) => {
  fijoNorte();
  // la cámara se desliza a la derecha: más hielo con «plenty»
  const pan = 70 * suave(tramo(t, P4 + 0.3, E.duracion - 0.2));
  // las nubes altas, en tres tonos a tres velocidades
  for (const [v, y, c, n, w] of [[1.5, 24, ['#ffffff', '#e4f0f8', '#c4dcec'], 3, 54], [3, 36, ['#ffffff', '#d8eaf4', '#b4d0e4'], 4, 42], [6, 50, ['#f4fafd', '#cce2f0', '#a8c8de'], 4, 30]])
    for (let i = 0; i < n; i++) { const x = ((hh(i, v + 7) * 420 + t * v - pan * 0.2) % 420 + 420) % 420 - 50; nube(Math.round(x), y + Math.round(hh(i, v + 9) * 5), w, c.map(hex), i + 40 + v * 10); }
  // brillos del sol en el agua y ondas
  for (let i = 0; i < 120; i++) { const y = 74 + Math.floor(hh(i, 61) ** 0.8 * 104), l = 2 + Math.round((y - 72) / 10), x = Math.round(((hh(i, 62) * 360 - t * 2 - pan * (0.3 + (y - 72) / 150)) % 360 + 360) % 360) - 20; R.linea(x, y, x + l, y, (i % 4) ? hex('#6aa4cc') : hex('#d8f0fa')); }
  // los icebergs (paralaje: los de lejos se mueven menos)
  const ICE = [[40, 92, 46, 22, 1, true], [130, 96, 70, 16, 2, false], [236, 90, 40, 26, 3, true], [330, 98, 60, 20, 4, false], [400, 94, 38, 30, 5, true], [460, 100, 50, 14, 6, false]];
  for (const [x, b, w, h, s, p] of ICE) { const xx = Math.round(x - pan * 0.55 + Math.sin(t * 0.3 + s) * 1.5); if (xx > -60 && xx < 380) iceberg(xx, b, w, h, s, p); }
  // un oso que pasa por un témpano a media distancia
  { const bx = Math.round(176 - pan * 0.7 - (t - P4) * 4), by = 120; tempano(bx + 2, by + 4, 30, hex('#eef8fc'), t, 9); const f = Math.floor(t * 4) % 2, O = hex('#f6f2e2'), OS = hex('#d4ccb4');
    R.poligono([[bx - 10, by - 6], [bx - 4, by - 9], [bx + 8, by - 9], [bx + 12, by - 6], [bx + 12, by - 1], [bx - 10, by - 1]].map(([u, v]) => [u, v + 1]), k);
    R.poligono([[bx - 10, by - 6], [bx - 4, by - 9], [bx + 8, by - 9], [bx + 12, by - 6], [bx + 12, by - 1], [bx - 10, by - 1]], O); R.linea(bx - 8, by - 2, bx + 11, by - 2, OS);
    for (const [lx, fa] of [[-9, f], [-5, 1 - f], [6, f], [10, 1 - f]]) R.rect(bx + lx, by - 1, bx + lx + 1, by + 2 - fa, O), R.pset(bx + lx, by + 2 - fa, k);
    R.poligono([[bx - 16, by - 7], [bx - 12, by - 9], [bx - 9, by - 8], [bx - 9, by - 4], [bx - 15, by - 4]], O); R.pset(bx - 16, by - 6, k); R.pset(bx - 13, by - 8, k); R.pset(bx - 11, by - 10, OS); }
  { const xx = Math.round(430 - pan * 2.5); if (xx < 400) iceberg(xx, 146, 92, 50, 8, true); }
  // los témpanos de delante, con la foca que se tira al agua y la gaviota que se posa
  const TEM = [[70, 140, 30], [190, 154, 40], [300, 136, 26], [380, 162, 34], [440, 132, 28]];
  let bF = 0;
  TEM.forEach(([x, y, w], i) => { const xx = Math.round(x - pan); if (xx > -50 && xx < 370) { const b = tempano(xx, y, w, hex('#f4fbff'), t, i); if (i === 1) bF = b; } });
  const fx = Math.round(190 - pan), salta = tramo(t, P4 + 0.25, P4 + 0.8), fy = 147 + bF;
  const foca = (x, y, ang) => { const F = hex('#6a6058'), FL = hex('#9a8e80'), pts = [[-13, 0], [-10, -6], [0, -8], [9, -7], [14, -4], [12, 0], [2, 2], [-8, 2]].map(([u, v]) => [Math.round(x + u * Math.cos(ang) - v * Math.sin(ang)), Math.round(y + u * Math.sin(ang) + v * Math.cos(ang))]);
    R.poligono(pts.map(([u, v]) => [u, v + 1]), k); R.poligono(pts, F); R.linea(pts[1][0], pts[1][1], pts[3][0], pts[3][1], FL); R.pset(pts[4][0] - 1, pts[4][1] + 1, k); R.pset(pts[5][0], pts[5][1], hex('#2a2420'));
    R.linea(pts[0][0], pts[0][1], pts[0][0] - 3, pts[0][1] - 2, F); R.linea(pts[0][0], pts[0][1], pts[0][0] - 3, pts[0][1] + 2, F); for (let j = 0; j < 4; j++) R.pset(x - 4 + j * 3, y - 4 + (j & 1), hex('#4a423a')); };
  if (salta < 1) foca(Math.round(fx + 2 + salta * 34), Math.round(fy - 5 - Math.sin(Math.PI * salta) * 10 + salta * salta * 14), salta * 0.9);
  else { const x = fx + 42, y = 160 + Math.round(Math.sin(t * 3) * 1); R.disco(x, y, 5, k); R.disco(x, y, 4, hex('#6a6058')); R.pset(x + 2, y - 2, k); R.pset(x + 4, y, hex('#2a2420')); R.pset(x - 1, y - 3, hex('#9a8e80')); for (let r = 6; r < 13; r += 2) { R.pset(x - r, y + 4, hex('#d8f0fa')); R.pset(x + r, y + 4, hex('#d8f0fa')); } }
  { const x0 = Math.round(-30 - pan * 1.2); R.poligono([[x0, 168], [x0 + 20, 160], [x0 + 70, 158], [x0 + 96, 164], [x0 + 104, 180], [x0, 180]], hex('#5a90b8'));
    R.poligono([[x0, 166], [x0 + 20, 158], [x0 + 70, 156], [x0 + 94, 162], [x0 + 102, 180], [x0, 180]], (x, y) => ((x * 3 + y * 7) % 19 === 0) ? hex('#b8daec') : y > 172 ? hex('#d8ecf6') : hex('#f4fbff'));
    R.linea(x0 + 20, 158, x0 + 70, 156, hex('#ffffff')); R.linea(x0 + 30, 166, x0 + 46, 172, hex('#94c2dc')); R.linea(x0 + 46, 172, x0 + 60, 170, hex('#94c2dc')); R.linea(x0 + 60, 164, x0 + 74, 176, hex('#94c2dc'));
    for (let i = 0; i < 4; i++) R.disco(x0 + 14 + i * 20, 160 + (i & 1) * 3, 2, hex('#ffffff')); }
  if (salta > 0.7 && salta < 1) for (let i = 0; i < 8; i++) R.pset(fx + 34 + i * 2 - 7, 156 - Math.round(Math.sin(i) * 4 * (1 - salta) * 5), hex('#ffffff'));
  { const gx = Math.round(lerp(330, 250 - pan * 0.55 + pan * 0.55, tramo(t, norte - 0.6, mucho))), gy = Math.round(lerp(40, 66, tramo(t, norte - 0.6, mucho))), f = t < mucho ? Math.floor(t * 8) % 2 : 2;
    const ix = Math.round(236 - pan * 0.55), px = t < mucho ? gx : ix, py = t < mucho ? gy : 63;
    if (f < 2) { R.pset(px, py, hex('#ffffff')); R.pset(px - 1, py - f, k); R.pset(px - 2, py - 1 + f, k); R.pset(px + 1, py - f, k); R.pset(px + 2, py - 1 + f, k); }
    else { R.rect(px - 1, py - 3, px + 2, py - 1, hex('#ffffff')); R.pset(px - 2, py - 2, hex('#8a96a2')); R.pset(px + 3, py - 3, hex('#e8a830')); R.pset(px, py, hex('#e8a830')); } }
};

const efectos = [[subs - 0.3, 'burbujas'], [hunden + 0.1, 'chof'], [inventor + 0.05, 'puerta'], [P3 + 0.2, 'lapiz'], [hieloW + 0.5, 'brillo'], [P4 + 0.75, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1942 });
''')

E['dc-pykrete'] = ('El pykrete', '''// DC-PYKRETE (frase 20). Cuatro planos:
// 1. 1942, el taller frío: el técnico parte de un martillazo el bloque de hielo normal («breaks»); con «mixed the water
//    with wood pulp» el otro echa el agua y el serrín en el molde, que se llena; Pyke da las instrucciones y un
//    canadiense trae el saco de serrín (corta en «frozen»);
// 2. el banco de cerca (inserto): el martillo rebota en el bloque de pykrete («tougher»); con «took far longer to melt»
//    se enciende la estufa y el hielo normal se derrite en un charco mientras el pykrete apenas suda; con «pykrete» una
//    mano lo marca con el sello (corta en «The story»);
// 3. 1943, el cuarto de baño: Mountbatten, de uniforme blanco, entra con el bloque, lo lanza a la bañera llena (sin
//    nadie dentro) con «dropping a block» y el bloque flota; en el borde, un puro que humea (corta en «and that»);
// 4. la sala de reuniones con los altos mandos: un oficial entra, apunta al bloque de la mesa (solo al bloque) y, con
//    «the bullet bounced», la bala rebota con un «pling»; el gato espía, que miraba, se esconde bajo el mantel y asoma
//    los ojos (gag 7).''', r'''
const a = (f) => en('pykrete', f);
const P2 = a(0.198), P3 = a(0.49), P4 = a(0.752);
const rompe = a(0.035), mezcla = a(0.104), serrin = a(0.149), duro = a(0.275), derrite = a(0.312), pyk = a(0.416), mount = a(0.55), churchill = a(0.612), suelta = a(0.678), dispara = a(0.794), mandos = a(0.878), bala = a(0.926), rebota = a(0.941);
const k = T.C.k;
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dith = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, c = hex('#fff6d0')) => { for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); if (i < r) { R.pset(x + i, y + i, c); R.pset(x - i, y - i, c); R.pset(x + i, y - i, c); R.pset(x - i, y + i, c); } } R.pset(x, y, hex('#ffffff')); };
// el martillo en la mano: el mango sale del puño con el ángulo ang y la cabeza de acero al final
const martillo = (x, y, ang, L = 10) => { const ex = Math.round(x + Math.cos(ang) * L), ey = Math.round(y + Math.sin(ang) * L); R.linea(x, y, ex, ey, k); R.linea(x + 1, y, ex + 1, ey, hex('#a8743c'));
  const px = -Math.sin(ang), py = Math.cos(ang); R.poligono([[ex + px * 4, ey + py * 4], [ex - px * 4, ey - py * 4], [ex - px * 4 + Math.cos(ang) * 3, ey - py * 4 + Math.sin(ang) * 3], [ex + px * 4 + Math.cos(ang) * 3, ey + py * 4 + Math.sin(ang) * 3]].map(([u, v]) => [Math.round(u), Math.round(v)]), hex('#5a6270')); R.pset(Math.round(ex + px * 3), Math.round(ey + py * 3), hex('#c8d0dc')); };

// 1 · el taller frío
const TALLER = { encuadre: 'tallerHielo' };
const p1 = (t) => {
  const molde = 0.08 + 0.92 * tramo(t, mezcla + 0.1, P2 - 0.2), ro = tramo(t, rompe - 0.02, rompe + 0.6);
  T.hielo(R, t, { ...TALLER, molde, bloques: false });
  // Pyke explica; el canadiense trae el saco de serrín
  R.actor(EL.pyke, 92, 160, t, { dir: 1, dedo: t > mezcla - 0.3 && t < serrin + 0.6, habla: t > mezcla - 0.3 && t < serrin + 0.6 && Math.sin(t * 7) > 0, sonrisa: t > P2 - 0.9, sorpresa: t > rompe && t < rompe + 0.5 });
  const us = tramo(t, 0.15, mezcla - 0.3), xs = Math.round(lerp(-18, 136, us)), lleva = us < 1;
  const cs = R.actor(EL.ingenieroCA2, xs, 172, t, { dir: 1, anda: us > 0 && us < 1, sostiene: lleva ? true : undefined, sonrisa: !lleva });
  const saco = (x, y) => { R.rect(x - 6, y - 9, x + 6, y, k); R.rect(x - 5, y - 8, x + 5, y - 1, hex('#b8945a')); R.rect(x - 5, y - 8, x + 5, y - 7, hex('#d8b47a')); R.linea(x - 3, y - 9, x + 3, y - 9, hex('#8a6a3a')); for (let i = 0; i < 5; i++) R.pset(x - 4 + i * 2, y - 4 + (i & 1), hex('#8a6a3a')); };
  if (lleva) saco(cs.mano[0] + 2, cs.mano[1] + 6); else { saco(160, 173); for (let i = 0; i < 6; i++) R.pset(152 + i * 3, 173 + (i & 1), hex('#c8a46a')); }
  // detrás del banco: el del martillo y el que echa el agua y el serrín
  const golpe = t > rompe - 0.05 && t < rompe + 0.5, alza = t > rompe - 0.5 && t <= rompe - 0.05;
  const m = R.actor(EL.tecnicoBritanico, 238, 158, t, { dir: t > serrin ? 1 : -1, sostiene: t <= serrin ? (golpe ? [229, 137] : [232, 130]) : undefined, sonrisa: t > P2 - 0.8, sorpresa: t > rompe && t < rompe + 0.4 });
  if (t <= serrin) martillo(m.mano[0], m.mano[1], golpe ? Math.PI * 1.05 : alza ? -Math.PI * 0.62 : -Math.PI * 0.85, 9);
  const x2 = 204, vierte = t > mezcla - 0.1 && t < serrin - 0.15, echa = t > serrin - 0.05 && t < P2 - 0.3;
  const w = R.actor(EL.tecnicoBritanico2, x2, 158, t, { dir: -1, sostiene: vierte || echa ? [196, 128] : true });
  const [hx, hy] = w.mano;
  if (t < serrin - 0.05) {   // el cubo de agua (se inclina al verter)
    const inc = vierte ? 2 : 0; R.rect(hx - 4, hy - 1 - inc, hx + 3, hy + 5, k); R.rect(hx - 3, hy - inc, hx + 2, hy + 4, hex('#8a949e')); R.rect(hx - 3, hy - inc, hx + 2, hy - inc, hex('#c8d0d8')); R.linea(hx - 4, hy - 3 - inc, hx + 3, hy - 3, hex('#4a5262'));
    if (vierte) for (let i = 0; i < 8; i++) R.pset(hx - 4 - (i > 3 ? 1 : 0), hy + 1 + i + Math.round(((t * 20 + i) % 2)), hex('#8ac8e8'));
  } else if (t < P2 - 0.3) {   // la pala del serrín
    R.linea(hx, hy, hx - 6, hy + 2, k); R.rect(hx - 9, hy + 1, hx - 5, hy + 3, hex('#6a6e78')); R.rect(hx - 9, hy, hx - 5, hy, hex('#c8a46a'));
    if (echa) for (let i = 0; i < 7; i++) R.pset(hx - 8 + Math.round(hh(i, Math.floor(t * 10)) * 4), hy + 4 + Math.round(((t * 18 + i * 1.3) % 8)), hex('#c8a46a'));
  }
  T.hieloDelante(R, t, { ...TALLER, molde, bloques: false });
  // los dos bloques encima del banco: el de hielo normal se parte con «breaks»; el de pykrete, al lado
  T.PIEZAS_DC.bloqueHielo(R, 226, 146, { tipo: 'hielo', roto: ro > 0.5 });
  if (ro > 0 && ro < 1) for (let i = 0; i < 8; i++) { const an = -Math.PI * (0.1 + 0.8 * hh(i, 91)), d = ro * (8 + hh(i, 92) * 14); R.pset(Math.round(226 + Math.cos(an) * d), Math.round(138 + Math.sin(an) * d + ro * ro * 10), i & 1 ? hex('#ffffff') : hex('#b8e4f4')); }
  T.PIEZAS_DC.bloqueHielo(R, 284, 146, {});
  if (t > rompe && t < rompe + 0.35) destello(226, 134, 4);
};

// 2 · el banco de cerca (inserto con fondo propio): el pykrete a la izquierda (cerca del borde, para que el brazo no
// cruce la pantalla), el reloj en medio y el hielo normal a la derecha, bajo la estufa de luz que cuelga
let fBanco = null;
const fijoBanco = () => {
  if (!fBanco) { fBanco = R.nuevo(); const prev = R.usar(fBanco);
    // la pared de ladrillo encalado, con la cal saltada, juntas y escarcha arriba
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 7), xo = (x + (fila & 1) * 9) % 18, jun = y % 7 === 6 || xo === 17, lad = Math.floor((x + (fila & 1) * 9) / 18) * 31 + fila * 17;
      let c; if (jun) c = hex('#7a7e86'); else { const pelado = hh(lad, 5) < 0.18; c = pelado ? ((x + y) % 7 === 0 ? hex('#8a4a3a') : hex('#a8624a')) : hh(lad, 6) < 0.3 ? hex('#c4c6ca') : hex('#d6d8dc'); if (y % 7 === 0 && !pelado) c = hex('#e8eaee'); if (xo === 16 && !pelado) c = hex('#aeb2b8'); }
      const esc = Math.max(0, 1 - y / 22); if (dith(x, y) < esc * 0.7) c = hex('#f4f9ff'); R.pset(x, y, c); }
    // el tablero de herramientas
    R.rect(12, 22, 92, 76, k); R.rect(13, 23, 91, 75, hex('#a8845a')); for (let y = 27; y < 74; y += 5) for (let x = 17; x < 90; x += 5) R.pset(x, y, hex('#6a4e30'));
    R.rect(20, 30, 22, 54, k); R.rect(16, 28, 26, 32, hex('#5a6270')); R.linea(34, 28, 34, 64, hex('#4a3a2a')); R.poligono([[36, 30], [54, 30], [54, 38], [36, 34]], hex('#9aa4b4')); for (let x = 38; x < 54; x += 2) R.pset(x, 38, hex('#5a6270'));
    R.rect(62, 30, 64, 56, hex('#6a4a2a')); R.rect(60, 54, 66, 60, hex('#9aa4b4')); R.linea(74, 32, 82, 60, hex('#5a6270')); R.linea(82, 32, 74, 60, hex('#5a6270')); R.disco(78, 46, 2, hex('#3a3e48'));
    // el termómetro bajo cero
    R.rect(104, 22, 112, 74, k); R.rect(105, 23, 111, 73, hex('#f0ece0')); R.rect(107, 26, 109, 68, hex('#c8ccd4')); R.rect(107, 60, 109, 68, hex('#c8282a')); R.disco(108, 69, 3, k); R.disco(108, 69, 2, hex('#c8282a')); for (let y = 28; y < 66; y += 4) R.pset(110, y, k); R.rect(106, 50, 111, 50, hex('#3a6ad8'));
    // la tubería con carámbanos
    R.rect(118, 20, 186, 23, k); R.rect(118, 21, 186, 22, hex('#8a949e')); for (let x = 124; x < 184; x += 9) { R.rect(x, 24, x + 1, 24 + (x % 4) + 2, hex('#cfeaf6')); R.pset(x, 26 + (x % 4) + 1, hex('#ffffff')); } R.rect(184, 20, 187, 99, k); R.rect(185, 23, 186, 99, hex('#8a949e'));
    // la ventana (el hueco se pinta luego) y el calendario de rayas
    R.rect(196, 16, 256, 76, k); R.rect(198, 18, 254, 74, hex('#d8e4ee'));
    R.rect(264, 54, 300, 92, k); R.rect(265, 55, 299, 91, hex('#f0ece0')); R.rect(265, 55, 299, 61, hex('#c8282a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.rect(268 + i * 5, 65 + j * 6, 270 + i * 5, 66 + j * 6, (i + j) % 5 === 0 ? hex('#c8282a') : hex('#8a8a8a'));
    // el banco: tablones con vetas, nudos, escarcha y serrín
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 100) / 16), lin = (y - 100) % 16 === 15; let c = lin ? hex('#4a2e18') : ((Math.sin(x * 0.05 + tab * 3 + Math.sin(x * 0.013 + tab) * 4) + Math.sin(y * 0.9 + x * 0.002)) > 1.2 ? hex('#7a4e2a') : hex('#9a6a3e'));
      if (!lin && dith(x, y) < 0.06) c = hex('#b8885a'); if (!lin && hh(x * 0.37 + y, 3) < 0.012) c = hex('#d8b47a'); R.pset(x, y, c); }
    for (const [nx, ny] of [[132, 140], [270, 122], [40, 172]]) { R.disco(nx, ny, 3, hex('#5a3418')); R.disco(nx, ny, 1, hex('#3a200e')); }
    R.rect(0, 98, 319, 100, k); R.rect(0, 100, 319, 101, hex('#c89a6a'));
    // el cubo de agua (derecha), la regla, el cincel y unos guantes
    R.rect(288, 116, 316, 152, k); R.rect(289, 117, 315, 151, hex('#8a949e')); R.rect(289, 117, 315, 120, hex('#c8d0d8')); R.rect(291, 121, 313, 124, hex('#9ad0ea')); R.linea(290, 134, 314, 134, hex('#5a6270')); R.linea(290, 116, 302, 106, k); R.linea(302, 106, 314, 116, k);
    R.rect(100, 170, 200, 174, k); R.rect(101, 171, 199, 173, hex('#e8d890')); for (let x = 104; x < 198; x += 4) R.pset(x, 171, k);
    R.linea(226, 168, 252, 164, k); R.rect(252, 162, 260, 166, hex('#9aa4b4'));
    R.poligono([[250, 112], [262, 108], [270, 114], [258, 120]], hex('#6a7a5a')); R.poligono([[254, 112], [262, 110], [266, 114], [258, 116]], hex('#8a9a72'));
    R.usar(prev); }
  R.copiar(fBanco);
};
const hieloNormal = (x, yb, d, t) => {   // el bloque de hielo normal que se derrite (d 0–1)
  const w = Math.round(44 - d * 10), h = Math.round(34 * (1 - d * 0.92)), x0 = x - (w >> 1), y0 = yb - h, p = Math.max(2, Math.round(h * 0.25));
  const rc = 8 + Math.round(d * 40); for (let yy = yb - 2; yy <= yb + 6; yy++) for (let xx = x - rc; xx <= x + rc; xx++) if (((xx - x) / rc) ** 2 + ((yy - yb - 2) / 5) ** 2 < 1) R.pset(xx, yy, (xx + yy) % 5 === 0 ? hex('#d8f0fa') : mez(R.pget(xx, yy), hex('#8ac8e8'), 0.55));
  if (h < 3) return;
  R.poligono([[x0 - 1, y0 - 1], [x0 + p - 1, y0 - p - 1], [x0 + w + p, y0 - p - 1], [x0 + w + p, yb - p + 1], [x0 + w, yb + 1], [x0 - 1, yb + 1]], k);
  R.poligono([[x0, y0], [x0 + p, y0 - p], [x0 + w + p - 1, y0 - p], [x0 + w - 1, y0]], hex('#e8f8fe'));
  R.poligono([[x0 + w - 1, y0], [x0 + w + p - 1, y0 - p], [x0 + w + p - 1, yb - p], [x0 + w - 1, yb]], hex('#7ab4d4'));
  R.poligono([[x0, y0], [x0 + w - 1, y0], [x0 + w - 1, yb], [x0, yb]], (xx, yy) => ((xx - yy) % 9 === 0) ? hex('#ffffff') : (yy > yb - 3 ? hex('#9ad0ea') : hex('#bfe6f6')));
  for (let i = 0; i < 4; i++) { const gx = x0 + 3 + Math.round(hh(i, 71) * (w - 6)), gy = yb - Math.round(((t * 18 + i * 7) % Math.max(4, h))); if (d > 0.02) R.rect(gx, gy, gx, gy + 1, hex('#5ab0d8')); }
};
const p2 = (t) => {
  fijoBanco();
  // la nieve por la ventana (recortada a su hueco)
  R.recorte([198, 18, 254, 74]);
  for (let y = 18; y < 75; y++) for (let x = 198; x < 255; x++) if (y > 60 - Math.round(Math.sin(x * 0.1) * 3)) R.pset(x, y, hex('#f4f8fc')); else if (y > 44 && (x * 7) % 13 < 3) R.pset(x, y, hex('#5a7a6a'));
  for (let i = 0; i < 26; i++) { const x = 198 + Math.round(((hh(i, 81) * 56 + Math.sin(t + i) * 3) % 56)), y = 18 + Math.round(((hh(i, 82) * 56 + t * 12) % 56)); R.pset(x, y, hex('#ffffff')); }
  R.recorte(null);
  R.rect(225, 18, 226, 74, k); R.rect(198, 45, 254, 46, k); R.rect(194, 74, 258, 78, k); R.rect(195, 75, 257, 77, hex('#e8eef4'));
  // la gota que cae del carámbano
  { const f = (t * 0.8) % 1; R.pset(151, Math.round(28 + f * f * 70), hex('#bfe6f6')); }
  // la estufa de luz que cuelga, encendida con «took far longer to melt»
  const luz = tramo(t, derrite - 0.1, derrite + 0.2), sw = Math.round(Math.sin(t * 1.2) * 1.2), lx = 150 + sw;
  if (luz > 0) for (let y = 45; y < 168; y++) { const hw = 10 + (y - 45) * 0.78, a0 = 0.22 * luz * (1 - (y - 45) / 160); for (let x = Math.round(lx - hw); x <= Math.round(lx + hw); x++) { const borde = Math.min(1, (hw - Math.abs(x - lx)) / 10); R.pset(x, y, mez(R.pget(x, y), hex('#ffcc70'), a0 * borde)); } }
  R.linea(150, 0, lx, 30, k); R.poligono([[lx - 14, 42], [lx + 14, 42], [lx + 8, 30], [lx - 8, 30]], k); R.poligono([[lx - 12, 41], [lx + 12, 41], [lx + 7, 31], [lx - 7, 31]], hex('#4a6a4a')); R.linea(lx - 7, 32, lx, 32, hex('#7a9a7a'));
  R.rect(lx - 6, 42, lx + 6, 44, luz > 0 ? hex('#ffb040') : hex('#8a8a7a')); if (luz > 0) R.rect(lx - 4, 43, lx + 4, 43, hex('#fff0a0'));
  // el reloj de bolsillo que corre mientras se derriten
  const rx = 150, ry = 156; R.disco(rx, ry, 11, k); R.disco(rx, ry, 10, hex('#c8a040')); R.disco(rx, ry, 8, hex('#f4f0e4')); R.rect(rx - 1, ry - 14, rx + 1, ry - 11, hex('#c8a040')); R.disco(rx, ry - 15, 2, k);
  for (let i = 0; i < 12; i++) R.pset(Math.round(rx + Math.cos(i * 0.5236) * 7), Math.round(ry + Math.sin(i * 0.5236) * 7), k);
  const ang = -Math.PI / 2 + Math.max(0, t - derrite) * 3.4; R.linea(rx, ry, Math.round(rx + Math.cos(ang) * 6), Math.round(ry + Math.sin(ang) * 6), hex('#c8282a')); R.linea(rx, ry, rx, ry - 4, k); R.pset(rx, ry, k);
  // el pykrete (izquierda) y el hielo normal (derecha) que se derrite en un charco
  T.PIEZAS_DC.bloqueHielo(R, 58, 150, { s: 3 });
  if (t > pyk) T.PIEZAS_DC.sello(R, 60, 121, { tipo: 'marca' });
  const d = tramo(t, derrite + 0.1, derrite + 1.9);
  hieloNormal(240, 150, d, t);
  if (luz > 0) for (let i = 0; i < 3; i++) { const yy = 118 + Math.round(((t * 6 + i * 9) % 26)); R.pset(40 + i * 16, yy, hex('#8ac8e8')); }
  for (let i = 0; i < 5; i++) { const f = (t * 0.6 + i / 5) % 1; if (d > 0.05 && d < 1) R.pset(230 + i * 5 + Math.round(Math.sin(t * 3 + i) * 2), Math.round(140 - d * 26 - f * 22), hex('#f0f8fc')); }
  // el martillazo que rebota en el pykrete (el brazo entra por la izquierda)
  const entra = tramo(t, P2 + 0.25, duro - 0.45), sale = tramo(t, duro + 0.5, duro + 1.0);
  if (entra > 0 && sale < 1) {
    const golpe = t > duro - 0.08 && t < duro + 0.12, rebote = t >= duro + 0.12;
    const wx = Math.round(lerp(-14, 24, entra) - sale * 40), wy = Math.round(golpe ? 100 : rebote ? 80 + Math.round(Math.sin((t - duro) * 30) * 2) : lerp(120, 80, entra));
    T.brazo(R, -26, 120, wx, wy, '#5a5e6a', 1, { codo: [-8, 104] });
    martillo(wx + 8, wy, golpe ? 0.5 : -1.1, 22);
    if (t > duro - 0.02 && t < duro + 0.3) { destello(54, 112, 5); for (let i = 0; i < 5; i++) R.pset(60 + i * 3, 106 - i * 2, hex('#ffffff')); }
  }
  // con «pykrete», una mano lo marca con el sello (entra por la izquierda, arriba)
  const us = tramo(t, pyk - 0.55, pyk - 0.05), uv = tramo(t, pyk + 0.25, pyk + 0.75);
  if (us > 0 && uv < 1) {
    const baja = t > pyk - 0.05 && uv === 0;
    const wx = Math.round(lerp(-16, 44, us) - uv * 60), wy = Math.round(lerp(60, baja ? 96 : 88, us) - uv * 20);
    T.PIEZAS_DC.sello(R, wx + 14, wy + 22, { s: 1.5 });
    T.brazo(R, -30, 70, wx, wy, '#5a5e6a', 1, { codo: [-10, 74] });
  }
};

// 3 · el cuarto de baño: el bloque en la bañera
const BANO = { encuadre: 'banera' };
const p3 = (t) => {
  const lanza = tramo(t, suelta - 0.25, suelta);
  T.hielo(R, t, { ...BANO, bloque: tramo(t, suelta, suelta + 1.33), bloqueX: 182, bloqueY0: 124 });
  // el puro en el borde de la bañera, que humea
  R.rect(118, 133, 128, 135, k); R.rect(119, 134, 127, 134, hex('#7a4a24')); R.pset(119, 134, hex('#ff6a2a'));
  for (let i = 0; i < 10; i++) { const f = (t * 0.4 + i / 10) % 1; R.pset(Math.round(118 + Math.sin(f * 9 + t) * 3), Math.round(132 - f * 30), mez(hex('#c8ccd0'), hex('#dfeee8'), f)); }
  // Mountbatten entra con el bloque, lo enseña y lo lanza
  const ue = tramo(t, P3 + 0.1, mount + 0.2), xm = Math.round(lerp(330, 194, ue));
  const tiene = t < suelta - 0.25;
  const m = R.actor(EL.mountbatten, xm, 160, t, { dir: -1, anda: ue > 0 && ue < 1, sostiene: tiene ? (t > churchill ? [188, 140] : true) : undefined, dedo: t > suelta + 0.8, sonrisa: t > suelta + 0.4, habla: t > churchill - 0.4 && t < suelta - 0.6 && Math.sin(t * 7) > 0 });
  if (tiene) T.PIEZAS_DC.bloqueHielo(R, m.mano[0] - 2, m.mano[1] + 5, {});
  else if (lanza < 1) T.PIEZAS_DC.bloqueHielo(R, Math.round(lerp(m.mano[0] - 2, 182, lanza)), Math.round(lerp(m.mano[1] + 5, 124, lanza) - Math.sin(Math.PI * lanza) * 6), {});
};

// 4 · la sala de reuniones: la bala que rebota (gag 7)
const SALA = { encuadre: 'tallerHielo', camara: 'reunion' };
const p4 = (t) => {
  T.hielo(R, t, SALA);
  const susto = t > rebota && t < rebota + 1.2;
  // los altos mandos detrás de la mesa
  R.actor(EL.mountbatten, 216, 150, t, { dir: -1, habla: t < dispara && Math.sin(t * 6) > 0, sorpresa: susto, sonrisa: t > rebota + 1.2, dedo: t > rebota + 1.2 && t < rebota + 2.4 });
  R.actor(EL.oficialAliado, 254, 150, t, { dir: -1, sorpresa: susto || (t > mandos && t < bala), sonrisa: t > rebota + 1.4 });
  R.actor(EL.oficialAliado2, 292, 150, t, { dir: -1, sorpresa: susto, triste: t > dispara && t < bala, sonrisa: t > rebota + 1.6 });
  // el gato espía mira el bloque y, con el «pling», se esconde bajo el mantel
  const huye = tramo(t, rebota + 0.15, rebota + 0.8), gx = Math.round(lerp(20, 150, huye));
  if (huye < 1) T.gatoEspia(R, gx, 168 - (huye > 0 && huye < 0.25 ? 3 : 0), t, { anda: huye > 0, cara: t < rebota ? 'travieso' : 'normal', dir: 1 });
  // el oficial que dispara: entra, apunta al bloque (solo al bloque) y dispara
  const ue = tramo(t, P4 + 0.2, dispara - 0.2), xo = Math.round(lerp(42, 60, ue)), apunta = t > dispara && t < rebota + 1.0;
  const o = R.actor(EL.oficialNaval, xo, 174, t, { dir: 1, anda: ue > 0 && ue < 1, sostiene: apunta ? [xo + 24, 150] : undefined, sorpresa: susto, sonrisa: t > rebota + 1.0 });
  if (apunta) { const [hx, hy] = o.mano; R.rect(hx - 1, hy - 2, hx + 5, hy, k); R.rect(hx, hy - 1, hx + 4, hy - 1, hex('#3a3e48')); R.rect(hx - 1, hy, hx + 1, hy + 3, k); if (t > bala && t < bala + 0.1) destello(hx + 7, hy - 2, 3, hex('#ffd040')); }
  T.hieloDelante(R, t, SALA);
  // la bala: de la pistola al bloque y, con «bounced», hacia el techo
  if (t > bala && t < rebota + 0.6) { const [hx, hy] = o.mano, mx = hx + 6, my = hy - 2, bx = 147, by = 141;
    let x, y; if (t < rebota) { const u = tramo(t, bala, rebota); x = lerp(mx, bx, u); y = lerp(my, by, u); } else { const u = tramo(t, rebota, rebota + 0.6); x = lerp(bx, 198, u); y = lerp(by, -4, u); }
    R.rect(Math.round(x) - 1, Math.round(y), Math.round(x) + 1, Math.round(y), hex('#fff0a0')); R.pset(Math.round(x), Math.round(y), hex('#ffffff')); }
  if (t > rebota && t < rebota + 0.35) destello(149, 140, 5);
  // los ojos del gato bajo el mantel
  if (t > rebota + 1.1) { const p = Math.floor((t - rebota) * 1.3) % 3 !== 2; R.rect(150, 172, 160, 175, k); if (p) { R.pset(152, 173, hex('#e8d040')); R.pset(157, 173, hex('#e8d040')); } }
};

const efectos = [[rompe, 'toc'], [mezcla + 0.05, 'burbujas'], [duro, 'boing'], [derrite, 'interruptor'], [pyk, 'sello'], [mount - 0.9, 'puerta'], [suelta + 0.45, 'chof'], [bala, 'pop'], [rebota, 'brillo'], [rebota + 0.25, 'miau']];
const año = (t) => t < P3 ? 1942 : 1943;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
