# Borrador de escenas del ep44 (grupo S3): pa-agua y pa-emperador. Formato del 11: E[id] = (título, cabecera, cuerpo).
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


E = {}

# ── lo común de las dos escenas (texturas, Atom con su grano, estandartes, el personaje tumbado) ───────────────────────
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
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const fijo = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } R.copiar(FIJOS[k]); };
const sombrea = (x, y, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const aclara = (x, y, c, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// EL GRANO DE ESPECIA AZUL (el hilo del episodio: Atom lo lleva desde pa-caladan): le da vueltas como un electrón más
const AZ = pal(['#141e4a', '#2a4ab0', '#5a8ae8', '#a8ccff', '#f0f8ff']);
const grano = (x, y, t, s = 1) => { const X = ri(x), Y = ri(y);
  R.halo(X, Y, (5.5 + Math.sin(t * 6) * 1.2) * s, [AZ[1], AZ[2], AZ[3]], 1.15);
  R.rect(X - 1, Y - 2, X + 1, Y + 2, AZ[0]); R.rect(X - 2, Y - 1, X + 2, Y + 1, AZ[0]); R.rect(X - 1, Y - 1, X + 1, Y + 1, AZ[3]); R.pset(X, Y, AZ[4]);
  if (Math.sin(t * 9) > 0.2) { R.pset(X, Y - 3, AZ[4]); R.pset(X + 3, Y, AZ[3]); R.pset(X - 3, Y, AZ[3]); } };
const lucie = (x, y, t, o = {}) => { AT.luciernaga(R, x, y, t, o); const a = t * 2.4; grano(x + Math.cos(a) * 12, y + Math.sin(a) * 4, t, 0.7); };
const atomG = (x, s, t, o = {}) => { const r = AT.atom(R, x, s, t, o); const a = t * 2.4; grano(r.centro[0] + Math.cos(a) * 11, r.centro[1] + Math.sin(a) * 4, t, 0.7); return r; };
// el halcón de los Atreides en una banderola (7×5 px, dos tonos de oro y el pico, el mismo de pa-gancho p1): alas
// abiertas en V con las puntas de las plumas, cabeza con su pico entre ellas, cuerpo y cola en abanico; no es una letra
const HALCON = ['X.....X', 'XX.Hp.X', '.dXXXd.', '..dXd..', '..d.d..'];
const halconB = (cx, cy) => {
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) {
    const ch = HALCON[j][i]; if (ch === '.') continue;
    R.pset(cx - 3 + i, cy - 2 + j, ch === 'd' ? hex('#a8782a') : ch === 'p' ? hex('#e07a30') : ch === 'H' ? hex('#fff0a0') : hex('#f0c848'));
  }
};
// el estandarte de los Fremen (el mismo de pa-gancho): verde o negro, con el halcón de oro (halcon = true) o como un punto
const banderolaG = (x, y, h, t, k, halcon = true) => {
  const v = Math.round(Math.sin(t * 2.6 + k) * 1.5), c = k % 2 ? hex('#1f4a2c') : hex('#18181e'), cs = k % 2 ? hex('#3a7048') : hex('#3a3a46');
  R.linea(x, y, x, y - h, hex('#4a3420')); R.pset(x, y - h - 1, hex('#e8c040'));
  R.poligono([[x + 1, y - h], [x + 11 + v, y - h + 1], [x + 10 + v, y - h + 9], [x + 1, y - h + 9]], K);
  R.poligono([[x + 1, y - h + 1], [x + 10 + v, y - h + 2], [x + 9 + v, y - h + 8], [x + 1, y - h + 8]], c);
  R.linea(x + 1, y - h + 1, x + 9 + v, y - h + 2, cs); R.linea(x + 1, y - h + 8, x + 9 + v, y - h + 8, hex('#c8a030'));
  const cx = x + 5 + Math.round(v / 2), cy = y - h + 4; if (halcon) { halconB(cx, cy + 1); return; } R.pset(cx, cy, hex('#f0c848')); R.pset(cx - 1, cy - 1, hex('#f0c848')); R.pset(cx + 1, cy - 1, hex('#f0c848')); R.pset(cx, cy + 1, hex('#c89a30'));
};
// un estandarte pequeño (para mapas y planetas): mástil de 7 px y paño de 5 × 4
const banderita = (x, y, t, k, c = hex('#2e6a3e')) => { const v = Math.sin(t * 4 + k) > 0 ? 1 : 0;
  R.linea(x, y, x, y - 7, K); R.rect(x + 1, y - 7, x + 5 + v, y - 3, K); R.rect(x + 1, y - 6, x + 4 + v, y - 4, c); R.pset(x + 2, y - 5, hex('#f0c848')); };
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
// un personaje TUMBADO boca arriba (dormido, desmayado): se pinta de pie en un hueco marcado, se lee y se pega girado.
// (x, y): los pies y la línea del cuerpo; o.cab −1 la cabeza a la izquierda (por omisión), 1 a la derecha.
// Devuelve la cabeza en el lienzo.
const MK = 0xff00ff01 >>> 0;
const tumbado = (def, x, y, t, o = {}) => {
  const B = R.buf, Wd = 44, Hd = 44, copia = B.slice(0, 320 * Hd), cab = o.cab ?? -1;
  for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) B[j * 320 + i] = MK;
  R.actor(def, 14, 40, t, { ...o, dir: cab < 0 ? 1 : -1, quieto: true });
  const px = []; for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) { const c = B[j * 320 + i]; if (c !== MK) px.push([i, j, c]); }
  B.set(copia, 0);
  const cx = 22, cy = 40, X = ri(x), Y = ri(y);
  // la sombra en el suelo
  for (let i = -26; i <= 2; i++) for (let j = 6; j <= 9; j++) if (((i + j) & 1) === 0) sombrea(X + (cab < 0 ? i : -i), Y + j, 0.3);
  for (const [i, j, c] of px) { const dx = i - cx, dy = j - cy; if (cab < 0) R.pset(X + dy, Y - dx, c); else R.pset(X - dy, Y + dx, c); }
  return cab < 0 ? [X - 19, Y] : [X + 19, Y];
};
// la luz azul de la especia en la cabeza (los ojos «azul sobre azul» que se encienden)
const ojosAzules = (x, y, t, u = 1) => { if (u <= 0) return; R.halo(ri(x), ri(y), (7 + Math.sin(t * 5) * 1.2) * u, [AZ[1], AZ[2], AZ[3]], 0.9); };
'''


def sub(s, d):
    for k, v in d.items():
        s = s.replace('@' + k + '@', v)
    assert '@' not in s.replace('@media', ''), 'marca sin sustituir'
    return s


def cuerpo(s):
    return COMUN + s


# ── pa-agua (frases 9–10) ───────────────────────────────────────────────────────────────────────────────────────────
A = lambda s: W('pa-agua', s)
E['pa-agua'] = ('El Agua de Vida', f'''// PA-AGUA (frases 9–10). Año 0 (lo que ya se vio en las películas). Siete planos:
// 1. el pasillo del sietch, de noche (cuarto/puerta): Paul sostiene la copa azul que brilla y bebe («water of life»); en
//    «poison» se sorprende, la copa cae y se derrama azul; en «nearly kills him» se desploma y queda tumbado; Chani sale
//    corriendo por la cortina y se para a su lado, triste; Atom luciérnaga se asusta. Corta en «and (he wakes)».
// 2. el laberinto de caminos de luz (laberinto/general): Paul tumbado en el centro despierta («wakes up»), se levanta con
//    los ojos encendidos de azul; los caminos se abren desde sus pies («seeing the future»), mira a un lado y a otro, y en
//    «beyond doubt» se tiñen de rojo; él se sorprende. Corta en «is (a holy war)».
// 3. la sala del sietch (sala/general): Paul tumbado junto a la alberca con los ojos azules, Chani a su lado; sobre él se
//    abre la visión (una burbuja de estrellas): en «holy war» los estandartes verdes y negros se plantan en un planeta y
//    en «sweep across the stars» barren la fila de planetas, que se vuelven rojos. Corta en «and still».
// 4. inserto, la mesa de juego del sietch: tablero de arena con piezas; en «go ahead» la mano de Paul coge el halcón y
//    lo empuja; en «beat the emperor» tumba la pieza de la corona. Un ratón del desierto husmea detrás. Corta en «At».
// 5. la tarima (trono/tarima, día): Shaddam en el trono; Paul avanza; en «defeats the emperor» Shaddam se levanta y se
//    va por la plataforma, triste, y deja la corona en el asiento; Irulan entra; en «demands to marry his daughter» Paul
//    la señala y ella se acerca. Corta en «Princess».
// 6. fondo propio, la gran puerta del salón: al fondo, en el estrado, Paul e Irulan; en «claim the throne» Paul alza los
//    brazos; en la puerta abierta al desierto, Chani mira atrás («who loves him», triste) y se da la vuelta. Corta en
//    «turns».
// 7. la boca del sietch al ocaso (sala/entrada): Chani se aleja por la arena hacia el sol dejando huellas; Atom la mira
//    irse desde la repisa, triste; en «what he's becoming» se dibuja en el cielo, en polvo, la silueta enorme de un
//    hombre con corona: relleno de polvo oscuro en tres tonos que se arremolina, borde claro del lado del sol, cabeza,
//    cuello, hombros, brazos abiertos con sus manos y un manto que se funde con las dunas; la corona de oro encima.''', cuerpo(sub(r'''
const C1 = @c1@, C2 = @c2@, C3 = @c3@, C4 = @c4@, C5 = @c5@, C6 = @c6@;
// 1 · el pasillo del sietch: la copa azul
const T_AGUA = @water@, T_VENENO = @poison@, T_MATA = @kills@;
const p1 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'puerta' };
  T.sietch(R, t, o);
  // Chani sale por la cortina y corre hacia él
  const sale = tramo(t, T_VENENO + 0.2, T_MATA + 0.5), cx = lerp(152, 132, sale), cy = lerp(150, 164, sale);
  if (t > T_VENENO + 0.15) R.actor(PA.chani, ri(cx), ri(cy), t, { dir: -1, anda: sale > 0 && sale < 1, sorpresa: sale < 1, triste: sale >= 1 });
  // Paul: sostiene la copa, bebe, la suelta, se tambalea y cae
  const PX = 108, PS = 166, cae = t > T_MATA + 0.15;
  const bebe = tramo(t, T_AGUA - 0.35, T_AGUA + 0.1) * (1 - tramo(t, T_VENENO - 0.4, T_VENENO));
  if (!cae) {
    const tamb = t > T_VENENO + 0.3 ? Math.round(Math.sin(t * 14) * 1.2) : 0;
    const suelta = t > T_VENENO + 0.1;
    const r = R.actor(PA.paul, PX + tamb, PS, t, { dir: 1, sostiene: suelta ? undefined : [PX + 15, ri(PS - 13 - bebe * 6)], sorpresa: t > T_VENENO && t < T_VENENO + 0.5, triste: t >= T_VENENO + 0.5 });
    if (!suelta && r.mano) { const [mx, my] = r.mano; copa(mx, my, t, 1); }
    if (t > T_AGUA) ojosAzules(r.cabeza[0], r.cabeza[1] + 6, t, 0.4 * tramo(t, T_AGUA, T_VENENO));
  } else {
    const cab = tumbado(PA.paul, PX + 22, PS - 8, t, { triste: true });
    ojosAzules(cab[0], cab[1], t, 0.5 + 0.2 * Math.sin(t * 3));
    // un poco de polvo al caer
    const pu = tramo(t, T_MATA + 0.15, T_MATA + 0.9); if (pu > 0 && pu < 1) for (let k = 0; k < 7; k++) R.pset(ri(PX + 4 + k * 4 + pu * (k - 3) * 3), ri(PS - 1 - pu * 5 - (k % 2) * 2), hex('#9a8a7a'));
  }
  // la copa que cae y el charco azul que se extiende
  if (t > T_VENENO + 0.1) { const u = tramo(t, T_VENENO + 0.1, T_VENENO + 0.45), x = PX + 18 + u * 6, y = lerp(PS - 14, PS - 2, u * u);
    if (u >= 1) { const ch = tramo(t, T_VENENO + 0.45, T_VENENO + 1.6); for (let j = -2; j <= 2; j++) for (let i = -12; i <= 12; i++) if ((i * i) / (144 * (0.3 + 0.7 * ch)) + (j * j) / (5 * (0.3 + 0.7 * ch)) < 1) R.pset(ri(x + 6 + i), ri(PS + 1 + j), (i + j + ri(t * 4)) % 5 === 0 ? AZ[3] : AZ[2]); }
    copa(x, y, t, u >= 1 ? 0.4 : 1, u >= 1); }
  T.sietchDelante(R, t, o);
  lucie(232 + Math.sin(t * 1.3) * 4, 70 + Math.sin(t * 2.1) * 3, t, { dir: -1, cara: t > T_VENENO ? (t > T_MATA + 0.6 ? 'triste' : 'sorpresa') : 'normal', brillo: 0.8 });
};
// la copa: de barro oscuro con el agua azul que brilla (tumbada: el agua ya se ha ido)
function copa(x, y, t, brillo, tumbada) {
  const X = ri(x), Y = ri(y);
  if (tumbada) { R.rect(X - 1, Y - 3, X + 6, Y + 1, K); R.rect(X, Y - 2, X + 5, Y, hex('#7a5a3a')); R.pset(X + 5, Y - 1, AZ[2]); return; }
  if (brillo > 0) { R.halo(X + 2, Y - 4, 11 + Math.sin(t * 6) * 2, [AZ[1], AZ[2], AZ[3]], 1.3 * brillo); for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.6; R.pset(ri(X + 2 + Math.cos(a) * 8), ri(Y - 5 + Math.sin(a) * 5), AZ[4]); } }
  R.rect(X - 2, Y - 7, X + 6, Y - 6, K); R.rect(X - 1, Y - 6, X + 5, Y - 1, K); R.rect(X + 1, Y - 1, X + 3, Y + 1, K);
  R.rect(X - 1, Y - 6, X + 5, Y - 6, AZ[3]); R.rect(X, Y - 5, X + 4, Y - 2, hex('#8a6a44')); R.pset(X, Y - 5, hex('#b08a5a'));
  if (Math.sin(t * 8) > 0.3) R.pset(X + 2 + ri(Math.sin(t * 3) * 2), Y - 9, AZ[4]);
}
// 2 · el laberinto de la visión: despierta y los caminos se abren desde sus pies
const T_DESP = @wakes@, T_FUT = @future@, T_CLARO = @ever@, T_DUDA = @doubt@;
const p2 = (t) => {
  const o = { encuadre: 'laberinto' };
  T.sietch(R, t, o);
  // los caminos se abren desde el centro (lo de fuera del radio, a oscuras) y en «beyond doubt» se tiñen de rojo
  const B = R.buf, rr = lerp(6, 260, ease(tramo(t, T_DESP + 0.3, T_CLARO + 0.3))), rojo = tramo(t, T_DUDA - 0.2, T_DUDA + 0.5);
  for (let y = 75; y < 180; y++) for (let x = 0; x < 320; x++) {
    const i = y * 320 + x, c = B[i], r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, d = Math.hypot(x - 160, (y - 150) * 2.6);
    if (d > rr) { const a = cl((d - rr) / 30) * 0.8; B[i] = mez(c, hex('#0a0c1c'), a); continue; }
    if (rojo > 0 && r > 150 && r > b + 50) B[i] = mez(c, hex('#e0402a'), rojo * 0.75 * (0.7 + 0.3 * Math.sin(t * 9 + x * 0.1)));
  }
  // Paul: tumbado al empezar; despierta y se levanta con los ojos encendidos, mira a los lados
  if (t < T_DESP + 0.45) { const cab = tumbado(PA.paul, 172, 142, t, {}); ojosAzules(cab[0], cab[1], t, tramo(t, T_DESP - 0.1, T_DESP + 0.3)); }
  else {
    const mira = t < T_FUT + 0.5 ? 1 : t < T_CLARO ? -1 : 1;
    const r = R.actor(PA.paul, 152, 150, t, { dir: mira, sorpresa: t > T_DESP + 0.45 && t < T_DESP + 1.1 || t > T_DUDA, brazos: t > T_CLARO - 0.4 && t < T_DUDA - 0.3 });
    ojosAzules(r.cabeza[0], r.cabeza[1] + 6, t, 0.9);
  }
  T.sietchDelante(R, t, o);
  lucie(96 + Math.sin(t * 1.1) * 6, 112 + Math.sin(t * 2.2) * 3, t, { dir: 1, cara: t > T_DUDA ? 'sorpresa' : t > T_FUT ? 'sonrisa' : 'normal', brillo: 0.7 });
};
// 3 · la sala del sietch: Paul tumbado; sobre él, la visión de la guerra santa
const T_GUERRA = @holy@, T_BARRE = @sweep@, T_ESTR = @stars@;
const PLAN = [[104, 80, 7, '#c89a5a'], [136, 64, 5, '#7a9ab0'], [166, 78, 8, '#a87a5a'], [198, 60, 6, '#8aa07a'], [224, 82, 5, '#b0a0c0']];
const p3 = (t) => {
  const o = { encuadre: 'sala' };
  T.sietch(R, t, o);
  // la burbuja de la visión: un cielo de estrellas dentro de una elipse con el filo azul que respira
  const ab = ease(tramo(t, C2 + 0.65, C2 + 1.3)), cx0 = 164, cy0 = 72, RX = 84 * ab, RY = 34 * ab;
  if (ab > 0.02) {
    for (let y = ri(cy0 - RY - 3); y <= cy0 + RY + 3; y++) for (let x = ri(cx0 - RX - 3); x <= cx0 + RX + 3; x++) {
      const e = ((x - cx0) / Math.max(1, RX)) ** 2 + ((y - cy0) / Math.max(1, RY)) ** 2 + (ns(x * 0.2 + t, y * 0.2) - 0.5) * 0.12;
      if (e > 1.12) continue;
      if (e > 0.94) { if (b4(x, y) < (1.12 - e) * 4) R.pset(x, y, e > 1.03 ? AZ[2] : AZ[3]); continue; }
      const neb = ns(x * 0.05 + 3, y * 0.08) * 0.8 + (y - cy0 + RY) / (2 * RY) * 0.4;
      R.pset(x, y, rmp(pal(['#24184a', '#160f34', '#0c0a22', '#06061a']), 3 - neb * 2.6, x, y));
      if (h2(x, y, 7) > 0.985) R.pset(x, y, Math.sin(t * 3 + x) > 0 ? hex('#f0f0ff') : hex('#8a8ab8'));
    }
    if (ab > 0.6) {
      // la fila de planetas; el frente de estandartes los barre de izquierda a derecha
      const fr = lerp(80, 250, ease(tramo(t, T_BARRE - 0.3, T_ESTR + 0.4))), uno = t > T_GUERRA;
      PLAN.forEach(([px, py, pr, c], k) => {
        const toma = (k === 0 && uno) || px < fr, rj = toma ? tramo(t, k === 0 ? T_GUERRA : T_BARRE + (px - 80) / 170 * 1.2, (k === 0 ? T_GUERRA : T_BARRE + (px - 80) / 170 * 1.2) + 0.6) : 0;
        const base = hex(c), lit = mez(base, hex('#ffffff'), 0.35), dark = mez(base, K, 0.5), red = hex('#c8402a');
        for (let j = -pr; j <= pr; j++) for (let i = -pr; i <= pr; i++) { const d = Math.hypot(i, j); if (d > pr + 0.3) continue;
          let col = d > pr - 0.8 ? K : (i + j < -pr * 0.6 ? lit : i + j > pr * 0.5 ? dark : base); if (rj > 0 && d <= pr - 0.8 && b4(px + i, py + j) < rj * 0.8) col = mez(col, red, 0.7); R.pset(px + i, py + j, col); }
        if (rj > 0.2) banderita(px - 1, py - pr + 1, t, k, k % 2 ? hex('#1f4a2c') : hex('#1a1a20'));
      });
      if (t > T_BARRE - 0.3 && t < T_ESTR + 0.6) for (let k = 0; k < 6; k++) R.linea(ri(fr - 6), ri(cy0 - 20 + k * 8), ri(fr + 2), ri(cy0 - 20 + k * 8), k % 2 ? AZ[3] : hex('#e8c060'));
    }
    // el hilo azul que sube de su cabeza a la visión
    for (let k = 0; k < 30; k++) { const u = k / 30, x = ri(lerp(150, cx0 - 10, u) + Math.sin(t * 3 + u * 9) * 3), y = ri(lerp(140, cy0 + RY - 2, u)); if ((k + ri(t * 10)) % 3) aclara(x, y, AZ[3], 0.7 * ab); }
  }
  // Paul tumbado sobre una estera; Chani a su lado, de pie, que mira arriba cuando sale la guerra
  for (let x = 122; x <= 182; x++) for (let y = 146; y <= 153; y++) R.pset(x, y, (y === 146 || y === 153 || x === 122 || x === 182) ? K : ((x + y) % 4 === 0 ? hex('#8a5a3a') : (x >> 2) % 2 ? hex('#c89a5a') : hex('#b0804a')));
  const cab = tumbado(PA.paul, 176, 144, t, {}); ojosAzules(cab[0], cab[1], t, 1);
  R.actor(PA.chani, 102, 152, t, { dir: 1, triste: t < T_GUERRA, sorpresa: t > T_GUERRA && t < T_GUERRA + 1.2, brazos: false });
  R.actor(PA.fremenMujer, 200, 152, t, { dir: -1, sorpresa: t > T_BARRE, dedo: t > T_BARRE + 0.4 && t < T_ESTR + 0.6 });
  T.sietchDelante(R, t, o);
  lucie(248 + Math.sin(t * 1.4) * 4, 126 + Math.sin(t * 2.0) * 3, t, { dir: -1, cara: t > T_GUERRA ? 'sorpresa' : 'normal', brillo: 0.6 });
};
// 4 · inserto: la mesa de juego del sietch
const T_SIGUE = @goahead@, T_VENCE = @beat@;
const bp = (u, v) => [lerp(lerp(92, 58, v), lerp(228, 262, v), u), 104 + v * 56];
const pieza = (x, y, tipo, caida = 0) => {
  const X = ri(x), Y = ri(y), CU = tipo === 'halcon' ? pal(['#5aa070', '#2e6a4a', '#1a4030']) : tipo === 'corona' ? pal(['#c8c8d0', '#8a8a96', '#545460']) : tipo === 'fremen' ? pal(['#7a9ac8', '#3a6aa8', '#22406a']) : pal(['#a8a8b0', '#6a6a74', '#3e3e46']);
  const alto = tipo === 'halcon' || tipo === 'corona' ? 13 : 8, an = tipo === 'halcon' || tipo === 'corona' ? 4 : 3;
  for (let i = -6; i <= 6; i++) sombrea(X + i + 2, Y + 1, 0.35);
  if (caida > 0.5) {   // tumbada: el cuerpo a lo largo, hacia la derecha
    R.rect(X - 1, Y - an - 1, X + alto + 1, Y, K); R.rect(X, Y - an, X + alto, Y - 1, CU[1]); R.linea(X, Y - an, X + alto, Y - an, CU[0]);
    if (tipo === 'corona') { R.rect(X + alto + 1, Y - an - 1, X + alto + 4, Y, K); for (const j of [-an, -an + 2, -1]) R.pset(X + alto + 3, Y + j, hex('#f0c848')); R.rect(X + alto + 1, Y - an, X + alto + 2, Y - 1, hex('#e8c060')); }
    return; }
  R.rect(X - 6, Y - 2, X + 6, Y, K); R.rect(X - 5, Y - 2, X + 5, Y - 1, CU[2]); R.linea(X - 5, Y - 2, X + 4, Y - 2, CU[1]);
  for (let j = 0; j < alto; j++) { const w = ri(an - j * (an - 2) / alto); R.rect(X - w - 1, Y - 3 - j, X + w + 1, Y - 3 - j, K); R.rect(X - w, Y - 3 - j, X + w, Y - 3 - j, CU[1]); R.pset(X - w, Y - 3 - j, CU[0]); R.pset(X + w, Y - 3 - j, CU[2]); }
  const top = Y - 3 - alto;
  if (tipo === 'halcon') { R.disco(X, top - 2, 3, K); R.disco(X, top - 2, 2, CU[1]); R.pset(X + 3, top - 2, hex('#e8c060')); R.pset(X + 4, top - 1, hex('#e8c060')); R.pset(X - 1, top - 3, CU[0]); R.pset(X, top + 3, hex('#e8c060')); R.pset(X - 1, top + 4, hex('#e8c060')); R.pset(X + 1, top + 4, hex('#e8c060')); }
  else if (tipo === 'corona') { R.rect(X - 4, top - 4, X + 4, top, K); R.rect(X - 3, top - 2, X + 3, top - 1, hex('#e8c060')); for (const i of [-3, 0, 3]) { R.pset(X + i, top - 3, hex('#f0c848')); R.pset(X + i, top - 4, K); } R.pset(X, top - 2, hex('#c83a3a')); }
  else { R.disco(X, top - 1, 2, K); R.disco(X, top - 1, 1, CU[0]); }
};
const p4 = (t) => {
  fijo('mesa', () => {
    // el muro de roca del sietch, caldeado por la lámpara del nicho (250, 34), con estratos y grietas
    const RO = pal(['#e0a878', '#c08858', '#9a6a42', '#764e34', '#523426', '#341f1a']);
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) {
      const d = Math.hypot((x - 250) / 1.5, y - 34) / 150;
      let v = 0.6 + d * 3.2 + (ns(x * 0.07, y * 0.15) - 0.5) * 1.6 + (ns(x * 0.45, y * 0.45) - 0.5) * 0.6;
      if (Math.abs(((y + ns(x * 0.04, 3) * 14) % 15) - 7) < 0.55) v += 1.0;
      if (Math.abs(((y + ns(x * 0.04, 3) * 14) % 15) - 6) < 0.5) v -= 0.5;
      R.pset(x, y, rmp(RO, v, x, y)); }
    for (const [x0, y0, n] of [[34, 6, 22], [192, 14, 14], [140, 60, 18]]) { let x = x0; for (let y = y0; y < y0 + n; y++) { x += ri(h2(y, x0) * 2 - 1); R.pset(x, y, RO[5]); R.pset(x + 1, y, RO[1]); } }
    // el nicho de la lámpara (x 226–274, y 14–56)
    for (let y = 14; y <= 56; y++) for (let x = 226; x <= 274; x++) { const dy = y < 30 ? Math.hypot(x - 250, y - 30) : Math.abs(x - 250); if (dy > 24) continue; const e = dy > 22.5; R.pset(x, y, e ? RO[5] : rmp(RO, 2.6 + (y - 14) / 42 * 1.6 - (1 - dy / 24) * 1.4, x, y)); }
    R.rect(226, 56, 274, 59, RO[4]); R.rect(226, 56, 274, 56, RO[1]);
    // el tapiz de rombos colgado a la izquierda (x 12–58, y 4–80) con su barra y sus flecos
    R.rect(8, 22, 62, 24, hex('#4a3020')); R.pset(8, 22, hex('#e8c060')); R.pset(62, 22, hex('#e8c060'));
    for (let y = 25; y <= 84; y++) for (let x = 12; x <= 58; x++) { const u = Math.abs(((x - 12) % 12) - 6) + Math.abs(((y - 25) % 12) - 6);
      R.pset(x, y, x === 12 || x === 58 ? hex('#4a1e18') : u < 2 ? hex('#e8c060') : u < 4 ? hex('#3a6aa8') : u < 6 ? hex('#a8402a') : ((x + y) % 3 ? hex('#7a2a20') : hex('#8a3424'))); }
    for (let x = 13; x <= 57; x += 2) R.linea(x, 85, x, 88 + (x % 3), hex('#c8a060'));
    // el estante tallado con cántaros, cuencos y un rollo (x 84–196, y 50–56)
    R.rect(84, 50, 196, 55, RO[4]); R.rect(84, 50, 196, 50, RO[1]); R.rect(84, 56, 196, 57, RO[5]);
    const cantaro = (x, h, c) => { const C0 = pal(c); for (let j = 0; j < h; j++) { const w = ri(Math.sin((j + 2) / (h + 2) * Math.PI) * h * 0.38 + 2); R.rect(x - w - 1, 49 - j, x + w + 1, 49 - j, K); R.rect(x - w, 49 - j, x + w, 49 - j, C0[1]); R.pset(x - w + 1, 49 - j, C0[0]); R.pset(x + w, 49 - j, C0[2]); } R.rect(x - 2, 49 - h - 2, x + 2, 49 - h, K); R.rect(x - 1, 49 - h - 1, x + 1, 49 - h - 1, C0[1]); };
    cantaro(96, 16, ['#d89a68', '#a86a40', '#6a3e24']); cantaro(116, 12, ['#c8b090', '#8a7458', '#5a4a38']); cantaro(178, 18, ['#d89a68', '#a86a40', '#6a3e24']);
    R.rect(132, 44, 160, 49, K); R.rect(133, 45, 159, 48, hex('#e8d8b0')); R.linea(133, 45, 159, 45, hex('#fff4d8')); R.rect(130, 43, 133, 50, hex('#8a5a30')); R.rect(159, 43, 162, 50, hex('#8a5a30'));
    // las sogas y los odres colgados a la derecha
    for (let y = 4; y < 70; y++) R.pset(298 + ri(Math.sin(y * 0.3)), y, hex('#8a6a40'));
    for (let j = 0; j < 22; j++) { const w = ri(Math.sin(j / 22 * Math.PI) * 9 + 1); R.rect(298 - w - 1, 66 + j, 298 + w + 1, 66 + j, K); R.rect(298 - w, 66 + j, 298 + w, 66 + j, j < 6 ? hex('#a87a4a') : hex('#8a5a34')); }
    // la mesa: el tablero de madera de y 92 a 168, con vetas, y el canto hasta abajo
    const MA = pal(['#b07a48', '#946238', '#7a4e2c', '#5e3a20', '#3e2614']);
    for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) {
      if (y >= 168) { R.pset(x, y, y === 168 ? K : rmp(MA, 2.8 + (y - 168) / 12 + (ns(x * 0.05, y) - 0.5), x, y)); continue; }
      const veta = Math.sin(x * 0.06 + ns(x * 0.02, y * 0.25) * 6 + y * 0.9);
      let v = 1.1 + (y - 92) / 76 * 0.6 + veta * 0.5 + (ns(x * 0.3, y * 0.6) - 0.5) * 0.5 + Math.hypot(x - 240, y - 60) / 260;
      if (y === 92) v = 4; else if (y === 93) v = 0;
      if ((y - 92) % 19 === 0 && y > 93) v = 3.6;
      R.pset(x, y, rmp(MA, v, x, y)); }
    // el tablero de arena: 8 × 5 casillas en dos tonos, con su marco tallado
    const AR = pal(['#f0d098', '#d8b078', '#b88a58']);
    for (let y = 100; y <= 164; y++) { const v = (y - 104) / 56, xl = lerp(92, 58, v) - 5 + (y < 104 ? 0 : 0), xr = lerp(228, 262, v) + 5; for (let x = ri(xl); x <= ri(xr); x++) R.pset(x, y, (x - ri(xl) < 2 || ri(xr) - x < 2 || y < 102 || y > 162) ? hex('#4a2c18') : hex('#6a4426')); }
    for (let y = 104; y <= 160; y++) { const v = (y - 104) / 56, j = Math.min(4, Math.floor(v * 5)); for (let x = ri(lerp(92, 58, v)); x <= ri(lerp(228, 262, v)); x++) { const u = (x - lerp(92, 58, v)) / (lerp(228, 262, v) - lerp(92, 58, v)), i = Math.min(7, Math.floor(u * 8));
      let c = (i + j) % 2 ? AR[1] : AR[0]; if (h2(x, y, 2) > 0.9) c = AR[2]; if (Math.abs(u * 8 - Math.round(u * 8)) < 0.02 || Math.abs(v * 5 - Math.round(v * 5)) < 0.03) c = AR[2]; R.pset(x, y, c); } }
    // lo de la mesa: un cuenco de dátiles, una jarra de agua, el rollo y una vela
    R.disco(30, 126, 12, K); R.disco(30, 125, 11, hex('#8a5a34')); R.disco(30, 123, 9, hex('#5a2e1c')); for (let k = 0; k < 9; k++) R.disco(ri(24 + h2(k, 1) * 12), ri(119 + h2(k, 2) * 7), 2, k % 2 ? hex('#7a3a1c') : hex('#a85a2a'));
    for (let j = 0; j < 28; j++) { const w = ri(Math.sin((j + 4) / 34 * Math.PI) * 9 + 2); R.rect(290 - w - 1, 140 - j, 290 + w + 1, 140 - j, K); R.rect(290 - w, 140 - j, 290 + w, 140 - j, j % 7 === 3 ? hex('#3a6aa8') : hex('#c88a58')); R.pset(290 - w + 1, 140 - j, hex('#e8b080')); }
    R.rect(282, 105, 298, 108, K); R.rect(284, 106, 296, 107, hex('#a86a40'));
    R.rect(266, 148, 312, 154, K); R.rect(267, 149, 311, 153, hex('#e8d8b0')); R.disco(266, 151, 3, K); R.disco(312, 151, 3, K); R.disco(266, 151, 2, hex('#8a5a30')); R.disco(312, 151, 2, hex('#8a5a30'));
    R.rect(8, 150, 20, 166, K); R.rect(9, 151, 19, 165, hex('#f0e0c0')); R.rect(9, 151, 11, 165, hex('#fff4e0')); R.rect(4, 165, 24, 168, K); R.rect(5, 165, 23, 167, hex('#8a6a40'));
  });
  // lo vivo: la llama de la lámpara del nicho y la vela, las motas de luz, el ratón, las piezas y la mano
  const fl = Math.sin(t * 13) * 0.6 + Math.sin(t * 7.3) * 0.5;
  R.rect(242, 46, 258, 52, K); R.rect(243, 47, 257, 51, hex('#a86a40')); R.rect(256, 48, 260, 50, hex('#8a5a30'));
  R.halo(250, 40, 16 + fl * 2, [hex('#e8a050'), hex('#f0c070'), hex('#fff0b0')], 0.7);
  R.poligono([[247, 46], [253, 46], [250 + ri(fl), 37 - ri(Math.abs(fl))]], hex('#f08a30')); R.poligono([[249, 46], [251, 46], [250 + ri(fl * 0.5), 41]], hex('#fff0a0'));
  R.halo(14, 146, 8 + fl, [hex('#e8a050'), hex('#f0c070')], 0.6); R.pset(14, 149, K); R.disco(14 + ri(fl * 0.5), 145, 1, hex('#ffe080')); R.pset(14 + ri(fl * 0.5), 143, hex('#f08a30'));
  for (let k = 0; k < 10; k++) { const x = ri(150 + h2(k, 3) * 120 + Math.sin(t * 0.6 + k) * 10), y = ri(20 + ((h2(k, 4) * 80 + t * 4) % 70)); if (Math.sin(t * 2 + k) > -0.2) R.pset(x, y, hex('#ffe0a0')); }
  // el ratón del desierto husmea por detrás de la mesa y se esconde tras la jarra
  { const u = tramo(t, C4 + 0.8, C4 + 2.4), v = tramo(t, C5 - 1.0, C5 - 0.3); const x = ri(lerp(300, 252, u) + v * 40), y = 98 - (u > 0 && u < 1 ? (Math.floor(t * 8) % 2) : 0);
    if (u > 0 && v < 1) { R.rect(x - 4, y - 3, x + 3, y, K); R.rect(x - 3, y - 2, x + 2, y - 1, hex('#c8a070')); R.pset(x - 4, y - 4, hex('#c8a070')); R.pset(x - 3, y - 4, K); R.pset(x - 5, y - 2, K); R.linea(x + 3, y - 1, x + 8, y - 3 + ri(Math.sin(t * 6)), hex('#8a6a40')); } }
  // las piezas: los Fremen (azules) y el halcón a la izquierda, los Sardaukar (grises) y la corona a la derecha
  for (const [u, v] of [[0.12, 0.85], [0.25, 0.92], [0.06, 0.62], [0.3, 0.7]]) { const [x, y] = bp(u, v); pieza(x, y, 'fremen'); }
  for (const [u, v] of [[0.86, 0.15], [0.74, 0.22], [0.92, 0.42], [0.66, 0.08]]) { const [x, y] = bp(u, v); pieza(x, y, 'sard'); }
  const mv = ease(tramo(t, T_SIGUE + 0.15, T_VENCE - 0.05)), [hx0, hy0] = bp(0.24, 1.0), [hx1, hy1] = bp(0.72, 0.36), hx = lerp(hx0, hx1, mv), hy = lerp(hy0, hy1, mv);
  const golpe = tramo(t, T_VENCE, T_VENCE + 0.35), [cx, cy] = bp(0.8, 0.3);
  // el surco que deja el halcón en la arena
  if (mv > 0) for (let k = 0; k <= 24; k++) { const u = k / 24 * mv; if (u > mv - 0.04) break; const x = lerp(hx0, hx1, u), y = lerp(hy0, hy1, u); R.pset(ri(x), ri(y), hex('#b88a58')); R.pset(ri(x) + 1, ri(y), hex('#c89a68')); }
  if (golpe > 0.5) { pieza(cx + 2, cy, 'corona', 1);
    // la corona salta y rueda por el tablero
    const r = tramo(t, T_VENCE + 0.2, T_VENCE + 1.3), kx = ri(cx + 18 + r * 26), ky = ri(cy - 2 - Math.abs(Math.sin(r * Math.PI * 2)) * 8 * (1 - r));
    R.rect(kx - 5, ky - 5, kx + 5, ky + 1, K); R.rect(kx - 4, ky - 2, kx + 4, ky, hex('#e8c060')); for (const i of [-4, 0, 4]) { R.rect(kx + i - 1, ky - 4, kx + i, ky - 3, hex('#f0c848')); } R.pset(kx, ky - 1, hex('#c83a3a')); R.linea(kx - 4, ky - 2, kx + 4, ky - 2, hex('#fff0a0')); }
  else pieza(cx, cy - golpe * 3, 'corona');
  pieza(hx, hy, 'halcon');
  // la mano de Paul: baja, coge el halcón, lo empuja y se retira
  const baja = tramo(t, T_SIGUE - 0.9, T_SIGUE), sube = tramo(t, T_SIGUE + 0.45, T_SIGUE + 1.1), emp = ease(tramo(t, T_SIGUE + 0.1, T_SIGUE + 0.4));
  if (baja > 0 && sube < 1) { const wx = hx0 - 10 + emp * 8, wy = hy0 - 13 + (1 - baja) * 34 + sube * 34; T.brazo(R, wx - 18, 186, wx, wy, '#b89a6a', 1, { codo: [wx - 13, wy + 20] }); }
  // la luciérnaga de Atom mira el tablero
  lucie(196 + Math.sin(t * 1.3) * 5, 74 + Math.sin(t * 2.2) * 3, t, { dir: -1, cara: t > T_VENCE ? 'sorpresa' : 'normal', brillo: 0.6 });
};
// 5 · la tarima: Shaddam vencido deja el trono; Paul señala a Irulan
const T_DERROTA = @defeats@, T_EXIGE = @demands@, T_HIJA = @daughter@;
const p5 = (t) => {
  const vacio = t > T_DERROTA + 0.3, o = { encuadre: 'trono', camara: 'tarima', luz: 'dia', vacio };
  T.ciudadela(R, t, o);
  // Shaddam: sentado y enfadado; se levanta sorprendido y se va por la plataforma, triste
  if (!vacio) R.actor(PA.shaddam, 221, 134, t, { dir: -1, enfado: t < T_DERROTA - 0.2, sorpresa: t >= T_DERROTA - 0.2 });
  else { const u = tramo(t, T_DERROTA + 0.5, T_DERROTA + 2.4), x = lerp(232, 330, u); if (x < 326) R.actor(PA.shaddam, ri(x), 135, t, { dir: 1, anda: u > 0 && u < 1, triste: true }); }
  // Irulan entra por la izquierda y, cuando Paul la señala, se acerca
  const e1 = tramo(t, C4 + 0.6, C4 + 2.0), e2 = tramo(t, T_HIJA + 0.1, T_HIJA + 0.9), ix = lerp(-14, 58, e1) + e2 * 28;
  R.actor(PA.irulan, ri(ix), 150, t, { dir: 1, anda: (e1 > 0 && e1 < 1) || (e2 > 0 && e2 < 1), sorpresa: t > T_EXIGE + 0.4 && t < T_HIJA + 0.1, sonrisa: t > C6 - 0.6 });
  // Paul avanza hacia el trono; en «demands» se vuelve y la señala
  const av = tramo(t, C4 + 0.4, C4 + 1.4), px = lerp(118, 150, av), vuelve = t > T_EXIGE - 0.1;
  R.actor(PA.paul, ri(px), 150, t, { dir: vuelve ? -1 : 1, anda: av > 0 && av < 1, dedo: (t > C4 + 1.6 && t < T_DERROTA + 0.4) || (t > T_EXIGE && t < T_HIJA + 0.6), habla: t > T_EXIGE && t < T_HIJA + 0.6 });
  T.ciudadelaDelante(R, t, o);
  lucie(180 + Math.sin(t * 1.2) * 4, 66 + Math.sin(t * 2.4) * 3, t, { dir: 1, cara: t > T_DERROTA - 0.2 && t < T_DERROTA + 1.2 ? 'sorpresa' : t > T_HIJA ? 'triste' : 'normal', brillo: 0.6 });
};
// 6 · fondo propio: la gran puerta del salón abierta al desierto; Chani mira atrás y se vuelve
const T_TRONO = @throne@, T_AMA = @loves@;
const p6 = (t) => {
  fijo('puerta', () => {
    const PI = pal(['#b8946a', '#9a7a56', '#7e6246', '#634c38', '#4a382a', '#2a1e18']);
    // el muro del salón en penumbra (más claro cerca de la puerta) y la bóveda
    sillares(0, 0, 319, 150, PI, { alto: 9, ancho: 20, k: 7, luz: (x, y) => 1.6 - Math.max(0, 1 - Math.hypot(x - 246, y - 100) / 150) * 1.6 + (y < 20 ? 0.8 : 0) });
    // un friso de rombos de bronce bajo la bóveda y una cornisa
    R.rect(0, 26, 196, 33, K); for (let x = 0; x <= 196; x++) for (let y = 27; y <= 32; y++) { const u = Math.abs((x % 8) - 4) + Math.abs(y - 29.5); R.pset(x, y, u < 2 ? hex('#e8c060') : u < 3.5 ? hex('#8a6a30') : hex('#3a2a1c')); }
    R.rect(0, 34, 196, 35, PI[0]);
    // dos nichos con cántaros entre las columnas (x 26–46 y 150–170: no; uno a cada lado del estrado alto)
    for (const nx of [30, 152]) { for (let y = 44; y <= 68; y++) for (let x = nx - 9; x <= nx + 9; x++) { const d = y < 53 ? Math.hypot(x - nx, y - 53) : Math.abs(x - nx); if (d <= 9) R.pset(x, y, d > 8 ? K : rmp(PI, 3.6 - (y - 44) / 24, x, y)); }
      for (let j = 0; j < 12; j++) { const w = ri(Math.sin((j + 2) / 14 * Math.PI) * 5 + 1); R.rect(nx - w - 1, 68 - j, nx + w + 1, 68 - j, K); R.rect(nx - w, 68 - j, nx + w, 68 - j, j % 5 === 2 ? hex('#3a6aa8') : hex('#c88a58')); } }
    // el estrado del fondo (x 24–160): tres escalones y la plataforma en y 118
    for (const [y0, y1, x0, x1] of [[118, 124, 24, 160], [125, 131, 18, 166], [132, 138, 12, 172]]) { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, PI[2]); R.linea(x0 + 1, y0 + 1, x1 - 1, y0 + 1, PI[0]); for (let x = x0 + 9; x < x1; x += 14) R.linea(x, y0 + 2, x, y1 - 1, PI[4]); }
    // el trono (respaldo con el halcón de bronce)
    R.rect(80, 70, 106, 118, K); R.rect(82, 72, 104, 116, hex('#5a4630')); R.rect(84, 74, 102, 100, hex('#3a2c20'));
    R.poligono([[80, 72], [93, 58], [106, 72]], K); R.poligono([[83, 71], [93, 61], [103, 71]], hex('#b88a3a'));
    R.disco(93, 82, 5, hex('#b88a3a')); R.pset(91, 81, hex('#f0c848')); R.linea(88, 84, 98, 84, hex('#e8c060'));
    R.rect(78, 104, 108, 110, K); R.rect(79, 105, 107, 109, hex('#7a2a20'));
    // las columnas acanaladas (x 6–20 y 170–184) con sus capiteles
    for (const cx of [13, 177]) { for (let y = 10; y < 150; y++) for (let x = cx - 7; x <= cx + 7; x++) R.pset(x, y, Math.abs(x - cx) === 7 ? K : rmp(PI, 1.2 + Math.abs(x - cx) / 4 + ((x - cx + 9) % 3 === 0 ? 1 : 0) + (cx > 100 ? -0.6 : 0.4), x, y)); R.rect(cx - 9, 8, cx + 9, 13, K); R.rect(cx - 8, 9, cx + 8, 12, hex('#b88a3a')); R.rect(cx - 9, 146, cx + 9, 150, K); R.rect(cx - 8, 147, cx + 8, 149, PI[1]); }
    // el suelo de losas pulidas con la alfombra de especia hacia el estrado
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 150) / 30, lx = (x - 160) / (1 + v * 0.9); let c = rmp(PI, 2.2 - v * 0.6 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.5, x, y);
      if (Math.abs(((lx + 400) % 24)) < 0.8 || (y - 150) % 8 === 0) c = PI[4]; R.pset(x, y, c); }
    for (let y = 139; y < 180; y++) { const w = 14 + (y - 139) * 0.6, cx = lerp(92, 60, (y - 139) / 41); for (let x = ri(cx - w); x <= ri(cx + w); x++) R.pset(x, y, Math.abs(x - cx) > w - 2 ? hex('#e8c060') : ((x + y) % 6 === 0 ? hex('#a84a2a') : hex('#8a3424'))); }
    // la gran puerta en arco (hueco x 206–286, arco centrado en (246, 58), r 40), con su marco de piedra tallada
    const enP = (x, y) => (y >= 58 && x >= 206 && x <= 286 && y <= 160) || Math.hypot(x - 246, y - 58) <= 40;
    for (let y = 10; y <= 166; y++) for (let x = 196; x <= 296; x++) { const den = enP(x, y), cerca = !den && (enP(x - 5, y) || enP(x + 5, y) || enP(x, y - 5) || enP(x, y + 5)); if (cerca) R.pset(x, y, (x + y) % 5 === 0 ? hex('#e8c060') : PI[0]); }
    for (let y = 10; y <= 166; y++) for (let x = 196; x <= 296; x++) if (enP(x, y)) {
      // dentro: el desierto al ocaso
      let c; if (y < 120) { const u = (y - 18) / 102; c = rmp(pal(['#4a3a7a', '#8a4a6a', '#d8704a', '#f0a050', '#f8d080']), u * 4.4, x, y); }
      else { const d1 = 120 + Math.sin(x * 0.07) * 3 + Math.sin(x * 0.19) * 1.5, d2 = 132 + Math.sin(x * 0.05 + 1) * 5; c = y < d1 ? hex('#f0a050') : y < d2 ? rmp(pal(['#e0884a', '#b8683a', '#8a4a2a']), 0.4 + (y - d1) * 0.2, x, y) : rmp(pal(['#e8a060', '#c8804a', '#a0603a']), (y - d2) * 0.1 + (Math.sin(x * 0.3 + y) > 0.6 ? 1 : 0), x, y); }
      if (Math.hypot(x - 262, y - 116) < 9 && y < 121) c = Math.hypot(x - 262, y - 116) < 7 ? hex('#fff0c0') : hex('#f8d080');
      R.pset(x, y, c); }
    // la meseta lejana y la luz que entra por la puerta y se derrama por el suelo
    R.poligono([[212, 121], [222, 108], [238, 106], [246, 121]], hex('#8a4a3a'));
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const xl = 206 - (y - 150) * 1.6, xr = 286 - (y - 150) * 0.4; if (x >= xl && x <= xr && b4(x, y) < 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#f8c080'), 0.45)); }
  });
  // lo vivo: los estandartes que se mecen, las antorchas, el polvo en la luz de la puerta, la arena que entra
  // dos gonfalones largos colgados del friso (verde con el halcón y negro con la corona), que se mecen abajo
  for (const [gx, k] of [[56, 0], [124, 1]]) { const c = k ? pal(['#3a3a46', '#1a1a20', '#0e0e14']) : pal(['#3a7048', '#1f4a2c', '#12301c']);
    for (let y = 36; y <= 80; y++) { const v = ri(Math.sin(t * 2.2 + k + y * 0.08) * (y - 36) / 44 * 2); for (let x = gx - 8; x <= gx + 8; x++) R.pset(x + v, y, Math.abs(x - gx) === 8 ? K : Math.abs(x - gx) === 6 ? hex('#c8a030') : x - gx < -3 ? c[0] : x - gx > 3 ? c[2] : c[1]); }
    const v = ri(Math.sin(t * 2.2 + k + 80 * 0.08) * 2); R.poligono([[gx - 8 + v, 81], [gx + 8 + v, 81], [gx + v, 88]], K); R.poligono([[gx - 6 + v, 81], [gx + 6 + v, 81], [gx + v, 86]], c[1]);
    R.rect(gx - 10, 35, gx + 10, 36, hex('#b88a3a'));
    const sx = gx + ri(Math.sin(t * 2.2 + k + 4) * 1), sy = 56;
    if (k) { R.rect(sx - 4, sy - 1, sx + 4, sy + 2, hex('#e8c060')); for (const i of [-4, 0, 4]) R.rect(sx + i, sy - 4, sx + i, sy - 2, hex('#f0c848')); }
    else { R.disco(sx, sy, 3, hex('#e8c060')); R.linea(sx - 6, sy - 2, sx - 2, sy, hex('#e8c060')); R.linea(sx + 6, sy - 2, sx + 2, sy, hex('#e8c060')); R.pset(sx + 3, sy - 1, hex('#e8c060')); } }
  for (const cx of [13, 177]) { const f = Math.sin(t * 11 + cx) * 0.8; R.halo(cx, 44, 10 + f * 2, [hex('#e8a050'), hex('#f0c070')], 0.7); R.rect(cx - 2, 46, cx + 2, 50, K); R.poligono([[cx - 2, 46], [cx + 2, 46], [cx + ri(f), 39]], hex('#f08a30')); R.pset(cx, 44, hex('#fff0a0')); }
  for (let k = 0; k < 16; k++) { const u = ((h2(k, 1) + t * (0.05 + h2(k, 2) * 0.05)) % 1), x = ri(lerp(280, 150, u) + Math.sin(t + k) * 4), y = ri(lerp(70, 160, h2(k, 5)) + Math.sin(t * 0.7 + k) * 3); if (x < 296 && x > 120) R.pset(x, y, hex('#ffe0a0')); }
  for (let k = 0; k < 8; k++) { const u = (t * 0.6 + k / 8) % 1, x = ri(286 - u * 90), y = ri(162 + h2(k, 9) * 14 - Math.sin(u * 3) * 3); R.pset(x, y, hex('#e8b070')); R.pset(x + 1, y, hex('#d89a60')); }
  // los guardias Fremen a los lados de la puerta
  R.actor(PA.fremen, 182, 164, t, { dir: 1 }); R.actor(PA.fremen, 292, 164, t, { dir: -1 });
  // Paul e Irulan en el estrado; en «claim the throne» Paul alza los brazos
  R.actor(PA.irulan, 106, 118, t, { dir: -1, sonrisa: t > T_TRONO });
  R.actor(PA.paul, 58, 118, t, { dir: 1, brazos: t > T_TRONO - 0.1 && t < T_TRONO + 1.0, habla: t > C5 && t < T_TRONO - 0.2 });
  // Chani en la puerta, a contraluz: mira atrás (a Paul), baja la cabeza y se vuelve hacia el desierto
  const vuelta = t > C6 - 0.45;
  R.actor(PA.chani, 238, 162, t, { dir: vuelta ? 1 : -1, triste: t > T_AMA - 0.2, anda: vuelta && t > C6 - 0.25 });
  lucie(258 + Math.sin(t * 1.3) * 4, 76 + Math.sin(t * 2.2) * 3, t, { dir: -1, cara: t > T_AMA ? 'triste' : 'normal', brillo: 0.7 });
};
// 7 · la boca del sietch al ocaso: Chani se aleja; Atom la mira desde la repisa; la silueta de lo que él será
const T_COMPR = @understands@, T_SERA = @becoming@;
const p7 = (t) => {
  const o = { encuadre: 'sala', camara: 'entrada' };
  const geo = T.sietch(R, t, o);
  // la silueta enorme de un hombre con corona, en polvo oscuro sobre el cielo del ocaso: cabeza, cuello, hombros,
  // brazos abiertos hacia abajo con sus manos y un manto que se funde con las dunas; borde claro del lado del sol,
  // la corona de oro encima; el polvo se arremolina (ns con t) y unas motas se le escapan a la derecha
  const sil = tramo(t, T_SERA - 1.2, T_SERA + 0.6);
  if (sil > 0) {
    const SX = 92, POL = pal(['#2a1430', '#3e1c36', '#56263c', '#70343e']);
    // el brazo: hombro → codo → muñeca, con la manga ancha que se estrecha, y la mano abierta al final
    const seg = (x, y, ax, ay, bx, by) => { const vx = bx - ax, vy = by - ay, u = cl(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy));
      return [Math.hypot(x - ax - vx * u, y - ay - vy * u), u]; };
    const brz = (x, y, s) => { const [d1, u1] = seg(x, y, SX + s * 26, 61, SX + s * 37, 74), [d2, u2] = seg(x, y, SX + s * 37, 74, SX + s * 43, 88);
      return d1 < 6 - u1 * 0.8 || d2 < 5.2 - u2 * 1.4 || Math.hypot(x - SX - s * 44, y - 91) < 3.4 || Math.hypot(x - SX - s * 46.5, y - 89) < 1.6; };
    const msk = (x, y) => { const dx = x - SX;
      if (((dx) / 10) ** 2 + ((y - 40) / 11) ** 2 < 1) return true;                    // cabeza
      if (Math.abs(dx) < 5 && y > 48 && y < 58) return true;                            // cuello
      if (y >= 54 && y < 66 && (dx / 30) ** 2 + ((y - 66) / 11) ** 2 < 1) return true;  // hombros redondos
      if (y >= 66 && y < 104 && Math.abs(dx) < (y < 80 ? 30 - (y - 66) * 0.55 : 22.3 + (y - 80) * 0.45)) return true; // pecho y manto
      return brz(x, y, -1) || brz(x, y, 1); };
    const fade = (y) => cl((104 - y) / 16);
    for (let y = 26; y < 104; y++) for (let x = 36; x < 150; x++) {
      if (!msk(x, y)) continue;
      const n = ns(x * 0.16 + t * 0.5, y * 0.16 - t * 0.25), aparece = b4(x, y) < sil * 1.1 - 0.1 + n * 0.25;
      if (!aparece) continue;
      const a = fade(y) * Math.min(1, sil * 1.4);
      const borde = !msk(x - 1, y) || !msk(x + 1, y) || !msk(x, y - 1) || !msk(x, y + 1);
      if (borde) { const sol = !msk(x - 1, y) || !msk(x, y - 1); aclara(x, y, sol ? hex('#f8c890') : hex('#c87a68'), a * (sol ? 0.9 : 0.7)); continue; }
      // el polvo en tres tonos: más claro a la izquierda (el sol), más oscuro dentro y abajo
      const v = 1.1 + n * 2.0 + ns(x * 0.5, y * 0.5 + t) * 0.5 + (SX - x) * 0.012 - (y - 40) * 0.006 + (x < SX - 20 && y > 64 ? 0.4 : 0);
      aclara(x, y, rmp(POL, v, x, y), a * 0.88);
    }
    // la corona de oro, apoyada en la cabeza: banda con piedra roja y cinco puntas
    const cv = cl(sil * 1.6 - 0.4);
    if (cv > 0) for (let Y = 20; Y <= 33; Y++) for (let x = SX - 11; x <= SX + 11; x++) {
      const y = Y - 2, dx = x - SX, banda = y >= 27 && Math.abs(dx) <= 10;
      const punta = y < 27 && [-9, -4.5, 0, 4.5, 9].some((d) => Math.abs(dx - d) <= (y - (d === 0 ? 18 : Math.abs(d) > 5 ? 21 : 19.5)) * 0.32);
      if (!(banda || punta) || b4(x, Y) > cv) continue;
      const ext = !(banda || punta) ? 0 : (y === 31 || (banda && Math.abs(dx) === 10));
      R.pset(x, Y, ext ? hex('#7a4a1a') : (x + y) % 4 === 0 ? hex('#fff0a0') : y < 24 ? hex('#f0c848') : hex('#c8962e'));
    }
    if (cv > 0.5) { R.rect(SX - 1, 30, SX + 1, 31, hex('#c83a3a')); R.pset(SX - 1, 30, hex('#ff8a7a')); for (const d of [-9, 0, 9]) if (Math.sin(t * 5 + d) > 0.6) R.pset(SX + d, d === 0 ? 21 : 24, hex('#fffbe0')); }
    // motas de polvo que el viento arranca del hombro y del brazo derechos
    for (let k = 0; k < 14; k++) { const f = (t * 0.35 + k * 0.137) % 1, mx = SX + 20 + k * 2 + f * 44, my = 56 + (k * 7) % 30 - f * 10 + Math.sin(t * 2 + k) * 2;
      if (sil > 0.6 && my > 15) aclara(ri(mx), ri(my), k % 3 ? hex('#56263c') : hex('#f8c890'), (1 - f) * 0.8 * sil); }
  }
  // Chani se da la vuelta y se aleja por la arena hacia el sol; deja huellas
  const u = tramo(t, C6 + 0.2, @fin@), cx = lerp(214, 40, u);
  for (let k = 0; k < 24; k++) { const fx = 214 - k * 7.5; if (fx > cx + 12) { const fy = 154 + (k % 2) * 3; R.rect(ri(fx), fy, ri(fx) + 2, fy + 1, hex('#8a4a2a')); R.pset(ri(fx), fy - 1, hex('#f0b070')); } }
  R.actor(PA.chani, ri(cx), 152, t, { dir: t < C6 + 0.15 ? 1 : -1, anda: u > 0 && u < 1, triste: true });
  T.sietchDelante(R, t, o);
  // Atom en la repisa: la mira irse, triste; al final, pensativo
  atomG(218, 70, t, { pose: t > T_COMPR ? 'piensa' : 'quieto', dir: -1, cara: t > T_SERA ? 'sorpresa' : 'triste', s: 1 });
};
T.rodar(E, R, [[0, p1], [C1, p2], [C2, p3], [C3, p4], [C4, p5], [C5, p6], [C6, p7]], {
  año: 0,
  efectos: [[T_AGUA, 'burbujas'], [T_VENENO + 0.35, 'toc'], [T_MATA + 0.15, 'golpecito'], [T_FUT, 'brillo'], [T_DUDA, 'trueno'],
    [T_GUERRA, 'brillo'], [T_BARRE, 'viento'], [T_SIGUE, 'toc'], [T_VENCE + 0.1, 'golpecito'], [T_DERROTA, 'whoosh'], [T_HIJA, 'pasos'],
    [T_TRONO, 'campana'], [C6 + 0.4, 'viento'], [T_SERA - 0.6, 'brillo']],
});
''', dict(
    c1=A(4.02), c2=A(8.80), c3=A(12.76), c4="en('trono', 0)", c5=A(22.52), c6=A(26.88),
    water=A(0.86), poison=A(2.04), kills=A(2.86), wakes=A(4.24), future=A(5.04), ever=A(6.30), doubt=A(8.10),
    holy=A(9.30), sweep=A(10.94), stars=A(11.90), goahead=A(13.94), beat=A(16.42),
    defeats=A(19.40), demands=A(20.46), daughter=A(21.58), throne=A(24.02), loves=A(25.74),
    understands=A(31.00), becoming=A(31.82), fin=A(32.6)))
))


# ── pa-emperador (frases 11–14) ─────────────────────────────────────────────────────────────────────────────────────
P = lambda s: W('pa-emperador', s)
E['pa-emperador'] = ('El emperador', '''// PA-EMPERADOR (frases 11–14). Año 0 → 12 en «twelve years later»; luego 12. Doce planos:
// 1. fondo propio, el desierto a la tarde: el joven Paul camina por la duna; en «twelve years later» la ciudadela sube de la
//    arena entre polvo y un contador cuenta hasta 12 junto a un reloj; en «no longer the boy from the desert» una racha
//    de arena lo cubre y sale vestido de emperador, de negro. Corta en «He's».
// 2. la fachada enorme (balcon/multitud): en «emperor» Paul, diminuto (negro, con corona y filo de luz), sube a asomarse
//    al balcón delante de una luz suave y saluda; la multitud alza los brazos; naves de peregrinos bajan por el cielo
//    (y 24–60, x 30–270). Corta en «and (thousands)».
// 3. el balcón (balcon/general), GAG (naves en y 24–60, x 30–270): Atom sale al balcón; en «see him» saluda y la plaza entera lo aclama; Paul llega
//    en «step out onto his balcony» y se queda pasmado; Atom le guiña. Corta en «In (the book)».
// 4. inserto, la mesa de la biblioteca: en «the book» la mano abre el libro (Chani y Paul juntos en la página); en la
//    tira de película (cinco cuadros de 22 × 14 sobre el desierto) Chani se aleja: cada cuadro más pequeña, más a un lado
//    y de espaldas, hasta un cuadro vacío; el proyector ilumina un cuadro tras otro y en «movie» la X roja cae sobre el
//    vacío; Atom señala el libro.
// 5. los aposentos (noche): Chani entra y se queda junto a Paul en la ventana («stays by his side»); en «Irulan» Irulan
//    aparece sola en la puerta del pasillo y en «in name only» se va. Corta en «And what».
// 6. fondo propio, el cuarto de la cuna vacía (nicho con tinaja, diván con cojines, mesa baja con la ropita doblada;
//    delante, un cojín con la bandeja de té que humea y una palmera en su tinaja): Chani entra con una mantita y en
//    «give him a child» la deja en la cuna y la mece; en «the years go by» la ventana pasa del día a la noche, la vela
//    se consume y la planta del alféizar crece; en «doesn't come» se aparta hacia la ventana, triste.
// 7. el planeta desde el espacio (orbita/general): en «holy war» salen naves con estelas verdes hacia otros mundos, que
//    se tiñen al llegar («really happened»). Corta en «The Fremen».
// 8. fondo propio, el campo de naves de noche (luna, nubes de tres tonos a tres velocidades, una nave lejana que cruza,
//    focos, balizas que corren; pista con juntas, manchas, flechas pintadas, charcos que reflejan, calzos y un carro de
//    fardos delante): una fila de seis Fremen con estandartes (el halcón de oro de pa-gancho, no un punto) sube por la rampa; la puerta se cierra, la rampa se recoge
//    y en «planet to planet» la nave despega; los que se quedan alzan los estandartes. Corta en «Paul (does the math)».
// 9. la sala del contador de bronce (puerta del pasillo con antorcha y un guardia que pasa, alfombra, brasero y escritorio
//    delante): Paul pasa las cuentas del ábaco mientras los tambores ruedan y paran en 61 («61 billion dead») y suena la
//    campanilla; Hayt llega por la puerta y mira; Paul baja la cabeza.
// 10. fondo propio, la galería de las lámparas (nichos con lámparas colgadas, la galería que se aleja por la abertura del
//    centro, alfombra larga, columna y lámpara de pie delante): en «90 planets» los 90 planetas del friso (tres filas
//    de 30) se apagan uno a uno; en «40 religions» se apagan 40 lámparas y su reflejo en el suelo; Hayt y Paul recorren
//    la galería despacio, se paran a mirar y siguen. Corta en «And the most».
// 11. fondo propio, la mesa del mapa de guerra en escorzo (ventanas de noche, banderas, braseros): tres sacerdotes, al
//    otro lado de la mesa, andan y clavan banderitas, y la guerra se extiende por el mapa; Paul llega por la derecha, en
//    «can't stop it» alza los brazos y en «isn't his anymore» los baja y se aparta, triste. Corta en «the crown».
// 12. el salón del trono de noche (trono/general): Paul se quita la corona («crown») y la deja en el trono; baja; detrás,
//    sacerdotes y fanáticos alzan estandartes («keep fighting in his name»); en «legend has grown bigger» su sombra en el
//    muro crece enorme, y lleva corona. Este plano lo congela pa-etiqueta.''', cuerpo(sub(r'''
const C1 = @c1@, C2 = @c2@, C3 = @c3@, C4 = @c4@, C5 = @c5@, C6 = @c6@, C7 = @c7@, C8 = @c8@, C9 = @c9@, C10 = @c10@, C11 = @c11@;
// la corona del emperador (9 px), sobre la cabeza (cx, yTop) o en la mano
const corona = (cx, y, brillo = 0) => { const X = ri(cx), Y = ri(y);
  R.rect(X - 5, Y - 5, X + 5, Y + 1, K); R.rect(X - 4, Y - 2, X + 4, Y, hex('#e8c060')); R.linea(X - 4, Y - 2, X + 4, Y - 2, hex('#fff0a0'));
  for (const i of [-4, 0, 4]) { R.rect(X + i - 1, Y - 4, X + i, Y - 3, hex('#f0c848')); } R.pset(X, Y - 1, hex('#5a8ae8')); R.pset(X - 3, Y - 1, hex('#c83a3a')); R.pset(X + 3, Y - 1, hex('#c83a3a'));
  if (brillo > 0 && Math.sin(brillo * 9) > 0) { R.pset(X + 6, Y - 6, hex('#ffffff')); R.pset(X + 7, Y - 6, hex('#fff0a0')); R.pset(X + 6, Y - 7, hex('#fff0a0')); } };
