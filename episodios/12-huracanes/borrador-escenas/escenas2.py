# Episodio 12 (huracanes y tornados), acto 1, la ciencia: hu-calor, hu-motor, hu-giro y hu-ojo.
# Primer borrador al nivel del 11 final, con los tiempos reales de la voz inglesa (atomo/build/largo/ep12/linea.json):
# cada corte y cada acción caen en la palabra que toca, escritos como en('marca', fracción de la frase).
#   python3 atomo/herramientas/generar-escenas.py hu ep12 episodios/12-huracanes/borrador-escenas/escenas2.py --destino … --pisar
E = {}

# ── piezas comunes de las cuatro escenas (se copian en cada una) ─────────────────────────────────────────────────────
COMUN = r'''
const C = T.C;
const lin = (t, x, y) => Math.max(0, Math.min(1, (t - x) / (y - x)));
const entre = (t, x, y) => t >= x && t < y;
const suave = (u) => u * u * (3 - 2 * u);
const ruido = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const umbral = (x, y) => (B4[((y & 3) << 2) + (x & 3)] + 0.5) / 16;
// mezcla dos colores del lienzo (ABGR) y tiñe un píxel
const mezcla = (p, c, a) => { const r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255; return (0xff000000 | (Math.round(b + (((c >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((c >> 8) & 255) - g) * a) << 8) | Math.round(r + ((c & 255) - r) * a)) >>> 0; };
const tine = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mezcla(B[i], c, a); };
// la zona de Atom y la de la barra del año quedan como fondo tranquilo
const tranquilo = (x, y) => (x >= 274 && y <= 47) || (x <= 172 && y <= 15);
const destello = (x, y, r, c = C.blanco) => { for (let i = 0; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
// la calima: las filas de la caja tiemblan de lado, como el aire caliente que sube del mar
const FILA = new Uint32Array(320);
const calima = (x0, y0, x1, y1, t, a = 1, k = 0) => { const B = R.buf; for (let y = y0; y <= y1; y++) { const d = Math.round(Math.sin(y * 0.8 + t * 6 + k) * a * (0.55 + 0.45 * Math.sin(t * 1.7 + y * 0.21))); if (!d) continue; for (let x = x0; x <= x1; x++) FILA[x] = B[y * 320 + x]; for (let x = x0; x <= x1; x++) B[y * 320 + x] = FILA[Math.min(x1, Math.max(x0, x - d))]; } };
// el desenfoque del fondo de un inserto (caja de 3 × 3, n pasadas): da profundidad al objeto que va delante
const TMP = new Uint32Array(320 * 180);
const desenfoca = (n = 2, x0 = 0, y0 = 0, x1 = 319, y1 = 179) => {
  const B = R.buf;
  for (let p = 0; p < n; p++) for (const hor of [1, 0]) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const a = hor ? B[y * 320 + Math.max(x0, x - 1)] : B[Math.max(y0, y - 1) * 320 + x], m = B[y * 320 + x], b = hor ? B[y * 320 + Math.min(x1, x + 1)] : B[Math.min(y1, y + 1) * 320 + x];
      const r = ((a & 255) + 2 * (m & 255) + (b & 255)) >> 2, g = (((a >> 8) & 255) + 2 * ((m >> 8) & 255) + ((b >> 8) & 255)) >> 2, bb = (((a >> 16) & 255) + 2 * ((m >> 16) & 255) + ((b >> 16) & 255)) >> 2;
      TMP[y * 320 + x] = (0xff000000 | (bb << 16) | (g << 8) | r) >>> 0;
    }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = TMP[y * 320 + x];
  }
};
// el cuadro entero que tiembla (dx, dy px)
const sacude = (dx, dy) => { if (!dx && !dy) return; const B = R.buf; TMP.set(B); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = TMP[Math.min(179, Math.max(0, y - dy)) * 320 + Math.min(319, Math.max(0, x - dx))]; };
// la gaviota de cerca: de pie (x, y: entre las patas) o volando, con su contorno para que se lea sobre el cielo
const PAL_GAV = { k: C.k, W: hex('#f8f6f0'), w: hex('#d8dce4'), G: hex('#a8b0bc'), D: hex('#3a3e48'), Y: hex('#f0b030') };
const GAV_PIE = ['.......kkk..', '......kWWWk.', '......kWkWYY', '.....kWWWWk.', '.kkkkWWWWk..', 'kDGGGGWWWk..', '.kDGGGGwWk..', '..kkkkkkk...', '....Y..Y....', '....Y..Y....'];
const gaviotaPie = (x, y, dir = 1, salto = 0) => R.dibujo(GAV_PIE, Math.round(x - 6), Math.round(y - 10 - salto), dir, PAL_GAV);
const gaviotaVuela = (x, y, t, dir = 1) => {
  x = Math.round(x); y = Math.round(y); const al = Math.sin(t * 13) > 0 ? -1 : 1, P = [[-7, al * 3 - 1], [-3, -1], [0, 0], [3, -1], [7, al * 3 - 1]];
  for (let i = 1; i < P.length; i++) { R.linea(x + P[i - 1][0], y + P[i - 1][1] + 1, x + P[i][0], y + P[i][1] + 1, C.k); R.linea(x + P[i - 1][0], y + P[i - 1][1] - 1, x + P[i][0], y + P[i][1] - 1, C.k); }
  for (let i = 1; i < P.length; i++) R.linea(x + P[i - 1][0], y + P[i - 1][1], x + P[i][0], y + P[i][1], i === 1 || i === 4 ? PAL_GAV.G : PAL_GAV.W);
  R.pset(x - 7, y + al * 3 - 1, PAL_GAV.D); R.pset(x + 7, y + al * 3 - 1, PAL_GAV.D);
  R.rect(x - 2, y, x + 2, y + 2, C.k); R.rect(x - 1, y + 1, x + 1, y + 1, PAL_GAV.W); R.pset(x + dir * 3, y + 1, PAL_GAV.Y);
};
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-calor'] = ('La máquina de calor', '''// HU-CALOR (frases 6–7), sin año: el inserto de ciencia del mar caliente. Siete planos, todos con acción y vida de fondo:
// 1. el Atlántico tropical a mediodía, con la boya y la lancha de investigación: la científica se seca la frente (se le
//    escapa una gota de sudor) y se abanica con la mano; su compañero, con su gorra roja, bebe a morro de la botella y
//    suspira; a «warm ocean» al sol le sale un anillo de calor; el aire tiembla sobre el agua (calima);
// 2. (corta en «when») el inserto de la boya, de cerca, con el mar desenfocado detrás: el termómetro grande y el panel de
//    cristal líquido; la mano de la científica da dos golpecitos al cristal en «heats», el número sube a «79°» y en «80»
//    se clava en «80°» y parpadea mientras el líquido rojo llega a la marca; una gaviota se posa en el panel, mira la
//    cifra y da un respingo con el parpadeo; las olas salpican el casco;
// 3. (corta en «The water») a ras de agua, de cerca: la lancha de perfil con los dos científicos y, delante, el mar con
//    sus crestas, una tortuga que asoma a respirar y un pez volador; del agua sube el vapor (hebras que suben hasta el
//    cielo y la calima que hace temblar el horizonte), más fuerte a «fills»; a «invisible» las hebras se desvanecen y
//    solo queda el temblor del aire; la científica señala el agua a «evaporates» y luego sigue el vapor hacia arriba; el
//    científico tantea el aire con la mano a «invisible» y no encuentra nada: «?»;
// 4. (corta en «The same») el baño de casa: el grifo de agua caliente echa vapor y el espejo se empaña de abajo arriba
//    hasta «mirror»; la mano entra y limpia una franja (se ve el baño reflejado), que se vuelve a empañar mientras el
//    vapor sigue subiendo («That warm, wet air rises»); el gato mira el chorro;
// 5. (corta en «and as it climbs») la lancha: la nube crece de cúmulo a torre mientras sube el aire («climbs», «cools») y
//    nacen las gotas («drops of water»); la científica la señala y luego la mira con los prismáticos; el científico se
//    hace visera con la mano;
// 6. (corta en «And here is the secret») dentro de la nube, de cerca (lo que ven los prismáticos): el vapor converge y
//    nace una gota en «forms»; en «gives back the heat» suelta una chispa con su anillo y el aire de alrededor se calienta;
//    en «the sun» se enciende el camino de puntos desde el sol que asoma por un claro; en «evaporating it» nacen más gotas
//    con sus chispas, en cadena; las burbujas de nube suben y pasa un vencejo por el claro;
// 7. (corta en «So») la lancha: en «warmer» la torre se dispara hacia arriba con su yunque («rises faster»); en «pulls in»
//    el mar entra en la nube por tres corrientes y a la gorra roja del científico se la lleva el viento hacia la nube
//    (gag): él la persigue con los brazos en alto y la científica se agarra a la consola; relámpago y trueno.''', r'''
import { TOCADOS, P as PCH } from '/atomo/plato/kits/pixel-chibi.js';
''' + COMUN + r'''
const a = (f) => en('oceano', f), b = (f) => en('secreto', f);
// los cortes: «when», «The water», «The same», «and (as it climbs)», «And (here is the secret)», «So»
const P2 = a(0.171), P3 = a(0.519), P4 = a(0.846), P5 = b(0.129), P6 = b(0.382), P7 = b(0.710);
const calido = a(0.091), calienta = a(0.302), sobre = a(0.373), ochenta = a(0.394), evapora = a(0.544), llena = a(0.713), invisible = a(0.754), vaporT = a(0.783), empana = a(0.901), espejo = a(0.961);
const sube = b(0.076), trepa = b(0.154), enfria = b(0.180), vuelve = b(0.255), gotasT = b(0.307), gotaT = b(0.483), forma = b(0.515), devuelve = b(0.537), solT = b(0.612), evaporar = b(0.638), caliente = b(0.743), deprisa = b(0.815), aspiraT = b(0.873), masAire = b(0.926);
const AZUL = '#2a4a7a';   // la manga del polo azul marino de los científicos (la mano canónica)
// la gorra roja del científico (el kit no la tiene en rojo: la misma gorra con su color)
TOCADOS.gorraRoja = [['...kkkkkkkk....', '..kXXXXXXXXk...', '.kXXXXXwXXXXk..', '.kkkkkkkkkkkkkk', '..........kkkk.'], -2];
const PALG = { X: hex('#d8463a'), w: hex('#f6f2ea') };
const gorra = (x, y, dir) => R.dibujo(TOCADOS.gorraRoja[0], Math.round(x), Math.round(y), dir, { ...PCH, ...EL.pronosticador.pal, ...PALG });
// la cubierta de la lancha: los dos científicos, de cara a la boya
const XA = 220, XB = 238;
// la botella de agua (de pie o inclinada al beber)
const botella = (x, y, bebe) => { if (bebe) { for (let i = 0; i < 7; i++) { R.rect(x + i, y + Math.round(i * 0.7) - 1, x + i, y + Math.round(i * 0.7) + 2, C.k); } for (let i = 1; i < 6; i++) { R.pset(x + i, y + Math.round(i * 0.7), hex('#bfe6fb')); R.pset(x + i, y + Math.round(i * 0.7) + 1, hex('#5aa8e8')); } R.pset(x + 6, y + 4, hex('#2a6ad0')); } else { R.rect(x, y, x + 3, y + 8, C.k); R.rect(x + 1, y + 2, x + 2, y + 7, hex('#7ac0f0')); R.rect(x + 1, y + 1, x + 2, y + 1, hex('#2a6ad0')); R.pset(x + 1, y + 3, C.blanco); R.pset(x + 1, y + 4, hex('#bfe6fb')); } };
// los prismáticos delante de los ojos (dir: hacia dónde mira)
const prismaticos = (x, y, dir) => { const X = dir > 0 ? x + 9 : x - 1; R.rect(X, y, X + 6, y + 3, C.k); R.pset(dir > 0 ? X + 6 : X, y + 1, hex('#8ac8f0')); R.pset(dir > 0 ? X + 6 : X, y + 2, hex('#4a8ac0')); R.pset(X + 3, y + 1, hex('#5a5e6a')); };

// ── 1 · el mar caliente ───────────────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.maquinaCalor(R, t, { lectura: t < 2.3 ? '77°' : '78°', crece: 0.04 });
  calima(66, 104, 206, 150, t, 1);
  // a «warm ocean», un anillo de calor sale del sol
  { const u = lin(t, calido - 0.15, calido + 1.1); if (u > 0 && u < 1) { const r = 12 + u * 24; for (let k = 0; k < 90; k++) { const an = k / 90 * 6.283, x = Math.round(226 + Math.cos(an) * r), y = Math.round(30 + Math.sin(an) * r); if (!tranquilo(x, y) && umbral(x, y) < (1 - u) * 0.95) tine(x, y, hex('#fff0a8'), 0.75); } } }
  const y = T.c_cubiertaY(t);
  // la científica se seca la frente, se le escapa una gota de sudor y se abanica
  const seca = entre(t, 0.45, 1.2), abanica = entre(t, calido - 0.1, P2 + 0.3) && Math.floor(t * 7) % 2 === 0;
  R.actor(EL.pronosticadora, XA, y, t, { dir: -1, dedo: seca || abanica, triste: entre(t, 0.1, calido - 0.2) });
  if (entre(t, 1.1, 1.9)) { const u = lin(t, 1.1, 1.9), gx = Math.round(XA + 2 - u * 7), gy = Math.round(y - 21 - Math.sin(u * Math.PI) * 5 + u * u * 14); R.pset(gx, gy, hex('#bfe6fb')); R.pset(gx, gy + 1, hex('#3a8ae8')); R.pset(gx - 1, gy + 1, hex('#8ad0f8')); }
  // el científico saca la botella, bebe a morro y suspira contento
  const bebe = entre(t, 1.75, 3.35);
  const r = R.actor(EL.pronosticador, XB, y, t, { dir: bebe || t < 0.9 ? -1 : 1, dedo: bebe, sonrisa: t > 3.4, tocado: 'gorraRoja', pal: PALG });
  if (bebe) botella(XB - 5, r.cabeza[1] + 3, true); else botella(t < 0.9 ? XB - 3 : XB + 13, y - 12, false);
  if (t > 3.45 && t < 4.4) { const u = lin(t, 3.45, 4.4); for (let i = 0; i < 3; i++) R.pset(Math.round(XB + 15 + u * 6 + i * 2), Math.round(y - 20 - u * 5 - i), hex('#e8f4fc')); }   // el suspiro
};

