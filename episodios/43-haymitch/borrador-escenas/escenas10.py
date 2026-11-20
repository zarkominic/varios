import re

# Las marcas de la voz inglesa de hm-cierre (marcas-ep43.json): cada instante del cuerpo se escribe como @segundos y se
# convierte en en('marca', f).
_FR = [('prim', 1.0, 22.552), ('huevos', 23.252, 38.261), ('termino', 38.961, 57.46), ('pregunta', 58.16, 68.821)]


def _en(s):
    for i, (k, a, b) in enumerate(_FR):
        if s <= b or i == len(_FR) - 1:
            if s < a and i > 0:
                kp, ap, bp = _FR[i - 1]
                if s - bp < a - s:
                    k, a, b = kp, ap, bp
            return "en('%s', %s)" % (k, ('%.4f' % ((s - a) / (b - a))).rstrip('0').rstrip('.'))
    raise ValueError(s)


def _marcas(js):
    return re.sub(r'@(\d+(?:\.\d+)?)', lambda m: _en(float(m.group(1))), js)


E = {}
E['hm-cierre'] = ('El cierre', '''// HM-CIERRE (frases 37–40), ánimo: cierre. Año 74 (el epílogo, canon del 43) y 50 en el plano 12. Trece planos:
// 1. la Veta de día: Katniss y Prim de la mano hacia la cosecha, otros chicos detrás; la vecina saluda (corta en «a girl»);
// 2. INSERTO local: la urna de cristal de cerca; la mano rosa de la escolta revuelve y saca una papeleta en «comes out»
//   (la sube hasta delante del muro, donde se lee);
//   se abre: una prímula dibujada, sin letras; Atom (luciérnaga) se sorprende (corta en «sister»);
// 3. la plaza de día: Prim sube sola por el pasillo; en «volunteers» Katniss sale de su fila y se pone delante con los
//   brazos abiertos; las palomas echan a volar; Haymitch levanta la cabeza en el escenario (corta en «anyone»);
// 4. el escenario: Katniss sube, la escolta aplaude; Haymitch mayor la mira en «sees», baja la petaca y da dos pasos
//   hacia ella en «knows very well» (corta en «someone»);
// 5. díptico local: dos fotos enmarcadas, a la izquierda (sepia) el Haymitch de 16 delante de Lenore Dove, a la derecha
//   Katniss delante de Prim, los dos con los brazos abiertos; Atom entre las dos en «protect them»;
// 6. la Aldea de los Vencedores de día: Katniss cruza con la cesta de huevos y se la da a Haymitch en «goose eggs»;
//   Peeta llega con la caja (corta en «Peeta»);
// 7. INSERTO local: el banco de trabajo: la mano de Peeta clava el último clavo de la incubadora y enciende la bombilla
//   en «incubator»; la mano de Haymitch aparta la botella en «the drunk» y deja el último huevo en «trusted no one»;
// 8. el prado de cerca, de día: Haymitch en el tronco; un huevo del nido se mueve, Atom salta y se esconde detrás de
//   él y asoma (gag); Haymitch silba (notas) en «the girl who sang»;
// 9. el árbol de los sinsajos al amanecer: un sinsajo canta en la rama larga; en «Lenore Dove» se sacude y suelta una
//   pluma, que baja y se posa en la mano de Atom en «right»; en «tomorrow» Atom la levanta hacia el sol y el sinsajo y
//   otros dos pájaros vuelan hacia la luz;
// 10. el prado al amanecer: el sol sale en «sun rose»; Haymitch llega con tres ocas en fila; en «kept his promise» Atom
//   suelta la gominola dorada, que sube y se hace luz;
// 11. la Veta al amanecer: Katniss con el arco pasa por delante de las casas y Haymitch llega calle abajo; en «a girl
//   with a bow» se saludan; ella silba las cuatro notas;
// 12. la casa de Haymitch, de noche, Juegos 50: el chico de 16 junto a la mesa con el bollo; Atom en la mesa le señala
//   y sale el «1» en «one thing»;
// 13. el estudio de noche, cámara de la mesa (no la general, que ya usa hm-culpa 10): Atom (al doble) llega andando por
//   la mesa, mira a cámara; en la pizarra, junto al chico de 16 y su vela de tiza, se traza un «?» en «what would you
//   say»; señala abajo, donde suben los bocadillos de los comentarios en «comments»; guiña.''', _marcas(r'''
const AT = T.AT, K = T.C.k, BL = hex('#ffffff');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ri = Math.round, P = (x, y, c) => R.pset(ri(x), ri(y), c);
const mez = (a, b, u) => { const r = (a & 255) + ((b & 255) - (a & 255)) * u, g = ((a >> 8) & 255) + (((b >> 8) & 255) - ((a >> 8) & 255)) * u, bl = ((a >> 16) & 255) + (((b >> 16) & 255) - ((a >> 16) & 255)) * u; return (0xff000000 | (ri(bl) << 16) | (ri(g) << 8) | ri(r)) >>> 0; };
const VOZ = ['prim', 'huevos', 'termino', 'pregunta'].map((k) => [en(k, 0), en(k, 1)]);
const voz = (t) => VOZ.some(([a, b]) => t > a && t < b) ? 1 : 0;
const P2 = en('prim', 0.1601), P3 = en('prim', 0.3508), P4 = en('prim', 0.5591), P5 = en('prim', 0.8352), P6 = en('huevos', 0), P7 = en('huevos', 0.333), P8 = en('huevos', 0.7294), P9 = en('termino', 0),
  P10 = en('termino', 0.3751), P11 = en('termino', 0.7503), P12 = en('pregunta', 0), P13 = en('pregunta', 0.5365);
const SUELTA = en('termino', 0.667);   // Atom suelta la gominola dorada (el electrón extra) y se hace luz
const luc = (x, y, t, o = {}) => AT.luciernaga(R, x, y, t, { extra: t < SUELTA, ...o });
const atom = (x, s, t, o = {}) => AT.atom(R, x, s, t, { extra: t < SUELTA, habla: voz(t), ...o });
// halo tramado (luz que no tapa)
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const halo = (cx, cy, r, c, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0 && g * a > (B4[((j & 3) << 2) | (i & 3)] + 0.5) / 16) P(cx + i, cy + j, c); } };
// copiar un trozo del lienzo y pegarlo a escala (el díptico)
const coge = (x0, y0, w, hh) => { const B = R.buf, a = new Uint32Array(w * hh); for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) a[y * w + x] = B[(y0 + y) * 320 + x0 + x]; return a; };
const pega = (a, w, hh, X, Y, s, f) => { const B = R.buf; for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) { let c = a[y * w + x]; if (f) c = f(c, x, y);
  for (let dy = 0; dy < s; dy++) for (let dx = 0; dx < s; dx++) { const X1 = X + x * s + dx, Y1 = Y + y * s + dy; if (X1 >= 0 && X1 < 320 && Y1 >= 0 && Y1 < 180) B[Y1 * 320 + X1] = c; } } };
const sepia = (c) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = 0.3 * r + 0.59 * g + 0.11 * b;
  return (0xff000000 | (ri(Math.min(255, l * 0.66 + 18)) << 16) | (ri(Math.min(255, l * 0.88 + 16)) << 8) | ri(Math.min(255, l * 1.04 + 24))) >>> 0; };
// la cesta de mimbre con huevos de oca (cx: centro, by: la base)
const cesta = (cx, by, n = 4, s = 1) => { cx = ri(cx); by = ri(by); const W = ri(7 * s), H = ri(6 * s);
  const M1 = hex('#c8944a'), M2 = hex('#8a5a28'), M3 = hex('#e0b46a'), HU = hex('#f6f2e4'), HS = hex('#cfc8b2');
  for (let x = -W + 1; x <= W - 1; x++) { const yy = by - H - 2 - ri(Math.sqrt(Math.max(0, (W - 1) ** 2 - x * x)) * 0.9); P(cx + x, yy, M2); P(cx + x, yy - 1, K); }
  for (let k = 0; k < n; k++) { const ex = ri(cx - (n - 1) * 1.6 * s + k * 3.2 * s), ey = ri(by - H - 1 - (k % 2) * s), r = ri(2 * s); R.disco(ex, ey, r + 1, K); R.disco(ex, ey, r, HS); R.disco(ex - 1, ey - 1, Math.max(1, r - 1), HU); P(ex - 1, ey - r + 1, BL); }
  R.rect(cx - W, by - H, cx + W, by, K); for (let y = by - H + 1; y < by; y++) for (let x = cx - W + 1; x <= cx + W - 1; x++) P(x, y, (x + y) % 3 === 0 ? M2 : (x - y) % 4 === 0 ? M3 : M1);
  R.rect(cx - W, by - H, cx + W, by - H, M3); };
// la incubadora de madera pequeña (la que lleva Peeta en brazos): x, y = esquina de abajo a la izquierda
const cajita = (x, y) => { x = ri(x); y = ri(y); R.rect(x, y - 10, x + 14, y, K); R.rect(x + 1, y - 9, x + 13, y - 1, hex('#b07a40')); R.rect(x + 1, y - 9, x + 13, y - 8, hex('#d8a060'));
  R.rect(x + 3, y - 7, x + 11, y - 4, hex('#9ad0e8')); P(x + 4, y - 6, BL); R.rect(x + 1, y - 1, x + 13, y - 1, hex('#7a4a20')); P(x + 7, y - 11, hex('#ffb040')); P(x + 7, y - 12, K); };
// notas de música que suben (silbar/cantar); x, y origen; t0 empieza
const notas = (x, y, t, t0, t1, col = hex('#fff6c8')) => { if (t < t0 || t > t1 + 1.2) return; for (let k = 0; k < 4; k++) { const tk = t - t0 - k * 0.38; if (tk < 0 || tk > 1.3 || t0 + k * 0.38 > t1) continue;
  const nx = ri(x + k * 5 + Math.sin(tk * 5 + k) * 3), ny = ri(y - tk * 22); R.rect(nx, ny, nx + 2, ny + 1, K); R.rect(nx + 2, ny - 6, nx + 2, ny, K); P(nx, ny, col); P(nx + 1, ny, col); P(nx + 3, ny - 6, K); P(nx + 3, ny - 5, K); } };
// palomas que echan a volar
const palomas = (x0, y0, t, t0) => { if (t < t0) return; for (let k = 0; k < 6; k++) { const u = t - t0 - k * 0.07; if (u < 0) continue; const x = ri(x0 + k * 9 - 20 + u * (k % 2 ? 40 : -30)), y = ri(y0 - u * 60 - k * 3); if (y < 18) continue;
  const al = Math.floor((t + k) * 9) % 2; R.rect(x - 1, y, x + 1, y + 1, hex('#8a8e9a')); P(x, y, hex('#c8ccd6')); P(x - 2, y - al, hex('#6a6e7a')); P(x + 2, y - al, hex('#6a6e7a')); P(x - 3, y - 1 + al, hex('#6a6e7a')); P(x + 3, y - 1 + al, hex('#6a6e7a')); } };

// ── 1 · la Veta de día: la campana; Katniss y Prim salen hacia la cosecha ──
const p1 = (t) => {
  const o = { encuadre: 'calle', luz: 'dia' }; const g = T.distrito(R, t, o); const s = g.suelo ?? 160;
  // los chicos de la cosecha al fondo, hacia la plaza (derecha)
  [[0.2, 'tributoChico', 150], [0.9, 'tributoChica', 151], [1.6, 'tributoChico', 152]].forEach(([d, k, y], i) => { const u = (t - d) / 4.8; if (u < 0 || u > 1) return; R.actor(EL[k], ri(lerp(40 + i * 10, 300, u)), y, t, { dir: 1, anda: true }); });
  // el agente de la paz junto a la bomba de agua, que gira la cabeza
  R.actor(EL.agentePaz, 262, s + 2, t, { dir: t > en('prim', 0.065) ? -1 : 1 });
  // la vecina en su puerta, que saluda
  R.actor(EL.vecina, 196, s - 4, t, { dir: -1, dedo: t > en('prim', 0.0882) && t < en('prim', 0.1485), triste: true });
  // Katniss y Prim de la mano, de izquierda a derecha
  const u = tramo(t, 0.35, P2 + 0.3), kx = ri(lerp(30, 150, u));
  R.actor(EL.prim, kx - 13, s + 6, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > en('prim', 0) && t < en('prim', 0.0464) });
  R.actor(EL.katniss, kx, s + 4, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > en('prim', 0.1021) && t < en('prim', 0.1531) });
  luc(kx + 30 + Math.sin(t * 1.3) * 5, 112 + Math.sin(t * 2.1) * 3, t, { dir: 1, cara: t > en('prim', 0) && t < en('prim', 0.0557) ? 'triste' : 'normal', brillo: 0.7 });
};

// ── 2 · INSERTO local: la urna de cristal de cerca y la papeleta (fondo local) ──
let FB2 = null;
const fondoUrna = () => {
  if (FB2) { R.copiar(FB2); return; }
  FB2 = R.nuevo(); const prev = R.usar(FB2);
  // el muro de piedra del Edificio de Justicia, con hollín
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 12), xo = x + (fila % 2) * 12, junta = y % 12 === 11 || xo % 24 === 23;
    const v = h(Math.floor(xo / 24), fila, 1), hol = Math.max(0, 1 - y / 70) * 0.5 + h(x >> 2, y >> 2, 3) * 0.15;
    let c = junta ? hex('#5a5650') : v > 0.66 ? hex('#a8a296') : v > 0.33 ? hex('#9a9488') : hex('#8e887c'); if (!junta && h(x, y, 5) > 0.93) c = hex('#b8b2a6'); P(x, y, mez(c, hex('#3a3634'), hol)); }
  // la colgadura gris con el sello sin letras
  for (let y = 6; y < 112; y++) for (let x = 12; x < 62; x++) { const pl = Math.sin(x * 0.5) * 0.5 + 0.5; P(x, y, pl > 0.8 ? hex('#8a8c94') : pl < 0.2 ? hex('#4a4c54') : hex('#6a6c74')); }
  for (let x = 12; x < 62; x += 4) { R.rect(x, 112, x + 2, 115, hex('#4a4c54')); P(x + 1, 116, hex('#c8a040')); }
  R.rect(11, 5, 62, 6, K); R.disco(37, 54, 12, hex('#c8a040')); R.disco(37, 54, 10, hex('#e8c860')); R.disco(37, 54, 6, hex('#a87e28')); R.disco(37, 54, 3, hex('#e8c860'));
  // el canto de la pantalla grande a la derecha
  R.rect(270, 18, 319, 92, K); R.rect(272, 20, 319, 90, hex('#1a2030'));
  // el suelo de tablas del escenario
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 120) / 7), j = (y - 120) % 7 === 6, cl = (x + tab * 37) % 64 === 0;
    const v = h(x >> 3, tab, 7); P(x, y, j || cl ? hex('#4a3420') : v > 0.6 ? hex('#a0784a') : v > 0.3 ? hex('#946c40') : hex('#8a6238')); if (!j && h(x, y, 9) > 0.96) P(x, y, hex('#6a4a2a')); }
  for (let x = 0; x < 320; x++) P(x, 119, hex('#2a2018')), P(x, 118, hex('#6a5038'));
  R.rect(40, 160, 70, 161, hex('#e8e0c8')); R.rect(54, 154, 55, 167, hex('#e8e0c8'));   // la marca de cinta
  // el pie de la urna (pedestal torneado)
  R.rect(144, 152, 200, 176, K); for (let y = 153; y < 176; y++) for (let x = 145; x < 200; x++) P(x, y, x < 154 ? hex('#5a3a20') : x > 190 ? hex('#3a2414') : (y % 9 < 2 ? hex('#8a5a30') : hex('#6a4426')));
  R.rect(138, 172, 206, 179, K); R.rect(139, 173, 205, 178, hex('#5a3a20')); R.rect(139, 173, 205, 174, hex('#8a5a30'));
  R.usar(prev); R.copiar(FB2);
};
const PAPS = Array.from({ length: 900 }, (_, k) => { const a = h(k, 1, 2) * Math.PI * 2, r = Math.sqrt(h(k, 2, 3)); return [172 + Math.cos(a) * r * 68, 96 + Math.sin(a) * r * 60, h(k, 5, 5)]; }).filter(([x, y]) => y > 50).sort((a, b) => a[1] - b[1]);
const p2 = (t) => {
  fondoUrna();
  // los banderines que ondean
  for (let x = 0; x < 320; x++) { const y = ri(16 + Math.sin(x / 320 * Math.PI) * 10); P(x, y, hex('#3a3634')); if (x % 14 === 0) { const fl = ri(Math.sin(t * 3 + x * 0.2) * 1.5); R.poligono([[x, y], [x + 9, y], [x + 4 + fl, y + 9]], (x / 14) % 2 ? hex('#8a8c94') : hex('#c8c8cc')); } }
  // la pantalla: barre una franja
  for (let y = 21; y < 90; y++) for (let x = 273; x < 320; x++) if ((y + Math.floor(t * 20)) % 6 === 0 || h(x, y, Math.floor(t * 8)) > 0.97) P(x, y, hex('#3a5a8a'));
  // el micrófono de pie
  R.rect(284, 66, 285, 150, K); R.rect(278, 150, 292, 152, K); R.rect(281, 58, 288, 66, K); R.rect(282, 59, 287, 65, hex('#5a5a62')); P(283, 60, BL);
  // la urna: el cristal (borde, papeletas, tinte)
  const cx = 172, cy = 96, rx = 74, ry = 64, boca = 34;
  for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1 || y < boca) continue; if (((x + y) & 1) === 0) P(x, y, mez(R.pget(x, y), hex('#d8eef8'), 0.35)); }
  // las papeletas dobladas dentro
  for (const [x, y, v] of PAPS) { const X = ri(x), Y = ri(y); R.rect(X, Y, X + 3, Y + 1, v > 0.5 ? hex('#f4eedc') : hex('#e0d8c0')); P(X + 3, Y + 1, hex('#b8ae94')); }
  // el borde de la boca y el canto del cristal
  for (let a = 0; a < Math.PI * 2; a += 0.012) { const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; if (y < boca) continue; P(x, y, hex('#2a3a48')); }
  for (let a = 0; a < Math.PI * 2; a += 0.02) { P(cx + Math.cos(a) * 48, boca + Math.sin(a) * 7, a > Math.PI ? hex('#e8f6ff') : hex('#5a7a8a')); }
  // la mano de la escolta: baja, revuelve y saca la papeleta en «comes out»
  const baja = tramo(t, en('prim', 0.1717), en('prim', 0.2227)), sube = tramo(t, en('prim', 0.2561), en('prim', 0.297)), rev = t > en('prim', 0.2227) && t < en('prim', 0.2561) ? Math.sin(t * 14) * 4 : 0;
  const hx = ri(lerp(lerp(214, 184, baja), 196, sube) + rev), hy = ri(lerp(lerp(-14, 50, baja), 30, sube));
  if (baja > 0) {
    T.brazo(R, 226, -40, hx, hy, '#e070b0', -1);
    if (sube > 0.2) {   // la papeleta en los dedos; arriba se abre: una prímula dibujada (sin letras)
      const ab = tramo(t, en('prim', 0.3016), en('prim', 0.3202)), w = ri(lerp(6, 24, ab)), hh = ri(lerp(8, 16, ab)), X = hx + 8, Y = hy - 2;
      R.rect(X - 1, Y - 1, X + w + 1, Y + hh + 1, K); R.rect(X, Y, X + w, Y + hh, hex('#f6f0dc')); R.rect(X, Y + hh - 1, X + w, Y + hh, hex('#d8ceb0')); if (ab > 0.5) R.rect(X + ri(w / 2), Y, X + ri(w / 2), Y + hh, hex('#e4dcc4'));
      if (ab > 0.8) { const fx = X + ri(w / 2), fy = Y + ri(hh / 2) - 1; for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, 2]]) R.rect(fx + dx - 1, fy + dy - 1, fx + dx, fy + dy, hex('#f0c830')); R.rect(fx - 1, fy - 1, fx, fy, hex('#e07020')); R.linea(fx, fy + 3, fx - 2, fy + 6, hex('#4a8a3a')); }
    }
  }
  // el reflejo del cristal por delante de la mano
  for (let k = 0; k < 40; k++) { P(cx - 52 + k * 0.5, cy - 30 + k * 1.4, hex('#ffffff')); if (k % 2) P(cx - 49 + k * 0.5, cy - 30 + k * 1.4, hex('#e8f6ff')); }
  for (let a = 0.2; a < 1.2; a += 0.03) P(cx + Math.cos(a) * (rx - 4), cy + Math.sin(a) * (ry - 4), hex('#ffffff'));
  if (t > en('prim', 0.297)) halo(hx + 20, hy + 6, 14, hex('#fff6c0'), 0.5 * tramo(t, en('prim', 0.297), en('prim', 0.3202)));
  luc(80 + Math.sin(t * 1.4) * 4, 132 + Math.sin(t * 2) * 3, t, { dir: 1, cara: t > en('prim', 0.3016) ? 'sorpresa' : 'normal', brillo: 0.8 });
};

// ── 3 · la plaza de día: Katniss se pone delante de Prim con los brazos abiertos ──
const p3 = (t) => {
  const o = { encuadre: 'plaza', luz: 'dia' }; const g = T.distrito(R, t, o);
  const vol = en('prim', 0.3907);
  // en el escenario: la escolta en el micrófono y Haymitch mayor a un lado
  R.actor(EL.effie, 140, 118, t, { dir: 1, sorpresa: t > vol + 0.2, dedo: t < vol });
  R.actor(EL.haymitchViejo, 184, 118, t, { dir: -1, triste: t < en('prim', 0.4872), sorpresa: t > en('prim', 0.4872) });
  // Prim sube sola por el pasillo; se para cuando Katniss sale
  const up = tramo(t, P3, vol + 0.1), py = ri(lerp(180, 166, up));
  // Katniss sale de su fila (izquierda) y se pone delante, con los brazos abiertos
  const kv = tramo(t, vol - 0.1, vol + 0.6), kx = ri(lerp(104, 146, kv)), ky = ri(lerp(162, 150, kv));
  // un agente de la paz que viene a por ella y se para
  const av = tramo(t, vol + 0.6, en('prim', 0.4733)), ax = ri(lerp(214, 174, av));
  R.actor(EL.agentePaz, ax, 144, t, { dir: -1, anda: av > 0 && av < 1 });
  R.actor(EL.katniss, kx, ky, t, { dir: 1, anda: kv > 0 && kv < 1, brazos: t > vol + 0.6, enfado: t > vol + 0.6 });
  R.actor(EL.prim, 150, py, t, { dir: -1, anda: up > 0 && up < 1, sorpresa: t > vol + 0.2 });
  T.distritoDelante(R, t, o);
  palomas(216, 126, t, vol + 0.1);
  const lv = tramo(t, en('prim', 0.4826), en('prim', 0.5382));
  luc(lerp(kx + 22, 206, lv), lerp(132, 92, lv) + Math.sin(t * 2) * 2, t, { dir: lv > 0 ? 1 : -1, cara: t > vol ? 'sorpresa' : 'triste', brillo: 0.8 });
};

// ── 4 · el escenario: Haymitch la mira, baja la petaca y va hacia ella ──
const p4 = (t) => {
  const o = { encuadre: 'plaza', camara: 'escenario', luz: 'dia' }; const g = T.distrito(R, t, o); const s = g.suelo ?? 146;
  const ku = tramo(t, P4 + 0.1, en('prim', 0.645)), kx = ri(lerp(-10, 112, ku));
  R.actor(EL.effie, 150, s, t, { dir: -1, dedo: t > en('prim', 0.6078) && t < en('prim', 0.6589), sonrisa: true, habla: t > en('prim', 0.6078) && t < en('prim', 0.6496) });
  const mira = t > en('prim', 0.6951), va = tramo(t, en('prim', 0.7563), en('prim', 0.8073));
  R.actor(EL.haymitchViejo, ri(lerp(222, 196, va)), s, t, { dir: -1, triste: !mira, sorpresa: mira && t < en('prim', 0.7563), anda: va > 0 && va < 1, dedo: t > en('prim', 0.8073) });
  R.actor(EL.katniss, kx, s, t, { dir: 1, anda: ku > 0 && ku < 1, enfado: ku >= 1 && t < en('prim', 0.761) });
  T.distritoDelante(R, t, o);
  if (mira && t < en('prim', 0.7424)) R.icono('!', ri(lerp(222, 196, va)) + 5, s - 38, hex('#ffd34a'));
  const lv = tramo(t, en('prim', 0.696), en('prim', 0.7656));
  luc(lerp(264, 170, lv) + Math.sin(t * 1.5) * 3, lerp(70, 92, lv) + Math.sin(t * 2.3) * 2, t, { dir: -1, cara: t > en('prim', 0.7656) ? 'sonrisa' : 'normal', brillo: 0.8 });
};

// ── 5 · díptico local: el Haymitch de 16 delante de Lenore Dove (sepia) | Katniss delante de Prim ──
const panelPar = (t, luz, chico, chica, entra) => {
  const o = { encuadre: 'plaza', luz }; T.distrito(R, t, o);
  const u = tramo(t, entra, entra + 0.5), x = ri(lerp(170, 128, u));
  R.actor(EL[chica], 150, 160, t, { dir: -1, sorpresa: t > entra + 0.3 });
  R.actor(EL[chico], x, 160, t, { dir: -1, anda: u > 0 && u < 1, brazos: u >= 1, enfado: u >= 1 });
  T.distritoDelante(R, t, o);
  return coge(104, 98, 74, 74);
};
const marco = (X, Y, w, hh, cl) => { R.rect(X - 4, Y - 4, X + w + 5, Y + hh + 5, hex('#1a1210')); R.rect(X - 3, Y - 3, X + w + 3, Y + hh + 3, cl); R.rect(X - 3, Y - 3, X + w + 3, Y - 3, mez(cl, BL, 0.4)); R.rect(X - 1, Y - 1, X + w, Y + hh, K); };
const p5 = (t) => {
  const A = panelPar(t, 'amanecer', 'haymitch', 'lenore', en('prim', 0.8491));
  const B = panelPar(t, 'dia', 'katniss', 'prim', en('prim', 0.9057));
  // detrás de las fotos, la plaza en penumbra
  T.tinte(R, 0, 179, [26, 20, 30], 0.7);
  const Y = 26, dyA = 0, dyB = ri((1 - tramo(t, en('prim', 0.8862), en('prim', 0.9094))) * 160);
  marco(8, Y + dyA, 148, 148, hex('#c8a46a')); pega(A, 74, 74, 8, Y + dyA, 2, (c) => mez(c, sepia(c), 0.62));
  if (t > en('prim', 0.8862)) { marco(164, Y + dyB, 148, 148, hex('#e8e0cc')); pega(B, 74, 74, 164, Y + dyB, 2); }
  // en «protect them» los dos marcos brillan
  const br = tramo(t, en('prim', 0.9586), en('prim', 0.979)) * (1 - tramo(t, en('prim', 1.0115), en('huevos', -0.0035)));
  if (br > 0) for (const X of [8, 164]) for (let k = 0; k < 150; k += 3) { P(X - 2 + k, Y - 2, hex('#fff3b0')); P(X - 2 + k, Y + 150, hex('#fff3b0')); P(X - 2, Y - 2 + k, hex('#fff3b0')); P(X + 150, Y - 2 + k, hex('#fff3b0')); }
  luc(160, lerp(40, 100, tramo(t, en('prim', 0.9094), en('prim', 0.9744))) + Math.sin(t * 2) * 2, t, { dir: 1, cara: t > en('prim', 0.9605) ? 'sonrisa' : 'normal', brillo: 0.6 + br * 0.4 });
};

// ── 6 · la Aldea de los Vencedores de día: la cesta de huevos ──
const p6 = (t) => {
  const o = { encuadre: 'aldea', luz: 'dia' }; const g = T.distrito(R, t, o); const s = g.suelo ?? 168;
  const ku = tramo(t, P6 + 0.1, en('huevos', 0.1964)), kx = ri(lerp(8, 168, ku)), da = t > en('huevos', 0.2517);
  const hm = R.actor(EL.haymitchViejo, 198, s, t, { dir: -1, sostiene: da ? [196, s - 13] : false, sorpresa: t > en('huevos', 0.2031) && t < en('huevos', 0.2764), sonrisa: t > en('huevos', 0.2764) });
  if (da) cesta(hm.mano[0] - 2, hm.mano[1] + 8, 4, 1.6);
  const k = R.actor(EL.katniss, kx, s, t, { dir: 1, anda: ku > 0 && ku < 1, sostiene: da ? false : [kx + (t > en('huevos', 0.2037) ? 21 : 15), s - 13], sonrisa: ku >= 1 });
  if (!da) cesta(k.mano[0] + 2, k.mano[1] + 8, 4, 1.6);
  // Peeta llega detrás con la caja de la incubadora
  const pu = tramo(t, en('huevos', 0.2097), en('huevos', 0.3297)), px = ri(lerp(-20, 116, pu));
  if (pu > 0) { const pe = R.actor(EL.peeta, px, s + 2, t, { dir: 1, anda: pu > 0 && pu < 1, sostiene: [px + 15, s - 10] });
    cajita(pe.mano[0] - 6, pe.mano[1] + 5); }
  T.distritoDelante(R, t, o);
  luc(lerp(120, 186, tramo(t, en('huevos', 0.1831), en('huevos', 0.263))) + Math.sin(t * 1.6) * 4, 118 + Math.sin(t * 2.4) * 3, t, { dir: 1, cara: da ? 'sonrisa' : 'normal', brillo: 0.7 });
};

// ── 7 · INSERTO local: el banco de trabajo con la incubadora (fondo local) ──
let FB7 = null;
const fondoBanco = () => {
  if (FB7) { R.copiar(FB7); return; }
  FB7 = R.nuevo(); const prev = R.usar(FB7);
  // la pared de tablas con vetas y nudos
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(x / 22), j = x % 22 === 21, v = h(tb, Math.floor(y / 40), 2), vet = Math.sin((x % 22) * 0.9 + Math.sin(y * 0.06 + tb * 2) * 3) > 0.88;
    let c = j ? hex('#3a2a1c') : v > 0.5 ? hex('#8a6a48') : hex('#7e6040'); if (vet) c = hex('#6a4e32'); if (h(tb * 7, ri(y / 9), 4) > 0.97 && !j) c = hex('#4a3422'); P(x, y, c); }
  // la ventana con la Aldea (se pinta en vivo)
  R.rect(212, 14, 300, 80, K); R.rect(214, 16, 298, 78, hex('#e8dcc0'));
  // la balda con tarros de clavos y las herramientas colgadas
  R.rect(14, 40, 120, 43, K); R.rect(15, 40, 119, 41, hex('#a07a50'));
  [[22, '#9ab8c8'], [38, '#c8b088'], [54, '#9ab8c8'], [72, '#b8c8a8']].forEach(([x, c]) => { R.rect(x, 26, x + 10, 39, K); R.rect(x + 1, 27, x + 9, 38, hex(c)); R.rect(x + 1, 25, x + 9, 27, hex('#6a6a72')); for (let k = 0; k < 6; k++) P(x + 2 + (k * 3) % 7, 32 + (k % 3) * 2, hex('#5a5a62')); P(x + 2, 29, BL); });
  R.rect(92, 28, 116, 39, K); R.rect(93, 29, 115, 38, hex('#c8a060')); R.rect(93, 29, 115, 30, hex('#e0bc80'));   // la caja de semillas
  // la sierra y el serrucho colgados
  R.poligono([[20, 58], [70, 52], [70, 64], [20, 66]], K); R.poligono([[22, 59], [68, 54], [68, 62], [22, 64]], hex('#c8ccd4')); for (let x = 22; x < 68; x += 3) P(x, 64 - ri((x - 22) * 0.04), K);
  R.rect(70, 52, 82, 66, K); R.rect(71, 53, 81, 65, hex('#8a4a28'));
  R.rect(96, 52, 98, 82, K); R.rect(90, 50, 104, 56, K); R.rect(91, 51, 103, 55, hex('#5a5a62')); R.rect(97, 56, 97, 81, hex('#a07040'));
  R.rect(120, 54, 160, 56, hex('#4a3a2a')); for (const x of [126, 136, 146, 154]) { R.rect(x, 56, x + 2, 74, K); R.rect(x, 56, x + 1, 72, hex('#c8a060')); }
  // el banco: tablero con vetas, serrín y virutas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.5) * 2 + y * 0.9) ; let c = y < 121 ? hex('#d8a868') : v > 0.7 ? hex('#a87440') : v < -0.6 ? hex('#b8844c') : hex('#b07c46'); if (h(x, y, 8) > 0.985) c = hex('#e8d0a0'); P(x, y, c); }
  R.rect(0, 117, 319, 117, K);
  for (let k = 0; k < 18; k++) { const x = ri(h(k, 3, 1) * 300 + 10), y = ri(h(k, 4, 2) * 50 + 125); for (let a = 0; a < 6; a++) P(x + Math.cos(a) * 3, y + Math.sin(a) * 2, hex('#f0d8a8')); }
  R.rect(30, 150, 76, 153, K); R.rect(31, 151, 75, 152, hex('#e8c040')); R.rect(70, 150, 76, 153, hex('#3a3a40'));   // el lápiz
  for (const [x, y] of [[262, 160], [270, 164], [280, 158], [252, 168]]) { R.rect(x, y, x + 4, y, hex('#8a8e96')); P(x, y, K); }   // clavos sueltos
  R.usar(prev); R.copiar(FB7);
};
const huevo = (x, y, c = hex('#f6f2e4')) => { x = ri(x); y = ri(y); for (let j = -5; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = (i * i) / 16 + (j * j) / (j < 0 ? 30 : 18); if (d > 1.05) continue; P(x + i, y + j, d > 0.8 ? hex('#b8b09a') : i > 1 || j > 2 ? hex('#d8d2bc') : c); } P(x - 2, y - 3, BL); };
const p7 = (t) => {
  fondoBanco();
  // por la ventana: el césped de la Aldea y dos ocas que pasan (recortado al cristal)
  R.recorte([214, 16, 298, 78]);
  for (let y = 16; y < 79; y++) for (let x = 214; x < 299; x++) P(x, y, y < 46 ? (h(x >> 3, y >> 2, 1) > 0.9 ? BL : hex('#9cc8e8')) : y < 52 ? hex('#5a8a4a') : ((x + y) % 5 ? hex('#6aa04a') : hex('#4a8a3a')));
  R.rect(232, 30, 262, 50, hex('#a8a090')); R.poligono([[228, 30], [247, 20], [266, 30]], hex('#5a5a68'));
  for (let k = 0; k < 2; k++) { const ox = 214 + ((t * 12 + k * 40) % 110); T.a_oca ? T.a_oca(R, ri(ox), 70, t, { dir: 1, modo: 'camina', k }) : 0; }
  R.recorte(null);
  R.rect(212, 46, 300, 47, K); R.rect(255, 14, 256, 80, K); R.rect(208, 80, 304, 84, K); R.rect(209, 81, 303, 83, hex('#a07a50'));
  // la lámpara colgada que se mece
  const lx = ri(170 + Math.sin(t * 1.3) * 3); R.linea(170, 0, lx, 22, K); R.poligono([[lx - 9, 30], [lx + 9, 30], [lx + 4, 22], [lx - 4, 22]], hex('#3a4a3a')); halo(lx, 34, 10, hex('#fff0b0'), 0.4);
  // la incubadora: caja de tablas, tapa de cristal con bisagras, la bombilla en su jaula y el termómetro
  const X0 = 104, X1 = 226, Y0 = 92, Y1 = 160;
  R.rect(X0, Y0, X1, Y1, K); for (let y = Y0 + 1; y < Y1; y++) for (let x = X0 + 1; x < X1; x++) { const tb = Math.floor((y - Y0) / 11); P(x, y, (y - Y0) % 11 === 0 ? hex('#6a4220') : Math.sin(x * 0.2 + tb * 2) > 0.85 ? hex('#a86a32') : tb % 2 ? hex('#c08040') : hex('#b87a3c')); }
  R.rect(X0 + 8, Y0 + 8, X1 - 8, Y1 - 22, K); R.rect(X0 + 9, Y0 + 9, X1 - 9, Y1 - 23, hex('#5a3a1c'));
  const luz = tramo(t, en('huevos', 0.4096), en('huevos', 0.4363));
  // la paja y los huevos dentro
  for (let x = X0 + 9; x < X1 - 8; x++) for (let y = Y1 - 34; y < Y1 - 22; y++) if (h(x, y, 2) > 0.3) P(x, y, mez(h(x, y, 3) > 0.5 ? hex('#d8b860') : hex('#b8984a'), hex('#ffb040'), luz * 0.25));
  const pon = tramo(t, en('huevos', 0.6295), en('huevos', 0.6828));
  [[124, 0], [144, 0], [164, 0], [184, 0]].forEach(([x]) => huevo(x, Y1 - 32, mez(hex('#f6f2e4'), hex('#ffe0a8'), luz * 0.5)));
  // la tapa de cristal: se cierra en «incubator»
  for (let x = X0 + 9; x < X1 - 8; x++) for (let y = Y0 + 9; y < Y1 - 34; y++) if (((x + y) & 3) === 0) P(x, y, hex('#cfe8f4'));
  for (let k = 0; k < 14; k++) P(X0 + 20 + k, Y0 + 12 + k, hex('#ffffff'));
  R.rect(X0 + 4, Y0 + 3, X0 + 10, Y0 + 6, hex('#8a8e96')); R.rect(X1 - 10, Y0 + 3, X1 - 4, Y0 + 6, hex('#8a8e96'));
  // la bombilla en su jaula, encima
  R.rect(158, 74, 172, 92, K); R.rect(159, 75, 171, 91, hex('#3a3a40')); R.disco(165, 84, 5, luz > 0.2 ? hex('#ffb040') : hex('#c8c0b0')); if (luz > 0.2) { R.disco(164, 83, 2, hex('#fff6c0')); halo(165, 84, 26, hex('#ffd080'), 0.55 * luz * (0.85 + Math.sin(t * 9) * 0.15)); }
  for (let x = 159; x <= 171; x += 3) R.rect(x, 75, x, 91, K);
  // el termómetro con su número
  R.rect(232, 100, 246, 146, K); R.rect(233, 101, 245, 145, hex('#e8e4d8')); R.rect(238, 106, 240, 138, hex('#c8c8cc')); R.rect(238, ri(lerp(136, 114, luz)), 240, 138, hex('#d83030')); R.disco(239, 140, 3, hex('#d83030'));
  if (luz > 0.6) R.numero('37', 239, 98, { centro: true });
  // la cesta con el último huevo y la botella, a la derecha
  cesta(290, 172, tramo(t, en('huevos', 0.5795), en('huevos', 0.6095)) > 0.5 ? 0 : 1, 1.6);
  const em = tramo(t, en('huevos', 0.5295), en('huevos', 0.5762)), bx = ri(lerp(260, 330, em)), ba = em * 0.6;
  if (bx < 330) { R.rect(bx - 4, 130, bx + 4, 166, K); R.rect(bx - 3, 132, bx + 3, 165, hex('#4a6a3a')); R.rect(bx - 2, 122, bx + 2, 132, K); R.rect(bx - 1, 123, bx + 1, 131, hex('#4a6a3a')); P(bx - 2, 136, hex('#a8c890')); P(bx - 2, 138, hex('#a8c890')); }
  // la mano de Peeta: el martillo, tres golpes; luego cierra la tapa
  const pv = tramo(t, P7, P7 + 0.3) * (1 - tramo(t, en('huevos', 0.4629), en('huevos', 0.5029))), gol = t < en('huevos', 0.383) ? Math.abs(Math.sin((t - P7) * 9)) * 8 : 0, sw = tramo(t, en('huevos', 0.3863), en('huevos', 0.4096));
  // el interruptor en el costado de la caja
  R.rect(96, 136, 103, 146, K); R.rect(97, 137, 102, 145, hex('#3a3a40')); R.rect(99, luz > 0.2 ? 138 : 142, 100, luz > 0.2 ? 141 : 145, hex('#e8e4d8'));
  if (pv > 0) { const px = ri(lerp(lerp(50, 92, pv), 90, sw)), py = ri(lerp(lerp(200, 152, pv) - gol, 146, sw));
    T.brazo(R, 30, 214, px, py, '#6a8ab0', 1);
    if (t < en('huevos', 0.383)) { R.rect(px + 2, py - 14, px + 4, py + 2, K); R.rect(px + 3, py - 13, px + 3, py + 1, hex('#a07040')); R.rect(px - 2, py - 18, px + 10, py - 13, K); R.rect(px - 1, py - 17, px + 9, py - 14, hex('#6a6a72')); } }
  // la mano de Haymitch: aparta la botella y deja el último huevo
  const hv = tramo(t, en('huevos', 0.5029), en('huevos', 0.5295)) * (1 - tramo(t, en('huevos', 0.6895), en('huevos', 0.7228))), coge = tramo(t, en('huevos', 0.5795), en('huevos', 0.6095));
  if (hv > 0) { const vu = tramo(t, en('huevos', 0.5762), en('huevos', 0.6028)), hx = ri(t < en('huevos', 0.5762) ? lerp(320, bx + 6, hv) : lerp(lerp(330, 292, vu), 214, pon)), hy = ri(t < en('huevos', 0.5762) ? 150 : lerp(lerp(150, 162, coge), Y1 - 34, pon));
    if (coge > 0.5 && pon < 1) huevo(hx - 9, hy + 2);
    T.brazo(R, 300, 222, hx, hy, '#7a6a52', -1); }
  if (pon >= 1) huevo(204, Y1 - 32, mez(hex('#f6f2e4'), hex('#ffe0a8'), luz * 0.5));
  luc(60 + Math.sin(t * 1.2) * 4, 92 + Math.sin(t * 2.1) * 3, t, { dir: 1, cara: t > en('huevos', 0.6761) ? 'sonrisa' : t > en('huevos', 0.4163) ? 'sorpresa' : 'normal', brillo: 0.7 });
};

// ── 8 · el prado de cerca, de tarde: el huevo que se mueve (gag) y Haymitch silba ──
const p8 = (t) => {
  const o = { encuadre: 'prado', camara: 'cerca', luz: 'dia', sentados: true, nido: [234, 168] }; const g = T.prado(R, t, o);
  const [nx, ny] = [224, 176], salta = en('huevos', 0.8041), corre = tramo(t, salta + 0.35, salta + 1.0);
  // Atom: junto al nido; el huevo se mueve, salta y corre a esconderse detrás de Haymitch
  const ax = ri(lerp(250, 124, corre) - tramo(t, en('huevos', 0.876), en('huevos', 0.9027)) * 8), ay = ri(lerp(171, 161, corre)) - (t > salta && t < salta + 0.35 ? ri(Math.sin((t - salta) / 0.35 * Math.PI) * 9) : 0);
  const asoma = t > en('huevos', 0.876);
  atom(ax, ay, t, { dir: corre > 0 && corre < 1 ? -1 : asoma ? 1 : -1, pose: corre > 0 && corre < 1 ? 'camina' : t > salta && corre === 0 ? 'brazos' : 'quieto', cara: t > salta && t < en('huevos', 0.9426) ? 'sorpresa' : t > en('huevos', 0.9426) ? 'sonrisa' : 'normal' });
  R.actor(EL.haymitchViejo, 126, 161, t, { sinObjeto: true, dir: 1, sonrisa: t > en('huevos', 0.8494), triste: t < salta });
  T.pradoDelante(R, t, o);
  notas(140, 136, t, en('huevos', 0.8627), en('huevos', 0.9759));
  if (t > salta - 0.1 && t < salta + 0.6) R.icono('!', ax + 2, ay - 30, hex('#ffd34a'));
};

// ── 9 · el árbol de los sinsajos al amanecer: la pluma de Lenore Dove ──
const p9 = (t) => {
  const o = { encuadre: 'bosque', camara: 'arbol', luz: 'amanecer' }; const g = T.distrito(R, t, o);
  const [sx, sy] = g.sol ? g.sol : [250, 120];
  // el sinsajo posado en la rama larga (al doble, para que se lea): canta (notas) y, en «Lenore Dove», se sacude y suelta la
  // pluma; en «tomorrow» sale volando hacia el sol con los otros dos
  { const vu = tramo(t, en('termino', 0.3102), en('termino', 0.3751)), bx = lerp(190, sx - 10, vu), by = lerp(38, sy - 30, vu) - Math.sin(vu * Math.PI) * 14;
    const sac = t > en('termino', 0.0435) && t < en('termino', 0.0635) ? ri(Math.sin(t * 50) * 0.6) : 0, al = vu > 0 ? Math.floor(t * 10) % 2 : 0, canta = vu <= 0 && Math.sin(t * 7) > 0.3;
    AT.escalado(R, () => { R.rect(1, 3, 7, 6, K); R.rect(2, 4, 6, 5, hex('#6a6e7c')); R.rect(2, 4, 3, 4, hex('#9a9eac')); P(7, 2, K); P(8, 2, K); P(9, 3, canta ? hex('#e8a040') : K); P(8, 3, hex('#e8a040'));
      P(7, 3, BL); R.rect(0, al ? 1 : 5, 2, al ? 2 : 6, hex('#e8eef4')); P(0, 6, K); P(4, 7, K); if (vu <= 0) { P(3, 7, hex('#3a2a1a')); P(5, 7, hex('#3a2a1a')); } }, 10, 8, ri(bx - 10 + sac), ri(by - 14), 2);
    if (vu <= 0) notas(ri(bx + 8), ri(by - 16), t, P9 + 0.2, en('termino', 0.04)); }
  const llega = tramo(t, P9 + 0.1, en('termino', 0.0778)), ax = ri(lerp(262, 158, llega));
  // la pluma blanca baja de la rama en «Lenore Dove» y se posa en la mano en «right»
  const pl = tramo(t, en('termino', 0.0535), en('termino', 0.1075)), levanta = tramo(t, en('termino', 0.2886), en('termino', 0.321));
  const at = atom(ax, 148, t, { dir: -1, pose: llega < 1 ? 'camina' : pl >= 1 ? 'sostiene' : 'quieto', cara: t > en('termino', 0.3048) ? 'sonrisa' : pl >= 1 ? 'normal' : 'sorpresa' });
  let fx, fy;
  if (pl < 1) { fx = lerp(186, at.mano[0], pl) + Math.sin(pl * 9) * 6 * (1 - pl); fy = lerp(36, at.mano[1] - 3, pl); }
  else { fx = at.mano[0] + levanta * 4; fy = at.mano[1] - 3 - levanta * 6; }
  if (t > en('termino', 0.0508)) { const X = ri(fx), Y = ri(fy); halo(X, Y - 3, 9, hex('#fff6d8'), 0.5); for (let k = 0; k < 9; k++) { const x = X - 4 + k, y = Y + 4 - k; R.rect(x - 1, y - 2, x + 1, y + 1, K); } for (let k = 0; k < 9; k++) { const x = X - 4 + k, y = Y + 4 - k; P(x, y - 1, BL); P(x - 1, y, hex('#e8eef4')); P(x + 1, y - 1, hex('#d0dae6')); } R.linea(X - 6, Y + 6, X - 3, Y + 3, hex('#8a7a6a')); }
  // en «tomorrow», los rayos del sol que asoma y los dos pájaros que vuelan hacia él
  const ma = tramo(t, en('termino', 0.3048), en('termino', 0.3697));
  if (ma > 0) { for (let k = 0; k < 9; k++) { const a = -Math.PI + k * Math.PI / 8, L = 14 + ma * 26; for (let r = 10; r < L; r += 2) P(sx + Math.cos(a) * r, sy + Math.sin(a) * r, hex('#fff0a0')); } halo(sx, sy, 20, hex('#fff6c8'), 0.6 * ma); }
  for (let k = 0; k < 2; k++) { const u = tramo(t, en('termino', 0.3102) + k * 0.2, en('termino', 0.3751) + k * 0.2); if (u <= 0) continue; const X = ri(lerp(120 + k * 30, sx - 10 + k * 14, u)), Y = ri(lerp(60 + k * 6, sy - 20, u) - Math.sin(u * Math.PI) * 16), al = Math.floor(t * 10 + k) % 2;
    R.rect(X - 2, Y, X + 2, Y + 1, hex('#5a5a66')); P(X + 3, Y, K); P(X - 3, Y - 1 - al, hex('#3a3a46')); P(X - 4, Y - 2 + al * 2, hex('#3a3a46')); P(X + 1, Y - 2 + al * 3, hex('#e8e8f0')); }
};

// ── 10 · el prado al amanecer: el sol sale, las ocas en fila, la gominola se hace luz ──
const p10 = (t) => {
  const sol = lerp(0.98, 0.5, tramo(t, en('termino', 0.3967), en('termino', 0.5211)));
  const o = { encuadre: 'prado', luz: 'amanecer', sol, ocas: 2 }; const g = T.prado(R, t, o);
  const [sx, sy] = g.sol;
  const hu = tramo(t, P10, en('termino', 0.5427)), hx = ri(lerp(-16, 118, hu));
  for (let k = 0; k < 3; k++) { const ox = hx - 18 - k * 16 + (hu >= 1 ? 0 : 0); T.a_oca(R, ox, 166 + (k % 2) * 3, t, { dir: 1, modo: hu > 0 && hu < 1 ? 'camina' : (k === 1 ? 'pasta' : 'quieta'), k }); }
  R.actor(EL.haymitchViejo, hx, 164, t, { sinObjeto: true, dir: 1, anda: hu > 0 && hu < 1, sonrisa: t > en('termino', 0.6184), triste: t < en('termino', 0.4454) });
  T.pradoDelante(R, t, o);
  // Atom (luciérnaga) junto a él; en «kept his promise» suelta la gominola dorada, que sube hacia el sol y se hace luz
  const ax = hx + 30 + Math.sin(t * 1.3) * 3, ay = 120 + Math.sin(t * 2) * 2;
  luc(ax, ay, t, { dir: 1, cara: t > SUELTA ? 'sonrisa' : 'normal', brillo: 0.8 });
  const gu = tramo(t, SUELTA, en('termino', 0.7211)), luz = tramo(t, en('termino', 0.7184), en('termino', 0.7481));
  if (t > SUELTA && luz < 1) { const gx = lerp(ax + 6, sx, gu), gy = lerp(ay - 4, sy, gu) - Math.sin(gu * Math.PI) * 20; halo(ri(gx), ri(gy), 9 + ri(gu * 8), hex('#fff6c0'), 0.85); R.disco(ri(gx), ri(gy), 4, K); R.disco(ri(gx), ri(gy), 3, hex('#ffd34a')); R.rect(ri(gx) - 2, ri(gy) + 2, ri(gx) + 2, ri(gy) + 2, hex('#c89a20')); P(ri(gx) - 2, ri(gy) - 2, BL); P(ri(gx) - 1, ri(gy) - 2, BL); }
  if (luz > 0) { halo(sx, sy, 30, hex('#fff6c8'), 0.9 * (1 - luz * 0.4)); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 + t * 0.2, L = 10 + luz * 40; for (let r = 12; r < L; r += 2) if (sy + Math.sin(a) * r > 18) P(sx + Math.cos(a) * r, sy + Math.sin(a) * r, hex('#fff3b0')); } }
};

// ── 11 · la Veta al amanecer: la chica del arco pasa, saluda; Haymitch levanta la taza ──
const p11 = (t) => {
  const o = { encuadre: 'calle', camara: 'puerta', luz: 'amanecer' }; const g = T.distrito(R, t, o); const s = g.suelo ?? 164;
  const sale = tramo(t, P11 + 0.2, en('termino', 0.8995)), hx = ri(lerp(330, 186, sale));
  const ku = tramo(t, P11 + 0.3, en('termino', 0.9157)), kx = ri(lerp(-16, 108, ku)), saluda = t > en('termino', 0.9265) && t < en('termino', 1.0076);
  R.actor(EL.haymitchViejo, hx, s + 2, t, { sinObjeto: true, dir: -1, anda: sale > 0 && sale < 1, dedo: saluda, sonrisa: t > en('termino', 0.9373) });
  R.actor(EL.katnissArco, kx, s + 4, t, { dir: 1, anda: ku > 0 && ku < 1, dedo: saluda, sonrisa: saluda });
  T.distritoDelante(R, t, o);
  notas(kx + 12, s - 24, t, en('termino', 0.9427), en('termino', 1.0184), hex('#d8f0ff'));
  luc(kx + 28 + Math.sin(t * 1.5) * 4, 112 + Math.sin(t * 2.2) * 3, t, { dir: 1, cara: saluda ? 'sonrisa' : 'normal', brillo: 0.6 });
};

// ── 12 · la casa de Haymitch de noche, Juegos 50: la noche antes del cumpleaños ──
const p12 = (t) => {
  const o = { encuadre: 'casa', luz: 'noche', bollo: true }; const g = T.prado(R, t, o);
  const hu = tramo(t, P12 + 0.3, en('pregunta', 0.182)), hx = ri(lerp(236, 196, hu));
  R.actor(EL.haymitch, hx, 168, t, { dir: -1, anda: hu > 0 && hu < 1, sorpresa: t > en('pregunta', 0.2852) && t < en('pregunta', 0.3883), sonrisa: t > en('pregunta', 0.4165) });
  // Atom entra volando por la ventana y se posa en la mesa; en «one thing» le señala y sale el 1
  const vu = tramo(t, P12 + 0.2, en('pregunta', 0.2007)), posa = t > en('pregunta', 0.2007);
  if (!posa) luc(lerp(232, 172, vu), lerp(66, 130, vu) - Math.sin(vu * Math.PI) * 12, t, { dir: -1, cara: 'normal', brillo: 0.8 });
  else { if (t < en('pregunta', 0.2476)) halo(172, 132, 12, hex('#fff0b0'), 0.6 * (1 - tramo(t, en('pregunta', 0.2007), en('pregunta', 0.2476)))); atom(172, 144, t, { dir: 1, pose: t > en('pregunta', 0.3602) ? 'senala' : t > en('pregunta', 0.257) ? 'saluda' : 'quieto', cara: t > en('pregunta', 0.4165) ? 'sonrisa' : 'normal', habla: voz(t) * (t > en('pregunta', 0.2289) ? 1 : 0) }); }
  // la vela en la mesa (la última noche antes del cumpleaños)
  const fl = ri(Math.sin(t * 13) * 0.8); halo(134, 134, 16, hex('#ffd890'), 0.3); R.rect(132, 136, 135, 143, K); R.rect(133, 137, 134, 143, hex('#f4ead0')); P(133 + fl, 134, hex('#ffb040')); P(133, 135, hex('#fff6c0')); P(134, 133, hex('#ffe080'));
  const uno = tramo(t, en('pregunta', 0.4033), en('pregunta', 0.4352)); if (uno > 0) { R.numero('1', 186, ri(lerp(128, 116, uno)), { tam: 16, centro: true }); }
};

// ── 13 · el estudio de noche: Atom mira a cámara y señala los comentarios ──
const bocadillo = (x, y, w, c) => { x = ri(x); y = ri(y); R.rect(x - 1, y - 1, x + w + 1, y + 13, K); R.rect(x, y, x + w, y + 12, c); R.rect(x, y + 11, x + w, y + 12, mez(c, K, 0.25)); R.poligono([[x + 5, y + 13], [x + 11, y + 13], [x + 4, y + 18]], K); R.poligono([[x + 6, y + 13], [x + 10, y + 13], [x + 5, y + 16]], c);
  for (let k = 0; k < 3; k++) R.rect(x + 6 + k * 6, y + 5, x + 7 + k * 6, y + 6, hex('#3a3a4a')); };
// la pizarra del estudio (cámara de la mesa): el chico de 16 con su vela dibujados con tiza; en «what would you say» se
// traza un «?» grande al lado
const pizarra13 = (R2, t, [x0, y0, x1, y1]) => {
  const TZ = hex('#eef0e4'), TZ2 = hex('#c8d4c0');
  const fx = 22, fy = 47; R.disco(fx, fy - 15, 3, TZ); R.disco(fx, fy - 15, 2, hex('#2e4a3c')); R.linea(fx, fy - 12, fx, fy - 5, TZ); R.linea(fx - 4, fy - 9, fx + 4, fy - 9, TZ); R.linea(fx, fy - 5, fx - 3, fy, TZ); R.linea(fx, fy - 5, fx + 3, fy, TZ);
  R.linea(34, 44, 40, 44, TZ); R.linea(37, 44, 37, 38, TZ); R.pset(37, 36 - (Math.sin(t * 9) > 0 ? 1 : 0), hex('#f8d070')); R.pset(37, 37, hex('#f8d070'));
  const u = tramo(t, en('pregunta', 0.7166), en('pregunta', 0.7635)), Q = [[52, 32, 56, 28], [56, 28, 63, 28], [63, 28, 67, 32], [67, 32, 67, 36], [67, 36, 60, 40], [60, 40, 60, 43]];
  for (let k = 0; k < Q.length; k++) { const f = Math.min(1, Math.max(0, u * Q.length - k)); if (f <= 0) break; const [a, b, c, d] = Q[k]; R.linea(a, b, ri(a + (c - a) * f), ri(b + (d - b) * f), TZ); R.linea(a + 1, b, ri(a + 1 + (c - a) * f), ri(b + (d - b) * f), TZ2); }
  if (u >= 1) { R.pset(60, 46, TZ); R.pset(61, 46, TZ); }
  for (let k = 0; k < 6; k++) R.pset(x0 + 4 + ((k * 31) % 90), y1 - 2 - (k % 3), TZ2);
};
const p13 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa', pizarra: pizarra13 }; const g = T.estudio(R, t, o);
  // Atom (al doble) llega andando por la mesa, se para en el centro y mira a cámara
  const au = tramo(t, P13 + 0.1, en('pregunta', 0.6791)), ax = ri(lerp(330, 176, au));
  const pose = au < 1 ? 'camina' : t > en('pregunta', 0.8573) ? 'senala' : t > en('pregunta', 0.7166) ? 'piensa' : 'saluda';
  atom(ax, g.suelo, t, { dir: au < 1 ? -1 : t > en('pregunta', 0.8573) ? -1 : 1, pose, cara: t > en('pregunta', 0.9605) ? 'guino' : t > en('pregunta', 0.7166) && t < en('pregunta', 0.8573) ? 'normal' : 'sonrisa', habla: voz(t), s: 2 });
  T.estudioDelante(R, t, o);
  if (t > en('pregunta', 0.7307) && t < en('pregunta', 0.8667)) R.icono('?', ax - 3, 88 - ri(tramo(t, en('pregunta', 0.7307), en('pregunta', 0.7635)) * 4), hex('#ffd34a'));
  // los bocadillos de los comentarios suben por abajo en «comments»
  const cs = [[34, '#ffffff', 0], [78, '#fff3c8', 0.15], [122, '#d8f0ff', 0.3], [250, '#ffe0ec', 0.45]];
  for (const [x, c, d] of cs) { const u = tramo(t, en('pregunta', 0.8855) + d, en('pregunta', 0.9418) + d); if (u <= 0) continue; bocadillo(x, lerp(186, 160 - (x % 3) * 2, u), 28, hex(c)); }
  if (t > en('pregunta', 0.9511)) { const hx = 112, hy = 150 + ri(Math.sin(t * 6)); R.rect(hx - 2, hy - 1, hx - 1, hy, hex('#e84a5a')); R.rect(hx + 1, hy - 1, hx + 2, hy, hex('#e84a5a')); R.rect(hx - 2, hy + 1, hx + 2, hy + 1, hex('#e84a5a')); P(hx, hy + 2, hex('#e84a5a')); }
};

const efectos = [[en('prim', 0.2598), 'papel'], [en('prim', 0.3944), 'publico'], [en('prim', 0.696), 'pop'], [en('prim', 0.8909), 'whoosh'], [en('prim', 0.9605), 'brillo'], [en('huevos', 0.253), 'golpecito'],
  [en('huevos', 0.3563), 'golpecito'], [en('huevos', 0.3796), 'golpecito'], [en('huevos', 0.4096), 'interruptor'], [en('huevos', 0.5429), 'toc'], [en('huevos', 0.6761), 'golpecito'], [en('huevos', 0.8041), 'boing'],
  [en('termino', 0.1075), 'brillo'], [en('termino', 0.3156), 'whoosh'], [en('termino', 0.7211), 'brillo'], [en('pregunta', 0.4071), 'pop'], [en('pregunta', 0.7354), 'pop'], [en('pregunta', 0.8949), 'pop'],
  // el ambiente de cada sitio y los gestos (dentro del presupuesto de uno por segundo)
  [0.2, 'campana'], [P2 + 0.2, 'publico'], [en('prim', 0.3016), 'papel'], [en('prim', 0.3907) + 0.1, 'rafaga'], [P4 + 0.2, 'golpecito'], [P4 + 0.7, 'publico'],
  [en('prim', 0.8862), 'whoosh'], [P6 + 0.2, 'viento'], [en('huevos', 0.2097), 'golpecito'], [P8 + 0.1, 'viento'], [P9 + 0.1, 'viento'], [en('termino', 0.3102), 'rafaga'],
  [P10 + 0.1, 'viento'], [en('termino', 0.4), 'brillo'], [P11 + 0.2, 'viento'], [en('termino', 0.9265), 'golpecito'], [P12 + 0.1, 'tic'], [en('pregunta', 0.2007), 'brillo'],
  [P13 + 0.2, 'golpecito'], [en('pregunta', 0.7166), 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13]],
  { efectos, año: (t) => t >= P12 && t < P13 ? 50 : 74 });
'''))
