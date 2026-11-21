# Borrador de escenas del ep44 (grupo S6): pa-precio. Formato del 11: E[id] = (título, cabecera, cuerpo).
# Lo común (texturas, cielo de noche, dunas, Atom con su grano, la venda, la reverencia) es copia del de S5 (escenas5.py)
# para que el desierto y el Paul ciego casen; lo propio de esta escena va en EXTRA.
import json, os
_R = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_M = json.load(open(os.path.join(_R, 'atomo/plato/escenas/marcas-ep44.json')))


def W(esc, s, marca=None):
    """instante s (s de la escena, de linea.json) → «en('marca', f)» con la marca de la frase que lo contiene"""
    mk = _M[esc]['marcas']
    nombres = [k for k in mk if not k.endswith('_fin')]
    if marca is None:
        marca = nombres[0]
        for k in nombres:
            if mk[k] <= s + 1e-6:
                marca = k
    a, b = mk[marca], mk[marca + '_fin']
    return f"en('{marca}', {(s - a) / (b - a):.4f})"


def sub(s, esc, d):
    for k, v in d.items():
        s = s.replace('@' + k + '@', W(esc, v))
    assert '@' not in s.replace('@media', ''), 'marca sin sustituir'
    return s


E = {}

COMUN = r'''
const AT = T.AT, PA = T.PA, K = T.C.k, ri = Math.round;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (a) => a.map((c) => hex(c));
const H = (s) => hex(s);
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const voz = (t) => E.energia(t);
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const horno = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } return FIJOS[k]; };
const fijo = (k, f) => R.copiar(horno(k, f));
const tiñe = (x, y, c, a) => { x = ri(x); y = ri(y); if (a > 0 && x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, Math.min(1, a))); };
const caja = (x0, y0, x1, y1, c) => { for (let y = ri(y0); y <= ri(y1); y++) for (let x = ri(x0); x <= ri(x1); x++) R.pset(x, y, c); };
// luz tramada que aclara hacia c (para lámparas, lunas, el destello)
const luz = (cx, cy, r, c, f = 0.5) => { for (let j = -ri(r); j <= r; j++) for (let i = -ri(r); i <= r; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0) tiñe(cx + i, cy + j, c, g * g * f * (0.75 + b4(ri(cx + i), ri(cy + j)) * 0.5)); } };
const pausa = (t, a, b) => AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
const flota = (t, k = 0) => Math.round(Math.sin(t * 2.4 + k) * 1.5);
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
// EL GRANO DE ESPECIA AZUL (el hilo del episodio: Atom lo lleva desde pa-caladan): le da vueltas como un electrón más
const AZ = pal(['#141e4a', '#2a4ab0', '#5a8ae8', '#a8ccff', '#f0f8ff']);
const grano = (x, y, t, s = 1) => { const X = ri(x), Y = ri(y);
  R.halo(X, Y, (5.5 + Math.sin(t * 6) * 1.2) * s, [AZ[1], AZ[2], AZ[3]], 1.15);
  R.rect(X - 1, Y - 2, X + 1, Y + 2, AZ[0]); R.rect(X - 2, Y - 1, X + 2, Y + 1, AZ[0]); R.rect(X - 1, Y - 1, X + 1, Y + 1, AZ[3]); R.pset(X, Y, AZ[4]); };
const lucie = (x, y, t, o = {}) => { AT.luciernaga(R, x, y, t, o); const a = t * 2.4; grano(x + Math.cos(a) * 12, y + Math.sin(a) * 4, t, 0.6); };
const atomG = (x, s, t, o = {}) => { const r = AT.atom(R, x, s, t, o); const a = t * 2.4, k = o.s ?? 1; grano(r.centro[0] + Math.cos(a) * 11 * k, r.centro[1] + Math.sin(a) * 4 * k, t, 0.6 + 0.2 * (k - 1)); return r; };

// las paletas (las del sietch de noche para que case con el laberinto)
const NOCHE = pal(['#06060e', '#0a0a18', '#0e1022', '#14162e', '#1a1e3a', '#222848', '#2c3456', '#384266', '#4a5478']);
const ARENA_N = pal(['#08080f', '#0e0e1a', '#141626', '#1c1e32', '#24283e', '#2e324a', '#3a3e58', '#4a4c68', '#5e5e7a', '#767890']);
const ORO = pal(['#3a2614', '#6a4220', '#a86a2c', '#e0a040', '#f6cc6a', '#fff0b0', '#fffbe8']);
const NUBE_N = pal(['#141a30', '#222a46', '#3a4466']);
const PIEDRA = pal(['#1a120e', '#2e2018', '#4a3426', '#6a4c36', '#8a6a4a', '#a88660', '#c8a878', '#e0c89a']);
const SILL = pal(['#2a1c14', '#4a3222', '#6a4a30', '#8a6440', '#a87e52', '#c49a68', '#dcb684', '#efd2a2']);
const MAD = pal(['#1e120c', '#3a2416', '#5a3a22', '#7a5230', '#9a6c40']);
const TELA = pal(['#1a2a40', '#2a4468', '#3a6aa8', '#6a9ad0']);
const ROJO = pal(['#3a0e10', '#7a1a1a', '#c83a2a', '#f07a3a', '#ffc070']);

// el cielo de noche tramado (hasta el horizonte hor): degradado, la banda de la galaxia con su polvo, estrellas fijas
const cieloNoche = (hor, k = 0) => { for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) {
  const banda = Math.exp(-(((y - 14 - x * 0.1 + k * 20) / 15) ** 2)), bm = banda * (0.55 + 0.45 * ns(x * 0.08, y * 0.12 + k));
  let c = rmp(NOCHE, 1 + (y / hor) * 5 + bm * 2.2 + (h2(x >> 1, y >> 1, 3 + k) - 0.5) * 0.4, x, y);
  const st = h2(x, y, 9 + k); if (st > 0.993 || (bm > 0.45 && st > 0.972)) c = st > 0.998 ? H('#f0f0ff') : st > 0.996 ? H('#c0c8f0') : H('#6a72a8');
  R.pset(x, y, c); } };
// una luna en creciente con su halo (lo fijo)
const luna = (x, y, r, f = 0.45) => { luz(x, y, r * 3, H('#8a94c8'), 0.25); R.disco(x, y, r, H('#f0ecff')); R.disco(x + r * 0.3, y + r * 0.15, r * 0.7, H('#c8c4e0')); R.disco(x + r * f, y - r * 0.2, r * 0.9, NOCHE[3]); };
// las estrellas que titilan (lo vivo): n estrellas en [0, hor)
const titilan = (t, hor, n = 26, k = 0) => { for (let i = 0; i < n; i++) { const x = ri(h2(i, 1, k) * 318), y = ri(h2(i, 2, k) * (hor - 4)); if ((x > 276 && y < 46) || (x < 172 && y < 21)) continue;
  const b = Math.sin(t * (1.5 + h2(i, 3, k) * 3) + i); if (b > 0.3) { R.pset(x, y, H('#ffffff')); if (b > 0.85) { R.pset(x - 1, y, H('#8a92c8')); R.pset(x + 1, y, H('#8a92c8')); R.pset(x, y - 1, H('#8a92c8')); R.pset(x, y + 1, H('#8a92c8')); } } } };
// nubes de plata de tres tonos a tres velocidades (lo vivo): [x0, y, ancho, velocidad]
const nubes = (t, lista, tonos = NUBE_N, hor = 999) => { for (const [x0, y0, w, v, k] of lista) { const cx = ((x0 + t * v) % (320 + w * 2) + 320 + w * 2) % (320 + w * 2) - w;
  for (let j = -6; j <= 6; j++) for (let i = -w / 2; i <= w / 2; i++) { const x = ri(cx + i), y = ri(y0 + j); if (y >= hor || x < 0 || x > 319 || y < 0) continue; if ((x > 276 && y < 46) || (x < 172 && y < 21)) continue;
    const d = (i / (w / 2)) ** 2 + (j / (4 + ns(i * 0.15 + k, 3) * 3)) ** 2; if (d > 1) continue; const v2 = (1 - d) * 3 + (j < 0 ? 0.4 : -0.6) + ns(x * 0.2, y * 0.3 + k) * 0.8;
    if (v2 > b4(x, y) * 1.2) R.pset(x, y, tonos[Math.max(0, Math.min(2, Math.floor(v2 - 0.6)))]); } } };
// la estrella fugaz (cada per segundos)
const fugaz = (t, per = 7, k = 0) => { const u = ((t + k * 3) % per) / 0.6; if (u > 1) return; const x0 = 60 + h2(Math.floor((t + k * 3) / per), 1, k) * 160, y0 = 24;
  for (let i = 0; i < 10; i++) { const x = ri(x0 + u * 40 - i * 2), y = ri(y0 + u * 14 - i * 0.7); if (x < 172 && y < 21) continue; R.pset(x, y, i < 2 ? H('#ffffff') : i < 5 ? H('#a8b0e0') : H('#4a5480')); } };
// la arena que vuela a ras de las crestas (lo vivo)
const arenaVuela = (t, y0, y1, n = 22, c = H('#8a8aa8'), k = 0) => { for (let i = 0; i < n; i++) { const u = (t * (0.25 + h2(i, 1, k) * 0.3) + h2(i, 2, k)) % 1, x = ri(-10 + u * 340), y = ri(y0 + h2(i, 3, k) * (y1 - y0) + Math.sin(u * 9 + i) * 2);
  R.pset(x, y, c); if (h2(i, 4, k) > 0.5) R.pset(x - 1, y, mez(c, K, 0.5)); } };
// el ratoncito saltarín del desierto (lo vivo): cruza de xa a xb entre t0 y t1, a saltos
const raton = (t, t0, t1, xa, xb, y, c = H('#b8a07a')) => { const u = (t - t0) / (t1 - t0); if (u < 0 || u > 1) return; const x = ri(xa + (xb - xa) * u), d = xb > xa ? 1 : -1, sal = ri(Math.abs(Math.sin(u * 22)) * 5), yy = y - sal;
  for (const [i, j] of [[0, 0], [1, 0], [2, 0], [1, -1], [2, -1], [3, -1]]) R.pset(x + i * d, yy + j, c); R.pset(x + 3 * d, yy - 2, c); R.pset(x + 4 * d, yy - 1, mez(c, K, 0.4)); R.pset(x + 3 * d, yy - 1, K);
  R.pset(x + 4 * d, yy - 3, c); for (let i = 1; i < 6; i++) R.pset(x - i * d, yy - ri(i * 0.5), mez(c, K, 0.3)); R.pset(x - 6 * d, yy - 3, H('#f0e8d0')); R.pset(x + 1, y + 1, mez(R.pget(x + 1, y + 1), K, 0.4)); };
// un estandarte que se mece (verde y negro con el halcón de oro, sin letras)
const estandarte = (x, y, h, t, k, s = 1) => { const v = ri(Math.sin(t * 2.6 + k) * 1.5 * s), c = k % 2 ? H('#1f4a2c') : H('#18181e'), cs = k % 2 ? H('#3a7048') : H('#3a3a46'), w = ri(10 * s), hh = ri(9 * s);
  R.linea(x, y, x, y - h, H('#4a3420')); R.pset(x, y - h - 1, H('#e8c040'));
  R.poligono([[x + 1, y - h], [x + w + 1 + v, y - h + 1], [x + w + v, y - h + hh], [x + 1, y - h + hh]], K);
  R.poligono([[x + 1, y - h + 1], [x + w + v, y - h + 2], [x + w - 1 + v, y - h + hh - 1], [x + 1, y - h + hh - 1]], c);
  R.linea(x + 1, y - h + 1, x + w - 1 + v, y - h + 2, cs); R.linea(x + 1, y - h + hh - 1, x + w - 1 + v, y - h + hh - 1, H('#c8a030'));
  const cx = x + ri(w / 2) + ri(v / 2), cy = y - h + ri(hh / 2); R.pset(cx, cy, H('#f0c848')); R.pset(cx - 1, cy - 1, H('#f0c848')); R.pset(cx + 1, cy - 1, H('#f0c848')); R.pset(cx, cy + 1, H('#c89a30')); };
// muro de sillares: hiladas de al px y piezas de an px, con junta, poros y la luz l(x, y) (0–1, más es más claro)
const sillares = (x0, y0, x1, y1, ramp, l, al = 9, an = 18, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const fila = Math.floor((y - y0) / al), dx = (x - x0 + (fila % 2) * (an >> 1)) % an, dy = (y - y0) % al, li = l(x, y);
  let v = 1 + li * (ramp.length - 3) + (h2(fila, Math.floor((x - x0 + (fila % 2) * (an >> 1)) / an), k) - 0.5) * 0.9 + (ns(x * 0.3, y * 0.3 + k) - 0.5) * 0.7;
  if (dy === 0 || dx === 0) v = Math.max(0, v - 2.2); else if (dy === 1 || dx === 1) v += 0.5; else if (dy === al - 1) v -= 0.6;
  if (h2(x, y, 7 + k) > 0.985) v -= 1.2;
  R.pset(x, y, rmp(ramp, v, x, y)); } };
// suelo de losas en perspectiva (de y0 a 179, fuga en fx)
const losas = (y0, ramp, l, fx = 160, k = 0) => { for (let y = y0; y < 180; y++) { const z = 60 / (y - y0 + 6), fila = Math.floor(z * 6); for (let x = 0; x < 320; x++) {
  const u = (x - fx) / (y - y0 + 6) * 1.6, col = Math.floor(u + 50), jun = Math.abs((z * 6) % 1) < 0.08 || Math.abs(((u + 50) % 1)) < 0.06;
  let v = 1 + l(x, y) * (ramp.length - 3) + (h2(col, fila, k) - 0.5) * 0.8 + (ns(x * 0.2, y * 0.4) - 0.5) * 0.5; if (jun) v -= 1.6;
  R.pset(x, y, rmp(ramp, v, x, y)); } } };
// el arco apuntado: ¿(x, y) dentro del hueco de centro cx, ancho w, de ytop (la clave) a ybase?
const enArco = (x, y, cx, w, ytop, ybase) => { if (y > ybase || Math.abs(x - cx) > w / 2) return false; const hs = w * 0.62, yc = ytop + hs; if (y >= yc) return true;
  const r = w * 0.8, d1 = Math.hypot(x - (cx - w / 2 + r), y - yc), d2 = Math.hypot(x - (cx + w / 2 - r), y - yc); return x <= cx ? d1 <= r && y >= ytop : d2 <= r && y >= ytop; };
// la silueta de la ciudad de arenisca (cúpulas, torres de viento, murallas) sobre el horizonte hor (lo fijo, de noche)
const ciudad = (hor, x0 = 0, x1 = 320, k = 0, c1 = H('#141626'), c2 = H('#1e2234')) => {
  for (let i = 0; i < 26; i++) { const cx = x0 + h2(i, 1, k) * (x1 - x0), w = 8 + h2(i, 2, k) * 16, hh = 6 + h2(i, 3, k) * 14, cup = h2(i, 4, k) > 0.55, torre = h2(i, 5, k) > 0.7;
    caja(cx - w / 2, hor - hh, cx + w / 2, hor, i % 2 ? c1 : c2);
    if (cup) R.disco(cx, hor - hh, w * 0.38, i % 2 ? c1 : c2);
    if (torre) { caja(cx - 1.5, hor - hh - 12, cx + 1.5, hor - hh, c2); caja(cx - 2.5, hor - hh - 14, cx + 2.5, hor - hh - 11, c2); }
    for (let j = 0; j < 4; j++) { const wx = ri(cx - w / 2 + 2 + h2(i, 10 + j, k) * (w - 4)), wy = ri(hor - 3 - h2(i, 20 + j, k) * (hh - 4)); if (h2(i, 30 + j, k) > 0.35) { R.pset(wx, wy, H('#e8a850')); if (h2(i, 40 + j, k) > 0.6) R.pset(wx, wy - 1, H('#a86a2c')); } } } };
// las ventanitas de la ciudad que se encienden y se apagan (lo vivo)
const ciudadViva = (t, hor, x0, x1, k = 0, n = 14) => { for (let i = 0; i < n; i++) { const x = ri(x0 + h2(i, 51, k) * (x1 - x0)), y = ri(hor - 2 - h2(i, 52, k) * 14); if (R.pget(x, y) === NOCHE[0]) continue;
  if (Math.sin(t * (0.4 + h2(i, 53, k)) + i * 2) > 0.2) { R.pset(x, y, H('#ffd070')); } } };
// las dunas de noche en tres términos sobre hor, hasta ysuelo (lo fijo)
const dunasNoche = (hor, k = 0, rampa = ARENA_N) => {
  const crest = (x, a, f, p) => hor + a * (0.5 + 0.5 * Math.sin(x * f + p)) + Math.sin(x * f * 2.7 + p * 1.3) * a * 0.25;
  for (let x = 0; x < 320; x++) { const c1 = crest(x, 6, 0.017, 1 + k), c2 = crest(x, 14, 0.011, 3 + k) + 10, c3 = crest(x, 22, 0.008, 5 + k) + 28;
    for (let y = hor - 8; y < 180; y++) { let v, top;
      if (y >= c3) { v = 4.2 - (y - c3) * 0.02 + Math.sin(x * 0.5 + y * 0.9 + Math.sin(y * 0.1) * 3) * 0.5; top = c3; }
      else if (y >= c2) { v = 3.3 + Math.sin(x * 0.6 + y * 1.1) * 0.4; top = c2; }
      else if (y >= c1) { v = 2.4 + Math.sin(x * 0.7 + y * 1.3) * 0.3; top = c1; }
      else continue;
      if (y - top < 1) v += 2.4; else if (y - top < 3) v += 1.1;
      const lado = Math.cos(x * (y >= c3 ? 0.008 : y >= c2 ? 0.011 : 0.017) + (y >= c3 ? 5 : y >= c2 ? 3 : 1) + k); v += lado > 0 ? 0.6 : -0.7;
      v += (ns(x * 0.25, y * 0.25) - 0.5) * 0.6; if (h2(x, y, 33) > 0.993) v -= 1.5;
      R.pset(x, y, rmp(rampa, v, x, y)); } } };
// Paul ciego: el actor de la venda (paulCiego) con la venda de tela clara pintada sobre los ojos y sus cabos detrás
const VENDA = pal(['#8a7e66', '#d8ccb0', '#f2ead6']);
const ciego = (x, suelo, t, o = {}) => { const r = R.actor(PA.paulCiego, x, suelo, t, o); const [cx, cy] = r.cabeza, dir = o.dir ?? 1, y = cy + 4 + (o.salto ? 0 : 0);
  for (let i = -6; i <= 6; i++) { R.pset(cx + 3 + i, y, VENDA[1]); R.pset(cx + 3 + i, y + 1, VENDA[2]); R.pset(cx + 3 + i, y + 2, VENDA[0]); }
  const bx = dir > 0 ? cx - 4 : cx + 10, ond = ri(Math.sin(t * 6) * 1); R.pset(bx, y + 1, VENDA[1]); R.pset(bx - dir, y + 2 + ond, VENDA[1]); R.pset(bx - 2 * dir, y + 3 + ond, VENDA[0]); R.pset(bx - dir, y + 3, VENDA[0]);
  return r; };
// la reverencia: el actor se pinta aparte y se pega con el torso inclinado (cizalla desde la cintura) y un poco más bajo
const MARCA = 0xff00ff01 >>> 0;
const inclinado = (def, x, suelo, t, o, k) => {
  if (k <= 0.02) return R.actor(def, x, suelo, t, o);
  const B = R.buf, w = 40, h = 44, X0 = 0, Y0 = 0, copia = B.slice(0, 320 * h);
  for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) B[y * 320 + xx] = MARCA;
  R.actor(def, 10, 40, t, { ...o, quieto: true }); const px = []; for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) { const c = B[y * 320 + xx]; if (c !== MARCA) px.push([xx, y, c]); }
  B.set(copia, 0); const dir = o.dir ?? 1, cintura = 30;
  for (const [xx, y, c] of px) { const s = y < cintura ? (cintura - y) * k * 0.55 : 0, dy = y < cintura ? ri((cintura - y) * k * 0.28) : 0; R.pset(ri(x - 10 + xx + s * dir), suelo - 40 + y + dy, c); }
};
'''

