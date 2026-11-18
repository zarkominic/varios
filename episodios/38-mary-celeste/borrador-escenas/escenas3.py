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

E['mc-salida'] = ('La salida', r'''// MC-SALIDA (frases 7–8), cartela 1872. Seis planos:
// 1. «On November 7, 1872, the Mary Celeste left New York for Genoa, in Italy»: el muelle de Nueva York; la cabria sube
//    barriles; el estibador del torno suelta la manivela, el último barril se escapa rodando, él corre detrás, el barril
//    rebota en el noray (la gaviota sale volando) y él lo atrapa; en «left» el marinero suelta la amarra, suena la campana
//    y el bergantín zarpa sin ese barril; el estibador se queda con él en brazos («?»).
// 2. «In her holds she carried 1,701 barrels of raw alcohol, meant for fortifying wine»: el diario de cerca; la hoja pasa
//    y aparece el manifiesto; en «1,701» la mano entra desde abajo con un lápiz, subraya la suma (se ilumina) y salta un
//    1701 grande sobre la mesa; en «barrels» la golpea dos veces; en «wine» va a la botella y la copa de la mesa.
// 3. «not for drinking. Besides the family, there were seven crewmen»: el bergantín a toda vela de día; en «not for
//    drinking» un marinero levanta la jarra junto a un barril y el piloto le hace que no (X); Briggs al timón, Sarah y
//    Sophia a popa; en «seven crewmen» se cuentan los siete, 1 a 7.
// 4. «Eight days later, on November 15, another ship left the same port»: otro muelle (volteado: barco a la izquierda,
//    cobertizo a la derecha), el Dei Gratia de casco verde cargando barriles azules de petróleo; el calendario de la pared
//    pasa del 7 al 15 hoja a hoja (las hojas vuelan); el estibador sube barriles por la plancha; Morehouse los cuenta con
//    el dedo y en «left» sube a bordo; el marinero de proa suelta la amarra y el barco se separa.
// 5. «the Dei Gratia, a Canadian vessel carrying petroleum, bound for Gibraltar»: al atardecer, el faro de Sandy Hook
//    grande en primer plano y su haz que barre; el Dei Gratia, pequeño y a contraluz, se aleja hacia el sol; el farero sale
//    con su farol, saluda en «Canadian vessel» y en «Gibraltar» señala al este; la boya, la espuma en las rocas.
// 6. «Neither captain could have imagined that their ships would meet in the middle of the ocean»: la carta del
//    Atlántico; las dos rutas avanzan desde Nueva York; en «meet» un aro rojo late alrededor de los dos barquitos, junto
//    a las Azores («?»).''', PRE + r'''
const s = (k) => en('salida', k), d = (k) => en('deigratia', k);
const P2 = s(0.3642), P3 = s(0.788), P4 = d(0), P5 = d(0.3152), P6 = d(0.6602);
const LEFT = s(0.2173), N1701 = s(0.434), BARRELS = s(0.556), WINE = s(0.705), DRINK = s(0.8096), THERE = s(0.919), SEVEN = s(0.946);
const D15 = d(0.1063), LEFT2 = d(0.2129), CANAD = d(0.4045), PETRO = d(0.4852), GIB = d(0.5889), MEET = d(0.8749), OCEAN = d(0.9624);
// ── 1 · el muelle: el barril que se escapa y el barco que zarpa ─────────────────────────────────────────────────
const ESC = 1.9, ATRAPA = 4.15;
const p1 = (t) => {
  const r = lin(t, ESC, ESC + 2.5), z = lin(t, LEFT, P2 + 2.2) * 0.62;
  const o = { encuadre: 'muelle', carga: lerp(0.62, 0.96, lin(t, 0, LEFT)), zarpa: z, ...(t < ATRAPA ? { rueda: r } : {}) };
  const g = T.puerto(R, t, o);
  const S = 160, br = t < ATRAPA ? (g.barril ?? [64, 160]) : [234, 160];   // donde se para el barril tras el rebote
  // el marinero de la amarra de popa: la suelta en «left» y la recoge
  const mar1 = t > LEFT - 0.25 && t < LEFT + 0.6;
  R.actor(EL.marineroMC, 112, S, t, { dir: 1, brazos: mar1, sonrisa: t > LEFT + 0.6, habla: t > LEFT + 0.8 && t < LEFT + 1.6 && pul(t, 9) });
  if (t > LEFT) { const u = lin(t, LEFT, LEFT + 0.7); R.linea(122, 150, Math.round(lerp(134, 126, u)), Math.round(lerp(134, 157, u)), H('#8a7a5a')); }
  // la gaviota del noray: sale volando cuando el barril choca
  const choque = ESC + 2.0;   // rueda llega al noray en 0,8
  if (t < choque) R.gaviota(262, 147 + (pul(t, 1.3) ? 0 : 1), t * 0.2, 0); else { const v = t - choque; pajaro(262 + v * 30, 147 - v * 26 - v * v * 4, t, H('#f2f2ee')); }
  // el estibador del torno: gira la manivela, ve escaparse el barril, corre detrás y lo atrapa
  let ex, edir = 1, eo = {};
  if (t < ESC) { ex = 136; eo = { sostiene: [156 + Math.round(Math.cos(t * 5) * 3), 147 + Math.round(Math.sin(t * 5) * 3)] }; }
  else if (t < ESC + 0.4) { ex = 136; eo = { sorpresa: true }; }
  else if (t < ATRAPA) { ex = Math.round(lerp(136, br[0] - 20, lin(t, ESC + 0.4, ATRAPA))); eo = { anda: true, sorpresa: true }; }
  else { ex = br[0] - 15; eo = { sostiene: [br[0], br[1] - 12], sonrisa: t < LEFT + 0.3, triste: t > LEFT + 1.2 }; }
  // cuando lo atrapa, lo levanta: el barril va en sus manos
  if (t >= ATRAPA) { const A = R.actor(EL.estibadorMC, ex, S, t, { dir: edir, ...eo }); barrilT(A.mano[0] + 3, A.mano[1] - 2, 6, false, 0.4); if (t > LEFT + 1.0) R.bocadillo(ex + 8, S - 30, { icono: '?' }); }
  else R.actor(EL.estibadorMC, ex, S, t, { dir: edir, ...eo });
  if (t > ESC && t < ESC + 0.5) R.bocadillo(144, S - 30, {});
  T.puertoDelante(R, t, o);
};
// ── 2 · el diario de cerca: el manifiesto suma 1701 ────────────────────────────────────────────────────────────
const p2 = (t) => {
  const pag = lerp(0.12, 0.5, suave(lin(t, P2 + 0.1, N1701 - 0.3)));
  const o = { encuadre: 'camarote', camara: 'diario', estado: 'viaje', pagina: pag };
  T.abordo(R, t, o);
  // la botella de vino y la copa sobre la mesa, abajo a la derecha, que se mecen con el barco
  const mc = Math.round(Math.sin(t * 1.1) * 1);
  { const bx = 284 + mc, by = 168; R.rect(bx - 5, by - 22, bx + 5, by, C.k); R.rect(bx - 4, by - 21, bx + 4, by - 1, H('#3a1a24')); R.rect(bx - 2, by - 30, bx + 2, by - 21, C.k); R.rect(bx - 1, by - 29, bx + 1, by - 22, H('#3a1a24'));
    R.rect(bx - 2, by - 32, bx + 2, by - 30, H('#c8a040')); R.linea(bx - 3, by - 19, bx - 3, by - 6, H('#7a4a5a')); R.rect(bx - 3, by - 14, bx + 3, by - 9, H('#e8dcc0')); R.rect(bx - 2, by - 13, bx + 2, by - 10, H('#8a2a3a'));
    const cx = 262 + mc, cy = 170; R.rect(cx - 4, cy - 15, cx + 4, cy - 15, C.k); R.poligono([[cx - 4, cy - 14], [cx + 4, cy - 14], [cx + 2, cy - 8], [cx - 2, cy - 8]], H('#d8e0e8')); R.poligono([[cx - 3, cy - 12], [cx + 3, cy - 12], [cx + 2, cy - 9], [cx - 2, cy - 9]], H('#8a2a3a'));
    R.linea(cx, cy - 8, cx, cy - 2, H('#c8d0d8')); R.linea(cx - 3, cy - 1, cx + 3, cy - 1, H('#c8d0d8')); R.pset(cx - 2, cy - 13, H('#ffffff')); }
  // la mano señala la suma en «1,701», baja por la columna en «barrels» y da dos golpecitos junto al vino en «wine»
  // (el brazo entra en diagonal desde abajo: la muñeca baja, junto al borde; la mano lleva un lápiz cuya punta subraya
  // la suma en «1,701», la golpea dos veces en «barrels» y en «wine» va a dar dos golpecitos a la botella)
  const suma = [153, 128];   // el final de la suma del manifiesto (decorado: diario, o.pagina 0,5)
  const a = suave(lin(t, N1701 - 0.7, N1701 - 0.1)), c = suave(lin(t, WINE - 0.7, WINE - 0.1)), fuera = suave(lin(t, P3 - 0.7, P3 - 0.1));
  let hx = lerp(196, 166, a), hy = lerp(200, 150, a);
  hx = lerp(hx, 268, c); hy = lerp(hy, 154, c); hy = lerp(hy, 204, fuera);
  let px = t > N1701 - 0.1 && t < N1701 + 0.9 ? suma[0] - 22 + Math.round(Math.min(1, (t - N1701 + 0.1) * 1.6) * 22) : suma[0] + 2, py = suma[1] + 4;
  if (t > BARRELS && t < BARRELS + 0.7) py -= (Math.floor(t * 7) % 2) * 2;
  if (c > 0) { px = lerp(px, 284, c); py = lerp(py, 146, c); if (t > WINE && t < WINE + 0.7) px -= (Math.floor(t * 7) % 2) * 2; }
  if (t > N1701 - 0.7) {
    // el lápiz, de 22 px, de la mano hacia donde apunta (si la mano aún está lejos, no llega)
    { const ax = hx - 6, ay = hy - 4, dd = Math.hypot(px - ax, py - ay) || 1, L = Math.min(22, dd); px = ax + (px - ax) * L / dd; py = ay + (py - ay) * L / dd;
      R.linea(Math.round(ax), Math.round(ay + 1), Math.round(px), Math.round(py) + 1, C.k); R.linea(Math.round(ax), Math.round(ay), Math.round(px), Math.round(py), H('#e8c040'));
      R.pset(Math.round(px), Math.round(py), H('#3a3a44')); R.pset(Math.round(ax), Math.round(ay), H('#e88a8a')); }
    T.brazo(R, Math.round(hx + 22), Math.round(hy + 40), Math.round(hx), Math.round(hy), '#3a3a5a', -1, { codo: [Math.round(hx + 18), Math.round(hy + 18)] });
    if (t > N1701 - 0.1 && t < N1701 + 1.0) R.linea(suma[0] - 22, suma[1] + 4, Math.max(suma[0] - 22, Math.round(px)), suma[1] + 4, H('#3a3a44')); }
  // el 1701 grande que salta sobre la mesa cuando la voz lo dice
  if (t > N1701 - 0.05) { const bo = t < N1701 + 0.25 ? Math.round(Math.sin((t - N1701) * 12) * -3) : 0; R.numero('1701', 96, 176 + bo, { tam: 16, centro: true }); }
  // la suma se ilumina cuando la voz dice el número
  if (t > N1701 - 0.05 && t < BARRELS + 1.4) { const k = pul(t, 10) ? H('#e8c040') : H('#f8e8a0'); R.linea(suma[0] - 22, suma[1] - 9, suma[0] - 2, suma[1] - 9, k); R.linea(suma[0] - 22, suma[1] + 3, suma[0] - 2, suma[1] + 3, k); R.linea(suma[0] - 23, suma[1] - 8, suma[0] - 23, suma[1] + 2, k); R.linea(suma[0] - 1, suma[1] - 8, suma[0] - 1, suma[1] + 2, k); }
  T.abordoDelante(R, t, o);
};
// ── 3 · a toda vela de día: la familia y los siete marineros ─────────────────────────────────────────────────
const yd = (u) => -15 - 3 * (u / 64) ** 2 - (u > 0 ? 2 * (u / 64) ** 3 : 0);
const p3 = (t) => {
  const o = { encuadre: 'alta', luz: 'dia', estado: 'viaje', velas: 'todas', bandazo: 0.2 };
  const g = T.mar(R, t, o);
  // el barco no devuelve su proyección: se reconstruye (semejanza) con la popa y la proa vivas que sí devuelve
  const la = [-62, yd(-62)], lb = [108, -34], A0 = g.popa ?? [96, 122], B0 = g.proa ?? [266, 107];
  const du = lb[0] - la[0], dv = lb[1] - la[1], dX = B0[0] - A0[0], dY = B0[1] - A0[1], nn = du * du + dv * dv;
  const ar = (dX * du + dY * dv) / nn, ai = (dY * du - dX * dv) / nn;
  const Pb = (u, v) => { const uu = u - la[0], vv = v - la[1]; return [Math.round(A0[0] + ar * uu - ai * vv), Math.round(A0[1] + ai * uu + ar * vv)]; };
  const pie = (u) => { const [x, y] = Pb(u, yd(u)); return [x, y + 1]; };
  // la familia a popa: Briggs al timón, Sarah y Sophia que juegan
  { const [x, y] = pie(-57); R.actor(EL.briggsMC, x - 7, y, t, { dir: 1, sostiene: [x + 9, y - 13], sonrisa: t > THERE }); }
  { const [x, y] = pie(-48); R.actor(EL.sarahMC, x - 7, y, t, { dir: 1, habla: t > P3 + 1.6 && t < THERE && pul(t, 8), sonrisa: true }); }
  { const [x, y] = pie(-40); R.actor(EL.sophiaMC, x - 7, y, t, { dir: -1, salto: t > P3 + 1.2 && t < P3 + 2.4 ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0, sonrisa: true }); }
  // los siete marineros (camisas distintas): cinco en cubierta y dos en la verga del trinquete
  const PALS = [{ C: '#7a5a3a', W: '#e8e0cc' }, { C: '#2a3a5a', W: '#d8dce8' }, { C: '#8a3a2a', W: '#e8e0cc' }, { C: '#5a6a3a', W: '#f0e8d8' }, { C: '#3a3a44', W: '#c8d8e8' }, { C: '#9a7a4a', W: '#e8d8c0' }, { C: '#4a2a3a', W: '#e8e0cc' }]
    .map((p) => Object.fromEntries(Object.entries(p).map(([k, c]) => [k, H(c)])));
  const SITIO = [[-25, 0], [-14, 0], [3, 0], [16, 0], [46, 0], [22, -52], [38, -52]];
  const xs = [];
  SITIO.forEach(([u, vv], i) => { const [x, y] = vv ? Pb(u, vv) : pie(u); xs.push([x, y]);
    let op = { dir: i % 2 ? -1 : 1, pal: PALS[i] };
    if (i === 0) { const bebe = t < DRINK + 0.5; op = { ...op, dir: 1, sostiene: bebe ? [x + 9, y - 15 - Math.round(lin(t, P3, DRINK - 0.2) * 3)] : undefined, sorpresa: t > DRINK && t < DRINK + 0.6, sonrisa: t > DRINK + 0.8 }; }
    if (i === 1) op = { ...op, dir: -1, dedo: t > P3 + 0.15 && t < DRINK + 0.6, enfado: t > P3 + 0.15 && t < DRINK + 0.6, habla: t > P3 + 0.15 && t < DRINK + 0.6 && pul(t, 9) };
    if (i === 3) op = { ...op, dir: 1, sostiene: [x + 10, y - 12 + Math.round(Math.sin(t * 4) * 3)] };   // tira de una driza
    if (i === 4) op = { ...op, dir: 1, dedo: Math.sin(t * 1.5) > 0.4 };   // el de proa señala el rumbo
    if (i >= 5) op = { ...op, dir: i === 5 ? 1 : -1, brazos: Math.sin(t * 3 + i) > 0.6, sonrisa: true };
    if (i >= 5) { R.linea(x - 10, y + 3, x + 10, y + 3, H('#3a2a1c')); R.linea(x - 10, y + 2, x - 10, y - 1, H('#3a2a1c')); }   // el marchapié de la verga bajo sus pies
    const A = R.actor(EL.marineroMC, x - 7, y, t, op);
    if (i === 0 && op.sostiene) { const [mx, my] = A.mano; R.rect(mx - 1, my - 4, mx + 3, my + 1, C.k); R.rect(mx, my - 3, mx + 2, my, H('#c8c8d0')); R.pset(mx + 4, my - 2, C.k); }
    if (i === 3) { const [mx, my] = A.mano; const [tx, ty] = Pb(30, -64); R.linea(mx, my, tx, ty, H('#8a7a5a')); }
  });
  // el barril junto al de la jarra
  { const [x, y] = pie(-31); barrilP(x, y, 0.8, false); }
  // la X roja sobre la jarra en «drinking»
  if (t > DRINK - 0.1 && t < DRINK + 0.9) { const [x, y] = xs[0]; R.icono('X', x + 4, y - 44, H('#d83a2a'), C.k, 2); }
  // los siete se cuentan: 1 a 7, cada número en su cartelito oscuro sobre la cabeza
  for (let i = 0; i < 7; i++) { const t0 = THERE + i * 0.16; if (t < t0) continue; const [x, y] = xs[i], b = t < t0 + 0.12 ? 1 : 0, yy = y - 36 - b;
    R.rect(x - 6, yy - 9, x + 6, yy + 2, C.k); R.rect(x - 5, yy - 8, x + 5, yy + 1, H('#24304e')); R.pset(x, yy + 3, C.k);
    R.numero(String(i + 1), x - 2, yy, { color: H('#f8e070'), sombra: false }); }
  T.marDelante(R, t, o);
};
// ── 4 · el muelle del Dei Gratia: el calendario del 7 al 15 ──────────────────────────────────────────────────
const muelleDG = () => {
  cieloT(0, 75, [H('#7a9ab8'), H('#90acc4'), H('#a8bccc'), H('#c4ccd0')]);
  // la otra orilla: almacenes, chimeneas y mástiles
  for (let k = 0; k < 24; k++) { const x0 = k * 14 - 6, w = 10 + Math.round(hs(k, 2) * 6), al = 6 + Math.round(hs(k, 3) * 12), cl = k % 3 ? H('#8a8c98') : H('#7a7480');
    R.rect(x0, 72 - al, x0 + w, 74, cl); R.linea(x0, 72 - al, x0 + w, 72 - al, H('#9ea2ac')); for (let j = 74 - al; j < 72; j += 3) for (let i = x0 + 2; i < x0 + w - 1; i += 3) R.pset(i, j, H('#5e6070')); }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 36 + Math.round(hs(k, 7) * 10), top = 36 + Math.round(hs(k, 8) * 14); if (x > 270 && top < 50) continue; R.linea(x, top, x, 72, H('#6a6670')); R.linea(x - 5, top + 6, x + 5, top + 6, H('#6a6670')); R.linea(x - 4, top + 13, x + 4, top + 13, H('#6a6670')); R.linea(x, top, x + 14, 70, H('#8a8890')); }
  // el muelle de tablas en perspectiva
  madera(0, 122, 319, 179, [H('#c8a878'), H('#a88458'), H('#7a5a38'), H('#4a321e')], 7, 2);
  R.rect(0, 120, 319, 123, H('#4a321e')); R.linea(0, 120, 319, 120, H('#d8b888'));
  for (let x = 6; x < 320; x += 38) { R.rect(x, 124, x + 3, 130, H('#3a2818')); }
  // el cobertizo de la izquierda: tablas verticales, puerta, farol
  for (let x = 0; x <= 84; x++) for (let y = 52; y <= 121; y++) { const xx = x % 9; let c = xx === 0 ? H('#4a3a2a') : (Math.sin(y * 0.2 + x * 1.3) > 0.85 ? H('#9a7a5a') : H('#7a5e44')); if (hs(x, y, 4) > 0.97) c = H('#5a4634'); R.pset(x, y, c); }
  R.poligono([[-4, 54], [44, 45], [92, 54]], H('#4a3a3a')); R.linea(-4, 54, 44, 45, H('#6a5450')); R.linea(44, 45, 92, 54, H('#2a2024'));
  for (let i = 0; i < 9; i++) R.linea(2 + i * 10, 53 - Math.round(i < 5 ? i * 1.8 : (8 - i) * 1.8), 2 + i * 10, 54, H('#3a2e2e'));
  R.rect(-2, 54, 88, 56, H('#2a2024'));
  R.rect(56, 72, 80, 121, C.k); R.rect(57, 73, 79, 121, H('#3a2a1e')); R.linea(68, 73, 68, 121, H('#2a1e14')); R.rect(76, 96, 77, 98, H('#c8a040'));
  R.rect(6, 100, 30, 121, H('#5a4634')); for (let k = 0; k < 3; k++) R.linea(6, 104 + k * 6, 30, 104 + k * 6, H('#3a2e22'));   // cajas
  // la amarra y los norays
  R.rect(298, 112, 306, 121, H('#2a2a30')); R.rect(297, 110, 307, 112, H('#3a3a44'));
  // charcos en las tablas
  for (const [x, y, w] of [[150, 170, 22], [60, 150, 14], [280, 176, 18], [200, 146, 12]]) { R.linea(x, y, x + w, y, H('#9aa8b4')); R.linea(x + 3, y + 1, x + w - 3, y + 1, H('#7a8a98')); R.pset(x + 4, y, H('#e8f0f4')); }
  // la carretilla con dos barriles azules y la pila de cajas de la derecha
  R.linea(176, 166, 200, 156, C.k); R.linea(176, 165, 200, 155, H('#8a6a48')); R.disco(204, 168, 5, C.k); R.disco(204, 168, 3, H('#6a5a48')); R.pset(204, 168, H('#c8c0b0'));
  R.poligono([[192, 150], [222, 150], [218, 164], [196, 164]], C.k); R.poligono([[193, 151], [221, 151], [217, 163], [197, 163]], H('#7a5a38'));
  for (let k = 0; k < 4; k++) { const x = 250 + (k % 2) * 22, y = 166 - Math.floor(k / 2) * 16; R.rect(x, y - 15, x + 20, y, C.k); R.rect(x + 1, y - 14, x + 19, y - 1, H('#b08a5a')); R.linea(x + 1, y - 8, x + 19, y - 8, H('#7a5a38')); R.linea(x + 1, y - 14, x + 19, y - 1, H('#8a6a48')); R.linea(x + 1, y - 1, x + 19, y - 14, H('#8a6a48')); R.linea(x + 1, y - 14, x + 19, y - 14, H('#d4b080')); }
  // un rollo de cabo
  R.disco(240, 168, 8, H('#5a4a30')); R.disco(240, 168, 6, H('#a88a58')); R.disco(240, 168, 4, H('#7a6440')); R.disco(240, 168, 2, H('#5a4a30'));
};
// (el plano se pinta y luego se voltea entero, para no repetir la composición del muelle del plano 1 —almacén a la
// izquierda, barco a la derecha—; el calendario, sus cifras y los pájaros se pintan después del volteo)
const VOLTEO = new Uint32Array(320 * 180);
const p4 = (t) => {
  capa('muelleDG', muelleDG);
  // nubes fijas que derivan poco (fuera de la esquina de Atom y de la barra del año, ya volteadas)
  for (const [x, y, w, k] of [[100, 36, 34, 0], [182, 38, 36, 1], [240, 52, 40, 2], [130, 62, 26, 3]]) nube(x + Math.sin(t * 0.3 + k) * 5, y, w, [H('#f2f2f0'), H('#d8dce0'), H('#aab4c0')], 72);
  agua(t, 75, 119, [H('#7e909c'), H('#5a7080'), H('#3e5464'), H('#2a3a48')], 85, 319, 0.8);
  // el Dei Gratia amarrado, con las velas aferradas; en «left» suelta la amarra y se separa un poco
  const sale = suave(lin(t, LEFT2 + 0.2, P5 + 1)), bx = 214 + sale * 10, by = 114 + Math.round(Math.sin(t * 1.4) * 0.6);
  const B = bergantin(bx, by, 1.04, { casco: 'dg', t, velas: sale * 0.4, barriles: true });   // los topes quedan por debajo de la barra del año
  if (sale < 0.05) { const [a, b] = B.P(55, 12); R.linea(a, b, 302, 112, H('#8a7a5a')); }
  // la plancha del muelle a la cubierta
  const pl0 = [150, 136], pl1 = B.cubierta(-6);
  R.linea(pl0[0], pl0[1], pl1[0], pl1[1] + 2, C.k); R.linea(pl0[0], pl0[1] - 1, pl1[0], pl1[1] + 1, H('#a88458')); R.linea(pl0[0], pl0[1] - 2, pl1[0], pl1[1], H('#c8a878'));
  // los barriles de petróleo en el muelle (azules), en pila: van quedando menos
  const quedan = 6 - Math.floor(lin(t, P4, P5) * 3);
  const PIL = [[96, 138], [106, 138], [116, 138], [126, 138], [101, 129], [111, 129], [121, 129], [106, 120], [116, 120]];
  PIL.forEach(([x, y], i) => { if (i < quedan + 3) barrilT(x, y, 5, true, 0.3 * i); });
  // el estibador sube un barril por la plancha (en bucle)
  const ciclo = ((t - P4) / 2.1) % 1, u = suave(ciclo);
  { const x = lerp(pl0[0] - 4, pl1[0] - 10, u), y = lerp(pl0[1] + 18, pl1[1] + 18, u);
    barrilT(x + 14, y - 8, 5, true, -u * 6); R.actor(EL.estibadorMC, Math.round(x - 6), Math.round(y), t, { dir: 1, anda: true, sostiene: [Math.round(x + 9), Math.round(y - 10)] }); }
  // Morehouse cuenta los barriles con el dedo y en «left» sube por la plancha
  const sube = suave(lin(t, LEFT2 - 0.4, P5 - 0.1));
  const mx = sube < 0.01 ? 132 : lerp(132, pl0[0] - 2, lin(sube, 0, 0.35)) + (sube > 0.35 ? lerp(0, pl1[0] - pl0[0] - 6, lin(sube, 0.35, 1)) : 0);
  const my = sube < 0.35 ? lerp(160, pl0[1] + 18, lin(sube, 0, 0.35)) : lerp(pl0[1] + 18, pl1[1] + 17, lin(sube, 0.35, 1));
  const cuenta = t > P4 + 0.6 && t < LEFT2 - 0.5;
  R.actor(EL.morehouseMC, Math.round(mx), Math.round(Math.min(160, my)), t, { dir: cuenta ? -1 : 1, anda: sube > 0 && sube < 1, dedo: cuenta && pul(t, 3), habla: t > D15 && t < D15 + 0.8 && pul(t, 8), sonrisa: t > LEFT2 });
  // el marinero de proa suelta la amarra en «left»
  R.actor(EL.marineroMC, 286, 128, t, { dir: -1, brazos: t > LEFT2 - 0.1 && t < LEFT2 + 0.5, sonrisa: t > LEFT2 + 0.5 });
  barrilT(206, 147, 5, true, 0.2); barrilT(214, 146, 5, true, 1.1);
  // la gaviota que pasea por las cajas
  { const gx = 254 + Math.round(Math.abs(((t * 6) % 24) - 12)); R.gaviota(gx, 133, t, 1); }
  // el farol sobre la puerta del cobertizo
  R.linea(68, 58, 68, 62, C.k); R.rect(65, 62, 71, 70, C.k); R.rect(66, 63, 70, 69, pul(t, 3.1) ? H('#f8d870') : H('#e8b848'));
  barrilP(14, 180, 1.4, true); barrilP(32, 182, 1.4, true);
  // EL VOLTEO
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) VOLTEO[y * 320 + x] = R.pget(x, y);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(319 - x, y, VOLTEO[y * 320 + x]);
  for (let k = 0; k < 3; k++) pajaro(((t * (14 + k * 5) + k * 120) % 380) - 30, 54 + k * 6 + Math.sin(t * 2 + k) * 2, t, H('#3a3a44'));
  // EL CALENDARIO de la pared (ya a la derecha): del 7 al 15, hoja a hoja
  const cx = 264, cy = 60;
  R.rect(cx - 1, cy - 1, cx + 43, cy + 41, C.k); R.rect(cx, cy, cx + 42, cy + 40, H('#f2ecd8')); R.rect(cx, cy, cx + 42, cy + 8, H('#b83a2a')); R.rect(cx, cy + 8, cx + 42, cy + 8, H('#8a2a20'));
  R.rect(cx + 1, cy + 37, cx + 42, cy + 40, H('#d8d0b8')); R.linea(cx, cy + 38, cx + 42, cy + 38, H('#c8c0a8'));
  R.pset(cx + 21, cy - 3, H('#2a2a30')); R.linea(cx + 14, cy, cx + 21, cy - 3, H('#5a4a3a')); R.linea(cx + 28, cy, cx + 21, cy - 3, H('#5a4a3a'));
  for (let k = 0; k < 5; k++) R.pset(cx + 5 + k * 8, cy + 3, H('#f2ecd8'));
  const dia = 7 + Math.min(8, Math.floor(lin(t, P4 + 0.15, D15 - 0.05) * 8 + 1e-6));
  R.numero(String(dia), cx + 22, cy + 33, { tam: 16, centro: true, color: dia === 15 ? H('#b83a2a') : H('#2a2a30') });
  // las hojas arrancadas que vuelan hacia el agua
  for (let k = 0; k < 8; k++) { const t0 = P4 + 0.15 + (k + 1) * (D15 - 0.05 - P4 - 0.15) / 8; if (t < t0 || t > t0 + 1.6) continue; const v = t - t0;
    const x = cx + 20 - v * 40 + Math.sin(v * 6 + k) * 4, y = cy + 20 - v * 10 + v * v * 12; R.rect(Math.round(x) - 3, Math.round(y) - 2, Math.round(x) + 3, Math.round(y) + 2, H('#e8e0c8')); R.linea(Math.round(x) - 3, Math.round(y) - 2, Math.round(x) + 3, Math.round(y) - 2, H('#b83a2a')); }
  if (t > D15 && t < D15 + 0.5) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t; R.pset(Math.round(cx + 21 + Math.cos(a) * 25), Math.round(cy + 21 + Math.sin(a) * 25), H('#f8e070')); }
};
// ── 5 · al atardecer, el faro de Sandy Hook en primer plano; el Dei Gratia, pequeño, se aleja ─────────────────
const faroF = () => {
  // el cielo del atardecer en franjas tramadas, del malva al oro
  cieloT(0, 96, [H('#4a4a7a'), H('#6a5a8a'), H('#9a6a8a'), H('#c8806a'), H('#e8a060'), H('#f4c478')]);
  // la costa lejana de Nueva Jersey, baja y azulada, a la derecha
  R.poligono([[150, 96], [190, 91], [230, 93], [262, 90], [320, 92], [320, 97], [150, 97]], H('#5a4a6a'));
  for (let x = 196; x < 300; x += 9) R.pset(x, 92 + (x % 3), H('#f8d890'));
  // el agua de la bahía detrás de la punta (quieta: la tapa casi toda la arena)
  for (let y = 97; y <= 179; y++) for (let x = 0; x < 200; x++) R.pset(x, y, tono([H('#c88a7a'), H('#9a6a7a'), H('#6a4a6a'), H('#4a3a5a')], (y - 97) / 40, x, y));
  for (let i = 0; i < 30; i++) { const x = Math.round(hs(i, 21) * 140), y = 98 + Math.round(hs(i, 22) * 14); R.linea(x, y, x + 3, y, H('#e8b090')); }
  // la punta de arena y las rocas del primer plano, a la izquierda
  R.poligono([[0, 120], [60, 112], [130, 122], [170, 140], [200, 180], [0, 180]], H('#8a7458'));
  for (let i = 0; i < 260; i++) { const x = Math.round(hs(i, 11) * 190), y = 116 + Math.round(hs(i, 12) * 64); if (y > 112 + x * 0.2 + (x > 130 ? (x - 130) * 0.9 : 0)) R.pset(x, y, hs(i, 13) > 0.5 ? H('#a89070') : H('#6a5844')); }
  // las rocas: bloques irregulares de aristas planas, con la luz del poniente en el filo de arriba
  for (const [x, y, r, k] of [[150, 152, 13, 0], [178, 168, 15, 1], [126, 170, 11, 2], [108, 144, 8, 3]]) {
    const pts = []; for (let i = 0; i < 7; i++) { const an = Math.PI + i * Math.PI / 6, rr = r * (0.75 + hs(i, k, 31) * 0.4); pts.push([Math.round(x + Math.cos(an) * rr * 1.2), Math.round(y + Math.sin(an) * rr)]); }
    pts.push([x + Math.round(r * 1.2), y + 4], [x - Math.round(r * 1.2), y + 4]);
    R.poligono(pts.map(([a, b]) => [a, b + 1]), H('#2a2230')); R.poligono(pts, H('#4a4050'));
    R.poligono([pts[1], pts[2], pts[3], [x, y]], H('#5a4e5e')); R.linea(pts[3][0], pts[3][1], pts[5][0], pts[5][1], H('#e89a70')); R.linea(pts[2][0], pts[2][1], pts[3][0], pts[3][1], H('#c8806a'));
    R.linea(x - 2, y - 2, x + 3, y + 3, H('#2a2230')); }
  for (let i = 0; i < 30; i++) { const x = Math.round(hs(i, 14) * 110), y = 118 + Math.round(hs(i, 15) * 10); R.linea(x, y, x + 1, y - 3, H('#6a7a4a')); R.linea(x + 2, y, x + 3, y - 4, H('#8a9a5a')); }
  // la casa del farero, con su ventana encendida
  R.rect(70, 92, 112, 122, C.k); R.rect(71, 93, 111, 122, H('#d8c8b0')); for (let y = 95; y < 122; y += 3) R.linea(71, y, 111, y, H('#c4b098'));
  R.poligono([[66, 93], [91, 78], [116, 93]], C.k); R.poligono([[68, 92], [91, 79], [114, 92]], H('#8a3a2a')); R.linea(91, 79, 114, 92, H('#5a2218'));
  R.rect(80, 100, 88, 108, C.k); R.rect(81, 101, 87, 107, H('#f8d070')); R.linea(84, 101, 84, 107, C.k);
  R.rect(96, 104, 104, 122, C.k); R.rect(97, 105, 103, 122, H('#5a3a2a')); R.rect(104, 70, 108, 80, C.k); R.rect(105, 71, 107, 80, H('#8a4a3a'));
  // EL FARO grande: torre troncocónica blanca con su franja, la galería y la linterna
  R.poligono([[18, 124], [58, 124], [52, 34], [24, 34]], C.k); R.poligono([[19, 123], [57, 123], [51, 35], [25, 35]], H('#f2eee2'));
  for (let y = 36; y < 123; y++) { const xd = Math.round(51 + (y - 35) * 6 / 88); R.pset(xd, y, H('#c8bca8')); R.pset(xd - 1, y, H('#d8ccb8')); R.pset(Math.round(25 - (y - 35) * 6 / 88) + 1, y, H('#fffaf0')); }
  R.poligono([[21, 96], [55, 96], [54, 84], [22, 84]], H('#b83a2a'));
  for (const y of [52, 72, 104]) { R.rect(35, y, 40, y + 6, C.k); R.rect(36, y + 1, 39, y + 5, H('#3a4a6a')); }
  R.rect(16, 30, 60, 34, C.k); R.rect(17, 31, 59, 33, H('#2a2a30')); for (let x = 18; x < 60; x += 3) R.linea(x, 26, x, 30, H('#2a2a30')); R.linea(16, 26, 60, 26, H('#2a2a30'));
  R.rect(26, 24, 50, 26, C.k);
  R.rect(28, 25, 48, 25, H('#3a3a44'));
};
const p5 = (t) => {
  capa('faroF', faroF);
  // nubes del poniente (rosa y malva), fijas, que derivan poco
  for (const [x, y, w, k] of [[118, 52, 40, 0], [204, 40, 44, 1], [262, 70, 30, 2], [160, 78, 26, 3]]) nube(x + Math.sin(t * 0.35 + k) * 4, y, w, [H('#f8c8a0'), H('#d89a9a'), H('#8a6a8a')], 94);
  // la linterna del faro (encima de la galería, y ≥ 23) y su haz que barre el cielo
  { const x0 = 38, y0 = 25; R.rect(x0 - 8, y0 - 1, x0 + 8, y0 + 0, C.k);
    const a = (t * 1.6) % (Math.PI * 2), k = Math.cos(a), on = k > 0;
    if (on) for (let r = 12; r < 150; r += 1) { const half = r * 0.07, cx = x0 + Math.round(r * Math.sign(Math.sin(a) || 1) * Math.abs(k)), cy = y0 + 4; if (cx < 0 || cx > 319) break;
      for (let d = -half; d <= half; d++) { const y = Math.round(cy + d); if (tranquila(cx, y) || y < 23) continue; if (bay(cx, y) < 0.42 * (1 - r / 160)) R.pset(cx, y, H('#fff0b8')); } }
    R.disco(x0, y0 + 4, 3, on ? H('#fffae0') : H('#e8c860')); }
  // el sol que se pone y su reguero en el agua; el mar del atardecer
  R.disco(244, 90, 9, H('#f8c060')); R.disco(244, 90, 7, H('#fce8a0'));
  const orilla = (y) => Math.max(150, y <= 122 ? 0 : y <= 140 ? Math.ceil(130 + (y - 122) * 40 / 18) + 1 : Math.ceil(170 + (y - 140) * 30 / 40) + 1);
  agua(t, 97, 179, [H('#c88a7a'), H('#9a6a7a'), H('#6a4a6a'), H('#4a3a5a'), H('#2e2a44')], orilla, 319, 0.9);
  for (let i = 0; i < 18; i++) { const y = 99 + i * 4, x = 244 + Math.round(Math.sin(t * 3 + i) * (3 + i)); R.linea(x - 2 - i % 3, y, x + 2 + i % 3, y, H('#fce8a0')); }
  // la espuma que lame la orilla
  for (let y = 123; y < 180; y += 2) { const x = orilla(y) + Math.round((Math.sin(t * 2.4 + y * 0.3) + 1) * 2); R.pset(x, y, H('#fff4e8')); R.pset(x + 1, y, H('#f8dcc8')); }
  // el Dei Gratia, pequeño y a contraluz, que se aleja a toda vela hacia el sol (al este)
  const u = lin(t, P5, P6), bx = lerp(176, 226, u), by = 104 + Math.round(Math.sin(t * 1.6) * 0.6), sc = lerp(0.56, 0.4, u);
  bergantin(bx, by, sc, { casco: 'dg', t, velas: 1, rot: Math.sin(t * 1.3) * 0.02 });
  for (let k = 0; k < 5; k++) { const x = Math.round(bx - 40 * sc - k * 7), y = by + 2 + (k % 2); R.linea(x - 3, y, x + 3, y, H('#f8e0c0')); }
  // la boya roja que se mece y la espuma que rompe en las rocas
  { const bx2 = 214, by2 = 150 + Math.round(Math.sin(t * 2.2) * 2), ba = Math.sin(t * 2.2) * 0.15;
    R.poligono([[bx2 - 6, by2], [bx2 + 6, by2], [bx2 + 3 + Math.round(ba * 10), by2 - 16], [bx2 - 3 + Math.round(ba * 10), by2 - 16]], C.k); R.poligono([[bx2 - 5, by2 - 1], [bx2 + 5, by2 - 1], [bx2 + 2 + Math.round(ba * 10), by2 - 15], [bx2 - 2 + Math.round(ba * 10), by2 - 15]], H('#c83a2a'));
    R.linea(bx2 - 4, by2 - 7, bx2 + 4, by2 - 7, H('#f2eee2')); R.disco(bx2 + Math.round(ba * 12), by2 - 18, 2, H('#c8a040')); R.linea(bx2 - 10, by2 + 1, bx2 + 10, by2 + 1, H('#f8e0c0')); }
  for (const [x, y, k] of [[164, 160, 0], [190, 176, 1], [140, 178, 2]]) { const f = (t * 0.9 + k * 0.33) % 1; if (f < 0.5) { const r = Math.round(2 + f * 12); for (let i = -r; i <= r; i += 2) R.pset(x + i, y - Math.round(Math.sqrt(Math.max(0, r * r - i * i)) * 0.5), H('#fff4e8')); } }
  // el farero sale con su farol, saluda al barco en «Canadian vessel» y en «Gibraltar» señala al este, por donde va
  const fu = suave(lin(t, P5 + 0.2, CANAD - 0.3)), fx = Math.round(lerp(96, 120, fu));
  const F = R.actor(EL.marineroMC, fx, 136, t, { dir: 1, anda: fu > 0 && fu < 1, pal: { C: H('#2a3a5a'), W: H('#d8dce8') }, brazos: t > CANAD && t < PETRO + 0.4 && pul(t, 6), dedo: t > GIB - 0.2, sostiene: t < CANAD ? true : undefined, sonrisa: t > CANAD });
  if (t < CANAD) { const [mx, my] = F.mano; R.rect(mx - 2, my - 1, mx + 2, my + 5, C.k); R.rect(mx - 1, my, mx + 1, my + 4, pul(t, 7) ? H('#f8d870') : H('#e8b848')); }
  // las gaviotas que vuelven a las rocas
  for (let k = 0; k < 4; k++) pajaro(((t * (14 + k * 4) + k * 90) % 380) - 30, 50 + k * 9 + Math.sin(t * 2 + k) * 3, t, H('#2a2230'));
};
// ── 6 · la carta: las dos rutas avanzan y se juntan ──────────────────────────────────────────────────────────
const p6 = (t) => {
  const r1 = lerp(0.28, 1, suave(lin(t, P6 + 0.2, MEET))), r2 = lerp(0.0, 0.8, suave(lin(t, P6 + 0.2, MEET)));
  const o = { encuadre: 'mapa', ruta: r1, ruta2: r2 };
  const g = T.mar(R, t, o);
  const [ex, ey] = g.encuentro ?? [206, 101];
  // en «meet», el punto del encuentro late con un círculo y un «?»
  // en «meet», un aro de tinta roja que late alrededor de los dos barquitos (el negro junto a Santa María, el verde en el
  // punto del encuentro): solo el contorno, sin tapar la carta
  const sm = g.santaMaria ?? [183, 107], mx0 = (sm[0] + ex) / 2, my0 = (sm[1] + ey) / 2;
  if (t > MEET - 0.1) { const v = ((t - MEET + 0.1) % 1.1) / 1.1; R.anillo(mx0, my0, 17 + v * 5, H('#c83a2a')); R.anillo(mx0, my0, 18 + v * 5, H('#c83a2a')); if (v < 0.5) R.anillo(mx0, my0, 23 + v * 10, H('#d86a4a'), 2); }
  if (t > OCEAN - 0.4) R.bocadillo(Math.round(mx0), Math.round(my0) - 24, { icono: '?' });
  // la polilla que da vueltas a la lámpara
  { const a = t * 5; pajaro(300 + Math.cos(a) * 9, 112 + Math.sin(a * 1.3) * 6, t, H('#5a4a3a')); }
  T.marDelante(R, t, o);
};
const efectos = [[0.6, 'campana'], [ESC + 0.05, 'toc'], [ESC + 2.0, 'boing'], [LEFT, 'campana'], [P2 + 0.3, 'papel'], [N1701, 'golpecito'], [WINE + 0.05, 'golpecito'],
  [P3 + 0.2, 'ola'], [DRINK, 'boing'], [THERE + 0.1, 'brillo'], [P4 + 0.3, 'papel'], [D15, 'pop'], [LEFT2, 'silbato'], [P5 + 0.3, 'viento'], [P5 + 2.4, 'campana'], [P6 + 0.4, 'lapiz'], [MEET, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, cartela: '1872', año: 1872 });
''')

