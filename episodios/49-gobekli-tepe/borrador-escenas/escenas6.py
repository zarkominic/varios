E = {}

# ── utilidades comunes a gb-tele y gb-patrones: tramas, mezclas, cifras de 3 × 5, nubes, pájaros, búferes fijos ──
UTIL = r'''
const ri = Math.round, H = (s) => hex(s), K = T.C.k;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const cl = (u) => Math.max(0, Math.min(1, u)), ease = (u) => u * u * (3 - 2 * u);
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
const pal = (a) => a.map((c) => H(c));
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111' };
const cifras = (s, x, y, c) => { for (const ch of String(s)) { const g = DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } };
const BOLLOS = [[-0.36, 0.08, 0.26], [-0.12, -0.12, 0.33], [0.16, -0.06, 0.3], [0.38, 0.1, 0.22], [0.02, 0.14, 0.3], [-0.24, 0.16, 0.2]];
// una nube de tres tonos (cs: [sombra de abajo, cuerpo, luz de arriba]) con el borde tramado
const nube = (cx, cy, w, cs) => {
  const x0 = ri(cx - w * 0.65), x1 = ri(cx + w * 0.65), y0 = ri(cy - w * 0.48), y1 = ri(cy + w * 0.36);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let d = 9; for (const [a, b, r] of BOLLOS) { const q = ((x - cx - a * w) ** 2 + ((y - cy - b * w) * 1.5) ** 2) / (r * w) ** 2; if (q < d) d = q; }
    if (d > 1 || (d > 0.8 && b4(x, y) < (d - 0.8) * 5)) continue;
    const v = (y - (cy - w * 0.3)) / (w * 0.5) + (d > 0.7 ? 0.25 : 0);
    R.pset(x, y, v > 0.82 ? cs[0] : v > 0.42 + b4(x, y) * 0.2 ? cs[1] : cs[2]); }
};
const pajaro = (x, y, t, c, k = 0) => { x = ri(x); y = ri(y); const f = Math.floor(t * 6 + k * 1.7) % 3; ps(x, y, c);
  if (f === 0) { ps(x - 1, y - 1, c); ps(x + 1, y - 1, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else if (f === 1) { ps(x - 1, y, c); ps(x + 1, y, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else { ps(x - 1, y + 1, c); ps(x + 1, y + 1, c); ps(x - 2, y + 1, c); ps(x + 2, y + 1, c); } };
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
// lo fijo de un plano, pintado una vez en su búfer y copiado en cada fotograma
const CACHE = {};
const fijo = (k, f) => { let b = CACHE[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); CACHE[k] = b; } R.buf.set(b); };
// rellena un rectángulo píxel a píxel con f(x, y) (devuelve el color o undefined para dejarlo)
const llena = (x0, y0, x1, y1, f) => { const B = R.buf; for (let y = Math.max(0, ri(y0)); y <= Math.min(179, ri(y1)); y++) for (let x = Math.max(0, ri(x0)); x <= Math.min(319, ri(x1)); x++) { const c = f(x, y); if (c !== undefined) B[y * 320 + x] = c; } };
const ovalo = (cx, cy, rx, ry, f) => llena(cx - rx, cy - ry, cx + rx, cy + ry, (x, y) => { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; return d <= 1 ? (typeof f === 'function' ? f(x, y, d) : f) : undefined; });
// zonas tranquilas: la de Atom (x 278–318, y 4–44) y la del año (x 20–170, y 0–20)
const quieta = (x, y) => (x > 272 && y < 48) || (x < 176 && y < 22);
// estrellas que titilan, fuera de las zonas tranquilas
const estrellas = (t, n, x0, y0, x1, y1, k = 1) => { for (let i = 0; i < n; i++) { const x = ri(x0 + h2(i, 1, k) * (x1 - x0)), y = ri(y0 + h2(i, 2, k) * (y1 - y0)); if (quieta(x, y)) continue;
  const b = Math.sin(t * (1.5 + h2(i, 3, k) * 3) + i), big = h2(i, 4, k) > 0.9; ps(x, y, b > 0.3 ? H('#fff8e0') : b > -0.4 ? H('#b8c0e0') : H('#6a7aa8'));
  if (big && b > 0) { ps(x + 1, y, H('#8a96c8')); ps(x - 1, y, H('#8a96c8')); ps(x, y + 1, H('#8a96c8')); ps(x, y - 1, H('#8a96c8')); } } };
// cielo tramado en degradado vertical (ramp de arriba a abajo)
const cieloG = (y0, y1, ramp, k = 0) => llena(0, y0, 319, y1, (x, y) => rmp(ramp, (y - y0) / (y1 - y0 + 1) * (ramp.length - 1) + (h2(x >> 4, y >> 3, k) - 0.5) * 0.4, x, y));
// madera con vetas (tablas horizontales de alto a)
const veta = (x, y, ramp, base, a = 9, k = 0) => { const tabla = Math.floor(y / a), j = y % a; if (j === 0) return ramp[0];
  return rmp(ramp, base + Math.sin(x * 0.05 + tabla * 2.1 + Math.sin(y * 0.6 + tabla) * 1.6) * 0.55 + (h2(x >> 3, tabla, k) - 0.5) * 0.7 + (j === 1 ? 0.5 : 0) + (j === a - 1 ? -0.5 : 0), x, y); };
// sillería (bloques de w × h con juntas)
const sillar = (x, y, ramp, w = 16, h = 8, k = 0) => { const fila = Math.floor(y / h), off = (fila & 1) * (w >> 1), col = Math.floor((x + off) / w), jx = (x + off) % w, jy = y % h;
  if (jx === 0 || jy === 0) return ramp[0]; return rmp(ramp, 2 + (h2(col, fila, k) - 0.5) * 1.4 + (jy === 1 ? 0.7 : 0) + (jx === w - 1 || jy === h - 1 ? -0.7 : 0) + (h2(x, y, k + 3) - 0.5) * 0.7, x, y); };
// tierra con chinas
const tierra = (x, y, ramp, base, k = 0) => { const c = h2(x >> 1, y >> 1, k); if (c > 0.985) return ramp[ramp.length - 1]; if (c < 0.012) return ramp[0];
  return rmp(ramp, base + (h2(x >> 2, y >> 2, k + 1) - 0.5) * 0.9 + (h2(x, y, k + 2) - 0.5) * 0.5, x, y); };
// una mata de hierba seca que se mece
const mata = (x, y, t, c1, c2, n = 5, alto = 6) => { for (let i = 0; i < n; i++) { const dx = (i - n / 2) * 1.4, s = Math.sin(t * 2 + x * 0.1 + i) * 1.2; R.linea(ri(x + dx), ri(y), ri(x + dx * 1.6 + s), ri(y - alto + (i & 1) * 2), i & 1 ? c1 : c2); } };
// la «X» roja y el visto verde
const equis = (x, y, s = 1, u = 1) => { if (u <= 0) return; const r = ri(6 * s * Math.min(1, u * 1.4)); for (let k = -r; k <= r; k++) for (const [a, b] of [[k, k], [k, -k]]) { rr(x + a - s, y + b - s, x + a + s, y + b + s, K); } for (let k = -r + 1; k <= r - 1; k++) for (const [a, b] of [[k, k], [k, -k]]) { rr(x + a - s + 1, y + b - s + 1, x + a + s - 1, y + b + s - 1, H('#e83a3a')); ps(x + a, y + b, H('#ff6a5a')); } };
// el contorno de puntos de un fantasma (lo que NO aparece): f(x, y) dice si está dentro
const fantasma = (x0, y0, x1, y1, dentro, t, a = 1) => { if (a <= 0) return; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (!dentro(x, y)) continue;
  const borde = !dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1) || !dentro(x, y + 1);
  if (borde) { if (((x + y + ri(t * 8)) & 3) < 3 && b4(x, y) < a) { ps(x, y, H('#ffffff')); tine(x + 1, y + 1, K, 0.3); } } else if (b4(x, y) < 0.4 * a) tine(x, y, H('#d8ecff'), 0.55); } };
'''

TELE_W = r'''const W = { TOO: en('serie', 0.0507), ARCH: en('serie', 0.0878), AND1: en('serie', 0.1493), N2022: en('serie', 0.1608), WIDELY: en('serie', 0.2006), TELEVISION: en('serie', 0.2250), ARGUED: en('serie', 0.2662), BEHIND: en('serie', 0.2952), GOBEKLI: en('serie', 0.3094), HAND: en('serie', 0.3736), SURVIVORS: en('serie', 0.3864), GREAT: en('serie', 0.4148), LOST: en('serie', 0.4222), CIVIL: en('serie', 0.4378), ICE: en('serie', 0.4769), WHO: en('serie', 0.5229), TAUGHT: en('serie', 0.5445), HUNTERS: en('serie', 0.5702), CARVE: en('serie', 0.5938), BUILD: en('serie', 0.6249), AND2: en('serie', 0.6870), SOCIAL: en('serie', 0.6972), VIDEOS: en('serie', 0.7485), N12: en('serie', 0.7722), CULTURES: en('serie', 0.8005), SHARING: en('serie', 0.8201), SAME: en('serie', 0.8492), HIDDEN: en('serie', 0.8694), AUTH: en('serie', 0.9221), DONT: en('serie', 0.9566), KNOW: en('serie', 0.9836), ONE: en('buitre', 0.0), FAVORITE: en('buitre', 0.0367), PILLAR: en('buitre', 0.0628), N43: en('buitre', 0.0746), SOCALLED: en('buitre', 0.1198), VULTURE: en('buitre', 0.1428), WHERE: en('buitre', 0.1896), RESEARCHERS: en('buitre', 0.2135), THOUGHT: en('buitre', 0.2271), N2017: en('buitre', 0.2786), STAR: en('buitre', 0.3300), MAP: en('buitre', 0.3381), COMET: en('buitre', 0.3685), STRIKE: en('buitre', 0.3772), N10950: en('buitre', 0.4038), BC: en('buitre', 0.4832), OTHER: en('buitre', 0.5483), ANSWERED: en('buitre', 0.5734), READ: en('buitre', 0.6181), CHOOSE: en('buitre', 0.6546), ANIMALS: en('buitre', 0.6801), COUNT: en('buitre', 0.6940), CONST: en('buitre', 0.7157), DONT2: en('buitre', 0.7613), AND3: en('buitre', 0.7765), FREEDOM: en('buitre', 0.8354), ANY: en('buitre', 0.8664), STONE: en('buitre', 0.8797), SAYING: en('buitre', 0.9114), ALREADY: en('buitre', 0.9600), LOOKING: en('buitre', 0.9765), AND4: en('basura', 0.0), NOWHERE: en('basura', 0.0513), HILL: en('basura', 0.0791), TURN: en('basura', 0.1123), ADVANCED: en('basura', 0.1463), WOULD: en('basura', 0.1900), BEHIND2: en('basura', 0.2143), METAL: en('basura', 0.2441), WRITING: en('basura', 0.2794), TOOLS: en('basura', 0.3148), STONE2: en('basura', 0.3578), NOT: en('basura', 0.3897), ANIMAL: en('basura', 0.4070), PLANT: en('basura', 0.4313), STEPPE: en('basura', 0.5061), WHAT: en('basura', 0.5179), TURNUP: en('basura', 0.5630), THOUSANDS: en('basura', 0.6143), FLINT: en('basura', 0.6552), GRINDING: en('basura', 0.7016), GAZELLE: en('basura', 0.7425), THE9: en('basura', 0.7945), EVERYDAY: en('basura', 0.7973), TRASH: en('basura', 0.8112), UNTIL: en('basura', 0.8798), NOBODY: en('basura', 0.9290), ANYTHING: en('basura', 0.9568), THIS: en('basura', 0.9845) };'''

# ── el último plano de gb-tele (la casa de la excavación). gb-patrones lo congela: es este MISMO bloque, copiado literal ──
CASA = r'''
// CASA · la casa de la excavación, la mesa de hallazgos (último plano de gb-tele; gb-patrones lo congela con este bloque,
// literal). La arqueóloga ordena las puntas de sílex en su bandeja y alza una en «everyday trash»; el arqueólogo entra con
// la caja de hallazgos, la deja en la mesa del fondo y señala los dibujos de pilares de la pared en «anything like this»;
// ella mira los dibujos y sonríe.
const cajaH = (x, y) => { x = ri(x); y = ri(y); rr(x - 8, y - 6, x + 8, y + 3, K); rr(x - 7, y - 5, x + 7, y + 2, H('#c8a46a')); rr(x - 7, y - 5, x + 7, y - 4, H('#e0c08a')); rr(x - 1, y - 5, x + 1, y + 2, H('#b08a50'));
  for (const [i, c] of [[-5, '#8a8478'], [-2, '#d8ccb0'], [3, '#5a5a62']]) { rr(x + i, y - 7, x + i + 2, y - 6, H(c)); } cifras('49', x + 2, y - 3, H('#5a3a1a')); };
const punta = (x, y, c = '#b8a68a') => { x = ri(x); y = ri(y); R.poligono([[x, y - 4], [x + 3, y], [x, y + 2], [x - 3, y]], K); R.poligono([[x, y - 3], [x + 2, y], [x, y + 1], [x - 2, y]], H(c)); ps(x - 1, y - 1, H('#e8dcc0')); };
const casaPlano = (t) => {
  const g = T.arqueologos(R, t, { encuadre: 'casa', anos: 2022 });
  // el arqueólogo entra por la derecha con la caja de hallazgos, la deja en la mesa del fondo y señala los dibujos
  const u = tramo(t, WC.THE9 + 0.1, WC.THE9 + 1.6), ax = ri(lerp(330, 262, ease(u)));
  const deja = t > WC.UNTIL - 0.4, señala = t > WC.ANYTHING - 0.15;
  const a = R.actor(EL.arqueologoGB, ax, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: !deja ? [ax - 3, 136] : undefined, dedo: señala, habla: t > WC.NOBODY && t < WC.THIS + 0.4, sonrisa: señala });
  if (!deja) cajaH(a.mano[0], a.mano[1]); else cajaH(188, 96);
  // la arqueóloga, tras la mesa, coge puntas del montón y las pasa a la bandeja; en «trash» alza una
  const alza = t > WC.TRASH - 0.1 && t < WC.UNTIL + 0.2, mira = t > WC.ANYTHING + 0.1;
  const vaiven = Math.sin(t * 3.2), mx = alza ? 214 : ri(222 + vaiven * 6), my = alza ? 128 : 146 + ri(Math.abs(vaiven) * 2);
  const b = R.actor(EL.arqueologaGB, 216, 150, t, { dir: -1, sostiene: [mx, my], sonrisa: mira, sorpresa: alza && t < WC.TRASH + 0.5, habla: false });
  if (alza) { punta(b.mano[0], b.mano[1] - 3, '#c8b494'); if (Math.sin(t * 9) > 0.4) destello(b.mano[0] + 3, b.mano[1] - 7, 2); }
  T.arqueologosDelante(R, t, { encuadre: 'casa', ordena: tramo(t, WC.THE9, WC.ANYTHING) });
  if (!alza) punta(b.mano[0], b.mano[1]);
  if (mira) R.bocadillo(b.cabeza[0], b.cabeza[1] - 4, { icono: '!' });
  return g;
};
'''

