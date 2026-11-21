# Borrador de escenas del ep44 (grupo S7): pa-poder. Formato del 11: E[id] = (título, cabecera, cuerpo).
# Los instantes se escriben en segundos de la escena (de linea.json) y se pasan a «en('marca', f)» con W().
import importlib.util
import json
import os
import sys

sys.dont_write_bytecode = True
_D = os.path.dirname(os.path.abspath(__file__))
_R = os.path.abspath(os.path.join(_D, '../../..'))
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
    assert '@' not in s.replace('@media', ''), 'marca sin sustituir: ' + s[s.find('@'):s.find('@') + 30]
    return s


# ── el último plano de pa-precio, para CONGELARLO en las pausas de la frase 34 ──────────────────────────────────────
# Se mete el cuerpo de pa-precio (escenas6.py) dentro de una función con T, E y en propios: su T.rodar solo guarda la
# lista de planos, su Atom luciérnaga no se pinta (en la pausa entra el Atom a color) y en() usa las marcas de pa-precio.
def _precio():
    if os.environ.get('S7_SIN_PRECIO'):
        return None
    try:
        spec = importlib.util.spec_from_file_location('escenas6_s7', os.path.join(_D, 'escenas6.py'))
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        cuerpo = m.E['pa-precio'][2]
        if any(l.startswith('import ') for l in cuerpo.split('\n')):
            return None
        return cuerpo
    except Exception as e:  # noqa: BLE001
        print('aviso: sin pa-precio (', e, '): la pausa congela la ciudadela', file=sys.stderr)
        return None


_PC = _precio()
_MP = _M['pa-precio']
PRECIO = (
    f"const MK_PRECIO = {json.dumps(_MP['marcas'])}, DUR_PRECIO = {_MP['duracion']};\n"
    "const enPrecio = (k, f) => { const a = MK_PRECIO[k] ?? 0, b = MK_PRECIO[k + '_fin'] ?? a + 12; return a + (b - a) * f; };\n"
    "let PLANOS_PRECIO = null;\n"
    + ("try { ((T, E, en, M) => {\n" + _PC + "\n})({ ...T, rodar: (e, r, p) => { PLANOS_PRECIO = p; }, AT: { ...T.AT, luciernaga: () => {} } }, "
       "{ ...E, duracion: DUR_PRECIO, energia: () => 0 }, enPrecio, (k, d) => MK_PRECIO[k] ?? d); } catch (err) { PLANOS_PRECIO = null; }\n"
       if _PC else '')
)

E = {}

# ── lo común (copiado del COMUN de escenas5.py: texturas, paletas, el grano azul de Atom) ──
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
'''

# ── lo común de S7: cielos de día, madera, papel, marcos, retratos de líderes inventados, tarjetas, el globo ─────────
COMUN += r'''
import { c_cerebro } from '/atomo/plato/escenas/hm-comun.js';
import { figura } from '/atomo/plato/escenas/mini-chibi.js';
const DIA = pal(['#4a7ac8', '#5e8ad0', '#7aa2dc', '#98b8e6', '#b8d0ee', '#d4e2f2']);
const NUBE_D = pal(['#a6aebe', '#cfd4dc', '#f6f6f2']);
// nubes de plata de tres tonos a tres velocidades (lo vivo): [x0, y, ancho, velocidad]
const nubes = (t, lista, tonos = NUBE_N, hor = 999) => { for (const [x0, y0, w, v, k] of lista) { const cx = ((x0 + t * v) % (320 + w * 2) + 320 + w * 2) % (320 + w * 2) - w;
  for (let j = -6; j <= 6; j++) for (let i = -w / 2; i <= w / 2; i++) { const x = ri(cx + i), y = ri(y0 + j); if (y >= hor || x < 0 || x > 319 || y < 0) continue; if ((x > 276 && y < 46) || (x < 172 && y < 21)) continue;
    const d = (i / (w / 2)) ** 2 + (j / (4 + ns(i * 0.15 + k, 3) * 3)) ** 2; if (d > 1) continue; const v2 = (1 - d) * 3 + (j < 0 ? 0.4 : -0.6) + ns(x * 0.2, y * 0.3 + k) * 0.8;
    if (v2 > b4(x, y) * 1.2) R.pset(x, y, tonos[Math.max(0, Math.min(2, Math.floor(v2 - 0.6)))]); } } };
const cieloDia = (x0, y0, x1, y1, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, rmp(DIA, (y - y0) / Math.max(1, y1 - y0) * 4.6 + (h2(x >> 1, y >> 1, 5 + k) - 0.5) * 0.5, x, y)); };
// pájaros que cruzan aleteando (en [x0, x1] × [y0, y1])
const pajaros = (t, x0, y0, x1, y1, n = 3, k = 0, c = H('#2a2a34')) => { for (let i = 0; i < n; i++) { const u = (t * (0.035 + h2(i, 1, k) * 0.03) + h2(i, 2, k)) % 1, x = ri(x0 + u * (x1 - x0)), y = ri(y0 + h2(i, 3, k) * (y1 - y0) + Math.sin(t * 1.3 + i) * 2), a = Math.floor(t * 6 + i * 3) % 2;
  R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a * 2, c); R.pset(x + 2, y - 1 + a * 2, c); } };
// madera con vetas (horizontal o vertical) y tablas cada «tabla» px
const madera = (x0, y0, x1, y1, ramp, base = 2.5, tabla = 0, vert = false, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? x : y, b = vert ? y : x, n = tabla ? Math.floor((a - (vert ? x0 : y0)) / tabla) : 0;
  const vet = ns(b * 0.05 + n * 7.3 + k, a * 0.45); let v = base + (vet - 0.5) * 1.5 + Math.sin(b * 0.12 + a * 0.8 + vet * 6) * 0.3 + (h2(n, 3, k) - 0.5) * 0.5;
  if (tabla && (a - (vert ? x0 : y0)) % tabla === 0) v -= 1.8; R.pset(x, y, rmp(ramp, v, x, y)); } };
// papel pintado de rombos pequeños (c0 fondo, c1 motivo, c2 filete)
const papel = (x0, y0, x1, y1, c0, c1, c2, paso = 10) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fx = ((x % paso) + paso) % paso - paso / 2, yy = y + (Math.floor(x / paso) % 2) * (paso >> 1), fy = ((yy % paso) + paso) % paso - paso / 2;
  const d = Math.abs(fx) * 1.2 + Math.abs(fy); let c = c0; if (d < 2) c = c1; else if (d > 3.6 && d < 4.4 && b4(x, y) < 0.5) c = c2; R.pset(x, y, c); } };
// marco con bisel (deja el hueco en negro: el que llama pinta dentro desde x0 + g + 2)
const marco = (x0, y0, x1, y1, c, cl, cs, g = 2) => { caja(x0, y0, x1, y1, K); caja(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c);
  for (let i = 1; i <= g; i++) { R.linea(x0 + i, y0 + i, x1 - i, y0 + i, cl); R.linea(x0 + i, y0 + i, x0 + i, y1 - i, cl); R.linea(x0 + i, y1 - i, x1 - i, y1 - i, cs); R.linea(x1 - i, y0 + i, x1 - i, y1 - i, cs); }
  caja(x0 + g + 1, y0 + g + 1, x1 - g - 1, y1 - g - 1, K); };
// el busto de un líder INVENTADO (nunca uno real): fondo, traje con corbata, cara, pelo (k cambia el aspecto)
const PIEL = pal(['#f0c8a0', '#d8a878', '#e8b890', '#c89068']), PELO = pal(['#3a2a20', '#c8c8c8', '#8a6a40', '#1a1a1a', '#e8e0d0']);
const TRAJE = pal(['#22263a', '#3a3026', '#2a3a4a', '#40404a']), CORB = pal(['#a83030', '#2a4a8a', '#6a2a5a', '#3a6a3a']);
const retrato = (x, y, w, h, k, fondo, sepia = 0) => { x = ri(x); y = ri(y); const S = (c) => (sepia ? mez(c, H('#a8885a'), sepia) : c);
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) R.pset(i, j, S(b4(i, j) < 0.25 ? mez(fondo, K, 0.18) : fondo));
  const cx = x + (w >> 1), r = Math.max(2, Math.round(w * 0.22)), cy = y + r + 2;
  R.poligono([[x, y + h], [cx - r - 1, cy + r + 1], [cx + r + 1, cy + r + 1], [x + w, y + h]], S(TRAJE[k % 4]));
  R.linea(cx, cy + r + 1, cx, y + h - 1, S(H('#f4f0e6'))); if (h - r * 2 > 6) R.linea(cx, cy + r + 2, cx, y + h - 2, S(CORB[k % 4]));
  R.disco(cx, cy, r + 0.7, K); R.disco(cx, cy, r, S(PIEL[(k >> 1) % 4]));
  const pe = S(PELO[k % 5]); for (let i = -r; i <= r; i++) { R.pset(cx + i, cy - r + (Math.abs(i) >= r ? 1 : 0), pe); if (k % 3 && Math.abs(i) < r) R.pset(cx + i, cy - r - 1, pe); }
  R.pset(cx - 1, cy, K); R.pset(cx + 1, cy, K); if (r > 2) R.pset(cx, cy + 2, S(H('#8a4a3a'))); };
// una carpeta de cartulina (sostenida o sobre la mesa)
const carpeta = (x, y, c = H('#c8a050')) => { x = ri(x); y = ri(y); caja(x - 5, y - 3, x + 5, y + 2, K); caja(x - 4, y - 2, x + 4, y + 1, c); R.linea(x - 4, y - 2, x + 4, y - 2, mez(c, H('#ffffff'), 0.4));
  R.pset(x - 3, y - 3, c); R.pset(x - 2, y - 3, c); R.linea(x - 3, y, x + 3, y, mez(c, K, 0.25)); R.pset(x + 4, y - 1, H('#f4f0e6')); };
// un libro cerrado de lado (para lanzar y apilar)
const libro = (x, y, c, gira = 0) => { x = ri(x); y = ri(y); if (gira) { caja(x - 2, y - 4, x + 2, y + 3, K); caja(x - 1, y - 3, x + 1, y + 2, c); R.pset(x, y - 2, ORO[4]); return; }
  caja(x - 4, y - 2, x + 4, y + 1, K); caja(x - 3, y - 1, x + 3, y, c); R.linea(x - 3, y, x + 3, y, H('#f0e8d0')); R.pset(x - 3, y - 1, mez(c, H('#ffffff'), 0.4)); };
// las tarjetas que Atom saca a color (se pintan a escala 1 en 18 × 22 y se pegan al doble con AT.escalado)
const tarjeta = (fondo, dib) => () => { R.rect(0, 0, 17, 21, K); R.rect(1, 1, 16, 20, H(fondo)); R.rect(1, 18, 16, 20, mez(H(fondo), K, 0.15)); dib(); };
const tExcl = tarjeta('#f0d860', () => { R.rect(7, 4, 10, 12, K); R.rect(8, 13, 9, 13, K); R.rect(7, 15, 10, 17, K); });
const tConsejo = tarjeta('#f8f4ec', () => { R.rect(3, 4, 13, 11, K); R.rect(4, 5, 12, 10, H('#a8c8e8')); R.poligono([[5, 11], [9, 11], [5, 15]], K); for (const y of [7, 9]) R.linea(5, y, 11, y, H('#4a6a8a'));
  for (let i = 0; i < 9; i++) { R.pset(4 + i, 4 + i, H('#e8483a')); R.pset(5 + i, 4 + i, H('#e8483a')); R.pset(12 - i, 4 + i, H('#e8483a')); R.pset(13 - i, 4 + i, H('#e8483a')); } });
const tCielo = tarjeta('#1e2a4a', () => { R.disco(9, 8, 3.5, H('#fff0b0')); R.disco(9, 8, 2.5, H('#ffd34a')); for (let a = 0; a < 8; a++) { const c = Math.cos(a * Math.PI / 4), s = Math.sin(a * Math.PI / 4); R.pset(ri(9 + c * 5), ri(8 + s * 5), H('#ffd34a')); R.pset(ri(9 + c * 6), ri(8 + s * 6), H('#fff0b0')); }
  R.rect(5, 14, 12, 16, H('#e8c060')); R.rect(6, 13, 11, 13, H('#e8c060')); R.rect(7, 17, 10, 17, H('#a8783a')); });
// la hoja de calendario (sin letras: la cabecera roja, la rejilla y un día rodeado)
const calendario = (dia) => () => { R.rect(0, 2, 21, 23, K); R.rect(1, 3, 20, 22, H('#f8f4ec')); R.rect(1, 3, 20, 8, H('#c83a3a')); R.rect(1, 3, 20, 3, H('#e8685a'));
  for (const x of [5, 10, 15]) { R.rect(x, 0, x + 1, 4, K); R.pset(x, 1, H('#b0b0b8')); }
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) R.rect(3 + i * 3, 11 + j * 3, 4 + i * 3, 12 + j * 3, H('#9a9aa4'));
  if (dia != null) { const i = dia % 5, j = Math.floor(dia / 5); R.rect(2 + i * 3, 10 + j * 3, 5 + i * 3, 10 + j * 3, H('#e8483a')); R.rect(2 + i * 3, 13 + j * 3, 5 + i * 3, 13 + j * 3, H('#e8483a')); R.pset(2 + i * 3, 11 + j * 3, H('#e8483a')); R.pset(2 + i * 3, 12 + j * 3, H('#e8483a')); R.pset(5 + i * 3, 11 + j * 3, H('#e8483a')); R.pset(5 + i * 3, 12 + j * 3, H('#e8483a')); } };
// EL GLOBO: el retrato de un líder inventado impreso en un globo que se infla (n: cuántos rasgos lleva; más arrogante)
const GLB = pal(['#4a1422', '#7a2232', '#b03842', '#e0605a', '#f8a098', '#ffd8d0']);
const globo = (cx, cy, r, t, n) => { cx = ri(cx); cy = ri(cy); r = Math.max(6, r);
  R.disco(cx, cy, r + 1, K);
  R.disco(cx, cy, r, (x, y) => rmp(GLB, 4 - Math.hypot(x - cx + r * 0.38, y - cy + r * 0.42) / r * 2.8, x, y));
  R.poligono([[cx - 3, cy + r + 4], [cx, cy + r - 1], [cx + 3, cy + r + 4]], K); R.poligono([[cx - 2, cy + r + 3], [cx, cy + r], [cx + 2, cy + r + 3]], GLB[1]);
  const q = r * 0.64, fy = cy + r * 0.04, hr = q * 0.36, hy = fy - q * 0.14;
  R.disco(cx, fy, q + 1.6, ORO[3]); R.disco(cx, fy, q + 0.6, K);
  for (let y = Math.floor(fy - q); y <= Math.ceil(fy + q); y++) for (let x = Math.floor(cx - q); x <= Math.ceil(cx + q); x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - fy; if (dx * dx + dy * dy > q * q) continue;
    const dh = Math.hypot(dx, (y + 0.5 - hy) * 1.05) / hr; let c;
    if (dy > q * 0.32 && dh > 1.1) c = Math.abs(dx) < q * 0.07 + 0.5 && dy < q * 0.92 ? CORB[0] : Math.abs(dx) < q * 0.2 && dy < q * 0.6 ? H('#f4f0e6') : dx < 0 ? H('#2c3048') : H('#1c1f30');
    else if (dh < 1) c = (y + 0.5 - hy) < -hr * 0.42 ? H('#3a2a20') : dx > hr * 0.35 ? H('#d89a70') : H('#f0c09a');
    else if (dh < 1.14) c = K;
    else c = rmp(pal(['#7a90aa', '#9ab0c8', '#bcd0e2']), 1.2 + ns(x * 0.25, y * 0.25) * 1.2, x, y);
    R.pset(x, y, c); }
  // la cara: cejas que se arquean con cada rasgo, ojos entornados y la sonrisa de suficiencia
  const ex = Math.max(1, ri(hr * 0.42)), ey = ri(hy + hr * 0.05), arr = Math.min(2, n);
  for (const s of [-1, 1]) { R.pset(cx + s * ex, ey, K); if (hr > 5) R.pset(cx + s * ex + 1, ey, K); R.pset(cx + s * ex - s, ey - 2 - (s > 0 ? arr : 0), H('#3a2a20')); R.pset(cx + s * ex, ey - 2 - (s > 0 ? arr : 0) + (s > 0 ? 1 : 0), H('#3a2a20')); R.pset(cx + s * ex + s, ey - 2, H('#3a2a20')); }
  const my = ri(hy + hr * 0.55); R.linea(cx - ri(hr * 0.35), my, cx + ri(hr * 0.4), my - (n > 0 ? 1 : 0), H('#7a3a2a')); if (n > 1) R.pset(cx + ri(hr * 0.45), my - 2, H('#7a3a2a'));
  // el brillo del globo y la costura
  for (let a = 0; a < 10; a++) { const p = -2.4 + a * 0.09; R.pset(ri(cx + Math.cos(p) * r * 0.78), ri(cy + Math.sin(p) * r * 0.78), H('#fff4f0')); }
  R.disco(cx - r * 0.5, cy - r * 0.55, Math.max(1, r * 0.08), H('#ffffff')); };
'''

# ── los instantes (s de la escena, de las palabras inglesas de linea.json) ───────────────────────────────────────────
TP = dict(
    p2=5.30, p3=10.70, p4=15.52, p5=21.60, p6=27.91, p7=33.71, p8=37.89, p9=43.85, p10=50.17, p11=56.09, p12=60.07,
    p13=66.56, p14=71.20, p15=75.34, p16=80.42, p17=86.32, p18=91.12, p19=97.44, p20=102.42,
    notice=0.62, fiction=2.94, y2009=3.84, physician=5.60, owen=7.96, psych=9.02, davidson=10.10, lives=11.34,
    presidents=11.98, ministers=13.10, hundred=14.28, years=14.62, hubris=15.94, personality=17.48, change=17.90,
    leaders=19.68, after=20.04, power1=20.90, outsized=21.78, contempt=23.32, advice=23.94, history=26.14, god=27.08,
    experiments=28.27, measure=29.11, y2014=30.53, team=32.03, canadian=32.51, asked=33.71, recall=34.69, held=35.99,
    power2=36.29, others=36.91, watched=38.49, squeeze=39.33, ball=39.93, brains=40.81, mirrored=41.21, less=42.23,
    powerless=45.63, asif=46.87, turned=47.55, down=47.93, volume=48.47, empathy=49.09,
    herbert=50.27, step=51.15, paul=52.53, storybook=53.33, tyrant=53.81, doesnt=54.73, harm=55.63, name=56.29,
    disaster=57.31, anyway=57.79, warning=59.29, danger=60.25, leader=61.41, millions=62.27, stop=62.85,
    thinking=63.19, believe=64.47, thinkfor=65.19,
    herbert2=67.00, wrote=67.36, mistakes=68.52, ones=69.66, name2=70.50, amplified=71.40, numbers=72.38,
    follow=72.98, without=73.56, questions=74.38, told=76.04, hero=76.62, story=77.06, showed=77.90, price=78.54,
    believing=79.02,
    y1949=81.58, campbell=84.12, journey=85.20, mold=86.42, adventure=87.54, young=89.36, leaves=90.00, home=90.30,
    gift=91.72, comes=92.18, save=92.88, people=93.30, dune=94.24, stepby=95.10, throne=96.70, messiah=97.60,
    never=99.42, tell=99.74, day=101.16, after2=101.38, win=101.80, editor=103.52, turned2=104.02, also=105.22,
    campbell2=105.96,
)

CAB = '''// PA-PODER (frases 34–38). Dos PAUSAS (34 y 38) y el ensayo de por qué el poder cambia. Año: 12 en los congelados y en
// Arrakis; sin barra en el estudio, 2009, 2014, el teatrillo y lo de Herbert. Veinte planos:
// 1. PAUSA: el último plano de pa-precio CONGELADO; Atom al doble entra, señala en «notice this», guiña en «fiction» y en
//    «2009» sale a color la hoja de calendario con 2009 y su órbita (corta en «the British»);
// 2. la consulta de los sesenta: el psiquiatra tras el escritorio; el médico entra con las carpetas en «physician» y las
//    deja en «Owen»; el psiquiatra explica en «psychiatrist»; la pila de vidas crece (corta en «went»);
// 3. el archivo de biografías: la escalera rueda, el médico saca un libro en «lives» y lo lanza en «presidents»; el
//    psiquiatra lo atrapa; otro en «ministers»; los retratos del friso se encienden de sepia a color y sale «100» en
//    «hundred» (corta en «described»);
// 4. el despacho de un líder inventado: en «hubris» su sombra empieza a crecer en la pared; en «personality change» se
//    enfada y señala al consejero, al que se le cae un papel; en «after time in power» vuelan las hojas del calendario,
//    el respaldo del sillón crece como un trono y el retrato de la pared se agranda (corta en «with»);
// 5. PAUSA otra vez: Atom sostiene el globo con el retrato del líder, que se infla con cada rasgo: «!» en «outsized
//    confidence», el consejo tachado en «contempt for advice», el cielo en «history or to God»; en «God» el globo
//    tira y levanta a Atom; vuelve el color (corta en «And there are»);
// 6. el laboratorio de 2014 (arces rojos por la ventana): el monitor se enciende en «experiments», en «2014» se rodea
//    el día del calendario y sale 2014; la investigadora llega y pone el gorro de electrodos al voluntario en «team»;
//    los cables van al aparato, que dibuja ondas (corta en «asked»);
// 7. la cabina (paneles acústicos con sombra, altavoz, cámara con piloto rojo, alfombrilla, cables al enchufe, vaso de
//    agua, papelera y una luz de techo que cae sobre el voluntario): el voluntario, con el gorro, recuerda en «recall»:
//    nube de pensamiento (a la izquierda del cristal, sin tapar a los psicólogos) con él en una tarima que crece en
//    «held power», corona, y los otros que se inclinan en «others»; tras el cristal, los psicólogos (corta en «And when»);
// 8. la mesa del estudio: en la pantalla una mano aprieta la pelota en «squeeze»; GAG: Atom aprieta la suya y se le
//    escapa botando; el cerebro de juguete echa chispas en «mirrored» y se apagan en «less» (corta en «who had»);
// 9. la consola: la onda de «sin poder» crece en «powerless»; la mano del puño de oro entra en «as if power» y baja el
//    botón en «turned down»; la aguja cae y el corazón se vuelve gris en «empathy» (corta en «But Herbert»);
// 10. el teatrillo: el tirano de cuento baila colgado de sus hilos; Paul entra en «Paul»; en «tyrant» los hilos se lo
//    llevan; en «doesn't set out to do harm» Paul niega y abre los brazos; los niños señalan (corta en «and his name»);
// 11. los escribas de noche sellan con el halcón cada vez más deprisa desde «name»; en «disaster» se encienden fuegos
//    lejanos por el ventanal y un correo sale corriendo; Paul se vuelve; «!» en «warning» (corta en «that the danger»);
// 12. Paul, pequeño, camina por la arena de delante dejando huellas; en «millions» la multitud de ojos cerrados asoma por
//    las crestas lejanas (tapada por la duna de delante; cabezas de varios tamaños, tonos, con y sin capucha o velo) y una
//    fila de espaldas sube por delante de él, abajo; sus luces de pensar se apagan en «stop thinking»; sobre Paul se
//    enciende una sola en «thinking for them» (corta en «That's why»);
// 13. el escritorio: Atom al doble deja la ficha del líder en el secante; en «mistakes» se raja por una esquina (raja
//    oscura con filo claro, como papel rajado, por debajo del retrato); llega la del halcón en «the ones made in his
//    name» y también se raja (corta en «are amplified»);
// 14. la mesa larga: detrás de la ficha agrietada la fila de fichas se multiplica (10, 100, 1000) en «amplified» y
//    «numbers»; la raja corre por la esquina de todas, sin tocar las caras; las «?» se tachan en «without asking questions» (corta en «And that's why»);
// 15. los dos libros en la mesa: el dorado se abre en «told you» y su héroe sube la escalera hasta la corona en «story»;
//    el azul se abre en «then showed you»; en «price» el héroe se deshace en arena que cae en él (corta en «And notice»);
// 16. PAUSA (15 congelado): Atom entra; en «1949» el calendario y en «Campbell» su ficha con la órbita (corta en «the mold»);
// 17. el aula: el profesor, a escala chibi al pie de la pizarra (entre los pupitres), explica y señala; la mesa con el
//    globo a la izquierda; Atom, de luciérnaga, traza el círculo de tiza en «mold»; la casa arriba; en «young
//    man» sale el monigote y en «leaves home» echa a andar (corta en «receives»);
// 18. PAUSA: la pizarrita a color: el regalo en «gift», la vuelta en «comes back», la gente en «people»; la ficha de Paul
//    avanza paso a paso hasta el trono en «throne» (corta en «and Messiah»);
// 19. la pizarra de cerca: Atom traza con tiza el tramo nuevo que sale de la corona; «?» en «never tell»; en «day after you
//    win» sale el sol con «+1» (corta en «and by the way»);
// 20. PAUSA: las dos fichas Campbell (1949 y, en «editor», 1969 con su X en «turned down»); «=» en «also named Campbell»;
//    Atom guiña; vuelve el color al final.
'''

CUERPO = r'''
const P2 = @p2@, P3 = @p3@, P4 = @p4@, P5 = @p5@, P6 = @p6@, P7 = @p7@, P8 = @p8@, P9 = @p9@, P10 = @p10@, P11 = @p11@, P12 = @p12@;
const P13 = @p13@, P14 = @p14@, P15 = @p15@, P16 = @p16@, P17 = @p17@, P18 = @p18@, P19 = @p19@, P20 = @p20@;
const habla = (t, a, b) => t > a && t < b && voz(t) > 0.15;

