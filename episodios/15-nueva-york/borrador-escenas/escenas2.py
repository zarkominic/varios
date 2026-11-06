E = {}

# Ayudas comunes de las dos escenas (fondos locales en búfer, cielos tramados, nubes de tres tonos a tres velocidades,
# gaviotas, agua viva). Se pegan delante del cuerpo de cada escena.
AYUDA = r'''
import { TOCADOS } from '/atomo/plato/kits/pixel-chibi.js';
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], um = (x, y) => (BY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const grad = (x, y, cols, f) => { const g = Math.max(0, Math.min(cols.length - 1.001, f * (cols.length - 1))), i = Math.floor(g); return g - i > um(x, y) ? cols[i + 1] : cols[i]; };
const X = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));
const K = X({
  k: '#1c1424', blanco: '#f4f0e6', crema: '#e8dcb8', cremaS: '#c8b890', papel: '#efe4c4', papelS: '#d4c49c', papelL: '#fbf4dc',
  cielo: ['#3a78c4', '#4686ce', '#5694d6', '#68a4de', '#7cb2e4', '#94c2ea', '#b0d2ec', '#cde0ea'],
  sierra: '#7f9cbc', sierraS: '#6a86a8', sierraL: '#a4bcd4',
  agua: ['#7ab0cc', '#5e98ba', '#4a84aa', '#3a6e8e', '#2e5c7a', '#24506a'], aguaL: '#a8d0e0', aguaS: '#1e4258', espuma: '#eef4f2',
  bosque: '#3a6a3a', bosqueS: '#28502c', bosqueL: '#5a8a4a', bosqueLL: '#86b060', hierba: '#6a9a44', hierbaS: '#4e7a34', hierbaL: '#90bc5a',
  roca: '#7a7a82', rocaS: '#55555e', rocaL: '#a2a2a8', arena: '#e2cc94', arenaS: '#c4a870', arenaL: '#f2e2b4',
  tierra: '#8a6440', tierraS: '#6a4a2c', tierraL: '#aa8458', madera: '#8a5a34', maderaS: '#5e3a20', maderaL: '#b07a48',
  piel: '#7a5634', pielS: '#523820', pielL: '#9c7448', rojo: '#c8303a', rojoS: '#8a1e26', naranja: '#e8783a', azul: '#2a4a9a',
  oro: '#e8b830', oroS: '#a8801c', oroL: '#fff0a0', cobre: '#c8784a', cobreL: '#f0b080', cobreS: '#8a4a2a', flor1: '#f0e8f0', flor2: '#f08aa8', flor3: '#f2d24a',
});
// un fondo fijo pintado una vez en su búfer (R.usar devuelve el anterior: nunca R.usar() a secas)
const BUF = new Map();
const fijo = (clave, pinta) => { let b = BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); BUF.set(clave, b); } R.copiar(b); };
// nubes de tres tonos: [x0, y, w, v]; avanzan desde t0; ninguna llega a la zona de Atom (se paran antes de x 250 si van altas)
const nubes = (t, t0, L) => { for (const [x0, y, w, v] of L) { let x = x0 + (t - t0) * v; if (y < 54 && x > 250 - w * 0.6) x = 250 - w * 0.6; R.nube(Math.round(x), y, w); } };
const gaviotas = (t, L) => { for (const [x0, y0, v, k] of L) { const x = Math.round(((x0 + t * v) % 380 + 380) % 380 - 30), y = Math.round(y0 + Math.sin(t * 0.9 + k * 2) * 3); if (x > 266 && y < 50) continue; R.gaviota(x, y, t, k); } };
// cielo tramado de arriba (y0) abajo (y1) con cirros quietos
const cieloFijo = (y1, cols = K.cielo) => { for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, cols, y / y1));
  for (let k = 0; k < 7; k++) { const cx = 20 + k * 37 + Math.round(H(k, 1) * 20), cy = 20 + Math.round(H(k, 2) * (y1 * 0.5)); if (cx > 262 && cy < 52) continue; for (let i = -14; i <= 14; i++) if (H(i, k) > 0.35) R.pset(cx + i, cy + Math.round(i * 0.12), K.cielo[Math.min(7, 6 + (i & 1))]); } };
// copa de árbol de tres tonos (luz arriba a la izquierda)
const copa = (cx, cy, r, s = 0) => { const B = [[0, 0, 1], [-0.62, 0.28, 0.62], [0.62, 0.24, 0.66], [-0.3, -0.52, 0.56], [0.36, -0.46, 0.52], [0, 0.5, 0.6]].map(([a, b2, q]) => [Math.round(cx + a * r), Math.round(cy + b2 * r), Math.max(2, Math.round(q * r * (0.85 + H(a * 9, s, 3) * 0.3)))]);
  for (const [x, y, q] of B) R.disco(x, y, q + 1, K.k);
  for (const [x, y, q] of B) for (let j = -q; j <= q; j++) for (let i = -q; i <= q; i++) { if (i * i + j * j > q * q) continue; const gx = x + i, gy = y + j, l = (-(gx - cx) - (gy - cy) * 1.2) / (r * 1.6) + (-i - j) / (q * 3) + (H(gx >> 1, gy >> 1, s) - 0.5) * 0.7; R.pset(gx, gy, l > 0.5 ? K.bosqueLL : l > 0.1 ? K.bosqueL : l > -0.4 ? K.bosque : K.bosqueS); }
  for (let k = 0; k < r * 2; k++) { const a = H(k, s, 7) * 6.28, d = H(k, s, 8) * r * 0.9, x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d); if (R.pget(x, y) !== K.k) { R.pset(x, y, K.bosqueS); R.pset(x - 1, y - 1, K.bosqueLL); } } };
// matas y arbustos sueltos, piedras y troncos caídos en una franja (para que la hierba no quede lisa)
const matas = (x0, y0, x1, y1, n, sem = 1) => { for (let k = 0; k < n; k++) { const x = x0 + Math.floor(H(k, 61, sem) * (x1 - x0)), y = y0 + Math.floor(H(k, 62, sem) * (y1 - y0)), q = H(k, 63, sem), r = 3 + Math.floor(H(k, 64, sem) * 4);
  if (q < 0.55) { for (const [dx, dy, rr] of [[0, 0, r], [-r + 1, 1, r - 1], [r - 1, 1, r - 1]]) R.disco(x + dx, y + dy, rr + 1, K.k); for (const [dx, dy, rr] of [[0, 0, r], [-r + 1, 1, r - 1], [r - 1, 1, r - 1]]) R.disco(x + dx, y + dy, rr, K.hierbaS); R.disco(x - 1, y - 1, r - 2, K.hierba); R.pset(x - 2, y - 2, K.hierbaL); if (H(k, 65, sem) < 0.4) { R.pset(x + 1, y - 1, K.flor2); R.pset(x - 3, y + 1, K.flor1); } }
  else if (q < 0.8) { R.disco(x, y, r - 1, K.k); R.disco(x, y, r - 2, K.roca); R.disco(x - 1, y - 1, Math.max(1, r - 3), K.rocaL); R.pset(x + r - 3, y + 1, K.rocaS); }
  else { R.rect(x - r * 2, y - 2, x + r * 2, y + 1, K.k); R.rect(x - r * 2 + 1, y - 1, x + r * 2 - 1, y, K.madera); R.linea(x - r * 2 + 1, y - 1, x + r * 2 - 1, y - 1, K.maderaL); R.disco(x + r * 2, y - 1, 2, K.k); R.disco(x + r * 2, y - 1, 1, K.tierraL); } } };
const tronco = (x, y0, y1, w = 3) => { for (let y = y0; y <= y1; y++) for (let i = -w; i <= w; i++) R.pset(x + i, y, Math.abs(i) === w ? K.k : i < -w / 3 ? K.maderaL : (H(i, y >> 2, x) < 0.25 ? K.maderaS : K.madera)); };
// hierba con matas, flores y piedras en [x0, y0, x1, y1] (suelo con textura, nunca liso)
const pradera = (x0, y0, x1, y1, semilla = 1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const r = H(x >> 1, y, semilla), f = (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, r < 0.12 ? K.hierbaL : r < 0.62 - f * 0.2 ? K.hierba : K.hierbaS); }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 90; k++) { const x = x0 + Math.floor(H(k, 3, semilla) * (x1 - x0)), y = y0 + 2 + Math.floor(H(k, 4, semilla) * (y1 - y0 - 2)), q = H(k, 5, semilla);
    if (q < 0.5) { R.pset(x, y, K.hierbaS); R.pset(x - 1, y - 1, K.hierbaL); R.pset(x + 1, y - 2, K.hierbaL); R.pset(x, y - 2, K.hierba); }
    else if (q < 0.72) { const c = [K.flor1, K.flor2, K.flor3][k % 3]; R.pset(x, y - 1, c); R.pset(x, y, K.hierbaS); }
    else if (q < 0.8) { R.rect(x, y, x + 2, y + 1, K.rocaS); R.rect(x, y, x + 1, y, K.rocaL); } } };
// agua con vetas que corren (vivo): en [x0, y0, x1, y1], v px/s
const vetas = (t, x0, y0, x1, y1, n, v = 6) => { for (let k = 0; k < n; k++) { const y = y0 + Math.floor(H(k, 9) * (y1 - y0)), f = (y - y0) / Math.max(1, y1 - y0), L = 2 + Math.round(f * 6), x = x0 + ((H(k, 8) * (x1 - x0) + t * v * (0.6 + f)) % (x1 - x0)); R.linea(Math.round(x), y, Math.round(x + L), y, k % 3 ? K.aguaL : K.espuma); } };
// un barquito de mapa (el Halve Maen en miniatura) en (x, y), con la tricolor
const BARQUITO = ['....b.....', '...ww.w...', '..www.ww..', '.wwww.www.', '....k.....', 'kkkkkkkkkk', '.khhhhhhk.', '..kkkkkk..'];
const barquito = (x, y, dir = 1) => { R.dibujo(BARQUITO, Math.round(x - 5), Math.round(y - 7), dir, { k: K.k, w: K.blanco, h: K.madera, b: K.naranja }); };
// un fardo de pieles de castor atado (x, y = la base, centro)
const fardo = (x, y) => { R.rect(x - 7, y - 7, x + 7, y, K.k); R.rect(x - 6, y - 6, x + 6, y - 1, K.piel); for (let i = -6; i <= 6; i++) { if (H(i, y) < 0.4) R.pset(x + i, y - 6, K.pielL); if (H(i, y, 2) < 0.4) R.pset(x + i, y - 2, K.pielS); } R.rect(x - 3, y - 7, x - 2, y, K.cremaS); R.rect(x + 3, y - 7, x + 4, y, K.cremaS); R.rect(x - 6, y - 5, x - 4, y - 4, K.pielL); };
// un caldero de cobre pequeño (x, y = el asa)
const caldero = (x, y) => { R.linea(x - 3, y, x + 3, y, K.k); R.pset(x - 4, y + 1, K.k); R.pset(x + 4, y + 1, K.k); R.rect(x - 4, y + 2, x + 4, y + 7, K.k); R.rect(x - 3, y + 3, x + 3, y + 6, K.cobre); R.rect(x - 3, y + 3, x - 2, y + 5, K.cobreL); R.rect(x + 2, y + 5, x + 3, y + 6, K.cobreS); };
// un hacha (x, y = la mano; el mango baja, la hoja arriba)
const hacha = (x, y, dir = 1) => { R.linea(x, y + 5, x, y - 9, K.k); R.linea(x + 1, y + 5, x + 1, y - 9, K.maderaL); R.rect(x + (dir > 0 ? 2 : -6), y - 10, x + (dir > 0 ? 6 : -2), y - 5, K.k); R.rect(x + (dir > 0 ? 2 : -5), y - 9, x + (dir > 0 ? 5 : -2), y - 6, K.rocaL); R.pset(x + (dir > 0 ? 5 : -5), y - 8, K.blanco); };
// el sombrero alto del colono, suelto (el del gag)
const SOMBRERO = TOCADOS.capotain[0];
const sombrero = (x, y, dir, pal) => R.dibujo(SOMBRERO, Math.round(x - 7), Math.round(y - 4), dir, pal);
// salpicadura y anillos en el agua (u 0–1)
const chof = (x, y, u) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + u * 9); for (let a = 0; a < 6.28; a += 0.35) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.35), K.espuma); if (u < 0.45) for (let k = -2; k <= 2; k++) R.pset(x + k * 2, Math.round(y - 2 - (1 - Math.abs(k) / 3) * 8 * Math.sin(u / 0.45 * Math.PI)), K.espuma); };
// destello de cuatro puntas
const destello = (x, y, u) => { if (u <= 0 || u >= 1) return; const l = Math.round(1 + Math.sin(u * Math.PI) * 4); R.linea(x - l, y, x + l, y, K.oroL); R.linea(x, y - l, x, y + l, K.oroL); R.pset(x, y, K.blanco); };
'''