// ── 2 · la boya de cerca: el termómetro y el panel ────────────────────────────────────────────────────────────────
const AM = hex('#f0c030'), AMS = hex('#c8941c'), AML = hex('#f8e070'), AMD = hex('#9a6a10');
const MET = hex('#9aa4b4'), METS = hex('#6c7688'), METL = hex('#c8d0dc'), METD = hex('#4a5262');
const ROJO = hex('#e0383a'), ROJOS = hex('#a02428'), ROJOL = hex('#ff8a7a');
const LCD = hex('#c4f47a'), LCDG = hex('#2c4a32'), LCDF = hex('#16281c');
const marca = (g) => Math.round(80 + (80 - g) * 2.4);   // la y de cada grado en la tablilla
const toques = [calienta, calienta + 0.32];
const p2 = (t) => {
  const { rect, pset, disco, linea } = R;
  T.maquinaCalor(R, t, { boya: false, barco: false, crece: 0.04 });
  desenfoca(2);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (umbral(x, y) < 0.25) tine(x, y, hex('#d8ecf8'), 0.25);   // la bruma del fondo, lejos
  // la temperatura: 78 → 79 con los golpecitos → 80 en «80»
  const g = t < toques[0] + 0.15 ? 78 : t < ochenta ? 78 + lin(t, toques[0] + 0.15, toques[1] + 0.5) : 79 + lin(t, ochenta - 0.05, ochenta + 0.25);
  const lectura = t < toques[1] + 0.3 ? '78°' : t < ochenta ? '79°' : '80°', luce = t < ochenta || t > ochenta + 0.9 || Math.floor((t - ochenta) * 8) % 2 === 0;
  const bb = Math.round(Math.sin(t * 1.3 + 1) * 1.5), cy = 162 + bb, dy = bb;
  // las salpicaduras de las olas contra el casco, a los lados
  for (const [sx, fase] of [[34, 0], [286, 1.2]]) { const u = ((t + fase) % 2.4) / 0.9; if (u < 1) for (let k = 0; k < 9; k++) { const an = -Math.PI / 2 + (k - 4) * 0.22, d = u * (14 + (k % 3) * 5), x = Math.round(sx + Math.cos(an) * d * (sx < 160 ? -1 : 1)), yy = Math.round(cy + 6 + Math.sin(an) * d + u * u * 18); pset(x, yy, k % 2 ? C.blanco : hex('#bfe6fb')); } }
  // el casco: la cubierta amarilla en elipse, el costado, la defensa de goma, los tornillos, la escotilla y el número
  for (let y = cy - 14; y < 180; y++) for (let x = 28; x <= 292; x++) {
    const u = (x - 160) / 132; if (u <= -1 || u >= 1) continue;
    const e = Math.sqrt(1 - u * u), top = cy - 13 * e, front = cy + 13 * e; if (y < top) continue;
    let c;
    if (y <= front) { const v = (y - top) / (front - top + 0.01); c = y - top < 1 ? AMD : u < -0.35 ? AML : u > 0.5 ? AMS : AM; if (v > 0.55 && umbral(x, y) < (v - 0.55) * 1.2) c = u < -0.35 ? AM : AMS; }
    else { c = u < -0.62 ? AML : u > 0.48 ? AMS : AM; if (u > 0.8 || y - front < 1) c = AMD; if (y - front > 5 && y - front < 9) c = (x + Math.floor(t * 2)) % 9 === 0 ? hex('#5a5a66') : hex('#2a2a34'); if (y - front === 5) c = hex('#6a6a78'); }
    pset(x, y, c);
  }
  for (let k = -9; k <= 9; k++) { const u = k / 10, x = Math.round(160 + u * 126), y = Math.round(cy + 11 * Math.sqrt(1 - u * u)); pset(x, y, AMD); pset(x, y - 1, AML); }
  { const hx = 92, hy = cy - 3; for (let yy = -4; yy <= 4; yy++) for (let xx = -16; xx <= 16; xx++) { const d = (xx / 16) ** 2 + (yy / 4) ** 2; if (d <= 1) pset(hx + xx, hy + yy, d > 0.7 ? AMD : yy < 0 ? AMS : AM); } rect(hx - 4, hy - 1, hx + 4, hy, METD); rect(hx - 3, hy - 1, hx + 3, hy - 1, METL); }
  // la cubierta: el antideslizante en rombos, regueros de óxido, la argolla de amarre, el cabo adujado y la sombra del mástil
  for (let y = cy - 12; y < cy + 12; y++) for (let x = 34; x < 288; x++) { const u = (x - 160) / 132, e = Math.sqrt(Math.max(0, 1 - u * u)); if (y < cy - 13 * e + 2 || y > cy + 13 * e - 1) continue; if ((x + 2 * y) % 8 === 0 || (x - 2 * y + 400) % 8 === 0) { if ((x + y) % 2 === 0) pset(x, y, u > 0.5 ? AMD : AMS); } }
  for (let y = cy - 7; y < cy + 6; y++) for (let x = 180; x < 236; x++) if (umbral(x, y) < 0.55 - (x - 180) / 120 - Math.abs(y - cy) / 30) tine(x, y, AMD, 0.45);
  for (const [rx, ry, l] of [[70, cy + 7, 5], [118, cy + 10, 4], [204, cy + 10, 5], [252, cy + 8, 4]]) for (let i = 0; i < l; i++) if (rx % 3 || i % 2 === 0) tine(rx, ry + i, hex('#a8501a'), 0.5 - i * 0.07);
  { const ax = 238, ay = cy + 1; for (let a = 0; a < 6.28; a += 0.35) { pset(Math.round(ax + Math.cos(a) * 4), Math.round(ay + Math.sin(a) * 2), C.k); } for (let a = 0.6; a < 3.2; a += 0.35) pset(Math.round(ax + Math.cos(a) * 3), Math.round(ay + Math.sin(a) * 1.5) - 1, METL); rect(ax - 2, ay + 2, ax + 2, ay + 3, METD); }
  for (let k = 0; k < 4; k++) { const rx = 58 - k, ry = cy + 3 - k, w = 13 - k * 2; for (let a = 0; a < 6.28; a += 0.12) { const x = Math.round(rx + Math.cos(a) * w), yy = Math.round(ry + Math.sin(a) * w * 0.32); pset(x, yy, Math.sin(a) < 0 ? hex('#e8d8b0') : hex('#b8a070')); } }
  for (let a = 0; a < 6.28; a += 0.12) pset(Math.round(58 + Math.cos(a) * 13), Math.round(cy + 3 + Math.sin(a) * 4.2) + 1, hex('#7a6440'));
  // el mástil de celosía: dos largueros con su luz y su sombra, las riostras y la placa de la base
  const base = cy - 8;
  rect(138, base - 3, 184, base + 2, C.k); rect(139, base - 2, 183, base + 1, MET); rect(139, base - 2, 183, base - 2, METL); for (const bx of [142, 180]) { pset(bx, base, METD); pset(bx, base - 1, METL); }
  for (const [x0, luz] of [[146, 1], [172, 0]]) { rect(x0, -2, x0 + 4, base - 3, C.k); rect(x0 + 1, -2, x0 + 3, base - 3, MET); rect(x0 + 1, -2, x0 + 1, base - 3, luz ? METL : MET); rect(x0 + 3, -2, x0 + 3, base - 3, METS); }
  for (let y = base - 8; y > -10; y -= 20) { linea(151, y, 171, y - 19, C.k); linea(151, y - 1, 171, y - 20, METS); rect(151, y, 171, y + 1, C.k); rect(151, y, 171, y, MET); }
  // el cable del panel, que baja por el mástil
  for (let y = 54; y < base - 3; y++) pset(169 + (y % 7 === 0 ? 1 : 0), y, hex('#1e1e26'));
  // la tablilla del termómetro con sus marcas, los números, el tubo, el líquido y el bulbo; las abrazaderas al mástil
  for (const yy of [52, 116]) { rect(134, yy - 2, 147, yy + 2, C.k); rect(135, yy - 1, 146, yy + 1, METS); rect(135, yy - 1, 146, yy - 1, METL); }
  rect(100, 22 + dy, 136, 150 + dy, C.k); rect(101, 23 + dy, 135, 149 + dy, hex('#f2eee4')); rect(101, 23 + dy, 135, 24 + dy, C.blanco); rect(134, 23 + dy, 135, 149 + dy, hex('#cfc6b4')); rect(101, 148 + dy, 135, 149 + dy, hex('#cfc6b4'));
  for (const [sx, sy] of [[104, 27], [131, 27], [104, 145], [131, 145]]) { pset(sx, sy + dy, METD); pset(sx + 1, sy + dy, METS); pset(sx, sy - 1 + dy, METL); }
  for (let gg = 62; gg <= 98; gg += 2) { const yy = marca(gg) + dy, largo = gg % 10 === 0 ? 4 : 2; rect(122 - largo, yy, 121, yy, gg === 80 && t > ochenta ? ROJO : hex('#3a3a48')); }
  for (const v of [70, 80, 90]) R.numero(String(v), 110, marca(v) + 4 + dy, { color: v === 80 && t > ochenta && luce ? ROJO : hex('#2a2a36'), centro: true, sombra: false });
  rect(124, 28 + dy, 130, 138 + dy, C.k); rect(125, 29 + dy, 129, 138 + dy, hex('#e2eef6')); rect(125, 29 + dy, 125, 138 + dy, C.blanco); rect(129, 29 + dy, 129, 138 + dy, hex('#b8c8d4'));
  { const ly = Math.round(80 + (80 - g) * 2.4) + dy; rect(126, ly, 128, 140 + dy, ROJO); rect(128, ly, 128, 140 + dy, ROJOS); pset(126, ly, ROJOL); }
  disco(127, 141 + dy, 6, C.k); disco(127, 141 + dy, 5, ROJO); disco(128, 142 + dy, 3, ROJOS); pset(125, 139 + dy, ROJOL); pset(126, 139 + dy, ROJOL);
  for (let y = 30; y < 136; y += 9) if (Math.sin(t * 2 + y) > 0.6) pset(125, y + dy, hex('#ffffff'));
  // el panel de cristal líquido: la caja de chapa con sus tornillos, la antena, la cifra encendida y el fantasma de los segmentos
  rect(184, 48 + dy, 264, 102 + dy, C.k); rect(185, 49 + dy, 263, 101 + dy, hex('#8a94a6')); rect(185, 49 + dy, 263, 50 + dy, hex('#c8d0dc')); rect(185, 49 + dy, 186, 101 + dy, hex('#a8b2c2')); rect(262, 49 + dy, 263, 101 + dy, hex('#5a6274')); rect(185, 100 + dy, 263, 101 + dy, hex('#5a6274'));
  for (const [sx, sy] of [[189, 53], [259, 53], [189, 97], [259, 97]]) { disco(sx, sy + dy, 1, METD); pset(sx - 1, sy - 1 + dy, METL); }
  rect(173, 70 + dy, 185, 73 + dy, C.k); rect(174, 71 + dy, 184, 72 + dy, METS);
  rect(253, 30 + dy, 254, 48 + dy, METD); pset(253, 30 + dy, METL); disco(253, 28 + dy, 1, (t % 1.6) < 0.3 ? hex('#ff5a4a') : hex('#7a2a2a'));
  rect(193, 57 + dy, 255, 93 + dy, C.k); rect(194, 58 + dy, 254, 92 + dy, LCDF);
  for (let y = 58; y <= 92; y++) for (let x = 194; x <= 254; x++) if ((x + y) % 2 === 0 && y < 64) tine(x, y + dy, hex('#2a4a34'), 0.5);
  R.numero('88°', 225, 85 + dy, { tam: 16, centro: true, color: LCDG, contorno: false, sombra: false });
  if (luce) R.numero(lectura, 225, 85 + dy, { tam: 16, centro: true, color: LCD, contorno: false, sombra: false });
  if (t > ochenta && t < ochenta + 1.2) for (let r = 0; r < 4; r++) { const k = (t - ochenta) * 3; tine(194 - r, 58 + dy, LCD, 0.3 * (1 - k)); }
  { const gx = 194 + ((t * 16) % 110) - 30; for (let y = 58; y <= 92; y++) for (let i = 0; i < 6; i++) { const x = Math.round(gx + i + (92 - y) * 0.5); if (x >= 194 && x <= 254) tine(x, y + dy, C.blanco, i < 2 ? 0.28 : 0.14); } }
  for (const [sx, sy] of [[204, 96], [238, 99], [246, 52], [190, 74]]) { pset(sx, sy + dy, hex('#e8f6ff')); pset(sx, sy + 1 + dy, hex('#7ab0d8')); }   // gotas de rocío
  // la gaviota: llega volando, se posa encima del panel, mira la cifra y da un respingo al parpadear el «80°»
  const llega = lin(t, P2 + 0.25, P2 + 1.05);
  if (llega < 1) gaviotaVuela(lerp(340, 214, suave(llega)), lerp(62, 44, suave(llega)) + dy, t, -1);
  else { const brinco = entre(t, ochenta, ochenta + 0.35) ? Math.round(Math.sin(lin(t, ochenta, ochenta + 0.35) * Math.PI) * 5) : 0; gaviotaPie(214, 48 + dy, t > ochenta + 0.35 && t < ochenta + 1.1 ? 1 : -1, brinco);
    if (brinco) for (const [fx, fy] of [[206, 36], [222, 34]]) pset(fx, fy + dy - brinco, C.blanco); }
  // la mano de la científica entra, da dos golpecitos al cristal y se queda señalando; luego se va
  const entra = lin(t, P2 + 1.0, toques[0] - 0.05), sale = lin(t, ochenta + 0.9, P3 + 0.4);
  if (entra > 0 && sale < 1) { const golpe = toques.some((k) => entre(t, k, k + 0.12)) ? 4 : 0; T.mano(R, Math.round(lerp(352, 266, suave(entra)) + lerp(0, 90, suave(sale))) - golpe, 76 + dy, -1, AZUL); }
};