// el congelado de la pausa 34: el último instante de pa-precio (si no se pudo cargar, la ciudadela con el trono vacío)
const congPrecio = () => horno('precio', () => {
  if (PLANOS_PRECIO && PLANOS_PRECIO.length) PLANOS_PRECIO[PLANOS_PRECIO.length - 1][1](DUR_PRECIO - 0.12);
  else { const o = { encuadre: 'trono', vacio: true, cunas: 2, luz: 'noche' }; T.ciudadela(R, DUR_PRECIO, o); T.ciudadelaDelante(R, DUR_PRECIO, o); } });

// ── 1 · la pausa: Atom entra y saca 2009 ─────────────────────────────────────────────────────────────────────────
const N09 = @y2009@, NOTICE = @notice@, FICTION = @fiction@;
const p1 = (t) => {
  R.copiar(congPrecio()); pausa(t, 0, P2 - 0.02);
  const anda = tramo(t, 0.05, 1.1), x = lerp(318, 236, anda), sen = t > NOTICE + 0.1 && t < FICTION;
  const cara = t > N09 + 0.2 ? 'sonrisa' : t > FICTION ? 'guino' : sen ? 'sorpresa' : 'normal';
  atomG(x, 168, t, { s: 2, pose: anda < 1 ? 'camina' : sen || t > N09 ? 'senala' : 'quieto', dir: -1, cara, habla: voz(t) });
  const u = pop(t, N09);
  if (u > 0) { const y = 34 + ri((1 - u) * 26) + flota(t); AT.escalado(R, calendario(7), 22, 24, 54, y, 2);
    R.numero('2009', 76, y + 72, { tam: 16, centro: true }); AT.anillo(R, 76, y + 36, 42, 46, t, tramo(t, N09 + 0.15, N09 + 0.7)); }
};

// ── 2 · la consulta: los dos médicos repasan las vidas ───────────────────────────────────────────────────────────
const PHYS = @physician@, OWEN = @owen@, PSY = @psych@, DAV = @davidson@;
const p2 = (t) => {
  const o = { encuadre: 'consulta' }, g = T.estudio(R, t, o);
  const ex = g.escritorio ? g.escritorio[0] : 244, ey = g.escritorio ? g.escritorio[1] : 132, dy = g.detras ?? 134;
  R.actor(EL.psiquiatra, 254, dy, t, { dir: -1, dedo: t > PSY && t < PSY + 1.2, habla: habla(t, PSY, DAV + 0.6), sonrisa: t > DAV + 0.5, sorpresa: t > OWEN - 0.1 && t < OWEN + 0.4 });
  T.estudioDelante(R, t, o);
  // la pila de carpetas que crece en el escritorio (las vidas que repasan)
  const n = t < OWEN ? 1 : 1 + Math.min(5, Math.floor((t - OWEN) * 2.4));
  for (let k = 0; k < n; k++) carpeta(ex - 20 + (k % 2), ey - 3 - k * 2, [H('#c8a050'), H('#a8c0d8'), H('#d89a8a')][k % 3]);
  // el médico entra con las carpetas y las deja en «Owen»
  const u = tramo(t, P2 + 0.1, OWEN - 0.2), fx = ri(lerp(-16, 206, u)), lleva = t < OWEN;
  const r = R.actor(EL.academicoBritanico, fx, 164, t, { dir: 1, anda: u > 0 && u < 1, sostiene: lleva ? true : undefined, dedo: t > DAV, habla: habla(t, OWEN + 0.3, PSY - 0.1), sonrisa: t > OWEN && t < PSY });
  if (lleva && r.mano) { carpeta(r.mano[0] + 3, r.mano[1] - 2, H('#a8c0d8')); carpeta(r.mano[0] + 3, r.mano[1] - 5, H('#c8a050')); }
  if (t > OWEN && t < OWEN + 0.5) for (let k = 0; k < 4; k++) R.pset(ex - 26 + k * 4, ey - 8 - ri((t - OWEN) * 12), H('#ffffff'));
  // en «Davidson» abren una carpeta: dentro, la ficha con el retrato de un líder
  const ab = tramo(t, DAV - 0.3, DAV + 0.2); if (ab > 0) { const x0 = ex - 6, y0 = ey - 10; caja(x0, y0, x0 + 9 + ri(ab * 9), y0 + 8, K); caja(x0 + 1, y0 + 1, x0 + 8 + ri(ab * 9), y0 + 7, H('#c8a050')); if (ab >= 1) { caja(x0 + 9, y0 + 1, x0 + 17, y0 + 7, H('#f4f0e6')); retrato(x0 + 2, y0 + 1, 6, 6, 3, H('#a8b8c8')); } }
  lucie(146 + Math.sin(t * 0.9) * 10, 98 + flota(t), t, { dir: 1, cara: t > PSY ? 'sonrisa' : 'normal', brillo: 0.7 });
};

// ── 3 · el archivo de biografías ─────────────────────────────────────────────────────────────────────────────────
const LIVES = @lives@, PRES = @presidents@, MINIS = @ministers@, HUND = @hundred@;
const LIB = pal(['#7a2a22', '#2a4a6a', '#3a5a2a', '#8a6a2a', '#5a2a4a', '#a8783a', '#2a2a3a', '#6a3a1a']);
const MADO = pal(['#1a0e08', '#2e1a10', '#4a2c18', '#6a4024', '#8a5a32', '#a8743e']);
const archivo = () => horno('archivo', () => {
  madera(0, 0, 319, 152, MADO, 1.7, 0, true);
  for (let x = 0; x < 320; x += 32) { R.linea(x, 0, x, 152, MADO[0]); R.linea(x + 1, 0, x + 1, 152, MADO[3]); }
  caja(0, 0, 319, 5, MADO[1]); R.linea(0, 5, 319, 5, MADO[4]); R.linea(0, 6, 319, 6, K);
  R.rect(0, 22, 319, 22, MADO[0]); R.rect(0, 23, 319, 23, MADO[4]); R.rect(0, 47, 319, 48, MADO[0]); R.rect(0, 46, 319, 46, ORO[2]);
  for (const [x0, x1] of [[6, 102], [112, 208], [218, 314]]) { caja(x0, 52, x1, 152, K); caja(x0 + 1, 53, x1 - 1, 152, MADO[1]);
    for (let s = 0; s < 5; s++) { const yb = 70 + s * 18; let x = x0 + 3;
      for (let j = yb - 16; j < yb; j++) for (let i = x0 + 2; i < x1 - 1; i++) if (b4(i, j) < 0.3) R.pset(i, j, MADO[0]);
      while (x < x1 - 4) { const w = 2 + ri(h2(x, s, 31) * 3), hh = 10 + ri(h2(x, s, 32) * 5), c = LIB[ri(h2(x, s, 33) * 7)];
        if (h2(x, s, 34) > 0.93 && x < x1 - 14) { marco(x, yb - 14, x + 11, yb - 1, ORO[2], ORO[4], ORO[1], 1); retrato(x + 3, yb - 11, 6, 8, ri(h2(x, s, 35) * 8), H('#a8b8c8')); x += 13; continue; }
        if (h2(x, s, 36) > 0.9 && x < x1 - 12) { for (let j = 0; j < 3; j++) { caja(x, yb - 3 - j * 3, x + 9, yb - 1 - j * 3, K); caja(x + 1, yb - 2 - j * 3, x + 8, yb - 2 - j * 3, LIB[(j + s + 2) % 8]); } x += 11; continue; }
        caja(x, yb - hh, x + w - 1, yb - 1, c); R.linea(x, yb - hh, x, yb - 1, mez(c, H('#ffffff'), 0.25)); if (w > 2) R.linea(x + w - 1, yb - hh, x + w - 1, yb - 1, mez(c, K, 0.45));
        R.pset(x + (w >> 1), yb - hh + 2, ORO[4]); R.pset(x + (w >> 1), yb - 4, ORO[3]); x += w; }
      caja(x0 + 1, yb, x1 - 1, yb + 2, MADO[3]); R.linea(x0 + 1, yb, x1 - 1, yb, MADO[5]); R.linea(x0 + 1, yb + 3, x1 - 1, yb + 3, K); }
    caja(x0 - 2, 50, x1 + 2, 53, MADO[3]); R.linea(x0 - 2, 50, x1 + 2, 50, MADO[5]); R.linea(x0 - 2, 54, x1 + 2, 54, K); }
  // el raíl de latón de la escalera
  R.linea(0, 58, 319, 58, ORO[3]); R.linea(0, 59, 319, 59, ORO[1]);
  // el suelo de tablas y la alfombra
  madera(0, 153, 319, 179, pal(['#1e120a', '#3a2416', '#5a3a22', '#7a5230', '#9a6c40']), 2.3, 6);
  for (let y = 162; y < 180; y++) for (let x = 112; x < 310; x++) { const bo = y < 164 || x < 115 || x > 306; R.pset(x, y, bo ? (b4(x, y) < 0.5 ? ORO[2] : ROJO[1]) : rmp(ROJO, 1.2 + ns(x * 0.2, y * 0.3) * 0.8 + ((x + y) % 8 === 0 ? 0.7 : 0) + ((x - y) % 8 === 0 ? 0.5 : 0), x, y)); }
  // la mesa de lectura con la lámpara verde, el atril y libros
  caja(196, 140, 300, 145, K); madera(197, 141, 299, 144, MAD, 3, 0, false, 2); R.linea(197, 141, 299, 141, MAD[4]);
  for (const x of [200, 294]) { caja(x - 1, 146, x + 2, 170, K); caja(x, 146, x + 1, 169, MAD[2]); }
  caja(197, 146, 299, 150, MAD[1]); R.linea(197, 150, 299, 150, K);
  caja(280, 128, 284, 140, K); R.linea(282, 129, 282, 139, ORO[3]); R.poligono([[272, 128], [292, 128], [289, 120], [275, 120]], K); R.poligono([[274, 127], [290, 127], [288, 121], [276, 121]], H('#2e6a4a')); R.linea(276, 121, 288, 121, H('#5aa07a'));
  caja(276, 138, 290, 140, K); caja(277, 139, 289, 139, ORO[2]);
  for (let j = 0; j < 4; j++) { caja(250 + j, 136 - j * 3, 266 - j, 139 - j * 3, K); caja(251 + j, 137 - j * 3, 265 - j, 138 - j * 3, LIB[j + 1]); }
});
const p3 = (t) => {
  R.copiar(archivo());
  const f = 0.88 + Math.sin(t * 9) * 0.04;
  luz(282, 132, 40, H('#ffe8a8'), 0.35 * f);
  // el friso: los retratos de cien años se encienden de izquierda a derecha, de sepia a color
  for (let i = 0; i < 9; i++) { const x = 18 + i * 29, on = tramo(t, P3 + 0.3 + i * 0.42, P3 + 0.6 + i * 0.42); marco(x, 25, x + 17, 44, ORO[2], ORO[4], ORO[1], 1);
    retrato(x + 3, 28, 12, 14, i * 3 + 1, i % 2 ? H('#a83a3a') : H('#3a5a9a'), i < 4 ? 0.85 : 0.3 * (1 - on));
    if (on < 1) for (let j = 28; j < 42; j++) for (let k = x + 3; k < x + 15; k++) if (b4(k, j) > on) tiñe(k, j, K, 0.7); }
  // la escalera que rueda por el raíl, con el médico subido
  const lx = ri(lerp(118, 70, tramo(t, P3, LIVES - 0.2)));
  const lado = (x0, y0, x1, y1) => { R.linea(x0, y0, x1, y1, K); R.linea(x0 + 1, y0, x1 + 1, y1, MAD[4]); R.linea(x0 + 2, y0, x1 + 2, y1, K); };
  lado(lx, 57, lx - 16, 168); lado(lx + 14, 57, lx - 2, 168);
  for (let y = 66; y < 166; y += 10) { const k = (y - 57) / 111; R.linea(ri(lx + 2 - 16 * k), y, ri(lx + 14 - 16 * k), y, MAD[3]); R.linea(ri(lx + 2 - 16 * k), y + 1, ri(lx + 14 - 16 * k), y + 1, K); }
  R.disco(lx + 1, 58, 2, ORO[3]); R.disco(lx + 15, 58, 2, ORO[3]);
  const coge = t > LIVES && t < PRES, coge2 = t > PRES + 0.5 && t < MINIS;
  const mr = R.actor(EL.academicoBritanico, lx - 4, 116, t, { dir: -1, sostiene: coge || coge2 ? [lx - 18, 98] : undefined, dedo: t > MINIS + 0.6 && t < HUND, sonrisa: t > HUND });
  if ((coge || coge2) && mr.mano) libro(mr.mano[0], mr.mano[1] - 3, LIB[coge ? 2 : 4], 1);
  // los libros vuelan hasta el psiquiatra, que los atrapa y los apila
  const vuelo = (a, c) => { const u = (t - a) / 0.7; if (u <= 0 || u >= 1) return; libro(lerp(lx - 14, 178, u), lerp(96, 140, u) - Math.sin(u * Math.PI) * 26, c, Math.floor(u * 8) % 2); };
  vuelo(PRES, LIB[2]); vuelo(MINIS, LIB[4]);
  const atrapa = (t > PRES + 0.6 && t < PRES + 1.2) || (t > MINIS + 0.6 && t < MINIS + 1.2);
  const pr = R.actor(EL.psiquiatra, 186, 172, t, { dir: -1, sostiene: atrapa ? [176, 146] : undefined, sorpresa: atrapa, sonrisa: t > HUND });
  if (atrapa && pr.mano) libro(pr.mano[0], pr.mano[1] - 2, LIB[t < MINIS ? 2 : 4]);
  const apil = (t > PRES + 1.2 ? 1 : 0) + (t > MINIS + 1.2 ? 1 : 0);
  for (let k = 0; k < apil; k++) { caja(224, 136 - k * 3, 238, 139 - k * 3, K); caja(225, 137 - k * 3, 237, 138 - k * 3, LIB[k ? 4 : 2]); }
  // Atom, de pie en la mesa, con la lupa sobre el libro abierto
  const ar = atomG(212, 140, t, { dir: 1, pose: 'sostiene', cara: t > HUND ? 'sorpresa' : 'normal' }); AT.lupa(R, ar.mano[0], ar.mano[1], 1, 1);
  // el polvo que flota en la luz de la lámpara
  for (let k = 0; k < 10; k++) { const y = ri(110 + ((h2(k, 1, 7) * 40 + t * 3) % 40)), x = ri(262 + h2(k, 2, 7) * 40 + Math.sin(t + k) * 2); tiñe(x, y, H('#fff0c0'), 0.6); }
  // cien años
  const u = pop(t, HUND); if (u > 0) { const y = 62 + ri((1 - u) * 6); caja(136, y, 184, y + 20, K); caja(137, y + 1, 183, y + 19, H('#2a1a10')); R.linea(137, y + 1, 183, y + 1, ORO[2]);
    R.linea(150, 59, 142, y, ORO[2]); R.linea(170, 59, 178, y, ORO[2]); R.numero('100', 160, y + 18, { tam: 16, centro: true }); }
};

