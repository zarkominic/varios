E = {}
E['lf-everglades'] = ('Grassrivers, el río de hierba', '''// LF-EVERGLADES (frases 7–10), sin cartela, ritmo tranquilo. Quince planos:
// 1. el río de hierba (everglades/rio): el turista llega por la pasarela y en «Everglades» señala el letrero; pasa la lancha;
// 2. INSERTO del agua somera desde arriba: parece quieta; en «still swamp» cae una hoja que empieza a derivar, en «They're»
//    la corriente tumba la hierba y en «shallow» entra una garceta con el agua por los tobillos (corta en «And the name»);
// 3. INSERTO del corte del río de hierba, del lago (izquierda) al mar (derecha): la lámina de agua sobre la turba y la
//    caliza; un pulso claro sale del lago en «Okeechobee» y llega al mar en «sea»; la hoja sigue derivando (corta en «river»);
// 4. INSERTO del porche de 1947: la escritora teclea, coge su libro y en «River of Grass» lo alza hacia el río (corta en
//    «That's why»);
// 5. el lago del golf (golf/lago): ojos de caimán que asoman uno a uno desde «alligators»; en «deadlier predators», unos
//    ojos grandes y un «?» (corta en «Rockstar»);
// 6. el dique del Okeechobee (cana/dique): el trampero de la agencia apunta los ojos que cuenta en su tablilla (corta en
//    «And the alligators alone»);
// 7. el mapa de Florida: el contador sube a 1,300,000 en «million» y en «67» se llenan las marcas (corta en «About»);
// 8. la orilla (rio/orilla): el aligátor toma el sol; el cocodrilo sale del agua en «crocodiles» y se pone a su lado (corta
//    en «And South Florida»);
// 9. INSERTO de la orilla de barro (gag 3): la mano de Atom trae las dos cartulinas en «tell them apart» y pone la U ante
//    el hocico en «U-shaped»; visto bueno (corta en «side by side»);
// 10. INSERTO de la orilla de arena: la cartulina V ante el cocodrilo en «V» (corta tras «snout»);
// 11. INSERTO del tronco: la lupa pasa sobre la boca cerrada y en «lower teeth» se ven los dientes de abajo (corta en
//    «mouth closed»);
// 12. INSERTO del tablón de la estación: la gráfica se dibuja sola y se hunde en «wiped out by hunting» (corta en «So why»);
// 13. INSERTO del nido: en «endangered» se clava el cartel «!», en «protection» suben las estacas y en «bounced back» salen
//    las crías (corta en «went on»);
// 14. INSERTO del escritorio: en «1987» llega el sello y en «recovered» estampa 1987 con su visto bueno (corta en «in 1987»);
// 15. el campo de golf (golf general): un caimán cruza la calle, el golfista espera en «paths cross»; 23,000,000 en
//    «23 million» (corta en «Now»).''', r'''
const a = (f) => en('rio', f), b = (f) => en('caimanes', f), c = (f) => en('cocodrilo', f), d = (f) => en('recupera', f);
// los cortes, en la palabra
const P2 = a(0.1802), P3 = a(0.5065), P4 = a(0.7608), P5 = b(0), P6 = b(0.3654), P7 = b(0.6810), P8 = c(0), P9 = c(0.3669), P10 = c(0.6713), P11 = c(0.8941);
const P12 = d(0), P13 = d(0.2339), P14 = d(0.5174), P15 = d(0.7179);
// las palabras que mandan
const EVERGLADES = a(0.1226), CLUE = a(0.2175), STILL = a(0.3369), THEYRE = a(0.3999), SHALLOW = a(0.4884), CREEPS = a(0.5619), LAKE = a(0.6334), DOWN = a(0.6813), SEA = a(0.7187);
const Y1947 = a(0.7960), WRITER = a(0.8909), NAMED = a(0.9015), RIVER = a(0.9452);
const ALLIG = b(0.0689), START = b(0.1163), DEADLIER = b(0.2444), PLENTY = b(0.4603), AGENCY = b(0.5540), ABOUT = b(0.6810), MILLION = b(0.7521), LIVE = b(0.7996), N67 = b(0.8921), COUNTIES = b(0.9585);
const RECORD = c(0.0957), CROCS = c(0.3218), APART = c(0.4609), ALLIGATOR = c(0.5376), USHAPED = c(0.6202), SNOUT = c(0.6474), POINTED = c(0.7463), VEE = c(0.8126), LOWER = c(0.9517), TEETH = c(0.9626);
const NEARLY = d(0.1457), HUNTING = d(0.1986), ENDANGERED = d(0.2692), PROTECTION = d(0.3967), BOUNCED = d(0.4428), Y1987 = d(0.5281), RECOVERED = d(0.6605);
const STATE = d(0.7591), M23 = d(0.7924), OFTEN = d(0.8797), PATHS = d(0.9493);

const K = hex('#14101c'), BL = hex('#fbf8f0'), MANGA = '#3a4a8a';
const ease = (u) => u * u * (3 - 2 * u);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, q) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * q) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * q) << 8) | Math.round(r1 + ((c2 & 255) - r1) * q)) >>> 0; };
const rc = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); };
const ovalo = (cx, cy, rx, ry, c) => { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); R.linea(Math.round(cx - w), Math.round(cy + j), Math.round(cx + w), Math.round(cy + j), c); } };
const tinta = (x, y, c, q) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, q)); };
const destello = (x, y, r, col = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, col); R.pset(x, y + i, col); } if (r > 1) for (const [p, q] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) R.pset(x + p, y + q, col); };
const globoIcono = (nombre, cx, cy, u, esc = 2) => { if (u <= 0) return; const s = Math.min(1, u * 3), w = 7 * esc + 6, hh = 8 * esc + 4, y = Math.round(cy - 3 * s);
  const x0 = Math.round(cx - w / 2); rc(x0 - 1, y, x0 + w + 1, y + hh, K); rc(x0, y - 1, x0 + w, y + hh + 1, K); rc(x0, y, x0 + w, y + hh, BL); rc(x0, y + hh, x0 + w, y + hh, hex('#d0d4e0'));
  R.poligono([[cx - 3, y + hh + 1], [cx + 2, y + hh + 1], [cx - 2, y + hh + 5]], K); R.poligono([[cx - 2, y + hh], [cx + 1, y + hh], [cx - 2, y + hh + 3]], BL);
  R.icono(nombre, Math.round(cx - (nombre === '!' ? 1.5 : 2.5) * esc), y + 2, nombre === '!' ? hex('#e83a3a') : hex('#3a5ac8'), hex('#9aa0b8'), esc); };
// el lienzo donde se pinta ahora (también durante un fundido)
const lienzo = () => { const x = R.usar(null); R.usar(x); return x; };
// un fondo fijo en su búfer: se pinta una vez y se copia en cada fotograma
const FIJOS = {};
const fijoM = (clave, pinta) => { let bf = FIJOS[clave]; if (!bf) { bf = R.nuevo(); const prev = R.usar(bf); pinta(); R.usar(prev); FIJOS[clave] = bf; } const cur = lienzo(); for (let i = 0; i < 57600; i++) { const v = bf[i]; if (v) cur[i] = v; } };
const fijo = (clave, pinta) => { let bf = FIJOS[clave]; if (!bf) { bf = R.nuevo(); const prev = R.usar(bf); pinta(); R.usar(prev); FIJOS[clave] = bf; } R.copiar(bf); };
// zonas tranquilas: la de Atom y la barra del año
const calma = (x, y) => (x > 264 && y < 50) || (x < 178 && y < 24);
// ojos de un caimán que asoma: aro de onda al salir
const asoma = (x, y, t, t0, o = {}) => { if (t < t0) return; const u = tramo(t, t0, t0 + 0.5), s = o.s ?? 1.2;
  if (t < t0 + 1.2) { const r = Math.round(4 + (t - t0) * 12 * s), q = 0.5 * (1 - (t - t0) / 1.2); for (let k = 0; k < 40; k++) { const an = k / 40 * Math.PI * 2; tinta(x + Math.cos(an) * r, y + Math.sin(an) * r * 0.35, BL, q); } }
  T.a_caiman(R, x, Math.round(y + (1 - u) * 3), t, { especie: o.especie ?? 'caiman', s, dir: o.dir ?? 1, agua: 1, parpadeo: true }); };

// ── la luz del cielo para los insertos con vista afuera (tramado, nubes de tres tonos a tres velocidades y pájaros) ──
const CIELO = [hex('#5a8ad8'), hex('#6a9ae0'), hex('#80b0e8'), hex('#98c4ee'), hex('#b4d6f0'), hex('#d0e6f2')];
const NUBE = [hex('#fbfaf6'), hex('#dfe4ee'), hex('#b4bccc')];
const cieloVivo = (t, yH) => { const cur = lienzo();
  for (let y = 0; y < yH; y++) { const f = y / yH * (CIELO.length - 1); for (let x = 0; x < 320; x++) { const i = Math.min(CIELO.length - 1, Math.floor(f + (((x * 7 + y * 13) & 3) / 4))); cur[y * 320 + x] = CIELO[i]; } }
  for (let k = 0; k < 6; k++) { const v = [2, 4, 7][k % 3], cx = ((k * 83 + t * v) % 420) - 50, cy = 30 + (k % 3) * 18 + (k > 2 ? 10 : 0), w = 16 + (k % 3) * 8;
    for (let j = 0; j < 4; j++) { const bx = cx + (j - 1.5) * w * 0.45, by = cy - (j === 1 || j === 2 ? 4 : 0), r = Math.round(w * (j === 1 || j === 2 ? 0.42 : 0.3));
      for (let yy = -r; yy <= r; yy++) for (let xx = -r * 1.4; xx <= r * 1.4; xx++) { const X = Math.round(bx + xx), Y = Math.round(by + yy); if (X < 0 || X > 319 || Y < 0 || Y >= yH || Math.hypot(xx / 1.4, yy) > r || calma(X, Y)) continue;
        cur[Y * 320 + X] = yy > r * 0.35 ? NUBE[2] : yy > -r * 0.1 || ((X + Y) & 1) ? NUBE[1] : NUBE[0]; } } }
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 120 + t * (9 + k * 3)) % 380) - 30), y = 36 + k * 9 + Math.round(Math.sin(t * 2 + k) * 2), ala = Math.floor(t * 6 + k) % 2;
    if (y < yH - 2 && !calma(x, y)) { R.pset(x, y, K); R.pset(x - 1, y - ala, K); R.pset(x + 1, y - ala, K); R.pset(x - 2, y - 1 + ala, K); R.pset(x + 2, y - 1 + ala, K); } } };

// ── 1 · el río de hierba: el turista llega por la pasarela y señala el letrero ─────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'rio', flechas: 0 }, g = T.everglades(R, t, o);
  const u = tramo(t, 0.2, EVERGLADES - 0.4), x = Math.round(lerp(-18, 40, u)), mira = t > EVERGLADES - 0.3;
  R.actor(EL.turistaLF, x, g.suelo, t, { dir: mira ? -1 : 1, anda: u > 0 && u < 1, dedo: mira && t < EVERGLADES + 1.0, sonrisa: t > EVERGLADES + 0.4 });
  // una pareja que pasea al fondo de la pasarela y se para a mirar la garza
  const v = tramo(t, 0, 3.4), px = Math.round(lerp(250, 196, v));
  R.actor(EL.fanaLF, px, g.suelo, t, { dir: -1, anda: v < 1, dedo: v >= 1 && t > 3.6 });
  R.actor(EL.fanLF, px + 15, g.suelo, t, { dir: -1, anda: v < 1, sonrisa: v >= 1 });
  T.evergladesDelante(R, t, o);
};

// ── 2 · INSERTO: el agua somera de cerca, desde arriba ─────────────────────────────────────────────────────────────
// ruido suave (para texturas que no se lean como rayas)
const vn = (x, y, s, k) => { const X = Math.floor(x / s), Y = Math.floor(y / s), fx = x / s - X, fy = y / s - Y, a0 = h(X, Y, k), b0 = h(X + 1, Y, k), c0 = h(X, Y + 1, k), d0 = h(X + 1, Y + 1, k), ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return a0 + (b0 - a0) * ux + (c0 - a0) * uy + (a0 - b0 - c0 + d0) * ux * uy; };
const CAL1 = hex('#c8b884'), CAL2 = hex('#b4a470'), CALL = hex('#ddd0a0'), PIEDRA = hex('#6e6248'), PERI1 = hex('#9a8a3a'), PERI2 = hex('#76662a'), AGUA = hex('#2a7a7a'), AGUAH = hex('#1a5a62');
const fondoAgua = () => fijo('agua', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const n = h(x >> 1, y >> 1, 3), m = vn(x, y, 22, 4) * 0.7 + vn(x, y, 7, 5) * 0.3;
    let col = m > 0.66 ? PERI2 : m > 0.55 ? PERI1 : m < 0.3 ? CAL2 : CAL1;
    if (n > 0.94) col = PIEDRA; else if (n < 0.05) col = CALL;
    R.pset(x, y, mez(col, y < 70 ? AGUAH : AGUA, 0.4 + (1 - y / 180) * 0.24)); }
  // guijarros con su luz y su sombra
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 5, 7) * 316), y = Math.round(26 + h(k, 6, 7) * 152); if (calma(x, y)) continue; const r = 1 + Math.round(h(k, 7, 7) * 2);
    ovalo(x + 1, y + 1, r + 1, r, mez(R.pget(x, y), K, 0.3)); ovalo(x, y, r + 1, r, mez(hex('#8a7e60'), AGUA, 0.35)); R.pset(x - 1, y - 1, mez(CALL, AGUA, 0.3)); }
  // conchas de caracol manzana y ramitas hundidas
  for (let k = 0; k < 14; k++) { const x = Math.round(20 + h(k, 8, 7) * 280), y = Math.round(40 + h(k, 9, 7) * 130); if (calma(x, y)) continue; ovalo(x, y, 2, 2, mez(hex('#d8b878'), AGUA, 0.3)); R.pset(x, y, mez(hex('#8a6a3a'), AGUA, 0.3)); R.pset(x + 1, y - 1, mez(hex('#8a6a3a'), AGUA, 0.3)); }
  for (let k = 0; k < 10; k++) { const x = Math.round(30 + h(k, 10, 7) * 260), y = Math.round(40 + h(k, 11, 7) * 130); if (calma(x, y)) continue; R.linea(x, y, x + 11, y + 3, mez(hex('#4a3a22'), AGUA, 0.35)); R.linea(x + 5, y + 1, x + 7, y - 3, mez(hex('#4a3a22'), AGUA, 0.35)); }
});
const HOJAJ = [hex('#2a5a1e'), hex('#4a8a2a'), hex('#7ab83a'), hex('#c8b048')];
const juncoMata = (bx, by, t, k, incl) => { ovalo(bx + 2, by + 2, 10, 3, mez(R.pget(bx, by + 3), K, 0.35));
  for (let j = 0; j < 9; j++) { const largo = 18 + h(k, j, 3) * 20, x0 = bx + (j - 4) * 2, lean = incl + (j - 4) * 0.12 + Math.sin(t * 1.6 + j + k) * 0.05;
    const x1 = Math.round(x0 + lean * largo), y1 = Math.round(by - largo); R.linea(Math.round(x0) + 1, by, x1 + 1, y1, HOJAJ[0]); R.linea(Math.round(x0), by, x1, y1, HOJAJ[1 + (j % 3)]); } };
const nenufar = (x, y, t, k, flor) => { const dy = Math.round(Math.sin(t * 1.2 + k) * 0.6); ovalo(x + 1, y + 2 + dy, 8, 4, mez(R.pget(x, y + 3), K, 0.35)); ovalo(x, y + dy, 8, 4, K); ovalo(x, y + dy, 7, 3, hex('#3a7a2a')); ovalo(x - 1, y - 1 + dy, 5, 2, hex('#5aa03a'));
  R.linea(x, y + dy, x + 7, y + dy + 1, AGUA); R.linea(x, y + dy, x + 7, y + dy - 1, AGUA); R.linea(x - 4, y - 1 + dy, x - 1, y - 2 + dy, hex('#8ac85a'));
  if (flor) { const fx = x - 3, fy = y - 2 + dy; for (const [p, q] of [[0, -2], [-2, 0], [2, 0], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]]) R.pset(fx + p, fy + q, BL); R.pset(fx, fy, hex('#f8d040')); } };
// la garceta (sc: escala), de perfil mirando a la izquierda; prof: hasta dónde le llega el agua
const garceta = (x, y, t, anda, prof, sc = 2) => { x = Math.round(x); y = Math.round(y); const pa = anda ? Math.floor(t * 4) % 2 : 0, AM = hex('#f0c030'), S = (v) => Math.round(v * sc);
  for (let i = -S(5); i <= S(5); i++) tinta(x + i, y + 2, BL, 0.25);
  for (const [dx, sg] of [[-1, -1], [1, 1]]) { const fx = x + S(dx) + sg * pa * 2; R.linea(x + S(dx), y - S(12), fx, y, K); R.linea(x + S(dx) + 1, y - S(12), fx + 1, y, hex('#2a2a2a')); R.linea(fx - 2, y, fx + 2, y, K);
    for (let yy = y - prof; yy <= y; yy++) { tinta(fx, yy, AGUA, 0.55); tinta(fx + 1, yy, AGUA, 0.55); } }
  ovalo(x + S(1), y - S(15), S(6) + 1, S(3) + 1, K); ovalo(x + S(1), y - S(15), S(6), S(3), BL); ovalo(x + S(2), y - S(14), S(4), S(1), hex('#d8dce8'));
  R.poligono([[x + S(5), y - S(16)], [x + S(10), y - S(13)], [x + S(5), y - S(13)]], BL);
  for (let w = 0; w < sc + 1; w++) { R.linea(x - S(3) + w, y - S(16), x - S(4) + w, y - S(22), w === 0 ? K : BL); R.linea(x - S(4) + w, y - S(22), x - S(2) + w, y - S(26), w === 0 ? K : BL); }
  ovalo(x - S(3), y - S(27), S(2), S(1) + 1, K); ovalo(x - S(3), y - S(27), S(2) - 1, S(1), BL); R.pset(x - S(4), y - S(27), K);
  R.linea(x - S(5), y - S(27), x - S(11), y - S(26), AM); R.linea(x - S(5), y - S(27) + 1, x - S(11), y - S(26) + 1, hex('#c89a20')); };
const p2 = (t) => {
  fondoAgua();
  const cor = tramo(t, STILL + 0.3, THEYRE + 0.8), cur = lienzo();
  // el reflejo de las nubes que pasa
  for (let k = 0; k < 2; k++) { const cx = ((k * 190 + t * (4 + cor * 8)) % 520) - 100, cy = 70 + k * 60;
    for (let y = Math.max(0, cy - 13); y < Math.min(180, cy + 13); y++) { const w = Math.round(70 * Math.sqrt(Math.max(0, 1 - ((y - cy) / 13) ** 2))); for (let x = Math.max(0, Math.round(cx - w)); x < Math.min(320, cx + w); x++) if (!calma(x, y) && ((x + y) & 1)) cur[y * 320 + x] = mez(cur[y * 320 + x], hex('#d8eef0'), 0.16); } }
  // la red de luz del fondo, que corre más cuando corre el agua
  for (let k = 0; k < 120; k++) { const v = 2 + cor * 16, x = ((h(k, 1, 9) * 380 + t * v) % 380) - 30, y = Math.round(h(k, 2, 9) * 176) + 2, L = 2 + Math.round(h(k, 3, 9) * 4), ph = Math.sin(t * 2.2 + k);
    if (ph < -0.2 || calma(x, y)) continue; for (let i = 0; i < L; i++) tinta(x + i, y + (ph > 0.6 && i > 1 ? 1 : 0), hex('#e8f8e8'), 0.45); }
  // la corriente: flechas de hierba tumbada que corren hacia el mar (a la derecha), desde «They're»
  if (cor > 0) for (let fila = 0; fila < 4; fila++) { const y = 52 + fila * 34, off = (t * 14 + fila * 23) % 64;
    for (let x0 = -64 + off; x0 < 330; x0 += 64) { if (calma(x0, y - 8) || calma(x0 + 12, y - 8)) continue;
      for (let i = 0; i < 12; i++) for (const sg of [-1, 1]) { const X = x0 + i, Y = y + sg * (7 - i * 0.6); tinta(X, Y + 1, HOJAJ[0], 0.7 * cor); tinta(X, Y, HOJAJ[2], 0.85 * cor); tinta(X - 1, Y, HOJAJ[3], 0.5 * cor); }
      for (let i = -14; i < 10; i++) tinta(x0 + i, y, HOJAJ[2], 0.6 * cor); } }
  // pececillos que van y vienen
  for (let k = 0; k < 7; k++) { const dd = k % 2 ? 1 : -1, fx = ((h(k, 4, 9) * 340 + t * (10 + k * 3) * dd) % 360 + 360) % 360 - 20, fy = 70 + h(k, 5, 9) * 100 + Math.sin(t * 3 + k) * 4; if (calma(fx, fy)) continue;
    tinta(fx + 2, fy + 4, K, 0.25); R.linea(Math.round(fx), Math.round(fy), Math.round(fx + 4 * dd), Math.round(fy), hex('#3a4a4a')); R.pset(Math.round(fx + dd), Math.round(fy) - 1, hex('#5a6a6a')); R.pset(Math.round(fx - dd), Math.round(fy) + (Math.floor(t * 8) % 2 ? 1 : -1), hex('#3a4a4a')); }
  // los nenúfares y las matas de juncos de sierra (se inclinan con la corriente)
  for (const [x, y, k, f] of [[150, 62, 0, true], [96, 128, 1, false], [228, 150, 2, true], [196, 92, 3, false], [52, 150, 4, false], [262, 104, 5, false], [34, 70, 6, true]]) nenufar(x, y, t, k, f);
  const incl = 0.05 + cor * 0.5;
  for (const [x, y, k] of [[14, 118, 0], [34, 182, 1], [300, 154, 2], [258, 184, 3], [126, 184, 4], [206, 186, 5], [74, 96, 6], [176, 130, 7]]) juncoMata(x, y, t, k, incl);
  // la hoja: cae en «still swamp», hace sus aros y luego deriva con la corriente
  const cae = tramo(t, STILL - 0.6, STILL), deriva = Math.max(0, t - STILL), H0 = [104, 74];
  if (t > STILL - 0.6) { const hx = Math.round(H0[0] + deriva * (2 + cor * 12)), hy = Math.round(lerp(-12, H0[1], cae) + Math.sin(deriva * 1.3) * 3), ang = 0.5 + deriva * 0.35 + (1 - cae) * 3;
    if (cae < 1) ovalo(H0[0] + 4, H0[1] + 6, Math.round(2 + cae * 8), 2, mez(R.pget(H0[0], H0[1] + 6), K, 0.3));
    if (t > STILL && t < STILL + 1.8) for (const rr of [0, 0.5, 1.0]) { const q = t - STILL - rr; if (q < 0) continue; const r = 6 + q * 16; for (let k = 0; k < 56; k++) { const an = k / 56 * Math.PI * 2; tinta(H0[0] + Math.cos(an) * r, H0[1] + Math.sin(an) * r * 0.5, BL, 0.6 * (1 - q / 1.8)); } }
    const ca = Math.cos(ang), sa = Math.sin(ang);
    if (cae >= 1) for (let i = -10; i <= 10; i++) for (let j = -4; j <= 4; j++) { if (Math.abs(j) > 4 - Math.abs(i) / 2.8) continue; tinta(hx + 2 + i * ca - j * sa, hy + 4 + i * sa + j * ca, K, 0.3); }
    for (let i = -10; i <= 12; i++) for (let j = -4; j <= 4; j++) { const lim = i > 10 ? 0 : 4 - Math.abs(i) / 2.8; if (Math.abs(j) > lim + 0.3) continue; const X = Math.round(hx + i * ca - j * sa), Y = Math.round(hy + i * sa + j * ca);
      R.pset(X, Y, i > 10 ? hex('#6a3a1a') : Math.abs(j) >= Math.floor(lim) ? hex('#8a3a1a') : j === 0 || (Math.abs(i % 4) === 0 && Math.abs(j) < 2) ? hex('#b05a14') : j < 0 ? hex('#f0a030') : hex('#d8801e')); } }
  // la garceta entra y se para: el agua no le pasa de los tobillos (en «shallow»)
  const gw = tramo(t, SHALLOW - 1.2, SHALLOW + 0.1); if (gw > 0) garceta(lerp(350, 244, gw), 140, t, gw < 1, 4, 2);
  // una libélula que cruza
  { const lx = Math.round(40 + ((t * 30) % 240)), ly = Math.round(110 + Math.sin(t * 3) * 12); R.linea(lx, ly, lx + 6, ly, hex('#2a6ac8')); R.pset(lx + 7, ly, hex('#1a3a8a')); if (Math.floor(t * 20) % 2) { R.linea(lx + 2, ly - 2, lx + 4, ly - 1, BL); R.linea(lx + 2, ly + 2, lx + 4, ly + 1, BL); } }
};
// ── 3 · INSERTO: el corte del río de hierba, del lago Okeechobee (izquierda) al mar (derecha) ─────────────────────
// el suelo baja muy poco a poco; encima, una lámina de agua de dos dedos con juncos; debajo, el corte: turba y caliza
const sueloCorte = (x) => x < 64 ? 132 : Math.round(lerp(104, 118, (x - 64) / 196) + Math.sin(x * 0.09) * 1.2);
const CORTE = { turba: [hex('#3a2a1c'), hex('#4a3624'), hex('#5a4430')], caliza: [hex('#c8bc98'), hex('#b4a882'), hex('#d8ceac'), hex('#9a8e6c')], acuifero: [hex('#7a9aa0'), hex('#8aaab0'), hex('#5a7a84')] };
const corteFondo = () => fijoM('corte', () => {
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ys = sueloCorte(x), lagoF = x < 64, mar = x > 264; let col;
    if (lagoF && y < 96) continue; if (mar && y < 112) continue;
    if (lagoF) { col = y < 134 ? (h(x >> 1, y, 61) < 0.08 ? hex('#5a9ab8') : mez(hex('#3a7aa0'), hex('#1a4a6a'), (y - 96) / 40)) : null; }
    if (mar) { const ym = 112; col = y < ym ? null : y < 150 ? (h(x >> 1, y, 62) < 0.08 ? hex('#8ad8d0') : mez(hex('#3ab0b0'), hex('#1a6a80'), (y - ym) / 40)) : null; }
    if (col == null) { if (y < ys + (lagoF ? 0 : 0)) continue;
      const d = y - Math.max(ys, lagoF ? 134 : mar ? 150 : ys), n = vn(x, y, 6, 63), n2 = h(x, y, 64);
      if (d < 0) col = mez(hex('#3a7aa0'), K, 0.2);
      else if (d < 12) col = n > 0.6 ? CORTE.turba[2] : n > 0.35 ? CORTE.turba[1] : CORTE.turba[0];
      else if (d < 44) col = n2 < 0.04 ? CORTE.caliza[3] : n > 0.62 ? CORTE.caliza[2] : n > 0.4 ? CORTE.caliza[0] : CORTE.caliza[1];
      else col = n > 0.55 ? CORTE.acuifero[1] : n2 < 0.1 ? CORTE.acuifero[2] : CORTE.acuifero[0];
      if (d >= 11 && d <= 12) col = mez(col, K, 0.35); if (d >= 43 && d <= 44) col = mez(col, K, 0.3); }
    R.pset(x, y, col); }
  // fósiles y huecos de la caliza, raíces en la turba
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 65) * 316), y = sueloCorte(x) + 16 + Math.round(h(k, 2, 65) * 24); if (x < 64 || x > 264) continue; if (k % 3) { ovalo(x, y, 2, 1, CORTE.caliza[3]); R.pset(x, y - 1, CORTE.caliza[2]); } else { for (let i = -2; i <= 2; i++) R.pset(x + i, y - Math.abs(i) % 2, hex('#e8e0c8')); R.pset(x, y + 1, CORTE.caliza[3]); } }
  for (let k = 0; k < 30; k++) { const x = Math.round(70 + h(k, 3, 65) * 190), y0 = sueloCorte(x) + 1; for (let j = 0; j < 6 + (k % 4); j++) R.pset(x + Math.round(Math.sin(j + k) * 1), y0 + j, hex('#6a5034')); }
  // la orilla del lago con su dique de hierba y la del mar con manglares
  R.poligono([[56, 132], [64, 104], [72, 104], [70, 132]], hex('#5a7a3a')); R.linea(64, 104, 72, 104, hex('#7a9a4a'));
  for (let k = 0; k < 6; k++) { const mx = 262 + k * 6, my = 110; R.linea(mx, my, mx - 2, my + 8, hex('#5a4030')); R.linea(mx, my, mx + 3, my + 8, hex('#5a4030')); for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i, j * 1.3) < 5) R.pset(mx + i, my - 6 + j, j < -1 && i < 0 ? hex('#4a8a3a') : hex('#2e6a2e')); }
  // el corte enmarcado con su borde de tierra
  R.linea(0, 179, 319, 179, K);
});
const p3 = (t) => {
  cieloVivo(t, 104); corteFondo();
  const cur = lienzo();
  // el horizonte: islas de árboles lejanas en la llanura
  for (const [cx, w] of [[110, 20], [176, 14], [226, 18]]) for (let i = -w; i <= w; i++) { const hh = Math.round(Math.sqrt(Math.max(0, 1 - (i / w) ** 2)) * 7); for (let j = 0; j < hh; j++) R.pset(cx + i, sueloCorte(cx + i) - 1 - j, j > hh - 3 ? hex('#4a7a3a') : hex('#2e5a2e')); }
  // el lago (sus olitas) y el mar (sus olas)
  for (let x = 0; x < 56; x++) { const y = 96 + Math.round(Math.sin(x * 0.4 + t * 3) * 1); R.pset(x, y, BL); R.pset(x, y + 1, hex('#5a9ab8')); }
  for (let x = 266; x < 320; x++) { const y = 112 + Math.round(Math.sin(x * 0.3 - t * 3) * 1.4); R.pset(x, y, BL); R.pset(x, y + 1, hex('#8ad8d0')); }
  // la lámina de agua sobre el suelo, que corre hacia el mar; el pulso claro sale del lago en «Okeechobee» y llega al mar en «sea»
  const pulso = lerp(60, 270, tramo(t, LAKE, SEA));
  for (let x = 64; x < 266; x++) { const ys = sueloCorte(x), brillo = Math.sin(x * 0.5 - t * 5) > 0.7, cerca = Math.abs(x - pulso) < 10 && t > LAKE && t < SEA + 0.3;
    for (let j = 1; j <= 3; j++) R.pset(x, ys - j, cerca ? hex('#a8e8f8') : j === 3 ? (brillo ? BL : hex('#6ab8d8')) : hex('#3a8ab8')); }
  // flechas de hierba que se tumban hacia el mar, por encima de la lámina
  for (let k = 0; k < 6; k++) { const x0 = 80 + ((k * 34 + (t - P3) * 6) % 180), ys = sueloCorte(Math.round(x0)) - 9; for (let i = 0; i < 6; i++) { R.pset(Math.round(x0 + i), ys - 4 + Math.round(i * 0.7), hex('#2a5a1e')); R.pset(Math.round(x0 + i), ys + 4 - Math.round(i * 0.7), hex('#2a5a1e')); } R.linea(Math.round(x0 - 6), ys, Math.round(x0 + 5), ys, hex('#2a5a1e')); }
  // los juncos de sierra que salen del agua (se inclinan hacia el mar)
  for (let k = 0; k < 14; k++) { const x = Math.round(74 + k * 14 + h(k, 1, 66) * 6); juncoMata(x, sueloCorte(x) - 1, t, k, 0.18); }
  // la lámina por delante de los juncos, con las flechitas de la corriente y el pulso claro
  for (let x = 64; x < 266; x++) { const ys = sueloCorte(x), cerca = Math.abs(x - pulso) < 12 && t > LAKE && t < SEA + 0.3, brillo = Math.sin(x * 0.45 - t * 6) > 0.75;
    for (let j = 1; j <= 3; j++) R.pset(x, ys - j, cerca ? (j === 3 ? BL : hex('#a8e8f8')) : j === 3 ? (brillo ? hex('#c8f0f8') : hex('#6ab8d8')) : hex('#3a8ab8')); }
  for (let k = 0; k < 8; k++) { const x0 = Math.round(66 + ((k * 26 + (t - P3) * 9) % 196)), ys = sueloCorte(x0); R.pset(x0, ys - 3, BL); R.pset(x0 + 1, ys - 2, BL); R.pset(x0, ys - 1, BL); }
  if (t > LAKE && t < SEA + 0.3) for (const k of [0, 1]) destello(Math.round(pulso) + k * 4 - 2, sueloCorte(Math.round(pulso)) - 6 - k * 3, Math.floor(t * 8 + k) % 2 ? 1 : 2);
  // la hoja del plano anterior sigue derivando hacia el mar
  { const hx = Math.round(lerp(76, 252, tramo(t, P3, P4 + 0.3))), hy = sueloCorte(hx) - 4; for (let i = -4; i <= 4; i++) { R.pset(hx + i, hy, hex('#e8902a')); R.pset(hx + i, hy - (Math.abs(i) < 3 ? 1 : 0), hex('#c8701a')); } R.pset(hx + 5, hy, hex('#6a3a1a')); }
  // una garceta con el agua por los tobillos y una anhinga que se seca en un poste del lago
  garceta(188, sueloCorte(188) - 1, t, false, 3, 1);
  { const ax = 40, ay = 88; R.linea(ax, ay, ax, 98, hex('#5a4030')); ovalo(ax, ay - 4, 2, 3, K); const ab = Math.sin(t * 2) > 0 ? 1 : 0; R.linea(ax - 2, ay - 4, ax - 7, ay - 7 - ab, K); R.linea(ax + 2, ay - 4, ax + 7, ay - 7 - ab, K); R.linea(ax, ay - 7, ax + 1, ay - 11, K); R.linea(ax + 1, ay - 11, ax + 4, ay - 11, hex('#c8a040')); }
  // el aro del lago en «Okeechobee» y el del mar en «sea»
  for (const [t0, x0, y0] of [[LAKE, 34, 98], [SEA, 284, 114]]) if (t > t0 && t < t0 + 1.4) { const q = t - t0; for (let k = 0; k < 40; k++) { const an = k / 40 * Math.PI * 2, r = 4 + q * 16; tinta(x0 + Math.cos(an) * r, y0 + Math.sin(an) * r * 0.3, BL, 0.8 * (1 - q / 1.4)); } }
};

// ── 4 · INSERTO: el porche de 1947 ─────────────────────────────────────────────────────────────────────────────────
const MAD = [hex('#5a3a22'), hex('#7a5232'), hex('#946840'), hex('#b08050')], BLANCO = [hex('#c8c4b4'), hex('#e0ddd0'), hex('#f2efe4')], TECHO = [hex('#7aa8a0'), hex('#90bab2'), hex('#a8ccc4')];
const HUECO = 0;
const porche = () => fijo('porche', () => {
  const cur = lienzo(); cur.fill(HUECO);
  // el techo de friso (azul de porche) y la viga
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 6 === 0 ? TECHO[0] : (x % 6 === 1 ? TECHO[2] : TECHO[1]));
  rc(0, 22, 319, 29, BLANCO[1]); R.linea(0, 22, 319, 22, BLANCO[2]); rc(0, 28, 319, 29, BLANCO[0]); R.linea(0, 30, 319, 30, K);
  // la pared de la casa con tablas de chilla, la puerta mosquitera y el calendario
  for (let y = 31; y < 150; y++) for (let x = 0; x < 86; x++) { const f = (y - 31) % 6; R.pset(x, y, f === 0 ? BLANCO[0] : f === 1 ? BLANCO[2] : (h(x, y, 30) < 0.04 ? BLANCO[0] : BLANCO[1])); }
  rc(6, 62, 40, 150, K); rc(7, 63, 39, 150, MAD[2]); rc(10, 66, 36, 146, hex('#2a2a26')); for (let y = 66; y < 146; y += 2) for (let x = 10; x <= 36; x += 2) R.pset(x, y, hex('#4a4a42')); rc(7, 104, 39, 107, MAD[2]); R.linea(7, 104, 39, 104, MAD[3]); R.pset(36, 108, hex('#e8c040')); R.pset(36, 109, hex('#a07020'));
  // el farol de la entrada
  rc(52, 34, 60, 46, K); rc(53, 35, 59, 45, hex('#e8d8a0')); R.linea(56, 34, 56, 31, K);
  rc(44, 52, 82, 92, K); rc(45, 53, 81, 91, hex('#f4f0e2')); rc(45, 53, 81, 62, hex('#c83a2a')); R.pset(63, 51, K); R.linea(63, 51, 50, 53, K); R.linea(63, 51, 76, 53, K);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rc(48 + i * 5, 74 + j * 4, 50 + i * 5, 75 + j * 4, (i + j * 6) === 9 ? hex('#c83a2a') : hex('#a8a498'));
  R.numero('1947', 64, 61, { tam: 8, centro: true, color: BL, sombra: false });
  // los postes, el pasamanos con balaustres y la mosquitera (lo de fuera queda hueco)
  for (const [xa, xb] of [[86, 94], [188, 196], [298, 306]]) { rc(xa, 31, xb, 150, BLANCO[1]); R.linea(xa, 31, xa, 150, BLANCO[2]); R.linea(xb, 31, xb, 150, BLANCO[0]); R.linea(xb + 1, 31, xb + 1, 150, K); }
  for (let y = 31; y < 150; y++) for (let x = 307; x < 320; x++) R.pset(x, y, (y - 31) % 6 === 0 ? BLANCO[0] : BLANCO[1]);
  rc(94, 126, 298, 130, BLANCO[1]); R.linea(94, 126, 298, 126, BLANCO[2]); R.linea(94, 131, 298, 131, K); rc(94, 144, 298, 147, BLANCO[1]);
  for (let x = 98; x < 296; x += 7) { if (x > 186 && x < 198) continue; rc(x, 132, x + 2, 144, BLANCO[1]); R.linea(x + 2, 132, x + 2, 144, BLANCO[0]); }
  rc(94, 31, 298, 33, BLANCO[1]);
  // el suelo de tablas, con vetas y juntas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 150) / 5), yy = (y - 150) % 5, off = h(tab, 1, 31) * 200, v = Math.sin((x + off) * 0.07 + Math.sin(x * 0.013 + tab) * 2.5);
    R.pset(x, y, yy === 0 ? MAD[0] : v > 0.7 ? MAD[3] : v > -0.4 ? MAD[2] : MAD[1]); if (yy === 2 && (x + Math.round(off)) % 61 === 0) R.linea(x, y - 2, x, y + 2, MAD[0]); }
  R.linea(0, 150, 319, 150, K); for (let x = 0; x < 320; x++) R.pset(x, 151, mez(R.pget(x, 151), K, 0.35));
  // la mesa con la máquina de escribir
  rc(100, 140, 150, 143, K); rc(101, 140, 149, 142, MAD[3]); R.linea(101, 140, 149, 140, hex('#d0a070')); for (const x of [104, 145]) { rc(x, 143, x + 2, 162, K); R.linea(x + 1, 143, x + 1, 161, MAD[2]); }
  rc(110, 128, 136, 140, K); rc(111, 129, 135, 139, hex('#3a3a3e')); rc(111, 129, 135, 131, hex('#5a5a62')); for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) R.pset(113 + i * 4, 134 + j * 3, hex('#d8d4c8'));
  rc(108, 126, 138, 128, K); R.linea(109, 127, 137, 127, hex('#6a6a72'));
  // un helecho en su cesta y la mecedora con el gato
  rc(236, 134, 240, 162, K); R.linea(237, 136, 237, 160, MAD[2]); rc(268, 134, 272, 162, K); R.linea(269, 136, 269, 160, MAD[2]); rc(236, 146, 272, 150, K); rc(237, 147, 271, 149, MAD[3]);
  for (let x = 240; x < 268; x += 4) R.linea(x, 135, x, 146, MAD[1]); R.linea(236, 134, 272, 134, MAD[1]);
  for (let i = 0; i < 40; i++) { const a2 = i / 39 * Math.PI; R.pset(Math.round(254 + Math.cos(a2) * 22), Math.round(160 + Math.sin(a2) * 4), K); }
});
const porcheMostrar = (t) => { const cur = lienzo(), bf = FIJOS.porche;
  for (let i = 0; i < 57600; i++) { const v = bf[i]; if (v !== HUECO) cur[i] = v; else if (((i % 320) + Math.floor(i / 320)) & 1) cur[i] = mez(cur[i], hex('#2a3a3a'), 0.18); } };
const afueraPorche = (t) => {
  cieloVivo(t, 92);
  // el río de hierba hasta el horizonte, con islas de árboles y canales que brillan
  for (let y = 92; y < 150; y++) for (let x = 0; x < 320; x++) { const f = (y - 92) / 58, v = Math.sin(x * 0.3 + y * 1.7 + Math.sin(t * 1.2 + y * 0.2) * (1 - f)) > 0.4;
    R.pset(x, y, f < 0.08 ? hex('#7a9a6a') : v ? hex('#d0b860') : (h(x, y, 33) < 0.2 ? hex('#6a8a3a') : hex('#b0a050'))); }
  for (const [cx, w] of [[40, 34], [150, 22], [236, 40]]) for (let k = 0; k < 7; k++) { const bx = cx - w + k * (w / 3), r = 4 + ((k * 7) % 4); for (let j = -r; j <= 0; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, j * 1.3) <= r) R.pset(Math.round(bx + i), 93 + j, j < -r * 0.5 && i < 0 ? hex('#5a7a42') : hex('#3a5a34')); }
  for (let k = 0; k < 4; k++) { const y = 104 + k * 10; for (let x = 0; x < 320; x++) if (Math.sin(x * 0.02 + k * 2) > 0.6) R.pset(x, y + Math.round(Math.sin(x * 0.05 + k) * 2), Math.sin(x * 0.5 - t * 4 + k) > 0.7 ? BL : hex('#7ab0c8')); }
  // dos palmitos y una garza que pasa volando
  for (const [px, ph] of [[124, 66], [272, 58]]) { R.linea(px, 120, px + 2, 120 - ph + 8, hex('#6a5a3a')); R.linea(px + 1, 120, px + 3, 120 - ph + 8, hex('#8a7a5a'));
    for (let k = 0; k < 9; k++) { const an = -Math.PI + k / 8 * Math.PI + Math.sin(t * 1.3 + k) * 0.06; for (let r = 0; r < 12; r++) R.pset(Math.round(px + 2 + Math.cos(an) * r), Math.round(120 - ph + 8 + Math.sin(an) * r * 0.8 + r * r * 0.03), r < 6 ? hex('#3a6a2a') : hex('#5a8a3a')); } }
  { const gx = Math.round(((t - P4) * 22) % 360) - 20, gy = 70 + Math.round(Math.sin(t) * 3), al = Math.floor(t * 3) % 2; R.linea(gx - 6, gy - al * 3, gx, gy, BL); R.linea(gx, gy, gx + 6, gy - al * 3, BL); R.linea(gx + 1, gy, gx + 7, gy + 1, BL); R.pset(gx + 8, gy + 1, hex('#f0c030')); }
};
const p4 = (t) => {
  if (!FIJOS.porche) { porche(); }
  afueraPorche(t); porcheMostrar(t);
  // el ventilador del techo que gira y el helecho colgado que se mece
  { const fx = 232, fy = 26; R.linea(fx, 22, fx, fy, K); ovalo(fx, fy, 3, 1, hex('#7a5232')); for (let k = 0; k < 4; k++) { const an = t * 5 + k * Math.PI / 2, ex = Math.round(fx + Math.cos(an) * 18), ey = Math.round(fy + 1 + Math.sin(an) * 2.5); R.linea(fx, fy + 1, ex, ey, hex('#5a3a22')); R.linea(fx, fy, ex, ey - 1, hex('#946840')); } }
  { const sw = Math.sin(t * 1.1) * 2, hx = Math.round(150 + sw); R.linea(150, 30, hx - 5, 44, K); R.linea(150, 30, hx + 5, 44, K); ovalo(hx, 47, 7, 3, hex('#7a5232'));
    for (let k = 0; k < 9; k++) { const an = Math.PI * (0.1 + k / 8 * 0.8) + Math.sin(t * 1.5 + k) * 0.08; for (let r = 0; r < 14; r++) R.pset(Math.round(hx + Math.cos(an) * r * 1.1), Math.round(45 + Math.sin(an) * r * 0.9 + r * 0.3), r % 3 === 0 ? hex('#2a6a2a') : hex('#4a9a3a')); } }
  // la mecedora se mece y el gato duerme encima moviendo la cola
  { const mx = 254, roca = Math.round(Math.sin(t * 1.6) * 1.5); rc(mx - 12, 138 + roca, mx + 10, 140 + roca, hex('#e8a040')); ovalo(mx - 2, 136 + roca, 7, 3, hex('#e8a040')); ovalo(mx - 8, 133 + roca, 3, 3, hex('#e8a040')); R.pset(mx - 9, 133 + roca, K); R.pset(mx - 10, 130 + roca, hex('#e8a040')); R.pset(mx - 7, 130 + roca, hex('#e8a040'));
    for (let i = 0; i < 6; i++) R.pset(mx + 6 + i, 138 + roca - Math.round(Math.sin(t * 3 + i * 0.5) * (i / 3)), hex('#c88030')); }
  // la escritora: teclea, se vuelve, coge el libro y en «River of Grass» lo alza hacia el río
  const SU = 160, sale = tramo(t, NAMED - 0.9, RIVER - 0.25), x = Math.round(lerp(142, 196, sale)), teclea = t < NAMED - 1.1;
  const coge = t > NAMED - 1.1, alza = t > RIVER - 0.2;
  const mano = teclea ? [x - 3 - (Math.floor(t * 8) % 2) * 3, 136] : alza ? [x + 22, 120 - Math.round(Math.sin((t - RIVER) * 4) * 1)] : true;
  const act = R.actor(EL.escritoraLF, x, SU, t, { dir: teclea ? -1 : 1, anda: sale > 0 && sale < 1, sostiene: mano, sonrisa: t > RIVER, habla: t > WRITER && t < NAMED + 0.6 && Math.sin(t * 9) > 0 });
  if (teclea) { const p = Math.floor((t - P4) * 3); R.linea(112, 126 - Math.min(10, p), 134, 126 - Math.min(10, p), BL); rc(112, 126 - Math.min(10, p), 134, 126, hex('#f4f0e2')); for (let j = 0; j < Math.min(10, p); j += 2) R.linea(114, 125 - j, 114 + 6 + ((j * 7) % 12), 125 - j, hex('#8a8a8a')); }
  else rc(112, 116, 134, 126, hex('#f4f0e2'));
  // el libro: tapa verde con la hierba y el agua
  const [bx, by] = coge ? act.mano.map(Math.round) : [140, 136];
  rc(bx - 5, by - 7, bx + 5, by + 6, K); rc(bx - 4, by - 6, bx + 4, by + 5, hex('#3a7a4a')); R.linea(bx - 4, by - 6, bx - 4, by + 5, hex('#2a5a3a'));
  for (let i = -3; i <= 3; i++) R.pset(bx + i, by + 1 + (i & 1), hex('#7ac8e8')); for (const i of [-2, 0, 2]) R.linea(bx + i, by - 1, bx + i + 1, by - 4, hex('#e8d060'));
  if (alza && t < RIVER + 1.4) for (const k of [0, 1, 2]) destello(bx + [-8, 8, 0][k], by - 10 + [2, 0, -4][k], Math.floor(t * 6 + k) % 2 ? 1 : 2);
};

// ── 5 · el lago del campo de golf: ojos de caimán que asoman por todas partes ─────────────────────────────────────
const OJOS = [[76, 126, 0.0, 1], [186, 112, 0.35, -1], [120, 140, 0.7, 1], [240, 132, 1.05, -1], [36, 112, 1.4, 1], [214, 100, 1.7, 1], [104, 104, 2.0, -1], [256, 118, 2.3, -1]];
const p5 = (t) => {
  const o = { encuadre: 'golf', camara: 'lago' }, g = T.everglades(R, t, o);
  for (const [x, y, dt, dir] of OJOS) asoma(x, y, t, ALLIG + dt, { dir, s: 1.6 });
  // los ojos grandes del «depredador más peligroso»: solo un «?»
  if (t > DEADLIER - 0.2) { asoma(150, 142, t, DEADLIER - 0.2, { s: 2.4, dir: -1, especie: 'cocodrilo' }); globoIcono('?', 150, 112, tramo(t, DEADLIER + 0.4, DEADLIER + 0.7)); }
  // la turista llega por la orilla, mira y se lleva la sorpresa
  const u = tramo(t, P5 - 0.2, START - 0.2), atras = tramo(t, DEADLIER + 0.3, DEADLIER + 1.0), x = Math.round(lerp(-16, 52, u) - atras * 12);
  R.actor(EL.turistaLF, x, g.suelo + 10, t, { dir: atras > 0 && atras < 1 ? -1 : 1, anda: (u > 0 && u < 1) || (atras > 0 && atras < 1), dedo: t > START && t < DEADLIER - 0.4, sorpresa: t > DEADLIER + 0.2 && t < DEADLIER + 1.4, sonrisa: t > DEADLIER + 1.6 });
  // un corredor que pasa por el camino del fondo
  { const v = tramo(t, P5 + 0.5, P6 + 0.2), cx = Math.round(lerp(330, 196, v)); if (v > 0 && v < 1) R.actor(EL.patinadoraLF, cx, g.suelo + 12, t, { dir: -1, anda: true }); }
  T.evergladesDelante(R, t, o);
};

// ── 6 · el dique del Okeechobee: el trampero de la agencia cuenta los ojos ─────────────────────────────────────────
const LAGOJOS = [[36, 116, 0.2], [100, 110, 0.8], [166, 114, 1.4], [234, 106, 2.0], [270, 118, 2.5], [92, 126, 3.0], [222, 124, 3.5], [150, 102, 4.0]];
const p6 = (t) => {
  const o = { encuadre: 'cana', camara: 'dique' }, g = T.interior(R, t, o);
  for (const [x, y, dt] of LAGOJOS) { const c0 = R.pget(x, y - 3), azul = ((c0 >>> 16) & 255) > (c0 & 255) + 20; if (azul) asoma(x, y, t, P6 + dt, { s: 1.3, dir: x > 160 ? -1 : 1 }); }
  const vistos = LAGOJOS.filter(([, , dt]) => t > P6 + dt + 0.3).length;
  const u = tramo(t, P6 - 0.1, PLENTY - 0.3), x = Math.round(lerp(-18, 96, u)), senala = t > AGENCY - 0.1 && t < AGENCY + 1.3;
  const escribe = !senala && t > PLENTY - 0.2, pl = escribe ? [x + 17 + (Math.floor(t * 6) % 2), g.suelo - 13] : [x + 16, g.suelo - 14];
  const act = R.actor(EL.tramperoLF, x, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sostiene: senala ? undefined : pl, dedo: senala, sonrisa: senala });
  // la tablilla con las rayitas que va contando
  const [bx, by] = senala ? [x - 1, g.suelo - 12] : act.mano.map(Math.round);
  rc(bx - 1, by - 8, bx + 8, by + 4, K); rc(bx, by - 7, bx + 7, by + 3, hex('#a07a4a')); rc(bx + 1, by - 6, bx + 6, by + 2, hex('#f4f0e2')); R.linea(bx + 2, by - 8, bx + 5, by - 8, hex('#9a9aa2'));
  for (let k = 0; k < Math.min(vistos, 8); k++) { const cx = bx + 2 + (k % 4) + (k >= 4 ? 0 : 0), cy = by - 5 + (k >= 4 ? 4 : 0); R.linea(cx + (k % 4), cy, cx + (k % 4), cy + 2, hex('#2a3a8a')); }
  if (senala) globoIcono('!', x + 8, g.suelo - 50, tramo(t, AGENCY, AGENCY + 0.3));
  T.interiorDelante(R, t, o);
};

// ── 7 · el mapa de Florida: 1,300,000 y los 67 condados ───────────────────────────────────────────────────────────
let MARCAS = null;
const p7 = (t) => {
  const P = T.mapa(R, t, { zoom: 4.4, centro: [-83.9, 27.9] });
  if (!MARCAS) { const cand = [], tmp = R.nuevo(), prev = R.usar(tmp); T.mapa(R, 0, { zoom: 4.4, centro: [-83.9, 27.9], vida: false });
    for (let lat = 30.9; lat > 25.0; lat -= 0.32) for (let lon = -87.4; lon < -80.0; lon += 0.36) { const [x, y] = P([lon, lat]).map(Math.round), c0 = R.pget(x, y), r = c0 & 255, gg = (c0 >>> 8) & 255, bb = (c0 >>> 16) & 255;
      if (lat > (lon < -85.0 ? 30.85 : 30.55) || lon < -87.45) continue; if (x > 22 && x < 300 && y > 26 && y < 168 && r > 190 && gg > 170 && bb < 190 && r - bb > 30) cand.push([x, y]); }
    R.usar(prev);
    cand.sort((p, q) => p[1] - q[1] || p[0] - q[0]); const paso = cand.length / 67; MARCAS = []; for (let k = 0; k < 67 && cand.length; k++) MARCAS.push(cand[Math.min(cand.length - 1, Math.floor(k * paso))]); }
  // las marcas: un par de ojos de caimán en cada condado, de norte a sur
  const n = Math.floor(tramo(t, LIVE - 0.2, COUNTIES) * MARCAS.length);
  for (let k = 0; k < n; k++) { const [x, y] = MARCAS[k], fresca = k > n - 4; ovalo(x, y + 1, 3, 1, mez(R.pget(x, y + 2), K, 0.3)); ovalo(x, y, 3, 1, K); ovalo(x, y, 2, 1, fresca ? hex('#5aa03a') : hex('#3a6a2a')); R.pset(x - 1, y - 1, hex('#f8d040')); R.pset(x + 1, y - 1, hex('#f8d040')); }
  // la etiqueta del contador, colgada de un hilo
  const ex = 26, ey = 116, cuenta = Math.round(1300000 * ease(tramo(t, ABOUT, MILLION + 0.1)));
  R.linea(ex + 60, 96, ex + 60, ey, hex('#c83a2a')); T.chincheta(R, ex + 60, 96, t, undefined, {});
  rc(ex - 1, ey - 1, ex + 121, ey + 29, K); rc(ex, ey, ex + 120, ey + 28, hex('#f4ecd4')); rc(ex, ey + 25, ex + 120, ey + 28, hex('#d8ccaa'));
  T.a_caiman(R, ex + 16, ey + 22, t, { especie: 'caiman', s: 0.7, dir: 1 });
  R.numero(cuenta.toLocaleString('en-US'), ex + 34, ey + 18, { tam: 8, color: hex('#2a3a5a') });
  if (t > MILLION && t < MILLION + 0.8) destello(ex + 116, ey + 4, 2);
  // el 67, grande, en «67»
  const g67 = tramo(t, N67 - 0.15, N67 + 0.25); if (g67 > 0) R.numero('67', 236, 160, { tam: 16, centro: true });
};

// ── 8 · la orilla: el aligátor toma el sol y el cocodrilo sale del agua a su lado ──────────────────────────────────
const p8 = (t) => {
  const o = { encuadre: 'rio', camara: 'orilla' }, g = T.everglades(R, t, o);
  T.a_caiman(R, g.caiman[0], g.caiman[1], t, { especie: 'caiman', s: 2, dir: 1, boca: tramo(t, RECORD, RECORD + 1.2) * 0.6 - tramo(t, CROCS + 0.2, CROCS + 0.8) * 0.6, parpadeo: true });
  const nada = tramo(t, P8 + 0.3, CROCS - 0.9), sube = tramo(t, CROCS - 0.9, CROCS + 0.3);
  const cx = Math.round(lerp(372, g.cocodrilo[0] + 4, nada) - sube * 4), cy = Math.round(lerp(126, g.cocodrilo[1], sube));
  if (sube > 0 && sube < 0.6) for (let k = 0; k < 30; k++) { const an = k / 30 * Math.PI * 2; tinta(cx + Math.cos(an) * (10 + sube * 30), 136 + Math.sin(an) * 3, BL, 0.4); }
  T.a_caiman(R, cx, cy, t, { especie: 'cocodrilo', s: 2, dir: -1, agua: 1 - sube, anda: nada < 1 || sube < 1 ? 0.6 : 0, parpadeo: true });
  T.evergladesDelante(R, t, o);
};

// ── 9–11 y 13 · INSERTOS de la orilla de cerca (gag 3: ¿U o V?, y el nido) ───────────────────────────────────────
const SUELOS = {
  barro: { a: [hex('#3e3020'), hex('#4e3e2a'), hex('#5e4c34'), hex('#76603e')], agua: hex('#34463a'), aguaL: hex('#5a6e56'), yb: 104, yf: 40 },
  arena: { a: [hex('#b4a07a'), hex('#c8b48c'), hex('#d8c6a0'), hex('#ece0c0')], agua: hex('#2e7a78'), aguaL: hex('#6ab8b0'), yb: 66, yf: 22 },
  nido: { a: [hex('#3a5a24'), hex('#4a6a2a'), hex('#5a7a32'), hex('#7a9a3a')], agua: hex('#36584a'), aguaL: hex('#6a8a6a'), yb: 88, yf: 34 },
  tronco: { a: [hex('#2a2a1e'), hex('#3a3a28'), hex('#4a4632'), hex('#5a5238')], agua: hex('#263a30'), aguaL: hex('#4a5e48'), yb: 200, yf: 30 },
};
const FOLL = [hex('#16301a'), hex('#22442a'), hex('#2e5a30'), hex('#447a3c'), hex('#6a9a48')];
const orillaY = (x, v) => SUELOS[v].yb + Math.round(Math.sin(x * 0.05 + 1) * 3 + Math.sin(x * 0.13) * 1.5);
const copaY = (x, v) => SUELOS[v].yf + Math.round(Math.sin(x * 0.06) * 3 + Math.sin(x * 0.17 + 2) * 2);
const TRONCOS = { barro: [36, 132, 214], arena: [], nido: [60, 170], tronco: [20, 150, 248] };
const pintaOrilla = (v) => fijo('orilla-' + v, () => { const S = SUELOS[v];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const yo = orillaY(x, v), yc = copaY(x, v); let col;
    if (y < yc) { col = FOLL[0]; }
    else if (y < yo) { const f = (y - yc) / Math.max(1, yo - yc), m = vn(x, y * 3, 9, 41), rizo = h(x >> 2, y, 42);
      col = f < 0.35 ? mez(S.agua, FOLL[1], 0.55 - f) : S.agua; if (m > 0.7 && !calma(x, y)) col = mez(col, S.aguaL, 0.5); if (rizo < 0.06 && !calma(x, y)) col = S.aguaL; if (rizo > 0.97) col = mez(S.agua, K, 0.3); }
    else { const m = vn(x, y, 10, 43) * 0.65 + vn(x, y, 4, 44) * 0.35, n = h(x, y, 45);
      col = y < yo + 3 ? mez(S.a[0], S.agua, 0.4) : m > 0.68 ? S.a[3] : m > 0.5 ? S.a[2] : m > 0.34 ? S.a[1] : S.a[0]; if (n > 0.97) col = S.a[0]; else if (n < 0.02) col = S.a[3]; }
    R.pset(x, y, col); }
  // la copa: matas redondas con luz arriba a la izquierda (más tranquila bajo Atom y la barra del año)
  for (let k = 0; k < 90; k++) { const cx = Math.round(h(k, 1, 46) * 330 - 5), cy = Math.round(h(k, 2, 46) * (S.yf - 4)), r = 5 + Math.round(h(k, 3, 46) * 6), z = calma(cx, cy);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const dd = Math.hypot(i, j); if (dd > r) continue; const X = cx + i, Y = cy + j; if (X < 0 || X > 319 || Y < 0 || Y >= copaY(X, v) + 2) continue;
      const luz = (-i - j) / (r * 1.4); R.pset(X, Y, z || calma(X, Y) ? (luz > 0.3 ? FOLL[2] : FOLL[1]) : dd > r - 1 ? FOLL[0] : luz > 0.45 ? (((X + Y) & 1) ? FOLL[4] : FOLL[3]) : luz > 0.1 ? FOLL[3] : luz > -0.3 ? FOLL[2] : FOLL[1]); } }
  // musgo de Florida que cuelga de las ramas
  for (let k = 0; k < 34; k++) { const x = Math.round(h(k, 4, 46) * 318), y0 = copaY(x, v) - 4 - Math.round(h(k, 5, 46) * 8), L = 5 + Math.round(h(k, 6, 46) * 9); if (calma(x, y0)) continue; for (let j = 0; j < L; j++) R.pset(x + (j % 3 === 2 ? 1 : 0), y0 + j, j % 2 ? hex('#8a9a80') : hex('#a8b49a')); }
  // troncos que bajan al agua, con su reflejo que tiembla en el agua
  for (const tx of TRONCOS[v]) { const yc = copaY(tx, v); for (let y = yc - 8; y < yc + 6; y++) { const w = 3 + Math.max(0, y - yc) * 0.6; for (let i = -w; i <= w; i++) R.pset(Math.round(tx + i), y, i < -w + 1.5 ? hex('#4a4236') : i > w - 2 ? hex('#5a5244') : (y + Math.round(i)) % 4 === 0 ? hex('#7a7060') : hex('#9a907e')); }
    for (let y = yc + 6; y < Math.min(orillaY(tx, v) - 2, yc + 34); y += 1) { const dx = Math.round(Math.sin(y * 0.8) * 1.5); for (let i = -3; i <= 3; i++) if ((y & 1) || Math.abs(i) < 2) tinta(tx + i + dx, y, hex('#9a907e'), 0.25); } }
  if (v === 'barro' || v === 'nido') for (const kx of (v === 'barro' ? [70, 176, 258] : [120])) { const ky = orillaY(kx, v) - 2; R.poligono([[kx - 4, ky], [kx + 4, ky], [kx + 1, ky - 9], [kx - 1, ky - 9]], hex('#7a6a54')); R.linea(kx - 4, ky, kx - 1, ky - 9, hex('#5a4a3a')); R.linea(kx + 1, ky - 8, kx + 2, ky - 4, hex('#a89a80')); for (let i = -6; i <= 6; i++) tinta(kx + i, ky + 1, K, 0.25); }
  // la orilla: barro mojado que brilla, la línea de restos y matas, conchas o huellas
  for (let x = 0; x < 320; x++) { const yo = orillaY(x, v); for (let j = 0; j < 4; j++) tinta(x, yo + j, K, 0.25 - j * 0.05); if (h(x, 1, 47) < 0.2) R.pset(x, yo + 1, S.aguaL); }
  if (v === 'arena') { for (let x = 0; x < 320; x += 1) { const y = orillaY(x, v) + 8 + Math.round(Math.sin(x * 0.07) * 2); if (h(x, 2, 47) < 0.45) R.pset(x, y, h(x, 3, 47) < 0.5 ? hex('#5a4a2a') : hex('#7a6a3a')); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 44) * 318), y = Math.round(orillaY(x, v) + 14 + h(k, 2, 44) * 62); if (y > 178) continue; const c0 = h(k, 3, 44); ovalo(x, y, 2, 1, c0 < 0.4 ? hex('#f4ece0') : c0 < 0.7 ? hex('#e8c8b0') : hex('#d8b8e0')); R.pset(x - 1, y - 1, hex('#a08a70')); R.pset(x + 2, y, mez(R.pget(x + 2, y), K, 0.3)); }
    // las raíces zanco del mangle, a la izquierda, con sus brotes colgando
    for (let y = 0; y < 130; y++) for (let x = 0; x < 24; x++) { const n = vn(x * 3, y, 4, 50); R.pset(x, y, x === 23 ? K : x > 19 ? hex('#3e3020') : n > 0.62 ? hex('#8a7254') : n > 0.4 ? hex('#6a5640') : hex('#54442e')); }
    for (let k = 0; k < 9; k++) { const ex = 24 + k * 15, ey = orillaY(ex, v) + 22 + (k % 3) * 12, sx = 10 + k * 1.5, sy = 40 + k * 10;
      for (let i = 0; i <= 120; i++) { const u = i / 120, X = Math.round(lerp(sx, ex, u)), Y = Math.round(lerp(sy, ey, u) - Math.sin(u * Math.PI) * (16 + k * 3)); R.pset(X, Y - 2, K); R.pset(X, Y - 1, hex('#a88a64')); R.pset(X, Y, hex('#8a6a4a')); R.pset(X, Y + 1, hex('#6a4e34')); R.pset(X, Y + 2, K); }
      for (let i = -4; i <= 4; i++) tinta(ex + i, ey + 3, K, 0.3); }
    for (const [px, py] of [[30, 30], [46, 36], [60, 28]]) { R.linea(px, py, px, py + 14, hex('#5a7a2a')); R.pset(px, py + 15, hex('#3a5a1a')); } }
  else if (v !== 'tronco') { for (let k = 0; k < 36; k++) { const x = Math.round(h(k, 1, 44) * 318), y = Math.round(orillaY(x, v) + 10 + h(k, 2, 44) * 66); if (y > 178) continue;
      for (let j = 0; j < 6; j++) { const l = 4 + Math.round(h(k, j, 45) * 6); R.linea(x + j - 3, y, x + j - 3 + (j - 3), y - l, j % 2 ? hex('#7a9a3a') : hex('#4a6a2a')); } ovalo(x, y + 1, 4, 1, mez(R.pget(x, y + 1), K, 0.3)); }
    if (v === 'barro') { for (let k = 0; k < 5; k++) { const fx = 40 + k * 16, fy = 166 - k * 7; for (const [p, q] of [[3, -3], [-3, -3], [0, -4]]) R.linea(fx, fy, fx + p, fy + q, S.a[0]); }
      for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 6, 48) * 300 + 10), y = Math.round(126 + h(k, 7, 48) * 50); R.linea(x, y, x + 4 + (k % 3), y + 1 + (k % 2), S.a[0]); R.linea(x + 2, y + 1, x + 3, y + 3, S.a[0]); } }
    if (v === 'nido') for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 4, 46) * 318), y = Math.round(orillaY(x, v) + 8 + h(k, 5, 46) * 80); if (y > 178) continue; R.linea(x, y, x + 1, y - 7, hex('#8aaa3a')); R.linea(x + 2, y, x + 4, y - 6, hex('#6a8a2a')); if (k % 9 === 0) { R.pset(x + 1, y - 8, hex('#f8d040')); R.pset(x, y - 8, hex('#e8a020')); } } }
  if (v === 'tronco') {
    // el tronco caído, de lado a lado, con su corteza y nudos
    for (let x = -4; x < 324; x++) { const yt = 132 + Math.round(Math.sin(x * 0.012) * 3); for (let j = 0; j < 28; j++) { const y = yt + j, n = vn(x * 0.5, j * 2, 3, 49) + (Math.sin(x * 0.9 + j * 0.15) > 0.7 ? 0.3 : 0);
      R.pset(x, y, j === 0 || j === 27 ? K : j < 3 ? hex('#a89a78') : j > 22 ? hex('#3a2e20') : n > 0.8 ? hex('#8a7a5c') : n > 0.5 ? hex('#6e5e44') : n > 0.3 ? hex('#5a4a36') : hex('#45382a')); }
      for (let j = 28; j < 38; j++) tinta(x, yt + j, K, 0.3 * (1 - (j - 28) / 10)); }
    for (const kx of [40, 176, 292]) { ovalo(kx, 146, 6, 4, K); ovalo(kx, 146, 5, 3, hex('#4a3a2a')); ovalo(kx, 146, 3, 2, hex('#2a2016')); R.pset(kx - 2, 144, hex('#8a7a5c')); }
    for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 9, 49) * 316), y = 134 + Math.round(h(k, 10, 49) * 3); for (let i = 0; i < 4; i++) R.pset(x + i, y, hex('#6aa04a')); R.pset(x + 1, y - 1, hex('#8ac05a')); } }
});
const vidaOrilla = (t, v) => { const S = SUELOS[v];
  for (let k = 0; k < 46; k++) { const y = S.yf + 6 + Math.round(h(k, 2, 48) * ((v === 'tronco' ? 178 : S.yb) - S.yf - 8)), x = ((h(k, 1, 48) * 340 + t * (4 + h(k, 3, 48) * 6)) % 340) - 10; if (calma(x, y)) continue; if (v === 'tronco' ? (y > 128 && y < 172) : y > orillaY(x, v) - 2) continue; for (let i = 0; i < 4; i++) tinta(x + i, y, BL, 0.35); }
  if (v !== 'tronco') for (const [x, y, k] of [[60, S.yb - 26, 0], [184, S.yb - 36, 1], [250, S.yb - 18, 2], [120, S.yb - 14, 3]]) nenufar(x, y, t, k, k === 1);
  // una garza al fondo, en la orilla de enfrente, que pica de vez en cuando
  if (v !== 'arena') { const gx = v === 'tronco' ? 92 : 288, gy = S.yf + 20, pica = (t % 5) > 4.3; R.linea(gx, gy, gx, gy - 6, hex('#5a6a7a')); ovalo(gx + 1, gy - 8, 3, 2, hex('#7a8aa0')); if (pica) R.linea(gx - 1, gy - 8, gx - 4, gy - 3, hex('#7a8aa0')); else { R.linea(gx - 1, gy - 9, gx - 2, gy - 13, hex('#7a8aa0')); R.linea(gx - 2, gy - 13, gx - 6, gy - 13, hex('#e8c040')); } }
  // las nubes que pasan reflejadas, a trozos
  { const cx = ((t * 6) % 420) - 60, y0 = S.yf + 10; for (let y = y0; y < y0 + 6; y++) for (let x = Math.max(0, Math.round(cx)); x < Math.min(320, cx + 50); x++) if (((x + y) & 1) && !calma(x, y) && (v === 'tronco' ? y < 128 : y < orillaY(x, v) - 2)) tinta(x, y, BL, 0.18); } };
// la cartulina con la forma del hocico visto desde arriba: «U» redonda o «V» afilada (solo la forma y los orificios, sin letra)
const CARTON = hex('#f2e6c8'), CARTONS = hex('#d4c49c');
const cartulina = (x, y, forma) => { x = Math.round(x); y = Math.round(y); const w = 30, hh = 36;
  for (let j = 0; j < hh + 2; j++) for (let i = 0; i < w + 2; i++) tinta(x + 3 + i, y + 4 + j, K, 0.3);
  rc(x - 1, y - 1, x + w + 1, y + hh + 1, K); rc(x, y, x + w, y + hh, CARTON); rc(x, y + hh - 2, x + w, y + hh, CARTONS); R.linea(x, y, x + w, y, BL); R.linea(x + w, y + 1, x + w, y + hh, CARTONS);
  const col = forma === 'U' ? hex('#2a6a3a') : hex('#3a8a5a'), cx = x + w / 2;
  for (let g2 = -2; g2 <= 2; g2++) {
    if (forma === 'U') { for (let i = 0; i <= 40; i++) { const an = Math.PI * i / 40, X = Math.round(cx + Math.cos(an) * (10 + g2 * 0.5)), Y = Math.round(y + 20 + Math.sin(an) * (10 + g2 * 0.5)); R.pset(X, Y, col); } R.linea(Math.round(cx - 10 - g2 * 0.5), y + 5, Math.round(cx - 10 - g2 * 0.5), y + 20, col); R.linea(Math.round(cx + 10 + g2 * 0.5), y + 5, Math.round(cx + 10 + g2 * 0.5), y + 20, col); }
    else { R.linea(Math.round(cx - 11 + g2 * 0.5), y + 4, Math.round(cx + g2 * 0.3), y + 32, col); R.linea(Math.round(cx + 11 + g2 * 0.5), y + 4, Math.round(cx + g2 * 0.3), y + 32, col); } }
  // los dos orificios de la nariz, en la punta
  const ny = forma === 'U' ? y + 25 : y + 24; for (const dx of forma === 'U' ? [-3, 3] : [-2, 2]) { R.pset(Math.round(cx + dx), ny, K); R.pset(Math.round(cx + dx), ny + 1, K); } };
// la mano de Atom con su cartulina: el brazo canónico entra en diagonal desde abajo, cerca del borde
const conCartulina = (forma, x, y, dir) => { cartulina(x, y, forma); const wx = dir < 0 ? x + 36 : x - 6, wy = y + 28;
  T.brazo(R, wx + (dir < 0 ? 16 : -16), 236, wx, wy, MANGA, dir, { codo: [wx + (dir < 0 ? 22 : -22), Math.round((236 + wy) / 2)] }); };
const p9 = (t) => {
  pintaOrilla('barro'); vidaOrilla(t, 'barro');
  // una rana en el nenúfar que salta al agua cuando llega la mano
  { const salta = tramo(t, APART - 0.2, APART + 0.4); if (salta < 1) { const fx = Math.round(lerp(184, 222, salta)), fy = Math.round(64 - Math.sin(salta * Math.PI) * 14); ovalo(fx, fy, 4, 2, K); ovalo(fx, fy, 3, 1, hex('#5aa03a')); R.pset(fx - 2, fy - 2, hex('#f8d040')); R.pset(fx + 1, fy - 2, hex('#f8d040')); }
    else if (t < APART + 1.4) for (let k = 0; k < 30; k++) { const an = k / 30 * Math.PI * 2, r = 3 + (t - APART - 0.4) * 10; tinta(222 + Math.cos(an) * r, 70 + Math.sin(an) * r * 0.4, BL, 0.5); } }
  const cr = T.a_caiman(R, 172, 162, t, { especie: 'caiman', s: 3.4, dir: 1, parpadeo: true, boca: t > SNOUT + 0.3 ? 0.2 : 0 });
  // la mano trae las dos cartulinas en «tell them apart», retira la V y deja la U ante el hocico en «U-shaped»
  const sube = tramo(t, APART - 0.4, APART + 0.4), cambia = tramo(t, ALLIGATOR - 0.2, USHAPED - 0.2);
  const ux = Math.round(lerp(250, cr.hocico[0] + 6, cambia)), uy = Math.round(lerp(210, lerp(96, 112, cambia), sube));
  if (sube > 0) { cartulina(ux + 10 - Math.round(cambia * 4), uy - 12 + Math.round(cambia * 6), 'V'); conCartulina('U', ux, uy, -1); }
  if (t > USHAPED + 0.3) T.visto(R, ux + 4, uy - 22, 2);
  if (t < APART - 0.4) globoIcono('?', 220, 104, tramo(t, P9 + 0.4, P9 + 0.7));
};
const p10 = (t) => {
  pintaOrilla('arena'); vidaOrilla(t, 'arena');
  // un cangrejo violinista que corre de lado por la arena y un charrán que cruza
  { const kx = Math.round(320 - ((t - P10) * 30) % 360), ky = 170; ovalo(kx, ky, 3, 2, K); ovalo(kx, ky, 2, 1, hex('#e86a3a')); R.pset(kx + 3, ky - 2, hex('#f8e8d0')); R.pset(kx + 4, ky - 2, hex('#f8e8d0')); R.pset(kx - 2, ky - 2, K); R.pset(kx + 1, ky - 2, K); for (const dx of [-3, -1, 1, 3]) R.pset(kx + dx, ky + 2 + (Math.floor(t * 10) % 2), K); }
  { const bx = Math.round(((t - P10) * 40) % 380) - 30, by = 66 + Math.round(Math.sin(t * 2) * 3), al = Math.floor(t * 6) % 2; R.linea(bx - 5, by - al * 2, bx, by, BL); R.linea(bx, by, bx + 5, by - al * 2, BL); R.pset(bx + 1, by + 1, K); }
  const cr = T.a_caiman(R, 148, 164, t, { especie: 'cocodrilo', s: 3.4, dir: -1, parpadeo: true }); dientesCoco(cr.hocico[0], cr.hocico[1], 3.4, -1, 0.8);
  const acerca = tramo(t, POINTED - 0.5, VEE - 0.1), vx = Math.round(lerp(cr.hocico[0] - 64, cr.hocico[0] - 40, acerca)), vy = Math.round(lerp(214, 108, ease(Math.min(1, acerca * 1.3))));
  cartulina(vx - 10, vy - 10, 'U'); conCartulina('V', vx, vy, 1);
  if (t > VEE + 0.3) T.visto(R, vx + 4, vy - 22, 2);
};
// los dientes de abajo del cocodrilo, que asoman con la boca cerrada (el sprite pone un píxel; aquí, colmillos que se leen)
const DIENTE = hex('#f6f2e2');
const dientesCoco = (hx, hy, s, dir, e = 1) => { const k = 0.85 * s;
  for (const [du, dv, alto] of [[3.6, 0.6, 1.0], [6.2, 0.7, 0.8], [9.0, 0.8, 0.6]]) { const x = Math.round(hx - dir * du * k), y = Math.round(hy + dv * k), w = Math.max(1, Math.round(e * 1.2)), a = Math.max(2, Math.round(e * 2.6 * alto));
    R.poligono([[x - w - 1, y + 1], [x + w + 1, y + 1], [x, y - a - 1]], K); R.poligono([[x - w, y], [x + w, y], [x, y - a]], DIENTE); if (e > 1.5) R.linea(x + (dir > 0 ? -w : w), y, x, y - a, hex('#c8c0a8')); } };
const p11 = (t) => {
  pintaOrilla('tronco'); vidaOrilla(t, 'tronco');
  const cx = 104, cy = 134, s = 5.2, cr = T.a_caiman(R, cx, cy, t, { especie: 'cocodrilo', s, dir: 1, parpadeo: true }); dientesCoco(cr.hocico[0], cr.hocico[1], s, 1, 1);
  // la lupa: llega desde abajo hasta la punta del hocico y se queda sobre los dientes de abajo
  const [hx, hy] = cr.hocico, va = tramo(t, P11 + 0.2, LOWER - 0.1), lx = Math.round(lerp(250, hx - 24, va)), ly = Math.round(lerp(150, hy, va)), r = 26, z = 2.4;
  const cur = lienzo(), copia = Uint32Array.from(cur);
  { const tmp = R.nuevo(), prev = R.usar(tmp);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const sx = Math.round(lx + (x - lx) / z), sy = Math.round(ly + (y - ly) / z); tmp[y * 320 + x] = copia[Math.max(0, Math.min(179, sy)) * 320 + Math.max(0, Math.min(319, sx))]; }
    const cz = T.a_caiman(R, Math.round(lx + (cx - lx) * z), Math.round(ly + (cy - ly) * z), t, { especie: 'cocodrilo', s: s * z, dir: 1, parpadeo: true }); dientesCoco(cz.hocico[0], cz.hocico[1], s * z, 1, z);
    R.usar(prev);
    for (let y = ly - r; y <= ly + r; y++) for (let x = lx - r; x <= lx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const dd = Math.hypot(x - lx, y - ly); if (dd <= r) cur[y * 320 + x] = dd > r - 6 && x < lx - 4 && y < ly - 4 && ((x + y) & 1) ? mez(tmp[y * 320 + x], BL, 0.35) : tmp[y * 320 + x]; } }
  for (let k = 0; k < 140; k++) { const an = k / 140 * Math.PI * 2; for (const [dr, col] of [[0, K], [1, hex('#c8a040')], [2, hex('#e8c860')], [3, K]]) R.pset(Math.round(lx + Math.cos(an) * (r + dr)), Math.round(ly + Math.sin(an) * (r + dr)), col); }
  // el mango y la mano que lo sostiene, desde abajo
  const mx = lx + 19, my = ly + 19; for (let i = 0; i < 16; i++) { const X = mx + i, Y = my + i; R.pset(X, Y - 1, K); R.pset(X, Y, hex('#7a4a22')); R.pset(X, Y + 1, hex('#5a3418')); R.pset(X, Y + 2, K); }
  T.brazo(R, mx + 34, 240, mx + 16, my + 18, MANGA, -1, { codo: [mx + 40, Math.round((240 + my) / 2) + 10] });
  if (t > TEETH && t < TEETH + 1.8) { for (const k of [0, 1, 2]) destello(lx - 12 + k * 12, ly + 8 + (k % 2) * 3, Math.floor(t * 6 + k) % 2 ? 1 : 2); globoIcono('!', lx, ly - r - 24, tramo(t, TEETH, TEETH + 0.3)); }
};
// ── 12 · INSERTO: el tablón de la estación de guardas; la gráfica se hunde ─────────────────────────────────────────
const PAN = [hex('#5a3a24'), hex('#6a462a'), hex('#7a5232'), hex('#8a603a')], CORCHO = [hex('#a8804a'), hex('#c09a60'), hex('#d4b07a'), hex('#8a6a3a')];
const tablon = () => fijo('tablon', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(x / 22), xx = x % 22, v = Math.sin(y * 0.08 + Math.sin(y * 0.02 + tab) * 3 + tab);
    R.pset(x, y, xx === 0 ? PAN[0] : calma(x, y) ? PAN[2] : v > 0.7 ? PAN[3] : v > -0.3 ? PAN[2] : PAN[1]); }
  // el corcho con su marco
  rc(10, 24, 264, 166, K); rc(11, 25, 263, 165, hex('#6a4426')); rc(15, 29, 259, 161, K);
  for (let y = 30; y < 161; y++) for (let x = 16; x < 259; x++) { const n = h(x, y, 50); R.pset(x, y, n < 0.15 ? CORCHO[3] : n < 0.45 ? CORCHO[0] : n < 0.85 ? CORCHO[1] : CORCHO[2]); }
  // la hoja de papel cuadriculado con sus ejes
  rc(44, 36, 204, 150, mez(CORCHO[0], K, 0.35)); rc(40, 32, 200, 146, hex('#f4f2ea'));
  for (let x = 40; x <= 200; x += 8) R.linea(x, 32, x, 146, hex('#cce0e8')); for (let y = 32; y <= 146; y += 8) R.linea(40, y, 200, y, hex('#cce0e8'));
  R.linea(52, 40, 52, 136, K); R.linea(52, 136, 194, 136, K); R.linea(51, 40, 51, 136, K); for (let k = 0; k < 5; k++) R.linea(48, 48 + k * 20, 52, 48 + k * 20, K);
  for (let k = 0; k < 7; k++) R.linea(60 + k * 22, 136, 60 + k * 22, 139, K);
  // fotos clavadas (garza, lancha, junco), una hoja con números y una mapita
  for (const [fx, fy, k] of [[212, 36, 0], [218, 82, 1], [24, 118, 2]]) { rc(fx - 1, fy - 1, fx + 31, fy + 33, K); rc(fx, fy, fx + 30, fy + 32, BL); rc(fx + 2, fy + 2, fx + 28, fy + 24, k === 0 ? hex('#8ab8d8') : k === 1 ? hex('#c8b860') : hex('#6a9a4a'));
    if (k === 0) { R.linea(fx + 14, fy + 10, fx + 14, fy + 22, BL); ovalo(fx + 15, fy + 9, 3, 2, BL); R.linea(fx + 12, fy + 6, fx + 9, fy + 6, hex('#f0c030')); }
    if (k === 1) { rc(fx + 6, fy + 14, fx + 24, fy + 18, hex('#e8e8e0')); rc(fx + 18, fy + 8, fx + 22, fy + 14, hex('#6a6a72')); }
    if (k === 2) for (let i = 0; i < 6; i++) R.linea(fx + 5 + i * 4, fy + 24, fx + 7 + i * 4, fy + 6, hex('#2a5a1e'));
    ovalo(fx + 15, fy + 1, 2, 2, hex('#e83a3a')); }
  rc(212, 124, 252, 156, hex('#f8f0b0')); for (let k = 0; k < 4; k++) R.linea(216, 130 + k * 6, 244 - k * 4, 130 + k * 6, hex('#8a8a7a')); ovalo(232, 125, 2, 2, hex('#3a6ae8'));
  // el sombrero de guarda en su percha y el interruptor
  rc(286, 70, 288, 74, K); ovalo(292, 90, 16, 3, K); ovalo(292, 89, 15, 2, hex('#a8885a')); rc(282, 76, 302, 88, K); rc(283, 77, 301, 88, hex('#c0a070')); R.linea(283, 85, 301, 85, hex('#5a3a22'));
  rc(286, 120, 296, 136, K); rc(287, 121, 295, 135, hex('#e8e4d8')); rc(290, 124, 292, 130, hex('#a8a498'));
  // el borde de la mesa abajo con la radio y la taza
  rc(0, 168, 319, 179, K); for (let y = 169; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, Math.sin(x * 0.09 + y) > 0.5 ? hex('#8a5a32') : hex('#7a4e2a')); R.linea(0, 169, 319, 169, hex('#a87040'));
  rc(270, 150, 306, 170, K); rc(271, 151, 305, 169, hex('#4a5a4a')); for (let i = 0; i < 6; i++) R.linea(274 + i * 3, 155, 274 + i * 3, 165, hex('#2a3a2a')); ovalo(298, 160, 4, 4, hex('#c8c8c0')); R.linea(300, 150, 312, 132, K);
});
const CURVA = (u) => { // u 0–1 a lo largo del eje x; la población: alta, se hunde con la caza, y abajo
  if (u < 0.36) return 52 + Math.sin(u * 20) * 3; if (u < 0.62) return lerp(52, 124, ease((u - 0.36) / 0.26)) + Math.sin(u * 30) * 2; return 124 + Math.sin(u * 25) * 1.5; };
const p12 = (t) => {
  tablon();
  // una polilla que ronda la lámpara (luz de la mesa) y la manecilla del reloj de la radio
  { const mx = Math.round(240 + Math.sin(t * 3) * 20), my = Math.round(16 + Math.cos(t * 2.3) * 6); R.pset(mx, my, hex('#d8c8a0')); R.pset(mx + (Math.floor(t * 12) % 2 ? 1 : -1), my - 1, hex('#e8dcc0')); }
  for (let y = 0; y < 180; y += 1) for (let x = 0; x < 120; x++) if (((x + y) & 3) === 0 && Math.hypot(x - 20, y - 0) < 110) tinta(x, y, hex('#fff0c0'), 0.06);
  // la gráfica: la mano la va trazando; se hunde en «nearly wiped out by hunting»
  const u = Math.min(1, 0.04 + tramo(t, P12 + 0.2, NEARLY) * 0.32 + tramo(t, NEARLY, HUNTING + 0.1) * 0.3 + tramo(t, HUNTING + 0.1, P13 - 0.1) * 0.34);
  let px = 54, py = CURVA(0); const n = Math.round(u * 140);
  for (let i = 1; i <= n; i++) { const x = 54 + i, y = Math.round(CURVA(i / 140)); R.linea(px, Math.round(py), x, y, hex('#c82a2a')); R.linea(px, Math.round(py) + 1, x, y + 1, hex('#8a1a1a')); px = x; py = y; }
  // caimancitos de la leyenda: muchos arriba, uno abajo
  for (let k = 0; k < 4; k++) T.a_caiman(R, 68 + k * 22, 76, t, { especie: 'caiman', s: 0.8, dir: 1 });
  if (u > 0.66) { T.a_caiman(R, 176, 118, t, { especie: 'caiman', s: 0.8, dir: 1 }); }
  if (t > HUNTING - 0.2) { const q = tramo(t, HUNTING - 0.2, HUNTING + 0.1); T.chincheta(R, 150, 112, t, undefined, { baja: q }); if (q >= 1) globoIcono('!', 150, 86, tramo(t, HUNTING + 0.1, HUNTING + 0.4)); }
  // la punta de la línea, que brilla mientras avanza
  if (u < 1) { R.disco(px, Math.round(py), 2, hex('#ff6a5a')); destello(px, Math.round(py), Math.floor(t * 8) % 2 ? 2 : 3, hex('#fff0d0')); }
};

// ── 13 · INSERTO: el nido protegido; salen las crías ───────────────────────────────────────────────────────────────
const HUEVOS = [[192, 132], [200, 130], [208, 132], [196, 136], [204, 136], [212, 135]];
const p13 = (t) => {
  pintaOrilla('nido'); vidaOrilla(t, 'nido');
  // el montículo del nido: hojas y barro, con los huevos encima
  ovalo(204, 146, 44, 14, hex('#3a2a1a')); ovalo(204, 144, 42, 12, hex('#5a4228')); for (let k = 0; k < 60; k++) { const an = h(k, 1, 60) * Math.PI * 2, rr = h(k, 2, 60), x = Math.round(204 + Math.cos(an) * 40 * rr), y = Math.round(142 + Math.sin(an) * 10 * rr); R.linea(x, y, x + 3, y - 1, h(k, 3, 60) < 0.5 ? hex('#8a6a3a') : hex('#6a8a2a')); }
  const nace = (k) => BOUNCED + k * 0.22;
  for (let k = 0; k < HUEVOS.length; k++) { const [x, y] = HUEVOS[k], tr = t > nace(k), tiembla = t > nace(k) - 0.5 && !tr ? (Math.floor(t * 20) % 2) : 0;
    ovalo(x + tiembla, y, 3, 4, K); ovalo(x + tiembla, y, 2, 3, tr ? hex('#e8e0c8') : hex('#f4f0e2')); if (tr) { R.linea(x - 2, y - 1, x + 2, y - 1, K); R.pset(x - 1, y - 2, K); R.pset(x + 1, y - 2, K); } else R.pset(x - 1, y - 2, BL); }
  // la madre vigila junto al nido
  T.a_caiman(R, 92, 158, t, { especie: 'caiman', s: 2.4, dir: 1, parpadeo: true, boca: t > BOUNCED + 0.4 && t < BOUNCED + 1.2 ? 0.3 : 0 });
  // el cartel «!» se clava en «endangered»; las estacas con su cuerda suben en «protection»
  const cl = tramo(t, ENDANGERED - 0.4, ENDANGERED), sy = Math.round(lerp(-40, 0, cl));
  if (cl > 0) { rc(272, 96 + sy, 275, 160, K); R.linea(273, 96 + sy, 273, 159, hex('#a07a4a')); rc(258, 82 + sy, 290, 108 + sy, K); rc(259, 83 + sy, 289, 107 + sy, hex('#f4f0e2')); rc(259, 83 + sy, 289, 86 + sy, hex('#c83a2a')); R.icono('!', 271, 89 + sy, hex('#e83a3a'), hex('#9aa0b8'), 2);
    if (t > ENDANGERED && t < ENDANGERED + 0.6) for (let k = 0; k < 8; k++) R.pset(268 + k, 161 + (k % 2), hex('#6a4a2a')); }
  const EST = [[150, 152], [170, 158], [196, 162], [224, 162], [250, 156], [262, 146]];
  let prevE = null;
  for (let k = 0; k < EST.length; k++) { const [x, y] = EST[k], su = tramo(t, PROTECTION - 0.6 + k * 0.12, PROTECTION - 0.2 + k * 0.12); if (su <= 0) { prevE = null; continue; } const top = Math.round(y - 16 * su);
    rc(x - 1, top, x + 1, y, K); R.linea(x, top + 1, x, y - 1, hex('#c8a060')); if (prevE && su >= 1) { const [qx, qy] = prevE; R.linea(qx, qy, x, top + 3, hex('#e8d8a8')); R.linea(qx, qy + 1, x, top + 4, hex('#a89868')); } prevE = [x, top + 3]; }
  // las crías salen en «bounced back» y corren al agua
  for (let k = 0; k < HUEVOS.length; k++) { const t0 = nace(k); if (t < t0) continue; const [x, y] = HUEVOS[k], u = tramo(t, t0 + 0.2, t0 + 2.8), cx = Math.round(lerp(x, 130 + k * 24, u)), cy = Math.round(lerp(y + 2, 90 + (k % 3) * 2, u));
    T.a_caiman(R, cx, cy, t + k, { especie: 'caiman', s: 0.85, dir: cx < x ? -1 : 1, anda: u > 0 && u < 1 ? 1 : 0, agua: u >= 1 ? 1 : 0 }); }
};

// ── 14 · INSERTO: el escritorio de la agencia; el sello de 1987 ───────────────────────────────────────────────────
const ROBLE = [hex('#7a5230'), hex('#8a6038'), hex('#9a6e42'), hex('#b0844e')];
const escritorio = () => fijo('escritorio', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(y / 30), off = h(tab, 0, 70) * 300, v = Math.sin((x + off) * 0.04 + Math.sin((x + off) * 0.01 + tab * 2) * 3.4 + (y % 30) * 0.3);
    R.pset(x, y, y % 30 === 0 ? hex('#4a2e1a') : calma(x, y) ? ROBLE[1] : v > 0.8 ? ROBLE[3] : v > 0.2 ? ROBLE[2] : v > -0.6 ? ROBLE[1] : ROBLE[0]); }
  // el vade de cuero verde
  rc(64, 22, 250, 172, K); rc(65, 23, 249, 171, hex('#2a5a3e')); for (let y = 23; y < 172; y++) for (let x = 65; x < 250; x++) if (h(x, y, 71) < 0.08) R.pset(x, y, hex('#24503a')); rc(65, 23, 249, 28, hex('#6a3a22')); rc(65, 166, 249, 171, hex('#6a3a22'));
  // el expediente: la carpeta y la hoja con el caimán dibujado y las líneas
  rc(90, 34, 230, 164, hex('#c8a868')); R.linea(90, 34, 230, 34, hex('#e0c890')); rc(96, 30, 222, 160, mez(hex('#2a5a3e'), K, 0.3)); rc(94, 28, 220, 158, hex('#f8f6ee'));
  rc(102, 36, 134, 58, hex('#e8eef0')); R.linea(102, 58, 134, 58, hex('#9aa0a8'));
  for (let k = 0; k < 9; k++) { const y = 68 + k * 8, w = [96, 104, 82, 100, 90, 70, 98, 60, 84][k]; R.linea(104, y, 104 + w, y, hex('#9a9aa2')); R.linea(104, y + 1, 104 + w - 4, y + 1, hex('#c8c8cc')); }
  for (let i = 0; i < 26; i++) R.pset(108 + i, 150 + Math.round(Math.sin(i * 0.8) * 2), hex('#2a3a8a'));
  // el tampón de tinta, las gafas, el lápiz y los clips
  rc(254, 132, 296, 156, K); rc(255, 133, 295, 155, hex('#3a3a46')); rc(258, 136, 292, 152, hex('#8a1a2a')); for (let k = 0; k < 6; k++) R.pset(262 + k * 5, 140 + (k % 3) * 4, hex('#aa2a3a'));
  for (const gx of [22, 38]) { for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2; R.pset(Math.round(gx + Math.cos(an) * 7), Math.round(140 + Math.sin(an) * 5), K); } } R.linea(29, 139, 31, 139, K); R.linea(15, 139, 6, 132, K); R.linea(45, 139, 54, 132, K);
  R.linea(20, 70, 54, 96, K); R.linea(21, 70, 55, 96, hex('#e8c030')); R.linea(20, 71, 54, 97, hex('#c89a20')); R.linea(54, 96, 57, 98, hex('#e8a8a0'));
  for (const [cx, cy] of [[30, 46], [44, 52], [262, 104]]) { R.linea(cx, cy, cx + 6, cy, hex('#c8ccd4')); R.linea(cx, cy + 3, cx + 6, cy + 3, hex('#c8ccd4')); R.pset(cx, cy + 1, hex('#c8ccd4')); R.pset(cx, cy + 2, hex('#c8ccd4')); R.pset(cx + 6, cy + 1, hex('#c8ccd4')); }
  // la taza (arriba a la derecha, bajo la esquina tranquila)
  ovalo(282, 76, 12, 12, K); ovalo(282, 76, 11, 11, hex('#e8e4dc')); ovalo(282, 76, 8, 8, hex('#5a3418')); ovalo(280, 74, 3, 2, hex('#7a4a24')); rc(293, 72, 299, 80, K); rc(294, 73, 298, 79, hex('#e8e4dc')); rc(295, 74, 297, 78, ROBLE[1]);
});
const p14 = (t) => {
  escritorio();
  // el caimán del expediente, en su cuadro, y el vapor de la taza
  T.a_caiman(R, 120, 54, t, { especie: 'caiman', s: 0.75, dir: 1 });
  for (let k = 0; k < 3; k++) { const q = ((t * 0.6 + k / 3) % 1), y = Math.round(62 - q * 26), x = Math.round(282 + Math.sin(q * 6 + k * 2) * 3); if (y > 48) { tinta(x, y, BL, 0.4 * (1 - q)); tinta(x + 1, y - 1, BL, 0.3 * (1 - q)); } }
  // la pestaña roja del «!» (en peligro) pasa a verde con el sello
  const listo = t > RECOVERED + 0.3; rc(220, 40, 232, 54, K); rc(220, 41, 231, 53, listo ? hex('#3aa84a') : hex('#d83a3a')); if (listo) T.visto(R, 222, 43, 1); else R.icono('!', 224, 43, BL, K, 1);
  // el sello: entra en «1987», se entinta y estampa en «recovered»
  const entra = tramo(t, Y1987 - 0.3, Y1987 + 0.5), entinta = tramo(t, Y1987 + 0.6, Y1987 + 0.9) - tramo(t, Y1987 + 1.0, Y1987 + 1.3), va = tramo(t, Y1987 + 1.3, RECOVERED - 0.4), baja = tramo(t, RECOVERED - 0.3, RECOVERED) - tramo(t, RECOVERED + 0.25, RECOVERED + 0.7);
  const sale = tramo(t, RECOVERED + 0.5, RECOVERED + 1.3), sx = Math.round(lerp(lerp(lerp(330, 276, entra), 160, va), 300, sale)), sy = Math.round(lerp(lerp(lerp(200, 132, entra), 106, va), 210, sale) - 10 + entinta * 6 + baja * 8 - (1 - baja) * 6);
  // la marca del sello en la hoja
  if (t > RECOVERED) { const mx = 136, my = 98; for (let i = 0; i < 2; i++) { R.linea(mx - 2 + i, my - 2 + i, mx + 52 - i, my - 2 + i, hex('#c82a3a')); R.linea(mx - 2 + i, my + 24 - i, mx + 52 - i, my + 24 - i, hex('#c82a3a')); R.linea(mx - 2 + i, my - 2, mx - 2 + i, my + 24, hex('#c82a3a')); R.linea(mx + 52 - i, my - 2, mx + 52 - i, my + 24, hex('#c82a3a')); }
    R.numero('1987', mx + 4, my + 16, { tam: 8, color: hex('#c82a3a'), sombra: false }); T.visto(R, mx + 40, my + 4, 1); }
  // el sello y la mano que lo agarra
  rc(sx - 13, sy + 10, sx + 13, sy + 18, K); rc(sx - 12, sy + 11, sx + 12, sy + 17, hex('#6a4a2a')); rc(sx - 12, sy + 16, sx + 12, sy + 17, hex('#8a1a2a'));
  rc(sx - 3, sy - 2, sx + 3, sy + 10, K); rc(sx - 2, sy - 1, sx + 2, sy + 10, hex('#9a6a3a')); ovalo(sx, sy - 4, 6, 4, K); ovalo(sx, sy - 4, 5, 3, hex('#b07a40')); R.pset(sx - 2, sy - 6, hex('#d8a060'));
  T.brazo(R, sx + 46, 236, sx + 7, sy + 2, MANGA, -1, { codo: [sx + 40, Math.round((236 + sy) / 2) + 8] });
  if (t > RECOVERED && t < RECOVERED + 0.5) for (const [dx, dy] of [[-18, 4], [18, 4], [-14, 22], [14, 22]]) destello(sx + dx, sy + dy + 8, 1);
};

// ── 15 · el campo de golf: un caimán cruza; el golfista espera ─────────────────────────────────────────────────────
const p15 = (t) => {
  const o = { encuadre: 'golf' }, g = T.everglades(R, t, o);
  // 23,000,000 en «23 million», en el cielo sobre las casas
  const n23 = tramo(t, M23 - 0.2, M23 + 0.2) - tramo(t, OFTEN, OFTEN + 0.3); if (n23 > 0.02) R.numero('23,000,000', 150, 58, { tam: 16, centro: true, n: Math.round(n23 * 200) });
  // el golfista va hacia el green, se para cuando cruza el caimán, espera y luego sonríe
  const v = tramo(t, P15 + 0.1, OFTEN - 0.1), gx = Math.round(lerp(300, 214, v)), espera = t > OFTEN && t < PATHS + 0.6, sigue = tramo(t, PATHS + 0.7, PATHS + 2.0);
  const gol = R.actor(EL.golfistaLF, Math.round(gx - sigue * 30), 166, t, { dir: -1, anda: (v > 0 && v < 1) || (sigue > 0 && sigue < 1), sorpresa: espera && t < PATHS - 0.4, sonrisa: t > PATHS - 0.3, sostiene: true });
  { const [mx, my] = gol.mano.map(Math.round); R.linea(mx, my, mx - 5, 166, hex('#9aa0a8')); R.linea(mx + 1, my, mx - 4, 166, K); R.linea(mx - 8, 166, mx - 4, 166, hex('#c8ccd4')); R.linea(mx - 8, 165, mx - 5, 165, K); }
  // el caimán cruza la calle de izquierda a derecha, por delante del golfista
  const c2 = tramo(t, P15 + 0.4, d(1.0) + 0.5), cx = Math.round(lerp(-50, 260, c2));
  T.a_caiman(R, cx, 174, t, { especie: 'caiman', s: 1.5, dir: 1, anda: c2 > 0 && c2 < 1 ? 0.8 : 0, parpadeo: true });
  T.evergladesDelante(R, t, o);
};

// el año de cada plano: 1947 en el porche; el hundimiento camino de 1987; 1987 en el sello; hoy en el resto
const año = (t) => t >= P4 && t < P5 ? 1947 : t >= P12 && t < P13 ? Math.round(lerp(1950, 1967, tramo(t, P12, P13))) : t >= P13 && t < P14 ? Math.round(lerp(1967, 1987, tramo(t, P13, P14))) : t >= P14 && t < P15 ? 1987 : 2026;
const efectos = [[0.4, 'motor'], [STILL, 'burbujas'], [THEYRE, 'viento'], [LAKE, 'burbujas'], [SEA, 'ola'],
  [P4 + 0.2, 'tecleo'], [NAMED - 1.0, 'papel'], [ALLIG, 'burbujas'], [DEADLIER - 0.2, 'burbujas'], [PLENTY, 'lapiz'], [AGENCY, 'aviso'],
  [ABOUT, 'maquina'], [N67, 'pop'], [CROCS - 0.8, 'chof'], [APART + 0.4, 'chof'], [USHAPED, 'papel'], [USHAPED + 0.4, 'brillo'],
  [VEE, 'papel'], [TEETH, 'brillo'], [NEARLY, 'lapiz'], [HUNTING + 0.1, 'golpecito'], [ENDANGERED, 'golpecito'], [BOUNCED, 'pop'],
  [RECOVERED, 'sello'], [M23, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14], [P15, p15]], { efectos, año });
''')
