E = {}

# Piezas comunes de las tres escenas (se copian en el cuerpo de cada una): tramado, búfer fijo, flecha de impulso, nubes,
# la funda acolchada sobre la cabeza de un chibi, el coche pequeño y un rectángulo que respeta R.recorte.
COMUN = r'''
const K = T.C.k, BL = hex('#ffffff');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const um = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const FIJOS = new Map();
const fijo = (k, dib) => { let b = FIJOS.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); dib(); R.usar(p); FIJOS.set(k, b); } R.copiar(b); };
// degradado tramado (sin franjas lisas) de y0 a y1 entre los colores de la lista
const degr = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(v)), f = v - i; for (let x = x0; x <= x1; x++) R.pset(x, y, f > um(x, y) ? cols[i + 1] : cols[i]); } };
// rectángulo que respeta R.recorte (R.rect no)
const rr = (x0, y0, x1, y1, c) => { if (x1 < x0 || y1 < y0) return; R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], c); };
const caja = (x0, y0, x1, y1, c, cl, cs) => { rr(x0, y0, x1, y1, K); rr(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); if (cl) rr(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cl); if (cs) rr(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cs); };
// la flecha del impulso (la misma para el liniero y para el coche): cuerpo grueso con luz y sombra y punta
const FL = [hex('#e8783a'), hex('#f8b878'), hex('#a8501e')];
const flecha = (x0, y, len, c = FL) => { if (len < 3) return; x0 = Math.round(x0); y = Math.round(y); const x1 = Math.round(x0 + len), hb = Math.max(x0 + 1, x1 - 8);
  R.poligono([[x0, y - 3], [hb, y - 3], [hb, y - 7], [x1 + 2, y + 0.5], [hb, y + 8], [hb, y + 4], [x0, y + 4]], K);
  R.poligono([[x0 + 1, y - 2], [hb + 1, y - 2], [hb + 1, y - 5], [x1, y + 0.5], [hb + 1, y + 6], [hb + 1, y + 3], [x0 + 1, y + 3]], c[0]);
  R.linea(x0 + 1, y - 2, hb, y - 2, c[1]); R.linea(hb + 1, y - 5, x1 - 1, y, c[1]); R.linea(x0 + 1, y + 2, hb, y + 2, c[2]); R.linea(hb + 1, y + 5, x1 - 1, y + 1, c[2]); };
// una nube de tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, c0, c1, c2) => { const r = w / 5, B = [[-w * 0.32, r * 0.3, r * 1.1], [-w * 0.1, -r * 0.5, r * 1.5], [w * 0.16, -r * 0.2, r * 1.3], [w * 0.36, r * 0.35, r]];
  for (const [dx, dy, q] of B) R.disco(cx + dx, cy + dy + 1.5, q, c0); for (const [dx, dy, q] of B) R.disco(cx + dx, cy + dy, q * 0.88, c1);
  R.disco(cx - w * 0.12, cy - r * 1.2, r * 0.8, c2); R.disco(cx + w * 0.14, cy - r * 0.8, r * 0.6, c2); };
// la funda acolchada encima del casco de un chibi (pos: la cabeza que devuelve R.actor)
const FU = [hex('#6a7e96'), hex('#4a5a70'), hex('#92a6bc')];
const fundaCab = (pos) => { if (!pos) return; const cx = pos[0], yH = pos[1];
  for (let j = 0; j <= 6; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((6 - j) / 6.6) ** 2)) * 8.6), y = yH - 2 + j;
    for (let i = -w; i <= w; i++) R.pset(cx + i, y, i === -w || i === w || j === 0 ? K : (i + 30) % 3 === 0 ? FU[1] : j < 3 && i < 3 ? FU[2] : FU[0]); } };
// el coche pequeño, de lado, mirando a la derecha: x la trasera, yS el suelo, s la escala (47 × 23 px con s = 1)
const CO = { c: hex('#d8483a'), cs: hex('#9e2c24'), cl: hex('#f4866c'), vid: hex('#a8d8f0'), vidS: hex('#3e6a92'), goma: hex('#24202c'), llanta: hex('#c8ccd4'), cromo: hex('#eef0f4'), faro: hex('#fff2b0'), piloto: hex('#ff4a3a') };
const coche = (x, yS, t, s = 1, o = {}) => {
  const X = (u) => Math.round(x + u * s), Y = (v) => Math.round(yS - v * s), P = (pts) => pts.map(([u, v]) => [x + u * s, yS - v * s]), giro = o.giro ?? t * 2;
  for (let i = -1; i <= 48; i++) { const yy = Math.round(yS + 1); R.pset(X(i), yy, hex('#141218')); if (i > 2 && i < 44) R.pset(X(i), yy + 1, hex('#141218')); }
  R.poligono(P([[0, 4], [0.5, 11], [6, 14.5], [40, 14.5], [46.5, 11], [47.5, 5], [46.5, 2.5], [1, 2.5]]), K);
  R.poligono(P([[1, 4.5], [1.5, 10.5], [6.5, 13.5], [40, 13.5], [45.5, 10.5], [46.5, 5.5], [45.5, 3.5], [2, 3.5]]), CO.c);
  R.poligono(P([[8, 13.5], [14, 23.5], [31.5, 23.5], [38.5, 13.5]]), K);
  R.poligono(P([[9.5, 13.5], [15, 22.5], [30.5, 22.5], [36.5, 13.5]]), CO.c);
  R.linea(X(15), Y(22), X(30.5), Y(22), CO.cl);
  R.poligono(P([[11.5, 14.3], [15.8, 21.2], [22, 21.2], [22, 14.3]]), CO.vidS);
  R.poligono(P([[24, 14.3], [24, 21.2], [30, 21.2], [35, 14.3]]), CO.vidS);
  R.linea(X(17), Y(20.5), X(19.5), Y(15), CO.vid); R.linea(X(18.5), Y(20.5), X(21), Y(15.5), CO.vid); R.linea(X(28), Y(20.5), X(30.5), Y(15), CO.vid);
  R.disco(x + 26.5 * s, yS - 18 * s, 2.3 * s, hex('#3a2a2e')); R.disco(x + 26 * s, yS - 19.4 * s, 1.6 * s, hex('#5a3a2a'));   // el conductor, tranquilo
  R.linea(X(2), Y(6), X(45), Y(6), CO.cs); R.linea(X(2), Y(5), X(45), Y(5), CO.cs); R.linea(X(4), Y(12.4), X(39), Y(12.4), CO.cl); R.linea(X(10), Y(9.5), X(43), Y(9.5), CO.cl);
  R.linea(X(23), Y(13.5), X(23), Y(5), CO.cs); R.linea(X(10), Y(13.5), X(9), Y(5), CO.cs);
  R.linea(X(26), Y(11), X(28.5), Y(11), CO.cromo); R.linea(X(13), Y(11), X(15), Y(11), CO.cromo);
  rr(X(45), Y(10.5), X(46.5) , Y(8.5), CO.faro); rr(X(0.6), Y(10.5), X(1.8), Y(8), CO.piloto);
  R.linea(X(-0.5), Y(3.5), X(5), Y(3.5), CO.cromo); R.linea(X(41), Y(3.5), X(47.5), Y(3.5), CO.cromo);
  rr(X(35), Y(15.5), X(37), Y(14), K); R.linea(X(29), Y(23.5), X(27), Y(28), K);   // retrovisor y antena
  for (const wx of [11, 36]) { const cx = x + wx * s, cy = yS - 3.6 * s, r = 4.6 * s;
    R.disco(cx, cy, r + 1.4 * s, K); R.disco(cx, cy, r + 0.4, CO.goma); R.disco(cx, cy, r * 0.52, CO.llanta);
    for (let k = 0; k < 4; k++) { const an = giro + k * Math.PI / 2; R.linea(Math.round(cx), Math.round(cy), Math.round(cx + Math.cos(an) * r * 0.5), Math.round(cy + Math.sin(an) * r * 0.5), hex('#6a6e7a')); }
    R.pset(Math.round(cx), Math.round(cy), K); R.pset(Math.round(cx - r * 0.3), Math.round(cy - r * 0.7), hex('#4a4652')); }
  if (o.faros) for (let j = -6; j <= 8; j++) for (let i = 0; i < 40 * s; i++) { const xx = X(47.5) + i, yy = Y(9.5) + j + Math.round(i * j * 0.04); if (Math.abs(j) < 3 + i * 0.25 && um(xx, yy) < 0.32 - i / (40 * s) * 0.3) R.pset(xx, yy, hex('#f8e8a8')); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-choque'] = ('El choque', '''// FA-CHOQUE (frase 29), 2026. Cuatro planos:
// 1. el estadio de noche: las dos líneas se agachan, el centro saca y chocan en «collision»; el quarterback lanza;
// 2. a ras de césped: el liniero en tres apoyos; «300» sobre él en «300 pounds»; en «explodes» sale disparado con su
//    flecha de impulso (césped y tierra por el aire); corta en «carries»;
// 3. dos pantallas en el muro del vestíbulo: el liniero que corre con su flecha y, en la otra, un coche pequeño que avanza
//    muy despacio con la misma flecha; «=» entre las dos en «creeping»; un aficionado lo señala; corta en «at about»;
// 4. la calle de noche: el coche muy despacio (el cuentakilómetros marca «1» en «one mile»); un vecino con su perro le
//    adelanta; en «momentum» el coche toca los cubos de basura, que caen uno tras otro, y de uno sale un gato ofendido.''', COMUN + r'''
const a = (f) => en('choque', f);
const P2 = a(0.2105), P3 = a(0.4828), P4 = a(0.7236);
const CH = a(0.0315) + 0.1, T300 = a(0.2975), EXPL = a(0.3933), PANT = a(0.5925), CAR = a(0.6366), CREEP = a(0.664), UNO = a(0.764), MOM = a(0.8925), VA = a(0.9518);
const TEAL = { X: hex('#1e8a8a'), x: hex('#e8783a'), w: hex('#7ad8d8'), C: hex('#1e8a8a'), c: hex('#e8783a'), W: hex('#1e8a8a'), o: hex('#e8783a') };
// las estrellitas del choque
const chispa = (x, y, u) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + u * 5), c = u < 0.5 ? hex('#fff6c0') : hex('#f2c84a');
  for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + 0.3; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), c); R.pset(Math.round(x + Math.cos(an) * (r - 1)), Math.round(y + Math.sin(an) * (r - 1)), BL); } if (u < 0.4) { R.disco(x, y, 2, BL); } };

// 1 · el estadio: el saque y el choque de las dos líneas
const p1 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'noche', moviles: 0.55 });
  const snap = CH - 0.32, emp = t < snap ? 0 : Math.min(1, (t - snap) / (CH - snap)), vai = t > CH ? Math.sin((t - CH) * 4.2) * 1.6 * Math.max(0.3, 1 - (t - CH) / 3) : 0;
  const filas = [126, 137, 149, 162];
  // el linebacker del fondo, el receptor que sale por la derecha y el árbitro, que pita
  const lb = tramo(t, snap + 0.1, snap + 1.6); R.actor(EL.liniero, Math.round(lerp(204, 194, lb)), 132, t, { dir: -1, anda: lb > 0 && lb < 1 });
  const rc = tramo(t, snap, snap + 2.6); R.actor(EL.receptor, Math.round(lerp(150, 246, rc)), 120, t, { dir: 1, anda: rc > 0 && rc < 1 });
  R.actor(EL.tecnico, 228, 156, t, { dir: -1, tocado: 'gorra', pal: { C: hex('#f2f2ea'), c: hex('#2a2430'), F: hex('#2a2430'), W: hex('#f2f2ea') }, dedo: t > CH + 0.4 && t < CH + 1.4, sorpresa: t > CH && t < CH + 0.4 });
  R.actor(EL.quarterback, 76, 168, t, { dir: 1, pal: { C: hex('#1e8a8a') }, anda: t > snap + 0.2 && t < snap + 1.4 });
  filas.forEach((y, i) => {
    const sal = emp > 0 && emp < 1 ? 2 : 0, ox = Math.round(140 + 5 * emp + vai + (i % 2)), dx = Math.round(166 - 5 * emp + vai - (i % 2));
    R.actor(EL.liniero, ox, y, t, { dir: 1, pal: TEAL, salto: sal, enfado: t > snap });
    R.actor(EL.liniero, dx, y, t, { dir: -1, salto: sal, enfado: t > snap });
    if (i === 1) { // el centro con el balón: antes del saque, en el suelo entre las dos líneas
      if (t < snap) T.balon(R, 158, y - 2, t, { epoca: 'hoy', ang: 0 });
    }
    chispa(161, y - 15, tramo(t, CH + i * 0.05, CH + 0.55 + i * 0.05));
  });
  // el quarterback: canta la jugada, recibe, retrocede y lanza
  const atras = tramo(t, snap + 0.15, snap + 0.9), lanza = CH + 1.5, xq = Math.round(lerp(114, 98, atras));
  R.actor(EL.quarterback, xq, 143, t, { dir: 1, anda: atras > 0 && atras < 1, habla: t < snap && Math.sin(t * 9) > 0, dedo: t > lanza - 0.3 && t < lanza + 0.3, sonrisa: t > lanza + 0.6 });
  if (t > snap + 0.1 && t < lanza) T.balon(R, xq + 13, 133, t, { epoca: 'hoy', ang: -0.5 });
  const v = tramo(t, lanza, lanza + 1.6);
  if (v > 0 && v < 1) T.balon(R, Math.round(lerp(xq + 14, 300, v)), Math.round(lerp(124, 70, v) - Math.sin(v * Math.PI) * 46), t, { epoca: 'hoy', ang: -0.4 + v * 0.6, gira: 9, estela: true });
  if (t > CH && t < CH + 1.2 && Math.floor(t * 8) % 2 === 0) R.icono('!', 157, 102, hex('#f2c84a'));
  T.h_estadioDelante(R, t, { encuadre: 'noche' });
};

