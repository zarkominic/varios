E = {}

# ayudas comunes a las tres escenas (cada escena es un .html suelto: se copian en cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// resplandor: mezcla un disco con un color, en escalones con trama (pixel art), más fuerte en el centro
const luz = (cx, cy, r, col, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || y < 0 || x > 319 || y > 179) continue;
    const lv = a * (1 - d) ** 1.3 * 6; let l = Math.floor(lv); if (lv - l > (((x & 1) * 2 + (y & 1) * 3) % 4 + 0.5) / 4) l++; if (l <= 0) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, l / 6))); } };
// el bocadillo redondeado con su rabito (x, y: la punta del rabito); devuelve el centro
const bocadillo = (x, y, w = 10, h = 18) => { x = Math.round(x); y = Math.round(y); const x0 = x - w, x1 = x + w, y1 = y - 4, y0 = y1 - h;
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#d0d0dc'));
  for (let k = 0; k < 4; k++) { R.pset(x - 1 + (k >> 1), y1 + k, K); R.pset(x + (k >> 1), y1 + k, k < 3 ? BL : K); R.pset(x + 1 + (k >> 1), y1 + k, K); }
  return [x, Math.round((y0 + y1) / 2)]; };
const globo = (x, y, ic, col = K) => { const [cx, cy] = bocadillo(x, y); R.icono(ic, cx - 5, cy - 7, col, hex('#c8c8d0'), 2); };
// una estrellita de brillo (cruz de 5 px)
const chispa = (x, y, c = hex('#fff6c8')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, BL); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x + 2, y, hex('#e8c060')); R.pset(x - 2, y, hex('#e8c060')); R.pset(x, y + 2, hex('#e8c060')); R.pset(x, y - 2, hex('#e8c060')); };
// anillo de chispas que se abre (u 0–1)
const destello = (x, y, u, r0 = 4, r1 = 18, c = hex('#fff2b0')) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u;
  for (let k = 0; k < 16; k++) { if ((k + Math.floor(u * 5)) % 3 === 0) continue; const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.85), u < 0.6 ? c : hex('#e8c060')); } };
// una capa fija de toda la pantalla, pintada una vez en un búfer (clave) y copiada en cada fotograma
const capa = (clave, dibuja) => { const m = R._s9 ?? (R._s9 = new Map()); let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); } return b; };
const pegar = (b) => R.copiar(b);
// la silueta de una silla de director (x: centro, y: suelo; s: escala; lona y pictograma)
const sillaDir = (x, y, s = 1, lona = hex('#1e1e26'), pic = null, t = 0) => { x = Math.round(x); y = Math.round(y);
  const M = hex('#a8763a'), m = hex('#6a4420'), Ml = hex('#d8a060'), w = Math.round(8 * s), hA = Math.round(12 * s), hR = Math.round(10 * s);
  // patas en X
  R.linea(x - w, y, x + w, y - hA + 2, m); R.linea(x + w, y, x - w, y - hA + 2, M); R.linea(x - w + 1, y, x + w + 1, y - hA + 2, Ml);
  // montantes y reposabrazos
  for (const sx of [-w, w]) { R.rect(x + sx - 1, y - hA - hR, x + sx, y, sx < 0 ? M : m); R.pset(x + sx - 1, y - hA - hR, Ml); }
  R.rect(x - w - 1, y - hA - 1, x + w + 1, y - hA, M); R.rect(x - w - 1, y - hA - 1, x + w + 1, y - hA - 1, Ml);
  // asiento de lona
  R.rect(x - w + 1, y - hA + 1, x + w - 1, y - hA + 2, lona);
  // respaldo de lona con pliegue y su pictograma
  const y0 = y - hA - hR, y1 = y0 + Math.round(6 * s);
  R.rect(x - w, y0, x + w, y1, lona); R.rect(x - w, y1, x + w, y1, mez(lona, K, 0.5)); R.rect(x - w, y0, x + w, y0, mez(lona, BL, 0.25));
  if (pic) pic(x, Math.round((y0 + y1) / 2));
};
// la telaraña de un disparo: línea blanca con su sombra
const tela = (x0, y0, x1, y1) => { R.linea(Math.round(x0), Math.round(y0) + 1, Math.round(x1), Math.round(y1) + 1, hex('#8a90a8')); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), hex('#f4f6ff')); };
// Spider-Man colgado de su telaraña (ancla ax, ay; largo L; ángulo th, 0 = vertical): la mano arriba
const columpio = (ax, ay, L, th, t, dir = 1) => { const hx = ax + L * Math.sin(th), hy = ay + L * Math.cos(th);
  const x = Math.round(dir > 0 ? hx - 15 : hx), suelo = Math.round(hy + 29);
  R.actor(EL.spiderman, x, suelo, t, { dir, dedo: true, quieto: true }); tela(ax, ay, dir > 0 ? x + 14 : x + 1, suelo - 28); return [hx, hy]; };
'''

# ══════════════════════════════════════════════════════════════════════════════════════
E['do-bnd'] = ('Brand New Day', '''// DO-BND (frases 54–55), 2026, cartela «2026». Cinco planos:
// 1. «ny hoy capas tarde» (decorado del 15, la calle de Nueva York de hoy al atardecer): Spider-Man entra columpiándose
//    desde la izquierda, pasa rozando la calle entre los taxis y en «Spider-Man» cruza el centro; suelta la telaraña y
//    aterriza en la acera; dos paseantes lo señalan. Corta en «with».
// 2. «ny hoy muelle tarde» (decorado del 15): un ladrón le quita el bolso a una turista y corre; Spider-Man baja colgado de
//    su telaraña en «protecting», le dispara una telaraña y lo deja pegado a la papelera; le devuelve el bolso y, en
//    «forgot him», a ella le sale un «?»: no sabe quién es; él agacha la cabeza. Corta en «and».
// 3. «mundo nyhoy general» (la azotea al atardecer): Spider-Man aterriza en la azotea y mira la valla, donde la entrada y
//    la flecha de la taquilla suben en «biggest opening weekend»; en «ever» salta con los brazos arriba. Corta en «and».
// 4. «mundo nyhoy taquilla» (la fachada del cine): la cola de fans avanza hacia las puertas; en «re-release of Endgame» el
//    cartel del guante destella; en «back on top» baja la corona dorada y los fans levantan los brazos. Corta en «The».
// 5. fondo local: el mostrador de la taquilla de cerca: una balanza de latón con monedas y el guante en un platillo; en
//    «highest grossing» le caen monedas hasta igualar; en «$2 million» cae una moneda con el 2 y el platillo del guante
//    baja; las palomitas saltan de alegría y la corona se posa en el guante.''', AY + r'''
import * as NY from '/atomo/plato/escenas/ny-comun.js';
const s = (f) => en('spiderman', f), n = (f) => en('encore', f);
const P2 = s(0.328), P3 = s(0.711), P4 = n(0), P5 = n(0.584);
const nombre = s(0.125), protege = s(0.363), olvidan = s(0.623), taquilla = s(0.746), nunca = s(0.857);
const endgame = n(0.176), arriba = n(0.455), dos = n(0.822);