// ── 3 · a ras de agua: el vapor invisible ─────────────────────────────────────────────────────────────────────────
const HOR3 = 108, CIE3 = [hex('#3a86dc'), hex('#4aa6ea'), hex('#74bef2'), hex('#a8daf4'), hex('#d4ecf6')];
const MAR3 = [hex('#c4ecee'), hex('#7ad8dc'), hex('#3ab8c8'), hex('#2496b4'), hex('#1a7aa0'), hex('#13608a')];
// la lancha de investigación de cerca, de perfil (proa a la izquierda), a ras de agua: el casco blanco con la franja azul
// y la obra viva roja, la consola con su parabrisas, el techo de lona con el radar y la antena, la pescante con su cable,
// la bandera y el fueraborda; detras = true pinta lo de detrás de los personajes y false el costado y la barandilla
const lanchaCerca = (x, wl, t, detras) => {
  const { rect, pset, linea, poligono } = R, K = C.k, B = hex('#f4f4f0'), BS = hex('#c8ccd6'), AZ = hex('#2a4a8a'), RJ = hex('#b83a2a'), GR = hex('#8a94a6'), GRL = hex('#c8d0dc'), dk = wl - 9;
  if (detras) {
    for (const px of [x + 46, x + 72]) rect(px, dk - 30, px, dk, GR);
    rect(x + 40, dk - 34, x + 78, dk - 30, K); rect(x + 41, dk - 33, x + 77, dk - 31, hex('#2a4a8a')); rect(x + 41, dk - 31, x + 77, dk - 31, hex('#1e365c')); for (let i = x + 43; i < x + 77; i += 4) pset(i, dk - 30, hex('#1e365c'));
    rect(x + 52, dk - 38, x + 62, dk - 35, K); rect(x + 53, dk - 37, x + 61, dk - 35, B); pset(x + 54, dk - 37, C.blanco);
    { const sw = Math.round(Math.sin(t * 1.6) * 2); linea(x + 75, dk - 34, x + 75 + sw, dk - 54, hex('#4a5262')); pset(x + 75 + sw, dk - 55, (t % 1.4) < 0.3 ? C.rojo : GRL); }
    rect(x + 50, dk - 16, x + 66, dk, K); rect(x + 51, dk - 15, x + 65, dk, B); rect(x + 62, dk - 15, x + 65, dk, BS); poligono([[x + 51, dk - 16], [x + 54, dk - 25], [x + 65, dk - 25], [x + 65, dk - 16]], K); poligono([[x + 52, dk - 16], [x + 55, dk - 24], [x + 64, dk - 24], [x + 64, dk - 16]], hex('#5a8ab8')); linea(x + 57, dk - 23, x + 59, dk - 18, hex('#c8e4f8'));
    rect(x + 53, dk - 12, x + 59, dk - 8, K); { const fz = Math.floor(t * 1.5) % 3; rect(x + 54, dk - 11, x + 58, dk - 9, hex('#0e2a3a')); for (let i = 0; i < 5; i++) pset(x + 54 + i, dk - 9 - ((i + fz) % 3), hex('#5ae8f0')); }
    linea(x + 84, dk, x + 92, dk - 22, GR); linea(x + 92, dk - 22, x + 100, dk - 20, GR); { const sw = Math.round(Math.sin(t * 1.3)); linea(x + 100, dk - 20, x + 101 + sw, wl + 2, hex('#3a3e48')); }
    rect(x + 86, dk - 24, x + 86, dk, GR); for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) pset(x + 87 + i, dk - 24 + j + Math.round(Math.sin(t * 5 + i * 0.7) * 0.8), i < 3 && j < 3 ? hex('#2a3a8a') : j % 2 ? C.blanco : C.rojo);
    rect(x + 96, dk - 8, x + 106, dk + 1, K); rect(x + 97, dk - 7, x + 105, dk, hex('#3a3e48')); rect(x + 97, dk - 7, x + 105, dk - 6, hex('#6a707a')); rect(x + 99, dk + 1, x + 102, wl + 4, K); rect(x + 100, dk + 1, x + 101, wl + 4, hex('#3a3e48'));
    for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1; pset(Math.round(x + 106 + u * 18), wl + 1 + Math.round(Math.sin(u * 9 + k)), C.blanco); }
    return;
  }
  const casco = [[x, wl - 13], [x + 24, wl - 11], [x + 98, wl - 9], [x + 97, wl + 3], [x + 20, wl + 3], [x + 9, wl - 2], [x + 3, wl - 8]];
  poligono(casco.map(([a, b]) => [a - 1, b - 1]), K); poligono(casco.map(([a, b]) => [a + 1, b + 1]), K);
  const borda = (xx) => (xx < x + 24 ? wl - 13 + (xx - x) * 2 / 24 : wl - 11 + (xx - x - 24) * 2 / 74);
  poligono(casco, (xx, yy) => { const g = yy - borda(xx); return g < 1 ? GR : g < 2 ? GRL : yy >= wl ? RJ : yy >= wl - 3 ? (yy === wl - 3 ? hex('#4a6ac8') : AZ) : yy >= wl - 5 ? BS : xx < x + 12 && g > 3 ? BS : B; });
  for (let xx = x + 26; xx < x + 96; xx += 14) pset(xx, Math.round(borda(xx)) + 4, BS);
  for (let xx = x + 3; xx < x + 44; xx++) pset(xx, Math.round(borda(xx)) - 6, xx < x + 6 ? hex('#6c7688') : GR);
  for (let xx = x + 6; xx < x + 44; xx += 9) rect(xx, Math.round(borda(xx)) - 6, xx, Math.round(borda(xx)) - 1, hex('#6c7688'));
  for (const [fx, fy] of [[x + 30, wl - 6], [x + 70, wl - 5]]) { rect(fx, fy, fx + 3, fy + 4, K); rect(fx + 1, fy + 1, fx + 2, fy + 3, hex('#f07a2a')); }
  // el reflejo del casco, que tiembla
  for (let yy = wl + 4; yy < Math.min(180, wl + 16); yy += 2) { const d = Math.round(Math.sin(yy * 1.1 + t * 3.5) * 1.6); for (let xx = x + 16 + d; xx < x + 96 + d; xx++) if (umbral(xx, yy) < 0.55 - (yy - wl) * 0.03) tine(xx, yy, B, 0.3); }
  for (let xx = x - 2; xx < x + 100; xx += 2) if (Math.sin(t * 4 + xx) > 0.2) pset(xx, wl + 3, C.blanco);
};
const p3 = (t) => {
  const { rect, pset, disco, linea } = R, BF = R.buf, H = HOR3;
  const v = lin(t, P3 - 0.3, evapora + 0.5), fuerte = lin(t, llena - 0.4, vaporT), oculto = lin(t, invisible - 0.1, invisible + 0.5);
  // el cielo tramado y el sol con sus rayos que giran despacio; nubes de buen tiempo y una fragata que planea
  for (let y = 0; y < H; y++) { const f = Math.pow(y / H, 1.25) * 4.2; for (let x = 0; x < 320; x++) { const l = Math.floor(f) + (f - Math.floor(f) > umbral(x, y) ? 1 : 0); BF[y * 320 + x] = CIE3[Math.min(4, l)]; } }
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6 + t * 0.12, l = 16 + (k % 2) * 6; for (let r = 12; r < l; r++) { const x = Math.round(226 + Math.cos(an) * r), y = Math.round(30 + Math.sin(an) * r); if (!tranquilo(x, y) && umbral(x, y) < 0.8 - (r - 12) / (l - 12) * 0.6) pset(x, y, hex('#fff6c8')); } }
  disco(226, 30, 10, hex('#ffe28a')); disco(226, 30, 9, hex('#fff4c8')); disco(224, 28, 5, C.blanco);
  for (const [x0, y0, w, vel] of [[30, 34, 28, 1.1], [120, 58, 22, 1.6], [196, 80, 16, 2.2], [262, 70, 20, 1.4], [70, 92, 12, 2.6]]) R.nube(Math.round(((x0 + t * vel) % 380) - 30), y0, w);
  { const fx = Math.round(80 + Math.cos(t * 0.35) * 30), fy = Math.round(24 + Math.sin(t * 0.35) * 5), b = Math.sin(t * 1.3) > 0.6 ? 1 : 0; for (const [dx, dy] of [[-5, -1 - b], [-4, -1 - b], [-3, 0], [-2, 0], [-1, 1], [0, 0], [1, 1], [2, 0], [3, 0], [4, -1 - b], [5, -1 - b]]) pset(fx + dx, fy + dy, hex('#2a2a3a')); }
  // el mar: bandas tramadas que se oscurecen hacia delante
  for (let y = H; y < 180; y++) { const f = Math.pow((y - H) / (180 - H), 0.8) * 5.2; for (let x = 0; x < 320; x++) { const l = Math.floor(f) + (f - Math.floor(f) > umbral(x, y) ? 1 : 0); BF[y * 320 + x] = MAR3[Math.min(5, l)]; } }
  for (let x = 0; x < 320; x++) if (umbral(x, H) < 0.6) pset(x, H, C.blanco);
  // a lo lejos, sobre el horizonte: la boya y la lancha con los dos científicos, pequeñas
  { const by = H + Math.round(Math.sin(t * 1.3) * 0.6); rect(53, by - 2, 65, by, hex('#c8941c')); rect(54, by - 3, 64, by - 2, hex('#f0c030')); linea(59, by - 3, 59, by - 13, hex('#6c7688')); pset(59, by - 14, (t % 3) < 0.4 ? hex('#fff2a0') : hex('#c8a840')); rect(55, by - 10, 57, by - 6, hex('#e8eef4')); pset(56, by - 7, C.rojo); }
  // (la lancha está cerca: se pinta más abajo)
  // las crestas en perspectiva, cada una con su largo, su altura y su sitio; las de delante con su espuma
  for (let r = 0; r < 20; r++) { const f = (r + 1) / 20, y0 = H + 2 + (180 - H) * Math.pow(f, 1.7), paso = 9 + 40 * f, vel = 2 + 10 * f;
    for (let k = -1; k < 340 / paso + 1; k++) { const a = ruido(k, r, 44), b = ruido(k, r, 45); if (a < 0.2) continue;
      const xx = Math.round(k * paso + (b - 0.5) * paso * 0.7 + ((t * vel + r * 13) % paso)) - paso, w = Math.round((2 + 22 * f) * (0.5 + a * 0.7)), yy = Math.round(y0 + Math.sin(t * 1.5 + k + r) * f * 1.5), alto = 1 + Math.round(f * 3 * a);
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin(i / w * Math.PI) * alto); pset(xx + i, yc, i < w * 0.6 ? MAR3[0] : MAR3[1]); pset(xx + i, yc + 1, f > 0.5 ? MAR3[5] : MAR3[4]); if (f > 0.55 && i > w * 0.3 && i < w * 0.55 && ruido(k, r, Math.floor(t * 2)) < 0.5) pset(xx + i, yc - 1, C.blanco); } } }
  // el camino del sol: destellos que bailan
  for (let y = H + 1; y < 180; y += 2) { const f = (y - H) / (180 - H), w = 3 + f * 26; for (let k = 0; k < 2 + f * 6; k++) { const x = Math.round(226 + (ruido(k, y, Math.floor(t * 5)) - 0.5) * 2 * w); if (ruido(k, y, Math.floor(t * 7) + 9) < 0.5) { pset(x, y, C.blanco); if (f > 0.4) pset(x + 1, y, MAR3[0]); } } }
  // un pez volador que salta
  { const u = lin(t, P3 + 1.4, P3 + 2.2); if (u > 0 && u < 1) { const x = Math.round(70 + u * 70), y = Math.round(150 - Math.sin(u * Math.PI) * 22); rect(x - 2, y, x + 2, y, hex('#3a5a8a')); pset(x + 3, y, hex('#c8d8e8')); pset(x - 1, y - 1, hex('#a8c8e8')); pset(x, y - 2, hex('#a8c8e8')); pset(x - 1, y + 1, hex('#a8c8e8')); } if (u >= 1 && t < P3 + 2.6) for (let i = -3; i <= 3; i += 2) pset(140 + i, 151 - Math.round((1 - Math.abs(i) / 3) * 3 * Math.sin(lin(t, P3 + 2.2, P3 + 2.6) * Math.PI)), C.blanco); }
  // una tortuga marina asoma a respirar y se vuelve a hundir
  { const u = lin(t, P3 + 0.6, P3 + 3.4); if (u > 0 && u < 1) { const sal = Math.sin(u * Math.PI), tx = Math.round(108 + u * 10), ty = 146 + Math.round((1 - Math.min(1, sal * 1.6)) * 6);
      for (let yy = -4; yy <= 0; yy++) for (let xx = -9; xx <= 9; xx++) { const d = (xx / 9) ** 2 + (yy / 4.2) ** 2; if (d <= 1 && ty + yy < 147) pset(tx + xx, ty + yy, d > 0.75 ? hex('#3a3a1e') : (Math.abs(xx) % 5 === 2 || yy === -2) ? hex('#5a6a2a') : hex('#8a8a3a')); }
      if (sal > 0.45) { rect(tx + 9, ty - 3, tx + 13, ty - 1, hex('#3a3a1e')); rect(tx + 10, ty - 3, tx + 12, ty - 2, hex('#9aa04a')); pset(tx + 12, ty - 3, C.k); if (sal > 0.8) for (let i = 0; i < 3; i++) pset(tx + 15 + i, ty - 5 - i, hex('#e8f4fc')); }
      for (let i = -12; i <= 12; i += 2) if (Math.sin(t * 6 + i) > 0) pset(tx + i, 147, C.blanco); } }
  // el aire caliente tiembla: el horizonte y el mar ondulan, más cuanto más vapor
  calima(0, H - 16, 319, 179, t, 1 + v + fuerte, 5);
  // la lancha cerca con los dos científicos: ella señala el agua a «evaporates» y sigue el vapor hacia arriba; él tantea
  // el aire con la mano a «invisible» y no encuentra nada: «?»
  const LX = 172, WL = 142, ly = WL + Math.round(Math.sin(t * 1.6) * 1.2), pies = ly - 9;
  lanchaCerca(LX, ly, t, true);
  R.actor(EL.pronosticadora, LX + 14, pies, t, { dir: -1, dedo: entre(t, evapora - 0.1, evapora + 1.2) || entre(t, llena, llena + 1.0), sorpresa: entre(t, llena - 0.2, invisible + 0.4), habla: entre(t, P3 + 0.3, evapora - 0.1) && Math.floor(t * 7) % 2 === 0 });
  const tantea = entre(t, invisible - 0.55, invisible + 0.5) && Math.floor(t * 8) % 2 === 0;
  const rc = R.actor(EL.pronosticador, LX + 31, pies, t, { dir: -1, dedo: tantea || entre(t, P3 + 0.2, P3 + 0.9), tocado: 'gorraRoja', pal: PALG, sonrisa: t > invisible + 1.2 });
  lanchaCerca(LX, ly, t, false);
  if (t > invisible + 0.35) R.bocadillo(LX + 39, rc.cabeza[1] - 6, { icono: '?' });
  // el vapor que sube del agua: hebras onduladas de tres en tres, cálidas y translúcidas, cada vez más; a «invisible»
  // se desvanecen y solo queda el temblor del aire
  const n = Math.round(14 + 26 * v + 18 * fuerte);
  for (let k = 0; k < n; k++) { const u = (t * (0.16 + 0.06 * ruido(k, 1, 46)) + ruido(k, 2, 46)) % 1, f = ruido(k, 3, 46), y0 = H + 4 + f * 66, x0 = 8 + ruido(k, 4, 46) * 304, alto = 44 + f * 80, y = y0 - u * alto, L = 7 + Math.round(f * 16), sep = 3 + Math.round(f * 5);
    const fu = (1 - u) * Math.min(1, u * 4) * (1 - 0.8 * oculto);
    for (let j = -1; j <= 1; j++) for (let i = 0; i < L; i++) { const yy = Math.round(y - i - Math.abs(j) * 3), xx = Math.round(x0 + j * sep + Math.sin(yy * 0.5 + t * 5 + k) * (1.2 + f)), a = fu * (1.15 - i / L * 0.7); if (a <= 0) continue; tine(xx, yy, hex('#fffaf0'), Math.min(0.85, a)); if (f > 0.35) tine(xx + 1, yy, hex('#fffaf0'), Math.min(0.6, a * 0.7)); tine(xx - 1, yy, hex('#ffe8c8'), a * 0.25); tine(xx + 2, yy, hex('#ffe8c8'), a * 0.2); } }
};

// ── 4 · el espejo del baño ────────────────────────────────────────────────────────────────────────────────────────
const LIMPIO = R.nuevo();
const limpia = [espejo + 0.45, espejo + 1.4];
const p4 = (t) => {
  const o = { grifo: 1, vapor: 1, agua: 0, vaho: lin(t, P4 - 0.6, espejo) };
  const prev = R.usar(LIMPIO); T.lavabo(R, t, { ...o, vaho: 0 }); R.usar(prev);
  T.lavabo(R, t, o);
  // la franja que limpia la mano (de derecha a izquierda), y que el vapor vuelve a empañar
  const pasa = lin(t, limpia[0], limpia[1]), x0 = Math.round(212 - 98 * suave(pasa)), claro = 1 - 0.75 * lin(t, limpia[1] + 0.5, P5 + 0.3), B = R.buf;
  if (pasa > 0) for (let y = 44; y <= 60; y++) { const borde = Math.round(ruido(y, 3, 41) * 4); for (let x = x0 + borde; x <= 213; x++) { const i = y * 320 + x, e = y < 46 || y > 58 ? 0.6 : 1; B[i] = mezcla(B[i], LIMPIO[i], claro * e); } }
  // la mano: entra por la derecha, pasa por el espejo haciendo eses y se va
  const entra = lin(t, limpia[0] - 0.45, limpia[0]), vuelve = lin(t, limpia[1] + 0.05, limpia[1] + 0.7);
  if (entra > 0 && vuelve < 1) { const hx = Math.round(pasa > 0 && vuelve === 0 ? x0 + 10 : lerp(330, 214, suave(entra)) + lerp(0, 120, suave(vuelve))), hy = Math.round(52 + (pasa > 0 && pasa < 1 ? Math.sin(pasa * 18) * 5 : 0)); T.mano(R, hx, hy, -1, '#5a8ac8'); }
};

