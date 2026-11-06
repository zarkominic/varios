# Borrador de escenas del ep21, grupo S9: hp-flamel, hp-subasta, hp-preparado, hp-cierre (Flamel, la subasta y el cierre)
# Los instantes se escriben en el código como en('marca', fracción). Aquí se ponen como «@marca:segundos» (el segundo de la
# escena en que la voz inglesa dice la palabra, de linea.json) y W() los pasa a fracción de su frase.
import re

E = {}
FR = {'flamel': (0.5, 23.039), 'subasta': (0.5, 13.031), 'preparado': (0.9, 11.792), 'detalles': (0.5, 12.321), 'casa': (12.821, 18.647)}


def W(s):
    def f(m):
        a, b = FR[m.group(1)]
        return "en('%s', %.3f)" % (m.group(1), (float(m.group(2)) - a) / (b - a))
    return re.sub(r'@(\w+):(-?[\d.]+)', f, s)


# piezas comunes (cada escena es su propio .html, así que van en cada cuerpo)
COMUN = r'''
const P = T.PIEZAS_HP, C = T.C, K = hex('#141018');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255, r2 = c2 & 255, g2 = (c2 >>> 8) & 255, b2 = (c2 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (b2 - b1) * a) << 16) | (Math.round(g1 + (g2 - g1) * a) << 8) | Math.round(r1 + (r2 - r1) * a)) >>> 0; };
// un halo tramado (no tapa: puntea) alrededor de (cx, cy)
const hsh = (x, y, k) => { const v = Math.sin(x * 12.9898 + y * 78.233 + k * 37.719) * 43758.5453; return v - Math.floor(v); };
const halo = (cx, cy, r, c, k = 0) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && ((x + y) & 1) && hsh(x, y, k % 3) < (1 - d) * (1 - d) * 1.4 + 0.08) R.pset(x, y, c); } };
// destellos en cruz que giran alrededor de (cx, cy)
const chispas = (cx, cy, r, t, c = hex('#fff4c0'), n = 5) => { for (let k = 0; k < n; k++) { const a = k * 6.283 / n + t * 3, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.8); if (Math.sin(t * 11 + k * 2) > -0.2) { R.pset(x, y, c); R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); } } };
// un sprite de letras con su paleta (s: escala)
const pinta = (g, x0, y0, pal, s = 1) => { for (let j = 0; j < g.length; j++) for (let i = 0; i < g[j].length; i++) { const c = pal[g[j][i]]; if (c != null) R.rect(x0 + i * s, y0 + j * s, x0 + i * s + s - 1, y0 + j * s + s - 1, c); } };
'''

LUPA = r'''
// la lupa grande: aumenta k veces lo que hay debajo (copia antes los píxeles), aro de latón con su luz, el reflejo del
// cristal y el mango de madera hacia la mano (mano = [x, y]) o hacia donde se diga
const lente = (cx, cy, r, k = 2.5, mano = null) => {
  cx = Math.round(cx); cy = Math.round(cy);
  const n = 2 * r + 1, S = new Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) S[j * n + i] = R.pget(cx - r + i, cy - r + j);
  if (mano) {
    const [hx, hy] = mano, a = Math.atan2(hy - cy, hx - cx), L = Math.hypot(hx - cx, hy - cy);
    for (let d = r + 1; d <= L + 1; d += 0.5) R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), 2, K);
    for (let d = r + 1; d <= L; d += 0.5) { const x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d); R.disco(x, y, 1, d < r + 5 ? hex('#c8902a') : hex('#7a4422')); if (d > r + 5) R.pset(x, y - 1, hex('#a86a3a')); }
  }
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) {
    const d = Math.hypot(i, j);
    if (d <= r - 2.5) {
      let c = S[Math.round(r + j / k) * n + Math.round(r + i / k)] || K;
      c = mez(c, hex('#e4f2ff'), 0.1);
      const diag = i + j;
      if ((diag < -r * 0.85 && diag > -r * 1.05) || (diag < -r * 1.2 && diag > -r * 1.28)) c = mez(c, hex('#ffffff'), 0.55);
      R.pset(cx + i, cy + j, c);
    } else if (d <= r - 1.5) R.pset(cx + i, cy + j, hex('#6a4a18'));
    else if (d <= r + 0.9) { const luz = i + j; R.pset(cx + i, cy + j, luz < -r * 0.6 ? hex('#fff0b0') : luz < r * 0.3 ? hex('#e8b440') : hex('#a8701e')); }
    else if (d <= r + 1.9) R.pset(cx + i, cy + j, K);
  }
};
// la moto en miniatura (12 × 7), tan pequeña que solo se ve con la lupa
const MOTO_MINI = ['.....kk.....', '....kAAk.kk.', '..kkAAAAkOk.', '.kKkkkkkkKk.', 'kKlKk..kKlKk', 'kKKKk..kKKKk', '.kkk....kkk.'];
const motoMini = (x, y, faro = false) => pinta(MOTO_MINI, x, y, { k: K, A: hex('#d8283a'), K: hex('#4a4a56'), l: hex('#d8d8e8'), O: hex(faro ? '#fff8c0' : '#c8a040') });
'''