EXTRA = r'''
// ── lo propio de pa-precio ──────────────────────────────────────────────────────────────────────────
const sombrea = (x, y, a) => tiñe(x, y, K, a);
// captura lo que pinta f(x, suelo) en el rincón de arriba a la izquierda y devuelve sus píxeles relativos a los pies
const MKC = 0xff00fe01 >>> 0;
const captura = (f) => { const B = R.buf, Wd = 54, Hd = 52, copia = B.slice(0, 320 * Hd);
  for (let j = 0; j < Hd; j++) B.fill(MKC, j * 320, j * 320 + Wd);
  f(16, 48);
  const px = []; for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) { const c = B[j * 320 + i]; if (c !== MKC) px.push([i - 16, j - 48, c]); }
  B.set(copia, 0); return px; };
const lum = (c) => ((c & 255) * 0.3 + ((c >>> 8) & 255) * 0.59 + ((c >>> 16) & 255) * 0.11) / 255;
// una figura «de luz»: los píxeles capturados, teñidos con la rampa por su luz y mezclados a (escala s)
const deLuz = (px, x, suelo, ramp, a = 1, s = 1) => { const n = ramp.length;
  for (const [i, j, c] of px) { const col = ramp[Math.max(0, Math.min(n - 1, Math.floor(1 + lum(c) * (n - 0.6))))];
    if (s <= 1) tiñe(x + i * s, suelo + j * s, col, a); else for (let dy = 0; dy < s; dy++) for (let dx = 0; dx < s; dx++) tiñe(x + i * s + dx, suelo + j * s + dy, col, a); } };
// la figura tal cual, mezclada a (para desvanecerla) y con un temblor de calima
const fantasma = (px, x, suelo, a, t, cal = 0) => { for (const [i, j, c] of px) tiñe(x + i + ri(Math.sin(j * 0.9 + t * 14) * cal), suelo + j, c, a); };
// la sombra de una figura en la pared, a escala s, inclinada sk
const sombraDe = (px, x, suelo, s, a, sk = 0) => { const vis = new Set(); for (const [i, j] of px) for (let dy = 0; dy < s; dy++) for (let dx = 0; dx < s; dx++) {
  const X = ri(x + i * s + dx - (j * s + dy) * sk), Y = suelo + j * s + dy, k = Y * 320 + X; if (vis.has(k)) continue; vis.add(k); sombrea(X, Y, a); } };
const MIM = pal(['#2a1a10', '#5a3a1e', '#8a5e32', '#b8864a', '#dcb070', '#f0d098']);
const MANTA_A = pal(['#1a2440', '#2e4a78', '#4a72a8', '#8aa8d0', '#d0e0f0']);
const MANTA_O = pal(['#4a2a14', '#8a5a28', '#c8903c', '#e8c070', '#f8e8b8']);
const GLOW_A = [AZ[1], AZ[2], AZ[3]], GLOW_O = [ORO[3], ORO[4], ORO[5]];
// la cuna de mimbre de lado (cx, base; s escala: 1 ≈ 30 px de ancho), con su luz (g 0–1, gr la rampa) y la manta
const cunaLado = (cx, base, t, k, s, g, gr, manta) => {
  const w = 14 * s, h = 12 * s, m = Math.sin(t * 1.6 + k) * 1.2 * s, X = cx + ri(m * 0.5), top = base - ri(3 * s) - ri(h);
  if (g > 0) { R.halo(X, top + 1, 9 * s + g * 5 * s, gr, 0.7 + g * 0.6); luz(X, top, 22 * s, gr[2], 0.3 * g); }
  for (let i = -ri(w + 3 * s); i <= ri(w + 3 * s); i++) { const u = i / (w + 3 * s), y = base - ri(u * u * 3 * s) + ri(u * m); R.pset(X + i, y, K); R.pset(X + i, y - 1, MIM[2]); if (s > 1.5) R.pset(X + i, y - 2, MIM[1]); }
  for (const sx of [-1, 1]) R.linea(X + ri(sx * (w - 4 * s)), base - ri(3 * s), X + ri(sx * (w - 7 * s)), base - 1, MIM[1]);
  const mm = manta || MANTA_A;
  for (let y = top - ri(2 * s); y < top + 2; y++) for (let x = ri(X - w + 2); x <= ri(X + w - 2); x++) { const f = Math.sin(x * 0.5 / s + y * 0.3) + Math.sin(x * 0.21 / s); R.pset(x, y, rmp(mm, 2 + f * 0.6 + (g > 0 ? g : 0), x, y)); }
  for (let y = top; y <= base - ri(3 * s); y++) { const u = (y - top) / h, half = w * (1 - 0.22 * u * u);
    for (let x = ri(X - half); x <= ri(X + half); x++) { const e = Math.abs(x - X) > half - 1 || y === base - ri(3 * s);
      const tej = ((Math.floor((x - X) / (2 * s)) + Math.floor((y - top) / (2 * s))) & 1), banda = (y - top) % ri(4 * s) === 0;
      let v = e ? 0 : banda ? 1.4 : 2.4 + tej * 0.9 - u * 0.8 + ((x - X) < 0 ? 0.3 : -0.3);
      if (y - top < ri(2 * s)) v = 4.3 + (g > 0 ? 0.6 * g : 0);
      R.pset(x, y, rmp(MIM, v, x, y)); } }
  return [X, top]; };
// la cuna vista desde arriba (óvalo de mimbre con la manta y la luz del bebé)
const cunaArriba = (cx, cy, rx, ry, manta) => { cunaArriba0(cx, cy, rx, ry, manta);
  // la capota tejida en un extremo, la almohadita debajo y las dos asas
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= -rx * 0.35; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 0.98) continue; const X = cx + i, Y = cy + j, ar = ((Math.floor((i + rx) / 3) + (j & 1)) & 1);
    R.pset(X, Y, i > -rx * 0.38 ? K : rmp(MIM, 1.6 + ar * 0.9 + (j < 0 ? 0.5 : -0.4) + (Math.abs(i + rx * 0.62) < 1 ? -1 : 0), X, Y)); }
  for (let j = -ri(ry * 0.4); j <= ri(ry * 0.4); j++) for (let i = ri(-rx * 0.33); i <= ri(-rx * 0.12); i++) R.pset(cx + i, cy + j, Math.abs(j) === ri(ry * 0.4) || i === ri(-rx * 0.33) ? MIM[2] : H('#f4ecd8'));
  for (const sy of [-1, 1]) { const y = cy + sy * (ry + 2); for (let i = -6; i <= 6; i++) { R.pset(cx + 8 + i, y + sy * ri(Math.sqrt(36 - i * i) * 0.5), K); R.pset(cx + 8 + i, y + sy * ri(Math.sqrt(36 - i * i) * 0.5) - sy, MIM[4]); } } };
const cunaArriba0 = (cx, cy, rx, ry, manta) => { for (let j = -ry - 2; j <= ry + 2; j++) for (let i = -rx - 2; i <= rx + 2; i++) {
  const d = (i / rx) ** 2 + (j / ry) ** 2, X = cx + i, Y = cy + j; if (d > 1.1) continue; if (d > 1.0) { R.pset(X, Y, K); continue; }
  if (d > 0.7) { const a = Math.atan2(j / ry, i / rx), v = 2.2 + ((Math.floor(a * 16) + (d > 0.85 ? 1 : 0)) & 1) * 0.9 + (j < 0 ? 0.7 : -0.5) + (ns(X * 0.3, Y * 0.3) - 0.5) * 0.6 + (d > 0.96 ? -1 : 0); R.pset(X, Y, rmp(MIM, v, X, Y)); continue; }
  const f = Math.sin(i * 0.22 + j * 0.45) + Math.sin(i * 0.1 - j * 0.3) * 0.7; R.pset(X, Y, rmp(manta, 1.8 + f * 0.7 - (j / ry) * 0.5 + (d > 0.6 ? -0.6 : 0), X, Y)); } };
// el bastón (de la mano al suelo)
const baston = (mx, my, suelo, dx = 2) => { R.linea(mx + dx, my - 9, mx, suelo, K); R.linea(mx + dx + 1, my - 9, mx + 1, suelo, MAD[3]); R.linea(mx + dx + 2, my - 9, mx + 2, suelo, K); R.rect(mx + dx, my - 11, mx + dx + 2, my - 9, MAD[4]); R.pset(mx + dx + 1, my - 12, K); };
// la corona de oro pequeña (para la roca y el trono)
const coronita = (x, y, t, s = 1) => { const c = ORO[4], cs = ORO[2]; R.rect(x - 4 * s, y - 2 * s, x + 4 * s, y, K); R.rect(x - 3 * s, y - 1 * s, x + 3 * s, y, c);
  for (const i of [-3, 0, 3]) { R.rect(x + i * s - s, y - 5 * s, x + i * s + s - 1, y - 2 * s, K); R.rect(x + i * s - (s > 1 ? 1 : 0), y - 4 * s, x + i * s, y - 2 * s, c); }
  R.linea(x - 3 * s, y, x + 3 * s, y, cs); R.pset(x, y - 1 * s, H('#3a6aa8')); if (Math.sin(t * 3) > 0.7) { R.pset(x - 3 * s, y - 6 * s, H('#ffffff')); R.pset(x - 3 * s, y - 7 * s, ORO[5]); } };
// la jarrita de barro
const jarra = (x, y) => { R.rect(x - 3, y - 6, x + 3, y, K); R.rect(x - 2, y - 5, x + 2, y - 1, H('#b8743a')); R.pset(x - 2, y - 5, H('#e0a060')); R.rect(x - 1, y - 8, x + 1, y - 6, K); R.pset(x, y - 7, H('#8a4a24')); };
// el sello de la orden (disco rojo con su X en relieve)
const sello = (x, y, r, t, g = 0) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, ROJO[1 + (g > 0.5 ? 1 : 0)]); R.disco(x - r * 0.25, y - r * 0.25, r * 0.55, ROJO[2 + (g > 0.5 ? 1 : 0)]);
  const q = ri(r * 0.45); R.linea(x - q, y - q, x + q, y + q, ROJO[g > 0.5 ? 4 : 3]); R.linea(x + q, y - q, x - q, y + q, ROJO[g > 0.5 ? 4 : 3]); R.pset(x - ri(r * 0.6), y - ri(r * 0.6), H('#ffd0a0')); };
'''

