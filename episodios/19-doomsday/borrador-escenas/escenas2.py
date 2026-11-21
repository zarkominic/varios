# Borrador de escenas del ep19, grupo S2: do-snap, do-ramas, do-steve, do-escudo (con el movimiento ya hecho).
E = {}

# ayudas comunes (se pegan al principio de cada cuerpo)
AY = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const KK = hex('#1a1014'), BL = 0xffffffff;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// fondos fijos en búferes: se pintan una vez (con prev = R.usar(b) y vuelta) y se copian enteros (fondo) o solo lo pintado (pegar)
const BUF = {};
const bufer = (clave, dibuja) => { if (!BUF[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); BUF[clave] = b; } return BUF[clave]; };
const fondo = (clave, dibuja) => R.copiar(bufer(clave, dibuja));
const pegar = (clave, dibuja) => { const b = bufer(clave, dibuja), B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } };
// rampa tramada de arriba abajo en [x0..x1]×[y0..y1]
const rampa = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[f > bay(x, y) ? i + 1 : i]); } };
// caja con contorno, cara, luz arriba-izquierda y sombra abajo-derecha
const caja = (x0, y0, x1, y1, c, cl, cs) => { R.rect(x0, y0, x1, y1, KK); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cl); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cl); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cs); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, cs); };
// gema facetada de radio s en (x, y); brillo > 0: destellos alrededor
const gema = (x, y, c, s = 3, brillo = 0) => { const cl = mez(c, BL, 0.5), cs = mez(c, KK, 0.45);
  for (let j = -s - 1; j <= s + 1; j++) for (let i = -s - 1; i <= s + 1; i++) { const d = Math.abs(i) + Math.abs(j); if (d > s + 1) continue; R.pset(x + i, y + j, d === s + 1 ? KK : (i + j < 0 ? cl : i + j > 1 ? cs : c)); }
  R.pset(x - 1, y - 1, BL); if (s > 3) R.pset(x - 2, y - 1, BL);
  if (brillo > 0) { const r = Math.round(s + 3 + brillo * 3); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + brillo; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), k % 2 ? cl : BL); } } };
const CORA = ['.kk.kk.', 'k##k##k', 'k#h####k'.slice(0, 7), 'k#####k', '.k###k.', '..k#k..', '...k...'];
const corazon = (x, y, c, s = 1) => CORA.forEach((f, j) => { for (let i = 0; i < 7; i++) { const ch = f[i]; if (ch === '.') continue; R.rect(x - 3 * s + i * s, y - 3 * s + j * s, x - 3 * s + i * s + s - 1, y - 3 * s + j * s + s - 1, ch === 'k' ? KK : ch === 'h' ? mez(c, BL, 0.6) : c); } });
// los trajes cuánticos de los Vengadores: blanco con franjas rojas
const QS = { C: hex('#eeeae2'), c: hex('#b4b0a8'), W: hex('#eeeae2'), F: hex('#c8303a'), G: hex('#c8303a'), I: hex('#2a2430'), n: hex('#2a2430'), X: hex('#c8303a'), r: hex('#c8303a') };
// el maletín plateado (en la mano: (x, y) = el asa)
const maletin = (x, y) => { R.rect(x - 2, y - 1, x + 2, y - 1, KK); R.pset(x - 2, y, KK); R.pset(x + 2, y, KK); caja(x - 6, y, x + 6, y + 8, hex('#c0c4cc'), hex('#eef0f4'), hex('#7a7e88')); R.rect(x - 5, y + 3, x + 5, y + 3, hex('#8a8e98')); R.pset(x - 3, y + 2, hex('#e8b830')); R.pset(x + 3, y + 2, hex('#e8b830')); };
const GEMAS = ['#9a4ae8', '#3a8ae8', '#e83a3a', '#e8903a', '#3ac85a', '#f0e040'].map(hex);
// nube de atardecer de tres tonos
const nubeT = (cx, cy, w, s, b, l) => { const bolas = [[0, 0, w * 0.3], [-w * 0.3, w * 0.07, w * 0.22], [w * 0.28, w * 0.06, w * 0.24], [-w * 0.1, -w * 0.12, w * 0.24]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), s);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy - 1), Math.round(r * 0.9), b);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx + 1), Math.round(cy + dy + 1 + r * 0.35), Math.round(r * 0.55), l); };
// pájaro en uve que aletea (silueta)
const ave = (x, y, t, k, c) => { const a = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - 1 - a, c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - 1 - a, c); };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-snap'] = ('El chasquido y el viaje', '''// DO-SNAP (frases 7–8), cartela «2019». Cinco planos:
// 1. el campo verde: Thanos llega andando con el guantelete y las seis gemas se encienden una a una («six stones»);
// 2. el campo de cerca: levanta el puño y chasquea («snap»): destello y la mitad de las flores y de los pájaros se
//    deshace en polvo de luz («wiped out»); él sonríe y se va hacia el porche;
// 3. el garaje-laboratorio («Five years later»): tres Vengadores en trajes blancos y rojos suben a la plataforma, Hulk
//    pulsa el mando y desaparecen en la columna de luz («into the past»);
// 4. la pizarra del laboratorio con cuatro relojes: Tony señala cada uno cuando la voz dice su año (2012, 2013, 2014 y,
//    sorpresa, 1970), y cada reloj se para y se enciende con su número;
// 5. 1970, un almacén militar: Steve entra de puntillas, saca el cubo azul de la vitrina («steal the stones») y se va;
//    el guardia baja el periódico y mira la vitrina vacía («before he can get them»).''', AY + r'''
const A = (f) => en('thanos', f), B = (f) => en('pasado', f);
const P2 = A(0.536), P3 = B(-0.03), P4 = B(0.355), P5 = B(0.787);
const gem0 = A(0.375), gem1 = A(0.451), snap = A(0.632), wiped = A(0.728), univ = A(0.933);
const llegan = B(0.137), boton = B(0.183), viaja = B(0.249), pasado = B(0.307);
const AÑOS = [[2012, B(0.388)], [2013, B(0.485)], [2014, B(0.587)], [1970, B(0.693)]];
const roba = B(0.825), cubo = B(0.861), antes = B(0.887), coge = B(0.947);