// 2 · a ras de césped: el liniero que arranca con todo
const terron = (x0, y0, t, t0, k) => { const q = t - t0; if (q < 0 || q > 1.4) return; const vx = (hh(k, 1, 7) - 0.75) * 70, vy = -40 - hh(k, 2, 7) * 50, x = x0 + vx * q, y = y0 + vy * q + 90 * q * q;
  if (y > y0 + 4) return; const c = hh(k, 3, 7) > 0.5 ? hex('#6a4a2a') : hex('#3c7e2e'); R.pset(Math.round(x), Math.round(y), c); R.pset(Math.round(x) + 1, Math.round(y), K); };
const polvo = (x, y, t, t0, n = 5) => { const q = t - t0; if (q < 0 || q > 1.6) return; for (let k = 0; k < n; k++) { const r = 2 + q * 7 * (0.6 + hh(k, 4, 8) * 0.6), cx = x - k * 4 - q * 10, cy = y - 3 - q * 4 - hh(k, 5, 8) * 3; for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) if (Math.hypot(xx - cx, yy - cy) <= r && um(xx, yy) < 0.75 - q * 0.45) R.pset(xx, yy, hex('#cfc2a0')); } };
const p2 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'cesped' });
  const u = tramo(t, EXPL, EXPL + 1.05), x = Math.round(lerp(94, 350, u * u * 0.55 + u * 0.45));
  const u2 = tramo(t, EXPL + 0.14, EXPL + 1.25), x2 = Math.round(lerp(62, 330, u2 * u2 * 0.55 + u2 * 0.45));
  // los rivales, al otro lado de la línea, que retroceden un paso al verlos venir
  [[150, 206], [158, 226], [166, 246]].forEach(([y, x0], k) => { const r = tramo(t, EXPL + 0.25 + k * 0.05, EXPL + 0.7); R.actor(EL.liniero, Math.round(lerp(x0, x0 + 10, r)), y, t, { dir: -1, pal: TEAL, sorpresa: t > EXPL + 0.2, enfado: t < EXPL }); });
  T.balon(R, 158, 156, t, { epoca: 'hoy', ang: 0 });
  polvo(100, 162, t, EXPL); for (let k = 0; k < 14; k++) terron(102, 160, t, EXPL + hh(k, 9, 1) * 0.3, k);
  // los compañeros de línea, uno más lejos y otro más cerca, arrancan a la vez
  const u3 = tramo(t, EXPL + 0.08, EXPL + 1.2), x3 = Math.round(lerp(122, 340, u3 * u3 * 0.55 + u3 * 0.45));
  R.actor(EL.liniero, x3, 152, t, { dir: 1, anda: u3 > 0 && u3 < 1, enfado: t > T300, salto: u3 > 0 && u3 < 1 ? Math.floor(t * 10 + 1) % 2 : 0 });
  R.actor(EL.liniero, x, 160, t, { dir: 1, anda: u > 0 && u < 1, enfado: t > T300 - 0.3, salto: u > 0 && u < 1 ? 1 + Math.floor(t * 10) % 2 : Math.sin(t * 7) > 0.6 && t > T300 ? 1 : 0 });
  R.actor(EL.liniero, x2, 168, t, { dir: 1, anda: u2 > 0 && u2 < 1, enfado: true, salto: u2 > 0 && u2 < 1 ? Math.floor(t * 10) % 2 : 0 });
  if (u > 0.05) flecha(x + 16, 147, Math.min(40, (t - EXPL) * 70));
  // «300» encima de él, con su pesa (aparece al decirlo y se queda hasta que arranca)
  const e = tramo(t, T300 - 0.1, T300 + 0.2), sale = tramo(t, EXPL, EXPL + 0.3);
  if (e > 0 && sale < 1) { const yy = Math.round(128 - 6 * e + 10 * sale); R.numero('300', 108, yy, { centro: true, tam: 16 }); const px = 76, py = yy - 12;
    R.disco(px, py + 4, 4, K); R.disco(px, py + 4, 3, hex('#4a4a56')); R.pset(px - 1, py + 3, hex('#8a8a96')); R.linea(px - 2, py - 1, px + 2, py - 1, K); R.pset(px - 2, py, K); R.pset(px + 2, py, K); }
  T.h_estadioDelante(R, t, { encuadre: 'cesped' });
};

// 3 · las dos pantallas del vestíbulo: el mismo impulso
const MURO = () => {
  const B0 = hex('#585c68'), B1 = hex('#4c505c'), B2 = hex('#666a76'), J = hex('#3a3e48');
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 10), xo = x + (fila % 2) * 10, bx = Math.floor(xo / 20), junta = y % 10 === 0 || xo % 20 === 0;
    const sombra = (y / 152) * 0.35 + Math.abs(x - 160) / 160 * 0.25 + (hh(bx, fila, 3) - 0.5) * 0.25;
    R.pset(x, y, junta ? J : sombra > um(x, y) + 0.15 ? B1 : hh(x >> 1, y >> 1, 4) > 0.93 ? B2 : (y % 10 === 1 ? B2 : B0)); }
  // viga con remaches, conducto y bandeja de cables
  R.rect(0, 22, 319, 29, K); R.rect(0, 23, 319, 28, hex('#3a4250')); R.rect(0, 23, 319, 23, hex('#5a6474')); for (let x = 6; x < 320; x += 16) { R.pset(x, 25, hex('#8a94a4')); R.pset(x, 27, hex('#2a303a')); }
  R.rect(0, 34, 319, 36, K); R.rect(0, 35, 319, 35, hex('#7a7e88')); for (let x = 10; x < 320; x += 40) R.rect(x, 33, x + 2, 37, hex('#2a2e36'));
  // suelo de hormigón pulido con reflejos, línea amarilla y juntas
  degr(0, 152, 319, 179, [hex('#3e3a46'), hex('#4a4652'), hex('#545060')]);
  for (let x = 0; x < 320; x++) { if ((x >> 3) % 2 === 0) R.pset(x, 157, hex('#d8b84a')); if (x % 64 === 0) R.linea(x, 158, x - 14, 179, hex('#36323e')); }
  for (const [x0, x1] of [[16, 150], [170, 304]]) for (let y = 160; y < 180; y++) for (let x = x0; x <= x1; x++) if (um(x, y) < 0.18 - (y - 160) * 0.008) R.pset(x, y, hex('#6a6880'));
  // extintor a la izquierda y papelera a la derecha
  R.rect(3, 116, 10, 138, K); R.rect(4, 117, 9, 137, hex('#c8302a')); R.rect(4, 117, 5, 137, hex('#e8584a')); R.rect(5, 112, 8, 116, K); R.linea(9, 114, 12, 122, K);
  R.rect(308, 128, 318, 151, K); R.rect(309, 129, 317, 150, hex('#3e5a4a')); R.rect(309, 129, 317, 130, hex('#5a7a66')); R.rect(311, 132, 315, 133, K);
  // focos colgados de la viga
  for (const x of [52, 120, 200, 252]) { R.rect(x - 1, 29, x + 1, 38, K); R.rect(x - 4, 38, x + 4, 43, K); R.rect(x - 3, 39, x + 3, 42, hex('#2a2e36')); R.rect(x - 2, 42, x + 2, 42, hex('#fff2c0'));
    for (let y = 44; y < 140; y++) for (let x2 = x - (y - 44) * 0.5; x2 < x + (y - 44) * 0.5; x2++) if (um(Math.round(x2), y) < 0.1 - (y - 44) * 0.0006) R.pset(Math.round(x2), y, hex('#8a8c98')); }
};
const panel = (x0, y0, x1, y1) => { R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#22242c')); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#3e424e')); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, hex('#0e0e14'));
  for (const x of [x0 + 10, x1 - 10]) { R.rect(x - 1, 30, x + 1, y0 - 3, K); R.pset(x, 31, hex('#6a6e7a')); } R.pset(x1 - 3, y1 + 2, hex('#3ae87a')); };
const pantallaCampo = (t) => { // el liniero que corre (el campo pasa por detrás)
  R.recorte([17, 51, 147, 131]); const s = t * 70;
  for (let y = 51; y < 75; y++) for (let x = 17; x < 148; x++) { const xx = Math.floor((x + s * 0.4) / 2), yy = Math.floor(y / 2), q = hh(xx, yy, 11), fila = (y - 51) % 6 === 0;
    R.pset(x, y, fila ? hex('#1a1e2a') : q < 0.3 ? hex('#1e8a8a') : q < 0.55 ? hex('#8a2a3a') : q < 0.7 ? hex('#e8d8b4') : q < 0.72 && Math.sin(t * 6 + xx) > 0.6 ? BL : hex('#2a2e3e')); }
  rr(17, 75, 147, 78, hex('#1e3a6a')); for (let x = 17; x < 148; x++) if (Math.floor(x + s * 0.8) % 8 < 2) R.pset(x, 76, hex('#7ad8f8'));
  for (let y = 79; y < 132; y++) for (let x = 17; x < 148; x++) { const xx = x + s, f = Math.floor(xx / 22) % 2, l = Math.floor(xx) % 44 === 0 || (Math.floor(xx) % 11 === 0 && (y === 98 || y === 112));
    R.pset(x, y, l ? hex('#eef2ea') : f ? (um(x, y) < 0.2 ? hex('#4e9a3c') : hex('#5aa844')) : (um(x, y) < 0.2 ? hex('#5aa844') : hex('#4e9a3c'))); }
  for (let k = 0; k < 6; k++) { const y = 84 + k * 7 + (k % 2) * 3, x = 147 - ((t * 160 + k * 37) % 170); R.linea(Math.round(x), y, Math.round(x + 10), y, hex('#d8f0d0')); }
  const pos = R.actor(EL.liniero, 52, 126, t, { dir: 1, anda: true, enfado: true, salto: Math.floor(t * 10) % 2 });
  polvo(56, 126, t % 0.8 + 10, 10, 3); flecha(70, 102, 46);
  R.recorte(null); return pos; };
const pantallaCalle = (t) => { // el coche pequeño muy despacio (la calle pasa despacito por detrás)
  R.recorte([173, 51, 303, 131]); const s = t * 5;
  degr(173, 51, 303, 84, [hex('#141a3a'), hex('#222a56'), hex('#3a3a6a')]);
  for (let k = 0; k < 22; k++) { const x = 173 + Math.floor(hh(k, 1, 12) * 130), y = 52 + Math.floor(hh(k, 2, 12) * 28); R.pset(x, y, Math.sin(t * 3 + k) > 0.3 ? BL : hex('#8a90c0')); }
  for (let k = -1; k < 4; k++) { const hx = 173 + ((k * 46 - s) % 184 + 184) % 184 - 30, top = 70 + (k % 2) * 4;
    R.poligono([[hx - 2, top + 6], [hx + 19, top - 6], [hx + 40, top + 6]], hex('#2a2440')); rr(hx, top + 6, hx + 38, 104, hex('#3a3456')); rr(hx, top + 6, hx + 38, top + 6, hex('#4a4466'));
    for (const wx of [hx + 5, hx + 26]) { rr(wx, top + 12, wx + 7, top + 19, hex('#f2c86a')); rr(wx + 3, top + 12, wx + 3, top + 19, hex('#a8783a')); } rr(hx + 16, top + 20, hx + 22, 104, hex('#5a3a2a')); }
  for (let k = 0; k < 2; k++) { const lx = 173 + ((k * 90 - s * 1.2) % 180 + 180) % 180 - 20; rr(lx, 72, lx + 1, 106, K); rr(lx - 3, 70, lx + 4, 72, hex('#fff2c0')); }
  rr(173, 104, 303, 109, hex('#8a8690')); for (let x = 173; x < 304; x++) if (Math.floor(x + s) % 14 === 0) R.pset(x, 106, hex('#6a6670'));
  rr(173, 110, 303, 111, hex('#b8b4bc')); rr(173, 112, 303, 131, hex('#3a3a44')); for (let y = 112; y < 132; y++) for (let x = 173; x < 304; x++) if (hh(x, y, 13) < 0.08) R.pset(x, y, hex('#4a4a56'));
  for (let x = 173; x < 304; x++) if (Math.floor(x + s) % 24 < 12) { R.pset(x, 123, hex('#d8b84a')); R.pset(x, 124, hex('#b8983a')); }
  coche(214, 127, t, 1, { giro: t * 1.2 });
  const f = tramo(t, CAR - 0.1, CAR + 0.7); flecha(218, 92, 46 * f);
  R.recorte(null); };
const p3 = (t) => {
  fijo('muro', MURO);
  // la cinta de LED de debajo, con galones que corren
  R.rect(14, 140, 306, 147, K); R.rect(15, 141, 305, 146, hex('#141824')); for (let x = 16; x < 305; x++) if ((x + Math.floor(t * 30)) % 12 < 4 && x % 2 === 0) { R.pset(x, 142 + Math.abs(((x + Math.floor(t * 30)) % 12) - 2), hex('#e8783a')); }
  panel(17, 51, 147, 131); panel(173, 51, 303, 131);
  pantallaCampo(t);
  const enc = tramo(t, PANT, PANT + 0.25);
  if (enc < 1 || (t < PANT + 0.4 && Math.floor(t * 20) % 3 === 0)) { R.rect(173, 51, 303, 131, hex('#0c0e16')); for (let y = 51; y < 132; y++) for (let x = 173; x < 304; x++) if (x - y > 160 && x - y < 176 && um(x, y) < 0.15) R.pset(x, y, hex('#2a2e3e')); if (Math.floor(t * 2) % 2) R.pset(297, 125, hex('#e83a2a')); }
  else pantallaCalle(t);
  // el «=» entre las dos flechas
  const ig = tramo(t, CREEP - 0.1, CREEP + 0.2); if (ig > 0) { const c = Math.sin(t * 8) > 0 ? hex('#f2c84a') : hex('#fff2b0'), w = Math.round(5 * ig);
    for (const y of [86, 92]) { R.rect(160 - w - 1, y - 1, 160 + w + 1, y + 2, K); R.rect(160 - w, y, 160 + w, y + 1, c); } }
  // el vestíbulo: un aficionado que se para y señala, el de la bandeja que pasa y una niña con su espuma
  const fa = tramo(t, P3, P3 + 1.8); const pf = R.actor(EL.chico, Math.round(lerp(330, 236, fa)), 176, t, { dir: -1, anda: fa > 0 && fa < 1, dedo: t > CREEP - 0.2 && t < CREEP + 1.4, sorpresa: t > CREEP && t < CREEP + 0.6, sonrisa: t > CREEP + 0.6 });
  const vb = tramo(t, P3, P4); const xv = Math.round(lerp(-24, 96, vb)); R.actor(EL.obrero, xv, 174, t, { dir: 1, anda: vb > 0 && vb < 1, pal: { C: hex('#e8d8b4'), c: hex('#c84a3a') } });
  R.rect(xv + 12, 156, xv + 26, 158, K); R.rect(xv + 13, 156, xv + 25, 156, hex('#c8c0b0')); for (const k of [0, 1, 2]) { R.rect(xv + 14 + k * 4, 151, xv + 16 + k * 4, 155, K); R.rect(xv + 15 + k * 4, 152, xv + 15 + k * 4, 155, hex('#f2c84a')); }
  R.actor(EL.chica, 150, 178, t, { dir: 1, sonrisa: t > CAR, dedo: t > CAR + 0.3 && t < CAR + 1.1 });
};

