import re

E = {}

# instantes de la voz inglesa (tiempos de escena de linea.json) → en('marca', fracción)
def _eb(t):
    t = float(t)
    if t < 17.6:
        return f"en('genova', {(t - 0.9) / (16.99 - 0.9):.4f})"
    return f"en('vapor', {(t - 18.095) / (37.033 - 18.095):.4f})"


def _em(t):
    t = float(t)
    if t < 19.8:
        return f"en('manchester', {(t - 1.5) / (18.723 - 1.5):.4f})"
    return f"en('pudo', {(t - 20.851) / (33.668 - 20.851):.4f})"


def _sub(s):
    s = re.sub(r'\{\{eb:([0-9.]+)\}\}', lambda m: _eb(m.group(1)), s)
    return re.sub(r'\{\{em:([0-9.]+)\}\}', lambda m: _em(m.group(1)), s)


# utilidades de las dos escenas (sin redeclarar tramo, lerp, hex, E, R, M ni en)
PRE = r'''
const C = T.C, K = C.k;
const H = (s) => hex(s);
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const suave = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(f * (cs.length - 1) + bay(x, y))))];
const tranquila = (x, y) => (x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 22);
const pul = (t, f, k = 0) => Math.sin(t * f + k) > 0;
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
const cieloT = (y0, y1, cs, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cs, f, x, y)); } };
const BOLAS = [[0, 0, 0.5], [-0.3, 0.1, 0.32], [0.32, 0.08, 0.34], [-0.1, -0.2, 0.3], [0.16, -0.14, 0.3], [0.44, 0.16, 0.2]];
const nube = (cx, cy, w, cs, ymax = 999, x0 = 0, x1 = 319) => {
  const h = Math.max(4, w * 0.36);
  for (let y = Math.floor(cy - h); y <= cy + h * 0.5; y++) for (let x = Math.floor(cx - w * 0.62); x <= cx + w * 0.62; x++) {
    if (x < x0 || x > x1 || y < 0 || y > ymax || tranquila(x, y)) continue;
    let d = 9; for (const [bx, by, r] of BOLAS) { const dx = (x - (cx + bx * w)) / (r * w), dy = (y - (cy + by * w)) / (r * w * 0.7); d = Math.min(d, dx * dx + dy * dy); }
    if (d > 1 || y > cy + h * 0.45) continue; if (d > 0.8 && bay(x, y) < 0.5) continue;
    const v = (y - (cy - h)) / (h * 1.45); R.pset(x, y, y > cy + h * 0.32 ? cs[2] : tono(cs, v, x, y));
  }
};
const nubes = (t, lista, cs, ymax = 999, x0 = 0, x1 = 319) => { for (const [a, y, w, v] of lista) nube(((a + t * v) % 440 + 440) % 440 - 60, y, w, cs, ymax, x0, x1); };
const pajaro = (x, y, t, c) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y) || x < 2 || x > 317) return; const a = Math.floor(t * 7 + x * 0.3) % 2; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + 2 * a, c); R.pset(x + 2, y - 1 + 2 * a, c); };
// tablas horizontales con vetas
const madera = (x0, y0, x1, y1, cs, alto = 6, sem = 0) => {
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), yy = (y - y0) % alto, junta = (tabla * 53) % 70;
    for (let x = x0; x <= x1; x++) { const g = Math.sin(x * 0.07 + tabla * 3.1 + Math.sin(x * 0.019 + tabla * 1.7) * 3 + yy * 0.9 + sem);
      let c = cs[1]; if (g > 0.86) c = cs[0]; else if (g < -0.84) c = cs[2]; if (hs(x, y, sem) > 0.96) c = mez(c, cs[0], 0.5);
      if (yy === alto - 1) c = cs[3] ?? cs[2]; if (yy === 0) c = mez(c, cs[0], 0.35); if ((x + junta) % 70 === 0) c = cs[3] ?? cs[2]; R.pset(x, y, c); } }
};
// sillares de piedra con llagas (paredes de almacén y de bodega)
const sillares = (x0, y0, x1, y1, cs, alto = 9, ancho = 22, sem = 0, suaveZ = null) => {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / alto), yy = (y - y0) % alto, off = (f % 2) * Math.floor(ancho / 2);
    for (let x = x0; x <= x1; x++) { const xx = (x + off) % ancho, id = Math.floor((x + off) / ancho), tz = suaveZ && suaveZ(x, y);
      let c = tono(cs, 0.25 + hs(id, f, sem) * 0.5 + (hs(x, y, sem) - 0.5) * 0.25, x, y);
      if (yy === 0 || xx === 0) c = tz ? mez(c, cs[cs.length - 1], 0.3) : cs[cs.length - 1]; else if (yy === 1 || xx === 1) c = tz ? c : cs[0];
      R.pset(x, y, c); } }
};
// lluvia en rayas finas (por delante), dentro de [x0, y0, x1, y1]
const lluvia = (t, x0, y0, x1, y1, c, n = 70, vel = 160) => { for (let k = 0; k < n; k++) { const x = x0 + Math.floor(hs(k, 3, 9) * (x1 - x0 + 30)) - Math.floor((t * vel * 0.25) % 30), y = y0 + Math.floor(((hs(k, 5, 9) * (y1 - y0)) + t * vel) % (y1 - y0)); if (tranquila(x, y)) continue; R.pset(x, y, c); if (y + 1 <= y1 && !tranquila(x - 1, y + 1)) R.pset(x - 1, y + 1, c); if (y + 2 <= y1 && !tranquila(x - 1, y + 2)) R.pset(x - 1, y + 2, mez(c, H('#ffffff'), 0.3)); } };
// onda en un charco: anillo que crece y se apaga
const onda = (cx, cy, t, k, c) => { const f = ((t * 0.9 + hs(k, 1, 4)) % 1), r = 1 + f * 6; if (f > 0.85) return; for (let a = 0; a < 6.28; a += 0.5) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.35); R.pset(x, y, c); } };
// un barril de pie: x centro, y la base, s escala; rojo: roble rojo
const barrilP = (x, y, s = 1, rojo = false) => { x = Math.round(x); y = Math.round(y);
  const A = rojo ? [C.robleRS, C.robleR, H('#c06a48')] : [C.robleBS, C.robleB, H('#e4be82')], w = Math.round(4 * s), h = Math.round(11 * s);
  R.rect(x - w - 1 - Math.round(s), y - h - 1, x + w + 1 + Math.round(s), y, K);
  for (let j = 0; j < h; j++) { const b = Math.round(Math.sin((j / h) * Math.PI) * s); R.rect(x - w - b, y - h + j, x + w + b, y - h + j, A[1]); R.pset(x - w - b, y - h + j, A[0]); R.pset(x + w + b, y - h + j, A[0]); R.pset(x - w + 1, y - h + j, A[2]); for (let i = -w + 2; i < w; i += 3) R.pset(x + i, y - h + j, mez(A[1], A[0], 0.4)); }
  for (const f of [0.18, 0.82]) { const yy = Math.round(y - h + h * f); R.linea(x - w - 1, yy, x + w + 1, yy, C.aro); }
  R.linea(x - w, y - h, x + w, y - h, A[2]); };
const GUANTE = '#5a8ad0', BATA = '#f2f2ee';
// estrella de chispa
const chispa = (x, y, k, c = H('#fff4c0')) => { x = Math.round(x); y = Math.round(y); R.linea(x - k, y, x + k, y, c); R.linea(x, y - k, x, y + k, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x, y, H('#ffffff')); };
// vapor: rizos que suben (columna en x, de y0 hacia arriba)
const vaho = (x, y0, t, alto, c, k = 0) => { for (let j = 0; j < alto; j += 1) { const y = Math.round(y0 - ((j + t * 14 + k * 7) % alto)), xx = Math.round(x + Math.sin(y * 0.22 + t * 2 + k) * 3); if (tranquila(xx, y)) continue; if (hs(j, k, 3) > 0.45) R.pset(xx, y, c); } };
'''


# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
CAB_BARRILES = r'''// MC-BARRILES (frases 24–25), sin cartela; 1873 (Gibraltar y Génova), 1872 (la bodega) y 2006 (el laboratorio). Siete planos:
// 1. «That leaves the hardest question. Why would an experienced captain abandon a ship that wasn't sinking?»: el Mary
//    Celeste amarrado bajo el Peñón, sano y vacío; un marinero de guardia llega por el muelle, señala el casco en
//    «experienced captain», se encoge de brazos con un «?» en «abandon» y mira la flotación en «sinking» (una raya de luz
//    la recorre); un niño señala la gaviota que se posa en un poste en «question». Corta en «In».
// 2. «In Genoa, when the cargo was unloaded, a clue turned up, nine barrels were empty»: el puerto de Génova; un estibador
//    al pie de la plancha recoge los barriles que bajan; en «clue» coge uno de roble rojo que sale volando hacia arriba
//    de lo poco que pesa (vacío): «!» en «empty»; el compañero lo señala. Corta en «And».
// 3. «And those nine were made of a different oak, a more porous one, that lets alcohol…»: los barriles de cerca; el
//    estibador los golpea con los nudillos y los nueve de roble rojo se quedan huecos uno tras otro; un «9» de tiza sobre
//    ellos en «nine»; en «different oak» marca una X de tiza en el del centro; en «porous» se agacha a mirar las gotas.
//    Corta en «slowly».
// 4. «…slowly seep out. That alcohol turns into vapor»: fondo local: dos barriles enormes en el almacén del puerto
//    (roble blanco a la izquierda, roble rojo a la derecha) y la puerta al muelle; la lupa de Atom entra sobre el roble
//    rojo y deja ver los poros con las gotas que salen en «seep»; las gotas bajan y gotean al charco; en «vapor» el charco
//    y los poros echan vaho. Corta en «and in a closed hold».
// 5. «and in a closed hold the vapor builds up. A single spark is enough»: fondo local: la bodega cerrada vista desde
//    abajo, con la escotilla cerrada arriba y los rayos de luz por las rendijas; el vapor sube por capas en «builds up»;
//    una rata cruza por los barriles; en «spark» un aro suelto roza un gancho con el balanceo: chispa y un anillo azul que
//    apenas tiembla. Corta en «In 2006».
// 6. «In 2006, chemist Andrea Sella of University College London tested it in a model of the hold…»: la maqueta de cerca
//    (el laboratorio de 2006); la mano de Sella chasca la claqueta del documental («2006», sin letras) en «2006», toma
//    notas en el cuaderno, pone en marcha el cronómetro en «tested» y la otra mano da dos golpecitos al metacrilato junto
//    a la bombona en «model»: el gas tiembla en la boquilla. Corta en «gas».
// 7. «…with butane gas and paper cubes. A burst of flame filled the hold, and the cubes weren't even scorched»: el
//    laboratorio de 2006; Sella entra por la izquierda hasta el pulsador (sin pasar por delante de la poyata), aprieta en «burst»: «fuuum», la llamarada azul llena la maqueta y una
//    lengüecita sale por la escotilla hacia él; su ceja se queda chamuscada con un hilo de humo (el gag 7), parpadea; en
//    «cubes» se asoma: los cubos, blancos; sonríe y se toca la ceja en «scorched».'''