// ── 5 · la nube que crece y las gotas ─────────────────────────────────────────────────────────────────────────────
const p5 = (t) => {
  const c = 0.12 + 0.46 * suave(lin(t, P5 - 0.3, gotasT + 0.6));
  T.maquinaCalor(R, t, { vapor: 0.55, gotas: 0.3 + 0.55 * lin(t, enfria, gotasT), crece: c });
  const y = T.c_cubiertaY(t);
  // la científica señala la nube que sube y luego la mira con los prismáticos
  const senala = entre(t, trepa - 0.15, vuelve - 0.4), mira = t > vuelve - 0.1;
  const r = R.actor(EL.pronosticadora, XA, y, t, { dir: -1, dedo: senala || mira, habla: entre(t, P5 + 0.1, trepa) && Math.floor(t * 7) % 2 === 0, sorpresa: entre(t, gotasT, gotasT + 0.6) });
  if (mira) prismaticos(XA, r.cabeza[1] + 4, -1);
  // el científico se hace visera con la mano y mira arriba
  R.actor(EL.pronosticador, XB, y, t, { dir: -1, dedo: entre(t, trepa + 0.2, gotasT + 0.2), tocado: 'gorraRoja', pal: PALG, sonrisa: t > gotasT + 0.4 });
};

// ── 6 · dentro de la nube: la gota que devuelve el calor ──────────────────────────────────────────────────────────
const NB = [hex('#ffffff'), hex('#f1f2f6'), hex('#dee3ec'), hex('#c3cbdb'), hex('#a2adc3'), hex('#7e8aa6')];
// los racimos de nube (coliflores) que enmarcan el centro y suben despacio con el aire: [x, y, tamaño, velocidad, cerca 0–1]
const RAC = [[176, 50, 16, 3, 0.15], [110, 34, 20, 3, 0.2], [64, 92, 18, 3, 0.25], [262, 86, 26, 4, 0.4], [4, 46, 34, 4, 0.5], [238, 152, 22, 5, 0.5], [308, 100, 26, 4, 0.6], [302, 136, 42, 6, 0.85], [24, 152, 46, 6, 0.9], [204, 204, 44, 7, 0.95], [90, 200, 42, 8, 1]];
const BOLAS = RAC.map(([, , s], k) => Array.from({ length: 18 }, (_, i) => { const a = ruido(k, i, 48) * 6.283, d = i === 0 ? 0 : (0.3 + 0.65 * ruido(k, i, 49)) * s * 0.8; return [Math.cos(a) * d * 1.3, Math.sin(a) * d * 0.7 - (i === 0 ? 0 : s * 0.1), s * (0.2 + 0.2 * ruido(k, i, 50)) * (i === 0 ? 1.6 : 1)]; }).sort((p, q) => q[1] - p[1]));
const ZB = new Int16Array(320 * 180);
// un racimo: cada píxel se queda con la bola de más arriba que lo cubre; luz arriba a la izquierda, pliegues y filo de luz
const racimo = (k, t) => {
  const [x0, y0, s, vel, cerca] = RAC[k], cx = x0 + Math.sin(t * 0.3 + k) * 2, cy = y0 - (t - P6) * vel, B = BOLAS[k].map(([dx, dy, r]) => [cx + dx, cy + dy, r + Math.sin(t * 0.8 + dx) * 0.5]);
  let xa = 999, xb = -999, ya = 999, yb = -999; for (const [x, y, r] of B) { xa = Math.min(xa, x - r); xb = Math.max(xb, x + r); ya = Math.min(ya, y - r); yb = Math.max(yb, y + r); }
  xa = Math.max(0, Math.floor(xa)); xb = Math.min(319, Math.ceil(xb)); ya = Math.max(0, Math.floor(ya)); yb = Math.min(179, Math.ceil(yb)); if (xa > xb || ya > yb) return;
  for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) { let w = -1; for (let i = 0; i < B.length; i++) { const [bx, by, r] = B[i]; if ((x + 0.5 - bx) ** 2 + (y + 0.5 - by) ** 2 <= r * r) w = i; } ZB[y * 320 + x] = w; }
  const id = (x, y) => (x < xa || x > xb || y < ya || y > yb ? -1 : ZB[y * 320 + x]), BF = R.buf;
  for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) {
    const i = ZB[y * 320 + x]; if (i < 0 || tranquilo(x, y)) continue; const [bx, by, r] = B[i], nx = (x + 0.5 - bx) / r, ny = (y + 0.5 - by) / r, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
    let v = 0.15 + 0.8 * Math.max(0, -nx * 0.5 - ny * 0.62 + nz * 0.6);
    const j = id(x - 1, y - 1); if (j >= 0 && j !== i && B[j][1] < by) v -= 0.16; if (j < 0) v += 0.2; if (id(x + 1, y + 1) < 0) v -= 0.1;
    v = (1 - Math.max(0, Math.min(1, v))) * (0.4 + 0.6 * cerca) + (1 - cerca) * 0.1;
    const f = v * 5.4, l = Math.floor(f) + (f - Math.floor(f) > umbral(x, y) ? 1 : 0); BF[y * 320 + x] = NB[Math.max(0, Math.min(5, l))];
  }
};
// la gota: una lágrima con su luz, su sombra, el contorno y el brillo
const gotaGrande = (x, y, r) => {
  const BF = R.buf;
  for (let yy = Math.floor(y - 2 * r - 1); yy <= y + r + 1; yy++) for (let xx = Math.floor(x - r - 1); xx <= x + r + 1; xx++) {
    if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue; const dx = xx + 0.5 - x, dy = yy + 0.5 - y; let d;
    if (dy >= -r * 0.4) d = Math.hypot(dx, dy) / r; else { const q = (-dy - r * 0.4) / (r * 1.6); d = q > 1 ? 9 : Math.abs(dx) / (r * 0.92 * (1 - q) + 0.35); }
    if (d > 1 + 1.2 / r) continue;
    const l = -dx / r * 0.55 - dy / r * 0.5 + (1 - Math.min(1, d)) * 0.6;
    BF[yy * 320 + xx] = d > 1 ? hex('#1c3a6a') : l > 0.8 ? hex('#b8e2ff') : l > 0.42 ? hex('#6ab2f2') : l > 0.02 ? hex('#3a86d8') : hex('#2a60ac');
  }
  if (r >= 3) { R.rect(Math.round(x - r * 0.45), Math.round(y - r * 0.45), Math.round(x - r * 0.45) + (r > 6 ? 1 : 0), Math.round(y - r * 0.45) + (r > 6 ? 1 : 0), C.blanco); R.pset(Math.round(x + r * 0.4), Math.round(y + r * 0.5), hex('#5a9ae0')); }
};
// la chispa de calor: estrella de ocho puntas, el centro blanco, rayos amarillos con la punta naranja
const chispa = (x, y, s) => { for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.2, L = (k % 2 ? 0.5 : 1) * s; for (let r = 0; r <= L; r++) { const px = Math.round(x + Math.cos(an) * r), py = Math.round(y + Math.sin(an) * r); if (tranquilo(px, py)) continue; R.pset(px, py, r < 2 ? C.blanco : r < L * 0.65 ? hex('#ffe060') : hex('#ff9a3a')); if (k % 2 === 0 && r < L * 0.45) R.pset(px + Math.round(-Math.sin(an)), py + Math.round(Math.cos(an)), hex('#fff2a0')); } } R.disco(x, y, Math.max(1, Math.round(s * 0.16)), C.blanco); };
// la «^» del calor que sube, con su sombra
const calorSube = (x, y, c) => { for (let j = 0; j <= 4; j++) { R.pset(x + j, y + j + 2, hex('#7a3010')); R.pset(x - j, y + j + 2, hex('#7a3010')); R.pset(x + j, y + j, c); R.pset(x - j, y + j, c); R.pset(x + j, y + j + 1, c); R.pset(x - j, y + j + 1, c); } };
// el resplandor cálido alrededor de una chispa
const resplandor = (x, y, r, a) => { for (let yy = Math.max(0, Math.round(y - r)); yy <= Math.min(179, y + r); yy++) for (let xx = Math.max(0, Math.round(x - r)); xx <= Math.min(319, x + r); xx++) { const d = Math.hypot(xx - x, yy - y) / r; if (d < 1 && !tranquilo(xx, yy) && umbral(xx, yy) < (1 - d) * a) tine(xx, yy, hex('#ffa452'), 0.42); } };
const GX = 152, GY = 98;
const SEGUNDAS = [[72, 64], [240, 116], [98, 138], [206, 62], [40, 112], [268, 156], [128, 52]].map(([x, y], i) => [x, y, evaporar - 0.3 + i * 0.17]);
const p6 = (t) => {
  const { pset, disco } = R, BF = R.buf;
  // la luz dentro de la nube: bruma tramada, más clara arriba a la izquierda, que se mueve despacio
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.0 + (x / 320) * 0.9 + (y / 180) * 1.4 + Math.sin(x * 0.025 + y * 0.03 + t * 0.25) * 0.25, l = Math.floor(v) + (v - Math.floor(v) > umbral(x, y) ? 1 : 0); BF[y * 320 + x] = NB[Math.min(5, l)]; }
  // el claro de arriba: el cielo azul con el sol que asoma, y un vencejo que cruza
  const claro = (x, y) => ((x - 220) / 66) ** 2 + ((y - 14) / 24) ** 2 < 1 - 0.12 * Math.sin(x * 0.25 + t * 0.7) - 0.08 * Math.sin(x * 0.11);
  for (let y = 0; y < 42; y++) for (let x = 150; x < 292; x++) if (claro(x, y)) { const f = y / 40 * 2.2, l = Math.floor(f) + (f - Math.floor(f) > umbral(x, y) ? 1 : 0); pset(x, y, [hex('#4aa6ea'), hex('#74bef2'), hex('#a8daf4')][Math.min(2, l)]); if (!claro(x, y + 1)) pset(x, y, C.blanco); }
  { const sx = 228, sy = 18; for (let k = 0; k < 12; k++) { const an = k * 0.524 + t * 0.3; for (let r = 12; r < 15 + (k % 2) * 5; r++) { const x = Math.round(sx + Math.cos(an) * r), y = Math.round(sy + Math.sin(an) * r); if (claro(x, y) && !tranquilo(x, y)) pset(x, y, hex('#fff0a8')); } } disco(sx, sy, 10, hex('#ffe28a')); disco(sx, sy, 9, hex('#fff4c8')); disco(sx - 2, sy - 2, 4, C.blanco); }
  { const u = lin(t, P6 + 0.3, P6 + 2.3); if (u > 0 && u < 1) { const x = Math.round(lerp(158, 282, u)), y = Math.round(26 - Math.sin(u * 6) * 4); if (claro(x, y) && !tranquilo(x, y)) { const al = Math.sin(t * 18) > 0 ? -1 : 1; pset(x, y, C.k); pset(x + 1, y, C.k); pset(x - 1, y + al, C.k); pset(x - 2, y + al * 2, C.k); pset(x + 2, y + al, C.k); pset(x + 3, y + al * 2, C.k); } } }
  // los racimos de nube, de lejos a cerca
  for (let k = 0; k < RAC.length; k++) racimo(k, t);
  // «here is the secret»: donde va a nacer la gota, un brillo suave
  { const k = lin(t, P6 + 0.2, P6 + 0.9) * (1 - lin(t, gotaT + 0.6, forma)); if (k > 0) for (let yy = GY - 22; yy <= GY + 22; yy++) for (let xx = GX - 30; xx <= GX + 30; xx++) { const d = Math.hypot((xx - GX) / 30, (yy - GY) / 22); if (d < 1 && umbral(xx, yy) < (1 - d) * k * 0.9) tine(xx, yy, C.blanco, 0.65); } if (k > 0.3) for (let i = 0; i < 4; i++) { const a = i * 1.571 + t * 1.5, on = Math.sin(t * 7 + i * 2) > 0.2; if (on) destello(Math.round(GX + Math.cos(a) * 20), Math.round(GY + Math.sin(a) * 13), 1 + (i % 2), hex('#e8f6ff')); } }
  // el vapor: motas que suben con el aire y luego se juntan en espiral donde nace la gota
  for (let k = 0; k < 64; k++) {
    const a0 = ruido(k, 1, 51) * 6.283, R0 = 40 + ruido(k, 2, 51) * 80, t0 = gotaT - 0.7 + ruido(k, 3, 51) * 0.45, u = lin(t, t0, forma - 0.05), deriva = (Math.min(t, t0) - P6) * (5 + ruido(k, 4, 51) * 4);
    if (u >= 1) continue; const rr = R0 * (1 - suave(u)), an = a0 + u * 2.2, x = Math.round(GX + Math.cos(an) * rr * 1.45 + Math.sin(t * 2 + k) * (1 - u)), y = Math.round(GY + Math.sin(an) * rr * 0.85 - deriva * (1 - u));
    if (tranquilo(x, y)) continue; pset(x, y, hex('#6ab8ec')); tine(x - 1, y - 1, C.blanco, 0.9); if (u > 0) { const px = Math.round(GX + Math.cos(an - 0.15) * (rr + 4) * 1.45), py = Math.round(GY + Math.sin(an - 0.15) * (rr + 4) * 0.85 - deriva * (1 - u)); tine(px, py, hex('#8ad0f0'), 0.7); tine(Math.round((x + px) / 2), Math.round((y + py) / 2), hex('#cfeefc'), 0.8); } else tine(x, y + 1, hex('#8ad0f0'), 0.6);
  }
  // la gota que nace en «forms» y, en «gives back the heat», suelta la chispa con su anillo, su resplandor y el calor que sube
  const nace = lin(t, forma - 0.25, forma + 0.25), fc = t - devuelve;
  if (fc > 0 && fc < 2.6) resplandor(GX, GY, 46 + fc * 26, 0.85 * (1 - fc / 2.6));
  if (nace > 0) { const yb = GY + Math.round(Math.sin(t * 3) * 1); gotaGrande(GX, yb, Math.max(1, 10 * suave(nace)) + (fc > 0 && fc < 0.3 ? 1 : 0)); }
  if (fc > 0 && fc < 1.1) { const q = lin(fc, 0, 1.1); chispa(GX, GY - 4, Math.round(22 * Math.sin(q * Math.PI))); for (let i = 0; i < 40; i++) { const an = i / 40 * 6.283, rr = 12 + q * 52; if (umbral(Math.round(an * 9), i) < 1 - q) tine(GX + Math.cos(an) * rr * 1.2, GY + Math.sin(an) * rr * 0.8, hex('#ffc04a'), 0.85); } }
  for (let i = 0; i < 3; i++) { const q = lin(fc, 0.15 + i * 0.3, 1.6 + i * 0.3); if (q > 0 && q < 1) calorSube(GX + (i - 1) * 9, Math.round(GY - 16 - q * 46), q < 0.6 ? hex('#ffb060') : hex('#e8803a')); }
  // «the sun»: el camino de puntos dorados que baja del sol a la gota (el calor que el sol gastó en evaporarla)
  { const u = lin(t, solT - 0.2, solT + 0.55), f = 1 - lin(t, evaporar + 0.9, P7 - 0.1), n = 30; if (u > 0 && f > 0) { for (let i = 0; i <= n * u; i++) { const q = i / n, x = Math.round(lerp(220, GX + 6, q)), y = Math.round(lerp(28, GY - 22, q) - Math.sin(q * Math.PI) * 16); if (((i + Math.floor(t * 12)) % 3) && !tranquilo(x, y) && umbral(x, y) < f) { pset(x, y, hex('#ffe060')); pset(x + 1, y, hex('#ffd040')); pset(x, y + 1, hex('#b8780a')); } } if (u >= 1 && t < solT + 0.85) chispa(GX, GY - 4, 9); } }
  // «evaporating it»: nacen más gotas alrededor, en cadena, cada una con su chispa
  SEGUNDAS.forEach(([x, y, t0], i) => {
    const u = lin(t, t0, t0 + 0.3), q = lin(t, t0 + 0.3, t0 + 1.0); if (u <= 0) { if (t > t0 - 0.5) for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 3, rr = 18 * (1 - lin(t, t0 - 0.5, t0)); pset(Math.round(x + Math.cos(a) * rr), Math.round(y + Math.sin(a) * rr * 0.7), C.blanco); } return; }
    if (q > 0 && q < 1) resplandor(x, y, 24 + q * 14, 0.6 * (1 - q));
    gotaGrande(x, y - Math.round(Math.max(0, t - t0) * 2), Math.max(1, 5 * suave(u)));
    if (q > 0 && q < 1) chispa(x, y - 3, Math.round(12 * Math.sin(q * Math.PI)));
    const h = lin(t, t0 + 0.5, t0 + 1.7); if (h > 0 && h < 1) calorSube(x, Math.round(y - 12 - h * 28), h < 0.6 ? hex('#ffb060') : hex('#e8803a'));
  });
};

