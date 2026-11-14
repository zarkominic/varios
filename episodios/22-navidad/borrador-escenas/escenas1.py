E = {}
E['nv-gancho'] = ('Gancho', '''// NV-GANCHO (frases 1–2), sin cartela; barra 1647 → 1659 → 2026. Cinco planos:
// 1. Canterbury, Navidad de 1647: el alguacil clava a martillazos el aviso del acebo tachado en la puerta rosa (golpe
//    «illegal»), mira, señala y se va; la vecina se para ante el aviso y se asusta; la galleta corre y se esconde tras el
//    barril y asoma;  2. la panadería: la contraventana sube («the shops are open»), el panadero deja una hogaza, una
//    clienta paga y se va; un aprendiz llega con una ramita de acebo y el alguacil le pilla («breaking the law»);
// 3. Boston nevado, 1659: los vecinos van a lo suyo (un día de trabajo), y el alguacil huele el pastel («Massachusetts»);
// 4. la puerta del vecino del pastel: el alguacil llega, señala el «25» y le extiende la multa con el «5» («fined»); la
//    galleta se asoma y le cae volando otra multa diminuta (gag 2);  5. hoy, el salón de Atom: la galleta (con su multita)
//    entra corriendo, salta a la mesita y se pregunta, con tres «?», cuánto de lo que creemos es verdad.''', r'''
const a = (f) => en('ilegal', f), b = (f) => en('massachusetts', f);
const P2 = a(0.484), P3 = a(1.018), P4 = b(0.334), P5 = b(0.68);
const PZ = T.PIEZAS_NV, K = hex('#1a1418');
const ilegal = a(0.049), canter = a(0.358), abre = a(0.536), ley = a(0.921);
const masa = b(0.25), dic = b(0.446), multa = b(0.551), cinco = b(0.588), cree = b(0.861), acerca = b(0.8875), verdad = b(0.961);
// el martillo en la mano (mango de madera y cabeza de hierro con su brillo)
const martillo = (x, y) => {
  R.linea(x, y + 2, x + 3, y - 6, K); R.linea(x + 1, y + 2, x + 4, y - 6, K); R.linea(x + 1, y + 1, x + 3, y - 5, hex('#8a5a2e'));
  R.rect(x + 1, y - 10, x + 8, y - 6, K); R.rect(x + 2, y - 9, x + 7, y - 7, hex('#6a6e7a')); R.rect(x + 2, y - 9, x + 4, y - 9, hex('#b8bcc8'));
};
// la hogaza (corteza con su greña) y la cesta de mimbre
const hogaza = (x, y) => { R.rect(x - 4, y - 3, x + 4, y, K); R.rect(x - 3, y - 4, x + 3, y - 1, K); R.rect(x - 3, y - 2, x + 3, y - 1, hex('#a8642a')); R.rect(x - 2, y - 3, x + 2, y - 3, hex('#d89a4a')); R.pset(x, y - 2, hex('#f0d090')); R.pset(x - 2, y - 2, hex('#f0d090')); };
const cesta = (x, y) => { R.rect(x - 5, y - 1, x + 5, y + 5, K); R.rect(x - 4, y, x + 4, y + 4, hex('#a87a3a')); for (let i = -4; i <= 4; i += 2) R.pset(x + i, y + 2, hex('#6a4a1e')); R.linea(x - 4, y - 1, x - 2, y - 5, K); R.linea(x + 4, y - 1, x + 2, y - 5, K); R.linea(x - 2, y - 5, x + 2, y - 5, K); R.pset(x - 2, y - 1, hex('#e8d8a8')); R.pset(x + 1, y - 1, hex('#c03030')); };
// un bocadillo grande (w × h) con su rabito hacia (x, y+…)
const globo = (x, y, w, h) => { R.rect(x - w / 2 - 1, y - h - 1, x + w / 2 + 1, y, K); R.rect(x - w / 2, y - h, x + w / 2, y - 1, hex('#fbfbf4')); R.rect(x - w / 2, y - 2, x + w / 2, y - 1, hex('#d8dce4')); R.rect(x - 1, y + 1, x + 1, y + 1, K); R.pset(x, y + 2, K); R.pset(x, y, hex('#fbfbf4')); };
const p1 = (t) => {
  T.siglo17(R, t, { encuadre: 'canterbury', aviso: tramo(t, 0.25, ilegal + 0.05) });
  // el cerero en su puerta, que charla con un vecino
  R.actor(EL.puritana, 18, 164, t, { dir: 1, habla: t > 1.8 && t < 4.4 && Math.sin(t * 7) > 0 });
  R.actor(EL.vecino, 40, 166, t, { dir: -1, habla: t > 4.4 && Math.sin(t * 6) > 0, sonrisa: t < 1.8 });
  // el alguacil: tres martillazos (el último en «illegal»), un paso atrás, señala el aviso y se va calle abajo
  const atras = tramo(t, 1.35, 1.9), vete = tramo(t, 3.7, 6.6), ax = Math.round(lerp(lerp(197, 186, atras), 64, vete));
  if (t < 1.3) {
    const alza = Math.round(5 * Math.abs(Math.sin(Math.PI * (t - ilegal) / 0.28)));
    const al = R.actor(EL.alguacil, ax, 164, t, { dir: 1, sostiene: [219, 128 - alza] }); martillo(al.mano[0] - 1, al.mano[1]);
    if (alza <= 1 && t > 0.45) for (const [dx, dy] of [[4, -3], [6, 0], [4, 3]]) { R.pset(224 + dx, 134 + dy, hex('#fff4b0')); R.pset(225 + dx, 134 + dy, hex('#ffffff')); }
  } else R.actor(EL.alguacil, ax, 164, t, { dir: t < 3.4 ? 1 : -1, anda: vete > 0 && vete < 1 || (atras > 0 && atras < 1), dedo: t > 2.0 && t < 3.4, enfado: t < 3.4 });
  // la vecina de la cesta: entra, se para ante el aviso («1647»), se asusta y da media vuelta
  const v = tramo(t, 0.5, 3.0), w = tramo(t, 4.9, 6.6), vx = Math.round(lerp(lerp(-18, 150, v), 60, w));
  const ve = R.actor(EL.vecina, vx, 173, t, { dir: w > 0 ? -1 : 1, anda: (v > 0 && v < 1) || w > 0, sorpresa: t > canter - 1.6 && t < 5.2, sostiene: true });
  cesta(ve.mano[0], ve.mano[1]);
  // la galleta: entra corriendo por la derecha, se mete tras el barril y asoma cuando el alguacil se da la vuelta
  const g = tramo(t, 1.5, 2.6), gx = Math.round(lerp(334, 236, g));
  const asoma = t > 3.6 ? Math.min(1, (t - 3.6) * 3) * (t > 5.6 && t < 6.0 ? 0.3 : 1) : 0;
  T.galleta(R, gx, Math.round(168 - asoma * 9 - (g < 1 && Math.floor(t * 8) % 2 ? 1 : 0)), t, { corre: g > 0 && g < 1, cara: g < 1 ? 'susto' : 'normal' });
  T.siglo17Delante(R, t, { encuadre: 'canterbury' });
};
// la contraventana de arriba: tablones con veta, dos barras de hierro y su argolla; sube hasta el toldo
const contraventana = (u) => {
  const yb = Math.round(141 - u * 88); if (yb <= 54) return;
  for (let x0 = 46; x0 <= 238; x0 += 16) {
    const x1 = Math.min(238, x0 + 15); R.rect(x0, 54, x1, yb, hex('#7a5232'));
    for (let k = 0; k < 3; k++) { const gx = x0 + 3 + k * 4; for (let y = 54; y <= yb; y++) if ((y + k * 7 + x0) % 11 < 7) R.pset(gx + (Math.sin((y + x0) * 0.21) > 0.6 ? 1 : 0), y, hex('#5e3c22')); }
    R.linea(x0, 54, x0, yb, hex('#3a2414')); R.linea(x0 + 1, 54, x0 + 1, yb, hex('#9a6c42'));
  }
  for (const d of [8, 52]) { const y = yb - d; if (y > 55) { R.rect(46, y - 1, 238, y + 1, K); R.rect(46, y, 238, y, hex('#5a5e68')); for (let x = 50; x < 238; x += 16) R.pset(x, y, hex('#a8acb8')); } }
  R.rect(46, yb, 238, yb + 1, K); if (yb > 62) { R.disco(142, yb - 4, 2, K); R.pset(142, yb - 4, hex('#7a5232')); }
};
const p2 = (t) => {
  T.siglo17(R, t, { encuadre: 'canterbury', camara: 'tienda' });
  const sube = tramo(t, P2 + 0.4, abre);
  // el panadero: sonríe al abrir, deja la hogaza en el mostrador y luego se la da a la clienta
  const deja = tramo(t, abre + 0.1, abre + 0.7), da = tramo(t, a(0.66), a(0.71));
  const pan = R.actor(EL.vecino, 112, 147, t, { dir: 1, sonrisa: t > abre, habla: t > a(0.6) && t < a(0.66) && Math.sin(t * 8) > 0, sostiene: deja > 0 && deja < 1 ? [146, 140] : da > 0 && da < 1 ? [150, 142] : undefined });
  contraventana(sube);
  T.siglo17Delante(R, t, { encuadre: 'canterbury', camara: 'tienda' });
  if (deja > 0 && deja < 1) hogaza(pan.mano[0], pan.mano[1]); else if (deja >= 1 && da === 0) hogaza(150, 141);
  else if (da > 0 && da < 1) hogaza(pan.mano[0], pan.mano[1]);
  // la clienta: llega por la derecha, paga, se lleva la hogaza y se va
  const ll = tramo(t, abre + 0.2, a(0.62)), se = tramo(t, a(0.73), a(0.86));
  const cx = Math.round(lerp(lerp(332, 166, ll), -24, se));
  const paga = t > a(0.62) && t < a(0.66), lleva = da >= 1;
  const cl = R.actor(EL.puritana, cx, 174, t, { dir: -1, anda: (ll > 0 && ll < 1) || (se > 0 && se < 1), sostiene: paga ? [152, 152] : lleva ? true : undefined, sonrisa: lleva });
  if (paga) { R.disco(cl.mano[0] - 2, cl.mano[1] - 2, 2, K); R.disco(cl.mano[0] - 2, cl.mano[1] - 2, 1, hex('#f0c040')); }
  if (lleva) hogaza(cl.mano[0] - 1, cl.mano[1]);
  // el aprendiz con su ramita de acebo… y el alguacil que le pilla en «breaking the law»
  const kx = Math.round(lerp(-20, 108, tramo(t, a(0.78), a(0.86))) - lerp(0, 30, tramo(t, ley + 0.25, P3)));
  const pill = t > ley;
  const ap = R.actor(EL.aprendiz2, kx, 176, t, { dir: 1, anda: t > a(0.78) && t < a(0.86) || t > ley + 0.25, sonrisa: !pill, sorpresa: pill, sostiene: t < ley + 0.3 ? true : undefined });
  if (t < ley + 0.3) PZ.acebo(R, ap.mano[0] + 2, ap.mano[1] + 2, {});
  const gx = Math.round(lerp(334, 186, tramo(t, a(0.8), ley - 0.1)));
  R.actor(EL.alguacil, gx, 176, t, { dir: -1, anda: t > a(0.8) && t < ley - 0.1, dedo: pill, enfado: true });
  if (pill) R.bocadillo(gx + 7, 140 - (t < ley + 0.15 ? 2 : 0));
};
const p3 = (t) => {
  T.siglo17(R, t, { encuadre: 'boston' });
  T.siglo17Delante(R, t, { encuadre: 'boston' });
  // el matrimonio puritano camina hacia la casa de reunión con su Biblia: un día de trabajo como otro
  const u = tramo(t, P3 + 0.2, P3 + 3.6);
  R.actor(EL.puritanoBiblia, Math.round(lerp(238, 112, u)), 160, t, { dir: -1, anda: u > 0 && u < 1 });
  R.actor(EL.puritana, Math.round(lerp(256, 130, u)), 162, t, { dir: -1, anda: u > 0 && u < 1, habla: u >= 1 && Math.sin(t * 6) > 0 });
  // el leñador cruza con su brazada de troncos
  const l = tramo(t, P3, P3 + 4.4), lx = Math.round(lerp(64, 196, l));
  const le = R.actor(EL.obreroEscoces, lx, 170, t, { dir: 1, anda: l > 0 && l < 1, sostiene: true });
  for (let k = 0; k < 3; k++) { const y = le.mano[1] - 1 - k * 3; R.rect(le.mano[0] - 5, y - 1, le.mano[0] + 6, y + 1, K); R.rect(le.mano[0] - 4, y, le.mano[0] + 5, y, hex(k % 2 ? '#8a5a32' : '#a8743e')); R.pset(le.mano[0] + 5, y, hex('#e0c088')); }
  // el alguacil entra por la derecha, se para… y huele el pastel en «Massachusetts»; señala hacia la casa
  const g = tramo(t, masa - 1.6, masa - 0.1), gx = Math.round(lerp(334, 214, g));
  R.actor(EL.alguacil, gx, 168, t, { dir: -1, anda: g > 0 && g < 1, sorpresa: t > masa && t < masa + 0.6, dedo: t > masa + 0.6, enfado: t > masa + 0.6 });
  if (t > masa) { const y = 140 - (t < masa + 0.15 ? 2 : 0); globo(gx + 7, y, 18, 13); PZ.pastel(R, gx + 7, y - 3, {}); for (let k = 0; k < 3; k++) R.pset(gx + 5 + k * 2, y - 11 + Math.round(Math.sin(t * 6 + k)), hex('#a8b0c0')); }
};
const p4 = (t) => {
  T.siglo17(R, t, { encuadre: 'boston', camara: 'casa' });
  // el vecino del pastel, en su puerta, feliz… hasta la multa
  R.actor(EL.vecinoPastel, 110, 164, t, { dir: -1, sonrisa: t < multa, habla: t < dic && Math.sin(t * 7) > 0, sorpresa: t > multa + 0.1 && t < cinco + 0.6, triste: t > cinco + 0.6 });
  // el alguacil llega por la izquierda, señala el «25» y extiende la multa con el «5»
  const v = tramo(t, P4 + 0.1, dic - 0.2), ax = Math.round(lerp(-18, 70, v));
  const ext = t > multa;
  const al = R.actor(EL.alguacil, ax, 164, t, { dir: 1, anda: v > 0 && v < 1, dedo: t > dic && !ext, enfado: t > dic, sostiene: ext ? [ax + 26, 140] : undefined });
  if (t > dic && t < multa + 0.2) { const y = 128 - (t < dic + 0.15 ? 2 : 0); globo(ax + 8, y, 16, 11); R.numero('25', ax + 8, y - 3, { centro: true, color: hex('#c02030') }); }
  if (ext) { const s = t < multa + 0.12 ? 1 : 2; PZ.multa(R, al.mano[0] + 6, al.mano[1] + 8, { s }); }
  if (t > cinco) { const y = Math.round(al.mano[1] - 22 - Math.min(4, (t - cinco) * 12)); R.disco(al.mano[0] + 7, y, 4, K); R.disco(al.mano[0] + 7, y, 3, hex('#e0b030')); R.disco(al.mano[0] + 6, y - 1, 1, hex('#fff0a0')); }
  // gag 2: la galleta se asoma por la derecha… y le cae volando su multa diminuta
  const gg = tramo(t, multa - 0.9, multa - 0.1), gx = Math.round(lerp(334, 246, gg)), vuela = tramo(t, cinco + 0.3, cinco + 0.85);
  T.galleta(R, gx, 164, t, { corre: gg > 0 && gg < 1, cara: vuela >= 1 ? 'susto' : 'normal' });
  if (vuela > 0 && vuela < 1) { const x = Math.round(lerp(al.mano[0] + 12, gx, vuela)), y = Math.round(lerp(al.mano[1] - 4, 156, vuela) - Math.sin(vuela * Math.PI) * 22); PZ.multa(R, x, y + (Math.floor(t * 12) % 2), { mini: true, dir: Math.floor(t * 8) % 2 ? 1 : -1 }); }
  if (vuela >= 1) PZ.multa(R, gx, 160, { mini: true });
  T.siglo17Delante(R, t, { encuadre: 'boston', camara: 'casa' });
};
const p5 = (t) => {
  T.hoy(R, t, { encuadre: 'salon' });
  // la galleta entra corriendo por detrás del sofá, salta a la mesita y se sienta junto al plato
  const c = tramo(t, P5 + 0.1, P5 + 1.3), s = tramo(t, P5 + 1.4, P5 + 1.95);
  let gx = lerp(64, 118, c), gy = 176;
  if (s > 0) { gx = lerp(118, 166, s); gy = lerp(176, 151, s) - Math.sin(s * Math.PI) * 18; }
  const gxr = Math.round(gx), gyr = Math.round(gy), sobre = s >= 1, mira = t > cree;
  const dibuja = () => { T.galleta(R, gxr, gyr, t, { corre: c > 0 && s < 1 && s === 0, cara: t > verdad ? 'susto' : mira ? 'normal' : 'feliz', dir: sobre && t > acerca && t < verdad ? -1 : 1 }); PZ.multa(R, gxr, gyr - 4, { mini: true }); };
  if (gx < 76 && s === 0) dibuja();
  T.hoyDelante(R, t, { encuadre: 'salon' });
  if (!(gx < 76 && s === 0)) dibuja();
  // tres preguntas: el árbol, los calcetines… y la galleta («true?»)
  const pop = (t0, x, y) => { if (t > t0) { const yy = y - (t < t0 + 0.12 ? 3 : 0); globo(x, yy, 14, 18); R.icono('?', x - 5, yy - 16, hex('#c02030'), hex('#f0b0b0'), 2); } };
  pop(cree, 146, 58); pop(acerca, 232, 62); pop(verdad, 166, 128);
};
const efectos = [[a(0.035), 'golpecito'], [ilegal, 'toc'], [P2 + 0.4, 'cerrojo'], [abre + 0.7, 'golpecito'], [ley, 'aviso'], [P3 + 0.3, 'campana'],
  [masa, 'pop'], [multa, 'sello'], [cinco + 0.3, 'papel'], [P5 + 1.4, 'boing'], [verdad, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => t < P3 ? 1647 : t < P5 ? 1659 : 2026 });
''')

