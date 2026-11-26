E = {}

# Ayudas comunes (se pegan al principio de cada cuerpo)
AYUDAS = r'''
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const ORO = pal('#7a4a10', '#c8901c', '#f0c040', '#fff0a0'), ROJO = pal('#5a0e10', '#b02424', '#e84a3a', '#ffa890');
const capas = {};
const capa = (k, f) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } return capas[k]; };
const tine = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const halo = (cx, cy, r, c, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const q = Math.floor(((1 - d) * (1 - d)) * 4 + BAY[y & 3][x & 3] / 16) / 4; if (q > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(0.9, q * a))); } };
const nube = (cx, cy, w, cols, k) => { const n = Math.max(3, Math.round(w / 7)), r = (i) => 3 + hh(k, i, 3) * 3 + (i > 0 && i < n - 1 ? 2 : 0), X = (i) => Math.round(cx - w / 2 + (i + 0.5) * w / n);
  for (let i = 0; i < n; i++) R.disco(X(i), Math.round(cy + 1), r(i), cols[0]);
  for (let i = 0; i < n; i++) { R.disco(X(i), Math.round(cy), r(i) - 1, cols[1]); R.disco(X(i) - 1, Math.round(cy - 2), Math.max(1, r(i) - 3), cols[2]); } };
const velo = (c, a) => { if (a <= 0) return; const B = R.buf, cr = c & 255, cg = (c >>> 8) & 255, cb = (c >>> 16) & 255;
  for (let i = 0; i < 57600; i++) { const v = B[i], r = v & 255, g = (v >>> 8) & 255, b = (v >>> 16) & 255;
    B[i] = (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0; } };
const chispas = (x, y, t, n, r, c, sem = 0) => { for (let k = 0; k < n; k++) { const a = hh(k, 3, sem) * 6.28 + t * 0.8, d = r * (0.4 + hh(k, 4, sem) * 0.6), on = Math.sin(t * 9 + k * 2.3) > 0.2;
  if (!on) continue; const X = Math.round(x + Math.cos(a) * d), Y = Math.round(y + Math.sin(a) * d * 0.8); R.pset(X, Y, hex('#ffffff')); tine(X - 1, Y, c, 0.8); tine(X + 1, Y, c, 0.8); tine(X, Y - 1, c, 0.8); tine(X, Y + 1, c, 0.8); } };
// nubes de tres tonos a tres velocidades entre y0 e y1 (de x 0 a 320, se repiten); evita la zona de Atom con el corte de x
const cielo3 = (t, y0, y1, cols, sem, n = 7) => { for (let k = 0; k < n; k++) { const capa_ = k % 3, v = [2.2, 4.5, 7.5][capa_], w = 18 + hh(k, 1, sem) * 26 + capa_ * 6;
  const x = ((hh(k, 2, sem) * 380 + t * v) % 380) - 30, y = y0 + hh(k, 3, sem) * (y1 - y0) + capa_ * 3; if (x > 262 && y < 48) continue; nube(x, y, w, cols, k + sem * 7); } };
// pájaros en uve que cruzan (de y0, n, velocidad v)
const pajaros = (t, y0, n, v, sem, c) => { const x0 = ((t * v + hh(sem, 1) * 300) % 420) - 60; for (let i = 0; i < n; i++) { const d = Math.ceil(i / 2) * (i % 2 ? 1 : -1);
  const x = Math.round(x0 - Math.abs(d) * 6), y = Math.round(y0 + d * 4 + Math.sin(t * 2 + i) * 0.6), a = Math.sin(t * 9 + i * 1.7) > 0;
  if (x < 1 || x > 318 || (x > 270 && y < 48)) continue; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -1), c); R.pset(x + 2, y - (a ? 1 : -1), c); } };
// número que aparece con un salto (u 0–1) y se queda
const cifra = (s, x, y, u, o = {}) => { if (u <= 0) return; const dy = Math.round((1 - ease(cl(u * 1.6))) * 8); R.numero(s, x, y + dy, { centro: true, rampa: ORO, ...o }); };
// burbuja redonda con un icono dentro (k: 'hacha', 'rueda', 'buey', 'choza', 'lanza'), que salta al salir (u) y se tacha (x 0–1)
const BUR = { b: hex('#f8f0dc'), bS: hex('#c8b898'), m: hex('#8a96a4'), mL: hex('#d8e0e8'), mD: hex('#4a525c'), w: hex('#8a5a30'), wL: hex('#c0884a'), wD: hex('#4a2e18') };
const icoDibujo = (k, x, y) => { const P = (i, j, c) => R.pset(x + i, y + j, c);
  if (k === 'hacha') { for (let j = -6; j <= 6; j++) { P(1, j, BUR.wD); P(0, j, BUR.w); P(-1, j, BUR.wL); } R.poligono([[-1, -6], [-7, -8], [-8, -2], [-1, -3]], BUR.mD); R.poligono([[-1, -5], [-6, -7], [-7, -3], [-1, -4]], BUR.m); R.linea(-7, -7, -7, -3, BUR.mL); }
  else if (k === 'rueda') { for (let a = 0; a < 6.28; a += 0.08) { P(Math.round(Math.cos(a) * 7), Math.round(Math.sin(a) * 7), BUR.wD); P(Math.round(Math.cos(a) * 6), Math.round(Math.sin(a) * 6), BUR.w); }
    for (let s = 0; s < 4; s++) { const a = s * 0.785; R.linea(x - Math.round(Math.cos(a) * 5), y - Math.round(Math.sin(a) * 5), x + Math.round(Math.cos(a) * 5), y + Math.round(Math.sin(a) * 5), BUR.wL); } R.disco(x, y, 1, BUR.wD); }
  else if (k === 'buey') { R.disco(x, y + 1, 4, BUR.wD); R.disco(x, y, 3, BUR.w); R.rect(x - 2, y + 2, x + 2, y + 5, BUR.wL); R.pset(x - 1, y + 4, K); R.pset(x + 1, y + 4, K); R.pset(x - 2, y - 1, K); R.pset(x + 2, y - 1, K);
    R.linea(x - 4, y - 2, x - 7, y - 5, BUR.b === 0 ? 0 : hex('#e8dcc0')); R.linea(x + 4, y - 2, x + 7, y - 5, hex('#e8dcc0')); R.rect(x - 8, y - 7, x + 8, y - 6, BUR.wD); R.rect(x - 8, y - 7, x + 8, y - 7, BUR.wL); }
  else if (k === 'choza') { R.poligono([[-8, 1], [0, -8], [8, 1]].map(([i, j]) => [x + i, y + j]), hex('#a8843a')); for (let j = -6; j <= 0; j += 2) R.linea(x - 7 + Math.round((j + 8) * 0.0), y + j, x + 7, y + j, hex('#7a5a22'));
    R.poligono([[-8, 1], [0, -8], [8, 1]].map(([i, j]) => [x + i, y + j]), hex('#c8a050')); for (let j = -5; j <= 0; j += 2) for (let i = -7; i <= 7; i++) if (Math.abs(i) < (j + 9) && (i + j) % 3 === 0) P(i, j, hex('#8a6a2a'));
    R.rect(x - 6, y + 1, x + 6, y + 7, hex('#9a6a3e')); R.rect(x - 6, y + 1, x + 6, y + 1, hex('#6a4428')); R.rect(x - 1, y + 3, x + 1, y + 7, K); }
  else if (k === 'lanza') { R.linea(x - 7, y + 7, x + 5, y - 5, BUR.wD); R.linea(x - 6, y + 7, x + 6, y - 5, BUR.w); R.poligono([[x + 4, y - 4], [x + 8, y - 8], [x + 6, y - 3]], hex('#5a5a62')); R.pset(x + 7, y - 7, hex('#d8d8e0')); } };
const burbuja = (k, x, y, u, tach, r = 13) => { if (u <= 0) return; const s = u < 1 ? ease(cl(u)) * (1 + Math.sin(cl(u) * 3.14) * 0.25) : 1, rr = Math.max(2, Math.round(r * s));
  R.disco(x + 1, y + 2, rr, hex('#00000040') === 0 ? K : mez(R.pget(x + 1, y + 2), K, 0.3)); R.disco(x, y, rr + 1, K); R.disco(x, y, rr, BUR.bS); R.disco(x - 1, y - 1, rr - 1, BUR.b);
  if (s > 0.8) icoDibujo(k, x, y);
  if (tach > 0) { const ro = rr + 2, n = Math.round(tach * 64);
    for (let a = 0; a < n; a++) { const g = -2.36 + a / 64 * 6.283; for (const w of [0, 1, 2]) R.pset(Math.round(x + Math.cos(g) * (ro - w)), Math.round(y + Math.sin(g) * (ro - w)), w === 0 ? ROJO[0] : w === 1 ? ROJO[2] : ROJO[1]); }
    const m = Math.round(tach * (rr - 2)); for (let i = -m; i <= m; i++) { R.pset(x + i, y + i, ROJO[2]); R.pset(x + i + 1, y + i, ROJO[2]); R.pset(x + i, y + i + 1, ROJO[0]); } } };
// polvo que sale del suelo (u 0–1) alrededor de (x, y), de anchura w
const polvo = (x, y, w, u, c = hex('#e8d8b8')) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < 16; k++) { const s = (k / 15 - 0.5) * 2, d = 2 + u * (8 + hh(k, 9) * 8);
  const X = x + s * w * 0.5 + s * d * 1.4, Y = y - d * 0.6 * (1 - Math.abs(s) * 0.4) - u * 3; const r = Math.round(1 + (1 - u) * 2);
  if ((1 - u) > hh(k, 7) * 0.8) { R.disco(Math.round(X), Math.round(Y), r, mez(R.pget(Math.round(X), Math.round(Y)), c, 0.7 * (1 - u))); } } };
// una lanza en la mano (mx, my), inclinada (ang 0 = vertical)
const lanza = (mx, my, ang = 0.18, L = 30) => { const ux = Math.sin(ang), uy = -Math.cos(ang); const x0 = mx - ux * 8, y0 = my - uy * 8, x1 = mx + ux * (L - 8), y1 = my + uy * (L - 8);
  R.linea(Math.round(x0 + 1), Math.round(y0), Math.round(x1 + 1), Math.round(y1), hex('#4a2e18')); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), hex('#a87a48'));
  const tx = Math.round(x1), ty = Math.round(y1); R.poligono([[tx - 2, ty + 1], [tx + Math.round(ux * 6), ty + Math.round(uy * 6)], [tx + 2, ty + 1]], hex('#3a3a42')); R.pset(tx, ty - 1, hex('#c8c8d0')); };
'''

