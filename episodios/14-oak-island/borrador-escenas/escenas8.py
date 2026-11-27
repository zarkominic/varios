E = {}
E['oi-lector'] = ('El lector', '''// OI-LECTOR (frases 36–38), enero de 1965, cartela «1965». Seis planos:
// 1. la cocina de Michigan con la nevada: se abre la puerta de atrás, entra el niño Rick con la revista bajo el brazo,
//    sacude la nieve, la madre le saluda desde el fregadero y él se sienta a la mesa y deja la revista («11-year-old boy»);
// 2. inserto del mantel: su mano pasa la portada inventada a la página del artículo («reads»), la isla destella en
//    «Oak Island»; en «can never get it out of his head» el gato se tumba encima de la página (gag);
// 3. Miami: el constructor lee el mismo artículo en su despacho; en «Dan Blankenship» se levanta de un salto, sale de
//    detrás de la mesa, coge la maleta y se va («moving»);
// 4. el mapa de papel: la ruta de Miami a Oak Island, la maleta que viaja y la chincheta que cae; «half a century»: «50+» y
//    la barra del año que corre de 1965 a 2019;
// 5. la calzada en construcción («In 1965, a causeway»): el volquete vuelca piedra, los obreros con pala y el capataz que
//    señala la isla;
// 6. la calzada de frente desde la isla: la excavadora naranja viene hacia la cámara y el capataz la guía; el bote de
//    remos amarrado se queda sin uso y la gaviota se va («without a boat»).''', r'''
const a = (f) => en('lector', f), b = (f) => en('blankenship', f), c = (f) => en('calzada', f);
const P2 = a(0.5), P3 = b(0), P4 = b(0.598), P5 = c(0), P6 = c(0.59);
const K = T.C.k;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], by4 = (x, y) => (BY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const ha = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// la revista pequeña en la mano (portada inventada: franja roja, recuadro y número)
const revistaMano = (x, y) => { R.rect(x - 1, y - 1, x + 7, y + 9, K); R.rect(x, y, x + 6, y + 8, hex('#f4ecd8')); R.rect(x, y, x + 6, y + 1, hex('#c83a3a')); R.rect(x + 1, y + 3, x + 5, y + 6, hex('#5a8ab8')); R.pset(x + 3, y + 4, hex('#3a7a3a')); };
// la maleta de cuero con su asa y las correas
const maleta = (x, y, s = 1) => { const w = 12 * s, h = 9 * s; R.rect(x - 1, y - h - 1, x + w + 1, y + 1, K); R.rect(x, y - h, x + w, y, hex('#8a5a2a')); R.rect(x, y - h, x + w, y - h, hex('#b07a44')); R.rect(x, y, x + w, y, hex('#5a3a1a'));
  R.rect(x + 3 * s, y - h, x + 3 * s, y, hex('#5a3a1a')); R.rect(x + w - 3 * s, y - h, x + w - 3 * s, y, hex('#5a3a1a')); R.rect(x + 4 * s, y - h - 3, x + w - 4 * s, y - h - 3, K); R.pset(x + 4 * s, y - h - 2, K); R.pset(x + w - 4 * s, y - h - 2, K); R.pset(x + 1, y - h + 2, hex('#e8c040')); R.pset(x + w - 1, y - h + 2, hex('#e8c040')); };

// 1 · la cocina: la puerta se abre, entra el niño con la revista y se sienta
const abre = 1.7, cierra = 3.3, sienta = a(0.38), deja = a(0.43);
const p1 = (t) => {
  const u = tramo(t, abre + 0.4, a(0.33)), s = tramo(t, a(0.33), sienta);
  T.casa1965(R, t, { encuadre: 'cocina', revista: t < deja ? false : t < a(0.47) ? 'cerrada' : 'abierta', gato: 0 });
  // la puerta de atrás que se abre: el hueco con la nieve de fuera y la hoja que gira hacia dentro
  const ab = tramo(t, abre, abre + 0.35) - tramo(t, cierra, cierra + 0.35);
  if (ab > 0) {
    const w = Math.round(28 * ab);
    for (let y = 46; y <= 116; y++) for (let x = 223; x <= 223 + w; x++) R.pset(x, y, y > 100 ? (by4(x, y) > 0.5 ? hex('#eef2f6') : hex('#d4dce6')) : y > 86 ? hex('#8a98aa') : by4(x, y) < 0.3 ? hex('#c8d2de') : hex('#aab8c8'));
    for (let k = 0; k < 18; k++) { const x = 223 + Math.round(ha(k, 1, 3) * w), y = 46 + Math.round((ha(k, 2, 3) * 70 + t * 30) % 70); R.pset(x, y, T.C.blanco); }
    // la hoja de la puerta, abierta hacia la pared
    R.rect(223 + w, 44, 228 + w, 117, K); R.rect(224 + w, 45, 227 + w, 116, hex('#7a5232')); R.rect(224 + w, 45, 224 + w, 116, hex('#a87a4a'));
  }
  // la nieve que entra con él y se le cae de los hombros
  const xN = Math.round(t < a(0.33) ? lerp(232, 194, u) : lerp(194, 168, s)), yN = Math.round(t < a(0.33) ? lerp(121, 128, u) : lerp(128, 145, s));
  if (t > abre + 0.2 && t < a(0.3)) for (let k = 0; k < 6; k++) { const f = (t * 1.3 + k / 6) % 1; R.pset(xN + 3 + Math.round(ha(k, 5) * 9), yN - 20 + Math.round(f * 20), T.C.blanco); }
  // la madre en el fregadero se vuelve a saludarle y luego sigue con los platos
  const vuelta = t > abre + 0.5 && t < a(0.3);
  R.actor(EL.vecina, 64, 152, t, { dir: vuelta ? 1 : -1, habla: vuelta && Math.sin(t * 9) > 0, sonrisa: true, dedo: t > a(0.2) && t < a(0.27) });
  if (!vuelta) { const f = Math.sin(t * 6); R.rect(52, 124 + Math.round(f), 57, 126 + Math.round(f), hex('#f0f0ea')); R.rect(52, 124 + Math.round(f), 57, 124 + Math.round(f), K); }
  if (t > abre + 0.3) {
    const sentado = t >= sienta;
    R.actor(EL.rickNino, xN, yN, t, { dir: sentado ? 1 : -1, anda: !sentado && (u > 0 && u < 1 || s > 0 && s < 1), sonrisa: sentado || t > a(0.2), habla: t > a(0.2) && t < a(0.26) && Math.sin(t * 9) > 0 });
    if (t < deja) revistaMano(xN + 1, yN - 13);
  }
};
// 2 · el inserto del mantel: la página, la isla y el gato
const pasa = P2 + 0.15, oak = a(0.61), gatoIn = a(0.83), gatoFin = a(0.95);
const p2 = (t) => {
  const g = tramo(t, gatoIn, gatoFin);
  const pag = t < pasa + 0.35 ? 'portada' : 'articulo';
  T.casa1965(R, t, { encuadre: 'revista', pagina: pag, gato: g });
  // la hoja que pasa de derecha a izquierda (vista desde arriba: se estrecha y vuelve a abrirse)
  const v = tramo(t, pasa, pasa + 0.7);
  if (v > 0 && v < 1) { const xm = 162, ancho = Math.round(78 * Math.cos(v * Math.PI)), x1 = xm + ancho, lo = Math.min(xm, x1), hi = Math.max(xm, x1);
    R.poligono([[lo, 30 - Math.round(Math.sin(v * Math.PI) * 6)], [hi, 30 - Math.round(Math.sin(v * Math.PI) * 6)], [hi, 158], [lo, 158]], (x, y) => ((x + y) % 7 === 0 ? hex('#d8d0bc') : v < 0.5 ? hex('#f6efe0') : hex('#ece4d0')));
    R.linea(x1, 24, x1, 158, K); }
  // la mano del niño (manga roja) que pasa la hoja por la esquina de abajo y luego se aparta cuando llega el gato
  const yv = tramo(t, P2, pasa) - tramo(t, gatoIn - 0.5, gatoIn + 0.1);
  const hx = Math.round(lerp(250, 236, tramo(t, pasa, pasa + 0.7))), hy = Math.round(lerp(196, 156, yv));
  if (yv > 0) T.brazo(R, hx + 22, hy + 34, hx, hy, '#b83a3a', -1, { codo: [hx + 16, hy + 14] });
  // en «Oak Island» la isla del artículo late con un aro de lápiz que se dibuja alrededor
  if (t > oak) { const p = tramo(t, oak, oak + 0.7); for (let k = 0; k < 64 * p; k++) { const an = k / 64 * Math.PI * 2 - 1.2; R.pset(Math.round(124 + Math.cos(an) * (30 + Math.sin(k) * 1.2)), Math.round(88 + Math.sin(an) * 22), hex('#c83a3a')); R.pset(Math.round(124 + Math.cos(an) * 31), Math.round(88 + Math.sin(an) * 23), hex('#c83a3a')); } }
  if (t > oak && t < oak + 1.2 && Math.floor(t * 6) % 2) for (const [dx, dy] of [[-36, -26], [36, -24], [-34, 24], [38, 22]]) { R.pset(124 + dx, 88 + dy, T.C.blanco); R.pset(124 + dx - 1, 88 + dy, hex('#f8e8a0')); R.pset(124 + dx + 1, 88 + dy, hex('#f8e8a0')); R.pset(124 + dx, 88 + dy - 1, hex('#f8e8a0')); R.pset(124 + dx, 88 + dy + 1, hex('#f8e8a0')); }
};
// 3 · Miami: el constructor lee, se levanta de un salto y se lleva la maleta
const salta = b(0.382), coge = b(0.53);
const p3 = (t) => {
  T.casa1965(R, t, { encuadre: 'miami', persiana: 1 - 0.5 * tramo(t, P3 + 0.3, P3 + 1.5) });
  const up = tramo(t, salta, salta + 0.25), w1 = tramo(t, salta + 0.5, b(0.47)), w2 = tramo(t, b(0.47), coge), w3 = tramo(t, coge + 0.2, P4 + 0.3);
  let x = 194, y = 131, anda = false, dir = -1;
  if (t >= salta) { y = Math.round(lerp(131, 129, up)); }
  if (w1 > 0) { x = Math.round(lerp(194, 140, w1)); anda = w1 < 1; }
  if (w2 > 0) { x = Math.round(lerp(140, 118, w2)); y = Math.round(lerp(129, 160, w2)); anda = w2 < 1; }
  if (w3 > 0) { x = Math.round(lerp(118, 30, w3)); anda = w3 < 1; }
  // la maleta junto a la alfombra, hasta que la coge
  if (t < coge) maleta(98, 160);
  // de pie detrás de la mesa queda tapado por ella (R.delante la repinta), y al salir ya va por delante
  R.actor(EL.blankenship, x, y, t, { dir: t < salta ? 1 : dir, anda, sorpresa: t > salta - 0.1 && t < salta + 0.8, sonrisa: t > salta + 0.8, salto: t > salta && t < salta + 0.3 ? 2 : 0, habla: t < salta && t > b(0.2) && Math.sin(t * 3) > 0.6 });
  if (t > salta && t < salta + 0.9) R.icono('!', x + 6, y - 40, hex('#f8e040'), K, 2);
  if (w2 >= 1 || t >= coge) maleta(x - 9, y - 4);
  if (t < salta + 0.15) { // la revista abierta delante de la cara mientras lee (la misma isla y el pozo); en «Dan» la baja de golpe
    const baja = tramo(t, salta - 0.5, salta), x0 = x + 5, yy = Math.round(y - 31 + 14 * baja);
    R.rect(x0 - 1, yy - 1, x0 + 28, yy + 17, K); R.rect(x0, yy, x0 + 13, yy + 16, hex('#f4ecd8')); R.rect(x0 + 15, yy, x0 + 27, yy + 16, hex('#ece4d0')); R.rect(x0 + 14, yy, x0 + 14, yy + 16, hex('#b8ac94'));
    R.rect(x0 + 1, yy + 1, x0 + 12, yy + 9, hex('#6aa0c8')); R.rect(x0 + 2, yy + 6, x0 + 11, yy + 8, hex('#5a9a4a')); R.disco(x0 + 6, yy + 4, 3, hex('#3a7a3a')); R.pset(x0 + 5, yy + 3, hex('#6aaa5a'));
    R.rect(x0 + 1, yy + 11, x0 + 12, yy + 11, hex('#8a8a8a')); R.rect(x0 + 1, yy + 13, x0 + 10, yy + 13, hex('#8a8a8a'));
    R.rect(x0 + 19, yy + 1, x0 + 22, yy + 15, hex('#7a5a3a')); R.rect(x0 + 20, yy + 1, x0 + 21, yy + 15, hex('#4a3020')); for (let j = 3; j < 15; j += 3) { R.pset(x0 + 24, yy + j, hex('#5a5a5a')); R.pset(x0 + 25, yy + j, hex('#5a5a5a')); }
    for (const dy of [5, 11]) { R.rect(x0 - 2, yy + dy, x0, yy + dy + 2, hex('#f6c290')); R.rect(x0 + 27, yy + dy, x0 + 29, yy + dy + 2, hex('#f6c290')); } }
};
// 4 · el mapa: de Miami a Oak Island
const ruta0 = P4 + 0.3, ruta1 = b(0.82), medio = b(0.846);
const p4 = (t) => {
  const P = T.mapa(R, t, { zoom: 0.85, centro: [-89, 41.4] });
  const [mx, my] = P(T.LUGARES.miami), [ox, oy] = P(T.LUGARES.oakIsland);
  const pts = [[mx, my], P([-80.0, 31.5]), P([-76.5, 35.2]), P([-74.0, 40.5]), P([-70.0, 42.4]), [ox, oy]];
  const u = tramo(t, ruta0, ruta1);
  R.ruta(pts, u, hex('#c83a3a'), { grueso: 2, flecha: false });
  T.chincheta(R, mx, my, t, hex('#3a7ac8'));
  // la maleta que viaja por la ruta
  if (u > 0 && u < 1) { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let q = tot * u, i = 1; while (i < pts.length - 1 && q > L[i - 1]) { q -= L[i - 1]; i++; } const f = Math.min(1, q / L[i - 1]);
    const x = Math.round(lerp(pts[i - 1][0], pts[i][0], f)), y = Math.round(lerp(pts[i - 1][1], pts[i][1], f)); maleta(x - 6, y - 4 + Math.round(Math.sin(t * 12)), 1); }
  T.chincheta(R, ox, oy, t, hex('#c83a3a'), { baja: tramo(t, ruta1 - 0.2, ruta1 + 0.2), pulso: t > ruta1 + 0.2 });
  if (t > medio) { const e = tramo(t, medio, medio + 0.4); R.numero('50+', ox + 24, Math.round(lerp(oy + 58, oy + 44, e)), { tam: 16, centro: true }); }
};
// 5 · la calzada en construcción
const p5 = (t) => {
  const av = Math.round(lerp(0.5, 0.74, tramo(t, c(0.25), c(0.5))) * 30) / 30;
  T.oakHoy(R, t, { encuadre: 'calzada', epoca: '1965', avance: av });
  const xf = Math.round(lerp(100, 252, av));
  // dos obreros con pala que echan tierra al talud y el capataz que señala la isla
  const pala = (x, y, dir, f) => { const ax = x + (dir > 0 ? 12 : 2), ay = y - 10; const ex = ax + dir * Math.round(5 + 3 * f), ey = ay + Math.round(8 - 6 * f); R.linea(ax, ay, ex, ey, hex('#8a6a44')); R.rect(ex - 1, ey, ex + 1, ey + 2, hex('#8a929c')); if (f > 0.7) R.pset(ex, ey - 1, hex('#8a6e4c')); };
  const f1 = Math.max(0, Math.sin(t * 3.4)), f2 = Math.max(0, Math.sin(t * 3.4 + 2));
  R.actor(EL.cavador, xf - 40, 129, t, { dir: 1 }); pala(xf - 40, 129, 1, f1);
  R.actor(EL.cavador2, xf - 62, 130, t, { dir: 1 }); pala(xf - 62, 130, 1, f2);
  const v = tramo(t, P5 + 0.4, c(0.35));
  R.actor(EL.capataz, Math.round(lerp(70, 116, v)), 131, t, { dir: 1, anda: v > 0 && v < 1, dedo: t > c(0.46) && t < c(0.62), habla: t > c(0.3) && t < c(0.46) && Math.sin(t * 8) > 0 });
};
// 6 · la calzada de frente desde la isla: la excavadora viene hacia nosotros
let F6 = null;
const fondo6 = () => {
  const bf = R.nuevo(), prev = R.usar(bf);
  const cielo = ['#5a8ac0', '#6e9cca', '#86b0d6', '#a2c4e0', '#c0d8ea', '#d8e6f0'].map(hex);
  for (let y = 0; y < 76; y++) for (let x = 0; x < 320; x++) { const v = y / 76 * (cielo.length - 1), i = Math.floor(v); R.pset(x, y, cielo[Math.min(cielo.length - 1, i + (v - i > by4(x, y) ? 1 : 0))]); }
  // cirros fijos a la izquierda (lejos de Atom)
  for (let k = 0; k < 7; k++) { const cx = 30 + k * 34, cy = 22 + (k % 3) * 5; for (let i = 0; i < 26; i++) if (by4(cx + i, cy) > 0.35) R.pset(cx + i, cy + Math.round(Math.sin(i * 0.4 + k) * 1.2), hex('#e4eef6')); }
  // la costa de enfrente: lomas azuladas con abetos, casitas blancas y la iglesia
  for (let x = 0; x < 320; x++) { const yt = 64 + Math.round(Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11) * 1.5); for (let y = yt; y < 77; y++) R.pset(x, y, y < yt + 3 ? hex('#5a7a8a') : by4(x, y) > 0.6 ? hex('#3e5e6a') : hex('#4a6a78'));
    if (ha(x, 1, 9) > 0.62) { const hgt = 4 + Math.round(ha(x, 2, 9) * 6); for (let j = 0; j < hgt; j++) for (let i = -Math.floor(j / 2.5); i <= Math.floor(j / 2.5); i++) R.pset(x + i, yt - hgt + j + 1, j % 3 === 2 ? hex('#2e4a52') : hex('#36545e')); } }
  for (const [x, y, rojo] of [[40, 70, 1], [58, 71, 0], [96, 69, 1], [214, 70, 0], [236, 71, 1], [262, 69, 0], [284, 70, 1]]) { R.rect(x, y - 4, x + 6, y, hex('#f0ece0')); R.rect(x, y - 6, x + 6, y - 5, rojo ? hex('#a83a2a') : hex('#4a4a5a')); R.pset(x + 2, y - 2, hex('#e8c860')); R.rect(x + 4, y - 2, x + 4, y, hex('#5a4a3a')); }
  R.rect(110, 60, 116, 70, hex('#f0ece0')); R.rect(112, 52, 114, 59, hex('#f0ece0')); R.pset(113, 51, hex('#4a4a5a')); R.pset(113, 50, hex('#4a4a5a')); R.rect(112, 64, 114, 66, hex('#5a4a3a'));
  // el agua: franjas tramadas que se oscurecen hacia delante
  const agua = ['#a8c8d8', '#7aa8c0', '#5a8aa8', '#46769a', '#3a6a8a', '#2e5a7a'].map(hex);
  for (let y = 77; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.pow((y - 77) / 103, 0.7) * (agua.length - 1), i = Math.floor(v); R.pset(x, y, agua[Math.min(agua.length - 1, i + (v - i > by4(x, y) ? 1 : 0))]); }
  // la calzada en perspectiva: tierra apisonada con grava, roderas, la escollera con algas y la línea mojada
  for (let y = 77; y < 180; y++) { const hw = 7 + (y - 77) / 103 * 118, x0 = Math.round(160 - hw), x1 = Math.round(160 + hw), d = (y - 77) / 103;
    for (let x = x0 - Math.round(3 + d * 12); x <= x1 + Math.round(3 + d * 12); x++) {
      const borde = x < x0 || x > x1;
      let col;
      if (borde) { const q = ha(Math.floor(x / (2 + d * 5)), Math.floor(y / (2 + d * 4)), 4); const lado = x < x0 ? x0 - x : x - x1, alto = Math.round(3 + d * 12); col = lado > alto - 2 - d * 3 ? hex('#3e4a3a') : q > 0.66 ? hex('#a8a49a') : q > 0.33 ? hex('#8a867e') : hex('#6a665e'); if (lado > alto * 0.6 && ha(x, y, 6) > 0.5) col = hex('#5a6a3a'); }
      else { const q = ha(x, y, 5); col = q > 0.93 ? hex('#c8b898') : q > 0.82 ? hex('#7a5a40') : by4(x, y) > 0.5 ? hex('#9a7a5a') : hex('#8e6e50'); const rx = Math.abs(Math.abs(x - 160) - hw * 0.45); if (rx < 1 + d * 2) col = hex('#7a5a40'); }
      R.pset(x, y, col); } }
  // lo que hay sobre la calzada: charcos con el cielo, montones de piedra, tablones, una carretilla volcada y el trípode
  // del topógrafo (en perspectiva: más pequeños cuanto más lejos)
  const enCalz = (d, u) => { const y = Math.round(77 + d * 103), hw = 7 + d * 118; return [Math.round(160 + u * hw), y, 0.25 + d * 1.1]; };
  for (const [d, u, w] of [[0.42, -0.5, 14], [0.66, 0.42, 22], [0.88, -0.25, 30], [0.28, 0.3, 8]]) { const [x, y, s] = enCalz(d, u), hw2 = Math.round(w * s), hh = Math.max(1, Math.round(3 * s));
    for (let yy = -hh; yy <= hh; yy++) for (let xx = -hw2; xx <= hw2; xx++) if ((xx / hw2) ** 2 + (yy / hh) ** 2 <= 1) R.pset(x + xx, y + yy, yy < 0 ? hex('#a8c4d8') : by4(x + xx, y + yy) > 0.5 ? hex('#7aa0bc') : hex('#8ab0c8'));
    R.linea(x - hw2 + 2, y - hh, x - hw2 + Math.round(hw2 * 0.6), y - hh, hex('#e4eef4')); R.linea(x - hw2, y + hh, x + hw2, y + hh, hex('#6a4a32')); }
  for (const [d, u, n] of [[0.36, 0.55, 5], [0.58, -0.62, 7], [0.82, 0.68, 9], [0.22, -0.4, 4]]) { const [x, y, s] = enCalz(d, u);
    for (let k = 0; k < n; k++) { const rx = x + Math.round((ha(k, d * 9, 3) - 0.5) * 10 * s), ry = y - Math.round(ha(k, d * 7, 4) * 4 * s), r = Math.max(1, Math.round((1.5 + ha(k, 1, d) * 1.5) * s));
      R.disco(rx, ry, r, K); R.disco(rx, ry, Math.max(1, r - 1), k % 2 ? hex('#9a968c') : hex('#7e7a72')); R.pset(rx - 1, ry - 1, hex('#c8c4ba')); } }
  { const [x, y, s] = enCalz(0.74, -0.42); for (let k = 0; k < 3; k++) { const yy = y - k * Math.round(2 * s); R.rect(x - Math.round(12 * s), yy - Math.round(2 * s), x + Math.round(12 * s), yy, K); R.rect(x - Math.round(12 * s) + 1, yy - Math.round(2 * s) + 1, x + Math.round(12 * s) - 1, yy - 1, k % 2 ? hex('#c89a5a') : hex('#b08048')); R.pset(x - Math.round(6 * s), yy - 1, hex('#7a5232')); } }
  { const [x, y, s] = enCalz(0.5, 0.62); R.linea(x, y - Math.round(14 * s), x - Math.round(4 * s), y, hex('#c8a060')); R.linea(x, y - Math.round(14 * s), x + Math.round(4 * s), y, hex('#c8a060')); R.linea(x, y - Math.round(14 * s), x, y, hex('#a88040'));
    R.rect(x - 2, y - Math.round(17 * s), x + 2, y - Math.round(14 * s), K); R.rect(x - 1, y - Math.round(17 * s) + 1, x + 1, y - Math.round(14 * s) - 1, hex('#e0c040')); }
  { const [x, y, s] = enCalz(0.3, -0.62); R.poligono([[x - 6, y - 4], [x + 5, y - 6], [x + 6, y - 2], [x - 5, y]], K); R.poligono([[x - 5, y - 4], [x + 4, y - 5], [x + 5, y - 2], [x - 4, y - 1]], hex('#5a7a6a')); R.disco(x + 7, y, 2, K); R.pset(x + 7, y, hex('#8a929c')); }
  // estacas con banderitas a los dos lados
  for (const d of [0.08, 0.18, 0.32, 0.5, 0.74]) { const y = Math.round(77 + d * 103), hw = 7 + d * 118, hgt = Math.round(3 + d * 16);
    for (const s of [-1, 1]) { const x = Math.round(160 + s * (hw - 2)); R.rect(x, y - hgt, x + Math.max(0, Math.round(d * 2)), y, hex('#c8a878')); R.rect(x, y - hgt, x + Math.max(1, Math.round(d * 6)), y - hgt + Math.max(1, Math.round(d * 4)), hex('#e8783a')); } }
  // la orilla de la isla en primer término: rocas, hierba y matas a los dos lados
  for (let x = 0; x < 320; x++) { const yb = 168 + Math.round(Math.sin(x * 0.07) * 3 + ha(x >> 3, 0, 2) * 4); if (x > 46 && x < 274) continue; for (let y = yb; y < 180; y++) R.pset(x, y, y < yb + 2 ? hex('#7aaa4a') : ha(x, y, 7) > 0.7 ? hex('#3e6a2e') : hex('#4e7a36')); }
  for (const [x, y, r] of [[20, 160, 9], [36, 168, 6], [292, 162, 10], [276, 170, 6], [8, 172, 7]]) { R.disco(x, y, r, K); R.disco(x, y, r - 1, hex('#8a867e')); R.disco(x - 2, y - 2, r - 3, hex('#a8a49a')); R.pset(x - 3, y - 3, hex('#c8c4ba')); }
  for (let k = 0; k < 30; k++) { const x = k < 15 ? Math.round(ha(k, 1, 8) * 48) : 272 + Math.round(ha(k, 1, 8) * 48), y = 150 + Math.round(ha(k, 2, 8) * 26); R.linea(x, y, x + (k % 3) - 1, y - 4, hex('#6a9a3a')); R.pset(x + (k % 3) - 1, y - 5, hex('#c8d860')); }
  R.usar(prev); return bf;
};
// la excavadora naranja de 1965 vista de frente, a escala s, con las cadenas apoyadas en (cx, yb)
const excavadoraFrente = (cx, yb, s, t) => {
  const r = (x0, y0, x1, y1, col) => R.rect(Math.round(cx + x0 * s), Math.round(yb + y0 * s), Math.round(cx + x1 * s), Math.round(yb + y1 * s), col);
  const na = hex('#e0901c'), naS = hex('#a8641a'), naL = hex('#f6b84a');
  // la sombra en la calzada
  for (let x = Math.round(cx - 38 * s); x <= Math.round(cx + 38 * s); x++) for (let y = Math.round(yb - 2 * s); y <= Math.round(yb + 2 * s); y++) R.pset(x, y, mez(R.pget(x, y), K, 0.35));
  // las dos cadenas, con las tejas que corren
  for (const sx of [-1, 1]) { r(sx < 0 ? -36 : 21, -15, sx < 0 ? -21 : 36, 0, K); r(sx < 0 ? -35 : 22, -14, sx < 0 ? -22 : 35, -1, hex('#2e2e36'));
    for (let j = 0; j < 5; j++) { const yy = -14 + ((j * 3 + Math.floor(t * 10)) % 14); r(sx < 0 ? -35 : 22, yy, sx < 0 ? -22 : 35, yy, hex('#5a5a66')); } }
  r(-21, -11, 21, -4, hex('#3a3a42'));
  // la casa naranja con su rejilla y el contrapeso
  r(-31, -33, 31, -14, K); r(-30, -32, 30, -15, na); r(-30, -32, 30, -31, naL); r(-30, -16, 30, -15, naS);
  for (let k = 0; k < 5; k++) r(-26 + k * 4, -26, -25 + k * 4, -19, naS);
  // la cabina a la izquierda con el cristal y el operador
  r(-29, -55, -5, -32, K); r(-28, -54, -6, -33, na); r(-26, -51, -8, -36, hex('#3a4a5a')); r(-25, -50, -15, -45, hex('#8ac0e0'));
  R.disco(Math.round(cx - 17 * s), Math.round(yb - 42 * s), Math.max(1, 3 * s), hex('#f6c290')); r(-20, -40, -14, -36, hex('#4a6a9a'));
  // la pluma en el centro, levantada, con el cilindro y la cuchara recogida delante
  r(2, -64, 12, -30, K); r(3, -63, 11, -31, na); r(3, -63, 4, -31, naL); r(9, -63, 11, -31, naS); r(6, -58, 7, -36, hex('#c8d2dc'));
  r(-6, -27, 18, -15, K); r(-5, -26, 17, -16, hex('#5a5a62')); for (let k = 0; k < 6; k++) r(-4 + k * 4, -16, -3 + k * 4, -13, hex('#8a929c'));
  // los faros que se encienden y el escape que humea
  r(-27, -58, -24, -56, hex('#f8e8a0')); r(-10, -58, -7, -56, hex('#f8e8a0'));
  r(22, -46, 25, -33, K); r(23, -45, 24, -33, hex('#4a4a52'));
  for (let k = 0; k < 4; k++) { const f = (t * 1.4 + k / 4) % 1; R.disco(Math.round(cx + (24 + f * 10) * s), Math.round(yb - (48 + f * 22) * s), Math.max(1, (1 + f * 3) * s), f < 0.5 ? hex('#4a4a54') : hex('#7a7a84')); }
};
const viene0 = P6 + 0.2, viene1 = c(0.9);
const p6 = (t) => {
  if (!F6) F6 = fondo6(); R.copiar(F6);
  // nubes de tres tonos a tres velocidades (por debajo de la zona de Atom)
  for (const [k, vel, y0, tonos] of [[0, 2, 30, ['#c8d6e4', '#e4ecf4', '#ffffff']], [1, 4, 44, ['#b8c8d8', '#d8e4ee', '#f4f8fc']], [2, 6, 54, ['#a8bccc', '#ccdae6', '#eef4f8']]]) {
    for (let n = 0; n < 3; n++) { const cx = Math.round((n * 140 + k * 50 + t * vel) % 420) - 50, cy = y0 + n % 2 * 3; if (cy < 46 && cx > 250) continue;
      R.disco(cx, cy + 2, 7 - k, hex(tonos[0])); R.disco(cx - 8, cy + 3, 5 - k, hex(tonos[0])); R.disco(cx + 1, cy, 6 - k, hex(tonos[1])); R.disco(cx + 9, cy + 2, 5 - k, hex(tonos[1])); R.disco(cx - 1, cy - 2, 4 - k * 0.5, hex(tonos[2])); } }
  // las gaviotas
  for (let k = 0; k < 3; k++) { const x = Math.round((t * (9 + k * 3) + k * 90) % 300), y = 50 + k * 6 + Math.round(Math.sin(t * 2 + k) * 2), w = Math.floor(t * 5 + k) % 2; R.pset(x - 1, y - w, hex('#3a3a46')); R.pset(x, y, hex('#3a3a46')); R.pset(x + 1, y - w, hex('#3a3a46')); }
  // el humo de las chimeneas de la costa
  for (const x of [43, 99, 239]) for (let k = 0; k < 3; k++) { const f = (t * 0.4 + k / 3) % 1; R.pset(x + Math.round(f * 4), 64 - Math.round(f * 9), hex('#d8e0e6')); }
  // olas que corren y brillos del sol
  for (let k = 0; k < 70; k++) { const yy = 80 + Math.round(Math.pow(ha(k, 3, 2), 1.4) * 96), d = (yy - 77) / 103, hw = 7 + d * 118, x = Math.round((ha(k, 4, 2) * 320 + t * (4 + d * 10)) % 320); if (Math.abs(x - 160) < hw + 4 + d * 12) continue; const l = Math.round(2 + d * 6);
    R.linea(x, yy, x + l, yy, Math.sin(t * 3 + k) > 0.3 ? hex('#e8f4f8') : hex('#9ac4d8')); }
  // el bote de remos amarrado a la derecha, que se mece sin nadie (y la gaviota posada que se va en «without a boat»)
  const bx = 248, byy = 146 + Math.round(Math.sin(t * 1.6) * 1.5), vuela = tramo(t, c(0.92), c(0.92) + 1.2);
  R.linea(272, 170, bx + 22, byy - 2, hex('#c8b898'));
  R.poligono([[bx - 22, byy - 6], [bx + 24, byy - 6], [bx + 18, byy + 4], [bx - 16, byy + 4]], K);
  R.poligono([[bx - 21, byy - 5], [bx + 23, byy - 5], [bx + 17, byy + 3], [bx - 15, byy + 3]], (x, y) => (y < byy - 3 ? hex('#f0ece0') : y < byy ? hex('#3a7a9a') : hex('#2a5a72')));
  R.rect(bx - 16, byy - 8, bx + 18, byy - 6, hex('#7a5232')); R.rect(bx - 2, byy - 8, bx + 1, byy - 6, hex('#a87a4a'));
  R.linea(bx - 10, byy - 9, bx + 8, byy - 12, hex('#c8a878')); R.linea(bx - 10, byy - 9, bx - 12, byy - 7, hex('#c8a878'));
  for (let i = 0; i < 30; i += 3) R.pset(bx - 16 + i, byy + 5, hex('#9ac4d8'));
  { const gx = Math.round(lerp(bx + 12, bx + 70, vuela)), gy = Math.round(lerp(byy - 10, byy - 80, vuela)), al = vuela > 0 ? Math.floor(t * 8) % 2 : 0;
    R.rect(gx - 2, gy - 2, gx + 3, gy + 1, T.C.blanco); R.pset(gx + 4, gy - 2, hex('#e8a030')); R.pset(gx + 3, gy - 3, K); R.rect(gx - 4, gy - 3 - al * 3, gx, gy - 2 - al * 3, hex('#8a96a2')); R.rect(gx - 2, gy + 2, gx - 2, gy + 2 + (vuela > 0 ? 0 : 1), hex('#e8a030')); }
  // la excavadora que viene por la calzada hacia la isla
  const d = tramo(t, viene0, viene1), yb = Math.round(80 + 74 * Math.pow(d, 1.3)), s = (yb - 72) / 86;
  excavadoraFrente(160, yb, Math.max(0.12, s), t);
  // el polvo detrás de las cadenas
  if (d > 0 && d < 1) for (let k = 0; k < 5; k++) { const f = (t * 1.8 + k / 5) % 1; R.pset(160 + Math.round((k - 2) * 14 * s), yb - Math.round(f * 6 * s), hex('#c8b898')); }
  // el capataz en la orilla que la guía con los brazos, y un obrero que aparta la carretilla
  const guia = t > viene0 + 0.3;
  R.actor(EL.capataz, 74, 172, t, { dir: 1, brazos: guia && Math.floor(t * 2.5) % 2 === 0, dedo: guia && Math.floor(t * 2.5) % 2 === 1, habla: guia });
  const w = tramo(t, viene0 + 0.5, viene0 + 2);
  const ox = Math.round(lerp(214, 246, w)); R.actor(EL.cavador, ox, 176, t, { dir: 1, anda: w > 0 && w < 1 });
  R.rect(ox + 14, 166, ox + 26, 171, K); R.rect(ox + 15, 167, ox + 25, 170, hex('#6a7a8a')); R.disco(ox + 24, 173, 2, K); R.linea(ox + 10, 164, ox + 15, 167, hex('#8a6a44'));
};
const año = (t) => t < ruta1 ? 1965 : t < P5 ? Math.round(lerp(1965, 2019, tramo(t, medio, P5 - 0.3))) : 1965;
const efectos = [[abre, 'puerta'], [cierra + 0.3, 'toc'], [deja, 'papel'], [pasa, 'papel'], [oak, 'lapiz'], [gatoIn + 0.5, 'miau'], [P3 + 0.4, 'zumbido'], [salta, 'boing'], [coge, 'golpecito'], [ruta0, 'whoosh'], [ruta1, 'golpecito'], [medio + 0.1, 'brillo'], [P5 + 0.6, 'motor'], [en('calzada', 0.08), 'avalancha'], [viene0, 'arranque'], [c(0.92), 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1965', efectos, año });
''')

