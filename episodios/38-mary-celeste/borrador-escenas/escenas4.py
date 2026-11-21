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
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
const GUANTE = '#5a8ad0';
const pul = (t, f, k = 0) => Math.sin(t * f + k) > 0;
// (de escenas3: cielo tramado, nubes, pájaros, madera, agua, el bergantín y los barriles)
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
    for (let x = x0; x <= x1; x++) {
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

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['mc-abordo'] = ('A bordo', r'''// MC-ABORDO (frases 11–12), 1872, sin cartela. Seis planos (el reparto pedía siete, pero en los primeros 8,6 s de voz no
// caben cuatro fondos de 4 s: la cocina va dentro del corte del plano 2):
// 1. «Everything else was still there. The sailor's clothes dry in their chests» (corta antes de «Food»). FONDO LOCAL: el
//    castillo de proa visto hacia la proa (literas, escala y haz de luz, ropa tendida, farol que se mece, chubasquero).
//    Deveau baja por la escala y va a su baúl; en «clothes» saca una camisa y en «dry» la sacude: seca; Wright revuelve
//    su baúl y en «chests» levanta un jersey de rayas doblado.
// 2. «Food and water for six months. The barrels, almost all of them untouched» (corta en «And»). FONDO LOCAL: el barco
//    en corte: arriba la cocina fría y la despensa; abajo la bodega con tres andanas de barriles de cara. En «Food» Wright
//    da una palmada a los jamones (se mecen); en «water» golpea el tonel del agua; en «six months» se encienden seis lunas
//    llenas y un 6. Deveau camina con el farol por encima de los barriles; en «almost» se para ante uno que rezuma («?»);
//    en «untouched» levanta el farol: todos enteros.
// 3. «And the logbook, with a final entry dated November 25, nine days earlier» (corta en «off»). El diario (canon) de
//    cerca: la regla de Deveau recorre la fila del 24, sube al 25 (círculo de lápiz en «25») y en «nine days» señala la isla
//    dibujada al margen con dos golpecitos.
// 4. «off the island of Santa Maria in the Azores» y el silencio (corta en «In those»). FONDO LOCAL: Santa María al
//    amanecer del 25 (acantilados, bancales con muros, Vila do Porto y su iglesia, el molino); el bergantín pasa por
//    delante y se aleja al este; la campana tañe en «Santa»; sale el sol en «Azores»; una barca sale del puerto; una ballena
//    sopla en el silencio.
// 5. «In those nine days, the ship had sailed on by herself for some 400 nautical miles» (corta en «No one»). La carta:
//    o.deriva, el barquito deriva solo con los días 1–9; en «400» la cota roja con el 400.
// 6. «No one was steering her. And no one knew what had happened to the 10 people on board». El timón al sol: en
//    «steering» un golpe de mar y la rueda da vuelta y media sola; en «no one knew» un «?»; en «10» el 10 y la campana de
//    la caseta tañe sola.''', PRE + r'''
const ro = (k) => en('ropa', k), nu = (k) => en('nueve', k);
const P2 = ro(0.2435), P3 = ro(0.4994), P4 = ro(0.7891), P5 = nu(-0.0047), P6 = nu(0.5632);
const STILL = ro(0.0481), CLOTHES = ro(0.1424), DRY = ro(0.1572), CHESTS = ro(0.1942);
const FOOD = ro(0.2466), WATER = ro(0.2651), SIX = ro(0.291), BARRELS = ro(0.36), ALMOST = ro(0.3909), UNTOUCHED = ro(0.4426);
const LOGBOOK = ro(0.5141), FINAL = ro(0.5783), NOV = ro(0.6362), N25 = ro(0.6547), N25F = ro(0.6991), NINE = ro(0.7312), EARLIER = ro(0.7644);
const ISLAND = ro(0.8458), SANTA = ro(0.8779), AZORES = ro(0.958);
const N400 = nu(0.3384), MILES = nu(0.4641), STEER = nu(0.609), KNEW = nu(0.7613), DIEZ = nu(0.8785);
const K = C.k, BL = H('#f6f2ea');

// ── 1 · EL CASTILLO DE PROA (fondo local): el alojamiento de los marineros visto hacia la proa ────────────────────────
// el mamparo de proa al fondo (x 116–204, y 46–126) con el pie del bauprés; los dos costados se cierran hacia él con
// las literas de dos pisos y sus mantas; el techo de baos y tablas; la escotilla con su escala (x 180–210) y su haz de
// luz; el suelo de tablas que se alejan; los baúles de los marineros, la ropa tendida, el farol y los chubasqueros
const VPX = 160, VPY = 88;
const C1 = { techo: [H('#4a3420'), H('#36261a'), H('#24180e')], viga: [H('#6a4a2c'), H('#4a3220'), H('#2e1e10')],
  pared: [H('#9a6c40'), H('#7e5632'), H('#603e22'), H('#3e2614')], mamparo: [H('#b08050'), H('#8e623a'), H('#6a4628'), H('#46301a')],
  suelo: [H('#b48a56'), H('#987044'), H('#7a5634'), H('#523820')] };
const MANTAS = [[H('#8a2a24'), H('#b0443a'), H('#e0d8c0')], [H('#3a4a6a'), H('#5a6e94'), H('#c8c0a0')], [H('#5a5a4a'), H('#7a7a64'), H('#c8b890')],
  [H('#6a3a5a'), H('#8a5a7a'), H('#e8d8c0')], [H('#2a5a4a'), H('#4a7a64'), H('#d8d0b0')], [H('#7a5a2a'), H('#a07a3a'), H('#f0e0b0')]];
const baul = (x0, y0, w, h, cs, abierto, capas) => {
  if (abierto) {   // la tapa abierta hacia atrás, con su forro y un barquito pintado dentro (sin letras)
    R.poligono([[x0 + 1, y0 - 3], [x0 + w - 1, y0 - 3], [x0 + w - 3, y0 - 19], [x0 + 3, y0 - 19]], K);
    R.poligono([[x0 + 2, y0 - 4], [x0 + w - 2, y0 - 4], [x0 + w - 4, y0 - 18], [x0 + 4, y0 - 18]], H('#d8c8a0'));
    const cx = x0 + (w >> 1); R.linea(cx - 6, y0 - 8, cx + 6, y0 - 8, H('#2a2a3a')); R.linea(cx - 5, y0 - 7, cx + 5, y0 - 7, H('#2a2a3a'));
    R.linea(cx, y0 - 16, cx, y0 - 9, H('#3a2a1a')); R.poligono([[cx + 1, y0 - 15], [cx + 5, y0 - 10], [cx + 1, y0 - 10]], BL); R.poligono([[cx - 1, y0 - 14], [cx - 5, y0 - 10], [cx - 1, y0 - 10]], H('#e8e0c8'));
    for (let x = x0 + 4; x < x0 + w - 3; x += 2) R.pset(x, y0 - 6, H('#4a7aa0'));
  }
  // la boca: dentro, la ropa doblada en capas
  R.rect(x0, y0 - 4, x0 + w, y0, K); R.rect(x0 + 1, y0 - 3, x0 + w - 1, y0 - 1, H('#2a1a10'));
  if (capas) capas.forEach((c, i) => { const y = y0 - 3 + i; R.rect(x0 + 3 + i, y, x0 + w - 3 - i, y, c); R.pset(x0 + 3 + i, y, mez(c, K, 0.4)); });
  // el frente: tablas, cantoneras de hierro, la cerradura de latón y las asas de cabo trenzado
  R.rect(x0, y0, x0 + w, y0 + h, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + h - 1, cs[1]);
  for (let y = y0 + 1; y < y0 + h; y++) for (let x = x0 + 1; x < x0 + w; x++) { const g = Math.sin(x * 0.5 + y * 0.2 + Math.sin(x * 0.11) * 2); if (g > 0.85) R.pset(x, y, cs[0]); else if (g < -0.88) R.pset(x, y, cs[2]); }
  R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, cs[0]); R.linea(x0 + 1, y0 + (h >> 1), x0 + w - 1, y0 + (h >> 1), cs[2]);
  for (const x of [x0 + 1, x0 + w - 3]) { R.rect(x, y0 + 1, x + 2, y0 + 3, H('#3a3a40')); R.rect(x, y0 + h - 3, x + 2, y0 + h - 1, H('#3a3a40')); }
  const cx = x0 + (w >> 1); R.rect(cx - 2, y0 + 2, cx + 2, y0 + 6, H('#8a6a20')); R.rect(cx - 1, y0 + 3, cx + 1, y0 + 4, H('#e8c860')); R.pset(cx, y0 + 5, K);
  for (const [x, d] of [[x0 - 1, -1], [x0 + w + 1, 1]]) { R.linea(x, y0 + 3, x + d * 2, y0 + 5, H('#d8c08a')); R.linea(x + d * 2, y0 + 5, x, y0 + 8, H('#d8c08a')); R.pset(x + d, y0 + 4, H('#a08050')); }
  R.rect(x0 + 2, y0 + h + 1, x0 + w + 2, y0 + h + 1, H('#3a2414'));
};
const castillo = () => {
  const BE = [[0, 4], [11, 3], [20, 3], [27, 2], [33, 2], [38, 1], [42, 1], [45, 1]];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const izq = x < 116, der = x > 204, u = izq ? x / 116 : der ? (319 - x) / 115 : 1;
    const top = 8 + 38 * u, bot = 176 - 50 * u; let c;
    if (y < top) {   // el techo: los baos y las tablas de la cubierta, que se alejan
      let viga = -1; for (const [yb, gb] of BE) if (y >= yb && y < yb + gb) viga = yb;
      const k = (x - VPX) / (VPY - y) * 5, fr = k - Math.floor(k);
      if (viga >= 0) c = y === viga ? C1.viga[0] : C1.viga[1 + (hs(x >> 3, viga) > 0.7 ? 1 : 0)];
      else c = fr < 0.07 ? C1.techo[2] : tono(C1.techo, 0.35 + 0.35 * (y / 46) + (hs(Math.floor(k), 3) - 0.5) * 0.4, x, y);
      if (tranquila(x, y)) c = viga >= 0 ? C1.viga[2] : C1.techo[1];
    } else if (y <= bot && (izq || der)) {   // los costados con las literas
      const v = (y - top) / (bot - top), enU = u > 0.06 && u < 0.92;
      const costilla = [0.06, 0.32, 0.6, 0.92].some((q) => Math.abs(u - q) < 0.008 + 0.014 * (1 - u));
      const v0 = v < 0.5 ? 0.22 : 0.55, lit = enU && v > v0 && v < v0 + 0.22;
      if (costilla && v > 0.12) c = (u * 116 | 0) % 2 ? C1.viga[1] : C1.viga[0];
      else if (lit) { const w = (v - v0) / 0.22, n = Math.floor((u - 0.06) / 0.29) + (v0 > 0.5 ? 3 : 0) + (der ? 2 : 0);
        if (w > 0.84) c = w > 0.93 ? C1.mamparo[3] : C1.mamparo[0];
        else if (w > 0.52) { const M = MANTAS[n % MANTAS.length], ar = Math.sin(u * 70 + n * 2) * 0.1 + Math.sin(u * 23 + n) * 0.08; c = w + ar > 0.66 ? M[1] : M[0]; if (w + ar > 0.6 && w + ar < 0.64) c = M[2]; if (hs(x, y, n) > 0.94) c = M[2]; }
        else c = tono([H('#3a2414'), H('#2a180c'), H('#1c0e06')], 0.2 + w * 0.7, x, y);
      } else { const tab = Math.floor(v / 0.07), vv = v / 0.07 - tab, g = Math.sin(u * 40 + tab * 2.1 + Math.sin(u * 13 + tab) * 2);
        c = vv < 0.14 ? C1.pared[3] : g > 0.8 ? C1.pared[0] : g < -0.8 ? C1.pared[2] : C1.pared[1];
        if (tranquila(x, y)) c = vv < 0.14 ? C1.pared[3] : C1.pared[2]; }
      if (u < 0.16) c = mez(c, H('#140a04'), (0.16 - u) * 2.6);
    } else if (y <= 126 && !izq && !der) {   // el mamparo de proa: tablas verticales
      const col = Math.floor((x - 116) / 9), xx = (x - 116) % 9, g = Math.sin(y * 0.15 + col * 2.3 + Math.sin(y * 0.05 + col) * 2);
      c = xx === 0 ? C1.mamparo[3] : g > 0.85 ? C1.mamparo[0] : g < -0.85 ? C1.mamparo[2] : C1.mamparo[1];
      if (hs(x, y, 5) > 0.975) c = C1.mamparo[2];
      if (y > 118) c = mez(c, K, 0.25);
    } else {   // el suelo: tablas que se alejan hacia el punto de fuga
      const k = (x - VPX) / (y - VPY) * 6, fr = k - Math.floor(k), z = (y - 126) / 54, g = Math.sin(y * 0.4 + Math.floor(k) * 3.1);
      c = fr < 0.08 ? C1.suelo[3] : g > 0.85 ? C1.suelo[0] : C1.suelo[1 + (hs(Math.floor(k), Math.floor(y / 9)) > 0.7 ? 1 : 0)];
      if (Math.floor(y * 0.7 + Math.floor(k) * 5) % 23 === 0 && fr > 0.1) c = C1.suelo[3];
      c = mez(c, H('#1a0e06'), Math.min(0.5, Math.abs(x - 160) / 420 + (1 - z) * 0.2));
    }
    R.pset(x, y, c);
  }
  // las esquinas donde el costado toca el mamparo
  R.linea(116, 46, 116, 126, C1.viga[2]); R.linea(204, 46, 204, 126, C1.viga[2]); R.linea(116, 46, 204, 46, C1.viga[2]);
  // el pie del bauprés y la bita, con sus zunchos de hierro
  R.rect(151, 46, 169, 126, K); R.rect(152, 47, 168, 125, H('#6a4428'));
  for (let y = 47; y < 126; y++) { R.pset(153, y, H('#8a5e38')); R.pset(154, y, H('#a07040')); R.pset(166, y, H('#4a2e18')); R.pset(167, y, H('#3a2212')); if (hs(y, 7) > 0.8) R.pset(160, y, H('#5a3820')); }
  for (const y of [58, 96]) { R.rect(151, y, 169, y + 3, H('#2a2a30')); R.rect(152, y, 168, y, H('#6a6a74')); R.pset(156, y + 2, H('#8a8a94')); R.pset(164, y + 2, H('#8a8a94')); }
  // la repisa del mamparo: jarros de lata, una botella, la pipa y la lata de tabaco; el sueste en su clavija
  R.rect(118, 74, 148, 76, K); R.rect(118, 74, 148, 74, H('#c89a60')); R.rect(120, 77, 121, 80, K); R.rect(145, 77, 146, 80, K);
  for (const x of [121, 129]) { R.rect(x, 66, x + 5, 73, K); R.rect(x + 1, 67, x + 4, 72, H('#9aa0a8')); R.pset(x + 1, 67, H('#d8dce0')); R.rect(x + 6, 68, x + 7, 71, K); }
  R.rect(137, 62, 140, 73, K); R.rect(138, 63, 139, 72, H('#2a6a3a')); R.pset(138, 64, H('#7ac08a')); R.rect(138, 60, 139, 62, H('#8a6a4a'));
  R.rect(142, 70, 147, 73, K); R.rect(143, 71, 146, 72, H('#b83a2a')); R.linea(118, 60, 124, 63, H('#d8d0c0'));
  R.rect(125, 84, 126, 86, K); R.disco(126, 92, 6, K); R.disco(126, 92, 5, H('#e0b020')); R.rect(119, 92, 133, 94, K); R.rect(120, 92, 132, 93, H('#c89818')); R.pset(124, 89, H('#f4dc70'));
  // detrás de la escala: la bolsa de red de un marinero y un acordeón en su gancho
  R.linea(194, 50, 194, 54, K); R.disco(194, 60, 5, K); R.disco(194, 60, 4, H('#c8b890')); for (let k = -3; k <= 3; k += 2) { R.linea(190, 60 + k, 198, 60 + k, H('#8a7a5a')); R.linea(194 + k, 56, 194 + k, 64, H('#8a7a5a')); }
  R.rect(172, 82, 186, 92, K); R.rect(173, 83, 185, 91, H('#7a2a24')); for (let x = 175; x < 184; x += 2) R.linea(x, 83, x, 91, H('#e8d8b0')); R.rect(173, 83, 174, 91, H('#2a2a30')); R.rect(184, 83, 185, 91, H('#2a2a30'));
  // en las literas: un acordeón, unas botas colgadas del puntal y una camisa puesta a secar
  R.rect(40, 76, 52, 82, K); R.rect(41, 77, 51, 81, H('#3a2a4a')); for (let x = 43; x < 51; x += 2) R.linea(x, 77, x, 81, H('#c8b8d8'));
  for (const [x, y] of [[262, 92], [268, 94]]) { R.rect(x, y, x + 4, y + 12, K); R.rect(x + 1, y + 1, x + 3, y + 11, H('#2a2420')); R.rect(x - 1, y + 10, x + 5, y + 13, K); R.rect(x, y + 11, x + 4, y + 12, H('#3a322c')); R.pset(x + 1, y + 2, H('#5a4e44')); }
  // la escotilla abierta: el cielo gris por el hueco, la brazola y la luz que baja en un haz
  R.rect(178, 18, 212, 36, K); R.rect(180, 20, 210, 34, H('#c8d2dc'));
  for (let y = 20; y <= 34; y++) for (let x = 180; x <= 210; x++) if (bay(x, y) < (y - 20) / 30) R.pset(x, y, H('#a8b4c0'));
  R.linea(186, 24, 198, 24, BL); R.linea(184, 25, 202, 25, H('#e8eef2')); R.rect(178, 34, 212, 36, H('#4a3220')); R.linea(178, 34, 212, 34, H('#8a6440'));
  for (let y = 37; y <= 156; y++) { const f = (y - 37) / 119, xa = lerp(180, 162, f), xb = lerp(210, 236, f);
    for (let x = Math.ceil(xa); x <= xb; x++) { const e = Math.min(x - xa, xb - x); R.pset(x, y, mez(R.pget(x, y), H('#f4e8c8'), e < 3 ? 0.08 : 0.17)); } }
  // la escala de la escotilla
  for (const [xa, xb] of [[185, 180], [205, 210]]) { R.linea(xa, 30, xb, 152, K); R.linea(xa + 1, 30, xb + 1, 152, H('#8a6a44')); R.linea(xa + 2, 30, xb + 2, 152, K); }
  for (let y = 40; y < 152; y += 9) { const f = (y - 30) / 122, a = Math.round(lerp(187, 182, f)), b = Math.round(lerp(204, 209, f)); R.linea(a, y, b, y, K); R.linea(a, y + 1, b, y + 1, H('#b08a5a')); R.linea(a, y + 2, b, y + 2, H('#5a3e22')); }
  // en el suelo: una aduja de cabo y un balde
  for (let r = 9; r >= 2; r -= 2) { R.anillo(52.5, 166.5, r, K); R.anillo(52.5, 166.5, r - 1, H('#c8a868')); }
  R.rect(302, 150, 314, 164, K); R.rect(303, 151, 313, 163, H('#7a8088')); R.rect(303, 151, 313, 152, H('#b8bec4')); R.linea(303, 156, 313, 156, H('#4a4e54')); R.linea(302, 149, 314, 149, H('#5a5e64'));
};
const p1 = (t) => {
  capa('castillo', castillo);
  // la cuerda de tender, con ropa seca que se mece con el balanceo
  const bal = Math.sin(t * 1.3) * 0.22;
  R.linea(62, 40, 150, 36, H('#d8c8a0')); R.linea(170, 36, 262, 40, H('#d8c8a0'));
  for (const [x, y, c, w, hh] of [[78, 39, H('#e8e4d8'), 9, 11], [104, 38, H('#3a4a7a'), 5, 9], [124, 37, H('#b03a2a'), 7, 7], [222, 38, H('#d8d0b8'), 6, 10], [242, 39, H('#4a5a3a'), 8, 8]]) {
    const dx = Math.round(Math.sin(bal + x) * 2);
    R.poligono([[x - (w >> 1), y], [x + (w >> 1), y], [x + (w >> 1) + dx, y + hh], [x - (w >> 1) + dx, y + hh]], K);
    R.poligono([[x - (w >> 1) + 1, y + 1], [x + (w >> 1) - 1, y + 1], [x + (w >> 1) - 1 + dx, y + hh - 1], [x - (w >> 1) + 1 + dx, y + hh - 1]], c);
    R.linea(x - (w >> 1) + 1, y + 2, x + (w >> 1) - 1, y + 2, mez(c, BL, 0.3)); R.pset(x - 2, y, H('#c8a868')); R.pset(x + 2, y, H('#c8a868')); }
  // el chubasquero amarillo colgado del pie del bauprés, que se balancea
  { const px = 147, py = 64, a = bal * 0.6, P = (u, v) => [Math.round(px + u * Math.cos(a) - v * Math.sin(a)), Math.round(py + u * Math.sin(a) + v * Math.cos(a))];
    R.poligono([P(-5, 0), P(3, 0), P(6, 30), P(-9, 30)], K); R.poligono([P(-4, 1), P(2, 1), P(5, 29), P(-8, 29)], H('#e0b020'));
    R.linea(...P(-1, 2), ...P(-2, 28), H('#a07810')); R.linea(...P(-6, 10), ...P(-7, 26), H('#f4d860')); R.pset(...P(0, 0), K); }
  // el farol colgado del bao, que se balancea, y su luz
  { const a = Math.sin(t * 1.3 + 0.4) * 0.28, lx = Math.round(132 + Math.sin(a) * 14), ly = Math.round(27 + Math.cos(a) * 14), fl = 0.85 + Math.sin(t * 13) * 0.1;
    for (let y = ly - 22; y <= ly + 26; y++) for (let x = lx - 26; x <= lx + 26; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.1); if (d < 26 && !tranquila(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#ffd890'), (1 - d / 26) * 0.32 * fl)); }
    R.linea(132, 27, lx, ly - 6, H('#2a2a30'));
    R.rect(lx - 4, ly - 6, lx + 4, ly + 6, K); R.rect(lx - 3, ly - 4, lx + 3, ly + 4, H('#f8d070')); R.rect(lx - 1, ly - 2, lx + 1, ly + 2, H('#fff4c0'));
    R.rect(lx - 4, ly - 6, lx + 4, ly - 5, H('#5a5a64')); R.rect(lx - 4, ly + 5, lx + 4, ly + 6, H('#5a5a64')); R.linea(lx, ly - 4, lx, ly + 4, H('#8a7a3a')); }
  // las motas de polvo en el haz de la escotilla
  for (let k = 0; k < 14; k++) { const f = ((t * 0.05 + hs(k, 1)) % 1), y = Math.round(40 + f * 110), x = Math.round(lerp(190, 200, hs(k, 2)) + Math.sin(t * 0.8 + k) * 8 + f * 12); R.pset(x, y, pul(t, 3, k) ? H('#fff8e0') : H('#e8d8b0')); }
  // la botella que rueda por el suelo con el balanceo
  { const bx = Math.round(84 + Math.sin(t * 1.3) * 12), by = 171; R.rect(bx - 5, by - 2, bx + 4, by + 2, K); R.rect(bx - 4, by - 1, bx + 3, by + 1, H('#2a5a3a')); R.rect(bx + 4, by - 1, bx + 6, by + 1, K); R.pset(bx - 2, by - 1, H('#8ad0a0')); R.pset(bx + 5, by, H('#a07a50')); }
  // los baúles: el de Deveau (izquierda), el de Wright (derecha) y uno cerrado
  const saca = t >= CLOTHES;
  baul(92, 150, 32, 14, [H('#7a9ab0'), H('#4a6a84'), H('#2a4258')], true, saca ? [H('#3a4a7a'), H('#b03a2a'), H('#e8e4d8')] : [H('#f2eee4'), H('#3a4a7a'), H('#b03a2a')]);
  baul(212, 154, 34, 14, [H('#b08a5a'), H('#8a6440'), H('#5a3e24')], true, t >= CHESTS - 0.3 ? [H('#d8d0b8'), H('#4a5a3a'), H('#e8e4d8')] : [H('#3a5a9a'), H('#d8d0b8'), H('#4a5a3a')]);
  baul(270, 164, 28, 12, [H('#9a4a3a'), H('#7a3022'), H('#4e1c14')], false, null);
  // Deveau baja por la escala, va a su baúl y saca una camisa: seca; la sacude
  const baja = suave(lin(t, 0.05, 1.05)), anda = suave(lin(t, 1.15, 2.35));
  const dx = Math.round(lerp(187, 126, anda)), ds = Math.round(t < 1.1 ? lerp(62, 152, baja) : lerp(152, 160, anda));
  const sube = suave(lin(t, CLOTHES, CLOTHES + 0.35)), sac = t > DRY && t < DRY + 0.7 ? (Math.floor(t * 14) % 2 ? 1 : -1) : 0;
  const objD = t < 2.45 ? null : [dx - 4 + sac, Math.round(lerp(154, 132, sube))];
  const A = R.actor(EL.deveauMC, dx, ds, t, { dir: t < 1.1 ? 1 : -1, anda: (baja > 0 && baja < 1) || (anda > 0 && anda < 1), sostiene: objD ?? false,
    sorpresa: t > DRY && t < DRY + 0.45, sonrisa: t > DRY + 0.45, habla: t > STILL && t < STILL + 0.5 && pul(t, 16) });
  if (objD && sube > 0.05) { const [hx, hy] = A.mano, s = Math.min(1, sube * 1.4);   // la camisa blanca, que cuelga de la mano
    R.poligono([[hx - 6, hy], [hx + 4, hy], [hx + 3 + sac, hy + Math.round(13 * s)], [hx - 5 + sac, hy + Math.round(13 * s)]], K);
    R.poligono([[hx - 5, hy + 1], [hx + 3, hy + 1], [hx + 2 + sac, hy + Math.round(12 * s)], [hx - 4 + sac, hy + Math.round(12 * s)]], H('#f2eee4'));
    R.linea(hx - 8, hy + 2, hx - 5, hy + Math.round(8 * s), K); R.linea(hx + 6, hy + 2, hx + 3, hy + Math.round(8 * s), K); R.linea(hx - 7, hy + 2, hx - 5, hy + Math.round(7 * s), H('#e0dcd0')); R.linea(hx + 5, hy + 2, hx + 3, hy + Math.round(7 * s), H('#e0dcd0'));
    R.linea(hx - 1, hy + 2, hx - 1 + sac, hy + Math.round(11 * s), H('#c8c4b8')); R.pset(hx - 1, hy + 4, H('#8a8a94')); R.pset(hx - 1, hy + 7, H('#8a8a94'));
    if (t > DRY && t < DRY + 0.8) for (let k = 0; k < 6; k++) { const f = (t - DRY) / 0.8, a = k * 1.05; R.pset(Math.round(hx - 1 + Math.cos(a) * (6 + f * 10)), Math.round(hy + 6 + Math.sin(a) * (4 + f * 7)), H('#e8dcc0')); } }
  // Wright revuelve su baúl y saca un jersey de rayas, seco y doblado; lo levanta para que lo vea Deveau
  const wx = 248, lev = suave(lin(t, CHESTS - 0.35, CHESTS + 0.05));
  const objW = [wx - 4, Math.round(lerp(158 + (t < CHESTS - 0.35 && pul(t, 9) ? 2 : 0), 138, lev))];
  const W = R.actor(EL.wrightMC, wx, 170, t, { dir: -1, sostiene: objW, sonrisa: t > CHESTS + 0.1, habla: t > CHESTS + 0.1 && t < CHESTS + 0.6 && pul(t, 15) });
  if (lev > 0.05) { const [hx, hy] = W.mano; R.rect(hx - 6, hy - 1, hx + 4, hy + 9, K); for (let y = hy; y <= hy + 8; y++) R.rect(hx - 5, y, hx + 3, y, (y - hy) % 3 === 2 ? BL : H('#2a4a8a')); R.rect(hx - 8, hy, hx - 6, hy + 6, K); R.rect(hx - 7, hy + 1, hx - 7, hy + 5, H('#2a4a8a')); }
};

// ── 2 · EL BARCO EN CORTE (fondo local): arriba la cocina y la despensa, abajo la bodega llena ──────────────────────
// cubierta y amurada (y 0–22), la cocina (x 4–146) y la despensa (x 154–315) entre y 23 y 83, la cubierta de abajo
// (y 84–90) y la bodega (y 91–171) con tres andanas de barriles de cara (encima de ellas camina Deveau, suelo 124); en
// las esquinas de abajo el casco se curva y fuera se ve el mar
const C2 = { crema: [H('#f0e6cc'), H('#dccfae'), H('#bcae8c'), H('#8a7c5e')], pino: [H('#c8965a'), H('#a8763e'), H('#86582c'), H('#5a3a1a')],
  bodega: [H('#4a3220'), H('#36241a'), H('#241810'), H('#160e08')] };
const fuera = (x, y) => { if (y < 140) return false; if (x < 34) return Math.hypot(x - 34, y - 140) > 34; if (x > 285) return Math.hypot(x - 285, y - 140) > 34; return false; };
const BARRIL_N = 18;
const barrilC = (x, y, r, rojo, sem) => { x = Math.round(x); y = Math.round(y);
  const A = rojo ? [H('#4a1e12'), H('#7e3a24'), H('#9a5034'), H('#c07050')] : [H('#5a3a1a'), H('#9a7240'), H('#bc9058'), H('#e0b878')];
  R.disco(x, y, r + 1, H('#0e0806')); R.disco(x, y, r, H('#4a4a52')); R.disco(x, y, r - 1, A[1]);
  for (let k = -r + 3; k < r - 1; k += 3) { const w = Math.floor(Math.sqrt(Math.max(0, (r - 1.5) ** 2 - k * k))); R.linea(x - w, y + k, x + w, y + k, A[0]); }
  R.linea(x - r + 3, y - 3, x - 3, y - r + 3, A[3]); R.pset(x - r + 2, y - 1, A[2]); R.pset(x + r - 2, y + 2, A[0]);
  R.anillo(x + 0.5, y + 0.5, r - 0.5, H('#5e5e68')); R.pset(x + 2, y + 1, H('#1a0e08')); R.pset(x + 3, y + 1, H('#2a1a10'));
  if (hs(sem, 3) > 0.6) { R.linea(x - 2, y - 4, x + 1, y - 4, H('#e8e4d8')); R.pset(x - 1, y - 5, H('#e8e4d8')); } };
const BARRILES = (() => { const L = []; for (const [fila, cy, off] of [[0, 162, 0], [1, 147, 9], [2, 132, 0]]) for (let i = -1; i <= BARRIL_N; i++) { const x = 9 + i * 17 + off; if (x < -8 || x > 328) continue; L.push([x, cy, (i * 7 + fila * 5) % 13 === 4, i * 31 + fila]); } return L; })();
const corte = () => {
  // el cielo por encima de la amurada
  cieloT(0, 9, [H('#8a9aaa'), H('#a8b4c0'), H('#c4ccd4')]);
  // la amurada del otro costado: tapa, candeleros y tablas pintadas
  for (let y = 5; y <= 16; y++) for (let x = 0; x < 320; x++) { let c = y === 5 ? H('#7a5434') : y === 6 ? H('#3a2614') : (x % 16 < 2) ? C2.crema[3] : y % 4 === 0 ? C2.crema[2] : C2.crema[1]; if (hs(x, y, 9) > 0.96) c = C2.crema[2]; if (tranquila(x, y)) c = y < 7 ? H('#5a4028') : C2.crema[1]; R.pset(x, y, c); }
  // la chimenea de la cocina (fría: sin humo) y un manguerote de ventilación
  R.rect(198, 0, 208, 16, K); R.rect(199, 2, 207, 16, H('#e8e0cc')); R.disco(203, 3, 4, K); R.disco(203, 3, 3, H('#b03a2a')); R.disco(203, 3, 2, H('#5a1a14'));
  // la cubierta cortada (tablas de testa) y los baos
  R.rect(0, 17, 319, 22, K); for (let x = 0; x < 320; x += 6) { R.rect(x + 1, 18, x + 5, 21, x % 12 ? C2.pino[1] : C2.pino[2]); R.pset(x + 2, 18, C2.pino[0]); }
  for (let y = 17; y <= 22; y++) for (let x = 0; x < 320; x++) if (tranquila(x, y)) R.pset(x, y, y === 22 ? K : H('#6a4a2c'));
  // la cocina: paredes de tablas pintadas de crema, zócalo, ojo de buey
  for (let y = 23; y <= 83; y++) for (let x = 4; x <= 146; x++) { const col = Math.floor(x / 8), g = Math.sin(y * 0.2 + col * 2.7);
    let c = x % 8 === 0 ? C2.crema[2] : g > 0.9 ? C2.crema[0] : C2.crema[1]; if (y > 70) c = (x % 8 === 0 || y === 71) ? C2.pino[3] : C2.pino[2]; if (hs(x, y, 4) > 0.97) c = C2.crema[2]; R.pset(x, y, c); }
  for (let x = 4; x <= 146; x += 24) R.rect(x, 23, x + 2, 26, H('#5a3a1a'));
  R.disco(126, 40, 9, K); R.disco(126, 40, 8, H('#b08a3a')); R.disco(126, 40, 6, H('#2a3a4a'));
  // la estufa de hierro, fría, con su olla, la tetera y el tubo
  R.rect(14, 54, 62, 83, K); R.rect(15, 55, 61, 82, H('#2a2a30')); R.rect(15, 55, 61, 57, H('#4a4a54')); R.rect(18, 61, 38, 77, K); R.rect(19, 62, 37, 76, H('#3a3a42')); R.rect(20, 63, 36, 63, H('#5a5a64'));
  R.rect(26, 68, 30, 69, H('#8a8a94')); R.rect(42, 61, 58, 70, K); R.rect(43, 62, 57, 69, H('#34343c')); for (let x = 44; x < 57; x += 3) R.linea(x, 64, x, 68, H('#1a1a20'));
  R.rect(14, 53, 62, 54, H('#8a8a94')); R.rect(16, 80, 60, 81, H('#1a1a20'));
  R.rect(30, 23, 36, 53, K); R.rect(31, 23, 35, 53, H('#3a3a40')); R.rect(32, 23, 32, 53, H('#6a6a74'));
  R.rect(17, 42, 29, 53, K); R.rect(18, 43, 28, 52, H('#5a5a64')); R.rect(18, 43, 28, 44, H('#8a8a94')); R.rect(21, 41, 25, 42, K);
  R.disco(48, 49, 5, K); R.disco(48, 49, 4, H('#8a6a3a')); R.pset(46, 47, H('#d8b878')); R.linea(53, 48, 57, 45, K); R.linea(44, 44, 52, 44, K);
  // la batería colgada, el escurreplatos y la mesa de la cocina con su pan, patatas y cuchillo
  R.linea(66, 28, 112, 28, H('#4a4a54'));
  for (const [x, r] of [[70, 5], [82, 4], [92, 6], [106, 3]]) { R.linea(x, 28, x, 31, K); R.disco(x, 31 + r, r + 1, K); R.disco(x, 31 + r, r, H('#8a8a94')); R.pset(x - 1, 31 + r - 1, H('#c8ccd4')); }
  R.rect(66, 46, 112, 48, H('#5a3a1a'));
  for (let x = 68; x < 110; x += 4) { R.rect(x, 38, x + 2, 46, K); R.rect(x + 1, 39, x + 1, 45, (x / 4) % 2 ? BL : H('#d8e0e8')); R.pset(x + 1, 40, H('#4a7aa0')); }
  R.rect(74, 62, 142, 64, K); R.rect(74, 62, 142, 62, H('#c89a60')); R.rect(76, 65, 78, 83, K); R.rect(138, 65, 140, 83, K);
  R.rect(84, 57, 100, 61, K); R.rect(85, 57, 99, 60, H('#c8904a')); R.linea(86, 57, 98, 57, H('#e8b878')); for (let x = 88; x < 98; x += 3) R.pset(x, 58, H('#8a5a2a'));
  for (const [x, y] of [[106, 59], [111, 60], [115, 59], [110, 57]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, H('#b8925a')); }
  R.linea(122, 61, 132, 59, H('#c8ccd4')); R.linea(132, 59, 135, 58, H('#5a3a1a'));
  R.rect(92, 72, 116, 83, K); R.rect(93, 73, 115, 82, H('#c8b890')); for (let x = 95; x < 114; x += 3) R.linea(x, 73, x + 1, 82, H('#a8986c'));
  // el mamparo entre las dos
  R.rect(147, 23, 153, 83, K); R.rect(148, 23, 152, 83, C2.pino[2]); R.linea(149, 23, 149, 83, C2.pino[1]);
  // la despensa: tablas de pino, estantes con tarros, latas, quesos y botellas; sacos de harina; los toneles del agua
  for (let y = 23; y <= 83; y++) for (let x = 154; x <= 315; x++) { const col = Math.floor(x / 9), g = Math.sin(y * 0.17 + col * 2.3 + Math.sin(y * 0.05) * 2);
    let c = x % 9 === 0 ? C2.pino[3] : g > 0.85 ? C2.pino[1] : g < -0.85 ? C2.pino[3] : C2.pino[2]; if (tranquila(x, y)) c = x % 9 === 0 ? C2.pino[3] : C2.pino[2]; R.pset(x, y, c); }
  for (const y of [40, 54, 68]) { R.rect(156, y, 232, y + 2, K); R.rect(156, y, 232, y, H('#d8a868')); }
  const TARRO = [H('#c84a2a'), H('#e0a030'), H('#6a8a3a'), H('#8a3a5a'), H('#d8d0b8')];
  for (const y of [40, 54, 68]) for (let x = 158; x < 228; ) { const k = Math.floor(hs(x, y) * 4), w = [5, 7, 4, 9][k], hh = [8, 6, 10, 5][k];
    if (k === 3) { R.disco(x + 4, y - 3, 4, K); R.disco(x + 4, y - 3, 3, H('#e8c860')); R.linea(x + 1, y - 3, x + 7, y - 3, H('#b89830')); }
    else { R.rect(x, y - hh, x + w, y - 1, K); R.rect(x + 1, y - hh + 1, x + w - 1, y - 1, k === 1 ? H('#8a8a94') : TARRO[Math.floor(hs(x, y, 2) * 5)]); R.pset(x + 1, y - hh + 2, BL); if (k === 0) R.rect(x, y - hh - 1, x + w, y - hh, H('#d8d0b8')); if (k === 2) { R.rect(x + 1, y - hh - 2, x + w - 1, y - hh, H('#2a5a3a')); } }
    x += w + 2; }
  for (const x of [160, 178, 196]) { R.poligono([[x, 83], [x + 16, 83], [x + 14, 72], [x + 11, 69], [x + 5, 69], [x + 2, 72]], K); R.poligono([[x + 1, 82], [x + 15, 82], [x + 13, 73], [x + 10, 70], [x + 6, 70], [x + 3, 73]], H('#e8e0c8')); R.linea(x + 5, 70, x + 11, 70, H('#a89870')); R.linea(x + 4, 77, x + 12, 77, H('#c8b890')); }
  R.rect(212, 23, 262, 25, H('#5a3a1a'));
  for (const x of [276, 296]) { R.rect(x - 1, 52, x + 18, 83, K);
    for (let y = 53; y <= 82; y++) { const b = Math.round(Math.sin((y - 53) / 29 * Math.PI) * 2); R.rect(x - b, y, x + 17 + b, y, H('#9a6e3e')); R.pset(x - b, y, H('#6a4422')); R.pset(x + 17 + b, y, H('#6a4422')); R.pset(x + 3, y, H('#c8965a')); }
    for (const y of [57, 78]) R.linea(x - 1, y, x + 18, y, H('#3a3a42')); R.rect(x, 52, x + 17, 53, H('#c8965a'));
    R.rect(x + 7, 70, x + 10, 72, H('#c8a040')); R.pset(x + 9, 73, H('#8ab8d8')); }
  R.rect(281, 48, 286, 51, K); R.rect(282, 48, 285, 50, H('#9aa0a8'));
  // la cubierta de abajo, cortada, con la escotilla de la bodega y su escala
  R.rect(0, 84, 319, 90, K); for (let x = 0; x < 320; x += 7) { R.rect(x + 1, 85, x + 6, 89, x % 14 ? C2.pino[2] : C2.pino[1]); R.pset(x + 2, 85, C2.pino[0]); }
  R.rect(156, 84, 176, 90, H('#1a100a'));
  // la bodega: el forro en sombra, las cuadernas y el agua que hay en el fondo
  for (let y = 91; y <= 179; y++) for (let x = 0; x < 320; x++) { let c = tono(C2.bodega, 0.2 + (y - 91) / 120 + (x % 22 < 3 ? 0.3 : 0), x, y); if ((y - 91) % 7 === 0) c = C2.bodega[3]; R.pset(x, y, c); }
  for (let y = 168; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 171 ? mez(H('#2a3a4a'), K, (y - 168) * 0.2) : y === 171 ? H('#4a3220') : tono([H('#3a2414'), H('#24160a')], 0.5, x, y));
  for (let x = 30; x < 320; x += 62) { R.rect(x, 91, x + 5, 98, K); R.rect(x + 1, 91, x + 4, 97, H('#4a3220')); R.poligono([[x - 6, 91], [x, 91], [x, 97]], H('#3a2618')); R.poligono([[x + 5, 91], [x + 11, 91], [x + 5, 97]], H('#3a2618')); R.pset(x + 2, 94, H('#8a8a94')); }
  for (let k = 0; k < 7; k++) R.linea(250 + k * 3, 116, 262 + k * 3, 106, H('#7a5634'));
  for (let r = 7; r >= 2; r -= 2) { R.anillo(84.5, 118.5, r, K); R.anillo(84.5, 118.5, r - 1, H('#8a7048')); }
  R.linea(0, 100, 319, 100, H('#2a1a10'));
  for (const [x, y, rojo, s] of BARRILES) barrilC(x, y, 8, rojo, s);
  for (const [xa, xb] of [[158, 158], [172, 172]]) { R.linea(xa, 86, xb, 124, K); R.linea(xa + 1, 86, xb + 1, 124, C2.pino[1]); }
  for (let y = 92; y < 124; y += 7) { R.linea(159, y, 172, y, K); R.linea(159, y + 1, 172, y + 1, C2.pino[0]); }
  // el casco en las esquinas de abajo y el mar de fuera
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { if (fuera(x, y)) R.pset(x, y, tono([H('#2a4a64'), H('#1a3048'), H('#10203a')], (y - 140) / 40, x, y));
    else { const d = x < 160 ? Math.hypot(x - 34, y - 140) : Math.hypot(x - 285, y - 140); if (y >= 140 && d > 30 && d <= 34 && (x < 34 || x > 285)) R.pset(x, y, d > 32.5 ? H('#1c1a20') : H('#3a3440')); } }
  for (const x of [0, 316]) R.rect(x, 7, x + 3, 140, H('#1c1a20'));
  // la bodega, más oscura: sólo la ilumina el farol de Deveau
  for (let y = 91; y < 172; y++) for (let x = 0; x < 320; x++) if (!fuera(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#0a0604'), 0.42));
};
const p2 = (t) => {
  capa('corte', corte);
  nubes(t, [[20, 4, 30, 3], [170, 6, 36, 2], [300, 3, 26, 4]], [H('#e8ecf0'), H('#c8d0d8'), H('#a8b2bc')], 4);
  // una gaviota camina por la tapa de la amurada
  { const gx = Math.round(240 - ((t * 9) % 60)), b = Math.floor(t * 6) % 2; R.rect(gx, 1, gx + 5, 3, BL); R.pset(gx - 1, 1, BL); R.pset(gx - 2, 2, H('#e8a030')); R.rect(gx + 2, 1, gx + 5, 1, H('#a8b0b8')); R.pset(gx, 0, K); R.pset(gx + 1 + b, 4, H('#e8a030')); R.pset(gx + 3 - b, 4, H('#e8a030')); }
  // el mar por el ojo de buey de la cocina y el de fuera del casco, con burbujas
  for (let y = 33; y <= 47; y++) for (let x = 119; x <= 133; x++) if (Math.hypot(x - 126, y - 40) < 6.5) R.pset(x, y, y < 39 + Math.round(Math.sin(t * 1.3 + x * 0.3) * 2) ? H('#b8c4d0') : tono([H('#4a6e8a'), H('#2a4a64')], (y - 36) / 10, x, y));
  for (let k = 0; k < 10; k++) { const x = k < 5 ? 6 + k * 5 : 292 + (k - 5) * 5, y = 178 - ((t * (8 + k) + k * 13) % 30); if (fuera(x, Math.round(y))) R.pset(x, Math.round(y), H('#8ab0c8')); }
  // los jamones colgados: en «Food» Wright les da una palmada y se mecen
  const pal = lin(t, FOOD, FOOD + 0.2), amp = 0.06 + 0.4 * pal * Math.exp(-Math.max(0, t - FOOD) * 0.9);
  [216, 228, 240].forEach((x, i) => { const a = Math.sin(t * 2.6 + i) * amp, L = 12 + i * 2, hx = Math.round(x + Math.sin(a) * L), hy = Math.round(25 + Math.cos(a) * L);
    R.linea(x, 25, hx, hy, H('#c8b890')); R.poligono([[hx - 2, hy], [hx + 2, hy], [hx + 5, hy + 12], [hx, hy + 16], [hx - 5, hy + 12]], K);
    R.poligono([[hx - 1, hy + 1], [hx + 1, hy + 1], [hx + 4, hy + 12], [hx, hy + 15], [hx - 4, hy + 12]], H('#a0522d')); R.linea(hx - 2, hy + 6, hx - 3, hy + 11, H('#d8a070')); R.pset(hx + 1, hy + 13, H('#e8d0b0')); });
  // en «six months», seis lunas se encienden una a una sobre los estantes, y un 6
  if (t > SIX - 0.3) { const a = lin(t, SIX - 0.3, SIX - 0.12); R.rect(156, 25, 156 + Math.round(78 * a), 38, K); R.rect(157, 26, 155 + Math.round(78 * a), 37, H('#1e2a4e')); R.pset(158, 26, H('#c8a040')); R.pset(232, 26, H('#c8a040')); }
  for (let k = 0; k < 6; k++) { const tk = SIX - 0.12 + k * 0.08; if (t < tk) break; const x = 164 + k * 12, y = 31 + (t < tk + 0.1 ? -1 : 0);
    R.disco(x, y, 5, H('#c8a040')); R.disco(x, y, 4, H('#f8eca8')); R.pset(x - 1, y - 1, H('#d8c070')); R.pset(x + 2, y + 1, H('#d8c070')); R.pset(x + 1, y - 2, H('#fffbe0')); if (t < tk + 0.25) for (const [dx, dy] of [[-7, 0], [7, 0], [0, -7]]) R.pset(x + dx, y + dy, BL); }
  if (t > SIX + 0.6) R.numero('6', 238, 37, { color: H('#f8eca8') });
  // Wright: palmada al jamón, golpe al tonel del agua, y mira las lunas
  const wx = 248, toca = t > WATER - 0.05 && t < SIX - 0.1, mira = t >= SIX - 0.1;
  const objW = t > FOOD - 0.15 && t < FOOD + 0.25 ? [wx - 6, 58] : toca ? [wx + 22, 68 + (t < WATER + 0.15 ? -2 : 0)] : false;
  R.actor(EL.wrightMC, wx, 83, t, { dir: toca ? 1 : -1, sostiene: objW, dedo: mira && t < SIX + 0.8, sonrisa: mira, habla: t > SIX + 0.8 && t < SIX + 1.3 && pul(t, 16) });
  if (t > WATER && t < WATER + 0.5) { const f = (t - WATER) / 0.5; R.anillo(285.5, 66.5, 2 + f * 6, f < 0.5 ? H('#e8d8b0') : H('#c8a878')); }
  // Deveau camina por encima de las andanas con el farol; en «almost» se para ante un barril que rezuma; en «untouched» levanta el farol
  const para = t > ALMOST - 0.1 && t < ALMOST + 0.7, tt = t < ALMOST - 0.1 ? t : t < ALMOST + 0.7 ? ALMOST - 0.1 : t - 0.8;
  const dx = Math.round(lerp(40, 222, lin(tt, P2 - 0.4, P3 - 0.4)));
  const alto = t > UNTOUCHED - 0.1 ? 30 : 18, lx = dx + 18, ly = 124 - alto;
  // la luz del farol sobre los barriles
  for (let y = Math.max(91, ly - 46); y < Math.min(172, ly + 60); y++) for (let x = lx - 56; x <= lx + 56; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.1), R0 = alto > 20 ? 58 : 48; if (d < R0 && x >= 0 && x < 320 && !fuera(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#ffcf80'), (1 - d / R0) * 0.55)); }
  // el barril que rezuma: una gota oscura que cae
  { const [bx, by] = [111, 147]; R.pset(bx + 3, by + 3, H('#1a0c06')); const g = (t * 1.2) % 1; R.pset(bx + 3, Math.round(by + 4 + g * 14), H('#8a5030')); }
  const D = R.actor(EL.deveauMC, dx, 124, t, { dir: 1, anda: !para && t > P2 - 0.3 && t < P3 + 0.3, sostiene: [dx + 18, 124 - alto], sorpresa: para && t < ALMOST + 0.4, sonrisa: t > UNTOUCHED });
  { const [hx, hy] = D.mano, fl = 0.8 + Math.sin(t * 12) * 0.2; R.linea(hx, hy, hx, hy + 2, K); R.rect(hx - 3, hy + 2, hx + 3, hy + 11, K); R.rect(hx - 2, hy + 4, hx + 2, hy + 9, fl > 0.85 ? H('#fff0b0') : H('#f8d070')); R.rect(hx - 3, hy + 2, hx + 3, hy + 3, H('#5a5a64')); R.rect(hx - 3, hy + 10, hx + 3, hy + 11, H('#5a5a64')); }
  if (para) R.bocadillo(dx + 8, 96, { icono: '?' });
};

// ── 3 · EL DIARIO DE A BORDO (canon): la regla de Deveau baja por los días 14–24, salta al 25 y señala la isla ───────
const p3 = (t) => {
  const o = { encuadre: 'camarote', camara: 'diario', pagina: 1 };
  const g = T.abordo(R, t, o); T.abordoDelante(R, t, o);
  const [fx, fy] = g.fila ?? [171, 41], [ix, iy] = g.isla ?? [240, 76];
  // la punta de la regla: entra, recorre la última fila de la izquierda (el 24), sube al 25 y lo recorre; en «nine days» va a la isla y da dos golpecitos
  let tx, ty, hx, hy;
  const e1 = suave(lin(t, P3 - 0.2, LOGBOOK + 0.3)), e2 = suave(lin(t, LOGBOOK + 0.4, FINAL + 0.5)), e3 = suave(lin(t, NOV - 0.2, N25)), e4 = suave(lin(t, N25, N25F)), e5 = suave(lin(t, NINE, EARLIER));
  tx = lerp(lerp(lerp(lerp(150, 66, e1), 148, e2), fx - 6, e3), fx + 30, e4); ty = lerp(lerp(lerp(lerp(200, 133, e1), 133, e2), fy + 4, e3), fy + 4, e4);
  tx = lerp(tx, ix - 4, e5); ty = lerp(ty, iy + 2 - (t > EARLIER && pul(t, 18) && t < EARLIER + 0.5 ? 2 : 0), e5);
  hx = lerp(lerp(214, 226, e3), 246, e5); hy = lerp(lerp(lerp(206, 150, e1), 146, e3), 146, e5);
  // el círculo de lápiz que rodea el 25
  if (t > N25 - 0.05) { const f = Math.min(1, (t - N25 + 0.05) / 0.4); for (let k = 0; k < 40 * f; k++) { const a = -Math.PI / 2 + k / 40 * Math.PI * 2; R.pset(Math.round(fx - 3 + Math.cos(a) * 11), Math.round(fy + 1 + Math.sin(a) * 6), H('#b0302a')); R.pset(Math.round(fx - 3 + Math.cos(a) * 12), Math.round(fy + 1 + Math.sin(a) * 6), H('#b0302a')); } }
  // la regla de boj, de la punta hacia la mano y más allá, con su sombra y sus marcas
  const dx = hx - tx, dy = hy - ty, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux, fin = 170;
  const RP = (s, w) => [Math.round(tx + ux * s + nx * w), Math.round(ty + uy * s + ny * w)];
  R.poligono([RP(0, -1).map((v, i) => v + (i ? 3 : 2)), RP(fin, -1).map((v, i) => v + (i ? 3 : 2)), RP(fin, 4).map((v, i) => v + (i ? 3 : 2)), RP(0, 4).map((v, i) => v + (i ? 3 : 2))], H('#3a2414'));
  R.poligono([RP(0, -2), RP(fin, -2), RP(fin, 3), RP(0, 3)], K); R.poligono([RP(1, -1), RP(fin, -1), RP(fin, 2), RP(1, 2)], H('#e8cc88'));
  R.linea(...RP(1, -1), ...RP(fin, -1), H('#f8e4b0'));
  for (let s = 4; s < fin; s += 4) R.linea(...RP(s, 2), ...RP(s, s % 16 === 0 ? 0 : 1), H('#6a4a20'));
  T.brazo(R, Math.round(hx + 30), 200, Math.round(hx), Math.round(hy), '#2a3450', -1, { codo: [Math.round(hx + 30), Math.round(hy + 26)] });
};

// ── 4 · SANTA MARÍA AL AMANECER (fondo local): la isla de cerca, el pueblo y el bergantín que pasa ───────────────────
// la isla ocupa x 0–214 (cumbre del Pico Alto en x ≈ 112, y ≈ 52; costa en y 112–126); el sol sale en x 258
const HOR4 = 112, shore = (x) => x > 214 ? HOR4 : Math.round(HOR4 + 14 * (1 - x / 214));
const cumbre = (x) => x > 214 ? 999 : Math.round(HOR4 - 2 - 58 * Math.exp(-(((x - 112) / 54) ** 2)) - 16 * Math.exp(-(((x - 36) / 24) ** 2)) - 3 * Math.sin(x * 0.21) - 6 * Math.min(1, (214 - x) / 18) * 0 - (x > 196 ? (x - 196) * -0.6 : 0));
const C4 = { cielo: [H('#2a3a6e'), H('#4a4a84'), H('#7a5a8e'), H('#c07a84'), H('#e8a070'), H('#f6c884')],
  verde: [H('#6a8a4a'), H('#4e6e3a'), H('#3a5430'), H('#283c22')], roca: [H('#8a5a44'), H('#6a4232'), H('#4a2c22'), H('#2e1a14')] };
const isla = () => {
  cieloT(0, HOR4 - 1, C4.cielo);
  for (let x = 0; x <= 214; x++) { const y0 = cumbre(x), ys = shore(x), acant = ys - Math.round(10 + 6 * Math.sin(x * 0.07) + 4 * (x < 60 ? 1 : 0));
    for (let y = y0; y <= ys; y++) { let c;
      if (y >= acant) { const capa_ = Math.floor((y - acant + Math.sin(x * 0.3) * 1.5) / 3); c = C4.roca[(capa_ + (hs(x >> 2, capa_) > 0.7 ? 1 : 0)) % 3]; if (y - acant < 1) c = C4.verde[3]; if (x % 17 < 2 && y > acant + 3) c = C4.roca[3]; }
      else { const f = (y - y0) / Math.max(1, acant - y0), cam = Math.floor((y + Math.sin(x * 0.09) * 4) / 6), parc = Math.floor((x + cam * 13) / 22);
        const lit = (x - 112) / 100;   // la luz viene de la derecha (el sol)
        let k = 1 - lit * 0.8 + f * 0.6 + (hs(parc, cam) - 0.5) * 0.9; c = tono(C4.verde, Math.max(0, Math.min(1, k / 2)), x, y);
        if (hs(parc, cam, 2) > 0.8) c = tono([H('#a8a050'), H('#8a8a3e'), H('#6a6a30')], 0.5 + f * 0.4 - lit * 0.3, x, y);
        if ((y + Math.round(Math.sin(x * 0.09) * 4)) % 6 === 0 && y > y0 + 4) c = H('#c8c0a8');   // los muros de piedra
        if (y - y0 < 2) c = mez(c, H('#f6c884'), 0.35); }
      R.pset(x, y, c); } }
  // el borde derecho de la isla baja en una punta con su faro de piedra apagado no: sólo rocas y espuma (dinámica)
  // las casas blancas de Vila do Porto, con tejados rojos, y la iglesia con su campanario
  for (let k = 0; k < 15; k++) { const x = 146 + k * 4 + Math.round(hs(k, 1) * 3), y = shore(x) - 14 - Math.round(hs(k, 2) * 10) - Math.max(0, (k - 9) * 2);
    R.rect(x, y, x + 5, y + 5, K); R.rect(x + 1, y + 1, x + 4, y + 5, H('#f2ece0')); R.rect(x + 4, y + 1, x + 4, y + 5, H('#c8c0b0')); R.poligono([[x - 1, y], [x + 6, y], [x + 4, y - 3], [x + 1, y - 3]], H('#b84a2a')); R.pset(x + 2, y + 3, H('#3a3a4a')); }
  R.rect(178, 78, 186, 100, K); R.rect(179, 79, 185, 100, H('#f6f0e4')); R.rect(184, 79, 185, 100, H('#c8c0b0')); R.poligono([[177, 79], [187, 79], [182, 71]], H('#2a2a34'));
  R.rect(181, 82, 183, 85, H('#2a2a34')); R.rect(186, 90, 200, 100, K); R.rect(187, 91, 199, 100, H('#f6f0e4')); R.poligono([[185, 91], [201, 91], [193, 85]], H('#b84a2a')); R.rect(192, 95, 194, 100, H('#5a3a2a'));
  // el puertecito con su muelle de piedra
  R.rect(198, 113, 218, 116, K); R.rect(199, 113, 217, 115, H('#a89a80')); for (let x = 200; x < 217; x += 4) R.pset(x, 114, H('#7a6e5a'));
};
const p4 = (t) => {
  capa('isla', isla);
  // las nubes del amanecer, a tres velocidades, por encima de la isla
  nubes(t, [[40, 36, 30, 1.2], [200, 40, 34, 0.8], [330, 34, 26, 1.6], [120, 44, 22, 2.0]], [H('#f8d8b0'), H('#e0a090'), H('#9a6a8a')], 49);
  for (let k = 0; k < 4; k++) pajaro(((t * (9 + k * 4) + k * 70) % 260) + 20, 56 + k * 7 + Math.sin(t + k) * 2, t, H('#2a2a3a'));
  // el sol que asoma por el horizonte en «Azores»
  const sol = suave(lin(t, ISLAND, P5 + 0.3)), sy = Math.round(HOR4 + 6 - sol * 16);
  for (let y = sy - 14; y < HOR4; y++) for (let x = 244; x <= 272; x++) { const d = Math.hypot(x - 258, y - sy); if (d < 10) R.pset(x, y, d < 8 ? H('#fff4c8') : H('#f8d888')); else if (d < 14) R.pset(x, y, mez(R.pget(x, y), H('#fff0c0'), 0.4)); }
  // el mar: rizos, el reguero del sol y la espuma en la costa
  for (let x = 0; x < 320; x++) for (let y = shore(x) + 1; y < 180; y++) { const f = (y - HOR4) / 68, w = Math.sin(x * (0.3 - f * 0.15) + y * 1.7 + t * 2) + Math.sin(x * 0.11 - y * 0.6 - t * 1.2) * 0.7;
    let c = tono([H('#8a7aa0'), H('#5a5a8a'), H('#3a4a74'), H('#24345a')], f + w * 0.05, x, y);
    const dsol = Math.abs(x - 258) - (y - HOR4) * 0.5; if (dsol < 6 && w > 0.4 && sol > 0.1) c = H('#fce8b0'); else if (w > 1.5) c = H('#b8a8c8');
    if (x <= 214 && y - shore(x) < 3 && Math.sin(x * 0.7 + t * 3) > 0.2) c = H('#f0ece8');
    R.pset(x, y, c); }
  // el molino de Santa María, con sus aspas que giran
  { const mx = 96, my = 72; R.rect(mx - 3, my, mx + 3, my + 12, K); R.rect(mx - 2, my + 1, mx + 2, my + 12, H('#f2ece0')); R.poligono([[mx - 4, my + 1], [mx + 4, my + 1], [mx, my - 4]], H('#b84a2a'));
    for (let k = 0; k < 4; k++) { const a = t * 1.6 + k * Math.PI / 2; R.linea(mx, my - 1, Math.round(mx + Math.cos(a) * 9), Math.round(my - 1 + Math.sin(a) * 9), H('#e8e0c8')); } R.pset(mx, my - 1, K); }
  // la campana del campanario, que tañe en «Santa»
  { const a = t > SANTA - 0.1 && t < SANTA + 1.6 ? Math.sin((t - SANTA) * 9) * 0.6 * (1 - (t - SANTA) / 1.6) : 0; R.disco(Math.round(182 + Math.sin(a) * 2), 84, 1, H('#c8a040')); if (Math.abs(a) > 0.3) for (const s of [-1, 1]) R.pset(182 + s * 6, 82 + (pul(t, 20) ? 1 : 0), H('#fff4c8')); }
  // una barca de pescadores que sale remando del puerto
  { const f = lin(t, P4, P5 + 0.4), bx = Math.round(lerp(212, 236, f)), by = Math.round(lerp(118, 126, f)), r = Math.floor(t * 3) % 2;
    R.rect(bx - 6, by, bx + 6, by + 2, K); R.rect(bx - 5, by, bx + 5, by + 1, H('#3a6a8a')); R.rect(bx - 1, by - 4, bx + 1, by - 1, H('#c84a2a')); R.pset(bx, by - 5, H('#f0c8a0'));
    R.linea(bx - 2, by - 2, bx - 7 - r * 2, by + 3, H('#c8a868')); R.linea(bx + 2, by - 2, bx + 7 + r * 2, by + 3, H('#c8a868')); }
  // el bergantín pasa frente a la isla y se aleja hacia el este; su estela
  const f = lin(t, P4 - 0.4, P5 + 0.4), x = lerp(150, 262, f), s = lerp(0.46, 0.34, f), y = 146 - f * 8;
  for (let k = 0; k < 26; k++) { const ex = Math.round(x - 30 * s / 0.46 - k * 3), ey = Math.round(y + 2 + Math.sin(k + t * 3)); if (ex > 0) R.pset(ex, ey, k % 3 ? H('#d8d0e0') : H('#a8a0c0')); }
  bergantin(x, y, s, { dir: 1, rot: Math.sin(t * 1.1) * 0.03, velas: 1, t });
  // la ballena que sopla a lo lejos, en el silencio
  { const tb = AZORES + 1.4; if (t > tb && t < tb + 2.2) { const f2 = (t - tb) / 2.2; R.poligono([[292, 121], [306, 121], [303, 118], [296, 117]], H('#2a2a40')); if (f2 < 0.6) for (let k = 0; k < 8; k++) R.pset(298 + Math.round(Math.sin(k) * (2 + f2 * 4)), Math.round(117 - f2 * 14 - k * 0.8), H('#e8eef8')); } }
};

// ── 5 · LA CARTA (decorado): nueve días de deriva y 400 millas ──────────────────────────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'mapa', deriva: suave(lin(t, P5 + 0.35, MILES)) };
  const g = T.mar(R, t, o); T.marDelante(R, t, o);
  if (t > N400 - 0.1) { const f = Math.min(1, (t - N400 + 0.1) / 0.35), [ax, ay] = g.santaMaria ?? [183, 107], [bx, by] = g.encuentro ?? [206, 101];
    const y = Math.min(ay, by) - 10; R.linea(ax, y, Math.round(lerp(ax, bx, f)), y, H('#b0302a')); R.linea(ax, y, ax, y + 3, H('#b0302a')); if (f >= 1) R.linea(bx, y, bx, y + 3, H('#b0302a'));
    if (f > 0.5) R.numero('400', Math.round((ax + bx) / 2) - 9, y - 3, { color: H('#b0302a') }); }
};

// ── 6 · EL TIMÓN AL SOL (decorado, luz de día): nadie gobierna; la rueda gira sola; «?» y 10 ─────────────────────────
const p6 = (t) => {
  const vuelta = suave(lin(t, STEER - 0.15, STEER + 1.4)) * Math.PI * 2.4;
  const o = { encuadre: 'alta', camara: 'timon', luz: 'dia', giro: Math.sin(t * 0.7) * 1.3 + Math.sin(t * 1.9 + 1) * 0.35 + Math.sin(t * 4.1) * 0.06 + vuelta };
  T.mar(R, t, o);
  // la campana del barco en su soporte de la caseta, que se mece y tañe sola en «10»
  { const a = Math.sin(t * 1.4) * 0.25 + (t > DIEZ && t < DIEZ + 1.4 ? Math.sin((t - DIEZ) * 10) * 0.5 * (1 - (t - DIEZ) / 1.4) : 0), px = 42, py = 112;
    R.rect(34, 108, 50, 110, K); R.rect(35, 108, 49, 109, H('#3a3a42')); R.rect(41, 110, 43, 112, K);
    const P = (u, v) => [Math.round(px + u * Math.cos(a) - v * Math.sin(a)), Math.round(py + u * Math.sin(a) + v * Math.cos(a))];
    R.poligono([P(-2, 0), P(2, 0), P(5, 9), P(-5, 9)], K); R.poligono([P(-1, 1), P(1, 1), P(4, 8), P(-4, 8)], H('#d8a838')); R.linea(...P(-2, 3), ...P(-3, 7), H('#f8e080')); R.pset(...P(0, 10), H('#8a6a20'));
    if (t > DIEZ && t < DIEZ + 0.6) for (const s of [-1, 1]) { R.linea(px + s * 8, py + 2, px + s * 11, py, H('#f8f0d0')); R.linea(px + s * 8, py + 6, px + s * 12, py + 6, H('#f8f0d0')); } }
  // el golpe de mar por encima de la regala en «steering»
  if (t > STEER - 0.2 && t < STEER + 1.0) { const f = (t - STEER + 0.2) / 1.2; for (let k = 0; k < 26; k++) { const a = -Math.PI * (0.15 + 0.7 * hs(k, 1)), v = 30 + hs(k, 2) * 30; const x = Math.round(150 + k * 2 + Math.cos(a) * v * f), y = Math.round(122 + Math.sin(a) * v * f + 40 * f * f); if (y < 124) R.pset(x, y, k % 3 ? BL : H('#a8d0e8')); } }
  T.marDelante(R, t, o);
  // «no one knew»: un «?» sobre el mar; «10 people»: el 10
  { const gx = ((t - P6) * 34) % 400 - 40, gy = 70 + Math.sin(t * 2) * 4; if (gx > 0 && gx < 270) { const a = Math.floor(t * 6) % 2; R.linea(gx - 4, gy - a, gx, gy, BL); R.linea(gx, gy, gx + 4, gy - a, BL); R.pset(gx, gy + 1, H('#a8b0b8')); } }
  if (t > KNEW) R.numero('?', 116, 104 - Math.round((1 - Math.min(1, (t - KNEW) / 0.25)) * 6), { tam: 16 });
  if (t > DIEZ - 0.05) R.numero('10', 136, 104, { tam: 16 });
};
const efectos = [[0.35, 'toc'], [0.85, 'toc'], [CLOTHES, 'papel'], [DRY + 0.05, 'whoosh'],
  [FOOD, 'golpecito'], [WATER + 0.05, 'toc'], [SIX, 'brillo'], [ALMOST, 'tic'],
  [LOGBOOK, 'papel'], [N25, 'lapiz'], [EARLIER, 'golpecito'],
  [ISLAND, 'ola'], [SANTA + 0.1, 'campana'], [AZORES + 1.5, 'chof'],
  [P5 + 0.4, 'lapiz'], [N400, 'brillo'],
  [STEER - 0.1, 'ola'], [KNEW, 'viento'], [DIEZ, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1872 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['mc-te'] = ('El té', r'''// MC-TE (frase 13), sin cartela. Tres planos (el reparto pedía dos, pero el camarote no puede durar 0–9,7 s):
// 1. «If you've heard of the Mary Celeste, you may have been told there were cups of tea» (corta en «tea»; 2026). FONDO
//    LOCAL: un aula de hoy con la pizarra y el bergantín a tiza: la maestra lo señala con el puntero en «Mary Celeste», se
//    vuelve a la clase en «told» (un alumno levanta la mano) y en «cups of tea» la taza a tiza humeante aparece junto al
//    barco; la alumna se sorprende.
// 2. «on the table, still warm, or breakfast served and half eaten. That never happened» (1872). El camarote vacío: en
//    «tea» aparece la taza recortada de un periódico (o.te) que humea; en «breakfast» un plato recortado con huevo y pan;
//    en «half eaten» el pan pierde un mordisco; en «That never happened» el guante de Atom baja de su esquina con la goma,
//    borra el plato y luego la taza (migas rosas) y vuelve a subir.
// 3. «None of the men who went aboard said so» (1872, 3,7 s). FONDO LOCAL: la cubierta del Dei Gratia al atardecer, con el
//    Mary Celeste lejos: Wright, Deveau y un marinero con sus jarros; en «None» aparece la taza a tiza sobre ellos, en
//    «aboard» niegan con la cabeza uno tras otro y en «said so» la tacha una X roja.''', PRE + r'''
const te = (k) => en('te', k);
const P2 = te(0.3073), P3 = te(0.8089);
const MARY = te(0.0633), TOLD = te(0.2205), CUPS = te(0.2711), STILL = te(0.4266), BREAK = te(0.5459), HALF = te(0.638), THAT = te(0.7393), HEND = te(0.7953);
const NONE = te(0.8396), MEN = te(0.8757), ABOARD = te(0.9155), SAID = te(0.939), SO = te(0.9625);
const K = C.k, BL = H('#f6f2ea'), TIZA = H('#eef0e8'), TIZA2 = H('#b8c4b4');

// ── 1 · EL AULA DE HOY (fondo local, 2026): la maestra cuenta el cuento con la tiza ─────────────────────────────────
// la pizarra (x 30–200, y 30–118) con el bergantín dibujado a tiza; la ventana (x 214–268, y 24–100); la librería
// (x 276–316); la mesa de la maestra con el barco en la botella; en primer plano, tres pupitres con sus alumnos
const tizaL = (x0, y0, x1, y1, sem = 0) => R.linea(x0, y0, x1, y1, (x, y) => (hs(x, y, sem) < 0.18 ? null : hs(x, y, sem + 1) < 0.3 ? TIZA2 : TIZA));
const aula = () => {
  // la pared verde salvia con su textura de pintura, el techo y la luz
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { let c = tono([H('#d4dcc4'), H('#c4ceb2'), H('#b2bea0')], 0.3 + y / 260 + (hs(x >> 1, y >> 1) - 0.5) * 0.25, x, y); R.pset(x, y, c); }
  R.rect(0, 0, 319, 4, H('#e8e4d8')); R.rect(0, 5, 319, 5, H('#b8b4a8')); R.rect(196, 0, 262, 3, H('#fafaf2')); R.rect(196, 4, 262, 4, H('#a8a89c'));
  // el zócalo de madera y el suelo de linóleo en baldosas
  for (let y = 120; y < 136; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 120 ? H('#5a3a22') : y === 121 ? H('#a07648') : x % 20 === 0 ? H('#6a4a2c') : tono([H('#a87e50'), H('#8a6440')], (y - 121) / 15, x, y));
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const bx = Math.floor((x + (y - 136) * 0.3) / 20), by = Math.floor((y - 136) / 9); let c = (bx + by) % 2 ? H('#c8c0a8') : H('#b0a88e'); if ((y - 136) % 9 === 0 || Math.floor(x + (y - 136) * 0.3) % 20 === 0) c = H('#8a8470'); if (hs(x, y) > 0.96) c = H('#d8d0b8'); R.pset(x, y, c); }
  // la pizarra con su marco, la repisa, las tizas y el borrador; el polvo de tiza borrado
  R.rect(28, 28, 202, 120, K); R.rect(29, 29, 201, 119, H('#8a6a44')); R.rect(30, 30, 200, 118, H('#a07a50'));
  for (let y = 33; y <= 115; y++) for (let x = 33; x <= 197; x++) { let c = tono([H('#3a5a48'), H('#2e4a3c'), H('#243c30')], 0.4 + (hs(x >> 3, y >> 3) - 0.5) * 0.5, x, y);
    if (Math.sin(x * 0.07 + y * 0.03) > 0.92 && hs(x, y) > 0.4) c = H('#4a6a58'); R.pset(x, y, c); }
  R.rect(26, 118, 204, 122, K); R.rect(27, 118, 203, 120, H('#b08a5a')); R.rect(40, 116, 47, 117, BL); R.rect(52, 116, 55, 117, H('#e8b8c8')); R.rect(170, 114, 184, 117, K); R.rect(171, 114, 183, 115, H('#3a3a4a')); R.rect(171, 116, 183, 116, H('#c8c4b8'));
  // el bergantín a tiza, con su mar de olas
  const sh = (u, v) => [44 + u, 104 - v];
  const casco = [[0, 14], [6, 2], [70, 2], [80, 14]]; for (let i = 0; i < 3; i++) tizaL(...sh(...casco[i]), ...sh(...casco[i + 1]), i);
  tizaL(...sh(0, 14), ...sh(80, 14), 4); tizaL(...sh(8, 9), ...sh(74, 9), 5);
  for (const [u, alto] of [[26, 62], [54, 66]]) { tizaL(...sh(u, 14), ...sh(u, alto), u); for (const [h0, w] of [[24, 14], [38, 12], [50, 9]]) if (h0 < alto - 4) { tizaL(...sh(u - w, h0 + 10), ...sh(u + w, h0 + 10), u + h0); tizaL(...sh(u - w + 1, h0), ...sh(u + w - 1, h0), u + h0 + 1); tizaL(...sh(u - w, h0 + 10), ...sh(u - w + 1, h0), 2); tizaL(...sh(u + w, h0 + 10), ...sh(u + w - 1, h0), 3); } }
  tizaL(...sh(80, 14), ...sh(100, 24), 9); tizaL(...sh(54, 66), ...sh(100, 24), 10); tizaL(...sh(26, 62), ...sh(-6, 18), 11); tizaL(...sh(0, 14), ...sh(-6, 18), 12);
  for (let k = 0; k < 6; k++) for (let x = 0; x < 16; x++) { const y = 108 - Math.round(Math.abs(Math.sin(x / 16 * Math.PI)) * 3); if (hs(x, k) > 0.2) R.pset(40 + k * 18 + x, y, TIZA); }
  // un «?» de tiza y una rosa de los vientos
  R.icono('?', 168, 40, TIZA, H('#2e4a3c'), 2); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = k % 2 ? 4 : 8; tizaL(150, 50, Math.round(150 + Math.cos(a) * r), Math.round(50 + Math.sin(a) * r), 20 + k); }
  R.linea(180, 9, 270, 11, H('#8a7a6a'));
  for (let k = 0; k < 5; k++) { const x = 198 + k * 15, y = 10 + Math.round(k * 0.4), c = [H('#f2eee4'), H('#f8f0c8'), H('#e8f0f8'), H('#f8e4e8'), H('#eef8e8')][k];
    R.rect(x, y, x + 12, y + 10, K); R.rect(x + 1, y + 1, x + 11, y + 9, c); R.rect(x + 2, y + 7, x + 10, y + 8, H('#4a8ac8')); R.rect(x + 4, y + 6, x + 9, y + 6, [H('#b83a2a'), H('#2a2a30'), H('#e0a030'), H('#3a7a4a'), H('#7a3a6a')][k]);
    R.linea(x + 6, y + 2, x + 6, y + 5, K); R.pset(x + 7, y + 3, H('#e04a3a')); R.pset(x + 7, y + 4, H('#e04a3a')); R.pset(x + 6, y, H('#d83a2a')); }
  // la ventana: marco blanco, el cielo y la escuela de enfrente (el árbol y las nubes se mueven)
  R.rect(212, 22, 270, 102, K); R.rect(213, 23, 269, 101, H('#f2f2ea')); R.rect(216, 26, 266, 98, K);
  R.rect(212, 102, 272, 106, K); R.rect(213, 102, 271, 104, H('#f8f8f0'));
  // el radiador bajo la ventana
  R.rect(218, 108, 264, 120, K); for (let x = 219; x < 264; x += 4) { R.rect(x, 109, x + 2, 119, H('#d8d4c8')); R.pset(x, 110, BL); }
  // la librería: libros de colores, un globo terráqueo encima (fuera de la esquina de Atom)
  R.rect(276, 58, 317, 136, K); R.rect(277, 59, 316, 135, H('#8a6440'));
  for (const y of [78, 98, 118, 134]) R.rect(277, y, 316, y + 1, H('#5a3a22'));
  for (const y0 of [60, 80, 100, 120]) for (let x = 279; x < 314; ) { const w = 3 + Math.floor(hs(x, y0) * 3), hh = 12 + Math.floor(hs(x, y0, 1) * 6); const c = [H('#b83a2a'), H('#2a5a8a'), H('#e0a030'), H('#3a7a4a'), H('#7a3a6a'), H('#d8d0b8')][Math.floor(hs(x, y0, 2) * 6)];
    R.rect(x, y0 + 18 - hh, x + w - 1, y0 + 17, c); R.rect(x + w - 1, y0 + 18 - hh, x + w - 1, y0 + 17, mez(c, K, 0.4)); R.pset(x, y0 + 20 - hh, mez(c, BL, 0.4)); x += w; }
  R.rect(290, 56, 302, 58, K); R.rect(295, 52, 297, 56, H('#c8a040'));
  // el reloj de pared y el cartel de la ballena (sin letras)
  R.disco(14, 36, 9, K); R.disco(14, 36, 8, BL); R.anillo(14.5, 36.5, 8, H('#b83a2a')); for (let k = 0; k < 12; k++) R.pset(Math.round(14 + Math.cos(k * Math.PI / 6) * 6), Math.round(36 + Math.sin(k * Math.PI / 6) * 6), H('#3a3a4a'));
  R.rect(2, 52, 26, 84, K); R.rect(3, 53, 25, 83, H('#9ac8e0')); for (let y = 70; y <= 83; y++) R.linea(3, y, 25, y, H('#4a7ab0')); R.poligono([[6, 66], [18, 64], [22, 68], [16, 72], [7, 71]], H('#2a3a5a')); R.pset(19, 66, BL); R.linea(4, 63, 7, 66, H('#2a3a5a')); R.linea(4, 69, 7, 67, H('#2a3a5a'));
  R.disco(14, 52, 1, H('#d83a2a'));
  // la mesa de la maestra con el barco en la botella (el hilo de Atom), la manzana, los libros y el bote de lápices
  R.rect(210, 120, 272, 124, K); R.rect(211, 120, 271, 122, H('#b08458')); R.rect(213, 125, 269, 150, K); R.rect(214, 125, 268, 149, H('#8a6440')); for (let y = 128; y < 149; y += 5) R.linea(216, y, 266, y, H('#7a5434'));
  R.rect(216, 117, 222, 119, H('#5a3a22')); R.rect(234, 117, 240, 119, H('#5a3a22'));
  R.rect(218, 117, 242, 118, H('#5a3a22')); R.rect(224, 115, 225, 117, H('#5a3a22')); R.rect(235, 115, 236, 117, H('#5a3a22'));
  R.poligono([[216, 110], [244, 110], [240, 115], [220, 115]], K); R.poligono([[217, 111], [243, 111], [239, 114], [221, 114]], H('#7a4a2a')); R.linea(218, 111, 242, 111, H('#e8e0c8'));
  for (const x of [226, 234]) { R.linea(x, 98, x, 110, H('#3a2414')); R.poligono([[x + 1, 99], [x + 6, 104], [x + 1, 108]], BL); R.poligono([[x - 1, 100], [x - 5, 105], [x - 1, 108]], H('#e8e0c8')); }
  R.disco(254, 116, 3, K); R.disco(254, 116, 2, H('#d83a2a')); R.pset(253, 115, H('#f8a090')); R.pset(255, 112, H('#3a7a3a'));
  R.rect(259, 112, 268, 119, K); R.rect(260, 113, 267, 114, H('#2a5a8a')); R.rect(260, 115, 267, 116, H('#e0a030')); R.rect(260, 117, 267, 118, H('#b83a2a'));
  // una mochila en el suelo
  R.rect(298, 140, 314, 158, K); R.rect(299, 141, 313, 157, H('#d86a2a')); R.rect(301, 148, 311, 156, H('#b85a20')); R.linea(302, 141, 306, 136, K); R.linea(310, 141, 306, 136, K);
};
const pupitre = (x0, y0) => { R.rect(x0, y0, x0 + 52, y0 + 4, K); R.rect(x0 + 1, y0, x0 + 51, y0 + 2, H('#d8b080')); R.rect(x0 + 1, y0 + 3, x0 + 51, y0 + 3, H('#a07a4a'));
  R.rect(x0 + 3, y0 + 5, x0 + 49, 179, K); R.rect(x0 + 4, y0 + 5, x0 + 48, 179, H('#5a7aa0')); R.rect(x0 + 4, y0 + 5, x0 + 48, y0 + 6, H('#7a9ac0')); for (let y = y0 + 9; y < 180; y += 6) R.linea(x0 + 6, y, x0 + 46, y, H('#4a6a90'));
  R.rect(x0 + 8, y0 - 2, x0 + 20, y0 - 1, H('#f2eee4')); R.linea(x0 + 9, y0 - 1, x0 + 19, y0 - 1, H('#9ab0c8')); R.linea(x0 + 26, y0 - 1, x0 + 34, y0 - 3, H('#e0a030')); };