E['nv-hola'] = ('Hola', '''// NV-HOLA (frases 3–4), sin cartela; barra 2026 → 1848. Tres planos:
// 1. la mesa del salón de Atom: la galleta en el plato mira cada pista cuando la voz la nombra (el traje rojo, el «25»,
//    el abeto y la partitura, que suelta notas y la galleta baila);  2. «around the world»: una calle alpina a la hora
//    azul, un desfile de niños con velas tras San Nicolás… y un Krampus que asoma («differently»);  3. «I'm Atom»: el
//    árbol victoriano; una niña va a coger la galleta del platito y la galleta salta y se escapa (gag 1, «Let's find out»).''', r'''
const a = (f) => en('mitos', f), b = (f) => en('hola', f);
const P2 = a(0.601), P3 = b(0);
const PZ = T.PIEZAS_NV, K = hex('#1a1418');
const rojo = a(0.29), fecha = a(0.362), arbol = a(0.418), canta = a(0.514), viaja = a(0.643), distinto = a(0.845), celebra = a(0.919);
const explica = b(0.2175), coge = b(0.6), salta = b(0.7995);
// una estrellita de brillo de cuatro puntas
const brillo = (x, y, r, c) => { R.pset(x, y, c); for (let k = 1; k <= r; k++) { R.pset(x + k, y, c); R.pset(x - k, y, c); R.pset(x, y + k, c); R.pset(x, y - k, c); } };
// la corchea que flota
const nota = (x, y, c) => { R.rect(x, y - 6, x, y, c); R.rect(x - 2, y - 1, x, y + 1, c); R.rect(x + 1, y - 6, x + 2, y - 5, c); R.pset(x + 3, y - 4, c); };
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'salon', camara: 'mesa' });
  T.hoyDelante(R, t, { encuadre: 'salon', camara: 'mesa' });
  // las pistas: cada una brilla cuando la voz la nombra
  const pistas = [[rojo, 48, 128], [fecha, 96, 126], [arbol, 226, 126], [canta, 270, 128]];
  let mira = 0, salto = 0;
  pistas.forEach(([t0, x, y], i) => {
    const u = (t - t0) / 0.9; if (u > 0 && u < 1) { const r = Math.round(10 + u * 6); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + u * 2; brillo(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.7), u < 0.5 ? 2 : 1, hex(k % 2 ? '#fff6c0' : '#ffffff')); } }
    if (t > t0) { mira = x < 160 ? -1 : 1; salto = Math.max(salto, t - t0 < 0.3 ? Math.round(Math.sin((t - t0) / 0.3 * Math.PI) * 5) : 0); }
  });
  // las notas que suben de la partitura
  if (t > canta) for (let k = 0; k < 4; k++) { const u = ((t - canta) * 0.7 + k * 0.25) % 1; if (t - canta > k * 0.3) nota(Math.round(266 + Math.sin(u * 6 + k) * 6 + k * 3), Math.round(132 - u * 40), hex(k % 2 ? '#3a2a6a' : '#6a2a3a')); }
  // la galleta, de pie en el plato: mira a un lado y a otro, salta hacia cada pista y baila con la música
  const busca = t < rojo ? (Math.sin(t * 2.4) > 0 ? 1 : -1) : mira;
  const baila = t > canta + 0.2;
  T.galleta(R, 160, 145 - salto - (baila && Math.floor(t * 4) % 2 ? 2 : 0), t, { dir: baila ? (Math.floor(t * 2) % 2 ? 1 : -1) : busca, corre: baila, cara: baila || (t > rojo && t < rojo + 0.6) ? 'feliz' : 'normal' });
};
const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'austria' });
  // el desfile de los niños con sus velas detrás de San Nicolás
  const u = tramo(t, P2, P2 + 5.6), d = Math.round(lerp(-30, 150, u)), para = t > celebra;
  R.actor(EL.nicolasAlpino, d + 50, 160, t, { dir: 1, anda: u < 1 && !para, dedo: t > celebra + 0.4, habla: t > celebra + 0.4 && Math.sin(t * 7) > 0 });
  const n1 = R.actor(EL.ninaCatalana, d + 26, 164, t, { dir: 1, anda: u < 1 && !para, habla: !para && Math.sin(t * 5) > 0, sorpresa: para, sostiene: true });
  PZ.vela(R, n1.mano[0], n1.mano[1] + 1, { t });
  const n2 = R.actor(EL.ninoCatalan, d + 4, 166, t, { dir: 1, anda: u < 1 && !para, habla: !para && Math.sin(t * 5 + 2) > 0, sorpresa: para, sostiene: true });
  PZ.vela(R, n2.mano[0], n2.mano[1] + 1, { t, color: 'roja' });
  // un vecino lejos saluda desde su balcón con un farolillo
  R.actor(EL.adultoCatalan, 262, 158, t, { dir: -1, brazos: t > viaja && t < viaja + 1.2, sonrisa: true });
  // el Krampus asoma por la derecha («differently») y hace «¡bu!» en «celebrate»
  const k = tramo(t, distinto - 0.2, celebra - 0.15);
  R.actor(EL.krampus2, Math.round(lerp(334, 286, k)), 168, t, { dir: -1, anda: k > 0 && k < 1, brazos: t > celebra && t < celebra + 0.9 });
  T.mundoDelante(R, t, { encuadre: 'austria' });
};
// la mesita de costura con su tapete y el platito de la galleta
const mesita = () => {
  R.rect(280, 145, 314, 148, K); R.rect(281, 145, 313, 147, hex('#8a5432')); R.rect(281, 145, 313, 145, hex('#b07a4a'));
  for (let x = 282; x < 313; x += 3) R.pset(x, 148, hex('#e8e0d0'));
  R.rect(284, 149, 286, 166, K); R.rect(285, 149, 285, 165, hex('#6a3e22')); R.rect(308, 149, 310, 166, K); R.rect(309, 149, 309, 165, hex('#6a3e22'));
  R.rect(286, 157, 308, 158, K); R.rect(286, 157, 308, 157, hex('#7a4a2a'));
  R.rect(288, 142, 306, 145, K); R.rect(289, 143, 305, 144, hex('#f2f2ea')); R.rect(291, 143, 303, 143, hex('#5a7ac8'));
};
const p3 = (t) => {
  T.epoca(R, t, { encuadre: 'windsor', camara: 'arbol' });
  mesita();
  // el príncipe, junto al árbol, habla y luego se ríe de la fuga
  R.actor(EL.alberto, 34, 166, t, { dir: 1, habla: t < explica + 1 && Math.sin(t * 6) > 0, sonrisa: t > salta + 0.4, dedo: t > salta + 0.8 });
  // la niña se acerca, mira la galleta y alarga la mano…
  const u = tramo(t, P3 + 0.2, explica + 0.8), nx = Math.round(lerp(196, 262, u));
  R.actor(EL.ninaVictoriana, nx, 166, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t < salta, sorpresa: t > salta, sostiene: t > coge && t < salta + 0.3 ? [292, 138] : undefined });
  // …y la galleta salta del platito, cae en la alfombra y se escapa corriendo (gag 1)
  const s = tramo(t, salta, salta + 0.55), r = tramo(t, salta + 0.6, salta + 1.6);
  let gx = 297, gy = 142;
  if (s > 0) { gx = lerp(297, 238, s); gy = lerp(142, 166, s) - Math.sin(s * Math.PI) * 34; }
  if (r > 0) gx = lerp(238, -16, r);
  T.galleta(R, Math.round(gx), Math.round(gy), t, { cara: s > 0 ? 'susto' : 'normal', corre: r > 0, dir: s > 0 ? -1 : 1 });
  T.epocaDelante(R, t, { encuadre: 'windsor', camara: 'arbol' });
};
const efectos = [[rojo, 'brillo'], [canta, 'pop'], [viaja, 'campana'], [celebra, 'whoosh'], [salta, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => t < P3 ? 2026 : 1848 });
''')

