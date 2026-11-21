# Borrador de escenas del ep44 (grupo S4): pa-etiqueta y pa-conspira. Formato del 11: E[id] = (título, cabecera, cuerpo).
import json, os

_R = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_M = json.load(open(os.path.join(_R, 'atomo/plato/escenas/marcas-ep44.json')))


def W(esc, s, marca=None):
    """instante s (s de la escena, sacado de linea.json) → «en('marca', f)» con la marca de la frase que lo contiene"""
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

# ── lo común de las dos escenas ──────────────────────────────────────────────────────────────────────────────────────
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
const sombrea = (x, y, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const aclara = (x, y, c, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// EL GRANO DE ESPECIA AZUL (el hilo del episodio: Atom lo lleva desde pa-caladan): le da vueltas como un electrón más
const AZ = pal(['#141e4a', '#2a4ab0', '#5a8ae8', '#a8ccff', '#f0f8ff']);
const grano = (x, y, t, s = 1) => { const X = ri(x), Y = ri(y);
  R.halo(X, Y, (5.5 + Math.sin(t * 6) * 1.2) * s, [AZ[1], AZ[2], AZ[3]], 1.15);
  R.rect(X - 1, Y - 2, X + 1, Y + 2, AZ[0]); R.rect(X - 2, Y - 1, X + 2, Y + 1, AZ[0]); R.rect(X - 1, Y - 1, X + 1, Y + 1, AZ[3]); R.pset(X, Y, AZ[4]); };
const lucie = (x, y, t, o = {}) => { AT.luciernaga(R, x, y, t, o); const a = t * 2.4; grano(x + Math.cos(a) * 12, y + Math.sin(a) * 4, t, 0.6); };
const atomG = (x, s, t, o = {}) => { const r = AT.atom(R, x, s, t, o); const a = t * 2.4, k = o.s ?? 1; grano(r.centro[0] + Math.cos(a) * 11 * k, r.centro[1] + Math.sin(a) * 4 * k, t, 0.6 + 0.2 * (k - 1)); return r; };
// muro de sillares: ramp de claro a oscuro (el último, la junta); o.luz(x, y) suma oscuridad (negativo aclara)
const sillares = (x0, y0, x1, y1, ramp, o = {}) => {
  const al = o.alto ?? 8, an = o.ancho ?? 18, k = o.k ?? 1, luz = o.luz, n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / al), yy = (y - y0) % al, off = (fila & 1) * (an >> 1);
    for (let x = x0; x <= x1; x++) { const xx = (x - x0 + off) % an, bl = Math.floor((x - x0 + off) / an);
      let v = 1.4 + (h2(bl, fila, k) - 0.5) * 0.9 + (ns(x * 0.35, y * 0.35) - 0.5) * 0.7 + (luz ? luz(x, y) : 0);
      if (yy === 0 || xx === 0) v = n; else if (yy === 1 || xx === 1) v -= 0.7; else if (yy === al - 1 || xx === an - 1) v += 0.6;
      if (h2(x, y, k + 3) > 0.965) v += 1;
      R.pset(x, y, rmp(ramp, Math.min(v, n - 0.01), x, y)); } }
};
// madera con vetas (tablas horizontales de alto al); ramp de claro a oscuro; luz(x, y) como en sillares
const madera = (x0, y0, x1, y1, ramp, o = {}) => {
  const al = o.alto ?? 9, n = ramp.length - 1, k = o.k ?? 5, luz = o.luz;
  for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / al), yy = (y - y0) % al;
    for (let x = x0; x <= x1; x++) { const veta = Math.sin((x + h2(tb, 0, k) * 300) * 0.06 + Math.sin(x * 0.013 + tb) * 3 + yy * 0.5);
      let v = 1.2 + veta * 0.55 + (h2(tb, 1, k) - 0.5) * 0.8 + (luz ? luz(x, y) : 0);
      if (yy === 0) v = n; else if (yy === 1) v -= 0.6;
      if ((x + tb * 53) % 97 === 0) v = n - 0.3;
      if (h2(x, y, k) > 0.985) v += 0.8;
      R.pset(x, y, rmp(ramp, Math.max(0, Math.min(v, n - 0.01)), x, y)); } }
};
// un marco de madera o de latón de (x0, y0) a (x1, y1), con luz arriba y sombra abajo
const marco = (x0, y0, x1, y1, c, cl2, cs, g = 2) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, c);
  R.rect(x0, y0, x1, y0, cl2); R.rect(x0, y0, x0, y1, cl2); R.rect(x0, y1, x1, y1, cs); R.rect(x1, y0, x1, y1, cs); R.rect(x0 + g, y0 + g, x1 - g, y1 - g, K); };
// pinta f y lo deja ver solo en proporción a (fundido con trama): para que algo aparezca o se desvanezca
const conAlfa = (a, f, caja = [0, 0, 319, 179]) => { if (a >= 1) return f(); if (a <= 0) return;
  const [x0, y0, x1, y1] = caja, B = R.buf, copia = new Uint32Array(B); const r = f();
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x; if (B[i] !== copia[i] && b4(x, y) > a) B[i] = copia[i]; }
  return r; };
// un actor pintado en un hueco, leído y devuelto como lista de píxeles relativos a sus pies (para espejos y reflejos)
const MK = 0xff00ff01 >>> 0;
const capturaActor = (def, t, o = {}) => { const B = R.buf, Wd = 40, Hd = 44, copia = B.slice(0, 320 * Hd);
  for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) B[j * 320 + i] = MK;
  R.actor(def, 12, 42, t, o); const px = [];
  for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) { const c = B[j * 320 + i]; if (c !== MK) px.push([i - 12, j - 42, c]); }
  B.set(copia, 0); return px; };
// recuerdo: un tinte sepia en toda la pantalla y una viñeta suave
const sepia = (a = 0.55) => { const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = B[i], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = 0.3 * r + 0.59 * g + 0.11 * b;
  const v = Math.hypot((x - 160) / 190, (y - 90) / 120), o = v > 0.8 && b4(x, y) < (v - 0.8) * 2.2 ? 0.55 : 1;
  const rr = (l * 1.05 + 28) * o, gg = (l * 0.9 + 14) * o, bb = (l * 0.68) * o;
  B[i] = (0xff000000 | (Math.min(255, Math.round(b + (bb - b) * a)) << 16) | (Math.min(255, Math.round(g + (gg - g) * a)) << 8) | Math.min(255, Math.round(r + (rr - r) * a))) >>> 0; } };
// el estandarte de los Fremen (verde o negro, con el halcón de oro como un punto)
const banderolaG = (x, y, h, t, k) => {
  const v = Math.round(Math.sin(t * 2.6 + k) * 1.5), c = k % 2 ? H('#1f4a2c') : H('#18181e'), cs = k % 2 ? H('#3a7048') : H('#3a3a46');
  R.linea(x, y, x, y - h, H('#4a3420')); R.pset(x, y - h - 1, H('#e8c040'));
  R.poligono([[x + 1, y - h], [x + 11 + v, y - h + 1], [x + 10 + v, y - h + 9], [x + 1, y - h + 9]], K);
  R.poligono([[x + 1, y - h + 1], [x + 10 + v, y - h + 2], [x + 9 + v, y - h + 8], [x + 1, y - h + 8]], c);
  R.linea(x + 1, y - h + 1, x + 9 + v, y - h + 2, cs); R.linea(x + 1, y - h + 8, x + 9 + v, y - h + 8, H('#c8a030'));
  const cx = x + 5 + Math.round(v / 2), cy = y - h + 4; R.pset(cx, cy, H('#f0c848')); R.pset(cx - 1, cy - 1, H('#f0c848')); R.pset(cx + 1, cy - 1, H('#f0c848')); R.pset(cx, cy + 1, H('#c89a30'));
};
const pausa = (t, a, b) => AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
const flota = (t, k = 0) => Math.round(Math.sin(t * 2.4 + k) * 1.5);
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
# PA-ETIQUETA (frases 15–16): la pausa 2 y Campbell
# palabras: notice 0.34 · Herbert 2.50 · see 3.58 · When 4.64 · came out 5.62 · read Paul 7.18 · hero 8.32 · and Herbert
# 9.22 · wrote 9.72 · correct 10.90 · 1984 12.96 · interview 13.82 · he said 14.84 · every 15.54 · charismatic 15.82 ·
# leader 16.30 · history 17.06 · label 18.86 · forehead 19.44 · Warning 20.66 · dangerous 22.58 · health 23.54 · And it
# cost him 24.54 · Campbell 26.46 · editor 27.38 · magazine 27.96 · serialized Dune 28.70 · turned 30.24 · down 30.88 ·
# because 31.24 · win 32.92 · not 33.66 · wrong 34.82 · and the book 35.54 · different 37.60 · magazine 37.80 · 1969 38.96
# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
CAB_ETIQ = '''// PA-ETIQUETA (frases 15–16). La PAUSA «fíjate en esto» 2 (año 12) y Campbell (sin barra: es el mundo real). Ocho planos:
// 1. CONGELADO el último plano de pa-emperador (el salón del trono de noche: Paul sin corona, la corona en el asiento,
//    sacerdotes y Fremen con estandartes): entra Atom al doble, señala a Paul en «notice this» y lo rodea con su
//    órbita en «see»;  (corta en «When»)
// 2. la librería de 1965 (a color): los lectores cogen el libro de la pirámide del escaparate, el «1965» en su
//    cartelito; en «hero» alzan el libro y les salen estrellas; Atom luciérnaga se entristece;  (corta en «and Herbert»)
// 3. CONGELADO el planeta desde el espacio (pa-emperador p7), Atom a la izquierda: la máquina de escribir a color; teclea en «wrote» y sale la
//    hoja; corrige en rojo en «correct»; en «1984» sale la cinta de la entrevista a color con su «1984»;  (corta en «he said»)
// 4. CONGELADA la fachada de la ciudadela desde la plaza: tres bustos de líder a color, uno por palabra («every
//    charismatic leader»); Atom coge la etiqueta (triángulo «!») en «label» y se la pega en la frente al del medio en
//    «forehead»;  (corta en «Warning»)
// 5. el trono congelado: Paul vuelve a color; el triángulo grande de aviso baja sobre él en «Warning» y late; en
//    «health» un corazón; vuelve el color y Atom se despide;  (corta en «And it cost him»)
// 6. la consulta de los sesenta hecha despacho del editor: el editor de gafas lee el manuscrito tras la mesa; la
//    revista «1965» enmarcada en la pared se ilumina en «serialized Dune»; en «turned Messiah down» niega y lo suelta;
//    (corta en «because»)
// 7. la mesa del editor de cerca: la mano con el lápiz rojo pone un visto a la revista del héroe que gana en «win» y
//    una X grande en el manuscrito en «wrong»; lo empuja fuera de la mesa;  (corta en «and the book»)
// 8. el revistero del quiosco: la mano del quiosquero mete la revista nueva «1969» junto a la «1965» en «different
//    magazine»; la órbita la rodea en «1969»; Atom, abajo, abraza las hojas recogidas.
// Sonido: el golpe de la pausa, un pop por cada cosa que sale a color, el aviso, el clic al salir; papel, lápiz, sello.'''