// ── 4 · el despacho del líder inventado: el poder lo cambia ─────────────────────────────────────────────────────
const HUB = @hubris@, PERS = @personality@, CHG = @change@, LEAD = @leaders@, AFTER = @after@, POW1 = @power1@;
const despacho = () => horno('despacho', () => {
  // la pared lisa de arriba (tranquila para la barra y para Atom), el papel de abajo y el friso de madera
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#5a4a3a', '#6e5c48', '#82705a', '#968470']), 2.2 + (h2(x >> 2, y >> 2, 4) - 0.5) * 0.5 - y / 260, x, y));
  caja(0, 0, 319, 6, H('#e8dcc0')); R.linea(0, 6, 319, 6, H('#a89878')); R.linea(0, 7, 319, 7, K); for (let x = 2; x < 320; x += 6) R.pset(x, 4, H('#b8a888'));
  papel(0, 60, 319, 100, H('#3a4a3a'), H('#5a6a4a'), H('#2a3a2a'), 10);
  caja(0, 58, 319, 60, MAD[3]); R.linea(0, 58, 319, 58, MAD[4]); R.linea(0, 61, 319, 61, K);
  madera(0, 100, 319, 140, MAD, 2.4, 0, true, 3);
  for (let x = 0; x < 320; x += 40) { caja(x + 4, 106, x + 35, 134, K); madera(x + 5, 107, x + 34, 133, MAD, 3, 0, true, x); R.linea(x + 5, 107, x + 34, 107, MAD[4]); }
  caja(0, 99, 319, 101, MAD[4]); R.linea(0, 102, 319, 102, K);
  // la ventana grande con su marco (el cielo y la ciudad se pintan vivos)
  caja(20, 22, 106, 100, K); caja(21, 23, 105, 99, H('#e8e0d0')); caja(24, 26, 102, 96, K);
  // el suelo: parqué y la alfombra roja con la orla de oro
  madera(0, 141, 319, 179, pal(['#2a160c', '#4a2a16', '#6a4022', '#8a5a30', '#a8743e']), 2.2, 5, true);
  for (let y = 152; y < 180; y++) for (let x = 40; x < 300; x++) { const bo = y < 155 || x < 44 || x > 295; R.pset(x, y, bo ? (b4(x, y) < 0.5 ? ORO[3] : ORO[1]) : rmp(ROJO, 1.3 + ns(x * 0.15, y * 0.3) * 0.7 + (((x >> 3) + (y >> 3)) % 2 ? 0.3 : 0), x, y)); }
  // el reloj de pie a la derecha
  caja(236, 66, 254, 150, K); madera(237, 67, 253, 149, MAD, 3.2, 0, true, 5); caja(239, 70, 251, 82, K); R.disco(245, 76, 5, H('#f4ecd8')); R.pset(245, 76, K); caja(240, 88, 250, 140, K); caja(241, 89, 249, 139, H('#1a1410'));
});
const p4 = (t) => {
  R.copiar(despacho());
  // por la ventana: cielo de día, nubes de tres tonos, pájaros y la ciudad lejana (recortados al hueco)
  R.recorte([25, 27, 101, 95]);
  cieloDia(25, 27, 101, 95, 1);
  nubes(t, [[10, 40, 34, 3, 1], [70, 52, 26, 5, 2], [120, 36, 22, 7, 3]], NUBE_D);
  pajaros(t, 25, 34, 101, 60, 3, 4);
  for (let x = 25; x <= 101; x++) { const hh = 74 + ri(h2(x >> 2, 1, 9) * 10) + (x > 56 && x < 70 ? -8 : 0); for (let y = hh; y <= 95; y++) R.pset(x, y, (y - hh) % 4 === 1 && x % 3 === 0 && h2(x, y, 3) > 0.4 ? H('#f0d890') : y < hh + 1 ? H('#8a94a8') : H('#6a7488')); }
  R.disco(63, 66, 6, H('#8a94a8')); R.linea(63, 58, 63, 60, H('#6a7488'));
  R.recorte(null);
  caja(62, 26, 63, 96, H('#e8e0d0')); caja(24, 60, 102, 61, H('#e8e0d0'));
  // las cortinas que se mecen
  for (const [x0, d] of [[10, 1], [104, -1]]) for (let y = 18; y < 106; y++) { const v = ri(Math.sin(t * 1.6 + y * 0.07 + x0) * 1.5 * (y - 18) / 88); for (let i = 0; i < 12; i++) R.pset(x0 + i + v, y, i === 0 || i === 11 ? K : rmp(ROJO, 1.3 + Math.sin((i + v) * 1.2) * 0.8, x0 + i, y)); }
  caja(6, 16, 120, 18, ORO[2]); R.linea(6, 16, 120, 16, ORO[4]);
  // la bandera inventada (verde y blanca con una estrella) que se mece en su mástil
  caja(262, 44, 263, 152, ORO[2]); R.disco(262, 43, 2, ORO[4]);
  for (let i = 0; i < 26; i++) for (let j = 0; j < 18; j++) { const v = ri(Math.sin(t * 2.4 - i * 0.3) * 1.5 * i / 26); R.pset(264 + i, 48 + j + v, j === 0 || j === 17 || i === 25 ? K : j < 6 ? H('#2e6a4a') : j < 12 ? H('#f0ece0') : H('#2e6a4a')); }
  { const v = ri(Math.sin(t * 2.4 - 3) * 0.8); R.poligono([[275, 54 + v], [277, 58 + v], [281, 58 + v], [278, 60 + v], [279, 64 + v], [275, 61 + v], [271, 64 + v], [272, 60 + v], [269, 58 + v], [273, 58 + v]], H('#e8c040')); }
  // el péndulo del reloj
  { const a = Math.sin(t * 3.1) * 0.35; R.linea(245, 90, 245 + ri(Math.sin(a) * 30), 90 + ri(Math.cos(a) * 30), ORO[2]); R.disco(245 + Math.sin(a) * 32, 90 + Math.cos(a) * 32, 3, ORO[4]); }
  { const a = t * 0.6; R.linea(245, 76, 245 + ri(Math.cos(a) * 3), 76 + ri(Math.sin(a) * 3), K); }
  // el retrato del líder en la pared, que se agranda con los años de poder
  const cre = tramo(t, AFTER, POW1 + 0.4), mw = ri(lerp(28, 44, cre)), mh = ri(lerp(34, 50, cre)), mx = 172 - (mw >> 1), my = 62 - mh + 34 - ri(cre * 8);
  marco(mx, my, mx + mw, my + mh, ORO[2], ORO[5], ORO[1], 2 + ri(cre)); retrato(mx + 4, my + 4, mw - 7, mh - 7, 6, H('#3a5a7a'));
  // el calendario de pared: en «after time in power» las hojas vuelan una tras otra
  const ho = Math.floor(tramo(t, AFTER, POW1 + 0.5) * 7);
  AT.escalado(R, calendario(ho + 2), 22, 24, 122, 30, 1);
  for (let k = 0; k < 3; k++) { const u = ((t - AFTER) * 2.2 + k / 3) % 1; if (t < AFTER || t > POW1 + 0.7) break; const x = ri(132 + u * 46 + Math.sin(u * 9 + k) * 4), y = ri(40 + u * 70); caja(x, y, x + 6, y + 6 - (Math.floor(u * 10) % 2) * 3, H('#f8f4ec')); R.linea(x, y, x + 6, y, H('#c83a3a')); }
  // su sombra en la pared crece desde «hubris»
  const som = 1 + tramo(t, HUB, POW1 + 0.6) * 1.4;
  for (let y = 70; y < 126; y++) for (let x = 150; x < 240; x++) { const dx = (x - 196) / (10 * som), dy = (y - (126 - 34 * som)) / (10 * som), cu = (x - 196) / (16 * som), cy = (y - (126 - 12 * som)) / (14 * som);
    if ((dx * dx + dy * dy < 1 || (cu * cu + cy * cy < 1 && y < 126)) && b4(x, y) < 0.55) tiñe(x, y, K, 0.35); }
  // el sillón, cuyo respaldo crece como un trono
  const ry = ri(lerp(108, 76, tramo(t, AFTER, POW1 + 0.4)));
  caja(150, ry, 184, 136, K); for (let y = ry + 1; y < 136; y++) for (let x = 151; x < 184; x++) R.pset(x, y, rmp(pal(['#3a0e14', '#5a1a20', '#7a2a2e', '#9a3a3a']), 1.6 + Math.sin((x - 151) * 0.4) * 0.6 + ((x - 151) % 8 === 0 && (y - ry) % 8 === 4 ? 1.4 : 0), x, y));
  if (ry < 96) { R.poligono([[160, ry], [167, ry - 9], [174, ry]], K); R.poligono([[162, ry - 1], [167, ry - 7], [172, ry - 1]], ORO[4]); caja(150, ry, 184, ry + 1, ORO[3]); }
  // el líder tras la mesa: sonríe; en «personality change» se pone serio y señala; luego se hincha
  const cam = t > CHG;
  R.actor(EL.ejecutivo, 167, 142, t, { dir: 1, sonrisa: !cam, enfado: cam, dedo: cam && t < LEAD + 0.6, brazos: t > POW1 + 0.2, habla: t > PERS && t < CHG + 0.6 });
  // la mesa de caoba (delante del líder)
  caja(96, 133, 238, 138, K); madera(97, 134, 237, 137, pal(['#2a0e08', '#4a1c10', '#6a2c18', '#8a3e22']), 2.4, 0, false, 7); R.linea(97, 134, 237, 134, H('#b05a32'));
  caja(100, 139, 234, 162, K); madera(101, 140, 233, 161, pal(['#2a0e08', '#4a1c10', '#6a2c18', '#8a3e22']), 1.8, 0, true, 8);
  for (const x of [104, 148, 192]) { caja(x, 142, x + 38, 158, K); madera(x + 1, 143, x + 37, 157, pal(['#2a0e08', '#4a1c10', '#6a2c18', '#8a3e22']), 2.2, 0, true, x); R.disco(x + 19, 150, 1.5, ORO[4]); }
  caja(118, 129, 146, 133, K); caja(119, 130, 145, 132, H('#2e5a3a')); caja(206, 125, 214, 133, K); caja(207, 126, 213, 132, H('#2a2a30')); R.linea(204, 125, 216, 125, K);
  caja(124, 125, 130, 129, ORO[2]); R.linea(126, 121, 126, 125, K); R.linea(129, 120, 128, 125, K);
  // el consejero con sus papeles: se sobresalta y se le cae uno
  const cae = tramo(t, CHG + 0.1, CHG + 1.4);
  const cr = R.actor(EL.consejero, 278, 166, t, { dir: -1, sostiene: true, sorpresa: t > CHG && t < CHG + 1.2, triste: t > CHG + 1.2, habla: t > HUB && t < PERS });
  if (cr.mano) carpeta(cr.mano[0] - 2, cr.mano[1] - 2, H('#f4f0e6'));
  if (cae > 0 && cae < 1) { const x = ri(272 - cae * 22 + Math.sin(cae * 12) * 4), y = ri(150 + cae * 22); caja(x, y, x + 5, y + 2 - (Math.floor(cae * 8) % 2), H('#f4f0e6')); }
  else if (cae >= 1) caja(250, 172, 256, 173, H('#f4f0e6'));
  // Atom, de luciérnaga en la ventana, mira el cambio
  lucie(64 + Math.sin(t * 0.8) * 6, 110 + flota(t), t, { dir: 1, cara: t > CHG ? 'sorpresa' : 'normal', brillo: 0.75 });
};

// ── 5 · la pausa: el globo del líder y sus tres rasgos ─────────────────────────────────────────────────────────
const OUTS = @outsized@, CONT = @contempt@, HIST = @history@, GOD = @god@;
const p5 = (t) => {
  R.copiar(congPrecio()); pausa(t, P5, P6 - 0.02);
  const n = [OUTS, CONT, HIST].filter((a) => t > a).length, up = tramo(t, GOD, GOD + 0.5);
  const rad = 13 + [OUTS, CONT, HIST].reduce((a, b) => a + tramo(t, b, b + 0.5) * 5, 0) + Math.sin(t * 3) * 0.7;
  const r = atomG(90, 168 - ri(up * 8), t, { s: 2, pose: 'sostiene', dir: 1, cara: up > 0 ? 'sorpresa' : n >= 2 ? 'triste' : 'normal', habla: voz(t) });
  const gx = 150 + Math.sin(t * 1.3) * 3, gy = 92 - n * 6 - up * 14 + Math.sin(t * 1.7) * 2;
  for (let k = 0; k <= 20; k++) { const u = k / 20, x = lerp(r.mano[0], gx, u) + Math.sin(u * Math.PI) * 4, y = lerp(r.mano[1], gy + rad + 4, u); R.pset(ri(x), ri(y), H('#f0e8d8')); }
  globo(gx, gy, rad, t, n);
  for (const [a, f, y] of [[OUTS, tExcl, 30], [CONT, tConsejo, 78], [HIST, tCielo, 126]]) { const u = pop(t, a); if (u <= 0) continue;
    const yy = y + ri((1 - u) * 14) + flota(t, y); AT.escalado(R, f, 18, 22, 226, yy, 2);
    if (t < a + 1.6) AT.anillo(R, 244, yy + 22, 26, 30, t, tramo(t, a + 0.1, a + 0.5)); }
};

// ── 6 · el laboratorio de psicología de 2014 (Canadá: arces rojos por la ventana) ───────────────────────────────
const EXPER = @experiments@, MEAS = @measure@, Y14 = @y2014@, TEAM = @team@, CANAD = @canadian@;
const LOSA = pal(['#5a6268', '#727a80', '#8a9298', '#a2aab0', '#bcc4c8']);
const labPsico = () => horno('lab', () => {
  // la pared de arriba lisa y tranquila; abajo, azulejos verde pálido con juntas
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 70 ? rmp(pal(['#a8b4a8', '#b8c4b8', '#c8d4c8']), 1.4 + (h2(x >> 2, y >> 2, 6) - 0.5) * 0.5, x, y)
    : ((y - 70) % 8 === 0 || x % 12 === 0) ? H('#8a9a8c') : rmp(pal(['#a8c0ac', '#b8d0bc', '#cce0d0']), 1.3 + (x % 12 < 2 ? 0.6 : 0) + ns(x * 0.1, y * 0.1) * 0.4, x, y));
  caja(0, 68, 319, 69, H('#6a7a6c')); caja(0, 0, 319, 5, H('#e8ece4')); R.linea(0, 6, 319, 6, H('#8a948a'));
  // la ventana (lo de fuera se pinta vivo)
  caja(14, 22, 112, 102, K); caja(15, 23, 111, 101, H('#e0e4e0')); caja(18, 26, 108, 98, K);
  caja(12, 102, 114, 105, H('#d0d4d0')); R.linea(12, 106, 114, 106, K);
  // el corcho con dibujos de cerebros y gráficas (sin letras)
  caja(132, 24, 196, 62, K); for (let y = 25; y < 62; y++) for (let x = 133; x < 196; x++) R.pset(x, y, rmp(pal(['#8a5a30', '#a8743e', '#c08e52']), 1.2 + h2(x, y, 9) * 1.2, x, y));
  for (const [x, y, w, hh, c] of [[136, 28, 18, 14, '#f4f0e6'], [158, 30, 16, 20, '#e8f0f8'], [178, 27, 15, 12, '#f8e8e0'], [138, 46, 22, 13, '#f4f0e6'], [176, 44, 16, 15, '#f0f4e0']]) {
    caja(x, y, x + w, y + hh, K); caja(x + 1, y + 1, x + w - 1, y + hh - 1, H(c)); R.disco(x + (w >> 1), y + 1, 1, H('#e8483a')); }
  R.disco(145, 35, 4, H('#e8a0a8')); R.disco(147, 36, 3, H('#d88890')); for (let i = 0; i < 12; i++) R.pset(160 + i, 46 - ri(Math.sin(i * 0.9) * 4 + i * 0.5), H('#3a6ab0'));
  for (let i = 0; i < 4; i++) caja(141 + i * 4, 56 - i * 2, 143 + i * 4, 57, H('#3a8a5a')); R.linea(180, 54, 190, 48, H('#c83a3a'));
  // la mesa del aparato y la del monitor
  caja(206, 116, 312, 120, K); caja(207, 117, 311, 119, H('#c8ccd0')); for (const x of [210, 306]) { caja(x, 121, x + 2, 152, K); caja(x + 1, 121, x + 1, 151, H('#8a9298')); }
  caja(120, 124, 196, 128, K); caja(121, 125, 195, 127, H('#c8ccd0')); for (const x of [124, 190]) { caja(x, 129, x + 2, 156, K); caja(x + 1, 129, x + 1, 155, H('#8a9298')); }
  // el aparato de electroencefalograma: chasis con botones y la tira de papel
  caja(214, 82, 304, 116, K); for (let y = 83; y < 116; y++) for (let x = 215; x < 304; x++) R.pset(x, y, rmp(pal(['#6a7280', '#848c98', '#9ea6b0']), 1.4 + (y < 86 ? 0.8 : 0) + (x > 300 ? -0.6 : 0), x, y));
  caja(220, 88, 270, 110, K); for (let k = 0; k < 6; k++) { R.disco(278 + (k % 3) * 9, 92 + Math.floor(k / 3) * 9, 3, K); R.disco(278 + (k % 3) * 9, 92 + Math.floor(k / 3) * 9, 2, H('#c8ccd0')); }
  // el monitor (de espaldas a nosotros no: de lado, con su pantalla)
  caja(140, 92, 182, 122, K); caja(141, 93, 181, 121, H('#3a3e46')); caja(145, 96, 177, 117, K); caja(156, 122, 166, 124, H('#3a3e46'));
  // el suelo de linóleo a cuadros con reflejos
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (((x + (y - 132) * 0.6) >> 4) + ((y - 132) >> 3)) % 2; R.pset(x, y, rmp(LOSA, 2.2 + (c ? 0.7 : -0.3) - (y - 132) / 90 + (b4(x, y) < 0.08 ? 0.8 : 0), x, y)); }
  R.linea(0, 132, 319, 132, H('#5a6268'));
  // la papelera y una planta
  caja(10, 146, 24, 168, K); for (let y = 147; y < 168; y++) for (let x = 11; x < 24; x++) R.pset(x, y, (x + y) % 4 === 0 ? H('#5a6a7a') : H('#7a8a9a'));
  caja(292, 150, 308, 168, K); caja(293, 151, 307, 167, H('#b05a3a')); for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33; R.linea(300, 150, ri(300 + Math.cos(a) * 14), ri(150 + Math.sin(a) * 16), H('#3a7a3a')); }
});
const p6 = (t) => {
  R.copiar(labPsico());
  // fuera: cielo de otoño, arces rojos que se mecen y hojas que caen (recortado a la ventana)
  R.recorte([19, 27, 107, 97]);
  cieloDia(19, 27, 107, 97, 2); nubes(t, [[0, 38, 30, 3, 1], [60, 50, 24, 5, 2]], NUBE_D); pajaros(t, 19, 32, 107, 50, 2, 6);
  for (let x = 19; x <= 107; x++) for (let y = 84; y <= 97; y++) R.pset(x, y, y < 86 ? H('#7a8a6a') : rmp(pal(['#4a5a3a', '#5a6a42', '#6a7a4a']), 1 + h2(x, y, 2), x, y));
  for (const [cx, cy, r, k] of [[40, 64, 16, 0], [86, 70, 13, 1]]) { caja(cx - 1, cy + 6, cx + 1, 90, H('#4a3020'));
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const v = Math.sin(t * 1.2 + k) * 1.2 * (1 - (j + r) / (2 * r)); if (i * i + j * j * 1.3 > r * r || ns((cx + i - v) * 0.2, (cy + j) * 0.2 + k) < 0.25) continue; R.pset(ri(cx + i + v), cy + j, rmp(pal(['#6a1a14', '#a8301e', '#d8502a', '#f08a3a']), 1.6 + ns((cx + i) * 0.3, (cy + j) * 0.3) * 1.6 - j / r * 0.8, cx + i, cy + j)); } }
  for (let k = 0; k < 7; k++) { const u = (t * 0.18 + h2(k, 1, 3)) % 1, x = ri(24 + h2(k, 2, 3) * 80 + Math.sin(t * 2 + k) * 4), y = ri(40 + u * 56); R.pset(x, y, H('#d8502a')); R.pset(x + 1, y, H('#a8301e')); }
  R.recorte(null);
  caja(62, 27, 63, 97, H('#e0e4e0')); caja(19, 60, 107, 61, H('#e0e4e0'));
  // el calendario de pared: en «2014» se rodea el día y sale el año a color
  AT.escalado(R, calendario(t > Y14 ? 11 : null), 22, 24, 206, 26, 1);
  const u = pop(t, Y14); if (u > 0) { R.numero('2014', 248, 64 - ri((1 - u) * 8), { tam: 16, centro: true }); if (t < Y14 + 1.8) AT.anillo(R, 217, 38, 16, 16, t, tramo(t, Y14, Y14 + 0.4)); }
  // la pantalla del monitor que se enciende y la tira de papel del aparato que corre con las ondas
  const enc = t > EXPER + 0.3; for (let y = 97; y < 117; y++) for (let x = 146; x < 177; x++) R.pset(x, y, enc ? (y % 2 ? H('#1a3a4a') : H('#22485a')) : H('#14161c'));
  if (enc) { R.disco(161, 106, 5, H('#e8a0a8')); R.disco(163, 107, 3.5, H('#d88890')); if (Math.floor(t * 4) % 2) R.pset(158, 104, H('#ffffff')); }
  for (let x = 221; x < 270; x++) { const ph = x * 0.5 + t * 14; for (let k = 0; k < 3; k++) { const y = 92 + k * 6 + ri(Math.sin(ph + k * 2) * (t > TEAM + 0.8 ? 2.4 : 0.6) + Math.sin(ph * 2.3 + k) * 0.8); R.pset(x, y, [H('#3a8a5a'), H('#3a6ab0'), H('#c83a3a')][k]); } }
  for (let y = 89; y < 110; y++) for (let x = 221; x < 270; x++) if ((x + ri(t * 14)) % 10 === 0 && b4(x, y) < 0.5) tiñe(x, y, H('#a8b0a8'), 0.5);
  for (let k = 0; k < 6; k++) if (Math.sin(t * (3 + k) + k) > 0.2) R.pset(278 + (k % 3) * 9, 92 + Math.floor(k / 3) * 9, [H('#e8483a'), H('#5ad87a'), H('#ffd34a')][k % 3]);
  // el voluntario espera junto al monitor; la investigadora llega con el gorro de electrodos y se lo pone en «team»
  const vx = 148, ll = tramo(t, P6 + 0.4, TEAM - 0.2), ix = ri(lerp(-30, vx - 20, ll)), puesto = t > TEAM + 0.2;
  const vr = R.actor(EL.voluntario, vx, 160, t, { dir: -1, sorpresa: t > TEAM && t < TEAM + 0.6, sonrisa: t > CANAD + 0.4, habla: habla(t, Y14 + 0.4, TEAM - 0.5) });
  const ir = R.actor(EL.investigadora, ix, 162, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: !puesto ? true : undefined, dedo: t > CANAD + 0.3 && t < CANAD + 1.4, sonrisa: puesto });
  const gorro = (x, y) => { R.disco(x, y, 5.5, K); R.disco(x, y, 4.5, H('#e8e0d0')); for (let a = 0; a < 7; a++) R.pset(ri(x + Math.cos(-0.3 - a * 0.42) * 4), ri(y + Math.sin(-0.3 - a * 0.42) * 4), [H('#e8483a'), H('#3a6ab0'), H('#ffd34a')][a % 3]); };
  const cabeza = [vx, 160 - 22];
  if (!puesto && ir.mano) gorro(ir.mano[0] + 2, ir.mano[1] - 3); else { gorro(cabeza[0], cabeza[1] - 2);
    for (let k = 0; k < 3; k++) { const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([lerp(cabeza[0] + 3, 216, u), lerp(cabeza[1] - 2, 100 + k * 4, u) + Math.sin(u * Math.PI) * 18]); }
      for (let i = 0; i < 10; i++) R.linea(ri(pts[i][0]), ri(pts[i][1]), ri(pts[i + 1][0]), ri(pts[i + 1][1]), [H('#c83a3a'), H('#3a6ab0'), H('#e8c040')][k]); } }
  // el otro psicólogo, en el aparato, gira un botón
  R.actor(EL.cientifico, 262, 146, t, { dir: -1, dedo: t > MEAS && t < MEAS + 1.2, sonrisa: t > TEAM + 0.8 });
  lucie(92 + Math.sin(t) * 8, 120 + flota(t), t, { dir: 1, cara: t > Y14 ? 'sonrisa' : 'normal', brillo: 0.7 });
};