E['gb-tele'] = ('Lo que dice la tele', '''// GB-TELE (frases 17–19: «serie», «buitre», «basura»), cartela 2022. Diecisiete planos, cortados en la palabra:
// 1 · La cima al atardecer con la cubierta blanca: llega la furgoneta de la tele (parabólica, sin marcas), salen la
//   presentadora con el micro y el cámara; la arqueóloga de la criba se vuelve con su «!» en «archaeologists».
// 2 · El salón (hoy·salon): el espectador entra con el cuenco de palomitas y se sienta; la niña enciende la tele en
//   «2022» y sale el pilar bajo focos; el contador de visitas sube en «widely watched». Corta en «And».
// 3 · La tele de cerca (fondo local): el documental de la civilización perdida: la ciudad de pirámides se hunde en
//   «lost civilization» con el relámpago, la barca de los supervivientes huye hacia el hielo, nieva en «Ice Age». Corta en
//   «behind».
// 4 · El plató del rodaje (fondo local): claqueta; el «sabio» de túnica enseña en «taught», el cazador-actor talla el
//   pilar de corcho en «carve» y el otro alza un bloque de corcho con una mano en «build». Corta en «who».
// 5 · El escaparate de teles de noche (fondo local): las doce pantallas se encienden una a una en «12», cada una con un
//   monumento antiguo, y en «sharing» todas se ponen la misma imagen (el cometa sobre la pirámide); la gente se para.
// 6 · El dormitorio a oscuras (fondo local): en el portátil un hombre de traje cierra la cámara acorazada en
//   «authorities» y sale el candado en «don't want»; el chico deja las patatas, el gato levanta la cabeza. Corta en «same».
// 7 · El recinto D desde la pasarela (fondo local): la guía señala el pilar 43, que se rodea con su «43» en «Pillar 43»;
//   el buitre se enciende en «vulture stone»; un visitante hace una foto con flash.
// 8 · La piedra del buitre (hoy·buitre), 2017: los investigadores con la tableta y la carta del cielo; las
//   constelaciones se dibujan en «star map» y el cometa cae al disco en «comet strike». Corta en «where».
// 9 · La estepa de noche hace 12.900 años (fondo local): el niño señala el cometa, los cazadores se vuelven, «10950» y
//   un resplandor lejano en «BC»; las gacelas huyen.
// 10 · El aula del congreso (fondo local): la especialista en el atril; el puntero láser rodea el buitre (visto) en
//   «choose» y la serpiente (X) en «animals». Corta en «Other».
// 11 · La carta celeste sobre la mesa (inserto): la mano pone el buitre de papel y las estrellas se unen en
//   «constellations»; la serpiente no cuenta (X) en «don't»; en «freedom» pone una tetera… y también encaja. Corta en «count».
// 12 · Una roca cualquiera de noche (fondo local): la linterna barre la roca, los agujeros se unen en un cometa en «saying
//   what» y se borran en «looking for»; pasa un zorro, ulula una lechuza. Corta en «any».
// 13 · Las catas de la ladera (fondo local): el detector de metales calla; el arqueólogo lo golpea en «nowhere»; «?» en
//   «advanced civilization». Corta en «And».
// 14 · La criba desde arriba (inserto): las dos manos la sacuden; el engranaje, la tablilla y el martillo de metal
//   aparecen de puntos y se tachan en «metal», «writing» y «tools»; brilla el sílex en «stone». Corta en «would».
// 15 · La estepa de hace 11.500 años por la mañana (fondo local): la cazadora recoge trigo silvestre; un caballo y una
//   mazorca de puntos se tachan en «animal» y «plant»; las gacelas saltan en «steppe». Corta en «not».
// 16 · Las bandejas de hallazgos desde arriba (inserto): los números se disparan en «by the thousands»; la mano deja
//   una punta, una mano de moler y un hueso en «flint arrowheads», «grinding stones» y «gazelle bones».
// 17 · La casa de la excavación (arqueologos·casa): la arqueóloga alza la punta en «everyday trash», el arqueólogo deja
//   la caja y señala los dibujos de pilares en «anything like this». gb-patrones congela este plano.''', UTIL + TELE_W + "\nconst WC = W;\n" + CASA + r'''
const ME = { pres: '#c83a4a', cam: '#3a4a5a', caqui: '#8a7a54', azul: '#3a5a8a' };

// ── 1 · la cima al atardecer: la furgoneta de la tele llega a la colina ─────────────────────────────────────────────
const cerro1 = (x) => 108 - 36 * Math.exp(-(((x - 236) / 74) ** 2));
const techo1 = (x) => { const u = ((x - 166) % 34 + 34) % 34 / 34; return 48 + ri(9 * Math.sin(u * Math.PI)); };
const fondo1 = () => fijo('p1', () => {
  cieloG(0, 86, pal(['#2a2246', '#3e2c5a', '#5e3866', '#8a4464', '#b85a54', '#e07e4c', '#f4a85a', '#fcd488']), 1);
  // el sol bajo, con su halo
  for (let y = 52; y < 88; y++) for (let x = 36; x < 96; x++) { const d = Math.hypot(x - 64, y - 80) / 26; if (d < 1) tine(x, y, H('#fff0b0'), (1 - d) * 0.5); }
  R.disco(64, 80, 9, H('#ffe6a0')); R.disco(64, 80, 7, H('#fff6d0'));
  // sierras lejanas en dos capas
  llena(0, 66, 319, 90, (x, y) => { const s1 = 78 + Math.sin(x * 0.03) * 4 + Math.sin(x * 0.11) * 2, s2 = 84 + Math.sin(x * 0.05 + 2) * 3;
    if (y >= s2) return (x + y) & 1 ? H('#5a3e5a') : H('#64445e'); if (y >= s1) return b4(x, y) < 0.5 ? H('#7a5a78') : H('#86627a'); });
  // la llanura con sus bancales al atardecer
  llena(0, 88, 319, 112, (x, y) => { const banda = Math.floor((y - 88) / 3 + Math.sin(x * 0.02) * 1.5); return rmp(pal(['#4a3040', '#6a4040', '#8a5444', '#a8704c']), 1.2 + (banda & 1) * 0.8 + (h2(x >> 3, banda, 7) - 0.5), x, y); });
  for (let k = 0; k < 14; k++) { const x = ri(10 + h2(k, 0, 8) * 300), y = ri(92 + h2(k, 1, 8) * 14); if (x > 150) continue; rr(x, y - 2, x + 2, y, H('#3a2838')); ps(x + 1, y - 3, H('#4a3444')); }
  // el cerro con su tierra arada, encendido por la izquierda
  llena(120, 60, 319, 116, (x, y) => { const yh = cerro1(x); if (y < yh) return undefined; const pend = cerro1(x + 2) - cerro1(x - 2);
    return rmp(pal(['#4a3030', '#6a4234', '#8a583c', '#a87048', '#c88a56']), 2.2 - pend * 0.6 + ((y + ri(x * 0.3)) % 5 === 0 ? -0.8 : 0) + (h2(x >> 1, y >> 1, 9) - 0.5) * 0.6 - (y - yh) * 0.04, x, y); });
  // la cubierta blanca: velas de membrana entre mástiles, la sombra de debajo y los pilares en la penumbra
  for (let x = 166; x <= 302; x++) { const top = techo1(x), alero = 66 + ri(2 * Math.sin(((x - 166) % 34) / 34 * Math.PI)), base = ri(cerro1(x));
    for (let y = alero + 1; y < base; y++) R.pset(x, y, (x + y) & 1 ? H('#3a2836') : H('#44303e'));
    for (let y = top; y <= alero; y++) R.pset(x, y, rmp(pal(['#8a7a8e', '#b8a6b4', '#e0ccc8', '#fceee0']), 3.2 - (y - top) * 0.22 - (x - 166) * 0.004, x, y));
    R.pset(x, top - 1, K); R.pset(x, alero + 1, H('#5a4a5a')); }
  for (let x = 166; x <= 302; x += 34) { R.linea(x, techo1(x) - 4, x, ri(cerro1(x)), H('#4a3a4a')); R.linea(x + 1, techo1(x) - 3, x + 1, ri(cerro1(x)), H('#7a6a7a')); }
  for (let k = 0; k < 6; k++) { const x = 182 + k * 20, b = ri(cerro1(x)); rr(x - 3, b - 12, x + 3, b - 10, H('#6a5866')); rr(x - 1, b - 10, x + 1, b, H('#5e4e5e')); }
  // el suelo de grava del aparcamiento, con roderas, piedras y matas secas
  llena(0, 108, 319, 179, (x, y) => { if (y < 112 && y < cerro1(x)) return undefined;
    const rod = Math.abs(y - (150 + (x - 320) * 0.12)) < 2 || Math.abs(y - (160 + (x - 320) * 0.1)) < 2;
    return tierra(x, y, pal(['#3a2a2a', '#5a3e34', '#7a5640', '#9a7050', '#b88a62']), 2.3 + (y - 112) * 0.012 - (rod ? 0.9 : 0), 11); });
  // el montón de tierra de la excavación con sacos blancos, a la izquierda
  llena(0, 90, 74, 126, (x, y) => { const yh = 126 - 30 * Math.exp(-(((x - 26) / 30) ** 2)); if (y < yh) return undefined; return tierra(x, y, pal(['#4a3430', '#6a4a3a', '#8a6446', '#a87e56']), 1.6 + (x < 26 ? 0.8 : 0), 12); });
  for (const [x, y] of [[8, 112], [20, 108], [33, 110], [14, 118], [27, 117]]) { rr(x - 5, y - 3, x + 5, y + 3, K); rr(x - 4, y - 2, x + 4, y + 2, H('#e8dcd0')); rr(x - 4, y + 1, x + 4, y + 2, H('#b8aaa4')); ps(x, y - 2, H('#c8b8b0')); }
  // la cerca de estacas con cuerda y el poste del sendero (un pilar en T y una flecha)
  for (let x = 80; x < 160; x += 20) { rr(x, 98, x + 2, 114, K); rr(x + 1, 99, x + 1, 113, H('#8a6440')); }
  for (const yy of [102, 108]) for (let x = 81; x < 160; x++) ps(x, yy + ri(Math.sin((x - 81) / 20 * Math.PI) * 1.5), H('#d8c8a0'));
  rr(140, 82, 142, 112, K); rr(141, 83, 141, 111, H('#8a6440')); rr(130, 80, 156, 92, K); rr(131, 81, 155, 91, H('#e8c070'));
  rr(134, 83, 140, 84, H('#4a3020')); rr(136, 84, 138, 89, H('#4a3020')); R.poligono([[144, 86], [150, 86], [150, 83], [154, 86.5], [150, 90], [150, 87], [144, 87]], H('#4a3020'));
  for (let k = 0; k < 22; k++) { const x = ri(h2(k, 5, 13) * 318), y = ri(118 + h2(k, 6, 13) * 58); rr(x - 2, y - 1, x + 2, y + 1, K); rr(x - 1, y - 1, x + 1, y, H('#c8a888')); }
});
const furgo = (x, t, mov, puerta, plato) => { x = ri(x); const y0 = 112, y1 = 146;
  sombraS(x + 36, 152, 40, 0.5);
  R.poligono([[x + 1, y0 + 12], [x + 9, y0], [x + 72, y0], [x + 72, y1], [x + 1, y1]], K);
  R.poligono([[x + 2, y0 + 12], [x + 10, y0 + 1], [x + 71, y0 + 1], [x + 71, y1 - 1], [x + 2, y1 - 1]], H('#e6e2dc'));
  rr(x + 11, y0 + 2, x + 70, y0 + 3, H('#ffffff')); rr(x + 2, y1 - 7, x + 71, y1 - 2, H('#b4aea6')); rr(x + 2, y0 + 26, x + 71, y0 + 26, H('#cac4bc'));
  for (let i = x + 2; i <= x + 71; i++) tine(i, y0 + 4 + ri((i - x) * 0.02), H('#f4a060'), 0.35);
  rr(x + 2, y0 + 17, x + 71, y0 + 19, H('#e8703a')); rr(x + 2, y0 + 20, x + 71, y0 + 21, H('#2a8a9a'));
  R.poligono([[x + 3, y0 + 12], [x + 10, y0 + 3], [x + 21, y0 + 3], [x + 21, y0 + 13], [x + 3, y0 + 13]], H('#2e3a58')); R.linea(x + 8, y0 + 11, x + 14, y0 + 5, H('#8aa0c8')); R.linea(x + 11, y0 + 11, x + 16, y0 + 6, H('#5a6a90'));
  rr(x + 24, y0 + 4, x + 34, y0 + 12, K); rr(x + 25, y0 + 5, x + 33, y0 + 11, H('#2e3a58')); ps(x + 26, y0 + 6, H('#8aa0c8'));
  // la puerta corredera: al abrirse deja ver el interior con sus pantallas
  const off = ri(puerta * 17); rr(x + 38, y0 + 3, x + 58, y1 - 3, H('#16161e'));
  for (let k = 0; k < 3; k++) { rr(x + 41, y0 + 6 + k * 8, x + 49, y0 + 11 + k * 8, H('#2a3a5a')); ps(x + 42 + ((ri(t * 5) + k) % 7), y0 + 8 + k * 8, H('#7affa8')); ps(x + 51, y0 + 7 + k * 8, Math.sin(t * 6 + k) > 0 ? H('#ff4a3a') : H('#5a1a1a')); }
  rr(x + 38 + off, y0 + 2, x + 58 + off, y1 - 2, K); rr(x + 39 + off, y0 + 3, x + 57 + off, y1 - 3, H('#dcd8d0')); rr(x + 39 + off, y0 + 17, x + 57 + off, y0 + 21, H('#e8703a')); rr(x + 39 + off, y0 + 20, x + 57 + off, y0 + 21, H('#2a8a9a'));
  rr(x + 41 + off, y0 + 24, x + 44 + off, y0 + 25, H('#5a5a62')); R.linea(x + 39 + off, y0 + 3, x + 39 + off, y1 - 3, H('#f4f0ea'));
  // el faro encendido y su luz hacia delante (a la izquierda)
  rr(x + 2, y0 + 22, x + 5, y0 + 25, H('#fff4c0')); for (let i = 1; i < 30; i++) for (let j = -i * 0.3; j <= i * 0.3; j++) tine(x + 2 - i, y0 + 23 + j + i * 0.2, H('#fff0b0'), 0.18 * (1 - i / 30));
  rr(x + 66, y0 + 22, x + 70, y0 + 25, H('#c82a2a'));
  // las ruedas que giran
  for (const wx of [x + 15, x + 57]) { R.disco(wx, y1 + 1, 7, K); R.disco(wx, y1 + 1, 5, H('#2a2a30')); R.disco(wx, y1 + 1, 2, H('#a8a8b0')); const a = -x * 0.25; ps(wx + Math.cos(a) * 4, y1 + 1 + Math.sin(a) * 4, H('#5a5a62')); ps(wx - Math.cos(a) * 4, y1 + 1 - Math.sin(a) * 4, H('#5a5a62')); }
  // el polvo detrás de las ruedas mientras se mueve
  if (mov > 0) for (let k = 0; k < 10; k++) { const u = (t * 1.6 + k / 10) % 1, px = x + 70 + u * 30 + k, py = 146 - u * 10 + Math.sin(k) * 3; for (let q = 0; q < 3; q++) tine(px + q, py, H('#c8a888'), 0.5 * (1 - u) * mov); }
  // la parabólica, que se levanta
  const mx = x + 48; rr(mx - 1, y0 - 4, mx + 1, y0, K); const ang = lerp(0.1, 1.0, plato), dx = Math.cos(ang) * 9, dy = -Math.sin(ang) * 9;
  for (let s = -1; s <= 1; s += 0.1) { const px = mx + dx * 0.3 - dy * s, py = y0 - 5 + dy * 0.3 + dx * s * 0.4; R.linea(ri(px), ri(py), ri(px + dx * 0.25), ri(py + dy * 0.25), s > 0.4 ? H('#c8c4bc') : H('#f4f0ea')); }
  R.linea(ri(mx), y0 - 5, ri(mx + dx * 0.9), ri(y0 - 5 + dy * 0.9), K); ps(mx + dx * 0.9, y0 - 5 + dy * 0.9, Math.sin(t * 5) > 0 ? H('#ff4a3a') : H('#8a2a2a'));
};
const criba = (x, y, dx) => { x = ri(x + dx); y = ri(y); rr(x - 10, y - 3, x + 10, y + 1, K); rr(x - 9, y - 2, x + 9, y, H('#a87a4a')); for (let i = -8; i <= 8; i += 2) ps(x + i, y - 1, H('#5a4a3a')); };
const carretilla = (x, y) => { x = ri(x); y = ri(y);
  R.linea(x - 16, y - 12, x - 4, y - 8, K); R.linea(x - 16, y - 11, x - 4, y - 7, H('#6a5040'));
  R.poligono([[x - 6, y - 14], [x + 14, y - 14], [x + 10, y - 4], [x - 2, y - 4]], K); R.poligono([[x - 5, y - 13], [x + 13, y - 13], [x + 9, y - 5], [x - 1, y - 5]], H('#3a7a4a'));
  for (let i = -4; i <= 12; i++) ps(x + i, y - 14 - (i % 3 === 0 ? 1 : 0), H('#8a6446')); rr(x - 3, y - 15, x + 11, y - 14, H('#a07a54'));
  R.disco(x + 10, y - 3, 3, K); R.disco(x + 10, y - 3, 2, H('#2a2a30')); R.linea(x, y - 4, x - 1, y, K); };
const p1 = (t) => {
  fondo1();
  // nubes de tres tonos a tres velocidades y una bandada de estorninos
  const CS = pal(['#8a4a6a', '#d0786a', '#ffc896']);
  nube(196 + t * 0.6, 34, 38, CS); nube(40 + t * 1.3, 46, 32, CS); nube(108 + t * 2.0, 60, 22, pal(['#9a5468', '#e08a70', '#ffd0a0']));
  for (let k = 0; k < 5; k++) pajaro(20 + t * 22 + k * 7 + Math.sin(k) * 3, 40 + (k & 1) * 4 + Math.sin(t * 2 + k) * 1.5, t, H('#2a1a2a'), k);
  // dos trabajadores diminutos bajo la cubierta
  for (let k = 0; k < 2; k++) { const x = ri(196 + k * 40 + Math.sin(t * 0.7 + k * 2) * 10), b = ri(cerro1(x)); rr(x, b - 5, x + 1, b - 1, H('#3a2a3a')); ps(x, b - 6, H('#c88a5a')); ps(x + (k ? 1 : 0), b - 7, H('#f4f0e0')); }
  // el arqueólogo empuja la carretilla de tierra desde la izquierda
  const uC = tramo(t, 1.4, 3.6), cx = ri(lerp(-34, 58, ease(uC)));
  R.actor(EL.arqueologoGB, cx, 150, t, { dir: 1, anda: uC > 0 && uC < 1, brazos: t > W.ARCH + 0.5, sorpresa: t > W.ARCH + 0.5 });
  carretilla(cx + 24, 151);
  // la arqueóloga de la criba: la sacude hasta que oye a la tele; se vuelve con su «!»
  const oye = t > W.ARCH, dxC = oye ? 0 : Math.sin(t * 16) * 2;
  rr(84, 140, 86, 152, K); rr(104, 140, 106, 152, K); rr(85, 141, 85, 151, H('#8a6440')); rr(105, 141, 105, 151, H('#8a6440'));
  const a = R.actor(EL.arqueologaGB, 100, 150, t, { dir: oye ? 1 : -1, sostiene: oye ? undefined : [97, 139], sorpresa: oye && t < W.ARCH + 1.2, sonrisa: t > W.ARCH + 1.2 });
  criba(95, 140, dxC); if (!oye) for (let k = 0; k < 5; k++) { const u = (t * 2 + k / 5) % 1; ps(88 + k * 4 + dxC, 141 + u * 9, H('#8a6446')); }
  if (oye) R.bocadillo(a.cabeza[0], a.cabeza[1] - 4, { icono: '!' });
  // la presentadora con el micro y el cámara salen de la furgoneta
  const PARA = 3.3, uP = tramo(t, PARA + 0.6, PARA + 1.8), px = ri(lerp(232, 164, ease(uP)));
  if (t > PARA + 0.6) { const p = R.actor(EL.periodista, px, 150, t, { dir: -1, anda: uP > 0 && uP < 1, sostiene: [px + 1, 134], habla: uP >= 1, sonrisa: uP >= 1 });
    rr(p.mano[0] - 1, p.mano[1] - 5, p.mano[0], p.mano[1] + 1, K); R.disco(p.mano[0], p.mano[1] - 6, 2, H('#2a2a30')); ps(p.mano[0] - 1, p.mano[1] - 7, H('#8a8a90')); rr(p.mano[0] - 2, p.mano[1] - 3, p.mano[0] + 1, p.mano[1] - 2, H('#e8703a')); }
  const uK = tramo(t, PARA + 0.2, PARA + 1.6), kx = ri(lerp(234, 128, ease(uK))), kd = uK >= 1 ? 1 : -1;
  if (t > PARA + 0.2) { const c = R.actor(EL.tecnico, kx, 150, t, { dir: kd, anda: uK > 0 && uK < 1, sostiene: [kx + (kd > 0 ? 12 : 4), 129] });
    const [mx, my] = c.mano, d = kd; rr(mx - 6 * d - 2, my - 6, mx + 6 * d - 2, my + 1, K); rr(mx - 5 * d - 2, my - 5, mx + 5 * d - 2, my, H('#3a3a44')); rr(mx + 5 * d - 1, my - 5, mx + 8 * d - 1, my - 1, K); ps(mx + 6 * d - 1, my - 3, H('#8ab0e0')); ps(mx - 4 * d - 2, my - 4, t % 1 < 0.5 ? H('#ff3a3a') : H('#5a1a1a')); }
  // la furgoneta entra por la derecha y frena; la puerta corre y la parabólica se levanta
  const uF = tramo(t, 1.3, PARA), fx = lerp(330, 196, 1 - (1 - uF) ** 3);
  furgo(fx, t, uF < 1 ? 1 : 0, tramo(t, PARA, PARA + 0.5), tramo(t, PARA + 0.6, PARA + 1.8));
  // matas secas por delante, que se mecen
  for (const [x, y] of [[6, 178], [70, 176], [150, 179], [300, 178], [262, 174]]) mata(x, y, t, H('#c8a060'), H('#8a6a3a'), 6, 8);
  // por delante: las cajas de hallazgos apiladas, el bidón de agua y la pala clavada
  for (const [x, y, c] of [[286, 176, '#3a6ab0'], [304, 176, '#3a6ab0'], [295, 164, '#c8a040']]) { rr(x - 9, y - 11, x + 9, y, K); rr(x - 8, y - 10, x + 8, y - 1, H(c)); rr(x - 8, y - 10, x + 8, y - 9, mez(H(c), H('#ffffff'), 0.35)); rr(x - 5, y - 6, x + 5, y - 5, mez(H(c), K, 0.4)); }
  rr(258, 160, 268, 176, K); rr(259, 161, 267, 175, H('#8ab8d8')); rr(259, 161, 261, 175, H('#c8e0f0')); rr(261, 157, 265, 160, K);
  R.linea(30, 122, 40, 96, K); R.linea(31, 122, 41, 96, H('#8a6440')); R.poligono([[26, 124], [34, 120], [36, 128], [28, 131]], H('#a8a8b4'));
};

// ── 2 · el salón: el espectador se sienta con las palomitas y la niña enciende la tele ───────────────────────────────
const p2 = (t) => {
  const ENC = W.N2022 + 0.35, on = t > ENC;
  const g = T.hoy(R, t, { encuadre: 'salon', programa: 2 });
  // la tele apagada (cristal oscuro con el reflejo de la lámpara) hasta que la niña la enciende; luego el destello
  if (!on || t < ENC + 0.25) { const v = on ? tramo(t, ENC, ENC + 0.25) : 0;
    llena(174, 54, 286, 110, (x, y) => { if (on && Math.abs(y - 82) < v * 28 + 1) return Math.abs(y - 82) < 1 ? H('#ffffff') : H('#c8d8ff'); return rmp(pal(['#0c0e16', '#14161f', '#1c1f2a']), 1 + (x - y > 150 && x - y < 160 ? 1.2 : 0) - (y - 54) * 0.01, x, y); });
    for (let y = 58; y < 76; y++) tine(196 - (y - 58) * 0.2, y, H('#e8c070'), 0.3); }
  // el contador de visitas sube (el «widely watched»)
  if (t > W.WIDELY) { const n = Math.floor(9800000 * ease(tramo(t, W.WIDELY, W.WIDELY + 1.6))); rr(232, 101, 284, 108, H('#0a0a10')); cifras(String(n).padStart(7, '0'), 254, 102, H('#ffffff')); R.poligono([[236, 103], [240, 101], [244, 103], [240, 106]], H('#e8e8f0')); ps(240, 103, H('#2a2a30')); }
  // la niña, sentada a la izquierda con el mando: lo apunta y enciende
  const apunta = t > ENC - 0.6 && t < ENC + 0.6;
  const n = R.actor(EL.chica, 52, 150, t, { dir: 1, sostiene: apunta ? [74, 132] : [66, 138], sonrisa: on });
  rr(n.mano[0] - 1, n.mano[1] - 1, n.mano[0] + 4, n.mano[1] + 1, K); ps(n.mano[0] + 3, n.mano[1] - 1, apunta && t % 0.2 < 0.1 ? H('#ff3a3a') : H('#5a5a62'));
  // el espectador entra por la derecha con el cuenco de palomitas, pasa ante el mueble y se sienta junto a ella
  const u = tramo(t, W.AND1 + 0.05, W.AND1 + 2.1), ex = ri(lerp(292, 86, ease(u))), sentado = u >= 1;
  const sorp = t > W.ARGUED && t < W.ARGUED + 1.2;
  const e = R.actor(EL.espectadorGB, ex, 150, t, { dir: sentado ? 1 : -1, anda: u > 0 && u < 1, sostiene: sentado ? [ex + 13, 138] : [ex - 2, 138], sorpresa: sorp, sonrisa: sentado && !sorp });
  T.hoyDelante(R, t, { encuadre: 'salon' });
  // el cuenco (por delante del sofá cuando ya está sentado) y las palomitas que saltan
  const [bx, by] = e.mano; rr(bx - 5, by - 1, bx + 5, by + 3, K); rr(bx - 4, by, bx + 4, by + 2, H('#c83a3a')); rr(bx - 4, by + 2, bx + 4, by + 2, H('#8a2424'));
  for (let k = 0; k < 6; k++) ps(bx - 3 + k * 1.3, by - 1 - (k & 1), H(k % 3 ? '#fff4d0' : '#f0d070'));
  if (sorp) for (let k = 0; k < 4; k++) { const v = tramo(t, W.ARGUED, W.ARGUED + 0.8); ps(bx - 4 + k * 3, by - 2 - Math.sin(v * Math.PI) * (6 + k * 2), H('#fff4d0')); }
  return g;
};

// ── 3 · la tele de cerca: el documental de la civilización perdida ────────────────────────────────────────────────
const TV = [22, 26, 266, 142];
const fondo3 = () => fijo('p3', () => {
  // el papel pintado de rombos del salón, la luz de la tele en la pared
  llena(0, 0, 319, 158, (x, y) => { const rx = (x + 6) % 12, ry = y % 16, rom = Math.abs(rx - 6) / 6 + Math.abs(ry - 8) / 8 < 0.5;
    return rmp(pal(['#1c1830', '#262040', '#30294e', '#3c335c']), 1.5 + (rom ? 0.8 : 0) + ((x % 12) === 0 ? -0.6 : 0) - Math.abs(x - 144) * 0.004, x, y); });
  // el marco de la tele, con su pie y su brillo
  rr(TV[0] - 6, TV[1] - 6, TV[2] + 6, TV[3] + 7, K); rr(TV[0] - 5, TV[1] - 5, TV[2] + 5, TV[3] + 6, H('#1a1a20')); rr(TV[0] - 5, TV[1] - 5, TV[2] + 5, TV[1] - 4, H('#3a3a44')); rr(TV[0] - 1, TV[3] + 2, TV[2] + 1, TV[3] + 4, H('#24242c')); ps(144, TV[3] + 4, H('#3aff6a'));
  // la monstera a la derecha y la lámpara de pie
  for (let k = 0; k < 7; k++) { const cx = 296 + Math.cos(k * 1.3) * 14, cy = 92 + k * 9; for (let j = -6; j <= 6; j++) for (let i = -9; i <= 9; i++) { const e = (i / 9) ** 2 + (j / 6) ** 2; if (e < 1 && !(Math.abs(j) < 1 && i > -2) && !((i + j * 2 + k) % 5 === 0 && e > 0.5)) R.pset(ri(cx + i), ri(cy + j), e > 0.75 ? H('#1e3a24') : i < 0 ? H('#3a6a3a') : H('#2a5030')); } }
  // el mueble: tablero de nogal con vetas
  llena(0, 158, 319, 179, (x, y) => y < 161 ? (y === 158 ? H('#c89a6a') : H('#a87a4e')) : veta(x, y, pal(['#3a2418', '#4e3020', '#64402a', '#7a5034']), 1.6, 7, 3));
  // el router, el mando, el cuenco de palomitas, la consola y una taza
  rr(40, 150, 60, 158, K); rr(41, 151, 59, 157, H('#e8e8ec')); for (let i = 0; i < 4; i++) rr(43 + i * 4, 146, 43 + i * 4, 150, K);
  rr(212, 154, 236, 158, K); rr(213, 155, 235, 157, H('#2a2a32')); ps(216, 156, H('#c83a3a')); ps(220, 156, H('#3a8ad8'));
  R.disco(270, 156, 10, K); R.disco(270, 156, 9, H('#c83a3a')); for (let k = 0; k < 16; k++) ps(262 + (k * 5) % 16, 148 + (k * 3) % 6, H(k % 3 ? '#fff4d0' : '#f0d070'));
  rr(96, 150, 124, 158, K); rr(97, 151, 123, 157, H('#2a2a32')); R.disco(104, 154, 2, H('#5a5a62')); R.disco(116, 154, 2, H('#5a5a62'));
});
const p3 = (t) => {
  fondo3();
  const [X0, Y0, X1, Y1] = TV, hund = ease(tramo(t, W.LOST - 0.3, W.ICE + 0.6)), rayo = t > W.LOST && t < W.LOST + 0.35;
  const HOR = 98;
  // el cielo de noche con la aurora que ondea
  llena(X0, Y0, X1, HOR, (x, y) => { const au = Math.sin(x * 0.035 + t * 0.9) * 8 + Math.sin(x * 0.09 - t * 1.4) * 4, d = Math.abs(y - (50 + au));
    if (d < 9 && b4(x, y) < (1 - d / 9) * 0.85) return d < 3 ? H('#8affc8') : H('#2ab88a');
    return rmp(pal(['#06081a', '#0c1230', '#142048', '#1e3060']), (y - Y0) / (HOR - Y0) * 3.2, x, y); });
  estrellas(t, 40, X0, Y0, X1, 70, 5);
  // los glaciares a la derecha, con sus grietas
  llena(170, 58, X1, HOR + 6, (x, y) => { const top = 66 + Math.sin(x * 0.12) * 5 + Math.abs(((x * 7) % 23) - 11) * 0.6; if (y < top) return undefined;
    return ((x * 3 + y) % 17 === 0) ? H('#5a8ab0') : rmp(pal(['#6a9ac0', '#9ac4e0', '#cce6f6', '#f0faff']), 3 - (y - top) * 0.09 - (x % 11 < 2 ? 0.8 : 0), x, y); });
  // la ciudad de pirámides y columnas, que se hunde
  const dy = ri(hund * 34), CIU = pal(['#5a4a3a', '#a89070', '#d8c8a0', '#f4ecd0']);
  for (const [cx, w, h] of [[70, 34, 30], [118, 26, 22]]) for (let s = 0; s < 5; s++) { const ww = w - s * (w / 5), y0 = HOR - (s + 1) * (h / 5) + dy, y1 = HOR - s * (h / 5) + dy;
    llena(cx - ww, y0, cx + ww, y1, (x, y) => y > HOR + 1 ? undefined : x === ri(cx - ww) || y === ri(y0) ? K : rmp(CIU, 2.4 - (x - cx) / ww * 0.9, x, y)); }
  for (const cx of [70, 118]) { const top = HOR - (cx === 70 ? 30 : 22) + dy - 4; if (top < HOR) { rr(cx - 2, top, cx + 2, top + 4, H('#ffd34a')); ps(cx, top - 1, H('#fff0a0')); } }
  for (let k = 0; k < 6; k++) { const x = 34 + k * 30 + (k > 2 ? 40 : 0); if (x > 160) continue; const top = HOR - 18 + dy; if (top < HOR) for (let y = top; y <= HOR; y++) { ps(x, y, K); ps(x + 1, y, H('#e8dcc0')); ps(x + 2, y, H('#b8a888')); } }
  // el mar que sube: olas con espuma, y la espuma donde se hunde la ciudad
  llena(X0, HOR, X1, Y1, (x, y) => { const ola = Math.sin(x * 0.2 + t * 3 + y * 0.6) > 0.82; return ola ? H('#5a8ac0') : rmp(pal(['#0a1a3a', '#12284e', '#1c3a66', '#28507e']), 3 - (y - HOR) * 0.06, x, y); });
  if (hund > 0 && hund < 1) for (let k = 0; k < 30; k++) { const x = 40 + (k * 13) % 110, y = HOR - Math.abs(Math.sin(t * 6 + k)) * 4; ps(x, y, H('#e8f4ff')); }
  // la barca de juncos de los supervivientes, que huye hacia el hielo
  const ub = tramo(t, W.SURVIVORS - 0.6, W.WHO), bx = ri(lerp(132, 214, ease(ub))), by = HOR + 6 + ri(Math.sin(t * 2.4) * 1.2);
  R.poligono([[bx - 14, by - 2], [bx + 14, by - 2], [bx + 10, by + 3], [bx - 10, by + 3]], K); R.poligono([[bx - 13, by - 1], [bx + 13, by - 1], [bx + 9, by + 2], [bx - 9, by + 2]], H('#c8a050')); for (let i = -12; i <= 12; i += 3) ps(bx + i, by, H('#8a6a2a'));
  R.linea(bx, by - 2, bx, by - 20, K); R.poligono([[bx + 1, by - 19], [bx + 12, by - 8], [bx + 1, by - 6]], H('#e8dcc0')); R.linea(bx + 1, by - 19, bx + 11, by - 8, H('#b8a888'));
  for (const i of [-9, -5, 5]) { rr(bx + i - 1, by - 8, bx + i + 1, by - 2, H('#f4f0e8')); ps(bx + i, by - 9, H('#c88a5a')); ps(bx + i, by - 10, H('#f4f0e8')); }
  for (let k = 1; k < 18; k++) ps(bx - 14 - k * 2, by + 2 + (k & 1), k < 9 ? H('#8ab0e0') : H('#4a70a8'));
  // el relámpago en «lost»
  if (rayo) { llena(X0, Y0, X1, Y1, (x, y) => mez(R.buf[y * 320 + x], H('#e8f0ff'), 0.35)); let x = 96, y = Y0; while (y < HOR - 30) { const nx = x + ri((h2(y, 3, 7) - 0.5) * 10); R.linea(x, y, nx, y + 6, H('#ffffff')); x = nx; y += 6; } }
  // la nieve de la Edad de Hielo
  const nv = tramo(t, W.ICE - 0.2, W.ICE + 0.6); if (nv > 0) for (let k = 0; k < 70 * nv; k++) { const x = X0 + ((k * 37 + ri(Math.sin(t + k) * 6)) % (X1 - X0)), y = Y0 + ((k * 53 + t * 24) % (Y1 - Y0)); ps(x, y, H('#ffffff')); }
  // el rótulo de abajo (sin letras) y las líneas de barrido
  rr(X0 + 10, Y1 - 16, X0 + 112, Y1 - 6, H('#0a0a12')); rr(X0 + 10, Y1 - 16, X0 + 14, Y1 - 6, H('#c83a3a')); rr(X0 + 18, Y1 - 13, X0 + 80, Y1 - 12, H('#e8e8f0')); rr(X0 + 18, Y1 - 9, X0 + 100, Y1 - 9, H('#8a8a98'));
  for (let y = Y0; y <= Y1; y += 2) for (let x = X0; x <= X1; x += 1) if (((x >> 1) + y) % 3 === 0) tine(x, y, K, 0.12);
  for (let y = Y0; y <= Y1; y++) for (let x = X0 + (y - Y0) + 140; x < X0 + (y - Y0) + 150; x++) if (x <= X1) tine(x, y, H('#ffffff'), 0.06);
  // el gato que pasa por el mueble, por delante de la tele
  const gx = ri(lerp(330, -30, tramo(t, W.BEHIND + 0.5, W.WHO + 0.2))), gp = Math.floor(t * 8) & 1;
  rr(gx, 147, gx + 14, 153, K); rr(gx + 1, 148, gx + 13, 152, H('#e8903a')); for (let i = 2; i < 12; i += 3) ps(gx + i, 148, H('#b8682a')); rr(gx - 4, 144, gx + 2, 150, K); rr(gx - 3, 145, gx + 1, 149, H('#e8903a')); ps(gx - 3, 143, K); ps(gx + 1, 143, K); ps(gx - 2, 146, H('#2a8a2a'));
  R.linea(gx + 14, 149, gx + 19, 143 + ri(Math.sin(t * 4) * 2), K); R.linea(gx + 1 + gp, 153, gx + 1 + gp, 157, K); R.linea(gx + 11 - gp, 153, gx + 11 - gp, 157, K);
};

// ── 4 · el plató del rodaje: el «sabio» enseña a tallar y a construir ──────────────────────────────────────────────
const fondo4 = () => fijo('p4', () => {
  // la pared del plató con espuma acústica, oscura
  llena(0, 0, 319, 120, (x, y) => { const cx = x % 10, cy = y % 10, pico = Math.abs(cx - 5) + Math.abs(cy - 5); return rmp(pal(['#101018', '#181824', '#22222e', '#2c2c3a']), 2.2 - pico * 0.28 + (cx < cy ? -0.3 : 0.2), x, y); });
  // el fondo de croma, curvo, con sus cruces de seguimiento
  llena(36, 26, 236, 132, (x, y) => { const v = 2.2 - Math.abs(x - 136) * 0.008 + (y > 112 ? (y - 112) * 0.05 : 0); return rmp(pal(['#1a5a2a', '#2a7a3a', '#3a9a4a', '#4ab05a']), v, x, y); });
  for (const [x, y] of [[60, 44], [110, 40], [170, 46], [214, 52], [70, 84], [200, 92]]) { rr(x - 3, y, x + 3, y, H('#e8e8e8')); rr(x, y - 3, x, y + 3, H('#e8e8e8')); }
  rr(35, 25, 237, 25, K); rr(35, 25, 35, 132, K); rr(237, 25, 237, 132, K);
  // el suelo de cemento con cinta y cables
  llena(0, 120, 319, 179, (x, y) => y < 132 && x > 36 && x < 236 ? undefined : tierra(x, y, pal(['#2a2a30', '#3a3a42', '#4a4a54', '#5a5a64']), 1.8 + (y - 120) * 0.01, 21));
  for (const [x, y] of [[96, 156], [150, 162]]) { R.linea(x - 4, y - 2, x + 4, y + 2, H('#e8c020')); R.linea(x - 4, y + 2, x + 4, y - 2, H('#e8c020')); }
  for (let x = 0; x < 300; x++) { ps(x, 170 + ri(Math.sin(x * 0.04) * 4 + Math.sin(x * 0.13) * 1.5), K); ps(x, 171 + ri(Math.sin(x * 0.04 + 1) * 3), H('#1a1a1a')); }
  // la cercha de focos arriba (sin pisar la esquina de Atom)
  for (let x = 0; x < 268; x++) { ps(x, 8, H('#8a8a94')); ps(x, 13, H('#8a8a94')); if (x % 8 === 0) R.linea(x, 8, x + 4, 13, H('#6a6a74')); if (x % 8 === 4) R.linea(x, 13, x + 4, 8, H('#6a6a74')); }
  // el sillón del director con el megáfono
  rr(276, 126, 300, 150, K); rr(277, 128, 299, 136, H('#2a2a30')); R.linea(278, 150, 298, 136, H('#8a6440')); R.linea(298, 150, 278, 136, H('#8a6440')); rr(277, 136, 299, 139, H('#2a2a30'));
  R.poligono([[302, 140], [314, 134], [314, 146]], K); R.poligono([[303, 140], [313, 135], [313, 145]], H('#e8e0d0'));
});
const foco = (x, y, t, a) => { rr(x - 4, y, x + 4, y + 7, K); rr(x - 3, y + 1, x + 3, y + 6, H('#3a3a44')); rr(x - 3, y + 6, x + 3, y + 7, H('#fff4c0'));
  for (let j = 8; j < 120; j++) { const w = j * 0.32; for (let i = -w; i <= w; i++) if (b4(x + i, y + j) < 0.35) tine(x + i, y + j, H('#fff0c0'), a * 0.25 * (1 - j / 120)); } };
const p4 = (t) => {
  fondo4();
  for (const [x, k] of [[66, 0], [136, 1], [206, 2]]) foco(x, 14, t, 0.8 + Math.sin(t * 13 + k) * 0.04);
  // el pilar de atrezo (corcho pintado), con lo que le van tallando
  const g = T.d_pilar(R, 118, 150, { escala: 1.15, luz: 0.6 });
  const talla = t > W.CARVE; if (talla) for (let k = 0; k < 6; k++) { const u = ((t - W.CARVE) * 2.2 + k / 6) % 1; ps(132 + u * 16 + k, 120 - Math.sin(u * 3) * 10 + k * 2, H('#f4f0e8')); }
  // el «sabio» de túnica plateada enseña; el cazador-actor talla; el otro alza un bloque de corcho con una mano
  const s = R.actor(EL.socrates, 82, 150, t, { dir: 1, dedo: t > W.TAUGHT - 0.1 && t < W.CARVE + 0.6, habla: t > W.TAUGHT - 0.1 && t < W.BUILD, brazos: t > W.BUILD + 0.3, sonrisa: t > W.BUILD + 0.3, pal: { T: H('#d8dcec'), t: H('#a8acc0') } });
  const golpe = talla && (Math.floor((t - W.CARVE) * 4) & 1);
  const c = R.actor(EL.cazadorGB, 142, 150, t, { dir: -1, sostiene: [138, golpe ? 120 : 117], sonrisa: talla });
  R.linea(c.mano[0], c.mano[1], c.mano[0] - 4, c.mano[1] - 1, K); ps(c.mano[0] - 4, c.mano[1] - 1, H('#c8c8d0'));
  const alza = tramo(t, W.BUILD - 0.25, W.BUILD + 0.25), bx = 170;
  const d = R.actor(EL.cazador2GB, bx, 150, t, { dir: -1, sostiene: [bx + 6, ri(lerp(140, 112, ease(alza)))], sorpresa: alza > 0 && alza < 1, sonrisa: alza >= 1 });
  const [qx, qy] = d.mano; rr(qx - 9, qy - 8, qx + 9, qy + 1, K); rr(qx - 8, qy - 7, qx + 8, qy, H('#ece8de')); rr(qx - 8, qy - 7, qx + 8, qy - 6, H('#ffffff')); for (let i = -7; i <= 7; i += 3) ps(qx + i, qy - 3 + (i & 1), H('#c8c4b8'));
  // la claqueta: el ayudante la cierra al empezar y se va
  const cq = tramo(t, W.WHO + 0.05, W.WHO + 0.3), sale = tramo(t, W.WHO + 0.6, W.WHO + 1.8), ax = ri(lerp(196, 330, ease(sale)));
  const h = R.actor(EL.chico, ax, 150, t, { dir: sale > 0 ? 1 : -1, anda: sale > 0 && sale < 1, sostiene: [ax + (sale > 0 ? 14 : 0), 128] });
  { const [mx, my] = h.mano; rr(mx - 7, my - 4, mx + 7, my + 5, K); rr(mx - 6, my - 3, mx + 6, my + 4, H('#2a2a30')); cifras('17', mx - 4, my - 1, H('#ffffff'));
    const ang = (1 - cq) * 0.5; for (let i = 0; i <= 13; i++) { const px = mx - 7 + i * Math.cos(ang), py = my - 5 - i * Math.sin(ang); ps(px, py, (i >> 1) & 1 ? H('#ffffff') : K); ps(px, py - 1, K); } }
  // el pértiga del micro sobre los actores y la operadora
  const pe = R.actor(EL.tecnica, 20, 150, t, { dir: 1, sostiene: [34, 124] }), mx2 = 106 + ri(Math.sin(t * 1.3) * 6);
  R.linea(pe.mano[0], pe.mano[1], mx2, 66, K); R.linea(pe.mano[0], pe.mano[1] - 1, mx2, 65, H('#8a8a94'));
  for (let j = -3; j <= 3; j++) for (let i = -6; i <= 6; i++) if ((i / 6) ** 2 + (j / 3) ** 2 < 1) ps(mx2 + i, 69 + j, (i + j + ri(t * 6)) & 1 ? H('#a8a8b0') : H('#7a7a84'));
  // la cámara de cine en su trípode, delante a la derecha, y el cámara
  R.actor(EL.tecnico, 254, 150, t, { dir: -1, sostiene: [246, 128] });
  for (const [a, b] of [[226, 160], [240, 162], [248, 158]]) R.linea(238, 134, a, b, K);
  rr(222, 120, 248, 134, K); rr(223, 121, 247, 133, H('#2a2a32')); rr(223, 121, 247, 122, H('#4a4a54')); rr(212, 118, 222, 136, K); rr(213, 119, 221, 135, H('#1a1a20')); ps(216, 126, H('#5a7ab0'));
  R.disco(230, 116, 5, K); R.disco(230, 116, 4, H('#2a2a32')); R.disco(242, 116, 5, K); R.disco(242, 116, 4, H('#2a2a32')); ps(245, 124, t % 1 < 0.5 ? H('#ff3a3a') : H('#5a1a1a'));
  return g;
};

// ── 5 · el escaparate de teles de noche: doce culturas, la misma historia ─────────────────────────────────────────
const fondo5 = () => fijo('p5', () => {
  // la fachada de ladrillo, dos ventanas encendidas arriba y el aire acondicionado
  llena(0, 0, 319, 44, (x, y) => sillar(x, y, pal(['#1a1014', '#3a2024', '#4a2a2c', '#5a3232', '#6a3a38']), 10, 4, 31));
  for (const [x0, x1] of [[50, 86], [196, 232]]) { rr(x0 - 2, 18, x1 + 2, 40, K); llena(x0, 20, x1, 38, (x, y) => rmp(pal(['#6a4a2a', '#c8904a', '#f0c070', '#ffe0a0']), 2.6 - (y - 20) * 0.06 - (x === ri((x0 + x1) / 2) ? 2 : 0), x, y)); rr(x0, 29, x1, 29, H('#3a2a1a')); }
  rr(60, 24, 66, 37, H('#4a3a3a')); rr(244, 26, 262, 38, K); rr(245, 27, 261, 37, H('#a8a8b0')); for (let x = 247; x < 260; x += 2) rr(x, 29, x, 35, H('#6a6a74'));
  // el escaparate: marco, interior en penumbra y baldas
  rr(22, 52, 298, 140, K); llena(24, 54, 296, 138, (x, y) => rmp(pal(['#0c0c14', '#14141e', '#1c1c28']), 1.2 + (y - 54) * 0.008, x, y));
  for (let r = 0; r < 3; r++) { const y = 82 + r * 26; rr(26, y, 294, y + 2, H('#3a3a44')); rr(26, y, 294, y, H('#5a5a64')); }
  // la acera de losas, el bordillo y la calzada mojada
  llena(0, 140, 319, 179, (x, y) => { if (y < 168) { const j = (x + (Math.floor((y - 140) / 9) & 1) * 10) % 20 === 0 || (y - 140) % 9 === 0; return j ? H('#2a2a34') : rmp(pal(['#3a3a46', '#4a4a56', '#5a5a66']), 1.5 + (h2(x >> 2, y >> 2, 3) - 0.5) * 0.8, x, y); }
    if (y < 171) return y === 168 ? H('#8a8a96') : H('#5a5a66'); return rmp(pal(['#14141c', '#1c1c26', '#262632']), 1 + (h2(x >> 3, y, 5) - 0.5), x, y); });
  for (let x = 4; x < 320; x += 26) rr(x, 176, x + 12, 177, H('#c8a020'));
  // la boca de incendios roja (EE. UU.)
  rr(8, 148, 18, 166, K); rr(9, 150, 17, 165, H('#c83a3a')); rr(7, 154, 19, 157, K); rr(8, 155, 18, 156, H('#e85a4a')); rr(10, 146, 16, 149, K); rr(11, 147, 15, 148, H('#e85a4a'));
});
// los monumentos de las doce pantallas (iconos de 20 × 14)
const MON = [
  (x, y, c) => R.poligono([[x - 9, y + 6], [x, y - 7], [x + 9, y + 6]], c),
  (x, y, c) => { for (let s = 0; s < 4; s++) rr(x - 9 + s * 2, y + 6 - s * 3, x + 9 - s * 2, y + 4 - s * 3, c); },
  (x, y, c) => { rr(x - 6, y - 6, x + 6, y - 3, c); rr(x - 2, y - 3, x + 2, y + 6, c); },
  (x, y, c) => { rr(x - 9, y - 4, x + 9, y - 2, c); rr(x - 8, y - 2, x - 5, y + 6, c); rr(x + 5, y - 2, x + 8, y + 6, c); },
  (x, y, c) => { rr(x - 4, y - 6, x + 4, y + 6, c); rr(x - 5, y - 6, x + 5, y - 4, c); ps(x - 2, y - 2, K); ps(x + 2, y - 2, K); },
  (x, y, c) => { rr(x - 9, y + 2, x + 9, y + 6, c); rr(x - 6, y - 2, x + 6, y + 2, c); rr(x - 3, y - 6, x + 3, y - 2, c); },
  (x, y, c) => { R.poligono([[x - 8, y + 6], [x - 8, y - 1], [x - 3, y - 5], [x + 4, y - 5], [x + 4, y - 1], [x + 9, y + 6]], c); },
  (x, y, c) => { rr(x - 9, y - 5, x + 9, y - 4, c); for (let i = -8; i <= 8; i += 4) rr(x + i, y - 3, x + i + 1, y + 6, c); R.poligono([[x - 9, y - 5], [x, y - 8], [x + 9, y - 5]], c); },
  (x, y, c) => { rr(x - 1, y - 7, x + 1, y + 6, c); rr(x - 2, y + 4, x + 2, y + 6, c); },
  (x, y, c) => { for (let i = 0; i < 3; i++) rr(x - 8 + i, y + 4 - i * 4, x + 8 - i, y + 5 - i * 4, c); rr(x - 1, y - 8, x + 1, y - 6, c); },
  (x, y, c) => { R.disco(x, y + 6, 8, c); },
  (x, y, c) => { for (let i = -8; i <= 8; i += 4) rr(x + i, y - 4 + Math.abs(i) / 2, x + i + 2, y + 6, c); },
];
const pantalla5 = (k, x, y, t, fase) => { // fase: 0 apagada/anuncio, 1 su monumento, 2 la misma imagen para todas
  const X0 = x - 25, Y0 = y - 9, X1 = x + 25, Y1 = y + 9;
  rr(X0 - 2, Y0 - 2, X1 + 2, Y1 + 3, K); rr(X0 - 1, Y0 - 1, X1 + 1, Y1 + 1, H('#24242c'));
  if (fase === 0) { llena(X0, Y0, X1, Y1, (a, b) => h2(a, b + ri(t * 20), k) > 0.5 ? H('#3a3a48') : H('#22222c')); return; }
  if (fase === 1) { const CI = pal(['#2a3a6a', '#3a5a8a', '#5a7aaa', '#e8a050']); llena(X0, Y0, X1, Y1, (a, b) => rmp(CI, (b - Y0) / 18 * 3, a, b)); MON[k](x, y + 1, H('#1a1424')); MON[k](x - 1, y, H('#e8d8b0')); return; }
  llena(X0, Y0, X1, Y1, (a, b) => rmp(pal(['#0a0a1e', '#1a1440', '#3a2060', '#8a3a5a']), (b - Y0) / 18 * 3, a, b)); MON[0](x + 4, y + 2, H('#e8c070'));
  const cu = (t * 0.6 + 0) % 1; R.linea(X0 + 4, Y0 + 3, ri(x - 4 + cu * 3), ri(y - 3 + cu * 2), H('#8ab8ff')); destello(ri(x - 3 + cu * 3), ri(y - 3 + cu * 2), 2, H('#e8f4ff'));
};
const p5 = (t) => {
  fondo5();
  // la marquesina a rayas que se mece
  for (let x = 18; x < 302; x++) { const ond = ri(Math.sin(x * 0.2 + t * 3) * 0.8); for (let y = 42; y < 52 + ((x % 12) < 6 ? 1 : 0) + ond; y++) R.pset(x, y, y === 42 ? K : ((x - 18) % 16 < 8 ? H('#2a6a4a') : H('#e8e0c8'))); ps(x, 52 + ((x % 12) < 6 ? 1 : 0) + ond, K); }
  // las doce pantallas: se encienden una a una en «12», y en «sharing» todas iguales
  const ENC = W.N12 - 0.1;
  for (let k = 0; k < 12; k++) { const c = k % 4, r = Math.floor(k / 4), x = 58 + c * 68, y = 68 + r * 26;
    const fase = t > W.SHARING + k * 0.04 ? 2 : t > ENC + k * 0.1 ? 1 : 0; pantalla5(k, x, y, t, fase); }
  if (t > W.N12) R.numero('12', 118, 40, { tam: 16, centro: true });
  // el reflejo del cristal y el de la farola
  for (let y = 54; y <= 138; y++) for (let x = 24 + (y - 54) * 0.6; x < 34 + (y - 54) * 0.6; x++) tine(x + 120, y, H('#c8d8ff'), 0.08);
  // la luz de las pantallas en la acera y el charco que las refleja
  const luz = t > ENC ? (t > W.SHARING ? H('#8a5aa8') : H('#6a8ac0')) : H('#3a3a48');
  for (let y = 140; y < 168; y++) for (let x = 24; x < 296; x++) if (b4(x, y) < (1 - (y - 140) / 28) * 0.5) tine(x, y, luz, 0.18);
  ovalo(220, 160, 30, 4, (x, y) => mez(R.buf[y * 320 + x], luz, 0.35 + Math.sin(x * 0.4 + t * 3) * 0.08));
  // la farola de la derecha
  rr(304, 52, 307, 168, K); rr(305, 53, 306, 167, H('#3a3a44')); rr(296, 50, 314, 56, K); rr(297, 51, 313, 55, H('#ffe8a0'));
  // la gente: él se para a mirar; ella con el perro llega y se para; los dos se sorprenden en «sharing»
  const sorp = t > W.SHARING + 0.2;
  const u1 = tramo(t, W.AND2, W.N12), x1 = ri(lerp(-16, 96, ease(u1)));
  R.actor(EL.vecino, x1, 156, t, { dir: 1, anda: u1 > 0 && u1 < 1, sorpresa: sorp, dedo: t > W.N12 + 0.4 && !sorp });
  const u2 = tramo(t, W.AND2 + 0.4, W.CULTURES), x2 = ri(lerp(330, 206, ease(u2)));
  const v = R.actor(EL.vecina, x2, 156, t, { dir: -1, anda: u2 > 0 && u2 < 1, sostiene: [x2 - 4, 146], sorpresa: sorp });
  const px = x2 - 22 + ri(Math.sin(t * 2) * 2), pp = Math.floor(t * 8) & 1; R.linea(v.mano[0], v.mano[1], px + 9, 149, H('#c83a3a'));
  rr(px, 150, px + 9, 154, K); rr(px + 1, 151, px + 8, 153, H('#c8a070')); rr(px + 8, 147, px + 12, 151, K); rr(px + 9, 148, px + 11, 150, H('#c8a070')); ps(px + 11, 148, K);
  R.linea(px + 1 + pp, 154, px + 1 + pp, 157, K); R.linea(px + 7 - pp, 154, px + 7 - pp, 157, K); R.linea(px, 151, px - 3, 148 + pp, K);
  // la ciclista que cruza por delante, por la calzada
  const cx = ri(lerp(-30, 350, tramo(t, W.VIDEOS - 0.4, W.SHARING + 0.6)));
  const cc = R.actor(EL.chica, cx, 172, t, { dir: 1, sostiene: [cx + 14, 160] });
  for (const wx of [cx - 2, cx + 18]) { R.disco(wx, 174, 5, K); R.disco(wx, 174, 4, H('#1c1c26')); ps(wx + Math.cos(t * 12) * 3, 174 + Math.sin(t * 12) * 3, H('#8a8a96')); }
  R.linea(cx - 2, 174, cx + 8, 166, H('#3a8ad8')); R.linea(cx + 8, 166, cx + 18, 174, H('#3a8ad8')); R.linea(cx + 8, 166, cx + 16, 160, H('#3a8ad8'));
};

// ── 6 · el dormitorio a oscuras: el vídeo de las autoridades que no quieren que lo sepas ─────────────────────────
const LAP = [176, 90, 248, 130];
const fondo6 = () => fijo('p6', () => {
  // la pared de noche con su papel a rayas finas
  llena(0, 0, 319, 140, (x, y) => rmp(pal(['#12142a', '#181a34', '#1e2140', '#26294c']), 1.6 + ((x % 7) === 0 ? 0.6 : 0) - y * 0.004 + (h2(x >> 3, y >> 3, 2) - 0.5) * 0.3, x, y));
  // la ventana con la persiana: entre las lamas, la ciudad de noche y la luna
  rr(24, 24, 78, 86, K); rr(25, 25, 77, 85, H('#3a3a4a'));
  llena(27, 27, 75, 83, (x, y) => { if ((y - 27) % 5 < 3) return rmp(pal(['#4a4a5e', '#5a5a70', '#6a6a82']), 1 + (x - 27) * 0.02, x, y);
    if (Math.hypot(x - 64, y - 36) < 5) return H('#f4eed0'); const ed = 70 - ((x * 7) % 13) * 2 - (x > 50 ? 6 : 0); return y > ed ? (h2(x >> 1, y >> 1, 4) > 0.8 ? H('#ffd070') : H('#141626')) : H('#1c2040'); });
  rr(24, 87, 80, 89, K); rr(25, 87, 79, 88, H('#5a5a6e')); R.linea(76, 25, 76, 98, H('#8a8a9a')); rr(75, 98, 77, 101, H('#c8c8d8'));
  // los pósteres: un planeta con anillos y una pirámide con su ojo (sin letras)
  rr(98, 28, 132, 72, K); llena(99, 29, 131, 71, (x, y) => rmp(pal(['#0a0a20', '#1a1440', '#2a2060']), 1 + (h2(x, y, 8) > 0.96 ? 2 : 0), x, y)); R.disco(115, 50, 9, H('#d88a4a')); R.disco(113, 48, 5, H('#e8a86a')); for (let i = -15; i <= 15; i++) ps(115 + i, 50 + ri(i * 0.25), H('#f0d8a0'));
  rr(236, 30, 266, 70, K); llena(237, 31, 265, 69, (x, y) => rmp(pal(['#2a1a0a', '#5a3a1a', '#8a5a2a']), 2 - (y - 31) * 0.04, x, y)); R.poligono([[240, 66], [251, 38], [262, 66]], H('#e8c070')); rr(248, 50, 254, 54, K); rr(249, 51, 253, 53, H('#ffffff')); ps(251, 52, H('#3a8ad8'));
  // el suelo de tarima y la alfombra
  llena(0, 140, 319, 179, (x, y) => veta(y, x, pal(['#1a1410', '#2a2018', '#3a2c22', '#4a382a']), 1.4, 14, 5));
  ovalo(160, 168, 70, 8, (x, y) => ((x >> 2) + (y >> 1)) & 1 ? H('#3a2a4a') : H('#4a3a5a'));
  // la cama a la izquierda con la colcha arrugada y la almohada
  rr(0, 118, 104, 160, K); llena(0, 119, 103, 152, (x, y) => rmp(pal(['#1e3050', '#2a4068', '#3a5280', '#4a6498']), 2.2 + Math.sin(x * 0.15 + y * 0.3) * 0.6 - (y - 119) * 0.03, x, y));
  rr(0, 152, 103, 159, H('#2a2018')); rr(4, 108, 34, 120, K); rr(5, 109, 33, 119, H('#c8c8dc')); rr(5, 117, 33, 119, H('#9a9ab0'));
  // la mesa con sus patas, la mochila y la papelera
  rr(150, 132, 306, 137, K); llena(151, 133, 305, 136, (x, y) => veta(x, y, pal(['#4a3424', '#5e4430', '#74563c']), 1.5, 9, 6)); rr(154, 137, 157, 168, K); rr(298, 137, 301, 168, K);
  rr(270, 150, 290, 170, K); rr(271, 151, 289, 169, H('#3a6a4a')); rr(271, 151, 289, 154, H('#4a8a5a')); rr(278, 158, 282, 162, H('#2a4a34'));
  // sobre la mesa: el flexo apagado, la lata, las patatas, los cascos y la planta
  R.linea(290, 132, 284, 112, K); R.linea(284, 112, 296, 106, K); R.poligono([[292, 102], [302, 104], [298, 112]], H('#5a5a6a')); rr(286, 130, 296, 132, H('#3a3a44'));
  rr(258, 122, 264, 132, K); rr(259, 123, 263, 131, H('#3a8ad8')); rr(259, 126, 263, 127, H('#e8e8f0'));
  rr(158, 118, 172, 132, K); rr(159, 119, 171, 131, H('#e8c020')); rr(159, 119, 171, 121, H('#c89810')); R.disco(165, 126, 3, H('#c83a3a'));
  for (let i = 0; i < 14; i++) { const a = i / 13 * Math.PI; ps(274 + Math.cos(a) * 7, 126 - Math.sin(a) * 6, K); } rr(266, 124, 268, 130, K); rr(280, 124, 282, 130, K);
});
const p6 = (t) => {
  fondo6();
  // el portátil: el vídeo de la cámara acorazada, recortado a su pantalla
  const [X0, Y0, X1, Y1] = LAP; rr(X0 - 3, Y0 - 3, X1 + 3, Y1 + 2, K); rr(X0 - 2, Y0 - 2, X1 + 2, Y1 + 1, H('#3a3a44'));
  const cierra = ease(tramo(t, W.AUTH - 0.2, W.AUTH + 0.5));
  llena(X0, Y0, X1, Y1, (x, y) => { const cx = 212, dxp = Math.abs(x - cx) / ((y - Y0) * 0.6 + 6); return dxp > 1 ? rmp(pal(['#14141c', '#22222c', '#30303c']), 1 + (y - Y0) * 0.03, x, y) : rmp(pal(['#2a2a36', '#3a3a48', '#4a4a5a']), 1 + (y - Y0) * 0.04, x, y); });
  R.disco(212, 106, 14, K); R.disco(212, 106, 13, H('#6a6a78')); R.disco(212, 106, 9, H('#1a1a22'));
  const pw = ri(lerp(-12, 0, cierra)); R.disco(212 + pw, 106, 11, K); R.disco(212 + pw, 106, 10, H('#9a9aa8')); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + cierra * 2; ps(212 + pw + Math.cos(a) * 6, 106 + Math.sin(a) * 6, H('#5a5a68')); } R.disco(212 + pw, 106, 3, H('#c8c8d4'));
  const tx = ri(lerp(184, 196, tramo(t, W.SAME, W.AUTH))); rr(tx, 106, tx + 4, 122, K); rr(tx + 1, 108, tx + 3, 121, H('#1a1a22')); rr(tx + 1, 102, tx + 3, 106, H('#d8a070')); ps(tx + 2, 109, H('#e8e8f0'));
  if (t > W.DONT) { const s = pop(t, W.DONT, 0.3); R.icono('candado', 230, 94, H('#ffd34a'), K, s > 0.5 ? 2 : 1); }
  rr(X0, Y1 - 3, X1, Y1, H('#0a0a10')); rr(X0, Y1 - 2, X0 + ri((X1 - X0) * tramo(t, W.SAME, W.KNOW + 0.5)), Y1 - 2, H('#e83a3a'));
  rr(X0 - 6, Y1 + 2, X1 + 6, Y1 + 4, K); rr(X0 - 5, Y1 + 2, X1 + 5, Y1 + 3, H('#8a8a98'));
  // la luz azulada de la pantalla en la cara del chico y en la mesa
  for (let y = 80; y < 140; y++) for (let x = 120; x < 260; x++) { const d = Math.hypot(x - 212, (y - 110) * 1.4) / 80; if (d < 1 && b4(x, y) < (1 - d) * 0.6) tine(x, y, H('#8ab0ff'), 0.15); }
  // el chico en la silla: come patatas, se inclina en «authorities» y se queda de piedra en «don't want»
  const inc = t > W.AUTH ? 3 : 0, sorp = t > W.DONT - 0.1, come = !sorp && Math.floor(t * 1.4) & 1;
  const c = R.actor(EL.espectadorGB, 136 + inc, 158, t, { dir: 1, sostiene: come ? [148 + inc, 140] : [160, 134], sorpresa: sorp });
  T.silla(R, 141 + inc, 160, 1);
  if (!sorp) { ps(c.mano[0], c.mano[1] - 1, H('#f0c040')); ps(c.mano[0] + 1, c.mano[1] - 2, H('#e8b030')); }
  if (sorp) R.bocadillo(c.cabeza[0], c.cabeza[1] - 4, { icono: '!' });
  // el gato de la cama: dormido; levanta la cabeza con el cerrojo
  const alza = t > W.AUTH + 0.3 ? 1 : 0;
  ovalo(70, 116, 12, 5, (x, y, d) => d > 0.7 ? K : ((x + y) % 4 === 0 ? H('#5a5a68') : H('#8a8a98')));
  rr(78, 108 - alza * 4, 86, 115 - alza * 4, K); rr(79, 109 - alza * 4, 85, 114 - alza * 4, H('#8a8a98')); ps(79, 107 - alza * 4, K); ps(85, 107 - alza * 4, K);
  if (alza) { ps(81, 111 - 4, H('#e8e040')); ps(84, 111 - 4, H('#e8e040')); } else { ps(81, 112, K); ps(84, 112, K); }
  R.linea(58, 118, 52, 112 + ri(Math.sin(t * 2) * 2), K);
};
''' + r'''
// (los planos 7–17 siguen)
''')