CUERPO_BARRILES = r'''
const P2 = {{eb:6.70}}, P3 = {{eb:11.66}}, P4 = {{eb:15.80}}, P5 = {{eb:19.98}}, P6 = {{eb:23.96}}, P7 = {{eb:30.70}};
const QUESTION = {{eb:1.74}}, CAPTAIN = {{eb:3.22}}, ABANDON = {{eb:4.22}}, SINKING = {{eb:5.94}};
const UNLOAD = {{eb:8.28}}, CLUE = {{eb:9.00}}, NINE = {{eb:10.04}}, EMPTY = {{eb:10.88}};
const NINE2 = {{eb:11.97}}, OAK = {{eb:12.79}}, POROUS = {{eb:14.05}}, ALCOHOL = {{eb:15.43}};
const SEEP = {{eb:16.39}}, THAT = {{eb:18.10}}, VAPOR = {{eb:19.19}};
const HOLD = {{eb:20.57}}, BUILDS = {{eb:21.38}}, SPARK = {{eb:22.71}}, ENOUGH = {{eb:23.23}};
const Y2006 = {{eb:24.10}}, CHEMIST = {{eb:25.70}}, SELLA = {{eb:26.40}}, TESTED = {{eb:28.28}}, MODEL = {{eb:29.36}};
const GAS = {{eb:31.16}}, CUBES = {{eb:31.96}}, BURST = {{eb:33.06}}, FLAME = {{eb:33.52}}, FILLED = {{eb:33.84}}, CUBES2 = {{eb:35.34}}, SCORCHED = {{eb:36.22}};

// ── 1 · el barco sano bajo el Peñón ───────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'bahia', camara: 'barco' };
  T.gibraltar(R, t, o);
  // la gaviota que baja a posarse en el poste de x 120 en «question»
  { const u = suave(lin(t, QUESTION - 0.8, QUESTION + 0.3)), x = Math.round(lerp(40, 120, u)), y = Math.round(lerp(60, 133, u) - Math.sin(u * Math.PI) * 14);
    if (u < 1) pajaro(x, y, t, H('#f4f4f0'));
    else { const pic = Math.sin(t * 3) > 0.7 ? 1 : 0; R.rect(x - 3, y - 4, x + 3, y, K); R.rect(x - 2, y - 3, x + 2, y - 1, H('#f4f4f0')); R.linea(x - 2, y - 2, x + 1, y - 2, H('#9aa4b0')); R.rect(x + 2, y - 7 + pic, x + 5, y - 4 + pic, K); R.rect(x + 3, y - 6 + pic, x + 4, y - 5 + pic, H('#ffffff')); R.pset(x + 6, y - 5 + pic, H('#e8a020')); } }
  // el marinero de guardia: llega, señala, se encoge de brazos y mira la flotación
  const u = suave(lin(t, 0.4, CAPTAIN - 0.3)), x = Math.round(lerp(-18, 112, u));
  const encoge = t > ABANDON && t < ABANDON + 1.3, mira = t > SINKING - 0.4;
  R.actor(EL.marineroMC, x, 166, t, { dir: encoge ? -1 : 1, anda: u > 0 && u < 1, dedo: t > CAPTAIN - 0.1 && t < ABANDON, brazos: encoge, sorpresa: mira && t < SINKING + 0.5, sonrisa: t > SINKING + 0.6 });
  if (t > ABANDON + 0.1 && t < SINKING + 0.6) R.bocadillo(x + 8, 136, { icono: '?' });
  // la flotación, que no se mueve: una raya de luz que recorre el agua junto al casco en «sinking»
  { const v = lin(t, SINKING - 0.2, SINKING + 0.9); if (v > 0 && v < 1) { const xx = Math.round(lerp(96, 292, v)); for (let i = 0; i < 10; i++) R.pset(xx - i, 147, mez(H('#ffffff'), H('#8ab4d0'), i / 10)); } }
  // un niño pesca sentado en la arista del muelle, a la derecha, y la caña se dobla
  { const x = 186; R.actor(EL.ninoVictoriano ?? EL.marineroMC, x, 166, t, { dir: t > QUESTION + 0.2 && t < CAPTAIN ? -1 : 1, dedo: t > QUESTION + 0.2 && t < QUESTION + 1.2, sonrisa: t > QUESTION + 0.4 }); }
  T.gibraltarDelante(R, t, o);
};

// ── 2 · Génova: el barril que vuela ───────────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'genova' };
  T.puerto(R, t, o);
  // el compañero que rueda un barril hacia la fila y luego señala
  const v = suave(lin(t, P2, P2 + 2.2)), bx = Math.round(lerp(40, 86, v));
  const senala = t > EMPTY - 0.3 && t < EMPTY + 1.1;
  R.actor(EL.estibadorMC, bx, 160, t, { dir: 1, anda: v > 0 && v < 1, dedo: senala, sorpresa: t > EMPTY && t < EMPTY + 0.5, sonrisa: t > EMPTY + 0.6 });
  if (!senala) { const gir = t * 6; R.disco(bx + 22, 154, 6, K); R.disco(bx + 22, 154, 5, C.robleBS); R.disco(bx + 22, 154, 4, C.robleB); R.linea(bx + 22 + Math.round(Math.cos(gir) * 4), 154 + Math.round(Math.sin(gir) * 4), bx + 22 - Math.round(Math.cos(gir) * 4), 154 - Math.round(Math.sin(gir) * 4), C.robleBS); }
  // el estibador al pie de la plancha: coge el barril rojo en «clue», sale disparado hacia arriba (vacío) en «nine»
  // vuela: sale de sus manos en «nine», sube dando vueltas hasta y ≈ 66 y le vuelve a caer en las manos tras «empty»
  const ax = 156, coge = t > CLUE - 0.2, vu = lin(t, NINE - 0.05, EMPTY + 0.75), enAire = vu > 0 && vu < 1;
  const est = R.actor(EL.estibadorMC, ax, 160, t, { dir: -1, sostiene: coge ? [ax - 2, enAire ? 128 : 138] : false, sorpresa: t > NINE && t < EMPTY + 1.2, salto: vu > 0.92 && vu < 1 ? 1 : 0 });
  if (coge) { const [mx, my] = est.mano; const alto = Math.sin(vu * Math.PI) * 76, bx = mx - 1, by = Math.round(my + 6 - alto);
    if (enAire) { R.recorte([0, 22, 319, 179]); const gx = bx, gy = by - 7, ang = vu * 9; for (let k = 0; k < 2; k++) R.linea(gx - 8 + k * 16, gy + 10, gx - 8 + k * 16, gy + 18 + Math.round(alto * 0.12), H('#f6f6f0'));
      R.disco(gx, gy, 8, K); R.disco(gx, gy, 7, C.robleRS); R.disco(gx, gy, 6, C.robleR); R.disco(gx, gy, 2, H('#2a0e08'));
      for (let k = 0; k < 3; k++) { const a = ang + k * 1.05; R.linea(Math.round(gx - Math.cos(a) * 6), Math.round(gy - Math.sin(a) * 6), Math.round(gx + Math.cos(a) * 6), Math.round(gy + Math.sin(a) * 6), C.robleRS); }
      R.recorte(null); }
    else barrilP(bx, my + 6, 1.15, true); }
  if (t > EMPTY - 0.05 && t < EMPTY + 1.0) R.bocadillo(ax + 2, 104, {});
  T.puertoDelante(R, t, o);
};

// ── 3 · los nueve, de cerca ──────────────────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  const vacios = lin(t, NINE2 - 0.25, NINE2 + 1.1);
  const o = { encuadre: 'genova', camara: 'barriles', vacios };
  const g = T.puerto(R, t, o);
  // el «9» de tiza sobre los nueve
  const n9 = suave(lin(t, NINE2 - 0.1, NINE2 + 0.25));
  if (n9 > 0) { R.disco(172, 80, Math.round(11 * n9), H('#f2efe4')); R.disco(172, 80, Math.round(9 * n9), H('#3a3a40')); if (n9 > 0.8) R.numero('9', 172, 85, { centro: true, color: H('#f6f2e6') }); }
  // el estibador recorre la fila golpeando con los nudillos; en «different oak» marca la X de tiza; en «porous» se agacha
  const u = suave(lin(t, P3, NINE2 + 0.9)), x = Math.round(lerp(300, 190, u));
  const golpe = t < NINE2 + 1.0 && Math.floor(t * 4) % 2 === 0, marca = t > OAK - 0.35 && t < OAK + 0.7, mira = t > POROUS - 0.2;
  const est = R.actor(EL.estibadorMC, x, 172, t, { dir: -1, anda: u > 0 && u < 1 && !golpe, sostiene: marca ? [172, 140] : golpe && u < 1 ? [x - 4, 146] : false, sorpresa: mira && t < POROUS + 0.6, salto: 0 });
  if (marca || t > OAK + 0.7) { const k = marca ? lin(t, OAK - 0.3, OAK + 0.5) : 1; const c = H('#f6f2e6'); R.linea(166, 134, Math.round(166 + 12 * Math.min(1, k * 2)), Math.round(134 + 9 * Math.min(1, k * 2)), c); if (k > 0.5) R.linea(178, 134, Math.round(178 - 12 * (k - 0.5) * 2), Math.round(134 + 9 * (k - 0.5) * 2), c); }
  if (mira && t < POROUS + 1.4) R.bocadillo(x + 8, 140, { icono: '!' });
  T.puertoDelante(R, t, o);
  return g;
};

// ── 4 · fondo local: las duelas de cerca en el almacén, con la lupa ───────────────────────────────────────────
const BARRIL_B = [H('#7a5630'), C.robleBS, C.robleB, H('#dcb072'), H('#f0d29a')];
const BARRIL_R = [H('#4a1e14'), C.robleRS, C.robleR, H('#b85e40'), H('#d88060')];
// el cuerpo de un barril grande de pie (x0–x1 sin la panza; y0 arriba, y1 abajo)
const barrilGrande = (x0, x1, y0, y1, cs, poros) => {
  const cx = (x0 + x1) / 2, w = (x1 - x0) / 2;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / (y1 - y0), panza = Math.sin(f * Math.PI) * 9, a = cx - w - panza, b = cx + w + panza;
    for (let x = Math.floor(a); x <= Math.ceil(b); x++) { const u = (x - a) / (b - a), duela = Math.floor(u * 9), du = u * 9 - duela;
      let l = 0.62 - Math.abs(u - 0.32) * 1.2 + (hs(duela, 1, 7) - 0.5) * 0.18;
      const veta = Math.sin(y * (poros ? 0.32 : 0.55) + duela * 2.1 + Math.sin(y * 0.05 + duela) * 3);
      if (veta > 0.82) l += poros ? 0.14 : 0.1; else if (veta < -0.85) l -= 0.12;
      let c = tono(cs, Math.max(0, Math.min(1, l)), x, y);
      if (poros && veta > 0.6 && veta < 0.8 && hs(x, y, 5) > 0.55) c = cs[0];
      if (du < 0.06 || x === Math.floor(a) || x === Math.ceil(b)) c = cs[0];
      R.pset(x, y, c); } }
  // los aros de hierro con remaches y brillo
  for (const f of [0.08, 0.3, 0.7, 0.92]) { const y = Math.round(y0 + (y1 - y0) * f), panza = Math.sin(f * Math.PI) * 9;
    for (let x = Math.floor(cx - w - panza); x <= Math.ceil(cx + w + panza); x++) { const u = (x - (cx - w - panza)) / (2 * (w + panza)); for (let k = 0; k < 4; k++) R.pset(x, y + k, k === 0 ? H('#8a8a94') : k === 3 ? H('#1a1a20') : u < 0.35 ? H('#5a5a64') : H('#3a3a44')); }
    for (let i = 0; i < 6; i++) { const x = Math.round(cx - w + i * (2 * w) / 5); R.pset(x, y + 1, H('#b8b8c0')); } }
};
const fondoDuelas = () => {
  // pared de sillares del almacén (tranquila arriba a la izquierda) y la puerta en arco al muelle
  sillares(0, 0, 319, 128, [H('#c8b898'), H('#b0a080'), H('#968668'), H('#7a6c52'), H('#5a4e3c')], 10, 26, 3, (x, y) => tranquila(x, y));
  // el hueco de la puerta en arco (x 176–262, y 18–128): el muelle de Génova, luminoso
  const arco = (x, y) => { const cx = 219, r = 43; if (x < cx - r || x > cx + r || y > 128) return false; if (y >= 52) return true; return Math.hypot(x - cx, (y - 52) * 1.0) <= r; };
  for (let y = 9; y <= 128; y++) for (let x = 176; x <= 262; x++) if (arco(x, y)) {
    let c; if (y < 70) c = tono([H('#d8ecf6'), H('#b8daf0'), H('#9cc8e8')], (y - 9) / 61, x, y);
    else if (y < 84) c = tono([H('#e8b088'), H('#d89a78'), H('#c88a6a'), H('#9a8a78')], (y - 70) / 14 + (hs(x >> 2, 1, 2) - 0.5) * 0.4, x, y);
    else if (y < 106) c = tono([H('#5a8aa8'), H('#3a6a8a'), H('#2a5070')], (y - 84) / 22, x, y);
    else c = tono([H('#a89878'), H('#8a7a5e'), H('#6a5c46')], (y - 106) / 22, x, y);
    R.pset(x, y, c); }
  // casas de la ladera dentro del arco: ventanitas y tejados
  for (let i = 0; i < 9; i++) { const x = 180 + i * 9, y = 70 + (i % 3) * 3; for (let k = 0; k < 2; k++) R.pset(x + 2 + k * 3, y + 5, H('#3a5a3a')); R.linea(x, y, x + 7, y, H('#a84a30')); }
  // el marco del arco: dovelas
  for (let a = Math.PI; a <= 2 * Math.PI + 0.01; a += 0.02) for (let r = 43; r <= 48; r++) { const x = Math.round(219 + Math.cos(a) * r), y = Math.round(52 + Math.sin(a) * r); R.pset(x, y, r === 48 ? H('#5a4e3c') : Math.floor(a * 12) % 2 ? H('#d8c8a8') : H('#c4b494')); }
  for (let y = 52; y <= 128; y++) for (const [x, w] of [[171, 5], [263, 5]]) for (let i = 0; i < w; i++) R.pset(x + i, y, (y >> 3) % 2 ? H('#d8c8a8') : H('#c4b494'));
  // el suelo de losas
  for (let y = 129; y <= 179; y++) for (let x = 0; x <= 319; x++) { const p = 1 + (y - 129) * 0.06, xx = Math.floor((x - 160) / (28 * p)), yy = Math.floor((y - 129) / 9); let c = tono([H('#9a8a70'), H('#857660'), H('#6e6250'), H('#5a5040')], 0.3 + hs(xx, yy, 4) * 0.5 + (hs(x, y, 2) - 0.5) * 0.2, x, y); if ((y - 129) % 9 === 0 || Math.abs(((x - 160) / (28 * p)) - Math.round((x - 160) / (28 * p))) < 0.03) c = H('#4a4034'); R.pset(x, y, c); }
  R.linea(0, 129, 319, 129, H('#4a4034'));
  // los barriles del fondo, pequeños, junto a la pared, y un saco
  for (let i = 0; i < 4; i++) barrilP(20 + i * 12, 128, 1.1, false);
  for (let i = 0; i < 3; i++) barrilP(282 + i * 12, 128, 1.1, i === 1);
  // la lámpara de aceite en su gancho (izquierda) y una cuerda colgada
  R.linea(150, 24, 150, 34, K); R.rect(146, 34, 154, 44, K); R.rect(147, 35, 153, 43, H('#e8c070')); R.pset(150, 38, H('#fff4c0'));
  for (let y = 30; y < 90; y++) R.pset(268 + Math.round(Math.sin(y * 0.3) * 1), y, (y % 3) ? H('#b89a6a') : H('#8a6e48'));
  // los dos barriles grandes
  barrilGrande(28, 128, 34, 172, BARRIL_B, false);
  barrilGrande(176, 270, 34, 172, BARRIL_R, true);
  // las tapas, vistas un poco desde arriba
  for (const [cx, w, cs] of [[78, 50, BARRIL_B], [223, 47, BARRIL_R]]) { for (let y = 26; y <= 40; y++) for (let x = cx - w - 2; x <= cx + w + 2; x++) { const d = ((x - cx) / (w + 2)) ** 2 + ((y - 33) / 7) ** 2; if (d > 1) continue; R.pset(x, y, d > 0.8 ? K : d > 0.6 ? H('#5a5a64') : tono(cs, 0.55 + Math.sin(x * 0.3) * 0.15, x, y)); } R.disco(cx + 12, 33, 2, K); R.disco(cx + 12, 33, 1, H('#6a4a2a')); }
  // la sombra de los barriles en el suelo
  for (let y = 170; y <= 179; y++) for (let x = 20; x <= 300; x++) { if (hs(x, y, 1) < 0.5 && bay(x, y) < 0.55) { const p = R.pget(x, y); R.pset(x, y, mez(p, K, 0.35)); } }
  // la X de tiza en el rojo (la del plano anterior)
  for (let i = 0; i < 12; i++) { R.pset(208 + i, 92 + Math.round(i * 0.8), H('#f2efe4')); R.pset(219 - i, 92 + Math.round(i * 0.8), H('#f2efe4')); }
};
const p4 = (t) => {
  capa('duelas', fondoDuelas);
  // por la puerta: el agua que brilla, una falúa que cruza y gaviotas
  R.recorte([176, 9, 262, 128]);
  for (let k = 0; k < 9; k++) { const x = 180 + ((k * 23 + Math.floor(t * 8)) % 80), y = 88 + (k % 4) * 4; R.pset(x, y, H('#e8f4f8')); R.pset(x + 1, y, H('#e8f4f8')); }
  for (let i = 0; i < 2; i++) pajaro(180 + ((t * (10 + i * 5) + i * 40) % 90), 28 + i * 9, t, H('#ffffff'));
  R.recorte(null);
  // la llama de la lámpara
  R.pset(150, 37 - (Math.floor(t * 9) % 2), H('#fff4c0'));
  // un gorrión que salta por la tapa del roble blanco y picotea
  { const sx = Math.round(60 + Math.floor((t - P4) * 1.2) % 3 * 14), sy = 30 - (Math.floor(t * 3) % 4 === 0 ? 2 : 0), pk = Math.sin(t * 6) > 0.6 ? 1 : 0;
    R.rect(sx - 3, sy - 4, sx + 3, sy, K); R.rect(sx - 2, sy - 3, sx + 2, sy - 1, H('#8a6a4a')); R.pset(sx - 1, sy - 3, H('#c8a878')); R.rect(sx + 2, sy - 6 + pk, sx + 5, sy - 3 + pk, K); R.pset(sx + 3, sy - 5 + pk, H('#6a4a30')); R.pset(sx + 4, sy - 5 + pk, H('#1a1a1a')); R.pset(sx + 6, sy - 4 + pk, H('#e8a020')); R.linea(sx - 4, sy - 2, sx - 6, sy - 1, H('#5a4030')); R.pset(sx - 1, sy + 1, H('#e8a020')); R.pset(sx + 1, sy + 1, H('#e8a020')); }
  // las gotas del roble rojo: salen por los poros desde «seep», bajan dejando rastro y caen al charco
  const sale = lin(t, SEEP - 0.4, SEEP + 0.4);
  const GOTAS = [[188, 60], [205, 78], [232, 64], [252, 88], [196, 108], [244, 118], [214, 136], [258, 142], [226, 100]];
  GOTAS.forEach(([gx, gy], k) => { const f = ((t - SEEP + 0.4 - k * 0.17) * 0.55) % 1; if (sale <= 0 || t < SEEP - 0.4 + k * 0.17) { R.pset(gx, gy, H('#f0c0a0')); return; }
    const y = Math.round(gy + f * f * (170 - gy)); for (let j = Math.max(gy, y - 10); j < y; j++) R.pset(gx, j, mez(R.pget(gx, j), H('#3a1208'), 0.4));
    R.rect(gx - 1, y - 1, gx + 1, y + 1, H('#f6e2c8')); R.pset(gx - 1, y - 1, H('#ffffff')); R.pset(gx + 1, y + 1, H('#c89878')); });
  // el charco que crece y sus ondas
  const ch = 6 + 20 * lin(t, SEEP, VAPOR + 0.5);
  for (let y = 172; y <= 179; y++) for (let x = Math.round(224 - ch * 1.6); x <= 224 + ch * 1.6; x++) { const d = ((x - 224) / (ch * 1.6)) ** 2 + ((y - 175) / 4) ** 2; if (d <= 1) R.pset(x, y, d > 0.7 ? H('#8a6a50') : (Math.sin(x * 0.4 + t * 3) > 0.7 ? H('#f6e2d0') : H('#c8a080'))); }
  for (let k = 0; k < 3; k++) onda(214 + k * 12, 175, t, k, H('#f6e8d8'));
  // el vaho: desde «vapor» sube del charco y de los poros
  const va = lin(t, VAPOR - 0.3, VAPOR + 0.8);
  if (va > 0) { for (let k = 0; k < 9; k++) { const x0 = 186 + k * 9, y0 = 172 - (k % 3) * 24, al = Math.round(30 + 90 * va); vaho(x0, y0, t, al, H('#eef8fa'), k); vaho(x0 + 1, y0, t, al, H('#c8e4ea'), k + 0.5); }
    // y el velo que tiembla sobre el roble rojo
    for (let y = 40; y <= 170; y++) { const d = Math.round(Math.sin(y * 0.4 + t * 6) * va * 1.2); if (!d) continue; for (let x = 180; x <= 268; x++) if (bay(x, y) < 0.22 * va) R.pset(x, y, mez(R.pget(x, y), H('#e8f4f6'), 0.35)); } }
  // la lupa de Atom sobre el roble rojo: entra antes de «seep» y se queda; dentro, los poros grandes con las gotas que salen
  const le = suave(lin(t, P4 + 0.05, SEEP - 0.2)), lx = Math.round(lerp(330, 222, le)), ly = Math.round(lerp(200, 82, le) + Math.sin(t * 1.3) * 1.5), r = 25;
  if (le > 0) {
    R.recorte([lx - r, ly - r, lx + r, ly + r]);
    for (let y = ly - r; y <= ly + r; y++) for (let x = lx - r; x <= lx + r; x++) { const d = Math.hypot(x - lx, y - ly); if (d > r) continue;
      const sx = (x - lx) * 0.45 + 223, sy = (y - ly) * 0.45 + 82, veta = Math.sin(sy * 0.32 + Math.floor((sx - 176) / 11) * 2.1);
      let c = tono(BARRIL_R, 0.55 + (veta > 0.8 ? 0.2 : veta < -0.8 ? -0.2 : 0) - (d / r) * 0.2, x, y);
      if (veta > 0.55 && veta < 0.8 && hs(Math.floor(sx * 1.4), Math.floor(sy * 1.4), 5) > 0.5) c = BARRIL_R[0];
      if (((x - lx + 200) % 22) < 1) c = BARRIL_R[0];
      R.pset(x, y, c); }
    // gotas grandes que asoman en los poros y bajan
    for (let k = 0; k < 5; k++) { const gx = lx - 16 + k * 8, f = ((t - SEEP + k * 0.33) * 0.45) % 1, crece = lin(t, SEEP - 0.3 + k * 0.1, SEEP + 0.3 + k * 0.1); if (crece <= 0) continue;
      const gy = Math.round(ly - 12 + (k % 2) * 9 + (f > 0.4 ? (f - 0.4) * 50 : 0)), rr = Math.max(1, Math.round(crece * 2.5)); if (Math.hypot(gx - lx, gy - ly) > r - 3) continue;
      R.disco(gx, gy, rr, H('#f2dcc8')); R.pset(gx - 1, gy - 1, H('#ffffff')); R.pset(gx + rr - 1, gy + 1, H('#b88868')); }
    R.recorte(null);
    for (let a = 0; a < 6.3; a += 0.03) { R.pset(Math.round(lx + Math.cos(a) * (r + 1)), Math.round(ly + Math.sin(a) * (r + 1)), H('#c8a040')); R.pset(Math.round(lx + Math.cos(a) * (r + 2)), Math.round(ly + Math.sin(a) * (r + 2)), H('#8a6a20')); R.pset(Math.round(lx + Math.cos(a) * (r + 3)), Math.round(ly + Math.sin(a) * (r + 3)), K); }
    for (let i = 0; i < 6; i++) R.pset(lx - 14 + i, ly - 16 + i, H('#ffffff'));
    // el mango y la mano de Atom
    for (let i = 0; i < 22; i++) { const x = lx + 19 + i, y = ly + 19 + i; R.linea(x - 2, y + 1, x + 1, y - 2, K); R.pset(x, y, H('#6a4428')); R.pset(x - 1, y, H('#8a5a34')); }
    T.mano(R, lx + 38, ly + 40, -1, GUANTE, { sinManga: true });
  }
};

// ── 5 · fondo local: la bodega cerrada, desde abajo, con el vapor que se acumula ────────────────────────────────
const fondoBodega = () => {
  // el techo de tablas y los baos, oscuro; la escotilla cerrada con sus rendijas (x 118–202, y 0–30)
  for (let y = 0; y <= 52; y++) for (let x = 0; x <= 319; x++) { let c = tono([H('#2a1e16'), H('#22180f'), H('#1a120c')], 0.4 + (hs(x >> 3, y >> 2, 6) - 0.5) * 0.3, x, y); if (x % 11 === 0) c = H('#140e08'); if (tranquila(x, y)) c = (x + y) % 7 ? H('#22180f') : H('#251a12'); R.pset(x, y, c); }
  for (const yb of [20, 46]) for (let y = yb; y <= yb + 6; y++) for (let x = 0; x <= 319; x++) { if (tranquila(x, y)) continue; R.pset(x, y, y === yb ? H('#5a4430') : y === yb + 6 ? H('#0e0a06') : tono([H('#4a3626'), H('#3a2a1c'), H('#2e2016')], (y - yb) / 6 + (hs(x >> 2, y, 2) - 0.5) * 0.2, x, y)); }
  // la escotilla: marco y tablas con rendijas de luz
  R.rect(116, 0, 204, 32, H('#120c08'));
  for (let x = 120; x <= 200; x++) for (let y = 0; y <= 28; y++) { const tb = Math.floor((x - 120) / 10), xx = (x - 120) % 10; R.pset(x, y, xx === 9 ? H('#ffe8b0') : tono([H('#6a5038'), H('#5a4230'), H('#4a3424')], (y / 28) * 0.6 + hs(tb, y >> 2, 3) * 0.3, x, y)); }
  for (let x = 118; x <= 202; x++) { R.pset(x, 29, H('#7a6048')); R.pset(x, 30, H('#2a1e14')); }
  // las cuadernas a los lados, en arco
  for (let k = 0; k < 4; k++) { const cx = k < 2 ? -40 + k * 18 : 360 - (k - 2) * 18; for (let y = 30; y <= 179; y++) { const x = Math.round(cx + (k < 2 ? 1 : -1) * Math.sqrt(Math.max(0, 140 * 140 - (y - 170) ** 2)) * 0.45); for (let i = 0; i < 9; i++) { const xx = x + (k < 2 ? -i : i); if (tranquila(xx, y)) continue; R.pset(xx, y, i === 0 ? H('#6a5038') : i === 8 ? H('#0e0a06') : tono([H('#4a3626'), H('#3a2a1c'), H('#2a1e14')], i / 8, xx, y)); } } }
  // el fondo de la bodega: forro oscuro entre cuadernas
  for (let y = 53; y <= 179; y++) for (let x = 40; x <= 280; x++) { const v = 1 - Math.abs(x - 160) / 140; R.pset(x, y, tono([H('#3a2a1c'), H('#2a1e14'), H('#1c140c'), H('#120c08')], 0.9 - v * 0.6 + (hs(x >> 4, y >> 3, 8) - 0.5) * 0.2, x, y)); if ((y - 53) % 8 === 0) R.pset(x, y, H('#120c08')); }
  // tres filas de barriles tumbados de cara, de lejos (pequeños, oscuros) a cerca (grandes)
  const fila = (y, r, xs, osc) => { for (const [x, rojo] of xs) { const cs = rojo ? BARRIL_R : BARRIL_B; R.disco(x, y, r + 1, K); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; let c = tono(cs, 0.65 - d / r * 0.4 - j / r * 0.15 - osc, x + i, y + j); if (Math.abs(((i + r) % Math.max(3, Math.round(r / 3)))) === 0) c = cs[0]; if (d > r - 1.6) c = H('#3a3a44'); if (d > r - 0.6) c = K; R.pset(x + i, y + j, c); } R.disco(x + Math.round(r * 0.35), y - Math.round(r * 0.3), Math.max(1, Math.round(r / 7)), K); } };
  fila(96, 9, [[96, 0], [116, 1], [136, 0], [184, 0], [204, 1], [224, 0]], 0.3);
  fila(116, 13, [[66, 0], [94, 1], [122, 1], [198, 0], [226, 1], [254, 0]], 0.18);
  fila(150, 22, [[28, 1], [74, 0], [120, 1], [200, 0], [246, 1], [292, 0]], 0);
  // las cuñas bajo la fila de cerca y el suelo de tablas que asoma entre barriles
  for (let y = 172; y <= 179; y++) for (let x = 0; x <= 319; x++) { const p = R.pget(x, y); if (p === H('#120c08') || p === H('#1c140c') || p === H('#2a1e14')) R.pset(x, y, tono([H('#5a4230'), H('#4a3424'), H('#3a2a1c')], 0.3 + hs(x >> 4, 1, 5) * 0.5, x, y)); }
  for (const x of [28, 74, 120, 200, 246, 292]) { R.poligono([[x - 26, 179], [x - 16, 170], [x - 12, 179]], H('#7a5a3a')); R.poligono([[x + 12, 179], [x + 16, 170], [x + 26, 179]], H('#6a4a2a')); }
  // un gancho de hierro en el puntal del centro (x 160)
  R.rect(158, 33, 162, 170, H('#2a1e14')); R.linea(158, 33, 158, 170, H('#5a4430')); R.linea(162, 33, 162, 170, H('#0e0a06'));
  R.linea(163, 104, 168, 104, H('#5a5a64')); R.linea(168, 104, 168, 110, H('#5a5a64')); R.pset(167, 110, H('#8a8a94'));
};
const p5 = (t) => {
  capa('bodegaC', fondoBodega);
  // el balanceo: un velo de luz que va y viene y los rayos por las rendijas, con motas
  const bal = Math.sin(t * 1.3);
  for (let k = 0; k < 8; k++) { const x0 = 129 + k * 10; for (let j = 0; j < 120; j++) { const x = Math.round(x0 + j * (0.35 + bal * 0.05)), y = 31 + j; if (hs(j, k, 2) > 0.62 || x > 319) continue; R.pset(x, y, mez(R.pget(x, y), H('#ffe8b0'), 0.32 - j / 500)); } }
  for (let k = 0; k < 18; k++) { const x = Math.round(130 + hs(k, 1, 3) * 120 + Math.sin(t * 0.7 + k) * 4), y = Math.round(40 + ((hs(k, 2, 3) * 100 + t * 3) % 100)); R.pset(x, y, H('#fff0c0')); }
  // la rata que corre por la fila de los barriles grandes
  { const u = lin(t, P5 + 0.2, P5 + 1.8), x = Math.round(lerp(-10, 330, u)), y = 128 + Math.round(Math.abs(Math.sin(x * 0.07)) * -3); if (u > 0 && u < 1) { const pa = Math.floor(t * 14) % 2; R.rect(x - 5, y - 4, x + 3, y, K); R.rect(x - 4, y - 3, x + 2, y - 1, H('#6a6058')); R.pset(x + 4, y - 3, K); R.pset(x + 5, y - 2, K); R.pset(x + 2, y - 3, H('#1a1a1a')); R.pset(x + 1, y - 5, H('#c89a8a')); R.linea(x - 6, y - 1, x - 11, y - 3 + pa, H('#8a6a5e')); R.pset(x - 3, y + 1, K); R.pset(x + 1 - pa, y + 1, K); } }
  // las gotas que rezuman de los rojos de cerca
  for (const [x, y] of [[20, 160], [36, 152], [114, 158], [128, 150], [240, 160], [254, 152]]) { const f = ((t * 0.6 + x * 0.013) % 1); R.pset(x, Math.round(y + f * 8), H('#f2dcc8')); }
  // el vapor de alcohol: hilos que salen por los tapones de los rojos y una niebla blanquecina que se acumula desde el
  // suelo con el borde en bollos («builds up»); por dentro, remolinos; lo de detrás tiembla un poco
  const sube = suave(lin(t, P5 + 0.1, BUILDS + 1.1)), nivel = lerp(186, 70, sube);
  for (const [bx, by] of [[36, 136], [128, 136], [254, 136], [116, 106], [226, 106], [204, 90]]) { vaho(bx, by, t, 26, H('#e4ece8'), bx); vaho(bx + 1, by, t, 20, H('#c4d4cc'), bx + 1); }
  for (let x = 0; x <= 319; x++) { const borde = nivel + Math.sin(x * 0.09 + t * 0.8) * 5 + Math.sin(x * 0.23 - t * 1.3) * 3;
    for (let y = Math.max(32, Math.floor(borde) - 2); y <= 179; y++) { if (tranquila(x, y)) continue; const d = y - borde; if (d < 0 && bay(x, y) > 0.3) continue;
      const a = d < 3 ? 0.42 : 0.24 + 0.07 * Math.sin(x * 0.05 + y * 0.11 + t);
      R.pset(x, y, mez(R.pget(x, y), d < 2 ? H('#f4f8f6') : H('#d8e4de'), a)); } }
  for (let k = 0; k < 4; k++) { const cx = ((k * 83 + t * (6 + k)) % 360) - 20, cy = Math.round(nivel + 12 + (k % 3) * 18); if (cy > 175) continue; for (let a = 0.4; a < 4.6; a += 0.12) { const r = 4 + a * 1.4, x = Math.round(cx + Math.cos(a + t) * r), y = Math.round(cy + Math.sin(a + t) * r * 0.45); if (!tranquila(x, y)) R.pset(x, y, H('#f6faf8')); } }
  // el aro suelto que roza el gancho con el balanceo, y la chispa en «spark»
  const ax = Math.round(170 + Math.sin(t * 1.3) * 3); for (let a = 0; a < 6.3; a += 0.15) R.pset(Math.round(ax + Math.cos(a) * 5), Math.round(112 + Math.sin(a) * 2), H('#6a6a74'));
  const ch = lin(t, SPARK - 0.05, SPARK + 0.35);
  if (ch > 0 && ch < 1) { for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const dd = Math.hypot(i, j); if (dd < 10 * (1 - ch) && bay(168 + i, 110 + j) < 0.5) R.pset(168 + i, 110 + j, mez(R.pget(168 + i, 110 + j), H('#fff0b0'), 0.5)); } chispa(168, 110, Math.round(3 + 6 * (1 - ch)), H('#fff4c0')); for (let k = 0; k < 6; k++) R.pset(Math.round(168 + Math.cos(k) * ch * 16), Math.round(110 + Math.sin(k * 1.7) * ch * 10 + ch * ch * 8), H('#ffd070')); }
  // el anillo azul que apenas tiembla en «enough»
  const az = lin(t, ENOUGH - 0.25, ENOUGH + 0.6);
  if (az > 0 && az < 1) for (let a = 0; a < 6.3; a += 0.06) { const rr = 6 + az * 40; if (hs(Math.floor(a * 10), 1, Math.floor(t * 10)) > 0.4) R.pset(Math.round(168 + Math.cos(a) * rr), Math.round(110 + Math.sin(a) * rr * 0.6), mez(C.llamaL, C.llama, az)); }
};

// ── 6 · la maqueta de 2006 de cerca: notas, cronómetro y gas ─────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'ucl', camara: 'caja' };
  const g = T.laboratorio(R, t, o);
  // los renglones que la mano va escribiendo en el cuaderno (x 6–48, y 164–179), sin letras: rayitas
  const esc = lin(t, Y2006 + 1.9, TESTED - 0.7);
  for (let k = 0; k < 4; k++) { const n = Math.round(Math.max(0, Math.min(1, esc * 4 - k)) * 26); for (let i = 0; i < n; i++) if (hs(i, k, 2) > 0.3) R.pset(18 + i, 171 + k * 2 - Math.round(i * 0.08), H('#2a2a4a')); }
  // el gas: desde «model» la boquilla tiembla y salen ondas transparentes hacia los cubos
  const gas = lin(t, MODEL + 0.2, MODEL + 1.0);
  if (gas > 0) { const [bx, by] = g.chispa ?? [81, 106]; for (let k = 0; k < 5; k++) for (let j = 0; j < 40 * gas; j++) { const x = Math.round(bx + 4 + j * 1.6 + Math.sin(j * 0.5 + t * 6 + k) * 2), y = Math.round(by - 6 + k * 3 - j * 0.3); if (hs(j, k, Math.floor(t * 8)) > 0.5) R.pset(x, y, mez(R.pget(x, y), H('#f0f8ff'), 0.55)); } }
  // la mano de Sella (manga de bata): escribe, sale; entra por la derecha, pulsa el cronómetro en «tested» y da dos
  // golpecitos al metacrilato en «model», junto a la bombona
  // la claqueta del documental (rayas y «2006», sin letras): entra, chasca en «2006» y sale
  const cq = suave(lin(t, P6 - 0.1, P6 + 0.35)) * (1 - suave(lin(t, Y2006 + 1.2, Y2006 + 1.7)));
  if (cq > 0) { const hx = 160, hy = Math.round(lerp(214, 150, cq)), ab = 1 - lin(t, Y2006 + 0.15, Y2006 + 0.4), ang = -0.5 * ab;
    R.rect(hx - 24, hy - 30, hx + 24, hy - 4, K); R.rect(hx - 23, hy - 29, hx + 23, hy - 5, H('#2a2a30')); R.linea(hx - 22, hy - 18, hx + 22, hy - 18, H('#d8d8d0')); R.linea(hx - 22, hy - 11, hx + 22, hy - 11, H('#d8d8d0'));
    R.numero('2006', hx - 15, hy - 20, { color: H('#f6f6f0') });
    for (let i = 0; i < 48; i++) { const x = Math.round(hx - 24 + Math.cos(ang) * i), y = Math.round(hy - 32 + Math.sin(ang) * i); for (let k = 0; k < 5; k++) R.pset(x, y - k, k === 0 || k === 4 ? K : Math.floor(i / 6) % 2 ? H('#f6f6f0') : H('#2a2a30')); }
    T.brazo(R, hx + 22, 216, hx + 6, hy + 2, BATA, -1, { codo: [hx + 22, hy + 24] }); }
  if (t > Y2006 + 1.5 && t < TESTED - 0.55) {
    const w = suave(lin(t, Y2006 + 1.5, Y2006 + 2.0)) * (1 - suave(lin(t, TESTED - 1.0, TESTED - 0.55)));
    const hx = Math.round(lerp(-10, 24 + esc * 22, w) + Math.sin(t * 11) * 2), hy = Math.round(lerp(200, 170 + Math.sin(t * 19) * 0.8, w));
    T.brazo(R, hx - 34, 206, hx, hy, BATA, 1, { codo: [hx - 26, hy + 22] });
    R.linea(hx + 6, hy + 2, hx + 12, hy - 8, K); R.linea(hx + 7, hy + 2, hx + 13, hy - 8, H('#e8c040')); R.pset(hx + 6, hy + 3, K);
  } else {
    const w = suave(lin(t, TESTED - 0.55, TESTED - 0.1)), sale = suave(lin(t, MODEL + 0.9, MODEL + 1.4));
    const toca = t > MODEL - 0.6, tg = toca ? suave(lin(t, MODEL - 0.6, MODEL - 0.15)) : 0;
    let hx = lerp(330, 258, w), hy = lerp(200, 154 + (t > TESTED && t < TESTED + 0.2 ? 2 : 0), w);
    hx = Math.round(lerp(hx, 340, tg)); hy = Math.round(lerp(hy, 200, tg));
    if (hy < 200 && hx < 330) T.brazo(R, hx + 40, 210, hx, hy, BATA, -1, { codo: [hx + 30, hy + 26] });
    // la otra mano, desde abajo a la izquierda, da dos golpecitos al metacrilato delante de la bombona en «model»
    const iz = suave(lin(t, MODEL - 0.7, MODEL - 0.15)) * (1 - sale);
    if (iz > 0) { const lx = Math.round(lerp(40, 72, iz)), ly = Math.round(lerp(214, 142, iz) + (t > MODEL && t < MODEL + 0.5 && Math.floor(t * 8) % 2 ? 2 : 0)); T.brazo(R, lx - 26, 210, lx, ly, BATA, 1, { codo: [lx - 22, ly + 26] }); }
  }
};

// ── 7 · el laboratorio de 2006: «fuuum», los cubos intactos y la ceja ─────────────────────────────────────────
const p7 = (t) => {
  const fuego = lin(t, BURST - 0.05, BURST + 3.0);
  const o = { encuadre: 'ucl', fuego };
  const g = T.laboratorio(R, t, o);
  // Sella va de la derecha al pulsador, aprieta en «burst»; la lengua de llama, la ceja chamuscada, la sonrisa
  const [sx0] = g.sella ?? [228, 158], [jx] = g.junto_boton ?? [77, 158], [bx, by] = g.boton ?? [99, 135];
  const u = suave(lin(t, P7 + 0.1, GAS + 0.9)), x = Math.round(lerp(-18, jx, u));
  const aprieta = t > BURST - 0.35 && t < BURST + 0.5, chamusca = t > FLAME, mira = t > CUBES2 - 0.2 && t < SCORCHED, toca = t > SCORCHED - 0.1;
  const s = R.actor(EL.sellaMC, x, g.suelo ?? 158, t, { dir: 1, anda: u > 0 && u < 1, sostiene: aprieta ? [bx, by + (t > BURST ? 1 : 0)] : false, sorpresa: t > FLAME - 0.1 && t < FILLED + 0.9, sonrisa: mira, dedo: toca, ceja: chamusca ? H('#8a8a8a') : undefined });
  // la lengüecita azul que sale de la escotilla hacia él
  const le = lin(t, FLAME - 0.15, FLAME + 0.5);
  if (le > 0 && le < 1) { const [tx, ty] = g.tapa ?? [158, 108]; for (let j = 0; j < 40; j++) { const f = j / 40; if (f > le * 1.4 || f < le - 0.5) continue; const xx = Math.round(lerp(tx - 6, s.cabeza[0] + 4, f)), yy = Math.round(lerp(ty - 2, s.cabeza[1] + 4, f) - Math.sin(f * Math.PI) * 10 + Math.sin(j + t * 30) * 1.5); R.disco(xx, yy, Math.max(1, Math.round(3 - f * 2)), f < 0.5 ? C.llama : C.llamaL); } }
  // la ceja chamuscada: un hilo de humo gris que sube de la frente
  if (chamusca) { const [hx, hy] = s.cabeza, dd = 1; const fx = hx + dd * 2;
    // la frente tiznada y los pelos de la ceja de punta
    for (const i of [-1, 0, 1, 2, 3]) R.pset(fx + i * dd, hy + 3, H('#4a4440')); R.pset(fx + dd, hy + 2, H('#2a2420')); R.pset(fx + 3 * dd, hy + 2, H('#2a2420'));
    // el «puf» de hollín al chamuscarse, que se deshace, y luego el hilo de humo que sube de la ceja
    const puf = lin(t, FLAME + 0.05, FLAME + 0.9); if (puf < 1) for (let k = 0; k < 5; k++) { const a = k * 1.3, rr = 2 + puf * 7; const xx = Math.round(fx + 1 + Math.cos(a) * rr), yy = Math.round(hy + 2 + Math.sin(a) * rr * 0.7 - puf * 4); R.disco(xx, yy, Math.max(1, Math.round(3 - puf * 2)), K); R.disco(xx, yy, Math.max(1, Math.round(2.4 - puf * 2)), puf < 0.5 ? H('#5a5a60') : H('#8a8a90')); }
    for (let k = 0; k < 4; k++) { const yy = Math.round(hy - 1 - ((t * 9 + k * 4) % 16)), xx = Math.round(fx + 1 + Math.sin(yy * 0.45 + k) * 2.5); R.disco(xx, yy, k % 2 ? 1 : 2, k % 2 ? H('#d8d8dc') : H('#a8a8ae')); } }
  // los cubos blancos que se ven intactos: un brillo que pasa en «cubes»
  const br = lin(t, CUBES2 - 0.1, CUBES2 + 0.8); if (br > 0 && br < 1) { const xx = Math.round(lerp(112, 205, br)); for (let k = 0; k < 6; k++) R.pset(xx - k, 122 + k * 2, H('#ffffff')); }
  if (t > CUBES2 + 0.1 && t < SCORCHED + 0.5) R.bocadillo(s.cabeza[0], s.cabeza[1] - 6, { icono: '!' });
  T.laboratorioDelante(R, t, o);
};

const efectos = [
  [ABANDON + 0.1, 'pop'], [NINE, 'boing'], [NINE2, 'toc'], [NINE2 + 0.5, 'toc'], [OAK - 0.2, 'lapiz'],
  [SEEP, 'burbujas'], [VAPOR, 'vapor'], [SPARK, 'golpecito'], [SPARK + 0.05, 'brillo'],
  [Y2006 + 0.4, 'toc'], [TESTED, 'tic'], [MODEL + 0.3, 'vapor'], [BURST, 'interruptor'], [BURST + 0.1, 'whoosh'], [FLAME + 0.3, 'pop'], [CUBES2 + 0.1, 'brillo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < P5 ? 1873 : t < P6 ? 1872 : 2006) });
'''