// ── 7 · la cabina: el voluntario recuerda una vez que tuvo poder ──────────────────────────────────────────────
const RECALL = @recall@, HELD = @held@, POW2 = @power2@, OTHERS = @others@;
const cabina = () => horno('cabina', () => {
  // las paredes de espuma acústica en cuña (textura en pirámides) y el techo
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const cx = x % 10, cy = y % 10, cu = ((x / 10 | 0) + (y / 10 | 0)) % 2; const v = cu ? (cx < cy ? 1.6 : 2.6) - (cx + cy > 9 ? 0.6 : 0) : (cy < 5 ? 2.4 : 1.4);
    R.pset(x, y, rmp(pal(['#1e2230', '#2a3040', '#363e52', '#444c62']), v - y / 200 + (h2(x, y, 4) - 0.5) * 0.3, x, y)); }
  caja(0, 0, 319, 8, H('#4a4e5a')); for (let x = 20; x < 320; x += 60) { caja(x, 2, x + 24, 6, H('#e8f0f0')); R.linea(x, 7, x + 24, 7, K); }
  // el cristal grande de la sala de control (lo de dentro se pinta vivo)
  caja(186, 30, 300, 104, K); caja(187, 31, 299, 103, H('#8a8e98')); caja(190, 34, 296, 100, K);
  // el suelo de moqueta
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#2a2a3a', '#3a3a4e', '#4a4a62']), 1.3 + h2(x, y, 7) * 0.9 - (y - 150) / 80, x, y));
  R.linea(0, 150, 319, 150, K);
  // el sillón del voluntario, de lado
  caja(52, 116, 64, 160, K); for (let y = 117; y < 160; y++) for (let x = 53; x < 64; x++) R.pset(x, y, rmp(pal(['#4a1a1a', '#6a2a2a', '#8a3a3a']), 1.4 + Math.sin(y * 0.5) * 0.4, x, y));
  caja(52, 146, 104, 156, K); for (let y = 147; y < 156; y++) for (let x = 53; x < 104; x++) R.pset(x, y, rmp(pal(['#4a1a1a', '#6a2a2a', '#8a3a3a']), 1.8 - (y - 147) / 6, x, y));
  for (const x of [58, 98]) { caja(x, 156, x + 2, 166, K); R.linea(x + 1, 156, x + 1, 165, H('#8a8e98')); }
  // la mesita con el monitor y la lámpara
  caja(120, 132, 176, 136, K); caja(121, 133, 175, 135, H('#6a5a4a')); for (const x of [124, 170]) caja(x, 137, x + 2, 164, K);
  caja(130, 108, 166, 132, K); caja(131, 109, 165, 131, H('#2a2e36')); caja(134, 112, 162, 128, K);
  // los paneles acústicos de tela, enmarcados y con su sombra en la espuma: arriba a la izquierda, sobre el sillón y bajo el cristal
  const panel = (x0, y0, x1, y1, tono) => { for (let y = y0 + 2; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) tiñe(x, y, K, 0.45);
    caja(x0, y0, x1, y1, K); for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, rmp(pal(tono), 1.5 + (x - x0) / (x1 - x0) * -0.6 + (y - y0) / (y1 - y0) * -0.4 + ((x + y) % 3 === 0 ? 0.5 : 0) + (h2(x, y, 9) - 0.5) * 0.5, x, y));
    R.linea(x0 + 1, y0 + 1, x1 - 1, y0 + 1, mez(H(tono[2]), H('#ffffff'), 0.3)); R.linea(x0 + 1, y1 - 1, x1 - 1, y1 - 1, H(tono[0]));
    for (const [x, y] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) R.pset(x, y, H('#c8ccd4')); };
  panel(6, 14, 46, 58, ['#3a2a40', '#4e3a56', '#634a6c']); panel(54, 16, 98, 44, ['#28384a', '#36485e', '#465a72']);
  panel(120, 52, 160, 92, ['#3a2a40', '#4e3a56', '#634a6c']); panel(196, 112, 236, 140, ['#28384a', '#36485e', '#465a72']); panel(250, 112, 290, 140, ['#3a2a40', '#4e3a56', '#634a6c']);
  // el altavoz de pie, en el rincón de la izquierda, con sus conos y sus patas en la moqueta
  caja(10, 98, 34, 150, K); for (let y = 99; y < 150; y++) for (let x = 11; x < 34; x++) R.pset(x, y, rmp(pal(['#1a1a20', '#26262e', '#34343e']), 1.4 - (x - 11) / 30 + (y - 99) / -120, x, y));
  R.linea(11, 99, 33, 99, H('#4a4a56')); for (const [cy, r] of [[110, 5], [130, 8]]) { R.disco(22, cy, r + 1, K); R.disco(22, cy, r, H('#2e2e36')); R.disco(22, cy, r - 2, H('#3e3e48')); R.disco(22, cy, 2, H('#14141a')); R.pset(20, cy - r + 2, H('#7a7a88')); }
  caja(12, 150, 14, 153, K); caja(30, 150, 32, 153, K);
  // la cámara en su brazo, sobre el cristal, que apunta al voluntario (el piloto rojo parpadea en el plano)
  caja(196, 8, 197, 16, K); caja(188, 15, 206, 24, K); caja(189, 16, 205, 23, H('#3a3e48')); R.linea(189, 16, 205, 16, H('#6a7080')); caja(182, 17, 188, 22, K); R.disco(183, 19, 2.5, H('#1a2a3a')); R.pset(182, 18, H('#8ab0d0'));
  // el enchufe de la pared, abajo a la derecha, y el cable que va por el suelo desde la pata de la mesita
  caja(300, 138, 310, 148, K); caja(301, 139, 309, 147, H('#d8dcd4')); R.pset(304, 142, K); R.pset(306, 142, K); R.pset(305, 145, K);
  for (let x = 172; x < 306; x++) { const y = ri(170 + Math.sin(x * 0.07) * 3 + (x > 260 ? -(x - 260) * 0.1 : 0)); R.pset(x, y, K); R.pset(x, y - 1, H('#4a4a5a')); }
  R.linea(305, 146, 305, 166, K); R.linea(304, 146, 304, 166, H('#4a4a5a')); R.linea(172, 137, 172, 170, H('#1a1a22'));
  for (let x = 20; x < 120; x++) { const y = ri(176 + Math.sin(x * 0.11) * 2); R.pset(x, y, K); R.pset(x, y - 1, H('#5a3a3a')); }
  // la alfombrilla bajo el sillón, con su franja y sus flecos
  for (let y = 158; y < 172; y++) for (let x = 36; x < 120; x++) { const bor = y < 160 || y > 169 || x < 39 || x > 116; R.pset(x, y, rmp(pal(bor ? ['#6a2a22', '#8a3a2a', '#a84a32'] : ['#8a6a3a', '#a8844a', '#c8a060']), 1.3 + (((x >> 2) + (y >> 1)) % 2 ? 0.4 : -0.2) + (h2(x, y, 5) - 0.5) * 0.5, x, y)); }
  for (let x = 37; x < 120; x += 2) { R.pset(x, 157, H('#d8c8a0')); R.pset(x, 172, H('#d8c8a0')); }
  // la papelera de rejilla junto a la mesita, con un papel arrugado dentro
  caja(182, 151, 196, 167, K); for (let y = 152; y < 167; y++) for (let x = 183; x < 196; x++) R.pset(x, y, (x + y) % 3 === 0 ? H('#5a5e68') : H('#2a2c34')); R.disco(189, 151, 3, K); R.disco(189, 151, 2, H('#e8e4d8')); R.linea(182, 151, 196, 151, H('#8a8e98'));
  // la luz de techo sobre el voluntario: la campana colgada y el cono de luz que cae sobre él y hace un charco en la alfombrilla
  R.linea(81, 8, 81, 13, K); R.poligono([[73, 19], [76, 13], [86, 13], [89, 19]], K); R.poligono([[75, 18], [77, 14], [85, 14], [87, 18]], H('#5a5e68')); R.linea(76, 19, 86, 19, H('#fff4d0'));
  for (let y = 20; y < 158; y++) { const hw = 6 + (y - 20) * 0.24; for (let x = ri(81 - hw); x <= ri(81 + hw); x++) { const e = 1 - Math.abs(x - 81) / hw; tiñe(x, y, H('#fff0c8'), 0.16 * Math.min(1, e * 3) * (b4(x, y) < 0.8 ? 1 : 0.4)); } }
  for (let j = -6; j <= 6; j++) for (let i = -40; i <= 40; i++) if (i * i / 1600 + j * j / 36 < 1) tiñe(81 + i, 164 + j, H('#fff0c8'), 0.22 * (1 - i * i / 1600 - j * j / 36));
});
const p7 = (t) => {
  R.copiar(cabina());
  // la sala de control al otro lado del cristal: los dos psicólogos miran y anotan; luces de los aparatos
  R.recorte([191, 35, 295, 99]);
  for (let y = 35; y <= 99; y++) for (let x = 191; x <= 295; x++) R.pset(x, y, rmp(pal(['#2a3a3a', '#3a4a48', '#4a5a56']), 1.4 + (y > 80 ? -0.6 : 0) + (h2(x >> 2, y >> 2, 3) - 0.5) * 0.4, x, y));
  caja(191, 82, 295, 99, H('#3a4246')); R.linea(191, 82, 295, 82, H('#8a9298'));
  for (let k = 0; k < 8; k++) if (Math.sin(t * (2 + k * 0.7) + k) > 0) R.pset(200 + k * 11, 88, [H('#5ad87a'), H('#e8483a'), H('#ffd34a')][k % 3]);
  R.actor(EL.investigadora, 222, 96, t, { dir: -1, sostiene: true, sonrisa: t > OTHERS });
  R.actor(EL.cientifico, 262, 96, t, { dir: -1, dedo: t > HELD && t < HELD + 1, sorpresa: t > POW2 && t < POW2 + 0.6 });
  R.recorte(null);
  for (let x = 191; x < 296; x += 3) if (((x + ri(t * 3)) % 40) < 8) tiñe(x + ((x * 7) % 5), 40 + (x % 50), H('#ffffff'), 0.25);
  // la pantalla de la mesita y la lámpara
  for (let y = 113; y < 128; y++) for (let x = 135; x < 162; x++) R.pset(x, y, y % 2 ? H('#1a3a4a') : H('#22485a'));
  R.disco(148, 120, 4, H('#e8a0a8')); if (Math.floor(t * 3) % 2) R.pset(146, 118, H('#ffffff'));
  // el vaso de agua en la mesita, junto al monitor
  caja(167, 124, 173, 132, K); caja(168, 125, 172, 131, H('#c8dce8')); caja(168, 127, 172, 131, H('#6a9ac8')); R.linea(168, 127, 172, 127, H('#a8d0f0')); R.pset(168, 125, H('#ffffff'));
  // el voluntario, con los cascos y el gorro, cierra los ojos y recuerda
  const vr = R.actor(EL.voluntario, 80, 152, t, { dir: 1, sonrisa: t > HELD, triste: false, habla: false });
  R.disco(80, 128, 5.5, K); R.disco(80, 128, 4.5, H('#e8e0d0')); for (let a = 0; a < 7; a++) R.pset(ri(80 + Math.cos(-0.3 - a * 0.42) * 4), ri(128 + Math.sin(-0.3 - a * 0.42) * 4), [H('#e8483a'), H('#3a6ab0'), H('#ffd34a')][a % 3]);
  for (let i = 0; i <= 14; i++) { const u = i / 14; R.pset(ri(lerp(84, 134, u)), ri(lerp(128, 130, u) + Math.sin(u * Math.PI) * 14), H('#c83a3a')); }
  // EL RECUERDO: la nube de pensamiento crece en «recall»; dentro, él en una tarima y los demás que se inclinan en «others»
  const nu = pop(t, RECALL - 0.1, 0.4);
  if (nu > 0) { for (const [x, y, r] of [[88, 114, 2], [95, 106, 3]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#f4f6fa')); }
    // la nube, a la izquierda del cristal: aun con el rebote del pop no pasa de x 185 ni tapa a los psicólogos
    const cx = 110, cy = 60, w = 64 * nu, hh = 34 * nu;
    for (const [dx, dy, r] of [[-0.7, 0.1, 0.42], [-0.35, -0.45, 0.5], [0.15, -0.55, 0.52], [0.6, -0.25, 0.46], [0.75, 0.3, 0.4], [0.3, 0.55, 0.45], [-0.25, 0.55, 0.45], [0, 0, 0.7]]) R.disco(cx + dx * w, cy + dy * hh, r * hh * 1.2 + 1, K);
    for (const [dx, dy, r] of [[-0.7, 0.1, 0.42], [-0.35, -0.45, 0.5], [0.15, -0.55, 0.52], [0.6, -0.25, 0.46], [0.75, 0.3, 0.4], [0.3, 0.55, 0.45], [-0.25, 0.55, 0.45], [0, 0, 0.7]]) R.disco(cx + dx * w, cy + dy * hh, r * hh * 1.2, (x, y) => (y > cy + hh * 0.2 && b4(x, y) < 0.4 ? H('#d4dae6') : H('#f4f6fa')));
    if (nu >= 1) { R.recorte([ri(cx - w * 0.85), ri(cy - hh * 0.85), ri(cx + w * 0.85), ri(cy + hh * 0.9)]);
      // la tarima y él arriba, que señala; los otros se inclinan
      const alto = tramo(t, HELD, HELD + 0.5), ta = cy + 20 - ri(alto * 6), tx = cx - 21; caja(tx - 13, ta, tx + 13, cy + 28, K); caja(tx - 12, ta + 1, tx + 12, cy + 28, H('#b88a3a')); R.linea(tx - 12, ta + 1, tx + 12, ta + 1, H('#e8c060'));
      R.actor(EL.voluntario, tx, ta, t, { dir: 1, dedo: t > POW2, sonrisa: t > HELD, brazos: false });
      if (t > POW2) R.icono('corona', tx - 3, ta - 34 + flota(t), H('#ffd34a'), K);
      const incl = tramo(t, OTHERS - 0.2, OTHERS + 0.3);
      for (const [x, k] of [[cx + 6, 0], [cx + 22, 1], [cx + 38, 2]]) R.actor([EL.publico, EL.publica, EL.oficinista][k], x, cy + 28 + ri(incl * 3), t, { dir: -1, triste: incl > 0.5, sorpresa: incl > 0 && incl < 0.5 });
      R.recorte(null); } }
  // el piloto rojo de la cámara y el brillo del agua del vaso
  R.pset(203, 18, Math.floor(t * 2) % 2 ? H('#ff4a3a') : H('#6a1a1a')); if (Math.floor(t * 2) % 2) R.pset(203, 17, H('#ffb0a0'));
  R.pset(t % 2 < 1 ? 169 : 170, 126, H('#ffffff'));
  lucie(234 + Math.sin(t * 0.9) * 5, 120 + flota(t), t, { dir: -1, cara: t > OTHERS ? 'sorpresa' : 'normal', brillo: 0.7 });
};

// ── 8 · la mesa del estudio: la mano de la pantalla aprieta la pelota; Atom aprieta la suya y se le escapa ───────
const WATCH = @watched@, SQZ = @squeeze@, BALL = @ball@, BRAINS = @brains@, MIRR = @mirrored@, LESS = @less@;
const p8 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa', sin: ['cerebro'] }; T.estudio(R, t, o);
  // el monitor viejo sobre la mesa
  caja(112, 64, 188, 128, K); for (let y = 65; y < 128; y++) for (let x = 113; x < 188; x++) R.pset(x, y, rmp(pal(['#8a8478', '#a8a294', '#c4beae']), 1.6 + (x < 116 ? 0.6 : x > 184 ? -0.6 : 0) + (y > 124 ? -0.8 : 0), x, y));
  caja(118, 70, 182, 118, K); caja(140, 128, 160, 132, K); caja(141, 128, 159, 131, H('#8a8478')); caja(132, 132, 168, 135, K); caja(133, 132, 167, 134, H('#a8a294'));
  for (let k = 0; k < 3; k++) R.disco(124 + k * 8, 123, 1.5, k === 0 ? H('#5ad87a') : H('#3a3e46'));
  // en la pantalla: la mano que aprieta la pelota (en «squeeze»)
  for (let y = 71; y < 118; y++) for (let x = 119; x < 182; x++) R.pset(x, y, rmp(pal(['#1a2e3a', '#22404e', '#2e5262']), 1.2 + (y % 2 ? -0.4 : 0.3) - Math.hypot(x - 150, y - 94) / 60, x, y));
  const ap = t > SQZ && t < SQZ + 0.5 ? 1 : (t > SQZ + 1.4 && t < SQZ + 1.9) ? 1 : 0;
  for (let j = -8; j <= 8; j++) for (let i = -9; i <= 9; i++) { const ex = i / (ap ? 9 : 7.5), ey = j / (ap ? 5.5 : 7.5), d = ex * ex + ey * ey; if (d < 1.25 && d >= 1) R.pset(160 + i, 92 + j, K); if (d < 1) R.pset(160 + i, 92 + j, rmp(pal(['#8a1a1a', '#c83a3a', '#f07060']), 2 - (i + j) / 8, 160 + i, 92 + j)); }
  T.brazo(R, 118, 122, 142, 96, '#3a5a8a', 1, { codo: [126, 110], sombra: false });
  if (ap) for (const [a, b] of [[146, 80], [170, 82], [172, 104]]) R.linea(a, b, a + (a > 158 ? 3 : -3), b - 3, H('#ffffff'));
  for (let y = 71; y < 118; y += 2) for (let x = 119; x < 182; x++) if (b4(x, y) < 0.15) tiñe(x, y, K, 0.3);
  // el cerebro de juguete: chispas de espejo que se encienden en «mirrored» y se apagan en «less»
  c_cerebro(R, 44, 100, 2, 0, true);
  const ch = t > MIRR && t < LESS + 1.6 ? (t < LESS ? 1 : 1 - tramo(t, LESS, LESS + 1.2) * 0.8) : 0;
  for (let k = 0; k < 12; k++) if (h2(k, Math.floor(t * 6), 4) < ch) { const x = ri(30 + h2(k, 1, 5) * 30), y = ri(90 + h2(k, 2, 5) * 16); R.pset(x, y, H('#ffffff')); R.pset(x + 1, y, H('#fff0a0')); R.pset(x, y + 1, H('#fff0a0')); }
  // Atom, al doble sobre la mesa: aprieta su pelota en «squeeze» y se le escapa botando (GAG)
  const suelta = SQZ + 0.35, b = (t - suelta);
  const r = atomG(206, 146, t, { s: 2, dir: -1, pose: b < 0 ? 'sostiene' : b < 1.2 ? 'brazos' : 'senala', cara: b < 0 ? (t > SQZ ? 'guino' : 'sonrisa') : b < 1.4 ? 'sorpresa' : t > LESS ? 'triste' : 'normal', habla: voz(t) });
  if (b < 0) { const sq = t > SQZ; for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) { const ex = i / (sq ? 6 : 4.5), ey = j / (sq ? 3 : 4.5); if (ex * ex + ey * ey < 1) R.pset(ri(r.mano[0] - 3) + i, ri(r.mano[1] - 4) + j, (ex * ex + ey * ey > 0.7) ? K : rmp(pal(['#2a6a3a', '#3a9a4a', '#7ad07a']), 2 - (i + j) / 5, i, j)); } }
  else if (b < 2.4) { const x = r.mano[0] - 3 + b * 70, bote = Math.abs(Math.sin(b * 5.5)) * 34 * Math.max(0.2, 1 - b / 2.4), y = 140 - bote;
    if (x < 330) { R.disco(x, y, 5, K); R.disco(x, y, 4, (xx, yy) => rmp(pal(['#2a6a3a', '#3a9a4a', '#7ad07a']), 2.2 - (xx - x + yy - y) / 4, xx, yy)); R.disco(x, 146, 3, mez(H('#5a3a22'), K, 0.4)); } }
};