// cielo tramado con nubes de tres tonos a tres velocidades
const cielo = (y1, ramp, t, nubes) => {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(ramp, (1 - y / y1) * (ramp.length - 1.2) + (ns(x * 0.02, y * 0.07) - 0.5) * 0.5, x, y));
  nubes.forEach(([cy, vel, c, k]) => { for (let n = 0; n < 3; n++) { const cx = ((n * 140 + k * 60 + t * vel) % 420) - 50;
    for (let j = -4; j <= 4; j++) for (let i = -26; i <= 26; i++) { const e = (i / 26) ** 2 + (j / 4) ** 2 + (ns((i + n * 9) * 0.2, j * 0.4 + k) - 0.5) * 0.6; if (e < 1 && b4(ri(cx + i), cy + j) < 1.2 - e) R.pset(ri(cx + i), cy + j, hex(c)); } } });
};
// 1 · el desierto a la tarde: la ciudadela sube de la arena; el chico del desierto se vuelve emperador
const T_DOCE = @twelve@, T_DESP = @later@, T_CHICO = @boy@, T_FIN1 = @desert@;
const CIU = pal(['#f8dca8', '#e0b880', '#c0965e', '#9a7448', '#6e5034', '#3e2c20']);
const ciudadelaLejos = (u, t) => {
  const base = 132, dy = ri((1 - u) * 96);
  R.recorte([0, 0, 319, base]);
  const bloque = (x0, x1, top, ventanas) => { for (let y = top + dy; y <= base; y++) for (let x = x0; x <= x1; x++) { const lado = x - x0 < 3 ? 0.4 : x1 - x < 4 ? 3 : 1.4; let v = lado + (ns(x * 0.3, (y - dy) * 0.3) - 0.5) * 0.6 + ((y - dy - top) % 9 === 0 ? 1.4 : 0); if (x === x0 || x === x1 || y === top + dy) v = 5; R.pset(x, y, rmp(CIU, v, x, y)); }
    if (ventanas) for (let y = top + 6; y < base - 4; y += 10) for (let x = x0 + 5; x < x1 - 4; x += 8) { R.rect(x, y + dy, x + 2, y + 4 + dy, K); R.rect(x, y + 1 + dy, x + 2, y + 4 + dy, Math.sin(t * 2 + x + y) > 0.6 ? hex('#ffe090') : hex('#e8a050')); R.pset(x + 1, y + dy, hex('#e8a050')); } };
  bloque(150, 300, 96, true); bloque(168, 284, 74, true); bloque(186, 262, 56, true);
  // la cúpula y las torres de viento con sus estandartes
  for (let j = 0; j < 22; j++) { const w = ri(Math.sqrt(1 - (j / 22) ** 2) * 26); R.linea(224 - w, 56 - j + dy, 224 + w, 56 - j + dy, K); if (w > 1) R.linea(224 - w + 1, 56 - j + dy, 224 + w - 1, 56 - j + dy, j > 16 ? CIU[0] : CIU[1]); R.pset(224 + w - 2, 56 - j + dy, CIU[3]); }
  R.linea(224, 34 + dy, 224, 26 + dy, K); R.pset(224, 25 + dy, hex('#e8c060'));
  for (const [tx, tt] of [[156, 48], [292, 54], [176, 40]]) { bloque(tx - 5, tx + 5, tt, false); for (let y = tt + 4; y < tt + 20; y += 5) R.rect(tx - 2, y + dy, tx + 2, y + 2 + dy, K); banderolaG(tx, tt + dy, 12, t, tx); }
  R.recorte(null);
  // el polvo que levanta al subir
  if (u > 0 && u < 1) for (let k = 0; k < 40; k++) { const x = ri(140 + h2(k, 1) * 170), y = ri(base - h2(k, 2) * 18 * u - Math.sin(t * 3 + k) * 2); R.pset(x, y, k % 3 ? hex('#e8c090') : hex('#c89a68')); R.pset(x + 1, y, hex('#d8b080')); }
};
const p1 = (t) => {
  cielo(132, pal(['#f8d890', '#f0b070', '#d88a5a', '#a86a6a', '#6a4a7a', '#3a2c5a']), t, [[34, 3, '#c88a7a', 1], [52, 5.5, '#e8a888', 2], [70, 8, '#f8c8a0', 3]]);
  // el sol bajo a la izquierda y las dos lunas
  R.halo(46, 104, 22, [hex('#f8c070'), hex('#f8d890'), hex('#fff0c0')], 0.8); R.disco(46, 104, 9, hex('#fff0c0'));
  R.disco(262, 48, 7, hex('#f0e8d8')); R.disco(264, 46, 6, hex('#d8d0c8')); R.disco(240, 30, 3, hex('#e8c8b0'));
  for (let k = 0; k < 3; k++) { const x = ri((k * 70 + t * 9) % 340 - 10), y = ri(60 + k * 8 + Math.sin(t * 2 + k) * 2); R.pset(x, y, K); R.pset(x - 1, y - 1, K); R.pset(x + 1, y - 1, K); }
  // mesetas lejanas
  for (let x = 0; x < 320; x++) { const h = 112 - Math.max(0, Math.sin(x * 0.035 + 1) * 8 + Math.sin(x * 0.11) * 3); for (let y = ri(h); y <= 120; y++) R.pset(x, y, rmp(pal(['#c88a6a', '#a86a5a', '#8a5a54']), (y - h) * 0.2 + 0.3, x, y)); }
  ciudadelaLejos(ease(tramo(t, T_DOCE - 0.1, T_DESP + 0.5)), t);
  // dunas en tres términos con sus rizaduras
  const AR = pal(['#f8d098', '#e8b070', '#d0905a', '#b07444', '#8a5634']);
  for (let x = 0; x < 320; x++) {
    const d1 = 122 + Math.sin(x * 0.03 + 2) * 5 + Math.sin(x * 0.09) * 2, d2 = 146 + Math.sin(x * 0.022 + 0.4) * 9, d3 = 162 + Math.sin(x * 0.018 + 3) * 6;
    for (let y = ri(d1); y < 180; y++) { const z = y < d2 ? (y - d1) / 30 : y < d3 ? (y - d2) / 20 : (y - d3) / 22; const lado = y < d2 ? Math.cos(x * 0.03 + 2) : y < d3 ? Math.cos(x * 0.022 + 0.4) : Math.cos(x * 0.018 + 3);
      let v = 1.2 + z * 1.5 + lado * 0.55 + (ns(x * 0.04, y * 0.1) - 0.5) * 0.5 + (Math.sin(x * 0.5 + y * 1.3 + ns(x * 0.05, y * 0.2) * 4) > 0.75 ? 0.8 : 0); if (Math.abs(y - ri(d2)) < 1 || Math.abs(y - ri(d3)) < 1) v = 0;
      R.pset(x, y, rmp(AR, v, x, y)); } }
  // piedras y matas secas en la duna de delante, y arena que vuela de las crestas
  for (const [x, y, k] of [[150, 172, 0], [214, 166, 1], [300, 174, 2], [12, 178, 3], [252, 150, 4]]) { if (k % 2) { R.disco(x, y, 3, K); R.disco(x, y - 1, 2, hex('#7a5a44')); R.pset(x - 1, y - 2, hex('#a8826a')); } else for (let b = -3; b <= 3; b++) R.linea(x, y, x + b * 2 + ri(Math.sin(t * 2 + b) * 0.6), y - 5 - Math.abs(b) % 2 * 2, hex('#8a7040')); }
  for (let k = 0; k < 14; k++) { const u = (t * 0.5 + k / 14) % 1, x = ri(20 + k * 22 + u * 30), y = ri(124 + (k % 3) * 22 - u * 4); R.pset(x, y, hex('#f8e0b0')); }
  // el contador de años junto al reloj de arena
  const ct = tramo(t, T_DOCE, T_DOCE + 0.9);
  if (ct > 0) { const n = Math.min(12, Math.floor(ct * 12.99)); R.icono('reloj', 34, 46, hex('#fff0c0'), K, 2); R.numero(String(n), 56, 62, { tam: 16 }); }
  // el chico del desierto camina; la racha de arena lo cubre y sale vestido de emperador
  const anda = tramo(t, 0.1, T_CHICO - 0.3), px = lerp(26, 118, anda), emp = t > T_CHICO + 0.2;
  R.actor(emp ? PA.paulEmperador : PA.paul, ri(px), 168, t, { dir: 1, anda: anda > 0 && anda < 1, sorpresa: t > T_DOCE && t < T_DOCE + 0.8 });
  if (emp) corona(px + 8, 168 - 26, t);
  for (let k = 0; k < 12; k++) { const fx = 30 + k * 8; if (fx < px - 4) R.rect(fx, 169 + (k % 2) * 2, fx + 1, 169 + (k % 2) * 2, hex('#a06a40')); }
  const ra = tramo(t, T_CHICO - 0.3, T_FIN1 + 0.3);
  if (ra > 0 && ra < 1) for (let k = 0; k < 140; k++) { const x = ri(-60 + ra * 420 - h2(k, 3) * 90), y = ri(140 + h2(k, 4) * 36 + Math.sin(x * 0.1 + k) * 2); R.pset(x, y, k % 3 ? hex('#f0c890') : hex('#d8a068')); if (k % 2) R.pset(x + 1, y, hex('#e8b880')); }
  lucie(278 + Math.sin(t * 1.3) * 4, 128 + Math.sin(t * 2.0) * 3, t, { dir: -1, cara: t > T_DOCE && t < T_DOCE + 1.5 ? 'sorpresa' : 'normal', brillo: 0.7 });
};
// 2 · la fachada enorme: la figura diminuta se asoma; naves de peregrinos
const T_EMP = @emperor@, T_CIU = @citadel@;
// las naves de peregrinos que bajan: siempre dentro de x0–x1 e y0–y1 (fuera de la barra del año y de la zona de Atom)
const naves = (t, y0, y1, n, x0 = 30, x1 = 270) => { for (let k = 0; k < n; k++) {
  const u = (t * 0.05 + h2(k, 1)) % 1, xa = lerp(x0 + 6, x1 - 6, h2(k, 2)), xb = lerp(x0 + 6, x1 - 6, h2(k, 3)), ya = y0 + 3, yb = y1 - 3;
  const x = ri(lerp(xa, xb, u)), y = ri(lerp(ya, yb, u));
  // la estela tenue de donde viene
  for (let s = 1; s < 7; s++) { const v = u - s * 0.025; if (v < 0) break; R.pset(ri(lerp(xa, xb, v)), ri(lerp(ya, yb, v)), s < 3 ? hex('#f8e8c8') : hex('#d8c0a0')); }
  R.rect(x - 4, y - 2, x + 4, y + 1, K); R.rect(x - 3, y - 1, x + 3, y, hex('#d8c098')); R.linea(x - 3, y - 1, x + 3, y - 1, hex('#f0e0c0')); R.pset(x + 3, y, hex('#8a7458'));
  R.pset(x - 1, y, hex('#3a2a20')); R.pset(x + 1, y, hex('#3a2a20')); if (Math.sin(t * 6 + k) > 0) R.pset(x + 4, y - 1, hex('#ff8060')); R.pset(x, y + 2, Math.sin(t * 14 + k) > 0 ? hex('#ffe0a0') : hex('#f0a050')); } };