// ── 7 · el aire sube más deprisa y aspira el mar ──────────────────────────────────────────────────────────────────
const vuela = [aspiraT + 0.05, masAire + 0.7];
const p7 = (t) => {
  const c = 0.58 + 0.42 * suave(lin(t, caliente - 0.2, deprisa + 0.5)), asp = suave(lin(t, aspiraT - 0.5, masAire + 0.2));
  T.maquinaCalor(R, t, { gotas: 1, vapor: 0.6, aspira: asp, crece: c });
  // a «warmer», la base de la nube brilla de calor
  { const k = lin(t, caliente - 0.3, caliente + 0.3) * (1 - lin(t, deprisa, deprisa + 1)); if (k > 0) for (let y = 94; y < 112; y++) for (let x = 60; x < 176; x++) if (umbral(x, y) < k * (1 - Math.abs(x - 118) / 58) * 0.6) tine(x, y, hex('#f8a050'), 0.3); }
  const y = T.c_cubiertaY(t);
  // la científica mira arriba asombrada y se agarra a la consola cuando sopla el viento
  R.actor(EL.pronosticadora, XA, y, t, { dir: -1, dedo: entre(t, deprisa - 0.3, deprisa + 0.8), sorpresa: entre(t, deprisa - 0.2, deprisa + 1.0) || t > aspiraT + 0.1, habla: entre(t, P7 + 0.2, caliente) && Math.floor(t * 7) % 2 === 0 });
  // al científico se le vuela la gorra hacia la nube y la persigue con los brazos en alto
  const sinGorra = t > vuela[0];
  const r = R.actor(EL.pronosticador, XB - Math.round(4 * lin(t, vuela[0] + 0.1, vuela[0] + 0.6)), y, t, { dir: -1, brazos: entre(t, vuela[0] + 0.1, vuela[0] + 1.3), sorpresa: t > vuela[0], tocado: sinGorra ? undefined : 'gorraRoja', pal: PALG, anda: entre(t, vuela[0] + 0.1, vuela[0] + 0.6) });
  if (sinGorra) { const u = lin(t, vuela[0], vuela[1]); if (u < 1) { const gx = lerp(XB - 2, 104, suave(u)), gy = lerp(r.cabeza[1] - 4, 98, u) - Math.sin(u * Math.PI) * 26; gorra(gx, gy, Math.floor(t * 6) % 2 ? 1 : -1); } }
};
const efectos = [[0.25, 'ola'], [calido, 'brillo'], [2.1, 'gluglu'], [3.5, 'ola'],
  [P2 + 0.3, 'whoosh'], [P2 + 1.05, 'golpecito'], [toques[0], 'golpecito'], [toques[1], 'golpecito'], [toques[1] + 0.3, 'bip'], [ochenta, 'bip'], [ochenta + 0.05, 'brillo'],
  [P3 + 0.2, 'ola'], [evapora, 'vapor'], [invisible + 0.3, 'pop'], [vaporT + 0.3, 'ola'],
  [P4 + 0.05, 'vapor'], [empana, 'gluglu'], [limpia[0], 'papel'], [limpia[0] + 0.5, 'papel'], [sube, 'vapor'],
  [P5 + 0.15, 'ola'], [trepa, 'whoosh'], [vuelve - 0.1, 'golpecito'], [gotasT, 'burbujas'],
  [P6 + 0.1, 'whoosh'], [forma, 'burbujas'], [devuelve, 'brillo'], [solT, 'brillo'], [evaporar - 0.1, 'pop'], [evaporar + 0.35, 'pop'], [evaporar + 0.7, 'pop'],
  [caliente, 'whoosh'], [deprisa, 'whoosh'], [aspiraT, 'rafaga'], [vuela[0] + 0.15, 'boing'], [35.15, 'trueno'], [masAire, 'rafaga']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-motor'] = ('El motor', '''// HU-MOTOR (frase 8), sin año: el huracán como motor. Cuatro planos:
// 1. la lancha frente a la torre de nubes: en «engine» se abre en la nube la ventana de chapa remachada y en «runs on that
//    heat» arrancan los pistones de nube, el cigüeñal y el volante, con el mar encendido debajo; los científicos se
//    asombran (él con los brazos en alto) y en «by one NOAA estimate» ella saca la calculadora y teclea;
// 2. (corta en «An average one») el manómetro del motor de cerca, en su chapa remachada, con el ojo de buey que deja ver la
//    tormenta fuera: la aguja sube en «releases»; en «rain» la lluvia corre por la chapa y la mano limpia el cristal; en
//    «150» la aguja se clava en el tope, salta un remache (gag), todo tiembla, la válvula escupe vapor y aparece «×150»;
// 3. (corta en «times») la lancha y el motor otra vez, con el «×150» en el cielo: en «all the power plants» salen una a una
//    las centrales eléctricas de la costa, cada una con su saltito; ella las cuenta con el dedo y en «planet» los dos se
//    quedan boquiabiertos; del volante empieza a salir un hilito de viento;
// 4. (corta en «although») de cerca, el costado del motor que ruge (el volante enorme, chispas, vapor, todo vibra) y su
//    tobera de latón; en «tiny fraction» sale un rizo de aire diminuto que cruza despacio y en «wind» llega al molinillo de
//    papel que la científica ha acercado a la tobera: da un cuarto de vuelta y se para, y ella lo sacude (gag).''', r'''
''' + COMUN + r'''
const m = (f) => en('motor', f);
// los cortes: «An (average one)», «times», «although»
const M2 = m(0.267), M3 = m(0.521), M4 = m(0.799);
const motorT = m(0.052), corre = m(0.086), calorT = m(0.123), noaa = m(0.199), estima = m(0.212), libera = m(0.306), lluviaT = m(0.399), c150 = m(0.477), todas = m(0.639), centrales = m(0.663), planeta = m(0.724), diminuta = m(0.850), fraccion = m(0.867), convierte = m(0.933), viento = m(0.966);
const AZUL = '#2a4a7a';
const XA = 220, XB = 238;
const PALG = { X: hex('#d8463a'), w: hex('#f6f2ea') };
import { TOCADOS } from '/atomo/plato/kits/pixel-chibi.js';
TOCADOS.gorraRoja = [['...kkkkkkkk....', '..kXXXXXXXXk...', '.kXXXXXwXXXXk..', '.kkkkkkkkkkkkkk', '..........kkkk.'], -2];
// el mismo mar sin las centrales: tapa la costa de la derecha mientras no tocan (el modo motor las saca desde 0,4)
const SIN = R.nuevo();
const tapaCentrales = (t, o) => { const prev = R.usar(SIN); T.maquinaCalor(R, t, { ...o, motor: 0.001, barco: false }); R.usar(prev); const B = R.buf; for (let y = 36; y <= 128; y++) for (let x = 204; x < (y > 120 ? 247 : 320); x++) if (!(x >= 273 && x <= 283 && y >= 100)) B[y * 320 + x] = SIN[y * 320 + x]; };
// la calculadora en las manos (delante del pecho)
const calculadora = (x, y, t) => { R.rect(x, y, x + 5, y + 6, C.k); R.rect(x + 1, y + 1, x + 4, y + 5, hex('#3a3e48')); R.rect(x + 1, y + 1, x + 4, y + 2, hex('#7ac88a')); if (Math.floor(t * 9) % 2) R.pset(x + 2 + Math.floor(t * 5) % 2, y + 1, hex('#1a3a22')); R.pset(x + 2, y + 4, hex('#c8ccd4')); R.pset(x + 3, y + 4, hex('#d84a3a')); };

// ── 1 · la nube se abre y es un motor ─────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const u = 0.001 + 0.319 * suave(lin(t, motorT - 0.1, motorT + 0.5)) + 0.18 * lin(t, corre - 0.1, calorT + 0.15), o = { motor: u, barco: true };
  T.maquinaCalor(R, t, o); tapaCentrales(t, o);
  if (entre(t, motorT - 0.05, motorT + 0.5)) { const k = lin(t, motorT - 0.05, motorT + 0.5); for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283, r = 10 + k * 40; tine(118 + Math.cos(an) * r * 1.3, 76 + Math.sin(an) * r, C.blanco, 0.8 * (1 - k)); } }
  const y = T.c_cubiertaY(t);
  const teclea = entre(t, noaa - 0.4, M2);
  const r = R.actor(EL.pronosticadora, XA, y, t, { dir: -1, sorpresa: entre(t, motorT + 0.1, corre + 0.2), dedo: entre(t, corre, calorT + 0.6), habla: teclea && Math.floor(t * 6) % 2 === 0 });
  if (teclea) calculadora(XA - 2, y - 11, t);
  R.actor(EL.pronosticador, XB, y, t, { dir: -1, brazos: entre(t, motorT + 0.15, corre + 0.5), sorpresa: entre(t, motorT + 0.1, calorT), sonrisa: t > calorT + 0.3, tocado: 'gorraRoja', pal: PALG });
};

