# Borrador de escenas del ep43 (Haymitch), grupo S5: hm-plato (frases 18–19), con el movimiento ya hecho.
# Los instantes se escriben como en('marca', fracción), sacados de las palabras de la voz inglesa (linea.json).
import re

E = {}

# las dos frases de la escena: entrevista [0.5, 21.72] y plutarch [22.42, 44.465] (tiempos de la escena)
_F = {'A': ('entrevista', 0.5, 21.72), 'B': ('plutarch', 22.42, 44.465)}


def _en(m):
    k, s = m.group(1), float(m.group(2))
    marca, a, b = _F[k]
    return f"en('{marca}', {max(0.0, (s - a) / (b - a)):.4f})"


def _t(cuerpo):
    return re.sub(r'@([AB])\(([\d.]+)\)', _en, cuerpo)


E['hm-plato'] = ('El plató', '''// HM-PLATO (frases 18–19), Juegos 50 (año 50), sin cartela. Ocho planos, cada uno con Atom de luciérnaga:
// 1. «private session… murderers… a one»: la sala de los Vigilantes con luz de alarma; Haymitch entra, señala con rabia a
//    tres Vigilantes, que se asustan; en «one» la pantalla grande pone un 1 y una sola muesca de doce (sello).
// 2. «without sponsors… clean water… arena»: la tele de cerca: la arena preciosa a tres términos (cielo tramado con sol,
//    nubes a tres velocidades y pájaros; montes nevados, colinas con pinos, árboles, matas y la cornucopia; hierba alta,
//    flores y mariposas delante); un paracaídas plateado grande con la cantimplora baja y se va hacia arriba con la X
//    (patrocinadores: 0); el lago grande, con orilla y juncos, burbujea violeta y salen la gota y la X.
// 3. «interview with Caesar… charming rascal… moonshine» (corta en «In his»): los sillones del plató; Haymitch entra,
//    se sube de un salto al sillón, cuenta historias y levanta el tarro de licor; Caesar se parte de risa.
// 4. «Because… the capital really loves… a show» (corta en «Because»): el plató entero: Haymitch al centro, el público
//    en pie, el medidor que sube, confeti en «loves» y el foco en «show».
// 5. «And here someone you know very well shows up. Plutarch Heavensbee»: el invernadero con luz de tarde; Haymitch
//    pasea; Plutarch entra con la cámara al hombro, se planta y graba (piloto rojo y flash).
// 6. «the man who years later will be head gamemaker… young capital cameraman» (corta en «the man»): el museo del
//    Capitolio; Plutarch entra grabando; en «head gamemaker» cae el paño del cuadro del centro: la silueta del Vigilante
//    Jefe (túnica morada y oro); Atom lo rodea y sale la corona; un visitante se para a mirar; flash en «cameraman».
// 7. «who secretly passes Haymitch information about how the arena is built… gets him something» (corta en «and who»):
//    las rosas; Plutarch deja la cámara en el banco y le pasa un plano doblado; el bocadillo enseña el plano de la arena
//    (cúpula, depósito, el borde con su «!»); luego le da una ficha dorada.
// 8. «One last call to say goodbye to Lenore Dove» (corta en «One»): pantalla partida: Haymitch al teléfono en su
//    cuarto de noche | Lenore Dove en el prado de tarde con las ocas; las ondas de la voz cruzan; cuelga.''', _t(r'''
import { ELENCO_JH as JH } from '/atomo/plato/kits/pixel-chibi.js';
const P2 = @A(5.54), P3 = @A(10.18), P4 = @A(17.18), P5 = @B(22.42), P6 = @B(27.42), P7 = @B(33.12), P8 = @B(39.98);
const K = { k: hex('#1c1424'), blanco: hex('#f6f4f0'), gris: hex('#4a4a58'), grisL: hex('#7a7a8c'), grisS: hex('#2e2e38'),
  rojo: hex('#ff3a3a'), oro: hex('#f0c040'), oroS: hex('#a87a18'), papel: hex('#f2ead0'), papelS: hex('#c8bc98') };
const caja = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
const des = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (c, [r, g, b], a) => { const [r0, g0, b0] = des(c); return ((255 << 24) | (Math.round(b0 + (b - b0) * a) << 16) | (Math.round(g0 + (g - g0) * a) << 8) | Math.round(r0 + (r - r0) * a)) >>> 0; };
const aclara = (x, y, a, col = [255, 248, 220]) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), col, a)); };
const libre = (x, y) => !((x >= 20 && x <= 170 && y <= 21) || (x >= 276 && y <= 46));
// la cámara de hombro de Plutarch (la mano en hx, hy; el objetivo hacia dir), con el piloto rojo si graba
const camara = (hx, hy, dir, t, rec = false) => {
  const x0 = hx - 6, y0 = hy - 7;
  R.rect(x0 - 1, y0 - 1, x0 + 12, y0 + 7, K.k); R.rect(x0, y0, x0 + 11, y0 + 6, K.gris);
  R.rect(x0, y0, x0 + 11, y0, K.grisL); R.rect(x0, y0 + 5, x0 + 11, y0 + 6, K.grisS); R.rect(x0 + 2, y0 + 2, x0 + 4, y0 + 3, K.grisS);
  R.rect(x0 + 3, y0 - 3, x0 + 8, y0 - 3, K.k); R.pset(x0 + 3, y0 - 2, K.k); R.pset(x0 + 8, y0 - 2, K.k);   // el asa
  const lx = dir > 0 ? x0 + 12 : x0 - 5;   // el objetivo
  R.rect(lx, y0, lx + 4, y0 + 6, K.k); R.rect(lx + 1, y0 + 1, lx + 3, y0 + 5, hex('#22222c')); R.pset(dir > 0 ? lx + 3 : lx + 1, y0 + 2, hex('#8ad8ff')); R.pset(dir > 0 ? lx + 3 : lx + 1, y0 + 3, hex('#4a8ab8'));
  const vx = dir > 0 ? x0 - 3 : x0 + 12; R.rect(vx, y0, vx + 2, y0 + 3, K.k); R.pset(vx + 1, y0 + 1, hex('#5a6a7a'));   // el visor
  R.pset(dir > 0 ? x0 + 9 : x0 + 2, y0 + 2, rec && Math.floor(t * 3) % 2 === 0 ? K.rojo : hex('#5a2a2a'));
  return [dir > 0 ? lx + 4 : lx, y0 + 3];
};
// el destello de la cámara: una estrella blanca en el objetivo
const destello = (x, y, u) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + 9 * Math.sin(u * Math.PI));
  for (let i = -r; i <= r; i++) { R.pset(x + i, y, K.blanco); R.pset(x, y + i, K.blanco); if (Math.abs(i) < r / 2) { R.pset(x + i, y + i, hex('#fff6c8')); R.pset(x + i, y - i, hex('#fff6c8')); } }
  R.disco(x, y, Math.max(1, r / 3), K.blanco); };
// el tarro de licor de la destilería
const tarro = (hx, hy) => { const x0 = hx - 3, y0 = hy - 9;
  R.rect(x0 - 1, y0 - 1, x0 + 7, y0 + 8, K.k); R.rect(x0, y0 + 2, x0 + 6, y0 + 7, hex('#cfe8e4')); R.rect(x0, y0 + 4, x0 + 6, y0 + 7, hex('#e8d890'));
  R.rect(x0, y0, x0 + 6, y0 + 1, hex('#8a8e96')); R.rect(x0, y0, x0 + 6, y0, hex('#c8ccd4')); R.pset(x0 + 1, y0 + 3, K.blanco); R.pset(x0 + 1, y0 + 4, K.blanco); R.pset(x0 + 5, y0 + 6, hex('#b8a860')); };
// el plano doblado (o abierto: más grande, con rayas)
const papel = (hx, hy, abierto = false) => { const w = abierto ? 12 : 6, h = abierto ? 8 : 5, x0 = hx - (w >> 1), y0 = hy - h;
  R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + h + 1, K.k); R.rect(x0, y0, x0 + w, y0 + h, K.papel); R.rect(x0 + (w >> 1), y0, x0 + (w >> 1), y0 + h, K.papelS);
  if (abierto) { R.rect(x0, y0 + 4, x0 + w, y0 + 4, K.papelS); for (const [a, b] of [[2, 2], [8, 2], [3, 6], [9, 6]]) R.rect(x0 + a, y0 + b, x0 + a + 2, y0 + b, hex('#3a6aaa')); }
  else R.pset(x0 + 1, y0 + 1, K.blanco); };
// la ficha dorada de la llamada
const ficha = (hx, hy, t) => { const x0 = hx - 4, y0 = hy - 7;   // un teléfono pequeño: la llamada que le consigue
  R.rect(x0 - 1, y0 + 2, x0 + 9, y0 + 8, K.k); R.rect(x0, y0 + 3, x0 + 8, y0 + 7, hex('#3a3a44')); R.rect(x0, y0 + 3, x0 + 8, y0 + 3, hex('#6a6a7a'));
  R.rect(x0 - 1, y0 - 1, x0 + 9, y0 + 2, K.k); R.rect(x0, y0, x0 + 8, y0 + 1, hex('#2a2a34')); R.pset(x0 + 4, y0 + 5, hex('#e8e4dc'));
  if (Math.floor(t * 4) % 2) for (const [a, b] of [[11, -2], [12, -4], [11, -6]]) R.pset(x0 + a, y0 + b, hex('#fff2a8')); };
// el auricular del teléfono pegado a la oreja (la mano en hx, hy), con el cordón hasta (bx, by)
const auricular = (hx, hy, bx, by, t) => {
  R.rect(hx - 2, hy - 8, hx + 1, hy + 1, K.k); R.rect(hx - 1, hy - 7, hx, hy, hex('#3a3a44')); R.pset(hx - 1, hy - 7, hex('#6a6a7a'));
  const n = 24; let px = hx, py = hy + 1;
  for (let i = 1; i <= n; i++) { const u = i / n, x = Math.round(hx + (bx - hx) * u), y = Math.round(hy + 1 + (by - hy - 1) * u + Math.sin(u * Math.PI) * 10 + (i % 2 ? 1 : -1)); R.linea(px, py, x, y, hex('#2a2a34')); px = x; py = y; } };
// el teléfono de mesa (base, horquilla)
const telefono = (x, y) => { R.rect(x - 7, y - 6, x + 7, y, K.k); R.rect(x - 6, y - 5, x + 6, y - 1, hex('#3a3a44')); R.rect(x - 6, y - 5, x + 6, y - 5, hex('#6a6a7a'));
  R.disco(x, y - 3, 2, hex('#e8e4dc')); R.pset(x, y - 3, K.k); R.rect(x - 5, y - 8, x - 3, y - 6, K.k); R.rect(x + 3, y - 8, x + 5, y - 6, K.k); };
// las ondas de la voz que salen de (x, y) hacia dir
const ondas = (x, y, dir, t) => { for (let k = 0; k < 3; k++) { const f = (t * 1.6 + k / 3) % 1, r = 3 + f * 12, c = f < 0.7 ? hex('#f8f0c8') : hex('#a89a70');
  for (let a = -0.7; a <= 0.7; a += 0.12) R.pset(Math.round(x + dir * Math.cos(a) * r), Math.round(y + Math.sin(a) * r), c); } };

// ── 1. la sesión privada: la nota en la pantalla grande ──
const MURD = @A(3.00), ONE = @A(4.76);
const nota = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0) % 6 === 0 || (y - y0) % 6 === 0 ? hex('#163450') : (x + y) % 2 ? hex('#0c1a2c') : hex('#0e1e32'));
  const n = 12, w = (x1 - x0 - 6) / n, cx = (x0 + x1) >> 1;
  for (let k = 0; k < n; k++) { const bx = Math.round(x0 + 4 + k * w); caja(bx, y1 - 7, bx + w - 2, y1 - 3, k === 0 && t >= ONE ? (Math.floor(t * 6) % 2 ? hex('#ff4a3a') : hex('#ff8a5a')) : hex('#28405a')); }
  if (t < ONE) { const bx = Math.round(x0 + ((t * 30) % (x1 - x0))); for (let y = y0 + 2; y < y1 - 9; y++) R.pset(bx, y, hex('#3ad0c8')); R.icono('?', cx - 3, y0 + 10, hex('#8ad8ff'), K.k, 2); }
  else { const e = tramo(t, ONE, ONE + 0.25); R.numero('1', cx + 1, Math.round(y0 + 30 - (1 - e) * 6), { tam: 16, centro: true }); }
};
const p1 = (t) => {
  const g = T.arena(R, t, { encuadre: 'control', pantalla: nota });
  const al = t > MURD ? 0.12 + 0.1 * (0.5 + 0.5 * Math.sin(t * 7)) : 0.04; T.tinte(R, 16, 179, [220, 40, 60], al);   // la luz de alarma
  const u = tramo(t, 0.3, 1.8), xh = Math.round(lerp(18, 94, u));
  const acusa = t > MURD - 0.15 && t < ONE - 0.2;
  const hr = R.actor(JH.haymitch, xh, 160, t, { dir: 1, anda: u > 0 && u < 1, dedo: acusa, enfado: t > MURD - 0.6 && t < ONE + 0.3, habla: t > 1.8 && t < ONE - 0.3 && Math.sin(t * 11) > 0, sonrisa: t > ONE + 0.4 });
  const vig = [[206, 160], [230, 161], [254, 162]];
  vig.forEach(([x, y], k) => { const susto = t > MURD + 0.1 * k && t < MURD + 1.2;
    R.actor(JH.vigilante, x + (susto ? 2 : 0), y, t, { dir: k === 1 && t > ONE - 0.6 && t < ONE + 0.8 ? 1 : -1, sorpresa: susto, salto: susto && t < MURD + 0.35 + 0.1 * k ? 2 : 0, habla: k === 1 && t > MURD + 1.2 && t < ONE - 0.5 && Math.sin(t * 10) > 0, dedo: k === 1 && t > ONE - 0.6 && t < ONE + 0.8, enfado: k !== 1 && t > ONE }); });
  T.arenaDelante(R, t, { encuadre: 'control' });
  if (acusa) R.bocadillo(hr.cabeza[0] + 1, hr.cabeza[1] - 3 + (Math.floor(t * 6) % 2));
  T.AT.luciernaga(R, lerp(150, 112, tramo(t, 0.5, 2.5)) + Math.sin(t * 1.3) * 5, 108 + Math.sin(t * 2.2) * 3, t, { extra: true, dir: -1, cara: t > ONE ? 'triste' : t > MURD ? 'sorpresa' : 'normal', brillo: 0.8 });
};

// ── 2. la tele: sin patrocinadores no hay agua ──
const SPON = @A(6.26), ISNT = @A(7.50), WATER = @A(8.02), ARENA = @A(9.24);
// azar fijo (sin Math.random): el mismo prado en cada fotograma
const hz3 = (a, b, s) => { const v = Math.sin(a * 127.1 + b * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
// una nube de tres tonos (sombra abajo, cuerpo y brillo arriba)
const tvNube = (R, cx, cy, s, [c1, c2, c3]) => {
  R.disco(cx, cy + 2, 6 * s, c3); R.disco(cx - 7 * s, cy + 2, 4 * s, c3); R.disco(cx + 7 * s, cy + 2, 4.5 * s, c3);
  R.disco(cx, cy, 5.5 * s, c2); R.disco(cx - 6 * s, cy + 1, 3.6 * s, c2); R.disco(cx + 6 * s, cy + 1, 4 * s, c2);
  R.disco(cx - 1, cy - 2 * s, 3.8 * s, c1); R.disco(cx + 4 * s, cy - 1 * s, 2.6 * s, c1);
};
// un árbol de hoja con tronco, copa de tres tonos que se mece y su sombra en la hierba (pie en x, y; s escala)
const tvArbol = (R, x, y, s, t, k) => {
  const m = Math.sin(t * 1.4 + k) * s * 0.8;
  R.disco(x + 2 * s, y + 1, 5 * s, hex('#3a8a34'));
  R.poligono([[x - 1 * s, y], [x + 1 * s, y], [x + 0.7 * s, y - 8 * s], [x - 0.7 * s, y - 8 * s]], hex('#5a3a22'));
  R.linea(x + Math.round(0.5 * s), y - 1, x + Math.round(0.5 * s), y - Math.round(7 * s), hex('#3a2416'));
  R.disco(x + m, y - 12 * s, 6 * s, hex('#1e5a2a')); R.disco(x - 4 * s + m, y - 9 * s, 4.2 * s, hex('#1e5a2a')); R.disco(x + 4 * s + m, y - 9 * s, 4.5 * s, hex('#1e5a2a'));
  R.disco(x - 1 * s + m, y - 13 * s, 5 * s, hex('#2e7a34')); R.disco(x - 4 * s + m, y - 10 * s, 3.4 * s, hex('#2e7a34')); R.disco(x + 3 * s + m, y - 10 * s, 3.6 * s, hex('#2e7a34'));
  R.disco(x - 2 * s + m, y - 15 * s, 2.6 * s, hex('#5aaa48')); R.disco(x - 5 * s + m, y - 11 * s, 1.6 * s, hex('#5aaa48'));
  if (s > 1.4) { R.pset(Math.round(x + 2 * s + m), Math.round(y - 12 * s), hex('#e83a5a')); R.pset(Math.round(x - 3 * s + m), Math.round(y - 8 * s), hex('#e83a5a')); }   // manzanas
};
// una mata redonda con flores
const tvMata = (R, x, y, s, t, k) => {
  const m = Math.round(Math.sin(t * 2 + k) * 0.6);
  R.disco(x + m, y - 2 * s, 3.6 * s, hex('#2a6a2e')); R.disco(x - 3 * s + m, y - 1 * s, 2.6 * s, hex('#2a6a2e')); R.disco(x + 3 * s + m, y - 1 * s, 2.8 * s, hex('#2a6a2e'));
  R.disco(x - 1 * s + m, y - 3 * s, 2.6 * s, hex('#4a9a3e')); R.disco(x + 2 * s + m, y - 2 * s, 1.6 * s, hex('#4a9a3e')); R.pset(x - 2 + m, y - Math.round(4 * s), hex('#8ad05a'));
  const fc = [hex('#f4e05a'), hex('#f08ac8'), hex('#ffffff')][k % 3]; R.pset(x - 2 + m, y - 2, fc); R.pset(x + 2 + m, y - Math.round(3 * s), fc); R.pset(x + m, y - 1, fc);
};
const tvArena = (R, t, [x0, y0, x1, y1]) => {
  const W = x1 - x0, hz = y0 + 46;
  // el cielo tramado en cuatro tonos (más claro hacia el horizonte)
  const cs = [hex('#4a8ae0'), hex('#64a4ee'), hex('#8cc4f4'), hex('#c4e2f8')];
  for (let y = y0; y <= hz; y++) { const v = (y - y0) / (hz - y0) * 3; for (let x = x0; x <= x1; x++) { const d = ((x & 1) * 2 + (y & 1)) / 4; R.pset(x, y, cs[Math.min(3, Math.floor(v + d * 0.9))]); } }
  // el sol de la tarde con su halo
  R.disco(x0 + 34, y0 + 14, 9, hex('#d8ecfa')); R.disco(x0 + 34, y0 + 14, 6, hex('#fff6c8')); R.disco(x0 + 33, y0 + 13, 3, hex('#ffffff'));
  // nubes a tres velocidades (lejos, lentas y pequeñas; cerca, rápidas y grandes)
  [[0.25, 10, 0.6, 0], [0.25, 18, 0.55, 1], [0.5, 8, 0.85, 2], [0.5, 24, 0.8, 3], [0.9, 14, 1.15, 4]].forEach(([vel, yy, s, k]) => {
    const sp = W + 60, cx = x0 - 30 + (((hz3(k, 3, 9) * sp + t * 7 * vel) % sp) + sp) % sp;
    tvNube(R, Math.round(cx), y0 + yy, s, s > 1 ? [hex('#ffffff'), hex('#e4eef8'), hex('#a8bcd8')] : [hex('#f2f6fc'), hex('#cad8ea'), hex('#9cb0cc')]); });
  // pájaros que cruzan aleteando (uves de dos píxeles de ala)
  for (let k = 0; k < 5; k++) { const bx = Math.round(x1 + 10 - ((t * (9 + k * 2) + k * 31) % (W + 30))), by = Math.round(y0 + 8 + k * 5 + Math.sin(t * 1.7 + k) * 2), a = Math.sin(t * 12 + k * 1.3) > 0 ? -1 : 1;
    R.linea(bx - 2, by + a, bx, by, hex('#2a2a3a')); R.linea(bx, by, bx + 2, by + a, hex('#2a2a3a')); }
  // los montes del fondo: azulados, con nieve y sus vertientes en sombra
  R.poligono([[x0 - 4, hz], [x0 + 26, y0 + 26], [x0 + 46, y0 + 32], [x0 + 70, y0 + 16], [x0 + 98, y0 + 30], [x0 + 122, y0 + 20], [x1 + 4, y0 + 34], [x1 + 4, hz]], hex('#8a96c0'));
  R.poligono([[x0 + 70, y0 + 16], [x0 + 98, y0 + 30], [x0 + 86, hz], [x0 + 72, hz]], hex('#6e7aa6')); R.poligono([[x0 + 122, y0 + 20], [x1 + 4, y0 + 34], [x1 + 4, hz], [x0 + 128, hz]], hex('#6e7aa6'));
  R.poligono([[x0 + 26, y0 + 26], [x0 + 46, y0 + 32], [x0 + 38, hz], [x0 + 30, hz]], hex('#6e7aa6'));
  R.poligono([[x0 + 63, y0 + 22], [x0 + 70, y0 + 16], [x0 + 78, y0 + 21], [x0 + 74, y0 + 24], [x0 + 70, y0 + 21], [x0 + 66, y0 + 24]], hex('#f6f8fc'));
  R.poligono([[x0 + 116, y0 + 24], [x0 + 122, y0 + 20], [x0 + 130, y0 + 24], [x0 + 124, y0 + 26]], hex('#eef2f8')); R.poligono([[x0 + 21, y0 + 29], [x0 + 26, y0 + 26], [x0 + 31, y0 + 29], [x0 + 26, y0 + 30]], hex('#eef2f8'));
  // las colinas de en medio, verde azulado, con la fila de pinos
  R.poligono([[x0 - 2, hz + 2], [x0 - 2, hz - 8], [x0 + 30, hz - 12], [x0 + 64, hz - 6], [x0 + 100, hz - 13], [x0 + 130, hz - 8], [x1 + 2, hz - 10], [x1 + 2, hz + 2]], hex('#4a7a6a'));
  for (let i = 0; i < 30; i++) { const px = x0 + 2 + i * 5 + Math.round(hz3(i, 1, 4) * 3), top = hz - 6 - Math.round(hz3(i, 2, 4) * 5) - (i > 18 ? 3 : 0);
    R.poligono([[px - 2, hz], [px, top], [px + 2, hz]], (i & 1) ? hex('#2a5a4a') : hex('#336a52')); R.pset(px, top + 1, hex('#5a8a72')); }
  // el prado: hierba tramada en tres tonos, más oscura y con más mancha cerca
  for (let y = hz; y <= y1; y++) { const f = (y - hz) / (y1 - hz); for (let x = x0; x <= x1; x++) { const r = hz3(x, y, 5);
    R.pset(x, y, r < 0.12 + f * 0.18 ? hex('#3e9a3a') : r > 0.93 - f * 0.05 ? hex('#8ad05a') : (y - hz) < 6 ? hex('#6ac050') : hex('#5ab84a')); } }
  // franjas de sombra de las nubes que corren por el prado
  for (let k = 0; k < 2; k++) { const sx = x0 + (((t * 8 + k * 80) % (W + 60)) - 30), sy = hz + 14 + k * 18;
    for (let y = sy; y < sy + 5; y++) for (let x = Math.round(sx); x < sx + 26 - Math.abs(y - sy - 2) * 3; x++) if (((x + y) & 1) === 0) R.pset(x, y, hex('#4aa040')); }
  // tres términos: árboles pequeños al fondo, matas y árboles en medio, hierba alta y flores grandes delante
  [[x0 + 14, hz + 3, 0.7], [x0 + 52, hz + 2, 0.6], [x0 + 128, hz + 4, 0.75], [x0 + 140, hz + 3, 0.6]].forEach(([x, y, s], k) => tvArbol(R, x, y, s, t, k));
  // la cornucopia dorada, grande, en el centro, con sus brillos y las cajas al pie
  const cx = x0 + 98, cy = hz + 12;
  R.disco(cx + 2, cy + 6, 9, hex('#3e8a36'));
  R.poligono([[cx - 12, cy - 6], [cx - 12, cy + 6], [cx + 8, cy + 3], [cx + 14, cy - 3], [cx + 16, cy - 8], [cx + 12, cy - 4]], hex('#b8901c'));
  R.poligono([[cx - 11, cy - 5], [cx - 11, cy], [cx + 8, cy - 1], [cx + 13, cy - 5]], K.oro);
  R.disco(cx - 12, cy, 6, hex('#8a6a10')); R.disco(cx - 12, cy, 4.4, hex('#3a2a10'));
  if (Math.floor(t * 3) % 3 === 0) R.pset(cx + 2, cy - 3, hex('#fff6b0')); else R.pset(cx - 4, cy - 3, hex('#fff6b0'));
  [[-20, 5, hex('#a07a4a')], [-16, 8, hex('#7a8a9a')], [-24, 8, hex('#c8a060')]].forEach(([dx, dy, c]) => { R.poligono([[cx + dx - 2, cy + dy - 2], [cx + dx + 2, cy + dy - 2], [cx + dx + 2, cy + dy + 1], [cx + dx - 2, cy + dy + 1]], c); R.linea(cx + dx - 2, cy + dy + 1, cx + dx + 2, cy + dy + 1, hex('#3a2a20')); });
  [[x0 + 8, hz + 22, 1.4], [x0 + 70, hz + 16, 1.1], [x0 + 126, hz + 24, 1.3], [x0 + 140, hz + 36, 1.6]].forEach(([x, y, s], k) => tvMata(R, x, y, s, t, k));
  tvArbol(R, x0 + 140, hz + 26, 1.6, t, 7);
  // el lago, grande: azul con su orilla de arena y juncos; desde «water», violeta y burbujeante
  const lx = x0 + 46, ly = y0 + 78, rx = 36, ry = 11, vio = tramo(t, WATER - 0.2, WATER + 0.5);
  for (let y = -ry - 2; y <= ry + 2; y++) for (let x = -rx - 3; x <= rx + 3; x++) { const d = (x / (rx + 3)) ** 2 + (y / (ry + 2)) ** 2; if (d > 1) continue;
    const di = (x / rx) ** 2 + (y / ry) ** 2; let c;
    if (di > 1) c = (x + y) & 1 ? hex('#c8b070') : hex('#a89050');
    else { const ola = (x + Math.floor(t * 6) + y * 3) % 11 === 0 && (y & 1) === 0; c = di > 0.82 ? hex('#2a5a8a') : y < -ry * 0.4 ? hex('#5aa0e0') : ola ? hex('#c8e8ff') : hex('#3a84d0');
      if (vio > 0) c = mez(c, di > 0.82 ? [80, 30, 110] : ola ? [230, 180, 255] : [150, 60, 200], vio * 0.9); }
    R.pset(lx + x, ly + y, c); }
  // el reflejo del cielo y los juncos de la orilla
  R.linea(lx - 20, ly - 6, lx + 6, ly - 6, vio > 0.5 ? hex('#d8a8ff') : hex('#a8d8ff')); R.linea(lx + 12, ly - 4, lx + 22, ly - 4, vio > 0.5 ? hex('#d8a8ff') : hex('#a8d8ff'));
  for (let i = 0; i < 6; i++) { const jx = lx + rx - 4 + i * 2, jy = ly + 4 - i, m = Math.round(Math.sin(t * 2.2 + i) * 1);
    R.linea(jx, jy + 4, jx + m, jy - 3, hex('#2e6a2a')); R.pset(jx + m, jy - 3, hex('#6a4a2a')); R.pset(jx + m, jy - 2, hex('#6a4a2a')); }
  if (vio > 0) for (let i = 0; i < 12; i++) { const f = (t * 0.9 + i * 0.137) % 1, bx = lx - 28 + i * 5 + Math.round(Math.sin(t * 3 + i) * 1), by = ly + 6 - f * 20;
    if (f > 0.85) continue; R.disco(bx, by, 1.6 + (i % 3) * 0.4, hex('#b070e8')); R.disco(bx, by, 0.9 + (i % 3) * 0.3, hex('#e4c0ff')); R.pset(bx - 1, by - 1, hex('#ffffff')); }
  // hierba alta y flores grandes delante (primer término), que se mecen
  const flores = [hex('#e83a5a'), hex('#f4e05a'), hex('#f08ac8'), hex('#ffffff'), hex('#a070e8')];
  for (let i = 0; i < 70; i++) { const fx = x0 + 2 + Math.round(hz3(i, 7, 2) * (W - 4)), fy = hz + 6 + Math.round(hz3(i, 8, 2) * (y1 - hz - 6));
    if (((fx - lx) / (rx + 4)) ** 2 + ((fy - ly) / (ry + 3)) ** 2 < 1) continue;
    const f = (fy - hz) / (y1 - hz), al = 1 + Math.round(f * 4), m = Math.round(Math.sin(t * 2 + i) * f * 1.6);
    R.linea(fx, fy, fx + m, fy - al, hex('#2e7a2e')); if (f > 0.5) { R.pset(fx - 1, fy - 1, hex('#2e7a2e')); }
    const c = flores[i % 5]; if (f > 0.6) { R.disco(fx + m, fy - al, 1.4, c); R.pset(fx + m, fy - al, hex('#f8d040')); } else R.pset(fx + m, fy - al, c); }
  for (let x = x0; x <= x1; x += 2) { const al = 3 + Math.round(hz3(x, 1, 3) * 4), m = Math.round(Math.sin(t * 2.4 + x * 0.2) * 1.2);
    R.linea(x, y1, x + m, y1 - al, (x & 2) ? hex('#2e7a2e') : hex('#3e9a3a')); }
  // dos mariposas que revolotean sobre las flores
  for (let k = 0; k < 2; k++) { const bx = Math.round(x0 + 82 + k * 40 + Math.sin(t * 0.8 + k * 2) * 14), by = Math.round(hz + 30 + Math.sin(t * 1.6 + k) * 6), a = Math.sin(t * 14 + k) > 0 ? 1 : 0;
    R.pset(bx, by, K.k); R.pset(bx - 1, by - a, hex('#f8a030')); R.pset(bx + 1, by - a, hex('#f8a030')); R.pset(bx - 2, by - a, hex('#f8a030')); R.pset(bx + 2, by - a, hex('#f8a030')); }
  // el paracaídas plateado con la cantimplora: baja despacio y, sin patrocinadores, se va otra vez hacia arriba (con la X)
  const baja = tramo(t, SPON - 0.3, ISNT), sube = tramo(t, ISNT + 0.05, WATER + 0.55);
  const py = Math.round(y0 - 30 + 62 * (1 - (1 - baja) ** 2) - 92 * sube ** 1.5), px = Math.round(x0 + 112 + Math.sin(t * 2) * 4 + 12 * sube), ld = Math.round(Math.sin(t * 2) * 2);
  if (baja > 0 && sube < 1) {
    // la cúpula: media luna plateada con sus gajos, el brillo y el borde ondulado
    const semi = (r) => { const pts = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + Math.PI * i / 16; pts.push([px + Math.cos(a) * r, py + Math.sin(a) * r]); } return pts; };
    R.poligono(semi(15), K.k); R.poligono(semi(14), hex('#c8ccd8'));
    for (let k = -2; k <= 2; k++) R.poligono([[px, py - 13], [px + k * 5 - 1.5, py], [px + k * 5 + 1.5, py]], k & 1 ? hex('#eef2f8') : hex('#a0a8b8'));
    R.disco(px - 5, py - 8, 2.6, hex('#ffffff'));
    for (let x = -14; x <= 14; x++) R.pset(px + x, py + ((x + 14) % 6 < 3 ? 1 : 0), K.k);
    for (const dx of [-12, -6, 6, 12]) R.linea(px + dx, py + 1, px + ld, py + 14, hex('#e8ecf0'));
    // la cantimplora con su tapón y su brillo
    R.poligono([[px + ld - 4, py + 14], [px + ld + 4, py + 14], [px + ld + 4, py + 24], [px + ld - 4, py + 24]], K.k);
    R.poligono([[px + ld - 3, py + 15], [px + ld + 3, py + 15], [px + ld + 3, py + 23], [px + ld - 3, py + 23]], hex('#a8b0bc'));
    R.linea(px + ld - 2, py + 16, px + ld - 2, py + 22, hex('#f0f4f8')); R.linea(px + ld + 2, py + 16, px + ld + 2, py + 22, hex('#6a7484'));
    R.linea(px + ld - 1, py + 13, px + ld + 1, py + 13, hex('#3a4a6a')); R.icono('gota', px + ld - 1, py + 17, hex('#5ab8f8'), K.k, 1);
    if (t > ISNT && t < WATER + 0.4 && Math.floor(t * 6) % 2) R.icono('X', px + 14, py + 2, K.rojo, K.k, 2);
  }
  // el marcador de patrocinadores: un paracaídas pequeño y «0»
  R.poligono([[x0 + 3, y0 + 11], [x0 + 5, y0 + 6], [x0 + 10, y0 + 3], [x0 + 15, y0 + 6], [x0 + 17, y0 + 11]], K.k);
  R.poligono([[x0 + 4, y0 + 10], [x0 + 6, y0 + 6], [x0 + 10, y0 + 4], [x0 + 14, y0 + 6], [x0 + 16, y0 + 10]], hex('#d8dce4')); R.pset(x0 + 8, y0 + 6, hex('#ffffff')); R.pset(x0 + 7, y0 + 7, hex('#ffffff'));
  R.linea(x0 + 5, y0 + 11, x0 + 10, y0 + 18, K.blanco); R.linea(x0 + 15, y0 + 11, x0 + 10, y0 + 18, K.blanco);
  R.numero('0', x0 + 24, y0 + 19, { tam: 16 });
  // sin agua limpia: la gota grande con la X sobre el lago
  const gx = lx - 6, gy = ly - 30, ap = tramo(t, WATER + 0.3, WATER + 0.6);
  if (ap > 0) { R.icono('gota', gx, gy, hex('#8ad8ff'), K.k, 3); if (t > ARENA - 0.2 || Math.floor(t * 5) % 2) R.icono('X', gx + 3, gy + 3, K.rojo, K.k, 3); }
};
const p2 = (t) => {
  T.interior(R, t, { encuadre: 'tele', camara: 'pantalla', pantalla: tvArena });
  T.AT.luciernaga(R, 250 + Math.sin(t * 1.1) * 4, 150 + Math.sin(t * 2.1) * 3, t, { extra: true, dir: -1, cara: t > WATER ? 'triste' : t > ISNT ? 'sorpresa' : 'normal', brillo: 0.7 });
};

// ── 3. la entrevista: los sillones ──
const CAESAR = @A(10.90), RASCAL = @A(12.48), TELLS = @A(14.02), MOON = @A(15.92);
const p3 = (t) => {
  const ri = Math.max(tramo(t, RASCAL + 0.3, RASCAL + 0.7) - tramo(t, TELLS, TELLS + 0.6), tramo(t, MOON, MOON + 0.4));
  T.capitolio(R, t, { encuadre: 'plato', camara: 'sillones', aplausos: 0.4 + 0.6 * ri });
  const u = tramo(t, P3 + 0.1, P3 + 1.3), h = tramo(t, RASCAL - 0.05, RASCAL + 0.45);
  const x = Math.round(h > 0 ? lerp(184, 200, h) : lerp(330, 184, u)), su = Math.round(lerp(160, 149, h)), sal = Math.round(Math.sin(h * Math.PI) * 9);
  const alza = t > MOON - 0.5;
  const r = R.actor(JH.haymitch, x, su, t, { dir: -1, anda: u > 0 && u < 1, salto: sal, sonrisa: t > RASCAL, habla: t > TELLS && t < MOON - 0.6 && Math.sin(t * 10) > 0, dedo: t > TELLS + 0.3 && t < MOON - 0.6, sostiene: alza ? [x - 3, su - (t > MOON ? 27 : 18)] : undefined });
  if (alza) tarro(r.mano[0], r.mano[1]);
  const ce = R.actor(JH.caesar, 92, 160, t, { dir: 1, habla: (t > CAESAR - 0.3 && t < RASCAL - 0.2 && Math.sin(t * 9) > 0) || (t > MOON + 0.6 && Math.sin(t * 12) > 0.3), sorpresa: (t > RASCAL && t < RASCAL + 0.6) || (t > MOON && t < MOON + 0.5), sonrisa: t > RASCAL + 0.6, brazos: t > MOON + 0.5 && Math.floor(t * 4) % 2 === 0 });
  T.AT.luciernaga(R, 46 + Math.sin(t * 0.9) * 6, 112 + Math.sin(t * 2.3) * 3, t, { extra: true, dir: 1, cara: t > MOON ? 'guino' : t > RASCAL ? 'sonrisa' : 'normal', brillo: 0.8 });
};

// ── 4. el show: el plató entero ──
const CAP = @A(19.28), LOVES = @A(20.16), SHOW = @A(21.26);
const confeti = (t, t0) => { const COL = [hex('#ff5ab0'), hex('#3ad0c8'), hex('#f0c040'), hex('#8a4ad8'), hex('#f6f4f0'), hex('#5ad85a')];
  for (let i = 0; i < 160; i++) { const v = 30 + (i % 5) * 9, y = Math.round(-4 - ((i * 37) % 50) + (t - t0) * v), x = Math.round(((i * 53 + 17) % 320) + Math.sin(t * 3 + i) * 3);
    if (y < 0 || y > 179 || !libre(x, y)) continue; const c = COL[i % 6]; R.pset(x, y, c); if (Math.floor(t * 8 + i) % 2) R.pset(x + 1, y, c); else R.pset(x, y + 1, c); } };
const p4 = (t) => {
  const ap = 0.5 + 0.5 * tramo(t, LOVES - 0.2, LOVES + 0.3);
  T.capitolio(R, t, { encuadre: 'plato', pantalla: 'retratos', aplausos: ap, audiencia: lerp(0.35, 0.98, tramo(t, P4 + 0.3, SHOW + 0.2)) });
  const u = tramo(t, P4 + 0.1, P4 + 1.3), x = Math.round(lerp(204, 156, u));
  const fo = tramo(t, SHOW - 0.3, SHOW + 0.2);   // el foco sobre Haymitch
  if (fo > 0) for (let y = 138; y <= 160; y++) for (let xx = 130; xx <= 196; xx++) { const d = ((xx - 163) / 32) ** 2 + ((y - 151) / 9) ** 2; if (d < 1) aclara(xx, y, 0.35 * fo * (1 - d * 0.6)); }
  if (fo > 0) for (let y = 20; y < 150; y++) { const w = 3 + (y - 20) * 0.22; for (let xx = Math.round(163 - w); xx <= 163 + w; xx++) if ((xx + y) % 3 === 0) aclara(xx, y, 0.18 * fo); }
  const brinca = t > LOVES && t < SHOW + 0.6;
  const conTarro = t < CAP - 0.3;
  const hr4 = R.actor(JH.haymitch, x, 152, t, { dir: t > CAP - 0.3 && t < LOVES ? -1 : -1, anda: u > 0 && u < 1, sostiene: conTarro ? [x - 3, 128] : undefined, dedo: t > CAP - 0.3 && t < LOVES, brazos: brinca || t > SHOW + 0.6, salto: brinca ? Math.round(Math.abs(Math.sin((t - LOVES) * 7)) * 3) : 0, sonrisa: t > LOVES - 0.4, habla: t < CAP - 0.3 && Math.sin(t * 10) > 0 });
  if (conTarro) tarro(hr4.mano[0], hr4.mano[1]);
  R.actor(JH.caesar, 112, 150, t, { dir: 1, habla: t > P4 && t < P4 + 1.2 && Math.sin(t * 9) > 0, sonrisa: true, brazos: t > LOVES && Math.floor(t * 4) % 2 === 0 });
  if (t > LOVES - 0.1) confeti(t, LOVES - 0.1);
  T.AT.luciernaga(R, 256 + Math.sin(t * 1.2) * 6, 124 + Math.sin(t * 2.5) * 3, t, { extra: true, dir: -1, cara: t > SHOW ? 'guino' : 'sonrisa', brillo: 0.9 });
};

// ── 5. el invernadero: llega Plutarch ──
const UP = @B(24.16), PLUT = @B(25.86);
const tarde = (t) => T.tinte(R, 16, 179, [255, 140, 60], 0.26);
const p5 = (t) => {
  T.capitolio(R, t, { encuadre: 'invernadero' }); tarde(t);
  const u = tramo(t, P5 + 0.1, P5 + 1.7), xh = Math.round(lerp(70, 124, u)), gira = t > UP + 0.5;
  R.actor(JH.haymitch, xh, 160, t, { dir: gira ? 1 : 1, anda: u > 0 && u < 1, triste: !gira, sorpresa: gira && t < PLUT, sonrisa: t > PLUT + 0.6 });
  const v = tramo(t, UP - 0.1, PLUT - 0.2), xp = Math.round(lerp(330, 188, v)), dp = -1;
  const pr = R.actor(JH.plutarch, xp, 160, t, { dir: dp, anda: v > 0 && v < 1, sostiene: [xp - 4, 151], sonrisa: t > PLUT, habla: t > PLUT - 0.2 && t < PLUT + 0.6 && Math.sin(t * 10) > 0 });
  const [lx, ly] = camara(pr.mano[0], pr.mano[1], dp, t, t > PLUT);
  destello(lx - 1, ly, tramo(t, PLUT + 0.4, PLUT + 0.75));
  T.AT.luciernaga(R, lerp(250, 214, tramo(t, UP, PLUT)) + Math.sin(t * 1.1) * 4, 100 + Math.sin(t * 2.2) * 3, t, { extra: true, dir: -1, cara: t > PLUT ? 'guino' : t > UP ? 'sorpresa' : 'normal', brillo: 0.85 });
};

// ── 6. el museo: el futuro Vigilante Jefe, hoy cámara ──
// los tres cuadros del museo: la cúpula de la arena, el retrato tapado del futuro Vigilante Jefe y la cornucopia
const cuadroCupula = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x + y) % 2 ? hex('#1a2a4a') : hex('#1e3054'));
  const cx = (x0 + x1) >> 1, by = y1 - 12;
  for (let y = by; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x * 3 + y) % 5 ? hex('#4a9a3a') : hex('#3a7a2e'));
  R.poligono([[cx - 14, by], [cx - 2, by - 22], [cx + 10, by]], hex('#8a96b8')); R.poligono([[cx - 6, by - 14], [cx - 2, by - 22], [cx + 2, by - 14]], hex('#f6f8fc'));
  for (let a = 0; a <= Math.PI; a += 0.03) R.pset(Math.round(cx - Math.cos(a) * 30), Math.round(by - Math.sin(a) * 34), Math.floor(a * 30 + t * 6) % 3 ? hex('#8ad8ff') : hex('#e8fbff'));
  for (let k = 0; k < 6; k++) R.pset(cx - 20 + k * 8, by + 4 + (k % 2) * 3, Math.sin(t * 3 + k) > 0 ? hex('#ffd84a') : hex('#c89a2a'));
};
const cuadroCuerno = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x + y) % 2 ? hex('#3a1a3a') : hex('#421e44'));
  const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1;
  R.poligono([[cx - 22, cy + 10], [cx + 14, cy - 12], [cx + 20, cy + 14]], K.oroS); R.poligono([[cx - 20, cy + 9], [cx + 13, cy - 10], [cx + 17, cy + 11]], K.oro);
  for (let k = 0; k < 4; k++) R.linea(cx - 14 + k * 8, cy + 8 - k * 4, cx - 10 + k * 8, cy + 13 - k * 2, hex('#fff2a8'));
  for (const [dx, dy, c] of [[-26, 16, '#e84a4a'], [-18, 20, '#f0a030'], [-30, 22, '#8ad84a'], [-22, 24, '#f6f4f0']]) R.disco(cx + dx, cy + dy, 3, hex(c));
};
const HEAD = @B(29.42), NOW = @B(30.98), CAM = @B(32.08);
const cuadroFuturo = (R, t, [x0, y0, x1, y1]) => {
  // el fondo: la sala de control en azul, con la maqueta, y la silueta del Vigilante Jefe (túnica morada con oro, sin cara)
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0) % 10 === 0 || (y - y0) % 10 === 0 ? hex('#22305a') : (x + y) % 2 ? hex('#141c3a') : hex('#18203e'));
  const cx = (x0 + x1) >> 1, by = y1;
  for (let a = 0; a <= Math.PI; a += 0.05) R.pset(Math.round(cx + 20 - Math.cos(a) * 12), Math.round(y0 + 40 - Math.sin(a) * 12), hex('#8ad8ff'));
  R.poligono([[cx - 18, by], [cx - 13, by - 40], [cx + 13, by - 40], [cx + 18, by]], hex('#6a3a9a'));
  R.poligono([[cx - 12, by - 40], [cx, by - 30], [cx + 12, by - 40]], K.oro); R.linea(cx, by - 30, cx, by, K.oro); R.linea(cx - 18, by - 1, cx + 18, by - 1, K.oro);
  R.disco(cx, by - 48, 8, hex('#0e0a18')); R.disco(cx - 2, by - 50, 3, hex('#2a2238'));
  // el paño que lo tapaba: cae en «head gamemaker»
  const c = tramo(t, HEAD - 0.2, HEAD + 0.5), yc = Math.round(y0 + (y1 - y0 + 4) * c);
  for (let y = yc; y <= y1; y++) for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 0.6 + (y - yc) * 0.08); R.pset(x, y, y === yc ? hex('#d8b850') : pl > 0.5 ? hex('#a0283a') : pl > -0.3 ? hex('#821c2e') : hex('#5e1222')); }
};
const p6 = (t) => {
  T.capitolio(R, t, { encuadre: 'museo', cuadros: [cuadroCupula, cuadroFuturo, cuadroCuerno] });
  const u = tramo(t, P6 + 0.1, P6 + 1.6), xp = Math.round(lerp(20, 92, u)), mira = t > HEAD - 0.1 && t < NOW + 0.3;
  const dp = 1;
  const pr = R.actor(JH.plutarch, xp, 162, t, { dir: dp, anda: u > 0 && u < 1, sostiene: [xp + (dp > 0 ? 18 : -3), 150], sorpresa: mira && t < HEAD + 0.6, sonrisa: (mira && t > HEAD + 0.6) || t > CAM, habla: t > NOW + 0.3 && t < CAM - 0.4 && Math.sin(t * 10) > 0 });
  const [lx, ly] = camara(pr.mano[0], pr.mano[1], dp, t, true);
  destello(lx, ly, tramo(t, CAM, CAM + 0.35));
  const an = tramo(t, HEAD + 0.2, HEAD + 0.9);
  if (an > 0) { T.AT.anillo(R, 160, 78, 44, 42, t, an); if (an > 0.6) R.icono('corona', 152, 22 + (Math.floor(t * 3) % 2) + 6, K.oro, K.k, 2); }
  // un visitante del Capitolio que pasa por detrás y se para a mirar
  const vv = tramo(t, P6 + 0.5, CAM + 0.6), xv = Math.round(lerp(300, 200, vv));
  R.actor(JH.capitolino1, xv, 160, t, { dir: -1, anda: vv > 0 && vv < 1 && !(t > HEAD && t < NOW), sorpresa: t > HEAD + 0.3 && t < NOW });
  T.AT.luciernaga(R, lerp(130, 208, tramo(t, HEAD - 0.5, HEAD + 0.3)) + Math.sin(t * 1.3) * 3, 100 + Math.sin(t * 2.1) * 3, t, { extra: true, dir: -1, cara: mira ? 'sorpresa' : t > CAM ? 'guino' : 'normal', brillo: 0.85 });
};

// ── 7. las rosas: el plano doblado ──
const SECR = @B(33.48), PASS = @B(34.02), INFO = @B(35.28), BUILT = @B(37.18), GETS = @B(38.02);
const planoArena = (t, u) => {
  if (u <= 0) return; const X0 = 96, X1 = 224, Y0 = 26, Y1 = 94, cy = (Y0 + Y1) >> 1, hh = Math.round((Y1 - Y0) / 2 * u), y0 = cy - hh, y1 = cy + hh;
  R.rect(X0 - 1, y0 - 1, X1 + 1, y1 + 1, K.k); R.recorte([X0, y0, X1, y1]);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, (x - X0) % 8 === 0 || (y - Y0) % 8 === 0 ? hex('#3a6aaa') : (x + y) % 2 ? hex('#2a5a9a') : hex('#2c5ea0'));
  for (let y = Y0; y <= Y1; y++) { R.pset(160, y, hex('#1e4a80')); R.pset(161, y, hex('#5a8ac8')); } for (let x = X0; x <= X1; x++) { R.pset(x, 60, hex('#1e4a80')); R.pset(x, 61, hex('#5a8ac8')); }
  const W = hex('#e8f0ff'), Wd = hex('#a8c0e8');
  R.linea(104, 86, 216, 86, W);   // el suelo de la arena
  for (let a = 0; a <= Math.PI; a += 0.02) R.pset(Math.round(160 - Math.cos(a) * 56), Math.round(86 - Math.sin(a) * 52), (a * 40 | 0) % 2 ? W : Wd);   // la cúpula
  R.linea(122, 86, 140, 56, W); R.linea(140, 56, 156, 86, W); R.linea(134, 66, 146, 66, Wd);   // la montaña
  for (const tx of [112, 118, 170, 176]) { R.linea(tx, 86, tx + 3, 78, W); R.linea(tx + 3, 78, tx + 6, 86, W); }   // abetos
  R.anillo(150, 82, 4, W); R.rect(126, 78, 132, 85, K.k); R.recorte([X0, y0, X1, y1]);
  for (let y = 78; y <= 85; y++) for (let x = 126; x <= 132; x++) R.pset(x, y, y === 78 || x === 126 || x === 132 ? W : hex('#2a5a9a'));   // el depósito
  // el borde: el precipicio y el campo de fuerza (punteado)
  R.linea(196, 86, 198, 74, W); R.linea(198, 74, 196, 66, W); R.linea(196, 66, 199, 58, W);
  for (let y = 40; y < 86; y += 3) R.pset(202, y, hex('#8ae8ff'));
  if (t > BUILT - 0.1) { T.AT.anillo(R, 200, 68, 10, 18, t, tramo(t, BUILT - 0.1, BUILT + 0.5)); if (Math.floor(t * 5) % 2) R.icono('!', 208, 40, hex('#ffd84a'), K.k, 2); }
  R.recorte(null);
};
const p7 = (t) => {
  const o = { encuadre: 'invernadero', camara: 'rosas' };
  T.capitolio(R, t, o); tarde(t);
  const deja = t > SECR + 0.5, pasa = t > PASS + 0.55, info = tramo(t, INFO - 0.1, INFO + 0.4) - tramo(t, GETS - 0.2, GETS + 0.2);
  if (deja) camara(206, 112, 1, t, false);   // la cámara, dejada en el banco
  const mirar = t > SECR && t < PASS ? (Math.floor((t - SECR) * 3) % 2 ? 1 : -1) : -1;
  const da = t > PASS && t < PASS + 0.7, daFicha = t > GETS && t < GETS + 1.2;
  const pr = R.actor(JH.plutarch, 172, 162, t, { dir: t < SECR ? 1 : mirar, sostiene: !deja ? [190, 151] : da ? [158, 148] : daFicha ? [160, 146] : undefined, sorpresa: t > SECR && t < PASS, sonrisa: t > GETS, habla: t > INFO && t < BUILT && Math.sin(t * 9) > 0 });
  if (!deja) camara(pr.mano[0], pr.mano[1], 1, t, true);
  if (da && !pasa) papel(pr.mano[0], pr.mano[1]);
  if (daFicha) ficha(pr.mano[0], pr.mano[1], t);
  const coge = t > PASS + 0.3, lee = t > INFO - 0.2;
  const hr = R.actor(JH.haymitch, 126, 162, t, { dir: 1, sostiene: coge ? (lee ? [146, 141] : [154, 148]) : undefined, sorpresa: t > BUILT && t < BUILT + 0.7, sonrisa: t > GETS + 0.5, triste: t < PASS });
  if (pasa) papel(hr.mano[0], hr.mano[1], lee);
  T.capitolioDelante(R, t, o);
  if (info > 0) { planoArena(t, info); if (info > 0.9) R.poligono([[146, 95], [156, 95], [hr.mano[0], hr.mano[1] - 10]], K.papel); }
  T.AT.luciernaga(R, 238 + Math.sin(t * 1.2) * 4, 64 + Math.sin(t * 2.2) * 3, t, { extra: true, dir: -1, cara: t > BUILT ? 'sorpresa' : t > SECR ? 'guino' : 'normal', brillo: 0.85 });
};

// ── 8. la llamada: pantalla partida ──
const LAST = @B(41.10), BYE = @B(42.56), LENORE = @B(43.46);
const bA = R.nuevo(), bB = R.nuevo(), OFF = 60;
const p8 = (t) => {
  const prev = R.usar(bA);
  const oa = { encuadre: 'tele', lampara: true, pantalla: 'apagada' };
  T.interior(R, t, oa);
  telefono(196, 138);
  const colgado = t > E.duracion - 0.75;
  const hr = R.actor(JH.haymitch, 160, 156, t, { dir: 1, sostiene: colgado ? undefined : [178, 134], habla: t > P8 + 0.3 && t < BYE && Math.sin(t * 9) > 0, triste: t > BYE - 0.3, quieto: false });
  if (!colgado) auricular(hr.mano[0], hr.mano[1], 196, 132, t);
  else { R.rect(188, 128, 204, 131, K.k); R.rect(189, 129, 203, 130, hex('#3a3a44')); }   // el auricular, ya colgado
  T.interiorDelante(R, t, oa);
  R.usar(bB);
  const ob = { encuadre: 'prado', camara: 'cerca', luz: 'tarde', ocas: 3 };
  T.prado(R, t, ob);
  // el teléfono de la cerca: un poste con su caja
  R.rect(272, 118, 275, 172, K.k); R.rect(273, 119, 274, 172, hex('#7a5a3a')); R.rect(266, 120, 282, 136, K.k); R.rect(267, 121, 281, 135, hex('#6a4a2a')); R.rect(267, 121, 281, 121, hex('#8a6a4a'));
  R.disco(274, 127, 2.5, hex('#d8d0bc')); R.pset(274, 127, K.k); R.rect(270, 133, 278, 134, hex('#3a2a1a'));
  const lr = R.actor(JH.lenore, 236, 172, t, { dir: -1, sostiene: [235, 150], habla: t > BYE && t < LENORE + 0.6 && Math.sin(t * 9) > 0, triste: t > BYE - 0.3, sonrisa: t > LENORE + 0.2 });
  auricular(lr.mano[0], lr.mano[1], 268, 132, t);
  const ox = Math.round(lerp(300, 262, tramo(t, LENORE - 0.4, LENORE + 0.8)));
  T.a_oca(R, ox, 174, t, { dir: -1, modo: t > LENORE + 0.8 ? 'estira' : 'camina', k: 2 });
  T.pradoDelante(R, t, ob);
  R.usar(prev);
  const d = R.buf;
  for (let y = 0; y < 180; y++) { const f = y * 320; for (let x = 0; x < 158; x++) d[f + x] = bA[f + x + OFF]; for (let x = 162; x < 320; x++) d[f + x] = bB[f + x]; }
  R.rect(158, 0, 161, 179, K.k); R.rect(159, 0, 160, 179, hex('#d8c8a0'));
  // las ondas: él habla primero; ella, desde «goodbye»
  const yo = t < BYE;
  if (yo && t > P8 + 0.3) ondas(hr.mano[0] - OFF + 4, hr.mano[1] - 4, 1, t); else if (!yo) ondas(lr.mano[0] - 4, lr.mano[1] - 4, -1, t);
  const cuelga = tramo(t, E.duracion - 0.6, E.duracion - 0.2);
  T.AT.luciernaga(R, 132 + Math.sin(t * 1.1) * 3, lerp(48, 58, (Math.sin(t * 0.9) + 1) / 2), t, { extra: true, dir: yo ? 1 : -1, cara: t > BYE ? 'triste' : 'normal', brillo: 0.6 - 0.3 * cuelga });
};

const efectos = [[ONE, 'sello'], [ISNT + 0.15, 'whoosh'], [WATER + 0.1, 'burbujas'], [P3 + 0.6, 'palmada'], [RASCAL + 0.4, 'publico'], [MOON + 0.1, 'publico'],
  [LOVES, 'publico'], [PLUT + 0.45, 'flash'], [HEAD, 'whoosh'], [CAM, 'flash'], [PASS + 0.5, 'papel'], [GETS + 0.2, 'pop'],
  [P8 + 0.1, 'ring'], [E.duracion - 0.5, 'cuelga']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: 50 });
'''))