CUERPO = r'''
const P2 = @p2@, P3 = @p3@, P4 = @p4@, P5 = @p5@, P6 = @p6@, P7 = @p7@, P8 = @p8@, P9 = @p9@, P10 = @p10@, P11 = @p11@, P12 = @p12@, P13 = @p13@, P14 = @p14@, P15 = @p15@;
// ── 1 · el sietch de lejos, de noche: la meseta con la boca encendida; una Fremen sube con su cántaro ─────────────
const MESA_N = pal(['#07060c', '#0e0b14', '#17121c', '#221a24', '#2e222c', '#3c2c34', '#4e3a3e', '#644a48', '#7a5a52']);
const VENT1 = [[136, 72, 0], [152, 62, 1], [166, 80, 2], [214, 64, 3], [238, 74, 4], [254, 90, 5], [200, 86, 6], [146, 94, 7], [228, 100, 8], [182, 66, 9]];
const SEND1 = [[208, 121], [224, 112], [206, 104], [228, 94], [210, 85], [232, 76], [214, 66]];
const CIMA1 = (x) => 50 + Math.sin(x * 0.07) * 2 + Math.sin(x * 0.23) * 1.2 + (x < 134 ? (134 - x) * 2.2 : 0) + (x > 258 ? (x - 258) * 2.6 : 0);
const CR1 = (x) => 122 + 22 * (0.5 + 0.5 * Math.sin(x * 0.008 + 7)) + Math.sin(x * 0.008 * 2.7 + 7 * 1.3) * 22 * 0.25 + 28;
const enSend = (u) => { const n = SEND1.length - 1, k = Math.min(n - 1, Math.floor(u * n)), f = u * n - k; return [lerp(SEND1[k][0], SEND1[k + 1][0], f), lerp(SEND1[k][1], SEND1[k + 1][1], f)]; };
const p1 = (t) => {
  fijo('p1', () => {
    cieloNoche(112, 1);
    luna(64, 42, 8);
    for (let x = 0; x < 320; x++) { const y0 = ri(104 + Math.sin(x * 0.03 + 1) * 3 + Math.sin(x * 0.11) * 1.5); for (let y = y0; y < 124; y++) R.pset(x, y, rmp(ARENA_N, 2.2 + (y - y0) * 0.09 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.6 + (y === y0 ? 1.4 : 0), x, y)); }
    // mesetas lejanas pequeñas
    for (let x = 0; x < 90; x++) { const yc = ri(96 + Math.abs(x - 44) * 0.18 + Math.sin(x * 0.4) * 0.8); if (x > 20 && x < 70) for (let y = yc; y < 106; y++) R.pset(x, y, rmp(MESA_N, 1.3 + (y === yc ? 1 : 0) + (y % 4 === 0 ? -0.5 : 0), x, y)); }
    // la meseta del sietch, con estratos, grietas y la cara izquierda a la luna
    const cima = (x) => 50 + Math.sin(x * 0.07) * 2 + Math.sin(x * 0.23) * 1.2 + (x < 134 ? (134 - x) * 2.2 : 0) + (x > 258 ? (x - 258) * 2.6 : 0);
    for (let x = 96; x < 304; x++) { const yc = ri(cima(x)); for (let y = Math.max(yc, 30); y < 128; y++) {
      const est = (y + ri(Math.sin(x * 0.05) * 2)) % 9, luzL = x < 160 ? 1.1 - (x - 96) * 0.016 : 0;
      let v = 2.3 + luzL * 2 + (ns(x * 0.18, y * 0.08) - 0.5) * 1.3 - (y - yc) * 0.006;
      if (est === 0) v -= 1.3; else if (est === 1) v += 0.5;
      if (h2(x >> 2, 3, 7) > 0.78 && ((x * 7) % 13) < 1 && y > yc + 6) v -= 1.6;
      if (y - yc < 2) v += 1.8; if (h2(x, y, 4) > 0.985) v += 1.2;
      R.pset(x, y, rmp(MESA_N, v, x, y)); } }
    for (let i = 0; i < SEND1.length - 1; i++) { const [xa, ya] = SEND1[i], [xb, yb] = SEND1[i + 1]; R.linea(xa, ya + 1, xb, yb + 1, MESA_N[0]); R.linea(xa, ya, xb, yb, MESA_N[6]); }
    for (const [x, y] of VENT1) { caja(x - 3, y - 4, x + 3, y + 3, MESA_N[0]); R.pset(x - 3, y - 4, MESA_N[3]); R.pset(x + 3, y - 4, MESA_N[3]); }
    for (let y = 94; y <= 120; y++) for (let x = 170; x <= 206; x++) if (enArco(x, y, 188, 30, 94, 120)) R.pset(x, y, K);
    dunasNoche(122, 2);
    // rizaduras de la arena a la luz de la luna, piedras y un rastro viejo de huellas hacia la boca
    for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < ri(CR1(x)) - 18) continue; const r = Math.sin(x * 0.21 + y * 0.9 + Math.sin(x * 0.04) * 2); if (r > 0.86) tiñe(x, y, H('#5e5e7a'), 0.55); else if (r < -0.9) tiñe(x, y, K, 0.3); }
    for (let k = 0; k < 16; k++) { const x = 40 + k * 9, y = ri(CR1(x)) + 6 - ri(k * 0.4); R.pset(x, y, H('#0e0e1a')); R.pset(x + 1, y, H('#0e0e1a')); R.pset(x + 3, y + 2, H('#0e0e1a')); R.pset(x, y - 1, H('#4a4c68')); }
    for (const [x, y, r] of [[60, 172, 4], [250, 168, 5], [300, 176, 3], [8, 166, 3]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#2a2434')); R.disco(x - 1, y - 1, r - 1, H('#3e3448')); R.pset(x - 2, y - r + 1, H('#6a6080')); }
    // matas secas en la duna de delante
    for (const [x, k] of [[24, 0], [96, 1], [282, 2], [306, 3]]) { const y = ri(CR1(x)) + 3; for (let i = 0; i < 6; i++) R.linea(x, y, x + ri(Math.cos(i * 0.6 + 0.4 + k) * 6), y - 2 - ri(Math.abs(Math.sin(i * 0.9 + k)) * 6), i % 2 ? H('#3a3446') : H('#2a2634')); }
  });
  const f = 0.85 + 0.15 * Math.sin(t * 7) * Math.sin(t * 3.1), nace = tramo(t, @gives@ - 0.2, @gives@ + 0.7);
  nubes(t, [[40, 24, 70, 2, 1], [210, 36, 90, 3.5, 2], [120, 30, 60, 5.5, 3]], NUBE_N, 44);
  for (let i = 0; i < 26; i++) { const x = ri(h2(i, 1, 1) * 318), y = ri(h2(i, 2, 1) * 96); if ((x > 276 && y < 46) || (x < 172 && y < 21) || (x >= 94 && x <= 306 && y >= CIMA1(x) - 1)) continue;
    const b = Math.sin(t * (1.5 + h2(i, 3, 1) * 3) + i); if (b > 0.3) { R.pset(x, y, H('#ffffff')); if (b > 0.85) { R.pset(x - 1, y, H('#8a92c8')); R.pset(x + 1, y, H('#8a92c8')); R.pset(x, y - 1, H('#8a92c8')); R.pset(x, y + 1, H('#8a92c8')); } } }
  fugaz(t, 9, 1);
  // la caravana diminuta por las dunas lejanas
  for (let k = 0; k < 5; k++) { const x = ri(8 + t * 3 + k * 7), y = ri(104 + Math.sin(x * 0.03 + 1) * 3 + Math.sin(x * 0.11) * 1.5) - 1; R.rect(x, y - 3, x, y, K); R.pset(x, y - 4, K); if (k === 2) R.pset(x + 1, y - 2, H('#e8a850')); }
  // la luz de la boca: late y se aviva en «gives birth»; las ventanas se encienden una a una
  luz(188, 112, 34 + nace * 8, ORO[3], (0.36 + nace * 0.14) * f);
  for (let y = 96; y <= 120; y++) for (let x = 174; x <= 202; x++) if (enArco(x, y, 188, 26, 96, 120)) R.pset(x, y, rmp(ORO, 2.6 + (y - 96) / 9 + f * 0.7 + nace * 0.8 + (Math.abs(x - 188) > 9 ? -0.8 : 0), x, y));
  // la cortina de la boca y las sombras que pasan dentro
  for (let y = 98; y <= 120; y++) { const xc = 177 + ri(Math.sin(t * 1.3 + y * 0.12) * 1.2); for (let x = 174; x <= xc; x++) if (enArco(x, y, 188, 26, 96, 120)) R.pset(x, y, (y + x) % 5 === 0 ? H('#5a2a1a') : H('#8a3a24')); }
  { const u = ((t + 0.4) % 2.6) / 2.6, x = ri(lerp(204, 178, u)); if (u < 0.9) for (let y = 104; y <= 120; y++) for (let i = 0; i < 4; i++) if (enArco(x + i, y, 188, 26, 96, 120)) R.pset(x + i, y, y < 107 && (i === 0 || i === 3) ? ORO[2] : ORO[1]); }
  for (const [x, y, k] of VENT1) { const on = k < 4 || t > @gives@ + (k - 4) * 0.35, g = on ? 0.5 + 0.5 * Math.sin(t * (2 + k * 0.3) + k) : 0;
    if (on) { R.rect(x - 2, y - 3, x + 2, y + 2, ORO[g > 0.3 ? 3 : 2]); R.rect(x - 1, y - 2, x + 1, y + 2, ORO[g > 0.6 ? 5 : 4]); luz(x, y, 7, ORO[3], 0.22); } }
  // dos Fremen diminutos con su candil suben por el sendero
  for (let k = 0; k < 2; k++) { const [x, y] = enSend(((t * 0.07 + k * 0.45) % 1)); const X = ri(x), Y = ri(y); R.rect(X, Y - 4, X + 1, Y, K); R.pset(X, Y - 5, K); R.pset(X + 2, Y - 3, ORO[5]); luz(X + 2, Y - 3, 5, ORO[4], 0.4); }
  // la luz derramada sobre la arena
  for (let y = 121; y < 152; y += 1) for (let x = 140; x < 240; x++) { const g = 1 - Math.hypot((x - 188) / 54, (y - 121) / 28); if (g > 0 && b4(x, y) < 0.7) tiñe(x, y, ORO[3], g * 0.3 * f * (0.8 + nace * 0.4)); }
  arenaVuela(t, 136, 176, 26, H('#4a4c68'), 1);
  // la Fremen del cántaro cruza la duna de delante hacia la boca y se para a mirarla
  const u = tramo(t, 0.1, P2 - 1.3), x = ri(lerp(-14, 132, u)), su = ri(CR1(x + 7)) + 2;
  const r = R.actor(PA.fremenMujer, x, su, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > @learned@ });
  jarra(r.mano[0] + 1, r.mano[1] + 2);
  lucie(x - 14 + Math.sin(t * 1.3) * 4, su - 34 + flota(t), t, { dir: 1, cara: t > @gives@ ? 'sonrisa' : 'normal', brillo: 0.85 });
};
// ── 2 · el pasillo frío y la puerta del cuarto: la luz se apaga en «dies» y vuelve doble en «hadn't seen» ────────
const p2 = (t) => {
  const s = { encuadre: 'cuarto', camara: 'puerta' };
  T.sietch(R, t, s);
  const baja = tramo(t, @dies@, @dies@ + 1.2) * (1 - tramo(t, @but@, @but@ + 0.9)), vuelve = tramo(t, @but@ + 0.2, @hadnt@);
  T.tinte(R, 0, 179, [4, 4, 16], 0.5 * baja);
  if (vuelve > 0) { luz(158, 124, 36, ORO[4], 0.3 * vuelve); luz(172, 132, 20, AZ[3], 0.34 * vuelve); }
  const sale = tramo(t, @dies@ + 0.3, @dies@ + 1.9), mx = ri(lerp(152, 124, sale)), ms = ri(lerp(151, 158, sale));
  if (t > @dies@ + 0.3) R.actor(PA.fremenMujer, mx, ms, t, { dir: t > @but@ + 0.3 ? 1 : -1, anda: sale > 0 && sale < 1, triste: t < @but@ + 0.3, sorpresa: t > @but@ + 0.5 && t < @hadnt@ + 0.5, sonrisa: t > @hadnt@ + 0.5 });
  ciego(78, 168, t, { dir: 1, triste: t > @dies@ + 0.5 && t < @hadnt@, sorpresa: t > @hadnt@ - 0.1 && t < @hadnt@ + 0.8, sonrisa: t > @hadnt@ + 0.8, salto: t > @hadnt@ - 0.1 && t < @hadnt@ + 0.1 ? 1 : 0 });
  T.sietchDelante(R, t, s);
  if (t > @hadnt@ - 0.1 && t < P3 - 0.2) R.icono('!', 88, ri(124 - pop(t, @hadnt@ - 0.1) * 6), H('#f8e070'), K, 2);
  lucie(110 + Math.sin(t * 1.4) * 3, 120 + flota(t), t, { dir: 1, cara: t < @dies@ ? 'normal' : t < @hadnt@ ? 'triste' : 'sorpresa', brillo: 0.9 - 0.55 * baja });
};
// ── 3 · el cuarto de las cunas: GAG, Atom prepara una cuna, se da la vuelta y al volver hay dos ──────────────────
const p3 = (t) => {
  const seg = tramo(t, @two@ - 0.25, @two@ + 0.35), s = { encuadre: 'cuarto', cunas: t > @two@ - 0.25 ? 2 : 1, segunda: seg };
  T.sietch(R, t, s);
  const lb = tramo(t, @boy@, @boy@ + 0.5), lg = tramo(t, @girl@, @girl@ + 0.5);
  if (lb > 0) luz(168, 132, 20, AZ[3], 0.55 * lb * (0.85 + 0.15 * Math.sin(t * 3)));
  if (lg > 0) luz(204, 132, 20, ORO[4], 0.55 * lg * (0.85 + 0.15 * Math.sin(t * 3 + 1)));
  // la mantita: en la mano de Atom y luego doblada en la primera cuna
  const deja = P3 + 0.75;
  if (t > deja) { const d = ri(Math.sin(t * 1.6) * 0.6); R.rect(158 + d, 133, 178 + d, 136, K); R.rect(159 + d, 134, 177 + d, 135, MANTA_A[3]); for (let x = 161; x < 177; x += 4) R.pset(x + d, 134, MANTA_A[4]); }
  // Atom: lleva la manta a la cuna, se da la vuelta silbando y al volverse… dos cunas
  const va = tramo(t, P3 + 0.05, P3 + 0.6), vuelta = tramo(t, P3 + 1.0, @two@ + 0.1), giro = t > @two@ + 0.35;
  const ax = ri(t < P3 + 1.0 ? lerp(118, 140, va) : lerp(140, 112, vuelta) + (giro ? tramo(t, @two@ + 0.4, @two@ + 0.9) * 14 : 0));
  const dirA = t < P3 + 0.95 ? 1 : giro ? 1 : -1;
  const pose = t < deja ? 'sostiene' : (t > @leto@ - 0.1 ? 'brazos' : (vuelta > 0 && vuelta < 1) || (giro && t < @two@ + 0.9) ? 'camina' : 'quieto');
  const ra = atomG(ax, 150, t, { pose, dir: dirA, cara: giro ? (t < @girl@ ? 'sorpresa' : 'sonrisa') : t > P3 + 1.0 ? 'guino' : 'normal', habla: t > @leto@ - 0.1 && Math.sin(t * 9) > 0 ? 1 : 0 });
  if (t < deja) { const [mx, my] = ra.mano; R.rect(mx - 4, my - 2, mx + 4, my + 1, K); R.rect(mx - 3, my - 1, mx + 3, my, MANTA_A[3]); R.pset(mx - 2, my - 1, MANTA_A[4]); }
  if (t > P3 + 1.1 && t < @two@ - 0.1) for (let k = 0; k < 3; k++) { const u = ((t * 1.2 + k * 0.33) % 1); R.pset(ax - 6 - ri(u * 8), 132 - ri(u * 10) - k, H('#e8d8a0')); }
  // la nodriza Fremen junto a la lámpara: sonríe y señala las cunas al decir sus nombres
  R.actor(PA.fremenMujer, 52, 150, t, { dir: 1, sonrisa: t > @boy@, sorpresa: t > @two@ && t < @boy@, dedo: t > @leto@ - 0.2, habla: t > @leto@ - 0.2 && t < P4 - 0.2 && Math.sin(t * 8) > 0 });
  T.sietchDelante(R, t, s);
  if (giro && t < @girl@) R.icono('!', ax + 4, ri(118 - pop(t, @two@ + 0.35) * 5), H('#f8e070'), K, 2);
  // los destellos en los nombres: Leto (la azul) y Ganima (la dorada)
  for (const [tt, x, c] of [[@leto@, 168, AZ[4]], [@gany@, 204, ORO[6]]]) { const u = tramo(t, tt, tt + 0.7); if (u > 0 && u < 1) { const r = 3 + u * 6; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + u; R.pset(ri(x + Math.cos(a) * r), ri(124 + Math.sin(a) * r * 0.6), c); } R.pset(x, 124 - ri(u * 8), c); } }
};
// ── 4 · inserto: las dos cunas desde arriba; el halo de la visión solo en la niña; la mano de Paul va al niño ────
const ALF = pal(['#3a1410', '#7a2a20', '#9a3424', '#3a6aa8', '#e8c060', '#f0e0b0']);
const p4 = (t) => {
  fijo('p4', () => {
    // el suelo de losas de roca a la luz de la lámpara
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor((x + (Math.floor(y / 22) % 2) * 17) / 34), cy = Math.floor(y / 22), jx = (x + (Math.floor(y / 22) % 2) * 17) % 34, jy = y % 22;
      let v = 2.6 - Math.hypot(x - 40, y - 40) / 150 + (h2(cx, cy, 5) - 0.5) * 1.1 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.8; if (jx === 0 || jy === 0) v -= 2; else if (jx === 1 || jy === 1) v += 0.4; if (h2(x, y, 6) > 0.98) v -= 1; R.pset(x, y, rmp(PIEDRA, v, x, y)); }
    // la alfombra de rombos con su orla y flecos
    for (let y = 34; y <= 160; y++) for (let x = 30; x <= 296; x++) { const u = Math.abs(((x - 30) % 16) - 8) + Math.abs(((y - 34) % 12) - 6), orla = x < 36 || x > 290 || y < 40 || y > 154;
      let c = orla ? ((x + y) % 4 < 2 ? ALF[4] : ALF[2]) : u < 3 ? ALF[3] : u < 5 ? ALF[4] : u < 6 ? ALF[1] : ALF[2]; if (b4(x, y) < Math.hypot(x - 40, y - 40) / 600) c = mez(c, K, 0.35); R.pset(x, y, c); }
    for (let x = 32; x <= 294; x += 3) { R.linea(x, 30, x, 33, ALF[5]); R.linea(x, 161, x, 164, ALF[5]); }
    // cojines, el plato de dátiles, la manta doblada y el pájaro de madera
    for (const [x, y, c] of [[12, 120, '#7a2a6a'], [300, 106, '#2e6a4a']]) { for (let j = -10; j <= 10; j++) for (let i = -9; i <= 9; i++) { const d = (i / 9) ** 2 + (j / 10) ** 2; if (d <= 1) R.pset(x + i, y + j, d > 0.85 ? K : rmp([mez(hex(c), H('#ffffff'), 0.3), hex(c), mez(hex(c), K, 0.45)], 1 + (i + j) / 12 + (Math.abs(i) < 1 || Math.abs(j) < 1 ? 0.6 : 0), x + i, y + j)); } R.pset(x, y, ORO[4]); }
    R.disco(48, 150, 11, K); R.disco(48, 150, 10, H('#b8743a')); R.disco(48, 150, 7, H('#8a4a24'));
    for (let k = 0; k < 9; k++) { const a = k * 0.7, rr = 2 + (k % 3) * 2, x = ri(48 + Math.cos(a) * rr), y = ri(150 + Math.sin(a) * rr); R.rect(x - 1, y, x + 1, y + 1, H('#4a2010')); R.pset(x - 1, y, H('#8a4a20')); }
    R.rect(132, 150, 164, 160, K); R.rect(133, 151, 163, 159, H('#e8dcc0')); for (let x = 135; x < 163; x += 5) R.linea(x, 151, x, 159, H('#c8b890')); R.rect(133, 154, 163, 155, H('#3a6aa8'));
    R.rect(276, 146, 292, 152, K); R.rect(277, 147, 291, 151, MAD[3]); R.poligono([[279, 146], [286, 140], [289, 146]], MAD[4]); R.pset(288, 148, K);
    // la lámpara de barro arriba a la izquierda (sobre una piedra)
    R.disco(30, 56, 9, K); R.disco(30, 56, 8, PIEDRA[3]); R.rect(24, 52, 36, 58, K); R.rect(25, 53, 35, 57, H('#b8743a')); R.rect(36, 54, 39, 56, H('#8a4a24'));
    // las dos cunas: la niña (dorada) a la izquierda y el niño (azul) a la derecha
    cunaArriba(112, 96, 46, 30, MANTA_O); cunaArriba(222, 100, 44, 28, MANTA_A);
  });
  const f = 0.85 + 0.15 * Math.sin(t * 8) * Math.sin(t * 3.3);
  luz(40, 54, 60, ORO[4], 0.3 * f); R.poligono([[38, 55], [41, 55], [39 + ri(Math.sin(t * 9)), 49]], H('#f08a30')); R.pset(39, 53, H('#fff0a0'));
  // el haz de luna en diagonal con su polvo
  for (let k = 0; k < 16; k++) { const u = (t * 0.05 + h2(k, 1, 61)) % 1, x = ri(lerp(170, 300, u) + h2(k, 2, 61) * 30), y = ri(lerp(0, 170, u)); tiñe(x, y, H('#c8d8ff'), 0.5); }
  // las luces de los bebés
  const toca = tramo(t, @under@ - 0.2, @under@ + 0.3);
  const res = (k) => 0.85 + 0.15 * Math.sin(t * 2.2 + k);
  luz(112, 96, 30, ORO[4], 0.32 * res(0)); R.halo(112, 96, 11 * res(0), GLOW_O, 1.1);
  luz(222, 100, 26 + toca * 10, AZ[3], (0.24 + toca * 0.3) * res(1)); R.halo(222, 100, (9 + toca * 4) * res(1), GLOW_A, 1.1);
  // el halo de la visión: solo en la cuna de la niña; se aviva en «girl» y se rompe en «understands»
  const viva = 0.5 + 0.5 * tramo(t, @girl2@ - 0.3, @girl2@ + 0.3), rompe = tramo(t, @under@, @under@ + 0.9);
  for (let k = 0; k < 30; k++) { const a = k / 30 * Math.PI * 2 + t * 0.6, rr = 1 + rompe * 0.9 * (0.6 + h2(k, 3, 62) * 0.8), x = ri(112 + Math.cos(a) * 54 * rr), y = ri(96 + Math.sin(a) * 37 * rr);
    if (rompe > 0 && h2(k, 4, 62) < rompe) continue; if ((k + Math.floor(t * 6)) % 3 === 0) continue; R.rect(x - 1, y - 1, x + 1, y + 1, ORO[3]); R.pset(x, y, viva > 0.8 ? ORO[6] : ORO[5]); if (viva > 0.8) { R.pset(x + 1, y, ORO[5]); R.pset(x, y - 1, ORO[5]); } }
  if (rompe < 1) for (let k = 0; k < 6; k++) { const a = t * 1.3 + k, x = ri(112 + Math.cos(a) * 30), y = ri(96 + Math.sin(a * 1.3) * 18); R.pset(x, y, ORO[6]); }
  // la mano de Paul (manga negra) entra desde abajo a la derecha y toca la cuna del niño
  const m = tramo(t, P4 + 1.4, @under@ - 0.1), w = [ri(lerp(334, 280, m)), ri(lerp(150, 132, m))];
  if (m > 0) T.brazo(R, 340, 166, w[0], w[1], '#2a2430', -1, {});
  lucie(176 + Math.sin(t * 1.2) * 5, 30 + flota(t), t, { dir: -1, cara: t > @under@ ? 'sorpresa' : 'normal', brillo: 0.8 });
  if (t > @under@ + 0.1 && t < P5 - 0.2) R.icono('?', 108, ri(50 - pop(t, @under@ + 0.1) * 5), ORO[5], K, 2);
};
// ── 5 · la cúpula de roca: las venas de luz (el futuro) se apagan alrededor de Paul ciego hasta dejarlo a oscuras ──
const ROCA_N = pal(['#050509', '#0b0a12', '#13111c', '#1c1826', '#262032', '#322a3e', '#40364a', '#54465a']);
let VENAS = null;
const venas = () => { if (VENAS) return VENAS; VENAS = []; let sem = 913; const rnd = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  const semillas = [[8, 30], [30, 8], [70, 24], [120, 6], [176, 20], [226, 10], [262, 36], [300, 60], [312, 104], [290, 140], [250, 120], [210, 60], [160, 52], [196, 96], [240, 168], [300, 176], [12, 96], [4, 150], [40, 176], [150, 176], [180, 140], [130, 90], [60, 70], [96, 40]];
  for (const [sx, sy] of semillas) { const pts = []; let x = sx, y = sy; for (let i = 0; i < 300; i++) { pts.push([x, y]); const dx = 96 - x, dy = 150 - y, d = Math.hypot(dx, dy); if (d < 3) break; const a = Math.atan2(dy, dx) + (rnd() - 0.5) * 1.6; x += Math.cos(a) * 2; y += Math.sin(a) * 2; }
    let L = 0; const dd = [0]; for (let i = pts.length - 2; i >= 0; i--) { L += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); dd.unshift(L); }
    VENAS.push({ pts, dd, L }); }
  return VENAS; };
const p5 = (t) => {
  fijo('p5', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.hypot((x - 110) / 1.6, y - 150), est = Math.floor(r / 9 + ns(x * 0.05, y * 0.05) * 1.5), fl = (r / 9 + ns(x * 0.05, y * 0.05) * 1.5) % 1;
      let v = 4.1 - r / 130 + (ns(x * 0.15, y * 0.12) - 0.5) * 1.3 + (h2(est, 1, 7) - 0.5) * 0.6; if (fl < 0.08) v -= 1.2; else if (fl < 0.16) v += 0.4;
      if (y > 146) v = 2.6 + (ns(x * 0.3, y * 0.5) - 0.5) * 1.4 - Math.abs(x - 110) / 260 + (h2(x >> 2, y >> 1, 8) > 0.85 ? 0.9 : 0);
      if (x < 22 || x > 298) v = 1 + (ns(x * 0.3, y * 0.1) - 0.5) * 1.2 + (x === 22 || x === 298 ? 1.5 : 0);
      if (h2(x, y, 9) > 0.988) v += 1.3; R.pset(x, y, rmp(ROCA_N, v, x, y)); }
    // el respiradero con estrellas
    R.disco(214, 10, 6, K); R.disco(214, 10, 5, NOCHE[2]); R.pset(212, 9, H('#ffffff')); R.pset(216, 12, H('#a8b0e0'));
    // guijarros del suelo
    for (let k = 0; k < 40; k++) { const x = ri(24 + h2(k, 1, 70) * 272), y = ri(152 + h2(k, 2, 70) * 26), r = 1 + ri(h2(k, 3, 70) * 2); R.disco(x, y, r, ROCA_N[1]); R.pset(x - 1, y - 1, ROCA_N[5]); }
    // los surcos de las venas (lo que queda cuando se apagan)
    for (const v of venas()) for (const [x, y] of v.pts) { R.pset(ri(x), ri(y), ROCA_N[1]); R.pset(ri(x), ri(y) + 1, ROCA_N[4]); }
  });
  const L = tramo(t, P5 + 0.15, @over@), oscuro = tramo(t, @over@, @over@ + 0.8), ciegoU = tramo(t, @truly@ - 0.3, @blind@ + 0.3);
  // el haz de luna que baja del respiradero (se apaga a la mitad en «truly blind»)
  const hz = (1 - 0.45 * ciegoU) * (0.8 + 0.2 * Math.sin(t * 1.3));
  for (let y = 14; y < 160; y++) { const u = (y - 14) / 146, xc = lerp(214, 118, u), w = 4 + u * 18; for (let x = ri(xc - w); x <= ri(xc + w); x++) if (b4(x, y) < 0.42 * hz * (1 - Math.abs(x - xc) / w)) tiñe(x, y, H('#8a98d8'), 0.35); }
  // las venas encendidas (de la punta hacia Paul se apagan) con chispas que corren hacia él
  for (const v of venas()) { const lim = v.L * (1 - L) * 1.05; for (let i = 0; i < v.pts.length; i++) { if (v.dd[i] > lim) continue; const [x, y] = v.pts[i], X = ri(x), Y = ri(y), q = (Math.sin(t * 6 - v.dd[i] * 0.2) + 1) / 2;
      R.pset(X, Y, q > 0.8 ? ORO[6] : ORO[4]); R.pset(X, Y + 1, ORO[2]); if (i % 3 === 0) tiñe(X, Y - 1, ORO[3], 0.4); } }
  if (L < 1) luz(96, 150, 26 * (1 - L) + 6, ORO[4], 0.45 * (1 - L));
  T.tinte(R, 0, 179, [2, 2, 8], 0.2 * oscuro);
  for (let k = 0; k < 10; k++) { const y = ri(30 + ((h2(k, 1, 71) * 120 + t * 4) % 120)), u = (y - 14) / 146, x = ri(lerp(214, 118, u) + (h2(k, 2, 71) - 0.5) * 20 * u); tiñe(x, y, H('#c8d0ff'), 0.6 * hz); }
  const busca = t > @over@ + 0.1 && t < @truly@ - 0.4, dirP = busca ? (Math.floor((t - @over@) * 1.8) % 2 ? -1 : 1) : 1;
  ciego(88, 152, t, { dir: dirP, brazos: t < P5 + 1.6, sorpresa: t > @over@ - 0.2 && t < @over@ + 0.9, triste: t > @truly@ - 0.2 });
  lucie(128 + Math.sin(t * 1.1) * 4, 112 + flota(t), t, { dir: -1, brillo: 0.9 - 0.65 * tramo(t, @over@, @blind@), cara: t > @over@ ? 'triste' : 'normal' });
};
// ── 6 · el laboratorio tleilaxu: Bijaz le sella a Hayt la orden roja (la trampa que llevaba dentro) ─────────────
const p6 = (t) => {
  const o = { encuadre: 'laboratorio' };
  T.conspiracion(R, t, o);
  const llega = tramo(t, P6 + 0.2, @hayt@ - 0.2), bx = ri(lerp(226, 166, llega)), vuela = tramo(t, @order@ - 0.45, @order@);
  const golpe = t > @order@ && t < @order@ + 0.18;
  const rh = R.actor(PA.hayt, 132, 150, t, { dir: 1, salto: golpe ? 1 : 0, sorpresa: t > @order@ && t < @order@ + 0.7 });
  const rb = R.actor(PA.bijaz, bx, 150, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: t < @order@ - 0.45 && llega > 0.6 ? true : undefined, dedo: t > @order@ - 0.45 && t < @order@ + 0.6, habla: t > @trap@ && t < @order@ - 0.5 && Math.sin(t * 9) > 0, sonrisa: t > @order@ + 0.6 });
  const [hx, hy] = rh.cabeza;
  if (t < @order@) { const [sx, sy] = t < @order@ - 0.45 ? rb.mano : [lerp(rb.mano[0], hx, ease(vuela)), lerp(rb.mano[1], hy + 4, ease(vuela)) - Math.sin(vuela * Math.PI) * 10]; if (llega > 0.6) { luz(sx, sy, 10, ROJO[3], 0.4); sello(ri(sx), ri(sy) - 2, 4 - ri(vuela * 2), t, 1); } }
  else { const g = 0.5 + 0.5 * Math.sin(t * 8); if (golpe || t < @order@ + 0.35) luz(hx, hy + 4, 26, ROJO[3], 0.5); R.pset(hx, hy + 1, ROJO[g > 0.5 ? 4 : 3]); R.pset(hx + 1, hy + 1, ROJO[3]); R.pset(hx, hy, ROJO[2]); luz(hx, hy + 1, 5, ROJO[3], 0.3 * g); }
  // los ojos de metal que destellan
  if (Math.sin(t * 4) > 0.8 || golpe) { R.pset(hx + 3, hy + 5, H('#ffffff')); R.pset(hx + 4, hy + 4, H('#d0e0ff')); }
  // «to kill Paul»: la X roja sobre su cabeza
  if (t > @kill@ - 0.1 && t < P7 - 0.1) R.icono('X', hx - 4, ri(hy - 14 - pop(t, @kill@ - 0.1) * 4), ROJO[3], K, 2);
  T.conspiracionDelante(R, t, o);
  lucie(236 + Math.sin(t * 1.2) * 4, 92 + flota(t), t, { dir: -1, cara: t > @trap@ ? 'sorpresa' : 'normal', brillo: 0.75 });
};
// ── 7 · inserto: la mesa de piedra; la lámpara de Chani se apaga, la orden se enciende y el golpe la rompe ──────
const p7 = (t) => {
  fijo('p7', () => {
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const est = (y + ri(Math.sin(x * 0.04) * 3)) % 11; let v = 3.6 - Math.hypot(x - 120, y - 100) / 120 + (ns(x * 0.12, y * 0.1) - 0.5) * 1.1; if (est === 0) v -= 1.1; else if (est === 1) v += 0.4; if (h2(x, y, 3) > 0.985) v -= 1.2; R.pset(x, y, rmp(PIEDRA, v, x, y)); }
    // el nicho tallado con un cántaro y el friso de triángulos
    for (let y = 22; y <= 92; y++) for (let x = 236; x <= 296; x++) if (enArco(x, y, 266, 56, 22, 92)) R.pset(x, y, rmp(PIEDRA, 1.2 + (y - 22) / 60 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.6, x, y));
    R.rect(252, 62, 270, 92, K); R.rect(253, 63, 269, 91, H('#a8643a')); R.rect(253, 63, 256, 91, H('#d08a50')); R.rect(258, 56, 264, 62, K); R.rect(259, 57, 263, 61, H('#8a4a24'));
    for (let x = 0; x < 320; x += 8) { R.poligono([[x, 29], [x + 8, 29], [x + 4, 23]], PIEDRA[2]); R.linea(x, 30, x + 8, 30, PIEDRA[1]); }
    // la mesa: tablero (y 118–132) y su canto
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const top = y < 132; let v = top ? 4.4 - (132 - y) * 0.04 + (ns(x * 0.1, y * 0.5) - 0.5) * 0.8 : 2.2 - (y - 132) * 0.025 + (ns(x * 0.2, y * 0.06) - 0.5) * 0.9 + ((x * 3 + y * 5) % 17 === 0 ? -0.8 : 0);
      if (y === 118) v = 6; if (y === 132) v = 0.5; if (y === 133) v = 2.6; R.pset(x, y, rmp(PIEDRA, v, x, y)); }
    // la jarra de agua, la tela doblada, el cuenco de dátiles y el halcón de madera
    for (let y = 92; y <= 124; y++) { const w = y < 100 ? 4 : 4 + Math.sin((y - 100) / 24 * Math.PI) * 8; for (let x = ri(30 - w); x <= ri(30 + w); x++) R.pset(x, y, Math.abs(x - 30) > w - 1 ? K : rmp(pal(['#5a2a14', '#8a4a24', '#b8743a', '#e0a060']), 2 - (x - 30) / w * 1.4, x, y)); }
    R.rect(50, 118, 84, 125, K); R.rect(51, 119, 83, 124, H('#e8dcc0')); R.rect(51, 121, 83, 122, H('#3a6aa8')); R.rect(51, 119, 83, 119, H('#fff4e0'));
    R.rect(262, 114, 300, 124, K); R.rect(263, 115, 299, 123, H('#8a5a30')); R.rect(264, 115, 298, 116, H('#b8864a'));
    for (let k = 0; k < 9; k++) { const x = 266 + k * 4, y = 112 - (k % 2); R.rect(x, y, x + 2, y + 2, H('#4a2010')); R.pset(x, y, H('#8a4a20')); }
    // el tapete tejido que cuelga por el canto, rosetas talladas y una cesta debajo
    for (let y = 133; y <= 164; y++) for (let x = 132; x <= 188; x++) { const fl = y > 160 ? ((x % 3) === 0 ? H('#e8c060') : null) : null; if (y > 160 && !fl) continue; const u = Math.abs(((x - 132) % 14) - 7) + Math.abs(((y - 133) % 12) - 6);
      R.pset(x, y, fl || (x === 132 || x === 188 ? K : u < 3 ? H('#3a6aa8') : u < 5 ? H('#e8c060') : (y % 3 ? H('#9a3424') : H('#7a2a20')))); }
    for (const x of [40, 90, 236, 286]) { R.disco(x, 152, 7, PIEDRA[1]); R.disco(x, 152, 5, PIEDRA[4]); for (let k = 0; k < 6; k++) { const a = k * 1.047; R.pset(ri(x + Math.cos(a) * 3), ri(152 + Math.sin(a) * 3), PIEDRA[1]); } R.pset(x, 152, PIEDRA[6]); }
    for (let y = 166; y < 180; y++) for (let x = 200; x < 262; x++) { const e = y === 166 || x === 200 || x === 261; R.pset(x, y, e ? K : ((x >> 1) + (y >> 1)) & 1 ? MIM[3] : MIM[2]); }
    // el estante tallado con tarros, arriba a la izquierda (fuera de la barra del año)
    R.rect(16, 52, 104, 55, K); R.rect(17, 52, 103, 53, PIEDRA[6]);
    for (const [x, h, c] of [[26, 14, '#a8643a'], [44, 10, '#3a6aa8'], [60, 16, '#8a4a24'], [80, 12, '#c8a070'], [96, 8, '#6a8a5a']]) { R.rect(x - 5, 52 - h, x + 5, 51, K); R.rect(x - 4, 53 - h, x + 4, 51, hex(c)); R.rect(x - 4, 53 - h, x - 3, 51, mez(hex(c), H('#ffffff'), 0.3)); }
    // el pie de bronce del sello
    R.rect(204, 112, 210, 124, K); R.rect(205, 113, 209, 123, H('#b88a3a')); R.rect(196, 122, 218, 126, K); R.rect(197, 123, 217, 125, H('#e8c060'));
  });
  const f = 0.85 + 0.15 * Math.sin(t * 8) * Math.sin(t * 3.1), apaga = tramo(t, @chanid@, @died@ + 0.15);
  T.tinte(R, 0, 179, [8, 6, 18], 0.38 * apaga);
  // la lámpara de Chani (barro) y su llama
  R.rect(94, 112, 124, 125, K); R.rect(95, 113, 123, 124, H('#b8743a')); R.rect(95, 113, 123, 114, H('#e0a060')); R.rect(95, 121, 123, 124, H('#8a4a24')); R.rect(103, 109, 113, 112, K); R.rect(104, 110, 112, 111, H('#5a2a14'));
  R.rect(124, 115, 130, 121, K); R.rect(124, 116, 129, 120, H('#8a4a24')); for (let x = 98; x < 122; x += 6) R.pset(x, 118, H('#e8c060'));
  if (apaga < 1) { const h = ri(7 * (1 - apaga)) + 1; luz(126, 110, 46 * (1 - apaga * 0.8), ORO[4], 0.42 * f * (1 - apaga)); R.poligono([[124, 115], [129, 115], [126 + ri(Math.sin(t * 9)), 114 - h]], H('#f08a30')); R.poligono([[125, 115], [128, 115], [126, 115 - ri(h * 0.6)]], H('#ffd060')); R.pset(126, 114, H('#fff0a0')); }
  else for (let k = 0; k < 8; k++) { const u = ((t - @died@) * 0.8 + k * 0.12) % 1; tiñe(126 + Math.sin(u * 8 + k) * 3, 112 - u * 30, H('#9a9aa8'), 0.5 * (1 - u)); }
  // el hilo rojo de la lámpara al sello: se enciende desde la lámpara cuando se apaga
  const corre = tramo(t, @died@ + 0.05, @died@ + 0.8), carga = t > @died@ + 0.8;
  for (let i = 0; i <= 60; i++) { const u = i / 60, x = ri(lerp(108, 204, u)), y = ri(lerp(122, 116, u) + Math.sin(u * Math.PI) * 9); R.pset(x, y, u < corre ? (Math.sin(t * 14 - i * 0.5) > 0.3 ? ROJO[4] : ROJO[3]) : ROJO[1]); }
  // la jaula de alambre y el sello que late, tiembla y se rompe
  const tiem = t > @blow@ && t < @breaks@ ? ri(Math.sin(t * 50) * 1.5) : 0, raja = tramo(t, @breaks@, @breaks@ + 0.4), parte = tramo(t, @cond@, @cond@ + 0.6), g = carga ? 0.5 + 0.5 * Math.sin(t * (t > @blow@ ? 16 : 8)) : 0;
  const cx = 207 + tiem, cy = 98;
  if (carga && parte < 1) luz(cx, cy, 30, ROJO[3], 0.35 * g + 0.15);
  if (parte <= 0) sello(cx, cy, 12, t, g);
  else for (const [qx, qy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const dx = ri(qx * parte * 14), dy = ri(qy * parte * 4 + parte * parte * 20); const x0 = cx + dx, y0 = cy + dy; for (let j = 0; j <= 11; j++) for (let i = 0; i <= 11; i++) { const X = x0 + qx * i, Y = y0 + qy * j; if (Math.hypot(i, j) > 12) continue; R.pset(X, Y, Math.hypot(i, j) > 11 ? K : (i + j) % 5 === 0 ? ROJO[3] : ROJO[1]); } }
  if (raja > 0 && parte <= 0) { let x = cx - 8, y = cy - 6; for (let i = 0; i < ri(raja * 10); i++) { const nx = x + 2, ny = y + (i % 2 ? 2 : -1); R.linea(x, y, nx, ny, K); x = nx; y = ny; } R.linea(cx + 2, cy - 11, cx - 1, cy + ri(raja * 10) - 4, K); }
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, rot = t * 0.4, xw = ri(cx + Math.cos(a + rot) * 15), roto = raja > 0.6 && k % 2 === 0; R.linea(xw, 84, xw, roto ? 92 : 112, H('#c8a050')); if (roto) R.pset(xw + 1, 93, H('#e8c060')); }
  R.linea(cx - 15, 84, cx + 15, 84, H('#e8c060')); R.linea(cx - 15, 112, cx + 15, 112, H('#a8783a'));
  // la lucecita dorada que sale de los pedazos (Duncan que vuelve)
  if (parte > 0) { const y = ri(lerp(98, 46, parte)); R.halo(cx, y, 6 + parte * 3, GLOW_O, 1.2); R.pset(cx, y, ORO[6]); }
  // Atom, de pie en la mesa: mira la lámpara, se tapa con «the blow» y señala la luz
  atomG(70, 118, t, { dir: 1, pose: t > @cond@ + 0.1 ? 'senala' : t > @blow@ && t < @breaks@ + 0.2 ? 'brazos' : 'quieto', cara: t > @cond@ ? 'sorpresa' : t > @died@ ? 'triste' : 'normal' });
};
// ── 8 · la terraza de roca al alba: Hayt se para ante Paul y de él sale Duncan entero, con sus recuerdos ────────
const ALBA = pal(['#141838', '#1e2250', '#2e2a62', '#4a3672', '#74447a', '#a8567a', '#d8706e', '#f09a70', '#f8c27e', '#ffe2a8']);
const p8 = (t) => {
  fijo('p8', () => {
    for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { let v = 0.4 + (y / 104) * 8.2 + (h2(x >> 1, y >> 1, 2) - 0.5) * 0.4 + Math.max(0, 1 - Math.hypot(x - 244, y - 104) / 90) * 1.2; let c = rmp(ALBA, v, x, y);
      if (y < 50 && h2(x, y, 4) > 0.994) c = H('#e0e0ff'); R.pset(x, y, c); }
    R.disco(244, 104, 13, H('#ffe8a0')); R.disco(244, 104, 11, H('#fff4c8'));
    for (let x = 0; x < 320; x++) { const y0 = ri(100 + Math.sin(x * 0.04 + 2) * 3 + Math.sin(x * 0.13) * 1.2); for (let y = y0; y < 122; y++) R.pset(x, y, rmp(pal(['#3a2030', '#5a3038', '#8a4a40', '#c07050', '#e8a070']), 1.6 + (y === y0 ? 2.4 : y === y0 + 1 ? 1.4 : 0) + Math.sin(x * 0.3 + y) * 0.3 - (y - y0) * 0.03 + (x > 200 ? 0.5 : 0), x, y)); }
    // la terraza: losas de roca (y 122–180), el pretil a la derecha y la puerta tallada del sietch a la izquierda
    for (let y = 122; y < 180; y++) { const z = 40 / (y - 112), fila = Math.floor(z * 5); for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / (y - 110) * 2.2 + 40), jun = Math.abs((z * 5) % 1) < 0.07 * (y / 140) || Math.abs(((x - 160) / (y - 110) * 2.2 + 40) % 1) < 0.05;
      let v = 2.4 + (x / 320) * 1.6 + (h2(col, fila, 9) - 0.5) * 0.9 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.6; if (jun) v -= 1.6; R.pset(x, y, rmp(SILL, v, x, y)); } }
    for (let y = 106; y < 140; y++) for (let x = 232; x < 320; x++) { const top = y < 110; let v = top ? 6 : 3.2 + (ns(x * 0.2, y * 0.2) - 0.5) * 1.2 + ((y - 110) % 8 === 0 ? -1.4 : 0) + ((x + ((y - 110) >> 3) * 9) % 18 === 0 ? -1.4 : 0); if (x === 232) v = 0.5; R.pset(x, y, rmp(SILL, v, x, y)); }
    for (let y = 0; y < 150; y++) for (let x = 0; x < 72; x++) { const borde = 72 - x; let v = 1.6 + (ns(x * 0.15, y * 0.1) - 0.5) * 1.3 + (borde < 3 ? 2.2 : 0) + ((y + ri(Math.sin(x * 0.2) * 2)) % 10 === 0 ? -0.8 : 0); if (y > 140) v -= 0.5; R.pset(x, y, rmp(PIEDRA, v, x, y)); }
    for (let y = 74; y <= 146; y++) for (let x = 14; x <= 58; x++) if (enArco(x, y, 36, 40, 74, 146)) R.pset(x, y, rmp(ORO, 1.6 + (y - 74) / 30, x, y));
    // la planta del desierto en su tinaja y el odre colgado
    R.rect(84, 132, 100, 148, K); R.rect(85, 133, 99, 147, H('#a8643a')); R.rect(85, 133, 88, 147, H('#d08a50'));
    for (let i = 0; i < 9; i++) R.linea(92, 132, 92 + ri(Math.cos(i * 0.7 + 1.2) * 10), 132 - 6 - ri(Math.abs(Math.sin(i * 1.1)) * 10), i % 2 ? H('#5a7a3a') : H('#3a5a2a'));
    R.linea(66, 40, 66, 52, H('#4a3020')); R.disco(66, 60, 7, K); R.disco(66, 60, 6, H('#7a5a3a')); R.disco(64, 58, 3, H('#9a7a50'));
  });
  R.recorte([73, 0, 319, 99]);
  nubes(t, [[30, 30, 80, 2.5, 4], [180, 56, 100, 4, 5], [90, 76, 70, 6, 6]], pal(['#5a3a6a', '#b0607a', '#f0a088']), 98);
  // la cortina de la puerta, los pájaros que cruzan el alba y la arena que vuela sobre el pretil
  for (let y = 76; y <= 146; y++) { const xc = 26 + ri(Math.sin(t * 1.1 + y * 0.1) * 1.5); for (let x = 16; x <= xc; x++) if (enArco(x, y, 36, 40, 74, 146)) R.pset(x, y, (y % 9 < 2) ? H('#e8c060') : H('#7a2a20')); }
  for (let k = 0; k < 3; k++) { const x = ri(((t * (10 + k * 3) + k * 90) % 360) - 20), y = ri(36 + k * 10 + Math.sin(t * 2 + k) * 3), a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x - 2, y - a, K); R.pset(x - 1, y, K); R.pset(x, y + 1, K); R.pset(x + 1, y, K); R.pset(x + 2, y - a, K); }
  arenaVuela(t, 104, 120, 14, H('#f0c090'), 3); R.recorte(null);
  // Hayt da dos pasos y se para; en «whole» le envuelve la luz y sale Duncan
  const llega = tramo(t, P8 + 0.1, @whole@ - 0.3), hx = ri(lerp(212, 186, llega)), sale = t > @duncan@, parpa = t > @duncan@ - 0.3 && t < @duncan@ + 0.2 && Math.floor(t * 16) % 2;
  const anillo = tramo(t, @whole@, @duncan@ + 0.4);
  if (anillo > 0 && anillo < 1) { R.halo(hx + 7, 140, 10 + anillo * 22, [H('#f8e8b0'), H('#fff4d8'), H('#ffffff')], 1.2 * (1 - anillo)); }
  ciego(104, 162, t, { dir: 1, sonrisa: t > @duncan@ + 0.5, dedo: t > @duncan@ + 1.0 && t < @mems@ + 0.4, sorpresa: t > @whole@ && t < @duncan@ + 0.5 });
  const rd = R.actor(sale && !parpa ? PA.duncan : PA.hayt, hx, 162, t, { dir: -1, anda: llega > 0 && llega < 1, sonrisa: sale, habla: t > @duncan@ + 1.4 && t < @mems@ && Math.sin(t * 9) > 0 });
  // los recuerdos: tres burbujas (el mar de Caladan, el castillo y el chico) que suben de su cabeza
  const [dx, dy] = rd.cabeza;
  [[-26, -36, 0], [0, -48, 1], [26, -36, 2]].forEach(([ox, oy, k]) => { const u = tramo(t, @mems@ + k * 0.25 - 0.6, @mems@ + k * 0.25), x = ri(dx + ox * ease(u)), y = ri(dy + oy * ease(u) + Math.sin(t * 2 + k) * 1.5); if (u <= 0) return;
    const r = ri(3 + u * 6); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d <= r) tiñe(x + i, y + j, d > r - 1 ? H('#ffffff') : H('#f0e8ff'), d > r - 1 ? 0.9 : 0.35); }
    if (u > 0.8) { if (k === 0) { R.rect(x - 4, y, x + 4, y + 3, H('#3a6aa8')); R.linea(x - 4, y, x - 2, y - 2, H('#ffffff')); R.linea(x - 2, y - 2, x, y, H('#ffffff')); R.linea(x, y, x + 2, y - 2, H('#ffffff')); R.linea(x + 2, y - 2, x + 4, y, H('#ffffff')); }
      else if (k === 1) { R.rect(x - 3, y - 3, x + 3, y + 4, H('#6a6e72')); R.rect(x - 3, y - 5, x - 2, y - 3, H('#6a6e72')); R.rect(x + 2, y - 5, x + 3, y - 3, H('#6a6e72')); R.pset(x, y + 1, H('#f8d070')); R.linea(x, y - 3, x, y - 8, K); R.rect(x + 1, y - 8, x + 3, y - 6, H('#2e6a4a')); }
      else { R.rect(x - 1, y - 4, x + 1, y - 2, H('#e0b090')); R.rect(x - 1, y - 5, x + 1, y - 5, H('#1c1424')); R.rect(x - 2, y - 1, x + 2, y + 3, H('#2e6a4a')); R.pset(x, y, H('#e8c060')); } } });
  lucie(150 + Math.sin(t * 1.3) * 4, 112 + flota(t), t, { dir: 1, cara: t > @duncan@ ? 'sonrisa' : 'normal', brillo: 0.8 });
};
// ── 9 · los tanques: Scytale ofrece; en el del centro se forma una Chani de luz, y en el de la derecha, Duncan ──────
const LUZ_O = pal(['#6a4220', '#c08a3a', '#f0c060', '#ffe8a0', '#fffbe8']);
const LUZ_V = pal(['#1a4a3a', '#3a8a6a', '#7ad0a8', '#c8f8e0', '#f0fff8']);
const p9 = (t) => {
  const o = { encuadre: 'laboratorio', camara: 'tanques' };
  T.conspiracion(R, t, o);
  const forma = tramo(t, @chanib@ - 0.1, @newb@ + 0.3), duncan = tramo(t, @brought@ - 0.1, @brought@ + 0.6);
  if (forma > 0) { const px = captura((x, s) => R.actor(PA.chani, x, s, t, { dir: -1, sonrisa: true }));
    R.recorte([131, 27, 187, 135]); luz(159, 84, 34, GLOW_O[1], 0.3 * forma); deLuz(px, 159 - 16, 116, LUZ_O, 0.85 * forma * (0.85 + 0.15 * Math.sin(t * 5)), 2);
    for (let k = 0; k < 8; k++) { const y = ri(130 - ((t * 20 + k * 13) % 100)), x = ri(140 + h2(k, 1, 81) * 38 + Math.sin(t * 3 + k) * 2); R.pset(x, y, ORO[5]); } R.recorte(null); }
  if (duncan > 0) { const px = captura((x, s) => R.actor(PA.duncan, x, s, t, { dir: -1 })); R.recorte([227, 27, 283, 135]); deLuz(px, 255 - 16, 116, LUZ_V, 0.8 * duncan, 2); R.recorte(null); }
  // Scytale (calvo, gris) tiende la mano hacia el tanque del centro, con una lucecita en la palma
  const tiende = t > @offer@ - 0.3;
  const rs = R.actor(PA.scytale, 96, 170, t, { dir: 1, sostiene: tiende ? [124, 140] : undefined, habla: t > P9 + 0.3 && t < @chanib@ + 0.6 && Math.sin(t * 9) > 0, sonrisa: t > @chanib@ + 0.6 });
  if (tiende) { R.halo(rs.mano[0] + 1, rs.mano[1] - 3, 5 + Math.sin(t * 5), GLOW_O, 1.1); R.pset(rs.mano[0] + 1, rs.mano[1] - 3, ORO[6]); }
  atomG(210, 170, t, { dir: 1, pose: t > @brought@ ? 'senala' : 'quieto', cara: t > @chanib@ ? 'sorpresa' : 'normal' });
  T.conspiracionDelante(R, t, o);
};
// ── 10 · la antecámara del tapiz: Scytale tiende la mano con una Chani de luz; Paul niega; Scytale mira a las cunas ──
const p10 = (t) => {
  fijo('p10', () => {
    sillares(0, 0, 319, 140, SILL, (x, y) => Math.max(0, 0.75 - Math.hypot(x - 190, y - 50) / 260), 9, 18, 3);
    // el tapiz grande del desierto con su barra y sus flecos
    R.rect(14, 24, 100, 26, MAD[2]); R.pset(13, 25, ORO[4]); R.pset(101, 25, ORO[4]);
    for (let y = 27; y <= 112; y++) for (let x = 18; x <= 96; x++) { const u = Math.abs(((x - 18) % 20) - 10) + Math.abs(((y - 27) % 22) - 11), bor = x < 21 || x > 93 || y > 109;
      R.pset(x, y, bor ? H('#e8c060') : u < 3 ? H('#2e6a4a') : u < 6 ? H('#e8c060') : u < 8 ? H('#3a6aa8') : (y % 4 === 0 ? H('#6a1e18') : H('#9a3424'))); }
    // la puerta en arco de la derecha (dentro, oscuridad cálida) y su jamba
    for (let y = 56; y <= 140; y++) for (let x = 220; x <= 284; x++) { if (!enArco(x, y, 252, 64, 56, 140)) continue; const e = !enArco(x, y, 252, 56, 62, 140); R.pset(x, y, e ? SILL[1] : rmp(pal(['#0e0a10', '#1c1418', '#2e2020']), 0.6 + (y - 60) / 60, x, y)); }
    // un nicho con un cántaro y un estante con cuencos y una lámpara apagada (pared de la derecha, bajo la zona de Atom)
    for (let y = 40; y <= 92; y++) for (let x = 168; x <= 204; x++) if (enArco(x, y, 186, 36, 40, 92)) R.pset(x, y, rmp(SILL, 1.2 + (y - 40) / 40 + (ns(x * 0.3, y * 0.3) - 0.5) * 0.5, x, y));
    R.rect(178, 66, 194, 92, K); R.rect(179, 67, 193, 91, H('#a8643a')); R.rect(179, 67, 181, 91, H('#d08a50')); R.rect(182, 60, 190, 66, K); R.rect(183, 61, 189, 65, H('#8a4a24')); R.rect(166, 92, 206, 94, SILL[1]);
    R.rect(112, 74, 156, 77, K); R.rect(113, 74, 155, 75, SILL[6]); for (const [x, c] of [[120, '#3a6aa8'], [134, '#c8a070'], [148, '#8a4a24']]) { R.rect(x - 5, 69, x + 5, 73, K); R.rect(x - 4, 69, x + 4, 72, hex(c)); R.rect(x - 4, 69, x + 4, 69, mez(hex(c), H('#ffffff'), 0.35)); }
    // el banco con cojines, cántaros y la lámpara colgada
    R.rect(110, 126, 170, 140, K); R.rect(111, 127, 169, 139, SILL[3]); R.rect(111, 127, 169, 128, SILL[5]);
    for (const [x, c] of [[120, '#7a2a6a'], [140, '#2e6a4a'], [160, '#c88a3a']]) { R.disco(x, 124, 7, K); R.disco(x, 124, 6, hex(c)); R.disco(x - 2, 122, 3, mez(hex(c), H('#ffffff'), 0.3)); }
    for (const [x, h] of [[292, 26], [308, 20]]) { R.rect(x - 7, 140 - h, x + 7, 140, K); R.rect(x - 6, 141 - h, x + 6, 139, H('#a8643a')); R.rect(x - 6, 141 - h, x - 4, 139, H('#d08a50')); R.rect(x - 3, 136 - h, x + 3, 141 - h, K); }
    // el suelo: losas y la alfombra larga
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const u = Math.abs(((x - 40) % 14) - 7) + Math.abs(((y - 148) % 10) - 5), en = y >= 148 && y <= 172 && x >= 40 && x <= 300;
      R.pset(x, y, en ? (y < 150 || y > 170 || x < 42 || x > 298 ? H('#e8c060') : u < 3 ? H('#3a6aa8') : u < 6 ? H('#9a3424') : H('#6a1e18')) : rmp(SILL, 2.6 + (ns(x * 0.2, y * 0.4) - 0.5) + ((x + (y >> 3) * 7) % 22 === 0 || y % 8 === 0 ? -1.4 : 0), x, y)); }
  });
  const f = 0.85 + 0.15 * Math.sin(t * 8) * Math.sin(t * 3);
  // la lámpara colgada, su luz y su llama
  R.linea(212, 0, 212, 30, MAD[1]); R.rect(206, 30, 218, 36, K); R.rect(207, 31, 217, 35, H('#b88a3a')); luz(200, 40, 70, ORO[4], 0.26 * f); R.poligono([[210, 30], [214, 30], [212 + ri(Math.sin(t * 9)), 24]], H('#f08a30'));
  // la luz de las cunas al fondo de la puerta: se aviva en «babies»
  const bb = tramo(t, @babies@ - 0.3, @babies@ + 0.4);
  R.recorte([226, 62, 278, 140]); luz(244, 118, 26, AZ[3], 0.3 + 0.25 * bb); luz(262, 118, 26, ORO[4], 0.3 + 0.25 * bb);
  for (let y = 60; y <= 140; y++) { const xc = 268 + ri(Math.sin(t * 1.1 + y * 0.08) * 2); for (let x = xc; x <= 284; x++) if (enArco(x, y, 252, 56, 62, 140)) R.pset(x, y, y % 10 < 2 ? H('#e8c060') : H('#2e4a6a')); } R.recorte(null);
  for (let x = 18; x <= 96; x += 3) R.linea(x, 113, x + ri(Math.sin(t * 1.4 + x) * 1), 116, H('#e8c060'));
  for (let k = 0; k < 10; k++) { const x = ri(110 + h2(k, 1, 91) * 80 + Math.sin(t * 0.5 + k) * 4), y = ri(40 + ((h2(k, 2, 91) * 90 + t * 3) % 90)); tiñe(x, y, H('#ffe0a0'), 0.45); }
  // Paul niega con la cabeza en «no»; luego se vuelve hacia la puerta
  const niega = t > @no@ - 0.1 && t < @no@ + 0.7, dirP = niega ? (Math.floor(t * 9) % 2 ? 1 : -1) : t > @force@ ? 1 : 1;
  ciego(78, 160, t, { dir: dirP, enfado: t > @force@, triste: t > @no@ + 0.7 && t < @force@ });
  // Scytale: la mano tendida con la Chani de luz, luego se vuelve a la puerta y da dos pasos; la corona y el oro
  const gira = t > @babies@ - 0.2, anda = tramo(t, @babies@ - 0.1, @force@ + 0.3), sx = ri(lerp(166, 196, anda));
  const tiende = t < @tries@ + 0.2;
  const rs = R.actor(PA.scytale, sx, 160, t, { dir: gira ? 1 : -1, anda: anda > 0 && anda < 1, sostiene: tiende ? [sx - 4, 138] : undefined, habla: t > @tries@ && t < @babies@ && Math.sin(t * 9) > 0, sonrisa: tiende });
  if (tiende) { const a = 0.9 * (1 - tramo(t, @tries@ - 0.2, @tries@ + 0.2)), px = captura((x, s) => R.actor(PA.chani, x, s, t, { dir: 1, sonrisa: true }));
    const fy = ri(Math.sin(t * 2.4) * 1.5); R.halo(rs.mano[0], rs.mano[1] - 14 + fy, 16, GLOW_O, 0.8 * a); deLuz(px, rs.mano[0] - 9, rs.mano[1] - 3 + fy, LUZ_O, a, 1); }
  if (t > @throne@ - 0.1) { const y = ri(120 - pop(t, @throne@ - 0.1) * 6); coronita(sx + 7, y, t, 2); }
  if (t > @fortune@ - 0.1) { const y = ri(122 - pop(t, @fortune@ - 0.1) * 6); for (let k = 0; k < 5; k++) { R.rect(sx + 20, y - k * 3, sx + 32, y - k * 3 + 3, K); R.rect(sx + 21, y - k * 3 + 1, sx + 31, y - k * 3 + 2, ORO[4]); R.pset(sx + 23, y - k * 3 + 1, ORO[6]); } R.disco(sx + 38, y, 4, K); R.disco(sx + 38, y, 3, ORO[4]); R.pset(sx + 37, y - 1, ORO[6]); }
  lucie(ri(lerp(120, 236, tramo(t, @babies@, @babies@ + 0.8))) + Math.sin(t * 1.3) * 3, ri(lerp(108, 96, tramo(t, @babies@, @babies@ + 0.8))) + flota(t), t, { dir: 1, cara: t > @no@ ? (t > @babies@ ? 'sorpresa' : 'triste') : 'normal', brillo: 0.8 });
};
// ── 11 · inserto: la cuna azul del niño delante; en la pared, la sombra de Paul alza la mano y la de Scytale recula ──
const p11 = (t) => {
  fijo('p11', () => {
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const est = (y + ri(Math.sin(x * 0.03) * 4)) % 14; let v = 5.2 - Math.hypot((x - 130) / 1.4, y - 190) / 70 + (ns(x * 0.1, y * 0.08) - 0.5) * 0.9; if (est === 0) v -= 0.8; if (h2(x, y, 11) > 0.99) v -= 1; R.pset(x, y, rmp(SILL, v, x, y)); }
    for (let x = 0; x < 320; x += 10) { R.poligono([[x, 31], [x + 10, 31], [x + 5, 24]], SILL[2]); R.poligono([[x + 2, 30], [x + 8, 30], [x + 5, 26]], SILL[4]); } R.linea(0, 32, 319, 32, SILL[1]);
    // manojos de hierbas secas colgados, una grieta, un nicho con su cántaro arriba a la izquierda
    for (const [x, k] of [[150, 0], [176, 1], [204, 2]]) { R.linea(x, 33, x, 40, MAD[1]); for (let i = 0; i < 9; i++) R.linea(x, 40, x - 4 + i, 52 + (i % 3) * 2, i % 2 ? H('#6a7a3a') : H('#8a8a4a')); R.rect(x - 2, 39, x + 2, 41, H('#9a3424')); }
    for (let i = 0, x = 238, y = 30; i < 30; i++) { const nx = x + (i % 3 ? 1 : -1), ny = y + 2; R.linea(x, y, nx, ny, SILL[1]); R.pset(nx + 1, ny, SILL[6]); x = nx; y = ny; }
    for (let y = 36; y <= 70; y++) for (let x = 40; x <= 76; x++) if (enArco(x, y, 58, 36, 36, 70)) R.pset(x, y, rmp(SILL, 1.4 + (y - 30) / 30, x, y));
    R.rect(50, 50, 66, 70, K); R.rect(51, 51, 65, 69, H('#a8643a')); R.rect(51, 51, 53, 69, H('#d08a50')); R.rect(54, 46, 62, 50, K); R.rect(55, 47, 61, 49, H('#8a4a24')); R.rect(38, 70, 78, 72, SILL[1]);
    // el tapiz que asoma a la derecha y el suelo con la alfombra
    for (let y = 28; y <= 150; y++) for (let x = 296; x <= 319; x++) { const u = Math.abs(((x - 296) % 12) - 6) + Math.abs(((y - 28) % 14) - 7); R.pset(x, y, x === 296 ? K : u < 3 ? H('#2e6a4a') : u < 5 ? H('#e8c060') : H('#9a3424')); }
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const u = Math.abs(((x) % 16) - 8) + Math.abs(((y - 150) % 10) - 5); R.pset(x, y, y === 150 ? K : y < 154 ? rmp(SILL, 2.2, x, y) : u < 3 ? H('#3a6aa8') : u < 6 ? H('#9a3424') : H('#6a1e18')); }
  });
  // la lámpara de barro del suelo (la que echa las sombras grandes) con su luz
  const f = 0.85 + 0.15 * Math.sin(t * 8) * Math.sin(t * 2.7);
  luz(150, 160, 70, ORO[4], 0.22 * f);
  // las sombras (al doble) en la pared: Scytale se acerca con la mano tendida; Paul alza la mano y Scytale recula
  const acerca = tramo(t, P11, @sees@), recula = tramo(t, @stops@, @stops@ + 0.8), sxs = ri(lerp(244, 196, acerca) + recula * 50);
  const ps = captura((x, s) => R.actor(PA.scytale, x, s, t, { dir: -1, sostiene: recula < 0.3 ? true : undefined, anda: (acerca > 0 && acerca < 1) || (recula > 0 && recula < 1), quieto: true }));
  sombraDe(ps, sxs, 148, 2, 0.5 * f, 0.12);
  const pp = captura((x, s) => R.actor(PA.paulCiego, x, s, t, { dir: 1, dedo: t > @stops@ - 0.2, quieto: true }));
  sombraDe(pp, 70, 148, 2, 0.5 * f, -0.08);
  // la lámpara (delante de todo, abajo en el centro)
  R.rect(140, 170, 160, 178, K); R.rect(141, 171, 159, 177, H('#b8743a')); R.rect(141, 171, 159, 172, H('#e0a060')); R.poligono([[154, 170], [158, 170], [156 + ri(Math.sin(t * 9)), 162]], H('#f08a30')); R.pset(156, 168, H('#fff0a0'));
  // la cuna del niño, grande, delante a la izquierda: su luz azul; en «son's eyes» dos destellos y el hilo hasta Paul
  const ojos = tramo(t, @sons@ - 0.2, @sons@ + 0.3), hilo = tramo(t, @sons@, @stops@);
  const [cx, ct] = cunaLado(56, 178, t, 0, 2.2, 0.8 + 0.2 * ojos, GLOW_A, MANTA_A);
  if (ojos > 0) { for (const dx of [-3, 3]) { R.pset(cx + dx, ct - 3, AZ[4]); if (ojos > 0.5) { R.pset(cx + dx, ct - 4, AZ[3]); R.pset(cx + dx - 1, ct - 3, AZ[3]); R.pset(cx + dx + 1, ct - 3, AZ[3]); } } }
  if (hilo > 0) for (let i = 0; i < 40 * hilo; i++) { const u = i / 40, x = ri(lerp(cx, 90, u)), y = ri(lerp(ct - 4, 90, u) - Math.sin(u * Math.PI) * 14); if ((i + Math.floor(t * 12)) % 3) R.pset(x, y, AZ[3]); }
  if (t > @stops@ + 0.1 && t < @stops@ + 1.1) R.icono('X', sxs + 12, ri(84 - pop(t, @stops@ + 0.1) * 4), H('#f0f0f0'), K, 2);
  lucie(120 + Math.sin(t * 1.2) * 4, 126 + flota(t), t, { dir: -1, cara: t > @stops@ ? 'sonrisa' : t > @sons@ ? 'sorpresa' : 'normal', brillo: 0.85 });
};
// ── 12 · la grieta de salida del sietch al amanecer: deja la corona en la roca y el viejo Fremen le da el bastón ────
const p12 = (t) => {
  fijo('p12', () => {
    // por la grieta: el cielo claro de la mañana y las dunas que brillan
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const c = y < 112 ? rmp(pal(['#6a9ad0', '#8ab4e0', '#b0cce8', '#d8e4f0', '#f8eedc']), y / 26 + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.4, x, y) : rmp(pal(['#a86a3a', '#d08a4a', '#e8a860', '#f8cc88', '#fff0c8']), 2.6 + Math.sin(x * 0.05 + Math.sin(y * 0.3)) * 1 - (y - 112) * 0.03 + ((y - 112 - ri(Math.sin(x * 0.04) * 4)) % 9 === 0 ? 1.2 : 0), x, y); R.pset(x, y, c); }
    // las paredes de la grieta (oscuras, con el filo encendido por la luz de fuera), con asideros y nichos
    const izq = (y) => 118 - (y - 40) * 0.12 + Math.sin(y * 0.15) * 4 + Math.sin(y * 0.05) * 6, der = (y) => 204 + (y - 40) * 0.1 + Math.sin(y * 0.13 + 2) * 4 + Math.sin(y * 0.04) * 5;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const a = izq(y), b = der(y); if (x > a && x < b && y < 150) continue; const d = x <= a ? a - x : x - b, est = (y + ri(x * 0.15)) % 12;
      let v = 1.2 + Math.max(0, 3.2 - d * 0.12) + (ns(x * 0.12, y * 0.1) - 0.5) * 1.2 + (est === 0 ? -0.9 : 0) + (h2(x, y, 5) > 0.986 ? 1 : 0); if (y >= 150) v = 2.3 + (ns(x * 0.3, y * 0.4) - 0.5) * 1.1 + Math.max(0, 1.4 - Math.abs(x - 160) / 70) + (h2(x >> 1, y, 6) > 0.9 ? 0.8 : 0);
      R.pset(x, y, rmp(PIEDRA, v, x, y)); }
    for (const [x, y] of [[30, 60], [52, 92], [266, 70], [292, 104]]) { for (let j = -8; j <= 8; j++) for (let i = -7; i <= 7; i++) if (enArco(x + i, y + j, x, 14, y - 8, y + 8)) R.pset(x + i, y + j, PIEDRA[0]); }
    R.rect(48, 88, 56, 94, H('#a8643a')); R.rect(49, 86, 55, 88, K);
    // la repisa de roca donde deja la corona (x 92–120, y 140)
    for (let y = 138; y < 156; y++) for (let x = 90; x < 122; x++) { const v = y < 141 ? 5 : 2.8 + (ns(x * 0.3, y * 0.3) - 0.5) * 1.1 - (y - 141) * 0.06; R.pset(x, y, x === 90 || x === 121 || y === 155 ? K : rmp(PIEDRA, v, x, y)); }
  });
  R.recorte([126, 0, 198, 112]);
  nubes(t, [[140, 26, 50, 3, 7], [200, 50, 60, 5, 8], [120, 72, 40, 7, 9]], pal(['#c8d8ec', '#e8eef8', '#ffffff']), 110);
  for (let k = 0; k < 2; k++) { const x = ri(((t * (8 + k * 4) + k * 60) % 140) + 100), y = ri(44 + k * 12 + Math.sin(t * 2 + k) * 3), a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x - 2, y - a, K); R.pset(x - 1, y, K); R.pset(x + 1, y, K); R.pset(x + 2, y - a, K); }
  R.recorte([116, 112, 208, 149]); arenaVuela(t, 116, 148, 16, H('#fff0c8'), 4); R.recorte(null);
  // la luz de fuera derramada por el suelo de la grieta
  for (let y = 150; y < 180; y++) for (let x = 100; x < 230; x++) { const g = 1 - Math.abs(x - 162) / (40 + (y - 150) * 1.6); if (g > 0 && b4(x, y) < g * 0.8) tiñe(x, y, H('#fff0c8'), 0.25); }
  // los Fremen en fila junto a las paredes: inclinan la cabeza cuando se va
    R.actor(PA.fremenMujer, 36, 166, t, { dir: 1, triste: t > @leaves@, sostiene: t > @throne2@ ? [52, 150] : undefined });
  R.actor(PA.fremen, 262, 164, t, { dir: -1, dedo: t > @throne2@ + 0.2, triste: t > @leaves@ });
  if (t > @throne2@) { R.rect(49, 149, 55, 152, K); R.rect(50, 150, 54, 151, H('#e8dcc0')); }
  // el viejo Fremen se acerca con el bastón y se lo da en «blind»
  const viene = tramo(t, P12 + 0.2, @law@ + 0.3), vx = ri(lerp(214, 160, viene) + tramo(t, @blind3@ + 0.3, @leaves@) * 30), da = t > @blind3@;
  const rv = R.actor(PA.fremen, vx, 166, t, { dir: t > @blind3@ + 0.3 && t < @leaves@ ? 1 : -1, anda: (viene > 0 && viene < 1) || (t > @blind3@ + 0.3 && t < @leaves@), sostiene: da ? undefined : [vx - 3, 146], habla: t > @law@ && t < @blind3@ && Math.sin(t * 9) > 0 });
  if (!da) baston(rv.mano[0], rv.mano[1], 166);
  // Paul: deja la corona en la repisa, coge el bastón y se vuelve hacia la luz
  const deja = tramo(t, P12 + 0.3, P12 + 1.0), anda = tramo(t, @throne2@ + 0.2, P13 + 0.2), px = ri(lerp(126, 146, anda)), ps = ri(lerp(166, 160, anda));
  const dirP = t < P12 + 1.2 ? -1 : 1;
  const rp = ciego(px, ps, t, { dir: dirP, anda: anda > 0 && anda < 1, sostiene: t < P12 + 1.0 ? [lerp(124, 112, deja), 142] : da ? [px + 16, ps - 18] : undefined, triste: t < @leaves@ });
  if (t < P12 + 1.0) coronita(ri(rp.mano[0]), ri(rp.mano[1]) - 1, t); else coronita(108, 139, t + 0.5);
  if (da) baston(rp.mano[0], rp.mano[1], ps);
  if (t > @leaves@ - 0.2 && t < @throne2@ + 0.6) { const u = tramo(t, @leaves@ - 0.2, @throne2@ + 0.6); R.halo(108, 134, 6 + u * 4, GLOW_O, 1.2 * (1 - u)); }
  lucie(98 + Math.sin(t * 1.2) * 4, 118 + flota(t), t, { dir: 1, cara: t > @leaves@ ? 'triste' : 'normal', brillo: 0.8 });
};
// ── 13 · las dunas de la mañana, de perfil: Paul se aleja con su bastón; el viento le borra las huellas y se pierde ──
const DUNA_D = pal(['#5a2e1a', '#8a4a28', '#b86a38', '#d88a48', '#eaa860', '#f6c880', '#fde4b0']);
const CR13 = (x) => 152 - x * 0.13 + Math.sin(x * 0.03) * 3;
const p13 = (t) => {
  fijo('p13', () => {
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a7ac0', '#5e8cca', '#76a2d6', '#92b8e0', '#b2cee8', '#d4e2ee', '#f2ecdc']), y / 15 + (h2(x >> 1, y >> 1, 12) - 0.5) * 0.5, x, y));
    // las mesetas lejanas, azuladas por el aire
    for (let x = 0; x < 320; x++) { const yc = ri(90 - Math.max(0, 14 - Math.abs(x - 70) * 0.5) - Math.max(0, 10 - Math.abs(x - 250) * 0.3) + Math.sin(x * 0.3) * 0.6); for (let y = yc; y < 100; y++) R.pset(x, y, rmp(pal(['#7a86a8', '#929cb8', '#aab2c8']), 1 + (y === yc ? 1 : 0) + (y % 4 === 0 ? -0.6 : 0), x, y)); }
    // tres términos de dunas: lejos, medio y la cresta de delante (de abajo a la izquierda a arriba a la derecha)
    const term = (y0, a, f, p, base) => { for (let x = 0; x < 320; x++) { const c = ri(y0 + a * Math.sin(x * f + p) + a * 0.3 * Math.sin(x * f * 2.3 + p)); for (let y = c; y < 180; y++) { const lado = Math.max(-1, Math.min(1, Math.cos(x * f + p - (y - c) * 0.02) * 2));
      let v = base + (y - c < 1 ? 1.6 : 0) + lado * 0.8 - (y - c) * 0.02 + Math.sin(x * 0.4 + y * 1.3 + Math.sin(y * 0.2) * 2) * 0.35 + (ns(x * 0.1, y * 0.2) - 0.5) * 0.5; R.pset(x, y, rmp(DUNA_D, v, x, y)); } } };
    term(98, 4, 0.025, 1, 4.2); term(110, 7, 0.016, 3, 3.6);
    for (let x = 0; x < 320; x++) { const c = ri(CR13(x)); for (let y = c; y < 180; y++) { const sombra = y - c > 4 + Math.sin(x * 0.05) * 2;
      let v = sombra ? 2.0 + Math.sin(x * 0.35 + y * 1.1 + Math.sin(y * 0.15) * 3) * 0.45 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.5 : 5 + (y === c ? 1 : 0); R.pset(x, y, rmp(DUNA_D, v, x, y)); } }
    // piedras y matas secas al pie de la cresta
    for (const [x, y, k] of [[30, 172, 0], [210, 168, 1], [288, 158, 2]]) { R.disco(x, y, 3, DUNA_D[0]); R.pset(x - 1, y - 2, DUNA_D[4]); for (let i = 0; i < 6; i++) R.linea(x + 6, y, x + 6 + ri(Math.cos(i * 0.6 + 0.3 + k) * 6), y - 2 - ri(Math.abs(Math.sin(i + k)) * 6), H('#6a4a2a')); }
  });
  nubes(t, [[40, 24, 80, 3, 10], [200, 42, 100, 5, 11], [100, 62, 70, 8, 12]], pal(['#c8d4e4', '#e4ecf4', '#ffffff']), 96);
  for (let k = 0; k < 3; k++) { const x = ri(((t * (9 + k * 3) + k * 110) % 360) - 20), y = ri(30 + k * 9 + Math.sin(t * 2 + k) * 3), a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x - 2, y - a, K); R.pset(x - 1, y, K); R.pset(x + 1, y, K); R.pset(x + 2, y - a, K); }
  // el remolino de polvo lejano
  for (let k = 0; k < 24; k++) { const u = k / 24, a = t * 5 + k, r = 2 + u * 7; tiñe(268 + ri(Math.cos(a) * r + u * 4), ri(106 - u * 26), H('#f0d0a0'), 0.6); }
  // Paul camina cresta arriba, y cada huella la borra el viento; en «no one ever sees him again» se pierde en la calima
  const u = tramo(t, P13, @again@ - 0.2), x = lerp(84, 232, u), su = ri(CR13(x + 7)) + 1, fade = tramo(t, @noone@, @again@);
  for (let k = 0; k < 30; k++) { const xk = 84 + k * 5, tk = P13 + (xk - 84) / 148 * (@again@ - 0.2 - P13); if (t < tk + 0.2 || xk > x - 4) continue; const a = 1 - tramo(t, tk + 0.8, tk + 2.2); if (a <= 0) continue;
    const yk = ri(CR13(xk + 7)) + 2 + (k % 2); tiñe(xk, yk, DUNA_D[1], 0.9 * a); tiñe(xk + 1, yk, DUNA_D[1], 0.9 * a); tiñe(xk, yk + 1, DUNA_D[2], 0.7 * a); tiñe(xk + 1, yk - 1, DUNA_D[6], 0.6 * a); }
  if (fade < 1) { const px = captura((xx, s) => { const r = ciego(xx, s, t, { dir: 1, anda: true, sostiene: [xx + 16, s - 18] }); baston(r.mano[0], r.mano[1], s); });
    fantasma(px, ri(x), su, 1 - fade, t, fade * 1.5); }
  // la arena que vuela por la cresta (más en las ráfagas)
  arenaVuela(t, 110, 170, 40, DUNA_D[5], 5);
  for (let k = 0; k < 18; k++) { const v = (t * 0.6 + h2(k, 1, 131)) % 1, xx = ri(-20 + v * 360), yy = ri(CR13(xx) - 2 - h2(k, 2, 131) * 8); R.linea(xx, yy, xx + 5, yy, DUNA_D[6]); }
  lucie(56 + Math.sin(t * 1.1) * 3, 124 + flota(t), t, { dir: 1, cara: t > @noone@ ? 'triste' : 'normal', brillo: 0.7 });
};
// ── 14 · inserto: la arena de cerca; tres signos (el ojo, la gota de Chani, el camino) que el viento borra uno a uno ──
const ARENA_C = pal(['#6a3a1e', '#9a5a2e', '#c07a40', '#d8975a', '#e8b476', '#f4d098', '#fdeac4']);
const signo = (k, x, y, t) => { const pts = [];
  if (k === 0) { for (let a = 0; a < 6.28; a += 0.06) pts.push([x + Math.cos(a) * 22, y + Math.sin(a) * Math.abs(Math.sin(a)) * 11 * (a < 3.14 ? 1 : -1)]); for (let a = 0; a < 6.28; a += 0.2) pts.push([x + Math.cos(a) * 6, y + Math.sin(a) * 6]); pts.push([x, y]); pts.push([x + 1, y]); }
  else if (k === 1) { for (let a = 0; a < 6.28; a += 0.05) { const r = 12; const yy = Math.sin(a) > 0 ? y + Math.sin(a) * r : y + Math.sin(a) * r * 2.2; const xx = x + Math.cos(a) * r * (Math.sin(a) > 0 ? 1 : 1 + Math.sin(a) * 0.95); pts.push([xx, yy]); } }
  else { for (let i = 0; i <= 30; i++) pts.push([x - 26 + i * 0.9, y + 12 - i * 0.2]); for (let i = 0; i <= 24; i++) { pts.push([x + 1 + i, y + 6 - i * 0.7]); pts.push([x + 1 + i, y + 6 + i * 0.25]); pts.push([x + 12 + i * 0.6, y - 2 + i * 0.1]); } }
  return pts; };
const p14 = (t) => {
  fijo('p14', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.sin(x * 0.18 + y * 0.42 + Math.sin(x * 0.03 + y * 0.05) * 3), cr = r > 0.82;
      let v = 3.4 + r * 0.7 + (cr ? 1.1 : 0) + (ns(x * 0.08, y * 0.08) - 0.5) * 0.9 - y * 0.004; if (h2(x, y, 14) > 0.993) v += 1.5; R.pset(x, y, rmp(ARENA_C, v, x, y)); }
    // guijarros, una pluma blanca, una rama seca y la mata con su sombra (fuera de la zona de Atom)
    for (let k = 0; k < 22; k++) { const x = ri(h2(k, 1, 141) * 316), y = ri(30 + h2(k, 2, 141) * 148), r = 1 + ri(h2(k, 3, 141) * 2); R.disco(x + 1, y + 1, r, ARENA_C[1]); R.disco(x, y, r, k % 3 ? H('#8a6a50') : H('#c8b8a0')); R.pset(x - 1, y - 1, H('#f0e8d8')); }
    R.linea(262, 150, 292, 140, H('#f8f4ec')); for (let i = 0; i < 14; i++) R.linea(266 + i * 2, 149 - ri(i * 0.66), 266 + i * 2 - 2, 146 - ri(i * 0.66), H('#e0dcd0'));
    for (const [x, y] of [[30, 50], [52, 62], [128, 40]]) { R.disco(x, y, 3, ARENA_C[1]); R.disco(x - 1, y - 1, 2, H('#9a8a78')); R.pset(x - 2, y - 2, H('#f0e8d8')); }
    for (let j = 0; j < 14; j++) for (let i = 0; i < 40; i++) if (b4(234 + i, 92 + j) < 0.5 - Math.abs(j - 7) / 20) tiñe(234 + i, 92 + j, ARENA_C[0], 0.3);
    for (let i = 0; i < 16; i++) { const a = -2.6 + i * 0.12; R.linea(236, 92, 236 + ri(Math.cos(a) * (14 + (i % 3) * 5)), 92 + ri(Math.sin(a) * (14 + (i % 3) * 5)), i % 2 ? H('#6a5030') : H('#8a6a40')); }
  });
  // los tres signos trazados en la arena; cada ráfaga los va llenando de arena desde la izquierda
  const T3 = [[@eyes@, 96, 112], [@chani3@, 166, 104], [@future@, 236, 124]];
  T3.forEach(([tt, x, y], k) => { const borra = tramo(t, tt - 0.35, tt + 0.6); const brilla = t > P14 + 0.4 + k * 0.4 && t < P14 + 0.9 + k * 0.4;
    for (const [px, py] of signo(k, x, y, t)) { const X = ri(px), Y = ri(py); if (borra > 0 && (X - (x - 30)) / 60 < borra * 1.2 - h2(X, Y, 15) * 0.25) continue; R.pset(X, Y, ARENA_C[0]); R.pset(X + 1, Y, ARENA_C[0]); R.pset(X, Y - 1, ARENA_C[1]); R.pset(X, Y + 1, ARENA_C[0]); R.pset(X, Y + 2, ARENA_C[6]); R.pset(X + 1, Y + 2, ARENA_C[6]); if (brilla) R.pset(X, Y - 2, ORO[5]); }
    if (borra > 0 && borra < 1) for (let i = 0; i < 40; i++) { const sx = ri(x - 34 + borra * 70 - h2(i, 1, k) * 30), sy = ri(y - 16 + h2(i, 2, k) * 32); tiñe(sx, sy, ARENA_C[6], 0.7); tiñe(sx + 1, sy, ARENA_C[5], 0.5); } });
  // la arena que corre a ras y un escarabajo que cruza dejando su rastro
  for (let k = 0; k < 30; k++) { const v = (t * 0.7 + h2(k, 1, 142)) % 1, xx = ri(-20 + v * 360), yy = ri(20 + h2(k, 2, 142) * 158); R.linea(xx, yy, xx + 4, yy, ARENA_C[6]); }
  { const u = tramo(t, P14, P15), bx = ri(lerp(300, 200, u)), by = ri(170 - u * 6); for (let i = 2; i < 60 * u; i += 3) R.pset(bx + i, by + ri(i * 0.06) + (i % 2), ARENA_C[1]); R.rect(bx - 1, by - 1, bx + 1, by + 1, K); R.pset(bx - 2, by, K); R.pset(bx, by - 1, H('#3a5a6a')); }
  atomG(34, 156, t, { dir: 1, pose: t < P14 + 1.6 ? 'senala' : t > @future@ + 0.6 ? 'sostiene' : 'quieto', cara: t > @eyes@ - 0.3 ? (t > @future@ + 0.6 ? 'triste' : 'sorpresa') : 'normal' });
};
// ── 15 · el trono vacío, de frente y de cerca: la corona en el asiento, dos cunas con su luz, los estandartes ────────
const p15 = (t) => {
  fijo('p15', () => {
    sillares(0, 0, 319, 148, SILL, (x, y) => Math.max(0, 0.7 - Math.hypot(x - 160, y - 70) / 200), 9, 20, 5);
    // el gran nicho apuntado con la celosía encendida
    for (let y = 26; y <= 120; y++) for (let x = 112; x <= 208; x++) { if (!enArco(x, y, 160, 92, 26, 120)) continue; const e = !enArco(x, y, 160, 84, 32, 120);
      const u = (Math.abs(((x - 160) + (y - 26)) % 10) < 1.2) || (Math.abs(((x - 160) - (y - 26)) % 10) < 1.2); R.pset(x, y, e ? SILL[1] : u ? SILL[0] : rmp(ORO, 3.4 - Math.hypot(x - 160, y - 60) / 40, x, y)); }
    // las columnas
    for (const c of [28, 292]) for (let y = 0; y < 148; y++) for (let x = c - 12; x <= c + 12; x++) { const d = (x - c) / 12, v = 3.6 - d * 2.2 + ((x - c + 12) % 6 === 0 ? -1.2 : 0) + (ns(x * 0.2, y * 0.1) - 0.5) * 0.5; R.pset(x, y, Math.abs(x - c) === 12 ? K : rmp(SILL, v, x, y)); }
    // el suelo pulido con el reflejo del nicho
    for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const jun = (y - 148) % 8 === 0 || (x + ((y - 148) >> 3) * 13) % 26 === 0; let v = 3 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.6 + (jun ? -1.6 : 0); if (Math.abs(x - 160) < 36 && b4(x, y) < 0.35 - (y - 148) / 120) v += 2.4; R.pset(x, y, rmp(SILL, v, x, y)); }
    // la escalinata de tres peldaños
    for (const [y0, x0, x1] of [[124, 98, 222], [132, 84, 236], [140, 70, 250]]) { R.rect(x0, y0, x1, y0 + 8, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, SILL[7]); R.rect(x0 + 1, y0 + 3, x1 - 1, y0 + 7, SILL[4]); for (let x = x0 + 8; x < x1; x += 18) R.linea(x, y0 + 3, x, y0 + 7, SILL[2]); }
    // el trono de piedra y bronce con el halcón arriba
    R.rect(134, 42, 186, 112, K); for (let y = 43; y < 112; y++) for (let x = 135; x < 186; x++) R.pset(x, y, rmp(SILL, 3.2 + (x < 140 || x > 180 ? -1 : 0) + (ns(x * 0.3, y * 0.2) - 0.5) * 0.6, x, y));
    R.rect(140, 50, 180, 104, K); R.rect(141, 51, 179, 103, H('#2a4a3a')); for (let y = 52; y < 103; y += 6) R.linea(141, y, 179, y, H('#1f3a2c'));
    R.rect(134, 40, 186, 43, H('#b88a3a')); R.rect(134, 40, 186, 40, H('#e8c060'));
    R.poligono([[152, 40], [160, 28], [168, 40]], K); R.poligono([[154, 39], [160, 30], [166, 39]], H('#e8c060')); R.poligono([[146, 36], [152, 32], [156, 38]], H('#b88a3a')); R.poligono([[174, 36], [168, 32], [164, 38]], H('#b88a3a'));
    R.rect(124, 96, 140, 124, K); R.rect(125, 97, 139, 123, SILL[4]); R.rect(125, 97, 139, 99, H('#e8c060')); R.rect(180, 96, 196, 124, K); R.rect(181, 97, 195, 123, SILL[4]); R.rect(181, 97, 195, 99, H('#e8c060'));
    R.rect(138, 104, 182, 124, K); R.rect(139, 105, 181, 110, SILL[6]); R.rect(139, 111, 181, 123, SILL[3]); R.rect(139, 105, 181, 105, H('#e8c060'));
  });
  // los estandartes grandes que siguen ondeando a los lados
  for (const [x, k] of [[58, 0], [246, 1]]) { const c = k ? H('#1f4a2c') : H('#18181e'), cs = k ? H('#3a7048') : H('#3a3a46'); R.rect(x - 4, 26, x + 22, 28, H('#b88a3a'));
    for (let y = 29; y < 104; y++) { const v = ri(Math.sin(t * 2.2 + y * 0.08 + k) * 2 * (y - 29) / 75); for (let i = 0; i < 18; i++) R.pset(x + i + v, y, i === 0 || i === 17 ? K : (i + ri(Math.sin(y * 0.2 + t * 2) * 2)) % 6 < 2 ? cs : c); R.pset(x + v, y, K); }
    for (let i = 0; i < 18; i++) { const v = ri(Math.sin(t * 2.2 + 104 * 0.08 + k) * 2); if (i % 3) R.pset(x + i + v, 104 + (i % 2), H('#e8c060')); }
    const v = ri(Math.sin(t * 2.2 + 60 * 0.08 + k) * 1); R.poligono([[x + 4 + v, 58], [x + 9 + v, 50], [x + 14 + v, 58], [x + 9 + v, 64]], H('#e8c060')); R.pset(x + 9 + v, 57, K); }
  const f = 0.85 + 0.15 * Math.sin(t * 2.1);
  luz(160, 70, 60, ORO[4], 0.18 * f);
  for (let k = 0; k < 14; k++) { const y = ri(30 + ((h2(k, 1, 151) * 110 + t * 4) % 110)), x = ri(124 + h2(k, 2, 151) * 72 + Math.sin(t * 0.6 + k) * 3); tiñe(x, y, H('#fff0c0'), 0.55); }
  coronita(160, 104, t, 2);
  // los sacerdotes entran con sus estandartes en «religion» y se inclinan ante el trono vacío
  const entra = tramo(t, @relig@ - 0.6, @belongs@), reve = tramo(t, @belongs@, @belongs@ + 0.6);
  for (const k of [0, 1]) { const x = ri(lerp(-30 - k * 24, 70 - k * 30, entra)); inclinado(PA.sacerdotePA, x, 152, t, { dir: 1, anda: entra > 0 && entra < 1 }, reve * 0.55); if (reve < 0.5) estandarte(x + 15, 144, 30, t, k, 1); else estandarte(x + 18, 152, 30, t, k, 1); }
  // las dos cunas al pie de la escalinata, con la luz de los niños; en «two children» se avivan
  const nin = tramo(t, @twoch@ - 0.2, @twoch@ + 0.5);
  cunaLado(118, 172, t, 0, 1.3, 0.55 + 0.45 * nin, GLOW_A, MANTA_A); cunaLado(202, 172, t, 1, 1.3, 0.55 + 0.45 * nin, GLOW_O, MANTA_O);
  if (t > @carry@) for (const [x, c] of [[118, AZ[4]], [202, ORO[6]]]) { const u = ((t - @carry@) * 1.5) % 1; R.pset(x, ri(150 - u * 10), c); R.pset(x - 1, ri(151 - u * 10), c); }
  lucie(160 + Math.sin(t * 1.0) * 6, 146 + flota(t), t, { dir: 1, cara: t > @twoch@ ? 'sonrisa' : 'triste', brillo: 0.8 });
};
const efectos = [[0.9, 'viento'], [@hadnt@, 'brillo'], [P3 + 0.75, 'papel'], [@two@, 'pop'], [@over@ - 0.5, 'tapestop'],
  [@order@, 'sello'], [@breaks@, 'golpecito'], [@cond@, 'brillo'], [@duncan@, 'brillo'], [@chanib@, 'burbujas'],
  [@stops@, 'whoosh'], [@throne2@, 'toc'], [P13 + 0.3, 'viento'], [@eyes@ - 0.3, 'rafaga'], [@relig@ - 0.4, 'pasos'], [@twoch@, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14], [P15, p15]], { efectos, año: 12 });
'''