// ── 9 · la consola: el poder baja el volumen de la empatía ─────────────────────────────────────────────────────
const PWL = @powerless@, ASIF = @asif@, TURN = @turned@, DOWN = @down@, VOL = @volume@, EMP = @empathy@;
const consola = () => horno('consola', () => {
  // la pared del laboratorio: bandeja de cables, panel de agujeros, estante con archivadores, póster del cerebro y reloj
  for (let y = 0; y < 80; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#3a4048', '#4a5058', '#5a6068']), 1.5 + (h2(x >> 2, y >> 2, 8) - 0.5) * 0.5 - y / 200, x, y));
  caja(0, 14, 270, 18, K); caja(0, 15, 270, 17, H('#8a9098')); for (let x = 4; x < 270; x += 12) R.linea(x, 15, x, 17, H('#6a7078'));
  for (const [y, c] of [[19, '#c83a3a'], [20, '#3a6ab0'], [21, '#e8c040']]) for (let x = 0; x < 270; x++) R.pset(x, y + ri(Math.sin(x * 0.07 + y) * 1.2), H(c));
  caja(10, 28, 70, 74, K); caja(11, 29, 69, 73, H('#c8ccd0')); for (let y = 32; y < 72; y += 4) for (let x = 14; x < 68; x += 4) R.pset(x, y, H('#6a7078'));
  for (const [x, c] of [[24, '#c83a3a'], [36, '#3a6ab0'], [52, '#e8c040']]) { R.linea(x, 32, x + 6, 52, H(c)); R.linea(x + 6, 52, x - 2, 72, H(c)); }
  caja(84, 54, 176, 57, K); caja(85, 55, 175, 56, MAD[3]); for (let k = 0; k < 11; k++) { const x = 88 + k * 8, c = [H('#3a6ab0'), H('#c83a3a'), H('#3a8a5a'), H('#e8c040')][k % 4]; caja(x, 36 + (k % 3), x + 6, 54, K); caja(x + 1, 37 + (k % 3), x + 5, 53, c); caja(x + 2, 44, x + 4, 47, H('#f0ece0')); }
  caja(196, 26, 246, 70, K); caja(197, 27, 245, 69, H('#f0ece0')); R.disco(220, 46, 13, H('#e8a0a8')); R.disco(224, 48, 9, H('#d88890'));
  for (let k = 0; k < 6; k++) R.linea(212 + k * 3, 38, 210 + k * 3, 56, H('#c87078')); R.disco(230, 54, 5, H('#c87078'));
  R.disco(150, 30, 9, K); R.disco(150, 30, 8, H('#f4f0e6')); for (let a = 0; a < 12; a++) R.pset(ri(150 + Math.cos(a * Math.PI / 6) * 6), ri(30 + Math.sin(a * Math.PI / 6) * 6), K);
  // la consola grande, de frente
  caja(0, 78, 319, 179, K);
  for (let y = 79; y < 180; y++) for (let x = 1; x < 319; x++) R.pset(x, y, rmp(pal(['#3a3430', '#4e4640', '#625a52', '#786e64']), 2.2 - (y - 79) / 120 + (y < 84 ? 1 : 0) + (x < 4 || x > 315 ? -1 : 0), x, y));
  R.linea(1, 84, 318, 84, H('#8a8070')); for (const x of [6, 312]) for (const y of [90, 172]) { R.disco(x, y, 2, K); R.pset(x, y, H('#a89a88')); }
  // dos pantallas de osciloscopio con su marco
  for (const x0 of [14, 112]) { caja(x0, 92, x0 + 88, 144, K); caja(x0 + 1, 93, x0 + 87, 143, H('#2a2622')); caja(x0 + 4, 96, x0 + 84, 140, K); }
  // el gran botón del volumen con su escala, y el vúmetro encima
  for (let a = 0; a < 11; a++) { const p = Math.PI * (0.8 + a * 0.14), r = 30; R.linea(ri(258 + Math.cos(p) * r), ri(134 + Math.sin(p) * r), ri(258 + Math.cos(p) * (r + 4)), ri(134 + Math.sin(p) * (r + 4)), a > 7 ? H('#e8483a') : H('#d8d0c0')); }
  caja(224, 88, 292, 106, K); caja(225, 89, 291, 105, H('#f0e8c8')); for (let a = 0; a < 9; a++) { const p = Math.PI * (1.2 + a * 0.075); R.pset(ri(258 + Math.cos(p) * 18), ri(108 + Math.sin(p) * 18), a > 6 ? H('#c83a3a') : K); }
  // la regleta de los faders y los LED
  caja(16, 164, 200, 166, H('#2a2622')); for (let k = 0; k < 8; k++) caja(24 + k * 24, 150, 26 + k * 24, 172, K);
  // la taza de café en el borde de la consola
  caja(296, 62, 310, 79, K); caja(297, 63, 309, 78, H('#e8e4dc')); R.disco(312, 70, 4, K); R.disco(312, 70, 2.5, H('#e8e4dc')); R.linea(297, 63, 309, 63, H('#5a3a22'));
});
const p9 = (t) => {
  R.copiar(consola());
  { const a = t * 0.5; R.linea(150, 30, 150 + ri(Math.cos(a) * 6), 30 + ri(Math.sin(a) * 6), K); R.linea(150, 30, 150 + ri(Math.cos(a / 12) * 4), 30 + ri(Math.sin(a / 12) * 4), K); }
  // la onda de cada pantalla: la de «sin poder» grande y viva; la de «con poder» pequeña
  const gira = tramo(t, TURN, DOWN + 0.3);
  for (const [x0, k] of [[18, 0], [116, 1]]) { const a = k === 0 ? 4 + tramo(t, PWL - 0.3, PWL + 0.4) * 12 : 3.2 - gira * 2;
    for (let y = 97; y < 140; y++) for (let x = x0 + 1; x < x0 + 81; x++) R.pset(x, y, (x - x0) % 10 === 0 || (y - 97) % 9 === 0 ? H('#1e3a2a') : H('#0e2016'));
    let py = 118; for (let x = x0 + 1; x < x0 + 81; x++) { const y = ri(118 + Math.sin(x * 0.28 - t * 8 + k) * a + Math.sin(x * 0.7 + t * 3) * a * 0.25); R.linea(x - 1, py, x, y, H('#7af0a0')); R.pset(x, y - 1, H('#2a8a4a')); py = y; }
    // el icono de cada pantalla: una persona sin corona y otra con corona
    const ix = x0 + 8; R.disco(ix, 103, 2, H('#d8d0c0')); R.poligono([[ix - 4, 112], [ix - 3, 106], [ix + 3, 106], [ix + 4, 112]], H('#d8d0c0')); if (k) R.icono('corona', ix - 2, 95, H('#ffd34a'), K); }
  const ang = Math.PI * (1.85 - gira * 0.9);
  R.disco(258, 134, 22, K); R.disco(258, 134, 21, (x, y) => rmp(pal(['#2a2622', '#4a4440', '#6a625a', '#8a8278']), 2.4 - (x - 258 + y - 134) / 24, x, y)); R.disco(258, 134, 15, K); R.disco(258, 134, 14, (x, y) => rmp(pal(['#5a524a', '#7a7268', '#9a9288', '#bab2a6']), 2.2 - (x - 258 + y - 134) / 18, x, y));
  R.linea(258, 134, ri(258 + Math.cos(ang) * 13), ri(134 + Math.sin(ang) * 13), K); R.linea(259, 134, ri(259 + Math.cos(ang) * 13), ri(134 + Math.sin(ang) * 13), K);
  // el corazón del centro del botón: rojo vivo; se apaga a gris en «empathy»
  const gris = tramo(t, VOL, EMP + 0.3), cor = mez(H('#e8483a'), H('#6a625a'), gris);
  R.disco(255, 132, 3, cor); R.disco(261, 132, 3, cor); R.poligono([[252, 133], [264, 133], [258, 140]], cor); R.pset(254, 131, mez(H('#ffffff'), cor, gris));
  // la aguja del vúmetro, que cae con el volumen
  const va = Math.PI * (1.2 + (0.6 - gira * 0.5) * (0.92 + Math.sin(t * 13) * 0.04 * (1 - gira)));
  R.linea(258, 108, ri(258 + Math.cos(va) * 17), ri(108 + Math.sin(va) * 17), H('#c83a3a'));
  // la mano llega en «as if power» desde el borde de la derecha, con el puño de oro, y gira el botón
  const ll = tramo(t, ASIF - 0.4, TURN - 0.05), sal = tramo(t, EMP + 0.3, EMP + 0.9), mxp = lerp(lerp(340, 280, ll), 340, sal), myp = 138 + ri(gira * 3);
  if (ll > 0 && sal < 1) T.brazo(R, 334, 172, ri(mxp), myp, '#2a2a3a', -1, { codo: [ri(mxp + 26), 162], puno: '#e8c040' });
  // los faders que suben y bajan, y los LED que bailan (se apagan los rojos al bajar el volumen)
  for (let k = 0; k < 8; k++) { const x = 25 + k * 24, y = ri(156 + Math.sin(t * 0.8 + k) * 4 + gira * 5); caja(x - 4, y, x + 4, y + 4, K); caja(x - 3, y + 1, x + 3, y + 3, H('#d8d0c0')); }
  for (let k = 0; k < 10; k++) { const on = Math.sin(t * (4 + k) + k) > (k > 6 ? 0.2 + gira * 0.7 : -0.2); R.disco(212 + k * 9, 172, 1.4, on ? (k > 7 ? H('#e8483a') : k > 4 ? H('#ffd34a') : H('#5ad87a')) : H('#2a2622')); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1; tiñe(303 + Math.sin(u * 6 + k) * 2, 60 - u * 16, H('#e8e8f0'), 0.6 * (1 - u)); }
  lucie(186 + Math.sin(t * 0.9) * 6, 52 + flota(t), t, { dir: 1, cara: t > TURN ? 'triste' : 'normal', brillo: 0.7 });
};

// ── 10 · el teatrillo: Paul no es el tirano de los cuentos ─────────────────────────────────────────────────────
const HERB = @herbert@, STEP = @step@, PAUL = @paul@, STORY = @storybook@, TYR = @tyrant@, DOESNT = @doesnt@, HARM = @harm@;
const teatro = () => horno('teatro', () => {
  // la sala a oscuras: pared de ladrillo, y el suelo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const by = y >> 3, bx = (x + (by % 2) * 8) >> 4, j = y % 8 === 0 || (x + (by % 2) * 8) % 16 === 0;
    R.pset(x, y, j ? H('#140c10') : rmp(pal(['#1e1218', '#2a1820', '#3a2028', '#4a2a30']), 1.6 + (h2(bx, by, 2) - 0.5) * 0.9 - Math.abs(x - 160) / 260, x, y)); }
  // el teatrillo de madera pintada: frontón con estrellas y lunas, columnitas y el faldón a rayas
  caja(64, 26, 256, 158, K);
  for (let y = 27; y < 52; y++) for (let x = 65; x < 256; x++) R.pset(x, y, rmp(pal(['#4a1a3a', '#6a2a5a', '#8a3a7a']), 1.5 + Math.sin(x * 0.05) * 0.3 - (y - 27) / 40, x, y));
  R.poligono([[64, 30], [160, 12], [256, 30]], K); R.poligono([[68, 29], [160, 14], [252, 29]], H('#8a3a7a')); R.linea(68, 29, 160, 14, ORO[4]); R.linea(160, 14, 252, 29, ORO[3]);
  for (let k = 0; k < 9; k++) { const x = 84 + k * 19, y = 34 + (k % 2) * 6; if (k % 3 === 1) { R.disco(x, y, 3, ORO[4]); R.disco(x + 1, y - 1, 2.5, H('#6a2a5a')); } else { R.pset(x, y, ORO[5]); R.pset(x - 1, y, ORO[3]); R.pset(x + 1, y, ORO[3]); R.pset(x, y - 1, ORO[3]); R.pset(x, y + 1, ORO[3]); } }
  caja(65, 49, 255, 52, ORO[2]); R.linea(65, 49, 255, 49, ORO[4]);
  for (const x0 of [65, 228]) for (let y = 52; y < 120; y++) for (let x = x0; x < x0 + 27; x++) R.pset(x, y, rmp(pal(['#2a1608', '#4a2a12', '#6a3e1c', '#8a5428']), 2 + Math.sin((x - x0) * 0.4) * 0.8, x, y));
  for (let y = 120; y < 158; y++) for (let x = 65; x < 256; x++) R.pset(x, y, ((x - 65) >> 3) % 2 ? H('#c83a3a') : H('#f0d890'));
  caja(65, 120, 255, 123, ORO[2]); R.linea(65, 120, 255, 120, ORO[4]); R.linea(65, 124, 255, 124, K);
  for (let x = 65; x < 256; x += 6) { R.disco(x + 3, 158, 3, K); R.disco(x + 3, 158, 2, ORO[3]); }
  // el telón de fondo pintado: un castillo de cartón bajo un cielo de estrellas
  for (let y = 53; y < 119; y++) for (let x = 92; x < 228; x++) R.pset(x, y, rmp(pal(['#1a2a5a', '#24387a', '#30489a', '#4a62b0']), 1 + (y - 53) / 30 + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 18; k++) R.pset(ri(94 + h2(k, 1, 9) * 132), ri(55 + h2(k, 2, 9) * 30), H('#fff0b0'));
  R.disco(204, 66, 6, H('#f8f0c8')); R.disco(207, 64, 5, H('#30489a'));
  for (const [x0, x1, y0] of [[112, 132, 74], [136, 176, 86], [180, 196, 78]]) { caja(x0, y0, x1, 112, K); caja(x0 + 1, y0 + 1, x1 - 1, 112, H('#8a8aa0')); for (let x = x0; x < x1; x += 6) caja(x, y0 - 4, x + 3, y0, K);
    for (let x = x0 + 1; x < x1; x += 6) caja(x, y0 - 3, x + 1, y0, H('#8a8aa0')); caja(((x0 + x1) >> 1) - 2, y0 + 8, ((x0 + x1) >> 1) + 2, y0 + 14, H('#f0c860')); }
  for (let y = 112; y < 119; y++) for (let x = 92; x < 228; x++) R.pset(x, y, rmp(pal(['#3a5a2a', '#4a7a32', '#5a8a3a']), 1 + h2(x, y, 4), x, y));
  for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#140c0c', '#22140e', '#321e14']), 1.2 + h2(x >> 3, y, 1) * 0.8, x, y));
  // dos farolillos de papel colgados a los lados de la sala
  for (const lx of [12, 266]) { R.linea(lx, 0, lx, 40, K); R.disco(lx, 48, 8, K); R.disco(lx, 48, 7, H('#e88a3a')); for (let y = 42; y < 56; y += 3) R.linea(lx - 6, y, lx + 6, y, H('#c8602a')); }
});
const p10 = (t) => {
  R.copiar(teatro());
  for (const lx of [12, 266]) luz(lx, 50, 26, H('#ffb060'), 0.22 + Math.sin(t * 7 + lx) * 0.03);
  // el telón rojo de terciopelo, recogido a los lados, que se mece
  for (const [x0, d] of [[92, 1], [228, -1]]) for (let y = 53; y < 119; y++) { const w = 12 + ri(Math.sin((y - 53) / 66 * Math.PI) * 6), v = ri(Math.sin(t * 1.4 + y * 0.09) * 1); for (let i = 0; i < w; i++) { const x = d > 0 ? x0 + i + v : x0 - 1 - i + v; R.pset(x, y, i === w - 1 ? K : rmp(ROJO, 1.4 + Math.sin(i * 1.3) * 0.9, x, y)); } }
  // las candilejas que tiemblan
  for (let x = 96; x < 226; x += 10) { const f = Math.sin(t * 11 + x) > 0 ? 1 : 0; R.disco(x, 119, 1.5, f ? ORO[5] : ORO[4]); luz(x, 112, 9, H('#ffe8a0'), 0.2 + f * 0.08); }
  // el tirano de cuento: un títere colgado de sus hilos que baila amenazando; en «tyrant» los hilos lo suben y se lo llevan
  const sube = tramo(t, TYR, TYR + 0.9), tx = 138 + ri(Math.sin(t * 2.2) * 6), ty = 118 - ri(Math.abs(Math.sin(t * 4.4)) * 3) - ri(sube * 90);
  const bar = [tx, ty - 60];
  if (ty > 40) { R.recorte([92, 53, 227, 119]); R.actor(EL.reyCuento, tx, ty, t, { dir: 1, enfado: true, brazos: Math.floor(t * 2) % 2 === 0, bigote: true }); R.recorte(null); }
  if (ty > 40) for (const [dx, dy] of [[-6, -18], [6, -18], [-4, -4], [4, -4]]) R.linea(bar[0] + dx * 2, Math.max(0, bar[1]), tx + dx, Math.max(53, ty + dy), H('#c8c8d0'));
  if (bar[1] > 2) caja(bar[0] - 14, bar[1] - 2, bar[0] + 14, bar[1], K); if (bar[1] > 2) caja(bar[0] - 13, bar[1] - 1, bar[0] + 13, bar[1] - 1, MAD[4]); caja(bar[0] - 1, bar[1] - 10, bar[0] + 1, bar[1], MAD[3]);
  // Paul entra por la derecha en «Paul» (sin hilos), mira al tirano, y en «doesn't set out to do harm» se vuelve y niega
  const en1 = tramo(t, PAUL - 0.6, STORY), px = ri(lerp(232, 186, en1)), niega = t > DOESNT && t < HARM + 0.4;
  R.recorte([92, 0, 227, 119]);
  R.actor(PA.paulEmperador, px, 118, t, { dir: niega ? (Math.floor(t * 5) % 2 ? 1 : -1) : -1, anda: en1 > 0 && en1 < 1, triste: niega, brazos: t > HARM + 0.4, sorpresa: t > TYR && t < DOESNT });
  R.recorte(null);
  // el público infantil de primer término, de espaldas, que se mueve y señala
  for (let k = 0; k < 11; k++) { const x = 14 + k * 29 + (k % 2) * 4, y = 160 + (k % 3) * 4 + ri(Math.sin(t * 3 + k) * (t > TYR && t < TYR + 1 ? 2 : 0.6)), pe = PELO[k % 5], cam = [H('#3a6ab0'), H('#c84a3a'), H('#3a8a5a'), H('#e8b040')][k % 4];
    R.poligono([[x - 11, 180], [x - 9, y + 9], [x + 9, y + 9], [x + 11, 180]], K); R.poligono([[x - 10, 180], [x - 8, y + 10], [x + 8, y + 10], [x + 10, 180]], cam);
    R.disco(x, y, 8, K); R.disco(x, y, 7, (xx, yy) => rmp([mez(pe, K, 0.4), pe, mez(pe, H('#ffffff'), 0.2)], 1.6 - (yy - y) / 6 + (h2(xx, yy, k) - 0.5) * 0.6, xx, yy));
    if (k % 4 === 1 && t > PAUL && t < STORY + 1) { const ax = x + 6, ay = y - 2; R.linea(ax, ay + 10, ax + 6, ay - 8, K); R.linea(ax + 1, ay + 10, ax + 7, ay - 8, mez(H('#f0c09a'), K, 0.1)); } }
  lucie(46 + Math.sin(t * 0.8) * 6, 82 + flota(t), t, { dir: 1, cara: t > TYR ? 'sorpresa' : 'sonrisa', brillo: 0.8 });
};

// ── 11 · los escribas de noche: su nombre causa el desastre de todos modos ─────────────────────────────────────
const NAME = @name@, DIS = @disaster@, ANYW = @anyway@, WARN = @warning@;
const enArcoE = (x, y) => x >= 188 && x <= 284 && y <= 132 && (y >= 80 || Math.hypot(x - 236, y - 80) <= 48);
const escribas = () => horno('escribas', () => {
  // muro de sillares de arenisca a la luz de las lámparas
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const by = (y / 12) | 0, bx = ((x + (by % 2) * 14) / 28) | 0, j = y % 12 === 0 || (x + (by % 2) * 14) % 28 === 0;
    R.pset(x, y, j ? SILL[0] : rmp(SILL, 2.6 + (h2(bx, by, 4) - 0.5) * 1.1 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.6 - y / 160 - Math.max(0, x - 230) / 120, x, y)); }
  caja(0, 0, 319, 8, SILL[1]); R.linea(0, 8, 319, 8, SILL[4]); R.linea(0, 9, 319, 9, K);
  // el marco del ventanal en arco
  for (let y = 26; y < 136; y++) for (let x = 182; x < 290; x++) { const fuera = x >= 183 && x <= 289 && y <= 135 && (y >= 80 || Math.hypot(x - 236, y - 80) <= 53); if (fuera && !enArcoE(x, y)) R.pset(x, y, rmp(SILL, 4.4 + (x < 236 ? 0.6 : -0.6), x, y)); }
  caja(180, 133, 292, 137, SILL[5]); R.linea(180, 138, 292, 138, K);
  // el suelo de losas
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const j = (y - 140) % 10 === 0 || (x + ((y - 140) / 10 | 0) * 13) % 26 === 0; R.pset(x, y, j ? SILL[1] : rmp(SILL, 3.2 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.7 - (y - 140) / 100, x, y)); }
  R.linea(0, 140, 319, 140, K);
  // estantes de rollos en la pared de la izquierda
  for (const y of [40, 64, 88]) { caja(12, y, 116, y + 3, K); caja(13, y + 1, 115, y + 2, MAD[3]); for (let x = 16; x < 112; x += 7) { R.disco(x, y - 3, 3, K); R.disco(x, y - 3, 2, H('#e8dcb8')); R.pset(x, y - 3, H('#a8986a')); } }
});
const escribasMesa = () => { caja(14, 122, 168, 127, K); madera(15, 123, 167, 126, MAD, 3, 0, false, 4); R.linea(15, 123, 167, 123, MAD[4]);
  for (const x of [20, 160]) { caja(x, 128, x + 3, 152, K); caja(x + 1, 128, x + 2, 151, MAD[2]); }
  for (let k = 0; k < 4; k++) { const x = 26 + k * 8; caja(x, 116 - (k % 2) * 2, x + 6, 121, K); caja(x + 1, 117 - (k % 2) * 2, x + 5, 120, H('#e8dcb8')); R.disco(x + 3, 119 - (k % 2) * 2, 1.5, H('#a83030')); }
  caja(140, 116, 146, 121, K); caja(141, 117, 145, 120, H('#2a2a40')); };