CUERPO_ETIQ = r'''
// ── los instantes de corte y de acción (de linea.json, palabra a palabra) ──
const P2 = @c2@, P3 = @c3@, P4 = @c4@, P5 = @c5@, P6 = @c6@, P7 = @c7@, P8 = @c8@;
const NOTICE = @notice@, HERB = @herb@, SEE = @see@, CAME = @came@, READ = @read@, HERO = @hero@, WROTE = @wrote@, CORR = @corr@, N84 = @n84@;
const EVERY = @every@, CHAR = @charis@, LEADER = @leader@, LABEL = @label@, FORE = @fore@, WARN = @warn@, DANG = @dang@, HEALTH = @health@, PFIN = @pfin@;
const CAMP = @camp@, EDITOR = @editor@, SERIAL = @serial@, TURNED = @turned@, DOWN = @down@, WIN = @win@, NOT = @not@, WRONG = @wrong@, DIFF = @diff@, N69 = @n69@;

// ── EL ÚLTIMO PLANO DE PA-EMPERADOR, para congelarlo: el salón del trono de noche, la corona dejada en el asiento, Paul
//    en la alfombra y detrás sacerdotes y Fremen que alzan sus estandartes (el instante, fijo) ──
const FZ = 61.797 - 1 / 30;
// (copiado de pa-emperador p12, grupo S3: su último instante, para que el corte sea limpio)
const corona = (cx, y) => { const X = ri(cx), Y = ri(y); R.rect(X - 4, Y - 4, X + 4, Y, K); R.rect(X - 3, Y - 2, X + 3, Y - 1, H('#e8c060')); for (const i of [-3, 0, 3]) { R.pset(X + i, Y - 3, H('#f0c848')); R.pset(X + i, Y - 4, K); } R.pset(X, Y - 2, H('#c83a3a')); };
const sombraGrande = (s, t) => {
  if (s <= 0) return;
  const B = R.buf, Wd = 30, Hd = 40, copia = B.slice(0, 320 * Hd);
  for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) B[j * 320 + i] = MK;
  R.actor(PA.paulEmperador, 7, 38, t, { dir: 1, quieto: true }); corona(15, 12);
  const px = []; for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) { const c = B[j * 320 + i]; if (c !== MK) px.push([i, j, j < 14 && (c & 255) > 200 && ((c >>> 8) & 255) > 150 && ((c >>> 16) & 255) < 140]); }
  B.set(copia, 0);
  const sc = lerp(1, 2.6, s), X0 = 160 - 15 * sc, Y0 = 108 - 38 * sc;
  R.recorte([96, 18, 224, 108]);
  const hecho = new Set();
  for (const [i, j, oro] of px) for (let x = Math.floor(X0 + i * sc); x < Math.floor(X0 + (i + 1) * sc); x++) for (let y = Math.floor(Y0 + j * sc); y < Math.floor(Y0 + (j + 1) * sc); y++) { const k = y * 320 + x; if (hecho.has(k)) continue; hecho.add(k); R.pset(x, y, oro ? mez(R.pget(x, y), H('#e8b840'), 0.3 + s * 0.5) : mez(R.pget(x, y), H('#0a0610'), 0.25 + s * 0.4)); }
  R.recorte(null);
};
const tronoFinal = (t, paul = true) => {
  const o = { encuadre: 'trono', luz: 'noche', vacio: true };
  T.ciudadela(R, t, o);
  sombraGrande(1, t);
  if (paul) R.actor(PA.paulEmperador, 152, 150, t, { dir: 1, triste: true });
  [[40, 1, PA.sacerdotePA], [64, 1, PA.fremen], [90, 1, PA.fremenMujer], [216, -1, PA.fremen], [242, -1, PA.sacerdotePA], [268, -1, PA.fremen]].forEach(([x, d, def], k) => {
    const sube = Math.max(0, Math.sin(t * 4.4 + k * 1.3)) * 8, hx = x + (d > 0 ? 15 : 1), hy = ri(136 - sube);
    const r = R.actor(def, x, 152, t, { dir: d, sostiene: [hx, hy], sonrisa: true, habla: k % 2 === 0 });
    const m = r.mano || [hx, hy]; banderolaG(m[0], m[1] + 6, 28, t, k); });
  T.ciudadelaDelante(R, t, o);
};
const fzA = () => horno('fzA', () => tronoFinal(FZ));
const fzA0 = () => horno('fzA0', () => tronoFinal(FZ, false));
// el planeta visto desde el espacio (pa-emperador p7, solo el decorado), congelado
const fzC = () => horno('fzC', () => { const o = { encuadre: 'orbita' }; T.planeta(R, 20, o); T.planetaDelante(R, 20, o); });
const fzB = () => horno('fzB', () => { const o = { encuadre: 'balcon', camara: 'multitud' }; T.ciudadela(R, 3.2, o); T.ciudadelaDelante(R, 3.2, o); });

// ── objetos a color de la pausa (se pintan a escala 1 en un hueco y se pegan al doble con AT.escalado) ──
// la máquina de escribir de los sesenta (26 × 20): k = tecla que baja, p (0–1) cuánto ha subido la hoja, rojo: la corrección
const maquina = (k, p, rojo) => () => {
  R.rect(1, 8, 24, 19, K); R.rect(2, 9, 23, 18, H('#3a5a4a')); R.rect(2, 9, 23, 10, H('#5a8a6a')); R.rect(2, 17, 23, 18, H('#24382e'));
  R.rect(0, 6, 25, 9, K); R.rect(1, 7, 24, 8, H('#2a2a30')); R.rect(0, 6, 1, 9, H('#8a8a94')); R.rect(24, 6, 25, 9, H('#8a8a94'));
  const hy = 7 - Math.round(p * 6); R.rect(6, hy, 19, 7, K); R.rect(7, hy + 1, 18, 7, H('#f6f2e6'));
  for (let y = hy + 2; y < 7; y += 2) R.linea(8, y, 8 + ((y * 7) % 9), y, H('#7a7a84'));
  if (rojo > 0 && hy + 2 < 7) R.linea(8, hy + 3, 8 + Math.round(rojo * 9), hy + 2, H('#e83a3a'));
  for (let f = 0; f < 3; f++) for (let i = 0; i < 6; i++) { const x = 4 + i * 3 + f, y = 11 + f * 2, b = k === f * 6 + i; R.pset(x, y + (b ? 1 : 0), H('#f0ece0')); R.pset(x + 1, y + (b ? 1 : 0), H('#c8c4b8')); }
  R.rect(8, 17, 17, 17, H('#c8c4b8')); R.disco(4, 4, 2, K); R.disco(21, 4, 2, K); R.pset(4, 4, H('#c83a3a')); R.pset(21, 4, H('#c83a3a'));
};
// la cinta de la entrevista (casete, 20 × 13), con las bobinas que giran
const casete = (t) => () => {
  R.rect(0, 0, 19, 12, K); R.rect(1, 1, 18, 11, H('#2a2a34')); R.rect(3, 2, 16, 7, H('#f2ead2')); R.rect(3, 2, 16, 3, H('#e86a3a'));
  for (const cx of [6, 13]) { R.disco(cx, 5, 2, K); const a = t * 6 + cx; R.pset(cx + Math.round(Math.cos(a) * 1.4), 5 + Math.round(Math.sin(a) * 1.4), H('#f2ead2')); }
  R.rect(5, 9, 14, 11, H('#4a4a56')); R.pset(7, 10, K); R.pset(12, 10, K);
};
// la etiqueta de aviso: triángulo amarillo con «!» (9 × 8)
const etiqueta = (x, y) => { R.poligono([[x + 4, y - 1], [x + 9, y + 8], [x - 1, y + 8]], K); R.poligono([[x + 4, y + 1], [x + 7, y + 7], [x + 1, y + 7]], H('#ffd23a'));
  R.rect(x + 4, y + 3, x + 4, y + 5, K); R.pset(x + 4, y + 7, K); };
// un busto de líder sobre su pedestal (18 × 26): tipo 0 laurel, 1 gorra de plato, 2 corona; et: la etiqueta en la frente
const busto = (tipo, et) => () => {
  const M = H('#e8e4dc'), MS = H('#b8b2a8'), MSS = H('#8a847c');
  R.rect(3, 20, 14, 25, K); R.rect(4, 21, 13, 24, MS); R.rect(4, 21, 13, 21, M); R.rect(2, 18, 15, 20, K); R.rect(3, 19, 14, 19, M);
  R.poligono([[1, 18], [16, 18], [13, 12], [4, 12]], K); R.poligono([[2, 17], [15, 17], [12, 13], [5, 13]], MS); R.linea(5, 14, 8, 16, MSS); R.linea(12, 14, 9, 16, MSS);
  R.rect(6, 10, 11, 13, K); R.rect(7, 10, 10, 12, MS);
  R.disco(8, 6, 5, K); R.disco(8, 6, 4, M); R.rect(9, 3, 11, 9, MS); R.pset(6, 3, H('#ffffff'));
  R.pset(7, 6, MSS); R.pset(10, 6, MSS); R.linea(7, 9, 10, 9, MSS);
  if (tipo === 0) for (let i = 0; i < 5; i++) { R.pset(4 + i, 3 - (i < 2 ? i : 4 - i) * 0, H('#c8a030')); R.pset(5 + i * 2, 1 + (i % 2), H('#e8c040')); }
  if (tipo === 1) { R.rect(3, 0, 13, 2, K); R.rect(4, 1, 12, 2, MS); R.rect(2, 3, 14, 3, K); R.pset(8, 1, H('#e8c040')); }
  if (tipo === 2) { R.rect(4, 0, 12, 2, H('#c8a030')); R.pset(4, -1, H('#e8c040')); R.pset(8, -1, H('#e8c040')); R.pset(12, -1, H('#e8c040')); R.rect(4, 2, 12, 2, H('#8a6a20')); }
  if (et) etiqueta(4, 1);
};
// un corazón (9 × 8) que late
const corazon = () => { const P = ['.##.##...', '#######..', '#######..', '.#####...', '..###....', '...#.....'];
  P.forEach((f, j) => [...f].forEach((ch, i) => { if (ch === '#') R.pset(i, j + 1, H('#e83a4a')); })); R.pset(1, 2, H('#ffb0b8')); };
const libroCubierta = (x, y) => { R.rect(x, y, x + 9, y + 13, K); R.rect(x + 1, y + 1, x + 8, y + 12, H('#e0a050')); R.rect(x + 1, y + 1, x + 8, y + 5, H('#f0c070'));
  R.disco(x + 6, y + 4, 1, H('#fff0b0')); R.linea(x + 1, y + 9, x + 8, y + 7, H('#a86a2a')); R.rect(x + 1, y + 10, x + 8, y + 12, H('#c07a34')); R.pset(x + 1, y + 1, H('#fff4d0')); };

// ── 1 · la pausa: Atom entra y señala a Paul ───────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  R.copiar(fzA()); pausa(t, 0, 99);
  const anda = tramo(t, 0.2, 1.4), x = lerp(336, 238, ease(anda)), senala = t > NOTICE + 0.4 && t < SEE + 0.8;
  atomG(x, 174, t, { s: 2, pose: anda < 1 ? 'camina' : senala ? 'senala' : 'quieto', dir: -1, cara: t > NOTICE && t < NOTICE + 0.6 ? 'sorpresa' : senala ? 'normal' : 'sonrisa', habla: voz(t) });
  const u = tramo(t, HERB, SEE); if (u > 0) AT.anillo(R, 159, 132, 15, 21, t, u);
};

// ── 2 · la librería de 1965 ────────────────────────────────────────────────────────────────────────────────────────
const LOM = pal(['#e0503a', '#3a6aa8', '#e8c040', '#4a8a5a', '#8a4a8a', '#d8d0bc', '#2a2a34', '#c87a3a', '#6ab0c8', '#a83a3a']);
const estante = (x0, y0, x1, y1, k) => {
  madera(x0, y0, x1, y1, pal(['#a8784a', '#8a5e38', '#6a4628', '#3a2414']), { alto: 50, k });
  for (let fila = 0, y = y0 + 4; y + 20 < y1; fila++, y += 24) {
    R.rect(x0 + 2, y, x1 - 2, y + 19, H('#2a1a10'));
    for (let x = x0 + 3; x < x1 - 4;) { const w = 3 + Math.floor(h2(x, fila, k) * 3), hh = 13 + Math.floor(h2(x, fila, k + 1) * 6), c = LOM[Math.floor(h2(x, fila, k + 2) * LOM.length)];
      if (h2(x, fila, k + 3) > 0.9) { x += 4; continue; }
      const w2 = Math.min(w, x1 - 3 - x); if (w2 < 2) break;
      R.rect(x, y + 19 - hh, x + w2 - 1, y + 19, c); R.rect(x, y + 19 - hh, x, y + 19, mez(c, H('#ffffff'), 0.3)); R.rect(x + w2 - 1, y + 19 - hh, x + w2 - 1, y + 19, mez(c, K, 0.35));
      R.rect(x, y + 22 - hh, x + w2 - 1, y + 22 - hh, mez(c, K, 0.4)); if (hh > 15) R.rect(x, y + 16, x + w2 - 1, y + 16, H('#e8c040'));
      x += w2 + (h2(x, fila, k + 4) > 0.8 ? 1 : 0); }
    R.rect(x0 + 1, y + 20, x1 - 1, y + 22, H('#c89a68')); R.rect(x0 + 1, y + 22, x1 - 1, y + 22, H('#4a2e18')); }
};
const fondoLibreria = () => {
  // la pared de yeso crema con su trama y la moldura del techo
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#f4e6c4', '#e6d4ae', '#d2bc94', '#a88e6a']), 0.9 + ns(x * 0.15, y * 0.15) * 0.8 + y * 0.004 + (h2(x, y) > 0.97 ? 1 : 0), x, y));
  R.rect(0, 15, 319, 17, H('#c8a878')); R.rect(0, 18, 319, 18, H('#8a6a48'));
  estante(0, 22, 102, 150, 3); estante(224, 22, 319, 112, 9);
  // el escaparate: la calle de 1965 (cielo, la acera de enfrente con su tienda de toldo a rayas y un árbol)
  const VX0 = 112, VX1 = 210, VY0 = 26, VY1 = 112;
  marco(VX0 - 4, VY0 - 4, VX1 + 4, VY1 + 4, H('#2e5a4a'), H('#4a8a6a'), H('#1a3a2e'), 0);
  for (let y = VY0; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) { let c = rmp(pal(['#cfe6f4', '#a8cce8', '#7aa8d8']), (y - VY0) * 0.025 + 0.2, x, y);
    if (y > 64) c = rmp(pal(['#c8a088', '#a87a64', '#7a5444']), 1 + ns(x * 0.3, y * 0.2) * 0.7 + ((x - VX0) % 22 < 1 ? 1 : 0), x, y);
    if (y > 66 && y < 72) c = ((x >> 2) & 1) ? H('#e83a3a') : H('#f6f2e6');
    if (y > 75 && y < 94 && (x - VX0) % 22 > 4 && (x - VX0) % 22 < 17) c = rmp(pal(['#4a6a8a', '#2a3a5a', '#1a2234']), 1 + (y - 75) * 0.06, x, y);
    if (y > 96) c = rmp(pal(['#a8a8a0', '#8a8a84', '#6a6a66']), 1 + ((x + y) % 14 < 1 ? 1 : 0) + ns(x * 0.4, y) * 0.5, x, y);
    R.pset(x, y, c); }
  for (const [cx, cy, r] of [[190, 52, 12], [182, 58, 9], [198, 60, 9]]) R.disco(cx, cy, r, H('#4a8a4a'));
  for (let y = 40; y < 74; y++) for (let x = 172; x < 206; x++) if (Math.hypot(x - 190, y - 56) < 14 && h2(x, y) > 0.6) R.pset(x, y, H('#6aaa5a'));
  R.rect(189, 64, 191, 96, H('#5a3a24'));
  // la carpintería del escaparate y el mostrador del escaparate
  R.rect(VX0 - 4, VY0 - 4, VX1 + 4, VY0 - 1, H('#2e5a4a')); R.rect(VX0 - 4, VY0 - 4, VX1 + 4, VY0 - 4, H('#4a8a6a'));
  for (const x of [144, 177]) R.rect(x, VY0, x + 1, VY1, H('#2e5a4a'));
  R.rect(VX0 - 6, VY1 + 2, VX1 + 6, VY1 + 7, H('#6a4628')); R.rect(VX0 - 6, VY1 + 2, VX1 + 6, VY1 + 2, H('#c89a68'));
  // el suelo de linóleo de damero de los sesenta
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const k = (Math.floor((x - (y - 150) * 0.6) / 16) + Math.floor((y - 150) / 8)) & 1;
    R.pset(x, y, rmp(k ? pal(['#e8dcc0', '#d0c2a4', '#b0a284']) : pal(['#8a3a2a', '#72301f', '#5a2414']), 0.8 + ns(x * 0.2, y * 0.3) * 0.7 + (y - 150) * 0.02, x, y)); }
  R.rect(0, 148, 319, 150, H('#4a2e18'));
  // el mostrador con la caja registradora (a la derecha)
  R.rect(228, 116, 319, 150, K); madera(229, 117, 319, 150, pal(['#b8885a', '#9a6a40', '#7a5030', '#4a2e18']), { alto: 34, k: 11 }); R.rect(226, 113, 319, 117, H('#5a3a22')); R.rect(226, 113, 319, 113, H('#d8a870'));
  R.rect(286, 96, 312, 113, K); R.rect(287, 97, 311, 112, H('#6a6a74')); R.rect(287, 97, 311, 99, H('#a8a8b4')); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) R.rect(290 + i * 5, 103 + j * 4, 292 + i * 5, 104 + j * 4, H('#e8e4dc')); R.rect(292, 90, 306, 96, K); R.rect(293, 91, 305, 95, H('#2a2a30'));
  // la mesa de novedades (en el centro), con su faldón
  R.rect(110, 130, 214, 150, K); R.rect(111, 131, 213, 149, H('#2e5a4a')); for (let x = 113; x < 212; x += 6) R.rect(x, 133, x + 2, 148, H('#24483a')); R.rect(106, 126, 218, 131, K); R.rect(107, 127, 217, 130, H('#c89a68')); R.rect(107, 127, 217, 127, H('#f0c890'));
  // las lámparas de globo del techo (sus cables)
  for (const x of [196, 262]) R.linea(x, 0, x, 8, K);
};
const p2 = (t) => {
  fijo('libreria', fondoLibreria);
  const VX0 = 112, VX1 = 210;
  // por el escaparate pasa un coche de 1965 y un señor con sombrero (recortados al hueco)
  R.recorte([VX0, 26, VX1, 112]);
  const cx = ri(lerp(80, 250, ((t - P2) / 4.2) % 1));
  R.poligono([[cx, 106], [cx + 34, 106], [cx + 32, 98], [cx + 24, 92], [cx + 8, 92], [cx + 2, 98]], K); R.poligono([[cx + 1, 105], [cx + 33, 105], [cx + 31, 99], [cx + 3, 99]], H('#3a8aa8'));
  R.poligono([[cx + 9, 93], [cx + 23, 93], [cx + 28, 98], [cx + 5, 98]], H('#cfe6f4')); R.disco(cx + 8, 107, 3, K); R.disco(cx + 26, 107, 3, K); R.linea(cx + 1, 102, cx + 33, 102, H('#e8e4dc'));
  const sx = ri(lerp(214, 120, ((t - P2 + 1.3) / 6) % 1)); R.disco(sx, 88, 2, H('#2a2a34')); R.linea(sx - 3, 86, sx + 3, 86, K); for (let y = 90; y < 104; y++) R.linea(sx - 2, y, sx + 2, y, H('#5a5a6a'));
  R.recorte(null);
  // las lámparas de globo que se mecen
  for (const [x, k] of [[196, 1], [262, 2]]) { const dx = ri(Math.sin(t * 1.3 + k) * 1.5); R.linea(x, 8, x + dx, 12, K); R.disco(x + dx, 17, 5, K); R.disco(x + dx, 17, 4, H('#fff4c8')); R.pset(x + dx - 2, 15, H('#ffffff')); }
  // la pirámide de libros de 1965 sobre la mesa y su cartelito
  const coge = tramo(t, CAME - 0.3, CAME + 0.4);
  for (let f = 0; f < 3; f++) for (let i = 0; i <= 3 - f; i++) { if (f === 2 && i === 1 && coge > 0.5) continue; libroCubierta(126 + i * 11 + f * 5, 113 - f * 14); }
  for (let i = 0; i < 4; i++) libroCubierta(178 + (i % 2) * 11, 113 - Math.floor(i / 2) * 14);
  R.rect(148, 70, 176, 82, K); R.rect(149, 71, 175, 81, H('#f6f2e6')); R.numero('1965', 162, 80, { centro: true, color: H('#c83a3a'), sombra: false }); R.linea(162, 83, 162, 90, K);
  // el póster del héroe en el lado del estante: una silueta con aureola (en «hero» se enciende)
  const he = tramo(t, HERO - 0.3, HERO + 0.2);
  R.rect(78, 52, 100, 82, K); R.rect(79, 53, 99, 81, H('#f0c070')); for (let a = 0; a < 12; a++) { const p = a / 12 * Math.PI * 2 + t * 0.6 * he; R.linea(89, 64, 89 + ri(Math.cos(p) * (7 + he * 4)), 64 + ri(Math.sin(p) * (7 + he * 4)), he > 0.5 ? H('#fff8d0') : H('#e8a040')); }
  R.disco(89, 62, 3, K); R.poligono([[84, 80], [94, 80], [92, 66], [86, 66]], K);
  // los lectores: uno entra y coge un libro, otro hojea, otra hace cola; el librero en la caja
  const u = tramo(t, P2 + 0.1, CAME - 0.2);
  const x1 = ri(lerp(-14, 128, ease(u))), alza = t > READ + 0.2;
  R.actor(EL.oficinista2, x1, 156, t, { dir: 1, anda: u > 0 && u < 1, sostiene: coge > 0.5 ? (alza ? [x1 + 16, 122] : [x1 + 16, 136]) : undefined, sonrisa: alza });
  if (coge > 0.5) libroCubierta(alza ? x1 + 13 : x1 + 13, alza ? 112 : 126);
  const r2 = R.actor(EL.empollon, 206, 158, t, { dir: -1, sostiene: alza ? [196, 124] : [196, 138], sonrisa: alza });
  libroCubierta(r2.mano[0] - 6, r2.mano[1] - 12);
  if (!alza && Math.sin(t * 5) > 0.3) R.linea(r2.mano[0] - 1, r2.mano[1] - 12, r2.mano[0] - 4, r2.mano[1] - 8, H('#f6f2e6'));
  R.actor(EL.disenadora, 64, 160, t, { dir: 1, sostiene: [80, 140], sorpresa: t > HERO && t < HERO + 0.8, sonrisa: t > HERO + 0.8 }); libroCubierta(75, 128);
  R.actor(EL.oficinista, 262, 116, t, { dir: -1, habla: t > CAME && t < READ, sonrisa: t > HERO });
  // en «hero»: estrellitas doradas que suben de los lectores
  const hs = tramo(t, HERO - 0.1, HERO + 1.2);
  if (hs > 0 && hs < 1) for (const [bx, k] of [[x1 + 8, 0], [214, 1], [72, 2]]) for (let i = 0; i < 3; i++) { const yy = 112 - hs * 26 - i * 7, xx = bx + ri(Math.sin(t * 4 + i + k) * 4) + (i - 1) * 6; R.pset(xx, ri(yy), H('#ffe066')); R.pset(xx - 1, ri(yy), H('#e8a030')); R.pset(xx + 1, ri(yy), H('#e8a030')); R.pset(xx, ri(yy) - 1, H('#fff8c0')); R.pset(xx, ri(yy) + 1, H('#e8a030')); }
  lucie(lerp(244, 232, tramo(t, P2, P2 + 1)) + Math.sin(t * 1.5) * 3, 70 + Math.sin(t * 2.3) * 2, t, { dir: -1, brillo: 0.8, cara: t > HERO ? 'triste' : 'normal' });
};

// ── 3 · la pausa otra vez: la máquina de escribir y la cinta de 1984 ─────────────────────────────────────────────────
const p3 = (t) => {
  R.copiar(fzC()); AT.pausa(R, 1);
  const tec = t > WROTE && t < CORR, k = tec ? Math.floor(t * 12) % 18 : -1, p = tramo(t, WROTE, CORR), rojo = tramo(t, CORR, CORR + 0.5);
  const r = atomG(108, 176, t, { s: 2, pose: t < WROTE - 0.3 ? 'senala' : t < N84 ? 'sostiene' : 'senala', dir: 1, cara: t > CORR && t < CORR + 0.8 ? 'guino' : t > N84 ? 'sonrisa' : 'normal', habla: voz(t) });
  const um = tramo(t, P3 + 0.1, P3 + 0.5);
  if (um > 0) { const y = 104 + ri((1 - ease(um)) * 24) + flota(t); AT.escalado(R, maquina(k, p, rojo), 26, 20, 26, y, 2); if (t > P3 + 0.6 && t < WROTE + 0.5) AT.anillo(R, 52, y + 20, 32, 24, t, tramo(t, P3 + 0.6, WROTE)); }
  const uc = tramo(t, N84 - 0.2, N84 + 0.3);
  if (uc > 0) { const y = 40 + ri((1 - ease(uc)) * 20) + flota(t, 1); AT.escalado(R, casete(t), 20, 13, 222, y, 2); R.numero('1984', 242, y + 46, { tam: 16, centro: true }); }
  if (t > N84 + 0.4) AT.anillo(R, 242, ri(52 + flota(t, 1)), 28, 22, t, tramo(t, N84 + 0.4, N84 + 1.2));
};

// ── 4 · la fachada congelada: los bustos y la etiqueta ──────────────────────────────────────────────────────────────
const p4 = (t) => {
  R.copiar(fzB()); AT.pausa(R, 1);
  const BX = [[78, EVERY, 0], [146, CHAR, 2], [214, LEADER, 1]];
  for (const [x, t0, tipo] of BX) { const u = tramo(t, t0 - 0.1, t0 + 0.3); if (u <= 0) continue; const y = 64 + ri((1 - ease(u)) * 26) + flota(t, x);
    AT.escalado(R, busto(tipo, tipo === 2 && t > FORE), 18, 26, x - 18, y, 2); }
  const tiene = t > LABEL - 0.3 && t < FORE, x = lerp(282, 262, tramo(t, LABEL - 0.6, LABEL));
  const r = atomG(x, 176, t, { s: 2, pose: tiene ? 'sostiene' : t > FORE && t < FORE + 0.6 ? 'senala' : 'quieto', dir: -1, cara: t > FORE ? 'sonrisa' : t > LABEL ? 'guino' : 'normal', habla: voz(t) });
  if (tiene) { const u = tramo(t, FORE - 0.35, FORE), ex = lerp(r.mano[0] - 18, 146, ease(u)), ey = lerp(r.mano[1] - 16, 68 + flota(t, 146), ease(u)); AT.escalado(R, () => etiqueta(1, 1), 11, 10, ri(ex), ri(ey), 2); }
  if (t > FORE && t < FORE + 0.35) for (let a = 0; a < 8; a++) { const p = a / 8 * Math.PI * 2, rr = 14 + (t - FORE) * 30; R.pset(ri(155 + Math.cos(p) * rr), ri(76 + Math.sin(p) * rr), H('#ffffff')); }
};

// ── 5 · el trono congelado: Paul a color con el aviso; vuelve el color ─────────────────────────────────────────────
const p5 = (t) => {
  R.copiar(fzA0()); pausa(t, -1, PFIN);
  // Paul vuelve a color en «Warning» (a escala de su escena: los personajes no se agrandan)
  R.actor(PA.paulEmperador, 152, 150, t, { dir: 1, triste: true, quieto: t < WARN, sorpresa: t > DANG && t < DANG + 0.6 });
  const u = tramo(t, WARN - 0.1, WARN + 0.35);
  if (u > 0) { const late = 1 + (Math.sin(t * 8) > 0.6 ? 1 : 0), y = 64 + ri((1 - ease(u)) * -40);
    AT.escalado(R, () => etiqueta(1, 1), 11, 10, 149, y, 2 + late); R.linea(160, y + 30, 160, 118, H('#c8a030')); }
  const uh = tramo(t, HEALTH - 0.1, HEALTH + 0.3);
  if (uh > 0) AT.escalado(R, corazon, 9, 8, 186, 92 + flota(t, 3), Math.sin(t * 10) > 0 ? 2 : 3);
  const sale = t > PFIN - 0.2;
  atomG(lerp(238, 250, tramo(t, PFIN - 0.3, PFIN + 0.3)), 174, t, { s: 2, pose: sale ? 'saluda' : t > WARN && t < DANG ? 'senala' : 'brazos', dir: -1, cara: t > DANG && t < HEALTH ? 'sorpresa' : sale ? 'guino' : 'normal', habla: voz(t) });
};

// ── 6 · el despacho del editor (la consulta de los sesenta) ─────────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'consulta' }, g = T.estudio(R, t, o);
  // la revista que publicó Dune por entregas, enmarcada en la pared, con su «1965»
  const fx = 150, fy = 36; marco(fx, fy, fx + 26, fy + 36, H('#6a4a2a'), H('#a8784a'), H('#3a2414'), 2);
  R.rect(fx + 3, fy + 3, fx + 23, fy + 33, H('#e0a050')); R.rect(fx + 3, fy + 3, fx + 23, fy + 8, H('#c83a3a')); R.disco(fx + 16, fy + 14, 3, H('#fff0b0')); R.linea(fx + 3, fy + 24, fx + 23, fy + 20, H('#a86a2a'));
  R.poligono([[fx + 3, fy + 33], [fx + 23, fy + 33], [fx + 23, fy + 22], [fx + 3, fy + 26]], H('#c07a34')); R.numero('1965', fx + 13, fy + 32, { centro: true, fina: true, color: H('#fff4d0') });
  if (t > SERIAL - 0.2) AT.anillo(R, fx + 13, fy + 18, 20, 24, t, tramo(t, SERIAL - 0.2, SERIAL + 0.5));
  const [dx, dy] = g.detras ? [251, g.detras] : [251, 142];
  const suelta = t > TURNED + 0.3, lee = !suelta;
  const r = R.actor(EL.caballero, dx - 7, dy, t, { dir: -1, tocado: 'gafas', sostiene: lee ? [dx - 12 + ri(Math.sin(t * 0.7) * 1), dy - 20] : undefined, enfado: t > TURNED && t < DOWN + 0.8, habla: t > CAMP && t < CAMP + 0.8, triste: false });
  T.estudioDelante(R, t, o);
  // el manuscrito: en sus manos mientras lee (pasa hoja), y luego cae sobre la mesa
  const mx = lee ? r.mano[0] - 9 : dx - 24, my = lee ? r.mano[1] - 8 : (g.escritorio ? g.escritorio[1] - 5 : dy - 14);
  R.rect(mx, my, mx + 10, my + 12, K); R.rect(mx + 1, my + 1, mx + 9, my + 11, H('#f6f2e6')); for (let y = my + 3; y < my + 11; y += 2) R.linea(mx + 2, y, mx + 7, y, H('#9a9aa4'));
  if (lee && Math.sin(t * 3) > 0.7) R.linea(mx + 9, my + 1, mx + 5, my + 6, H('#ffffff'));
  // Atom de pie delante, espera el veredicto
  atomG(lerp(150, 176, tramo(t, P6, P6 + 1.5)), 168, t, { dir: 1, pose: t < P6 + 1.5 ? 'camina' : t > TURNED + 0.3 ? 'brazos' : 'quieto', cara: t > TURNED + 0.3 ? 'triste' : t > SERIAL ? 'sonrisa' : 'normal' });
};

// ── 7 · la mesa del editor de cerca ─────────────────────────────────────────────────────────────────────────────────
const fondoMesa = () => {
  madera(0, 0, 319, 179, pal(['#8a5a34', '#74482a', '#5e3820', '#3a2010']), { alto: 30, k: 21, luz: (x, y) => Math.hypot(x - 150, y - 60) / 260 });
  // el secante de piel verde con sus cantoneras
  R.rect(58, 30, 262, 160, K); for (let y = 31; y < 160; y++) for (let x = 59; x < 262; x++) R.pset(x, y, rmp(pal(['#4a7a5a', '#3a6a4a', '#2e5a3e']), 1 + ns(x * 0.2, y * 0.2) * 0.8, x, y));
  for (const [x, y] of [[58, 30], [244, 30], [58, 142], [244, 142]]) { R.rect(x, y, x + 18, y + 18, K); R.rect(x + 1, y + 1, x + 17, y + 17, H('#5a3420')); R.rect(x + 1, y + 1, x + 17, y + 2, H('#8a5a34')); }
  // la taza de café y el cenicero con la pipa (abajo a la izquierda), el teléfono negro arriba a la derecha
  R.disco(30, 40, 13, K); R.disco(30, 40, 12, H('#f2eee2')); R.disco(30, 40, 9, H('#5a3018')); R.disco(28, 38, 3, H('#8a5a34')); R.rect(42, 37, 47, 43, K); R.rect(43, 38, 46, 42, H('#f2eee2'));
  R.disco(30, 148, 14, K); R.disco(30, 148, 13, H('#8a8a94')); R.disco(30, 148, 9, H('#5a5a64')); for (let i = 0; i < 6; i++) R.pset(26 + i * 2, 148 + (i % 2), H('#c8c4bc'));
  R.rect(20, 140, 44, 143, K); R.rect(21, 141, 43, 142, H('#6a3a1a')); R.disco(46, 141, 4, K); R.disco(46, 141, 3, H('#4a2410'));
  R.rect(274, 6, 316, 30, K); R.rect(275, 7, 315, 29, H('#1a1a20')); R.disco(295, 18, 9, K); R.disco(295, 18, 8, H('#2a2a32')); for (let a = 0; a < 10; a++) { const p = a / 10 * Math.PI * 2; R.pset(295 + ri(Math.cos(p) * 5), 18 + ri(Math.sin(p) * 5), H('#c8c4bc')); } R.rect(272, 32, 318, 38, K); R.rect(273, 33, 317, 37, H('#2a2a32'));
  // las gafas dobladas, los clips, el sello y el tampón
  R.disco(270, 120, 5, K); R.disco(282, 120, 5, K); R.disco(270, 120, 4, H('#9ac8e0')); R.disco(282, 120, 4, H('#9ac8e0')); R.linea(275, 119, 277, 119, K); R.linea(265, 118, 260, 108, K); R.linea(287, 118, 292, 108, K);
  for (const [x, y] of [[278, 62], [286, 66], [272, 70]]) { R.rect(x, y, x + 5, y + 2, H('#c8ccd8')); R.rect(x + 1, y + 1, x + 4, y + 1, H('#5a5a6a')); }
  R.rect(276, 84, 300, 100, K); R.rect(277, 85, 299, 99, H('#3a3a6a')); R.rect(280, 88, 296, 96, H('#24244a'));
  R.rect(14, 76, 26, 96, K); R.rect(15, 77, 25, 89, H('#8a2a1a')); R.rect(15, 89, 25, 95, H('#6a6a74')); R.rect(17, 70, 23, 77, K); R.rect(18, 71, 22, 76, H('#c89a68'));
  // la pila de revistas del héroe que gana (portadas propias: un héroe con el trofeo bajo un cohete)
  for (let i = 3; i >= 0; i--) { const x = 184 + i * 3, y = 48 + i * 3; R.rect(x, y, x + 40, y + 54, K); R.rect(x + 1, y + 1, x + 39, y + 53, i ? LOM[(i * 3) % LOM.length] : H('#2a4a9a')); }
  const X0 = 185, Y0 = 49;
  for (let y = Y0 + 1; y < Y0 + 30; y++) for (let x = X0 + 1; x < X0 + 39; x++) if (h2(x, y) > 0.95) R.pset(x, y, H('#ffffff'));
  R.disco(X0 + 30, Y0 + 10, 5, H('#f0c070')); R.poligono([[X0 + 8, Y0 + 6], [X0 + 14, Y0 + 2], [X0 + 12, Y0 + 12]], H('#e8e4dc'));
  R.rect(X0 + 15, Y0 + 24, X0 + 23, Y0 + 44, K); R.disco(X0 + 19, Y0 + 20, 4, K); R.disco(X0 + 19, Y0 + 20, 3, H('#f0c8a0')); R.rect(X0 + 16, Y0 + 25, X0 + 22, Y0 + 43, H('#c83a3a'));
  R.linea(X0 + 23, Y0 + 26, X0 + 29, Y0 + 16, K); R.rect(X0 + 27, Y0 + 10, X0 + 33, Y0 + 15, H('#ffd23a')); R.rect(X0 + 29, Y0 + 15, X0 + 31, Y0 + 17, H('#ffd23a')); R.rect(X0 + 28, Y0 + 18, X0 + 32, Y0 + 18, H('#c8a030'));
  R.rect(X0 + 1, Y0 + 46, X0 + 39, Y0 + 53, H('#1a2a6a'));
};
const p7 = (t) => {
  fijo('mesaEditor', fondoMesa);
  // la luz de la lámpara que entra de arriba y el humo de la pipa y del café
  for (let k = 0; k < 6; k++) { const s = ((t * 0.5 + k / 6) % 1), x = 46 + ri(Math.sin(t * 1.4 + k) * 3 + s * 6), y = ri(136 - s * 36); if (b4(x, y) < 0.6 * (1 - s)) R.pset(x, y, H('#d8d4cc')); R.pset(x + 1, y - 1, H('#b8b4ac')); }
  for (let k = 0; k < 5; k++) { const s = ((t * 0.6 + k / 5) % 1), x = 30 + ri(Math.sin(t * 1.7 + k * 2) * 4), y = ri(30 - s * 8); if (s < 0.9) R.pset(x, y, H('#f2eee2')); }
  // el manuscrito (montón de hojas con renglones): la X roja en «wrong»; luego la mano lo empuja fuera
  const em = ease(tramo(t, WRONG + 0.25, P8 - 0.15)), mx = ri(78 - em * 120), my = 58;
  for (let i = 4; i >= 0; i--) { R.rect(mx + i * 2, my + i * 2, mx + 84 + i * 2, my + 96 + i * 2, K); R.rect(mx + 1 + i * 2, my + 1 + i * 2, mx + 83 + i * 2, my + 95 + i * 2, i ? H('#e6e0d0') : H('#f8f4ea')); }
  R.rect(mx + 22, my + 14, mx + 62, my + 18, H('#3a3a44')); R.rect(mx + 30, my + 22, mx + 54, my + 24, H('#7a7a84'));
  for (let y = my + 34; y < my + 90; y += 5) R.linea(mx + 10, y, mx + 10 + ((y * 13) % 30) + 40, y, H('#9a9aa4'));
  const ux = tramo(t, NOT, WRONG);
  if (ux > 0) { const a = cl(ux * 2), b = cl(ux * 2 - 1);
    for (let w = -1; w <= 1; w++) { R.linea(mx + 12 + w, my + 10, ri(mx + 12 + w + 60 * a), ri(my + 10 + 76 * a), H('#d82a2a')); if (b > 0) R.linea(mx + 72 + w, my + 10, ri(mx + 72 + w - 60 * b), ri(my + 10 + 76 * b), H('#d82a2a')); } }
  // el visto en la revista del héroe que gana
  if (t > WIN) T.visto(R, 200, 108, 2);
  // la mano del editor con el lápiz rojo, con su brazo canónico desde abajo a la derecha
  let hx, hy;
  if (t < WIN - 0.4) { hx = lerp(300, 250, tramo(t, P7, P7 + 0.8)); hy = 150; }
  else if (t < NOT) { const u = ease(tramo(t, WIN - 0.4, WIN)); hx = lerp(250, 214, u); hy = lerp(150, 122, u); }
  else if (t < WRONG + 0.2) { const ux2 = tramo(t, NOT, WRONG), a = cl(ux2 * 2), b = cl(ux2 * 2 - 1); hx = b > 0 ? mx + 72 - 60 * b : mx + 12 + 60 * a; hy = b > 0 ? my + 10 + 76 * b : my + 10 + 76 * a; if (ux2 === 0) { hx = lerp(214, mx + 12, tramo(t, NOT - 0.4, NOT)); hy = lerp(122, my + 10, tramo(t, NOT - 0.4, NOT)); } }
  else { hx = mx + 88; hy = my + 60; }
  hx = ri(hx) + 6; hy = ri(hy) + 6;
  const lp = t < WRONG + 0.2;
  T.brazo(R, hx + 34, 186, hx, hy, '#6a5a44', -1, { codo: [hx + 26, hy + 26] });
  if (lp) { R.linea(hx - 6, hy - 6, hx + 4, hy + 2, K); R.linea(hx - 5, hy - 6, hx + 5, hy + 2, H('#d82a2a')); R.pset(hx - 6, hy - 7, H('#3a2a1a')); }
  lucie(30 + Math.sin(t * 1.3) * 3, 100 + Math.sin(t * 2.1) * 3, t, { dir: 1, brillo: 0.85, cara: t > WRONG ? 'triste' : t > WIN ? 'sorpresa' : 'normal' });
};

// ── 8 · el revistero del quiosco ───────────────────────────────────────────────────────────────────────────────────
// una portada propia (26 × 34): fondo, una figura y algo (cohete, planeta, robot); nunca letras
const portada = (x, y, k) => { const c = LOM[k % LOM.length], c2 = LOM[(k * 7 + 3) % LOM.length];
  R.rect(x, y, x + 26, y + 34, K); R.rect(x + 1, y + 1, x + 25, y + 33, c); R.rect(x + 1, y + 1, x + 25, y + 6, c2); R.rect(x + 3, y + 3, x + 14, y + 4, mez(c2, H('#ffffff'), 0.6));
  const m = k % 4;
  if (m === 0) { R.disco(x + 17, y + 18, 6, H('#f0c070')); R.disco(x + 15, y + 16, 2, H('#fff0b0')); }
  if (m === 1) { R.poligono([[x + 13, y + 9], [x + 17, y + 22], [x + 9, y + 22]], H('#e8e4dc')); R.rect(x + 11, y + 22, x + 15, y + 25, H('#e8603a')); }
  if (m === 2) { R.rect(x + 9, y + 12, x + 17, y + 26, H('#a8acb8')); R.rect(x + 10, y + 14, x + 12, y + 15, H('#e83a3a')); R.rect(x + 14, y + 14, x + 16, y + 15, H('#e83a3a')); }
  if (m === 3) { for (let i = 0; i < 9; i++) R.pset(x + 3 + ((i * 7) % 21), y + 10 + ((i * 5) % 18), H('#ffffff')); R.disco(x + 12, y + 24, 4, H('#6ab0c8')); }
  R.rect(x + 1, y + 29, x + 25, y + 33, mez(c, K, 0.35)); };
const fondoQuiosco = () => {
  // el fondo del quiosco: tablas pintadas de verde con su trama, y el toldo a rayas arriba
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a7a5a', '#3a6a4a', '#2a4e36', '#1a3424']), 1 + ns(x * 0.2, y * 0.05) * 0.6 + ((x % 14) === 0 ? 1.5 : 0), x, y));
  for (let y = 0; y < 21; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#2e5a42', '#24483a', '#1a3a2c']), 1 + ns(x * 0.1, y * 0.2) * 0.5, x, y));
  R.rect(0, 19, 319, 20, H('#c8a040'));
  for (let x = 0; x < 320; x++) for (let y = 21; y < 27 + ((x % 20) < 10 ? 2 : 0); y++) R.pset(x, y, ((x / 20) | 0) % 2 ? H('#f2eee2') : H('#d83a3a'));
  for (let x = 0; x < 320; x++) R.pset(x, 27 + ((x % 20) < 10 ? 2 : 0), K);
  // la calle por el hueco de la derecha (cielo, la fachada de enfrente, la farola)
  marco(244, 29, 317, 151, H('#2e4a3a'), H('#4a7a5a'), H('#1a2a20'), 0);
  for (let y = 31; y < 150; y++) for (let x = 246; x < 316; x++) { let c = y < 70 ? rmp(pal(['#cfe6f4', '#a8cce8']), (y - 22) * 0.03, x, y) : rmp(pal(['#c8b098', '#a88e74', '#7a6450']), 1 + ns(x * 0.3, y * 0.3) * 0.6, x, y);
    if (y >= 70 && ((x - 246) % 18 > 4 && (x - 246) % 18 < 13) && y < 100) c = H('#3a4a6a'); if (y > 128) c = rmp(pal(['#9a9a94', '#7a7a76']), 0.5 + ns(x, y) * 0.8, x, y); R.pset(x, y, c); }
  // el revistero: tres baldas de listones con las portadas
  R.rect(8, 30, 236, 152, K); madera(9, 31, 235, 151, pal(['#c8986a', '#a87a4a', '#8a5e34', '#5a3a1e']), { alto: 42, k: 31 });
  // el mostrador de abajo, con periódicos y las monedas
  R.rect(0, 152, 319, 179, K); madera(0, 153, 319, 179, pal(['#b8885a', '#9a6a40', '#7a5030', '#4a2e18']), { alto: 9, k: 33 }); R.rect(0, 152, 319, 153, H('#e0b080'));
  for (let i = 0; i < 4; i++) { R.rect(250 + i, 160 - i * 2, 300 + i, 176 - i * 2, K); R.rect(251 + i, 161 - i * 2, 299 + i, 175 - i * 2, H('#e6e2d8')); } for (let y = 156; y < 168; y += 3) R.linea(256, y, 296, y, H('#8a8a94'));
  for (const [x, y] of [[214, 166], [222, 170], [206, 172]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, H('#c8ccd8')); R.pset(x - 1, y - 1, H('#ffffff')); }
};
const SLOTS = []; for (let f = 0; f < 3; f++) for (let i = 0; i < 7; i++) SLOTS.push([14 + i * 31 + (f === 1 ? 6 : 0), 33 + f * 39, f, i]);
const p8 = (t) => {
  fijo('quiosco', fondoQuiosco);
  R.recorte([246, 31, 315, 149]);
  const cx = ri(lerp(340, 200, ((t - P8) / 3.6) % 1)); R.poligono([[cx, 140], [cx + 36, 140], [cx + 34, 130], [cx + 26, 124], [cx + 8, 124], [cx + 2, 130]], K); R.poligono([[cx + 1, 139], [cx + 35, 139], [cx + 33, 131], [cx + 3, 131]], H('#e8c040')); R.disco(cx + 8, 141, 3, K); R.disco(cx + 28, 141, 3, K);
  const px = ri(lerp(250, 312, ((t - P8 + 2) / 7) % 1)); R.disco(px, 112, 2, H('#f0c8a0')); for (let y = 115; y < 128; y++) R.linea(px - 2, y, px + 2, y, H('#8a3a3a'));
  R.recorte(null);
  // la farola con su luz que parpadea (fuera, a la derecha)
  R.rect(304, 40, 305, 128, K); R.disco(304, 40, 3, Math.sin(t * 9) > 0.8 ? H('#fff4c8') : H('#e8d8a0'));
  // las portadas (una se mece con la corriente); el hueco de la de 1969 al lado de la de 1965
  for (const [x, y, f, i] of SLOTS) { if (f === 0 && i === 3) continue; const k = f * 7 + i; const dy = k === 9 ? ri(Math.sin(t * 3) * 1) : 0;
    if (f === 0 && i === 2) { portada(x, y + dy, 0); R.rect(x + 1, y + 1, x + 25, y + 33, H('#e0a050')); R.rect(x + 1, y + 1, x + 25, y + 6, H('#c83a3a')); R.disco(x + 17, y + 14, 4, H('#fff0b0')); R.linea(x + 1, y + 24, x + 25, y + 20, H('#a86a2a')); R.poligono([[x + 1, y + 33], [x + 25, y + 33], [x + 25, y + 22], [x + 1, y + 26]], H('#c07a34')); R.numero('1965', x + 13, y + 32, { centro: true, fina: true, color: H('#fff4d0') }); continue; }
    portada(x, y + dy, k + 1); }
  for (let f = 0; f < 3; f++) { const y = 68 + f * 39; R.rect(10, y, 234, y + 3, K); R.rect(11, y, 233, y + 2, H('#d8a878')); }
  // la revista nueva: la mano del quiosquero la mete en el hueco en «different magazine»
  const [sx, sy] = SLOTS[3], u = ease(tramo(t, DIFF - 0.6, DIFF + 0.2)), nx = ri(lerp(sx + 40, sx, u)), ny = ri(lerp(sy - 70, sy, u));
  if (u > 0) { R.rect(nx, ny, nx + 26, ny + 34, K); R.rect(nx + 1, ny + 1, nx + 25, ny + 33, H('#3a2a5a')); R.rect(nx + 1, ny + 1, nx + 25, ny + 6, H('#e8c040'));
    R.disco(nx + 13, ny + 15, 6, H('#e8c040')); R.disco(nx + 13, ny + 15, 5, H('#3a2a5a')); R.disco(nx + 13, ny + 15, 2, H('#1a1420')); R.rect(nx + 11, ny + 17, nx + 15, ny + 25, H('#1a1420'));
    R.numero('1969', nx + 13, ny + 32, { centro: true, fina: true, color: H('#ffe066') }); }
  if (u > 0 && t < DIFF + 0.6) T.brazo(R, nx + 52, ri(ny - 12), nx + 28, ny + 18, '#8a6a4a', -1, { codo: [nx + 46, ny + 8] });
  if (t > N69 - 0.2) AT.anillo(R, sx + 13, sy + 17, 21, 23, t, tramo(t, N69 - 0.2, N69 + 0.4));
  // Atom, en el mostrador, abraza las hojas recogidas y sonríe cuando aparece la revista
  const HJ = [[52, P8 + 0.8], [100, P8 + 1.6], [148, P8 + 2.4]], ax = lerp(-24, 168, ease(tramo(t, P8, P8 + 2.7))), nh = HJ.filter(([x, t0]) => t > t0).length;
  for (const [x, t0] of HJ) if (t <= t0) { R.poligono([[x - 10, 170], [x + 9, 167], [x + 11, 174], [x - 8, 177]], K); R.poligono([[x - 9, 170], [x + 8, 168], [x + 10, 173], [x - 7, 176]], H('#f6f2e6')); R.linea(x - 6, 171, x + 6, 169, H('#9a9aa4')); R.linea(x - 5, 173, x + 5, 171, H('#9a9aa4')); }
  const coge = HJ.some(([x, t0]) => t > t0 - 0.3 && t < t0 + 0.1);
  const r = atomG(ax, 173, t, { s: 2, dir: 1, pose: coge ? 'senala' : nh ? 'sostiene' : 'camina', cara: t > DIFF ? 'sonrisa' : coge ? 'sorpresa' : 'normal' });
  for (let i = 0; i < nh; i++) { const x = r.mano[0] - 10 + i * 2, y = r.mano[1] - 12 - i * 3; R.rect(x, y, x + 15, y + 11, K); R.rect(x + 1, y + 1, x + 14, y + 10, H('#f6f2e6')); R.linea(x + 3, y + 4, x + 12, y + 4, H('#9a9aa4')); R.linea(x + 3, y + 7, x + 10, y + 7, H('#9a9aa4')); }
};

const efectos = [[0.05, 'tapestop'], [HERB, 'brillo'],
  [CAME, 'papel'], [HERO, 'brillo'],
  [WROTE, 'tecleo'], [CORR, 'lapiz'], [N84, 'pop'],
  [EVERY, 'pop'], [LEADER, 'golpecito'], [FORE, 'sello'],
  [WARN, 'aviso'], [HEALTH, 'pop'], [PFIN - 0.25, 'interruptor'],
  [CAMP, 'papel'], [DOWN, 'papel'],
  [WIN, 'lapiz'], [NOT + 0.2, 'lapiz'], [WRONG + 0.4, 'papel'],
  [DIFF, 'papel'], [N69, 'brillo']];
const año = (t) => (t < P2 ? 12 : t < P3 ? null : t < P6 ? 12 : null);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año });
'''