CAB_PRECIO = '''// PA-PRECIO (frases 28–33). Año 12; sin cartela. Ánimo de ternura. Quince planos (Atom con su grano azul en todos;
// los bebés, solo la luz de las cunas; nada de armas: la orden es un sello rojo que se rompe, Scytale solo tiende la mano):
// 1. fondo propio, el sietch de lejos de noche: la meseta con la boca y las ventanas encendidas; en «gives birth» la luz
//    se aviva y se encienden más ventanas; dos Fremen suben con candiles; una Fremen cruza la duna con su cántaro;
//    (corta en «and she dies»)
// 2. sietch cuarto/puerta: Paul ciego espera en el pasillo; en «dies» la luz se apaga y sale la nodriza, triste; en
//    «But» la luz vuelve, doble (dorada y azul), y en «hadn't seen» Paul levanta la cabeza: «!»;  (corta en «Not one»)
// 3. sietch cuarto/general, GAG de las dos cunas: Atom deja una mantita en la cuna, se da la vuelta silbando y en «two»
//    aparece la segunda con un destello; se vuelve: «!»; en «boy» se enciende la luz azul y en «girl» la dorada; en
//    «Leto»/«Ganima» dos destellos; la nodriza señala;  (corta en «His vision»)
// 4. inserto, las dos cunas desde arriba sobre la alfombra: el halo dorado de la visión solo en la niña (se aviva en
//    «girl»); la mano de Paul entra y toca la cuna del niño en «understands»: el halo se rompe, «?»;  (corta en «the future»)
// 5. fondo propio, la cúpula de roca: venas de luz por las paredes que se apagan de la punta hacia Paul hasta «over»;
//    Paul busca a un lado y a otro; en «truly blind» se apaga hasta el haz de luna;  (corta en «And then»)
// 6. conspiracion laboratorio/general: Bijaz le lleva el sello rojo a Hayt y en «order» se lo mete en la cabeza; en
//    «kill Paul», la X roja;  (corta en «set to go off»)
// 7. inserto, la mesa de piedra: la lámpara de Chani se apaga en «Chani died»; el hilo rojo lleva la chispa al sello,
//    que late; en «the blow» tiembla, en «breaks» se raja y en «conditioning» se parte y sale una luz dorada;
//    Atom, en la mesa, se tapa y la señala;  (corta en «And out of»)
// 8. fondo propio, la terraza de roca al alba: Hayt llega ante Paul; en «whole» le envuelve la luz y en «real Duncan»
//    sale Duncan, que sonríe; en «memories» suben tres burbujas (el mar, el castillo, el chico);  (corta en «Scytale»)
// 9. conspiracion laboratorio/tanques: Scytale tiende la mano; en «Chani back» se forma en el tanque una Chani de luz y
//    en «Duncan was brought back», un Duncan verde en el de al lado; Atom lo señala;  (corta en «Paul says no»)
// 10. fondo propio, la antecámara del tapiz: Scytale ofrece la Chani de luz en la palma; en «no» Paul niega con la
//    cabeza; en «babies» Scytale se vuelve a la puerta donde brillan las cunas; en «throne» la corona y en «fortune» el
//    oro;  (corta en «and Paul, blind»)
// 11. inserto, la pared y la cuna azul: las sombras al doble; Scytale se acerca; en «son's eyes» dos destellos en la cuna
//    y un hilo azul hasta la sombra de Paul, que en «stops him» alza la mano; la de Scytale recula;  (corta en «And then
//    Paul does»)
// 12. fondo propio, la grieta de salida al amanecer: Paul deja la corona en la repisa; el viejo Fremen le da el bastón
//    en «blind»; en «leaves the throne» brilla la corona, la Fremen saca un pañuelo, el otro alza la mano y Paul echa a andar;
//    (corta en «and walks out»)
// 13. fondo propio, las dunas de la mañana de perfil: Paul sube la cresta con el bastón; el viento le borra cada
//    huella; en «no one ever sees him again» se deshace en la calima;  (corta en «So the man»)
// 14. inserto, la arena de cerca: tres signos (el ojo, la gota, el camino) que el viento borra en «eyes», «Chani» y
//    «future»; Atom los señala y se queda abrazando su grano; un escarabajo cruza;  (corta en «and all he leaves»)
// 15. fondo propio, el trono vacío de frente: la corona en el asiento, los estandartes que siguen ondeando; en
//    «religion» entran los sacerdotes y en «belongs» se inclinan ante el trono vacío; en «two children» se avivan las
//    luces de las dos cunas.'''