const p11 = (t) => {
  R.copiar(escribas());
  // fuera: la noche sobre el llano y las ciudades lejanas; en «disaster» se encienden fuegos lejanos con su humo
  const N = enArcoE;
  for (let y = 32; y <= 132; y++) for (let x = 188; x <= 284; x++) if (N(x, y)) R.pset(x, y, y < 104 ? rmp(NOCHE, 2 + (y - 32) / 16 + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.4, x, y) : rmp(ARENA_N, 3 + (y - 104) / 10 + ns(x * 0.1, y * 0.4) * 0.8, x, y));
  for (let k = 0; k < 14; k++) { const x = ri(190 + h2(k, 1, 6) * 92), y = ri(40 + h2(k, 2, 6) * 50); if (N(x, y) && Math.sin(t * 2 + k) > -0.3) R.pset(x, y, H('#e8ecff')); }
  R.disco(262, 56, 5, H('#f0ecff')); R.disco(264, 55, 4, NOCHE[3]);
  for (let x = 190; x <= 282; x++) { const hh = 100 - ri(h2(x >> 2, 1, 5) * 6) - (x % 23 < 4 ? 4 : 0); for (let y = hh; y < 104; y++) R.pset(x, y, H('#0e0e1a')); if (h2(x, 3, 5) > 0.8) R.pset(x, hh + 2, H('#f0d080')); }
  const fuegos = [[204, 102], [224, 103], [250, 101], [270, 103], [240, 107]];
  fuegos.forEach(([x, y], k) => { const u = tramo(t, DIS + k * 0.35, DIS + k * 0.35 + 0.4); if (u <= 0) return; const f = 0.7 + Math.sin(t * 9 + k) * 0.3;
    luz(x, y, 11 * u, H('#f08a3a'), 0.6 * f); R.disco(x, y, 2 * u, H('#ffd070'));
    for (let j = 0; j < 16; j++) { const yy = y - 3 - j * 2, xx = x + ri(Math.sin(j * 0.6 + t * 1.5 + k) * (1 + j * 0.2)); if (N(xx, yy)) { tiñe(xx, yy, H('#4a4458'), 0.6 * u * (1 - j / 16)); tiñe(xx + 1, yy, H('#4a4458'), 0.4 * u * (1 - j / 16)); } } });
  // la celosía de rombos por delante del paisaje
  for (let y = 32; y <= 132; y++) for (let x = 188; x <= 284; x++) if (N(x, y) && (Math.abs(((x - 236) + (y - 80)) % 16) < 1 || Math.abs(((x - 236) - (y - 80)) % 16) < 1)) R.pset(x, y, SILL[3]);
  // las lámparas de aceite que cuelgan y tiemblan
  for (const lx of [12, 176]) { R.linea(lx, 10, lx, 34, K); caja(lx - 4, 34, lx + 4, 38, ORO[2]); const f = Math.sin(t * 13 + lx) > 0.3 ? 1 : 0; R.disco(lx, 32 - f, 2, ORO[5]); luz(lx, 44, 46, H('#ffd890'), 0.2 + f * 0.04); }
  // los dos escribas, tras la mesa, sellan pergaminos con el halcón de Paul, cada vez más deprisa desde «his name»
  const sellos = [];
  for (const [x, k] of [[56, 0], [104, 1]]) { const v = t > NAME ? 3.2 : 1.2, g = Math.sin(t * v * Math.PI + k * 1.7), baja = g > 0.6;
    const r = R.actor(PA.sacerdotePA, x, 136, t, { dir: 1, sostiene: [x + 12, baja ? 112 : 104], sorpresa: t > DIS + 0.4 && t < DIS + 1.4 });
    sellos.push([r.mano, baja, x]); }
  escribasMesa();
  for (const [m, baja, x] of sellos) { if (m) { caja(m[0] - 2, m[1] - 6, m[0] + 2, m[1], K); caja(m[0] - 1, m[1] - 5, m[0] + 1, m[1] - 1, MAD[3]); caja(m[0] - 3, m[1], m[0] + 3, m[1] + 2, ORO[3]); }
    if (t > NAME) { R.disco(x + 12, 121, 2.5, H('#c83a3a')); R.pset(x + 12, 120, ORO[4]); } }
  // un correo fremen recoge un rollo sellado y sale corriendo por la izquierda en «disaster»
  const co = tramo(t, DIS - 0.3, ANYW + 0.6), cx = ri(lerp(150, -20, co));
  if (co < 1) { const r = R.actor(PA.fremen, cx, 154, t, { dir: co > 0 ? -1 : 1, anda: co > 0, sostiene: true }); if (r.mano) { caja(r.mano[0] - 4, r.mano[1] - 2, r.mano[0] + 4, r.mano[1] + 1, K); caja(r.mano[0] - 3, r.mano[1] - 1, r.mano[0] + 3, r.mano[1], H('#e8dcb8')); R.pset(r.mano[0], r.mano[1], H('#c83a3a')); } }
  // Paul junto al ventanal: se vuelve a mirar los fuegos en «disaster»; en «warning», triste, la mano en alto
  R.actor(PA.paulEmperador, 212, 160, t, { dir: t > DIS + 0.2 ? 1 : -1, sorpresa: t > DIS + 0.2 && t < ANYW + 0.6, triste: t > ANYW + 0.6, dedo: t > WARN });
  lucie(176 + Math.sin(t * 0.9) * 5, 96 + flota(t), t, { dir: 1, cara: t > DIS ? 'triste' : 'normal', brillo: 0.8 });
  if (t > WARN) R.bocadillo(186, 80 + flota(t), { icono: '!' });
};

// ── 12 · los millones que dejan de pensar: la multitud de ojos cerrados detrás de Paul ─────────────────────────
const DANG = @danger@, LEADR = @leader@, MILL = @millions@, STOP = @stop@, BELI = @believe@, TFOR = @thinkfor@;
const CAL = pal(['#a8846a', '#bc9878', '#cead88', '#dec29a', '#ecd6b0', '#f6e6c8']);
const DUNA = pal(['#5a3a24', '#7a5032', '#9a6a40', '#b8844e', '#d0a060', '#e2b878', '#f0d098']);
// las cuatro crestas de dunas, de lejos (claras) a cerca: [y, amplitud, frecuencia, tono]; cresta(i, x) da su filo
const CRESTAS = [[50, 4, 0.05, 5], [72, 7, 0.035, 4], [102, 10, 0.025, 3], [136, 12, 0.02, 2]];
const cresta = (i, x) => CRESTAS[i][0] - CRESTAS[i][1] * Math.sin(x * CRESTAS[i][2] + i * 1.7);
const desiertoGente = () => horno('dgente', () => {
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(CAL, 1 + y / 50 * 4.2 + (h2(x >> 1, y >> 1, 8) - 0.5) * 0.5, x, y));
  R.disco(70, 22, 7, H('#fff4dc')); R.disco(70, 22, 5, H('#ffffff'));
  for (let x = 0; x < 320; x++) { const hh = 46 - ri(Math.max(0, Math.sin(x * 0.03 + 1) * 6) + h2(x >> 3, 1, 2) * 2); for (let y = hh; y < 62; y++) R.pset(x, y, rmp(pal(['#8a6a5a', '#9a7a66', '#ab8a74']), 1 + (y - hh) / 4, x, y)); }
  // cuatro filas de dunas, de lejos (claras) a cerca (más oscuras y grandes)
  const crestas = CRESTAS;
  for (let y = 46; y < 180; y++) for (let x = 0; x < 320; x++) { let k = -1; for (let i = 0; i < 4; i++) { const [y0, a, f] = crestas[i]; if (y >= y0 - a * Math.sin(x * f + i * 1.7)) k = i; }
    if (k < 0) continue; const [y0, a, f, base] = crestas[k], cy = y0 - a * Math.sin(x * f + k * 1.7), sl = Math.cos(x * f + k * 1.7);
    R.pset(x, y, Math.abs(y - cy) < 0.8 ? DUNA[6] : rmp(DUNA, base + 1.6 - (y - cy) / 40 + sl * 0.7 + (Math.sin(x * 0.4 + y * 1.3) > 0.85 ? -0.6 : 0), x, y)); }
});
const CAPAS = pal(['#3a4a6a', '#4a5a72', '#5a4a3a', '#3a3a4a', '#6a4a32', '#4a3a52', '#2e3e4e', '#7a6a52']);
// una cabeza de la multitud (de frente, ojos cerrados): el tamaño, el tono, la capucha o el velo salen de su número fijo
const cabezaGente = (X, Y, r, id) => { const s1 = h2(id, 7, 17), s2 = h2(id, 9, 19), cap = CAPAS[ri(s1 * 7.99) & 7], piel = PIEL[ri(h2(id, 3, 21) * 3.99) & 3];
  const rr = r + (s1 > 0.8 ? 1 : 0) - (s1 < 0.15 && r > 2 ? 1 : 0);
  R.disco(X, Y + rr + 1, rr + 1, K); R.disco(X, Y + rr + 1, rr, cap); R.pset(X - rr + 1, Y + rr, mez(cap, H('#ffffff'), 0.25));
  R.disco(X, Y, rr + 0.5, K);
  if (s2 < 0.22) { const pe = PELO[ri(h2(id, 5, 23) * 2.99) * 2 % 5]; R.disco(X, Y, rr, (x, y) => (y < Y - rr * 0.25 ? pe : piel)); }
  else { R.disco(X, Y, rr, cap); R.pset(X - 1, Y - rr + 1, mez(cap, H('#ffffff'), 0.3)); if (rr >= 3) R.disco(X, Y + 1, rr - 1, piel); else R.pset(X, Y + 1, piel); }
  if (rr >= 3) { const e = Math.max(1, rr - 3); R.linea(X - 1 - e, Y + 1, X - 1, Y + 1, K); R.linea(X + 1, Y + 1, X + 1 + e, Y + 1, K);
    if (s2 > 0.22 && s2 < 0.45) R.linea(X - rr + 2, Y + rr - 1, X + rr - 2, Y + rr - 1, H('#6a6a72')); }
  return rr; };
const p12 = (t) => {
  const fondo = desiertoGente(); R.copiar(fondo);
  nubes(t, [[20, 14, 40, 2, 1], [180, 30, 30, 3.5, 2], [100, 10, 24, 5, 3]], pal(['#c8a888', '#dcc0a0', '#f0dcc0']));
  pajaros(t, 176, 22, 270, 34, 2, 9, H('#5a3a2a'));
  // tapa(i, h): vuelve a pintar desde el búfer la arena de la cresta i (una franja de h px bajo su filo): tapa lo de detrás
  const tapa = (i, h) => { for (let x = 0; x < 320; x++) { const y0 = Math.max(0, Math.ceil(cresta(i, x))); for (let y = y0; y < Math.min(180, y0 + h); y++) R.pset(x, y, fondo[y * 320 + x]); } };
  // LA MULTITUD, LEJOS: filas de cabezas que asoman por detrás de las crestas 1 y 2 desde «millions» (la duna de delante les
  // tapa el cuerpo); cada una con su lucecita de pensar, que se apaga en «stop thinking». Nadie comparte el suelo de Paul.
  const capas = [[1, 2, -4, 0.5], [1, 2, 0, 0.4], [2, 3, -7, 0.2], [2, 3, -1, 0]];
  capas.forEach(([c, r, alto, ret], i) => { const sale = tramo(t, MILL - 0.4 + ret, MILL + 0.3 + ret); if (sale > 0) {
    const paso = r * 2 + 3 + (i & 1);
    for (let j = -1; j * paso < 330; j++) { const id = j * 31 + i * 977, X = ri(j * paso + (i & 1) * (paso >> 1) + (h2(id, 1, 5) - 0.5) * paso * 0.5 + Math.sin(t * 1.3 + id) * 0.6);
      const Y = ri(cresta(c, X)) - r - 1 + alto + ri(h2(id, 2, 5) * 2) + ri((1 - sale) * (r * 2 + 7)) + ri(Math.sin(t * 4 + id) * 0.5);
      const rr = cabezaGente(X, Y, r, id);
      if (id % 3 === 0 || h2(id, 4, 7) > 0.6) { const ap = tramo(t, STOP + h2(id, 6, 3) * 0.8, STOP + 0.3 + h2(id, 6, 3) * 0.8); if (ap < 1) { const ly = Y - rr - 3 - ri(ap * 3);
        R.pset(X, ly, mez(H('#fff0a0'), H('#8a7a60'), ap)); if (rr >= 3) { R.pset(X - 1, ly, mez(H('#ffd34a'), H('#8a7a60'), ap)); R.pset(X + 1, ly, mez(H('#ffd34a'), H('#8a7a60'), ap)); R.pset(X, ly - 1, mez(H('#ffd34a'), H('#8a7a60'), ap)); } } } } }
    if (i === 1) tapa(1, 16); if (i === 3) tapa(2, 22); });
  // las huellas de Paul en la arena de delante, desde la izquierda hasta donde va
  const px = ri(lerp(146, 170, tramo(t, P12, BELI))), vuelve = (t > LEADR && t < MILL + 0.8) || t > TFOR;
  for (let x = 96; x < px - 8; x += 7) { const y = 160 + ((x / 7) & 1) * 2; R.pset(x, y, DUNA[2]); R.pset(x + 1, y, DUNA[2]); R.pset(x, y - 1, DUNA[6]); }
  // Paul, pequeño, en la arena de delante: camina despacio; en «leader» se vuelve; sobre él, la única luz de pensar en «thinking for them»
  R.actor(PA.paulEmperador, px, 162, t, { dir: vuelve ? -1 : 1, anda: !vuelve, triste: t > STOP, sorpresa: t > MILL && t < MILL + 0.8 });
  if (t > TFOR - 0.2) { const u = pop(t, TFOR - 0.2); R.halo(px, 126, 10 * u, [ORO[3], ORO[4], ORO[5]], 1.3); R.disco(px, 126, 3 * u, ORO[5]); }
  if (t > DANG && t < LEADR + 0.6) R.bocadillo(px + 10, 130, { icono: '!' });
  lucie(px + 30 + Math.sin(t) * 4, 140 + flota(t), t, { dir: -1, cara: t > STOP ? 'triste' : 'normal', brillo: 0.8 });
  for (let k = 0; k < 18; k++) { const u = (t * (0.25 + h2(k, 1, 4) * 0.3) + h2(k, 2, 4)) % 1, x = ri(-10 + u * 340), y = ri(150 + h2(k, 3, 4) * 28 + Math.sin(u * 9 + k) * 2); R.pset(x, y, H('#f6e2b8')); if (h2(k, 4, 4) > 0.5) R.pset(x - 1, y, H('#d0a060')); }
  // LA FILA DE DELANTE, de espaldas y POR DELANTE de Paul (se pinta después): sube desde abajo en «millions», con su luz
  // de pensar grande que se apaga en «stop thinking»; deja un hueco bajo Paul para no taparle los pies
  const sf = tramo(t, MILL - 0.2, MILL + 0.5);
  if (sf > 0) for (let j = 0; j < 12; j++) { const id = 5000 + j * 13, x = 8 + j * 28 + ri((h2(id, 1, 9) - 0.5) * 8); if (Math.abs(x - 160) < 24) continue;
    const s1 = h2(id, 7, 17), r = 6 + ri(s1 * 2.4), cap = CAPAS[ri(h2(id, 2, 9) * 7.99) & 7], y = 164 + ri(h2(id, 3, 9) * 3) + ri((1 - sf) * 30) + ri(Math.sin(t * 2.5 + j) * 0.6);
    R.disco(x, y + r + 4, r + 5, K); R.disco(x, y + r + 4, r + 4, (xx, yy) => rmp([mez(cap, K, 0.35), cap, mez(cap, H('#ffffff'), 0.2)], 1.4 - (xx - x) / (r + 4) * 0.8, xx, yy));
    R.disco(x, y, r + 1, K);
    if (s1 < 0.25) { const pe = PELO[(j * 3) % 5]; R.disco(x, y, r, (xx, yy) => rmp([mez(pe, K, 0.4), pe, mez(pe, H('#ffffff'), 0.2)], 1.5 - (xx - x) / r * 0.7 - (yy - y) / r * 0.4, xx, yy)); }
    else { R.disco(x, y, r, (xx, yy) => rmp([mez(cap, K, 0.35), cap, mez(cap, H('#ffffff'), 0.25)], 1.4 - (xx - x) / r * 0.8 - (yy - y) / r * 0.3, xx, yy)); R.linea(x - 1, y - r + 2, x - 1, y + r - 1, mez(cap, K, 0.3)); R.pset(x, y - r - 1, K); R.pset(x + 1, y - r - 1, K); R.pset(x, y - r, mez(cap, H('#ffffff'), 0.2));
      R.linea(x - r + 1, y + r - 1, x + r - 1, y + r - 1, mez(cap, K, 0.45)); }
    const ap = tramo(t, STOP + h2(id, 6, 3) * 0.6, STOP + 0.35 + h2(id, 6, 3) * 0.6); if (ap < 1) { const ly = y - r - 6 - ri(ap * 3), c1 = mez(H('#fff4b0'), H('#8a7a60'), ap), c2 = mez(H('#ffd34a'), H('#7a6a50'), ap);
      if (ap < 0.5) R.halo(x, ly, 5 * (1 - ap * 2), [ORO[3], ORO[4], ORO[5]], 1); R.disco(x, ly, 2, c2); R.pset(x, ly, c1); R.pset(x - 1, ly - 1, c1); } }
};

// la ficha de un líder (tarjeta de fichero con su retrato y renglones), a escala 1 en 18 × 22
const ficha = (k, fondo = '#a8b8c8', gafas = false) => () => { R.rect(0, 0, 17, 21, K); R.rect(1, 1, 16, 20, H('#f8f4ec')); R.rect(1, 1, 16, 2, H('#3a6ab0'));
  retrato(3, 4, 12, 11, k, H(fondo)); if (gafas) { const cx = 9, cy = 8; R.rect(cx - 3, cy, cx - 1, cy + 1, K); R.rect(cx + 1, cy, cx + 3, cy + 1, K); R.pset(cx - 2, cy, H('#cfe8ff')); R.pset(cx + 2, cy, H('#cfe8ff')); }
  for (const y of [17, 19]) R.rect(3, y, 14, y, H('#b0b0b8')); };
// la raja de un error, como un papel rajado: entra por una esquina de la ficha (x0, y0) hacia (x1, y1), en zigzag, oscura,
// de g px, con su filo claro por arriba y una rama; se abre hasta la fracción u. Va siempre por debajo del retrato.
const grieta = (x0, y0, x1, y1, u, g = 2) => { const n = Math.max(1, ri(Math.hypot(x1 - x0, y1 - y0))), m = ri(n * u), nx = -(y1 - y0) / n, ny = (x1 - x0) / n, sx = Math.sign(x1 - x0), sy = Math.sign(y1 - y0);
  if (m <= 0) return; const pts = []; for (let i = 0; i <= m; i += 3) { const f = i / n, z = ((i / 3) % 2 ? 1 : -1) * (0.6 + g * 0.35) * Math.min(1, f * 6); pts.push([ri(x0 + (x1 - x0) * f + nx * z), ri(y0 + (y1 - y0) * f + ny * z)]); }
  if (u > 0.6) { const [bx, by] = pts[Math.floor(pts.length * 0.5)], bl = ri((u - 0.6) / 0.4 * (3 + g)); pts.push(null, [bx, by], [bx - sx * 2, by - sy * bl]); }
  R.poligono([[x0, y0], [x0 + sx * (g + 3), y0], [x0, y0 + sy * (g + 3)]], H('#3a2a26'));
  const tramos = (f) => { for (let i = 1; i < pts.length; i++) if (pts[i] && pts[i - 1]) f(pts[i - 1], pts[i]); };
  tramos(([a, b], [c, d]) => R.linea(a, b - 1, c, d - 1, H('#ffffff')));
  tramos(([a, b], [c, d]) => { for (let k = 0; k < g - 1; k++) R.linea(a, b + k, c, d + k, H('#241c20')); });
  tramos(([a, b], [c, d]) => R.linea(a, b + g - 1, c, d + g - 1, H('#7a7068'))); };

// ── 13 · el escritorio de Herbert: Atom pone la ficha del líder; sus errores ──────────────────────────────────
const HERB2 = @herbert2@, WROTE = @wrote@, MIST = @mistakes@, ONES = @ones@, NAME2 = @name2@;
const p13 = (t) => {
  const o = { encuadre: 'consulta', camara: 'escritorio' }, g = T.estudio(R, t, o);
  // la máquina de escribir teclea desde «wrote»: la hoja sube un renglón
  if (t > WROTE && t < MIST) { const k = Math.floor(t * 12) % 4; R.pset(262 + k * 4, 104, H('#ffffff')); R.pset(263 + k * 4, 103, H('#ffffff')); }
  // Atom, al doble, llega por la derecha con la ficha y la deja en el secante en «leader's mistakes»
  const ll = tramo(t, P13, MIST - 0.6), ax = lerp(250, 200, ll), deja = MIST - 0.3;
  const r = atomG(ax, 166, t, { s: 2, dir: -1, pose: t < deja ? (ll < 1 ? 'camina' : 'sostiene') : t > ONES ? 'senala' : 'quieto', cara: t > MIST + 0.1 ? 'sorpresa' : t > ONES + 0.5 ? 'triste' : 'normal', habla: voz(t) });
  const fx = t < deja ? r.mano[0] - 40 : 132, fy = t < deja ? r.mano[1] - 30 : 116;
  AT.escalado(R, ficha(6), 18, 22, ri(fx), ri(fy), 2);
  if (t > MIST) grieta(ri(fx) + 33, ri(fy) + 41, ri(fx) + 10, ri(fy) + 33, tramo(t, MIST, MIST + 0.5), 3);
  // en «the ones made in his name» llega una segunda ficha con el halcón, y también se agrieta
  const u2 = pop(t, ONES - 0.1); if (u2 > 0) { const x2 = 176, y2 = 120 - ri((1 - u2) * 10);
    AT.escalado(R, () => { R.rect(0, 0, 17, 21, K); R.rect(1, 1, 16, 20, H('#f8f4ec')); R.rect(1, 1, 16, 2, H('#2e6a4a')); R.poligono([[9, 5], [4, 11], [9, 9], [14, 11]], H('#c89a3a')); R.rect(8, 9, 10, 14, H('#c89a3a')); R.pset(9, 6, K); for (const y of [17, 19]) R.rect(3, y, 14, y, H('#b0b0b8')); }, 18, 22, x2, y2, 2);
    if (t > NAME2 - 0.2) grieta(x2 + 2, y2 + 41, x2 + 25, y2 + 33, tramo(t, NAME2 - 0.2, NAME2 + 0.4), 3); }
};