// 4 · la calle de noche: el coche a un kilómetro y medio por hora, el vecino que le adelanta y los cubos
const CALLE = () => {
  degr(0, 0, 319, 76, [hex('#121838'), hex('#1c2450'), hex('#2a3064'), hex('#463c70'), hex('#64487a')]);
  for (let k = 0; k < 80; k++) { const x = Math.floor(hh(k, 3, 1) * 320), y = Math.floor(hh(k, 5, 2) * 62); if ((x >= 18 && x <= 172 && y <= 16) || (x >= 276 && y <= 46)) continue; R.pset(x, y, hh(k, 1, 3) > 0.75 ? BL : hex('#9aa2d0')); }
  for (let y = 16; y < 46; y++) for (let x = 36; x < 72; x++) { const d = Math.hypot(x - 54, y - 31); if (d > 8 && d < 15 && um(x, y) < (15 - d) / 18) R.pset(x, y, hex('#3a4078')); }
  R.disco(54, 31, 8, K); R.disco(54, 31, 7, hex('#f2ecd0')); R.disco(51, 29, 2, hex('#d8d0b0')); R.disco(57, 34, 1.5, hex('#d8d0b0')); R.disco(56, 27, 1, hex('#d8d0b0'));
  // el estadio iluminado al fondo, a la derecha
  for (let y = 36; y < 78; y++) for (let x = 168; x < 276; x++) { const d = Math.hypot((x - 222) / 1.6, y - 74); if (d < 40 && um(x, y) < (40 - d) / 70) R.pset(x, y, hex('#6a5a8a')); }
  R.poligono([[184, 78], [192, 62], [252, 62], [260, 78]], hex('#262444')); R.linea(192, 62, 252, 62, hex('#4a4470')); for (let x = 194; x < 252; x += 3) R.pset(x, 64, hex('#f2d88a'));
  for (const x of [196, 248]) { R.linea(x, 44, x, 62, hex('#1a1830')); R.rect(x - 4, 41, x + 4, 45, K); for (let i = -3; i <= 3; i += 2) R.pset(x + i, 43, hex('#fff6d0')); }
  // árboles y tejados lejanos
  for (let x = 0; x < 320; x++) { const h0 = 70 + Math.round(Math.sin(x * 0.11) * 3 + Math.sin(x * 0.37) * 2); for (let y = h0; y < 82; y++) R.pset(x, y, um(x, y) < 0.5 ? hex('#1a2a2e') : hex('#203236')); }
  // tres casas
  const casa = (x0, x1, yT, pared, paredS, tejado) => {
    const cx = (x0 + x1) / 2; R.poligono([[x0 - 5, yT + 1], [cx, yT - 22], [x1 + 5, yT + 1]], K); R.poligono([[x0 - 3, yT], [cx, yT - 20], [x1 + 3, yT]], tejado);
    for (let y = yT - 19; y < yT; y += 3) for (let x = x0 - 3; x <= x1 + 3; x++) { const dentro = Math.abs(x - cx) < (y - (yT - 20)) * ((x1 - x0) / 2 + 3) / 20; if (dentro) R.pset(x, y, (x + (y % 6 ? 2 : 0)) % 5 === 0 ? K : hex('#2a2230')); }
    R.rect(x1 - 18, yT - 18, x1 - 11, yT - 8, K); R.rect(x1 - 17, yT - 17, x1 - 12, yT - 8, hex('#7a4a3a')); R.rect(x1 - 18, yT - 19, x1 - 11, yT - 18, hex('#5a3a2e'));
    R.rect(x0, yT, x1, 114, K); for (let y = yT + 1; y < 114; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, (y - yT) % 3 === 0 ? paredS : um(x, y) < 0.1 ? paredS : pared);
    const dx = Math.round(cx) - 6; R.rect(dx - 2, 90, dx + 13, 114, K); R.rect(dx, 92, dx + 11, 114, hex('#5a3a2a')); R.rect(dx + 1, 93, dx + 10, 102, hex('#6a4632')); R.rect(dx + 1, 104, dx + 10, 113, hex('#6a4632')); R.pset(dx + 9, 104, hex('#f2c84a'));
    R.rect(dx + 4, 86, dx + 7, 89, K); R.rect(dx + 5, 87, dx + 6, 88, hex('#fff2b0')); R.rect(dx - 4, 114, dx + 15, 116, hex('#8a8690'));
    for (const wx of [x0 + 6, x1 - 22]) { R.rect(wx - 1, yT + 6, wx + 17, yT + 20, K); R.rect(wx, yT + 7, wx + 16, yT + 19, hex('#f2c86a')); R.rect(wx, yT + 7, wx + 16, yT + 8, hex('#c8783a')); R.rect(wx + 8, yT + 7, wx + 8, yT + 19, hex('#8a5a2a')); R.rect(wx, yT + 13, wx + 16, yT + 13, hex('#8a5a2a'));
      R.rect(wx, yT + 7, wx + 3, yT + 19, hex('#c84a3a')); R.rect(wx + 13, yT + 7, wx + 16, yT + 19, hex('#c84a3a')); R.rect(wx - 2, yT + 21, wx + 18, yT + 22, hex('#e8e2d4')); }
    for (let k = 0; k < 6; k++) { const bx = x0 + 4 + k * ((x1 - x0 - 8) / 5); if (Math.abs(bx - cx) < 12) continue; R.disco(bx, 112, 5, K); R.disco(bx, 112, 4, hex('#2e5a2e')); R.disco(bx - 1, 110, 2, hex('#4a7a3a')); }
  };
  casa(6, 82, 82, hex('#d8c8a0'), hex('#b8a880'), hex('#4a3a40'));
  casa(110, 186, 86, hex('#8aa0b8'), hex('#70869e'), hex('#3a3448'));
  casa(218, 300, 84, hex('#a8b890'), hex('#8a9a74'), hex('#4a3438'));
  // césped, valla, acera, bordillo y calzada
  for (let y = 114; y < 121; y++) for (let x = 0; x < 320; x++) R.pset(x, y, um(x, y) < 0.3 ? hex('#2a4a2a') : hex('#345a32'));
  for (let x = 0; x < 320; x += 5) if (!(x > 40 && x < 56) && !(x > 142 && x < 158) && !(x > 252 && x < 268)) { R.rect(x, 108, x + 2, 118, K); R.rect(x + 1, 109, x + 1, 117, hex('#e8e2d4')); } R.rect(0, 111, 319, 111, hex('#c8c2b4'));
  R.rect(0, 121, 319, 130, hex('#8e8a96')); for (let x = 0; x < 320; x++) { if (x % 18 === 0) R.linea(x, 121, x - 3, 130, hex('#6e6a76')); if (hh(x, 1, 14) < 0.15) R.pset(x, 121 + Math.floor(hh(x, 2, 14) * 9), hex('#7a7682')); } R.rect(0, 121, 319, 121, hex('#a8a4b0'));
  R.rect(0, 131, 319, 132, hex('#b8b4bc')); R.rect(0, 133, 319, 134, hex('#6e6a76'));
  for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x, y, 15); R.pset(x, y, q < 0.12 ? hex('#2e2e38') : q > 0.9 ? hex('#4a4a56') : hex('#3a3a46')); }
  for (let x = 0; x < 320; x++) if (x % 26 < 14) { R.pset(x, 162, hex('#d8b84a')); R.pset(x, 163, hex('#a8883a')); }
  { let x = 30, y = 172; for (let k = 0; k < 40; k++) { R.pset(x, y, hex('#24242c')); x += 1; y += hh(k, 3, 16) < 0.4 ? -1 : hh(k, 3, 16) > 0.7 ? 1 : 0; } }
  R.rect(120, 166, 150, 174, hex('#34343e')); R.rect(120, 166, 150, 166, hex('#44444e'));
  for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 3.3) ** 2 <= 1) R.pset(80 + i, 170 + j, (i / 9) ** 2 + (j / 3.3) ** 2 > 0.7 ? K : (i + j) % 3 === 0 ? hex('#2a2a32') : hex('#4a4a54'));
  R.rect(200, 133, 214, 136, K); for (let x = 201; x < 214; x += 2) R.rect(x, 134, x, 135, hex('#5a5a66'));
  // farolas con su charco de luz en la acera
  for (const x of [96, 206]) { for (let y = 118; y < 134; y++) for (let xx = x - 26; xx < x + 26; xx++) { const d = Math.hypot((xx - x) / 2.2, y - 126); if (d < 10 && um(xx, y) < (10 - d) / 14) R.pset(xx, y, hex('#c8c0a0')); }
    R.rect(x - 1, 60, x + 1, 124, K); R.rect(x, 61, x, 123, hex('#4a5060')); R.rect(x - 3, 122, x + 3, 125, K); R.rect(x - 1, 58, x + 7, 60, K); R.rect(x + 3, 60, x + 9, 64, K); R.rect(x + 4, 61, x + 8, 63, hex('#fff2c0')); }
};
const cubo = (x, yS, ang, col, tapa = 0) => { // cubo de basura con ruedas que se inclina sobre su esquina de abajo a la derecha
  const c = Math.cos(ang), s = Math.sin(ang);
  const rot = (u, v) => { const du = u - 14, dv = -v; return [x + 14 + du * c - dv * s, yS + du * s + dv * c]; };
  R.poligono([rot(0, 0), rot(14, 0), rot(15, 21), rot(-1, 21)], K); R.poligono([rot(1, 1), rot(13, 1), rot(14, 20), rot(0, 20)], col[0]);
  R.poligono([rot(1, 1), rot(3, 1), rot(2.5, 20), rot(0, 20)], col[1]); R.poligono([rot(11, 1), rot(13, 1), rot(14, 20), rot(12, 20)], col[2]);
  for (const v of [7, 13]) { const [a1, b1] = rot(2, v), [a2, b2] = rot(12, v); R.linea(Math.round(a1), Math.round(b1), Math.round(a2), Math.round(b2), col[2]); }
  const ta = ang + tapa; const rt = (u, v) => { const [px, py] = rot(-1, 21); const du = u, dv = -v, ct = Math.cos(ta), st = Math.sin(ta); return [px + du * ct - dv * st, py + du * st + dv * ct]; };
  R.poligono([rt(-1, 0), rt(17, 0), rt(17, 3), rt(-1, 3)], K); R.poligono([rt(0, 1), rt(16, 1), rt(16, 2), rt(0, 2)], col[3]);
  const [wx, wy] = rot(2, 1); R.disco(wx, wy, 2.4, K); R.disco(wx, wy, 1.2, hex('#5a5a66')); };
const perro = (x, yS, t, anda) => { const f = anda ? Math.floor(t * 9) % 2 : 0, pal = { k: K, M: hex('#c8884a'), m: hex('#8a5a2a'), n: hex('#f2e2c8') };
  R.dibujo(['........kk...', '.......kMMk..', 'k......kMMMkk', '.k.....kMMnnk', '.kkkkkkkMMkk.', '..kMMMMMMMk..', '..kMMnnnMMk..', '..kMmkkkMmk..', f ? '..k.k...k.k..' : '.k...k.k...k.'], x, yS - 9, 1, pal); };