// Paul diminuto en el balcón (negro, con corona y filo de luz): sube desde detrás de la balaustrada (y 40) al asomarse
const paulBalcon = (t, u, saluda) => {
  const dy = ri((1 - u) * 12), X = 160, pr = (x0, y0, x1, y1, c) => { for (let y = y0 + dy; y <= y1 + dy; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c); };
  R.recorte([144, 18, 176, 39]);
  pr(X - 5, 31, X + 5, 39, K); pr(X - 4, 32, X + 4, 39, hex('#1a1620')); pr(X - 4, 32, X - 3, 39, hex('#4a4058')); pr(X + 3, 33, X + 4, 39, hex('#0c0a10'));
  pr(X - 1, 32, X + 1, 36, hex('#2e2838')); R.pset(X, 33 + dy, hex('#e8c060'));
  pr(X - 3, 25, X + 3, 31, K); pr(X - 2, 26, X + 2, 30, hex('#c89068')); pr(X - 2, 26, X + 2, 26, hex('#2a1a14')); pr(X - 2, 27, X - 2, 28, hex('#2a1a14')); R.pset(X - 1 + (saluda ? 1 : 0), 28 + dy, K);
  pr(X - 3, 22, X + 3, 24, K); pr(X - 2, 23, X + 2, 24, hex('#e8c060')); R.pset(X - 2, 22 + dy, hex('#f0c848')); R.pset(X, 22 + dy, hex('#fff0a0')); R.pset(X + 2, 22 + dy, hex('#f0c848'));
  // el filo de la luz de detrás, por el lado izquierdo del manto y de la cabeza
  for (let y = 32; y <= 39; y++) R.pset(X - 5, y + dy, hex('#fff0c0')); R.pset(X - 3, 26 + dy, hex('#fff0c0')); R.pset(X - 3, 27 + dy, hex('#fff0c0'));
  // el brazo que saluda a la plaza
  if (saluda) { const b = Math.floor(t * 3) % 2; R.linea(X + 4, 33 + dy, X + 7, 28 + dy - b, K); R.linea(X + 5, 33 + dy, X + 7, 29 + dy - b, hex('#2e2838')); R.pset(X + 7, 27 + dy - b, hex('#c89068')); R.pset(X + 8, 27 + dy - b, K); }
  R.recorte(null);
};
const p2 = (t) => {
  const sale = tramo(t, T_EMP - 0.2, T_EMP + 0.6);
  const o = { encuadre: 'balcon', camara: 'multitud', figura: false, aclaman: (tt) => 0.55 * ease(tramo(tt, T_EMP + 0.3, T_EMP + 1.1)) };
  T.ciudadela(R, t, o);
  naves(t, 24, 60, 4);
  // la luz que sale por la puerta del balcón (detrás de Paul, sin tapar la cifra del año)
  if (sale > 0) { R.halo(160, 34, 11 + Math.sin(t * 4), [hex('#f0c070'), hex('#f8e0a0'), hex('#fff8e0')], 0.75 * sale);
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t * 0.3, r0 = 12, r1 = 12 + 7 * sale, sn = Math.sin(a); if (sn < -0.35 || b4(k, 3) >= 0.6) continue; R.linea(ri(160 + Math.cos(a) * r0), ri(34 + sn * r0 * 0.7), ri(160 + Math.cos(a) * r1), ri(34 + sn * r1 * 0.7), hex('#fff8e0')); } }
  if (sale > 0) paulBalcon(t, ease(sale), t > T_EMP + 0.5);
  T.ciudadelaDelante(R, t, o);
  // los brazos que se alzan entre las cabezas de delante al verlo
  if (sale > 0) for (let k = 0; k < 22; k++) { const x = 6 + k * 14 + (k % 3) * 3, y = 146 + (k % 3) * 5 - ri(Math.max(0, Math.sin(t * 5 + k)) * 4 * sale), c = [hex('#3a6aa8'), hex('#8a7048'), hex('#6a2a2a')][k % 3];
    R.rect(x - 1, y + 2, x + 3, y + 16, K); R.rect(x, y + 3, x + 2, y + 16, c); R.rect(x - 1, y - 2, x + 3, y + 2, K); R.rect(x, y - 1, x + 2, y + 1, hex('#d8a878')); }
  lucie(258 + Math.sin(t * 1.2) * 4, 104 + Math.sin(t * 2.1) * 3, t, { dir: -1, cara: t > T_EMP ? 'sonrisa' : 'normal', brillo: 0.8 });
};
// 3 · el balcón (GAG): Atom saluda y la plaza lo aclama
const T_VER = @see@, T_SALE = @step@, T_BALC = @balcony@;
const p3 = (t) => {
  const acl = (tt) => ease(tramo(tt, T_VER + 0.1, T_VER + 0.6)) * (1 - 0.4 * tramo(tt, C3 - 0.6, C3));
  const o = { encuadre: 'balcon', aclaman: acl };
  T.ciudadela(R, t, o);
  naves(t, 24, 60, 5);
  // Paul sale al balcón detrás de Atom y se queda pasmado
  const pv = tramo(t, T_SALE - 0.2, T_BALC), px = lerp(-14, 96, pv);
  R.actor(PA.paulEmperador, ri(px), 132, t, { dir: 1, anda: pv > 0 && pv < 1, sorpresa: pv >= 1 });
  if (pv > 0) corona(px + 8, 132 - 26, t);
  // Atom entra, se asoma, saluda en «see him» y la plaza lo aclama
  const av = tramo(t, C2 + 0.3, T_VER - 0.4), ax = lerp(60, 156, av), saluda = t > T_VER - 0.15 && t < C3 - 0.5;
  atomG(ax, 132, t, { pose: av > 0 && av < 1 ? 'camina' : saluda ? 'saluda' : 'quieto', dir: pv >= 1 && t > T_BALC + 0.3 ? -1 : 1, cara: t > T_BALC + 0.3 ? 'guino' : saluda ? 'sonrisa' : 'normal', s: 1 });
  if (saluda && Math.sin(t * 4) > 0) R.icono('!', 166, 96, hex('#fff0a0'), K, 2);
  const ac = acl(t); if (ac > 0) for (let k = 0; k < 46; k++) { const u = ((t - T_VER) * 0.5 + h2(k, 1)) % 1, x = ri(30 + h2(k, 2) * 280 + Math.sin(t * 2 + k) * 5), y = ri(108 - u * 70); if (u > 0 && y < 110 && y > 22) R.rect(x, y, x + 1, y + (k % 2), [hex('#e8c060'), hex('#3a8a4a'), hex('#f0f0e0'), hex('#c83a3a')][k % 4]); }
  T.ciudadelaDelante(R, t, o);
};
// 4 · inserto: la mesa de la biblioteca: el libro contra la película
const T_LIBRO = @book@, T_PELI = @movie@;
// Chani en miniatura para los fotogramas (h 4–13 px; pies en (cx, pie)), con proporciones de chibi: cabeza grande de
// rizos rojizos, túnica de arena con faja azul que se abre abajo. cara false: de espaldas (se va), solo el pelo
const chaniMini = (cx, pie, h, cara) => {
  const hr = Math.max(1, Math.round(h * 0.27)), cy = pie - h + hr, y0 = cy + hr, w0 = Math.max(1, Math.round(hr * 0.6)), w1 = w0 + (h > 6 ? 1 : 0);
  const cuerpo = (d, c) => { for (let y = y0 - d; y <= pie + (d ? 1 : 0); y++) { const w = ri(lerp(w0, w1, (y - y0) / Math.max(1, pie - y0))) + d; R.linea(cx - w, y, cx + w, y, c); } };
  cuerpo(1, K); R.disco(cx + 0.5, cy + 0.5, hr + 1.2, K);
  cuerpo(0, hex('#c8a878')); for (let y = y0; y <= pie; y++) R.pset(cx + ri(lerp(w0, w1, (y - y0) / Math.max(1, pie - y0))), y, hex('#a08458'));
  if (h > 6) R.linea(cx - w0, y0 + 2, cx + w0, y0 + 2, hex('#3a6aa8'));
  R.disco(cx + 0.5, cy + 0.5, hr + 0.3, hex('#6a2a1a')); if (hr > 1) R.pset(cx - 1, cy - hr + 1, hex('#a8502a'));
  if (cara && hr > 1) { R.disco(cx + 0.5, cy + 1.3, hr - 0.9, hex('#b07850')); R.pset(cx - 1, cy + 1, K); R.pset(cx + 1, cy + 1, K); }
};
const p4 = (t) => {
  fijo('biblio', () => {
    // el muro con los casilleros de rollos (círculos de los extremos en tres tonos), entre pilastras
    const PI = pal(['#c8a878', '#a88a60', '#8a6e4a', '#6a5238', '#4a3828', '#2a1e18']);
    sillares(0, 0, 319, 100, PI, { alto: 10, ancho: 22, k: 11, luz: (x, y) => Math.hypot(x - 160, y - 30) / 140 });
    for (const [x0, x1] of [[16, 116], [204, 304]]) { R.rect(x0 - 3, 24, x1 + 3, 96, K); R.rect(x0 - 2, 25, x1 + 2, 95, hex('#5a3a22'));
      for (let y = 28; y < 90; y += 13) for (let x = x0; x < x1; x += 12) { R.rect(x, y, x + 10, y + 11, hex('#2a1a12')); for (const [dx, dy, c] of [[3, 3, '#e8d8b0'], [7, 4, '#d8c8a0'], [4, 8, '#c8b890'], [8, 8, '#e8d8b0']]) if (h2(x + dx, y + dy) > 0.25) { R.disco(x + dx, y + dy, 2, K); R.disco(x + dx, y + dy, 1, hex(c)); R.pset(x + dx, y + dy, hex('#8a6a40')); } } }
    // la ventana alta del centro con la noche y la luna (x 134–186, y 10–86)
    for (let y = 24; y <= 92; y++) for (let x = 134; x <= 186; x++) { const den = y > 48 ? true : Math.hypot(x - 160, y - 48) < 26; if (!den) continue; const borde = (y > 48 && (x < 137 || x > 183)) || (y <= 48 && Math.hypot(x - 160, y - 48) > 23) || y > 89;
      R.pset(x, y, borde ? hex('#3a2a1c') : rmp(pal(['#3a3a7a', '#24245a', '#141438']), 2 - (y - 24) / 68 * 1.5, x, y)); if (!borde && h2(x, y, 4) > 0.97) R.pset(x, y, hex('#e8e8ff')); }
    R.disco(172, 44, 6, hex('#f0ecd8')); R.disco(174, 42, 5, hex('#2a2a60')); R.linea(160, 25, 160, 92, hex('#3a2a1c')); R.linea(134, 62, 186, 62, hex('#3a2a1c'));
    // la mesa de madera con vetas
    const MA = pal(['#a86a3a', '#8a5430', '#6e4024', '#4e2c18', '#2e1a10']);
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1 + Math.sin(x * 0.05 + ns(x * 0.02, y * 0.3) * 5 + y * 0.7) * 0.6 + (ns(x * 0.4, y * 0.5) - 0.5) * 0.5 + (y > 170 ? 1.5 : 0); if (y === 100) v = 4; if (y === 101) v = 0; R.pset(x, y, rmp(MA, v, x, y)); }
    // el libro abierto (x 20–150, y 108–170): dos páginas con el lomo y las esquinas
    R.poligono([[18, 112], [84, 106], [84, 168], [16, 172]], K); R.poligono([[84, 106], [152, 112], [154, 172], [84, 168]], K);
    R.poligono([[20, 113], [83, 108], [83, 166], [18, 170]], hex('#f0e4c8')); R.poligono([[85, 108], [150, 113], [152, 170], [85, 166]], hex('#f8ecd4'));
    for (let y = 114; y < 166; y += 5) R.linea(24, y, 78, y - 1, hex('#c8b898')); R.linea(84, 107, 84, 167, hex('#a8987a'));
    R.rect(90, 116, 144, 160, hex('#e8d8b8')); R.rect(91, 117, 143, 159, hex('#f0dcb0')); for (let x = 92; x <= 142; x++) for (let y = 146; y <= 158; y++) if (b4(x, y) < 0.5) R.pset(x, y, hex('#e0b878'));
    R.disco(132, 124, 4, hex('#f8e8a0'));
    // la bobina de película (centro 232, 124; r 26) y la tira que sale
    R.disco(232, 126, 27, K); R.disco(232, 126, 26, hex('#8a8a96')); R.disco(232, 126, 22, hex('#5a5a66')); R.disco(232, 126, 18, hex('#2a2430'));
    for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; R.disco(ri(232 + Math.cos(a) * 12), ri(126 + Math.sin(a) * 12), 4, hex('#8a8a96')); R.disco(ri(232 + Math.cos(a) * 12), ri(126 + Math.sin(a) * 12), 3, hex('#141018')); }
    R.disco(232, 126, 4, hex('#a8a8b4')); R.disco(232, 126, 2, K);
    // una lámpara de aceite y un tintero con su pluma
    R.rect(296, 150, 314, 160, K); R.rect(297, 151, 313, 159, hex('#b88a3a')); R.rect(298, 151, 312, 152, hex('#e8c060'));
    R.rect(266, 122, 278, 132, K); R.rect(267, 123, 277, 131, hex('#2a3a5a')); R.rect(267, 123, 268, 131, hex('#4a5a7a')); R.linea(276, 122, 286, 106, hex('#f0f0e8')); R.linea(277, 122, 287, 107, hex('#c8c8c0'));
    for (let x = 262; x <= 282; x++) if (b4(x, 133) < 0.5) R.pset(x, 133, hex('#3e2414'));
  });
  // la página ilustrada: Paul y Chani juntos (en «the book» la mano abre el libro)
  const abre = tramo(t, C3 + 0.05, T_LIBRO + 0.3);
  R.actor(PA.paulEmperador, 98, 146, t, { dir: 1, sonrisa: true, quieto: true }); R.actor(PA.chani, 116, 146, t, { dir: -1, sonrisa: true, quieto: true });
  if (abre < 1) { const w = ri((1 - abre) * 66); R.poligono([[85, 108], [85 + w, 109], [85 + w, 167], [85, 166]], K); if (w > 2) R.poligono([[86, 109], [84 + w, 110], [84 + w, 165], [86, 165]], hex('#e8dcc0')); }
  // la tira de película que sale de la bobina: cinco fotogramas de 22 × 14 sobre el desierto; Chani, cada vez más
  // pequeña y más a un lado, se aleja hasta que el último cuadro queda vacío
  const FX = [162, 188, 214, 240, 266], fy = 157, ALT = [13, 10, 7, 4, 0];
  R.rect(155, fy - 11, 294, fy + 10, K); R.rect(156, fy - 10, 293, fy + 9, hex('#3a2a20')); R.linea(156, fy - 10, 293, fy - 10, hex('#5a4434'));
  for (let x = 158; x < 292; x += 5) { R.rect(x, fy - 9, x + 2, fy - 8, hex('#e8d8b0')); R.rect(x, fy + 7, x + 2, fy + 8, hex('#e8d8b0')); }
  // el fotograma que el proyector ilumina avanza con la voz: del primero (en «the book») al vacío (en «movie»)
  const ilu = t < T_LIBRO + 0.2 ? -1 : Math.min(4, Math.floor(tramo(t, T_LIBRO + 0.2, T_PELI - 0.1) * 4.999));
  FX.forEach((x, k) => {
    for (let y = fy - 7; y <= fy + 6; y++) for (let i = x; i <= x + 21; i++) { const cielo = y < fy + 1 + ri(Math.sin(i * 0.3 + k) * 0.8);
      R.pset(i, y, cielo ? rmp(pal(['#f8e0a8', '#f0c888', '#e8b070']), (y - fy + 7) / 3, i, y) : rmp(pal(['#e8b878', '#d09858', '#b07a44']), (y - fy) / 3 + 0.3, i, y)); }
    R.rect(x, fy - 7, x, fy + 6, K); R.rect(x + 21, fy - 7, x + 21, fy + 6, K);
    const h = ALT[k]; if (h) chaniMini(x + 8 + k * 3, fy + 5 - k, h, k === 0);
    if (k === ilu) { R.rect(x, fy - 8, x + 21, fy - 8, hex('#fff0c0')); R.rect(x, fy + 7, x + 21, fy + 7, hex('#fff0c0')); for (let y = fy - 7; y <= fy + 6; y++) for (let i = x + 1; i <= x + 20; i++) if (b4(i, y) < 0.18) R.pset(i, y, hex('#fff8e0')); }
  });
  // en «movie», la X roja cae sobre el cuadro vacío
  const x = tramo(t, T_PELI - 0.1, T_PELI + 0.15);
  if (x > 0) { const s = ri(lerp(6, 3, x)), w = s * 5; R.icono('X', 277 - (w >> 1), fy - (w >> 1) - 1, hex('#e83a2a'), K, s); }
  // la llama de la lámpara y el humo
  const fl = Math.sin(t * 12) * 0.7; R.halo(305, 146, 9 + fl, [hex('#e8a050'), hex('#f0c070')], 0.7); R.poligono([[303, 150], [307, 150], [305 + ri(fl), 142]], hex('#f08a30')); R.pset(305, 147, hex('#fff0a0'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; R.pset(ri(305 + Math.sin(u * 6 + k) * 2), ri(140 - u * 30), hex('#8a7a6a')); }
  // Atom, de pie sobre la mesa entre el libro y la bobina: señala el libro, luego la película
  atomG(178, 104, t, { pose: t > T_LIBRO - 0.2 && t < T_PELI - 0.4 ? 'senala' : t > T_PELI ? 'brazos' : 'quieto', dir: t > T_PELI - 0.4 ? 1 : -1, cara: t > T_PELI ? 'guino' : 'sonrisa', s: 1 });
  // la mano que abre la página
  if (abre > 0 && abre < 1) T.mano(R, 86 + (1 - abre) * 64, 140, 1, '#5a4a7a', { sinManga: true });
};
// 5 · los aposentos de noche: Chani junto a Paul; Irulan sola en la puerta
const T_QUEDA = @stays@, T_PAREJA = @partner@, T_IRU = @irulan@, T_NOMBRE = @nameonly@;
const p5 = (t) => {
  const o = { encuadre: 'aposentos' };
  T.ciudadela(R, t, o);
  // Irulan en la puerta del pasillo: llega, mira, y en «in name only» se va
  const il = tramo(t, T_IRU - 0.5, T_IRU + 0.1), iv = tramo(t, T_NOMBRE, T_NOMBRE + 0.8);
  if (il > 0 && iv < 1) R.actor(PA.irulan, ri(lerp(290, 262, il) + iv * 30), 150, t, { dir: iv > 0 ? 1 : -1, anda: (il > 0 && il < 1) || iv > 0, triste: t > T_IRU });
  // Paul a la ventana; se vuelve hacia Chani en «true partner»
  const vuelve = t > T_PAREJA - 0.2;
  R.actor(PA.paulEmperador, 146, 150, t, { dir: vuelve ? -1 : 1, sonrisa: vuelve && t < T_IRU, habla: t > T_PAREJA && t < T_IRU - 0.2 });
  corona(154, 150 - 26, 0);
  // Chani entra y se queda a su lado
  const cv = tramo(t, C4 + 0.1, T_QUEDA + 0.6), cx = lerp(30, 124, cv);
  R.actor(PA.chani, ri(cx), 150, t, { dir: 1, anda: cv > 0 && cv < 1, sonrisa: cv >= 1 && t < T_IRU + 0.4, triste: t > T_IRU + 0.4 });
  T.ciudadelaDelante(R, t, o);
  lucie(102 + Math.sin(t * 1.4) * 4, 62 + Math.sin(t * 2.3) * 3, t, { dir: 1, cara: t > T_IRU ? 'triste' : 'sonrisa', brillo: 0.6 });
};
// 6 · fondo propio: el rincón de la cuna vacía; los años pasan por la ventana
const T_HIJO = @child@, T_ANOS = @years@, T_NOVIENE = @doesntcome@;
const p6 = (t) => {
  fijo('cuna', () => {
    const PI = pal(['#d8b088', '#b89068', '#98744e', '#7a5a3c', '#5a4030', '#2e2018']);
    sillares(0, 0, 319, 146, PI, { alto: 9, ancho: 19, k: 23, luz: (x, y) => Math.hypot(x - 220, y - 70) / 170 + (x < 30 ? 0.6 : 0) });
    // el rincón: la arista de la pared y el suelo de esteras
    for (let y = 0; y < 147; y++) for (let x = 26; x < 32; x++) R.pset(x, y, x < 28 ? PI[4] : PI[2]);
    for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 147 ? K : ((x + y * 3) % 9 === 0 ? hex('#8a6a3a') : (Math.floor(x / 6) + Math.floor(y / 3)) % 2 ? hex('#c8a060') : hex('#b08a4c')));
    // un tapiz pequeño, un estante con juguetes de madera y un arcón
    for (let y = 22; y <= 82; y++) for (let x = 44; x <= 84; x++) { const u = Math.abs(((x - 44) % 10) - 5) + Math.abs(((y - 22) % 14) - 7); R.pset(x, y, x === 44 || x === 84 || y === 82 ? hex('#3a1a14') : u < 3 ? hex('#3a6aa8') : u < 6 ? hex('#e8c060') : hex('#9a3424')); }
    R.rect(40, 20, 88, 21, hex('#6a4a2a'));
    R.rect(258, 96, 312, 99, K); R.rect(258, 96, 312, 96, PI[0]);
    R.rect(264, 86, 272, 95, K); R.rect(265, 87, 271, 94, hex('#c8804a')); R.disco(286, 91, 4, K); R.disco(286, 91, 3, hex('#3a6aa8')); R.rect(296, 84, 306, 95, K); R.rect(297, 85, 305, 94, hex('#e8c060')); R.pset(301, 88, K);
    R.rect(236, 124, 312, 147, K); R.rect(237, 125, 311, 146, hex('#6a4224')); R.rect(237, 125, 311, 128, hex('#8a5a30')); for (const x of [250, 298]) { R.rect(x - 3, 132, x + 3, 136, hex('#e8c060')); R.pset(x, 134, K); }
    // la ventana en arco (x 150–206, y 24–100)
    for (let y = 20; y <= 104; y++) for (let x = 146; x <= 210; x++) { const fuera = y < 52 ? Math.hypot(x - 178, y - 52) > 32 : (x < 146 || x > 210); if (fuera) continue; const e = y < 52 ? Math.hypot(x - 178, y - 52) > 28 : (x < 150 || x > 206); if (e || y > 100) R.pset(x, y, y > 100 ? PI[0] : PI[4]); }
    // el nicho en arco bajo el tapiz (x 38–62, y 90–122) con una tinaja de barro y un cuenco
    for (let y = 88; y <= 124; y++) for (let x = 36; x <= 64; x++) { const d = y < 100 ? Math.hypot(x - 50, y - 100) : Math.abs(x - 50); if (d > 14) continue; R.pset(x, y, d > 12.6 || y > 122 ? (y > 122 ? PI[0] : K) : rmp(PI, 3.6 + (x - 38) / 26 * 1.2 - (y - 88) / 40, x, y)); }
    R.disco(46, 114, 6, K); R.disco(46, 114, 5, hex('#b0603a')); R.rect(43, 106, 49, 108, K); R.rect(44, 106, 48, 107, hex('#c8784a')); R.linea(42, 112, 44, 110, hex('#d8906a')); R.linea(41, 116, 51, 116, hex('#7a3a22'));
    R.rect(53, 117, 61, 121, K); R.rect(54, 118, 60, 120, hex('#3a6aa8')); R.linea(54, 118, 60, 118, hex('#6a9ad8'));
    // el diván bajo contra la pared, con tres cojines (x 34–100, y 126–147)
    R.rect(34, 132, 100, 147, K); R.rect(35, 133, 99, 146, hex('#7a3a2a')); R.rect(35, 133, 99, 135, hex('#a85a3a')); for (let x = 37; x < 99; x += 6) R.linea(x, 138, x + 3, 146, hex('#5e2a1e'));
    for (const [cx0, c, cs] of [[42, '#3a6aa8', '#24467a'], [62, '#e8c060', '#b08a30'], [82, '#2e6a4a', '#1e4a32']]) { R.rect(cx0 - 8, 122, cx0 + 8, 134, K); R.rect(cx0 - 7, 123, cx0 + 7, 133, hex(c)); R.rect(cx0 - 7, 130, cx0 + 7, 133, hex(cs)); R.pset(cx0, 127, hex('#f0e8d8')); R.pset(cx0 - 7, 123, hex('#f0e8d8')); R.pset(cx0 + 7, 123, hex('#f0e8d8')); }
    // la mesa baja bajo la ventana (x 154–212, y 128–147): jarra de agua, dos vasos y la ropita doblada, sin estrenar
    R.rect(154, 128, 212, 132, K); R.rect(155, 129, 211, 131, hex('#8a5a30')); R.linea(155, 129, 211, 129, hex('#b07a44')); for (const x of [158, 207]) { R.rect(x - 1, 132, x + 2, 147, K); R.rect(x, 133, x + 1, 146, hex('#6a4224')); }
    R.linea(156, 133, 210, 133, hex('#3e2414'));
    R.disco(166, 122, 5, K); R.disco(166, 122, 4, hex('#c8804a')); R.rect(164, 112, 168, 118, K); R.rect(165, 113, 167, 118, hex('#d8906a')); R.linea(169, 114, 172, 112, K); R.pset(163, 119, hex('#f0b080')); R.pset(164, 120, hex('#f0b080'));
    for (const x of [176, 182]) { R.rect(x, 122, x + 4, 128, K); R.rect(x + 1, 123, x + 3, 127, hex('#8ac0d8')); R.pset(x + 1, 123, hex('#e8f8ff')); }
    for (let k = 0; k < 4; k++) { const y = 125 - k * 3, c = [hex('#e8e0d0'), hex('#8ab0e0'), hex('#e8e0d0'), hex('#e8c8a0')][k]; R.rect(190, y, 206, y + 3, K); R.rect(191, y + 1, 205, y + 2, c); R.pset(198, y + 1, hex('#3a6aa8')); }
  });
  // por la ventana: el cielo pasa del día a la noche (los años) y la luz que entra cambia
  const ciclo = t < T_ANOS - 0.2 ? 0.15 : 0.15 + (t - T_ANOS + 0.2) * 1.5, dia = 0.5 + 0.5 * Math.cos(ciclo * Math.PI * 2);
  R.recorte([150, 24, 206, 100]);
  for (let y = 24; y <= 100; y++) for (let x = 150; x <= 206; x++) { if (y < 52 && Math.hypot(x - 178, y - 52) > 28) continue; const c = mez(hex('#1a1a4a'), hex('#8ac0e8'), dia); R.pset(x, y, b4(x, y) < (y - 24) / 76 * 0.6 ? mez(c, hex('#f8d0a0'), 0.5 * dia + 0.1) : c); if (dia < 0.4 && h2(x, y, 9) > 0.97) R.pset(x, y, hex('#e8e8ff')); }
  { const a = ciclo * Math.PI * 2, sx = ri(178 + Math.sin(a) * 24), sy = ri(70 - Math.cos(a) * 30); R.disco(sx, sy, 5, hex('#fff0b0')); const mx = ri(178 - Math.sin(a) * 24), my = ri(70 + Math.cos(a) * 30); R.disco(mx, my, 4, hex('#e8e8f0')); }
  for (let x = 150; x <= 206; x++) for (let y = 86; y <= 100; y++) R.pset(x, y, rmp(pal(['#c8a070', '#a88050']), (y - 86) / 6 + Math.sin(x * 0.3) * 0.3, x, y));
  R.recorte(null);
  R.linea(178, 24, 178, 100, hex('#3a2a1c')); R.linea(150, 62, 206, 62, hex('#3a2a1c'));
  for (let y = 147; y < 176; y++) for (let x = 0; x < 320; x++) { const xl = 150 - (y - 147) * 1.2, xr = 206 - (y - 147) * 0.6; if (x >= xl && x <= xr && b4(x, y) < 0.35 * (dia + 0.2)) aclara(x, y, hex('#fff0c0'), 0.4); }
  // la vela que se consume con los años
  const vh = ri(lerp(22, 4, tramo(t, T_ANOS - 0.3, T_NOVIENE))); R.rect(222, 146 - vh, 230, 146, K); R.rect(223, 147 - vh, 229, 146, hex('#f0e4c8')); R.rect(223, 147 - vh, 224, 146, hex('#fff8e8')); R.rect(218, 146, 234, 148, hex('#8a6a40'));
  const fl = Math.sin(t * 12) * 0.7; R.halo(226, 141 - vh, 9, [hex('#e8a050'), hex('#f0c070')], 0.6); R.poligono([[224, 146 - vh], [228, 146 - vh], [226 + ri(fl), 139 - vh]], hex('#f08a30')); R.pset(226, 143 - vh, hex('#fff0a0'));
  // la alfombra bajo la cuna, la lámpara colgada y su luz
  for (let y = 152; y < 172; y++) for (let x = 70; x < 180; x++) { const u = Math.abs(((x - 70) % 14) - 7) + Math.abs(((y - 152) % 10) - 5); R.pset(x, y, x < 72 || x > 177 || y < 154 || y > 169 ? hex('#e8c060') : u < 3 ? hex('#3a6aa8') : u < 6 ? hex('#9a3424') : hex('#7a2a20')); }
  { const L = 240, f = Math.sin(t * 9) * 0.6; R.linea(L, 0, L, 34, hex('#4a3020')); R.rect(L - 6, 34, L + 6, 40, K); R.rect(L - 5, 35, L + 5, 39, hex('#b88a3a')); R.halo(L, 30, 14 + f * 2, [hex('#e8a050'), hex('#f0c070')], 0.55); R.poligono([[L - 2, 34], [L + 2, 34], [L + ri(f), 27]], hex('#f08a30')); R.pset(L, 31, hex('#fff0a0')); }
  // la cuna de madera vacía sobre sus balancines, con el móvil de halcones; Chani la mece
  const mece = Math.sin((t - T_HIJO) * 5) * tramo(t, T_HIJO - 0.3, T_HIJO + 0.2) * (1 - tramo(t, T_ANOS + 0.4, T_ANOS + 1.4));
  { const cx = 124, cy = 160, d = ri(mece * 3);
    R.linea(cx - 30, cy + 1 - d, cx + 30, cy + 1 + d, K); R.linea(cx - 29, cy - d, cx + 29, cy + d, hex('#8a5a30')); R.linea(cx - 28, cy + 2 - d, cx + 28, cy + 2 + d, K);
    for (const sx of [-18, 18]) { R.linea(cx + sx, cy - 3, cx + sx - 3, cy + 1, K); R.linea(cx + sx, cy - 3, cx + sx + 3, cy + 1, K); }
    R.rect(cx - 25, cy - 30, cx + 25, cy - 3, K); R.rect(cx - 24, cy - 29, cx + 24, cy - 4, hex('#b07a44')); for (let x = cx - 21; x <= cx + 21; x += 4) R.linea(x + d, cy - 27, x, cy - 6, hex('#7a4e2a')); R.rect(cx - 24, cy - 29, cx + 24, cy - 27, hex('#d8a060')); R.rect(cx - 24, cy - 6, cx + 24, cy - 4, hex('#8a5a30'));
    R.rect(cx - 27, cy - 38, cx - 21, cy - 3, K); R.rect(cx - 26, cy - 37, cx - 22, cy - 4, hex('#c88a50')); R.rect(cx + 21, cy - 34, cx + 27, cy - 3, K); R.rect(cx + 22, cy - 33, cx + 26, cy - 4, hex('#c88a50'));
    R.rect(cx - 20, cy - 33, cx + 18, cy - 29, K); R.rect(cx - 19, cy - 32, cx + 17, cy - 30, hex('#e8e0d0')); for (let x = cx - 17; x < cx + 16; x += 6) R.pset(x, cy - 31, hex('#3a6aa8'));
    R.linea(cx, 60, cx, 92, hex('#4a3020')); R.linea(cx - 14, 92, cx + 14, 92, hex('#4a3020'));
    for (const [i, k] of [[-14, 0], [0, 1], [14, 2]]) { const g = Math.sin(t * 1.5 + k) * 3, y = 100 + k % 2 * 4; R.linea(cx + i, 92, cx + i + ri(g * 0.3), y, hex('#8a7a6a')); R.poligono([[cx + i - 4 + ri(g * 0.3), y + 1], [cx + i + ri(g * 0.3), y - 1], [cx + i + 4 + ri(g * 0.3), y + 1], [cx + i + ri(g * 0.3), y + 3]], hex('#2e6a4a')); R.pset(cx + i + ri(g * 0.3), y + 1, hex('#e8c060')); } }
  // la mantita azul: Chani la trae en brazos y en «give him a child» la deja en la cuna, donde se queda con los años
  const deja = t > T_HIJO + 0.1;
  if (deja) { const cx = 124, cy = 160, d = ri(mece * 3); R.rect(cx - 12, cy - 30 + d, cx + 10, cy - 26 + d, K); R.rect(cx - 11, cy - 29 + d, cx + 9, cy - 27 + d, hex('#8ab0e0')); R.linea(cx - 11, cy - 29 + d, cx + 9, cy - 29 + d, hex('#c8dcf8')); R.pset(cx - 2, cy - 28 + d, hex('#f0e8d8')); }
  // Chani: entra con la mantita, la deja en la cuna, la mece mientras pasan los años y en «doesn't come» se aparta
  // hacia la ventana y se queda mirando fuera, triste
  const cl2 = tramo(t, C5, T_HIJO - 0.4), va = tramo(t, T_NOVIENE - 0.1, T_NOVIENE + 0.9), chx = lerp(214, 154, cl2) + va * 22;
  const lleva = !deja, meceA = deja && t < T_NOVIENE - 0.1;
  const rc = R.actor(PA.chani, ri(chx), 164, t, { dir: va > 0 ? 1 : -1, anda: (cl2 > 0 && cl2 < 1) || (va > 0 && va < 1), sostiene: lleva ? true : meceA ? [ri(chx) - 2, 132 + ri(mece * 3)] : undefined, sonrisa: t > T_HIJO - 0.4 && t < T_ANOS, triste: t > T_ANOS + 0.6 });
  if (lleva && rc && rc.mano) { const [mx, my] = rc.mano; R.rect(mx - 6, my - 3, mx + 4, my + 1, K); R.rect(mx - 5, my - 2, mx + 3, my, hex('#8ab0e0')); R.linea(mx - 5, my - 2, mx + 3, my - 2, hex('#c8dcf8')); }
  // la maceta del alféizar: la planta crece con los años
  { const cr = tramo(t, T_ANOS - 0.3, T_NOVIENE), hp = ri(lerp(3, 13, cr)); R.rect(196, 95, 204, 101, K); R.rect(197, 96, 203, 100, hex('#b0603a')); R.linea(197, 96, 203, 96, hex('#d8806a'));
    for (let k = 0; k < 3; k++) { const bx = 200 + (k - 1) * 2, top = 95 - hp + k % 2 * 2, sw = ri(Math.sin(t * 1.4 + k) * 0.6); R.linea(200, 95, bx + sw, top, hex('#3a6a3a')); R.pset(bx + sw - 1, top + 1, hex('#5a9a4a')); R.pset(bx + sw + 1, top + 2, hex('#5a9a4a')); } }
  // motas de polvo en la luz
  for (let k = 0; k < 10; k++) { const x = ri(150 + h2(k, 1) * 60 - ((t * 3 + k * 7) % 40)), y = ri(110 + h2(k, 2) * 50 + Math.sin(t + k) * 4); if (dia > 0.3) R.pset(x, y, hex('#fff0c0')); }
  // primer plano, abajo a la izquierda: un cojín grande y la bandeja de latón con el té que humea
  { R.disco(26, 176, 22, K); R.disco(26, 176, 21, hex('#9a3424')); for (let j = -18; j <= 18; j += 6) R.linea(8, 170 + j / 3, 44, 168 + j / 3, hex('#7a2a20')); R.disco(20, 166, 6, hex('#b8483a')); R.pset(26, 160, hex('#e8c060')); R.pset(14, 164, hex('#e8c060'));
    R.rect(42, 168, 82, 172, K); R.rect(43, 169, 81, 171, hex('#c89a40')); R.linea(43, 169, 81, 169, hex('#f0d080')); R.rect(46, 172, 48, 179, K); R.rect(76, 172, 78, 179, K);
    R.rect(52, 160, 60, 168, K); R.rect(53, 161, 59, 167, hex('#d8a850')); R.linea(60, 162, 64, 160, K); R.rect(54, 158, 58, 160, K); for (const x of [66, 72]) { R.rect(x, 163, x + 4, 168, K); R.rect(x + 1, 164, x + 3, 167, hex('#b8502a')); R.pset(x + 1, 164, hex('#f0c0a0')); }
    for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; R.pset(ri(68 + k % 2 * 6 + Math.sin(u * 7 + k) * 2), ri(160 - u * 16), u < 0.5 ? hex('#e8e0d8') : hex('#b0a8a0')); } }
  // primer plano, a la derecha: la palmera enana en su tinaja (Chani pasa por detrás al entrar)
  { R.disco(306, 168, 13, K); R.disco(306, 168, 12, hex('#a8603a')); R.linea(296, 160, 316, 160, hex('#d8906a')); for (let j = 0; j < 20; j += 4) R.linea(296, 164 + j / 2, 316, 164 + j / 2, hex('#8a4a2a'));
    for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.42 + Math.sin(t * 1.1 + k) * 0.05, L = 26 - Math.abs(k - 2.5) * 3, ex = 306 + Math.cos(a) * L, ey = 156 + Math.sin(a) * L * 0.8;
      R.linea(306, 156, ri(ex), ri(ey), hex('#2e5a2e')); for (let u = 0.3; u < 1; u += 0.14) { const px = ri(306 + (ex - 306) * u), py = ri(156 + (ey - 156) * u); R.linea(px, py, px + (k < 3 ? -3 : 3), py + 3, k % 2 ? hex('#4a8a3a') : hex('#3a7a34')); } } }
  lucie(84 + Math.sin(t * 1.2) * 4, 104 + Math.sin(t * 2.1) * 3, t, { dir: 1, cara: t > T_NOVIENE ? 'triste' : 'normal', brillo: 0.6 });
};
// 7 · el planeta desde el espacio: las naves salen con estelas verdes hacia otros mundos
const T_GS = @holywar@, T_PASO = @happened@;
const MUNDOS = [[30, 40, 8, '#8aa0c8'], [286, 70, 10, '#c88a6a'], [56, 150, 7, '#a0c08a'], [262, 156, 9, '#c8b0d8'], [28, 100, 5, '#d8c890']];
const p7 = (t) => {
  const o = { encuadre: 'orbita' };
  T.planeta(R, t, o);
  MUNDOS.forEach(([mx, my, mr, c], k) => {
    const sale = T_GS + k * 0.45, llega = sale + 1.6, u = tramo(t, sale, llega);
    const base = hex(c), lit = mez(base, hex('#ffffff'), 0.4), dk = mez(base, K, 0.55), tom = tramo(t, llega, llega + 0.6);
    for (let j = -mr; j <= mr; j++) for (let i = -mr; i <= mr; i++) { const d = Math.hypot(i, j); if (d > mr + 0.3) continue; let col = d > mr - 0.8 ? K : i + j < -mr * 0.5 ? lit : i + j > mr * 0.4 ? dk : base; if (tom > 0 && d <= mr - 0.8 && b4(mx + i, my + j) < tom * 0.7) col = mez(col, hex('#3a8a4a'), 0.7); R.pset(mx + i, my + j, col); }
    if (tom > 0.5) banderita(mx - 1, my - mr + 1, t, k, k % 2 ? hex('#1f4a2c') : hex('#1a1a20'));
    if (u > 0 && u < 1) { const sx = 150, sy = 100, x = lerp(sx + (mx - sx) * 0.45, mx, u), y = lerp(sy + (my - sy) * 0.45, my, u);
      for (let k2 = 0; k2 < 26; k2++) { const v = u - k2 * 0.012; if (v < 0) break; const tx = lerp(sx + (mx - sx) * 0.45, mx, v), ty = lerp(sy + (my - sy) * 0.45, my, v); R.pset(ri(tx), ri(ty), k2 < 8 ? hex('#8ae0a0') : hex('#3a8a4a')); }
      R.rect(ri(x) - 1, ri(y) - 1, ri(x) + 1, ri(y) + 1, hex('#f0f0d0')); R.pset(ri(x), ri(y), hex('#ffffff')); }
  });
  lucie(214 + Math.sin(t * 1.2) * 5, 152 + Math.sin(t * 2.0) * 3, t, { dir: -1, cara: t > T_GS ? 'sorpresa' : 'normal', brillo: 0.8 });
};
// 8 · fondo propio: el campo de naves de noche; los Fremen suben con sus estandartes y la nave despega
const T_PLANETA = @planet@;
// nubes nocturnas tramadas: [y, velocidad, cuerpo, filo de luna, semilla]; tres capas a tres velocidades
const nubesNoche = (t) => [[34, 1.6, '#3a3062', '#6a5e94', 1], [56, 3.4, '#4a3e70', '#7e70a8', 2], [80, 6.2, '#5a4c7c', '#9a8abc', 3]].forEach(([cy, vel, c, cl, k]) => {
  for (let n = 0; n < 3; n++) { const cx = ((n * 150 + k * 70 + t * vel) % 440) - 60, an = 24 + k * 4, al = 3 + k;
    for (let j = -al; j <= al; j++) for (let i = -an; i <= an; i++) { const e = (i / an) ** 2 + (j / al) ** 2 + (ns((i + n * 11) * 0.18, j * 0.45 + k) - 0.5) * 0.7; const X = ri(cx + i), Y = cy + j; if (e < 1 && b4(X, Y) < 1.25 - e) R.pset(X, Y, j < -al * 0.4 && e > 0.45 ? hex(cl) : hex(c)); } } });