E['mc-barriles'] = ('Los barriles', CAB_BARRILES, _sub(PRE + CUERPO_BARRILES))


# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
CAB_MANCHESTER = r'''// MC-MANCHESTER (frases 26–27), cartela 2026; todo en 2026. Seis planos:
// 1. «In 2026, two chemists from the University of Manchester, Jack Rowbotham and Frank Mair»: fondo local: el campus de
//    ladrillo rojo con lluvia; pasa el tranvía y deja ver a los dos químicos con bata, bajo un paraguas, que llevan la
//    caja de la maqueta hacia la puerta de la torre; en «Jack Rowbotham» él da un saltito y habla; en «Frank Mair», él sonríe;
//    estudiantes con paraguas, una paloma en el charco, ventanas que se encienden. Corta en «repeated».
// 2. «repeated it with real ethanol and a wooden model, for a documentary. In New York's cold, the spark did nothing»: el
//    laboratorio de Mánchester; Rowbotham echa el etanol por la escotilla en «ethanol», toca la maqueta en «wooden model»
//    y se aparta a la derecha, junto al trípode; Mair saluda a la cámara del trípode en «documentary»; en «spark» aprieta el mando: el
//    chispazo, y nada: «?» en «nothing». Corta en «In the warmth».
// 3. «In the warmth of the Azores, the vapor went off violently, and the wood wasn't even scorched»: la maqueta de cerca;
//    la mano gira el mando de la placa en «warmth» y el termómetro sube; en «went off» estalla: la tapa vuela a cámara
//    lenta y vuelve a su sitio; en «wood» la mano pasa un pañuelo blanco por la obra viva y en «scorched» lo enseña
//    junto al borde, limpio, con un brillo.
// 4. «That would explain the open hatches and the hurry. But it needs to be said clearly»: fondo local: la sala de al lado
//    con la pantalla grande; en ella, el esquema del barco en corte: el vapor llena la bodega, en «open hatches» saltan
//    las tapas, en «hurry» el bote se aleja deprisa; Mair lo señala; en «But» la imagen se para (símbolo de pausa) y Mair
//    sigue con el dedo en alto y habla; Rowbotham sonríe con la tableta.
// 5. «It shows that it could have happened, not that it did»: fondo local: el escritorio de Atom; a la izquierda la
//    maqueta pequeña, a la derecha un cuadrito del Mary Celeste navegando solo; la mano de Atom pone un «=» de latón en
//    «shows», sale un ✓ sobre la maqueta en «could», y en «not that it did» la mano lo tacha con rotulador rojo: «≠»; «?»
//    sobre el cuadro.
// 6. «There are no witnesses, no remains of the boat, not a single letter from anyone who was on board»: fondo local: un
//    archivo con un fichero de roble y tres cajones grandes con su pictograma (persona, bote, sobre); la mano de Atom tira
//    de cada uno en su palabra (en «witnesses», «boat», «letter»): vacíos, con polvo y una X roja; del último sale una
//    polilla. La lámpara se mece.'''