const p4 = (t) => {
  fijo('calle', CALLE);
  // nubes de tres tonos a tres velocidades y estrellas que titilan
  for (const [v, y, w, k] of [[1.5, 20, 34, 0], [3, 36, 26, 1], [5, 50, 22, 2], [2.2, 28, 30, 3]]) { const x = ((k * 97 + t * v) % 400) - 40; if (x > 250 && y < 46) continue; nube(x, y, w, hex('#2a3060'), hex('#3a4274'), hex('#565c8a')); }
  for (let k = 0; k < 8; k++) if (Math.sin(t * 5 + k * 2.3) > 0.85) R.pset(Math.floor(hh(k, 3, 1) * 160) + 100, Math.floor(hh(k, 5, 2) * 40) + 16, BL);
  // la tele de una ventana parpadea; polillas en las farolas
  if (Math.sin(t * 13) > 0.3) R.rect(117, 93, 125, 98, hex('#7ab8e8'));
  for (const x of [96, 206]) for (let k = 0; k < 3; k++) R.pset(Math.round(x + 6 + Math.sin(t * 7 + k * 2) * 5), Math.round(66 + Math.cos(t * 9 + k) * 3), hex('#f2e8c0'));
  // el árbol de la derecha, que se mece
  const m = Math.sin(t * 1.3) * 1.5; R.rect(304, 76, 307, 122, K); R.rect(305, 77, 306, 121, hex('#4a3428'));
  for (const [dx, dy, r] of [[0, 62, 13], [-9, 70, 9], [9, 70, 9], [0, 52, 9]]) { R.disco(306 + dx + m, dy, r + 1, K); R.disco(306 + dx + m, dy, r, hex('#2a4a2e')); R.disco(303 + dx + m, dy - 3, r * 0.5, hex('#3e6a3a')); }
  // el vecino con su perro, por la acera, más rápido que el coche
  const w = tramo(t, P4, E.duracion), xw = Math.round(lerp(-10, 236, w)), mira = t > MOM + 0.1;
  perro(xw + 18, 129, t, !mira); R.linea(xw + 12, 116, xw + 20, 124, hex('#c84a3a'));
  R.actor(EL.senor30, xw, 129, t, { dir: 1, anda: !mira, sorpresa: mira && t < VA + 0.4, sonrisa: t > VA + 0.4 });
  // el coche: un kilómetro y medio por hora, hasta tocar el primer cubo
  const toque = MOM + 0.15, xc = t < toque ? lerp(98, 176, tramo(t, P4, toque)) : 176 - Math.sin(Math.min(1, (t - toque) / 0.4) * Math.PI) * 1.5;
  coche(xc, 151, t, 1.5, { giro: (xc - 98) / 6.9, faros: true });
  // la misma flecha, que se gasta al tocar y pasa a los cubos
  const fl = 46 * (1 - tramo(t, toque, toque + 0.5)); flecha(xc + 22, 108, fl);
  // el cuentakilómetros con el «1»
  const cu = tramo(t, P4 + 0.3, P4 + 0.6); if (cu > 0) { const gx = Math.round(xc + 10), gy = 96; R.disco(gx, gy, 9, K); R.disco(gx, gy, 8, hex('#f2eee2')); for (let k = 0; k < 7; k++) { const an = Math.PI * (0.8 + k * 0.233); R.pset(Math.round(gx + Math.cos(an) * 6.5), Math.round(gy + Math.sin(an) * 6.5), K); }
    const an = Math.PI * (0.83 + 0.05 * Math.sin(t * 3)); R.linea(gx, gy, Math.round(gx + Math.cos(an) * 6), Math.round(gy + Math.sin(an) * 6), hex('#c83a2a')); R.pset(gx, gy, K);
    if (t > UNO) R.numero('1', gx + 2, gy + 6, { centro: true }); }
  // los cubos: caen uno tras otro y del último sale el gato, ofendido
  const VERDE = [hex('#2e6a3e'), hex('#4a8a54'), hex('#1e4a2a'), hex('#3a7a48')], AZUL = [hex('#2e4a8a'), hex('#4a6aaa'), hex('#1e3266'), hex('#3a5a9a')];
  const c1 = tramo(t, toque, toque + 0.35) * 0.42, c2 = tramo(t, toque + 0.25, toque + 0.6) * 0.42, c3 = tramo(t, toque + 0.5, toque + 0.95) ** 2 * 1.5;
  cubo(276, 151, c3, VERDE, -tramo(t, toque + 0.8, toque + 1.1) * 1.2); cubo(260, 151, c2, AZUL); cubo(244, 151, c1, VERDE);
  if (c1 > 0 && t < toque + 0.6) for (const [x0, k] of [[256, 0], [272, 1], [290, 2]]) flecha(x0, 122 - k * 2, 10 * (1 - tramo(t, toque + k * 0.25, toque + k * 0.25 + 0.5)));
  const g = tramo(t, VA - 0.05, VA + 0.55); if (g > 0) { const gx = Math.round(lerp(300, 300, g)), gy = Math.round(lerp(140, 133, g) - Math.sin(g * Math.PI) * 16); T.gato(R, gx, gy, t); if (g > 0.95 && Math.floor(t * 3) % 2) R.icono('!', gx + 10, gy - 26, hex('#f2c84a')); }
};
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { año: 2026, efectos: [[CH, 'palmada'], [CH + 1.5, 'whoosh'], [T300, 'pop'], [EXPL, 'whoosh'], [PANT, 'interruptor'], [CREEP, 'brillo'], [UNO, 'tic'], [MOM + 0.15, 'golpecito'], [MOM + 0.7, 'toc'], [VA + 0.1, 'miau']] });
''')

# Cascos pequeños para llevar en la mano o dejar en un banco (9 × 7 y 7 × 5 px)
CASCOS = r'''
const CASCO_F = ['..kkkkk..', '.kFfFfFk.', 'kFfFfFfFk', 'kCCCCCCCk', 'kCCCCkwwk', 'kCCk.kwk.', '.kk...kk.'];
const CASCO_N = ['..kkkkk..', '.kCCCCCk.', 'kCLCCCCCk', 'kCCCCCCCk', 'kCCCCkwwk', 'kCCk.kwk.', '.kk...kk.'];
const CASCO_C = ['.kkkkk.', 'kBbBbBk', 'kBBBBBk', 'kBkkkBk', 'kk...kk'];
const PCAS = { k: K, F: FU[0], f: FU[1], C: hex('#1e8a8a'), L: hex('#7ad8d8'), w: hex('#c8ccd4'), B: hex('#8a5428'), b: hex('#5a3418') };
const cascoMano = (spr, x, y, dir = 1) => R.dibujo(spr, Math.round(x - spr[0].length / 2), Math.round(y - spr.length + 2), dir, PCAS);
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-casco'] = ('El casco', '''// FA-CASCO (frases 30–31), 2026 → 1905–1943 → 2022 → 2026. Siete planos:
// 1. la torre de caídas: el técnico entra con un casco con funda y lo enseña en «helmet»; la física suelta los huevos
//    en «stopping» y caen en «the head»: el de la funda rebota entero y el otro se casca (gag), sorpresa y risa;
// 2. el monitor de la mesa: la curva roja, alta y estrecha; la verde azulada se dibuja más baja y más ancha en «lasts», la
//    flecha de ancho en «extra» y la de bajada en «force»; el huevo con funda de la huevera presume (corta en «Leather»);
// 3. la vitrina: la guía recorre los cascos (1905, 1925, 1943) señalando cada uno cuando la voz lo dice; padre e hijo;
// 4. 1943, el campo: el recogepelotas trae un casco de cuero al jugador sin casco en «mandatory» y se lo pone en «1943»;
// 5. 2022, el vestuario: el utilero pone fundas a los cascos del banco y le da una al liniero, que se la pone en «helmet»;
// 6. la nave de impactos: el físico pulsa en «lab tests», el ariete golpea el casco con funda y la barra se queda en 4 de 5;
// 7. 2026, el entrenamiento: dos jugadores con funda chocan en «collision», rebotan y se ríen; el entrenador pita.''', COMUN + CASCOS + r'''
const b = (f) => en('frenar', f), c = (f) => en('cascos', f);
const C2 = b(0.5325), C3 = c(0), C4 = c(0.2058), C5 = c(0.3756), C6 = c(0.6551), C7 = c(0.8279);
const HELMET = b(0.0585), STOP = b(0.3045), LASTS = b(0.6138), EXTRA = b(0.6609), FORCE = b(0.8659), DOWN = b(0.947);
const E1900 = c(0.0576), PLASTIC = c(0.1363), MANDA = c(0.2622), Y1943 = c(0.3068), PADDED = c(0.5721), HELMET2 = c(0.6246);
const GUARD = c(0.6587), LAB = c(0.7271), SEV = c(0.783), BOTH = c(0.8853), COLL = c(0.9318);
const TEAL = { X: hex('#1e8a8a'), x: hex('#e8783a'), w: hex('#7ad8d8'), C: hex('#1e8a8a'), c: hex('#e8783a'), W: hex('#1e8a8a'), o: hex('#e8783a') };
const REL = STOP - 0.3, IMP = STOP + 0.45;
const uHuevo = (t) => t < REL ? 0.02 : t < IMP ? 0.04 + 0.46 * (t - REL) / (IMP - REL) : 0.5 + 0.5 * Math.min(1, (t - IMP) / 1.6);

// 1 · la torre de caídas
const p1 = (t) => {
  T.labCasco(R, t, { encuadre: 'torre', u: uHuevo(t) });
  // el técnico entra con el casco con funda y lo enseña
  const w = tramo(t, 0.2, 1.4), xt = Math.round(lerp(-18, 34, w)), ensena = t > HELMET + 0.1 && t < HELMET + 1.5;
  const pt = R.actor(EL.tecnico, xt, 160, t, { dir: 1, anda: w > 0 && w < 1, dedo: ensena, sorpresa: t > IMP && t < IMP + 0.7, sonrisa: t > IMP + 0.7, habla: ensena && Math.sin(t * 9) > 0 });
  if (ensena) cascoMano(CASCO_F, pt.mano[0] + 2, pt.mano[1] - 1); else cascoMano(CASCO_F, xt + 16, 152);
  // la física suelta los huevos con el mando y luego señala el monitor
  const suelta = t > REL - 0.35 && t < REL + 0.25, senala = t > IMP + 1.0;
  const pf = R.actor(EL.fisica, 236, 158, t, { dir: senala ? 1 : -1, dedo: suelta || senala, habla: t < REL - 0.5 && Math.sin(t * 8) > 0.2, sonrisa: t > IMP + 0.4 });
  if (suelta) { const [mx, my] = pf.mano; R.rect(mx - 1, my - 2, mx + 2, my + 4, K); R.rect(mx, my - 1, mx + 1, my + 3, hex('#3a3e4a')); R.pset(mx, my - 1, Math.floor(t * 10) % 2 ? hex('#e83a2a') : hex('#ff8a6a')); }
};