// ── 2 · el manómetro: ×150 ────────────────────────────────────────────────────────────────────────────────────────
const CH = [hex('#262c40'), hex('#323a52'), hex('#3e4760'), hex('#4c566f'), hex('#5e6984'), hex('#76829c')];
const LAT = hex('#d8a83a'), LATS = hex('#9a6a1a'), LATL = hex('#f8d878'), COB = hex('#c87a4a'), COBS = hex('#8a4a2a'), COBL = hex('#f0a878');
const remache = (x, y) => { R.pset(x, y, CH[5]); R.pset(x + 1, y, CH[3]); R.pset(x, y + 1, CH[3]); R.pset(x + 1, y + 1, CH[0]); };
const angAguja = (v) => (225 - v / 160 * 270) * Math.PI / 180;
const aguja = (t) => { if (t > c150 + 0.06) return 163 + Math.sin(t * 38) * 2.5 * Math.max(0, 1 - (t - c150) / 1.4); return 10 + Math.sin(t * 9) * 1.5 + 48 * suave(lin(t, libera - 0.1, libera + 0.5)) + 46 * suave(lin(t, lluviaT, lluviaT + 0.7)) + 58 * lin(t, c150 - 0.12, c150 + 0.06); };
const GCX = 122, GCY = 90, GR = 54;
const p2 = (t) => {
  const { rect, pset, disco, linea } = R, BF = R.buf;
  // la chapa: degradado tramado con la luz arriba a la izquierda, juntas con remaches, arañazos y manchas de grasa
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 3.3 - x / 320 * 1.4 - y / 180 * 1.3 + Math.sin(x * 0.07 + y * 0.01) * 0.12, l = Math.floor(v) + (v - Math.floor(v) > umbral(x, y) ? 1 : 0); BF[y * 320 + x] = CH[Math.max(0, Math.min(5, l))]; }
  for (const jx of [44, 204, 312]) { rect(jx, 0, jx, 179, CH[0]); rect(jx + 1, 0, jx + 1, 179, CH[5]); for (let y = 5; y < 180; y += 9) { remache(jx - 4, y); remache(jx + 4, y); } }
  for (const jy of [16, 164]) { rect(0, jy, 319, jy, CH[0]); rect(0, jy + 1, 319, jy + 1, CH[5]); for (let x = 3; x < 320; x += 9) { remache(x, jy - 4); remache(x, jy + 4); } }
  for (let k = 0; k < 18; k++) { const x0 = Math.round(ruido(k, 1, 61) * 300), y0 = Math.round(ruido(k, 2, 61) * 170), L = 4 + Math.round(ruido(k, 3, 61) * 10); for (let i = 0; i < L; i++) pset(x0 + i, y0 + Math.round(i * (ruido(k, 4, 61) - 0.5)), CH[ruido(k, 5, 61) < 0.5 ? 5 : 1]); }
  for (let k = 0; k < 5; k++) { const cx = ruido(k, 6, 61) * 320, cy = ruido(k, 7, 61) * 180, r = 6 + ruido(k, 8, 61) * 9; for (let y = Math.round(cy - r); y < cy + r; y++) for (let x = Math.round(cx - r); x < cx + r; x++) if (Math.hypot(x - cx, (y - cy) * 1.4) < r && umbral(x, y) < 0.4) tine(x, y, hex('#141826'), 0.35); }
  // la placa de latón (sin letras) con sus cuatro tornillos, la tubería gruesa de abajo con su brida y las franjas de aviso
  { rect(190, 150, 236, 161, C.k); rect(191, 151, 235, 160, LATS); rect(191, 151, 235, 151, LATL); rect(192, 152, 234, 159, LAT); for (const [sx, sy] of [[194, 154], [232, 154], [194, 158], [232, 158]]) pset(sx, sy, LATS); rect(198, 155, 228, 155, LATS); rect(202, 157, 224, 157, LATS); }
  rect(0, 168, 319, 179, C.k); rect(0, 169, 319, 178, CH[3]); rect(0, 169, 319, 170, CH[5]); rect(0, 177, 319, 178, CH[0]); for (const fx of [60, 180, 290]) { rect(fx - 3, 166, fx + 3, 179, C.k); rect(fx - 2, 167, fx + 2, 179, CH[4]); pset(fx - 1, 168, CH[5]); }
  for (let x = 0; x < 320; x++) for (let y = 162; y < 166; y++) pset(x, y, Math.floor((x + y) / 5) % 2 ? hex('#e8c040') : hex('#1c1c24'));
  // el resplandor del calor que sube desde abajo, al ritmo del motor
  { const p = 0.55 + 0.35 * Math.sin(t * 6.8); for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) if (umbral(x, y) < (y - 140) / 40 * p * 0.8) tine(x, y, hex('#f07a3a'), 0.35); }
  // la tubería de cobre que baja del manómetro, con su llave roja que gira, y la válvula de vapor de arriba a la izquierda
  rect(GCX - 5, GCY + GR, GCX + 5, 179, C.k); rect(GCX - 4, GCY + GR, GCX + 4, 179, COB); rect(GCX - 4, GCY + GR, GCX - 3, 179, COBL); rect(GCX + 3, GCY + GR, GCX + 4, 179, COBS); for (const yy of [GCY + GR + 6, 176]) { rect(GCX - 6, yy, GCX + 6, yy + 2, C.k); rect(GCX - 5, yy, GCX + 5, yy + 1, LAT); }
  { const wx = GCX + 18, wy = 166; linea(GCX + 4, wy, wx, wy, C.k); disco(wx, wy, 9, C.k); disco(wx, wy, 8, hex('#c83a2a')); disco(wx, wy, 6, C.k); disco(wx, wy, 5, CH[2]); const g = t * 2 + (t > c150 ? (t - c150) * 6 : 0); for (let k = 0; k < 4; k++) { const a = g + k * 1.571; linea(wx, wy, Math.round(wx + Math.cos(a) * 7), Math.round(wy + Math.sin(a) * 7), hex('#c83a2a')); } disco(wx, wy, 2, LAT); }
  { const vx = 24, vy = 40; rect(vx - 2, vy, vx + 2, 64, C.k); rect(vx - 1, vy, vx + 1, 64, COB); rect(vx - 6, vy - 6, vx + 6, vy, C.k); rect(vx - 5, vy - 5, vx + 5, vy - 1, LAT); rect(vx - 5, vy - 5, vx + 5, vy - 5, LATL); rect(vx + 6, vy - 4, vx + 10, vy - 2, C.k); rect(vx + 7, vy - 4, vx + 9, vy - 3, LATS);
    const fuerte = t > c150 && t < c150 + 1.6 ? 1 : 0; for (let k = 0; k < 8; k++) { const u = (t * (0.9 + fuerte) + k / 8) % 1, on = fuerte || ((t + k * 0.1) % 1.8) < 0.7; if (!on) continue; const px = vx + 12 + u * (24 + fuerte * 30), py = vy - 3 - u * (14 + fuerte * 10) + Math.sin(u * 6 + k) * 2, rr = 1 + u * (4 + fuerte * 3); for (let yy = Math.round(py - rr); yy <= py + rr; yy++) for (let xx = Math.round(px - rr); xx <= px + rr; xx++) if (Math.hypot(xx - px, yy - py) <= rr && umbral(xx, yy) < (1 - u) * 0.9) tine(xx, yy, C.blanco, 0.6); } }
  // el ojo de buey: el aro de latón con sus tornillos y, detrás del cristal, la tormenta de fuera con su lluvia y algún rayo
  { const ox = 256, oy = 116, orr = 26, rayo = (t % 2.9) < 0.12;
    for (let y = oy - orr; y <= oy + orr; y++) for (let x = ox - orr; x <= ox + orr; x++) { const d = Math.hypot(x - ox, y - oy); if (d > orr) continue; let c = d > orr - 5 ? (d > orr - 1 ? C.k : -Math.cos(Math.atan2(y - oy, x - ox) + 0.8) > 0.3 ? LATL : LAT) : null;
      if (c == null) { const v = 1 + (y - oy + orr) / (2 * orr) * 2.2 + Math.sin((x + t * 30) * 0.12 + y * 0.05) * 0.5, l = Math.floor(v) + (v - Math.floor(v) > umbral(x, y) ? 1 : 0); c = [hex('#5a6278'), hex('#454c66'), hex('#353b52'), hex('#262b3e')][Math.max(0, Math.min(3, l))]; if (rayo) c = mezcla(c, hex('#e8e8ff'), 0.5); if (((x * 2 + y + Math.floor(t * 40)) % 9) === 0) c = hex('#8a94b0'); }
      pset(x, y, c); }
    for (let k = 0; k < 8; k++) { const a = k * 0.785; pset(Math.round(ox + Math.cos(a) * (orr - 3)), Math.round(oy + Math.sin(a) * (orr - 3)), LATS); }
    for (let a = 2.4; a < 3.3; a += 0.05) pset(Math.round(ox + Math.cos(a) * (orr - 9)), Math.round(oy - Math.sin(a) * (orr - 9)), hex('#a8b0c8')); }
  // el manómetro: el bisel de latón, la esfera crema, la zona roja, las marcas y los números, el tope y la aguja
  disco(GCX + 3, GCY + 4, GR + 2, hex('#141826'));
  disco(GCX, GCY, GR + 1, C.k);
  for (let y = GCY - GR; y <= GCY + GR; y++) for (let x = GCX - GR; x <= GCX + GR; x++) { const d = Math.hypot(x - GCX, y - GCY); if (d > GR || d < GR - 7) continue; const l = -((x - GCX) / d) * 0.6 - ((y - GCY) / d) * 0.8; pset(x, y, d > GR - 1.2 ? LATS : l > 0.45 ? LATL : l < -0.5 ? LATS : (d > GR - 3 && l > 0 ? LATL : LAT)); }
  disco(GCX, GCY, GR - 7, C.k); disco(GCX, GCY, GR - 8, hex('#f4efe2'));
  for (let y = GCY - GR; y <= GCY + GR; y++) for (let x = GCX - GR; x <= GCX + GR; x++) { const d = Math.hypot(x - GCX, y - GCY); if (d < GR - 8 && y > GCY + 10 && umbral(x, y) < (y - GCY - 10) / 60) pset(x, y, hex('#e2dccb')); }
  for (let v = 120; v <= 160; v += 0.4) { const a = angAguja(v); for (let r = GR - 17; r <= GR - 11; r++) pset(Math.round(GCX + Math.cos(a) * r), Math.round(GCY - Math.sin(a) * r), hex('#d8402c')); }
  for (let v = 0; v <= 160; v += 5) { const a = angAguja(v), L = v % 50 === 0 ? 8 : v % 10 === 0 ? 5 : 3; linea(Math.round(GCX + Math.cos(a) * (GR - 10)), Math.round(GCY - Math.sin(a) * (GR - 10)), Math.round(GCX + Math.cos(a) * (GR - 10 - L)), Math.round(GCY - Math.sin(a) * (GR - 10 - L)), C.k); }
  for (const v of [0, 50, 100, 150]) { const a = angAguja(v); R.numero(String(v), Math.round(GCX + Math.cos(a) * (GR - 27)), Math.round(GCY - Math.sin(a) * (GR - 27)) + 4, { color: hex('#2a2a36'), centro: true, sombra: false }); }
  { const a = angAguja(165); disco(Math.round(GCX + Math.cos(a) * (GR - 14)), Math.round(GCY - Math.sin(a) * (GR - 14)), 2, LATS); }
  { const v = aguja(t), a = angAguja(v), ex = GCX + Math.cos(a) * (GR - 12), ey = GCY - Math.sin(a) * (GR - 12), bx = GCX - Math.cos(a) * 10, by = GCY + Math.sin(a) * 10; for (const [ox, oy] of [[0, 0], [1, 0], [0, 1]]) linea(Math.round(bx) + ox, Math.round(by) + oy, Math.round(ex) + ox, Math.round(ey) + oy, ox || oy ? hex('#3a3a48') : C.k); linea(Math.round(GCX + Math.cos(a) * (GR - 22)), Math.round(GCY - Math.sin(a) * (GR - 22)), Math.round(ex), Math.round(ey), hex('#d8402c')); disco(GCX, GCY, 5, C.k); disco(GCX, GCY, 4, LAT); pset(GCX - 1, GCY - 2, LATL); }
  // el cristal: los reflejos curvos
  for (let a = 1.95; a < 2.95; a += 0.015) { pset(Math.round(GCX + Math.cos(a) * (GR - 13)), Math.round(GCY - Math.sin(a) * (GR - 13)), C.blanco); if (a > 2.15 && a < 2.7) pset(Math.round(GCX + Math.cos(a) * (GR - 15)), Math.round(GCY - Math.sin(a) * (GR - 15)), hex('#ffffff')); }
  for (let a = 5.2; a < 5.6; a += 0.03) pset(Math.round(GCX + Math.cos(a) * (GR - 12)), Math.round(GCY - Math.sin(a) * (GR - 12)), hex('#fffaf0'));
  // la lluvia que corre por la chapa y por el cristal, desde «rain»
  { const ll = lin(t, lluviaT - 0.25, lluviaT + 0.3); if (ll > 0) for (let k = 0; k < Math.round(70 * ll); k++) { const x = Math.round(ruido(k, 1, 62) * 320), v = 50 + ruido(k, 2, 62) * 70, y = Math.round((ruido(k, 3, 62) * 200 + (t - lluviaT + 2) * v) % 200) - 10, L = 4 + Math.round(ruido(k, 4, 62) * 5); if (tranquilo(x, y)) continue; for (let i = 0; i < L; i++) tine(x, y - i, hex('#c8dcf0'), 0.55 - i * 0.05); tine(x, y + 1, hex('#ffffff'), 0.6); } }
  // la mano limpia el cristal del manómetro
  { const e = lin(t, lluviaT + 0.1, lluviaT + 0.45), s = lin(t, lluviaT + 1.05, c150 - 0.15); if (e > 0 && s < 1) { const pasa = lin(t, lluviaT + 0.45, lluviaT + 1.05); T.mano(R, Math.round(lerp(340, 168, suave(e)) - Math.sin(pasa * Math.PI * 2) * 52 + lerp(0, 190, suave(s))), Math.round(GCY - 6 + Math.sin(pasa * Math.PI * 4) * 4), -1, AZUL); } }
  // «150»: el remache que salta, el «×150» que aparece con su destello
  { const u = lin(t, c150 + 0.03, c150 + 0.9); if (u > 0 && u < 1) { const x = Math.round(lerp(208, 330, u)), y = Math.round(lerp(60, 20, u) - Math.sin(u * Math.PI) * 30), s = 1 + Math.round(u * 3); R.disco(x, y, s + 1, C.k); R.disco(x, y, s, CH[5]); if (Math.floor(t * 20) % 2) pset(x - 1, y - 1, C.blanco); } if (t < c150 + 0.03) remache(208, 60); else { disco(208, 60, 2, C.k); pset(208, 60, hex('#0a0c14')); } }
  if (t > c150) { const k = lin(t, c150, c150 + 0.25); if (k < 1) for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283, r = 8 + k * 46; tine(230 + Math.cos(an) * r * 1.4, 56 + Math.sin(an) * r * 0.6, hex('#fff2a0'), 0.9 * (1 - k)); } R.numero('×150', 230, 64, { tam: 16, centro: true }); }
  // todo tiembla con el golpe
  if (t > c150 && t < c150 + 0.7) sacude(Math.round(Math.sin(t * 70) * 2 * (1 - (t - c150) / 0.7)), Math.round(Math.cos(t * 55) * 1.2 * (1 - (t - c150) / 0.7)));
};

// ── 3 · las centrales eléctricas, una a una ───────────────────────────────────────────────────────────────────────
const sale = [0, 0, 0.137, 0.33, 0.52, 0.71].map((L) => todas - 0.1 + L * (planeta + 0.2 - todas));
const p3 = (t) => {
  const u = 0.5 + 0.41 * lin(t, todas - 0.1, planeta + 0.1), o = { motor: u, barco: true };
  T.maquinaCalor(R, t, o);
  if (t < todas - 0.1) tapaCentrales(t, o);
  { const k = lin(t, M3, M3 + 0.3); R.numero('×150', 262, 74 - Math.round((1 - suave(k)) * 6), { tam: 16, centro: true }); if (k < 1) for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283, r = 6 + k * 30; tine(262 + Math.cos(an) * r * 1.5, 66 + Math.sin(an) * r * 0.6, hex('#fff2a0'), 0.9 * (1 - k)); } }
  const y = T.c_cubiertaY(t);
  const cuenta = sale.slice(2).some((s) => entre(t, s, s + 0.2));
  R.actor(EL.pronosticadora, XA, y, t, { dir: -1, dedo: cuenta || entre(t, M3 + 0.1, M3 + 0.9), sorpresa: t > planeta, habla: entre(t, M3 + 0.9, todas - 0.2) && Math.floor(t * 7) % 2 === 0 });
  R.actor(EL.pronosticador, XB, y, t, { dir: 1, sorpresa: t > planeta + 0.15, sonrisa: entre(t, M3, todas), tocado: 'gorraRoja', pal: PALG, brazos: entre(t, planeta + 0.3, planeta + 1.0) });
};