E['pa-etiqueta'] = ('La etiqueta', CAB_ETIQ, COMUN + sub(CUERPO_ETIQ, 'pa-etiqueta', {
    'c2': 4.64, 'c3': 9.22, 'c4': 14.84, 'c5': 20.66, 'c6': 24.54, 'c7': 31.24, 'c8': 35.54,
    'notice': 0.34, 'herb': 2.16, 'see': 3.58, 'came': 5.62, 'read': 7.18, 'hero': 8.32, 'wrote': 9.72, 'corr': 10.90, 'n84': 12.96,
    'every': 15.54, 'charis': 15.82, 'leader': 16.30, 'label': 18.86, 'fore': 19.44, 'warn': 20.66, 'dang': 22.58, 'health': 23.54, 'pfin': 24.14,
    'camp': 25.70, 'editor': 27.38, 'serial': 28.70, 'turned': 30.24, 'down': 30.88, 'win': 32.60, 'not': 33.66, 'wrong': 34.60, 'diff': 37.60, 'n69': 38.96}))

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
# PA-CONSPIRA (frases 17–21)
# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
CAB_CONSP = '''// PA-CONSPIRA (frases 17–21). Año 12 (los recuerdos de Caladan, año 0). Trece planos:
// 1. la sala secreta: la Reverenda Madre entra por la puerta acorazada, Scytale y Bijaz ya esperan junto a la mesa de
//    luz; sobre ella, el holograma de Paul con su corona, que se vuelve rojo en «band together»;  (corta en «the Bene»)
// 2. el tablero de la mesa de luz de cerca: el árbol de linajes de la Bene Gesserit; la mano negra de la Reverenda
//    Madre toca el punto de Paul y en «back» tira del hilo dorado hacia ella; en «Spacing Guild» entra la luz naranja
//    del tanque;  (corta en «whose»)
// 3. el tanque del navegante de cerca: una nave cruza el gas y en «folding space» se pliega y reaparece; GAG: Atom
//    echa el aliento en el cristal y dibuja una carita en el vaho;  (corta en «and the Tleilaxu»)
// 4. el laboratorio tleilaxu: Bijaz cruza la nave y alza un frasco con una figurita en «manufacture people»; Scytale
//    lo señala; técnicos al fondo;  (corta en «And with them»)
// 5. la cocina de la ciudadela: Irulan entra, mira a los lados en «secretly» y echa tres gotas en el cuenco en
//    «slipping»; Atom, junto a los cántaros, se lleva las manos a la cara;  (corta en «into»)
// 6. el cuenco de cerca: por la ventanita pasan los días y las noches, en la pared se tachan los años; la mano de
//    Irulan vuelve a echar gotas; en «heir» el vapor dibuja una cuna y en «her» le cae encima una corona;  (corta en «The»)
// 7. el banco tleilaxu: la mano de Bijaz ata un lazo rojo al frasco en «gift» (el regalo); la luz se vuelve roja en
//    «cruelest»; en «ghola» brilla una célula que se divide y crece hasta una figurita dormida en «cells»;  (corta en «And the dead man»)
// 8. RECUERDO (sepia) en la sala de Caladan: Duncan enseña el mapa a Paul niño; en «gave his life» se pone delante del
//    chico con los brazos abiertos y se desvanece; Paul se queda solo y triste en «boy»;  (corta en «Except»)
// 9. los tanques de cerca: el del centro es Hayt; sus ojos de metal destellan en «metal eyes»; Bijaz da golpecitos en
//    el cristal; en «remembers nothing», un «?»;  (corta en «Paul knows»)
// 10. el salón del trono, en la tarima, de noche: Hayt ante Paul sentado; en «tells him so» Hayt habla y señala; en
//    «keeps him anyway» Paul se levanta, baja los peldaños y le pone la mano en el hombro;  (corta en «Because»)
// 11. RECUERDO en el paseo de Caladan (sin lluvia): Paul niño y Duncan ríen; en «childhood friend» Duncan lo aúpa;  (corta en «Among»)
// 12. el vestidor de Scytale: ante el espejo cambia de cara y de túnica en «change his face» (una, otra) y GAG: un
//    instante tiene la cara de Atom; en «shirt», otra; Atom se toca la suya;  (corta en «and in the movie»)
// 13. la galería de la corte: cinco personajes en fila; Atom pasa con la lupa; en «doesn't seem to be» el Fremen del
//    final parpadea con la cara gris de Scytale y Atom da un salto.'''

