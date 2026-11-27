# Borrador de escenas del ep22 (grupo S2): nv-motin, nv-multa, nv-nicolas.
# Formato del 11: E[id] = (título, comentario de cabecera, cuerpo). Lo genera atomo/herramientas/generar-escenas.py.
E = {}

# ── piezas comunes a las tres escenas (cada escena es su propia página: se repiten en cada cuerpo) ──
COMUN = r'''
import { PIEZAS_NV as PZ } from '/atomo/plato/kits/pixel-chibi.js';
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un fondo fijo: se pinta una vez en su búfer y se copia en cada fotograma
const FIJOS = new Map();
const fijo = (clave, dibuja) => { let b = FIJOS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); FIJOS.set(clave, b); } R.copiar(b); };
const K = hex('#16121a'), BLANCO = hex('#f6f4ee');
const suave = (u) => u * u * (3 - 2 * u);
// la llama de una vela con la mecha en (x, y)
const llama = (x, y, t, k = 0) => { const f = Math.sin(t * 11 + k * 3) * Math.sin(t * 5.3 + k); R.pset(x, y - 4 - (f > 0.3 ? 1 : 0), hex('#fff6d0')); R.rect(x, y - 3, x, y - 1, hex('#ffd060')); R.pset(x + (f > 0 ? 1 : -1), y - 2, hex('#f08a2a')); R.pset(x, y, hex('#3a2a1a')); };
// el halo cálido de una llama: aclara los píxeles de alrededor
const halo = (x, y, r, t, k = 0) => { const rr = r + Math.sin(t * 9 + k) * 0.8; for (let j = -Math.ceil(rr); j <= rr; j++) for (let i = -Math.ceil(rr); i <= rr; i++) { const d = Math.hypot(i, j) / rr; if (d < 1) { const px = Math.round(x + i), py = Math.round(y + j); R.pset(px, py, mez(R.pget(px, py), hex('#ffe6a0'), 0.22 * (1 - d))); } } };
// nieve que cae dentro de la caja [x0, y0, x1, y1] (y dentro de dentro(x, y), si se da)
const nieve = (t, n, [x0, y0, x1, y1], dentro, k = 0) => { for (let i = 0; i < n; i++) { const v = 7 + hh(i, 1, k) * 9, x = x0 + ((hh(i, 2, k) * (x1 - x0) + Math.sin(t * 1.3 + i) * 3 + t * 3) % (x1 - x0 + 1)), y = y0 + ((hh(i, 3, k) * (y1 - y0) + t * v) % (y1 - y0 + 1)); const px = Math.round(x), py = Math.round(y); if (dentro && !dentro(px, py)) continue; R.pset(px, py, hh(i, 4, k) < 0.3 ? hex('#c8d4e2') : hex('#f4f8fc')); } };
// un destello de cuatro puntas (brillo) de radio r
const destello = (x, y, r, c = hex('#fff4c0')) => { for (let i = -r; i <= r; i++) { R.pset(x + i, y, Math.abs(i) < r / 2 ? BLANCO : c); R.pset(x, y + i, Math.abs(i) < r / 2 ? BLANCO : c); } R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y - 1, c); };
// una X roja gruesa con su contorno, centrada en (x, y), de medio lado r
const equis = (x, y, r) => { for (const [c, w] of [[K, 2], [hex('#d8302a'), 1]]) for (let d = -r; d <= r; d++) for (let a = -w; a <= w; a++) { R.pset(x + d + a, y + d, c); R.pset(x + d + a, y - d, c); } };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-motin'] = ('El motín', '''// NV-MOTIN (frase 6, «motin»). Tres planos, 1647 → 1660:
// 1. Canterbury (general): las tiendas abren por orden del alcalde; el tendero puritano señala la suya; en «rioted» la
//    calle se amotina (puños en el callejón, coles y acebo que vuelan); un aprendiz tira una col contra el mostrador
//    (no a nadie) y el tendero se mete en casa; los vecinos de la derecha se asustan. Corta en la pausa antes de «People».
// 2. Westminster Hall (fondo local): la armadura con el casco de langosta de Cromwell y la mesa de la maza del
//    Parlamento; dos vecinos entran, se vuelven y señalan la armadura («?» en «Cromwell»); en «but» la X roja y el
//    escribano les señala la maza («Parliament»: brilla y sale el visto bueno); «years before he ruled»: 1647 → 1653.
// 3. Una puerta de Canterbury en 1660 (fondo local): la bandera real sube en la torre y las campanas tocan («the king
//    returned»); una vecina trae una corona de acebo y la cuelga en la puerta en «legal»; los aprendices saltan en «again».''',
COMUN + r'''
const m = (f) => en('motin', f);
const P2 = m(0.38), P3 = m(0.735);
const riot = m(0.16), lanza = m(0.24), cromwell = m(0.45), pero = m(0.55), parl = m(0.575), antes = m(0.6), gobierna = m(0.665);
const rey = m(0.83), legal = m(0.935), otraVez = m(0.97);
const col = (x, y) => { R.disco(x, y, 3.4, K); R.disco(x, y, 3, hex('#3e6a2e')); R.disco(x, y, 2.3, hex('#6a9a4a')); R.disco(x - 1, y - 1, 1.2, hex('#9ac86a')); R.pset(x + 1, y + 1, hex('#3e6a2e')); };

// ── 1 · Canterbury: el motín ──
const p1 = (t) => {
  T.siglo17(R, t, { encuadre: 'canterbury', motin: tramo(t, riot - 0.2, riot + 1.4), aviso: 1, nieve: 0.4 });
  // el tendero puritano delante de su panadería: la señala abierta y, con el motín, se mete por su puerta
  const va = tramo(t, riot + 0.5, riot + 1.5);
  if (va < 1) R.actor(EL.puritano, Math.round(lerp(72, 96, va)), 164, t, { dir: t < riot ? -1 : 1, anda: va > 0, dedo: t > 0.8 && t < riot, habla: t > 0.8 && t < riot - 0.3 && Math.sin(t * 8) > 0, sorpresa: t > riot && va === 0 });
  // el aprendiz de la izquierda llega y, en «rioted», levanta los puños
  const a = tramo(t, 0.3, 1.8);
  R.actor(EL.aprendiz, Math.round(lerp(-14, 30, a)), 166, t, { dir: 1, anda: a > 0 && a < 1, brazos: t > riot, enfado: t > riot - 0.2, salto: t > riot ? Math.round(Math.abs(Math.sin(t * 7)) * 2) : 0 });
  // el aprendiz pelirrojo con la col: llega por la derecha y la tira contra el mostrador de la panadería (sin dar a nadie)
  const b = tramo(t, 0.9, 2.4), xb = Math.round(lerp(196, 150, b));
  const r2 = R.actor(EL.aprendiz2, xb, 168, t, { dir: -1, anda: b > 0 && b < 1, sostiene: t < lanza ? [xb - 4, 146] : false, brazos: t > lanza + 0.2, enfado: t > riot - 0.2 });
  if (t < lanza) col(r2.mano[0], r2.mano[1] - 2);
  else { const u = tramo(t, lanza, lanza + 0.55); if (u < 1) col(Math.round(lerp(148, 82, u)), Math.round(lerp(144, 140, u) - Math.sin(u * Math.PI) * 26));
    else for (const [dx, dy] of [[-3, 0], [-1, -2], [2, -1], [4, 1], [0, 2], [-5, 3]]) { R.rect(82 + dx, 140 + dy, 83 + dx, 141 + dy, hex('#6a9a4a')); R.pset(82 + dx, 140 + dy, hex('#9ac86a')); } }
  // los vecinos de la derecha charlan y, con el motín, se asustan y miran
  R.actor(EL.vecina, 266, 166, t, { dir: 1, habla: t < riot && Math.sin(t * 6) > 0.2, sorpresa: t > riot + 0.2, dedo: t > riot + 1.2 && t < riot + 2.6 });
  R.actor(EL.vecino, 290, 168, t, { dir: -1, habla: t < riot && Math.sin(t * 6 + 2) > 0.2, sorpresa: t > riot + 0.4 });
  T.siglo17Delante(R, t, { encuadre: 'canterbury' });
};

// ── 2 · Westminster Hall: no fue Cromwell, fue el Parlamento ──
const dentroV = (x, y) => { if (y < 40 || y > 116 || x < 130 || x > 190) return false; const w = y >= 64 ? 30 : 30 * (1 - Math.pow((64 - y) / 24, 1.7)); return Math.abs(x - 160) <= w; };
const rayo = (y) => [Math.round(lerp(138, 152, (y - 118) / 62)), Math.round(lerp(184, 236, (y - 118) / 62))];
const sala = () => fijo('sala', () => {
  const { rect, pset, linea, disco } = R;
  const roble = [hex('#20140c'), hex('#2a1c10'), hex('#36261a'), hex('#4a3420'), hex('#62462a')];
  // el techo de vigas, oscuro y tranquilo (la barra del año y Atom van encima)
  for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 10 === 0 ? roble[0] : hh(x >> 1, y >> 2, 3) < 0.14 ? roble[2] : roble[1]);
  rect(0, 27, 319, 35, roble[3]); rect(0, 27, 319, 27, roble[4]); rect(0, 34, 319, 35, roble[0]);
  for (let x = 0; x < 320; x++) if (hh(x, 30, 4) < 0.3) pset(x, 29 + Math.floor(hh(x, 31, 4) * 5), roble[2]);
  for (const x of [8, 112, 208]) { rect(x, 27, x + 3, 35, roble[2]); pset(x + 1, 31, roble[4]); }   // clavijas
  // la pared de sillares, con su luz y su suciedad
  const piedra = [hex('#b4a890'), hex('#a89c84'), hex('#c0b49c'), hex('#9c907a')], junta = hex('#7c7262'), luzP = hex('#e0d6c0');
  for (let y = 36; y < 146; y++) { const r = Math.floor((y - 36) / 9), off = r % 2 ? 9 : 0;
    for (let x = 0; x < 320; x++) { const c = Math.floor((x + off) / 18); const jj = (y - 36) % 9 === 0 || (x + off) % 18 === 0;
      let co = jj ? junta : piedra[Math.floor(hh(c, r, 5) * 4)];
      if (!jj && hh(x, y, 6) < 0.07) co = piedra[3]; if (!jj && hh(x, y, 7) < 0.03) co = piedra[2];
      if (!jj && ((x + off) % 18 === 1 || (y - 36) % 9 === 1)) co = mez(co, luzP, 0.4);
      if (y < 52) co = mez(co, roble[0], (52 - y) / 16 * 0.6);
      if (y > 126) co = mez(co, hex('#4a4238'), (y - 126) / 20 * 0.35);
      pset(x, y, co); } }
  // el zócalo
  rect(0, 140, 319, 145, hex('#7a7060')); rect(0, 140, 319, 140, hex('#a49a86')); rect(0, 145, 319, 145, hex('#4a4238'));
  // el ventanal gótico: moldura, vidrio de invierno emplomado, parteluces y los tejados nevados de fuera
  for (let y = 34; y < 122; y++) for (let x = 120; x < 200; x++) { if (dentroV(x, y)) continue; let d = 9;
    for (let k = 1; k <= 5 && d === 9; k++) if (dentroV(x + k, y) || dentroV(x - k, y) || dentroV(x, y + k) || dentroV(x, y - k)) d = k;
    if (d <= 5) pset(x, y, d === 1 ? hex('#6a6050') : d === 5 ? junta : x < 160 ? hex('#d8cfba') : hex('#b0a690')); }
  for (let y = 40; y <= 116; y++) for (let x = 130; x <= 190; x++) if (dentroV(x, y)) {
    let co = mez(hex('#b8c8da'), hex('#eef2f6'), Math.max(0, (100 - y) / 60));
    if (y > 102 - Math.round(Math.abs(Math.sin(x * 0.21)) * 4 + (x > 166 ? 5 : 0))) co = y < 106 - (x > 166 ? 5 : 0) ? hex('#f0f4f8') : hex('#8e9aaa');
    if ((x + y) % 6 === 0 || (x - y + 600) % 6 === 0) co = mez(co, hex('#3a4050'), 0.55);
    pset(x, y, co); }
  for (const mx of [145, 160, 175]) for (let y = 40; y <= 116; y++) if (dentroV(mx, y)) { pset(mx, y, hex('#d8cfba')); pset(mx + 1, y, hex('#8a8070')); }
  for (let x = 130; x <= 190; x++) if (dentroV(x, 80)) { pset(x, 80, hex('#d8cfba')); pset(x, 81, hex('#8a8070')); }
  for (const [cx, cy] of [[152, 60], [168, 60]]) { R.disco(cx, cy, 5, hex('#d8cfba')); R.disco(cx, cy, 3, hex('#c4d2e2')); pset(cx, cy, hex('#8a8070')); }
  rect(124, 117, 196, 120, hex('#d0c6b0')); rect(124, 121, 196, 122, hex('#6a6050'));
  // los estandartes rojos con la cruz
  const bandera = (x0, y0, x1, y1) => { rect(x0 - 3, y0 - 2, x1 + 3, y0 - 1, roble[3]); pset(x0 - 3, y0 - 2, hex('#d8a83a')); pset(x1 + 3, y0 - 2, hex('#d8a83a'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const cxm = (x0 + x1) / 2; if (y > y1 - 7 && Math.abs(x - cxm) > (y1 - y) * 1.5) continue; const pl = Math.sin((x - x0) * 0.8);
      pset(x, y, x === x0 || x === x1 ? hex('#4a1218') : pl > 0.55 ? hex('#a82a34') : pl < -0.55 ? hex('#661820') : hex('#8a2028')); }
    for (let y = y0 + 2; y <= y1 - 9; y++) { pset(x0 + 2, y, hex('#d8a83a')); pset(x1 - 2, y, hex('#d8a83a')); }
    const cx = Math.round((x0 + x1) / 2), cy = y0 + 20; rect(cx - 1, cy - 8, cx + 1, cy + 8, hex('#f0c850')); rect(cx - 6, cy - 1, cx + 6, cy + 1, hex('#f0c850')); pset(cx + 1, cy - 8, hex('#a87a18')); pset(cx + 6, cy + 1, hex('#a87a18'));
    for (let x = x0 + 1; x < x1; x += 2) { const cxm = (x0 + x1) / 2; const yb = y1 - Math.max(0, 7 - Math.abs(x - cxm) / 1.5); pset(x, Math.round(yb) + 1, hex('#d8a83a')); } };
  bandera(16, 42, 36, 96); bandera(266, 54, 286, 108);
  // la puerta gótica de roble con clavos de hierro, a la derecha
  for (let y = 78; y <= 145; y++) for (let x = 292; x <= 318; x++) { const w = y >= 92 ? 13 : 13 * Math.sqrt(Math.max(0, 1 - ((92 - y) / 14) ** 2)); const dx = Math.abs(x - 305); if (dx > w + 3) continue;
    pset(x, y, dx > w ? (x < 305 ? hex('#d8cfba') : hex('#8a8070')) : (x - 292) % 5 === 0 ? hex('#2a1a10') : hh(x, y >> 2, 70) < 0.2 ? hex('#5a3a22') : hex('#4a2e1a')); }
  for (const y of [100, 124]) { rect(293, y, 317, y + 1, hex('#2a2a30')); for (let x = 295; x < 317; x += 4) pset(x, y, hex('#7a7a86')); }
  disco(298, 114, 2, hex('#2a2a30')); pset(298, 114, hex('#8a8a96'));
  // el banco de roble con un sombrero alto y unos guantes
  rect(240, 146, 290, 149, hex('#5e4228')); rect(240, 146, 290, 146, hex('#7a5638')); for (const x of [242, 287]) rect(x, 150, x + 2, 158, hex('#3a2818'));
  rect(258, 138, 268, 145, K); rect(259, 139, 267, 144, hex('#2a2a30')); rect(255, 145, 271, 146, K); rect(259, 143, 267, 143, hex('#8a6a3a'));
  rect(276, 143, 283, 145, hex('#a07a4a')); rect(276, 143, 283, 143, hex('#c89a62'));
  // las coronas de hierro colgadas, con sus velas
  for (const cx of [62, 250]) { for (let y = 36; y < 56; y++) pset(cx, y, y % 3 ? hex('#3a3a42') : hex('#6a6a76'));
    for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2; pset(Math.round(cx + Math.cos(an) * 14), Math.round(58 + Math.sin(an) * 3), Math.sin(an) > 0 ? hex('#2a2a30') : hex('#5a5a66')); }
    for (const dx of [-14, -5, 5, 14]) { linea(cx, 56, cx + dx, 58, hex('#3a3a42')); rect(cx + dx - 1, 52, cx + dx + 1, 57, hex('#f2ead6')); pset(cx + dx - 1, 52, hex('#fffaf0')); } }
  // los candeleros de pared
  for (const x of [112, 206]) { linea(x - 4, 84, x, 80, hex('#2a2a30')); linea(x - 4, 85, x, 81, hex('#4a4a52')); rect(x - 3, 79, x + 3, 80, hex('#3a3a42')); rect(x - 1, 72, x + 1, 78, hex('#f2ead6')); pset(x - 1, 72, hex('#fffaf0')); pset(x + 1, 75, hex('#d8ccb0')); }
  // el suelo de losas en perspectiva, con la alfombra roja del centro
  const filas = [146, 150, 155, 161, 168, 176, 186];
  for (let y = 146; y < 180; y++) { const fi = filas.findIndex((v, i) => y >= v && y < filas[i + 1]);
    for (let x = 0; x < 320; x++) { const ancho = 10 + (y - 146) * 0.9, k = Math.floor((x - 160) / ancho), k1 = Math.floor((x - 161) / ancho);
      let co = filas.includes(y) || k !== k1 ? hex('#5a5246') : [hex('#8a8272'), hex('#968e7c'), hex('#7e7666')][Math.floor(hh(k, fi, 8) * 3)];
      if (co !== hex('#5a5246') && hh(x, y, 9) < 0.05) co = hex('#6e6658');
      const hw = lerp(13, 44, (y - 146) / 34), dx = Math.abs(x - 160);
      if (dx <= hw) co = dx > hw - 1 ? hex('#3a1014') : dx > hw - 3 ? hex('#c8983a') : (y + Math.round(dx * 0.2)) % 7 === 0 ? hex('#6a1a22') : hex('#8a2430');
      pset(x, y, co); } }
  // el rayo de luz del ventanal sobre la pared y el suelo
  for (let y = 118; y < 180; y++) { const [a, b] = rayo(y); for (let x = a; x <= b; x++) pset(x, y, mez(R.pget(x, y), hex('#fff6e0'), 0.13 * (1 - (y - 118) / 90))); }
  // la mesa del Parlamento: paño rojo con flecos de oro, el cojín y la maza
  for (const lx of [46, 98]) { rect(lx, 146, lx + 3, 163, hex('#3a2818')); rect(lx, 146, lx, 163, hex('#5e4228')); }
  rect(46, 158, 101, 159, hex('#2a1c10'));
  for (let y = 134; y <= 150; y++) for (let x = 40; x <= 106; x++) { const pl = Math.sin(x * 0.55 + (y > 138 ? 1 : 0)); pset(x, y, y === 134 ? hex('#c84a52') : x === 40 || x === 106 ? hex('#4a1218') : pl > 0.6 ? hex('#a82a34') : pl < -0.6 ? hex('#661820') : hex('#8a2430')); }
  for (let x = 40; x <= 106; x++) { pset(x, 151, x % 2 ? hex('#e0b040') : hex('#a87a18')); if (x % 3 === 0) pset(x, 152, hex('#d8a83a')); }
  rect(52, 127, 96, 133, hex('#5a1018')); rect(53, 127, 95, 132, hex('#a02a3a')); rect(53, 127, 95, 127, hex('#d0505c')); rect(53, 132, 95, 132, hex('#701a26'));
  for (const x of [52, 96]) { pset(x, 133, hex('#e0b040')); pset(x, 134, hex('#a87a18')); }
  for (let i = 0; i <= 36; i++) { const x = 56 + i, y = Math.round(129 - i * 0.14); pset(x, y + 1, hex('#6a4a10')); pset(x, y, hex('#d8a83a')); pset(x, y - 1, hex('#ffe08a')); if (i % 9 === 4) { disco(x, y, 1.6, hex('#f0c850')); pset(x, y - 1, BLANCO); } }
  disco(54, 130, 2, hex('#a87a18')); disco(54, 130, 1, hex('#f0c850'));
  disco(97, 122, 6, K); disco(97, 122, 5, hex('#d8a83a')); rect(92, 118, 102, 119, hex('#ffe08a')); rect(92, 124, 102, 125, hex('#a87a18'));
  pset(95, 121, hex('#c8202a')); pset(99, 121, hex('#3a6ad8')); pset(97, 122, hex('#2a8a4a')); pset(94, 119, BLANCO);
  rect(96, 112, 98, 116, hex('#f0c850')); rect(94, 113, 100, 114, hex('#f0c850')); pset(97, 112, BLANCO);
  // la ordenanza enrollada con su sello de cera colgando
  rect(60, 135, 84, 139, hex('#e8dcb8')); rect(60, 139, 84, 139, hex('#b8a880')); for (let x = 63; x < 82; x += 3) pset(x, 137, hex('#8a7a60'));
  disco(60, 137, 2, hex('#d8ccaa')); disco(84, 137, 2, hex('#d8ccaa')); pset(60, 137, hex('#8a7a60')); pset(84, 137, hex('#8a7a60'));
  linea(78, 139, 80, 146, hex('#c8202a')); disco(80, 148, 3, hex('#701018')); disco(80, 148, 2, hex('#b8202a')); pset(79, 147, hex('#e85050'));
  // la armadura del ejército nuevo en su soporte: casco de langosta, peto, faldar y la banda naranja
  const ac = [hex('#3e4654'), hex('#6e7888'), hex('#9aa4b4'), hex('#d0d8e4')];
  rect(240, 100, 243, 160, hex('#5a3a22')); rect(240, 100, 240, 160, hex('#7a5232')); rect(228, 159, 255, 163, hex('#4a3020')); rect(228, 159, 255, 159, hex('#6a4a2e'));
  rect(226, 106, 232, 130, K); rect(227, 107, 231, 129, hex('#b88a54')); rect(227, 107, 227, 129, hex('#d0a46a')); rect(252, 106, 258, 130, K); rect(253, 107, 257, 129, hex('#9a7040'));
  const peto = (y) => (y < 108 ? 8 + (y - 103) : y > 123 ? 12 - (y - 123) * 0.7 : 12);
  for (let y = 102; y <= 130; y++) { const w = peto(y) + 1; rect(Math.round(242 - w), y, Math.round(242 + w), y, K); }
  for (let y = 103; y <= 129; y++) { const w = peto(y); for (let x = Math.round(242 - w); x <= Math.round(242 + w); x++) { const u = (x - (242 - w)) / (2 * w); pset(x, y, Math.abs(x - 242) < 1 ? ac[3] : u < 0.22 ? ac[2] : u > 0.78 ? ac[0] : ac[1]); } }
  for (const [px, py] of [[236, 108], [248, 108], [236, 124], [248, 124]]) pset(px, py, ac[3]);
  for (let k = 0; k < 3; k++) { linea(231 + k, 106, 251 + k, 126, hex('#e0862a')); } linea(234, 106, 254, 126, hex('#a85a18')); linea(230, 106, 250, 126, hex('#f0a84a'));
  for (const sx of [231, 253]) { disco(sx, 107, 5.5, K); disco(sx, 107, 4.5, ac[1]); for (let j = 104; j <= 110; j += 3) linea(sx - 4, j, sx + 4, j, ac[0]); pset(sx - 2, 104, ac[3]); }
  for (const [x0, x1] of [[231, 241], [243, 253]]) { rect(x0 - 1, 129, x1 + 1, 140, K); rect(x0, 130, x1, 139, ac[1]); for (let y = 132; y < 140; y += 3) rect(x0, y, x1, y, ac[0]); rect(x0, 130, x0 + 1, 139, ac[2]); }
  disco(242, 95, 10, K); disco(242, 95, 9, ac[1]); for (let y = 86; y <= 95; y++) for (let x = 233; x <= 251; x++) if (Math.hypot(x - 242, y - 95) <= 9 && x < 239 && y < 92) pset(x, y, ac[2]);
  rect(232, 95, 252, 106, K); rect(233, 96, 251, 105, ac[0]); for (let y = 98; y <= 105; y += 2) { rect(233, y, 236, y, ac[1]); rect(248, y, 251, y, ac[1]); }
  rect(237, 97, 247, 105, hex('#22262e')); for (const bx of [239, 242, 245]) { rect(bx, 96, bx, 105, ac[2]); pset(bx, 96, ac[3]); }
  rect(231, 94, 253, 96, K); rect(232, 95, 252, 95, ac[2]); linea(242, 86, 242, 93, ac[3]); pset(236, 90, ac[3]);
  rect(220, 160, 262, 161, mez(hex('#8a8272'), K, 0.4));
});
const p2 = (t) => {
  sala();
  nieve(t, 46, [130, 40, 190, 104], dentroV, 3);
  for (const [k, x] of [[0, 112], [1, 206]]) { halo(x, 70, 9, t, k); llama(x, 72, t, k); }
  for (const cx of [62, 250]) for (const [j, dx] of [-14, -5, 5, 14].entries()) llama(cx + dx, 52, t, j + cx);
  // el perro que duerme junto a la mesa (respira)
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, x = 14, y = 166; R.rect(x, y - 6 - r, x + 18, y, K); R.rect(x + 1, y - 5 - r, x + 17, y - 1, hex('#8a5a34')); R.rect(x + 2, y - 5 - r, x + 12, y - 4 - r, hex('#a87444')); R.rect(x + 14, y - 8, x + 21, y - 1, K); R.rect(x + 15, y - 7, x + 20, y - 2, hex('#8a5a34')); R.rect(x + 15, y - 9, x + 16, y - 7, hex('#5a3a20')); R.pset(x + 18, y - 4, K); R.pset(x + 20, y - 3, K); R.rect(x - 4, y - 2, x, y - 1, hex('#8a5a34')); if (Math.floor(t * 0.8) % 3 === 0) R.pset(x + 24, y - 12 - Math.round((t * 0.8 % 1) * 4), hex('#f6e8b0')); }
  // motas de polvo en el rayo de luz
  for (let i = 0; i < 16; i++) { const y = 120 + ((hh(i, 1, 21) * 58 + t * (2 + hh(i, 2, 21) * 3)) % 58), [a, b] = rayo(y), x = a + hh(i, 3, 21) * (b - a) + Math.sin(t + i) * 3; if (Math.sin(t * 3 + i * 2) > -0.2) R.pset(Math.round(x), Math.round(y), hex('#fff6d8')); }
  // una paloma que anda por la viga
  { const ph = (t * 0.6) % 4, x = 60 + Math.round(ph < 2 ? ph * 14 : (4 - ph) * 14), d = ph < 2 ? 1 : -1, pico = Math.sin(t * 9) > 0.6 ? 1 : 0; R.rect(x, 23, x + 5, 26, hex('#6a6a76')); R.rect(x + 1, 23, x + 4, 24, hex('#9a9aa8')); R.rect(d > 0 ? x + 5 : x - 2, 21 + pico, d > 0 ? x + 7 : x, 23 + pico, hex('#7a7a88')); R.pset(d > 0 ? x + 7 : x - 2, 22 + pico, K); R.pset(x + 2, 27, hex('#c87a5a')); R.pset(x + 4, 27, hex('#c87a5a')); }
  // los dos vecinos entran por la derecha, pasan la armadura y se vuelven a señalarla
  const a = tramo(t, P2, P2 + 1.4), b = tramo(t, P2 + 0.25, P2 + 1.7), mira = (t > cromwell - 0.5 && t < parl) ? 1 : -1;
  R.actor(EL.escribanoParl, 104, 166, t, { dir: t > pero - 0.2 && t < parl ? 1 : -1, habla: t > pero - 0.2 && t < antes + 0.4 && Math.sin(t * 9) > 0, dedo: t > parl && t < gobierna + 0.6 });
  R.actor(EL.vecina, Math.round(lerp(330, 172, suave(a))), 166, t, { dir: a < 1 ? -1 : mira, anda: a > 0 && a < 1, dedo: t > cromwell - 0.3 && t < pero, habla: t > cromwell - 0.3 && t < pero - 0.3 && Math.sin(t * 8) > 0, sorpresa: t > parl && t < antes + 0.5, sonrisa: t > gobierna });
  R.actor(EL.aprendiz, Math.round(lerp(346, 196, suave(b))), 168, t, { dir: b < 1 ? -1 : mira, anda: b > 0 && b < 1, dedo: t > cromwell && t < pero, sorpresa: t > parl + 0.15 && t < antes + 0.6, sonrisa: t > gobierna + 0.3 });
  // «?» sobre el casco; en «but» la X; en «Parliament» la maza brilla y el visto bueno; luego 1647 → 1653
  if (t > cromwell && t < pero) R.icono('?', 237, 66 + Math.round(Math.sin(t * 5)), hex('#f6e8b0'), K, 2);
  if (t > pero) equis(242, 96, Math.round(9 * Math.min(1, (t - pero) / 0.2)));
  if (t > parl) { const g = tramo(t, parl, parl + 0.7); if (g < 1) destello(Math.round(lerp(56, 97, g)), Math.round(lerp(129, 121, g)), 4); T.visto(R, 102, 104, 1); R.numero('1647', 74, 112, { centro: true }); }
  if (t > antes) { const u = tramo(t, antes, gobierna), x1 = Math.round(lerp(98, 222, u)), y1 = Math.round(lerp(98, 74, u));
    for (let i = 0; i <= 40; i++) { const f = i / 40; if (f > u) break; const x = Math.round(lerp(98, 222, f)), y = Math.round(lerp(98, 74, f) - Math.sin(f * Math.PI) * 16); if (i % 3 !== 2) { R.rect(x, y, x + 1, y + 1, K); R.pset(x, y, hex('#f0c850')); } }
    if (u >= 1) { R.linea(222, 74, 216, 70, hex('#f0c850')); R.linea(222, 74, 215, 77, hex('#f0c850')); R.linea(222, 75, 215, 78, K); } }
  if (t > gobierna) R.numero('1653', 242, 80, { centro: true, n: Math.round((t - gobierna) * 120) });
};

// ── 3 · 1660: la corona de acebo vuelve a la puerta ──
const casa = () => fijo('casa1660', () => {
  const { rect, pset, linea, disco } = R;
  // el cielo de invierno, tramado
  const cie = [hex('#8aa2c2'), hex('#9cb2cc'), hex('#b0c2d8'), hex('#c8d4e2')];
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const f = y / 110 * 3, i = Math.min(3, Math.floor(f + (hh(x, y, 30) - 0.5) * 0.5)); pset(x, y, cie[Math.max(0, i)]); }
  // la torre de la iglesia, detrás de las casas de la calle
  for (let y = 30; y < 140; y++) for (let x = 212; x <= 244; x++) { const r = Math.floor(y / 6), off = r % 2 ? 4 : 0, jj = y % 6 === 0 || (x + off) % 8 === 0;
    pset(x, y, x === 212 ? hex('#c8ccd6') : x === 244 ? hex('#6e7280') : jj ? hex('#7e828e') : [hex('#a4a8b4'), hex('#9a9eaa'), hex('#aeb2bc')][Math.floor(hh(x >> 3, r, 31) * 3)]); }
  for (const x of [210, 220, 230, 240]) { rect(x, 24, x + 5, 30, hex('#9a9eaa')); rect(x, 24, x + 5, 24, hex('#c8ccd6')); }
  rect(208, 30, 248, 33, hex('#8a8e9a')); rect(208, 30, 248, 30, hex('#d0d4dc'));
  for (const x of [209, 245]) { linea(x, 16, x - 2, 24, hex('#8a8e9a')); linea(x, 16, x + 2, 24, hex('#8a8e9a')); rect(x - 2, 21, x + 2, 24, hex('#9a9eaa')); pset(x, 15, hex('#d0d4dc')); }
  for (const x0 of [216, 230]) { for (let y = 40; y <= 58; y++) for (let x = x0; x <= x0 + 10; x++) { if (y < 44 && Math.hypot(x - x0 - 5, y - 44) > 5.5) continue; pset(x, y, hex('#22222e')); } rect(x0 - 1, 58, x0 + 11, 59, hex('#d0d4dc')); }
  rect(218, 80, 224, 92, hex('#22222e')); disco(221, 80, 3, hex('#22222e')); rect(218, 92, 225, 93, hex('#d0d4dc'));
  // las casas de la calle de enfrente, más azuladas, con nieve en los tejados
  const lejos = (x0, x1, yb, yt, pl, k) => { const cx = (x0 + x1) / 2, hw = (x1 - x0) / 2, yr = yt + Math.round(hw * 0.8); pl = mez(pl, hex('#a8b8cc'), 0.18);
    for (let y = yt; y <= yb; y++) for (let x = x0; x <= x1; x++) {
      if (y < yr) { const lim = (y - yt) / 0.8; if (Math.abs(x - cx) > lim) continue; pset(x, y, Math.abs(x - cx) > lim - 2 ? (y % 2 ? hex('#f4f8fc') : hex('#dce6f0')) : (y - yt) % 3 === 0 ? hex('#4a2e30') : (x + (((y - yt) / 3) | 0) * 2) % 5 === 0 ? hex('#5a3436') : hex('#7a4a44')); continue; }
      const post = (x - x0) % 11 < 2 || x - x0 < 2 || x1 - x < 2, rail = y === yr || y === yr + 1 || y === Math.round((yr + yb) / 2);
      pset(x, y, post || rail ? hex('#4a3428') : hh(x, y, k) < 0.1 ? mez(pl, K, 0.12) : pl); }
    rect(Math.round(cx) + 4, yt + 2, Math.round(cx) + 8, yr - 6, hex('#6a3a2e')); rect(Math.round(cx) + 3, yt + 1, Math.round(cx) + 9, yt + 2, hex('#f0f4f8'));
    for (let wx = x0 + 3; wx < x1 - 6; wx += 11) for (const wy of [yr + 4, Math.round((yr + yb) / 2) + 4]) { if (wy > yb - 12 && Math.abs(wx + 3 - cx) < 6) continue; rect(wx, wy, wx + 6, wy + 6, hex('#3a2a20')); rect(wx + 1, wy + 1, wx + 5, wy + 5, hh(wx, wy, k + 32) < 0.55 ? hex('#ffd890') : hex('#5a6a7e')); pset(wx + 3, wy + 1, hex('#3a2a20')); rect(wx, wy + 7, wx + 6, wy + 7, hex('#f4f8fc')); }
    rect(Math.round(cx) - 3, yb - 11, Math.round(cx) + 3, yb, hex('#3a2416')); rect(Math.round(cx) - 2, yb - 10, Math.round(cx) + 2, yb, hex('#6a4024')); pset(Math.round(cx) + 1, yb - 5, hex('#d8a83a')); };
  lejos(198, 236, 150, 98, hex('#d8c8a0'), 1); lejos(238, 278, 150, 92, hex('#e0c0b0'), 2); lejos(280, 322, 150, 86, hex('#c8d0b8'), 3);
  // la calle de adoquines con nieve, que se aleja a la derecha
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = y - 150, alto = 2 + Math.floor(fy / 6), r = Math.floor(fy / alto), off = r % 2 ? 3 : 0, ancho = 5 + Math.floor(fy / 4);
    const jj = fy % alto === 0 || (x + off) % ancho === 0; let co = jj ? hex('#5e5a5e') : [hex('#8a8690'), hex('#7a7680'), hex('#96929a')][Math.floor(hh((x + off) / ancho | 0, r, 33) * 3)];
    const blanca = Math.sin(x * 0.07 + Math.sin(y * 0.3)) + hh(x >> 2, y >> 1, 34) * 1.2 > 1.25; if (blanca) co = jj ? hex('#c8d4e2') : hex('#eef4fa');
    pset(x, y, co); }
  // LA CASA: tejado nevado, piso alto de entramado con ventanas emplomadas y piso bajo con la puerta
  for (let y = 30; y < 52; y++) for (let x = 0; x <= 200; x++) pset(x, y, (y - 30) % 4 === 0 ? hex('#4a2a22') : (x + ((y - 30) >> 2) * 3) % 7 === 0 ? hex('#5a3428') : hh(x, y, 35) < 0.15 ? hex('#8a5a44') : hex('#7a4a38'));
  for (let x = 0; x <= 200; x++) { const a = 2 + Math.round(Math.sin(x * 0.2) + hh(x, 1, 36)); for (let y = 30 - a; y < 32; y++) pset(x, y, y === 30 - a ? hex('#ffffff') : hex('#e6eef6')); if (hh(x, 2, 36) < 0.18) { const l = 2 + Math.floor(hh(x, 3, 36) * 4); for (let y = 52; y < 52 + l; y++) pset(x, y, y === 51 + l ? hex('#ffffff') : hex('#c8dcec')); } }
  rect(174, 12, 188, 30, hex('#6a2e22')); for (let y = 12; y < 30; y += 3) for (let x = 174; x <= 188; x++) pset(x, y, (x + (y % 6 ? 2 : 0)) % 5 === 0 ? hex('#4a2018') : hex('#8a3e2e')); rect(172, 10, 190, 12, hex('#5a5a62')); rect(172, 9, 190, 9, hex('#f0f4f8'));
  const yeso = (x, y, k) => { const n = hh(x, y, k); return n < 0.08 ? hex('#c8ac78') : n > 0.95 ? hex('#ecd8a8') : hex('#dcc490'); };
  for (let y = 52; y < 116; y++) for (let x = 0; x <= 198; x++) pset(x, y, yeso(x, y, 37));
  for (let y = 118; y < 162; y++) for (let x = 0; x <= 198; x++) pset(x, y, mez(yeso(x, y, 38), hex('#a08a64'), 0.15));
  const viga = (x0, y0, x1, y1) => { rect(x0, y0, x1, y1, hex('#4a2e1c')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (hh(x >> (x1 - x0 > y1 - y0 ? 2 : 0), y >> (x1 - x0 > y1 - y0 ? 0 : 2), 39) < 0.22) pset(x, y, hex('#6a4a30')); rect(x0, y0, x1, y0, hex('#7a5638')); };
  const diag = (ax, ay, bx, by) => { for (let k = -2; k <= 2; k++) linea(ax + k, ay, bx + k, by, k === -2 ? hex('#7a5638') : hex('#4a2e1c')); };
  diag(6, 110, 46, 56); diag(155, 56, 196, 110); diag(196, 56, 155, 110);
  for (const x of [0, 48, 100, 150, 194]) viga(x, 52, x + 4, 116);
  viga(0, 52, 198, 55); viga(0, 80, 48, 82);
  // ventana emplomada del piso alto, con su vela y la ramita de acebo
  const ventana = (x0, y0, x1, y1, calida) => { rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#3a2416')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let co = calida ? mez(hex('#f0c070'), hex('#8a5a30'), Math.min(1, Math.hypot(x - (x0 + x1) / 2, y - y1 + 6) / 22)) : hex('#4a5a6e');
      if ((x - x0 + y - y0) % 5 === 0 || (x - x0 - (y - y0) + 500) % 5 === 0) co = hex('#2a2a30'); pset(x, y, co); }
    rect(x0 - 3, y1 + 2, x1 + 3, y1 + 4, hex('#5a3a22')); rect(x0 - 3, y1 + 1, x1 + 3, y1 + 1, hex('#f4f8fc')); };
  ventana(58, 60, 90, 100, true); ventana(112, 62, 140, 98, false);
  rect(104, 60, 110, 100, hex('#5a6a3a')); for (let y = 62; y < 100; y += 5) rect(105, y, 109, y, hex('#3e4a28')); rect(104, 60, 104, 100, hex('#7a8a52'));
  aceboFijo(74, 101);
  // la viga del vuelo (el piso alto sobresale) y su sombra
  viga(0, 110, 198, 117); rect(0, 113, 198, 113, hex('#2a1810')); for (let x = 2; x < 198; x += 6) pset(x, 115, hex('#7a5638'));
  for (let y = 118; y < 124; y++) for (let x = 0; x <= 198; x++) pset(x, y, mez(R.pget(x, y), K, 0.4 - (y - 118) * 0.06));
  for (const x of [0, 70, 136, 194]) viga(x, 118, x + 5, 162);
  viga(0, 160, 198, 165);
  // la puerta de tablones con bisagras de hierro, el escalón y el gancho para la corona
  rect(90, 120, 132, 125, hex('#4a2e1c')); rect(90, 120, 132, 120, hex('#7a5638')); rect(90, 125, 95, 162, hex('#4a2e1c')); rect(127, 125, 132, 162, hex('#4a2e1c'));
  for (let x = 96; x <= 126; x++) for (let y = 126; y <= 161; y++) pset(x, y, (x - 96) % 6 === 0 ? hex('#3a2014') : hh(x, y >> 2, 40) < 0.2 ? hex('#7a4a2a') : (x - 96) % 6 === 1 ? hex('#8a5a34') : hex('#6a4024'));
  for (const y of [131, 153]) { rect(96, y, 118, y + 2, hex('#2a2a30')); rect(96, y, 118, y, hex('#5a5a66')); disco(118, y + 1, 2, hex('#2a2a30')); for (const x of [99, 106, 113]) pset(x, y + 1, hex('#8a8a96')); }
  disco(122, 146, 3, hex('#2a2a30')); disco(122, 146, 2, hex('#6a5a3a')); pset(122, 146, hex('#2a2a30')); pset(121, 145, hex('#a89a6a'));
  rect(110, 129, 112, 130, hex('#2a2a30')); pset(111, 128, hex('#8a8a96'));
  rect(88, 162, 134, 166, hex('#8a8690')); rect(88, 162, 134, 162, hex('#eef4fa'));
  // el escaparate de la cerería: el postigo de arriba subido y el de abajo bajado como mostrador con velas
  rect(12, 128, 62, 156, hex('#3a2416')); rect(14, 130, 60, 154, hex('#4a2e1c'));
  for (let y = 131; y <= 153; y++) for (let x = 15; x <= 59; x++) pset(x, y, mez(hex('#8a5a30'), hex('#2a1810'), Math.min(1, Math.abs(y - 140) / 16 + 0.2)));
  rect(15, 141, 59, 142, hex('#6a4426')); rect(15, 141, 59, 141, hex('#9a6a3a'));
  for (const [x, l] of [[20, 9], [26, 11], [32, 8], [38, 12], [44, 9], [50, 11], [55, 8]]) { linea(x, 131, x, 131 + l, hex('#e8dcc0')); pset(x, 131 + l, hex('#f6f0e0')); }
  rect(10, 122, 64, 127, hex('#6a4426')); for (let x = 10; x <= 64; x += 5) pset(x, 124, hex('#3a2416')); rect(10, 121, 64, 121, hex('#f4f8fc'));
  rect(10, 156, 64, 160, hex('#6a4426')); rect(10, 156, 64, 156, hex('#f4f8fc')); for (let x = 12; x < 64; x += 5) pset(x, 158, hex('#3a2416'));
  // el banco con nieve, un barril y la escoba
  rect(146, 150, 184, 153, hex('#6a4426')); rect(146, 149, 184, 149, hex('#f0f4f8')); for (const x of [148, 181]) rect(x, 154, x + 2, 162, hex('#4a2e1c'));
  rect(160, 160, 186, 161, mez(hex('#8a8690'), K, 0.3));
  for (let y = 142; y <= 164; y++) { const b = Math.round(Math.sin((y - 142) / 22 * Math.PI) * 1.5); for (let x = 186 - b; x <= 198 + b; x++) pset(x, y, (x - 186) % 4 === 0 ? hex('#4a2e1c') : x < 189 ? hex('#8a5a34') : hex('#6a4024')); }
  for (const y of [145, 160]) rect(185, y, 199, y + 1, hex('#3a3a42')); rect(186, 141, 198, 141, hex('#f0f4f8'));
  linea(140, 162, 146, 126, hex('#8a6a3a')); for (let k = 0; k < 6; k++) linea(138 + k, 166, 140 + k * 0.3, 158, hex('#c8a050'));
  // la guirnalda de 1660 a lo largo de la viga del vuelo, con lazos rojos
  for (const [xa, xb] of [[4, 48], [52, 100], [104, 150], [154, 194]]) for (let x = xa; x <= xb; x++) { const y = 116 + Math.round(Math.sin((x - xa) / (xb - xa) * Math.PI) * 6); pset(x, y, hex('#1e6a3a')); pset(x, y + 1, hex('#0f4024')); if (x % 3 === 0) pset(x, y - 1, hex('#4a9a5a')); if (x % 7 === 3) pset(x, y + 1, hex('#c8202a')); }
  for (const x of [2, 50, 102, 152, 196]) { rect(x - 2, 115, x + 2, 117, hex('#c8202a')); pset(x - 1, 118, hex('#c8202a')); pset(x + 1, 118, hex('#c8202a')); pset(x, 116, hex('#701018')); }
});
// la ramita de acebo del alféizar (se pinta dentro del fondo fijo)
function aceboFijo(x, y) { if (PZ.acebo) PZ.acebo(R, x, y, {}); }
const p3 = (t) => {
  casa();
  // nubes de tres tonos a tres velocidades y pájaros
  for (const [k, x0, y0, v, w] of [[0, 20, 12, 3, 30], [1, 160, 20, 5, 22], [2, 260, 8, 2, 26], [3, 90, 4, 4, 18]]) { const x = ((x0 + t * v) % 380) - 40; if (x > 250 && y0 < 46) continue;
    R.disco(x, y0 + 4, w * 0.32, hex('#a8b8cc')); R.disco(x + w * 0.35, y0 + 2, w * 0.36, hex('#dce4ee')); R.disco(x - w * 0.3, y0 + 5, w * 0.26, hex('#c4d0de')); R.disco(x + w * 0.1, y0, w * 0.22, hex('#f0f4f8')); }
  for (let k = 0; k < 3; k++) { const x = ((t * (12 + k * 4) + k * 90) % 300) - 20, y = 60 + k * 7 + Math.round(Math.sin(t * 2 + k) * 2), al = Math.floor(t * 6 + k) % 2; if (x > 196 && x < 250) continue; R.pset(Math.round(x), y, K); R.pset(Math.round(x) - 1, y - al, K); R.pset(Math.round(x) + 1, y - al, K); }
  // el humo de la chimenea
  for (let i = 0; i < 6; i++) { const u = ((t * 0.35 + i / 6) % 1), x = 181 + Math.round(Math.sin(u * 5 + t) * 2 + u * 14), y = 8 - Math.round(u * 26); if (y < 0) continue; R.disco(x, y + 8 - 8, 1.5 + u * 3, u < 0.5 ? hex('#a0a4ae') : hex('#c4c8d0')); }
  for (const [k, cx] of [[0, 223], [1, 264], [2, 307]]) for (let i = 0; i < 4; i++) { const u = ((t * 0.3 + i / 4 + k * 0.3) % 1), x = cx + Math.round(Math.sin(u * 5 + t + k) * 2 + u * 10), y = [98, 92, 86][k] - 2 - Math.round(u * 22); if (k === 2 && y < 46) continue; R.disco(x, y, 1 + u * 2.5, u < 0.5 ? hex('#a8acb6') : hex('#c8ccd4')); }
  // las campanas tocan desde «the king returned» y la bandera real sube
  for (const [k, cx] of [[0, 221], [1, 235]]) { const a = t > rey ? Math.sin((t - rey) * 6.5 + k * 1.4) * 0.5 : 0; for (let j = 0; j < 9; j++) { const w = 1 + Math.round(j * 0.45), off = Math.round(Math.sin(a) * j * 0.9); R.rect(cx - w + off, 46 + j, cx + w + off, 46 + j, j === 8 ? hex('#a87a18') : j < 2 ? hex('#ffe08a') : hex('#d8a83a')); } R.pset(cx + Math.round(Math.sin(a) * 9), 56, hex('#6a4a10'));
    if (t > rey) { const u = ((t - rey + k * 0.35) % 0.9) / 0.9; for (let j = -3; j <= 3; j++) { const s = k ? 1 : -1; R.pset(cx + s * Math.round(12 + u * 14), 50 + j + Math.round(Math.abs(j) * 0.4), u < 0.5 ? hex('#ffe08a') : hex('#d8a83a')); } } }
  { R.rect(227, 4, 228, 24, hex('#5a5a62')); R.pset(227, 3, hex('#d8a83a')); const fy = Math.round(lerp(18, 5, suave(tramo(t, rey - 0.4, rey + 0.7))));
    for (let x = 229; x <= 245; x++) { const ola = Math.round(Math.sin(t * 6 - x * 0.5) * 1.2); R.rect(x, fy + ola, x, fy + 9 + ola, (x - 229) % 6 === 5 ? hex('#a01820') : hex('#c8202a')); }
    R.icono('corona', 235, fy + 3 + Math.round(Math.sin(t * 6 - 236 * 0.5) * 1.2), hex('#f0c850'), hex('#701018')); }
  // velas del escaparate y nieve
  for (const [k, x] of [[0, 24], [1, 50]]) { R.rect(x - 1, 148, x + 1, 153, hex('#f2ead6')); halo(x, 145, 6, t, k); llama(x, 147, t, k); }
  nieve(t, 70, [0, 0, 319, 179], null, 5);
  // gente pequeña al fondo de la calle
  for (let k = 0; k < 2; k++) { const x = 206 + ((t * (5 + k * 3) + k * 60) % 110), y = 148 - k; R.rect(Math.round(x), y - 6, Math.round(x) + 2, y, k ? hex('#7a2a3a') : hex('#3a4a6a')); R.rect(Math.round(x), y - 8, Math.round(x) + 2, y - 7, hex('#e8b890')); }
  // la vecina trae la corona de acebo y la cuelga en la puerta en «legal»
  const v = tramo(t, P3 + 0.3, legal - 0.7), atras = tramo(t, legal + 0.25, legal + 0.85), xv = Math.round(lerp(330, 128, suave(v)) + atras * 24);
  const colgando = t > legal - 0.25, colgada = t > legal;
  if (colgada) PZ.coronaAcebo(R, 111, 152, {});
  const rv = R.actor(EL.vecina, xv, 166, t, { dir: atras > 0 && atras < 1 ? 1 : -1, anda: (v > 0 && v < 1) || (atras > 0 && atras < 1), sostiene: !colgando ? true : false, dedo: colgando && !colgada, sonrisa: t > legal - 1.2, brazos: t > otraVez });
  if (!colgada) { const [hx, hy] = colgando ? [Math.round(lerp(rv.mano[0], 111, tramo(t, legal - 0.25, legal))), Math.round(lerp(rv.mano[1] + 17, 152, tramo(t, legal - 0.25, legal)))] : [rv.mano[0], rv.mano[1] + 17]; PZ.coronaAcebo(R, hx, hy, {}); }
  if (t > legal && t < legal + 0.5) destello(111, 138, 4);
  // los aprendices charlan, miran arriba con las campanas y saltan en «again»
  const salta = (k) => (t > otraVez ? Math.round(Math.abs(Math.sin((t - otraVez) * 7 + k)) * 5) : 0);
  R.actor(EL.aprendiz, 22, 172, t, { dir: 1, habla: t < rey && Math.sin(t * 7) > 0.3, sorpresa: t > rey && t < otraVez, brazos: t > otraVez, sonrisa: t > otraVez - 0.3, salto: salta(0) });
  R.actor(EL.aprendiz2, 46, 174, t, { dir: -1, habla: t < rey && Math.sin(t * 7 + 2) > 0.3, sorpresa: t > rey + 0.2 && t < otraVez, brazos: t > otraVez, sonrisa: t > otraVez - 0.3, salto: salta(1.5) });
};

const efectos = [[riot, 'publico'], [lanza, 'whoosh'], [lanza + 0.55, 'chof'], [cromwell, 'pop'], [parl + 0.05, 'brillo'], [antes + 0.1, 'whoosh'], [rey, 'campana'], [legal, 'golpecito'], [otraVez, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1647 : 1660) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-multa'] = ('La multa de Massachusetts', '''// NV-MULTA (frase 7, «multa»). Cinco planos (la frase dura 24 s: con cuatro, el último pasaba de 7 s):
// 1. El libro de leyes de Massachusetts (inserto, fondo local) sobre un escritorio de 1659: la página pasa sola; el
//    acebo tachado; la mano del escribano escribe el «5» en «five», cae el chelín en «shilling» y raya la cuenta de 22
//    rayas desde «fine» hasta «22», que escribe en rojo.
// 2. Boston (general): el barco con la bandera real entra en el puerto («King Charles the Second»); en «drop it» el
//    alguacil descuelga la multa del poste y la rompe; en «1681» los vecinos saltan.
// 3. El rincón del escribano en 1856 (uso libre): el señor de 1857 cruza tras la mesa hasta el calendario y en «legal
//    holiday» rodea en verde la casilla del acebo; la dama aplaude; en «1856» sale el número.
// 4. Glasgow (general), mañana de Navidad de los años 50: la gente va a trabajar con abrigo y fiambrera; el obrero y la
//    obrera se cruzan y se saludan en «Christmas Day»; el autobús pasa por detrás.
// 5. La parada (uso libre): la cola patea de frío; el autobús llega en «late 1950s» y suben.''',
COMUN + r'''
const m = (f) => en('multa', f);
const P2 = m(0.255), P3 = m(0.505), P4 = m(0.715), P5 = m(0.91);
const vuelta = 0.35, cinco = m(0.14), chelin = m(0.155), raya0 = m(0.17), veinti = m(0.21);
const rey = m(0.29), quita = m(0.40), ano81 = m(0.44), rompe = m(0.47);
const festivo = m(0.605), ano56 = m(0.67), dia = m(0.88), cincuenta = m(0.945);

// ── 1 · El libro de leyes: el 5 y las 22 rayas ──
const TALLY = []; for (let k = 0; k < 22; k++) { const g = Math.floor(k / 5), i = k % 5, row = g < 3 ? 0 : 1, gx = 176 + (g % 3) * 24, gy = row ? 122 : 96;
  TALLY.push(i < 4 ? [gx + 2 + i * 4, gy, gx + 2 + i * 4, gy + 14] : [gx - 1, gy + 11, gx + 16, gy + 3]); }
const VENT = [188, 6, 262, 40];
const libro = () => fijo('libro', () => {
  const { rect, pset, linea, disco } = R;
  // la pared de tablas (tranquila arriba) con la estantería de libros
  for (let y = 0; y < 46; y++) for (let x = 0; x < 320; x++) pset(x, y, y % 7 === 0 ? hex('#4a3420') : y % 7 === 1 ? hex('#8a6a4a') : hh(x >> 2, y, 50) < 0.12 ? hex('#6a4c32') : hex('#7a5c3e'));
  rect(22, 40, 112, 43, hex('#4a2e1c')); rect(22, 40, 112, 40, hex('#8a6440'));
  let bx = 24; for (let k = 0; bx < 108; k++) { const w = 4 + Math.floor(hh(k, 1, 51) * 4), hgt = 11 + Math.floor(hh(k, 2, 51) * 7), c = [hex('#6a2a22'), hex('#2e4a32'), hex('#5a4026'), hex('#2a3a5a'), hex('#7a5a2a')][k % 5];
    if (k === 6) { linea(bx, 39, bx + 8, 39 - hgt + 3, K); linea(bx + 1, 39, bx + 9, 39 - hgt + 3, c); bx += 10; continue; }
    rect(bx, 40 - hgt, bx + w - 1, 39, c); rect(bx, 40 - hgt, bx, 39, mez(c, BLANCO, 0.25)); rect(bx + 1, 43 - hgt, bx + w - 2, 43 - hgt, hex('#d8b860')); rect(bx + 1, 36, bx + w - 2, 36, hex('#d8b860')); bx += w; }
  // la ventana al puerto de Boston (el mástil y la nieve se pintan encima)
  rect(VENT[0] - 3, VENT[1] - 2, VENT[2] + 3, VENT[3] + 4, hex('#3a2416')); rect(VENT[0] - 4, VENT[3] + 3, VENT[2] + 4, VENT[3] + 5, hex('#8a6440'));
  for (let y = VENT[1]; y <= VENT[3]; y++) for (let x = VENT[0]; x <= VENT[2]; x++) pset(x, y, y > 30 ? (y > 33 && hh(x, y, 52) < 0.2 ? hex('#8aa2b8') : hex('#6a88a4')) : y > 26 && x > 236 ? hex('#eef4fa') : y > 24 && x > 240 ? hex('#7a6a64') : mez(hex('#b8c4d2'), hex('#dfe6ee'), (30 - y) / 26));
  for (let x = VENT[0]; x <= VENT[2]; x++) if (x < 220) { const y = 28 - Math.round(Math.abs(Math.sin(x * 0.15)) * 3); for (let yy = y; yy <= 30; yy++) pset(x, yy, yy === y ? hex('#eef4fa') : hex('#5a6a7a')); }
  // el escritorio de roble en perspectiva
  for (let y = 46; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.4 + x * 0.01) * 2 + y * 0.6); const junta = y === 78 || y === 118 || y === 160;
    pset(x, y, junta ? hex('#2e1c10') : y === 79 || y === 119 || y === 161 ? hex('#8a5e3a') : v > 0.82 ? hex('#4e3220') : v < -0.85 ? hex('#7e5434') : hh(x >> 3, y, 53) < 0.1 ? hex('#5a3a24') : hex('#6a4429')); }
  rect(0, 46, 319, 47, hex('#8a5e3a'));
  // la luz cálida de la vela sobre la mesa
  for (let y = 60; y < 180; y++) for (let x = 0; x < 120; x++) { const d = Math.hypot(x - 34, (y - 110) * 1.3) / 70; if (d < 1) pset(x, y, mez(R.pget(x, y), hex('#ffcf80'), 0.2 * (1 - d))); }
  // los papeles sueltos de debajo
  for (let y = 148; y < 178; y++) for (let x = 6; x < 62; x++) { const xx = x + Math.round((y - 148) * 0.25); if (xx > 62) continue; pset(xx, y, (y - 150) % 5 === 0 && x > 10 && x < 56 && hh(x >> 1, y, 54) > 0.3 ? hex('#8a7a60') : hex('#e4d8b8')); }
  // la sombra del libro y el libro: tapas de cuero, cantos de las hojas, las dos páginas
  for (let y = 54; y < 172; y++) for (let x = 62; x < 270; x++) pset(x, y, mez(R.pget(x, y), K, 0.45));
  for (let y = 50; y <= 166; y++) for (let x = 58; x <= 262; x++) { const esq = (x < 61 || x > 259) && (y < 53 || y > 163); if (esq) continue; pset(x, y, x === 58 || x === 262 || y === 50 || y === 166 ? hex('#2a0e08') : hex('#5a2416')); }
  for (let y = 54; y <= 162; y++) for (let x = 63; x <= 257; x++) { const g = Math.abs(x - 160);
    const borde = x < 66 || x > 254 || y > 159; if (borde) { pset(x, y, (x + y) % 2 ? hex('#d8caa4') : hex('#b8a880')); continue; }
    let co = mez(hex('#f2e6c6'), hex('#b8a47c'), g < 12 ? (12 - g) / 14 : 0); if (hh(x, y, 55) < 0.04) co = mez(co, hex('#c8b48a'), 0.6);
    const arriba = 56 + Math.round(Math.max(0, 10 - g) * 0.25); if (y < arriba) continue; pset(x, y, co); }
  rect(159, 55, 160, 160, hex('#8a7654'));
  // renglones (sin letras): rayas de tinta con huecos
  const renglones = (x0, x1, y0, y1, k) => { for (let y = y0; y <= y1; y += 5) { let x = x0; while (x < x1) { const w = 3 + Math.floor(hh(x, y, k) * 9); for (let i = 0; i < w && x + i < x1; i++) pset(x + i, y, hh(x + i, y, k + 1) < 0.2 ? hex('#a89870') : hex('#6a5a44')); x += w + 2; } } };
  renglones(72, 152, 112, 154, 56); renglones(168, 250, 60, 84, 57); renglones(168, 250, 146, 154, 58);
  rect(70, 60, 72, 106, hex('#b8a47c'));
  // el acebo tachado (la ley contra la Navidad)
  if (PZ.acebo) PZ.acebo(R, 92, 84, { s: 2 });
  // la cinta roja del marcapáginas
  for (let y = 50; y < 178; y++) { const x = 162 + Math.round(Math.sin(y * 0.08) * 1.5); pset(x, y, hex('#a01820')); pset(x + 1, y, hex('#c8303a')); }
  rect(161, 176, 164, 178, hex('#a01820'));
  // el tintero, el lacre, el sello, la jarra de peltre y el reloj de arena
  disco(282, 124, 9, K); disco(282, 124, 8, hex('#2a2a3a')); disco(279, 121, 2, hex('#6a6a88')); rect(277, 112, 287, 116, K); rect(278, 113, 286, 115, hex('#b8903a')); rect(278, 113, 286, 113, hex('#f0c850'));
  rect(268, 100, 296, 103, K); rect(269, 101, 295, 102, hex('#a8202a')); rect(269, 101, 295, 101, hex('#d84a4a'));
  rect(14, 136, 36, 166, K); rect(15, 137, 35, 165, hex('#8a8e98')); rect(16, 137, 19, 165, hex('#c8ccd6')); rect(31, 137, 35, 165, hex('#5a5e68')); rect(14, 134, 36, 136, hex('#6a6e78'));
  for (let y = 142; y < 162; y++) { pset(37 + Math.round(Math.sin((y - 142) / 20 * Math.PI) * 5), y, K); pset(38 + Math.round(Math.sin((y - 142) / 20 * Math.PI) * 5), y, hex('#8a8e98')); }
  rect(284, 134, 308, 137, hex('#4a2e1c')); rect(284, 168, 308, 171, hex('#4a2e1c')); rect(284, 134, 308, 134, hex('#8a6440'));
  for (const x of [286, 305]) rect(x, 137, x + 1, 168, hex('#6a4426'));
  for (let y = 138; y <= 167; y++) { const w = Math.round(1 + Math.abs(y - 152.5) * 0.55); rect(296 - w, y, 296 + w, y, hex('#c8d8e4')); pset(296 - w, y, hex('#e8f0f6')); }
  // la vela en su palmatoria de latón
  for (let y = 108; y <= 116; y++) { const w = Math.round(12 * Math.sqrt(Math.max(0, 1 - ((y - 112) / 4.5) ** 2))); rect(35 - w, y, 35 + w, y, y < 111 ? hex('#f0c850') : hex('#b8903a')); }
  rect(31, 80, 39, 110, hex('#f2ead6')); rect(31, 80, 32, 110, hex('#fffaf0')); rect(37, 82, 39, 110, hex('#d8ccb0'));
  for (const [x, l] of [[33, 9], [38, 14], [35, 5]]) rect(x, 81, x, 81 + l, hex('#fffaf0'));
});
const p1 = (t) => {
  libro();
  // fuera: el mástil de un barco que se mece y la nieve
  R.recorte(VENT); { const o = Math.round(Math.sin(t * 1.3) * 1.5); R.linea(232 + o, 12, 232, 32, hex('#3a2a20')); R.linea(214 + o, 18, 248 + o, 18, hex('#3a2a20')); R.linea(218 + o, 24, 246 + o, 24, hex('#3a2a20')); R.linea(232 + o, 12, 250, 31, hex('#5a4a40')); } R.recorte(null);
  nieve(t, 26, VENT, null, 7); R.rect(224, VENT[1], 225, VENT[3], hex('#3a2416')); R.rect(VENT[0], 22, VENT[2], 23, hex('#3a2416'));
  halo(35, 74, 14, t); llama(35, 79, t);
  // la arena del reloj
  { const u = (t % 20) / 20; for (let y = 139; y < 152; y++) { if (y < 139 + u * 12) continue; const w = Math.round(Math.abs(y - 152.5) * 0.55) - 1; if (w >= 0) R.rect(296 - w, y, 296 + w, y, hex('#d8b060')); }
    for (let y = 153; y < 167; y++) if (Math.floor(t * 20 + y) % 3) R.pset(296, y, hex('#d8b060')); for (let y = 167 - Math.round(u * 8); y <= 167; y++) { const w = Math.round(Math.abs(y - 152.5) * 0.55) - 1; R.rect(296 - w, y, 296 + w, y, hex('#c8a050')); } }
  // el «5», el chelín, las 22 rayas y el «22» (lo que la voz dice)
  if (t > cinco) R.numero('5', 124, 104, { tam: 16, centro: true, n: Math.round((t - cinco) * 60) });
  if (t > chelin) { const u = tramo(t, chelin, chelin + 0.3), y = Math.round(lerp(60, 98, u * u)) - (u >= 1 ? 0 : 0); R.disco(146, y, 8, K); R.disco(146, y, 7, hex('#b8bcc8')); R.disco(146, y, 5, hex('#d8dce4')); R.linea(146, y - 4, 146, y + 4, hex('#8a8e98')); R.linea(142, y, 150, y, hex('#8a8e98')); R.pset(143, y - 3, BLANCO); if (u >= 1 && t < chelin + 0.5) destello(152, 90, 3); }
  equis(92, 77, 9);
  const n = t < raya0 ? 0 : Math.min(22, Math.floor(tramo(t, raya0, veinti) * 22) + 1);
  for (let k = 0; k < n; k++) { const [a, b, c, d] = TALLY[k]; R.linea(a, b, c, d, hex('#2a1a10')); R.linea(a + 1, b, c + 1, d, hex('#4a3020')); }
  if (t > veinti) R.numero('22', 236, 156, { tam: 16, centro: true, n: Math.round((t - veinti) * 80), rampa: [hex('#ffb0a0'), hex('#e84a3a'), hex('#a01820'), hex('#601010')] });
  // la página que pasa sola al empezar
  { const u = tramo(t, 0.25, 0.25 + vuelta * 3); if (u > 0 && u < 1) { const e = suave(u), xr = Math.round(lerp(254, 66, e)), alza = Math.sin(e * Math.PI) * 14;
    for (let y = 56; y <= 158; y++) { const xa = Math.min(160, xr), xb = Math.max(160, xr), curva = Math.round(alza * Math.sin((y - 56) / 102 * Math.PI) * 0.3); for (let x = xa; x <= xb; x++) R.pset(x + (xr < 160 ? -curva : curva), y - Math.round(alza * Math.abs(x - 160) / 94), x === xr ? hex('#b8a47c') : mez(hex('#f6ecd0'), hex('#c8b48a'), Math.abs(x - 160) / 120)); } } }
  // la mano del escribano con la pluma, cerca del borde: entra, cuenta golpeando con la pluma y escribe el «22»
  const reposo = [252, 172];
  let tip = reposo;
  const ir = (p, q, ta, tb) => { const u = suave(tramo(t, ta, tb)); return [lerp(p[0], q[0], u), lerp(p[1], q[1], u)]; };
  if (t < 1.4) tip = [330, 220];
  else if (t < raya0) tip = ir([330, 220], reposo, 1.4, 2.3);
  else if (t < veinti - 0.25) tip = [reposo[0], reposo[1] - (Math.floor((t - raya0) * 18) % 2 ? 2 : 0)];
  else if (t < veinti) tip = ir(reposo, [226, 153], veinti - 0.25, veinti);
  else if (t < veinti + 0.35) { const w = tramo(t, veinti, veinti + 0.35); tip = [226 + w * 22, 153 + Math.sin(w * 12) * 3]; }
  else tip = ir([248, 153], reposo, veinti + 0.35, veinti + 0.9);
  const [tx, ty] = tip.map(Math.round), wx = tx + 13, wy = ty - 3;
  T.brazo(R, wx + 46, wy + 46, wx, wy, '#2a2a34', -1, {});
  R.linea(tx, ty + 1, tx + 14, ty - 20, hex('#5a4a3a')); for (let i = 4; i < 18; i++) { const x = Math.round(tx + i * 0.7), y = Math.round(ty + 1 - i * 1.4); R.pset(x - 1, y, hex('#f2f0e8')); R.pset(x + 1, y + 1, hex('#d8d4c8')); R.pset(x - 2, y - 1, i % 3 ? hex('#f2f0e8') : hex('#c8c4b8')); } R.pset(tx, ty + 1, K);
  // la tinta de las rayas que se van escribiendo brilla un momento
  if (n > 0 && n < 22) { const [a2, b2, c2, d2] = TALLY[n - 1]; R.pset(c2, d2, hex('#6a4a8a')); }
};

// ── 2 · Boston, 1681: el barco del rey y la multa rota ──
const p2 = (t) => {
  T.siglo17(R, t, { encuadre: 'boston', barco: suave(tramo(t, P2 + 0.2, quita - 0.2)) });
  const tiene = t > quita + 0.45, rota = t > rompe;
  const al = R.actor(EL.alguacil, 64, 166, t, { dir: t > rey - 0.3 && t < quita - 0.3 ? 1 : -1, sorpresa: t > rey && t < quita - 0.3, dedo: t > quita - 0.3 && t < quita + 0.3, sostiene: tiene && !rota ? [60, 146] : false, enfado: t > rompe && t < rompe + 0.6 });
  // vecinos que miran; en «1681» saltan de alegría
  const salta = (k) => (t > ano81 ? Math.round(Math.abs(Math.sin((t - ano81) * 7 + k)) * 5) : 0);
  R.actor(EL.vecinoPastel, 118, 166, t, { dir: t > rey && t < quita ? 1 : -1, habla: t < rey && Math.sin(t * 6) > 0.2, sonrisa: t > ano81 - 0.2, salto: salta(0) });
  R.actor(EL.vecina, 142, 168, t, { dir: t > rey + 0.2 && t < quita ? 1 : -1, sorpresa: t > rey + 0.2 && t < quita, brazos: t > ano81, sonrisa: t > ano81 - 0.2, salto: salta(1.6) });
  R.actor(EL.puritana, 176, 166, t, { dir: -1, habla: t > ano81 && Math.sin(t * 7) > 0, sonrisa: t > ano81 + 0.3 });
  T.siglo17Delante(R, t, { encuadre: 'boston', aviso: t < quita });
  // el aviso que cae a la mano del alguacil y que rompe en dos
  const papel = (x, y, a, w, hgt) => { const ca = Math.cos(a), sa = Math.sin(a); for (let j = 0; j < hgt; j++) for (let i = 0; i < w; i++) { const c = j === 0 || i === 0 ? hex('#c8b890') : (j % 3 === 2 && i > 1 && i < w - 1) ? hex('#8a7a60') : hex('#f4e8c8'); R.pset(Math.round(x + (i - w / 2) * ca - (j - hgt / 2) * sa), Math.round(y + (i - w / 2) * sa + (j - hgt / 2) * ca), c); } };
  if (t > quita && !tiene) { const u = tramo(t, quita, quita + 0.45); papel(lerp(52, 60, u) + Math.sin(u * 9) * 4, lerp(122, 142, u * u), u * 4, 9, 13); }
  if (tiene && !rota) papel(al.mano[0], al.mano[1] - 6, 0.1, 9, 13);
  if (rota) { const u = tramo(t, rompe, rompe + 0.9); for (const s of [-1, 1]) papel(60 + s * (4 + u * 10), lerp(140, 164, u * u), s * u * 3, 5, 12); if (u < 0.3) destello(60, 138, 3); }
};

// ── 3 · 1856: la Navidad, fiesta legal en Massachusetts ──
const p3 = (t) => {
  const g = T.siglo17(R, t, { encuadre: 'parlamento', camara: 'escribano', tacha: 0, libres: 0 });
  const nav = g.casillas?.navidad ?? [192, 97, 203, 113], cx = (nav[0] + nav[2]) / 2, cy = (nav[1] + nav[3]) / 2;
  const v = tramo(t, P3 + 0.2, festivo - 0.5);
  R.actor(EL.senor1857, Math.round(lerp(110, 184, suave(v))), 145, t, { dir: v < 1 ? 1 : -1, anda: v > 0 && v < 1, dedo: t > festivo - 0.3 && t < ano56 + 0.4, habla: t > ano56 && Math.sin(t * 8) > 0, sonrisa: t > festivo });
  T.siglo17Delante(R, t, { encuadre: 'parlamento', camara: 'escribano' });
  R.actor(EL.dama1857, 14, 172, t, { dir: 1, habla: t < festivo - 0.6 && Math.sin(t * 6) > 0.3, brazos: t > festivo + 0.1 && t < ano56 + 0.8, sonrisa: t > festivo, salto: t > festivo + 0.1 && t < ano56 ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0 });
  // el aro verde se dibuja alrededor del acebo en «legal holiday»; el 1856 se estampa
  if (t > festivo) { const u = tramo(t, festivo, festivo + 0.6); for (let i = 0; i < 80 * u; i++) { const a = i / 80 * Math.PI * 2 - Math.PI / 2, x = Math.round(cx + Math.cos(a) * 11), y = Math.round(cy + Math.sin(a) * 13); R.rect(x - 1, y - 1, x + 1, y + 1, K); }
    for (let i = 0; i < 80 * u; i++) { const a = i / 80 * Math.PI * 2 - Math.PI / 2; R.rect(Math.round(cx + Math.cos(a) * 11), Math.round(cy + Math.sin(a) * 13), Math.round(cx + Math.cos(a) * 11), Math.round(cy + Math.sin(a) * 13) + 1, hex('#3ac85a')); }
    if (u >= 1 && t < festivo + 1.2) destello(Math.round(cx + 10), Math.round(cy - 12), 4); }
  if (t > ano56) { const e = tramo(t, ano56, ano56 + 0.15); R.numero('1856', 122, Math.round(44 - (1 - e) * 6), { tam: 16, centro: true }); }
};

// ── 4 · Glasgow, años 50: a trabajar el día de Navidad ──
const p4 = (t) => {
  const g = T.siglo17(R, t, { encuadre: 'escocia', bus: tramo(t, P4 + 0.3, P4 + 3.6) });
  const a = tramo(t, P4, dia - 0.3), b = tramo(t, P4 + 0.2, dia - 0.3);
  R.actor(EL.obreroEscoces, Math.round(lerp(-16, 130, a)), 168, t, { dir: 1, anda: a > 0 && a < 1, habla: t > dia - 0.2 && Math.sin(t * 8) > 0, sonrisa: t > dia - 0.3 });
  R.actor(EL.obreraEscocesa, Math.round(lerp(300, 156, b)), 170, t, { dir: -1, anda: b > 0 && b < 1, dedo: t > dia && t < dia + 0.8, sonrisa: t > dia - 0.3 });
  const c = tramo(t, P4 + 0.6, P5 + 0.4);
  R.actor(EL.obreroEscoces, Math.round(lerp(250, 186, c) + (t > dia ? 0 : 0)), 166, t, { dir: -1, anda: c > 0 && c < 1, pal: { C: hex('#4a4e5a'), c: hex('#34363e'), u: hex('#8a2a2a') } });
  T.siglo17Delante(R, t, { encuadre: 'escocia' });
};

// ── 5 · La parada: el autobús de las 7 llega en «late 1950s» ──
const p5 = (t) => {
  const llega = suave(tramo(t, P5 + 0.1, cincuenta + 0.3));
  T.siglo17(R, t, { encuadre: 'escocia', camara: 'parada', bus: llega });
    const cola = [[EL.obreraEscocesa, 150, 0, null], [EL.obreroEscoces, 126, 1.3, null], [EL.obreroEscoces, 102, 2.1, { C: hex('#5a4a3a'), c: hex('#3e3428'), u: hex('#2a4a7a') }], [EL.obreraEscocesa, 78, 0.7, { C: hex('#7a3a4a'), c: hex('#5a2a36'), u: hex('#e0c060') }]];
  for (const [k, [def, x0, f, pal]] of cola.entries()) { const s = tramo(t, cincuenta + 0.4 + k * 0.3, cincuenta + 3.6 + k * 0.3), x = Math.round(x0 + s * 200);
    R.actor(def, x, 168, t, { dir: 1, anda: s > 0 && s < 1, salto: t < cincuenta && Math.sin(t * 5 + f * 3) > 0.85 ? 1 : 0, sonrisa: t > cincuenta, sorpresa: t > cincuenta - 0.2 && t < cincuenta + 0.4 && k === 0, ...(pal ? { pal } : {}) }); }
  // el vaho del aliento en el frío
  for (const [k, x] of [[0, 166], [1, 142], [2, 118]]) { const u = ((t * 0.8 + k * 0.33) % 1); if (u < 0.6 && t < cincuenta + 0.6) R.disco(x + Math.round(u * 8), 147 - Math.round(u * 6), 1 + u * 2, mez(hex('#dce6f0'), hex('#9aa6b4'), u)); }
  T.siglo17Delante(R, t, { encuadre: 'escocia', camara: 'parada' });
};

const efectos = [[0.3, 'papel'], [cinco, 'lapiz'], [chelin + 0.3, 'golpecito'], [veinti, 'pop'], [P2 + 0.4, 'ola'], [quita, 'papel'], [ano81, 'publico'], [rompe, 'papel'], [festivo, 'lapiz'], [ano56, 'sello'], [P4 + 0.6, 'motor'], [m(0.85), 'silbato'], [P5 + 0.2, 'motor'], [cincuenta + 0.5, 'puerta']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P2 ? 1659 : t < P3 ? 1681 : t < P4 ? 1856 : 1958) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-nicolas'] = ('San Nicolás de Mira', '''// NV-NICOLAS (frase 8, «nicolas»), siglo IV. Tres planos:
// 1. Mira de noche (general): el obispo Nicolás sale de la iglesia con una bolsita, cruza la plaza junto al pozo y el
//    olivo; en «Santa Claus» le brilla la mitra; en «Saint Nicholas» se para junto a la ventana de la casa pobre y mira
//    atrás para que nadie le vea.
// 2. El mapa del Mediterráneo oriental (fondo local, pergamino sobre la mesa): una mano clava la chincheta en Mira en
//    «Myra»; en «Turkey» Anatolia se tiñe; en «legend» sale el «?»; un barquito cruza el mar.
// 3. La ventana de cerca (ventana): la mano de manga roja deja tres bolsitas en el alféizar en «secretly gave», «three»
//    y «money»; las tres hermanas se sorprenden, las cogen y sonríen en «marry».''',
COMUN + r'''
import { equirect, pintar } from '/atomo/plato/escenas/ov-mapas.js';
const m = (f) => en('nicolas', f);
const P2 = m(0.315), P3 = m(0.725);
const santa = m(0.18), san = m(0.26), mira = m(0.41), turquia = m(0.495), leyenda = m(0.68);
const B = [m(0.795), m(0.84), m(0.895)], boda = m(0.965);

// ── 1 · Mira de noche ──
const p1 = (t) => {
  const g = T.roma(R, t, { encuadre: 'mira' });
  const u = tramo(t, 0.4, san - 0.1), x = Math.round(lerp(58, 194, suave(u)));
  const mirAtras = t > san + 0.05 && t < san + 0.75;
  const n = R.actor(EL.nicolas, x, 160, t, { dir: mirAtras ? -1 : 1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > san + 0.8 });
  if (PZ.bolsa) PZ.bolsa(R, n.mano[0], n.mano[1] + 8, {});
  if (t > santa && t < santa + 0.7) destello(x + 7, n.cabeza[1] - 4, Math.round(2 + Math.sin((t - santa) / 0.7 * Math.PI) * 3));
  if (t > san + 0.9) { const k = Math.floor((t - san) * 3) % 2; R.pset(g.ventana[0] + 6, g.ventana[1] + 4 + k, hex('#ffe08a')); }
};

// ── 2 · El mapa: Mira, en lo que hoy es Turquía ──
const P = equirect([8, 8, 312, 172], [18.5, 38.5, 32.5, 42.5]);
const ANATOLIA = [[29.0, 41.1], [30.2, 41.2], [31.4, 41.3], [32.6, 41.8], [33.6, 42.0], [35.0, 42.05], [35.4, 41.7], [36.3, 41.4], [37.2, 41.1], [38.6, 41.0], [38.6, 36.9], [36.6, 36.9], [36.2, 36.6], [35.8, 36.75], [35.4, 36.6], [34.7, 36.8], [34.1, 36.4], [33.6, 36.15], [32.9, 36.05], [32.3, 36.4], [31.6, 36.6], [30.9, 36.85], [30.6, 36.8], [30.5, 36.4], [30.4, 36.2], [30.1, 36.3], [29.9, 36.2], [29.6, 36.15], [29.3, 36.3], [29.1, 36.65], [28.6, 36.75], [28.1, 36.6], [27.6, 36.7], [28.0, 37.0], [27.4, 37.05], [27.2, 37.4], [27.3, 37.9], [26.8, 38.2], [26.3, 38.3], [26.8, 38.5], [26.9, 38.9], [26.6, 39.3], [26.1, 39.45], [26.2, 39.95], [26.5, 40.3], [27.3, 40.4], [28.0, 40.4], [28.9, 40.45], [29.5, 40.75], [29.0, 41.0]];
const BALCANES = [[18.5, 42.5], [28.0, 42.5], [27.9, 42.0], [28.0, 41.6], [29.0, 41.25], [28.6, 41.0], [27.5, 40.97], [26.7, 40.5], [26.2, 40.05], [26.1, 40.6], [25.5, 40.9], [24.4, 40.85], [23.9, 40.4], [23.6, 40.0], [23.0, 40.4], [22.6, 40.4], [22.9, 39.6], [22.9, 39.1], [23.4, 38.7], [24.1, 38.3], [24.0, 37.7], [23.5, 37.9], [23.1, 37.5], [23.2, 36.5], [22.5, 36.4], [22.4, 36.8], [21.9, 36.75], [21.7, 37.2], [21.1, 37.8], [21.6, 38.3], [21.2, 38.4], [20.8, 38.9], [20.2, 39.5], [19.9, 40.0], [19.4, 40.5], [19.5, 41.0], [19.4, 41.8], [18.9, 42.1], [18.5, 42.4]];
const ISLAS = [
  [[23.5, 35.3], [24.2, 35.55], [25.0, 35.42], [25.8, 35.35], [26.3, 35.3], [26.2, 35.0], [25.0, 34.95], [24.3, 35.1], [23.6, 35.2]],
  [[32.3, 35.05], [32.9, 35.4], [33.6, 35.37], [34.6, 35.7], [34.0, 35.0], [33.9, 34.9], [32.9, 34.6], [32.4, 34.75]],
  [[27.7, 36.15], [28.2, 36.45], [28.25, 36.38], [27.85, 35.9]],
  [[25.85, 39.15], [26.4, 39.4], [26.6, 39.05], [26.2, 38.95]], [[25.85, 38.5], [26.15, 38.6], [26.1, 38.2], [25.9, 38.25]], [[26.6, 37.8], [27.05, 37.75], [26.9, 37.65], [26.6, 37.68]],
  [[22.9, 38.95], [23.6, 38.75], [24.6, 38.1], [24.4, 38.0], [23.4, 38.5], [22.8, 38.85]],
  [[24.9, 37.1], [25.2, 37.2], [25.1, 36.95]], [[25.3, 37.08], [25.6, 37.12], [25.5, 36.95]], [[27.0, 36.9], [27.35, 36.9], [27.2, 36.75]],
  [[20.3, 39.75], [19.9, 39.45], [20.0, 39.8]], [[20.5, 38.4], [20.8, 38.3], [20.6, 38.1]],
];
const LEVANTE = [[38.6, 36.9], [38.6, 32.5], [34.9, 32.5], [35.1, 33.1], [35.5, 33.9], [35.9, 34.6], [35.8, 35.5], [35.9, 35.9], [36.2, 36.6], [36.6, 36.9]];
const CIRENAICA = [[20.0, 32.5], [21.6, 32.92], [22.6, 32.8], [23.2, 32.5]];
const MYRA = P([29.98, 36.26]).map(Math.round);
let TIERRA_ANA = null;
const dentroPol = (pts, x, y) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const mapa = () => fijo('mapaMira', () => {
  const { rect, pset, linea } = R;
  const MAR = [hex('#86a6bc'), hex('#7898b0'), hex('#6c8aa2')], TIE = hex('#e8dcbc'), TIES = hex('#d8c8a4'), COSTA = hex('#4a3e34');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 2, y, 60) < 0.1 ? MAR[1] : MAR[0]);
  // retícula punteada
  for (let lon = 20; lon <= 38; lon += 5) for (let y = 8; y < 172; y += 3) pset(Math.round(P([lon, 0])[0]), y, MAR[2]);
  for (let lat = 35; lat <= 42; lat += 5) for (let x = 8; x < 312; x += 3) pset(x, Math.round(P([0, lat])[1]), MAR[2]);
  const trama = (x, y) => (hh(x >> 1, y, 61) < 0.08 ? TIES : TIE);
  pintar(R, P, [BALCANES, ANATOLIA, LEVANTE, CIRENAICA, ...ISLAS], trama, { somera: hex('#a4c0d0'), borde: COSTA });
  // la costa sombreada por dentro y las ondas de buril en el mar, junto a la costa
  const esMar = (x, y) => { const c = R.pget(x, y); return c === MAR[0] || c === MAR[1] || c === MAR[2]; };
  for (let y = 10; y < 170; y += 4) for (let x = 10 + (y % 8 ? 0 : 5); x < 310; x += 10) if (esMar(x, y) && esMar(x + 4, y) && esMar(x - 3, y) && !(x > 270 && y < 48)) { pset(x, y, MAR[2]); pset(x + 1, y - 1, MAR[2]); pset(x + 2, y, MAR[2]); pset(x + 3, y - 1, MAR[2]); }
  // los ríos: el Halys, el Sangario y el Meandro
  for (const rio of [[[38.4, 39.7], [37.0, 39.4], [35.6, 39.0], [34.4, 39.6], [34.2, 40.6], [35.0, 41.2], [35.9, 41.7]], [[31.5, 39.3], [30.7, 39.8], [30.3, 40.4], [30.6, 41.1]], [[30.2, 38.1], [29.4, 37.9], [28.4, 37.8], [27.3, 37.5]], [[22.4, 41.6], [22.6, 41.0], [22.9, 40.6]]]) for (let i = 1; i < rio.length; i++) { const [ax, ay] = P(rio[i - 1]), [bx, by] = P(rio[i]); for (let k = 0; k <= 12; k++) { const x = Math.round(lerp(ax, bx, k / 12) + Math.sin(k * 1.7 + i) * 1.2), y = Math.round(lerp(ay, by, k / 12)); pset(x, y, hex('#5a86b0')); } }
  // los montes del Tauro y del interior (trazos «^») y algún bosquecillo
  for (const [lon, lat] of [[30.5, 37.4], [31.6, 37.3], [32.6, 37.1], [33.6, 37.2], [34.6, 37.4], [35.4, 37.6], [29.6, 37.0], [28.6, 37.5], [22.0, 41.0], [21.0, 41.6], [23.2, 41.6], [22.0, 39.6], [21.6, 40.4], [33.0, 39.0], [31.5, 39.6], [34.6, 39.8], [36.5, 38.6], [37.4, 37.8], [36.4, 37.6], [31.0, 38.4], [29.4, 39.2], [32.4, 40.6], [36.4, 40.2], [37.6, 39.4], [24.6, 41.6], [21.4, 39.0]]) {
    const [x, y] = P([lon, lat]).map(Math.round); if (x > 272 && y < 50) continue; linea(x - 3, y + 2, x, y - 2, hex('#8a7a5a')); linea(x, y - 2, x + 3, y + 2, hex('#b8a888')); pset(x, y - 2, hex('#6a5a40')); }
  for (const [lon, lat] of [[27.6, 39.6], [28.4, 40.0], [30.6, 40.6], [32.4, 41.2], [24.4, 41.4], [26.0, 41.9], [20.6, 39.2]]) { const [x, y] = P([lon, lat]).map(Math.round); for (const [dx, dy] of [[0, 0], [4, 1], [-3, 2]]) { R.disco(x + dx, y + dy, 1.6, hex('#8a9a6a')); pset(x + dx, y + dy + 2, hex('#6a5a40')); } }
  // los puntos de las ciudades de entonces (sin nombres)
  for (const ll of [[28.97, 41.01], [23.72, 37.98], [27.34, 37.94], [27.14, 38.42], [36.2, 36.2], [24.0, 38.0]]) { const [x, y] = P(ll).map(Math.round); R.disco(x, y, 1.5, COSTA); pset(x, y, hex('#c8402a')); }
  // la rosa de los vientos, en el mar de Libia
  { const x = 52, y = 140; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? 6 : 12; for (let i = 0; i <= l; i++) { const w = (l - i) / l * (k % 2 ? 1 : 2); for (let s = -w; s <= w; s += 0.5) pset(Math.round(x + Math.cos(a) * i - Math.sin(a) * s), Math.round(y + Math.sin(a) * i + Math.cos(a) * s), k === 0 ? hex('#c8402a') : s < 0 ? COSTA : hex('#a8987a')); } } R.disco(x, y, 2, TIE); pset(x, y, COSTA); }
  // el papel viejo: manchas, dobleces y bordes oscuros; la mesa alrededor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = R.pget(x, y); const d = Math.max(Math.abs(x - 160) / 152, Math.abs(y - 90) / 82);
    if (d > 0.84 && hh(x, y, 62) < (d - 0.84) * 5) c = mez(c, hex('#6a5a40'), 0.35);
    if (Math.hypot(x - 96, y - 52) < 14 && Math.hypot(x - 96, y - 52) > 12) c = mez(c, hex('#a08a60'), 0.25);
    if (x === 160 || y === 90) c = mez(c, BLANCO, 0.25); if (x === 161 || y === 91) c = mez(c, K, 0.18);
    pset(x, y, c); }
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (x < 7 || x > 312 || y < 7 || y > 172) pset(x, y, (y + Math.round(Math.sin(x * 0.05) * 2)) % 6 < 2 ? hex('#4a2e1a') : hex('#5a3a22'));
  rect(7, 7, 312, 7, K); rect(7, 172, 312, 172, K); rect(7, 7, 7, 172, K); rect(312, 7, 312, 172, K);
  for (const [x, y] of [[12, 12], [307, 167], [12, 167]]) { R.disco(x, y, 2, hex('#a87a18')); pset(x - 1, y - 1, hex('#f0c850')); }
  // la máscara de Anatolia, para teñirla en «Turkey»
  TIERRA_ANA = []; const pa = ANATOLIA.map((p) => P(p));
  for (let y = 8; y < 172; y++) for (let x = 8; x < 312; x++) if (dentroPol(pa, x + 0.5, y + 0.5)) TIERRA_ANA.push([x, y]);
});
const p2 = (t) => {
  mapa();
  // Anatolia se tiñe en «Turkey»
  const ti = tramo(t, turquia - 0.1, turquia + 0.4) * (0.7 + 0.3 * Math.sin((t - turquia) * 4)); if (ti > 0) { const c = hex('#d86a4a'); for (const [x, y] of TIERRA_ANA) if ((x + y) % 2 === 0 || ti > 0.6) R.pset(x, y, mez(R.pget(x, y), c, 0.32 * ti)); }
  // el barquito de vela que cruza de Creta a Licia (solo por el mar)
  { const u = (t * 0.035 + 0.1) % 1, [x, y] = P([lerp(24.5, 31.5, u), lerp(34.6, 35.6, u) + Math.sin(u * 9) * 0.1]).map(Math.round), b = Math.round(Math.sin(t * 3)); R.rect(x - 4, y + 1 + b, x + 4, y + 2 + b, hex('#5a3a22')); R.pset(x - 5, y + b, hex('#5a3a22')); R.pset(x + 5, y + b, hex('#5a3a22')); R.linea(x, y - 7 + b, x, y + b, hex('#3a2416')); R.poligono([[x + 1, y - 7 + b], [x + 6, y - 1 + b], [x + 1, y - 1 + b]], hex('#f2ead6')); R.pset(x + 2, y - 4 + b, hex('#c8402a')); for (let i = 1; i < 6; i++) if (Math.sin(t * 4 + i) > 0) R.pset(x - 5 - i * 2, y + 3 + b, hex('#a4c0d0')); }
  // la mariquita que recorre el canto de la mesa
  { const u = (t * 0.06) % 1, x = Math.round(20 + u * 280); R.disco(x, 176, 2, hex('#c82a2a')); R.pset(x - 2, 176, K); R.pset(x, 175, K); R.pset(x + 1, 177, K); }
  // la mano clava la chincheta en Mira; el obispo (mitra) y el «?» de la leyenda
  const [mx, my] = MYRA, baja = tramo(t, mira - 0.25, mira);
  const ent = suave(tramo(t, P2 + 0.2, mira - 0.25)), sal = suave(tramo(t, mira + 0.3, mira + 1.0));
  if (ent > 0 && sal < 1) { const wx = Math.round(lerp(330, mx + 16, ent) + sal * 80), wy = Math.round(lerp(196, my - 2, ent) + sal * 50) - (baja < 1 ? Math.round((1 - baja) * 6) : 0);
    if (baja < 1) T.chincheta(R, wx - 14, wy + 4, t, hex('#c8202a'), { baja: 1 });
    T.brazo(R, 340, 214, wx, wy, '#6a4a32', -1, { codo: [Math.round(wx + 40), Math.round(Math.min(210, wy + 30))] }); }
  if (baja >= 1) { T.chincheta(R, mx, my, t, hex('#c8202a'), { pulso: t > mira && t < mira + 1.6 }); }
  if (t > mira + 0.4) { const x = mx + 10, y = my - 30, e = tramo(t, mira + 0.4, mira + 0.7); if (e > 0.3) { const mi = (d) => [[x - d, y + 16 + d], [x - d, y + 6], [x + 6, y - d], [x + 12 + d, y + 6], [x + 12 + d, y + 16 + d]]; R.poligono(mi(1), K); R.poligono(mi(0), BLANCO); R.linea(x + 1, y + 6, x + 6, y + 1, hex('#c8ccd6')); R.rect(x, y + 13, x + 12, y + 15, hex('#f0c850')); R.rect(x + 5, y + 2, x + 7, y + 13, hex('#f0c850')); R.rect(x + 3, y + 7, x + 9, y + 8, hex('#f0c850')); R.pset(x + 6, y + 7, hex('#c8202a')); for (const lx of [x + 2, x + 9]) { R.rect(lx, y + 17, lx + 1, y + 21, hex('#c8202a')); R.pset(lx, y + 22, hex('#f0c850')); } } }
  if (t > leyenda) { const e = tramo(t, leyenda, leyenda + 0.25); R.icono('?', mx - 28, my - 40 - Math.round(e * 4 + Math.sin(t * 4)), hex('#fff2c0'), K, 3); }
};

// ── 3 · La ventana: tres bolsitas para tres hermanas ──
const p3 = (t) => {
  const g = T.roma(R, t, { encuadre: 'mira', camara: 'ventana' });
  const suelo = g.suelo ?? 142, alf = g.alfeizar ?? 138, SITIO = [194, 178, 162];
  const coge = (k) => t > B[2] + 0.45 + k * 0.25;
  R.recorte(g.hueco ?? [108, 38, 212, 138]);
  const H = [[EL.hermana1, 124], [EL.hermana2, 146], [EL.hermana3, 168]];
  const manos = [];
  for (const [k, [def, x]] of H.entries()) { const ve = t > B[2 - k]; const r = R.actor(def, x, suelo, t, { dir: k === 2 ? 1 : 1, triste: !ve, sorpresa: ve && t < B[2 - k] + 0.8, sonrisa: t > boda - 0.4 || (ve && t > B[2 - k] + 0.8), sostiene: coge(k) ? [x + 18, 128] : false, salto: t > boda ? Math.round(Math.abs(Math.sin((t - boda) * 7 + k)) * 3) : 0 }); manos.push(r.mano); }
  R.recorte(null);
  T.romaDelante(R, t, { encuadre: 'mira', camara: 'ventana' });
  // las bolsitas: en el alféizar o ya en la mano de cada hermana
  for (let k = 0; k < 3; k++) { if (t < B[k]) continue; const her = 2 - k; if (coge(her)) { PZ.bolsa(R, manos[her][0], manos[her][1] + 9, {}); if (t < boda + 0.6 && Math.sin(t * 8 + k) > 0.5) destello(manos[her][0] + 4, manos[her][1] - 4, 2); } else PZ.bolsa(R, SITIO[k], alf, { s: 2 }); }
  // la mano de manga roja que deja las bolsitas, una por una
  for (let k = 0; k < 3; k++) { const a = B[k] - 0.55, b = B[k], c = B[k] + 0.4; if (t < a || t > c) continue;
    const ent = suave(tramo(t, a, b)), sal = suave(tramo(t, b, c)), wx = Math.round(lerp(236, SITIO[k] + 14, ent) + sal * 30), wy = Math.round(lerp(112, alf - 23, ent) + sal * 6);
    R.recorte([100, 60, 213, 160]); if (t < b) PZ.bolsa(R, wx - 8, wy + 23, { s: 2 }); T.brazo(R, 262, 150, wx, wy, '#b8283a', -1, { codo: [236, Math.round(wy + 10)], sombra: false }); R.recorte(null); }
  if (t > boda && t < boda + 0.8) for (let k = 0; k < 3; k++) destello(122 + k * 24, 108 - Math.round((t - boda) * 10), 3);
};

const efectos = [[santa, 'brillo'], [mira, 'toc'], [turquia, 'whoosh'], [leyenda, 'pop'], [B[0], 'golpecito'], [B[2], 'golpecito'], [boda, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 330 });
''')
