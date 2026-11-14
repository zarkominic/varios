# Borrador de escenas del ep14 (grupo S1): oi-gancho, oi-picos, oi-pregunta. Formato del 11 (generar-escenas.py).
# Los instantes van como en('marca', fracción); las fracciones salen de las palabras de la voz inglesa (linea.json).
E = {}

# ── piezas comunes de este grupo (cada escena es su propia página: se copian en cada cuerpo) ──────────────────────────
COMUN = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
// fondo fijo en un búfer (se pinta una vez y se copia en cada fotograma; R.usar(prev), nunca R.usar() a secas)
const FIJO = {};
const fijo = (clave, dibuja) => { if (!FIJO[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); FIJO[clave] = b; } R.copiar(FIJO[clave]); };
// degradado tramado (Bayer 4×4) entre una lista de colores, de y0 a y1
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const degradado = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i;
  for (let x = x0; x <= x1; x++) R.pset(x, y, f * 16 > BAY[(y & 3) * 4 + (x & 3)] + 0.5 ? cols[i + 1] : cols[i]); } };
// nube de tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, c3) => { const b = [[0, 0, .32], [-.32, .07, .23], [.31, .06, .25], [-.12, -.12, .25], [.15, -.09, .22], [.5, .12, .14], [-.5, .12, .13]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), Math.round(r * w), c3[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), c3[1]);
  for (const [dx, dy, r] of b) if (dy <= 0.07) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * .7), c3[2]); };
// nubes que cruzan a su velocidad: [x0, y, ancho, vel]; las altas no entran en la zona de Atom (x > 262, y < 54)
const nubes = (t, lista, c3, xmax = 320) => { for (const [x0, y, w, v] of lista) { const span = Math.min(xmax, y - w * .4 < 54 ? 262 - w * .6 : 320 + w * .6) + w * .6; const x = ((x0 + t * v) % span + span) % span - w * .6; nube(x, y, w, c3); } };
// gaviotas lejanas en vuelo (una «v» que aletea)
const aves = (t, lista, c) => { for (const [x0, y0, v, k] of lista) { const x = Math.round(((x0 + t * v) % 360 + 360) % 360 - 20), y = Math.round(y0 + 3 * Math.sin(t * 0.7 + k)); if (x > 258 && y < 50) continue; const a = Math.sin(t * 8 + k) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); } };
// barca de remos de perfil: x = popa, yW = línea del agua, L largo, H alto de la borda; d = 1 la proa a la derecha.
// mar: color del agua (para la obra viva). Devuelve la borda en el centro.
const barca = (x, yW, L, H, d, mar, o = {}) => {
  const X = (u) => Math.round(d > 0 ? x + u : x + L - u), K = hex('#2a1c14'), M = hex(o.casco ?? '#8a5a34'), ML = hex(o.cascoL ?? '#b07c4c'), MS = hex(o.cascoS ?? '#5e3a20'), BO = hex(o.borda ?? '#c89a64');
  const top = (u) => yW - H - Math.round(H * 0.32 * ((2 * u / L - 1) ** 2)) - (u > L * 0.85 ? Math.round((u - L * 0.85) / (L * 0.15) * H * 0.2) : 0);
  const bot = (u) => { const b = yW + Math.max(1, Math.round(H * 0.18)), r = H * 0.7; return u > L - r ? Math.round(top(u) + (b - top(u)) * Math.max(0, (L - u) / r)) : u < H * 0.25 ? Math.round(top(u) + (b - top(u)) * Math.max(0.6, u / (H * 0.25))) : b; };
  for (let u = 0; u <= L; u++) { const y0 = top(u), y1 = bot(u), xx = X(u);
    for (let y = y0; y <= y1; y++) { const j = (y - y0) / Math.max(1, yW - y0); let c = y === y0 || y === y1 || u === 0 || u === L ? K : y <= y0 + Math.max(1, Math.round(H * 0.12)) ? BO : (Math.round(j * 3 * 10) % 10 === 0 && j > 0.2) ? MS : j < 0.45 ? ML : M;
      if (c !== K && hh(u, y, 9) < 0.08) c = MS; if (y > yW && c !== K) c = mez(c, mar, 0.55); R.pset(xx, y, c); } }
  return top(L / 2);
};
// la mano de remar: un remo de perfil que bate (f fase): el pivote en la borda y la pala que entra en el agua
const remo = (px, py, yW, largo, f, d, c = '#c8a070') => { const bx = Math.round(px - d * (largo * 0.25) + d * largo * 0.55 * Math.cos(f)), by = Math.round(yW + 1 + 3 * Math.sin(f)), hx = Math.round(px + (px - bx) * 0.4), hy = Math.round(py - 3 - (by - py) * 0.25);
  R.linea(hx, hy, bx, by, hex('#3a2818')); R.linea(hx, hy - 1, bx, by - 1, hex(c)); R.disco(bx, by, 2, hex('#7a5430')); R.pset(bx - 1, by - 1, hex(c));
  return { bx, by, hx, hy, dentro: Math.sin(f) > 0 }; };