# instantes de la voz inglesa (s de la escena, de linea.json)
TP = dict(p2=5.70, p3=11.06, p4=16.31, p5=20.72, p6=25.83, p7=30.52, p8=35.44, p9=40.83, p10=47.40, p11=52.94, p12=57.20,
          p13=62.03, p14=67.11, p15=72.70,
          gives=0.78, learned=3.86, dies=5.98, but=8.76, hadnt=10.30, two=12.46, boy=13.22, girl=13.74, leto=14.56,
          gany=15.22, girl2=17.70, under=19.70, over=22.40, truly=24.60, blind=24.86, trap=26.48, hayt=27.98,
          order=29.06, kill=29.42, chanid=31.40, died=31.76, blow=32.78, breaks=34.02, cond=34.52, whole=36.64,
          duncan=37.42, mems=39.52, offer=42.56, chanib=43.82, newb=44.86, brought=45.82, no=47.94, tries=48.56,
          babies=49.96, force=50.50, throne=51.46, fortune=52.14, sees=54.38, sons=55.16, stops=55.98, law=58.21,
          blind3=59.79, leaves=60.73, throne2=61.25, noone=64.83, again=65.71, eyes=69.58, chani3=70.72,
          future=71.84, relig=74.34, belongs=75.60, twoch=77.02, carry=78.68)

E['pa-precio'] = ('El precio', CAB_PRECIO, COMUN + sub(EXTRA + CUERPO, 'pa-precio', TP))