E['ny-hudson'] = ('Hudson', '''// NY-HUDSON (frases 8–9), 1609 → 1613, cartela «1609». Cinco planos:
// 1. el río ancho entre las Palisades: el Halve Maen sube por el agua; en una canoa, dos lenapes dejan de remar y
//    levantan las palas al verlo («another ship arrives»);
// 2. (fondo local) el barco de cerca, de costado, con las Palisades lejos: Hudson en la proa con el catalejo se vuelve
//    al oír su nombre; un marinero echa la sonda (el plomo cae al agua); otro iza la tricolor holandesa en «Dutch»;
// 3. el mapa del noreste: el barquito sube por el Hudson y la ruta se dibuja hasta Albany («his name», chincheta);
//    en «Fur traders follow», dos barquitos más salen detrás;
// 4. (fondo local) la playa del trueque, 1613: un lenape deja un fardo de pieles, el patrón le da un caldero; Juan
//    Rodríguez baja de la barca con sus hachas y saluda en «Juan Rodríguez»;
// 5. la orilla al atardecer: el barco se va; Rodríguez se despide, saca el hacha del tocón («first») y dos lenapes salen
//    del bosque a saludarlo («resident of the island»).''', AYUDA + r'''
const a = (f) => en('hudson', f), b = (f) => en('rodriguez', f);
const P2 = a(0.358), P3 = a(0.734), P4 = b(0.132), P5 = b(0.575);
const OTRO = a(0.13), HENRY = a(0.41), ENGLISH = a(0.526), DUTCH = a(0.64), SAILS = a(0.756), NAME = a(0.957);
const FUR = b(0), Y1613 = b(0.154), SAILOR = b(0.254), JUAN = b(0.47), FIRST = b(0.732), RESIDENT = b(0.875);

// 1 · el río (bahia1524 'rio'): el Halve Maen sube; la canoa lenape en primer término
const p1 = (t) => {
  T.bahia1524(R, t, { encuadre: 'rio' });
  const u = tramo(t, 0, P2), sx = lerp(2.0, 1.55, u);
  T.dauphine(R, Math.round(lerp(204, 160, u)), Math.round(lerp(150, 128, u)), t, { barco: 'halveMaen', s: sx, dir: -1, avanza: true, viento: 0.5 });
  T.canoa(R, 270 - Math.round(t * 3), 112, t, { n: 2, s: 0.6, dir: -1, fase: 1 });
  const ven = t > OTRO;   // al ver el barco dejan de remar y levantan las palas
  T.canoa(R, Math.round(lerp(28, 84, tramo(t, 0, OTRO + 0.4))), 166, t, { n: 2, s: 1.5, dir: 1, rema: !ven, carga: true });
};

// 2 · (fondo local) el Halve Maen de cerca, de costado, río arriba
const fondo2 = () => fijo('h2', () => {
  cieloFijo(96);
  for (let x = 0; x < 320; x++) { const h = 74 + Math.round(Math.sin(x * 0.021) * 6 + Math.sin(x * 0.057 + 1) * 3); for (let y = h; y < 100; y++) R.pset(x, y, (y - h) / 24 > um(x, y) ? K.sierraS : (H(x >> 1, y >> 1, 4) < 0.1 ? K.sierraL : K.sierra)); }
  for (let x = 150; x < 320; x++) { const h = 88 + Math.round(Math.sin(x * 0.05) * 3 + H(x >> 2, 0) * 2) - Math.round((x - 150) * 0.05); for (let y = h; y < 101; y++) { const r = H(x >> 1, y, 3); R.pset(x, y, y === h ? K.k : r < 0.15 ? K.bosqueL : r < 0.6 ? K.bosque : K.bosqueS); } }
  // las Palisades: acantilado de columnas de roca con el bosque encima y un hilo de cascada
  for (let x = 0; x < 158; x++) { const top = 58 + Math.round(Math.sin(x * 0.2) * 1.5) + Math.max(0, x - 112), base = 101;
    for (let y = top; y < base; y++) { const col = (x + (y > 80 ? 3 : 0)) % 7, c = col === 0 ? K.rocaS : col < 3 ? K.rocaL : (H(x, y >> 1, 5) < 0.2 ? K.rocaS : K.roca); R.pset(x, y, y > 92 ? (um(x, y) < (y - 92) / 9 ? K.rocaS : c) : c); }
    for (let y = top - 7 - Math.round(H(x >> 2, 1) * 4); y < top; y++) R.pset(x, y, H(x >> 1, y, 7) < 0.3 ? K.bosqueL : K.bosque);
    R.pset(x, top - 8 - Math.round(H(x >> 2, 1) * 4), K.k); }
  for (let y = 60; y < 100; y++) R.pset(52 + (y % 3 === 0 ? 1 : 0), y, K.blanco);
  // el agua: más oscura cerca, con el reflejo de las rocas
  for (let y = 101; y < 180; y++) for (let x = 0; x < 320; x++) { let c = grad(x, y, K.agua, (y - 101) / 79); if (y < 118 && x < 150 && H(x >> 1, y, 6) < 0.35) c = K.rocaS; R.pset(x, y, c); }
  for (let k = 0; k < 140; k++) { const x = Math.floor(H(k, 1) * 316), y = 104 + Math.floor(H(k, 2) * 74); R.linea(x, y, x + 2 + Math.floor((y - 100) / 14), y, H(k, 3) < 0.5 ? K.aguaL : K.aguaS); }
});
const p2 = (t) => {
  fondo2();
  nubes(t, P2, [[200, 26, 24, 1.5], [10, 40, 26, 3], [96, 58, 26, 5], [200, 64, 30, 6]]);
  gaviotas(t, [[40, 40, 16, 0], [120, 48, 12, 3]]);
  vetas(t, 0, 104, 320, 179, 60, 7);
  const d = T.dauphine(R, 166, 152, t, { barco: 'halveMaen', s: 2, dir: -1, viento: 0.6, avanza: true });
  const [b0, b1] = d.borda, cub = d.cubierta;
  // la tricolor sube por la driza de popa en «Dutch company»
  const sx = b1 - 4, iza = tramo(t, DUTCH - 0.6, DUTCH + 0.3);
  R.linea(sx, cub - 2, sx, cub - 38, K.k); R.linea(sx + 1, cub - 2, sx + 1, cub - 38, K.maderaL);
  { const fy = Math.round(lerp(cub - 12, cub - 37, iza)), o = Math.round(Math.sin(t * 9) * 1); R.rect(sx + 2, fy, sx + 13, fy + 8, K.k);
    R.rect(sx + 2, fy + 1, sx + 12 + o, fy + 2, K.naranja); R.rect(sx + 2, fy + 3, sx + 12 + o, fy + 5, K.blanco); R.rect(sx + 2, fy + 6, sx + 12 + o, fy + 7, K.azul); }
  R.actor(EL.marinero2, b1 - 19, cub, t, { dir: 1, dedo: iza > 0 && iza < 1, sonrisa: iza >= 1 });
  // el marinero echa la sonda: el plomo vuela, cae al agua y lo recoge
  const tira = a(0.47), cae = tira + 0.45;
  const m = R.actor(EL.marinero, b0 + 24, cub, t, { dir: -1, sostiene: true, sorpresa: t > cae && t < cae + 0.5 }).mano;
  const vu = tramo(t, tira, cae), sube = tramo(t, DUTCH - 0.2, P3 - 0.1);
  const px = Math.round(lerp(m[0], b0 - 20, vu)), py = Math.round(lerp(m[1], 156, vu) - Math.sin(vu * Math.PI) * 14 - (t > cae ? lerp(0, 22, sube) * 0 : 0));
  const ly = t > cae ? Math.round(lerp(156, m[1] + 4, sube)) : py;
  R.linea(m[0], m[1], px, ly, K.cremaS); R.rect(px - 1, ly - 1, px + 1, ly + 1, K.k); R.pset(px, ly, K.rocaL);
  chof(b0 - 20, 157, tramo(t, cae, cae + 0.9));
  // Hudson en la proa: mira río arriba con el catalejo; se vuelve al oír su nombre; luego señala la bandera
  const vuelto = t > HENRY && t < DUTCH - 0.2, señala = t > DUTCH - 0.2;
  const hm = R.actor(EL.hudson, b0 + 4, cub, t, { dir: vuelto || señala ? 1 : -1, sostiene: !señala, sonrisa: vuelto, habla: t > ENGLISH && t < DUTCH - 0.3 && Math.sin(t * 8) > 0, dedo: señala }).mano;
  if (!señala) { const dx = vuelto ? 1 : -1; R.rect(Math.min(hm[0], hm[0] + dx * 7), hm[1] - 2, Math.max(hm[0], hm[0] + dx * 7), hm[1], K.k); R.linea(hm[0], hm[1] - 1, hm[0] + dx * 6, hm[1] - 1, K.oro); }
  d.delante();
};

// 3 · el mapa del noreste: la ruta del Hudson hasta Albany y los comerciantes de pieles detrás
const RIO = [[-74.0, 40.7], [-73.93, 41.0], [-73.96, 41.3], [-73.99, 41.5], [-73.94, 41.7], [-73.97, 41.93], [-73.85, 42.2], [-73.79, 42.25], [-73.75, 42.65]];
const en_ruta = (pts, u) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let q = tot * Math.max(0, Math.min(1, u)); for (let i = 1; i < pts.length; i++) { if (q <= L[i - 1]) { const f = q / L[i - 1]; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; } q -= L[i - 1]; } return pts[pts.length - 1]; };
const p3 = (t) => {
  const P = T.mapaNY(R, t, { vista: 'noreste', canal: 0 }), L = RIO.map(P), u = tramo(t, SAILS - 0.1, NAME);
  // la estela dorada de la ruta, gruesa, y el barquito que la recorre
  if (u > 0) { R.ruta(L, u, K.oro, { grueso: true }); }
  const [bx, by] = en_ruta(L, u); barquito(bx, by, 1);
  T.chincheta(R, L[0][0], L[0][1], t, K.rojo, { baja: tramo(t, P3, P3 + 0.4) });
  T.chincheta(R, L[8][0], L[8][1], t, K.oro, { baja: tramo(t, NAME - 0.3, NAME + 0.1), pulso: t > NAME + 0.1 });
  // «Fur traders follow»: dos barquitos más salen de la bahía y suben detrás
  for (const [k, d0] of [[0, 0.1], [1, 0.75]]) { const v = tramo(t, FUR + d0, FUR + d0 + 2.6) * (k ? 0.45 : 0.7); if (t > FUR + d0) { const [x, y] = en_ruta(L, v); barquito(x + (k ? 3 : -3), y, 1); } }
  destello(L[8][0] + 6, L[8][1] - 10, tramo(t, NAME, NAME + 0.6));
};

// 4 · (fondo local) la playa del trueque, 1613
const fondo4 = () => fijo('h4', () => {
  cieloFijo(84);
  for (let x = 0; x < 320; x++) { const h = 72 + Math.round(Math.sin(x * 0.03 + 2) * 4 + Math.sin(x * 0.09) * 2); for (let y = h; y < 90; y++) R.pset(x, y, (y - h) / 18 > um(x, y) ? K.bosqueS : (H(x >> 1, y, 2) < 0.25 ? K.bosqueL : K.sierraS)); R.pset(x, h, K.k); }
  for (let y = 90; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, K.agua, (y - 90) / 60));
  for (let k = 0; k < 90; k++) { const x = Math.floor(H(k, 11) * 316), y = 92 + Math.floor(H(k, 12) * 44); R.linea(x, y, x + 2 + Math.floor((y - 90) / 12), y, H(k, 3) < 0.5 ? K.aguaL : K.aguaS); }
  // la playa: arena tramada, más clara al sol, con la línea de algas, conchas, piedras y un tronco varado
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const sh = 128 + Math.round(Math.sin(x * 0.035) * 3 + (x < 70 ? (70 - x) * 0.25 : 0)); if (y < sh) continue;
    const r = H(x >> 1, y, 21), f = (y - sh) / 50; R.pset(x, y, y < sh + 2 ? K.arenaS : r < 0.12 ? K.arenaL : r < 0.75 - f * 0.2 ? K.arena : K.arenaS); if (y === sh + 3 && H(x, 1, 3) < 0.45) R.pset(x, y, K.hierbaS); }
  for (let k = 0; k < 60; k++) { const x = Math.floor(H(k, 31) * 316), y = 140 + Math.floor(H(k, 32) * 38), q = H(k, 33); if (q < 0.5) { R.pset(x, y, K.rocaS); R.pset(x + 1, y, K.rocaL); } else if (q < 0.7) { R.pset(x, y, K.blanco); R.pset(x + 1, y, K.flor2); } else { R.pset(x, y, K.arenaS); R.pset(x + 1, y + 1, K.arenaS); } }
  R.rect(236, 166, 286, 171, K.k); R.rect(237, 167, 285, 170, K.madera); R.linea(238, 167, 284, 167, K.maderaL); R.rect(282, 162, 286, 167, K.k); R.rect(283, 163, 285, 166, K.maderaS);
  matas(150, 150, 230, 178, 6, 3);
  for (const [x, y] of [[262, 150], [296, 158]]) { R.rect(x - 9, y - 10, x + 9, y, K.k); R.rect(x - 8, y - 9, x + 8, y - 1, K.madera); for (let i = -8; i <= 8; i += 4) R.linea(x + i, y - 9, x + i, y - 1, K.maderaS); R.linea(x - 8, y - 9, x + 8, y - 9, K.maderaL); }
  for (const [x, y] of [[250, 140], [208, 176], [300, 172]]) { R.rect(x, y, x + 1, y, K.arenaS); R.rect(x + 3, y + 1, x + 4, y + 1, K.arenaS); R.rect(x + 6, y, x + 7, y, K.arenaS); }
  // el bosque de la izquierda (tres términos) que llega hasta la arena
  for (const [x, y, r] of [[8, 54, 20], [40, 40, 22], [70, 62, 16], [-6, 92, 18], [26, 86, 18], [56, 96, 14]]) { tronco(x, y, 148, 3); }
  for (const [x, y, r] of [[8, 54, 20], [40, 40, 22], [70, 62, 16], [-6, 92, 18], [26, 86, 18], [56, 96, 14], [86, 82, 12]]) copa(x, y, r, x);
  for (let x = 0; x < 92; x++) for (let y = 136 + Math.round(H(x >> 2, 9) * 6); y < 152; y++) if (H(x >> 1, y, 4) < 0.6) R.pset(x, y, H(x, y, 5) < 0.5 ? K.bosqueS : K.hierbaS);
});
const p4 = (t) => {
  fondo4();
  // un cangrejo que cruza la arena y una gaviota posada en una caja
  { const x = Math.round(300 - ((t - P4) * 7) % 120), y = 174, p = Math.floor(t * 8) % 2; R.rect(x - 2, y - 2, x + 2, y, K.k); R.rect(x - 1, y - 2, x + 1, y - 1, K.rojo); R.pset(x - 3, y - 3 + p, K.rojo); R.pset(x + 3, y - 3 + (1 - p), K.rojo); }
  { const gy = 139 - (Math.sin(t * 2.4) > 0.85 ? 1 : 0); R.rect(259, gy - 3, 265, gy, K.k); R.rect(260, gy - 2, 264, gy - 1, K.blanco); R.rect(263, gy - 5, 266, gy - 3, K.k); R.pset(264, gy - 4, K.blanco); R.pset(267, gy - 4, K.oro); R.rect(259, gy - 2, 261, gy - 2, K.rocaL); }
  nubes(t, P4, [[196, 26, 22, 2], [100, 46, 20, 4], [200, 66, 32, 6]]);
  gaviotas(t, [[100, 38, 14, 1], [200, 50, 10, 4]]);
  vetas(t, 80, 92, 320, 136, 34, 4);
  T.dauphine(R, 242, 112, t, { barco: 'halveMaen', s: 0.9, dir: -1, ancla: true });
  T.canoa(R, Math.round(lerp(96, 176, tramo(t, P4, P5))), 120, t, { n: 2, s: 0.75, dir: 1, carga: true, fase: 2 });
  // la espuma que lame la orilla
  for (let x = 70; x < 320; x++) { const sh = 128 + Math.round(Math.sin(x * 0.035) * 3), w = Math.round(1.5 + Math.sin(t * 1.6 + x * 0.05) * 1.5); if (H(x, 2) < 0.8) for (let j = 0; j < w; j++) R.pset(x, sh - j, K.espuma); }
  const bar = T.barcaRemos(R, 196, 137, t, { noche: 0, n: 2, dir: -1, s: 0.9, carga: true, remo: false });
  // el montón de fardos crece cuando el lenape deja el suyo
  const deja = SAILOR + 0.1;
  for (const [x, y] of [[112, 162], [126, 162], [119, 155]]) fardo(x, y);
  if (t > deja) fardo(133, 155);
  // el lenape llega del bosque con un fardo y lo deja; recibe el caldero
  const lu = tramo(t, P4 + 0.1, deja - 0.3), lx = Math.round(lerp(40, 92, lu));
  const recibe = SAILOR + 0.9;
  const lm = R.actor(EL.lenape2, lx, 166, t, { dir: 1, anda: lu > 0 && lu < 1, sostiene: t < deja || t > recibe, sonrisa: t > recibe }).mano;
  if (t < deja) fardo(lm[0] + 2, lm[1] + 5); else if (t > recibe) caldero(lm[0], lm[1] - 2);
  // el patrón holandés le tiende el caldero
  const pm = R.actor(EL.colono, 142, 166, t, { dir: -1, sostiene: t > deja - 0.4 && t < recibe, habla: t > deja && t < recibe && Math.sin(t * 8) > 0, sonrisa: t > recibe });
  if (t > deja - 0.4 && t < recibe) caldero(pm.mano[0], pm.mano[1] - 2);
  // Juan Rodríguez baja de la barca con su hatillo de hachas, y saluda cuando la voz dice su nombre
  const ru = tramo(t, SAILOR - 0.1, SAILOR + 1.1), rx = Math.round(lerp(196, 164, ru));
  const saluda = t > JUAN - 0.05;
  const rm = R.actor(EL.rodriguez, rx, 167, t, { dir: saluda ? 1 : -1, anda: ru > 0 && ru < 1, sostiene: !saluda, dedo: saluda, sonrisa: saluda || ru >= 1 }).mano;
  if (!saluda) { hacha(rm[0] - 1, rm[1], -1); hacha(rm[0] + 2, rm[1] + 1, -1); } else { hacha(rx + 18, 165, 1); hacha(rx + 22, 166, 1); }
};

// 5 · la orilla al atardecer (bahia1524 'orilla' tarde): el barco se va; Rodríguez se queda
const p5 = (t) => {
  const tiene = t > FIRST + 0.95;
  T.bahia1524(R, t, { encuadre: 'orilla', luz: 'tarde', hacha: !tiene });
  T.dauphine(R, Math.round(lerp(236, 306, tramo(t, P5 - 0.3, E.duracion))), 98, t, { barco: 'halveMaen', s: 0.38, dir: 1, avanza: true, viento: 0.6 });
  // Rodríguez se despide del barco, va al tocón y saca el hacha; los lenapes salen del bosque
  const va = tramo(t, FIRST + 0.1, FIRST + 0.85), rx = Math.round(lerp(196, 234, va));
  const adios = t < FIRST;
  const llegan = tramo(t, RESIDENT - 0.9, RESIDENT + 0.5), vuelve = t > RESIDENT + 0.1;
  const rm = R.actor(EL.rodriguez, rx, 160, t, { dir: vuelve ? -1 : 1, anda: va > 0 && va < 1, brazos: adios && Math.floor(t * 3) % 2 === 0, dedo: adios && Math.floor(t * 3) % 2 === 1, sostiene: tiene, sonrisa: adios || vuelve, triste: t > FIRST - 0.6 && t < FIRST - 0.1 }).mano;
  if (tiene) hacha(rm[0], rm[1], vuelve ? -1 : 1);
  R.actor(EL.lenape, Math.round(lerp(-16, 150, llegan)), 160, t, { dir: 1, anda: llegan > 0 && llegan < 1, dedo: llegan >= 1 && t < E.duracion - 0.8, sonrisa: llegan >= 1 });
  R.actor(EL.lenapa, Math.round(lerp(-34, 132, llegan)), 160, t, { dir: 1, anda: llegan > 0 && llegan < 1, sonrisa: true });
  // «the first»: un 1 dorado salta sobre él
  const uno = tramo(t, FIRST - 0.05, FIRST + 0.3) - tramo(t, FIRST + 1.6, FIRST + 1.9);
  if (uno > 0) R.numero('1', rx + 7, Math.round(lerp(140, 124, uno)), { tam: 16, centro: true });
};

const año = (t) => (t < Y1613 ? 1609 : 1613);
const efectos = [[OTRO + 0.1, 'ola'], [a(0.47) + 0.45, 'chof'], [DUTCH - 0.5, 'viento'], [SAILS, 'lapiz'], [NAME, 'toc'], [FUR + 0.2, 'whoosh'],
  [SAILOR + 0.1, 'toc'], [SAILOR + 0.9, 'golpecito'], [P5 + 0.4, 'ola'], [FIRST, 'brillo'], [FIRST + 0.95, 'golpecito'], [RESIDENT + 0.3, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1609', efectos, año });
''')