E['gb-gancho'] = ('El gancho', '''// GB-GANCHO (frases 1–3). Once planos cortados en la voz inglesa:
// 1. (0) el recinto al alba: cinco cazadores tiran de las cuerdas y el pilar en T se levanta a tirones; en «6,000» sube
//    el número; en «before» aparece a su lado, diminuto, Stonehenge en piedra gris, con Atom que lo señala; GOLPE en
//    «Stonehenge»: el pilar cae de pie con su polvareda, los cazadores levantan los brazos y Atom se sorprende;
// 2. («Picture») la cima pelada al alba (fondo local): el cazador «tú» sube con su lanza y se para; Atom lo señala en
//    «yourself» y lo rodea su órbita en «hunter»; en «11,600» sube el número; en «bare hill» clava la lanza y mira
//    alrededor con el viento en la hierba; en «southeastern Turkey» señala la llanura hacia el sol;
// 3. («pulling») la cantera con el pilar sobre troncos: la fila tira a tirones; tú, al final de la cuerda, tiras de
//    espaldas y Atom detrás; en «leather rope» un brillo recorre la cuerda; en «30» sale el número sobre la fila; en
//    «T-shaped stone» se enciende el pilar;
// 4. («taller») el patio del recinto (fondo local): el pilar inclinado sobre su castillete; en «two men» el cazador se sube
//    a la cabeza del otro (y no llegan); en «car» aparece un coche fantasma más pequeño; desde «rises» los tres de la
//    cuerda tiran y el pilar sube poco a poco hasta caer en su base en «base», con polvo;
// 5. («You have no metal») la estepa de día: tres cazadores y Atom cruzan por el sendero; en «metal», «wheels»,
//    «draft animals» y «village» sale cada burbuja (hacha de metal, rueda, buey con yugo, choza) y se tacha; en «go home
//    to» el cazador se encoge de hombros y sigue;
// 6. («and yet») el pilar central de cerca: el cazador se acerca; en «arms» una luz recorre los brazos tallados, en
//    «hands» brillan las manos sobre el vientre (él las toca) y en «fox» se enciende el zorro, que «salta» con un trazo de
//    luz; Atom lo señala;
// 7. («That place is real», 2026) el cerro de hoy con la cubierta: una pareja de turistas sube; en «real» ella hace la
//    foto (flash); en «Gobekli Tepe» la órbita rodea la cubierta y Atom la señala; en «pyramids» asoma en el horizonte
//    una pirámide fantasma;
// 8. («older than writing») en lo alto del cerro hoy: Atom lanza una tablilla de barro en «writing», entra rodando una
//    rueda en «wheel» y brota una espiga gorda en «grain», cada una con sus años; en «older even» Atom señala la losa
//    enterrada y sube «11600»;
// 9. («from a time», -9600) el trigal silvestre: una cazadora entra, coge una espiga en «tend» y en «wild wheat» se le
//    desgrana; un niño cruza corriendo con un cesto; Atom mira;
// 10. («That's why», 2026) el salón de noche con el móvil: los vídeos de «civilización perdida» suben; en «internet»
//    salta el globo de avisos con su número; en «lost civilization» Atom se queda pensando con una «?»;
// 11. («or buried») el corte de la excavación teñido de vídeo nocturno (la versión de internet): dos encapuchados con
//    antorchas vuelcan cestos de tierra sobre el pilar desde «buried»; en «knew exactly» sale una gran «?» roja.''', AYUDAS + r'''
const pr = (f) => en('promesa', f), cz = (f) => en('cazador', f), it = (f) => en('internet', f);
const raised = pr(0.0701), seis = pr(0.4336), before = pr(0.714), stone = pr(0.8016);
const P2 = cz(0), yourself = cz(0.0065), hunter = cz(0.033), n11 = cz(0.0427), bare = cz(0.1424), southeast = cz(0.1721);
const P3 = cz(0.2284), leather = cz(0.2459), n30 = cz(0.2789), tshape = cz(0.3391);
const P4 = cz(0.3922), twomen = cz(0.409), heavier = cz(0.4375), car = cz(0.4608), rises = cz(0.4867), baseW = cz(0.554);
const P5 = cz(0.6031), metal = cz(0.6284), wheels = cz(0.6562), animals = cz(0.6886), village = cz(0.7267), gohome = cz(0.7468);
const P6 = cz(0.783), carved = cz(0.8193), arms = cz(0.8296), hands = cz(0.8594), fox = cz(0.928), leap = cz(0.9649);
const P7 = it(0), real = it(0.025), gobekli = it(0.0733), pyramids = it(0.1716);
const P8 = it(0.2124), writing = it(0.2349), wheel = it(0.2641), olderEven = it(0.3041), grain = it(0.3924);
const P9 = it(0.4274), people = it(0.4641), beginning = it(0.509), tend = it(0.5349), wild = it(0.5474);
const P10 = it(0.6265), internet = it(0.6648), lost = it(0.759);
const P11 = it(0.8281), buried = it(0.8348), handsI = it(0.8856), knew = it(0.9198);
const CUERO = pal('#3a2414', '#6a4428', '#9a6a40');
const cuerda = (x0, y0, x1, y1, comba = 2) => { const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba; R.pset(Math.round(x), Math.round(y) + 1, CUERO[0]); R.pset(Math.round(x), Math.round(y), (i >> 1) % 2 ? CUERO[1] : CUERO[2]); } };

// ── 1 · el recinto al alba: el pilar se alza y Stonehenge se queda diminuto ─────────────────────────────────────────
const SARSEN = pal('#4a4a54', '#7a7a86', '#a4a4ae', '#d0d0d8');
const stonehenge = (cx, by, t, tiembla, s = 1.6) => {   // un anillo de trilitos (~32 × 12 px a escala 1), piedra gris con su sombra
  const S = (v) => Math.round(v * s);
  for (let i = -S(20); i <= S(24); i++) { tine(cx + i, by + 1, K, 0.4); tine(cx + i + 3, by + 2, K, 0.22); }
  const pie = (x, y, h, w) => { const d = tiembla ? Math.round(Math.sin(t * 60 + x) * 0.8) : 0; R.rect(x, y - h + d, x + w, y, SARSEN[0]); R.rect(x + 1, y - h + 1 + d, x + w - 1, y - 1, SARSEN[2]); R.rect(x + 1, y - h + 1 + d, x + 1, y - 1, SARSEN[3]); R.rect(x + w - 1, y - h + 2 + d, x + w - 1, y - 1, SARSEN[1]); if (h > 8) R.pset(x + 2, y - Math.round(h / 2), SARSEN[1]); };
  const din = (x0, x1, y) => { R.rect(x0, y - 2, x1, y + 1, SARSEN[0]); R.rect(x0 + 1, y - 1, x1 - 1, y - 1, SARSEN[3]); R.rect(x0 + 1, y, x1 - 1, y, SARSEN[2]); };
  // fila de atrás (más pequeña y apagada), luego la de delante
  for (const [dx, h] of [[-12, 7], [-4, 8], [4, 8], [12, 7]]) pie(cx + S(dx), by - S(4), S(h), S(2));
  din(cx - S(13), cx - S(1), by - S(11)); din(cx + S(3), cx + S(15), by - S(11));
  for (const [dx, h] of [[-17, 10], [-10, 11], [-2, 12], [6, 11], [13, 10]]) pie(cx + S(dx), by, S(h), S(3));
  din(cx - S(18), cx - S(6), by - S(11)); din(cx - S(3), cx + S(10), by - S(12)); din(cx + S(12), cx + S(17), by - S(10));
  R.rect(cx + S(20), by - S(3), cx + S(23), by, SARSEN[1]); R.pset(cx + S(20), by - S(3), SARSEN[3]); };
const p1 = (t) => {
  const u = tramo(t, 0.2, stone - 0.3), paso = Math.floor(u * 4), lev = u < 1 ? 0.7 * (paso + ease(cl((u * 4 - paso) * 1.7))) / 4 : 0.7 + 0.3 * tramo(t, stone - 0.3, stone) ** 2;
  const o = { levantar: lev };
  const g = T.recinto(R, t, o) || {};
  const tira = t > 0.2 && t < stone, viva = t > stone;
  // los cinco de las cuerdas, de espaldas al pilar (miran a la izquierda) y con las manos en la cuerda
  [24, 42, 60, 78, 96].forEach((x0, k) => { const x = Math.round(x0 - lev * 10 + (tira && Math.floor(t * 4 + k) % 2 ? 1 : 0)), xh = x - 1;
    const yh = g.enCuerda ? g.enCuerda(k % 2, xh) : 140;
    R.actor([T.GB.cazadorGB, T.GB.cazador2GB, T.GB.cazadoraGB, T.GB.cazador2GB, T.GB.cazadora2GB][k], x, 150, t, viva ? { dir: k % 2 ? 1 : -1, brazos: t < stone + 1.2 || k % 2 === 0, sonrisa: true }
      : { dir: -1, anda: tira && (u * 4 - paso) < 0.6, sostiene: [xh, Math.round(yh)], enfado: tira }); });
  // el golpe: polvareda en la base del pilar que se levanta
  polvo(196, 148, 30, tramo(t, stone - 0.02, stone + 1.1));
  if (t > stone - 0.02 && t < stone + 0.25) halo(196, 120, 50, hex('#fff0c0'), 0.4 * (1 - tramo(t, stone, stone + 0.25)));
  // «6000» sube junto al pilar
  if (t > seis) { const a = tramo(t, seis, seis + 0.4); cifra('6000', 262, 132, a, { tam: 16 }); }
  // Stonehenge, diminuto, aparece en «before»; tiembla con el golpe
  const sb = tramo(t, before - 0.1, before + 0.3);
  if (sb > 0) { halo(266, 156, 30, hex('#d8e4ff'), 0.3 * sb); stonehenge(264, 168, t, t > stone && t < stone + 0.5); if (sb < 1) chispas(266, 156, t, 7, 22, hex('#e8e8ff'), 2); }
  // Atom: entra, señala Stonehenge en «before» y se sorprende con el golpe
  const va = ease(tramo(t, 0.4, 1.8)), ax = Math.round(lerp(140, 216, va));
  T.AT.atom(R, ax, 166, t, { dir: 1, pose: va > 0 && va < 1 ? 'camina' : t > before - 0.2 && t < stone ? 'senala' : t > stone ? 'brazos' : 'quieto', cara: t > stone ? 'sorpresa' : 'normal', habla: 0 });
  T.recintoDelante(R, t, o);
};

// ── 2 · la cima pelada al alba (fondo local) ──────────────────────────────────────────────────────────────────────
const CIEL = pal('#2c3468', '#45457e', '#6a5a92', '#9a6e98', '#d08a88', '#f0aa80', '#fcd294');
const CIMA = () => capa('cima', () => {
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIEL, (y / 84) * 6.2 + Math.max(0, 1 - Math.hypot(x - 250, y - 78) / 120) * 1.2 + hh(x >> 2, y >> 1) * 0.25, x, y));
  // el sol que asoma, con su halo
  for (let y = 60; y < 86; y++) for (let x = 220; x < 282; x++) { const d = Math.hypot(x - 251, y - 79); if (d < 9) R.pset(x, y, d < 7 ? hex('#fff4c8') : hex('#ffd890')); else if (d < 28 && (x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#ffe0a0'), 0.35 * (1 - d / 28))); }
  // los montes del fondo (Karacadağ, azul violeta) en dos capas
  for (let x = 0; x < 320; x++) { const h1 = 70 + Math.sin(x * 0.02) * 4 - Math.max(0, 1 - Math.abs(x - 210) / 110) * 12 + hh(x >> 3, 1) * 2, h2 = 78 + Math.sin(x * 0.05 + 2) * 3 + hh(x >> 2, 2) * 1.5;
    for (let y = Math.round(h1); y < 88; y++) R.pset(x, y, tono(pal('#5a4a7a', '#6c5a88', '#80689a'), 1 + (y - h1) / 14 + (hh(x >> 1, y >> 1) > 0.8 ? 0.5 : 0) - (Math.abs(x - 250) < 50 && y < h1 + 3 ? -1 : 0), x, y));
    for (let y = Math.round(h2); y < 90; y++) R.pset(x, y, tono(pal('#6a5070', '#7a5e78', '#8e6c80'), 1 + (y - h2) / 8 + hh(x, y) * 0.4, x, y)); }
  // la llanura de abajo, de y 86 a 116: franjas de estepa, manchas de trigo silvestre, un arroyo y arbolitos
  for (let y = 86; y < 150; y++) for (let x = 0; x < 320; x++) { const p = Math.min(1, (y - 86) / 30), z = hh(x >> 3, y >> 1, 4), tri = Math.sin(x * 0.03 + y * 0.3) + z > 1.2;
    R.pset(x, y, tri ? tono(pal('#a88a4a', '#c8a45a', '#e0c070'), 1 + p + hh(x, y) * 0.6, x, y) : tono(pal('#8a6a5a', '#9e7c5c', '#b08e62', '#c4a06a'), 0.8 + p * 2 + z * 0.6, x, y)); }
  for (let x = 0; x < 320; x++) { const y = Math.round(100 + Math.sin(x * 0.025) * 5 + Math.sin(x * 0.07) * 2); R.pset(x, y, hex('#e8c0a0')); R.pset(x, y + 1, hex('#7a8ab0')); if (x % 9 === 0) R.pset(x, y, hex('#fff0d0')); }
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 11) * 320), y = Math.round(90 + hh(k, 12) * 24), r = 1 + Math.round(hh(k, 13) * 2); R.disco(x, y, r, hex('#4a5a3a')); R.pset(x - 1, y - r, hex('#6a7a4a')); R.pset(x, y + r, hex('#3a2a2a')); }
  // la cima: tierra roja con la roca de caliza que aflora, sílex, piedras y matas secas (y 116–180)
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 116 + Math.pow((x - 150) / 170, 2) * 14 + hh(x >> 2, 5) * 2; if (y < borde) continue;
    const p = (y - borde) / 60; R.pset(x, y, y < borde + 1 ? hex('#e8b088') : tono(pal('#6a3a24', '#8a4e30', '#a8643e', '#c47a4e', '#d89a6a'), 3.2 - p * 1.6 + hh(x >> 1, y >> 1, 6) * 0.7 + (x < 160 ? 0.3 : -0.2), x, y)); }
  const caliza = pal('#7a6a4e', '#a8946e', '#d8c8a4', '#ece0c4');
  // peñascos de caliza gris que asoman, con la luz del sol de la derecha y su sombra larga a la izquierda
  const ROC = pal('#3a2e28', '#5e5248', '#857868', '#ab9e88', '#d0c4a8');
  for (let k = 0; k < 26; k++) { const cx = Math.round(hh(k, 61) * 330 - 5), cy = Math.round(124 + Math.pow(hh(k, 62), 0.8) * 54), p = (cy - 124) / 56, rx = Math.round(3 + hh(k, 63) * 6 + p * 7), ry = Math.max(2, Math.round(rx * (0.5 + hh(k, 64) * 0.25)));
    if (cx > 70 && cx < 200 && cy > 138 && cy < 168) continue;
    for (let i = -rx * 3; i <= 0; i++) for (let j = 0; j <= 1; j++) tine(cx + i - rx * 0.4, cy + ry - j, hex('#3a1a10'), 0.45 * (1 + i / (rx * 3)));
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2 + (hh((cx + i) >> 1, (cy + j) >> 1, k) - 0.5) * 0.3; if (e > 1) continue;
      const lz = (i / rx) * 0.7 - (j / ry) * 0.9; R.pset(cx + i, cy + j, e > 0.8 ? ROC[0] : tono(ROC, 2 + lz * 1.4 + hh(i, j, k) * 0.5, cx + i, cy + j)); }
    if (rx > 6) { let x = cx - 1, y = cy - ry + 1; for (let q = 0; q < ry * 1.5; q++) { R.pset(Math.round(x), Math.round(y), ROC[0]); x += hh(q, k) - 0.4; y += 1; } } }
  // matas secas de la cima y su sombra
  for (let k = 0; k < 110; k++) { const x = Math.round(hh(k, 71) * 320), y = Math.round(124 + hh(k, 72) * 56), h = 2 + Math.round(hh(k, 73) * 3 + (y - 124) / 20); for (let i = 0; i < 5; i++) R.pset(x + i - 3, y + 1, hex('#5a3020'));
    for (let f = -2; f <= 2; f++) for (let q = 0; q < h - Math.abs(f); q++) R.pset(x + f + Math.round(f * q * 0.3), y - q, q > h - 3 ? hex('#d8c070') : f % 2 ? hex('#8a7a3a') : hex('#a89048')); }
  for (let k = 0; k < 120; k++) { const x = Math.round(hh(k, 21) * 320), y = Math.round(122 + hh(k, 22) * 58); if (hh(k, 23) > 0.6) { R.pset(x, y, hex('#3a3a46')); R.pset(x + 1, y, hex('#5a5a66')); R.pset(x, y - 1, hex('#c8c8d8')); } else { R.pset(x, y, hex('#5a2e1c')); R.pset(x, y - 1, hex('#e0a878')); } }
});
const MATAS = [[14, 172, 9], [62, 164, 7], [128, 150, 6], [186, 166, 8], [236, 158, 7], [304, 150, 8], [270, 178, 9], [108, 178, 8], [176, 128, 5], [40, 134, 5]];
const matas = (t, fuerza = 1) => MATAS.forEach(([x, y, h], k) => { for (let f = 0; f < 6; f++) { const a = -1.57 + (f - 2.5) * 0.28 + Math.sin(t * 2.2 + k + f * 0.3) * 0.12 * fuerza + 0.1 * fuerza;
  for (let i = 0; i < h - (f % 2) * 2; i++) R.pset(Math.round(x + Math.cos(a) * i), Math.round(y + Math.sin(a) * i), i > h - 4 ? hex('#d8c070') : f % 2 ? hex('#8a7a3a') : hex('#a89048')); } });
const p2 = (t) => {
  R.copiar(CIMA());
  cielo3(t, 10, 52, pal('#9a6a88', '#e8a090', '#ffd8b0'), 1, 6);
  pajaros(t, 40, 5, 11, 2, hex('#3a2a4a')); pajaros(t + 14, 56, 3, 7, 3, hex('#4a3a5a'));
  // la gacelas pequeñas que cruzan la llanura y el humo de un campamento lejano
  for (let k = 0; k < 6; k++) { const x = Math.round(((t * 6 + k * 9) % 380) - 40), y = 104 + (k % 3); if (x < 0 || x > 319) continue; const b = Math.floor(t * 8 + k) % 2;
    R.rect(x, y - 2, x + 3, y - 1, hex('#c08a50')); R.pset(x + 4, y - 3, hex('#c08a50')); R.pset(x + 4, y - 4, K); R.pset(x + b, y, hex('#5a3a20')); R.pset(x + 3 - b, y, hex('#5a3a20')); }
  for (let k = 0; k < 10; k++) { const u = ((t * 0.25 + k / 10) % 1), x = 36 + Math.sin(u * 5 + t) * 3 + u * 12, y = 106 - u * 34; tine(x, y, hex('#d8c8d0'), 0.5 * (1 - u)); tine(x + 1, y, hex('#d8c8d0'), 0.4 * (1 - u)); }
  const viento = t > bare - 0.1 && t < southeast + 0.3 ? 2.5 : 1;
  matas(t, viento);
  if (viento > 1) for (let k = 0; k < 7; k++) { const x = ((t * 140 + k * 61) % 360) - 20, y = 120 + k * 8; for (let i = 0; i < 10; i++) tine(x + i, y + Math.sin((x + i) * 0.2) * 1.5, hex('#fff0e0'), 0.35); }
  R.actor(T.GB.cazadora2GB, 262, 140, t, { dir: 1, sostiene: true, sonrisa: t > southeast });
  lanza(262 + 15, 128, -0.1, 30);
  { const a = t * 0.5, bx = Math.round(200 + Math.cos(a) * 40), by = Math.round(58 + Math.sin(a) * 8), al = Math.sin(t * 3) > 0.6 ? 1 : 0; R.linea(bx - 7, by - al, bx - 1, by, hex('#2a1e24')); R.linea(bx + 1, by, bx + 7, by - al, hex('#2a1e24')); R.rect(bx - 1, by, bx + 1, by + 1, hex('#3a2a30')); }
  // el cazador «tú» sube y se para; Atom a su lado
  const va = ease(tramo(t, P2, hunter + 0.2)), hx = Math.round(lerp(96, 150, va)), anda = va > 0 && va < 1;
  if (t > hunter - 0.1 && t < bare) T.AT.anillo(R, hx + 7, 140, 16, 6, t, tramo(t, hunter - 0.1, hunter + 0.5));
  const clava = t > bare - 0.05, señala = t > southeast;
  const c = R.actor(T.GB.cazadorGB, hx, 152, t, { dir: 1, anda, sostiene: señala ? null : clava ? [hx + 18, 140] : true, dedo: señala, sonrisa: clava && !señala, sorpresa: t > yourself && t < hunter + 0.6 });
  if (!señala && c && c.mano) lanza(c.mano[0], c.mano[1], clava ? 0 : 0.25, 34); else if (señala) lanza(hx + 19, 150, 0.02, 34);
  T.AT.atom(R, 58, 156, t, { dir: 1, pose: t < yourself + 1.4 ? 'senala' : señala ? 'saluda' : 'quieto', cara: t > bare ? 'sonrisa' : 'normal', habla: t < hunter + 0.5 ? voz(t) : 0 });
  if (t > n11) cifra('11600', 160, 76, tramo(t, n11, n11 + 0.4), { tam: 16 });
  if (señala) { const u = tramo(t, southeast, southeast + 0.6); for (let i = 0; i < Math.round(u * 50); i += 3) tine(178 + i * 1.4, 128 - i * 0.6, hex('#fff0c0'), 0.8); }
};

// ── 3 · la cantera: tirar de la cuerda de cuero ──────────────────────────────────────────────────────────────────
const p3 = (t) => {
  const o = { encuadre: 'cantera', camara: 'troncos' };
  const g = T.neolitico(R, t, o) || {};
  const tir = g.tiron || 0, [cx, cy] = g.cuerda || [200, 120];
  // tú, al final de la cuerda, de espaldas a la marcha (miras al pilar) y Atom detrás, en la cola
  const yx = Math.round(Math.min(222, cx + 26) + tir * 2), ys = 158;
  const hand = [yx - 1, ys - 13];
  cuerda(cx, cy, hand[0], hand[1], 3);
  R.actor(T.GB.cazadorGB, yx, ys, t, { dir: -1, sostiene: hand, enfado: tir > 0.3, anda: tir > 0.2 });
  const ax = yx + 30, ar = T.AT.atom(R, ax, ys + 2, t, { dir: -1, pose: 'sostiene', cara: tir > 0.4 ? 'sorpresa' : 'normal', habla: 0 });
  const am = ar && ar.mano ? ar.mano.map(Math.round) : [ax - 6, ys - 8];
  cuerda(hand[0] + 2, hand[1] + 1, am[0], am[1], 2); cuerda(am[0], am[1], am[0] + 22, ys + 6, 1);
  // el brillo que recorre la cuerda en «leather rope»
  if (t > leather && t < leather + 0.9) { const u = tramo(t, leather, leather + 0.9); const x = lerp(hand[0], cx, u), y = lerp(hand[1], cy, u); halo(x, y, 8, hex('#ffe8a0'), 0.8); chispas(x, y, t, 4, 5, hex('#ffe8a0'), 3); }
  // «30» sobre la fila de los que tiran, con su llave
  const [px0, py0, px1, py1] = g.pilar || [60, 99, 144, 118];
  if (t > n30) { const u = tramo(t, n30, n30 + 0.35), x0 = px1 + 10, x1 = px1 + 74; for (let x = x0; x <= lerp(x0, x1, u); x++) R.pset(x, 96, x % 2 ? ORO[2] : ORO[1]); R.rect(x0, 96, x0, 99, ORO[2]); if (u >= 1) R.rect(x1, 96, x1, 99, ORO[2]); cifra('30', (x0 + x1) >> 1, 92, u, { tam: 16 }); }
  // el pilar en T se enciende en «T-shaped stone»
  if (t > tshape - 0.1) { const a = cl(1 - (t - tshape - 0.6) / 1.2); if (a > 0) { for (let x = px0; x <= px1; x++) { tine(x, py0 - 1, hex('#fff0b0'), 0.8 * a); tine(x, py0, hex('#fff0b0'), 0.5 * a); } halo((px0 + px1) >> 1, (py0 + py1) >> 1, 40, hex('#fff0b0'), 0.35 * a); chispas(px1 - 8, py0 + 4, t, 6, 14, hex('#fff0b0'), 4); } }
  T.neoliticoDelante(R, t, o);
};

// ── 4 · el patio del recinto (fondo local): más alto que dos hombres, más pesado que un coche ─────────────────────
const PATIO = () => capa('patio', () => {
  const SK = pal('#4a66a8', '#6a86c0', '#8eaad0', '#c8c8c8', '#f0d4a8');
  for (let y = 0; y < 90; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(SK, (y / 80) * 3.6 + Math.max(0, 1 - Math.hypot(x - 20, y - 80) / 140) * 0.8 + hh(x >> 2, y >> 1) * 0.2, x, y));
  for (let x = 0; x < 320; x++) { const h = 62 + Math.sin(x * 0.03) * 3 + hh(x >> 3, 3) * 2; for (let y = Math.round(h); y < 90; y++) R.pset(x, y, tono(pal('#8a7a8a', '#9a8a90', '#b09a90'), 1 + (y - h) / 10 + hh(x, y >> 1) * 0.4, x, y)); }
  // el muro del anillo en arco, a hiladas de piedra seca (luz de la izquierda)
  const top = (x) => 64 + Math.pow((x - 160) / 160, 2) * 16, bot = (x) => 118 + Math.pow((x - 160) / 160, 2) * 10;
  const PIE = pal('#5a4a38', '#7e6a50', '#a08a68', '#c4ae88', '#ddcaa4');
  for (let x = 0; x < 320; x++) { const t0 = top(x), b0 = bot(x); for (let y = Math.round(t0); y < b0; y++) { const fila = Math.floor((y - t0) / 5), off = (fila * 7) % 13, piedra = Math.floor((x + off) / (9 + (fila % 3) * 3));
    const junta = (y - t0) % 5 < 1 || (x + off) % (9 + (fila % 3) * 3) === 0, v = hh(piedra, fila, 8);
    R.pset(x, y, junta ? PIE[0] : tono(PIE, 1.6 + v * 1.6 + (x < 160 ? 0.4 : -0.2) - ((y - t0) % 5 === 4 ? 0.8 : 0) + ((y - t0) % 5 === 1 ? 0.5 : 0), x, y)); }
    for (let y = Math.round(b0) - 6; y < b0; y++) R.pset(x, y, tono(PIE, 2.4 + (y === Math.round(b0) - 6 ? 1.2 : 0) - (y > b0 - 2 ? 1 : 0) + hh(x >> 2, y) * 0.4, x, y)); }
  // pilares del anillo empotrados en el muro
  for (const [x, rel] of [[28, ['jabali']], [86, ['serpientes']], [244, ['grulla']], [298, ['escorpion']]]) T.d_pilar(R, x, Math.round(bot(x)) - 6, { escala: 0.85, brazos: false, relieves: rel, luz: 0.6, sem: x });
  // el suelo de cal apisonada, con guijarros, lascas, cestas y montones de cascotes
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < bot(x)) continue; const p = (y - 118) / 62;
    R.pset(x, y, tono(pal('#8a6a4a', '#a88660', '#c4a47a', '#dcc296', '#ecdab0'), 3.2 - p * 1.4 + hh(x >> 1, y >> 1, 3) * 0.8 + (hh(x >> 4, y >> 3, 5) > 0.75 ? -0.7 : 0), x, y)); }
  for (let k = 0; k < 140; k++) { const x = Math.round(hh(k, 31) * 320), y = Math.round(124 + hh(k, 32) * 56), r = hh(k, 33);
    if (r > 0.7) { R.rect(x, y, x + 2, y + 1, hex('#8a7a5a')); R.pset(x, y, hex('#e8dcc0')); R.pset(x + 1, y + 2, hex('#6a5a40')); } else if (r > 0.4) { R.pset(x, y, hex('#3a3a46')); R.pset(x + 1, y, hex('#9a9aa8')); } else R.pset(x, y, hex('#7a5a3a')); }
  for (const [x, y] of [[262, 136], [100, 132]]) { for (let j = 0; j < 7; j++) for (let i = -8 + j; i <= 8 - j; i++) R.pset(x + i, y - j, tono(PIE, 1.5 + hh(i, j, x) * 1.8 + (i < 0 ? 0.5 : 0), x + i, y - j)); }
  // un montón de cascotes, percutores y lascas junto al muro, y otra cesta
  for (let k = 0; k < 40; k++) { const a = hh(k, 81) * 3.14, d = hh(k, 82), x = Math.round(196 + Math.cos(a) * d * 26), y = Math.round(132 - Math.sin(a) * d * 9), r = 1 + Math.round(hh(k, 83) * 2); R.disco(x, y, r + 1, PIE[0]); R.disco(x, y, r, PIE[1 + Math.floor(hh(k, 84) * 3)]); R.pset(x - 1, y - r, PIE[4]); }
  for (const [x, y] of [[176, 170], [120, 166], [228, 160]]) { R.disco(x, y, 3, hex('#4a4a52')); R.disco(x - 1, y - 1, 2, hex('#7a7a86')); R.pset(x - 2, y - 2, hex('#c8c8d0')); for (let i = -6; i <= 6; i++) tine(x + i + 3, y + 3, K, 0.3); }
  for (let j = 0; j < 9; j++) for (let i = -8 + (j < 2 ? 1 : 0); i <= 8 - (j < 2 ? 1 : 0); i++) R.pset(96 + i, 152 - j, j === 8 ? hex('#5a3a1a') : (i + j) % 2 ? hex('#8a6a3a') : hex('#b08a4a'));
  for (const i of [-4, 0, 4]) { R.disco(96 + i, 142, 2, hex('#c4ae88')); R.pset(95 + i, 141, hex('#ece0c4')); }
  // una cesta de piedras
  for (let j = 0; j < 8; j++) for (let i = -7; i <= 7; i++) R.pset(298 + i, 172 - j, (i + j) % 2 ? hex('#8a6a3a') : hex('#b08a4a')); R.rect(291, 164, 305, 165, hex('#5a3a1a'));
  for (const [i, c] of [[-4, '#c4ae88'], [0, '#a08a68'], [4, '#ddcaa4']]) R.disco(298 + i, 163, 2, hex(c));
});
const coche = (x, y, a) => {   // el coche fantasma: silueta de un turismo de hoy en trazo claro y tramado (~44 × 16)
  if (a <= 0) return; const C = hex('#e8f4ff'), C2 = hex('#7ab0e8'), L = [[0, 14], [2, 9], [10, 8], [16, 2], [30, 2], [37, 8], [43, 9], [44, 14]];
  for (let j = 3; j <= 13; j++) for (let i = 1; i <= 43; i++) { const dentro = (j > 8) || (j > 2 && i > 16 - (j - 2) && i < 30 + (j - 2) * 1.0); if (dentro) tine(x + i, y + j, ((i + j) & 1) ? C2 : C, (j > 3 && j < 8 && i > 18 && i < 34 ? 0.25 : 0.5) * a); }
  for (let k = 0; k < L.length - 1; k++) for (const d of [0, 1]) R.linea(x + L[k][0], y + L[k][1] + d, x + L[k + 1][0], y + L[k + 1][1] + d, mez(R.pget(x + L[k][0], y + L[k][1]), d ? C2 : C, a));
  R.linea(x, y + 14, x + 44, y + 14, mez(R.pget(x + 20, y + 14), C, a));
  for (const wx of [10, 34]) { for (let s = 0; s < 6.28; s += 0.25) tine(x + wx + Math.cos(s) * 4, y + 14 + Math.sin(s) * 4, C, a); tine(x + wx, y + 14, C, a); }
  R.linea(x + 23, y + 3, x + 23, y + 8, mez(R.pget(x + 23, y + 5), C, a * 0.8));
};
const p4 = (t) => {
  R.copiar(PATIO());
  cielo3(t, 8, 46, pal('#a8b0c8', '#e8e0e0', '#fff8f0'), 4, 6);
  pajaros(t, 30, 5, 9, 5, hex('#2a2a3a'));
  // un porteador diminuto con su cesto va y viene por lo alto del muro
  { const u = (Math.sin(t * 0.45) + 1) / 2, x = Math.round(lerp(196, 300, u)), y = Math.round(64 + Math.pow((x - 160) / 160, 2) * 16) - 1, b = Math.floor(t * 6) % 2;
    R.rect(x - 1, y - 7, x + 1, y - 3, hex('#7a5030')); R.rect(x - 1, y - 9, x + 1, y - 8, hex('#c89070')); R.rect(x - 3, y - 12, x + 3, y - 10, hex('#a07840')); R.pset(x - 1 + b, y - 2, hex('#3a2418')); R.pset(x + 1 - b, y - 1, hex('#3a2418')); R.pset(x - 1 + b, y - 1, hex('#3a2418')); }
  // la hoguera con su humo (x 40, y 142)
  for (let k = 0; k < 12; k++) { const u = ((t * 0.35 + k / 12) % 1); tine(40 + Math.sin(u * 6 + t) * 3 + u * 8, 136 - u * 50, hex('#c8c0c0'), 0.5 * (1 - u)); }
  R.rect(32, 143, 48, 145, hex('#4a2e18')); R.linea(32, 145, 48, 141, hex('#6a4428'));
  for (let k = 0; k < 6; k++) { const f = Math.sin(t * 13 + k * 2) * 2; R.poligono([[34 + k * 2, 143], [36 + k * 2 + f * 0.5, 134 - (k % 3) * 2 + f], [38 + k * 2, 143]], k % 2 ? hex('#ffb040') : hex('#ff7020')); }
  halo(40, 138, 22, hex('#ffb060'), 0.3);
  // el pilar: inclinado sobre su castillete; sube a tirones desde «rises» hasta su base en «base»
  const u = tramo(t, rises - 0.15, baseW), paso = Math.floor(u * 4), sub = u >= 1 ? 1 : (paso + ease(cl((u * 4 - paso) * 1.8))) / 4;
  const inc = 30 * (1 - sub), BX = 140, BY = 156;
  if (inc > 2) {   // el castillete de troncos donde apoya la cabeza
    const hx = BX + Math.sin(inc * Math.PI / 180) * 112, hy = BY - Math.cos(inc * Math.PI / 180) * 112;
    for (const [dx, c] of [[-6, '#5a3a20'], [6, '#7a5434']]) { R.linea(Math.round(hx + dx), Math.round(hy + 4), Math.round(hx + dx + 10), BY, hex(c)); R.linea(Math.round(hx + dx + 1), Math.round(hy + 4), Math.round(hx + dx + 11), BY, hex('#a07848')); }
    for (let y = Math.round(hy + 18); y < BY; y += 14) R.linea(Math.round(hx - 4 + (y - hy) * 0.1), y, Math.round(hx + 16 + (y - hy) * 0.1), y, hex('#6a4428'));
  }
  const pil = T.d_pilar(R, BX, BY, { escala: 2, inclinado: inc, luz: 0.9, sem: 7, relieves: ['zorro'] }) || {};
  if (t > baseW - 0.05) polvo(BX, BY - 2, 46, tramo(t, baseW - 0.05, baseW + 1));
  // los tres de la cuerda, a la izquierda: tiran a tirones desde «rises»
  const nx = BX + Math.sin(inc * Math.PI / 180) * 92, ny = BY - Math.cos(inc * Math.PI / 180) * 92;
  const tira = t > rises - 0.15 && t < baseW + 0.1, yRope = (x) => lerp(ny, 150, (nx - x) / (nx - 4));
  for (let i = 0; i <= 1; i++) cuerda(Math.round(nx), Math.round(ny) + i * 2, 4, 150 + i * 2, 2);
  [14, 38, 62].forEach((x0, k) => { const x = Math.round(x0 - sub * 6), xh = x - 1; R.actor([T.GB.cazadoraGB, T.GB.cazador2GB, T.GB.cazadora2GB][k], x, 158, t, { dir: -1, anda: tira && (u * 4 - paso) < 0.55, sostiene: [xh, Math.round(yRope(xh)) + 2], enfado: tira, sonrisa: t > baseW + 0.2 }); });
  // dos hombres: en «two men» el cazador se sube a la cabeza del otro; las marcas de altura
  const sube = ease(tramo(t, twomen - 0.35, twomen + 0.2)), MX = 226;
  R.actor(T.GB.cazador2GB, MX, 160, t, { dir: -1, enfado: sube > 0.5, sorpresa: sube > 0 && sube < 0.5 });
  const top = R.actor(T.GB.cazadorGB, MX + Math.round((1 - sube) * 22), Math.round(lerp(160, 136, sube)), t, { dir: -1, brazos: sube >= 1 && t < car, anda: sube === 0 && t < twomen - 0.4, sorpresa: t > car && t < rises });
  if (sube >= 1 && t < rises + 0.6) { const a = cl(1 - (t - rises) / 0.6) * tramo(t, twomen + 0.2, twomen + 0.5), yT = 110, yP = Math.round(pil.cabeza ? pil.cabeza[1] : 44);
    for (let x = MX - 6; x < MX + 22; x += 2) tine(x, yT, hex('#ffffff'), a); for (let x = MX - 6; x < MX + 22; x += 2) tine(x, yP, ORO[3], a);
    for (let y = yP; y < 160; y += 3) tine(MX + 24, y, ORO[3], a * 0.8); }
  // el coche fantasma en «car», más pequeño que el pilar
  coche(258, 140, cl(tramo(t, heavier - 0.1, car) * 1) * cl(1 - (t - rises - 0.3) / 0.6));
  if (t > car - 0.1 && t < car + 0.5) chispas(274, 150, t, 6, 18, hex('#e8f4ff'), 6);
};

// ── 5 · la estepa: sin metal, sin ruedas, sin animales de tiro, sin aldea ───────────────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'estepa' };
  T.neolitico(R, t, o);
  // las burbujas, en el cielo de la izquierda, salen y se tachan en su palabra
  [['hacha', metal, 54], ['rueda', wheels, 98], ['buey', animals, 142], ['choza', village, 186]].forEach(([k, w, x]) => {
    burbuja(k, x, 42, tramo(t, w - 0.15, w + 0.2), tramo(t, w + 0.25, w + 0.5)); });
  // los cazadores cruzan por el sendero; el primero eres tú
  const camina = (x0, d) => Math.round(x0 + (t - P5) * 21 - d);
  const encoge = t > gohome - 0.1 && t < gohome + 0.9;
  const yo = camina(70, 0);
  const c = R.actor(T.GB.cazadorGB, yo, 156, t, { dir: 1, anda: !encoge, sostiene: encoge ? null : true, brazos: encoge, sonrisa: encoge });
  if (!encoge && c && c.mano) lanza(c.mano[0], c.mano[1], 0.3, 32);
  const c2 = R.actor(T.GB.cazadoraGB, camina(70, 26), 158, t, { dir: 1, anda: true, sostiene: true, habla: t > village && t < gohome });
  if (c2 && c2.mano) { const [mx, my] = c2.mano; for (let j = 0; j < 6; j++) for (let i = -4; i <= 4; i++) R.pset(mx + i + 2, my - 6 + j, (i + j) % 2 ? hex('#8a6a3a') : hex('#b08a4a')); R.rect(mx - 2, my - 7, mx + 6, my - 7, hex('#5a3a1a')); for (const i of [-1, 2, 5]) R.pset(mx + i, my - 8, hex('#e0c070')); }
  R.actor(T.GB.cazador2GB, camina(70, 52), 154, t, { dir: 1, anda: true, triste: t > animals && t < village });
  T.AT.atom(R, camina(70, 74), 160, t, { dir: 1, pose: 'camina', cara: t > metal && t < village + 0.5 ? 'sorpresa' : 'normal', habla: 0 });
  T.neoliticoDelante(R, t, o);
};

// ── 6 · el pilar central de cerca: brazos, manos y el zorro ─────────────────────────────────────────────────────
const BRAZOS = [[[141, 54], [140, 70], [142, 88], [152, 100], [158, 104]], [[179, 54], [180, 70], [178, 88], [168, 100], [162, 104]]];
const p6 = (t) => {
  const o = { camara: 'pilar', relieve: t > fox - 0.1 ? 'zorro' : undefined };
  T.recinto(R, t, o);
  // la luz que recorre los brazos en «arms»
  if (t > arms - 0.1 && t < hands + 0.4) { const u = tramo(t, arms - 0.1, hands - 0.1);
    const apaga = cl(1 - (t - hands) / 0.5);
    for (const B of BRAZOS) { const n = B.length - 1, f = u * n; let x = B[0][0], y = B[0][1];
      for (let s_ = 0; s_ <= f * 12; s_++) { const g = s_ / 12, i = Math.min(n - 1, Math.floor(g)), r = g - i, X = lerp(B[i][0], B[i + 1][0], r), Y = lerp(B[i][1], B[i + 1][1], r);
        for (const [dx, dy] of [[0, 0], [1, 0], [0, 1]]) tine(X + dx, Y + dy, ORO[2], 0.85 * apaga); tine(X - 1, Y, ORO[3], 0.5 * apaga); x = X; y = Y; }
      halo(x, y, 10, hex('#ffd060'), 0.8 * apaga); R.pset(Math.round(x), Math.round(y), hex('#ffffff')); chispas(x, y, t, 4, 7, ORO[3], 5); } }
  if (t > hands - 0.05) { const a = cl(1 - (t - hands - 0.8) / 1.0); if (a > 0) { halo(160, 104, 18, hex('#ffc850'), 0.75 * a); chispas(160, 104, t, 8, 14, ORO[3], 6); } }
  if (t > fox) { const a = cl(1 - (t - fox - 1.2) / 1.2) * tramo(t, fox, fox + 0.2); halo(160, 76, 20, hex('#ffc850'), 0.7 * a); chispas(160, 75, t, 10, 18, ORO[3], 7); const u = tramo(t, leap - 0.2, leap + 0.6);
    if (u > 0 && u < 1) for (let k = 0; k < 14; k++) { const s = cl(u - k * 0.035); if (s <= 0) continue; const X = lerp(166, 208, s), Y = 72 - Math.sin(s * 3.14) * 16 + s * 56; for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) tine(X + dx, Y + dy, k ? ORO[2] : hex('#ffffff'), 0.95 - k * 0.06); } }
  // el cazador se acerca y lo toca; Atom señala el zorro
  const va = ease(tramo(t, P6 + 0.1, carved)), x = Math.round(lerp(64, 116, va));
  R.actor(T.GB.cazadorGB, x, 150, t, { dir: 1, anda: va > 0 && va < 1, dedo: t > carved && t < hands - 0.1, sostiene: t > hands - 0.1 && t < fox ? [136, 132] : null, sorpresa: t > fox, sonrisa: t > leap });
  T.AT.atom(R, 236, 152, t, { dir: -1, pose: t > fox - 0.2 ? 'senala' : 'quieto', cara: t > fox ? 'sorpresa' : 'normal', habla: 0 });
  T.recintoDelante(R, t, o);
};

// ── 7 · el cerro hoy con la cubierta ──────────────────────────────────────────────────────────────────────────
const piramide = (x, by, a) => { if (a <= 0) return; const h = 30; halo(x, by - 12, 30, ORO[3], 0.3 * a); for (let j = 0; j < h; j++) for (let i = -j - 1; i <= j + 1; i++) { const X = x + i, Y = by - h + j;
  const c = i < 0 ? hex('#f0d890') : hex('#c8a060'); if (((X + Y) & 1) === 0 || Math.abs(i) >= j) tine(X, Y, Math.abs(i) >= j ? hex('#fff4c0') : c, a * (Math.abs(i) >= j ? 0.9 : 0.55)); } };
const p7 = (t) => {
  const o = { encuadre: 'cerro', epoca: 'hoy' };
  T.colina(R, t, o);
  if (t > gobekli - 0.1) T.AT.anillo(R, 166, 72, 74, 26, t, tramo(t, gobekli - 0.1, gobekli + 0.7));
  piramide(48, 66, tramo(t, pyramids - 0.1, pyramids + 0.4));
  if (t > pyramids && t < pyramids + 0.8) chispas(48, 50, t, 8, 20, ORO[3], 8);
  // la pareja de turistas sube por la izquierda; ella hace la foto en «real»
  const va = ease(tramo(t, P7, real - 0.15)), x1 = Math.round(lerp(150, 182, va)), flash = t > real - 0.05 && t < real + 0.2;
  const ch = R.actor(EL.chica, x1, 156, t, { dir: -1, anda: va > 0 && va < 1, sostiene: t > real - 0.5 && t < gobekli ? true : null, sonrisa: t > real + 0.2 });
  if (ch && ch.mano && t > real - 0.5 && t < gobekli) { const [mx, my] = ch.mano; R.rect(mx - 3, my - 3, mx + 2, my + 1, K); R.rect(mx - 2, my - 2, mx + 1, my, hex('#4a4a52')); R.pset(mx - 3, my - 1, hex('#a8d0f0')); }
  if (flash) halo(x1 - 2, 140, 30, hex('#ffffff'), 0.8);
  R.actor(EL.chico, x1 + 18, 154, t, { dir: -1, anda: va > 0 && va < 1, dedo: t > gobekli && t < pyramids });
  T.AT.atom(R, 100, 156, t, { dir: t > pyramids ? -1 : 1, pose: t > real - 0.1 && t < gobekli - 0.2 ? 'saluda' : t > gobekli - 0.2 ? 'senala' : 'quieto', cara: t > pyramids ? 'sonrisa' : 'normal', habla: voz(t) > 0.25 ? voz(t) : 0 });
  T.colinaDelante(R, t, o);
};

// ── 8 · en lo alto del cerro hoy: más antiguo que la escritura, la rueda y el grano ─────────────────────────────────
const tablilla = (x, y, s = 1) => { const W = 6 * s, H = 8 * s; R.rect(x - W, y - H, x + W, y, K); R.rect(x - W + 1, y - H + 1, x + W - 1, y - 1, hex('#b8865a')); R.rect(x - W + 1, y - H + 1, x + W - 1, y - H + 1, hex('#e0b080')); R.rect(x + W - 1, y - H + 2, x + W - 1, y - 1, hex('#8a5e3a')); R.rect(x - W + 1, y - 1, x + W - 1, y - 1, hex('#8a5e3a'));
  for (let j = 0; j < 3 * s; j++) for (let i = 0; i < 4 * s - 1; i++) { const X = x - W + 3 + i * 3, Y = y - H + 3 + j * 2 + (i % 2); if (X > x + W - 3) continue; R.pset(X, Y, hex('#5a3420')); R.pset(X + 1, Y, hex('#7a4e30')); R.pset(X, Y - 1, hex('#e0b080')); } };
const ruedaD = (x, y, r, ang) => { for (let a = 0; a < 6.28; a += 0.05) { R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), K); R.pset(Math.round(x + Math.cos(a) * (r - 1)), Math.round(y + Math.sin(a) * (r - 1)), hex('#a07040')); R.pset(Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), hex('#c89058')); }
  for (let s = 0; s < 3; s++) { const a = ang + s * 1.047; R.linea(Math.round(x - Math.cos(a) * (r - 2)), Math.round(y - Math.sin(a) * (r - 2)), Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), hex('#6a4424')); } R.disco(x, y, 2, hex('#4a2e18')); };
const espigaGorda = (x, y, h) => { for (let k = -2; k <= 2; k++) { const bx = x + k * 3, top = y - h + Math.abs(k) * 2; R.linea(bx, y, bx + Math.round(k * 0.5), top + 8, hex('#a8843a'));
  for (let j = 0; j < 8; j++) { const X = bx + Math.round(k * 0.5) + (j % 2 ? 1 : -1), Y = top + j; R.pset(X, Y, j < 2 ? hex('#fff0a0') : hex('#e0b850')); R.pset(X + (j % 2 ? 1 : -1), Y, hex('#b08a30')); } R.linea(bx, top - 3, bx + 1, top, hex('#f0d890')); } };
const p8 = (t) => {
  const o = { encuadre: 'cerro', camara: 'losas', epoca: 'hoy' };
  T.colina(R, t, o);
  // la tablilla vuela de la mano de Atom a su sitio en «writing»
  const vuela = tramo(t, writing - 0.35, writing + 0.05);
  const ar = T.AT.atom(R, 92, 156, t, { s: 2, dir: 1, pose: t < writing - 0.35 ? 'sostiene' : t < wheel ? 'senala' : t > olderEven - 0.1 ? 'senala' : 'quieto', cara: t > wheel && t < olderEven ? 'sorpresa' : t > olderEven ? 'sonrisa' : 'normal', habla: voz(t) });
  const am = ar && ar.mano ? ar.mano.map(Math.round) : [112, 130];
  if (vuela <= 0) tablilla(am[0] + 3, am[1] + 2);
  else { const x = lerp(am[0] + 3, 186, vuela), y = lerp(am[1] + 2, 166, vuela) - Math.sin(vuela * 3.14) * 22; tablilla(Math.round(x), Math.round(y), vuela >= 1 ? 2 : 1); }
  if (vuela >= 1) polvo(186, 166, 20, tramo(t, writing + 0.05, writing + 0.6));
  // la rueda entra rodando desde la derecha, se para en «wheel» y se queda de pie, cabeceando
  const ru = tramo(t, wheel - 0.7, wheel + 0.1), rx = Math.round(lerp(340, 234, ease(ru)));
  if (ru > 0) { for (let i = -10; i <= 10; i++) tine(rx + i, 167, K, 0.35); ruedaD(rx, 154, 13, -(rx - 340) / 13 + (ru >= 1 ? Math.sin((t - wheel) * 9) * 0.15 * cl(1 - (t - wheel) / 1.2) : 0)); }
  // la espiga gorda brota en «grain»
  const gr = tramo(t, grain - 0.25, grain + 0.2); if (gr > 0) { espigaGorda(282, 167, Math.round(6 + gr * 22)); espigaGorda(290, 167, Math.round(4 + gr * 16)); if (gr < 1) chispas(284, 148, t, 6, 14, ORO[3], 9); }
  // los años de cada cosa, y «11600» sobre la losa enterrada
  const GRIS = pal('#4a4a5a', '#9a9aa8', '#e8e8f0', '#ffffff');
  if (vuela >= 1) cifra('5200', 186, 140, tramo(t, writing, writing + 0.3), { rampa: GRIS });
  if (ru >= 1) cifra('5500', 234, 132, tramo(t, wheel + 0.1, wheel + 0.4), { rampa: GRIS });
  if (gr >= 1) cifra('10500', 284, 132, tramo(t, grain, grain + 0.3), { rampa: GRIS });
  if (t > olderEven) { const a = tramo(t, olderEven, olderEven + 0.4); halo(172, 124, 26, hex('#fff0b0'), 0.4 * a); cifra('11600', 172, 106, a, { tam: 16 }); }
  T.colinaDelante(R, t, o);
};

// ── 9 · el trigal silvestre: empezar a cuidar el trigo ──────────────────────────────────────────────────────────
const p9 = (t) => {
  const o = { encuadre: 'estepa', camara: 'trigo' };
  T.neolitico(R, t, o);
  // el niño cruza corriendo por detrás con un cesto
  const nx = Math.round(lerp(-20, 330, tramo(t, people - 0.6, people + 3.2)));
  const n = R.actor(T.GB.ninoGB, nx, 150, t, { dir: 1, anda: true, sostiene: true, sonrisa: true });
  if (n && n.mano) { const [mx, my] = n.mano; for (let j = 0; j < 5; j++) for (let i = -3; i <= 3; i++) R.pset(mx + i + 2, my - 4 + j, (i + j) % 2 ? hex('#8a6a3a') : hex('#b08a4a')); }
  // la cazadora entra, coge una espiga silvestre en «tend» y en «wild wheat» se le desgrana
  const va = ease(tramo(t, P9 + 0.1, tend - 0.3)), cx = Math.round(lerp(40, 118, va)), coge = t > tend - 0.2;
  const c = R.actor(T.GB.cazadoraGB, cx, 170, t, { dir: 1, anda: va > 0 && va < 1, sostiene: coge ? [cx + 19, 162] : null, sonrisa: coge, sorpresa: t > wild && t < wild + 0.6 });
  if (coge && c && c.mano) { const [mx, my] = c.mano;
    const queda = t > wild ? Math.max(5, 16 - Math.floor((t - wild) * 8)) : 16; halo(mx + 1, my - 13, 14, hex('#fff8d0'), 0.5);
    R.linea(mx, my + 1, mx + 1, my - 4, hex('#7a6a2a')); R.linea(mx + 1, my + 1, mx + 2, my - 4, hex('#b0904a'));
    for (let j = 0; j < queda; j++) { const Y = my - 5 - 16 + j + (16 - queda), sd = j % 2 ? 1 : -1; R.pset(mx + 1 + sd * 3, Y, hex('#5a3a14')); R.pset(mx + 1 + sd, Y, hex('#fff0a0')); R.pset(mx + 1 + sd * 2, Y, hex('#d8a840')); R.pset(mx + 1, Y, hex('#8a6420')); if (j % 3 === 0) R.linea(mx + 1 + sd * 2, Y, mx + 1 + sd * 5, Y - 4, hex('#f0e0a0')); }
    if (t > wild) for (let k = 0; k < 8; k++) { const u = tramo(t, wild + k * 0.1, wild + k * 0.1 + 0.7); if (u <= 0 || u >= 1) continue; const X = mx + 1 + Math.round(Math.sin(k) * 3 + u * (k - 3.5) * 2), Y = Math.round(my - 18 + u * 34); R.pset(X, Y, hex('#e0b850')); R.pset(X, Y + 1, hex('#8a6a2a')); } }
  T.AT.atom(R, 214, 162, t, { dir: -1, pose: t > beginning && t < tend ? 'saluda' : t > wild ? 'senala' : 'quieto', cara: t > wild ? 'sonrisa' : 'normal', habla: 0 });
  T.neoliticoDelante(R, t, o);
};

// ── 10 · el salón de noche con el móvil ─────────────────────────────────────────────────────────────────────────
const corazon = (x, y, c) => { for (const [i, j] of [[-2, -1], [-1, -2], [1, -2], [2, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x, y, c); R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x + 1, y - 1, c); R.pset(x, y + 1, c); };
const p10 = (t) => {
  const o = { encuadre: 'salon', movil: true };
  T.hoy(R, t, o);
  T.AT.atom(R, 248, 150, t, { dir: -1, pose: t > lost ? 'piensa' : 'quieto', cara: t > internet && t < lost ? 'sorpresa' : 'normal', habla: 0 });
  T.hoyDelante(R, t, o);
  // el globo de avisos salta en «internet», con su número que sube
  if (t > internet - 0.05) { const u = tramo(t, internet - 0.05, internet + 0.25), r = Math.round(6 * ease(cl(u)) + (u < 1 ? Math.sin(u * 3.14) * 2 : 0)), n = Math.min(99, Math.floor(12 + (t - internet) * 30));
    R.disco(196, 44, r + 1, K); R.disco(196, 44, r, ROJO[2]); R.disco(195, 43, Math.max(1, r - 3), ROJO[3]); if (u >= 1) R.numero(String(n), 196, 47, { centro: true, rampa: pal('#ffffff', '#ffffff', '#ffffff', '#ffffff') }); }
  // los corazones que suben del lado del móvil
  for (let k = 0; k < 4; k++) { const u = ((t - internet) * 0.6 + k * 0.25) % 1; if (t < internet || u < 0) continue; corazon(Math.round(204 + Math.sin(u * 6 + k) * 3), Math.round(140 - u * 70), u > 0.8 ? ROJO[1] : ROJO[2]); }
  if (t > lost) { const u = tramo(t, lost, lost + 0.25); R.icono('?', 250, Math.round(112 - u * 4), hex('#fff0a0'), K, 2); }
};

// ── 11 · la versión de internet: «lo enterraron a propósito» ───────────────────────────────────────────────────
const p11 = (t) => {
  const o = { encuadre: 'excavacion', camara: 'corte' };
  T.colina(R, t, o);
  T.colinaDelante(R, t, o);
  velo(hex('#1a1040'), 0.5);
  // la tierra nueva que se amontona arriba y los terrones que caen
  const u = tramo(t, buried - 0.1, P11 + 4.2), alto = Math.round(u * 9);
  for (let x = 150; x < 320; x++) { const h = Math.round(alto * (1 - Math.pow((x - 236) / 90, 2)) + hh(x >> 2, 4) * 1.5); for (let y = 0; y < h; y++) R.pset(x, 38 - y, tono(pal('#2a1410', '#3e2018', '#542c20'), 1 + (y === h - 1 ? 1 : 0) + hh(x, y) * 0.6, x, 38 - y)); }
  // dos encapuchados con antorcha vuelcan sus cestos sobre el corte
  const OSC = { C: '#2a2238', c: '#1e1828', M: '#2a2238', m: '#1e1828', H: '#141020', h: '#1e1828' };
  [[208, 0], [244, 0.6]].forEach(([x, d], k) => { const vuelca = Math.sin((t - P11 + d) * 3) > 0, y0 = 38 - Math.round(alto * (1 - Math.pow((x + 7 - 236) / 90, 2)));
    halo(x + (k ? 18 : -4), y0 - 22, 18, hex('#ff9a40'), 0.45);
    const a = R.actor(T.GB.cazador2GB, x, y0, t, { dir: 1, pal: OSC, sostiene: vuelca ? [x + 20, y0 - 18] : [x + 17, y0 - 12], enfado: true });
    if (a && a.mano) { const [mx, my] = a.mano; for (let j = 0; j < 5; j++) for (let i = -3; i <= 3; i++) R.pset(mx + i + 2, my - 3 + j + (vuelca ? -i * 0.4 : 0), (i + j) % 2 ? hex('#4a3420') : hex('#6a4a2a'));
      if (vuelca) for (let q = 0; q < 6; q++) { const f = ((t * 2 + q / 6) % 1); R.disco(Math.round(mx + 6 + f * 6 + q % 2), Math.round(my + f * 22), 1, hex('#5a3020')); } }
    const tx = k ? x - 4 : x + 18; R.linea(tx, y0 - 4, tx, y0 - 16, hex('#4a2e18')); const f = Math.sin(t * 15 + k * 2); R.poligono([[tx - 2, y0 - 16], [tx + Math.round(f), y0 - 23], [tx + 2, y0 - 16]], hex('#ffb040')); R.pset(tx, y0 - 18, hex('#fff0a0')); });
  // la barra de vídeo abajo: la versión de internet
  R.rect(8, 174, 312, 175, hex('#4a4a5a')); const pv = Math.round(lerp(8, 312, tramo(t, P11, P11 + 4.6))); R.rect(8, 174, pv, 175, ROJO[2]); R.disco(pv, 174, 2, ROJO[3]);
  if (t > knew - 0.1) { const a = tramo(t, knew - 0.1, knew + 0.2); halo(120, 98, 30, ROJO[2], 0.35 * a); R.icono('?', 110, Math.round(80 - a * 6), ROJO[3], K, 4); }
};

const año = (t) => t < P7 ? -9600 : t < P9 ? 2026 : t < P10 ? -9600 : 2026;
const efectos = [[0.4, 'carro'], [seis, 'brillo'], [before, 'pop'], [stone, 'boom'], [stone + 0.4, 'publico'],
  [P2 + 0.3, 'pasos'], [n11, 'brillo'], [bare, 'viento'], [P3 + 0.3, 'carro'], [leather, 'brillo'], [n30, 'pop'], [tshape, 'brillo'],
  [twomen - 0.2, 'boing'], [car, 'claxon'], [rises, 'carro'], [baseW, 'avalancha'], [P5 + 0.3, 'pasos'], [metal + 0.25, 'toc'], [wheels + 0.25, 'toc'], [animals + 0.25, 'toc'], [village + 0.25, 'toc'],
  [P6 + 0.3, 'pasos'], [arms, 'brillo'], [fox, 'brillo'], [real, 'flash'], [gobekli, 'brillo'], [pyramids, 'whoosh'],
  [writing + 0.05, 'golpecito'], [wheel - 0.6, 'carro'], [grain, 'brillo'], [olderEven, 'brillo'], [P9 + 0.5, 'viento'], [people, 'pasos'], [wild, 'brillo'],
  [internet, 'bip'], [lost + 0.3, 'whoosh'], [buried, 'chof'], [handsI, 'chof'], [knew, 'trueno']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]], { efectos, año });
''')