PARTE2 = r'''
// ── 7 · el recinto D desde la pasarela: la guía señala el pilar 43 ───────────────────────────────────────────────
const EC = [160, 116, 122, 28];
const yAtras = (x) => EC[1] - EC[3] * Math.sqrt(Math.max(0, 1 - ((x - EC[0]) / EC[2]) ** 2));
const yDelante = (x) => EC[1] + EC[3] * Math.sqrt(Math.max(0, 1 - ((x - EC[0]) / EC[2]) ** 2));
const PIEDRA = pal(['#4a3e32', '#6e604c', '#928066', '#b4a282', '#d2c4a4']);
const fondo7 = () => fijo('p7', () => {
  // la membrana de la cubierta vista por debajo, con los arcos de acero
  llena(0, 0, 319, 30, (x, y) => rmp(pal(['#a8a8b4', '#c4c4ce', '#dcdce4', '#f0f0f4']), 3 - y * 0.06 - Math.abs(((x + 20) % 64) - 32) * 0.02, x, y));
  for (let x = 12; x < 320; x += 64) for (let y = 0; y < 31; y++) { ps(x + ri(Math.sin(y * 0.1) * 3), y, H('#6a6a78')); ps(x + 1 + ri(Math.sin(y * 0.1) * 3), y, H('#8a8a98')); }
  // el talud del otro lado, la pasarela lejana y su barandilla
  llena(0, 30, 319, 100, (x, y) => tierra(x, y, pal(['#5a4434', '#7a5e46', '#967a5a', '#b0946e']), 2 - (y - 30) * 0.01 + Math.sin(x * 0.05 + y * 0.2) * 0.3, 41));
  for (let x = 0; x < 320; x++) { ps(x, 38, H('#5a4a3a')); ps(x, 39, H('#8a6a4a')); ps(x, 40, H('#6a5040')); if (x % 10 === 0) R.linea(x, 33, x, 38, H('#3a3a44')); ps(x, 33, H('#5a5a64')); }
  // el muro del recinto por dentro (la mitad de atrás), a hiladas de piedra seca
  llena(EC[0] - EC[2], 60, EC[0] + EC[2], EC[1], (x, y) => { const yb = yAtras(x); if (y < yb - 14 || y > yb) return undefined; return y < yb - 12 ? rmp(PIEDRA, 3.4, x, y) : sillar(x, y, PIEDRA, 9 + (x % 3), 4, 43); });
  // el suelo del recinto: la roca madre y la tierra con piedras
  llena(EC[0] - EC[2], 80, EC[0] + EC[2], 150, (x, y) => { if (y <= yAtras(x) || y >= yDelante(x)) return undefined; return tierra(x, y, pal(['#6a5844', '#8a7458', '#a8906c', '#c4ac84']), 1.8 + (y - EC[1]) * 0.02, 44); });
  // el muro de delante (lo alto y su cara de fuera) y el talud hasta la pasarela
  llena(0, 86, 319, 150, (x, y) => { const dentro = x >= EC[0] - EC[2] && x <= EC[0] + EC[2];
    if (!dentro) return y < 100 ? undefined : tierra(x, y, pal(['#4a3a2c', '#6a5240', '#866a52', '#9a7e62']), 2 - (y - 100) * 0.02, 46);
    const yf = yDelante(x); if (y < yf - 1) return undefined; if (y <= yf + 2) return rmp(PIEDRA, 3.6, x, y); if (y <= yf + 12) return sillar(x, y, PIEDRA, 10, 4, 45);
    return tierra(x, y, pal(['#4a3a2c', '#6a5240', '#866a52']), 1.6, 46); });
  // fuera del anillo: el talud con cubos, una escalera y la cinta de seguridad
  for (const [x, y] of [[14, 118], [300, 122]]) { rr(x - 5, y - 6, x + 5, y + 2, K); rr(x - 4, y - 5, x + 4, y + 1, H('#2a2a32')); rr(x - 4, y - 5, x + 4, y - 4, H('#4a4a54')); }
  for (let y = 100; y < 140; y++) { ps(22, y, K); ps(30, y, K); if ((y & 3) === 0) R.linea(22, y, 30, y, H('#8a6440')); }
  for (let x = 0; x < 320; x++) ps(x, 142 + ri(Math.sin(x * 0.08) * 1.2), ((x >> 2) & 1) ? H('#e83a3a') : H('#f4f0e4'));
  // la pasarela de madera de este lado, con su barandilla
  llena(0, 150, 319, 179, (x, y) => veta(x, y, pal(['#3a2a1c', '#5a4028', '#7a5838', '#94704a']), 2, 7, 47));
  for (let x = 0; x < 320; x++) { ps(x, 146, K); ps(x, 147, H('#8a8a96')); ps(x, 148, H('#5a5a64')); if (x % 24 === 0) { rr(x, 146, x + 1, 152, K); } }
});
const PIL7 = [[200, 0.62], [228, 0.66], [256, 0.7], [286, 0.74], [318, 0.8], [338, 0.84], [160, 0.86], [20, 0.88]];
const p7 = (t) => {
  fondo7();
  // los rayos de sol que entran por la membrana, con su polvo
  for (let y = 30; y < 146; y++) for (const x0 of [40, 150]) { const x = x0 + (y - 30) * 0.5; for (let i = 0; i < 14; i++) if (b4(x + i, y) < 0.3) tine(x + i, y, H('#fff8e0'), 0.16); }
  for (let k = 0; k < 14; k++) { const u = (t * 0.05 + k / 14) % 1; ps(60 + k * 14 + Math.sin(t + k) * 4, 40 + u * 100, H('#fff4d0')); }
  // los visitantes de la pasarela del otro lado
  for (let k = 0; k < 4; k++) { const x = ri(((k * 83 + t * (k & 1 ? 8 : -6)) % 360 + 360) % 360 - 20), c = ['#c83a3a', '#3a8ad8', '#e8c040', '#5a9a4a'][k]; if (x > 266) continue; rr(x, 30, x + 2, 36, H(c)); ps(x + 1, 29, H('#d8a070')); ps(x + 1, 28, H('#3a2a1a')); }
  // las golondrinas bajo la cubierta
  for (let k = 0; k < 2; k++) { const a = t * 1.3 + k * 3; pajaro(130 + Math.cos(a) * 90, 52 + Math.sin(a * 1.7) * 10, t, H('#1a1a2a'), k); }
  // los pilares del anillo (de atrás a delante) y los dos centrales
  const brilla = t > W.VULTURE - 0.1;
  let p43 = null;
  for (const [ang, s] of PIL7) { const a = ang * Math.PI / 180, x = ri(EC[0] + EC[2] * Math.cos(a)), y = ri(EC[1] + EC[3] * Math.sin(a)); if (Math.sin(a) > 0) continue;
    if (ang === 318) { p43 = T.d_pilar(R, x, y, { escala: s, brazos: false, relieves: ['buitre', 'escorpion'], luz: 0.5, brillo: brilla ? 'buitre' : undefined, t }); p43.x = x; p43.y = y; }
    else T.d_pilar(R, x, y, { escala: s, luz: 0.5, sem: ang }); }
  T.d_pilar(R, 140, 128, { escala: 1.05, luz: 0.5, relieves: ['zorro'] }); T.d_pilar(R, 182, 128, { escala: 1.05, luz: 0.5, sem: 9 });
  for (const [ang, s] of PIL7) { const a = ang * Math.PI / 180; if (Math.sin(a) <= 0) continue; T.d_pilar(R, ri(EC[0] + EC[2] * Math.cos(a)), ri(EC[1] + EC[3] * Math.sin(a)), { escala: s, luz: 0.5, sem: ang }); }
  // el pilar 43 se rodea y sale su «43»
  if (t > W.PILLAR && p43) { const u = pop(t, W.PILLAR, 0.35), cx = p43.x, cy = p43.y - 24, rx = ri(13 * u), ry = ri(30 * u);
    for (let k = 0; k < 90; k++) { const a = k / 90 * Math.PI * 2 + t; if (k & 1) continue; const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; ps(px, py + 1, K); ps(px, py, H('#ffd34a')); }
    if (u > 0.6) { const tx = cx + 26, ty = cy - 6; R.linea(cx + rx, cy - 4, tx - 10, ty, H('#ffd34a')); rr(tx - 11, ty - 9, tx + 11, ty + 2, K); rr(tx - 10, ty - 8, tx + 10, ty + 1, H('#2a2430')); R.numero('43', tx, ty + 1, { centro: true }); } }
  // la guía señala; los visitantes miran, uno hace la foto con flash y el niño da un salto
  R.actor(EL.senor30, ri(lerp(330, 252, ease(tramo(t, W.ONE, W.ONE + 2.2)))), 172, t, { dir: -1, anda: t < W.ONE + 2.2, sonrisa: true });
  R.actor(EL.arqueologaGB, 196, 172, t, { dir: 1, dedo: t > W.PILLAR - 0.2, habla: t < W.WHERE - 0.3 && Math.floor(t * 3) % 4 !== 0 });
  R.actor(EL.vecina, 84, 172, t, { dir: 1, sorpresa: brilla });
  const fo = t > W.N43 + 0.2, v = R.actor(EL.vecino, 116, 172, t, { dir: 1, sostiene: fo ? [134, 148] : [128, 156] });
  rr(v.mano[0] - 2, v.mano[1] - 5, v.mano[0] + 2, v.mano[1] + 1, K); rr(v.mano[0] - 1, v.mano[1] - 4, v.mano[0] + 1, v.mano[1], H('#3a3a44'));
  if (t > W.N43 + 0.6 && t < W.N43 + 0.85) { destello(v.mano[0], v.mano[1] - 4, 6, H('#ffffff')); llena(0, 0, 319, 179, (x, y) => mez(R.buf[y * 320 + x], H('#ffffff'), 0.12)); }
  R.actor(EL.chico, 150, 172, t, { dir: 1, salto: brilla ? ri(Math.abs(Math.sin((t - W.VULTURE) * 6)) * 4 * (t < W.VULTURE + 1.2 ? 1 : 0)) : 0, sonrisa: brilla, dedo: brilla });
};

// ── 8 · la piedra del buitre, 2017: las constelaciones y el cometa ─────────────────────────────────────────────
const p8 = (t) => {
  const con = t < W.STAR ? 0 : t < W.COMET ? 0.6 * ease(tramo(t, W.STAR, W.COMET)) : 0.6 + 0.4 * tramo(t, W.COMET, W.COMET + 1.0);
  const g = T.hoy(R, t, { encuadre: 'buitre', constelaciones: con });
  // el investigador entra con la tableta y la alza hacia el pilar en «thought they saw»
  const u = tramo(t, W.WHERE, W.WHERE + 1.3), x = ri(lerp(-18, 46, ease(u))), alza = t > W.THOUGHT;
  const a = R.actor(EL.arqueologoGB, x, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza ? [x + 18, 124] : [x + 14, 138], sorpresa: t > W.COMET && t < W.COMET + 1.2, habla: alza && t < W.STAR });
  const [mx, my] = a.mano; rr(mx - 1, my - 9, mx + 9, my + 1, K); rr(mx, my - 8, mx + 8, my, H('#1a2a4a'));
  if (alza) for (let k = 0; k < 6; k++) ps(mx + 1 + (k * 5) % 7, my - 7 + (k * 3) % 7, Math.sin(t * 4 + k) > 0 ? H('#ffffff') : H('#8ab0ff'));
  // la investigadora de la derecha despliega la carta del cielo en «star map»
  const ab = ease(tramo(t, W.STAR - 0.4, W.STAR + 0.3));
  const b = R.actor(EL.laboratorioGB, 254, 150, t, { dir: -1, sostiene: [244, 132], sonrisa: t > W.STAR + 0.3, dedo: false });
  const [qx, qy] = b.mano, w = ri(lerp(3, 18, ab)); rr(qx - w - 1, qy - 13, qx + 1, qy + 1, K); llena(qx - w, qy - 12, qx, qy, (xx, yy) => h2(xx, yy, 6) > 0.9 ? H('#ffffff') : H('#1a2a5a'));
  if (ab > 0.8) for (const [i, j, k] of [[-14, -9, 0], [-9, -5, 1], [-4, -8, 2], [-11, -2, 3]]) ps(qx + i, qy + j, H('#ffd34a'));
  // el destello del cometa en el disco
  if (t > W.COMET + 0.9 && t < W.COMET + 1.4) { const [dx, dy] = g.disco ?? [166, 62]; destello(dx, dy, 7, H('#fff0a0')); }
  T.hoyDelante(R, t, { encuadre: 'buitre' });
  return g;
};

// ── 9 · la estepa de noche hace 12.900 años: el cometa ─────────────────────────────────────────────────────────
const suelo9 = (x) => 112 + Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11 + 1) * 1.5;
const fondo9 = () => fijo('p9', () => {
  cieloG(0, 118, pal(['#05071a', '#0a0e28', '#10183a', '#18224c', '#24305e']), 3);
  // la Vía Láctea en diagonal, tramada
  llena(0, 0, 319, 110, (x, y) => { const d = Math.abs((y - 10) - (x - 40) * 0.35); if (d > 22 || quieta(x, y)) return undefined; const v = (1 - d / 22) * (0.4 + h2(x >> 2, y >> 2, 4) * 0.6); return b4(x, y) < v * 0.55 ? (v > 0.6 ? H('#4a5a8a') : H('#2a3a64')) : undefined; });
  // las lomas en silueta con el filo de luz
  llena(0, 92, 319, 120, (x, y) => { const s = 100 + Math.sin(x * 0.02 + 1) * 6 + Math.sin(x * 0.07) * 2; if (y < s) return undefined; return y < s + 1 ? H('#3a4a7a') : H('#0e1226'); });
  // la estepa con matas
  llena(0, 104, 319, 179, (x, y) => { if (y < suelo9(x)) return undefined; return rmp(pal(['#0a0c18', '#121626', '#1a2034', '#242a42']), 1.6 + (h2(x >> 1, y >> 1, 5) - 0.5) * 1.2 - (y - 112) * 0.005, x, y); });
  // la choza de ramas y pieles
  for (let j = 0; j < 40; j++) { const w = Math.sqrt(1 - (j / 40) ** 2) * 30; for (let i = -w; i <= w; i++) { const x = ri(34 + i), y = 150 - j; R.pset(x, y, Math.abs(i) > w - 1 ? K : ((ri(i) + j) % 7 === 0 ? H('#3a2a1c') : (i < 0 ? H('#5a4030') : H('#4a3424')))); } }
  for (let k = -3; k <= 3; k++) R.linea(34 + k * 3, 108, 34 + k * 9, 116, H('#2a1c12')); rr(30, 132, 40, 150, H('#140c08'));
  // el secadero de pieles, las lanzas clavadas, piedras y matas
  for (const [a, b] of [[186, 190], [214, 210]]) { R.linea(a, 150, b, 120, H('#5a4430')); R.linea(a + 1, 150, b + 1, 120, H('#3a2a1c')); } R.linea(186, 122, 214, 122, H('#6a5038')); R.poligono([[192, 124], [208, 124], [210, 132], [206, 142], [194, 142], [190, 132]], H('#8a6444')); R.poligono([[194, 126], [206, 126], [207, 132], [204, 140], [196, 140], [193, 132]], H('#a87a52')); for (let k = 0; k < 4; k++) ps(196 + k * 3, 130 + (k & 1) * 4, H('#6a4a30')); for (const [a, b] of [[192, 124], [208, 124], [194, 142], [206, 142]]) R.linea(a, b, a < 200 ? 188 : 212, b < 130 ? 122 : 146, H('#c8b090'));
  for (const x of [232, 238]) { R.linea(x, 152, x + 3, 112, K); R.poligono([[x + 3, 108], [x + 5, 113], [x + 1, 113]], H('#6a6a7a')); }
  for (let k = 0; k < 40; k++) { const x = ri(h2(k, 1, 31) * 318), y = ri(120 + h2(k, 2, 31) * 58); rr(x - 2, y - 1, x + 2, y, K); ps(x, y - 1, H('#3a4058')); }
  for (let k = 0; k < 18; k++) { const x = ri(h2(k, 3, 31) * 318), y = ri(126 + h2(k, 4, 31) * 50); for (let i = -2; i <= 2; i++) R.linea(x + i, y, x + i * 2, y - 5 + (i & 1), H('#2a3046')); }
  // un perro que duerme junto a la choza
  ovalo(70, 150, 6, 3, (x, y, d) => d > 0.7 ? K : H('#6a4a2a')); rr(63, 146, 67, 150, K); rr(64, 147, 66, 149, H('#6a4a2a'));
});
const gacela = (x, y, t, dir = 1, salto = 0, noche = false) => { x = ri(x); y = ri(y - salto); const C1 = noche ? H('#2a2a3a') : H('#c08a4a'), C2 = noche ? H('#3a3a4e') : H('#e8d0a8'), pp = Math.floor(t * 8) & 1;
  for (let j = -3; j <= 3; j++) for (let i = -6; i <= 6; i++) if ((i / 6) ** 2 + (j / 3) ** 2 < 1) ps(x + i, y - 7 + j, j > 1 ? C2 : ((i / 6) ** 2 + (j / 3) ** 2 > 0.7 ? K : C1));
  for (const i of [-4, -2, 3, 5]) R.linea(x + i, y - 5, x + i + (salto ? dir * 2 : (i & 1 ? pp : -pp)), y, K);
  R.linea(x + dir * 5, y - 8, x + dir * 8, y - 13, K); rr(x + dir * 8 - 1, y - 15, x + dir * 8 + dir * 3, y - 12, K); ps(x + dir * 9, y - 14, C1);
  R.linea(x + dir * 8, y - 15, x + dir * 6, y - 20, K); R.linea(x + dir * 9, y - 15, x + dir * 8, y - 20, K); ps(x - dir * 6, y - 9, K); };
const p9 = (t) => {
  fondo9();
  estrellas(t, 90, 0, 0, 319, 100, 9);
  // el cometa: la cola larga y la cabeza que se desliza; suelta chispas
  const u = tramo(t, W.N10950 - 0.4, W.OTHER), hx = lerp(96, 176, u), hy = lerp(62, 76, u);
  for (let i = 0; i < 70; i++) { const px = hx - i * 0.95, py = hy - i * 0.42; const w = 1 + i * 0.07; for (let s = -w; s <= w; s += 0.5) { const qx = px + s * 0.4, qy = py + s; if (quieta(qx, qy)) continue; if (b4(ri(qx), ri(qy)) < (1 - i / 70) * 0.9) tine(qx, qy, i < 20 ? H('#e8f4ff') : H('#8ab8e8'), 0.7 * (1 - i / 70)); } }
  R.disco(ri(hx), ri(hy), 3, H('#cfe8ff')); R.disco(ri(hx), ri(hy), 2, H('#ffffff')); destello(hx, hy, 4, H('#e8f4ff'));
  for (let k = 0; k < 5; k++) { const v = (t * 0.8 + k / 5) % 1; ps(hx - 8 - v * 30, hy + 4 + v * 10 + k, H('#8ab8e8')); }
  // el resplandor lejano en «BC», tras las lomas
  const fl = tramo(t, W.BC - 0.1, W.BC + 0.2) * (1 - tramo(t, W.BC + 0.3, W.BC + 2.0));
  if (fl > 0) for (let y = 70; y < 108; y++) for (let x = 200; x < 319; x++) { const d = Math.hypot(x - 262, (y - 104) * 1.6) / 60; if (d < 1 && b4(x, y) < (1 - d) * fl) tine(x, y, H('#ffc890'), 0.5); }
  if (t > W.N10950 + 0.1) { const p = pop(t, W.N10950 + 0.1, 0.4); if (p > 0.4) R.numero('10950', 160, 44, { tam: 16, centro: true }); }
  // la hoguera con su humo y las chispas, y su luz
  const fx = 112, fy = 150; for (let y = 120; y < 179; y++) for (let x = 60; x < 170; x++) { const d = Math.hypot(x - fx, (y - fy) * 1.8) / 54; if (d < 1 && b4(x, y) < (1 - d) * 0.7) tine(x, y, H('#ff9a40'), 0.22); }
  for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; rr(fx + Math.cos(a) * 9 - 1, fy + Math.sin(a) * 3 - 1, fx + Math.cos(a) * 9 + 1, fy + Math.sin(a) * 3, H('#5a5a64')); }
  for (let j = 0; j < 12; j++) { const w = (1 - j / 12) * 5; for (let i = -w; i <= w; i++) ps(fx + i + Math.sin(t * 9 + j) * j * 0.2, fy - 1 - j, Math.abs(i) > w * 0.6 ? H('#e84a1a') : Math.abs(i) > w * 0.3 ? H('#ffa03a') : H('#fff0a0')); }
  for (let k = 0; k < 6; k++) { const v = (t * 0.5 + k / 6) % 1; tine(fx + Math.sin(v * 6 + k) * 4, fy - 14 - v * 40, H('#6a6a7a'), 0.5 * (1 - v)); ps(fx + Math.sin(t * 3 + k * 2) * 6, fy - 14 - ((t * 1.4 + k / 6) % 1) * 30, H('#ffc060')); }
  // el niño ve el cometa y lo señala; los mayores se vuelven, sorprendidos; la madre lo coge del hombro
  const vuelve = t > W.N10950 + 0.9;
  R.actor(EL.ninoGB, 130, 152, t, { dir: -1, dedo: true, habla: t < W.N10950 + 1.4, salto: t < W.N10950 + 0.8 ? ri(Math.abs(Math.sin(t * 8)) * 2) : 0 });
  R.actor(EL.cazadorGB, 150, 152, t, { dir: vuelve ? -1 : 1, sorpresa: vuelve });
  R.actor(EL.cazadoraGB, 74, 152, t, { dir: 1, sorpresa: t > W.N10950 + 1.4, brazos: t > W.BC + 0.1 && t < W.BC + 1.2 });
  // las gacelas del cerro huyen con el resplandor
  const hu = tramo(t, W.BC + 0.1, W.OTHER);
  for (let k = 0; k < 4; k++) { const gx = 206 + k * 15 + hu * 70; gacela(gx, ri(100 + Math.sin(gx * 0.02 + 1) * 6 + Math.sin(gx * 0.07) * 2) + 1, t, 1, hu > 0 ? ri(Math.abs(Math.sin(t * 7 + k)) * 3) : 0, true); }
  for (const [x, y] of [[10, 176], [90, 178], [200, 175], [300, 177]]) mata(x, y, t, H('#2a2a3a'), H('#1a1a26'), 6, 7);
};

// ── 10 · el aula del congreso: ¿qué animales cuentan? ──────────────────────────────────────────────────────────
const PANT = [66, 22, 234, 108];
// los cuatro animales de la diapositiva: buitre, escorpión, serpiente y grulla (dibujados con grosor para leerse)
const ICONOS10 = [
  (x, y, c) => { R.poligono([[x - 16, y - 2], [x - 4, y - 9], [x - 1, y - 2]], c); R.poligono([[x + 16, y - 2], [x + 4, y - 9], [x + 1, y - 2]], c); ovalo(x, y + 1, 4, 6, c); R.disco(x, y - 9, 3, c); R.poligono([[x + 2, y - 10], [x + 6, y - 8], [x + 2, y - 7]], c); R.poligono([[x - 3, y + 6], [x + 3, y + 6], [x, y + 11]], c); },
  (x, y, c) => { ovalo(x - 2, y + 3, 7, 4, c); for (let k = 0; k < 10; k++) { const a = Math.PI - k * 0.32; R.disco(ri(x + 5 + Math.cos(a) * -6 + k * 0.6), ri(y - 2 - Math.sin(a) * 8 + 2), 1, c); } R.disco(x + 4, y - 9, 2, c); for (const s of [-1, 1]) { R.linea(x - 8, y + 3, x - 13, y + 3 + s * 5, c); R.disco(x - 14, y + 3 + s * 6, 2, c); } for (let i = -4; i <= 2; i += 3) { R.linea(x + i, y + 6, x + i - 2, y + 10, c); R.linea(x + i, y, x + i - 2, y - 3, c); } },
  (x, y, c) => { for (let k = -14; k <= 12; k++) { const yy = y + Math.sin(k * 0.35) * 6; rr(x + k, yy - 1, x + k, yy + 1, c); } ovalo(x + 14, y + Math.sin(14 * 0.35) * 6, 3, 2, c); },
  (x, y, c) => { ovalo(x - 3, y + 1, 7, 4, c); R.linea(x + 3, y - 1, x + 7, y - 12, c); R.linea(x + 4, y - 1, x + 8, y - 12, c); R.disco(x + 8, y - 12, 2, c); R.linea(x + 9, y - 12, x + 14, y - 10, c); R.linea(x - 4, y + 4, x - 5, y + 12, c); R.linea(x, y + 4, x + 1, y + 12, c); R.poligono([[x - 10, y - 1], [x - 15, y + 3], [x - 9, y + 3]], c); },
];
const lineaPilar = (cx, cy, c) => { // el dibujo de línea del pilar 43: fuste, buitre, disco, serpiente, aves y escorpión
  R.linea(cx - 40, cy - 40, cx + 40, cy - 40, c); R.linea(cx - 40, cy - 40, cx - 40, cy + 40, c); R.linea(cx + 40, cy - 40, cx + 40, cy + 40, c); R.linea(cx - 46, cy - 40, cx + 46, cy - 40, c);
  // el buitre con las alas abiertas
  R.poligono([[cx - 30, cy - 18], [cx - 6, cy - 26], [cx - 4, cy - 14], [cx - 24, cy - 6]], c); R.poligono([[cx + 2, cy - 26], [cx + 22, cy - 20], [cx + 6, cy - 12]], c); R.disco(cx - 4, cy - 14, 5, c); R.disco(cx - 8, cy - 26, 3, c);
  R.disco(cx + 12, cy - 30, 5, c); R.disco(cx + 12, cy - 30, 3, H('#f4f4f0'));
  for (let y = -30; y < 34; y++) ps(cx - 34 + Math.sin(y * 0.3) * 3, cy + y, c);
  for (const [x, y] of [[26, -10], [28, 8]]) { R.disco(cx + x, cy + y, 3, c); R.linea(cx + x, cy + y + 2, cx + x - 1, cy + y + 7, c); R.linea(cx + x + 2, cy + y - 2, cx + x + 6, cy + y - 4, c); }
  R.disco(cx - 14, cy + 10, 3, c); R.linea(cx - 14, cy + 12, cx - 15, cy + 16, c);
  rr(cx + 2, cy + 22, cx + 12, cy + 26, c); for (let k = 0; k < 8; k++) ps(cx + 12 + k * 0.8, cy + 22 - Math.sin(k * 0.4) * 9, c); R.linea(cx + 2, cy + 23, cx - 4, cy + 20, c); R.linea(cx + 2, cy + 25, cx - 4, cy + 28, c);
};
const fondo10 = () => fijo('p10', () => {
  // la pared de paneles de madera
  llena(0, 0, 319, 136, (x, y) => { const tab = Math.floor(x / 18), j = x % 18; return j === 0 ? H('#2a1810') : rmp(pal(['#3a2216', '#54321e', '#6e4428', '#865634']), 1.8 + Math.sin(y * 0.05 + tab * 2 + Math.sin(x * 0.4) * 1.2) * 0.5 + (h2(tab, y >> 3, 3) - 0.5) * 0.4 + (j === 1 ? 0.6 : 0), x, y); });
  for (let x = 0; x < 320; x++) { ps(x, 124, H('#2a1810')); ps(x, 125, H('#9a6a40')); }
  // la pantalla de proyección con su barra y la pizarra a la izquierda
  rr(PANT[0] - 3, PANT[1] - 4, PANT[2] + 3, PANT[1] - 1, K); rr(PANT[0] - 2, PANT[1] - 3, PANT[2] + 2, PANT[1] - 2, H('#4a4a54'));
  llena(PANT[0], PANT[1], PANT[2], PANT[3], (x, y) => rmp(pal(['#c8c8c4', '#dcdcd8', '#ececea', '#f8f8f4']), 3 - Math.abs(x - 150) * 0.012 - (y - PANT[1]) * 0.005, x, y));
  R.linea(PANT[0], PANT[3] + 1, PANT[2], PANT[3] + 1, H('#8a8a8a'));
  // la diapositiva: la foto del pilar 43 a la izquierda y cuatro animales a la derecha (sin letras)
  llena(78, 26, 132, 104, (x, y) => rmp(pal(['#5a5a62', '#7a7a80']), 1 + (h2(x >> 2, y >> 2, 3) - 0.5), x, y));
  T.d_pilar(R, 106, 104, { escala: 1.05, brazos: false, relieves: ['buitre', 'escorpion', 'serpientes'], luz: 0.6, sombra: false });
  for (const [x, y] of [[150, 30], [194, 30], [150, 68], [194, 68]]) { rr(x, y, x + 36, y + 34, H('#8a8a90')); rr(x + 1, y + 1, x + 35, y + 33, H('#ffffff')); }
  ICONOS10.forEach((f, k) => f(168 + (k & 1) * 44, 47 + (k >> 1) * 38, H('#2a2a30')));
  // el reloj de pared, la planta, la jarra de agua
  R.disco(36, 48, 8, K); R.disco(36, 48, 7, H('#f4f0e4')); R.linea(36, 48, 36, 43, K); R.linea(36, 48, 40, 49, K);
  rr(14, 110, 34, 136, K); rr(15, 111, 33, 135, H('#c86a3a')); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32; R.linea(24, 110, ri(24 + Math.cos(a) * 18), ri(110 + Math.sin(a) * 22), k & 1 ? H('#3a7a3a') : H('#5a9a4a')); }
  // el suelo y las filas de butacas por delante
  llena(0, 136, 319, 179, (x, y) => rmp(pal(['#2a1c24', '#3a2632', '#4a3040']), 1.4 + ((x + y * 2) % 8 === 0 ? 0.8 : 0), x, y));
  // el atril de madera a la derecha
  R.poligono([[256, 140], [290, 140], [286, 168], [260, 168]], K); llena(257, 141, 289, 167, (x, y) => { const l = 257 + (y - 141) * 0.14, r = 289 - (y - 141) * 0.14; return x < l || x > r ? undefined : veta(x, y, pal(['#4a2e1a', '#6a4426', '#8a5a34', '#a8723f']), 2, 8, 9); });
  rr(268, 150, 278, 157, H('#c8a050')); R.disco(273, 153, 2, H('#e8d080'));
});
const p10 = (t) => {
  fondo10();
  // el haz del proyector desde el fondo de la sala, con su polvo
  for (let y = 22; y < 179; y++) { const u = (178 - y) / 156, x0 = lerp(150, PANT[0], u), x1 = lerp(166, PANT[2], u); for (let x = ri(x0); x <= ri(x1); x++) if (b4(x, y) < 0.22 && y > PANT[3]) tine(x, y, H('#e8eaff'), 0.18); }
  for (let k = 0; k < 10; k++) { const u = (t * 0.07 + k / 10) % 1; ps(150 + Math.sin(k * 3 + t) * 30 * (1 - u), 178 - u * 70, H('#c8d0ff')); }
  // el puntero láser: rodea el buitre (visto) en «choose» y la serpiente (X) en «animals»
  const p1x = 168, p1y = 46, p2x = 168, p2y = 84;
  let lx = 150 + Math.sin(t * 1.3) * 30, ly = 70 + Math.cos(t * 1.7) * 14;
  if (t > W.CHOOSE - 0.4 && t < W.ANIMALS - 0.3) { const a = (t - W.CHOOSE) * 9; lx = p1x + Math.cos(a) * 14; ly = p1y + Math.sin(a) * 10; }
  if (t > W.ANIMALS - 0.3) { const a = (t - W.ANIMALS) * 9; lx = p2x + Math.cos(a) * 14; ly = p2y + Math.sin(a) * 8; }
  if (t < W.CHOOSE - 0.4) { lx = lerp(110, 150, (Math.sin(t * 1.1) + 1) / 2); ly = 40 + ((t * 18) % 60); }
  R.disco(ri(lx), ri(ly), 2, H('#ff7a7a')); ps(lx, ly, H('#ffffff'));
  if (t > W.CHOOSE + 0.2) { const s = pop(t, W.CHOOSE + 0.2, 0.3); if (s > 0.3) T.visto(R, p1x + 10, p1y - 14, 1); }
  if (t > W.ANIMALS - 0.05) equis(p2x + 14, p2y - 12, 1, pop(t, W.ANIMALS - 0.05, 0.3));
  // la especialista tras el atril, con el puntero: habla y señala la pantalla
  const e = R.actor(EL.arqueologaGB, 266, 158, t, { dir: -1, habla: t > W.ANSWERED - 0.3, sostiene: [258, 138], sonrisa: t > W.CHOOSE + 0.3 });
  rr(e.mano[0] - 4, e.mano[1] - 1, e.mano[0], e.mano[1], K); ps(e.mano[0] - 4, e.mano[1] - 1, H('#ff3a3a'));
  R.linea(e.mano[0] - 4, e.mano[1] - 1, ri(lx), ri(ly), H('#ff5a5a'), 0); 
  rr(252, 138, 294, 142, K); rr(253, 139, 293, 141, H('#a8723f')); rr(260, 143, 262, 150, H('#e8e8f0')); rr(259, 141, 263, 143, H('#8ab8e0'));
  // el público: cabezas tras las butacas; uno levanta la mano en «answered», otro toma notas
  const pub = [[EL.profesor, 20, 1], [EL.vecina, 52, 1], [EL.consejeroCalvo, 88, 1], [EL.tecnica, 184, -1], [EL.senor30, 216, -1]];
  pub.forEach(([el, x, d], k) => { const o = { dir: d, quieto: false }; if (k === 0) o.brazos = t > W.ANSWERED - 0.2 && t < W.READ + 0.3; if (k === 3) o.sostiene = [x - 2, 162]; if (k === 2) o.sonrisa = t > W.CHOOSE + 0.3;
    const a = R.actor(el, x, 180, t, o); if (k === 3) { rr(a.mano[0] - 4, a.mano[1] - 3, a.mano[0] + 1, a.mano[1] + 2, K); rr(a.mano[0] - 3, a.mano[1] - 2, a.mano[0], a.mano[1] + 1, H('#f4f0e4')); } });
  for (let x = 0; x < 250; x += 32) { rr(x + 2, 164, x + 30, 180, K); rr(x + 3, 165, x + 29, 180, H('#8a2a3a')); rr(x + 3, 165, x + 29, 167, H('#aa3a4a')); rr(x + 15, 165, x + 16, 180, H('#6a1e2a')); }
  // el proyector en su carrito, delante en el centro
  rr(144, 168, 172, 180, K); rr(145, 169, 171, 180, H('#3a3a44')); R.disco(158, 172, 3, H('#e8eaff')); ps(166, 176, Math.sin(t * 4) > 0 ? H('#3aff6a') : H('#1a5a2a'));
};

// ── 11 · la carta celeste sobre la mesa: la mano elige qué cuenta… y también encaja una tetera ─────────────────
const CARTA = [30, 26, 236, 168];
const EST11 = []; for (let k = 0; k < 120; k++) EST11.push([ri(CARTA[0] + 6 + h2(k, 1, 11) * (CARTA[2] - CARTA[0] - 12)), ri(CARTA[1] + 6 + h2(k, 2, 11) * (CARTA[3] - CARTA[1] - 12)), h2(k, 3, 11)]);
const cerca11 = (cx, cy, r) => EST11.filter(([x, y]) => Math.hypot(x - cx, (y - cy) * 1.2) < r).sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx));
const recorte11 = () => R.recorte([CARTA[0], CARTA[1], CARTA[2], CARTA[3]]);
const fondo11 = () => fijo('p11', () => {
  llena(0, 0, 319, 179, (x, y) => veta(x, y, pal(['#3a2416', '#5a3a22', '#74502e', '#8a6038', '#a07448']), 2.2, 11, 13));
  // la carta: papel azul noche con su rejilla, círculos de puntos y las estrellas
  rr(CARTA[0] - 1, CARTA[1] - 1, CARTA[2] + 2, CARTA[3] + 2, K); llena(CARTA[0], CARTA[1], CARTA[2], CARTA[3], (x, y) => ((x - CARTA[0]) % 24 === 0 || (y - CARTA[1]) % 24 === 0) && ((x + y) & 1) ? H('#2a3a6a') : rmp(pal(['#0e1636', '#142048', '#1a2a58']), 1.4 + (h2(x >> 3, y >> 3, 4) - 0.5) * 0.5, x, y));
  for (let k = 0; k < 160; k++) { const a = k / 160 * Math.PI * 2; if (k & 1) ps(133 + Math.cos(a) * 60, 97 + Math.sin(a) * 52, H('#3a4a80')); }
  for (const [x, y, s] of EST11) { if (s > 0.85) { R.disco(x, y, 1, H('#cfe0ff')); ps(x, y, H('#ffffff')); } else ps(x, y, s > 0.4 ? H('#e8f0ff') : H('#8a9ac8')); }
  rr(CARTA[2] + 2, CARTA[1] + 2, CARTA[2] + 3, CARTA[3] + 3, H('#2a180e')); rr(CARTA[0] + 2, CARTA[3] + 3, CARTA[2] + 3, CARTA[3] + 3, H('#2a180e'));
  // las piedras que sujetan las esquinas, la regla, el compás, el lápiz y la foto del pilar
  for (const [x, y] of [[32, 28], [234, 166]]) { R.disco(x, y, 5, K); R.disco(x, y, 4, H('#8a8478')); ps(x - 1, y - 2, H('#c8c2b4')); }
  rr(246, 160, 316, 166, K); rr(247, 161, 315, 165, H('#e8d8a0')); for (let x = 249; x < 315; x += 4) rr(x, 161, x, x % 8 === 1 ? 164 : 162, K);
  R.linea(250, 120, 270, 96, K); R.linea(251, 120, 271, 96, H('#a8a8b0')); R.linea(270, 96, 286, 122, K); R.linea(271, 96, 287, 122, H('#a8a8b0')); R.disco(270, 96, 2, H('#5a5a62'));
  R.linea(8, 150, 26, 138, K); R.linea(8, 151, 26, 139, H('#e8c020')); ps(26, 138, H('#3a3a3a'));
  rr(240, 52, 272, 86, K); rr(241, 53, 271, 85, H('#f4f0e4')); rr(244, 56, 268, 78, H('#8a7a6a')); rr(252, 58, 260, 76, H('#d8c8a8')); rr(248, 58, 264, 61, H('#d8c8a8'));
});
const buitreP = (x, y, c) => ICONOS10[0](x, y, c);
const serpP = (x, y, c) => { for (let k = -16; k <= 16; k++) { const yy = y + Math.sin(k * 0.4) * 5; rr(x + k, yy - 1, x + k, yy + 1, c); } R.disco(x + 17, y + Math.sin(17 * 0.4) * 5, 2, c); };
const teteraP = (x, y, c) => { ovalo(x, y, 9, 7, c); rr(x - 4, y - 10, x + 4, y - 7, c); R.disco(x, y - 11, 2, c); R.poligono([[x + 8, y - 1], [x + 16, y - 7], [x + 17, y - 5], [x + 9, y + 3]], c); for (let a = 0; a < 20; a++) { const q = a / 20 * Math.PI; ps(x - 9 - Math.sin(q) * 5, y - 4 + Math.cos(q) * 5, c); ps(x - 10 - Math.sin(q) * 5, y - 4 + Math.cos(q) * 5, c); } };
const pieza11 = (f, x, y, sombra = true) => { if (sombra) f(x + 2, y + 2, H('#0a0810')); f(x, y, H('#e8d8b4')); f(x, y - 1, H('#f4ead0')); };
const p11 = (t) => {
  fondo11();
  // la taza de té con su vapor
  R.disco(290, 70, 11, K); R.disco(290, 70, 10, H('#f4f0e4')); R.disco(290, 70, 7, H('#8a4a1a')); R.disco(288, 68, 2, H('#c8823a')); rr(300, 66, 305, 74, K); rr(301, 67, 304, 73, H('#f4f0e4'));
  for (let k = 0; k < 5; k++) { const v = (t * 0.6 + k / 5) % 1; tine(286 + Math.sin(v * 6 + k) * 3 + k, 58 - v * 12, H('#ffffff'), 0.5 * (1 - v)); }
  // el montón de recortes de papel a la derecha
  pieza11(buitreP, 286, 140); pieza11(serpP, 280, 120); pieza11(teteraP, 298, 152);
  // las tres jugadas: el buitre (cuenta), la serpiente (no cuenta) y la tetera (¡también encaja!)
  const J = [[buitreP, W.COUNT - 0.3, 196, 138, 1], [serpP, W.DONT2 - 0.9, 150, 152, 0], [teteraP, W.FREEDOM - 0.9, 98, 146, 1]];
  let mano = null;
  J.forEach(([f, t0, tx, ty, cuenta], k) => { if (t < t0) return; const u = ease(tramo(t, t0, t0 + 0.8)), x = lerp(286, tx, u), y = lerp(150, ty, u);
    pieza11(f, x, y, true);
    if (u >= 1) { const est = cerca11(tx, ty, 26), n = est.length, pr = tramo(t, t0 + 0.85, t0 + 1.6); recorte11();
      if (cuenta) { for (let i = 0; i < Math.floor(n * pr); i++) { const [a, b] = est[i], [c, d] = est[(i + 1) % n]; R.linea(a, b, c, d, H('#7affb0')); } for (const [a, b] of est) { R.disco(a, b, 1, H('#e8fff0')); } }
      else { for (const [a, b] of est) ps(a, b, H('#4a5a80')); }
      R.recorte(null); if (!cuenta) equis(tx, ty - 2, 1, pop(t, t0 + 0.95, 0.3)); }
    if (u < 1 || t < t0 + 1.0) mano = [x + 4, y + 2]; });
  // la mano que lleva el recorte (brazo canónico desde abajo a la derecha)
  const [hx, hy] = mano ?? [300 + Math.sin(t) * 2, 172];
  T.brazo(R, hx + 36, 206, hx + 6, hy + 4, '#5a7a9a', -1, { codo: [hx + 28, hy + 26] });
  if (t > W.FREEDOM + 0.75) R.bocadillo(112, 118, { icono: '!' });
};

// ── 12 · una roca cualquiera de noche: la linterna encuentra lo que buscaba ────────────────────────────────────
const ROCA = (x, y) => { const a = Math.atan2(y - 108, x - 162), r = 62 + Math.sin(a * 3 + 1) * 6 + Math.sin(a * 7) * 3 + Math.cos(a * 2) * 5; return Math.hypot(x - 162, (y - 108) * 1.4) < r && y < 150; };
const HOY12 = [[194, 92], [202, 100], [194, 108], [186, 100], [166, 92], [162, 100], [166, 108], [140, 84], [134, 100], [140, 116], [118, 90], [116, 110]];
const AGUJ = (() => { const a = HOY12.slice(); for (let k = 0; k < 22; k++) { const x = ri(110 + h2(k, 1, 12) * 104), y = ri(74 + h2(k, 2, 12) * 66); if (ROCA(x, y)) a.push([x, y]); } return a; })();
const COMETA12 = [[[194, 92], [202, 100], [194, 108], [186, 100], [194, 92]], [[186, 100], [166, 92], [140, 84], [118, 90]], [[186, 100], [162, 100], [134, 100]], [[186, 100], [166, 108], [140, 116], [116, 110]]];
const fondo12 = () => fijo('p12', () => {
  cieloG(0, 82, pal(['#070a1c', '#0c1230', '#141c40', '#1c2850']), 6);
  // la cubierta blanca, lejos, apenas iluminada, y las lomas
  llena(0, 60, 319, 90, (x, y) => { const s = 76 + Math.sin(x * 0.04) * 4; return y < s ? undefined : y < s + 1 ? H('#2a3460') : H('#10142a'); });
  for (let x = 222; x < 270; x++) { const top = 66 + ri(3 * Math.sin(((x - 222) % 12) / 12 * Math.PI)); for (let y = top; y < 72; y++) ps(x, y, y === top ? H('#8a90b0') : H('#4a5070')); }
  // el suelo de la escombrera, azulado
  llena(0, 80, 319, 179, (x, y) => { if (y < 76 + Math.sin(x * 0.04) * 4) return undefined; return tierra(x, y, pal(['#0c0e18', '#141826', '#1c2234', '#262c42']), 1.6 + (y - 90) * 0.006, 14); });
  // el poste de la cerca para la lechuza, la cerca con su cuerda, sacos, una carretilla y piedras sueltas
  rr(288, 96, 292, 150, K); rr(289, 97, 291, 149, H('#3a3024'));
  for (let x = 236; x < 320; x += 26) { rr(x, 112, x + 1, 150, H('#2a2620')); } for (let x = 236; x < 320; x++) ps(x, 118 + ri(Math.sin((x - 236) / 26 * Math.PI) * 2), H('#4a4a5a'));
  for (const [x, y] of [[20, 120], [34, 118], [27, 112]]) { rr(x - 6, y - 3, x + 6, y + 3, K); rr(x - 5, y - 2, x + 5, y + 2, H('#3a3e52')); rr(x - 5, y + 1, x + 5, y + 2, H('#2a2e40')); }
  R.poligono([[250, 160], [276, 160], [272, 170], [254, 170]], K); R.poligono([[251, 161], [275, 161], [271, 169], [255, 169]], H('#2a3a4a')); R.disco(278, 172, 4, K); R.disco(278, 172, 3, H('#1a1a22')); R.linea(254, 168, 240, 176, H('#3a3024'));
  for (let k = 0; k < 50; k++) { const x = ri(h2(k, 1, 33) * 318), y = ri(96 + h2(k, 2, 33) * 82); if (ROCA(x, y)) continue; const w = 1 + ri(h2(k, 3, 33) * 3); rr(x - w, y - 1, x + w, y + 1, K); rr(x - w + 1, y - 1, x + w - 1, y, H('#3a4058')); }
  for (let k = 0; k < 14; k++) { const x = ri(h2(k, 4, 33) * 318), y = ri(150 + h2(k, 5, 33) * 28); for (let i = -2; i <= 2; i++) R.linea(x + i, y, x + i * 2, y - 6 + (i & 1), H('#2a3248')); }
});
const p12 = (t) => {
  fondo12();
  estrellas(t, 60, 0, 0, 319, 70, 12);
  // la linterna: barre la roca; donde da la luz, la caliza se ve con sus agujeros
  const v = tramo(t, W.ANY, W.SAYING), sx = t < W.SAYING ? lerp(120, 200, ease(v)) : 162 + Math.sin(t * 0.7) * 6, sy = t < W.SAYING ? 100 + Math.sin(v * 6) * 12 : 104;
  const baja = tramo(t, W.LOOKING + 0.4, W.LOOKING + 1.0), rad = lerp(36, 64, tramo(t, W.SAYING, W.SAYING + 0.8)) * (1 - baja * 0.6);
  const LUZ = pal(['#5a4e3e', '#8a7a60', '#b0a080', '#d4c6a2', '#ece0c0']), OSC = pal(['#0e1018', '#181c28', '#222838', '#2c3448']);
  llena(90, 56, 236, 150, (x, y) => { if (!ROCA(x, y)) return undefined; const d = Math.hypot(x - sx, y - sy) / rad, l = cl((1.1 - d) * 4), v2 = 2 + (h2(x >> 1, y >> 1, 15) - 0.5) * 1.2 + (x < 162 ? 0.3 : -0.3) - (ROCA(x, y + 2) ? 0 : 1.2) - (ROCA(x - 2, y) ? 0 : -0.6);
    return b4(x, y) < l ? rmp(LUZ, v2, x, y) : rmp(OSC, v2, x, y); });
  for (const [x, y] of AGUJ) { const d = Math.hypot(x - sx, y - sy) / rad; R.disco(x, y, 2, d < 1 ? H('#3a3024') : H('#080a10')); ps(x - 1, y - 1, d < 1 ? H('#2a2018') : H('#06080c')); }
  // los agujeros se unen en un cometa en «saying what» y se borran en «looking for»
  const tr = tramo(t, W.SAYING, W.ALREADY), bo = tramo(t, W.LOOKING, W.LOOKING + 0.9);
  COMETA12.forEach((tra, j) => { const n = tra.length - 1, q0 = cl(tr * 4 - j); for (let i = 0; i < n; i++) { const q = cl(q0 * n - i); if (q <= 0) break; const [a, b] = tra[i], [c, d] = tra[i + 1], ex = lerp(a, c, q), ey = lerp(b, d, q);
    const L = Math.max(1, Math.ceil(Math.hypot(ex - a, ey - b))); for (let s = 0; s <= L; s++) { const px = lerp(a, ex, s / L), py = lerp(b, ey, s / L); if (b4(ri(px), ri(py)) >= bo) { for (const [ox, oy] of [[0, 0], [1, 0], [0, 1]]) ps(px + ox, py + oy, j === 0 ? H('#fff4b0') : H('#ffd860')); tine(px, py + 2, H('#ffe890'), 0.3); } } } });
  if (tr >= 1 && bo < 1) for (const tra of COMETA12) for (const [x, y] of tra) if (b4(x, y) >= bo) destello(x, y, 2, H('#fff4b0'));
  // el turista con la linterna y su haz
  const p = R.actor(EL.espectadorGB, 40, 156, t, { dir: 1, sostiene: [60, ri(lerp(138, 146, baja))], sorpresa: t > W.ALREADY - 0.1 && t < W.LOOKING + 0.4, sonrisa: t > W.LOOKING + 0.4 });
  const [mx, my] = p.mano; for (let i = 4; i < 200; i += 1) { const px = mx + (sx - mx) * i / 200 * 1.1, py = my + (sy - my) * i / 200 * 1.1, w = 1 + i * 0.12 * (rad / 40); for (let s = -w; s <= w; s++) if (b4(ri(px), ri(py + s)) < 0.25 * (1 - baja * 0.5)) tine(px, py + s, H('#fff4c8'), 0.25); }
  rr(mx - 1, my - 2, mx + 5, my + 1, K); rr(mx, my - 1, mx + 4, my, H('#5a5a64')); ps(mx + 5, my - 1, H('#ffffff'));
  if (t > W.ALREADY - 0.1 && t < W.LOOKING + 0.4) R.bocadillo(p.cabeza[0], p.cabeza[1] - 4, { icono: '!' });
  // la lechuza del poste parpadea y gira la cabeza; el zorro cruza por delante
  const lx = 290, ly = 96, gira = Math.sin(t * 0.9) > 0 ? 1 : -1; ovalo(lx, ly - 6, 5, 7, (x, y, d) => d > 0.7 ? K : y > ly - 4 ? H('#8a7a5a') : H('#a8946a'));
  const pa = (t % 3) < 0.15; ps(lx - 2 + gira, ly - 9, pa ? K : H('#ffd34a')); ps(lx + 2 + gira, ly - 9, pa ? K : H('#ffd34a')); ps(lx + gira, ly - 7, H('#e8a040'));
  const zx = ri(lerp(340, -30, tramo(t, W.ANY + 0.3, W.AND4 - 0.2))), zp = Math.floor(t * 9) & 1;
  rr(zx, 166, zx + 14, 171, K); rr(zx + 1, 167, zx + 13, 170, H('#c86a2a')); rr(zx - 5, 163, zx + 1, 169, K); rr(zx - 4, 164, zx, 168, H('#c86a2a')); ps(zx - 4, 162, K); ps(zx - 1, 162, K); ps(zx - 6, 167, K); ps(zx - 3, 165, H('#ffe060'));
  R.linea(zx + 14, 168, zx + 21, 165, H('#c86a2a')); ps(zx + 21, 165, H('#f4f0e4')); for (const i of [2, 11]) R.linea(zx + i + (i < 6 ? zp : -zp), 171, zx + i, 175, K);
};
'''
PARTE3 = r'''
// ── 13 · las catas de la ladera bajo el sol: el detector calla ────────────────────────────────────────────────
const CIELO_D = pal(['#4a80c0', '#5a90cc', '#6fa0d6', '#88b4e0', '#a6c8e6', '#c4dcea']);
const fondo13 = () => fijo('p13', () => {
  cieloG(0, 72, CIELO_D, 13);
  // la sierra lejana y la cubierta blanca a la derecha
  llena(0, 40, 319, 64, (x, y) => y < 50 + Math.sin(x * 0.03) * 3 + Math.sin(x * 0.1) * 1.5 ? undefined : (x + y) & 1 ? H('#9aaac0') : H('#a8b6c8'));
  llena(0, 52, 319, 179, (x, y) => { if (y < 58 + (x - 160) * (x - 160) * 0.0004) return undefined; return tierra(x, y, pal(['#6a4c34', '#8a6644', '#a88054', '#c49a68', '#dcb682']), 2.6 - (y - 60) * 0.004 + Math.sin(x * 0.05 + y * 0.1) * 0.3, 16); });
  for (let x = 210; x < 320; x++) { const top = 48 + ri(7 * Math.sin(((x - 210) % 27) / 27 * Math.PI)); for (let y = top; y < 62; y++) ps(x, y, y < 58 ? rmp(pal(['#b8b8c4', '#dcdce4', '#f4f4f8']), 2.4 - (y - top) * 0.2, x, y) : H('#5a5048')); ps(x, top - 1, H('#8a8a98')); }
  for (let x = 210; x < 320; x += 27) R.linea(x, 46, x, 70, H('#6a6a78'));
  // las catas: cuadros con sus perfiles, cuerdas, etiquetas, sacos y una escalera
  for (const [x0, y0, w, h] of [[24, 80, 70, 26], [110, 86, 84, 30], [212, 82, 76, 24]]) {
    llena(x0, y0, x0 + w, y0 + h, (x, y) => y < y0 + 6 ? rmp(pal(['#4a3424', '#6a4a32', '#8a6440']), 1 + (y - y0) * 0.15 + ((y - y0) % 3 === 0 ? -0.6 : 0), x, y) : tierra(x, y, pal(['#5a3e2a', '#7a5638', '#966e48']), 1.2, 17));
    for (let x = x0; x <= x0 + w; x++) { ps(x, y0 - 1, H('#f4f0e4')); ps(x, y0 + h + 1, H('#f4f0e4')); } for (let y = y0; y <= y0 + h; y++) { ps(x0 - 1, y, H('#f4f0e4')); ps(x0 + w + 1, y, H('#f4f0e4')); }
    for (const [i, j] of [[0, 0], [w, 0], [0, h], [w, h]]) { rr(x0 + i - 1, y0 + j - 4, x0 + i, y0 + j, K); }
    for (let k = 0; k < 5; k++) { const sx = x0 + 4 + k * 9; rr(sx, y0 + h + 3, sx + 7, y0 + h + 7, K); rr(sx + 1, y0 + h + 4, sx + 6, y0 + h + 6, H('#e8dcc0')); }
    rr(x0 + w - 12, y0 + 10, x0 + w - 4, y0 + 15, H('#f4f0e4')); cifras(String(x0 % 97 + 10), x0 + w - 11, y0 + 10, K); }
  for (let y = 84; y < 118; y++) { if ((y & 3) === 0) rr(132, y, 142, y, H('#8a6440')); ps(132, y, K); ps(142, y, K); }
  // el primer término: tierra removida con piedras, el cubo y el cedazo
  for (let k = 0; k < 26; k++) { const x = ri(h2(k, 1, 18) * 318), y = ri(128 + h2(k, 2, 18) * 50); rr(x - 2, y - 1, x + 2, y + 1, K); rr(x - 1, y - 1, x + 1, y, H('#e8d4b0')); }
  ovalo(264, 130, 9, 3, K); R.poligono([[255, 130], [273, 130], [271, 146], [257, 146]], K); R.poligono([[256, 131], [272, 131], [270, 145], [258, 145]], H('#3a3a44')); ovalo(264, 130, 8, 2, H('#6a4a32')); for (let k = 0; k < 4; k++) ps(259 + k * 3, 130, H('#a87e52')); R.linea(258, 135, 270, 135, H('#5a5a64'));
  rr(212, 140, 214, 152, K); rr(238, 140, 240, 152, K);
});
const p13 = (t) => {
  fondo13();
  nube(60 + t * 1.2, 28, 34, pal(['#b8c8dc', '#e4ecf4', '#ffffff'])); nube(184 + t * 0.6, 22, 30, pal(['#c4d0e0', '#eef2f8', '#ffffff'])); nube(120 + t * 2, 42, 18, pal(['#a8b8d0', '#dce4f0', '#ffffff']));
  for (let k = 0; k < 2; k++) pajaro(200 - t * 6 + k * 9, 30 + k * 3 + Math.sin(t * 2 + k) * 2, t, H('#3a4a5a'), k);
  // los trabajadores diminutos en las catas: pico arriba y abajo
  for (const [x, y, k] of [[50, 100, 0], [150, 108, 1], [240, 100, 2]]) { const g = Math.sin(t * 5 + k) > 0; rr(x, y - 6, x + 2, y, H(['#c83a3a', '#3a8ad8', '#e8c040'][k])); ps(x + 1, y - 7, H('#d8a070')); ps(x + 1, y - 8, H('#f4f0e4')); R.linea(x + 3, y - 5, x + 6, g ? y - 9 : y - 2, H('#6a5040')); }
  // la arqueóloga criba al fondo derecha y se vuelve en «nowhere»
  const vuelve = t > W.NOWHERE + 0.4, dxC = vuelve ? 0 : Math.sin(t * 15) * 2;
  const a = R.actor(EL.arqueologaGB, 232, 152, t, { dir: -1, sostiene: vuelve ? undefined : [228, 140], habla: t > W.HILL && t < W.TURN + 0.6 });
  criba(226, 141, dxC); if (!vuelve) for (let k = 0; k < 5; k++) { const u = (t * 2 + k / 5) % 1; ps(219 + k * 4 + dxC, 142 + u * 9, H('#8a6446')); }
  // el arqueólogo barre con el detector de metales: la luz verde no cambia; lo levanta y lo golpea en «nowhere»
  const sube = tramo(t, W.NOWHERE - 0.2, W.NOWHERE + 0.3) * (1 - tramo(t, W.TURN + 0.4, W.TURN + 0.9)), golpe = t > W.NOWHERE + 0.3 && t < W.TURN + 0.4 && (Math.floor(t * 6) & 1);
  const barre = Math.sin(t * 2.2) * 14 * (1 - sube), dx = 160 + barre, dy = lerp(170, 140, sube);
  const d = R.actor(EL.arqueologoGB, 110, 166, t, { dir: 1, sostiene: [128, 150 - sube * 6], sorpresa: t > W.ADVANCED && t < W.WOULD, brazos: false });
  const [mx, my] = d.mano; R.linea(mx, my, dx, dy - 2, K); R.linea(mx, my - 1, dx, dy - 3, H('#8a8a96'));
  rr(mx + 2, my - 4, mx + 8, my + 1, K); rr(mx + 3, my - 3, mx + 7, my, H('#2a2a32')); ps(mx + 6, my - 2, H('#3aff6a'));
  ovalo(ri(dx), ri(dy), 8, 3, (x, y, q) => q > 0.6 ? K : H('#e8a020')); ps(dx - 3, dy - 1, H('#ffd060'));
  if (golpe) { ps(mx + 4, my - 7, H('#ffffff')); ps(mx + 8, my - 6, H('#ffffff')); }
  if (t > W.ADVANCED) R.bocadillo(d.cabeza[0] + 2, d.cabeza[1] - 4, { icono: '?' });
  for (const [x, y] of [[8, 178], [300, 176], [190, 179]]) mata(x, y, t, H('#c8a060'), H('#8a6a3a'), 6, 8);
};

// ── 14 · la criba desde arriba: ni metal, ni escritura, ni herramientas que no sean de piedra ──────────────────
const CRI = [160, 102, 74];
const fondo14 = () => fijo('p14', () => {
  // la lona azul con sus pliegues, y tierra encima
  llena(0, 0, 319, 179, (x, y) => { const pl = Math.sin(x * 0.05 + y * 0.02) + Math.sin(y * 0.09 - x * 0.01) * 0.6; return rmp(pal(['#1a3a6a', '#2a4e86', '#3a62a0', '#4a76b4']), 2 + pl * 0.6, x, y); });
  for (let x = 0; x < 320; x += 30) for (let y = 0; y < 180; y += 30) R.disco(x + 4, y + 4, 1, H('#a8b8d0'));
  for (const [cx, cy, r] of [[30, 150, 30], [296, 40, 26], [280, 168, 22]]) llena(cx - r, cy - r, cx + r, cy + r, (x, y) => { const d = Math.hypot(x - cx, y - cy) / r; return d < 1 - h2(x >> 2, y >> 2, 3) * 0.2 ? tierra(x, y, pal(['#4a3424', '#6a4a32', '#8a6440', '#a87e52']), 2.2 - d, 19) : undefined; });
  // los cubos de goma vistos desde arriba, la paleta, la brocha y las bolsas con su número
  for (const [x, y] of [[40, 40], [270, 110]]) { R.disco(x, y, 17, K); R.disco(x, y, 16, H('#2a2a32')); R.disco(x, y, 12, H('#1a1a20')); R.disco(x - 3, y + 2, 9, H('#6a4a32')); for (let k = 0; k < 6; k++) ps(x - 8 + k * 3, y - 1 + (k & 1) * 4, H('#a87e52')); }
  R.poligono([[256, 150], [276, 140], [280, 146], [260, 156]], K); R.poligono([[257, 150], [275, 141], [278, 146], [260, 155]], H('#b8b8c4')); rr(240, 154, 256, 158, K); rr(241, 155, 255, 157, H('#8a5a2a'));
  for (const [x, y, n] of [[14, 70, '21'], [292, 78, '22']]) { rr(x - 8, y - 10, x + 8, y + 10, H('#c8d8e8')); rr(x - 8, y - 10, x + 8, y - 9, H('#c83a3a')); rr(x - 5, y + 2, x + 5, y + 8, H('#f4f0e4')); cifras(n, x - 3, y + 3, K); }
  rr(4, 108, 30, 113, K); rr(5, 109, 18, 112, H('#d8c8a0')); rr(19, 108, 30, 113, H('#8a5a2a'));
});
const p14 = (t) => {
  fondo14();
  const sac = Math.sin(t * 13) * 2, [cx0, cy, r] = CRI, cx = cx0 + sac;
  // la tierra que cae por la malla
  for (let k = 0; k < 40; k++) { const u = (t * 1.8 + k / 40) % 1, a = k * 2.4, rr2 = (k % 7) / 7 * r * 0.8; tine(cx0 + Math.cos(a) * rr2, cy + Math.sin(a) * rr2 + u * 3, H('#2a1a10'), 0.4); }
  // el aro de madera y la malla con lo que queda: tierra, chinas y lascas de sílex
  llena(cx - r - 1, cy - r - 1, cx + r + 1, cy + r + 1, (x, y) => { const d = Math.hypot(x - cx, y - cy); if (d > r) return undefined; if (d > r - 1) return K;
    if (d > r - 8) return rmp(pal(['#5a3a1e', '#7a5028', '#9a6a36', '#b88446']), 2 + Math.sin(Math.atan2(y - cy, x - cx) * 30) * 0.4 + (d > r - 2 ? -0.8 : d < r - 6 ? -0.6 : 0.3), x, y); if (d > r - 9) return K;
    const malla = ((ri(x - cx) & 3) === 0) || ((ri(y - cy) & 3) === 0); const s = h2(x >> 1, y >> 1, 20); if (s > 0.86) return rmp(pal(['#5a4030', '#7a5a40', '#9a7a58']), 1 + (h2(x, y, 21) * 2), x, y);
    return malla ? H('#4a4a52') : H('#1a1a1e'); });
  for (let k = 0; k < 18; k++) { const a = h2(k, 1, 22) * 6.28, q = h2(k, 2, 22) * (r - 16), x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q; rr(x - 2, y - 1, x + 2, y + 1, K); rr(x - 1, y - 1, x + 1, y, h2(k, 3, 22) > 0.5 ? H('#c8c0b0') : H('#a89070')); }
  // la lasca de sílex buena, que brilla en «stone»
  const lx = cx + 18, ly = cy + 6; R.poligono([[lx - 9, ly + 2], [lx - 2, ly - 5], [lx + 9, ly - 2], [lx + 4, ly + 4]], K); R.poligono([[lx - 8, ly + 2], [lx - 2, ly - 4], [lx + 8, ly - 2], [lx + 3, ly + 3]], H('#c8a878')); R.linea(lx - 5, ly, lx + 6, ly - 2, H('#e8d4a8'));
  if (t > W.STONE2 - 0.1) destello(lx + 4, ly - 3, ri(3 + pop(t, W.STONE2 - 0.1, 0.3) * 3));
  // los fantasmas: el engranaje, la tablilla escrita y el martillo de metal, que se tachan
  const G = [[W.METAL, cx - 34, cy - 30, (x, y, X, Y) => { const d = Math.hypot(x - X, y - Y), a = Math.atan2(y - Y, x - X); return d < 12 + (Math.cos(a * 8) > 0.3 ? 4 : 0) && d > 4; }],
    [W.WRITING, cx + 30, cy - 34, (x, y, X, Y) => Math.abs(x - X) < 11 && Math.abs(y - Y) < 14 && !(Math.abs(x - X) < 7 && (y - Y + 20) % 5 === 0)],
    [W.TOOLS, cx - 26, cy + 30, (x, y, X, Y) => (Math.abs(x - X) < 13 && Math.abs(y - Y + 8) < 4) || (Math.abs(x - X) < 2 && y - Y > -5 && y - Y < 14)]];
  for (const [t0, X, Y, f] of G) { if (t < t0) continue; const a = cl((t - t0) / 0.25) * (1 - tramo(t, t0 + 1.4, t0 + 2.2)); fantasma(X - 20, Y - 22, X + 20, Y + 22, (x, y) => f(x, y, X, Y), t, a); if (t > t0 + 0.4) equis(X, Y, 1, pop(t, t0 + 0.4, 0.3) * (1 - tramo(t, t0 + 1.6, t0 + 2.2))); }
  // las dos manos que sacuden la criba (brazos canónicos desde abajo)
  T.brazo(R, cx - 40, 206, cx - 50, cy + r - 8, '#8a7a54', 1, { codo: [cx - 56, 190] });
  T.brazo(R, cx + 40, 206, cx + 50, cy + r - 8, '#8a7a54', -1, { codo: [cx + 56, 190] });
};

// ── 15 · la estepa de hace 11.500 años: los animales y las plantas de siempre ─────────────────────────────────
const fondo15 = () => fijo('p15', () => {
  cieloG(0, 82, pal(['#5a88c4', '#6c9acc', '#86afd6', '#a6c4de', '#cad8e0', '#e8dcc8']), 15);
  llena(0, 56, 319, 96, (x, y) => { const s1 = 66 + Math.sin(x * 0.025) * 6 + Math.sin(x * 0.09) * 2, s2 = 76 + Math.sin(x * 0.04 + 2) * 4; if (y >= s2) return (x + y) & 1 ? H('#8a9a7a') : H('#96a484'); if (y >= s1) return b4(x, y) < 0.5 ? H('#a4b0ac') : H('#b0bab4'); });
  // el cerro pelado de Göbekli a lo lejos
  llena(150, 64, 250, 86, (x, y) => y < 84 - 18 * Math.exp(-(((x - 200) / 30) ** 2)) ? undefined : rmp(pal(['#8a7a5a', '#a08e68', '#b8a478']), 1.6 - (x - 200) * 0.01, x, y));
  // la llanura de hierba y el primer término
  llena(0, 80, 319, 179, (x, y) => { if (y < 84 + Math.sin(x * 0.03) * 2) return undefined; const b = Math.floor((y - 84) / 6 + Math.sin(x * 0.04) * 1.2); return rmp(pal(['#5a6a2a', '#768434', '#929c42', '#b0b056', '#ccc46c']), 2.6 + (b & 1) * 0.5 - (y - 90) * 0.008 + (h2(x >> 1, y >> 1, 23) - 0.5) * 0.9, x, y); });
  // el pistachero y el almendro
  for (const [x, y, w] of [[40, 108, 20], [280, 100, 16]]) { rr(x - 1, y - 6, x + 1, y + 10, H('#4a3424')); R.linea(x, y, x - 6, y - 8, H('#4a3424'));
    llena(x - w, y - w, x + w, y + 2, (a, b) => { const e = ((a - x) / w) ** 2 + ((b - y + w * 0.4) / (w * 0.6)) ** 2 + (h2(a >> 1, b >> 1, 24) - 0.5) * 0.4; return e < 1 ? rmp(pal(['#2a4a24', '#3e6a30', '#5a8a3e', '#7aa850']), 2.6 - (b - y + w) / w * 1.2 - (a > x ? 0.6 : 0), a, b) : undefined; }); }
});
const espiga = (x, y, t, alto, k) => { const s = Math.sin(t * 2 + x * 0.12 + k) * 1.6; R.linea(ri(x), ri(y), ri(x + s), ri(y - alto), H('#b09040')); for (let j = 0; j < 4; j++) { ps(x + s * (1 - j * 0.05) - 1, y - alto - j * 2, H('#e0c060')); ps(x + s + 1, y - alto - j * 2 - 1, H('#c8a040')); } R.linea(ri(x + s), ri(y - alto - 8), ri(x + s + 1), ri(y - alto - 12), H('#e8d080')); };
const p15 = (t) => {
  fondo15();
  nube(80 + t * 1.1, 34, 34, pal(['#c8ccd4', '#eef0f2', '#ffffff'])); nube(200 + t * 0.5, 26, 28, pal(['#c0c8d4', '#e8ecf2', '#ffffff'])); nube(150 + t * 1.8, 50, 18, pal(['#b8c0cc', '#e0e6ee', '#ffffff']));
  // el buitre que planea en círculos
  const ba = t * 0.6; pajaro(130 + Math.cos(ba) * 40, 44 + Math.sin(ba) * 8, t * 0.4, H('#2a2420'), 0); ps(130 + Math.cos(ba) * 40 - 3, 44 + Math.sin(ba) * 8, H('#2a2420')); ps(130 + Math.cos(ba) * 40 + 3, 44 + Math.sin(ba) * 8, H('#2a2420'));
  // dos uros a lo lejos y una liebre
  for (const [x, k] of [[96, 0], [112, 1]]) { const xx = x + Math.sin(t * 0.3 + k) * 2; ovalo(xx, 92, 6, 3, (a, b, d) => d > 0.7 ? K : H('#2a1e16')); rr(xx + 5, 89, xx + 8, 92, H('#2a1e16')); ps(xx + 8, 88, H('#e8dcc0')); for (const i of [-4, -1, 2, 4]) R.linea(xx + i, 94, xx + i, 97, K); }
  // las gacelas pastan; levantan la cabeza en «animal» y saltan en «steppe»
  const sal = tramo(t, W.STEPPE - 0.1, W.STEPPE + 1.4);
  for (let k = 0; k < 5; k++) { const x = 170 + k * 22 + sal * (60 + k * 8), y = 128 + (k & 1) * 6; gacela(x, y, t, 1, sal > 0 && sal < 1 ? ri(Math.abs(Math.sin(t * 7 + k)) * 6) : 0); }
  // los fantasmas de lo que NO hay: un caballo de tiro y una mazorca, que se tachan
  const F1 = [W.ANIMAL, 232, 110, (x, y, X, Y) => { const dx = (x - X) / 1.6, dy = (y - Y) / 1.6; return (Math.abs(dx) < 14 && Math.abs(dy) < 6) || (dx > 10 && dx < 16 && dy > -16 && dy < 0) || (dx > 12 && dx < 21 && dy > -18 && dy < -12) || ((Math.abs(dx + 11) < 2 || Math.abs(dx - 11) < 2) && dy >= 6 && dy < 18); }],
    F2 = [W.PLANT, 132, 128, (x, y, X, Y) => { const dx = (x - X) / 1.5, dy = (y - Y) / 1.5; return (Math.abs(dx) < 4 + (dy > -10 && dy < 8 ? 1 : 0) && dy > -14 && dy < 10) || (Math.abs(dx - dy * 0.5 - 5) < 2 && dy > 0 && dy < 16) || (Math.abs(dx + dy * 0.5 + 5) < 2 && dy > 0 && dy < 16); }];
  for (const [t0, X, Y, f] of [F1, F2]) { if (t < t0) continue; const a = cl((t - t0) / 0.25) * (1 - tramo(t, t0 + 2.2, t0 + 2.8)); fantasma(X - 36, Y - 36, X + 36, Y + 36, (x, y) => f(x, y, X, Y), t, a); if (t > t0 + 0.4) equis(X, Y - 2, 2, pop(t, t0 + 0.4, 0.3) * (1 - tramo(t, t0 + 2.3, t0 + 2.8))); }
  // la cazadora recoge trigo silvestre y lo echa en la cesta
  const coge = Math.floor((t - W.NOT) * 0.9) & 1, c = R.actor(EL.cazadoraGB, 56, 158, t, { dir: 1, sostiene: coge ? [74, 142] : [70, 150], sonrisa: t > W.STEPPE });
  for (let j = 0; j < 3; j++) espiga(c.mano[0] + j - 1, c.mano[1] + 2, t, 8, j);
  rr(76, 150, 92, 160, K); rr(77, 151, 91, 159, H('#a87a3a')); for (let i = 78; i < 91; i += 2) R.linea(i, 151, i + 1, 159, H('#8a5a2a')); for (let i = 0; i < 6; i++) espiga(79 + i * 2, 151, t, 6, i);
  // amapolas, flores moradas y piedras entre la hierba
  for (let k = 0; k < 60; k++) { const x = ri(h2(k, 1, 35) * 318), y = ri(100 + h2(k, 2, 35) * 74); const c = k % 3 === 0 ? H('#e83a2a') : k % 3 === 1 ? H('#a86ad8') : H('#f4f0e0'); ps(x, y, c); if (y > 140) { ps(x + 1, y, c); ps(x, y - 1, c); ps(x, y + 1, H('#3a5a2a')); } }
  for (const [x, y, w] of [[150, 166, 6], [214, 172, 4], [30, 176, 5], [262, 160, 5]]) { ovalo(x, y, w, ri(w * 0.6), (a, b, d) => d > 0.75 ? K : b < y ? H('#c8c0b0') : H('#9a9284')); }
  // el trigo silvestre del primer término, que se mece
  for (let k = 0; k < 56; k++) { const x = (k * 5.9) % 320, y = 168 + (k % 4) * 3; if (x > 40 && x < 100) continue; espiga(x, y, t, 12 + (k % 5) * 3, k); }
};

// ── 16 · las bandejas de hallazgos desde arriba: por miles ─────────────────────────────────────────────────────
const BAN = [[22, 112], [118, 208], [214, 304]];
const fondo16 = () => fijo('p16', () => {
  llena(0, 0, 319, 179, (x, y) => veta(y, x, pal(['#6a5034', '#86683f', '#a0804e', '#b8985e', '#ccae72']), 2.4, 16, 25));
  for (const [cx, cy, r] of [[70, 20, 9], [300, 160, 7]]) for (let a = 0; a < 60; a++) { const q = a / 60 * 6.28; tine(cx + Math.cos(q) * r, cy + Math.sin(q) * r * 0.8, H('#5a3a20'), 0.4); }
  // las tres bandejas de cartón con sus paredes y su sombra
  for (const [x0, x1] of BAN) { rr(x0 + 3, 54, x1 + 3, 145, H('#4a3420')); rr(x0, 50, x1, 142, K); llena(x0 + 1, 51, x1 - 1, 141, (x, y) => { const pared = x < x0 + 6 || x > x1 - 6 || y < 56 || y > 136; return pared ? rmp(pal(['#8a6a3a', '#b08a50', '#c8a464', '#dcbc7c']), (y < 56 ? 3 : x < x0 + 6 ? 2.4 : y > 136 ? 1 : 1.4) + (h2(x, y, 26) - 0.5) * 0.4, x, y) : rmp(pal(['#a88a5a', '#bc9c68', '#ceb07a']), 1.4 + (h2(x >> 2, y >> 2, 27) - 0.5) * 0.6, x, y); }); }
  // las puntas de flecha de sílex en filas
  for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { const x = 34 + c * 9.5 + (r & 1) * 3, y = 64 + r * 12; if (r === 5 && c > 5) continue; const col = ['#b8a68a', '#c8b494', '#9a8a70', '#d8c4a0'][(r + c) % 4];
    R.poligono([[x, y - 5], [x + 3, y + 1], [x, y + 3], [x - 3, y + 1]], K); R.poligono([[x, y - 4], [x + 2, y + 1], [x, y + 2], [x - 2, y + 1]], H(col)); ps(x - 1, y - 1, H('#f0e4c8')); }
  // las piedras de moler de basalto
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const x = 136 + c * 27, y = 72 + r * 24; ovalo(x, y, 11, 7, (a, b, d) => d > 0.8 ? K : rmp(pal(['#2a2a30', '#3a3a44', '#4e4e58', '#64646e']), 2.4 - (b - y + 7) * 0.12 - d + (h2(a, b, 28) - 0.5) * 0.8, a, b)); }
  // los huesos de gacela y un cuerno
  for (let k = 0; k < 9; k++) { const x = 232 + (k % 3) * 22, y = 68 + Math.floor(k / 3) * 22, a = h2(k, 1, 29) - 0.5; R.linea(x - 7, y - a * 6, x + 7, y + a * 6, K); R.linea(x - 6, y - a * 6 - 1, x + 6, y + a * 6 - 1, H('#ece2c8')); R.linea(x - 6, y - a * 6, x + 6, y + a * 6, H('#d4c6a4')); for (const s of [-1, 1]) { R.disco(x + s * 7, y + s * a * 6, 2, K); R.disco(x + s * 7, y + s * a * 6, 1, H('#f4ecd8')); } }
  for (let k = 0; k < 16; k++) { const x = 288 - k * 0.6, y = 126 - k * 2 + Math.sin(k * 0.3) * 2; rr(x - 2, y, x + 2, y + 1, k % 3 === 0 ? H('#4a3a2a') : H('#6a5642')); }
  // arriba: el cuaderno con bocetos, el lápiz, la lupa, la regla de escala y la bolsita
  rr(20, 8, 92, 40, K); rr(21, 9, 56, 39, H('#f4f0e4')); rr(57, 9, 91, 39, H('#ece6d6')); R.linea(56, 9, 56, 39, H('#b8b0a0')); R.poligono([[32, 34], [38, 16], [44, 34]], H('#8a8478')); for (let y = 14; y < 36; y += 4) R.linea(62, y, 86, y, H('#b8b0a0'));
  R.linea(96, 14, 118, 30, K); R.linea(97, 14, 119, 30, H('#e8c020'));
  R.disco(136, 26, 9, K); R.disco(136, 26, 7, H('#a8c8e0')); ps(133, 23, H('#ffffff')); R.linea(143, 32, 152, 40, K); R.linea(144, 32, 153, 40, H('#6a4428'));
  rr(170, 34, 230, 38, K); for (let i = 0; i < 6; i++) rr(171 + i * 10, 35, 180 + i * 10, 37, i & 1 ? H('#f4f0e4') : H('#1a1a1a'));
  rr(186, 8, 206, 28, H('#e8f0f4')); rr(186, 8, 206, 9, H('#c83a3a')); rr(190, 18, 202, 25, H('#f4f0e4')); cifras('49', 192, 19, K);
});
const p16 = (t) => {
  fondo16();
  // el vaso de té con su platito y su vapor
  R.disco(250, 24, 10, K); R.disco(250, 24, 9, H('#e8e0d0')); R.disco(250, 24, 5, K); R.disco(250, 24, 4, H('#a83a1a')); ps(249, 23, H('#e8703a'));
  for (let k = 0; k < 4; k++) { const v = (t * 0.6 + k / 4) % 1; tine(248 + Math.sin(v * 6 + k) * 3, 16 - v * 12 + 20 * 0, H('#ffffff'), 0.5 * (1 - v)); }
  // las etiquetas con los números que se disparan en «by the thousands»
  const sube = ease(tramo(t, W.THOUSANDS - 0.2, W.THOUSANDS + 1.2)), N = [[117, 4180], [43, 1350], [27, 2790]];
  BAN.forEach(([x0, x1], k) => { const cx = (x0 + x1) / 2, n = ri(lerp(N[k][0], N[k][1], sube)), s = String(n); rr(cx - 22, 145, cx + 22, 159, K); rr(cx - 21, 146, cx + 21, 158, H('#2a2430')); rr(cx - 21, 146, cx + 21, 147, H('#c83a3a'));
    R.numero(s, cx, 157, { centro: true }); if (sube > 0 && sube < 1) for (let q = 0; q < 3; q++) ps(cx - 16 + q * 16, 144 - (t * 20 + q * 5) % 8, H('#ffd34a')); });
  // la mano deja una punta, una mano de moler y un hueso en su bandeja, cada uno cuando la voz lo dice
  const PASOS = [[W.FLINT - 0.5, 80, 124, 0], [W.GRINDING - 0.5, 176, 124, 1], [W.GAZELLE - 0.5, 270, 124, 2]];
  let hx = 60, hy = 176;
  for (const [t0, tx, ty, k] of PASOS) { if (t < t0) continue; const u = ease(tramo(t, t0, t0 + 0.5)), ida = t < t0 + 0.9; const x = lerp(tx - 10, tx, u), y = lerp(170, ty, u);
    if (t >= t0 + 0.5) { if (k === 0) { R.poligono([[tx, ty - 5], [tx + 3, ty + 1], [tx, ty + 3], [tx - 3, ty + 1]], K); R.poligono([[tx, ty - 4], [tx + 2, ty + 1], [tx, ty + 2], [tx - 2, ty + 1]], H('#d8c4a0')); }
      if (k === 1) ovalo(tx, ty, 9, 5, (a, b, d) => d > 0.8 ? K : H('#4e4e58')); if (k === 2) { R.linea(tx - 7, ty, tx + 7, ty - 2, K); R.linea(tx - 6, ty - 1, tx + 6, ty - 3, H('#ece2c8')); }
      if (t < t0 + 1.0) destello(tx + 4, ty - 4, 3); }
    if (ida) { hx = x; hy = y; } else { const v = tramo(t, t0 + 0.9, t0 + 1.3); hx = lerp(tx, tx + 6, v); hy = lerp(ty, 176, v); } }
  T.brazo(R, hx + 22, 212, hx + 4, hy + 6, '#3a6a8a', -1, { codo: [hx + 26, hy + 34] });
};
'''
RODAR = r'''
const efectos = [
  [1.5, 'motor'], [3.5, 'puerta'], [W.ARCH + 0.05, 'pop'],
  [W.N2022 + 0.35, 'interruptor'],
  [W.LOST, 'trueno'],
  [W.WHO + 0.08, 'toc'], [W.CARVE, 'golpecito'], [W.BUILD + 0.05, 'whoosh'],
  [W.N12, 'bip'], [W.SHARING, 'zumbido'],
  [W.AUTH + 0.2, 'cerrojo'],
  [W.PILLAR, 'brillo'], [W.N43 + 0.6, 'flash'],
  [W.STAR, 'brillo'], [W.COMET, 'whoosh'],
  [W.BC, 'trueno'],
  [W.CHOOSE + 0.2, 'bip'], [W.ANIMALS - 0.05, 'toc'],
  [W.COUNT + 0.5, 'papel'], [W.DONT2 + 0.05, 'sello'], [W.FREEDOM - 0.05, 'brillo'],
  [W.SAYING, 'lapiz'], [W.ALREADY, 'brillo'],
  [W.NOWHERE + 0.35, 'golpecito'],
  [W.METAL + 0.4, 'sello'], [W.WRITING + 0.4, 'sello'], [W.TOOLS + 0.4, 'sello'],
  [W.ANIMAL + 0.4, 'toc'], [W.STEPPE, 'pasos'],
  [W.THOUSANDS, 'tic'], [W.FLINT + 0.05, 'golpecito'], [W.GRINDING + 0.05, 'golpecito'], [W.GAZELLE + 0.05, 'golpecito'],
  [W.THE9 + 0.4, 'pasos'], [W.ANYTHING, 'brillo'],
];
const año = (t) => t < W.WHERE ? 2022 : t < W.N10950 ? 2017 : t < W.OTHER ? -10950 : t < W.ANY ? 2018 : t < W.NOT ? 2022 : t < W.TURNUP ? -9500 : 2022;
T.rodar(E, R, [[0, p1], [W.AND1, p2], [W.BEHIND, p3], [W.WHO, p4], [W.AND2, p5], [W.SAME, p6], [W.ONE, p7], [W.WHERE, p8], [W.N10950, p9], [W.OTHER, p10], [W.COUNT, p11],
  [W.ANY, p12], [W.AND4, p13], [W.WOULD, p14], [W.NOT, p15, 'corte'], [W.TURNUP, p16], [W.THE9, casaPlano]], { efectos, cartela: '2022', año });
'''
E['gb-tele'] = (E['gb-tele'][0], E['gb-tele'][1], E['gb-tele'][2] + PARTE2 + PARTE3 + RODAR)