// 2 · el monitor de la fuerza, sobre la mesa del laboratorio
const MESA = () => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const j = y % 12 === 0 || (x + (Math.floor(y / 12) % 2) * 8) % 16 === 0, s = y / 128 * 0.3 + Math.abs(x - 160) / 160 * 0.2;
    R.pset(x, y, j ? hex('#a2aab4') : s > um(x, y) + 0.12 ? hex('#b4bcc6') : y % 12 === 1 ? hex('#dce2e8') : hex('#c6ced6')); }
  // estante con carpetas a la izquierda y cartel de la curva a la derecha
  R.rect(2, 50, 40, 52, K); R.rect(3, 50, 39, 50, hex('#7a8aa0')); for (let k = 0; k < 6; k++) { const col = [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8b830'), hex('#3aa86a'), hex('#8a4ac8'), hex('#e8783a')][k]; R.rect(4 + k * 6, 30 + (k % 2) * 3, 8 + k * 6, 49, K); R.rect(5 + k * 6, 31 + (k % 2) * 3, 7 + k * 6, 48, col); R.rect(5 + k * 6, 40, 7 + k * 6, 41, hex('#f2eee2')); }
  R.rect(272, 62, 314, 104, K); R.rect(273, 63, 313, 103, hex('#f2eee2')); R.linea(278, 98, 308, 98, K); R.linea(278, 98, 278, 68, K); for (let x = 279; x < 308; x++) { R.pset(x, Math.round(97 - 26 * Math.exp(-(((x - 286) / 3) ** 2))), hex('#c83a3a')); R.pset(x, Math.round(97 - 12 * Math.exp(-(((x - 292) / 7) ** 2))), hex('#1e8a8a')); } R.rect(291, 58, 295, 63, hex('#c83a3a'));
  // la mesa
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 129 ? (y === 126 ? hex('#ece8e0') : hex('#aea698')) : (hh(x >> 3, y, 21) < 0.08 || (x + y * 3) % 47 === 0) ? hex('#c8c2b4') : hex('#d8d2c6'));
  for (let x = 60; x < 260; x++) for (let y = 129; y < 136; y++) if (um(x, y) < 0.3) R.pset(x, y, hex('#b8b2a4'));
  // el monitor
  R.rect(44, 22, 264, 124, K); R.rect(45, 23, 263, 123, hex('#2a2e36')); R.rect(45, 23, 263, 24, hex('#4a505c')); R.rect(48, 28, 260, 120, K);
  R.rect(146, 124, 162, 131, K); R.rect(147, 124, 161, 130, hex('#3a3e48')); R.rect(126, 131, 182, 135, K); R.rect(127, 131, 181, 134, hex('#4a4e58')); R.rect(127, 131, 181, 131, hex('#6a6e7a')); R.pset(252, 121, hex('#3ae87a'));
  // teclado
  R.rect(92, 140, 200, 153, K); R.rect(93, 141, 199, 152, hex('#e8e8ec')); for (let r = 0; r < 4; r++) for (let k = 0; k < 17; k++) { R.rect(95 + k * 6 + (r % 2) * 2, 142 + r * 3, 98 + k * 6 + (r % 2) * 2, 143 + r * 3, hex('#b8bcc6')); }
  R.rect(110, 154, 182, 155, hex('#c2bcae'));
  // cuaderno con números y lápiz
  R.poligono([[8, 148], [64, 144], [68, 176], [12, 180]], K); R.poligono([[9, 149], [63, 145], [67, 175], [13, 179]], hex('#f6f2e4'));
  for (let k = 0; k < 6; k++) R.linea(14, 154 + k * 4, 62, 150 + k * 4, hex('#9ab8d8')); R.numero('12', 20, 158, { fina: true, rampa: [hex('#3a3a6a'), hex('#3a3a6a'), hex('#3a3a6a'), hex('#3a3a6a')] });
  R.linea(30, 172, 70, 160, K); R.linea(31, 172, 70, 161, hex('#f2c84a')); R.pset(70, 160, hex('#e89aa0'));
  // platillo con la cáscara rota del otro huevo
  for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3.5) ** 2 <= 1) R.pset(222 + i, 166 + j, (i / 14) ** 2 + (j / 3.5) ** 2 > 0.75 ? K : j < 0 ? hex('#f2f2f6') : hex('#d8dce4'));
  R.poligono([[212, 163], [218, 158], [221, 164]], hex('#f2e6cc')); R.linea(212, 163, 218, 158, K); R.poligono([[224, 164], [229, 157], [233, 163]], hex('#f2e6cc')); R.linea(224, 164, 229, 157, K); R.disco(222, 166, 2.5, hex('#f2b42a'));
  // huevera
  R.rect(238, 150, 256, 156, K); R.rect(239, 150, 255, 155, hex('#e8783a')); R.poligono([[240, 150], [254, 150], [251, 143], [243, 143]], K); R.poligono([[241, 149], [253, 149], [250, 144], [244, 144]], hex('#f4945a'));
  // el casco grande con funda, a la derecha
  for (let y = 128; y < 166; y++) for (let x = 268; x < 320; x++) { const u = (x - 296) / 24, v = (y - 160) / 30; const d = u * u + v * v; if (y > 160 || d > 1) continue;
    const f = d > 0.92 ? K : y < 146 ? ((Math.floor(Math.atan2(v, u) * 7) % 2) ? FU[0] : FU[2]) : (x > 302 && y > 150 ? hex('#c8ccd4') : hex('#1e8a8a')); R.pset(x, y, f); }
  R.rect(268, 160, 319, 161, K);
  // la taza
  R.rect(14, 118, 30, 140, K); R.rect(15, 119, 29, 139, hex('#3a6ac8')); R.rect(15, 119, 17, 139, hex('#5a8ae8')); R.rect(30, 124, 34, 134, K); R.rect(31, 125, 32, 133, hex('#3a6ac8'));
};
const graf = (t) => {
  R.recorte([49, 29, 259, 119]);
  for (let y = 29; y < 120; y++) for (let x = 49; x < 260; x++) R.pset(x, y, (x - 60) % 24 === 0 || (104 - y) % 12 === 0 ? hex('#16263a') : y % 2 ? hex('#0e1622') : hex('#101a28'));
  R.linea(60, 104, 252, 104, hex('#7a9ab8')); R.linea(60, 36, 60, 104, hex('#7a9ab8')); for (let k = 0; k <= 8; k++) R.linea(60 + k * 24, 104, 60 + k * 24, 106, hex('#7a9ab8'));
  for (let k = 0; k <= 4; k++) R.numero(String(k * 10), 60 + k * 48, 116, { centro: true, fina: true, rampa: [hex('#7a9ab8'), hex('#7a9ab8'), hex('#9abad8'), hex('#9abad8')] });
  const roja = (x) => 104 - 62 * Math.exp(-(((x - 92) / 6) ** 2)), verde = (x) => 104 - 28 * Math.exp(-(((x - 108) / 14) ** 2));
  for (let x = 61; x < 252; x++) { R.linea(x - 1, Math.round(roja(x - 1)), x, Math.round(roja(x)), hex('#e8504a')); R.linea(x - 1, Math.round(roja(x - 1)) + 1, x, Math.round(roja(x)) + 1, hex('#8a2a2a')); }
  const xv = lerp(60, 252, tramo(t, C2 + 0.2, LASTS + 0.7));
  for (let x = 61; x < xv; x++) { R.linea(x - 1, Math.round(verde(x - 1)), x, Math.round(verde(x)), hex('#3ac8b0')); R.linea(x - 1, Math.round(verde(x - 1)) + 1, x, Math.round(verde(x)) + 1, hex('#1e6a5a')); }
  if (xv < 252) { R.linea(Math.round(xv), 32, Math.round(xv), 104, hex('#3a5a7a')); R.disco(xv, verde(xv), 1.6, BL); }
  // el ancho: «unas milésimas más»
  const an = tramo(t, EXTRA - 0.2, EXTRA + 0.6); if (an > 0) { const w = Math.round(22 * an), y = 96, col = Math.floor(t * 6) % 2 ? hex('#f2c84a') : hex('#fff2b0');
    R.linea(108 - w, y, 108 + w, y, col); for (const s of [-1, 1]) { R.linea(108 + s * w, y, 108 + s * (w - 3), y - 3, col); R.linea(108 + s * w, y, 108 + s * (w - 3), y + 3, col); } R.linea(86, y - 2, 98, y - 2, hex('#e8504a')); }
  // la bajada de la fuerza
  const ba = tramo(t, FORCE - 0.1, DOWN + 0.2); if (ba > 0) { R.linea(93, 42, 150, 42, hex('#e8504a'), 4); R.linea(109, 76, 150, 76, hex('#3ac8b0'), 4); const y1 = Math.round(lerp(44, 74, ba)), col = hex('#f2c84a');
    R.linea(150, 44, 150, y1, col); R.linea(151, 44, 151, y1, col); R.linea(146, y1 - 4, 150, y1, col); R.linea(155, y1 - 4, 151, y1, col); }
  // la leyenda: huevo cascado y huevo con funda
  const hv = (x, y, roto, cs) => { for (let j = -4; j <= 4; j++) for (let i = -3; i <= 3; i++) if ((i / 3.4) ** 2 + (j / 4.4) ** 2 <= 1) R.pset(x + i, y + j, (i / 3.4) ** 2 + (j / 4.4) ** 2 > 0.6 ? cs : hex('#f2e6cc')); if (roto) { R.linea(x - 3, y, x - 1, y - 2, K); R.linea(x - 1, y - 2, x + 1, y, K); R.linea(x + 1, y, x + 3, y - 2, K); } else R.linea(x - 3, y - 3, x + 3, y - 3, FU[0]); };
  hv(222, 40, true, hex('#e8504a')); hv(242, 40, false, hex('#3ac8b0'));
  // el puntero del ratón, que va al pico bajo
  const pm = tramo(t, FORCE - 0.6, FORCE + 0.1), px = Math.round(lerp(200, 112, pm) + Math.sin(t * 2) * 2), py = Math.round(lerp(90, 76, pm));
  R.dibujo(['k....', 'kk...', 'kWk..', 'kWWk.', 'kWWWk', 'kWkk.', 'kk...'], px, py, 1, { k: K, W: BL });
  R.recorte(null);
};
const p2 = (t) => {
  fijo('mesa', MESA); graf(t);
  // el huevo con funda presume en su huevera (se mece cuando la fuerza baja); la taza humea; el ratón se mueve
  const mece = t > FORCE ? Math.sin((t - FORCE) * 9) * Math.max(0, 1 - (t - FORCE) / 1.5) * 2 : 0, ex = Math.round(247 + mece);
  for (let j = -9; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = (i / 6) ** 2 + (j / (j < 0 ? 9 : 6.5)) ** 2; if (d <= 1) R.pset(ex + i, 137 + j, d > 0.8 ? K : i < -2 && j < -3 ? hex('#fffaee') : hex('#f2e6cc')); }
  for (let j = 0; j < 5; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((4 - j) / 5) ** 2)) * 7); for (let i = -w; i <= w; i++) R.pset(ex + i, 126 + j, i === -w || i === w || j === 0 ? K : (i + 9) % 3 === 0 ? FU[1] : FU[0]); }
  if (t > FORCE + 0.3 && t < FORCE + 1.6) { R.pset(ex + 4, 133, K); R.pset(ex - 3, 133, K); R.linea(ex - 2, 139, ex + 2, 139, K); R.pset(ex - 3, 138, K); R.pset(ex + 3, 138, K); }
  else { R.pset(ex + 3, 134, K); R.pset(ex - 2, 134, K); }
  for (let k = 0; k < 3; k++) { const q = (t * 0.6 + k / 3) % 1; R.pset(Math.round(22 + Math.sin(q * 9 + k) * 2), Math.round(116 - q * 22), q < 0.6 ? hex('#f2f6fa') : hex('#d8dee6')); }
  const mx = Math.round(216 + Math.sin(t * 2) * 2 - tramo(t, FORCE - 0.6, FORCE + 0.1) * 6); R.disco(mx, 147, 5, K); R.disco(mx, 147, 4, hex('#e8e8ec')); R.linea(mx, 143, mx, 147, hex('#9a9eaa')); R.linea(mx, 142, mx - 10, 136, K);
};

// 3 · la vitrina: del cuero al plástico
const xGuia = (t) => { const P = [[C3, 26], [C3 + 0.5, 46], [E1900 - 0.4, 46], [E1900 + 0.3, 92], [PLASTIC - 0.6, 92], [PLASTIC - 0.05, 138], [C4, 138]];
  for (let i = 1; i < P.length; i++) if (t < P[i][0]) { const u = (t - P[i - 1][0]) / (P[i][0] - P[i - 1][0]); return [Math.round(lerp(P[i - 1][1], P[i][1], Math.max(0, u))), P[i][1] !== P[i - 1][1]]; } return [138, false]; };
const p3 = (t) => {
  T.labCasco(R, t, { encuadre: 'vitrina' });
  const [xg, mueve] = xGuia(t), señala = !mueve && t > C3 + 0.5;
  // el brillo del casco que señala
  const foco = xg < 60 ? 60 : xg < 110 ? 106 : 152; if (señala) { const k = Math.floor(t * 6) % 2; for (const [dx, dy] of [[0, -3], [0, 3], [-3, 0], [3, 0]]) R.pset(foco - 2 + dx * (k + 1) / 2 + 8, 72 + dy * (k + 1) / 2, hex('#fff6c0')); R.pset(foco + 6, 72, BL); }
  // padre e hijo detrás de la guía
  const xp = Math.max(-30, xg - 44); R.actor(EL.senor30, xp, 170, t, { dir: 1, anda: mueve, sonrisa: t > PLASTIC });
  R.actor(EL.chico, xp + 18, 172, t, { dir: 1, anda: mueve, sorpresa: señala && t > E1900, dedo: t > PLASTIC + 0.2 });
  R.actor(EL.fisica, xg, 167, t, { dir: señala ? 1 : 1, anda: mueve, dedo: señala, habla: señala && Math.sin(t * 8) > 0 });
  // un visitante al fondo, mirando el de 2022
  R.actor(EL.senora30, 232, 165, t, { dir: -1, sonrisa: true });
};

// 4 · 1943: el casco pasa a ser obligatorio
const p4 = (t) => {
  T.westPoint(R, t, { encuadre: 'campo', mula: false, pan: (t - C4) * 2 });
  // dos jugadores de 1943 se pasan el balón al fondo
  const q = ((t - C4) % 1.6) / 1.6, ida = Math.floor((t - C4) / 1.6) % 2 === 0;
  R.actor(EL.soldadoJugador, 196, 134, t, { dir: 1, dedo: ida && q < 0.2 }); R.actor(EL.soldadoJugador, 262, 134, t, { dir: -1, dedo: !ida && q < 0.2, pal: { C: hex('#3a3a4a') } });
  { const x = ida ? lerp(212, 262, q) : lerp(262, 212, q); T.balon(R, Math.round(x), Math.round(118 - Math.sin(q * Math.PI) * 14), t, { epoca: '1913', ang: ida ? -0.3 : 3.4, gira: 2 }); }
  // otros tres de 1943 estiran en fila
  for (const [x, k] of [[160, 0], [186, 1], [212, 2]]) R.actor(EL.soldadoJugador, x, 148, t, { dir: -1, brazos: Math.floor(t * 1.5 + k * 0.7) % 2 === 0, pal: k === 1 ? { C: hex('#3a3a4a') } : undefined });
  // el entrenador con su carpeta
  R.actor(EL.periodista, 44, 174, t, { dir: 1, habla: t < MANDA && Math.sin(t * 7) > 0.2, dedo: t > MANDA - 0.2 && t < MANDA + 0.8 });
  R.rect(58, 156, 64, 164, K); R.rect(59, 157, 63, 163, hex('#e8dcc0'));
  // el jugador sin casco y el recogepelotas que se lo trae
  const lo = t > Y1943 - 0.15;
  const pj = R.actor(EL.soldadoJugador, 120, 164, t, { dir: 1, tocado: lo ? undefined : '', sorpresa: t > MANDA - 0.3 && t < MANDA + 0.3, sonrisa: lo, dedo: lo && t < Y1943 + 1.2 });
  const r = tramo(t, C4 + 0.1, MANDA), xr = Math.round(lerp(330, 140, r)), entrega = tramo(t, MANDA + 0.4, Y1943 - 0.15);
  const pr = R.actor(EL.recogepelotas, xr, 166, t, { dir: -1, anda: r > 0 && r < 1, dedo: r >= 1 && entrega < 1, sonrisa: lo });
  if (entrega < 1) { const [hx, hy] = r >= 1 ? pr.mano : [xr - 2, 158]; cascoMano(CASCO_C, lerp(hx, pj.cabeza[0], entrega), lerp(hy, pj.cabeza[1] + 2, entrega), -1); }
};

// 5 · 2022: el vestuario, las fundas acolchadas
const p5 = (t) => {
  T.estadioPatada(R, t, { lugar: 'vegas', encuadre: 'vestuario' });
  const CAS = [[34, C5 + 1.4], [56, C5 + 2.5], [78, C5 + 3.5], [100, PADDED + 0.1]];
  for (const [x, tf] of CAS) cascoMano(t > tf ? CASCO_F : CASCO_N, x, 127);
  // el utilero recorre el banco y deja una funda en cada casco
  const P = [[C5, 6], [C5 + 1.1, 28], [C5 + 1.6, 28], [C5 + 2.2, 50], [C5 + 2.7, 50], [C5 + 3.2, 72], [C5 + 3.7, 72], [PADDED - 0.2, 94], [PADDED + 0.3, 94], [PADDED + 0.8, 122]];
  let xu = 122, mv = false; for (let i = 1; i < P.length; i++) if (t < P[i][0]) { const u = Math.max(0, (t - P[i - 1][0]) / (P[i][0] - P[i - 1][0])); xu = Math.round(lerp(P[i - 1][1], P[i][1], u)); mv = P[i][1] !== P[i - 1][1]; break; }
  const pone = !mv && t < PADDED + 0.3, da = t > PADDED + 0.8 && t < HELMET2;
  const pu = R.actor(EL.obrero, xu, 162, t, { dir: 1, anda: mv, dedo: pone || da, pal: { C: hex('#1e8a8a'), c: hex('#146464') }, sonrisa: t > HELMET2 });
  if (!da) for (let k = 0; k < (t < PADDED ? 3 : 1); k++) { const [hx, hy] = pone ? pu.mano : [xu + 16, 154]; R.dibujo(['.kkkkk.', 'kFfFfFk', 'kkkkkkk'], hx - 3, hy - 2 - k * 2, 1, PCAS); }
  // el liniero sale de las duchas, espera y se pone la funda
  const w = tramo(t, C5 + 0.4, C5 + 2.6), xl = Math.round(lerp(300, 146, w));
  const pl = R.actor(EL.liniero, xl, 162, t, { dir: -1, anda: w > 0 && w < 1, habla: w >= 1 && t < PADDED && Math.sin(t * 6) > 0.4, dedo: t > HELMET2 && t < HELMET2 + 1, sonrisa: t > HELMET2 });
  if (da) { const u = tramo(t, PADDED + 0.9, HELMET2 - 0.1); R.dibujo(['.kkkkk.', 'kFfFfFk', 'kkkkkkk'], Math.round(lerp(pu.mano[0], pl.cabeza[0], u)) - 3, Math.round(lerp(pu.mano[1], pl.cabeza[1] - 2, u)), 1, PCAS); }
  if (t >= HELMET2) fundaCab(pl.cabeza);
};

