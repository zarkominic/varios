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
// 2 «a small, cold» GAG: Atom tirita junto al termómetro y se envuelve en una bufanda tres veces más larga que él; la loma con rocas de verdad, ventisqueros, surcos y sus huellas;
// 3 «That's where Victor is born» el campamento: Cynthia deja al bebé en la cuna en «born»; Werner llega sonriendo;
// 4 «he never keeps» de noche, dos romaníes cuchichean junto a la hoguera mirando el carromato de la luz morada;
// 5 «because they said» la mesa de la bruja (tapiz, hierbas, espejo, amuletos): Cynthia pasa la mano y las cartas se dan la vuelta; la bola se enciende en «she was»;
// 6 «She wanted to protect» llegan el barón y sus soldados; los romaníes del fondo dejan lo que hacen; Cynthia da unos pasos y se pone delante de los suyos con los brazos abiertos; las gallinas huyen en «animals»;
// 7 «and to gain power» la hoguera de cerca, de noche (cámara baja, el carromato morado detrás): la mano roja sube del fuego; Cynthia se acerca y la toca en «deal»; se cierra y se apaga;
// 8 «Deals with Mephisto» el trono del infierno: la mano de Mefisto aparece; un pergamino se enciende y se sella en «too»;
// 9 «Cynthia died» la cuna grande con el chal; Werner entra, la coge del borde y la mece; una lucecita sale de la cuna, cruza el cuarto y se va por la ventana en «soul»;
// 10 «A few years later» la alcoba: el barón entra, va hasta la cama de la enferma, se va a la ventana y manda al soldado en «send»;
// 11 «send for the camp's healer» de día, la puerta del carromato de frente: el soldado llega con el caballo de la rienda; Werner baja la escalerita con su bolsa y se va; Victor le dice adiós desde la puerta;
// 12 «Imagine what Werner feels» la rampa del castillo vista de lado: Werner sube la cuesta empedrada y entra por la puerta en «door»;
// 13 «He knows» junto a la cama: Werner, detrás de la cama, le pone el paño a la enferma; el barón mira desde la ventana; el bocadillo de la balanza (corazón, X y «!»);
// 14 «And still he stays» la mesilla: las velas se consumen noche tras noche, la luna y el sol cruzan la ventana; su mano muele hierbas en el mortero del taburete;
// 15 «Whoever they are» la torre de la alcoba (fondo local): la silueta baja la cabeza; la ventana se apaga en «dies» y dobla la campana;
// 16 «the baron doesn't see» el salón: el barón, en lo alto de la escalera de piedra, señala a Werner en «blame» y su sombra enorme lo repite en la pared; entran dos soldados;
// 17 «Werner understands» de noche (nubes, luna con halo, el campamento lejano), Werner sale del carromato con su hijo; las antorchas llegan por la loma;
// 18 «onto the mountain» la ladera de cerca en la tormenta: Werner sube hacia la derecha con el niño a cuestas; abajo, las antorchas le siguen; Atom tirita;
// 19 «the coat and the cold» desde detrás de una rama nevada: al abrigo de la roca, Werner se quita el abrigo y envuelve al niño en «coat»; la rama suelta la nieve;
// 20 «finally finds them» la cresta al alba: el sol sale detrás de los pinos; Boris baja con su farol dejando su rastro; el niño asoma vivo en «alive»;
// 21 «to ask him» el pinar al alba (raíces, ventisqueros, el rastro de Boris): Werner le pide a Boris que cuide de su hijo; Boris lo coge y se lo lleva;
// 22 «but that night» de cerca, el abrigo de Werner tendido en la nieve (mangas, cuello, botones, bufanda); se cubre de copos; un petirrojo se posa; las huellas de Boris se alejan;
// 23 «good people» Boris llega al campamento con el niño; las romaníes salen a recibirlos; delante, huellas, leña y cubos;
// 24 «And Boris keeps» el carromato de noche: Boris arropa al niño y le acaricia la frente;
// 25 «a few years later» el rincón del baúl de cerca: Victor, ya muchacho, entra, quita la manta en «finds a trunk» y levanta la tapa;
// 26 «Picture him opening» el baúl abierto con la vela; saca un libro; GAG: Atom abre una cajita y le sale una nube de polvo;
// 27 «written in the handwriting» el libro: pasa la página; el dibujo de su madre; su dedo sigue las líneas;
// 28 «and understanding» el camino del infierno: la puerta se entreabre y en la rendija se ve la silueta de luz de Cynthia en «where she is now»;
// 29 «That night» Victor, de espaldas, sube a las rocas de la cresta con el libro y alza el puño hacia el castillo lejano;
// 30 «The first» el mapa de cerca sobre el castillo, con la vela: Atom entra por el papel, señala el castillo y sale el «1»;
// 31 «and the second» la puerta del infierno: el «2»; la cerradura late en «hell»;
// 32 «whatever it costs» Victor en la loma, recortado contra la luz roja que crece entre dos montes; se da la vuelta y se va hacia ella;
// 33 «those last three words» la página de la puerta de cerca: tres trazos rojos bajo las tres palabras y el «3» de Atom; el ojo de la cerradura se enciende.''', _t(r'''
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

// ── utilidades del pulido: rocas de verdad, nieve trabajada, capas que van delante, sombra grande y Victor de espaldas ──
// una roca irregular (no una bola): contorno quebrado, facetas con la luz por la izquierda, grietas, la nieve encima
// (nC: tres tonos de nieve de la luz del plano) y su sombra al pie
const roca = (cx, yb, w, h, sem, nC, cs = P('#262632 #3a3a48 #525262 #6e6e7c #8c8c9a'), nv = 1) => {
  const x0 = Math.max(0, Math.floor(cx - w * 0.62)), x1 = Math.min(319, Math.ceil(cx + w * 0.62)), yc = yb - h * 0.5, filo = mz(nC[0], K, 0.45);
  const rad = (a) => 0.8 + 0.12 * Math.sin(a * 3 + sem) + 0.08 * Math.sin(a * 7 + sem * 2.3) + 0.05 * Math.sin(a * 13 + sem * 5);
  const dentro = (x, y) => { if (y > yb) return false; const dx = (x - cx) / (w / 2), dy = (y - yc) / (h / 2); return Math.hypot(dx, dy) < rad(Math.atan2(dy, dx)) || (y > yb - 3 && Math.abs(dx) < 0.92); };
  for (let x = x0; x <= x1; x++) { let top = -1; for (let y = Math.max(0, Math.floor(yc - h)); y <= Math.min(179, yb); y++) if (dentro(x, y)) { top = y; break; } if (top < 0) continue;
    const fx = (x - cx) / (w / 2), prof = nv * (2 + 3 * Math.max(0, 1 - Math.abs(fx) * 1.1) + 2 * h2(x >> 1, sem, 3) + (h2(x, sem, 5) > 0.82 ? 3 : 0));
    for (let y = top; y <= Math.min(179, yb); y++) { if (!dentro(x, y)) continue; const borde = !dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1) || !dentro(x, y + 1), fy = (y - yc) / (h / 2);
      if (y - top < prof) R.pset(x, y, borde ? filo : y - top >= prof - 1 ? nC[0] : fx < 0.25 ? (bay(x, y) < 0.75 ? nC[2] : nC[1]) : (bay(x, y) < 0.35 ? nC[1] : nC[0]));
      else if (borde) R.pset(x, y, K);
      else { const fa = Math.floor(fx * 2.4 + fy * 1.3 + h2(Math.floor(fx * 3 + 5), Math.floor(fy * 3 + 5), sem) * 1.6) & 1; R.pset(x, y, rmp(cs, 0.6 - fx * 0.3 - fy * 0.14 + (fa ? 0.12 : -0.07) + (h2(x >> 1, y >> 1, sem) - 0.5) * 0.22, x, y)); } } }
  for (let k = 0; k < Math.max(1, Math.round(w / 13)); k++) { let x = Math.round(cx + (h2(k, sem, 11) - 0.5) * w * 0.6), y = Math.round(yc - h * 0.05 + h2(k, sem, 12) * h * 0.15);
    for (let s = 0; s < h * 0.5; s++) { if (!dentro(x, y) || !dentro(x + 1, y + 1)) break; const c = R.pget(x, y); if (c !== nC[0] && c !== nC[1] && c !== nC[2] && c !== K && c !== filo) { R.pset(x, y, cs[0]); R.pset(x + 1, y, cs[cs.length - 1]); } y++; if (h2(s, k, sem) > 0.55) x += h2(s + 1, k, sem) > 0.5 ? 1 : -1; } }
  for (let x = x0; x <= x1; x++) { if (!dentro(x, yb - 1)) continue; const hh = 2 + Math.round(1.5 + 1.5 * Math.sin(x * 0.37 + sem) + h2(x >> 1, sem, 9) * 2); for (let y = yb - hh; y <= Math.min(179, yb + 1); y++) R.pset(x, y, y === yb - hh ? nC[2] : y === yb - hh + 1 ? nC[1] : (bay(x, y) < 0.5 ? nC[0] : nC[1])); }
  for (let x = Math.round(cx - w * 0.2); x <= Math.round(cx + w * 0.72); x++) for (let y = yb + 2; y <= yb + 4; y++) if (x >= 0 && x < 320 && y < 180 && bay(x, y) < 0.55 - (y - yb) * 0.14) R.pset(x, y, mz(R.pget(x, y), hex('#2a2a4a'), 0.35)); };
// la nieve trabajada: ventisquero (montón alargado con la cresta de luz y el sotavento en sombra)
const ventisquero = (x, y, w, h, cs) => { for (let i = -w; i <= w; i++) { const u = i / w, hh = Math.round(h * (1 - u * u) * (u > 0 ? 1 - u * 0.45 : 1)), xx = x + i; if (hh <= 0 || xx < 0 || xx > 319) continue;
  for (let j = 0; j <= hh; j++) { const yy = y - j; if (yy < 0 || yy > 179) continue; R.pset(xx, yy, j === hh ? cs[3] : u > 0.2 ? (bay(xx, yy) < 0.5 ? cs[0] : cs[1]) : (j >= hh - 1 ? cs[3] : cs[2])); }
  if (u > -0.3 && y + 1 < 180) R.pset(xx, y + 1, cs[0]); } };
// surcos del viento: rizos finos de sombra con su filo de luz encima (más largos cuanto más cerca)
const surcosV = (y0, y1, n, sem, cs, x0 = 0, x1 = 319) => { for (let k = 0; k < n; k++) { const x = Math.floor(x0 + h2(k, sem, 21) * (x1 - x0)), y = Math.floor(y0 + h2(k, sem, 22) * (y1 - y0)), L = 8 + Math.floor(h2(k, sem, 23) * 22 * (0.5 + (y - y0) / Math.max(1, y1 - y0)));
  for (let i = 0; i < L; i++) { const xx = x + i, yy = Math.round(y + Math.sin(i * 0.25 + k) * 1.5); if (xx > 319 || yy < 1 || yy > 179) break; R.pset(xx, yy, cs[0]); if (i % 3) R.pset(xx, yy - 1, cs[3]); } } };
// pisadas a lo largo de un camino (más grandes cuanto más abajo); hasta: la parte del camino ya pisada
const pisadas = (pts, cs, paso = 7, hasta = 1, y0 = 90) => { let tot = 0; const L = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  if (tot < 1) return; const n = Math.floor(tot * hasta / paso); for (let k = 0; k <= n; k++) { let s = k * paso, i = 0; while (i < L.length - 1 && s > L[i]) { s -= L[i]; i++; } const u = Math.min(1, s / L[i]), x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u;
    const dx = (pts[i + 1][0] - pts[i][0]) / L[i], dy = (pts[i + 1][1] - pts[i][1]) / L[i], lado = (k & 1) ? 1.6 : -1.6, px = Math.round(x - dy * lado), py = Math.round(y + dx * lado * 0.5), w = Math.max(1, Math.round(1 + (py - y0) / 40));
    if (px < 1 || px > 318 || py < 2 || py > 177) continue; R.rect(px - w, py, px + w, py, cs[0]); R.rect(px - w + 1, py - 1, px + w - 1, py - 1, cs[1]); R.rect(px - w, py + 1, px + w, py + 1, cs[3]); } };
// rodadas de un carro: dos surcos paralelos con el fondo en sombra y los bordes de luz
const rodadas = (pts, sep, cs) => { for (const off of [0, sep]) for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.ceil(Math.hypot(bx - ax, by - ay));
  for (let s = 0; s <= n; s++) { const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n + off); if (x < 0 || x > 319 || y < 1 || y > 178) continue; R.pset(x, y, cs[0]); R.pset(x, y - 1, cs[1]); R.pset(x, y + 1, cs[3]); } } };
// una rama caída con sus ramitas y la nieve encima; una mata seca que asoma; una piedra medio enterrada
const ramaN = (x, y, L, cs, dir = 1) => { R.linea(x, y, x + L * dir, y - Math.round(L * 0.12), hex('#3a2414')); R.linea(x, y + 1, x + L * dir, y + 1 - Math.round(L * 0.12), hex('#5a3a20'));
  for (let k = 1; k < 4; k++) { const bx = x + Math.round(L * k / 4) * dir, by = y - Math.round(L * k / 4 * 0.12); R.linea(bx, by, bx + 4 * dir, by - 4 - (k & 1) * 2, hex('#4e301c')); R.pset(bx + 4 * dir, by - 5 - (k & 1) * 2, cs[3]); }
  for (let i = 0; i <= L; i += 2) R.pset(x + i * dir, y - 1 - Math.round(i * 0.12), cs[3]); };
const mataN = (x, y, s = 1) => { for (let i = 0; i < 5; i++) R.linea(x + i, y, x + i + Math.round((i - 2) * s), y - Math.round((3 + (i & 1) * 2 + (i === 2 ? 2 : 0)) * s), i & 1 ? hex('#a88a4a') : hex('#7a5e30')); };
const piedraN = (x, y, r, cs) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#5a5a66')); R.disco(x - 1, y - 1, Math.max(0, r - 1), hex('#7a7a86')); R.rect(x - r - 1, y + 1, x + r + 1, y + r + 1, cs[2]); R.rect(x - r, y - r - 1, x + r - 1, y - r, cs[3]); R.rect(x - r + 1, y + r + 2, x + r + 2, y + r + 2, cs[0]); };
// un cubo de madera con sus aros; un caldero de hierro
const cubo = (x, yb, cs) => { R.rect(x - 5, yb - 9, x + 5, yb, K); R.rect(x - 4, yb - 8, x + 4, yb - 1, hex('#8a6a44')); R.rect(x - 4, yb - 8, x - 3, yb - 1, hex('#a8885a')); for (const y of [yb - 7, yb - 3]) R.rect(x - 4, y, x + 4, y, hex('#4a4a54')); R.rect(x - 4, yb - 9, x + 4, yb - 9, cs[3]); R.linea(x - 5, yb - 9, x, yb - 14, K); R.linea(x, yb - 14, x + 5, yb - 9, K); };
const caldero = (x, yb) => { R.disco(x, yb - 5, 6, K); R.disco(x, yb - 5, 5, hex('#2e2e38')); R.disco(x - 2, yb - 7, 2, hex('#4e4e5a')); R.rect(x - 7, yb - 10, x + 7, yb - 9, K); R.rect(x - 6, yb - 10, x + 6, yb - 10, hex('#5a5a66')); };
// una capa que va DELANTE de los personajes: se pinta una vez en su búfer (0 = transparente) y se pega dentro de su caja
const CAPA = {};
const capa = (k, caja, dibuja) => { let e = CAPA[k]; if (!e) { e = R.nuevo(); const prev = R.usar(e); dibuja(); R.usar(prev); CAPA[k] = e; }
  const [x0, y0, x1, y1] = caja, B = R.buf; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, c = e[i]; if (c) B[i] = c; } };
// la sombra grande de un personaje en la pared (la luz baja la proyecta f veces mayor desde sus pies (fx, fy), desplazada (dx, dy))
let SOMB = null;
const sombraGrande = (pinta, fx, fy, f, dx, dy, caja, col, a) => { if (!SOMB) SOMB = R.nuevo(); SOMB.fill(0); const prev = R.usar(SOMB); pinta(); R.usar(prev); const B = R.buf, [x0, y0, x1, y1] = caja;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const sx = Math.round(fx + (x - fx - dx) / f), sy = Math.round(fy + (y - fy - dy) / f); if (sx < 0 || sx > 319 || sy < 0 || sy > 179 || !SOMB[sy * 320 + sx]) continue; B[y * 320 + x] = mz(B[y * 320 + x], col, a); } };
// un personaje de espaldas: la cara se vuelve pelo (sin ojos ni boca)
const deEspaldas = (def) => ({ ...def, cab: def.cab.map((f) => f.replace(/S/g, 'H').replace(/s/g, 'h')), sinCara: true });
// un cielo de nubes de tormenta: tres capas de nubes oscuras a tres velocidades
const NUB_T = P('#10142a #1c2240 #2e3658');

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
// la loma al atardecer: rocas de verdad con nieve encima y grietas, ventisqueros, surcos del viento, las huellas de Atom
// que llegan por la izquierda, ramas, piedras medio enterradas y matas
const nieveLoma = (luzN) => fondo('loma' + luzN, () => cieloG(LUZ[luzN].cielo, 104), () => { const L = LUZ[luzN], nC = [L.nieve[1], L.nieve[2], L.nieve[3]], cR = P('#2e2a3a #463e52 #5e5468 #786c80 #948aa0'); montes(96, 54, 2.1, L.montes, 0.5);
  for (let y = 92; y < 140; y++) for (let x = 0; x < 320; x++) if (y > 95 + Math.sin(x * 0.05) * 2) R.pset(x, y, rmp(L.nieve, 0.35 + (h2(x >> 4, y >> 1, 3) - 0.5) * 0.3 + (y % 5 === 0 && h2(x >> 3, y) > 0.6 ? 0.3 : 0) + (y - 95) * 0.006, x, y));
  filaPinos(104, 14, 9, 10, 22, L.pinos); for (let k = 0; k < 9; k++) pino(Math.round(12 + k * 37 + h2(k, 4) * 14), 116 + (k % 3) * 3, 7 + (k % 4), L.pinos);
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 128 - 16 * Math.exp(-((x - 40) ** 2) / 1600) - 6 * Math.sin(x * 0.02); if (y >= top) R.pset(x, y, rmp(L.nieve, 0.55 + (h2(x >> 3, y >> 2, 6) - 0.5) * 0.3 + (Math.sin(x * 0.08 + y * 0.8) > 0.9 ? 0.25 : 0) - (y - top < 2 ? -0.3 : 0), x, y)); }
  for (const [x, y, w, h] of [[100, 150, 34, 4], [196, 170, 48, 5], [306, 138, 22, 3], [146, 178, 30, 4], [24, 174, 24, 3], [250, 146, 20, 3]]) ventisquero(x, y, w, h, L.nieve);
  surcosV(132, 178, 26, 4, L.nieve); pisadas([[-6, 170], [40, 164], [90, 158], [128, 153]], L.nieve, 7, 1, 120);
  roca(28, 138, 46, 34, 1.3, nC, cR); roca(62, 142, 26, 18, 2.9, nC, cR); roca(292, 172, 52, 38, 4.1, nC, cR); roca(256, 177, 24, 14, 5.7, nC, cR); roca(210, 128, 14, 8, 6.6, nC, cR);
  for (let k = 0; k < 18; k++) mataN(Math.floor(h2(k, 31) * 318), 136 + Math.floor(h2(k, 32) * 40), 0.8 + h2(k, 33) * 0.5);
  ramaN(66, 162, 24, L.nieve); ramaN(184, 150, 14, L.nieve, -1); ramaN(120, 176, 18, L.nieve);
  for (const [x, y, r] of [[212, 156, 2], [110, 168, 3], [238, 138, 1], [160, 142, 1], [86, 176, 2]]) piedraN(x, y, r, L.nieve);
  // un poste viejo de cerca con su alambre, medio enterrado
  for (const [x, y] of [[176, 124], [196, 126]]) { R.rect(x, y - 10, x + 2, y, K); R.rect(x + 1, y - 9, x + 1, y, hex('#6a4428')); R.rect(x, y - 11, x + 2, y - 11, L.nieve[3]); } R.linea(178, 118, 196, 120, hex('#4a4a54')); });
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