// 1 · la calle al atardecer: el columpio entre las torres
const p1 = (t) => {
  NY.hoy(R, t, { encuadre: 'capas', luz: 'tarde', encender: 0.35 + 0.3 * tramo(t, 0, P2) });
  // los paseantes de la acera: la vecina con la bolsa de la compra y el chico; miran arriba y señalan cuando pasa
  const v = tramo(t, 0.2, 2.6), mira = t > nombre - 0.2;
  R.actor(EL.neoyorquina, Math.round(lerp(330, 236, v)), 152, t, { dir: -1, anda: v > 0 && v < 1, dedo: mira && t < nombre + 1.6, sorpresa: mira && t < nombre + 0.8, sonrisa: t > nombre + 0.8 });
  R.actor(EL.chico, 58, 152, t, { dir: 1, dedo: mira, sonrisa: mira, salto: mira && t < nombre + 1.2 ? Math.round(Math.abs(Math.sin((t - nombre) * 8)) * 3) : 0 });
  // el columpio en dos tirones: entra por la izquierda colgado de la casa de ladrillo, se suelta, engancha la torre art
  // déco y pasa por delante de su fachada clara en «Spider-Man»; suelta y cae a la acera
  const L = 82, suelta = nombre + 1.1;
  if (t > 0.9 && t < 2.3) columpio(70, 18, 70, lerp(-1.5, 0.95, (t - 0.9) / 1.4), t, 1);
  else if (t >= 2.3 && t < 2.4) { const u = (t - 2.3) / 0.1; R.actor(EL.spiderman, Math.round(lerp(112, 109, u)), Math.round(lerp(87, 89, u)), t, { dir: 1, brazos: true, quieto: true }); }
  else if (t >= 2.4 && t < suelta) columpio(196, 20, L, lerp(-1.05, 0.9, tramo(t, 2.4, suelta)), t, 1);
  if (t >= suelta) { const u = tramo(t, suelta, suelta + 0.8), x0 = 196 + L * Math.sin(0.9), y0 = 20 + L * Math.cos(0.9) + 29;
    const x = Math.round(lerp(x0 - 15, 262, u)), su = Math.round(lerp(y0, 152, u) - Math.sin(u * Math.PI) * 26);
    const posa = u >= 1; R.actor(EL.spiderman, x, posa ? 152 : su, t, { dir: posa ? -1 : 1, brazos: !posa, dedo: posa && t > suelta + 1.2, quieto: !posa });
    if (posa && t < suelta + 1.2) destello(x + 7, 152, tramo(t, suelta + 0.8, suelta + 1.2), 3, 12, hex('#f4f6ff')); }
};
// 2 · el muelle: el bolso, la telaraña y el «?»
const p2 = (t) => {
  NY.hoy(R, t, { encuadre: 'muelle', luz: 'tarde' });
  const roba = P2 + 0.3, pega = protege + 0.75, vuelve = olvidan - 1.3;
  // el ladrón: viene por la derecha, coge el bolso y huye a la izquierda; queda pegado a la papelera
  const lx = t < roba ? Math.round(lerp(300, 196, tramo(t, P2 - 0.1, roba))) : Math.round(lerp(196, 34, tramo(t, roba, pega)));
  const pegado = t >= pega;
  R.actor(EL.ladron, pegado ? 30 : lx, 162, t, { dir: t < roba ? -1 : -1, anda: !pegado, sorpresa: pegado, sostiene: t > roba && t < vuelve - 0.6 ? true : undefined });
  if (pegado) { // la telaraña que lo sujeta a la papelera
    for (let k = 0; k < 6; k++) { const yy = 140 + k * 4; R.linea(24, yy, 50, yy + (k % 2 ? 2 : -2), hex('#f4f6ff')); }
    R.linea(26, 136, 48, 160, hex('#c8ccdc')); R.linea(48, 136, 26, 160, hex('#c8ccdc')); }
  // el bolso: en el brazo de la turista, luego en la mano del ladrón, luego en la de Spider-Man y de vuelta
  const bolso = (x, y) => { R.rect(x - 3, y - 2, x + 3, y + 3, K); R.rect(x - 2, y - 1, x + 2, y + 2, hex('#c83a6a')); R.pset(x - 1, y - 1, hex('#f07aa0')); R.linea(x - 2, y - 3, x + 2, y - 3, K); };
  // la turista con la cámara: hace fotos al perfil; se lleva el susto y luego no sabe quién es él
  const tu = R.actor(EL.turista, 196, 162, t, { dir: -1, sorpresa: t > roba && t < vuelve, sonrisa: t > vuelve + 0.4 && t < olvidan, sostiene: t > vuelve ? true : undefined });
  if (t < roba) bolso(207, 150);
  // Spider-Man: baja colgado de la telaraña desde arriba, dispara y aterriza; recoge el bolso y se lo lleva
  const baja = tramo(t, protege - 0.5, protege + 0.2);
  if (t < protege + 0.2) { if (t > protege - 0.5) { const y = Math.round(lerp(10, 118, baja)); R.actor(EL.spiderman, 120, y + 28, t, { dir: -1, dedo: true, quieto: true }); tela(128, 15, 121, y + 2); } }
  else { const camina = tramo(t, pega + 0.4, vuelve - 0.2), x = Math.round(lerp(120, 178, camina));
    const sm = R.actor(EL.spiderman, t < pega + 0.3 ? 120 : x, 162, t, { dir: t < pega + 0.4 ? -1 : 1, dedo: t < pega && t > protege + 0.3, anda: camina > 0 && camina < 1, sostiene: t > pega + 0.3 && t < vuelve ? true : undefined, triste: t > olvidan + 0.2 });
    if (t > protege + 0.3 && t < pega) tela(118, 146, lerp(118, 40, tramo(t, protege + 0.3, pega)), lerp(146, 150, tramo(t, protege + 0.3, pega)));
    if (t > pega + 0.3 && t < vuelve) bolso(sm.mano[0], sm.mano[1] + 2); }
  if (t > roba && t < pega + 0.3) { const ld = Math.round(pegado ? 30 : lx); bolso(ld + 1, 152); }
  if (t > vuelve) bolso(tu.mano[0], tu.mano[1] + 2);
  if (t > olvidan) globo(204, 128, '?');
};
// 3 · la azotea: la flecha de la taquilla sube en la valla
const p3 = (t) => {
  T.mundo(R, t, { encuadre: 'nyhoy', flecha: tramo(t, taquilla, s(0.938)) });
  // llega de un salto desde la derecha y mira la valla
  const u = tramo(t, P3, P3 + 0.8), x = Math.round(lerp(300, 168, u)), alto = Math.round(Math.sin(u * Math.PI) * 30);
  const brinca = t > nunca && t < nunca + 1.1 ? Math.round(Math.abs(Math.sin((t - nunca) * 6)) * 9) : 0;
  R.actor(EL.spiderman, x, 164, t, { dir: -1, salto: u < 1 ? alto : brinca, brazos: (u < 1 && u > 0) || brinca > 0, dedo: u >= 1 && t > taquilla && t < nunca, quieto: u < 1 });
  if (brinca > 0) for (let k = 0; k < 5; k++) chispa(176 + Math.cos(k * 1.3 + t * 4) * 16, 128 + Math.sin(k * 1.3 + t * 4) * 9);
  // el vecino de la azotea de al lado riega las plantas y mira también
  R.actor(EL.vecino, 104, 164, t, { dir: 1, sostiene: true, sorpresa: t > nunca && t < nunca + 1, sonrisa: t > nunca + 1 });
  if (t < nunca) for (let k = 0; k < 3; k++) { const yy = 148 + ((t * 30 + k * 4) % 12); R.pset(122 + k, Math.round(yy), hex('#8ac8f0')); }
  R.rect(117, 145, 123, 149, hex('#3a8a5a')); R.rect(118, 146, 122, 148, hex('#5aba7a')); R.pset(124, 146, hex('#3a8a5a'));
};
// 4 · la taquilla: la cola, el guante y la corona
const p4 = (t) => {
  T.mundo(R, t, { encuadre: 'nyhoy', camara: 'taquilla', corona: tramo(t, arriba - 0.2, arriba + 0.7), flecha: 0.6 });
  // la cola avanza hacia las puertas; el primero entra
  const fans = [EL.fanArana, EL.fanCapa, EL.neoyorquina, EL.fanCuernos, EL.chico, EL.neoyorquino];
  const av = tramo(t, P4 + 0.2, arriba - 0.4) * 34, viva = t > arriba + 0.5;
  fans.forEach((f, i) => { const x = Math.round(150 + i * 26 - av + (i === 0 ? -tramo(t, P4 + 0.2, endgame) * 10 : 0));
    if (i === 0 && t > endgame + 0.4) return;   // ya entró
    R.actor(f, x, 160, t, { dir: -1, anda: !viva && Math.floor(t * 2 + i) % 3 === 0 && t < arriba, brazos: viva && (i % 2 === 0 || t > arriba + 1), sonrisa: viva, sorpresa: t > endgame && t < endgame + 1 && i < 3 }); });
  // el cartel del guante destella cuando la voz dice Endgame
  const d = tramo(t, endgame, endgame + 1); if (d > 0 && d < 1) { destello(58, 102, d, 6, 30); luz(58, 102, 22, hex('#fff2b0'), 0.5 * (1 - d)); }
  if (t > arriba + 0.6) for (let k = 0; k < 4; k++) chispa(58 + Math.cos(t * 3 + k * 1.6) * 18, 64 + Math.sin(t * 3 + k * 1.6) * 6);
};
// 5 · fondo local: el mostrador de la taquilla con la balanza
const fondo5 = () => capa('mostrador', () => {
  // la pared del vestíbulo: terciopelo rojo con pliegues y listones dorados; arriba a la derecha, tranquila
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const pl = Math.sin(x * 0.55) * 0.5 + 0.5, tq = x > 270 && y < 50;
    let c = pl > 0.75 ? hex('#a82a3a') : pl > 0.3 ? hex('#8a1e2e') : hex('#6a1624'); if (tq) c = y < 30 ? hex('#7a1a2a') : hex('#8a1e2e');
    if (!tq && hh(x >> 1, y >> 1, 3) < 0.06) c = mez(c, K, 0.3); R.pset(x, y, c); }
  for (const lx of [30, 120, 210]) { R.rect(lx, 18, lx + 2, 117, hex('#c89a3a')); R.rect(lx, 18, lx, 117, hex('#f0d070')); R.rect(lx + 2, 18, lx + 2, 117, hex('#8a6420')); R.rect(lx - 2, 16, lx + 4, 18, hex('#c89a3a')); }
  R.rect(0, 112, 319, 117, hex('#c89a3a')); R.rect(0, 112, 319, 112, hex('#f0d070')); R.rect(0, 117, 319, 117, hex('#6a4a18'));
  // dos apliques art déco (abanicos de luz)
  for (const ax of [26, 116, 204]) { R.poligono([[ax - 9, 40], [ax + 9, 40], [ax + 4, 52], [ax - 4, 52]], hex('#f0d070')); R.rect(ax - 4, 52, ax + 4, 54, hex('#c89a3a'));
    for (let k = -2; k <= 2; k++) R.linea(ax, 52, ax + k * 4, 41, hex('#c89a3a')); }
  // el mostrador de madera oscura con vetas y la barra de latón
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.4 + x * 0.01) * 2 + y * 0.9);
    R.pset(x, y, y < 126 ? (y === 118 ? hex('#a8703a') : hex('#7a4a22')) : v > 0.85 ? hex('#5a3418') : v < -0.8 ? hex('#3a2010') : hex('#4a2a14')); }
  R.rect(0, 124, 319, 126, hex('#c89a3a')); R.rect(0, 124, 319, 124, hex('#f8e090')); R.rect(0, 127, 319, 127, hex('#2a1608'));
  // el frente del mostrador: cuarterones en relieve con su bisel de luz y sombra, y el zócalo de latón con tachuelas
  for (let x = 4; x < 320; x += 52) { R.rect(x, 136, x + 44, 168, hex('#2a1608')); R.rect(x + 1, 137, x + 43, 167, hex('#5a3418')); R.rect(x + 1, 137, x + 43, 137, hex('#8a5a30')); R.rect(x + 1, 137, x + 1, 167, hex('#7a4a26'));
    R.rect(x + 6, 142, x + 38, 162, hex('#3a2010')); R.rect(x + 7, 143, x + 37, 161, hex('#4e2c14')); R.rect(x + 7, 161, x + 37, 161, hex('#7a4a26')); R.rect(x + 37, 143, x + 37, 161, hex('#7a4a26')); R.disco(x + 22, 152, 3, hex('#c89a3a')); R.pset(x + 21, 151, hex('#f8e090')); }
  R.rect(0, 171, 319, 179, hex('#8a6420')); R.rect(0, 171, 319, 171, hex('#f0d070')); for (let x = 6; x < 320; x += 12) R.pset(x, 175, hex('#f8e090'));
  // la caja registradora de latón (izquierda), estrecha
  R.rect(4, 74, 50, 118, K); R.rect(5, 75, 49, 117, hex('#c89a3a')); R.rect(5, 75, 49, 76, hex('#f0d070')); R.rect(8, 62, 38, 76, K); R.rect(9, 63, 37, 75, hex('#2a2a2a')); R.rect(11, 66, 30, 70, hex('#3a5a3a'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { R.rect(8 + i * 10, 81 + j * 9, 14 + i * 10, 86 + j * 9, K); R.rect(9 + i * 10, 82 + j * 9, 13 + i * 10, 85 + j * 9, hex('#f2eee2')); }
  R.rect(5, 110, 49, 117, hex('#8a6420')); R.rect(22, 112, 30, 113, hex('#f0d070'));
  // un taco de entradas y la bandeja de monedas (entre la caja y la balanza)
  for (let k = 0; k < 5; k++) { R.rect(112 + k, 108 - k * 2, 132 + k, 111 - k * 2, K); R.rect(113 + k, 109 - k * 2, 131 + k, 110 - k * 2, k % 2 ? hex('#e8d8b0') : hex('#f2e4c0')); }
  R.rect(116, 100, 118, 101, hex('#c83a3a'));
  R.rect(56, 112, 92, 118, K); R.rect(57, 113, 91, 117, hex('#6a4a2a')); for (let k = 0; k < 6; k++) { R.disco(62 + k * 5, 115, 2, hex('#f0c030')); R.pset(61 + k * 5, 114, hex('#fff6c8')); }
});
const corona = (x, y) => { R.rect(x - 9, y - 1, x + 9, y + 4, K); R.rect(x - 8, y, x + 8, y + 3, hex('#f0c030')); R.rect(x - 8, y + 3, x + 8, y + 3, hex('#a8781a')); for (const i of [-8, -3, 3, 8]) { R.rect(x + i - 1, y - 6, x + i + 1, y - 1, K); R.pset(x + i, y - 5, hex('#f8e070')); R.pset(x + i, y - 4, hex('#f0c030')); R.pset(x + i, y - 3, hex('#f0c030')); R.pset(x + i, y - 2, hex('#f0c030')); }
  R.rect(x - 5, y + 1, x - 4, y + 2, hex('#e83a3a')); R.rect(x - 1, y + 1, x, y + 2, hex('#3a8ae8')); R.rect(x + 4, y + 1, x + 5, y + 2, hex('#3ac85a')); R.pset(x - 7, y, hex('#fff6c8')); };