// 6 · la nave de impactos: el ensayo de la funda
const NAVE = () => {
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const r = x % 6, s = (1 - y / 140) * 0.35 + (hh(x >> 2, y >> 3, 31) - 0.5) * 0.1;
    R.pset(x, y, r === 0 ? hex('#262c36') : r === 1 ? hex('#4a5462') : s > um(x, y) + 0.1 ? hex('#2e3642') : hex('#3a4250')); }
  for (let x = 190; x < 272; x++) for (let y = 14; y < 31; y++) { const m = (x - 190) % 27 < 2 || y === 14 || y === 30 || y === 22; R.pset(x, y, m ? hex('#1a1e26') : um(x, y) < 0.3 + (y - 10) * 0.02 ? hex('#8ab0d0') : hex('#b8d4ea')); }
  for (let y = 30; y < 140; y++) for (let k = 0; k < 4; k++) { const x0 = 186 + k * 22 - (y - 30) * 0.9; for (let x = Math.round(x0); x < x0 + 14; x++) if (um(x, y) < 0.09) R.pset(x, y, hex('#6a7a8e')); }
  R.rect(0, 34, 319, 40, K); R.rect(0, 35, 319, 39, hex('#d8a02a')); R.rect(0, 35, 319, 35, hex('#f0c050')); for (let x = 4; x < 320; x += 12) R.pset(x, 37, hex('#8a6a1a'));
  for (const x of [8, 300]) { R.rect(x, 40, x + 10, 150, K); R.rect(x + 1, 40, x + 9, 150, hex('#5c6676')); R.rect(x + 1, 40, x + 2, 150, hex('#8c96a4')); R.rect(x + 8, 40, x + 9, 150, hex('#3c4452')); for (let y = 128; y < 150; y++) for (let i = x + 1; i < x + 10; i++) R.pset(i, y, Math.floor((i + y) / 3) % 2 ? hex('#f0c82a') : hex('#1a1a1a')); }
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x, y, 32); R.pset(x, y, q < 0.1 ? hex('#4a4852') : q > 0.93 ? hex('#6a6872') : hex('#5a5862')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 141, hex('#3a3842')); if ((x >> 3) % 2) { R.pset(x, 168, hex('#d8b84a')); R.pset(x, 169, hex('#b8983a')); } }
  for (let j = -3; j <= 3; j++) for (let i = -16; i <= 16; i++) if ((i / 16) ** 2 + (j / 3) ** 2 < 1 && um(i + 200, j + 160) < 0.5) R.pset(200 + i, 160 + j, hex('#46444e'));
  // zona rayada bajo la bancada, manchas de aceite, rejilla, palé con cajas y conos
  for (let y = 152; y < 166; y++) for (let x = 84; x < 236; x++) R.pset(x, y, y === 152 || y === 165 || x === 84 || x === 235 ? K : Math.floor((x + y) / 4) % 2 ? hex('#f0c82a') : hex('#2a2a2e'));
  for (const [cx, cy, rx] of [[40, 172, 10], [262, 160, 7], [150, 176, 12]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 < 1 && um(cx + i, cy + j) < 0.7) R.pset(cx + i, cy + j, hex('#3e3c46'));
  R.rect(290, 170, 312, 176, K); for (let x = 291; x < 312; x += 3) R.rect(x, 171, x, 175, hex('#6a6872'));
  R.rect(84, 168, 118, 172, K); R.rect(85, 169, 117, 171, hex('#a8743c')); for (const [x, w, h, col] of [[86, 12, 10, '#b88e58'], [100, 14, 14, '#c8a068'], [104, 8, 6, '#8a6638']]) { R.rect(x, 168 - h, x + w, 168, K); R.rect(x + 1, 169 - h, x + w - 1, 167, hex(col)); R.rect(x + 1, 169 - h, x + w - 1, 169 - h, hex('#d4aa70')); R.rect(x + Math.floor(w / 2), 169 - h, x + Math.floor(w / 2), 167, hex('#8a6638')); }
  for (const x of [244, 254]) { R.poligono([[x, 178], [x + 8, 178], [x + 5, 166], [x + 3, 166]], K); R.poligono([[x + 1, 177], [x + 7, 177], [x + 4.5, 167], [x + 3.5, 167]], hex('#e8783a')); R.rect(x + 2, 171, x + 6, 172, BL); }
  // la bancada con su raíl
  R.rect(52, 116, 262, 124, K); R.rect(53, 117, 261, 123, hex('#5c6676')); R.rect(53, 117, 261, 117, hex('#8c96a4')); for (const x of [58, 150, 250]) { R.rect(x, 124, x + 6, 152, K); R.rect(x + 1, 124, x + 5, 151, hex('#4a5462')); R.rect(x - 2, 150, x + 8, 153, K); }
  R.rect(56, 111, 258, 116, K); R.rect(57, 112, 257, 114, hex('#c4ccd8')); for (let x = 62; x < 258; x += 14) R.pset(x, 113, hex('#5c6676'));
  // el pedestal del pulsador, el monitor con su pie y el carro de herramientas
  R.rect(60, 136, 74, 158, K); R.rect(61, 137, 73, 158, hex('#d8a02a')); R.rect(61, 137, 73, 138, hex('#f0c050')); R.rect(58, 132, 76, 137, K); R.rect(59, 133, 75, 136, hex('#3a4250'));
  R.rect(244, 96, 247, 150, K); R.rect(236, 148, 256, 152, K); R.rect(222, 54, 270, 98, K); R.rect(223, 55, 269, 97, hex('#2a2e36')); R.rect(226, 58, 266, 94, hex('#0e1622'));
  R.rect(274, 118, 316, 122, K); R.rect(275, 119, 315, 121, hex('#c83a3a')); R.rect(274, 140, 316, 143, K); R.rect(275, 141, 315, 142, hex('#c83a3a')); for (const x of [276, 312]) { R.rect(x, 122, x + 2, 156, K); R.disco(x + 1, 157, 2, K); }
  for (let k = 0; k < 5; k++) { R.rect(278 + k * 7, 110, 280 + k * 7, 118, K); R.rect(279 + k * 7, 111, 279 + k * 7, 117, hex('#c8ccd4')); } R.rect(284, 132, 304, 140, K); R.rect(285, 133, 303, 139, hex('#3a3e4a')); R.rect(286, 134, 302, 138, hex('#3ac8e8'));
  // cables del maniquí al monitor y pictogramas de casco y de aviso
  R.linea(190, 112, 210, 104, K); R.linea(210, 104, 244, 100, K);
  R.rect(110, 52, 126, 68, K); R.rect(111, 53, 125, 67, hex('#f2c84a')); R.poligono([[118, 55], [124, 65], [112, 65]], K); R.rect(118, 58, 118, 61, hex('#f2c84a')); R.pset(118, 63, hex('#f2c84a'));
  R.rect(132, 52, 148, 68, K); R.rect(133, 53, 147, 67, hex('#3a6ac8')); R.disco(140, 61, 5, BL); R.rect(135, 61, 145, 64, hex('#3a6ac8')); R.rect(140, 61, 145, 63, BL);
};
const p6 = (t) => {
  fijo('nave', NAVE);
  // motas de polvo en los haces de luz y la baliza que gira
  for (let k = 0; k < 12; k++) { const x = 40 + (k * 23) % 230 + Math.sin(t * 0.7 + k) * 4, y = 50 + ((k * 37 + t * 4) % 80); R.pset(Math.round(x), Math.round(y), hex('#c8d8e8')); }
  { const an = t * 7; R.rect(14, 30, 22, 34, K); R.disco(18, 28, 4, hex('#c87a1a')); R.disco(18 + Math.cos(an) * 2, 28, 2, hex('#ffd060')); if (Math.cos(an) > 0.5) for (let i = 1; i < 12; i++) if (i % 2) R.pset(18 + i, 28 - Math.round(i * 0.3), hex('#ffd060')); }
  // el ariete y el maniquí con su casco y su funda
  const dis = LAB + 0.25, gol = dis + 0.22, ra = t < dis ? 0 : t < gol ? ((t - dis) / (gol - dis)) ** 2 : Math.max(0, 1 - (t - gol) / 1.2), rx = Math.round(lerp(70, 118, ra));
  R.rect(rx - 6, 100, rx + 2, 110, K); R.rect(rx - 5, 101, rx + 1, 109, hex('#8c96a4'));
  R.rect(rx, 96, rx + 40, 112, K); R.rect(rx + 1, 97, rx + 39, 111, hex('#c4ccd8')); R.rect(rx + 1, 97, rx + 39, 99, hex('#e8ecf0')); R.rect(rx + 1, 108, rx + 39, 111, hex('#8c96a4')); R.rect(rx + 40, 94, rx + 45, 114, K); R.rect(rx + 41, 95, rx + 44, 113, hex('#2a2430'));
  for (const wx of [rx + 8, rx + 32]) { R.disco(wx, 112, 2.5, K); R.disco(wx, 112, 1.2, hex('#6a6e7a')); }
  R.linea(rx - 6, 105, 40, 120, K); R.linea(40, 120, 30, 150, K);
  const ch = t > gol ? Math.sin((t - gol) * 14) * Math.exp(-(t - gol) * 2.5) : 0, hx = Math.round(182 + ch * 6), sq = t > gol && t < gol + 0.25 ? 1 : 0;
  R.rect(178, 116, 196, 118, K); R.rect(hx - 2, 100, hx + 2, 116, K); R.rect(hx - 1, 100, hx + 1, 116, hex('#c4ccd8'));
  for (let y = 76; y <= 101; y++) for (let x = hx - 14; x <= hx + 14; x++) { const u = (x - hx) / 12, v = (y - 92) / 11; const d = u * u + v * v; if (d > 1.08) continue;
    let col = d > 0.9 ? K : y > 96 && x < hx - 4 ? hex('#c8ccd4') : hex('#1e8a8a'); if (y < 87 - sq) { const f = Math.atan2(v, u) * 7; col = d > 0.9 ? K : Math.floor(f) % 2 ? FU[0] : FU[2]; } R.pset(x, y, col); }
  for (const v of [94, 98]) R.linea(hx - 14, v, hx - 6, v, hex('#c8ccd4'));
  if (t > GUARD && t < GUARD + 1.2) { const k = Math.floor(t * 8) % 2; R.pset(hx - 4, 78 - k, BL); R.pset(hx - 5, 78, hex('#fff6c0')); R.pset(hx - 3, 78, hex('#fff6c0')); R.pset(hx - 4, 77 + k * 2, hex('#fff6c0')); }
  if (t > gol && t < gol + 0.4) { const r = (t - gol) * 30; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(hx - 12 + Math.cos(an) * r), Math.round(92 + Math.sin(an) * r), hex('#fff6c0')); } }
  // el monitor: sin funda, 5 de 5; con funda, se queda en 4 de 5
  R.recorte([226, 58, 266, 94]);
  for (let k = 0; k < 5; k++) { rr(232, 86 - k * 6, 242, 90 - k * 6, hex('#e8504a')); }
  const n = Math.round(4 * tramo(t, gol + 0.05, gol + 0.7)); for (let k = 0; k < n; k++) rr(250, 86 - k * 6, 260, 90 - k * 6, hex('#3ac8b0'));
  if (t > SEV - 0.1 && Math.floor(t * 4) % 2) { R.linea(250, 62, 260, 62, hex('#f2c84a')); R.linea(250, 66, 260, 66, hex('#f2c84a')); R.linea(250, 62, 250, 66, hex('#f2c84a')); R.linea(260, 62, 260, 66, hex('#f2c84a')); }
  R.recorte(null);
  // el físico en el pulsador y la técnica con la tableta
  const pul = t > LAB - 0.1 && t < LAB + 0.5; R.disco(67, 130, 4, K); R.disco(67, 130, 3, pul ? hex('#ff7a6a') : hex('#c83a2a'));
  R.actor(EL.fisico, 40, 166, t, { dir: 1, dedo: pul, habla: t < LAB - 0.3 && Math.sin(t * 7) > 0, sonrisa: t > SEV });
  { const w = tramo(t, C6 + 0.3, C7 - 0.2), xo = Math.round(lerp(330, 236, w)); R.actor(EL.obrero, xo, 178, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: t > LAB + 0.47 && t < LAB + 1, pal: { C: hex('#e8783a') } });
    R.linea(xo - 2, 164, xo - 14, 176, K); R.rect(xo - 20, 168, xo - 8, 176, K); R.rect(xo - 19, 169, xo - 9, 175, hex('#b88e58')); R.disco(xo - 14, 177, 2, K); }
  const pt = R.actor(EL.tecnica, 214, 168, t, { dir: -1, sorpresa: t > gol && t < gol + 0.5, dedo: t > SEV && t < SEV + 0.9, sonrisa: t > SEV + 0.2 });
  if (!(t > SEV && t < SEV + 0.9)) { R.rect(pt.mano[0] - 2, 150, pt.mano[0] + 4, 158, K); R.rect(pt.mano[0] - 1, 151, pt.mano[0] + 3, 157, hex('#3ac8e8')); }
};