E['ny-amsterdam'] = ('Nueva Ámsterdam', '''// NY-AMSTERDAM (frases 10–12), 1624 → 1660; 1626; 1844. Siete planos:
// 1. el puerto de 1624 (o.crece 0): una barca deja a las primeras familias en el muelle; caminan con sus hatillos, una
//    señala la tierra, el padre deja el baúl («arrive»);
// 2. (fondo local) el molino en su loma sobre la punta de la isla: abajo levantan el fuerte de tierra y en «fort» sube
//    la bandera; en «windmill» un aspa se lleva el sombrero del colono, que da vueltas y vueltas (gag);
// 3. el puerto con los años (o.crece 0,25 → 1, luz que se dora): las casas pasan de corteza a ladrillo; un colono
//    trae ladrillos en la carretilla; en «This is New Amsterdam» los vecinos lo celebran;
// 4. (fondo local) el mito: una etiqueta enorme de «$24» cuelga de un roble sobre la isla; dos lenapes la miran
//    extrañados; en «myth» un sello rojo la tacha y el viento se la lleva;
// 5. la mesa del comerciante (nuevaAmsterdam 'mesa'): en la carta se lee «1626»; brillan las mercancías y, en «sixty
//    guilders», aparece el «60» con las monedas;
// 6. (fondo local) la mesa del historiador de 1844: la mano con la pluma escribe «$24» junto al «60»; el calendario pasa
//    de 1626 a 1844 en «two centuries later»;
// 7. (fondo local) un claro en la linde del pueblo: un lenape y un colono a cada lado de un trozo de tierra; en «share»,
//    la burbuja del lenape (la tierra con dos personas que la comparten); en «sell», la del colono (la tierra con valla
//    y un candado que se cierra en «forever»).''', AYUDA + r'''
const a = (f) => en('amsterdam', f), b = (f) => en('mito', f), c = (f) => en('compartir', f);
const P2 = a(0.341), P3 = a(0.692), P4 = b(0) - 0.05, P5 = b(0.369), P6 = b(0.7167), P7 = c(0) - 0.04;
const ARRIVE = a(0.277), FORT = a(0.563), WINDMILL = a(0.626), BRICK = a(0.771), NEWAMS = a(0.939);
const DOLLARS = b(0.158), MYTH = b(0.309), Y1626 = b(0.416), GOODS = b(0.535), SIXTY = b(0.617), CONVERTED = b(0.771), DOLLARS2 = b(0.866), CENTURIES = b(0.897);
const AGREEMENT = c(0.435), SHARE = c(0.55), SELL = c(0.84), FOREVER = c(0.886);
const colona2 = { ...EL.colona, pal: { ...EL.colona.pal, C: hex('#6a3a3a'), c: hex('#4a2626'), H: hex('#6a4a2a'), h: hex('#8a643a') } };
const colono2 = { ...EL.colono, pal: { ...EL.colono.pal, C: hex('#5a4a2a'), H: hex('#3a2a1a'), h: hex('#5a4024') } };

// un baúl de viaje (x, y = la base, centro)
const baul = (x, y) => { R.rect(x - 7, y - 8, x + 7, y, K.k); R.rect(x - 6, y - 7, x + 6, y - 1, K.madera); R.rect(x - 6, y - 7, x + 6, y - 6, K.maderaL); R.rect(x - 6, y - 4, x + 6, y - 4, K.maderaS); R.rect(x - 1, y - 5, x + 1, y - 3, K.oro); };
const hatillo = (x, y) => { R.disco(x, y, 4, K.k); R.disco(x, y, 3, K.crema); R.pset(x - 1, y - 1, K.blanco); R.pset(x + 1, y + 2, K.cremaS); R.rect(x - 1, y - 5, x + 1, y - 3, K.cremaS); };

// 1 · el puerto de 1624: llegan las familias
const p1 = (t) => {
  T.nuevaAmsterdam(R, t, { encuadre: 'puerto', crece: 0 });
  const bu = tramo(t, 0, 1.2); T.barcaRemos(R, Math.round(lerp(236, 198, bu)), 166, t, { noche: 0, n: 2, dir: -1, s: 0.8, remo: bu < 1 });
  const andar = (t0, t1, x1) => { const u = tramo(t, t0, t1); return [Math.round(lerp(172, x1, u)), u > 0 && u < 1, u]; };
  const [x1, m1, u1] = andar(0.5, 2.9, 86), [x2, m2] = andar(1.1, 3.3, 108), [x3, m3] = andar(1.7, 3.8, 128);
  const suelta = ARRIVE - 0.1;
  if (t > suelta) baul(x1 - 4, 154);
  const r1 = R.actor(EL.colono, x1, 154, t, { dir: -1, anda: m1, sostiene: t < suelta, sonrisa: t > suelta + 0.3 });
  if (t < suelta) baul(r1.mano[0] - 1, r1.mano[1] + 7);
  const r2 = R.actor(EL.colona, x2, 154, t, { dir: -1, anda: m2, sostiene: t < 3.6, dedo: t > 3.6, sorpresa: t > 3.6 && t < 4.2, sonrisa: t > 4.2 });
  if (t < 3.6) hatillo(r2.mano[0], r2.mano[1] + 3); else hatillo(x2 + 16, 150);
  const r3 = R.actor(colona2, x3, 154, t, { dir: -1, anda: m3, sostiene: true, sonrisa: true }); hatillo(r3.mano[0], r3.mano[1] + 3);
};

// 2 · (fondo local) el molino en su loma, el fuerte que se levanta abajo
const fondo2 = () => fijo('a2', () => {
  cieloFijo(92);
  for (let x = 0; x < 320; x++) { const h = 84 + Math.round(Math.sin(x * 0.025 + 1) * 4); for (let y = h; y < 96; y++) R.pset(x, y, (y - h) / 12 > um(x, y) ? K.sierraS : K.sierra); R.pset(x, h, K.sierraS); }
  for (let y = 96; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, K.agua, (y - 96) / 40));
  for (let k = 0; k < 40; k++) { const x = Math.floor(H(k, 41) * 316), y = 97 + Math.floor(H(k, 42) * 14); R.linea(x, y, x + 2, y, K.aguaL); }
  // la punta de la isla: los campos y los tocones del bosque talado
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const sh = 108 + Math.round(Math.sin(x * 0.04) * 2); if (y < sh) continue; const r = H(x >> 1, y, 13); R.pset(x, y, y === sh ? K.hierbaS : r < 0.15 ? K.hierbaL : r < 0.7 ? K.hierba : K.hierbaS); }
  for (let k = 0; k < 18; k++) { const x = 140 + Math.floor(H(k, 51) * 80), y = 114 + Math.floor(H(k, 52) * 18); R.rect(x, y, x + 2, y + 1, K.maderaS); R.pset(x + 1, y, K.maderaL); }
  for (let j = 0; j < 4; j++) for (let x = 6; x < 36; x++) R.pset(x, 118 + j * 4 + (x % 5 === 0 ? 1 : 0), K.tierraS);
  // el fuerte de tierra a medio hacer (bastiones, foso, empalizada, montones de tierra)
  R.poligono([[44, 128], [56, 116], [104, 116], [118, 128], [104, 136], [56, 136]], K.k);
  R.poligono([[46, 128], [57, 117], [103, 117], [116, 128], [103, 135], [57, 135]], K.tierra);
  for (let x = 57; x < 104; x++) { R.pset(x, 117, K.tierraL); if (x % 3 === 0) R.pset(x, 121, K.tierraS); }
  R.poligono([[60, 121], [100, 121], [106, 128], [100, 132], [60, 132], [54, 128]], K.tierraS);
  for (let x = 58; x < 92; x += 2) { R.linea(x, 114, x, 118, K.k); R.pset(x, 114, K.maderaL); }
  for (const [x, y] of [[124, 132], [130, 130], [36, 134]]) { R.disco(x, y, 3, K.k); R.disco(x, y, 2, K.tierra); R.pset(x - 1, y - 1, K.tierraL); }
  // chozas de corteza y la loma del molino
  for (const x of [150, 168, 186]) { R.poligono([[x - 7, 124], [x, 116], [x + 7, 124]], K.k); R.poligono([[x - 6, 123], [x, 117], [x + 6, 123]], K.cremaS); R.rect(x - 6, 124, x + 6, 128, K.k); R.rect(x - 5, 124, x + 5, 127, K.maderaS); R.rect(x - 1, 125, x + 1, 128, K.k); }
  for (let x = 0; x < 320; x++) { const h = 150 - Math.round(Math.max(0, x - 120) * 0.12 + Math.sin(x * 0.03) * 2); for (let y = h; y < 180; y++) { const r = H(x >> 1, y, 17), f = (y - h) / 30; R.pset(x, y, y === h ? K.hierbaS : y === h + 1 ? K.hierbaL : r < 0.1 ? K.hierbaL : r < 0.65 - f * 0.25 ? K.hierba : K.hierbaS); } }
  pradera(0, 160, 319, 179, 4);
  // el campo arado con surcos, los almiares, la cerca de varas y las vacas del prado
  R.poligono([[0, 142], [60, 140], [80, 160], [0, 164]], K.tierraS); for (let j = 0; j < 6; j++) { const y = 143 + j * 3.5; R.linea(0, Math.round(y), Math.round(62 + j * 3), Math.round(y - 2 + j * 0.2), K.tierraL); }
  for (const [x, y] of [[104, 150], [124, 146]]) { R.poligono([[x - 7, y], [x - 5, y - 9], [x, y - 13], [x + 5, y - 9], [x + 7, y]], K.k); R.poligono([[x - 6, y - 1], [x - 4, y - 9], [x, y - 12], [x + 4, y - 9], [x + 6, y - 1]], K.oroS); for (let i = -4; i <= 3; i += 2) R.linea(x + i, y - 9, x + i + 1, y - 2, K.oro); R.linea(x, y - 13, x, y - 16, K.maderaS); }
  for (let x = 2; x < 96; x += 8) { R.linea(x, 168, x, 162, K.maderaS); R.pset(x, 162, K.maderaL); } R.linea(2, 164, 96, 164, K.madera); R.linea(2, 166, 96, 166, K.maderaS);
  matas(0, 170, 320, 179, 9, 6); matas(130, 152, 200, 162, 3, 7);
  // el sendero de tierra que sube hasta el molino
  for (let y = 136; y < 180; y++) { const cx = Math.round(lerp(220, 120, (y - 136) / 44)), w = Math.round(3 + (y - 136) / 8); for (let i = -w; i <= w; i++) { if (y < 150 - Math.max(0, cx + i - 120) * 0.12) continue; R.pset(cx + i, y, Math.abs(i) === w ? K.tierraS : H(cx + i, y, 8) < 0.2 ? K.tierraL : K.tierra); } }
});
const pinta2 = (t) => {
  fondo2();
  nubes(t, P2, [[20, 28, 30, 3], [140, 20, 20, 1.5], [60, 62, 26, 6], [250, 70, 28, 5]]);
  gaviotas(t, [[40, 48, 14, 2], [180, 56, 18, 5]]);
  vetas(t, 0, 97, 320, 107, 14, 5);
  T.dauphine(R, Math.round(286 - (t - P2) * 2), 106, t, { barco: 'halveMaen', s: 0.4, dir: -1, ancla: true });
  // la bandera del fuerte sube en «fort»
  const iza = tramo(t, FORT - 0.6, FORT + 0.2); R.linea(80, 92, 80, 118, K.k); R.pset(81, 92, K.oro);
  { const fy = Math.round(lerp(110, 93, iza)), o = Math.round(Math.sin(t * 8)); R.rect(81, fy, 92, fy + 6, K.k); R.rect(81, fy + 1, 91 + o, fy + 1, K.naranja); R.rect(81, fy + 2, 91 + o, fy + 3, K.blanco); R.rect(81, fy + 4, 91 + o, fy + 5, K.azul); }
  // los colonos pequeños acarrean tierra en cestos al fuerte
  for (let k = 0; k < 4; k++) { const u = ((t * 0.18 + k * 0.25) % 1), ida = u < 0.5, x = Math.round(ida ? lerp(30, 96, u * 2) : lerp(96, 30, (u - 0.5) * 2)) , y = 138 + (k % 2) * 3, p = Math.floor(t * 6 + k) % 2;
    R.rect(x, y - 6, x + 2, y - 3, k % 2 ? K.azul : K.tierraS); R.rect(x, y - 8, x + 2, y - 7, K.cremaS); R.pset(x + (p ? 0 : 2), y - 2, K.k); R.pset(x + (p ? 2 : 0), y - 2, K.k); if (ida) { R.rect(x + 3, y - 7, x + 5, y - 5, K.maderaL); } }
};
const vaca = (x, y, t, k) => { const pace = Math.sin(t * 0.8 + k) > 0.2; R.rect(x, y - 8, x + 13, y - 3, K.k); R.rect(x + 1, y - 7, x + 12, y - 4, K.blanco); R.rect(x + 3, y - 7, x + 6, y - 5, K.k); R.rect(x + 9, y - 6, x + 11, y - 4, K.tierraS);
  for (const lx of [x + 1, x + 3, x + 10, x + 12]) R.linea(lx, y - 3, lx, y, K.k); const hy = pace ? y - 3 : y - 9; R.rect(x - 4, hy, x, hy + 4, K.k); R.rect(x - 3, hy + 1, x - 1, hy + 3, K.blanco); R.pset(x - 3, hy + 3, K.flor2); R.pset(x + 13, y - 7 + Math.round(Math.sin(t * 3 + k)), K.k); };
const MOL = [228, 150];
const p2 = (t) => {
  pinta2(t);
  vaca(28, 170, t, 0); vaca(60, 167, t, 2);
  // el aspa que se lleva el sombrero: se busca en el instante del enganche cuál es el aspa más baja
  const ENG = WINDMILL - 0.15, W = 2.6;
  const giro = (tt) => 1.2 + tt * W;
  const m0 = T.molino(R, MOL[0], MOL[1], ENG, { s: 2, giro: giro(ENG), base: true, mascara: () => false });
  let iBaja = 0; m0.puntas.forEach((p, i) => { if (p[1] > m0.puntas[iBaja][1]) iBaja = i; });
  const m = T.molino(R, MOL[0], MOL[1], t, { s: 2, giro: giro(t), base: true });
  // la colona sube por el sendero con un saco de grano
  const cu = tramo(t, P2 + 0.1, FORT + 0.2), cx = Math.round(lerp(120, 178, cu));
  const cm = R.actor(colona2, cx, Math.round(lerp(176, 150, cu)), t, { dir: 1, anda: cu > 0 && cu < 1, sostiene: true, sorpresa: t > ENG && t < ENG + 0.6, sonrisa: t > ENG + 0.6 });
  R.rect(cm.mano[0] - 3, cm.mano[1] - 1, cm.mano[0] + 3, cm.mano[1] + 6, K.k); R.rect(cm.mano[0] - 2, cm.mano[1], cm.mano[0] + 2, cm.mano[1] + 5, K.crema); R.pset(cm.mano[0] - 1, cm.mano[1] + 1, K.blanco);
  // el colono bajo las aspas: el aspa le arranca el sombrero, que da vueltas y vueltas
  const cx2 = m0.puntas[iBaja][0] - 7, sinS = t > ENG;
  const col = R.actor(EL.colono, cx2, 150, t, { dir: -1, tocado: sinS ? false : undefined, sorpresa: sinS, brazos: sinS && t > ENG + 0.25 && Math.floor(t * 4) % 2 === 0 });
  if (sinS) { const p = m.puntas[iBaja], pal = { ...R.P, ...EL.colono.pal }; sombrero(p[0], p[1] + 2, Math.floor(t * 6) % 2 ? 1 : -1, pal); }
};

// 3 · el puerto con los años: corteza → ladrillo, la luz que se dora
const p3 = (t) => {
  const cr = lerp(0.25, 1, tramo(t, P3 + 0.2, NEWAMS - 0.3));
  T.nuevaAmsterdam(R, t, { encuadre: 'puerto', crece: cr });
  // un colono empuja la carretilla de ladrillos por el muelle
  const u = tramo(t, P3 + 0.1, BRICK + 0.8), x = Math.round(lerp(150, 70, u));
  const cel = t > NEWAMS - 0.1;
  R.actor(colono2, x, 154, t, { dir: -1, anda: u > 0 && u < 1, brazos: cel && Math.floor(t * 3) % 2 === 0, sonrisa: cel });
  { const bx = x - 22; R.rect(bx, 143, bx + 16, 149, K.k); R.rect(bx + 1, 144, bx + 15, 148, K.maderaS); for (let i = 0; i < 5; i++) { R.rect(bx + 2 + i * 3, 141 - (i % 2), bx + 4 + i * 3, 143 - (i % 2), T.C.ladrillo); R.pset(bx + 2 + i * 3, 141 - (i % 2), T.C.ladrilloL); }
    R.disco(bx + 3, 151, 3, K.k); R.disco(bx + 3, 151, 2, K.madera); R.pset(bx + 3 + Math.round(Math.cos(t * 6) * 2), 151 + Math.round(Math.sin(t * 6) * 2), K.maderaL); R.linea(bx + 15, 146, bx + 22, 142, K.k); }
  // la colona y una vecina en el muelle: barre / lo celebra
  R.actor(EL.colona, 104, 154, t, { dir: 1, dedo: t > BRICK && t < BRICK + 1.2, sonrisa: true, brazos: cel && Math.floor(t * 3 + 1) % 2 === 0 });
  R.actor(colona2, 124, 154, t, { dir: -1, habla: t < BRICK && Math.sin(t * 7) > 0, sonrisa: true, brazos: cel && Math.floor(t * 3) % 2 === 0 });
  // la luz se dora con los años
  T.tinte(R, 0, 179, [255, 170, 90], 0.16 * tramo(t, P3 + 0.5, P4));
};

// 4 · (fondo local) el mito de los 24 dólares: la etiqueta cuelga del roble; el sello la tacha; el viento se la lleva
const fondo4 = () => fijo('a4', () => {
  cieloFijo(104);
  for (let x = 0; x < 320; x++) { const h = 92 + Math.round(Math.sin(x * 0.02) * 4); for (let y = h; y < 104; y++) R.pset(x, y, (y - h) / 12 > um(x, y) ? K.sierraS : K.sierra); }
  for (let y = 104; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, K.agua, (y - 104) / 30));
  for (let x = 0; x < 320; x++) { const h = 118 + Math.round(Math.sin(x * 0.05 + 2) * 2); for (let y = h; y < 136; y++) { const r = H(x >> 1, y, 22); R.pset(x, y, y === h ? K.k : r < 0.2 ? K.bosqueL : r < 0.65 ? K.bosque : K.bosqueS); } }
  pradera(0, 134, 319, 179, 9);
  // el roble grande de la izquierda con la rama que cruza
  tronco(48, 40, 168, 6);
  for (let i = 0; i < 110; i++) { const x = 52 + i, y = 46 - Math.round(Math.sin(i / 110 * Math.PI) * 6 - i * 0.04); R.rect(x, y, x, y + 3 - Math.round(i / 50), K.k); R.rect(x, y + 1, x, y + 2 - Math.round(i / 60), H(i, 3) < 0.3 ? K.maderaL : K.madera); }
  for (const [x, y, r] of [[30, 44, 24], [64, 30, 22], [100, 34, 16], [18, 80, 18], [80, 64, 14], [138, 32, 12]]) copa(x, y, r, y);
  matas(0, 140, 320, 179, 16, 2);
  // la orilla con los juncos y una canoa varada
  for (let x = 180; x < 320; x += 3) { const hh = 4 + Math.floor(H(x, 2) * 5); R.linea(x, 136, x + (x % 2), 136 - hh, K.hierbaS); R.pset(x + (x % 2), 135 - hh, K.tierraS); }
  R.poligono([[210, 140], [214, 144], [246, 144], [250, 140]], K.k); R.poligono([[212, 141], [215, 143], [245, 143], [248, 141]], K.madera); R.linea(213, 141, 247, 141, K.maderaL);
});
const p4 = (t) => {
  fondo4();
  nubes(t, P4, [[160, 22, 22, 2], [230, 62, 30, 6], [110, 78, 22, 4]]);
  gaviotas(t, [[180, 44, 12, 1], [250, 70, 16, 3]]);
  vetas(t, 0, 105, 320, 117, 14, 4);
  // un ciervo que pace a la derecha y levanta la cabeza
  { const x = 262, y = 150, alza = t > DOLLARS && t < DOLLARS + 1.5; R.rect(x, y - 9, x + 14, y - 4, K.k); R.rect(x + 1, y - 8, x + 13, y - 5, K.tierraL); R.rect(x + 1, y - 5, x + 13, y - 5, K.tierra);
    for (const lx of [x + 2, x + 5, x + 10, x + 12]) R.linea(lx, y - 4, lx, y, K.k);
    const hx = x + 15, hy = alza ? y - 14 : y - 4; R.linea(x + 13, y - 8, hx, hy + 2, K.k); R.rect(hx - 1, hy - 1, hx + 3, hy + 2, K.k); R.rect(hx, hy, hx + 2, hy + 1, K.tierraL); R.pset(hx, hy - 2, K.k); R.pset(hx + 2, hy - 3, K.k); R.pset(x - 1, y - 9, K.blanco); }
  // los dos lenapes bajo el roble miran la etiqueta, extrañados; se ríen cuando el sello la tacha
  const visto = t > DOLLARS + 0.3;
  R.actor(EL.lenapa, 70, 166, t, { dir: 1, sorpresa: visto && t < MYTH, sonrisa: t > MYTH + 0.2 });
  R.actor(EL.lenape2, 92, 166, t, { dir: 1, dedo: visto && t < MYTH, sonrisa: t > MYTH + 0.2 });
  if (visto && t < MYTH) R.bocadillo(100, 132, { icono: '?' });
  // la etiqueta: baja colgando de su cordel en «$24», se balancea; el sello rojo; el cordel se rompe y vuela
  const baja = tramo(t, DOLLARS - 0.5, DOLLARS), vuela = tramo(t, MYTH + 0.5, P5 + 0.2), ang = Math.sin(t * 2.2) * 0.06 * (1 - vuela);
  const ax = 172, ay = 50, Lc = Math.round(lerp(0, 22, baja));
  const tx = Math.round(ax + Math.sin(ang) * Lc + vuela * 190), ty = Math.round(ay + Lc + vuela * -40 + Math.sin(vuela * 9) * 6 * vuela);
  if (vuela === 0) R.linea(ax, ay, tx, ty, K.k); else R.linea(ax, ay, ax + 2, ay + 8, K.k);
  if (baja > 0) {
    const w = 78, hh = 40, x0 = tx - w / 2, y0 = ty;
    R.poligono([[x0, y0 + 8], [x0 + 8, y0], [x0 + w, y0], [x0 + w, y0 + hh], [x0 + 8, y0 + hh], [x0, y0 + hh - 8]], K.k);
    R.poligono([[x0 + 1, y0 + 8], [x0 + 8, y0 + 1], [x0 + w - 1, y0 + 1], [x0 + w - 1, y0 + hh - 1], [x0 + 8, y0 + hh - 1], [x0 + 1, y0 + hh - 8]], K.papel);
    R.rect(x0 + 9, y0 + hh - 4, x0 + w - 2, y0 + hh - 2, K.papelS); R.rect(x0 + 9, y0 + 2, x0 + w - 2, y0 + 3, K.papelL);
    R.disco(x0 + 7, y0 + hh / 2, 3, K.k); R.disco(x0 + 7, y0 + hh / 2, 2, K.cremaS);
    R.numero('$24', Math.round(x0 + w / 2 + 4), y0 + 29, { tam: 16, centro: true });
    // el sello rojo que tacha
    const se = tramo(t, MYTH - 0.15, MYTH + 0.05);
    if (se > 0) { const g = Math.round((1 - se) * 6); for (let i = -2; i <= 2; i++) { R.linea(x0 + 10 - g, y0 + 4 - g + i, x0 + w - 6 + g, y0 + hh - 6 + g + i, K.rojo); R.linea(x0 + 10 - g, y0 + hh - 6 + g + i, x0 + w - 6 + g, y0 + 4 - g + i, K.rojo); }
      R.linea(x0 + 10 - g, y0 + 7 - g, x0 + w - 6 + g, y0 + hh - 3 + g, K.rojoS); }
  }
  R.disco(ax, ay, 2, K.k); R.pset(ax, ay, K.cremaS);
};

// 5 · la mesa del comerciante: la carta de 1626, las mercancías y el «60»
const p5 = (t) => {
  const M2 = T.nuevaAmsterdam(R, t, { encuadre: 'mesa', delante: false });
  R.actor(EL.colono, 138, 138, t, { dir: 1, habla: t < SIXTY + 0.6 && Math.sin(t * 7) > 0.2, dedo: t > GOODS - 0.2 && t < SIXTY, brazos: t > SIXTY && t < SIXTY + 0.8, sonrisa: t > SIXTY });
  T.b_mesaDelante(R, t);
  // «1626» en la carta
  const fe = tramo(t, Y1626 - 0.2, Y1626 + 0.2);
  if (fe > 0) { R.rect(126, 139, 166, 149, K.papelL); R.numero('1626', 146, 148, { centro: true, color: hex('#3a2a4a'), sombra: false, n: Math.round(fe * 40) }); }
  // las mercancías brillan una a una
  [[36, 140], [94, 150], [234, 142], [286, 152]].forEach(([x, y], i) => destello(x, y, tramo(t, GOODS + i * 0.25, GOODS + i * 0.25 + 0.5)));
  // el «60» y las monedas de florín
  const se = tramo(t, SIXTY - 0.1, SIXTY + 0.25);
  if (se > 0) { const y = Math.round(lerp(132, 120, se));
    R.rect(130, y - 22, 194, y + 4, K.k); R.rect(131, y - 21, 193, y + 3, K.papel); R.rect(131, y + 1, 193, y + 3, K.papelS);
    R.numero('60', 172, y - 1, { tam: 16, centro: true });
    for (let k = 0; k < 3; k++) { const cy = y - 4 - k * 3; R.rect(136, cy, 148, cy + 3, K.k); R.rect(137, cy, 147, cy + 2, K.oro); R.linea(138, cy, 146, cy, K.oroL); R.pset(147, cy + 2, K.oroS); } }
};

// 6 · (fondo local) la mesa del historiador, 1844: la mano escribe «$24» junto al «60»
const fondo6 = () => fijo('a6', () => {
  // la pared con papel pintado (franjas y florecitas) y el friso
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const f = (x % 12), c = f < 1 ? hex('#2a4a3a') : f < 6 ? hex('#3c6a52') : hex('#36604a'); R.pset(x, y, (x % 12 === 8 && y % 10 === 4) ? hex('#a89a5a') : c); }
  for (let y = 0; y < 70; y++) for (let x = 262; x < 320; x++) if (y < 48) R.pset(x, y, hex('#36604a'));
  R.rect(0, 62, 319, 70, K.k); R.rect(0, 63, 319, 66, K.madera); R.rect(0, 63, 319, 63, K.maderaL); R.rect(0, 67, 319, 69, K.maderaS);
  // el cuadro del barco en la pared
  R.rect(28, 16, 84, 54, K.k); R.rect(29, 17, 83, 53, K.oro); R.rect(32, 20, 80, 50, K.k); for (let y = 21; y < 50; y++) for (let x = 33; x < 80; x++) R.pset(x, y, y < 38 ? grad(x, y, K.cielo, (y - 21) / 17) : grad(x, y, K.agua, (y - 38) / 12));
  R.rect(48, 34, 66, 38, K.maderaS); R.linea(56, 24, 56, 34, K.k); R.poligono([[50, 25], [56, 25], [56, 33], [50, 33]], K.blanco); R.poligono([[57, 26], [63, 26], [63, 33], [57, 33]], K.crema);
  // la mesa de caoba con vetas y el cartapacio verde de piel
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.11) * 2 + y * 0.02); R.pset(x, y, v > 0.85 ? hex('#8a4a2a') : v > 0.1 ? hex('#6e3820') : hex('#5a2c18')); }
  R.rect(20, 86, 300, 178, K.k); for (let y = 87; y < 178; y++) for (let x = 21; x < 300; x++) R.pset(x, y, H(x >> 1, y >> 1, 3) < 0.12 ? hex('#3a6a4a') : hex('#2e5a3e')); R.rect(21, 87, 299, 88, hex('#4a7a5a'));
  // el libro de registro abierto: dos páginas con renglones
  R.poligono([[52, 96], [162, 92], [162, 172], [52, 168]], K.k); R.poligono([[166, 92], [278, 96], [278, 168], [166, 172]], K.k);
  for (let y = 93; y < 172; y++) for (let x = 53; x < 278; x++) { const enL = x < 162, top = enL ? lerp(97, 93, (x - 52) / 110) : lerp(93, 97, (x - 166) / 112), bot = enL ? lerp(167, 171, (x - 52) / 110) : lerp(171, 167, (x - 166) / 112);
    if (x > 161 && x < 166) continue; if (y < top || y > bot) continue; const g = Math.abs(x - 164) < 12 ? (Math.abs(x - 164) < 6 ? K.papelS : (um(x, y) < 0.5 ? K.papelS : K.papel)) : K.papel; R.pset(x, y, (Math.round(y - top) % 8 === 7 && Math.abs(x - 164) > 8) ? hex('#b8c4d8') : g); }
  R.linea(164, 92, 164, 172, K.maderaS);
  // la carta vieja de 1626 debajo, a la izquierda, con su sello
  R.poligono([[22, 120], [52, 116], [56, 160], [24, 164]], K.k); R.poligono([[23, 121], [51, 117], [55, 159], [25, 163]], hex('#d8c48c')); for (let k = 0; k < 5; k++) R.linea(28, 128 + k * 6, 48, 125 + k * 6, hex('#8a7448')); R.disco(42, 154, 3, K.rojoS); R.disco(42, 154, 2, K.rojo);
  // el tintero, las gafas, los libros
  R.rect(288, 100, 304, 116, K.k); R.rect(289, 101, 303, 115, hex('#2a2a3a')); R.rect(290, 102, 294, 106, hex('#5a5a7a'));
  for (const [y, c] of [[74, '#7a2a2a'], [80, '#2a4a7a'], [86, '#6a5a2a']]) { R.rect(240, y, 300, y + 6, K.k); R.rect(241, y + 1, 299, y + 5, hex(c)); R.linea(241, y + 1, 299, y + 1, K.papelL); }
  R.anillo(206, 160, 5, K.k); R.anillo(220, 160, 5, K.k); R.linea(211, 159, 215, 159, K.k);
});
const p6 = (t) => {
  fondo6();
  // la lámpara de aceite (Argand) con su llama y el halo
  { const x = 14, l = Math.round(Math.sin(t * 13) * 1); R.rect(x - 4, 80, x + 4, 100, K.k); R.rect(x - 3, 81, x + 3, 99, K.oroS); R.rect(x - 2, 81, x - 1, 99, K.oro); R.rect(x - 5, 66, x + 5, 80, K.k); R.rect(x - 4, 67, x + 4, 79, hex('#f4ecc8'));
    R.disco(x, 73 + l, 2, K.oroL); R.pset(x, 70 + l, K.blanco); for (let k = 0; k < 24; k++) { const a2 = k * 0.6 + t * 0.3, r = 10 + (k % 3) * 4; const px = Math.round(x + Math.cos(a2) * r), py = Math.round(73 + Math.sin(a2) * r); if (py > 70 && (k + Math.floor(t * 4)) % 3 === 0) R.pset(px, py, hex('#c8a04a')); } }
  // el péndulo del reloj de pared que oscila (tic)
  { const cx = 230, ang = Math.sin(t * Math.PI) * 0.35; R.rect(218, 8, 242, 58, K.k); R.rect(219, 9, 241, 57, K.madera); R.disco(230, 20, 8, K.k); R.disco(230, 20, 7, K.papel); R.linea(230, 20, 230, 15, K.k); R.linea(230, 20, 234, 21, K.k);
    R.rect(222, 32, 238, 55, hex('#3a2010')); const px = Math.round(cx + Math.sin(ang) * 16), py = Math.round(32 + Math.cos(ang) * 16); R.linea(cx, 32, px, py, K.oroS); R.disco(px, py, 2, K.oro); }
  // el calendario de mesa: 1626 → 1844 en «two centuries»
  { const pasa = tramo(t, CENTURIES - 0.1, CENTURIES + 0.25), x0 = 186, y0 = 70; R.rect(x0, y0, x0 + 44, y0 + 22, K.k); R.rect(x0 + 1, y0 + 1, x0 + 43, y0 + 21, K.blanco); R.rect(x0 + 1, y0 + 1, x0 + 43, y0 + 5, K.rojo);
    const n = pasa < 0.5 ? '1626' : '1844'; const h2 = Math.round(Math.abs(1 - pasa * 2) * 10); if (h2 > 1) R.numero(n, x0 + 22, y0 + 17, { centro: true, color: hex('#2a2a3a'), sombra: false });
    if (pasa > 0 && pasa < 1) R.rect(x0 + 1, y0 + 6, x0 + 43, y0 + 6 + (10 - h2), K.papelS); }
  // el «60» de la carta, ya escrito en la página izquierda, con sus monedas
  R.numero('60', 108, 140, { tam: 16, centro: true, color: hex('#3a2a4a') });
  for (let k = 0; k < 3; k++) { const cy = 154 - k * 3; R.rect(96, cy, 108, cy + 3, K.k); R.rect(97, cy, 107, cy + 2, K.oro); R.linea(98, cy, 106, cy, K.oroL); }
  // la flecha roja cruza a la página derecha
  const fl = tramo(t, CONVERTED - 0.1, CONVERTED + 0.5); if (fl > 0) { const x1 = Math.round(lerp(132, 192, fl)); R.rect(132, 131, x1, 132, K.rojo); if (fl > 0.8) { R.linea(x1, 131, x1 - 4, 127, K.rojo); R.linea(x1, 132, x1 - 4, 136, K.rojo); } }
  // la mano con la pluma escribe «$24» (la pluma va en la mano; el brazo entra en diagonal desde abajo a la derecha)
  const es = tramo(t, CONVERTED + 0.3, DOLLARS2 + 0.3), sale = tramo(t, CENTURIES + 0.4, CENTURIES + 1.2);
  if (es > 0) R.numero('$24', 230, 140, { tam: 16, centro: true, color: hex('#3a2a4a'), n: Math.round(es * 52) });
  const px = Math.round(206 + es * 50 + Math.sin(t * 22) * (es > 0 && es < 1 ? 2 : 0)), py = Math.round(138 + (es > 0 && es < 1 ? Math.sin(t * 17) * 3 : 0));
  const hx = px + 6 + Math.round(sale * 60), hy = py + 6 + Math.round(sale * 40), entra = tramo(t, P6, P6 + 0.6);
  if (sale < 1) { const ex = Math.round(lerp(330, hx, entra)), ey = Math.round(lerp(190, hy, entra));
    R.linea(ex - 6, ey - 6, ex + 10, ey - 26, K.k); R.linea(ex - 5, ey - 6, ex + 10, ey - 25, K.blanco); R.linea(ex + 6, ey - 20, ex + 12, ey - 24, K.blanco); R.linea(ex + 4, ey - 18, ex + 11, ey - 22, K.papelS);
    T.brazo(R, ex + 46, ey + 30, ex, ey, '#2a2a3a', -1, {}); }
};

// 7 · (fondo local) un claro en la linde del pueblo: compartir o vender
const fondo7 = () => fijo('a7', () => {
  cieloFijo(96);
  // el bosque al fondo en tres términos
  for (let x = 0; x < 320; x++) { const h = 70 + Math.round(Math.sin(x * 0.07) * 5 + H(x >> 3, 1) * 6); for (let y = h; y < 104; y++) R.pset(x, y, (y - h) / 30 > um(x, y) ? K.bosqueS : K.sierraS); }
  for (let k = 0; k < 16; k++) { const x = k * 22 + 4 + Math.round(H(k, 5) * 8); if (H(k, 6) < 0.3) { for (let j = 0; j < 4; j++) R.poligono([[x, 64 + j * 7], [x - 7 - j * 2, 78 + j * 7], [x + 7 + j * 2, 78 + j * 7]], j % 2 ? K.bosqueS : K.bosque); R.linea(x, 64, x, 104, K.maderaS); }
    else copa(x, 84 + Math.round(H(k, 2) * 10), 10 + Math.round(H(k, 3) * 5), k); }
  // el pueblo pequeño al fondo a la derecha (tejados, la empalizada y el humo lo pone el vivo)
  for (let k = 0; k < 6; k++) { const x = 210 + k * 14, y = 100; R.rect(x, y - 8, x + 10, y, K.k); R.rect(x + 1, y - 7, x + 9, y - 1, T.C.ladrillo); R.poligono([[x, y - 8], [x + 5, y - 14], [x + 10, y - 8]], K.k); R.poligono([[x + 1, y - 8], [x + 5, y - 13], [x + 9, y - 8]], T.C.ladrilloS); R.pset(x + 4, y - 4, K.oroL); }
  for (let x = 204; x < 300; x += 2) R.linea(x, 98, x, 104, K.maderaS);
  pradera(0, 104, 319, 179, 12);
  matas(0, 108, 320, 132, 10, 5); matas(0, 164, 320, 179, 10, 8); matas(0, 132, 90, 160, 3, 9); matas(236, 132, 320, 160, 4, 10);
  // el trozo de tierra: surcos de tierra removida con cuatro estacas y su cordel
  R.poligono([[118, 140], [204, 140], [214, 160], [108, 160]], K.k); R.poligono([[119, 141], [203, 141], [212, 159], [110, 159]], K.tierra);
  for (let j = 0; j < 5; j++) { const y = 143 + j * 4; R.linea(Math.round(lerp(118, 108, (y - 140) / 20)) + 2, y, Math.round(lerp(204, 214, (y - 140) / 20)) - 2, y, K.tierraS); R.linea(Math.round(lerp(118, 108, (y - 140) / 20)) + 2, y - 1, Math.round(lerp(204, 214, (y - 140) / 20)) - 2, y - 1, K.tierraL); }
  for (const [x, y] of [[118, 140], [204, 140], [214, 160], [108, 160]]) { R.rect(x - 1, y - 8, x + 1, y, K.k); R.pset(x, y - 7, K.maderaL); R.pset(x, y - 4, K.madera); }
  R.linea(118, 134, 204, 134, K.crema); R.linea(204, 134, 214, 154, K.crema); R.linea(118, 134, 108, 154, K.crema);
  R.rect(158, 146, 166, 150, K.k); R.rect(159, 146, 165, 149, K.maderaL); R.disco(162, 146, 3, K.maderaS); R.pset(162, 146, K.maderaL);
});
// una burbuja de pensamiento (cx, cy) con su cola hacia (tx, ty)
const burbuja = (cx, cy, tx, ty, u) => { if (u <= 0) return; const s = Math.min(1, u * 1.4); const w = Math.round(28 * s), hh = Math.round(18 * s);
  R.disco(Math.round(lerp(tx, cx, 0.35)), Math.round(lerp(ty, cy, 0.35)), 2, K.k); R.disco(Math.round(lerp(tx, cx, 0.35)), Math.round(lerp(ty, cy, 0.35)), 1, K.blanco);
  R.disco(Math.round(lerp(tx, cx, 0.6)), Math.round(lerp(ty, cy, 0.6)), 3, K.k); R.disco(Math.round(lerp(tx, cx, 0.6)), Math.round(lerp(ty, cy, 0.6)), 2, K.blanco);
  for (const [dx, dy, r] of [[-w + 8, 0, 8], [w - 8, 0, 8], [0, -hh + 8, 9], [0, hh - 8, 8], [-w / 2, -hh / 2, 8], [w / 2, -hh / 2, 8], [-w / 2, hh / 2, 7], [w / 2, hh / 2, 7]]) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r * s) + 1, K.k);
  for (const [dx, dy, r] of [[-w + 8, 0, 8], [w - 8, 0, 8], [0, -hh + 8, 9], [0, hh - 8, 8], [-w / 2, -hh / 2, 8], [w / 2, -hh / 2, 8], [-w / 2, hh / 2, 7], [w / 2, hh / 2, 7]]) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r * s), K.blanco);
  R.rect(Math.round(cx - w + 6), Math.round(cy - hh + 6), Math.round(cx + w - 6), Math.round(cy + hh - 6), K.blanco); return s >= 1; };
// la tierra dentro de la burbuja: una loma con su árbol
const loma = (cx, cy) => { R.poligono([[cx - 20, cy + 8], [cx - 8, cy - 2], [cx + 8, cy - 3], [cx + 20, cy + 8]], K.hierbaS); R.poligono([[cx - 18, cy + 7], [cx - 8, cy - 1], [cx + 8, cy - 2], [cx + 18, cy + 7]], K.hierba); R.linea(cx, cy - 2, cx, cy - 7, K.maderaS); R.disco(cx, cy - 9, 4, K.bosque); R.disco(cx - 1, cy - 10, 2, K.bosqueL); };
const persona = (x, y, c) => { R.disco(x, y - 6, 1, K.k); R.rect(x - 1, y - 4, x + 1, y, c); };
const p7 = (t) => {
  fondo7();
  nubes(t, P7, [[30, 24, 26, 2], [140, 30, 18, 3], [80, 60, 30, 5], [250, 72, 24, 6]]);
  gaviotas(t, [[60, 42, 10, 0], [160, 54, 13, 2]]);
  for (let k = 0; k < 3; k++) { const hx = 220 + k * 28, y0 = 84; for (let j = 0; j < 4; j++) { const u = ((t * 0.5 + j * 0.25 + k * 0.3) % 1); R.disco(Math.round(hx + Math.sin(u * 6 + k) * 2 + u * 6), Math.round(y0 - u * 22), 1 + Math.round(u * 2), u > 0.6 ? K.cielo[7] : K.rocaL); } }
  T.molino(R, 300, 102, t, { s: 0.6, vel: 1.4 });
  // un pavo salvaje que picotea por el prado
  { const x = Math.round(270 - ((t - P7) * 4)), y = 150, pica = Math.sin(t * 5) > 0.5; R.disco(x, y - 5, 4, K.k); R.disco(x, y - 5, 3, K.maderaS); for (let i = -3; i <= 3; i++) R.pset(x + 4, y - 7 + i, i % 2 ? K.oro : K.madera); R.linea(x - 3, y - 2, x - 3, y, K.k); R.linea(x - 1, y - 2, x - 1, y, K.k);
    const hx = x - 5, hy = pica ? y - 3 : y - 9; R.linea(x - 3, y - 7, hx, hy, K.k); R.pset(hx - 1, hy, K.rojo); R.pset(hx, hy + 1, K.rojo); }
  // mariposa
  { const x = Math.round(70 + Math.sin(t * 0.7) * 40), y = Math.round(128 + Math.sin(t * 2.3) * 8), f = Math.floor(t * 10) % 2; R.pset(x, y, K.k); R.pset(x - 1, y - f, K.flor3); R.pset(x + 1, y - f, K.flor3); }
  // el colono llega con su papel; los dos se miran
  const cu = tramo(t, P7 + 0.1, P7 + 1.4), cx = Math.round(lerp(300, 222, cu));
  const lm = R.actor(EL.lenape, 84, 162, t, { dir: 1, sonrisa: t < SELL + 0.4, dedo: t > AGREEMENT && t < SHARE + 0.6, sorpresa: t > FOREVER + 0.2 });
  const cm = R.actor(EL.colono, cx, 162, t, { dir: -1, anda: cu > 0 && cu < 1, sostiene: t < AGREEMENT + 0.6 || t > SELL, sonrisa: true, habla: t > SELL && t < FOREVER + 0.4 && Math.sin(t * 8) > 0 });
  if (t < AGREEMENT + 0.6 || t > SELL) { const [mx, my] = cm.mano; R.rect(mx - 4, my - 3, mx + 3, my + 6, K.k); R.rect(mx - 3, my - 2, mx + 2, my + 5, K.papel); R.linea(mx - 2, my, mx + 1, my, K.papelS); R.linea(mx - 2, my + 2, mx + 1, my + 2, K.papelS); R.pset(mx, my + 4, K.rojo); }
  // las dos ideas: compartir (lenape) y vender para siempre (colono)
  if (burbuja(92, 104, 92, 134, tramo(t, SHARE - 0.15, SHARE + 0.3))) { loma(92, 108); persona(80, 110, K.azul); persona(104, 110, T.C.naranja); R.linea(81, 106, 103, 106, K.rojo); R.pset(92, 105, K.rojo); }
  if (burbuja(230, 104, 230, 134, tramo(t, SELL - 0.15, SELL + 0.3))) { loma(230, 108); for (let x = 212; x <= 248; x += 4) R.linea(x, 112, x, 106, K.maderaS); R.linea(212, 108, 248, 108, K.maderaS);
    const cierra = t > FOREVER + 0.05; R.rect(237, 95, 247, 103, K.k); R.rect(238, 96, 246, 102, K.oro); R.pset(242, 98, K.k); R.pset(242, 99, K.k);
    R.linea(239, 95, 239, cierra ? 91 : 88, K.k); R.linea(245, 95, 245, 91, K.k); R.linea(239, cierra ? 91 : 88, 245, 91, K.k);
    if (cierra && t < FOREVER + 0.6) destello(250, 92, tramo(t, FOREVER, FOREVER + 0.6)); }
};

const año = (t) => (t < P3 ? 1624 : t < P4 ? Math.round(lerp(1625, 1660, tramo(t, P3 + 0.2, NEWAMS - 0.3))) : t < P6 ? 1626 : t < P7 ? 1844 : 1626);
const efectos = [[1.1, 'ola'], [ARRIVE - 0.1, 'toc'], [FORT - 0.4, 'viento'], [WINDMILL - 0.15, 'boing'], [WINDMILL + 0.5, 'whoosh'],
  [BRICK + 0.2, 'toc'], [NEWAMS, 'palmada'], [DOLLARS, 'pop'], [MYTH - 0.05, 'sello'], [MYTH + 0.6, 'viento'],
  [Y1626, 'papel'], [SIXTY, 'brillo'], [CONVERTED + 0.3, 'lapiz'], [CENTURIES, 'papel'], [SHARE, 'pop'], [SELL, 'pop'], [FOREVER + 0.05, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