const p1 = (t) => {
  capa('aula', aula);
  // por la ventana: el cielo, nubes que pasan, la escuela de enfrente y un árbol que se mece
  R.recorte([217, 27, 265, 97]);
  for (let y = 27; y <= 97; y++) for (let x = 217; x <= 265; x++) R.pset(x, y, tono([H('#7ab0e0'), H('#9ac4ea'), H('#bcd8f0')], (y - 27) / 70, x, y));
  nubes(t, [[200, 40, 22, 2.2], [260, 54, 16, 3.0]], [BL, H('#e0e8f0'), H('#c0ccd8')]);
  for (let x = 217; x <= 265; x++) for (let y = 72; y <= 97; y++) { let c = (x % 12 < 1 || (y - 72) % 8 === 0) ? H('#8a4a32') : H('#b85a3a'); if ((x % 12 > 3 && x % 12 < 8) && (y - 72) % 8 > 2 && (y - 72) % 8 < 6) c = H('#d8e8f0'); R.pset(x, y, c); }
  { const sw = Math.sin(t * 1.4) * 2; R.rect(236, 78, 239, 97, H('#5a3a22')); for (const [dx, dy, r, c] of [[0, 0, 11, H('#3a7a3a')], [-7, 6, 8, H('#4a8a3a')], [8, 5, 8, H('#2e6a30')], [2, -6, 7, H('#5a9a48')]]) R.disco(Math.round(238 + dx + sw * (1 - dy / 20)), 66 + dy, r, c); }
  R.recorte(null);
  R.rect(240, 26, 241, 98, K); R.rect(216, 61, 266, 62, K); R.rect(240, 26, 240, 98, H('#f2f2ea'));
  // el reloj de pared: la aguja corre
  { const a = t * 1.0 - Math.PI / 2; R.linea(14, 36, Math.round(14 + Math.cos(a) * 6), Math.round(36 + Math.sin(a) * 6), H('#b83a2a')); R.linea(14, 36, 14, 31, K); R.linea(14, 36, 18, 36, K); }
  // la taza a tiza que la maestra completa en «cups of tea», con su vapor que se ondula
  const cx = 172, cy = 92, rev = lin(t, CUPS - 0.5, CUPS + 0.02);
  if (rev > 0) { const pts = []; for (let u = 0; u <= 1; u += 0.02) pts.push([cx - 12 + Math.round(u * 24), cy - 10]); for (let v = 0; v <= 1; v += 0.05) pts.push([cx + 12 - Math.round(v * 3), cy - 10 + Math.round(v * 17)]); for (let u = 0; u <= 1; u += 0.02) pts.push([cx + 9 - Math.round(u * 18), cy + 7]); for (let v = 0; v <= 1; v += 0.05) pts.push([cx - 9 - Math.round((1 - v) * 3), cy + 7 - Math.round(v * 17)]);
    for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.15) pts.push([Math.round(cx + 11 + Math.cos(a) * 6), Math.round(cy - 2 + Math.sin(a) * 6)]);
    for (let u = 0; u <= 1; u += 0.02) pts.push([cx - 18 + Math.round(u * 36), cy + 10 - Math.round(Math.sin(u * Math.PI) * 2)]);
    const n = Math.floor(pts.length * rev); for (let i = 0; i < n; i++) { const [x, y] = pts[i]; if (hs(x, y) > 0.1) { R.pset(x, y, TIZA); R.pset(x + 1, y, hs(x, y, 3) > 0.5 ? TIZA : TIZA2); } }
    if (rev >= 1) for (let k = 0; k < 3; k++) for (let j = 0; j < 14; j++) { const x = Math.round(cx - 6 + k * 6 + Math.sin(t * 5 + j * 0.6 + k) * 2), y = cy - 13 - j; if (hs(j, k) > 0.2) { R.pset(x, y, TIZA); R.pset(x + 1, y, TIZA2); } } }
  // la maestra: señala el barco con el puntero en «Mary Celeste», se vuelve a la clase en «told», y en «cups» señala la taza
  const vaTaza = suave(lin(t, MARY + 0.9, TOLD - 0.1)), mx = Math.round(lerp(126, 196, vaTaza)), aClase = t > TOLD - 0.15 && t < TOLD + 0.45;
  const punta = vaTaza < 0.05 ? [96 + (t > MARY && t < MARY + 0.3 ? 2 : 0), 70] : vaTaza > 0.95 && !aClase ? [cx + 10 + (t > CUPS && t < CUPS + 0.25 ? 2 : 0), cy + 2] : null;
  const M = R.actor(EL.profesor, mx, 140, t, { dir: aClase ? 1 : -1, anda: vaTaza > 0.02 && vaTaza < 0.98, sostiene: punta ? [mx - 6, 120] : false, habla: (aClase || (t > MARY && t < MARY + 0.8)) && pul(t, 15), sonrisa: t > CUPS });
  if (punta) { const [hx, hy] = M.mano; R.linea(hx, hy, punta[0], punta[1], K); R.linea(hx, hy - 1, punta[0], punta[1] - 1, H('#c89a5a')); R.pset(punta[0], punta[1], H('#e8e0c8')); }
  if (t > CUPS && t < CUPS + 0.6) for (let k = 0; k < 6; k++) { const f = (t - CUPS) / 0.6; R.pset(Math.round(cx + 8 + Math.cos(k) * f * 8), Math.round(cy - 4 + Math.sin(k) * f * 6), TIZA); }
  // los alumnos: uno levanta la mano en «told», otra se sorprende con la taza, el tercero le cuchichea
  R.actor(EL.alumno, 30, 168, t, { dir: 1, dedo: t > TOLD && t < CUPS + 0.4, sonrisa: t > TOLD });
  R.actor(EL.alumna, 128, 168, t, { dir: -1, sorpresa: t > CUPS && t < CUPS + 0.6, sonrisa: t > CUPS + 0.6, habla: t > 1.0 && t < 1.8 && pul(t, 14) });
  R.actor(EL.alumno1 ?? EL.alumno, 236, 168, t, { dir: -1, habla: t > 2.0 && t < 2.8 && pul(t, 16) });
  pupitre(14, 160); pupitre(112, 160); pupitre(222, 160);
};