// 1 · el campo general: Thanos llega y se encienden las gemas
const p1 = (t) => {
  T.lago(R, t, { encuadre: 'campo' });
  const u = tramo(t, 1.4, A(0.33)), x = Math.round(lerp(-22, 112, u));
  const alza = tramo(t, gem0 - 0.3, gem0 + 0.2);
  const q = R.actor(EL.thanos, x, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza > 0 ? [x + 17, Math.round(lerp(146, 128, alza))] : true, sonrisa: t > gem1 });
  const [mx, my] = q.mano; T.PIEZAS_DO.guantelete(R, mx + 2, my + 2, t);
  // las gemas se encienden una a una: un destello en cada una
  const n = Math.floor(tramo(t, gem0, gem1) * 6.99);
  if (t > gem0) { const g = GEMAS[Math.min(5, n)], r = 7 + Math.round(Math.abs(Math.sin(t * 9)) * 3);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + t * 2; R.linea(Math.round(mx - 1 + Math.cos(a) * (r - 2)), Math.round(my - 6 + Math.sin(a) * (r - 2)), Math.round(mx - 1 + Math.cos(a) * r), Math.round(my - 6 + Math.sin(a) * r), k % 2 ? g : BL); } }
  if (t > gem1) for (let k = 0; k < 6; k++) R.pset(mx - 4 + k, my - 13 - Math.round(Math.abs(Math.sin(t * 6 + k))), GEMAS[k]);
};
// 2 · el campo de cerca: el chasquido y el polvo de luz
const p2 = (t) => {
  T.lago(R, t, { encuadre: 'campo', camara: 'cerca', polvo: tramo(t, wiped - 0.2, univ + 0.6) });
  const sube = tramo(t, P2 + 0.3, snap - 0.15), baja = tramo(t, univ - 0.2, univ + 0.3), va = tramo(t, univ + 0.1, P3 - 0.1);
  const x = Math.round(lerp(150, 214, va));
  const q = R.actor(EL.thanos, x, 160, t, { dir: 1, anda: va > 0 && va < 1, sostiene: va > 0 ? true : [x + 16, Math.round(lerp(lerp(146, 118, sube), 146, baja))], sonrisa: t > wiped + 0.6, enfado: t > P2 + 0.3 && t < snap + 0.3 });
  const [mx, my] = q.mano; T.PIEZAS_DO.guantelete(R, mx + 2, my + 2, t);
  // el chasquido: un anillo de luz desde el puño y un destello blanco que se apaga
  const d = tramo(t, snap, snap + 0.7);
  if (d > 0 && d < 1) { const r = Math.round(4 + d * 40); for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2; R.pset(Math.round(mx + Math.cos(a) * r), Math.round(my - 6 + Math.sin(a) * r * 0.8), k % 3 ? hex('#fff4c8') : BL); }
    T.tinte(R, 0, 179, [255, 250, 230], 0.55 * (1 - d)); }
  const pv = tramo(t, wiped - 0.1, univ + 0.9);
  if (pv > 0 && pv < 1) for (let k = 0; k < 150; k++) { const f = tramo(pv, hh(k, 40) * 0.55, hh(k, 40) * 0.55 + 0.45); if (f <= 0 || f >= 1) continue;
    const x0 = hh(k, 41) * 236, y0 = 120 + hh(k, 42) * 56, x = Math.round(x0 + f * 30 + Math.sin(f * 9 + k) * 3), y = Math.round(y0 - f * 70);
    const c = f < 0.7 ? hex('#ffd860') : hex('#f0a040'); R.disco(x, y, f < 0.5 ? 2.2 : 1.6, hex('#e08a20')); R.disco(x, y, f < 0.5 ? 1.5 : 1, c); R.pset(x, y, f < 0.5 ? BL : hex('#fff4c8')); }
  if (pv > 0 && pv < 1) T.tinte(R, 110, 179, [255, 220, 120], 0.18 * Math.sin(pv * Math.PI));
};
// 3 · el laboratorio: suben a la plataforma y viajan al pasado
const p3 = (t) => {
  const v = tramo(t, viaja - 0.3, pasado + 0.3);
  T.lago(R, t, { encuadre: 'laboratorio', viaje: v });
  // Hulk en los mandos, detrás de la barandilla
  R.actor(EL.hulk, 262, 158, t, { dir: -1, dedo: t > boton - 0.2 && t < boton + 0.8, habla: t > llegan && t < boton && Math.sin(t * 7) > 0, sonrisa: t > pasado });
  const ida = v > 0.62 || (v > 0.45 && Math.floor(t * 14) % 2);
  if (!ida) for (const [def, x1, k, d] of [[EL.steve, 124, 0, 1], [EL.tony, 148, 0.35, 1], [EL.antman, 172, 0.7, -1]]) {
    const u = tramo(t, P3 + 0.3 + k, llegan + 0.4 + k), x = Math.round(lerp(-20 - k * 30, x1, u));
    R.actor(def, x, 142, t, { dir: u < 1 ? 1 : d, anda: u > 0 && u < 1, pal: QS, sonrisa: def === EL.steve && t > boton, dedo: def === EL.tony && t > llegan + 1.2 && t < boton + 0.6, brazos: v > 0.2 && def !== EL.tony });
  }
  T.lagoDelante(R, t, { encuadre: 'laboratorio' });
};
// 4 · la pizarra con los cuatro relojes (fondo local, con el detalle del garaje)
const RELOJ = [[52, 66], [112, 66], [172, 66], [232, 66]];
const pizarra = () => {
  // pared de tablas verticales con vetas y clavos
  for (let x = 0; x < 320; x++) { const k = Math.floor(x / 13), tono = [hex('#8a5a34'), hex('#94623a'), hex('#80522e')][k % 3];
    for (let y = 0; y < 150; y++) { let c = tono; const v = hh(k, Math.floor(y / 3)) ; if (((x * 3 + Math.floor(y / 7) + k) % 11 === 0) && v > 0.4) c = mez(tono, KK, 0.25); if (x % 13 === 0) c = hex('#3a2414'); else if (x % 13 === 1) c = mez(tono, BL, 0.15); R.pset(x, y, c); } }
  for (let k = 0; k < 25; k++) for (const y of [24, 140]) { R.pset(k * 13 + 6, y, hex('#5a4a3a')); R.pset(k * 13 + 6, y - 1, hex('#c8c0b0')); }
  R.rect(0, 0, 319, 5, hex('#4a2e1a')); R.rect(0, 6, 319, 6, hex('#2a1a10'));
  // la pizarra: marco de madera y la tabla verde con borrones de tiza
  caja(10, 18, 272, 134, hex('#b07a44'), hex('#d0a06a'), hex('#7a4e28'));
  R.rect(15, 23, 267, 129, KK);
  for (let y = 24; y <= 128; y++) for (let x = 16; x <= 266; x++) { const n = hh(Math.floor(x / 9), Math.floor(y / 6), 3) * 0.6 + hh(x, y, 4) * 0.4; R.pset(x, y, n > 0.82 ? hex('#3e6450') : n > 0.62 && bay(x, y) > 0.5 ? hex('#34584a') : hex('#2a4a3c')); }
  const TZ = hex('#c8d4c4'), TZd = hex('#8aa494');
  // garabatos de tiza: una línea del tiempo arriba, fórmulas de rayas y círculos con flechas
  R.linea(26, 34, 256, 34, TZ); for (let x = 30; x < 256; x += 20) R.linea(x, 32, x, 36, TZ); R.linea(252, 31, 257, 34, TZ); R.linea(252, 37, 257, 34, TZ);
  for (let k = 0; k < 6; k++) { const x0 = 26 + k * 40; for (let i = 0; i < 18; i++) R.pset(x0 + i, 112 + Math.round(Math.sin(i * 0.8) * 2), TZd); R.linea(x0 + 22, 115, x0 + 26, 108, TZd); R.linea(x0 + 26, 108, x0 + 30, 115, TZd); R.linea(x0 + 22, 115, x0 + 30, 115, TZd); }
  R.linea(30, 120, 80, 118, TZd, 2); R.linea(150, 121, 250, 119, TZd, 2);
  // la bandeja de la tiza con tizas y borrador
  R.rect(12, 130, 270, 134, hex('#7a4e28')); R.rect(12, 130, 270, 130, hex('#d0a06a'));
  for (const [x, c] of [[40, '#f2eee2'], [48, '#f0a0b0'], [55, '#f0e080'], [140, '#f2eee2']]) R.rect(x, 128, x + 4, 129, hex(c));
  caja(200, 125, 218, 130, hex('#5a5a6a'), hex('#8a8a9a'), hex('#3a3a4a')); R.rect(201, 129, 217, 129, hex('#e8e0d0'));
  // tablero de herramientas a la derecha (perforado) con sus siluetas
  caja(276, 52, 318, 146, hex('#c8a878'), hex('#e0c498'), hex('#9a7a50'));
  for (let y = 56; y < 144; y += 4) for (let x = 280; x < 316; x += 4) R.pset(x, y, hex('#8a6a40'));
  R.rect(284, 60, 286, 84, hex('#8a8e98')); R.rect(282, 58, 288, 62, hex('#8a8e98')); R.rect(283, 59, 287, 60, hex('#c0c4cc'));   // llave inglesa
  R.rect(296, 60, 298, 82, hex('#a8743c')); R.rect(292, 58, 302, 63, hex('#5a5e6a')); R.rect(293, 59, 301, 59, hex('#9a9eaa'));   // martillo
  R.rect(307, 62, 309, 72, hex('#c83a2a')); R.rect(308, 73, 308, 86, hex('#c0c4cc'));   // destornillador
  R.rect(284, 96, 312, 100, hex('#3a6ac8')); R.rect(285, 97, 311, 97, hex('#6a9ae8')); R.rect(286, 102, 288, 120, hex('#c8303a')); R.rect(294, 102, 296, 124, hex('#e8b830')); R.rect(302, 102, 304, 116, hex('#4a4e58'));
  for (let k = 0; k < 4; k++) R.disco(288 + k * 7, 134, 2, [hex('#c0c4cc'), hex('#a87a18'), hex('#8a8e98'), hex('#c0c4cc')][k]);
  // enchufe con su cable
  caja(20, 138, 28, 146, hex('#e8e0d0'), BL, hex('#b8b0a0')); R.pset(23, 141, KK); R.pset(25, 141, KK);
  // el suelo de hormigón: juntas, manchas, un cable
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 7); R.pset(x, y, n > 0.9 ? hex('#8a8a92') : n < 0.12 ? hex('#5e5e66') : (bay(x, y) > 0.5 ? hex('#74747c') : hex('#6c6c74'))); }
  R.rect(0, 150, 319, 150, hex('#4a4a52')); R.rect(0, 151, 319, 151, hex('#9a9aa2'));
  for (const x of [70, 190, 300]) R.linea(x, 152, x - 14, 179, hex('#56565e'));
  for (let y = -5; y <= 5; y++) for (let x = -16; x <= 16; x++) if ((x * x) / 256 + (y * y) / 25 < 1 && hh(x, y, 9) > 0.25) R.pset(150 + x, 168 + y, hex('#4a4a54'));
  let cx = 24, cy = 146; for (let k = 0; k < 90; k++) { const nx = 24 + k * 3, ny = 158 + Math.round(Math.sin(k * 0.2) * 5); R.linea(cx, cy, nx, ny, KK); R.linea(cx, cy - 1, nx, ny - 1, hex('#3a3a44')); cx = nx; cy = ny; if (nx > 280) break; }
  // la caja de herramientas roja y el taburete
  caja(282, 152, 316, 170, hex('#c8303a'), hex('#e85a5a'), hex('#8a1e28')); R.rect(290, 148, 308, 149, KK); R.rect(290, 150, 291, 152, KK); R.rect(307, 150, 308, 152, KK); R.rect(283, 160, 315, 160, hex('#8a1e28')); R.rect(297, 158, 301, 162, hex('#c0c4cc'));
  caja(2, 156, 30, 160, hex('#a8743c'), hex('#c8904c'), hex('#7a4e28')); R.rect(5, 160, 7, 178, hex('#7a4e28')); R.rect(25, 160, 27, 178, hex('#7a4e28')); R.rect(5, 170, 27, 171, hex('#7a4e28'));
  caja(8, 150, 18, 155, hex('#e8e0d0'), BL, hex('#a8a090'));   // un trapo
};
const p4 = (t) => {
  fondo('pizarra', pizarra);
  // la lámpara que se mece con su cono de luz
  const lx = 230 + Math.round(Math.sin(t * 1.3) * 1.5);
  R.linea(230, 0, lx, 8, KK); R.poligono([[lx - 7, 15], [lx + 7, 15], [lx + 3, 8], [lx - 3, 8]], hex('#3a6a4a')); R.rect(lx - 7, 15, lx + 7, 15, hex('#24442e')); R.rect(lx - 2, 16, lx + 2, 17, hex('#fff4c8'));
  for (let k = 0; k < 10; k++) { const y = 24 + ((k * 23 + t * 6) % 100), x = lx - 12 + Math.round(hh(k, 1) * 24 + Math.sin(t + k) * 3); R.pset(x, Math.round(y), hex('#f8e8b0')); }
  // los cuatro relojes: giran deprisa hasta que la voz dice su año; entonces se paran, se encienden y sale el número
  RELOJ.forEach(([cx, cy], k) => {
    const [año, tA] = AÑOS[k], on = t >= tA, viejo = k === 3, r = 17;
    R.disco(cx + 1, cy + 2, r + 2, hex('#1e3a2c'));
    R.disco(cx, cy, r + 2, KK); R.disco(cx, cy, r + 1, viejo ? hex('#8a5a34') : hex('#c8c4bc')); R.disco(cx - 1, cy - 1, r, viejo ? hex('#b07a44') : hex('#e8e8ec'));
    R.disco(cx, cy, r - 2, KK); R.disco(cx, cy, r - 3, viejo ? hex('#e8dcc0') : hex('#f6f2ea'));
    for (let h = 0; h < 12; h++) { const a = h / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 5)), Math.round(cy + Math.sin(a) * (r - 5)), h % 3 ? hex('#8a8a94') : KK); }
    const giro = on ? 0 : t * (7 + k), am = on ? (k * 1.3 + 0.6) : giro * 0.08, mi = on ? (k * 2.1 + 4.2) : giro;
    R.linea(cx, cy, cx + Math.cos(am - Math.PI / 2) * 7, cy + Math.sin(am - Math.PI / 2) * 7, KK);
    R.linea(cx, cy, cx + Math.cos(mi - Math.PI / 2) * 11, cy + Math.sin(mi - Math.PI / 2) * 11, viejo ? hex('#8a3a2a') : hex('#3a3a4a'));
    R.disco(cx, cy, 1.5, hex('#c8303a'));
    if (on) { const g = tramo(t, tA, tA + 0.5), p = Math.sin(t * 6) > 0 ? 1 : 0;
      for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, rr = r + 4 + p; if ((a + Math.floor(t * 8)) % 3) R.pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr), hex('#ffd860')); }
      R.numero(String(año), cx, Math.round(lerp(106, 101, g)), { centro: true });
      // la flecha de tiza al reloj siguiente
      if (k < 3) { const w = tramo(t, tA + 0.3, AÑOS[k + 1][1] - 0.1); if (w > 0) R.linea(cx + 21, 88, Math.round(lerp(cx + 21, cx + 40, w)), 88, hex('#c8d4c4'), 3); }
    } else R.numero('?', cx, 104, { centro: true, color: hex('#8aa494') });
  });
  // Tony va de reloj en reloj y señala cada uno
  const paradas = [-20, 26, 86, 146, 206]; let x = paradas[0];
  for (let k = 0; k < 4; k++) { const tA = AÑOS[k][1], u = tramo(t, tA - 0.75, tA - 0.15); x = Math.round(lerp(k === 0 ? paradas[0] : paradas[k], paradas[k + 1], u)); if (t < tA - 0.15) break; }
  const andando = AÑOS.some(([, tA]) => t > tA - 0.75 && t < tA - 0.15);
  R.actor(EL.tony, x, 172, t, { dir: 1, anda: andando, pal: QS, dedo: !andando && t > AÑOS[0][1] - 0.2, sorpresa: t > AÑOS[3][1] && t < AÑOS[3][1] + 1.2, sonrisa: t > AÑOS[3][1] + 1.2 });
  // el café de la caja de herramientas humea
  caja(286, 140, 294, 148, hex('#e8e0d0'), BL, hex('#b8b0a0')); R.rect(294, 142, 295, 145, hex('#b8b0a0')); R.rect(287, 141, 293, 141, hex('#5a3a24'));
  for (let k = 0; k < 4; k++) { const v = (t * 0.7 + k * 0.25) % 1, y = Math.round(138 - v * 18), xx = Math.round(290 + Math.sin(v * 6 + k) * 2); if (v < 0.85) R.pset(xx, y, mez(hex('#c8c0b0'), hex('#9a7a54'), v)); }
};
// 5 · 1970: el almacén de la base, la vitrina con el cubo y el guardia del periódico
const almacen = () => {
  const B1 = hex('#9aae94'), B2 = hex('#8aa084'), J = hex('#6a7e66'), Z1 = hex('#5e7a5e'), Z2 = hex('#527050');
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 8), off = fila % 2 ? 8 : 0, zo = y >= 98;
    let c = (zo ? (bay(x, y) > 0.7 ? Z2 : Z1) : (hh(Math.floor((x + off) / 16), fila) > 0.5 ? B1 : B2)); if (y % 8 === 0 || (x + off) % 16 === 0) c = zo ? hex('#40583e') : J; if (!zo && hh(x, y, 2) > 0.97) c = J; R.pset(x, y, c); }
  R.rect(0, 96, 319, 97, hex('#c8c0a0')); R.rect(0, 0, 319, 3, hex('#4a5a48'));
  // los tubos del techo (luz suave, fuera de la barra del año y de Atom)
  for (const x0 of [186, 226]) { caja(x0, 4, x0 + 34, 9, hex('#d8dcd0'), BL, hex('#a8aca0')); R.rect(x0 + 2, 6, x0 + 32, 7, hex('#fffbe0')); }
  // la puerta redonda de la cámara acorazada, entreabierta
  R.disco(57, 76, 47, KK); R.disco(57, 76, 46, hex('#5a5e66')); R.disco(56, 75, 43, hex('#7a7e88')); R.disco(57, 76, 40, KK); R.disco(57, 76, 39, hex('#9a9ea8')); R.disco(55, 74, 34, hex('#aeb2bc'));
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; R.disco(Math.round(57 + Math.cos(a) * 43), Math.round(76 + Math.sin(a) * 43), 1.6, hex('#c8ccd4')); }
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; R.linea(57, 76, 57 + Math.cos(a) * 16, 76 + Math.sin(a) * 16, hex('#3a3e46')); R.disco(Math.round(57 + Math.cos(a) * 16), Math.round(76 + Math.sin(a) * 16), 2, hex('#c8303a')); }
  R.disco(57, 76, 5, KK); R.disco(57, 76, 4, hex('#c8ccd4')); R.anillo?.(57, 76, 16, KK);
  R.poligono([[98, 40], [104, 46], [104, 108], [98, 114]], hex('#1a1c22'));   // la rendija oscura
  for (let y = 124; y < 130; y++) for (let x = 14; x < 100; x++) R.pset(x, y, ((x + y) >> 2) % 2 ? hex('#e8c030') : KK);   // franja de aviso
  // las estanterías de metal con cajas de munición, archivadores, un casco y una radio
  for (const x of [108, 174]) R.rect(x, 38, x + 2, 138, hex('#5a5e66'));
  for (const y of [62, 94, 126]) { R.rect(108, y, 176, y + 2, hex('#6a6e76')); R.rect(108, y, 176, y, hex('#9a9ea8')); }
  const cajas = [[112, 48, 136, 61, '#6a6a3a'], [138, 52, 156, 61, '#7a7a46'], [158, 44, 172, 61, '#c8b890'], [112, 80, 130, 93, '#c8b890'], [132, 82, 150, 93, '#c8b890'], [152, 76, 172, 93, '#6a6a3a'], [114, 110, 146, 125, '#7a7a46'], [150, 114, 172, 125, '#4a4e3a']];
  for (const [x0, y0, x1, y1, c] of cajas) { const cc = hex(c); caja(x0, y0, x1, y1, cc, mez(cc, BL, 0.25), mez(cc, KK, 0.3)); R.rect(x0 + 3, y0 + 4, x1 - 3, y0 + 4, mez(cc, KK, 0.4)); }
  R.disco(165, 106, 6, KK); R.disco(165, 106, 5, hex('#5a6a3a')); R.rect(158, 107, 172, 109, hex('#4a5a2a'));   // casco
  caja(118, 30, 142, 37, hex('#5a5e46'), hex('#7a7e5e'), hex('#3a3e2a')); R.linea(138, 30, 144, 20, KK);   // radio de campaña
  // el calendario de 1970 en la pared
  caja(150, 16, 190, 44, hex('#f2eee2'), BL, hex('#c8c0b0')); R.rect(151, 17, 189, 21, hex('#c8303a')); R.rect(169, 14, 171, 17, KK);
  R.numero('1970', 170, 33, { centro: true, color: hex('#2a2430') });
  for (let j = 0; j < 2; j++) for (let i = 0; i < 7; i++) R.rect(154 + i * 5, 37 + j * 3, 156 + i * 5, 37 + j * 3, hex('#8a8494'));
  // el reloj de pared
  R.disco(250, 32, 10, KK); R.disco(250, 32, 9, hex('#e8e0d0')); R.linea(250, 32, 250, 25, KK); R.linea(250, 32, 255, 34, KK);
  // el suelo de linóleo a cuadros con rozaduras
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const c = ((Math.floor(x / 20) + Math.floor((y - 140) / 10)) % 2) ? hex('#8a8a7a') : hex('#6e6e62'); R.pset(x, y, hh(x, y, 5) > 0.93 ? mez(c, BL, 0.2) : bay(x, y) > 0.85 ? mez(c, KK, 0.1) : c); }
  R.rect(0, 138, 319, 139, hex('#3a4a3a'));
  // el pedestal y la vitrina (el cubo va aparte)
  caja(186, 126, 226, 154, hex('#8a8e98'), hex('#b0b4bc'), hex('#5a5e66')); caja(182, 150, 230, 156, hex('#6a6e76'), hex('#9a9ea8'), hex('#4a4e56'));
  caja(190, 120, 222, 126, hex('#5a1a24'), hex('#8a2a34'), hex('#3a0e14'));
  // la mesa del guardia (va delante, en otro búfer) y lo que hay detrás: un archivador
  caja(296, 98, 318, 138, hex('#6a7a5a'), hex('#8a9a7a'), hex('#4a5a3a')); for (const y of [106, 118, 130]) { R.rect(298, y, 316, y, hex('#4a5a3a')); R.rect(304, y + 2, 310, y + 3, hex('#c8ccd4')); }
};
const mesaG = () => {
  caja(232, 126, 300, 162, hex('#7a5232'), hex('#9a6a42'), hex('#5a3a22')); R.rect(232, 124, 300, 127, KK); R.rect(233, 125, 299, 125, hex('#b07a4a'));
  for (const y of [134, 146]) { R.rect(270, y, 296, y, hex('#5a3a22')); R.rect(280, y + 4, 286, y + 5, hex('#c8a040')); }
  R.rect(236, 162, 240, 170, hex('#5a3a22')); R.rect(292, 162, 296, 170, hex('#5a3a22'));
  // el teléfono de disco, la taza y el flexo verde
  R.rect(238, 118, 252, 124, KK); R.rect(239, 119, 251, 123, hex('#2a2430')); R.disco(245, 120, 2, hex('#8a8494')); R.rect(237, 116, 253, 117, KK);
  caja(256, 118, 262, 124, hex('#f2eee2'), BL, hex('#c8c0b0'));
};
const p5 = (t) => {
  fondo('almacen', almacen);
  // el parpadeo de un tubo
  if (Math.floor(t * 9) % 13 === 0) R.rect(228, 6, 258, 7, hex('#c8c8b0'));
  // el ratón que cruza junto al zócalo
  const rx = Math.round(lerp(330, -20, tramo(t, P5 + 0.4, P5 + 2.4))); if (rx > -10 && rx < 325) { R.rect(rx, 135, rx + 6, 138, hex('#7a7a84')); R.pset(rx - 1, 136, hex('#7a7a84')); R.pset(rx + 1, 134, hex('#f0a0b0')); R.linea(rx + 7, 137, rx + 11, 136 + (Math.floor(t * 10) % 2), hex('#7a7a84')); R.pset(rx, 135, KK); }
  // Steve entra de puntillas, saca el cubo y se va
  const u = tramo(t, P5 + 0.05, roba + 0.15), w = tramo(t, antes + 0.1, coge + 0.6);
  const x = w > 0 ? Math.round(lerp(170, -24, w)) : Math.round(lerp(-20, 170, u));
  const cogido = t > cubo - 0.05;
  const brazo = !cogido && t > roba ? [200, 116] : true;
  const q = R.actor(EL.steve, x, 158, t, { dir: w > 0 ? -1 : 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), pal: QS, sostiene: t > roba ? brazo : false, sonrisa: cogido });
  // el cubo azul que brilla: en la vitrina o en la mano
  const [cx, cy] = cogido ? [q.mano[0], q.mano[1] - 3] : [206, 114];
  const p = 0.5 + 0.5 * Math.sin(t * 6);
  R.disco(cx, cy, 6 + p, mez(hex('#3a8ae8'), hex('#9ac8ff'), 0.3)); caja(cx - 3, cy - 3, cx + 3, cy + 3, hex('#5aa8ff'), hex('#c8e8ff'), hex('#2a6ac8')); R.pset(cx - 1, cy - 1, BL);
  // la vitrina de cristal: la tapa se levanta cuando Steve la abre
  const abre = tramo(t, roba - 0.1, roba + 0.25) - tramo(t, antes, antes + 0.3);
  const vy = 98 - Math.round(abre * 8);
  R.rect(190, vy, 222, vy, hex('#c8ccd4')); R.rect(190, vy, 190, 120, hex('#c8ccd4')); R.rect(222, vy, 222, 120, hex('#c8ccd4'));
  for (let k = 0; k < 3; k++) R.linea(194 + k * 9, vy + 16, 200 + k * 9, vy + 4, mez(hex('#c8e8ff'), hex('#7a7e88'), 0.3));
  // el guardia lee el periódico detrás de su mesa; al final lo baja y ve la vitrina vacía
  const baja = tramo(t, coge + 0.2, coge + 0.5);
  const g = R.actor(EL.guardia, 258, 137, t, { dir: -1, sostiene: [262, Math.round(lerp(122, 140, baja))], sorpresa: baja > 0.5 });
  const [nx, ny] = g.mano; caja(nx - 10, ny - 14, nx + 6, ny + 4, hex('#e8e4d8'), BL, hex('#b8b4a8'));
  for (let j = 0; j < 5; j++) R.rect(nx - 8, ny - 11 + j * 3, nx + (j % 2 ? 2 : 4), ny - 11 + j * 3, hex('#8a8494')); R.rect(nx - 8, ny - 12, nx - 2, ny - 10, hex('#4a4454'));
  pegar('mesaG', mesaG);
  // el ventilador de la mesa gira
  R.rect(276, 108, 278, 124, KK); R.rect(272, 122, 282, 124, hex('#3a3a44')); R.disco(277, 106, 7, hex('#5a5e66')); R.disco(277, 106, 6, hex('#8a8e98'));
  for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.1; R.linea(277, 106, 277 + Math.cos(a) * 5, 106 + Math.sin(a) * 5, hex('#c8ccd4')); } R.disco(277, 106, 1.5, KK);
  if (baja > 0.5 && Math.floor(t * 5) % 2) R.icono('!', 264, 94, hex('#c8303a'), KK);
  pegar('cajasD', () => { for (const [x0, y0, x1, y1, c] of [[92, 156, 124, 178, '#6a6a3a'], [96, 140, 120, 157, '#7a7a46'], [126, 164, 146, 178, '#c8b890']]) { const cc = hex(c); caja(x0, y0, x1, y1, cc, mez(cc, BL, 0.25), mez(cc, KK, 0.3)); R.rect(x0 + 3, y0 + 4, x1 - 3, y0 + 4, mez(cc, KK, 0.4)); R.rect(x0 + 2, y1 - 3, x1 - 2, y1 - 3, mez(cc, KK, 0.2)); }
    R.rect(98, 146, 118, 148, hex('#4a4a2a')); R.disco(136, 162, 1.5, KK); });
};
const efectos = [[gem1, 'brillo'], [snap, 'flash'], [wiped + 0.05, 'viento'], [P3 + 0.4, 'puerta'], [viaja - 0.25, 'zumbido'], [pasado - 0.1, 'flash'],
  ...AÑOS.map(([, tA]) => [tA, 'tic']), [roba, 'cerrojo'], [cubo, 'brillo'], [coge + 0.2, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '2019', efectos, año: 2019 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-ramas'] = ('La rama nueva', '''// DO-RAMAS (frases 9–10), sin cartela, 2019. Cuatro planos:
// 1. el árbol del tiempo: una línea de luz recta; una chispa viaja hacia atrás por ella y, al tocar el pasado («past»),
//    brota la primera rama; Tony y Bruce la miran desde la plataforma (Tony señala el presente: no cambia);
// 2. de cerca: la rama nueva crece y se va por su cuenta con su mundo («a new branch… its own way»); Tony la sigue;
// 3. el banco del laboratorio: el estuche con las seis gemas y el martillo; Steve llega y Bruce se lo explica;
//    «return each Stone»: las gemas laten;
// 4. el estuche de cerca, visto desde arriba: la mano de Steve pone la última gema («exact moment»), se encienden los
//    años bajo cada gema y la mano cierra la tapa («no loose branches») y echa el cierre.''', AY + r'''
const Ra = (f) => en('rama', f), D = (f) => en('devolver', f);
const P2 = Ra(0.576), P3 = D(-0.044), P4 = D(0.485);
const altera = Ra(0.3185), pasado = Ra(0.3596), cambia = Ra(0.478), crea = Ra(0.618), nueva = Ra(0.804), suya = Ra(0.955);
const fin = D(0.157), alguien = D(0.258), devuelve = D(0.333), piedra = D(0.413);
const exacto = D(0.546), vino = D(0.635), sueltas = D(0.7225), ramas = D(0.784), alrededor = D(0.928);

// 1 · el árbol: la chispa viaja al pasado y brota la primera rama
const p1 = (t) => {
  const b = tiempoR(t);
  // la chispa que viaja hacia atrás por la línea (de derecha a izquierda)
  const u = tramo(t, 1.6, pasado), x = Math.round(lerp(300, 112, u)), y = b.linea ?? 88;
  if (u > 0 && u < 1) { for (let k = 1; k < 22; k++) for (const dy of [-1, 1]) R.pset(x + k * 2, y + dy * Math.max(0, 3 - (k >> 2)) + Math.round(Math.sin(t * 20 + k) * 0.6), k < 8 ? hex('#9af0ff') : hex('#3a8ae8'));
    R.disco(x, y, 6, hex('#3a8ae8')); R.disco(x, y, 5, hex('#9af0ff')); R.disco(x, y, 3, BL); for (let k = 0; k < 4; k++) { const a = t * 9 + k * Math.PI / 2; R.pset(Math.round(x + Math.cos(a) * 8), Math.round(y + Math.sin(a) * 8), hex('#9af0ff')); } }
  const toca = tramo(t, pasado, pasado + 0.8); if (toca > 0 && toca < 1) { const r = Math.round(3 + toca * 16); for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; R.pset(Math.round(112 + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.6), hex('#a8f0a0')); } }
  R.actor(EL.tony, 128, 166, t, { dir: t > cambia - 0.2 && t < cambia + 0.9 ? 1 : -1, pal: QS, dedo: t > 1.8 && t < pasado + 0.6 || t > cambia - 0.2 && t < cambia + 0.9, sorpresa: t > pasado && t < cambia - 0.2, habla: t > cambia && Math.sin(t * 8) > 0 });
  R.actor(EL.hulk, 92, 166, t, { dir: 1, sorpresa: t > pasado + 0.1, sonrisa: t < pasado });
  if (t > cambia + 0.1 && t < cambia + 1.1) R.icono('?', 152, 126, hex('#ffd860'), KK);
};
const tiempoR = (t) => T.tiempo(R, t, { encuadre: 'arbol', ramas: 0.02 * tramo(t, pasado + 0.1, pasado + 1.6) });
// 2 · la rama nueva de cerca: crece y se va por su cuenta
const p2 = (t) => {
  const r = tramo(t, crea, suya);
  T.tiempo(R, t, { encuadre: 'arbol', camara: 'poda', ramas: r });
  const v = tramo(t, nueva - 0.6, suya), x = Math.round(lerp(118, 196, v));
  R.actor(EL.tony, x, 166, t, { dir: 1, anda: v > 0 && v < 1, pal: QS, dedo: v >= 1 || t < nueva - 0.6, sorpresa: t > crea && t < nueva - 0.6, sonrisa: v >= 1 });
  R.actor(EL.hulk, 46, 166, t, { dir: 1, sorpresa: t > crea + 0.2 && t < suya, sonrisa: t > suya });
  if (t > crea && t < crea + 1.2 && Math.floor(t * 5) % 2) R.icono('!', 52, 128, hex('#c8303a'), KK);
};
// 3 · el banco con el estuche: Steve llega y Bruce se lo explica
const p3 = (t) => {
  const g = T.lago(R, t, { encuadre: 'laboratorio', camara: 'estuche' });
  const u = tramo(t, P3 + 0.2, fin + 0.2), x = Math.round(lerp(-20, 96, u));
  R.actor(EL.steve, x, 134, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > devuelve - 0.1 && t < piedra + 0.8, sonrisa: t > piedra + 0.8 });
  R.actor(EL.hulk, 226, 136, t, { dir: -1, habla: t > fin && t < devuelve && Math.sin(t * 7) > 0, dedo: t > alguien && t < devuelve, sonrisa: t > devuelve });
  T.lagoDelante(R, t, { encuadre: 'laboratorio', camara: 'estuche' });
  // las gemas laten una a una cuando la voz dice «return each Stone»
  const gm = g?.gemas ?? [131, 143, 155, 167, 179, 191].map((xx) => [xx, 133]);
  gm.forEach(([gx, gy], k) => { const a = tramo(t, devuelve + k * 0.12, devuelve + k * 0.12 + 0.3) - tramo(t, devuelve + 1.2 + k * 0.1, devuelve + 1.6 + k * 0.1); if (a > 0) for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4 + t * 3; R.pset(Math.round(gx + Math.cos(an) * (4 + a * 2)), Math.round(gy + Math.sin(an) * (4 + a * 2)), GEMAS[k]); } });
};
// 4 · el estuche desde arriba (fondo local: el banco de trabajo con sus cosas)
const RAN = [64, 102, 140, 178, 216, 254], GY = 96, AÑOG = ['2014', '1970', '2013', '2014', '2012', '2012'];
const banco = () => {
  // la chapa del banco: rayas, remaches, agujeros
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y, 11); R.pset(x, y, n > 0.96 ? hex('#9a9ea8') : (bay(x, y) > 0.55 ? hex('#7a7e88') : hex('#72767f'))); }
  for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 1) * 320), y = Math.round(hh(k, 2) * 180), l = 4 + Math.round(hh(k, 3) * 10); R.linea(x, y, x + l, y + Math.round(l * 0.3), hex('#9ca0aa')); }
  for (let x = 6; x < 320; x += 24) for (const y of [4, 174]) { R.disco(x, y, 1.5, hex('#5a5e66')); R.pset(x - 1, y - 1, hex('#c8ccd4')); }
  // el plano azul con el dibujo de la línea del tiempo y su rama
  caja(4, 142, 122, 178, hex('#2a4a8a'), hex('#3a5aa0'), hex('#1e3870'));
  for (let x = 8; x < 120; x += 6) R.rect(x, 144, x, 176, hex('#34549a')); for (let y = 146; y < 176; y += 6) R.rect(6, y, 120, y, hex('#34549a'));
  R.linea(12, 162, 112, 162, hex('#e8f0ff')); R.linea(50, 162, 76, 150, hex('#e8f0ff')); R.linea(76, 150, 100, 148, hex('#e8f0ff')); for (const x of [20, 40, 60, 80, 100]) R.rect(x, 161, x, 163, hex('#e8f0ff'));
  // la llave inglesa, los tornillos, el lápiz y una linterna
  R.linea(134, 166, 186, 170, KK); R.linea(134, 165, 186, 169, hex('#a8acb4')); R.linea(134, 167, 186, 171, hex('#7a7e88')); R.disco(132, 165, 4, KK); R.disco(132, 165, 3, hex('#a8acb4')); R.rect(129, 164, 131, 166, hex('#72767f'));
  for (const [x, y] of [[196, 160], [204, 166], [214, 158], [150, 152]]) { R.disco(x, y, 2, KK); R.disco(x, y, 1.4, hex('#c8a040')); R.pset(x, y, hex('#7a5a20')); }
  R.linea(226, 176, 262, 150, KK); R.linea(227, 176, 263, 150, hex('#f0c030')); R.linea(228, 176, 264, 150, hex('#c89a20')); R.rect(262, 148, 265, 151, hex('#f0a0b0'));
  caja(6, 10, 40, 22, hex('#2a2430'), hex('#4a4454'), hex('#1a1420')); R.rect(40, 12, 44, 20, hex('#c8ccd4')); R.rect(41, 13, 43, 19, hex('#fff4c8'));
  // a la izquierda: el destornillador y tuercas; a la derecha: el polímetro y el carrete de cable rojo
  R.linea(8, 60, 30, 52, KK); R.linea(8, 61, 30, 53, hex('#c0c4cc')); caja(28, 48, 40, 56, hex('#c8303a'), hex('#e85a5a'), hex('#8a1e28'));
  for (const [x, y] of [[14, 86], [26, 96], [18, 112], [32, 124]]) { R.disco(x, y, 3, KK); R.disco(x, y, 2.4, hex('#a8acb4')); R.disco(x, y, 1, hex('#5a5e66')); }
  caja(282, 56, 314, 98, hex('#e8b830'), hex('#f8d860'), hex('#a87a18')); R.rect(286, 60, 310, 70, KK); R.rect(287, 61, 309, 69, hex('#8ab88a')); R.numero('88', 298, 69, { centro: true, color: hex('#2a3a2a'), sombra: false });
  R.disco(298, 84, 7, KK); R.disco(298, 84, 6, hex('#3a3a44')); R.linea(298, 84, 302, 79, hex('#e8ecf2')); R.linea(288, 98, 284, 132, hex('#c8303a')); R.linea(308, 98, 312, 130, KK);
  R.disco(298, 124, 12, KK); R.disco(298, 124, 11, hex('#c8303a')); for (let r = 4; r < 11; r += 2) R.anillo?.(298, 124, r, hex('#8a1e28')); R.disco(298, 124, 4, hex('#c8a878')); R.disco(298, 124, 2, KK);
  // el estuche: el cuerpo de aluminio y el forro de espuma con las seis ranuras y sus placas
  R.rect(44, 74, 274, 144, KK); caja(45, 75, 273, 143, hex('#c0c4cc'), hex('#eef0f4'), hex('#8a8e98'));
  R.rect(50, 80, 268, 138, KK);
  for (let y = 81; y <= 137; y++) for (let x = 51; x <= 267; x++) R.pset(x, y, ((x >> 2) + (y >> 2)) % 2 ? hex('#2a2a36') : hex('#24242e'));
  RAN.forEach((cx) => { R.rect(cx - 12, GY - 12, cx + 12, GY + 12, KK); R.rect(cx - 11, GY - 11, cx + 11, GY + 11, hex('#14141c')); R.rect(cx - 11, GY - 11, cx + 11, GY - 11, hex('#0a0a10')); R.rect(cx - 11, GY + 11, cx + 11, GY + 11, hex('#3a3a48'));
    caja(cx - 17, 113, cx + 17, 126, hex('#a87a28'), hex('#e8b830'), hex('#7a5418')); });
  // las bisagras y los cierres
  for (const x of [80, 238]) caja(x - 6, 70, x + 6, 76, hex('#8a8e98'), hex('#c8ccd4'), hex('#5a5e66'));
  for (const x of [96, 222]) caja(x - 6, 140, x + 6, 148, hex('#8a8e98'), hex('#c8ccd4'), hex('#5a5e66'));
};
const p4 = (t) => {
  fondo('banco', banco);
  // la taza de café (vista desde arriba) humea
  R.disco(292, 160, 10, KK); R.disco(292, 160, 9, hex('#e8e0d0')); R.disco(292, 160, 7, hex('#4a2a14')); R.disco(290, 158, 2, hex('#7a4a24')); R.rect(302, 156, 307, 164, KK); R.rect(303, 157, 306, 163, hex('#e8e0d0')); R.rect(304, 158, 305, 162, hex('#72767f'));
  for (let k = 0; k < 5; k++) { const v = (t * 0.6 + k * 0.2) % 1; R.pset(Math.round(290 + Math.sin(v * 7 + k) * 3), Math.round(156 - v * 20), mez(hex('#d8d4cc'), hex('#7a7e88'), v)); }
  // la tapa: abierta (el forro de terciopelo acolchado) y, al final, cerrándose
  const c = tramo(t, sueltas, ramas + 0.5);
  if (c < 0.5) { const h = Math.round(50 * Math.cos(c * Math.PI)), y0 = 72 - h;
    if (h > 1) { R.rect(44, y0, 274, 72, KK); R.rect(46, y0 + 1, 272, 71, hex('#c0c4cc'));
      for (let y = y0 + 4; y <= 69; y++) for (let x = 50; x <= 268; x++) { const q = ((x - 50) % 14 + (y - y0) * 14 / Math.max(1, h)) % 14; R.pset(x, y, q < 1.5 ? hex('#5a1018') : ((x + y) % 7 === 0 ? hex('#a83040') : hex('#7a1a24'))); } }
  }
  // las gemas en sus ranuras (la última la trae la mano)
  const pone = tramo(t, P4 + 0.1, exacto);
  RAN.forEach((cx, k) => { if (k === 5 && pone < 1) return; const br = tramo(t, vino - 0.6 + k * 0.15, vino - 0.3 + k * 0.15) - tramo(t, sueltas - 0.2, sueltas); gema(cx, GY, GEMAS[k], 6, br > 0 ? br + t : 0); });
  // los años de cada gema en sus placas: se encienden uno a uno
  RAN.forEach((cx, k) => { const on = t > exacto + 0.1 + k * 0.17; R.numero(AÑOG[k], cx, 124, { centro: true, color: on ? hex('#fff4c8') : hex('#5a3a10'), sombra: on }); });
  if (c >= 0.5) { const h = Math.round(68 * (c - 0.5) * 2), y1 = 72 + h;
    R.rect(44, 70, 274, y1, KK); R.rect(46, 71, 272, y1 - 1, hex('#b0b4bc'));
    for (let y = 73; y < y1 - 1; y += 6) { R.rect(48, y, 270, y, hex('#d8dce4')); R.rect(48, y + 1, 270, y + 1, hex('#9a9ea8')); } R.rect(46, y1 - 2, 272, y1 - 1, hex('#7a7e88'));
    if (h > 20) { for (const [x0, x1] of [[44, 58], [260, 274]]) { R.rect(x0, 70, x1, Math.min(y1, 84), KK); R.rect(x0 + 1, 71, x1 - 1, Math.min(y1 - 1, 83), hex('#3a3e46')); R.pset(x0 + 4, 75, hex('#c8ccd4')); R.pset(x1 - 4, 75, hex('#c8ccd4')); }
      for (let x = 66; x < 260; x += 16) { R.disco(x, 74, 1.4, KK); R.pset(x, 74, hex('#eef0f4')); } }
    if (h > 50) { for (const [x0, x1] of [[44, 58], [260, 274]]) { R.rect(x0, y1 - 14, x1, y1, KK); R.rect(x0 + 1, y1 - 13, x1 - 1, y1 - 1, hex('#3a3e46')); }
      R.rect(130, y1 - 30, 190, y1 - 14, KK); R.rect(131, y1 - 29, 189, y1 - 15, hex('#c8ccd4')); R.rect(133, y1 - 27, 187, y1 - 17, hex('#a8acb4')); R.rect(131, y1 - 29, 189, y1 - 29, hex('#eef0f4'));
      R.rect(146, y1 - 40, 174, y1 - 36, KK); R.rect(146, y1 - 36, 149, y1 - 32, KK); R.rect(171, y1 - 36, 174, y1 - 32, KK); R.rect(147, y1 - 39, 173, y1 - 38, hex('#3a3a44'));
      for (let k = 0; k < 9; k++) { const x = 60 + Math.round(hh(k, 50) * 196), y = y1 - 60 + Math.round(hh(k, 51) * 44); R.linea(x, y, x + 3 + (k % 4), y + 1, hex('#e8ecf2')); } } }
  // la mano de Steve: trae la gema amarilla, la deja, espera y cierra la tapa
  let wx, wy; const lleva = pone < 1;
  if (t < exacto + 0.2) { wx = Math.round(lerp(330, RAN[5] + 9, pone)); wy = Math.round(lerp(170, GY + 1, pone)); }
  else if (t < sueltas - 0.2) { const r = tramo(t, exacto + 0.2, exacto + 0.9); wx = Math.round(lerp(RAN[5] + 9, 296, r)); wy = Math.round(lerp(GY + 1, 132, r)); }
  else if (c < 1) { const ye = c < 0.5 ? 72 - Math.round(50 * Math.cos(c * Math.PI)) : 72 + Math.round(68 * (c - 0.5) * 2); const r = tramo(t, sueltas - 0.2, sueltas + 0.1); wx = Math.round(lerp(296, 236, r)); wy = Math.round(lerp(132, ye, r)); }
  else { const r = tramo(t, alrededor - 0.4, alrededor + 0.5), pat = t < alrededor - 0.4 ? Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0; wx = Math.round(lerp(236, 340, r)); wy = Math.round(lerp(140 - pat, 190, r)); }
  if (lleva) gema(wx - 9, wy + 1, GEMAS[5], 5);
  T.brazo(R, 352, 214, wx, wy, '#2a4fa8', -1, { codo: [Math.round((352 + wx) / 2 + 14), Math.round((214 + wy) / 2 + 10)] });
  // el clic del cierre
  const cl = tramo(t, ramas + 0.5, ramas + 0.8); if (cl > 0 && cl < 1) for (const x of [96, 222]) for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; R.pset(Math.round(x + Math.cos(a) * (6 + cl * 4)), Math.round(144 + Math.sin(a) * (6 + cl * 4)), BL); }
};
const efectos = [[1.6, 'whoosh'], [pasado, 'brillo'], [nueva - 0.1, 'whoosh'], [P3 + 0.4, 'puerta'], [devuelve, 'brillo'], [exacto, 'golpecito'], [vino, 'brillo'], [ramas + 0.5, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2019 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-steve'] = ('Steve se queda', '''// DO-STEVE (frases 11–12), sin cartela, 2019. Cinco planos:
// 1. el laboratorio al atardecer: Steve sube a la plataforma con el maletín de las gemas y el martillo al cinto; Sam y
//    Bucky le despiden tras la barandilla; Bruce pulsa y Steve se va en la luz («travels… Thor's hammer»);
// 2. la cocina de 1945 de noche: Peggy gira el dial de la radio; Steve aparece en un destello, duda («instead of coming
//    right back»), se vuelve hacia ella («decides to stay») y va hacia ella; ella sonríe;
// 3. la radio grande: bailan despacio cogidos de la mano y salen corazones («the love of his life»);
// 4. el lago al atardecer: Sam y Bucky llegan («his friends wait»), Bucky ve al anciano en el banco («find him as an
//    old man») y Sam se sorprende;
// 5. el banco de cerca: Sam se acerca; el escudo brilla junto a Steve («the shield beside him») y él se lo da
//    («hands to Sam Wilson»); Sam lo coge y sonríe.''', AY + r'''
const Pg = (f) => en('peggy', f), Bn = (f) => en('banco', f);
const P2 = Pg(0.44), P3 = Pg(0.766), P4 = Bn(-0.031), P5 = Bn(0.4376);
const nombre = Pg(0.044), capi = Pg(0.151), viaja = Pg(0.264), martillo = Pg(0.363);
const vuelta = Pg(0.494), decide = Pg(0.599), queda = Pg(0.649), carter = Pg(0.829), amor = Pg(0.925);
const espera = Bn(0.045), presente = Bn(0.145), encuentra = Bn(0.287), viejo = Bn(0.351);
const banco = Bn(0.497), lago = Bn(0.566), escudo = Bn(0.676), da = Bn(0.851), sam = Bn(0.894);

// 1 · el laboratorio al atardecer: Steve se va con las gemas y el martillo
const p1 = (t) => {
  const v = tramo(t, viaja + 0.2, martillo + 0.7);
  T.lago(R, t, { encuadre: 'laboratorio', viaje: v });
  T.tinte(R, 0, 179, [255, 140, 60], 0.24);
  R.actor(EL.hulk, 52, 160, t, { dir: 1, dedo: t > viaja - 0.3 && t < viaja + 0.8, sonrisa: t > martillo });
  R.actor(EL.sam, 248, 160, t, { dir: -1, dedo: t > nombre && t < capi + 0.6, sonrisa: true });
  R.actor(EL.bucky, 272, 160, t, { dir: -1, sonrisa: t < viaja, triste: t > martillo + 0.6, habla: t > capi && t < viaja && Math.sin(t * 6) > 0.3 });
  const ida = v > 0.62 || (v > 0.45 && Math.floor(t * 14) % 2);
  if (!ida) {
    const u = tramo(t, 0.3, capi - 0.3), x = Math.round(lerp(-20, 150, u));
    const q = R.actor(EL.steve, x, 142, t, { dir: u < 1 ? 1 : (t < viaja ? -1 : 1), anda: u > 0 && u < 1, sostiene: true, sonrisa: t > capi });
    const [mx, my] = q.mano; maletin(mx, my + 1);
    // el martillo cuelga del cinturón
    const cx = u < 1 || t >= viaja ? x + 3 : x + 11; T.PIEZAS_DO.martillo(R, cx, 129);
  }
  T.lagoDelante(R, t, { encuadre: 'laboratorio' });
};
// 2 · la cocina de 1945: Steve aparece, duda y se queda
const p2 = (t) => {
  T.lago(R, t, { encuadre: 'cocina' });
  const gira = t < P2 + 1.6;
  R.actor(EL.peggy, 150, 134, t, { dir: t < P2 + 0.7 ? -1 : 1, sostiene: gira ? [146, 106] : false, sorpresa: t > P2 + 0.7 && t < queda, sonrisa: t > queda + 0.2 });
  const apa = tramo(t, P2 + 0.35, P2 + 0.8);
  const u = tramo(t, queda, P3 - 0.2), x = Math.round(lerp(222, 172, u)), y = Math.round(lerp(154, 138, u));
  if (apa > 0.4) R.actor(EL.steve, x, y, t, { dir: t > decide ? -1 : 1, anda: u > 0 && u < 1, sostiene: t > vuelta - 0.4 && t < decide ? [x + 12, y - 20] : false, sonrisa: t > queda, triste: t > vuelta && t < decide });
  // el destello de la llegada
  if (apa > 0 && apa < 1) { const r = Math.round(18 * (1 - apa)) + 2; R.disco(229, 141, r, hex('#fff4c8')); R.disco(229, 141, Math.max(1, r - 4), BL); }
  if (t > vuelta - 0.4 && t < decide) { const p = Math.sin(t * 10) > 0; R.pset(x + 12, y - 21, p ? hex('#7ae8ff') : hex('#3a8ae8')); }
};
// 3 · la radio grande: bailan despacio
const p3 = (t) => {
  T.lago(R, t, { encuadre: 'cocina', camara: 'radio' });
  // dan una vuelta despacio, cogidos de la mano: cada uno a un lado y luego cambian
  const th = (t - P3) * 0.95 + 0.25, c = Math.cos(th), s = Math.sin(th), mx = 172;
  const xs = Math.round(mx - 9 * c), ys = Math.round(164 - 3 * s), xp = Math.round(mx + 9 * c), yp = Math.round(164 + 3 * s);
  const ds = c > 0 ? 1 : -1, cogidos = [Math.round((xs + xp) / 2) + 7, Math.round((ys + yp) / 2) - 13];
  const pinta = [[ys, () => R.actor(EL.steve, xs, ys, t, { dir: ds, sostiene: Math.abs(c) > 0.3 ? cogidos : false, sonrisa: true, quieto: true })],
    [yp, () => R.actor(EL.peggy, xp, yp, t, { dir: -ds, sostiene: Math.abs(c) > 0.3 ? cogidos : false, sonrisa: true, quieto: true })]].sort((a, b) => a[0] - b[0]);
  for (const [, f] of pinta) f();
  // corazones que suben
  for (const [t0, dx] of [[carter, -6], [carter + 0.6, 8], [amor, 0], [amor + 0.4, -10]]) { const v = tramo(t, t0, t0 + 1.8); if (v > 0 && v < 1) corazon(mx + 7 + dx + Math.round(Math.sin(v * 6) * 3), Math.round(128 - v * 44), v < 0.8 ? hex('#e84a6a') : hex('#f0a0b0'), 2); }
};
// 4 · el lago al atardecer: los amigos llegan y le encuentran
const p4 = (t) => {
  T.lago(R, t, { encuadre: 'lago' });
  R.actor(EL.steveViejo, 146, 152, t, { dir: 1, sonrisa: t > viejo });
  const u = tramo(t, P4 + 0.1, presente), xs = Math.round(lerp(330, 206, u)), xb = Math.round(lerp(352, 232, u));
  R.actor(EL.sam, xs, 168, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > encuentra + 0.3, sostiene: t > presente && t < encuentra ? [xs - 1, 152] : false });
  R.actor(EL.bucky, xb, 168, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > encuentra - 0.1, sonrisa: t > viejo });
  T.lagoDelante(R, t, { encuadre: 'lago' });
  if (t > encuentra && t < encuentra + 1.2 && Math.floor(t * 5) % 2) R.icono('!', xs + 5, 130, hex('#c8303a'), KK);
};
// 5 · el banco de cerca: el escudo pasa a Sam
const p5 = (t) => {
  T.lago(R, t, { encuadre: 'lago', camara: 'banco' });
  const u = tramo(t, P5 + 0.1, banco + 1.0), xs = Math.round(lerp(332, 246, u));
  const coge = tramo(t, da - 0.2, da + 0.15), pasa = tramo(t, da + 0.15, sam + 0.15), sube = tramo(t, sam + 0.4, sam + 0.9);
  const sv = R.actor(EL.steveViejo, 180, 148, t, { dir: 1, habla: t > escudo + 0.3 && t < da - 0.2 && Math.sin(t * 6) > 0, sonrisa: t > da, sostiene: coge > 0 && pasa < 1 ? [Math.round(lerp(204, 222, coge)), Math.round(lerp(132, 128, coge))] : false });
  const sm = R.actor(EL.sam, xs, 172, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > da && t < sam + 0.3, sonrisa: t > sam + 0.5, sostiene: pasa > 0.5 ? (sube > 0 ? [xs - 2, Math.round(lerp(150, 146, sube))] : [234, 132]) : false });
  // el escudo: apoyado junto a él, luego en su mano, en el aire y en la de Sam
  let ex = 212, ey = 132;
  if (coge > 0 && pasa < 0.5) [ex, ey] = sv.mano;
  else if (pasa >= 0.5) [ex, ey] = sm.mano;
  if (pasa > 0 && pasa < 1) { ex = Math.round(lerp(224, 236, pasa)); ey = Math.round(lerp(128, 132, pasa)); }
  if (coge === 0) T.lagoDelante(R, t, { encuadre: 'lago', camara: 'banco' });
  T.PIEZAS_DO.escudo(R, ex, ey, { r: 7 });
  if (coge > 0) T.lagoDelante(R, t, { encuadre: 'lago', camara: 'banco' });
  if (coge > 0) T.PIEZAS_DO.escudo(R, ex, ey, { r: 7 });
  const br = tramo(t, escudo, escudo + 0.9); if (br > 0 && br < 1) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + br * 2; R.pset(Math.round(ex + Math.cos(a) * (9 + br * 4)), Math.round(ey + Math.sin(a) * (9 + br * 4)), k % 2 ? hex('#fff4c8') : BL); }
};
const efectos = [[viaja + 0.1, 'zumbido'], [martillo + 0.5, 'flash'], [P2 + 0.4, 'brillo'], [carter, 'brillo'], [escudo, 'brillo'], [da + 0.2, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2019 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-escudo'] = ('El escudo y el martillo', '''// DO-ESCUDO (frases 13–14), sin cartela. Tres planos:
// 1. la orilla del lago al anochecer, de cerca (fondo local): Sam llega a la roca con el escudo, lo levanta y brilla
//    («the shield has changed hands»); en el cielo crece un árbol de luz que se ramifica («time can branch»), con su
//    reflejo en el agua (2019);
// 2. un plató de rodaje (fondo local, 2025): el claquetista da la claqueta («Doomsday»), Steve entra hasta su marca
//    («Chris Evans returns») y el equipo aplaude («Steve Rogers»);
// 3. el cine de frente: en la pantalla, el martillo vuela hasta la mano de Steve («flies into his hand») y las
//    palomitas saltan de emoción (2025).''', AY + r'''
const Mn = (f) => en('manos', f), Mt = (f) => en('martillo', f);
const P2 = Mt(-0.067), P3 = Mt(0.571);
const dos = Mn(0.076), vuelven = Mn(0.335), escudo = Mn(0.535), manos = Mn(0.636), tiempo = Mn(0.83), rama = Mn(0.907);
const detalle = Mt(0.05), doomsday = Mt(0.192), evans = Mt(0.314), vuelve = Mt(0.367), rogers = Mt(0.458);
const trailer = Mt(0.676), martillo = Mt(0.808), vuela = Mt(0.834), mano = Mt(0.939);

// 1 · la orilla al anochecer (fondo local)
const HOR = 104;
const orilla = () => {
  rampa(0, 0, 319, HOR, ['#2a2050', '#3a2660', '#5a2e70', '#8a3a76', '#b84a6a', '#e0705a', '#f4a060'].map(hex));
  for (let k = 0; k < 30; k++) { const x = Math.round(hh(k, 5) * 270), y = Math.round(hh(k, 6) * 40) + 2; if (!(x > 18 && x < 172 && y < 15)) R.pset(x, y, hex('#e8e0ff')); }
  // el resplandor del sol que se acaba de poner
  for (let r = 26; r > 0; r -= 2) R.disco(92, HOR, r, mez(hex('#f4a060'), hex('#fff0b0'), 1 - r / 26));
  // montes lejanos, montes cercanos y la orilla de pinos
  for (let x = 0; x < 320; x++) { const y1 = Math.round(80 + Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11 + 1) * 3), y2 = Math.round(90 + Math.sin(x * 0.05 + 2) * 5 + Math.sin(x * 0.17) * 2);
    for (let y = y1; y < HOR; y++) R.pset(x, y, y < y2 ? (y === y1 ? hex('#a85a7a') : hex('#6a3a6a')) : (y === y2 ? hex('#7a3a5a') : hex('#4a2a50'))); }
  for (let k = 0; k < 64; k++) { const x = k * 5 + Math.round(hh(k, 8) * 4), h = 6 + Math.round(hh(k, 9) * 8); R.poligono([[x - 3, HOR + 1], [x + 3, HOR + 1], [x, HOR - h]], hex('#22182e')); }
  // la casita de la otra orilla
  R.rect(248, 94, 264, 104, hex('#2a1c2a')); R.poligono([[246, 95], [266, 95], [256, 88]], hex('#1e1420')); R.rect(252, 98, 255, 101, hex('#ffd860'));
  // el agua con el reflejo del cielo
  rampa(0, HOR + 1, 319, 150, ['#7a3a6a', '#c05a6a', '#a04a6a', '#5a2e66', '#2a2050'].map(hex));
  for (let y = HOR + 1; y < HOR + 10; y++) for (let x = 0; x < 320; x++) if (bay(x, y) < 0.5) R.pset(x, y, hex('#3a2448'));
  // la orilla de delante: hierba oscura, la roca plana y el poste del muelle
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 12); R.pset(x, y, y === 148 ? hex('#3a4a2a') : n > 0.85 ? hex('#4a5a34') : n < 0.15 ? hex('#1a2414') : bay(x, y) > 0.5 ? hex('#2a3a22') : hex('#24321e')); }
  for (let k = 0; k < 80; k++) { const x = Math.round(hh(k, 13) * 320), y = 152 + Math.round(hh(k, 14) * 26); R.linea(x, y, x + (k % 3) - 1, y - 3, hex('#4a6a34')); }
  R.poligono([[118, 168], [124, 154], [150, 150], [196, 151], [212, 158], [206, 170]], KK); R.poligono([[120, 167], [125, 155], [150, 151], [195, 152], [210, 158], [205, 169]], hex('#5a5068'));
  R.linea(126, 155, 196, 152, hex('#9a8aa8')); R.linea(126, 156, 194, 153, hex('#7a6e8a')); for (let k = 0; k < 14; k++) R.pset(130 + k * 5, 160 + (k % 3), hex('#4a4058'));
  caja(290, 116, 298, 162, hex('#5a3a2a'), hex('#8a5a3a'), hex('#3a2418')); R.rect(288, 128, 300, 130, hex('#c8a878')); R.rect(288, 128, 300, 128, hex('#e8d0a0'));
  // el pino grande de la izquierda, con la luz del ocaso en el borde
  R.rect(18, 60, 22, 150, hex('#3a2418'));
  for (let k = 0; k < 9; k++) { const y = 40 + k * 12, w = 6 + k * 3; R.poligono([[20 - w, y + 14], [20 + w, y + 14], [20, y]], hex('#16241a')); R.linea(20, y, 20 + w, y + 14, hex('#c86a5a')); for (let i = 0; i < w; i += 3) R.pset(20 - i + 1, y + 12, hex('#24382a')); }
};
const ramaLuz = (x, y, a, l, d, u, lista) => { if (d > 5 || u <= 0) return; const f = Math.min(1, u), x2 = x + Math.cos(a) * l * f, y2 = y + Math.sin(a) * l * f; lista.push([x, y, x2, y2, d]);
  if (u > 1) for (const s of [-1, 1]) ramaLuz(x2, y2, a + s * (0.42 + hh(d, s + x) * 0.3), l * 0.72, d + 1, u - 1, lista); };