PAT_W = r'''const W = { NOTICE: en('fijate4', 0.0042), BECAUSE: en('fijate4', 0.0361), ALL: en('fijate4', 0.0701), OUR: en('fijate4', 0.1437), BRAIN: en('fijate4', 0.1508), PATTERNS: en('fijate4', 0.2010), FACE: en('fijate4', 0.2442), OUTLET: en('fijate4', 0.2740), OR: en('fijate4', 0.2917), ANIMAL: en('fijate4', 0.3072), CLOUD: en('fijate4', 0.3306), BECAUSE2: en('fijate4', 0.3575), THOUSANDS: en('fijate4', 0.3738), SHADOW: en('fijate4', 0.4325), LION: en('fijate4', 0.4616), SAFER: en('fijate4', 0.4778), OPPOSITE: en('fijate4', 0.5076), AND: en('fijate4', 0.5387), ONCE: en('fijate4', 0.5854), SHOWS: en('fijate4', 0.6060), PATTERN: en('fijate4', 0.6272), CANT: en('fijate4', 0.6754), SEEING: en('fijate4', 0.6966), THAT: en('fijate4', 0.7518), Q6: en('fijate4', 0.7546), FALSE: en('fijate4', 0.7893), BUT: en('fijate4', 0.8169), ASK: en('fijate4', 0.8594), HOW: en('fijate4', 0.8722), MANY: en('fijate4', 0.8913), STONES: en('fijate4', 0.8983), LOOKED: en('fijate4', 0.9210), BEFORE: en('fijate4', 0.9366), FINDING: en('fijate4', 0.9493), FIT: en('fijate4', 0.9861) };
// los instantes de gb-tele que usa el bloque CASA (en segundos de gb-tele), para congelar su último fotograma
const WC = { THE9: 87.08, EVERYDAY: 87.16, TRASH: 87.56, UNTIL: 89.54, NOBODY: 90.96, ANYTHING: 91.76, THIS: 92.56 };
const TF = 93.2;'''