// una moneda gruesa de canto (12 × 4)
const moneda = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 6, y - 2, x + 6, y + 2, K); R.rect(x - 5, y - 2, x + 5, y, hex('#f0c030')); R.rect(x - 5, y + 1, x + 5, y + 1, hex('#a8781a')); R.rect(x - 3, y - 2, x - 1, y - 2, hex('#fff6c8')); };
// el guante de las gemas al doble de tamaño (la pieza del reparto, pixel a pixel)
const guanteGrande = (x, y, t) => T.PIEZAS_DO.guantelete({ pset: (px, py, c) => R.rect(x + (px - x) * 2, y + (py - y) * 2, x + (px - x) * 2 + 1, y + (py - y) * 2 + 1, c) }, x, y, t);
const p5 = (t) => {
  pegar(fondo5());
  // la balanza: el otro récord pesa más; en «highest grossing» le caen monedas al guante hasta igualar; en «$2 million»
  // cae la moneda del 2 y el platillo del guante baja
  const lluvia = tramo(t, P5 + 0.1, n(0.738)), cae2 = tramo(t, dos, dos + 0.35), bote = cae2 >= 1 ? Math.sin((t - dos - 0.35) * 14) * 0.03 * (1 - tramo(t, dos + 0.35, dos + 1.3)) : 0;
  const inc = lerp(0.14, 0, lluvia) - 0.09 * cae2 + bote;
  const cx = 160, cy = 30, br = 78, lx = cx - Math.cos(inc) * br, ly = cy + Math.sin(inc) * br, rx = cx + Math.cos(inc) * br, ry = cy - Math.sin(inc) * br;
  // el pie y la columna, con su brillo
  R.rect(136, 112, 184, 118, K); R.rect(137, 113, 183, 117, hex('#c89a3a')); R.rect(137, 113, 183, 113, hex('#f8e090')); R.rect(144, 106, 176, 112, K); R.rect(145, 107, 175, 111, hex('#c89a3a'));
  R.rect(156, 34, 164, 106, K); R.rect(157, 34, 163, 106, hex('#c89a3a')); R.rect(157, 34, 158, 106, hex('#f0d070')); R.rect(162, 34, 163, 106, hex('#8a6420'));
  { const b = Math.round(34 + ((t * 30) % 90)); if (b < 106) R.rect(157, b, 163, b + 2, hex('#fff6c8')); }
  for (const d of [1, 0, -1]) R.linea(Math.round(lx), Math.round(ly) + d, Math.round(rx), Math.round(ry) + d, d === 0 ? hex('#f0d070') : d > 0 ? hex('#8a6420') : K);
  R.linea(Math.round(lx), Math.round(ly) - 2, Math.round(rx), Math.round(ry) - 2, K); R.linea(Math.round(lx), Math.round(ly) + 2, Math.round(rx), Math.round(ry) + 2, K);
  R.disco(cx, cy, 6, K); R.disco(cx, cy, 5, hex('#c89a3a')); R.disco(cx - 1, cy - 1, 2, hex('#f8e090'));
  const plato = (px, py) => { px = Math.round(px); py = Math.round(py); R.disco(px, py, 2, K); R.linea(px, py, px - 24, py + 46, hex('#8a6420')); R.linea(px, py, px + 24, py + 46, hex('#8a6420')); R.linea(px, py, px, py + 46, hex('#6a4a18'));
    R.rect(px - 28, py + 46, px + 28, py + 50, K); R.rect(px - 27, py + 46, px + 27, py + 49, hex('#c89a3a')); R.rect(px - 27, py + 46, px + 27, py + 46, hex('#f8e090')); R.rect(px - 26, py + 49, px + 26, py + 49, hex('#8a6420')); return [px, py + 46]; };
  const [ax, ay] = plato(lx, ly), [bx, by] = plato(rx, ry);
  // izquierda: el otro récord, una montaña de monedas con una estrella azul encima
  for (let k = 0; k < 10; k++) moneda(ax - 18 + (k % 4) * 12 + (k >= 4 ? 6 : 0) - (k >= 8 ? 6 : 0), ay - 3 - Math.floor(k / 4) * 5);
  R.disco(ax, ay - 22, 7, K); R.disco(ax, ay - 22, 6, hex('#3a8ae8')); R.disco(ax - 2, ay - 24, 2, hex('#9ad0ff')); chispa(ax + 5, ay - 28, hex('#c8e8ff'));
  // derecha: las monedas (crecen con la lluvia) y el guante grande
  const nm = 5 + Math.floor(lluvia * 5); for (let k = 0; k < nm; k++) moneda(bx - 18 + (k % 4) * 12 + (k >= 4 ? 6 : 0) - (k >= 8 ? 6 : 0), by - 3 - Math.floor(k / 4) * 5);
  guanteGrande(bx, by - 8, t);
  // las monedas que caen desde arriba hasta el platillo
  if (lluvia > 0 && lluvia < 1) for (let k = 0; k < 3; k++) { const u = (lluvia * 4 + k / 3) % 1; moneda(bx - 12 + k * 12, Math.round(lerp(-6, by - 12, u))); }
  // la moneda del 2, grande, que cae al platillo
  if (t > dos - 0.25) { const u = tramo(t, dos - 0.25, dos + 0.35), mx = bx + 20, my = Math.round(lerp(-8, by - 8, u)); R.disco(mx, my, 8, K); R.disco(mx, my, 7, hex('#f8d040')); R.disco(mx, my, 5, hex('#e8b020')); R.numero('2', mx + 1, my + 4, { color: hex('#7a4a08'), sombra: false });
    if (u >= 1) { destello(mx, my, tramo(t, dos + 0.35, dos + 1), 5, 20); const v = tramo(t, dos + 0.4, dos + 0.8); if (v > 0) { R.numero('$2', 236, Math.round(lerp(30, 24, v)), { tam: 16, centro: true }); for (let y = 30; y < my - 9; y += 3) R.pset(mx - 6 + Math.round((y - 30) * 0.2), y, hex('#f8e090')); } } }
  // la corona se posa en el guante al final
  const co = tramo(t, dos + 0.9, dos + 1.6); if (co > 0) { corona(bx, Math.round(lerp(-8, by - 34, co))); if (co >= 1) for (let k = 0; k < 3; k++) chispa(bx + Math.cos(t * 3 + k * 2.1) * 14, by - 36 + Math.sin(t * 3 + k * 2.1) * 4); }
  // las palomitas en el mostrador: señalan la balanza, y saltan de alegría con la moneda
  T.palomitas(R, 294, 118, t, { s: 2, dir: -1, expresion: t > dos + 0.4 ? 'emocion' : t > P5 + 0.4 && t < n(0.738) ? 'susto' : 'normal', salta: t > dos + 0.4 && t < dos + 2.2 ? 1 : 0, señala: t > n(0.738) && t < dos ? [bx + 10, by] : undefined });
};
const efectos = [[1.0, 'whoosh'], [nombre + 1.9, 'golpecito'], [protege - 0.4, 'whoosh'], [protege + 0.75, 'chof'], [olvidan, 'pop'], [taquilla + 0.4, 'brillo'], [nunca, 'boing'], [endgame, 'brillo'], [arriba + 0.6, 'publico'], [n(0.674), 'golpecito'], [dos + 0.35, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '2026', efectos, año: 2026 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['do-sillas'] = ('Las sillas', '''// DO-SILLAS (frases 56–57), 2025. Cinco planos:
// 1. «escenario plato general»: la fila de sillas que no se acaba avanza; un técnico entra con una silla plegada y la
//    planta en «cast»; la técnica de realización da la señal; las palomitas se asoman en «unusual» con un «?». Corta en «In».
// 2. fondo local: el escritorio de un fan de noche: el portátil con el directo de las sillas, el reloj de pared con las
//    agujas que vuelan, la ventana que pasa de la noche al alba y el reloj digital que llega a 5:30 en «five and a half
//    hours»; las palomitas cabecean de sueño. Corta en «showed».
// 3. fondo local (inserto): la pantalla del portátil de cerca: pasan las sillas, cada una con su pictograma y su nombre en
//    barras; las palomitas cuentan con los dedos, una silla, otra, otra… y se marean (gag 8). Corta en «27».
// 4. «escenario plato silla»: el panel llega a 27 en «27 appeared»; en «the last one» la técnica cuelga la capa verde en
//    la última silla y el haz se enciende; en «Robert Downey Jr.» él entra con sus gafas de sol, sonríe y saltan flashes.
//    Corta en «according».
// 5. «mapa eeuu» (el mapa de papel del 12/13 sobre la mesa): por todo el país se encienden pantallitas y el contador del
//    latón sube hasta 275 en «275» y suma los seis ceros en «million»; las palomitas se emocionan.''', AY + r'''
const a = (f) => en('sillas', f), b = (f) => en('ultima', f);
const P2 = a(0.3225), P3 = a(0.708), P4 = b(0), P5 = b(0.561);
const cast = a(0.078), raro = a(0.207), horas = a(0.5805), sillasV = a(0.7845), cada = a(0.903);
const ultima = b(0.143), rdj = b(0.425), num = b(0.783), millon = b(0.909), cuelga = ultima + 0.6;
// pictogramas de los respaldos (blancos, ~9 px): martillo, escudo, cuernos, anillos, 4, garras, estrella, orejas, X
const PIC = [
  (x, y) => { R.rect(x - 4, y - 3, x + 4, y - 1, BL); R.rect(x - 1, y, x + 1, y + 3, BL); },
  (x, y) => { R.disco(x, y, 4, BL); R.disco(x, y, 2, hex('#d82a2a')); R.pset(x, y, BL); },
  (x, y) => { R.rect(x - 2, y - 1, x + 2, y + 2, BL); R.linea(x - 2, y - 1, x - 5, y - 5, BL); R.linea(x + 2, y - 1, x + 5, y - 5, BL); },
  (x, y) => { for (const dx of [-3, 3]) for (let a = 0; a < 6.28; a += 0.5) R.pset(x + dx + Math.round(Math.cos(a) * 2.5), y + Math.round(Math.sin(a) * 2.5), hex('#8ac8ff')); },
  (x, y) => R.numero('4', x + 2, y + 4, { color: BL }),
  (x, y) => { for (const dx of [-3, 0, 3]) R.linea(x + dx, y + 3, x + dx + 2, y - 4, BL); },
  (x, y) => { R.rect(x - 1, y - 4, x + 1, y + 3, BL); R.rect(x - 4, y - 1, x + 4, y + 1, BL); },
  (x, y) => { R.rect(x - 3, y - 1, x + 3, y + 3, BL); R.pset(x - 3, y - 2, BL); R.pset(x + 3, y - 2, BL); R.pset(x - 3, y - 3, BL); R.pset(x + 3, y - 3, BL); },
  (x, y) => { R.linea(x - 3, y - 3, x + 3, y + 3, BL); R.linea(x + 3, y - 3, x - 3, y + 3, BL); },
];
// 1 · el plató: la fila infinita
const p1 = (t) => {
  T.escenario(R, t, { encuadre: 'plato', dolly: 0.12 });
  // la caja de transporte con pegatinas y un rollo de cable (primer término, izquierda)
  R.rect(48, 150, 96, 172, K); R.rect(49, 151, 95, 171, hex('#2a2a32')); R.rect(49, 151, 95, 152, hex('#5a5a6a')); for (const cx of [49, 93]) R.rect(cx, 151, cx + 2, 171, hex('#8a8a96'));
  R.rect(58, 156, 66, 162, hex('#e8c040')); R.rect(72, 158, 84, 163, hex('#3a8ae8')); R.disco(78, 166, 2, hex('#d82a2a'));
  for (let k = 0; k < 3; k++) for (let a = 0; a < 6.28; a += 0.3) R.pset(118 + Math.round(Math.cos(a) * (7 - k * 2)), 170 + Math.round(Math.sin(a) * (3 - k * 0.8)), k === 1 ? hex('#3a3a46') : hex('#1a1a22'));
  // el técnico trae una silla plegada y la planta en su sitio; luego se va
  const u = tramo(t, 0.2, cast + 0.2), v = tramo(t, cast + 0.9, P2), x = Math.round(lerp(300, 214, u) + lerp(0, 120, v)), planta = t > cast + 0.4;
  const te = R.actor(EL.tecnico, x, 166, t, { dir: v > 0 ? 1 : -1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), sostiene: planta ? undefined : true, sonrisa: planta && v === 0 });
  if (!planta) sillaDir(te.mano[0] - 2, te.mano[1] + 8, 0.9, hex('#1e1e26'), PIC[0]);
  else { sillaDir(200, 168, 1.2, hex('#1e1e26'), PIC[0]); if (t < cast + 1) destello(200, 150, tramo(t, cast + 0.4, cast + 1), 4, 16); }
  // la técnica de realización con sus cascos: cuenta con la mano y da la señal
  R.actor(EL.tecnica, 74, 128, t, { dir: 1, dedo: t > 0.6 && t < raro, habla: t > 0.6 && t < cast + 1 && Math.sin(t * 9) > 0 });
  // las palomitas se asoman por detrás de la caja con un «?»
  const asoma = tramo(t, raro - 0.3, raro + 0.3);
  if (asoma > 0) { T.palomitas(R, 110, 154 + Math.round((1 - asoma) * 12), t, { s: 1, dir: 1, expresion: 'normal' }); }
  R.rect(48, 150, 96, 152, hex('#5a5a6a'));
  if (t > raro + 0.2) globo(112, 128, '?');
  T.escenarioDelante(R, t, { encuadre: 'plato' });
};
// 2 · fondo local: el escritorio del fan, de noche al alba
const fondo2 = () => capa('escritorio', () => {
  // la pared: papel de rayas azul noche con florecitas; arriba a la derecha, lisa con la luz suave del techo
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { let c = (x % 12 < 6) ? hex('#2e2c4e') : hex('#28264a');
    if (x % 12 === 3 && y % 10 === 4) c = hex('#4a4470'); if (x > 262 && y < 52) c = mez(hex('#2e2c4e'), hex('#4a4878'), Math.max(0, 1 - Math.hypot(x - 300, y) / 70));
    if (hh(x, y, 9) < 0.02) c = mez(c, K, 0.3); R.pset(x, y, c); }
  R.rect(0, 122, 319, 131, hex('#3a3456')); R.rect(0, 122, 319, 122, hex('#5a5480'));
  // la ventana (el hueco lo pinta cada fotograma): marco, alféizar, cortinas con pliegues
  R.rect(14, 18, 112, 100, hex('#5a4030')); R.rect(16, 20, 110, 98, K); R.rect(10, 100, 116, 105, hex('#7a5a40')); R.rect(10, 100, 116, 100, hex('#a07a54'));
  for (const [x0, x1] of [[4, 22], [104, 122]]) for (let x = x0; x <= x1; x++) for (let y = 12; y < 112; y++) R.pset(x, y, Math.sin(x * 1.1) > 0.4 ? hex('#6a3a5a') : Math.sin(x * 1.1) < -0.6 ? hex('#3a1e36') : hex('#542c48'));
  R.rect(2, 10, 124, 12, hex('#8a8a96'));
  // la balda con figuritas: el escudo, el martillo, un casco y libros
  R.rect(150, 46, 240, 49, hex('#7a5a40')); R.rect(150, 46, 240, 46, hex('#a07a54')); R.rect(150, 50, 240, 50, hex('#1a1426'));
  T.PIEZAS_DO.escudo(R, 162, 38, { r: 6 }); T.PIEZAS_DO.martillo(R, 182, 44, { arriba: true });
  for (let k = 0; k < 6; k++) { const c = [hex('#d83a3a'), hex('#3a6ad8'), hex('#e8c040'), hex('#3aa86a'), hex('#8a4ad8'), hex('#e87a3a')][k]; R.rect(198 + k * 6, 34 + (k % 2) * 2, 202 + k * 6, 45, K); R.rect(199 + k * 6, 35 + (k % 2) * 2, 201 + k * 6, 45, c); }
  T.e_mascara(R, 232, 39, 1);
  // el póster de la máscara (sin letras)
  R.rect(126, 56, 152, 98, hex('#c8a040')); R.rect(128, 58, 150, 96, hex('#16301e')); for (let k = 0; k < 6; k++) R.linea(139, 77, 128 + k * 4, 96, hex('#1e4a2a')); T.e_mascara(R, 139, 76, 1.6);
  // el escritorio: tablero con vetas y el faldón con sus cajones
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.09 + Math.sin(y * 0.5 + x * 0.02) * 1.8);
    R.pset(x, y, y < 140 ? (y === 132 ? hex('#c8925a') : v > 0.8 ? hex('#8a5a30') : hex('#a8703e')) : v > 0.8 ? hex('#6a4220') : hex('#7a4e28')); }
  R.rect(0, 140, 319, 141, hex('#4a2a12'));
  for (const dx of [40, 240]) { R.rect(dx, 148, dx + 50, 176, hex('#4a2a12')); R.rect(dx + 1, 149, dx + 49, 175, hex('#86562c')); R.rect(dx + 20, 160, dx + 30, 162, hex('#e0c080')); }
  // el flexo (a la derecha) y la planta (izquierda)
  R.rect(286, 130, 304, 133, K); R.rect(287, 130, 303, 132, hex('#3a3a46')); R.linea(295, 130, 282, 96, hex('#3a3a46')); R.linea(296, 130, 283, 96, hex('#5a5a6a')); R.linea(282, 96, 262, 92, hex('#3a3a46'));
  R.poligono([[254, 90], [270, 88], [272, 98], [256, 100]], hex('#3a3a46')); R.linea(256, 99, 271, 97, hex('#fff2b0'));
  R.rect(18, 116, 34, 132, K); R.rect(19, 117, 33, 131, hex('#c86a3a')); R.rect(19, 117, 33, 118, hex('#e88a5a'));
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.35; R.linea(26, 116, 26 + Math.round(Math.cos(a) * 12), 116 + Math.round(Math.sin(a) * 14), k % 2 ? hex('#3a8a4a') : hex('#5aba6a')); }
});
const p2 = (t) => {
  pegar(fondo2());
  const u = tramo(t, P2 + 0.1, horas), alba = tramo(t, P2 + 0.4, P3);
  // por la ventana: el cielo pasa de la noche al alba, con la ciudad y su antena; recortado al hueco
  R.recorte([16, 20, 110, 98]);
  for (let y = 20; y < 99; y++) { const k = (y - 20) / 78, c = mez(mez(hex('#0e1230'), hex('#2a3a7a'), k), mez(hex('#5a6ab0'), hex('#f0a070'), k), alba); for (let x = 16; x < 111; x++) R.pset(x, y, (x + y) % 2 && k > 0.5 ? mez(c, hex('#ffffff'), 0.05) : c); }
  if (alba < 0.7) { R.disco(36, 36, 5, mez(hex('#f0f0d8'), hex('#a0a8c8'), alba)); R.disco(38, 34, 4, mez(hex('#0e1230'), hex('#5a6ab0'), alba)); }
  else R.disco(92, Math.round(lerp(100, 82, tramo(t, P3 - 1.2, P3))), 7, hex('#ffd890'));
  for (let i = 0; i < 9; i++) { const bx = 16 + i * 11, bt = 64 + Math.round(hh(i, 3, 5) * 18); R.rect(bx, bt, bx + 9, 98, mez(hex('#141830'), hex('#4a4a6a'), alba)); for (let j = bt + 3; j < 96; j += 5) for (let q = bx + 2; q < bx + 8; q += 3) if (hh(q, j, 7) > 0.45 + alba * 0.4) R.pset(q, j, hex('#f8d870')); }
  if (Math.sin(t * 5) > 0) R.pset(60, 58, hex('#ff4a4a'));
  R.recorte(null);
  R.rect(62, 20, 63, 98, K); R.rect(16, 58, 110, 59, K);
  // el reloj de pared: las agujas vuelan
  const rx = 262, ry = 74; R.disco(rx, ry, 12, K); R.disco(rx, ry, 11, hex('#e8e0c8')); R.disco(rx, ry, 9, hex('#f6f2ea'));
  for (let k = 0; k < 12; k++) R.pset(rx + Math.round(Math.cos(k * 0.5236) * 8), ry + Math.round(Math.sin(k * 0.5236) * 8), K);
  const hrs = 5.5 * u, am = hrs * Math.PI * 2 - Math.PI / 2, ah = hrs / 12 * Math.PI * 2 - Math.PI / 2 + 0.3;
  R.linea(rx, ry, rx + Math.round(Math.cos(am) * 8), ry + Math.round(Math.sin(am) * 8), hex('#2a2a3a')); R.linea(rx, ry, rx + Math.round(Math.cos(ah) * 5), ry + Math.round(Math.sin(ah) * 5), K); R.pset(rx, ry, hex('#d82a2a'));
  // el portátil: la pantalla con el directo (fila de sillas que pasa) y el piloto rojo
  R.rect(126, 70, 214, 128, K); R.rect(128, 72, 212, 126, hex('#1a1a26'));
  R.recorte([130, 74, 210, 124]); for (let y = 74; y < 125; y++) for (let x = 130; x < 211; x++) R.pset(x, y, y < 100 ? mez(hex('#2a1a4a'), hex('#5a3a8a'), (y - 74) / 26) : hex('#101018'));
  for (let k = 0; k < 7; k++) { const z = ((k + t * 0.6) % 7) / 7, sx = lerp(205, 140, z), sy = lerp(122, 102, z), sc = lerp(1, 0.35, z); sillaDir(sx, sy, sc); }
  R.recorte(null);
  R.disco(135, 79, 2, Math.sin(t * 4) > 0 ? hex('#ff3a3a') : hex('#a01a1a'));
  R.rect(116, 128, 224, 134, K); R.rect(117, 128, 223, 132, hex('#b8bcc8')); R.rect(117, 128, 223, 128, hex('#e8ecf4'));
  for (let i = 0; i < 16; i++) R.rect(122 + i * 6, 130, 125 + i * 6, 130, hex('#6a6e7a'));
  luz(170, 99, 50, hex('#8a6ad8'), 0.22);
  // la taza con su vapor
  R.rect(226, 116, 238, 131, K); R.rect(227, 117, 237, 130, hex('#e8e4dc')); R.rect(227, 117, 237, 118, hex('#ffffff')); R.rect(238, 120, 241, 127, K); R.rect(239, 121, 240, 126, hex('#e8e4dc'));
  for (let k = 0; k < 4; k++) { const v = (t * 0.6 + k / 4) % 1; R.pset(Math.round(231 + Math.sin(t * 2 + k * 2) * 2), Math.round(114 - v * 16), mez(hex('#c8c8d8'), hex('#2e2c4e'), v)); }
  // el reloj digital: de 0:00 a 5:30, que parpadea al llegar
  R.rect(38, 112, 84, 131, K); R.rect(39, 113, 83, 130, hex('#1a1a22')); R.rect(39, 113, 83, 113, hex('#3a3a46')); const mins = Math.round(330 * u), hh2 = Math.floor(mins / 60), mm = mins % 60;
  if (!(t > horas && t < horas + 1.2 && Math.floor(t * 6) % 2)) R.numero(hh2 + ':' + String(mm).padStart(2, '0'), 61, 127, { centro: true, color: hex('#ff4a3a'), sombra: false });
  // las palomitas en la mesa: miran la pantalla y cabecean de sueño; al alba, se despiertan de golpe
  T.palomitas(R, 106, 136, t, { s: 2, dir: 1, asiente: t > horas - 1.5 && t < horas + 0.4, expresion: t > horas + 0.4 ? 'susto' : 'normal' });
  if (t > horas - 1.4 && t < horas + 0.4) for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; R.rect(Math.round(118 + v * 10 + k), Math.round(88 - v * 14), Math.round(121 + v * 10 + k), Math.round(88 - v * 14), hex('#c8c8f0')); }
  luz(270, 100, 36, hex('#fff2b0'), 0.35);
};
// 3 · fondo local (inserto): la pantalla del portátil de cerca, con las sillas y su nombre en barras
const fondo3 = () => capa('pantalla', () => {
  // el canto del portátil (marco gris oscuro con la cámara) y, abajo, el teclado sobre la mesa
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 148 ? hex('#2a2a32') : hex('#a8703e'));
  R.rect(16, 6, 304, 146, hex('#3a3a46')); R.rect(16, 6, 304, 6, hex('#5a5a6a')); R.rect(22, 12, 298, 140, K); R.disco(160, 9, 1, hex('#1a1a22'));
  R.rect(0, 146, 319, 179, hex('#b8bcc8')); R.rect(0, 146, 319, 147, hex('#e8ecf4'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 22; i++) { const x = 8 + i * 14 + j * 4, y = 152 + j * 9; R.rect(x, y, x + 11, y + 6, hex('#4a4e5a')); R.rect(x, y, x + 11, y, hex('#6a6e7a')); R.rect(x + 1, y + 6, x + 11, y + 6, hex('#2a2e36')); }
  R.rect(110, 178, 210, 179, hex('#9a9eaa'));
});
const p3 = (t) => {
  pegar(fondo3());
  // el directo: ciclorama violeta con haces, suelo negro brillante y la fila de sillas que pasa de derecha a izquierda
  R.recorte([24, 14, 296, 138]);
  for (let y = 14; y < 139; y++) { const k = (y - 14) / 70; for (let x = 24; x < 297; x++) { let c = y < 84 ? mez(hex('#2a1450'), hex('#6a3aa8'), k) : mez(hex('#141420'), hex('#08080e'), (y - 84) / 54);
    if (y < 84 && (x + Math.floor(t * 3)) % 37 < 2) c = mez(c, hex('#a87ae8'), 0.3); if (y >= 84 && hh(x >> 1, y, 4) < 0.03) c = hex('#2a2a3a'); R.pset(x, y, c); } }
  for (const bx of [70, 160, 250]) for (let y = 14; y < 120; y++) { const w = Math.round((y - 14) * 0.18); for (let x = bx - w; x <= bx + w; x++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.25)); }
  const vel = 46, sp = 64;
  for (let k = -1; k < 6; k++) { const off = (t * vel) % sp, x = Math.round(300 - k * sp + off - sp), id = Math.floor(t * vel / sp) + k;
    sillaDir(x, 132, 2.4, hex('#1a1a22'), (cx, cy) => { PIC[((id % 9) + 9) % 9](cx, cy - 1); });
    const by = 132 - Math.round(12 * 2.4) - Math.round(10 * 2.4) + Math.round(6 * 2.4) + 4; R.rect(x - 12, by, x + 12, by + 1, hex('#e8e4dc')); R.rect(x - 8, by + 4, x + 8, by + 5, hex('#9a96a8'));
    for (let j = 0; j < 8; j++) { const lx = x + (j - 4) * 3; R.pset(lx, 134, hex('#2a2a3a')); } }
  // el piloto rojo del directo y el contador de tiempo del vídeo
  R.disco(36, 24, 3, Math.sin(t * 4) > 0 ? hex('#ff3a3a') : hex('#a01a1a'));
  const seg = Math.floor(4 * 3600 + 12 * 60 + (t - P3) * 37); R.numero(Math.floor(seg / 3600) + ':' + String(Math.floor(seg / 60) % 60).padStart(2, '0') + ':' + String(seg % 60).padStart(2, '0'), 46, 28, { color: hex('#f2eee2') });
  R.recorte(null);
  // las palomitas en el teclado: cuentan las sillas con los dedos, una, dos… cinco, y se marean
  const c = Math.min(5, 1 + Math.floor(tramo(t, P3 + 0.3, cada - 0.5, ) * 5)), mareo = t > cada - 0.3;
  T.palomitas(R, 70, 176, t, { s: 2, dir: 1, cuenta: mareo ? undefined : c, expresion: mareo ? 'mareo' : 'normal' });
  if (mareo) for (let k = 0; k < 4; k++) chispa(70 + Math.cos(t * 5 + k * 1.57) * 18, 128 + Math.sin(t * 5 + k * 1.57) * 5);
};
// 4 · la última silla, la capa verde y él
const p4 = (t) => {
  const cuenta = Math.min(27, 22 + Math.floor(tramo(t, P4 - 0.3, P4 + 0.4) * 5));
  T.escenario(R, t, { encuadre: 'plato', camara: 'silla', contador: cuenta, capa: t > cuelga });
  if (t > P4 + 0.4 && t < P4 + 1.2) destello(66, 34, tramo(t, P4 + 0.4, P4 + 1.2), 8, 34);
  // la técnica trae la capa doblada y la cuelga del respaldo; luego se aparta
  const u = tramo(t, P4 + 0.3, ultima + 0.3), w = tramo(t, cuelga + 0.4, rdj - 0.6), x = Math.round(lerp(300, 188, u) + lerp(0, 50, w));
  const te = R.actor(EL.tecnica, x, 156, t, { dir: w > 0 ? 1 : -1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sostiene: t < cuelga ? true : undefined, sonrisa: t > cuelga });
  if (t < cuelga) { const [mx, my] = te.mano; R.rect(mx - 4, my - 1, mx + 4, my + 4, K); R.rect(mx - 3, my, mx + 3, my + 3, hex('#2a7a3a')); R.rect(mx - 3, my, mx + 3, my, hex('#4aa85a')); }
  if (t > cuelga && t < cuelga + 0.8) destello(172, 128, tramo(t, cuelga, cuelga + 0.8), 6, 26, hex('#9af0a8'));
  // al colgar la capa, el haz de la silla se enciende más (el charco de luz cálido)
  if (t > cuelga) luz(172, 140, 44, hex('#fff0c0'), 0.3 * tramo(t, cuelga, cuelga + 0.6));
  // un cámara al fondo que lo graba todo (la luz roja)
  // él entra con sus gafas de sol, se para junto a la silla y sonríe; flashes
  const v = tramo(t, rdj - 0.3, rdj + 0.7), rx = Math.round(lerp(330, 206, v));
  R.actor(EL.rdj, rx, 156, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: v >= 1, dedo: v >= 1 && t < P5 - 0.5 });
  // los flashes de los fotógrafos (fuera de cuadro, a la derecha): estallidos blancos en el borde y su luz en él
  if (t > rdj + 0.6) { const f = Math.floor(t * 7) % 4; if (f === 0) { luz(213, 140, 26, BL, 0.5); chispa(312, 112, BL); } if (f === 2) { chispa(306, 136, BL); luz(213, 140, 18, BL, 0.3); } }
  // el cámara del primer plano, con su cámara al hombro sobre el trípode, que lo graba todo
  R.actor(EL.tecnico, 40, 176, t, { dir: 1, quieto: false });
  for (const [dx, c] of [[-14, hex('#3a3a46')], [0, hex('#5a5a6a')], [14, hex('#3a3a46')]]) R.linea(70, 146, 70 + dx, 178, c);
  R.rect(54, 132, 84, 146, K); R.rect(55, 133, 83, 145, hex('#5a5a6a')); R.rect(55, 133, 83, 134, hex('#9a9aaa')); R.rect(58, 137, 70, 142, hex('#3a3a46')); R.rect(83, 133, 83, 145, hex('#c8c8d8')); R.rect(84, 135, 92, 143, K); R.rect(85, 136, 91, 142, hex('#4a4a56')); R.disco(92, 139, 3, hex('#8ab8e8')); R.pset(91, 138, BL);
  R.rect(60, 128, 70, 132, K); R.disco(78, 130, 1, Math.sin(t * 5) > 0 ? hex('#ff3a3a') : hex('#801a1a'));
};
// 5 · el mapa del país: las pantallas que se encienden y el contador
const sitios = [[-74, 40.7], [-118.2, 34], [-87.6, 41.9], [-95.4, 29.8], [-112, 33.4], [-75.2, 40], [-122.4, 37.8], [-104.9, 39.7], [-80.2, 25.8], [-84.4, 33.7], [-122.3, 47.6], [-71, 42.4], [-93.3, 45], [-90.1, 30], [-97.7, 30.3], [-86.8, 36.2], [-115.1, 36.2], [-81.7, 41.5], [-77, 38.9], [-111.9, 40.8], [-96.8, 32.8], [-90.2, 38.6], [-83, 42.3], [-117.2, 32.7], [-106.6, 35.1]];
const p5 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const u = tramo(t, P5 + 0.2, num);
  sitios.forEach(([lo, la], i) => { const on = (i + 1) / sitios.length <= u + 0.02; if (!on) return; const [x, y] = P([lo, la]).map(Math.round), ap = tramo(t, P5 + 0.2 + i / sitios.length * (num - P5 - 0.2), P5 + 0.6 + i / sitios.length * (num - P5 - 0.2));
    R.rect(x - 4, y - 3, x + 4, y + 3, K); R.rect(x - 3, y - 2, x + 3, y + 2, Math.sin(t * 6 + i) > 0.6 ? hex('#8ae0ff') : hex('#4a9ad8')); R.pset(x - 1, y, BL); R.rect(x - 1, y + 4, x + 1, y + 4, K); if (ap < 1) destello(x, y, ap, 3, 10); });
  // la placa de latón con el contador
  R.rect(160, 140, 306, 168, K); R.rect(161, 141, 305, 167, hex('#c89a3a')); R.rect(161, 141, 305, 141, hex('#f8e090')); R.rect(162, 166, 305, 167, hex('#8a6420'));
  for (const sx of [165, 301]) { R.disco(sx, 154, 1, hex('#6a4a18')); }
  const v = Math.round(275 * tramo(t, P5 + 0.2, num)), mill = tramo(t, millon - 0.1, millon + 0.3);
  R.numero(String(v), 204, 162, { tam: 16, centro: true });
  if (mill > 0) R.numero(',000,000', 230, 160, { n: Math.round(mill * 64) });
  if (t > num && t < num + 0.7) destello(204, 152, tramo(t, num, num + 0.7), 8, 40);
  // las palomitas en la esquina de la mesa
  T.palomitas(R, 36, 174, t, { s: 2, dir: 1, expresion: t > num ? 'emocion' : 'normal', salta: t > millon ? 0.7 : 0, señala: t < num ? [120, 90] : undefined });
};
const efectos = [[cast + 0.4, 'golpecito'], [raro + 0.2, 'pop'], [P2 + 0.3, 'tic'], [horas, 'bip'], [P3 + 0.5, 'tecleo'], [cada, 'boing'], [P4 + 0.4, 'brillo'], [cuelga, 'papel'], [rdj + 0.6, 'flash'], [P5 + 0.6, 'pop'], [num, 'brillo'], [millon + 0.3, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2025 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['do-reparto'] = ('El reparto', '''// DO-REPARTO (frases 58–60), 2026. Seis planos:
// 1. «washington torre mesa» al atardecer, con la Tierra 616 en la pantalla grande: en «Thor» baja Thor con el martillo
//    en alto y cae un rayo; en «Captain America» llega Sam planeando con las alas y el escudo. Corta en «Bucky».
// 2. «washington despacho general» al atardecer: Bucky entra por la puerta; en «Ant-Man» Ant-Man crece de golpe; en «Loki»
//    aparece Loki entre chispas verdes; en «Shang-Chi» Shang-Chi entra de un salto con los anillos girando, y en «2021»
//    le sale el número. Corta en «There's».
// 3. «mundo wakanda general»: Shuri cae de un salto en la terraza; en «Black Panther» levanta los brazos y su traje brilla
//    morado; M'Baku llega por la izquierda; en «Namor» los dos miran al río, donde salta una figura entre la espuma.
//    Corta en «who».
// 4. «mundo wakanda agua»: Namor sale del agua junto a la cascada y se eleva con las alitas de los tobillos; en
//    «Thunderbolts» llegan Yelena y el Guardián por la orilla y Sentry baja del cielo. Corta en «From».
// 5. fondo local: el espacio con tres Tierras pequeñas y cada equipo de pie encima: la 616 ya con los suyos; en «828»
//    llega la Tierra del anillo y caen los 4 Fantásticos; en «Fox» aparece la tercera, con «?», y los X-Men. Corta en «Add».
// 6. «hoy cuarto mapa»: el mapa de las Tierras del fan; las palomitas cuentan uno, dos, tres en «three Earths» y señalan la
//    «?» del centro en «hasn't confirmed»; se rascan la cabeza.''', AY + r'''
const a = (f) => en('616b', f), w = (f) => en('wakanda', f), c = (f) => en('tres', f);
const P2 = a(0.4297), P3 = w(0), P4 = w(0.5234), P5 = c(0), P6 = c(0.485);
const thor = a(0.1424), cap = a(0.2635), ant = a(0.4653), loki = a(0.5804), shang = a(0.6374), anio = a(0.8214);
const shuri = w(0.041), pantera = w(0.138), namor = w(0.296), tb = w(0.8);
const e828 = c(0.0262), cuatro = c(0.1187), fox = c(0.2722), xmen = c(0.390), tres = c(0.5544), noconf = c(0.6823);
// 1 · la torre: Thor y Sam llegan a la mesa
const p1 = (t) => {
  const O = { camara: 'mesa', luz: 'atardecer', pantalla: 'tierra' }; T.washington(R, t, O);
  // los técnicos de la torre, detrás de la mesa, se sobresaltan y luego sonríen
  R.actor(EL.tecnica, 33, 150, t, { dir: 1, sorpresa: t > thor && t < thor + 1, sonrisa: t > thor + 1 });
  R.actor(EL.tecnico, 273, 150, t, { dir: -1, dedo: t > cap && t < cap + 1.2, sonrisa: t > cap + 1.2 });
  T.washingtonDelante(R, t, O);
  // Thor baja del techo con el martillo en alto y se planta encima de la mesa; el rayo cae en el martillo al tocar
  const u = tramo(t, thor - 0.8, thor), ty = Math.round(lerp(20, 146, u));
  if (t > thor - 0.8) { const th = R.actor(EL.thor, 116, ty, t, { dir: 1, sostiene: [131, ty - 31], quieto: u < 1, sonrisa: u >= 1 }); T.PIEZAS_DO.martillo(R, th.mano[0], th.mano[1], { arriba: true });
    if (u >= 1 && t < thor + 0.6) destello(123, 146, tramo(t, thor, thor + 0.6), 4, 22, hex('#c8e0ff')); }
  if (t > thor - 0.05 && t < thor + 0.5) { const k = tramo(t, thor - 0.05, thor + 0.5); luz(131, 108, 60, hex('#c8e0ff'), 0.6 * (1 - k)); let x = 150, y = 16; for (let i = 0; i < 8; i++) { const ny = y + 12, nx = i === 7 ? 131 : x + Math.round((hh(i, 2, Math.floor(t * 20)) - 0.5) * 10 - 2); R.linea(x, y, nx, Math.min(ny, 108), hex('#e8f4ff')); R.linea(x + 1, y, nx + 1, Math.min(ny, 108), hex('#8ab8ff')); x = nx; y = ny; if (y >= 108) break; } }
  // Sam llega planeando desde la derecha con las alas abiertas y se posa en la mesa con el escudo
  const v = tramo(t, cap - 0.7, cap + 0.2), sx = Math.round(lerp(330, 176, v)), sy = Math.round(lerp(70, 146, v) - Math.sin(v * Math.PI) * 10);
  if (t > cap - 0.7) { const sm = R.actor(EL.sam, sx, sy, t, { dir: -1, brazos: v < 1, sostiene: v >= 1 ? true : undefined, quieto: v < 1, sonrisa: v >= 1 });
    if (v < 1) for (let k = 0; k < 3; k++) R.linea(sx + 18 + k * 5, sy - 18 + k * 3, sx + 26 + k * 5, sy - 18 + k * 3, hex('#e8f0ff'));
    if (v >= 1) T.PIEZAS_DO.escudo(R, sm.mano[0] - 2, sm.mano[1], { r: 7 }); else T.PIEZAS_DO.escudo(R, sx + 8, sy - 10, { r: 6, ancho: 0.4 }); }
};
// 2 · el despacho: Bucky, Ant-Man, Loki y Shang-Chi
const p2 = (t) => {
  const O = { encuadre: 'despacho', luz: 'atardecer' }; T.washington(R, t, O);
  // Bucky entra por la puerta y camina hasta su sitio
  const u = tramo(t, P2 - 0.1, P2 + 1.4), bx = Math.round(lerp(256, 208, u)), bs = Math.round(lerp(132, 158, u));
  R.actor(EL.bucky, bx, bs, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: u >= 1 && t > shang });
  // Ant-Man: un puntito rojo que crece de golpe
  if (t < ant) { R.rect(97, 155, 98, 157, hex('#d82a2a')); R.pset(97, 154, hex('#c8ccd8')); }
  else { R.actor(EL.antman, 90, 158, t, { dir: 1, brazos: t < ant + 0.7, quieto: t < ant + 0.3 }); destello(97, 144, tramo(t, ant, ant + 0.6), 3, 20, hex('#ff8a8a')); }
  // Loki aparece entre chispas verdes
  const lo = tramo(t, loki - 0.3, loki + 0.3);
  if (lo > 0) { if (lo < 1) { R.recorte([118, 120, 140, 159]); } R.actor(EL.loki, 120, 158, t, { dir: 1, sonrisa: true, dedo: t > loki + 1.6 && t < loki + 2.6 }); R.recorte(null);
    if (t < loki + 0.9) for (let k = 0; k < 10; k++) { const yy = 158 - ((t * 60 + k * 9) % 44); R.pset(118 + (k * 7) % 22, Math.round(yy), k % 2 ? hex('#5af08a') : hex('#c8ffd8')); } }
  // Shang-Chi entra de un salto, con los anillos girando en los antebrazos
  const sh = tramo(t, shang - 0.5, shang + 0.1), sxx = Math.round(lerp(60, 150, sh)), alto = Math.round(Math.sin(sh * Math.PI) * 24);
  if (t > shang - 0.5) { R.actor(EL.shangchi, sxx, 158, t, { dir: -1, salto: alto, brazos: sh < 1 || (t > anio && t < anio + 1), quieto: sh < 1 });
    for (let k = 0; k < 3; k++) { const a2 = t * 9 + k * 2.1; for (const dx of [2, 13]) R.pset(sxx + dx + Math.round(Math.cos(a2) * 4), 158 - alto - 18 + Math.round(Math.sin(a2) * 2), hex('#6ac8ff')); } }
  // el número de su película
  const n1 = tramo(t, anio, anio + 0.3); if (n1 > 0) { R.numero('2021', 158, Math.round(lerp(130, 118, n1)), { tam: 16, centro: true }); if (n1 < 1) destello(158, 112, n1, 6, 26); }
  T.washingtonDelante(R, t, O);
};
// 3 · Wakanda: Shuri y M'Baku en la terraza
const p3 = (t) => {
  T.mundo(R, t, { encuadre: 'wakanda' });
  // M'Baku llega andando por la izquierda
  const m = tramo(t, P3, P3 + 1.6), mx = Math.round(lerp(10, 96, m));
  R.actor(EL.mbaku, mx, 162, t, { dir: t > namor ? 1 : 1, anda: m > 0 && m < 1, sonrisa: t > pantera && t < namor, sorpresa: t > namor && t < namor + 1.2, habla: t > pantera + 0.6 && t < namor - 0.2 && Math.sin(t * 8) > 0 });
  // Shuri cae de un salto, levanta los brazos y su traje se carga de luz morada
  const s1 = tramo(t, shuri - 0.6, shuri), alto = Math.round((1 - s1) * 60);
  if (t > shuri - 0.6) { R.actor(EL.shuri, 146, 162, t, { dir: t > namor ? 1 : -1, salto: alto, brazos: (t > pantera && t < pantera + 1.4) || s1 < 1, quieto: s1 < 1 });
    if (t > pantera && t < pantera + 1.6) { const k = tramo(t, pantera, pantera + 1.6); luz(153, 146, 28, hex('#b06aff'), 0.6 * (1 - k)); for (let i = 0; i < 6; i++) { const a2 = t * 6 + i; R.pset(153 + Math.round(Math.cos(a2) * 12), 146 + Math.round(Math.sin(a2) * 14), hex('#e0c0ff')); } }
    if (s1 >= 1 && t < shuri + 0.5) destello(153, 162, tramo(t, shuri, shuri + 0.5), 4, 16, hex('#e8e0f0')); }
  // en el río, al fondo, salta una figura entre la espuma: Namor
  const nz = tramo(t, namor, namor + 1.4);
  if (nz > 0 && nz < 1) { const x = Math.round(lerp(206, 236, nz)), y = Math.round(118 - Math.sin(nz * Math.PI) * 22); R.rect(x - 1, y - 4, x + 1, y + 2, hex('#8a5a38')); R.pset(x, y - 5, hex('#1c1424')); R.rect(x - 1, y - 1, x + 1, y, hex('#2a8a5a')); R.pset(x - 2, y + 2, BL); R.pset(x + 2, y + 2, BL);
    for (let k = 0; k < 8; k++) { const v = (nz * 2 + k / 8) % 1; R.pset(206 + k * 2 + Math.round(v * 4), Math.round(118 - Math.sin(v * Math.PI) * 10), hex('#e8f8ff')); } }
  if (nz > 0) { const r = Math.round(4 + nz * 10); for (let a2 = 0; a2 < 6.28; a2 += 0.4) R.pset(206 + Math.round(Math.cos(a2) * r), 118 + Math.round(Math.sin(a2) * r * 0.3), hex('#e8f8ff')); }
};
// 4 · la orilla: Namor sale del agua; llegan los Thunderbolts
const p4 = (t) => {
  const sale = tramo(t, P4 + 0.1, P4 + 1.2), O = { encuadre: 'wakanda', camara: 'agua', x: 100, sale, linea: 152 };
  T.mundo(R, t, O);
  // Namor: sube del río y se eleva con las alitas de los tobillos
  const vuela = tramo(t, P4 + 1.3, P4 + 2.4), su = Math.round(lerp(190, 152, sale) - vuela * 26);
  R.actor(EL.namor, 92, su, t, { dir: 1, brazos: vuela > 0 && vuela < 1, sonrisa: vuela >= 1, dedo: t > tb + 0.3, quieto: vuela > 0 });
  if (vuela > 0) for (const dx of [3, 11]) { const f = Math.floor(t * 12) % 2; R.pset(92 + dx - 1, su - 1 - f, BL); R.pset(92 + dx - 2, su - 2, BL); R.pset(92 + dx + 2, su - 1 - f, hex('#c8d8e8')); }
  if (vuela > 0) for (let k = 0; k < 5; k++) { const v = (t * 1.6 + k / 5) % 1; R.pset(94 + k * 3, Math.round(su + 2 + v * 18), hex('#bfe8ff')); }
  if (vuela === 0) T.k_mundoDelante(R, t, O);
  // los Thunderbolts: Yelena y el Guardián llegan por la orilla; Sentry baja del cielo
  const y1 = tramo(t, tb - 0.9, tb + 0.4);
  R.actor(EL.yelena, Math.round(lerp(330, 214, y1)), 162, t, { dir: -1, anda: y1 > 0 && y1 < 1, sonrisa: y1 >= 1 });
  R.actor(EL.guardian, Math.round(lerp(352, 238, y1)), 162, t, { dir: -1, anda: y1 > 0 && y1 < 1, brazos: y1 >= 1 && t < tb + 1.4 });
  const s2 = tramo(t, tb - 0.2, tb + 0.6); if (s2 > 0) { const ss = Math.round(lerp(60, 162, s2)); R.actor(EL.sentry, 262, ss, t, { dir: -1, brazos: s2 < 1, quieto: s2 < 1 }); if (s2 < 1) for (let k = 0; k < 4; k++) R.linea(266 + k * 2, ss - 30 - k * 5, 266 + k * 2, Math.max(48, ss - 40 - k * 5), hex('#fff2b0')); else if (t < tb + 1) destello(269, 162, tramo(t, tb + 0.6, tb + 1), 4, 16); }
};
// 5 · fondo local: el espacio con las tres Tierras pequeñas
const fondo5 = () => capa('espacio3', () => {
  // nebulosa en tres tonos con trama y vetas de polvo oscuro; zonas de Atom y del año, apagadas
  const C0 = hex('#080b20'), C1 = hex('#131536'), C2 = hex('#25204e'), C3 = hex('#3e2668'), C4 = hex('#6a3486'), C5 = hex('#a85a9a'), A1 = hex('#14305a'), A2 = hex('#1e4a7a');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let n1 = Math.sin(x * 0.031 + y * 0.017) + Math.sin(x * 0.011 - y * 0.041 + 2) * 0.8 + Math.sin((x - y) * 0.07) * 0.25 + Math.sin(x * 0.13 + y * 0.09) * 0.12 + (hh(x >> 1, y >> 1, 1) - 0.5) * 0.35;
    const n2 = Math.sin(x * 0.024 - y * 0.02 + 4) + Math.sin(y * 0.05 + x * 0.006) * 0.6 + (hh(x >> 1, y >> 1, 7) - 0.5) * 0.3;
    const polvo = Math.sin(x * 0.045 + y * 0.11 + Math.sin(x * 0.02) * 2) > 0.86;
    const d = (((x & 1) * 2 + (y & 1) * 3) % 4) / 4 * 0.18;
    let c = C0; if (n2 + d > 0.9) c = A1; if (n2 + d > 1.25) c = A2;
    if (n1 + d > 0.55) c = C1; if (n1 + d > 0.95) c = C2; if (n1 + d > 1.3) c = C3; if (n1 + d > 1.62) c = C4; if (n1 + d > 1.9) c = C5;
    if (polvo && c !== C0) c = mez(c, C0, 0.6);
    if ((x > 270 && y < 50) || (x > 16 && x < 174 && y < 17)) c = mez(c, C0, 0.75);
    R.pset(x, y, c); }
  for (let i = 0; i < 520; i++) { const x = Math.floor(hh(i, 1, 2) * 320), y = Math.floor(hh(i, 2, 3) * 180); if ((x > 270 && y < 50) || (y < 17 && x < 174)) continue; const b = hh(i, 3, 4);
    R.pset(x, y, b > 0.9 ? hex('#ffffff') : b > 0.6 ? hex('#c8c8f0') : hex('#6a70a0')); if (b > 0.97) { R.pset(x + 1, y, hex('#8a90c0')); R.pset(x - 1, y, hex('#8a90c0')); R.pset(x, y + 1, hex('#8a90c0')); R.pset(x, y - 1, hex('#8a90c0')); } }
  // dos galaxias lejanas en espiral
  for (const [gx, gy, gs, c1, c2] of [[44, 34, 1, hex('#a87ad8'), hex('#e0c8ff')], [222, 150, 0.7, hex('#7aa0d8'), hex('#d0e4ff')]]) {
    for (let k = 0; k < 170; k++) { const r = k * 0.12 * gs, a2 = k * 0.35; R.pset(Math.round(gx + Math.cos(a2) * r * 1.6), Math.round(gy + Math.sin(a2) * r * 0.7), k % 3 ? c1 : c2); }
    R.disco(gx, gy, 2, c2); }
});
const tierra = (cx, cy, r, num, t, s = 1) => { r = Math.round(r * s); if (r < 2) return;
  const pal = num === 616 ? [hex('#2a6ad8'), hex('#3aa85a'), hex('#9ae0ff')] : num === 828 ? [hex('#3ab0a8'), hex('#f0c8a0'), hex('#c8fff0')] : [hex('#6a5a8a'), hex('#9a8ab0'), hex('#d8c8f0')];
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const lon = Math.asin(Math.max(-1, Math.min(1, i / Math.sqrt(Math.max(1, r * r - j * j))))) + t * 0.4;
    const tierraQ = hh(Math.floor(lon * 4 + 20), Math.floor((j / r + 1) * 4), num % 97) > 0.55; let col = tierraQ ? pal[1] : pal[0];
    if (i + j > r * 0.6) col = mez(col, K, 0.45); else if (i + j < -r * 0.8) col = mez(col, pal[2], 0.4); if (d > r - 1) col = pal[2]; R.pset(cx + i, cy + j, col); }
  if (num === 828) for (let a2 = 0; a2 < 6.28; a2 += 0.03) { const x = Math.round(cx + Math.cos(a2) * r * 1.5), y = Math.round(cy + Math.sin(a2) * r * 0.35); if (Math.sin(a2) < 0 && Math.hypot(x - cx, y - cy) < r) continue; R.pset(x, y, hex('#f0d0a0')); }
  luz(cx, cy, r + 8, pal[2], 0.25);
};
const p5 = (t) => {
  pegar(fondo5());
  // estrellas que titilan, un cometa que cruza y una estrella fugaz
  for (let i = 0; i < 18; i++) { const x = Math.floor(hh(i, 5, 6) * 260) + 4, y = Math.floor(hh(i, 6, 7) * 120) + 20; if (Math.sin(t * 3 + i * 1.7) > 0.5) chispa(x, y, hex('#c8d8ff')); }
  { const u = ((t - P5) * 0.7) % 1; if (u < 0.3) { const x = Math.round(300 - u * 300), y = Math.round(30 + u * 90); for (let k = 0; k < 8; k++) R.pset(x + k, y - Math.round(k * 0.3), mez(BL, hex('#080b20'), k / 8)); } }
  { const u = ((t - P5) * 0.12) % 1, x = Math.round(lerp(330, -20, u)), y = Math.round(lerp(60, 90, u)); for (let k = 0; k < 12; k++) R.pset(x + k, y - Math.round(k * 0.1), mez(hex('#e8f4ff'), hex('#0a0e26'), k / 12)); }
  const r = 30, cy = 122;
  const e2 = tramo(t, e828 - 0.2, e828 + 0.6), e3 = tramo(t, fox - 0.2, fox + 0.6);
  // las placas con los números, debajo de cada Tierra
  const placa = (x, txt) => { R.rect(x - 20, 158, x + 20, 174, K); R.rect(x - 19, 159, x + 19, 173, hex('#2a2e4a')); R.rect(x - 19, 159, x + 19, 159, hex('#5a6090')); R.numero(txt, x, 172, { tam: 16, centro: true }); };
  tierra(62, cy, r, 616, t); placa(62, '616');
  if (e2 > 0) { tierra(160, Math.round(cy + (1 - e2) * 30), r, 828, t, e2); if (e2 >= 1) placa(160, '828'); }
  if (e3 > 0) { const g = t < fox + 0.8 && Math.floor(t * 12) % 2; tierra(258, cy, r, 0, t, e3); if (e3 >= 1) { placa(258, '?'); } if (g) luz(258, cy, 36, hex('#d8c8f0'), 0.4); }
  // los equipos de pie encima de cada Tierra (los de los lados, más abajo por la curva)
  const equipo = (cx, defs, t0, opc) => defs.forEach((d, i) => { const dx = (i - (defs.length - 1) / 2) * 15, top = cy - Math.round(Math.sqrt(Math.max(0, r * r - dx * dx))) + 1;
    const u = tramo(t, t0 + i * 0.12, t0 + 0.4 + i * 0.12); if (u <= 0) return; R.actor(d, Math.round(cx + dx - 7), top, t, { dir: dx < 0 ? -1 : 1, salto: Math.round((1 - u) * 26), quieto: u < 1, ...opc(i) }); });
  equipo(62, [EL.thor, EL.sam, EL.bucky, EL.shangchi], P5 - 1, (i) => ({ brazos: i === 0 && t > P5 + 0.2 && t < P5 + 1.2, sonrisa: true }));
  if (e2 >= 1) equipo(160, [EL.reed, EL.sue, EL.antorcha], cuatro - 0.3, (i) => ({ brazos: t > cuatro + 0.4 && t < cuatro + 1.4 && i === 1, sonrisa: true }));
  if (e2 >= 1) { const cu = tramo(t, cuatro + 0.2, cuatro + 0.6); if (cu > 0) R.actor(EL.cosa, 160 + 24, cy - Math.round(Math.sqrt(r * r - 30 * 30 * 0.6)) + 6, t, { dir: 1, salto: Math.round((1 - cu) * 26), sonrisa: cu >= 1 }); }
  if (e3 >= 1) equipo(258, [EL.ciclope, EL.lobezno, EL.mistica], xmen - 0.3, (i) => ({ sorpresa: t < xmen + 1 && i === 2 }));
};
// 6 · el mapa del fan: tres Tierras y la «?»
// las fotos clavadas en el corcho, con un pictograma de cada equipo (escudo y martillo, el 4, la X)
const FOTOS = [[118, 30, 'm'], [176, 30, '4'], [100, 122, 'x'], [196, 124, 'e']];
const foto = (x, y, ic, t, brilla) => { R.rect(x - 9, y - 9, x + 9, y + 11, K); R.rect(x - 8, y - 8, x + 8, y + 10, hex('#f2eee2')); R.rect(x - 6, y - 6, x + 6, y + 5, hex('#2a3a5a'));
  if (ic === 'm') { T.PIEZAS_DO.escudo(R, x - 2, y, { r: 4 }); R.rect(x + 2, y - 4, x + 6, y - 2, hex('#c0c4d4')); R.rect(x + 4, y - 1, x + 4, y + 3, hex('#7a4a24')); }
  if (ic === '4') { R.disco(x, y, 5, hex('#4a8ad8')); R.numero('4', x + 2, y + 4, { color: BL, sombra: false }); }
  if (ic === 'x') { R.disco(x, y, 5, hex('#e8c040')); R.linea(x - 3, y - 3, x + 3, y + 3, K); R.linea(x + 3, y - 3, x - 3, y + 3, K); }
  if (ic === 'e') { R.disco(x, y, 5, hex('#3aa86a')); R.disco(x, y, 3, hex('#2a6ad8')); }
  R.disco(x, y - 9, 2, hex('#d82a2a')); R.pset(x - 1, y - 10, BL);
  if (brilla) { for (let k = 0; k < 4; k++) R.rect(x - 10 - k % 2, y - 10, x + 10, y - 10, hex('#fff2b0')); luz(x, y, 18, hex('#fff2b0'), 0.35); } };