# ───────────────────────────────────────────────────────── FLAMEL ─────────────────────────────────────────────────────────
E['hp-flamel'] = ('Flamel', '''// HP-FLAMEL (frase 31), París hacia 1400, y hoy. Cuatro planos:
// 1. (0 → «who died», 5,7 s) París hacia 1400: el escribano Flamel copia en su puesto, con la pluma en el libro abierto
//    sobre el atril; un cliente entra por la calle (las palomas se le espantan), Flamel moja la pluma en «stone», levanta
//    el libro acabado en «existed» y se lo da al cliente en «scribe».
// 2. (→ «The legend», 5,4 s) la fachada de piedra de su casa: Flamel llega con su libro y abre la puerta en «house»; en
//    «1407» el año grabado brilla y él entra; en «still standing» un fogonazo salta a hoy: dos turistas delante de la
//    misma casa, uno señala el año y el otro le hace una foto (flash en «standing»).
// 3. (→ «took hold», 6,6 s) la leyenda, en la mesa de las botellas: el alquimista levanta la piedra roja, que brilla en
//    «philosopher's stone» y hace latir las botellas; la acerca al lingote de plomo en «metal», que se vuelve oro en
//    «gold» y suelta tres monedas; en «eternal life» la flor mustia de la maceta se endereza y florece.
// 4. (→ fin, 6,1 s) la lápida en el museo, hoy: una guía espera junto al cordón; entran dos visitantes; en «tombstone» la
//    guía señala y se enciende la placa con «1418»; en «museum» el niño salta para verla («!»).''', W(COMUN + LUPA + r'''
const P2 = @flamel:5.73, P3 = @flamel:11.09, P4 = @flamel:17.65;
const piedraT = @flamel:2.30, existio = @flamel:3.42, escriba = @flamel:5.14, casaT = @flamel:7.66, anio = @flamel:8.44, sigue = @flamel:9.48, pie = @flamel:10.14;
const filo = @flamel:12.39, metal = @flamel:14.73, oro = @flamel:15.37, eterna = @flamel:16.43, tumba = @flamel:20.21, museo = @flamel:22.05;
const ESC = EL.escribano, CLIENTE = { C: hex('#7a4a2a'), c: hex('#5a3418') }, ALQ = { C: hex('#5a2a6a'), c: hex('#3a1a4a') };
// el atril de copista sobre el mostrador con el libro abierto: renglones hechos en la página derecha y n en la izquierda
const atrilLibro = (n) => {
  R.poligono([[160, 145], [196, 145], [192, 137], [164, 137]], hex('#5a3418')); R.linea(160, 145, 196, 145, K); R.linea(164, 137, 192, 137, hex('#8a5a30'));
  R.poligono([[163, 138], [193, 138], [190, 126], [166, 126]], K);
  R.poligono([[165, 137], [177, 137], [177, 127], [167, 127]], hex('#f4ead0')); R.poligono([[179, 137], [191, 137], [189, 127], [179, 127]], hex('#f4ead0'));
  R.linea(178, 127, 178, 137, hex('#a89070')); R.linea(165, 137, 191, 137, hex('#c8b890'));
  R.rect(180, 128, 182, 130, hex('#c8283a')); R.pset(181, 129, hex('#f0c040'));
  for (let i = 0; i < 4; i++) R.linea(184 - (i < 1 ? 0 : 4), 129 + i * 2, 188 - (i & 1), 129 + i * 2, hex('#3a3040'));
  for (let i = 0; i < Math.min(5, n); i++) R.linea(168, 129 + i * 2, 168 + (i === Math.floor(n) ? Math.round((n % 1) * 7) : 7), 129 + i * 2, hex('#3a3040'));
};
// la pluma de ganso en la mano (la punta en la mano)
const pluma = (mx, my) => { R.linea(mx, my, mx + 4, my - 8, K); R.linea(mx + 1, my - 1, mx + 5, my - 9, hex('#f4f0e8')); R.linea(mx + 2, my - 3, mx + 5, my - 7, hex('#d8d0c0')); R.pset(mx, my + 1, hex('#1a1a2a')); };
// una paloma que picotea y, al pasar alguien, echa a volar
const paloma = (x, y, t, vuela) => {
  if (vuela > 0) { const xx = Math.round(x - vuela * 60), yy = Math.round(y - vuela * 70 + Math.sin(vuela * 9) * 3), a = Math.sin(t * 30 + x) > 0; R.rect(xx - 2, yy, xx + 2, yy + 1, hex('#8a8a96')); R.pset(xx - 3, yy, hex('#4a4a56')); R.linea(xx - 1, yy, xx + 2, yy + (a ? -3 : 3), hex('#b8b8c4')); return; }
  const pica = Math.sin(t * 5 + x) > 0.6 ? 1 : 0;
  R.rect(x - 2, y - 3, x + 2, y - 1, hex('#8a8a96')); R.rect(x + 1, y - 3, x + 2, y - 2, hex('#b8b8c4')); R.pset(x - 3, y - 3 + pica, hex('#4a4a56')); R.pset(x - 3, y - 4 + pica, hex('#4a4a56')); R.pset(x - 4, y - 3 + pica, hex('#e8a040')); R.pset(x - 1, y, hex('#e86a4a')); R.pset(x + 1, y, hex('#e86a4a'));
};
const p1 = (t) => {
  T.real(R, t, { encuadre: 'paris' });
  // el cliente entra por la calle desde la izquierda y espera delante del puesto; con el libro, se vuelve y se va
  const u = tramo(t, 0.3, 2.8), va = tramo(t, escriba + 0.35, P2 + 0.6), cx = Math.round(lerp(-16, 104, u) - va * 70);
  const tiene = t > escriba + 0.05;
  const rc = R.actor(ESC, cx, 168, t, { pal: CLIENTE, dir: va > 0 ? -1 : 1, anda: (u > 0 && u < 1) || va > 0, habla: u >= 1 && t < existio && Math.sin(t * 8) > 0, sonrisa: tiene, sostiene: tiene ? true : false });
  if (tiene) P.libro(R, rc.mano[0], rc.mano[1] + 5, {});
  // las palomas de la calle se espantan cuando pasa el cliente
  for (const [px, py, k] of [[38, 170, 0], [54, 172, 1], [74, 169, 2]]) paloma(px, py, t, tramo(t, 0.9 + k * 0.25 + px / 120, 2.6 + k * 0.25 + px / 120));
  // Flamel copia: la pluma corre por el renglón; en «stone» la moja en el tintero; en «existed» levanta el libro acabado
  const fx = 146, escribe = t < existio - 0.2 && !(t > piedraT - 0.25 && t < piedraT + 0.35);
  const ens = t > existio - 0.2 && t < escriba + 0.05, da = t > escriba - 0.5 && t < escriba + 0.05;
  const mojar = t > piedraT - 0.25 && t < piedraT + 0.35;
  const obj = escribe ? [168 + ((t * 1.6) % 1) * 7, 132 + Math.floor((t * 1.6) % 5) * 2] : mojar ? [199, 138] : da ? [fx - 4, 134] : ens ? [fx + 17, 124] : [fx + 15, 138];
  const rf = R.actor(ESC, fx, 158, t, { dir: da ? -1 : 1, sostiene: obj, sonrisa: ens, habla: da && Math.sin(t * 9) > 0 });
  T.realDelante(R, t, { encuadre: 'paris' });
  atrilLibro(ens || t > escriba ? 5 : Math.min(5, t * 1.6));
  // el tintero y, en la mano, la pluma o el libro
  R.rect(196, 139, 202, 145, K); R.rect(197, 140, 201, 144, hex('#2a3a6a')); R.rect(197, 140, 201, 140, hex('#5a6aa8'));
  if (ens || da) { if (ens) halo(rf.mano[0], rf.mano[1] - 4, 11, hex('#ffe890'), Math.floor(t * 6)); P.libro(R, rf.mano[0], rf.mano[1] + 5, {}); }
  else if (t < escriba) pluma(rf.mano[0], rf.mano[1]);
};
const p2 = (t) => {
  const hoyU = t > sigue;
  T.real(R, t, { encuadre: 'paris', camara: 'casa' });
  // el año grabado brilla en «1407»
  const br = tramo(t, anio - 0.1, anio + 0.3) * (1 - tramo(t, anio + 1.2, anio + 1.8));
  if (br > 0) { halo(160, 92, 16, hex('#ffe890'), Math.floor(t * 8)); chispas(160, 92, 13 * br + 4, t); }
  if (!hoyU) {
    // la puerta se abre en «house» (la hoja gira y deja ver la luz de dentro) y se cierra al entrar Flamel
    const ab = tramo(t, casaT - 0.2, casaT + 0.3) * (1 - tramo(t, anio + 0.6, anio + 1.0));
    if (ab > 0) {
      R.rect(143, 112, 177, 161, hex('#2a1810'));
      for (let y = 118; y < 161; y += 2) R.linea(145, y, 175, y, mez(hex('#2a1810'), hex('#ffb04a'), 0.25 + 0.5 * (y - 118) / 43));
      R.rect(150, 122, 168, 160, hex('#3a2418')); R.linea(150, 136, 168, 136, hex('#5a3a20'));
      const w = Math.round(34 * (1 - ab * 0.82));
      R.rect(143, 110, 143 + w, 161, hex('#5a3418')); for (let x = 143; x < 143 + w; x += 6) R.linea(x, 110, x, 161, K); R.rect(143 + w, 110, 143 + w, 161, K);
    }
    // Flamel llega con su libro, se para ante la puerta y entra
    const u = tramo(t, P2 + 0.05, casaT - 0.3), en2 = tramo(t, anio - 0.1, anio + 0.5);
    const fx = Math.round(lerp(-16, 124, u) + en2 * 28), fy = Math.round(172 - en2 * 10);
    if (en2 < 1) { const r = R.actor(ESC, fx, fy, t, { dir: 1, anda: (u > 0 && u < 1) || (en2 > 0 && en2 < 1), sostiene: true, sonrisa: t > casaT, sorpresa: t > anio - 0.2 && t < anio + 0.2 }); P.libro(R, r.mano[0], r.mano[1] + 5, {}); }
    // un gato cruza el escalón
    const g = tramo(t, P2 + 0.8, P2 + 3.6); if (g > 0 && g < 1) P.gato(R, Math.round(lerp(330, 220, g)), 172, { dir: -1 });
  } else {
    // hoy: dos turistas delante de la misma casa; ella señala el año, él hace la foto en «standing»
    const u = tramo(t, sigue, sigue + 0.4);
    R.actor(EL.chica, Math.round(lerp(70, 96, u)), 172, t, { dir: 1, dedo: t > sigue + 0.25, sonrisa: t > pie, anda: u < 1 });
    const rt = R.actor(EL.turista, 206, 172, t, { dir: -1, sostiene: [200, 150], sonrisa: t > pie + 0.3 });
    const [mx, my] = rt.mano; R.rect(mx - 5, my - 3, mx + 1, my + 2, K); R.rect(mx - 4, my - 2, mx, my + 1, hex('#3a3a46')); R.disco(mx - 3, my, 1, hex('#8ab0d8'));
    const fl = tramo(t, pie - 0.02, pie + 0.25); if (fl > 0 && fl < 1) { halo(mx - 4, my - 1, 14 * (1 - fl) + 4, hex('#ffffff')); R.disco(mx - 4, my - 1, 3, hex('#ffffff')); }
    const w = tramo(t, sigue - 0.05, sigue + 0.3); if (w < 1) for (let y = 0; y < 180; y++) for (let x = (y & 1); x < 320; x += 2) if (((x * 3 + y * 5) % 7) / 7 > w) R.pset(x, y, hex('#fff8e8'));
  }
};
// la maceta: mustia hasta «eternal life», luego se endereza y florece
const maceta = (x, y, f, t) => {
  // la maceta de barro
  R.poligono([[x - 9, y - 12], [x + 9, y - 12], [x + 7, y], [x - 7, y]], K); R.poligono([[x - 8, y - 11], [x + 8, y - 11], [x + 6, y - 1], [x - 6, y - 1]], hex('#b8602a'));
  R.rect(x - 9, y - 14, x + 9, y - 11, K); R.rect(x - 8, y - 13, x + 8, y - 12, hex('#d8784a')); R.linea(x - 5, y - 9, x - 4, y - 2, hex('#e8946a')); R.linea(x + 4, y - 9, x + 3, y - 2, hex('#8a4020'));
  // el tallo: doblado y pardo antes; recto y verde después, con dos hojas y la flor abierta
  const tallo = f > 0 ? mez(hex('#7a6a3a'), hex('#3aa83a'), f) : hex('#7a6a3a');
  const tx = Math.round(lerp(x + 12, x, f)), ty = Math.round(lerp(y - 18, y - 34, f)), mx = Math.round(lerp(x + 5, x, f)), my = Math.round(lerp(y - 24, y - 24, f));
  for (const d of [0, 1]) { R.linea(x + d, y - 14, mx + d, my, tallo); R.linea(mx + d, my, tx + d, ty, tallo); }
  const hj = f > 0 ? hex('#4ac84a') : hex('#8a7a40');
  R.poligono([[x, y - 19], [x - 7, y - 23 + Math.round(f * 2) + (f > 0 ? 0 : 6)], [x - 4, y - 18]], hj); R.poligono([[x + 1, y - 22], [x + 8, y - 27 + (f > 0 ? 0 : 7)], [x + 5, y - 21]], hj);
  if (f > 0.25) { const pr = 2 + Math.round(f * 3); for (let k = 0; k < 6; k++) { const a = k * 1.0472 + t * 0.8; R.disco(Math.round(tx + Math.cos(a) * pr), Math.round(ty + Math.sin(a) * pr), 2, K); } for (let k = 0; k < 6; k++) { const a = k * 1.0472 + t * 0.8; R.disco(Math.round(tx + Math.cos(a) * pr), Math.round(ty + Math.sin(a) * pr), 1, hex('#ff5a7a')); } R.disco(tx, ty, 1, hex('#ffe050')); }
  else { R.disco(tx, ty + 1, 2, hex('#5a3a1a')); R.pset(tx + 1, ty + 3, hex('#8a6a3a')); }
};
// el pergamino colgado en la pared con el círculo de los alquimistas (círculo, cuadrado, triángulo, círculo: sin letras);
// sus trazos se encienden de oro cuando brilla la piedra
const carta = (t, on) => {
  const x0 = 146, y0 = 26, x1 = 226, y1 = 100, cx = 186, cy = 64;
  R.linea(x0 + 6, y0 - 6, cx, y0 - 12, hex('#5a4a3a')); R.linea(x1 - 6, y0 - 6, cx, y0 - 12, hex('#5a4a3a')); R.disco(cx, y0 - 12, 1, hex('#8a8a96'));
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, hex('#e8d8a8'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const h = hsh(x, y, 1); if (h > 0.9) R.pset(x, y, hex('#d8c490')); else if (h < 0.04) R.pset(x, y, hex('#c8b078')); }
  R.rect(x0 - 3, y0 - 3, x1 + 3, y0 + 1, hex('#8a5a30')); R.rect(x0 - 3, y1 - 1, x1 + 3, y1 + 3, hex('#8a5a30')); R.linea(x0 - 3, y0 - 3, x1 + 3, y0 - 3, K); R.linea(x0 - 3, y1 + 3, x1 + 3, y1 + 3, K);
  const tinta = on > 0 ? mez(hex('#8a2a1a'), hex('#ffd040'), on) : hex('#8a2a1a');
  const circ = (r) => { for (let a = 0; a < 6.283; a += 0.02) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), tinta); };
  circ(32); circ(31.4);
  R.linea(cx, cy - 31, cx + 27, cy + 15, tinta); R.linea(cx + 27, cy + 15, cx - 27, cy + 15, tinta); R.linea(cx - 27, cy + 15, cx, cy - 31, tinta);
  R.linea(cx - 13, cy - 8, cx + 13, cy - 8, tinta); R.linea(cx + 13, cy - 8, cx + 13, cy + 15, tinta); R.linea(cx - 13, cy + 15, cx - 13, cy - 8, tinta);
  circ(8);
  // el sol y la luna en las esquinas
  R.disco(x0 + 9, y0 + 9, 4, on > 0 ? hex('#ffd040') : hex('#c8902a')); R.disco(x1 - 9, y0 + 9, 4, hex('#8a8a96')); R.disco(x1 - 7, y0 + 8, 3, hex('#e8d8a8'));
  if (on > 0) { chispas(x0, y0, 6, t); chispas(x1, y0, 6, t); chispas(x0, y1, 6, t); chispas(x1, y1, 6, t); for (let a = 0; a < 6.283; a += 0.05) if (hsh(Math.round(a * 40), 1, Math.floor(t * 6)) > 0.6) R.pset(Math.round(cx + Math.cos(a) * 35), Math.round(cy + Math.sin(a) * 35), hex('#fff4c0')); }
};
const p3 = (t) => {
  const latido = t > filo - 0.1 && t < metal;
  T.exterior(R, t, { encuadre: 'pociones', camara: 'mesa', elegida: latido ? Math.floor(t * 4) % 7 : 2 });
  carta(t, tramo(t, filo - 0.1, filo + 0.4) * (1 - tramo(t, eterna + 0.6, eterna + 1.2)));
  // el alquimista (la leyenda de Flamel) detrás de la mesa: levanta la piedra y la baja hacia el lingote en «metal»
  const ax = 66, arriba = t > filo - 0.3 && t < metal - 0.3, toca = t > metal - 0.3 && t < oro + 0.6;
  const ra = R.actor(ESC, ax, 142, t, { pal: ALQ, dir: toca ? -1 : 1, sostiene: arriba ? [ax + 17, 104] : toca ? [ax - 4, 126] : [ax + 16, 122], sonrisa: t > oro, sorpresa: t > eterna && t < eterna + 0.8, habla: t < filo - 0.3 && Math.sin(t * 8) > 0 });
  T.exteriorDelante(R, t, { encuadre: 'pociones', camara: 'mesa', elegida: latido ? Math.floor(t * 4) % 7 : 2 });
  // el lingote sobre el pergamino: plomo gris hasta «gold», luego oro con chispas; suelta tres monedas
  const dorado = t > oro;
  R.poligono([[28, 153], [62, 153], [56, 141], [34, 141]], K); R.poligono([[30, 152], [60, 152], [55, 142], [35, 142]], dorado ? hex('#f0c040') : hex('#6a6a78'));
  R.linea(35, 142, 55, 142, dorado ? hex('#fff0a0') : hex('#9a9aa8')); R.linea(36, 145, 52, 145, dorado ? hex('#ffe070') : hex('#7a7a88')); R.linea(30, 152, 60, 152, dorado ? hex('#a87a18') : hex('#4a4a56'));
  const [mx, my] = ra.mano;
  // en «metal», un haz de luz roja baja de la piedra al lingote
  if (toca && t < oro + 0.3) for (let k = 0; k < 14; k++) { const v = ((k / 14) + t * 2) % 1, x = Math.round(lerp(mx, 45, v)), y = Math.round(lerp(my + 10, 144, v)); R.pset(x, y, hex('#ff8a6a')); R.pset(x + 1, y, hex('#ffd0a0')); }
  if (dorado) { const v = tramo(t, oro, oro + 1.2); if (v < 1) { halo(45, 146, 22, hex('#ffe890'), Math.floor(t * 8)); chispas(45, 144, 10 + v * 10, t); } for (let k = 0; k < 3; k++) { const m = tramo(t, oro + k * 0.12, oro + 0.7 + k * 0.12), cx = Math.round(45 + (k - 1) * 20 * m), cy = Math.round(146 - Math.sin(m * Math.PI) * 20 + m * 8); P.moneda(R, cx, cy, { s: 2 }); } }
  maceta(104, 157, tramo(t, eterna - 0.1, eterna + 0.6), t);
  if (t > eterna && t < eterna + 1.4) { halo(104, 138, 16, hex('#c8ffc8'), Math.floor(t * 7)); chispas(104, 138, 10, t, hex('#c8ffc8'), 5); }
  // la piedra en la mano: brilla en «philosopher's stone»
  if (arriba || toca) halo(mx, my, arriba ? 24 : 12, hex('#ff8a6a'), Math.floor(t * 6));
  if (arriba && t < filo + 1.2) chispas(mx, my, 18, t, hex('#ffd0a0'));
  P.piedra(R, mx, my + 9, { brillo: arriba || toca, t, s: 3 });
};
const p4 = (t) => {
  T.real(R, t, { encuadre: 'museo', camara: 'lapida' });
  // dos cuadros con marco dorado a los lados (una vista de Notre-Dame y un retrato en sombra) y sus cartelas sin letras
  for (const [x0, y0, w, h, tipo] of [[22, 46, 50, 38, 0], [238, 58, 40, 50, 1]]) {
    R.rect(x0 - 3, y0 - 3, x0 + w + 3, y0 + h + 3, K); R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + h + 2, hex('#c8902a')); R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 - 2, hex('#ffe08a')); R.rect(x0, y0, x0 + w, y0 + h, K);
    if (tipo === 0) { R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + h - 1, hex('#a8c0d0')); R.rect(x0 + 1, y0 + 24, x0 + w - 1, y0 + h - 1, hex('#5a7a5a')); R.rect(x0 + 16, y0 + 8, x0 + 22, y0 + 26, hex('#6a6a7a')); R.rect(x0 + 28, y0 + 8, x0 + 34, y0 + 26, hex('#6a6a7a')); R.rect(x0 + 16, y0 + 16, x0 + 34, y0 + 26, hex('#7a7a8a')); R.disco(x0 + 25, y0 + 19, 2, hex('#3a3a4a')); R.linea(x0 + 1, y0 + 30, x0 + w - 1, y0 + 29, hex('#6a9ab8')); }
    else { R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + h - 1, hex('#3a2a20')); R.disco(x0 + 20, y0 + 20, 8, hex('#c8a080')); R.rect(x0 + 10, y0 + 30, x0 + 30, y0 + h - 1, hex('#5a3a6a')); R.rect(x0 + 12, y0 + 10, x0 + 28, y0 + 13, hex('#2a1a12')); }
    R.rect(x0 + w / 2 - 6, y0 + h + 7, x0 + w / 2 + 6, y0 + h + 10, hex('#c8b890'));
  }
  // un visitante al fondo que cruza despacio con la audioguía
  { const v = ((t - P4) / 9) % 1, x = Math.round(lerp(-20, 340, v)); R.actor(EL.chica, x, 176, t + 2, { dir: 1, anda: true, pal: { C: hex('#4a6aa8'), c: hex('#2a4a88') } }); }
  // la placa de la peana con el año: se enciende en «tombstone»
  const on = tramo(t, tumba - 0.1, tumba + 0.3);
  R.rect(139, 143, 181, 157, K); R.rect(140, 144, 180, 156, mez(hex('#5a4220'), hex('#8a6a30'), on)); R.rect(140, 144, 180, 144, hex('#c8a050'));
  T.a_cifras(R, '1418', 160, 154);
  if (on > 0 && t < tumba + 1.6) { halo(160, 150, 26, hex('#ffe890'), Math.floor(t * 7)); chispas(160, 150, 22, t); }
  // la guía espera junto al poste y señala la lápida en «tombstone»
  R.actor(EL.contable, 62, 176, t, { dir: 1, dedo: t > tumba - 0.2 && t < museo + 0.4, habla: (t > P4 + 0.4 && t < tumba - 0.3 && Math.sin(t * 8) > 0) || (t > museo + 0.6 && Math.sin(t * 7) > 0), sonrisa: t > museo });
  // entran los visitantes: un señor con gorra y un niño que, en «museum», salta para ver
  const u = tramo(t, P4 + 0.2, P4 + 2.4), v = tramo(t, P4 + 0.6, P4 + 2.9);
  R.actor(EL.turista, Math.round(lerp(336, 214, u)), 176, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: t > tumba + 0.3 });
  const sal = t > museo && t < museo + 0.7 ? Math.round(Math.sin((t - museo) / 0.7 * Math.PI) * 10) : 0;
  const rk = R.actor(EL.chico, Math.round(lerp(352, 238, v)), 176, t, { dir: -1, anda: v > 0 && v < 1, salto: sal, sorpresa: t > museo - 0.1 && t < museo + 1.5 });
  if (t > museo && t < museo + 1.6) R.icono('!', rk.cabeza[0] - 3, rk.cabeza[1] - 24 - sal, hex('#ffe890'), K, 2);
};
const efectos = [[0.5, 'lapiz'], [piedraT, 'golpecito'], [existio, 'papel'], [P2 + 1.1, 'miau'], [casaT, 'puerta'], [anio, 'brillo'], [pie, 'flash'],
  [filo, 'brillo'], [oro, 'campana'], [eterna, 'pop'], [tumba, 'brillo'], [museo + 0.05, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? 1400 : t < sigue ? 1407 : t < P3 ? 2026 : t < P4 ? 1612 : 2026) });
'''))

