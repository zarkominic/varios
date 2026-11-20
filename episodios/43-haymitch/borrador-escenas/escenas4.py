E = {}
E['hm-capitolio'] = ('El Capitolio', '''// HM-CAPITOLIO''', r'''
import { ELENCO_JH as JH } from '/atomo/plato/kits/pixel-chibi.js';
// ── tiempos: los cortes y las palabras de la voz inglesa ─────────────────────────────────────────────────────────────
const C2 = en('tributos', 0.2833), C3 = en('tributos', 0.6333), C4 = en('louella', 0), C5 = en('louella', 0.2667), C6 = en('louella', 0.5428), C7 = en('louella', 0.7666), C8 = en('doble', 0), C9 = en('doble', 0.2786), C10 = en('doble', 0.6188), C11 = en('mentores', 0), C12 = en('mentores', 0.2758), C13 = en('mentores', 0.4799), C14 = en('mentores', 0.6545), C15 = en('mentores', 0.8529);
const wMay = en('tributos', 0.1884), wGomi = en('tributos', 0.4115), wWyatt = en('tributos', 0.4795), wApuesta = en('tributos', 0.5756), w13 = en('tributos', 0.7038), wVecina = en('tributos', 0.8153), wVida = en('tributos', 0.9217);
const wArena = en('louella', 0.0663), wMuere = en('louella', 0.1224), wDesfile = en('louella', 0.1864), wHay = en('louella', 0.2347), wLleva = en('louella', 0.3759), wSnow = en('louella', 0.4554), wAplaude = en('louella', 0.4929), wTodos = en('louella', 0.5514), wClaro = en('louella', 0.5989), wNo = en('louella', 0.6683), wViva = en('louella', 0.7284), wFamilia = en('louella', 0.8103), wLenore = en('louella', 0.8360), wVivan = en('louella', 0.8813), wMuera = en('louella', 0.9273), wLio = en('louella', 0.9624);
const wSiniestro = en('doble', 0.0758), wLugar = en('doble', 0.2338), wOtra = en('doble', 0.3051), wDistrito = en('doble', 0.4124), wDrogada = en('doble', 0.4891), wLleva2 = en('doble', 0.5392), wNombre = en('doble', 0.5705), wCapitol = en('doble', 0.6347), wNada = en('doble', 0.7214), wHistoria = en('doble', 0.8906), wCambia = en('doble', 0.9555);
const wVencedor = en('mentores', 0.0999), wPresta = en('mentores', 0.1813), wOtros = en('mentores', 0.2251), wWiress = en('mentores', 0.2758), wMags = en('mentores', 0.3027), wJoven = en('mentores', 0.3547), wEffie = en('mentores', 0.4283), wRopa = en('mentores', 0.5436), wEmergencia = en('mentores', 0.5904), wEstilista = en('mentores', 0.6060), wBeetee = en('mentores', 0.6991), wPlan = en('mentores', 0.7689), wNunca = en('mentores', 0.8152), wAtaca = en('mentores', 0.9028), wArena2 = en('mentores', 0.9266), wDentro = en('mentores', 0.9613);
// ── ayudas ───────────────────────────────────────────────────────────────────────────────────────────────────────────
const X = { ...EL, ...JH };   // el reparto del 20 manda sobre los homónimos de otros episodios (vigilante, snow…)
const K = hex('#1a1424'), BL = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, u) => u * 16 > B4[((y & 3) << 2) | (x & 3)] + 0.5;
const mez = (c1, c2, u) => (0xff000000 | (Math.round(((c1 >> 16) & 255) * (1 - u) + ((c2 >> 16) & 255) * u) << 16) | (Math.round(((c1 >> 8) & 255) * (1 - u) + ((c2 >> 8) & 255) * u) << 8) | Math.round((c1 & 255) * (1 - u) + (c2 & 255) * u)) >>> 0;
const P = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
const BF = {};
const horno = (k, f) => { if (!BF[k]) { const bb = R.nuevo(), prev = R.usar(bb); f(); R.usar(prev); BF[k] = bb; } R.copiar(BF[k]); };
const ease = (u) => u * u * (3 - 2 * u);
const ent = (a, b, u) => Math.round(lerp(a, b, u));
// degradado vertical tramado entre varios colores
const grad = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) P(x, y, tr(x, y, f) ? cols[i + 1] : cols[i]); } };
// oscurece o aclara (tramado) un recuadro hacia col con fuerza a
const velo = (x0, y0, x1, y1, col, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (tr(x, y, a)) P(x, y, col); };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// una gominola (x, y centro) de color col, s 1 o 2
const GOMI = ['#e83a4a', '#f0c040', '#4ac06a', '#8a5ae0', '#f07a30', '#3ab0e0'].map(hex);
const gominola = (x, y, col, s = 1) => { const X0 = Math.round(x), Y0 = Math.round(y);
  if (s === 1) { R.rect(X0 - 1, Y0 - 1, X0 + 1, Y0 + 1, col); P(X0 - 1, Y0 - 1, BL); P(X0 + 1, Y0 + 1, mez(col, K, 0.45)); P(X0, Y0 + 2, mez(col, K, 0.7)); return; }
  R.disco(X0, Y0, 3, K); R.disco(X0, Y0, 2, col); P(X0 - 1, Y0 - 1, BL); P(X0 - 2, Y0, mez(col, BL, 0.4)); P(X0 + 1, Y0 + 1, mez(col, K, 0.4)); P(X0 + 2, Y0 + 1, mez(col, K, 0.4)); };
// la bolsita de papel de la tienda de los Donner (x centro, y base), con las gominolas que asoman
const bolsita = (x, y, s = 1, inclina = 0) => { const pp = hex('#d8b888'), ps = hex('#a88858'), pl = hex('#f0dcb0'), w = 3 * s, h = 7 * s, X0 = Math.round(x), Y0 = Math.round(y), d = Math.round(inclina * 3 * s);
  R.poligono([[X0 - w - 1, Y0 + 1], [X0 + w + 1, Y0 + 1], [X0 + w + 1 + d, Y0 - h - 1], [X0 - w - 1 + d, Y0 - h - 1]], K);
  R.poligono([[X0 - w, Y0], [X0 + w, Y0], [X0 + w + d, Y0 - h], [X0 - w + d, Y0 - h]], pp);
  for (let j = 0; j < h; j++) { P(X0 - w + Math.round(d * j / h), Y0 - j, pl); P(X0 + w + Math.round(d * j / h), Y0 - j, ps); }
  for (let i = -w; i <= w; i += 2) P(X0 + i + d, Y0 - h, ps);   // el borde dentado
  for (let i = 0; i < 3; i++) gominola(X0 - w + 2 + i * (w - 1) + d, Y0 - h - 1, GOMI[i]); };
// una moneda (x, y centro) de canto o de cara
const moneda = (x, y) => { const X0 = Math.round(x), Y0 = Math.round(y); R.rect(X0 - 3, Y0 - 1, X0 + 3, Y0 + 1, K); R.rect(X0 - 2, Y0 - 2, X0 + 2, Y0 + 2, K); R.rect(X0 - 2, Y0 - 1, X0 + 2, Y0 + 1, hex('#e8b830')); P(X0 - 1, Y0 - 1, hex('#fff0a0')); P(X0 + 1, Y0 + 1, hex('#a87a18')); };
// nubes de tres tonos (cx, cy, ancho) con discos: respetan el recorte
const nube = (cx, cy, w, cols) => { for (let i = 0; i < 4; i++) { const x = cx - w / 2 + (i + 0.5) * w / 4, r = w / 5 + (i === 1 || i === 2 ? w / 10 : 0); R.disco(Math.round(x), Math.round(cy - r * 0.3), Math.round(r), cols[0]); }
  for (let i = 0; i < 4; i++) { const x = cx - w / 2 + (i + 0.5) * w / 4, r = w / 5 + (i === 1 || i === 2 ? w / 10 : 0) - 1; R.disco(Math.round(x - 1), Math.round(cy - r * 0.3 - 1), Math.round(r), cols[1]); }
  R.disco(Math.round(cx - w / 8), Math.round(cy - w / 5), Math.round(w / 8), cols[2]); R.linea(Math.round(cx - w / 2), Math.round(cy + 1), Math.round(cx + w / 2), Math.round(cy + 1), cols[0]); };
const NUBEDIA = ['#c8d4ec', '#eef2fa', '#ffffff'].map(hex), NUBENOCHE = ['#2a2c4a', '#3a3c5e', '#4a4c70'].map(hex), NUBETARDE = ['#c88a8a', '#f0b0a0', '#ffe0c8'].map(hex);
// una torre de cristal de colores en (x0..x1) con tejado en top y pie en base; noche: ventanas encendidas que parpadean
const torre = (x0, x1, top, base, col, colS, noche, k, t = 0, vivo = false) => {
  if (!vivo) { R.rect(x0 - 1, top - 1, x1 + 1, base, K); R.rect(x0, top, x1, base, col); R.rect(x1 - Math.max(1, Math.round((x1 - x0) * 0.3)), top, x1, base, colS); R.rect(x0, top, x0, base, mez(col, BL, 0.35));
    for (let y = top + 3; y < base - 1; y += 4) R.rect(x0 + 1, y, x1 - 1, y, mez(col, K, noche ? 0.55 : 0.25)); }
  for (let y = top + 2; y < base - 2; y += 4) for (let x = x0 + 2; x < x1 - 1; x += 3) { const hsh = hh(x + k, y, 9), on = noche ? (hsh > 0.45 && (!vivo || Math.sin(t * 0.7 + hsh * 40) > -0.9)) : hsh > 0.82;
    if (vivo && !(noche && hsh > 0.45 && hsh < 0.5)) continue; if (on) P(x, y, noche ? (hsh > 0.8 ? hex('#ffe8a0') : hex('#f0c060')) : hex('#e8f8ff')); } };
// Atom: luciérnaga y de pie (canon del 43)
const luc = (x, y, t, o = {}) => T.AT.luciernaga(R, Math.round(x), Math.round(y), t, { brillo: 0.85, ...o });
const atom = (x, s, t, o = {}) => T.AT.atom(R, Math.round(x), Math.round(s), t, o);
const flota = (t, k = 0) => Math.round(Math.sin(t * 2.3 + k) * 2);

// ── 1 · EL TREN: los cuatro del 12 en el vagón de lujo; Maysilee ofrece sus gominolas ───────────────────────────────
const O1 = { encuadre: 'tren', luz: 'dia' };
const p1 = (t) => {
  T.interior(R, t, O1);
  const bote = Math.sin(t * 9) > 0.7 ? 1 : 0;   // el traqueteo
  const lev = tramo(t, wMay - 0.3, wMay + 0.3), ofrece = t > wMay + 0.2;
  R.actor(X.louellaHM, 48, 140 + bote, t, { dir: 1, sonrisa: t > wMay + 0.6, sorpresa: t > wMay && t < wMay + 0.6 });
  const mx = ent(80, 98, lev), my = ent(140, 156, lev);
  const m = R.actor(X.maysilee, mx, my + bote, t, { dir: 1, anda: lev > 0 && lev < 1, sonrisa: ofrece, sostiene: ofrece ? [mx + 24, my - 16] : false });
  if (ofrece) bolsita(m.mano[0] + 2, m.mano[1] + 3, 1, 0.3 * tramo(t, wMay + 0.8, wMay + 1.2));
  // Haymitch, de pie junto a la ventana: mira el paisaje y se vuelve hacia la bolsa; coge una gominola
  const coge = t > wMay + 0.9;
  const h = R.actor(X.haymitch, 136, 156 + bote, t, { dir: t > wMay ? -1 : 1, sonrisa: coge, sostiene: coge ? [128, 128] : false });
  if (coge) gominola(h.mano[0], h.mano[1] - 1, GOMI[0]);
  // Wyatt, detrás de la mesa, lanza su moneda de la suerte una y otra vez
  const w = R.actor(X.wyattHM, 284, 156 + bote, t, { dir: -1, sostiene: [276, 136], sonrisa: Math.sin(t * 1.3) > 0, sorpresa: t > wMay + 0.5 && t < wMay + 1.1 });
  const fase = (t % 1.7) / 0.7; const salta = fase < 1 ? Math.sin(fase * Math.PI) * 22 : 0;
  if (salta > 0) { const cy = w.mano[1] - 3 - salta, gira = Math.floor(t * 14) % 2; R.rect(w.mano[0] - 2, cy - (gira ? 0 : 1), w.mano[0] + 2, cy + (gira ? 0 : 1), K); R.rect(w.mano[0] - 1, cy, w.mano[0] + 1, cy, hex('#f0c040')); } else moneda(w.mano[0], w.mano[1] - 2);
  T.interiorDelante(R, t, O1);
  // Atom, luciérnaga en la tulipa del aplique; cuando sale la bolsa se acerca a mirarla
  const a = tramo(t, wMay + 0.4, wMay + 1.6);
  luc(lerp(120, 112, a), lerp(60, 98, a) + flota(t), t, { dir: 1, cara: a > 0 ? 'sonrisa' : 'normal' });
};
// ── 2 · INSERTO: la mesa del tren de cerca: las gominolas de la tienda de los Donner y las apuestas de Wyatt ───────────
const MANTEL = hex('#f4efe2'), MANTELS = hex('#d8cfba'), MANTELL = hex('#fffdf6');
const mesa2 = () => {
  // techo crema con moldura dorada (tranquilo bajo la barra del año)
  grad(0, 0, 319, 15, [hex('#efe4c8'), hex('#e2d4b0')]); R.rect(0, 16, 319, 17, hex('#b8902c')); R.rect(0, 18, 319, 18, K);
  // la pared de caoba con vetas y cuarterones
  for (let y = 19; y <= 66; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.09 + Math.sin(y * 0.21 + x * 0.01) * 2.2) * 0.5 + 0.5; P(x, y, v > 0.82 ? hex('#8a3a24') : v > 0.35 ? hex('#6e2c1c') : hex('#5a2216')); }
  for (const x0 of [0, 284]) { R.rect(x0 + 4, 24, x0 + 30, 62, K); R.rect(x0 + 5, 25, x0 + 29, 61, hex('#7a3424')); R.rect(x0 + 5, 25, x0 + 29, 25, hex('#a85a3a')); R.rect(x0 + 5, 61, x0 + 29, 61, hex('#4a1a10')); }
  // la ventana grande (el paisaje se pinta vivo) con marco de latón
  R.rect(56, 21, 264, 60, K); R.rect(57, 22, 263, 59, hex('#b8902c')); R.rect(59, 24, 261, 57, K);
  // cortinas de terciopelo ciruela recogidas
  for (const [x0, x1] of [[40, 66], [254, 280]]) for (let x = x0; x <= x1; x++) for (let y = 19; y <= 66; y++) { const pl = Math.sin((x - x0) * 0.9) > 0.3; P(x, y, x === x0 || x === x1 ? K : pl ? hex('#9a3a8a') : hex('#6a2066')); }
  for (const x of [53, 267]) { R.rect(x - 4, 46, x + 4, 50, K); R.rect(x - 3, 47, x + 3, 49, hex('#e8b830')); }
  // el aplique de tulipa a la izquierda
  R.rect(20, 30, 22, 44, K); R.disco(21, 30, 5, K); R.disco(21, 30, 4, hex('#f4d8a0')); P(19, 28, BL);
  // los cuarterones de la pared: moldura, luz arriba y un clavo dorado
  for (const x0 of [0, 284]) { R.rect(x0 + 12, 29, x0 + 22, 35, K); R.rect(x0 + 13, 30, x0 + 21, 34, hex('#e8b830')); P(x0 + 14, 31, hex('#fff0a0')); }
  // el canto de la mesa: puntilla del mantel
  R.rect(0, 67, 319, 69, K);
  // el mantel en perspectiva con su damasco de rombos tramado y la raya de la plancha
  for (let y = 70; y < 180; y++) { const u = (y - 70) / 110, sc = 0.55 + u * 0.9; for (let x = 0; x < 320; x++) { const px = (x - 160) / sc, py = (y - 70) / sc * 1.6, rx = ((px + py) % 18 + 18) % 18, ry = ((px - py) % 18 + 18) % 18;
    const rombo = rx < 1.2 || ry < 1.2, flor = Math.abs(rx - 9) + Math.abs(ry - 9) < 3;
    P(x, y, Math.abs(((px / 60) % 1 + 1) % 1 - 0.5) < 0.012 / sc ? MANTELS : rombo && tr(x, y, 0.55) ? mez(MANTEL, MANTELS, 0.55) : flor && tr(x, y, 0.4) ? mez(MANTEL, MANTELS, 0.35) : (y < 75 ? MANTELL : MANTEL)); } }
  for (let x = 0; x < 320; x += 4) { R.disco(x + 2, 70, 2, MANTELL); P(x + 2, 72, MANTELS); }
  // el frutero de plata con uvas, manzana, naranja y plátano (izquierda, al fondo)
  R.poligono([[18, 98], [74, 98], [66, 110], [26, 110]], K); R.poligono([[20, 99], [72, 99], [65, 109], [27, 109]], hex('#c8ccd8')); R.linea(22, 100, 70, 100, hex('#eef0f8')); R.rect(40, 110, 52, 115, K); R.rect(41, 110, 51, 114, hex('#a8acb8')); R.rect(34, 115, 58, 118, K); R.rect(35, 115, 57, 117, hex('#c8ccd8'));
  R.disco(32, 92, 7, K); R.disco(32, 92, 6, hex('#d83a3a')); P(30, 89, hex('#ffb0a0')); R.rect(32, 84, 32, 86, hex('#5a3a20')); R.disco(48, 90, 7, K); R.disco(48, 90, 6, hex('#f08a20')); P(46, 87, hex('#ffd090'));
  for (const [x, y] of [[58, 94], [62, 91], [60, 97], [65, 95], [56, 90], [63, 86]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#6a3a8a')); P(x - 1, y - 1, hex('#b08ad8')); }
  R.poligono([[36, 96], [62, 100], [64, 98], [38, 94]], K); R.linea(37, 95, 62, 99, hex('#f0d040'));
  // la tetera de plata con su asa y el azucarero
  R.disco(102, 92, 11, K); R.disco(102, 92, 10, hex('#b8bcc8')); R.disco(99, 88, 5, hex('#dfe2ec')); P(97, 86, BL); R.rect(92, 101, 112, 104, K); R.rect(93, 101, 111, 103, hex('#9a9eaa'));
  R.disco(102, 81, 3, K); R.disco(102, 81, 2, hex('#dfe2ec')); R.linea(112, 90, 120, 84, K); R.linea(112, 91, 120, 85, hex('#9a9eaa')); R.linea(120, 84, 122, 82, K);
  for (let a = -1.4; a < 1.4; a += 0.1) P(Math.round(90 - Math.cos(a) * 5), Math.round(92 + Math.sin(a) * 6), K);
  R.rect(126, 90, 140, 102, K); R.rect(127, 91, 139, 101, hex('#f4f2ea')); R.rect(127, 95, 139, 96, hex('#4a6ad8')); R.rect(129, 87, 137, 90, K); R.rect(130, 88, 136, 89, hex('#f4f2ea')); P(133, 86, K);
  // el jarroncito con flores rosas
  R.rect(176, 86, 186, 104, K); R.rect(177, 87, 185, 103, hex('#a8d8e8')); R.rect(178, 88, 179, 102, hex('#e0f4fa'));
  for (const [x, y, c] of [[172, 78, '#f070a8'], [181, 74, '#f0a0c8'], [190, 78, '#f070a8'], [176, 70, '#ffd0e0'], [187, 70, '#f070a8']]) { R.linea(181, 86, x, y + 2, hex('#3a8a3a')); R.disco(x, y, 3, K); R.disco(x, y, 2, hex(c)); P(x, y, hex('#fff0a0')); }
  // el plato de porcelana con filete dorado (centro), donde caen las gominolas
  const pcx = 132, pcy = 140; for (let y = -18; y <= 18; y++) for (let x = -56; x <= 56; x++) { const d = (x / 56) ** 2 + (y / 18) ** 2; if (d < 1) P(pcx + x, pcy + y, d > 0.92 ? K : d > 0.8 ? hex('#d8b040') : d > 0.7 ? BL : d < 0.35 && tr(x, y, 0.25) ? hex('#e4eaf2') : hex('#f6f8fc')); }
  for (let x = -40; x <= 40; x += 8) P(pcx + x, pcy - 14 + Math.round(Math.abs(x) / 14), hex('#4a6ad8'));
  // los cubiertos de plata: el tenedor a la izquierda y el cuchillo a la derecha
  R.rect(66, 128, 68, 160, K); R.rect(67, 129, 67, 159, hex('#dfe2ec')); for (const dx of [-2, 0, 2]) R.rect(67 + dx, 122, 67 + dx, 129, K); R.rect(65, 128, 69, 130, K);
  R.rect(198, 126, 201, 160, K); R.rect(199, 127, 200, 140, hex('#eef0f8')); R.rect(199, 141, 200, 159, hex('#b8bcc8'));
  // el pastelero y la vela, a la derecha, al fondo
  R.rect(212, 82, 214, 98, K); R.rect(198, 96, 228, 99, K); R.rect(199, 97, 227, 98, hex('#c8ccd8')); R.rect(203, 84, 223, 86, K); R.rect(204, 84, 222, 85, hex('#c8ccd8'));
  for (const [x, y, c] of [[202, 93, '#f0a0c8'], [209, 93, '#a8e0a0'], [216, 93, '#f0d080'], [223, 93, '#c8a0f0'], [207, 81, '#f0a0c8'], [217, 81, '#a8d8f0']]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex(c)); P(x - 1, y - 1, BL); }
  R.rect(238, 80, 242, 100, K); R.rect(239, 81, 241, 99, hex('#f6efe0')); R.rect(234, 100, 246, 103, K); R.rect(235, 100, 245, 102, hex('#d8b040'));
  // la libretita de las apuestas de Wyatt, abierta (abajo a la derecha) con palotes y cifras
  R.poligono([[232, 154], [302, 150], [308, 179], [236, 179]], K); R.poligono([[234, 155], [300, 151], [306, 179], [237, 179]], hex('#fbf6e6'));
  R.linea(269, 153, 272, 179, hex('#b8ae96'));
  for (let i = 0; i < 4; i++) { R.linea(240 + i * 4, 160, 241 + i * 4, 168, hex('#3a3a6a')); R.linea(277 + i * 4, 158, 278 + i * 4, 166, hex('#3a3a6a')); }
  R.linea(238, 166, 256, 161, hex('#3a3a6a'));
  for (let y = 172; y < 179; y += 3) { R.linea(240, y, 266, y - 1, hex('#c8c0d8')); R.linea(275, y - 1, 302, y - 2, hex('#c8c0d8')); }
  // la servilleta doblada con su servilletero de plata (abajo a la izquierda) y migas
  R.poligono([[4, 150], [48, 146], [56, 176], [8, 179]], K); R.poligono([[6, 151], [46, 147], [54, 175], [10, 178]], hex('#e8d0e0')); R.linea(8, 160, 50, 157, hex('#c8a8c0')); R.rect(24, 150, 32, 176, K); R.rect(25, 151, 31, 175, hex('#c8ccd8')); R.rect(26, 151, 26, 175, hex('#eef0f8'));
  for (const [x, y] of [[96, 166], [120, 170], [204, 150], [220, 172], [88, 118], [160, 112], [182, 166]]) { P(x, y, hex('#c8a060')); P(x + 1, y, hex('#a87a40')); }
  gominola(214, 170, GOMI[3]);   // una que se escapó
};
const p2 = (t) => {
  horno('mesa2', mesa2);
  // el paisaje que corre por la ventana: cielo, sierra, pinos y los postes del telégrafo
  R.recorte([60, 25, 260, 56]);
  grad(60, 25, 260, 44, [hex('#7ab0e8'), hex('#a8d0f0'), hex('#d8ecf8')]);
  for (const [k, v, y, w] of [[0, 4, 30, 34], [1, 9, 36, 26], [2, 15, 28, 40]]) { const x = ((k * 97 - t * v) % 260 + 260) % 260 + 40; nube(x, y, w, NUBEDIA); }
  for (let x = 60; x <= 260; x++) { const y = 42 + Math.round(Math.sin((x + t * 6) * 0.05) * 3 + Math.sin((x + t * 6) * 0.13) * 1.5); R.linea(x, y, x, 56, hex('#8a9ac0')); P(x, y, hex('#e8eef8')); }
  for (let x = 60; x <= 260; x++) { const xx = x + t * 40, y = 47 + Math.round(Math.abs(Math.sin(xx * 0.31)) * -5 + Math.sin(xx * 0.07) * 2); R.linea(x, y, x, 56, hh(Math.floor(xx / 6), 1) > 0.5 ? hex('#2e6a3a') : hex('#3a7a44')); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 90 - t * 160) % 270 + 270) % 270) + 40; R.rect(x, 25, x + 2, 56, hex('#4a3a2a')); R.rect(x - 4, 30, x + 6, 31, hex('#4a3a2a')); }
  R.linea(60, 33, 260, 34, hex('#3a3a3a'));
  R.recorte(null);
  for (let i = 0; i < 2; i++) { const x = 90 + i * 120 + Math.round(t * 3) % 30; R.linea(x, 25, x + 14, 56, mez(hex('#d8ecf8'), BL, 0.6)); }
  // la vela que tiembla y las copas con licor ámbar que tiembla con el traqueteo
  const fl = Math.floor(t * 9) % 3; R.rect(239, 79 - fl, 241, 83, hex('#f0a020')); P(240, 78 - fl, hex('#fff0a0')); P(240, 82, hex('#fff6d0'));
  for (const x of [262, 284]) { const ola = Math.round(Math.sin(t * 11 + x) * 1); R.poligono([[x - 7, 84], [x + 7, 84], [x + 4, 98], [x - 4, 98]], K); R.poligono([[x - 6, 85], [x + 6, 85], [x + 3, 97], [x - 3, 97]], hex('#dfeef6')); R.poligono([[x - 5, 89 + ola], [x + 5, 89 - ola], [x + 3, 96], [x - 3, 96]], hex('#e0a040')); R.rect(x, 98, x, 108, K); R.rect(x - 5, 108, x + 5, 110, K); R.rect(x - 4, 109, x + 4, 109, hex('#dfeef6')); P(x - 4, 87, BL); }
  // Maysilee asoma la mano por la izquierda y vuelca la bolsita: las gominolas caen al plato (en «gumdrops»)
  const va = tramo(t, C2 + 0.3, wGomi - 0.7), vuelca = tramo(t, wGomi - 0.5, wGomi - 0.1), vuelve = tramo(t, wApuesta, wApuesta + 0.9);
  const hx = ent(ent(-30, 40, va), -40, vuelve), hy = ent(ent(132, 116, va), 132, vuelve);
  const caen = [[-30, -4], [-14, 3], [-2, -6], [10, 2], [22, -3], [-24, 7], [2, 8], [30, 4], [16, -9]];
  caen.forEach(([dx, dy], i) => { const u = tramo(t, wGomi - 0.15 + i * 0.08, wGomi + 0.35 + i * 0.08); if (u > 0) { const x0 = hx + 18, y0 = hy - 8, x1 = 132 + dx, y1 = 138 + dy; gominola(lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * 16, GOMI[i % 6], 2); } });
  if (vuelve < 1) { T.brazo(R, -14, 128, hx, hy, '#e8c840', 1); bolsita(hx + 18, hy + 4, 2, vuelca); }
  // Wyatt asoma la mano por la derecha: pone sus monedas en tres torres y lanza una hacia el plato (en «bets»)
  const llega = tramo(t, wWyatt - 0.5, wWyatt - 0.1), sale = tramo(t, C3 - 0.9, C3 - 0.2), emp = tramo(t, wApuesta - 0.25, wApuesta + 0.35);
  const torres = [[248, 148, 5], [258, 151, 3], [268, 147, 4]];
  torres.forEach(([x, y, n], i) => { const u = tramo(t, wWyatt + i * 0.25, wWyatt + 0.2 + i * 0.25); for (let k = 0; k < Math.round(n * u); k++) moneda(x, y - k * 2); });
  if (emp > 0) moneda(ent(256, 186, emp), ent(144, 140, emp) - Math.round(Math.sin(emp * Math.PI) * 6));
  const wx = ent(ent(344, 290, llega), 344, sale) - Math.round(Math.sin(emp * Math.PI) * 8);
  T.brazo(R, 336, 168, wx, 150, '#d8ccb0', -1);
  if (t > wApuesta && t < C3) { const u = tramo(t, wApuesta, wApuesta + 0.3); R.numero('3:1', 258, ent(136, 126, u), { tam: 8, centro: true }); }
  // Atom, luciérnaga, se asoma al plato de gominolas
  const a = tramo(t, wGomi, wGomi + 0.8);
  luc(lerp(160, 150, a), lerp(84, 112, a) + flota(t), t, { dir: -1, cara: a > 0.5 ? 'sonrisa' : 'normal' });
};
// ── 3 · LA VENTANA DEL TREN, de tarde: Louella (13), la vecina; el recuerdo de las dos casas de la Veta ───────────────
const O3 = { encuadre: 'tren', camara: 'ventana', luz: 'tarde' };
const recuerdo = (t, u) => {   // dentro del cristal, un óvalo sepia: dos casitas de la Veta, una valla y dos niños
  if (u <= 0) return; const cx = 140, cy = 72, rx = 46, ry = 28, S0 = hex('#e8d4a8'), S1 = hex('#b89a6a'), S2 = hex('#7a5e3a'), S3 = hex('#4a3620');
  R.recorte([50, 26, 230, 132]);
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const d = (x / rx) ** 2 + (y / ry) ** 2; if (d > 1 || !tr(cx + x, cy + y, Math.min(1, u * 1.6 * (1 - d * 0.5)))) continue;
    const X0 = cx + x, Y0 = cy + y; let c = Y0 > 84 ? (hh(X0 >> 1, Y0 >> 1, 3) > 0.7 ? S1 : S0) : S0;
    for (const hx0 of [110, 150]) { if (X0 >= hx0 && X0 <= hx0 + 24 && Y0 >= 66 && Y0 <= 86) c = (X0 - hx0) % 4 === 0 ? S2 : S1; if (Y0 >= 58 && Y0 < 66 && Math.abs(X0 - hx0 - 12) <= (Y0 - 58) * 1.6) c = S3; if (X0 >= hx0 + 9 && X0 <= hx0 + 14 && Y0 >= 76 && Y0 <= 86) c = S3; }
    if (Y0 === 82 && X0 > 136 && X0 < 150) c = S2; if (Y0 > 78 && Y0 < 86 && (X0 === 138 || X0 === 142 || X0 === 146)) c = S2;
    if (d > 0.86) c = S2; P(X0, Y0, c); }
  if (u > 0.6) { for (const [x, s] of [[118, 0], [168, 1]]) { const y = 56 - ((t * 6 + s * 5) % 10); P(x + 6 + Math.round(Math.sin(t * 2 + s) * 1), y, S1); P(x + 7, y - 3, S1); } // humo
    const salta = Math.abs(Math.sin(t * 5)) * 2; R.rect(134, 79 - salta, 135, 86 - salta, S3); P(134, 77 - salta, S3); R.rect(146, 80, 147, 86, S3); P(147, 78, S3); }   // dos niños que juegan
  R.recorte(null);
};
const p3 = (t) => {
  T.interior(R, t, O3);
  recuerdo(t, tramo(t, wVecina - 0.3, wVecina + 0.5) * (1 - tramo(t, C4 - 1.1, C4 - 0.4)));
  const bote = Math.sin(t * 9) > 0.75 ? 1 : 0;
  const da = t > wVida - 0.7;
  const lou = R.actor(X.louellaHM, 128, 152 + bote, t, { dir: da ? -1 : 1, sonrisa: t > wVida - 0.2, dedo: t > wVecina - 0.2 && t < wVecina + 1.2 });
  const u = tramo(t, C3 + 0.1, C3 + 1.8);
  const h = R.actor(X.haymitch, ent(-18, 96, u), 152 + bote, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t > wVida, sostiene: da ? [120, 132] : false });
  if (da && t < wVida + 0.5) gominola(h.mano[0], h.mano[1] - 1, GOMI[1]); else if (t >= wVida + 0.5) { gominola(lou.cabeza[0] - 4, lou.cabeza[1] + 12, GOMI[1]); }
  // el «13» de Louella aparece sobre ella en «13-year-old»
  const e = tramo(t, w13 - 0.1, w13 + 0.25) * (1 - tramo(t, w13 + 1.8, w13 + 2.2)); if (e > 0) R.numero('13', 136, ent(120, 108, e), { tam: 8, centro: true });
  T.interiorDelante(R, t, O3);
  luc(206 + flota(t, 1), 54 + flota(t), t, { dir: -1, cara: t > wVecina ? 'sonrisa' : 'normal' });
};
// ── 4 · LA AVENIDA: el desfile de los carros, de lejos; el carro del 12 se para con un sitio vacío ────────────────────
const carro = (x, y, col, colS, jinetes, t, k) => {   // dos caballos y el carro (x: el morro de los caballos, va a la izquierda)
  const X0 = Math.round(x), Y0 = Math.round(y), pata = Math.floor(t * 8 + k) % 2;
  for (const [dx, cab] of [[0, hex('#f0ece4')], [4, hex('#d8d0c4')]]) { const hx = X0 + dx; R.rect(hx, Y0 - 9, hx + 11, Y0 - 4, K); R.rect(hx + 1, Y0 - 8, hx + 10, Y0 - 5, cab); R.rect(hx - 3, Y0 - 13, hx + 1, Y0 - 8, K); R.rect(hx - 2, Y0 - 12, hx, Y0 - 9, cab); P(hx - 2, Y0 - 14, col);   // el penacho del color del distrito
    for (const [px, f] of [[hx + 1, pata], [hx + 4, 1 - pata], [hx + 8, pata], [hx + 10, 1 - pata]]) R.rect(px, Y0 - 4, px, Y0 - f, K); }
  R.linea(X0 + 12, Y0 - 6, X0 + 18, Y0 - 6, hex('#c8a030'));
  R.rect(X0 + 17, Y0 - 12, X0 + 37, Y0 - 1, K); R.rect(X0 + 18, Y0 - 11, X0 + 36, Y0 - 2, col); R.rect(X0 + 18, Y0 - 4, X0 + 36, Y0 - 2, colS); R.rect(X0 + 18, Y0 - 11, X0 + 36, Y0 - 11, mez(col, BL, 0.5));
  R.disco(X0 + 27, Y0, 4, K); R.disco(X0 + 27, Y0, 3, hex('#c8a030')); P(X0 + 27, Y0, K);
  jinetes.forEach((j, i) => { if (!j) return; const jx = X0 + 20 + i * 4, ojo = Math.sin(t * 6 + i + k) > 0 ? 1 : 0; R.rect(jx - 1, Y0 - 21 - ojo, jx + 2, Y0 - 12, K); R.rect(jx, Y0 - 20 - ojo, jx + 1, Y0 - 17 - ojo, hex('#e8c8a0')); R.rect(jx, Y0 - 16, jx + 1, Y0 - 12, j); P(jx, Y0 - 21 - ojo, hex('#3a2a20')); });
};
const DIST = [['#e8b830', '#a87a18'], ['#8a8a96', '#5a5a64'], ['#3ab0e0', '#1a7aa8'], ['#3ac8c0', '#1a8a84'], ['#f0e040', '#b8a820'], ['#c8c8d0', '#8a8a96'], ['#4a9a3a', '#2a6a24'], ['#e85aa8', '#a83a78'], ['#e8c860', '#b89030'], ['#a87a4a', '#7a5430'], ['#e85a3a', '#a83a20']].map(([a, b]) => [hex(a), hex(b)]);
const p4 = (t) => {
  T.capitolio(R, t, { encuadre: 'avenida' });
  const para = tramo(t, wMuere - 0.8, wMuere + 0.3);   // el desfile se para cuando la voz dice «dies»
  // los carros de los distritos van de derecha a izquierda; el del 12, negro de carbón, el último: el desfile entero se
  // frena y se para con él en el centro cuando la voz dice «dies»
  const x12 = 150 + (wMuere - C4) * 34 * (1 - tramo(t, C4, wMuere)) ** 0.85;
  for (let i = 0; i < 6; i++) { const x = x12 - 48 * (i + 1); if (x > -50 && x < 330) carro(x, 156, DIST[(10 - i) % 11][0], DIST[(10 - i) % 11][1], [hex('#f0f0f0'), DIST[(10 - i) % 11][0], 0, hex('#f0f0f0')].slice(0, 3 + (i % 2)), t, i); }
  const baja = tramo(t, wHay - 0.1, wHay + 0.5);
  carro(x12, 156, hex('#2a2a30'), hex('#4a4a52'), [hex('#f0c040'), hex('#8a6a40'), 0, baja > 0 ? 0 : hex('#4a5a7a')], t, 9);
  // el sitio vacío del carro: una cinta negra en la barandilla y una rosa blanca que cae
  if (t > wMuere) { const cx = Math.round(x12) + 29; R.rect(cx - 1, 140, cx + 1, 146, K); P(cx - 2, 147, K); P(cx + 2, 147, K); const r = tramo(t, wMuere, wMuere + 1.2); R.disco(cx, ent(118, 140, r), 2, BL); P(cx + 1, ent(118, 140, r) + 2, hex('#4a8a3a')); }
  // Haymitch baja del carro y echa a andar, solo, hacia la tribuna (a la derecha)
  const anda = tramo(t, wHay + 0.4, C5 + 0.4);
  if (baja > 0) R.actor(X.haymitch, ent(Math.round(x12) + 30, 330, anda), ent(150, 168, baja), t, { dir: 1, anda: anda > 0 && anda < 1, enfado: true });
  // el confeti cae mientras dura la fiesta; luego se queda en el suelo
  for (let i = 0; i < 40; i++) { const x = (hh(i, 1) * 320 + Math.sin(t * 2 + i) * 6) | 0, y0 = (hh(i, 2) * 200 + Math.min(t, wMuere) * (20 + hh(i, 3) * 20)) % 200 - 20, y = t < wMuere ? y0 : Math.min(176, y0 + (t - wMuere) * 60); if (y > 20 && y < 180) P(x, y, [hex('#e85aa8'), hex('#3ad0c8'), hex('#f0d040'), hex('#8a4ad8')][i % 4]); }
  // la primera fila de público, de espaldas, por delante: agitan banderitas hasta que el desfile se para
  for (let x = 2; x < 320; x += 9) { if (x > 70 && x < 250) continue; const sube = para < 1 && Math.sin(t * 7 + x) > 0 ? 2 : 0, pel = [hex('#e85aa8'), hex('#3ad0c8'), hex('#8a4ad8'), hex('#f0c040')][(x / 9 | 0) % 4];
    R.rect(x, 168, x + 7, 179, K); R.rect(x + 1, 169, x + 6, 179, mez(pel, K, 0.35)); R.disco(x + 3, 166, 4, K); R.disco(x + 3, 166, 3, pel);
    if ((x / 9 | 0) % 2) { R.rect(x + 6, 156 - sube, x + 6, 166, K); R.rect(x + 7, 156 - sube, x + 10, 159 - sube, pel); } }
  luc(ent(150, 178, tramo(t, wMuere - 0.5, wMuere + 0.6)) + flota(t, 2), 104 + flota(t), t, { dir: -1, cara: t > wMuere ? 'triste' : 'sonrisa' });
};
// ── 5 · EL BALCÓN DE SNOW: la multitud se abre; Haymitch llega bajo el balcón y aplaude despacio; Snow se inclina ─────
const p5 = (t) => {
  const O5 = { encuadre: 'avenida', camara: 'balcon' };
  T.capitolio(R, t, O5);
  // el pasillo que la multitud deja libre: losas de mármol con su junta, cordones dorados y dos agentes de la paz
  for (let y = 146; y < 180; y++) { const w = 26 + (y - 146) * 1.1, x0 = Math.round(160 - w), x1 = Math.round(160 + w); for (let x = x0; x <= x1; x++) P(x, y, (y % 8 === 0 || ((x - 160) * 8 / (y - 120)) % 8 < 0.25) ? hex('#d8d4e4') : tr(x, y, 0.15) ? hex('#f4f2fa') : hex('#eceaf4')); R.rect(x0 - 1, y, x0, y, hex('#c8a030')); R.rect(x1, y, x1 + 1, y, hex('#c8a030')); }
  for (const [x, y] of [[130, 146], [190, 146]]) { R.rect(x - 1, y - 8, x + 1, y, K); P(x, y - 9, hex('#f0d040')); }
  // en el balcón: Snow en el centro, dos capitolinos a los lados
  const incl = t > wAplaude + 0.8 ? 1 : 0;
  R.actor(X.drusilla, 104, 126, t, { dir: 1, sorpresa: t > wAplaude && t < wAplaude + 1.2 });
  R.actor(X.snow, 152, 126 + incl, t, { dir: -1, sonrisa: t > wAplaude + 0.8, dedo: t > wAplaude + 1.3 && t < C6 - 0.2 });
  R.actor(X.plutarch, 202, 126, t, { dir: -1, sorpresa: t > wAplaude + 0.2 });
  T.capitolioDelante(R, t, O5);
  // Haymitch sube por el pasillo hasta quedar bajo el balcón y aplaude despacio, tres veces
  const u = tramo(t, C5 + 0.2, wSnow);
  const pal = t > wAplaude && ((t - wAplaude) % 0.62) < 0.18;
  R.actor(X.haymitch, ent(118, 146, u), ent(184, 164, u), t, { dir: 1, anda: u > 0 && u < 1, enfado: true, brazos: pal });
  if (pal) { R.linea(158, 132, 156, 128, BL); R.linea(162, 132, 164, 128, BL); }
  R.actor(X.agentePaz, 104, 178, t, { dir: 1, sorpresa: t > wAplaude }); R.actor(X.agentePaz, 202, 178, t, { dir: -1, sorpresa: t > wAplaude + 0.3 });
  luc(250 + flota(t), 96 + flota(t, 1), t, { dir: -1, cara: t > wAplaude ? 'sorpresa' : 'normal' });
};
// ── 6 · EL DESPACHO DE SNOW (de día): le avisa de que no saldrá vivo de la arena; da la vuelta al reloj de arena ──────
const p6 = (t) => {
  const O6 = { encuadre: 'despacho' };
  T.capitolio(R, t, O6);
  const coge = t > wNo - 0.5 && t < wNo + 0.4;   // Snow da la vuelta al reloj de arena
  R.actor(X.snow, 160, 133, t, { dir: -1, habla: t > wClaro && t < C7 && Math.sin(t * 10) > 0, dedo: t > wClaro && t < wNo - 0.6, sostiene: coge ? [196, 112] : false });
  T.capitolioDelante(R, t, O6);
  const gira = tramo(t, wNo - 0.3, wNo + 0.2);
  T.c_relojArena(R, 206, 128 - Math.round(Math.sin(gira * Math.PI) * 6), 2, t, gira < 1 ? 0.98 : tramo(t, wNo + 0.2, C7 + 3) * 0.9);
  // Haymitch delante de la mesa, de visita: furioso, luego hundido
  R.actor(X.haymitch, 70, 168, t, { dir: 1, enfado: t < wViva, triste: t >= wViva });
  R.actor(X.agentePaz, 262, 168, t, { dir: -1 });
  luc(96 + flota(t), 96 + flota(t, 1), t, { dir: 1, cara: t > wViva ? 'triste' : t > wNo ? 'sorpresa' : 'normal' });
};
// ── 7 · LA MESA DE SNOW de cerca: del cofre salen las tarjetas de la familia y de Lenore Dove; se cierra en «die» ─────
const tarjeta = (x, y, tipo, brillo, t) => {   // una tarjeta de 26 × 32 con canto dorado y el pictograma
  const X0 = Math.round(x), Y0 = Math.round(y); R.rect(X0 - 14, Y0 - 17, X0 + 14, Y0 + 17, K); R.rect(X0 - 13, Y0 - 16, X0 + 13, Y0 + 16, hex('#d8b040')); R.rect(X0 - 12, Y0 - 15, X0 + 12, Y0 + 15, hex('#fbf6ea'));
  if (tipo === 'familia') { R.poligono([[X0 - 9, Y0 - 1], [X0, Y0 - 10], [X0 + 9, Y0 - 1]], hex('#6a4a3a')); R.rect(X0 - 7, Y0 - 1, X0 + 7, Y0 + 8, hex('#9a7a5a')); R.rect(X0 - 2, Y0 + 2, X0 + 1, Y0 + 8, hex('#4a3020')); R.rect(X0 + 3, Y0 + 1, X0 + 5, Y0 + 3, hex('#f0d080'));
    R.disco(X0 - 7, Y0 + 9, 2, hex('#3a3a4a')); R.rect(X0 - 9, Y0 + 11, X0 - 5, Y0 + 14, hex('#3a3a4a')); R.disco(X0 + 8, Y0 + 11, 1, hex('#3a3a4a')); R.rect(X0 + 7, Y0 + 12, X0 + 9, Y0 + 14, hex('#3a3a4a')); }
  else { R.disco(X0 - 1, Y0 + 3, 6, K); R.disco(X0 - 1, Y0 + 3, 5, BL); R.rect(X0 + 3, Y0 - 9, X0 + 5, Y0 + 1, K); R.rect(X0 + 4, Y0 - 8, X0 + 4, Y0, BL); R.disco(X0 + 5, Y0 - 9, 2, K); P(X0 + 5, Y0 - 9, BL); R.rect(X0 + 7, Y0 - 9, X0 + 9, Y0 - 8, hex('#f08a20')); P(X0 + 5, Y0 - 10, K); R.rect(X0 - 3, Y0 + 9, X0 - 3, Y0 + 12, hex('#f08a20')); R.rect(X0 + 1, Y0 + 9, X0 + 1, Y0 + 12, hex('#f08a20'));
    R.rect(X0 - 9, Y0 - 12, X0 - 8, Y0 - 6, hex('#5a3a8a')); R.rect(X0 - 7, Y0 - 12, X0 - 5, Y0 - 11, hex('#5a3a8a')); R.disco(X0 - 10, Y0 - 6, 1, hex('#5a3a8a')); }
  if (brillo > 0) for (let k = 0; k < 4; k++) { const a = t * 2 + k * Math.PI / 2, r = 20 + Math.sin(t * 5) * 2; if (tr(k, 0, brillo)) P(X0 + Math.cos(a) * r, Y0 + Math.sin(a) * r * 0.9, hex('#fff0a0')); }
};
const p7 = (t) => {
  const abre = tramo(t, C7 + 0.3, wFamilia - 0.2) * (1 - tramo(t, wMuera, wLio + 0.2));
  const O7 = { encuadre: 'despacho', camara: 'mesa', cofre: abre };
  T.capitolio(R, t, O7);
  R.actor(X.snow, 226, 115, t, { dir: -1, habla: t > C7 && t < C8 - 0.4 && Math.sin(t * 9) > 0, dedo: t > wMuera - 0.3 && t < wLio, sonrisa: t > wLio });
  T.capitolioDelante(R, t, O7);
  // las dos tarjetas suben del cofre: la familia (en «family») y Lenore Dove (en «Lenore Dove»); bajan en «die»
  const baja = tramo(t, wMuera, wLio + 0.1);
  for (const [w, tipo, xf, yf] of [[wFamilia, 'familia', 62, 66], [wLenore, 'lenore', 108, 62]]) { const u = tramo(t, w - 0.35, w + 0.25); if (u <= 0 || baja >= 1) continue;
    tarjeta(lerp(84, xf, u), lerp(128, yf, u) + baja * 70 + flota(t, xf) * (1 - baja), tipo, t > wVivan && t < wMuera ? 1 : 0.4, t); }
  luc(36 + flota(t), 40 + flota(t, 1), t, { dir: 1, cara: t > wFamilia ? 'triste' : 'normal' });
};

const ph = (t) => T.capitolio(R, t, { encuadre: 'mapa' });
const efectos = [];
T.rodar(E, R, [[0, p1], [C2, p2], [C3, p3], [C4, p4], [C5, p5], [C6, p6], [C7, p7], [C8, ph]], { año: 50, efectos });

''')