E['gb-patrones'] = ('Los patrones', '''// GB-PATRONES (frase 20, PAUSA «fijate4»): la casa de la excavación de gb-tele congelada en gris azulado (el MISMO bloque
// CASA, copiado literal, en su último instante) y Atom al doble, a color, con el enchufe con cara y la nube (T.pausa
// 'nube'). GAG DE LAS NUBES: la nube es un conejo, luego un buitre, luego un cometa y al final se parece a Atom.
// Seis planos, cortados en la palabra:
// 1 · La casa congelada entera: ⏸; Atom entra andando, saluda en «notice» y abre los brazos en «all of us». Corta en «Our».
// 2 · Congelada de cerca (ventana, mapa y tamices): Atom se toca la cabeza en «brain» y salen puntos que se unen en
//   «patterns»; el enchufe con cara se rodea en «face in a power outlet». Corta en «or».
// 3 · Congelada de cerca (la estantería y la mesa del fondo): Atom a la derecha señala la nube, que se rodea y es un
//   conejo en «animal in a cloud»; detrás pasan los «miles de años» (el reloj de arena gira). Corta en «shadow».
// 4 · Congelada de cerca (la ventana con el gato): la sombra del gato se hace un león enorme en la pared en «shadow»;
//   Atom da un salto en «lion» y se ríe en «safer»; la sombra vuelve a ser un gato. Corta en «once».
// 5 · Congelada de cerca (los dibujos de pilares): la nube se vuelve buitre en «pattern» y cometa en «can't stop»;
//   Atom la señala sorprendido cada vez. Corta en «That».
// 6 · Congelada de cerca (la mesa de las bandejas): la nube se vuelve Atom en «false» y Atom guiña; en «how many
//   stones» aparece una fila de piedras a color; Atom las mira una a una con la lupa y la última encaja (brilla con
//   su cometa) en «fit».''', UTIL + PAT_W + CASA + r'''
const AT = T.AT;
const TROZOS = [[0.0, 0.0868], [0.1437, 0.5210], [0.5387, 0.7300], [0.7518, 1.0]];
const habla = (t) => TROZOS.some(([a, b]) => t > en('fijate4', a) && t < en('fijate4', b)) ? (Math.sin(t * 15) > -0.2 ? 1 : 0) : 0;
let FZ = null;
const congelado = () => { if (!FZ) { casaPlano(TF); FZ = R.buf.slice(); } };
const vista = (x0, y0, z) => { congelado(); const B = R.buf; if (z === 1) { B.set(FZ); return; }
  for (let y = 0; y < 180; y++) { const sy = (y0 + Math.floor(y / z)) * 320; for (let x = 0; x < 320; x++) B[y * 320 + x] = FZ[sy + x0 + Math.floor(x / z)]; } };
const pausa = (u = 1) => AT.pausa(R, u);
const nubeP = (x, y, t, forma, s = 2) => T.pausa(R, x, y, t, { cual: 'nube', forma, s });
// los puntos del «patrón» que se unen solos (a color, sobre lo congelado)
const PUNTOS = [[96, 60], [118, 48], [140, 58], [132, 80], [108, 84]];
const patron = (t, t0) => { const u = tramo(t, t0, t0 + 0.9); PUNTOS.forEach(([x, y], k) => { if (u * 6 > k) { R.disco(x, y, 2, K); R.disco(x, y, 1, H('#ffd34a')); } });
  for (let k = 0; k < 5; k++) { const q = cl(u * 6 - k - 1); if (q <= 0) continue; const [a, b] = PUNTOS[k], [c, d] = PUNTOS[(k + 1) % 5]; R.linea(a, b, ri(lerp(a, c, q)), ri(lerp(b, d, q)), H('#ffe890')); } };
// una piedra a color (las que Atom mira con la lupa); la buena lleva su cometa
const piedra = (x, y, k, buena = 0) => { x = ri(x); y = ri(y); const C = [['#8a8478', '#b8b2a4'], ['#9a7a5a', '#c8a47a'], ['#6a6a74', '#9a9aa4'], ['#a8946a', '#d0bc90'], ['#7a6a5a', '#a8967e'], ['#b8a888', '#e0d4b4']][k % 6];
  ovalo(x, y, 9, 6, (a, b, d) => d > 0.8 ? K : b < y - 1 ? H(C[1]) : H(C[0])); for (let q = 0; q < 3; q++) R.disco(x - 4 + q * 4, y + (q & 1) * 2 - 1, 1, H('#3a3024'));
  if (buena > 0) { const pts = [[x - 5, y - 1], [x, y - 3], [x + 4, y + 1], [x - 1, y + 2]]; for (let i = 0; i < 3; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], H('#ffe890')); destello(x + 5, y - 6, ri(2 + buena * 3)); } };

// ── 1 · la casa congelada entera: Atom entra y saluda ─────────────────────────────────────────────────────────
const q1 = (t) => {
  vista(0, 0, 1); pausa(tramo(t, 0, 0.35));
  const u = tramo(t, 0.3, 1.6), x = ri(lerp(-30, 54, ease(u)));
  AT.atom(R, x, 178, t, { s: 2, dir: 1, pose: u > 0 && u < 1 ? 'camina' : t > W.ALL - 0.1 ? 'brazos' : t > W.NOTICE && t < W.BECAUSE + 0.6 ? 'saluda' : 'quieto', cara: t > W.ALL - 0.1 ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── 2 · de cerca, la ventana y el mapa: el cerebro busca patrones; la cara del enchufe ───────────────────────────
const q2 = (t) => {
  vista(150, 16, 2); pausa(1);
  const obj = nubeP(206, 170, t, 0);
  patron(t, W.PATTERNS - 0.2);
  const cara = t > W.FACE - 0.1; if (cara) AT.anillo(R, 158, 138, 20, 22, t, tramo(t, W.FACE - 0.1, W.FACE + 0.4));
  const piensa = t > W.BRAIN - 0.1 && t < W.FACE - 0.3;
  const a = AT.atom(R, 50, 178, t, { s: 2, dir: 1, pose: piensa ? 'piensa' : cara ? 'senala' : 'quieto', cara: cara ? 'sorpresa' : 'normal', habla: habla(t) });
  if (piensa) for (let k = 0; k < 3; k++) { const v = (t * 1.5 + k / 3) % 1; ps(a.centro[0] + 14 + k * 4, a.centro[1] - 20 - v * 10, H('#ffd34a')); }
};
// ── 3 · de cerca, la estantería: la nube es un conejo ──────────────────────────────────────────────────────────
const q3 = (t) => {
  vista(0, 64, 2); pausa(1);
  nubeP(110, 172, t, 0);
  if (t > W.ANIMAL - 0.1) AT.anillo(R, 136, 112, 52, 30, t, tramo(t, W.ANIMAL - 0.1, W.CLOUD));
  // el reloj de arena de los «miles de años», a color, que gira
  const gx = 246, gy = 96, g = t > W.THOUSANDS - 0.2 ? ease(tramo(t, W.THOUSANDS - 0.2, W.THOUSANDS + 0.5)) : 0; const ang = g * Math.PI;
  for (let j = -12; j <= 12; j++) { const w = Math.abs(j) * 0.7 + 1, c = Math.cos(ang), yy = j * c; for (let i = -w; i <= w; i++) ps(gx + i, gy + yy, Math.abs(i) > w - 1 ? K : ((j < 0) === (c > 0) ? H('#e8c070') : H('#f4f0e8'))); }
  rr(gx - 10, gy - 14, gx + 10, gy - 12, H('#8a5a2a')); rr(gx - 10, gy + 12, gx + 10, gy + 14, H('#8a5a2a'));
  AT.atom(R, 270, 178, t, { s: 2, dir: -1, pose: t > W.ANIMAL - 0.2 && t < W.BECAUSE2 ? 'senala' : t > W.THOUSANDS ? 'piensa' : 'quieto', cara: t > W.CLOUD ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── 4 · de cerca, la ventana con el gato: la sombra del león ───────────────────────────────────────────────────
const leon = (cx, cy, s, a) => { if (a <= 0) return; // la silueta de un león de perfil (melena, hocico, orejas), tramada como sombra
  const dentro = (x, y) => { const dx = (x - cx) / s, dy = (y - cy) / s, ang = Math.atan2(dy, dx), mel = 15 + (Math.abs(Math.sin(ang * 7)) > 0.6 ? 5 : 0);
    if (dx > 2 && Math.hypot(dx - 6, dy + 2) < 8) return !(Math.hypot(dx - 8, dy + 5) < 1.5);   // la cara (con el ojo)
    return Math.hypot(dx, dy) < mel || (dx > 8 && dx < 18 && dy > 0 && dy < 7) || (dx > -44 && dx < -4 && dy > 4 && dy < 20) || (Math.abs(dx + 38) < 3 && dy > 16 && dy < 32) || (Math.abs(dx + 12) < 3 && dy > 16 && dy < 32)
      || (dx < -42 && dx > -56 && Math.abs(dy - 8 + (dx + 42) * 0.6) < 1.5) || Math.hypot(dx + 58, dy - 16) < 4; };
  llena(cx - 52 * s, cy - 18 * s, cx + 24 * s, cy + 32 * s, (x, y) => dentro(x, y) && b4(x, y) < a * 0.95 ? mez(R.buf[y * 320 + x], H('#06080f'), 0.72) : undefined); };
const q4 = (t) => {
  vista(160, 14, 2); pausa(1);
  // la luz del farol de Atom entra por la ventana; el gato (a color) proyecta su sombra de león en la pared
  const crece = tramo(t, W.SHADOW - 0.1, W.LION - 0.1) * (1 - tramo(t, W.OPPOSITE, W.OPPOSITE + 0.8)), s = lerp(0.6, 2.0, crece);
  leon(lerp(88, 74, crece), lerp(120, 78, crece), s, cl(crece * 1.4));
  // el gato del alféizar, a color, que mueve la cola
  const gx = 112, gy = 140; ovalo(gx, gy, 14, 6, (x, y, d) => d > 0.75 ? K : (x + y) % 5 === 0 ? H('#c86a2a') : H('#e8903a')); rr(gx + 10, gy - 12, gx + 22, gy - 1, K); rr(gx + 11, gy - 11, gx + 21, gy - 2, H('#e8903a')); ps(gx + 11, gy - 13, K); ps(gx + 20, gy - 13, K); ps(gx + 14, gy - 8, K); ps(gx + 18, gy - 8, K);
  R.linea(gx - 14, gy + 2, gx - 22, gy - 6 + ri(Math.sin(t * 3) * 3), K); R.linea(gx - 14, gy + 1, gx - 22, gy - 7 + ri(Math.sin(t * 3) * 3), H('#e8903a'));
  const salta = t > W.LION - 0.05 && t < W.LION + 0.5;
  AT.atom(R, 232, 178 - (salta ? ri(Math.sin((t - W.LION) / 0.55 * Math.PI) * 14) : 0), t, { s: 2, dir: -1, pose: salta ? 'brazos' : t > W.OPPOSITE ? 'brazos' : t > W.SAFER ? 'senala' : 'quieto', cara: salta ? 'sorpresa' : t > W.SAFER ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── 5 · de cerca, los dibujos de pilares: la nube se vuelve buitre y luego cometa ──────────────────────────────
const q5 = (t) => {
  vista(60, 6, 2); pausa(1);
  const f = t < W.PATTERN - 0.2 ? 0 : t < W.CANT - 0.2 ? ease(tramo(t, W.PATTERN - 0.2, W.PATTERN + 0.4)) : 1 + ease(tramo(t, W.CANT - 0.2, W.CANT + 0.4));
  nubeP(214, 172, t, f);
  const sorp = (t > W.PATTERN && t < W.PATTERN + 0.8) || (t > W.CANT && t < W.CANT + 0.8);
  AT.atom(R, 56, 178, t, { s: 2, dir: 1, pose: sorp ? 'brazos' : 'senala', cara: sorp ? 'sorpresa' : 'sonrisa', habla: habla(t) });
};
// ── 6 · de cerca, la mesa de las bandejas: la nube se parece a Atom; ¿cuántas piedras se miraron? ───────────────
const q6 = (t) => {
  vista(40, 92, 2); pausa(1);
  const f = 2 + ease(tramo(t, W.FALSE - 0.4, W.FALSE + 0.3));
  nubeP(102, 150, t, f);
  // la fila de piedras que aparecen en «how many stones»; la lupa las recorre y la última encaja en «fit»
  const N = 6, X0 = 120, DX = 22, Y = 160;
  for (let k = 0; k < N; k++) { const ap = pop(t, W.MANY + k * 0.12, 0.3); if (ap <= 0) continue; piedra(X0 + k * DX, Y + (1 - ap) * 6, k, k === N - 1 ? tramo(t, W.FIT - 0.15, W.FIT + 0.4) : 0);
    if (k < N - 1 && t > W.LOOKED + k * 0.25 + 0.3) equis(X0 + k * DX, Y - 10, 1, pop(t, W.LOOKED + k * 0.25 + 0.3, 0.2) * 0.7); }
  const mira = tramo(t, W.LOOKED - 0.2, W.FIT - 0.1), lx = X0 + mira * (N - 1) * DX;
  const usa = t > W.LOOKED - 0.3 && t < W.FIT - 0.05, fin = t >= W.FIT - 0.05;
  const a = AT.atom(R, usa ? ri(lx + 34) : fin ? 276 : 270, 178, t, { s: 2, dir: -1, pose: usa ? 'sostiene' : fin ? 'senala' : t > W.FALSE - 0.1 && t < W.ASK ? 'brazos' : 'quieto', cara: fin ? 'sonrisa' : t > W.FALSE - 0.1 && t < W.ASK ? 'guino' : 'normal', habla: habla(t) });
  if (usa) AT.lupa(R, a.mano[0], a.mano[1], 2, -1);
  if (t > W.FIT) R.bocadillo(X0 + (N - 1) * DX, Y - 18, { icono: '!' });
};
const efectos = [
  [0.1, 'tapestop'], [W.NOTICE, 'pop'], [W.ALL, 'brillo'],
  [W.PATTERNS, 'lapiz'], [W.FACE, 'boing'],
  [W.ANIMAL, 'pop'], [W.THOUSANDS, 'tic'],
  [W.LION - 0.05, 'boing'], [W.SAFER + 0.1, 'brillo'],
  [W.PATTERN - 0.2, 'whoosh'], [W.CANT - 0.2, 'whoosh'],
  [W.FALSE - 0.4, 'whoosh'], [W.MANY, 'pop'], [W.FIT, 'campana'],
];
T.rodar(E, R, [[0, q1], [W.OUR, q2], [W.OR, q3], [W.SHADOW, q4], [W.ONCE, q5], [W.Q6, q6]], { efectos, año: 2022 });
''')