# ───────────────────────────────────────────────────────── SUBASTA ────────────────────────────────────────────────────────
E['hp-subasta'] = ('La subasta', '''// HP-SUBASTA (frase 32), 2021 y hoy. Dos planos:
// 1. (0 → «$471», 7,2 s) el atril de cerca: el subastador enseña el libro de 1997 (brilla en «1997»); en «2021» empiezan
//    las pujas: suben paletas numeradas por abajo, él señala a cada lado y la pantalla grande sube de cifra hasta
//    471000 en «$471»; coge el martillo y lo levanta.
// 2. (→ fin, 7,1 s) la sala entera: el martillo cae en «record» (polvo y la sala aplaude levantando las paletas); en
//    «Today» la montaña de libros de siete colores crece detrás hasta el techo, el subastador la mira asombrado y la
//    pantalla pasa a 600000000 con un libro en «600 million».''', W(COMUN + r'''
const P2 = @subasta:7.15;
const libros = @subasta:0.82, a1997 = @subasta:2.26, a2021 = @subasta:3.90, cifraT = @subasta:5.86, record = @subasta:8.58, hoyT = @subasta:9.59, seis = @subasta:11.25;
// las pujas: [instante, cifra, x de la paleta, número de la paleta]
const PUJAS = [[a2021, '100000', 34, '12'], [a2021 + 0.55, '180000', 286, '27'], [a2021 + 1.05, '260000', 64, '31'], [a2021 + 1.5, '350000', 256, '4'], [cifraT, '471000', 22, '19']];
const paleta = (x, sube, n, t) => {
  const y = Math.round(lerp(196, 146, sube) + Math.sin(t * 6 + x) * (sube > 0.9 ? 1 : 0));
  R.rect(x - 1, y + 8, x + 1, 180, K); R.rect(x, y + 8, x, 180, hex('#8a5a30'));
  R.disco(x, y, 10, K); R.disco(x, y, 9, hex('#f4f0e4')); R.disco(x - 2, y - 2, 5, hex('#ffffff'));
  R.numero(n, x, y + 4, { centro: true });
};
const mazo = (mx, my, abajo) => { P.martillo(R, mx + 4, my + 4, { golpe: !abajo, s: 2 }); };
const p1 = (t) => {
  let k = -1; for (let i = 0; i < PUJAS.length; i++) if (t >= PUJAS[i][0]) k = i;
  const cifra = k < 0 ? '50000' : PUJAS[k][1], coge = t > cifraT + 0.4;
  T.real(R, t, { encuadre: 'subasta', camara: 'atril', cifra, martillo: !coge });
  // la cifra nueva brilla; la final, más
  const marco = (g) => { for (let d = 3; d <= 5; d++) { const c = d === 4 ? hex('#ffe890') : hex('#c8902a'); if ((Math.floor(t * 8) + d) % 2 || g > 1) { R.linea(166 - d, 30 - d, 266 + d, 30 - d, c); R.linea(166 - d, 92 + d, 266 + d, 92 + d, c); R.linea(166 - d, 30 - d, 166 - d, 92 + d, c); R.linea(266 + d, 30 - d, 266 + d, 92 + d, c); } } };
  if (k >= 0 && t < PUJAS[k][0] + 0.4 && t < cifraT) marco(1);
  if (t > cifraT) { marco(2); if (t < cifraT + 1.4) { chispas(160, 28, 10, t); chispas(272, 28, 10, t); chispas(160, 94, 10, t); chispas(272, 94, 10, t); } }
  // el subastador: enseña el libro, luego señala cada puja y por fin levanta el martillo
  const sx = 100, ensena = t < a2021 - 0.1, lado = k >= 0 ? (PUJAS[k][2] < 160 ? -1 : 1) : 1;
  const obj = ensena ? [sx + 18, t > a1997 - 0.2 && t < a1997 + 0.6 ? 106 : 112] : coge ? [sx + 19, 100] : null;
  const rs = R.actor(EL.subastador, sx, 142, t, { dir: obj ? 1 : lado, sostiene: obj ?? false, dedo: !obj && k >= 0, habla: !obj && Math.sin(t * 9) > 0, sonrisa: t > cifraT, sorpresa: t > cifraT - 0.1 && t < cifraT + 0.4 });
  T.realDelante(R, t, { encuadre: 'subasta', camara: 'atril', martillo: !coge });
  if (ensena) { if (t > a1997 - 0.2 && t < a1997 + 0.8) halo(rs.mano[0] + 7, rs.mano[1] - 6, 16, hex('#ffe890'), Math.floor(t * 7)); P.libro(R, rs.mano[0] + 7, rs.mano[1] + 6, { s: 2 }); }
  else P.libro(R, 136, 150, {});
  if (coge) mazo(rs.mano[0], rs.mano[1], false);
  // las paletas de los pujadores, por delante de todo: suben con cada puja
  PUJAS.forEach(([a, , x, n]) => { const s = tramo(t, a - 0.15, a + 0.1) * (1 - tramo(t, a + 1.1, a + 1.4)); if (s > 0) paleta(x, s, n, t); });
};
const p2 = (t) => {
  const crece = tramo(t, hoyT + 0.1, seis + 0.9), golpe = tramo(t, record, record + 0.5);
  const g = T.real(R, t, { encuadre: 'subasta', montana: crece, cifra: '471000', martillo: false });
  // a partir de «600 million», la pantalla cuenta libros, no dinero
  if (t > seis) {
    const [x0, y0, x1, y1] = g.pantalla;
    R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, (y & 1) ? hex('#1a2a3a') : hex('#141822'));
    R.recorte(null);
    for (let i = 0; i < 4; i++) { const bx = x0 + 18 + i * 11; R.rect(bx, y0 + 8, bx + 8, y0 + 20, K); R.rect(bx + 1, y0 + 9, bx + 7, y0 + 19, [hex('#c8283a'), hex('#2a6ad8'), hex('#3a9a3a'), hex('#e8b830')][i]); R.rect(bx + 1, y0 + 9, bx + 1, y0 + 19, hex('#ffffff')); }
    T.a_cifras(R, '600000000', Math.round((x0 + x1) / 2), y0 + 36);
    if (t < seis + 1.2) chispas(Math.round((x0 + x1) / 2), y0 + 24, 30, t);
  }
  // el subastador en la tarima: el martillo arriba, cae en «record»; en «Today» se vuelve a mirar la montaña
  const sx = 22, abajo = t > record - 0.05 && t < record + 0.5;
  const rs = R.actor(EL.subastador, sx, g.sueloTarima ?? 150, t, { dir: 1, sostiene: abajo ? [40, 128] : t < record ? [38, 116] : [36, 124], sonrisa: t > record, sorpresa: t > hoyT + 0.6 && t < seis + 1.2 });
  T.realDelante(R, t, { encuadre: 'subasta', golpe, martillo: false });
  mazo(rs.mano[0], rs.mano[1], abajo);
  // la sala aplaude: «!» y paletas arriba tras el golpe
  if (t > record + 0.1 && t < record + 1.6) for (const [x, y] of [[124, 140], [196, 136], [268, 142]]) R.icono('!', x, y - Math.round(Math.abs(Math.sin((t - record) * 8)) * 3), hex('#ffe890'), K, 2);
};
const efectos = [[libros, 'papel'], [a2021, 'golpecito'], [a2021 + 1.05, 'golpecito'], [cifraT, 'brillo'], [record, 'toc'], [record + 0.2, 'palmada'], [hoyT + 0.3, 'avalancha'], [seis, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: (t) => (t < hoyT ? 2021 : 2026) });
'''))