E['mc-hallazgo'] = ('El hallazgo', r'''// MC-HALLAZGO (frases 9–10), 1872, sin cartela. Golpe en «abordo». Seis planos:
// 1. «On December 4th, between the Azores and the coast of Portugal»: Santa María en la carta; la mano abre el compás
//    desde la marca hacia Portugal; el barquito negro deriva solo y el verde del Dei Gratia entra por la derecha.
// 2. «the lookout on the Dei Gratia spotted a ship moving erratically… no one at the wheel»: la cubierta del Dei
//    Gratia; el vigía da el aviso («!») en «spotted»; Morehouse llega a la regala con el catalejo; Deveau y Wright
//    señalan el barco que da bandazos; en «wheel», «?».
// 3. «They followed her for a couple of hours. No one answered their signals»: el catalejo; abajo a la izquierda, la
//    mano con el reloj de bolsillo cuya aguja corre; las banderas del Dei Gratia en su driza; el Mary Celeste da
//    bandazos, su cubierta vacía; en «No one answered», «?» y nada.
// 4. «The first mate, Oliver Deveau, went aboard with the second mate, John Wright. They found an empty ship, but not a
//    wrecked one»: GOLPE en «abordo»: la cubierta vacía; Deveau asoma por el portalón y sube; anda por detrás de las
//    escotillas hasta el palo mayor; en «John Wright» sube Wright; en «empty» miran a todos lados («?»); en «not a
//    wrecked one» Deveau da con los nudillos en el palo: firme.
// 5. «There were more than three feet of water in the hold and one of the pumps had been taken apart»: la cubierta
//    desde arriba; la mano entra por la derecha y tira de la anilla de la varilla, que tiembla y gotea; un aro marca lo
//    mojado (hasta el 3); en «pumps», otro aro marca las piezas de la bomba desmontada.
// 6. «The only lifeboat was gone. So were the sextant, the chronometer and almost all of the ship's papers»: la
//    escotilla principal de cerca, con los calzos del bote vacíos y las trincas cortadas que baten; en «gone» el
//    contorno del bote a puntos parpadea y se apaga; Deveau sale de la caseta con la caja del sextante, vacía; Wright,
//    con la del cronómetro, vacía; en «papers», el cajón de los papeles, vacío («?»).''', PRE + r'''
const v = (k) => en('vigia', k), a = (k) => en('abordo', k);
const P2 = v(0.2855), P3 = v(0.7487), P4 = a(0), P5 = a(0.4002), P6 = a(0.6925);
const AZORES = v(0.1323), PORTUGAL = v(0.2173), SPOT = v(0.3816), ERRA = v(0.4652), WHEEL = v(0.6588), NOONE = v(0.8984), SIGNALS = v(0.9541);
const DEVEAU = a(0.0486), WRIGHT = a(0.1988), EMPTY = a(0.2766), WRECK = a(0.3308), TRES = a(0.4358), HOLD = a(0.5114), PUMPS = a(0.5887), APART = a(0.6282);
const GONE = a(0.7411), SEXT = a(0.8032), CRONO = a(0.8529), PAPERS = a(0.9657);
// ── 1 · Santa María en la carta: el compás mide ─────────────────────────────────────────────────────────────
const p1 = (t) => {
  const ab = suave(lin(t, 0.6, PORTUGAL));
  const o = { encuadre: 'mapa', camara: 'azores', compas: ab };
  const g = T.mar(R, t, o);
  // el barquito negro que deriva y el verde que entra por la derecha (recortes de papel)
  const mk = g.marca ?? [176, 68];
  const d = lin(t, 0, P2), bxx = lerp(mk[0] + 12, mk[0] + 52, d), byy = lerp(mk[1] - 3, mk[1] - 12, d) + Math.round(Math.sin(t * 3) * 1);
  const barquito = (x, y, c, dir) => { x = Math.round(x); y = Math.round(y); R.poligono([[x - 7, y], [x + 7, y], [x + 5, y + 4], [x - 5, y + 4]], C.k); R.poligono([[x - 6, y + 1], [x + 6, y + 1], [x + 4, y + 3], [x - 4, y + 3]], c);
    R.linea(x, y, x, y - 10, C.k); R.poligono([[x + 1, y - 9], [x + 1, y - 1], [x + 6 * dir, y - 2]], H('#f2ecd8')); R.poligono([[x - 1, y - 8], [x - 1, y - 1], [x - 5 * dir, y - 2]], H('#e8e0c8')); R.linea(x - 8, y + 5, x + 8, y + 5, H('#b8a878')); };
  barquito(bxx, byy, H('#1c1a20'), 1);
  const gx = lerp(338, 262, suave(lin(t, AZORES, P2))), gy = lerp(46, 52, lin(t, AZORES, P2));
  if (gx < 330) barquito(gx, gy, H('#2e5e3e'), -1);
  // la mano que sujeta el compás
  const cab = g.cabeza ?? [180, 40];
  T.brazo(R, cab[0] + 34, -10, cab[0] + 6, cab[1] - 2, '#3a3a5a', -1, { codo: [cab[0] + 30, cab[1] - 18] });
  T.marDelante(R, t, o);
};
// ── 2 · la cubierta del Dei Gratia: el vigía lo ve ───────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'encuentro', banderas: 0 };
  const g = T.mar(R, t, o);
  const S = g.suelo ?? 166;
  if (t > SPOT - 0.1 && t < SPOT + 1.2) R.bocadillo(52, 30, {});
  // Morehouse llega con el catalejo y mira; Deveau y Wright llegan y señalan
  const mh = suave(lin(t, SPOT - 0.3, SPOT + 1.2)), mx = Math.round(lerp(-16, 150, mh));
  const mira = mh >= 1;
  const A = R.actor(EL.morehouseMC, mx, S, t, { dir: 1, anda: mh > 0 && mh < 1, sostiene: mira ? [mx + 17, S - 19] : [mx + 13, S - 12] });
  { const [hx, hy] = A.mano; if (mira) { R.linea(hx - 4, hy, hx + 8, hy - 2, C.k); R.linea(hx - 4, hy - 1, hx + 8, hy - 3, H('#c8a040')); R.rect(hx + 7, hy - 4, hx + 9, hy - 1, H('#e8c860')); }
    else { R.linea(hx - 2, hy, hx + 6, hy, C.k); R.linea(hx - 2, hy - 1, hx + 6, hy - 1, H('#c8a040')); } }
  const dv = suave(lin(t, P2 + 0.2, ERRA - 0.2)), dx = Math.round(lerp(330, 190, dv));
  R.actor(EL.deveauMC, dx, S, t, { dir: dv >= 1 ? 1 : -1, anda: dv > 0 && dv < 1, dedo: t > ERRA && t < WHEEL + 1.0, habla: t > ERRA && t < WHEEL && pul(t, 8) });
  const wv = suave(lin(t, ERRA - 0.4, WHEEL - 0.6)), wx = Math.round(lerp(-20, 108, wv));
  R.actor(EL.wrightMC, wx, S, t, { dir: 1, anda: wv > 0 && wv < 1, dedo: wv >= 1 && t < WHEEL + 0.6, sorpresa: t > WHEEL - 0.1 && t < WHEEL + 0.8 });
  if (t > WHEEL - 0.05) R.bocadillo(dx + 8, S - 30, { icono: '?' });
  T.marDelante(R, t, o);
};
// ── 3 · el catalejo: nadie contesta ──────────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  const o = { encuadre: 'encuentro', camara: 'catalejo', pulso: 1 };
  const g = T.mar(R, t, o);
  const [cx, cy, rr] = g.circulo ?? [160, 92, 70];
  // la viñeta del tubo: tono tramado fuera del círculo y el brillo del latón
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const dd = Math.hypot(x - cx, y - cy); if (dd < rr + 4 || tranquila(x, y)) continue;
    const f = Math.min(1, (dd - rr - 4) / 60); if (bay(x, y) > 0.35 + f * 0.6) R.pset(x, y, dd < rr + 12 ? H('#2a2418') : H('#14121a')); }
  for (let k = 0; k < 40; k++) { const an = -2.4 + k * 0.025; R.pset(Math.round(cx + Math.cos(an) * (rr + 6)), Math.round(cy + Math.sin(an) * (rr + 6)), H('#8a7040')); }
  // la gaviota que cruza el círculo
  R.recorte([cx - rr, cy - rr, cx + rr, cy + rr]);
  { const gx = cx - rr + ((t - P3) * 30) % (rr * 2 + 20), gy = cy - 40 + Math.sin(t * 2) * 4; if (Math.hypot(gx - cx, gy - cy) < rr - 3) pajaro(gx, gy, t, H('#f2f2ee')); }
  R.recorte(null);
  // el reloj de bolsillo abajo a la izquierda: la aguja corre (las horas que lo siguen)
  { const x = 40, y = 148; R.disco(x, y, 17, C.k); R.disco(x, y, 16, H('#c8a040')); R.disco(x, y, 13, H('#f2ecd8')); R.rect(x - 2, y - 21, x + 2, y - 17, H('#c8a040')); R.disco(x, y - 23, 3, H('#c8a040')); R.disco(x, y - 23, 1, C.k);
    for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; R.pset(Math.round(x + Math.cos(an) * 11), Math.round(y + Math.sin(an) * 11), H('#2a2a30')); }
    const h = (t - P3) * 2.4; R.linea(x, y, Math.round(x + Math.cos(h - 1.5) * 10), Math.round(y + Math.sin(h - 1.5) * 10), H('#2a2a30')); R.linea(x, y, Math.round(x + Math.cos(h / 12 - 0.5) * 6), Math.round(y + Math.sin(h / 12 - 0.5) * 6), H('#2a2a30')); R.pset(x, y, C.k);
    T.brazo(R, x + 34, 198, x + 16, y + 8, '#3a3a5a', -1, { codo: [x + 32, y + 26] }); }
  // las banderas de señales del Dei Gratia que ondean en primer plano (fuera de foco) y no reciben respuesta
  { const sw = Math.round(Math.sin(t * 2) * 2); R.linea(244, 112 + sw, 320, 168 + sw, H('#5a5a64'));
    for (let k = 0; k < 3; k++) { const fx = 252 + k * 20, fy = 118 + sw + Math.round(k * 20 * 56 / 76), cs = [H('#e8c020'), H('#2a4ab0'), H('#d03a2a')][k], fl = Math.round(Math.sin(t * 7 + k) * 1);
      R.poligono([[fx, fy], [fx + 11, fy + 8 + fl], [fx + 9, fy + 18 + fl], [fx - 2, fy + 10]], cs); R.linea(fx, fy, fx - 2, fy + 10, H('#2a2a30')); } }
  if (t > NOONE - 0.05) R.bocadillo(g.barco ? g.barco[0] : 160, (g.barco ? g.barco[1] : 120) - 22, { icono: '?' });
  T.marDelante(R, t, o);
};
// ── 4 · GOLPE: suben a la cubierta vacía ──────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const o = { encuadre: 'cubierta', estado: 'hallazgo', subida: 1 };
  const g = T.abordo(R, t, o);
  const port = g.portalon ?? [48, 100];
  // los dos suben por el portalón (los pies de 112 a 100; o.subida repinta la borda por delante) y andan por la franja
  // de y ≈ 100, por detrás de las escotillas abiertas: Deveau hasta el palo mayor, Wright solo unos pasos
  const sube = (t0) => suave(lin(t, t0, t0 + 0.9));
  const x0 = port[0] - 7;
  if (t > DEVEAU - 0.5) { const u = sube(DEVEAU - 0.5), w = suave(lin(t, DEVEAU + 0.5, EMPTY - 0.6));
    const x = Math.round(lerp(x0, 186, w)), y = Math.round(lerp(112, 100, u) + w * 2);
    const mira = t > EMPTY - 0.2 && t < WRECK - 0.3, golpe = t > WRECK - 0.1 && t < WRECK + 0.9;
    R.actor(EL.deveauMC, x, y, t, { dir: mira ? (Math.floor((t - EMPTY) * 2.5) % 2 ? -1 : 1) : 1, anda: w > 0 && w < 1, sorpresa: mira, dedo: golpe, habla: t > WRECK + 0.9 && pul(t, 8) });
    if (mira) R.bocadillo(x + 8, y - 30, { icono: '?' });
    // el golpe con los nudillos en el palo: firme (tres rayitas de sonido)
    if (golpe && pul(t, 9)) for (let k = 0; k < 3; k++) R.linea(209 + 3, 80 + k * 4, 209 + 6, 79 + k * 4, H('#f2f2ee')); }
  if (t > WRIGHT - 0.4) { const u = sube(WRIGHT - 0.4), w = suave(lin(t, WRIGHT + 0.6, EMPTY + 0.2));
    const x = Math.round(lerp(x0, 92, w)), y = Math.round(lerp(112, 100, u));
    R.actor(EL.wrightMC, x, y, t, { dir: t > EMPTY + 0.3 && t < WRECK ? -1 : 1, anda: w > 0 && w < 1, sorpresa: t > EMPTY && t < WRECK + 0.3, sonrisa: t > WRECK + 0.6 }); }
  T.abordoDelante(R, t, o);
};
// ── 5 · la cubierta desde arriba: la varilla mojada y la bomba desmontada ─────────────────────────────────────
const p5 = (t) => {
  const o = { encuadre: 'cubierta', camara: 'bomba' };
  T.abordo(R, t, o);
  // la mano que llega por la derecha, señala lo mojado de la varilla en «three feet» y luego las piezas de la bomba
  const ent = suave(lin(t, P5 + 0.1, TRES - 0.3)), sal = suave(lin(t, P6 - 0.6, P6 - 0.1));
  const tira = t > TRES - 0.3 && t < PUMPS ? Math.round(Math.sin((t - TRES) * 6) * 2) : 0;   // tira de la anilla: la varilla tiembla y gotea
  const hx = lerp(336, 284, ent) + sal * 50 + tira, hy = lerp(126, 100, ent);
  // las gotas que caen de lo mojado
  for (let k = 0; k < 5; k++) { const ph = ((t * 1.3 + k * 0.37) % 1), x0 = 52 + k * 15, y0 = 128 - Math.round((x0 - 44) * 30 / 228); R.pset(x0, Math.round(y0 + 2 + ph * 14), H('#c8e0f0')); if (ph > 0.9) { R.pset(x0 - 1, y0 + 16, H('#c8e0f0')); R.pset(x0 + 1, y0 + 16, H('#c8e0f0')); } }
  // el círculo que marca lo mojado (más de tres pies) y luego la bomba
  if (t > TRES - 0.1 && t < PUMPS - 0.3) { const k = pul(t, 9) ? H('#f8e070') : H('#e8b040'); for (let i = 0; i < 80; i++) { const an = i / 80 * Math.PI * 2; for (const dr of [0, 1]) R.pset(Math.round(86 + Math.cos(an) * (44 + dr)), Math.round(120 + Math.sin(an) * (13 + dr)), k); } }
  if (t > APART - 0.2) { const k = pul(t, 9) ? H('#f8e070') : H('#e8b040'); for (let i = 0; i < 100; i++) { const an = i / 100 * Math.PI * 2; for (const dr of [0, 1]) R.pset(Math.round(200 + Math.cos(an) * (62 + dr)), Math.round(48 + Math.sin(an) * (26 + dr)), k); } }
  T.brazo(R, Math.round(hx + 52), Math.round(hy + 24), Math.round(hx), Math.round(hy), '#4a3a2a', -1, { codo: [Math.round(hx + 30), Math.round(hy + 22)] });
  T.abordoDelante(R, t, o);
};
// ── 6 · la escotilla de cerca: el bote ya no está ─────────────────────────────────────────────────────────────
const escotillaF = () => {
  cieloT(0, 46, [H('#6a7a8c'), H('#7e8c9c'), H('#929eac'), H('#a6b0ba')]);
  // el mar gris al fondo y la regala de enfrente con sus candeleros
  for (let y = 46; y <= 70; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([H('#4a5a6a'), H('#3e4e5e'), H('#344454'), H('#2a3a48')], (y - 46) / 24, x, y));
  R.rect(0, 68, 319, 74, H('#3a2a1c')); R.linea(0, 68, 319, 68, H('#8a6a48')); R.linea(0, 69, 319, 69, H('#6a4e34'));
  for (let x = 4; x < 320; x += 22) { R.rect(x, 70, x + 2, 86, H('#4a3624')); R.pset(x, 70, H('#8a6a48')); }
  madera(0, 74, 319, 86, [H('#d8c8a0'), H('#c4b088'), H('#a08a64'), H('#7a6648')], 4, 7);
  R.linea(0, 86, 319, 86, H('#5a4630'));
  for (let x = 14; x < 320; x += 44) { R.rect(x, 80, x + 3, 83, H('#2a2a30')); R.pset(x + 1, 80, H('#8a8a94')); }   // los imbornales
  // la cubierta de tablas mojadas
  madera(0, 87, 319, 179, [H('#c8b088'), H('#a88e68'), H('#86704e'), H('#3a2e22')], 8, 3);
  for (let i = 0; i < 16; i++) { const x = Math.round(hs(i, 3) * 300), y = 150 + Math.round(hs(i, 4) * 28), w = 6 + Math.round(hs(i, 5) * 14); R.linea(x, y, x + w, y, H('#9aa4ac')); R.linea(x + 2, y + 1, x + w - 2, y + 1, H('#7a8a94')); R.pset(x + 2, y, H('#d8e4ec')); }
  // la escotilla principal: brazola, tablas de la tapa, argollas y cuñas
  R.rect(36, 102, 232, 148, C.k); R.rect(38, 104, 230, 146, H('#6a4e34'));
  madera(42, 106, 226, 136, [H('#b89a70'), H('#9a7e58'), H('#7a6040'), H('#4a3826')], 6, 11);
  R.rect(38, 137, 230, 146, H('#5a4028')); R.linea(38, 138, 230, 138, H('#8a6a48')); R.linea(38, 146, 230, 146, C.k);
  for (const x of [52, 134, 216]) { R.disco(x, 142, 2, H('#2a2a30')); R.pset(x, 141, H('#8a8a94')); R.rect(x - 7, 139, x - 4, 144, H('#4a3624')); }
  // los dos calzos vacíos (cunas curvas de madera, grandes) donde iba el bote
  for (const x of [88, 182]) { R.poligono([[x - 22, 108], [x + 22, 108], [x + 22, 92], [x + 16, 92], [x + 10, 100], [x - 10, 100], [x - 16, 92], [x - 22, 92]], C.k);
    R.poligono([[x - 21, 107], [x + 21, 107], [x + 21, 93], [x + 16, 93], [x + 10, 101], [x - 10, 101], [x - 16, 93], [x - 21, 93]], H('#a87a4a'));
    R.linea(x - 21, 93, x - 16, 93, H('#d4a46a')); R.linea(x - 16, 93, x - 10, 101, H('#d4a46a')); R.linea(x - 10, 101, x + 10, 101, H('#d4a46a')); R.linea(x + 10, 101, x + 16, 93, H('#d4a46a'));
    R.linea(x - 21, 104, x + 21, 104, H('#7a5232')); R.rect(x - 2, 101, x + 2, 104, H('#5a5a64')); R.pset(x, 102, H('#a8a8b4')); }
  // las argollas de las trincas en la cubierta, a cada lado
  for (const x of [66, 110, 160, 204]) { R.disco(x, 158, 2, C.k); R.disco(x, 158, 1, H('#8a8a94')); }
  // el rollo de cabo, el balde volcado, el motón y la lona doblada
  R.disco(20, 162, 11, H('#5a4a30')); R.disco(20, 162, 9, H('#a88a58')); R.disco(20, 162, 6, H('#7a6440')); R.disco(20, 162, 3, H('#5a4a30')); R.disco(19, 161, 1, H('#c8a878'));
  R.poligono([[226, 162], [244, 158], [248, 170], [230, 174]], C.k); R.poligono([[227, 163], [243, 159], [246, 169], [231, 173]], H('#8a6a48')); R.linea(229, 166, 245, 162, H('#4a4a54')); R.disco(247, 164, 3, H('#3a2a1c'));
  R.rect(128, 158, 168, 170, C.k); R.rect(129, 159, 167, 169, H('#8a8a70')); R.linea(129, 163, 167, 163, H('#6a6a54')); R.linea(129, 159, 167, 159, H('#aaa890'));
  R.disco(100, 172, 4, C.k); R.disco(100, 172, 3, H('#7a5a38')); R.pset(100, 172, H('#c8c0b0')); R.linea(100, 168, 108, 160, H('#8a7a5a'));
  R.linea(170, 178, 224, 150, C.k); R.linea(170, 177, 224, 149, H('#8a6a48')); R.linea(224, 149, 228, 146, H('#5a5a64'));
  // la caseta a la derecha, más baja que la esquina de Atom, con su puerta abierta
  R.rect(254, 52, 319, 148, C.k); for (let x = 255; x <= 319; x++) for (let y = 53; y <= 148; y++) { const xx = (x - 255) % 7; R.pset(x, y, xx === 0 ? H('#5a4430') : (Math.sin(y * 0.3 + x) > 0.88 ? H('#b08a5a') : H('#94704a'))); }
  R.rect(252, 48, 319, 53, H('#4a3826')); R.linea(252, 48, 319, 48, H('#c8a878'));
  R.rect(264, 82, 292, 148, C.k); R.rect(265, 83, 291, 148, H('#1c1612')); R.linea(266, 84, 266, 148, H('#2a221a'));
  R.rect(300, 86, 314, 100, C.k); R.rect(301, 87, 313, 99, H('#5a7a9a')); R.linea(307, 87, 307, 99, C.k); R.linea(301, 93, 313, 93, C.k); R.pset(303, 89, H('#a8c0d8'));
  R.rect(294, 112, 298, 118, H('#c8a040'));
};
const p6 = (t) => {
  capa('escotillaF', escotillaF);
  // nubes bajas fijas que derivan poco (debajo de la barra del año y lejos de la esquina de Atom)
  for (const [x, y, w, k] of [[60, 38, 34, 0], [150, 40, 40, 1], [232, 39, 30, 2]]) nube(x + Math.sin(t * 0.4 + k) * 4, y, w, [H('#c8d0d8'), H('#a8b2bc'), H('#7a8694')], 45);
  for (let k = 0; k < 3; k++) pajaro(((t * (12 + k * 5) + k * 110) % 300) - 20, 30 + k * 6, t, H('#e8ecf0'));
  // el Dei Gratia, al pairo en el horizonte, y las crestas del mar que pasan
  bergantin(70, 64, 0.3, { casco: 'dg', t, velas: 0.5, rot: Math.sin(t * 1.2) * 0.03 });
  for (let i = 0; i < 16; i++) { const x = Math.round(((i * 41 + t * (10 + i % 3 * 4)) % 340) - 10), y = 52 + (i * 7) % 16; R.linea(x, y, x + 3 + i % 3, y, H('#c8d0d8')); }
  // las trincas cortadas que baten con el viento, desde sus argollas
  for (const [x0, k] of [[66, 0], [110, 1], [160, 2], [204, 3]]) { let x = x0, y = 157;
    for (let s2 = 0; s2 < 7; s2++) { const nx = x + Math.round(Math.sin(t * 6 + k + s2 * 0.7) * 2) + (k % 2 ? 1 : -1), ny = y - 3; R.linea(x, y, nx, ny, H('#c8a868')); R.linea(x + 1, y, nx + 1, ny, H('#8a7048')); x = nx; y = ny; }
    R.pset(x, y, H('#f2e2b8')); R.pset(x - 1, y - 1, H('#f2e2b8')); R.pset(x + 1, y - 1, H('#f2e2b8')); }
  // en «gone», el contorno del bote a trazos sobre los calzos parpadea, se tacha y se apaga
  const bo = lin(t, P6 + 0.05, P6 + 0.3) * (1 - lin(t, GONE + 0.7, GONE + 1.2));
  if (bo > 0 && (t < GONE || pul(t, 12))) { const B = H('#f8f8f0');
    // la silueta del bote (borda arriba, quilla curva que asienta en los calzos), a trazos
    for (let i = 0; i <= 90; i++) { if (i % 4 > 1) continue; const u = i / 90, x = Math.round(54 + u * 162), yt = 74 - Math.round(Math.sin(u * Math.PI) * 2) + Math.round(Math.abs(u - 0.5) * 6), yb = 74 + Math.round(Math.pow(Math.sin(u * Math.PI), 0.45) * 22);
      R.pset(x, yb, B); R.pset(x, yb + 1, B); R.pset(x, yt, B); R.pset(x, yt + 1, B); }
    for (let k = 0; k < 4; k++) { const x = 86 + k * 32; for (let y = 76; y <= 90; y += 4) { R.pset(x, y, B); R.pset(x, y + 1, B); } } }
  if (t > GONE - 0.1 && t < GONE + 1.1) R.icono('X', 126, 70, H('#d83a2a'), C.k, 3);
  // Deveau sale de la caseta con la caja del sextante, la abre: vacía; Wright con la del cronómetro, vacía
  const caja = (x, y, abierta, cs) => { R.rect(x - 7, y - 4, x + 7, y + 3, C.k); R.rect(x - 6, y - 3, x + 6, y + 2, cs); R.linea(x - 6, y - 3, x + 6, y - 3, mez(cs, H('#ffffff'), 0.3)); R.pset(x, y, H('#c8a040'));
    if (abierta) { R.rect(x - 7, y - 11, x + 7, y - 4, C.k); R.rect(x - 6, y - 10, x + 6, y - 5, H('#3a1a3a')); R.rect(x - 5, y - 9, x + 5, y - 6, H('#6a2a5a')); R.linea(x - 3, y - 8, x + 3, y - 7, H('#4a1a3a')); } };
  const dv = suave(lin(t, SEXT - 1.4, SEXT - 0.3)), dx = Math.round(lerp(272, 206, dv));
  if (t > SEXT - 1.4) { const A = R.actor(EL.deveauMC, dx, 160, t, { dir: -1, anda: dv > 0 && dv < 1, sostiene: true, sorpresa: t > SEXT && t < SEXT + 0.9, triste: t > PAPERS, habla: t > CRONO + 0.6 && t < PAPERS - 0.3 && pul(t, 8) }); caja(A.mano[0] - 2, A.mano[1], t > SEXT - 0.1, H('#6a3a22')); }
  const wv = suave(lin(t, CRONO - 1.1, CRONO - 0.2)), wx = Math.round(lerp(272, 236, wv));
  if (t > CRONO - 1.1) { const A = R.actor(EL.wrightMC, wx, 166, t, { dir: -1, anda: wv > 0 && wv < 1, sostiene: true, sorpresa: t > CRONO && t < CRONO + 0.9 }); caja(A.mano[0] - 2, A.mano[1], t > CRONO - 0.1, H('#3a2a1a')); }
  // en «papers», el cajón de los papeles, que el viento abre: vacío
  if (t > PAPERS - 1.2) { const u = suave(lin(t, PAPERS - 1.2, PAPERS - 0.4)), x = Math.round(lerp(330, 300, u)), y = 170; R.rect(x - 12, y - 10, x + 12, y, C.k); R.rect(x - 11, y - 9, x + 11, y - 1, H('#7a5232')); R.rect(x - 9, y - 7, x + 9, y - 3, H('#2a1e14')); R.linea(x - 11, y - 9, x + 11, y - 9, H('#a87a4a')); }
  if (t > PAPERS - 0.3) { R.bocadillo(dx + 8, 128, { icono: '?' }); R.bocadillo(wx + 8, 134, { icono: '?' }); }
};
const efectos = [[0.4, 'papel'], [PORTUGAL - 0.4, 'lapiz'], [P2 + 0.3, 'ola'], [SPOT, 'aviso'], [WHEEL, 'pop'], [P3 + 0.3, 'tic'], [NOONE, 'viento'],
  [P4, 'boom'], [DEVEAU, 'toc'], [WRIGHT + 0.3, 'toc'], [WRECK + 0.1, 'golpecito'], [P5 + 0.3, 'burbujas'], [APART, 'golpecito'],
  [P6 + 0.2, 'viento'], [GONE, 'pop'], [SEXT, 'cerrojo'], [CRONO, 'cerrojo'], [PAPERS, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1872 });
''')