const p6 = (t) => {
  T.hoy(R, t, { encuadre: 'cuarto', camara: 'mapa', mapa: lerp(0.72, 0.84, tramo(t, P6, noconf)) });
  // las fotos clavadas, con su hilo rojo a la «?» del centro (recortado al corcho)
  R.recorte([36, 18, 256, 140]); for (const [x, y] of FOTOS) { const d = Math.hypot(146 - x, 79 - y), ex = Math.round(146 - (146 - x) / d * 12), ey = Math.round(79 - (79 - y) / d * 12); R.linea(x, y, ex, ey, hex('#a01a1a')); R.linea(x + 1, y, ex + 1, ey, hex('#d82a2a')); R.disco(ex, ey, 1, hex('#d82a2a')); } R.recorte(null);
  const cu = t < tres - 0.7 ? 1 : t < tres - 0.35 ? 2 : 3;
  FOTOS.forEach(([x, y, ic], i) => foto(x, y, ic, t, t > P6 + 0.2 && t < noconf && i < 3 && i < cu));
  const se = t > noconf && t < noconf + 2.2, ras = t > noconf + 2.2;
  T.palomitas(R, 280, 176, t, { s: 2, dir: -1, cuenta: t > P6 + 0.2 && t < noconf ? cu : undefined, señala: se ? [146, 79] : undefined, expresion: ras ? 'susto' : t > tres ? 'emocion' : 'normal', asiente: t > tres && t < noconf });
  if (t > tres - 0.1 && t < noconf) { R.numero('3', 262, 116, { tam: 16, centro: true }); destello(262, 108, tramo(t, tres - 0.1, tres + 0.5), 6, 22); }
  if (ras) globo(282, 128, '?');
  if (se) luz(146, 79, 24, hex('#fff2b0'), 0.35 * (0.6 + 0.4 * Math.sin(t * 8)));
};
const efectos = [[thor, 'trueno'], [cap - 0.5, 'whoosh'], [P2, 'puerta'], [ant, 'pop'], [loki, 'brillo'], [shang - 0.4, 'whoosh'], [anio, 'golpecito'], [shuri, 'golpecito'], [pantera, 'brillo'], [namor, 'chof'], [P4 + 0.2, 'ola'], [tb - 0.2, 'whoosh'], [e828, 'pop'], [cuatro, 'golpecito'], [fox, 'brillo'], [tres, 'pop'], [noconf + 2.2, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2026 });
''')