// ── 5 · la mesa de la bruja: Cynthia vuelve las cartas con la mano y la bola se enciende en «she was» ──
// la pared de tablas moradas llena: un tapiz con el ojo y la luna, manojos de hierbas colgados de la viga, un espejo redondo,
// la repisa de frascos con amuletos colgando, otra repisita con tarros y velas, una corona de flores secas y una herradura
const mesaBruja = () => fondo('bruja', () => pared(P('#1a1020 #2e1e34 #3e2a46 #4e3656')), () => {
  R.rect(140, 46, 300, 49, K); R.rect(140, 46, 300, 47, hex('#6a4428'));
  for (const [x, c, hg] of [[150, '#3a8a5a', 12], [162, '#a83a2a', 9], [174, '#3a6ac8', 14], [190, '#e8b030', 8], [204, '#7a4a8a', 11], [250, '#5a8a3a', 10], [264, '#c8c0b0', 13]]) { R.rect(x - 1, 46 - hg - 1, x + 7, 45, K); R.rect(x, 46 - hg, x + 6, 45, hex(c)); R.rect(x, 46 - hg, x + 1, 45, mz(hex(c), BL, 0.4)); R.rect(x + 1, 46 - hg - 3, x + 5, 46 - hg - 1, hex('#8a5a34')); }
  R.rect(218, 38, 236, 45, K); R.rect(219, 39, 235, 45, hex('#6a3a2a')); R.rect(219, 39, 235, 40, hex('#8a5a3a')); R.pset(227, 42, hex('#e8b030'));   // una cajita
  // el tapiz: rombos tejidos, el ojo con la luna, flecos
  for (let y = 8; y < 58; y++) for (let x = 14; x < 66; x++) { const b = x < 16 || x > 63 || y < 10 || y > 55, d = (Math.abs(x - 40) + Math.abs(y - 32)) % 12;
    R.pset(x, y, b ? hex('#c8a040') : d < 2 ? hex('#e8b030') : d < 6 ? (((x + y) & 3) ? hex('#5a2a7a') : hex('#4a1e66')) : (((x + y) & 3) ? hex('#7a2030') : hex('#6a1a2a'))); }
  R.rect(11, 6, 69, 8, hex('#6a4428')); R.rect(10, 6, 10, 9, K); R.rect(70, 6, 70, 9, K); for (let x = 15; x < 65; x += 2) R.rect(x, 58, x, 61 + (x & 2 ? 1 : 0), hex('#c8a040'));
  R.disco(40, 32, 9, hex('#f2e6c8')); R.disco(40, 32, 5, hex('#3a6ac8')); R.disco(40, 32, 2, K); R.pset(38, 30, BL); for (const s of [-1, 1]) { R.linea(31, 32, 40, 23 + (s > 0 ? 18 : 0), K); R.linea(49, 32, 40, 23 + (s > 0 ? 18 : 0), K); }
  R.disco(56, 16, 4, hex('#e8d890')); R.disco(58, 15, 3, hex('#5a2a7a'));
  // manojos de hierbas colgados de la viga
  for (const [hx, n] of [[82, 3], [104, 2], [124, 3]]) for (let k = 0; k < n; k++) { const x = hx + k * 6, L = 10 + ((k * 7) % 5); R.linea(x, 4, x, 4 + L, hex('#8a6a44')); for (let j = 0; j < 9; j++) { R.pset(x - 1 + (j & 1) * 2, 5 + L + j, j % 3 ? hex('#5a7a3a') : hex('#8a7a3a')); R.pset(x, 5 + L + j, j % 4 ? hex('#3e5a2a') : hex('#a8803a')); } R.rect(x - 1, 4 + L, x + 1, 4 + L, hex('#c8a040')); }
  // el espejo redondo con su marco de latón
  R.disco(236, 20, 13, K); R.disco(236, 20, 12, hex('#c8a040')); R.disco(236, 20, 10, hex('#a88030')); R.disco(236, 20, 9, hex('#2a2a4a')); R.disco(234, 18, 6, hex('#3a3a6a'));
  for (let k = 0; k < 5; k++) R.pset(230 + k, 14 + k, hex('#8a8ac8')); R.pset(229, 13, BL); R.linea(236, 7, 236, 3, hex('#8a6a44'));
  // amuletos que cuelgan bajo la repisa: cuentas, una media luna, una piedra
  for (const [x, L, c] of [[156, 8, '#c070ff'], [182, 12, '#3ac8a8'], [214, 6, '#e8b030'], [244, 10, '#e8303a'], [272, 7, '#c8c0b0']]) { R.linea(x, 49, x, 49 + L, hex('#a89060')); R.disco(x, 51 + L, 2, K); R.disco(x, 51 + L, 1, hex(c)); R.pset(x, 50 + L, BL); }
  // la repisita de abajo con tarros y velas gastadas, la corona de flores secas, la herradura y una estampa del sol
  R.rect(18, 88, 112, 91, K); R.rect(18, 88, 112, 89, hex('#6a4428')); for (const x of [26, 104]) R.rect(x, 92, x + 2, 97, K);
  for (const [x, c, hg] of [[22, '#7a5a3a', 9], [34, '#c8c0b0', 12], [48, '#3a6a5a', 7], [70, '#a83a2a', 10], [86, '#e8e0c8', 8], [98, '#5a3a6a', 11]]) { R.rect(x - 1, 88 - hg - 1, x + 8, 87, K); R.rect(x, 88 - hg, x + 7, 87, hex(c)); R.rect(x, 88 - hg, x + 1, 87, mz(hex(c), BL, 0.35)); R.rect(x + 1, 88 - hg - 2, x + 6, 88 - hg - 1, hex('#5a3a20')); }
  R.rect(60, 80, 63, 87, hex('#f2e6c8')); R.pset(61, 79, K);
  for (let a = 0; a < 40; a++) { const an = a / 40 * 6.283, x = Math.round(262 + Math.cos(an) * 11), y = Math.round(84 + Math.sin(an) * 11); R.pset(x, y, a % 3 ? hex('#6a7a3a') : hex('#a88a4a')); if (a % 5 === 0) { R.disco(x, y, 1, a % 10 ? hex('#c84a6a') : hex('#e8c060')); } }
  for (let a = 0; a <= 16; a++) { const an = Math.PI * (0.1 + a / 20), x = Math.round(206 + Math.cos(an) * 6), y = Math.round(78 + Math.sin(an) * 7); R.rect(x, y, x + 1, y + 1, hex('#8a8a94')); } R.pset(206, 76, K);
  R.rect(130, 72, 156, 98, K); R.rect(131, 73, 155, 97, hex('#c8a040')); R.rect(133, 75, 153, 95, hex('#2e1e34')); R.disco(143, 85, 5, hex('#e8b030')); for (let a = 0; a < 8; a++) R.pset(Math.round(143 + Math.cos(a * 0.785) * 8), Math.round(85 + Math.sin(a * 0.785) * 8), hex('#e8b030'));
  for (const [x, y] of [[176, 80], [188, 92], [168, 96]]) { R.pset(x, y, hex('#e8d890')); R.pset(x - 1, y, hex('#a89860')); R.pset(x + 1, y, hex('#a89860')); R.pset(x, y - 1, hex('#a89860')); R.pset(x, y + 1, hex('#a89860')); }
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e0e24 #34163e #4a2058 #5e2a6e'), 0.45 + 0.3 * Math.sin(x * 0.11 + Math.sin(y * 0.3) * 2) * 0.5 + (h2(x >> 1, y >> 1, 9) - 0.5) * 0.25 - (y - 104) * 0.004, x, y));
  R.rect(0, 104, 319, 104, K); for (let x = 0; x < 320; x += 3) { R.pset(x, 105, hex('#e8b030')); R.pset(x + 1, 106, hex('#c89020')); }
  R.rect(150, 132, 170, 138, K); R.rect(151, 133, 169, 137, hex('#c8a040')); R.rect(146, 138, 174, 141, K); R.rect(147, 138, 173, 140, hex('#a88030'));
  R.rect(216, 128, 236, 140, K); R.rect(217, 129, 235, 139, hex('#7a7a84')); R.rect(217, 129, 235, 130, hex('#a8a8b0')); R.rect(214, 126, 238, 128, K); R.linea(226, 122, 240, 112, K); R.linea(227, 122, 241, 112, hex('#8a8a94'));
  for (let k = 0; k < 5; k++) R.linea(30 + k * 3, 130, 36 + k * 2, 112, k & 1 ? hex('#5a7a3a') : hex('#8a9a4a')); R.rect(28, 128, 46, 132, hex('#a88a4a'));
  // un pañuelo bordado bajo las cartas y unas monedas
  for (let y = 108; y < 132; y++) for (let x = 56; x < 120; x++) { const b = y === 108 || y === 131 || x === 56 || x === 119; R.pset(x, y, b ? hex('#e8b030') : ((x + y) % 8 === 0 ? hex('#c8a040') : hex('#6a1a2a'))); }
  for (const [x, y] of [[124, 150], [130, 154], [136, 149]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#e8c060')); } });
const carta = (x, y, giro, sim, t) => { const w = Math.max(1, Math.round(7 * Math.abs(Math.cos(giro * Math.PI)))), cara = giro > 0.5;
  R.rect(x - w - 1, y - 11, x + w + 1, y + 11, K); R.rect(x - w, y - 10, x + w, y + 10, cara ? hex('#f2e6c8') : hex('#7a2030'));
  if (!cara && w > 3) { R.rect(x - w + 1, y - 9, x + w - 1, y + 9, hex('#a83a3a')); R.pset(x, y, hex('#e8b030')); R.pset(x, y - 4, hex('#e8b030')); R.pset(x, y + 4, hex('#e8b030')); }
  if (cara && w > 4) { const c = hex('#5a2a7a'); if (sim === 0) { R.disco(x, y - 2, 4, c); R.disco(x + 2, y - 3, 3, hex('#f2e6c8')); } else if (sim === 1) { R.linea(x - 4, y, x + 4, y, c); R.linea(x, y - 5, x, y + 5, c); R.linea(x - 3, y - 3, x + 3, y + 3, c); R.linea(x + 3, y - 3, x - 3, y + 3, c); } else { R.disco(x, y, 4, c); R.disco(x, y, 2, hex('#f2e6c8')); R.disco(x, y, 1, c); } R.rect(x - 4, y + 7, x + 4, y + 7, hex('#c8a040')); } };
const gatoNegro = (x, yb, t, ojos) => { const c = hex('#14101a'); R.disco(x, yb - 6, 6, c); R.rect(x - 6, yb - 6, x + 6, yb, c); R.disco(x + 3, yb - 15, 4, c); R.pset(x + 1, yb - 20, c); R.pset(x, yb - 19, c); R.pset(x + 5, yb - 20, c); R.pset(x + 6, yb - 19, c);
  const col = ojos ? hex('#c8ff6a') : hex('#6a8a3a'); if ((t * 0.4) % 3 > 0.12) { R.pset(x + 2, yb - 15, col); R.pset(x + 5, yb - 15, col); }
  for (let k = 0; k < 10; k++) { const a = Math.sin(t * 2 + k * 0.3) * 0.5; R.pset(Math.round(x - 6 - k * 0.8), Math.round(yb - 1 - k * 1.2 + Math.sin(a + k * 0.4) * k * 0.3), c); } };
const p5 = (t) => { mesaBruja(); const bola = tramo(t, @22.9, @23.4), vio = hex('#c070ff');
  velaV(262, 136, 16, t, bola > 0 ? { col: vio, llama: [hex('#f8e0ff'), hex('#c070ff'), hex('#7a2ac8')], r: 44 } : { r: 40 });
  velaV(132, 124, 10, t + 1, bola > 0 ? { col: vio, llama: [hex('#f8e0ff'), hex('#c070ff'), hex('#7a2ac8')], r: 34 } : { r: 34 });
  // las sombras de los frascos de la repisa bailan en la pared con la llama
  const fl = Math.sin(t * 13) * Math.sin(t * 4.1); for (const x of [150, 174, 204, 250]) for (let y = 50; y < 60 + Math.round(fl * 2); y++) { const xx = x + 3 + Math.round((y - 50) * 0.3 + fl); if (bay(xx, y) < 0.4) R.pset(xx, y, mz(R.pget(xx, y), hex('#0e0814'), 0.4)); }
  // el reflejo de la vela en el espejo
  R.pset(240 + Math.round(fl), 24, hex('#ffe8a0')); R.pset(241 + Math.round(fl), 23, hex('#fff4c0'));
  // Cynthia detrás de la mesa (el borde de la mesa la corta a la altura de la cintura): pasa la mano sobre las cartas y se dan la vuelta
  const gesto = t > @20.9 && t < @22.7; R.recorte([0, 0, 319, 105]); R.actor(EL.cynthiaVD, 82, 111, t, { dir: 1, dedo: gesto || (t > @23.0 && t < @23.8), sonrisa: bola > 0.5, habla: t > @23.6 && Math.sin(t * 7) > 0.3 }); R.recorte(null);
  R.disco(160, 116, 17, K); for (let y = 100; y <= 132; y++) for (let x = 144; x <= 176; x++) { const d = Math.hypot(x - 160, y - 116); if (d > 16) continue; const remol = Math.sin(Math.atan2(y - 116, x - 160) * 3 + t * 4 + d * 0.4) * 0.5 + 0.5;
    R.pset(x, y, bola > bay(x, y) * (0.6 + remol * 0.6) ? (d < 6 ? hex('#fff0ff') : remol > 0.5 ? hex('#d090ff') : hex('#8a3ad8')) : (d > 12 ? hex('#2a2a4a') : hex('#3a3a6a'))); }
  R.disco(154, 110, 2, hex('#e8e8ff')); R.pset(152, 109, BL); if (bola > 0) { luz(160, 116, 60, vio, 0.35 * bola); for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 2, r = 20 + 6 * Math.sin(t * 5 + k); R.pset(Math.round(160 + Math.cos(a) * r), Math.round(116 + Math.sin(a) * r), hex('#f0d0ff')); } }
  for (const [i, x] of [[0, 70], [1, 88], [2, 106]]) { const g = tramo(t, @21.0 + i * 0.55, @21.3 + i * 0.55); carta(x, 120, g, i, t); if (g > 0 && g < 1) for (let k = 0; k < 4; k++) R.pset(x + Math.round(Math.cos(t * 9 + k * 1.6) * 9), 120 + Math.round(Math.sin(t * 9 + k * 1.6) * 12), hex('#e8c8ff')); }
  gatoNegro(22, 150, t, bola > 0); T.AT.atom(R, 210, 168, t, { pose: bola > 0 ? 'quieto' : 'piensa', dir: -1, cara: bola > 0.5 ? 'sorpresa' : 'normal' }); };

// ── 6 · el barón y sus soldados en el campamento, al atardecer: Cynthia da unos pasos y se pone delante de los suyos con
// los brazos abiertos; al fondo los romaníes dejan lo que hacen; las gallinas huyen en «animals» ──
const gallina = (x, yb, t, corre, dir = 1) => { const c = hex('#f0e8d8'), cS = hex('#c8b8a0'), f = corre ? Math.floor(t * 12 + x) % 2 : 0, X = (i) => Math.round(x + i * dir);
  R.rect(Math.min(X(-3), X(3)), yb - 6, Math.max(X(-3), X(3)), yb - 3, c); R.rect(Math.min(X(-3), X(0)), yb - 4, Math.max(X(-3), X(0)), yb - 3, cS); R.rect(Math.min(X(2), X(4)), yb - 9, Math.max(X(2), X(4)), yb - 6, c);
  R.pset(X(5), yb - 8, hex('#e8a030')); R.pset(X(3), yb - 10, hex('#e8303a')); R.pset(X(3), yb - 8, K); R.pset(X(-4), yb - 7, cS); R.pset(X(f ? -1 : 0), yb - 2, hex('#e8a030')); R.pset(X(f ? 1 : 2), yb - 2, hex('#e8a030')); R.pset(X(f ? -1 : 0), yb - 1, hex('#e8a030')); R.pset(X(f ? 1 : 2), yb - 1, hex('#e8a030')); };
const p6 = (t) => { const m = exterior('tendal', 'tarde', (L) => { carroS(-30, 134, 92, { ventana: hex('#ffc860'), cs: P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a') });
    R.linea(100, 96, 230, 100, hex('#4e301c')); R.linea(100, 96, 100, 134, hex('#4e301c')); R.linea(101, 96, 101, 134, hex('#6a4428')); R.linea(230, 100, 230, 134, hex('#4e301c')); R.linea(231, 100, 231, 134, hex('#6a4428'));
    R.rect(256, 120, 296, 132, K); R.rect(257, 121, 295, 131, hex('#7a4a2a')); for (let k = 0; k < 5; k++) R.disco(262 + k * 7, 118, 3, hex('#a83a2a')); R.disco(266, 134, 5, K); R.disco(266, 134, 4, hex('#c89a30')); R.disco(288, 134, 5, K); R.disco(288, 134, 4, hex('#c89a30'));
    // el suelo pisado: rodadas del carromato y del carro de manzanas, pisadas que van y vienen, ventisqueros y surcos
    rodadas([[30, 140], [110, 152], [200, 166], [330, 176]], 6, L.nieve); rodadas([[262, 136], [276, 152], [296, 178]], 4, L.nieve);
    pisadas([[64, 150], [110, 145], [160, 150], [232, 140]], L.nieve, 6, 1, 110); pisadas([[16, 178], [66, 165], [98, 156]], L.nieve, 7, 1, 110); pisadas([[180, 178], [196, 160], [214, 146]], L.nieve, 6, 1, 110);
    ventisquero(150, 178, 40, 4, L.nieve); ventisquero(304, 160, 22, 3, L.nieve); ventisquero(84, 172, 20, 3, L.nieve); ventisquero(222, 140, 18, 2, L.nieve); surcosV(140, 178, 16, 9, L.nieve);
    // el fuego de la comida apagado: el caldero en su trípode, cacharros, un cubo, la tina de lavar y una carretilla
    for (let k = 0; k < 7; k++) { R.disco(168 + k * 3, 143 + (k & 1), 1, hex('#5a5a66')); } R.linea(168, 143, 176, 124, K); R.linea(184, 143, 176, 124, K); R.linea(176, 124, 176, 130, K); caldero(176, 140);
    for (const [x, c] of [[90, '#8a5a34'], [97, '#5a5a66']]) { R.rect(x - 3, 137, x + 3, 141, K); R.rect(x - 2, 138, x + 2, 140, hex(c)); R.pset(x - 2, 138, hex('#c8c0b0')); }
    cubo(214, 172, L.nieve); cubo(52, 158, L.nieve);
    for (let x = 120; x < 140; x++) { const y0 = 168 - Math.round(Math.sin((x - 120) / 20 * Math.PI) * 0); R.rect(x, y0, x, y0 + 7, (x === 120 || x === 139) ? K : (x & 3) ? hex('#8a6a44') : hex('#6a4a2a')); } R.rect(120, 167, 139, 167, K); R.rect(121, 168, 138, 168, L.nieve[3]); R.rect(120, 171, 139, 171, hex('#4a4a54'));
    for (const x of [242, 248]) R.rect(x, 162, x + 1, 172, hex('#6a4428')); R.rect(238, 158, 256, 162, K); R.rect(239, 159, 255, 161, hex('#8a6a44')); R.disco(236, 168, 4, K); R.disco(236, 168, 3, hex('#7a5a34'));
    for (const [x, y] of [[40, 146], [74, 176], [160, 176], [226, 154], [300, 146], [140, 140]]) mataN(x, y);
    ramaN(186, 176, 16, L.nieve); piedraN(64, 172, 2, L.nieve); piedraN(286, 168, 3, L.nieve); }, { sem: 4 });
  vidaExt(m, t, 'tarde', { nubes: [[40, 30, 44, 2], [190, 50, 34, 3.2], [250, 20, 52, 1.4], [110, 66, 28, 4.4]], copos: 10 });
  humo(-30 + 66 + 3, 70, t, 5, [hex('#c8a8b8'), hex('#a888a0')], 30, 8);
  for (let k = 0; k < 6; k++) { const x = 112 + k * 20, y = Math.round(97 + (k * 20 + 12) * 0.03), on = Math.sin(t * 3 + k) * 2, col = hex(['#a83a2a', '#3a6ac8', '#e8b030', '#2e7a3e', '#7a4a8a', '#f2e6c8'][k]);
    R.rect(x, y + 1, x + 10, y + 12 + Math.round(on), K); R.rect(x + 1, y + 1, x + 9 + Math.round(on * 0.5), y + 11 + Math.round(on), col); R.rect(x + 2, y, x + 3, y + 2, hex('#c8a060')); }
  // al fondo: él tiende la ropa y ella coge manzanas del carro; al llegar el barón lo dejan y miran
  const llega = t > @25.4; R.actor(EL.romaniVD, 150, 134, t, { dir: llega ? 1 : -1, brazos: !llega && Math.sin(t * 3) > -0.2, sorpresa: llega && t < @27.4, triste: t > @27.4 });
  R.actor(EL.romaniMujerVD, 240, 134, t, { dir: llega ? -1 : 1, sostiene: llega ? false : [256, 120], sorpresa: llega && t < @27.0, triste: t > @27.0 });
  // los suyos, detrás de ella: la abuela, el niño y un hombre
  R.actor(EL.romaniMujerVD, 20, 152, t, { dir: 1, pal: { C: hex('#5a3a6a'), c: hex('#3e2a4e'), H: hex('#c8c8d0') }, triste: t > @27.6 });
  R.actor(EL.victorNinoVD, 40, 153, t, { dir: 1, pal: { C: hex('#7a5a3a'), c: hex('#5a4028') }, sorpresa: t > @27.6 });
  R.actor(EL.romaniVD, 92, 148, t, { dir: 1, pal: { C: hex('#3a5a7a'), c: hex('#2a4a6a') }, enfado: t > @28.0 });
  const pasa = tramo(t, @25.7, @26.8), cx = Math.round(lerp(62, 124, pasa));
  R.actor(EL.cynthiaVD, cx, 152, t, { dir: 1, anda: pasa > 0 && pasa < 1, brazos: pasa >= 1 && t < @29.8, enfado: t > @25.6, habla: t > @29.8 && Math.sin(t * 7) > 0 });
  const v = tramo(t, @24.5, @27.4);
  R.actor(EL.baronVD, Math.round(lerp(330, 198, v)), 152, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > @27.6, enfado: t > @27.6 });
  R.actor(EL.soldadoVD, Math.round(lerp(352, 226, v)), 154, t, { dir: -1, anda: v > 0 && v < 1 }); R.actor(EL.soldadoVD, Math.round(lerp(372, 250, v)), 151, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > @28.8 });
  barril(20, 176); lena(270, 178, 6); tajo(296, 172);
  const g = tramo(t, @29.2, @30.1);
  for (const [i, gx, gy, d] of [[0, 150, 160, -1], [1, 168, 166, 1], [2, 138, 168, -1]]) { const x = Math.round(gx + d * g * (50 + i * 16)), sal = g > 0 && g < 1 ? Math.round(Math.abs(Math.sin(t * 14 + i)) * 3) : 0; gallina(x, gy - sal, t + i, g > 0 && g < 1, g > 0 ? d : (i & 1 ? 1 : -1));
    if (g > 0 && g < 0.6) for (let k = 0; k < 2; k++) R.pset(x - d * (4 + k * 3), gy - 12 + k * 2, BL); } };

// ── 7 · de noche, la hoguera de cerca (cámara baja, fondo local): a la izquierda, cortado, el carromato de la luz morada; la mano roja
// sube del fuego, Cynthia se acerca y la toca en «deal»; la mano se cierra y se apaga, y el fuego vuelve a ser naranja ──
const hogueraBG = () => fondo('hoguera', () => cieloG(LUZ.noche.cielo, 100), () => { const L = LUZ.noche;
  montes(96, 46, 5.5, L.montes, 0.5); filaPinos(106, 26, 41, 10, 22, L.pinos); sueloNieve(102, L.nieve, 12, { piedras: 5, matas: 10, ramas: 3 });
  for (let k = 0; k < 6; k++) pino(Math.round(8 + k * 26 + h2(k, 3) * 8), 114 + (k & 1) * 2, 16 + (k % 3) * 4, L.pinos);
  // al fondo, otro carromato pequeño con su ventana y un tendedero
  R.rect(244, 108, 280, 118, K); R.rect(245, 109, 279, 117, hex('#2a3a2e')); for (let x = 245; x < 280; x += 4) R.rect(x, 109, x, 117, hex('#1e2a22')); for (let x = 242; x <= 282; x++) { const top = Math.round(108 - 6 * Math.sin(Math.PI * (x - 242) / 40)); R.rect(x, top, x, 107, x === 242 || x === 282 ? K : hex('#4a5a6a')); R.pset(x, top, hex('#9aa4c8')); }
  R.rect(256, 111, 261, 115, hex('#ffc860')); R.disco(250, 119, 3, K); R.disco(274, 119, 3, K);
  carroS(-22, 150, 104, { ventana: hex('#3a1a4a'), cs: P('#1e2a4a #2a3a6a #3a4a8a #5a6aa8') });
  surcosV(150, 178, 14, 12, L.nieve); pisadas([[310, 178], [270, 170], [238, 164]], L.nieve, 7, 1, 110); pisadas([[90, 178], [120, 166], [150, 160]], L.nieve, 7, 1, 110);
  ventisquero(40, 180, 60, 9, L.nieve); ventisquero(300, 150, 26, 3, L.nieve); ventisquero(120, 178, 30, 4, L.nieve);
  // el tronco para sentarse, con su nieve; la leña apilada; el caldero
  R.rect(246, 164, 312, 174, K); for (let x = 247; x < 312; x++) for (let y = 165; y < 174; y++) R.pset(x, y, rmp(P('#2a1810 #4e301c #6a4428 #8a5a34'), 0.5 + (y < 167 ? 0.3 : y > 171 ? -0.3 : 0) + (Math.sin(x * 0.9 + y) > 0.8 ? -0.25 : 0), x, y));
  R.disco(246, 169, 5, K); R.disco(246, 169, 4, hex('#c8a070')); R.anillo(246, 169, 2, hex('#8a6a44')); R.rect(250, 162, 310, 164, L.nieve[3]); R.rect(254, 162, 304, 162, L.nieve[2]);
  lena(96, 178, 5); caldero(122, 158); });
// la hoguera grande: troncos cruzados con brasas y llamas en capas (rojo 0–1: las llamas se vuelven rojas)
const fuegoGrande = (cx, cy, t, s, rojo = 0) => {
  for (const [a, b, c, d] of [[-18, 3, 16, -6], [-16, -6, 18, 3], [-8, 4, 10, -8]]) { R.linea(cx + a, cy + b, cx + c, cy + d, K); R.linea(cx + a, cy + b - 1, cx + c, cy + d - 1, hex('#4e301c')); R.linea(cx + a, cy + b - 2, cx + c, cy + d - 2, hex('#6a4428')); R.linea(cx + a, cy + b + 1, cx + c, cy + d + 1, K); }
  for (let k = 0; k < 14; k++) { const x = cx - 14 + Math.round(h2(k, 3) * 28), y = cy - 2 + Math.round(h2(k, 4) * 5); R.pset(x, y, Math.sin(t * 7 + k) > 0 ? hex('#ffb030') : hex('#e85a20')); }
  for (let k = 0; k < 5; k++) llama(cx - 12 + k * 6, cy - 2, t + k * 0.37, s * (0.85 + 0.25 * Math.sin(t * 3.1 + k * 1.7)) * (k === 2 ? 1.25 : 1));
  if (rojo > 0) for (let k = 0; k < 9; k++) { const u = ((t * 1.4 + k / 9) % 1), x = Math.round(cx + Math.sin(t * 8 + k * 2) * 8 * (1 - u)), y = Math.round(cy - 4 - u * 22 * s); if (bay(x, y) < rojo) R.disco(x, y, Math.max(0, Math.round((1 - u) * 3)), u < 0.4 ? hex('#ff6a4a') : hex('#c81a1a')); } };
const p7 = (t) => { const m = hogueraBG(); vidaExt(m, t, 'noche', { luna: 64, nubes: [[20, 40, 40, 1.4], [150, 62, 30, 2.6], [230, 30, 50, 1], [90, 20, 34, 3.6]], copos: 14 });
  const sube = tramo(t, @30.5, @31.6), cierra = tramo(t, @33.7, @34.4), apaga = tramo(t, @34.4, @35.3), roja = Math.min(1, sube * 1.3) * (1 - apaga);
  // el carromato de la bruja: la ventana morada que late y el humo de su chimenea
  const vp = 0.5 + 0.5 * Math.sin(t * 3); luz(17, 119, 34, hex('#b05aff'), 0.25 + 0.15 * vp); R.rect(11, 114, 22, 125, vp > 0.5 ? hex('#c88aff') : hex('#9a5ad8')); R.rect(16, 114, 17, 125, hex('#7a5a2a')); R.rect(11, 119, 22, 120, hex('#7a5a2a'));
  humo(54, 84, t, 6, [hex('#3a4466'), hex('#2a3048')], 34, 10);
  // la luz del fuego en la nieve, que tiembla (y se vuelve roja mientras está la mano)
  const fl = Math.sin(t * 11) * Math.sin(t * 3.7); luz(176, 150, 84 + fl * 4, roja > 0.3 ? hex('#ff4a3a') : hex('#ff9a40'), 0.3 + 0.05 * fl, 0.62);
  for (let k = 0; k < 16; k++) { const x = Math.round(176 + Math.cos(k / 16 * 6.283) * 32), y = Math.round(162 + Math.sin(k / 16 * 6.283) * 6); if (y > 162) continue; R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#5a5a66')); R.pset(x - 1, y - 1, hex('#9a8a84')); }
  fuegoGrande(176, 160, t, 2.1, roja);
  for (let k = 0; k < 16; k++) { const x = Math.round(176 + Math.cos(k / 16 * 6.283) * 32), y = Math.round(162 + Math.sin(k / 16 * 6.283) * 6); if (y <= 162) continue; R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#6a6a76')); R.pset(x - 1, y - 1, hex('#b8a090')); }
  for (let k = 0; k < 14; k++) { const u = ((t * 0.55 + k / 14) % 1), x = Math.round(176 + Math.sin(k * 2.3 + t * 1.5) * 14 * u + (h2(k, 5) - 0.5) * 22), y = Math.round(144 - u * 96); if (x > 274 && y < 48) continue; if (u < 0.85) R.pset(x, y, u < 0.4 ? hex('#fff0a0') : roja > 0.3 ? hex('#ff5a3a') : hex('#ffb030')); }
  // la mano de luz roja que sube del fuego y se inclina hacia ella
  const hx = Math.round(lerp(176, 186, sube)), hy = Math.round(lerp(150, 104, sube)); manoRoja(hx, hy, 2.4, cierra, roja, t);
  const ac = tramo(t, @31.0, @31.7), cx = Math.round(lerp(232, 206, ac)), toca = t > @31.8 && t < @33.0;
  R.actor(EL.cynthiaVD, cx, 166, t, { dir: -1, anda: ac > 0 && ac < 1, dedo: toca, sorpresa: t > @32.6 && t < @33.7, triste: t > @34.6 });
  if (toca && Math.floor(t * 10) % 2) { const sx = 205, sy = 130; R.pset(sx, sy, BL); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-2, -2], [2, 2], [2, -2], [-2, 2]]) R.pset(sx + dx, sy + dy, hex('#ffb090')); luz(sx, sy, 10, hex('#ff8a6a'), 0.4); }
  if (apaga > 0 && apaga < 1) humo(186, 106, t, 6, [hex('#5a3a3a'), hex('#3a2a30')], 26, 4);
  T.AT.luciernaga(R, 112, Math.round(100 + Math.sin(t * 2.4) * 3), t, { cara: sube > 0.5 && apaga < 1 ? 'sorpresa' : 'normal', dir: 1 });
  copos(t, 10, 33, -10, 14, [BL, hex('#a8b4c8')], 0, 319, 120, 179); };

// ── 8 · el trono del infierno: la mano de Mefisto; un pergamino se enciende y se sella ──
const p8 = (t) => { const o = { encuadre: 'trono', mefisto: tramo(t, @35.7, @36.7), contratos: 0 }; T.infierno(R, t, o); T.infiernoDelante(R, t, o);
  const ar = tramo(t, @37.6, @38.0), sello = tramo(t, @39.2, @39.5); if (ar > 0) { const [x, y] = [92, 100]; for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283; if ((k + Math.floor(t * 8)) % 2) R.pset(Math.round(x + Math.cos(a) * (9 + ar * 2)), Math.round(y - 6 + Math.sin(a) * (11 + ar * 2)), hex('#ff5a3a')); } luz(x, y - 6, 18, hex('#ff3a2a'), 0.4 * ar); }
  if (sello > 0) { const r = Math.round(2 + 4 * (1 - sello)); R.disco(96, 104, r + 1, K); R.disco(96, 104, r, hex('#c81a1a')); R.pset(95, 103, hex('#ff8a8a')); } };

// ── 9 · la cuna con el chal de Cynthia: Werner entra, la coge del borde y la mece; una lucecita sale de la cuna, cruza el
// cuarto y se va por la ventana en «soul» ──
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
// la cuna grande de madera sobre sus balancines (se mece alrededor del punto de apoyo); el bebé dormido bajo la manta
// y el chal morado de Cynthia con su fleco por encima. Devuelve el borde que coge Werner y la cabecita
const cunaG = (cx, yb, t, mece) => { const an = Math.sin(t * 1.9) * 0.05 * mece, ca = Math.cos(an), sa = Math.sin(an);
  const Rt = (i, j) => [Math.round(cx + i * ca - j * sa), Math.round(yb + i * sa + j * ca)], px = (i, j, c) => { const [x, y] = Rt(i, j); R.pset(x, y, c); };
  for (let i = -30; i <= 30; i += 0.5) { const j = -(i * i) / 130; px(i, j, K); px(i, j - 1, hex('#8a5a34')); px(i, j - 2, hex('#6a4428')); px(i, j - 3, K); }
  for (const i of [-17, -16, 16, 17]) for (let j = -7; j <= -3; j++) px(i, j - (i * i) / 130, i === -17 || i === 17 ? K : hex('#4e301c'));
  for (let i = -24; i <= 24; i += 0.5) for (let j = -26; j <= -6; j += 0.5) { const borde = Math.abs(i) > 23.4 || j < -25.4 || j > -6.6, listo = Math.round(i + 24) % 5 === 0;
    px(i, j, borde ? K : j < -23 ? hex('#a87a4a') : j > -9 ? hex('#5a3a20') : listo ? hex('#4e301c') : (Math.round(i * 2) % 10 === 1 ? hex('#a87a4a') : hex('#8a5a34'))); }
  for (let i = -27; i <= -22; i += 0.5) for (let j = -40; j <= -6; j += 0.5) { const top = -36 - Math.round(Math.sqrt(Math.max(0, 9 - (i + 24.5) ** 2))); if (j < top) continue; px(i, j, i < -26.6 || i > -22.4 || j < top + 0.6 ? K : i < -25 ? hex('#a87a4a') : hex('#7a4a2a')); }
  for (let i = 22; i <= 27; i += 0.5) for (let j = -32; j <= -6; j += 0.5) px(i, j, i < 22.4 || i > 26.6 || j < -31.4 ? K : i < 24 ? hex('#a87a4a') : hex('#6a4428'));
  R.poligono([Rt(-12, -28), Rt(21, -28), Rt(21, -24), Rt(-12, -24)], hex('#c8c0d8')); for (let i = -10; i < 20; i += 3) px(i, -26, hex('#8a84a8')); for (let i = -12; i <= 21; i++) px(i, -29, K);
  const [bx, by] = Rt(-16, -28); R.rect(bx - 4, by - 4, bx + 4, by + 2, K); R.rect(bx - 3, by - 3, bx + 3, by + 1, hex('#f4f0e6')); R.rect(bx - 1, by - 2, bx + 2, by, hex('#e8b890')); R.pset(bx + 1, by - 1, K); R.pset(bx - 1, by - 1, K);
  for (let i = 2; i <= 20; i++) { const caida = Math.round((i - 2) * 0.9); for (let j = -29; j <= -29 + 12 + caida * 0; j++) { if (j > -18 + Math.round(Math.sin(i * 0.7) * 2)) break; px(i, j, (i + j) % 5 === 0 ? hex('#7a3a9a') : hex('#5a2a7a')); } px(i, -17 + Math.round(Math.sin(i * 0.7) * 2), i & 1 ? hex('#c8a040') : hex('#3a1a4a')); px(i, -16 + Math.round(Math.sin(i * 0.7) * 2), i & 1 ? hex('#c8a040') : K); }
  return { borde: Rt(25, -20), cabeza: [bx, by - 2] }; };
const p9 = (t) => { cunaBG(); copos(t, 10, 12, -5, 10, [BL, hex('#a8b4c8')], 200, 240, 26, 56); velaV(95, 131, 9, t, { r: 46 });
  const llega = tramo(t, @40.4, @42.0), wx = Math.round(lerp(304, 180, llega)), coge = llega >= 1 && t < @44.7, mece = tramo(t, @42.0, @42.5) * (1 - tramo(t, @44.7, @45.4) * 0.7);
  luz(150, 132, 40, hex('#ffc860'), 0.16);
  const c = cunaG(150, 156, t, 1 + 3 * mece);
  R.actor(EL.wernerVD, wx, 156, t, { dir: t > @44.7 ? 1 : -1, anda: llega > 0 && llega < 1, sostiene: coge ? [c.borde[0] + 1, c.borde[1]] : false, triste: true });
  const al = tramo(t, @43.6, @45.4); if (al > 0 && al < 1) { const [hx, hy] = c.cabeza, P2 = (u) => [Math.round(lerp(hx, 220, u) + Math.sin(u * 7) * 12 * (1 - u)), Math.round(lerp(hy - 4, 46, u) - Math.sin(u * Math.PI) * 26)];
    for (let k = 6; k >= 1; k--) { const u = Math.max(0, al - k * 0.03); if (u <= 0) continue; const [x, y] = P2(u); if (Math.sin(t * 20 + k) > -0.3) R.pset(x, y, k < 3 ? hex('#fff4d0') : hex('#c8b890')); }
    const [x, y] = P2(al); luz(x, y, 20, hex('#fff4d0'), 0.45); R.disco(x, y, 3, hex('#fff4d0')); R.disco(x, y, 2, BL); R.pset(x, y, hex('#fffbe8')); }
  if (t > @44.9) luz(232, 60, 14, hex('#ff3a2a'), 0.35 * tramo(t, @44.9, @45.4));
  T.AT.luciernaga(R, 60, Math.round(118 + Math.sin(t * 2) * 2), t, { cara: 'triste', dir: 1, brillo: 0.6 }); };

// ── 10 · la alcoba: la baronesa enferma; el barón entra, va hasta la cama, la mira, se va a la ventana y manda al soldado ──
const p10 = (t) => { const o = { encuadre: 'baron', camara: 'alcoba', velas: 0.05 }; T.latveria(R, t, o);
  const a1 = tramo(t, @45.8, @47.3), a2 = tramo(t, @48.1, @49.2), x = Math.round(a2 > 0 ? lerp(140, 104, a2) : lerp(70, 140, a1)), anda = (a1 > 0 && a1 < 1) || (a2 > 0 && a2 < 1);
  R.actor(EL.baronVD, x, 150, t, { dir: a2 > 0 ? -1 : 1, anda, triste: t < @49.4, dedo: t > @49.6 && t < @50.8, enfado: t > @49.6 });
  const s = tramo(t, @50.3, @51.2); R.actor(EL.soldadoVD, Math.round(lerp(50, 20, s)), 150, t, { dir: s > 0 ? -1 : 1, anda: s > 0 && s < 1 });
  if (t > @47.9 && t < @48.8) { R.pset(222, 116, BL); R.pset(224, 114, BL); } T.latveriaDelante(R, t, o); };

// ── 11 · de día, la puerta del carromato de Werner de cerca (fondo local, el carromato visto de frente con su escalerita):
// llega el soldado con el caballo de la rienda; Werner abre, baja con su bolsa y se va con él; Victor le dice adiós desde la puerta ──
const bolsa = (x, y) => { R.rect(x - 5, y - 2, x + 5, y + 6, K); R.rect(x - 4, y - 1, x + 4, y + 5, hex('#5a3420')); R.rect(x - 4, y - 1, x + 4, y, hex('#7a4a2a')); R.rect(x - 2, y - 4, x + 2, y - 3, K); R.pset(x, y + 2, hex('#e8b030')); };
const VARDO = { x0: 130, x1: 190, y0: 86, y1: 138, px0: 150, px1: 170, py0: 98 };
const vardoBG = () => fondo('vardo', () => cieloG(LUZ.dia.cielo, 104), () => { const L = LUZ.dia, V = VARDO, rojo = P('#4e1e1a #7a2a22 #a8382a #c8503a'), roL = P('#6a2a22 #a8382a #c8503a #e07050');
  montes(100, 44, 2.7, L.montes, 0.5); sueloNieve(102, L.nieve, 15, { piedras: 6, matas: 12, ramas: 4 }); filaPinos(110, 22, 51, 9, 18, L.pinos);
  for (let k = 0; k < 5; k++) pino(Math.round(220 + k * 22 + h2(k, 9) * 8), 120 + (k & 1) * 3, 14 + (k % 3) * 4, L.pinos);
  carroS(-24, 128, 70, { ventana: hex('#8ac0f0'), cs: P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a') });
  // el suelo de delante: rodadas, huellas de cascos y de botas, ventisqueros
  rodadas([[60, 150], [110, 156], [200, 166], [330, 172]], 7, L.nieve); pisadas([[330, 156], [280, 154], [240, 152]], L.nieve, 6, 1, 110); pisadas([[160, 156], [178, 172], [190, 180]], L.nieve, 6, 1, 110);
  for (let k = 0; k < 9; k++) { const x = 318 - k * 10, y = 160 + (k & 1) * 3; R.pset(x - 1, y, L.nieve[0]); R.pset(x + 1, y, L.nieve[0]); R.pset(x - 1, y - 1, L.nieve[0]); R.pset(x + 1, y - 1, L.nieve[0]); R.pset(x, y + 1, L.nieve[0]); }
  ventisquero(40, 176, 34, 4, L.nieve); ventisquero(270, 178, 40, 4, L.nieve); ventisquero(214, 140, 18, 2, L.nieve); surcosV(150, 178, 14, 23, L.nieve);
  // el lado del carromato, que se va hacia atrás (con la luz del sol por la izquierda)
  for (let x = 78; x < V.x0; x++) { const u = (x - 78) / (V.x0 - 78), top = Math.round(lerp(96, V.y0 + 2, u)), bot = Math.round(lerp(130, V.y1, u)), tabla = Math.floor((x - 78) / 5);
    for (let y = top; y <= bot; y++) R.pset(x, y, (x - 78) % 5 === 0 ? roL[0] : y < top + 2 || y > bot - 2 ? hex('#e8b030') : rmp(roL, 0.55 + (h2(tabla, y >> 2) - 0.5) * 0.3 + (Math.sin(y * 0.4 + tabla) > 0.85 ? -0.3 : 0), x, y));
    const rtop = Math.round(lerp(80, V.y0 - 20, u)); for (let y = rtop; y < top; y++) R.pset(x, y, y < rtop + 3 ? (y === rtop ? K : hex('#f4f8ff')) : rmp(P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a'), 0.6 + (x % 6 === 0 ? -0.3 : 0), x, y)); R.pset(x, top, K); R.pset(x, bot + 1, K); }
  R.rect(100, 104, 112, 114, K); R.rect(101, 105, 111, 113, hex('#8ac0f0')); R.rect(106, 105, 106, 113, hex('#7a5a2a')); R.rect(101, 109, 111, 109, hex('#7a5a2a')); R.rect(101, 105, 103, 113, hex('#f4f0e6'));
  for (const wx of [92, 120]) { for (let a = 0; a < 60; a++) { const an = a / 60 * 6.283; R.pset(Math.round(wx + Math.cos(an) * 5), Math.round(140 + Math.sin(an) * 10), K); R.pset(Math.round(wx + Math.cos(an) * 4), Math.round(140 + Math.sin(an) * 9), hex('#c89a30')); } for (let a = 0; a < 6; a++) R.linea(wx, 140, Math.round(wx + Math.cos(a * 1.05) * 3), Math.round(140 + Math.sin(a * 1.05) * 8), hex('#e8b030')); R.disco(wx, 140, 1, hex('#e8b030')); }
  // el frente: tablas pintadas con volutas y flores, dos ventanitas con visillos, el tejadillo y el techo en arco nevado
  tablas(V.x0, V.y0, V.x1, V.y1, rojo, 6, 13); R.rect(V.x0, V.y0, V.x1, V.y0 + 2, hex('#e8b030')); R.rect(V.x0, V.y1 - 2, V.x1, V.y1, hex('#e8b030')); R.rect(V.x0 - 1, V.y0, V.x0 - 1, V.y1, K); R.rect(V.x1 + 1, V.y0, V.x1 + 1, V.y1, K);
  for (let x = V.x0 - 6; x <= V.x1 + 6; x++) { const d = (x - 160) / 36, top = Math.round(V.y0 - 4 - 22 * Math.sqrt(Math.max(0, 1 - d * d))); for (let y = top; y < V.y0 - 3; y++) R.pset(x, y, y === top ? K : y < top + 4 ? (bay(x, y) < 0.8 ? hex('#ffffff') : hex('#e8ecf4')) : rmp(P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a'), 0.55 + (Math.abs(x - 160) % 9 === 0 ? -0.3 : 0) - (y - top) * 0.01, x, y)); }
  R.rect(V.x0 - 8, V.y0 - 4, V.x1 + 8, V.y0 - 1, K); R.rect(V.x0 - 7, V.y0 - 3, V.x1 + 7, V.y0 - 2, hex('#e8b030')); for (let x = V.x0 - 6; x <= V.x1 + 6; x += 4) { R.rect(x, V.y0, x, V.y0 + 2 + (x % 8 === 0 ? 3 : 1), hex('#e8ecf4')); }
  for (const s of [-1, 1]) { const bx = s < 0 ? V.x0 - 6 : V.x1 + 6; R.linea(bx, V.y0 - 1, bx - s * 4, V.y0 + 10, K); R.linea(bx + (s < 0 ? 1 : -1), V.y0 - 1, bx - s * 4 + (s < 0 ? 1 : -1), V.y0 + 10, hex('#e8b030')); }
  for (const [wx0, wx1] of [[134, 146], [174, 186]]) { R.rect(wx0 - 1, 99, wx1 + 1, 115, K); R.rect(wx0, 100, wx1, 114, hex('#ffd880')); R.rect(wx0, 100, wx1, 101, hex('#e8b030')); for (let y = 102; y < 114; y += 2) for (let x = wx0; x <= wx1; x += 2) R.pset(x + ((y >> 1) & 1), y, hex('#f4f0e6')); R.rect(wx0 - 2, 116, wx1 + 2, 117, hex('#6a4428')); R.disco(wx0 + 3, 114, 2, hex('#a83a2a')); R.pset(wx0 + 3, 111, hex('#2e7a3e')); }
  for (const s of [-1, 1]) for (let k = 0; k < 10; k++) { const a = k * 0.6, x = Math.round(160 + s * (14 + Math.cos(a) * 3)), y = Math.round(122 + k * 1.5 + Math.sin(a) * 2); R.pset(x, y, hex('#e8b030')); }
  for (const [x, y, c] of [[137, 126, '#2e7a3e'], [183, 126, '#2e7a3e'], [140, 130, '#e8e0c8'], [180, 130, '#e8e0c8']]) { R.disco(x, y, 2, hex(c)); R.pset(x, y, hex('#e8b030')); }
  R.rect(V.px0 - 2, V.py0 - 4, V.px1 + 2, V.y1, K); for (let y = V.py0 - 4; y < V.py0 + 4; y++) for (let x = V.px0 - 2; x <= V.px1 + 2; x++) if (Math.hypot(x - 160, y - (V.py0 + 4)) > 12 && y < V.py0 + 4) R.pset(x, y, rmp(rojo, 0.55, x, y));
  R.rect(V.x0, V.y1 + 1, V.x1, V.y1 + 4, K); R.rect(V.x0 + 4, V.y1 + 1, V.x1 - 4, V.y1 + 2, hex('#2a1810'));
  // la escalerita de tres peldaños y las varas del tiro apoyadas en la nieve
  for (let k = 0; k < 3; k++) { const y = V.y1 + 1 + k * 5, x0 = V.px0 - 3 - k * 3, x1 = V.px1 + 3 + k * 3; R.rect(x0 - 1, y, x1 + 1, y + 4, K); R.rect(x0, y + 1, x1, y + 3, hex('#6a4428')); R.rect(x0, y + 1, x1, y + 1, hex('#a87a4a')); R.rect(x0, y + 1, x1, y + 1, L.nieve[3]); R.pset(x0 + 3, y + 2, hex('#8a5a34')); }
  for (const [a, b] of [[[138, 142], [114, 178]], [[182, 142], [206, 178]]]) { R.linea(a[0], a[1], b[0], b[1], K); R.linea(a[0] + 1, a[1], b[0] + 1, b[1], hex('#8a5a34')); R.linea(a[0] + 2, a[1], b[0] + 2, b[1], K); }
  // el farol del gancho, el cubo y la leña
  R.linea(196, 88, 202, 88, K); R.linea(202, 88, 202, 94, K); R.rect(199, 94, 205, 102, K); R.rect(200, 95, 204, 101, hex('#f4e8b0')); R.rect(199, 102, 205, 103, hex('#4a4a54'));
  R.rect(176, 52, 179, 66, K); R.rect(177, 53, 178, 65, hex('#4a4a54')); R.rect(175, 51, 180, 52, hex('#f4f8ff'));
  cubo(228, 150, L.nieve); lena(250, 166, 5); barril(66, 152); });
const p11 = (t) => { const m = vardoBG(); vidaExt(m, t, 'dia', { copos: 0, nubes: [[20, 30, 46, 2], [150, 50, 36, 3.5], [240, 22, 54, 1.2], [90, 70, 28, 5]] }); humo(178, 52, t, 6, [hex('#e8ecf4'), hex('#c8d0e0')], 24, 6);
  const V = VARDO, abre = tramo(t, @52.0, @52.4);
  // el hueco de la puerta: dentro, la luz cálida del carromato, una repisa y la lámpara; la hoja se abre hacia fuera
  for (let y = V.py0 - 6; y <= V.y1; y++) for (let x = V.px0; x <= V.px1; x++) { if (y < V.py0 + 4 && Math.hypot(x - 160, y - (V.py0 + 4)) > 10) continue; R.pset(x, y, rmp(P('#7a3a1a #c87a30 #f0b050 #ffd880'), 0.85 - (y - V.py0) * 0.012 + (h2(x >> 1, y >> 1) - 0.5) * 0.12, x, y)); }
  R.rect(V.px0 + 2, 112, V.px1 - 2, 113, hex('#6a4428')); for (const [x, c] of [[154, '#3a6ac8'], [158, '#2e7a3e'], [163, '#a83a2a']]) R.rect(x, 108, x + 2, 111, hex(c)); R.disco(166, 104, 2, hex('#fff4c0'));
  if (abre < 1) { const w = Math.round(20 * (1 - abre)); for (let y = V.py0 - 6; y <= V.y1; y++) for (let x = V.px0; x <= V.px0 + w; x++) { if (y < V.py0 + 4 && Math.hypot(x - 160, y - (V.py0 + 4)) > 10 && abre === 0) continue; R.pset(x, y, x === V.px0 + w ? K : (x - V.px0) % 5 === 0 ? hex('#2a1810') : rmp(P('#2a1810 #4e301c #6a4428 #8a5a34'), 0.55 + (h2(x, y >> 2) - 0.5) * 0.3, x, y)); } if (abre === 0) { R.disco(167, 120, 1, hex('#e8b030')); R.disco(160, 106, 3, hex('#e8b030')); R.disco(160, 106, 2, hex('#a83a2a')); } }
  else { for (let y = V.py0; y <= V.y1; y++) { R.pset(V.px0 - 3, y, hex('#4e301c')); R.pset(V.px0 - 4, y, K); } }
  luz(160, 140, 26, hex('#ffc860'), 0.22 * abre);
  // el soldado llega con el caballo de la rienda; luego se lo lleva por la derecha
  const llega = tramo(t, @51.2, @52.7), vuelve = tramo(t, @55.0, @56.2), sx = Math.round(lerp(344, 228, llega) + 100 * vuelve), sd = vuelve > 0 ? 1 : -1;
  const hxC = sd < 0 ? sx + 12 : sx - 40, boca = sd < 0 ? sx + 13 : sx - 16, mueve = (llega > 0 && llega < 1) || (vuelve > 0 && vuelve < 1);
  R.caballo(hxC, 154, t, { dir: sd, color: hex('#6a4a30'), sombra: hex('#4a3020'), galopa: false }); if (!mueve) { const cb = Math.round(Math.sin(t * 1.3)); R.pset(boca, 141 + cb, hex('#2a1810')); }
  const so = R.actor(EL.soldadoVD, sx, 154, t, { dir: sd, anda: mueve, sostiene: t > @52.9 && t < @54.0 ? false : (sd < 0 ? [sx + 17, 143] : [sx - 2, 143]), dedo: t > @52.9 && t < @54.0, habla: t > @52.9 && t < @54.0 && Math.sin(t * 8) > 0 });
  R.linea(Math.round(so.mano[0]), Math.round(so.mano[1]), boca, 141, hex('#3a2414'));
  if ((llega > 0 && llega < 1) || (vuelve > 0 && vuelve < 1)) for (let k = 0; k < 4; k++) R.disco(sx + (sd < 0 ? 30 : -6) + k * 5 * -sd, 153 - (k & 1), 1 + (k & 1), hex('#e8ecf4'));
  // Werner sale por la puerta, baja la escalerita y se va con el soldado
  const asoma = tramo(t, @52.4, @52.8), baja = tramo(t, @52.9, @53.5), va = tramo(t, @54.8, @56.2);
  if (asoma > 0) { const wx = Math.round(lerp(153, 157, baja) + 96 * va), ws = Math.round(lerp(V.y1, 154, baja)); const w = R.actor(EL.wernerVD, wx, ws, t, { dir: 1, anda: (baja > 0 && baja < 1) || (va > 0 && va < 1), sostiene: true, habla: t > @53.4 && t < @54.4 && Math.sin(t * 8) > 0 }); bolsa(Math.round(w.mano[0]) + 2, Math.round(w.mano[1]) + 1); }
  // Victor asoma a la puerta cuando su padre ha bajado y le dice adiós
  if (t > @53.4) R.actor(EL.victorNinoVD, 153, V.y1, t, { dir: 1, dedo: t > @54.2 && t < @55.6 && Math.sin(t * 6) > -0.6, sonrisa: t < @55.6, triste: t > @55.6 });
  perro(84, 172, t, llega > 0 && llega < 1, 1); };

// ── 12 · la rampa del castillo vista de lado (fondo local): Werner sube la cuesta empedrada hacia la puerta, con el valle
// y el pueblo abajo; el centinela le señala la puerta y él entra en «door» ──
const rampaY = (x) => lerp(178, 138, Math.min(1, Math.max(0, x) / 214));
const rampaBG = () => fondo('rampa', () => cieloG(LUZ.noche.cielo, 150), () => { const L = LUZ.noche, pie = P('#1e1e2a #3a3a4e #4e4e64 #62627a');
  montes(126, 50, 7.7, L.montes, 0.45); filaPinos(136, 26, 61, 8, 16, L.pinos);
  for (let y = 134; y < 180; y++) for (let x = 0; x < 214; x++) R.pset(x, y, rmp(L.nieve, 0.42 + (h2(x >> 3, y >> 2, 4) - 0.5) * 0.3 - (y - 134) * 0.004, x, y));
  for (let k = 0; k < 9; k++) { const x = 8 + k * 21 + Math.round(h2(k, 2) * 6), y = 146 + (k % 3) * 4; R.rect(x, y - 6, x + 10, y, K); R.rect(x + 1, y - 5, x + 9, y, hex('#4e3a30')); for (let i = 0; i <= 5; i++) R.rect(x + 5 - i - 1, y - 12 + i, x + 5 + i + 1, y - 12 + i, i === 0 ? K : i === 5 ? hex('#8a94b8') : hex('#c8d0e0')); R.rect(x + 3, y - 4, x + 4, y - 2, hex('#ffc860')); if (k & 1) R.rect(x + 7, y - 4, x + 8, y - 2, hex('#ffc860')); }
  // la muralla y la torre de la puerta (la luna las alumbra por la izquierda); almenas nevadas
  sillares(214, 50, 319, 179, pie, 16, 8, 6); sillares(196, 22, 262, 179, P('#22222e #40405a #565670 #6c6c88'), 14, 8, 7);
  for (let y = 22; y < 180; y++) { R.pset(196, y, K); for (let x = 197; x < 202; x++) if (bay(x, y) < 0.5) R.pset(x, y, mz(R.pget(x, y), hex('#9aa4c8'), 0.3)); for (let x = 254; x < 262; x++) if (bay(x, y) < 0.5) R.pset(x, y, mz(R.pget(x, y), K, 0.35)); }
  for (let x = 196; x < 262; x += 9) { R.rect(x, 14, x + 5, 22, K); R.rect(x + 1, 15, x + 4, 22, hex('#4e4e64')); R.rect(x, 13, x + 5, 14, hex('#e8ecf4')); } R.rect(196, 22, 262, 23, hex('#e8ecf4'));
  for (let x = 262; x < 320; x += 9) { R.rect(x, 44, x + 5, 50, K); R.rect(x + 1, 45, x + 4, 50, hex('#4e4e64')); } R.rect(262, 50, 319, 51, hex('#e8ecf4'));
  for (const [x, y] of [[214, 40], [240, 40], [290, 84], [306, 120]]) { R.rect(x, y, x + 2, y + 9, K); } R.rect(226, 34, 232, 46, K); R.rect(227, 35, 231, 45, hex('#ffc860')); R.rect(229, 35, 229, 45, K);
  // el arco de la puerta con sus dovelas, el rastrillo alzado y la luz del patio
  for (let y = 88; y <= 138; y++) for (let x = 210; x <= 250; x++) { const d = Math.hypot(x - 230, y - 106); if (y < 106 && d > 20) continue; if (y >= 106 && (x < 210 || x > 250)) continue; const dentro = y < 106 ? d < 15 : x > 214 && x < 246;
    R.pset(x, y, dentro ? rmp(P('#7a3a1a #c87a30 #f0b050 #ffd880'), 0.95 - (y - 92) * 0.008 + (h2(x >> 1, y >> 1) - 0.5) * 0.15, x, y) : (y < 106 ? (Math.floor(Math.atan2(y - 106, x - 230) * 5) & 1 ? hex('#6c6c88') : hex('#565670')) : ((y >> 3) & 1 ? hex('#6c6c88') : hex('#565670')))); }
  for (let x = 216; x <= 244; x += 4) { R.rect(x, 92, x, 100, K); R.pset(x, 101, hex('#8a8a94')); } for (let y = 92; y <= 98; y += 3) R.linea(214, y, 246, y, K);
  R.rect(222, 118, 226, 138, hex('#7a3a1a')); R.rect(236, 122, 240, 138, hex('#8a4a20'));
  // el estandarte azul del ciervo
  R.rect(268, 60, 286, 96, K); R.rect(269, 61, 285, 92, hex('#2a3a7a')); for (let x = 269; x <= 285; x += 4) R.rect(x, 93, x + 1, 96, hex('#e8b030')); R.rect(266, 58, 288, 60, hex('#6a4428'));
  { const cx = 277; R.rect(cx - 2, 76, cx + 2, 84, BL); for (const s of [-1, 1]) { R.linea(cx + s * 2, 76, cx + s * 6, 68, BL); R.linea(cx + s * 4, 71, cx + s * 7, 71, BL); } }
  // la rampa: el muro de contención de sillares con carámbanos, el empedrado con nieve en las juntas y el pretil del fondo
  for (let x = 0; x < 214; x++) { const yl = Math.round(rampaY(x));
    for (let y = yl - 13; y <= yl - 8; y++) R.pset(x, y, y === yl - 13 ? hex('#e8ecf4') : y === yl - 12 ? hex('#c8d0e0') : (x + (y >> 2) * 5) % 12 === 0 || y === yl - 8 ? hex('#2a2a3a') : rmp(pie, 0.55 + (h2(x >> 2, y, 3) - 0.5) * 0.3, x, y));
    for (let y = yl - 7; y <= yl; y++) { const c = ((x >> 2) + ((y - yl) >> 1)) & 1; R.pset(x, y, y === yl ? K : (h2(x >> 1, y, 8) > 0.82 ? hex('#c8d0e0') : c ? hex('#5a5a70') : hex('#46465a'))); if ((x & 3) === 0 && y < yl) R.pset(x, y, hex('#2a2a3a')); }
    for (let y = yl + 1; y < 180; y++) R.pset(x, y, ((y - yl - 1) % 8 === 0 || (x + ((y - yl) >> 3) * 8) % 16 === 0) ? hex('#141420') : rmp(P('#1a1a26 #2a2a3a #3a3a4e'), 0.5 + (h2(x >> 3, (y - yl) >> 3, 5) - 0.5) * 0.4, x, y));
    if (x % 7 === 3) { const L2 = 2 + Math.round(h2(x, 3) * 4); for (let j = 1; j <= L2; j++) R.pset(x, yl + j, j === L2 ? BL : hex('#a8b4d0')); } } });
const p12 = (t) => { const m = rampaBG(); estrellas(m, t, 50, 17); R.disco(56, 34, 12, hex('#1e2650')); luz(56, 34, 20, hex('#c8d0f0'), 0.2); R.disco(56, 34, 8, hex('#f4f0d8')); R.disco(58, 32, 2, hex('#d8d0b0')); R.disco(53, 37, 1, hex('#d8d0b0'));
  nubes(m, t, [[10, 50, 44, 1.6], [140, 30, 40, 2.6], [220, 66, 34, 3.4], [80, 80, 28, 4.2]], LUZ.noche.nubes); cuervos(t, 70, 1, 9, hex('#0c0c18'));
  for (let k = 0; k < 4; k++) { const x = 20 + k * 52, y = 146 + (k % 3) * 4; humo(x + 6, y - 9, t + k, 4, [hex('#3a4466'), hex('#2a3048')], 18, 6); }
  antorcha(206, 96, t); antorcha(254, 96, t + 1.3); luz(230, 120, 30, hex('#ffc860'), 0.22);
  const u = tramo(t, @56.3, @59.1), entra = tramo(t, @59.1, @59.9), wx = Math.round(lerp(8, 222, u) + 10 * entra), ws = Math.round(rampaY(wx));
  T.AT.luciernaga(R, Math.round(lerp(-6, 196, u)), Math.round(rampaY(lerp(-6, 196, u)) - 34 + Math.sin(t * 3) * 3), t, { cara: 'triste', dir: 1 });
  if (entra < 0.8) { const w = R.actor(EL.wernerVD, wx, ws, t, { dir: 1, anda: (u > 0 && u < 1) || entra > 0, sostiene: true, triste: u > 0.6 }); bolsa(Math.round(w.mano[0]) + 2, Math.round(w.mano[1]) + 1);
    if (u < 1) for (let k = 0; k < 2; k++) { const v = ((t * 1.2 + k * 0.5) % 1); R.disco(Math.round(wx + 16 + v * 6), Math.round(ws - 22 - v * 8), Math.round(1 + v * 1.5), hex('#c8d0e8')); } }
  R.actor(EL.soldadoVD, 256, 138, t, { dir: -1, dedo: t > @58.8 && t < @60.0 });
  copos(t, 40, 19, -14, 18, [BL, hex('#a8b4c8')]); };

// ── 13 · junto a la cama (fondo local, la alcoba desde el otro lado): Werner, detrás de la cama, le pone el paño en la
// frente a la enferma; el barón mira desde la ventana; el bocadillo de la balanza (corazón, X y «!») a la derecha, sin tapar el dosel ──
const balanza = (cx, cy, inc, u1, u2, u3) => { R.rect(cx - 1, cy - 8, cx + 1, cy + 16, K); R.rect(cx, cy - 7, cx, cy + 15, hex('#c8a040')); R.rect(cx - 8, cy + 15, cx + 8, cy + 17, K); R.rect(cx - 7, cy + 15, cx + 7, cy + 16, hex('#c8a040'));
  const dy = Math.round(inc * 7); R.linea(cx - 22, cy - 6 - dy, cx + 22, cy - 6 + dy, K); R.linea(cx - 22, cy - 7 - dy, cx + 22, cy - 7 + dy, hex('#e8c060'));
  for (const [s, d] of [[-1, -dy], [1, dy]]) { const px = cx + s * 20, py = cy + 6 + d; R.linea(cx + s * 22, cy - 6 + d * 1, px - 6, py, hex('#8a6a30')); R.linea(cx + s * 22, cy - 6 + d, px + 6, py, hex('#8a6a30')); R.rect(px - 8, py, px + 8, py + 2, K); R.rect(px - 7, py, px + 7, py + 1, hex('#e8c060')); }
  if (u1 > 0) corazon(cx - 23, cy - 1 - dy - Math.round((1 - u1) * 6)); if (u2 > 0) R.icono('X', cx - 31, cy - 12 - dy, hex('#a83a2a'), K, 1); if (u3 > 0) R.icono('!', cx + 18, cy - 2 + dy - Math.round((1 - u3) * 8), hex('#e8303a'), K, 2); };
const AZUL = P('#141c3e #22306a #2e4290 #4a62b8');
const camaBG = () => fondo('camaB', () => { sillares(0, 0, 319, 150, P('#1a1a24 #30303c #444454 #5a5a6c'), 22, 11, 12); }, () => {
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.45 + (x % 26 === 0 ? -0.4 : 0) + (y === 150 ? -0.4 : 0) + (h2(x >> 2, y, 5) - 0.5) * 0.3, x, y));
  for (let y = 162; y < 178; y++) for (let x = 120; x < 300; x++) R.pset(x, y, y === 162 || y === 177 ? hex('#c8a040') : (((x >> 2) + (y >> 1)) % 6 === 0 ? hex('#c8a040') : AZUL[1]));
  // la ventana ojival con la nieve y la luna; el alféizar con una vela
  for (let y = 52; y < 108; y++) for (let x = 236; x < 266; x++) { const ar = y < 66 && Math.hypot(x - 251, y - 66) > 15; if (ar) continue; const fr = (y < 66 ? Math.hypot(x - 251, y - 66) > 12 : x < 239 || x > 262) || y > 104; R.pset(x, y, fr ? (bay(x, y) < 0.5 ? hex('#7a7a86') : hex('#5a5a66')) : y > 96 + Math.sin(x * 0.5) * 2 ? hex('#5a6488') : rmp(P('#0c1026 #141a3e #1e2650'), (y - 52) / 56, x, y)); }
  R.disco(246, 66, 3, hex('#f4f0d8')); R.rect(250, 54, 251, 104, hex('#5a5a66')); R.rect(239, 80, 262, 81, hex('#5a5a66')); R.rect(232, 106, 270, 109, hex('#6a6a76')); R.rect(232, 106, 270, 106, hex('#9a9aa6'));
  // el tapiz del ciervo pequeño y un aplique con su vela
  R.rect(286, 60, 312, 100, K); R.rect(287, 61, 311, 96, AZUL[2]); for (let x = 287; x <= 311; x += 4) R.rect(x, 97, x + 1, 100, hex('#e8b030')); R.rect(284, 58, 314, 60, hex('#6a4428')); { const cx = 299; R.rect(cx - 2, 76, cx + 2, 84, BL); for (const s of [-1, 1]) { R.linea(cx + s * 2, 76, cx + s * 6, 68, BL); R.linea(cx + s * 4, 71, cx + s * 7, 71, BL); } }
  // la mesilla con la palangana, un frasco y el maletín de Werner en el suelo
  R.rect(4, 118, 32, 150, K); R.rect(5, 119, 31, 149, hex('#5a3420')); R.rect(5, 119, 31, 121, hex('#8a5a34')); R.rect(8, 126, 28, 146, hex('#4e2e1a')); R.disco(18, 134, 1, hex('#c8a040'));
  R.rect(8, 112, 24, 118, K); R.rect(9, 113, 23, 117, hex('#c8c8d0')); R.rect(9, 113, 23, 113, hex('#e8e8f0')); R.rect(26, 110, 30, 118, K); R.rect(27, 111, 29, 117, hex('#5a8a6a'));
  bolsa(220, 148);
  // el cabecero tallado, el medio dosel con su cornisa dorada, la cortina que cae a la izquierda y el drapeado recogido
  for (let y = 70; y < 150; y++) for (let x = 38; x < 60; x++) { const top = 74 - Math.round(Math.sqrt(Math.max(0, 121 - (x - 49) ** 2)) * 0.6); if (y < top) continue; R.pset(x, y, x === 38 || x === 59 || y === top ? K : rmp(P('#2a1810 #4e301c #6a4428 #8a5a34'), 0.55 + (x < 42 ? 0.25 : 0) + (Math.abs(x - 49) < 5 && Math.abs(y - 92) < 8 ? -0.3 : 0) + (h2(x, y >> 2) - 0.5) * 0.2, x, y)); }
  R.disco(49, 92, 4, hex('#c8a040')); R.disco(49, 92, 2, hex('#6a4428'));
  R.rect(28, 24, 112, 34, K); R.rect(29, 25, 111, 33, hex('#5a3420')); R.rect(29, 25, 111, 26, hex('#e8b030')); R.rect(29, 32, 111, 33, hex('#c8a040')); for (let x = 32; x < 110; x += 6) R.pset(x, 29, hex('#e8b030'));
  for (let y = 34; y < 150; y++) { const w = 14 + Math.round(Math.sin(y * 0.05) * 2); for (let x = 30; x < 30 + w; x++) R.pset(x, y, x === 30 + w - 1 ? K : rmp(AZUL, 0.55 + 0.3 * Math.sin((x - 30) * 0.9) * 0.6, x, y)); }
  for (let x = 44; x < 112; x++) { const caida = 46 + Math.round(10 * Math.sin((x - 44) / 68 * Math.PI)); for (let y = 34; y < caida; y++) R.pset(x, y, y === caida - 1 ? hex('#c8a040') : rmp(AZUL, 0.6 + 0.25 * Math.sin((x - 44) * 0.5) * (y - 34) / 20, x, y)); R.pset(x, caida, K); }
  R.rect(104, 34, 112, 64, K); for (let y = 35; y < 64; y++) for (let x = 105; x < 112; x++) R.pset(x, y, rmp(AZUL, 0.5 + 0.3 * Math.sin(x * 1.2), x, y)); R.rect(103, 52, 113, 54, hex('#c8a040'));
  // la almohada y la cabeza de la baronesa de perfil (ojos cerrados, el pelo rubio extendido)
  R.rect(56, 106, 90, 120, K); for (let y = 107; y < 120; y++) for (let x = 57; x < 90; x++) R.pset(x, y, (y === 107 || (x + y) % 9 === 0) ? hex('#d8d0c8') : hex('#f2eee6'));
  for (let y = 100; y < 114; y++) for (let x = 60; x < 82; x++) if (Math.hypot((x - 70) / 1.1, y - 108) < 7.5 && x < 74) R.pset(x, y, (x + y) % 3 ? hex('#e8c060') : hex('#c89a40'));
  R.disco(76, 108, 6, K); R.disco(76, 108, 5, hex('#f0c8a8')); R.rect(70, 103, 76, 105, hex('#e8c060')); R.rect(70, 106, 72, 112, hex('#e8c060')); R.rect(78, 107, 80, 107, K); R.pset(82, 109, hex('#e0a888')); R.pset(81, 110, hex('#f0c8a8')); R.pset(79, 111, hex('#c8806a')); });
// la cama de delante (va por delante de Werner): la colcha azul con rombos y el bulto de la enferma que respira, el
// faldón con su fleco y el pie de la cama
const camaDelante = () => capa('camaD', [56, 104, 252, 156], () => {
  for (let x = 82; x < 240; x++) { const bulto = x < 196 ? Math.round(6 * Math.sin((x - 82) / 114 * Math.PI) ** 0.7) : 0, top = 117 - bulto;
    for (let y = top; y < 126; y++) R.pset(x, y, y === top ? K : y === top + 1 ? AZUL[3] : (((x >> 2) + (y >> 2)) % 4 === 0 ? hex('#c8a040') : rmp(AZUL, 0.62 - (y - top) * 0.03, x, y))); }
  for (let y = 117; y < 126; y++) R.pset(82, y, AZUL[1]); R.rect(56, 120, 82, 125, K); for (let x = 57; x < 82; x++) for (let y = 121; y < 126; y++) R.pset(x, y, rmp(AZUL, 0.6, x, y)); R.rect(57, 121, 81, 121, hex('#f2eee6'));
  for (let y = 126; y < 146; y++) for (let x = 56; x < 240; x++) R.pset(x, y, y === 126 ? K : y > 142 ? ((x & 1) ? hex('#c8a040') : hex('#8a6a20')) : rmp(AZUL, 0.45 + 0.2 * Math.sin(x * 0.4) - (y - 126) * 0.01, x, y));
  for (let x = 56; x < 240; x += 12) R.rect(x, 127, x, 141, AZUL[0]);
  for (let y = 98; y < 156; y++) for (let x = 238; x < 250; x++) { if (y < 102 && Math.abs(x - 244) > 4) continue; R.pset(x, y, x === 238 || x === 249 || y === 98 ? K : rmp(P('#2a1810 #4e301c #6a4428 #8a5a34'), 0.55 + (x < 241 ? 0.25 : 0), x, y)); }
  R.disco(244, 97, 3, K); R.disco(244, 97, 2, hex('#c8a040')); R.rect(58, 146, 62, 156, K); R.rect(59, 146, 61, 155, hex('#4e301c')); });
const p13 = (t) => { camaBG(); velaV(12, 110, 8, t, { r: 34, a: 0.26 }); velaV(250, 105, 6, t + 2, { r: 30, a: 0.22 }); luz(80, 110, 50, hex('#ffc860'), 0.14);
  copos(t, 10, 41, -5, 10, [BL, hex('#a8b4c8')], 239, 262, 56, 96);
  R.actor(EL.baronVD, 262, 152, t, { dir: -1, enfado: t > @65.4, triste: t < @65.4 });
  const paño = t > @61.4 && t < @64.6, w = R.actor(EL.wernerVD, 88, 125, t, { dir: -1, sostiene: paño ? [80, 104] : false, triste: t > @64.8 });
  if (paño) { const [mx, my] = w.mano; R.rect(Math.round(mx) - 4, Math.round(my) - 1, Math.round(mx) + 1, Math.round(my) + 1, hex('#f2eee6')); }
  // la colcha sube y baja con la respiración: se repinta la capa un píxel más arriba o abajo
  camaDelante(); if (Math.sin(t * 2.2) > 0.4) for (let x = 100; x < 180; x++) { const top = 117 - Math.round(6 * Math.sin((x - 82) / 114 * Math.PI) ** 0.7); R.pset(x, top - 1, K); R.pset(x, top, AZUL[3]); }
  const b = tramo(t, @61.0, @61.5); if (b > 0) { const [x0, y0, x1, y1] = [140, 26, 232, 78]; R.rect(x0 + 2, y0, x1 - 2, y1, K); R.rect(x0, y0 + 2, x1, y1 - 2, K); R.rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, BL); R.rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, BL);
    for (const [cx, cy, r] of [[112, 94, 2], [124, 86, 3]]) { R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, BL); }
    const inc = tramo(t, @66.0, @66.6) * 1 - tramo(t, @62.0, @62.5) * 0.5; balanza(186, 48, inc, tramo(t, @61.9, @62.3), t > @63.2 ? 1 : 0, tramo(t, @66.0, @66.4)); }
  T.AT.luciernaga(R, 248, Math.round(34 + Math.sin(t * 2.3) * 3), t, { cara: t > @65.4 ? 'triste' : 'normal', dir: -1 }); };

// ── 14 · la mesilla: las velas se consumen noche tras noche; su mano muele hierbas en el mortero del taburete ──
const mesillaBG = () => fondo('mesilla', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#2a2a36')); }, () => {
  sillares(0, 0, 319, 179, P('#1e1e28 #3a3a46 #4e4e5a #62626e'), 22, 11, 4);
  for (let y = 12; y < 96; y++) for (let x = 26; x < 82; x++) { const ar = y < 30 && Math.hypot(x - 54, (y - 30) * 1.0) > 28; if (ar) continue; const borde = x < 30 || x > 77 || (y < 34 && Math.hypot(x - 54, y - 30) > 24) || y > 91; R.pset(x, y, borde ? (bay(x, y) < 0.5 ? hex('#7a7a86') : hex('#5a5a66')) : hex('#000000')); }
  // la cortina azul recogida junto a la ventana
  for (let y = 4; y < 150; y++) { const w = y < 60 ? 18 : 12 + Math.round(Math.abs(y - 90) * 0.12); for (let x = 2; x < 2 + w; x++) R.pset(x, y, x === 1 + w ? K : rmp(P('#0e1a3a #1a2a5a #2a3a7a #3a4a9a'), 0.45 + 0.35 * Math.sin(x * 0.9), x, y)); } R.rect(0, 2, 30, 4, hex('#c8a040')); R.rect(2, 84, 16, 86, hex('#c8a040'));
  for (let y = 118; y < 180; y++) for (let x = 84; x < 268; x++) R.pset(x, y, y < 124 ? rmp(P('#3a2014 #5a3420 #7a4a2a #9a6034'), 0.6 + Math.sin(x * 0.2 + y) * 0.2, x, y) : rmp(P('#2a1810 #3e2414 #4e301c #6a4428'), 0.4 + (h2(x >> 2, y >> 3) - 0.5) * 0.3 + (x === 86 || x === 265 ? -0.4 : 0), x, y));
  R.rect(84, 118, 267, 118, K); R.rect(84, 124, 267, 125, K);
  for (const [x0, x1] of [[94, 140], [150, 200], [210, 258]]) { R.rect(x0, 134, x1, 172, K); R.rect(x0 + 1, 135, x1 - 1, 171, hex('#6a4428')); R.rect(x0 + 3, 137, x1 - 3, 169, hex('#3e2414')); R.rect(x0 + 4, 138, x1 - 4, 168, hex('#5a3420')); R.rect(x0 + 4, 138, x1 - 4, 138, hex('#7a4a2a'));
    const cx = (x0 + x1) >> 1; for (let a = 0; a < 16; a++) R.pset(Math.round(cx + Math.cos(a * 0.39) * 8), Math.round(153 + Math.sin(a * 0.39) * 8), hex('#7a4a2a')); R.disco(cx, 153, 2, hex('#c8a040')); }
  for (let x = 100; x < 136; x++) { const bot = 128 + Math.round(10 * Math.sin((x - 100) / 36 * Math.PI)); for (let y = 125; y <= bot; y++) R.pset(x, y, (x + y) % 5 ? hex('#e8e0d0') : hex('#c8c0b0')); R.pset(x, bot + 1, x & 1 ? hex('#a83a2a') : K); }
  // el taburete de tres patas donde muele, a la derecha de la mesilla
  R.rect(274, 114, 310, 119, K); R.rect(275, 115, 309, 118, hex('#7a4a2a')); R.rect(275, 115, 309, 115, hex('#a87a4a'));
  for (const [a, b] of [[278, 270], [292, 292], [306, 314]]) { R.linea(a, 119, b, 179, K); R.linea(a + 1, 119, b + 1, 179, hex('#5a3420')); }
  R.rect(214, 108, 230, 118, K); R.rect(215, 109, 229, 117, hex('#a8a8b0')); R.rect(215, 109, 229, 110, hex('#e8e8f0')); R.rect(216, 111, 228, 113, hex('#6a8aa8'));
  for (let k = 0; k < 4; k++) R.linea(100 + k * 2, 117, 96 + k * 3, 106, k & 1 ? hex('#5a8a3a') : hex('#8a9a4a')); R.rect(94, 115, 108, 117, hex('#c8a060'));
  for (let k = 0; k < 5; k++) R.linea(280 + k * 2, 113, 278 + k * 3, 106 + (k & 1) * 2, k & 1 ? hex('#5a8a3a') : hex('#8a9a4a')); });
const p14 = (t) => { mesillaBG(); const ciclo = (t - @67.7) / 1.5, fase = ciclo % 1, dia = Math.max(0, Math.sin(fase * Math.PI * 2 - 1.2));
  R.recorte([30, 14, 77, 91]); for (let y = 14; y < 92; y++) for (let x = 30; x < 78; x++) R.pset(x, y, mz(rmp(P('#0c1026 #141a3e #1e2650'), y / 92, x, y), rmp(P('#5a9ae0 #8ac0f0 #c8e4f8'), y / 92, x, y), dia));
  const a = fase * Math.PI, sx = Math.round(54 - Math.cos(a) * 26), sy = Math.round(80 - Math.sin(a) * 52); R.disco(sx, sy, 5, dia > 0.3 ? hex('#ffe070') : hex('#f4f0d8'));
  for (let y = 70; y < 92; y++) for (let x = 30; x < 78; x++) if (y > 84 + Math.sin(x * 0.3) * 3) R.pset(x, y, mz(hex('#3a4466'), hex('#e8ecf4'), dia)); R.recorte(null); R.rect(52, 14, 55, 91, hex('#5a5a66')); R.rect(30, 50, 77, 52, hex('#5a5a66'));
  const consumo = tramo(t, @67.9, @73.3), noches = Math.min(3, Math.floor(tramo(t, @69.0, @71.0) * 3.99));
  for (const [i, x] of [[0, 118], [1, 132], [2, 146]]) { R.rect(x - 4, 116, x + 3, 118, K); R.rect(x - 3, 116, x + 2, 117, hex('#c8a040')); velaV(x, 115, 18 * (1 - consumo * (0.75 + i * 0.08)), t + i, { r: 34, a: 0.24 }); }
  for (let k = 0; k < noches; k++) { const x = 104 + k * 7; R.rect(x - 2, 112 + (k & 1), x + 2, 117, hex('#f2e6c8')); R.pset(x + 2, 113, hex('#c8b48a')); R.pset(x, 111 + (k & 1), K); }
  // el mortero en el taburete y su mano (el brazo entra corto en diagonal desde la derecha, con codo)
  const gx = 292, gy = 114; R.rect(gx - 7, gy - 7, gx + 7, gy, K); R.rect(gx - 6, gy - 6, gx + 6, gy - 1, hex('#8a8a94')); R.rect(gx - 6, gy - 6, gx + 6, gy - 5, hex('#b8b8c4')); R.rect(gx - 5, gy - 2, gx + 5, gy - 1, hex('#6a6a76'));
  const ang = t * 5, mx = Math.round(gx - 1 + Math.cos(ang) * 3), my = gy - 7 + Math.round(Math.sin(ang) * 1);
  R.linea(mx, my, mx + 3, my - 9, K); R.linea(mx + 1, my, mx + 4, my - 9, hex('#c8c0b0')); if (Math.floor(t * 6) % 2) { R.pset(gx - 3, gy - 8, hex('#8a9a4a')); R.pset(gx + 2, gy - 9, hex('#5a8a3a')); }
  T.brazo(R, 332, 132, mx + 14, my - 8, '#6a4a30', -1, { codo: [314, 118] });
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

// ── 16 · el salón: el barón, en lo alto de la escalera, señala a Werner en «blame» (su sombra enorme en la pared, por la
// antorcha de abajo, lo repite); entran dos soldados ──
const salonBG = () => fondo('salon', () => { R.rect(0, 0, 319, 179, hex('#2a2a36')); }, () => { sillares(0, 0, 319, 160, P('#1e1a20 #3a3236 #524646 #6a5a56'), 20, 10, 8);
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#2a2226 #3e3236 #524446 #66585a'), 0.4 + ((x + (y >> 2) * 7) % 24 === 0 || y % 7 === 0 ? -0.4 : 0) + (h2(x >> 3, y >> 2, 2) - 0.5) * 0.4, x, y));
  for (let y = 164; y < 178; y++) for (let x = 150; x < 270; x++) R.pset(x, y, y === 164 || y === 177 ? hex('#c8a040') : (((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#e8b030') : hex('#6a1a1a')));
  for (const bx of [164, 236]) { R.rect(bx, 20, bx + 22, 70, K); R.rect(bx + 1, 21, bx + 21, 66, hex('#2a3a7a')); for (let x = bx + 1; x <= bx + 21; x += 4) R.rect(x, 67, x + 1, 70, hex('#e8b030')); R.rect(bx - 2, 18, bx + 24, 20, hex('#6a4428'));
    const cx = bx + 11; R.rect(cx - 3, 40, cx + 3, 48, BL); R.pset(cx - 2, 49, BL); R.pset(cx + 2, 49, BL); for (const s of [-1, 1]) { R.linea(cx + s * 2, 40, cx + s * 7, 30, BL); R.linea(cx + s * 5, 34, cx + s * 9, 34, BL); R.linea(cx + s * 4, 36, cx + s * 3, 30, BL); } R.pset(cx - 1, 43, K); R.pset(cx + 1, 43, K); }
  R.rect(276, 90, 319, 160, K); for (let y = 90; y < 160; y++) for (let x = 278; x < 320; x++) { if (y < 104 && Math.hypot(x - 300, y - 104) > 22) continue; R.pset(x, y, (x - 278) % 7 === 0 ? hex('#2a1810') : rmp(P('#3e2414 #5a3420 #7a4a2a'), 0.5 + (h2(x, y >> 2) - 0.5) * 0.4, x, y)); }
  for (const yy of [112, 140]) R.rect(278, yy, 319, yy + 2, hex('#2a2a30'));
  // el rellano: un bloque de sillares grandes con su moldura
  sillares(0, 114, 118, 160, P('#1a1618 #322a2e #463c3e #5a4e4e'), 24, 12, 3); R.rect(0, 110, 118, 114, K); for (let x = 0; x < 118; x++) { R.pset(x, 111, hex('#8a7a76')); R.pset(x, 112, hex('#6a5a56')); }
  // la escalera de piedra: peldaños con la huella gastada y la nariz clara, la contrahuella en sombra, desconchones,
  // y la alfombra roja con sus varillas de latón que baja por el centro
  const pel = (x) => 112 + Math.min(8, Math.floor((x - 118) / 10)) * 6;
  for (let x = 118; x < 204; x++) { const k = Math.min(8, Math.floor((x - 118) / 10)), top = pel(x), en = (x - 118) % 10;
    for (let y = top; y < 160; y++) { const d = y - top; let c; if (d === 0) c = K; else if (d === 1) c = hex('#9a8a86'); else if (d < 6 && en > 1) c = rmp(P('#3a3034 #524446 #6a5a56 #7e6e6a'), 0.75 - d * 0.06 + (h2(x >> 1, k, 4) - 0.5) * 0.3, x, y); else c = rmp(P('#1e1a1c #2e2628 #3e3436'), 0.5 + (h2(x >> 2, y >> 2, 9) - 0.5) * 0.5, x, y); R.pset(x, y, c); }
    if (en === 0) for (let y = top; y < top + 6; y++) R.pset(x, y, K); if (h2(x, k, 7) > 0.9) R.pset(x, top + 2, hex('#2a2226')); }
  for (let x = 118; x < 204; x++) { const top = pel(x), en = (x - 118) % 10; for (let d = -1; d <= 2; d++) R.pset(x, top + d + (en === 0 ? 3 : 0), d === -1 ? hex('#a83a2a') : d === 2 ? hex('#4a1010') : ((x + d) % 6 === 0 ? hex('#e8b030') : hex('#7a1e1e'))); if (en === 1) { R.rect(x - 1, top + 1, x, top + 5, hex('#e8c060')); R.pset(x - 1, top + 1, BL); } }
  // la barandilla: pasamanos que baja con la escalera, balaústres torneados y el pilar de abajo con su bola
  const pas = (x) => x < 118 ? 92 : 92 + (x - 118) * 0.6;
  for (let x = 2; x < 206; x += 7) { const y0 = Math.round(pas(x)) + 2, y1 = x < 118 ? 110 : pel(x) - 1; for (let y = y0; y <= y1; y++) { const w = ((y - y0) % 8 < 2) ? 2 : 1; R.rect(x - w, y, x + w, y, K); R.pset(x, y, x < 100 ? hex('#a8968e') : hex('#7a6a66')); } }
  for (let x = 0; x < 206; x++) { const y = Math.round(pas(x)); R.rect(x, y - 1, x, y + 2, K); R.pset(x, y, hex('#c8b8a8')); R.pset(x, y + 1, hex('#8a7a76')); }
  R.rect(202, 120, 212, 160, K); R.rect(203, 121, 211, 159, hex('#6a5a56')); R.rect(203, 121, 205, 159, hex('#9a8a86')); R.disco(207, 116, 5, K); R.disco(207, 116, 4, hex('#8a7a76')); R.disco(206, 115, 1, hex('#c8b8a8'));
  // el candelero de pie del rellano (su luz baja proyecta la sombra del barón en la pared)
  R.rect(22, 92, 24, 110, K); R.rect(18, 108, 28, 110, K); R.rect(19, 92, 27, 93, hex('#c8a040')); R.rect(23, 93, 23, 109, hex('#8a6a30')); });
const antorcha = (x, y, t) => { R.rect(x - 1, y, x + 1, y + 10, K); R.rect(x, y + 1, x, y + 9, hex('#6a4428')); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#4a4a54')); llama(x, y - 1, t, 0.7); luz(x, y - 4, 40, hex('#ff9a40'), 0.28); };
const p16 = (t) => { salonBG(); antorcha(150, 76, t); antorcha(226, 76, t + 1); velaV(23, 92, 6, t + 2, { r: 46, a: 0.3 });
  const acusa = t > @82.3, opc = { dir: 1, dedo: acusa, enfado: t > @81.3, habla: acusa && t < @83.4 && Math.sin(t * 9) > 0 };
  // su sombra, dos veces y media más grande, sube por la pared hacia la escalera
  sombraGrande(() => R.actor(EL.baronVD, 70, 110, t, opc), 77, 110, 2.6, 44, 0, [70, 30, 200, 110], hex('#0e0a0e'), 0.62);
  luz(78, 98, 18, hex('#ffd890'), 0.25);
  R.actor(EL.baronVD, 70, 110, t, opc);
  const w = R.actor(EL.wernerVD, 176, 168, t, { dir: -1, sostiene: t < @81.0 ? true : false, triste: t > @81.3, sorpresa: t > @83.2 && t < @83.9 });
  if (t < @81.0) bolsa(Math.round(w.mano[0]) - 2, Math.round(w.mano[1]) + 1); else bolsa(164, 166);
  if (t > @83.2) R.icono('!', 73, 70, hex('#e8303a'), K, 2);
  const s = tramo(t, @82.0, @83.6); for (const [i, dy] of [[0, 0], [1, 4]]) R.actor(EL.soldadoVD, Math.round(lerp(336 + i * 20, 236 + i * 22, s)), 166 + dy, t, { dir: -1, anda: s > 0 && s < 1 }); };

// ── 17 · de noche, Werner sale del carromato con su hijo; llegan las antorchas por la izquierda. El cielo lleva nubes de
// tres tonos a varias velocidades y la luna con su halo; al fondo, el campamento duerme (carromatos lejanos, una lumbre) ──
const p17 = (t) => { const m = exterior('puerta', 'noche', (L) => { carroS(120, 140, 160, { ventana: hex('#ffc860'), puerta: true, cs: P('#1e3a2a #2e5a3e #3e7a4e #5a9a6a') });
    for (const [x0, c] of [[292, '#3a2a4a'], [18, '#2a3a4a']]) { R.rect(x0, 106, x0 + 22, 114, K); R.rect(x0 + 1, 107, x0 + 21, 113, hex(c)); for (let x = x0 - 2; x <= x0 + 24; x++) { const top = Math.round(106 - 5 * Math.sin(Math.PI * (x - x0 + 2) / 26)); R.rect(x, top, x, 105, x === x0 - 2 || x === x0 + 24 ? K : hex('#3a4466')); R.pset(x, top, hex('#9aa4c8')); } R.rect(x0 + 8, 108, x0 + 12, 111, hex('#ffc860')); R.disco(x0 + 4, 115, 2, K); R.disco(x0 + 18, 115, 2, K); }
    rodadas([[0, 160], [120, 152], [200, 150]], 5, L.nieve); pisadas([[264, 142], [270, 160], [300, 178]], L.nieve, 7, 1, 110); ventisquero(196, 178, 44, 4, L.nieve); ventisquero(300, 150, 18, 2, L.nieve); surcosV(146, 178, 16, 27, L.nieve);
    cubo(290, 172, L.nieve); for (const [x, y] of [[70, 150], [168, 168], [240, 176]]) mataN(x, y); }, { sem: 7, montesY: 100 });
  vidaExt(m, t, 'noche', { luna: 60, copos: 46, nubes: [[0, 44, 60, 1.6], [110, 24, 40, 3.2], [200, 62, 50, 2.2], [262, 34, 30, 4.4], [60, 76, 36, 3.6], [170, 40, 44, 1.1]] });
  luz(60, 34, 22, hex('#c8d0f0'), 0.22); for (let a = 0; a < 24; a++) if ((a + Math.floor(t * 2)) % 3) R.pset(Math.round(60 + Math.cos(a / 24 * 6.283) * 12), Math.round(34 + Math.sin(a / 24 * 6.283) * 12), hex('#3a4a7a'));
  humo(237, 72, t, 7, [hex('#3a4466'), hex('#2a3048')], 40, 12); humo(305, 100, t + 1, 4, [hex('#3a4466'), hex('#2a3048')], 22, 8);
  // la lumbre del fondo, junto al carromato lejano
  { const fx = 312, fy = 120; luz(fx, fy, 16, hex('#ff9a40'), 0.3); llama(fx, fy, t, 0.4); }
  luz(248, 92, 30, hex('#ffc860'), 0.25); const ant = tramo(t, @84.4, @88.6);
  for (let k = 0; k < 4; k++) { const x = Math.round(lerp(-10 - k * 18, 60 - k * 16, ant)), y = 108 + (k & 1) * 4; R.rect(x, y - 4, x + 1, y + 6, K); llama(x, y - 4, t + k, 0.6); luz(x, y - 6, 16, hex('#ff8a30'), 0.3); }
  const sal = tramo(t, @85.0, @86.2), huye = tramo(t, @87.0, @88.7);
  const wsx = Math.round(lerp(264, 232, sal) + lerp(0, 90, huye));
  R.actor(EL.victorNinoVD, Math.round(wsx + 14), 152, t, { dir: 1, anda: huye > 0 && huye < 1, sorpresa: t > @85.2 && huye < 0.2 });
  R.actor(EL.wernerVD, wsx, huye > 0 ? 152 : Math.round(lerp(140, 152, sal)), t, { dir: huye > 0 ? 1 : -1, anda: (sal > 0 && sal < 1) || (huye > 0 && huye < 1), sostiene: huye > 0 ? [wsx + 16, 140] : false, sorpresa: sal > 0.5 && huye === 0 });
  if (t > @86.0 && t < @87.0) R.bocadillo(wsx + 8, 108, { icono: '!' }); barril(96, 160); lena(40, 170, 5); perro(130, 168, t, ant > 0.2, -1); };

// ── 18 · la ladera de cerca en la tormenta (fondo local): Werner sube la cuesta hacia la derecha con el niño a cuestas;
// abajo, en el valle, las antorchas le siguen; la nieve se levanta de la cresta y los pinos se doblan ──
const ladY = (x) => lerp(178, 82, Math.max(0, Math.min(319, x)) / 319);
const laderaBG = () => fondo('ladera', () => cieloG(P('#080a16 #0e1226 #161c34 #202848'), 150), () => { const L = LUZ.noche, nC = [L.nieve[1], L.nieve[2], L.nieve[3]];
  montes(118, 44, 9.1, P('#1e2236 #161a2a #5a6488 #3a4466'), 0.4); filaPinos(134, 22, 71, 8, 14, P('#101e18 #08140e #5a6488 #1a1410'));
  for (let y = 128; y < 180; y++) for (let x = 0; x < 200; x++) if (y < ladY(x)) R.pset(x, y, rmp(P('#1e2440 #2a3252 #3a4466'), 0.45 + (h2(x >> 3, y >> 2, 2) - 0.5) * 0.3 + (y - 128) * 0.008, x, y));
  for (let k = 0; k < 10; k++) pino(Math.round(6 + k * 15 + h2(k, 5) * 8), 146 + (k % 3) * 4, 8 + (k % 4) * 2, P('#101e18 #08140e #5a6488 #1a1410'));
  // la ladera: nieve con vetas del viento a lo largo de la pendiente, la cresta clara y su sombra
  for (let x = 0; x < 320; x++) { const yl = Math.round(ladY(x)); for (let y = yl; y < 180; y++) { const d = y - yl; R.pset(x, y, d < 1 ? hex('#c8d0e8') : rmp(P('#2a3252 #3a4466 #5a6488 #7a84a8 #9aa4c8'), (d < 3 ? 0.9 : 0.62 - d * 0.004) + (Math.sin((x * 0.3 - y) * 0.45 + h2(x >> 3, y >> 3) * 3) > 0.82 ? 0.18 : 0) + (h2(x >> 2, y >> 1, 3) - 0.5) * 0.25, x, y)); } }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h2(k, 41) * 300), y = Math.round(ladY(x) + 10 + h2(k, 42) * 50); if (y > 176) continue; for (let i = 0; i < 18; i++) { const xx = x + i, yy = Math.round(y - i * 0.3); if (xx > 319) break; R.pset(xx, yy, hex('#2a3252')); if (i % 2) R.pset(xx, yy - 1, hex('#9aa4c8')); } }
  roca(44, 176, 40, 22, 2.2, nC, P('#141420 #22222e #343444 #4a4a5c #62627a'), 1.2); roca(178, 150, 30, 16, 3.7, nC, P('#141420 #22222e #343444 #4a4a5c #62627a'), 1.2); roca(282, 120, 22, 12, 4.4, nC, P('#141420 #22222e #343444 #4a4a5c #62627a'), 1.2);
  for (const [x, hg, sw] of [[110, 30, 4], [214, 40, 5], [262, 24, 4]]) pino(x, Math.round(ladY(x)) + 4, hg, P('#18301e #0c1c14 #c8d0e8 #2a1e18'), sw);
  for (const [x, y] of [[90, 172], [150, 160], [236, 140]]) mataN(x, y, 0.8); ramaN(60, 166, 18, P('#3a4466 #5a6488 #7a84a8 #c8d0e8'), 1); });
const p18 = (t) => { const m = laderaBG(); nubes(m, t, [[0, 26, 70, 9], [120, 50, 60, 12], [220, 16, 80, 7], [60, 76, 50, 14], [180, 90, 40, 16]], NUB_T);
  const ant = tramo(t, @88.7, @91.2); for (let k = 0; k < 5; k++) { const x = Math.round(lerp(-30 - k * 18, 80 - k * 14, ant)), y = 150 + (k & 1) * 3 + k; if (x < 0 || y > ladY(x) - 3) continue; R.rect(x, y - 3, x, y + 4, K); llama(x, y - 4, t + k, 0.45); luz(x, y - 5, 14, hex('#ff8a30'), 0.3); }
  const u = tramo(t, @88.8, @93.4), x = Math.round(lerp(28, 236, u)), su = Math.round(ladY(x + 7)) + 2;
  T.AT.luciernaga(R, x - 26 + tiritar(t, 1), Math.round(su - 32 + Math.sin(t * 3) * 2), t, { cara: 'triste', dir: 1 });
  R.actor(EL.victorNinoVD, x + 3, su - 11, t, { dir: 1, quieto: true, triste: true });
  R.actor(EL.wernerVD, x, su, t, { dir: 1, anda: u > 0 && u < 1, triste: true });
  if (u > 0 && u < 1) for (let k = 0; k < 2; k++) { const v = ((t * 1.4 + k * 0.5) % 1); R.disco(Math.round(x + 17 + v * 6), Math.round(su - 22 - v * 6), Math.round(1 + v * 1.5), hex('#c8d0e8')); }
  // la nieve que el viento arranca de la cresta y la ventisca en diagonal
  for (let k = 0; k < 40; k++) { const u2 = ((t * 0.9 + k / 40) % 1), x0 = Math.floor(h2(k, 61) * 320), xx = Math.round(x0 - u2 * 60), yy = Math.round(ladY(x0) - u2 * 20 - Math.sin(u2 * 3) * 4); if (xx < 0 || yy < 0 || (xx > 276 && yy < 46)) continue; R.pset(xx, yy, u2 < 0.5 ? BL : hex('#a8b4c8')); }
  copos(t, 90, 31, -70, 40, [BL, hex('#a8b4c8'), hex('#c8d0e8')]);
  if (t > @90.5 && t < @90.9) T.tinte(R, 0, 179, [200, 210, 255], 0.25); };

// ── 19 · el abrigo, desde detrás de una rama (fondo local): en primer término la rama nevada del pino que se mece; detrás,
// al abrigo de la roca grande, Werner se quita el abrigo y envuelve al niño en «coat»; la rama suelta su nieve ──
const abrigo2BG = () => fondo('abrigo2', () => cieloG(P('#080a16 #0e1226 #161c34 #202848'), 120), () => { const L = LUZ.noche, nC = [L.nieve[1], L.nieve[2], L.nieve[3]], cR = P('#141420 #22222e #343444 #4a4a5c #62627a');
  montes(108, 30, 3.9, P('#1e2236 #161a2a #5a6488 #3a4466'), 0.4); filaPinos(122, 24, 81, 12, 24, P('#142a1e #0c1c14 #8a94b8 #2a1e18'));
  sueloNieve(118, L.nieve, 19, { piedras: 4, matas: 8, ramas: 3 });
  for (let y = 16; y < 180; y++) for (let x = 0; x < 18; x++) { const u = (x - 9) / 9; R.pset(x, y, Math.abs(u) > 0.92 ? K : rmp(P('#1a0e08 #2e1a0e #4a2c18 #6a4028'), 0.5 - u * 0.3 + (Math.sin(y * 0.8 + x * 2.1) > 0.7 ? -0.3 : 0), x, y)); if (u < -0.5 && h2(x, y >> 3) > 0.75) R.pset(x, y, hex('#9aa4c8')); }
  for (let k = 0; k < 6; k++) { const rx = 9 + (k & 1 ? 20 : -6), ry = 176 - (k >> 1) * 3; R.linea(9, 170, rx, ry, K); R.linea(9, 171, rx, ry + 1, hex('#4a2c18')); }
  roca(196, 158, 132, 96, 7.3, nC, cR, 1.4); roca(90, 160, 44, 24, 8.8, nC, cR, 1.2);
  ventisquero(150, 176, 50, 5, L.nieve); ventisquero(40, 168, 30, 3, L.nieve); ventisquero(300, 176, 24, 3, L.nieve); surcosV(150, 178, 18, 33, L.nieve);
  pisadas([[-4, 166], [60, 164], [120, 160]], L.nieve, 7, 1, 110); for (const [x, y] of [[20, 150], [110, 174], [240, 168]]) mataN(x, y); ramaN(30, 176, 22, L.nieve); });
// la rama de delante: tronco de la rama, pinaza en capas y nieve encima (se mece; suelta la nieve con «cae»)
const ramaDelante = (t, cae) => { const sw = Math.sin(t * 2.1) * 1.4 + (cae > 0 && cae < 1 ? Math.sin(cae * 22) * 3 * (1 - cae) : 0), hoja = P('#14281e #1e3a2a #2a4e36 #3a6448 #52806a');
  const Y = (x) => { const u = x / 240; return Math.round(20 + u * 26 + Math.sin(u * 3) * 5 + sw * u * u); };
  for (let x = 0; x < 240; x += 2) { const u = x / 240, y = Math.round(Y(x)), L = Math.round((6 + 12 * h2(x >> 2, 7)) * (1 - u * 0.5)); if (h2(x >> 3, 11) > 0.82) continue;
    for (const [dx, dy, l] of [[-4, 1, L], [3, 1, L - 2], [-2, -1, Math.round(L * 0.5)], [5, -1, Math.round(L * 0.4)]]) for (let k = 0; k <= l; k++) { const px = x + Math.round(dx * k / l), py = y + (dy > 0 ? k : -Math.round(k * 0.6)); if (py < 16 || py > 179 || px < 0 || px > 319) continue; R.pset(px, py, rmp(hoja, 0.75 - k / l * 0.5 + (h2(px, py, 3) - 0.5) * 0.3 + (dy < 0 ? 0.15 : 0), px, py)); } }
  // las ramillas que cuelgan de la rama, cada una con su pinaza y su nieve
  for (let k = 0; k < 7; k++) { const x0 = 14 + k * 32 + (k & 1) * 6, y0 = Y(x0), L2 = 32 - k * 2; for (let i = 0; i <= L2; i++) { const x = x0 + Math.round(i * 0.7), y = y0 + Math.round(i * 0.85 + Math.sin(t * 2 + k) * i * 0.04); if (y > 179) break; R.pset(x, y, hex('#3a2414'));
      if (i % 2 === 0) for (const [dx, dy] of [[-3, 5], [3, 5], [-2, -3], [2, -3]]) { const l = Math.max(2, Math.round((L2 - i) * 0.35) + 3); for (let j = 1; j <= l; j++) { const px = x + Math.round(dx * j / l), py = y + Math.round(dy * j / l); if (py >= 16 && py < 180) R.pset(px, py, rmp(hoja, 0.7 - j / l * 0.4 + (dy < 0 ? 0.15 : 0), px, py)); } }
      if (i % 3 === 0 && !(cae > 0.4 && x0 > 130)) { R.pset(x, y - 3, hex('#e8ecf4')); R.pset(x + 1, y - 3, hex('#c8d0e8')); } } }
  for (let x = 0; x < 240; x++) { const y = Y(x), gros = Math.max(1, Math.round(3 - x / 100)); for (let g = 0; g < gros; g++) R.pset(x, y + g, g === 0 ? hex('#6a4428') : hex('#3a2414')); }
  for (let x = 2; x < 236; x++) { const y = Y(x), carga = cae > 0.4 && x > 130 ? 0 : Math.round(3 + 2 * Math.sin(x * 0.21) - x / 120); for (let n = 0; n < carga; n++) { const yy = y - 4 - n; if (yy >= 16) R.pset(x, yy, n === carga - 1 ? hex('#f4f8ff') : n === 0 ? hex('#8a94b8') : hex('#c8d0e8')); } } };
const p19 = (t) => { const m = abrigo2BG(); nubes(m, t, [[0, 30, 60, 8], [140, 56, 50, 11], [230, 20, 70, 6]], NUB_T);
  copos(t, 50, 31, -60, 34, [BL, hex('#a8b4c8')], 0, 319, 0, 120); copos(t, 14, 37, -8, 12, [BL, hex('#a8b4c8')], 110, 220, 90, 160);
  luz(150, 128, 44, hex('#c8d0f0'), 0.12); const da = t > @93.7;
  const pw = da ? { C: hex('#d8d0bc'), c: hex('#a8a090') } : {};
  R.actor(EL.wernerVD, 166 + (da ? tiritar(t, 1) : 0), 158, t, { dir: -1, pal: pw, sostiene: tramo(t, @93.4, @94.2) > 0 && tramo(t, @93.4, @94.2) < 1 ? [154, 138] : t > @94.6 ? [152, 144] : false, triste: true, habla: t > @95.6 && t < @96.6 && Math.sin(t * 6) > 0 });
  R.actor(EL.victorNinoVD, 142 + (da ? 0 : tiritar(t, 1)), 158, t, { dir: 1, sonrisa: t > @95.0, triste: t < @94.4 });
  if (da) abrigoEn(142, 158, 1);
  if (da && t < @94.4) for (let k = 0; k < 6; k++) R.pset(150 + k * 2, 140 + Math.round(Math.sin(t * 20 + k) * 2), hex('#6a4a30'));
  T.AT.luciernaga(R, 116 + tiritar(t, 1), Math.round(124 + Math.sin(t * 2) * 2), t, { cara: t > @95.0 ? 'sonrisa' : 'triste', dir: 1 });
  // la rama suelta su nieve: terrones que caen por delante
  const cae = tramo(t, @95.0, @95.8); if (cae > 0 && cae < 1) for (let k = 0; k < 10; k++) { const x = 150 + ((k * 13) % 70), y = Math.round(46 + cae * cae * 130 + (k * 7) % 14), r = 1 + (k % 3); if (y < 178) { R.disco(x, y, r, BL); R.pset(x + 1, y + r, hex('#9aa4c8')); } }
  if (cae >= 1) for (let k = 0; k < 6; k++) R.disco(152 + k * 11, 176 - (k & 1), 2, hex('#e8ecf4'));
  ramaDelante(t, cae);
  copos(t, 26, 43, -90, 50, [BL, hex('#c8d0e8')]); };

// ── 20 · amanece en la cresta (fondo local): el sol sale entre los picos detrás de los pinos; Boris baja por la ladera con
// su farol dejando su rastro en la nieve; el niño asoma vivo en «alive» ──
const farol = (x, y, t) => { R.linea(x, y - 6, x, y, K); R.rect(x - 3, y, x + 3, y + 8, K); R.rect(x - 2, y + 1, x + 2, y + 7, hex('#ffd880')); R.rect(x - 1, y + 3, x + 1, y + 5, hex('#fff4c0')); R.rect(x - 3, y + 8, x + 3, y + 9, hex('#4a4a54')); luz(x, y + 4, 26, hex('#ffc860'), 0.3); };
const crestaY = (x) => (x < 150 ? 150 : lerp(150, 112, (x - 150) / 170));
const crestaBG = () => fondo('cresta', () => cieloG(LUZ.alba.cielo, 98), () => { const L = LUZ.alba, nC = [L.nieve[1], L.nieve[2], L.nieve[3]], cR = P('#3a3048 #52465e #6a5c74 #847690 #a093aa');
  montes(90, 52, 6.4, L.montes, 0.55); montes(104, 30, 1.7, P('#5a5a7a #3e3e5e #f0d0d0 #c8a8b8'), 0.4); filaPinos(110, 26, 31, 6, 12, L.pinos);
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const yl = crestaY(x) - 6; if (y < 108) continue; const d = y - yl;
    R.pset(x, y, rmp(L.nieve, 0.55 + (h2(x >> 3, y >> 2, 13) - 0.5) * 0.28 + (Math.sin(x * 0.07 + y * 0.9) > 0.88 ? 0.25 : 0) + (x > 150 && d < 0 ? -0.15 : 0) - (y - 104) * 0.002, x, y)); }
  // la ladera de la derecha que sube hacia los pinos grandes, con su filo de luz del sol
  for (let x = 150; x < 320; x++) { const yl = Math.round(crestaY(x) - 6); const bh = Math.round(12 * Math.min(1, (x - 150) / 40)); for (let y = yl - bh; y < 180; y++) { const d = y - yl + bh; R.pset(x, y, d === 0 ? hex('#fff4e8') : d === 1 ? L.nieve[0] : rmp(L.nieve, 0.7 - Math.min(0.2, d * 0.01) + (Math.sin(x * 0.09 + y * 0.8 + 2 * h2(x >> 4, y >> 3)) > 0.86 ? 0.2 : 0) + (h2(x >> 3, y >> 2, 4) - 0.5) * 0.25, x, y)); } }
  for (const [x, hg] of [[214, 34], [246, 48], [282, 54], [308, 40], [192, 22]]) pino(x, Math.round(crestaY(x) - 14), hg, L.pinos);
  for (const [x, y, w, h] of [[60, 168, 40, 4], [180, 178, 50, 5], [260, 150, 30, 4], [120, 156, 24, 3], [10, 152, 18, 3]]) ventisquero(x, y, w, h, L.nieve);
  surcosV(140, 178, 26, 14, L.nieve);
  roca(34, 152, 50, 40, 3.3, nC, cR); roca(296, 182, 60, 30, 9.1, nC, cR); roca(140, 176, 22, 12, 5.5, nC, cR);
  for (let k = 0; k < 16; k++) mataN(Math.floor(h2(k, 71) * 318), 140 + Math.floor(h2(k, 72) * 38), 0.8 + h2(k, 73) * 0.5);
  ramaN(196, 166, 22, L.nieve); ramaN(70, 176, 16, L.nieve, -1); for (const [x, y, r] of [[226, 170, 2], [104, 172, 3], [176, 146, 1]]) piedraN(x, y, r, L.nieve);
  // el refugio de la noche: la nieve pisada y revuelta junto a la roca
  for (let k = 0; k < 30; k++) { const x = 60 + Math.round(h2(k, 81) * 60), y = 146 + Math.round(h2(k, 82) * 8); R.pset(x, y, k & 1 ? L.nieve[0] : L.nieve[3]); } });
const p20 = (t) => { const m = crestaBG(); const sx = 250, sy = Math.round(84 - tramo(t, @97.4, @102.8) * 6);
  luz(sx, sy, 70, hex('#ffd8a0'), 0.3, 0.7); R.disco(sx, sy, 7, hex('#fff4d0')); R.disco(sx, sy, 5, BL);
  for (let k = 0; k < 9; k++) { const a = -3.0 + k * 0.38; if (Math.sin(t * 2 + k) > -0.2) R.linea(Math.round(sx + Math.cos(a) * 10), Math.round(sy + Math.sin(a) * 10), Math.round(sx + Math.cos(a) * 17), Math.round(sy + Math.sin(a) * 17), hex('#fff0c0')); }
  nubes(m, t, [[20, 40, 52, 1.5], [180, 26, 44, 2.6], [110, 60, 30, 3.4], [60, 20, 36, 2.1]], LUZ.alba.nubes); cuervos(t, 50, 2, 4, hex('#5a3a4a'));
  // los pinos grandes de la cresta, a contraluz delante del sol (se repintan por encima del resplandor)
  for (const [x, hg] of [[246, 48], [282, 54]]) pino(x, Math.round(crestaY(x) - 14), hg, LUZ.alba.pinos, Math.sin(t * 1.3 + x) * 1);
  const u = tramo(t, @97.6, @101.8), bx = Math.round(lerp(326, 150, u)), bs = Math.round(crestaY(bx + 7));
  pisadas([[330, crestaY(330)], [bx + 10, crestaY(bx + 10)]], LUZ.alba.nieve, 7, 1, 60);
  const b = R.actor(EL.borisVD, bx, bs, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > @98.0 && t < @99.2 }); farol(Math.round(b.mano[0]), Math.round(b.mano[1]) + 2, t);
  R.actor(EL.wernerVD, 76, 150, t, { dir: 1, pal: { C: hex('#d8d0bc'), c: hex('#a8a090') }, triste: true, sorpresa: t > @98.4 && t < @99.4 });
  const as = t > @99.6; R.actor(EL.victorNinoVD, 96, 150, t, { dir: 1, sonrisa: as }); abrigoEn(96, 150, 1);
  if (as) for (let k = 0; k < 2; k++) { const v = ((t * 1.2 + k * 0.5) % 1); R.disco(Math.round(114 + v * 8), Math.round(130 - v * 8), Math.round(1 + v * 2), hex('#f4f0f8')); }
  if (t > @99.6 && t < @100.6) R.bocadillo(103, 118, { icono: '!' });
  copos(t, 24, 21, -20, 18, [BL, hex('#f0e0e8')]); };

// ── 21 · el pinar al alba (fondo local): Werner le pide a Boris que cuide de su hijo; Boris lo coge y se lo lleva. La
// nieve lleva las raíces de los troncos, ventisqueros, el rastro de Boris, ramas caídas, y la luz del alba entra entre los troncos ──
const pinarBG = () => fondo('pinar', () => cieloG(LUZ.alba.cielo, 120), () => { const L = LUZ.alba; montes(104, 40, 4.1, L.montes, 0.5); sueloNieve(100, L.nieve, 8, { piedras: 6, matas: 12, ramas: 4 }); filaPinos(110, 18, 17, 12, 22, L.pinos);
  for (const [x, y, w, h] of [[130, 178, 44, 5], [222, 142, 30, 3], [40, 150, 26, 3], [190, 176, 30, 4], [290, 156, 24, 3]]) ventisquero(x, y, w, h, L.nieve);
  surcosV(112, 178, 24, 18, L.nieve); pisadas([[330, 146], [280, 150], [232, 156], [200, 160]], L.nieve, 7, 1, 90); pisadas([[110, 178], [118, 168], [124, 160]], L.nieve, 7, 1, 90);
  ramaN(150, 172, 30, L.nieve); ramaN(244, 168, 20, L.nieve, -1); ramaN(96, 128, 14, L.nieve); for (const [x, y, r] of [[176, 152, 2], [60, 166, 3], [212, 130, 1]]) piedraN(x, y, r, L.nieve);
  for (const [x, y] of [[100, 150], [228, 170], [170, 136], [54, 132], [140, 120], [200, 128], [36, 176], [284, 132]]) mataN(x, y);
  // un tronco caído con su nieve, delante
  R.rect(150, 168, 236, 176, K); for (let x = 151; x < 236; x++) for (let y = 169; y < 176; y++) R.pset(x, y, rmp(P('#2a160c #4a2a18 #6a4028 #8a5a38'), 0.5 + (y < 171 ? 0.3 : y > 173 ? -0.3 : 0) + (Math.sin(x * 0.8 + y) > 0.8 ? -0.25 : 0), x, y)); R.disco(236, 172, 4, K); R.disco(236, 172, 3, hex('#c8a070')); R.anillo(236, 172, 1, hex('#8a6a44')); R.rect(152, 166, 234, 168, L.nieve[3]); R.rect(158, 165, 224, 165, L.nieve[2]); R.linea(180, 168, 186, 160, hex('#4a2a18')); R.pset(186, 159, L.nieve[3]);
  for (const [x, w] of [[14, 22], [74, 12], [256, 18]]) { for (let y = 0; y < 180; y++) for (let xx = x - (w >> 1); xx <= x + (w >> 1); xx++) { const u = (xx - x) / (w / 2); R.pset(xx, y, Math.abs(u) > 0.92 ? K : rmp(P('#2a160c #4a2a18 #6a4028 #8a5a38'), 0.55 - u * 0.35 + (Math.sin(y * 0.7 + xx * 2.3) > 0.7 ? -0.35 : 0), xx, y)); if (u < -0.5 && h2(xx, y >> 3) > 0.7) R.pset(xx, y, hex('#fff4f0')); }
    for (const by of [24, 58, 92]) { if (by > 60 && w < 16) continue; for (const d of [-1, 1]) { const L2 = by < 50 && d > 0 && x > 200 ? 14 : 30 + w; for (let k = 0; k < L2; k++) { const bx = x + d * k, byy = by + Math.round(k * 0.35); R.rect(bx, byy - 2, bx, byy + 1, k % 4 ? hex('#1a3428') : hex('#2a4a3a')); R.pset(bx, byy - 3, hex('#fff4f0')); if (k % 3 === 0) R.pset(bx, byy - 4, hex('#ffe8e0')); } } }
    // las raíces que se abren al pie del tronco, con la nieve entre ellas
    for (const d of [-1, 1]) for (let k = 0; k < 2; k++) { const L3 = 8 + k * 6 + (w >> 2); for (let i = 0; i < L3; i++) { const rx = x + d * ((w >> 1) - 2 + i), ry = 170 + Math.round(i * (0.25 + k * 0.2)); R.rect(rx, ry - 1, rx, ry + 1, K); R.pset(rx, ry - 1, hex('#6a4028')); R.pset(rx, ry - 2, hex('#fff4f0')); } }
    R.rect(x - (w >> 1) - 3, 174, x + (w >> 1) + 3, 179, hex('#f0e0e8')); R.rect(x - (w >> 1) - 1, 174, x + (w >> 1) + 1, 174, hex('#d8c8d8')); } });
const p21 = (t) => { const m = pinarBG(); nubes(m, t, [[60, 26, 40, 1.4], [190, 40, 34, 2.4], [130, 14, 30, 3.1]], LUZ.alba.nubes); luz(180, 60, 90, hex('#ffd8a0'), 0.22, 0.8);
  for (let k = 0; k < 6; k++) { const x0 = 120 + k * 24; for (let y = 20; y < 176; y += 2) { const x = Math.round(x0 - (y - 20) * 0.35); if (x < 0 || x > 319) continue; if (bay(x, y) < 0.18 + 0.06 * Math.sin(t * 0.8 + k)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0d0'), 0.5)); } }
  for (let k = 0; k < 12; k++) { const u = ((t * 0.08 + k / 12) % 1), x = Math.round(110 + h2(k, 3) * 150 - u * 30), y = Math.round(40 + u * 120); if (Math.sin(t * 3 + k) > 0) R.pset(x, y, hex('#fff4d0')); }
  const coge = t > @104.6, va = tramo(t, @106.6, @109.4); const bx = Math.round(lerp(186, 300, va));
  R.actor(EL.wernerVD, 120, 158, t, { dir: 1, pal: { C: hex('#d8d0bc'), c: hex('#a8a090') }, triste: true, habla: t > @103.6 && t < @105.2 && Math.sin(t * 6) > 0, dedo: t > @104.2 && t < @105.0 });
  if (!coge) { R.actor(EL.victorNinoVD, 148, 158, t, { dir: 1, triste: true }); abrigoEn(148, 158, 1); }
  farol(208, 150, t);
  const b = R.actor(EL.borisVD, bx, 158, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, sostiene: coge ? true : false, triste: true, salto: t > @104.1 && t < @104.4 ? 1 : 0 });
  if (coge) { const [mx, my] = b.mano; R.actor(EL.victorNinoVD, Math.round(mx) - 8, Math.round(my) + 8, t, { dir: va > 0 ? 1 : -1, quieto: true, triste: true }); abrigoEn(Math.round(mx) - 8, Math.round(my) + 8, 1); }
  for (let k = 0; k < 2; k++) { const v = ((t * 0.9 + k * 0.5) % 1); R.disco(Math.round(134 + v * 6), Math.round(136 - v * 8), Math.round(1 + v * 2), hex('#fff4f8')); }
  copos(t, 14, 23, -6, 10, [BL, hex('#f0e0e8')]); };

// ── 22 · de cerca, el abrigo de Werner tendido en la nieve al amanecer (mangas abiertas, cuello alzado con el forro,
// botones, bolsillos y la bufanda roja); las huellas de Boris se alejan hasta él, a lo lejos; se cubre de copos; un petirrojo se posa ──
const abrigoG = () => fondo('abrigoG', () => cieloG(LUZ.alba.cielo, 46), () => { const L = LUZ.alba; montes(44, 26, 5.2, L.montes, 0.5); filaPinos(50, 24, 21, 6, 12, L.pinos);
  for (let y = 48; y < 180; y++) for (let x = 0; x < 320; x++) { const pr = (y - 48) / 132, ond = Math.sin(x * 0.05 / (0.3 + pr) + y * 0.4 + 2 * h2(x >> 4, y >> 3, 5)) > 0.84 ? 0.22 : 0; R.pset(x, y, rmp(L.nieve, 0.58 + ond + (h2(x >> 3, y >> 2, 9) - 0.5) * 0.22 - pr * 0.08, x, y)); }
  for (const [x, y, w, h] of [[50, 118, 40, 4], [270, 172, 56, 6], [110, 176, 34, 4], [210, 92, 26, 2], [40, 160, 22, 3], [300, 120, 20, 3]]) ventisquero(x, y, w, h, L.nieve);
  surcosV(60, 178, 34, 51, L.nieve);
  for (let k = 0; k < 26; k++) { const x = Math.floor(h2(k, 51) * 318), y = Math.floor(70 + h2(k, 52) * 106), sc = (y - 48) / 132; if (x > 90 && x < 250 && y > 96 && y < 168) continue; for (let i = 0; i < 3 + Math.round(sc * 3); i++) R.linea(x + i, y, x + i + (i - 1.5) * 0.8, y - 2 - Math.round(sc * 4) - (i & 1) * 2, i & 1 ? hex('#a88a4a') : hex('#7a5e30')); }
  for (let k = 0; k < 8; k++) { const x = Math.floor(h2(k, 61) * 300) + 10, y = Math.floor(80 + h2(k, 62) * 90), r = 1 + Math.round((y - 48) / 40); if (x > 90 && x < 250 && y > 96 && y < 168) continue; piedraN(x, y, r, L.nieve); }
  for (const [x, y] of [[30, 140], [270, 126], [44, 170]]) ramaN(x, y, 20, L.nieve);
  // las huellas de Boris que salen de junto al abrigo y se alejan hacia la loma, cada vez más pequeñas
  pisadas([[226, 152], [246, 132], [262, 112], [276, 94], [286, 80]], L.nieve, 6, 1, 44);
  // la sombra del abrigo en la nieve
  R.poligono([[62, 140], [124, 112], [196, 110], [244, 150], [220, 162], [110, 164], [72, 154]], mz(L.nieve[0], hex('#8a7aa0'), 0.3));
  const c = hex('#6a4a30'), cS = hex('#4e3420'), cL = hex('#8a6440'), cSS = hex('#2e1c10'), forro = hex('#7a2a2a');
  const borde = (pts) => { for (let i = 0; i < pts.length; i++) R.linea(...pts[i], ...pts[(i + 1) % pts.length], K); };
  const mI = [[128, 112], [104, 120], [72, 136], [64, 146], [76, 152], [102, 136], [120, 132]], mD = [[188, 110], [212, 120], [238, 144], [236, 154], [222, 154], [204, 134], [194, 128]], cu = [[124, 108], [192, 106], [214, 156], [104, 160]];
  R.poligono(mI, c); R.poligono(mD, c); R.poligono(cu, c);
  for (let yy = 100; yy < 164; yy++) for (let xx = 60; xx < 242; xx++) { if (R.pget(xx, yy) !== c) continue; const v = Math.sin(xx * 0.16 + yy * 0.07) * 0.45 + Math.sin(xx * 0.05 - yy * 0.2) * 0.3 + (h2(xx >> 1, yy >> 1) - 0.5) * 0.35; R.pset(xx, yy, v > 0.42 ? cL : v < -0.45 ? cS : c); }
  borde(mI); borde(mD); borde(cu);
  for (const [a, b] of [[[66, 146], [76, 151]], [[224, 153], [236, 153]]]) { R.linea(...a, ...b, cSS); R.linea(a[0] + 1, a[1] - 2, b[0] + 1, b[1] - 2, cSS); }
  for (const [a, b] of [[[110, 126], [86, 140]], [[202, 124], [226, 146]], [[140, 118], [128, 150]], [[176, 116], [190, 150]]]) R.linea(...a, ...b, cS);
  // el cuello alzado con el forro rojo por dentro y las solapas
  R.poligono([[136, 98], [180, 96], [188, 108], [158, 122], [128, 110]], cL); borde([[136, 98], [180, 96], [188, 108], [158, 122], [128, 110]]);
  R.poligono([[146, 102], [170, 101], [158, 114]], forro); R.linea(146, 102, 158, 114, K); R.linea(170, 101, 158, 114, K); R.linea(138, 104, 154, 118, cS); R.linea(178, 102, 162, 118, cS);
  R.linea(158, 120, 160, 158, cSS); R.linea(159, 120, 161, 158, cS);
  for (let k = 0; k < 4; k++) { const by = 126 + k * 8, bx = 155 + Math.round(k * 0.3); R.disco(bx, by, 2, K); R.disco(bx, by, 1, hex('#c8a040')); R.pset(bx - 1, by - 1, hex('#f0d070')); R.rect(164, by, 167, by, cSS); }
  for (const [x0, y0, x1, y1] of [[118, 138, 136, 142], [178, 140, 196, 136]]) { R.linea(x0, y0, x1, y1, K); R.linea(x0, y0 + 1, x1, y1 + 1, cL); R.linea(x0, y0 + 2, x1, y1 + 2, cS); }
  // la bufanda roja de rayas sobre el cuello, con un cabo que cae por la nieve y su fleco
  for (let i = 0; i < 60; i++) { const x = 140 + i, y = Math.round(100 + Math.sin(i * 0.12) * 3 + (i > 40 ? (i - 40) * 0.9 : 0)); R.rect(x, y - 2, x, y + 2, ((i >> 2) & 1) ? hex('#a8302a') : hex('#e8e0c8')); R.pset(x, y - 3, K); R.pset(x, y + 3, K); }
  for (let k = 0; k < 6; k++) R.linea(200, 118 + k - 2, 203 + (k & 1), 124 + k, hex('#a8302a')); });
const p22 = (t) => { const m = abrigoG(); const sx = 120, sy = Math.round(36 - tramo(t, @109.6, @113.3) * 6); luz(sx, sy, 50, hex('#ffd8a0'), 0.3); R.disco(sx, sy, 6, hex('#fff4d0')); R.disco(sx, sy, 4, BL);
  for (let k = 0; k < 8; k++) { const a = -2.9 + k * 0.36; if (Math.sin(t * 2 + k) > -0.2) R.linea(Math.round(sx + Math.cos(a) * 9), Math.round(sy + Math.sin(a) * 9), Math.round(sx + Math.cos(a) * 15), Math.round(sy + Math.sin(a) * 15), hex('#fff0c0')); }
  nubes(m, t, [[30, 20, 30, 1.2], [220, 14, 36, 2], [150, 26, 24, 3]], LUZ.alba.nubes); cuervos(t, 30, 1, 6, hex('#5a3a4a'));
  luz(150, 130, 70, hex('#ffd8a0'), 0.12, 0.6);
  const cubre = tramo(t, @109.6, @113.3); for (let k = 0; k < 50 * cubre; k++) { const x = Math.round(70 + h2(k, 41) * 160), y = Math.round(100 + h2(k, 42) * 58), c = R.pget(x, y); if (c === hex('#6a4a30') || c === hex('#8a6440') || c === hex('#4e3420')) R.pset(x, y, BL); }
  const bo = tramo(t, @109.6, @113.3), fx = Math.round(lerp(286, 300, bo)), fy = Math.round(lerp(76, 62, bo)); R.rect(fx - 1, fy - 5, fx + 1, fy, K); R.pset(fx, fy - 6, hex('#e8e0d8')); luz(fx + 2, fy - 3, 6, hex('#ffd880'), 0.5); R.pset(fx + 2, fy - 3, hex('#fff4c0'));
  const bp = tramo(t, @110.6, @111.5), bx = Math.round(lerp(40, 168, bp)), by = Math.round(lerp(60, 96, bp) - Math.sin(bp * 3.14) * 16);
  R.rect(bx - 5, by - 5, bx + 3, by, K); R.rect(bx - 4, by - 4, bx + 2, by - 1, hex('#6a4a30')); R.rect(bx - 2, by - 3, bx + 2, by - 1, hex('#e86a2a')); R.pset(bx + 4, by - 3, hex('#e8a030')); R.pset(bx + 1, by - 4, K); R.rect(bx - 7, by - 4, bx - 5, by - 3, hex('#4e3420'));
  if (bp < 1) { const a = Math.sin(t * 22) > 0; R.linea(bx - 3, by - 5, bx - 6, by - (a ? 10 : 2), hex('#5a4030')); } else { R.pset(bx - 1, by + 1, K); R.pset(bx + 1, by + 1, K); if (Math.floor(t * 2) % 3 === 0) R.pset(bx + 1, by - 5, K); }
  copos(t, 16, 29, -6, 10, [BL, hex('#f0e0e8')]); };

// ── 23 · Boris llega al campamento con el niño; las romaníes salen a recibirlos. En primer término, la nieve pisada:
// huellas, rodadas, leña, cubos y matas ──
const p23 = (t) => { const m = exterior('cerca', 'alba', (L) => { carroS(150, 126, 70, { ventana: hex('#ffc860'), cs: P('#1e2a4a #2a3a6a #3a4a8a #5a6aa8') }); carroS(236, 130, 80, { ventana: hex('#ffc860'), cs: P('#4e3a10 #7a5a18 #a87a20 #c89a30') });
    for (let x = 0; x < 140; x += 12) { R.rect(x, 124, x + 2, 146, K); R.rect(x + 1, 125, x + 1, 145, hex('#8a5a34')); R.rect(x, 122, x + 2, 123, hex('#fff4f0')); } R.rect(0, 130, 140, 131, hex('#6a4428')); R.rect(0, 140, 140, 141, hex('#6a4428'));
    rodadas([[150, 152], [220, 160], [330, 168]], 6, L.nieve); pisadas([[-10, 172], [40, 168], [90, 166], [124, 164]], L.nieve, 7, 1, 100); pisadas([[230, 150], [200, 160], [170, 168], [150, 178]], L.nieve, 7, 1, 100); pisadas([[180, 150], [190, 162], [214, 176]], L.nieve, 7, 1, 100);
    for (const [x, y, w, h] of [[60, 178, 40, 4], [262, 178, 46, 5], [170, 176, 20, 3], [304, 156, 18, 2]]) ventisquero(x, y, w, h, L.nieve); surcosV(150, 178, 18, 61, L.nieve);
    lena(246, 178, 6); cubo(30, 178, L.nieve); cubo(196, 179, L.nieve); R.rect(20, 175, 40, 179, L.nieve[3]);
    for (const [x, y] of [[8, 162], [86, 178], [136, 174], [222, 172], [296, 176], [112, 152]]) mataN(x, y); ramaN(150, 178, 22, L.nieve); piedraN(100, 172, 2, L.nieve); piedraN(282, 166, 3, L.nieve);
    tajo(300, 176); }, { sem: 6 });
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

// ── 25 · años después, el rincón del baúl de cerca (fondo local, de noche): Victor, ya muchacho, entra, quita la manta de
// retales del baúl en «finds a trunk» (cae al suelo) y levanta la tapa; sale la luz cálida ──
const rinconBG = () => fondo('rincon', () => tablas(0, 0, 319, 140, P('#1a100a #2a1a10 #3a2618 #4a3220'), 12, 9), () => {
  R.rect(0, 0, 319, 5, K); R.rect(0, 1, 319, 3, hex('#4e301c')); R.rect(0, 50, 319, 56, hex('#6a1e1e')); for (let x = 2; x < 320; x += 7) { R.pset(x, 52, hex('#e8b030')); R.pset(x + 3, 54, hex('#2e7a3e')); } R.rect(0, 49, 319, 49, K); R.rect(0, 57, 319, 57, K);
  for (const [hx, n] of [[44, 3], [96, 2], [250, 3]]) for (let k = 0; k < n; k++) { const x = hx + k * 7, L = 8 + ((k * 5) % 6); R.linea(x, 5, x, 5 + L, hex('#8a6a44')); for (let j = 0; j < 10; j++) { R.pset(x - 1 + (j & 1) * 2, 6 + L + j, j % 3 ? hex('#4a6a32') : hex('#8a7a3a')); R.pset(x, 6 + L + j, j % 4 ? hex('#34502a') : hex('#a8803a')); } R.rect(x - 1, 5 + L, x + 1, 5 + L, hex('#c8a040')); }
  ventanita(196, 66, 40, 30); R.disco(204, 74, 3, hex('#f4f0d8')); R.disco(205, 73, 2, hex('#141a3e'));
  for (let y = 62; y < 100; y++) for (let x = 186; x < 194; x++) R.pset(x, y, rmp(P('#3a0e14 #5a1620 #7a2030'), 0.5 + 0.3 * Math.sin(x * 1.3), x, y)); for (let y = 62; y < 100; y++) for (let x = 238; x < 246; x++) R.pset(x, y, rmp(P('#3a0e14 #5a1620 #7a2030'), 0.5 + 0.3 * Math.sin(x * 1.3), x, y)); R.rect(184, 60, 248, 62, hex('#c8a040'));
  R.rect(28, 84, 124, 87, K); R.rect(28, 84, 124, 85, hex('#6a4428')); for (const x of [36, 116]) R.rect(x, 88, x + 2, 94, K);
  for (const [x, c, hg] of [[32, '#a8603a', 10], [44, '#3a6ac8', 13], [56, '#e8e0c8', 8], [70, '#2e7a3e', 12], [84, '#7a3a2a', 9], [98, '#c8a040', 11], [110, '#5a3a6a', 7]]) { R.rect(x - 1, 84 - hg - 1, x + 8, 83, K); R.rect(x, 84 - hg, x + 7, 83, hex(c)); R.rect(x, 84 - hg, x + 1, 83, mz(hex(c), BL, 0.35)); R.rect(x + 1, 84 - hg - 2, x + 6, 84 - hg - 1, hex('#5a3a20')); }
  for (let y = 0; y < 152; y++) { const w = 20 + Math.round(Math.sin(y * 0.06) * 3); for (let x = 0; x < w; x++) R.pset(x, y, x === w - 1 ? K : (((x >> 2) + (y >> 3)) & 1 ? hex('#5a2a6a') : hex('#3a5a8a'))); } R.rect(0, 6, 26, 8, hex('#c8a040'));
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.5 + (y % 9 === 0 ? -0.4 : 0) + (h2(x >> 3, (y / 9) | 0, 2) - 0.5) * 0.4, x, y)); R.rect(0, 140, 319, 140, K);
  for (let y = 158; y < 176; y++) for (let x = 30; x < 140; x++) R.pset(x, y, y === 158 || y === 175 ? hex('#e8b030') : (((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#e8b030') : ((x >> 3) & 1 ? hex('#7a2a2a') : hex('#5a1e1e'))));
  // el taburete con la vela, y una lámpara de aceite apagada colgada
  R.rect(258, 132, 288, 136, K); R.rect(259, 133, 287, 135, hex('#7a4a2a')); R.rect(259, 133, 287, 133, hex('#a87a4a')); for (const [a, b] of [[262, 256], [284, 290]]) { R.linea(a, 136, b, 160, K); R.linea(a + 1, 136, b + 1, 160, hex('#5a3420')); }
  R.linea(150, 5, 150, 22, hex('#4a4a54')); R.rect(146, 22, 154, 30, K); R.rect(147, 23, 153, 29, hex('#5a5a66')); R.rect(147, 23, 153, 24, hex('#8a8a94'));
  // el baúl de Cynthia en escorzo: frente, costado y tapa (la tapa se pinta en la escena), con herrajes y correas
  const fr = P('#2a120c #4a2014 #6a3020 #8a4430');
  for (let y = 124; y <= 152; y++) for (let x = 150; x <= 222; x++) R.pset(x, y, x === 150 || x === 222 || y === 152 ? K : (y - 124) % 7 === 0 ? hex('#2a120c') : rmp(fr, 0.55 + (h2(x >> 3, (y - 124) / 7 | 0, 3) - 0.5) * 0.3 + (Math.sin(x * 0.4 + y) > 0.85 ? -0.2 : 0), x, y));
  for (let x = 222; x <= 232; x++) { const top = Math.round(124 - (x - 222) * 0.8), bot = Math.round(152 - (x - 222) * 0.8); for (let y = top; y <= bot; y++) R.pset(x, y, x === 232 || y === bot ? K : rmp(fr, 0.32 + (h2(x, y >> 2) - 0.5) * 0.2, x, y)); }
  for (const sx of [166, 204]) { R.rect(sx, 124, sx + 4, 152, K); R.rect(sx + 1, 124, sx + 3, 151, hex('#5a3420')); R.pset(sx + 2, 140, hex('#c8a040')); }
  for (const [x, y] of [[150, 124], [222, 124], [150, 152], [222, 152]]) { R.rect(x - 2, y - 2, x + 2, y + 2, hex('#c8a040')); R.pset(x, y, hex('#f0d070')); }
  R.rect(182, 130, 190, 140, K); R.rect(183, 131, 189, 139, hex('#c8a040')); R.rect(185, 134, 187, 137, K); });
const p25 = (t) => { rinconBG(); T.tinte(R, 0, 179, [30, 40, 90], 0.18);
  const ab = tramo(t, @126.8, @127.6), vl = 0.8 + 0.2 * Math.sin(t * 9);
  velaV(273, 132, 12, t, { r: 70, a: 0.3 }); luz(204, 74, 20, hex('#c8d0f0'), 0.12); copos(t, 8, 47, -5, 9, [BL, hex('#a8b4c8')], 196, 236, 66, 90);
  // la tapa: cerrada es la cara de arriba (paralelogramo); se levanta sobre las bisagras de atrás y enseña su forro
  const bx0 = 160, bx1 = 232, byB = 116, alto = Math.round(lerp(0, 30, ab)), dx = Math.round(lerp(-10, -2, ab)), byF = Math.round(lerp(124, byB - alto, ab));
  if (ab > 0) { luz(190, 116, 60, hex('#ffc860'), 0.35 * ab * vl, 0.7); for (let y = byB; y < 124; y++) for (let x = 152 + (124 - y); x < 222 + (124 - y) * 1.2; x++) R.pset(x, y, rmp(P('#7a3a1a #c87a30 #f0b050 #ffd880'), 0.9 - (y - byB) * 0.06, x, y)); }
  R.poligono([[bx0 + dx, byF], [bx1 + dx, byF], [bx1, byB], [bx0, byB]], ab > 0.3 ? hex('#a8302a') : hex('#6a3020')); R.linea(bx0 + dx, byF, bx1 + dx, byF, K); R.linea(bx0 + dx, byF, bx0, byB, K); R.linea(bx1 + dx, byF, bx1, byB, K); R.linea(bx0, byB, bx1, byB, K);
  if (ab < 0.3) for (let x = bx0 + 2; x < bx1 - 2; x += 9) R.linea(x + dx, byF + 1, x, byB - 1, hex('#8a4430')); else { R.linea(bx0 + dx + 3, byF + 2, bx1 + dx - 3, byF + 2, hex('#e8b030')); for (let k = 0; k < 8 * ab; k++) { const u = ((t * 0.4 + k / 8) % 1), x = 166 + ((k * 17) % 60), y = Math.round(118 - u * 40); R.pset(x, y, u < 0.6 ? hex('#ffe890') : hex('#c8a040')); } }
  // la manta de retales: cubre el baúl, se desliza hacia él y cae arrugada al suelo
  const q = tramo(t, @125.2, @125.9); if (q < 1) { const sh = Math.round(-36 * q), cae = Math.round(18 * q * q); for (let x = 146; x <= 236; x++) { const xx = x + sh; if (xx < 0) continue; const tp = Math.round(x < 160 ? 124 - (x - 146) * 0.6 + cae : x < 226 ? 114 + Math.sin(x * 0.3) * 1.5 + cae : 116 + (x - 226) * 0.6 + cae), bt = Math.round(x < 160 ? 146 : x > 222 ? 140 : 132 + Math.sin(x * 0.5) * 3) + cae;
      R.pset(xx, tp - 1, K); for (let y = tp; y <= Math.min(152, bt); y++) R.pset(xx, y, (((x - 146) >> 3) + ((y - tp) >> 3)) & 1 ? (((x >> 3) & 2) ? hex('#a83a2a') : hex('#e8b030')) : (((x >> 3) & 2) ? hex('#3a5ac8') : hex('#2e7a3e'))); if (x % 8 === 0) for (let y = tp; y <= Math.min(152, bt); y++) R.pset(xx, y, hex('#f2e6c8')); if (bt < 152 && (x & 1)) R.pset(xx, bt + 1, hex('#e8b030')); } }
  else { for (let k = 0; k < 5; k++) R.poligono([[104 + k * 6, 152], [110 + k * 6, 144 - (k & 1) * 3], [120 + k * 6, 146], [126 + k * 6, 152]], [hex('#a83a2a'), hex('#3a5ac8'), hex('#e8b030'), hex('#2e7a3e'), hex('#a83a2a')][k]); R.linea(104, 152, 156, 152, K); }
  if (q > 0.4 && q < 1) for (let k = 0; k < 6; k++) R.pset(176 + k * 6, Math.round(110 - q * 10 - k % 3), hex('#c8c0b0'));
  // Victor entra, tira de la manta y levanta la tapa
  const u = tramo(t, @122.0, @124.2), vx = Math.round(lerp(-14, 132, u)); R.actor(EL.victorChicoVD, vx, 152, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t > @125.1 && t < @126.0 ? [148, 126] : ab > 0 && ab < 1 ? [158, byF + 2] : false, sorpresa: t > @125.9 && t < @127.0, sonrisa: t > @127.6 });
  T.AT.luciernaga(R, 300, Math.round(104 + Math.sin(t * 2) * 3), t, { cara: ab > 0.5 ? 'sorpresa' : 'normal', dir: -1, brillo: 0.6 }); };

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

// ── 28 · el camino del infierno: la puerta se entreabre en «where she is now» y, en la rendija de luz, la silueta lejana de
// Cynthia, hecha de luz; la lava burbujea, el humo sube y las pavesas vuelan ──
const p28 = (t) => { const o = { encuadre: 'camino' }; T.infierno(R, t, o); const la = tramo(t, @141.2, @141.8), abre = tramo(t, @140.6, @141.6);
  for (const [x, y, k] of [[40, 128, 0], [104, 124, 1], [168, 130, 2]]) humo(x, y, t * 0.8 + k * 0.7, 6, [hex('#4a2a2a'), hex('#2e1a1e')], 46, 10);
  for (let k = 0; k < 6; k++) { const ph = (t * 0.7 + k * 0.37) % 1, x = 50 + k * 26, y = 126 - (k & 1) * 3; if (ph < 0.7) { const r = Math.round(ph * 4); R.disco(x, y, r, hex('#ffb030')); R.pset(x, y - r, hex('#fff0a0')); } else if (ph < 0.8) for (let j = 0; j < 4; j++) R.pset(x + (j - 1.5) * 3, y - 3 - (j & 1) * 2, hex('#ff8a3a')); }
  luz(120, 124, 70, hex('#ff6a2a'), 0.12 + 0.06 * Math.sin(t * 2.3), 0.4);
  if (abre > 0) { const w = Math.round(1 + 9 * abre); luz(245, 120, 50 * abre, hex('#fff0c8'), 0.4 * abre, 1.2);
    for (let y = 46; y < 150; y++) for (let x = 245 - (w >> 1); x <= 245 + (w >> 1); x++) R.pset(x, y, rmp(P('#7a2a10 #c8601a #ffa040 #ffd080'), 0.85 - Math.abs(x - 245) / Math.max(1, w) * 0.7 - (y < 60 ? (60 - y) * 0.03 : 0), x, y));
    for (let k = 0; k < 5; k++) { const a = 2.0 + k * 0.16; R.linea(245, 148, Math.round(245 + Math.cos(a) * 60 * abre), Math.round(148 + Math.sin(a) * 18), hex('#ffd890')); }
    if (w >= 4) { luz(245, 118, 10, hex('#ffffff'), 0.5); const sc = hex('#ffffff'), sx = 245, sy = 132 + Math.round(Math.sin(t * 1.5)); R.disco(sx, sy - 18, 2, sc); for (let y = sy - 15; y <= sy; y++) { const ww = 1 + Math.round((y - sy + 15) / 8); R.rect(sx - ww, y, sx + ww, y, sc); } R.pset(sx - 2, sy - 12, hex('#fffbe8')); } }
  if (la > 0) { luz(245, 100, 26 + Math.sin(t * 6) * 3, hex('#fff4d0'), 0.45 * la); R.disco(245, 84, 2, BL); R.pset(245, 82, hex('#fffbe8')); R.pset(244, 84, hex('#e8f0ff')); }
  T.infiernoDelante(R, t, o); for (let k = 0; k < 14; k++) { const u = ((t * 0.3 + k / 14) % 1); R.pset(Math.round(30 + k * 16 + Math.sin(t + k) * 6), Math.round(172 - u * 90), u < 0.5 ? hex('#ffb03a') : hex('#c84a1a')); }
  T.AT.luciernaga(R, 160, Math.round(92 + Math.sin(t * 2) * 3), t, { cara: abre > 0.3 ? 'sorpresa' : 'normal', dir: 1, brillo: 0.6 }); };

// ── 29 · esa noche, Victor sube a las rocas de la cresta con el libro (de espaldas, fondo local); abajo, el valle con niebla,
// y lejos, el castillo del barón con sus luces; aprieta el libro y alza el puño hacia el castillo ──
const VICTOR_ESP = deEspaldas(EL.victorChicoVD);
const crestaNocheBG = () => fondo('crestaN', () => cieloG(LUZ.noche.cielo, 120), () => { const L = LUZ.noche, nC = [L.nieve[1], L.nieve[2], L.nieve[3]], cR = P('#121220 #1e1e2e #2e2e40 #44445a #5c5c74');
  montes(106, 56, 4.4, L.montes, 0.5); filaPinos(118, 30, 91, 8, 16, L.pinos);
  for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e2440 #2a3252 #3a4466 #4a5478'), 0.5 + (h2(x >> 3, y >> 2, 6) - 0.5) * 0.3 - (y - 110) * 0.004, x, y));
  // el castillo lejano en su colina, con el camino en zigzag y el pueblo al pie
  for (let y = 84; y < 118; y++) for (let x = 196; x < 286; x++) { const top = 118 - 30 * Math.exp(-((x - 240) ** 2) / 500); if (y >= top) R.pset(x, y, rmp(P('#2a3252 #3a4466 #5a6488 #7a84a8'), 0.55 - (x - 240) * 0.008 + (h2(x >> 2, y >> 2) - 0.5) * 0.3, x, y)); }
  for (let k = 0; k < 6; k++) R.linea(222 + (k & 1) * 30, 116 - k * 4, 252 - (k & 1) * 30, 114 - k * 4, hex('#8a94b8'));
  sillares(222, 70, 258, 90, P('#14141e #2a2a3a #3a3a4e #4e4e64'), 6, 4, 3); for (const [x0, x1, y0] of [[218, 226, 58], [236, 244, 52], [254, 262, 60]]) { sillares(x0, y0, x1, 90, P('#14141e #2a2a3a #3a3a4e #4e4e64'), 4, 3, 4); for (let j = 0; j <= 6; j++) { const cx = (x0 + x1) >> 1, hw = Math.round((x1 - x0 + 2) / 2 * j / 6); R.rect(cx - hw, y0 - 7 + j, cx + hw, y0 - 7 + j, j === 0 ? hex('#c8d0e8') : hex('#2a2a40')); } }
  for (let x = 222; x < 258; x += 4) R.rect(x, 68, x + 1, 70, hex('#3a3a4e')); R.rect(236, 45, 236, 52, K); R.rect(237, 45, 241, 48, hex('#2a3a7a'));
  for (let k = 0; k < 10; k++) { const x = 196 + k * 10 + ((k * 7) % 5), y = 120 + (k % 3) * 3; R.rect(x, y - 3, x + 5, y, hex('#1a1a26')); R.pset(x + 2, y - 2, hex('#ffc860')); }
  // la niebla del valle en bandas
  for (let y = 112; y < 132; y++) for (let x = 0; x < 320; x++) if (bay(x, y) < 0.22 * Math.sin((y - 112) / 20 * Math.PI) * (0.6 + 0.4 * Math.sin(x * 0.03 + y * 0.2))) R.pset(x, y, mz(R.pget(x, y), hex('#8a94b8'), 0.5));
  // las rocas de la cresta en primer término (Victor sube por la izquierda hasta lo alto)
  roca(120, 186, 170, 64, 2.7, nC, cR, 1.3); roca(26, 190, 70, 50, 6.1, nC, cR, 1.2); roca(270, 192, 110, 44, 8.3, nC, cR, 1.2);
  surcosV(150, 178, 10, 77, L.nieve, 60, 190); ramaN(200, 164, 18, L.nieve); for (const [x, y] of [[58, 166], [176, 160], [230, 170]]) mataN(x, y);
  // un árbol seco torcido a la izquierda
  R.linea(30, 150, 36, 104, K); R.linea(31, 150, 37, 104, hex('#3a2a20')); R.linea(35, 116, 20, 100, K); R.linea(36, 110, 52, 96, K); R.linea(44, 103, 48, 92, K); R.linea(24, 104, 18, 96, K); for (const [x, y] of [[20, 100], [52, 96], [48, 92]]) R.pset(x, y - 1, hex('#c8d0e8')); });
const p29 = (t) => { const m = crestaNocheBG(); estrellas(m, t, 60, 23); R.disco(70, 34, 12, hex('#1e2650')); luz(70, 34, 22, hex('#c8d0f0'), 0.22); R.disco(70, 34, 8, hex('#f4f0d8')); R.disco(72, 32, 2, hex('#d8d0b0')); R.disco(67, 37, 1, hex('#d8d0b0'));
  nubes(m, t, [[10, 50, 50, 1.4], [150, 30, 44, 2.4], [230, 62, 30, 3.6], [90, 74, 34, 2.9]], LUZ.noche.nubes);
  for (let k = 0; k < 3; k++) { const v = ((t * 0.3 + k / 3) % 1); R.disco(Math.round(210 + k * 20 + v * 10), Math.round(116 - v * 24), 1 + Math.round(v * 2), hex('#3a4466')); }
  for (const [x, y] of [[226, 76], [234, 64], [248, 80], [258, 70]]) if (Math.sin(t * 2 + x) > -0.6) R.pset(x, y, hex('#ffc860'));
  const u = tramo(t, @142.6, @144.6), vx = Math.round(lerp(18, 118, u)), vs = Math.round(lerp(164, 132, Math.min(1, u * 1.2)));
  const alza = t > @144.8, v = R.actor(VICTOR_ESP, vx, vs, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza ? false : true, dedo: alza && t < @146.0 });
  if (!alza) { const [mx, my] = v.mano; R.rect(Math.round(mx) - 1, Math.round(my) - 5, Math.round(mx) + 6, Math.round(my) + 3, K); R.rect(Math.round(mx), Math.round(my) - 4, Math.round(mx) + 5, Math.round(my) + 2, hex('#6a1e2a')); R.pset(Math.round(mx) + 3, Math.round(my) - 1, hex('#e8c060')); }
  else { R.rect(vx + 1, vs - 14, vx + 5, vs - 7, K); R.rect(vx + 2, vs - 13, vx + 4, vs - 8, hex('#6a1e2a')); }
  const cv = tramo(t, @143.4, @144.6); if (cv < 1) { const x = Math.round(lerp(40, 100, cv)), y = Math.round(lerp(100, 60, cv) - Math.sin(cv * 3) * 6); const a = cv > 0 && Math.sin(t * 16) > 0; R.rect(x - 2, y - 1, x + 2, y + 1, K); R.pset(x - 3, y - (a ? 2 : 0), K); R.pset(x + 3, y - (a ? 2 : 0), K); R.pset(x + 2, y - 2, K); }
  copos(t, 26, 51, -16, 18, [BL, hex('#a8b4c8')]); };

// ── 30 · el mapa de cerca, de noche, sobre el castillo (inserto): la vela junto al borde; Atom entra por el papel, señala
// el castillo del barón y sale el «1» con su anillo ──
const mapaCercaBG = () => fondo('mapaC', () => mesaMadera(0, P('#2a160c #4a2a18 #6a4028 #8a5a34')), () => { R.pergamino(6, 20, 268, 174, { luz: [290, 150], semilla: 9 });
  const ti = hex('#5a3a20'), ti2 = hex('#8a6a44'), verde = hex('#3a5a3a');
  // montes con su sombreado de rayas
  for (const [mx, my, s] of [[52, 70, 1.6], [92, 56, 1.2], [214, 60, 1.8], [250, 92, 1.1], [44, 128, 1.3], [210, 132, 1.2]]) { const hh = Math.round(14 * s); R.linea(mx - hh, my + hh * 0.6, mx, my - hh * 0.4, ti); R.linea(mx, my - hh * 0.4, mx + hh, my + hh * 0.6, ti); for (let k = 2; k < hh; k += 3) R.linea(mx + k * 0.4, my - hh * 0.4 + k * 0.5, mx + k * 0.9, my - hh * 0.4 + k * 0.95, ti2); R.linea(mx - 3, my - hh * 0.4 + 5, mx, my - hh * 0.4 + 1, hex('#c8b48a')); }
  // bosques: arbolitos en grupos
  for (const [fx, fy] of [[70, 100], [86, 106], [78, 112], [180, 108], [192, 114], [170, 118], [236, 120], [30, 98], [110, 140], [124, 146]]) { R.linea(fx - 3, fy + 3, fx, fy - 4, verde); R.linea(fx, fy - 4, fx + 3, fy + 3, verde); R.linea(fx - 3, fy + 3, fx + 3, fy + 3, verde); R.pset(fx, fy + 4, ti); }
  // el río
  for (let x = 8; x < 266; x++) { const y = Math.round(158 - (x - 8) * 0.14 + Math.sin(x * 0.07) * 6); for (let d = 0; d < 3; d++) R.pset(x, y + d, d === 1 ? hex('#6a9ac8') : hex('#3a6aa8')); }
  // la frontera discontinua
  for (let x = 150; x < 266; x++) { const y = Math.round(28 + (x - 150) * 0.1 + Math.sin(x * 0.2) * 2); if ((x >> 2) & 1) { R.pset(x, y, hex('#a83a2a')); R.pset(x, y + 1, hex('#a83a2a')); } }
  // el castillo grande, dibujado a tinta: torres, almenas, la puerta y las banderolas
  const cx = 140, cy = 86, PS = (x, y, c = ti) => R.pset(x, y, c);
  R.rect(cx - 26, cy - 8, cx + 26, cy + 14, ti); R.rect(cx - 25, cy - 7, cx + 25, cy + 13, hex('#d8c49a')); for (let y = cy - 6; y < cy + 13; y += 4) for (let x = cx - 24 + ((y >> 2) & 1) * 3; x < cx + 25; x += 6) PS(x, y, ti2);
  for (const tx of [-30, 30, 0]) { const x0 = cx + tx - 7, x1 = cx + tx + 7, y0 = tx === 0 ? cy - 30 : cy - 20; R.rect(x0, y0, x1, cy + 14, ti); R.rect(x0 + 1, y0 + 1, x1 - 1, cy + 13, hex('#d8c49a')); for (let x = x0; x <= x1; x += 4) R.rect(x, y0 - 3, x + 1, y0, ti); R.rect(cx + tx - 1, y0 + 6, cx + tx + 1, y0 + 10, ti); R.linea(cx + tx, y0 - 3, cx + tx, y0 - 12, ti); R.rect(cx + tx + 1, y0 - 12, cx + tx + 6, y0 - 9, hex('#a83a2a')); }
  for (let x = cx - 26; x <= cx + 26; x += 5) R.rect(x, cy - 11, x + 2, cy - 8, ti);
  for (let y = cy + 2; y <= cy + 14; y++) for (let x = cx - 6; x <= cx + 6; x++) if (y > cy + 6 || Math.hypot(x - cx, y - (cy + 6)) < 6) PS(x, y, y === cy + 2 ? ti : hex('#3a2414'));
  for (let k = 0; k < 6; k++) R.linea(cx - 10 + (k & 1) * 20, cy + 16 + k * 3, cx + 10 - (k & 1) * 20, cy + 18 + k * 3, ti2);
  // el campamento abajo a la izquierda (tres carromatos) y la ruta de puntos hasta el castillo
  for (const dx of [-8, 0, 8]) { const wx = 34 + dx, wy = 150; R.rect(wx - 3, wy - 3, wx + 3, wy, ti); PS(wx - 2, wy + 1); PS(wx + 2, wy + 1); PS(wx, wy - 4); }
  for (let k = 0; k < 30; k++) { const u = k / 29, x = Math.round(lerp(42, 138, u) + Math.sin(u * 6) * 10), y = Math.round(lerp(144, 104, u)); if (k % 2 === 0) { R.pset(x, y, hex('#a83a2a')); R.pset(x + 1, y, hex('#a83a2a')); } }
  // el tintero y la pluma en la mesa
  R.rect(284, 84, 300, 100, K); R.rect(285, 85, 299, 99, hex('#2a2a3a')); R.rect(285, 85, 299, 86, hex('#5a5a6a')); R.rect(288, 82, 296, 84, K); R.linea(292, 82, 306, 52, K); R.linea(293, 82, 307, 52, hex('#e8e0d0')); for (let k = 0; k < 6; k++) R.linea(300 + k, 58 + k * 2, 306 + k, 60 + k * 2, hex('#c8c0b0')); });
const p30 = (t) => { mapaCercaBG(); T.tinte(R, 0, 179, [16, 20, 52], 0.34);
  T.chincheta(R, 34, 144, t, T.C.rojo, { baja: 1 });
  const uno = tramo(t, @146.3, @146.8); if (uno > 0) { T.AT.anillo(R, 140, 80, 36, 30, t, tramo(t, @146.5, @147.6)); R.numero('1', 198, Math.round(lerp(58, 50, uno)), { tam: 16, centro: true }); luz(140, 80, 40, hex('#ff5a3a'), 0.25 * uno); }
  const ax = Math.round(lerp(330, 200, tramo(t, @146.3, @147.4))); T.AT.atom(R, ax, 150, t, { pose: t < @147.4 ? 'camina' : 'senala', dir: -1, cara: t > @148.6 ? 'triste' : 'normal', habla: t > @148.0 && t < @149.3 ? 1 : 0 });
  velaV(286, 152, 22, t, { r: 96, a: 0.32 }); R.rect(276, 152, 296, 156, K); R.rect(277, 152, 295, 155, hex('#c8a040')); R.rect(277, 152, 295, 152, hex('#f0d070')); for (let k = 0; k < 3; k++) R.rect(283 + k * 3, 133 + k * 4, 283 + k * 3, 138 + k * 5, hex('#f2e6c8')); };

// ── 31 · la puerta del infierno: el «2»; la cerradura late en «hell» ──
const p31 = (t) => { const o = { encuadre: 'camino', camara: 'puerta' }; T.infierno(R, t, o); const dos = tramo(t, @150.4, @150.9), hell = tramo(t, @154.4, @154.8);
  if (dos > 0) { R.numero('2', 166, Math.round(lerp(64, 56, dos)), { tam: 16, centro: true }); luz(166, 50, 20, hex('#ffd34a'), 0.25 * dos); }
  luz(166, 96, 20 + 16 * hell + Math.sin(t * 5) * 2, hex('#fff4d0'), 0.3 + 0.25 * hell); if (t > @152.2 && t < @152.8) { const d = Math.round(Math.sin(t * 50)); R.linea(120 + d, 52, 212 + d, 124, hex('#8a8a94')); }
  const ax = Math.round(lerp(96, 120, tramo(t, @150.4, @151.6))); T.AT.atom(R, ax, 152, t, { pose: ax < 120 ? 'camina' : t > @153.4 ? 'senala' : 'quieto', dir: 1, cara: hell > 0 ? 'sorpresa' : 'normal' }); T.infiernoDelante(R, t, o); };

// ── 32 · contra la luz roja (fondo local, de noche): Victor en lo alto de la loma, recortado contra el resplandor que crece
// en el paso entre dos montes; pinos grandes a la izquierda; se da la vuelta y echa a andar hacia la luz ──
const contraBG = () => fondo('contra', () => cieloG(LUZ.noche.cielo, 120), () => { const L = LUZ.noche, nC = [L.nieve[1], L.nieve[2], L.nieve[3]], cR = P('#121220 #1e1e2e #2e2e40 #44445a #5c5c74');
  const H = (x) => 112 - 44 * Math.exp(-((x - 190) ** 2) / 1800) - 52 * Math.exp(-((x - 318) ** 2) / 900) - 30 * Math.exp(-((x - 90) ** 2) / 2600) + 10 * Math.exp(-((x - 262) ** 2) / 300) + 3 * h2(x >> 2, 7);
  for (let x = 0; x < 320; x++) { const top = Math.round(H(x)); for (let y = top; y < 136; y++) { const luzD = x > 228 && x < 296 ? 0.25 * (1 - Math.abs(x - 262) / 34) : 0; R.pset(x, y, y === top ? hex('#5a6488') : rmp(P('#0e1020 #161a30 #20263e #2e3450'), 0.35 + luzD + (H(x + 2) > H(x - 2) ? 0.15 : 0) + (h2(x >> 1, y >> 2, 3) - 0.5) * 0.2, x, y)); } }
  filaPinos(128, 30, 101, 6, 12, P('#0c1a14 #08120e #5a6488 #120e0c'));
  // la loma de delante: nieve que sube hacia la derecha, con su filo de luz roja y sus vetas
  const yl = (x) => 150 - Math.round(10 * Math.sin(x / 320 * Math.PI) + x * 0.02);
  for (let x = 0; x < 320; x++) { const top = yl(x); for (let y = top - 6; y < 180; y++) { const d = y - top + 6; R.pset(x, y, d === 0 ? hex('#ffb0a0') : d === 1 ? hex('#c87a8a') : rmp(L.nieve, 0.55 - d * 0.006 + (Math.sin(x * 0.07 + y * 0.9 + 3 * h2(x >> 4, y >> 3)) > 0.86 ? 0.25 : 0) + (h2(x >> 3, y >> 2, 2) - 0.5) * 0.25, x, y)); } }
  for (const [x, y, w, h] of [[60, 168, 40, 4], [200, 176, 54, 5], [290, 162, 24, 3], [130, 158, 20, 2]]) ventisquero(x, y, w, h, L.nieve); surcosV(150, 178, 26, 91, L.nieve);
  pisadas([[-6, 172], [60, 160], [120, 152], [150, 146]], L.nieve, 7, 1, 120);
  roca(298, 184, 60, 30, 5.1, nC, cR); roca(84, 178, 30, 14, 6.3, nC, cR);
  for (const [x, hg] of [[14, 96], [42, 70], [-4, 80]]) pino(x, yl(Math.max(0, x)) - 2, hg, P('#0c1a14 #08120e #8a94b8 #120e0c'));
  for (let k = 0; k < 12; k++) mataN(Math.floor(h2(k, 95) * 310), 154 + Math.floor(h2(k, 96) * 24)); ramaN(170, 170, 20, L.nieve); });
const p32 = (t) => { const m = contraBG(); estrellas(m, t, 50, 8); nubes(m, t, [[30, 40, 46, 2], [180, 28, 56, 1.3], [260, 60, 30, 3], [110, 70, 34, 2.4]], LUZ.noche.nubes);
  const roja = 0.45 + 0.55 * tramo(t, @155.2, @155.9) + 0.12 * Math.sin(t * 3);
  luz(262, 110, 90 * roja, hex('#ff3a2a'), 0.42, 0.5); luz(262, 112, 24 * roja, hex('#ff9a6a'), 0.6); for (let y = 70; y < 112; y++) if (bay(262, y) < roja * (y - 70) / 42) R.pset(262, y, hex('#ff6a4a')); R.disco(262, 113, 2, hex('#fff0d0'));
  for (let k = 0; k < 8; k++) { const u = ((t * 0.25 + k / 8) % 1), x = Math.round(262 + Math.sin(k * 1.7 + t) * 14 * u), y = Math.round(112 - u * 50); if (bay(x, y) < roja) R.pset(x, y, hex('#ff8a6a')); }
  const va = tramo(t, @158.2, @159.6), gira = t > @157.6; const vx = Math.round(lerp(150, 230, va)), vs = 150 - Math.round(10 * Math.sin((vx + 7) / 320 * Math.PI) + (vx + 7) * 0.02);
  luz(vx + 7, vs - 12, 20, hex('#ff6a5a'), 0.2 * roja);
  R.actor(EL.victorChicoVD, vx, vs, t, { dir: gira && va === 0 ? -1 : 1, anda: va > 0 && va < 1, enfado: t > @155.2 && !gira, triste: gira && va === 0 });
  const vi = tramo(t, @156.6, @157.6); copos(t, 30 + Math.round(30 * vi), 22, -40 - 80 * vi, 24, [BL, hex('#a8b4c8'), hex('#ffb0a0')]);
  T.AT.luciernaga(R, 108, Math.round(110 + Math.sin(t * 2) * 3), t, { cara: t > @155.9 ? 'sorpresa' : 'normal', dir: 1 }); };

// ── 33 · la página de la puerta de cerca, de noche (inserto): la puerta dibujada a tinta llena la hoja; abajo, la letra de
// su madre con tres trazos rojos bajo las tres palabras y el «3» de Atom; el ojo de la cerradura se enciende ──
const paginaBG = () => fondo('pagina', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(P('#1e120c #2e1e14 #3e2a1c #4e3624'), 0.4 + 0.3 * Math.sin(y * 1.1 + Math.sin(x * 0.04 + y) * 3) * 0.6 + (h2(x >> 1, y, 4) - 0.5) * 0.2, x, y)); }, () => {
  // el borde de la otra página a la izquierda (con sus renglones) y el lomo
  for (let y = 12; y < 176; y++) for (let x = 0; x < 30; x++) R.pset(x, y, rmp(P('#8a7458 #a8946e #c8b48a'), 0.6 - (x > 22 ? (x - 22) * 0.08 : 0) + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.12, x, y));
  for (let l = 0; l < 15; l++) for (let x = 2; x < 20; x++) if (x % 7) R.pset(x, 20 + l * 10 + Math.round(Math.sin(x + l) * 0.8), hex('#5a3a4a'));
  // la hoja: papel viejo con su curva junto al lomo, manchas y el borde gastado
  for (let y = 8; y < 178; y++) for (let x = 30; x < 300; x++) { const bord = x > 296 || y < 10 || y > 175; R.pset(x, y, bord ? hex('#8a7458') : rmp(P('#a8946e #c8b48a #dccca4 #ecdcb4'), 0.78 - (x < 44 ? (44 - x) * 0.035 : 0) - (Math.hypot(x - 250, y - 40) < 14 ? 0.12 : 0) + (h2(x >> 1, y >> 1, 7) - 0.5) * 0.12, x, y)); }
  R.rect(29, 8, 31, 177, hex('#6a5438'));
  const tinta = hex('#3a1e3a'), gx = 160, gy = 120;
  // la puerta grande: arco doble, dos hojas con sus tablas, bisagras, el marco de piedra, y las llamas que lamen el suelo
  for (let a = 0; a <= 64; a++) { const an = Math.PI * a / 64; for (const [rx, ry] of [[52, 46], [46, 40], [40, 34]]) R.pset(Math.round(gx - Math.cos(an) * rx), Math.round(gy - 52 - Math.sin(an) * ry), tinta); }
  for (const dx of [-52, -46, -40, 40, 46, 52]) R.linea(gx + dx, gy - 52, gx + dx, gy + 26, tinta);
  for (let k = 0; k < 9; k++) { const an = Math.PI * (k + 0.5) / 9; R.linea(Math.round(gx - Math.cos(an) * 40), Math.round(gy - 52 - Math.sin(an) * 34), Math.round(gx - Math.cos(an) * 52), Math.round(gy - 52 - Math.sin(an) * 46), tinta); }
  R.linea(gx, gy - 86, gx, gy + 26, tinta); for (let k = 1; k < 7; k++) { R.linea(gx - 40 + k * 6, gy - 50 + Math.round(-Math.sqrt(Math.max(0, 1 - ((k * 6 - 40) / 40) ** 2)) * 30), gx - 40 + k * 6, gy + 26, hex('#7a5a6a')); R.linea(gx + k * 6, gy - 50 + Math.round(-Math.sqrt(Math.max(0, 1 - ((k * 6) / 40) ** 2)) * 30), gx + k * 6, gy + 26, hex('#7a5a6a')); }
  for (const s of [-1, 1]) for (const hy of [gy - 40, gy + 6]) { R.linea(gx + s * 40, hy, gx + s * 26, hy, tinta); R.linea(gx + s * 40, hy + 1, gx + s * 26, hy + 1, tinta); R.pset(gx + s * 28, hy - 1, tinta); }
  R.linea(gx - 66, gy + 26, gx + 66, gy + 26, tinta); R.linea(gx - 60, gy + 30, gx + 60, gy + 30, tinta);
  for (let k = 0; k < 11; k++) { const fx = gx - 56 + k * 11, fy = gy + 25; R.linea(fx, fy, fx + 3, fy - 8 - (k & 1) * 5, hex('#a83a2a')); R.linea(fx + 3, fy - 8 - (k & 1) * 5, fx + 6, fy, hex('#a83a2a')); R.pset(fx + 3, fy - 3, hex('#e8a03a')); }
  for (const [px, py] of [[62, 30], [262, 30], [262, 120], [62, 120]]) { R.linea(px - 4, py, px + 4, py, tinta); R.linea(px, py - 4, px, py + 4, tinta); R.pset(px - 3, py - 3, tinta); R.pset(px + 3, py + 3, tinta); R.pset(px + 3, py - 3, tinta); R.pset(px - 3, py + 3, tinta); }
  // la letra de su madre abajo: renglones con las tres palabras del final separadas
  for (let l = 0; l < 2; l++) { const y = 154 + l * 10; for (let x = 52; x < (l ? 96 : 280); x++) if (x % 9) R.pset(x, y + Math.round(Math.sin(x * 0.8 + l) * 1.2 + (x % 7 < 1 ? -1 : 0)), tinta); }
  for (const x0 of [110, 150, 190]) for (let x = x0; x < x0 + 30; x++) if ((x - x0) % 8) R.pset(x, 164 + Math.round(Math.sin(x * 0.9) * 1.2), tinta); });
const p33 = (t) => { paginaBG(); const gx = 160, gy = 120;
  const ojo = tramo(t, @162.8, @163.6) * (0.6 + 0.4 * Math.sin(t * 4)); R.disco(gx, gy - 24, 6, hex('#3a1e3a')); R.disco(gx, gy - 24, 4, hex('#dccca4')); R.rect(gx - 1, gy - 22, gx + 1, gy - 16, hex('#3a1e3a'));
  T.tinte(R, 0, 179, [14, 18, 50], 0.28);
  R.disco(gx, gy - 24, 4, mz(hex('#b8a882'), hex('#ff3a2a'), ojo)); if (ojo > 0.2) { luz(gx, gy - 24, 20, hex('#ff3a2a'), 0.4 * ojo); R.pset(gx - 1, gy - 25, hex('#ffd0c0')); }
  for (let k = 0; k < 3; k++) { const x0 = 109 + k * 40, on = tramo(t, @160.1 + k * 0.3, @160.35 + k * 0.3); if (on > 0) { R.rect(x0, 169, x0 - 1 + Math.round(32 * on), 170, hex('#e8303a')); R.pset(x0 - 1 + Math.round(32 * on), 168, hex('#e8303a')); } }
  velaV(312, 150, 24, t, { r: 140, a: 0.24 }); R.rect(302, 150, 319, 154, K); R.rect(303, 150, 319, 153, hex('#c8a040'));
  T.AT.atom(R, 256, 166, t, { pose: t > @159.9 && t < @161.4 ? 'senala' : t > @162.8 ? 'brazos' : 'quieto', dir: -1, cara: t > @162.9 ? 'sorpresa' : 'normal', habla: t > @159.7 && t < @160.8 ? 1 : 0 });
  if (t > @160.2) R.numero('3', 228, Math.round(lerp(138, 130, tramo(t, @160.2, @160.6))), { tam: 16, centro: true }); };

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