E['oi-lagina'] = ('Los Lagina', '''// OI-LAGINA (frases 39–40), de 2006 a hoy. Cuatro planos:
// 1. la orilla de la isla al atardecer, con la calzada y sus faros: los hermanos ya mayores, con gorra, llegan por la
//    playa, se dan la mano en «buy into the island» y Rick señala el roble de la polea (la barra corre de 1965 a 2006);
// 2. la excavación de hoy: un equipo de televisión sin logotipos (cámara en trípode con su piloto rojo, la pértiga
//    con el micro y la claqueta) rueda a los dos; la claqueta suena en «TV show» y su número sube de 1 a 13 en «a dozen
//    seasons» (la barra va de 2014 a 2026);
// 3. dos cuadros, como en el periodista del 11: en la oficina de correos, Rick sube la saca al mostrador y las cartas
//    vuelan a los casilleros («retired postal worker»); en «Marty» se enciende el otro: el pozo de gas, Marty despliega
//    los planos y la antorcha se enciende («engineer»);
// 4. inserto de la mesa: el plano de la isla y el plano del pozo de gas, que se desenrolla; la bolsa de gas se enciende
//    en «natural gas» y la mano de Marty deja fajos de billetes junto al pozo en «puts up much of the money».''', r'''
const a = (f) => en('programa', f), b = (f) => en('hermanos', f);
const Q2 = a(0.417), Q3 = b(0), Q4 = b(0.584);
const K = T.C.k;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], by4 = (x, y) => (BY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const ha = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const caja = (x0, y0, x1, y1, col, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, col); };

// 1 · la orilla al atardecer: llegan los dos y se dan la mano
const mano = a(0.254), señala = a(0.324);
const q1 = (t) => {
  T.isla1795(R, t, { encuadre: 'orilla', hoy: true, marea: 0.35 });
  const u = tramo(t, 0.3, mano - 0.3), v = tramo(t, 0.6, mano - 0.25);
  const xr = Math.round(lerp(96, 150, u)), xm = Math.round(lerp(262, 172, v));
  R.actor(EL.rick, xr, 162, t, { dir: t > señala ? -1 : 1, anda: u > 0 && u < 1, sonrisa: t > mano, dedo: t > señala + 0.1 && t < señala + 1.4, habla: t > a(0.12) && t < a(0.2) && Math.sin(t * 9) > 0 });
  R.actor(EL.marty, xm, 164, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: t > mano, habla: t > señala && Math.sin(t * 8) > 0.2 });
  // el apretón de manos
  if (t > mano && t < señala + 0.05) { const yy = 150 + Math.round(Math.sin(t * 14)); R.rect(xr + 14, yy - 1, xm + 1, yy + 1, hex('#f6c290')); R.rect(xr + 14, yy - 2, xm + 1, yy - 2, K); R.rect(xr + 14, yy + 2, xm + 1, yy + 2, K); R.rect(xr + 12, yy - 1, xr + 13, yy + 1, hex('#4e6a4a')); R.rect(xm + 2, yy - 1, xm + 3, yy + 1, hex('#2a4a7a')); }
  T.a_islaDelante(R, t, { encuadre: 'orilla', hoy: true });
};
// 2 · la excavación: el equipo de televisión
const claqueta = a(0.665), temporadas = a(0.774), docena = a(0.869);
const q2 = (t) => {
  T.oakHoy(R, t, { encuadre: 'excavacion', tubo: lerp(0.25, 0.6, tramo(t, Q2, Q3)) });
  // los hermanos en los tablones, hablando a la cámara
  R.actor(EL.rick, 44, 166, t, { dir: 1, habla: t < claqueta - 0.3 && Math.sin(t * 8) > 0, sonrisa: t > claqueta });
  R.actor(EL.marty, 64, 168, t, { dir: 1, dedo: t > temporadas && t < docena + 0.6, habla: t > temporadas && Math.sin(t * 7) > 0.1 });
  // la cámara en su trípode a la derecha, con el operador
  const cx = 168, cy = 146;
  R.linea(cx + 6, cy, cx - 2, 170, K); R.linea(cx + 6, cy, cx + 14, 170, K); R.linea(cx + 6, cy, cx + 6, 170, hex('#4a4a52')); R.linea(cx + 5, cy, cx - 3, 170, hex('#5a5a62')); R.linea(cx + 7, cy, cx + 15, 170, hex('#5a5a62'));
  caja(cx - 6, cy - 10, cx + 14, cy - 1, hex('#3a3a42')); R.rect(cx - 6, cy - 10, cx + 14, cy - 10, hex('#5a5a66'));
  caja(cx - 13, cy - 8, cx - 7, cy - 3, hex('#2a2a32')); R.pset(cx - 12, cy - 6, hex('#8ac0e0')); R.pset(cx - 11, cy - 7, hex('#c8e4f4'));
  caja(cx + 2, cy - 15, cx + 8, cy - 12, hex('#2a2a32')); R.rect(cx + 15, cy - 9, cx + 17, cy - 3, hex('#4a4a52'));
  const rojo = t > claqueta && Math.floor(t * 2) % 2 === 0; R.pset(cx - 4, cy - 12, rojo ? hex('#ff3a3a') : hex('#6a2a2a')); R.pset(cx - 4, cy - 13, rojo ? hex('#ff9a8a') : hex('#4a2a2a'));
  R.actor(EL.tecnico, cx + 14, 170, t, { dir: -1 });
  // la pértiga con el micro peludo sobre las cabezas, con la técnica de sonido
  const bx = 118, bs = 168; R.actor(EL.tecnica, bx, bs, t, { dir: -1 });
  const mx = 62 + Math.round(Math.sin(t * 1.1) * 3), my = 128 + Math.round(Math.sin(t * 1.7));
  R.linea(bx + 2, bs - 14, mx + 6, my, K); R.linea(bx + 2, bs - 15, mx + 6, my - 1, hex('#8a929c'));
  R.disco(mx, my, 5, K); for (let k = 0; k < 30; k++) { const an = k * 0.7, rr = 2 + (k % 4); R.pset(Math.round(mx + Math.cos(an) * rr), Math.round(my + Math.sin(an) * rr * 0.7), k % 3 ? hex('#9a8a7a') : hex('#c8b8a8')); }
  // la ayudante entra con la claqueta, la cierra en «TV show» y luego enseña el número de temporadas
  const e = tramo(t, claqueta - 1.4, claqueta - 0.4), s = tramo(t, docena + 0.3, Q3 - 0.2), px = Math.round(lerp(330, 132, e) + lerp(0, 220, s));
  R.actor(EL.periodista, px, 170, t, { dir: s > 0 ? 1 : -1, anda: (e > 0 && e < 1) || (s > 0 && s < 1), sonrisa: t > claqueta });
  const n = t < temporadas ? 1 : Math.min(13, 1 + Math.floor(tramo(t, temporadas, docena) * 12));
  const kx = px - 22, ky = 132, abre = t < claqueta ? tramo(t, claqueta - 0.8, claqueta - 0.3) : 0;
  caja(kx, ky, kx + 22, ky + 14, hex('#2a2a32'), hex('#101018'));
  R.numero(String(n), kx + 12, ky + 12, { centro: true, color: hex('#f4f4f0') });
  R.rect(kx + 1, ky + 2, kx + 21, ky + 2, hex('#e8e8e0'));
  { const ang = abre * 0.45, L = 23; for (let i = 0; i <= L; i++) { const x = Math.round(kx + Math.cos(-ang) * i), y = Math.round(ky - 2 + Math.sin(-ang) * i); R.pset(x, y, K); R.pset(x, y - 1, Math.floor(i / 3) % 2 ? hex('#f4f4f0') : hex('#2a2a32')); R.pset(x, y - 2, K); } }
  if (t > claqueta && t < claqueta + 0.25) for (const [dx, dy] of [[-4, -6], [26, -6], [-3, 2], [27, 2]]) R.pset(kx + dx, ky + dy, hex('#f8e040'));
};
// 3 · dos cuadros: la oficina de correos de Rick y el pozo de gas de Marty
let F3 = null;
const L3 = [12, 52, 150, 158], D3 = [170, 52, 306, 158];
const fondo3 = () => {
  const bf = R.nuevo(), prev = R.usar(bf);
  // la pared azul de noche, tramada, con estrellas, y el pueblo de abajo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 60 ? (by4(x, y) < y / 60 * 0.6 ? hex('#22264a') : hex('#1a1c3a')) : by4(x, y) > 0.8 ? hex('#262a52') : hex('#22264a'));
  for (let k = 0; k < 40; k++) { const x = Math.round(ha(k, 1, 31) * 320), y = Math.round(ha(k, 2, 31) * 46) + 2; if (x > 272 && y < 48) continue; if (x > 18 && x < 172 && y < 16) continue; R.pset(x, y, k % 5 ? hex('#5a5e8a') : hex('#c8cce8')); }
  for (let x = 0; x < 320; x++) { const yt = 164 + Math.round(Math.sin(x * 0.05) * 2); for (let y = yt; y < 180; y++) R.pset(x, y, hex('#12142a')); }
  for (const [x, w, hh] of [[4, 18, 12], [30, 14, 18], [60, 22, 10], [96, 16, 14], [150, 20, 16], [184, 14, 10], [214, 24, 14], [252, 16, 18], [286, 22, 12]]) { R.rect(x, 168 - hh, x + w, 180, hex('#0c0e20')); R.poligono([[x - 2, 168 - hh], [x + w / 2, 160 - hh], [x + w + 2, 168 - hh]], hex('#0c0e20')); }
  // los marcos de madera de los dos cuadros, con su sombra
  for (const [x0, y0, x1, y1] of [L3, D3]) { R.rect(x0 - 2, y0 - 2, x1 + 5, y1 + 5, hex('#0c0e1e')); R.rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, K); R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#8a5a2a')); R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, hex('#c88a4a')); R.rect(x0 - 3, y1 + 3, x1 + 3, y1 + 3, hex('#5a3a18')); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); }
  // el cordel con pinzas de arriba
  for (let x = 0; x < 276; x++) { const y = 40 + Math.round(Math.sin(x / 276 * Math.PI) * 4); R.pset(x, y, hex('#8a7a5a')); }
  for (const x of [80, 238]) { R.rect(x - 1, 42, x + 1, 50, hex('#c8a878')); R.rect(x - 1, 42, x + 1, 42, K); }
  // CORREOS: la pared crema con zócalo, los casilleros, el reloj, la ventana y el mostrador
  { const [x0, y0, x1, y1] = L3;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < 116 ? ((x >> 2) % 3 === 0 && by4(x, y) > 0.7 ? hex('#d8caa8') : hex('#e8dcbc')) : y < 126 ? hex('#7a5a3a') : ((y - 126) % 6 === 0 ? hex('#6a4a2a') : (x + (y >> 3) * 7) % 23 === 0 ? hex('#6a4a2a') : hex('#9a7248')));
    R.rect(x0, 115, x1, 115, hex('#5a3a1a'));
    // la ventana con la calle nevada
    caja(16, 62, 44, 94, hex('#9ab8d0')); for (let y = 63; y < 94; y++) for (let x = 17; x < 44; x++) R.pset(x, y, y > 84 ? (by4(x, y) > 0.4 ? hex('#eef2f6') : hex('#d4dce6')) : y > 72 ? hex('#a87a5a') : by4(x, y) > 0.5 ? hex('#aac4d8') : hex('#9ab8d0'));
    for (let x = 18; x < 44; x += 6) R.rect(x, 74, x + 3, 78, hex('#e8d890')); R.rect(30, 62, 30, 94, K); R.rect(16, 78, 44, 78, K);
    // el reloj de pared
    R.disco(60, 66, 7, K); R.disco(60, 66, 6, hex('#f4f0e0')); R.pset(60, 61, K); R.pset(65, 66, K); R.pset(60, 71, K); R.pset(55, 66, K);
    // el cartel del sello (sin letras: un sello dentado con un águila y el número)
    caja(70, 58, 90, 84, hex('#f4f0e0')); for (let k = 70; k <= 90; k += 2) { R.pset(k, 57, hex('#e8dcbc')); R.pset(k, 85, hex('#e8dcbc')); } R.rect(73, 61, 87, 81, hex('#3a5a9a')); R.poligono([[76, 72], [80, 66], [84, 72], [80, 76]], hex('#e8e0c8'));
    // los casilleros con las cartas
    caja(96, 58, 146, 102, hex('#6a4a2a'));
    for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const x = 97 + i * 8, y = 59 + j * 8; R.rect(x, y, x + 6, y + 6, hex('#2a1a0e')); if (ha(i, j, 4) > 0.35) { R.rect(x + 1, y + 2, x + 5, y + 6, ha(i, j, 5) > 0.5 ? hex('#f4f0e0') : hex('#e8c8c8')); R.pset(x + 4, y + 3, hex('#c83a3a')); } }
    // el mostrador de madera con la báscula, el tampón y los sellos
    R.rect(54, 104, x1, 127, K); R.rect(55, 105, x1, 107, hex('#b8885a')); R.rect(55, 108, x1, 127, hex('#8a5a2a'));
    for (let x = 60; x < x1 - 18; x += 22) { R.rect(x, 112, x + 16, 124, hex('#7a4a22')); R.rect(x, 112, x + 16, 112, hex('#a87444')); }
    caja(118, 96, 132, 103, hex('#8a929c')); R.rect(121, 93, 129, 95, hex('#c8a040')); R.pset(125, 92, K);
    caja(60, 100, 68, 103, hex('#3a3a46')); R.rect(72, 101, 78, 103, hex('#c83a3a'));
    // el carro de la correspondencia en la esquina
    caja(16, 128, 40, 146, hex('#a89a7a')); for (let x = 17; x < 40; x += 3) R.linea(x, 129, x, 146, hex('#8a7a5a')); R.disco(20, 150, 3, K); R.disco(36, 150, 3, K);
  }
  // EL POZO DE GAS: el cielo de invierno, los pinos, el campo, los depósitos, la torre y la antorcha
  { const [x0, y0, x1, y1] = D3;
    const cie = ['#8ab0d0', '#a4c2dc', '#c0d6e8', '#d8e6f0'].map(hex);
    for (let y = y0; y <= 104; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (104 - y0) * 3, i = Math.floor(v); R.pset(x, y, cie[Math.min(3, i + (v - i > by4(x, y) ? 1 : 0))]); }
    for (let x = x0; x <= x1; x++) { const hgt = 3 + Math.round(ha(x >> 1, 0, 12) * 7); for (let j = 0; j < hgt; j++) R.pset(x, 104 - j, j > hgt - 3 && x % 2 ? hex('#3a5a4a') : hex('#2e4a3e')); }
    for (let y = 105; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (y - 105) % 5 === 0 && x % 3 ? hex('#c8d0d8') : by4(x, y) > 0.55 ? hex('#e8eef2') : hex('#dce4ea'));
    for (let k = 0; k < 24; k++) { const x = x0 + Math.round(ha(k, 1, 13) * (x1 - x0)), y = 108 + Math.round(ha(k, 2, 13) * 46); R.linea(x, y, x + 1, y - 3, hex('#8a7a5a')); }
    // los depósitos blancos con su escalera
    for (const dx of [176, 196]) { caja(dx, 110, dx + 16, 138, hex('#e8e8e4')); R.rect(dx, 110, dx + 3, 138, hex('#ffffff')); R.rect(dx + 13, 110, dx + 16, 138, hex('#b8b8b4')); R.rect(dx, 108, dx + 16, 109, hex('#c8c8c4')); for (let y = 112; y < 138; y += 3) R.pset(dx + 8, y, hex('#8a8a86')); }
    // las tuberías y el árbol de válvulas
    R.rect(212, 136, 262, 138, hex('#8a929c')); R.rect(212, 136, 262, 136, hex('#c8d2dc')); R.rect(212, 139, 262, 139, K);
    caja(226, 120, 232, 140, hex('#c83a3a')); caja(222, 126, 236, 129, hex('#e8b830')); R.disco(229, 118, 4, K); R.disco(229, 118, 3, hex('#e8b830')); R.rect(226, 117, 232, 117, K);
    // la torre de celosía
    const top = 64, base = 140, tx = 266;
    for (let y = top; y <= base; y++) { const w = Math.round(2 + (y - top) / (base - top) * 12); R.pset(tx - w, y, K); R.pset(tx + w, y, K); if ((y - top) % 8 === 0) R.linea(tx - w, y, tx + w, y, hex('#5a5a62')); if ((y - top) % 8 === 4) { R.linea(tx - w, y, tx + w, y - 4, hex('#7a7a82')); } }
    R.rect(tx - 4, top - 3, tx + 4, top, hex('#5a5a62'));
    // la antorcha
    R.rect(296, 74, 298, 140, hex('#8a929c')); R.rect(295, 72, 299, 74, K);
    // la valla de alambre, los ventisqueros con su sombra azul y las rodadas
    for (let x = x0 + 2; x < x1; x += 12) { R.rect(x, 104, x + 1, 113, hex('#6a5a44')); R.pset(x, 104, hex('#f4f8fc')); }
    for (let x = x0; x <= x1; x++) { R.pset(x, 107 + (x % 12 === 6 ? 1 : 0), hex('#5a5a62')); R.pset(x, 110 + (x % 12 === 6 ? 1 : 0), hex('#5a5a62')); }
    for (const [dx, dy, w] of [[180, 146, 22], [214, 152, 18], [252, 148, 26], [284, 154, 16]]) for (let i = -w; i <= w; i++) { if (dx + i < x0 || dx + i > x1) continue; const hh = Math.round((1 - (i / w) ** 2) * 5); for (let j = 0; j < hh; j++) R.pset(dx + i, dy - j, j === hh - 1 ? hex('#ffffff') : i > w * 0.3 ? hex('#b8c8dc') : hex('#f4f8fc')); }
    for (let x = x0; x < 268; x++) { const y = 150 + Math.round(Math.sin(x * 0.04) * 3); R.pset(x, y, hex('#a8b8c8')); R.pset(x, y + 4, hex('#a8b8c8')); }
    // la camioneta de la empresa aparcada junto a la torre
    { const vx = 276, vy = 150; R.rect(vx - 1, vy - 11, vx + 27, vy - 2, K); R.rect(vx, vy - 10, vx + 26, vy - 3, hex('#c8a040')); R.rect(vx + 14, vy - 16, vx + 25, vy - 10, K); R.rect(vx + 15, vy - 15, vx + 24, vy - 10, hex('#c8a040')); R.rect(vx + 17, vy - 14, vx + 23, vy - 11, hex('#8ac0e0'));
      R.rect(vx, vy - 10, vx + 26, vy - 10, hex('#e8c860')); R.rect(vx + 2, vy - 9, vx + 12, vy - 8, hex('#f4f8fc')); for (const wx of [vx + 5, vx + 21]) { R.disco(wx, vy - 2, 3, K); R.disco(wx, vy - 2, 1, hex('#8a929c')); } R.pset(vx + 26, vy - 6, hex('#f8e8a0')); }
  }
  R.usar(prev); return bf;
};
const panel = (rect, a) => { if (a <= 0) return; const [x0, y0, x1, y1] = rect; const nav = hex('#14162e'); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), nav, a)); };
const subeSaca = b(0.14), luzMarty = b(0.3), despliega = b(0.451);
const q3 = (t) => {
  if (!F3) F3 = fondo3(); R.copiar(F3);
  // el cielo de noche vivo, entre la barra y el cordel: la luna creciente, nubes de tres tonos a tres velocidades,
  // estrellas que titilan y un avión con su piloto rojo (todo fuera de la zona de Atom)
  R.disco(222, 27, 8, hex('#2c3060')); R.disco(222, 27, 6, hex('#f0ead0')); R.disco(225, 25, 5, hex('#1e2244')); R.pset(219, 25, hex('#d8d0b0')); R.pset(220, 30, hex('#d8d0b0'));
  for (const [k, vel, y0, tonos] of [[0, 1.5, 22, ['#2e3266', '#3a3e74', '#4a4e86']], [1, 3, 30, ['#34386e', '#42467e', '#565a94']], [2, 5, 36, ['#3a3e76', '#4a4e88', '#6266a2']]]) {
    for (let n = 0; n < 3; n++) { const cx = Math.round((n * 130 + k * 60 + t * vel) % 400) - 40, cy = y0 + (n % 2) * 2; if (cx > 256) continue;
      R.disco(cx, cy + 1, 5 - k, hex(tonos[0])); R.disco(cx - 7, cy + 2, 4 - k * 0.5, hex(tonos[0])); R.disco(cx + 6, cy + 1, 4 - k * 0.5, hex(tonos[1])); R.disco(cx, cy - 1, 3, hex(tonos[2])); } }
  for (let k = 0; k < 16; k++) { const x = 6 + Math.round(ha(k, 5, 33) * 260), y = 17 + Math.round(ha(k, 6, 33) * 20); if (Math.sin(t * 2.6 + k * 1.7) > 0.4) { R.pset(x, y, hex('#e8ecff')); if (k % 4 === 0) { R.pset(x - 1, y, hex('#8a8eb8')); R.pset(x + 1, y, hex('#8a8eb8')); } } }
  { const ax = Math.round((t * 16) % 330) - 10, ay = 19 + Math.round(ax * 0.02); if (ax < 262) { R.rect(ax - 3, ay, ax + 3, ay, hex('#8a8eb0')); R.pset(ax, ay - 1, hex('#8a8eb0')); R.pset(ax, ay + 1, hex('#8a8eb0')); if (Math.floor(t * 3) % 2) R.pset(ax + 3, ay, hex('#ff4a4a')); } }
  // las ventanas del pueblo de abajo, que se encienden y se apagan
  for (const [x, w, hh] of [[4, 18, 12], [30, 14, 18], [60, 22, 10], [96, 16, 14], [150, 20, 16], [184, 14, 10], [214, 24, 14], [252, 16, 18], [286, 22, 12]]) {
    for (let j = 0; j < 2; j++) { const wx = x + 3 + j * Math.max(5, w - 8), wy = 171 - hh + 3; if (Math.sin(t * 0.7 + x * 0.3 + j * 2) > -0.3) { R.rect(wx, wy, wx + 2, wy + 2, hex('#f0c060')); R.pset(wx, wy, hex('#f8e0a0')); } } }
  // CORREOS: el compañero detrás del mostrador sella cartas; Rick entra con la saca, la sube y las cartas vuelan
  R.recorte(L3);
  const sella = Math.floor(t * 1.6) % 2 === 0;
  R.actor(EL.oficinista, 86, 118, t, { dir: 1, dedo: sella, sonrisa: t > subeSaca + 0.6 });
  R.rect(54, 104, 150, 107, hex('#b8885a')); R.rect(54, 104, 150, 104, K);
  const u = tramo(t, Q3 + 0.05, subeSaca - 0.1), xr = Math.round(lerp(2, 76, u));
  const arriba = tramo(t, subeSaca - 0.1, subeSaca + 0.35);
  R.actor(EL.rick, xr, 150, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t > subeSaca, brazos: t > subeSaca + 0.8 && t < luzMarty - 0.2 && Math.floor(t * 3) % 2 === 0 });
  // la saca de lona gris azulada: al hombro, y luego sobre el mostrador
  { const sx = Math.round(lerp(xr - 6, 104, arriba)), sy = Math.round(lerp(132, 92, arriba) - Math.sin(arriba * Math.PI) * 10);
    R.poligono([[sx - 1, sy - 1], [sx + 13, sy - 1], [sx + 15, sy + 15], [sx - 3, sy + 15]], K);
    R.poligono([[sx, sy], [sx + 12, sy], [sx + 14, sy + 14], [sx - 2, sy + 14]], (x, y) => ((x + y) % 5 === 0 ? hex('#5a6a7a') : x < sx + 3 ? hex('#8a9aaa') : hex('#6e7e8e')));
    R.rect(sx + 2, sy + 1, sx + 10, sy + 2, hex('#4a3a2a')); R.rect(sx + 4, sy + 6, sx + 8, sy + 9, hex('#e8e4d8')); R.pset(sx + 6, sy + 7, hex('#3a5a9a'));
    if (arriba < 1) R.linea(sx + 8, sy, xr + 9, 132, hex('#4a3a2a')); }
  // las cartas que vuelan de la saca a los casilleros
  if (t > subeSaca + 0.3) for (let k = 0; k < 6; k++) { const f = tramo(t, subeSaca + 0.3 + k * 0.18, subeSaca + 1.1 + k * 0.18); if (f <= 0 || f >= 1) continue; const x = Math.round(lerp(110, 100 + (k % 6) * 8, f)), y = Math.round(lerp(92, 62 + (k % 4) * 8, f) - Math.sin(f * Math.PI) * 14); R.icono('sobre', x, y, hex('#f4f0e0'), K, 1); }
  // el reloj que corre
  { const an = t * 1.2; R.linea(60, 66, 60 + Math.round(Math.cos(an) * 4), 66 + Math.round(Math.sin(an) * 4), K); }
  R.recorte(null);
  // EL POZO DE GAS: la antorcha, Marty con los planos y el operario en la válvula
  R.recorte(D3);
  const enc = tramo(t, despliega, despliega + 0.4);
  { const fx = 297, fy = 70; for (let k = 0; k < 8; k++) { const f = (t * 3 + k / 8) % 1, hgt = (3 + 5 * enc) * (1 - f); R.pset(fx + Math.round(Math.sin(t * 9 + k) * 1.5), Math.round(fy - f * (6 + 8 * enc)), f < 0.3 ? hex('#fff0a0') : f < 0.6 ? hex('#f8a83a') : hex('#e85a2a')); if (hgt > 3) R.pset(fx + 1, Math.round(fy - f * 6), hex('#f8c84a')); } }
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1; R.pset(297 + Math.round(f * 8), 58 - Math.round(f * 12), hex('#b8c0c8')); }
  for (let k = 0; k < 2; k++) { const cx = Math.round((t * (3 + k * 2) + k * 70) % 160) + 160, cy = 64 + k * 10; R.disco(cx, cy, 5, hex('#e8eef4')); R.disco(cx + 6, cy + 1, 4, hex('#f4f8fc')); R.disco(cx - 5, cy + 2, 3, hex('#d0dce6')); }
  if (Math.floor(t * 2) % 2) R.pset(266, 62, hex('#ff3a3a'));
  R.actor(EL.operario, 238, 140, t, { dir: -1, dedo: Math.sin(t * 2) > 0 });
  const xm = Math.round(lerp(310, 206, tramo(t, luzMarty - 0.3, despliega - 0.2)));
  R.actor(EL.marty, xm, 156, t, { dir: -1, anda: t > luzMarty - 0.3 && t < despliega - 0.2, sonrisa: t > despliega, habla: t > despliega + 0.4 && Math.sin(t * 8) > 0 });
  // los planos: enrollados bajo el brazo y luego abiertos delante de él
  if (enc <= 0) { R.poligono([[xm - 2, 141], [xm + 12, 141], [xm + 12, 144], [xm - 2, 144]], K); R.poligono([[xm - 1, 142], [xm + 11, 142], [xm + 11, 143], [xm - 1, 143]], hex('#5a8ac8')); }
  else { const w = Math.round(4 + 26 * enc), px0 = xm - 4 - w; caja(px0, 128, xm - 4, 146, hex('#3a6aa8')); for (let y = 130; y < 146; y += 4) R.linea(px0 + 2, y, xm - 6, y, hex('#8ab0e0')); if (enc > 0.6) { R.linea(px0 + w / 2, 130, px0 + w / 2, 144, hex('#e8f0f8')); R.poligono([[px0 + w / 2 - 4, 136], [px0 + w / 2, 130], [px0 + w / 2 + 4, 136]], hex('#e8f0f8')); } }
  R.recorte(null);
  // la luz: primero el cuadro de Rick; en «Marty» se apaga un poco y se enciende el de Marty
  panel(L3, 0.45 * tramo(t, luzMarty, luzMarty + 0.4));
  panel(D3, 0.62 * (1 - tramo(t, luzMarty, luzMarty + 0.4)));
};
// 4 · el inserto de la mesa: el plano de la isla, el del pozo de gas y el dinero
let F4 = null;
const MAPA = [22, 56, 176, 170];
const fondo4 = () => {
  const bf = R.nuevo(), prev = R.usar(bf);
  // la mesa de tablones: vetas, nudos, juntas y la luz de la ventana en diagonal
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 26), yy = y % 26, vet = Math.sin(x * 0.045 + tb * 3 + Math.sin(x * 0.013 + tb) * 2 + yy * 0.35);
    let col = yy === 0 ? hex('#3a2414') : yy === 1 ? hex('#6a4426') : vet > 0.75 ? hex('#7a5030') : vet < -0.8 ? hex('#a87648') : tb % 2 ? hex('#946238') : hex('#8a5a32');
    const luz = (x + y * 0.8) % 260; if (luz > 150 && luz < 214 && by4(x, y) > 0.5) col = mez(col, hex('#f0c890'), 0.28); R.pset(x, y, col); }
  for (const [x, y] of [[60, 14], [250, 94], [190, 168], [300, 150]]) { R.disco(x, y, 3, hex('#5a3418')); R.disco(x, y, 2, hex('#7a4a28')); R.pset(x, y, hex('#3a2010')); }
  // el plano de la isla en papel viejo con sus chinchetas
  { const [x0, y0, x1, y1] = MAPA; R.rect(x0 + 3, y0 + 3, x1 + 3, y1 + 3, hex('#4a2c18'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = ha(x >> 1, y >> 1, 21); R.pset(x, y, q > 0.94 ? hex('#d8c898') : by4(x, y) > 0.85 ? hex('#e8dcb4') : hex('#f0e6c4')); }
    R.rect(x0, y0, x1, y0, K); R.rect(x0, y1, x1, y1, K); R.rect(x0, y0, x0, y1, K); R.rect(x1, y0, x1, y1, K);
    // el mar tramado y la isla
    for (let y = y0 + 6; y <= y1 - 6; y++) for (let x = x0 + 6; x <= x1 - 6; x++) R.pset(x, y, (x + y) % 4 === 0 ? hex('#8ab0c8') : hex('#c8dce4'));
    const isla = [[48, 96], [70, 80], [96, 78], [118, 70], [146, 78], [158, 96], [150, 120], [134, 136], [108, 150], [80, 146], [58, 132], [44, 114]];
    R.poligono(isla.map(([x, y]) => [x - 1, y]), hex('#5a6a3a')); R.poligono(isla, (x, y) => (ha(x >> 2, y >> 2, 23) > 0.7 ? hex('#7a9a4a') : hex('#9ab868')));
    for (let i = 0; i < isla.length; i++) { const [ax, ay] = isla[i], [bx, by] = isla[(i + 1) % isla.length]; R.linea(ax, ay, bx, by, hex('#4a5a2a')); }
    for (let k = 0; k < 26; k++) { const x = 58 + Math.round(ha(k, 1, 24) * 90), y = 86 + Math.round(ha(k, 2, 24) * 54); if (R.pget(x, y) !== hex('#c8dce4') && R.pget(x, y) !== hex('#8ab0c8')) { R.disco(x, y, 2, hex('#4a7a3a')); R.pset(x - 1, y - 1, hex('#7aaa5a')); } }
    // la cuadrícula de lápiz con sus números
    for (let x = x0 + 26; x < x1; x += 26) for (let y = y0 + 2; y < y1; y += 2) R.pset(x, y, hex('#9a9a8a'));
    for (let y = y0 + 24; y < y1; y += 24) for (let x = x0 + 2; x < x1; x += 2) R.pset(x, y, hex('#9a9a8a'));
    for (let i = 1; i <= 5; i++) R.numero(String(i), x0 + 26 * i - 12, y0 + 10, { color: hex('#5a5a4a'), sombra: false, fina: true });
    // la rosa de los vientos
    { const rx = 156, ry = 150; R.linea(rx, ry - 8, rx, ry + 8, hex('#5a5a4a')); R.linea(rx - 8, ry, rx + 8, ry, hex('#5a5a4a')); R.poligono([[rx - 2, ry], [rx, ry - 9], [rx + 2, ry]], hex('#c83a3a')); }
    // las chinchetas de las esquinas
    for (const [x, y] of [[x0 + 4, y0 + 4], [x1 - 4, y0 + 4], [x0 + 4, y1 - 4], [x1 - 4, y1 - 4]]) { R.disco(x, y, 2, K); R.pset(x, y, hex('#c83a3a')); R.pset(x - 1, y - 1, hex('#f08a8a')); }
  }
  // la taza de café vista desde arriba, el lápiz, el casco y la regla
  R.disco(292, 170, 12, hex('#3a2010')); R.disco(290, 168, 11, K); R.disco(290, 168, 10, hex('#e8e4d8')); R.disco(290, 168, 7, hex('#5a3418')); R.disco(288, 166, 3, hex('#7a4a28')); R.rect(276, 164, 280, 171, K); R.rect(277, 165, 279, 170, hex('#e8e4d8'));
  R.linea(186, 164, 238, 152, K); R.linea(186, 165, 238, 153, hex('#e8c040')); R.linea(187, 166, 238, 154, hex('#c89a20')); R.pset(239, 152, hex('#e88a9a')); R.pset(185, 165, hex('#3a3a3a'));
  R.rect(198, 170, 262, 176, K); R.rect(199, 171, 261, 175, hex('#e8d8a8')); for (let x = 200; x < 262; x += 4) R.rect(x, 171, x, x % 16 === 0 ? 174 : 172, hex('#5a4a2a'));
  // la saca de correos de Rick en la esquina de abajo a la izquierda, con una carta
  R.poligono([[0, 150], [20, 146], [24, 180], [0, 180]], (x, y) => ((x + y) % 5 === 0 ? hex('#5a6a7a') : hex('#6e7e8e'))); R.rect(0, 150, 20, 152, hex('#4a3a2a'));
  caja(4, 160, 16, 168, hex('#f4f0e0')); R.linea(4, 160, 10, 165, hex('#b8b0a0')); R.linea(16, 160, 10, 165, hex('#b8b0a0')); R.rect(13, 161, 15, 163, hex('#c83a3a'));
  R.usar(prev); return bf;
};
// el plano del pozo de gas en papel azul: la torre, la tubería que baja por los estratos y la bolsa de gas
const PLANO = [178, 50, 304, 150];
const planoGas = (xr, t, luz) => {
  const [x0, y0, x1, y1] = PLANO; if (xr <= x0 + 2) return;
  R.rect(x0 + 3, y0 + 3, xr + 3, y1 + 3, hex('#3a2414'));
  R.rect(x0, y0, xr, y1, hex('#2a5aa0'));
  R.recorte([x0, y0, xr, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= xr; x++) { if ((x - x0) % 10 === 0 || (y - y0) % 10 === 0) R.pset(x, y, hex('#3a6ab0')); }
  const W = hex('#e8f0f8'), Wd = hex('#a8c8e8'), cx = 236;
  R.linea(x0 + 6, 74, x1 - 6, 74, W);
  for (let y = y0 + 8; y < 74; y++) { const w = Math.round(2 + (y - y0 - 8) / (74 - y0 - 8) * 9); R.pset(cx - w, y, W); R.pset(cx + w, y, W); if ((y - y0) % 5 === 0) R.linea(cx - w, y, cx + w, y, Wd); }
  for (const [yy, a] of [[90, 0.2], [104, 0.5], [118, 0.9]]) for (let x = x0 + 6; x < x1 - 6; x++) R.pset(x, yy + Math.round(Math.sin(x * 0.08 + a * 6) * 2), (x % 3) ? Wd : W);
  R.linea(cx - 1, 74, cx - 1, 128, W); R.linea(cx + 1, 74, cx + 1, 128, W);
  // la bolsa de gas en forma de cúpula, que se enciende en «natural gas»
  for (let y = 124; y <= 142; y++) for (let x = 204; x <= 268; x++) { const e = ((x - 236) / 32) ** 2 + ((y - 142) / 18) ** 2; if (e < 1 && e > 0.82) R.pset(x, y, W); else if (e <= 0.82 && luz > 0 && by4(x, y) < luz * (0.5 + 0.3 * Math.sin(t * 8))) R.pset(x, y, hex('#f8a83a')); }
  if (luz > 0.5) { const fy = Math.round(y0 + 3 - Math.sin(t * 10)); R.icono('fuego', cx - 3, fy, hex('#f8a83a'), hex('#c83a2a'), 1); }
  // las cotas de profundidad
  for (const [y, n] of [[90, '1'], [104, '2'], [118, '3']]) R.numero(n, x1 - 12, y + 3, { color: W, sombra: false, fina: true });
  R.recorte(null);
  R.rect(x0, y0, xr, y0, K); R.rect(x0, y1, xr, y1, K); R.rect(x0, y0, x0, y1, K);
};
const rodillo = (x) => { R.rect(x - 4, PLANO[1] - 3, x + 4, PLANO[3] + 3, K); R.rect(x - 3, PLANO[1] - 2, x + 3, PLANO[3] + 2, hex('#3a6ab0')); R.rect(x - 3, PLANO[1] - 2, x - 2, PLANO[3] + 2, hex('#6a9ad0')); R.rect(x + 2, PLANO[1] - 2, x + 3, PLANO[3] + 2, hex('#1e4a80')); };
const gas = b(0.659), dinero = b(0.836);
const q4 = (t) => {
  if (!F4) F4 = fondo4(); R.copiar(F4);
  // la cruz del pozo en el plano de la isla, que late
  { const [px, py] = [100, 108], l = Math.floor(t * 3) % 2; R.linea(px - 4 - l, py - 4 - l, px + 4 + l, py + 4 + l, hex('#c83a3a')); R.linea(px - 4 - l, py + 4 + l, px + 4 + l, py - 4 - l, hex('#c83a3a')); R.linea(px - 3, py - 4, px + 5, py + 4, hex('#c83a3a')); }
  // el vapor del café
  for (let k = 0; k < 6; k++) { const f = (t * 0.5 + k / 6) % 1; R.pset(290 + Math.round(Math.sin(f * 7 + k) * 3), 164 - Math.round(f * 18), f < 0.5 ? hex('#f4ece0') : hex('#c8b8a0')); }
  // el plano azul que se desenrolla rodando de izquierda a derecha
  const ab = tramo(t, Q4 + 0.1, Q4 + 0.8), xr = Math.round(lerp(PLANO[0] + 6, PLANO[2], ab));
  planoGas(xr, t, tramo(t, gas, gas + 0.4));
  rodillo(xr + 4);
  // la mano de Rick (manga verde) sujeta la esquina del plano de la isla
  T.brazo(R, -8, 196, 26, 160 + Math.round(Math.sin(t * 1.3)), '#4e6a4a', 1, { codo: [8, 176] });
  // la mano de Marty (manga azul): para el rodillo por la derecha y luego deja los fajos junto al pozo
  const ida = tramo(t, Q4 + 0.6, Q4 + 0.9) - tramo(t, dinero - 0.9, dinero - 0.6);
  if (ida > 0) T.brazo(R, 336, 132, Math.round(lerp(340, 310, ida)), 108, '#2a4a7a', -1, { codo: [328, 116] });
  const fajos = [[110, 118], [126, 128], [104, 134]];
  fajos.forEach(([fx, fy], k) => {
    const t0 = dinero - 0.45 + k * 0.45, m = tramo(t, t0, t0 + 0.4);
    if (t < t0) return;
    const x = Math.round(lerp(170, fx, m)), y = Math.round(lerp(180, fy, m));
    R.rect(x + 2, y + 2, x + 26, y + 14, hex('#3a2a18'));
    for (let c = 2; c >= 0; c--) { R.rect(x - 1 + c, y - 1 - c, x + 25 + c, y + 13 - c, K); R.rect(x + c, y - c, x + 24 + c, y + 12 - c, c ? hex('#5a8a4a') : hex('#6a9a5a')); }
    R.rect(x, y, x + 24, y, hex('#9ac88a')); R.rect(x + 2, y + 2, x + 22, y + 10, hex('#5a8a4a')); R.rect(x + 2, y + 2, x + 22, y + 2, hex('#7aaa6a'));
    R.disco(x + 6, y + 6, 3, hex('#9ac88a')); R.disco(x + 6, y + 6, 2, hex('#5a8a4a')); R.rect(x + 11, y, x + 14, y + 12, hex('#e8e4d8')); R.rect(x + 11, y, x + 11, y + 12, hex('#c8c4b8'));
    R.numero('$', x + 21, y + 10, { color: hex('#1e4a1e'), sombra: false });
    // la mano de Marty empuja el fajo; con el último se queda apoyada encima
    if (m < 1 || (k === 2 && t < t0 + 1.4)) T.brazo(R, x + 40, y + 44, x + 20, y + 10, '#2a4a7a', -1, { codo: [x + 40, y + 24] });
  });
};
const año = (t) => t < Q2 ? Math.round(lerp(1965, 2006, tramo(t, 0.2, 1.6))) : t < Q3 ? Math.round(lerp(2014, 2026, tramo(t, temporadas, docena + 0.3))) : 2026;
const efectos = [[mano, 'palmada'], [Q2 + 0.3, 'maquina'], [claqueta, 'golpecito'], [temporadas + 0.2, 'bip'], [Q3 + 0.4, 'sello'], [subeSaca + 0.2, 'papel'], [luzMarty, 'interruptor'], [despliega, 'papel'], [Q4 + 0.15, 'whoosh'], [gas, 'brillo'], [dinero - 0.3, 'golpecito'], [dinero + 0.6, 'golpecito']];
T.rodar(E, R, [[0, q1], [Q2, q2], [Q3, q3], [Q4, q4]], { efectos, año });
''')