// ── 4 · una pizca de viento ───────────────────────────────────────────────────────────────────────────────────────
const molinillo = (x, y, ang) => {
  const COL = [hex('#e84a3a'), hex('#f0c030'), hex('#3a7ae8'), hex('#4ab85a')], COLS = [hex('#a82a20'), hex('#b8901c'), hex('#2a52a8'), hex('#2e8a3e')];
  R.rect(x - 1, y, x, y + 46, C.k); R.rect(x, y + 1, x, y + 45, hex('#c89a5a'));
  for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2, b = a + Math.PI / 2, P = [[x, y], [Math.round(x + Math.cos(a) * 13), Math.round(y + Math.sin(a) * 13)], [Math.round(x + Math.cos(a) * 9 + Math.cos(b) * 7), Math.round(y + Math.sin(a) * 9 + Math.sin(b) * 7)]];
    R.poligono(P.map(([px, py]) => [px + 1, py + 1]), C.k); R.poligono(P, COL[k]); R.linea(x, y, P[2][0], P[2][1], COLS[k]); }
  R.disco(x, y, 2, C.k); R.pset(x, y, hex('#f6f2ea'));
};
const p4 = (t) => {
  const { rect, pset, disco, linea, poligono } = R;
  T.maquinaCalor(R, t, { boya: false, barco: false, crece: 0.35 }); desenfoca(2);
  const vib = Math.round(Math.sin(t * 47)), vy = Math.round(Math.cos(t * 39) * 0.6);
  // el costado del motor: la chapa remachada que ocupa la izquierda, con su canto iluminado
  for (let y = 0; y < 180; y++) { const xb = 132 + Math.round(Math.sin(y * 0.05) * 2) + vib; for (let x = 0; x <= xb; x++) { const v = 3.0 - x / 140 * 1.2 - y / 180 * 1.2, l = Math.floor(v) + (v - Math.floor(v) > umbral(x, y) ? 1 : 0); R.pset(x, y, x > xb - 2 ? (x === xb ? C.k : CH[5]) : CH[Math.max(0, Math.min(5, l))]); } }
  for (const jy of [28, 150]) { rect(0, jy + vy, 130 + vib, jy + vy, CH[0]); rect(0, jy + 1 + vy, 130 + vib, jy + 1 + vy, CH[5]); for (let x = 4; x < 128; x += 9) { remache(x + vib, jy - 4 + vy); remache(x + vib, jy + 4 + vy); } }
  // las rejillas que brillan con el calor de dentro, al ritmo de los pistones, y una tubería que cruza
  { const p = 0.5 + 0.5 * Math.sin(t * 9); for (let k = 0; k < 4; k++) { const ry = 36 + k * 7 + vy; rect(98 + vib, ry, 124 + vib, ry + 3, C.k); for (let x = 99; x <= 123; x++) for (let y = ry + 1; y <= ry + 2; y++) pset(x + vib, y, umbral(x, y) < p ? hex('#f8a040') : hex('#c84a1a')); } }
  rect(0, 156 + vy, 131 + vib, 162 + vy, C.k); rect(0, 157 + vy, 130 + vib, 161 + vy, COB); rect(0, 157 + vy, 130 + vib, 157 + vy, COBL); rect(0, 161 + vy, 130 + vib, 161 + vy, COBS); for (const fx of [24, 92]) { rect(fx - 2 + vib, 154 + vy, fx + 2 + vib, 164 + vy, C.k); rect(fx - 1 + vib, 155 + vy, fx + 1 + vib, 163 + vy, LAT); }
  { const gx = 112 + vib, gy = 130 + vy; disco(gx, gy, 8, C.k); disco(gx, gy, 7, LAT); disco(gx, gy, 5, hex('#f4efe2')); const a = -2.6 + 0.9 + Math.sin(t * 30) * 0.12; R.linea(gx, gy, Math.round(gx + Math.cos(a + 3.5) * 4), Math.round(gy + Math.sin(a + 3.5) * 4), hex('#d8402c')); for (let k = 0; k < 6; k++) { const aa = 2.4 + k * 0.45; pset(Math.round(gx + Math.cos(aa) * 4), Math.round(gy - Math.sin(aa) * 4), C.k); } }
  // el volante enorme que gira deprisa, con sus radios borrosos
  { const fx = 46 + vib, fy = 90 + vy, rr = 50, g = t * 9; for (let y = fy - rr; y <= fy + rr; y++) for (let x = fx - rr; x <= fx + rr; x++) { const d = Math.hypot(x - fx, y - fy); if (d > rr) continue; if (d > rr - 7) pset(x, y, d > rr - 1 ? C.k : Math.sin(Math.atan2(y - fy, x - fx) * 1 + 2.4) > 0.5 ? CH[5] : CH[3]); else if (d < 9) pset(x, y, d < 7 ? (d < 3 ? LAT : CH[4]) : C.k); else { const a = Math.atan2(y - fy, x - fx); for (let k = 0; k < 6; k++) { const da = Math.abs(((a - g - k * 1.047) % 6.283 + 6.283) % 6.283); if (da < 0.16 || (da > 6.1)) pset(x, y, CH[4]); else if (da < 0.5 && umbral(x, y) < 0.35) pset(x, y, CH[3]); } } } }
  // las chispas del calor y el vapor que escapa por las juntas
  for (let k = 0; k < 6; k++) { const u = (t * 2 + k / 6) % 1, x = Math.round(100 + vib + Math.sin(k * 3) * 14 + u * 10), y = Math.round(150 - u * 30); if (u < 0.6) pset(x, y, u < 0.3 ? hex('#fff2a0') : hex('#f8a040')); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.7 + k / 6) % 1, px = 112 + vib + u * 18, py = 30 - u * 22 + Math.sin(u * 7 + k) * 2, r = 1 + u * 5; for (let yy = Math.round(py - r); yy <= py + r; yy++) for (let xx = Math.round(px - r); xx <= px + r; xx++) if (Math.hypot(xx - px, yy - py) <= r && umbral(xx, yy) < (1 - u) * 0.85) tine(xx, yy, C.blanco, 0.6); }
  // la tobera de latón que sale del costado y apunta a la derecha, con sus aros
  { const x0 = 128 + vib, x1 = 166 + vib, cy = 98 + vy; for (let x = x0; x <= x1; x++) { const q = (x - x0) / (x1 - x0), hw = Math.round(5 + q * q * 8); for (let y = cy - hw; y <= cy + hw; y++) { const v = (y - cy) / hw; pset(x, y, Math.abs(v) > 0.85 ? C.k : v < -0.4 ? LATL : v > 0.45 ? LATS : LAT); } if ((x - x0) % 12 === 0) for (let y = cy - hw; y <= cy + hw; y++) pset(x, y, LATS); }
    for (let y = cy - 12; y <= cy + 12; y++) { pset(x1, y, C.k); pset(x1 + 1, y, Math.abs(y - cy) < 11 ? hex('#1a1e2a') : C.k); } }
  // el rizo de viento: diminuto, sale a «tiny fraction», cruza despacio y llega al molinillo en «wind»
  const ri = lin(t, diminuta - 0.1, convierte + 0.35), rx = lerp(170, 214, suave(ri)) + vib * 0, ry = 98 + Math.sin(ri * 9) * 3 - ri * 18;
  if (ri > 0 && ri < 1) { for (let k = 0; k < 9; k++) { const a = -t * 9 + k * 0.6, r2 = 3.2 - k * 0.3; pset(Math.round(rx + Math.cos(a) * r2), Math.round(ry + Math.sin(a) * r2), C.blanco); } for (let i = 1; i < 6; i++) { tine(rx - i * 2, ry + Math.sin(t * 10 - i) * 1.2, C.blanco, 0.7 - i * 0.12); tine(rx - i * 2, ry + 1 + Math.sin(t * 10 - i) * 1.2, hex('#6a8ab8'), 0.5 - i * 0.08); } }
  // el molinillo en la mano de la científica: da un cuarto de vuelta en «wind» y se para
  const gira = suave(lin(t, viento - 0.15, viento + 0.6)) * Math.PI / 2 + Math.sin(t * 1.5) * 0.04;
  const acerca = suave(lin(t, M4 + 0.4, fraccion)), sacudo = t > viento + 0.7 ? Math.round(Math.sin(t * 22) * 1.5 * (1 - lin(t, viento + 0.7, viento + 1.3))) : 0, mx = Math.round(lerp(250, 232, acerca)) + sacudo;
  molinillo(mx - 11, 76, gira + 0.3);
  T.mano(R, mx, 106, -1, AZUL);
  if (t > viento + 0.1 && t < viento + 0.6) for (const [dx, dy] of [[-16, -8], [14, -12], [16, 6]]) pset(mx - 11 + dx, 76 + dy, C.blanco);
};
const efectos = [[motorT, 'cerrojo'], [corre, 'motor'], [calorT, 'vapor'], [noaa - 0.3, 'tecleo'], [estima + 0.2, 'bip'],
  [M2 + 0.1, 'zumbido'], [libera, 'tic'], [libera + 0.3, 'tic'], [lluviaT - 0.2, 'lluvia'], [lluviaT + 0.5, 'papel'], [c150, 'pop'], [c150 + 0.08, 'boing'], [c150 + 0.1, 'vapor'],
  [M3 + 0.05, 'brillo'], ...sale.slice(2).map((s) => [s + 0.05, 'pop']), [planeta + 0.2, 'motor'],
  [M4 + 0.05, 'motor'], [M4 + 0.6, 'vapor'], [diminuta, 'whoosh'], [viento, 'tic'], [viento + 0.25, 'tic']];
T.rodar(E, R, [[0, p1], [M2, p2], [M3, p3], [M4, p4]], { efectos });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-giro'] = ('El giro', '''// HU-GIRO (frase 9), sin año: de dónde sale el giro. Cuatro planos:
// 1. la Tierra desde la órbita baja, con el borde curvo sobre el Atlántico tropical, que gira: en «the Earth itself» la
//    atmósfera se enciende a lo largo del borde y en «our planet turns» una flecha dorada recorre el borde hacia el este
//    y se queda corriendo; pasan un satélite y una estrella fugaz;
// 2. (corta en «The air») el planeta entero: en «rushing toward the center» cuatro flechas de aire corren hacia una baja del
//    Atlántico y en «gets bent to one side» se tuercen a su derecha (el camino recto queda punteado);
// 3. (corta en «hurricanes») un huracán desde arriba que gira despacio: en «counterclockwise» una flecha dorada le da la
//    vuelta al revés que las agujas del reloj y se queda girando con él, mientras sus bandas giran;
// 4. (corta en «form») el planeta otra vez: la espiral en su sitio, y en «right on the equator» la franja del ecuador con
//    los huracanes tachados; en «where that push disappears» aparecen las flechitas del empujón, largas lejos del ecuador
//    y cada vez más cortas al acercarse, y la del ecuador se apaga.''', r'''
''' + COMUN + r'''
const g = (f) => en('giro', f);
// los cortes: «The air», «hurricanes», «form»
const G2 = g(0.249), G3 = g(0.504), G4 = g(0.795);
const tierraT = g(0.059), propia = g(0.074), planetaT = g(0.166), gira = g(0.185), aire = g(0.256), centro = g(0.329), tuerce = g(0.371), lado = g(0.415), norte = g(0.561), antih = g(0.628), antihFin = g(0.680), ecuador = g(0.858), empuje = g(0.915), desaparece = g(0.946);
const ORO = hex('#ffd040'), OROS = hex('#a8700a'), OROL = hex('#fff2a0');
// una flecha gruesa dorada a lo largo de un camino de puntos [[x, y], …] (u: cuánto se ha dibujado), con su punta
const flechaCamino = (P, u, fase = 0) => {
  const n = Math.max(2, Math.round(P.length * u)); if (u <= 0) return;
  for (let i = 1; i < n; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; for (const [ox, oy] of [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1]]) R.linea(Math.round(x0) + ox, Math.round(y0) + oy, Math.round(x1) + ox, Math.round(y1) + oy, OROS); }
  for (let i = 1; i < n; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), ((i + Math.floor(fase)) % 6) < 2 ? OROL : ORO); }
  const [xa, ya] = P[n - 2], [xb, yb] = P[n - 1], a = Math.atan2(yb - ya, xb - xa);
  const pts = [[xb + Math.cos(a) * 6, yb + Math.sin(a) * 6], [xb + Math.cos(a + 2.3) * 6, yb + Math.sin(a + 2.3) * 6], [xb + Math.cos(a - 2.3) * 6, yb + Math.sin(a - 2.3) * 6]].map(([x, y]) => [Math.round(x), Math.round(y)]);
  R.poligono(pts.map(([x, y]) => [x + 1, y + 1]), OROS); R.poligono(pts, ORO); R.pset(pts[0][0] - Math.round(Math.cos(a) * 2), pts[0][1] - Math.round(Math.sin(a) * 2), OROL);
};

// ── 1 · el planeta gira ───────────────────────────────────────────────────────────────────────────────────────────
const BORDE = Array.from({ length: 60 }, (_, i) => { const th = -0.4 + i / 59 * 0.8; return [150 + 340 * Math.sin(th), 404 - 340 * Math.cos(th)]; });
const p1 = (t) => {
  T.orbita(R, t, { encuadre: 'cerca', mira: [16, -50], vel: 3.2, t0: 0, tiros: false });
  // «the Earth itself»: la atmósfera se enciende a lo largo del borde
  { const k = lin(t, tierraT - 0.25, tierraT + 0.25) * (1 - lin(t, propia + 0.4, gira + 0.3)); if (k > 0) for (let x = 0; x < 320; x++) { const yb = 404 - Math.sqrt(324 * 324 - (x - 150) ** 2); for (let d = -2; d <= 9; d++) { const y = Math.round(yb - d); if (!tranquilo(x, y) && umbral(x, y) < k * (1 - Math.abs(d - 2) / 8)) tine(x, y, hex('#a8e0ff'), 0.7); } } }
  // «our planet turns»: la flecha dorada recorre el borde hacia el este y se queda corriendo
  flechaCamino(BORDE, suave(lin(t, planetaT - 0.2, gira + 0.3)), t * 8);
  if (entre(t, gira + 0.2, gira + 0.7)) { const [x, y] = BORDE[59]; destello(Math.round(x) + 4, Math.round(y) + 2, 4, OROL); }
};

// ── 2 · el aire se tuerce ─────────────────────────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const gg = 0.17 + 0.46 * suave(lin(t, aire - 0.15, lado + 0.1)) + 0.03 * lin(t, lado, G3);
  T.orbita(R, t, { lat: 12, lon: -62, giro: gg, tiros: false });
};

// ── 3 · al revés que las agujas del reloj ─────────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  T.ojo(R, t, { vista: 'arriba', zoom: 1.35, centro: [150, 96], giro: 0.24 });
  const u = suave(lin(t, antih - 0.35, antihFin + 0.15)), giroF = (t - antihFin) * 0.24 * Math.max(0, Math.sign(t - antihFin));
  const P = Array.from({ length: 70 }, (_, i) => { const th = 0.25 + i / 69 * 5.0 + giroF; return [150 + Math.cos(th) * 74, 96 - Math.sin(th) * 56]; });
  flechaCamino(P, u, t * 8);
  // «in the North»: el norte arriba, con su flechita (el símbolo, sin letras)
  { const k = lin(t, norte - 0.2, norte + 0.2); if (k > 0) { const x = 30, y = 150; R.disco(x, y, 9, C.k); R.disco(x, y, 8, hex('#1e2a48')); R.poligono([[x, y - 7], [x - 3, y + 1], [x + 3, y + 1]], ORO); R.poligono([[x, y + 7], [x - 3, y + 1], [x + 3, y + 1]], hex('#8a94b0')); R.pset(x, y + 1, C.blanco); if (k < 1) destello(x, y - 9, 3, OROL); } }
};

// ── 4 · el ecuador, sin huracanes ─────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const gg = 0.72 + 0.12 * lin(t, G4, ecuador + 0.1) + 0.16 * lin(t, ecuador + 0.1, desaparece + 0.4);
  const { P } = T.orbita(R, t, { lat: 12, lon: -62, giro: gg, tiros: false });
  // «where that push disappears»: las flechitas del empujón, más cortas cuanto más cerca del ecuador; la del ecuador se apaga
  const k = lin(t, empuje - 0.3, empuje + 0.2), apaga = lin(t, desaparece, desaparece + 0.5);
  if (k > 0) for (const lat of [32, 22, 13, 6, 0]) { const p = P([lat, -27]); if (!p[2]) continue; const L = Math.round(14 * Math.sin(lat * Math.PI / 180) / Math.sin(32 * Math.PI / 180) * suave(k)), x = Math.round(p[0]), y = Math.round(p[1]);
    if (lat === 0) { if (apaga < 1 && Math.floor(t * 10) % 2 === 0) { R.disco(x, y, 2, C.k); R.disco(x, y, 1, hex('#ff8a3a')); } continue; }
    R.rect(x - 1, y - 1, x + L + 1, y + 1, C.k); R.rect(x, y, x + L, y, hex('#ff9a3a')); R.poligono([[x + L + 4, y], [x + L, y - 3], [x + L, y + 3]], hex('#ff9a3a')); R.pset(x + L + 1, y, hex('#ffd0a0')); }
};
const efectos = [[0.3, 'zumbido'], [tierraT, 'brillo'], [planetaT, 'whoosh'], [gira + 0.3, 'brillo'],
  [aire, 'rafaga'], [tuerce, 'whoosh'], [lado, 'whoosh'],
  [G3 + 0.05, 'rafaga'], [norte, 'tic'], [antih - 0.3, 'whoosh'], [antihFin, 'brillo'], [antihFin + 0.8, 'rafaga'],
  [G4 + 0.1, 'zumbido'], [ecuador, 'pop'], [ecuador + 0.4, 'pop'], [empuje, 'tic'], [desaparece + 0.1, 'pop']];
