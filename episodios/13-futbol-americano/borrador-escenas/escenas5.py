# Borrador de escenas del ep13, grupo 5: fa-forma, fa-giro, fa-enigma, fa-deriva (acto 2, «Por qué gira»).
E = {}

# ── piezas comunes de las cuatro escenas (van dentro de cada escena) ─────────────────────────────────────────────────
H = r'''
const K = hex('#1a1420'), BL = hex('#ffffff'), CI = hex('#8ad8f0'), CIs = hex('#2a6a90'), AM = hex('#f0d878'), RO = hex('#e04a3a'), ROs = hex('#7a1e1e');
const hs = (a, b, c = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return s - Math.floor(s); };
// un punto de un pase en parábola (u 0–1) y la tangente: [x, y, ángulo]
const arco = (u, x0, y0, x1, y1, h) => { const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - h * 4 * u * (1 - u); return [x, y, Math.atan2((y1 - y0) - h * 4 * (1 - 2 * u), x1 - x0)]; };
// flecha de un píxel con su punta, y la gruesa con sombra
const flecha = (x0, y0, x1, y1, c, s = 3) => { R.linea(x0, y0, x1, y1, c); const a = Math.atan2(y1 - y0, x1 - x0);
  R.linea(x1, y1, Math.round(x1 - Math.cos(a - 0.55) * s), Math.round(y1 - Math.sin(a - 0.55) * s), c); R.linea(x1, y1, Math.round(x1 - Math.cos(a + 0.55) * s), Math.round(y1 - Math.sin(a + 0.55) * s), c); };
const flechaG = (x0, y0, x1, y1, c, cs = K) => { for (const [dx, dy] of [[1, 1], [1, 2], [0, 2]]) flecha(x0 + dx, y0 + dy, x1 + dx, y1 + dy, cs, 5); flecha(x0, y0, x1, y1, c, 5); flecha(x0, y0 + 1, x1, y1 + 1, c, 5); };
// oscurece un rectángulo (luz apagada), píxel a píxel, respetando lo que hay
const oscurece = (x0, y0, x1, y1, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const c = R.pget(x, y);
  R.pset(x, y, ((255 << 24) | (Math.round(((c >> 16) & 255) * a) << 16) | (Math.round(((c >> 8) & 255) * a) << 8) | Math.round((c & 255) * a)) >>> 0); } };
const mezcla = (c, d, a) => ((255 << 24) | (Math.round(((c >> 16) & 255) * (1 - a) + ((d >> 16) & 255) * a) << 16) | (Math.round(((c >> 8) & 255) * (1 - a) + ((d >> 8) & 255) * a) << 8) | Math.round((c & 255) * (1 - a) + (d & 255) * a)) >>> 0;
const aclara = (x, y, c, a) => R.pset(x, y, mezcla(R.pget(x, y), c, a));
// líneas de viento que corren (el aire que llega): n rachas de un píxel en la caja, en la dirección (dx, dy)
const rachas = (x0, y0, x1, y1, t, dx, dy, n, c, vel = 60, largo = 8) => { for (let k = 0; k < n; k++) { const w = x1 - x0, hh = y1 - y0, f = ((hs(k, 1) * w + t * vel) % w + w) % w;
  const x = dx > 0 ? x0 + f : x1 - f, y = y0 + hs(k, 2) * hh + (dy * f) / Math.max(1, Math.abs(dx)) * 0; const l = largo * (0.6 + hs(k, 3) * 0.8);
  R.linea(Math.round(x), Math.round(y), Math.round(x - dx * l), Math.round(y - dy * l), (k % 3) ? c : BL); } };
// un balón de una época intermedia (pintado aquí, con el mismo sombreado de cuatro tonos que T.balon)
const PELOTA = { '1924': { L: 6.4, W: 3.9, pu: 0.62, cu: ['#4e2812', '#743c1c', '#9a5628', '#bc743e', '#e2a870'], co: ['#f2eadc', '#bcae94'], bo: '#2a160a' },
  '1934': { L: 6.2, W: 3.6, pu: 0.85, cu: ['#4a2010', '#70341a', '#964a26', '#b8683a', '#e6a070'], co: ['#f6f0e4', '#c4b8a0'], bo: '#28120a' } };
for (const k in PELOTA) { PELOTA[k].cu = PELOTA[k].cu.map(hex); PELOTA[k].co = PELOTA[k].co.map(hex); PELOTA[k].bo = hex(PELOTA[k].bo); }
const pelota = (x, y, ep, s, ang = 0) => { const e = PELOTA[ep], L = e.L * s, W = e.W * s, ca = Math.cos(ang), sa = Math.sin(ang), rb = Math.ceil(L + 1);
  for (let py = Math.floor(y - rb); py <= Math.ceil(y + rb); py++) for (let px = Math.floor(x - rb); px <= Math.ceil(x + rb); px++) {
    const dx = px + 0.5 - x, dy = py + 0.5 - y, u = (dx * ca + dy * sa) / L, v = -dx * sa + dy * ca, a = Math.abs(u); if (a >= 1) continue;
    const r = W * ((1 - e.pu) * Math.sqrt(1 - a * a) + e.pu * (1 - a * a)); if (Math.abs(v) >= r) continue;
    if (r - Math.abs(v) < 0.9 || (1 - a) * L < 0.8) { R.pset(px, py, e.bo); continue; }
    const nv = v / r, nu = u * 0.7, nz = Math.sqrt(Math.max(0, 1 - nv * nv - nu * nu * 0.5)), nx = nu * ca - nv * sa, ny = nu * sa + nv * ca, luz = Math.max(0, -0.5 * nx - 0.72 * ny + 0.48 * nz);
    let q = 0.25 + luz * 3.1 + (hs(px, py, 7) - 0.5) * 0.8; let c = e.cu[Math.max(0, Math.min(3, Math.floor(q)))]; if (luz > 0.92) c = e.cu[4];
    const d = v + r * 0.32; if (a < 0.44 && Math.abs(d) < 0.7 * s) c = e.co[1]; else if (a < 0.44 && Math.abs(d) < 1.5 * s && ((u * L / (1.6 * s)) % 1 + 1) % 1 < 0.45) c = e.co[0];
    else if (Math.abs(v - r * 0.35) < 0.35 * s && a < 0.9) c = e.cu[Math.max(0, Math.floor(q) - 2)];
    R.pset(px, py, c); } };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-forma'] = ('La forma', '''// FA-FORMA (frases 14–15), sin cartela. Seis planos:
// 1. (0–«version») un partido de hacia 1914 en el campo de pueblo: Dorais lanza y Rockne atrapa el pase («caught on»); el
//    público se levanta; Rockne enseña el balón gordo («slimmer»);
// 2. («version»–«which») el museo: cinco balones en la vitrina, del gordo de 1906 al de hoy; los focos se encienden uno a
//    uno con cada «version» y el de hoy brilla en «pointed shape»; una visitante y su hijo, que lo señala;
// 3. («which»–«But») el estadio de noche: el quarterback lanza una espiral que corta el aire con sus líneas de viento,
//    recta como una bala («bullet»), y el receptor la atrapa;
// 4. («But»–«Sends») el campo de entrenamiento: el entrenador avisa («problem»), el novato lanza sin giro («without spin»),
//    el aire empuja una punta («pushes on one end») y el balón empieza a voltearse;
// 5. («Sends»–«which») el parque: el balón llega dando volteretas, pierde velocidad, cae al estanque junto al pato, que lo
//    mira ofendido («wounded duck», gag 3);
// 6. («which»–fin) el estadio cubierto: un pase que bambolea, cae corto y bota; el receptor se tira en vano: «X».''', H + r'''
const a = (f) => en('forma', f), b = (f) => en('pato', f);
const P2 = a(0.291), P3 = a(0.704), P4 = b(0), P5 = b(0.455), P6 = b(0.772);
// 1 · el pase que se pone de moda: Dorais lanza hacia 1914 y Rockne atrapa
const lanza1 = 0.95, atrapa1 = a(0.06);
const p1 = (t) => {
  T.campo1906(R, t, { animo: tramo(t, atrapa1, atrapa1 + 0.6) * (1 - tramo(t, P2 - 1, P2) * 0.4) });
  const rx = Math.round(lerp(196, 246, tramo(t, 0.1, atrapa1)));
  // dos defensores que llegan tarde
  for (const [k, x0] of [[0, 150], [1, 168]]) { const u = tramo(t, 0.4 + k * 0.2, atrapa1 + 0.8); R.actor(EL.jugador1905, Math.round(lerp(x0, rx - 22 + k * 8, u)), 156 + k * 8, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > atrapa1 + 0.3 }); }
  const qx = Math.round(lerp(96, 84, tramo(t, 0.1, 0.7)));
  const m = R.actor(EL.dorais, qx, 150, t, { dir: 1, anda: t > 0.1 && t < 0.7, dedo: t > 0.45 && t < lanza1 + 0.25, sonrisa: t > atrapa1 });
  const r = R.actor(EL.rockne, rx, 140, t, { dir: -1, anda: t < atrapa1 - 0.1, brazos: t > atrapa1 - 0.25 && t < atrapa1 + 0.5, dedo: t > a(0.17), sonrisa: t > atrapa1, salto: t > atrapa1 - 0.2 && t < atrapa1 + 0.15 ? 2 : 0 });
  if (t < lanza1) T.balon(R, m.mano[0], m.mano[1] + 2, t, { epoca: '1913', ang: -0.5 });
  else if (t < atrapa1) { const [x, y, an] = arco(tramo(t, lanza1, atrapa1), qx + 15, 120, rx + 4, 118, 38); T.balon(R, Math.round(x), Math.round(y), t, { epoca: '1913', ang: an, gira: 3 }); }
  else if (t < a(0.17)) T.balon(R, rx + 8, 120, t, { epoca: '1913', ang: 0 });
  else { const [hx, hy] = r.mano; T.balon(R, hx, hy - 3, t, { epoca: '1913', ang: -0.3, gira: 0.4 }); }
};
// 2 · el museo: los cinco balones, del gordo al estilizado (se tapan los cascos de la vitrina y se ponen balones)
const ENC = [a(0.29), a(0.346), a(0.437), a(0.489), a(0.597)];   // version · version · until · today's · pointed
const EPOCAS = ['1906', '1913', '1924', '1934', 'hoy'], AÑOS = ['1906', '1913', '1924', '1934', '2026'];
const p2 = (t) => {
  T.labCasco(R, t, { encuadre: 'vitrina', años: false });
  [60, 106, 152, 198, 244].forEach((cx, i) => {
    // el casco de la vitrina se tapa con la tela de encima (la tela tiene los pliegues verticales: se copia de arriba sin que se note)
    const px = []; for (let y = 62; y <= 96; y++) for (let x = cx - 17; x <= cx + 15; x++) px.push([x, y, R.pget(x, y - 32)]);
    for (const [x, y, c] of px) R.pset(x, y, c);
    // el soporte de latón y el balón de su época
    R.rect(cx - 2, 90, cx + 2, 97, K); R.rect(cx - 1, 90, cx + 1, 96, hex('#c8983a')); R.pset(cx - 1, 90, hex('#f0d080'));
    R.linea(cx - 7, 89, cx - 4, 92, K); R.linea(cx + 7, 89, cx + 4, 92, K); R.linea(cx - 4, 92, cx + 4, 92, hex('#a8782a'));
    const s = 1.5, ang = -0.12 + Math.sin(t * 0.4 + i) * 0.03;
    if (EPOCAS[i] === '1924' || EPOCAS[i] === '1934') pelota(cx, 82, EPOCAS[i], s, ang);
    else T.balon(R, cx, 82, t, { epoca: EPOCAS[i], s, ang, giro: i === 4 ? t * 0.12 : 0.05 * i });
    // su placa con el año
    R.numero(AÑOS[i], cx, 136, { centro: true, color: hex('#3a2410'), sombra: false, fina: true });
    // los focos que se encienden uno a uno (el de los dos primeros ya lo está): lo apagado queda en penumbra
    const on = tramo(t, ENC[i] - 0.1, ENC[i] + 0.15);
    if (i >= 2 && on < 1) oscurece(cx - 22, 29, cx + 22, 118, 0.45 + 0.55 * on);
  });
  // el brillo del de hoy en «pointed shape»
  const br = tramo(t, ENC[4], ENC[4] + 0.6); if (br > 0 && br < 1) { const x = 244 + 10, y = 80, r = Math.round(2 + br * 5); R.linea(x - r, y, x + r, y, BL); R.linea(x, y - r, x, y + r, BL); R.pset(x, y, AM); }
  // la visitante con su hijo, que entran por el pasillo y se paran ante el balón de hoy; el niño lo señala
  const u = tramo(t, P2 + 0.2, a(0.5));
  R.actor(EL.obrera, Math.round(lerp(300, 214, u)), 170, t, { dir: -1, anda: u > 0 && u < 1, habla: t > a(0.62) && Math.sin(t * 7) > 0 });
  R.actor(EL.recogepelotas, Math.round(lerp(318, 236, u)), 172, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > ENC[4] - 0.1, sonrisa: t > ENC[4], salto: t > ENC[4] && t < ENC[4] + 0.3 ? 2 : 0 });
  // un señor mayor que mira los balones viejos, con las manos atrás
  R.actor(EL.periodista, Math.round(lerp(64, 96, tramo(t, P2 + 0.5, P3 - 0.6))), 168, t, { dir: 1, anda: t > P2 + 0.5 && t < P3 - 0.6, sorpresa: t > ENC[2] && t < ENC[2] + 0.8 });
};
// 3 · la espiral de hoy, que corta el aire como una bala
const lanza3 = P3 + 0.45, atrapa3 = a(0.95);
const p3 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'noche' });
  const ru = tramo(t, P3, atrapa3);
  R.actor(EL.liniero, Math.round(lerp(150, 214, ru)), 156, t, { dir: 1, anda: ru < 1, enfado: t > atrapa3 });
  const rx = Math.round(lerp(180, 240, ru));
  const r = R.actor(EL.receptor, rx, 146, t, { dir: -1, anda: t < atrapa3 - 0.2, brazos: t > atrapa3 - 0.3 && t < atrapa3 + 0.4, sonrisa: t > atrapa3, salto: t > atrapa3 + 0.4 && t < atrapa3 + 0.8 ? 3 : 0 });
  const q = R.actor(EL.quarterback, Math.round(lerp(76, 66, tramo(t, P3, lanza3))), 150, t, { dir: 1, anda: t < lanza3 - 0.2, dedo: t > lanza3 - 0.4 && t < lanza3 + 0.3, sonrisa: t > atrapa3 });
  if (t < lanza3) T.balon(R, q.mano[0], q.mano[1] + 2, t, { ang: -0.6, gira: 2 });
  else if (t < atrapa3) { const u = tramo(t, lanza3, atrapa3), [x, y, an] = arco(u, 84, 118, rx + 6, 114, 78); T.balon(R, Math.round(x), Math.round(y), t, { s: 1.8, ang: an, gira: 10, estela: 2.2, dirEstela: an }); }
  else T.balon(R, r.mano[0] - 2, r.mano[1], t, { ang: 0 });
  T.h_estadioDelante(R, t, { encuadre: 'noche' });
};
// 4 · el problema: sin giro, el aire empuja una punta
const lanza4 = b(0.2), empuja = b(0.32);
const p4 = (t) => {
  T.labCasco(R, t, { encuadre: 'entreno' });
  // el entrenador del silbato, que avisa del problema y luego mira el desastre
  R.actor(EL.tecnico, 96, 172, t, { dir: 1, dedo: t > b(0.07) && t < b(0.15), habla: t > P4 && t < b(0.1) && Math.sin(t * 8) > 0, sorpresa: t > empuja + 0.4 });
  const q = R.actor(EL.quarterback, Math.round(lerp(150, 128, tramo(t, P4 + 0.2, lanza4 - 0.6))), 166, t, { dir: 1, anda: t > P4 + 0.2 && t < lanza4 - 0.6, dedo: t > lanza4 - 0.5 && t < lanza4 + 0.3, triste: t > empuja + 0.6 });
  R.actor(EL.receptor, 238, 160, t, { dir: -1, brazos: t > lanza4 && t < empuja + 0.3, sorpresa: t > empuja + 0.2 });
  if (t < lanza4) T.balon(R, q.mano[0], q.mano[1] + 2, t, { ang: -0.4 });
  else { const u = tramo(t, lanza4, P5 + 0.4), [x, y, an] = arco(u * 0.82, 146, 132, 236, 140, 60);
    // sin giro: el eje se queda quieto hasta que el aire empuja la punta y empieza la voltereta
    const vu = tramo(t, empuja, P5), ang = -0.75 + vu * vu * 4.5;
    T.balon(R, Math.round(x), Math.round(y), t, { s: 1.4, ang, giro: 0 });
    // el aire que llega (rachas) y la flecha que empuja la punta de atrás hacia arriba
    if (t > lanza4 + 0.3) rachas(Math.round(x) + 14, Math.round(y) - 12, Math.round(x) + 52, Math.round(y) + 10, t, -1, 0, 6, CI, 70, 6);
    const fe = tramo(t, empuja - 0.2, empuja + 0.2) * (1 - tramo(t, P5 - 0.6, P5 - 0.2));
    if (fe > 0) { const ex = x - Math.cos(ang) * 9, ey = y - Math.sin(ang) * 9; flechaG(Math.round(ex - 2), Math.round(ey + 14), Math.round(ex - 1), Math.round(ey + 14 - 10 * fe), CI, CIs); }
  }
};
// 5 · el pato herido: el balón llega dando volteretas, frena y cae al agua junto al pato, que lo mira ofendido (gag 3)
const cae5 = b(0.68), mira5 = b(0.69);
const p5 = (t) => {
  const G = T.labGiro(R, t, { encuadre: 'parque' });
  const [px, py] = G.pato;
  // el balón: entra por la izquierda alto, frena (cada vez menos avance) y cae
  const u = tramo(t, P5, cae5), x = lerp(-10, px + 14, 1 - (1 - u) ** 2.2), y = lerp(44, py - 2, u ** 2.4) - Math.sin(u * Math.PI) * 10;
  if (t < cae5) T.balon(R, Math.round(x), Math.round(y), t, { s: 1.3, volteretas: true });
  else { const b2 = Math.sin((t - cae5) * 3) * 1; T.balon(R, px + 14, py + 1 + Math.round(b2), t, { s: 1.2, ang: 0.2 + Math.sin((t - cae5) * 2) * 0.1 });
    // la salpicadura y las ondas
    const sp = tramo(t, cae5, cae5 + 0.7); if (sp < 1) for (let k = 0; k < 9; k++) { const an = -Math.PI * (0.1 + 0.8 * k / 8), d = sp * 14; R.pset(Math.round(px + 14 + Math.cos(an) * d), Math.round(py - 2 + Math.sin(an) * d * 1.3 + sp * sp * 12), k % 2 ? BL : CI); }
    for (let k = 0; k < 2; k++) { const w = ((t - cae5) * 0.7 + k * 0.5) % 1, rx = 6 + w * 16; for (let an = 0; an < 6.28; an += 0.3) if (Math.sin(an * 3 + t) > -0.3) R.pset(Math.round(px + 14 + Math.cos(an) * rx), Math.round(py + 3 + Math.sin(an) * rx * 0.22), hex('#a8d8f0')); } }
  const hd = T.e_pato(R, px, py, t, tramo(t, mira5 - 0.3, mira5 + 0.2), { dir: 1 });
  if (t > mira5 + 0.3 && t < mira5 + 1.6) R.bocadillo(hd[0] - 2, hd[1] - 8, { icono: '!' });
  // dos estudiantes en el césped que se dan la vuelta al oír el chapuzón
  R.actor(EL.tecnica, 40, 172, t, { dir: 1, sorpresa: t > cae5 + 0.1, habla: t < cae5 && Math.sin(t * 6) > 0.3 });
  R.actor(EL.obrero, 62, 174, t, { dir: -1, sorpresa: t > cae5 + 0.2, dedo: t > cae5 + 0.6 });
};
// 6 · lo que los jugadores llaman un mal pase: el balón bambolea, cae corto y bota
const lanza6 = P6 + 0.35, bota6 = b(0.92);
const p6 = (t) => {
  T.estadioPatada(R, t, { encuadre: 'pateo', linea: false });
  const q = R.actor(EL.quarterback, 70, 147, t, { dir: 1, dedo: t > lanza6 - 0.4 && t < lanza6 + 0.3, triste: t > bota6 + 0.2 });
  const ru = tramo(t, P6, bota6), rx = Math.round(lerp(150, 196, ru));
  R.actor(EL.receptor, rx, 158, t, { dir: -1, anda: ru > 0 && ru < 0.9, salto: t > bota6 - 0.35 && t < bota6 + 0.1 ? 4 : 0, triste: t > bota6 + 0.2 });
  R.actor(EL.liniero, Math.round(lerp(240, 214, ru)), 162, t, { dir: -1, anda: ru > 0 && ru < 1, sonrisa: t > bota6 });
  if (t < lanza6) T.balon(R, q.mano[0], q.mano[1] + 2, t, { ang: -0.5 });
  else if (t < bota6) { const [x, y] = arco(tramo(t, lanza6, bota6), 88, 120, 170, 150, 34); T.balon(R, Math.round(x), Math.round(y), t, { volteretas: true, fase: 1 }); }
  else { const v = tramo(t, bota6, bota6 + 1.4), x = lerp(170, 150, v), y = 150 - Math.abs(Math.sin(v * Math.PI * 2.5)) * 14 * (1 - v); T.balon(R, Math.round(x), Math.round(y), t, { ang: v * 9, s: 1 }); }
  if (t > bota6 && t < bota6 + 1.5 && Math.floor(t * 5) % 2 === 0) { R.icono('X', 166, 118, RO, K, 2); }
};
const efectos = [[lanza1, 'whoosh'], [atrapa1 + 0.1, 'palmada'], [ENC[2], 'interruptor'], [ENC[4], 'brillo'], [lanza3, 'whoosh'], [atrapa3, 'golpecito'],
  [b(0.08), 'silbato'], [empuja, 'rafaga'], [cae5, 'chof'], [lanza6, 'whoosh'], [bota6, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < ENC[2] ? 1913 : t < ENC[3] ? 1924 : t < ENC[4] ? 1934 : 2026) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-giro'] = ('El giro', '''// FA-GIRO (frase 16), sin cartela. Dos planos:
// 1. (0–«turns») el túnel de viento: la técnica enciende el motor («spin»), el balón empieza a girar sobre su eje largo
//    con la flecha que lo rodea («rolling it around its long axis») y el contador sube hasta 600 («600»); el físico lo
//    señala; la peonza de la mesa gira a su lado;
// 2. («turns»–fin) la mesa: el giroscopio del laboratorio se marca en «gyroscope»; la peonza grande gira («spinning top»);
//    una canica rueda por la mesa y le da en «tipped over»: la peonza se inclina un poco y se endereza.''', H + r'''
const g = (f) => en('giro', f), P2 = g(0.474);
const enciende = g(0.02), gira = g(0.039), seis = g(0.327);
const p1 = (t) => {
  const giro = tramo(t, gira, seis), o = T.labGiro(R, t, { encuadre: 'tunel', giro, precesion: 0, rpm: Math.round(600 * giro), peonza: true });
  // la flecha del giro alrededor del eje largo, dentro de la cámara de ensayo
  const fa = tramo(t, g(0.11), g(0.15)) * (1 - tramo(t, P2 - 0.5, P2));
  if (fa > 0) { R.recorte([99, 65, 203, 101]); const [bx, by] = o.bola, an = o.ang, ca = Math.cos(an), sa = Math.sin(an);
    for (let k = -30; k <= 30; k += 3) if (Math.abs(k) > 15 || k % 6 === 0) R.pset(Math.round(bx + ca * k), Math.round(by + sa * k), k % 2 ? CI : BL);   // el eje
    const cx = bx - ca * 11, cy = by - sa * 11, fi = t * 6;
    for (let s = 0; s < Math.PI * 1.6 * fa; s += 0.12) { const e = s + fi, px = cx + (-sa) * Math.cos(e) * 11 + ca * Math.sin(e) * 2.5, py = cy + ca * Math.cos(e) * 11 + sa * Math.sin(e) * 2.5; R.pset(Math.round(px), Math.round(py), AM); R.pset(Math.round(px), Math.round(py) + 1, hex('#a8782a')); }
    const e = fi + Math.PI * 1.6 * fa, px = cx + (-sa) * Math.cos(e) * 11 + ca * Math.sin(e) * 2.5, py = cy + ca * Math.cos(e) * 11 + sa * Math.sin(e) * 2.5; R.disco(Math.round(px), Math.round(py), 1, AM);
    R.recorte(null); }
  // el «600» que salta del contador
  const s6 = tramo(t, seis, seis + 0.5); if (s6 > 0 && t < P2 - 0.3) { R.numero('600', 150, Math.round(lerp(120, 112, s6)), { centro: true }); if (Math.floor(t * 6) % 2) { R.rect(132, 109, 168, 109, AM); R.rect(132, 123, 168, 123, AM); } }
  // la técnica enciende el motor desde el carro y se aparta; el físico se acerca y señala el contador
  const tu = tramo(t, enciende + 0.6, g(0.3));
  R.actor(EL.tecnica, Math.round(lerp(176, 118, tu)), 166, t, { dir: tu > 0 && tu < 1 ? -1 : 1, anda: tu > 0 && tu < 1, dedo: t < enciende + 0.5, sonrisa: t > seis });
  const fu = tramo(t, g(0.12), seis - 0.3);
  R.actor(EL.fisico, Math.round(lerp(100, 150, fu)), 174, t, { dir: 1, anda: fu > 0 && fu < 1, dedo: t > seis - 0.2 && t < P2 - 0.6, habla: t > seis + 0.4 && Math.sin(t * 7) > 0, sorpresa: t > gira + 0.3 && t < gira + 1 });
};
// 2 · la mesa: el giroscopio, la peonza y la canica que no la tumba
const giros = g(0.588), peonza = g(0.715), golpe = g(0.931);
const p2 = (t) => {
  const go = tramo(t, golpe, golpe + 0.25) * (1 - tramo(t, golpe + 0.25, golpe + 1.6));
  // la peonza: con el golpe se inclina más (la precesión crece) y se recupera
  const m = T.labGiro(R, t, { encuadre: 'mesa', precesion: 0.55 + go * 0.9, periodo: 4.5, giro: 1, rastro: true });
  // el giroscopio del laboratorio, marcado con su flecha circular en «gyroscope»
  const gy = tramo(t, giros - 0.1, giros + 0.4) * (1 - tramo(t, giros + 2.2, giros + 2.8));
  if (gy > 0) for (let s = 0; s < Math.PI * 1.7 * gy; s += 0.1) { const e = s + t * 2, x = Math.round(262 + Math.cos(e) * 22), y = Math.round(114 + Math.sin(e) * 9); R.pset(x, y, CI); R.pset(x, y + 1, CIs); if (s + 0.1 >= Math.PI * 1.7 * gy) flecha(x - Math.round(Math.sin(e) * 4), y + Math.round(Math.cos(e) * 2), x, y, CI); }
  // y la peonza en «spinning top»
  const pz = tramo(t, peonza - 0.1, peonza + 0.3) * (1 - tramo(t, golpe - 0.6, golpe - 0.2));
  if (pz > 0) for (let s = 0; s < Math.PI * 1.7 * pz; s += 0.08) { const e = s - t * 1.5, x = Math.round(160 + Math.cos(e) * 30), y = Math.round(160 + Math.sin(e) * 8); if (y > 156) { R.pset(x, y, AM); R.pset(x, y + 1, hex('#a8782a')); } }
  // la canica: rueda desde la libreta, choca con la punta de la peonza en «tipped over» y rebota hacia atrás
  const ida = tramo(t, golpe - 1.1, golpe), vuelta = tramo(t, golpe, golpe + 1.5);
  const cx = Math.round(ida < 1 ? lerp(300, 168, ida * (2 - ida)) : lerp(168, 236, vuelta * (2 - vuelta))), cy = 160 + (ida < 1 ? Math.round(lerp(10, 0, ida)) : Math.round(lerp(0, 8, vuelta)));
  if (t > golpe - 1.2) { R.disco(cx + 1, cy + 3, 3, hex('#7a5a3a')); R.disco(cx, cy, 3, K); R.disco(cx, cy, 2, hex('#3a8ac8')); R.pset(cx - 1, cy - 1, BL); R.pset(cx + 1, cy, hex('#8ad0f8')); R.pset(cx - (Math.floor(t * 12) % 3) + 1, cy + 1, hex('#e8783a')); }
  if (go > 0.2) for (const [dx, dy] of [[-4, -6], [4, -7], [0, -8]]) R.pset(166 + dx, 158 + dy, AM);
};
const efectos = [[enciende + 0.1, 'interruptor'], [gira + 0.2, 'zumbido'], [seis, 'bip'], [giros, 'brillo'], [golpe, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-enigma'] = ('El enigma', '''// FA-ENIGMA (frases 17–18), 2020, cartela «2020». Siete planos:
// 1. (0–«whole») la pizarra: la tiza dibuja sola la parábola del pase con los balones de punta arriba, como un giroscopio
//    perfecto («perfect gyroscope … pointing up»); el físico entra, la señala y aparece el «?»;
// 2. («whole»–«A puzzle») el estadio cubierto: un pase de verdad, con su estela de instantáneas: la punta baja al caer
//    («tip their nose down»); el receptor la atrapa en la zona de anotación;
// 3. («A puzzle»–«until») el laboratorio de noche: el físico da vueltas a la idea, «?»; la barra del año corre de 2000 a 2020
//    («20 years»);
// 4. («until»–«The key») la sala de datos: él y dos colegas ante el videowall; en «cracked» sale el «✓» y lo celebran;
// 5. («The key»–«slowly») el balón grande en el cielo del campo: el aire empuja la punta («pushes on the nose»), no lo
//    voltea («instead of flipping»: la voltereta fantasma se tacha) y el eje empieza a dar vueltas despacio alrededor de la
//    trayectoria («circle slowly»);
// 6. («slowly»–«circling») el parque: un niño hace girar una peonza en el banco y su eje traza el mismo circulito que el
//    del balón que pasa por encima, al mismo ritmo (gag 4, «spinning top tracing a little loop»);
// 7. («circling»–fin) el césped del estadio a ras de suelo: el balón baja con la punta hacia abajo, guiada por el círculo,
//    y el receptor lo atrapa en «comes down».''', H + r'''
const a = (f) => en('enigma', f), c = (f) => en('cabeceo', f);
const P2 = a(0.313), P3 = a(0.572), P4 = a(0.793), P5 = c(0), P6 = c(0.391), P7 = c(0.758);
const PER = 3.2;   // el periodo de la precesión del balón y de la peonza (el mismo, para el gag)
// 1 · la pizarra: el giroscopio perfecto tendría la punta arriba todo el rato. ¿Por qué no?
const dibuja0 = a(0.03), dibuja1 = a(0.25), interroga = a(0.26);
const tizaL = (x0, y0, x1, y1, col, k = 0) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let i = 0; i <= n; i++) { if (hs(i, k, 3) < 0.12) continue; R.pset(Math.round(lerp(x0, x1, i / Math.max(1, n))), Math.round(lerp(y0, y1, i / Math.max(1, n))), col); } };
const PZ = hex('#2e463a'), PZL = hex('#38523f'), PZB = hex('#3a5446'), TZ = hex('#eef2ea'), TZS = hex('#a8b8aa'), TZA = hex('#f0d878'), TZC = hex('#8ad8f0'), TZV = hex('#a8e890');
// el borrón de tiza que tapa las fórmulas de la esquina (sin letras): solo el «600» con su flecha de giro
const borron = (t) => { for (let y = 26; y <= 70; y++) for (let x = 30; x <= 88; x++) { const n = hs(x >> 2, y >> 1, 5); R.pset(x, y, n < 0.55 ? PZ : n < 0.85 ? PZL : PZB); if (hs(x, y, 9) < 0.05) R.pset(x, y, TZS); }
  for (let k = 0; k < 6; k++) tizaL(32 + k * 9, 30 + (k % 3) * 13, 44 + k * 9, 36 + (k % 3) * 13, PZB, k);   // las pasadas del borrador
  R.numero('600', 40, 44, { color: TZ, sombra: false, fina: true });
  for (let an = -2.6; an < 2.2; an += 0.14) R.pset(Math.round(70 + Math.cos(an) * 7), Math.round(40 + Math.sin(an) * 4), TZA);
  flecha(Math.round(70 + Math.cos(2.0) * 7) - 2, Math.round(40 + Math.sin(2.0) * 4) - 1, Math.round(70 + Math.cos(2.2) * 7), Math.round(40 + Math.sin(2.2) * 4), TZA, 2);
  // la flecha del eje del balón de tiza que apunta arriba
  tizaL(40, 66, 56, 52, TZS, 7); flecha(52, 56, 56, 52, TZ, 3); tizaL(36, 64, 44, 64, TZS, 8); };
const signo = (x, y, u, col, cual) => { // «?» o «✓» de tiza, que se dibujan con u (0–1)
  if (cual === '?') { const P = []; for (let an = -2.8; an < 0.9; an += 0.1) P.push([x + Math.cos(an) * 6, y - 6 + Math.sin(an) * 6]); P.push([x + 1, y + 2], [x + 1, y + 5]);
    const n = Math.floor(P.length * u); for (let i = 0; i < n - 1; i++) { R.linea(Math.round(P[i][0]), Math.round(P[i][1]), Math.round(P[i + 1][0]), Math.round(P[i + 1][1]), col); R.linea(Math.round(P[i][0]) + 1, Math.round(P[i][1]), Math.round(P[i + 1][0]) + 1, Math.round(P[i + 1][1]), col); }
    if (u >= 1) { R.rect(x, y + 8, x + 2, y + 10, col); } }
  else { const v = Math.min(1, u * 2), w = Math.max(0, u * 2 - 1); for (let d = 0; d < 2; d++) { R.linea(x + d, y, Math.round(x + d + 5 * v), Math.round(y + 6 * v), col); if (w > 0) R.linea(x + 5 + d, y + 6, Math.round(x + 5 + d + 12 * w), Math.round(y + 6 - 16 * w), col); } } };
const p1 = (t) => {
  T.labGiro(R, t, { encuadre: 'pizarra', u: tramo(t, dibuja0, dibuja1), solucion: 0 });
  borron(t);
  if (t > interroga) { const sb = t < interroga + 0.25 ? 1 : 0; R.icono('?', 158, 50 - sb, TZA, PZ, 3); }
  // el físico entra con su libreta, se para, señala los balones de punta arriba y se rasca la cabeza ante el «?»
  const u = tramo(t, 1.3, a(0.12));
  R.actor(EL.fisico, Math.round(lerp(40, 136, u)), 170, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > a(0.147) && t < interroga - 0.2, sorpresa: t > interroga + 0.2, habla: t > a(0.12) && t < a(0.147) });
  // la colega llega por la derecha, comenta y señala el «?»
  const fu = tramo(t, a(0.12), a(0.2)); R.actor(EL.fisica, Math.round(lerp(300, 214, fu)), 172, t, { dir: -1, anda: fu > 0 && fu < 1, dedo: t > interroga + 0.1, habla: t > a(0.2) && t < interroga && Math.sin(t * 7) > 0, sorpresa: t > interroga + 0.1 });
};
// 2 · un buen pase de verdad: la punta baja al caer (con sus instantáneas)
const lanza2 = P2 + 0.3, atrapa2 = a(0.53), PASE = [40, 128, 222, 150, 70];
const p2 = (t) => {
  T.estadioPatada(R, t, { encuadre: 'pateo', linea: false });
  const q = R.actor(EL.quarterback, 30, 147, t, { dir: 1, dedo: t > lanza2 - 0.4 && t < lanza2 + 0.3, sonrisa: t > atrapa2 });
  const ru = tramo(t, P2, atrapa2), rx = Math.round(lerp(176, 214, ru));
  const r = R.actor(EL.receptor, rx, 166, t, { dir: -1, anda: ru < 1, brazos: t > atrapa2 - 0.3 && t < atrapa2 + 0.5, sonrisa: t > atrapa2 });
  R.actor(EL.liniero, Math.round(lerp(150, 194, ru)), 172, t, { dir: 1, anda: ru < 1, enfado: t > atrapa2 });
  const u = tramo(t, lanza2, atrapa2);
  // la estela de instantáneas: la punta sigue a la curva (baja al caer)
  for (let k = 1; k <= 5; k++) { const uk = k * 0.17; if (uk < u - 0.04) { const [x, y, an] = arco(uk, ...PASE); for (let i = -6; i <= 6; i++) if (i % 2 === 0) R.pset(Math.round(x + Math.cos(an) * i), Math.round(y + Math.sin(an) * i), k % 2 ? CI : BL); R.pset(Math.round(x + Math.cos(an) * 8), Math.round(y + Math.sin(an) * 8), AM); } }
  if (t < lanza2) T.balon(R, q.mano[0], q.mano[1] + 2, t, { ang: -0.6 });
  else if (t < atrapa2) { const [x, y, an] = arco(u, ...PASE); T.balon(R, Math.round(x), Math.round(y), t, { s: 1.3, ang: an, gira: 9 });
    const dn = tramo(t, a(0.47), a(0.5)); if (dn > 0 && an > 0.2) flechaG(Math.round(x + Math.cos(an) * 10), Math.round(y + Math.sin(an) * 10) - 2, Math.round(x + Math.cos(an) * 16), Math.round(y + Math.sin(an) * 10) + 8, AM); }
  else T.balon(R, r.mano[0] - 2, r.mano[1], t, { ang: 0.3 });
};
// 3 · veinte años de enigma: el físico en el laboratorio de noche, dándole vueltas
const p3 = (t) => {
  T.labCasco(R, t, { encuadre: 'torre' });
  T.tinte(R, 0, 179, [20, 26, 60], 0.35);
  const u = tramo(t, P3, P4), x = Math.round(28 + Math.sin(u * Math.PI * 1.5) * 22 + 22), dir = Math.cos(u * Math.PI * 1.5) >= 0 ? 1 : -1;
  const f = R.actor(EL.fisico, x, 160, t, { dir, anda: true, triste: u > 0.6 });
  if (Math.floor(t * 2) % 3 !== 2) R.bocadillo(f.cabeza[0], f.cabeza[1] - 4, { icono: '?' });
  // la técnica se despide y se va a casa por la puerta: él se queda solo con el enigma
  const vu = tramo(t, P3 + 0.6, P4 - 0.4); R.actor(EL.tecnica, Math.round(lerp(232, 300, vu)), 158, t, { dir: vu > 0 ? 1 : -1, anda: vu > 0 && vu < 1, dedo: t < P3 + 0.6, sonrisa: true });
};
// 4 · lo resuelven: él y dos colegas ante el videowall; «✓» en «cracked»
const resuelto = a(0.897);
const p4 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'sala' });
  // la pantalla de la curva: la trayectoria con los ejes que siguen la curva y el «✓» que aparece
  R.recorte([211, 25, 263, 57]); R.rect(211, 25, 263, 57, hex('#0e1a2a'));
  for (let x = 211; x <= 263; x += 6) R.linea(x, 25, x, 57, hex('#16263a')); for (let y = 25; y <= 57; y += 6) R.linea(211, y, 263, y, hex('#16263a'));
  const uu = tramo(t, P4, resuelto); for (let k = 0; k < 40 * uu; k++) { const [x, y] = arco(k / 40, 214, 54, 260, 54, 26); R.pset(Math.round(x), Math.round(y), k % 2 ? CI : hex('#4a8ab0')); }
  for (let k = 1; k < 5; k++) if (k / 5 < uu) { const [x, y, an] = arco(k / 5, 214, 54, 260, 54, 26); R.linea(Math.round(x - Math.cos(an) * 4), Math.round(y - Math.sin(an) * 4), Math.round(x + Math.cos(an) * 4), Math.round(y + Math.sin(an) * 4), AM); }
  R.recorte(null);
  const v = tramo(t, resuelto, resuelto + 0.4); if (v > 0) { R.recorte([152, 25, 206, 57]); R.rect(152, 25, 206, 57, hex('#0e2a1a')); signo(166, 40, v, TZV, '✓'); R.recorte(null); }
  // los tres: el físico señala la curva; la colega habla («two colleagues»); el tercero teclea y salta con el «✓»
  const sal = (k) => (t > resuelto + 0.1 + k * 0.1 && t < resuelto + 0.9 + k * 0.1 ? Math.round(Math.abs(Math.sin((t - resuelto) * 7)) * 4) : 0);
  R.actor(EL.fisico, 110, 162, t, { dir: 1, dedo: t < resuelto && t > P4 + 0.3, brazos: t > resuelto, sonrisa: t > resuelto, salto: sal(0) });
  R.actor(EL.fisica, 150, 164, t, { dir: 1, habla: t > a(0.84) && t < resuelto && Math.sin(t * 8) > 0, brazos: t > resuelto + 0.15, sonrisa: t > resuelto, salto: sal(1) });
  R.actor(EL.tecnico, 196, 162, t, { dir: -1, habla: t < a(0.84) && Math.sin(t * 6) > 0.4, sorpresa: t > resuelto && t < resuelto + 0.4, sonrisa: t > resuelto + 0.4, salto: sal(2) });
  T.h_estadioDelante(R, t, { encuadre: 'sala' });
};
// 5 · la clave es el aire: empuja la punta y, en vez de voltearlo, hace que el eje dé vueltas despacio
const empuja5 = c(0.104), voltea = c(0.195), tacha = c(0.255), circula = c(0.341);
const p5 = (t) => {
  T.labCasco(R, t, { encuadre: 'entreno' });
  const u = tramo(t, P5, P6 + 0.3), cx = lerp(84, 214, u), cy = lerp(40, 56, u * u), pa = Math.atan2(16 * 2 * u, 130);   // la trayectoria baja poco a poco
  // la trayectoria punteada por detrás y por delante
  for (let x = 40; x < 260; x += 3) { const w = (x - 84) / 130, y = lerp(40, 56, Math.max(0, w) ** 2); if (x < cx - 26 || x > cx + 26) R.pset(x, Math.round(y), x < cx ? BL : hex('#c8d8e8')); }
  // el eje: hasta «circle» va algo levantado (la punta arriba); luego da vueltas despacio alrededor de la trayectoria
  const cz = tramo(t, circula - 0.4, circula + 0.4), fi = (t - circula) * 2 * Math.PI / PER;
  const ang = pa - 0.32 * (1 - cz) - 0.32 * cz * Math.cos(fi);
  // la voltereta que no pasa: un balón fantasma que se voltea y se tacha
  const vf = tramo(t, voltea, tacha + 0.3), vt = tramo(t, tacha, tacha + 0.2) * (1 - tramo(t, circula - 0.2, circula));
  if (vf > 0 && t < circula) { if (vt < 1 || Math.floor(t * 4) % 2) { const gx = Math.round(cx + 58), gy = Math.round(cy + 30), ga = pa - 0.32 - vf * 2.4; for (let an = 0; an < 6.28; an += 0.12) { const lx = Math.cos(an) * 16, ly = Math.sin(an) * 7, px = Math.round(gx + lx * Math.cos(ga) - ly * Math.sin(ga)), py = Math.round(gy + lx * Math.sin(ga) + ly * Math.cos(ga)); R.pset(px + 1, py + 1, K); R.pset(px, py, BL); }
      for (let i = -12; i <= 12; i += 3) R.pset(Math.round(gx + Math.cos(ga) * i), Math.round(gy + Math.sin(ga) * i), BL); }
    if (vt > 0) R.icono('X', gx - 5, gy - 5, RO, K, 2); }
  // el aire que llega por delante y la flecha que empuja la punta
  rachas(Math.round(cx) + 30, Math.round(cy) - 22, Math.round(cx) + 90, Math.round(cy) + 22, t, -1, 0, 9, CI, 55, 9);
  const fe = tramo(t, empuja5 - 0.2, empuja5 + 0.3) * (1 - tramo(t, circula + 1.5, circula + 2));
  if (fe > 0) { const nx = cx + Math.cos(ang) * 22, ny = cy + Math.sin(ang) * 22; flechaG(Math.round(nx + 14), Math.round(ny + 12), Math.round(nx + 14 - 10 * fe), Math.round(ny + 12 - 8 * fe), CI, CIs); }
  // el círculo que traza la punta (se va dibujando con la vuelta)
  if (cz > 0) { const ox = cx + Math.cos(pa) * 24, oy = cy + Math.sin(pa) * 24; const hasta = Math.min(Math.PI * 2, Math.max(0, fi + 0.01) + 0.3);
    for (let s = 0; s < hasta; s += 0.08) R.pset(Math.round(ox + Math.sin(s) * 2.5), Math.round(oy - Math.cos(s) * 8), CI);
    R.disco(Math.round(ox + Math.sin(fi) * 2.5), Math.round(oy - Math.cos(fi) * 8), 1, AM); }
  T.balon(R, Math.round(cx), Math.round(cy), t, { s: 3, ang, gira: 1.6 });
};
// 6 · la peonza del banco: su eje traza el mismo circulito, al mismo ritmo que el del balón que pasa por encima (gag 4)
const como = c(0.517), loop = c(0.668);
const p6 = (t) => {
  T.labGiro(R, t, { encuadre: 'parque' });
  // el balón que cruza alto el cielo, con su circulito de precesión
  const u = tramo(t, P6 - 0.3, P7 + 0.3), bx = lerp(70, 250, u), by = 46 + (u - 0.5) ** 2 * 60, pa = Math.atan2(120 * (u - 0.5) * 2 / 180 * 1, 1) * 0.6;
  const fi = (t - circula) * 2 * Math.PI / PER, ang = pa - 0.4 * Math.cos(fi);
  T.balon(R, Math.round(bx), Math.round(by), t, { s: 1.6, ang, gira: 2 });
  { const ox = bx + Math.cos(pa) * 13, oy = by + Math.sin(pa) * 13; for (let s = 0; s < 6.28; s += 0.3) R.pset(Math.round(ox + Math.sin(s) * 1.5), Math.round(oy - Math.cos(s) * 5), CI); R.pset(Math.round(ox + Math.sin(fi) * 1.5), Math.round(oy - Math.cos(fi) * 5), AM); }
  // el niño en el banco con la peonza girando sobre el asiento; su madre al lado
  R.actor(EL.obrera, 226, 168, t, { dir: -1, sonrisa: t > loop, habla: t > como && t < loop && Math.sin(t * 7) > 0 });
  const ni = R.actor(EL.recogepelotas, 206, 170, t, { dir: 1, dedo: t > como - 0.3 && t < loop, sorpresa: t > loop - 0.4 && t < loop + 0.5, sonrisa: t > loop + 0.5 });
  const top = T.e_peonza(R, 252, 154, t, { s: 1.4, giro: 1, precesion: 1, periodo: PER, rastro: true, fase: -circula * 2 * Math.PI / PER });
  // las dos flechitas que los unen en «little loop»: el mismo círculo
  const ll = tramo(t, loop - 0.3, loop + 0.2) * (1 - tramo(t, P7 - 0.5, P7 - 0.1));
  if (ll > 0 && Math.floor(t * 4) % 2) { R.icono('!', top[0] - 1, top[1] - 16, AM, K); }
};
// 7 · y ese circular lento lleva la punta hacia abajo mientras baja: el receptor lo atrapa
const atrapa7 = c(0.964);
const p7 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'cesped' });
  const u = tramo(t, P7, atrapa7), [x, y, an] = arco(u * 0.5 + 0.5, -40, 60, 196, 132, 70);
  const fi = (t - circula) * 2 * Math.PI / PER, ang = an + 0.2 * Math.cos(fi);
  const ru = tramo(t, P7, atrapa7 - 0.2), rx = Math.round(lerp(300, 190, ru));
  const r = R.actor(EL.receptor, rx, 152, t, { dir: -1, anda: ru < 1, brazos: t > atrapa7 - 0.5 && t < atrapa7 + 0.6, sonrisa: t > atrapa7 });
  if (t < atrapa7) { T.balon(R, Math.round(x), Math.round(y), t, { s: 2, ang, gira: 2, estela: 0.8, dirEstela: an });
    const dn = tramo(t, c(0.83), c(0.87)); if (dn > 0) flechaG(Math.round(x + Math.cos(an) * 14), Math.round(y + Math.sin(an) * 14), Math.round(x + Math.cos(an) * 14 + 4), Math.round(y + Math.sin(an) * 14 + 10 * dn), AM); }
  else T.balon(R, r.mano[0] - 4, r.mano[1] + 1, t, { s: 1, ang: 0.2 });
  T.h_estadioDelante(R, t, { encuadre: 'cesped' });
};
const efectos = [[dibuja0 + 0.1, 'lapiz'], [interroga, 'pop'], [lanza2, 'whoosh'], [atrapa2, 'golpecito'], [P3 + 0.4, 'tic'], [resuelto, 'palmada'],
  [empuja5, 'rafaga'], [tacha, 'pop'], [circula, 'whoosh'], [como, 'brillo'], [atrapa7, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '2020', efectos, año: (t) => (t >= P3 && t < P4 ? Math.round(lerp(2000, 2020, tramo(t, P3 + 0.2, P4 - 0.3))) : 2020) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-deriva'] = ('La deriva', '''// FA-DERIVA (frase 19), sin cartela. Tres planos:
// 1. (0–«So») desde la pasarela bajo el techo: dos técnicos miran el campo; un pase cruza y su punta queda un poco
//    torcida hacia un lado («pointing slightly to one side»: la flechita de la punta frente a la trayectoria);
// 2. («So»–«while») el campo visto desde arriba: el pase largo de un diestro se curva un poco a la derecha («right»), y el
//    de un zurdo, a la izquierda («left»), cada uno con su manita en el lado del brazo que lanza;
// 3. («while»–fin) la Tierra que gira en el espacio, con el campo diminuto encima: un pase de «60» yardas se desvía solo
//    «4″» («about 4 inches»); la Luna y un satélite pasan.''', H + r'''
const d = (f) => en('deriva', f), P2 = d(0.299), P3 = d(0.676);
// 1 · desde la pasarela: la punta un poco de lado
const lado = d(0.18);
const p1 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'antenas' });
  // el pase allá abajo, en el campo (y 70–112): el balón diminuto y su trayectoria; la punta, un poco de lado
  const u = (tramo(t, 0.2, P2 - 0.2)), x = lerp(90, 236, u), y = lerp(96, 84, u) - Math.sin(u * Math.PI) * 6;
  R.recorte([0, 68, 319, 114]);
  for (let k = 0; k < 60 * u; k++) { const w = k / 60, px = lerp(90, 236, w), py = lerp(96, 84, w) - Math.sin(w * Math.PI) * 6; if (k % 2 === 0) R.pset(Math.round(px), Math.round(py), BL); }
  const pa = Math.atan2(-12, 146), ld = tramo(t, lado - 0.3, lado + 0.3), ang = pa + 0.35 * ld;
  T.balon(R, Math.round(x), Math.round(y), t, { s: 1, ang, gira: 6 });
  if (ld > 0) { flecha(Math.round(x + 4), Math.round(y), Math.round(x + 4 + Math.cos(pa) * 16), Math.round(y + Math.sin(pa) * 16), hex('#c8d0d8'), 2); flecha(Math.round(x + 4), Math.round(y), Math.round(x + 4 + Math.cos(ang) * 16), Math.round(y + Math.sin(ang) * 16), AM, 3); }
  R.recorte(null);
  // los dos técnicos de la pasarela: uno sigue el pase con el dedo, el otro apunta en la tableta
  const tu = tramo(t, 0.3, lado);
  R.actor(EL.tecnico, Math.round(lerp(110, 150, tu)), 148, t, { dir: 1, anda: tu > 0 && tu < 1, dedo: t > lado - 0.2, sorpresa: t > lado + 0.4 && t < lado + 1.2 });
  R.actor(EL.tecnica, 196, 149, t, { dir: -1, habla: t > lado + 0.8 && Math.sin(t * 7) > 0, sonrisa: t > lado + 1.6 });
};
// 2 · desde arriba: el diestro curva a la derecha, el zurdo a la izquierda
const r0 = d(0.33), r1 = d(0.51), l0 = d(0.53), l1 = d(0.64);
const jugador = (x, y, col, colS, mira, t, k) => { // un jugador visto desde arriba: hombreras, casco con su raya, sombra
  const b = Math.round(Math.sin(t * 6 + k) * 0.5); R.disco(x + 2, y + 2, 4, hex('#3a6a2a')); R.rect(x - 4, y - 2 + b, x + 4, y + 2 + b, K); R.rect(x - 3, y - 1 + b, x + 3, y + 1 + b, col);
  R.disco(x, y + b, 2, K); R.disco(x, y + b, 1, colS); R.pset(x + mira, y + b, BL); };
