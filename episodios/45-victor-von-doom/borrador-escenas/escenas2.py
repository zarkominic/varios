import re

# Las marcas reales de la voz (atomo/plato/escenas/marcas-ep45.json, vd-nieve): «@s» en el cuerpo es un instante en
# segundos de escena; se escribe como en('marca', fracción) de la frase que suena (o de la anterior, en los silencios).
_MARCAS = [('madre', 0.5, 45.325), ('baron', 45.725, 83.781), ('abrigo', 84.181, 117.229), ('baul', 117.629, 142.212),
           ('promesa', 142.612, 164.048)]


def _en(s):
    k, a, b = _MARCAS[0]
    for m in _MARCAS:
        if s >= m[1] - 0.05:
            k, a, b = m
    return "en('%s', %.4f)" % (k, (s - a) / (b - a))


def _t(cuerpo):
    return re.sub(r'@(-?\d+(?:\.\d+)?)', lambda m: _en(float(m.group(1))), cuerpo)


E = {}
E['vd-nieve'] = ('La nieve', '''// VD-NIEVE (frases 5–9), sin año (la infancia). 33 planos de 3,6–6,8 s, cortados en la palabra inglesa:
// 1 «To understand» el mapa de papel de Latveria en la mesa del carromato; Atom entra andando y señala; cae la chincheta en «camp»;
// 2 «a small, cold» GAG: Atom tirita junto al termómetro que baja y se envuelve en una bufanda tres veces más larga que él;
// 3 «That's where Victor is born» el campamento: Cynthia deja al bebé en la cuna en «born»; Werner llega sonriendo;
// 4 «he never keeps» de noche, dos romaníes cuchichean junto a la hoguera mirando el carromato de la luz morada;
// 5 «because they said» la mesa de la bruja: las cartas se dan la vuelta y la bola se enciende en «she was»;
// 6 «She wanted to protect» el barón y sus soldados en el campamento: Cynthia abre los brazos; las gallinas huyen en «animals»;
// 7 «and to gain power» de noche, la mano roja de luz sube de la hoguera; Cynthia la toca en «deal»; se cierra y se apaga;
// 8 «Deals with Mephisto» el trono del infierno: la mano de Mefisto aparece; un pergamino se enciende y se sella en «too»;
// 9 «Cynthia died» la cuna sola con el chal; Werner la mece; una lucecita sale por la ventana en «soul»;
// 10 «A few years later» la alcoba: la baronesa enferma; el barón da vueltas y manda al soldado en «send»;
// 11 «send for the camp's healer» de día, llega el jinete al carromato de Werner; Werner sale con su bolsa; Victor le dice adiós;
// 12 «Imagine what Werner feels» Werner sube el camino y cruza la puerta del castillo en «door»;
// 13 «He knows» la alcoba: Werner atiende a la enferma; el bocadillo de la balanza (corazón, X y «!»);
// 14 «And still he stays» la mesilla: las velas se consumen noche tras noche, la luna y el sol cruzan la ventana; él muele hierbas;
// 15 «Whoever they are» la torre de la alcoba (fondo local): la silueta baja la cabeza; la ventana se apaga en «dies» y dobla la campana;
// 16 «the baron doesn't see» el salón: el barón, en lo alto de la escalera, señala a Werner en «blame»; entran dos soldados;
// 17 «Werner understands» de noche, Werner sale del carromato con su hijo; las antorchas llegan por la loma;
// 18 «onto the mountain» la tormenta: Werner sube la ladera hacia la derecha con el niño a cuestas; detrás, las antorchas; Atom tirita;
// 19 «the coat and the cold» el abrigo: Werner se lo quita y envuelve al niño en «coat»; cae nieve de la rama;
// 20 «finally finds them» la loma al alba: Boris llega con su farol; el niño asoma vivo en «alive»;
// 21 «to ask him» el pinar al alba (fondo local): Werner le pide a Boris que cuide de su hijo; Boris lo coge y se lo lleva;
// 22 «but that night» de cerca, el abrigo solo sobre la nieve; se cubre de copos; un petirrojo se posa; Boris se aleja a lo lejos;
// 23 «good people» Boris llega al campamento con el niño; las romaníes salen a recibirlos;
// 24 «And Boris keeps» el carromato de noche: Boris arropa al niño y le acaricia la frente;
// 25 «a few years later» Victor, ya muchacho, entra, quita la manta del baúl en «finds a trunk» y lo abre;
// 26 «Picture him opening» el baúl abierto con la vela; saca un libro; GAG: Atom abre una cajita y le sale una nube de polvo;
// 27 «written in the handwriting» el libro: pasa la página; el dibujo de su madre; su dedo sigue las líneas;
// 28 «and understanding» el camino del infierno: la cerradura de la puerta late en «where she is now»;
// 29 «That night» Victor sube a la loma con el libro y mira el castillo del barón;
// 30 «The first» el mapa de noche: Atom señala el castillo y sale el «1»;
// 31 «and the second» la puerta del infierno: el «2»; la cerradura late en «hell»;
// 32 «whatever it costs» Victor en la nieve, con la luz roja lejana que crece; se da la vuelta y se va;
// 33 «those last three words» el libro de su madre de noche: la puerta dibujada; tres trazos rojos y el «3» de Atom; el ojo de la cerradura se enciende.''', _t(r'''
// ── utilidades del plano (fondos locales en búfer, cielos tramados, nieve, tablas, sillares, velas) ──
const K = hex('#140f1c'), BL = hex('#f4f0e6');
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mz = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const rmp = (cs, v, x, y) => { const n = cs.length - 1, f = Math.max(0, Math.min(n, v * n)), i = Math.floor(f); return cs[Math.min(n, i + (f - i > bay(x, y) ? 1 : 0))]; };
const P = (s) => s.split(' ').map(hex);
// luz que tiñe sin borrar la textura (tramada)
const luz = (cx, cy, r, col, a = 0.4, ry = 1, f = 1) => {
  for (let y = Math.max(0, Math.floor(cy - r * ry)); y <= Math.min(179, cy + r * ry); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) / ry) / r; if (g > 0 && g * f > bay(x, y)) R.pset(x, y, mz(R.pget(x, y), col, a)); } };
// un fondo fijo: se pinta una vez en su búfer (con la máscara del cielo, para que las nubes pasen detrás) y se copia
const BUF = {};
const fondo = (k, cielo, resto) => { let e = BUF[k];
  if (!e) { const b = R.nuevo(), prev = R.usar(b); cielo(); const s = b.slice(); resto(); const m = new Uint8Array(57600); for (let i = 0; i < 57600; i++) m[i] = b[i] === s[i] ? 1 : 0; R.usar(prev); e = BUF[k] = { b, m }; }
  R.copiar(e.b); return e.m; };
const cieloG = (cs, y1 = 120, ruido = 0.06) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(cs, Math.min(1, y / y1) + (h2(x >> 3, y >> 2) - 0.5) * ruido, x, y)); };
const estrellas = (m, t, n, sem, ymax = 100) => { for (let k = 0; k < n; k++) { const x = Math.floor(h2(k, sem) * 320), y = Math.floor(h2(k, sem + 1) * ymax);
  if (!m[y * 320 + x] || (x > 274 && y < 48)) continue; const tw = Math.sin(t * 2.2 + k * 1.7); R.pset(x, y, tw > 0.5 ? BL : hex('#9aa4c8'));
  if (k % 9 === 0 && tw > 0.3) { R.pset(x - 1, y, hex('#6a76a0')); R.pset(x + 1, y, hex('#6a76a0')); R.pset(x, y - 1, hex('#6a76a0')); R.pset(x, y + 1, hex('#6a76a0')); } } };
// nubes de tres tonos (sombra, cuerpo, luz) que solo pasan por el cielo (máscara)
const BOLAS = [[0, 0, 0.5], [-0.36, 0.08, 0.32], [0.34, 0.06, 0.36], [-0.12, -0.14, 0.34], [0.17, -0.1, 0.28]];
const nubes = (m, t, lista, cs) => { for (const [x0, y0, w, v] of lista) { const cx = ((x0 + t * v) % (360 + w) + 360 + w) % (360 + w) - w * 0.6 - 20;
  for (let y = Math.floor(y0 - w * 0.36); y <= y0 + w * 0.22; y++) for (let x = Math.floor(cx - w * 0.9); x <= cx + w * 0.9; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179 || !m[y * 320 + x]) continue; let din = false, dl = false;
    for (const [bx, by, r] of BOLAS) { const dx = (x - cx - bx * w) / (r * w), dy = (y - y0 - by * w) / (r * w * 0.55); if (dx * dx + dy * dy < 1) din = true; const lx = (x - cx - bx * w + 2) / (r * w * 0.85), ly = (y - y0 - by * w + 3) / (r * w * 0.45); if (lx * lx + ly * ly < 1) dl = true; }
    if (!din) continue; R.pset(x, y, y > y0 + w * 0.1 ? cs[0] : dl ? cs[2] : (y > y0 + w * 0.02 && bay(x, y) > 0.5) ? cs[0] : cs[1]); } } };
const cuervos = (t, y, n, sem, col = K) => { for (let k = 0; k < n; k++) { const per = 14 + k * 3, u = ((t + k * 5 + sem) % per) / per, x = Math.round(-20 + u * 300), yy = Math.round(y + k * 7 + Math.sin(t * 1.3 + k) * 3);
  if (x > 268 && yy < 50) continue; const a = Math.sin(t * 10 + k * 2) > 0; R.pset(x, yy, col); R.pset(x - 1, yy - (a ? 1 : 0), col); R.pset(x + 1, yy - (a ? 1 : 0), col); R.pset(x - 2, yy - (a ? 2 : -1), col); R.pset(x + 2, yy - (a ? 2 : -1), col); } };
// montes nevados con crestas (luz por la izquierda)
const montes = (yb, amp, sem, cs, nv = 0.45) => { const H = (x) => amp * (0.55 * (1 - Math.abs(Math.sin(x * 0.019 + sem))) + 0.3 * (1 - Math.abs(Math.sin(x * 0.051 + sem * 1.7))) + 0.15 * h2(x >> 2, sem));
  for (let x = 0; x < 320; x++) { const hg = H(x), top = Math.round(yb - hg), luzI = H(x + 2) > H(x - 2);
    for (let y = top; y <= yb; y++) { const d = (y - top) / Math.max(1, hg), nieveP = d < nv * (0.7 + 0.5 * h2(x >> 1, y >> 2, sem)) && hg > amp * 0.35;
      R.pset(x, y, nieveP ? (luzI ? (bay(x, y) < 0.8 ? cs[2] : cs[3]) : (bay(x, y) < 0.25 ? cs[2] : cs[3])) : (luzI ? (bay(x, y) < 0.6 ? cs[0] : cs[1]) : cs[1])); } } };
const pino = (x, yb, hg, cs, sw = 0) => { const [c, cS, nv, tr] = cs; R.rect(x - 1, yb - 3, x, yb, tr); const tier = Math.max(3, Math.ceil(hg / 3));
  for (let j = 0; j < hg; j++) { const y = yb - 3 - j, u = j / hg, tu = (j % tier) / tier, w = Math.round((1 - u) * hg * 0.36 * (0.55 + 0.45 * tu) + 0.5), dx = Math.round(sw * u * u);
    for (let i = -w; i <= w; i++) R.pset(x + i + dx, y, i < -w * 0.2 ? c : cS); if (tu > 0.7 || j === hg - 1) for (let i = -w; i <= w; i++) if (h2(x + i, y) > 0.35) R.pset(x + i + dx, y, nv); } };
const filaPinos = (yb, n, sem, h0, h1, cs) => { for (let k = 0; k < n; k++) { const x = Math.round((k + h2(k, sem) * 0.8) * 320 / n), hg = Math.round(h0 + (h1 - h0) * h2(k, sem + 2)); pino(x, yb + Math.round(h2(k, sem + 4) * 4), hg, cs); } };
// el suelo de nieve: tono que no es parejo, rizos de viento, piedras, ramitas, matas secas y huellas
const sueloNieve = (y0, cs, sem, o = {}) => { for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ondas = Math.sin(x * 0.07 + y * 0.9 + 3 * h2(x >> 4, y >> 3, sem)) > 0.86 ? 0.25 : 0, v = 0.55 + 0.28 * (h2(x >> 3, y >> 2, sem) - 0.5) + ondas - (y - y0) * 0.002;
    R.pset(x, y, rmp(cs, v, x, y)); }
  for (let k = 0; k < (o.piedras ?? 10); k++) { const x = Math.floor(h2(k, sem + 7) * 320), y = Math.floor(y0 + 6 + h2(k, sem + 8) * (174 - y0)), r = 1 + Math.floor(h2(k, sem + 9) * 3);
    R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#5a5a66')); R.disco(x - 1, y - 1, Math.max(0, r - 1), hex('#8a8a94')); R.rect(x - r, y - r - 1, x + r - 1, y - r, cs[cs.length - 1]); }
  for (let k = 0; k < (o.matas ?? 14); k++) { const x = Math.floor(h2(k, sem + 11) * 318), y = Math.floor(y0 + 4 + h2(k, sem + 12) * (174 - y0));
    for (let i = 0; i < 4; i++) R.linea(x + i, y, x + i + (i - 1.5) * 0.8, y - 3 - (i & 1) * 2, i & 1 ? hex('#a88a4a') : hex('#7a5e30')); }
  for (let k = 0; k < (o.ramas ?? 5); k++) { const x = Math.floor(h2(k, sem + 13) * 300), y = Math.floor(y0 + 8 + h2(k, sem + 14) * (170 - y0)); R.linea(x, y, x + 9, y - 1, hex('#4e301c')); R.linea(x + 4, y, x + 6, y - 3, hex('#4e301c')); R.pset(x + 3, y - 1, cs[cs.length - 1]); }
  if (o.huellas) for (const [ax, ay, bx, by] of o.huellas) for (let k = 0; k < 12; k++) { const u = k / 11, x = Math.round(ax + (bx - ax) * u) + (k & 1) * 3, y = Math.round(ay + (by - ay) * u); R.rect(x, y, x + 1, y, cs[0]); R.pset(x, y + 1, cs[1]); } };
// tablas verticales con vetas, juntas y clavos
const tablas = (x0, y0, x1, y1, cs, w = 10, sem = 0) => { for (let x = x0; x <= x1; x++) { const k = Math.floor((x - x0) / w), tono = h2(k, sem) * 0.5 + 0.25, junta = (x - x0) % w === 0;
    for (let y = y0; y <= y1; y++) { if (junta) { R.pset(x, y, cs[0]); continue; } const veta = Math.sin(y * 0.35 + Math.sin(x * 0.9 + k) * 2 + k * 3) > 0.82 ? -0.3 : 0, nudo = h2(k, Math.floor(y / 23), sem) > 0.94 && Math.hypot((x - x0) % w - w / 2, y % 23 - 11) < 2 ? -0.5 : 0;
      R.pset(x, y, rmp(cs, tono + veta + nudo + ((x - x0) % w === 1 ? 0.2 : 0) + (h2(x, y >> 1, sem) - 0.5) * 0.18, x, y)); } }
  for (let k = 0; k * w + x0 <= x1; k++) for (const y of [y0 + 4, y1 - 4]) R.pset(x0 + k * w + 2, y, hex('#2a2024')); };
// sillares de piedra con mortero, desgaste y musgo
const sillares = (x0, y0, x1, y1, cs, bw = 18, bh = 9, sem = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / bh), dx = (f & 1) * (bw >> 1);
    for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0 + dx) / bw), jy = (y - y0) % bh === 0, jx = (x - x0 + dx) % bw === 0;
      if (jy || jx) { R.pset(x, y, cs[0]); continue; } const iy = (y - y0) % bh, ix = (x - x0 + dx) % bw;
      R.pset(x, y, rmp(cs, 0.3 + h2(b, f, sem) * 0.4 + (iy === 1 ? 0.2 : 0) - (iy === bh - 1 || ix === bw - 1 ? 0.2 : 0) + (h2(x, y, sem) - 0.5) * 0.25, x, y)); } } };
// una vela que se consume (alto en px), con su llama que tiembla y su luz
const velaV = (x, yb, alto, t, o = {}) => { const fl = Math.sin(t * 17 + x) * Math.sin(t * 5.3 + yb), cera = o.cera ?? hex('#f2e6c8'), cS = o.ceraS ?? hex('#c8b48a'), top = yb - Math.max(1, Math.round(alto));
  if (o.luz !== false && alto > 0.5) luz(x, top - 4, (o.r ?? 30) + fl * 2, o.col ?? hex('#ffc860'), o.a ?? 0.32);
  R.rect(x - 2, top, x + 1, yb, cera); R.rect(x + 1, top + 1, x + 1, yb, cS); R.pset(x - 2, top + 2, hex('#fff8e8')); R.rect(x - 3, yb, x + 2, yb + 1, cS); R.pset(x - 1, top - 1, K);
  if (alto > 0.5 && o.apagada !== true) { const fc = o.llama ?? [hex('#fff4c0'), hex('#ffc040'), hex('#e86a2a')]; R.pset(x - 1, top - 2, fc[0]); R.pset(x - 1, top - 3, fc[fl > 0 ? 0 : 1]); R.pset(x - 1, top - 4, fc[1]); if (fl > 0.3) R.pset(x - 1 + (fl > 0.7 ? 1 : 0), top - 5, fc[2]); R.pset(x - 2, top - 3, fc[2]); R.pset(x, top - 3, fc[2]); } };
const copos = (t, n, sem, vx, vy, cs, x0 = 0, x1 = 319, y0 = 0, y1 = 179) => { for (let k = 0; k < n; k++) { const sp = 0.6 + h2(k, sem) * 0.8, x = x0 + (((h2(k, sem + 1) * 997 + t * vx * sp + Math.sin(t * 1.7 + k) * 4) % (x1 - x0 + 1)) + (x1 - x0 + 1)) % (x1 - x0 + 1), y = y0 + (((h2(k, sem + 2) * 997 + t * vy * sp) % (y1 - y0 + 1)) + (y1 - y0 + 1)) % (y1 - y0 + 1);
  if (x > 276 && y < 46) continue; R.pset(Math.round(x), Math.round(y), cs[k % cs.length]); if (k % 4 === 0) R.pset(Math.round(x) + 1, Math.round(y), cs[k % cs.length]); } };
const humo = (x, y, t, n, cs, alto = 40, viento = 8) => { for (let k = 0; k < n; k++) { const u = ((t * 0.35 + k / n) % 1), px = Math.round(x + u * viento + Math.sin(t * 2 + k * 2.1) * 2 * u), py = Math.round(y - u * alto), r = 1 + Math.round(u * 3);
  if (px > 274 && py < 48) continue; R.disco(px, py, r, cs[u > 0.6 ? 1 : 0]); } };
const llama = (x, y, t, s = 1) => { for (let k = 0; k < 7; k++) { const u = ((t * 1.6 + k / 7) % 1), px = Math.round(x + Math.sin(t * 9 + k * 2) * 3 * s * (1 - u)), py = Math.round(y - u * 14 * s), r = Math.max(0, Math.round((1 - u) * 3 * s));
  R.disco(px, py, r, u < 0.3 ? hex('#fff0a0') : u < 0.6 ? hex('#ffb030') : hex('#e85a20')); } };
// un carromato de lado (para los fondos locales): caja de tablas pintadas, techo en arco, ruedas de radios, ventana, puerta
const carroS = (x0, yb, w, o = {}) => { const cs = o.cs ?? P('#4e1e1a #7a2a22 #a8382a #c8503a'), y1 = yb - 10, y0 = y1 - 34;
  tablas(x0, y0, x0 + w, y1, cs, 6, x0); R.rect(x0, y0, x0 + w, y0 + 2, hex('#e8b030')); R.rect(x0, y1 - 2, x0 + w, y1, hex('#e8b030')); for (let x = x0 + 4; x < x0 + w; x += 8) R.pset(x, y0 + 1, hex('#2e7a3e'));
  for (let x = x0 - 3; x <= x0 + w + 3; x++) { const u = (x - x0 + 3) / (w + 6), top = Math.round(y0 - 16 * Math.sin(Math.PI * u)); for (let y = top; y < y0; y++) R.pset(x, y, y === top ? K : y < top + 3 ? hex('#e8ecf4') : rmp(P('#1e3a2a #2e5a3e #3e7a4e'), 0.4 + (x % 7 === 0 ? -0.3 : 0) + (y - top) * 0.02, x, y)); }
  if (o.chimenea !== false) { const cx = x0 + Math.round(w * 0.72); R.rect(cx, y0 - 22, cx + 3, y0 - 8, K); R.rect(cx + 1, y0 - 22, cx + 2, y0 - 9, hex('#4a4a54')); }
  if (o.ventana) { const [vx, vy] = [x0 + Math.round(w * 0.32), y0 + 8]; R.rect(vx - 2, vy - 2, vx + 13, vy + 13, K); R.rect(vx - 1, vy - 1, vx + 12, vy + 12, hex('#e8b030')); R.rect(vx, vy, vx + 11, vy + 11, o.ventana); R.rect(vx + 5, vy, vx + 6, vy + 11, hex('#7a5a2a')); R.rect(vx, vy + 5, vx + 11, vy + 6, hex('#7a5a2a')); }
  if (o.puerta) { const px = x0 + w - 18; R.rect(px - 1, y0 + 3, px + 13, y1, K); tablas(px, y0 + 4, px + 12, y1, P('#2a1810 #4e301c #6a4428 #8a5a34'), 4, 7); R.pset(px + 10, y0 + 20, hex('#e8b030')); for (let k = 0; k < 3; k++) R.rect(px - 2 + k, y1 + 2 + k * 3, px + 14 - k, y1 + 3 + k * 3, hex('#6a4428')); }
  for (const wx of [x0 + 10, x0 + w - 10]) { R.disco(wx, yb - 9, 10, K); R.disco(wx, yb - 9, 9, hex('#c89a30')); R.disco(wx, yb - 9, 7, hex('#2a1e18')); for (let a = 0; a < 8; a++) R.linea(wx, yb - 9, Math.round(wx + Math.cos(a * 0.785) * 7), Math.round(yb - 9 + Math.sin(a * 0.785) * 7), hex('#e8b030')); R.disco(wx, yb - 9, 2, hex('#e8b030')); }
  return { y0, y1 }; };
// el MUNDO EXTERIOR de los fondos locales: cielo, montes, pinos y nieve con la luz pedida
const LUZ = {
  noche: { cielo: P('#0c1026 #141a3e #1e2650 #2a3466'), nubes: P('#1a2040 #2a3258 #3a4470'), montes: P('#2a3046 #1e2236 #8a94b8 #5a6488'), pinos: P('#142a1e #0c1c14 #8a94b8 #2a1e18'), nieve: P('#3a4466 #5a6488 #7a84a8 #9aa4c8') },
  tarde: { cielo: P('#3a4a8a #6a5a9a #c86a7a #f0a870'), nubes: P('#8a5a7a #c88a8a #f8c8a0'), montes: P('#5a5a7a #3a3a5a #f0c8c8 #b898b0'), pinos: P('#24402e #142a1e #e8d8e0 #3a2418'), nieve: P('#a898b8 #c8b8d0 #e8d8e8 #fff0f0') },
  dia: { cielo: P('#3a7ac8 #5a9ae0 #8ac0f0 #c8e4f8'), nubes: P('#a8b8d0 #d8e4f0 #ffffff'), montes: P('#7a8aa8 #5a6a88 #f4f8ff #c8d4e8'), pinos: P('#24502e #143a1e #f4f8ff #4a2e1c'), nieve: P('#a8b8d0 #c8d4e8 #e8ecf4 #ffffff') },
  alba: { cielo: P('#5a5a9a #a87aa8 #f0a8a0 #ffd8a0'), nubes: P('#a87a9a #e8a8a8 #ffe0c0'), montes: P('#6a6a8a #4a4a6a #ffe0d0 #d8b0c0'), pinos: P('#2a4a3a #1a3428 #ffe8e0 #3a2418'), nieve: P('#b8a8c8 #d8c8d8 #f0e0e8 #fff4f0') },
};
const exterior = (k, luzN, extra, o = {}) => fondo(k + luzN, () => cieloG(LUZ[luzN].cielo, o.hor ?? 110), () => {
  const L = LUZ[luzN]; montes(o.montesY ?? 104, 46, o.sem ?? 1.3, L.montes); sueloNieve((o.montesY ?? 104) - 3, L.nieve, o.sem ?? 3, o); filaPinos(o.pinosY ?? 112, 22, (o.sem ?? 1) + 5, 8, 18, L.pinos);
  for (let k = 0; k < 7; k++) pino(Math.round(20 + k * 46 + h2(k, 8) * 20), (o.pinosY ?? 112) + 6 + (k & 1) * 3, 12 + (k % 3) * 3, L.pinos); if (extra) extra(L); });
const vidaExt = (m, t, luzN, o = {}) => { const L = LUZ[luzN];
  if (luzN === 'noche') { estrellas(m, t, 60, 5); const lx = o.luna ?? 70; R.disco(lx, 34, 8, hex('#2a3466')); R.disco(lx, 34, 7, hex('#f4f0d8')); R.disco(lx + 2, 32, 2, hex('#d8d0b0')); R.disco(lx - 2, 37, 1, hex('#d8d0b0')); }
  nubes(m, t, o.nubes ?? [[20, 30, 46, 2], [150, 50, 36, 3.5], [240, 22, 54, 1.2], [90, 70, 28, 5]], L.nubes);
  if (luzN !== 'noche') cuervos(t, 40, 3, 2, luzN === 'dia' ? hex('#2a2a3a') : hex('#3a2a3a'));
  copos(t, o.copos ?? 26, 4, -12, 16, [L.nieve[3], L.nieve[2]]); };
const tiritar = (t, a = 1) => Math.round(Math.sin(t * 47) * a);
// el corazón pequeño de los bocadillos
const corazon = (x, y, c = hex('#e8303a')) => { for (const [i, j] of [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]]) R.pset(x + i, y + j, c); R.pset(x + 1, y + 1, BL); };
// la MANO DE MEFISTO (sin cara): una mano de luz roja tramada; cierra 0–1 recoge los dedos; a 0–1 su intensidad
const manoRoja = (cx, cy, s, cierra, a, t) => { if (a <= 0.02) return; const dentro = (x, y) => { const px = (x - cx) / s, py = (y - cy) / s; if ((px * px) / 42 + (py * py) / 56 < 1) return true;
    const L = 1 - cierra * 0.75; for (const [fx, fl] of [[-5.2, 9.5], [-1.8, 12], [1.6, 11], [5, 8.5]]) if (Math.abs(px - fx) < 1.15 && py < -3 && py > -4 - fl * L) return true; return Math.abs((px + 7) - (py - 1) * -0.6) < 1.8 && py < 2 && py > -6 * (1 - cierra * 0.6); };
  luz(cx, cy - 4 * s, 26 * s, hex('#ff3a2a'), 0.35 * a, 1.1);
  for (let y = Math.floor(cy - 18 * s); y <= cy + 9 * s; y++) for (let x = Math.floor(cx - 11 * s); x <= cx + 9 * s; x++) { if (!dentro(x, y)) continue; const borde = !dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1) || !dentro(x, y + 1);
    const v = (borde ? 1 : 0.72 + 0.18 * Math.sin(t * 6 + y * 0.4)) * a; if (v > bay(x, y)) R.pset(x, y, borde ? hex('#ffb090') : v > 0.55 ? hex('#ff5a3a') : hex('#c8201a')); } };
// el niño de pie sobre la nieve con el abrigo grande de su padre (lo envuelve hasta las rodillas)
const abrigoEn = (x, suelo, dir = 1) => { const c = hex('#6a4a30'), cS = hex('#4e3420'); for (let j = 0; j < 10; j++) { const y = suelo - 1 - j, w = 9 - (j > 7 ? j - 7 : 0); R.rect(x + 7 - w, y, x + 7 + w, y, j === 0 ? K : (j & 3) === 1 ? cS : c); R.pset(x + 7 - w - 1, y, K); R.pset(x + 7 + w + 1, y, K); R.pset(x + 7 + (dir > 0 ? -w + 1 : w - 1), y, cS); }
  for (let y = suelo - 9; y < suelo - 1; y += 3) R.pset(x + 7, y, hex('#c8a040')); R.rect(x + 2, suelo - 11, x + 12, suelo - 11, hex('#a8302a')); R.rect(x + 2, suelo - 12, x + 12, suelo - 12, K); };
// atrezo del campamento: barril, leña apilada, tajo con hacha y un perro (o.ladra)
const barril = (x, yb) => { for (let y = yb - 14; y <= yb; y++) { const w = 6 + Math.round(Math.sin((y - yb + 14) / 14 * Math.PI) * 1.5); R.rect(x - w - 1, y, x + w + 1, y, K); R.rect(x - w, y, x + w, y, (y - yb) % 5 === -2 ? hex('#4a4a54') : hex('#7a4a2a')); R.pset(x - w + 1, y, hex('#9a6034')); } R.rect(x - 6, yb - 15, x + 6, yb - 14, hex('#e8ecf4')); };
const lena = (x, yb, n = 4) => { for (let f = 0; f < 3; f++) for (let k = 0; k < n - f; k++) { const cx = x + k * 7 + f * 3, cy = yb - 3 - f * 6; R.disco(cx, cy, 3, K); R.disco(cx, cy, 2, hex('#a87a4a')); R.pset(cx, cy, hex('#6a4428')); } R.rect(x - 2, yb - 21, x + n * 7 - 1, yb - 20, hex('#e8ecf4')); };
const tajo = (x, yb) => { R.rect(x - 6, yb - 8, x + 6, yb, K); R.rect(x - 5, yb - 7, x + 5, yb - 1, hex('#7a4a2a')); R.rect(x - 5, yb - 7, x + 5, yb - 6, hex('#c8a070')); R.linea(x - 1, yb - 8, x + 5, yb - 18, K); R.linea(x, yb - 8, x + 6, yb - 18, hex('#8a5a34')); R.rect(x - 3, yb - 11, x + 1, yb - 7, hex('#8a8a94')); };
const perro = (x, yb, t, ladra = false, dir = 1) => { const c = hex('#6a4a30'), cS = hex('#4e3420'), X = (i) => Math.round(x + i * dir), f = Math.floor(t * 6) % 2;
  for (let i = -6; i <= 5; i++) R.rect(X(i), yb - 8, X(i), yb - 4, i < -4 ? cS : c); R.rect(Math.min(X(4), X(9)), yb - 12, Math.max(X(4), X(9)), yb - 7, c); R.pset(X(10), yb - 9, K); R.pset(X(7), yb - 11, K); R.pset(X(5), yb - 13, cS); R.pset(X(6), yb - 13, cS);
  for (const i of [-5, -3, 2, 4]) R.rect(X(i), yb - 3, X(i), yb, cS); const tail = Math.round(Math.sin(t * 12) * 2); R.pset(X(-7), yb - 9 + tail, c); R.pset(X(-8), yb - 10 + tail, c);
  if (ladra && f) { R.pset(X(10), yb - 8, hex('#e8303a')); for (let k = 0; k < 3; k++) R.pset(X(13 + k * 2), yb - 12 - k, BL); } };
// alguien que tirita: el actor con un temblor
const actorTirita = (def, x, suelo, t, o, a = 1) => R.actor(def, x + tiritar(t, a), suelo, t, o);
// Atom de gris (después de la nube de polvo): pinta a Atom y le quita el color a lo que ha cambiado
const atomGris = (x, suelo, t, o, g) => { const antes = R.buf.slice(); const r = T.AT.atom(R, x, suelo, t, o); if (g <= 0) return r; const B = R.buf, s = o.s ?? 1;
  for (let y = Math.max(0, Math.floor(suelo - 40 * s)); y <= Math.min(179, suelo + 2); y++) for (let xx = Math.max(0, Math.floor(x - 24 * s)); xx <= Math.min(319, x + 24 * s); xx++) { const i = y * 320 + xx; if (B[i] === antes[i]) continue;
    const c = B[i], l = Math.round(0.3 * (c & 255) + 0.59 * ((c >> 8) & 255) + 0.11 * ((c >> 16) & 255)) * 0.6 + 70; if (g > bay(xx, y)) B[i] = mz(c, (0xff000000 | (l << 16) | (l << 8) | l) >>> 0, 0.85); } return r; };

// ── 1 · el mapa de Latveria en la mesa del carromato ──
const pared = (cs, y1 = 100, fy = 62) => { tablas(0, 0, 319, y1, cs, 11, 2); R.rect(0, fy, 319, fy + 6, hex('#7a2020')); for (let x = 3; x < 320; x += 8) { R.pset(x, fy + 2, hex('#e8b030')); R.pset(x + 4, fy + 4, hex('#2e7a3e')); } R.rect(0, fy - 1, 319, fy - 1, K); R.rect(0, fy + 7, 319, fy + 7, K);
  R.rect(0, 0, 319, 3, hex('#2a1810')); for (let x = 276; x < 320; x++) for (let y = 0; y < 50; y++) if (bay(x, y) < 0.55) R.pset(x, y, mz(R.pget(x, y), hex('#1a1014'), 0.5)); };
const ventanita = (x0, y0, w, hg) => { R.rect(x0 - 3, y0 - 3, x0 + w + 3, y0 + hg + 3, K); R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + hg + 2, hex('#8a5a34')); R.rect(x0, y0, x0 + w, y0 + hg, hex('#141a3e'));
  for (let y = y0; y <= y0 + hg; y++) for (let x = x0; x <= x0 + w; x++) { if (y > y0 + hg - 8 + Math.sin(x * 0.4) * 2) R.pset(x, y, hex('#5a6488')); else if (h2(x, y, 3) > 0.985) R.pset(x, y, BL); }
  R.rect(x0 + (w >> 1), y0, x0 + (w >> 1) + 1, y0 + hg, hex('#6a4428')); R.rect(x0, y0 + (hg >> 1), x0 + w, y0 + (hg >> 1) + 1, hex('#6a4428')); R.rect(x0 - 4, y0 + hg + 3, x0 + w + 4, y0 + hg + 5, hex('#6a4428')); };
const mesaMadera = (y0, cs) => { for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = y >= 168; const v = borde ? 0.15 + (y === 168 ? 0.4 : 0) : 0.4 + 0.3 * Math.sin(y * 1.3 + Math.sin(x * 0.03 + y) * 3) * (h2(x >> 4, y, 7) > 0.5 ? 1 : 0.4) + (h2(x >> 1, y, 4) - 0.5) * 0.2; R.pset(x, y, rmp(cs, v, x, y)); }
  for (let x = 0; x < 320; x += 64) R.rect(x, y0, x, 167, cs[0]); R.rect(0, y0, 319, y0, K); };
const Q = (x, y) => [Math.round(56 + (x - 74) * 1.153), Math.round(90 + (y - 104) * 1.2)];
const mapaPapel = () => { const L = (a, b, c, d, col, pu) => R.linea(...Q(a, b), ...Q(c, d), col, pu), PS = (x, y, c) => R.pset(...Q(x, y), c), RC = (a, b, c, d, col) => R.rect(...Q(a, b), ...Q(c, d), col);
  R.pergamino(56, 90, 252, 162, { luz: [270, 90], semilla: 5 });
  const tinta = hex('#5a3a20'), ti2 = hex('#8a6a44');
  for (const [mx, my, s] of [[104, 124, 1], [118, 118, 1.3], [134, 126, 1], [168, 116, 1.2], [214, 130, 1], [226, 120, 1.1], [184, 140, 0.8]]) { const hh = Math.round(7 * s); L(mx - hh, my + hh * 0.6, mx, my - hh * 0.4, tinta); L(mx, my - hh * 0.4, mx + hh, my + hh * 0.6, tinta); L(mx - 2, my, mx, my - hh * 0.4, ti2); RC(mx - 1, my - Math.round(hh * 0.4) + 1, mx + 1, my - Math.round(hh * 0.4) + 1, BL); }
  for (const [px, py] of [[92, 140], [100, 146], [150, 154], [160, 150], [204, 150], [228, 146], [112, 156], [96, 112], [236, 110]]) { L(px - 2, py + 2, px, py - 2, hex('#3a5a3a')); L(px, py - 2, px + 2, py + 2, hex('#3a5a3a')); PS(px, py + 3, tinta); }
  for (let x = 78; x < 240; x++) { const y = Math.round(150 - (x - 78) * 0.12 + Math.sin(x * 0.12) * 3); PS(x, y, hex('#3a6aa8')); if (x % 3) PS(x, y + 1, hex('#6a9ac8')); }
  const fr = [[90, 112], [130, 108], [178, 106], [232, 114], [238, 146], [214, 160], [160, 161], [104, 158], [84, 138]]; for (let i = 0; i < fr.length; i++) L(...fr[i], ...fr[(i + 1) % fr.length], hex('#a83a2a'), 2);
  const cx = 196, cy = 122; RC(cx - 5, cy - 3, cx + 5, cy + 3, tinta); RC(cx - 4, cy - 2, cx + 4, cy + 2, hex('#c8b48a')); RC(cx - 6, cy - 7, cx - 3, cy + 3, tinta); RC(cx + 3, cy - 7, cx + 6, cy + 3, tinta); PS(cx - 5, cy - 8, tinta); PS(cx + 4, cy - 8, tinta); RC(cx - 1, cy, cx + 1, cy + 3, K);
  for (const dx of [-6, 0, 6]) { const wx = 128 + dx, wy = 142; RC(wx - 2, wy - 2, wx + 2, wy, tinta); PS(wx - 1, wy + 1, tinta); PS(wx + 1, wy + 1, tinta); PS(wx, wy - 3, tinta); } };
const mesaMapa = () => fondo('mapa', () => pared(P('#2a1810 #4e301c #6a4428 #8a5a34'), 84, 50), () => { ventanita(232, 12, 30, 26);
  for (const [hx, n] of [[110, 3], [150, 4], [190, 3]]) { R.linea(hx - 18, 16, hx + 18, 16, hex('#c8a060')); for (let k = 0; k < n; k++) { const x = hx - 12 + k * 8; R.linea(x, 16, x, 19, hex('#c8a060')); for (let j = 0; j < 8; j++) R.pset(x + ((j & 1) ? 1 : -1), 20 + j, j % 3 ? hex('#5a7a3a') : hex('#8a9a4a')); } }
  R.rect(84, 42, 214, 45, K); R.rect(84, 42, 214, 43, hex('#8a5a34')); for (const x of [92, 206]) { R.rect(x, 46, x + 2, 52, K); }
  for (const [x, c, w, hg] of [[90, '#a8603a', 10, 9], [104, '#3a6ac8', 7, 12], [114, '#e8e0c8', 9, 7], [128, '#2e7a3e', 6, 13], [138, '#c8a040', 11, 8], [154, '#7a3a2a', 9, 11], [168, '#5a5a66', 12, 6], [186, '#a83a2a', 8, 10], [198, '#e8b030', 7, 7]]) { R.rect(x - 1, 41 - hg, x + w, 41, K); R.rect(x, 42 - hg, x + w - 1, 41, hex(c)); R.rect(x, 42 - hg, x + 1, 41, mz(hex(c), BL, 0.35)); }
  for (let y = 56; y < 82; y++) for (let x = 12; x < 34; x++) if (Math.abs(x - 23) < 4 + (y - 56) * 0.35) R.pset(x, y, y > 78 ? (x & 1 ? hex('#e8b030') : K) : ((x + y) % 6 < 3 ? hex('#5a2a7a') : hex('#4a1e66'))); R.rect(22, 52, 24, 56, hex('#c8a060'));
  for (let y = 56; y < 80; y++) for (let x = 120; x < 180; x++) { const b = x < 122 || x > 177 || y < 58 || y > 77; R.pset(x, y, b ? hex('#c8a040') : ((x >> 2) + (y >> 2)) & 1 ? hex('#a83a2a') : hex('#2e5a8a')); } R.disco(150, 67, 5, hex('#e8b030')); R.disco(150, 67, 3, hex('#a83a2a'));
  mesaMadera(84, P('#3a2014 #5a3420 #7a4a2a #9a6034')); mapaPapel();
  R.rect(258, 132, 270, 146, K); R.rect(259, 133, 269, 145, hex('#c8c0b0')); R.rect(259, 133, 269, 134, hex('#e8e0d0')); R.rect(270, 136, 273, 141, K); R.rect(261, 135, 267, 136, hex('#5a3420'));
  R.disco(30, 100, 8, K); R.disco(30, 100, 7, hex('#a88a5a')); R.disco(30, 100, 5, hex('#e8e0c8')); R.linea(30, 95, 30, 105, hex('#a83a2a')); R.linea(25, 100, 35, 100, hex('#3a3a46')); R.pset(30, 100, K);
  for (let k = 0; k < 3; k++) { const x = 262 + k * 4; R.rect(x, 100 + k, x + 12, 110 + k, K); R.rect(x + 1, 101 + k, x + 11, 109 + k, hex(['#e8e0c8', '#d8c8a0', '#c8b890'][k])); } });
const vidaMesa = (t, vela = [292, 140]) => { const sw = Math.sin(t * 1.3) * 3; R.linea(40, 0, Math.round(40 + sw), 26, hex('#3a2a20')); const lx = Math.round(40 + sw);
  R.rect(lx - 5, 26, lx + 5, 40, K); R.rect(lx - 4, 27, lx + 4, 39, hex('#ffd880')); R.rect(lx - 4, 27, lx + 4, 28, hex('#4a4a54')); R.rect(lx - 1, 30, lx + 1, 36, hex('#fff4c0')); R.rect(lx - 4, 39, lx + 4, 40, hex('#4a4a54')); luz(lx, 34, 34, hex('#ffd080'), 0.25);
  const mx = Math.round(lx + Math.sin(t * 5) * 9), my = Math.round(32 + Math.cos(t * 3.7) * 7); R.pset(mx, my, hex('#e8e0c8')); R.pset(mx + (Math.sin(t * 30) > 0 ? 1 : -1), my - 1, hex('#c8c0b0'));
  copos(t, 12, 9, -6, 12, [BL, hex('#a8b4c8')], 232, 262, 20, 42);
  velaV(vela[0], vela[1], 14, t, { r: 40 }); humo(264, 128, t, 4, [hex('#c8c0b0'), hex('#8a8494')], 18, 4); };
const p1 = (t) => { mesaMapa(); vidaMesa(t);
  const pin = tramo(t, @3.7, @4.25); if (pin > 0) T.chincheta(R, ...Q(128, 140), t, T.C.rojo, { baja: pin, pulso: t > @4.8 });
  const ruta = tramo(t, @4.6, @5.9); for (let k = 0; k < 40 * ruta; k++) { const u = k / 40; if (k % 2 === 0) R.pset(...Q(lerp(76, 128, u), lerp(112, 138, u) + Math.sin(u * 7) * 4), hex('#a83a2a')); }
  const ax = Math.round(lerp(-12, 44, tramo(t, 0.3, 2.4))), anda = t > 0.3 && t < 2.4;
  T.AT.atom(R, ax, 160, t, { pose: anda ? 'camina' : t > @3.9 && t < @6.0 ? 'senala' : 'quieto', dir: 1, cara: t > @4.3 ? 'sonrisa' : 'normal', habla: t > 2.6 && t < 3.6 ? 1 : 0 }); };

// ── 2 · GAG de la bufanda: Atom tirita junto al termómetro ──
const nieveLoma = (luzN) => fondo('loma' + luzN, () => cieloG(LUZ[luzN].cielo, 104), () => { const L = LUZ[luzN]; montes(96, 54, 2.1, L.montes, 0.5);
  for (let y = 92; y < 140; y++) for (let x = 0; x < 320; x++) if (y > 95 + Math.sin(x * 0.05) * 2) R.pset(x, y, rmp(L.nieve, 0.35 + (h2(x >> 4, y >> 1, 3) - 0.5) * 0.3 + (y % 5 === 0 && h2(x >> 3, y) > 0.6 ? 0.3 : 0) + (y - 95) * 0.006, x, y));
  filaPinos(104, 14, 9, 10, 22, L.pinos); for (let k = 0; k < 9; k++) pino(Math.round(12 + k * 37 + h2(k, 4) * 14), 116 + (k % 3) * 3, 7 + (k % 4), L.pinos);
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 128 - 16 * Math.exp(-((x - 40) ** 2) / 1600) - 6 * Math.sin(x * 0.02); if (y >= top) R.pset(x, y, rmp(L.nieve, 0.55 + (h2(x >> 3, y >> 2, 6) - 0.5) * 0.3 + (Math.sin(x * 0.08 + y * 0.8) > 0.9 ? 0.25 : 0) - (y - top < 2 ? -0.3 : 0), x, y)); }
  for (const [rx, ry, rr] of [[24, 118, 16], [52, 126, 11], [292, 150, 18], [270, 160, 10]]) { R.disco(rx, ry, rr + 1, K); for (let y = ry - rr; y <= ry + rr; y++) for (let x = rx - rr; x <= rx + rr; x++) if (Math.hypot(x - rx, (y - ry) * 1.2) < rr) R.pset(x, y, y < ry - rr * 0.45 + Math.sin(x * 0.7) * 2 ? L.nieve[3] : rmp(P('#3a3a4a #5a5a6a #7a7a8a'), 0.5 - (x - rx) / rr * 0.4 + (h2(x >> 1, y >> 1) - 0.5) * 0.4, x, y)); }
  sueloNieve(180, L.nieve, 1, { piedras: 0, matas: 0, ramas: 0 }); for (let k = 0; k < 18; k++) { const x = Math.floor(h2(k, 31) * 318), y = 136 + Math.floor(h2(k, 32) * 40); for (let i = 0; i < 4; i++) R.linea(x + i, y, x + i + (i - 1.5) * 0.8, y - 3 - (i & 1) * 2, i & 1 ? hex('#a88a4a') : hex('#7a5e30')); }
  R.linea(70, 160, 92, 156, hex('#4e301c')); R.linea(80, 158, 84, 152, hex('#4e301c')); });
const termometro = (x, yb, nivel, t) => { R.rect(x - 2, yb - 56, x + 3, yb, K); R.rect(x - 1, yb - 55, x + 2, yb, hex('#6a4428')); R.rect(x - 1, yb - 55, x - 1, yb, hex('#8a5a34'));
  R.rect(x + 4, yb - 52, x + 14, yb - 14, K); R.rect(x + 5, yb - 51, x + 13, yb - 15, hex('#e8e0c8')); for (let k = 0; k < 8; k++) R.rect(x + 11, yb - 48 + k * 4, x + 12, yb - 48 + k * 4, hex('#5a3a20'));
  R.rect(x + 7, yb - 49, x + 9, yb - 22, hex('#c8c0b0')); const top = Math.round(yb - 22 - 26 * nivel); R.rect(x + 7, top, x + 9, yb - 22, hex('#e8303a')); R.disco(x + 8, yb - 20, 3, K); R.disco(x + 8, yb - 20, 2, hex('#e8303a')); R.pset(x + 7, yb - 21, hex('#ff8a8a'));
  R.rect(x - 3, yb - 58, x + 15, yb - 56, hex('#e8ecf4')); };
const bufanda = (cx, cy, u, t, dir = 1) => { if (u <= 0) return; const largo = Math.round(150 * u), col = (k) => (Math.floor(k / 4) & 1 ? hex('#e8303a') : hex('#f4f0e6'));
  for (let i = -9; i <= 9; i++) { R.rect(cx + i, cy - 1, cx + i, cy + 3, col(i + 20)); R.pset(cx + i, cy - 2, K); R.pset(cx + i, cy + 4, K); }
  for (let k = 0; k < largo; k++) { const x = cx - 6 - k * dir, sueloY = 152, y = Math.min(sueloY - 1, cy + 3 + k * 0.9) + Math.round(Math.sin(t * 7 - k * 0.25) * Math.min(3, k * 0.1)); R.rect(x, y - 1, x, y + 2, col(k)); R.pset(x, y + 3, K); R.pset(x, y - 2, K); }
  const fx = cx - 6 - largo * dir; if (largo > 4) for (let k = 0; k < 4; k++) R.linea(fx, Math.min(151, cy + 3 + largo * 0.9) + k - 1, fx - 3 * dir, Math.min(152, cy + 3 + largo * 0.9) + k, hex('#e8303a')); };
const p2 = (t) => { const m = nieveLoma('tarde'); nubes(m, t, [[30, 34, 50, 2.5], [200, 52, 40, 4], [120, 20, 60, 1.4]], LUZ.tarde.nubes); cuervos(t, 46, 2, 7);
  const frio = tramo(t, @7.2, @8.0); termometro(232, 152, 0.85 - 0.75 * frio, t); if (frio > 0.3) { const cx = 262, cy = 104, cc = hex('#a8e0ff'); for (let i = -5; i <= 5; i++) { R.pset(cx + i, cy, cc); R.pset(cx, cy + i, cc); R.pset(cx + Math.round(i * 0.7), cy + Math.round(i * 0.7), cc); R.pset(cx + Math.round(i * 0.7), cy - Math.round(i * 0.7), cc); } R.pset(cx, cy, BL); }
  if (t > @8.8 && t < @9.6) { R.pset(220, 74 + Math.round((t * 30) % 4), BL); }
  const enr = tramo(t, @8.1, @9.7), sonr = t > @9.8; const ax = 138 + (sonr ? 0 : tiritar(t, 1.4));
  const a = T.AT.atom(R, ax, 152, t, { s: 2, pose: enr > 0 && enr < 1 ? 'brazos' : 'quieto', dir: 1, cara: sonr ? 'sonrisa' : 'triste' });
  if (enr > 0) bufanda(Math.round(a.centro[0]), Math.round(a.centro[1] + 12), enr, t, 1);
  if (!sonr) for (let k = 0; k < 2; k++) { const u = ((t * 1.3 + k * 0.5) % 1); R.disco(Math.round(ax + 22 + u * 10), Math.round(110 - u * 12), Math.round(1 + u * 2), hex('#e8ecf4')); }
  copos(t, 40, 6, -40, 26, [BL, hex('#e8d8e8')]); };

// ── 3 · el campamento al atardecer: Cynthia deja al bebé en la cuna ──
const bebe = (x, y) => { R.rect(x - 4, y - 3, x + 4, y + 2, K); R.rect(x - 3, y - 2, x + 3, y + 1, hex('#f4f0e6')); R.rect(x + 1, y - 2, x + 3, y, hex('#e8b890')); R.pset(x + 2, y - 1, K); R.rect(x - 3, y + 1, x + 3, y + 1, hex('#c8c0d8')); };
const p3 = (t) => { const o = { encuadre: 'campamento', cuna: true }; T.latveria(R, t, o);
  const u = tramo(t, @10.9, @12.0), deja = t > @12.0; const cx = Math.round(lerp(58, 106, u));
  const c = R.actor(EL.cynthiaVD, cx, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: deja ? false : true, sonrisa: deja, habla: t > @13.3 && t < @14.3 && Math.sin(t * 7) > 0 });
  if (!deja) bebe(Math.round(c.mano[0]) + 2, Math.round(c.mano[1])); else bebe(123, 141 + Math.round(Math.sin(t * 2.2) * 0.6));
  if (deja && t < @12.6) { R.pset(123, 132, hex('#fff4c0')); R.pset(122, 131, hex('#ffd34a')); R.pset(124, 131, hex('#ffd34a')); }
  const w = tramo(t, @12.4, @13.8); R.actor(EL.wernerVD, Math.round(lerp(176, 140, w)), 150, t, { dir: -1, anda: w > 0 && w < 1, sonrisa: w >= 1, dedo: t > @14.0 && t < @14.8 });
  T.latveriaDelante(R, t, o); };

// ── 4 · de noche, dos romaníes cuchichean junto a la hoguera pequeña; el carromato de la luz morada ──
const p4 = (t) => { const m = exterior('cuchi', 'noche', () => { carroS(200, 132, 96, { ventana: hex('#3a1a4a'), cs: P('#1e2a4a #2a3a6a #3a4a8a #5a6aa8') });
    R.rect(56, 128, 84, 132, hex('#4e301c')); for (let k = 0; k < 5; k++) R.linea(58 + k * 6, 128, 62 + k * 5, 122, hex('#6a4428'));
    R.linea(60, 104, 70, 128, K); R.linea(80, 104, 70, 128, K); R.linea(70, 100, 70, 112, K);
    R.rect(14, 118, 30, 134, K); R.rect(15, 119, 29, 133, hex('#6a4428')); for (const y of [122, 130]) R.rect(15, y, 29, y, hex('#3a2418')); }, { sem: 2 });
  vidaExt(m, t, 'noche', { luna: 150, nubes: [[20, 40, 40, 1.5], [140, 60, 30, 3], [230, 30, 50, 1]], copos: 14 });
  const vp = 0.5 + 0.5 * Math.sin(t * 3); luz(206 + 31 + 6, 104 + 6, 28, hex('#b05aff'), 0.3 + 0.15 * vp); R.rect(232, 98, 243, 109, vp > 0.5 ? hex('#c88aff') : hex('#9a5ad8')); R.rect(237, 98, 238, 109, hex('#7a5a2a')); R.rect(232, 103, 243, 104, hex('#7a5a2a'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); R.pset(Math.round(238 + Math.sin(t * 2 + k) * 6), Math.round(100 - u * 20), hex('#e8c8ff')); }
  humo(273, 84, t, 6, [hex('#3a4466'), hex('#2a3048')], 40, 10);
  luz(70, 120, 42, hex('#ffa040'), 0.3); R.rect(66, 112, 74, 118, K); R.rect(67, 113, 73, 117, hex('#3a3a46')); llama(70, 126, t, 0.9); humo(70, 110, t, 5, [hex('#5a6488'), hex('#3a4466')], 30, 6);
  const cuchi = t > @16.6 && t < @20.0; R.actor(EL.romaniMujerVD, 40, 150, t, { dir: 1, habla: cuchi && Math.sin(t * 9) > 0, dedo: cuchi && t > @18.0 });
  R.actor(EL.romaniMujerVD, 98, 150, t, { dir: -1, pal: { C: hex('#7a2a3a'), c: hex('#5a1e2a'), W: hex('#2e7a3e') }, sorpresa: t > @19.9, habla: cuchi && Math.sin(t * 9 + 2) > 0.3 });
  if (t > @17.6 && t < @19.6) R.bocadillo(70, 92, { icono: '?' });
  const v = tramo(t, @19.6, @20.7); if (v > 0) R.actor(EL.romaniVD, Math.round(lerp(180, 130, v)), 152, t, { dir: -1, anda: v < 1 });
  lena(132, 168, 5); barril(178, 166); perro(100, 162, t, false, -1); T.AT.luciernaga(R, 150, Math.round(116 + Math.sin(t * 2) * 3), t, { cara: t > @19.9 ? 'sorpresa' : 'normal', dir: -1 }); };

// ── 5 · la mesa de la bruja: las cartas y la bola que se enciende en «she was» ──
const mesaBruja = () => fondo('bruja', () => pared(P('#1a1020 #2e1e34 #3e2a46 #4e3656')), () => {
  R.rect(140, 46, 300, 49, K); R.rect(140, 46, 300, 47, hex('#6a4428'));
  for (const [x, c, hg] of [[150, '#3a8a5a', 12], [162, '#a83a2a', 9], [174, '#3a6ac8', 14], [190, '#e8b030', 8], [204, '#7a4a8a', 11], [250, '#5a8a3a', 10], [264, '#c8c0b0', 13]]) { R.rect(x - 1, 46 - hg - 1, x + 7, 45, K); R.rect(x, 46 - hg, x + 6, 45, hex(c)); R.rect(x, 46 - hg, x + 1, 45, mz(hex(c), BL, 0.4)); R.rect(x + 1, 46 - hg - 3, x + 5, 46 - hg - 1, hex('#8a5a34')); }
  for (const [x, y] of [[20, 20], [60, 30], [100, 18]]) { R.disco(x, y, 3, hex('#e8d890')); R.disco(x + 2, y - 1, 3, hex('#2e1e34')); } for (const [x, y] of [[40, 36], [84, 12], [120, 34]]) { R.pset(x, y, hex('#e8d890')); R.pset(x - 1, y, hex('#a89860')); R.pset(x + 1, y, hex('#a89860')); R.pset(x, y - 1, hex('#a89860')); R.pset(x, y + 1, hex('#a89860')); }
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e0e24 #34163e #4a2058 #5e2a6e'), 0.45 + 0.3 * Math.sin(x * 0.11 + Math.sin(y * 0.3) * 2) * 0.5 + (h2(x >> 1, y >> 1, 9) - 0.5) * 0.25 - (y - 104) * 0.004, x, y));
  R.rect(0, 104, 319, 104, K); for (let x = 0; x < 320; x += 3) { R.pset(x, 105, hex('#e8b030')); R.pset(x + 1, 106, hex('#c89020')); }
  R.rect(150, 132, 170, 138, K); R.rect(151, 133, 169, 137, hex('#c8a040')); R.rect(146, 138, 174, 141, K); R.rect(147, 138, 173, 140, hex('#a88030'));
  R.rect(216, 128, 236, 140, K); R.rect(217, 129, 235, 139, hex('#7a7a84')); R.rect(217, 129, 235, 130, hex('#a8a8b0')); R.rect(214, 126, 238, 128, K); R.linea(226, 122, 240, 112, K); R.linea(227, 122, 241, 112, hex('#8a8a94'));
  for (let k = 0; k < 5; k++) R.linea(30 + k * 3, 130, 36 + k * 2, 112, k & 1 ? hex('#5a7a3a') : hex('#8a9a4a')); R.rect(28, 128, 46, 132, hex('#a88a4a')); });
const carta = (x, y, giro, sim, t) => { const w = Math.max(1, Math.round(7 * Math.abs(Math.cos(giro * Math.PI)))), cara = giro > 0.5;
  R.rect(x - w - 1, y - 11, x + w + 1, y + 11, K); R.rect(x - w, y - 10, x + w, y + 10, cara ? hex('#f2e6c8') : hex('#7a2030'));
  if (!cara && w > 3) { R.rect(x - w + 1, y - 9, x + w - 1, y + 9, hex('#a83a3a')); R.pset(x, y, hex('#e8b030')); R.pset(x, y - 4, hex('#e8b030')); R.pset(x, y + 4, hex('#e8b030')); }
  if (cara && w > 4) { const c = hex('#5a2a7a'); if (sim === 0) { R.disco(x, y - 2, 4, c); R.disco(x + 2, y - 3, 3, hex('#f2e6c8')); } else if (sim === 1) { R.linea(x - 4, y, x + 4, y, c); R.linea(x, y - 5, x, y + 5, c); R.linea(x - 3, y - 3, x + 3, y + 3, c); R.linea(x + 3, y - 3, x - 3, y + 3, c); } else { R.disco(x, y, 4, c); R.disco(x, y, 2, hex('#f2e6c8')); R.disco(x, y, 1, c); } R.rect(x - 4, y + 7, x + 4, y + 7, hex('#c8a040')); } };
const gatoNegro = (x, yb, t, ojos) => { const c = hex('#14101a'); R.disco(x, yb - 6, 6, c); R.rect(x - 6, yb - 6, x + 6, yb, c); R.disco(x + 3, yb - 15, 4, c); R.pset(x + 1, yb - 20, c); R.pset(x, yb - 19, c); R.pset(x + 5, yb - 20, c); R.pset(x + 6, yb - 19, c);
  const col = ojos ? hex('#c8ff6a') : hex('#6a8a3a'); if ((t * 0.4) % 3 > 0.12) { R.pset(x + 2, yb - 15, col); R.pset(x + 5, yb - 15, col); }
  for (let k = 0; k < 10; k++) { const a = Math.sin(t * 2 + k * 0.3) * 0.5; R.pset(Math.round(x - 6 - k * 0.8), Math.round(yb - 1 - k * 1.2 + Math.sin(a + k * 0.4) * k * 0.3), c); } };
const p5 = (t) => { mesaBruja(); const bola = tramo(t, @22.9, @23.4), vio = hex('#c070ff');
  velaV(262, 136, 16, t, bola > 0 ? { col: vio, llama: [hex('#f8e0ff'), hex('#c070ff'), hex('#7a2ac8')], r: 44 } : { r: 40 });
  velaV(118, 120, 10, t + 1, bola > 0 ? { col: vio, llama: [hex('#f8e0ff'), hex('#c070ff'), hex('#7a2ac8')], r: 28 } : { r: 28 });
  humo(226, 112, t, 5, [hex('#7a5a8a'), hex('#5a3a6a')], 34, -6);
  R.disco(160, 116, 17, K); for (let y = 100; y <= 132; y++) for (let x = 144; x <= 176; x++) { const d = Math.hypot(x - 160, y - 116); if (d > 16) continue; const remol = Math.sin(Math.atan2(y - 116, x - 160) * 3 + t * 4 + d * 0.4) * 0.5 + 0.5;
    R.pset(x, y, bola > bay(x, y) * (0.6 + remol * 0.6) ? (d < 6 ? hex('#fff0ff') : remol > 0.5 ? hex('#d090ff') : hex('#8a3ad8')) : (d > 12 ? hex('#2a2a4a') : hex('#3a3a6a'))); }
  R.disco(154, 110, 2, hex('#e8e8ff')); R.pset(152, 109, BL); if (bola > 0) { luz(160, 116, 60, vio, 0.35 * bola); for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 2, r = 20 + 6 * Math.sin(t * 5 + k); R.pset(Math.round(160 + Math.cos(a) * r), Math.round(116 + Math.sin(a) * r), hex('#f0d0ff')); } }
  for (const [i, x] of [[0, 92], [1, 112], [2, 132]]) carta(x, 156, tramo(t, @21.0 + i * 0.55, @21.3 + i * 0.55), i, t);
  gatoNegro(54, 150, t, bola > 0); T.AT.atom(R, 210, 168, t, { pose: bola > 0 ? 'quieto' : 'piensa', dir: -1, cara: bola > 0.5 ? 'sorpresa' : 'normal' }); };

// ── 6 · el barón y sus soldados en el campamento, al atardecer: Cynthia protege a los suyos; las gallinas huyen ──
const gallina = (x, yb, t, corre, dir = 1) => { const c = hex('#f0e8d8'), cS = hex('#c8b8a0'), f = corre ? Math.floor(t * 12 + x) % 2 : 0, X = (i) => Math.round(x + i * dir);
  R.rect(Math.min(X(-3), X(3)), yb - 6, Math.max(X(-3), X(3)), yb - 3, c); R.rect(Math.min(X(-3), X(0)), yb - 4, Math.max(X(-3), X(0)), yb - 3, cS); R.rect(Math.min(X(2), X(4)), yb - 9, Math.max(X(2), X(4)), yb - 6, c);
  R.pset(X(5), yb - 8, hex('#e8a030')); R.pset(X(3), yb - 10, hex('#e8303a')); R.pset(X(3), yb - 8, K); R.pset(X(-4), yb - 7, cS); R.pset(X(f ? -1 : 0), yb - 2, hex('#e8a030')); R.pset(X(f ? 1 : 2), yb - 2, hex('#e8a030')); R.pset(X(f ? -1 : 0), yb - 1, hex('#e8a030')); R.pset(X(f ? 1 : 2), yb - 1, hex('#e8a030')); };
const p6 = (t) => { const m = exterior('tendal', 'tarde', (L) => { carroS(-30, 134, 92, { ventana: hex('#ffc860'), cs: P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a') });
    R.linea(100, 96, 230, 100, hex('#4e301c')); R.linea(100, 96, 100, 134, hex('#4e301c')); R.linea(101, 96, 101, 134, hex('#6a4428')); R.linea(230, 100, 230, 134, hex('#4e301c')); R.linea(231, 100, 231, 134, hex('#6a4428'));
    R.rect(256, 120, 296, 132, K); R.rect(257, 121, 295, 131, hex('#7a4a2a')); for (let k = 0; k < 5; k++) R.disco(262 + k * 7, 118, 3, hex('#a83a2a')); R.disco(266, 134, 5, K); R.disco(266, 134, 4, hex('#c89a30')); R.disco(288, 134, 5, K); R.disco(288, 134, 4, hex('#c89a30')); }, { sem: 4 });
  vidaExt(m, t, 'tarde', { nubes: [[40, 30, 44, 2], [190, 50, 34, 3.2], [250, 20, 52, 1.4]], copos: 8 });
  for (let k = 0; k < 6; k++) { const x = 112 + k * 20, y = Math.round(97 + (k * 20 + 12) * 0.03), on = Math.sin(t * 3 + k) * 2, col = hex(['#a83a2a', '#3a6ac8', '#e8b030', '#2e7a3e', '#7a4a8a', '#f2e6c8'][k]);
    R.rect(x, y + 1, x + 10, y + 12 + Math.round(on), K); R.rect(x + 1, y + 1, x + 9 + Math.round(on * 0.5), y + 11 + Math.round(on), col); R.rect(x + 2, y, x + 3, y + 2, hex('#c8a060')); }
  const prot = t > @25.6; R.actor(EL.victorNinoVD, 46, 152, t, { dir: 1, pal: { C: hex('#7a5a3a'), c: hex('#5a4028') }, sorpresa: t > @27.6 });
  R.actor(EL.cynthiaVD, 62, 152, t, { dir: 1, brazos: prot && t < @29.6, enfado: prot, habla: t > @29.8 && Math.sin(t * 7) > 0 });
  const v = tramo(t, @24.5, @27.4);
  R.actor(EL.baronVD, Math.round(lerp(330, 196, v)), 152, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > @27.6, enfado: t > @27.6 });
  R.actor(EL.soldadoVD, Math.round(lerp(352, 224, v)), 154, t, { dir: -1, anda: v > 0 && v < 1 }); R.actor(EL.soldadoVD, Math.round(lerp(372, 248, v)), 151, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > @28.8 });
  barril(20, 176); lena(270, 178, 6); tajo(240, 172);
  const g = tramo(t, @29.2, @30.1);
  for (const [i, gx, gy, d] of [[0, 150, 158, -1], [1, 166, 164, 1], [2, 138, 166, -1]]) { const x = Math.round(gx + d * g * (50 + i * 16)), sal = g > 0 && g < 1 ? Math.round(Math.abs(Math.sin(t * 14 + i)) * 3) : 0; gallina(x, gy - sal, t + i, g > 0 && g < 1, g > 0 ? d : (i & 1 ? 1 : -1));
    if (g > 0 && g < 0.6) for (let k = 0; k < 2; k++) R.pset(x - d * (4 + k * 3), gy - 12 + k * 2, BL); } };

// ── 7 · de noche, junto a la hoguera: la mano roja sube del fuego, Cynthia la toca en «deal» y se apaga ──
const p7 = (t) => { const o = { encuadre: 'campamento' }; T.latveria(R, t, o); T.tinte(R, 0, 179, [14, 18, 52], 0.42); luz(184, 136, 60, hex('#ff9a40'), 0.35, 0.8);
  const sube = tramo(t, @30.5, @31.6), cierra = tramo(t, @33.7, @34.4), apaga = tramo(t, @34.4, @35.3);
  const hx = Math.round(lerp(184, 170, sube)), hy = Math.round(lerp(140, 106, sube)); manoRoja(hx, hy, 1.9, cierra, Math.min(1, sube * 1.3) * (1 - apaga), t);
  const toca = t > @31.8 && t < @33.0; R.actor(EL.cynthiaVD, 146, 150, t, { dir: 1, dedo: toca, sorpresa: t > @32.6 && t < @33.7, triste: t > @34.6 });
  if (toca && Math.floor(t * 10) % 2) { R.pset(163, 118, BL); R.pset(162, 117, hex('#ffb090')); R.pset(164, 117, hex('#ffb090')); R.pset(163, 116, hex('#ffb090')); R.pset(163, 119, hex('#ffb090')); }
  if (apaga > 0 && apaga < 1) humo(170, 106, t, 6, [hex('#5a3a3a'), hex('#3a2a30')], 26, 4);
  T.AT.luciernaga(R, 250, Math.round(100 + Math.sin(t * 2.4) * 3), t, { cara: sube > 0.5 && apaga < 1 ? 'sorpresa' : 'normal', dir: -1 }); T.latveriaDelante(R, t, o); };

// ── 8 · el trono del infierno: la mano de Mefisto; un pergamino se enciende y se sella ──
const p8 = (t) => { const o = { encuadre: 'trono', mefisto: tramo(t, @35.7, @36.7), contratos: 0 }; T.infierno(R, t, o); T.infiernoDelante(R, t, o);
  const ar = tramo(t, @37.6, @38.0), sello = tramo(t, @39.2, @39.5); if (ar > 0) { const [x, y] = [92, 100]; for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283; if ((k + Math.floor(t * 8)) % 2) R.pset(Math.round(x + Math.cos(a) * (9 + ar * 2)), Math.round(y - 6 + Math.sin(a) * (11 + ar * 2)), hex('#ff5a3a')); } luz(x, y - 6, 18, hex('#ff3a2a'), 0.4 * ar); }
  if (sello > 0) { const r = Math.round(2 + 4 * (1 - sello)); R.disco(96, 104, r + 1, K); R.disco(96, 104, r, hex('#c81a1a')); R.pset(95, 103, hex('#ff8a8a')); } };

// ── 9 · la cuna sola con el chal de Cynthia; Werner la mece; una lucecita sale por la ventana ──
const cunaBG = () => fondo('cuna', () => pared(P('#1a1014 #2e1e1a #3e2a22 #4e3628'), 150, 100), () => { ventanita(200, 26, 40, 40);
  R.disco(226, 38, 5, hex('#f4f0d8')); R.disco(228, 37, 4, hex('#141a3e'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.45 + (x % 22 === 0 ? -0.4 : 0) + (h2(x >> 2, y, 3) - 0.5) * 0.3, x, y));
  R.rect(0, 150, 319, 150, K); for (let y = 158; y < 176; y++) for (let x = 70; x < 250; x++) R.pset(x, y, ((x >> 3) + (y >> 2)) & 1 ? hex('#7a2a2a') : hex('#5a1e1e')); R.rect(70, 157, 249, 157, hex('#e8b030')); R.rect(70, 176, 249, 176, hex('#e8b030'));
  R.rect(86, 132, 104, 135, K); R.rect(87, 132, 103, 134, hex('#6a4428')); R.rect(89, 135, 91, 150, hex('#4e301c')); R.rect(99, 135, 101, 150, hex('#4e301c'));
  for (const [x, c] of [[24, '#a83a2a'], [34, '#2e7a3e'], [44, '#e8b030']]) { R.rect(x, 74, x + 6, 96, K); R.rect(x + 1, 75, x + 5, 95, hex(c)); } R.rect(18, 96, 56, 99, hex('#6a4428'));
  for (let y = 24; y < 70; y++) for (let x = 76; x < 150; x++) { const b = x < 79 || x > 146 || y < 27 || y > 66; R.pset(x, y, b ? hex('#c8a040') : ((Math.abs(x - 112) + Math.abs(y - 46)) % 10 < 5 ? hex('#7a2030') : hex('#2e4a7a'))); } R.disco(112, 46, 8, hex('#e8b030')); R.disco(112, 46, 5, hex('#5a2a7a')); for (let x = 78; x < 148; x += 3) R.pset(x, 68, hex('#e8b030'));
  R.rect(252, 70, 312, 73, K); R.rect(252, 70, 312, 71, hex('#8a5a34')); for (const [x, c, hg] of [[256, '#a8603a', 10], [268, '#3a6ac8', 8], [278, '#e8e0c8', 12], [292, '#7a3a2a', 9], [302, '#2e7a3e', 7]]) { R.rect(x - 1, 69 - hg, x + 8, 69, K); R.rect(x, 70 - hg, x + 7, 69, hex(c)); R.rect(x, 70 - hg, x + 1, 69, mz(hex(c), BL, 0.35)); }
  for (const [hx, n] of [[176, 3], [250, 2]]) { R.linea(hx - 14, 16, hx + 14, 16, hex('#c8a060')); for (let k = 0; k < n; k++) { const x = hx - 10 + k * 9; R.linea(x, 16, x, 20, hex('#c8a060')); for (let j = 0; j < 10; j++) R.pset(x + ((j & 1) ? 1 : -1), 21 + j, j % 3 ? hex('#5a7a3a') : hex('#8a9a4a')); } }
  R.rect(262, 104, 300, 150, K); tablas(263, 105, 299, 149, P('#2a1810 #4e301c #6a4428 #8a5a34'), 6, 3); R.rect(263, 126, 299, 127, K); R.disco(281, 116, 1, hex('#e8b030')); R.disco(281, 138, 1, hex('#e8b030')); barril(36, 150); });
const cuna = (cx, yb, t, mece) => { const a = Math.sin(t * 1.8) * 2 * mece, X = (i) => Math.round(cx + i), Y = (i) => Math.round(yb - 6 - i * a * 0.08);
  for (let i = -18; i <= 18; i++) { const y = Math.round(yb - 1 - (i * i) / 70 * 0 + Math.abs(i) * 0.12); R.pset(X(i), y, K); R.pset(X(i), y - 1, hex('#6a4428')); }
  for (let i = -15; i <= 15; i++) { const top = Y(i) - 14, bot = Y(i); R.pset(X(i), top - 1, K); for (let y = top; y <= bot; y++) R.pset(X(i), y, (i + 15) % 5 === 0 ? hex('#4e301c') : y < top + 2 ? hex('#a87a4a') : hex('#8a5a34')); R.pset(X(i), bot + 1, K); }
  R.rect(X(-17), Y(-17) - 22, X(-15), Y(-17), K); R.rect(X(-16), Y(-16) - 21, X(-15), Y(-15), hex('#8a5a34')); R.rect(X(15), Y(15) - 18, X(17), Y(17), K); R.rect(X(15), Y(15) - 17, X(16), Y(16), hex('#8a5a34'));
  bebe(X(-6), Y(-6) - 15); R.rect(X(-2), Y(0) - 16, X(12), Y(0) - 13, hex('#c8c0d8')); for (let i = -2; i < 13; i += 3) R.pset(X(i), Y(0) - 15, hex('#8a84a8'));
  for (let i = 2; i <= 16; i++) { const y = Y(i) - 15 + Math.round((i - 2) * 0.9); R.rect(X(i), Y(i) - 15, X(i), y, hex('#5a2a7a')); R.pset(X(i), y + 1, (i & 1) ? hex('#c8a040') : K); R.pset(X(i), y + 2, (i & 1) ? hex('#c8a040') : hex('#3a1a4a')); }
  return [X(0), Y(0) - 15]; };
const p9 = (t) => { cunaBG(); copos(t, 10, 12, -5, 10, [BL, hex('#a8b4c8')], 200, 240, 26, 56); velaV(95, 131, 9, t, { r: 46 });
  const [bx, by] = cuna(150, 152, t, 1); R.actor(EL.wernerVD, 176, 152, t, { dir: -1, sostiene: [bx + 14, by + 2], triste: true });
  const al = tramo(t, @43.8, @45.4); if (al > 0 && al < 1) { const x = Math.round(lerp(bx + 8, 220, al)), y = Math.round(lerp(by - 4, 46, al) + Math.sin(al * 9) * 3); luz(x, y, 12, hex('#fff4d0'), 0.4); R.disco(x, y, 2, BL); R.pset(x, y, hex('#fffbe8')); }
  if (t > @44.9) luz(232, 60, 14, hex('#ff3a2a'), 0.35 * tramo(t, @44.9, @45.4));
  T.AT.luciernaga(R, 60, Math.round(118 + Math.sin(t * 2) * 2), t, { cara: 'triste', dir: 1, brillo: 0.6 }); };

// ── 10 · la alcoba: la baronesa enferma; el barón da vueltas y manda al soldado ──
const p10 = (t) => { const o = { encuadre: 'baron', camara: 'alcoba', velas: 0.05 }; T.latveria(R, t, o);
  const ida = (t - @45.7) / 1.6, x = Math.round(100 + 18 * Math.sin(Math.min(ida, 2.6) * 1.9)), anda = t < @49.4;
  R.actor(EL.baronVD, x, 150, t, { dir: anda ? (Math.cos(Math.min(ida, 2.6) * 1.9) > 0 ? 1 : -1) : -1, anda, triste: t < @49.4, dedo: t > @49.6 && t < @50.8, enfado: t > @49.6 });
  const s = tramo(t, @50.3, @51.2); R.actor(EL.soldadoVD, Math.round(lerp(62, 20, s)), 150, t, { dir: s > 0 ? -1 : 1, anda: s > 0 && s < 1 });
  if (t > @47.9 && t < @48.8) { R.pset(222, 116, BL); R.pset(224, 114, BL); } T.latveriaDelante(R, t, o); };

// ── 11 · de día, el jinete llega al carromato de Werner; Werner sale con su bolsa ──
const bolsa = (x, y) => { R.rect(x - 5, y - 2, x + 5, y + 6, K); R.rect(x - 4, y - 1, x + 4, y + 5, hex('#5a3420')); R.rect(x - 4, y - 1, x + 4, y, hex('#7a4a2a')); R.rect(x - 2, y - 4, x + 2, y - 3, K); R.pset(x, y + 2, hex('#e8b030')); };
const p11 = (t) => { const m = exterior('werner', 'dia', () => { carroS(12, 136, 118, { ventana: hex('#8ac0f0'), puerta: true, cs: P('#4e1e1a #7a2a22 #a8382a #c8503a') });
    R.rect(146, 104, 148, 134, hex('#4e301c')); R.rect(186, 104, 188, 134, hex('#4e301c')); R.rect(144, 104, 190, 105, hex('#6a4428'));
    for (let k = 0; k < 6; k++) { const x = 150 + k * 6; R.linea(x, 106, x, 110, hex('#8a6a44')); for (let j = 0; j < 8; j++) R.pset(x + ((j & 1) ? 1 : -1), 111 + j, j % 3 ? hex('#5a8a3a') : hex('#a8a04a')); } }, { sem: 5 });
  vidaExt(m, t, 'dia', { copos: 0 });
  const llega = tramo(t, @51.2, @52.7); const hx = Math.round(lerp(340, 230, llega)); R.actor(EL.soldadoVD, hx, 154, t, { dir: -1, anda: llega > 0 && llega < 1, dedo: t > @52.9 && t < @54.0, habla: t > @52.9 && t < @54.0 && Math.sin(t * 8) > 0 });
  const sal = tramo(t, @52.0, @53.2), va = tramo(t, @54.8, @56.2); const wx = Math.round(lerp(112, 134, sal) + 40 * va);
  const w = R.actor(EL.wernerVD, wx, 140 + Math.round(12 * sal), t, { dir: 1, anda: (sal > 0 && sal < 1) || (va > 0 && va < 1), sostiene: true, habla: t > @53.4 && t < @54.4 && Math.sin(t * 8) > 0 });
  bolsa(Math.round(w.mano[0]) + 2, Math.round(w.mano[1]) + 1);
  R.actor(EL.victorNinoVD, 96, 152, t, { dir: 1, dedo: t > @54.2 && t < @55.6, sonrisa: t > @54.2 }); tajo(176, 172); lena(186, 176, 5); barril(40, 174); perro(70, 172, t, llega > 0 && llega < 1, 1);
  if (llega > 0 && llega < 1) for (let k = 0; k < 4; k++) R.disco(hx + 18 + k * 6, 153 - (k & 1), 1 + (k & 1), hex('#e8ecf4')); };

// ── 12 · Werner sube el camino y cruza la puerta del castillo ──
const p12 = (t) => { const o = { encuadre: 'baron' }; T.latveria(R, t, o); const u = tramo(t, @56.3, @59.1), entra = tramo(t, @59.1, @59.9);
  if (entra < 1) R.actor(EL.wernerVD, Math.round(lerp(150, 153, u)), Math.round(lerp(182, 152, u) - 4 * entra), t, { dir: -1, anda: (u > 0 && u < 1) || entra > 0, sostiene: true, triste: u > 0.6 });
  R.actor(EL.soldadoVD, 188, 152, t, { dir: -1, dedo: t > @58.8 && t < @60.0 });
  T.AT.luciernaga(R, Math.round(lerp(120, 132, u)), Math.round(lerp(150, 128, u) + Math.sin(t * 3) * 3), t, { cara: 'triste', dir: 1 }); T.latveriaDelante(R, t, o); };

// ── 13 · la alcoba: Werner atiende a la enferma; el bocadillo de la balanza ──
const balanza = (cx, cy, inc, u1, u2, u3) => { R.rect(cx - 1, cy - 8, cx + 1, cy + 16, K); R.rect(cx, cy - 7, cx, cy + 15, hex('#c8a040')); R.rect(cx - 8, cy + 15, cx + 8, cy + 17, K); R.rect(cx - 7, cy + 15, cx + 7, cy + 16, hex('#c8a040'));
  const dy = Math.round(inc * 7); R.linea(cx - 22, cy - 6 - dy, cx + 22, cy - 6 + dy, K); R.linea(cx - 22, cy - 7 - dy, cx + 22, cy - 7 + dy, hex('#e8c060'));
  for (const [s, d] of [[-1, -dy], [1, dy]]) { const px = cx + s * 20, py = cy + 6 + d; R.linea(cx + s * 22, cy - 6 + d * 1, px - 6, py, hex('#8a6a30')); R.linea(cx + s * 22, cy - 6 + d, px + 6, py, hex('#8a6a30')); R.rect(px - 8, py, px + 8, py + 2, K); R.rect(px - 7, py, px + 7, py + 1, hex('#e8c060')); }
  if (u1 > 0) corazon(cx - 23, cy - 1 - dy - Math.round((1 - u1) * 6)); if (u2 > 0) R.icono('X', cx - 31, cy - 12 - dy, hex('#a83a2a'), K, 1); if (u3 > 0) R.icono('!', cx + 18, cy - 2 + dy - Math.round((1 - u3) * 8), hex('#e8303a'), K, 2); };
const p13 = (t) => { const o = { encuadre: 'baron', camara: 'alcoba', velas: 0.25 }; T.latveria(R, t, o);
  R.actor(EL.baronVD, 56, 150, t, { dir: 1, enfado: t > @65.4, quieto: false });
  const w = R.actor(EL.wernerVD, 134, 150, t, { dir: 1, sostiene: t < @62.8 ? [150, 128] : false, triste: t > @64.8, habla: false });
  const b = tramo(t, @61.0, @61.5); if (b > 0) { const [x0, y0, x1, y1] = [150, 40, 232, 92]; R.rect(x0 + 2, y0, x1 - 2, y1, K); R.rect(x0, y0 + 2, x1, y1 - 2, K); R.rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, BL); R.rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, BL);
    for (const [cx, cy, r] of [[140, 112, 3], [146, 100, 4]]) { R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, BL); }
    const inc = tramo(t, @66.0, @66.6) * 1 - tramo(t, @62.0, @62.5) * 0.5; balanza(191, 62, inc, tramo(t, @61.9, @62.3), t > @63.2 ? 1 : 0, tramo(t, @66.0, @66.4)); }
  T.AT.luciernaga(R, 250, Math.round(54 + Math.sin(t * 2.3) * 3), t, { cara: t > @65.4 ? 'triste' : 'normal', dir: -1 }); T.latveriaDelante(R, t, o); };

// ── 14 · la mesilla: las velas se consumen noche tras noche; él muele hierbas ──
const mesillaBG = () => fondo('mesilla', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#2a2a36')); }, () => {
  sillares(0, 0, 319, 179, P('#1e1e28 #3a3a46 #4e4e5a #62626e'), 22, 11, 4);
  for (let y = 12; y < 96; y++) for (let x = 26; x < 82; x++) { const ar = y < 30 && Math.hypot(x - 54, (y - 30) * 1.0) > 28; if (ar) continue; const borde = x < 30 || x > 77 || (y < 34 && Math.hypot(x - 54, y - 30) > 24) || y > 91; R.pset(x, y, borde ? (bay(x, y) < 0.5 ? hex('#7a7a86') : hex('#5a5a66')) : hex('#000000')); }
  for (let y = 118; y < 180; y++) for (let x = 84; x < 268; x++) R.pset(x, y, y < 124 ? rmp(P('#3a2014 #5a3420 #7a4a2a #9a6034'), 0.6 + Math.sin(x * 0.2 + y) * 0.2, x, y) : rmp(P('#2a1810 #3e2414 #4e301c #6a4428'), 0.4 + (h2(x >> 2, y >> 3) - 0.5) * 0.3 + (x === 86 || x === 265 ? -0.4 : 0), x, y));
  R.rect(84, 118, 267, 118, K); R.rect(84, 124, 267, 125, K);
  for (const [x0, x1] of [[94, 140], [150, 200], [210, 258]]) { R.rect(x0, 134, x1, 172, K); R.rect(x0 + 1, 135, x1 - 1, 171, hex('#6a4428')); R.rect(x0 + 3, 137, x1 - 3, 169, hex('#3e2414')); R.rect(x0 + 4, 138, x1 - 4, 168, hex('#5a3420')); R.rect(x0 + 4, 138, x1 - 4, 138, hex('#7a4a2a'));
    const cx = (x0 + x1) >> 1; for (let a = 0; a < 16; a++) R.pset(Math.round(cx + Math.cos(a * 0.39) * 8), Math.round(153 + Math.sin(a * 0.39) * 8), hex('#7a4a2a')); R.disco(cx, 153, 2, hex('#c8a040')); }
  for (let x = 100; x < 136; x++) { const bot = 128 + Math.round(10 * Math.sin((x - 100) / 36 * Math.PI)); for (let y = 125; y <= bot; y++) R.pset(x, y, (x + y) % 5 ? hex('#e8e0d0') : hex('#c8c0b0')); R.pset(x, bot + 1, x & 1 ? hex('#a83a2a') : K); }
  for (let y = 0; y < 180; y++) for (let x = 270; x < 320; x++) R.pset(x, y, rmp(P('#0e1a3a #1a2a5a #2a3a7a #3a4a9a'), 0.45 + 0.35 * Math.sin(x * 0.55), x, y)); for (let y = 0; y < 180; y++) { R.pset(270, y, K); R.pset(272, y, hex('#e8b030')); }
  R.rect(214, 108, 230, 118, K); R.rect(215, 109, 229, 117, hex('#a8a8b0')); R.rect(215, 109, 229, 110, hex('#e8e8f0')); R.rect(216, 111, 228, 113, hex('#6a8aa8'));
  for (let k = 0; k < 4; k++) R.linea(100 + k * 2, 117, 96 + k * 3, 106, k & 1 ? hex('#5a8a3a') : hex('#8a9a4a')); R.rect(94, 115, 108, 117, hex('#c8a060')); });
const p14 = (t) => { mesillaBG(); const ciclo = (t - @67.7) / 1.5, fase = ciclo % 1, dia = Math.max(0, Math.sin(fase * Math.PI * 2 - 1.2));
  R.recorte([30, 14, 77, 91]); for (let y = 14; y < 92; y++) for (let x = 30; x < 78; x++) R.pset(x, y, mz(rmp(P('#0c1026 #141a3e #1e2650'), y / 92, x, y), rmp(P('#5a9ae0 #8ac0f0 #c8e4f8'), y / 92, x, y), dia));
  const a = fase * Math.PI, sx = Math.round(54 - Math.cos(a) * 26), sy = Math.round(80 - Math.sin(a) * 52); R.disco(sx, sy, 5, dia > 0.3 ? hex('#ffe070') : hex('#f4f0d8'));
  for (let y = 70; y < 92; y++) for (let x = 30; x < 78; x++) if (y > 84 + Math.sin(x * 0.3) * 3) R.pset(x, y, mz(hex('#3a4466'), hex('#e8ecf4'), dia)); R.recorte(null); R.rect(52, 14, 55, 91, hex('#5a5a66')); R.rect(30, 50, 77, 52, hex('#5a5a66'));
  const consumo = tramo(t, @67.9, @73.3), noches = Math.min(3, Math.floor(tramo(t, @69.0, @71.0) * 3.99));
  for (const [i, x] of [[0, 118], [1, 132], [2, 146]]) { R.rect(x - 4, 116, x + 3, 118, K); R.rect(x - 3, 116, x + 2, 117, hex('#c8a040')); velaV(x, 115, 18 * (1 - consumo * (0.75 + i * 0.08)), t + i, { r: 34, a: 0.24 }); }
  for (let k = 0; k < noches; k++) { const x = 104 + k * 7; R.rect(x - 2, 112 + (k & 1), x + 2, 117, hex('#f2e6c8')); R.pset(x + 2, 113, hex('#c8b48a')); R.pset(x, 111 + (k & 1), K); }
  const gx = 258, gy = 116; R.rect(gx - 7, gy - 7, gx + 7, gy, K); R.rect(gx - 6, gy - 6, gx + 6, gy - 1, hex('#8a8a94')); R.rect(gx - 6, gy - 6, gx + 6, gy - 5, hex('#b8b8c4'));
  const ang = t * 5, mx = Math.round(gx + Math.cos(ang) * 3), my = gy - 8 + Math.round(Math.sin(ang) * 1);
  R.linea(mx, my, mx + 4, my - 9, K); R.linea(mx + 1, my, mx + 5, my - 9, hex('#c8c0b0'));
  T.brazo(R, 336, 112, mx + 16, my - 8, '#6a4a30', -1);
  const rx = 190, ry = 117, gira = tramo(t, @69.6, @70.2); R.rect(rx - 5, ry - 16, rx + 5, ry, K); R.rect(rx - 4, ry - 15, rx + 4, ry - 14, hex('#8a5a34')); R.rect(rx - 4, ry - 1, rx + 4, ry - 1, hex('#8a5a34'));
  const arr = (gira > 0 && gira < 1) ? 1 - (t * 4 % 1) : ((t - @70.2) % 2.5) / 2.5; for (let j = 0; j < 6; j++) { const w = 3 - Math.round(j * 0.5); if (j / 6 < 1 - arr) R.rect(rx - w, ry - 13 + j, rx + w, ry - 13 + j, hex('#e8c890')); if (j / 6 < arr) R.rect(rx - (3 - Math.round((5 - j) * 0.5)), ry - 7 + j, rx + (3 - Math.round((5 - j) * 0.5)), ry - 7 + j, hex('#e8c890')); }
  R.pset(rx, ry - 7, hex('#e8c890')); if (Math.floor(t * 8) % 2) R.pset(rx, ry - 5, hex('#e8c890'));
  T.AT.luciernaga(R, 226, Math.round(70 + Math.sin(t * 2) * 3), t, { cara: 'triste', dir: -1, brillo: 0.5 }); };

// ── 15 · la torre de la alcoba, de noche (fondo local): la silueta de Werner en la ventana; la luz se apaga en «dies» y la campana dobla ──
const torreBG = () => fondo('torre', () => cieloG(LUZ.noche.cielo, 130), () => { montes(132, 40, 3.3, LUZ.noche.montes); filaPinos(140, 20, 13, 8, 16, LUZ.noche.pinos);
  for (let y = 16; y < 180; y++) for (let x = 84; x < 236; x++) { const u = (x - 160) / 76, sombra = Math.abs(u) ** 2 * 0.55 + (u > 0 ? u * 0.25 : 0); if (y < 40) { const half = (y - 16) / 24 * 80; if (Math.abs(x - 160) > half) continue; R.pset(x, y, rmp(P('#1a1a2e #2a2a44 #3a3a5a'), 0.6 - sombra + ((x + y) % 7 === 0 ? -0.2 : 0), x, y)); if (Math.abs(x - 160) > half - 2 || (y > 30 && h2(x, y) > 0.6 && Math.abs(x - 160) > half - 5)) R.pset(x, y, hex('#9aa4c8')); continue; }
    const f = Math.floor((y - 40) / 9), bx = Math.floor((x + (f & 1) * 9) / 18), j2 = (y - 40) % 9 === 0 || (x + (f & 1) * 9) % 18 === 0; R.pset(x, y, j2 ? hex('#1e1e2a') : rmp(P('#2a2a3a #3e3e50 #52526a #686880'), 0.62 - sombra + (h2(bx, f, 3) - 0.5) * 0.3 + (h2(x, y) - 0.5) * 0.15, x, y)); }
  R.rect(84, 40, 236, 42, K); for (let x = 84; x < 236; x += 2) R.pset(x, 41, hex('#9aa4c8'));
  for (let y = 66; y < 106; y++) for (let x = 146; x < 175; x++) { const ar = y < 78 && Math.hypot(x - 160, y - 78) > 14; if (ar) continue; const fr = Math.hypot(x - 160, y - 78) > 11 && y < 78 || x < 149 || x > 171 || y > 102; R.pset(x, y, fr ? hex('#8a8aa0') : K); } R.rect(144, 104, 176, 107, hex('#8a8aa0')); R.rect(144, 104, 176, 104, hex('#e8ecf4'));
  for (const [wx, wy] of [[118, 130], [204, 130], [128, 60]]) { R.rect(wx - 3, wy - 6, wx + 3, wy + 6, K); R.rect(wx - 2, wy - 5, wx + 2, wy + 5, hex('#ffc860')); R.rect(wx, wy - 5, wx, wy + 5, K); }
  R.rect(244, 50, 274, 180, K); sillares(245, 51, 273, 179, P('#1e1e2a #3a3a4e #4e4e64 #62627a'), 10, 7, 9); for (let y = 54; y < 84; y++) for (let x = 250; x < 269; x++) if (y > 64 || Math.hypot(x - 259, y - 64) < 9) R.pset(x, y, hex('#0c0c18')); R.rect(242, 46, 276, 50, hex('#4e4e64')); R.rect(242, 45, 276, 46, hex('#e8ecf4'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (x > 84 && x < 236 || x > 243 && x < 275) continue; const cren = y < 156 && ((x >> 3) & 1); if (cren && y < 154) continue; R.pset(x, y, (y - 150) % 8 === 0 || (x + ((y - 150) >> 3) * 6) % 14 === 0 ? hex('#1e1e2a') : rmp(P('#2a2a3a #3e3e50 #52526a'), 0.5 + (h2(x >> 2, y >> 2) - 0.5) * 0.4, x, y)); }
  for (let x = 0; x < 320; x++) if (!(x > 84 && x < 236) && !(x > 243 && x < 275) && ((x >> 3) & 1)) R.pset(x, 154, hex('#e8ecf4')); });
const p15 = (t) => { const m = torreBG(); estrellas(m, t, 50, 11); const lx = 52; R.disco(lx, 38, 8, hex('#2a3466')); R.disco(lx, 38, 7, hex('#f4f0d8')); R.disco(lx + 2, 36, 2, hex('#d8d0b0'));
  nubes(m, t, [[10, 30, 44, 1.6], [200, 52, 36, 2.6], [120, 70, 30, 3.5]], LUZ.noche.nubes); cuervos(t, 60, 2, 3, hex('#0c0c18'));
  const ap = tramo(t, @78.2, @78.9), col = mz(hex('#ffc860'), hex('#141428'), ap); R.recorte([149, 66, 171, 102]); for (let y = 66; y < 103; y++) for (let x = 149; x < 172; x++) if (y > 78 || Math.hypot(x - 160, y - 78) < 11) R.pset(x, y, rmp([col, mz(col, hex('#fff4c0'), 0.4 * (1 - ap))], 0.4 + (y - 66) * 0.01, x, y));
  if (ap < 1) { const baja = tramo(t, @76.4, @77.4), sx = 162 + Math.round(Math.sin(t * 0.8) * 2), sy = 88 + Math.round(baja * 3), sc = mz(hex('#3a2418'), hex('#141428'), ap); R.disco(sx, sy, 4, sc); R.rect(sx - 6, sy + 4, sx + 6, 102, sc); }
  R.recorte(null); R.rect(160, 66, 160, 102, K); R.rect(149, 86, 171, 86, K); if (ap < 1) luz(160, 86, 34, hex('#ffc860'), 0.3 * (1 - ap)); if (ap > 0 && ap < 1) humo(160, 64, t, 4, [hex('#5a5a6a'), hex('#3a3a4a')], 18, 4);
  const cam = tramo(t, @78.6, @79.3), sw = cam > 0 ? Math.sin((t - @78.6) * 9) * 0.5 * (1 - cam * 0.5) : 0, bxp = 259, byp = 58; R.linea(bxp, byp, Math.round(bxp + Math.sin(sw) * 8), Math.round(byp + Math.cos(sw) * 8), hex('#8a6a30'));
  const cx = Math.round(bxp + Math.sin(sw) * 10), cy = Math.round(byp + Math.cos(sw) * 10); for (let j = 0; j < 9; j++) { const w = 2 + Math.round(j * 0.5); R.rect(cx - w - 1, cy + j - 4, cx + w + 1, cy + j - 4, K); R.rect(cx - w, cy + j - 4, cx + w, cy + j - 4, j < 2 ? hex('#e8c060') : hex('#c89a30')); } R.pset(cx, cy + 6, hex('#5a4a20'));
  if (cam > 0 && cam < 1) for (let k = 0; k < 3; k++) { const r = 6 + k * 6 + Math.round(cam * 10); for (let a = 0; a < 18; a++) if (a & 1) R.pset(Math.round(259 + Math.cos(a / 18 * 6.28) * r), Math.round(64 + Math.sin(a / 18 * 6.28) * r * 0.6), hex('#e8d890')); }
  const gx = Math.round(20 + ((t * 8) % 60)); R.actor(EL.soldadoVD, gx, 152, t, { dir: 1, anda: true }); R.rect(gx + 14, 130, gx + 15, 140, K); llama(gx + 14, 129, t, 0.6); luz(gx + 14, 126, 20, hex('#ff9a40'), 0.3);
  copos(t, 46, 15, -20, 30, [BL, hex('#a8b4c8')]); };

// ── 16 · el salón: el barón señala a Werner desde la escalera; entran dos soldados ──
const salonBG = () => fondo('salon', () => { R.rect(0, 0, 319, 179, hex('#2a2a36')); }, () => { sillares(0, 0, 319, 160, P('#1e1a20 #3a3236 #524646 #6a5a56'), 20, 10, 8);
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#2a2226 #3e3236 #524446 #66585a'), 0.4 + ((x + (y >> 2) * 7) % 24 === 0 || y % 7 === 0 ? -0.4 : 0) + (h2(x >> 3, y >> 2, 2) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 7; k++) { const x0 = 10 + k * 16, y0 = 160 - (k + 1) * 6; R.rect(x0, y0, 130, y0 + 6, K); R.rect(x0 + 1, y0 + 1, 130, y0 + 5, hex('#5a4e4e')); R.rect(x0 + 1, y0 + 1, 130, y0 + 1, hex('#7a6a68')); }
  R.rect(0, 118, 132, 160, hex('#3e3236')); for (let k = 0; k < 7; k++) { const x0 = 10 + k * 16, y0 = 160 - (k + 1) * 6; R.rect(x0, y0, 132, y0 + 6, K); R.rect(x0 + 1, y0 + 1, 131, y0 + 5, hex('#5a4e4e')); R.rect(x0 + 1, y0 + 1, 131, y0 + 1, hex('#8a7a76')); }
  R.rect(0, 112, 132, 118, K); R.rect(0, 113, 131, 117, hex('#6a5a56')); for (let x = 4; x < 132; x += 8) { R.rect(x, 98, x + 2, 112, K); R.rect(x + 1, 99, x + 1, 111, hex('#8a7a76')); } R.rect(0, 96, 132, 98, K); R.rect(0, 96, 131, 97, hex('#8a7a76'));
  for (const bx of [164, 236]) { R.rect(bx, 20, bx + 22, 70, K); R.rect(bx + 1, 21, bx + 21, 66, hex('#2a3a7a')); for (let x = bx + 1; x <= bx + 21; x += 4) R.rect(x, 67, x + 1, 70, hex('#e8b030')); R.rect(bx - 2, 18, bx + 24, 20, hex('#6a4428'));
    const cx = bx + 11; R.rect(cx - 3, 40, cx + 3, 48, BL); R.pset(cx - 2, 49, BL); R.pset(cx + 2, 49, BL); for (const s of [-1, 1]) { R.linea(cx + s * 2, 40, cx + s * 7, 30, BL); R.linea(cx + s * 5, 34, cx + s * 9, 34, BL); R.linea(cx + s * 4, 36, cx + s * 3, 30, BL); } R.pset(cx - 1, 43, K); R.pset(cx + 1, 43, K); }
  R.rect(276, 90, 319, 160, K); for (let y = 90; y < 160; y++) for (let x = 278; x < 320; x++) { if (y < 104 && Math.hypot(x - 300, y - 104) > 22) continue; R.pset(x, y, (x - 278) % 7 === 0 ? hex('#2a1810') : rmp(P('#3e2414 #5a3420 #7a4a2a'), 0.5 + (h2(x, y >> 2) - 0.5) * 0.4, x, y)); }
  for (const yy of [112, 140]) R.rect(278, yy, 319, yy + 2, hex('#2a2a30')); });
const antorcha = (x, y, t) => { R.rect(x - 1, y, x + 1, y + 10, K); R.rect(x, y + 1, x, y + 9, hex('#6a4428')); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#4a4a54')); llama(x, y - 1, t, 0.7); luz(x, y - 4, 40, hex('#ff9a40'), 0.28); };
const p16 = (t) => { salonBG(); antorcha(150, 76, t); antorcha(226, 76, t + 1); antorcha(30, 60, t + 2);
  const b = R.actor(EL.baronVD, 70, 112, t, { dir: 1, dedo: t > @82.3, enfado: t > @81.3, habla: t > @82.3 && t < @83.4 && Math.sin(t * 9) > 0 });
  const w = R.actor(EL.wernerVD, 188, 168, t, { dir: -1, sostiene: t < @81.0 ? true : false, triste: t > @81.3, sorpresa: t > @83.2 && t < @83.9 });
  if (t < @81.0) bolsa(Math.round(w.mano[0]) - 2, Math.round(w.mano[1]) + 1); else bolsa(176, 166);
  if (t > @83.2) R.icono('!', 73, 70, hex('#e8303a'), K, 2);
  const s = tramo(t, @82.0, @83.6); for (const [i, dy] of [[0, 0], [1, 4]]) R.actor(EL.soldadoVD, Math.round(lerp(336 + i * 20, 236 + i * 22, s)), 166 + dy, t, { dir: -1, anda: s > 0 && s < 1 }); };

// ── 17 · de noche, Werner sale del carromato con su hijo; llegan las antorchas ──
const p17 = (t) => { const m = exterior('puerta', 'noche', () => { carroS(120, 140, 160, { ventana: hex('#ffc860'), puerta: true, cs: P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a') }); }, { sem: 7, montesY: 100 });
  vidaExt(m, t, 'noche', { luna: 60, copos: 46, nubes: [[0, 40, 60, 6], [150, 30, 50, 8], [260, 56, 40, 7]] });
  luz(248, 92, 30, hex('#ffc860'), 0.25); const ant = tramo(t, @84.4, @88.6);
  for (let k = 0; k < 4; k++) { const x = Math.round(lerp(-10 - k * 18, 60 - k * 16, ant)), y = 108 + (k & 1) * 4; R.rect(x, y - 4, x + 1, y + 6, K); llama(x, y - 4, t + k, 0.6); luz(x, y - 6, 16, hex('#ff8a30'), 0.3); }
  const sal = tramo(t, @85.0, @86.2), huye = tramo(t, @87.0, @88.7);
  const wx = Math.round(lerp(264, 236, sal) + 160 * huye * 0) , wsx = Math.round(lerp(264, 232, sal) + lerp(0, 90, huye));
  R.actor(EL.victorNinoVD, Math.round(wsx + 14), 152, t, { dir: 1, anda: huye > 0 && huye < 1, sorpresa: t > @85.2 && huye < 0.2 });
  R.actor(EL.wernerVD, wsx, huye > 0 ? 152 : Math.round(lerp(140, 152, sal)), t, { dir: huye > 0 ? 1 : -1, anda: (sal > 0 && sal < 1) || (huye > 0 && huye < 1), sostiene: huye > 0 ? [wsx + 16, 140] : false, sorpresa: sal > 0.5 && huye === 0 });
  if (t > @86.0 && t < @87.0) R.bocadillo(wsx + 8, 108, { icono: '!' }); barril(96, 160); lena(40, 170, 5); perro(130, 168, t, ant > 0.2, -1); };

// ── 18 · la tormenta: Werner sube con el niño a cuestas; detrás, las antorchas ──
const sueloT = (x) => (x < 150 ? 152 : x < 200 ? lerp(152, 132, (x - 150) / 50) : lerp(132, 108, (x - 200) / 119));
const p18 = (t) => { const o = { encuadre: 'tormenta', antorchas: tramo(t, @88.7, @90.8) }; T.latveria(R, t, o);
  const u = tramo(t, @88.8, @93.4), x = Math.round(lerp(40, 196, u)), su = Math.round(sueloT(x));
  R.actor(EL.victorNinoVD, x + 3, su - 11, t, { dir: 1, quieto: true, triste: true });
  R.actor(EL.wernerVD, x, su, t, { dir: 1, anda: u > 0 && u < 1, triste: true });
  T.AT.luciernaga(R, x - 26 + tiritar(t, 1), Math.round(su - 30 + Math.sin(t * 3) * 2), t, { cara: 'triste', dir: 1 });
  if (t > @90.5 && t < @90.9) T.tinte(R, 0, 179, [200, 210, 255], 0.25);
  T.latveriaDelante(R, t, o); };

// ── 19 · el abrigo: Werner se lo quita y envuelve al niño ──
const p19 = (t) => { const o = { encuadre: 'tormenta', camara: 'abrigo' }; T.latveria(R, t, o); const da = t > @93.7;
  const pw = da ? { C: hex('#d8d0bc'), c: hex('#a8a090') } : {};
  R.actor(EL.wernerVD, 160 + (da ? tiritar(t, 1) : 0), 152, t, { dir: -1, pal: pw, sostiene: tramo(t, @93.4, @94.2) > 0 && tramo(t, @93.4, @94.2) < 1 ? [148, 132] : t > @94.6 ? [146, 138] : false, triste: true, habla: t > @95.6 && t < @96.6 && Math.sin(t * 6) > 0 });
  R.actor(EL.victorNinoVD, 136 + (da ? 0 : tiritar(t, 1)), 152, t, { dir: 1, sonrisa: t > @95.0, triste: t < @94.4 });
  if (da) abrigoEn(136, 152, 1); const cae = tramo(t, @95.0, @95.8); if (cae > 0 && cae < 1) for (let k = 0; k < 12; k++) R.rect(196 + k * 3 % 20, Math.round(60 + cae * 80 + (k * 7) % 12), 197 + k * 3 % 20, Math.round(61 + cae * 80 + (k * 7) % 12), BL);
  T.AT.luciernaga(R, 108 + tiritar(t, 1), Math.round(118 + Math.sin(t * 2) * 2), t, { cara: 'triste', dir: 1 });
  T.latveriaDelante(R, t, o); };

// ── 20 · amanece: Boris baja por la loma con su farol; el niño asoma vivo ──
const farol = (x, y, t) => { R.linea(x, y - 6, x, y, K); R.rect(x - 3, y, x + 3, y + 8, K); R.rect(x - 2, y + 1, x + 2, y + 7, hex('#ffd880')); R.rect(x - 1, y + 3, x + 1, y + 5, hex('#fff4c0')); R.rect(x - 3, y + 8, x + 3, y + 9, hex('#4a4a54')); luz(x, y + 4, 26, hex('#ffc860'), 0.3); };
const p20 = (t) => { const m = nieveLoma('alba'); nubes(m, t, [[20, 40, 52, 1.5], [180, 30, 44, 2.6], [260, 58, 30, 3.4]], LUZ.alba.nubes); cuervos(t, 50, 1, 4, hex('#5a3a4a'));
  const u = tramo(t, @97.6, @101.8), bx = Math.round(lerp(330, 150, u));
  const b = R.actor(EL.borisVD, bx, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > @98.0 && t < @99.2 }); farol(Math.round(b.mano[0]), Math.round(b.mano[1]) + 2, t);
  R.actor(EL.wernerVD, 78, 150, t, { dir: 1, pal: { C: hex('#d8d0bc'), c: hex('#a8a090') }, triste: true, sorpresa: t > @98.4 && t < @99.4 });
  const as = t > @99.6; R.actor(EL.victorNinoVD, 98, 150, t, { dir: 1, sonrisa: as }); abrigoEn(98, 150, 1);
  if (as) for (let k = 0; k < 2; k++) { const v = ((t * 1.2 + k * 0.5) % 1); R.disco(Math.round(116 + v * 8), Math.round(130 - v * 8), Math.round(1 + v * 2), hex('#f4f0f8')); }
  if (t > @99.6 && t < @100.6) R.bocadillo(105, 118, { icono: '!' });
  copos(t, 30, 21, -24, 22, [BL, hex('#f0e0e8')]); };

// ── 21 · el pinar al alba (fondo local): Werner le pide a Boris que cuide de su hijo; Boris lo coge y se lo lleva ──
const pinarBG = () => fondo('pinar', () => cieloG(LUZ.alba.cielo, 120), () => { const L = LUZ.alba; montes(104, 40, 4.1, L.montes, 0.5); sueloNieve(100, L.nieve, 8, { piedras: 6, matas: 10, ramas: 6, huellas: [[320, 120, 190, 160]] }); filaPinos(110, 18, 17, 12, 22, L.pinos);
  for (const [x, w] of [[14, 22], [74, 12], [262, 16], [304, 26]]) { for (let y = 0; y < 180; y++) for (let xx = x - (w >> 1); xx <= x + (w >> 1); xx++) { const u = (xx - x) / (w / 2); R.pset(xx, y, Math.abs(u) > 0.92 ? K : rmp(P('#2a160c #4a2a18 #6a4028 #8a5a38'), 0.55 - u * 0.35 + (Math.sin(y * 0.7 + xx * 2.3) > 0.7 ? -0.35 : 0), xx, y)); if (u < -0.5 && h2(xx, y >> 3) > 0.7) R.pset(xx, y, hex('#fff4f0')); }
    for (const by of [24, 58, 92]) { if (by > 60 && w < 16) continue; for (const d of [-1, 1]) { const L2 = 30 + w; for (let k = 0; k < L2; k++) { const bx = x + d * k, byy = by + Math.round(k * 0.35); R.rect(bx, byy - 2, bx, byy + 1, k % 4 ? hex('#1a3428') : hex('#2a4a3a')); R.pset(bx, byy - 3, hex('#fff4f0')); if (k % 3 === 0) R.pset(bx, byy - 4, hex('#ffe8e0')); } } }
    R.rect(x - (w >> 1) - 3, 172, x + (w >> 1) + 3, 179, hex('#f0e0e8')); } });
const p21 = (t) => { const m = pinarBG(); nubes(m, t, [[60, 26, 40, 1.4], [190, 40, 34, 2.4]], LUZ.alba.nubes); luz(180, 60, 90, hex('#ffd8a0'), 0.22, 0.8); for (let k = 0; k < 5; k++) { const x0 = 150 + k * 22; for (let y = 20; y < 160; y += 2) { const x = Math.round(x0 - (y - 20) * 0.35); if (bay(x, y) < 0.18 + 0.05 * Math.sin(t + k)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0d0'), 0.5)); } }
  const coge = t > @104.6, va = tramo(t, @106.6, @109.4); const bx = Math.round(lerp(186, 300, va));
  R.actor(EL.wernerVD, 120, 158, t, { dir: 1, pal: { C: hex('#d8d0bc'), c: hex('#a8a090') }, triste: true, habla: t > @103.6 && t < @105.2 && Math.sin(t * 6) > 0, dedo: t > @104.2 && t < @105.0 });
  if (!coge) { R.actor(EL.victorNinoVD, 148, 158, t, { dir: 1, triste: true }); abrigoEn(148, 158, 1); }
  farol(208, 150, t);
  const b = R.actor(EL.borisVD, bx, 158, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, sostiene: coge ? true : false, triste: true, salto: t > @104.1 && t < @104.4 ? 1 : 0 });
  if (coge) { const [mx, my] = b.mano; R.actor(EL.victorNinoVD, Math.round(mx) - 8, Math.round(my) + 8, t, { dir: va > 0 ? 1 : -1, quieto: true, triste: true }); abrigoEn(Math.round(mx) - 8, Math.round(my) + 8, 1); }
  for (let k = 0; k < 2; k++) { const v = ((t * 0.9 + k * 0.5) % 1); R.disco(Math.round(134 + v * 6), Math.round(136 - v * 8), Math.round(1 + v * 2), hex('#fff4f8')); }
  copos(t, 14, 23, -6, 10, [BL, hex('#f0e0e8')]); };

// ── 22 · el abrigo solo sobre la nieve al amanecer; un petirrojo se posa ──
const abrigoG = () => fondo('abrigoG', () => cieloG(LUZ.alba.cielo, 46), () => { const L = LUZ.alba; montes(44, 26, 5.2, L.montes, 0.5); filaPinos(50, 24, 21, 6, 12, L.pinos);
  for (let y = 48; y < 180; y++) for (let x = 0; x < 320; x++) { const pr = (y - 48) / 132, ond = Math.sin(x * 0.05 / (0.3 + pr) + y * 0.4 + 2 * h2(x >> 4, y >> 3, 5)) > 0.84 ? 0.22 : 0; R.pset(x, y, rmp(L.nieve, 0.58 + ond + (h2(x >> 3, y >> 2, 9) - 0.5) * 0.22 - pr * 0.08, x, y)); }
  for (let k = 0; k < 9; k++) { const u = k / 8, x = Math.round(lerp(236, 300, u) + (k & 1) * 6 * (1 - u)), y = Math.round(lerp(176, 66, u)), w = Math.max(1, Math.round(5 * (1 - u))); R.rect(x - w, y - Math.max(1, w >> 1), x + w, y, L.nieve[0]); R.rect(x - w + 1, y, x + w - 1, y, L.nieve[1]); }
  for (let k = 0; k < 26; k++) { const x = Math.floor(h2(k, 51) * 318), y = Math.floor(70 + h2(k, 52) * 106), sc = (y - 48) / 132; for (let i = 0; i < 3 + Math.round(sc * 3); i++) R.linea(x + i, y, x + i + (i - 1.5) * 0.8, y - 2 - Math.round(sc * 4) - (i & 1) * 2, i & 1 ? hex('#a88a4a') : hex('#7a5e30')); }
  for (let k = 0; k < 8; k++) { const x = Math.floor(h2(k, 61) * 300) + 10, y = Math.floor(80 + h2(k, 62) * 90), r = 1 + Math.round((y - 48) / 40); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#6a6a7a')); R.disco(x - 1, y - 1, Math.max(0, r - 1), hex('#9a9aa8')); R.rect(x - r, y - r - 1, x + r - 1, y - r, L.nieve[3]); }
  for (let y = 60; y < 180; y += 6) for (let x = 0; x < 320; x++) if (Math.sin(x * 0.04 + y * 0.7 + h2(x >> 5, y) * 2) > 0.75) { R.pset(x, y, L.nieve[0]); R.pset(x, y - 1, L.nieve[3]); }
  for (const [x, y] of [[40, 140], [270, 120], [60, 168]]) { R.linea(x, y, x + 18, y - 3, hex('#4e301c')); R.linea(x + 8, y - 2, x + 12, y - 8, hex('#4e301c')); R.linea(x + 12, y - 3, x + 16, y - 7, hex('#4e301c')); for (let k = 0; k < 5; k++) R.pset(x + 2 + k * 3, y - 1, L.nieve[3]); }
  R.disco(84, 160, 4, K); R.disco(84, 160, 3, hex('#8a5a34')); for (let k = 0; k < 4; k++) R.pset(82 + k, 158 + (k & 1), hex('#5a3420'));
  const x = 158, y = 132, c = hex('#6a4a30'), cS = hex('#4e3420'), cL = hex('#8a6440');
  R.poligono([[x - 64, y + 14], [x - 50, y - 18], [x + 8, y - 26], [x + 56, y - 8], [x + 70, y + 16], [x - 8, y + 24]], K); R.poligono([[x - 61, y + 12], [x - 48, y - 15], [x + 7, y - 23], [x + 54, y - 7], [x + 67, y + 14], [x - 8, y + 21]], c);
  for (let yy = y - 22; yy < y + 22; yy++) for (let xx = x - 60; xx < x + 66; xx++) { const pc = R.pget(xx, yy); if (pc !== c) continue; const v = Math.sin(xx * 0.18 + yy * 0.05) * 0.5 + (h2(xx >> 1, yy >> 1) - 0.5) * 0.4; R.pset(xx, yy, v > 0.45 ? cL : v < -0.45 ? cS : c); }
  R.linea(x - 46, y - 14, x + 6, y + 18, cS); R.linea(x - 45, y - 14, x + 7, y + 18, K); R.linea(x + 10, y - 20, x + 24, y + 16, cS); for (const [bx, by] of [[x - 30, y], [x - 20, y + 7], [x - 10, y + 14]]) { R.disco(bx, by, 2, K); R.disco(bx, by, 1, hex('#c8a040')); }
  R.rect(x + 28, y - 20, x + 52, y - 13, K); R.rect(x + 29, y - 19, x + 51, y - 14, hex('#a8302a')); R.rect(x + 44, y - 14, x + 51, y + 14, K); R.rect(x + 45, y - 14, x + 50, y + 13, hex('#a8302a')); for (let k = 0; k < 4; k++) R.pset(x + 45 + k, y + 14, hex('#e8b030')); for (let yy = y - 18; yy < y + 12; yy += 4) R.rect(x + 45, yy, x + 50, yy, hex('#7a2020')); });
const p22 = (t) => { const m = abrigoG(); const sx = 120, sy = Math.round(36 - tramo(t, @109.6, @113.3) * 6); luz(sx, sy, 50, hex('#ffd8a0'), 0.3); R.disco(sx, sy, 6, hex('#fff4d0')); R.disco(sx, sy, 4, BL);
  for (let k = 0; k < 8; k++) { const a = -2.9 + k * 0.36; if (Math.sin(t * 2 + k) > -0.2) R.linea(Math.round(sx + Math.cos(a) * 9), Math.round(sy + Math.sin(a) * 9), Math.round(sx + Math.cos(a) * 15), Math.round(sy + Math.sin(a) * 15), hex('#fff0c0')); }
  nubes(m, t, [[30, 20, 30, 1.2], [220, 14, 36, 2]], LUZ.alba.nubes);
  const cubre = tramo(t, @109.6, @113.3); for (let k = 0; k < 40 * cubre; k++) { const x = Math.round(100 + h2(k, 41) * 120), y = Math.round(112 + h2(k, 42) * 40); if (R.pget(x, y) !== R.pget(0, 179)) R.pset(x, y, BL); }
  const bo = tramo(t, @109.6, @113.3), fx = Math.round(lerp(286, 300, bo)), fy = Math.round(lerp(76, 62, bo)); R.rect(fx - 1, fy - 5, fx + 1, fy, K); R.pset(fx, fy - 6, hex('#e8e0d8')); luz(fx + 2, fy - 3, 6, hex('#ffd880'), 0.5); R.pset(fx + 2, fy - 3, hex('#fff4c0'));
  const bp = tramo(t, @110.6, @111.5), bx = Math.round(lerp(40, 196, bp)), by = Math.round(lerp(60, 110, bp) - Math.sin(bp * 3.14) * 16);
  R.rect(bx - 5, by - 5, bx + 3, by, K); R.rect(bx - 4, by - 4, bx + 2, by - 1, hex('#6a4a30')); R.rect(bx - 2, by - 3, bx + 2, by - 1, hex('#e86a2a')); R.pset(bx + 4, by - 3, hex('#e8a030')); R.pset(bx + 1, by - 4, K); R.rect(bx - 7, by - 4, bx - 5, by - 3, hex('#4e3420'));
  if (bp < 1) { const a = Math.sin(t * 22) > 0; R.linea(bx - 3, by - 5, bx - 6, by - (a ? 10 : 2), hex('#5a4030')); } else { R.pset(bx - 1, by + 1, K); R.pset(bx + 1, by + 1, K); if (Math.floor(t * 2) % 3 === 0) R.pset(bx + 1, by - 5, K); }
  copos(t, 16, 29, -6, 10, [BL, hex('#f0e0e8')]); };

// ── 23 · Boris llega al campamento con el niño; las romaníes salen a recibirlos ──
const p23 = (t) => { const m = exterior('cerca', 'alba', () => { carroS(150, 126, 70, { ventana: hex('#ffc860'), cs: P('#1e2a4a #2a3a6a #3a4a8a #5a6aa8') }); carroS(236, 130, 80, { ventana: hex('#ffc860'), cs: P('#4e3a10 #7a5a18 #a87a20 #c89a30') });
    for (let x = 0; x < 140; x += 12) { R.rect(x, 124, x + 2, 146, K); R.rect(x + 1, 125, x + 1, 145, hex('#8a5a34')); R.rect(x, 122, x + 2, 123, hex('#fff4f0')); } R.rect(0, 130, 140, 131, hex('#6a4428')); R.rect(0, 140, 140, 141, hex('#6a4428')); }, { sem: 6 });
  vidaExt(m, t, 'alba', { copos: 6 }); humo(201, 82, t, 5, [hex('#c8b8c8'), hex('#a898b0')], 36, 8); humo(296, 86, t + 1, 5, [hex('#c8b8c8'), hex('#a898b0')], 36, 8);
  const u = tramo(t, @113.3, @115.6); const bx = Math.round(lerp(-20, 118, u)); const b = R.actor(EL.borisVD, bx, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, triste: true });
  const [mx, my] = b.mano; R.actor(EL.victorNinoVD, Math.round(mx) - 8, Math.round(my) + 8, t, { dir: 1, quieto: true }); abrigoEn(Math.round(mx) - 8, Math.round(my) + 8, 1);
  const s = tramo(t, @114.2, @116.0); R.actor(EL.romaniMujerVD, Math.round(lerp(220, 160, s)), 160, t, { dir: -1, anda: s > 0 && s < 1, brazos: s >= 1 && t < @117.0, sorpresa: s > 0.5 });
  R.actor(EL.romaniVD, Math.round(lerp(250, 190, tramo(t, @114.6, @116.6))), 164, t, { dir: -1, anda: t > @114.6 && t < @116.6, triste: true });
  R.actor(EL.romaniMujerVD, 214, 158, t, { dir: -1, pal: { C: hex('#7a2a3a'), c: hex('#5a1e2a') }, sostiene: true, triste: t > @115.0 }); };

// ── 24 · el carromato de noche: Boris arropa al niño ──
const cabezaDormida = (x, y) => { R.rect(x - 1, y - 5, x + 8, y + 3, K); R.rect(x, y - 4, x + 7, y + 2, hex('#c8956a')); R.rect(x, y - 4, x + 7, y - 2, hex('#1c1424')); R.rect(x, y - 2, x + 1, y + 1, hex('#1c1424')); R.rect(x + 3, y, x + 4, y, K); R.rect(x + 6, y, x + 7, y, K); R.pset(x + 5, y + 2, hex('#a86a4a')); };
const colcha = (x0, x1, y) => { for (let x = x0; x <= x1; x++) for (let yy = y; yy <= y + 7; yy++) R.pset(x, yy, [hex('#a83a2a'), hex('#e8b030'), hex('#2e7a3e'), hex('#3a5ac8')][((x - x0) >> 3) % 4 ^ ((yy - y) >> 2 & 1)]); R.rect(x0, y - 1, x1, y - 1, K); for (let x = x0; x <= x1; x += 8) R.rect(x, y, x, y + 7, hex('#f2e6c8')); };
const p24 = (t) => { const o = { encuadre: 'campamento', camara: 'carromato' }; T.latveria(R, t, o);
  const ar = tramo(t, @118.4, @119.8); cabezaDormida(20, 124); colcha(Math.round(lerp(96, 28, ar)), 112, 124);
  const b = R.actor(EL.borisVD, 124, 150, t, { dir: -1, sostiene: ar > 0 && ar < 1 ? [Math.round(lerp(96, 30, ar)), 124] : t > @120.6 && t < @121.6 ? [30, 118] : false, sonrisa: t > @121.0 });
  T.AT.luciernaga(R, 74, Math.round(100 + Math.sin(t * 2) * 2), t, { cara: t > @121.0 ? 'sonrisa' : 'normal', dir: -1, brillo: 0.5 }); if (t > @120.9) corazon(70, 82 - Math.round(tramo(t, @120.9, @121.8) * 6));
  T.latveriaDelante(R, t, o); };

// ── 25 · años después: Victor, ya muchacho, quita la manta del baúl y lo abre ──
const p25 = (t) => { const ab = tramo(t, @126.8, @127.6); const o = { encuadre: 'campamento', camara: 'carromato', baul: ab * 0.4 }; T.latveria(R, t, o); T.tinte(R, 0, 179, [30, 40, 90], 0.28);
  const u = tramo(t, @122.0, @124.2); const vx = Math.round(lerp(30, 150, u)); R.actor(EL.victorChicoVD, vx, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t > @125.1 && t < @126.0 ? [168, 122] : false, sorpresa: t > @125.9 && t < @127.0 });
  const q = tramo(t, @125.2, @125.9); if (q < 1) { const x0 = Math.round(lerp(166, 150, q)), x1 = Math.round(lerp(234, 196, q)), top = Math.round(lerp(124, 136, q)); for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 0.45) > 0.6, bot = 150 - Math.round(q * 6 * ((x - x0) / (x1 - x0))); R.pset(x, top - 1, K); for (let y = top; y <= bot; y++) R.pset(x, y, pl ? hex('#2e3a6a') : (((x - x0) >> 3) & 1) ? hex('#a83a2a') : hex('#3a5ac8')); if (x % 2) R.pset(x, bot + 1, hex('#e8b030')); } }
  if (q >= 1) R.poligono([[150, 150], [160, 144], [178, 146], [186, 151]], hex('#4a4a7a'));
  if (q > 0.4 && q < 1) for (let k = 0; k < 6; k++) R.pset(180 + k * 5, Math.round(120 - q * 10 - k % 3), hex('#c8c0b0'));
  T.latveriaDelante(R, t, o); };

// ── 26 · el baúl abierto a la luz de la vela; saca un libro; GAG: Atom abre una cajita y le sale una nube de polvo ──
const baulBG = () => fondo('baul', () => tablas(0, 0, 319, 140, P('#120a08 #20140e #2e1e14 #3e2a1c'), 13, 5), () => {
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.5 + (y % 9 === 0 ? -0.4 : 0) + (h2(x >> 3, (y / 9) | 0, 2) - 0.5) * 0.4, x, y)); R.rect(0, 140, 319, 140, K);
  for (let y = 36; y < 100; y++) for (let x = 74; x < 246; x++) { const e = x < 80 || x > 239 || y < 42; R.pset(x, y, e ? rmp(P('#2a160c #4e2e1a #6a4428'), 0.5 + (h2(x, y >> 2) - 0.5) * 0.5, x, y) : rmp(P('#3a0e14 #5a1620 #7a2030'), 0.5 + 0.3 * Math.sin(x * 0.3 + y * 0.1) * 0.5 + (h2(x >> 1, y >> 1) - 0.5) * 0.3, x, y)); }
  R.rect(74, 36, 245, 36, K); for (const [sx, sy] of [[100, 56], [130, 70], [160, 52], [192, 74], [220, 58], [146, 88], [206, 90]]) { R.pset(sx, sy, hex('#e8c060')); R.pset(sx - 1, sy, hex('#a88030')); R.pset(sx + 1, sy, hex('#a88030')); R.pset(sx, sy - 1, hex('#a88030')); R.pset(sx, sy + 1, hex('#a88030')); }
  R.disco(176, 64, 6, hex('#e8c060')); R.disco(179, 62, 5, hex('#5a1620'));
  for (let y = 100; y < 174; y++) for (let x = 70; x < 250; x++) R.pset(x, y, rmp(P('#2a160c #4e2e1a #6a4428 #8a5a34'), 0.45 + ((y - 100) % 12 === 0 ? -0.4 : 0) + 0.25 * Math.sin(x * 0.25 + Math.sin(y) * 2) * 0.4 + (h2(x >> 2, y >> 2, 4) - 0.5) * 0.25, x, y));
  for (const bx of [84, 160, 236]) { R.rect(bx - 3, 100, bx + 3, 174, K); R.rect(bx - 2, 100, bx + 2, 173, hex('#5a5a66')); R.rect(bx - 2, 100, bx - 1, 173, hex('#8a8a94')); for (let y = 106; y < 172; y += 10) R.pset(bx, y, hex('#c8c8d0')); }
  R.rect(150, 124, 170, 146, K); R.rect(151, 125, 169, 145, hex('#c8a040')); R.rect(151, 125, 169, 126, hex('#f0d070')); R.rect(158, 132, 162, 140, K); R.rect(70, 100, 249, 101, K); R.rect(68, 172, 251, 174, K); });
const p26 = (t) => { baulBG(); const vl = 0.8 + 0.2 * Math.sin(t * 9); luz(160, 96, 90, hex('#ffc860'), 0.3 * vl, 0.7);
  for (const [x, c, hg] of [[90, '#3a6ac8', 14], [104, '#2e7a3e', 18], [120, '#a83a2a', 12], [196, '#7a4a8a', 16], [212, '#c8a040', 13], [226, '#3a8a7a', 15]]) { R.rect(x - 1, 100 - hg, x + 11, 101, K); R.rect(x, 100 - hg + 1, x + 10, 101, hex(c)); R.rect(x + 1, 100 - hg + 3, x + 9, 100 - hg + 3, hex('#e8c060')); R.pset(x + 5, 100 - hg + 7, hex('#e8c060')); }
  for (let x = 136; x < 192; x++) { const y = 98 + Math.round(Math.sin(x * 0.3) * 2); R.rect(x, y, x, 112 + ((x * 7) % 5), hex('#5a2a7a')); if (x % 3 === 0) R.pset(x, 113 + ((x * 7) % 5), hex('#c8a040')); }
  for (let k = 0; k < 10; k++) { const u = (t * 0.25 + k / 10) % 1, x = Math.round(90 + h2(k, 3) * 140 + Math.sin(t + k) * 4), y = Math.round(100 - u * 60); R.pset(x, y, u < 0.7 ? hex('#ffe890') : hex('#c8a040')); }
  velaV(290, 168, 22, t, { r: 60, a: 0.28 }); R.rect(282, 168, 298, 171, K); R.rect(283, 168, 297, 170, hex('#8a8a94'));
  // el libro de su madre, tumbado delante del baúl: su mano abre la tapa en «turning the pages»
  const ab = tramo(t, @131.3, @132.5), bx0 = 110, bx1 = 178, by0 = 150, by1 = 172, mid = 144;
  R.rect(bx0 - 1, by0 - 1, bx1 + 1, by1 + 3, K); R.rect(bx0, by1, bx1, by1 + 2, hex('#e8dcc0')); for (let x = bx0 + 1; x < bx1; x += 2) R.pset(x, by1 + 1, hex('#b8a07a'));
  if (ab > 0) { for (let y = by0; y < by1; y++) for (let x = bx0; x < bx1; x++) R.pset(x, y, rmp(P('#b8a07a #d8c49a #ecdcb4'), 0.75 - (Math.abs(x - mid) < 3 ? 0.4 : 0), x, y)); R.rect(mid, by0, mid, by1 - 1, hex('#8a7050'));
    for (let l = 0; l < 4; l++) for (let x = bx0 + 4; x < mid - 3; x++) if (x % 6) R.pset(x, by0 + 4 + l * 5 + Math.round(Math.sin(x + l) * 0.6), hex('#4a2a4a'));
    R.disco(161, 158, 5, hex('#5a2a7a')); R.disco(163, 157, 4, hex('#ecdcb4')); for (const [sx, sy] of [[154, 166], [170, 166]]) { R.linea(sx - 2, sy, sx + 2, sy, hex('#5a2a7a')); R.linea(sx, sy - 2, sx, sy + 2, hex('#5a2a7a')); } }
  const xe = Math.round(lerp(bx1, bx0 - (bx1 - bx0) * 0.9, ab)), lift = Math.round(Math.sin(ab * Math.PI) * 16);
  if (ab < 1) { R.poligono([[bx0, by0], [xe, by0 - lift], [xe, by1 - lift], [bx0, by1]], K); R.poligono([[bx0 + 1, by0 + 1], [xe - (xe > bx0 ? 1 : -1), by0 - lift + 1], [xe - (xe > bx0 ? 1 : -1), by1 - lift - 1], [bx0 + 1, by1 - 1]], hex('#6a1e2a')); if (ab < 0.4) { R.disco(144, 161, 5, hex('#e8c060')); R.disco(144, 161, 3, hex('#6a1e2a')); R.pset(144, 161, hex('#e8c060')); } }
  else { R.rect(bx0 - 64, by0, bx0 - 1, by1, K); R.rect(bx0 - 63, by0 + 1, bx0 - 2, by1 - 1, hex('#6a1e2a')); R.disco(bx0 - 32, 161, 5, hex('#e8c060')); R.disco(bx0 - 32, 161, 3, hex('#6a1e2a')); }
  const wx = ab > 0 && ab < 1 ? xe + 4 : ab >= 1 ? 120 : 184, wy = ab > 0 && ab < 1 ? 160 - lift : 162; T.brazo(R, 160, 204, wx, wy, '#c8b898', ab > 0 && ab < 1 ? -1 : 1, { codo: [150, 186] });
  const abre = tramo(t, @129.2, @129.6), polvo = tramo(t, @129.5, @131.0), gris = tramo(t, @129.6, @130.4);
  const cx = 252, cyb = 174; R.rect(cx - 10, cyb - 10, cx + 10, cyb, K); R.rect(cx - 9, cyb - 9, cx + 9, cyb - 1, hex('#5a3a20')); R.rect(cx - 9, cyb - 9, cx + 9, cyb - 8, hex('#7a5a30')); R.rect(cx - 1, cyb - 6, cx + 1, cyb - 3, hex('#c8a040'));
  const tapa = Math.round(abre * 8); for (let w = 0; w < 3; w++) { R.linea(cx - 10, cyb - 10 - w, cx - 10 + Math.round(20 * Math.cos(abre * 1.5)), cyb - 10 - w - Math.round(20 * Math.sin(abre * 1.5)), w === 2 ? K : hex('#7a4a2a')); }
  atomGris(Math.round(lerp(330, 270, tramo(t, @127.7, @128.9))), 172, t, { s: 1.6, pose: t < @128.9 ? 'camina' : abre < 1 ? 'sostiene' : polvo < 1 ? 'brazos' : 'quieto', dir: -1, cara: polvo > 0 ? (polvo < 0.7 ? 'sorpresa' : 'triste') : 'normal' }, gris);
  if (polvo > 0 && polvo < 1) for (let k = 0; k < 11; k++) { const a = k * 0.6, r = 4 + polvo * 22 * (0.6 + h2(k, 2) * 0.6); R.disco(Math.round(262 + Math.cos(a) * r * 0.9), Math.round(144 - polvo * 10 + Math.sin(a) * r * 0.55), Math.round(3 + polvo * 5 * (1 - polvo * 0.6)), k & 1 ? hex('#b8b0a8') : hex('#8a847c')); }
  if (polvo >= 1) for (let k = 0; k < 3; k++) R.pset(258 + k * 5, 128 - Math.round(((t * 2 + k * 0.3) % 1) * 8), hex('#b8b0a8')); };

// ── 27 · el libro: pasa la página; el dibujo de su madre; su dedo sigue las líneas ──
const libroBG = () => fondo('libro', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.4 + 0.3 * Math.sin(y * 1.1 + Math.sin(x * 0.04 + y) * 3) * 0.6 + (h2(x >> 1, y, 4) - 0.5) * 0.2, x, y)); }, () => {
  R.rect(36, 30, 284, 168, K); R.rect(37, 31, 283, 167, hex('#5a1620')); R.rect(37, 31, 283, 33, hex('#7a2030'));
  for (let y = 36; y < 164; y++) for (let x = 42; x < 279; x++) { const d = Math.abs(x - 160), curva = Math.round((1 - d / 118) ** 2 * 4); if (y < 36 + curva * 0 || y > 163) continue; R.pset(x, y, rmp(P('#b8a07a #d8c49a #ecdcb4 #f6ecd0'), 0.75 - (d < 10 ? (10 - d) * 0.05 : 0) - (x < 50 || x > 270 ? 0.25 : 0) + (h2(x >> 1, y >> 1, 7) - 0.5) * 0.12, x, y)); }
  R.rect(159, 36, 160, 163, hex('#8a7050')); for (let k = 0; k < 4; k++) { R.pset(44 + k, 164 + 0, hex('#d8c49a')); }
  const tinta = hex('#4a2a4a'); for (let l = 0; l < 11; l++) { const y = 46 + l * 10, x1 = l === 10 ? 110 : 148 - (l % 3) * 6; for (let x = 52; x < x1; x++) { const yy = Math.round(y + Math.sin(x * 0.9 + l) * 1.2 + (x % 7 < 1 ? -1 : 0)); if ((x % 11) !== 0) R.pset(x, yy, tinta); } }
  for (let l = 0; l < 3; l++) { const y = 132 + l * 10; for (let x = 172; x < 262 - l * 14; x++) if (x % 9) R.pset(x, Math.round(y + Math.sin(x * 0.8 + l) * 1.2), tinta); }
  const cx = 212, cy = 70; R.anillo(cx, cy - 18, 7, tinta); for (let k = -8; k <= 8; k++) R.pset(cx + k, Math.round(cy - 26 + Math.abs(k) * 0.2), tinta); for (const s of [-1, 1]) R.linea(cx + s * 7, cy - 20, cx + s * 9, cy - 4, tinta);
  R.linea(cx - 16, cy + 22, cx, cy - 8, tinta); R.linea(cx + 16, cy + 22, cx, cy - 8, tinta); R.linea(cx - 16, cy + 22, cx + 16, cy + 22, tinta); for (let k = -14; k <= 14; k += 4) R.linea(cx + k, cy + 22, cx + k, cy + 26, hex('#a88030'));
  R.pset(cx - 3, cy - 19, tinta); R.pset(cx + 3, cy - 19, tinta); R.linea(cx - 2, cy - 15, cx + 2, cy - 15, tinta);
  R.disco(250, 52, 5, hex('#5a2a7a')); R.disco(253, 50, 4, hex('#ecdcb4')); for (const [sx, sy] of [[178, 50], [252, 100], [176, 104]]) { R.linea(sx - 3, sy, sx + 3, sy, hex('#5a2a7a')); R.linea(sx, sy - 3, sx, sy + 3, hex('#5a2a7a')); R.pset(sx - 2, sy - 2, hex('#5a2a7a')); R.pset(sx + 2, sy + 2, hex('#5a2a7a')); R.pset(sx + 2, sy - 2, hex('#5a2a7a')); R.pset(sx - 2, sy + 2, hex('#5a2a7a')); }
  R.linea(240, 112, 248, 124, hex('#3a6a3a')); for (const [fx, fy] of [[238, 110], [242, 108], [236, 106]]) { R.disco(fx, fy, 2, hex('#e87aa8')); R.pset(fx, fy, hex('#f8d0e0')); }
  R.rect(154, 160, 157, 176, hex('#a83a2a')); R.pset(155, 177, hex('#a83a2a')); });
const p27 = (t) => { libroBG(); velaV(300, 128, 18, t, { r: 120, a: 0.22 }); R.rect(292, 128, 308, 131, K); R.rect(293, 128, 307, 130, hex('#c8a040'));
  const pg = tramo(t, @133.6, @134.4); if (pg > 0 && pg < 1) { const xe = Math.round(lerp(278, 42, pg)), alto = Math.round(Math.sin(pg * Math.PI) * 14); R.poligono([[160, 36], [xe, 36 - alto], [xe, 163 - alto], [160, 163]], hex('#ecdcb4')); R.linea(xe, 36 - alto, xe, 163 - alto, hex('#b8a07a')); R.linea(160, 36, xe, 36 - alto, hex('#b8a07a')); for (let l = 0; l < 9; l++) { const y0 = 48 + l * 12; R.linea(Math.round(lerp(160, xe, 0.12)), y0 - Math.round(alto * 0.12), Math.round(lerp(160, xe, 0.85)), y0 - Math.round(alto * 0.85), hex('#c8b48a')); } }
  const sig = tramo(t, @134.6, @137.0), fy = sig < 0.5 ? 142 : 152, fx = Math.round(sig < 0.5 ? lerp(206, 248, sig * 2) : lerp(176, 222, sig * 2 - 1));
  for (let x = sig < 0.5 ? 172 : 172; x < (sig >= 0.5 ? 262 : fx); x++) if (x % 9 && sig > 0) R.pset(x, 143 + Math.round(Math.sin(x * 0.8 + 1) * 1.2), hex('#c8a040'));
  if (sig >= 0.5) for (let x = 172; x < fx; x++) if (x % 9) R.pset(x, 153 + Math.round(Math.sin(x * 0.8 + 2) * 1.2), hex('#c8a040'));
  if (sig > 0) T.brazo(R, fx + 52, 200, fx + 12, fy + 6, '#c8b898', -1, { codo: [fx + 40, 176] }); else T.brazo(R, 300, 200, 262, 158, '#c8b898', -1, { codo: [292, 178] });
  T.AT.luciernaga(R, 104, Math.round(26 + Math.sin(t * 2) * 2), t, { cara: t > @135.6 ? 'triste' : 'normal', dir: 1, brillo: 0.7 }); };

// ── 28 · el camino del infierno: la cerradura de la puerta late en «where she is now» ──
const p28 = (t) => { const o = { encuadre: 'camino' }; T.infierno(R, t, o); const la = tramo(t, @141.2, @141.8);
  if (la > 0) { luz(245, 100, 26 + Math.sin(t * 6) * 3, hex('#fff4d0'), 0.45 * la); R.disco(245, 84, 2, BL); R.pset(245, 82, hex('#fffbe8')); R.pset(244, 84, hex('#e8f0ff')); }
  T.infiernoDelante(R, t, o); for (let k = 0; k < 5; k++) { const u = ((t * 0.3 + k / 5) % 1); R.pset(Math.round(60 + k * 30 + Math.sin(t + k) * 5), Math.round(170 - u * 60), hex('#ff8a3a')); } };

// ── 29 · Victor sube a la loma con el libro y mira el castillo del barón ──
const p29 = (t) => { const o = { encuadre: 'baron', lejos: true }; T.latveria(R, t, o); const u = tramo(t, @142.6, @144.6);
  const v = R.actor(EL.victorChicoVD, Math.round(lerp(-14, 96, u)), 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, enfado: t > @144.8 });
  const [mx, my] = v.mano; R.rect(Math.round(mx) - 1, Math.round(my) - 5, Math.round(mx) + 6, Math.round(my) + 3, K); R.rect(Math.round(mx), Math.round(my) - 4, Math.round(mx) + 5, Math.round(my) + 2, hex('#6a1e2a')); R.pset(Math.round(mx) + 3, Math.round(my) - 1, hex('#e8c060'));
  const cv = tramo(t, @143.4, @144.6); if (cv < 1) { const x = Math.round(lerp(33, 90, cv)), y = Math.round(lerp(100, 60, cv) - Math.sin(cv * 3) * 6); const a = cv > 0 && Math.sin(t * 16) > 0; R.rect(x - 2, y - 1, x + 2, y + 1, K); R.pset(x - 3, y - (a ? 2 : 0), K); R.pset(x + 3, y - (a ? 2 : 0), K); R.pset(x + 2, y - 2, K); }
  if (t > @144.4) for (let k = 0; k < 2; k++) { const b = ((t * 1.1 + k * 0.5) % 1); R.disco(Math.round(116 + b * 6), Math.round(128 - b * 8), Math.round(1 + b * 2), hex('#c8d0e8')); }
  T.latveriaDelante(R, t, o); };

// ── 30 · el mapa de noche: Atom señala el castillo y sale el «1» ──
const p30 = (t) => { mesaMapa(); T.tinte(R, 0, 179, [16, 20, 52], 0.42); vidaMesa(t); T.chincheta(R, ...Q(128, 140), t, T.C.rojo, { baja: 1 });
  for (let k = 0; k < 40; k++) { const u = k / 40; if (k % 2 === 0) R.pset(...Q(lerp(76, 128, u), lerp(112, 138, u) + Math.sin(u * 7) * 4), hex('#a83a2a')); }
  const uno = tramo(t, @146.3, @146.8); if (uno > 0) { T.AT.anillo(R, 197, 110, 16, 13, t, tramo(t, @146.5, @147.6)); R.numero('1', 197, Math.round(lerp(98, 90, uno)), { tam: 16, centro: true }); luz(197, 110, 24, hex('#ff5a3a'), 0.3 * uno); }
  const ax = Math.round(lerp(330, 250, tramo(t, @146.3, @147.4))); T.AT.atom(R, ax, 166, t, { pose: t < @147.4 ? 'camina' : 'senala', dir: -1, cara: t > @148.6 ? 'triste' : 'normal', habla: t > @148.0 && t < @149.3 ? 1 : 0 }); };

// ── 31 · la puerta del infierno: el «2»; la cerradura late en «hell» ──
const p31 = (t) => { const o = { encuadre: 'camino', camara: 'puerta' }; T.infierno(R, t, o); const dos = tramo(t, @150.4, @150.9), hell = tramo(t, @154.4, @154.8);
  if (dos > 0) { R.numero('2', 166, Math.round(lerp(64, 56, dos)), { tam: 16, centro: true }); luz(166, 50, 20, hex('#ffd34a'), 0.25 * dos); }
  luz(166, 96, 20 + 16 * hell + Math.sin(t * 5) * 2, hex('#fff4d0'), 0.3 + 0.25 * hell); if (t > @152.2 && t < @152.8) { const d = Math.round(Math.sin(t * 50)); R.linea(120 + d, 52, 212 + d, 124, hex('#8a8a94')); }
  const ax = Math.round(lerp(96, 120, tramo(t, @150.4, @151.6))); T.AT.atom(R, ax, 152, t, { pose: ax < 120 ? 'camina' : t > @153.4 ? 'senala' : 'quieto', dir: 1, cara: hell > 0 ? 'sorpresa' : 'normal' }); T.infiernoDelante(R, t, o); };

// ── 32 · Victor en la nieve, de noche, con la luz roja lejana que crece; se da la vuelta y se va ──
const p32 = (t) => { const m = nieveLoma('noche'); estrellas(m, t, 50, 8); nubes(m, t, [[30, 40, 46, 2], [180, 28, 56, 1.3], [260, 60, 30, 3]], LUZ.noche.nubes);
  const roja = 0.45 + 0.55 * tramo(t, @155.2, @155.9) + 0.12 * Math.sin(t * 3); luz(262, 96, 80 * roja, hex('#ff3a2a'), 0.45, 0.55); luz(262, 98, 20 * roja, hex('#ff9a6a'), 0.6); for (let y = 60; y < 98; y++) if (bay(262, y) < roja * (y - 60) / 38) { R.pset(262, y, hex('#ff6a4a')); } R.disco(262, 99, 2, hex('#fff0d0'));
  const va = tramo(t, @158.2, @159.6), gira = t > @157.6; const vx = Math.round(lerp(150, 230, va));
  R.actor(EL.victorChicoVD, vx, 150, t, { dir: gira && va === 0 ? -1 : 1, anda: va > 0 && va < 1, enfado: t > @155.2 && !gira, triste: gira && va === 0 });
  const vi = tramo(t, @156.6, @157.6); copos(t, 30 + Math.round(30 * vi), 22, -40 - 80 * vi, 24, [BL, hex('#a8b4c8')]);
  T.AT.luciernaga(R, 108, Math.round(110 + Math.sin(t * 2) * 3), t, { cara: t > @155.9 ? 'sorpresa' : 'normal', dir: 1 }); };

// ── 33 · el libro de su madre, de noche: el dibujo de la puerta; tres trazos rojos bajo las tres palabras; el «3» de Atom ──
const p33 = (t) => { libroBG();
  for (let y = 38; y < 162; y++) for (let x = 166; x < 276; x++) R.pset(x, y, rmp(P('#a8946e #c8b48a #dccca4'), 0.7 - (x < 172 ? 0.3 : 0) + (h2(x >> 1, y >> 1, 7) - 0.5) * 0.12, x, y));
  const tinta = hex('#3a1e3a'), gx = 220, gy = 112; for (let a = 0; a <= 32; a++) { const an = Math.PI * a / 32; R.pset(Math.round(gx - Math.cos(an) * 26), Math.round(gy - 34 - Math.sin(an) * 22), tinta); R.pset(Math.round(gx - Math.cos(an) * 20), Math.round(gy - 34 - Math.sin(an) * 16), tinta); }
  for (const dx of [-26, -20, 20, 26]) R.linea(gx + dx, gy - 34, gx + dx, gy + 10, tinta); R.linea(gx - 34, gy + 10, gx + 34, gy + 10, tinta); R.linea(gx, gy - 50, gx, gy + 10, tinta);
  const ojo = tramo(t, @162.8, @163.6) * (0.6 + 0.4 * Math.sin(t * 4)); R.disco(gx, gy - 14, 4, tinta); R.disco(gx, gy - 14, 2, mz(hex('#dccca4'), hex('#e8303a'), ojo));
  for (let k = 0; k < 7; k++) { const fx = gx - 30 + k * 10, fy = gy + 9; R.linea(fx, fy, fx + 2, fy - 6 - (k & 1) * 3, hex('#a83a2a')); R.linea(fx + 2, fy - 6 - (k & 1) * 3, fx + 4, fy, hex('#a83a2a')); }
  for (const [px, py] of [[180, 54], [262, 60], [262, 140], [182, 140]]) { R.linea(px - 3, py, px + 3, py, tinta); R.linea(px, py - 3, px, py + 3, tinta); }
  T.tinte(R, 0, 179, [14, 18, 50], 0.3); R.disco(gx, gy - 14, 2, mz(hex('#dccca4'), hex('#ff3a2a'), ojo)); if (ojo > 0.3) luz(gx, gy - 14, 12, hex('#ff3a2a'), 0.35 * ojo);
  for (let k = 0; k < 3; k++) { const x0 = 64 + k * 26, on = tramo(t, @160.1 + k * 0.3, @160.35 + k * 0.3); R.rect(x0, 144, x0 + 18, 146, tinta); if (on > 0) R.rect(x0 - 1, 149, x0 - 1 + Math.round(20 * on), 150, hex('#e8303a')); }
  velaV(300, 128, 9, t, { r: 110, a: 0.26 }); R.rect(292, 128, 308, 131, K); R.rect(293, 128, 307, 130, hex('#c8a040'));
  T.AT.atom(R, 148, 160, t, { pose: t > @159.9 && t < @161.4 ? 'senala' : t > @162.8 ? 'brazos' : 'quieto', dir: -1, cara: t > @162.9 ? 'sorpresa' : 'normal', habla: t > @159.7 && t < @160.8 ? 1 : 0 });
  if (t > @160.2) R.numero('3', 96, Math.round(lerp(140, 132, tramo(t, @160.2, @160.6))), { tam: 16, centro: true }); };

// efectos (pasada de movimiento): el viento y la ventisca en los exteriores de nieve, la hoguera y la estufa que crepitan
// (tic), los pasos en la nieve, la manta y las páginas (papel), el dedo que sigue las líneas (lapiz), el farol de Boris
// llega con sus pasos y la campana de la torre; todos en el gesto que ya pasa en el plano
const efectos = [[@0.6, 'pasos'], [@4.2, 'golpecito'], [@6.8, 'viento'], [@8.2, 'whoosh'],
  [@10.95, 'pasos', { n: 3 }], [@12.5, 'tic'], [@13.4, 'pasos', { n: 3 }],
  [@15.3, 'viento', { dur: 3 }], [@17.2, 'tic'], [@19.3, 'tic'],
  [@21.0, 'papel'], [@23.1, 'brillo'], [@24.6, 'viento', { dur: 2.5 }], [@27.5, 'pasos'], [@29.2, 'oca'],
  [@30.4, 'tic'], [@31.8, 'brillo'], [@33.4, 'tic'], [@34.5, 'chof'], [@36.0, 'zumbido'], [@39.3, 'sello'],
  [@40.4, 'viento', { dur: 3 }], [@42.2, 'tic'], [@43.9, 'brillo'],
  [@46.2, 'pasos', { n: 5, ritmo: 0.45 }], [@50.4, 'pasos'], [@51.3, 'carro'], [@52.0, 'puerta'], [@54.8, 'pasos'],
  [@56.4, 'pasos', { n: 5 }], [@59.1, 'puerta'], [@62.0, 'pop'], [@63.5, 'viento', { dur: 2.5 }], [@66.1, 'golpecito'],
  [@68.3, 'tic'], [@69.7, 'tic'], [@71.3, 'tic'], [@74.0, 'viento', { dur: 3.5 }], [@78.5, 'campana'],
  [@80.2, 'tic'], [@82.1, 'pasos'], [@85.0, 'puerta'], [@85.6, 'pasos', { n: 4 }], [@87.0, 'viento', { dur: 2.5 }],
  [@88.9, 'rafaga'], [@89.4, 'pasos', { n: 6, ritmo: 0.45 }], [@90.6, 'trueno'], [@91.6, 'viento', { dur: 3 }],
  [@93.8, 'whoosh'], [@95.0, 'chof'], [@95.8, 'viento', { dur: 2 }],
  [@97.8, 'pasos'], [@99.0, 'viento', { dur: 2 }], [@100.6, 'pasos', { n: 4 }],
  [@103.3, 'viento', { dur: 2 }], [@106.7, 'pasos', { n: 6 }], [@109.8, 'viento', { dur: 3 }], [@110.9, 'pajaros'],
  [@113.6, 'puerta'], [@114.3, 'pasos'], [@115.4, 'pasos', { n: 3 }],
  [@117.8, 'tic'], [@118.6, 'papel'], [@120.4, 'tic'], [@122.1, 'pasos', { n: 4 }], [@125.4, 'papel'], [@127.0, 'cerrojo'],
  [@127.8, 'pasos', { n: 3 }], [@129.5, 'chof'], [@131.3, 'papel'], [@133.7, 'papel'], [@134.7, 'lapiz'],
  [@137.4, 'rafaga'], [@141.7, 'zumbido'], [@142.7, 'pasos', { n: 5 }], [@143.5, 'pajaros'], [@144.8, 'viento', { dur: 2 }],
  [@146.4, 'pop'], [@150.5, 'pop'], [@152.3, 'cerrojo'], [@153.6, 'rafaga'], [@155.8, 'viento'], [@158.3, 'pasos', { n: 4 }],
  [@160.1, 'lapiz'], [@160.2, 'pop'], [@162.9, 'golpecito']];
T.rodar(E, R, [[0, p1], [@6.6, p2], [@10.8, p3], [@15.1, p4], [@20.7, p5], [@24.4, p6], [@30.1, p7], [@35.5, p8], [@40.2, p9],
  [@45.6, p10], [@51.1, p11], [@56.2, p12], [@60.8, p13], [@67.6, p14], [@73.7, p15], [@79.3, p16],
  [@84.1, p17], [@88.7, p18], [@93.5, p19], [@97.3, p20], [@103.0, p21], [@109.6, p22], [@113.3, p23],
  [@117.5, p24], [@121.8, p25], [@127.6, p26], [@133.5, p27], [@137.1, p28],
  [@142.5, p29], [@146.2, p30], [@150.3, p31], [@155.1, p32], [@159.6, p33]], { efectos });
'''))