// ── 14 · la mesa larga: detrás de la ficha, la fila que se multiplica y lo amplifica ─────────────────────────
const AMPL = @amplified@, NUMS = @numbers@, FOLL = @follow@, WITH = @without@, QUES = @questions@;
const mesaLarga = () => horno('mesaLarga', () => {
  // la sala en penumbra con estanterías al fondo y una ventana alta con luna
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#120c10', '#1c1418', '#281c20', '#342428']), 1.6 + (h2(x >> 2, y >> 2, 6) - 0.5) * 0.5 - Math.hypot(x - 90, y - 150) / 300, x, y));
  for (const [x0, x1] of [[8, 96], [196, 270]]) { caja(x0, 30, x1, 92, K); for (let s = 0; s < 3; s++) { const yb = 48 + s * 20; let x = x0 + 2; while (x < x1 - 3) { const w = 2 + ri(h2(x, s, 51) * 3), hh = 10 + ri(h2(x, s, 52) * 6); caja(x, yb - hh, x + w - 1, yb - 1, mez(LIB[ri(h2(x, s, 53) * 7)], K, 0.45)); x += w; } caja(x0 + 1, yb, x1 - 1, yb + 1, MAD[2]); } }
  caja(120, 22, 170, 74, K); caja(121, 23, 169, 73, H('#2a3a6a')); for (let y = 23; y < 74; y++) for (let x = 121; x < 170; x++) R.pset(x, y, rmp(NOCHE, 3 + (y - 23) / 14 + (h2(x, y, 3) - 0.5) * 0.4, x, y)); R.disco(152, 38, 6, H('#f0ecff')); R.disco(155, 37, 5, NOCHE[4]);
  caja(144, 23, 145, 73, MAD[2]); caja(121, 47, 169, 48, MAD[2]);
  // la mesa larga en perspectiva: el tablero de nogal que huye hacia el fondo
  R.poligono([[-10, 180], [330, 180], [262, 92], [186, 92]], K);
  for (let y = 93; y < 180; y++) { const u = (y - 92) / 88, xa = lerp(186, -10, u), xb = lerp(262, 330, u); for (let x = Math.max(0, ri(xa) + 1); x < Math.min(320, ri(xb)); x++) { const v = (x - xa) / (xb - xa); R.pset(x, y, rmp(MADO, 2.8 + (ns(v * 8, y * 0.2) - 0.5) * 1.6 + Math.sin(v * 60 + y * 0.05) * 0.2 + (y - 92) / 120, x, y)); } }
  R.linea(186, 92, 262, 92, MADO[5]);
});
const p14 = (t) => {
  R.copiar(mesaLarga());
  // la lámpara de la mesa
  luz(70, 140, 70, H('#ffe0a0'), 0.25 + Math.sin(t * 8) * 0.02);
  // la fila de fichas que se multiplica hacia el fondo: aparecen en «amplified» y «numbers»; la raja corre por todas, por
  // la esquina de abajo y bajo la cara
  const N = 2 + ri(tramo(t, AMPL - 0.2, NUMS + 0.6) * 22), corre = tramo(t, AMPL + 0.2, FOLL + 0.4);
  for (let k = N - 1; k >= 1; k--) { const u = Math.pow(k / 24, 0.75), x = lerp(96, 236, u), yb = lerp(166, 96, u), s = lerp(1, 0.18, u), w = Math.max(2, ri(22 * s)), hh = Math.max(3, ri(28 * s));
    const bob = ri(Math.sin(t * 3 - k * 0.5) * s * 1.5), x0 = ri(x - w / 2), y0 = ri(yb - hh) + bob; caja(x0, y0, x0 + w, yb + bob, K); caja(x0 + 1, y0 + 1, x0 + w - 1, yb - 1 + bob, H('#f0ece0')); caja(x0 + 1, y0 + 1, x0 + w - 1, y0 + Math.max(1, ri(hh * 0.12)), H('#3a6ab0'));
    if (w >= 6) { const cx = x0 + (w >> 1), cy = y0 + ri(hh * 0.42), r = Math.max(1, ri(w * 0.22)); R.disco(cx, cy, r + 0.6, K); R.disco(cx, cy, r, PIEL[k & 3]); R.linea(cx - r + 1, cy, cx - 1, cy, K); R.linea(cx + 1, cy, cx + r - 1, cy, K); }
    if (corre * 24 > k) { const ya = y0 + ri(hh * 0.7); if (w >= 6) R.linea(x0 + w - 1, ya - 1, x0 + ri(w * 0.4), yb - 2 + bob, H('#ffffff')); R.linea(x0 + w - 1, ya, x0 + ri(w * 0.4), yb - 1 + bob, H('#241c20')); }
    // las preguntas que se apagan: «?» sobre algunas en «follow», que se tachan en «without asking questions»
    if (w >= 6 && k % 2 === 0 && t > FOLL - 0.2) { const q = tramo(t, WITH, QUES + 0.2); R.icono('?', x0 + (w >> 1) - 2, y0 - 9 - ri(q * 3), mez(H('#ffffff'), H('#5a4a4a'), q), K); if (q > 0.5) R.icono('X', x0 + (w >> 1) - 2, y0 - 8, H('#e8483a'), K); } }
  // la ficha del líder, grande, delante a la izquierda, ya rajada por la esquina de abajo
  AT.escalado(R, ficha(6), 18, 22, 62, 106, 3);
  grieta(112, 168, 78, 154, 1, 4);
  // la cifra de los que siguen sube
  const n = t < AMPL ? 1 : t < NUMS ? 10 : t < FOLL + 0.5 ? 100 : 1000; if (t > AMPL - 0.1) R.numero(String(n), 230, 66, { tam: 16, centro: true });
  // Atom, al doble, a la derecha de la ficha, mira la fila de fichas y se lleva un susto
  atomG(150, 178, t, { s: 2, dir: 1, pose: t > NUMS && t < FOLL + 0.4 ? 'senala' : t > WITH ? 'brazos' : 'quieto', cara: t > AMPL ? 'sorpresa' : 'normal', habla: voz(t) });
};

// ── 15 · los dos libros: la historia del héroe y el precio de creer en él (lo congelan 16, 18 y 20) ──────────
const TOLD = @told@, HERO = @hero@, STORY2 = @story@, SHOW = @showed@, PRICE = @price@, BELV = @believing@;
const atrilFondo = () => horno('atril', () => {
  // la pared de madera del estudio de noche, la ventana con dos lunas, el estante, el reloj, y la mesa grande de tapete verde
  madera(0, 0, 319, 104, MADO, 2, 0, true, 11); for (let x = 0; x < 320; x += 36) { R.linea(x, 0, x, 104, MADO[0]); R.linea(x + 1, 0, x + 1, 104, MADO[3]); }
  caja(0, 0, 319, 6, MADO[1]); R.linea(0, 6, 319, 6, MADO[4]); R.linea(0, 7, 319, 7, K);
  caja(20, 22, 86, 88, K); caja(21, 23, 85, 87, MAD[3]); caja(24, 26, 82, 84, K);
  for (let y = 27; y < 84; y++) for (let x = 25; x < 82; x++) R.pset(x, y, rmp(NOCHE, 2 + (y - 27) / 12 + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 16; k++) R.pset(ri(26 + h2(k, 1, 2) * 54), ri(28 + h2(k, 2, 2) * 36), H('#e8ecff'));
  R.disco(64, 42, 7, H('#f0ecff')); R.disco(67, 40, 6, NOCHE[3]); R.disco(38, 36, 3, H('#e8c0a0'));
  for (let x = 25; x < 82; x++) { const hh = 74 - ri(Math.sin(x * 0.12) * 4 + 3); for (let y = hh; y < 84; y++) R.pset(x, y, rmp(ARENA_N, 4 + (y - hh) / 4, x, y)); }
  caja(52, 26, 53, 84, MAD[3]); caja(24, 54, 82, 55, MAD[3]); caja(16, 88, 90, 92, MAD[4]); R.linea(16, 93, 90, 93, K);
  caja(176, 52, 268, 55, K); caja(177, 53, 267, 54, MAD[4]); for (let k = 0; k < 11; k++) { const x = 180 + k * 8; caja(x, 32 + (k % 3), x + 6, 52, K); caja(x + 1, 33 + (k % 3), x + 5, 51, mez(LIB[k % 8], K, 0.2)); R.pset(x + 3, 36 + (k % 3), ORO[4]); }
  caja(286, 52, 312, 100, K); madera(287, 53, 311, 99, MAD, 3, 0, true, 2); R.disco(299, 64, 8, K); R.disco(299, 64, 7, H('#e8dcc0')); caja(292, 76, 306, 96, K);
  caja(100, 40, 146, 76, K); caja(101, 41, 145, 75, ORO[2]); caja(104, 44, 142, 72, K); for (let y = 45; y < 72; y++) for (let x = 105; x < 142; x++) R.pset(x, y, rmp(DUNA, 2 + (y - 45) / 9 + Math.sin(x * 0.2) * 0.5, x, y)); for (let y = 45; y < 56; y++) for (let x = 105; x < 142; x++) R.pset(x, y, rmp(CAL, 1 + (y - 45) / 4, x, y));
  // la mesa: el tapete verde con su ribete de cuero, que llena la mitad de abajo
  caja(0, 104, 319, 107, K); caja(0, 105, 319, 106, MAD[4]);
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x < 6 || x > 313 ? MAD[3] : rmp(pal(['#143222', '#1a3a2a', '#24503a', '#2e6248', '#3a7a56']), 2.2 + (ns(x * 0.08, y * 0.1) - 0.5) * 0.8 + (h2(x, y, 3) - 0.5) * 0.4 - Math.hypot(x - 160, y - 120) / 160, x, y));
  // cosas de la mesa: el tintero con la pluma, unas gafas y un papel
  caja(16, 158, 30, 172, K); caja(17, 159, 29, 171, H('#1a1a2a')); R.linea(24, 158, 34, 136, K); R.linea(25, 158, 35, 136, H('#f0ece0')); R.linea(34, 136, 38, 130, H('#f0ece0'));
  caja(270, 160, 304, 176, K); caja(271, 161, 303, 175, H('#f4ecd8')); for (let y = 164; y < 174; y += 3) R.linea(274, y, 300, y, H('#b0a890'));
  R.disco(150, 172, 4, K); R.disco(150, 172, 3, H('#cfe8ff')); R.disco(162, 172, 4, K); R.disco(162, 172, 3, H('#cfe8ff')); R.linea(154, 171, 158, 171, K);
});
// un libro grande sobre la mesa: cerrado (ab < 0.5) con su emblema, o abierto con las dos páginas de renglones
const libroGrande = (x, y, ab, tapa, emb) => {
  if (ab < 0.5) { const lev = ri(ab * 2 * 10); R.poligono([[x - 34, y], [x + 34, y], [x + 30, y - 16 - lev], [x - 30, y - 16 + ri(lev * 0.3)]], K);
    R.poligono([[x - 32, y - 1], [x + 32, y - 1], [x + 28, y - 15 - lev], [x - 28, y - 15 + ri(lev * 0.3)]], tapa); caja(x - 34, y, x + 34, y + 4, K); caja(x - 33, y + 1, x + 33, y + 3, H('#f0e8d0'));
    for (let i = x - 31; i < x + 31; i += 3) R.pset(i, y + 2, H('#c8c0a8')); emb(x, y - 8); return; }
  caja(x - 50, y, x + 50, y + 4, K); caja(x - 49, y + 1, x + 49, y + 3, tapa);
  R.poligono([[x - 50, y], [x - 46, y - 32], [x - 1, y - 30], [x - 1, y]], K); R.poligono([[x + 1, y], [x + 1, y - 30], [x + 46, y - 32], [x + 50, y]], K);
  R.poligono([[x - 48, y - 1], [x - 45, y - 31], [x - 2, y - 29], [x - 2, y - 1]], (xx, yy) => rmp(pal(['#c8b890', '#e0d4b0', '#f4ecd8']), 2 - Math.max(0, 6 - (x - xx)) / 3, xx, yy));
  R.poligono([[x + 2, y - 1], [x + 2, y - 29], [x + 45, y - 31], [x + 48, y - 1]], (xx, yy) => rmp(pal(['#c8b890', '#e0d4b0', '#f4ecd8']), 2 - Math.max(0, 6 - (xx - x)) / 3, xx, yy));
  for (let k = 0; k < 7; k++) { const yy = y - 26 + k * 3.6; R.linea(x - 42, ri(yy - 1), x - 8, ri(yy), H('#9a8e74')); R.linea(x + 8, ri(yy), x + 42, ri(yy - 1), H('#9a8e74')); } };
const solEmb = (x, y) => { R.disco(x, y, 4, ORO[5]); R.disco(x, y, 3, ORO[4]); for (let a = 0; a < 8; a++) R.pset(ri(x + Math.cos(a * Math.PI / 4) * 6), ri(y + Math.sin(a * Math.PI / 4) * 4), ORO[5]); };
const coronaRota = (x, y) => { R.icono('corona', x - 2, y - 2, H('#a8a8c8'), K); R.pset(x, y, K); R.pset(x + 1, y + 1, K); };
const atril = (t, quieto = false) => {
  R.copiar(atrilFondo());
  // la lámpara que cuelga y su cono de luz sobre los libros
  R.linea(160, 0, 160, 58, K); caja(150, 58, 170, 64, ORO[2]); R.poligono([[144, 66], [176, 66], [168, 56], [152, 56]], K); R.poligono([[146, 65], [174, 65], [167, 57], [153, 57]], H('#2e6a4a')); R.disco(160, 67, 2, ORO[5]);
  luz(160, 140, 90, H('#ffe0a0'), 0.16 + (quieto ? 0 : Math.sin(t * 9) * 0.015));
  const a1 = tramo(t, TOLD - 0.3, TOLD + 0.3), a2 = tramo(t, SHOW - 0.2, SHOW + 0.4);
  libroGrande(84, 156, a1, H('#b8862e'), solEmb); libroGrande(236, 156, a2, H('#1e2a4a'), coronaRota);
  // del primero sale el héroe dorado con su halo, que sube la escalera de luz hasta la corona en «story»
  if (a1 >= 0.5) { const sube = tramo(t, HERO - 0.2, STORY2 + 0.3), roto = tramo(t, PRICE - 0.1, BELV + 0.5);
    for (let k = 0; k < 5; k++) { const sx = 66 + k * 11, sy = 136 - k * 9; if (roto * 5 < 5 - k) { caja(sx, sy, sx + 12, sy + 3, K); caja(sx + 1, sy + 1, sx + 11, sy + 2, ORO[3]); R.linea(sx + 1, sy, sx + 11, sy, ORO[5]); } }
    const kk = Math.min(4, Math.floor(sube * 5)), hx = 72 + kk * 11, hy = 136 - kk * 9;
    if (roto < 1) { R.halo(hx, hy - 14, 16 * (1 - roto), [ORO[2], ORO[3], ORO[4]], 1.1); R.actor(PA.paul, hx, hy, t, { dir: 1, sonrisa: roto === 0, triste: roto > 0, brazos: sube >= 1 && roto === 0, quieto });
      if (sube >= 1) R.icono('corona', hx - 2, hy - 32 + (quieto ? 0 : flota(t)), H('#ffd34a'), K, 2); }
    // en «price» el halo se rompe y el héroe se deshace en arena que vuela al otro libro
    if (roto > 0) for (let k = 0; k < 60; k++) { const u = (roto * 1.3 + h2(k, 1, 7) * 0.4) % 1.3; if (u > 1) continue; const x = ri(lerp(hx, 236 + (h2(k, 2, 7) - 0.5) * 50, u) + Math.sin(u * 6 + k) * 3), y = ri(lerp(hy - 12 + h2(k, 3, 7) * 12, 146, u) - Math.sin(u * Math.PI) * 34); R.pset(x, y, k % 3 ? H('#e0b070') : H('#c08a48')); } }
  // del segundo, en «then showed you», sube un remolino de arena oscura y la corona cae rota sobre la página
  if (a2 >= 0.5) { const s2 = tramo(t, SHOW, PRICE + 0.4);
    for (let k = 0; k < 34; k++) { const a = (quieto ? 3 : t) * 2.4 + k * 0.6, rr = 4 + k * 0.6 * s2; tiñe(236 + Math.cos(a) * rr, 148 - k * 1.8 * s2, H('#5a4a6a'), 0.6); tiñe(237 + Math.cos(a) * rr, 148 - k * 1.8 * s2, H('#8a7a9a'), 0.4); }
    const cy = ri(lerp(92, 140, tramo(t, PRICE, PRICE + 0.6))); R.icono('corona', 232, cy, H('#a8a8b8'), K, 2); if (t > PRICE + 0.5) { R.linea(236, cy + 1, 238, cy + 5, K); } }
  for (let k = 0; k < 10; k++) { const y = ri(70 + ((h2(k, 1, 9) * 70 + (quieto ? 0 : t * 3)) % 70)), x = ri(120 + h2(k, 2, 9) * 80); tiñe(x, y, H('#fff0c0'), 0.5); }
};
const p15 = (t) => {
  atril(t);
  // Atom, de pie en la mesa entre los dos libros: señala el héroe, sonríe; se entristece con el precio
  atomG(160, 152, t, { dir: t > SHOW ? 1 : -1, pose: t > TOLD && t < STORY2 + 0.3 ? 'senala' : t > SHOW && t < PRICE ? 'senala' : 'quieto', cara: t > PRICE ? 'triste' : t > TOLD ? 'sonrisa' : 'normal' });
};
// el congelado de la pausa 38: el último instante de 15, sin Atom (entra a color)
const congAtril = () => horno('congAtril', () => atril(P16 - 0.05, true));

// ── 16 · PAUSA: 1949 y Joseph Campbell ─────────────────────────────────────────────────────────────────────────
const N49 = @y1949@, CAMP = @campbell@, JOUR = @journey@;
const fichaCampbell = ficha(9, '#8aa0b8'), fichaEditor = ficha(3, '#b8a080', true);
const p16 = (t) => {
  R.copiar(congAtril()); pausa(t, P16, P17 - 0.02);
  const anda = tramo(t, P16 + 0.05, P16 + 1.0), x = lerp(318, 250, anda);
  atomG(x, 170, t, { s: 2, pose: anda < 1 ? 'camina' : t > N49 ? 'senala' : 'quieto', dir: -1, cara: t > CAMP ? 'sonrisa' : t > N49 ? 'sorpresa' : 'normal', habla: voz(t) });
  const u = pop(t, N49); if (u > 0) { const y = 30 + ri((1 - u) * 24) + flota(t); AT.escalado(R, calendario(4), 22, 24, 40, y, 2); R.numero('1949', 62, y + 72, { tam: 16, centro: true }); }
  const v = pop(t, CAMP); if (v > 0) { const y = 30 + ri((1 - v) * 24) + flota(t, 2); AT.escalado(R, fichaCampbell, 18, 22, 118, y, 2); AT.anillo(R, 136, y + 22, 28, 32, t, tramo(t, CAMP + 0.1, CAMP + 0.6));
    // el viaje del héroe: una flechita en círculo bajo la ficha en «journey»
    const w = tramo(t, JOUR - 0.1, JOUR + 0.6); if (w > 0) for (let a = 0; a < 40 * w; a++) { const p = a / 40 * Math.PI * 2 - Math.PI / 2; R.pset(ri(136 + Math.cos(p) * 10), ri(y + 64 + Math.sin(p) * 8), H('#f0ece0')); } }
};

