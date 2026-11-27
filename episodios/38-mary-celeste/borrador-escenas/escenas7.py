E = {}

# utilidades de las dos escenas (sin redeclarar tramo, lerp, hex, E, R, M ni en)
PRE = r'''
const C = T.C;
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
const nube = (cx, cy, w, cs, ymax = 999) => {
  const h = Math.max(4, w * 0.36);
  for (let y = Math.floor(cy - h); y <= cy + h * 0.5; y++) for (let x = Math.floor(cx - w * 0.62); x <= cx + w * 0.62; x++) {
    if (x < 0 || x > 319 || y < 0 || y > ymax || tranquila(x, y)) continue;
    let d = 9; for (const [bx, by, r] of BOLAS) { const dx = (x - (cx + bx * w)) / (r * w), dy = (y - (cy + by * w)) / (r * w * 0.7); d = Math.min(d, dx * dx + dy * dy); }
    if (d > 1 || y > cy + h * 0.45) continue; if (d > 0.8 && bay(x, y) < 0.5) continue;
    const v = (y - (cy - h)) / (h * 1.45); R.pset(x, y, y > cy + h * 0.32 ? cs[2] : tono(cs, v, x, y));
  }
};
const nubes = (t, lista, cs, ymax = 999) => { for (const [x0, y, w, v] of lista) nube(((x0 + t * v) % 440 + 440) % 440 - 60, y, w, cs, ymax); };
const pajaro = (x, y, t, c) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y) || x < 2 || x > 317) return; const a = Math.floor(t * 7 + x * 0.3) % 2; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + 2 * a, c); R.pset(x + 2, y - 1 + 2 * a, c); };
// tablas horizontales con vetas (cubiertas, muelles, paredes)
const madera = (x0, y0, x1, y1, cs, alto = 6, sem = 0) => {
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), yy = (y - y0) % alto, junta = (tabla * 53) % 70;
    for (let x = x0; x <= x1; x++) { const g = Math.sin(x * 0.07 + tabla * 3.1 + Math.sin(x * 0.019 + tabla * 1.7) * 3 + yy * 0.9 + sem);
      let c = cs[1]; if (g > 0.86) c = cs[0]; else if (g < -0.84) c = cs[2]; if (hs(x, y, sem) > 0.96) c = mez(c, cs[0], 0.5);
      if (yy === alto - 1) c = cs[3] ?? cs[2]; if (yy === 0) c = mez(c, cs[0], 0.35); if ((x + junta) % 70 === 0) c = cs[3] ?? cs[2]; R.pset(x, y, c); } }
};
// agua con rizos por fila (cs de lejos a cerca), brillos que corren
const agua = (t, y0, y1, cs, x0 = 0, x1 = 319, vel = 1) => {
  const L = mez(cs[0], H('#ffffff'), 0.55);
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), k = 0.25 + f * 0.6;
    for (let x = typeof x0 === 'function' ? x0(y) : x0; x <= x1; x++) {
      const w = Math.sin(x * k * 0.5 + y * 1.9 + t * 2.2 * vel) + Math.sin(x * k * 0.21 - y * 0.7 - t * 1.3 * vel) * 0.7;
      let c = tono(cs, f + w * 0.06, x, y); if (w > 1.45) c = L; else if (w < -1.5) c = cs[cs.length - 1]; R.pset(x, y, c); } }
};
// el bergantín de perfil: x, y = centro de la flotación; s escala (1 ≈ 116 px de eslora); o.dir, o.rot, o.casco 'dg'
// (verde, el Dei Gratia) | 'negro'; o.velas 0–1; o.barriles (barriles azules de petróleo trincados en cubierta); o.t
const bergantin = (x, y, s, o = {}) => {
  const dir = o.dir ?? 1, rot = o.rot ?? 0, cr = Math.cos(rot), sr = Math.sin(rot), t = o.t ?? 0;
  const P = (u, v) => [Math.round(x + dir * (u * cr - v * sr) * s), Math.round(y - (u * sr + v * cr) * s)];
  const pol = (pts, c) => R.poligono(pts.map(([u, v]) => P(u, v)), c);
  const l2 = (u0, v0, u1, v1, c) => { const [a, b] = P(u0, v0), [d, e] = P(u1, v1); R.linea(a, b, d, e, c); };
  const dg = o.casco === 'dg';
  const K = H('#0e0c10'), CA = dg ? H('#2e5e3e') : H('#1c1a20'), CL = dg ? H('#4e8a5a') : H('#3a3844'), CS = dg ? H('#1a3a26') : H('#0e0c10');
  pol([[-58, 15], [-56, 0], [-48, -2], [50, -2], [57, 6], [62, 17], [40, 15], [0, 13], [-30, 14]], K);
  pol([[-56, 14], [-54, 1], [-47, -1], [49, -1], [55, 6], [60, 16], [40, 14], [0, 12], [-30, 13]], CA);
  for (let v = 3; v <= 11; v += 3) l2(-53, v, 54, v + (v > 8 ? 1 : 0), CS);
  l2(-55, 12, 58, 14, H('#f2eee2'));
  l2(-54, 6, 54, 6, CL); l2(-50, 9, 50, 9, mez(CL, CA, 0.5));
  for (let u = -46; u <= 46; u += 13) { const [a, b] = P(u, 3); R.pset(a, b, H('#c8a040')); }   // los pernos de bronce
  pol([[-50, 14], [-50, 19], [-34, 19], [-34, 14]], dg ? H('#c8b890') : H('#d8c8a0'));
  for (const u of [-46, -40]) { const [a, b] = P(u, 17); R.pset(a, b, H('#5a7a9a')); R.pset(a + 1, b, H('#5a7a9a')); }
  l2(-56, 16, 60, 18, K);
  if (o.barriles) for (const u of [-24, -16, -8, 4, 12]) { const [a, b] = P(u, 16); R.rect(a - 3, b - 6, a + 3, b, K); R.rect(a - 2, b - 5, a + 2, b - 1, H('#2a4a7a')); R.linea(a - 2, b - 4, a + 2, b - 4, H('#4a6a9a')); R.linea(a - 2, b - 2, a + 2, b - 2, H('#1a2238')); }
  l2(60, 17, 84, 26, H('#5a4028')); l2(60, 16, 84, 25, H('#8a6a48'));
  const vel = o.velas ?? 0;
  const palo = (u, alto, vergas) => {
    l2(u, 14, u, alto, H('#3a2a1c')); l2(u + 1, 14, u + 1, alto - 4, H('#7a5a3a'));
    l2(u, alto, -56 + (u > 0 ? 40 : 0), 16, H('#4a4048')); l2(u, alto, 84, 26, H('#4a4048'));
    for (let i = 0; i < 4; i++) l2(u - 4 + i * 2, 16, u, alto - 8, H('#5a5058'));
    for (const [hh, w] of vergas) { l2(u - w, hh, u + w, hh, H('#3a2a1c'));
      if (vel > 0.05) { const bajo = hh - 9 * vel, fl = Math.sin(t * 4 + hh) * 0.8;
        pol([[u - w, hh], [u + w, hh], [u + w * 0.94 + fl, bajo], [u - w * 0.94 + fl, bajo]], H('#ece4cc'));
        l2(u - w * 0.9, bajo + 1, u + w * 0.9, bajo + 1, H('#b8ac90')); l2(u, hh - 1, u, bajo + 2, H('#d8ceb4')); }
      else { l2(u - w + 1, hh - 1, u + w - 1, hh - 1, H('#e8e0c8')); for (let k = -w + 3; k < w; k += 4) { const [a, b] = P(u + k, hh - 2); R.pset(a, b, H('#c8bca0')); } } }
  };
  palo(26, 78, [[34, 16], [46, 13], [56, 11], [64, 8]]);
  palo(-12, 84, []);
  if (vel > 0.05) { const fl = Math.sin(t * 3) * 1.5 * vel; pol([[-12, 30], [-12, 30 + 46 * vel], [-48 + fl, 22 + 20 * vel], [-52, 24]], H('#ece4cc')); l2(-12, 30, -52, 24, H('#3a2a1c')); l2(-13, 30 + 46 * vel, -48 + fl, 22 + 20 * vel, H('#b8ac90'));
    pol([[62, 18], [84, 26], [28, 72]], H('#f2ecd8')); l2(62, 18, 28, 72, H('#c8bca0')); }
  else { l2(-12, 30, -52, 26, H('#3a2a1c')); l2(-12, 31, -50, 27, H('#e8e0c8')); }
  { const [a, b] = P(26, 78); for (let i = 0; i < 8; i++) R.pset(a - dir * i, b + Math.round(Math.sin(t * 6 + i * 0.8) * (i / 5)), H('#c83a2a')); }
  return { P, cubierta: (u) => P(u, 15 + (u > 40 ? (u - 40) * 0.1 : 0)) };
};
// un barril tumbado visto de cara (tapa con duelas y aros); gir hace rodar las duelas
const barrilT = (x, y, r, azul = false, gir = 0) => { x = Math.round(x); y = Math.round(y);
  const K = H('#120e10'), A = azul ? [H('#1a2a4a'), H('#2a4a7a'), H('#4a6a9a')] : [H('#6a4422'), H('#a8794a'), H('#d4a46a')];
  R.disco(x, y, r + 1, K); R.disco(x, y, r, A[0]); R.disco(x, y, r - 1, A[1]); R.disco(x - 1, y - 1, Math.max(1, r - 3), A[2]); R.disco(x, y, Math.max(1, r - 3), A[1]);
  for (let k = 0; k < 3; k++) { const a = gir + k * Math.PI / 3; R.linea(Math.round(x - Math.cos(a) * (r - 1)), Math.round(y - Math.sin(a) * (r - 1)), Math.round(x + Math.cos(a) * (r - 1)), Math.round(y + Math.sin(a) * (r - 1)), A[0]); }
  R.pset(Math.round(x + Math.cos(gir) * (r - 3)), Math.round(y + Math.sin(gir) * (r - 3)), K); };
// un barril de pie: x centro, y la base; azul: de petróleo
const barrilP = (x, y, s = 1, azul = false) => { x = Math.round(x); y = Math.round(y);
  const K = H('#120e10'), A = azul ? [H('#1a2a4a'), H('#2a4a7a'), H('#4a6a9a')] : [H('#6a4422'), H('#a8794a'), H('#d4a46a')], w = Math.round(4 * s), h = Math.round(11 * s);
  R.rect(x - w - 1, y - h - 1, x + w + 1, y, K);
  for (let j = 0; j < h; j++) { const b = Math.round(Math.sin((j / h) * Math.PI) * s); R.rect(x - w - b, y - h + j, x + w + b, y - h + j, A[1]); R.pset(x - w - b, y - h + j, A[0]); R.pset(x + w + b, y - h + j, A[0]); R.pset(x - w + 1, y - h + j, A[2]); }
  for (const f of [0.2, 0.8]) { const yy = Math.round(y - h + h * f); R.linea(x - w - 1, yy, x + w + 1, yy, H('#2a2a30')); }
  R.linea(x - w, y - h, x + w, y - h, A[2]); };
'''


CABECERA = r'''// MC-PISTAS (frases 21–23), 1872, sin cartela. Golpe en «cabo» (el corte duro a mar abierto en «But the Mary Celeste»;
// el cabo se parte donde la voz dice «snapped»). Once planos:
// 1. «So it's worth looking at what was there. The rod used to measure the water in the hold…»: la varilla de sondeo
//    baja por su tubo entre los barriles, mide y sube goteando; el pececito salta y vuelve al agua (gag 6); un ratón
//    corre por los aros de los barriles.
// 2. «…was lying on the deck. One pump was taken apart. Two hatches were open»: la cubierta desde arriba, de día; la
//    sombra de las velas pasa; en «deck» una gaviota se posa junto a la varilla y la sigue; en «pump» picotea las
//    piezas de la bomba y una arandela rueda en «apart»; en «Two hatches» se asoma a la escotilla abierta: «2» y «?».
// 3. «The lifeboat had been lashed on top of another hatch, so it didn't fall off, someone launched it»: la escotilla
//    principal de perfil, a ras de cubierta, con los calzos y el tramo de regala quitado; el bote, en recorte de papel,
//    aparece sobre los calzos; en «lashed» lo atan dos trincas de papel; en «didn't fall off» el barco da un bandazo y el
//    bote no se mueve; en «someone» las trincas se sueltan y en «launched» el bote sale por el hueco de la regala:
//    salpicadura al otro lado. La gaviota de la regala se va volando.
// 4. «And they took the sextant and the chronometer, the tools you need to know where you are at sea»: la mesa de cartas
//    del camarote, de cerca: dos cajas abiertas de terciopelo. En «sextant» una mano entra por la izquierda y se lleva el
//    sextante; en «chronometer» otra por la derecha se lleva el cronómetro (que hace tictac); quedan los huecos. En «know
//    where you are» la cruz de lápiz de la carta busca su sitio con «?»; el lápiz rueda con el balanceo y al final la tapa
//    del cronómetro se cierra sola.
// 5. «All of that tells a likely story. Someone measured the water»: la cubierta junto al palo mayor, por la mañana, con
//    el bote aún en su sitio; un marinero da a la bomba; Briggs saca la varilla del tubo de sondeo, la levanta y mira la
//    parte mojada, que gotea, en «water».
// 6. «thought the ship was sinking, or that something terrible was about to happen»: la bodega; Briggs baja por la
//    escala con el farol, ve el agua del fondo: «!» en «sinking»; en «terrible» el vapor tiembla y un barril cruje; en
//    «happen» sube deprisa.
// 7. «and Briggs ordered everyone off in a hurry. The island of Santa Maria was close by»: la cubierta desde arriba, con
//    la isla en el horizonte; Briggs da la orden (dedo) en «ordered»; dos marineros corren al bote y sueltan las trincas;
//    Sarah sale de la caseta con Sophia de la mano; en «Santa Maria» Briggs señala la isla, que brilla.
// 8. «The sensible thing was to get into the boat, pull away a little, and wait»: el costado negro del barco desde el
//    agua; Sarah baja con cuidado por la escala de gato hasta el bote, donde Briggs le da la mano; Sophia ya sentada; en
//    «pull away» el bote se separa un poco con dos paladas y la boza se tensa; en «wait» se quedan quietos mirando arriba.
// 9. GOLPE «But the Mary Celeste didn't sink. She kept sailing. And if the lifeboat…»: mar abierto; una racha llena las
//    velas y el barco se aleja con el bote a remolque; en «tied» brilla el cabo.
// 10. «…was tied to the ship with a line, and that line snapped, 10 people would have watched their ship sail away on the
//    wind»: el cabo de cerca, que se deshilacha y se parte en «snapped»; la punta del bote se hunde; al fondo el barco se
//    va, pequeño.
// 11. «unable to catch her. The lifeboat was never found»: el bote por detrás, a ras de agua: diez espaldas pequeñas,
//    los remos que bogan; el barco se pierde en el horizonte; en «never found» la niebla se cierra sobre el bote y queda el
//    horizonte vacío, con una gaviota.'''