const p1 = (t) => {
  fondo('orilla', orilla);
  // nubes de tres tonos a tres velocidades y pájaros
  for (const [x0, y, w, v] of [[30, 26, 46, 1.2], [180, 42, 36, 2], [110, 60, 26, 3]]) nubeT(((x0 + t * v) % 380) - 40, y, w, hex('#5a2e66'), hex('#b0507a'), hex('#f0907a'));
  for (let k = 0; k < 4; k++) ave(Math.round(((80 + k * 9 + t * 14) % 360) - 20), 50 + (k % 2) * 4 + Math.round(Math.sin(t + k) * 2), t, k, hex('#2a1a30'));
  // el agua: brillos que corren y el camino del sol
  for (let k = 0; k < 40; k++) { const y = HOR + 4 + Math.round(hh(k, 20) * 40), x = Math.round((hh(k, 21) * 320 + t * (4 + (k % 4))) % 320); R.rect(x, y, x + 3 + (k % 3), y, k % 3 ? hex('#e88a6a') : hex('#f8c890')); }
  for (let y = HOR + 2; y < 146; y += 2) { const w = 2 + Math.round((y - HOR) / 8), x = 92 + Math.round(Math.sin(t * 3 + y) * 2); R.rect(x - w, y, x + w, y, (y + Math.floor(t * 6)) % 4 ? hex('#ffd8a0') : hex('#f8a870')); }
  // dos patos que nadan
  for (const [k, x0] of [[0, 230], [1, 252]]) { const x = Math.round(x0 - t * 3), y = 128 + k * 3; R.rect(x - 4, y, x + 3, y + 2, hex('#3a2a20')); R.rect(x - 4, y, x + 2, y, hex('#6a5a4a')); R.rect(x - 6, y - 3, x - 4, y, hex('#2a4a2a')); R.pset(x - 7, y - 2, hex('#e8a030')); R.linea(x - 6, y + 3, x + 6, y + 3, hex('#e8907a')); }
  // el árbol de luz que nace en el horizonte, con su reflejo recortado al agua
  const u = tramo(t, tiempo - 0.2, rama + 0.6) * 6.2;
  if (u > 0) { const L = []; ramaLuz(222, HOR, -Math.PI / 2, 26, 0, u, L);
    for (const [x1, y1, x2, y2, d] of L) { R.linea(x1 + 1, y1, x2 + 1, y2, hex('#f0a040')); R.linea(x1, y1, x2, y2, d < 2 ? hex('#fff4c8') : hex('#ffd860')); }
    R.recorte([0, HOR + 2, 319, 146]);
    for (const [x1, y1, x2, y2] of L) R.linea(x1, 2 * HOR - y1 + 2, x2, 2 * HOR - y2 + 2, (x, y) => (x + y) % 2 ? hex('#e8a060') : null);
    R.recorte(null);
    for (let k = 0; k < 6; k++) { const v = (t * 0.8 + k / 6) % 1; R.pset(222 + Math.round(Math.sin(k * 2 + t) * 14 * v), Math.round(HOR - v * 60), hex('#fff4c8')); } }
  // Sam llega a la roca con el escudo y lo levanta
  const w = tramo(t, 0.3, vuelven - 0.3), x = Math.round(lerp(-20, 152, w)), al = tramo(t, escudo - 0.3, escudo + 0.2);
  const q = R.actor(EL.sam, x, 158, t, { dir: 1, anda: w > 0 && w < 1, sostiene: al > 0 ? [x + 16, Math.round(lerp(146, 124, al))] : true, sonrisa: t > manos, sorpresa: t > tiempo && t < rama + 0.5 });
  const [mx, my] = q.mano; T.PIEZAS_DO.escudo(R, mx + 1, my - 1, { r: 7 });
  if (al >= 1) { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 2, r = 11 + Math.round(Math.abs(Math.sin(t * 5 + k)) * 3); R.linea(mx + 1 + Math.cos(a) * 9, my - 1 + Math.sin(a) * 9, mx + 1 + Math.cos(a) * r, my - 1 + Math.sin(a) * r, k % 2 ? hex('#ffd860') : BL); } }
  // las espadañas que se mecen y las luciérnagas
  for (let k = 0; k < 9; k++) { const x0 = k < 5 ? 40 + k * 7 : 236 + (k - 5) * 9, s = Math.round(Math.sin(t * 1.6 + k) * 2); R.linea(x0, 179, x0 + s, 150 - (k % 3) * 4, hex('#3a4a24')); R.rect(x0 + s - 1, 148 - (k % 3) * 4, x0 + s + 1, 154 - (k % 3) * 4, hex('#6a3a20')); R.pset(x0 + s - 1, 148 - (k % 3) * 4, hex('#8a5a30')); }
  for (let k = 0; k < 8; k++) if (Math.sin(t * 3 + k * 1.7) > 0.3) { const x = Math.round(60 + hh(k, 30) * 220 + Math.sin(t + k) * 6), y = Math.round(136 + hh(k, 31) * 30 + Math.cos(t * 0.7 + k) * 4); R.pset(x, y, hex('#f0ff80')); R.pset(x + 1, y, hex('#a8c040')); }
};
// 2 · el plató de rodaje (fondo local)
const plato = () => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const c = ((x >> 2) + (y >> 2)) % 2 ? hex('#22202c') : hex('#1c1a26'); R.pset(x, y, (x >> 2) % 2 === (y >> 2) % 2 && (x + y) % 4 === 0 ? hex('#2c2a38') : c); }
  // el techo con la celosía de focos (fuera de la barra del año y de la zona de Atom)
  for (let x = 176; x <= 270; x++) { R.pset(x, 6, hex('#8a8e98')); R.pset(x, 11, hex('#8a8e98')); } for (let x = 176; x <= 270; x += 5) { R.linea(x, 6, x + 5, 11, hex('#6a6e78')); }
  for (const x of [192, 226, 258]) { R.rect(x, 12, x + 1, 14, KK); caja(x - 4, 14, x + 5, 22, hex('#2a2a34'), hex('#4a4a56'), hex('#1a1a22')); R.rect(x - 3, 22, x + 4, 23, hex('#fff4c8')); }
  // el fondo verde con su curva al suelo, pliegues y marcas de seguimiento
  for (let y = 20; y < 160; y++) for (let x = 40; x <= 252; x++) { const pl = Math.sin(x * 0.19 + Math.sin(y * 0.05) * 1.5) > 0.82, luz = 1 - Math.hypot((x - 120) / 120, (y - 80) / 90), b = bay(x, y);
    let c = y > 146 ? (b > 0.4 ? hex('#3aaa58') : hex('#34a052')) : pl ? hex('#1e8038') : luz > b * 0.9 + 0.25 ? hex('#34a856') : b > 0.5 ? hex('#2a9a4a') : hex('#238c42'); R.pset(x, y, c); }
  // las cajas de manzana y el pie de sombra (C-stand) en el plató
  caja(206, 146, 230, 160, hex('#a8743c'), hex('#c8904c'), hex('#7a4e28')); R.rect(210, 152, 226, 154, hex('#5a3a20')); caja(212, 136, 228, 146, hex('#a8743c'), hex('#c8904c'), hex('#7a4e28'));
  R.rect(60, 70, 61, 158, hex('#8a8e98')); R.linea(61, 158, 50, 160, KK); R.linea(61, 158, 70, 160, KK); R.linea(61, 158, 61, 161, KK); R.linea(61, 72, 92, 60, hex('#8a8e98')); caja(86, 52, 106, 64, hex('#2a2a30'), hex('#4a4a52'), hex('#18181e'));
  R.rect(40, 20, 252, 21, hex('#1a6a30')); R.rect(40, 20, 41, 158, hex('#1a6a30')); R.rect(251, 20, 252, 158, hex('#1a6a30'));
  for (let y = 40; y < 140; y += 30) for (let x = 64; x < 240; x += 40) { R.rect(x - 3, y, x + 3, y, hex('#f2eee2')); R.rect(x, y - 3, x, y + 3, hex('#f2eee2')); }
  // el suelo del plató: hormigón, cinta de marcas, cables y la vía del travelín
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) if (x < 40 || x > 252 || y >= 160) R.pset(x, y, hh(x, y, 15) > 0.9 ? hex('#4a4a52') : bay(x, y) > 0.5 ? hex('#3a3a42') : hex('#34343c'));
  R.rect(132, 166, 152, 167, hex('#e8c030')); R.rect(141, 166, 142, 174, hex('#e8c030'));
  for (const y of [170, 177]) { R.rect(176, y, 319, y, hex('#9a9ea8')); R.rect(176, y + 1, 319, y + 1, hex('#5a5e66')); } for (let x = 180; x < 320; x += 10) R.rect(x, 170, x + 2, 178, hex('#5a4a3a'));
  let px = 0, py = 172; for (let k = 1; k < 40; k++) { const nx = k * 5, ny = 172 + Math.round(Math.sin(k * 0.5) * 3); R.linea(px, py, nx, ny, KK); px = nx; py = ny; }
  // el foco grande de la izquierda en su trípode, con saco de arena
  R.linea(24, 96, 12, 160, KK); R.linea(24, 96, 36, 160, KK); R.linea(24, 96, 24, 158, hex('#5a5e66'));
  caja(12, 72, 38, 96, hex('#2a2a34'), hex('#4a4a56'), hex('#1a1a22')); R.poligono([[38, 74], [46, 68], [46, 100], [38, 94]], hex('#3a3a44')); R.rect(38, 76, 39, 92, hex('#fff4c8'));
  caja(14, 158, 34, 166, hex('#7a6a4a'), hex('#9a8a6a'), hex('#5a4a2a'));
  // la caja de luz de la derecha (pantalla blanca) en su pie
  R.rect(286, 100, 288, 160, hex('#5a5e66')); R.linea(287, 160, 276, 168, KK); R.linea(287, 160, 298, 168, KK);
  caja(268, 58, 306, 100, hex('#e8e8f0'), BL, hex('#b8b8c8')); for (let x = 272; x < 304; x += 8) R.rect(x, 60, x, 98, hex('#d8d8e4'));
  // el monitor del director y su carrito
  caja(2, 120, 34, 140, hex('#2a2a34'), hex('#4a4a56'), hex('#1a1a22')); R.rect(5, 123, 31, 137, hex('#2a9a4a')); R.rect(4, 140, 32, 142, hex('#5a5e66')); R.rect(16, 142, 18, 158, hex('#5a5e66')); caja(4, 156, 30, 160, hex('#5a5e66'), hex('#8a8e98'), hex('#3a3e46'));
};
const camara = () => {
  // la cámara en su carro del travelín (va delante del operador)
  caja(198, 156, 244, 168, hex('#3a3a44'), hex('#5a5a66'), hex('#2a2a34')); for (const x of [204, 238]) { R.disco(x, 169, 3, KK); R.disco(x, 169, 2, hex('#8a8e98')); }
  R.rect(219, 140, 223, 156, hex('#5a5e66'));
  caja(204, 122, 240, 140, hex('#2a2a30'), hex('#4a4a52'), hex('#18181e')); caja(190, 124, 204, 138, hex('#1a1a20'), hex('#3a3a44'), hex('#101014'));
  R.disco(195, 131, 4, hex('#3a5a8a')); R.pset(194, 130, hex('#9ac8ff')); caja(224, 116, 236, 122, hex('#2a2a30'), hex('#4a4a52'), hex('#18181e')); R.rect(238, 126, 242, 132, hex('#c83a2a'));
};
const p2 = (t) => {
  fondo('plato', plato);
  // el monitor muestra el plano (una figurita que se mueve)
  R.rect(5, 123, 31, 137, hex('#2a9a4a')); if (t > vuelve - 0.2) { const xm = Math.round(lerp(6, 17, tramo(t, evans - 0.4, vuelve + 0.2))); R.rect(xm, 128, xm + 2, 135, hex('#2a4fa8')); R.rect(xm, 127, xm + 2, 127, hex('#e0b860')); }
  // la pértiga del micro: el sonidista la sostiene y el micro peludo cuelga sobre el plató
  const bx = 56, bs = R.actor(EL.tecnico, bx, 176, t, { dir: 1, sostiene: [bx + 16, 146] });
  const mxm = 150 + Math.round(Math.sin(t * 0.9) * 3);
  R.linea(bs.mano[0], bs.mano[1], mxm, 48, hex('#8a8e98')); R.linea(bs.mano[0], bs.mano[1] - 1, mxm, 47, hex('#c8ccd4'));
  R.linea(mxm, 48, mxm, 54, KK); for (let y = 54; y < 64; y++) for (let x = -3; x <= 3; x++) if (Math.abs(x) < 3 || (y > 55 && y < 62)) R.pset(mxm + x, y, hh(x + Math.floor(t * 4), y) > 0.5 ? hex('#8a8494') : hex('#6a6474'));
  // el claquetista: sale, da la claqueta y se aparta
  const fuera = tramo(t, doomsday + 0.35, evans - 0.1), cx = Math.round(lerp(126, 70, fuera)), ve = 1, cx0 = 126;
  const xcl = fuera > 0 ? cx : cx0;
  const cq = R.actor(EL.periodista, xcl, 168, t, { dir: fuera > 0 ? -1 : (ve < 1 ? -1 : 1), anda: (ve > 0 && ve < 1) || (fuera > 0 && fuera < 1), sostiene: fuera === 0 && ve >= 1 ? [xcl + 18, 146] : false, brazos: t > rogers, sonrisa: t > rogers });
  if (fuera === 0 && ve >= 1) { const [hx, hy] = cq.mano, ab = t < doomsday ? 0.5 : 0;
    caja(hx - 2, hy - 2, hx + 18, hy + 12, hex('#2a2a30'), hex('#4a4a52'), hex('#1a1a20')); for (const y of [hy + 4, hy + 8]) R.rect(hx, y, hx + 16, y, hex('#e8e4d8'));
    R.numero('19', hx + 8, hy + 7, { centro: true, color: hex('#f2eee2'), sombra: false });
    const ex = Math.cos(-ab) * 20, ey = Math.sin(-ab) * 20; for (let k = 0; k < 3; k++) R.linea(hx - 2, hy - 3 - k, hx - 2 + ex, hy - 3 - k + ey, (x) => ((x >> 2) % 2 ? hex('#f2eee2') : KK)); }
  // Steve entra hasta su marca y sonríe a la cámara
  const u = tramo(t, evans - 0.5, vuelve + 0.2), xs = Math.round(lerp(-20, 134, u));
  R.actor(EL.steve, xs, 166, t, { dir: u < 1 ? 1 : (t < rogers ? 1 : 1), anda: u > 0 && u < 1, sonrisa: u >= 1, dedo: t > rogers + 0.3 && t < rogers + 1.2 });
  // el operador de cámara mira por el visor, detrás de la cámara; aplaude al final
  R.actor(EL.tecnico, 244, 166, t, { dir: -1, pal: { C: hex('#3a3a4a'), c: hex('#2a2a36'), W: hex('#3a3a4a') }, brazos: t > rogers + 0.2 && Math.floor(t * 6) % 2 === 0, sonrisa: t > rogers });
  pegar('camara', camara);
  if (t > rogers && t < rogers + 1.4) for (let k = 0; k < 3; k++) { const v = ((t - rogers) * 1.5 + k * 0.3) % 1; R.pset(150 + k * 8 + Math.round(Math.sin(v * 9) * 3), Math.round(130 - v * 20), hex('#ffd860')); }
};
// 3 · el cine de frente: el martillo vuela a la mano de Steve
const p3 = (t) => {
  T.hoy(R, t, { encuadre: 'cine', camara: 'pantalla', pantalla: 'martillo', u: tramo(t, martillo - 0.1, mano), publico: t > mano ? 'rie' : 'normal' });
  // en la pantalla, el brazo de Steve entra por la derecha y abre la mano; el martillo llega a ella
  const br = tramo(t, trailer - 0.3, martillo - 0.2), wx = Math.round(lerp(290, 250, br)), wy = Math.round(lerp(100, 84, br)) + (t > mano ? 1 : 0);
  R.recorte([42, 18, 260, 110]); if (br > 0) T.brazo(R, 296, 128, wx, wy, '#2a4fa8', -1, { codo: [wx + 22, wy + 26], sombra: false }); R.recorte(null);
  if (t > mano && t < mano + 0.5) { const r = Math.round(6 + (t - mano) * 30); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; R.pset(Math.round(240 + Math.cos(a) * r), Math.round(78 + Math.sin(a) * r), BL); } }
  const salta = tramo(t, mano - 0.1, mano + 0.4);
  T.palomitas(R, 150, 169, t, { s: 2, dir: 1, espalda: t < trailer, expresion: t > vuela ? 'emocion' : 'normal', salta: t > mano - 0.1 ? Math.min(1, salta * 2) : 0, gafas: t >= trailer && t < vuela ? '3d' : false });
  R.actor(EL.fanCapa, 196, 176, t, { dir: -1, brazos: t > mano, sorpresa: t > vuela && t < mano, sonrisa: t > mano });
  R.actor(EL.fanArana, 98, 176, t, { dir: 1, dedo: t > martillo && t < mano, sonrisa: t > mano });
  T.hoyDelante(R, t, { encuadre: 'cine', camara: 'pantalla' });
};
const efectos = [[0.4, 'whoosh'], [escudo, 'brillo'], [tiempo, 'whoosh'], [doomsday, 'palmada'], [rogers + 0.2, 'palmada'], [vuela, 'whoosh'], [mano, 'golpecito'], [mano + 0.3, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 2019 : 2025) });
''')