E['gb-aviso'] = ('El aviso', '''// GB-AVISO (frase 4). Cinco planos cortados en la voz inglesa:
// 1. (0) la mesa del estudio de cerca: Atom a escala 2 entra con un pilar en T de juguete y lo deja en la mesa en
//    «stones» (polvo); en «really say» el pilar se enciende y Atom lo señala;
// 2. («the way») la maqueta del cerro sobre la mesa (fondo local): con el pilar de juguete en lo alto, caen en «people»,
//    «who» y «stood» tres figuritas de cazadores que lo miran; en «front of them» levantan los brazos;
// 3. («from the archaeologist») la pizarra de cerca (fondo local) con el cerro de tiza: Atom luciérnaga traza a tiza un
//    camino que pasa de largo y el imán del prospector de 1963 lo recorre hasta salirse en «walked right past»; luego
//    traza otro hasta la cima y el imán de Schmidt (1994) se para arriba en «never leave»: tienda y corazón de tiza;
// 4. («And hold on») el estudio entero: Atom en la pizarra dibuja una gran «?» desde «hold» hasta «end»; en «coming back
//    to it» se vuelve, la señala y guiña; el pilar de juguete en la mesa;
// 5. («Why») la piedra del buitre de hoy: Atom al pie piensa en un cazador («hunters») y en una choza que se tacha
//    («village»); en «build something like this» señala el pilar, el buitre se enciende y sale una gran «?».''', AYUDAS + r'''
const pr = (f) => en('pregunta', f);
const stones = pr(0.0925), really = pr(0.1127), A2 = pr(0.1707), people = pr(0.2472), who = pr(0.2598), stood = pr(0.2699), front = pr(0.2952);
const A3 = pr(0.3389), arch = pr(0.3549), walked = pr(0.4179), past = pr(0.4474), toOne = pr(0.4701), never = pr(0.5281), leave = pr(0.5407);
const A4 = pr(0.6197), hold = pr(0.6298), question = pr(0.6702), endW = pr(0.7047), coming = pr(0.756);
const A5 = pr(0.8165), hunters = pr(0.8342), village = pr(0.909), build = pr(0.9258), thisW = pr(0.9797);

// ── 1 · la mesa: el pilar de juguete ─────────────────────────────────────────────────────────────────────────────
const q1 = (t) => {
  const o = { camara: 'mesa' };
  T.estudio(R, t, o);
  const va = ease(tramo(t, 0.15, stones - 0.5)), ax = Math.round(lerp(96, 150, va)), puesto = t > stones - 0.05;
  if (puesto) { T.d_pilar(R, 190, 146, { escala: 1, luz: 0.8, sem: 3, relieves: ['zorro'] }); polvo(190, 146, 14, tramo(t, stones - 0.05, stones + 0.6));
    if (t > really) { const a = cl(1 - (t - really - 1.2) / 1.0); halo(190, 122, 26, hex('#fff0b0'), 0.5 * a); chispas(190, 118, t, 7, 20, ORO[3], 1); } }
  const r = T.AT.atom(R, ax, 150, t, { s: 2, dir: 1, pose: va > 0 && va < 1 ? 'camina' : !puesto ? 'sostiene' : t > really - 0.1 ? 'senala' : 'quieto', cara: t > really ? 'sonrisa' : 'normal', habla: t > really ? voz(t) : 0 });
  if (!puesto && r && r.mano) { const [mx, my] = r.mano.map(Math.round); T.d_pilar(R, mx + 4, my + 12, { escala: 0.6, luz: 0.8, sem: 3, sombra: false, relieves: ['zorro'] }); }
  T.estudioDelante(R, t, o);
};

// ── 2 · la maqueta del cerro sobre la mesa (fondo local) ──────────────────────────────────────────────────────────
const MAQ = () => capa('maq', () => {
  // la pared de ladrillo en penumbra cálida
  for (let y = 0; y < 98; y++) for (let x = 0; x < 320; x++) { const f = y >> 3, j = (x + (f % 2) * 8) % 16 === 0 || y % 8 === 0, l = Math.max(0, 1 - Math.hypot(x - 250, y - 40) / 190);
    R.pset(x, y, j ? hex('#2e1a14') : tono(pal('#4a2418', '#5e2e1e', '#743a26', '#8c4a30', '#a65c3c'), 0.8 + l * 2.6 + hh((x + (f % 2) * 8) >> 4, f) * 0.9, x, y)); }
  // un cuadro del mapa antiguo y una balda con libros
  for (let y = 12; y < 54; y++) for (let x = 30; x < 92; x++) { const m = x < 34 || x > 87 || y < 16 || y > 49; R.pset(x, y, m ? (x === 30 || x === 91 || y === 12 || y === 53 ? K : hex(y < 15 || x < 33 ? '#a8743a' : '#6c4428')) : tono(pal('#a88a5a', '#c4a874', '#dcc496'), 1.4 + hh(x >> 2, y >> 2) * 0.8, x, y)); }
  for (let x = 36; x < 86; x++) { const y = Math.round(32 + Math.sin(x * 0.12) * 8); R.pset(x, y, hex('#6a5a3a')); R.pset(x, y + 1, hex('#8a9ab0')); } R.disco(76, 24, 3, hex('#8a5a3a')); R.linea(73, 24, 79, 24, hex('#c8a870'));
  for (let x = 120; x < 220; x++) { R.pset(x, 58, hex('#a8743a')); R.pset(x, 59, hex('#6c4428')); R.pset(x, 60, K); }
  for (let k = 0, x = 124; x < 214; k++) { const w = 4 + Math.round(hh(k, 41) * 3), h = 14 + Math.round(hh(k, 42) * 8), c = pal('#6a2a2a', '#2a4a6a', '#3a5a3a', '#7a6a2a', '#5a3a5a')[k % 5];
    R.rect(x, 58 - h, x + w - 1, 57, c); R.rect(x, 58 - h, x, 57, mez(c, hex('#ffffff'), 0.3)); R.rect(x, 52 - Math.round(h / 2), x + w - 1, 52 - Math.round(h / 2), ORO[1]); x += w + 1; }
  // la mesa de nogal en perspectiva, con sus vetas
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 98) / 82, tabla = Math.floor((x - 160) / (30 + p * 40) + 20), junta = Math.abs(((x - 160) / (30 + p * 40)) % 1) < 0.03;
    R.pset(x, y, y === 98 ? hex('#c8905a') : junta ? hex('#2a160c') : tono(pal('#3a2214', '#52321e', '#6c4428', '#8a5a36', '#a8744a'), 1.6 + p * 1.4 + Math.sin(x * 0.11 + y * 0.6 + tabla) * 0.4 + hh(tabla, y >> 3) * 0.5 + Math.max(0, 1 - Math.hypot(x - 250, y - 110) / 120) * 1.2, x, y)); }
  // la tabla de la maqueta (óvalo de madera clara) con el cerro de papel maché
  for (let y = 122; y < 172; y++) for (let x = 40; x < 282; x++) { const e = ((x - 160) / 120) ** 2 + ((y - 148) / 24) ** 2; if (e > 1) continue; R.pset(x, y, e > 0.9 ? hex('#5a3a20') : tono(pal('#a8845a', '#c4a070', '#dcbc8a'), 1.4 + (y < 140 ? 0.5 : 0) + hh(x >> 2, y >> 1) * 0.6, x, y)); }
  for (let y = 84; y < 156; y++) for (let x = 60; x < 262; x++) { const top = 100 + Math.pow((x - 160) / 100, 2) * 52; if (y < top || ((x - 160) / 112) ** 2 + ((y - 148) / 20) ** 2 > 1 && y > 140) continue;
    const v = hh(x >> 1, y >> 1, 9), musgo = hh(x >> 3, y >> 2, 12) > 0.7 && hh(x, y, 13) > 0.35, ter = ((y - top) % 9 === 0) && y > top + 3;
    R.pset(x, y, y < top + 1 ? hex('#f0c098') : ter ? hex('#5a3020') : musgo ? tono(pal('#3a5a2a', '#5a7a3a', '#7a9a4a'), 1 + (x - 100) / 120 + v * 0.6, x, y) : tono(pal('#5a3020', '#7a4428', '#9a5a36', '#b87046', '#d08c5c', '#e8b080'), 1.2 + (x - 60) / 202 * 3.4 - (y - top) / 40 + v * 0.6 + ((y - top) % 9 === 1 ? 0.8 : 0), x, y)); }
  // el sendero de puntos blancos que sube por la izquierda, arbolitos de esponja y su sombra
  for (let i = 0; i < 26; i++) { const u = i / 25, x = Math.round(lerp(80, 150, u) + Math.sin(u * 9) * 5), y = Math.round(150 - u * 44); R.pset(x, y, hex('#f0e0c8')); R.pset(x + 1, y, hex('#c8b098')); }
  for (const [x, y] of [[88, 132], [226, 134], [206, 118], [104, 120]]) { for (let i = 0; i < 8; i++) tine(x - 2 - i, y + 1, K, 0.35); R.linea(x, y, x, y - 4, hex('#4a2e18')); R.disco(x, y - 7, 4, hex('#2e4a22')); R.disco(x + 1, y - 8, 3, hex('#4a6a32')); R.pset(x + 2, y - 9, hex('#8aaa5a')); }
  for (const [cx, cy] of [[100, 128], [218, 126], [136, 110], [190, 112]]) { R.rect(cx - 4, cy - 1, cx + 4, cy + 1, hex('#a8946e')); R.rect(cx - 4, cy - 1, cx + 4, cy - 1, hex('#ece0c4')); }
  // el moral de papel a la izquierda de la cima
  R.linea(128, 104, 128, 94, hex('#4a2e18')); R.disco(128, 89, 6, hex('#3a5a2a')); R.disco(126, 87, 4, hex('#5a7a3a')); R.disco(125, 86, 2, hex('#7a9a4a'));
  // cosas de la mesa: lápices, una regla, un tarro de cola con su pincel y recortes de papel
  R.linea(8, 170, 38, 160, hex('#e8c040')); R.linea(8, 171, 38, 161, hex('#a88020')); R.pset(39, 160, hex('#3a3a3a'));
  for (let x = 286; x < 318; x++) { R.pset(x, 168 - (x - 286) * 0.2, hex('#e8dcc0')); R.pset(x, 169 - (x - 286) * 0.2, hex('#a89878')); if (x % 4 === 0) R.pset(x, 167 - (x - 286) * 0.2, K); }
  for (let j = 0; j < 12; j++) for (let i = -6; i <= 6; i++) R.pset(20 + i, 132 + j, Math.abs(i) === 6 ? K : i < -2 ? hex('#e8e8f0') : hex('#c8c8d8')); R.rect(14, 130, 26, 131, hex('#4a4a52')); R.linea(21, 130, 25, 118, hex('#8a5a30'));
  for (const [x, y, w] of [[292, 132, 9], [300, 148, 6], [12, 152, 7]]) for (let j = 0; j < 5; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, (i + j * 2) % 7 ? hex('#f0e8d8') : hex('#c8bca8'));
});
const peana = (x, y) => { for (let i = -6; i <= 6; i++) for (let j = 0; j < 3; j++) R.pset(x + i, y + j, j === 0 ? hex('#a8743a') : Math.abs(i) === 6 || j === 2 ? hex('#3a2214') : hex('#6c4428')); };
const q2 = (t) => {
  R.copiar(MAQ());
  // la luz de la lámpara que tiembla y el vapor de una taza fuera de cuadro
  halo(250, 40, 60, hex('#ffd890'), 0.22 + Math.sin(t * 7) * 0.02);
  for (let k = 0; k < 8; k++) { const u = ((t * 0.4 + k / 8) % 1); tine(306 + Math.sin(u * 7 + t) * 3, 120 - u * 40, hex('#f0e8e0'), 0.45 * (1 - u)); }
  T.d_pilar(R, 160, 100, { escala: 0.9, luz: 0.9, sem: 4, relieves: ['zorro'] });
  if (t > front) halo(160, 76, 24, hex('#fff0b0'), 0.35 * cl((t - front) / 0.4));
  // las figuritas caen en su palabra sobre sus peanas, miran al pilar y en «front» levantan los brazos
  [[T.GB.cazadorGB, 98, 150, people, 1], [T.GB.cazadoraGB, 130, 160, who, 1], [T.GB.cazador2GB, 200, 154, stood, -1]].forEach(([d, x, y, w, dir], k) => {
    const u = tramo(t, w - 0.25, w); if (u <= 0) return; const yy = Math.round(lerp(y - 40, y, u * u) - (u >= 1 ? Math.max(0, Math.sin((t - w) * 18) * 3 * (1 - cl((t - w) / 0.4))) : 0));
    peana(x + 7, y); R.actor(d, x, yy, t, { dir, quieto: t < front, brazos: t > front + k * 0.08, sonrisa: t > front }); if (u >= 1) polvo(x + 7, y + 1, 10, tramo(t, w, w + 0.5)); });
  T.AT.atom(R, 268, 174, t, { s: 2, dir: -1, pose: t < stood + 0.3 ? 'senala' : t > front ? 'brazos' : 'quieto', cara: t > front ? 'sonrisa' : 'normal', habla: voz(t) });
};

// ── 3 · la pizarra de cerca (fondo local): el que pasó de largo y el que se quedó ───────────────────────────────────
const PIZ = () => capa('piz', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = y >> 3, j = (x + (f % 2) * 8) % 16 === 0 || y % 8 === 0;
    R.pset(x, y, j ? hex('#4a2a20') : tono(pal('#6a3424', '#7e3e2a', '#924a32', '#a65a3e'), 1.6 + hh((x + (f % 2) * 8) >> 4, f) * 1.2, x, y)); }
  for (let y = 10; y <= 156; y++) for (let x = 6; x <= 314; x++) { const m = x < 14 || x > 306 || y < 18 || y > 148;
    R.pset(x, y, m ? (x === 6 || x === 314 || y === 10 || y === 156 ? K : tono(pal('#3a2214', '#52321e', '#6c4428', '#8a5a36'), 2 + (y < 14 || x < 10 ? 1 : 0) + Math.sin((x + y) * 0.3) * 0.3, x, y))
      : tono(pal('#1a2a22', '#22342a', '#2a3e32', '#34483a'), 1.5 + hh(x >> 3, y >> 2) * 0.7 + Math.sin(x * 0.05 + y * 0.02) * 0.3, x, y)); }
  for (let k = 0; k < 6; k++) { const cx = 30 + hh(k, 1) * 260, cy = 30 + hh(k, 2) * 100; for (let i = 0; i < 40; i++) tine(cx + i, cy + Math.sin(i * 0.3) * 6 + (i % 5), hex('#8a9a90'), 0.12); }
  for (const [s_, x, y] of [['48', 250, 140], ['7', 280, 66]]) R.numero(s_, x, y, { centro: true, color: hex('#3c5044'), sombra: false });
  // el cerro de tiza con su moral y sus losas
  const TZ = hex('#e8eee4'), TZ2 = hex('#b8c4b8');
  for (let x = 92; x <= 228; x++) { const y = Math.round(126 - Math.sqrt(Math.max(0, 1 - ((x - 160) / 68) ** 2)) * 36); R.pset(x, y, hh(x, 1) > 0.15 ? TZ : TZ2); R.pset(x, y + 1, TZ2); if (x % 7 === 0) for (let j = 2; j < 6; j++) R.pset(x + j, y + j + 2, TZ2); }
  R.linea(150, 90, 150, 80, TZ); for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(150 + Math.cos(a) * 6), Math.round(74 + Math.sin(a) * 5), TZ);
  for (const [x, y] of [[176, 96], [190, 101], [134, 99]]) R.linea(x - 4, y, x + 4, y - 1, TZ2);
  for (let x = 30; x <= 290; x++) if (x % 3) R.pset(x, 128, TZ2);
  // la repisa con tizas y el borrador, y la tarima de abajo
  for (let y = 156; y <= 164; y++) for (let x = 2; x <= 318; x++) R.pset(x, y, y === 156 ? hex('#a8743a') : y === 164 ? K : tono(pal('#3a2214', '#52321e', '#6c4428'), 2 - (y - 156) * 0.2, x, y));
  R.rect(40, 151, 56, 155, hex('#f4f4ee')); R.rect(62, 152, 70, 155, hex('#e8b0b0')); R.rect(268, 148, 298, 155, hex('#6a4a2a')); R.rect(268, 153, 298, 155, hex('#c8c8c0'));
  for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#24140c', '#3a2214', '#52321e'), 1.4 + (x % 24 < 2 ? -1 : 0) + hh(x >> 3, y) * 0.4, x, y));
});
// los dos caminos de tiza: el que pasa de largo por la falda y el que sube a la cima
const CAM1 = (() => { const p = []; for (let i = 0; i <= 60; i++) { const u = i / 60; p.push([24 + u * 280, 120 - Math.sin(u * 3.14) * 4]); } return p; })();
const CAM2 = (() => { const p = []; for (let i = 0; i <= 40; i++) { const u = i / 40; p.push([24 + u * 136, 70 + Math.pow(1 - u, 2) * 10 - Math.sin(u * 3.14) * 10 + u * 14]); } return p; })();
const enCam = (C, u) => { const f = cl(u) * (C.length - 1), i = Math.min(C.length - 2, Math.floor(f)), r = f - i; return [lerp(C[i][0], C[i + 1][0], r), lerp(C[i][1], C[i + 1][1], r)]; };
const iman = (def, x, y, t, o, col) => { R.disco(x + 7, y + 1, 4, K); R.disco(x + 7, y + 1, 3, col); R.pset(x + 6, y, hex('#ffffff')); R.actor(def, x, y - 1, t, o); };
const q3 = (t) => {
  R.copiar(PIZ());
  const TZ = hex('#e8eee4');
  // el camino 1 lo traza Atom deprisa; el prospector lo recorre y sale por la derecha
  const d1 = tramo(t, A3 + 0.05, walked), m1 = tramo(t, arch, past + 0.5);
  for (let i = 0; i < Math.round(d1 * 60); i += 2) { const [x, y] = CAM1[i]; R.pset(Math.round(x), Math.round(y), TZ); R.pset(Math.round(x) + 1, Math.round(y), TZ); }
  if (d1 >= 1) { R.linea(300, 116, 304, 120, TZ); R.linea(300, 124, 304, 120, TZ); }
  cifra('1963', 66, 112, tramo(t, arch, arch + 0.3), { rampa: pal('#8a9a90', '#c8d0c8', '#eef2e8', '#ffffff') });
  const [px, py] = enCam(CAM1, ease(m1));
  if (m1 > 0) iman(T.GB.prospectorGB, Math.round(px) - 7, Math.round(py) - 1, t, { dir: 1, anda: m1 < 1, sonrisa: m1 > 0.6 }, ROJO[2]);
  // el camino 2 sube a la cima; Schmidt se para arriba en «never leave»: su tienda y un corazón de tiza
  const d2 = tramo(t, past - 0.1, toOne + 0.4), m2 = tramo(t, toOne, never);
  for (let i = 0; i < Math.round(d2 * 40); i += 2) { const [x, y] = CAM2[i]; R.pset(Math.round(x), Math.round(y), TZ); R.pset(Math.round(x), Math.round(y) + 1, TZ); }
  cifra('1994', 52, 66, tramo(t, toOne, toOne + 0.3), { rampa: pal('#8a9a90', '#c8d0c8', '#eef2e8', '#ffffff') });
  if (m2 > 0) { const [sx, sy] = enCam(CAM2, ease(m2)); iman(T.GB.schmidtGB, Math.round(sx) - 7, Math.round(sy) + 1, t, { dir: 1, anda: m2 < 1, sonrisa: t > leave }, hex('#4a8ac8')); }
  if (t > never) { const u = tramo(t, never, never + 0.5), n = Math.round(u * 20);   // la tienda de tiza junto a la cima
    const L = [[176, 90], [186, 76], [196, 90], [176, 90]]; let k = 0; for (let s = 0; s < 3; s++) for (let i = 0; i <= 8; i++, k++) { if (k > n) break; const [x0, y0] = L[s], [x1, y1] = L[s + 1]; R.pset(Math.round(lerp(x0, x1, i / 8)), Math.round(lerp(y0, y1, i / 8)), TZ); } }
  if (t > leave) { const u = tramo(t, leave, leave + 0.3), y = Math.round(58 - u * 4); for (const [i, j] of [[-3, -1], [-2, -2], [-1, -2], [0, -1], [1, -2], [2, -2], [3, -1], [-3, 0], [3, 0], [-2, 1], [2, 1], [-1, 2], [1, 2], [0, 3]]) { R.pset(161 + i, y + j, hex('#f0a0a0')); } chispas(161, y, t, 4, 8, hex('#ffd0d0'), 2); }
  // Atom luciérnaga va por delante, trazando
  let ax, ay; if (t < walked) [ax, ay] = enCam(CAM1, d1); else if (t < toOne + 0.4) [ax, ay] = enCam(CAM2, d2); else { ax = 240; ay = 60 + Math.sin(t * 2) * 3; }
  T.AT.luciernaga(R, Math.round(ax), Math.round(ay) - 10, t, { dir: t < walked ? 1 : t < toOne + 0.4 ? 1 : -1, brillo: 0.9, cara: t > leave ? 'sonrisa' : 'normal' });
};

// ── 4 · el estudio entero: la gran «?» en la pizarra ─────────────────────────────────────────────────────────────
const SIG = (() => { const p = [], cx = 166, cy = 50; for (let i = 0; i <= 30; i++) { const a = Math.PI * (1.1 - i / 30 * 1.55); p.push([cx + Math.cos(a) * 14, cy - Math.sin(a) * 13]); }
  const [lx, ly] = p[p.length - 1]; for (let i = 1; i <= 8; i++) p.push([lerp(lx, cx, i / 8), lerp(ly, 76, i / 8)]); return p; })();
const q4 = (t) => {
  const u = tramo(t, hold, endW), luz = t > coming ? 1 : 0;
  const pizarra = (R, t, [x0, y0, x1, y1]) => {
    // el pilar de tiza pequeño a la izquierda
    const TZ = hex('#e8eee4'); R.linea(124, 44, 140, 44, TZ); R.linea(124, 45, 140, 45, TZ); R.linea(130, 46, 130, 80, TZ); R.linea(134, 46, 134, 80, TZ); R.linea(126, 81, 138, 81, TZ);
    for (let k = 0; k < 4; k++) R.pset(132, 52 + k * 6, hex('#b8c4b8'));
    const n = Math.round(u * (SIG.length - 1)), C = luz ? ORO[3] : TZ, C2 = luz ? ORO[2] : hex('#c8d0c0');
    for (let i = 1; i <= n; i++) { const [a, b] = SIG[i - 1], [c, d] = SIG[i]; for (let w = -1; w <= 1; w++) R.linea(Math.round(a + w), Math.round(b), Math.round(c + w), Math.round(d), w ? C2 : C); }
    if (u >= 1) R.disco(166, 84, 2, C);
  };
  const o = { pizarra };
  T.estudio(R, t, o);
  T.d_pilar(R, 244, 134, { escala: 0.45, luz: 0.8, sem: 3 });
  if (luz) { halo(166, 64, 34, hex('#ffd860'), 0.35 * cl(1 - (t - coming) / 1.6) + 0.1); chispas(166, 62, t, 8, 28, ORO[3], 3); }
  T.estudioDelante(R, t, o);
  // Atom luciérnaga sube a la pizarra, va con la punta de la tiza y, en «coming back», baja delante y guiña
  const n = Math.round(u * (SIG.length - 1)), [px, py] = SIG[n], vuelve = t > coming - 0.2;
  let ax, ay; if (t < hold) { const v = ease(tramo(t, A4, hold)); ax = lerp(250, 166, v); ay = lerp(140, 40, v); } else if (!vuelve) { ax = u >= 1 ? 186 : px + 6; ay = u >= 1 ? 74 : py - 4; }
  else { const v = ease(tramo(t, coming - 0.2, coming + 0.4)); ax = lerp(186, 210, v); ay = lerp(74, 112, v); }
  if (u > 0 && u < 1) for (let k = 0; k < 4; k++) tine(px + hh(k, Math.floor(t * 20)) * 6 - 3, py + 2 + k * 2, hex('#f4f4ee'), 0.7);
  T.AT.luciernaga(R, Math.round(ax), Math.round(ay + Math.sin(t * 3) * 1.5), t, { dir: vuelve ? -1 : 1, brillo: 0.9, cara: t > coming + 0.2 ? 'guino' : 'normal' });
};

// ── 5 · la piedra del buitre: ¿por qué unos cazadores sin aldea levantarían esto? ──────────────────────────────────
const q5 = (t) => {
  const o = { encuadre: 'buitre' };
  T.hoy(R, t, o);
  if (t > thisW - 0.2) { const a = tramo(t, thisW - 0.2, thisW + 0.2); halo(140, 86, 40, hex('#fff0b0'), 0.4 * a); chispas(140, 86, t, 8, 30, ORO[3], 4); }
  const señala = t > build - 0.1;
  T.AT.atom(R, 52, 152, t, { s: 2, dir: 1, pose: señala ? 'senala' : 'piensa', cara: señala ? 'sorpresa' : 'normal', habla: voz(t) });
  // lo que piensa: un cazador (la lanza) y una choza que se tacha
  if (t > hunters - 0.1 && t < build + 0.3) { const u = tramo(t, hunters - 0.1, hunters + 0.2); for (const [dx, dy, r] of [[-2, 18, 2], [2, 10, 3]]) { R.disco(64 + dx, 86 + dy, r + 1, K); R.disco(64 + dx, 86 + dy, r, hex('#f8f0dc')); }
    burbuja(t < village - 0.1 ? 'lanza' : 'choza', 74, 76, u, t > village ? tramo(t, village + 0.1, village + 0.4) : 0, 15); }
  if (t > build) { const a = tramo(t, build, build + 0.3); R.icono('?', 248, Math.round(64 - a * 6), ORO[3], K, 4); halo(258, 74, 24, ORO[2], 0.25 * a); }
  T.hoyDelante(R, t, o);
};

const año = 2026;
const efectos = [[0.3, 'pasos'], [stones, 'golpecito'], [really, 'brillo'], [people, 'toc'], [who, 'toc'], [stood, 'toc'], [front, 'palmada'],
  [A3 + 0.1, 'lapiz'], [walked, 'pasos'], [toOne + 0.1, 'lapiz'], [leave, 'brillo'], [hold, 'lapiz'], [coming, 'brillo'], [village + 0.1, 'toc'], [build, 'pop'], [thisW, 'brillo']];
T.rodar(E, R, [[0, q1], [A2, q2], [A3, q3], [A4, q4], [A5, q5]], { efectos, año });
''')