CUERPO = r'''
const vv = (k) => en('varilla', k), pr = (k) => en('probable', k), cb = (k) => en('cabo', k);
const P2 = vv(0.2117), P3 = vv(0.4585), P4 = vv(0.7421), P5 = pr(0), P6 = pr(0.2300), P7 = pr(0.4809), P8 = pr(0.7864), P9 = cb(0), P10 = cb(0.3906), P11 = cb(0.7963);
const DECK = vv(0.2560), PUMP = vv(0.3064), APART = vv(0.3410), HATCH = vv(0.3860), OPEN = vv(0.4195);
const LASHED = vv(0.5007), FALL = vv(0.6285), SOMEONE = vv(0.6739), LAUNCH = vv(0.6880), SPLASH = vv(0.7097);
const SEXT = vv(0.7735), CRONO = vv(0.8190), TOOLS = vv(0.8829), WHERE = vv(0.9426), SEA = vv(0.9771);
const STORY = pr(0.0689), MEASURED = pr(0.1460), WATER = pr(0.1805), SINKING = pr(0.2829), TERRIBLE = pr(0.3578), HAPPEN = pr(0.4314);
const ORDERED = pr(0.5097), HURRY = pr(0.6041), ISLAND = pr(0.6536), SANTA = pr(0.6777), CLOSE = pr(0.7237);
const BOAT = pr(0.8716), PULL = pr(0.9095), WAIT = pr(0.9832);
const SINK = cb(0.0796), KEPT = cb(0.1449), TIED = cb(0.2959), SNAP = cb(0.4807), TEN = cb(0.5483), WATCHED = cb(0.6054), WIND = cb(0.7452);
const HER = cb(0.8594), NEVER = cb(0.9488), FIN = cb(1.1767);
const K = C.k;
// ── piezas comunes ─────────────────────────────────────────────────────────────────────────────────────────────
const CIELO = [H('#76869a'), H('#8a99aa'), H('#a0adba'), H('#b6c0ca'), H('#c8d0d6')];
const NUB = [H('#eef0f2'), H('#c8ced6'), H('#9aa4b0')];
const MAR = [H('#7a8c9c'), H('#5e7486'), H('#4a6074'), H('#3a4e62'), H('#2c3e50')];
// nubes de tres tonos que derivan poco, lejos de la esquina de Atom y de la barra del año
const nubesF = (t, lista, cs, ymax) => { for (const [x, y, w, k] of lista) nube(x + Math.sin(t * (0.25 + k * 0.12) + k) * (3 + k * 2), y, w, cs, ymax); };
// el bote salvavidas (la yola) de perfil: x, y el centro de la quilla; s escala (1 ≈ 100 px); o.dir, o.rot, o.papel
// (recorte: borde blanco y sombra), o.ve (0–1: velo de niebla)
const yola = (x, y, s, o = {}) => {
  const dir = o.dir ?? 1, rot = o.rot ?? 0, cr = Math.cos(rot), sr = Math.sin(rot), ve = o.ve ?? 0, V = o.velo ?? H('#c8d0d6');
  const P = (u, v) => [Math.round(x + dir * (u * cr - v * sr) * s), Math.round(y - (u * sr + v * cr) * s)];
  const c = (h) => ve > 0 ? mez(H(h), V, ve) : H(h);
  const pol = (pts, col) => R.poligono(pts.map(([u, v]) => P(u, v)), col);
  const l2 = (u0, v0, u1, v1, col) => { const [a, b] = P(u0, v0), [d, e] = P(u1, v1); R.linea(a, b, d, e, col); };
  const casco = [[-50, 17], [-52, 6], [-46, 0], [36, 0], [48, 6], [54, 20], [30, 15], [0, 14], [-30, 15]];
  if (o.papel) { R.poligono(casco.map(([u, v]) => { const [a, b] = P(u * 1.06, (v - 9) * 1.3 + 9); return [a + 2, b + 3]; }), H('#2a2a2a'));
    R.poligono(casco.map(([u, v]) => P(u * 1.06, (v - 9) * 1.3 + 9)), H('#f6f2e6')); }
  pol(casco, c('#141218'));
  pol([[-49, 16], [-51, 6], [-45, 1], [35, 1], [47, 6], [52, 19], [30, 14], [0, 13], [-30, 14]], c('#d8dcd6'));
  for (const v of [4, 8, 11]) l2(-48, v, 46, v + (v > 9 ? 2 : 0), c('#9aa29c'));
  l2(-49, 14, 50, 17, c('#7a5a3a')); l2(-49, 15, 50, 18, c('#a87a4a')); l2(-30, 13, 30, 13, c('#5a4028'));
  l2(-44, 2, 34, 2, c('#5a5e5a')); for (let u = -40; u <= 40; u += 16) { const [a, b] = P(u, 9); R.pset(a, b, c('#6a6e6a')); }
  l2(-50, 16, -52, 22, c('#5a4028')); l2(52, 19, 55, 24, c('#5a4028'));
  return { P, proa: P(54, 20), popa: P(-52, 17) };
};
// la voz de la tiza de recorte: un borde blanco alrededor de una línea (las trincas de papel)
const cuerdaPapel = (x0, y0, x1, y1) => { R.linea(x0 - 1, y0, x1 - 1, y1, H('#f6f2e6')); R.linea(x0 + 2, y0, x1 + 2, y1, H('#f6f2e6')); R.linea(x0, y0, x1, y1, H('#c8a868')); R.linea(x0 + 1, y0, x1 + 1, y1, H('#8a7048')); };
const brilloS = (x, y, t, c = H('#fff8d8')) => { const k = Math.floor(t * 8) % 2 ? 3 : 2; R.linea(x - k, y, x + k, y, c); R.linea(x, y - k, x, y + k, c); R.pset(x, y, H('#ffffff')); };
// el farol de mano (marco de latón, cristal encendido) y su luz
const farolMano = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  for (let dy = -18; dy <= 18; dy++) for (let dx = -18; dx <= 18; dx++) { const d = Math.hypot(dx, dy); if (d > 18 || bay(x + dx, y + dy) > (1 - d / 18) * 0.5) continue; const px = R.pget(x + dx, y + dy); if (px) R.pset(x + dx, y + dy, mez(px, H('#ffd27a'), 0.35)); }
  R.linea(x, y - 9, x, y - 7, K); R.rect(x - 3, y - 7, x + 3, y + 4, K); R.rect(x - 2, y - 6, x + 2, y + 3, Math.sin(t * 13) > 0 ? H('#ffe08a') : H('#ffc860')); R.pset(x, y - 2, H('#ffffff'));
  R.linea(x - 3, y - 7, x + 3, y - 7, H('#c8a040')); R.linea(x - 3, y + 4, x + 3, y + 4, H('#c8a040')); };
// ── 1 · la varilla en la bodega ────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'bodega', camara: 'varilla', sonda: suave(lin(t, 0.4, 4.6)) };
  const g = T.abordo(R, t, o);
  // el ratón que corre por el aro de un barril de arriba a la izquierda (se para, olisquea y sigue)
  { const u = lin(t, 0.8, 4.4), x = Math.round(lerp(8, 118, u < 0.45 ? u / 0.45 * 0.5 : u < 0.6 ? 0.5 : 0.5 + (u - 0.6) / 0.4 * 0.5)), y = 72 + Math.round(Math.sin(x * 0.05) * 2);
    if (u > 0 && u < 1) { const pa = Math.floor(t * 12) % 2; R.rect(x - 4, y - 3, x + 3, y, K); R.rect(x - 3, y - 2, x + 2, y - 1, H('#7a6a5e')); R.pset(x + 4, y - 2, K); R.pset(x + 2, y - 4, H('#c89a8a')); R.pset(x + 3, y - 2, H('#1a1a1a'));
      R.linea(x - 5, y - 1, x - 9, y - 3 + pa, H('#8a6a5e')); R.pset(x - 2, y + 1, K); R.pset(x + 1 + pa, y + 1, K); } }
  // la luz del farol de arriba que tiembla en el agua
  for (let k = 0; k < 6; k++) { const x = 40 + k * 46 + Math.round(Math.sin(t * 1.4 + k) * 4), y = (g.agua ?? 128) + 6 + (k % 3) * 9; if (x > 140 && x < 182) continue; R.linea(x, y, x + 5 + (k % 2) * 3, y, H('#e8c070')); }
  T.abordoDelante(R, t, o);
};
// ── 2 · la cubierta desde arriba: la gaviota repasa las pistas ────────────────────────────────────────────────────
const gaviotaArriba = (x, y, t, pica, dir = 1) => { x = Math.round(x); y = Math.round(y);   // vista desde arriba, andando
  R.poligono([[x - 7 * dir, y], [x + 5 * dir, y - 4], [x + 9 * dir, y], [x + 5 * dir, y + 4]], K);
  R.poligono([[x - 6 * dir, y], [x + 5 * dir, y - 3], [x + 8 * dir, y], [x + 5 * dir, y + 3]], H('#f2f2ee'));
  R.linea(x - 5 * dir, y - 1, x + 3 * dir, y - 3, H('#9aa4b0')); R.linea(x - 5 * dir, y + 1, x + 3 * dir, y + 3, H('#9aa4b0')); R.linea(x - 7 * dir, y, x - 4 * dir, y, H('#3a3a40'));
  const hx = x + (9 + (pica ? 3 : 0)) * dir; R.disco(hx, y, 2, K); R.disco(hx, y, 1, H('#ffffff')); R.linea(hx + 2 * dir, y, hx + 4 * dir, y, H('#e8a020')); R.pset(hx, y - 1, K); };
const p2 = (t) => {
  const o = { encuadre: 'cubierta', camara: 'bomba', luz: 'dia' };
  T.abordo(R, t, o);
  // la sombra de las velas que barre la cubierta con el balanceo
  { const sx = Math.round(170 + Math.sin(t * 0.9) * 50); for (let y = 24; y < 170; y++) for (let x = sx - 30 + (y >> 2); x < sx + 26 + (y >> 2); x++) { if (x < 0 || x > 319 || tranquila(x, y) || bay(x, y) > 0.35) continue; const px = R.pget(x, y); R.pset(x, y, mez(px, H('#3a3020'), 0.28)); } }
  // la gaviota: se posa junto a la varilla en «deck», la sigue, picotea la bomba en «pump», una arandela rueda en
  // «apart», y en «Two hatches» va a asomarse a la escotilla abierta
  const ll = suave(lin(t, P2 + 0.1, DECK + 0.2));
  let gx, gy, pica = false, dir = 1, sombra = 0;
  if (t < DECK + 0.2) { gx = lerp(330, 250, ll); gy = lerp(40, 104, ll); sombra = 1; }
  else if (t < PUMP + 0.2) { const u = suave(lin(t, DECK + 0.3, PUMP)); gx = lerp(250, 214, u); gy = lerp(104, 64, u); dir = -1; }
  else if (t < HATCH - 0.4) { gx = 214; gy = 64; dir = -1; pica = pul(t, 14); }
  else { const u = suave(lin(t, HATCH - 0.4, OPEN + 0.1)); gx = lerp(214, 78, u); gy = lerp(64, 70, u) - Math.sin(u * Math.PI) * 16; dir = -1; }
  if (sombra && ll < 1) { R.linea(Math.round(gx - 10), Math.round(gy + 20 * (1 - ll)), Math.round(gx + 6), Math.round(gy + 18 * (1 - ll)), H('#5a4a34')); }
  if (ll < 1 || (t > HATCH - 0.3 && t < OPEN + 0.1)) { const a = Math.floor(t * 9) % 2 ? 7 : 3; R.linea(Math.round(gx) - 2, Math.round(gy), Math.round(gx) - 6, Math.round(gy) - a, H('#e8ecef')); R.linea(Math.round(gx) - 2, Math.round(gy), Math.round(gx) - 6, Math.round(gy) + a, H('#e8ecef')); }
  gaviotaArriba(gx, gy, t, pica, dir);
  { const u = lin(t, APART, APART + 1.4), x = Math.round(lerp(190, 236, u)), y = Math.round(78 + u * 30); R.disco(x, y, 4, K); R.disco(x, y, 3, H('#8a5a34')); R.disco(x, y, 1, H('#3a2a1c')); R.pset(x - 1 + Math.round(Math.cos(u * 12) * 2), y - 1 + Math.round(Math.sin(u * 12) * 2), H('#d4a46a')); }
  if (t > HATCH) { R.numero('2', 16, 66, { tam: 16 }); if (t > OPEN) R.bocadillo(52, 40, { icono: '?' }); }
  T.abordoDelante(R, t, o);
};
'''
CUERPO += r'''
// ── 3 · la escotilla de perfil: el bote de papel, atado, y lanzado por el hueco de la regala ───────────────────────
const escotillaPerfil = () => {
  // la regala de enfrente (cara interior crema) con el tramo quitado en x 236–282
  for (let x = 0; x < 320; x++) { if (x > 236 && x < 282) continue;
    for (let y = 84; y <= 104; y++) { let c = (y - 84) % 5 === 4 ? H('#9a8a6a') : (hs(x >> 1, y, 3) > 0.92 ? H('#d8ccaa') : H('#c4b48e')); if (x % 22 < 3) c = H('#a8946c'); if (y >= 101) c = H('#6a5a40'); R.pset(x, y, c); } }
  R.rect(0, 82, 236, 85, K); R.rect(282, 82, 319, 85, K); R.linea(0, 83, 236, 83, H('#a87a4a')); R.linea(282, 83, 319, 83, H('#a87a4a'));
  for (const x of [232, 282]) { R.rect(x, 80, x + 4, 104, K); R.rect(x + 1, 81, x + 3, 103, H('#7a5a3a')); }
  for (const x of [237, 279]) for (const y of [88, 96]) { R.pset(x, y, H('#5a5a64')); R.pset(x + 1, y, H('#8a8a94')); }   // las cabillas de la regala quitada
  // la cubierta de tablas
  madera(0, 105, 319, 179, [H('#ccb48c'), H('#ac9270'), H('#8a7252'), H('#5a4630')], 6, 2);
  R.linea(0, 105, 319, 105, H('#4a3a2a'));
  // el pie del palo con su cabillero y las drizas adujadas
  R.rect(0, 0, 14, 150, K); for (let y = 0; y <= 150; y++) for (let x = 1; x <= 13; x++) R.pset(x, y, x < 4 ? H('#d4a46a') : x > 10 ? H('#6a4a2a') : (Math.sin(y * 0.4 + x) > 0.9 ? H('#b88a5a') : H('#a07448')));
  for (const y of [60, 61, 120, 121]) R.linea(0, y, 14, y, H('#3a3a40'));
  R.rect(0, 96, 40, 100, K); R.rect(0, 97, 39, 99, H('#8a6a48')); for (const x of [20, 28, 36]) { R.rect(x - 1, 90, x + 1, 104, K); R.linea(x, 91, x, 103, H('#d4b48a')); }
  for (const [x, k] of [[24, 0], [32, 1]]) { for (let j = 0; j < 4; j++) R.linea(x - 3 + j, 100, x - 2 + j + k, 122 - j * 2, j % 2 ? H('#a88a58') : H('#c8a868')); }
  // la escotilla principal: la tapa con su lona, la brazola de tablas, las argollas
  R.rect(66, 106, 218, 147, K);
  for (let y = 107; y <= 111; y++) for (let x = 67; x <= 217; x++) R.pset(x, y, (x % 18 === 0) ? H('#5a5e4a') : y === 107 ? H('#a8b08e') : H('#8a9274'));
  madera(67, 112, 217, 146, [H('#b08a5e'), H('#94704a'), H('#765836'), H('#4a3420')], 5, 9);
  R.linea(67, 112, 217, 112, H('#d4a46a')); R.linea(67, 146, 217, 146, K);
  for (const x of [70, 214]) { R.rect(x - 2, 112, x + 1, 146, H('#5a5a64')); R.linea(x - 2, 112, x - 2, 146, H('#8a8a94')); }
  for (const x of [96, 142, 188]) { R.disco(x, 130, 3, K); R.disco(x, 130, 2, H('#7a7a84')); R.pset(x - 1, 129, H('#c8c8d0')); R.disco(x, 134, 2, K); }
  // los dos calzos vacíos sobre la tapa
  for (const x of [104, 182]) { R.poligono([[x - 13, 107], [x + 13, 107], [x + 13, 94], [x + 9, 94], [x + 5, 100], [x - 5, 100], [x - 9, 94], [x - 13, 94]], K);
    R.poligono([[x - 12, 106], [x + 12, 106], [x + 12, 95], [x + 9, 95], [x + 5, 101], [x - 5, 101], [x - 9, 95], [x - 12, 95]], H('#a87a4a'));
    R.linea(x - 12, 95, x - 9, 95, H('#d4a46a')); R.linea(x - 9, 95, x - 5, 101, H('#d4a46a')); R.linea(x - 5, 101, x + 5, 101, H('#d4a46a')); R.linea(x + 5, 101, x + 9, 95, H('#d4a46a')); R.linea(x - 12, 104, x + 12, 104, H('#7a5232')); }
  // las argollas de cubierta con las trincas sueltas, adujadas con cuidado (nadie las cortó)
  for (const [x, y] of [[84, 156], [204, 156]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, H('#7a7a84')); }
  // el tramo de regala quitado, tirado en cubierta con sus cabillas; un balde y un rollo de cabo
  R.poligono([[236, 162], [306, 158], [307, 164], [237, 168]], K); R.poligono([[237, 163], [305, 159], [306, 163], [238, 167]], H('#c4b48e')); R.linea(237, 163, 305, 159, H('#e0d4b4'));
  for (const x of [244, 300]) { R.rect(x - 1, 152, x + 2, 162, K); R.linea(x, 153, x, 161, H('#7a5a3a')); }
  R.rect(286, 128, 304, 148, K); R.rect(287, 129, 303, 147, H('#8a6a48')); R.linea(287, 133, 303, 133, H('#5a5a64')); R.linea(287, 143, 303, 143, H('#5a5a64')); R.linea(288, 129, 288, 147, H('#b08a5e')); R.rect(288, 126, 302, 128, H('#3a2e22'));
  R.disco(36, 166, 12, K); R.disco(36, 166, 11, H('#a88a58')); R.disco(36, 166, 8, H('#7a6440')); R.disco(36, 166, 5, H('#a88a58')); R.disco(36, 166, 2, H('#5a4a30'));
  // la borda de este costado, por delante, en la esquina de abajo
  R.rect(0, 174, 319, 179, K); R.linea(0, 175, 319, 175, H('#8a6a48')); for (let x = 6; x < 320; x += 40) R.rect(x, 176, x + 3, 179, H('#4a3624'));
};
const p3 = (t) => {
  capa('escotillaPerfil', escotillaPerfil);
  // el cielo y el mar por encima de la regala y por el hueco, que se inclinan con el balanceo (más en «didn't fall off»)
  const amp = 0.025 + 0.05 * Math.sin(Math.PI * lin(t, FALL - 0.6, SOMEONE + 0.2)), tl = Math.sin(t * 1.6) * amp, dy = Math.sin(t * 1.6 + 0.6) * 3;
  for (let x = 0; x < 320; x++) { const hy = Math.round(62 + (x - 160) * tl + dy), y1 = x > 236 && x < 282 ? 103 : 81;
    for (let y = 0; y <= y1; y++) { if (x < 15 && y <= 150) continue;
      if (y < hy) R.pset(x, y, tono(CIELO, y / hy, x, y));
      else { const f = (y - hy) / 40, w = Math.sin(x * (0.3 + f) * 0.4 + y * 1.7 + t * 2.4) + Math.sin(x * 0.11 - y * 0.6 - t * 1.2) * 0.7; R.pset(x, y, w > 1.4 ? H('#c8d4dc') : tono(MAR, f + w * 0.06, x, y)); } } }
  nubesF(t, [[70, 38, 34, 0], [150, 34, 28, 1], [228, 40, 34, 2]], NUB, 58);
  for (let i = 0; i < 2; i++) pajaro(((t * (12 + i * 6) + i * 150) % 340) - 10, 34 + i * 10, t, H('#f2f2ee'));
  // la gaviota posada en la regala, que se va volando en «launched»
  { const vu = lin(t, LAUNCH - 0.1, LAUNCH + 0.9), x = Math.round(150 + vu * 120), y = Math.round(80 - vu * 50);
    if (vu <= 0) { R.rect(x - 4, y - 6, x + 4, y - 1, K); R.rect(x - 3, y - 5, x + 3, y - 2, H('#f2f2ee')); R.linea(x - 3, y - 4, x + 2, y - 4, H('#9aa4b0')); R.rect(x + 3, y - 9, x + 6, y - 5, K); R.rect(x + 4, y - 8, x + 5, y - 6, H('#ffffff')); R.pset(x + 7, y - 7, H('#e8a020')); R.pset(x - 1, y, H('#e8a020')); R.pset(x + 1, y, H('#e8a020')); }
    else if (vu < 1) pajaro(x, y, t, H('#f2f2ee')); }
  // las trincas cortadas en sus argollas, que baten con el viento
  for (const [x0, k] of [[84, 0], [204, 1]]) { let x = x0, y = 156; for (let s2 = 0; s2 < 6; s2++) { const nx = x + 3 + Math.round(Math.sin(t * 5 + k + s2 * 0.8) * 1.5), ny = y + Math.round(Math.sin(t * 4 + s2 + k) * 1.5); R.linea(x, y, nx, ny, H('#c8a868')); R.linea(x, y + 1, nx, ny + 1, H('#8a7048')); x = nx; y = ny; }
    R.pset(x + 1, y - 1, H('#f2e2b8')); R.pset(x + 1, y + 1, H('#f2e2b8')); R.pset(x + 2, y, H('#f2e2b8')); }
  // el bote de papel: aparece en «lifeboat», lo atan en «lashed», aguanta el bandazo y sale por el hueco en «launched»
  const ap = suave(lin(t, P3 + 0.05, P3 + 0.45));
  const sal = lin(t, LAUNCH, SPLASH + 0.25);
  if (ap > 0 && sal < 1) {
    let bx = 143, by = 99, rot = 0, sc = ap;
    if (sal > 0) { const a = Math.min(1, sal / 0.55), b = Math.max(0, (sal - 0.55) / 0.45); bx = lerp(143, 259, suave(a)); by = lerp(99, 84, suave(a)) + b * 46; rot = -b * 0.5; sc = 1 - b * 0.15; }
    else by = 99 - Math.round(Math.abs(Math.sin(t * 1.6)) * amp * 6);
    const pinta = () => yola(bx, by, 0.95 * sc, { papel: true, rot });
    if (sal < 0.55) pinta(); else { R.recorte([0, 0, 319, 81]); pinta(); R.recorte([237, 82, 281, 103]); pinta(); R.recorte(null); }
  }
  // las dos trincas de papel: suben en «lashed» y caen sueltas en «someone»
  const at = suave(lin(t, LASHED - 0.1, LASHED + 0.5)), su = suave(lin(t, SOMEONE - 0.1, SOMEONE + 0.25));
  if (at > 0 && su < 1) for (const x of [116, 170]) { const top = Math.round(lerp(112, 78, at * (1 - su))); cuerdaPapel(x - 4, 113, x, top); cuerdaPapel(x, top, x + 4, 113); }
  // la salpicadura al otro lado del hueco
  const sp = lin(t, SPLASH - 0.1, SPLASH + 0.5);
  if (sp > 0 && sp < 1) for (let k = 0; k < 14; k++) { const a = -1.3 + k * 0.19, v = 40 + (k % 4) * 9, x = Math.round(259 + (k - 6.5) * 3 * sp + Math.sin(a) * 2), y = Math.round(100 - (v * sp - 60 * sp * sp) * 0.9); if (y < 104 && y > 30) { R.pset(x, y, H('#f2f6f8')); R.pset(x + 1, y, H('#c8d8e4')); } }
};
'''
CUERPO += r'''
// ── 4 · la mesa de cartas: se llevan el sextante y el cronómetro ────────────────────────────────────────────────
const sextante = (x, y) => { x = Math.round(x); y = Math.round(y);   // (x, y): el pivote del índice
  const L = H('#e8c860'), M = H('#c8a040'), S = H('#8a6a28');
  for (let a = 0; a <= 30; a++) { const an = 1.1 + a / 30 * 0.95; const px = Math.round(x + Math.cos(an) * 34), py = Math.round(y + Math.sin(an) * 30); R.pset(px, py, K); R.pset(px, py - 1, M); R.pset(px, py - 2, L); if (a % 5 === 0) R.pset(px, py - 3, S); }
  R.linea(x, y, Math.round(x + Math.cos(1.1) * 34), Math.round(y + Math.sin(1.1) * 30) - 1, M); R.linea(x + 1, y, Math.round(x + Math.cos(1.1) * 34) + 1, Math.round(y + Math.sin(1.1) * 30) - 1, S);
  R.linea(x, y, Math.round(x + Math.cos(2.05) * 34), Math.round(y + Math.sin(2.05) * 30) - 1, M); R.linea(x - 1, y, Math.round(x + Math.cos(2.05) * 34) - 1, Math.round(y + Math.sin(2.05) * 30) - 1, L);
  R.linea(x, y, x + 2, y + 28, H('#4a4a54')); R.linea(x + 1, y, x + 3, y + 28, H('#a8a8b4'));
  R.rect(x - 14, y - 6, x + 10, y - 3, K); R.rect(x - 13, y - 5, x + 9, y - 4, H('#2a2a30')); R.pset(x - 12, y - 5, H('#8a8a94'));   // el anteojo
  R.rect(x - 3, y - 3, x + 3, y + 2, K); R.rect(x - 2, y - 2, x + 2, y + 1, H('#a8c8d8')); R.pset(x - 1, y - 1, H('#ffffff'));   // el espejo grande
  R.rect(x - 16, y + 10, x - 11, y + 15, K); R.rect(x - 15, y + 11, x - 12, y + 14, H('#8ab0c8'));
  R.disco(x, y, 2, L); R.pset(x, y, K); };
const cronometro = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  R.disco(x, y, 17, K); R.disco(x, y, 16, H('#c8a040')); R.disco(x - 1, y - 1, 15, H('#e8c860')); R.disco(x, y, 13, H('#a87a28')); R.disco(x, y, 12, H('#f6f0dc'));
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6, r = k % 3 ? 10 : 9; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), H('#2a2a30')); if (!(k % 3)) R.pset(Math.round(x + Math.cos(an) * 11), Math.round(y + Math.sin(an) * 11), H('#2a2a30')); }
  R.disco(x, y + 5, 3, H('#e8e2cc')); R.pset(x, y + 5, H('#2a2a30')); const sg = Math.floor(t * 2) / 2 * 1.2; R.pset(Math.round(x + Math.sin(sg) * 2), Math.round(y + 5 - Math.cos(sg) * 2), H('#c83a2a'));
  R.linea(x, y, x + 6, y - 4, H('#1a1a40')); R.linea(x, y, x - 1, y - 8, H('#1a1a40')); R.pset(x, y, H('#c8a040')); };
const cajaAbierta = (x0, y0, x1, y1, tapa) => {   // caja de caoba abierta: la tapa de pie detrás con su terciopelo, la bandeja de terciopelo
  R.rect(x0 + 2, tapa, x1 - 2, y0, K); R.rect(x0 + 3, tapa + 1, x1 - 3, y0 - 1, H('#7a3a1e')); R.rect(x0 + 6, tapa + 4, x1 - 6, y0 - 2, H('#4a1222'));
  for (let y = tapa + 5; y < y0 - 2; y += 3) for (let x = x0 + 7; x < x1 - 6; x += 4) R.pset(x + (y % 2), y, H('#5a1a2c'));
  R.linea(x0 + 3, tapa + 1, x1 - 3, tapa + 1, H('#b0643a')); R.rect(x0 + 2, y0 - 2, x1 - 2, y0, H('#3a1a0e'));
  R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, H('#8a4424')); R.rect(x0 + 4, y0 + 3, x1 - 4, y1 - 12, H('#5a1424'));
  for (let y = y0 + 4; y < y1 - 12; y += 3) for (let x = x0 + 5; x < x1 - 4; x += 4) R.pset(x + (y % 2), y, H('#6a1c2e'));
  R.rect(x0 + 1, y1 - 11, x1 - 1, y1 - 1, H('#9a4e2a')); R.linea(x0 + 1, y1 - 11, x1 - 1, y1 - 11, H('#c8784a')); for (let x = x0 + 4; x < x1 - 2; x += 9) R.linea(x, y1 - 9, x + 5, y1 - 9, H('#7a3a1e'));
  R.rect(Math.round((x0 + x1) / 2) - 3, y1 - 8, Math.round((x0 + x1) / 2) + 3, y1 - 4, H('#c8a040')); R.pset(Math.round((x0 + x1) / 2), y1 - 6, K); };
const mesaCartas = () => {
  // el mamparo del camarote: tablas verticales machihembradas, el ojo de buey, el barómetro; la esquina de Atom, lisa
  for (let y = 0; y <= 66; y++) for (let x = 0; x < 320; x++) { const xx = x % 16; let c = xx === 0 ? H('#3a2216') : xx === 1 ? H('#8a5a3a') : (Math.sin(y * 0.21 + x * 0.6 + Math.floor(x / 16) * 2) > 0.9 ? H('#7a4a2e') : H('#6a3e26'));
    if (x >= 268 && y <= 48) c = xx === 0 ? H('#4a2c1c') : H('#6a3e26'); R.pset(x, y, c); }
  R.rect(0, 58, 319, 62, H('#4a2a18')); R.linea(0, 58, 319, 58, H('#a87048'));
  R.disco(212, 32, 16, K); R.disco(212, 32, 15, H('#c8a040')); R.disco(211, 31, 13, H('#e8c860')); R.disco(212, 32, 11, H('#2a3a48'));
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.disco(Math.round(212 + Math.cos(an) * 14), Math.round(32 + Math.sin(an) * 14), 1, H('#8a6a28')); }
  R.disco(62, 36, 12, K); R.disco(62, 36, 11, H('#7a4a28')); R.disco(62, 36, 9, H('#f2ecd8')); for (let k = 0; k < 10; k++) { const an = 2.4 + k * 0.5; R.pset(Math.round(62 + Math.cos(an) * 7), Math.round(36 + Math.sin(an) * 7), H('#2a2a30')); } R.rect(60, 46, 64, 54, H('#c8a040'));
  R.rect(110, 26, 160, 50, K); R.rect(111, 27, 159, 49, H('#e8dcc0')); for (let y = 30; y < 48; y += 3) R.linea(114, y, 156, y, H('#b8a888')); R.linea(130, 28, 142, 46, H('#4a6a8a'));   // una carta clavada, sin letras
  for (const [x, y] of [[112, 28], [158, 28]]) R.pset(x, y, H('#c83a2a'));
  // la mesa de caoba con su barandilla de latón
  R.rect(0, 63, 319, 67, H('#c8a040')); R.linea(0, 63, 319, 63, H('#f2d888')); R.linea(0, 67, 319, 67, H('#5a3a14'));
  madera(0, 68, 319, 179, [H('#a4583a'), H('#86422a'), H('#6a321e'), H('#4a2214')], 9, 5);
  // la carta náutica bajo las cajas: costa, cuadrícula, rosa y sondas
  R.poligono([[52, 136], [268, 130], [276, 179], [44, 179]], H('#3a2a1c')); R.poligono([[53, 137], [267, 131], [275, 179], [45, 179]], H('#e8dcb8'));
  for (let x = 70; x < 270; x += 26) R.linea(x, 136, x - 4, 179, H('#cdbf98')); for (let y = 148; y < 180; y += 12) R.linea(50, y, 272, y - 4, H('#cdbf98'));
  for (let x = 60; x < 140; x++) { const y = Math.round(150 + Math.sin(x * 0.12) * 6 + Math.sin(x * 0.37) * 2); R.pset(x, y, H('#5a4a30')); R.pset(x, y + 1, H('#c8a868')); }
  R.disco(236, 160, 9, H('#cdbf98')); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = k % 2 ? 5 : 9; R.linea(236, 160, Math.round(236 + Math.cos(an) * r), Math.round(160 + Math.sin(an) * r), k === 6 ? H('#c83a2a') : H('#5a4a30')); }
  for (const [x, y, n] of [[170, 166, '12'], [196, 172, '30']]) R.numero(n, x, y, { fina: true });
  // el tintero con la pluma, la vela en su palmatoria, el compás de puntas y el diario cerrado
  R.rect(150, 96, 164, 110, K); R.rect(151, 97, 163, 109, H('#1a1a2a')); R.rect(153, 94, 161, 97, H('#c8a040')); R.linea(152, 98, 152, 107, H('#4a4a6a'));
  R.linea(160, 95, 172, 74, K); R.linea(161, 95, 173, 74, H('#f2f2ee')); for (let k = 0; k < 6; k++) R.linea(172 - k * 2, 76 + k * 3, 175 - k * 2, 77 + k * 3, H('#e8e8e2'));
  R.rect(132, 124, 150, 128, K); R.rect(133, 125, 149, 127, H('#c8a040')); R.rect(138, 100, 144, 125, K); R.rect(139, 101, 143, 124, H('#f2ecd8')); R.linea(139, 101, 139, 124, H('#ffffff'));
  R.linea(98, 168, 120, 150, H('#5a5a64')); R.linea(98, 168, 124, 160, H('#5a5a64')); R.disco(120, 150, 2, H('#c8a040'));
  R.rect(284, 140, 319, 178, K); R.rect(285, 141, 319, 177, H('#3a2a4a')); R.rect(288, 141, 292, 177, H('#2a1a3a')); R.linea(285, 176, 319, 176, H('#e8dcc0')); R.linea(285, 174, 319, 174, H('#e8dcc0'));
};
const p4 = (t) => {
  capa('mesaCartas', mesaCartas);
  // la llama de la vela y su luz
  { const f = Math.sin(t * 11) > 0.2 ? 1 : 0; R.disco(141, 96 - f, 3, H('#ffb040')); R.disco(141, 95 - f, 2, H('#ffe08a')); R.pset(141, 93 - f, H('#ffffff')); R.linea(141, 99, 141, 100, K); }
  // el mar por el ojo de buey, que sube y baja
  { const hy = Math.round(32 + Math.sin(t * 1.3) * 4); R.recorte([201, 21, 223, 43]); for (let y = 21; y <= 43; y++) for (let x = 201; x <= 223; x++) { if (Math.hypot(x - 212, y - 32) > 11) continue; R.pset(x, y, y < hy ? tono(CIELO, (y - 21) / 14, x, y) : tono(MAR, (y - hy) / 12, x, y)); } R.recorte(null); R.pset(206, 26, H('#ffffff')); }
  // la caja del sextante (izquierda) y la del cronómetro (derecha)
  cajaAbierta(6, 92, 108, 146, 58);
  const tapaC = t > SEA + 1.2 ? Math.round(lerp(60, 94, suave(lin(t, SEA + 1.2, SEA + 1.8)))) : 60;
  // los huecos del terciopelo con la forma de cada instrumento
  { const x = 56, y = 100; for (let a = 0; a <= 30; a++) { const an = 1.1 + a / 30 * 0.95; R.pset(Math.round(x + Math.cos(an) * 34), Math.round(y + Math.sin(an) * 30) - 1, H('#2a0a14')); } R.linea(x, y, x + 15, y + 26, H('#2a0a14')); R.linea(x, y, x - 16, y + 26, H('#2a0a14')); R.rect(x - 14, y - 6, x + 10, y - 3, H('#2a0a14')); }
  // el sextante: una mano entra en «sextant», lo coge y se lo lleva
  const sA = suave(lin(t, SEXT - 0.35, SEXT + 0.15)), sB = suave(lin(t, SEXT + 0.3, SEXT + 1.0));
  { const hx = lerp(-24, 44, sA) + lerp(0, -70, sB), hy = lerp(70, 92, sA) + lerp(0, -40, sB), cx = 56 + lerp(0, -70, sB), cy = 100 + lerp(0, -40, sB);
    sextante(cx, cy); if (sA > 0 && sB < 1) T.brazo(R, Math.round(hx - 62), Math.round(hy - 44), Math.round(hx), Math.round(hy), '#2a2e44', 1, { codo: [Math.round(hx - 34), Math.round(hy - 10)] }); }
  cajaAbierta(186, 96, 296, 150, 60 + 0);
  { R.disco(241, 118, 20, H('#3a0a18')); R.disco(241, 118, 19, H('#5a1424')); for (let a = 0; a < 60; a++) { const an = a / 60 * Math.PI * 2; R.pset(Math.round(241 + Math.cos(an) * 19), Math.round(118 + Math.sin(an) * 19), H('#c8a040')); } }
  const cA = suave(lin(t, CRONO - 0.35, CRONO + 0.15)), cB = suave(lin(t, CRONO + 0.3, CRONO + 1.0));
  { const hx = lerp(344, 262, cA) + lerp(0, 80, cB), hy = lerp(80, 118, cA) + lerp(0, -46, cB), cx = 241 + lerp(0, 80, cB), cy = 118 + lerp(0, -46, cB);
    if (tapaC <= 60 || cB >= 1) { if (cB < 1) cronometro(cx, cy, t); }
    if (cA > 0 && cB < 1) T.brazo(R, Math.round(hx + 66), Math.round(hy - 44), Math.round(hx), Math.round(hy), '#2a2e44', -1, { codo: [Math.round(hx + 36), Math.round(hy - 8)] }); }
  if (tapaC > 60) { R.rect(186 + 2, tapaC, 296 - 2, 96, K); R.rect(189, tapaC + 1, 293, 95, H('#7a3a1e')); R.linea(189, tapaC + 1, 293, tapaC + 1, H('#b0643a')); for (let x = 196; x < 290; x += 12) R.linea(x, tapaC + 4, x + 6, tapaC + 4, H('#5a2a14')); }
  // el lápiz que rueda por la carta con el balanceo
  { const x = Math.round(150 + Math.sin(t * 1.1) * 40), y = Math.round(150 + (x - 150) * -0.02); R.linea(x - 12, y, x + 12, y, K); R.linea(x - 11, y - 1, x + 10, y - 1, H('#e8b020')); R.linea(x - 11, y, x + 10, y, H('#c88a10')); R.pset(x + 12, y - 1, H('#2a2a30')); R.pset(x - 12, y - 1, H('#e88a8a')); }
  // en «where you are» la cruz de lápiz en la carta, que no sabe dónde va: «?»
  if (t > TOOLS) { const u = lin(t, TOOLS, WHERE), x = Math.round(lerp(120, 200, Math.sin(u * 6) * 0.5 + 0.5)), y = 160; R.linea(x - 3, y - 3, x + 3, y + 3, H('#3a3a40')); R.linea(x - 3, y + 3, x + 3, y - 3, H('#3a3a40'));
    if (t > WHERE) R.bocadillo(x, y - 6, { icono: '?' }); }
  if (t > SEA) { R.bocadillo(56, 86, { icono: '?' }); if (tapaC < 80) R.bocadillo(241, 90, { icono: '?' }); }
};
'''
CUERPO += r'''
// ── 5 · la cubierta junto al palo mayor: Briggs saca la varilla ──────────────────────────────────────────────────
const cubiertaPalo = () => {
  cieloT(0, 30, [H('#8494a6'), H('#9aa6b4'), H('#b2b8c0'), H('#c8c6c0')]);
  // la vela mayor, grande, que llena el fondo: paños con costuras, la faja de rizos con sus tomadores, la relinga
  for (let x = 0; x < 320; x++) for (let y = 30; y <= 96; y++) R.pset(x, y, tono(MAR, (y - 30) / 66, x, y));
  const VE = [H('#fbf7ea'), H('#efe7cf'), H('#ddd2b2'), H('#c6b892'), H('#a89a74')];
  for (let x = 18; x <= 268; x++) { const u = (x - 18) / 250, pie = Math.round(84 - Math.sin(u * Math.PI) * 7);
    for (let y = 28; y <= pie; y++) { const v = (y - 28) / 56, belly = Math.sin(u * Math.PI) * Math.sin(Math.min(1, v * 1.2) * Math.PI * 0.9);
      let sh = 0.15 + u * 0.55 - belly * 0.35 + v * 0.15; if (Math.abs((x - 18) - (y - 28) * 2.2 - 40) < 2 || Math.abs((268 - x) - (y - 28) * 2.4 - 30) < 2) sh += 0.25;
      let c = tono(VE, sh, x, y); if ((x - 18) % 14 === 0) c = mez(c, H('#8a7a5a'), 0.45); if ((x - 18) % 14 === 1) c = mez(c, H('#ffffff'), 0.4); if (y === 62) c = mez(c, H('#8a7a5a'), 0.4); if (y === 63) c = mez(c, H('#ffffff'), 0.3);
      if (y === pie || x === 18 || x === 268) c = H('#6a5a40'); R.pset(x, y, c); } }
  for (let x = 30; x < 264; x += 9) { R.linea(x, 63, x, 67, H('#a89a78')); R.pset(x, 68, H('#8a7a5a')); }
  // un remiendo en la vela, con sus puntadas
  R.rect(56, 40, 74, 52, H('#e0d4b0')); for (let x = 56; x <= 74; x += 2) { R.pset(x, 40, H('#8a7a5a')); R.pset(x, 52, H('#8a7a5a')); } for (let y = 40; y <= 52; y += 2) { R.pset(56, y, H('#8a7a5a')); R.pset(74, y, H('#8a7a5a')); }
  R.rect(14, 26, 272, 29, K); R.linea(14, 27, 272, 27, H('#8a6a48'));   // la verga
  for (const x of [40, 90, 140, 214]) R.linea(x, 29, x - 2, 36, H('#e8e0c8'));   // los tomadores aferrados
  R.linea(19, 84, 6, 108, H('#4a4048')); R.linea(267, 84, 300, 108, H('#4a4048'));   // las escotas a las bandas
  // la regala de enfrente, baja
  R.rect(0, 94, 319, 96, K); R.linea(0, 95, 319, 95, H('#a87a4a'));
  for (let y = 97; y <= 104; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 24 < 3 ? H('#a8946c') : H('#c4b48e'));
  madera(0, 105, 319, 179, [H('#ccb48c'), H('#ac9270'), H('#8a7252'), H('#5a4630')], 7, 4);
  R.linea(0, 105, 319, 105, H('#4a3a2a'));
  // un tonel de agua en sus calzos y un cajón, a la derecha (donde no hay bote: este plano mira al otro costado)
  R.rect(214, 108, 262, 132, K); R.rect(215, 109, 261, 131, H('#a8794a')); for (const x of [224, 238, 252]) R.linea(x, 109, x, 131, H('#6a4422')); R.linea(215, 113, 261, 113, H('#2a2a30')); R.linea(215, 127, 261, 127, H('#2a2a30')); R.linea(215, 110, 261, 110, H('#d4a46a'));
  R.rect(210, 130, 220, 136, H('#5a4028')); R.rect(256, 130, 266, 136, H('#5a4028')); R.rect(234, 118, 240, 121, H('#c8a040'));
  R.rect(276, 114, 306, 136, K); R.rect(277, 115, 305, 135, H('#9a7a52')); R.linea(277, 124, 305, 124, H('#6a5236')); R.linea(277, 115, 305, 115, H('#c8a878')); R.linea(291, 115, 291, 135, H('#6a5236'));
  // el palo mayor con su cabillero y las drizas adujadas
  R.rect(174, 0, 186, 116, K); for (let y = 0; y <= 115; y++) for (let x = 175; x <= 185; x++) R.pset(x, y, x < 178 ? H('#d4a46a') : x > 182 ? H('#6a4a2a') : (Math.sin(y * 0.4 + x) > 0.9 ? H('#b88a5a') : H('#a07448')));
  for (const y of [40, 41, 98, 99]) R.linea(174, y, 186, y, H('#3a3a40'));
  R.rect(152, 104, 208, 108, K); R.rect(153, 105, 207, 107, H('#8a6a48')); for (const x of [158, 166, 194, 202]) { R.rect(x - 1, 98, x + 1, 112, K); R.linea(x, 99, x, 111, H('#d4b48a')); }
  for (const x of [162, 198]) for (let j = 0; j < 4; j++) R.linea(x - 3 + j, 108, x - 2 + j, 128 - j * 2, j % 2 ? H('#a88a58') : H('#c8a868'));
  // la bomba de la izquierda (de palanca), con su caño y su imbornal
  R.rect(90, 118, 106, 154, K); R.rect(91, 119, 105, 153, H('#7a5a3a')); R.linea(92, 119, 92, 153, H('#a87a4a')); for (const y of [126, 140, 150]) R.rect(91, y, 105, y + 1, H('#4a4a54'));
  R.rect(106, 136, 116, 140, K); R.rect(107, 137, 116, 139, H('#5a5a64'));
  R.rect(94, 114, 102, 120, K); R.rect(95, 115, 101, 119, H('#c8a040'));
  // el tubo de sondeo: la boca de latón en cubierta y su tapón quitado al lado
  R.disco(146, 156, 5, K); R.disco(146, 156, 4, H('#c8a040')); R.disco(146, 156, 2, H('#1a1410')); R.pset(144, 154, H('#f2d888'));
  R.disco(130, 164, 3, K); R.disco(130, 164, 2, H('#c8a040')); R.pset(129, 163, H('#f2d888'));
  // las piezas de la otra bomba, desmontadas, y la llave inglesa, abajo a la derecha
  R.rect(222, 150, 262, 157, K); R.rect(223, 151, 261, 156, H('#7a5a3a')); R.linea(223, 151, 261, 151, H('#a87a4a')); for (const x of [230, 254]) R.rect(x, 151, x + 2, 156, H('#4a4a54'));
  R.linea(268, 164, 304, 150, K); R.linea(268, 163, 304, 149, H('#8a8a94')); R.disco(304, 150, 3, K); R.disco(304, 150, 2, H('#6a6a74'));
  R.disco(240, 170, 5, K); R.disco(240, 170, 4, H('#8a5a34')); R.disco(240, 170, 2, H('#3a2a1c'));
  R.linea(276, 174, 296, 170, K); R.linea(276, 173, 296, 169, H('#5a5a64')); R.rect(294, 166, 300, 172, H('#5a5a64'));
  // el gallinero de a bordo (jaula de listones) con su comedero
  R.rect(14, 112, 72, 138, K); R.rect(15, 113, 71, 137, H('#5a4028')); for (let x = 17; x < 71; x += 5) R.linea(x, 114, x, 136, H('#b08a5e')); R.linea(15, 113, 71, 113, H('#d4a46a')); R.linea(15, 125, 71, 125, H('#8a6a48'));
  R.rect(22, 138, 64, 141, H('#3a2a1c'));
  // un balde y un rollo de cabo
  R.rect(20, 146, 36, 164, K); R.rect(21, 147, 35, 163, H('#8a6a48')); R.linea(21, 151, 35, 151, H('#5a5a64')); R.linea(21, 159, 35, 159, H('#5a5a64')); R.linea(22, 147, 22, 163, H('#b08a5e'));
  R.disco(50, 170, 9, K); R.disco(50, 170, 8, H('#a88a58')); R.disco(50, 170, 5, H('#7a6440')); R.disco(50, 170, 2, H('#5a4a30'));
  // la borda de este costado
  R.rect(0, 175, 319, 179, K); R.linea(0, 176, 319, 176, H('#8a6a48'));
};
const p5 = (t) => {
  capa('cubiertaPalo', cubiertaPalo);
  // la vela que respira con el viento: una sombra que va y viene por los paños (sin tocar el palo)
  { const sx = Math.round(140 + Math.sin(t * 0.9) * 60); for (let y = 30; y < 84; y++) for (let x = sx - 26; x < sx + 26; x++) { if (x < 26 || x > 262 || (x >= 174 && x <= 186) || bay(x, y) > 0.3 * (1 - Math.abs(x - sx) / 26)) continue; R.pset(x, y, mez(R.pget(x, y), H('#8a7a5a'), 0.35)); } }
  for (let i = 0; i < 2; i++) pajaro(lerp(276, 316, ((t * 0.2 + i * 0.5) % 1)), 60 + i * 12, t, H('#f2f2ee'));
  for (let i = 0; i < 6; i++) { const x = Math.round(((i * 37 + t * (8 + i % 3 * 3)) % 330) - 5), y = 88 + (i * 3) % 7; if (x > 18 && x < 268) R.linea(x, y, x + 3, y, H('#c8d0d8')); }
  // las gallinas del gallinero, que picotean entre los listones
  for (const [x0, k] of [[28, 0], [52, 1]]) { const x = x0 + Math.round(Math.sin(t * 0.8 + k * 2) * 5), pk = pul(t, 6, k * 2) ? 2 : 0, y = 131;
    R.disco(x, y - 3, 4, K); R.disco(x, y - 3, 3, k ? H('#c8783a') : H('#f2ece0')); R.disco(x + 4, y - 7 + pk, 2, K); R.disco(x + 4, y - 7 + pk, 1, k ? H('#c8783a') : H('#f2ece0')); R.pset(x + 6, y - 7 + pk, H('#e8a020')); R.pset(x + 4, y - 9 + pk, H('#d83a2a'));
    for (let xx = 17; xx < 71; xx += 5) if (Math.abs(xx - x) < 6) R.linea(xx, 120, xx, 136, H('#b08a5e')); }
  // el marinero da a la bomba: la palanca sube y baja, y el agua sale por el caño a golpes
  const pv = Math.sin(t * 4.2), lx = 98, ly = 116;
  const Mm = R.actor(EL.marineroMC, 64, 156, t, { dir: 1, sostiene: [84, Math.round(134 + pv * 6)] });
  { const [ex, ey] = Mm.mano, dx = ex - lx, dy = ey - ly, d = Math.hypot(dx, dy) || 1, fx = Math.round(lx + dx / d * (d + 4)), fy = Math.round(ly + dy / d * (d + 4));
    R.linea(lx, ly, fx, fy, K); R.linea(lx, ly - 1, fx, fy - 1, H('#8a6a48')); R.disco(lx, ly, 2, H('#5a5a64')); R.pset(lx, ly, H('#a8a8b4')); R.disco(ex, ey, 2, H('#f6c290')); }
  if (pv > 0.3) for (let k = 0; k < 5; k++) R.pset(117 + k, 139 + Math.round(k * k * 0.4), H('#c8e0f0'));
  // Briggs saca la varilla del tubo, la levanta y mira la parte mojada, que gotea en «water»
  const sube = suave(lin(t, P5 + 0.3, MEASURED)), gira = suave(lin(t, MEASURED, WATER + 0.1));
  const A = R.actor(EL.briggsMC, 124, 160, t, { dir: 1, sostiene: [146, Math.round(lerp(154, 138, sube))], sorpresa: t > WATER && t < WATER + 0.9, triste: t > WATER + 0.9 });
  { const [mx, my] = A.mano, L = 62, an = lerp(Math.PI / 2, -1.35, gira), ux = Math.cos(an), uy = Math.sin(an);
    // la varilla: mientras sale del tubo, va de la mano a la boca (las marcas suben); luego gira y la parte mojada queda arriba
    const vis = gira > 0 ? L : Math.min(L, 156 - my), corre = Math.round(sube * 30);
    for (let i = 0; i <= vis; i++) { const x = Math.round(mx + ux * i), y = Math.round(my + uy * i), moj = i > L - 24 || (gira === 0 && i > 156 - my - 2), marca = (i + corre) % 7 === 0;
      R.pset(x - 1, y, K); R.pset(x + 1, y + (gira > 0.3 ? 1 : 0), K); R.pset(x, y, moj ? (marca ? H('#9ac8f0') : H('#2a3a5a')) : marca ? H('#ffffff') : H('#b8b8c4')); }
    R.disco(mx, my - 1, 2, H('#c8a040')); R.pset(mx, my - 1, K);
    const ex = Math.round(mx + ux * L), ey = Math.round(my + uy * L), wx = Math.round(mx + ux * (L - 24)), wy = Math.round(my + uy * (L - 24));
    if (gira > 0.5) for (let k = 0; k < 4; k++) { const ph = (t * 1.5 + k * 0.25) % 1, px = Math.round(lerp(wx, ex, (k + 0.5) / 4)), py = Math.round(lerp(wy, ey, (k + 0.5) / 4)); R.pset(px, Math.round(py + 2 + ph * (158 - py)), H('#c8e0f0')); }
    if (t > WATER - 0.1) { const k = pul(t, 9) ? H('#f8e070') : H('#e8b040'); R.linea(wx - 5, wy - 4, wx + 5, wy + 4, k); R.linea(wx - 4, wy - 5, wx + 6, wy + 3, k); R.numero('3', ex - 13, ey + 8, {}); } }
};
// ── 6 · la caseta del camarote: lo que pensó Briggs (el barco que se hunde, algo terrible) ───────────────────────
const caseta = () => {
  cieloT(0, 34, [H('#8a9aac'), H('#a0acba'), H('#b8c0c8'), H('#c8ccd0')]);
  // el techo de la caseta con su borde, el ventilador de manga y la claraboya
  R.rect(0, 30, 319, 38, K); for (let x = 0; x < 320; x++) for (let y = 31; y <= 37; y++) R.pset(x, y, y === 31 ? H('#d4b48a') : y > 35 ? H('#5a4028') : H('#a07448'));
  R.rect(236, 14, 250, 31, K); R.rect(237, 18, 249, 30, H('#c8c0b0')); R.disco(243, 17, 7, K); R.disco(243, 17, 6, H('#d83a2a')); R.disco(243, 17, 3, H('#3a1a14'));
  // la pared de tablas verticales con sus junquillos
  for (let y = 39; y <= 150; y++) for (let x = 0; x < 320; x++) { const xx = x % 9; R.pset(x, y, xx === 0 ? H('#5a4430') : xx === 1 ? H('#b89466') : (Math.sin(y * 0.27 + x * 1.3) > 0.92 ? H('#a8845a') : H('#94704a'))); }
  R.rect(0, 39, 319, 42, H('#6a4e34')); R.rect(0, 140, 319, 150, H('#6a4e34')); R.linea(0, 140, 319, 140, H('#b08a5e'));
  // la puerta abierta: dentro, la escala del camarote y la luz
  R.rect(118, 62, 148, 150, K); R.rect(120, 64, 146, 150, H('#1c1612'));
  for (let y = 70; y < 150; y += 10) { R.linea(124, y, 142, y + 3, H('#6a4a2a')); R.linea(124, y + 1, 142, y + 4, H('#3a2a1c')); }
  for (let y = 64; y < 150; y++) for (let x = 120; x <= 146; x++) if (bay(x, y) > 0.82 && x > 136) R.pset(x, y, H('#4a3a28'));
  R.rect(148, 64, 158, 150, K); R.rect(149, 65, 157, 149, H('#7a5a3a')); R.linea(150, 66, 150, 148, H('#a87a4a')); R.disco(155, 106, 1, H('#c8a040'));   // la hoja abierta
  // las dos ventanas con su cortina y su marco
  for (const x of [36, 214]) { R.rect(x, 70, x + 34, 98, K); R.rect(x + 2, 72, x + 32, 96, H('#3a4a5a')); R.linea(x + 17, 72, x + 17, 96, K); R.linea(x + 2, 84, x + 32, 84, K); R.pset(x + 4, 74, H('#a8c0d8')); R.rect(x - 2, 98, x + 36, 101, H('#6a4e34')); }
  // el aro salvavidas (sin letras) y la campana del barco
  R.disco(280, 82, 13, K); R.disco(280, 82, 12, H('#f2eee2')); R.disco(280, 82, 6, H('#94704a')); R.disco(280, 82, 5, K); R.disco(280, 82, 4, H('#94704a'));
  for (const an of [0.4, 2.0, 3.6, 5.2]) { R.pset(Math.round(280 + Math.cos(an) * 9), Math.round(82 + Math.sin(an) * 9), H('#d83a2a')); R.pset(Math.round(280 + Math.cos(an) * 10), Math.round(82 + Math.sin(an) * 10), H('#d83a2a')); }
  R.rect(176, 52, 196, 55, H('#3a2a1c')); R.poligono([[180, 56], [192, 56], [195, 70], [177, 70]], K); R.poligono([[181, 57], [191, 57], [193, 69], [179, 69]], H('#c8a040')); R.linea(182, 58, 180, 68, H('#f2d888'));
  // la cubierta delante, con un rollo de cabo y un balde
  madera(0, 151, 319, 179, [H('#ccb48c'), H('#ac9270'), H('#8a7252'), H('#5a4630')], 6, 6);
  R.disco(26, 168, 10, K); R.disco(26, 168, 9, H('#a88a58')); R.disco(26, 168, 6, H('#7a6440')); R.disco(26, 168, 3, H('#5a4a30'));
  R.rect(296, 156, 312, 172, K); R.rect(297, 157, 311, 171, H('#8a6a48')); R.linea(297, 161, 311, 161, H('#5a5a64')); R.linea(298, 157, 298, 171, H('#b08a5e'));
};
// el bocadillo de pensamiento: una nube blanca con tres burbujas hacia la cabeza y dentro un dibujo a tiza sobre pizarra
const pensamiento = (cx, cy, hx, hy, ab) => {
  const w = Math.round(58 * ab), h = Math.round(34 * ab); if (w < 4) return null;
  for (const [dx, dy, r] of [[-0.7, 0, 0.42], [0.7, 0, 0.42], [0, -0.5, 0.5], [-0.35, 0.45, 0.42], [0.35, 0.45, 0.42], [0, 0, 0.6]]) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * h), Math.round(r * h) + 2, K);
  for (const [dx, dy, r] of [[-0.7, 0, 0.42], [0.7, 0, 0.42], [0, -0.5, 0.5], [-0.35, 0.45, 0.42], [0.35, 0.45, 0.42], [0, 0, 0.6]]) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * h), Math.round(r * h) + 1, H('#f6f4ee'));
  for (const k of [0, 1, 2]) { const u = 0.3 + k * 0.25, x = Math.round(lerp(cx, hx, u + 0.3)), y = Math.round(lerp(cy + h * 0.6, hy, u + 0.3)), r = 3 - k; R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#f6f4ee')); }
  const x0 = Math.round(cx - w * 0.75), x1 = Math.round(cx + w * 0.75), y0 = Math.round(cy - h * 0.55), y1 = Math.round(cy + h * 0.55);
  R.rect(x0, y0, x1, y1, H('#2a3a34')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (bay(x, y) > 0.9) R.pset(x, y, H('#34463e'));
  return [x0, y0, x1, y1];
};
const p6 = (t) => {
  capa('caseta', caseta);
  // el humo de la cocina por el ventilador, las cortinas que se mueven, la campana que se mece
  for (let k = 0; k < 5; k++) { const ph = (t * 0.6 + k * 0.2) % 1, x = Math.round(243 - ph * 30 + Math.sin(t * 2 + k) * 2), y = Math.round(10 - ph * 8); if (y > 1 && x < 270) R.disco(x, y + 10, 1 + Math.round(ph * 2), H('#d8dce0')); }
  for (const x of [38, 216]) { const sw = Math.round(Math.sin(t * 1.7 + x) * 2); R.poligono([[x, 72], [x + 8 + sw, 72], [x + 5 + sw, 96], [x, 96]], H('#c8b8e8')); R.linea(x + 3 + sw, 74, x + 2 + sw, 94, H('#a898c8')); }
  // el gato del barco, sentado junto a la puerta, mueve la cola; en «terrible» se eriza
  { const x = 168, y = 166, eriza = t > TERRIBLE && t < HAPPEN, c = H('#3a3a40'); R.rect(x - 5, y - 8 - (eriza ? 1 : 0), x + 4, y, K); R.rect(x - 4, y - 7 - (eriza ? 1 : 0), x + 3, y - 1, c); R.rect(x + 1, y - 13, x + 7, y - 7, K); R.rect(x + 2, y - 12, x + 6, y - 8, c); R.pset(x + 2, y - 14, K); R.pset(x + 6, y - 14, K); R.pset(x + 3, y - 10, H('#e8d040')); R.pset(x + 5, y - 10, H('#e8d040'));
    const cola = Math.sin(t * (eriza ? 9 : 3)); R.linea(x - 5, y - 2, x - 10, Math.round(y - 6 - cola * 3), c); R.linea(x - 10, Math.round(y - 6 - cola * 3), x - 11, Math.round(y - 10 - cola * 2), c); }
  // el marinero de la derecha, que mira a Briggs
  R.actor(EL.marineroMC, 232, 168, t, { dir: -1, sorpresa: t > TERRIBLE && t < HAPPEN, habla: t > P6 + 0.3 && t < SINKING - 0.2 && pul(t, 7) });
  // Briggs con la varilla en la mano; el pensamiento se abre en «sinking»: el barco que se hunde; en «terrible», el
  // barril con «!»; en «happen» el bocadillo se apaga y Briggs se vuelve a la puerta y llama
  const vuelve = t > HAPPEN - 0.1;
  const A = R.actor(EL.briggsMC, 78, 168, t, { dir: vuelve ? 1 : -1, sostiene: vuelve ? undefined : true, habla: vuelve && pul(t, 9), sorpresa: t > SINKING && t < TERRIBLE, enfado: t > TERRIBLE && t < HAPPEN, dedo: vuelve });
  if (!vuelve) { const [mx, my] = A.mano; for (let y = my - 18; y <= my + 14; y++) { R.pset(mx, y, y > my + 2 ? H('#2a3a5a') : H('#b8b8c4')); R.pset(mx + 1, y, K); } R.pset(mx, my + 16, H('#c8e0f0')); }
  const ab = suave(lin(t, SINKING - 0.35, SINKING + 0.05)) * (1 - suave(lin(t, HAPPEN, HAPPEN + 0.3)));
  const caja = pensamiento(84, 76, 86, 136, ab);
  if (caja && ab > 0.95) { const [x0, y0, x1, y1] = caja, T1 = H('#e8ece4'), T2 = H('#a8c8d8');
    R.recorte([x0, y0, x1, y1]);
    if (t < TERRIBLE - 0.1) { // el barco a tiza que se hunde en las olas
      const u = suave(lin(t, SINKING, TERRIBLE - 0.3)), bx = 84, by = 80 + Math.round(u * 10), rot = u * 0.35;
      const P = (a, b) => [Math.round(bx + a * Math.cos(rot) - b * Math.sin(rot)), Math.round(by - a * Math.sin(rot) - b * Math.cos(rot))];
      const L = (a, b, c, d) => { const [p, q] = P(a, b), [r, s2] = P(c, d); R.linea(p, q, r, s2, T1); };
      L(-22, 0, 22, 0); L(-22, 0, -18, -6); L(22, 0, 26, 6); L(-18, -6, 18, -6); L(18, -6, 22, 0); L(-6, 0, -6, 22); L(8, 0, 8, 24); L(-6, 20, -16, 4); L(8, 22, 20, 4);
      for (let x = x0; x <= x1; x++) { const y = Math.round(86 + Math.sin(x * 0.4 + t * 4) * 1.5); R.pset(x, y, T2); if (x % 3) R.pset(x, y + 4, T2); }
    } else { // el barril a tiza con su «!»
      const sh = pul(t, 18) ? 1 : 0; R.disco(78 + sh, 78, 10, T1); R.disco(78 + sh, 78, 9, H('#2a3a34')); R.linea(68 + sh, 72, 88 + sh, 72, T1); R.linea(68 + sh, 84, 88 + sh, 84, T1); R.linea(78 + sh, 68, 78 + sh, 88, T1);
      R.icono('!', 96, 66, H('#e84a3a'), H('#2a3a34'), 2); }
    R.recorte(null); }
};
// ── 7 · la cubierta desde lo alto, con Santa María en el horizonte: la orden ────────────────────────────────────
const yolaArriba = (x, y, flojo) => {   // el bote visto desde arriba, en su escotilla (proa a la derecha)
  const pts = [[x - 46, y - 8], [x + 30, y - 10], [x + 48, y], [x + 30, y + 10], [x - 46, y + 8], [x - 50, y]];
  R.poligono(pts.map(([a, b]) => [a, b + 3]), H('#3a3020')); R.poligono(pts, K);
  R.poligono([[x - 45, y - 7], [x + 30, y - 9], [x + 46, y], [x + 30, y + 9], [x - 45, y + 7], [x - 49, y]], H('#d8dcd6'));
  R.poligono([[x - 42, y - 5], [x + 28, y - 7], [x + 42, y], [x + 28, y + 7], [x - 42, y + 5], [x - 45, y]], H('#8a6a48'));
  for (let u = -36; u <= 24; u += 12) { R.linea(x + u, y - 6, x + u, y + 6, H('#c8a878')); R.linea(x + u + 1, y - 6, x + u + 1, y + 6, H('#5a4028')); }
  R.linea(x - 40, y, x + 36, y, H('#6a4a2a')); R.linea(x - 30, y - 2, x + 10, y - 3, H('#d4b48a')); R.linea(x - 30, y + 2, x + 10, y + 3, H('#d4b48a'));   // los remos dentro
  for (const u of [-24, 18]) { if (flojo) { R.linea(x + u - 2, y + 9, x + u - 6, y + 18, H('#c8a868')); R.linea(x + u + 2, y - 9, x + u + 5, y - 14, H('#c8a868')); } else { R.linea(x + u, y - 12, x + u, y + 12, H('#c8a868')); R.linea(x + u + 1, y - 12, x + u + 1, y + 12, H('#8a7048')); } } };
const cubiertaAlta = () => {
  cieloT(0, 40, [H('#8a9aac'), H('#a0acba'), H('#b8c0c8'), H('#cfd2d2'), H('#ddd8cc')]);
  // la isla de Santa María en el horizonte: acantilados, el Pico Alto, Vila do Porto en casitas blancas
  R.poligono([[18, 46], [30, 36], [52, 30], [70, 24], [84, 27], [104, 32], [124, 38], [140, 46]], H('#5a7068'));
  R.poligono([[22, 46], [34, 38], [54, 33], [70, 28], [82, 31], [100, 35], [120, 40], [134, 46]], H('#6e8a78'));
  for (let x = 22; x < 134; x++) for (let y = 30; y < 46; y++) if (bay(x, y) > 0.8 && R.pget(x, y) === H('#6e8a78')) R.pset(x, y, H('#5a7868'));
  R.linea(60, 31, 76, 26, H('#8aa48e')); for (const [x, y] of [[100, 42], [104, 41], [108, 42], [112, 43], [106, 43], [96, 43]]) { R.pset(x, y, H('#f2eee2')); R.pset(x, y - 1, H('#c83a2a')); }
  for (let x = 20; x < 138; x++) if (x % 3) R.pset(x, 46, H('#e8ecef'));
  for (let y = 46; y <= 58; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(MAR, (y - 46) / 12, x, y));
  // la regala de enfrente vista desde arriba, con sus candeleros
  R.rect(0, 58, 319, 62, K); R.linea(0, 59, 319, 59, H('#c89a6a')); R.linea(0, 60, 319, 60, H('#a87a4a'));
  for (let y = 63; y <= 74; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 63) % 4 === 3 ? H('#9a8a6a') : x % 26 < 3 ? H('#a8946c') : H('#c4b48e'));
  R.rect(0, 74, 319, 76, H('#5a4630'));
  // la cubierta en ligera perspectiva: tablas que se ensanchan hacia abajo
  { let y = 77, alto = 4, k = 0; while (y < 180) { madera(0, y, 319, Math.min(179, y + alto - 1), [H('#ccb48c'), H('#ac9270'), H('#8a7252'), H('#5a4630')], alto, k * 1.3); y += alto; alto = Math.min(9, alto + (k % 2)); k++; } }
  // la escotilla principal vista desde arriba (tapa y frente)
  R.rect(110, 96, 222, 122, K); for (let y = 97; y <= 113; y++) for (let x = 111; x <= 221; x++) R.pset(x, y, x % 16 === 0 ? H('#5a5e4a') : y === 97 ? H('#a8b08e') : H('#8a9274'));
  madera(111, 114, 221, 121, [H('#b08a5e'), H('#94704a'), H('#765836'), H('#4a3420')], 4, 9);
  // la caseta del camarote a la derecha: techo, claraboya, puerta abierta y su ventana
  R.rect(240, 66, 319, 132, K);
  for (let y = 67; y <= 84; y++) for (let x = 241; x <= 319; x++) R.pset(x, y, (y - 67) % 4 === 3 ? H('#8a7252') : H('#b49a76'));
  R.rect(268, 70, 292, 80, K); R.rect(269, 71, 291, 79, H('#6a8aa0')); R.linea(280, 71, 280, 79, K); R.pset(271, 72, H('#d8e8f0'));
  for (let y = 85; y <= 132; y++) for (let x = 241; x <= 319; x++) R.pset(x, y, (x - 241) % 7 === 0 ? H('#5a4430') : Math.sin(y * 0.3 + x) > 0.9 ? H('#b08a5a') : H('#94704a'));
  R.rect(252, 98, 270, 132, K); R.rect(253, 99, 269, 132, H('#1c1612')); R.linea(254, 100, 254, 132, H('#3a2e22'));
  R.rect(284, 100, 304, 116, K); R.rect(285, 101, 303, 115, H('#5a7a9a')); R.linea(294, 101, 294, 115, K); R.linea(285, 108, 303, 108, K); R.pset(287, 103, H('#a8c0d8'));
  // el palo mayor, que sube por delante del cielo, y el cabillero con sus drizas
  R.rect(222, 0, 232, 100, K); for (let y = 0; y <= 99; y++) for (let x = 223; x <= 231; x++) R.pset(x, y, x < 226 ? H('#d4a46a') : x > 229 ? H('#6a4a2a') : H('#a07448'));
  for (const y of [30, 31, 84, 85]) R.linea(222, y, 232, y, H('#3a3a40'));
  // obenques que bajan a la regala (lejos de la esquina de Atom)
  for (const [a, b] of [[184, 58], [196, 58], [208, 58]]) R.linea(a, b, 222, 4, H('#4a4048'));
  // la escotilla de proa (cerrada, con su lona y sus listones) y la bomba de cubierta con su palanca
  R.rect(14, 88, 90, 110, K); for (let y = 89; y <= 103; y++) for (let x = 15; x <= 89; x++) R.pset(x, y, x % 12 === 0 ? H('#5a5e4a') : y === 89 ? H('#a8b08e') : bay(x, y) > 0.9 ? H('#7a8264') : H('#8a9274'));
  madera(15, 104, 89, 109, [H('#b08a5e'), H('#94704a'), H('#765836'), H('#4a3420')], 3, 4);
  for (const x of [24, 80]) { R.disco(x, 96, 2, K); R.pset(x, 96, H('#8a8a94')); }
  R.rect(96, 112, 104, 132, K); R.rect(97, 113, 103, 131, H('#7a5a3a')); R.linea(98, 113, 98, 131, H('#a87a4a')); R.linea(100, 112, 84, 106, K); R.linea(100, 111, 84, 105, H('#8a6a48'));
  // un tonel de agua en sus calzos, adujas y un baúl de marinero abierto con su ropa
  R.rect(40, 140, 76, 158, K); R.rect(41, 141, 75, 157, H('#a8794a')); for (const x of [48, 58, 68]) R.linea(x, 141, x, 157, H('#6a4422')); R.linea(41, 144, 75, 144, H('#2a2a30')); R.linea(41, 154, 75, 154, H('#2a2a30')); R.rect(36, 156, 44, 160, H('#5a4028')); R.rect(72, 156, 80, 160, H('#5a4028'));
  R.rect(184, 150, 216, 166, K); R.rect(185, 151, 215, 165, H('#4a6a8a')); R.rect(185, 145, 215, 151, H('#3a5a7a')); R.linea(185, 151, 215, 151, H('#c8a040')); R.rect(190, 147, 206, 152, H('#e8e2cc')); R.rect(200, 146, 210, 150, H('#c83a2a'));
  for (const [x, y] of [[124, 150], [262, 162]]) { R.disco(x, y, 8, K); R.disco(x, y, 7, H('#a88a58')); R.disco(x, y, 4, H('#7a6440')); R.disco(x, y, 2, H('#5a4a30')); }
  // cosas en cubierta: un barril de agua, un rollo de cabo, un balde
  barrilP(150, 136, 1.2); R.disco(18, 166, 10, K); R.disco(18, 166, 9, H('#a88a58')); R.disco(18, 166, 6, H('#7a6440')); R.disco(18, 166, 3, H('#5a4a30'));
  R.rect(296, 150, 312, 166, K); R.rect(297, 151, 311, 165, H('#8a6a48')); R.linea(297, 155, 311, 155, H('#5a5a64')); R.linea(298, 151, 298, 165, H('#b08a5e'));
  R.rect(0, 175, 319, 179, K); R.linea(0, 176, 319, 176, H('#8a6a48'));
};
const p7 = (t) => {
  capa('cubiertaAlta', cubiertaAlta);
  nubesF(t, [[160, 32, 22, 0], [252, 34, 22, 1]], NUB, 38);
  for (let i = 0; i < 3; i++) pajaro(((t * (12 + i * 5) + i * 110) % 300) + 10, 22 + i * 5, t, H('#f2f2ee'));
  for (let i = 0; i < 12; i++) { const x = Math.round(((i * 31 + t * (6 + i % 3 * 3)) % 330) - 5), y = 48 + (i * 5) % 9; if (x > 18 && x < 140 && y < 47) continue; R.linea(x, y, x + 3, y, H('#d8e0e6')); }
  // la isla brilla en «island» / «Santa Maria»
  if (t > ISLAND - 0.1 && t < CLOSE + 0.6) brilloS(72, 26, t);
  // la sombra de la vela que barre la cubierta con el balanceo, y una gaviota que pasea por la regala
  { const sx = Math.round(120 + Math.sin(t * 0.8) * 70); for (let y = 78; y < 174; y++) for (let x = sx - 34 + (y >> 2); x < sx + 20 + (y >> 2); x++) { if (x < 0 || x > 319 || bay(x, y) > 0.3) continue; R.pset(x, y, mez(R.pget(x, y), H('#3a3020'), 0.25)); } }
  { const gx = Math.round(40 + ((t - P7) * 9) % 140), hop = pul(t, 5) ? 1 : 0; R.rect(gx - 4, 52 - hop, gx + 4, 57 - hop, K); R.rect(gx - 3, 53 - hop, gx + 3, 56 - hop, H('#f2f2ee')); R.linea(gx - 3, 54 - hop, gx + 2, 54 - hop, H('#9aa4b0')); R.rect(gx + 3, 49 - hop, gx + 6, 53 - hop, K); R.rect(gx + 4, 50 - hop, gx + 5, 52 - hop, H('#ffffff')); R.pset(gx + 7, 51 - hop, H('#e8a020')); }
  const flojo = t > HURRY - 0.2;
  yolaArriba(166, 100, flojo);
  // dos marineros corren al bote en «ordered» y sueltan las trincas
  const m1 = suave(lin(t, ORDERED - 0.1, ORDERED + 1.2)), m1x = Math.round(lerp(330, 196, m1));
  R.actor(EL.marineroMC, m1x, 138, t, { dir: -1, anda: m1 > 0 && m1 < 1, sostiene: m1 >= 1 && t < HURRY + 0.4 ? [m1x - 2, 120 + (pul(t, 10) ? 1 : 0)] : undefined, sonrisa: false });
  const m2 = suave(lin(t, ORDERED + 0.2, ORDERED + 1.4)), m2x = Math.round(lerp(-20, 122, m2));
  R.actor(EL.marineroMC, m2x, 138, t, { dir: 1, anda: m2 > 0 && m2 < 1, pal: { H: H('#d0a050'), h: H('#e8c070') }, sostiene: m2 >= 1 && t < HURRY + 0.4 ? [m2x + 16, 120 + (pul(t, 10, 1) ? 1 : 0)] : undefined });
  // Sarah sale de la caseta con Sophia de la mano y van hacia el bote
  const sa = suave(lin(t, ORDERED + 0.5, HURRY + 0.8)), sx = Math.round(lerp(254, 226, sa)), sy = Math.round(lerp(132, 158, sa));
  if (t > ORDERED + 0.3) { R.actor(EL.sophiaMC, sx - 12, sy, t, { dir: -1, anda: sa > 0 && sa < 1 }); R.actor(EL.sarahMC, sx, sy, t, { dir: -1, anda: sa > 0 && sa < 1, habla: sa >= 1 && pul(t, 7) }); }
  // Briggs da la orden en «ordered» y en «Santa Maria» señala la isla
  const vuelve = t > SANTA - 0.2;
  R.actor(EL.briggsMC, 150, 166, t, { dir: vuelve ? -1 : 1, dedo: (t > ORDERED - 0.1 && t < HURRY + 0.4) || (vuelve && t < CLOSE + 1.0), habla: (t > ORDERED && t < HURRY + 0.2 && pul(t, 9)) || (t > SANTA && t < CLOSE + 0.4 && pul(t, 8)) });
};
// ── 8 · el costado del barco desde el agua: Sarah baja al bote; se apartan un poco y esperan ────────────────────
const costado = () => {
  cieloT(0, 40, CIELO);
  // el casco negro con su franja blanca, las tablas, las mesas de guarnición y el forro de cobre
  for (let y = 38; y <= 128; y++) for (let x = 0; x < 320; x++) { let c = (y - 38) % 7 === 6 ? H('#0a080c') : hs(x >> 2, y, 7) > 0.94 ? H('#2e2c36') : H('#1c1a20'); if (y >= 64 && y <= 68) c = y === 64 ? H('#ffffff') : H('#e8e2d0'); if (y >= 114) c = (x + y) % 9 === 0 ? H('#8a9a6a') : H('#6a7a58'); if (y === 113) c = H('#3a3a30'); R.pset(x, y, c); }
  for (let x = 0; x < 320; x += 42) for (let y = 40; y < 112; y += 7) R.pset(x + (y % 14 ? 3 : 0), y + 2, H('#4a4650'));
  R.rect(0, 34, 319, 39, K); R.linea(0, 35, 319, 35, H('#c89a6a')); R.linea(0, 36, 319, 36, H('#a87a4a'));
  R.rect(196, 52, 268, 56, K); R.rect(197, 53, 267, 55, H('#5a4028')); for (const x of [204, 222, 240, 258]) { R.disco(x, 58, 3, K); R.disco(x, 58, 2, H('#3a2a1c')); R.linea(x, 61, x, 74, H('#3a3a40')); }
  for (const x of [204, 222, 240, 258]) { R.linea(x, 52, x + 14, 0, H('#3a3440')); R.linea(x + 1, 52, x + 15, 0, H('#5a5460')); }
  R.rect(70, 72, 76, 76, K); R.rect(71, 73, 75, 75, H('#2a2a30'));   // un imbornal
  // las cintas (tablones salientes) con su brillo, los churretes de óxido y de sal, los portillos del castillo
  for (const y of [48, 84, 100]) { R.linea(0, y, 319, y, H('#3a3844')); R.linea(0, y + 1, 319, y + 1, H('#0a080c')); }
  for (let x = 0; x < 320; x++) if (bay(x, 49) > 0.6) R.pset(x, 49, H('#5a5866'));
  for (const x of [70, 204, 222, 240, 258]) for (let y = 76; y < 112; y++) if (hs(x, y, 2) > 0.45) R.pset(x + (y % 3 ? 0 : 1), y, x === 70 ? H('#8a8478') : H('#5a3a2a'));
  for (const x of [30, 300]) { R.rect(x - 7, 70, x + 7, 80, K); R.rect(x - 6, 71, x + 6, 79, H('#c8a040')); R.rect(x - 4, 73, x + 4, 77, H('#1a2a3a')); R.pset(x - 3, 74, H('#8ab0c8')); }
  for (let x = 0; x < 320; x += 7) { const h = 2 + Math.round(hs(x, 3, 1) * 4); R.linea(x, 114, x, 114 + h, H('#4a5a3a')); }   // algas y lapas en la flotación
  // una defensa de cabo colgada del costado
  R.linea(110, 36, 110, 92, H('#c8a868')); R.disco(110, 98, 6, K); R.disco(110, 98, 5, H('#a88a58')); for (let y = 93; y < 104; y += 2) R.linea(106, y, 114, y, H('#7a6440'));
  // la escala de gato que cuelga del costado
  for (const x of [138, 152]) { R.linea(x, 36, x, 126, H('#c8a868')); R.linea(x + 1, 36, x + 1, 126, H('#8a7048')); }
  for (let y = 44; y < 126; y += 7) { R.linea(138, y, 153, y, K); R.linea(139, y - 1, 152, y - 1, H('#a87a4a')); }
};
const p8 = (t) => {
  capa('costado', costado);
  nubesF(t, [[70, 30, 18, 0], [150, 30, 16, 1]], NUB, 33);
  for (let i = 0; i < 2; i++) pajaro(((t * (11 + i * 6) + i * 140) % 300) + 10, 18 + i * 8, t, H('#f2f2ee'));
  // los reflejos del agua que bailan en la obra viva
  for (let k = 0; k < 18; k++) { const x = Math.round(((k * 47 + t * 9) % 340) - 10), y = 104 + (k * 7) % 20, w = 4 + Math.round((Math.sin(t * 3 + k) + 1) * 3); R.linea(x, y, x + w, y, mez(H('#1c1a20'), H('#8aa8c0'), 0.35)); }
  // el agua que gotea del imbornal
  for (let k = 0; k < 3; k++) { const ph = (t * 1.4 + k * 0.33) % 1; R.pset(73, Math.round(77 + ph * 50), H('#c8e0f0')); }
  // el mar entre el casco y el bote, con la espuma de la flotación
  agua(t, 124, 179, [H('#5e7486'), H('#4a6074'), H('#3a4e62'), H('#2c3e50')]);
  for (let x = 0; x < 320; x++) { const y = 128 + Math.round(Math.sin(x * 0.15 + t * 2) * 1.5); for (let yy = 124; yy <= y + 1; yy++) R.pset(x, yy, yy === y + 1 ? H('#c8d4dc') : H('#2a2830')); }
  // el marinero en la regala, que da la boza (sólo asoma por encima)
  R.recorte([0, 0, 319, 34]); R.actor(EL.marineroMC, 216, 52, t, { dir: -1, habla: t > WAIT && pul(t, 7) }); R.recorte(null);
  // el bote: se aparta un poco en «pull away» con dos paladas
  const ap = suave(lin(t, PULL - 0.1, WAIT - 0.1)), dx = Math.round(ap * 46), bob = Math.round(Math.sin(t * 2.2) * 1.2), by = 150 + bob;
  // la boza: de la proa del bote a la regala
  const prx = 210 + dx, pry = by - 20;
  R.linea(prx, pry, 226, 38, H('#c8a868')); R.linea(prx + 1, pry, 227, 38, H('#8a7048'));
  // la gente del bote (por detrás de la borda): Briggs a popa, que tiende la mano a Sarah; Sophia sentada; un marinero a proa
  const sarah = suave(lin(t, P8 + 0.1, BOAT - 0.1)), enBote = sarah >= 1;
  const syy = enBote ? by - 8 : Math.round(lerp(58, by - 8, sarah) + (Math.floor(sarah * 12) % 2)), sxx = enBote ? 130 + dx : 138;
  R.actor(EL.briggsMC, 108 + dx, by - 8, t, { dir: 1, sostiene: !enBote ? [126 + dx, Math.max(syy - 20, by - 30)] : undefined, habla: t > PULL && t < WAIT && pul(t, 8), sonrisa: enBote && t < PULL });
  R.actor(EL.sophiaMC, 160 + dx, by - 10, t, { dir: -1, sonrisa: enBote });
  const rema = t > PULL - 0.1 && t < WAIT + 0.2, fase = Math.sin((t - PULL) * 7);
  R.actor(EL.marineroMC, 178 + dx, by - 8, t, { dir: -1, sostiene: rema ? [182 + dx + Math.round(fase * 4), by - 18] : [154, Math.max(by - 34, 96)] });
  if (!enBote) R.actor(EL.sarahMC, sxx, syy, t, { dir: 1, quieto: true });
  else R.actor(EL.sarahMC, sxx, syy, t, { dir: 1, sonrisa: t < PULL, habla: t > WAIT && pul(t, 7) });
  // el casco del bote por delante de ellos
  yola(160 + dx, by + 4, 0.86, {});
  // el remo del marinero: entra al agua a cada palada
  if (rema) { const ox = 186 + dx + Math.round(fase * 4); R.linea(ox, by - 18, ox + 22, by + 4, H('#8a6a48')); R.linea(ox + 1, by - 18, ox + 23, by + 4, H('#c8a878')); R.rect(ox + 20, by + 2, ox + 25, by + 6, H('#c8a878')); if (fase > 0.6) for (let k = 0; k < 4; k++) R.pset(ox + 18 + k * 3, by + 6 - k, H('#e8f0f4')); }
  // el mar por delante, que tapa la obra viva del bote y la parte de abajo del casco
  agua(t, by + 5, 179, [H('#4a6074'), H('#3a4e62'), H('#2c3e50'), H('#22323f')]);
  for (let x = 0; x < 320; x++) { const y = by + 5 + Math.round(Math.sin(x * 0.2 - t * 2.5) * 1); R.pset(x, y, H('#d8e2e8')); }
  for (let k = 0; k < 8; k++) { const x = ((k * 43 + t * 14) % 340) - 10, y = 136 + (k % 4) * 3; if (Math.abs(x - 160 - dx) < 60 && y < by + 4) continue; R.linea(Math.round(x), y, Math.round(x) + 4, y, H('#8aa0b0')); }
};
'''
CUERPO += r'''
// ── 9 · GOLPE: mar abierto; el barco sigue navegando con el bote a remolque ─────────────────────────────────────
const p9 = (t) => {
  const racha = suave(lin(t, P9, P9 + 0.8));
  const o = { encuadre: 'bote', luz: 'gris', aleja: 0.05 + 0.22 * suave(lin(t, P9 + 0.2, P10)), cabo: 0.2 + 0.25 * lin(t, P9, P10) };
  const g = T.mar(R, t, o);
  // la racha que entra en el corte: rayas de viento y espuma que corren hacia el barco
  for (let k = 0; k < 14; k++) { const v = 120 + (k % 4) * 30, x = Math.round(((k * 53 + (t - P9) * v) % 380) - 40), y = 60 + (k * 23) % 90; if (y < 98 && x > 270) continue;
    const l = 8 + (k % 3) * 5, a = 1 - racha * 0.6; if ((k % 3) || t < P9 + 2.5) R.linea(x, y, x + l, y, mez(H('#f2f4f6'), H('#9aa6b2'), a * 0.5)); }
  // la espuma a proa del barco, que corta el agua
  const [bx, byy] = g.barco ?? [232, 122]; for (let k = 0; k < 6; k++) { const x = Math.round(bx + 24 - k * 3 + Math.sin(t * 6 + k) * 1), y = Math.round(byy + 4 + (k % 2)); R.pset(x, y, H('#f2f6f8')); }
  // en «tied» brilla el cabo, en el punto donde se va a partir
  if (t > TIED - 0.1 && t < TIED + 1.0) { const [rx, ry] = g.rotura ?? [145, 120]; brilloS(rx, ry - 2, t); }
  // dos gaviotas que siguen al barco
  for (let i = 0; i < 2; i++) pajaro(lerp(150, 290, ((t - P9) * 0.05 + i * 0.3) % 1), 70 + i * 8 + Math.sin(t * 2 + i) * 3, t, H('#f2f2ee'));
  T.marDelante(R, t, o);
};
// ── 10 · el cabo de cerca: se deshilacha y se parte en «snapped» ─────────────────────────────────────────────────
const p10 = (t) => {
  const c = t < SNAP ? 0.15 + 0.35 * lin(t, P10, SNAP) : 0.5 + 0.5 * suave(lin(t, SNAP, SNAP + 2.6));
  const o = { encuadre: 'bote', camara: 'cabo', cabo: c };
  T.mar(R, t, o);
  // al fondo, en el horizonte, el barco que se va con el viento (pequeño, más velado a cada segundo)
  if (t > SNAP + 0.5) { const u = lin(t, SNAP + 0.5, P11), x = lerp(232, 262, u), ve = 0.25 + 0.5 * u;
    bergantin(x, 44, 0.16 * (1 - 0.35 * u), { t, velas: 1, dir: 1 });
    for (let y = 18; y <= 46; y++) for (let xx = Math.round(x - 16); xx <= Math.round(x + 18); xx++) { if (tranquila(xx, y) || bay(xx, y) > ve) continue; const px = R.pget(xx, y); R.pset(xx, y, mez(px, H('#b8c2ca'), 0.5)); } }
  // la roda del bote en la esquina de abajo a la izquierda, de donde sale el cabo
  { const sw = Math.round(Math.sin(t * 2) * 1.5); R.poligono([[0, 140 + sw], [22, 150 + sw], [34, 179], [0, 179]], K); R.poligono([[0, 142 + sw], [20, 151 + sw], [31, 179], [0, 179]], H('#d8dcd6'));
    for (const y of [156, 164, 172]) R.linea(0, y + sw, Math.round(24 + (y - 150) * 0.3), y + sw, H('#9aa29c')); R.linea(0, 141 + sw, 21, 150 + sw, H('#a87a4a'));
    R.disco(14, 158 + sw, 3, K); R.disco(14, 158 + sw, 2, H('#7a7a84')); }
  // una gaviota que pasa, y espuma que corre
  pajaro(lerp(-10, 330, (t - P10) / 5.4), 30 + Math.sin(t * 2) * 3, t, H('#f2f2ee'));
};
// ── 11 · el bote por detrás, a ras de agua; el barco se pierde; la niebla se cierra ─────────────────────────────
const NIEB = H('#c4ccd2');
const boteDetras = (x, y, s, t, rema) => {   // la popa del bote vista desde atrás, con diez espaldas pequeñas y los remos
  const P = (u, v) => [Math.round(x + u * s), Math.round(y + v * s)];
  const pol = (pts, c) => R.poligono(pts.map(([u, v]) => P(u, v)), c);
  // los remos a cada lado, que bogan
  const f = Math.sin(t * 3.2), up = f > 0;
  for (const sd of [-1, 1]) for (const k of [0, 1]) { const [a, b] = P(sd * 30, -14 + k * 6), [d, e] = P(sd * (58 + k * 4), (up ? -2 : 10) + k * 4); R.linea(a, b, d, e, H('#5a4028')); R.linea(a, b + 1, d, e + 1, H('#a87a4a'));
    if (!up) { const [g1, g2] = P(sd * (60 + k * 4), 12 + k * 4); R.linea(g1 - 3, g2, g1 + 3, g2, H('#e8f0f4')); } }
  // las diez espaldas, en tres filas (gorras, moños, sombreros; sin caras)
  const pelo = [H('#2a1c14'), H('#4a2a14'), H('#1a1a1a'), H('#6a4a2a'), H('#3a2a1c')], ropa = [H('#2a3048'), H('#4a3a2a'), H('#3a4a5a'), H('#5a2a2a'), H('#2a3a2a')];
  const filas = [[-22, -28, 3], [-14, -22, 4], [-6, -16, 3]];
  let n = 0; for (const [, vy, cuantos] of filas) for (let i = 0; i < cuantos; i++) { const u = (i - (cuantos - 1) / 2) * (cuantos === 4 ? 12 : 15), [a, b] = P(u, vy), r = Math.max(1, Math.round(4 * s)), sw = Math.round(Math.sin(t * 3.2 + n) * 0.6);
    R.rect(a - r - 1, b + r - 1, a + r + 1, b + r * 3, K); R.rect(a - r, b + r, a + r, b + r * 3, ropa[n % 5]); R.disco(a + sw, b, r, K); R.disco(a + sw, b, r - (r > 2 ? 1 : 0), pelo[n % 5]); if (n === 4) R.disco(a + sw, b + 1, Math.max(1, r - 2), H('#c8a040')); n++; }
  // la popa (espejo) y la borda
  pol([[-34, -12], [34, -12], [30, 4], [16, 14], [-16, 14], [-30, 4]], K);
  pol([[-33, -11], [33, -11], [29, 3], [15, 13], [-15, 13], [-29, 3]], H('#d8dcd6'));
  for (const v of [-6, 0, 6]) { const [a, b] = P(-31, v), [d, e] = P(31, v); R.linea(a, b, d, e, H('#9aa29c')); }
  { const [a, b] = P(-34, -12), [d, e] = P(34, -12); R.linea(a, b, d, e, H('#a87a4a')); R.linea(a, b + 1, d, e + 1, H('#7a5a3a')); }
  pol([[-2, -10], [2, -10], [3, 18], [-3, 18]], H('#7a5a3a'));   // el timón
};
const p11 = (t) => {
  // el cielo de niebla, el horizonte, el barco que se aleja y se pierde
  cieloT(0, 92, [H('#a8b2bc'), H('#b6bec6'), H('#c4cad0'), H('#ccd2d6')]);
  nubesF(t, [[60, 56, 46, 0], [170, 48, 40, 1], [240, 66, 40, 2]], [H('#e2e6ea'), H('#d0d6dc'), H('#b8c0c8')], 88);
  const u = lin(t, P11, NEVER + 0.8), bx = lerp(214, 252, u), sc = 0.2 - 0.1 * u;
  if (u < 1) bergantin(bx, 92, sc, { t, velas: 1 });
  { const ve = 0.25 + 0.75 * u; for (let y = 60; y <= 94; y++) for (let x = Math.round(bx - 14); x <= Math.round(bx + 16); x++) { if (tranquila(x, y) || bay(x, y) > ve) continue; R.pset(x, y, mez(R.pget(x, y), NIEB, 0.6)); } }
  agua(t, 93, 179, [H('#9aa8b4'), H('#7a8c9a'), H('#5e7282'), H('#4a5e6e'), H('#3a4e5e')], 0, 319, 0.6);
  // jirones de niebla que pasan sobre el agua
  for (let k = 0; k < 5; k++) { const x0 = ((k * 97 + t * (6 + k * 2)) % 420) - 80, y0 = 98 + k * 9; for (let y = y0; y < y0 + 5; y++) for (let x = Math.round(x0); x < x0 + 90; x++) { if (x < 0 || x > 319 || bay(x, y) > 0.3) continue; R.pset(x, y, NIEB); } }
  // el bote que boga hacia el barco y se va haciendo pequeño; en «never found» la niebla lo cubre
  const v = suave(lin(t, P11, NEVER + 0.6)), x = 150 + v * 14, y = lerp(150, 116, v), s = lerp(1.25, 0.55, v);
  const tapa = suave(lin(t, NEVER - 0.3, NEVER + 1.6));
  if (tapa < 1) { boteDetras(x, y, s, t, true);
    // la estela del bote
    for (let k = 0; k < 6; k++) { const yy = Math.round(y + 18 * s + k * 4), w = Math.round((10 + k * 6) * s); R.linea(Math.round(x - w), yy, Math.round(x - w + 4), yy, H('#dce4ea')); R.linea(Math.round(x + w - 4), yy, Math.round(x + w), yy, H('#dce4ea')); } }
  const niebla = tapa * (1 - 0.65 * suave(lin(t, NEVER + 1.7, FIN - 0.6)));
  if (niebla > 0) { const y0 = Math.round(y - 40), y1 = Math.round(y + 26); for (let yy = y0; yy <= y1; yy++) { const dv = 1 - Math.abs((yy - (y0 + y1) / 2) / ((y1 - y0) / 2)); for (let xx = 0; xx < 320; xx++) { if (bay(xx, yy) > niebla * (0.4 + dv * 0.9) - Math.sin(xx * 0.05 + yy * 0.2 + t) * 0.08) continue; R.pset(xx, yy, mez(R.pget(xx, yy), NIEB, Math.min(1, 0.4 + niebla * 0.6))); } } }
  // la ola de primer plano con su encaje de espuma
  for (let x = 0; x < 320; x++) { const yy = Math.round(166 + Math.sin(x * 0.03 + t * 0.9) * 4 + Math.sin(x * 0.11 - t * 1.4) * 1.5); for (let y = yy; y < 180; y++) R.pset(x, y, y === yy ? H('#e8eef2') : y === yy + 1 ? H('#a8b8c4') : tono([H('#4a5e6e'), H('#3a4e5e'), H('#2c3e4c')], (y - yy) / 14, x, y)); }
  // una gaviota que cruza y se posa en el agua al final
  { const g = lin(t, NEVER + 0.4, FIN - 0.4), gx = lerp(330, 110, g), gy = lerp(70, 140, suave(g)); if (g > 0 && g < 1) pajaro(gx, gy, t, H('#f2f2ee'));
    if (g >= 1) { const sw = Math.round(Math.sin(t * 2) * 1); R.rect(106, 137 + sw, 114, 141 + sw, K); R.rect(107, 138 + sw, 113, 140 + sw, H('#f2f2ee')); R.rect(112, 134 + sw, 115, 138 + sw, K); R.rect(113, 135 + sw, 114, 137 + sw, H('#ffffff')); R.pset(116, 136 + sw, H('#e8a020')); R.linea(104, 142 + sw, 118, 142 + sw, H('#d8e2e8')); } }
};
const efectos = [
  [0.5, 'burbujas'], [2.4, 'burbujas'], [4.3, 'chof'],
  [DECK - 0.2, 'whoosh'], [PUMP + 0.1, 'golpecito'], [APART, 'golpecito'], [HATCH, 'pop'],
  [P3 + 0.1, 'papel'], [LASHED, 'papel'], [FALL - 0.2, 'ola'], [LAUNCH, 'whoosh'], [SPLASH, 'chof'],
  [SEXT, 'cerrojo'], [CRONO, 'tic'], [WHERE, 'lapiz'], [SEA + 1.2, 'toc'],
  [P5 + 0.6, 'maquina'], [WATER, 'burbujas'],
  [SINKING - 0.2, 'pop'], [TERRIBLE, 'aviso'], [TERRIBLE + 0.3, 'miau'], [HAPPEN + 0.1, 'pop'],
  [ORDERED, 'silbato'], [SANTA, 'brillo'],
  [BOAT - 0.1, 'toc'], [PULL, 'ola'],
  [P9, 'boom'], [P9 + 0.3, 'viento'], [TIED, 'brillo'],
  [SNAP, 'palmada'], [SNAP + 0.6, 'chof'],
  [P11 + 0.3, 'ola'], [NEVER, 'viento'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9, 'corte'], [P10, p10], [P11, p11]], { efectos, año: 1872 });
'''

E['mc-pistas'] = ('Las pistas', CABECERA, PRE + CUERPO)