T.rodar(E, R, [[0, p1], [G2, p2], [G3, p3], [G4, p4]], { efectos });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-ojo'] = ('El ojo', '''// HU-OJO (frases 10–11): por qué el ojo está en calma, y el gag del lavabo. Cinco planos:
// 1. 1943, dentro del ojo sobre Texas: la avioneta de Duckworth cruza en calma; en «calm» corre la cubierta de la cabina
//    para ver el cielo y en «explanation» al navegante le sale un «?»; abajo pasa el tren y los pájaros dan vueltas;
// 2. (corta en «racing») el corte del huracán, sin año: el aire del mar entra por abajo, sube en espiral por las paredes
//    («racing up the walls»), sale por arriba y una parte se desvía hacia dentro («turns inward»); en «sinks down the
//    middle» baja por el centro, y en «warming and drying» pasa del azul al naranja y al rojo mientras sube el termómetro
//    y se secan las nubecillas; abajo, en la calma, la avioneta pequeña vuela tranquila;
// 3. (corta en «So») el ojo desde arriba, de cerca: el pozo de calma y, alrededor, los vientos más fuertes, rayas que
//    corren en círculo cada vez más deprisa («strongest winds»); dentro, una gaviota da vueltas y en «quiet» planea sin
//    batir las alas;
// 4. (corta en «By the way») el baño de casa: el niño llega al lavabo, se sube al taburete y en «sink» echa su patito al
//    agua; en «far too small» tira de la cadenilla del tapón (gluglú) y se asoma a mirar; el gato lo mira desde el cesto;
// 5. (corta en «So whichever way») el lavabo de cerca, el gag: la mano deja el tapón en la encimera; el patito da vueltas
//    con el remolino a favor de las agujas del reloj y en «whichever way» frena, se da la vuelta y gira al revés; en «Don't
//    blame the Earth» el agua se acaba, el patito se queda mareado en el desagüe con sus estrellitas y al gato le sale un
//    «?». Atom no se mueve de su sitio.''', r'''
''' + COMUN + r'''
const c = (f) => en('calma', f), l = (f) => en('lavabo', f);
// los cortes: «racing», «So (the eye)», «By (the way)», «So (whichever)»
const O2 = c(0.263), O3 = c(0.699), O4 = l(0) - 0.15, O5 = l(0.555);
const calmaT = c(0.013), explica = c(0.107), sube = c(0.293), paredes = c(0.320), tormenta = c(0.365), giraT = c(0.385), dentro = c(0.410), baja = c(0.473), medio = c(0.526), calienta = c(0.570), seca = c(0.602), cae = c(0.642), ojoT = c(0.716), columna = c(0.762), quieto = c(0.816), rodeado = c(0.841), fuertes = c(0.908), vientos = c(0.938);
const banoT = l(0.158), pila = l(0.208), pequeno = l(0.358), sentir = l(0.433), giroT = l(0.494), cualquier = l(0.627), lado = l(0.662), vacia = l(0.726), culpa = l(0.855), tierra = l(0.938);
// a ritmo lineal entre puntos [t, valor]
const tramos = (t, P) => { if (t <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) if (t <= P[i][0]) return lerp(P[i - 1][1], P[i][1], (t - P[i - 1][0]) / (P[i][0] - P[i - 1][0])); return P[P.length - 1][1]; };

// ── 1 · la calma que encontró Duckworth ───────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.ojo(R, t + 2.6, { vista: 'dentro', suelo: 'texas' });   // (+2,6 s: el fucilazo del decorado, un rectángulo claro, cae fuera del plano)
  const x = Math.round(lerp(70, 206, t / O2)), y = 96 + Math.round(Math.sin(t * 1.3) * 2);
  const r = T.at6(R, x, y, t, { s: 1.6, dir: 1, vuelo: true, helice: 1, piloto: EL.duckworth, copiloto: EL.navegante, abierta: t > calmaT + 0.3, sacude: 0.05 });
  if (t > explica && t < O2) R.bocadillo(r.cabina[0] - 12, r.cabina[1] - 13, { icono: '?' });
};

// ── 2 · el corte: por dónde sube y por dónde baja el aire ─────────────────────────────────────────────────────────
const corteU = (t) => tramos(t, [[O2 - 0.3, 0], [sube, 0.16], [tormenta, 0.4], [dentro + 0.25, 0.6], [baja, 0.64], [medio + 0.15, 0.76], [cae + 0.25, 0.9], [O3, 0.97]]);
const p2 = (t) => {
  T.ojo(R, t, { vista: 'corte', corte: corteU(t) });
  const u = lin(t, O2, O3), x = Math.round(lerp(124, 143, u)), y = 140 + Math.round(Math.sin(t * 1.6) * 1 + (t > medio && t < cae ? Math.sin(t * 9) * 0.6 : 0));
  T.at6(R, x, y, t, { s: 0.5, dir: 1, vuelo: true, helice: 1 });
};

// ── 3 · una columna de calma rodeada de los vientos más fuertes ───────────────────────────────────────────────────
const ZOOM = 4.2, CEN = [156, 96];
const p3 = (t) => {
  T.ojo(R, t, { vista: 'arriba', zoom: ZOOM, centro: CEN, giro: 0.1 });
  const G = T.b_ojoArribaGeo({ zoom: ZOOM, centro: CEN });
  // los vientos de la pared: rayas blancas que corren en círculo al revés que las agujas del reloj, cada vez más deprisa
  const k = 0.3 + 0.7 * suave(lin(t, rodeado - 0.2, vientos + 0.2));
  for (let i = 0; i < Math.round(14 + 30 * k); i++) { const rr = G.r * (1.2 + ruido(i, 1, 63) * 1.1), w = (1.4 + ruido(i, 2, 63) * 1.2) * (0.6 + 1.2 * k), th0 = ruido(i, 3, 63) * 6.283 + t * w, L = 0.25 + ruido(i, 4, 63) * 0.35;
    for (let q = 0; q <= 1; q += 0.025) { const th = th0 - q * L, x = Math.round(G.x + Math.cos(th) * rr), y = Math.round(G.y - Math.sin(th) * rr * 0.92); if (tranquilo(x, y) || umbral(x, y) > (1 - q * 0.8) * (0.6 + 0.4 * k)) continue; tine(x, y, q < 0.12 ? C.blanco : hex('#4a64a8'), q < 0.12 ? 0.9 : 0.55); tine(x, y + 1, hex('#2a3a78'), 0.3 * (1 - q)); } }
  // la gaviota que da vueltas dentro del ojo; en «quiet», planea
  const a = t * 0.55 + 1, gx = G.x + Math.cos(a) * G.r * 0.42, gy = G.y - Math.sin(a) * G.r * 0.38, planea = t > quieto - 0.1;
  gaviotaVuela(gx, gy, planea ? 0.06 : t, Math.sin(a) > 0 ? -1 : 1);
};

// ── 4 · el baño: el niño, su patito y el tapón ────────────────────────────────────────────────────────────────────
const taburete = (x, y) => { const { rect } = R, M = hex('#c8864a'), MS = hex('#8a5a2a'), ML = hex('#e8a868'); rect(x, y, x + 22, y + 3, C.k); rect(x + 1, y + 1, x + 21, y + 2, M); rect(x + 1, y + 1, x + 21, y + 1, ML); for (const lx of [x + 2, x + 17]) { rect(lx, y + 4, lx + 3, y + 14, C.k); rect(lx + 1, y + 4, lx + 2, y + 13, MS); } rect(x + 5, y + 9, x + 17, y + 10, C.k); rect(x + 5, y + 9, x + 17, y + 9, MS); };
const patito = (x, y, dir = 1) => { const { rect, pset } = R, A = hex('#f8d030'), AS = hex('#c89a18'), N = hex('#f07a2a'); rect(x - 4, y - 3, x + 3, y, C.k); rect(x - 3, y - 2, x + 2, y - 1, A); rect(x - 3, y - 1, x + 2, y - 1, AS); rect(x - 1 + dir, y - 6, x + 2 * dir + (dir > 0 ? 0 : 1), y - 3, C.k); rect(x + dir, y - 5, x + dir + (dir > 0 ? 1 : 0), y - 4, A); pset(x + dir * 2, y - 5, C.k); pset(x + dir * 3, y - 4, N); pset(x + dir * 4, y - 4, N); };
const PX = 150, SUB = [O4 + 0.75, O4 + 1.05];
const p4 = (t) => {
  T.lavabo(R, t, { encuadre: 'bano' });
  taburete(146, 148);
  // el niño llega, se sube al taburete, echa el patito, tira de la cadenilla y se asoma a mirar
  const anda = lin(t, O4, SUB[0]), sube = lin(t, SUB[0], SUB[1]), x = Math.round(lerp(96, PX, anda)), suelo = Math.round(sube > 0 ? lerp(160, 148, suave(sube)) - Math.sin(sube * Math.PI) * 4 : 160);
  const echa = entre(t, pila - 0.3, pila + 0.35), tira = entre(t, pequeno - 0.1, pequeno + 0.45), mira = t > sentir;
  const r = R.actor(EL.chico, x, suelo + (tira && Math.floor(t * 8) % 2 ? 1 : 0), t, { dir: 1, anda: anda > 0 && anda < 1, dedo: echa || tira || (!mira && t < pila - 0.3), sonrisa: t < pila || mira, sorpresa: entre(t, pequeno + 0.45, sentir) });
  // el patito: en la mano hasta «sink», luego cae al lavabo con su salpicadura
  if (t < pila) { const [hx, hy] = t < pila - 0.3 && anda < 1 ? [x + 15, suelo - 13] : r.mano; patito(hx + 1, hy + (t < pila - 0.3 && anda < 1 ? 4 : 0), 1); }
  else if (t < pila + 0.3) { const u = lin(t, pila, pila + 0.3); patito(Math.round(lerp(r.mano[0] + 1, 168, u)), Math.round(lerp(r.mano[1], 127, u) - Math.sin(u * Math.PI) * 4), 1); }
  else if (t < pila + 0.8) for (let i = 0; i < 6; i++) { const u = lin(t, pila + 0.3, pila + 0.8), an = -Math.PI / 2 + (i - 2.5) * 0.4; R.pset(Math.round(168 + Math.cos(an) * u * 9), Math.round(125 + Math.sin(an) * u * 8 + u * u * 8), hex('#bfe6fb')); }
  // la cadenilla del tapón y las burbujas del desagüe
  if (t > pequeno - 0.1) { const u = lin(t, pequeno - 0.1, pequeno + 0.4); for (let i = 0; i < 6; i++) R.pset(Math.round(lerp(r.mano[0], 170, i / 5)), Math.round(lerp(r.mano[1] + 2, 128, i / 5) + Math.sin(i + u * 6)), (i % 2) ? hex('#c8d0dc') : hex('#8a94a6')); }
  if (t > pequeno + 0.3) for (let k = 0; k < 6; k++) { const u = (t * 1.4 + k / 6) % 1, bx = 160 + Math.round(Math.sin(k * 2.3 + t * 2) * 7), by = Math.round(126 - u * 12); if (u < 0.8) { R.pset(bx, by, C.blanco); if (k % 2) R.pset(bx + 1, by, hex('#bfe6fb')); } }
};

// ── 5 · el lavabo de cerca: el patito y el remolino ───────────────────────────────────────────────────────────────
// el patito gira con el remolino: a favor de las agujas del reloj, frena en «whichever way», se da la vuelta y gira al revés;
// al final del agua se para en el desagüe
const vel = (t) => { const f = suave(lin(t, lado - 0.2, lado + 0.45)), para = 1 - suave(lin(t, culpa, tierra + 0.2)); return (-1.65 + 3.3 * f) * para * (1 + 0.8 * lin(t, vacia, culpa)); };
const angulo = (t) => { let a = 1.2 - 1.65 * O5 * 2.2 * 0.75 / 2.2 / 0.75 * 0; for (let s = O5; s < t; s += 1 / 60) a += vel(s) / 60; return a + 2.4; };
const p5 = (t) => {
  const flip = lin(t, lado - 0.2, lado + 0.45), agua = 0.85 - 0.77 * suave(lin(t, vacia - 0.1, culpa + 0.25)), ang = angulo(t);
  T.lavabo(R, t, { giro: flip < 0.5 ? -1 : 1, agua, angulo: ang });
  // la mano deja el tapón con su cadenilla en la encimera y se va
  const deja = lin(t, O5, O5 + 0.35), va = lin(t, O5 + 0.45, O5 + 1.0);
  { const tx = 232, ty = 126; R.disco(tx, ty, 3, C.k); R.disco(tx, ty, 2, hex('#3a3a46')); R.pset(tx - 1, ty - 1, hex('#6a6a7a')); for (let i = 1; i < 9; i++) R.pset(tx - i * 2, ty + 1 + Math.round(Math.sin(i * 0.9) * 1), i % 2 ? hex('#c8d0dc') : hex('#8a94a6')); }
  if (va < 1) T.mano(R, Math.round(lerp(240, 344, suave(va))), 130 - Math.round((1 - deja) * 4), -1, '#e86a3a');
  // el patito mareado en el desagüe, con sus estrellitas, y el «?» del gato
  const rx = 50 * (0.35 + 0.65 * agua), ry = 14.5 * (0.35 + 0.65 * agua), ra = 0.3 + 0.32 * agua, px = Math.round(160 + Math.cos(ang) * rx * ra), py = Math.round(112 - Math.sin(ang) * ry * ra);
  if (t > culpa) for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.094, sx = Math.round(px + Math.cos(a) * 8), sy = Math.round(py - 17 + Math.sin(a) * 2.5); destello(sx, sy, 1, hex('#ffd040')); R.pset(sx, sy, C.blanco); }
  if (entre(t, lado, lado + 0.5)) for (let i = 0; i < 3; i++) R.pset(px - 6 + i * 6, py - 18 - (i % 2) * 2, C.blanco);
  if (t > tierra - 0.1) R.bocadillo(291, 92, { icono: '?' });
};
const efectos = [[0.15, 'motor'], [calmaT + 0.3, 'cerrojo'], [explica + 0.05, 'pop'], [2.9, 'whoosh'],
  [O2 + 0.1, 'rafaga'], [paredes, 'whoosh'], [dentro, 'whoosh'], [baja, 'whoosh'], [calienta, 'brillo'], [cae, 'vapor'],
  [O3 + 0.1, 'rafaga'], [quieto, 'brillo'], [fuertes, 'rafaga'], [vientos + 0.3, 'rafaga'],
  [O4 + 0.3, 'golpecito'], [SUB[1], 'golpecito'], [pila + 0.3, 'chof'], [pequeno, 'cerrojo'], [pequeno + 0.35, 'gluglu'], [sentir + 0.3, 'burbujas'],
  [O5 + 0.3, 'toc'], [O5 + 0.55, 'gluglu'], [lado, 'boing'], [vacia, 'gluglu'], [culpa, 'gluglu'], [culpa + 0.4, 'boing'], [tierra, 'miau']];
const año = (t) => (t < O2 ? 1943 : null);
T.rodar(E, R, [[0, p1], [O2, p2], [O3, p3], [O4, p4], [O5, p5]], { efectos, año });
''')