CUERPO_MANCHESTER = r'''
const P2 = {{em:7.34}}, P3 = {{em:13.86}}, P4 = {{em:19.95}}, P5 = {{em:24.62}}, P6 = {{em:28.36}};
const TWO = {{em:2.86}}, MANCH = {{em:4.46}}, JACK = {{em:5.44}}, FRANK = {{em:6.34}};
const ETHANOL = {{em:8.42}}, WOODEN = {{em:9.44}}, DOC = {{em:10.68}}, COLD = {{em:12.26}}, SPARK = {{em:12.70}}, NOTHING = {{em:13.12}};
const WARMTH = {{em:14.11}}, AZORES = {{em:14.63}}, WENT = {{em:15.75}}, WOOD = {{em:17.33}}, SCORCHED = {{em:17.99}};
const EXPLAIN = {{em:21.09}}, OPEN = {{em:21.65}}, HURRY = {{em:22.63}}, BUT = {{em:23.34}}, CLEARLY = {{em:24.22}};
const SHOWS = {{em:25.42}}, COULD = {{em:26.10}}, NOT = {{em:27.18}}, DID = {{em:27.70}};
const WIT = {{em:28.79}}, BOAT = {{em:30.53}}, LETTER = {{em:31.81}}, BOARD = {{em:33.23}};

// ── 1 · fondo local: el campus de Mánchester con lluvia ────────────────────────────────────────────────────────
const LAD = [H('#d07656'), H('#b85e44'), H('#9e4c36'), H('#7e3c2c')], PIED = [H('#ece2c8'), H('#d6c8a8'), H('#b8a888'), H('#8a7c62')];
const ventanaG = (x, y, w, h, luz) => { const r = w / 2;
  for (let j = -2; j <= h + 1; j++) for (let i = -2; i <= w + 1; i++) { const yy = j, arcoY = r * 1.2; let dentro;
    if (yy >= arcoY) dentro = true; else { const half = r * Math.sqrt(Math.max(0, 1 - ((arcoY - yy) / (arcoY)) ** 1.3)); dentro = Math.abs(i + 0.5 - r) <= half + 2; }
    if (!dentro) continue; const vid = i >= 0 && i < w && j >= 0 && j < h && (yy >= arcoY || Math.abs(i + 0.5 - r) <= r * Math.sqrt(Math.max(0, 1 - ((arcoY - yy) / arcoY) ** 1.3)));
    R.pset(x + i, y + j, vid ? (i === Math.floor(w / 2) || j === Math.floor(h * 0.55) ? PIED[2] : luz ? tono([H('#ffe6a0'), H('#f2c46a'), H('#d8a050')], j / h, x + i, y + j) : tono([H('#4a5a74'), H('#34445e'), H('#26334a')], j / h + (i < 2 ? -0.3 : 0), x + i, y + j)) : (j > h ? PIED[3] : PIED[1])); }
};
const VENT = []; for (let i = 0; i < 8; i++) { VENT.push([8 + i * 23, 44, 0]); VENT.push([8 + i * 23, 74, 1]); } for (let i = 0; i < 3; i++) { VENT.push([246 + i * 25, 44, 0]); VENT.push([246 + i * 25, 74, 1]); }
const fondoCampus = () => {
  cieloT(0, 60, [H('#7e8896'), H('#8e98a4'), H('#9ea6b0'), H('#aeb4bc')]);
  // los tejados de pizarra con buhardillas (por debajo de la barra del año)
  for (let y = 26; y <= 36; y++) for (let x = 0; x <= 319; x++) { if (x > 190 && x < 242) continue; R.pset(x, y, y === 26 ? H('#5a6070') : tono([H('#4a5060'), H('#3e4454'), H('#323846')], (y - 26) / 10 + ((x + (y % 2) * 3) % 6 === 0 ? 0.3 : 0), x, y)); }
  for (const gx of [40, 112, 270]) { for (let j = 0; j < 10; j++) for (let i = -j; i <= j; i++) R.pset(gx + i, 26 + j, i === -j || i === j ? PIED[2] : tono(LAD, 0.5, gx + i, 26 + j)); R.disco(gx, 31, 2, PIED[3]); R.pset(gx, 31, H('#3a3a40')); }
  // la fachada de ladrillo
  for (let y = 36; y <= 124; y++) for (let x = 0; x <= 319; x++) { if (x > 192 && x < 240) continue; const f = y >> 2, off = (f % 2) * 5, id = Math.floor((x + off) / 10);
    let c = tono(LAD, 0.3 + hs(id, f, 4) * 0.55, x, y); if ((y & 3) === 3 || (x + off) % 10 === 9) c = H('#8a7a6c'); if (hs(x, y, 9) > 0.985) c = LAD[3]; R.pset(x, y, c); }
  for (const yb of [62, 94]) { for (let y = yb; y <= yb + 3; y++) for (let x = 0; x <= 319; x++) { if (x > 192 && x < 240) continue; R.pset(x, y, y === yb ? PIED[0] : y === yb + 3 ? PIED[3] : tono(PIED, 0.4, x, y)); } }
  for (const [x, y, fila] of VENT) ventanaG(x, y, 11, fila ? 18 : 16, false);
  // la torre con su reloj, la celosía del campanario y el chapitel
  for (let y = 4; y <= 124; y++) for (let x = 194; x <= 238; x++) { let c; if (y < 20) { const w = (y - 4) * 1.35; if (Math.abs(x - 216) > w) continue; c = Math.abs(x - 216) > w - 1.5 ? H('#2a3040') : tono([H('#5a6474'), H('#4a5262'), H('#3a4252')], (x - 196) / 40, x, y); }
    else { const f = y >> 2, off = (f % 2) * 5; c = tono(LAD, 0.25 + hs(Math.floor((x + off) / 10), f, 5) * 0.5, x, y); if ((y & 3) === 3 || (x + off) % 10 === 9) c = H('#8a7a6c'); if (x < 198 || x > 234) c = (y >> 3) % 2 ? PIED[1] : PIED[2]; if (y >= 20 && y <= 22) c = PIED[0]; }
    R.pset(x, y, c); }
  for (const px of [194, 238]) for (let y = 12; y <= 22; y++) { R.pset(px, y, PIED[2]); R.pset(px + (px < 200 ? 1 : -1), y, PIED[1]); }
  R.disco(216, 34, 9, H('#2a2a30')); R.disco(216, 34, 8, PIED[0]); R.disco(216, 34, 7, H('#f6f2e6')); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; R.pset(Math.round(216 + Math.cos(a) * 6), Math.round(34 + Math.sin(a) * 6), H('#3a3a40')); }
  for (let k = 0; k < 4; k++) ventanaG(198 + k * 9, 50, 6, 14, false);
  for (let y = 52; y <= 62; y += 2) R.linea(199, y, 233, y, H('#3a4a5e'));
  // la puerta en arco de la torre con su escalinata
  ventanaG(204, 92, 24, 32, false); for (let y = 100; y <= 124; y++) for (let x = 205; x <= 226; x++) { const c = tono([H('#5a3a24'), H('#4a2e1c'), H('#3a2416')], (x - 205) / 22, x, y); R.pset(x, y, x === 215 || x === 216 ? H('#2a1a10') : (y - 100) % 6 === 0 && (x % 4 === 0) ? H('#c8a040') : c); }
  for (const lx of [200, 231]) { R.rect(lx, 98, lx + 2, 104, H('#1a1a20')); R.rect(lx, 99, lx + 2, 103, H('#ffe08a')); }
  for (let k = 0; k < 3; k++) R.rect(200 - k * 3, 124 + k * 2, 232 + k * 3, 125 + k * 2, k % 2 ? PIED[2] : PIED[1]);
  // la verja de hierro con hiedra detrás
  for (let y = 112; y <= 124; y++) for (let x = 0; x <= 319; x++) { if (x > 194 && x < 238) continue; if (y > 116 && hs(x >> 1, y >> 1, 3) > 0.35) R.pset(x, y, tono([H('#5a7a4a'), H('#3e5e36'), H('#2a4428')], hs(x, y, 2), x, y)); }
  for (let x = 0; x <= 319; x++) { if (x > 194 && x < 238) continue; R.pset(x, 113, H('#1a1a20')); R.pset(x, 121, H('#1a1a20')); if (x % 4 === 0) { R.linea(x, 110, x, 125, H('#1a1a20')); R.pset(x, 109, H('#4a4a52')); } }
  // la acera mojada de losas
  for (let y = 126; y <= 159; y++) for (let x = 0; x <= 319; x++) { const fy = Math.floor((y - 126) / 8), fx = Math.floor((x + fy * 13) / 30); let c = tono([H('#8a8e94'), H('#767a82'), H('#62666e'), H('#52565e')], 0.3 + hs(fx, fy, 6) * 0.45 + (y - 126) / 90, x, y);
    if ((y - 126) % 8 === 0 || (x + fy * 13) % 30 === 0) c = H('#44474e'); R.pset(x, y, c); }
  for (let x = 0; x <= 319; x++) { R.pset(x, 158, PIED[2]); R.pset(x, 159, PIED[3]); }
  // la calzada mojada con su raya
  for (let y = 160; y <= 179; y++) for (let x = 0; x <= 319; x++) { let c = tono([H('#4a4c54'), H('#3e4048'), H('#32343c')], 0.3 + hs(x >> 1, y, 8) * 0.4, x, y); if (y === 170 && (x % 24) < 12) c = H('#d8d4c4'); R.pset(x, y, c); }
  // la farola, el aparcabicis con dos bicis y la papelera
  R.rect(110, 72, 112, 158, H('#24262c')); R.pset(110, 72, H('#4a4c54')); R.rect(106, 64, 116, 72, H('#24262c')); R.rect(107, 65, 115, 71, H('#ffe6a0')); R.linea(106, 63, 116, 63, H('#24262c'));
  for (const bx of [58, 78]) { for (const wx of [bx, bx + 14]) { for (let a = 0; a < 6.3; a += 0.2) R.pset(Math.round(wx + Math.cos(a) * 5), Math.round(152 + Math.sin(a) * 5), H('#1a1a20')); R.pset(wx, 152, H('#8a8a94')); } R.linea(bx, 152, bx + 7, 146, H('#2a6a9a')); R.linea(bx + 7, 146, bx + 14, 152, H('#2a6a9a')); R.linea(bx + 7, 146, bx + 6, 143, H('#2a6a9a')); R.linea(bx + 12, 144, bx + 14, 152, H('#2a6a9a')); R.linea(bx + 4, 143, bx + 8, 143, K); R.linea(bx + 11, 143, bx + 14, 143, K); }
  R.rect(170, 144, 178, 158, H('#24262c')); R.rect(171, 145, 177, 157, H('#3a5a4a')); R.linea(170, 144, 178, 144, H('#6a6c74'));
  // los charcos (brillan más en la parte dinámica)
  for (const [cx, cy, w] of [[30, 150, 14], [146, 142, 11], [262, 152, 16], [92, 172, 18], [230, 175, 14]]) for (let y = cy - 3; y <= cy + 3; y++) for (let x = cx - w; x <= cx + w; x++) if (((x - cx) / w) ** 2 + ((y - cy) / 3) ** 2 <= 1) R.pset(x, y, tono([H('#a8b0bc'), H('#8a94a2'), H('#6e7886')], (y - cy + 3) / 6, x, y));
};
const tranvia = (x, t) => { x = Math.round(x); const y0 = 124, y1 = 174;
  R.rect(x, y0 + 4, x + 150, y1, K); R.rect(x + 1, y0 + 5, x + 149, y1 - 1, H('#e8bc2a')); R.rect(x + 1, y1 - 14, x + 149, y1 - 1, H('#b8bcc4')); R.linea(x + 1, y1 - 14, x + 149, y1 - 14, H('#6a6e78'));
  R.rect(x + 1, y0 + 5, x + 149, y0 + 7, H('#f6d860'));
  for (let k = 0; k < 7; k++) { const wx = x + 8 + k * 20; R.rect(wx, y0 + 12, wx + 15, y0 + 28, H('#2a3444')); R.linea(wx, y0 + 12, wx + 15, y0 + 12, H('#5a6a84')); if (k % 2 === 0) { R.disco(wx + 6, y0 + 22, 3, H('#c88a5a')); R.rect(wx + 3, y0 + 25, wx + 9, y0 + 28, k % 4 ? H('#3a6a8a') : H('#8a3a3a')); } if (k === 3) R.rect(wx + 2, y0 + 12, wx + 13, y1 - 16, H('#3a4454')); }
  R.rect(x + 146, y0 + 10, x + 150, y0 + 30, H('#2a3444')); R.rect(x + 145, y1 - 12, x + 150, y1 - 8, H('#fff4c0'));
  R.linea(x + 60, y0 + 4, x + 72, y0 - 10, K); R.linea(x + 72, y0 - 10, x + 84, y0 + 4, K); R.linea(x + 64, y0 - 10, x + 80, y0 - 10, K);
  for (const wx of [x + 22, x + 128]) { R.disco(wx, y1, 5, K); R.disco(wx, y1, 3, H('#5a5e66')); }
};
const p1 = (t) => {
  capa('campus', fondoCampus);
  // las nubes por encima de los tejados y las palomas
  nubes(t, [[20, 12, 40, 3], [180, 8, 36, 2], [330, 16, 44, 4]], [H('#c4c8d0'), H('#a4aab4'), H('#868e9a')], 24, 0, 192);
  nubes(t, [[260, 14, 30, 3]], [H('#c4c8d0'), H('#a4aab4'), H('#868e9a')], 24, 240, 319);
  // ventanas que se encienden y se apagan
  VENT.forEach(([x, y, f], k) => { const on = Math.sin(t * 0.7 + k * 2.3) > 0.55 - (k % 5 === 0 ? 0.6 : 0); if (on) ventanaG(x, y, 11, f ? 18 : 16, true); });
  // el reflejo de las ventanas y la farola en la acera mojada, que tiembla
  for (const [x, y, f] of VENT) { if (f !== 1 || Math.sin(t * 0.7 + VENT.findIndex((v) => v[0] === x && v[1] === y) * 2.3) <= -0.05) continue; for (let j = 0; j < 14; j++) { const xx = x + 5 + Math.round(Math.sin(j * 0.9 + t * 4) * 1); if (hs(j, x, 1) > 0.4) R.pset(xx, 130 + j * 2, H('#c8a868')); } }
  for (let j = 0; j < 10; j++) R.pset(111 + Math.round(Math.sin(j + t * 5)), 160 + j * 2, H('#e8d8a0'));
  // las agujas del reloj
  { const am = t * 0.4, ah = t * 0.04 + 1.2; R.linea(216, 34, Math.round(216 + Math.sin(am) * 6), Math.round(34 - Math.cos(am) * 6), H('#1a1a20')); R.linea(216, 34, Math.round(216 + Math.sin(ah) * 4), Math.round(34 - Math.cos(ah) * 4), H('#1a1a20')); }
  // ondas en los charcos
  [[30, 150], [146, 142], [262, 152], [92, 172], [230, 175]].forEach(([x, y], k) => { onda(x - 4, y, t, k, H('#dfe6ee')); onda(x + 5, y, t + 0.4, k + 7, H('#dfe6ee')); });
  // una paloma que picotea junto al charco y se aparta cuando pasan
  { const huye = lin(t, 3.6, 4.4), x = Math.round(150 + huye * 40), y = 146 - Math.round(Math.sin(huye * Math.PI) * 14), pk = Math.sin(t * 7) > 0.5 && huye === 0 ? 1 : 0;
    R.rect(x - 3, y - 4, x + 3, y, K); R.rect(x - 2, y - 3, x + 2, y - 1, H('#8a8e9a')); R.pset(x + 1, y - 3, H('#5a8a7a')); R.rect(x + 2, y - 6 + pk, x + 4, y - 4 + pk, K); R.pset(x + 3, y - 5 + pk, H('#6a6e7a')); R.pset(x + 5, y - 4 + pk, H('#c89a6a')); R.pset(x - 1, y + 1, H('#c86a6a')); R.pset(x + 1, y + 1, H('#c86a6a')); }
  // dos estudiantes con paraguas que cruzan
  const est = (def, x, dir, col) => { R.actor(def, Math.round(x), 158, t, { dir, anda: true }); const ux = Math.round(x + 7), uy = 128; R.linea(ux, uy, ux, uy + 14, H('#2a2a30')); for (let i = -11; i <= 11; i++) { const h = Math.round(Math.sqrt(121 - i * i) * 0.55); R.linea(ux + i, uy - h, ux + i, uy, i % 4 === 0 ? mez(col, K, 0.4) : col); } R.linea(ux - 11, uy, ux + 11, uy, mez(col, K, 0.5)); };
  est(EL.chica, lerp(330, 236, lin(t, 0, 7.4)), -1, H('#3a5a9a'));
  est(EL.sudadera, lerp(-30, 60, lin(t, 4.2, 7.4)), 1, H('#9a3a4a'));
  // los dos químicos: llegan andando bajo el paraguas, con la caja de la maqueta
  const u = suave(lin(t, 1.5, MANCH + 0.7)), x = Math.round(lerp(-12, 172, u)), anda = u > 0 && u < 1;
  const v = suave(lin(t, FRANK + 0.5, P2 + 0.1)), xm = x + Math.round(v * 22);
  const mi = R.actor(EL.mairMC, xm, 158, t, { dir: 1, anda: anda || (v > 0 && v < 1), sostiene: [xm + 13, 138], sonrisa: t > FRANK - 0.1 && t < FRANK + 0.9, habla: t > FRANK + 0.1 && t < FRANK + 0.6 && pul(t, 14) });
  const vuelve = false, habla = t > JACK - 0.1 && t < FRANK - 0.1;
  const ro = R.actor(EL.rowbothamMC, xm + 17, 158, t, { dir: vuelve ? -1 : 1, anda: anda || (v > 0 && v < 1), sostiene: true, habla: habla && pul(t, 13), salto: t > JACK && t < JACK + 0.25 ? 1 : 0, sonrisa: t > FRANK + 0.3 });
  { const [hx, hy] = ro.mano; R.rect(hx - 6, hy - 6, hx + 6, hy + 2, K); R.rect(hx - 5, hy - 5, hx + 5, hy + 1, H('#b88a52')); R.linea(hx - 5, hy - 2, hx + 5, hy - 2, H('#8a6238')); R.pset(hx - 4, hy - 4, H('#e0b878')); }
  { const [hx, hy] = mi.mano, ux = hx + 2, uy = hy - 13; R.linea(hx, hy, ux, uy, H('#2a2a30')); for (let i = -17; i <= 17; i++) { const h = Math.round(Math.sqrt(289 - i * i) * 0.5); R.linea(ux + i, uy - h, ux + i, uy, i % 6 === 0 ? H('#1a3a2c') : H('#2a5a44')); } R.linea(ux - 17, uy, ux + 17, uy, H('#163024')); R.pset(ux, uy - 9, H('#c8c8c0'));
    for (let k = 0; k < 4; k++) { const f = (t * 3 + k * 0.25) % 1; R.pset(ux - 17 - Math.round(f * 3), uy + Math.round(f * 8), H('#dfe6ee')); R.pset(ux + 17 + Math.round(f * 3), uy + Math.round(f * 8), H('#dfe6ee')); } }
  // el tranvía que pasa por delante y descubre a los dos
  const tx = lerp(-40, 340, lin(t, 0.9, 2.7)); if (tx < 330) tranvia(tx, t);
  lluvia(t, 0, 0, 319, 179, H('#c8d0dc'), 110, 190);
};

// ── 2 · el laboratorio de Mánchester: etanol, cámara, chispa en frío ─────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'manchester', calor: 0, chispa: lin(t, SPARK - 0.05, SPARK + 0.45) };
  const g = T.laboratorio(R, t, o);
  const [mx, sy] = (g.quimicos ?? [[54, 158]])[0];
  // Mair, detrás de la mampara, con el mando: saluda a la cámara en «documentary», aprieta en «spark»
  const mair = R.actor(EL.mairMC, mx, sy, t, { dir: 1, dedo: t > DOC - 0.2 && t < DOC + 0.9, sostiene: t > DOC + 0.9 ? [mx + 15, 140 + (t > SPARK - 0.05 && t < SPARK + 0.3 ? 1 : 0)] : false, triste: t > NOTHING + 0.1, habla: t > DOC && t < DOC + 0.6 && pul(t, 12) });
  if (t > DOC + 0.9) { const [hx, hy] = mair.mano; R.rect(hx - 2, hy - 4, hx + 2, hy + 2, K); R.rect(hx - 1, hy - 3, hx + 1, hy + 1, H('#3a3a44')); R.pset(hx, hy - 3, t > SPARK - 0.05 && t < SPARK + 0.3 ? H('#ff4040') : H('#8a2020')); }
  // Rowbotham echa el etanol con el frasco lavador, toca la maqueta y se va detrás de la mampara
  const va = suave(lin(t, WOODEN + 0.4, DOC + 0.2)), rx = Math.round(lerp(214, 272, va));
  const echa = t > ETHANOL - 0.5 && t < ETHANOL + 0.7, toca = t > WOODEN - 0.3 && t < WOODEN + 0.4;
  const ro = R.actor(EL.rowbothamMC, rx, 158, t, { dir: va > 0 && va < 1 ? 1 : -1, anda: va > 0 && va < 1, sostiene: echa ? [rx - 3, 124] : toca ? [rx - 2, 132] : false, sorpresa: t > NOTHING && t < NOTHING + 0.5 });
  if (echa) { const [hx, hy] = ro.mano; R.rect(hx - 4, hy - 9, hx + 4, hy + 2, K); R.rect(hx - 3, hy - 8, hx + 3, hy + 1, H('#f2f8fa')); R.rect(hx - 3, hy - 4, hx + 3, hy + 1, H('#7ac0e8')); R.rect(hx - 3, hy - 3, hx + 3, hy - 2, H('#e8303a')); R.linea(hx - 4, hy - 10, hx - 8, hy - 13, K); R.linea(hx - 3, hy - 10, hx - 7, hy - 13, H('#3a3a44'));
    const e = lin(t, ETHANOL - 0.3, ETHANOL + 0.1) * (1 - lin(t, ETHANOL + 0.5, ETHANOL + 0.7)); const [ex0, ex1, ey] = g.escotilla ?? [157, 168, 109];
    if (e > 0) for (let j = 0; j <= 20; j++) { const f = j / 20; if (f > e) break; const x = Math.round(lerp(hx - 8, (ex0 + ex1) / 2, f)), y = Math.round(lerp(hy - 13, ey - 1, f) - Math.sin(f * Math.PI) * 8); R.pset(x, y - 1, H('#ffffff')); R.pset(x, y, H('#bfe6ff')); R.pset(x, y + 1, H('#4a8ac0')); } for (let k = 0; k < 3; k++) if (e > 0.9) R.pset(Math.round((ex0 + ex1) / 2 + Math.sin(t * 20 + k * 2) * 3), ey - 2 - k, H('#ffffff')); }
  if (t > NOTHING && t < P3 - 0.1) R.bocadillo(rx + 8, 128, { icono: '?' });
  T.laboratorioDelante(R, t, o);
};

// ── 3 · la maqueta de cerca: calor, estallido, la madera limpia ─────────────────────────────────────────────
const p3 = (t) => {
  const o = { encuadre: 'manchester', camara: 'maqueta', calor: suave(lin(t, WARMTH - 0.1, AZORES + 0.9)), estalla: lin(t, WENT - 0.12, WENT + 2.4) };
  const g = T.laboratorio(R, t, o);
  // la mano gira el mando de la placa (abajo a la derecha) en «warmth» y se va
  const m = suave(lin(t, P3, WARMTH - 0.1)) * (1 - suave(lin(t, AZORES + 0.5, AZORES + 1.0)));
  if (m > 0) { const hx = Math.round(lerp(330, 232, m)), hy = Math.round(lerp(200, 150, m)), gir = Math.sin(lin(t, WARMTH - 0.1, AZORES) * 3) * 2; T.brazo(R, hx + 40, 210, hx, hy + Math.round(gir), BATA, -1, { codo: [hx + 32, hy + 26] }); }
  // en «wood» la mano pasa un pañuelo de papel blanco por la obra viva; en «scorched» lo enseña junto al borde: limpio
  const d = suave(lin(t, WOOD - 0.7, WOOD - 0.2)), pasa = lin(t, WOOD - 0.2, SCORCHED - 0.1), ens = suave(lin(t, SCORCHED - 0.1, SCORCHED + 0.5));
  if (d > 0) { let hx = lerp(-20, 74, d) + pasa * 66, hy = lerp(210, 133, d) + Math.sin(pasa * 18) * 1.5; hx = lerp(hx, 36, ens); hy = lerp(hy, 140, ens); hx = Math.round(hx); hy = Math.round(hy);
    T.brazo(R, hx - 22, 206, hx, hy, BATA, 1, { codo: [hx - 20, hy + 24] });
    const px = hx + 9, py = hy - 4; R.poligono([[px - 4, py + 5], [px + 5, py + 4], [px + 6, py - 5], [px - 3, py - 6]], K); R.poligono([[px - 3, py + 4], [px + 4, py + 3], [px + 5, py - 4], [px - 2, py - 5]], H('#fbfbf8')); R.linea(px - 1, py - 3, px + 3, py + 1, H('#dcdcd8')); }
  const br = lin(t, SCORCHED - 0.05, SCORCHED + 0.9); if (br > 0 && br < 1) { chispa(Math.round(lerp(140, 52, br)), Math.round(lerp(128, 128, br)), Math.round(2 + Math.sin(br * Math.PI) * 4), H('#ffffff')); }
  if (t > SCORCHED + 0.3 && t < P4) { const k = Math.floor(t * 3) % 2; chispa(52, 128, 2 + k, H('#ffffff')); }
};

// ── 4 · fondo local: la sala de al lado con la pantalla grande y el esquema ────────────────────────────────────
const fondoSala = () => {
  // la pared de hormigón con sus berenjenos y el panel de listones de roble
  for (let y = 0; y <= 132; y++) for (let x = 0; x <= 319; x++) { let c = tono([H('#dcd8d0'), H('#d0ccc4'), H('#c4c0b8')], 0.35 + hs(Math.floor(x / 40), Math.floor(y / 22), 3) * 0.25 + (hs(x, y, 1) - 0.5) * 0.15, x, y);
    if (!tranquila(x, y) && ((x % 40 === 0) || (y % 22 === 0))) c = H('#b8b4ac'); if (!tranquila(x, y) && x % 40 === 20 && y % 22 === 11) c = H('#8a8680'); R.pset(x, y, c); }
  for (let y = 14; y <= 118; y++) for (let x = 58; x <= 262; x++) { const s = (x - 58) % 5; R.pset(x, y, s === 4 ? H('#5a3e26') : tono([H('#c89a62'), H('#b0844e'), H('#94703e')], (s === 0 ? 0 : 0.5) + Math.sin(y * 0.2 + x) * 0.15, x, y)); }
  // la pantalla: marco negro (el contenido va aparte)
  R.rect(68, 20, 252, 112, H('#0c0c10')); R.rect(70, 22, 250, 110, H('#18181e')); R.pset(160, 111, H('#3aff6a'));
  // la ventana de la izquierda con lluvia y el edificio de ladrillo de enfrente
  R.rect(4, 22, 50, 102, H('#3a3c44'));
  for (let y = 24; y <= 100; y++) for (let x = 6; x <= 48; x++) { let c; if (y < 44) c = tono([H('#9aa2ae'), H('#aab0ba')], (y - 24) / 20, x, y); else { const f = y >> 2, off = (f % 2) * 4; c = tono(LAD, 0.35 + hs(Math.floor((x + off) / 8), f, 2) * 0.4, x, y); if ((y & 3) === 3) c = H('#8a7a6c'); if ((x - 6) % 14 < 6 && (y - 50) % 18 < 10) c = (x + y) % 3 ? H('#3a4a62') : H('#4a5a74'); } R.pset(x, y, c); }
  R.linea(27, 22, 27, 102, H('#3a3c44')); R.linea(4, 62, 50, 62, H('#3a3c44')); R.rect(2, 102, 52, 106, H('#e8e6e0'));
  // la estantería de la derecha con archivadores y una planta (por debajo de la esquina de Atom)
  R.rect(262, 56, 316, 130, H('#6a6e78')); for (const sy of [56, 80, 104, 128]) R.rect(262, sy, 316, sy + 2, H('#9aa0aa'));
  for (let k = 0; k < 15; k++) { const x = 265 + (k % 5) * 10, y = 60 + Math.floor(k / 5) * 24, c = [H('#c83a3a'), H('#3a6ac8'), H('#e8c040'), H('#3a9a6a'), H('#e8e8e0')][(k * 3) % 5]; R.rect(x, y, x + 8, y + 19, K); R.rect(x + 1, y + 1, x + 7, y + 18, c); R.disco(x + 4, y + 14, 1, H('#2a2a30')); R.rect(x + 2, y + 3, x + 6, y + 7, H('#f6f6f0')); }
  R.rect(252, 46, 266, 56, H('#e8e2d8')); for (let k = 0; k < 9; k++) R.linea(259, 46, 259 + Math.round(Math.cos(k * 0.7 + 3.4) * 9), 46 - Math.round(Math.abs(Math.sin(k * 0.7 + 3.4)) * 10), k % 2 ? H('#3a8a4a') : H('#5aaa5a'));
  // el mueble bajo con la portátil, dos tazas, papeles y un barquito
  R.rect(56, 114, 262, 134, H('#3a3c44')); R.rect(57, 115, 261, 133, H('#eceae4')); R.linea(57, 115, 261, 115, H('#ffffff')); for (const dx of [57, 126, 194, 261]) R.linea(dx, 116, dx, 133, H('#b8b6b0')); for (const dx of [90, 160, 228]) R.rect(dx - 6, 123, dx + 6, 124, H('#8a8a94'));
  R.rect(80, 104, 106, 113, K); R.rect(81, 105, 105, 112, H('#2a3a54')); R.linea(81, 105, 105, 105, H('#5a7aa4')); R.linea(76, 113, 110, 113, H('#a8acb4'));
  for (const cx of [196, 212]) { R.rect(cx, 106, cx + 7, 113, K); R.rect(cx + 1, 107, cx + 6, 112, cx === 196 ? H('#f2f2ee') : H('#c84a3a')); R.linea(cx + 7, 108, cx + 9, 110, K); }
  R.rect(120, 110, 140, 113, H('#f6f6f0')); R.linea(122, 111, 138, 111, H('#b8c0c8'));
  R.poligono([[228, 112], [250, 112], [246, 116], [232, 116]], H('#4a3424')); R.linea(238, 98, 238, 112, H('#3a2a1c')); R.poligono([[239, 99], [239, 110], [248, 110]], H('#f2ead6'));
  // el suelo de resina pulida con el reflejo azul de la pantalla
  for (let y = 135; y <= 179; y++) for (let x = 0; x <= 319; x++) { let c = tono([H('#9aa0a8'), H('#8a9098'), H('#7a8088')], 0.3 + (y - 135) / 80 + (hs(x >> 3, y >> 2, 4) - 0.5) * 0.1, x, y); if (x > 80 && x < 240 && y < 160 && bay(x, y) < 0.25 - (y - 135) / 120) c = H('#6a8ab0'); R.pset(x, y, c); }
  R.linea(0, 134, 319, 134, H('#5a5e66'));
  for (let x = 20; x <= 300; x++) if (x % 3 === 0) R.pset(x, 176, H('#5a5e66'));
};
const pantalla = (t) => {
  const tt = Math.min(t, BUT); R.recorte([70, 22, 250, 110]);
  for (let y = 22; y <= 110; y++) for (let x = 70; x <= 250; x++) R.pset(x, y, (x - 70) % 10 === 0 || (y - 22) % 10 === 0 ? H('#1e3450') : H('#132238'));
  // el mar y el barco en corte
  for (let x = 70; x <= 250; x++) { const y = Math.round(84 + Math.sin(x * 0.12 + tt * 2) * 1.5); R.pset(x, y, H('#5ac8e8')); for (let yy = y + 1; yy <= 110; yy++) if ((x + yy) % 3 === 0) R.pset(x, yy, H('#1a3a5a')); }
  const casco = [[96, 60], [204, 60], [198, 82], [186, 94], [114, 94], [100, 80]];
  R.poligono(casco, H('#22385a'));
  for (let i = 0; i < casco.length; i++) { const [a, b] = casco[i], [c, d] = casco[(i + 1) % casco.length]; R.linea(a, b, c, d, H('#e8f4ff')); }
  R.linea(98, 72, 202, 72, H('#5a7aa4'));
  for (const mxx of [126, 172]) R.linea(mxx, 60, mxx, 26, H('#e8f4ff'));
  for (let k = 0; k < 7; k++) { const bx = 112 + k * 12, by = 84; for (let a = 0; a < 6.3; a += 0.4) R.pset(Math.round(bx + Math.cos(a) * 4), Math.round(by + Math.sin(a) * 4), H('#c8a060')); }
  for (let k = 0; k < 6; k++) { const bx = 118 + k * 12, by = 77; for (let a = 0; a < 6.3; a += 0.5) R.pset(Math.round(bx + Math.cos(a) * 3), Math.round(by + Math.sin(a) * 3), H('#c8a060')); }
  // el vapor que llena la bodega
  const vap = lin(tt, P4 + 0.1, OPEN - 0.1); const nv = Math.round(lerp(92, 64, vap));
  for (let y = nv; y <= 92; y++) for (let x = 104; x <= 196; x++) if ((x + y * 2 + Math.floor(tt * 6)) % 5 === 0 && Math.sin(x * 0.3 + y * 0.5 + tt * 3) > -0.2) R.pset(x, y, H('#7ae8c8'));
  // las tapas que saltan en «open hatches» y el fogonazo
  const sal = lin(tt, OPEN - 0.1, OPEN + 0.9);
  for (const [hx, dir] of [[120, -1], [160, 1]]) { if (sal <= 0) { R.rect(hx - 6, 58, hx + 6, 60, H('#f2c060')); continue; }
    const x = Math.round(hx + dir * sal * 22), y = Math.round(58 - Math.sin(sal * Math.PI * 0.8) * 22 + sal * 10), a = sal * 4 * dir;
    R.linea(Math.round(x - Math.cos(a) * 6), Math.round(y - Math.sin(a) * 6), Math.round(x + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 6), H('#f2c060'));
    if (sal < 0.5) for (let k = 0; k < 8; k++) { const r = sal * 30; R.pset(Math.round(hx + Math.cos(k * 0.8) * r), Math.round(56 - Math.abs(Math.sin(k * 0.8)) * r), k % 2 ? H('#ffe08a') : H('#8ab4ff')); } }
  // el bote que se aleja deprisa en «hurry», con su estela
  const bo = suave(lin(tt, HURRY - 0.5, HURRY + 0.5)), bx = Math.round(lerp(212, 238, bo));
  R.poligono([[bx - 11, 80], [bx + 11, 80], [bx + 7, 86], [bx - 7, 86]], H('#e8f4ff')); R.linea(bx - 10, 82, bx + 10, 82, H('#8ab4d8'));
  for (let k = 0; k < 5; k++) { R.pset(bx - 8 + k * 4, 78, H('#f2c060')); R.pset(bx - 8 + k * 4, 79, H('#f2c060')); }
  if (bo > 0.05) { for (let k = 1; k < 7; k++) R.linea(bx - 13 - k * 4, 84 + (k % 2), bx - 11 - k * 4, 84 + (k % 2), H('#8ad8f0')); for (let k = 0; k < 3; k++) R.linea(bx + 14, 76 + k * 4, bx + 18 + Math.round(bo * 4), 76 + k * 4, H('#e8f4ff')); }
  // pausa en «But»: dos barras blancas
  if (t > BUT) { R.rect(232, 28, 235, 38, H('#f6f6f6')); R.rect(239, 28, 242, 38, H('#f6f6f6')); }
  R.recorte(null);
  // el brillo del cristal
  for (let i = 0; i < 18; i++) R.pset(76 + i, 104 - i, mez(R.pget(76 + i, 104 - i), H('#ffffff'), 0.3));
};
const p4 = (t) => {
  capa('sala', fondoSala);
  pantalla(t);
  // lluvia en la ventana y vapor de las tazas
  R.recorte([6, 24, 48, 100]); lluvia(t, 6, 24, 48, 100, H('#d0d8e4'), 18, 120); R.recorte(null);
  vaho(199, 105, t, 10, H('#ffffff'), 1); vaho(215, 105, t, 10, H('#f0f0f0'), 2);
  // Rowbotham con la tableta (asiente), Mair señala la pantalla y en «But» se vuelve, levanta el dedo y habla
  const ro = R.actor(EL.rowbothamMC, 26, 160, t, { dir: 1, sostiene: true, sonrisa: t > BUT + 0.3, habla: t > EXPLAIN && t < EXPLAIN + 0.5 && pul(t, 12) });
  { const [hx, hy] = ro.mano; R.rect(hx - 5, hy - 4, hx + 5, hy + 2, K); R.rect(hx - 4, hy - 3, hx + 4, hy + 1, H('#2a3a54')); R.linea(hx - 3, hy - 1, hx + 3, hy - 2, H('#5ac8e8')); }
  const senala = t > OPEN - 0.3 && t < HURRY + 0.5, gira = t > BUT - 0.1;
  R.actor(EL.mairMC, 268, 160, t, { dir: -1, dedo: senala || (gira && t < CLEARLY + 0.4), habla: gira && t < CLEARLY + 0.3 && pul(t, 13), sonrisa: t > CLEARLY + 0.4 });
};

// ── 5 · fondo local: el escritorio de Atom, «pudo» no es «pasó» ───────────────────────────────────────────────
const VERDE = [H('#4a6a5a'), H('#3e5e4e'), H('#345244')];
const maquetita = (x0, y0) => {   // el casco canon en pequeño (84 px), sobre dos calzos
  const casco = [[x0, y0 + 10], [x0 + 84, y0 + 10], [x0 + 78, y0 + 22], [x0 + 70, y0 + 28], [x0 + 12, y0 + 28], [x0 + 4, y0 + 20]];
  R.poligono(casco.map(([a, b]) => [a, b + 1]), K); R.poligono(casco, C.casco);
  for (let x = x0 + 4; x <= x0 + 80; x++) { R.pset(x, y0 + 13, C.franja); R.pset(x, y0 + 14, C.cascoL); }
  for (let x = x0 + 12; x <= x0 + 70; x++) for (let y = y0 + 24; y <= y0 + 27; y++) R.pset(x, y, C.obraViva);
  R.rect(x0 + 2, y0 + 7, x0 + 82, y0 + 10, C.tabla); R.linea(x0 + 2, y0 + 7, x0 + 82, y0 + 7, C.tablaL);
  R.rect(x0 + 60, y0, x0 + 76, y0 + 7, H('#8a6238')); R.rect(x0 + 63, y0 + 2, x0 + 65, y0 + 4, H('#2a3444')); R.rect(x0 + 70, y0 + 2, x0 + 72, y0 + 4, H('#2a3444'));
  for (const mx of [x0 + 22, x0 + 48]) { R.rect(mx, y0 - 8, mx + 2, y0 + 7, H('#5a4028')); R.linea(mx, y0 - 8, mx, y0 + 7, H('#8a6a48')); }
  R.linea(x0 - 14, y0 + 2, x0 + 2, y0 + 8, H('#5a4028'));
  R.rect(x0 + 34, y0 + 5, x0 + 42, y0 + 7, K); R.rect(x0 + 34, y0 + 3, x0 + 42, y0 + 4, H('#6a4a30'));
  for (const cx of [x0 + 18, x0 + 62]) { R.poligono([[cx - 6, y0 + 36], [cx + 6, y0 + 36], [cx + 4, y0 + 27], [cx - 4, y0 + 27]], K); R.poligono([[cx - 5, y0 + 35], [cx + 5, y0 + 35], [cx + 3, y0 + 28], [cx - 3, y0 + 28]], H('#a87a4a')); }
};
const fondoEscritorio = () => {
  // la pared verde en dos tonos (tranquila arriba a la derecha) con zócalo, la ventana del puerto a la tarde
  for (let y = 0; y <= 98; y++) for (let x = 0; x <= 319; x++) { let c = tono(VERDE, 0.35 + y / 300, x, y); if (!tranquila(x, y) && x % 16 === 0) c = mez(c, VERDE[2], 0.5); if (y > 86) c = y === 87 ? H('#7a5634') : tono([H('#6a4a2e'), H('#5a3e26')], (y - 87) / 11, x, y); R.pset(x, y, c); }
  R.rect(10, 24, 86, 84, H('#4a3424')); R.rect(12, 26, 84, 82, H('#6a4a30'));
  for (let y = 28; y <= 80; y++) for (let x = 14; x <= 82; x++) { let c; if (y < 58) c = tono([H('#f2c890'), H('#e8a878'), H('#c88a7a'), H('#9a8a9a')], (y - 28) / 30, x, y); else c = tono([H('#6a7a9a'), H('#4a5a7a'), H('#3a4a64')], (y - 58) / 22, x, y); R.pset(x, y, c); }
  for (let i = 0; i < 4; i++) { const cx = 24 + i * 16, h = 6 + (i % 2) * 4; R.rect(cx, 58 - h, cx + 8, 57, H('#5a5a6a')); R.pset(cx + 2, 54, H('#ffe08a')); }
  R.rect(60, 34, 61, 57, H('#3a3a44')); R.linea(61, 34, 76, 34, H('#3a3a44')); R.linea(74, 34, 74, 44, H('#3a3a44'));
  R.linea(48, 26, 48, 82, H('#4a3424')); R.linea(12, 54, 84, 54, H('#4a3424')); R.rect(6, 84, 90, 88, H('#8a6238'));
  // el barómetro de latón y una carta náutica enmarcada en la pared
  R.disco(140, 40, 13, K); R.disco(140, 40, 12, H('#c8a040')); R.disco(140, 40, 10, H('#f2ead6')); for (let k = 0; k < 16; k++) { const a = 2.4 + k * 0.29; R.pset(Math.round(140 + Math.cos(a) * 8), Math.round(40 + Math.sin(a) * 8), H('#3a3a40')); } R.linea(140, 40, 135, 34, H('#c83a3a')); R.disco(140, 40, 1, K); R.linea(140, 27, 140, 24, H('#8a6a20'));
  R.rect(96, 58, 128, 82, H('#4a3424')); R.rect(98, 60, 126, 80, H('#e8dcb8')); R.linea(100, 74, 112, 64, H('#7a9ac0')); R.linea(112, 64, 124, 70, H('#7a9ac0')); R.poligono([[100, 80], [106, 72], [114, 76], [116, 80]], H('#c8b888')); R.disco(118, 66, 1, H('#c83a3a')); for (let i = 0; i < 4; i++) R.linea(99, 62 + i * 5, 125, 62 + i * 5, H('#d8ccaa'));
  for (let x = 0; x <= 319; x++) { if (tranquila(x, 24)) continue; R.pset(x, 24, H('#2a4436')); R.pset(x, 25, H('#5a7a68')); }
  // la balda con libros y la botella del barquito (por debajo de la esquina de Atom)
  R.rect(176, 52, 266, 55, H('#6a4428')); R.linea(176, 52, 266, 52, H('#a87a4a'));
  for (let k = 0; k < 6; k++) { const x = 180 + k * 6, h = 14 + (k % 3) * 3, c = [H('#8a2a2a'), H('#2a4a7a'), H('#3a6a3a'), H('#c8a040'), H('#5a3a6a'), H('#8a5a2a')][k]; R.rect(x, 52 - h, x + 5, 51, K); R.rect(x + 1, 53 - h, x + 4, 51, c); R.linea(x + 1, 46, x + 4, 46, H('#e8d8a0')); }
  R.rect(222, 44, 262, 51, K); R.rect(223, 45, 261, 50, H('#a8d0d8')); R.rect(224, 46, 252, 47, H('#e8f6f8')); R.rect(262, 46, 266, 49, H('#a87a4a')); R.rect(232, 47, 244, 49, C.casco); R.linea(236, 41, 236, 47, H('#5a4028'));
  R.rect(226, 51, 256, 52, H('#6a4428'));
  // el tablero del escritorio con vetas y el canto
  madera(0, 99, 319, 179, [H('#c8925a'), H('#a8743e'), H('#8a5a2e'), H('#6a4422')], 9, 2);
  R.rect(0, 98, 319, 99, H('#e0b078'));
  // el cuaderno con renglones, el lápiz, la lupa y la taza
  R.poligono([[8, 140], [62, 136], [66, 176], [10, 179]], K); R.poligono([[9, 141], [61, 137], [64, 175], [11, 178]], H('#f4f0e4'));
  for (let y = 144; y < 176; y += 4) R.linea(12, y, 62, y - 3, H('#a8c0d8')); R.linea(20, 141, 22, 178, H('#d86a6a'));
  R.linea(72, 170, 98, 158, K); R.linea(72, 169, 97, 157, H('#e8c040')); R.pset(72, 170, H('#3a3a3a'));
  for (let a = 0; a < 6.3; a += 0.05) { R.pset(Math.round(118 + Math.cos(a) * 10), Math.round(160 + Math.sin(a) * 6), H('#c8a040')); } R.linea(126, 165, 140, 175, H('#4a3424')); R.linea(127, 165, 141, 175, H('#6a4428'));
  R.rect(262, 132, 284, 150, K); R.rect(263, 133, 283, 149, H('#f2eee2')); R.rect(263, 133, 283, 135, H('#c8a060')); R.linea(284, 136, 290, 142, K); R.linea(290, 142, 284, 146, K); R.rect(254, 150, 294, 153, H('#e8e2d0'));
  // la maqueta pequeña a la izquierda y el caballete con el cuadro a la derecha
  maquetita(36, 70);
  R.linea(202, 124, 214, 60, H('#5a3e26')); R.linea(258, 124, 246, 60, H('#5a3e26')); R.linea(230, 60, 230, 124, H('#4a3424'));
  R.rect(194, 66, 266, 116, H('#8a6a20')); R.rect(196, 68, 264, 114, H('#c8a040')); R.rect(199, 71, 261, 111, H('#3a2a1c'));
  R.rect(192, 116, 268, 119, H('#6a4428'));
};
const p5 = (t) => {
  capa('escritorio', fondoEscritorio);
  // por la ventana: un velero que cruza y gaviotas; en el cuadro, el Mary Celeste navega solo y el mar se mueve
  R.recorte([14, 28, 82, 80]); { const x = Math.round(20 + ((t - P5) * 6) % 70); R.poligono([[x, 64], [x + 10, 64], [x + 8, 66], [x + 2, 66]], H('#2a2a34')); R.poligono([[x + 5, 63], [x + 5, 52], [x + 11, 62]], H('#f6ecd8')); } pajaro(30 + ((t * 9) % 40), 36, t, H('#f6f6f0')); R.recorte(null);
  R.recorte([200, 72, 260, 110]);
  for (let y = 72; y <= 110; y++) for (let x = 200; x <= 260; x++) R.pset(x, y, y < 92 ? tono([H('#b8c0c8'), H('#a0aab4'), H('#8a96a2')], (y - 72) / 20, x, y) : tono([H('#5a6e80'), H('#4a5e70'), H('#3a4e60')], (y - 92) / 18 + Math.sin(x * 0.3 + y + t * 2) * 0.12, x, y));
  { const bx = 230 + Math.round(Math.sin(t * 0.8) * 2), by = 94 + Math.round(Math.sin(t * 1.6) * 1); R.poligono([[bx - 14, by], [bx + 14, by], [bx + 11, by + 4], [bx - 11, by + 4]], C.casco); R.linea(bx - 13, by + 1, bx + 13, by + 1, C.franja);
    for (const mx of [bx - 5, bx + 6]) { R.linea(mx, by, mx, by - 18, H('#3a2a1c')); R.poligono([[mx - 6, by - 16], [mx + 6, by - 16], [mx + 6, by - 9], [mx - 6, by - 9]], H('#ece4cc')); R.poligono([[mx - 5, by - 8], [mx + 5, by - 8], [mx + 5, by - 3], [mx - 5, by - 3]], H('#d8d0b8')); } }
  R.recorte(null);
  vaho(273, 130, t, 14, H('#ffffff'), 3); vaho(276, 130, t, 12, H('#f0f0ea'), 4);
  // la lucecita azul de la maqueta (la chispa del experimento, en pequeño)
  if (Math.sin(t * 5) > 0.2) R.pset(76, 74, H('#8ab4ff'));
  // el «=» de latón que pone la mano en «shows» y la raya roja de «not that it did»
  const pone = suave(lin(t, P5 + 0.2, SHOWS));
  const barra = (y) => { R.rect(128, y, 186, y + 6, K); R.rect(129, y + 1, 185, y + 5, H('#c8a040')); R.linea(129, y + 1, 185, y + 1, H('#f6e28a')); R.linea(129, y + 5, 185, y + 5, H('#8a6a20')); R.rect(128, y + 7, 186, y + 8, H('#6a4422')); };
  if (pone >= 1) { barra(106); barra(120); }
  const tacha = lin(t, NOT - 0.05, DID + 0.1);
  if (tacha > 0) { const x0 = 140, y0 = 138, x1 = 176, y1 = 96, k = Math.min(1, tacha); for (let w = -2; w <= 2; w++) R.linea(x0 + w, y0, Math.round(x0 + (x1 - x0) * k) + w, Math.round(y0 + (y1 - y0) * k), Math.abs(w) < 2 ? H('#e82a2a') : H('#a81a1a')); }
  // el ✓ verde sobre la maqueta en «could» y el «?» sobre el cuadro en «did»
  const ok = suave(lin(t, COULD - 0.1, COULD + 0.3)); if (ok > 0) { const cx = 78, cy = 50; R.disco(cx, cy, Math.round(9 * ok), K); R.disco(cx, cy, Math.round(8 * ok), H('#f6f2e6')); if (ok > 0.8) { R.linea(cx - 4, cy, cx - 1, cy + 3, H('#2a9a4a')); R.linea(cx - 1, cy + 3, cx + 4, cy - 4, H('#2a9a4a')); R.linea(cx - 4, cy + 1, cx - 1, cy + 4, H('#1a7a3a')); R.linea(cx - 1, cy + 4, cx + 4, cy - 3, H('#1a7a3a')); } }
  const qq = suave(lin(t, DID - 0.1, DID + 0.3)); if (qq > 0) { const cx = 230, cy = 50; R.disco(cx, cy, Math.round(9 * qq), K); R.disco(cx, cy, Math.round(8 * qq), H('#f6f2e6')); if (qq > 0.8) R.icono('?', cx - 2, cy - 3, H('#c83a3a'), H('#f6f2e6')); }
  // la mano de Atom: trae las barras (las lleva hasta «shows»), sale; vuelve con el rotulador y tacha
  if (pone < 1) { const hx = Math.round(lerp(196, 192, pone)), hy = Math.round(lerp(204, 128, pone)); barra(hy - 22); barra(hy - 8); T.mano(R, hx, hy + 2, -1, GUANTE, { sinManga: true }); }
  else if (t < SHOWS + 0.6) { const s = suave(lin(t, SHOWS, SHOWS + 0.6)); T.mano(R, 186, Math.round(lerp(126, 200, s)), -1, GUANTE, { sinManga: true }); }
  const rv = suave(lin(t, NOT - 0.7, NOT - 0.05)) * (1 - suave(lin(t, DID + 0.3, DID + 0.8)));
  if (rv > 0) { const k = Math.min(1, tacha), px = Math.round(140 + 36 * k), py = Math.round(138 - 42 * k), hx = Math.round(lerp(210, px + 6, rv)), hy = Math.round(lerp(200, py + 6, rv));
    R.linea(hx - 6, hy - 6, hx + 2, hy + 2, K); R.linea(hx - 5, hy - 6, hx + 3, hy + 2, H('#c82a2a')); R.linea(hx - 6, hy - 5, hx + 2, hy + 3, H('#e84a4a')); R.pset(hx - 6, hy - 6, H('#e82a2a'));
    T.mano(R, hx + 4, hy + 4, -1, GUANTE, { sinManga: true }); }
};

// ── 6 · fondo local: el archivo; los tres cajones vacíos ───────────────────────────────────────────────────────
const ROBLE = [H('#d4a46a'), H('#b8864e'), H('#9a6c3a'), H('#7a522a'), H('#5a3a1c')];
const CAJ = [[WIT, 52, 'persona'], [BOAT, 92, 'barco'], [LETTER, 132, 'sobre']];
const fondoArchivo = () => {
  // la pared de yeso, tranquila arriba a la derecha, con la ventana alta y su haz de luz
  for (let y = 0; y <= 164; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, tono([H('#e4dcc8'), H('#d8d0bc'), H('#ccc4b0')], 0.4 + y / 400 + (tranquila(x, y) ? 0 : (hs(x >> 2, y >> 2, 2) - 0.5) * 0.12), x, y));
  R.rect(88, 22, 148, 58, H('#5a4028')); for (let y = 24; y <= 56; y++) for (let x = 90; x <= 146; x++) R.pset(x, y, tono([H('#c8dcec'), H('#b0c8dc'), H('#9ab4ca')], (y - 24) / 32, x, y)); R.linea(118, 24, 118, 56, H('#5a4028')); R.linea(90, 40, 146, 40, H('#5a4028'));
  for (let i = 0; i < 5; i++) R.poligono([[96 + i * 8, 58], [102 + i * 8, 58], [140 + i * 10, 170], [130 + i * 10, 170]], H('#ece6d4'));
  // las estanterías de los lados con cajas de archivo numeradas con rayitas
  const estante = (x0, x1, y0) => { R.rect(x0, y0, x1, 166, H('#4a3220')); for (let sy = y0; sy <= 160; sy += 26) { R.rect(x0, sy, x1, sy + 2, H('#7a5634'));
      for (let x = x0 + 3; x < x1 - 6; x += 9) { const h = 18 + Math.round(hs(x, sy, 1) * 4), c = [H('#c8b890'), H('#b8a47a'), H('#a89a7a'), H('#8a7a5e')][Math.floor(hs(x, sy, 3) * 4)]; R.rect(x, sy + 3 + 22 - h, x + 7, sy + 25, K); R.rect(x + 1, sy + 4 + 22 - h, x + 6, sy + 24, c); R.rect(x + 2, sy + 8 + 22 - h, x + 5, sy + 11 + 22 - h, H('#f6f2e6')); R.linea(x + 2, sy + 9 + 22 - h, x + 4, sy + 9 + 22 - h, H('#3a3a44')); } } };
  estante(0, 64, 24); estante(264, 319, 54);
  // la escalera de biblioteca apoyada a la izquierda
  R.linea(52, 30, 70, 166, H('#6a4428')); R.linea(60, 30, 78, 166, H('#6a4428')); for (let k = 0; k < 9; k++) { const y = 40 + k * 15; R.linea(53 + Math.round((y - 30) * 0.13), y, 61 + Math.round((y - 30) * 0.13), y, H('#8a5a34')); }
  // el fichero de roble: cajoncitos a los lados y los tres cajones grandes en el centro (se pintan aparte)
  R.rect(80, 44, 248, 168, K); for (let y = 45; y <= 167; y++) for (let x = 81; x <= 247; x++) R.pset(x, y, tono(ROBLE, 0.4 + Math.sin(y * 0.4 + Math.sin(x * 0.07) * 3) * 0.12 + (x - 81) / 600, x, y));
  R.rect(76, 40, 252, 46, H('#5a3a1c')); R.linea(76, 40, 252, 40, H('#b8864e'));
  for (const x0 of [86, 214]) for (let k = 0; k < 10; k++) { const y = 52 + k * 11; R.rect(x0, y, x0 + 26, y + 9, H('#5a3a1c')); R.rect(x0 + 1, y + 1, x0 + 25, y + 8, ROBLE[1]); R.linea(x0 + 1, y + 1, x0 + 25, y + 1, ROBLE[0]); R.rect(x0 + 9, y + 3, x0 + 17, y + 5, H('#c8a040')); R.pset(x0 + 13, y + 7, H('#8a6a20')); }
  R.rect(116, 48, 212, 166, H('#5a3a1c')); for (const ry of [84, 124]) { R.rect(116, ry, 212, ry + 6, ROBLE[2]); R.linea(116, ry, 212, ry, ROBLE[0]); R.linea(116, ry + 6, 212, ry + 6, ROBLE[4]); }
  // el suelo de tarima
  for (let y = 168; y <= 179; y++) for (let x = 0; x <= 319; x++) { const tb = Math.floor((x + (y % 2) * 0) / 32); R.pset(x, y, (x + y * 7) % 32 === 0 ? H('#3a2414') : tono([H('#9a6a3a'), H('#845a30'), H('#6e4a26')], 0.4 + hs(tb, y >> 2, 1) * 0.4, x, y)); }
};
const pictograma = (tipo, cx, cy) => { R.rect(cx - 12, cy - 8, cx + 12, cy + 8, H('#8a6a20')); R.rect(cx - 11, cy - 7, cx + 11, cy + 7, H('#d8b860')); R.rect(cx - 9, cy - 5, cx + 9, cy + 5, H('#f6f0dc'));
  if (tipo === 'persona') { R.disco(cx, cy - 2, 2, H('#2a2a30')); R.rect(cx - 3, cy + 1, cx + 3, cy + 4, H('#2a2a30')); }
  else R.icono(tipo, cx - 3, cy - 3, H('#2a2a30'), H('#f6f0dc')); };
const cajon = (t, k) => { const [T0, y, tipo] = CAJ[k], s = suave(lin(t, T0 - 0.35, T0 + 0.25)), dy = Math.round(s * 12), cx = 164;
  if (s > 0) { // el hueco del cajón que sale: el interior vacío, con polvo, visto un poco desde arriba
    const top = y - 2, bot = y + dy + 1; R.rect(118, top, 210, bot, K); for (let yy = top + 1; yy <= bot; yy++) for (let x = 121; x <= 207; x++) R.pset(x, yy, tono([H('#5a3a1c'), H('#c8a070'), H('#b08858'), H('#9a7650')], Math.min(1, (yy - top) / 4) * 0.4 + (yy - top) / (bot - top + 1) * 0.5 + hs(x >> 1, yy, 3) * 0.15, x, yy));
    for (let yy = top + 1; yy <= bot; yy++) { R.pset(119, yy, ROBLE[2]); R.pset(120, yy, ROBLE[3]); R.pset(208, yy, ROBLE[3]); R.pset(209, yy, ROBLE[2]); } }
  R.rect(118, y + dy, 210, y + dy + 30, K); for (let yy = y + dy + 1; yy <= y + dy + 29; yy++) for (let x = 119; x <= 209; x++) R.pset(x, yy, tono(ROBLE, 0.3 + Math.sin(yy * 0.45 + Math.sin(x * 0.06 + k) * 3) * 0.15, x, yy));
  R.linea(119, y + dy + 1, 209, y + dy + 1, ROBLE[0]); R.linea(119, y + dy + 29, 209, y + dy + 29, ROBLE[4]);
  pictograma(tipo, cx, y + dy + 10); R.rect(cx - 8, y + dy + 21, cx + 8, y + dy + 24, H('#5a4010')); R.rect(cx - 7, y + dy + 21, cx + 7, y + dy + 23, H('#d8b860'));
  // la X roja en el hueco vacío, cuando ya ha salido
  const x2 = lin(t, T0 + 0.3, T0 + 0.6); if (x2 > 0) { const ex = 164, ey = y + Math.round(dy / 2) - 1; for (let i = -6; i <= 6; i++) { if (Math.abs(i) / 6 > x2 * 1.01) continue; for (const d of [0, 1]) { R.pset(ex + i + d, ey + Math.round(i * 0.55), H('#e02a2a')); R.pset(ex + i + d, ey - Math.round(i * 0.55), H('#e02a2a')); } } }
  // el polvo que se levanta al abrir
  const pv = lin(t, T0 - 0.1, T0 + 1.2); if (pv > 0 && pv < 1) for (let j = 0; j < 10; j++) { const x = Math.round(130 + hs(j, k, 1) * 70 + Math.sin(t * 2 + j) * 3), yy = Math.round(y + dy - 4 - pv * (8 + hs(j, k, 2) * 18)); R.pset(x, yy, H('#f2e8d0')); }
  return [cx + 10, y + dy + 22];
};
const p6 = (t) => {
  capa('archivo', fondoArchivo);
  // las motas que flotan en el haz de luz
  for (let k = 0; k < 16; k++) { const x = Math.round(110 + hs(k, 1, 2) * 70 + Math.sin(t * 0.6 + k) * 4), y = Math.round(60 + ((hs(k, 2, 2) * 100 + t * 4) % 100)); R.pset(x, y, H('#fff8e0')); }
  // la lámpara que cuelga y se mece (fuera de la barra del año)
  { const a = Math.sin(t * 1.1) * 0.12, lx = Math.round(240 + Math.sin(a) * 30), ly = Math.round(24 + Math.cos(a) * 6); R.linea(240, 0, lx, ly, H('#2a2a30')); R.poligono([[lx - 8, ly + 8], [lx + 8, ly + 8], [lx + 4, ly], [lx - 4, ly]], H('#2a5a44')); R.linea(lx - 8, ly + 8, lx + 8, ly + 8, H('#1a3a2c')); R.rect(lx - 3, ly + 9, lx + 3, ly + 10, H('#fff0b0')); }
  // los tres cajones: los cerrados primero, luego los que han salido (van delante)
  const manos = [];
  const orden = [2, 1, 0].sort((a, b) => (t > CAJ[a][0] - 0.35 ? 1 : 0) - (t > CAJ[b][0] - 0.35 ? 1 : 0));
  for (const k of orden) manos[k] = cajon(t, k);
  // la polilla que sale del último cajón
  const po = lin(t, LETTER + 0.2, LETTER + 2.6); if (po > 0 && po < 1) { const x = Math.round(lerp(150, 250, po) + Math.sin(po * 20) * 6), y = Math.round(lerp(130, 70, po) + Math.cos(po * 17) * 5), al = Math.floor(t * 14) % 2; R.pset(x, y, H('#5a4a3a')); R.pset(x - 1, y - al, H('#c8b898')); R.pset(x + 1, y - al, H('#c8b898')); R.pset(x - 2, y - 1 + al, H('#b8a888')); R.pset(x + 2, y - 1 + al, H('#b8a888')); }
  // la mano de Atom tira de cada cajón en su palabra y pasa al siguiente
  let k = t < BOAT - 0.6 ? 0 : t < LETTER - 0.6 ? 1 : 2; const T0 = CAJ[k][0];
  const ent = k === 0 ? suave(lin(t, P6, WIT - 0.4)) : 1, sal = k === 2 ? suave(lin(t, LETTER + 0.5, LETTER + 1.2)) : 0;
  let [hx, hy] = manos[k]; if (k > 0 && t < T0 - 0.35) { const [px, py] = manos[k - 1]; const f = suave(lin(t, CAJ[k - 1][0] + 0.5, T0 - 0.4)); hx = lerp(px, hx, f); hy = lerp(py, hy, f); }
  hx = Math.round(lerp(330, hx, ent) + sal * 140); hy = Math.round(lerp(190, hy, ent) + sal * 30);
  if (hx < 330) T.mano(R, hx, hy, -1, GUANTE, { sinManga: true });
};

const efectos = [
  [1.4, 'lluvia'], [1.6, 'campana'], [ETHANOL, 'burbujas'], [DOC, 'bip'], [SPARK, 'interruptor'], [NOTHING + 0.1, 'pop'],
  [WARMTH, 'zumbido'], [WENT, 'boom'], [SCORCHED, 'brillo'], [OPEN, 'pop'], [HURRY, 'whoosh'], [BUT, 'bip'],
  [SHOWS, 'toc'], [COULD, 'brillo'], [NOT, 'lapiz'], [WIT, 'cerrojo'], [BOAT, 'cerrojo'], [LETTER, 'cerrojo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, cartela: '2026', año: 2026 });
'''

E['mc-manchester'] = ('Mánchester', CAB_MANCHESTER, _sub(PRE + CUERPO_MANCHESTER))