E['nv-puritanos'] = ('Los puritanos', '''// NV-PURITANOS (frase 5), cartela «1647», barra 1647. Cuatro planos:
// 1. «England at war with itself» (fondo local): un prado nevado de Inglaterra con la aldea, el roble y los estandartes; los
//    realistas y los puritanos tiran de la misma cuerda con la cruz de San Jorge en medio… y la cuerda se rompe («itself»);
// 2. el Parlamento: los puritanos leen la Biblia en las gradas; uno se levanta con la Biblia abierta («The Bible») y sobre
//    él aparece el acebo tachado («Christmas»); el presidente da con la maza;
// 3. el rincón del escribano: el escribano moja la pluma («1647») y en el calendario se tachan Navidad, Pascua y
//    Pentecostés, cada una en su palabra, mientras un puritano las señala;
// 4. la panadería de Canterbury: el panadero cuelga el calendario del mes y rodea un día libre («a day off every month»);
//    un estudiante, una criada y dos aprendices de mandil llegan y lo celebran dando saltos.''', r'''
const a = (f) => en('puritanos', f);
const P2 = a(0.2026), P3 = a(0.489), P4 = a(0.7795);
const PZ = T.PIEZAS_NV, K = hex('#1a1418');
const guerra = a(0.1366), rompe = a(0.159), biblia = a(0.358), nunca = a(0.3757), navidad = a(0.446);
const moja = a(0.583), abole = a(0.6626), tN = a(0.6898), tP = a(0.7262), tPe = a(0.7533);
const estud = a(0.8085), criados = a(0.8544), aprend = a(0.8825), libre = a(0.919), mes = a(0.9387);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ruido = (x, k) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return hh(i, 0, k) * (1 - u) + hh(i + 1, 0, k) * u; };
// ── fondo local del plano 1: un prado de Inglaterra en invierno, con la aldea al fondo (búfer fijo) ──
let FONDO = null;
const fondoPrado = () => {
  const { rect, pset, linea, disco } = R;
  const cie = ['#6c7c9c', '#8494b0', '#9eacc4', '#bcc6d6', '#d8dde6'].map(hex);
  for (let y = 0; y < 104; y++) { const u = y / 104 * 4, i = Math.min(3, Math.floor(u)), f = u - i; for (let x = 0; x < 320; x++) pset(x, y, f + (hh(x >> 3, y >> 2, 3) - 0.5) * 0.14 > bay(x, y) ? cie[i + 1] : cie[i]); }
  // las lomas lejanas, azuladas y con nieve en las cumbres
  for (let x = 0; x < 320; x++) { const y = Math.round(80 - ruido(x / 26, 5) * 16 - ruido(x / 7, 6) * 3); for (let yy = y; yy < 104; yy++) pset(x, yy, yy < y + 3 ? hex('#dfe4ee') : (x + yy) % 5 === 0 ? hex('#8e9ab0') : hex('#9ca8bc')); }
  // la loma de en medio: campos nevados con setos que los separan y bosquecillos
  const lom = (x) => Math.round(98 - ruido(x / 40, 7) * 12);
  for (let x = 0; x < 320; x++) { const y = lom(x); for (let yy = y; yy < 124; yy++) pset(x, yy, (hh(x, yy, 8) < 0.12 ? hex('#c4ccd8') : yy < y + 2 ? hex('#f4f6fa') : hex('#e2e7ef'))); }
  for (const [x0, x1, y0, y1] of [[0, 120, 104, 110], [60, 200, 112, 108], [150, 320, 106, 116], [220, 300, 100, 112]]) for (let k = 0; k <= 60; k++) { const x = Math.round(lerp(x0, x1, k / 60)), y = Math.round(lerp(y0, y1, k / 60)); if (y >= lom(x)) { pset(x, y, hex('#4e5a44')); if (hh(x, y, 9) < 0.5) pset(x, y - 1, hex('#66704e')); } }
  for (const [cx, cy, n] of [[30, 100, 5], [96, 101, 4], [300, 104, 6]]) for (let k = 0; k < n; k++) { const x = cx + k * 5 - n * 2, y = cy - (k % 2) * 2; disco(x, y, 3.2, hex('#3e4a3a')); disco(x - 1, y - 1, 1.8, hex('#5a6650')); pset(x - 1, y - 3, hex('#f0f2f6')); pset(x, y - 3, hex('#f0f2f6')); }
  // la aldea: casitas de techo de paja con nieve y la iglesia con su torre
  for (const [x, w] of [[176, 16], [196, 14], [244, 18], [266, 14]]) { const y = lom(x + w / 2) + 2; rect(x, y - 9, x + w, y, hex('#e8dcc0')); for (let i = x; i <= x + w; i += 4) linea(i, y - 9, i, y, hex('#6a4a2e')); for (let k = 0; k < 6; k++) linea(x - 2 + k, y - 9 - k, x + w + 2 - k, y - 9 - k, k < 2 ? hex('#8a6a3a') : hex('#f2f4f8')); rect(x + 3, y - 6, x + 5, y - 4, hex('#f0c060')); pset(x + 4, y - 5, hex('#c08030')); rect(x + w - 4, y - 18, x + w - 2, y - 13, hex('#7a6a5a')); }
  const ix = 214, iy = lom(220) + 2; rect(ix, iy - 14, ix + 26, iy, hex('#a8a296')); for (let y = iy - 14; y < iy; y += 3) for (let x = ix + ((y >> 1) & 2); x < ix + 26; x += 5) pset(x, y, hex('#8a8478'));
  for (let k = 0; k < 6; k++) linea(ix - 1 + k, iy - 14 - k, ix + 27 - k, iy - 14 - k, k < 2 ? hex('#5a5662') : hex('#f2f4f8'));
  rect(ix - 9, iy - 34, ix + 1, iy, hex('#b4aea2')); rect(ix - 9, iy - 34, ix - 8, iy, hex('#8a8478')); for (let y = iy - 32; y < iy; y += 4) linea(ix - 9, y, ix + 1, y, hex('#9a9488'));
  for (let x = ix - 10; x <= ix + 2; x += 2) rect(x, iy - 37, x, iy - 35, hex('#b4aea2')); rect(ix - 6, iy - 30, ix - 4, iy - 26, hex('#2a2a34')); rect(ix - 6, iy - 18, ix - 4, iy - 14, hex('#f0c060'));
  // el muro de piedra seca con su caperuza de nieve
  for (let x = 0; x < 320; x++) for (let y = 122; y < 132; y++) { const fila = (y - 122) >> 2, j = Math.floor((x + fila * 5) / 9); const borde = (x + fila * 5) % 9 === 0 || (y - 122) % 4 === 3; pset(x, y, borde ? hex('#5a5650') : hh(j, fila, 11) < 0.33 ? hex('#8e887c') : hh(j, fila, 11) < 0.66 ? hex('#9e9a8e') : hex('#7e786e')); }
  for (let x = 0; x < 320; x++) { const a2 = 2 + Math.round(ruido(x / 5, 12) * 2); for (let y = 122 - a2; y < 123; y++) pset(x, y, y === 122 - a2 ? hex('#ffffff') : hex('#e6ebf2')); }
  // el prado nevado de delante: trama, matas secas, pisadas y el barro pisoteado del centro
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (y - 132) / 48 * 0.6 + (hh(x >> 2, y >> 2, 13) - 0.5) * 0.2 > bay(x, y) ? hex('#d4dce8') : hex('#eef2f8'));
  for (let y = 150; y < 168; y++) for (let x = 96; x < 226; x++) { const d = Math.hypot((x - 160) / 64, (y - 159) / 9); if (d < 1 && hh(x, y, 14) < 1.15 - d) pset(x, y, hh(x, y, 15) < 0.3 ? hex('#6a5442') : hex('#8a7058')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 16) * 316), y = 134 + Math.floor(hh(k, 2, 16) * 44); if (x > 92 && x < 230 && y > 146 && y < 170) continue; for (let i = 0; i < 3; i++) linea(x + i, y, x + i - 1 + i, y - 2 - (i % 2), hex(i % 2 ? '#8a7448' : '#6a5838')); }
  for (let k = 0; k < 14; k++) { const x = 20 + k * 21, y = 170 + (k % 2) * 4; rect(x, y, x + 2, y + 1, hex('#c8d0de')); }
  // el carro de heno con nieve (derecha) y la paca de paja (izquierda), y las pisadas que cruzan el prado
  rect(250, 154, 306, 165, hex('#2a1e16')); for (let x = 251; x < 306; x++) for (let y = 155; y < 165; y++) pset(x, y, (y - 155) % 3 === 2 ? hex('#4e3624') : hh(x >> 2, y, 31) < 0.3 ? hex('#6a4a30') : hex('#7a5638'));
  for (let x = 252; x < 305; x++) { const y = 154 - Math.round(Math.sin((x - 252) / 53 * Math.PI) * 12); for (let yy = y; yy < 155; yy++) pset(x, yy, yy < y + 2 ? hex('#f4f6fa') : hh(x, yy, 32) < 0.35 ? hex('#a8823a') : hh(x, yy, 32) < 0.7 ? hex('#c8a050') : hex('#dab868')); }
  for (const wx of [262, 294]) { disco(wx, 170, 7, hex('#2a1e16')); disco(wx, 170, 6, hex('#7a5638')); disco(wx, 170, 4, hex('#5a3e28')); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; linea(Math.round(wx - Math.cos(an) * 5), Math.round(170 - Math.sin(an) * 5), Math.round(wx + Math.cos(an) * 5), Math.round(170 + Math.sin(an) * 5), hex('#3e2a1c')); } disco(wx, 170, 1.4, hex('#2a2a30')); pset(wx - 2, 165, hex('#f4f6fa')); }
  linea(250, 160, 232, 168, hex('#3e2a1c')); linea(250, 161, 232, 169, hex('#6a4a30'));
  rect(20, 161, 46, 177, hex('#2a1e16')); for (let x = 21; x < 46; x++) for (let y = 162; y < 177; y++) pset(x, y, y < 164 ? hex('#f4f6fa') : (x - 21) % 6 === 0 ? hex('#8a6a2a') : hh(x, y, 33) < 0.3 ? hex('#b08a40') : hex('#d0a858'));
  rect(21, 168, 45, 168, hex('#6a4a1e')); rect(21, 173, 45, 173, hex('#6a4a1e'));
  for (let k = 0; k < 9; k++) { const x = Math.round(lerp(70, 112, k / 8)), y = Math.round(lerp(178, 158, k / 8)) + (k % 2) * 2; rect(x, y, x + 1, y, hex('#b8c4d4')); }
  for (let k = 0; k < 9; k++) { const x = Math.round(lerp(236, 210, k / 8)), y = Math.round(lerp(178, 160, k / 8)) + (k % 2) * 2; rect(x, y, x + 1, y, hex('#b8c4d4')); }
  // el roble pelado de la izquierda
  rect(14, 60, 19, 132, hex('#3e3028')); rect(15, 60, 16, 132, hex('#5a4636')); for (let y = 64; y < 132; y += 5) pset(18, y, hex('#2a2018'));
  for (const [x1, y1, x2, y2] of [[16, 80, 2, 58], [17, 70, 40, 46], [16, 64, 22, 34], [18, 90, 48, 72], [15, 74, 0, 70], [30, 58, 36, 40], [40, 46, 56, 44], [22, 34, 14, 22]]) { linea(x1, y1, x2, y2, hex('#3e3028')); linea(x1 + 1, y1, x2 + 1, y2, hex('#4e3e32')); pset(x2, y2 - 1, hex('#f2f4f8')); }
};
// la bandera que ondea: rectángulo de w × h desde el asta (x, y), hacia d (1 derecha, −1 izquierda)
const bandera = (x, y, w, h, d, t, pinta) => {
  for (let i = 0; i < w; i++) { const dy = Math.round(Math.sin(t * 5 - i * 0.5) * (i / w) * 2); for (let j = 0; j < h; j++) R.pset(x + d * i, y + j + dy, pinta(i, j)); R.pset(x + d * i, y - 1 + dy, K); R.pset(x + d * i, y + h + dy, K); }
};
const p1 = (t) => {
  if (!FONDO) { FONDO = R.nuevo(); const prev = R.usar(FONDO); fondoPrado(); R.usar(prev); }
  R.copiar(FONDO);
  // nubes de tres tonos a tres velocidades, y los cuervos
  for (const [x0, y, w, v, k] of [[40, 20, 44, 3, 1], [200, 34, 34, 5, 2], [120, 50, 26, 8, 3], [290, 26, 30, 4, 4]]) {
    const x = ((x0 + t * v) % 380 + 380) % 380 - 30;
    for (const [dx, dy, r, c] of [[0, 1, 0.3, '#9aa6be'], [0, 0, 0.27, '#dfe3ec'], [-2, -2, 0.17, '#f6f7fa']]) for (let i = 0; i < 4; i++) { const cx = x + (i - 1.5) * w * 0.24 + dx, cy = y + dy - Math.sin((i + 0.5) / 4 * Math.PI) * w * 0.08; if (!(cx > 270 && cy < 48) && !(cy < 16 && cx > 14 && cx < 176)) R.disco(Math.round(cx), Math.round(cy), w * r * (i % 3 ? 1 : 0.8), hex(c)); }
  }
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 90 + t * 22) % 360) - 20), y = Math.round(64 + k * 6 + Math.sin(t * 2 + k) * 3), al = Math.sin(t * 10 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (al ? 1 : 0), K); R.pset(x + 1, y - (al ? 1 : 0), K); R.pset(x - 2, y - (al ? 2 : -1), K); R.pset(x + 2, y - (al ? 2 : -1), K); }
  // humo de las chimeneas de la aldea
  for (const cx of [188, 206, 258]) for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1; R.disco(Math.round(cx + u * 8 + Math.sin(u * 6 + k) * 2), Math.round(86 - u * 22), 1 + u * 2, hex(u < 0.5 ? '#aab0bc' : '#c6cad4')); }
  // los estandartes: el del rey (rojo con oro) a la izquierda y el del Parlamento (leonado) a la derecha
  R.rect(46, 70, 47, 150, K); R.pset(46, 69, hex('#f0c040'));
  bandera(48, 72, 22, 14, 1, t, (i, j) => { const q = (i < 11 ? 0 : 1) + (j < 7 ? 0 : 2), c = ['#b8202a', '#2a4a9a', '#e8b830', '#b8202a'][q]; return (i + j) % 4 === 0 && q !== 2 ? hex('#f0c040') : q === 2 && i % 4 === 1 && j % 3 === 1 ? hex('#b8202a') : hex(c); });
  R.rect(272, 70, 273, 150, K); R.pset(272, 69, hex('#f0c040'));
  bandera(271, 72, 22, 14, -1, t, (i, j) => (j === 0 || j === 13 || i === 21) ? hex('#8a4a1a') : hex('#d8843a'));
  // los vecinos miran junto al muro y jalean a los suyos
  const roto0 = t > rompe;
  R.actor(EL.vecina, 118, 140, t, { dir: 1, brazos: !roto0 && Math.sin(t * 3) > 0.3, sorpresa: roto0, habla: !roto0 && Math.sin(t * 9) > 0 });
  R.actor(EL.vecino, 136, 141, t, { dir: 1, dedo: !roto0 && Math.sin(t * 2.4 + 1) > 0, sorpresa: roto0 });
  R.actor(EL.aprendiz, 180, 140, t, { dir: -1, brazos: !roto0 && Math.sin(t * 3 + 2) > 0.3, sorpresa: roto0, salto: !roto0 && Math.sin(t * 6) > 0.6 ? 2 : 0 });
  // el tira y afloja: realistas (pelucas y casacas) contra puritanos, con la cruz de San Jorge en el centro
  const roto = t > rompe, tira = roto ? 0 : Math.round(Math.sin(t * 2.3) * 4 + Math.sin(t * 5.1) * 2 * tramo(t, guerra - 1, guerra));
  const rec = roto ? tramo(t, rompe, rompe + 0.35) : 0;
  const izq = [[EL.criado, 64], [EL.cristianoRico, 82], [EL.criado, 100]], der = [[EL.puritano, 206], [EL.alguacil, 224], [EL.puritano, 242]];
  const manos = [];
  izq.forEach(([def, x], i) => { const xx = x + tira - Math.round(rec * 10) + (i === 1 ? 0 : 1); const m = R.actor(def, xx, 162, t, { dir: 1, sostiene: [xx + 18, 150], enfado: !roto, sorpresa: roto, pal: i === 2 ? { C: '#7a2a3a', c: '#5a1e2a' } : undefined }); manos.push(m.mano); });
  der.forEach(([def, x], i) => { const xx = x + tira + Math.round(rec * 10); const m = R.actor(def, xx, 162, t, { dir: -1, sostiene: [xx - 4, 150], enfado: !roto, sorpresa: roto }); manos.push(m.mano); });
  const L = manos.slice(0, 3).sort((p, q) => p[0] - q[0]), Rr = manos.slice(3).sort((p, q) => p[0] - q[0]);
  const cuerda = (p, q) => { R.linea(p[0], p[1], q[0], q[1], hex('#6a5030')); R.linea(p[0], p[1] + 1, q[0], q[1] + 1, hex('#a8844e')); };
  const mid = [160 + tira, 150];
  if (!roto) { cuerda(L[0], L[2]); cuerda(L[2], mid); cuerda(mid, Rr[0]); cuerda(Rr[0], Rr[2]); }
  else { const l = Math.round(lerp(30, 6, rec)); cuerda(L[0], L[2]); cuerda(L[2], [L[2][0] + l, 156 + Math.round(rec * 10)]); cuerda(Rr[0], Rr[2]); cuerda([Rr[0][0] - l, 156 + Math.round(rec * 10)], Rr[0]); }
  // la banderita de San Jorge atada a la cuerda (cae al barro cuando se rompe)
  const fy = roto ? Math.round(lerp(150, 162, tramo(t, rompe, rompe + 0.4))) : 150;
  R.rect(mid[0] - 6, fy, mid[0] + 6, fy + 9, K); R.rect(mid[0] - 5, fy + 1, mid[0] + 5, fy + 8, hex('#f6f6f0')); R.rect(mid[0] - 1, fy + 1, mid[0], fy + 8, hex('#c02030')); R.rect(mid[0] - 5, fy + 4, mid[0] + 5, fy + 5, hex('#c02030'));
  // nieve fina que cae
  for (let k = 0; k < 40; k++) { const y = Math.round((hh(k, 2, 21) * 200 + t * (8 + hh(k, 1, 21) * 8)) % 200) - 10, x = Math.round((hh(k, 3, 21) * 340 + t * 4 + Math.sin(t + k) * 2) % 340) - 10; if ((x > 272 && y < 48) || (y < 16 && x > 16 && x < 174)) continue; R.pset(x, y, hex(k % 5 ? '#f4f6fa' : '#ffffff')); if (k % 6 === 0) R.pset(x + 1, y, hex('#e0e6f0')); }
};
const p2 = (t) => {
  T.siglo17(R, t, { encuadre: 'parlamento' });
  // el presidente en su sillón y los dos escribanos en la mesa
  R.actor(EL.puritano, 153, 118, t, { dir: 1, habla: t > navidad + 0.4 && Math.sin(t * 6) > 0, dedo: t > navidad + 0.6 });
  R.actor(EL.escribanoParl, 128, 150, t, { dir: 1, sostiene: [146, 140 + Math.round(Math.sin(t * 9))] });
  R.actor(EL.escribanoParl, 178, 150, t, { dir: -1, habla: t > nunca && Math.sin(t * 5) > 0.3 });
  T.siglo17Delante(R, t, { encuadre: 'parlamento', fila: 'mesa' });
  // las tres gradas de cada lado, de atrás a delante; los de delante giran la cabeza hacia el que habla
  const fila = (suelo, xs, f) => { xs.forEach(([x, d], i) => R.actor(i % 2 ? EL.puritanoBiblia : EL.puritano, x, suelo, t, { dir: t > biblia && x > 160 ? -1 : d, habla: t > nunca && (i + f) % 3 === 0 && Math.sin(t * 5 + i) > 0.4 })); T.siglo17Delante(R, t, { encuadre: 'parlamento', fila: f }); };
  fila(122, [[2, 1], [24, 1], [46, 1], [252, -1], [274, -1], [298, -1]], 2);
  fila(148, [[2, 1], [24, 1], [48, 1], [70, 1], [236, -1], [258, -1], [282, -1], [304, -1]], 1);
  // en la grada de delante, el puritano que se levanta con la Biblia abierta
  const sube = tramo(t, biblia - 0.5, biblia), xs = [[6, 1], [30, 1], [56, 1], [222, -1], [246, -1], [270, -1], [296, -1]];
  xs.forEach(([x, d], i) => R.actor(i % 2 ? EL.puritanoBiblia : EL.puritano, x, 174, t, { dir: t > biblia && x > 160 ? -1 : d, sonrisa: false, habla: t > nunca && i === 4 && Math.sin(t * 6) > 0 }));
  T.siglo17Delante(R, t, { encuadre: 'parlamento', fila: 0 });
  const ox = 84, oy = 174 - Math.round(sube * 6);
  const or = R.actor(EL.puritano, ox, oy, t, { dir: 1, habla: t > nunca && Math.sin(t * 8) > 0, sostiene: t > biblia - 0.2 ? [ox + 20, oy - 22] : undefined, enfado: t > navidad });
  if (t > biblia - 0.2) PZ.biblia(R, or.mano[0] + 2, or.mano[1] + 2, { abierta: true });
  // sobre él, el acebo tachado en «Christmas»
  if (t > navidad) { const y = 118 - (t < navidad + 0.15 ? 3 : 0); PZ.acebo(R, 104, y, { s: 2 }); R.icono('X', 99, y - 13, hex('#d02030'), K, 2); }
};
const p3 = (t) => {
  const tacha = tramo(t, tN - 0.35, tN) + tramo(t, tP - 0.35, tP) + tramo(t, tPe - 0.35, tPe);
  const g = T.siglo17(R, t, { encuadre: 'parlamento', camara: 'escribano', tacha });
  // el escribano detrás de la mesa: espera, moja la pluma en «1647» y escribe cada tachón
  const escribe = t > abole && t < tPe + 0.3;
  R.actor(EL.escribanoParl, 128, 145, t, { dir: -1, habla: t < moja && Math.sin(t * 5) > 0.2, sostiene: t > moja - 0.2 && t < moja + 0.5 ? [112, 128] : escribe ? [104 - Math.round(Math.sin(t * 14) * 2), 136] : undefined, sonrisa: t > tPe + 0.4 });
  // el ayudante con su sombrero alto llega y señala cada casilla tachada
  const v = tramo(t, P3 + 0.3, P3 + 2.2), px = Math.round(lerp(-18, 22, v));
  const cual = t > tPe ? 2 : t > tP ? 1 : 0;
  R.actor(EL.puritano, px, 172, t, { dir: 1, anda: v > 0 && v < 1, dedo: t > tN - 0.4, habla: t > tN - 0.4 && Math.sin(t * 7) > 0, enfado: t > abole });
  T.siglo17Delante(R, t, { encuadre: 'parlamento', camara: 'escribano' });
  // un destello sobre la casilla que se acaba de tachar
  for (const [t0, [x0, y0, x1, y1]] of [[tN, [192, 97, 203, 113]], [tP, [80, 78, 91, 94]], [tPe, [108, 59, 119, 75]]]) { const u = (t - t0) / 0.5; if (u > 0 && u < 1) { const r = Math.round(9 + u * 5), cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1; for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + 0.6; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#fff4b0')); R.pset(Math.round(cx + Math.cos(an) * (r + 1)), Math.round(cy + Math.sin(an) * (r + 1)), hex('#ffffff')); } } }
  void cual; void g;
};
const p4 = (t) => {
  T.siglo17(R, t, { encuadre: 'canterbury', camara: 'tienda' });
  // el calendario del mes, colgado en la pared de la tienda, con su clavo
  R.linea(86, 54, 90, 61, hex('#6a5030')); R.linea(114, 54, 110, 61, hex('#6a5030'));
  PZ.calendario(R, 100, 105, { s: 2, marca: t > libre ? [10, 10] : undefined });
  // el panadero señala el calendario y rodea un día libre con tiza verde
  const rodea = tramo(t, libre - 0.3, libre + 0.3);
  const pan = R.actor(EL.vecino, 122, 147, t, { dir: -1, dedo: t > P4 + 0.3 && t < libre - 0.4, sostiene: t > libre - 0.4 && t < libre + 0.5 ? [118, 128] : undefined, sonrisa: t > libre, habla: t < libre && Math.sin(t * 6) > 0 });
  void pan;
  if (rodea > 0) { const cx = 96, cy = 82, n = Math.round(rodea * 24); for (let k = 0; k < n; k++) { const an = k / 24 * Math.PI * 2 - 1.2; R.pset(Math.round(cx + Math.cos(an) * 5), Math.round(cy + Math.sin(an) * 4), hex('#2a9a3a')); R.pset(Math.round(cx + Math.cos(an) * 6), Math.round(cy + Math.sin(an) * 4), hex('#3ac84a')); } }
  if (t > libre + 0.3 && t < libre + 1.4) for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + t * 3; R.pset(Math.round(96 + Math.cos(an) * 10), Math.round(82 + Math.sin(an) * 8), hex('#fff4b0')); }
  T.siglo17Delante(R, t, { encuadre: 'canterbury', camara: 'tienda' });
  // llegan: el estudiante («students»), la criada («servants») y los dos aprendices de mandil («apprentices»)
  const llega = (t0, x0, x1) => Math.round(lerp(x0, x1, tramo(t, t0 - 0.5, t0 + 0.6)));
  const fiesta = t > libre, salta = (k) => fiesta ? Math.max(0, Math.round(Math.sin((t - libre) * 7 + k) * 5)) : 0;
  const ex = llega(estud, -20, 52);
  R.actor(EL.copista, ex, 174, t, { dir: 1, anda: t > estud - 0.5 && t < estud + 0.6, salto: salta(0), brazos: fiesta && t > mes, sonrisa: true });
  const cx = llega(criados, 334, 250);
  R.actor(EL.criada, cx, 174, t, { dir: -1, anda: t > criados - 0.5 && t < criados + 0.6, salto: salta(1.5), sonrisa: true, brazos: fiesta });
  const a1 = llega(aprend, -20, 82), a2 = llega(aprend + 0.2, 334, 214);
  R.actor(EL.aprendiz, a1, 176, t, { dir: 1, anda: t > aprend - 0.5 && t < aprend + 0.6, salto: salta(3), brazos: fiesta, sonrisa: true });
  R.actor(EL.aprendiz2, a2, 176, t, { dir: -1, anda: t > aprend - 0.3 && t < aprend + 0.8, salto: salta(4.5), brazos: fiesta && t > mes, sonrisa: true });
};
const efectos = [[guerra, 'whoosh'], [rompe, 'boing'], [biblia, 'papel'], [navidad, 'pop'], [navidad + 0.7, 'toc'], [moja, 'burbujas'],
  [tN, 'lapiz'], [tP, 'lapiz'], [tPe, 'lapiz'], [libre, 'lapiz'], [libre + 0.3, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, cartela: '1647', año: 1647 });
''')
