E = {}

# utilidades comunes de las dos escenas (sin redeclarar tramo, lerp, hex, E, R, M ni en)
PRE = r'''
const C = T.C;
const H = (s) => hex(s);
const cols = (...a) => a.map(hex);
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const suave = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(f * (cs.length - 1) + bay(x, y))))];
const tranquila = (x, y) => (x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 22);
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
const cieloT = (y0, y1, cs, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cs, f, x, y)); } };
const BOLAS = [[0, 0, 0.5], [-0.3, 0.1, 0.32], [0.32, 0.08, 0.34], [-0.1, -0.2, 0.3], [0.16, -0.14, 0.3], [0.44, 0.16, 0.2]];
const nube = (cx, cy, w, cs, masc = null) => {
  const h = Math.max(4, w * 0.36);
  for (let y = Math.floor(cy - h); y <= cy + h * 0.5; y++) for (let x = Math.floor(cx - w * 0.62); x <= cx + w * 0.62; x++) {
    if (x < 0 || x > 319 || y < 0 || tranquila(x, y)) continue;
    if (masc && masc(x, y)) continue;
    let d = 9; for (const [bx, by, r] of BOLAS) { const dx = (x - (cx + bx * w)) / (r * w), dy = (y - (cy + by * w)) / (r * w * 0.7); d = Math.min(d, dx * dx + dy * dy); }
    if (d > 1 || y > cy + h * 0.45) continue; if (d > 0.8 && bay(x, y) < 0.5) continue;
    const v = (y - (cy - h)) / (h * 1.45); R.pset(x, y, y > cy + h * 0.32 ? cs[2] : tono(cs, v, x, y));
  }
};
const nubes = (t, lista, cs, masc = null) => { for (const [x0, y, w, v] of lista) nube(((x0 + t * v) % 440 + 440) % 440 - 60, y, w, cs, masc); };
const pajaro = (x, y, t, c) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y) || x < 2 || x > 317) return; const a = Math.floor(t * 7 + x * 0.3) % 2; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + 2 * a, c); R.pset(x + 2, y - 1 + 2 * a, c); };
const madera = (x0, y0, x1, y1, cs, alto = 14, sem = 0) => {
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), yy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const g = Math.sin(x * 0.06 + tabla * 3.1 + Math.sin(x * 0.017 + tabla * 1.7) * 3 + yy * 0.75 + sem);
      let c = cs[1]; if (g > 0.88) c = cs[0]; else if (g < -0.86) c = cs[2]; if (hs(x, y, sem) > 0.95) c = mez(c, cs[0], 0.5);
      if (yy === alto - 1) c = cs[0]; if (yy === 0) c = mez(c, cs[2], 0.4); R.pset(x, y, c); } }
};
// madera en tablas verticales (forro, puertas)
const maderaV = (x0, y0, x1, y1, cs, ancho = 10, sem = 0) => {
  for (let x = x0; x <= x1; x++) { const tabla = Math.floor((x - x0) / ancho), xx = (x - x0) % ancho;
    for (let y = y0; y <= y1; y++) { const g = Math.sin(y * 0.07 + tabla * 2.3 + Math.sin(y * 0.02 + tabla) * 3 + xx * 0.8 + sem);
      let c = cs[1]; if (g > 0.9) c = cs[0]; else if (g < -0.88) c = cs[2]; if (hs(x, y, sem + 3) > 0.96) c = mez(c, cs[0], 0.5);
      if (xx === ancho - 1) c = cs[0]; if (xx === 0) c = mez(c, cs[2], 0.5); R.pset(x, y, c); } }
};
// agua con rizos por fila (cs de lejos a cerca), brillos que corren y reflejos
const agua = (t, y0, y1, cs, x0 = 0, x1 = 319, vel = 1, masc = null) => {
  const L = mez(cs[0], H('#ffffff'), 0.5);
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), k = 0.25 + f * 0.6;
    for (let x = x0; x <= x1; x++) { if (masc && masc(x, y)) continue;
      const w = Math.sin(x * k * 0.5 + y * 1.9 + t * 2.2 * vel) + Math.sin(x * k * 0.21 - y * 0.7 - t * 1.3 * vel) * 0.7;
      let c = tono(cs, f + w * 0.06, x, y); if (w > 1.45) c = L; else if (w < -1.5) c = cs[cs.length - 1]; R.pset(x, y, c); } }
};
// el bergantín de perfil (canon): x, y = centro de la flotación; s escala (1 ≈ 116 px de eslora); o.dir, o.rot (giro
// en el plano), o.casco 'negro' | 'madera', o.velas 0–1 (0 aferradas), o.roto (mastelero partido y vela rota),
// o.fuera 0–1 (lo que asoma de la obra viva, varado), o.t para lo que flamea, o.agua (y del agua para cortar)
const bergantin = (x, y, s, o = {}) => {
  const dir = o.dir ?? 1, rot = o.rot ?? 0, cr = Math.cos(rot), sr = Math.sin(rot), t = o.t ?? 0;
  const P = (u, v) => [Math.round(x + dir * (u * cr - v * sr) * s), Math.round(y - (u * sr + v * cr) * s * (dir > 0 ? 1 : 1))];
  const Pd = (u, v) => { const [a, b] = P(u, v); return [a, b]; };
  const pol = (pts, c) => R.poligono(pts.map(([u, v]) => Pd(u, v)), c);
  const lin2 = (u0, v0, u1, v1, c) => { const [a, b] = Pd(u0, v0), [d, e] = Pd(u1, v1); R.linea(a, b, d, e, c); };
  const negro = o.casco !== 'madera';
  const K = H('#120e10'), CA = negro ? H('#1c1a20') : H('#a8794a'), CL = negro ? H('#3a3844') : H('#c8965a'), CS = negro ? H('#0e0c10') : H('#7a5232');
  const fuera = o.fuera ?? 0;
  // la obra viva roja (solo si asoma)
  if (fuera > 0) pol([[-54, 1], [54, 1], [48, -8 * fuera], [-48, -8 * fuera]], H('#8a2a22'));
  // el casco
  pol([[-58, 15], [-56, 0], [-48, -2], [50, -2], [57, 6], [62, 17], [40, 15], [0, 13], [-30, 14]], K);
  pol([[-56, 14], [-54, 1], [-47, -1], [49, -1], [55, 6], [60, 16], [40, 14], [0, 12], [-30, 13]], CA);
  for (let v = 3; v <= 11; v += 3) lin2(-53, v, 54, v + (v > 8 ? 1 : 0), CS);
  lin2(-55, 12, 58, 14, negro ? H('#f2eee2') : H('#e0b880'));   // la franja blanca
  lin2(-54, 6, 54, 6, CL);
  // la caseta y la regala
  pol([[-50, 14], [-50, 19], [-34, 19], [-34, 14]], negro ? H('#d8c8a0') : H('#b08050'));
  for (const u of [-46, -40]) { const [a, b] = Pd(u, 17); R.pset(a, b, H('#5a7a9a')); R.pset(a + 1, b, H('#5a7a9a')); }
  lin2(-56, 16, 60, 18, K);
  // bauprés
  lin2(60, 17, 84, 26, H('#5a4028')); lin2(60, 16, 84, 25, H('#8a6a48'));
  const palo = (u, alto, vergas) => {
    lin2(u, 14, u, alto, H('#3a2a1c')); lin2(u + 1, 14, u + 1, alto - 4, H('#7a5a3a'));
    if (o.roto && u > 0) return;
    lin2(u, alto, -56 + (u > 0 ? 40 : 0), 16, H('#4a4048')); lin2(u, alto, 84, 26, H('#4a4048'));
    for (const [h, w] of vergas) { lin2(u - w, h, u + w, h, H('#3a2a1c'));
      const vel = o.velas ?? 0;
      if (vel > 0.05) { const bajo = h - 9 * vel, fl = Math.sin(t * 4 + h) * 0.8;
        pol([[u - w, h], [u + w, h], [u + w * 0.94 + fl, bajo], [u - w * 0.94 + fl, bajo]], H('#e8e0c8'));
        lin2(u - w * 0.9, bajo + 1, u + w * 0.9, bajo + 1, H('#b8ac90')); }
      else { lin2(u - w + 1, h - 1, u + w - 1, h - 1, H('#e8e0c8')); } }
  };
  palo(26, 78, [[34, 16], [46, 13], [56, 11], [64, 8]]);
  palo(-12, 84, [[]].slice(1));
  // la cangreja del mayor (aferrada o rota)
  if (o.roto) { const fl = Math.sin(t * 9) * 3; pol([[-12, 70], [-12, 40], [-30 + fl, 46], [-26 + fl, 64]], H('#d8d0b8')); lin2(-24 + fl, 50, -30 + fl, 58, H('#8a8070')); }
  else lin2(-12, 30, -52, 26, H('#3a2a1c'));
  // el trinquete partido: el mastelero cuelga
  if (o.roto) { lin2(26, 60, 40, 46 + Math.sin(t * 3) * 2, H('#3a2a1c')); lin2(40, 46 + Math.sin(t * 3) * 2, 44, 40 + Math.sin(t * 3) * 2, H('#3a2a1c'));
    const fl = Math.sin(t * 8) * 3; pol([[18, 34], [34, 34], [36 + fl, 26], [20 + fl, 28]], H('#cfc6ac')); lin2(22, 30, 32 + fl, 28, H('#8a8070')); }
  // el gallardete
  if (!o.roto) { const [a, b] = Pd(26, 78); for (let i = 0; i < 8; i++) R.pset(a - dir * i, b + Math.round(Math.sin(t * 6 + i * 0.8) * (i / 5)), H('#c83a2a')); }
};
// gorra de capitán pequeña (azul marino, visera negra, chapa dorada) centrada en x, con la base en y
const gorra = (x, y) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 7, y - 6, x + 7, y - 2, C.k); R.rect(x - 6, y - 5, x + 6, y - 3, H('#24304e')); R.rect(x - 6, y - 5, x + 6, y - 5, H('#3a4a70'));
  R.rect(x - 5, y - 2, x + 5, y, C.k); R.rect(x - 4, y - 1, x + 4, y - 1, H('#2a2a30')); R.rect(x - 7, y, x + 7, y + 1, C.k); R.rect(x - 6, y, x + 3, y, H('#3a3a44'));
  R.pset(x, y - 4, H('#e8c050')); R.pset(x - 1, y - 4, H('#c8a040')); R.pset(x + 1, y - 4, H('#c8a040')); };
'''