// ── 17 · el aula: el profesor traza con el puntero el círculo del viaje del héroe ─────────────────────────────
const MOLD = @mold@, ADV = @adventure@, YOUNG = @young@, LEAV = @leaves@, HOME = @home@;
const CIRC = [160, 66, 44, 30];
const tiza = (x, y, c = H('#f0f0e8')) => { R.pset(x, y, c); if (h2(x, y, 3) > 0.4) R.pset(x + 1, y, mez(c, H('#2a4a3a'), 0.5)); };
const casita = (x, y, c) => { R.linea(x - 5, y, x, y - 5, c); R.linea(x, y - 5, x + 5, y, c); R.linea(x - 4, y, x - 4, y + 6, c); R.linea(x + 4, y, x + 4, y + 6, c); R.linea(x - 4, y + 6, x + 4, y + 6, c); R.linea(x - 1, y + 6, x - 1, y + 3, c); R.linea(x + 1, y + 3, x + 1, y + 6, c); };
const monigote = (x, y, c, t) => { R.disco(x, y - 7, 1.6, c); R.linea(x, y - 5, x, y - 2, c); const p = Math.floor(t * 6) % 2; R.linea(x, y - 2, x - 1 - p, y + 1, c); R.linea(x, y - 2, x + 1 + p, y + 1, c); R.linea(x - 2, y - 4, x + 2, y - 4, c); };
const aula = () => horno('aula', () => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#a89878', '#bcac8a', '#d0c09c']), 1.4 + (h2(x >> 2, y >> 2, 5) - 0.5) * 0.5 - y / 400, x, y));
  caja(0, 0, 319, 5, H('#e8e0d0')); R.linea(0, 6, 319, 6, K);
  madera(0, 128, 319, 140, MAD, 2.6, 0, true, 3); R.linea(0, 128, 319, 128, K);
  // la pizarra grande con su marco de roble y la repisa
  caja(70, 20, 250, 112, K); caja(71, 21, 249, 111, MAD[3]); caja(74, 24, 246, 108, K);
  for (let y = 25; y < 108; y++) for (let x = 75; x < 246; x++) R.pset(x, y, rmp(pal(['#1e3a2c', '#264434', '#2e4e3c']), 1.2 + (ns(x * 0.05, y * 0.08) - 0.5) * 1 + (h2(x, y, 2) > 0.97 ? 0.8 : 0), x, y));
  for (let k = 0; k < 6; k++) for (let i = 0; i < 26; i++) tiñe(90 + k * 24 + i, 90 + Math.sin(i * 0.4 + k) * 3 + k % 2 * 6, H('#9ab0a0'), 0.25);
  for (const [n, x, y] of [['1', 86, 36], ['2', 226, 34], ['3', 230, 100], ['7', 90, 104]]) R.numero(n, x, y, { color: H('#6a8a7a'), sombra: false });
  caja(66, 112, 254, 115, K); caja(67, 112, 253, 114, MAD[4]); caja(100, 109, 108, 111, H('#f0f0e8')); caja(200, 109, 212, 111, H('#8a6a4a')); caja(202, 109, 210, 110, H('#d8d0c0'));
  // la ventana de la derecha con su árbol
  caja(266, 30, 312, 100, K); caja(267, 31, 311, 99, H('#e8e0d0')); caja(270, 34, 308, 96, K);
  // el reloj y el mapa enrollado de la izquierda
  R.disco(36, 36, 10, K); R.disco(36, 36, 9, H('#f4f0e6')); for (let a = 0; a < 12; a++) R.pset(ri(36 + Math.cos(a * Math.PI / 6) * 7), ri(36 + Math.sin(a * Math.PI / 6) * 7), K);
  caja(14, 58, 58, 62, K); caja(15, 59, 57, 61, H('#e8dcc0')); caja(16, 62, 56, 98, K); caja(17, 63, 55, 97, H('#e8dcc0')); for (let y = 66; y < 96; y++) for (let x = 18; x < 55; x++) if (ns(x * 0.12, y * 0.12) > 0.55) R.pset(x, y, H('#a8c08a')); else if (b4(x, y) < 0.3) R.pset(x, y, H('#9ac0d8'));
  // el suelo y la tarima del profesor
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a3020', '#6a4428', '#8a5a34', '#a87444']), 2.2 + (ns(x * 0.06, y * 0.5) - 0.5) + ((x + (y >> 3) * 17) % 34 === 0 ? -1.2 : 0), x, y));
});
const p17 = (t) => {
  R.copiar(aula());
  // por la ventana: el cielo de día y un árbol que se mece
  R.recorte([271, 35, 307, 95]); cieloDia(271, 35, 307, 95, 3); nubes(t, [[0, 46, 20, 3, 1]], NUBE_D);
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const v = ri(Math.sin(t * 1.3) * (14 - j) / 14); if (i * i + j * j < 196 && ns((i + 300) * 0.25, (j + 70) * 0.25) > 0.3) R.pset(292 + i + v, 72 + j, rmp(pal(['#2a5a2a', '#3a7a3a', '#5a9a4a']), 1.4 - j / 10, i, j)); }
  caja(291, 84, 293, 95, H('#5a3a22')); R.recorte(null); caja(288, 35, 289, 95, H('#e8e0d0'));
  { const a = t * 0.5; R.linea(36, 36, 36 + ri(Math.cos(a) * 6), 36 + ri(Math.sin(a) * 6), K); R.linea(36, 36, 36 + ri(Math.cos(a / 12 + 1) * 4), 36 + ri(Math.sin(a / 12 + 1) * 4), K); }
  // el círculo de tiza se traza de «mold» a «adventure»; la casa arriba; en «young man» sale el monigote y en «leaves home» echa a andar
  const [cx, cy, rx, ry] = CIRC, tr = tramo(t, MOLD - 0.1, ADV + 0.4), n = ri(tr * 120);
  for (let a = 0; a < n; a++) { const p = -Math.PI / 2 + a / 120 * Math.PI * 2; tiza(ri(cx + Math.cos(p) * rx), ri(cy + Math.sin(p) * ry)); }
  const pt = [cx + Math.cos(-Math.PI / 2 + tr * Math.PI * 2) * rx, cy + Math.sin(-Math.PI / 2 + tr * Math.PI * 2) * ry];
  if (t > ADV) casita(cx, cy - ry - 8, H('#f0f0e8'));
  if (t > YOUNG - 0.2) { const w = tramo(t, LEAV, P18 + 0.5), p = -Math.PI / 2 + w * 0.9; monigote(ri(cx + Math.cos(p) * rx), ri(cy + Math.sin(p) * ry) + 4, H('#ffe890'), t); }
  // la mesa del profesor a la izquierda, contra el zócalo: el globo terráqueo que gira despacio, los libros y la manzana
  caja(14, 135, 64, 139, K); madera(15, 136, 63, 138, MAD, 3.2, 0, false, 7); caja(18, 140, 60, 150, K); madera(19, 140, 59, 149, MAD, 2.2, 0, true, 8);
  for (let x = 20; x < 59; x++) tiñe(x, 150, K, 0.4); caja(22, 143, 56, 143, mez(MAD[1], K, 0.3)); caja(37, 145, 41, 146, H('#d8b048'));
  caja(18, 151, 20, 152, K); caja(58, 151, 60, 152, K);
  { const gx = 26, gy = 124; caja(gx - 1, 131, gx + 1, 134, H('#8a6a2a')); caja(gx - 4, 134, gx + 4, 134, K); R.disco(gx, gy, 6, K);
    R.disco(gx, gy, 5, (x, y) => { const u = (x - gx + t * 3 + 40) * 0.5, tierra = ns(u, (y - gy) * 0.5 + 9) > 0.55; return mez(tierra ? H('#6a9a4a') : H('#3a6ac0'), H('#ffffff'), Math.max(0, 0.3 - Math.hypot(x - gx + 2, y - gy + 2) / 10)); });
    R.linea(gx + 5, gy - 6, gx + 6, gy + 5, H('#b8903a')); }
  for (const [x0, w, c] of [[38, 18, '#a83a2a'], [40, 15, '#3a5a8a'], [37, 17, '#d8b048']]) { const y0 = 134 - [38, 40, 37].indexOf(x0) * 3; caja(x0 - 1, y0 - 3, x0 + w, y0, K); caja(x0, y0 - 2, x0 + w - 1, y0 - 1, H(c)); caja(x0 + w - 2, y0 - 2, x0 + w - 1, y0 - 1, H('#f0e8d0')); }
  R.disco(60, 132, 2.6, K); R.disco(60, 132, 2, H('#c8302a')); R.pset(59, 131, H('#ffb0a0')); R.pset(60, 129, H('#4a8a3a'));
  // el profesor, a escala chibi, de pie al pie de la pizarra, entre los pupitres (se pinta antes que los alumnos, que van
  // delante): explica, señala el círculo con el dedo y sonríe en «leaves home»; su sombra en el suelo
  { const px = 104, ps = 147; for (let i = -8; i <= 8; i++) { tiñe(px + i, ps, K, 0.35 * (1 - Math.abs(i) / 9)); tiñe(px + i, ps + 1, K, 0.2 * (1 - Math.abs(i) / 9)); }
    R.actor(EL.profesor, px, ps, t, { dir: 1, dedo: t > MOLD && t < ADV + 0.6 || t > YOUNG - 0.2, habla: habla(t, P17, ADV + 0.6) || habla(t, YOUNG - 0.3, HOME + 0.4), sonrisa: t > HOME }); }
  // los alumnos de primer término, de espaldas, en sus pupitres; uno levanta la mano en «young man»
  for (let k = 0; k < 6; k++) { const x = 24 + k * 54, y = 158 + (k % 2) * 3, pe = PELO[(k + 2) % 5], cam = [H('#3a6ab0'), H('#c84a3a'), H('#3a8a5a'), H('#e8b040')][k % 4];
    caja(x - 18, 168, x + 18, 172, K); madera(x - 17, 169, x + 17, 171, MAD, 3, 0, false, k);
    R.poligono([[x - 10, 168], [x - 8, y + 6], [x + 8, y + 6], [x + 10, 168]], K); R.poligono([[x - 9, 168], [x - 7, y + 7], [x + 7, y + 7], [x + 9, 168]], cam);
    R.disco(x, y - 2 + ri(Math.sin(t * 2 + k) * 0.6), 7, K); R.disco(x, y - 2 + ri(Math.sin(t * 2 + k) * 0.6), 6, (xx, yy) => rmp([mez(pe, K, 0.4), pe, mez(pe, H('#ffffff'), 0.2)], 1.6 - (yy - y) / 5, xx, yy));
    if (k === 3 && t > YOUNG && t < HOME + 0.6) { R.linea(x + 6, y + 4, x + 9, y - 14, K); R.linea(x + 7, y + 4, x + 10, y - 14, H('#f0c09a')); R.disco(x + 10, y - 15, 2, H('#f0c09a')); } }
  const lp = t < ADV + 0.4 ? pt : [lerp(pt[0], 232, tramo(t, ADV + 0.4, ADV + 1.4)), lerp(pt[1], 126, tramo(t, ADV + 0.4, ADV + 1.4))];
  lucie(lp[0], lp[1] + (t < ADV + 0.4 ? 0 : flota(t)), t, { dir: -1, cara: t > LEAV ? 'sonrisa' : 'normal', brillo: 0.9 });
};

// ── 18 · PAUSA: la pizarrita a color: el don, la vuelta y Paul paso a paso hasta el trono ─────────────────────
const GIFT = @gift@, COMES = @comes@, SAVE = @save@, PEOP = @people@, DUNE = @dune@, STEPB = @stepby@, THRONE = @throne@;
const pizarrita = (t) => () => { R.rect(0, 0, 47, 35, K); R.rect(1, 1, 46, 34, H('#8a5a32')); R.rect(3, 3, 44, 32, H('#264434'));
  const cx = 24, cy = 18, rx = 15, ry = 11; for (let a = 0; a < 70; a++) { const p = a / 70 * Math.PI * 2; if (a % 2 === 0) R.pset(ri(cx + Math.cos(p) * rx), ri(cy + Math.sin(p) * ry), H('#f0f0e8')); }
  casita(cx - 13, cy - 10 + 3, H('#f0f0e8'));
  if (t > GIFT) { const x = cx + rx, y = cy - 2; R.rect(x - 2, y - 2, x + 2, y + 2, H('#e8483a')); R.pset(x, y - 3, H('#ffd34a')); R.linea(x - 2, y, x + 2, y, H('#ffd34a')); }
  if (t > COMES) { R.linea(cx - 6, cy + ry + 1, cx + 6, cy + ry + 1, H('#ffd34a')); R.pset(cx - 5, cy + ry, H('#ffd34a')); R.pset(cx - 5, cy + ry + 2, H('#ffd34a')); }
  if (t > PEOP) for (let k = 0; k < 4; k++) { const x = cx - rx - 2 + (k % 2) * 3, y = cy + 2 + (k >> 1) * 4; R.pset(x, y, H('#a8d8ff')); R.pset(x, y + 1, H('#a8d8ff')); }
  if (t > DUNE - 0.3) { R.rect(cx + 8, 2, cx + 12, 4, H('#ffd34a')); R.pset(cx + 8, 1, H('#ffd34a')); R.pset(cx + 10, 1, H('#ffd34a')); R.pset(cx + 12, 1, H('#ffd34a')); }
  // la ficha de Paul que avanza paso a paso por el círculo hasta el trono (arriba a la derecha)
  if (t > DUNE) { const w = Math.floor(tramo(t, DUNE, THRONE) * 8) / 8, p = -Math.PI * 0.75 + w * Math.PI * 1.25 + Math.PI; const x = ri(cx + Math.cos(p - Math.PI) * rx), y = ri(cy + Math.sin(p - Math.PI) * ry);
    R.rect(x - 1, y - 2, x + 1, y + 1, H('#2e6a4a')); R.pset(x, y - 3, H('#f0c09a')); } };
const p18 = (t) => {
  R.copiar(congAtril()); pausa(t, P18, P19 - 0.02);
  atomG(66, 170, t, { s: 2, dir: 1, pose: t > DUNE ? 'senala' : 'quieto', cara: t > THRONE ? 'sorpresa' : t > GIFT ? 'sonrisa' : 'normal', habla: voz(t) });
  const y = 34 + flota(t); AT.escalado(R, pizarrita(t), 48, 36, 112, y, 2);
  for (const a of [GIFT, COMES, PEOP, THRONE]) if (t > a && t < a + 0.5) AT.anillo(R, 160, y + 36, 56, 44, t, tramo(t, a, a + 0.4));
};

// ── 19 · la pizarra de cerca: Atom añade el tramo «después» ─────────────────────────────────────────────────
const MESS = @messiah@, NEVER = @never@, TELL = @tell@, DAY = @day@, WIN = @win@;
const pizarraCerca = () => horno('pizarraCerca', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#1a3426', '#1e3a2c', '#264434', '#2e4e3c']), 1.6 + (ns(x * 0.04, y * 0.06) - 0.5) * 1.2 + (h2(x, y, 2) > 0.985 ? 1 : 0), x, y));
  for (let k = 0; k < 9; k++) for (let i = 0; i < 40; i++) tiñe(10 + k * 36 + i, 20 + (k * 37) % 120 + Math.sin(i * 0.3 + k) * 4, H('#9ab0a0'), 0.18);
  caja(0, 0, 319, 6, MAD[3]); R.linea(0, 6, 319, 6, K); caja(0, 162, 319, 168, MAD[4]); R.linea(0, 162, 319, 162, MAD[5]); R.linea(0, 169, 319, 169, K); caja(0, 170, 319, 179, MAD[1]);
  caja(30, 159, 40, 161, H('#f0f0e8')); caja(60, 160, 66, 161, H('#e8c0c0')); caja(270, 157, 290, 161, H('#8a6a4a')); caja(272, 157, 288, 158, H('#d8d0c0'));
  // el círculo grande ya dibujado, con la casa, el regalo, la vuelta y la corona (de los planos de antes)
  const cx = 130, cy = 88, rx = 70, ry = 56; for (let a = 0; a < 260; a++) { const p = a / 260 * Math.PI * 2; tiza(ri(cx + Math.cos(p) * rx), ri(cy + Math.sin(p) * ry)); tiza(ri(cx + Math.cos(p) * (rx + 0.6)), ri(cy + Math.sin(p) * (ry + 0.6))); }
  casita(cx - 50, cy - 44, H('#f0f0e8'));
  { const x = cx + rx, y = cy; R.linea(x - 5, y - 5, x + 5, y - 5, H('#f0a0a0')); R.linea(x - 5, y + 5, x + 5, y + 5, H('#f0a0a0')); R.linea(x - 5, y - 5, x - 5, y + 5, H('#f0a0a0')); R.linea(x + 5, y - 5, x + 5, y + 5, H('#f0a0a0')); R.linea(x, y - 5, x, y + 5, H('#f0e080')); R.linea(x - 5, y, x + 5, y, H('#f0e080')); }
  for (let i = -14; i <= 14; i++) tiza(cx + i, cy + ry + 8, H('#f0e080')); R.linea(cx - 14, cy + ry + 8, cx - 10, cy + ry + 5, H('#f0e080')); R.linea(cx - 14, cy + ry + 8, cx - 10, cy + ry + 11, H('#f0e080'));
  { const x = cx + 40, y = cy - ry - 2; R.linea(x - 6, y + 4, x + 6, y + 4, H('#f0e080')); R.linea(x - 6, y + 4, x - 6, y - 3, H('#f0e080')); R.linea(x + 6, y + 4, x + 6, y - 3, H('#f0e080')); R.linea(x - 6, y - 3, x - 3, y, H('#f0e080')); R.linea(x - 3, y, x, y - 4, H('#f0e080')); R.linea(x, y - 4, x + 3, y, H('#f0e080')); R.linea(x + 3, y, x + 6, y - 3, H('#f0e080')); }
  for (let k = 0; k < 4; k++) { const x = cx - rx + 14 + (k % 2) * 7, y = cy + 20 + (k >> 1) * 9; R.disco(x, y - 3, 1.5, H('#a8d8ff')); R.linea(x, y - 1, x, y + 3, H('#a8d8ff')); }
});
const p19 = (t) => {
  R.copiar(pizarraCerca());
  // el tramo nuevo sale de la corona y baja hacia la derecha, siguiendo la tiza de Atom; al final, «?» y un sol que sale
  const cx = 130, cy = 88, x0 = 176, y0 = 30, tr = tramo(t, MESS, TELL), ax = lerp(196, 252, tr);
  const r = atomG(ax, 162, t, { s: 2, dir: 1, pose: tr > 0 && tr < 1 ? 'sostiene' : t > DAY ? 'brazos' : t > MESS ? 'sostiene' : 'quieto', cara: t > WIN ? 'guino' : t > NEVER ? 'sorpresa' : 'normal', habla: voz(t) });
  const ex = t > MESS ? (tr < 1 ? r.mano[0] : 262) : x0, ey = t > MESS ? (tr < 1 ? r.mano[1] - 2 : 128) : y0;
  if (t > MESS) { const n = 40; for (let i = 0; i <= n; i++) { const u = i / n; if (Math.floor(u * 12) % 2) continue; const x = lerp(x0 + 10, ex, u), y = lerp(y0, ey, u) - Math.sin(u * Math.PI) * 30; tiza(ri(x), ri(y), H('#ffe890')); } }
  if (tr > 0 && tr < 1 && r.mano) { caja(r.mano[0] - 1, r.mano[1] - 3, r.mano[0] + 1, r.mano[1], H('#ffe890')); }
  if (t > NEVER) { const u = pop(t, NEVER); R.icono('?', 268, ri(64 - u * 4), H('#ffe890'), H('#1e3a2c'), 2); }
  if (t > DAY - 0.1) { const u = tramo(t, DAY - 0.1, WIN + 0.3), sx = 294, sy = ri(lerp(112, 92, u)); R.recorte([268, 60, 319, 112]); R.disco(sx, sy, 9, H('#ffd34a')); R.disco(sx, sy, 6, H('#fff0b0'));
    for (let a = 0; a < 8; a++) { const p = -Math.PI + a * Math.PI / 7; R.linea(ri(sx + Math.cos(p) * 12), ri(sy + Math.sin(p) * 12), ri(sx + Math.cos(p) * 16), ri(sy + Math.sin(p) * 16), H('#ffd34a')); } R.recorte(null);
    R.linea(266, 112, 318, 112, H('#f0f0e8')); if (u > 0.6) R.numero('+1', 294, 128, { centro: true }); }
  // el polvo de tiza que cae
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; tiñe(ex + Math.sin(k + t) * 4, ey + u * 30, H('#ffffff'), 0.5 * (1 - u)); }
};

// ── 20 · PAUSA: las dos fichas Campbell; el editor también se llamaba Campbell; vuelve el color ─────────────
const EDIT = @editor@, TURN2 = @turned2@, ALSO = @also@, CAMP2 = @campbell2@;
const p20 = (t) => {
  R.copiar(congAtril()); pausa(t, P20, E.duracion);
  atomG(262, 170, t, { s: 2, dir: -1, pose: t > ALSO ? 'brazos' : t > EDIT ? 'senala' : 'quieto', cara: t > CAMP2 ? 'guino' : t > ALSO ? 'sorpresa' : 'normal', habla: voz(t) });
  const y = 36 + flota(t); AT.escalado(R, fichaCampbell, 18, 22, 40, y, 2); R.numero('1949', 58, y + 62, { tam: 8, centro: true });
  const v = pop(t, EDIT); if (v > 0) { const y2 = 36 + ri((1 - v) * 24) + flota(t, 2); AT.escalado(R, fichaEditor, 18, 22, 150, y2, 2); R.numero('1969', 168, y2 + 62, { tam: 8, centro: true });
    if (t > TURN2) { const u = tramo(t, TURN2, TURN2 + 0.4); R.icono('X', 184, y2 + 30, H('#e8483a'), K, 2); } }
  if (t > ALSO) { const u = pop(t, ALSO); R.rect(104, 56, 136, 59, K); R.rect(104, 64, 136, 67, K); R.rect(105, 57, 135, 58, H('#ffd34a')); R.rect(105, 65, 135, 66, H('#ffd34a')); AT.anillo(R, 112, 60, 96, 40, t, tramo(t, ALSO + 0.1, ALSO + 0.7)); }
};


const efectos = [[0.05, 'tapestop'], [N09, 'pop'], [PHYS + 0.2, 'pasos'], [OWEN, 'papel'], [LIVES, 'papel'], [PRES + 0.1, 'whoosh'], [MINIS + 0.1, 'whoosh'], [HUND, 'brillo'],
  [CHG, 'aviso'], [AFTER, 'papel'], [P5 + 0.05, 'tapestop'], [OUTS, 'pop'], [CONT, 'pop'], [HIST, 'pop'], [GOD, 'boing'], [P6 - 0.3, 'interruptor'],
  [EXPER + 0.3, 'bip'], [Y14, 'pop'], [TEAM + 0.1, 'pasos'], [TEAM + 0.2, 'zumbido'], [RECALL - 0.1, 'brillo'], [OTHERS - 0.2, 'publico', { dur: 1.2 }],
  [SQZ, 'masca'], [SQZ + 0.4, 'boing'], [SQZ + 0.9, 'boing'], [MIRR, 'brillo'], [PWL, 'bip'], [TURN, 'tic'], [EMP, 'interruptor'],
  [PAUL - 0.4, 'pasos'], [TYR, 'whoosh'], [TYR + 0.3, 'publico', { dur: 1.2 }], [NAME + 0.2, 'sello'], [DIS, 'trueno'], [WARN, 'aviso'], [MILL, 'publico', { dur: 2.5 }], [STOP, 'interruptor'], [TFOR, 'brillo'],
  [WROTE, 'maquina'], [MIST - 0.3, 'golpecito'], [ONES, 'pop'], [AMPL, 'avalancha'], [NUMS, 'pop'], [WITH, 'pop'], [TOLD, 'papel'], [HERO, 'brillo'], [SHOW, 'papel'], [PRICE, 'viento'],
  [P16 + 0.05, 'tapestop'], [N49, 'pop'], [CAMP, 'pop'], [MOLD, 'lapiz'], [LEAV, 'pasos'], [P18 + 0.05, 'tapestop'], [GIFT, 'pop'], [COMES, 'pop'], [THRONE, 'brillo'],
  [MESS, 'lapiz'], [NEVER, 'pop'], [DAY, 'brillo'], [EDIT, 'pop'], [TURN2, 'sello'], [ALSO, 'campana'], [E.duracion - 0.3, 'interruptor']];
const AÑO = (t) => (t < P2 || (t >= P5 && t < P6) || (t >= P11 && t < P13) || (t >= P16 && t < P17) || (t >= P18 && t < P19) || t >= P20 ? 12 : null);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14], [P15, p15], [P16, p16], [P17, p17], [P18, p18], [P19, p19], [P20, p20]], { efectos, año: AÑO });
'''

E['pa-poder'] = ('El poder', CAB, sub(PRECIO + COMUN + CUERPO, 'pa-poder', TP))