const p8 = (t) => {
  fijo('campo', () => {
    cielo(110, pal(['#5a4a7a', '#3a2c5a', '#24183e', '#140e28', '#0a0818']), 0, []);
    for (let k = 0; k < 160; k++) R.pset(ri(h2(k, 1) * 320), ri(h2(k, 2) * 100), h2(k, 3) > 0.8 ? hex('#ffffff') : hex('#a8a8d0'));
    // la luna grande (una de las dos), con sus mares
    R.halo(70, 46, 16, [hex('#3a3060'), hex('#5a5084')], 0.6); R.disco(70, 46, 8, K); R.disco(70, 46, 7, hex('#e8e4d8')); R.disco(73, 44, 2, hex('#c8c4b8')); R.disco(67, 49, 1.5, hex('#c8c4b8')); R.disco(66, 43, 1, hex('#d0ccc0'));
    // la ciudadela lejana con sus luces y las murallas de roca
    for (let x = 0; x < 320; x++) { const h = 100 - Math.max(0, Math.sin(x * 0.04) * 10 + Math.sin(x * 0.13) * 4); for (let y = ri(h); y <= 112; y++) R.pset(x, y, rmp(pal(['#3a2a3a', '#2a1e2e', '#1a1220']), (y - h) * 0.2, x, y)); }
    for (const [x0, x1, top] of [[16, 70, 84], [26, 60, 72], [36, 50, 60]]) { R.rect(x0, top, x1, 112, hex('#2a2030')); for (let y = top + 3; y < 110; y += 6) for (let x = x0 + 3; x < x1 - 2; x += 6) if (h2(x, y) > 0.4) R.pset(x, y, hex('#f0b060')); }
    // la explanada de losas: juntas en perspectiva, manchas de aceite, marcas de aterrizaje y flechas pintadas
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 112) / 68, lx = (x - 200) / (0.4 + v); let c = rmp(pal(['#7a6a6a', '#5a4e54', '#3e3640', '#2a2430']), 2.4 - v * 1.4 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.5 + (h2(x >> 3, y >> 2, 7) - 0.5) * 0.3, x, y); if (Math.abs(lx % 40) < 0.7 || (y - 112) % 9 === 0) c = hex('#2a2430'); else if (h2(x, y, 8) > 0.985) c = hex('#8a7a7a'); R.pset(x, y, c); }
    for (const [mx, my, mr] of [[96, 140, 9], [150, 170, 12], [262, 128, 7], [30, 160, 8], [240, 164, 6]]) for (let j = -mr; j <= mr; j++) for (let i = -mr * 2; i <= mr * 2; i++) { const e = (i / (mr * 2)) ** 2 + (j / mr * 2.2) ** 2 + (ns(i * 0.2 + mx, j * 0.4) - 0.5) * 0.6; if (e < 1 && b4(mx + i, my + j) < 0.75 - e * 0.5) R.pset(mx + i, my + j, hex('#1e1a24')); }
    for (let a = 0; a < 220; a++) { const q = a / 220 * Math.PI * 2; R.pset(ri(206 + Math.cos(q) * 74), ri(152 + Math.sin(q) * 14), (a >> 2) % 2 ? hex('#e8c060') : hex('#3a3040')); }
    for (let k = 0; k < 4; k++) { const x = 40 + k * 22; R.linea(x, 160, x + 6, 164, hex('#c8a040')); R.linea(x, 168, x + 6, 164, hex('#c8a040')); R.linea(x + 1, 160, x + 7, 164, hex('#a88430')); R.linea(x + 1, 168, x + 7, 164, hex('#a88430')); }
    for (let x = 0; x < 132; x += 10) R.rect(x, 173, x + 5, 173, hex('#b89a40'));
    // los charcos (de la última lluvia de los riegos): fondo oscuro que luego refleja las luces
    for (const [cx, cy, a, b] of [[118, 166, 16, 3], [250, 174, 20, 3]]) for (let j = -b; j <= b; j++) for (let i = -a; i <= a; i++) if ((i / a) ** 2 + (j / b) ** 2 < 1) R.pset(cx + i, cy + j, j < 0 ? hex('#1a1630') : hex('#221c3a'));
  });
  nubesNoche(t);
  // una nave lejana que cruza el cielo con sus luces (por debajo de la zona de Atom)
  { const x = ri(((t - 30) * 16) % 420 - 50), y = 64 + ri(Math.sin(t * 0.7)); R.rect(x - 5, y - 1, x + 5, y + 1, K); R.rect(x - 4, y - 1, x + 4, y, hex('#8a7a8a')); R.pset(x - 2, y, hex('#ffe090')); R.pset(x + 1, y, hex('#ffe090')); if (Math.sin(t * 7) > 0) R.pset(x + 5, y, hex('#ff5040')); R.pset(x - 6, y, hex('#a8c8ff')); }
  // los focos que barren el cielo (el de la derecha no entra en la zona de Atom)
  for (const [fx, fk] of [[110, 0], [244, 1]]) { const a = Math.sin(t * 0.6 + fk * 2) * 0.4 - Math.PI / 2; for (let r = 0; r < 90; r++) { const x = ri(fx + Math.cos(a) * r), y = ri(112 + Math.sin(a) * r); if (y > 18 && (r & 1) && !(x > 270 && y < 50)) aclara(x, y, hex('#d8d8f0'), 0.25); } R.rect(fx - 2, 112, fx + 2, 116, hex('#6a6a7a')); R.pset(fx, 112, hex('#f0f0ff')); }
  // las balizas del borde de la pista: una ola de luz que corre hacia la nave
  for (let k = 0; k < 14; k++) { const x = 8 + k * 22, on = ((Math.floor(t * 8) - k) % 14 + 14) % 14 < 2; R.rect(x - 1, 113, x + 1, 115, K); R.pset(x, 114, on ? hex('#ffd060') : hex('#7a5a30')); if (on) { R.pset(x, 112, hex('#ffe8a0')); R.pset(x - 2, 114, hex('#b08a40')); R.pset(x + 2, 114, hex('#b08a40')); } }
  // la nave pequeña posada al fondo
  { for (let j = 0; j < 8; j++) { const w = ri(Math.sqrt(Math.max(0, 1 - ((j - 5) / 5) ** 2)) * 12); R.linea(286 - w, 118 - j, 286 + w, 118 - j, j > 5 ? hex('#a88a6a') : hex('#7a6a5a')); } if (Math.sin(t * 3) > 0) R.pset(286, 110, hex('#ff8060')); }
  // la nave (forma nuestra: casco redondeado de arena con ventanillas, puerta y patas) que despega en «planet to planet»
  const sube = ease(tramo(t, T_PLANETA - 0.2, C8 + 0.1)), NX = 206, ny = ri(140 - sube * 72), cierra = tramo(t, T_PLANETA - 0.7, T_PLANETA - 0.3);
  // los reflejos en los charcos: las luces de la nave y de los focos, que tiemblan
  for (const [cx, cy, a] of [[118, 166, 16], [250, 174, 20]]) for (let i = -a + 2; i < a - 1; i += 2) { const w = Math.sin(t * 5 + i * 0.7); if (w > 0.4) R.pset(cx + i, cy + (i & 2 ? 0 : 1), sube > 0 ? hex('#f0c070') : hex('#8a80b0')); if (Math.abs(i - (NX - cx) * 0.2) < 4 && w > -0.2) R.pset(cx + i, cy - 1, hex('#e8c890')); }
  // los calzos de las patas (se quedan en la pista cuando despega)
  for (const sx of [-1, 1]) { const x = NX + sx * 34; R.poligono([[x - 4, 153], [x + 4, 153], [x + 2, 149], [x - 2, 149]], K); R.poligono([[x - 3, 152], [x + 3, 152], [x + 1, 150], [x - 1, 150]], hex('#e8b040')); }
  if (sube > 0) for (let k = 0; k < 34; k++) { const x = ri(NX - 30 + h2(k, 1) * 60), y = ri(152 - h2(k, 2) * 12 * sube - Math.sin(t * 6 + k)); R.pset(x, y, k % 2 ? hex('#c8a080') : hex('#8a7a7a')); }
  if (sube > 0) R.halo(NX, ny + 6, 18, [hex('#e8a050'), hex('#f0d080'), hex('#fff0c0')], 0.9);
  for (let j = 0; j < 30; j++) { const w = ri(Math.sqrt(Math.max(0, 1 - ((j - 18) / 18) ** 2)) * 40); R.linea(NX - w, ny - j, NX + w, ny - j, K); if (w > 1) for (let x = NX - w + 1; x < NX + w; x++) R.pset(x, ny - j, rmp(pal(['#f0dcb0', '#d8b888', '#a88a60', '#7a6448']), (x - NX + w) / (2 * w) * 2.4 + (j > 22 ? -0.6 : 0.3) + (j % 7 === 0 ? 1 : 0), x, ny - j)); }
  for (const x of [NX - 12, NX, NX + 12, NX + 24]) { R.rect(x - 2, ny - 18, x + 2, ny - 15, K); R.rect(x - 1, ny - 17, x + 1, ny - 16, Math.sin(t * 3 + x) > 0 ? hex('#ffe090') : hex('#e8a050')); }
  // la puerta del costado, iluminada por dentro (se cierra antes de despegar)
  { const ab = ri((1 - cierra) * 8); R.rect(NX - 31, ny - 17, NX - 23, ny - 7, K); R.rect(NX - 30, ny - 16, NX - 24, ny - 8, hex('#a88a60')); if (ab > 0) { R.rect(NX - 30, ny - 8 - ab, NX - 24, ny - 8, hex('#f0c070')); R.rect(NX - 30, ny - 8 - ab, NX - 29, ny - 8, hex('#c88a40')); } }
  for (const sx of [-1, 1]) { const ye = ny + 12 - ri(sube * 8); R.linea(NX + sx * 24, ny - 2, NX + sx * 34, ye, K); R.linea(NX + sx * 25, ny - 2, NX + sx * 35, ye, hex('#6a5a4a')); R.rect(NX + sx * 34 - 2, ye, NX + sx * 34 + 2, ye + 1, K); }
  banderolaG(NX, ny - 30, 12, t, 1, true);
  // la rampa (de la puerta a la pista, x 144 → 176) que se recoge al cerrar
  const RX0 = 144, RY0 = 152, RX1 = NX - 27, RY1 = 132, rec = tramo(t, T_PLANETA - 0.6, T_PLANETA - 0.25);
  if (rec < 1) { const ex = ri(lerp(RX0, RX1, rec)), ey = ri(lerp(RY0, RY1, rec)); R.poligono([[RX1 - 4, RY1], [RX1 + 3, RY1], [ex + 4, ey], [ex - 4, ey]], K); R.poligono([[RX1 - 3, RY1 + 1], [RX1 + 2, RY1 + 1], [ex + 3, ey - 1], [ex - 3, ey - 1]], hex('#8a7a6a')); R.linea(RX1 - 3, RY1 + 1, ex - 3, ey - 1, hex('#b8a890')); }
  // la fila de seis Fremen con sus estandartes: suben por la rampa y entran; los que no llegan antes de que se cierre se
  // quedan al pie y alzan los estandartes cuando despega
  const L1 = RX0 - 20, L2 = Math.hypot(RX1 - RX0, RY1 - RY0), v = 21;
  for (let k = 5; k >= 0; k--) {
    let d = L1 + L2 - 6 - k * 22 + Math.max(0, t - C7) * v;
    if (k >= 2) d = Math.min(d, L1 - (k - 2) * 22);
    if (d >= L1 + L2 - 2) continue;
    const enR = d > L1, u = enR ? (d - L1) / L2 : 0, cx = enR ? lerp(RX0, RX1, u) : 20 + d, fy = enR ? lerp(RY0, RY1, u) : 152;
    const quieto = k >= 2 && d >= L1 - (k - 2) * 22 - 0.01, alza = quieto && t > T_PLANETA - 0.2;
    const r = R.actor(k % 2 ? PA.fremenMujer : PA.fremen, ri(cx) - 7, ri(fy), t + k, { dir: 1, anda: !quieto, sostiene: [ri(cx) + 8, ri(fy) - 13 - (alza ? 3 + ri(Math.sin(t * 6 + k)) : 0)] });
    const m = (r && r.mano) || [ri(cx) + 8, ri(fy) - 13]; banderolaG(m[0], m[1] + 5, 22, t, k, true);
  }
  // el oficial que despide desde la pista
  R.actor(PA.sacerdotePA, 256, 168, t, { dir: -1, dedo: t > T_PLANETA - 1 && t < T_PLANETA + 0.6, brazos: t > T_PLANETA + 0.6 });
  // primer plano a la derecha: el carro de equipaje con sus fardos y la baliza que gira
  { R.rect(278, 162, 318, 168, K); R.rect(279, 163, 317, 167, hex('#6a5a5a')); R.linea(279, 163, 317, 163, hex('#9a8a8a')); for (const wx of [284, 312]) { R.disco(wx, 171, 4, K); R.disco(wx, 171, 3, hex('#3a3440')); R.pset(wx, 171, hex('#8a8a9a')); }
    for (const [bx, by, bw, bh, c] of [[281, 162, 14, 10, '#8a6a4a'], [296, 162, 12, 14, '#7a5a3a'], [308, 162, 9, 8, '#a8805a']]) { R.rect(bx, by - bh, bx + bw, by, K); R.rect(bx + 1, by - bh + 1, bx + bw - 1, by - 1, hex(c)); R.linea(bx + 1, by - bh + 1, bx + bw - 1, by - bh + 1, hex('#c8a078')); R.linea(bx + ri(bw / 2), by - bh + 1, bx + ri(bw / 2), by - 1, hex('#4a3424')); }
    R.linea(278, 162, 272, 150, K); R.linea(272, 150, 268, 150, K);
    const g = Math.floor(t * 6) % 4; R.rect(300, 144, 304, 147, K); R.pset(301 + (g & 1) * 2, 145, g < 2 ? hex('#ff8a30') : hex('#b05020')); if (g === 0) R.halo(302, 145, 6, [hex('#a84a20'), hex('#ff8a30')], 0.6); }
  lucie(128 + Math.sin(t * 1.3) * 4, 96 + Math.sin(t * 2.0) * 3, t, { dir: 1, cara: t > T_PLANETA ? 'sorpresa' : 'triste', brillo: 0.7 });
};
// 9 · la sala del contador de bronce: Paul pasa las cuentas del ábaco mientras los tambores ruedan hasta 61; Hayt, que
// llega por la puerta del pasillo, mira
const T_CUENTA = @math@, T_61 = @n61@;
const GEAR9 = [[64, 50, 18, 1], [247, 74, 18, -1], [72, 98, 12, -1.5]];
const p9 = (t) => {
  fijo('contador', () => {
    const PI = pal(['#b89a7a', '#987a5c', '#7a6046', '#5c4634', '#3e2e24', '#221812']);
    sillares(0, 0, 319, 150, PI, { alto: 10, ancho: 24, k: 31, luz: (x, y) => Math.hypot(x - 160, y - 70) / 150 - Math.max(0, 1 - Math.hypot(x - 22, y - 150) / 70) * 0.8 });
    // la puerta en arco del pasillo (x 270–310, y 62–150): se ve el pasillo que se aleja, con su antorcha
    for (let y = 62; y <= 150; y++) for (let x = 268; x <= 312; x++) { const d = y < 82 ? Math.hypot(x - 290, y - 82) : Math.abs(x - 290); if (d > 22) continue;
      if (d > 20) { R.pset(x, y, K); continue; } if (d > 18) { R.pset(x, y, x < 290 ? PI[1] : PI[3]); continue; }
      const z = Math.abs(x - 290) / 18, pis = y > 128 + (1 - z) * 8; R.pset(x, y, pis ? rmp(PI, 3.2 - (y - 128) / 24, x, y) : rmp(pal(['#5c4634', '#3e2e24', '#221812', '#120c08']), 1 + (1 - z) * 2.2 + ((y - 62) % 9 === 0 ? 0.6 : 0), x, y)); }
    R.rect(284, 96, 296, 124, hex('#120c08')); R.rect(285, 97, 295, 123, hex('#3e2e24')); R.rect(286, 98, 294, 122, hex('#6a4a2a'));
    // el gran marco de bronce del contador (x 92–228, y 22–118) con remaches y engranajes a los lados
    R.rect(90, 24, 230, 120, K); R.rect(91, 25, 229, 119, hex('#8a6a30')); R.rect(93, 27, 227, 117, hex('#b88a3a')); R.rect(95, 29, 225, 115, hex('#6a4a20'));
    for (let x = 96; x < 226; x += 10) { R.pset(x, 26, hex('#f0d080')); R.pset(x, 118, hex('#f0d080')); }
    for (const [gx, gy, gr] of GEAR9) { R.disco(gx, gy, gr + 1, K); R.disco(gx, gy, gr, hex('#8a6a30')); R.disco(gx, gy, gr - 4, hex('#6a4a20')); R.disco(gx, gy, 3, hex('#e8c060')); }
    R.rect(98, 32, 222, 112, hex('#1a1410'));
    // el suelo de losas en perspectiva (juntas que se abren hacia delante) y la alfombra larga
    for (let y = 150; y < 180; y++) { const v = (y - 150) / 30; for (let x = 0; x < 320; x++) { const lx = (x - 160) / (0.6 + v * 1.4); let c = rmp(PI, 1.6 + v * 1.6 + (ns(x * 0.15, y * 0.4) - 0.5) * 0.6 + (h2(ri(lx / 26), ri((y - 150) / 7), 9) - 0.5) * 0.5, x, y);
      if (y === 150) c = K; else if (Math.abs(lx % 26) < 0.6 || [154, 160, 168, 178].includes(y)) c = PI[5]; R.pset(x, y, c); } }
    for (let y = 156; y <= 176; y++) { const v = (y - 156) / 20, x0 = ri(96 - v * 12), x1 = ri(224 + v * 12); for (let x = x0; x <= x1; x++) { const u = Math.abs(((x - x0) % 16) - 8) + Math.abs(((y - 156) % 10) - 5); R.pset(x, y, x - x0 < 2 || x1 - x < 2 || y < 158 || y > 174 ? hex('#c8a040') : u < 3 ? hex('#e8c060') : u < 6 ? hex('#7a2a20') : hex('#9a3424')); } }
    // la mesa con el ábaco de piedras
    R.rect(110, 128, 210, 134, K); R.rect(111, 129, 209, 133, hex('#6e4024')); R.rect(111, 129, 209, 129, hex('#a86a3a')); R.rect(116, 134, 120, 152, hex('#4e2c18')); R.rect(200, 134, 204, 152, hex('#4e2c18'));
    R.rect(116, 114, 118, 128, hex('#4a3020')); R.rect(202, 114, 204, 128, hex('#4a3020'));
  });
  // los tambores de cifras: ruedan y paran en 61
  const u = tramo(t, T_CUENTA + 0.2, T_61), n = ri(lerp(0, 61, u)), tiembla = u > 0 && u < 1 ? ri(Math.sin(t * 40)) : 0;
  R.recorte([98, 32, 222, 112]);
  for (let y = 32; y <= 112; y++) for (let x = 98; x <= 222; x++) if (((x - 98) % 62) < 58) R.pset(x, y, rmp(pal(['#f8ecd0', '#e8d8b0', '#c8b088', '#8a7458']), Math.abs(y - 72) / 40 * 3, x, y));
  if (u > 0 && u < 1) for (let k = 0; k < 6; k++) { const y = 32 + ((ri(t * 300) + k * 14) % 80); R.linea(100, y, 220, y, hex('#c8b088')); }
  R.numero(String(n).padStart(2, '0'), 160 + tiembla, 92, { tam: 48, centro: true });
  R.recorte(null);
  R.rect(158, 32, 162, 112, hex('#6a4a20'));
  if (t > T_61 && Math.sin((t - T_61) * 8) > 0) { R.rect(94, 28, 226, 29, hex('#ff6a4a')); R.rect(94, 115, 226, 116, hex('#ff6a4a')); }
  // la campanilla de encima del marco suena en 61
  { const sw = t > T_61 && t < T_61 + 1.4 ? ri(Math.sin((t - T_61) * 30) * 2) : 0; R.linea(214, 24, 214, 20, K); R.disco(214 + sw, 18, 4, K); R.disco(214 + sw, 18, 3, hex('#e8c060')); R.pset(213 + sw, 16, hex('#fff0a0')); R.rect(213, 21, 215, 23, hex('#6a4a20')); }
  // los engranajes giran mientras cuenta
  for (const [gx, gy, gr, sg] of GEAR9) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + sg * u * 12, X = ri(gx + Math.cos(a) * (gr + 1)), Y = ri(gy + Math.sin(a) * (gr + 1)); R.rect(X - 1, Y - 1, X + 1, Y + 1, hex('#b88a3a')); R.pset(X, Y, hex('#e8c060')); }
  // el ábaco: las cuentas pasan de izquierda a derecha mientras sube la cifra
  for (let k = 0; k < 4; k++) { R.linea(118, 118 + k * 3, 202, 118 + k * 3, hex('#4a3020')); for (let b = 0; b < 9; b++) { const pasada = k * 9 + b < u * 36, bx = pasada ? 196 - b * 4 : 124 + b * 4 + (k % 2) * 2; R.disco(bx, 118 + k * 3, 1, b % 3 ? hex('#e8d8b0') : hex('#3a6aa8')); } }
  // la antorcha del pasillo y la sombra de un guardia que pasa al fondo (recortado a la puerta)
  { const f = Math.sin(t * 11) * 0.6; R.halo(300, 92, 7, [hex('#a86a30'), hex('#e8a050')], 0.6); R.rect(299, 92, 301, 98, K); R.poligono([[298, 92], [302, 92], [300 + ri(f), 86]], hex('#f08a30')); R.pset(300, 90, hex('#fff0a0'));
    R.recorte([272, 64, 308, 148]); const gx = ri(((t - 38) * 9) % 60 + 262); for (let y = 118; y < 140; y++) for (let x = gx; x < gx + 5; x++) if (Math.hypot(x - gx - 2, y - 120) < 3 || (y > 122 && Math.abs(x - gx - 2) < 3)) R.pset(x, y, hex('#1a120c')); R.recorte(null); }
  // Paul pasa las cuentas y se lo cuenta a Hayt; al llegar a 61 baja la cabeza
  const rp = R.actor(PA.paulEmperador, 86, 152, t, { dir: 1, sostiene: t > T_CUENTA - 0.3 && t < T_61 + 0.2 ? [116, 122 + ri(Math.sin(t * 9))] : undefined, dedo: t > C8 && t < T_CUENTA - 0.3, habla: t > C8 && t < T_61, triste: t > T_61 + 0.4 });
  corona(rp.cabeza[0] + 1, rp.cabeza[1], 0);
  // Hayt entra por la puerta del pasillo y se para a mirar
  const hv = tramo(t, C8 + 0.05, T_CUENTA + 0.3), hx = lerp(276, 230, hv);
  R.actor(PA.hayt, ri(hx), 156, t, { dir: -1, anda: hv > 0 && hv < 1, sorpresa: t > T_61 - 0.1 && t < T_61 + 1.2, triste: t > T_61 + 1.2 });
  // primer plano: el brasero de la izquierda (llamas, chispas y humo) y el borde del escritorio con rollos a la derecha
  { const bx = 24, f = Math.sin(t * 10) * 0.8; R.halo(bx, 140, 22 + f * 2, [hex('#a85a20'), hex('#e8a050'), hex('#f0c070')], 0.55);
    R.poligono([[bx - 14, 150], [bx + 14, 150], [bx + 10, 160], [bx - 10, 160]], K); R.poligono([[bx - 13, 151], [bx + 13, 151], [bx + 9, 159], [bx - 9, 159]], hex('#8a6a30')); R.linea(bx - 12, 152, bx + 12, 152, hex('#e8c060'));
    for (const lx of [-8, 0, 8]) R.linea(bx + lx, 160, bx + lx * 1.5, 179, K);
    R.poligono([[bx - 11, 151], [bx + 11, 151], [bx + 4 + ri(f * 2), 134], [bx - 2 - ri(f), 138]], hex('#f08a30')); R.poligono([[bx - 6, 151], [bx + 6, 151], [bx + ri(f * 1.5), 140]], hex('#f8c850')); R.pset(bx, 146, hex('#fff0a0'));
    for (let k = 0; k < 7; k++) { const uu = (t * 0.7 + k / 7) % 1, x = ri(bx + Math.sin(uu * 8 + k) * 6), y = ri(134 - uu * 40); R.pset(x, y, uu < 0.3 ? hex('#ffd060') : uu < 0.6 ? hex('#8a7a6a') : hex('#5a4e48')); } }
  { R.rect(250, 168, 319, 179, K); R.rect(251, 169, 319, 179, hex('#5a3420')); R.linea(251, 169, 319, 169, hex('#8a5a30')); for (let x = 252; x < 319; x += 3) if (h2(x, 1) > 0.5) R.pset(x, 174, hex('#4a2818'));
    for (const [rx, c] of [[262, '#e8d8b0'], [276, '#d8c8a0']]) { R.rect(rx - 6, 163, rx + 6, 168, K); R.rect(rx - 5, 164, rx + 5, 167, hex(c)); R.pset(rx - 6, 165, hex('#8a5a30')); R.pset(rx + 6, 165, hex('#8a5a30')); }
    R.rect(292, 161, 300, 168, K); R.rect(293, 162, 299, 167, hex('#2a3a5a')); R.linea(298, 161, 306, 150, hex('#f0f0e8')); }
  lucie(240 + Math.sin(t * 1.2) * 4, 100 + Math.sin(t * 2.0) * 3, t, { dir: -1, cara: t > T_61 ? 'triste' : 'normal', brillo: 0.6 });
};
// 10 · fondo propio: la galería de las lámparas; los 90 planetas del friso y las 40 lámparas se apagan
const T_90 = @n90@, T_40 = @n40@, T_BORRA = @wiped@;
const NICHOS = [32, 82, 238, 288];
const p10 = (t) => {
  fijo('galeria', () => {
    const PI = pal(['#7a6a8a', '#5e5070', '#463c58', '#322a42', '#221c30', '#120e1a']);
    sillares(0, 0, 319, 140, PI, { alto: 9, ancho: 20, k: 41, luz: (x, y) => Math.hypot(x - 160, y - 90) / 200 });
    // el friso de mosaico (x 8–272, y 22–56) para la hilera de los 90 planetas; a la derecha, muro tranquilo
    R.rect(6, 20, 274, 58, K); for (let y = 22; y <= 56; y++) for (let x = 8; x <= 272; x++) R.pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? hex('#1a1630') : hex('#221c3a'));
    R.rect(8, 21, 272, 22, hex('#e8c060')); R.rect(8, 56, 272, 57, hex('#e8c060')); for (let x = 12; x < 272; x += 8) { R.pset(x, 21, hex('#fff0a0')); R.pset(x, 57, hex('#8a6a30')); }
    // los nichos en arco: fondo hundido en sombra, jamba con luz, ménsula y una tinaja
    for (const cx of NICHOS) for (let y = 60; y <= 106; y++) for (let x = cx - 17; x <= cx + 17; x++) { const d = y < 76 ? Math.hypot(x - cx, y - 76) : Math.abs(x - cx); if (d >= 17) continue;
      if (d > 15.5) R.pset(x, y, K); else if (d > 12.5) R.pset(x, y, x < cx ? PI[1] : PI[3]); else R.pset(x, y, rmp(PI, 3.4 + (y - 60) / 60 + (x - cx + 12) / 24 * 0.8 + ((y - 60) % 7 === 0 ? 0.5 : 0), x, y)); }
    for (const cx of NICHOS) { R.rect(cx - 8, 98, cx + 8, 101, K); R.rect(cx - 7, 98, cx + 7, 99, PI[0]); R.disco(cx, 93, 5, K); R.disco(cx, 93, 4, hex('#8a6a8a')); R.rect(cx - 2, 86, cx + 2, 88, K); R.pset(cx - 2, 91, hex('#b090b0')); }
    // la gran abertura del centro (x 120–200): la galería que se aleja, con sus arcos cada vez más pequeños
    const VX = 160, VY = 88;
    for (let y = 60; y <= 107; y++) for (let x = 118; x <= 202; x++) { const d = y < 80 ? Math.hypot(x - 160, y - 80) : Math.abs(x - 160); if (d >= 42) continue; R.pset(x, y, d > 40.5 ? K : d > 38 ? (x < 160 ? PI[0] : PI[2]) : PI[3]); }
    // los arcos de la galería, uno detrás de otro hacia el fondo (cada vez más pequeños y más oscuros), con su suelo
    for (let i = 0; i < 7; i++) { const z = Math.pow(0.74, i), hw = 36 * z, top = VY - 30 * z, base = Math.min(107, VY + 19 * z), rr = hw;
      for (let y = ri(top); y <= base; y++) for (let x = ri(VX - hw); x <= ri(VX + hw); x++) { const d = y < top + rr ? Math.hypot(x - VX, y - top - rr) : Math.abs(x - VX); if (d > hw) continue;
        const borde = d > hw - 1.2 * z - 0.6, suelo = y > VY + 19 * z * 0.55; R.pset(x, y, borde ? (x < VX ? PI[1] : PI[2]) : suelo ? rmp(PI, 2.6 + i * 0.35 + ((x + y) % 2 ? 0.3 : 0), x, y) : rmp(PI, 3.2 + i * 0.4, x, y)); } }
    R.disco(VX + 0.5, VY - 2, 4, hex('#e8a050')); R.rect(VX - 4, VY - 2, VX + 4, VY + 5, hex('#e8a050')); R.disco(VX + 0.5, VY - 1, 2.5, hex('#f8d080')); R.rect(VX - 2, VY - 1, VX + 2, VY + 5, hex('#f8d080'));
    // la repisa de piedra de las lámparas (y 108) y el banco bajo (y 132–139)
    R.rect(0, 108, 319, 113, K); R.rect(0, 108, 319, 112, PI[1]); R.rect(0, 108, 319, 108, PI[0]); for (let x = 4; x < 320; x += 12) R.pset(x, 111, PI[3]);
    R.rect(0, 132, 319, 139, K); R.rect(0, 133, 319, 138, PI[2]); R.rect(0, 133, 319, 133, PI[0]);
    // el suelo de losas: juntas en perspectiva desde el fondo de la galería, con brillo
    for (let y = 140; y < 180; y++) { const v = (y - 140) / 40; for (let x = 0; x < 320; x++) { const lx = (x - VX) / (0.5 + v * 1.6); let c = rmp(PI, 1.2 + v * 2.4 + (ns(x * 0.12, y * 0.35) - 0.5) * 0.6, x, y);
      if (y === 140) c = K; else if (Math.abs(lx % 24) < 0.6 || [143, 147, 153, 161, 171].includes(y)) c = PI[5]; else if (b4(x, y) < 0.06 && v < 0.6) c = PI[0]; R.pset(x, y, c); } }
    // la alfombra larga que va hacia la galería
    for (let y = 141; y < 180; y++) { const v = (y - 140) / 40, x0 = ri(VX - 18 - v * 30), x1 = ri(VX + 18 + v * 30); for (let x = x0; x <= x1; x++) { const uu = Math.abs((((x - VX) / (1 + v * 1.6)) % 8 + 8) % 8 - 4) + Math.abs(((y * (1.4 - v * 0.6)) % 6) - 3);
      R.pset(x, y, x - x0 < 2 || x1 - x < 2 ? hex('#c8a040') : uu < 2 ? hex('#e8c060') : uu < 4 ? hex('#5a2a4a') : hex('#7a2a3a')); } }
    // la columna de primer plano a la izquierda
    for (let y = 0; y < 180; y++) for (let x = 0; x <= 13; x++) R.pset(x, y, x === 13 ? K : rmp(PI, 2.4 + (x < 4 ? -1 : x > 9 ? 1.4 : 0) + ((y % 30) < 2 ? 1.5 : 0), x, y));
  });
  // la galería del fondo: sus lamparitas tiemblan y un sacerdote diminuto la cruza
  for (const [lx, ly] of [[140, 78], [180, 78], [148, 82], [172, 82]]) { R.pset(lx, ly, Math.sin(t * 7 + lx) > -0.3 ? hex('#ffd070') : hex('#c08040')); }
  { const u = ((t - 38) * 0.12) % 1, x = ri(136 + u * 48), y = 98; R.recorte([120, 60, 200, 107]); for (let j = 0; j < 6; j++) R.linea(x - 1, y - j, x + 1, y - j, hex('#221830')); R.pset(x, y - 6, hex('#221830')); R.recorte(null); }
  // las lámparas colgadas de los nichos
  for (const cx of NICHOS) { const f = Math.sin(t * 8 + cx) * 0.6; R.linea(cx, 60, cx, 72, hex('#3a3040')); R.halo(cx, 76, 8 + f, [hex('#8a5a40'), hex('#e8a050')], 0.5); R.rect(cx - 3, 73, cx + 3, 77, K); R.rect(cx - 2, 74, cx + 2, 76, hex('#b88a3a')); R.pset(cx, 72 + ri(f), hex('#ffe090')); }
  // la hilera de 90 planetas (tres filas de 30, de 5 px): se apagan uno a uno desde «90 planets»
  const ap = tramo(t, T_90, T_40 - 0.3) * 90;
  for (let k = 0; k < 90; k++) { const x = 18 + (k % 30) * 8.6, y = 29 + Math.floor(k / 30) * 10, X = ri(x), off = k < ap, rec = k < ap && k > ap - 1.5;
    const c = off ? hex('#3e3848') : [hex('#5a8ae8'), hex('#8ac06a'), hex('#e8a050'), hex('#c87ac8'), hex('#d8c890')][k % 5];
    R.disco(X + 0.5, y + 0.5, 3, K); R.disco(X + 0.5, y + 0.5, 2.2, c); if (!off) { R.pset(X - 1, y - 1, hex('#ffffff')); R.pset(X + 1, y + 1, mez(c, K, 0.4)); } else R.pset(X, y, hex('#2a2432'));
    if (rec) R.halo(X, y, 5, [hex('#8a8090')], 0.6); }
  if (t > T_90 - 0.05) R.numero('90', 160, 66, { tam: 16, centro: true });
  // las 40 lámparas (repisa y banco): se apagan desde «40 religions» hasta «wiped out»; su reflejo en el suelo también
  const ap2 = tramo(t, T_40, T_BORRA + 0.3) * 40;
  for (let k = 0; k < 40; k++) { const x = 20 + (k % 20) * 15.2, y = k < 20 ? 106 : 132, off = k < ap2, f = Math.sin(t * 9 + k * 1.7) * 0.6, X = ri(x);
    R.rect(X - 4, y - 2, X + 4, y + 1, K); R.rect(X - 3, y - 2, X + 3, y, hex('#b88a3a')); R.pset(X + 4, y - 3, hex('#b88a3a'));
    if (!off) { R.halo(X, y - 7, 6, [hex('#e8a050'), hex('#f0c070')], 0.6); R.poligono([[X - 1, y - 3], [X + 1, y - 3], [X + ri(f), y - 9]], hex('#f08a30')); R.pset(X, y - 5, hex('#fff0a0'));
      if (k >= 20) for (let yy = 142; yy < 156; yy++) if (b4(X, yy) < 0.5 - (yy - 142) / 30 && ((yy + ri(t * 6)) % 3)) aclara(X + ri(Math.sin(yy * 0.9 + t * 4) * 0.7), yy, hex('#f0b060'), 0.45); }
    else { const uu = (t - T_40) * 0.8 + k * 0.1; R.pset(ri(x + Math.sin(uu * 3)), ri(y - 5 - (uu % 1) * 8), hex('#8a8090')); } }
  if (t > T_40 - 0.05) R.numero('40', 160, 96, { tam: 16, centro: true });
  // Hayt y Paul recorren la galería despacio: andan, se paran a mirar el friso, y siguen
  const paso = (a, b) => tramo(t, a, b), d1 = paso(C9 + 0.1, T_90 + 1.3), d2 = paso(T_40 + 0.3, T_BORRA + 1.1), anda = (d1 > 0 && d1 < 1) || (d2 > 0 && d2 < 1);
  const hx = 56 + d1 * 24 + d2 * 22, px = 98 + d1 * 24 + d2 * 22;
  R.actor(PA.hayt, ri(hx), 166, t, { dir: 1, anda, dedo: !anda && t > T_90 + 1.3 && t < T_40 + 0.3, triste: t > T_40 + 0.3 });
  const rp = R.actor(PA.paulEmperador, ri(px), 166, t + 0.4, { dir: anda ? 1 : -1, anda, triste: true, habla: !anda && t > T_90 && t < T_BORRA });
  corona(rp.cabeza[0] + 1, rp.cabeza[1], 0);
  // primer plano a la derecha: el pie de una lámpara grande de bronce
  { const f = Math.sin(t * 9) * 0.7; R.halo(304, 138, 13 + f, [hex('#a86a30'), hex('#e8a050')], 0.55); R.rect(301, 148, 307, 179, K); R.rect(302, 149, 306, 179, hex('#8a6a30')); R.rect(302, 149, 303, 179, hex('#c89a50')); for (const y of [158, 170]) R.rect(300, y, 308, y + 1, hex('#e8c060'));
    R.poligono([[292, 140], [316, 140], [312, 148], [296, 148]], K); R.poligono([[293, 141], [315, 141], [311, 147], [297, 147]], hex('#b88a3a')); R.linea(294, 141, 314, 141, hex('#f0d080'));
    R.poligono([[297, 141], [311, 141], [304 + ri(f), 128]], hex('#f08a30')); R.poligono([[300, 141], [308, 141], [304 + ri(f * 0.5), 133]], hex('#fff0a0')); }
  lucie(262 + Math.sin(t * 1.2) * 4, 150 + Math.sin(t * 2.1) * 3, t, { dir: -1, cara: 'triste', brillo: 0.6 });
};
// 11 · fondo propio: la mesa del mapa de guerra, vista en escorzo: los sacerdotes, al otro lado, clavan banderitas y la
// guerra se extiende por el mapa; Paul llega por la derecha, alza los brazos para pararlo y luego los baja
const T_PARA = @stop@, T_SUYA = @hisany@;
// el mapa sobre la mesa: trapecio de (52, 92)–(268, 92) arriba a (8, 158)–(312, 158) abajo; (u, v) → pantalla
const MAPA = (u, v) => [lerp(lerp(56, 264, u), lerp(14, 306, u), v), lerp(94, 156, v)];
const ESTR = []; for (let k = 0; k < 30; k++) { const u = 0.04 + h2(k, 11) * 0.92, v = 0.06 + h2(k, 12) * 0.88; ESTR.push([u, v, h2(k, 14)]); }
const p11 = (t) => {
  fijo('guerra', () => {
    const PI = pal(['#a88a6a', '#8a6e52', '#6c543e', '#503e2e', '#362a20', '#1e1612']);
    sillares(0, 0, 319, 92, PI, { alto: 10, ancho: 22, k: 53, luz: (x, y) => Math.hypot(x - 160, y - 40) / 160 });
    // dos ventanas altas con la noche y las luces de la ciudad
    for (const wx of [70, 194]) { for (let y = 16; y <= 72; y++) for (let x = wx - 16; x <= wx + 16; x++) { const d = y < 30 ? Math.hypot(x - wx, y - 30) : Math.abs(x - wx); if (d > 16) continue;
        if (d > 14) { R.pset(x, y, K); continue; } if (d > 12) { R.pset(x, y, PI[0]); continue; }
        R.pset(x, y, y > 58 ? (h2(x, y, 3) > 0.8 ? hex('#f0b060') : hex('#1a1428')) : rmp(pal(['#3a3070', '#24204e', '#141030']), 2.2 - (y - 18) / 40, x, y)); if (y < 56 && h2(x, y, 6) > 0.96) R.pset(x, y, hex('#e8e8ff')); }
      R.linea(wx, 18, wx, 72, PI[4]); R.linea(wx - 12, 44, wx + 12, 44, PI[4]); R.rect(wx - 16, 72, wx + 16, 74, PI[0]); }
    R.disco(189, 26, 3, hex('#f0ecd8')); R.pset(190, 25, hex('#c8c4b8'));
    // el suelo de losas a los lados de la mesa (en perspectiva) y el zócalo del muro
    for (let y = 92; y < 159; y++) { const v = (y - 92) / 66; for (let x = 0; x < 320; x++) { const lx = (x - 160) / (0.7 + v * 1.3); let c = rmp(PI, 2.6 + v * 1.2 + (ns(x * 0.12, y * 0.3) - 0.5) * 0.6 + (h2(ri(lx / 22), ri(y / 8), 4) - 0.5) * 0.5, x, y);
      if (Math.abs(lx % 22) < 0.6 || (y - 92) % 9 === 0) c = PI[5]; R.pset(x, y, c); } }
    R.rect(0, 90, 319, 93, K); R.rect(0, 90, 319, 91, PI[1]);
    // la sombra de la mesa en el suelo
    for (let y = 100; y < 159; y++) { const v = (y - 92) / 66; for (const x of [ri(lerp(52, 8, v)) - 1, ri(lerp(52, 8, v)) - 2, ri(lerp(268, 312, v)) + 1, ri(lerp(268, 312, v)) + 2]) if (b4(x, y) < 0.6) sombrea(x, y, 0.4); }
    // el mapa estelar sobre la mesa, en escorzo: nebulosas, rejilla de rutas y estrellas de fondo
    for (let y = 92; y <= 158; y++) { const v = (y - 92) / 66, xl = lerp(52, 8, v), xr = lerp(268, 312, v);
      for (let x = ri(xl); x <= ri(xr); x++) { const u = (x - xl) / (xr - xl); let c;
        if (x - xl < 2 || xr - x < 2 || y < 94 || y > 156) c = (x + y) % 3 ? hex('#b88a3a') : hex('#e8c060');
        else { const n = ns(u * 9, v * 5); c = rmp(pal(['#3a2a6a', '#2a2a5a', '#1c1c44', '#121230', '#0a0a1e']), 3.6 - n * 3, x, y); if (Math.abs(((u * 10) % 1) - 0.5) < 0.03 || Math.abs(((v * 6) % 1) - 0.5) < 0.04) c = hex('#2e2e66'); if (h2(x, y, 5) > 0.975) c = hex('#c8c8f0'); }
        R.pset(x, y, c); } }
    // el canto de la mesa y el suelo con la alfombra
    for (let y = 159; y < 172; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 159 ? K : rmp(pal(['#8a5a30', '#6e4024', '#4e2c18', '#2e1a10']), 1 + (y - 159) / 8 + Math.sin(x * 0.07 + ns(x * 0.02, y * 0.3) * 4) * 0.4, x, y));
    for (let x = 6; x < 320; x += 26) { R.rect(x, 162, x + 12, 168, hex('#3e2414')); R.rect(x + 1, 163, x + 11, 167, hex('#7a4e2a')); R.pset(x + 6, 165, hex('#e8c060')); }
    for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) { const uu = Math.abs((x % 14) - 7) + Math.abs(((y - 172) % 8) - 4); R.pset(x, y, y === 172 ? K : uu < 3 ? hex('#e8c060') : uu < 6 ? hex('#7a2a20') : hex('#9a3424')); }
  });
  // las banderas de guerra que cuelgan entre las ventanas, mecidas
  for (const [bx, k] of [[118, 0], [254, 1]]) { R.linea(bx - 8, 16, bx + 8, 16, hex('#4a3020')); for (let j = 1; j < 34; j++) { const sw = ri(Math.sin(t * 2 + j * 0.2 + k) * (j / 34) * 2); for (let i = -6; i <= 6; i++) R.pset(bx + i + sw, 15 + j, Math.abs(i) === 6 || j === 33 ? hex('#c8a030') : k ? hex('#1f4a2c') : hex('#18181e')); R.pset(bx + sw, 15 + j, j % 6 === 3 ? hex('#f0c848') : k ? hex('#2a5a38') : hex('#26262e')); } }
  // los braseros de las esquinas del fondo
  for (const bx of [26, 294]) { const f = Math.sin(t * 10 + bx) * 0.8; R.halo(bx, 70, 12 + f * 2, [hex('#a85a20'), hex('#e8a050')], 0.6); R.rect(bx - 7, 76, bx + 7, 81, K); R.rect(bx - 6, 77, bx + 6, 80, hex('#b88a3a')); R.linea(bx - 5, 81, bx - 7, 94, K); R.linea(bx + 5, 81, bx + 7, 94, K);
    R.poligono([[bx - 5, 77], [bx + 5, 77], [bx + ri(f), 64]], hex('#f08a30')); R.poligono([[bx - 2, 77], [bx + 2, 77], [bx + ri(f * 0.5), 69]], hex('#fff0a0')); }
  // tres sacerdotes al otro lado de la mesa: andan a lo largo del borde y se inclinan a clavar banderitas
  const pv = (k) => tramo(t, C10 + 0.1 + k * 0.3, C11 - 0.2);
  const SAC = [[60, 120], [128, 186], [200, 246]].map(([a, b], k) => { const u = pv(k), cx = lerp(a, b, u), pica = Math.sin(t * 4 + k * 2) > 0.3 && u > 0 && u < 1; return { cx, pica, k, u }; });
  for (const q of SAC) { const r = R.actor(PA.sacerdotePA, ri(q.cx) - 7, 99, t + q.k, { dir: 1, anda: q.u > 0 && q.u < 1 && !q.pica, sostiene: q.pica ? [ri(q.cx) + 10, 94] : undefined, sonrisa: true }); q.mano = r && r.mano; }
  // la mesa delante de ellos (su borde lejano tapa las piernas): se repinta la franja y = 92–106 del mapa, ya fija
  for (let y = 92; y <= 99; y++) { const v = (y - 92) / 66, xl = lerp(52, 8, v), xr = lerp(268, 312, v); for (let x = ri(xl); x <= ri(xr); x++) R.pset(x, y, FIJOS.guerra[y * 320 + x]); }
  // las banderitas: las que clavan los sacerdotes y las que se extienden desde ellas por el mapa (siguen después de «stop»)
  const ext = tramo(t, C10 + 0.4, C11 - 0.1);
  ESTR.forEach(([u, v, hh], k) => { const [x, y] = MAPA(u, v), X = ri(x), Y = ri(y), r = 1 + v * 2, on = hh * 0.5 + v * 0.5 < ext * 1.05;
    R.disco(X + 0.5, Y + 0.5, r + 1, K); R.disco(X + 0.5, Y + 0.5, r, on ? hex('#c84a3a') : hex('#d8d0b0')); R.pset(X - 1, Y - 1, hex('#fff0d0'));
    if (on) { const g = on && hh * 0.5 + v * 0.5 > ext * 1.05 - 0.06 ? 1 : 0; banderita(X, Y - 1 + g, t, k, k % 2 ? hex('#1f4a2c') : hex('#1a1a20')); } });
  for (const q of SAC) if (q.pica && q.mano) banderita(q.mano[0], q.mano[1] + 2, t, q.k, hex('#1f4a2c'));
  // Paul llega por la derecha, alza los brazos para pararlo en «can't stop it» y en «isn't his anymore» los baja y se aparta
  const ll = tramo(t, C10 + 0.1, C10 + 1.4), atr = tramo(t, T_SUYA, T_SUYA + 0.8), alza = t > T_PARA - 0.25 && t < T_SUYA - 0.1, px = lerp(330, 278, ll) + atr * 10;
  const rp = R.actor(PA.paulEmperador, ri(px), 178, t, { dir: atr > 0 && atr < 1 ? 1 : -1, anda: (ll > 0 && ll < 1) || (atr > 0 && atr < 1), brazos: alza, enfado: alza, triste: t > T_SUYA - 0.1 });
  corona(rp.cabeza[0] + 1, rp.cabeza[1], 0);
  if (alza) R.icono('X', ri(px) - 10, 132, hex('#e83a2a'), K, 2);
  lucie(30 + Math.sin(t * 1.2) * 4, 124 + Math.sin(t * 2.0) * 3, t, { dir: 1, cara: t > T_SUYA ? 'triste' : 'sorpresa', brillo: 0.6 });
};
// 12 · el salón del trono de noche: Paul se quita la corona; los fanáticos siguen; la sombra con corona crece en el muro
const T_CORONA = @crown@, T_LUCHA = @fighting@, T_LEYENDA = @legend@, T_GRANDE = @bigger@;
const sombraGrande = (s, t) => {
  if (s <= 0) return;
  const B = R.buf, Wd = 30, Hd = 40, copia = B.slice(0, 320 * Hd);
  for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) B[j * 320 + i] = MK;
  R.actor(PA.paulEmperador, 7, 38, t, { dir: 1, quieto: true }); corona(15, 12, 0);
  const px = []; for (let j = 0; j < Hd; j++) for (let i = 0; i < Wd; i++) { const c = B[j * 320 + i]; if (c !== MK) px.push([i, j, j < 14 && (c & 255) > 200 && ((c >>> 8) & 255) > 150 && ((c >>> 16) & 255) < 140]); }
  B.set(copia, 0);
  const sc = lerp(1, 2.6, s), X0 = 160 - 15 * sc, Y0 = 108 - 38 * sc;
  R.recorte([96, 18, 224, 108]);
  const hecho = new Set();
  for (const [i, j, oro] of px) for (let x = Math.floor(X0 + i * sc); x < Math.floor(X0 + (i + 1) * sc); x++) for (let y = Math.floor(Y0 + j * sc); y < Math.floor(Y0 + (j + 1) * sc); y++) { const k = y * 320 + x; if (hecho.has(k)) continue; hecho.add(k); R.pset(x, y, oro ? mez(R.pget(x, y), hex('#e8b840'), 0.3 + s * 0.5) : mez(R.pget(x, y), hex('#0a0610'), 0.25 + s * 0.4)); }
  R.recorte(null);
};
const p12 = (t) => {
  const vacio = t > T_CORONA + 1.1, o = { encuadre: 'trono', luz: 'noche', vacio };
  T.ciudadela(R, t, o);
  sombraGrande(ease(tramo(t, T_LEYENDA - 0.3, T_GRANDE + 0.4)), t);
  // Paul en la tarima: se quita la corona, se vuelve y la deja en el asiento, y baja la escalinata, triste
  const baja = tramo(t, T_CORONA + 1.3, T_LUCHA + 0.6), py = baja < 0.33 ? 121 : baja < 0.66 ? 128 + 0 : baja < 1 ? 135 : 150;
  const pyy = ri(lerp(121, 150, baja)), px = 152;
  const quita = tramo(t, T_CORONA - 0.2, T_CORONA + 0.4), deja = tramo(t, T_CORONA + 0.6, T_CORONA + 1.1);
  const lleva = t > T_CORONA - 0.2 && t < T_CORONA + 1.1;
  const r = R.actor(PA.paulEmperador, px, pyy, t, { dir: t > T_CORONA + 0.4 && t < T_CORONA + 1.2 ? -1 : 1, sostiene: lleva ? [px + (t > T_CORONA + 0.4 ? -1 : 16), pyy - 22 - ri(quita * 2) + ri(deja * 8)] : undefined, triste: t > T_CORONA + 1.1, anda: baja > 0 && baja < 1 });
  if (t < T_CORONA - 0.2) corona(px + 8, pyy - 26, 0);
  else if (lleva && r.mano) corona(r.mano[0], r.mano[1] - 1, t);
  // los sacerdotes y los fanáticos siguen alzando estandartes, más en «keep fighting in his name»
  const fuerte = tramo(t, T_LUCHA - 0.3, T_LUCHA + 0.3);
  [[40, 1, PA.sacerdotePA], [64, 1, PA.fremen], [90, 1, PA.fremenMujer], [216, -1, PA.fremen], [242, -1, PA.sacerdotePA], [268, -1, PA.fremen]].forEach(([x, d, def], k) => {
    const sube = Math.max(0, Math.sin(t * (2.4 + fuerte * 2) + k * 1.3)) * (3 + fuerte * 5);
    const hx = x + (d > 0 ? 15 : 1), hy = ri(136 - sube);
    const r = R.actor(def, x, 152, t, { dir: d, sostiene: [hx, hy], sonrisa: fuerte > 0.5, habla: fuerte > 0.5 && k % 2 === 0 });
    const m = r.mano || [hx, hy]; banderolaG(m[0], m[1] + 6, 28, t, k); });
  T.ciudadelaDelante(R, t, o);
  lucie(286 + Math.sin(t * 1.2) * 4, 96 + Math.sin(t * 2.0) * 3, t, { dir: -1, cara: t > T_LEYENDA ? 'sorpresa' : 'triste', brillo: 0.7 });
};
const DESP = @later@;
T.rodar(E, R, [[0, p1], [C1, p2], [C2, p3], [C3, p4], [C4, p5], [C5, p6], [C6, p7], [C7, p8], [C8, p9], [C9, p10], [C10, p11], [C11, p12]], {
  año: (t) => (t < DESP ? 0 : 12),
  efectos: [[T_DOCE, 'avalancha'], [T_CHICO - 0.2, 'viento'], [T_EMP, 'campana'], [T_VER + 0.1, 'publico'], [T_LIBRO, 'papel'], [T_PELI, 'sello'],
    [T_IRU - 0.4, 'puerta'], [T_ANOS, 'tic'], [T_GS, 'whoosh'], [T_PLANETA - 0.2, 'arranque'], [T_CUENTA + 0.2, 'maquina'], [T_61, 'campana'],
    [T_90, 'interruptor'], [T_40, 'viento'], [T_PARA, 'golpecito'], [T_CORONA, 'brillo'], [T_LUCHA, 'publico'], [T_LEYENDA, 'trueno']],
});
''', dict(
    c1=P(5.60), c2=P(10.74), c3="en('chani', 0)", c4=P(19.75), c5=P(24.85), c6="en('cuenta', 0)", c7=P(35.51), c8=P(39.79),
    c9=P(43.51), c10="en('leyenda', 0)", c11=P(54.74),
    twelve=P(1.48), later=P(2.26), boy=P(4.28), desert=P(4.86), emperor=P(5.94), citadel=P(8.94),
    see=P(13.36), step=P(13.78), balcony=P(14.96), book=P(16.25), movie=P(18.93),
    stays=P(19.87), partner=P(21.45), irulan=P(22.49), nameonly=P(23.83),
    child=P(26.59), years=P(28.05), doesntcome=P(29.85),
    holywar=P(32.11), happened=P(34.37), planet=P(37.61), math=P(40.55), n61=P(41.71),
    n90=P(43.51), n40=P(46.35), wiped=P(47.09), stop=P(50.40), hisany=P(52.08),
    crown=P(54.92), fighting=P(57.68), legend=P(59.46), bigger=P(60.26))))
)