// ── 2 · EL CAMAROTE VACÍO (decorado, hallazgo): la taza recortada y el desayuno recortado; el guante de Atom los borra ──
// la taza (o.te) en [190, 110]: el decorado la borra de izquierda a derecha en xe = 177 + 28·(te − 0,6)/0,32; el plato
// recortado lo pinta la escena en [136, 104] con su propia goma
const PLATO_X = 119, PLATO_X1 = 149, GOMA_P0 = THAT - 0.34, GOMA_P1 = THAT - 0.02, GOMA_T0 = THAT + 0.02, GOMA_T1 = HEND - 0.05;
const p2 = (t) => {
  const teV = t < P2 + 0.45 ? 0.15 * lin(t, P2 + 0.05, P2 + 0.45) : t < GOMA_T0 ? lerp(0.15, 0.58, lin(t, P2 + 0.45, GOMA_T0)) : lerp(0.6, 0.92, lin(t, GOMA_T0, GOMA_T1));
  const o = { encuadre: 'camarote', estado: 'hallazgo', te: teV };
  T.abordo(R, t, o);
  // el plato del desayuno, recortado de un periódico: aparece en «breakfast»; en «half eaten» le falta un mordisco
  const ap = lin(t, BREAK - 0.05, BREAK + 0.15), xeP = Math.round(lerp(PLATO_X - 1, PLATO_X1 + 1, lin(t, GOMA_P0, GOMA_P1)));
  if (ap > 0 && xeP < PLATO_X1) { const s = 0.5 + 0.5 * ap, cx = 134, cy = 101, w = Math.round(15 * s), hh = Math.round(12 * s);
    for (let y = cy - hh; y <= cy + hh; y++) for (let x = cx - w; x <= cx + w; x++) { if (x < xeP) continue; const b = Math.min(x - (cx - w), cx + w - x, y - (cy - hh), cy + hh - y); if (b < 1 && hs(x, y, 7) < 0.45) continue;
      R.pset(x, y, b < 1 ? H('#c8c0a8') : (y - (cy - hh)) % 3 === 0 && (x < cx - 8 || x > cx + 8) ? H('#a8a290') : H('#ece6d4')); }
    R.pset(cx + w + 1, cy + hh + 1, H('#3a2414'));
    if (ap >= 1) { const disc = (x, y, rx, ry, c) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i * i) / (rx * rx) + (j * j) / (ry * ry) <= 1 && x + i >= xeP) R.pset(x + i, y + j, c); };
      disc(cx, cy + 3, 12, 6, H('#4a4a54')); disc(cx, cy + 3, 11, 5, H('#f8f8f2')); disc(cx, cy + 2, 8, 3, H('#d8d8d0'));
      disc(cx - 5, cy + 1, 4, 2, H('#f8f8f2')); disc(cx - 5, cy + 1, 1, 1, H('#f0b020')); disc(cx - 5, cy, 0, 0, H('#fff4a0'));
      const mordido = t > HALF; for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) { const x = cx + 1 + i, y = cy - 1 + j; if (x < xeP) continue; if (mordido && i > 4 && (j < 2 || i > 6)) continue; R.pset(x, y, j === 0 ? H('#a8642a') : H('#e8c080')); }
      if (mordido && t < HALF + 0.4) for (let k = 0; k < 4; k++) R.pset(cx + 6 + k, cy - 4 - Math.round((t - HALF) * 20 * hs(k, 1)), H('#e8c080')); } }
  if (t > GOMA_P0) for (let k = 0; k < 10; k++) { const mx = PLATO_X + Math.round(hs(k, 4) * 26), my = 102 + Math.round(hs(k, 5) * 6); if (mx < xeP) R.pset(mx, my, H('#d89aa0')); }
  T.abordoDelante(R, t, o);
  // el guante de Atom baja de su esquina con la goma, borra el plato y luego la taza, y vuelve a subir
  const g0 = THAT - 0.6;
  if (t > g0 && t < HEND + 0.5) { let ex, ey;
    if (t < GOMA_P0) { const f = suave(lin(t, g0, GOMA_P0)); ex = lerp(292, PLATO_X - 2, f); ey = lerp(44, 100, f) - Math.sin(f * Math.PI) * 18; }
    else if (t < GOMA_P1) { ex = xeP - 4; ey = 100 + (pul(t, 30) ? 1 : 0); }
    else if (t < GOMA_T0) { const f = lin(t, GOMA_P1, GOMA_T0); ex = lerp(PLATO_X1 - 4, 173, f); ey = 100 - Math.sin(f * Math.PI) * 6; }
    else if (t < GOMA_T1) { ex = 177 + 28 * Math.max(0, Math.min(1, (teV - 0.6) / 0.32)) - 4; ey = 104 + (pul(t, 30) ? 1 : 0); }
    else { const f = suave(lin(t, GOMA_T1, HEND + 0.5)); ex = lerp(201, 292, f); ey = lerp(104, 46, f); }
    ex = Math.round(ex); ey = Math.round(ey);
    // la estela de chispitas de Atom
    for (let k = 1; k <= 4; k++) R.pset(ex + 14 + k * 3, ey - 6 - k * 2, pul(t, 12, k) ? H('#bfe8ff') : H('#7ac0f0'));
    R.rect(ex - 1, ey - 2, ex + 9, ey + 4, K); R.rect(ex, ey - 1, ex + 8, ey + 3, H('#f0a0b0')); R.rect(ex, ey - 1, ex + 8, ey - 1, H('#f8c8d0')); R.rect(ex + 5, ey - 1, ex + 8, ey + 3, H('#5a7ac8')); R.rect(ex + 5, ey - 1, ex + 8, ey - 1, H('#8aa8e0'));
    T.mano(R, ex + 13, ey - 3, -1, GUANTE, { sinManga: true });
    if ((t > GOMA_P0 && t < GOMA_P1) || (t > GOMA_T0 && t < GOMA_T1)) for (let k = 0; k < 3; k++) R.pset(ex - 2 - k * 2, ey + 4 + (pul(t, 20, k) ? 1 : 0), H('#d89aa0')); }
};