const p2 = (t) => {
  const A = T.labGiro(R, t, { encuadre: 'arriba' }), X = (yd) => A.x50 + (yd - 50) * A.yarda;
  const pase = (t0, t1, y0, signo, col, colS, mano, k) => {
    const u = tramo(t, t0, t1), x0 = X(25), x1 = X(85), dev = signo * 10;
    const P = (w) => [lerp(x0, x1, w), y0 + dev * w * w];
    // la línea recta de referencia y la curva real
    for (let x = x0; x <= x1; x += 6) { R.rect(Math.round(x), y0, Math.round(x) + 2, y0, BL); R.rect(Math.round(x), y0 + 1, Math.round(x) + 2, y0 + 1, hex('#3a6a2a')); }
    for (let w = 0; w <= u; w += 0.006) { const [px, py] = P(w); R.rect(Math.round(px), Math.round(py) + 1, Math.round(px), Math.round(py) + 2, K); R.rect(Math.round(px), Math.round(py) - 1, Math.round(px), Math.round(py), col); }
    jugador(Math.round(x0 - 6), y0, col, colS, 1, t, k);
    R.icono('mano', Math.round(x0 - 9), y0 + signo * 7 - (signo > 0 ? 0 : 6), BL, K);
    const rx = Math.round(lerp(x1 + 30, x1 + 2, tramo(t, t0, t1 - 0.2))); jugador(rx, Math.round(y0 + dev), hex('#e8e0d0'), colS, -1, t, k + 1);
    if (u > 0 && u < 1) { const [bx, by] = P(u), [qx, qy] = P(Math.min(1, u + 0.02)); R.disco(Math.round(bx) + 3, Math.round(by) + 4, 1, hex('#3a6a2a')); T.balon(R, Math.round(bx), Math.round(by), t, { ang: Math.atan2(qy - by, qx - bx), gira: 6 }); }
    if (u >= 1) { const [bx, by] = P(1); flecha(Math.round(bx - 6), y0, Math.round(bx - 6), Math.round(by - signo), AM, 2); }
  };
  pase(r0, r1, 86, 1, hex('#1e8a8a'), hex('#e8783a'), 1, 0);
  pase(l0, l1, 140, -1, hex('#c83a3a'), hex('#f0d040'), -1, 3);
};
// 3 · la Tierra que gira: 60 yardas se desvían solo 4 pulgadas
const sesenta = d(0.805), cuatro = d(0.935);
const TIE = { mar: ['#0e2a5a', '#1a4a8a', '#2a6ab0', '#4a8ad0'], tierra: ['#2a4a1a', '#3a6a28', '#5a8a3a', '#8aaa5a'], nube: ['#b8c4d0', '#e8eef4'] };
for (const k in TIE) TIE[k] = TIE[k].map(hex);
// ruido de valor suave (para los continentes y las nubes)
const vn = (x, y, k) => { const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return lerp(lerp(hs(ix, iy, k), hs(ix + 1, iy, k), sx), lerp(hs(ix, iy + 1, k), hs(ix + 1, iy + 1, k), sx), sy); };
const p3 = (t) => {
  // el espacio: el fondo negro azulado con estrellas de tres brillos que titilan y la Vía Láctea tramada
  R.rect(0, 0, 319, 179, hex('#05060f'));
  for (let y = 0; y < 180; y += 1) for (let x = 0; x < 320; x += 1) { const vl = Math.abs((y - 40) - (x - 160) * 0.35); if (vl < 26 && hs(x >> 1, y >> 1, 4) < 0.22 * (1 - vl / 26)) R.pset(x, y, hex('#141830')); }
  for (let k = 0; k < 140; k++) { const x = Math.floor(hs(k, 1, 9) * 320), y = Math.floor(hs(k, 2, 9) * 180), b = hs(k, 3, 9), tw = Math.sin(t * (1 + b * 3) + k) > 0.6;
    if (x > 276 && y < 46) continue; R.pset(x, y, b > 0.85 ? (tw ? BL : hex('#c8d0f0')) : b > 0.5 ? hex('#8890b8') : hex('#4a5070')); if (b > 0.96 && tw) { R.pset(x - 1, y, hex('#6870a0')); R.pset(x + 1, y, hex('#6870a0')); R.pset(x, y - 1, hex('#6870a0')); R.pset(x, y + 1, hex('#6870a0')); } }
  // la Tierra: el disco con océanos y continentes que giran (ruido por longitud), las nubes a otra velocidad, la noche a la derecha y el halo
  const cx = 130, cy = 102, rr = 52, rot = t * 0.05;
  for (let k = 0; k < 3; k++) R.disco(cx, cy, rr + 3 - k, [hex('#0a1a3a'), hex('#1a3a6a'), hex('#4a7ab8')][k]);
  for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) { const q = x * x + y * y; if (q > rr * rr) continue;
    const z = Math.sqrt(rr * rr - q), lat = Math.asin(y / rr), lon = Math.atan2(x, z) + rot, lu = Math.cos(lat);
    const n = vn(lon * 2.2, lat * 2.6, 2) * 0.6 + vn(lon * 6, lat * 6, 3) * 0.3 + vn(lon * 14, lat * 14, 4) * 0.1;
    const luz = (-x * 0.62 - y * 0.42 + z * 0.66) / rr, cl = vn(lon * 5 + t * 0.04, lat * 9, 6) * 0.7 + vn(lon * 13 + t * 0.04, lat * 16, 7) * 0.3;
    let tono = Math.max(0, Math.min(3, Math.floor(0.4 + luz * 3.2 + (hs(x, y, 1) - 0.5) * 0.6)));
    let col = Math.abs(lat) > 1.18 ? (tono > 1 ? BL : hex('#b8c8d8')) : n > 0.58 ? TIE.tierra[tono] : TIE.mar[tono];
    if (n > 0.56 && n < 0.6 && tono > 0) col = hex('#c8b878');   // las costas de arena
    if (cl > 0.68 && luz > 0) col = TIE.nube[luz > 0.4 && cl > 0.72 ? 1 : 0];
    if (luz < -0.05) col = mezcla(col, hex('#04060e'), 0.7); else if (luz < 0.05) col = mezcla(col, hex('#04060e'), 0.4);
    R.pset(cx + x, cy + y, col); }
  // la flecha del giro alrededor del eje
  for (let an = 0.3; an < 2.6; an += 0.05) { const x = cx + Math.cos(an) * (rr + 9), y = cy - 4 + Math.sin(an) * 9 - rr - 2; }
  for (let an = Math.PI * 0.15; an < Math.PI * 0.85; an += 0.03) { const x = Math.round(cx - Math.cos(an) * (rr + 8)), y = Math.round(cy + rr * 0.25 + Math.sin(an) * 12); if (Math.sin(an * 20 - t * 4) > -0.2) R.pset(x, y, AM); }
  flecha(Math.round(cx + Math.cos(Math.PI * 0.15) * (rr + 8)) - 3, Math.round(cy + rr * 0.25 + Math.sin(Math.PI * 0.15) * 12) + 1, Math.round(cx + Math.cos(Math.PI * 0.15) * (rr + 8)) + 1, Math.round(cy + rr * 0.25 + Math.sin(Math.PI * 0.15) * 12) - 3, AM, 3);
  // el campo diminuto (sobre Norteamérica de mentira) con el pase de 60 yardas y su desvío
  const fx = cx - 14, fy = cy - 18; R.rect(fx - 1, fy - 1, fx + 15, fy + 6, K); R.rect(fx, fy, fx + 14, fy + 5, hex('#3a9a3a')); for (let x = fx + 2; x < fx + 14; x += 3) R.rect(x, fy, x, fy + 5, hex('#8ad08a'));
  const zz = tramo(t, sesenta - 0.6, sesenta);
  if (zz > 0) { // la lupa: de la mota del campo sale el recuadro ampliado
    const bx0 = 190, by0 = 58, bx1 = 308, by1 = 128; R.linea(fx + 14, fy, bx0, by0, hex('#c8d0e0')); R.linea(fx + 14, fy + 5, bx0, by1, hex('#c8d0e0'));
    R.rect(bx0 - 1, by0 - 1, bx1 + 1, by1 + 1, BL); R.rect(bx0, by0, bx1, by1, hex('#2e8a2e'));
    for (let x = bx0 + 4; x < bx1; x += 12) R.rect(x, by0, x, by1, hex('#e8f0e0')); for (let y = by0 + 3; y < by1; y += 4) for (let x = bx0; x <= bx1; x += 2) if (hs(x, y, 5) < 0.3) R.pset(x, y, hex('#3a9a3a'));
    const u = tramo(t, sesenta, cuatro - 0.3), x0 = bx0 + 10, x1 = bx1 - 10, y0 = 94;
    for (let x = x0; x <= x1; x += 3) R.pset(x, y0, hex('#d8e8d0'));
    for (let w = 0; w <= u; w += 0.01) R.pset(Math.round(lerp(x0, x1, w)), Math.round(y0 + 4 * w * w), AM);
    if (u > 0 && u < 1) T.balon(R, Math.round(lerp(x0, x1, u)), Math.round(y0 + 4 * u * u), t, { gira: 6 });
    R.numero('60', Math.round((x0 + x1) / 2), by1 - 6, { centro: true });
    const c4 = tramo(t, cuatro - 0.2, cuatro + 0.2); if (c4 > 0) { flecha(x1 + 3, y0 - 6, x1 + 3, y0 - 1, BL, 2); flecha(x1 + 3, y0 + 10, x1 + 3, y0 + 5, BL, 2); R.numero('4', x1 - 12, y0 - 10, {}); R.rect(x1 - 4, y0 - 23, x1 - 4, y0 - 20, AM); R.rect(x1 - 2, y0 - 23, x1 - 2, y0 - 20, AM); } }
  // la Luna que asoma y un satélite que cruza con su panel que brilla
  { const mx = 278, my = 150; R.disco(mx, my, 9, hex('#4a4a54')); R.disco(mx - 1, my - 1, 8, hex('#c8c8c0')); R.disco(mx + 2, my + 2, 2, hex('#9a9a94')); R.disco(mx - 3, my - 2, 1, hex('#9a9a94')); R.disco(mx + 3, my - 4, 1, hex('#a8a8a0')); }
  { const u = ((t - P3) / 6) % 1, sx = Math.round(lerp(10, 180, u)), sy = Math.round(lerp(30, 20, u)); R.rect(sx - 4, sy, sx - 2, sy + 1, hex('#3a5ab0')); R.rect(sx + 2, sy, sx + 4, sy + 1, hex('#3a5ab0')); R.rect(sx - 1, sy - 1, sx + 1, sy + 2, hex('#c8c8d0')); if (Math.floor(t * 3) % 4 === 0) R.pset(sx, sy - 2, RO); }
};
const efectos = [[lado, 'brillo'], [r0, 'whoosh'], [r1, 'golpecito'], [l0, 'whoosh'], [l1, 'golpecito'], [sesenta - 0.4, 'zumbido'], [cuatro, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