// 7 · 2026, el entrenamiento: los dos llevan funda
const p7 = (t) => {
  T.labCasco(R, t, { encuadre: 'entreno' });
  const sale = BOTH - 0.1, u = tramo(t, sale, COLL), reb = t > COLL ? Math.sin(Math.min(1, (t - COLL) / 0.5) * Math.PI) * 5 : 0;
  const xa = Math.round(lerp(92, 146, u * u) - reb), xb = Math.round(lerp(222, 162, u * u) + reb), ríe = t > COLL + 0.6;
  const pa = R.actor(EL.liniero, xa, 166, t, { dir: 1, anda: u > 0 && u < 1, enfado: u > 0 && u < 1, sorpresa: t > COLL && t < COLL + 0.6, sonrisa: ríe, habla: ríe && Math.sin(t * 9) > 0 });
  const pb = R.actor(EL.liniero, xb, 166, t, { dir: -1, pal: TEAL, anda: u > 0 && u < 1, enfado: u > 0 && u < 1, sorpresa: t > COLL && t < COLL + 0.6, sonrisa: ríe, dedo: ríe && t < COLL + 1.6 });
  fundaCab(pa.cabeza); fundaCab(pb.cabeza);
  if (t > COLL && t < COLL + 0.45) { const r = (t - COLL) * 18; for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; R.pset(Math.round(161 + Math.cos(an) * r), Math.round(140 + Math.sin(an) * r * 0.7), hex('#fff6c0')); } R.disco(161, 140, 2, BL); }
  // el entrenador que pita y anota
  R.actor(EL.tecnico, 232, 174, t, { dir: -1, tocado: 'gorra', pal: { C: hex('#e8783a'), c: hex('#1e8a8a') }, habla: (t > BOTH - 0.5 && t < BOTH) || (t > COLL + 0.1 && t < COLL + 0.5), sonrisa: t > COLL + 0.8, dedo: t > COLL + 1.2 });
};
const año = (t) => t < C3 ? 2026 : t < E1900 - 0.2 ? 1905 : t < PLASTIC - 0.3 ? 1925 : t < C5 ? 1943 : t < C7 ? 2022 : 2026;
T.rodar(E, R, [[0, p1], [C2, p2], [C3, p3], [C4, p4], [C5, p5], [C6, p6], [C7, p7]], { año, efectos: [[REL - 0.3, 'interruptor'], [IMP, 'chof'], [IMP + 0.08, 'boing'], [C2 + 0.2, 'bip'], [EXTRA, 'tic'], [FORCE, 'whoosh'], [PLASTIC - 0.05, 'brillo'], [MANDA - 0.1, 'silbato'], [Y1943 - 0.15, 'pop'], [PADDED + 0.1, 'pop'], [HELMET2, 'brillo'], [LAB - 0.1, 'interruptor'], [LAB + 0.47, 'golpecito'], [SEV, 'bip'], [BOTH - 0.4, 'silbato'], [COLL, 'palmada']] });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['fa-chips'] = ('Los chips', '''// FA-CHIPS (frases 32–33), 2026, cartela «2026». Cinco planos:
// 1. el cuarto de material: unas hombreras en corte sobre el banco, con un chip en cada hombro; la técnica pulsa su
//    tableta en «chips» y los chips se encienden y emiten;
// 2. la fábrica de Ada: el brazo de la máquina mete el chip en el balón abierto en «inside each ball» (el balón deja ver el
//    chip que parpadea) y la báscula de precisión marca «3» en «3 grams»; la operaria lo vigila y lo señala;
// 3. la pasarela bajo el techo: las antenas emiten; el técnico llega y señala el campo en «where everyone is»; «10» y el
//    reloj en «10 times a second» (los puntos del campo saltan diez veces por segundo);
// 4. la sala de datos: entra el entrenador; la analista señala las barras en «how fast» y el campo con el pase en «how far»;
// 5. el estadio de noche: el entrenador mira la tableta en «teams use it», señala en «train» y el quarterback lanza un pase
//    largo que el receptor atrapa en «smarter».''', COMUN + r'''
const d = (f) => en('chips', f), g = (f) => en('datos', f);
const H2 = d(0.2985), H3 = d(0.6373), H4 = g(0), H5 = g(0.622);
const CHIPS = d(0.1516), PADS = d(0.2022), INSIDE = d(0.3049), BALL = d(0.3743), CHIP2 = d(0.4518), GR3 = d(0.5308);
const ANT = d(0.6484), WHERE = d(0.8032), DIEZ = d(0.8886), FAST = g(0.1433), FAR = g(0.4108), TEAMS = g(0.6874), TRAIN = g(0.7832), SMART = g(0.9116);
const chip = (x, y, on, t, s = 1) => { R.rect(x - 3 * s, y - 2 * s, x + 3 * s, y + 2 * s, K); R.rect(x - 2 * s, y - 1 * s, x + 2 * s, y + 1 * s, hex('#2a8a4a')); for (let i = -2; i <= 2; i += 2) { R.pset(x + i * s, y - 2 * s - 1, hex('#e8c040')); R.pset(x + i * s, y + 2 * s + 1, hex('#e8c040')); }
  R.pset(x - s, y, hex('#1a1a1a')); R.pset(x, y, hex('#1a1a1a')); if (on && Math.floor(t * 6) % 2) R.pset(x + s, y - s, hex('#7af8f8')); };
const ondas = (x, y, t, t0, col = hex('#7ad8f8'), n = 3) => { if (t < t0) return; for (let k = 0; k < n; k++) { const r = ((t - t0) * 14 + k * 6) % 18 + 3; for (let a = -0.9; a <= 0.9; a += 0.12) { R.pset(Math.round(x + Math.cos(a - Math.PI / 2) * r), Math.round(y + Math.sin(a - Math.PI / 2) * r), col); } } };

// 1 · el cuarto de material: las hombreras en corte
const CUARTO = () => {
  // tablero perforado con herramientas, estantes con cascos y la percha de camisetas
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const hueco = x % 6 === 3 && y % 6 === 3, s = y / 124 * 0.25 + Math.abs(x - 160) / 160 * 0.2;
    R.pset(x, y, hueco ? hex('#7a5a3a') : s > um(x, y) + 0.1 ? hex('#c49a6a') : hex('#d4aa78')); }
  R.rect(0, 0, 319, 8, hex('#e8e4dc')); R.rect(0, 8, 319, 9, hex('#aea698')); for (const x of [40, 200]) { R.rect(x, 2, x + 56, 6, K); R.rect(x + 1, 3, x + 55, 5, hex('#fffaf0')); }
  for (const [x, y, w, h] of [[14, 30, 6, 22], [24, 26, 4, 26], [32, 34, 10, 4]]) { R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#c83a3a')); }
  for (let k = 0; k < 3; k++) { R.disco(54 + k * 12, 44, 5, K); R.disco(54 + k * 12, 44, 4, [hex('#f2eee2'), hex('#2a2430'), hex('#e8b830')][k]); R.disco(54 + k * 12, 44, 1.5, hex('#d4aa78')); }
  R.rect(12, 62, 96, 64, K); R.rect(13, 62, 95, 63, hex('#8a5a2a')); for (let k = 0; k < 4; k++) { const x = 20 + k * 19; for (let y = 50; y < 62; y++) for (let i = -7; i <= 7; i++) { const d = (i / 7) ** 2 + ((y - 61) / 11) ** 2; if (d <= 1) R.pset(x + i, y, d > 0.8 ? K : i > 3 && y > 56 ? hex('#c8ccd4') : k % 2 ? hex('#1e8a8a') : hex('#8a2a3a')); } R.pset(x - 3, 53, BL); }
  R.rect(12, 92, 96, 94, K); R.rect(13, 92, 95, 93, hex('#8a5a2a')); for (let k = 0; k < 6; k++) { R.rect(16 + k * 13, 76, 26 + k * 13, 91, K); R.rect(17 + k * 13, 77, 25 + k * 13, 90, [hex('#f2eee2'), hex('#e8783a'), hex('#3a6ac8')][k % 3]); R.rect(17 + k * 13, 82, 25 + k * 13, 83, hex('#c8c2b4')); }
  // percha con camisetas numeradas a la derecha (por debajo de la zona de Atom)
  R.rect(216, 52, 314, 54, K); R.rect(217, 52, 313, 53, hex('#c8ccd4'));
  for (let k = 0; k < 4; k++) { const x = 220 + k * 24; R.poligono([[x, 56], [x + 20, 56], [x + 23, 62], [x + 18, 64], [x + 18, 92], [x + 2, 92], [x + 2, 64], [x - 3, 62]], K); R.poligono([[x + 1, 57], [x + 19, 57], [x + 21, 62], [x + 17, 63], [x + 17, 91], [x + 3, 91], [x + 3, 63], [x - 1, 62]], k % 2 ? hex('#1e8a8a') : hex('#8a2a3a'));
    R.linea(x + 10, 52, x + 10, 56, K); R.numero(String([55, 72, 64, 77][k]), x + 10, 82, { centro: true, fina: true, rampa: [BL, BL, BL, BL] }); }
  R.disco(116, 34, 10, K); R.disco(116, 34, 9, hex('#f2eee2')); for (let k = 0; k < 12; k++) R.pset(Math.round(116 + Math.cos(k * 0.52) * 7), Math.round(34 + Math.sin(k * 0.52) * 7), K);
  // el banco
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 124 ? (y === 120 ? hex('#e0b880') : hex('#8a5a2a')) : ((y + Math.round(Math.sin(x * 0.05 + y) * 1.2)) % 7 === 0 || (hh(x >> 4, y, 41) < 0.04) ? hex('#a8743c') : (y - 124) % 7 === 1 ? hex('#cc9a5e') : hex('#c08a50')));
  // en el banco: bandeja de chips, pinzas, cinta, la báscula pequeña y el portátil
  R.rect(70, 150, 120, 166, K); R.rect(71, 151, 119, 165, hex('#3a3e4a')); for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { R.rect(74 + i * 8, 154 + j * 6, 79 + i * 8, 158 + j * 6, hex('#2a8a4a')); R.pset(76 + i * 8, 156 + j * 6, hex('#e8c040')); }
  R.linea(124, 172, 148, 164, hex('#c8ccd4')); R.linea(124, 173, 148, 166, hex('#8c96a4'));
  R.disco(270, 160, 8, K); R.disco(270, 160, 7, hex('#e8e8ec')); R.disco(270, 160, 3, hex('#c08a50'));
  // tijeras, rollos de cinta, una carpeta con pinza y un casco con funda en el banco
  R.linea(110, 168, 126, 160, hex('#8c96a4')); R.linea(110, 160, 126, 168, hex('#8c96a4')); R.disco(108, 158, 2.5, hex('#c83a3a')); R.disco(108, 170, 2.5, hex('#c83a3a'));
  for (const [x, col] of [[196, '#f2eee2'], [210, '#2a2430'], [224, '#e8b830']]) { R.disco(x, 152, 6, K); R.disco(x, 152, 5, hex(col)); R.disco(x, 152, 2, hex('#c08a50')); }
  R.poligono([[236, 140], [262, 136], [266, 160], [240, 164]], K); R.poligono([[237, 141], [261, 137], [265, 159], [241, 163]], hex('#f2eee2')); for (let k = 0; k < 4; k++) R.linea(242, 146 + k * 4, 260, 143 + k * 4, hex('#8a9ab8')); R.rect(246, 134, 254, 139, K); R.rect(247, 135, 253, 138, hex('#c8ccd4'));
  for (let y = 132; y < 160; y++) for (let x = 14; x < 64; x++) { const u = (x - 39) / 25, v = (y - 160) / 26; const dd = u * u + v * v; if (dd > 1) continue; R.pset(x, y, dd > 0.9 ? K : y < 146 ? (Math.floor(Math.atan2(v, u) * 7) % 2 ? FU[0] : FU[2]) : x < 24 && y > 150 ? hex('#c8ccd4') : hex('#8a2a3a')); }
  R.rect(240, 98, 300, 122, K); R.rect(241, 99, 299, 121, hex('#3a3e4a')); R.rect(244, 102, 296, 119, hex('#0e1622')); R.poligono([[234, 122], [306, 122], [312, 130], [228, 130]], K); R.poligono([[235, 123], [305, 123], [310, 129], [230, 129]], hex('#c8ccd4'));
};
const hombreras = (t) => { // en un maniquí: el peto, las dos hombreras (la derecha cortada: se ven las capas) y un chip en cada hombro
  R.rect(157, 116, 163, 140, K); R.rect(158, 116, 162, 140, hex('#5c6676')); R.rect(140, 137, 180, 142, K); R.rect(141, 138, 179, 141, hex('#3c4452')); R.rect(141, 138, 179, 138, hex('#6c7686'));
  // el maniquí (torso de espuma gris)
  for (let y = 78; y <= 118; y++) for (let x = 128; x <= 192; x++) { const u = (x - 160) / 32, v = (y - 98) / 22; if (u * u * (y < 98 ? 1 : 0.6) + v * v > 1.05 && y < 112) continue; if (Math.abs(u) > 0.95) continue;
    R.pset(x, y, Math.abs(u) > 0.88 || y === 118 ? K : u < -0.4 ? hex('#8a8e9a') : um(x, y) < 0.15 ? hex('#a8acb8') : hex('#9a9eaa')); }
  // el peto (delante del pecho), con la abertura del cuello y los cordones
  R.poligono([[132, 82], [188, 82], [186, 112], [134, 112]], K); R.poligono([[133, 83], [187, 83], [185, 111], [135, 111]], hex('#e8e8ec'));
  for (let j = -5; j <= 5; j++) for (let i = -13; i <= 13; i++) if ((i / 13) ** 2 + (j / 6) ** 2 <= 1) R.pset(160 + i, 82 + j, (i / 13) ** 2 + (j / 6) ** 2 > 0.75 ? K : hex('#9a9eaa'));
  R.linea(160, 88, 160, 111, hex('#c8ccd4')); for (const y of [96, 104]) { R.rect(140, y, 180, y + 2, K); R.rect(141, y + 1, 179, y + 1, hex('#2a2430')); R.rect(158, y - 1, 162, y + 3, hex('#c8ccd4')); } R.linea(134, 100, 186, 100, hex('#c8ccd4')); R.linea(135, 110, 185, 110, hex('#c8ccd4'));
  for (const s of [-1, 1]) { const cx = 160 + s * 40, cy = 90;
    for (let y = cy - 13; y <= cy + 10; y++) for (let x = cx - 30; x <= cx + 30; x++) { const u = (x - cx) / 30, v = (y - cy) / 13; const dd = u * u + v * v; if (dd > 1 || y > cy + 10) continue;
      const corte = s > 0 && x > cx + 2; let col;
      if (dd > 0.9 || y === cy + 10) col = K;
      else if (corte) col = dd > 0.74 ? hex('#f2f2f6') : dd > 0.6 ? hex('#1e8a8a') : dd > 0.36 ? hex('#e8c860') : (Math.floor(x / 2 + y / 2) % 2 ? hex('#d8b848') : hex('#e8c860'));
      else col = dd > 0.74 && v < 0 ? hex('#ffffff') : v > 0.5 ? hex('#c8ccd4') : u * s > 0.3 ? hex('#d8d8e0') : hex('#e8e8ec');
      R.pset(x, y, col); }
    if (s > 0) { R.linea(cx + 2, cy - 13, cx + 2, cy + 10, K); }
    R.linea(cx - 26, cy + 5, cx + 26, cy + 5, hex('#1e8a8a')); R.linea(cx - 24, cy + 7, cx + 24, cy + 7, hex('#1e8a8a')); R.disco(cx - s * 20, cy - 2, 1.5, hex('#8c96a4'));
    const on = t > CHIPS, chx = cx + s * 20, chy = cy - 2; chip(chx, chy, on, t, 1); if (on) ondas(chx, chy - 6, t, CHIPS); }
  if (t > PADS && t < PADS + 1 && Math.floor(t * 8) % 2) for (const s of [-1, 1]) { R.disco(160 + s * 60, 88, 1.5, hex('#fff6c0')); R.pset(160 + s * 60, 84, hex('#fff6c0')); R.pset(160 + s * 60, 92, hex('#fff6c0')); }
};
const p1 = (t) => {
  fijo('cuarto', CUARTO);
  // la técnica, detrás del banco, con su tableta; el portátil muestra los puntos
  const wt = tramo(t, 1.3, CHIPS - 0.5), xtc = Math.round(lerp(300, 212, wt));
  const pt = R.actor(EL.tecnica, xtc, 132, t, { dir: -1, anda: wt > 0 && wt < 1, dedo: t > CHIPS - 0.3 && t < CHIPS + 0.4, sonrisa: t > CHIPS + 0.4, habla: t > PADS && t < PADS + 1 && Math.sin(t * 8) > 0 });
  for (let y = 120; y < 140; y++) for (let x = 196; x < 320; x++) R.pset(x, y, y < 124 ? (y === 120 ? hex('#e0b880') : hex('#8a5a2a')) : ((y + Math.round(Math.sin(x * 0.05 + y) * 1.2)) % 7 === 0 || (hh(x >> 4, y, 41) < 0.04) ? hex('#a8743c') : (y - 124) % 7 === 1 ? hex('#cc9a5e') : hex('#c08a50')));
  R.rect(200, 112, 214, 121, K); R.rect(201, 113, 213, 120, hex('#2a2e36')); R.rect(202, 114, 212, 119, t > CHIPS ? hex('#3ac8e8') : hex('#1a3a4a'));
  hombreras(t);
  R.recorte([244, 102, 296, 119]); for (let k = 0; k < 10; k++) { const x = 248 + (k * 13 + Math.floor(t * 10) * (k % 3)) % 44, y = 104 + (k * 7) % 13; R.pset(x, y, k < 5 ? hex('#3ac8b0') : hex('#e8504a')); R.pset(x + 1, y, k < 5 ? hex('#3ac8b0') : hex('#e8504a')); } R.recorte(null);
  for (let k = 0; k < 3; k++) { const q = (t * 0.6 + k / 3) % 1; R.pset(Math.round(270 + Math.sin(q * 9 + k) * 2), Math.round(150 - q * 18), hex('#f2f6fa')); }
};

// 2 · la fábrica de Ada: el chip dentro del balón y la báscula de precisión
const p2 = (t) => {
  T.fabricaAda(R, t, { encuadre: 'cordones' });
  // la báscula de precisión con su chip
  R.rect(20, 104, 52, 114, K); R.rect(21, 105, 51, 113, hex('#e8e8ec')); R.rect(21, 112, 51, 113, hex('#a8acb8')); R.rect(24, 101, 40, 104, K); R.rect(25, 102, 39, 103, hex('#c8ccd4'));
  R.rect(42, 106, 50, 112, K); R.rect(43, 107, 49, 111, hex('#1a3a2a')); chip(32, 99, false, t);
  const n = t < GR3 - 0.4 ? 0 : t < GR3 ? Math.min(3, Math.floor((t - GR3 + 0.4) / 0.13)) : 3; R.numero(String(n), 46, 112, { centro: true, fina: true, rampa: [hex('#7af87a'), hex('#7af87a'), hex('#bafcba'), hex('#bafcba')] });
  if (t > GR3 && Math.floor(t * 4) % 2) R.rect(41, 105, 51, 105, hex('#7af87a'));
  // el brazo de la máquina que baja el chip al balón abierto
  const baja = tramo(t, BALL - 0.5, CHIP2 - 0.1), yc = Math.round(lerp(84, 102, baja));
  R.rect(92, 72, 95, 114, K); R.rect(93, 72, 94, 113, hex('#8c96a4')); R.rect(78, yc - 14, 95, yc - 11, K); R.rect(79, yc - 13, 94, yc - 12, hex('#c4ccd8')); R.rect(77, yc - 11, 80, yc - 4, K); R.rect(78, yc - 10, 79, yc - 5, hex('#c4ccd8'));
  R.rect(90, 70, 98, 74, K); R.rect(91, 71, 97, 73, hex('#e8783a'));
  if (t < CHIP2) chip(79, yc - 1, false, t);
  if (t > CHIP2) { for (let j = -5; j <= 5; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 5.5) ** 2 <= 1 && um(78 + i, 106 + j) < 0.35) R.pset(78 + i, 106 + j, hex('#f2c86a')); chip(79, 106, true, t); ondas(79, 100, t, CHIP2, hex('#f2c84a'), 2); }
  // la operaria pulsa el mando y luego señala la báscula
  const pulsa = t > INSIDE + 0.2 && t < BALL + 0.3, mira = t > GR3 - 0.1;
  const po = R.actor(EL.obrera, 132, 162, t, { dir: -1, dedo: pulsa || (mira && t < GR3 + 1), sonrisa: t > CHIP2, habla: mira && Math.sin(t * 8) > 0.3 });
  R.linea(97, 74, 112, 108, K); R.linea(112, 108, po.mano[0] + (pulsa ? 0 : -6), pulsa ? po.mano[1] : 146, K);
  if (pulsa) { R.rect(po.mano[0] - 2, po.mano[1] - 2, po.mano[0] + 2, po.mano[1] + 3, K); R.pset(po.mano[0], po.mano[1] - 1, hex('#e83a2a')); }
  else { R.rect(po.mano[0] - 8, 144, po.mano[0] - 4, 150, K); R.pset(po.mano[0] - 6, 145, hex('#c83a2a')); }
};

// 3 · la pasarela de las antenas
const p3 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'antenas' });
  const w = tramo(t, H3, H3 + 1.4), xt = Math.round(lerp(64, 118, w)), apunta = t > WHERE - 0.1 && t < WHERE + 1.3;
  const pt = R.actor(EL.tecnico, xt, 148, t, { dir: apunta ? 1 : 1, anda: w > 0 && w < 1, dedo: apunta, sonrisa: t > DIEZ });
  if (!apunta) { R.rect(xt + 12, 134, xt + 22, 141, K); R.rect(xt + 13, 135, xt + 21, 140, hex('#3a3e4a')); R.rect(xt + 14, 136, xt + 20, 139, hex('#3ac8e8')); }
  R.actor(EL.tecnica, 170, 149, t, { dir: -1, habla: t < WHERE && Math.sin(t * 7) > 0.2, sonrisa: t > DIEZ, dedo: t > DIEZ - 0.1 && t < DIEZ + 0.9 });
  // las antenas destellan diez veces por segundo; «10» y el reloj
  if (Math.floor(t * 10) % 2) for (const x of [58, 262]) { R.pset(x - 3, 78, hex('#7af8f8')); R.pset(x + 3, 78, hex('#7af8f8')); }
  const e = tramo(t, DIEZ - 0.1, DIEZ + 0.2); if (e > 0) { const y = Math.round(lerp(70, 62, e)); R.numero('10', 92, y, { centro: true }); R.icono('reloj', 104, y - 8, hex('#f2eee2')); }
};

// 4 · la sala de datos
const marco = (x0, y0, x1, y1, t) => { if (Math.floor(t * 5) % 2) return; const c = hex('#f2c84a'); R.linea(x0, y0, x1, y0, c); R.linea(x0, y1, x1, y1, c); R.linea(x0, y0, x0, y1, c); R.linea(x1, y0, x1, y1, c); };
const p4 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'sala' });
  if (t > FAST - 0.1 && t < FAR - 0.3) marco(150, 22, 207, 59, t);
  if (t > FAR - 0.1) marco(36, 22, 149, 97, t);
  const w = tramo(t, H4, H4 + 1.3), xe = Math.round(lerp(-18, 96, w));
  R.actor(EL.senor30, xe, 164, t, { dir: 1, anda: w > 0 && w < 1, tocado: 'gorra', pal: { C: hex('#1e8a8a'), c: hex('#146464') }, sorpresa: t > FAR && t < FAR + 0.6, sonrisa: t > FAR + 0.6, habla: t > FAR + 1.1 && Math.sin(t * 7) > 0 });
  R.actor(EL.tecnica, 176, 162, t, { dir: -1, dedo: (t > FAST - 0.1 && t < FAST + 1.2) || (t > FAR - 0.1 && t < FAR + 1), habla: t > FAST + 1.2 && t < FAR - 0.2 && Math.sin(t * 8) > 0 });
  R.actor(EL.tecnico, 226, 160, t, { dir: -1, sonrisa: t > FAR + 0.3 });
  // un analista sentado en la silla de la izquierda, que teclea; cables por el suelo
  R.actor(EL.tecnico, 56, 146, t, { dir: 1, habla: Math.sin(t * 5) > 0.5, pal: { C: hex('#3a4a6a') } });
  for (let x = 60; x < 260; x++) { R.pset(x, Math.round(172 + Math.sin(x * 0.07) * 2), hex('#1a1e2a')); if (x % 37 === 0) R.rect(x, 170, x + 3, 173, hex('#2a3040')); }
  T.h_estadioDelante(R, t, { encuadre: 'sala' });
};

// 5 · el estadio: entrenar y jugar mejor
const p5 = (t) => {
  T.estadioHoy(R, t, { encuadre: 'noche', moviles: 0.7, marcador: [24, 17] });
  const lanza = TRAIN + 0.6, coge = SMART + 0.5;
  // el receptor corre por la banda y el defensa le sigue
  const rc = tramo(t, H5 + 0.3, coge), xr = Math.round(lerp(150, 236, rc));
  R.actor(EL.liniero, Math.round(lerp(176, 222, tramo(t, H5 + 0.6, coge + 0.3))), 128, t, { dir: 1, anda: t < coge + 0.3 && t > H5 + 0.6 });
  const pr = R.actor(EL.receptor, xr, 132, t, { dir: 1, anda: rc > 0 && rc < 1, brazos: t > coge - 0.25 && t < coge + 0.6, sonrisa: t > coge });
  // el quarterback retrocede y lanza
  const at = tramo(t, H5 + 0.5, lanza - 0.3), xq = Math.round(lerp(104, 90, at));
  const pq = R.actor(EL.quarterback, xq, 142, t, { dir: 1, anda: at > 0 && at < 1, dedo: t > lanza - 0.3 && t < lanza + 0.3, sonrisa: t > coge });
  const v = tramo(t, lanza, coge);
  if (t < lanza) T.balon(R, xq + 13, 132, t, { epoca: 'hoy', ang: -0.5 });
  else if (v < 1) T.balon(R, Math.round(lerp(xq + 14, xr + 10, v)), Math.round(lerp(122, 106, v) - Math.sin(v * Math.PI) * 50), t, { epoca: 'hoy', ang: -0.5 + v * 0.9, gira: 10, estela: true });
  else T.balon(R, pr.mano[0] - 6, pr.mano[1] + 2, t, { epoca: 'hoy', ang: 0.3 });
  // el entrenador de la banda con su tableta
  const mira = t > TEAMS - 0.3 && t < TRAIN, señala = t > TRAIN && t < TRAIN + 1.4;
  const pe = R.actor(EL.senor30, 54, 172, t, { dir: 1, tocado: 'gorra', pal: { C: hex('#1e8a8a'), c: hex('#146464') }, dedo: señala, habla: señala && Math.sin(t * 9) > 0, sonrisa: t > coge });
  if (!señala) { const tx = 68, ty = 154; R.rect(tx, ty, tx + 10, ty + 7, K); R.rect(tx + 1, ty + 1, tx + 9, ty + 6, hex('#0e1a2e')); for (let k = 0; k < 4; k++) R.pset(tx + 2 + ((k * 3 + Math.floor(t * 10)) % 7), ty + 2 + (k % 3), k < 2 ? hex('#3ac8b0') : hex('#e8504a')); if (mira) R.rect(tx + 1, ty + 1, tx + 9, ty + 1, hex('#3ac8e8')); }
  T.h_estadioDelante(R, t, { encuadre: 'noche' });
};
T.rodar(E, R, [[0, p1], [H2, p2], [H3, p3], [H4, p4], [H5, p5]], { cartela: '2026', año: 2026, efectos: [[CHIPS, 'bip'], [INSIDE + 0.25, 'interruptor'], [CHIP2, 'bip'], [GR3, 'tic'], [ANT, 'zumbido'], [DIEZ, 'bip'], [FAST, 'tecleo'], [FAR, 'brillo'], [TEAMS, 'tecleo'], [TRAIN + 0.6, 'whoosh'], [SMART + 0.5, 'palmada']] });
''')