// ── 3 · EN LA CUBIERTA DEL DEI GRATIA, AL ATARDECER (fondo local): los que subieron a bordo dicen que no ──────────────
// horizonte en y 104; el Mary Celeste lejos a la izquierda; la amurada (y 114–134) detrás de los tres; cubierta de
// tablas; el palo mayor en x 226–232; la escotilla en primer plano (y 166–179)
const atardecer = () => {
  cieloT(0, 103, [H('#3a2a5a'), H('#5a3a6a'), H('#8a4a6a'), H('#c86a5a'), H('#e8904a'), H('#f6c06a')]);
  for (let y = 104; y < 116; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#c8705a'), H('#6a3a5a'), H('#3a2a4a')], (y - 104) / 12, x, y));
  // la amurada pintada por dentro, candeleros, tapa de regala y cabillero con adujas
  for (let y = 114; y <= 134; y++) for (let x = 0; x < 320; x++) { let c = x % 18 < 2 ? H('#4a5a3a') : y % 5 === 0 ? H('#b8ae90') : H('#d8ccaa'); c = mez(c, H('#f0a060'), 0.18); if (hs(x, y) > 0.97) c = H('#a89a7c'); R.pset(x, y, c); }
  R.rect(0, 111, 319, 114, K); R.rect(0, 111, 319, 112, H('#8a5a34')); R.rect(0, 112, 319, 112, H('#e8a868'));
  R.rect(244, 124, 300, 127, K); R.rect(245, 124, 299, 125, H('#a07848'));
  for (let x = 250; x < 298; x += 9) { R.rect(x, 118, x + 1, 131, K); R.pset(x, 118, H('#c8a868')); for (let k = 0; k < 8; k++) R.pset(x - 2 + (k % 3), 126 + Math.floor(k / 3), H('#c8a868')); }
  // la cubierta: tablas largas y calafateadas, más claras con la luz del ocaso
  for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 135) / (3 + (y - 135) / 9)), junta = (tab * 67) % 90, g = Math.sin(x * 0.05 + tab * 2.7);
    let c = g > 0.8 ? H('#d8a870') : g < -0.8 ? H('#9a6e44') : H('#b88a58'); if (Math.floor((y - 135) % (3 + (y - 135) / 9)) === 0) c = H('#5a3a22'); if ((x + junta) % 90 === 0) c = H('#5a3a22'); R.pset(x, y, c); }
  // el palo mayor con sus obenques y la verga con la vela aferrada
  R.rect(225, 0, 233, 134, K); R.rect(226, 0, 232, 134, H('#8a6038')); R.rect(227, 0, 228, 134, H('#c8905a')); R.rect(231, 0, 232, 134, H('#5a3a22'));
  for (const x of [204, 212, 248, 256]) R.linea(229, 24, x, 112, H('#2a2024'));
  R.rect(180, 46, 270, 49, K); R.rect(181, 46, 269, 47, H('#a07848'));
  for (let x = 184; x < 268; x++) { const y = 50 + Math.round(Math.sin((x - 184) / 84 * Math.PI) * 4); R.rect(x, 49, x, y, H('#e8d8b8')); R.pset(x, y, H('#b8a888')); if (x % 12 === 0) R.rect(x, 49, x, y, H('#c8b898')); }
  // un barril de agua con su cazo, una aduja y el cabrestante
  R.rect(12, 140, 38, 166, K); for (let y = 141; y < 166; y++) { const b = Math.round(Math.sin((y - 141) / 25 * Math.PI) * 2); R.rect(13 - b, y, 37 + b, y, H('#9a6e3e')); R.pset(15, y, H('#c8965a')); } for (const y of [146, 160]) R.linea(11, y, 39, y, H('#3a3a42'));
  for (let r = 10; r >= 2; r -= 2) { R.anillo(62.5, 170.5, r, K); R.anillo(62.5, 170.5, r - 1, H('#d8b878')); }
  R.rect(270, 140, 296, 170, K); R.rect(271, 141, 295, 169, H('#7a5432')); for (let x = 273; x < 295; x += 4) R.linea(x, 141, x, 169, H('#5a3a22')); R.rect(268, 138, 298, 141, H('#3a2414')); R.rect(268, 168, 298, 171, H('#3a2414'));
  for (const a of [-0.4, 0.5]) R.linea(283, 139, Math.round(283 + Math.cos(a) * 18), Math.round(139 - 8 + Math.sin(a) * 4), H('#c8a868'));
  // la escotilla en primer plano
  R.rect(84, 166, 236, 179, K); R.rect(85, 167, 235, 179, H('#6a4428')); R.rect(85, 167, 235, 168, H('#a07040')); for (let x = 96; x < 236; x += 22) R.rect(x, 169, x + 1, 179, H('#3a2414'));
};
const p3 = (t) => {
  capa('atardecer', atardecer);
  nubes(t, [[30, 40, 40, 1.0], [190, 36, 34, 1.6], [320, 54, 30, 2.2], [110, 66, 26, 0.7]], [H('#f8c890'), H('#e08870'), H('#8a4a6a')], 92);
  // el sol que se pone, a la izquierda del palo, y su reguero en el mar
  R.recorte([0, 0, 319, 103]); R.disco(150, 104, 11, H('#f8d888')); R.disco(150, 104, 9, H('#fff0c0')); R.recorte(null);
  for (let y = 105; y < 111; y++) for (let k = 0; k < 6; k++) { const x = 150 + Math.round(Math.sin(t * 3 + y * 1.7 + k) * (4 + (y - 104))) ; if (pul(t, 4, y + k)) R.pset(x, y, H('#fce0a0')); }
  // el Mary Celeste a lo lejos, a la izquierda, con su tripulación de presa
  bergantin(56, 104, 0.24, { dir: 1, rot: Math.sin(t * 0.9) * 0.04, velas: 0.6, t });
  for (let k = 0; k < 3; k++) pajaro(((t * (10 + k * 3) + k * 90) % 300) + 10, 74 + k * 6, t, H('#2a1a2a'));
  // los tres que subieron a bordo, con sus jarros de lata; en «None» aparece la taza a tiza; en «aboard» niegan uno tras otro
  const cx = 158, cy = 72, ap = lin(t, NONE - 0.1, NONE + 0.25);
  const niega = (k) => { const a = ABOARD + k * 0.12; return t > a && t < a + 0.55 ? (Math.floor((t - a) * 12) % 2 ? 1 : -1) : 0; };
  const quien = [[EL.wrightMC, 112, 1, 0], [EL.deveauMC, 150, 1, 1], [EL.marineroMC ?? EL.wrightMC, 190, -1, 2]];
  for (const [def, x, d0, k] of quien) { const n = niega(k), mira = t > MEN && n === 0 ? (x < cx ? 1 : -1) : d0, bebe = k === 2 && t < NONE - 0.05;
    const A = R.actor(def, x, 160, t, { dir: n || mira, sostiene: k === 1 && t > SAID ? false : [x + (mira > 0 ? 18 : -4), bebe ? 138 : 146], dedo: k === 1 && t > SAID, sorpresa: t > NONE && t < MEN && k !== 1, habla: k === 1 && t > SAID && pul(t, 14) });
    if (!(k === 1 && t > SAID)) { const [hx, hy] = A.mano; R.rect(hx - 2, hy - 3, hx + 2, hy + 2, K); R.rect(hx - 1, hy - 2, hx + 1, hy + 1, H('#a8acb4')); R.pset(hx - 1, hy - 2, H('#e0e4e8')); } }
  if (ap > 0) { const pts = []; for (let u = 0; u <= 1; u += 0.025) pts.push([cx - 14 + Math.round(u * 28), cy - 10]); for (let v = 0; v <= 1; v += 0.05) pts.push([cx + 14 - Math.round(v * 3), cy - 10 + Math.round(v * 18)]);
    for (let u = 0; u <= 1; u += 0.025) pts.push([cx + 11 - Math.round(u * 22), cy + 8]); for (let v = 0; v <= 1; v += 0.05) pts.push([cx - 11 - Math.round((1 - v) * 3), cy + 8 - Math.round(v * 18)]);
    for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.15) pts.push([Math.round(cx + 13 + Math.cos(a) * 7), Math.round(cy - 1 + Math.sin(a) * 7)]);
    for (let u = 0; u <= 1; u += 0.025) pts.push([cx - 20 + Math.round(u * 40), cy + 12 - Math.round(Math.sin(u * Math.PI) * 2)]);
    const n = Math.floor(pts.length * ap); for (let i = 0; i < n; i++) { const [x, y] = pts[i]; R.pset(x, y, TIZA); R.pset(x, y + 1, TIZA2); }
    if (ap >= 1) for (let k = 0; k < 3; k++) for (let j = 0; j < 12; j++) { const x = Math.round(cx - 7 + k * 7 + Math.sin(t * 5 + j * 0.6 + k) * 2), y = cy - 14 - j; if (hs(j, k) > 0.2) R.pset(x, y, TIZA); } }
  if (t > SAID) { const f = Math.min(1, (t - SAID) / 0.15), e = 4; if (f > 0.2) R.icono('X', cx - 10, cy - 10, H('#e03a2a'), H('#4a1010'), e); }
};
const efectos = [[MARY + 0.05, 'toc'], [CUPS, 'toc'], [P2 + 0.1, 'papel'], [BREAK, 'papel'], [HALF, 'masca'], [THAT - 0.55, 'whoosh'], [THAT, 'lapiz'],
  [NONE, 'brillo'], [SAID + 0.02, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 2026 : 1872) });
''')
