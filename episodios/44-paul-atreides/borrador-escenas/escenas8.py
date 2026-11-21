E = {}
# Marcas reales de la voz (marcas-ep44.json, pa-cierre): [inicio, fin] de cada frase, en segundos de la escena
M_ = {'huellas': (0.5, 12.81), 'parte3': (13.21, 30.166), 'pregunta': (30.616, 41.452)}

# Los instantes de la voz inglesa (linea.json, palabras.en menos el inicio de la escena), en segundos de la escena
INST = [
    # frase 39 · huellas
    ('VIENTO', 'huellas', 1.72), ('BORRA', 'huellas', 1.94), ('HUELLAS', 'huellas', 2.70),
    ('P2', 'huellas', 3.70), ('ALIA', 'huellas', 4.94), ('GOBIERNA', 'huellas', 6.22), ('DUNCAN', 'huellas', 7.06),
    ('LADO', 'huellas', 7.66), ('P3', 'huellas', 8.62), ('BEBES', 'huellas', 9.08), ('LIBROS', 'huellas', 10.20),
    ('SIGUEN', 'huellas', 10.68), ('CAMBIARAN', 'huellas', 11.24), ('DESTINO', 'huellas', 11.86), ('HUMANIDAD', 'huellas', 12.20),
    # frase 40 · parte3
    ('P4', 'parte3', 13.10), ('DUNE', 'parte3', 13.21), ('TRES', 'parte3', 14.21), ('CAMBIA', 'parte3', 15.03),
    ('TRAILERS', 'parte3', 16.51), ('P5', 'parte3', 17.80), ('DIECISIETE', 'parte3', 18.33), ('SALTO', 'parte3', 19.07),
    ('CHANI', 'parte3', 19.75), ('CONTRA', 'parte3', 21.03), ('P6', 'parte3', 22.20), ('PREGUNTA', 'parte3', 22.89),
    ('SIGUE', 'parte3', 23.65), ('INCOMODA', 'parte3', 24.81), ('GUSANO', 'parte3', 26.11), ('P7', 'parte3', 26.90),
    ('SEGUIR', 'parte3', 28.07), ('SIN', 'parte3', 28.43), ('PREGUNTAS', 'parte3', 29.41),
    # frase 41 · pregunta
    ('P8', 'pregunta', 30.55), ('PREGUNTO', 'pregunta', 31.20), ('FUTURO', 'pregunta', 33.10), ('CAMINO', 'pregunta', 33.86),
    ('MALO', 'pregunta', 34.44), ('ELIGES', 'pregunta', 35.52), ('MENOS', 'pregunta', 35.90), ('P9', 'pregunta', 37.00),
    ('COMOPAUL', 'pregunta', 37.26), ('NEGARTE', 'pregunta', 38.60), ('LEO', 'pregunta', 40.32), ('COMENT', 'pregunta', 40.72),
]


def F(k, s):
    a, b = M_[k]
    return f"en('{k}', {(s - a) / (b - a):.4f})"


CONSTS = ''.join(f'const {n} = {F(k, s)};\n' for n, k, s in INST)

COMENTARIO = '''// PA-CIERRE (frases 39–41). Año 12 en los tres planos de la historia; desde el cine, sin año. Nueve planos:
// 1. fondo propio, las huellas al anochecer (hora azul): las huellas de Paul suben en perspectiva hasta la cresta, por
//    donde su silueta diminuta se pierde; en «wind» se levanta el viento y en «erases» la arena tapa las huellas de
//    cerca a lejos; Atom (luciérnaga) suelta su grano azul, que el viento se lleva hasta quedar como una estrella azul
//    junto a la luna (cierra el hilo); un ratón saltarín cruza; corta en «in Arrakeen»;
// 2. la ciudadela desde la plaza (balcon/multitud): Alia sale al balcón y en «rule» alza los brazos y la plaza aclama;
//    en «Duncan» él sale y se pone a su lado; se miran; corta en «with the two babies»;
// 3. fondo propio, la alcoba de las cunas (el rincón de la cuna vacía de pa-emperador, ahora de noche y con dos cunas):
//    Alia entra y mece una cuna en «babies», Duncan mece la otra; en «books» brillan los dos libros del estante junto a
//    Atom; en «fate of humanity» suben de las cunas chispas doradas que se abren por el techo como estrellas;
//    (vida: dos polillas dan vueltas a la lámpara de aceite)
// 4. la fachada del cine en 2026, con nieve (du-comun salas 'sala'): en «Dune» se encienden las lunas de la
//    marquesina una a una hasta tres en «Part 3»; Atom llega por la acera, las señala y en «change things» alza los
//    brazos; se pone a la cola;
// 5. dentro, desde las butacas (du-comun salas 'butacas'): en la pantalla, el tráiler: los soles y las lunas pasan cada
//    vez más deprisa (arrancan tras el fundido) y el contador, en 0 desde el principio, sube hasta 17 en «17-year jump»; un destello y Paul y Chani en la duna; en «turned
//    against» Chani se enfada y le señala, Paul se sorprende; Atom (luciérnaga) en el patio se asusta; el destello y el rojo
//    alumbran al público, las palomitas de un cubo saltan del susto y el polvo flota en el haz del proyector;
// 6. el llano de día (planeta desierto, otra luz: tarde): Atom luciérnaga llega y mira el horizonte; en «question» le
//    sale un «?»; la loma enorme cruza el llano y en «sandworm» se hincha y levanta arena; Atom se echa atrás; un ratón
//    llega a saltos, se sienta a mirar y huye a su madriguera; dos aves carroñeras dan vueltas y se van en «sandworm»;
//    un remolino de arena cruza el llano y se deshace cuando la loma se hincha;
// 7. fondo propio, la procesión a contraluz: una fila de siluetas sigue un estandarte por la cresta delante del sol
//    enorme; Atom, abajo, echa a andar detrás de ellas; en
//    «keep following» se para y las señala, en «without asking» abre los brazos, sorprendido, y en «questions» se queda
//    pensando, con un «?»;
// 8. el estudio de Atom (estudio general, de noche): Atom entra, en «asking you» saluda a cámara; en «see the future» la
//    tiza dibuja los caminos en la pizarra; un trocito de tiza va dibujando con su polvillo; en «every path was bad» les pone una X roja a todos; en «least bad» rodea
//    uno de amarillo y lo señala;
// 9. inserto propio, la mesa de Atom de noche (la taza humea a la izquierda): en el portátil, Paul, con su venda, echa a
//    andar por su camino en «like Paul» y se para cabizbajo; la X se enciende en «refuse to choose»;
//    en «comments» salen los comentarios de la pantalla, Atom mira a cámara y los señala, sonriendo.'''