E['mc-amazon'] = ('El Amazon', r'''// MC-AMAZON (frases 4–5), 1861–1872, sin cartela. Siete planos:
// 1. «The story begins in 1861, on Spencer's Island in Nova Scotia»: el mapa de papel va del noreste a Nueva Escocia; la
//    chincheta cae en la isla de Spencer en «Spencer's»; una barquita de papel baja por la bahía hacia el mar en «Canada».
// 2. «A wooden brigantine was launched there and named the Amazon»: el astillero; el carpintero quita el calzo a mazazos,
//    el casco se desliza a la cala en «launched», los de la orilla lanzan las gorras en «Amazon»; en «bad» el chapuzón le
//    cae encima al carpintero (la mala suerte, en broma).
// 3. «Her first captain fell ill … and died»: el camarote del Amazon en 1861; una mano deja la gorra del capitán sobre la
//    litera vacía y, en «died», baja la mecha del farol; por el ojo de buey, el mar al atardecer (sin nada morboso).
// 4. «a storm drove her ashore»: corte en «years later», el rayo en «storm»; una ola deja el bergantín varado en una playa de
//    acantilados (1867); para la lluvia, tres hombres tiran del cabo y un carpintero remienda en «She was repaired».
// 5. «in 1868 a New York owner gave her a new name: the Mary Celeste»: la popa; el armador señala, el pintor tapa
//    AMAZON a brochazos y pinta MARY CELESTE; la gota cae sobre la gaviota, que sacude la cabeza.
// 6. «By 1872, one of her owners was also her captain, Benjamin Briggs»: el muelle del East River a la luz de la tarde;
//    Briggs llega con la escritura bajo el brazo, señala su barco en «captain» y sonríe en «Briggs».
// 7. «serious, religious and known for treating his crew well»: la oficina del armador; Briggs lee serio, pone la mano en
//    la Biblia en «religious» y estrecha la mano al marinero que entra en «crew»; el escribiente, el reloj, el puerto.''', PRE + r'''
const a = (f) => en('amazon', f), b = (f) => en('nombre', f);
const P2 = a(0.306), P3 = a(0.6245), P4 = a(0.8837), P5 = b(0.0675), P6 = b(0.3632), P7 = b(0.6924);
const SPENCER = a(0.1449), CANADA = a(0.264), LANZA = a(0.378), AMAZON = a(0.4646), MALA = a(0.5558);
const ENFERMA = a(0.6945), MUERE = a(0.8131), ANOS = a(0.8719), TORMENTA = a(0.9143), VARA = a(0.9356);
const REPARA = b(0.0133), OWNER = b(0.1559), NOMBRE = b(0.2327), MARY = b(0.2913);
const Y1872 = b(0.3704), DUENOS = b(0.5021), CAPITAN = b(0.5656), BRIGGS = b(0.6204);
const SERIO = b(0.8033), RELIGIOSO = b(0.8606), TRATA = b(0.924), CREW = b(0.9557);

// ── 1 · el mapa: del noreste a Nueva Escocia; la chincheta en la isla de Spencer ─────────────────────────────
const p1 = (t) => {
  const u = suave(lin(t, 0.2, SPENCER - 0.5));
  const P = T.mapa(R, t, { desde: 'noreste', u, zoom: 3.4, centro: [-67.5, 44.6] });
  const [px, py] = P([-64.7, 45.35]);
  const baja = lin(t, SPENCER - 0.35, SPENCER);
  if (baja > 0) T.chincheta(R, Math.round(px), Math.round(py), t, C.rojo, { baja });
  // una barquita de papel recortada que sale de la isla y baja por la bahía hacia el mar a «Canada»
  const bq = suave(lin(t, CANADA - 0.6, P2 - 0.2));
  const RUTA = [[-64.78, 45.31], [-65.25, 45.22], [-65.9, 44.95]];
  const enRuta = (u) => { const k = Math.min(1, u * 2), j = u < 0.5 ? 0 : 1, v = u < 0.5 ? k : (u - 0.5) * 2; const A = RUTA[j], B = RUTA[j + 1]; return P([lerp(A[0], B[0], v), lerp(A[1], B[1], v)]); };
  if (t > SPENCER + 0.2) {
    for (let i = 1; i <= 6; i++) { const u = bq - i * 0.035; if (u <= 0) break; const [ex, ey] = enRuta(u); R.pset(Math.round(ex) + (i % 2), Math.round(ey) + 2, H('#f4f8fa')); }
    const [qx, qy] = enRuta(bq), bx = Math.round(qx), by = Math.round(qy + Math.sin(t * 3) * 0.6 - 1);
    R.poligono([[bx - 6, by], [bx + 6, by], [bx + 4, by + 3], [bx - 4, by + 3]], C.k); R.poligono([[bx - 5, by], [bx + 5, by], [bx + 3, by + 2], [bx - 3, by + 2]], H('#f4ecd8'));
    R.linea(bx, by - 1, bx, by - 9, C.k); R.poligono([[bx - 1, by - 9], [bx - 6, by - 3], [bx - 1, by - 2]], H('#f4ecd8')); R.linea(bx - 1, by - 9, bx - 6, by - 3, C.k); R.poligono([[bx + 1, by - 7], [bx + 5, by - 3], [bx + 1, by - 3]], H('#e8dcc0')); }
};
// ── 2 · el astillero de la isla de Spencer: la botadura ────────────────────────────────────────────────────────
const p2 = (t) => {
  const bota = suave(lin(t, LANZA - 0.15, LANZA + 1.5));
  const o = { encuadre: 'astillero', epoca: 1861, bota, luz: 'dia' };
  const g = T.puerto(R, t, o);
  // el carpintero que quita el calzo a mazazos; le cae el chapuzón en «bad»
  const golpes = t < LANZA - 0.1, swing = golpes ? Math.abs(Math.sin((t - P2) * 7)) : 0;
  const moja = lin(t, MALA - 0.35, MALA + 0.1), huye = suave(lin(t, MALA + 0.1, MALA + 0.9));
  const cx = Math.round(206 - huye * 34);
  const Cp = R.actor(EL.estibadorMC, cx, 158, t, { dir: huye > 0 && huye < 1 ? -1 : 1, anda: huye > 0 && huye < 1, sostiene: golpes ? [cx + 18, 140 + swing * 6] : undefined, sorpresa: moja > 0.6 && t < MALA + 1.6, salto: moja > 0.8 && moja < 1 ? 3 : 0, sonrisa: t > LANZA && t < MALA - 0.4, brazos: t > AMAZON && t < MALA - 0.5 });
  if (golpes) { const [mx, my] = Cp.mano; R.linea(mx, my, mx + 4, my - 8, H('#7a5030')); R.rect(mx + 2, my - 12, mx + 8, my - 8, C.k); R.rect(mx + 3, my - 11, mx + 7, my - 9, H('#a87a48')); }
  // el calzo que salta
  const cz = lin(t, LANZA - 0.15, LANZA + 0.6);
  { const zx = Math.round(226 + cz * 30), zy = Math.round(152 - Math.sin(cz * Math.PI) * 16 + cz * 4); R.rect(zx, zy, zx + 8, zy + 5, C.k); R.rect(zx + 1, zy + 1, zx + 7, zy + 4, H('#b08048')); R.rect(zx + 1, zy + 1, zx + 7, zy + 1, H('#d0a060')); }
  // los de la orilla: aplauden la botadura y lanzan las gorras en «Amazon»
  const anima = t > LANZA + 0.2;
  const A1 = R.actor(EL.marineroMC, 70, 158, t, { dir: 1, brazos: t > AMAZON - 0.1 && t < AMAZON + 1.2, sonrisa: anima, habla: anima && t < AMAZON - 0.2 && Math.sin(t * 9) > 0, dedo: t > LANZA - 0.5 && t < AMAZON - 0.1 });
  R.actor(EL.estibadorMC, 100, 158, t, { dir: 1, brazos: t > AMAZON && t < AMAZON + 1.4 && Math.sin(t * 10) > -0.4, sonrisa: anima, salto: t > AMAZON && t < AMAZON + 0.5 ? 2 : 0 });
  R.actor(EL.marineroMC, 132, 158, t, { dir: 1, pal: { C: '#3a5a7a', c: '#2a4460' }, sonrisa: anima, habla: Math.sin(t * 6) > 0.5 });
  // las gorras por el aire
  for (const [gx, d, k] of [[77, 1, 0], [107, -1, 1]]) { const v = lin(t, AMAZON + k * 0.1, AMAZON + 1.3 + k * 0.1); if (v > 0 && v < 1) { const x = Math.round(gx + d * v * 14), y = Math.round(128 - Math.sin(v * Math.PI) * 30); R.rect(x - 3, y - 1, x + 3, y + 1, C.k); R.rect(x - 2, y - 1, x + 2, y, H(k ? '#5a4a3a' : '#3a3a44')); } }
  // el chapuzón: la ola de la botadura salta por encima del carpintero
  if (moja > 0 && moja < 1) { const n = 34, cab = Math.min(1, moja * 1.6), col = Math.max(0, moja * 1.6 - 0.6);
    for (let i = 0; i <= n; i++) { const f = i / n; if (f > cab || f < col) continue; const x = lerp(266, cx + 8, f), y = lerp(144, 128, f) - Math.sin(f * Math.PI) * 22;
      R.disco(Math.round(x), Math.round(y), 2.6 - f, H('#a8d0ec')); R.pset(Math.round(x), Math.round(y - 2), H('#ffffff')); R.pset(Math.round(x + 1), Math.round(y - 1), H('#e8f4fc')); }
    for (let i = 0; i < 14; i++) { const f = Math.min(cab, (i * 0.071 + moja) % 1), x = Math.round(lerp(266, cx + 8, f) + Math.sin(i * 2.1) * 5), y = Math.round(lerp(144, 128, f) - Math.sin(f * Math.PI) * 22 + Math.cos(i * 1.7) * 5); R.pset(x, y, i % 2 ? H('#ffffff') : H('#c8e4f8')); } }
  if (t > MALA && t < MALA + 1.4) for (let i = 0; i < 6; i++) { const y = 136 + ((t * 30 + i * 7) % 22); R.pset(cx + 3 + i * 2, Math.round(y), H('#a8d0ec')); }
  T.puertoDelante(R, t, o);
};
// ── 3 · el camarote del Amazon (1861): la gorra sobre la litera vacía; la mecha baja ──────────────────────────
const OJO = [196, 62, 17];   // el ojo de buey: centro y radio
const dentroOjo = (x, y) => (x - OJO[0]) ** 2 + (y - OJO[1]) ** 2 <= (OJO[2] - 3) ** 2;
const camarote = () => capa('camarote', () => {
  // el forro de tablas de pino; en la esquina de Atom, las mismas tablas sin vetas ni nudos (pared en calma)
  maderaV(0, 14, 319, 148, cols('#4a3020', '#7a5232', '#9a6c42'), 13, 2);
  for (let y = 14; y <= 50; y++) for (let x = 268; x < 320; x++) R.pset(x, y, (x % 13) === 12 ? H('#4a3020') : (x % 13) === 0 ? mez(H('#7a5232'), H('#9a6c42'), 0.5) : H('#7a5232'));
  // el bao del techo con sus curvas y cabezas de clavo (sin entrar en la esquina de Atom)
  R.rect(0, 0, 319, 13, H('#3a2616')); R.rect(0, 11, 319, 13, H('#2a1a0e')); R.rect(0, 1, 319, 2, H('#5a3c22'));
  for (let x = 6; x < 250; x += 34) { R.poligono([[x, 13], [x + 10, 13], [x, 26]], H('#3a2616')); R.pset(x + 2, 15, H('#8a6a48')); }
  // la litera a la derecha: tablero, cajones, colchón, manta de lana a rayas doblada, almohada a la derecha
  R.rect(112, 94, 319, 148, C.k); maderaV(113, 95, 319, 147, cols('#3a2416', '#5a3a22', '#7a5232'), 9, 5);
  R.rect(116, 86, 319, 106, C.k); for (let y = 87; y <= 105; y++) for (let x = 117; x <= 319; x++) R.pset(x, y, tono(cols('#c8c0a8', '#a8a088', '#8a826c'), (y - 87) / 18, x, y));
  for (let y = 92; y <= 105; y++) for (let x = 140; x <= 262; x++) { const r = ((x - 140) >> 3) % 4; R.pset(x, y, tono(r === 0 ? cols('#a83a2e', '#8a2a22') : cols('#5a6a8a', '#46546e', '#3a4660'), (y - 92) / 13, x, y)); }
  for (let x = 140; x <= 262; x += 3) R.pset(x, 92, H('#2a3044'));
  R.rect(236, 84, 266, 92, C.k); for (let y = 85; y <= 91; y++) for (let x = 237; x <= 265; x++) R.pset(x, y, ((x - 237) >> 3) % 4 === 0 ? H('#a83a2e') : tono(cols('#6a7a9a', '#5a6a8a'), (y - 85) / 6, x, y));
  R.rect(284, 80, 316, 94, C.k); for (let y = 81; y <= 93; y++) for (let x = 285; x <= 315; x++) R.pset(x, y, tono(cols('#f6f2e8', '#e2dccc', '#c8c0ac'), (y - 81) / 12 + (x - 285) * 0.01, x, y));
  R.rect(108, 106, 319, 112, C.k); R.rect(109, 107, 319, 111, H('#8a6038')); R.rect(109, 107, 319, 107, H('#b08050'));
  for (let x = 124; x < 310; x += 46) { R.rect(x, 120, x + 32, 141, C.k); R.rect(x + 1, 121, x + 31, 140, H('#5a3a22')); R.rect(x + 1, 121, x + 31, 121, H('#7a5232')); R.disco(x + 16, 130, 2, H('#c8a040')); R.pset(x + 15, 129, H('#f4e0a0')); }
  // el ojo de buey sobre la litera, con su aro de latón y sus pernos
  R.disco(OJO[0], OJO[1], OJO[2] + 1, C.k); R.disco(OJO[0], OJO[1], OJO[2], H('#b08a3a')); R.disco(OJO[0], OJO[1], OJO[2] - 2, H('#d8b050'));
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(OJO[0] + Math.cos(an) * (OJO[2] - 1)), Math.round(OJO[1] + Math.sin(an) * (OJO[2] - 1)), H('#6a4a1a')); }
  // el estante de la izquierda con el frasco del médico, la taza, la Biblia y el sextante en su caja
  R.rect(14, 96, 98, 100, C.k); R.rect(15, 97, 97, 99, H('#9a6c42')); R.rect(15, 97, 97, 97, H('#c08a54')); R.linea(18, 100, 26, 110, H('#5a3a22')); R.linea(94, 100, 86, 110, H('#5a3a22'));
  R.rect(20, 80, 26, 96, C.k); R.rect(21, 82, 25, 95, H('#7a4a1e')); R.rect(22, 79, 24, 81, H('#e8dcc0')); R.pset(22, 84, H('#c88a4a'));
  R.rect(30, 88, 40, 96, C.k); R.rect(31, 89, 39, 95, H('#f2eee2')); R.rect(31, 91, 39, 91, H('#3a6ac8')); R.rect(40, 90, 42, 93, C.k);
  R.rect(48, 82, 64, 96, C.k); R.rect(49, 83, 63, 95, H('#24202a')); R.rect(49, 83, 63, 83, H('#3a3440')); R.rect(55, 85, 56, 92, H('#c8a040')); R.rect(53, 87, 58, 87, H('#c8a040'));
  R.rect(70, 86, 92, 96, C.k); R.rect(71, 87, 91, 95, H('#7a4a2a')); R.rect(71, 87, 91, 87, H('#a06a3a')); R.rect(80, 90, 82, 92, H('#c8a040'));
  // el suelo de tablas, la alfombrita trenzada y el baúl de marinero a la izquierda
  madera(0, 148, 319, 179, cols('#3a2414', '#5a3a20', '#6e4a2a'), 8, 7);
  for (let y = 156; y < 174; y++) for (let x = 130; x < 250; x++) { const d = ((x - 190) / 58) ** 2 + ((y - 165) / 8) ** 2; if (d < 1) R.pset(x, y, Math.floor(Math.sqrt(d) * 6) % 2 ? H('#8a3a2a') : H('#c8a060')); }
  R.rect(14, 136, 96, 174, C.k); maderaV(15, 137, 95, 173, cols('#4a2e1a', '#6a4426', '#8a5c34'), 11, 9);
  R.rect(14, 136, 96, 143, C.k); R.rect(15, 137, 95, 142, H('#7a5030')); for (const x of [24, 86]) { R.rect(x - 2, 137, x + 2, 173, H('#3a3a44')); R.pset(x, 148, H('#8a8a94')); }
  R.rect(52, 150, 58, 158, C.k); R.rect(53, 151, 57, 157, H('#c8a040'));
  for (const x of [14, 96]) { R.linea(x, 150, x + (x > 50 ? 6 : -6), 158, H('#c8b080')); R.linea(x, 151, x + (x > 50 ? 6 : -6), 159, H('#8a7050')); }
  // la chaqueta del capitán colgada de su percha
  R.rect(58, 30, 62, 34, C.k); R.poligono([[50, 34], [70, 34], [74, 72], [46, 72]], H('#1e2640')); R.poligono([[56, 34], [64, 34], [60, 56]], H('#f2eee2')); R.linea(50, 34, 46, 72, C.k); R.linea(70, 34, 74, 72, C.k); R.rect(46, 72, 74, 73, C.k);
  for (let y = 40; y < 68; y += 6) R.pset(62, y, H('#c8a040'));
  // un mapa clavado en la pared, sin letras
  R.rect(84, 30, 124, 60, C.k); R.rect(85, 31, 123, 59, H('#e8dcb8')); for (let x = 86; x < 123; x++) { const y = Math.round(44 + Math.sin(x * 0.2) * 6); R.pset(x, y, H('#8a6a3a')); for (let yy = y + 1; yy < 59; yy++) if ((x + yy) % 3 === 0) R.pset(x, yy, H('#9ab0c0')); }
  R.pset(86, 32, C.rojo); R.pset(122, 32, C.rojo);
});
const p3 = (t) => {
  camarote();
  // por el ojo de buey: el mar al atardecer que se inclina con el balanceo, con su sol que baja
  const inc = Math.sin(t * 1.1) * 0.12, hor = OJO[1] + 2 + Math.sin(t * 0.8) * 2;
  for (let y = OJO[1] - OJO[2]; y <= OJO[1] + OJO[2]; y++) for (let x = OJO[0] - OJO[2]; x <= OJO[0] + OJO[2]; x++) { if (!dentroOjo(x, y)) continue;
    const h = hor + (x - OJO[0]) * inc;
    if (y < h) R.pset(x, y, tono(cols('#6a5a9a', '#c87a8a', '#f0a868', '#f8d890'), (y - (OJO[1] - OJO[2])) / (h - OJO[1] + OJO[2]), x, y));
    else { const w = Math.sin(x * 0.5 + y * 2 + t * 3); R.pset(x, y, w > 0.8 ? H('#f8c888') : tono(cols('#4a4a7a', '#2e3058', '#1e2040'), (y - h) / 14, x, y)); } }
  { const sx = OJO[0] - 5, sy = Math.round(hor - 1 + (sx - OJO[0]) * inc + lin(t, P3, P4) * 3); for (let yy = sy - 3; yy <= sy + 3; yy++) for (let xx = sx - 3; xx <= sx + 3; xx++) if ((xx - sx) ** 2 + (yy - sy) ** 2 <= 9 && dentroOjo(xx, yy) && yy < hor + (xx - OJO[0]) * inc) R.pset(xx, yy, H('#fff0b0')); }
  R.pset(OJO[0] - 8, OJO[1] - 9, H('#ffffff')); R.pset(OJO[0] - 7, OJO[1] - 10, H('#ffffff'));
  // el farol de cardán en su brazo, junto a la cabecera; la llama baja en «died»
  const mecha = 1 - 0.75 * suave(lin(t, MUERE - 0.2, MUERE + 0.5));
  const fx = 296, sw = Math.round(Math.sin(t * 1.1) * 1.5);
  R.rect(fx + 8, 54, fx + 10, 64, H('#5a4020')); R.rect(fx - 1, 54, fx + 10, 56, H('#5a4020'));
  R.linea(fx, 56, fx + sw, 62, H('#3a2a14'));
  R.rect(fx - 6 + sw, 62, fx + 6 + sw, 66, C.k); R.rect(fx - 5 + sw, 63, fx + 5 + sw, 65, H('#b08a3a'));
  R.rect(fx - 4 + sw, 66, fx + 4 + sw, 80, C.k); R.rect(fx - 3 + sw, 67, fx + 3 + sw, 79, mez(H('#e8e0c0'), H('#ffe8a0'), mecha * 0.6));
  const fh = Math.round(2 + mecha * 5 + Math.sin(t * 13) * 0.6);
  for (let i = 0; i < fh; i++) { R.pset(fx + sw, 76 - i, i < fh - 2 ? H('#ffd040') : H('#fff4c0')); if (i < fh - 3 && mecha > 0.5) { R.pset(fx + sw - 1, 76 - i, H('#ffa020')); R.pset(fx + sw + 1, 76 - i, H('#ffa020')); } }
  R.rect(fx - 6 + sw, 80, fx + 6 + sw, 86, C.k); R.rect(fx - 5 + sw, 81, fx + 5 + sw, 85, H('#b08a3a')); R.rect(fx + 6 + sw, 82, fx + 9 + sw, 84, H('#8a6a2a'));
  // el halo de la luz del farol en la pared mientras arde
  if (mecha > 0.4) for (let k = 0; k < 40; k++) { const an = k * 0.157, r = 14 + (k % 3) * 3; const x = Math.round(fx + Math.cos(an) * r), y = Math.round(72 + Math.sin(an) * r * 0.8); if (!tranquila(x, y) && x < 320) R.pset(x, y, mez(R.pget(x, y), H('#ffe0a0'), 0.25 * mecha)); }
  // el vapor de la taza
  for (let i = 0; i < 3; i++) { const v = ((t * 0.7 + i * 0.33) % 1); R.pset(Math.round(35 + Math.sin(v * 6 + i) * 2), Math.round(86 - v * 14), mez(H('#f0ece0'), H('#7a5232'), v)); }
  // la cortina de la litera que se mece con el barco
  const cs = Math.sin(t * 1.1) * 3;
  R.rect(104, 76, 160, 77, H('#c8a040'));
  for (let x = 106; x < 130; x++) { const yb = 114 + Math.round(Math.sin(x * 0.3) * 1); for (let y = 78; y < yb; y++) { const dx = Math.round(cs * (y - 78) / 34); R.pset(x + dx, y, (x % 4 === 0) ? H('#6a2a22') : (x % 4 === 1 ? H('#a8483a') : H('#8a3a2e'))); } }
  // la gorra: llega en la mano desde la derecha y se queda sobre la manta doblada
  const GX = 276, GY = 84;
  const lleva = suave(lin(t, P3 + 0.5, ENFERMA + 0.6)), deja = t > ENFERMA + 0.75;
  const gx = lerp(338, GX, lleva), gy = lerp(118, GY, lleva);
  if (deja) gorra(GX, GY);
  // la mano: deja la gorra, se aparta, y en «died» gira la llave del farol; luego se va por la derecha
  const aLamp = suave(lin(t, ENFERMA + 1.4, MUERE - 0.25)), fuera = suave(lin(t, MUERE + 0.6, MUERE + 1.2));
  let wx, wy;
  if (!deja) { wx = gx + 9; wy = gy + 2; }
  else { const sep = suave(lin(t, ENFERMA + 0.8, ENFERMA + 1.3)) * (1 - aLamp); wx = lerp(GX + 9 + sep * 40, fx + 12, aLamp); wy = lerp(GY + 2 + sep * 12, 84, aLamp); wx = lerp(wx, 350, fuera); wy = lerp(wy, 120, fuera); }
  if (t > MUERE - 0.25 && t < MUERE + 0.6) wy += Math.round(Math.sin((t - MUERE) * 14));
  if (wx < 338) T.brazo(R, Math.max(324, wx + 48), wy + 30, wx, wy, '#2a3450', -1, { codo: [wx + 28, wy + 22] });
  if (!deja) gorra(gx, gy);
  // la luz baja: el camarote se queda en penumbra azul
  const pen = 0.42 * suave(lin(t, MUERE - 0.1, MUERE + 0.9));
  if (pen > 0) T.tinte(R, 0, 179, [24, 26, 52], pen);
};
// ── 4 · la tormenta deja el barco varado en la costa (1867) ─────────────────────────────────────────────────────
const SUELO4 = 162;
const costaFondo = () => capa('costa', () => {
  cieloT(0, 110, cols('#3a3e4a', '#4a4e5a', '#5a5e6a', '#6a6e78', '#7a7e86'));
  // el mar gris a lo lejos, por detrás
  for (let y = 98; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(cols('#4a5a64', '#3e4e58', '#34444e'), (y - 98) / 34, x, y));
  // los acantilados de la izquierda en tres términos
  for (let x = 0; x < 140; x++) { const top = Math.round(62 + x * 0.32 + Math.sin(x * 0.18) * 5 + hs(x, 1) * 3);
    for (let y = top; y < 150; y++) { const v = (y - top) / 60; let c = tono(cols('#8a7e6a', '#6e6454', '#5a5044', '#463e36'), v + (Math.sin(y * 0.5 + x * 0.1) > 0.7 ? 0.25 : 0), x, y);
      if ((y + Math.round(x * 0.4)) % 9 === 0) c = H('#3a342e'); if (hs(x, y, 2) > 0.97) c = H('#a89a80'); R.pset(x, y, c); }
    if (top < 150) { R.pset(x, top, H('#5a7a3a')); R.pset(x, top + 1, H('#4a6a2e')); if (hs(x, 9) > 0.6) R.pset(x, top - 1, H('#6a8a44')); } }
  for (let k = 0; k < 9; k++) { const x = 8 + k * 13, base = Math.round(62 + x * 0.32); R.poligono([[x, base - 9 - (k % 3) * 2], [x - 3, base], [x + 3, base]], H('#2e4a2e')); R.pset(x, base - 8 - (k % 3) * 2, H('#4a6a3a')); }
  // la playa de arena mojada, maderos y algas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 132) / 48; let c = tono(cols('#8a7e66', '#9a8c70', '#a8987a', '#b4a484'), v + (hs(x >> 1, y >> 1, 4) - 0.5) * 0.3, x, y);
    if (hs(x, y, 5) > 0.975) c = H('#5a5040'); if (hs(x, y, 6) > 0.985) c = H('#d0c4a4'); R.pset(x, y, c); }
  for (const [x, y, w] of [[30, 168, 26], [246, 172, 30], [180, 176, 18]]) { R.rect(x, y, x + w, y + 3, C.k); R.rect(x + 1, y + 1, x + w - 1, y + 2, H('#7a6448')); R.rect(x + 1, y + 1, x + w - 1, y + 1, H('#9a8264')); }
  for (let i = 0; i < 26; i++) { const x = Math.round(hs(i, 3) * 310), y = Math.round(140 + hs(i, 4) * 36); R.pset(x, y, H('#3a4a2a')); R.pset(x + 1, y, H('#4a5a32')); R.pset(x + 1, y - 1, H('#2e3a22')); }
  // el bote volcado y un rollo de cabo
  R.poligono([[268, 150], [312, 150], [306, 140], [274, 140]], C.k); R.poligono([[270, 149], [310, 149], [305, 141], [275, 141]], H('#6a5a4a')); R.linea(274, 144, 306, 144, H('#8a7a62'));
  R.disco(20, 152, 6, C.k); R.disco(20, 152, 5, H('#a89060')); R.anillo(20, 152, 3, H('#7a6440'));
});
const p4 = (t) => {
  costaFondo();
  // nubes de tormenta que corren deprisa, en tres tonos
  nubes(t, [[0, 30, 60, 16], [150, 42, 70, 22], [300, 26, 50, 12], [80, 56, 80, 30]], cols('#8a8e98', '#5e626e', '#3a3e48'), (x, y) => y > 96);
  for (let k = 0; k < 2; k++) pajaro(((t * (30 + k * 9) + k * 140) % 360) - 20, 70 + k * 9 + Math.sin(t * 3 + k) * 3, t, H('#e8e8ee'));
  // el mar de la tormenta: olas grises con espuma que avanza
  const agit = 1 - 0.6 * suave(lin(t, VARA + 1.6, REPARA));
  for (let y = 112; y < 140; y++) for (let x = 140; x < 320; x++) { const orilla = 134 + Math.round(Math.sin(x * 0.05 + t * 1.5) * 2) + Math.round((320 - x) * 0.02); if (y > orilla) continue;
    const w = Math.sin(x * 0.12 + y * 0.9 - t * 4) + Math.sin(x * 0.05 - t * 2) * 0.8; let c = tono(cols('#5a6a74', '#4a5a64', '#3a4a54'), (y - 112) / 26 + w * 0.1, x, y);
    if (w * agit > 1.3) c = H('#e8eef0'); else if (w * agit > 1.0 && bay(x, y) > 0.5) c = H('#b8c4c8'); R.pset(x, y, c); }
  for (let x = 140; x < 320; x++) { const y = 134 + Math.round(Math.sin(x * 0.05 + t * 1.5) * 2) + Math.round((320 - x) * 0.02); R.pset(x, y, H('#f4f6f6')); if (Math.sin(x * 0.3 + t * 5) > 0.2) R.pset(x, y + 1, H('#d8e0e2')); }
  // el barco: entra con la ola y queda escorado en la arena
  const ola = suave(lin(t, VARA - 0.5, VARA + 0.7));
  const bx = lerp(262, 214, ola) + (1 - ola) * Math.sin(t * 2.2) * 3, by = lerp(126, 142, ola) + (1 - ola) * Math.sin(t * 2.8) * 2;
  const rot = lerp(Math.sin(t * 2.4) * 0.06, 0.13, ola);
  bergantin(Math.round(bx), Math.round(by), 0.9, { dir: -1, rot, roto: true, fuera: ola, t });
  // la ola grande que lo empuja y rompe
  const ro = lin(t, VARA - 0.6, VARA + 0.8);
  if (ro > 0 && ro < 1) for (let i = 0; i < 40; i++) { const x = Math.round(lerp(330, 170, ro) + i * 3 - 30), y = Math.round(140 - Math.sin(Math.min(1, ro * 1.4) * Math.PI) * 18 + Math.sin(i) * 2); R.pset(x, y, H('#ffffff')); R.pset(x, y + 1, H('#d8e4e8')); if (i % 3 === 0) R.pset(x + 1, y - 2, H('#e8f0f2')); }
  // los cuatro hombres llegan y tiran del cabo a compás; el carpintero remienda en «repaired»
  const llega = suave(lin(t, VARA + 0.6, VARA + 2.2)), tira = t > VARA + 2.2 ? Math.sin((t - VARA) * 5) * 0.5 + 0.5 : 0;
  const proa = [Math.round(bx - 52), Math.round(by - 16)];
  const cabo = [];
  for (let k = 0; k < 3; k++) { const x = Math.round(lerp(-30 - k * 20, 80 + k * 18 - tira * 3, llega));
    const A = R.actor(EL.marineroMC, x, SUELO4 + k * 3, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: llega >= 1 ? [x - 3, SUELO4 + k * 3 - 12] : undefined, enfado: llega >= 1 && tira > 0.6, pal: k === 1 ? { C: '#3a5a7a', c: '#2a4460' } : undefined });
    if (llega >= 1) cabo.push(A.mano); }
  if (cabo.length) { let [x0, y0] = proa; for (const [mx, my] of cabo.sort((u, v) => v[0] - u[0])) { R.linea(x0, y0, mx, my, H('#c8b080')); x0 = mx; y0 = my; } R.linea(x0, y0, x0 - 18, y0 + 6, H('#c8b080')); }
  const cpx = Math.round(lerp(340, 238, suave(lin(t, VARA + 1.4, REPARA - 0.6))));
  const Cp = R.actor(EL.estibadorMC, cpx, SUELO4 + 6, t, { dir: -1, anda: t < REPARA - 0.6, sostiene: t > REPARA - 0.6 ? [cpx - 4, 150 - Math.abs(Math.sin(t * 8)) * 5] : undefined, sonrisa: t > REPARA + 0.3 });
  if (t > REPARA - 0.6) { const [mx, my] = Cp.mano; R.linea(mx, my, mx - 3, my - 7, H('#7a5030')); R.rect(mx - 7, my - 10, mx - 1, my - 7, C.k); R.rect(mx - 6, my - 9, mx - 2, my - 8, H('#9aa2ac')); R.rect(cpx - 16, 148, cpx - 8, 152, C.k); R.rect(cpx - 15, 149, cpx - 9, 151, H('#c89a5a')); }
  // la lluvia que amaina y el rayo en «storm»
  const llueve = 1 - suave(lin(t, VARA + 2.0, REPARA));
  const nl = Math.round(140 * llueve);
  for (let i = 0; i < nl; i++) { const x = Math.round((hs(i, 1) * 360 + t * 60) % 360) - 20, y = Math.round((hs(i, 2) * 200 + t * 260) % 200) - 10; if (tranquila(x, y)) continue; R.linea(x, y, x - 3, y + 6, i % 3 ? H('#a8b4c0') : H('#d0dae2')); }
  const rayo = lin(t, TORMENTA - 0.08, TORMENTA + 0.4);
  if (rayo > 0 && rayo < 1) { if (rayo < 0.5) T.tinte(R, 0, 179, [240, 244, 255], 0.35 * (1 - rayo * 2));
    let x = 196, y = 30; for (let k = 0; k < 8; k++) { const nx = x + Math.round((hs(k, 7) - 0.5) * 14), ny = y + 9; R.linea(x, y, nx, ny, H('#fffbe0')); R.linea(x + 1, y, nx + 1, ny, H('#e0e8ff')); x = nx; y = ny; } }
  const gris = 0.25 * llueve; if (gris > 0.02) T.tinte(R, 0, 179, [40, 44, 58], gris);
};
// ── 5 · la popa en Nueva York (1868): AMAZON → MARY CELESTE; la gota y la gaviota ───────────────────────────────
const p5 = (t) => {
  const nombre = t < NOMBRE - 0.4 ? 0.3 * suave(lin(t, P5 + 0.3, NOMBRE - 0.4)) : 0.3 + 0.7 * lin(t, NOMBRE - 0.3, MARY + 0.15);
  const gota = lin(t, MARY - 0.35, MARY + 0.2) * 0.6 + lin(t, MARY + 0.2, P6 - 0.05) * 0.4;
  const o = { encuadre: 'astillero', camara: 'popa', nombre, gota, luz: 'dia' };
  const g = T.puerto(R, t, o);
  // el pintor en la plancha, con la brocha en la letra que toca
  const [pxp, pyp] = g.pintor ?? [180, 123], pin = g.pincel ?? [pxp + 4, 91];
  const fr = Math.sin(t * 16) * 2;
  const Pn = R.actor(EL.pintorMC, Math.round(pxp - 7), pyp, t, { dir: 1, sostiene: [Math.round(pin[0]), Math.round(pin[1] + 6 + fr)], sonrisa: t > MARY + 0.8, sorpresa: t > MARY + 0.2 && t < MARY + 0.8 });
  { const [mx, my] = Pn.mano; R.rect(mx - 1, my - 7, mx + 1, my, C.k); R.rect(mx, my - 6, mx, my - 1, H('#a87a48')); R.rect(mx - 2, my - 10, mx + 2, my - 7, C.k); R.rect(mx - 1, my - 9, mx + 1, my - 8, H('#f6f6f2')); }
  // el armador en el muelle: llega, señala la popa en «a new name» y asiente
  const ar = suave(lin(t, P5 + 0.1, OWNER - 0.1)), ax = Math.round(lerp(-20, 74, ar));
  R.actor(EL.senor1857, ax, 172, t, { dir: 1, anda: ar > 0 && ar < 1, dedo: t > NOMBRE - 0.5 && t < MARY + 0.2, habla: t > OWNER && t < NOMBRE && Math.sin(t * 8) > 0, sonrisa: t > MARY + 0.3 });
  // un mozo con un rollo de cabo que pasa por detrás
  const mz = lin(t, P5 + 0.6, P6), mzx = Math.round(lerp(100, -24, mz));
  R.actor(EL.estibadorMC, mzx, 166, t, { dir: -1, anda: true, sostiene: [mzx - 2, 152] });
  R.disco(mzx - 3, 152, 4, C.k); R.disco(mzx - 3, 152, 3, H('#c8b080')); R.anillo(mzx - 3, 152, 2, H('#8a7050'));
  T.puertoDelante(R, t, o);
};
// ── 6 · el muelle del East River (1872), a la luz de la tarde: Briggs y su barco ────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'muelle', luz: 'tarde', carga: 0.2 };
  const g = T.puerto(R, t, o);
  // un estibador gira el torno al fondo
  const [tx, ty] = g.torno ?? [150, 152];
  R.actor(EL.estibadorMC, tx - 22, 160, t, { dir: 1, sostiene: [tx - 4 + Math.round(Math.cos(t * 4) * 3), ty - 6 + Math.round(Math.sin(t * 4) * 3)] });
  // Briggs llega con la escritura enrollada, se para, señala su barco en «captain» y mira a cámara sonriendo en «Briggs»
  const v = suave(lin(t, P6 + 0.2, DUENOS + 0.2)), bx = Math.round(lerp(-20, 74, v));
  const senala = t > CAPITAN - 0.15 && t < BRIGGS + 0.1;
  const Bg = R.actor(EL.briggsMC, bx, 168, t, { dir: 1, anda: v > 0 && v < 1, sostiene: senala ? undefined : [bx + 13, 150], dedo: senala, sonrisa: t > BRIGGS - 0.1, habla: t > DUENOS + 0.3 && t < CAPITAN - 0.2 && Math.sin(t * 8) > 0 });
  if (!senala) { const [mx, my] = Bg.mano; R.rect(mx - 2, my - 6, mx + 2, my + 4, C.k); R.rect(mx - 1, my - 5, mx + 1, my + 3, H('#f2e8cc')); R.pset(mx, my - 5, H('#c83a2a')); R.pset(mx, my + 3, H('#c8b490')); }
  else { R.rect(bx - 2, 150, bx + 2, 160, C.k); R.rect(bx - 1, 151, bx + 1, 159, H('#f2e8cc')); }
  // un marinero del barco baja por el muelle con un saco al hombro y saluda al capitán
  // un marinero baja del barco con un saco, se para a saludar al capitán y sigue
  const m1 = suave(lin(t, P6 + 0.6, CAPITAN - 0.3)), m2 = suave(lin(t, BRIGGS + 0.3, P7 + 0.6)), mx2 = Math.round(lerp(lerp(214, 104, m1), 236, m2));
  const Mr = R.actor(EL.marineroMC, mx2, 170, t, { dir: m2 > 0 ? 1 : -1, anda: (m1 > 0 && m1 < 1) || m2 > 0, sostiene: [m2 > 0 ? mx2 + 15 : mx2 - 1, 156], sonrisa: t > CAPITAN - 0.4, habla: t > CAPITAN - 0.2 && t < BRIGGS && Math.sin(t * 8) > 0 });
  { const [sx, sy] = Mr.mano; R.rect(sx - 6, sy - 6, sx + 3, sy + 5, C.k); R.rect(sx - 5, sy - 5, sx + 2, sy + 4, H('#d8ccb0')); R.rect(sx - 5, sy - 1, sx + 2, sy - 1, H('#b0a080')); R.rect(sx - 3, sy - 7, sx, sy - 6, H('#8a7a5a')); }
  T.puertoDelante(R, t, o);
};
// ── 7 · la oficina del armador en Nueva York (1872): serio, religioso y buen capitán ─────────────────────────────
const SUELO7 = 152;
const VENT = [22, 32, 92, 100];
const oficina = () => capa('oficina', () => {
  // el techo y la pared: papel a rayas verdes, la esquina de Atom lisa y en calma
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { let c = (x >> 2) % 3 === 0 ? H('#4e6a52') : H('#5a7a5e'); if (((x + y * 3) % 11) === 0 && (x >> 2) % 3 === 1) c = H('#6a8a6a'); if (tranquila(x, y)) c = bay(x, y) > 0.8 ? H('#56745a') : H('#5a7a5e'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 5, H('#e8dcc0')); R.rect(0, 5, 319, 6, H('#a89870'));
  // el zócalo de madera con paneles
  maderaV(0, 100, 319, 138, cols('#3a2214', '#5a3820', '#74482a'), 40, 3);
  R.rect(0, 98, 319, 101, H('#2a180c')); R.rect(0, 98, 319, 98, H('#8a5a34'));
  for (let x = 6; x < 320; x += 40) { R.rect(x, 106, x + 30, 132, H('#2a180c')); R.rect(x + 1, 107, x + 29, 131, H('#4e301a')); R.rect(x + 1, 107, x + 29, 107, H('#6e4628')); }
  // el suelo de tablas
  madera(0, 138, 319, 179, cols('#4a2e18', '#6a4426', '#84583a'), 7, 4);
  // la ventana al puerto (el hueco se pinta vivo); su marco y su alféizar
  R.rect(VENT[0] - 4, VENT[1] - 4, VENT[2] + 4, VENT[3] + 6, C.k); R.rect(VENT[0] - 3, VENT[1] - 3, VENT[2] + 3, VENT[3] + 5, H('#e8dcc0'));
  R.rect(VENT[0] - 6, VENT[3] + 4, VENT[2] + 6, VENT[3] + 7, H('#c8b890')); R.rect(VENT[0] - 6, VENT[3] + 7, VENT[2] + 6, VENT[3] + 7, H('#6a5a40'));
  // el reloj de pared
  R.rect(116, 30, 140, 92, C.k); R.rect(117, 31, 139, 91, H('#6a3e20')); R.rect(117, 31, 139, 32, H('#8a5a34')); R.disco(128, 44, 9, C.k); R.disco(128, 44, 8, H('#f2ead2'));
  for (let k = 0; k < 12; k++) R.pset(Math.round(128 + Math.cos(k * Math.PI / 6) * 6), Math.round(44 + Math.sin(k * Math.PI / 6) * 6), C.k);
  R.rect(120, 58, 136, 88, H('#3a2414')); R.rect(121, 59, 135, 87, H('#e0d4b4'));
  // el cuadro del bergantín (sin letras)
  R.rect(160, 30, 230, 74, C.k); R.rect(161, 31, 229, 73, H('#b08a3a')); R.rect(165, 35, 225, 69, H('#9ab0c4'));
  for (let y = 54; y <= 69; y++) for (let x = 165; x <= 225; x++) R.pset(x, y, tono(cols('#5a7a94', '#4a6a84', '#3a5a74'), (y - 54) / 15, x, y));
  for (let x = 165; x <= 225; x++) if (Math.sin(x * 0.7) > 0.6) R.pset(x, 58 + (x % 3), H('#c8d8e4'));
  bergantin(195, 58, 0.36, { dir: 1, velas: 1 });
  // el armario de cartas y libros de cuentas
  R.rect(240, 56, 304, 140, C.k); maderaV(241, 57, 303, 139, cols('#3a2214', '#5e3a20', '#7a4e2c'), 16, 6);
  for (let k = 0; k < 3; k++) { const y = 62 + k * 22; R.rect(244, y + 18, 300, y + 19, H('#2a180c'));
    for (let i = 0; i < 10; i++) { const x = 246 + i * 5 + (k % 2) * 2, hh = 12 + ((i * 7 + k) % 5); const c = ['#6a2a22', '#2a3a5a', '#3a4a2a', '#5a3a22', '#7a6a3a'][(i + k) % 5]; R.rect(x, y + 18 - hh, x + 3, y + 17, C.k); R.rect(x + 1, y + 19 - hh, x + 2, y + 17, H(c)); R.pset(x + 1, y + 21 - hh, H('#c8a040')); } }
  R.rect(244, 126, 300, 138, H('#4a2c18')); R.rect(244, 131, 300, 131, H('#2a180c')); R.disco(272, 128, 1, H('#c8a040')); R.disco(272, 135, 1, H('#c8a040'));
  // la media maqueta en la pared y el perchero con un abrigo
  R.poligono([[60, 112], [100, 112], [96, 118], [66, 118]], C.k); R.poligono([[61, 112], [99, 112], [95, 117], [67, 117]], H('#a87a48')); R.linea(62, 114, 98, 114, H('#c89a5a'));
  R.rect(150, 96, 152, 99, H('#c8a040')); R.rect(144, 88, 158, 96, C.k); R.rect(145, 89, 157, 95, H('#2a2a30')); R.rect(142, 95, 160, 97, C.k);
  // la alfombra
  for (let y = 154; y < 176; y++) for (let x = 60; x < 230; x++) { const e = x < 64 || x > 225 || y < 156 || y > 173; R.pset(x, y, e ? H('#c8a040') : ((x >> 3) + (y >> 2)) % 2 ? H('#7a2a22') : H('#6a2420')); }
});
const ventanaViva = (t) => {
  const [x0, y0, x1, y1] = VENT;
  cieloT(y0, y0 + 40, cols('#9ab8d8', '#b0c8e0', '#c8d8e8', '#e0e4e8'), x0, x1);
  R.recorte([x0, y0, x1, y1]);
  for (let k = 0; k < 2; k++) { const cx = x0 + ((t * (3 + k * 2) + k * 40) % 100) - 10; R.disco(Math.round(cx), y0 + 10 + k * 8, 5, H('#f4f6f8')); R.disco(Math.round(cx + 6), y0 + 11 + k * 8, 4, H('#e0e6ee')); }
  for (let y = y0 + 41; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = Math.sin(x * 0.6 + y * 2 + t * 3); R.pset(x, y, w > 0.85 ? H('#e8f0f4') : tono(cols('#6a8aa4', '#5a7a94', '#4a6a84'), (y - y0 - 41) / 27, x, y)); }
  for (let x = x0; x <= x1; x += 9) for (let y = y0 + 34; y <= y0 + 41; y++) R.pset(x + (y % 2), y, H('#7a6a5a'));
  for (const mx of [x0 + 12, x0 + 30]) R.linea(mx, y0 + 8, mx, y0 + 46, H('#3a2a1c'));
  const bxw = x0 + ((t * 5) % 120) - 30; bergantin(Math.round(bxw), y0 + 56, 0.28, { dir: 1, velas: 1, t });
  pajaro(x0 + 20 + Math.sin(t) * 6, y0 + 20, t, H('#3a3a44'));
  R.recorte(null);
  R.rect(x0 + 34, y0, x0 + 36, y1, H('#e8dcc0')); R.rect(x0, y0 + 32, x1, y0 + 34, H('#e8dcc0'));
};
const p7 = (t) => {
  oficina(); ventanaViva(t);
  // las agujas y el péndulo del reloj
  const pa = Math.sin(t * 3.2) * 4; R.linea(128, 60, Math.round(128 + pa), 82, H('#8a6a2a')); R.disco(Math.round(128 + pa), 83, 2, H('#c8a040'));
  R.linea(128, 44, 128, 39, C.k); R.linea(128, 44, Math.round(128 + Math.cos(t * 0.5) * 5), Math.round(44 + Math.sin(t * 0.5) * 5), C.k);
  // el escribiente en su pupitre alto, con la pluma que corre
  const Es = R.actor(EL.comerciante, 32, SUELO7 + 4, t, { dir: 1, sostiene: [52 + Math.round(Math.sin(t * 5) * 3), 128], pal: { C: '#5a4a3a' } });
  R.rect(44, 128, 70, 132, C.k); R.rect(45, 129, 69, 131, H('#8a5a34')); R.rect(48, 126, 66, 128, H('#f2ead2')); R.rect(46, 132, 47, 158, H('#3a2414')); R.rect(67, 132, 68, 158, H('#3a2414'));
  { const [mx, my] = Es.mano; R.linea(mx, my, mx + 3, my - 7, H('#f6f6f2')); R.pset(mx + 3, my - 8, H('#c8c8c0')); }
  // la puerta de la derecha que se abre cuando entra el marinero
  const abre = suave(lin(t, TRATA - 0.9, TRATA - 0.5)) * (1 - suave(lin(t, CREW + 0.9, CREW + 1.4)));
  R.rect(284, 64, 319, 150, C.k); R.rect(285, 65, 319, 150, H('#2a2016'));
  const pw = Math.round(34 * (1 - abre * 0.7)); maderaV(285, 65, 285 + pw, 150, cols('#3a2214', '#6a4426', '#84583a'), 8, 11); if (pw > 6) R.disco(285 + pw - 4, 110, 1, H('#c8a040'));
  // el marinero entra, se quita la gorra y estrecha la mano de Briggs
  const m = suave(lin(t, TRATA - 0.6, CREW - 0.1)), mx = Math.round(lerp(300, 222, m)), juntas = t > CREW - 0.1;
  const Mr = R.actor(EL.marineroMC, mx, SUELO7 + 6, t, { dir: -1, anda: m > 0 && m < 1, sostiene: juntas ? [213, 127 + Math.round(Math.sin(t * 12) * 1)] : undefined, sonrisa: juntas, habla: juntas && t > CREW + 0.4 && Math.sin(t * 8) > 0, tocado: juntas ? false : undefined });
  // Briggs detrás del escritorio: lee serio, pone la mano en la Biblia y estrecha la mano al marinero
  const lee = t < RELIGIOSO - 0.2, biblia = t >= RELIGIOSO - 0.2 && t < TRATA, dx = Math.round(suave(lin(t, TRATA, CREW - 0.1)) * 30);
  const Bg = R.actor(EL.briggsMC, 162 + dx, 142, t, { dir: 1, sostiene: lee ? [182, 116] : biblia ? [180, 128] : juntas ? [210, 127 + Math.round(Math.sin(t * 12) * 1)] : [198, 124], sonrisa: juntas || (t > TRATA && t < CREW), habla: t > CREW + 0.8 && Math.sin(t * 7) > 0 });
  if (lee) { const [hx, hy] = Bg.mano; R.rect(hx - 2, hy - 12, hx + 8, hy + 1, C.k); R.rect(hx - 1, hy - 11, hx + 7, hy, H('#f2ead2')); for (let y = hy - 9; y < hy - 1; y += 2) R.linea(hx, y, hx + 5, y, H('#9a9080')); }
  // el escritorio por delante (más bajo: asoman la cabeza y el pecho de Briggs), con la Biblia, el tintero, la lámpara y los papeles
  R.rect(140, 136, 222, 166, C.k); maderaV(141, 141, 221, 165, cols('#3a2214', '#5a3820', '#74482a'), 20, 13); R.rect(140, 136, 222, 141, C.k); R.rect(141, 137, 221, 140, H('#7a4e2c')); R.rect(141, 137, 221, 137, H('#a06a3a'));
  for (const x of [148, 198]) { R.rect(x, 146, x + 14, 160, H('#2a180c')); R.rect(x + 1, 147, x + 13, 159, H('#4e301a')); R.disco(x + 7, 153, 1, H('#c8a040')); }
  R.rect(172, 130, 186, 137, C.k); R.rect(173, 131, 185, 136, H('#1e1a22')); R.rect(173, 131, 185, 131, H('#3a3440')); R.rect(178, 132, 179, 135, H('#c8a040')); R.rect(176, 133, 181, 133, H('#c8a040'));
  R.rect(158, 130, 164, 137, C.k); R.rect(159, 131, 163, 136, H('#24202a')); R.linea(162, 131, 167, 121, H('#f6f6f2')); R.pset(167, 121, H('#d8d8d0'));
  R.rect(194, 133, 214, 137, C.k); R.rect(195, 134, 213, 136, H('#f2ead2')); R.rect(197, 132, 215, 135, H('#e8dcc0'));
  R.rect(142, 120, 154, 137, C.k); R.rect(145, 122, 151, 130, H('#f4e8b0')); R.rect(143, 130, 153, 136, H('#b08a3a')); R.pset(148, 126 - Math.round(Math.abs(Math.sin(t * 9))), H('#ff9a20'));
  if (juntas && t < CREW + 0.6) for (let k = 0; k < 4; k++) { const a2 = k * Math.PI / 2 + t * 4; R.pset(Math.round(212 + Math.cos(a2) * 7), Math.round(122 + Math.sin(a2) * 4), H('#fff4a0')); }
};
const año = (t) => t < ANOS ? 1861 : t < P4 ? Math.round(lerp(1861, 1867, lin(t, ANOS, P4))) : t < P5 ? 1867 : t < P6 ? 1868 : t < Y1872 + 0.3 ? Math.round(lerp(1868, 1872, lin(t, P6, Y1872 + 0.3))) : 1872;
const efectos = [[SPENCER, 'golpecito'], [CANADA, 'papel'], [P2 + 0.4, 'toc'], [LANZA, 'golpecito'], [LANZA + 1.0, 'chof'], [AMAZON, 'publico'], [MALA - 0.1, 'chof'],
  [ENFERMA + 0.8, 'golpecito'], [TORMENTA, 'trueno'], [VARA, 'ola'], [REPARA, 'toc'],
  [P5 + 0.5, 'lapiz'], [NOMBRE + 0.2, 'lapiz'], [MARY + 0.9, 'chof'], 
  [P7 + 0.4, 'tic'], [SERIO, 'papel'], [TRATA - 0.8, 'puerta'], [CREW, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['mc-familia'] = ('La familia', r'''// MC-FAMILIA (frase 6), 1872, sin cartela. Dos planos:
// 1. «Briggs didn't go alone. He brought his wife, Sarah, and their two-year-old daughter, Sophia»: la pasarela del
//    Mary Celeste; Briggs sube primero y se vuelve a dar la mano; Sarah sube con Sophia de la mano en «Sarah»; en
//    «Sophia» Briggs tiende la mano a la niña; en el muelle, Arthur y su abuela miran; el mozo deja la bolsa al pie.
// 2. «Their son Arthur, who was seven, stayed home with his grandmother so he could go to school»: la punta del muelle;
//    Arthur dice adiós con la mano, la abuela con la mano en su hombro; en «grandmother» se miran y sonríen; en «school» se
//    van hacia casa, él de su mano y con la cartera; al otro lado del río suena la campana de la escuela.''', PRE + r'''
const f = (k) => en('familia', k);
const P2 = f(0.5528);
const BRIGGS = f(0.0619), SARAH = f(0.238), SOPHIA = f(0.427), ARTHUR = f(0.6006), SIETE = f(0.678), CASA = f(0.751), ABUELA = f(0.8235), ESCUELA = f(0.951), COLE = f(0.90);
// ── 1 · la pasarela: suben Briggs, Sarah y Sophia ──────────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'muelle', camara: 'pasarela' };
  const g = T.puerto(R, t, o);
  const [x0, y0, x1, y1] = g.pasarela ?? [92, 160, 182, 106], borda = g.borda ?? 106, s = g.suelo ?? 162;
  const enPas = (u) => [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u];
  // la barandilla de cabo del lado de allá de la pasarela, con sus candeleros (la de acá va delante de los actores)
  const baranda = (dy, c) => { for (let k = 0; k <= 4; k++) { const [px, py] = enPas(k / 4); R.linea(Math.round(px), Math.round(py), Math.round(px), Math.round(py - 11 + dy), H('#5a4028')); }
    let [qx, qy] = enPas(0); for (let i = 1; i <= 16; i++) { const [nx, ny] = enPas(i / 16), cae = Math.sin((i % 4) / 4 * Math.PI) * 1.5; R.linea(Math.round(qx), Math.round(qy - 11 + dy), Math.round(nx), Math.round(ny - 11 + dy + cae), c); qx = nx; qy = ny; } };
  baranda(-3, H('#a89068'));
  // Arthur y la abuela en el muelle, mirando; Arthur saluda a su hermana
  R.actor(EL.abuelaMC, 18, s, t, { dir: 1, sostiene: [36, s - 12], sonrisa: t > SOPHIA });
  R.actor(EL.arthurMC, 36, s, t, { dir: 1, dedo: t > SOPHIA + 0.2 && Math.sin(t * 9) > -0.2, sonrisa: t > SARAH, habla: t > BRIGGS && t < SARAH && Math.sin(t * 9) > 0.3 });
  // Briggs: sube por la pasarela, pisa cubierta y se vuelve a tender la mano
  const ub = suave(lin(t, 0.2, BRIGGS + 1.2)), enCub = suave(lin(t, BRIGGS + 1.2, BRIGGS + 1.8));
  let bxF, byF; if (enCub < 0.01) [bxF, byF] = enPas(ub); else { bxF = lerp(x1, 200, enCub); byF = borda; }
  const tiende = t > SARAH + 0.4;
  // Sarah con Sophia: llegan por el muelle, suben; Sophia delante, de la mano
  const ll = suave(lin(t, BRIGGS, SARAH)), us = suave(lin(t, SARAH, SOPHIA + 0.9));
  let sxF, syF; if (us <= 0) { sxF = lerp(62, x0 - 4, ll); syF = s; } else [sxF, syF] = enPas(us * 0.72);
  let fxF, fyF; if (us <= 0) { fxF = sxF + 12; fyF = s; } else [fxF, fyF] = enPas(Math.min(0.9, us * 0.72 + 0.14));
  const Bg = R.actor(EL.briggsMC, Math.round(bxF - 7), Math.round(byF), t, { dir: enCub >= 1 ? -1 : 1, anda: (ub > 0 && ub < 1) || (enCub > 0 && enCub < 1), sostiene: tiende ? [Math.round(fxF + 7), Math.round(fyF - 12)] : undefined, sonrisa: t > SOPHIA - 0.2, habla: t > SARAH - 0.6 && t < SARAH + 0.3 && Math.sin(t * 8) > 0 });
  R.actor(EL.sophiaMC, Math.round(fxF - 7), Math.round(fyF), t, { dir: 1, anda: (ll > 0 && ll < 1) || (us > 0 && us < 1), sonrisa: t > SOPHIA, sorpresa: t > SOPHIA - 0.3 && t < SOPHIA });
  R.actor(EL.sarahMC, Math.round(sxF - 7), Math.round(syF), t, { dir: 1, anda: (ll > 0 && ll < 1) || (us > 0 && us < 1), sostiene: [Math.round(fxF - 3), Math.round(fyF - 9)], sonrisa: t > SARAH - 0.2, habla: t > SOPHIA + 0.4 && Math.sin(t * 7) > 0.2 });
  // el mozo, junto al pie de la pasarela, deja la bolsa de viaje en el suelo en «Sarah» y señala la pasarela
  const lleva = t < SARAH - 0.3, mzx = 112;
  const Mz = R.actor(EL.estibadorMC, mzx, s + 6, t, { dir: -1, sostiene: lleva ? [mzx - 1, s - 6] : undefined, sonrisa: t > SARAH, dedo: t > SOPHIA - 0.4 && t < SOPHIA + 0.8 });
  { const [bx, by] = lleva ? [Mz.mano[0], Mz.mano[1] + 4] : [mzx - 4, s + 2]; R.rect(bx - 5, by - 3, bx + 5, by + 4, C.k); R.rect(bx - 4, by - 2, bx + 4, by + 3, H('#7a3a2a')); R.rect(bx - 4, by - 2, bx + 4, by - 2, H('#9a5a3a')); R.rect(bx - 1, by - 5, bx + 1, by - 3, C.k); }
  baranda(0, H('#d8c090'));
  T.puertoDelante(R, t, o);
};
// ── 2 · la punta del muelle: Arthur y la abuela dicen adiós y se van al colegio ───────────────────────────────
const S2 = 150;   // el suelo de tablas de la punta del muelle
const muelleFondo = () => capa('punta', () => {
  cieloT(0, 92, cols('#a8b4c4', '#b4bec8', '#c0c8d0', '#ccd2d6', '#d8dcdc'));
  // la otra orilla: colinas, árboles, casas de madera y ladrillo, el campanario de la escuela, mástiles
  for (let x = 0; x < 320; x++) { const h = 10 + Math.round(4 * Math.sin(x * 0.05) + 2 * Math.sin(x * 0.17 + 1) + hs(x, 3) * 2); for (let y = 92 - h; y <= 92; y++) R.pset(x, y, tono(cols('#8a9aa0', '#7a8a8e', '#6a7a7c'), (y - 92 + h) / (h + 1), x, y)); }
  for (let i = 0; i < 22; i++) { const x = 8 + i * 14 + Math.round(hs(i, 1) * 6), w = 8 + Math.round(hs(i, 2) * 5), hh = 7 + Math.round(hs(i, 3) * 6), c = ['#a86a5a', '#c8b898', '#8a7a6a', '#b88a6a', '#9a9a8a'][i % 5];
    R.rect(x, 92 - hh, x + w, 92, H(c)); R.poligono([[x - 1, 92 - hh], [x + w + 1, 92 - hh], [x + w / 2, 92 - hh - 4]], H('#5a4a4a')); R.pset(x + 2, 92 - hh + 3, H('#e8e0c0')); if (w > 9) R.pset(x + w - 3, 92 - hh + 3, H('#5a6a7a')); }
  // el campanario blanco de la escuela
  R.rect(64, 60, 76, 92, H('#e8e4dc')); R.rect(64, 60, 64, 92, H('#c8c4bc')); R.poligono([[62, 60], [78, 60], [70, 46]], H('#6a5a5a')); R.rect(67, 64, 73, 72, H('#5a4a4a'));
  for (let i = 0; i < 12; i++) { const x = 196 + i * 9; R.linea(x, 92, x, 70 - (i % 3) * 4, H('#6a6a6a')); R.linea(x - 3, 76 - (i % 3) * 4, x + 3, 76 - (i % 3) * 4, H('#6a6a6a')); }
  // el agua del río
  for (let y = 93; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(cols('#9aa8b0', '#7e8e98', '#6a7a86', '#5a6a76', '#4a5a66'), (y - 93) / 87, x, y));
  // el muelle de tablas que entra desde la izquierda, sus pilotes y la escala
  R.rect(0, S2 - 2, 214, S2 + 6, C.k); madera(0, S2 - 1, 213, S2 + 5, cols('#4a3420', '#7a5a3a', '#9a7a52'), 3, 3);
  for (let x = 4; x < 214; x += 18) R.pset(x, S2 - 1, H('#2a1a0e'));
  for (const x of [8, 52, 96, 140, 184, 208]) { R.rect(x, S2 + 6, x + 6, 180, C.k); for (let y = S2 + 7; y < 180; y++) for (let xx = x + 1; xx < x + 6; xx++) R.pset(xx, y, y > 168 ? H('#3a4a3a') : tono(cols('#7a5a3a', '#5a4028', '#3e2c1a'), (xx - x) / 6, xx, y)); }
  for (let y = S2 + 8; y < 180; y += 6) { R.linea(14, y, 52, y + 5, H('#4a3420')); R.linea(102, y, 140, y + 5, H('#4a3420')); }
  // el noray de la punta, el farol, cajas y un cesto
  R.rect(196, S2 - 12, 206, S2 - 2, C.k); R.rect(197, S2 - 11, 205, S2 - 2, H('#3a3a44')); R.rect(195, S2 - 13, 207, S2 - 11, H('#2a2a30')); R.pset(199, S2 - 9, H('#6a6a74'));
  R.rect(14, S2 - 46, 16, S2 - 2, H('#2a2a30')); R.rect(10, S2 - 56, 20, S2 - 46, C.k); R.rect(11, S2 - 55, 19, S2 - 47, H('#e8d8a0')); R.poligono([[9, S2 - 56], [21, S2 - 56], [15, S2 - 61]], H('#2a2a30'));
  R.rect(28, S2 - 16, 50, S2 - 2, C.k); R.rect(29, S2 - 15, 49, S2 - 2, H('#a87a48')); R.rect(29, S2 - 9, 49, S2 - 9, H('#7a5030')); R.linea(29, S2 - 15, 49, S2 - 3, H('#7a5030'));
  R.rect(110, S2 - 8, 124, S2 - 2, C.k); R.rect(111, S2 - 7, 123, S2 - 2, H('#c8a868')); for (let x = 112; x < 123; x += 2) R.pset(x, S2 - 5, H('#8a6a3a'));
  R.disco(186, S2 - 4, 5, C.k); R.disco(186, S2 - 4, 4, H('#c8b080')); R.anillo(186, S2 - 4, 2, H('#8a7050'));
});
const p2 = (t) => {
  muelleFondo();
  nubes(t, [[10, 30, 70, 2], [160, 42, 60, 3.5], [280, 56, 50, 6], [90, 64, 44, 8]], cols('#f0f2f4', '#d4d8de', '#a8b0ba'), (x, y) => y > 78);
  for (let k = 0; k < 3; k++) pajaro(((t * (12 + k * 4) + k * 110) % 360) - 20, 40 + k * 10 + Math.sin(t * 2 + k) * 3, t, H('#4a4a54'));
  // los reflejos que corren por el agua
  for (let i = 0; i < 70; i++) { const y = 96 + ((i * 37) % 84), x = Math.round((hs(i, 1) * 360 + t * (4 + (y - 96) * 0.1)) % 360) - 20, l = 2 + (i % 3); if (x > 0 && y < 180) R.linea(x, y, x + l, y, y > 140 ? H('#7e909c') : H('#c4d0d8')); }
  // el humo de un remolcador lejano
  for (let i = 0; i < 5; i++) { const v = (t * 0.25 + i * 0.2) % 1; R.disco(Math.round(150 - v * 20), Math.round(86 - v * 26), 2 + v * 3, mez(H('#7a7a80'), H('#c8ccd0'), v)); }
  R.rect(146, 88, 160, 92, H('#2a2a30')); R.rect(150, 84, 152, 88, H('#8a2a22'));
  // la boya que cabecea, los patos que nadan y la gaviota posada en el pilote
  { const by = 126 + Math.round(Math.sin(t * 2.3) * 1.5), bx = 236; R.poligono([[bx - 5, by], [bx + 5, by], [bx + 3, by - 8], [bx - 3, by - 8]], C.k); R.poligono([[bx - 4, by - 1], [bx + 4, by - 1], [bx + 2, by - 7], [bx - 2, by - 7]], H('#c83a2a')); R.rect(bx - 3, by - 4, bx + 3, by - 4, H('#f2eee2')); R.linea(bx - 7, by + 1, bx + 7, by + 1, H('#c4d0d8')); }
  for (let k = 0; k < 3; k++) { const dx = Math.round(lerp(300, 214, lin(t, P2, E.duracion + 2)) + k * 9), dy = 112 + k * 2 + Math.round(Math.sin(t * 3 + k) * 0.6);
    R.rect(dx, dy, dx + 5, dy + 2, C.k); R.rect(dx + 1, dy, dx + 4, dy + 1, k ? H('#8a6a4a') : H('#5a6a4a')); R.rect(dx - 1, dy - 3, dx + 1, dy, C.k); R.pset(dx, dy - 2, k ? H('#8a6a4a') : H('#2a6a3a')); R.pset(dx - 2, dy - 2, H('#e8b030')); R.linea(dx + 6, dy + 2, dx + 10, dy + 2, H('#c4d0d8')); }
  { const gy = S2 - 10, sac = Math.floor(t * 1.3) % 4 === 0 ? 1 : 0; R.rect(210, gy, 214, gy + 4, H('#f2f2ee')); R.rect(209, gy + 1, 212, gy + 3, H('#9a9aa4')); R.pset(215 - sac, gy - 1, H('#f2f2ee')); R.pset(216 - sac, gy - 1, H('#e8b030')); R.pset(211, gy + 5, H('#e8b030')); R.pset(213, gy + 5, H('#e8b030')); }
  // el Mary Celeste, lejos, en el otro muelle (secundario)
  bergantin(262, 112, 0.62, { dir: -1, velas: 0, t });
  // la campana de la escuela que suena en «school»
  const cb = t > COLE ? Math.sin((t - COLE) * 12) * suave(1 - lin(t, COLE + 1.2, COLE + 1.8)) : 0;
  R.disco(Math.round(70 + cb * 2), 68, 2, H('#c8a040')); R.pset(Math.round(70 + cb * 3), 70, H('#8a6a2a'));
  // el bote de remos que cruza por delante del muelle
  const bt = lin(t, P2 - 0.5, E.duracion + 1), btx = Math.round(lerp(330, 210, bt)), bty = 166 + Math.round(Math.sin(t * 2) * 1);
  R.actor(EL.marineroMC, btx - 7, bty + 9, t, { dir: -1, sostiene: [btx - 10 + Math.round(Math.cos(t * 4) * 3), bty - 2] });
  R.poligono([[btx - 15, bty - 1], [btx + 15, bty - 1], [btx + 11, bty + 6], [btx - 11, bty + 6]], C.k); R.poligono([[btx - 14, bty], [btx + 14, bty], [btx + 10, bty + 5], [btx - 10, bty + 5]], H('#8a5a3a')); R.linea(btx - 13, bty, btx + 13, bty, H('#c8a060')); R.linea(btx - 11, bty + 3, btx + 11, bty + 3, H('#6a4028'));
  R.linea(btx - 10 + Math.round(Math.cos(t * 4) * 3), bty - 2, btx - 20 + Math.round(Math.cos(t * 4) * 5), bty + 8, H('#c8a060'));
  R.linea(btx - 22, bty + 8, btx - 16, bty + 7, H('#e0ecf0'));
  // Arthur dice adiós; la abuela con la mano en su hombro; se miran en «grandmother»; coge los libros y se van
  const mira = t > ABUELA - 0.2, van = suave(lin(t, ESCUELA - 0.7, E.duracion + 1.5));
  const gx = Math.round(150 - van * 120), ax = Math.round(170 - van * 116);
  const adios = t < CASA && t > P2 + 0.2;
  // la abuela: la mano en el hombro de Arthur mientras dice adiós; se miran en «grandmother»; se vuelve y echa a andar
  R.actor(EL.abuelaMC, gx, S2, t, { dir: van > 0 ? -1 : 1, anda: van > 0, sostiene: !mira ? [ax + 5, S2 - 15] : undefined, sonrisa: true, habla: t > CASA - 0.2 && t < ABUELA && Math.sin(t * 7) > 0.2 });
  // Arthur: dice adiós con la mano; se vuelve hacia su abuela; luego la sigue cogido de su mano, con la cartera del colegio
  const A = R.actor(EL.arthurMC, ax, S2, t, { dir: mira ? -1 : 1, anda: van > 0, brazos: adios && Math.floor(t * 5) % 2 === 0, dedo: adios && Math.floor(t * 5) % 2 === 1, sonrisa: t > SIETE || mira, habla: t > ARTHUR && t < SIETE && Math.sin(t * 8) > 0.4, sostiene: van > 0 ? [gx + 13, S2 - 11] : undefined });
  { const cx = mira ? ax + 11 : ax + 1, cy = S2 - 11; R.rect(cx, cy, cx + 5, cy + 5, C.k); R.rect(cx + 1, cy + 1, cx + 4, cy + 4, H('#7a4a2a')); R.rect(cx + 1, cy + 1, cx + 4, cy + 1, H('#9a6a3a')); R.linea(cx + 2, cy, ax + 7, S2 - 20, H('#5a3a22')); }
  if (mira && van <= 0 && t > ABUELA + 0.2) { const k = Math.sin(t * 2) > 0; R.pset(ax + 3, S2 - 27 - (k ? 1 : 0), H('#e86a7a')); R.pset(ax + 4, S2 - 27 - (k ? 1 : 0), H('#e86a7a')); }
};
const efectos = [[SARAH, 'toc'], [SOPHIA, 'pop'], [COLE, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 1872 });
''')