# ───────────────────────────────────────────────────────── PREPARADO ──────────────────────────────────────────────────────
E['hp-preparado'] = ('Preparados', '''// HP-PREPARADO (frase 33), hoy. Dos planos:
// 1. (0 → «because», 7,2 s) el sofá de cara: Atom baja de su sitio y cae en el sofá junto a la snitch en «So», y la manta
//    se extiende sobre los dos; en «December 25th» la tele pone la hoja del calendario con el 25; en «rewatch the first
//    movie», la película (el castillo con el triángulo de reproducir) y la snitch caza una palomita al vuelo; en «or
//    better yet» la tele se pausa y, en «read the first book», la snitch vuela al libro de la mesa, que brilla con su
//    piedra roja.
// 2. (→ fin, 5,9 s) el plató: en «series» caen ocho claquetas numeradas del 1 al 8 en fila, una tras otra («8» en
//    «8»); en «tell everything» chascan en ola; en «couldn't fit» la lata de película de la mesa revienta y salen la moto,
//    el calcetín, la rata y la flauta, que caen sobre las claquetas; el director lo señala asombrado y la guionista
//    aplaude.''', W(COMUN + LUPA + r'''
const P2 = @preparado:7.15;
const so = @preparado:0.90, dic = @preparado:2.36, peli = @preparado:3.74, mejor = @preparado:5.30, leer = @preparado:6.24, libroT = @preparado:6.68;
const serie = @preparado:8.08, ocho = @preparado:8.74, todo = @preparado:9.86, cabe = @preparado:11.06, fit = @preparado:11.50;
// la tele: el calendario, la película y la pausa
const tele = (R, t, [x0, y0, x1, y1]) => {
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  if (t < dic) { for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, (y & 1) ? hex('#1a2a5a') : hex('#24346a')); for (let i = 0; i < 4; i++) { const bx = x0 + 8 + i * 19; R.poligono([[bx, y0 + 14], [bx + 15, y0 + 14], [bx + 15, y0 + 34], [bx, y0 + 34]], [hex('#c8283a'), hex('#3a6ad8'), hex('#3a9a3a'), hex('#e8b830')][i]); } R.linea(x0 + 8 + 19 * Math.floor(t % 4), y0 + 36, x0 + 23 + 19 * Math.floor(t % 4), y0 + 36, hex('#ffffff')); return; }
  if (t < peli) {   // la hoja del calendario: banda roja, anillas y el 25
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, hex('#2a4a3a'));
    R.poligono([[cx - 22, y0 + 6], [cx + 22, y0 + 6], [cx + 22, y1 - 4], [cx - 22, y1 - 4]], hex('#f4f0e4'));
    R.poligono([[cx - 22, y0 + 6], [cx + 22, y0 + 6], [cx + 22, y0 + 14], [cx - 22, y0 + 14]], hex('#c8283a'));
    for (const ax of [-12, 0, 12]) R.disco(cx + ax, y0 + 6, 1, hex('#8a8a96'));
    R.numero('25', cx, y1 - 9, { centro: true, tam: 16 });
    for (let k = 0; k < 6; k++) { const sx = x0 + ((k * 37 + Math.floor(t * 20)) % (x1 - x0)), sy = y0 + ((k * 23 + Math.floor(t * 30)) % (y1 - y0)); R.pset(sx, sy, hex('#ffffff')); }
    return;
  }
  // la película: el castillo de noche, la luna y la tira con sus perforaciones que corre
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, y < cy ? hex('#1a2050') : hex('#22305a'));
  R.disco(x1 - 14, y0 + 12, 5, hex('#fff4c8'));
  R.poligono([[cx - 26, y1], [cx - 24, cy + 2], [cx - 18, cy + 2], [cx - 18, cy - 8], [cx - 14, cy - 14], [cx - 10, cy - 8], [cx - 10, cy], [cx - 2, cy], [cx - 2, cy - 18], [cx + 3, cy - 26], [cx + 8, cy - 18], [cx + 8, cy], [cx + 16, cy], [cx + 16, cy - 10], [cx + 20, cy - 16], [cx + 24, cy - 10], [cx + 24, y1]], hex('#0a0c1e'));
  for (const [i, j] of [[-14, -6], [3, -14], [20, -6], [-6, 4], [12, 6]]) if (Math.sin(t * 2 + i) > -0.6) R.pset(cx + i, cy + j, hex('#ffd84a'));
  const off = Math.floor(t * 12) % 8;
  for (const yy of [y0 + 1, y1 - 2]) { R.linea(x0, yy, x1, yy, K); R.linea(x0, yy + 1, x1, yy + 1, K); for (let x = x0 + off; x < x1; x += 8) { R.pset(x, yy, hex('#e8e0c8')); R.pset(x + 1, yy, hex('#e8e0c8')); } }
  if (t < mejor) R.poligono([[cx - 5, cy - 7], [cx + 7, cy], [cx - 5, cy + 7]], mez(hex('#ffffff'), hex('#1a2050'), tramo(t, peli + 0.8, peli + 1.2)));
  else { for (let y = y0; y <= y1; y += 2) R.linea(x0, y, x1, y, hex('#141830')); R.poligono([[cx - 7, cy - 7], [cx - 3, cy - 7], [cx - 3, cy + 7], [cx - 7, cy + 7]], hex('#ffffff')); R.poligono([[cx + 3, cy - 7], [cx + 7, cy - 7], [cx + 7, cy + 7], [cx + 3, cy + 7]], hex('#ffffff')); }
};
// Atom: baja al sofá en «So»; la snitch vuela al libro en «read»; la manta los tapa a los dos
const ATOM_SOFA = [112, 104];
const sAt = (t) => { const v = tramo(t, leer - 0.2, leer + 0.6); return v > 0 ? [lerp(136, 113, v), lerp(108, 140, v) - Math.sin(v * Math.PI) * 26] : [136, 108]; };
const comp0 = R.companero;
R.companero = (t, e) => {
  if (t > P2 + 0.2) return comp0(t, e);
  const baja = tramo(t, 0.15, so), ue = baja * baja * (3 - 2 * baja), bote = t > so && t < so + 0.5 ? Math.round(Math.sin((t - so) / 0.5 * Math.PI) * 5) : 0;
  const x = Math.round(lerp(297, ATOM_SOFA[0], ue)), y = Math.round(lerp(24, ATOM_SOFA[1] - 3, ue) - bote - Math.sin(ue * Math.PI) * 18) + Math.round(Math.sin(t * 2.6) * 1);
  const r = lerp(10, 13, ue);
  if (ue > 0.2) R.disco(x, y, Math.round(r * 0.95), hex('#14204a'));
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.25 && (ue < 0.2 ? ((i + j) & 1) : g > 0.45 || ((i + j) & 1))) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: t > leer ? 0.9 : e });
  // la manta de lana crema con cuadros rojos: se despliega sobre los dos al caer Atom (dos bultos: Atom y la snitch)
  const m = tramo(t, so, so + 0.6);
  if (m > 0) {
    const x0 = 90, x1 = Math.round(lerp(98, 154, m)), top = (xx) => Math.round(110 - Math.max(0, 3 - Math.abs(xx - 110) / 5) - (t < leer ? Math.max(0, 2 - Math.abs(xx - 137) / 4) : 0) + Math.sin(xx * 0.3) * 0.6);
    for (let xx = x0; xx <= x1; xx++) {
      const y0 = top(xx), y1 = 127 + ((xx * 7) % 3 === 0 ? 1 : 0);
      R.pset(xx, y0 - 1, K);
      for (let yy = y0; yy <= y1; yy++) {
        const rx = (xx - x0) % 9, ry = (yy - 110) % 9;
        let c = hex('#ecdcb4'); if (rx < 2 || ry < 2) c = hex('#b8283a'); if (rx < 2 && ry < 2) c = hex('#7a1a28'); if (rx === 5 || ry === 5) c = mez(c, hex('#3a7a4a'), 0.6);
        if (((xx - x0) % 14 === 7) && yy > y0 + 2) c = mez(c, K, 0.25);
        R.pset(xx, yy, c);
      }
      R.pset(xx, y1 + 1, K); if (xx % 2 === 0) { R.pset(xx, y1 + 2, hex('#ecdcb4')); R.pset(xx, y1 + 3, hex('#c8b890')); }
    }
    for (let yy = top(x0); yy <= 128; yy++) { R.pset(x0 - 1, yy, K); R.pset(x1 + 1, yy, K); }
  }
};
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'salon', camara: 'sofa', pantalla: tele });
  // la snitch, bajo la manta junto a Atom: caza una palomita en «movie» y vuela al libro en «read»
  const [sx, sy] = sAt(t);
  const pal = tramo(t, peli + 0.3, peli + 1.0);
  T.hoyDelante(R, t, { encuadre: 'salon', camara: 'sofa' });
  if (pal > 0 && pal < 1) { const px = Math.round(lerp(80, 138, pal)), py = Math.round(lerp(150, 104, pal) - Math.sin(pal * Math.PI) * 24); R.disco(px, py, 2, K); R.disco(px, py, 1, hex('#fff4d8')); R.pset(px, py - 1, hex('#ffffff')); }
  // el libro brilla en «read the first book»
  if (t > leer - 0.1) { halo(113, 148, 22 + Math.sin(t * 5) * 2, hex('#ffe890'), Math.floor(t * 6)); if (t < libroT + 1) chispas(113, 146, 16, t); }
  T.snitch(R, sx, sy + (t > leer + 0.6 ? Math.sin(t * 7) * 1.5 : 0), t, { cara: t > peli + 0.9 && t < mejor ? 'feliz' : t > leer + 0.5 ? 'feliz' : 'normal' });
};
// las ocho claquetas, en fila sobre el suelo del plató
const claqueta = (x, y, n, abre, t) => {
  R.rect(x - 9, y - 11, x + 9, y, K); R.rect(x - 8, y - 10, x + 8, y - 1, hex('#2a2a32')); R.rect(x - 8, y - 10, x + 8, y - 10, hex('#4a4a56'));
  R.numero(String(n), x, y - 2, { centro: true });
  // el palo de arriba, con rayas, que se abre y chasca
  const a = abre * 0.5, L = 18;
  for (let i = 0; i <= L; i++) { const px = Math.round(x - 9 + Math.cos(-a) * i), py = Math.round(y - 13 + Math.sin(-a) * i); R.pset(px, py, K); R.pset(px, py - 1, ((i >> 2) & 1) ? hex('#f4f0e8') : hex('#2a2a32')); R.pset(px, py - 2, K); }
};
const LLENA = [(x, y) => motoMini(x - 6, y - 7), (x, y) => P.calcetin(R, x, y, {}), (x, y) => P.rata(R, x, y, { ojo: true }), (x, y) => P.flauta(R, x, y, {})];
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'plato', claqueta: t > todo && t < todo + 0.3 ? 1 : 0 });
  // la lata de película sobre la mesa del decorado: tiembla y revienta en «fit»
  const rev = t > fit, tiem = t > cabe - 0.4 && !rev ? Math.round(Math.sin(t * 40)) : 0;
  const lx = 137 + tiem;
  R.disco(lx, 104, 9, K); R.disco(lx, 104, 8, hex('#8a8a96')); R.disco(lx, 104, 5, hex('#6a6a78')); R.disco(lx, 104, 2, hex('#c8c8d8'));
  if (rev) { const tp = tramo(t, fit, fit + 0.5); R.disco(Math.round(lx + 14 * tp), Math.round(104 - 20 * tp), 7, K); R.disco(Math.round(lx + 14 * tp), Math.round(104 - 20 * tp), 6, hex('#a8a8b8')); }
  else R.linea(lx - 8, 96 - (tiem ? 1 : 0), lx + 8, 96, hex('#c8c8d8'));
  // la guionista aplaude al final; el director entra, señala las claquetas y se asombra en «fit»
  const u = tramo(t, P2 + 0.1, serie + 0.2), dx = Math.round(lerp(330, 236, u));
  R.actor(EL.director, dx, 154, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > serie && t < cabe - 0.2, sorpresa: t > fit - 0.1 && t < fit + 0.8, sonrisa: t > fit + 0.8, habla: t > todo && t < cabe - 0.2 && Math.sin(t * 8) > 0 });
  R.actor(EL.guionista, 46, 154, t, { dir: 1, brazos: t > fit + 0.6 && Math.sin(t * 12) > -0.2, sonrisa: t > ocho, sorpresa: t > fit && t < fit + 0.6 });
  // las claquetas caen una tras otra en «series» … «8» y chascan en ola en «tell everything»
  for (let i = 0; i < 8; i++) {
    const a = serie + i * ((ocho - serie) / 7), c = tramo(t, a - 0.25, a);
    if (c <= 0) continue;
    const x = 70 + i * 21, y = Math.round(lerp(-20, 150, c * c)) - (c >= 1 ? Math.round(Math.max(0, Math.sin((t - a) * 14)) * 3 * Math.max(0, 1 - (t - a) * 3)) : 0);
    const w = todo + i * 0.08, abre = t < a + 0.3 ? 1 : t > w - 0.2 && t < w ? 1 : 0;
    claqueta(x, y, i + 1, abre, t);
    if (i === 7 && t > ocho && t < ocho + 1.2) { halo(x, y - 6, 16, hex('#ffe890'), Math.floor(t * 8)); chispas(x, y - 6, 14, t); }
  }
  // lo que no cupo en la película sale de la lata y cae sobre las claquetas 2, 4, 6 y 8
  if (rev) LLENA.forEach((f, k) => { const v = tramo(t, fit + k * 0.1, fit + 0.8 + k * 0.1), tx = 91 + k * 42, x = Math.round(lerp(137, tx, v)), y = Math.round(lerp(100, 136, v) - Math.sin(v * Math.PI) * 34); f(x, y); });
  T.hoyDelante(R, t, { encuadre: 'plato' });
};
const efectos = [[0.2, 'whoosh'], [so, 'pop'], [dic, 'bip'], [peli, 'interruptor'], [peli + 0.95, 'masca'], [leer, 'brillo'],
  [ocho, 'pop'], [todo, 'palmada'], [fit, 'boing'], [fit + 0.6, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
'''))