CUERPO = r'''
import { salas, salasDelante } from '/atomo/plato/escenas/du-comun.js';
const AT = T.AT, PA = T.PA, K = T.C.k, ri = Math.round;
@CONSTS@const FIN = 41.70;
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
const voz = (t) => (E.energia ? E.energia(t) : 0);
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const fijo = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } R.copiar(FIJOS[k]); };
const dentro = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180;
const sombrea = (x, y, a) => { if (dentro(x, y)) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const aclara = (x, y, c, a) => { if (dentro(x, y)) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// EL GRANO DE ESPECIA AZUL (el hilo, igual que en pa-caladan): núcleo de 3 px con su filo oscuro, brillo que late y destello
const AZ = pal(['#141e4a', '#2a4ab0', '#5a8ae8', '#a8ccff', '#f0f8ff']);
const grano = (x, y, t, s = 1) => { const X = ri(x), Y = ri(y);
  R.halo(X, Y, (5.5 + Math.sin(t * 6) * 1.2) * s, [AZ[1], AZ[2], AZ[3]], 1.15);
  R.rect(X - 1, Y - 2, X + 1, Y + 2, AZ[0]); R.rect(X - 2, Y - 1, X + 2, Y + 1, AZ[0]); R.rect(X - 1, Y - 1, X + 1, Y + 1, AZ[3]); R.pset(X, Y, AZ[4]);
  if (Math.sin(t * 9) > 0.2) { R.pset(X, Y - 3, AZ[4]); R.pset(X + 3, Y, AZ[3]); R.pset(X - 3, Y, AZ[3]); } };
const lucie = (x, y, t, o = {}) => { AT.luciernaga(R, x, y, t, o); if (o.grano) { const a = t * 2.4; grano(x + Math.cos(a) * 12, y + Math.sin(a) * 4, t, 0.7); } };
// nubes de tres tonos a tres velocidades, fuera de la esquina de Atom
const nubes = (t, n, y0, dy, cols, vel = 1, k0 = 0) => {
  for (let k = 0; k < n; k++) { const capa = k % 3, v = (1.5 + capa * 2.2) * vel, w = 24 + (k * 13 + k0) % 34, x0 = ((k * 83 + k0 * 7 + t * v) % 400) - 50, y = y0 + capa * dy + ((k * 7 + k0) % 9);
    for (let i = 0; i < w; i++) { const x = ri(x0 + i), hh = ri(1 + Math.sin(i / w * Math.PI) * (2 + capa)); if (x < 0 || x > 319 || (x > 272 && y < 50)) continue;
      for (let j = 0; j < hh; j++) R.pset(x, y - j, j === hh - 1 ? cols[2] : cols[capa === 2 ? 1 : 0]); if (b4(x, y + 1) < 0.4) R.pset(x, y + 1, cols[0]); } }
};
// un bocadillo grande con su símbolo (icono al doble), con la colita hacia abajo a la izquierda
const bocata = (x, y, ic, col = '#2a2a3a') => { const X = ri(x), Y = ri(y); R.rect(X - 1, Y - 1, X + 15, Y + 17, K); R.rect(X, Y, X + 14, Y + 16, hex('#f8f4ea')); R.rect(X, Y + 14, X + 14, Y + 16, hex('#d8d0c0'));
  R.poligono([[X + 2, Y + 17], [X + 7, Y + 17], [X + 1, Y + 22]], K); R.poligono([[X + 3, Y + 17], [X + 6, Y + 17], [X + 2, Y + 20]], hex('#d8d0c0')); R.icono(ic, X + 2, Y + 2, hex(col), hex('#c8c0b0'), 2); };
// un ratón saltarín del desierto (el del gag 2): cuerpo canela, orejas, cola larga con borla
const raton = (x, y, t, dir = 1) => { const X = ri(x), Y = ri(y), C1 = hex('#c89a62'), C2 = hex('#8a6038');
  R.rect(X - 2, Y - 3, X + 2, Y - 1, K); R.rect(X - 1, Y - 3, X + 1, Y - 2, C1); R.pset(X + 2 * dir, Y - 4, C2); R.pset(X + dir, Y - 5, C1); R.pset(X + 3 * dir, Y - 2, K);
  R.linea(X - 2 * dir, Y - 2, X - 7 * dir, Y - 4 + ri(Math.sin(t * 8)), C2); R.pset(X - 8 * dir, Y - 5 + ri(Math.sin(t * 8)), hex('#f0e0c0')); R.pset(X, Y, C2); };

// ═══ 1 · fondo propio: las huellas al anochecer ═══
const CIELO1 = pal(['#141230', '#1e1a3e', '#2e2650', '#46355e', '#6a4368', '#965070', '#c0687a', '#e08e80', '#f4b490']);
const DUNA1 = pal(['#2e1c2c', '#4a2c3a', '#6a3e46', '#8a5450', '#a86c5a', '#c48866', '#dca476', '#eec08c']);
const LEJOS1 = pal(['#4a3048', '#5e3a52', '#7a4a5a', '#965a60', '#ae6e66']);
const ROCA1 = pal(['#160c14', '#24161e', '#38222a', '#4e3034', '#6a423e', '#8a5a4c']);
const HZ1 = 80;
const yC1 = (x) => 99 + (x < 198 ? ((198 - x) / 198) ** 2 * 30 : ((x - 198) / 122) ** 2 * 15) + Math.sin(x * 0.09) * 0.8;
const yRoca1 = (x) => 120 + (x * 0.04) ** 2 * 3 + Math.sin(x * 0.4) * 1.5 + (h2(x >> 2, 3) > 0.7 ? 1 : 0);
const fondo1 = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    const yc = yC1(x);
    if (y < HZ1) { const g = Math.max(0, 1 - Math.hypot(x - 64, (y - HZ1) * 2.2) / 150);
      c = rmp(CIELO1, (y / HZ1) ** 1.25 * 6.3 + g * 2.2 + (ns(x * 0.02, y * 0.12) - 0.5) * 0.5, x, y);
      if (y < 52 && h2(x, y, 5) > 0.992 && !(x > 274 && y < 48)) c = h2(x, y, 6) > 0.5 ? hex('#e8e0ff') : hex('#9a90c0'); }
    else if (y < yc) { // dunas lejanas en dos términos, frías
      const yA = HZ1 + 4 + 3 * Math.sin(x * 0.03) + 2 * Math.sin(x * 0.09), yB = HZ1 + 11 + 5 * Math.sin(x * 0.021 + 2) + 2 * Math.sin(x * 0.07);
      if (y > yB) c = rmp(LEJOS1, 2.2 + Math.sin(x * 0.05 - y * 0.2) * 0.9 + (x < 140 ? 0.6 : 0) - (y - yB) * 0.03, x, y);
      else if (y > yA) c = rmp(LEJOS1, 1.4 + Math.sin(x * 0.04 - y * 0.1) * 0.7 + (x < 120 ? 0.5 : 0), x, y);
      else c = rmp(LEJOS1, 0.5 + Math.sin(x * 0.06) * 0.4, x, y);
    } else { // la cara de la duna grande: rizaduras, vetas de especia apagadas y la luz que queda por la izquierda
      const p = y - yc, rz = Math.sin(p * 0.8 + x * 0.045 + ns(x * 0.05, y * 0.05) * 5);
      let v = 5.2 - p * 0.03 + rz * 0.6 + (ns(x * 0.25, y * 0.25) - 0.5) * 0.6 + (198 - x) * 0.004;
      if (p < 2) v = 7; else if (p < 4) v += 0.8;
      c = rmp(DUNA1, v, x, y);
      if (ns(x * 0.04, y * 0.09) > 0.68 && b4(x, y) < 0.4) c = mez(c, hex('#a84a2a'), 0.35);
    }
    R.pset(x, y, c);
  }
  // las mesetas del horizonte, con el filo encendido por el ocaso
  for (let x = 0; x < 320; x++) { const m = (x > 14 && x < 86) ? 7 + (x > 30 && x < 70 ? 3 : 0) : (x > 238 && x < 300) ? 5 : (x > 150 && x < 176) ? 3 : 0; if (!m) continue;
    const top = HZ1 + 3 - m - (h2(x >> 2, 1) > 0.7 ? 1 : 0); for (let y = top; y < HZ1 + 4; y++) R.pset(x, y, y === top ? hex('#a0607a') : y < top + 2 ? hex('#5a3a56') : hex('#3e2a46')); }
  // la luna grande que sale, pálida, con sus mares; la pequeña, alta
  R.halo(232, 60, 18, [hex('#4a3a66'), hex('#6a5480'), hex('#8a7098')], 0.9);
  R.disco(232, 60, 11, hex('#d8cce0')); for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i, j); if (d > 11) continue; if (i + j > 4) R.pset(232 + i, 60 + j, hex('#b0a2c0')); if (ns((232 + i) * 0.3, (60 + j) * 0.3) > 0.66) R.pset(232 + i, 60 + j, hex('#a898b6')); }
  R.disco(120, 28, 3, hex('#e8d8c8')); R.pset(121, 29, hex('#c0aca0'));
  // la peña de delante a la izquierda (estratos y grietas), con su sombra en la arena
  for (let x = 0; x < 78; x++) { const top = ri(yRoca1(x)); for (let y = top; y < 180; y++) { const e = Math.sin(y * 0.55 + x * 0.12) > 0.82, g = h2(x >> 2, y >> 2, 9) > 0.95;
      let v = 3.8 - (x - 10) * 0.03 - (y - top) * 0.018 + (ns(x * 0.2, y * 0.2) - 0.5) * 1.1 + (y - top < 2 ? 1.4 : 0);
      if (x > 70 - (y - 120) * 0.2) v -= 1.2; if (e) v -= 0.8; if (g) v -= 1.2; if (y - top < 1) v = 5; R.pset(x, y, rmp(ROCA1, v, x, y)); } }
  // matas de hierba seca sobre la peña
  for (const [bx, n] of [[18, 6], [44, 5]]) { const by = ri(yRoca1(bx)); for (let k = 0; k < n; k++) { const ex = bx + (k - n / 2) * 2, ey = by - 4 - (k % 3) * 2; R.linea(bx, by, ex, ey, hex('#6a4a3a')); R.pset(ex, ey, hex('#c89a6a')); } }
  for (let y = 150; y < 180; y++) for (let x = 70; x < 70 + (y - 140) * 1.4; x++) if (b4(x, y) < 0.5) sombrea(x, y, 0.35);
  // piedrecitas y matojos secos
  for (let k = 0; k < 18; k++) { const x = ri(90 + h2(k, 1) * 220), y = ri(Math.max(yC1(x) + 8, 110) + h2(k, 2) * 60); if (y > 178) continue; R.pset(x, y, hex('#4a2c34')); R.pset(x + 1, y, hex('#6a4644')); if (k % 3 === 0) { R.pset(x, y - 1, hex('#8a6a5a')); sombrea(x + 2, y, 0.3); } }
};
// las huellas: 14, por pares, en perspectiva desde abajo hasta la cresta
const HUELLA = Array.from({ length: 16 }, (_, k) => { const z = 1 + k * 0.48; return { x: 198 - 66 / z + (k % 2 ? 1 : -1) * 8 / z, y: 99.5 + 74 / z, w: Math.max(1.2, 11 / z), h: Math.max(1, 4.6 / z), k }; });
const p1 = (t) => {
  fijo('p1', fondo1);
  nubes(t, 7, 36, 9, pal(['#3e2e58', '#7a4a6e', '#c87482']), 0.8, 3);
  // estrellas que titilan
  for (let k = 0; k < 14; k++) { const x = ri(h2(k, 21) * 260 + 6), y = ri(h2(k, 22) * 44 + 4); if (x > 274 && y < 48) continue; if (Math.sin(t * (2 + k % 3) + k) > 0.4) { R.pset(x, y, hex('#fff6e0')); R.pset(x + 1, y, hex('#8a80b0')); } }
  // Paul, diminuto, se pierde por la cresta al final de sus huellas (recortado por la cresta)
  { const u = tramo(t, 0, 2.5), x = lerp(196, 208, u), yp = lerp(100, 114, ease(u));
    if (u < 1) { R.recorte([0, 0, 319, 99]); const S = hex('#22141e');
      R.poligono([[x - 2, yp - 8], [x + 2, yp - 8], [x + 3, yp], [x - 3, yp]], S); R.disco(x, yp - 10, 2, S); R.linea(x + 3, yp - 11, x + 4, yp, hex('#3a2418')); R.pset(ri(x) - 1, ri(yp) - 10, hex('#e8a070'));
      R.recorte(null); } }
  // el viento: sube en «wind» y tapa las huellas de cerca a lejos
  const w = tramo(t, VIENTO - 0.5, VIENTO + 0.3);
  for (const H of HUELLA) {
    const borra = tramo(t, BORRA - 0.1 + H.k * 0.08, BORRA + 0.55 + H.k * 0.08);
    for (let j = -ri(H.h); j <= ri(H.h); j++) for (let i = -ri(H.w); i <= ri(H.w); i++) { if ((i / H.w) ** 2 + (j / H.h) ** 2 > 1.05) continue; const x = ri(H.x + i), y = ri(H.y + j);
      if (b4(x, y) < borra) continue; if (j < 0 || (j === 0 && i < 0)) R.pset(x, y, mez(R.pget(x, y), hex('#3a1e2c'), 0.62)); else if (j > 0 || i > 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c8'), 0.5)); }
    if (borra < 0.5 && H.w > 3) for (let i = -ri(H.w) + 1; i < ri(H.w); i++) aclara(ri(H.x + i), ri(H.y + H.h + 1), hex('#fff0c8'), 0.4);
  }
  // regueros de arena que barren la duna y vuelan de la cresta
  const nR = 10 + ri(w * 46);
  for (let k = 0; k < nR; k++) { const sp = 40 + h2(k, 3) * 50, f = ((t * sp / 330) + h2(k, 4)) % 1, x = -10 + f * 340, y0 = 100 + h2(k, 5) * 78, y = Math.max(y0, yC1(x) + 2) + Math.sin(f * 12 + k) * 1.5, L = 2 + ri(h2(k, 6) * 6 * (0.4 + w));
    R.linea(ri(x), ri(y), ri(x - L), ri(y + 0.5), k % 3 ? hex('#f0c898') : hex('#ffe0b8')); }
  for (let k = 0; k < ri(8 + w * 22); k++) { const f = (t * (1.2 + w) + k * 0.137) % 1, x0 = 110 + (k * 37) % 200, x = x0 + f * 30, y = yC1(x0) - f * (5 + w * 6) + Math.sin(f * 9) * 1.5; if (f < 0.85) R.pset(ri(x), ri(y), hex('#fae0b0')); }
  // el matojo de la derecha, que se dobla con el viento
  { const bx = 290, by = 162, d = Math.sin(t * 3) * (0.5 + w * 1.8) + w * 2;
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.28, L = 9 + (k % 3) * 3; R.linea(bx, by, ri(bx + Math.cos(a) * L + d), ri(by + Math.sin(a) * L), k % 2 ? hex('#5a3a2a') : hex('#7a5232')); R.pset(ri(bx + Math.cos(a) * L + d), ri(by + Math.sin(a) * L), hex('#a87a4a')); }
    for (let i = -8; i < 10; i++) if (b4(bx + i, by + 1) < 0.5) sombrea(bx + i + 3, by + 1, 0.35); }
  // el ratón saltarín cruza por delante y se mete bajo el matojo
  { const u = tramo(t, 0.3, 1.9); if (u > 0 && u < 1) { const x = lerp(214, 288, u), salto = Math.abs(Math.sin(u * Math.PI * 4)) * 6; raton(x, 168 - salto, t, 1); } }
  // Atom suelta el grano en «erases»: el viento se lo lleva hasta la luna, donde queda como una estrella azul
  const ax = 70 + Math.sin(t * 1.1) * 3 + tramo(t, BORRA, P2) * 8, ay = 100 + Math.sin(t * 2.1) * 2.5;
  const suelta = tramo(t, BORRA - 0.05, P2 - 0.35);
  lucie(ax, ay, t, { dir: 1, brillo: 0.9, cara: suelta > 0.1 ? 'sonrisa' : 'normal' });
  if (suelta <= 0) { const a = t * 2.4; grano(ax + Math.cos(a) * 12, ay + Math.sin(a) * 4, t, 0.8); }
  else { const a0 = (BORRA - 0.05) * 2.4, x0 = ax + Math.cos(a0) * 12, y0 = ay + Math.sin(a0) * 4, u = ease(suelta);
    const bx = (s) => lerp(lerp(x0, 150, s), lerp(150, 214, s), s) + Math.sin(s * 14) * 3 * (1 - s), by = (s) => lerp(lerp(y0, 112, s), lerp(112, 50, s), s);
    for (let k = 1; k <= 5; k++) { const s = Math.max(0, u - k * 0.03); R.pset(ri(bx(s)), ri(by(s)), k < 3 ? AZ[3] : AZ[2]); }
    grano(bx(u), by(u), t, lerp(0.9, 0.55, u));
    if (u >= 1) { R.halo(214, 50, 7 + Math.sin(t * 6), [AZ[1], AZ[2], AZ[3]], 1); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + t * 0.5; for (let L = 3; L < 7 + ri(Math.sin(t * 5) * 1.5); L++) R.pset(ri(214 + Math.cos(a) * L), ri(50 + Math.sin(a) * L), L < 5 ? AZ[4] : AZ[3]); } } }
};

// ═══ 2 · la ciudadela desde la plaza: Alia gobierna y Duncan sale a su lado ═══
const aclamaF = (tt) => ease(tramo(tt, GOBIERNA - 0.15, GOBIERNA + 0.45)) * (1 - 0.35 * tramo(tt, LADO + 0.3, P3));
const p2 = (t) => {
  const o = { encuadre: 'balcon', camara: 'multitud', figura: false, aclaman: aclamaF };
  T.ciudadela(R, t, o);
  // Alia sale por la puerta del balcón y se asoma; en «rule» alza los brazos
  const ua = ease(tramo(t, P2 + 0.15, ALIA + 0.05)), axa = ri(lerp(158, 168, ua));
  const brazos = t > GOBIERNA - 0.05 && t < GOBIERNA + 1.1;
  const ud = ease(tramo(t, DUNCAN - 0.75, LADO - 0.1)), dx = ri(lerp(154, 186, ud));
  if (t > DUNCAN - 0.75) R.actor(PA.duncan, dx, 46, t, { dir: ud < 1 ? 1 : -1, anda: ud > 0 && ud < 1, sonrisa: t > LADO + 0.2, habla: t > LADO + 0.3 && t < LADO + 0.8 && Math.sin(t * 10) > 0 });
  R.actor(PA.alia, axa, 46, t, { dir: t > LADO ? 1 : 1, anda: ua > 0 && ua < 1, brazos, sonrisa: t > ALIA - 0.2, dedo: t > LADO && t < LADO + 0.7 });
  // Atom luciérnaga sobre la multitud, que se sobresalta con el clamor
  const sx = t > GOBIERNA && t < GOBIERNA + 0.9 ? 1 : 0;
  lucie(244 + Math.sin(t * 1.1) * 5, 104 - sx * 6 + Math.sin(t * 2.3) * 3, t, { dir: -1, brillo: 0.85, cara: sx ? 'sorpresa' : 'sonrisa' });
  T.ciudadelaDelante(R, t, o);
  // la plaza aclama en «rule»: brazos que se alzan en oleadas y banderolas que suben y se agitan
  const ac = aclamaF(t);
  if (ac > 0.05) for (let k = 0; k < 70; k++) { const x = ri(6 + h2(k, 81) * 308), y0 = ri(124 + h2(k, 82) * 48), ola = Math.sin(t * 7 + x * 0.05 + k);
    if (h2(k, 83) > ac) continue; const up = ri(4 + ola * 2 + (y0 - 124) * 0.06), piel = ['#f0c49a', '#c88a5a', '#8a5a3a'][k % 3];
    if (k % 7 === 0) { const c = k % 2 ? hex('#1f3a26') : hex('#1a1a20'), v = ri(Math.sin(t * 9 + k) * 1.5); R.linea(x, y0, x, y0 - up - 8, hex('#4a3420')); R.poligono([[x + 1, y0 - up - 8], [x + 7 + v, y0 - up - 7], [x + 6 + v, y0 - up - 3], [x + 1, y0 - up - 3]], c); R.pset(x + 4, y0 - up - 6, hex('#e8c040')); }
    else { R.linea(x, y0, x + (k % 2 ? 1 : -1), y0 - up, K); R.rect(x - 1 + (k % 2 ? 1 : -1), y0 - up - 2, x + (k % 2 ? 1 : -1), y0 - up - 1, hex(piel)); } }
  // la luz de la tarde que cae sobre la plaza
  T.tinte(R, 0, 179, [235, 120, 80], 0.17);
};

// ═══ 3 · fondo propio: la alcoba de las cunas, de noche ═══
const sillares = (x0, y0, x1, y1, ramp, o = {}) => {
  const al = o.alto ?? 8, an = o.ancho ?? 18, k = o.k ?? 1, luz = o.luz, n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / al), yy = (y - y0) % al, off = (fila & 1) * (an >> 1);
    for (let x = x0; x <= x1; x++) { const xx = (x - x0 + off) % an, bl = Math.floor((x - x0 + off) / an);
      let v = 1.4 + (h2(bl, fila, k) - 0.5) * 0.9 + (ns(x * 0.35, y * 0.35) - 0.5) * 0.7 + (luz ? luz(x, y) : 0);
      if (yy === 0 || xx === 0) v = n; else if (yy === 1 || xx === 1) v -= 0.7; else if (yy === al - 1 || xx === an - 1) v += 0.6;
      if (h2(x, y, k + 3) > 0.965) v += 1;
      R.pset(x, y, rmp(ramp, Math.min(v, n - 0.01), x, y)); } }
};
const PI3 = pal(['#c49a78', '#a47e60', '#86644e', '#684c3e', '#4c362e', '#2a1c1a']);
const fondo3 = () => {
  sillares(0, 0, 319, 146, PI3, { alto: 9, ancho: 19, k: 23, luz: (x, y) => Math.hypot(x - 240, y - 40) / 150 - 0.25 + (x < 30 ? 0.7 : 0) + (y < 12 ? 0.6 : 0) });
  // las vigas de palmera del techo
  for (let x = 0; x < 320; x++) { for (let y = 0; y < 7; y++) R.pset(x, y, rmp(pal(['#1e140e', '#3a2618', '#5a3a22']), 1.2 + Math.sin(x * 0.7 + y) * 0.4 - (y === 6 ? 1 : 0), x, y)); }
  for (const bx of [60, 140, 220, 300]) { R.rect(bx - 5, 0, bx + 5, 9, K); R.rect(bx - 4, 0, bx + 4, 8, hex('#4a3020')); R.rect(bx - 4, 0, bx - 3, 8, hex('#6a4a2e')); }
  // el rincón: la arista y el suelo de esteras
  for (let y = 7; y < 147; y++) for (let x = 26; x < 32; x++) R.pset(x, y, x < 28 ? PI3[4] : PI3[2]);
  for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (Math.floor(x / 6) + Math.floor(y / 3)) % 2 ? 2 : 1, l = 1 - Math.hypot(x - 200, (y - 150) * 2) / 260;
    R.pset(x, y, y === 147 ? K : (x + y * 3) % 9 === 0 ? hex('#5a4228') : rmp(pal(['#4a3622', '#6a5030', '#8a6a3e', '#a4824c']), v + l * 1.4, x, y)); }
  // el tapiz de la pared (rombos, con su barra y sus flecos)
  for (let y = 22; y <= 82; y++) for (let x = 44; x <= 84; x++) { const u = Math.abs(((x - 44) % 10) - 5) + Math.abs(((y - 22) % 14) - 7);
    R.pset(x, y, x === 44 || x === 84 || y === 82 ? hex('#3a1a14') : u < 2 ? hex('#e8c060') : u < 4 ? hex('#3a6aa8') : u < 7 ? hex('#9a3424') : hex('#6a2018')); }
  R.rect(40, 19, 88, 21, K); R.rect(41, 19, 87, 20, hex('#8a6a3a')); for (let x = 45; x <= 83; x += 2) R.linea(x, 83, x, 86 + (x % 4 ? 0 : 1), hex('#c89a50'));
  // el estante con juguetes de madera y LOS DOS LIBROS (azul y dorado), de pie
  R.rect(252, 96, 314, 99, K); R.rect(253, 96, 313, 97, hex('#8a6038'));
  R.rect(258, 78, 263, 95, K); R.rect(259, 79, 262, 94, hex('#2a4a8a')); R.pset(260, 82, hex('#e8c060')); R.pset(260, 91, hex('#e8c060'));
  R.rect(264, 80, 269, 95, K); R.rect(265, 81, 268, 94, hex('#b0802a')); R.pset(266, 84, hex('#5a3a14')); R.pset(266, 90, hex('#5a3a14'));
  R.rect(276, 86, 284, 95, K); R.rect(277, 87, 283, 94, hex('#c8804a')); R.disco(292, 91, 4, K); R.disco(292, 91, 3, hex('#3a6aa8')); R.rect(300, 84, 310, 95, K); R.rect(301, 85, 309, 94, hex('#e8c060')); R.pset(305, 88, K);
  // el arcón con herrajes
  R.rect(236, 124, 312, 147, K); R.rect(237, 125, 311, 146, hex('#5a3820')); R.rect(237, 125, 311, 128, hex('#7a5230')); for (let x = 240; x < 310; x += 6) R.linea(x, 130, x, 145, hex('#4a2e1a'));
  for (const x of [250, 298]) { R.rect(x - 3, 132, x + 3, 136, hex('#c8a040')); R.pset(x, 134, K); }
  // el estandarte del halcón en la pared del rincón y un nicho con su cántaro y un cuenco
  for (let y = 18; y <= 92; y++) for (let x = 6; x <= 22; x++) { const punta = y > 84 && Math.abs(x - 14) > (92 - y); if (punta) continue; R.pset(x, y, x === 6 || x === 22 ? K : (x + y) % 11 === 0 ? hex('#16301e') : hex('#1f3a26')); }
  R.rect(4, 16, 24, 18, K); R.rect(5, 16, 23, 17, hex('#c8a040')); for (const [i, j] of [[14, 44], [13, 45], [15, 45], [11, 46], [12, 46], [16, 46], [17, 46], [14, 46], [14, 47], [14, 48], [13, 49], [15, 49]]) R.pset(i, j, hex('#e8c040'));
  R.rect(13, 30, 15, 31, hex('#e8c040')); R.rect(12, 32, 16, 32, hex('#e8c040'));
  R.rect(212, 56, 236, 86, K); R.rect(213, 57, 235, 85, PI3[4]); R.rect(213, 57, 235, 59, PI3[5]); R.rect(211, 86, 237, 88, PI3[1]);
  R.disco(221, 79, 5, K); R.disco(221, 79, 4, hex('#a8603a')); R.rect(219, 71, 223, 74, K); R.rect(220, 72, 222, 74, hex('#a8603a')); R.pset(219, 78, hex('#d88a5a'));
  R.rect(227, 80, 234, 85, K); R.rect(228, 81, 233, 84, hex('#3a6aa8')); R.linea(228, 81, 233, 81, hex('#8ab0e0'));
  // la ventana en arco (x 150–206, y 24–100): marco de piedra
  for (let y = 18; y <= 104; y++) for (let x = 144; x <= 212; x++) { const dd = y < 52 ? Math.hypot(x - 178, y - 52) : Math.max(Math.abs(x - 178), 0); const ri0 = 28, ro = 34;
    if (y < 52 ? (dd > ri0 && dd <= ro) : (x < 150 || x > 206) && x >= 144 && x <= 212 && y <= 100) R.pset(x, y, (x + y) % 7 === 0 ? PI3[3] : x < 150 || (y < 52 && x < 178) ? PI3[1] : PI3[2]); }
  R.rect(144, 100, 212, 104, K); R.rect(145, 100, 211, 102, PI3[0]);
  // la alfombra bajo las cunas
  for (let y = 152; y < 174; y++) for (let x = 62; x < 210; x++) { const u = Math.abs(((x - 62) % 14) - 7) + Math.abs(((y - 152) % 10) - 5);
    R.pset(x, y, x < 64 || x > 207 || y < 154 || y > 171 ? hex('#3a1a14') : u < 3 ? hex('#c89a40') : u < 6 ? hex('#8a2a1e') : hex('#5a1a16')); }
};
// la cuna sobre sus balancines, con su bebé (cabecita, manta y una manita que se mueve)
const cuna = (cx, cy, d, manta, t, k) => {
  d = ri(d);
  R.linea(cx - 30, cy + 1 - d, cx + 30, cy + 1 + d, K); R.linea(cx - 29, cy - d, cx + 29, cy + d, hex('#8a5a30')); R.linea(cx - 28, cy + 2 - d, cx + 28, cy + 2 + d, K);
  for (const sx of [-18, 18]) { R.linea(cx + sx, cy - 3, cx + sx - 3, cy + 1, K); R.linea(cx + sx, cy - 3, cx + sx + 3, cy + 1, K); }
  R.rect(cx - 25, cy - 30, cx + 25, cy - 3, K); R.rect(cx - 24, cy - 29, cx + 24, cy - 4, hex('#b07a44')); R.rect(cx - 24, cy - 29, cx + 24, cy - 27, hex('#c8925a'));
  // el bebé asoma por encima de la baranda
  const B = hex(manta), BL = mez(B, hex('#ffffff'), 0.35);
  R.poligono([[cx - 16, cy - 30], [cx - 12, cy - 35], [cx + 14, cy - 35], [cx + 18, cy - 30]], K); R.poligono([[cx - 15, cy - 31], [cx - 11, cy - 34], [cx + 13, cy - 34], [cx + 17, cy - 31]], B); R.linea(cx - 10, cy - 34, cx + 12, cy - 34, BL);
  R.disco(cx - 9, cy - 36, 4, K); R.disco(cx - 9, cy - 36, 3, hex('#f0c49a')); R.pset(cx - 8, cy - 37, K); R.pset(cx - 10, cy - 37, K); R.pset(cx - 9, cy - 35, hex('#d88a7a')); R.pset(cx - 11, cy - 38, hex('#5a3a20'));
  const mh = Math.sin(t * 4 + k * 2) > 0.3 ? -1 : 0; R.rect(cx + 2, cy - 38 + mh, cx + 3, cy - 36 + mh, hex('#f0c49a')); R.pset(cx + 2, cy - 39 + mh, K);
  for (let x = cx - 21; x <= cx + 21; x += 4) R.linea(x + d, cy - 27, x, cy - 6, hex('#7a4e2a'));
  R.rect(cx - 27, cy - 38, cx - 21, cy - 3, K); R.rect(cx - 26, cy - 37, cx - 22, cy - 4, hex('#c88a50')); R.rect(cx + 21, cy - 34, cx + 27, cy - 3, K); R.rect(cx + 22, cy - 33, cx + 26, cy - 4, hex('#c88a50'));
  R.rect(cx - 20, cy - 31, cx + 20, cy - 29, K); R.rect(cx - 19, cy - 30, cx + 19, cy - 30, hex('#e8c070'));
  for (let i = -24; i < 26; i++) if (b4(cx + i, cy + 4) < 0.6) sombrea(cx + i, cy + 4, 0.35);
};
const movil = (cx, t, k) => { R.linea(cx, 7, cx, 36, hex('#4a3020')); const a = t * 0.9 + k; R.linea(ri(cx - 12 * Math.cos(a)), 36, ri(cx + 12 * Math.cos(a)), 36, hex('#6a4a2a'));
  for (const s of [-1, 0, 1]) { const x = ri(cx + s * 12 * Math.cos(a)), y = 42 + (s === 0 ? 4 : 0) + ri(Math.sin(t * 2 + s) * 1); R.linea(x, 36, x, y - 2, hex('#8a7a6a'));
    R.poligono([[x - 4, y - 1], [x, y - 3], [x + 4, y - 1], [x, y + 1]], K); R.poligono([[x - 3, y - 1], [x, y - 2], [x + 3, y - 1], [x, y]], hex('#d8a84a')); } };
const p3 = (t) => {
  fijo('p3', fondo3);
  // por la ventana: la noche de Arrakeen (dos lunas, estrellas, la ciudad con luces), recortada al hueco
  R.recorte([150, 24, 206, 99]);
  for (let y = 20; y <= 99; y++) for (let x = 150; x <= 206; x++) { if (y < 52 && Math.hypot(x - 178, y - 52) > 28) continue; R.pset(x, y, rmp(pal(['#0c1030', '#16204a', '#24305e', '#3a3a6a']), (y - 20) / 22 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.5, x, y)); }
  R.disco(192, 40, 6, hex('#e8e0d0')); R.disco(194, 39, 5, hex('#16204a')); R.disco(162, 34, 2, hex('#d8c0b0'));
  for (let k = 0; k < 12; k++) { const x = 152 + ri(h2(k, 31) * 52), y = 26 + ri(h2(k, 32) * 44); if (Math.sin(t * 3 + k * 1.7) > -0.2) R.pset(x, y, hex('#fff4d0')); }
  for (let x = 150; x <= 206; x++) { const hb = 84 - (h2(x >> 2, 7) * 9 | 0) - (x > 170 && x < 180 ? 8 : 0); for (let y = hb; y <= 99; y++) R.pset(x, y, hex('#1a1628')); }
  for (let k = 0; k < 10; k++) { const x = 152 + ri(h2(k, 41) * 52), y = 86 + ri(h2(k, 42) * 11); if (Math.sin(t * 1.3 + k * 2.1) > -0.4) R.pset(x, y, hex('#ffc060')); }
  R.recorte(null);
  R.linea(178, 24, 178, 99, hex('#3a2a1c')); R.linea(150, 62, 206, 62, hex('#3a2a1c'));
  // el haz de luna por el suelo
  for (let y = 147; y < 178; y++) for (let x = 0; x < 320; x++) { const xl = 150 - (y - 147) * 1.1, xr = 206 - (y - 147) * 0.5; if (x >= xl && x <= xr && b4(x, y) < 0.22) aclara(x, y, hex('#a8b8e8'), 0.35); }
  // la lámpara de aceite colgada, que tiembla, y la vela del arcón
  { const L = 240, f = Math.sin(t * 9) * 0.6 + Math.sin(t * 13) * 0.4; R.linea(L, 8, L, 34, hex('#4a3020')); R.halo(L, 38, 16 + f * 2, [hex('#6a4a30'), hex('#a8743a'), hex('#e8a84a')], 0.7);
    R.rect(L - 6, 34, L + 6, 40, K); R.rect(L - 5, 35, L + 5, 39, hex('#b88a3a')); R.rect(L - 5, 35, L - 3, 39, hex('#e0b860')); R.poligono([[L - 2, 34], [L + 2, 34], [L + ri(f), 29]], hex('#f8b040')); R.pset(L, 32, hex('#fff0b0')); }
  { const f = Math.sin(t * 11) * 0.7; R.rect(296, 112, 300, 123, K); R.rect(297, 113, 299, 123, hex('#f0e4c8')); R.halo(298, 109, 8, [hex('#a87a40'), hex('#e8b060')], 0.6); R.poligono([[296, 112], [300, 112], [298 + ri(f), 105]], hex('#f08a30')); R.pset(298, 110, hex('#fff0b0')); }
  // los libros del estante brillan en «books»
  const lib = tramo(t, LIBROS - 0.2, LIBROS + 0.2) * (1 - 0.5 * tramo(t, DESTINO, DESTINO + 0.8));
  if (lib > 0) { R.halo(264, 86, 12 * lib, [hex('#6a5a3a'), hex('#c8a050'), hex('#f8e090')], 0.8);
    R.rect(258, 78, 263, 95, K); R.rect(259, 79, 262, 94, hex('#3a6ac8')); R.rect(264, 80, 269, 95, K); R.rect(265, 81, 268, 94, hex('#e0b040'));
    if (Math.sin(t * 8) > 0) { R.pset(261, 76, hex('#fff6d0')); R.pset(267, 77, hex('#fff6d0')); } }
  // los móviles de halcones sobre las cunas
  movil(100, t, 0); movil(170, t, 2);
  // dos polillas que dan vueltas a la lámpara de aceite
  for (let k = 0; k < 2; k++) { const a = t * (3.1 + k * 1.3) + k * 2, x = ri(240 + Math.cos(a) * (9 + k * 4) + Math.sin(t * 7 + k) * 1.5), y = ri(38 + Math.sin(a * 1.3) * (6 + k * 2));
    const al = Math.sin(t * 30 + k) > 0; R.pset(x, y, hex('#d8c8a0')); R.pset(x - 1, y - (al ? 1 : 0), hex('#b8a880')); R.pset(x + 1, y - (al ? 1 : 0), hex('#b8a880')); }
  // Alia entra y mece la suya en «babies»; Duncan mece la otra
  const ua = ease(tramo(t, P3 + 0.05, BEBES - 0.05)), xa = ri(lerp(30, 58, ua));
  const arriba = t > DESTINO - 0.05;
  const meceA = Math.sin((t - BEBES) * 4.5) * tramo(t, BEBES - 0.1, BEBES + 0.3) * (1 - tramo(t, DESTINO - 0.2, DESTINO + 0.3));
  const meceB = Math.sin((t - BEBES) * 4.5 + 1.4) * tramo(t, BEBES + 0.3, BEBES + 0.7) * (1 - tramo(t, DESTINO - 0.2, DESTINO + 0.3));
  cuna(100, 160, meceA * 3, '#3a6ac8', t, 0); cuna(170, 160, meceB * 3, '#d8a03a', t, 1);
  R.actor(PA.alia, xa, 164, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: ua >= 1 && !arriba ? [76, 129 + ri(meceA * 2)] : undefined, sorpresa: arriba && t < HUMANIDAD + 0.3, sonrisa: (arriba && t > HUMANIDAD + 0.3) || (!arriba && ua >= 1) });
  R.actor(PA.duncan, 216, 164, t, { dir: -1, sostiene: t > BEBES + 0.3 && !arriba ? [196, 129 + ri(meceB * 2)] : undefined, habla: t > SIGUEN && t < CAMBIARAN && Math.sin(t * 10) > 0, sorpresa: arriba && t < HUMANIDAD + 0.4, sonrisa: t > HUMANIDAD + 0.4 });
  // Atom junto al estante: sonríe cuando brillan los libros
  lucie(286 + Math.sin(t * 1.2) * 3, 70 + Math.sin(t * 2.0) * 2.5, t, { dir: -1, brillo: 0.8, cara: arriba ? 'sorpresa' : t > LIBROS - 0.2 ? 'sonrisa' : 'normal' });
  // en «fate of humanity», de las cunas suben chispas doradas que se abren por el techo como estrellas
  const sube = tramo(t, DESTINO - 0.15, P4 + 0.1);
  if (sube > 0) for (let k = 0; k < 72; k++) { const c0 = k % 2 ? 100 : 170, s = cl(sube * 1.6 - h2(k, 51) * 0.6); if (s <= 0) continue;
    const x = c0 - 9 + (h2(k, 52) - 0.5) * 300 * ease(s) + Math.sin(t * 2 + k) * 2, y = 120 - ease(s) * (50 + h2(k, 53) * 64);
    if (x < 2 || x > 317 || y < 10 || (x > 274 && y < 48)) continue; const tw = Math.sin(t * 7 + k * 1.3) > 0;
    R.pset(ri(x), ri(y), tw ? hex('#fff6c0') : hex('#f0c040')); if (s > 0.6 && tw) { R.pset(ri(x) - 1, ri(y), hex('#c89a30')); R.pset(ri(x) + 1, ri(y), hex('#c89a30')); R.pset(ri(x), ri(y) - 1, hex('#c89a30')); R.pset(ri(x), ri(y) + 1, hex('#c89a30')); } }
  if (sube > 0) for (const c0 of [91, 161]) R.halo(c0, 122, 10 * Math.min(1, sube * 3), [hex('#8a6a30'), hex('#e8c060'), hex('#fff0b0')], 0.8);
};

// ═══ 4 · la fachada del cine en 2026, con nieve: las tres lunas de la marquesina ═══
const lunasF = (t) => (t < DUNE + 0.25 ? 1 : t < TRES - 0.2 ? 2 : 3);
const p4 = (t) => {
  const o = { encuadre: 'sala', epoca: 2026, lunas: lunasF(t), cola: 0.5 };
  const g = salas(R, t, o);
  // las lunas que se encienden: un destello en cada una
  const [lx, ly] = g?.lunas ?? [160, 48];
  for (const [ti, dx] of [[DUNE + 0.25, -22], [TRES - 0.2, 0], [TRES - 0.2, 22]]) { const f = tramo(t, ti, ti + 0.5); if (f > 0 && f < 1) R.halo(lx + dx, ly, 10 * (1 - f) + 2, [hex('#806030'), hex('#f0c060'), hex('#fff4c0')], 0.9); }
  // Atom llega por la acera, señala la marquesina en «Part 3», alza los brazos en «change things» y se pone a la cola
  const u1 = ease(tramo(t, P4 + 0.05, DUNE + 0.75)), u2 = ease(tramo(t, TRAILERS - 0.4, P5 - 0.5));
  const ax = lerp(lerp(-10, 44, u1), 58, u2);
  const pose = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1) ? 'camina' : t > TRES - 0.3 && t < CAMBIA - 0.1 ? 'senala' : t > CAMBIA - 0.1 && t < TRAILERS - 0.5 ? 'brazos' : 'quieto';
  AT.atom(R, ax, 147, t, { pose, dir: 1, s: 1, cara: t > TRES - 0.3 ? 'sonrisa' : 'sorpresa' });
  salasDelante(R, t, o);
};

// ═══ 5 · dentro del cine: el tráiler (el salto de 17 años y Chani contra Paul) ═══
const DUNA5 = pal(['#5a2a2a', '#8a4a34', '#b8703e', '#d8984e', '#f0c070']);
const p5 = (t) => {
  const o = { encuadre: 'sala', camara: 'butacas', lleno: 0.9, pantalla: false };
  const g = salas(R, t, o);
  const [x0, y0, x1, y1] = g?.pantalla ?? [34, 24, 268, 108];
  const corte = CHANI - 0.15;
  R.recorte([x0, y0, x1, y1]);
  if (t < corte) {
    // los días y las noches que pasan cada vez más deprisa (los años) y el contador hasta 17
    const vel = 0.6 + tramo(t, DIECISIETE - 0.4, SALTO) * 7, fase = (Math.max(t, P5 + 0.4) - P5 - 0.4) * vel + (t > SALTO ? (t - SALTO) * 4 : 0);
    const dia = 0.5 + 0.5 * Math.cos(fase * Math.PI * 2);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = mez(mez(hex('#3a3a6a'), hex('#f0a868'), dia), hex('#f8d8a0'), dia * (y - y0) / (y1 - y0) * 0.5); R.pset(x, y, b4(x, y) < 0.5 ? c : mez(c, K, 0.08)); }
    const a = fase * Math.PI * 2, sx = ri(151 + Math.sin(a) * 100), sy = ri(96 - Math.cos(a) * 60), mx = ri(151 - Math.sin(a) * 100), my = ri(96 + Math.cos(a) * 60);
    R.disco(sx, sy, 7, hex('#fff0a0')); R.disco(mx, my, 5, hex('#e8e4f0')); R.disco(mx + 2, my - 1, 4, mez(hex('#3a3a6a'), hex('#f0a868'), dia));
    for (let x = x0; x <= x1; x++) { const yd = ri(86 + Math.sin(x * 0.05) * 5 + Math.sin(x * 0.13) * 2); for (let y = yd; y <= y1; y++) R.pset(x, y, rmp(DUNA5, 2.6 - (y - yd) * 0.05 + Math.sin(x * 0.2 - y * 0.6) * 0.6 - (1 - dia) * 1.8, x, y)); }
    const n = Math.min(17, Math.floor(tramo(t, DIECISIETE - 0.1, SALTO - 0.05) * 17.99));
    { R.rect(122, 46, 180, 82, K); R.rect(123, 47, 179, 81, hex('#f4ecd8')); R.rect(123, 47, 179, 53, hex('#c83a2a')); R.numero(String(n), 152, 78, { tam: 16, centro: true }); }
    // un reloj de arena que da vueltas
    { const gx = 92, gy = 66, ang = fase * 1.5; for (let k = -6; k <= 6; k++) { const w = Math.abs(k) * 0.9 + 1, c = Math.cos(ang), s = Math.sin(ang); R.linea(ri(gx - w * c - k * s), ri(gy - w * s + k * c), ri(gx + w * c - k * s), ri(gy + w * s + k * c), Math.abs(k) > 4 ? hex('#f0d090') : hex('#a8d0e8')); } }
  } else {
    // el corte: un destello, y Paul y Chani en la cresta, al doble
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, rmp(pal(['#3a1a3a', '#6a2a4a', '#a84a4a', '#e07a4a', '#f8b060']), (y - y0) / (y1 - y0) * 4.2 + (ns(x * 0.05, y * 0.2) - 0.5) * 0.5, x, y));
    R.disco(151, 82, 14, hex('#ffd890')); R.disco(151, 82, 11, hex('#fff0c0'));
    for (let x = x0; x <= x1; x++) { const yd = ri(96 - Math.max(0, 20 - Math.abs(x - 151) * 0.3) * 0.4 + Math.sin(x * 0.07) * 2); for (let y = yd; y <= y1; y++) R.pset(x, y, rmp(DUNA5, 1.6 - (y - yd) * 0.05 + Math.sin(x * 0.2 - y * 0.6) * 0.5 + (x < 151 ? 0.5 : 0), x, y)); }
    const enf = t > CONTRA - 0.1;
    R.recorte(null);
    AT.escalado(R, () => R.actor(PA.paul, 20, 32, t, { dir: 1, sorpresa: enf && t < CONTRA + 0.8, triste: t > CONTRA + 0.8, sonrisa: !enf }), 40, 34, 78, 34, 2);
    AT.escalado(R, () => R.actor(PA.chani, 20, 32, t, { dir: -1, enfado: enf, dedo: enf && t < CONTRA + 1.4, sonrisa: !enf }), 40, 34, 150, 34, 2);
    if (enf && t < CONTRA + 1.2) { R.rect(196, 34, 206, 50, K); R.rect(197, 35, 205, 49, hex('#f4f0e6')); R.icono('!', 199, 37, hex('#d83a2a'), hex('#c8c0b0'), 2); }
    R.recorte([x0, y0, x1, y1]);
    if (enf) { const f = tramo(t, CONTRA - 0.1, CONTRA + 0.3) * (1 - tramo(t, CONTRA + 0.3, CONTRA + 1)); if (f > 0) T.tinte(R, y0, y1, [200, 40, 40], 0.25 * f); }
    const fl = 1 - tramo(t, corte, corte + 0.25); if (fl > 0) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (b4(x, y) < fl) R.pset(x, y, hex('#fff8e8'));
  }
  R.recorte(null);
  // el polvo que flota en el haz del proyector, delante de la pantalla (recortado a ella)
  R.recorte([x0, y0, x1, y1]);
  for (let k = 0; k < 26; k++) { const f = (t * (0.05 + h2(k, 91) * 0.06) + h2(k, 92)) % 1, x = x0 + 6 + h2(k, 93) * (x1 - x0 - 12) + Math.sin(t * 0.7 + k) * 4, y = y1 - 4 - f * (y1 - y0 - 8);
    if (Math.sin(t * 3 + k * 1.9) > -0.3) aclara(ri(x), ri(y), hex('#fff4dc'), 0.55); }
  R.recorte(null);
  salasDelante(R, t, o);
  // la luz de la pantalla sobre el público: el destello del corte y el rojo de «turned against»
  { const fl = (1 - tramo(t, corte, corte + 0.45)) * (t > corte ? 1 : 0), rj = tramo(t, CONTRA - 0.1, CONTRA + 0.2) * (1 - tramo(t, CONTRA + 0.4, CONTRA + 1.1));
    if (fl > 0.02 || rj > 0.02) { const col = fl >= rj ? hex('#fff0d0') : hex('#ff7a60'), a = Math.max(fl, rj);
      for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < a * 0.45 * (1 - (y - 112) / 110)) aclara(x, y, col, 0.4); } }
  // el susto: las palomitas de un cubo de la fila de Atom saltan en «turned against» y caen
  { const u = tramo(t, CONTRA - 0.05, CONTRA + 0.9); if (u > 0 && u < 1) for (let k = 0; k < 9; k++) { const vx = (h2(k, 95) - 0.5) * 34, vy = 26 + h2(k, 96) * 18, s = u * 1.1;
      const x = 214 + vx * s, y = 150 - vy * s + 60 * s * s; if (y < 158) { R.rect(ri(x), ri(y), ri(x) + 1, ri(y) + 1, hex('#fff4d0')); R.pset(ri(x) + 1, ri(y) + 1, hex('#d8b060')); } } }
  // Atom en el patio de butacas, entre las cabezas: se asusta cuando Chani se vuelve contra Paul
  lucie(232 + Math.sin(t * 1.3) * 3, 128 + Math.sin(t * 2.2) * 2 - (t > CONTRA && t < CONTRA + 0.5 ? 5 : 0), t, { dir: -1, brillo: 0.6, cara: t > CONTRA - 0.1 ? 'sorpresa' : t > SALTO ? 'sorpresa' : 'normal' });
};

// ═══ 6 · el llano de día, a la tarde: la loma enorme y Atom que mira el horizonte ═══
const p6 = (t) => {
  const gusa = ease(tramo(t, GUSANO - 0.5, GUSANO + 0.3));
  const o = { encuadre: 'desierto', hora: 'dia', silueta: 1, t0: P6, lomaX: 300 - (t - P6) * 22, lomaEscala: 1.25 + gusa * 0.35 };
  const g = T.planeta(R, t, o);
  T.tinte(R, 0, 179, [236, 112, 70], 0.24);
  // la arena que levanta la loma cuando se hincha
  const lm = g?.loma;
  if (lm && gusa > 0) for (let k = 0; k < 90; k++) { const f = ((t * 1.5 + k * 0.073) % 1), x = lm.x - lm.len * 0.45 + h2(k, 61) * lm.len * 0.9 + f * 12, y = lm.y - lm.alto - f * 30 * gusa + Math.sin(f * 7 + k) * 2; if (f < 0.9) { R.pset(ri(x), ri(y), f < 0.5 ? hex('#fff0c8') : hex('#d8b07a')); if (k % 3 === 0 && f < 0.6) R.pset(ri(x) + 1, ri(y), hex('#f0d0a0')); } }
  // un ratón huye a su madriguera cuando la loma se acerca
  { const u0 = tramo(t, P6 + 0.2, P6 + 1.3), u = tramo(t, GUSANO - 0.9, GUSANO + 0.2), x = lerp(lerp(190, 222, u0), 262, u);
    const sal = (u > 0 && u < 1 ? Math.abs(Math.sin(u * Math.PI * 3)) * 5 : 0) + (u0 > 0 && u0 < 1 ? Math.abs(Math.sin(u0 * Math.PI * 3)) * 4 : 0) + (u0 >= 1 && u <= 0 && Math.sin(t * 5) > 0.6 ? 1 : 0);
    R.disco(266, 152, 2, hex('#5a3a1a')); R.linea(263, 153, 269, 153, hex('#c89a62'));
    if (u < 1) raton(x, 151 - sal, t, u0 >= 1 && u <= 0 && Math.sin(t * 0.9) < -0.2 ? -1 : 1); }
  // dos aves carroñeras que dan vueltas sobre el llano; en «sandworm» se asustan y se van
  { const vete = tramo(t, GUSANO - 0.3, GUSANO + 1.2);
    for (let k = 0; k < 2; k++) { const a = t * 0.9 + k * Math.PI, x = 170 + Math.cos(a) * 26 + vete * 90 * (k ? 1.1 : 0.8) - vete * 40, y = 58 + Math.sin(a) * 7 - vete * 30 - k * 4;
      if (x < 2 || x > 316 || (x > 272 && y < 50)) continue; const X = ri(x), Y = ri(y), al = Math.sin(t * (vete > 0 ? 14 : 4) + k * 2) > 0 ? -1 : 1;
      R.pset(X, Y, hex('#3a2418')); R.pset(X + 1, Y, hex('#3a2418')); R.linea(X - 3, Y + al, X, Y, hex('#4a2c1c')); R.linea(X + 1, Y, X + 4, Y + al, hex('#4a2c1c')); R.pset(X - 4, Y + al * 2, hex('#4a2c1c')); R.pset(X + 5, Y + al * 2, hex('#4a2c1c')); } }
  // un remolino de arena que cruza el llano y se deshace cuando la loma se hincha
  { const xr = 160 - (t - P6) * 6, dsh = tramo(t, GUSANO - 0.4, GUSANO + 0.6), yb = 146;
    if (dsh < 1) for (let k = 0; k < 70; k++) { const f = k / 70, h = f * 26, r = 1.5 + f * 5 + dsh * 6, a = t * 9 + k * 0.9, x = xr + Math.cos(a) * r + Math.sin(t * 2 + f * 3) * 2 * f, y = yb - h + Math.sin(a) * r * 0.25 + dsh * h * 0.5;
      if (h2(k, ri(t * 6)) < dsh) continue; R.pset(ri(x), ri(y), Math.sin(a) > 0.3 ? hex('#fff0cc') : Math.sin(a) > -0.3 ? hex('#d0a06a') : hex('#9a6a40')); }
    if (dsh < 1) for (let i = -5; i <= 5; i++) if (b4(ri(xr) + i, yb + 1) < 0.5) sombrea(ri(xr) + i, yb + 1, 0.25); }
  // Atom llega, mira el horizonte; en «question» le sale el «?»; en «sandworm» se echa atrás
  const ll = ease(tramo(t, P6, PREGUNTA - 0.15)), atras = ease(tramo(t, GUSANO - 0.2, GUSANO + 0.35));
  const ax = lerp(20, 104, ll) - atras * 16, ay = 124 + Math.sin(t * 2.1) * 2.5 - atras * 4;
  lucie(ax, ay, t, { dir: 1, brillo: 0.75, cara: atras > 0 ? 'sorpresa' : t > INCOMODA ? 'triste' : 'normal' });
  const qa = tramo(t, PREGUNTA, PREGUNTA + 0.25) * (1 - tramo(t, GUSANO - 0.3, GUSANO));
  if (qa > 0) bocata(ax + 4, ay - 36 - (1 - qa) * 5, '?');
};

// ═══ 7 · fondo propio: la procesión a contraluz ═══
const CIELO7 = pal(['#2a1840', '#4a2050', '#7a2a56', '#a83a4e', '#d0563e', '#e8783a', '#f8a240', '#ffcc66', '#fff0b0']);
const yR7 = (x) => 126 + 9 * Math.sin(x * 0.017 + 1.2) + 4 * Math.sin(x * 0.045) - (x > 120 && x < 200 ? 0 : 0);
const fondo7 = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c; const d = Math.hypot(x - 150, (y - 122) * 1.15);
    if (y < 120 + (x * 0.03)) c = rmp(CIELO7, (y / 120) * 6.5 + Math.max(0, 1 - d / 140) * 2.4 + (ns(x * 0.02, y * 0.1) - 0.5) * 0.5, x, y);
    else c = hex('#5a2240');
    R.pset(x, y, c);
  }
  // el sol enorme que se pone
  R.halo(150, 122, 62, [hex('#e8783a'), hex('#f8a240'), hex('#ffcc66')], 0.75);
  R.disco(150, 122, 40, hex('#ffd888')); R.disco(150, 122, 37, hex('#ffe8a8')); for (let y = 86; y < 162; y += 5) for (let x = 110; x < 190; x++) if (Math.hypot(x - 150, y - 122) < 39 && b4(x, y) < 0.5) R.pset(x, y, hex('#ffd070'));
  // las dunas lejanas a contraluz con su filo
  for (let x = 0; x < 320; x++) { const yl = ri(118 + 5 * Math.sin(x * 0.03 + 2) + 3 * Math.sin(x * 0.08)); for (let y = yl; y < 180; y++) R.pset(x, y, y === yl ? hex('#f8a060') : rmp(pal(['#4a1a36', '#5e2240', '#74304a']), 2 - (y - yl) * 0.06 + Math.sin(x * 0.2 + y * 0.5) * 0.4, x, y)); }
  // la cresta de la procesión: duna oscura con el filo encendido y rizaduras
  for (let x = 0; x < 320; x++) { const yr = ri(yR7(x)); for (let y = yr; y < 180; y++) { let c = y === yr ? hex('#ffc070') : y === yr + 1 ? hex('#c86a48') : rmp(pal(['#1a0a18', '#260e1e', '#341426', '#441c2e']), 2.4 - (y - yr) * 0.05 + Math.sin(x * 0.09 + (y - yr) * 0.7) * 0.6 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.5, x, y); R.pset(x, y, c); } }
  // la duna de delante, abajo a la derecha, donde está Atom
  for (let x = 160; x < 320; x++) { const yf = ri(160 - (x - 160) * 0.08 + Math.sin(x * 0.05) * 2); for (let y = yf; y < 180; y++) R.pset(x, y, y === yf ? hex('#d88a58') : rmp(pal(['#2a1220', '#3a1a28', '#4e2432', '#6a3038']), 2.6 - (y - yf) * 0.08 + Math.sin(x * 0.12 + (y - yf) * 0.8) * 0.5 + (x - 160) * 0.004, x, y)); }
  for (let k = 0; k < 10; k++) { const x = ri(180 + h2(k, 71) * 130), y = ri(166 + h2(k, 72) * 12); R.pset(x, y, hex('#1a0a14')); R.pset(x + 1, y, hex('#8a4a40')); }
  // en primer término, a la izquierda: una peña y matojos secos a contraluz con su filo
  for (let x = 0; x < 120; x++) { const yt = ri(150 + Math.max(0, x - 40) * 0.35 - Math.max(0, 40 - x) * 0.25 + Math.sin(x * 0.5) * 1.5 + (h2(x >> 2, 8) > 0.7 ? 1 : 0)); for (let y = yt; y < 180; y++) R.pset(x, y, y === yt ? hex('#e8945a') : y === yt + 1 ? hex('#6a2a34') : rmp(pal(['#12060e', '#1c0a16', '#28101e']), 1.2 + Math.sin(y * 0.6 + x * 0.1) * 0.5 + (ns(x * 0.3, y * 0.3) - 0.5) * 0.8, x, y)); }
  for (const [bx, by, n] of [[26, 150, 9], [92, 158, 7], [300, 158, 8]]) for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + (k - n / 2) * 0.3, L = 7 + (k % 3) * 4; const ex = ri(bx + Math.cos(a) * L), ey = ri(by + Math.sin(a) * L); R.linea(bx, by, ex, ey, hex('#12060e')); R.pset(ex, ey, hex('#ffb868')); }
  // huellas de la procesión en la cresta y la ladera, con su sombra
  for (let k = 0; k < 26; k++) { const x = ri(k * 12 + 4 + (k % 2) * 3), y = ri(yR7(x) + 3 + (k % 2)); R.pset(x, y, hex('#120610')); R.pset(x + 1, y, hex('#120610')); R.pset(x, y + 1, hex('#5a2a36')); }
};
// una silueta con su manto, que camina (k: su fase); con estandarte el primero
const silueta = (x, y, t, k, est) => { const S = hex('#170914'), RIM = hex('#ffb868'), b = Math.floor(t * 5 + k * 0.7) % 2, X = ri(x), Y = ri(y) - (b ? 1 : 0);
  // las piernas que se alternan bajo el manto
  R.linea(X - 2 + b * 2, Y - 5, X - 3 + b * 3, ri(y), S); R.linea(X + 2 - b * 2, Y - 5, X + 3 - b * 3, ri(y), S);
  // el manto (hombros, vuelo) y la capucha con su pico
  R.poligono([[X - 4, Y - 17], [X + 4, Y - 17], [X + 5, Y - 5], [X - 5, Y - 5]], S); R.linea(X - 4, Y - 17, X - 5, Y - 6, S);
  R.disco(X, Y - 20, 3, S); R.poligono([[X - 3, Y - 21], [X + 2, Y - 25], [X + 3, Y - 20]], S);
  if (k % 4 === 2) { R.disco(X - 5, Y - 14, 3, S); R.pset(X - 7, Y - 15, RIM); }
  // el filo de luz del sol que tienen detrás
  R.pset(X - 3, Y - 22, RIM); R.pset(X + 3, Y - 21, RIM); R.linea(X - 5, Y - 15, X - 6, Y - 6, mez(RIM, S, 0.3)); R.linea(X + 5, Y - 15, X + 6, Y - 6, mez(RIM, S, 0.45));
  if (est) { R.linea(X + 5, Y - 4, X + 5, Y - 40, S); R.pset(X + 5, Y - 41, hex('#f0c040')); const v = ri(Math.sin(t * 3 + k) * 2); R.poligono([[X + 6, Y - 40], [X + 19 + v, Y - 39], [X + 18 + v, Y - 29], [X + 6, Y - 29]], S); R.disco(X + 12 + ri(v / 2), Y - 35, 2, hex('#f0c040')); R.pset(X + 10 + ri(v / 2), Y - 36, hex('#f0c040')); R.pset(X + 14 + ri(v / 2), Y - 36, hex('#f0c040')); R.linea(X + 6, Y - 29, X + 18 + v, Y - 29, hex('#e8a050')); R.linea(X + 6, Y - 40, X + 19 + v, Y - 39, mez(RIM, S, 0.3)); }
  else if (k % 3 === 1) { R.linea(X + 6, Y - 22, X + 7, ri(y), S); R.pset(X + 6, Y - 23, RIM); } };
const p7 = (t) => {
  fijo('p7', fondo7);
  // velos de nube que cruzan el sol a tres velocidades, y una bandada
  nubes(t, 8, 52, 12, pal(['#7a2a56', '#c04a4a', '#f8a860']), 1.1, 5);
  for (let k = 0; k < 5; k++) { const x = ri(((t - P7) * 18 + k * 9) % 360 - 20), y = ri(40 + k % 3 * 4 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 9 + k) > 0 ? -1 : 0; if (x > 270 && y < 48) continue; R.pset(x, y, K); R.pset(x - 1, y + a, K); R.pset(x + 1, y + a, K); R.pset(x - 2, y + a - 1, K); R.pset(x + 2, y + a - 1, K); }
  // la fila que sigue al estandarte por la cresta, sin pararse
  const av = (t - P7) * 9;
  for (let k = 0; k < 11; k++) { const x = 236 + av - k * 23; if (x < -10 || x > 330) continue; silueta(x, yR7(x) + 1, t, k, k === 0); }
  // Atom, abajo, los mira pasar; en «without asking questions» se vuelve con un «?»
  const vuelve = t > SIN - 0.1, sigue = ease(tramo(t, P7 + 0.2, SEGUIR - 0.25)), anda7 = sigue > 0 && sigue < 1;
  const pose7 = anda7 ? 'camina' : t > PREGUNTAS - 0.2 ? 'piensa' : vuelve ? 'brazos' : t > SEGUIR - 0.25 ? 'senala' : 'quieto';
  const r = AT.atom(R, lerp(226, 250, sigue), 174, t, { pose: pose7, dir: anda7 || vuelve ? 1 : -1, s: 2, habla: voz(t), cara: t > PREGUNTAS - 0.2 ? 'triste' : vuelve ? 'sorpresa' : 'normal' });
  if (t > PREGUNTAS - 0.1) bocata(268, 132 - tramo(t, PREGUNTAS - 0.1, PREGUNTAS + 0.15) * 4, '?');
  // la arena que el viento arranca de la cresta, a contraluz
  for (let k = 0; k < 18; k++) { const f = (t * 1.2 + k * 0.131) % 1, x0 = (k * 41) % 320, x = x0 + f * 24, y = yR7(x0) - f * 6; if (f < 0.85) R.pset(ri(x), ri(y), hex('#ffd890')); }
};

// ═══ 8 · el estudio de Atom: los caminos, todos malos, y el menos malo ═══
const NODOS = [[124, 84], [146, 70], [150, 82], [168, 56], [170, 72], [170, 86]];
const RAMAS8 = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];
const FINALES = [[3, [196, 40]], [3, [196, 54]], [4, [196, 68]], [5, [196, 78]], [5, [196, 89]]];
const MEJOR = 2;
const pizarra8 = (R, t, [x0, y0, x1, y1]) => {
  const tiza = hex('#e8ece0'), dib = tramo(t, FUTURO - 0.2, CAMINO + 0.3);
  const segs = [...RAMAS8.map(([a, b]) => [NODOS[a], NODOS[b]]), ...FINALES.map(([a, e]) => [NODOS[a], e])];
  segs.forEach(([[ax, ay], [bx, by]], k) => { const u = cl(dib * segs.length - k * 0.8); if (u <= 0) return; const ex = ax + (bx - ax) * u, ey = ay + (by - ay) * u; R.linea(ax, ay, ri(ex), ri(ey), tiza); R.linea(ax, ay - 1, ri(ex), ri(ey) - 1, tiza); R.linea(ax, ay + 1, ri(ex), ri(ey) + 1, hex('#9aa89a')); });
  if (dib > 0) { R.disco(124, 84, 2, tiza); }
  if (dib > 0 && dib < 1) { const k = Math.min(segs.length - 1, Math.floor(dib * segs.length / 0.8 * 0.8 + 0.0001)), j = segs.findIndex((_, i) => { const u = cl(dib * segs.length - i * 0.8); return u > 0 && u < 1; });
    const [[ax, ay], [bx, by]] = segs[j >= 0 ? j : k], u = j >= 0 ? cl(dib * segs.length - j * 0.8) : 1, tx = ri(ax + (bx - ax) * u), ty = ri(ay + (by - ay) * u);
    R.rect(tx, ty - 5, tx + 2, ty - 1, hex('#5a5a50')); R.rect(tx, ty - 5, tx + 1, ty - 1, hex('#f8f8f0')); R.pset(tx + 1, ty - 1, hex('#c8ccc0'));
    for (let q = 0; q < 4; q++) { const f = (t * 3 + q * 0.25) % 1; R.pset(ri(tx - 2 + q + Math.sin(t * 9 + q)), ri(ty + 1 + f * 6), hex('#c8d0c4')); } }
  // en «every path was bad», una X roja en cada final
  FINALES.forEach(([, [ex, ey]], k) => { const u = tramo(t, MALO - 0.1 + k * 0.1, MALO + 0.1 + k * 0.1); if (u <= 0) return; const s = 3; const rj = hex('#f07060');
    for (const o of [0, 1]) { R.linea(ex - s + o, ey - s, ex - s + o + ri(2 * s * Math.min(1, u * 2)), ey - s + ri(2 * s * Math.min(1, u * 2)), rj); if (u > 0.5) R.linea(ex + s + o, ey - s, ex + s + o - ri(2 * s * (u - 0.5) * 2), ey - s + ri(2 * s * (u - 0.5) * 2), rj); } });
  // en «least bad», el camino del medio se repasa en amarillo y se rodea
  const am = tramo(t, MENOS - 0.15, MENOS + 0.35);
  if (am > 0) { const Y = hex('#f8e060'), [, [ex, ey]] = FINALES[MEJOR];
    const ruta = [NODOS[0], NODOS[1], NODOS[4], [ex, ey]];
    for (let i = 0; i < ruta.length - 1; i++) { const u = cl(am * 3 - i); if (u <= 0) continue; const [ax, ay] = ruta[i], [bx, by] = ruta[i + 1]; R.linea(ax, ay - 1, ri(ax + (bx - ax) * u), ri(ay - 1 + (by - ay) * u), Y); R.linea(ax, ay, ri(ax + (bx - ax) * u), ri(ay + (by - ay) * u), Y); }
    if (am >= 1) for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; R.pset(ri(ex + Math.cos(a) * 7), ri(ey + Math.sin(a) * 6), Y); } }
  // la manita de tiza del principio: un punto de partida («tú»)
  if (dib > 0) { R.pset(121, 89, tiza); R.pset(127, 89, tiza); R.linea(122, 90, 126, 90, tiza); }
};
const p8 = (t) => {
  const o = { encuadre: 'estudio', pizarra: pizarra8 };
  T.estudio(R, t, o);
  // Atom entra, saluda a cámara en «asking you», señala la pizarra cuando dibuja y en «least bad»
  const ll = ease(tramo(t, P8, PREGUNTO - 0.15)), ax = lerp(296, 232, ll);
  const habla = voz(t);
  const pose = ll > 0 && ll < 1 ? 'camina' : t > PREGUNTO - 0.1 && t < FUTURO - 0.6 ? 'saluda' : (t > FUTURO - 0.3 && t < MALO - 0.1) || t > MENOS - 0.2 ? 'senala' : t > MALO - 0.1 && t < MENOS - 0.2 ? 'brazos' : 'quieto';
  const cara = t > MENOS ? 'sonrisa' : t > MALO - 0.1 ? 'triste' : t > FUTURO ? 'sorpresa' : 'sonrisa';
  AT.atom(R, ax, 160, t, { pose, dir: -1, s: 2, cara, habla });
  T.estudioDelante(R, t, o);
};

// ═══ 9 · inserto propio: la mesa de Atom, de noche, con el portátil y los comentarios ═══
const LAD9 = pal(['#3a2018', '#52301e', '#6a4026', '#84522e', '#9a6438']);
const MAD9 = pal(['#2e1a10', '#4a2c18', '#6a4022', '#8a5630', '#a86c3c', '#c48650']);
const fondo9 = () => {
  // la pared de ladrillo del estudio, con su llaga, a la luz de la lámpara
  for (let y = 0; y < 108; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 6), off = (fila & 1) * 9, xx = (x + off) % 18, yy = y % 6;
    const l = 1 - Math.hypot(x - 70, y - 70) / 300; let v = 1.6 + (h2(Math.floor((x + off) / 18), fila, 4) - 0.5) * 1.1 + l * 1.4 + (ns(x * 0.3, y * 0.3) - 0.5) * 0.6;
    if (yy === 0 || xx === 0) v = 0.4; R.pset(x, y, rmp(LAD9, v, x, y)); }
  // la ventana de noche (x 14–82, y 12–86), con cortina
  for (let y = 12; y <= 86; y++) for (let x = 14; x <= 82; x++) R.pset(x, y, x < 17 || x > 79 || y < 15 || y > 83 ? hex('#3a2416') : rmp(pal(['#0a0e26', '#121a3a', '#1c2850']), (y - 15) / 30 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.6, x, y));
  R.disco(62, 32, 6, hex('#efe8d8')); R.disco(64, 30, 5, hex('#121a3a'));
  for (let x = 17; x <= 79; x++) { const tb = 66 - (h2(x >> 3, 2) * 12 | 0); for (let y = tb; y <= 83; y++) R.pset(x, y, hex('#141420')); }
  R.linea(48, 15, 48, 83, hex('#3a2416')); R.linea(17, 48, 79, 48, hex('#3a2416'));
  for (let y = 8; y <= 92; y++) for (let x = 0; x <= 14; x++) R.pset(x, y, Math.sin(x * 1.3 + y * 0.05) > 0.2 ? hex('#7a2a2a') : hex('#5a1c1e'));
  R.rect(0, 6, 92, 8, hex('#6a4a2a'));
  // el cuadro de las dos lunas sobre las dunas
  R.rect(112, 22, 156, 54, K); R.rect(113, 23, 155, 53, hex('#b08a40')); R.rect(116, 26, 152, 50, hex('#1c2448'));
  for (let x = 116; x <= 152; x++) { const yd = ri(42 + Math.sin(x * 0.2) * 3); for (let y = yd; y <= 50; y++) R.pset(x, y, y === yd ? hex('#f0b060') : hex('#c07838')); }
  R.disco(140, 32, 3, hex('#f0e8d0')); R.disco(126, 34, 2, hex('#e8a080'));
  // la balda con libros (por debajo de la esquina de Atom)
  R.rect(196, 74, 312, 77, K); R.rect(197, 74, 311, 75, hex('#8a5a30'));
  for (let k = 0, x = 200; x < 296; k++) { const w = 4 + (k * 7) % 4, h = 14 + (k * 5) % 7, c = ['#7a2a2a', '#2a4a7a', '#c89a40', '#3a6a3a', '#6a3a6a', '#a85a2a'][k % 6]; R.rect(x, 74 - h, x + w, 73, K); R.rect(x + 1, 75 - h, x + w - 1, 73, hex(c)); R.pset(x + 2, 74 - h + 3, hex('#e8c060')); x += w + 1; if (k === 9) x += 10; }
  R.disco(298, 68, 5, K); R.disco(298, 68, 4, hex('#3a7ab0')); R.pset(296, 66, hex('#8ac0e0')); R.rect(296, 73, 300, 73, hex('#b08a40'));
  // el canto de la mesa y el tablero de nogal con vetas
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const l = 1 - Math.hypot(x - 70, (y - 140) * 1.4) / 260; let v = 2.2 + Math.sin(y * 0.9 + ns(x * 0.02, y * 0.15) * 7) * 0.6 + l * 1.8 + (ns(x * 0.05, y * 0.6) - 0.5) * 0.6;
    if (y < 111) v = y === 108 ? 0 : 4.6; R.pset(x, y, rmp(MAD9, v, x, y)); }
  // cosas de la mesa: el cuaderno, los lápices en su bote, la pila de libros
  R.poligono([[20, 160], [70, 156], [74, 176], [24, 179]], K); R.poligono([[22, 161], [69, 157], [72, 175], [25, 178]], hex('#e8e0cc')); for (let k = 0; k < 5; k++) R.linea(28, 165 + k * 3, 66, 162 + k * 3, hex('#a8b0c0'));
  R.linea(30, 172, 58, 170, hex('#3a5a9a'));
  R.rect(290, 96, 312, 128, K); R.rect(291, 97, 311, 127, hex('#3a6a8a')); for (const [dx, c] of [[3, '#e8c040'], [8, '#c83a3a'], [13, '#3a9a5a'], [17, '#e8e8e8']]) { R.linea(291 + dx, 97, 289 + dx, 86, K); R.linea(292 + dx, 97, 290 + dx, 87, hex(c)); }
  for (let k = 0; k < 3; k++) { const y = 140 + k * 7, c = ['#7a3a2a', '#2a5a4a', '#c8a050'][k]; R.rect(262 - k, y, 314 - k, y + 6, K); R.rect(263 - k, y + 1, 313 - k, y + 5, hex(c)); R.linea(264 - k, y + 2, 312 - k, y + 2, hex('#e8e0c8')); }
};
const COMENTS = [['?', '#f0c040', 0], ['!', '#f07060', 1], ['corazon', '#f06a8a', 2], ['X', '#8ac0f0', 3], ['?', '#9ae07a', 4]];
const corazon = (x, y, c) => { for (const [i, j] of [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]]) R.pset(x + i, y + j, c); };
const burbuja = (x, y, w, ic, col, a = 1) => { const X = ri(x), Y = ri(y); R.rect(X - 1, Y - 1, X + w + 1, Y + 12, K); R.rect(X, Y, X + w, Y + 11, hex('#f4f0e6')); R.rect(X, Y + 9, X + w, Y + 11, hex('#d8d0c0'));
  R.poligono([[X + 4, Y + 12], [X + 9, Y + 12], [X + 4, Y + 16]], K); R.poligono([[X + 5, Y + 12], [X + 8, Y + 12], [X + 5, Y + 14]], hex('#d8d0c0'));
  R.disco(X + 5, Y + 5, 3, hex(col)); R.linea(X + 11, Y + 3, X + w - 3, Y + 3, hex('#a8a090')); R.linea(X + 11, Y + 7, X + w - 8, Y + 7, hex('#c0b8a8'));
  if (ic === 'corazon') corazon(X + w - 9, Y + 3, hex('#e84a6a')); else R.icono(ic, X + w - 9, Y + 2, hex(col === '#f4f0e6' ? '#3a3a3a' : '#2a2a3a'), hex('#c8c0b0')); };
const p9 = (t) => {
  fijo('p9', fondo9);
  // la lámpara de latón con su cono de luz sobre la mesa, que parpadea un poco
  { const f = 0.85 + 0.15 * Math.sin(t * 7) * Math.sin(t * 3.1); R.linea(40, 108, 46, 66, hex('#8a6a2a')); R.linea(41, 108, 47, 66, hex('#c8a040')); R.poligono([[34, 56], [56, 50], [60, 64], [40, 70]], K); R.poligono([[36, 57], [55, 51], [58, 63], [41, 68]], hex('#c8a040')); R.linea(37, 58, 54, 52, hex('#f0d070'));
    for (let y = 70; y < 172; y++) for (let x = 0; x < 160; x++) { const u = (y - 70) / 100, a = 50 - 40 * u, b = 56 + 60 * u; if (x > a && x < b && b4(x, y) < 0.16 * f) aclara(x, y, hex('#ffe8b0'), 0.35); }
    R.rect(28, 108, 54, 112, K); R.rect(29, 108, 53, 111, hex('#b08a3a')); }
  // la taza que humea
  { R.rect(46, 150, 60, 166, K); R.rect(47, 151, 59, 165, hex('#d8d0c0')); R.rect(47, 151, 49, 165, hex('#f4f0e6')); R.disco(44, 157, 4, K); R.disco(44, 157, 2, hex('#2e1a10')); R.rect(48, 151, 58, 153, hex('#4a2a14'));
    for (let i = 44; i < 64; i++) if (b4(i, 167) < 0.5) sombrea(i, 167, 0.3);
    for (let k = 0; k < 6; k++) { const f = (t * 0.6 + k / 6) % 1, x = 53 + Math.sin(f * 9 + k) * 3, y = 148 - f * 26; if (b4(ri(x), ri(y)) < 0.6 * (1 - f)) R.pset(ri(x), ri(y), hex('#e8e0d0')); } }
  // el portátil: la base en perspectiva y la pantalla
  R.poligono([[78, 168], [206, 168], [218, 180], [66, 180]], K); R.poligono([[80, 169], [204, 169], [215, 179], [69, 179]], hex('#8a8e98'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) R.rect(86 + i * 10 + j * 2, 171 + j * 3, 92 + i * 10 + j * 2, 172 + j * 3, hex('#4a4e58'));
  R.rect(84, 82, 200, 168, K); R.rect(86, 84, 198, 166, hex('#3a3e48')); R.rect(90, 88, 194, 162, hex('#141a2e'));
  const [sx0, sy0, sx1, sy1] = [90, 88, 194, 162];
  R.recorte([sx0, sy0, sx1, sy1]);
  const feed = t > LEO - 0.1;
  if (!feed) {
    // las dos opciones: como Paul (el camino, el menos malo) o negarse (la X)
    for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) R.pset(x, y, b4(x, y) < 0.15 ? hex('#1e2640') : hex('#161c32'));
    const a1 = tramo(t, COMOPAUL - 0.1, COMOPAUL + 0.2), a2 = tramo(t, NEGARTE - 0.1, NEGARTE + 0.2);
    for (const [x0, act, col] of [[96, a1, '#f0c040'], [146, a2, '#f07060']]) { R.linea(x0, 98, x0 + 42, 98, act > 0 ? hex(col) : hex('#4a5470')); R.linea(x0, 150, x0 + 42, 150, act > 0 ? hex(col) : hex('#4a5470')); R.linea(x0, 98, x0, 150, act > 0 ? hex(col) : hex('#4a5470')); R.linea(x0 + 42, 98, x0 + 42, 150, act > 0 ? hex(col) : hex('#4a5470'));
      if (act > 0 && Math.sin(t * 10) > -0.5) { R.linea(x0 - 1, 97, x0 + 43, 97, hex(col)); R.linea(x0 - 1, 151, x0 + 43, 151, hex(col)); } }
    // Paul con la venda, de pie en un camino que se aleja
    for (let y = 118; y <= 149; y++) { const w = (y - 116) * 0.55; for (let x = ri(117 - w); x <= ri(117 + w); x++) R.pset(x, y, b4(x, y) < 0.5 ? hex('#a8844a') : hex('#8a6a3a')); }
    for (let x = 97; x <= 137; x++) R.pset(x, 117, hex('#4a5470'));
    { const ua = ease(tramo(t, COMOPAUL - 0.1, NEGARTE - 0.2)), px = ri(lerp(106, 114, ua)), py = ri(lerp(147, 141, ua)), anda = ua > 0 && ua < 1;
      const r = R.actor(PA.paulCiego, px, py, t, { dir: 1, anda, triste: a2 > 0 });
      const [cx, cy] = r.cabeza, VD = pal(['#8a7e66', '#d8ccb0', '#f2ead6']), yv = cy + 4;
      for (let i = -6; i <= 6; i++) { R.pset(cx + 3 + i, yv, VD[1]); R.pset(cx + 3 + i, yv + 1, VD[2]); R.pset(cx + 3 + i, yv + 2, VD[0]); }
      const ond = ri(Math.sin(t * 6)); R.pset(cx - 4, yv + 1, VD[1]); R.pset(cx - 5, yv + 2 + ond, VD[1]); R.pset(cx - 6, yv + 3 + ond, VD[0]); }
    // la X grande de negarse
    { const c = a2 > 0 ? hex('#f07060') : hex('#8a90a8'); for (let k = -10; k <= 10; k++) { R.rect(167 + k, 124 + k, 168 + k, 125 + k, c); R.rect(167 + k, 124 - k, 168 + k, 125 - k, c); } }
  } else {
    // los comentarios entran desde abajo, uno tras otro
    for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) R.pset(x, y, y < 96 ? hex('#2a3a6a') : hex('#e8e4dc'));
    R.disco(97, 92, 2, hex('#f06060')); R.linea(104, 92, 150, 92, hex('#8a9ac8'));
    const sube = (t - LEO) * 22;
    for (let k = 0; k < 6; k++) { const y = 150 + k * 18 - Math.min(sube, 18 * 4 + 6); if (y > sy1 || y < 86) continue; const [ic, col] = COMENTS[k % COMENTS.length]; burbuja(94, y, 94, ic, col); }
  }
  R.recorte(null);
  R.pset(142, 86, hex('#5a6a7a'));
  // el reflejo del cristal
  for (let i = 0; i < 18; i++) if (b4(i, 0) < 0.5) R.pset(170 + i, 90 + i, hex('#2a3248'));
  // los comentarios salen de la pantalla y suben hacia Atom
  if (t > COMENT - 0.35) COMENTS.forEach(([ic, col], k) => { const t0 = COMENT - 0.35 + k * 0.32, u = tramo(t, t0, t0 + 0.9); if (u <= 0) return; const x = lerp(150, 168 + (k % 2) * 40 - k * 8, ease(u)), y = lerp(110, 20 + (k % 3) * 22, ease(u)) + Math.sin(t * 2 + k) * 1.5; if (x > 250) return; burbuja(x, y, 44, ic, col); });
  // Atom en la mesa, a la derecha del portátil: señala a Paul, se encoge en «refuse to choose», mira a cámara y señala los comentarios
  const pose = t > COMOPAUL - 0.15 && t < NEGARTE - 0.3 ? 'senala' : t > NEGARTE - 0.2 && t < LEO - 0.2 ? 'brazos' : t > COMENT - 0.3 ? (t > COMENT + 0.9 ? 'saluda' : 'senala') : 'quieto';
  const dir = t > COMENT - 0.3 && t < COMENT + 0.9 ? -1 : t > COMENT + 0.9 ? 1 : -1;
  AT.atom(R, 236, 166, t, { pose, dir, s: 2, habla: voz(t), cara: t > COMENT - 0.3 ? (t > FIN - 0.7 ? 'guino' : 'sonrisa') : t > NEGARTE - 0.2 ? 'sorpresa' : 'normal' });
};

const año = (t) => (t < P4 ? 12 : null);
const efectos = [[0.2, 'viento', { dur: 3.3 }], [BORRA + 0.05, 'brillo'], [GOBIERNA, 'publico'], [DESTINO, 'campana'],
  [DUNE + 0.25, 'interruptor'], [TRES - 0.2, 'interruptor'], [DIECISIETE, 'tic'], [SALTO - 0.05, 'whoosh'], [CHANI - 0.15, 'flash'], [CONTRA, 'toc'],
  [PREGUNTA, 'pop'], [GUSANO - 0.4, 'avalancha'], [P7 + 0.1, 'pasos'], [PREGUNTAS - 0.1, 'pop'],
  [FUTURO - 0.1, 'lapiz'], [MALO - 0.1, 'lapiz'], [MENOS, 'brillo'], [COMOPAUL, 'bip'], [NEGARTE, 'bip'], [COMENT - 0.35, 'pop'], [COMENT + 0.3, 'pop'], [COMENT + 0.9, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año });
'''

E['pa-cierre'] = ('Cierre', COMENTARIO, CUERPO.replace('@CONSTS@', CONSTS))