CUERPO_CONSP = r'''
const C2 = @c2@, C3 = @c3@, C4 = @c4@, C5 = @c5@, C6 = @c6@, C7 = @c7@, C8 = @c8@, C9 = @c9@, C10 = @c10@, C11 = @c11@, C12 = @c12@, C13 = @c13@;
const BAND = @band@, BACK = @back@, GUILD = @guild@, FLY = @fly@, FOLD = @fold@, SPICE = @spice@, MANUF = @manuf@, SCIEN = @scien@;
const SECRET = @secret@, SLIP = @slip@, CONTRA = @contra@, YEARS = @years@, HEIR = @heir@, SHE = @she@;
const GIFT = @gift@, CRUEL = @cruel@, GHOLA = @ghola@, BODY = @body@, CELLS = @cells@, DUNCAN = @duncan@, SWORD = @sword@, GAVE = @gave@, BOY = @boy@;
const METAL = @metal@, HAYT = @hayt@, NOTHING = @nothing@, TELLS = @tells@, KEEPS = @keeps@, CHILD = @child@;
const DANCER = @dancer@, CHANGE = @change@, ATOMF = @atomf@, SHIRT = @shirt@, MOVIE = @movie@, SEEM = @seem@;

// ── 1 · la sala secreta ─────────────────────────────────────────────────────────────────────────────────────────────
const holoPaul = (cx, cy, t, rojo) => { const c1 = rojo ? H('#ff5a4a') : H('#8ad8ff'), c2 = rojo ? H('#a82a2a') : H('#3a8ac8');
  for (let y = -12; y <= 8; y++) for (let x = -5; x <= 5; x++) { const cab = Math.hypot(x, y + 8) < 3.2, cuerpo = y > -5 && Math.abs(x) <= 2 + (y + 5) * 0.3, cor = y >= -13 && y <= -11 && Math.abs(x) <= 3 && (x + 3) % 3 !== 1;
    if ((cab || cuerpo || cor) && ((x + y + Math.floor(t * 8)) & 1) === 0) R.pset(cx + x, cy + y, y < -10 ? H('#ffe066') : (x + y) % 3 ? c1 : c2); }
  if (Math.sin(t * 13) > 0.6) R.linea(cx - 6, cy + ri(Math.sin(t * 3) * 8), cx + 6, cy + ri(Math.sin(t * 3) * 8), c1); };
const c1 = (t) => {
  const o = { encuadre: 'sala' }; T.conspiracion(R, t, o);
  const u = tramo(t, 0.2, 2.4), xr = ri(lerp(30, 64, ease(u)));
  R.actor(PA.reverendaMadre, xr, 150, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > BAND - 0.2 });
  R.actor(PA.scytale, 186, 150, t, { dir: -1, habla: t > 1 && t < 2.4, sonrisa: t > BAND });
  R.actor(PA.bijaz, 112, 150, t, { dir: 1, sonrisa: t > BAND, dedo: t > BAND + 0.3 });
  T.conspiracionDelante(R, t, o);
  holoPaul(126, 104, t, t > BAND);
  if (t > BAND && t < BAND + 0.4) for (let a = 0; a < 10; a++) { const p = a / 10 * Math.PI * 2, rr = 10 + (t - BAND) * 40; R.pset(ri(126 + Math.cos(p) * rr), ri(100 + Math.sin(p) * rr * 0.6), H('#ff8a6a')); }
  lucie(214 + Math.sin(t * 1.4) * 2, 56 + Math.sin(t * 2.2) * 2, t, { dir: -1, brillo: 0.7, cara: t > BAND ? 'sorpresa' : 'normal' });
};

// ── 2 · el tablero de la mesa de luz: el árbol de linajes ───────────────────────────────────────────────────────────
const NODOS = [[96, 40], [224, 40], [64, 72], [128, 72], [192, 72], [256, 72], [96, 104], [160, 104], [224, 104], [160, 140]];
const LAZOS = [[0, 2], [0, 3], [1, 4], [1, 5], [3, 7], [4, 7], [2, 6], [5, 8], [7, 9], [6, 9], [8, 9]];
const fondoTablero = () => {
  // el marco de metal oscuro con remaches y el cristal azul con su trama de estrellas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a4e5e', '#3a3e4c', '#2a2e3a', '#1a1c26']), 1.2 + ns(x * 0.2, y * 0.2) * 0.6 + (h2(x, y) > 0.97 ? 1 : 0), x, y));
  for (let y = 16; y < 166; y++) for (let x = 20; x < 300; x++) { const d = Math.hypot((x - 160) / 150, (y - 90) / 90);
    R.pset(x, y, rmp(pal(['#4ab0e8', '#2a7ac0', '#1a4a8a', '#0e2a5a', '#081838']), 1.2 + d * 2.4 + ns(x * 0.08, y * 0.08) * 0.6, x, y)); }
  R.rect(18, 14, 301, 15, K); R.rect(18, 166, 301, 167, K); R.rect(18, 14, 19, 167, K); R.rect(300, 14, 301, 167, K);
  R.rect(20, 16, 299, 16, H('#8ad8ff'));
  for (let x = 8; x < 320; x += 24) for (const y of [7, 173]) { R.disco(x, y, 2, K); R.pset(x, y, H('#a8acb8')); R.pset(x - 1, y - 1, H('#d8dce4')); }
  for (let y = 31; y < 160; y += 24) for (const x of [9, 310]) { R.disco(x, y, 2, K); R.pset(x, y, H('#a8acb8')); }
  // la rejilla del mapa estelar grabada en el cristal
  for (let x = 40; x < 300; x += 20) for (let y = 17; y < 166; y++) if (y % 3 === 0) R.pset(x, y, H('#2a6aa8'));
  for (let y = 30; y < 166; y += 20) for (let x = 21; x < 300; x++) if (x % 3 === 0) R.pset(x, y, H('#2a6aa8'));
  // las líneas del linaje (oro apagado)
  for (const [a, b] of LAZOS) { const [x0, y0] = NODOS[a], [x1, y1] = NODOS[b]; R.linea(x0, y0, x0, (y0 + y1) >> 1, H('#a88a40')); R.linea(x0, (y0 + y1) >> 1, x1, (y0 + y1) >> 1, H('#a88a40')); R.linea(x1, (y0 + y1) >> 1, x1, y1, H('#a88a40')); }
};
const c2 = (t) => {
  fijo('tablero', fondoTablero);
  // el mapa estelar que gira despacio: anillos y estrellas
  const g = (t - C2) * 0.15;
  for (let i = 0; i < 60; i++) { const r = 20 + (i * 37) % 120, a = i * 2.4 + g * (1 + (i % 3) * 0.3), x = ri(160 + Math.cos(a) * r * 1.4), y = ri(90 + Math.sin(a) * r * 0.62);
    if (x > 21 && x < 299 && y > 17 && y < 165) { R.pset(x, y, i % 5 ? H('#bfe8ff') : H('#ffffff')); if (i % 7 === 0) { R.pset(x + 1, y, H('#6ab0e8')); R.pset(x - 1, y, H('#6ab0e8')); } } }
  for (let a = 0; a < 200; a++) { const p = a / 200 * Math.PI * 2 + g, x = ri(160 + Math.cos(p) * 120), y = ri(90 + Math.sin(p) * 62); if (a % 3 === 0 && x > 21 && x < 299) R.pset(x, y, H('#5ab8f0')); }
  // los nodos del linaje que laten; el de Paul, dorado con su corona
  NODOS.forEach(([x, y], k) => { const p = k === 9, l = Math.sin(t * 3 + k) > 0.5 ? 1 : 0;
    R.disco(x, y, p ? 6 : 4, K); R.disco(x, y, p ? 5 : 3, p ? H('#ffd23a') : H('#e8c060')); R.pset(x - 1, y - 1, H('#fff8d0')); if (l) R.disco(x, y, p ? 2 : 1, H('#ffffff'));
    if (p) { R.rect(x - 4, y - 10, x + 4, y - 8, H('#ffd23a')); R.pset(x - 4, y - 11, H('#ffd23a')); R.pset(x, y - 11, H('#ffd23a')); R.pset(x + 4, y - 11, H('#ffd23a')); R.rect(x - 4, y - 7, x + 4, y - 7, K); } });
  // la mano negra de la Reverenda Madre baja, toca a Paul y tira del hilo dorado hacia ella en «back»
  const llega = ease(tramo(t, C2 + 0.2, C2 + 1.2)), tira = ease(tramo(t, BACK - 0.5, BACK + 0.4));
  const hx = ri(lerp(lerp(-10, 150, llega), 70, tira)), hy = ri(lerp(lerp(200, 146, llega), 150, tira));
  if (tira > 0) { for (let i = 0; i <= 20; i++) { const u = i / 20, x = ri(lerp(160, hx + 10, u)), y = ri(lerp(140, hy, u) + Math.sin(u * Math.PI) * 6 * (1 - tira * 0.5)); R.pset(x, y, H('#fff0a0')); R.pset(x, y + 1, H('#c8a030')); } }
  T.brazo(R, hx - 40, 196, hx, hy, '#1a1620', 1, { codo: [hx - 24, hy + 26], puno: '#3a3446' });
  // la luz naranja del tanque del navegante entra por la derecha en «Spacing Guild»
  const og = tramo(t, GUILD - 0.2, GUILD + 0.6);
  if (og > 0) for (let y = 16; y < 166; y++) for (let x = 230; x < 300; x++) { const a = og * (x - 230) / 70; if (b4(x, y) < a * 0.55) aclara(x, y, H('#ff9a3a'), 0.5); }
  lucie(268 + Math.sin(t * 1.3) * 2, 132 + Math.sin(t * 2) * 2, t, { dir: -1, brillo: 0.75, cara: t > BACK ? 'sorpresa' : 'normal' });
};

// ── 3 · el tanque de cerca: la nave que pliega el espacio y el gag del vaho ────────────────────────────────────────
const c3 = (t) => {
  const ax = 132, vahoF = tramo(t, SPICE - 1.6, SPICE - 1.2), cara = tramo(t, SPICE - 1.0, SPICE + 0.4);
  const o = { encuadre: 'sala', camara: 'tanque', vaho: [ax + 30, 144], vahoF, caraVaho: cara, reflejo: ax + 4 };
  T.conspiracion(R, t, o);
  // una nave de la Cofradía (nuestra: un huso largo con anillos) cruza el gas; en «folding» se pliega en un punto y
  // reaparece al otro lado
  R.recorte([86, 18, 234, 170]);
  const ft = tramo(t, FOLD - 0.3, FOLD + 0.5), vis = t > FLY - 0.4;
  if (vis) { const x = ft < 0.5 ? lerp(96, 150, tramo(t, FLY - 0.4, FOLD - 0.3)) : lerp(196, 214, tramo(t, FOLD + 0.2, SPICE)), y = 54, s = ft < 0.5 ? 1 - ft * 2 : (ft - 0.5) * 2;
    if (s > 0.1) { const L = ri(18 * s), X = ri(x), A = ri(4 * s);
      R.poligono([[X - L, y], [X - L + 4, y - A], [X + L - 4, y - A], [X + L, y], [X + L - 4, y + A], [X - L + 4, y + A]], K);
      R.poligono([[X - L + 1, y], [X - L + 4, y - A + 1], [X + L - 4, y - A + 1], [X + L - 1, y], [X + L - 4, y + A - 1], [X - L + 4, y + A - 1]], H('#8a8a9a'));
      for (const dx of [-L / 2, 0, L / 2]) R.linea(ri(X + dx), y - A, ri(X + dx), y + A, H('#c8a040')); R.pset(X + L - 2, y, H('#8ad8ff')); }
    if (ft > 0.3 && ft < 0.7) for (let a = 0; a < 12; a++) { const p = a / 12 * Math.PI * 2, r0 = 4, r1 = 4 + Math.sin(ft * Math.PI) * 14; R.linea(ri(160 + Math.cos(p) * r0 + 14), ri(54 + Math.sin(p) * r0), ri(160 + Math.cos(p) * r1 + 14), ri(54 + Math.sin(p) * r1), H('#fff0c0')); } }
  R.recorte(null);
  // Atom se acerca al cristal, echa el aliento (vaho) y dibuja la carita con el dedo; se ríe
  const sopla = t > SPICE - 1.7 && t < SPICE - 1.0, dibuja = cara > 0 && cara < 1;
  const ra = atomG(ax, 173, t, { s: 2, dir: 1, pose: dibuja ? 'senala' : 'quieto', cara: sopla ? 'sorpresa' : cara >= 1 ? 'sonrisa' : 'normal' });
  if (sopla) for (let k = 0; k < 6; k++) { const s = ((t * 2 + k / 6) % 1); R.pset(ri(ra.centro[0] + 8 + s * 14), ri(ra.centro[1] + 2 - s * 4 + Math.sin(k) * 3), H('#e8f0ff')); }
};

// ── 4 · el laboratorio tleilaxu ─────────────────────────────────────────────────────────────────────────────────────
const frascoFig = (x, y, t) => { R.rect(x - 4, y - 12, x + 4, y, K); R.rect(x - 3, y - 11, x + 3, y - 1, H('#5ad88a')); R.rect(x - 3, y - 11, x + 3, y - 9, H('#9af0b8')); R.rect(x - 4, y - 14, x + 4, y - 12, H('#6a6a74'));
  R.disco(x, y - 6, 2, H('#2a6a4a')); R.pset(x + 1, y - 4, H('#2a6a4a')); R.pset(x - 1, y - 3, H('#2a6a4a')); if (Math.sin(t * 7) > 0.3) R.pset(x + 2, y - 9 - ri((t * 6) % 2), H('#e8fff0')); };
const c4 = (t) => {
  const o = { encuadre: 'laboratorio' }; T.conspiracion(R, t, o);
  const u = tramo(t, C4, MANUF - 0.4), xb = ri(lerp(60, 140, ease(u))), alza = t > MANUF - 0.2;
  R.actor(PA.scytale, 214, 150, t, { dir: -1, dedo: t > SCIEN && t < MANUF + 0.6, habla: t > SCIEN - 0.6 && t < SCIEN + 0.4, sonrisa: t > MANUF });
  const r = R.actor(PA.bijaz, xb, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza ? [xb + 13, 118] : [xb + 15, 136], sonrisa: alza });
  frascoFig(r.mano[0], r.mano[1] + (alza ? 2 : 6), t);
  if (alza && t < MANUF + 0.6) for (let a = 0; a < 8; a++) { const p = a / 8 * Math.PI * 2, rr = 8 + (t - MANUF + 0.2) * 16; R.pset(ri(r.mano[0] + Math.cos(p) * rr), ri(r.mano[1] - 4 + Math.sin(p) * rr), H('#9af0b8')); }
  T.conspiracionDelante(R, t, o);
  lucie(88 + Math.sin(t * 1.4) * 3, 62 + Math.sin(t * 2.1) * 2, t, { dir: 1, brillo: 0.7, cara: alza ? 'sorpresa' : 'normal' });
};

// ── 5 · la cocina: las gotas de Irulan ──────────────────────────────────────────────────────────────────────────────
const GOTAS = [SLIP - 0.1, SLIP + 0.25, SLIP + 0.6];
const c5 = (t) => {
  const o = { encuadre: 'aposentos', camara: 'cocina' }; T.ciudadela(R, t, o);
  const u = tramo(t, C5 + 0.1, C5 + 1.8), xi = ri(lerp(100, 156, ease(u))), mira = t > SECRET - 0.6 && t < SECRET + 0.2, vial = t > SECRET + 0.2;
  const r = R.actor(PA.irulan, xi, 150, t, { dir: mira ? (Math.sin(t * 6) > 0 ? -1 : 1) : 1, anda: u > 0 && u < 1, sostiene: vial ? [179, 124] : undefined, sonrisa: t > GOTAS[2] + 0.3 });
  // Atom junto a los cántaros: se lleva las manos a la cara en «contraceptive»
  atomG(250, 150, t, { dir: -1, pose: t > CONTRA - 0.2 ? 'brazos' : 'quieto', cara: t > SLIP ? 'sorpresa' : 'normal' });
  T.ciudadelaDelante(R, t, o);
  if (vial) { const [mx, my] = r.mano; R.rect(mx - 2, my - 6, mx + 1, my, K); R.rect(mx - 1, my - 5, mx, my - 1, H('#8ad8ff')); R.pset(mx - 1, my - 7, H('#c8a060')); }
  for (const g0 of GOTAS) { const s = tramo(t, g0, g0 + 0.3); if (s > 0 && s < 1) { const y = ri(lerp(126, 134, s)); R.rect(180, y, 181, y + 1, H('#8ad8ff')); R.rect(180, y + 2, 181, y + 2, H('#3a8ac8')); }
    if (s >= 1 && t < g0 + 0.6) { R.pset(178, 133, H('#8ad8ff')); R.pset(184, 133, H('#8ad8ff')); R.pset(177, 132, H('#bfe8ff')); R.pset(185, 132, H('#bfe8ff')); } }
  if (t > SLIP - 0.5) AT.anillo(R, 178, 128, 16, 12, t, tramo(t, SLIP - 0.5, SLIP + 0.1));
};

// ── 6 · el cuenco de cerca: pasan los años ──────────────────────────────────────────────────────────────────────────
const fondoCuenco = () => {
  sillares(0, 0, 319, 104, pal(['#e8c898', '#d4ae7a', '#b8925e', '#8a6a40', '#5a4028']), { alto: 10, ancho: 22, k: 41, luz: (x, y) => Math.hypot(x - 160, y - 40) / 160 - 0.3 });
  // la ventanita en arco (el cielo se pinta en cada fotograma)
  R.rect(212, 30, 260, 80, K); R.disco(236, 46, 25, K);
  // el estante de la izquierda con tarros y ollas, la ristra de dátiles de la derecha
  R.rect(14, 44, 104, 47, K); R.rect(15, 44, 103, 46, H('#8a5a34')); R.rect(15, 44, 103, 44, H('#c89a68'));
  for (const [x, w, h, c] of [[20, 12, 16, '#b8643a'], [36, 9, 12, '#3a6aa8'], [50, 14, 18, '#a8784a'], [68, 10, 10, '#e8d8b0'], [82, 16, 14, '#8a4a2a']]) { R.rect(x, 44 - h, x + w, 43, K); R.rect(x + 1, 45 - h, x + w - 1, 43, H(c)); R.rect(x + 1, 45 - h, x + 2, 43, mez(H(c), H('#ffffff'), 0.3)); R.rect(x + 2, 44 - h - 2, x + w - 2, 44 - h, K); }
  // la mesa de tablas, en perspectiva
  madera(0, 104, 319, 179, pal(['#c8986a', '#a87a4a', '#8a5e34', '#5a3a1e']), { alto: 12, k: 43, luz: (x, y) => (y - 104) * 0.006 - Math.max(0, 1 - Math.hypot(x - 160, y - 130) / 120) * 0.6 });
  R.rect(0, 104, 319, 105, H('#3a2414'));
  // el pan, la jarra y la cuchara
  R.disco(52, 140, 16, K); R.disco(52, 139, 15, H('#c88a4a')); R.disco(48, 135, 9, H('#e0a860')); for (let i = 0; i < 4; i++) R.linea(40 + i * 7, 132, 44 + i * 7, 146, H('#8a5a2a'));
  R.rect(252, 94, 282, 140, K); R.rect(253, 95, 281, 139, H('#b8643a')); R.rect(253, 95, 258, 139, H('#d8844a')); R.rect(250, 90, 284, 95, K); R.rect(251, 91, 283, 94, H('#8a4a2a')); R.rect(282, 104, 290, 124, K); R.rect(283, 106, 288, 122, H('#b8643a'));
  for (let i = 0; i < 3; i++) R.rect(254, 110 + i * 9, 280, 111 + i * 9, H('#8a4a2a'));
  R.linea(216, 160, 246, 150, K); R.linea(216, 159, 246, 149, H('#c8ccd8')); R.disco(213, 161, 4, K); R.disco(213, 161, 3, H('#c8ccd8'));
  // el cuenco grande de barro con el guiso de dátiles
  for (let y = 112; y < 156; y++) for (let x = 108; x < 212; x++) { const dx = (x - 160) / 52, dy = (y - 118) / 36; if (y >= 118 && dx * dx + dy * dy < 1) R.pset(x, y, rmp(pal(['#d8844a', '#b8643a', '#8a4a2a', '#5a2e18']), 1 + dx * 1.4 + (y - 118) * 0.03, x, y)); }
  R.disco(160, 158, 0, K);
  for (let y = 108; y < 129; y++) for (let x = 106; x < 214; x++) { const e = ((x - 160) / 54) ** 2 + ((y - 118) / 11) ** 2; if (e < 1) R.pset(x, y, e > 0.8 ? H('#e8a46a') : rmp(pal(['#a8683a', '#8a4a24', '#6a3418']), 1 + ns(x * 0.3, y * 0.5) * 0.9, x, y)); }
  for (const [x, y] of [[140, 116], [152, 120], [170, 114], [182, 119], [161, 124], [130, 120], [192, 116]]) { R.rect(x, y, x + 4, y + 2, H('#4a2010')); R.pset(x + 1, y, H('#8a4a24')); }
};
const c6 = (t) => {
  fijo('cuenco', fondoCuenco);
  // la ventanita: pasan los días y las noches (los años) y en la pared se van tachando
  const fase = (t - C6) / 1.15, dia = 0.5 + 0.5 * Math.cos(fase * Math.PI * 2);
  const WX = 236, WY = 46;
  R.recorte([WX - 23, WY - 24, WX + 23, WY + 33]);
  for (let y = WY - 24; y < WY + 34; y++) for (let x = WX - 23; x < WX + 24; x++) if (Math.hypot(x - WX, y - WY) < 24 || y > WY) R.pset(x, y, mez(rmp(pal(['#9ad0f0', '#6ab0e0']), (y - WY + 24) * 0.04, x, y), rmp(pal(['#1a2048', '#0e1230']), (y - WY + 24) * 0.04, x, y), 1 - dia));
  const sa = fase * Math.PI * 2, sx = ri(WX + Math.sin(sa) * 18), sy = ri(WY + 10 - Math.cos(sa) * 14);
  R.disco(sx, sy, 4, dia > 0.5 ? H('#fff0a0') : H('#e8ecf8'));
  for (let y = WY + 20; y < WY + 34; y++) for (let x = WX - 23; x < WX + 24; x++) if (y > WY + 24 + Math.sin(x * 0.15) * 3) R.pset(x, y, mez(H('#d8a868'), H('#3a2a40'), 1 - dia));
  R.recorte(null);
  for (let y = WY - 26; y < WY + 34; y++) for (let x = WX - 25; x < WX + 26; x++) { const d = Math.hypot(x - WX, y - WY); const borde = y <= WY ? d >= 24 && d < 26 : (Math.abs(x - WX) === 24 || Math.abs(x - WX) === 25); if (borde) R.pset(x, y, K); }
  R.rect(WX - 26, WY + 32, WX + 26, WY + 36, H('#8a6a40')); R.rect(WX - 26, WY + 32, WX + 26, WY + 32, H('#e8c898'));
  const años = Math.min(12, Math.floor(tramo(t, C6, HEIR - 0.3) * 12.99));
  for (let i = 0; i < años; i++) { const g = Math.floor(i / 5), j = i % 5, x = 22 + g * 26 + j * 5; if (j === 4) R.linea(x - 21, 74, x + 1, 56, H('#5a3a20')); else { R.linea(x, 56, x, 74, H('#5a3a20')); R.linea(x + 1, 56, x + 1, 74, H('#7a5430')); R.pset(x + 2, 58, H('#f0d8a8')); } }
  // la ristra de dátiles que se mece
  for (let i = 0; i < 9; i++) { const sw = Math.sin(t * 1.6) * i * 0.4, x = ri(298 + sw), y = 8 + i * 6; R.disco(x, y, 2, K); R.disco(x, y, 1, H('#8a3a1a')); R.pset(x - 1, y - 1, H('#c86a3a')); }
  R.linea(298, 2, ri(298 + Math.sin(t * 1.6) * 3), 60, H('#8a6a40'));
  // el vapor del guiso; en «heir» dibuja una cuna y en «her» le cae encima una corona de oro
  const cu = tramo(t, HEIR - 0.5, HEIR + 0.3);
  for (let k = 0; k < 14; k++) { const s = (t * 0.45 + k / 14) % 1, x = ri(140 + (k * 11) % 40 + Math.sin(t * 1.3 + k) * 4 * s), y = ri(108 - s * 44); if (b4(x, y) < (1 - s) * 0.9 * (1 - cu * 0.7)) R.pset(x, y, H('#f4f0ea')); }
  if (cu > 0) { const C = ['..##########..', '.#..........#.', '#............#', '#............#', '.############.', '..#........#..', '.#..........#.'];
    C.forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '#') return; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) { const x = 146 + i * 2 + a, y = 66 + j * 2 + b; if (b4(x, y) < cu) R.pset(x, y, b ? H('#d8d4cc') : H('#ffffff')); } }));
    const cr = tramo(t, SHE, SHE + 0.5); if (cr > 0) { const y = ri(lerp(30, 58, ease(cr))); R.rect(150, y, 170, y + 5, K); R.rect(151, y + 1, 169, y + 4, H('#ffd23a')); R.rect(151, y + 4, 169, y + 4, H('#c8a030')); for (const x of [151, 160, 169]) { R.rect(x - 1, y - 3, x + 1, y, K); R.pset(x, y - 2, H('#ffd23a')); } R.rect(159, y + 2, 161, y + 3, H('#e83a3a')); } }
  // la mano de Irulan (manga blanca con ribete de oro) echa gotas cada «año», hasta «heir»
  const fuera = ease(tramo(t, HEIR - 0.6, HEIR)), entra = ease(tramo(t, C6, C6 + 0.6)), hx = 186, hy = ri(lerp(lerp(-20, 40, entra), -24, fuera));
  if (hy > -18) { T.brazo(R, hx + 22, hy - 44, hx, hy, '#f2eee2', -1, { codo: [hx + 16, hy - 20], puno: '#e8c060' });
    R.rect(hx - 8, hy + 2, hx - 3, hy + 12, K); R.rect(hx - 7, hy + 3, hx - 4, hy + 11, H('#8ad8ff')); R.rect(hx - 7, hy + 3, hx - 7, hy + 11, H('#e8f8ff')); R.rect(hx - 8, hy, hx - 3, hy + 2, H('#c8a060'));
    const ph = ((t - C6) / 1.15) % 1; if (ph > 0.3 && ph < 0.6 && t < HEIR - 0.6) { const y = ri(lerp(hy + 13, 116, (ph - 0.3) / 0.3)); R.rect(hx - 6, y, hx - 5, y + 1, H('#8ad8ff')); R.rect(hx - 6, y + 2, hx - 5, y + 2, H('#3a8ac8')); } }
  lucie(40 + Math.sin(t * 1.3) * 3, 76 + Math.sin(t * 2.2) * 2, t, { dir: 1, brillo: 0.75, cara: t > SHE ? 'triste' : 'sorpresa' });
};

// ── 7 · el banco tleilaxu: el regalo ────────────────────────────────────────────────────────────────────────────────
const fondoBanco = () => {
  // los azulejos verdosos con su junta y las manchas
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const j = x % 16 === 0 || y % 16 === 0; R.pset(x, y, j ? H('#1e3a30') : rmp(pal(['#7ac0a0', '#5aa084', '#3e806a', '#2a5e4c']), 1.3 + ns(x * 0.1, y * 0.1) * 0.8 + (h2(x >> 4, y >> 4, 51) - 0.5) * 0.8 + y * 0.004, x, y)); }
  // las tuberías que corren por la pared, con su manómetro
  for (const [y, c] of [[22, '#8a8a94'], [30, '#a87a4a']]) { R.rect(0, y - 3, 319, y + 3, K); R.rect(0, y - 2, 319, y + 2, H(c)); R.rect(0, y - 2, 319, y - 2, mez(H(c), H('#ffffff'), 0.4)); for (let x = 20; x < 320; x += 60) { R.rect(x, y - 4, x + 4, y + 4, K); R.rect(x + 1, y - 3, x + 3, y + 3, H('#5a5a64')); } }
  R.disco(250, 26, 8, K); R.disco(250, 26, 7, H('#e8e4dc')); R.disco(250, 26, 1, K);
  // la balda con los frascos de las figuritas dormidas
  R.rect(10, 60, 116, 63, K); R.rect(11, 60, 115, 62, H('#6a6a74')); R.rect(11, 60, 115, 60, H('#a8acb8'));
  for (let i = 0; i < 6; i++) { const x = 18 + i * 17; R.rect(x - 6, 40, x + 6, 59, K); R.rect(x - 5, 41, x + 5, 58, H('#4ac080')); R.rect(x - 5, 41, x + 5, 44, H('#8ae0b0')); R.rect(x - 6, 37, x + 6, 40, H('#5a5a64')); R.disco(x, 51, 3, H('#1e5a3a')); R.pset(x + 2, 54, H('#1e5a3a')); R.pset(x - 4, 43, H('#e8fff0')); }
  // el monitor con la doble hélice (a la derecha)
  R.rect(232, 48, 300, 100, K); R.rect(233, 49, 299, 99, H('#3a3a44')); R.rect(237, 53, 295, 92, H('#0e1a16'));
  // el banco de acero con remaches y rayas
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#c8ccd8', '#a8acb8', '#8a8e9a', '#5a5e6a']), 1.1 + (y - 120) * 0.02 + ns(x * 0.05, y * 0.3) * 0.5 + (h2(x, y) > 0.985 ? 1 : 0), x, y));
  R.rect(0, 118, 319, 121, K); R.rect(0, 119, 319, 120, H('#e8ecf4'));
  for (let x = 6; x < 320; x += 26) { R.pset(x, 126, H('#4a4e5a')); R.pset(x + 1, 125, H('#f0f4fc')); }
  // el microscopio a la izquierda y la gradilla de tubos a la derecha, las placas apiladas
  R.rect(30, 150, 66, 156, K); R.rect(31, 151, 65, 155, H('#3a3a44')); R.rect(44, 100, 52, 150, K); R.rect(45, 101, 51, 149, H('#e8e4dc')); R.rect(36, 96, 50, 104, K); R.rect(37, 97, 49, 103, H('#2a2a34')); R.rect(38, 120, 62, 124, K); R.rect(39, 121, 61, 123, H('#5a5a64'));
  R.rect(244, 138, 304, 156, K); R.rect(245, 139, 303, 155, H('#8a5a34')); for (let i = 0; i < 6; i++) { const x = 249 + i * 9; R.rect(x, 112, x + 5, 146, K); R.rect(x + 1, 113, x + 4, 145, H('#e8f4f0')); R.rect(x + 1, 128 + (i * 5) % 12, x + 4, 145, H(['#e83a3a', '#5ad88a', '#e8c040'][i % 3])); }
  for (let i = 0; i < 3; i++) { R.rect(80, 160 - i * 4, 110, 163 - i * 4, K); R.rect(81, 161 - i * 4, 109, 162 - i * 4, H('#d8f0e8')); }
  // el pie del frasco grande en el centro
  R.rect(126, 140, 194, 150, K); R.rect(127, 141, 193, 149, H('#4a4e5a')); R.rect(127, 141, 193, 142, H('#a8acb8')); for (let x = 132; x < 190; x += 10) R.pset(x, 146, H('#5ad88a'));
};
const c7 = (t) => {
  fijo('banco', fondoBanco);
  const rojo = t > CRUEL - 0.1 && t < CRUEL + 0.9 && Math.sin(t * 18) > -0.3;
  // la lámpara de techo que se mece y su cono
  const lx = ri(206 + Math.sin(t * 1.1) * 3); R.linea(206, 0, lx, 8, K); R.rect(lx - 8, 8, lx + 8, 12, K); R.rect(lx - 7, 9, lx + 7, 11, H('#5a5a64'));
  for (let y = 13; y < 138; y++) for (let x = lx - (y - 12) * 0.5; x < lx + (y - 12) * 0.5; x++) if (b4(ri(x), y) < 0.12) aclara(ri(x), y, rojo ? H('#ff4a3a') : H('#f0fff4'), 0.5);
  // el monitor con la onda y la hélice que gira
  for (let x = 238; x < 295; x++) { const y = 66 + ri(Math.sin(x * 0.35 + t * 5) * 5 * Math.sin(x * 0.05)); R.pset(x, y, H('#5ad88a')); }
  for (let k = 0; k < 10; k++) { const y = 74 + k * 1.7, a = k * 0.7 + t * 3; R.pset(ri(266 + Math.sin(a) * 10), ri(y), H('#8ae0ff')); R.pset(ri(266 - Math.sin(a) * 10), ri(y), H('#ff8ad8')); }
  // el frasco grande: el líquido, las burbujas y lo que crece dentro
  for (let y = 54; y < 140; y++) for (let x = 132; x < 189; x++) { const top = y < 70 ? Math.hypot(x - 160, y - 70) > 28 : false; if (top) continue;
    R.pset(x, y, rmp(rojo ? pal(['#f08a7a', '#c84a3a', '#8a2a24']) : pal(['#9af0c0', '#5ad08a', '#2a9a64']), 0.8 + Math.abs(x - 160) / 22 + (y - 54) * 0.008, x, y)); }
  for (let k = 0; k < 8; k++) { const s = (t * 0.5 + k / 8) % 1, x = 140 + (k * 7) % 40 + ri(Math.sin(t * 2 + k) * 2), y = ri(136 - s * 76); R.pset(x, y, H('#e8fff0')); }
  const n = t < GHOLA ? 0 : t < BODY ? 1 : t < BODY + 0.45 ? 2 : t < BODY + 0.9 ? 4 : t < CELLS - 0.2 ? 8 : -1, gl = tramo(t, GHOLA - 0.2, GHOLA + 0.4);
  if (gl > 0) R.halo(160, 100, 12 + Math.sin(t * 5) * 2, [H('#c8ffe0'), H('#8af0b0'), H('#5ad08a')], 0.8 * gl);
  if (n > 0) { const P = { 1: [[0, 0]], 2: [[-3, 0], [3, 0]], 4: [[-3, -3], [3, -3], [-3, 3], [3, 3]], 8: [[-5, -3], [0, -4], [5, -3], [-5, 3], [0, 4], [5, 3], [-2, 0], [2, 0]] }[n], r = n === 1 ? 5 : n === 2 ? 4 : 3;
    for (const [dx, dy] of P) { R.disco(160 + dx, 100 + dy, r, H('#1e6a44')); R.disco(160 + dx, 100 + dy, r - 1, H('#e8fff0')); R.pset(160 + dx, 100 + dy, H('#5ad08a')); } }
  if (n === -1) { const s = 0.6 + 0.4 * tramo(t, CELLS - 0.2, CELLS + 0.6);
    // la figurita dormida, acurrucada (solo la silueta)
    R.disco(ri(160 - 6 * s), ri(92), ri(5 * s), H('#1e5a3a')); R.disco(ri(160 + 2 * s), ri(102), ri(8 * s), H('#1e5a3a')); R.disco(ri(160 + 6 * s), ri(112), ri(5 * s), H('#1e5a3a')); R.pset(ri(160 - 6 * s) - 1, 90, H('#5ad08a')); }
  // el cristal: reflejos y el filo
  for (let y = 56; y < 140; y++) { R.pset(131, y, K); R.pset(189, y, K); if (y > 74 && y < 126) R.pset(137, y, H('#f0fff8')); }
  for (let a = 0; a < 90; a++) { const p = Math.PI + a / 90 * Math.PI; R.pset(ri(160 + Math.cos(p) * 29), ri(70 + Math.sin(p) * 29), K); }
  R.rect(154, 36, 166, 41, K); R.rect(155, 37, 165, 40, H('#6a6a74'));
  // el lazo rojo del regalo: la mano de Bijaz lo pone en «gift»
  const lz = tramo(t, GIFT - 0.6, GIFT + 0.1);
  if (lz >= 1) { for (let y = 42; y < 140; y++) { R.pset(159, y, H('#d82a3a')); R.pset(160, y, H('#e84a5a')); R.pset(161, y, H('#a81a2a')); }
    for (let x = 132; x < 189; x++) { R.pset(x, 118, H('#d82a3a')); R.pset(x, 119, H('#a81a2a')); }
    R.poligono([[160, 38], [146, 30], [146, 44]], K); R.poligono([[160, 38], [174, 30], [174, 44]], K); R.poligono([[159, 38], [148, 32], [148, 42]], H('#e84a5a')); R.poligono([[161, 38], [172, 32], [172, 42]], H('#d82a3a')); R.disco(160, 38, 3, K); R.disco(160, 38, 2, H('#ff6a7a'));
    R.linea(156, 40, 150, 52, H('#d82a3a')); R.linea(164, 40, 170, 52, H('#a81a2a')); }
  const ve = ease(tramo(t, C7, GIFT - 0.4)), va = ease(tramo(t, GIFT + 0.2, GIFT + 0.9)), hx = 176, hy = ri(lerp(lerp(-30, 38, ve), -34, va));
  if (hy > -24) { T.brazo(R, hx + 30, hy - 44, hx, hy, '#6a5034', -1, { codo: [hx + 26, hy - 16] }); if (lz < 1) { R.poligono([[hx - 12, hy], [hx - 4, hy - 5], [hx - 4, hy + 5]], H('#e84a5a')); R.disco(hx - 12, hy, 2, H('#ff6a7a')); } }
  lucie(286 + Math.sin(t * 1.3) * 3, 120 + Math.sin(t * 2) * 2, t, { dir: -1, brillo: 0.75, cara: n === -1 ? 'sorpresa' : t > GIFT ? 'normal' : 'sonrisa' });
};

// ── 8 · el recuerdo de Duncan en Caladan ─────────────────────────────────────────────────────────────────────────────
const c8 = (t) => {
  const o = { camara: 'ventana' }; T.caladan(R, t, o);
  const sale = tramo(t, GAVE + 0.5, BOY - 0.3), protege = t > GAVE - 0.2;
  R.actor(PA.paulNino, 196, 150, t, { dir: protege ? 1 : 1, sonrisa: t < GAVE, triste: t > BOY - 0.5, sorpresa: t > GAVE && t < GAVE + 0.6 });
  conAlfa(1 - sale, () => R.actor(PA.duncan, ri(lerp(150, 176, tramo(t, GAVE - 0.4, GAVE))), 150, t, { dir: protege ? -1 : 1, dedo: !protege && t > SWORD - 0.3, brazos: protege, sonrisa: t > DUNCAN && !protege, habla: t > C8 + 0.3 && t < DUNCAN + 0.6 }), [140, 100, 210, 152]);
  if (sale > 0 && sale < 1) for (let k = 0; k < 10; k++) { const s = (sale + k / 10) % 1, x = 176 + 7 + ri(Math.sin(k * 2.3) * 8), y = ri(140 - s * 50); R.pset(x, y, H('#fff4c8')); }
  T.caladanDelante(R, t, o);
  lucie(92 + Math.sin(t * 1.3) * 3, 84 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.7, cara: t > GAVE ? 'triste' : 'sonrisa' });
  sepia(0.78);
};

// ── 9 · los tanques de cerca: Hayt ──────────────────────────────────────────────────────────────────────────────────
const c9 = (t) => {
  const o = { encuadre: 'laboratorio', camara: 'tanques', hayt: true }; T.conspiracion(R, t, o);
  const golpe = t > HAYT - 0.4 && t < HAYT + 0.6;
  R.actor(PA.bijaz, 118, 170, t, { dir: 1, dedo: golpe, sonrisa: t > NOTHING });
  // los ojos de metal destellan en «metal eyes»
  const de = tramo(t, METAL - 0.1, METAL + 0.5);
  if (de > 0 && de < 1) for (const ex of [155, 163]) { const r = ri(Math.sin(de * Math.PI) * 7); R.linea(ex - r, 70, ex + r, 70, H('#ffffff')); R.linea(ex, 70 - r, ex, 70 + r, H('#dfe8f4')); }
  if (t > METAL - 0.2 && t < HAYT + 0.6) AT.anillo(R, 159, 72, 22, 16, t, tramo(t, METAL - 0.2, METAL + 0.4));
  // «?» en «remembers nothing»
  const q = tramo(t, NOTHING - 0.4, NOTHING); if (q > 0) { const y = ri(lerp(60, 40, ease(q))) + flota(t), x = 192; R.rect(x - 2, y - 2, x + 15, y + 18, K); R.rect(x - 1, y - 1, x + 14, y + 17, H('#f6f2e6')); R.icono('?', x + 1, y + 2, H('#3a3a6a'), H('#a8acb8'), 2); R.poligono([[x - 2, y + 12], [x - 8, y + 20], [x + 3, y + 17]], H('#f6f2e6')); }
  atomG(214, 170, t, { dir: -1, pose: t > METAL && t < HAYT ? 'senala' : 'quieto', cara: t > METAL ? 'sorpresa' : 'normal', habla: 0 });
};

// ── 10 · la tarima de noche: Hayt ante Paul ─────────────────────────────────────────────────────────────────────────
const c10 = (t) => {
  const o = { encuadre: 'trono', camara: 'tarima', luz: 'noche' }; T.ciudadela(R, t, o);
  const lev = tramo(t, KEEPS - 0.9, KEEPS + 0.15);
  let px = 221, ps = 134;
  if (lev > 0) { const u = ease(lev); px = lerp(221, 176, u); ps = px > 206 ? 134 : px > 198 ? 139 : px > 190 ? 144 : 150; if (px > 206) ps = 134 - ri(Math.sin(lev * 8) * 0); }
  const toca = t > KEEPS + 0.1;
  R.actor(PA.hayt, 150, 150, t, { dir: 1, habla: t > TELLS - 0.6 && t < TELLS + 0.8, dedo: t > TELLS - 0.4 && t < TELLS + 0.5, sonrisa: toca });
  R.actor(PA.paulEmperador, ri(px), ps, t, { dir: -1, anda: lev > 0 && lev < 1, sostiene: toca ? [163, 128] : undefined, triste: t < KEEPS - 0.9, sonrisa: toca });
  T.ciudadelaDelante(R, t, o);
  lucie(lerp(176, 166, tramo(t, C10, KEEPS)) + Math.sin(t * 1.3) * 3, 96 + Math.sin(t * 2.1) * 2, t, { dir: 1, brillo: 0.85, cara: toca ? 'sonrisa' : t > TELLS ? 'sorpresa' : 'normal' });
};

// ── 11 · el paseo de Caladan: amigos de la infancia ────────────────────────────────────────────────────────────────
const c11 = (t) => {
  const o = { camara: 'general', lluvia: 0 }; T.caladan(R, t, o);
  const u = tramo(t, C11, C11 + 2.2), xd = ri(lerp(40, 120, ease(u))), aupa = t > CHILD - 0.2 && t < CHILD + 0.9;
  R.actor(PA.duncan, xd, 152, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true, brazos: aupa, habla: !aupa && Math.sin(t * 5) > 0 });
  R.actor(PA.paulNino, xd + 22, 152, t, { dir: -1, anda: u > 0 && u < 1, salto: aupa ? ri(Math.abs(Math.sin((t - CHILD) * 6)) * 6) : 0, sonrisa: true });
  T.caladanDelante(R, t, o);
  lucie(lerp(190, 170, u) + Math.sin(t * 1.4) * 3, 120 + Math.sin(t * 2.3) * 2, t, { dir: -1, brillo: 0.7, cara: 'sonrisa' });
  sepia(0.7);
};

// ── 12 · el vestidor de Scytale ─────────────────────────────────────────────────────────────────────────────────────
const fondoVestidor = () => {
  sillares(0, 0, 319, 150, pal(['#6a6278', '#564e64', '#423a50', '#2e283a', '#1a1626']), { alto: 10, ancho: 24, k: 61, luz: (x, y) => Math.hypot(x - 150, y - 60) / 120 - 0.4 });
  // el suelo de losas con una alfombra roja de flecos
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#5a5266', '#463e52', '#322a3e', '#1e1828']), 1 + ((x + (y - 150) * 2) % 28 < 1 ? 2 : 0) + ns(x * 0.2, y * 0.3) * 0.6, x, y));
  for (let y = 156; y < 174; y++) for (let x = 60; x < 260; x++) { const b = y === 156 || y === 173 || x === 60 || x === 259; const dx = Math.abs(((x - 60) % 24) - 12), dy = Math.abs(y - 165), rom = dx + dy * 1.4 < 7 && dx + dy * 1.4 > 4;
    R.pset(x, y, b ? H('#e8c060') : rom ? H('#e8c060') : dx + dy * 1.4 < 3 ? H('#3a5a8a') : y === 158 || y === 171 ? H('#c86a3a') : rmp(pal(['#a83a3a', '#8a2a2a', '#6a1e1e']), 1 + ns(x * 0.3, y * 0.3) * 0.8, x, y)); }
  for (let x = 62; x < 260; x += 3) { R.pset(x, 174, H('#e8c060')); R.pset(x, 175, H('#c8a040')); }
  // el arcón a la derecha
  R.rect(268, 124, 316, 152, K); madera(269, 125, 315, 151, pal(['#8a5a34', '#6a4426', '#4a2e18', '#2a1a0c']), { alto: 9, k: 63 }); R.rect(268, 132, 316, 134, H('#c8a040')); R.rect(289, 130, 295, 138, H('#e8c060'));
  // el perchero de las túnicas (barra y patas)
  R.rect(184, 56, 262, 58, K); R.rect(185, 56, 261, 57, H('#c8a040')); R.rect(186, 58, 188, 152, K); R.rect(258, 58, 260, 152, K); R.rect(180, 150, 194, 153, K); R.rect(252, 150, 266, 153, K);
  // el pie del espejo y su marco dorado (el cristal se pinta en cada fotograma)
  R.rect(92, 150, 104, 153, K); R.rect(96, 140, 100, 150, H('#a8843a'));
  for (let a = 0; a < 360; a++) { const p = a / 360 * Math.PI * 2; for (let w = 0; w < 4; w++) R.pset(ri(98 + Math.cos(p) * (24 + w)), ri(88 + Math.sin(p) * (50 + w)), w === 3 ? K : w === 0 ? H('#8a6a20') : H('#e8c060')); }
  // la cortina pesada de la izquierda
  for (let y = 0; y < 152; y++) for (let x = 0; x < 34; x++) R.pset(x, y, rmp(pal(['#8a3a5a', '#6a2a46', '#4a1a32', '#2a0e1c']), 1.3 + Math.sin(x * 0.6) * 0.9 + y * 0.003, x, y));
  R.rect(0, 22, 40, 25, K); R.rect(0, 23, 40, 24, H('#c8a040'));
  // las máscaras blancas colgadas sobre el perchero (las caras de quita y pon) y el sombrerero junto al arcón
  R.rect(186, 22, 262, 24, K); R.rect(187, 22, 261, 23, H('#8a6a20'));
  const MC = ['#e8c040', '#f6f2e6', '#6ab0e8', '#e8708a', '#9ae0a0'];
  for (let i = 0; i < 5; i++) { const x = 194 + i * 15, y = 34, c = H(MC[i]); R.linea(x, 24, x, 27, K); R.disco(x, y, 6, K); R.disco(x, y, 5, c); R.rect(x - 4, y - 1, x - 2, y - 1, K); R.rect(x + 2, y - 1, x + 4, y - 1, K);
    R.pset(x - 3, y + 1, H('#ff8a9a')); R.pset(x + 3, y + 1, H('#ff8a9a')); R.pset(x - 2, y + 2, H('#a82a3a')); R.linea(x - 1, y + 3, x + 1, y + 3, H('#a82a3a')); R.pset(x + 2, y + 2, H('#a82a3a'));
    R.linea(x - 6, y - 2, x - 9, y + 2, H('#c83a5a')); R.linea(x + 6, y - 2, x + 9, y + 2, H('#c83a5a')); R.pset(x - 2, y - 4, H('#ffffff')); }
  R.rect(296, 70, 298, 124, K); R.rect(290, 64, 304, 67, K); R.disco(297, 62, 5, K); R.disco(297, 62, 4, H('#3a5a3a')); R.rect(290, 64, 304, 66, H('#2a4a2a'));
};
const TUNICAS = ['#3a6aa8', '#c8a878', '#2a2430', '#d8a840', '#3a5a3a', '#8a3a3a'];
const c12 = (t) => {
  fijo('vestidor', fondoVestidor);
  // la vela del candelabro que tiembla y su luz
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5; R.rect(148, 40, 152, 74, K); R.rect(149, 44, 151, 74, H('#e8e4dc')); R.rect(140, 74, 160, 78, K); R.rect(141, 75, 159, 77, H('#c8a040')); R.rect(148, 78, 152, 150, H('#8a6a20'));
  R.halo(150, 36, 12 + fl * 2, [H('#ffe8a0'), H('#ffc860'), H('#e89040')], 0.8); R.disco(150, 38 + ri(fl), 2, H('#fff8d0')); R.pset(150, 34 + ri(fl), H('#ffe066'));
  // las túnicas colgadas que se mecen
  TUNICAS.forEach((c, k) => { const x = 194 + k * 11, sw = ri(Math.sin(t * 1.5 + k) * 1.5); R.linea(x + 4, 57, x + 4, 62, K);
    R.poligono([[x, 62], [x + 8, 62], [x + 10 + sw, 112], [x - 2 + sw, 112]], K); R.poligono([[x + 1, 63], [x + 7, 63], [x + 9 + sw, 111], [x - 1 + sw, 111]], H(c)); R.linea(x + 1, 64, x - 1 + sw, 110, mez(H(c), H('#ffffff'), 0.3)); });
  // la cara de turno de Scytale: la suya, la de un Fremen, UN INSTANTE LA DE ATOM, la de un sacerdote
  const k = t < CHANGE ? 0 : t < ATOMF ? 1 : t < ATOMF + 0.6 ? 2 : t < SHIRT ? 3 : 4;
  const def = [PA.scytale, PA.fremen, PA.scytale, PA.sacerdotePA, PA.fremenMujer][k];
  const sx = 162, mira = t > DANCER - 0.3;
  // el espejo: el cristal y el reflejo de quien está delante (más apagado), recortado al óvalo
  const px = capturaActor(def, t, { dir: 1, quieto: true });
  for (let y = 40; y < 138; y++) for (let x = 76; x < 121; x++) if (((x - 98) / 22) ** 2 + ((y - 88) / 48) ** 2 < 1) R.pset(x, y, rmp(pal(['#a8b8c8', '#7a8a9e', '#4e5a6e']), 1 + (x - 76) * 0.02 + ns(x * 0.1, y * 0.05) * 0.5, x, y));
  for (const [i, j, c] of px) { const x = 98 + i - 4, y = 136 + j; if (((x - 98) / 22) ** 2 + ((y - 88) / 48) ** 2 < 1) R.pset(x, y, mez(c, H('#7a8a9e'), 0.35)); }
  for (let y = 50; y < 120; y += 3) R.pset(84 + ((y * 3) % 5), y, H('#e8f0ff'));
  const r = R.actor(def, sx, 152, t, { dir: mira ? -1 : 1, sonrisa: k === 1 || k === 4, sorpresa: k === 2 });
  if (k === 2) AT.luciernaga(R, r.cabeza[0], r.cabeza[1] + 6, t, { brillo: 0, cara: 'sorpresa', dir: -1 });
  if (t > CHANGE - 0.4) AT.anillo(R, sx + 7, 132, 13, 16, t, tramo(t, CHANGE - 0.4, CHANGE));
  for (const t0 of [CHANGE, ATOMF, ATOMF + 0.6, SHIRT]) if (t > t0 && t < t0 + 0.3) for (let a = 0; a < 8; a++) { const p = a / 8 * Math.PI * 2, rr = 8 + (t - t0) * 30; R.pset(ri(sx + 7 + Math.cos(p) * rr), ri(130 + Math.sin(p) * rr), H('#fff0c0')); }
  // Atom mira y, cuando se ve su propia cara, se toca la suya para comprobar
  const toca = t > ATOMF + 0.3 && t < SHIRT + 0.6;
  atomG(214, 152, t, { dir: -1, pose: toca ? 'piensa' : 'quieto', cara: t > ATOMF && t < ATOMF + 1.2 ? 'sorpresa' : t > SHIRT + 0.6 ? 'guino' : 'normal' });
};

// ── 13 · la galería de la corte: ¿quién es quién? ──────────────────────────────────────────────────────────────────
const fondoGaleria = () => {
  sillares(0, 0, 319, 150, pal(['#f0d8a8', '#dcbe88', '#c4a06a', '#9a7a4a', '#6a5030']), { alto: 9, ancho: 20, k: 71, luz: (x, y) => (y < 16 ? 0.6 : 0) + Math.min(Math.abs(x - 60), Math.abs(x - 160), Math.abs(x - 260)) / 120 });
  // los tres arcos con el desierto al atardecer (cielo tramado, dunas y la ciudad lejana)
  for (const cx of [60, 160, 260]) { for (let y = 40; y < 122; y++) for (let x = cx - 22; x <= cx + 22; x++) { if (y < 62 && Math.hypot(x - cx, y - 62) > 22) continue;
      let c = rmp(pal(['#f0a868', '#e88a58', '#c86a58', '#8a5a7a']), (y - 40) * -0.03 + 3, x, y);
      if (y > 92 + Math.sin(x * 0.12) * 4) c = rmp(pal(['#e8b070', '#c8905a', '#a87048']), 1 + (y - 92) * 0.05 + ns(x * 0.2, y * 0.3) * 0.4, x, y);
      if (y > 86 && y < 94 && (x * 7 + cx) % 11 < 3) c = H('#6a4a50');
      R.pset(x, y, c); }
    for (let a = 0; a < 180; a++) { const p = Math.PI + a / 180 * Math.PI; for (let w = 0; w < 3; w++) R.pset(ri(cx + Math.cos(p) * (23 + w)), ri(62 + Math.sin(p) * (23 + w)), w === 2 ? K : H('#a8804a')); }
    R.rect(cx - 25, 62, cx - 23, 122, K); R.rect(cx + 23, 62, cx + 25, 122, K); R.rect(cx - 26, 122, cx + 26, 126, H('#8a6a40')); R.rect(cx - 26, 122, cx + 26, 122, H('#f0d8a8')); }
  // los tapices entre los arcos
  for (const x0 of [96, 196]) { R.rect(x0 - 1, 24, x0 + 29, 112, K); for (let y = 25; y < 112; y++) for (let x = x0; x < x0 + 29; x++) { const m = ((x - x0 + y) >> 2) % 4; R.pset(x, y, y < 30 || y > 106 ? H('#c8a040') : [H('#8a2a2a'), H('#3a5a8a'), H('#c8783a'), H('#2a5a3a')][(m + ((y >> 3) % 2)) % 4]); }
    for (let x = x0 + 1; x < x0 + 29; x += 3) R.pset(x, 113, H('#c8a040')); R.rect(x0 - 3, 22, x0 + 31, 24, H('#5a3a20')); }
  // el suelo de losas pulidas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const k = (Math.floor((x - 160) / (14 + (y - 150) * 0.5)) + Math.floor((y - 150) / 6)) & 1; R.pset(x, y, rmp(k ? pal(['#e8d0a0', '#c8ac78']) : pal(['#b89060', '#8a6a40']), 0.6 + ns(x * 0.1, y * 0.2) * 0.8, x, y)); }
  R.rect(0, 148, 319, 150, H('#6a5030'));
};
const FILA = [[PA.irulan, 36], [PA.hayt, 84], [PA.alia, 132], [PA.sacerdotePA, 180], [PA.fremen, 228]];
const c13 = (t) => {
  fijo('galeria', fondoGaleria);
  // las antorchas de las pilastras, con su llama y su luz
  for (const x of [110, 210]) { const f = Math.sin(t * 11 + x) * 0.5 + 0.5; R.rect(x - 1, 122, x + 1, 132, K); R.rect(x - 3, 118, x + 3, 122, H('#5a3a20')); R.halo(x, 112, 9 + f * 2, [H('#ffe8a0'), H('#ffb050'), H('#e87030')], 0.7); R.disco(x, 114 - ri(f), 2, H('#fff4c0')); }
  // un halcón que cruza por el arco del centro
  const hx = ri(lerp(130, 192, ((t - C13) / 3) % 1)), hy = 60 + ri(Math.sin(t * 2) * 3); R.recorte([138, 40, 182, 122]); const al = Math.sin(t * 9) > 0; R.linea(hx - 4, hy - (al ? 2 : -1), hx, hy, H('#3a2a20')); R.linea(hx, hy, hx + 4, hy - (al ? 2 : -1), H('#3a2a20')); R.recorte(null);
  const ax = lerp(4, 236, tramo(t, C13 + 0.2, SEEM - 0.2)), salta = t > SEEM;
  // la fila: el del final es el Danzarín (parpadea a la cara gris de Scytale en «doesn't seem to be»)
  for (const [def, x] of FILA) { let d = def; if (x === 228 && t > SEEM && t < SEEM + 0.9 && !(t > SEEM + 0.15 && t < SEEM + 0.25)) d = PA.scytale;
    const mirado = Math.abs(ax + 10 - (x + 7)) < 10;
    R.actor(d, x, 152, t, { dir: ax > x ? 1 : -1, sorpresa: mirado && x !== 228, sonrisa: x === 228 && t < SEEM }); }
  const r = atomG(ax, 166, t, { dir: 1, pose: 'sostiene', cara: salta ? 'sorpresa' : 'normal', salto: 0 });
  AT.lupa(R, r.mano[0], r.mano[1], 1, 1);
  if (salta) { const y = ri(lerp(130, 118, tramo(t, SEEM, SEEM + 0.3))); R.icono('!', ri(ax) + 2, y, H('#ffe066'), K, 2); }
  // «in the movie»: un rollo de película (sin caras) gira un momento sobre Atom
  const rp = tramo(t, MOVIE - 0.3, MOVIE + 0.2) * (1 - tramo(t, MOVIE + 1.4, MOVIE + 1.8));
  if (rp > 0) { const cx = ri(Math.max(ax + 8, 30)), cy = 112 - ri(rp * 6);
    for (let i = 0; i < 18; i++) { const x = cx + 6 + i, y = cy + 4 + ri(i * 0.3); R.pset(x, y, K); R.pset(x, y + 1, i % 3 ? H('#3a3a44') : H('#e8e4dc')); R.pset(x, y + 2, H('#3a3a44')); R.pset(x, y + 3, K); } R.disco(cx, cy, 8, K); R.disco(cx, cy, 7, H('#a8acb8')); for (let a = 0; a < 5; a++) { const p = a / 5 * Math.PI * 2 + t * 4; R.disco(cx + ri(Math.cos(p) * 4), cy + ri(Math.sin(p) * 4), 1, K); } R.disco(cx, cy, 1, K); }
};

const efectos = [[0.4, 'cerrojo'], [BAND, 'zumbido'], [BACK, 'brillo'], [FOLD, 'whoosh'], [SPICE - 1.5, 'vapor'], [SPICE - 0.4, 'lapiz'],
  [MANUF, 'burbujas'], [GOTAS[0], 'burbujas'], [CONTRA, 'boing'], [HEIR, 'vapor'], [SHE + 0.4, 'campana'],
  [GIFT, 'papel'], [CRUEL, 'zumbido'], [BODY, 'burbujas'], [GAVE + 0.5, 'viento'], [METAL, 'brillo'], [HAYT, 'golpecito'], [NOTHING, 'pop'],
  [KEEPS - 0.7, 'pasos'], [CHILD, 'palmada'], [CHANGE, 'pop'], [ATOMF, 'boing'], [SHIRT, 'papel'], [SEEM, 'aviso']];
const año = (t) => (t >= C8 && t < C9) || (t >= C11 && t < C12) ? 0 : 12;
T.rodar(E, R, [[0, c1], [C2, c2], [C3, c3], [C4, c4], [C5, c5], [C6, c6], [C7, c7], [C8, c8], [C9, c9], [C10, c10], [C11, c11], [C12, c12], [C13, c13]], { efectos, año });
'''