# ───────────────────────────────────────────────────────── CIERRE ─────────────────────────────────────────────────────────
E['hp-cierre'] = ('Cierre', '''// HP-CIERRE (frases 34–35), hoy. Cuatro planos:
// 1. (0 → «In this world», 4,5 s) el claro del bosque: Harry entra con una lupa enorme; en «details» se para y el
//    cristal agranda una moto en miniatura escondida junto a las setas; se asombra («!») y el faro se enciende en
//    «episode»; la snitch se asoma tras el tronco.
// 2. (→ «decoration», 4,2 s) la tienda de túnicas: Hermione registra con la lupa la mesita de la costurera, que toma
//    medidas a un alumno subido al taburete; en «accident» el cristal encuentra un calcetín de lana entre los carretes.
// 3. (→ «Tell», 5,9 s) el Gran Comedor vacío de noche: la snitch arrastra la lupa por la mesa más cercana; en «clue»
//    descubre a la rata dormida, que abre un ojo; en «which house» se encienden uno a uno los cuatro estandartes y sale
//    un «?».
// 4. (→ fin, 6,2 s) las gradas del campo: cuatro hinchas levantan sus banderas de los cuatro colores en «Tell me in the
//    comments»; en «Meanwhile» Atom baja de su sitio; en «catch» se lanza a por la snitch, que se escapa por arriba en
//    «again»: Atom choca, da vueltas con estrellas, la grada se ríe y él vuelve a su sitio (gag final).''', W(COMUN + LUPA + r'''
const P2 = @detalles:4.45, P3 = @detalles:8.60, P4 = @casa:14.50;
const detalles = @detalles:2.56, episodio = @detalles:3.44, accidente = @detalles:7.04, pista = @detalles:10.90, ultimo = @detalles:11.46;
const casaT = @casa:13.20, dime = @casa:14.56, mientras = @casa:15.95, atrapa = @casa:17.23, otra = @casa:18.11;
const p1 = (t) => {
  T.exterior(R, t, { encuadre: 'bosque', camara: 'claro' });
  // la moto en miniatura, escondida entre la hierba junto a las setas
  motoMini(194, 157, t > episodio && Math.sin(t * 6) > -0.3);
  // la snitch se asoma por detrás del tronco caído
  const as = tramo(t, detalles + 0.3, detalles + 0.8) * (1 - tramo(t, P2 - 0.4, P2));
  T.snitch(R, 70, Math.round(lerp(150, 136, as)), t, { cara: as > 0.5 ? 'susto' : 'normal' });
  // Harry entra con la lupa y se para en «details» con el cristal sobre la moto
  const u = tramo(t, 0.15, detalles - 0.1), ue = u * (2 - u), hx = Math.round(lerp(-46, 160, ue));
  const rh = R.actor(EL.harry, hx, 166, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [hx + 18, 148], sorpresa: t > detalles && t < episodio + 0.4, sonrisa: t > episodio + 0.4 });
  T.exteriorDelante(R, t, { encuadre: 'bosque', camara: 'claro' });
  const bus = u < 1 ? Math.sin(t * 5) * 3 : 0;
  lente(rh.mano[0] + 22, rh.mano[1] + 10 + bus, 18, lerp(2.2, 3.2, tramo(t, detalles, detalles + 0.4)), rh.mano);
  if (t > detalles + 0.15 && t < episodio + 0.8) R.icono('!', rh.cabeza[0] - 3, rh.cabeza[1] - 26, hex('#ffe890'), K, 2);
};
const p2 = (t) => {
  T.diagon(R, t, { encuadre: 'tunicas' });
  // un alumno en el taburete; la costurera le toma medidas con la cinta y se vuelve en «accident»
  R.actor(EL.alumno, 183, 146, t, { dir: -1, sonrisa: true, sorpresa: t > accidente && t < accidente + 0.8 });
  const mide = Math.sin(t * 3) > 0;
  const rc = R.actor(EL.costurera, 204, 166, t, { dir: t > accidente ? -1 : -1, sostiene: mide ? [196, 140] : [198, 150], sorpresa: t > accidente + 0.1 && t < accidente + 0.9 });
  R.linea(rc.mano[0], rc.mano[1], 190, mide ? 136 : 148, hex('#f0d040'));
  // en la mesita, carretes y, escondido entre ellos, el calcetín de lana
  for (const [x, c] of [[98, '#3a6ad8'], [104, '#c8283a'], [118, '#3a9a3a']]) { R.rect(x - 2, 118, x + 2, 124, K); R.rect(x - 1, 119, x + 1, 123, hex(c)); R.linea(x - 2, 118, x + 2, 118, hex('#a87a4a')); R.linea(x - 2, 124, x + 2, 124, hex('#a87a4a')); }
  R.rect(104, 124, 120, 126, K); R.rect(105, 125, 119, 125, hex('#2a6a4a')); P.calcetin(R, 111, 125, {});
  // Hermione entra por la izquierda registrándolo todo con la lupa
  const u = tramo(t, P2 + 0.05, accidente - 0.15), hx = Math.round(lerp(-46, 66, u));
  const rh = R.actor(EL.hermione, hx, 166, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [hx + 18, 142], sorpresa: t > accidente && t < accidente + 0.6, sonrisa: t > accidente + 0.6 });
  T.diagonDelante(R, t, { encuadre: 'tunicas' });
  const bus = u < 1 ? Math.sin(t * 6) * 4 : 0;
  lente(rh.mano[0] + 22 + bus, rh.mano[1] - 22, 17, lerp(2.2, 3.4, tramo(t, accidente, accidente + 0.4)), rh.mano);
  if (t > accidente + 0.1 && t < accidente + 1.3) chispas(rh.mano[0] + 22, rh.mano[1] - 22, 22, t);
};
// la rata dormida en la mesa de delante; la snitch arrastra la lupa
const p3 = (t) => {
  T.hogwarts(R, t, { encuadre: 'comedor', vacio: true });
  // los cuatro estandartes se encienden en «which house» (rojo, amarillo, verde, azul)
  const BAN = [[72, '#ff6a5a'], [118, '#ffe060'], [186, '#6aff8a'], [232, '#6aa8ff']];
  BAN.forEach(([x, c], i) => { const on = tramo(t, casaT + i * 0.15, casaT + i * 0.15 + 0.2); if (on > 0) { halo(x, 66, 18 + Math.sin(t * 6 + i) * 2, hex(c), Math.floor(t * 8) + i); if (t < casaT + i * 0.15 + 0.8) chispas(x, 66, 14, t, hex(c), 4); } });
  if (t > casaT + 0.7) { const q = tramo(t, casaT + 0.7, casaT + 1.0); R.icono('?', 151, Math.round(lerp(40, 30, q)), hex('#ffe890'), K, 3); }
  // la rata sobre el tablero de la mesa de la derecha
  const ojo = t > pista + 0.35 && t < ultimo + 1.5;
  P.rata(R, 236, 160, { ojo });
  // la snitch arrastra la lupa a lo largo de la mesa y se para sobre la rata en «clue»
  const u = tramo(t, P3 + 0.1, pista - 0.1), ue = u * (2 - u), lx = Math.round(lerp(40, 236, ue)), ly = Math.round(lerp(150, 155, ue) + (u < 1 ? Math.sin(t * 7) * 3 : 0));
  const sx = lx + 22, sy = ly - 30 + Math.round(Math.sin(t * 9) * 2);
  lente(lx, ly, 18, lerp(2.2, 3.0, tramo(t, pista, pista + 0.4)), [sx - 2, sy + 2]);
  R.linea(sx - 2, sy + 2, sx + 2, sy - 2, K);
  T.snitch(R, sx + 4, sy, t, { cara: ojo ? 'susto' : t > casaT ? 'feliz' : 'normal' });
  if (ojo && t < pista + 1.5) R.icono('!', sx - 2, sy - 22, hex('#ffe890'), K, 2);
};
// la snitch y Atom en las gradas: Atom se lanza en «catch» y la snitch se escapa en «again»
const snAt = (t) => {
  if (t < atrapa) return [150 + Math.sin(t * 2.2) * 14, 118 + Math.sin(t * 4.4) * 4];
  const v = tramo(t, atrapa + 0.4, otra + 0.1), w = tramo(t, otra + 0.8, otra + 2.2);
  return [lerp(150, 168, v) + Math.sin(t * 9) * 3 + w * 190, lerp(118, 64, v) - w * 20];
};
const comp0 = R.companero;
R.companero = (t, e) => {
  if (t < mientras) return comp0(t, e);
  const baja = tramo(t, mientras, mientras + 0.7), lan = tramo(t, atrapa - 0.1, otra - 0.05), vuelve = tramo(t, otra + 1.8, otra + 2.5);
  const b = baja * baja * (3 - 2 * baja);
  let x = lerp(297, 214, b), y = lerp(24, 118, b);
  if (lan > 0) { x = lerp(214, 132, lan * lan); y = lerp(118, 112, lan) - Math.sin(lan * Math.PI) * 10; }
  const mareo = t > otra && t < otra + 1.8;
  if (mareo) { x = 132 + Math.sin((t - otra) * 30) * Math.max(0, 1 - (t - otra) * 2) * 3; y = 114; }
  if (vuelve > 0) { const vv = vuelve * vuelve * (3 - 2 * vuelve); x = lerp(132, 297, vv); y = lerp(114, 24, vv) - Math.sin(vv * Math.PI) * 10; }
  x = Math.round(x); y = Math.round(y + Math.sin(t * 2.6) * 1.2);
  const r = 11;
  R.disco(x, y, r, hex('#14204a'));
  for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.25 && (g > 0.45 || ((i + j) & 1))) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: lan > 0 && lan < 1 ? 1 : e });
  if (mareo) for (let k = 0; k < 4; k++) { const a = k * 1.5708 + t * 7, ex = Math.round(x + Math.cos(a) * 15), ey = Math.round(y - 14 + Math.sin(a) * 4); R.pset(ex, ey, hex('#ffe890')); R.pset(ex - 1, ey, hex('#ffe890')); R.pset(ex + 1, ey, hex('#ffe890')); R.pset(ex, ey - 1, hex('#ffe890')); R.pset(ex, ey + 1, hex('#ffe890')); }
};
const p4 = (t) => {
  T.exterior(R, t, { encuadre: 'quidditch', camara: 'gradas' });
  // cuatro hinchas en la barandilla levantan sus banderas en «Tell me in the comments» y se ríen cuando Atom falla
  const FANS = [[EL.alumno, 52, '#c8283a', '#e8b830'], [EL.alumna, 100, '#1e6a3a', '#c8c8d0'], [EL.neville, 148, '#e8b830', '#2a2a32'], [EL.hermione, 196, '#2a4a9a', '#c8902a']];
  FANS.forEach(([d, x, c1, c2], i) => {
    const sube = tramo(t, dime - 0.1 + i * 0.12, dime + 0.15 + i * 0.12), rie = t > otra + 0.2 && t < otra + 1.8;
    const r = R.actor(d, x, 168, t, { dir: i < 2 ? 1 : -1, sostiene: sube > 0 ? [x + (i < 2 ? 17 : -2), Math.round(lerp(150, 140, sube))] : false, brazos: false, sonrisa: sube > 0 || rie, sorpresa: t > atrapa && t < otra + 0.2, salto: rie ? Math.round(Math.abs(Math.sin((t - otra) * 9)) * 3) : 0 });
    if (sube > 0) {
      const [mx, my] = r.mano, top = my - 22, dd = i < 2 ? 1 : -1;
      R.linea(mx, my + 2, mx, top, K); R.linea(mx + dd, my + 2, mx + dd, top, hex('#a87a4a'));
      for (let k = 0; k < 14; k++) { const ww = Math.round(Math.sin(t * 8 + k * 0.6 + i) * 1.5), xx = mx + dd * (2 + k); for (let j = 0; j < 9; j++) R.pset(xx, top + j + ww, j === 0 || j === 8 || k === 13 ? K : (j === 4 ? hex(c2) : hex(c1))); }
    }
  });
  if (t > dime + 0.6 && t < mientras) R.icono('?', 236, 120 - Math.round(Math.abs(Math.sin(t * 5)) * 3), hex('#ffe890'), K, 2);
  T.exteriorDelante(R, t, { encuadre: 'quidditch', camara: 'gradas' });
  // la snitch revolotea por delante de la grada (se pinta antes que Atom)
  const [sx, sy] = snAt(t);
  if (sx < 340) T.snitch(R, sx, sy, t, { cara: t > otra ? 'feliz' : t > atrapa ? 'susto' : 'normal' });
};
const efectos = [[0.3, 'whoosh'], [detalles, 'brillo'], [episodio, 'interruptor'], [accidente, 'brillo'],
  [pista, 'brillo'], [pista + 0.35, 'pop'], [casaT, 'campana'], [dime, 'publico'], [mientras, 'whoosh'], [atrapa, 'whoosh'], [otra, 'boing'], [otra + 0.4, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
'''))