'''

def fmt(s, d):
    import re
    return re.sub(r'%\((\w+)\)s', lambda m: d[m.group(1)], s).replace('%%', '%')

def F(marca, t):
    """en('marca', fracción) para el instante t (segundos de la escena)."""
    import json, os
    raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
    m = json.load(open(os.path.join(raiz, 'atomo/plato/escenas/marcas-ep14.json')))
    for esc in m.values():
        mm = esc['marcas']
        if marca in mm:
            a, b = mm[marca], mm[marca + '_fin']
            return "en('%s', %.3f)" % (marca, (t - a) / (b - a))
    raise KeyError(marca)

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['oi-gancho'] = ('Gancho', '''// OI-GANCHO (frases 1–3), 1795, cartela «1795». Siete planos:
// 1. la bahía de Mahone: el muchacho rema desde la izquierda hacia la isla de robles (goleta, pescador, foca, gaviotas);
// 2. de cerca, la barca: Daniel rema, mira por encima del hombro y señala la isla (corta en «And a teenager»);
// 3. el mapa de papel: el aro dorado en la bahía de Mahone, la chincheta que cae en Nueva Escocia y un velero que llega
//    por el Atlántico (corta en «in Mahone Bay»);  4. el claro: Daniel llega, ve el hoyo hundido, «?», da un saltito
//    y la tierra blanda cede (corta en «In a clearing»);  5. inserto: la rama del roble y la vieja polea; su mano tira
//    del chicote y la polea se balancea y cruje (corta en «and from a branch»);
// 6. la boca del pozo en 1795: vuelve con dos amigos; uno cava dentro, Daniel tira de la soga, el otro saca una losa de
//    piedra; la gaviota roba el bocadillo de la cesta (gag) (corta en «He comes back»);
// 7. el pozo en corte: cavan y cada diez pies aparece una plataforma de troncos (10, 20, 30), «!» (corta en «The story says»).''',
COMUN + fmt(r'''
const P2 = %(P2)s, P3 = %(P3)s, P4 = en('hoyo', 0), P5 = %(P5)s, P6 = en('cavan', 0), P7 = %(P7)s;
const MAR = hex('#3a6a8a');
// 1 · la bahía: la barca entra por la izquierda y rema hacia la playa de la isla
const p1 = (t) => {
  T.isla1795(R, t, { encuadre: 'bahia' });
  const u = ease(tramo(t, 0.2, P2 + 0.4)), bx = Math.round(lerp(28, 124, u)), yW = Math.round(lerp(140, 128, u) + Math.sin(t * 2.2));
  // la estela detrás de la popa
  for (let k = 1; k < 9; k++) { const sx = bx - 2 - k * 5, a = Math.round(k * 0.9); if (Math.sin(t * 6 - k) > -0.3) { R.pset(sx, yW + 1 + a, hex('#d8e8ee')); R.pset(sx, yW + 1 - Math.round(a * 0.3), hex('#b8d0dc')); } }
  const f = t * 3.6;
  R.actor(EL.mcginnis, bx + 14, yW - 2, t, { dir: -1, quieto: true });
  barca(bx, yW, 40, 6, 1, MAR);
  const r = remo(bx + 16, yW - 6, yW, 16, f, 1);
  if (r.dentro && Math.cos(f) > 0.8) { R.pset(r.bx - 2, r.by - 2, hex('#f0f8fa')); R.pset(r.bx + 2, r.by - 3, hex('#f0f8fa')); }
  T.a_islaDelante(R, t, { encuadre: 'bahia' });
};
// 2 · de cerca, la barca (fondo local): el cielo, la costa, Oak Island y el mar con filas de olas
const p2 = (t) => {
  fijo('remo', () => {
    degradado(0, 0, 319, 74, ['#4a7ec0', '#6a98cc', '#8cb0d8', '#b0c8e0', '#d4e2ea'].map(hex));
    for (let k = 0; k < 9; k++) { const y = 20 + k * 3 + (k % 3), x0 = 8 + ((k * 61) % 190), L = 26 + (k * 19) % 46; for (let i = 0; i < L; i++) if (hh(x0 + i, y, 3) > 0.35 && x0 + i < 258) R.pset(x0 + i, y + (i > L * 0.6 ? 1 : 0), hex(k % 2 ? '#dce8f0' : '#c4d6e6')); }
    // la costa de tierra firme, azulada, con píceas
    for (let x = 0; x < 230; x++) { const h = 3 + Math.round(2 * Math.sin(x * 0.05) + 2 * hh(x, 1)); for (let y = 74 - h; y <= 74; y++) R.pset(x, y, hh(x, y, 5) > 0.7 ? hex('#7a94a8') : hex('#8aa2b4'));
      if (x % 4 === 0 && hh(x, 2) > 0.45) { const th = 3 + Math.round(hh(x, 3) * 4); for (let j = 0; j < th; j++) for (let i = -(j >> 1); i <= (j >> 1); i++) R.pset(x + i, 74 - h - th + j, hex('#6a8498')); } }
    // un pueblito blanco con su campanario en la costa
    for (const [cx, w] of [[52, 5], [60, 4], [67, 5]]) { R.rect(cx, 67, cx + w, 71, hex('#e8e4dc')); R.rect(cx, 66, cx + w, 66, hex('#8a6a5a')); }
    R.rect(74, 61, 76, 71, hex('#eeeae2')); R.pset(75, 59, hex('#eeeae2')); R.pset(75, 60, hex('#eeeae2'));
    // Oak Island: la loma de robles a la derecha, con su playa
    for (let x = 178; x < 320; x++) { const u = (x - 178) / 170, top = Math.round(76 - 22 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.15)), 0.55));
      for (let y = top; y <= 76; y++) R.pset(x, y, hex('#36602c')); }
    for (let k = 0; k < 230; k++) { const x = 180 + Math.round(hh(k, 1, 7) * 140), u = (x - 178) / 170, top = 76 - 22 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.15)), 0.55), y = Math.round(top + 2 + hh(k, 2, 7) * (74 - top)), r = 2 + Math.round(hh(k, 3, 7) * 3);
      if (y > 72) continue; const c = hh(k, 4, 7); R.disco(x, y, r, hex(c < 0.3 ? '#4a7a3a' : c < 0.85 ? '#5a8a40' : c < 0.93 ? '#a88a3a' : '#c8742c')); R.disco(x - 1, y - 1, Math.max(1, r - 2), hex(c < 0.85 ? '#7aa24e' : '#d8a048')); }
    
    // el mar: más claro en el horizonte, oscuro delante
    degradado(0, 75, 319, 179, ['#8ab0c4', '#6a98b6', '#4e80a2', '#3a6a8a', '#2c5876'].map(hex));
    for (let x = 200; x < 262; x++) { R.pset(x, 75, hex('#e4d4a8')); R.pset(x, 76, hex('#d0bc8c')); if (x % 7 === 0) R.pset(x, 74, hex('#3a2a1a')); }
    for (let x = 178; x < 320; x++) for (let y = 77; y < 86; y++) if (hh(x, y, 11) < 0.35 - (y - 77) * 0.035) R.pset(x, y, hex('#3e6450'));
    // el sol arriba a la izquierda, con su halo
    R.disco(46, 30, 9, hex('#f4f0d8')); R.disco(46, 30, 7, hex('#fffbe8'));
  });
  nubes(t, [[10, 50, 30, 3.2], [120, 58, 22, 2.1], [70, 40, 26, 1.3], [150, 64, 16, 4.4]], ['#a8b8c8', '#d6e0e8', '#f6f9fa'].map(hex), 190);
  aves(t, [[20, 34, 9, 0], [44, 38, 9, 1], [200, 30, 6, 2]], hex('#2a3440'));
  // un pescador lejano que rema despacio junto a la costa
  { const fx = Math.round(120 + ((t * 2.5) % 60)), fy = 84; R.rect(fx - 6, fy - 1, fx + 6, fy + 1, hex('#5a3a20')); R.rect(fx - 5, fy - 2, fx + 5, fy - 2, hex('#8a6a44')); R.rect(fx - 1, fy - 6, fx + 1, fy - 2, hex('#3a4a6a')); R.pset(fx, fy - 7, hex('#f2c8a0'));
    const a = Math.sin(t * 3) > 0; R.linea(fx - 2, fy - 3, fx - 7, fy + (a ? 2 : 0), hex('#c8a070')); R.linea(fx + 2, fy - 3, fx + 7, fy + (a ? 0 : 2), hex('#c8a070')); }
  // algas y una boya de corcho que flotan (pasan con el agua)
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 130 - t * 18) % 400 + 400) % 400) - 40, y = 120 + k * 18; for (let i = 0; i < 9; i++) R.pset(x + i, y + Math.round(Math.sin(i * 0.9 + t * 2)), hex(i % 3 ? '#5a6a3a' : '#7a8a4a')); }
  // brillos del sol en el agua bajo el sol y filas de olas que pasan (la cámara va con la barca)
  for (let k = 0; k < 26; k++) { const y = 80 + Math.round(Math.pow(k / 26, 1.6) * 98), L = 2 + Math.round(k * 0.45), gap = 12 + k * 2, off = (t * (6 + k * 1.1) + k * 37) % gap;
    for (let x = -gap + off; x < 320; x += gap) { const xi = Math.round(x + hh(k, Math.floor((x - off) / gap), 4) * 6); const c = (k + Math.floor((x - off) / gap)) % 3 === 0 ? hex('#a8cade') : hex('#2a5470');
      R.linea(xi, y, xi + L, y, c); if (k > 12) R.linea(xi + 1, y + 1, xi + L - 1, y + 1, hex('#24506c')); } }
  for (let k = 0; k < 18; k++) { const x = 30 + Math.round(hh(k, Math.floor(t * 3 + k), 5) * 34), y = 80 + Math.round(hh(k, 9) * 40); if (Math.sin(t * 9 + k * 2) > 0.4) R.pset(x, y, hex('#fffbe0')); }
  // un pez que salta a la derecha y una gaviota que flota
  { const u = tramo(t, P2 + 2.6, P2 + 3.4); if (u > 0 && u < 1) { const x = Math.round(lerp(240, 268, u)), y = Math.round(110 - 14 * Math.sin(u * Math.PI)); R.rect(x - 3, y - 1, x + 3, y, hex('#c8d4dc')); R.pset(x + 3, y - 1, hex('#e8eef2')); R.pset(x - 4, y - 2, hex('#a8b4bc')); R.pset(x - 4, y + 1, hex('#a8b4bc')); }
    if (u >= 1 && u < 1.0001 + 0) {} const s = tramo(t, P2 + 3.4, P2 + 4.2); if (s > 0 && s < 1) { const r = Math.round(2 + s * 8); for (let i = -r; i <= r; i += 2) R.pset(268 + i, 111, hex('#e0eef4')); } }
  T.gaviota(R, 286, 160 + Math.round(Math.sin(t * 2) * 1.5), t, { pose: 'posada', dir: -1 });
  // la barca grande en el centro: Daniel rema mirando a popa; mira por encima del hombro y señala la isla
  const yW = 142 + Math.round(Math.sin(t * 2.1) * 1.5), x = 66, mira = t > P2 + 0.9 && t < P2 + 2.0, senala = t > P2 + 3.4 && t < P2 + 5.0, f = senala ? 0.6 : t * 3.4;
  for (let k = 1; k < 12; k++) { const sx = x - k * 6, a = Math.round(k * 0.7); R.pset(sx, yW + 2 + a, hex('#d8e8ee')); R.pset(sx - 2, yW + 2 - Math.round(a * 0.4), hex('#c0d6e0')); }
  R.actor(EL.mcginnis, x + 50, yW - 9, t, { dir: mira || senala ? 1 : -1, dedo: senala, sonrisa: mira || senala, quieto: true });
  // la red, el cubo y el saco a popa
  R.rect(x + 12, yW - 22, x + 22, yW - 15, hex('#8a6a3a')); R.rect(x + 13, yW - 21, x + 21, yW - 16, hex('#b08a50')); R.linea(x + 13, yW - 19, x + 21, yW - 19, hex('#6a4a24'));
  R.rect(x + 80, yW - 21, x + 87, yW - 15, hex('#5a5a62')); R.rect(x + 81, yW - 20, x + 86, yW - 16, hex('#8a8a92'));
  barca(x, yW, 110, 16, 1, MAR);
  const r = remo(x + 46, yW - 18, yW, 40, f, 1);
  if (r.dentro && Math.cos(f) > 0.6 && !senala) for (let i = 0; i < 4; i++) R.pset(r.bx - 3 + i * 2, r.by - 2 - (i % 2) * 2, hex('#f0f8fa'));
  // la espuma de la línea del agua y crestas por delante de la barca
  for (let i = 0; i < 112; i += 3) if (hh(i, Math.floor(t * 6), 2) > 0.4) R.pset(x + i, yW + 2, hex('#e8f2f6'));
  for (let k = 0; k < 6; k++) { const cx = ((k * 70 - t * 26) % 380 + 380) % 380 - 30; R.linea(Math.round(cx), 168 + (k % 2) * 6, Math.round(cx) + 10, 168 + (k % 2) * 6, hex('#a8cade')); R.linea(Math.round(cx) + 2, 167 + (k % 2) * 6, Math.round(cx) + 7, 167 + (k % 2) * 6, hex('#e8f2f6')); }
};
// 3 · el mapa de papel de Nueva Escocia: el aro en la bahía, la chincheta y un velero que llega por el Atlántico
const p3 = (t) => {
  const P = T.mapa(R, t, { zoom: 3.4, centro: [-66, 43.5] });
  const [ox, oy] = OAK(P);
  const aro = tramo(t, %(bahia)s, %(bahia)s + 1.2); if (aro > 0 && aro < 1) { const r = Math.round(4 + aro * 16); for (let k = 0; k < 48; k++) { const a = k / 48 * 6.283; if (k %% 2 === 0) R.pset(Math.round(ox + Math.cos(a) * r), Math.round(oy + Math.sin(a) * r * 0.8), T.C.oro); } }
  const cae = tramo(t, %(escocia)s - 0.5, %(escocia)s); if (cae > 0) T.chincheta(R, ox, oy, t, T.C.rojo, { baja: cae });
  // el velero que llega por el Atlántico, con su ruta de puntos
  const v = ease(tramo(t, %(costa)s - 0.6, P4 - 0.3)); if (v > 0) { const pts = [[304, 104], [276, 100], [246, 88], [ox + 8, oy + 4]]; R.recorte([10, 12, 309, 168]); R.ruta(pts, v, hex('#7a4a2a'), { grueso: 1, flecha: false });
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; } let q = L * v, i = 1; while (i < pts.length - 1 && q > seg[i - 1]) { q -= seg[i - 1]; i++; }
    const f2 = Math.min(1, q / seg[i - 1]), sx = Math.round(lerp(pts[i - 1][0], pts[i][0], f2)), sy = Math.round(lerp(pts[i - 1][1], pts[i][1], f2) + Math.sin(t * 3));
    R.poligono([[sx - 5, sy], [sx + 5, sy], [sx + 3, sy + 3], [sx - 3, sy + 3]], hex('#5a3a20')); R.poligono([[sx, sy - 9], [sx, sy - 1], [sx - 5, sy - 1]], hex('#f2ecd8')); R.poligono([[sx + 1, sy - 7], [sx + 1, sy - 1], [sx + 4, sy - 1]], hex('#e4dcc4')); R.linea(sx, sy - 10, sx, sy, hex('#3a2818'));
    R.recorte(null); }
};
// dónde cae Oak Island en el mapa: la costa sur de Nueva Escocia, al borde del agua (el contorno es simplificado)
const OAK = (P) => { const [x, y] = P(T.LUGARES.oakIsland); return [Math.round(x + OAKD[0]), Math.round(y + OAKD[1])]; };
const OAKD = [0, 0];
// 4 · el claro: Daniel llega, ve el hoyo hundido, se sorprende, da un saltito y la tierra cede
const p4 = (t) => {
  T.isla1795(R, t, { encuadre: 'claro' });
  const u = tramo(t, P4 - 0.2, %(finds)s), x = Math.round(lerp(250, 194, ease(u))), salto = t > %(filled)s && t < %(filled)s + 0.5 ? Math.round(4 * Math.sin((t - %(filled)s) / 0.5 * Math.PI)) : 0;
  const ve = t > %(finds)s + 0.1, duda = t > %(asif)s && t < %(filled)s - 0.1, arriba = t > P5 - 1.3;
  // la tierra blanda que se hunde un poco bajo el saltito: un anillo de polvo
  const pol = tramo(t, %(filled)s + 0.45, %(filled)s + 1.2); if (pol > 0 && pol < 1) for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283, r = 6 + pol * 12; R.pset(Math.round(x + 7 + Math.cos(a) * r), Math.round(146 + Math.sin(a) * r * 0.3 - pol * 3), hex('#b8a07a')); }
  // la hondonada se lee a 640 px: sombra tramada en el borde del fondo, el filo claro de tierra seca delante, hojas secas
  // y dos piedras dentro (va por debajo de Daniel)
  for (let yy = 133; yy <= 151; yy++) for (let xx = 128; xx <= 192; xx++) { const dx = (xx - 160) / 31, dy = (yy - 142) / 8.5, r = dx * dx + dy * dy; if (r > 1.1) continue;
    if (r > 0.62 && dy < 0.1) { if ((xx + yy) %% 2 === 0 || r < 0.8) R.pset(xx, yy, hex(r < 0.8 ? '#33401c' : '#26321a')); }
    else if (r > 0.82 && dy > 0.1) { if ((xx + yy) %% 2 === 0) R.pset(xx, yy, hex(r > 0.97 ? '#c8b47a' : '#9a8a52')); }
    else if (dy < -0.15 && (xx + yy * 3) %% 4 === 0) R.pset(xx, yy, hex('#3a4824'));
    else if (hh(xx, yy, 5) < 0.06) R.pset(xx, yy, hex(hh(xx, yy, 6) < 0.5 ? '#b8743a' : '#8a6a3a')); }
  for (const [px, py] of [[148, 143], [171, 141]]) { R.rect(px - 1, py, px + 2, py + 1, hex('#5a5a54')); R.pset(px, py, hex('#a8a8a0')); }
  R.actor(EL.mcginnis, x, 146, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: ve && !duda && !arriba && t < %(asif)s, dedo: duda, salto, sonrisa: arriba });
  if (duda) R.bocadillo(x + 8, 112, { icono: '?' });
  if (arriba) R.bocadillo(x + 8, 112, { icono: '!' });
  T.a_islaDelante(R, t, { encuadre: 'claro' });
};
// 5 · inserto (fondo local): la rama del roble y la vieja polea; la mano tira del chicote y la polea se balancea
const p5 = (t) => {
  fijo('rama', () => {
    // bosque al fondo, con bruma: troncos en tres términos sobre un verde grisáceo
    degradado(0, 0, 319, 179, ['#9cb494', '#8aa684', '#7a9874', '#6a8a64', '#58784e'].map(hex));
    for (const [n, c, w, k] of [[14, '#8aa08a', 6, 1], [10, '#6a7e62', 10, 2], [6, '#4a5a3e', 16, 3]]) for (let i = 0; i < n; i++) { const x = Math.round(hh(i, k, 13) * 320), ww = w + Math.round(hh(i, k, 14) * w * 0.6);
      for (let y = 0; y < 180; y++) for (let j = 0; j < ww; j++) { if ((j === 0 || j === ww - 1) && hh(x + j, y, 2) < 0.4) continue; R.pset(x + j, y, j < ww * 0.3 ? mez(hex(c), hex('#ffffff'), 0.12) : (hh(j, y >> 2, k) < 0.12 ? mez(hex(c), 0, 0.25) : hex(c))); } }
    // la bóveda de hojas arriba con huecos de cielo
    for (let k = 0; k < 420; k++) { const x = Math.round(hh(k, 1, 21) * 330) - 5, y = Math.round(hh(k, 2, 21) * 46) - 6, r = 3 + Math.round(hh(k, 3, 21) * 5); const c = hh(k, 4, 21); R.disco(x, y, r, hex(c < 0.4 ? '#36602c' : c < 0.8 ? '#4a7a3a' : '#6a9a4a')); }
    for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) if (y < 15 || hh(x, y, 2) < 0.5) R.pset(x, y, (x + y) % 2 ? hex('#2e5426') : hex('#36602c'));
    for (let y = 0; y < 50; y++) for (let x = 270; x < 320; x++) if (y < 46 || hh(x, y, 3) < 0.5) R.pset(x, y, (x + y) % 2 ? hex('#2e5426') : hex('#36602c'));
    for (let k = 0; k < 26; k++) { const x = 176 + Math.round(hh(k, 5, 21) * 86), y = 18 + Math.round(hh(k, 6, 21) * 10); R.disco(x, y, 1 + Math.round(hh(k, 7) * 2), hex('#c8dcc8')); }
    // la rama gruesa del roble, de la izquierda a la derecha, con corteza, musgo y un nudo
    for (let x = 0; x < 320; x++) { const yc = Math.round(36 + x * 0.05 + 2 * Math.sin(x * 0.03)), g = Math.round(lerp(16, 9, x / 320));
      for (let j = -g; j <= g; j++) { const y = yc + j; let c = j === -g || j === g ? hex('#2a1a0c') : j < -g * 0.4 ? hex('#8a6a44') : j > g * 0.45 ? hex('#4a3018') : hex('#6a4a2a');
        if (hh(x >> 1, y, 4) < 0.18 && Math.abs(j) < g) c = hex('#3a2412'); if ((x + (j * 3)) % 11 === 0 && Math.abs(j) < g - 1 && hh(x, j, 5) < 0.6) c = hex('#4a3018');
        if (j < -g * 0.5 && hh(x >> 2, 1, 6) < 0.35) c = hh(x, y, 7) < 0.5 ? hex('#6a8a3a') : hex('#8aa24a'); R.pset(x, y, c); } }
    R.disco(84, 41, 5, hex('#2a1a0c')); R.disco(84, 41, 4, hex('#5a3a20')); R.disco(84, 41, 2, hex('#3a2412'));
    // matas de hojas que cuelgan de la rama
    for (const [cx, cy] of [[22, 58], [60, 54], [236, 56], [282, 58], [304, 50]]) for (let k = 0; k < 14; k++) { const x = cx + Math.round((hh(k, cx) - 0.5) * 22), y = cy + Math.round(hh(k, cy) * 12); R.disco(x, y, 3, hex(hh(k, 3, cx) < 0.5 ? '#4a7a3a' : '#36602c')); R.pset(x - 1, y - 1, hex('#7aa24e')); }
    // helechos y vara de oro abajo
    for (let k = 0; k < 30; k++) { const x = Math.round(hh(k, 9, 3) * 320), h = 10 + Math.round(hh(k, 8, 3) * 16); for (let j = 0; j < h; j++) { R.pset(x + Math.round(j * 0.3), 179 - j, hex('#4a7a3a')); if (j % 3 === 0) { R.pset(x + Math.round(j * 0.3) - 2, 179 - j + 1, hex('#6a9a4a')); R.pset(x + Math.round(j * 0.3) + 2, 179 - j + 1, hex('#36602c')); } }
      if (k % 4 === 0) R.disco(x + Math.round(h * 0.3), 179 - h, 2, hex('#d8b030')); }
  });
  // rayos de luz con motas que suben y bajan
  for (let y = 40; y < 180; y++) for (const [x0, w] of [[150, 14], [214, 9]]) { const x = Math.round(x0 + (y - 40) * 0.45); for (let j = 0; j < w; j++) if ((x + j + y) % 3 === 0) R.pset(x + j, y, mez(R.pget(x + j, y), hex('#fff4c8'), 0.28)); }
  for (let k = 0; k < 12; k++) { const x = Math.round(150 + (k * 13) % 70 + 6 * Math.sin(t * 0.6 + k)), y = Math.round(60 + ((k * 31 + t * 5) % 110)); R.pset(x + Math.round((y - 40) * 0.45) - 60, y, hex('#fff8dc')); }
  // las hojas que caen
  for (let k = 0; k < 4; k++) { const y = ((t * 14 + k * 50) % 210) - 20, x = Math.round(40 + k * 80 + 10 * Math.sin(t * 1.6 + k)); R.rect(x, Math.round(y), x + 2, Math.round(y) + 1, hex(k % 2 ? '#c8a03a' : '#b8742c')); }
  // el carbonero que salta por la rama
  { const hop = Math.floor((t - P5) / 0.7), xb = Math.round(250 - Math.min(5, hop) * 9 - (((t - P5) % 0.7) / 0.7) * 9 * (hop < 5 ? 1 : 0)), yb = Math.round(36 + xb * 0.05 + 2 * Math.sin(xb * 0.03)) - 10 - Math.round(Math.sin(((t - P5) % 0.7) / 0.7 * Math.PI) * 3);
    R.rect(xb, yb + 2, xb + 5, yb + 5, hex('#e8d040')); R.rect(xb, yb, xb + 3, yb + 2, hex('#1a1a1a')); R.pset(xb + 1, yb + 1, hex('#f2f2f2')); R.pset(xb - 1, yb + 1, hex('#2a2a2a')); R.rect(xb + 4, yb + 2, xb + 7, yb + 3, hex('#6a7a5a')); R.pset(xb + 2, yb + 6, hex('#3a3a3a')); R.pset(xb + 4, yb + 6, hex('#3a3a3a')); }
  // la polea grande colgada de la rama: se balancea sola y, con el tirón, más fuerte
  const tir = %(hangs)s, w1 = (tt) => Math.sin(tt * 1.35) * 0.16 + Math.sin(tt * 0.53 + 1) * 0.06, d = t - tir;
  const giro = d > 0 ? w1(t) + 0.32 * Math.exp(-d * 0.9) * Math.sin(d * 3.2) : undefined;
  const b = T.polea(R, 164, Math.round(36 + 164 * 0.05 + 2 * Math.sin(164 * 0.03)) + 6, t, { s: 3, largo: 14, giro });
  if (d > 0.2 && d < 2.6 && Math.abs(Math.sin(d * 3.2)) > 0.9) for (const k of [0, 1]) { R.rect(178 + k * 6, 46 + k * 3, 180 + k * 6, 51 + k * 3, hex('#f4ecd0')); R.rect(146 - k * 6, 46 + k * 3, 148 - k * 6, 51 + k * 3, hex('#f4ecd0')); }
  // la mano de Daniel: entra por abajo, coge el chicote y tira
  const m = tramo(t, tir - 1.4, tir - 0.3), sal = tramo(t, tir + 0.9, tir + 1.8), tirY = d > 0 && d < 0.6 ? Math.round(Math.sin(d / 0.6 * Math.PI) * 6) : 0;
  if (m > 0 && sal < 1) { const wx = Math.round(lerp(150, b.x - 12, ease(m)) + sal * -20), wy = Math.round(lerp(196, Math.min(170, b.y + 26), ease(m)) + tirY + sal * 40);
    T.brazo(R, 104, 214, wx, wy, '#b89a6a', 1, { codo: [126, 190] }); }
};
// 6 · la boca del pozo en 1795: vuelven los tres, cavan, la losa; la gaviota roba el bocadillo (gag)
const p6 = (t) => {
  const g = T.pozo(R, t, { encuadre: 'boca', epoca: '1795', cubo: 0.15 + 0.35 * (0.5 + 0.5 * Math.sin((t - P6) * 1.6)) });
  // guarda el brocal de delante para tapar las piernas del que cava dentro
  const tapa = []; for (let y = 136; y <= 154; y++) for (let x = 134; x <= 186; x++) tapa.push(R.pget(x, y));
  const cava = t > %(digging)s - 0.3, golpe = Math.sin((t - P6) * 5.2);
  R.actor(EL.amigo2, 152, 146 - (cava && golpe > 0.4 ? 1 : 0), t, { dir: 1, quieto: true, enfado: cava && golpe > 0.7 });
  // la pala del de dentro y los terrones que salen volando al montón
  if (cava) { const up = golpe > 0; R.linea(164, up ? 118 : 126, 172, up ? 112 : 132, hex('#6a4a2a')); R.rect(170, up ? 108 : 130, 174, up ? 112 : 134, hex('#8a8a92'));
    const ph = ((t - P6) * 5.2 / 6.283) % 1; if (ph > 0.1 && ph < 0.6) { const u = (ph - 0.1) / 0.5; for (let k = 0; k < 3; k++) R.rect(Math.round(lerp(172, 206 + k * 6, u)), Math.round(110 - 22 * Math.sin(u * Math.PI) + k * 2 + u * 22), Math.round(lerp(172, 206 + k * 6, u)) + 1, Math.round(110 - 22 * Math.sin(u * Math.PI) + k * 2 + u * 22) + 1, hex('#7a5a3a')); } }
  // la losa que sale del hoyo
  const losa = tramo(t, %(flat)s - 0.6, %(flat)s);
  let i = 0; for (let y = 136; y <= 154; y++) for (let x = 134; x <= 186; x++) { const c = tapa[i++]; if (y >= 140) R.pset(x, y, c); }
  // Daniel entra por la izquierda y tira de la soga de la polea; el otro amigo entra por la derecha y levanta la losa
  const a = tramo(t, P6 - 0.3, %(digging)s - 0.2), xd = Math.round(lerp(-18, 108, ease(a)));
  const mira = t > %(roba)s && t < P7, tira = t > %(digging)s && !mira;
  R.actor(EL.mcginnis, xd, 160, t, { dir: mira ? -1 : 1, anda: a > 0 && a < 1, brazos: tira && Math.sin(t * 6) > 0, dedo: mira, enfado: mira });
  if (tira) R.linea(xd + 14, 136 - (Math.sin(t * 6) > 0 ? 4 : 0), 156, 104, hex('#c8a46a'));
  const b2 = tramo(t, P6 - 0.2, %(digging)s), xa = Math.round(lerp(338, 196, ease(b2))), sube = t > %(flat)s;
  R.actor(EL.amigo1, xa, 160, t, { dir: -1, anda: b2 > 0 && b2 < 1, brazos: sube, sonrisa: sube });
  if (losa > 0) { const lx = Math.round(sube ? xa - 4 : lerp(162, xa - 2, losa)), ly = Math.round(sube ? 124 : lerp(132, 128, losa)); R.rect(lx - 1, ly - 1, lx + 22, ly + 4, hex('#3a3a40')); R.rect(lx, ly, lx + 21, ly + 3, hex('#9a9aa2')); R.rect(lx, ly, lx + 21, ly, hex('#c4c4cc')); R.pset(lx + 6, ly + 2, hex('#7a7a82')); R.pset(lx + 15, ly + 1, hex('#7a7a82')); }
  // la cesta del almuerzo junto a la tienda y la gaviota que roba el bocadillo
  const fase = tramo(t, %(roba)s - 1.6, %(roba)s + 1.2), lleva = fase >= 0.62;
  R.rect(58, 160, 78, 170, hex('#3a2412')); R.rect(59, 161, 77, 169, hex('#b08040')); for (let x = 60; x < 77; x += 3) R.linea(x, 161, x + 1, 169, hex('#8a6028')); R.linea(59, 164, 77, 164, hex('#8a6028'));
  for (let x = 58; x <= 78; x++) R.pset(x, 154 + Math.round(Math.abs(x - 68) * 0.4), hex('#6a4a24'));
  for (let x = 60; x <= 70; x++) for (let y = 157; y <= 160; y++) R.pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? hex('#c83a3a') : hex('#f2eee2'));
  if (!lleva) { R.rect(70, 155, 77, 159, hex('#3a2412')); R.rect(71, 156, 76, 157, hex('#e8c88a')); R.rect(71, 158, 76, 158, hex('#7aa24e')); }
  R.disco(64, 157, 2, hex('#c8282a')); R.pset(63, 156, hex('#f08080'));
  if (fase > 0) T.gaviota(R, 90, 170, t, { fase });
};
// 7 · el pozo en corte, 1795: cavan, y cada diez pies aparece una plataforma de troncos (10, 20, 30)
const p7 = (t) => {
  const h1 = %(every)s, h2 = %(platform)s, h3 = %(purpose)s;
  const fondo = t < h1 ? lerp(5, 10, tramo(t, P7, h1)) : t < h2 ? lerp(10, 20, tramo(t, h1 + 0.25, h2)) : lerp(20, 30, tramo(t, h2 + 0.25, h3));
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1795', fondo, cubo: 0.4 + 0.3 * Math.sin(t * 1.4) });
  const yF = Math.round(g.fondoY ?? (52 + 1.2 * fondo));
  // el que cava abajo: la pala sube y baja
  const golpe = Math.sin(t * 6);
  R.actor(EL.amigo2, 105, yF, t, { dir: 1, quieto: true, sorpresa: [h1, h2, h3].some((h) => t > h && t < h + 0.7) });
  R.linea(116, yF - 12 + (golpe > 0 ? -3 : 2), 121, yF - 3 + (golpe > 0 ? -3 : 2), hex('#6a4a2a'));
  // arriba: Daniel tira de la soga y el otro mira dentro con el farol
  R.actor(EL.mcginnis, 128, 52, t, { dir: -1, brazos: Math.sin(t * 5) > 0, sonrisa: t > h3 });
  R.actor(EL.amigo1, 80, 52, t, { dir: 1, dedo: t > h2, sorpresa: t > h1 && t < h1 + 1 });
  // cada plataforma que aparece: un destello en sus troncos y su número de pies al lado
  [[10, h1], [20, h2], [30, h3]].forEach(([p, h]) => { if (t < h - 0.05) return; const y = Math.round(52 + 1.2 * p) + 2, a = t - h;
    if (a < 0.9 && Math.floor(a * 8) % 2 === 0) { R.rect(100, y - 3, 124, y - 3, T.C.oro); R.rect(100, y + 3, 124, y + 3, T.C.oro); }
    R.numero(String(p), 80, y + 4, { tam: 8, color: T.C.oro, n: Math.round(tramo(t, h, h + 0.3) * 20) }); });
  if (t > h3 + 0.1 && t < h3 + 1.6) R.bocadillo(113, yF - 30, { icono: '!' });
};
const efectos = [[1.5, 'ola'], [P2 + 0.4, 'chof'], [%(escocia)s, 'golpecito'], [%(asif)s, 'pop'], [%(filled)s + 0.45, 'golpecito'], [P5 + 0.2, 'viento'], [%(hangs)s, 'toc'],
  [%(digging)s, 'golpecito'], [%(flat)s, 'toc'], [%(roba)s, 'boing'], [%(every)s, 'toc'], [%(platform)s, 'toc'], [%(purpose)s + 0.1, 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1795', efectos, año: 1795 });
''', dict(
    P2=F('bahia', 5.79), P3=F('bahia', 11.31), P5=F('hoyo', 22.34), P7=F('cavan', 33.52),
    bahia=F('bahia', 11.63), escocia=F('bahia', 12.93), costa=F('bahia', 14.39),
    finds=F('hoyo', 18.02), asif=F('hoyo', 19.57), filled=F('hoyo', 20.95), hangs=F('hoyo', 26.2),
    digging=F('cavan', 30.26), flat=F('cavan', 32.21), roba=F('cavan', 32.3),
    every=F('cavan', 35.01), platform=F('cavan', 35.98), purpose=F('cavan', 38.19))))

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['oi-picos'] = ('Marcas de pico', '''// OI-PICOS (frases 4–5), 1795 → 1909. Cuatro planos:
// 1. inserto (fondo local): la pared de arcilla del pozo a la luz del farol colgado; la mano de Daniel repasa las marcas
//    de pico, que brillan al tocarlas (corta en «a sign»);
// 2. el fondo del pozo: los tres se miran; a los treinta pies se rinden: tiran el pico y suben por la escalera
//    (corta en «But word spreads»);
// 3. la orilla sur: llega una barca de buscadores con palas y el capataz de una compañía señala la isla; los años pasan
//    en la barra (1803 → 1849) (corta en «steam engines»);
// 4. fondo local, 1909: la isla con la torre y la caldera de vapor que humea; una lancha de vapor pasa por delante con
//    un joven de traje en la proa que señala la isla (corta en «steam engines»).''',
COMUN + fmt(r'''
const P2 = %(P2)s, P3 = %(P3)s, P4 = %(P4)s;
// 1 · la pared de arcilla con marcas de pico a la luz del farol
const NAIL = [104, 58], MARCAS = [];
for (let k = 0; k < 46; k++) { const cx = 150 + Math.round(hh(k, 1, 31) * 120), cy = 76 + Math.round(hh(k, 2, 31) * 86); if (Math.hypot(cx - 218, cy - 124) < 70) MARCAS.push([cx, cy, 10 + Math.round(hh(k, 3, 31) * 8), hh(k, 4, 31) < 0.5 ? 1 : -1]); }
const p1 = (t) => {
  fijo('pared', () => {
    degradado(0, 0, 319, 179, ['#b8987a', '#a8886a', '#9a7a5a', '#8a6a4c', '#7a5a40'].map(hex));
    // estratos ondulados, manchas de humedad, cantos, raíces
    for (const [y0, c, a] of [[30, '#b8987a', 3], [62, '#8a6a4a', 4], [104, '#a07e5c', 3], [140, '#6a4e36', 5]]) for (let x = 0; x < 320; x++) { const y = Math.round(y0 + a * Math.sin(x * 0.04 + y0)); for (let j = 0; j < 4; j++) if (hh(x, y + j, 8) > 0.25) R.pset(x, y + j, hex(c)); }
    for (let k = 0; k < 4000; k++) { const x = Math.round(hh(k, 1, 41) * 319), y = Math.round(hh(k, 2, 41) * 179); R.pset(x, y, mez(R.pget(x, y), hh(k, 3, 41) < 0.5 ? hex('#5a4030') : hex('#d8bc98'), 0.35)); }
    for (let k = 0; k < 9; k++) { const cx = Math.round(hh(k, 5, 41) * 320), cy = Math.round(hh(k, 6, 41) * 180); for (let j = 0; j < 140; j++) { const x = cx + Math.round((hh(j, k, 7) - 0.5) * 40), y = cy + Math.round((hh(j, k, 8) - 0.5) * 22); R.pset(x, y, mez(R.pget(x, y), hex('#4a3424'), 0.3)); } }
    for (let k = 0; k < 2500; k++) { const x = Math.round(hh(k, 11, 41) * 319), y = Math.round(hh(k, 12, 41) * 179); R.pset(x, y, hex(hh(k, 13, 41) < 0.5 ? '#6a4a30' : '#c8a882')); }
    for (let k = 0; k < 12; k++) { let x = Math.round(hh(k, 14, 41) * 300), y = Math.round(hh(k, 15, 41) * 170); for (let j = 0; j < 14; j++) { x++; y += Math.round((hh(j, k, 46) - 0.5) * 2); R.pset(x, y, hex('#4a3020')); } }
    for (let k = 0; k < 10; k++) { const x = Math.round(hh(k, 16, 41) * 300), y = 30 + Math.round(hh(k, 17, 41) * 130); R.pset(x, y, hex('#f0ece0')); R.pset(x + 1, y, hex('#d8d0c0')); R.pset(x, y + 1, hex('#b8b0a0')); }
    for (let k = 0; k < 70; k++) { const x = Math.round(hh(k, 7, 41) * 316), y = 20 + Math.round(hh(k, 8, 41) * 150), r = 1 + Math.round(hh(k, 9, 41) * 3); R.disco(x, y + 1, r, hex('#4a3a2c')); R.disco(x, y, r, hex(hh(k, 1) < 0.5 ? '#8a8a84' : '#a49a8a')); R.pset(x - 1, y - r + 1, hex('#d8d4c8')); }
    for (let k = 0; k < 5; k++) { let x = 30 + k * 60 + Math.round(hh(k, 2, 43) * 20); for (let y = 16; y < 16 + 24 + k * 6; y++) { x += Math.round((hh(y, k, 44) - 0.5) * 1.6); R.pset(x, y, hex('#3a2818')); if (hh(y, k, 45) < 0.12) R.pset(x + 1, y, hex('#3a2818')); } }
    // arriba, los muñones de la plataforma de troncos cortada, de punta (fuera de la zona del año y de Atom)
    for (let i = 0; i < 6; i++) { const cx = 182 + i * 15; R.disco(cx, 22, 7, hex('#2a1a0c')); R.disco(cx, 22, 6, hex('#a8865a')); R.disco(cx, 22, 4, hex('#8a6a44')); R.disco(cx, 22, 2, hex('#a8865a')); R.pset(cx, 22, hex('#5a3a20')); R.pset(cx + 2, 20, hex('#c8a678')); }
    // la escalera de mano a la izquierda
    for (const x of [14, 34]) { R.rect(x, 0, x + 3, 179, hex('#5a3a20')); R.rect(x, 0, x, 179, hex('#2a1a0c')); R.rect(x + 1, 0, x + 1, 179, hex('#8a6a44')); }
    for (let y = 8; y < 180; y += 14) { R.rect(17, y, 34, y + 2, hex('#7a5a34')); R.rect(17, y, 34, y, hex('#a8865a')); R.rect(17, y + 3, 34, y + 3, hex('#3a2412')); }
    // las marcas de pico: tajos en diagonal (sombra arriba, luz abajo)
    for (const [cx, cy, L, s] of MARCAS) { for (let i = 0; i < L; i++) { const x = cx + i, y = cy + Math.round(s * i * 0.55), w = i < 2 || i > L - 3 ? 0 : 1; R.pset(x, y - 1, hex('#5a3e28')); R.pset(x, y, hex('#2a180c')); if (w) R.pset(x, y + 1, hex('#3a2416')); R.pset(x, y + 1 + w, hex('#6a4a30')); R.pset(x, y + 2 + w, hex('#e0c49c')); }
      R.pset(cx + L, cy + Math.round(s * L * 0.55) + 1, hex('#8a6a4a')); R.pset(cx + L + 1, cy + Math.round(s * L * 0.55) + 2, hex('#8a6a4a')); }
    // el pico apoyado abajo a la izquierda, el cubo y las piedras sueltas del suelo
    R.linea(52, 178, 74, 120, hex('#2a180c')); R.linea(53, 178, 75, 120, hex('#7a5a34')); R.linea(54, 178, 76, 120, hex('#5a3a20'));
    R.poligono([[62, 118], [90, 112], [92, 115], [76, 122], [60, 126]], hex('#3a3a42')); R.linea(62, 118, 90, 113, hex('#8a8a94')); R.pset(91, 113, hex('#c8c8d0'));
    R.rect(238, 156, 262, 179, hex('#2a1a0c')); R.rect(240, 158, 260, 179, hex('#6a4a2a')); for (let x = 242; x < 260; x += 4) R.rect(x, 158, x, 179, hex('#4a3018')); R.rect(239, 162, 261, 163, hex('#5a5a62')); R.rect(239, 172, 261, 173, hex('#5a5a62')); R.rect(240, 158, 260, 159, hex('#8a6a44'));
    for (let k = 0; k < 14; k++) { const x = 90 + Math.round(hh(k, 1, 61) * 140), y = 172 + Math.round(hh(k, 2, 61) * 7), r = 1 + Math.round(hh(k, 3, 61) * 2); R.disco(x, y, r, hex('#5a4a3a')); R.pset(x - 1, y - 1, hex('#a49a8a')); }
    // el clavo del farol
    R.rect(NAIL[0] - 1, NAIL[1] - 1, NAIL[0] + 1, NAIL[1] + 1, hex('#3a3a40'));
  });
  // el agua que rezuma por una veta y gotea
  for (let k = 0; k < 3; k++) { const x = 70 + k * 96, ph = ((t + k * 0.8) % 1.6) / 1.6; R.linea(x, 30, x, 30 + Math.round(ph * 4), hex('#6a8a9a')); if (ph > 0.3) R.pset(x, Math.round(34 + (ph - 0.3) * 160), hex('#a8c8d8')); }
  // la soga del cubo que baja por la derecha y se mece
  { const ox = Math.round(Math.sin(t * 1.3) * 2); for (let y = 0; y < 156; y++) { const x = 266 + Math.round(ox * y / 156); R.pset(x, y, (y >> 1) % 2 ? hex('#c8a46a') : hex('#8a6a3a')); } }
  // una lombriz que asoma de la arcilla
  { const s = Math.sin(t * 2.3), x = 60, y = 150; for (let i = 0; i < 6; i++) R.pset(x + i, y + Math.round(Math.sin(t * 4 + i) * 1), hex('#c87a7a')); R.pset(x + 6, y + Math.round(s), hex('#e09a9a')); }
  // el farol colgado del clavo, que aún se balancea, y su luz
  const sw = Math.sin(t * 3.1) * 0.22 * Math.exp(-t * 0.25) + Math.sin(t * 1.1) * 0.03, lx = Math.round(NAIL[0] + Math.sin(sw) * 14), ly = Math.round(NAIL[1] + Math.cos(sw) * 14);
  const radio = lerp(78, 140, ease(tramo(t, %(notice)s, %(marks)s))) + Math.sin(t * 17) * 2 + Math.sin(t * 7.3) * 2;
  const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - lx, (y - ly - 10) * 1.15) / radio; if (d > 0.35) B[y * 320 + x] = mez(B[y * 320 + x], hex('#140c08'), Math.min(0.86, (d - 0.35) * 1.15)); else if (d < 0.2) B[y * 320 + x] = mez(B[y * 320 + x], hex('#fff0b0'), (0.2 - d) * 0.9); }
  R.linea(NAIL[0], NAIL[1], lx, ly, hex('#3a3a40'));
  R.rect(lx - 4, ly, lx + 4, ly + 2, hex('#2a2a30')); R.rect(lx - 5, ly + 3, lx + 5, ly + 17, hex('#2a2a30')); R.rect(lx - 4, ly + 4, lx + 4, ly + 15, hex('#f8e8a0'));
  R.rect(lx - 1, ly + 4, lx + 1, ly + 15, hex('#3a3a40')); R.disco(lx, ly + 11, 2 + (Math.sin(t * 19) > 0 ? 1 : 0), hex('#f8a830')); R.pset(lx, ly + 9, hex('#fffbe0')); R.rect(lx - 5, ly + 16, lx + 5, ly + 17, hex('#4a4a52'));
  // la mano de Daniel entra por abajo a la derecha y repasa un tajo con el dedo; los tajos brillan
  const m = tramo(t, %(marks)s - 0.9, %(marks)s), sale = tramo(t, P2 - 0.6, P2 + 0.2), tr = tramo(t, %(marks)s, %(marks)s + 1.4);
  if (m > 0 && sale < 1) { const [cx, cy] = [250, 150], wx = Math.round(lerp(336, cx + 14 + tr * 12, ease(m)) + sale * 40), wy = Math.round(lerp(196, cy + 2 + tr * 6, ease(m)) + sale * 40);
    T.brazo(R, 346, 198, wx, wy, '#d8c8a0', -1, { codo: [306, 190] });
    if (tr > 0 && tr < 1 && Math.floor(t * 10) % 3 === 0) R.pset(wx - 14, wy + 4, hex('#b8987a')); }
  const brilla = tramo(t, %(marks)s + 0.1, %(marks)s + 0.5) - tramo(t, %(marks)s + 1.6, %(marks)s + 2.4);
  if (brilla > 0) for (const [cx, cy, L, s] of MARCAS) for (let i = 0; i < L; i += 1) if ((i + Math.floor(t * 12)) % 4 !== 0) R.pset(cx + i, cy + Math.round(s * i * 0.55) + 2, mez(hex('#d0b08a'), hex('#fff4b0'), brilla));
};
// 2 · el fondo del pozo: los tres se miran; se rinden y suben por la escalera
const p2 = (t) => {
  T.pozo(R, t, { encuadre: 'fondo', agua: 0.12 });
  const miran = t > %(sign)s && t < %(giveup)s, rinden = t > %(giveup)s;
  // Daniel va hacia la escalera y sube
  const a = tramo(t, %(giveup)s - 0.1, %(giveup)s + 0.7), sube = tramo(t, %(giveup)s + 0.7, P3 + 0.3), xd = Math.round(lerp(96, 24, ease(a)));
  R.actor(EL.mcginnis, xd, Math.round(162 - sube * 46), t, { dir: a > 0 && a < 1 ? -1 : miran ? 1 : 1, anda: (a > 0 && a < 1) || (sube > 0 && sube < 1), sorpresa: t < %(sign)s + 0.6 && miran, triste: rinden });
  R.actor(EL.amigo1, 140, 164, t, { dir: miran && Math.floor((t - %(sign)s) / 0.8) % 2 ? 1 : -1, sorpresa: miran, triste: rinden, dedo: t > P2 + 0.2 && t < %(sign)s });
  // el otro tira el pico al suelo
  const tira = tramo(t, %(giveup)s + 0.1, %(giveup)s + 0.45);
  R.actor(EL.amigo2, 176, 164, t, { dir: -1, sorpresa: miran, triste: rinden, enfado: t > %(giveup)s - 0.4 && t < %(giveup)s + 0.2 });
  if (tira < 1) { const px = Math.round(lerp(180, 196, tira)), py = Math.round(lerp(140, 162, tira * tira)); R.linea(px, py, px - 2, py + 12, hex('#6a4a2a')); R.linea(px - 5, py - 1, px + 6, py + 2, hex('#7a7a84')); R.pset(px + 6, py + 2, hex('#c8c8d0')); }
  else { R.linea(186, 166, 200, 165, hex('#6a4a2a')); R.linea(196, 160, 199, 168, hex('#7a7a84')); }
  if (tira > 0.9 && tira < 1) for (let k = 0; k < 6; k++) R.pset(190 + k * 2, 163 - (k % 2) * 2, hex('#a8865a'));
  if (miran && t < %(sign)s + 1.2) R.bocadillo(148, 128, { icono: '?' });
  // gotas que caen de arriba y salpican
  for (let k = 0; k < 3; k++) { const x = 120 + k * 40, ph = ((t * 0.9 + k * 0.37) % 1); if (ph < 0.8) R.pset(x, Math.round(ph / 0.8 * 150), hex('#a8c8d8')); else R.pset(x + (k % 2 ? 1 : -1), 158, hex('#c8e0ea')); }
};
// 3 · la orilla sur: llega la barca de los buscadores; el capataz de la compañía señala la isla
const p3 = (t) => {
  T.smithsCove(R, t, { encuadre: 'sur' });
  const u = ease(tramo(t, P3 - 0.3, P3 + 1.5)), bx = Math.round(lerp(300, 150, u)), yW = Math.round(lerp(132, 156, u) + Math.sin(t * 2.4));
  const baja = (k) => tramo(t, P3 + 1.6 + k * 0.45, P3 + 2.4 + k * 0.45);
  const quien = [[EL.cavador, 0], [EL.cavador2, 1], [EL.capataz, 2]];
  // los que siguen en la barca (detrás de la borda)
  for (const [d, k] of quien) if (baja(k) === 0) R.actor(d, bx + 12 + k * 15, yW - 8, t, { dir: -1, quieto: true, sonrisa: k === 2 });
  barca(bx, yW, 58, 8, -1, hex('#3a6a8a'));
  remo(bx + 30, yW - 8, yW, 20, u < 1 ? t * 3.4 : 0.8, -1);
  // los que ya han saltado a la losa: van a su sitio con la pala al hombro
  const sitio = [96, 64, 34];
  for (const [d, k] of quien) { const b = baja(k); if (b === 0) continue; const x = Math.round(lerp(bx + 8 + k * 15, sitio[k], ease(b))), s = Math.round(lerp(yW - 4, 152 + k * 4, Math.min(1, b * 2.2)));
    const habla = k === 2 && t > %(companies)s; R.actor(d, x, s, t, { dir: b < 1 ? -1 : k === 2 ? 1 : 1, anda: b > 0 && b < 1, dedo: habla, habla: habla && Math.sin(t * 8) > 0, sonrisa: b >= 1 && k < 2 });
    if (k < 2) { const hx = x + (b < 1 ? 2 : 12); R.linea(hx, s - 22, hx + (b < 1 ? -6 : 6), s - 6, hex('#6a4a2a')); R.rect(hx + (b < 1 ? -8 : 5), s - 7, hx + (b < 1 ? -5 : 8), s - 3, hex('#8a8a92')); }
    if (k === 2 && b >= 1) { R.rect(x + 14, s - 18, x + 24, s - 12, hex('#3a2818')); R.rect(x + 15, s - 17, x + 23, s - 13, hex('#e8dcb8')); R.linea(x + 16, s - 15, x + 21, s - 14, hex('#c84a3a')); R.pset(x + 21, s - 15, hex('#c84a3a')); } }
  if (u >= 1 && u < 1.0) {}
};
// 4 · fondo local, 1909: la isla con la torre y la caldera humeando; la lancha de vapor con el joven de traje
const p4 = (t) => {
  fijo('lancha', () => {
    degradado(0, 0, 319, 92, ['#5a86b8', '#7a9cc4', '#a8b8cc', '#d8c8b4', '#ecc898'].map(hex));
    for (let k = 0; k < 8; k++) { const y = 22 + k * 4, x0 = 10 + ((k * 47) % 200), L = 24 + (k * 23) % 40; for (let i = 0; i < L; i++) if (hh(x0 + i, y, 6) > 0.4 && x0 + i < 258) R.pset(x0 + i, y, hex('#e8dcd0')); }
    R.disco(250, 78, 10, hex('#f8e0a8')); R.disco(250, 78, 8, hex('#fff2c8'));
    // la costa lejana a la derecha
    for (let x = 150; x < 320; x++) { const h = 2 + Math.round(2 * hh(x, 1, 3) + Math.sin(x * 0.07)); for (let y = 92 - h; y <= 92; y++) R.pset(x, y, hex('#9a9aac')); }
    // la isla grande a la izquierda: robles, la playa y el claro con la torre
    for (let x = 0; x < 196; x++) { const top = Math.round(96 - 30 * Math.pow(Math.sin(Math.PI * Math.min(1, (x + 30) / 240)), 0.6)); for (let y = top; y <= 98; y++) R.pset(x, y, hex('#36602c')); }
    for (let k = 0; k < 260; k++) { const x = Math.round(hh(k, 1, 17) * 196), top = 96 - 30 * Math.pow(Math.sin(Math.PI * Math.min(1, (x + 30) / 240)), 0.6), y = Math.round(top + 2 + hh(k, 2, 17) * (94 - top)), r = 2 + Math.round(hh(k, 3, 17) * 4); if (y > 94) continue;
      const c = hh(k, 4, 17); R.disco(x, y, r, hex(c < 0.35 ? '#4a7a3a' : c < 0.88 ? '#5a8a40' : '#b8862c')); R.disco(x - 1, y - 1, Math.max(1, r - 2), hex(c < 0.88 ? '#86ae5a' : '#e0aa4a')); }
    for (let x = 0; x < 196; x++) { R.pset(x, 97, hex('#e4cfa0')); R.pset(x, 98, hex('#c8b080')); if (hh(x, 7) < 0.1) R.pset(x, 96, hex('#6a6a6a')); }
    // la torre de celosía de 1909 en el claro
    for (let y = 40; y < 76; y++) { const w = Math.round(3 + (y - 40) * 0.2); R.pset(104 - w, y, hex('#4a3a2a')); R.pset(104 + w, y, hex('#4a3a2a')); if (y % 6 === 0) R.linea(104 - w, y, 104 + w, y, hex('#5a4a3a')); if (y % 6 === 3) { R.pset(104, y, hex('#5a4a3a')); } }
    R.rect(101, 38, 107, 40, hex('#2a2a2a')); R.disco(104, 37, 2, hex('#5a5a5a'));
    // la caldera con su chimenea
    R.rect(120, 66, 138, 76, hex('#2a2a30')); R.rect(121, 67, 137, 72, hex('#4a4a52')); R.rect(121, 67, 137, 67, hex('#7a7a84')); R.rect(126, 50, 129, 66, hex('#2a2a30')); R.rect(127, 50, 127, 66, hex('#5a5a62')); R.rect(122, 73, 126, 75, hex('#e87a2a'));
    // las tiendas de los buscadores, el muelle de tablas y los montones de tierra
    for (const [tx, ty] of [[40, 82], [58, 84], [160, 82]]) { R.poligono([[tx - 6, ty + 6], [tx, ty - 2], [tx + 6, ty + 6]], hex('#e8e0c8')); R.linea(tx, ty - 2, tx + 6, ty + 6, hex('#b8ae96')); R.pset(tx, ty + 5, hex('#3a2a1a')); }
    for (const [mx, my] of [[84, 80], [146, 82]]) { R.disco(mx, my + 3, 5, hex('#8a6a44')); R.disco(mx - 1, my + 2, 3, hex('#a8865a')); }
    R.rect(150, 96, 196, 97, hex('#7a5a34')); R.rect(150, 96, 196, 96, hex('#a8865a')); for (let x = 152; x <= 196; x += 6) R.rect(x, 98, x, 104, hex('#4a3018'));
    // la costa lejana se une con el mar
    
    // el mar
    degradado(196, 93, 319, 98, ['#d8b890', '#d0b490'].map(hex));
    degradado(0, 99, 319, 179, ['#d8b890', '#8aa0b0', '#5a809e', '#3e6886', '#2c5470'].map(hex));
    for (let y = 99; y < 112; y++) for (let x = 0; x < 196; x++) if (hh(x, y, 4) < 0.4 - (y - 99) * 0.03) R.pset(x, y, hex('#3a5a40'));
  });
  nubes(t, [[20, 58, 30, 2.2], [160, 64, 24, 3.4], [230, 54, 36, 1.4]], ['#b89a8a', '#e0c8b8', '#f8e8d8'].map(hex));
  aves(t, [[40, 40, 7, 0], [62, 44, 7, 1], [180, 36, 5, 2]], hex('#3a3440'));
  // el humo de la caldera: bocanadas grandes en «steam engines»
  const pu = tramo(t, P4, P4 + 0.8);
  for (let k = 0; k < 7; k++) { const a = ((t * 0.5 + k / 7) % 1), x = Math.round(130 + a * 70 + Math.sin(t + k) * 2), y = Math.round(48 - a * 18), r = Math.round(2 + a * 6 + pu * 3 * (1 - a)); R.disco(x, y, r, hex(a < 0.5 ? '#e8e8e8' : '#c8c8cc')); R.disco(x - 1, y - 1, Math.max(1, r - 2), hex('#f8f8f8')); }
  if (pu > 0 && pu < 1) for (let k = 0; k < 4; k++) R.disco(130 + k * 5, Math.round(46 - pu * 12 - k * 2), Math.round(3 + pu * 4), hex('#ffffff'));
  // gente pequeña en la isla: dos buscadores que van y vienen con carretillas
  for (let k = 0; k < 2; k++) { const x = Math.round(70 + k * 60 + 18 * Math.sin(t * 0.8 + k * 2)), y = 86 + k * 3; R.rect(x, y - 5, x + 1, y - 2, hex(k ? '#3a4a6a' : '#7a3a2a')); R.pset(x, y - 6, hex('#f0c8a0')); R.pset(x, y - 1, hex('#2a2a2a')); R.pset(x + 1, y - 1, hex('#2a2a2a')); R.rect(x + 2, y - 3, x + 4, y - 2, hex('#6a4a2a')); }
  // olas que avanzan y brillos del sol
  for (let k = 0; k < 22; k++) { const y = 102 + Math.round(Math.pow(k / 22, 1.6) * 76), L = 2 + Math.round(k * 0.5), gap = 12 + k * 2, off = (t * (3 + k * 0.6) + k * 41) % gap;
    for (let x = -gap + off; x < 320; x += gap) { const xi = Math.round(x + hh(k, Math.floor((x - off) / gap), 6) * 6); R.linea(xi, y, xi + L, y, (k + Math.floor((x - off) / gap)) % 3 === 0 ? hex('#f0d0a0') : hex('#284c66')); } }
  for (let k = 0; k < 14; k++) { const x = 236 + Math.round(hh(k, Math.floor(t * 3 + k), 5) * 28), y = 100 + Math.round(hh(k, 9) * 30); if (Math.sin(t * 9 + k * 2) > 0.3) R.pset(x, y, hex('#fff4d0')); }
  // la lancha de vapor entra por la derecha hacia la isla, con el joven de traje en la proa
  const u = ease(tramo(t, P4 - 0.2, P4 + 3.4)), x = Math.round(lerp(330, 150, u)), yW = 150 + Math.round(Math.sin(t * 1.8) * 1.5), senala = t > %(president)s - 0.4;
  for (let k = 1; k < 14; k++) { const sx = x + 120 + k * 6, a = Math.round(k * 0.8); R.pset(sx, yW + 2 + a, hex('#e8f0f2')); R.pset(sx + 2, yW + 2 - Math.round(a * 0.4), hex('#c8d8e0')); }
  // la chimenea con su humo que va hacia atrás
  for (let k = 0; k < 6; k++) { const a = ((t * 0.9 + k / 6) % 1), sx = Math.round(x + 70 + a * 34), sy = Math.round(yW - 40 - a * 10); R.disco(sx, sy, Math.round(2 + a * 4), hex(a < 0.5 ? '#5a5a62' : '#8a8a92')); }
  R.rect(x + 66, yW - 38, x + 72, yW - 18, hex('#1a1a20')); R.rect(x + 66, yW - 34, x + 72, yW - 32, hex('#c83a3a')); R.rect(x + 67, yW - 38, x + 67, yW - 18, hex('#4a4a52'));
  // el mástil con el gallardete liso
  R.linea(x + 30, yW - 44, x + 30, yW - 14, hex('#5a3a20')); { const o = Math.sin(t * 5); R.poligono([[x + 31, yW - 44], [x + 44, yW - 41 + Math.round(o)], [x + 31, yW - 38]], hex('#c83a3a')); }
  // la caseta con ojos de buey
  R.rect(x + 50, yW - 20, x + 96, yW - 9, hex('#2a2a30')); R.rect(x + 51, yW - 19, x + 95, yW - 10, hex('#f2eee2')); R.rect(x + 51, yW - 19, x + 95, yW - 18, hex('#8a6a44'));
  for (let i = 0; i < 4; i++) { R.disco(x + 58 + i * 10, yW - 14, 2, hex('#3a4a5a')); R.pset(x + 57 + i * 10, yW - 15, hex('#c8e0f0')); }
  R.actor(EL.marinero39, x + 98, yW - 8, t, { dir: -1, quieto: false });
  R.actor(EL.fdr, x + 10, yW - 8, t, { dir: -1, dedo: senala, sonrisa: senala });
  barca(x, yW, 124, 10, -1, hex('#3e6886'), { casco: '#e8e4d8', cascoL: '#f8f6ee', cascoS: '#b8b4a8', borda: '#8a6a44' });
  R.linea(x + 4, yW + 1, x + 118, yW + 1, hex('#2a4a3a'));
  // la ola de proa
  for (let i = 0; i < 8; i++) R.pset(x - 2 - i, yW + 1 + (i % 3) - (Math.floor(t * 8 + i) % 2), hex('#f0f8fa'));
};
const efectos = [[%(marks)s, 'brillo'], [%(giveup)s + 0.4, 'toc'], [P3 + 1.5, 'golpecito'], [%(companies)s, 'papel'], [P4 + 0.1, 'vapor'], [%(president)s, 'silbato']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P3 ? 1795 : t < P4 ? Math.round(lerp(1803, 1849, tramo(t, P3, P4 - 0.3))) : 1909) });
''', dict(
    P2=F('picos', 4.98), P3=F('rinden', 9.64), P4=F('rinden', 14.03),
    notice=F('picos', 0.6), marks=F('picos', 3.17), sign=F('picos', 5.10), giveup=F('rinden', 8.71),
    companies=F('rinden', 13.31), president=F('rinden', 15.85))))

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['oi-pregunta'] = ('La pregunta', '''// OI-PREGUNTA (frase 6), hoy. Tres planos:
// 1. hoy, la excavación sobre el pozo: «230» sube y se va; la operaria llega por los tablones y señala el pozo en «that
//    hole»; el tubo de acero baja vibrando; una moneda de oro sale y gira en «Money Pit» (corta en «has swallowed»);
// 2. inserto (fondo local): el pozo visto desde arriba, el entibado que se pierde en lo oscuro y el agua negra al fondo; una
//    mano suelta monedas y fajos que caen, se encogen y desaparecen en el agua; «X» en «a single coin» (corta en «So»);
// 3. el pozo en corte de arriba abajo, de noche, con los pozos de después: «?» en «what's down there»; el operario se acerca
//    al fondo, el mar entra por las flechas y el agua sube de golpe: sale corriendo (corta en «So what's down there»).''',
COMUN + fmt(r'''
const P2 = %(P2)s, P3 = %(P3)s;
// 1 · hoy: la excavación sobre el Pozo del Dinero; la operaria llega por los tablones y señala el pozo; el tubo baja
const p1 = (t) => {
  T.oakHoy(R, t, { encuadre: 'excavacion', tubo: lerp(0.3, 0.8, ease(tramo(t, 0.6, P2 - 0.2))), vibra: t > 0.6 && t < P2 - 0.3 });
  const u = tramo(t, 0.1, %(hole)s - 0.1), x = Math.round(lerp(-14, 80, ease(u))), senala = t > %(hole)s && t < P2;
  R.actor(EL.operaria, x, 168, t, { dir: 1, anda: u > 0 && u < 1, dedo: senala, habla: t > %(hole)s && t < %(pit)s && Math.sin(t * 8) > 0 });
  R.actor(EL.operario, 166, 162, t, { dir: -1, sorpresa: t > %(pit)s && t < %(pit)s + 0.7, sonrisa: t > %(pit)s + 0.7, dedo: t > %(pit)s + 0.7 && t < P2 });
  // «230» que sube en «230 years» y se va
  const n = tramo(t, %(n230)s - 0.2, %(n230)s + 0.2), fu = tramo(t, %(later)s + 0.4, %(later)s + 1.0);
  if (n > 0 && fu < 1) R.numero('230', 72, Math.round(lerp(70, 56, ease(n)) - fu * 6), { tam: 16, centro: true, n: Math.round((1 - fu) * 80) });
  // la moneda de oro que sale del pozo y gira en «Money Pit»
  const mo = tramo(t, %(pit)s - 0.5, %(pit)s); if (mo > 0) { const cx = Math.round(lerp(128, 176, ease(mo))), cy = Math.round(lerp(132, 100, ease(mo)) + Math.sin(t * 3) * 1.5), w = Math.max(1, Math.round(6 * Math.abs(Math.cos(t * 3.2))));
    R.rect(cx - w - 1, cy - 7, cx + w + 1, cy + 7, hex('#5a3a10')); R.rect(cx - w, cy - 6, cx + w, cy + 6, T.C.oro); R.rect(cx - w, cy - 6, cx - w + Math.max(0, Math.round(w / 2)), cy + 6, hex('#f8d860')); if (w > 3) R.rect(cx - 1, cy - 3, cx + 1, cy + 3, T.C.oroS);
    if (Math.floor(t * 4) % 3 === 0) { R.pset(cx + w + 2, cy - 8, hex('#ffffff')); R.pset(cx + w + 3, cy - 9, hex('#ffffff')); R.pset(cx - w - 3, cy + 6, hex('#ffffff')); } }
};
// 2 · el pozo visto desde arriba: el entibado que se pierde, el agua negra; las monedas que caen y desaparecen
const C0 = [160, 98];
const p2 = (t) => {
  fijo('cenital', () => {
    // la tierra y la hierba alrededor de la boca, con hojas, piedras y raíces
    degradado(0, 0, 319, 179, ['#5a7a3a', '#4e6e34', '#466430', '#4e6e34', '#5a7a3a'].map(hex));
    for (let k = 0; k < 5000; k++) { const x = Math.round(hh(k, 1, 51) * 319), y = Math.round(hh(k, 2, 51) * 179), c = hh(k, 3, 51); R.pset(x, y, hex(c < 0.3 ? '#3a5a2a' : c < 0.6 ? '#6a8a44' : c < 0.8 ? '#7a6a44' : '#8aa04e')); }
    for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 4, 51) * 319), y = Math.round(hh(k, 5, 51) * 179); R.rect(x, y, x + 2, y + 1, hex(hh(k, 6) < 0.5 ? '#c8a03a' : '#b8742c')); R.pset(x + 1, y + 2, hex('#6a4a2a')); }
    for (let k = 0; k < 18; k++) { const x = Math.round(hh(k, 7, 51) * 319), y = Math.round(hh(k, 8, 51) * 179), r = 2 + Math.round(hh(k, 9, 51) * 3); R.disco(x + 1, y + 1, r, hex('#2a3a1e')); R.disco(x, y, r, hex('#9a9a92')); R.pset(x - 1, y - 1, hex('#d8d8d0')); }
    // la tierra removida y el brocal de troncos, cuadrado, visto desde arriba
    const anillo = (k) => { const s = Math.pow(0.78, k), hw = 130 * s, hh2 = 78 * s; return [C0[0] - hw, C0[1] - hh2, C0[0] + hw, C0[1] + hh2]; };
    { const [a, b, c, d] = anillo(0); for (let y = Math.round(b) - 8; y <= Math.round(d) + 8; y++) for (let x = Math.round(a) - 10; x <= Math.round(c) + 10; x++) R.pset(x, y, hh(x, y, 12) < 0.5 ? hex('#7a5a3a') : hex('#6a4a2e')); }
    // el entibado que baja: cada nivel, tres troncos (luz arriba, junta oscura), más oscuro cuanto más hondo; el agua al fondo
    const LQ = Math.log(0.78), BASE = ['#6a4a2c', '#4a3220', '#7a5a36', '#5a3e24'].map(hex);
    for (let y = Math.round(C0[1] - 78); y <= Math.round(C0[1] + 78); y++) for (let x = Math.round(C0[0] - 130); x <= Math.round(C0[0] + 130); x++) {
      const dx = (x - C0[0]) / 130, dy = (y - C0[1]) / 78, sm = Math.max(Math.abs(dx), Math.abs(dy), 1e-3), kf = Math.log(sm) / LQ;
      if (kf > 11) { R.pset(x, y, hh(x, y, 3) < 0.05 ? hex('#0e1620') : hex('#04060a')); continue; }
      const lado = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 0 : 1) : (dy < 0 ? 2 : 3), k = Math.floor(kf), lg = (kf - k) * 3, li = Math.floor(lg), lf = lg - li;
      let c = BASE[lado];
      if (lf < 0.14) c = hex('#24160a'); else if (lf < 0.38) c = mez(c, hex('#c09a68'), lado === 2 ? 0.55 : 0.35); else if (lf > 0.8) c = mez(c, hex('#1a0e06'), 0.35);
      const along = lado < 2 ? y : x; if (hh(along >> 1, k * 3 + li, 7) < 0.16) c = mez(c, hex('#2a1a0c'), 0.45);
      if (kf > 4 && hh(x, y, 8) < 0.05) c = hex('#7a9aaa');
      if (kf < 2.2 && hh(x >> 1, y >> 1, 9) < 0.14) c = hh(x, y, 10) < 0.5 ? hex('#5a7a3a') : hex('#7a9a4a');
      R.pset(x, y, mez(c, hex('#05070a'), Math.min(0.94, kf * 0.085)));
    }
    // las esquinas del entibado (aristas) y raíces que cuelgan del primer nivel
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (let i = 0; i <= 100; i++) { const f = Math.pow(0.78, i * 0.11), x = Math.round(C0[0] + sx * 130 * f), y = Math.round(C0[1] + sy * 78 * f); R.pset(x, y, mez(hex('#1a0e06'), hex('#05070a'), Math.min(0.9, i * 0.0094))); }
    for (let k = 0; k < 9; k++) { let x = 50 + Math.round(hh(k, 1, 71) * 220), y = 22; for (let j = 0; j < 12 + k; j++) { y++; x += Math.round((C0[0] - x) * 0.02 + (hh(j, k, 72) - 0.5) * 1.5); R.pset(x, y, hex('#3a2412')); } }
    { const [a, b] = anillo(11); R.rect(Math.round(a) + 3, Math.round(b) + 2, Math.round(a) + 8, Math.round(b) + 3, hex('#1a2a3a')); }
    // el brocal (troncos gruesos con su corteza) por encima de todo
    { const [a, b, c, d] = anillo(0).map(Math.round);
      for (const [x0, y0, x1, y1] of [[a - 8, b - 8, c + 8, b], [a - 8, d, c + 8, d + 8], [a - 8, b, a, d], [c, b, c + 8, d]]) { R.rect(x0, y0, x1, y1, hex('#5a3a20')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (hh(x >> 2, y, 3) < 0.2) R.pset(x, y, hex('#3a2412')); else if ((x0 === a - 8 && y1 === b) ? y === y0 + 1 : x === x0 + 1) R.pset(x, y, hex('#8a6a44')); } R.rect(x0, y0, x1, y0, hex('#2a1a0c')); R.rect(x0, y1, x1, y1, hex('#2a1a0c')); } }
  });
  // ondas en el agua: cada moneda que llega deja un anillo
  const [wa, wb, wc, wd] = [C0[0] - 130 * Math.pow(0.78, 11), C0[1] - 78 * Math.pow(0.78, 11), C0[0] + 130 * Math.pow(0.78, 11), C0[1] + 78 * Math.pow(0.78, 11)].map(Math.round);
  // las monedas y los fajos: salen de la mano, caen hacia el centro, se encogen y desaparecen
  const cae = [], suelta = [%(swallow)s, %(swallow)s + 0.35, %(millions)s, %(millions)s + 0.2, %(millions)s + 0.4, %(dollars)s, %(dollars)s + 0.3, %(single)s - 0.2];
  suelta.forEach((s, k) => cae.push([s, k]));
  const hx = 238, hy = 22;
  for (const [s, k] of cae) { const u = tramo(t, s, s + 1.1); if (u <= 0) continue; if (u >= 1) { const r = tramo(t, s + 1.1, s + 2.0); if (r < 1) { R.recorte([wa, wb, wc, wd]); const rr = Math.round(1 + r * 10); for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283; R.pset(Math.round(C0[0] + Math.cos(a) * rr), Math.round(C0[1] + Math.sin(a) * rr * 0.6), hex('#4a6a8a')); } R.recorte(null); } continue; }
    const e = u * u, x = Math.round(lerp(hx - 6 + (k % 3) * 6, C0[0], e)), y = Math.round(lerp(hy + 14, C0[1], e)), s2 = Math.max(1, Math.round(lerp(12, 1, e)));
    if (k % 3 === 2) { // el fajo de billetes: perfil oscuro, billetes verdes con el canto claro, la faja de papel y el brillo
      const hw = s2 + 2, hv = Math.max(1, Math.ceil(s2 * 0.55)), inc = Math.round(Math.sin(t * 5 + k) * Math.min(2, s2 / 4));
      R.rect(x - hw - 1, y - hv - 1 + inc, x + hw + 1, y + hv + 2 + inc, hex('#10240e')); R.rect(x - hw, y - hv + inc, x + hw, y + hv + inc, hex('#5e9e5a'));
      if (s2 > 2) { R.rect(x - hw, y + hv - 1 + inc, x + hw, y + hv + inc, hex('#2e6a32')); R.rect(x - hw, y - hv + inc, x + hw, y - hv + inc, hex('#a8d898')); R.rect(x - 1, y - hv + inc, x + 1, y + hv + inc, hex('#f0e6c0')); R.pset(x, y + hv + inc, hex('#a89a70'));
        R.rect(x - hw + 2, y - 1 + inc, x - hw + 3, y + inc, hex('#2e6a32')); R.rect(x + hw - 3, y - 1 + inc, x + hw - 2, y + inc, hex('#2e6a32')); } }
    else { // la moneda de oro que gira: canto oscuro, cara dorada, el anillo grabado y el brillo
      const w = Math.max(1, Math.round(s2 * Math.abs(Math.cos(t * 9 + k))));
      for (let yy = -s2 - 1; yy <= s2 + 1; yy++) for (let xx = -w - 1; xx <= w + 1; xx++) { const r = (xx * xx) / ((w + 0.6) * (w + 0.6)) + (yy * yy) / ((s2 + 0.6) * (s2 + 0.6)); if (r > 1.25) continue;
        R.pset(x + xx, y + yy, r > 0.8 ? hex('#5a3a10') : (r > 0.42 && r < 0.6 && s2 > 4) ? T.C.oroS : (xx < 0 && yy < 0 && r < 0.3) ? hex('#ffe890') : T.C.oro); }
      if (s2 > 3 && Math.floor(t * 6 + k) % 3 === 0) { R.pset(x - w - 2, y - s2 - 1, hex('#ffffff')); R.pset(x - w - 3, y - s2 - 2, hex('#ffffff')); R.pset(x - w - 1, y - s2 - 2, hex('#fff4b0')); } } }
  // la mano que suelta el dinero desde el borde de arriba
  const sale = tramo(t, %(single)s + 0.3, %(single)s + 1.0);
  if (sale < 1) T.brazo(R, 262, -30, hx + 8, hy - 6 - Math.round(sale * 40) + (Math.floor(t * 3) % 2), '#3a4a6a', -1, { codo: [258, -6] });
  // «X»: ni una moneda vuelve
  const x1 = tramo(t, %(coin)s, %(coin)s + 0.3); if (x1 > 0) { const cx = C0[0], cy = C0[1] - 36, rr = Math.round(5 + 9 * ease(x1));
    // la moneda grande sobre la boca oscura, con su halo claro para que se lea, y la «X» roja gruesa encima
    R.disco(cx, cy, rr + 4, hex('#3a2a14')); R.disco(cx, cy, rr + 2, hex('#e8d8a8')); R.disco(cx, cy, rr + 1, hex('#5a3a10')); R.disco(cx, cy, rr, T.C.oro); R.disco(cx, cy, Math.round(rr * 0.65), T.C.oroS); R.disco(cx, cy, Math.round(rr * 0.65) - 1, T.C.oro); R.disco(cx - Math.round(rr * 0.4), cy - Math.round(rr * 0.4), 2, hex('#fff4b0'));
    const L = rr + 3; for (const sg of [-1, 1]) for (let d = -L; d <= L; d++) { for (let g = -2; g <= 2; g++) R.pset(cx + d + g, cy + sg * d, Math.abs(g) === 2 ? hex('#3a0808') : T.C.rojo); } }
  // gotas que caen del entibado
  for (let k = 0; k < 3; k++) { const ph = ((t * 0.7 + k * 0.33) % 1); const x = Math.round(lerp(60 + k * 100, C0[0], ph * ph)), y = Math.round(lerp(40 + k * 40, C0[1], ph * ph)); R.pset(x, y, hex('#8ab0c8')); }
};
// 3 · el pozo en corte: «?» en «what's down there»; el agua sube de golpe cuando el que cava se acerca al fondo
const p3 = (t) => {
  const sube = ease(tramo(t, %(flood)s - 0.2, %(flood)s + 1.6));
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1909', luz: 'noche', fondo: 100, nivel: lerp(0.08, 1, sube), brillo: tramo(t, P3, P3 + 0.6), cubo: 0.3, pozos: 0.35 + 0.65 * ease(tramo(t, P3 - 0.2, P3 + 1.6)), flechas: sube > 0 ? Math.min(1, sube * 1.4) : 0 });
  const yF = Math.round(g.fondoY ?? 172), yA = g.aguaY ?? 200;
  // el que cava: baja por la escalera hacia el fondo y, cuando sube el agua, sale corriendo hacia arriba
  const baja = ease(tramo(t, P3 - 0.2, %(flood)s - 0.3)), huye = ease(tramo(t, %(flood)s, %(flood)s + 2.4)), y = Math.round(lerp(lerp(96, yF - 8, baja), 60, huye));
  R.actor(EL.operario, 105, y, t, { dir: 1, anda: (baja > 0 && baja < 1) || (huye > 0 && huye < 1), sorpresa: huye > 0, brazos: huye > 0 && huye < 1 });
  if (yA < y && huye > 0) { for (let k = 0; k < 4; k++) R.pset(103 + k * 6, Math.round(yA) - 1 - ((Math.floor(t * 10) + k) % 2), hex('#c8e0ea')); }
  // «?» grande en «what's down there» sobre el fondo, y otra vez al final
  const q = tramo(t, %(whats)s - 0.2, %(whats)s + 0.2); if (q > 0) { const yy = Math.round(lerp(150, 136, ease(q)) + Math.sin(t * 2.5) * 2); R.icono('?', 50, yy - 20, T.C.oro, hex('#1a1206'), 4); }
  // los que miran desde arriba
  R.actor(EL.operaria, 140, 52, t, { dir: -1, habla: t < %(whats)s && Math.sin(t * 7) > 0, dedo: t > %(flood)s, sorpresa: t > %(flood)s + 0.3 });
};
const efectos = [[%(n230)s, 'pop'], [%(pit)s, 'brillo'], [%(swallow)s + 1.1, 'chof'], [%(millions)s + 1.1, 'chof'], [%(dollars)s + 1.2, 'chof'], [%(coin)s, 'aviso'], [P3 + 0.2, 'brillo'], [%(whats)s, 'pop'], [%(flood)s, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''', dict(
    P2=F('pregunta', 5.47), P3=F('pregunta', 10.54),
    n230=F('pregunta', 0.82), later=F('pregunta', 2.12), pit=F('pregunta', 4.49), hole=F('pregunta', 2.99),
    swallow=F('pregunta', 4.9), millions=F('pregunta', 5.6), dollars=F('pregunta', 6.4), single=F('pregunta', 8.0), coin=F('pregunta', 9.01),
    whats=F('pregunta', 10.96), flood=F('pregunta', 12.95))))