E['pa-conspira'] = ('La conspiración', CAB_CONSP, COMUN + sub(CUERPO_CONSP, 'pa-conspira', {
    'c2': 4.54, 'c3': 8.92, 'c4': 13.38, 'c5': 17.29, 'c6': 22.49, 'c7': 28.81, 'c8': 35.51, 'c9': 41.19, 'c10': 45.71, 'c11': 51.63, 'c12': 55.42, 'c13': 62.50,
    'band': 3.32, 'back': 6.70, 'guild': 7.76, 'fly': 9.76, 'fold': 10.92, 'spice': 12.42, 'manuf': 15.52, 'scien': 14.68,
    'secret': 20.69, 'slip': 21.15, 'contra': 21.77, 'years': 23.49, 'heir': 26.39, 'she': 27.13,
    'gift': 29.59, 'cruel': 30.33, 'ghola': 32.61, 'body': 33.37, 'cells': 34.75, 'duncan': 36.41, 'sword': 37.85, 'gave': 38.65, 'boy': 40.35,
    'metal': 42.33, 'hayt': 43.79, 'nothing': 44.29, 'tells': 49.07, 'keeps': 50.83, 'child': 53.77,
    'dancer': 57.13, 'change': 59.96, 'atomf': 60.55, 'shirt': 61.36, 'movie': 62.90, 'seem': 67.13}))
