import json
import os
import re

E = {}

# los instantes: @marca@s@ (s en segundos de la escena, de las palabras de linea.json) → en('marca', fracción)
_raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_M = json.load(open(os.path.join(_raiz, 'atomo/plato/escenas/marcas-ep41.json'), encoding='utf-8'))


def _en(cuerpo, id_):
    m = _M[id_]['marcas']
    def f(g):
        k, s = g.group(1), float(g.group(2))
        a, b = m[k], m.get(k + '_fin', m[k] + 12)
        return f"en('{k}', {(s - a) / (b - a):.4f})"
    return re.sub(r'@(\w+)@([\d.]+)@', f, cuerpo)


# piezas comunes de las cuatro escenas (van al principio de cada cuerpo)
COMUN = r'''
import * as DO from '/atomo/plato/escenas/do-comun.js';
const K = hex('#141018'), BL = hex('#f4f0e6'), AMA = hex('#ffe070'), AMAL = hex('#fff6c8'), ROJO = hex('#e8303a'), VERDE = hex('#3ae88a'), VERDES = hex('#1a8a4a');
const H = (s) => hex(s), HS = (...a) => a.map(hex);
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const azar = (a, b = 0, c = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], b4 = (x, y) => B4[((y & 3) << 2) | (x & 3)] / 16;
const rampa = (cs, v, x, y) => { const n = cs.length - 1; v = Math.max(0, Math.min(n, v)); const i = Math.floor(v); return cs[Math.min(n, i + (v - i > b4(x, y) ? 1 : 0))]; };
const pinta = (x0, y0, x1, y1, f) => { x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0)); x1 = Math.min(319, Math.round(x1)); y1 = Math.min(179, Math.round(y1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = f(x, y); if (c != null) R.pset(x, y, c); } };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const velo = (x0, y0, x1, y1, col, a) => pinta(x0, y0, x1, y1, (x, y) => mez(R.pget(x, y), col, a));
const calma = (x, y) => (x >= 18 && x <= 172 && y <= 15) || (x >= 18 && x <= 48 && y <= 21) || (x >= 276 && y <= 46);
const FIJ = {};
const fijo = (clave, dib) => { if (!FIJ[clave]) { const b = R.nuevo(), prev = R.usar(b); R.recorte(null); dib(); R.recorte(null); R.usar(prev); FIJ[clave] = b; } return FIJ[clave]; };
const pegar = (b) => R.copiar(b);
// un actor del reparto pintado con otro color (silueta) o de otra escala: col(c) da el color de cada píxel
const BUFA = R.nuevo();
const escalado = (def, x0, y0, s, t, o, col, clip = null) => { R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); R.actor(def, 20, 44, t, o); R.usar(prev);
  for (let j = 4; j < 46; j++) for (let i = 4; i < 48; i++) { const c = BUFA[j * 320 + i]; if (!c) continue; const cc = col ? col(c, i, j) : c; if (cc == null) continue; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const px = x0 + (i - 8) * s + a, py = y0 + (j - 4) * s + b; if (!clip || (px >= clip[0] && px <= clip[2] && py >= clip[1] && py <= clip[3])) R.pset(px, py, cc); } } };
// silueta: el actor de un solo color con un filo de luz arriba (borde: color del filo)
const sil = (def, x, suelo, t, o, c, borde = null, clip = null) => escalado(def, x - 12, suelo - 40, 1, t, o, (cc, i, j) => (borde && !BUFA[(j - 1) * 320 + i] ? borde : c), clip);
// un actor a escala s (en una pantalla): esquina de arriba a la izquierda (x0, y0)
const grande = (def, x0, y0, s, t, o, clip) => escalado(def, x0, y0, s, t, o, null, clip);
// una entrada de cine (w × h): papel crema con su troquel, una franja de color y la butaca dibujada
const entrada = (x, y, w, hh, col, oro = 0) => { caja(x, y, x + w, y + hh, oro > 0.5 ? H('#ffd860') : H('#f2ead2')); R.rect(x + 1, y + 1, x + 4, y + hh - 1, oro > 0.5 ? H('#c8902a') : col);
  for (let j = y + 2; j < y + hh - 1; j += 2) R.pset(x + 6, j, H('#8a8070')); R.rect(x + 9, y + 3, x + w - 3, y + 3, H('#8a8070')); R.rect(x + 9, y + 5, x + w - 6, y + 5, H('#b8b0a0'));
  if (hh >= 10) { R.rect(x + w - 7, y + hh - 5, x + w - 3, y + hh - 3, oro > 0.5 ? H('#8a5a10') : H('#5a5a6a')); R.rect(x + w - 7, y + hh - 7, x + w - 7, y + hh - 3, oro > 0.5 ? H('#8a5a10') : H('#5a5a6a')); }
  if (oro > 0.5 && (Math.floor((x + y) * 0.3) % 3 === 0)) R.pset(x + w - 2, y + 1, BL); };
// el símbolo de la pantalla gigante (un rectángulo curvo con una flecha a cada lado): pictograma IMAX sin letras
const pictoGigante = (cx, cy, c) => { for (let i = -9; i <= 9; i++) { const y = cy - 4 + Math.round((i * i) / 30); R.pset(cx + i, y, c); R.pset(cx + i, y + 7, c); } R.rect(cx - 9, cy - 4, cx - 9, cy + 3, c); R.rect(cx + 9, cy - 4, cx + 9, cy + 3, c); };
// una bandera pequeña (13 × 9) de cada país, sin escudos
const bandera = (x, y, pais) => { R.rect(x - 1, y - 1, x + 13, y + 9, K);
  if (pais === 'eeuu') { for (let j = 0; j < 9; j++) R.rect(x, y + j, x + 12, y + j, j % 2 ? BL : ROJO); R.rect(x, y, x + 5, y + 4, H('#2a3a8a')); for (const [i, j] of [[1, 1], [3, 1], [2, 2], [4, 2], [1, 3], [3, 3]]) R.pset(x + i, y + j, BL); }
  else if (pais === 'mexico') { R.rect(x, y, x + 3, y + 8, H('#1a8a4a')); R.rect(x + 4, y, x + 8, y + 8, BL); R.rect(x + 9, y, x + 12, y + 8, ROJO); R.rect(x + 5, y + 3, x + 7, y + 5, H('#8a6a3a')); }
  else if (pais === 'espana') { R.rect(x, y, x + 12, y + 8, ROJO); R.rect(x, y + 2, x + 12, y + 6, H('#f8c830')); R.rect(x + 3, y + 3, x + 4, y + 5, H('#c8302a')); }
  else if (pais === 'ru') { R.rect(x, y, x + 12, y + 8, H('#2a3a8a')); for (let i = 0; i <= 12; i++) { R.pset(x + i, y + Math.round(i * 8 / 12), BL); R.pset(x + i, y + 8 - Math.round(i * 8 / 12), BL); } R.rect(x, y + 3, x + 12, y + 5, BL); R.rect(x + 5, y, x + 7, y + 8, BL); R.rect(x, y + 4, x + 12, y + 4, ROJO); R.rect(x + 6, y, x + 6, y + 8, ROJO); }
  else if (pais === 'china') { R.rect(x, y, x + 12, y + 8, ROJO); R.rect(x + 2, y + 2, x + 3, y + 3, AMA); R.pset(x + 1, y + 2, AMA); R.pset(x + 4, y + 2, AMA); R.pset(x + 2, y + 1, AMA); for (const [i, j] of [[6, 1], [7, 3], [7, 5], [6, 7]]) R.pset(x + i, y + j, AMA); } };
// el reloj de arena (h ≈ 16): u 0–1 la arena que baja, giro 0–1 la vuelta
const arena = (cx, cy, u, giro = 0) => { const a = giro * Math.PI, s = Math.cos(a), ss = Math.abs(s) < 0.2 ? 0.2 : s;
  if (Math.abs(s) < 0.5) { R.rect(cx - 8, cy - 2, cx + 8, cy + 2, H('#8a5a2a')); R.rect(cx - 8, cy - 1, cx + 8, cy + 1, H('#c8e0f0')); return; }
  const sg = s > 0 ? 1 : -1; R.rect(cx - 6, cy - 9, cx + 6, cy - 8, H('#8a5a2a')); R.rect(cx - 6, cy + 8, cx + 6, cy + 9, H('#8a5a2a'));
  for (let j = -7; j <= 7; j++) { const w = Math.max(1, Math.round(Math.abs(j) * 0.7)); R.pset(cx - w - 1, cy + j, K); R.pset(cx + w + 1, cy + j, K); for (let i = -w; i <= w; i++) R.pset(cx + i, cy + j, H('#d8ecf8')); }
  const top = sg > 0 ? 1 - u : u; for (let j = 1; j <= 7; j++) { const w = Math.max(0, Math.round(j * 0.7) - 1); if (j / 7 <= top) for (let i = -w; i <= w; i++) R.pset(cx + i, cy - sg * (8 - j), H('#e8b848')); if (j / 7 > 1 - (1 - top)) for (let i = -w; i <= w; i++) R.pset(cx + i, cy + sg * (8 - j), H('#e8b848')); }
  if (u > 0 && u < 1) R.pset(cx, cy, H('#e8b848')); };
// cielo nocturno tramado con nubes de tres tonos a tres velocidades y estrellas (fondo de ciudad)
const cieloNoche = (x0, y0, x1, y1, t, tonos = HS('#0e1230', '#161c44', '#20285a', '#2c3470')) => {
  pinta(x0, y0, x1, y1, (x, y) => rampa(tonos, (y - y0) / (y1 - y0) * 3 + (azar(x >> 3, y >> 3) - 0.5) * 0.3, x, y));
  for (let k = 0; k < 40; k++) { const x = x0 + Math.round(azar(k, 1) * (x1 - x0)), y = y0 + Math.round(azar(k, 2) * (y1 - y0) * 0.7); if (!calma(x, y) && Math.sin(t * 2 + k) > -0.4) R.pset(x, y, k % 5 ? H('#a8b0d8') : BL); }
  for (const [v, cy, col, n] of [[3, y0 + 16, H('#3a4478'), 5], [6, y0 + 30, H('#2e366a'), 4], [10, y0 + 44, H('#4a5288'), 3]]) for (let k = 0; k < n; k++) { const cx = x0 + ((k * 97 + t * v) % (x1 - x0 + 60)) - 30; for (let i = -14; i <= 14; i++) for (let j = -3; j <= 3; j++) { const x = Math.round(cx + i), y = cy + j + (k % 2) * 6; if (x < x0 || x > x1 || calma(x, y)) continue; if (Math.abs(i) / 14 + Math.abs(j) / 3 < 1 && (x + y) % 2 === 0) R.pset(x, y, col); } } };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────── DD-CIFRAS
E['dd-cifras'] = ('Las cifras', '''// DD-CIFRAS (frases 27–28), 2026. Diez planos, cortados en la palabra:
// 1. la taquilla de un cine al atardecer: la cola compra, la flecha del panel sube; el primero sale con su entrada y da
//    un salto; pasan un niño con helado y un taxi (corta en «Disney's»);
// 2. el vestíbulo: el ejecutivo apunta en su pizarra; en «$50 million» escribe «$50» y la barra llega arriba; el contador
//    se dispara y a Atom le salta una palomita cada vez que sube (el gag 6); la cola se asombra (corta en «literally»);
// 3. el mostrador de la taquilla de cerca: la mano deja la última de diez entradas; el taco de calendario pasa de 9 a 12
//    en «three months»; en «seven out of ten» siete se vuelven doradas con la pantalla gigante y sale «7/10»;
// 4. el cuarto del fan de noche: en el monitor y en grande en el panel de la pared, el plano de butacas; el cursor va al
//    centro y en «best seat» la butaca se vuelve dorada; en «day one» el fan levanta los brazos (corta en «and because»);
// 5. el despacho del programador del cine: el tablero de salas por horarios se llena de fichas con la máscara en
//    «screens» y en «showtimes»; el programador señala y su compañera teclea; suena el teléfono del estudio;
// 6. la sala de cerca: en la pantalla, un reloj; la aguja corre dos horas y media y sale «2:30»; un espectador con un
//    vaso enorme se asusta; en «hasn't confirmed», «?» (corta en «It opens»);
// 7. el panel del mundo: las chinchetas caen y se clavan en el orden de la voz: 18 en Estados Unidos, 17 en España y
//    México; el reloj con la cuña de dos horas y media; la balda de folletos abajo;
// 8. el panel de paletas del vestíbulo: cinco filas con banderitas y su día; en «two days earlier» las de Reino Unido y
//    China giran de 18 a 16; dos fans miran y se sorprenden; pasa un acomodador con la escoba;
// 9. las puertas de las salas: el acomodador cierra el candado del cordón IMAX; un fan llega, se frena («!») y se va a la
//    puerta normal; el calendario tacha tres semanas en «three weeks»;
// 10. el multicine de noche: dos marquesinas, la IMAX con el desierto y el gusano que asoma en «Dune», la normal con la
//    máscara; las dos con «18» y un «=» en «same day»; focos que barren el cielo y un coche que pasa.''', _en(COMUN + r'''
const P2 = @ventas@4.75@, P3 = @ventas@9.72@, P4 = @ventas@14.15@, P5 = @ventas@18.05@, P6 = @estreno@23.76@, P7 = @estreno@28.65@, P8 = @estreno@34.25@, P9 = @estreno@38.35@, P10 = @estreno@43.35@;
// 1 · la taquilla al atardecer
const p1 = (t) => {
  const o = { encuadre: 'nyhoy', camara: 'taquilla', flecha: tramo(t, 0.6, P2 - 0.3) }, g = DO.mundo(R, t, o) || {}, su = g.suelo ?? 160;
  const paso = tramo(t, 2.9, 3.7), sale = tramo(t, 2.6, P2), compra = t > 1.2 && t < 2.6;
  // la cola (de cara a la taquilla) avanza un hueco cuando el primero se va
  [EL.chicaHoy, EL.senora30, EL.chico, EL.espectador].forEach((d, k) => { const x = Math.round(176 - k * 19 + paso * 19); R.actor(d, x, su, t, { dir: 1, anda: paso > 0 && paso < 1, habla: k === 1 && Math.sin(t * 6) > 0.3 && t < 2.5, sonrisa: k === 0 && t > 3.8 }); });
  // el que compra: pide, coge la entrada y sale de vuelta con ella en alto, dando un salto
  const fx = Math.round(lerp(196, 60, sale)), r = R.actor(EL.chicoHoy, fx, su, t, { dir: sale > 0 ? -1 : 1, anda: sale > 0 && sale < 1, dedo: compra, sostiene: t >= 2.2 ? [fx + (sale > 0 ? -3 : 18), su - 22] : false, sonrisa: t > 2.2, salto: t > 3.4 && t < 3.9 ? Math.round(Math.abs(Math.sin((t - 3.4) * 6)) * 4) : 0 });
  if (t >= 2.2) { const [hx, hy] = r.mano; entrada(hx - 6, hy - 6, 12, 7, ROJO); }
  // el niño del helado cruza por delante, en la acera
  const nx = Math.round(lerp(330, -30, tramo(t, 0.2, P2 - 0.2))); const rn = R.actor(EL.chica, nx, su + 6, t, { dir: -1, anda: true, sostiene: true });
  { const [hx, hy] = rn.mano; R.disco(hx, hy - 4, 2, H('#ffb8d0')); R.pset(hx - 1, hy - 5, BL); R.poligono([[hx - 2, hy - 2], [hx + 2, hy - 2], [hx, hy + 3]], H('#c8904a')); }
  if (t > 1.6 && t < 2.2) R.icono('!', 214, su - 46, AMA, K);
};
// 2 · el vestíbulo: el ejecutivo y la pizarra; el contador y las palomitas
const p2 = (t) => {
  const PAL = [P2 + 0.9, P2 + 2.0, @ventas@7.35@, @ventas@8.4@];
  const v = tramo(t, P2 + 0.3, @ventas@8.1@), o = { encuadre: 'vestibulo', ventas: v * v * 0.6 + v * 0.4, tope: 50, palomitas: PAL }; const g = T.cine(R, t, o);
  // la cajera detrás del mostrador
  R.actor(EL.espectadora, 56, 140, t, { dir: 1, habla: Math.sin(t * 5) > 0.2 && t < P2 + 2.5, sonrisa: t > @ventas@8.1@ });
  // la pizarra del ejecutivo (x 166–206): patas, marco, barras que suben y el «$50»
  const bx0 = 168, by0 = 104, bx1 = 206, by1 = 140;
  R.linea(bx0 + 4, by1, bx0 - 1, 160, K); R.linea(bx1 - 4, by1, bx1 + 1, 160, K); R.linea(bx0 + 5, by1, bx0, 160, H('#8a6440')); R.linea(bx1 - 5, by1, bx1, 160, H('#8a6440')); R.linea(bx0 + 19, by1, bx0 + 19, 158, H('#6a4a2a'));
  caja(bx0 - 1, by0 - 1, bx1 + 1, by1 + 1, H('#8a6440')); caja(bx0 + 1, by0 + 1, bx1 - 1, by1 - 1, H('#f6f2ea'), H('#c8c0b0'));
  for (let k = 0; k < 4; k++) { const hh = Math.round([6, 10, 15, 24][k] * Math.min(1, v * 1.4 - k * 0.12)); if (hh > 0) { R.rect(bx0 + 4 + k * 8, by1 - 3 - hh, bx0 + 9 + k * 8, by1 - 3, k === 3 ? H('#3ac85a') : H('#5a8ac8')); R.rect(bx0 + 4 + k * 8, by1 - 3 - hh, bx0 + 4 + k * 8, by1 - 3, H('#2a4a7a')); } }
  R.linea(bx0 + 3, by1 - 3, bx1 - 3, by1 - 3, K); R.linea(bx0 + 3, by0 + 3, bx0 + 3, by1 - 3, K);
  const w = tramo(t, @ventas@7.3@, @ventas@8.0@); if (w > 0) R.numero('$50', bx0 + 20, by0 + 12, { centro: true, n: Math.ceil(w * 30), color: H('#c8302a') });
  // el ejecutivo: señala la pizarra, escribe (la mano con el rotulador) y sonríe en «sold»
  const ej = R.actor(EL.ejecutivoDD, 146, 160, t, { dir: 1, dedo: t < @ventas@7.2@ && Math.sin(t * 2) > -0.5, sostiene: w > 0 && w < 1 ? [bx0 + 8 + Math.round(w * 18), by0 + 10] : false, habla: Math.sin(t * 6) > 0 && t < @ventas@7.2@, sonrisa: t > @ventas@8.5@ });
  if (w > 0 && w < 1) { const [hx, hy] = ej.mano; R.linea(hx, hy, hx + 3, hy - 4, K); R.pset(hx + 3, hy - 4, ROJO); }
  // la cola detrás de la cuerda: se asombra cuando el contador se dispara
  const asom = t > @ventas@8.1@ && t < @ventas@9.4@;
  [[EL.chica, 218], [EL.senor30, 236], [EL.vecina ?? EL.chicaHoy, 268], [EL.chicoHoy, 288]].forEach(([d, x], k) => R.actor(d, x, 160, t, { dir: -1, sorpresa: asom, habla: !asom && k === 1 && Math.sin(t * 5) > 0.4 }));
  T.cineDelante(R, t, o);
  if (asom) R.icono('!', 252, 116, AMA, K);
};
// 3 · el mostrador de cerca: diez entradas, el taco de calendario, siete doradas
const MOST = () => fijo('mostrador', () => {
  // la pared de terciopelo con costillas y el listón de latón; un marco con el plano de la sala
  pinta(0, 0, 319, 74, (x, y) => rampa(HS('#3a0e1a', '#5a1626', '#7a2234', '#8a2a3c'), 1.6 + Math.sin(x * 0.42) * 0.9 - (y < 10 ? 0.8 : 0) + (azar(x, y) - 0.5) * 0.4, x, y));
  R.rect(0, 72, 319, 75, H('#c8a04a')); R.rect(0, 72, 319, 72, H('#f0d880')); R.rect(0, 75, 319, 75, H('#6a4a1a'));
  caja(186, 22, 262, 66, H('#1e1a24'), H('#c8a04a')); R.rect(190, 26, 258, 28, H('#e8e0d0'));
  caja(56, 22, 104, 68, H('#0e2a16'), H('#c8a04a')); pinta(58, 24, 102, 66, (x, y) => rampa(HS('#0a2a14', '#14401e', '#1e5a2a'), 1 + Math.sin(x * 0.3 + y * 0.2) * 0.6 + (azar(x, y) - 0.5), x, y)); DO.e_mascara(R, 80, 44, 2, { capucha: true, ojos: 0.8 });
  for (const x of [20, 140, 172]) { R.rect(x, 30, x + 4, 46, H('#c8a04a')); R.rect(x - 2, 46, x + 6, 48, H('#8a6a2a')); R.disco(x + 2, 27, 4, H('#fff0b0')); R.disco(x + 2, 27, 2, BL); for (let j = 0; j < 14; j++) for (let i = -6 - j; i <= 6 + j; i++) if ((i + j) % 3 === 0) R.pset(x + 2 + i, 32 + j * 2, mez(H('#8a2a3c'), H('#fff0b0'), 0.25 - j * 0.015)); }
  for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) { const x = 194 + i * 7, y = 32 + j * 6; R.rect(x, y, x + 4, y + 3, (i + j) % 3 ? H('#a8283a') : H('#5a5a6a')); }
  // el mostrador de madera en perspectiva, con vetas y el canto
  pinta(0, 76, 319, 179, (x, y) => rampa(HS('#5a3418', '#7a4a24', '#9a6234', '#b87a44'), 1.4 + (y - 76) / 104 * 1.6 + (Math.sin(x * 0.11 + Math.sin(y * 0.33) * 3) > 0.8 ? -0.9 : 0) + (azar(x >> 1, y) - 0.5) * 0.4, x, y));
  R.rect(0, 76, 319, 78, H('#3a2010')); R.rect(0, 79, 319, 79, H('#c8945a'));
  // la caja registradora (izquierda), el rollo de entradas, el timbre y el bote de bolígrafos
  caja(8, 84, 70, 130, H('#5a5e6a')); R.rect(10, 86, 68, 92, H('#7a7e8a')); caja(16, 94, 62, 106, H('#1a2a1a')); R.numero('7.50', 39, 104, { centro: true, color: H('#7aff9a') });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) caja(14 + i * 8, 110 + j * 6, 19 + i * 8, 114 + j * 6, i === 5 ? H('#e8b848') : H('#c8ccd4'));
  caja(4, 132, 76, 142, H('#4a4e58')); R.rect(30, 134, 50, 138, H('#2a2e38'));
  R.disco(98, 100, 11, K); R.disco(98, 100, 10, H('#8a8e98')); R.disco(98, 100, 6, H('#e8e2d0')); R.disco(98, 100, 2, H('#6a6e78')); R.rect(98, 89, 110, 92, K); R.rect(99, 90, 110, 91, H('#e8e2d0'));
  R.disco(290, 128, 8, K); R.disco(290, 127, 7, H('#c8a04a')); R.disco(288, 125, 2, H('#f8e8a0')); R.rect(282, 134, 298, 137, H('#5a3a1a')); R.rect(289, 118, 291, 120, H('#8a6a2a'));
  caja(262, 84, 280, 112, H('#2a3a6a')); for (const [x, c] of [[265, '#e83a3a'], [270, '#3a8ae8'], [275, '#f0c830']]) { R.rect(x, 74, x + 1, 86, H(c)); R.rect(x, 74, x + 1, 75, K); }
  // un vaso de refresco y un papelito arrugado
  for (let k = 0; k < 7; k++) { const x = 20 + k * 9, y = 156 + (k % 3) * 4; R.disco(x, y, 3, K); R.disco(x, y, 2, k % 2 ? H('#c8a04a') : H('#a8acb4')); R.pset(x - 1, y - 1, BL); }
  for (let k = 0; k < 9; k++) { const x = 300 - k * 5 + Math.round(azar(k, 3) * 4), y = 150 + Math.round(azar(k, 4) * 20); R.disco(x, y, 2, H('#fff6d0')); R.pset(x + 1, y + 1, H('#e8c070')); }
  caja(240, 140, 254, 166, H('#e83a3a')); R.rect(241, 141, 253, 143, BL); R.linea(250, 128, 247, 141, H('#f0f0f0')); R.disco(222, 170, 4, H('#e8e2d0')); R.pset(221, 169, H('#b8b0a0'));
});
const p3 = (t) => {
  pegar(MOST());
  // el taco de calendario de mesa (x 208–252): las hojas pasan de 9 a 12
  const meses = tramo(t, @ventas@10.15@, @ventas@10.95@), mes = 9 + Math.min(3, Math.floor(meses * 4)), vuelo = (meses * 4) % 1;
  caja(206, 84, 254, 128, H('#3a3a44')); caja(209, 88, 251, 125, BL, H('#b8b0a0')); R.rect(210, 89, 250, 96, ROJO); for (const x of [216, 228, 240]) { R.rect(x, 84, x + 2, 90, H('#c8ccd4')); }
  R.numero(String(mes), 230, 120, { tam: 16, centro: true });
  if (meses > 0 && meses < 1) { const hy = 88 + Math.round(vuelo * 30); R.poligono([[209, 88], [251, 88], [251 - vuelo * 8, hy], [209 + vuelo * 8, hy]], H('#e8e2d0')); R.linea(209, 88, 251, 88, K); }
  // diez entradas en dos filas; la última la trae la mano
  const deja = tramo(t, P3 + 0.15, P3 + 0.9), oro = (i) => tramo(t, @ventas@11.8@ + i * 0.1, @ventas@11.9@ + i * 0.1);
  for (let i = 0; i < 10; i++) { const fil = Math.floor(i / 5), col = i % 5; let x = 104 + col * 20, y = 104 + fil * 22; if (i === 9) { x = Math.round(lerp(150, x, deja)); y = Math.round(lerp(174, y, deja)); }
    R.rect(x + 1, y + 1, x + 18, y + 15, mez(H('#5a3418'), K, 0.4)); entrada(x, y, 17, 14, ROJO, i < 7 ? oro(i) : 0); if (i < 7 && oro(i) > 0.5) pictoGigante(x + 11, y + 8, H('#8a5a10')); }
  const br = 1 - tramo(t, P3 + 0.9, P3 + 1.6); if (br > 0) { const hx = Math.round(lerp(150, 184, deja)), hy = Math.round(lerp(174, 126, deja)) + 14 + Math.round((1 - br) * 46); T.brazo(R, hx + 6, 192, hx, hy, '#2a3a5a', 1, {}); }
  const s = tramo(t, @ventas@12.3@, @ventas@12.6@); if (s > 0) R.numero('7/10', 152, 98 - Math.round((1 - s) * 6), { tam: 16, centro: true });
  if (t > @ventas@12.0@ && t < @ventas@13.2@) for (let k = 0; k < 6; k++) { const a = t * 3 + k, x = Math.round(152 + Math.cos(a) * (40 + k * 4)), y = Math.round(126 + Math.sin(a) * 18); R.pset(x, y, AMAL); R.pset(x + 1, y, AMA); }
};
// 4 · el cuarto del fan: el plano de butacas en el monitor
const p4 = (t) => {
  const o = { encuadre: 'cuarto' }, g = DO.hoy(R, t, o) || {}, su = g.suelo ?? 166;
  const elige = @ventas@16.45@, dia = @ventas@17.1@;
  const r = R.actor(EL.chicoHoy, 82, 141, t, { dir: -1, sorpresa: t > elige && t < dia, brazos: t > dia, sonrisa: t > elige, salto: t > dia && t < dia + 0.7 ? Math.round(Math.abs(Math.sin((t - dia) * 8)) * 3) : 0 });
  // el gato del puf se despierta con el salto; la hermana se asoma por la puerta
  R.actor(EL.chicaHoy, Math.round(lerp(330, 270, tramo(t, P4 + 0.4, P4 + 1.8))), su, t, { dir: -1, anda: t > P4 + 0.4 && t < P4 + 1.8, sorpresa: t > dia, habla: t > P4 + 1.8 && t < dia && Math.sin(t * 6) > 0 });
  DO.hoyDelante(R, t, o);
  // el monitor (18–64 × 102–127): el plano de butacas, la pantalla curva arriba y el cursor
  const [x0, y0, x1, y1] = [18, 102, 64, 127];
  R.rect(x0, y0, x1, y1, H('#0a0e1a')); for (let i = x0 + 4; i <= x1 - 4; i++) R.pset(i, y0 + 3 + Math.round(((i - 41) / 20) ** 2 * 2), H('#e8e8f0'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) { const x = x0 + 4 + i * 5, y = y0 + 8 + j * 4, centro = j === 2 && i === 4, ocupada = azar(i, j, 7) < 0.45 && !centro;
    R.rect(x, y, x + 2, y + 1, centro && t > elige ? (Math.floor(t * 6) % 2 ? AMA : H('#ffb030')) : ocupada ? H('#4a4a5a') : H('#3a8ae8')); }
  const cu = tramo(t, P4 + 0.5, elige), cx = Math.round(lerp(x1 - 6, x0 + 25, cu)), cy = Math.round(lerp(y1 - 3, y0 + 16, cu));
  R.pset(cx, cy, BL); R.pset(cx, cy + 1, BL); R.pset(cx + 1, cy + 1, BL); R.pset(cx, cy + 2, BL); R.pset(cx + 2, cy + 2, BL); R.pset(cx + 1, cy + 3, K);
  if (t > dia) { R.numero('1', 41, y1 - 1, { centro: true, color: AMA }); }
  // lo mismo en grande en el panel de la pared, donde lo proyecta: el plano de la sala, el cursor y la butaca dorada
  const [w0, w1, w2, w3] = (g.mapa ?? [170, 18, 266, 104]).map((v, i) => v + (i < 2 ? 4 : -4));
  pinta(w0, w1, w2, w3, (x, y) => rampa(HS('#0a0e1a', '#101830', '#16203e'), 1 + (y - w1) / 60 + (azar(x >> 1, y >> 1) - 0.5) * 0.4, x, y));
  for (let i = w0 + 8; i <= w2 - 8; i++) { const yy = w1 + 6 + Math.round(((i - (w0 + w2) / 2) / 40) ** 2 * 4); R.pset(i, yy, BL); R.pset(i, yy + 1, H('#8a9ab8')); }
  for (let j = 0; j < 6; j++) for (let i = 0; i < 12; i++) { const x = w0 + 8 + i * 6 + (i >= 6 ? 4 : 0), y = w1 + 18 + j * 9, cen = j === 3 && i === 5, oc = azar(i, j, 9) < 0.5 && !cen;
    caja(x, y, x + 4, y + 5, cen && t > elige ? (Math.floor(t * 6) % 2 ? AMA : H('#ffb030')) : oc ? H('#4a4a5a') : H('#3a8ae8')); }
  { const qx = Math.round(lerp(w2 - 6, w0 + 8 + 5 * 6 + 2, cu)), qy = Math.round(lerp(w3 - 4, w1 + 18 + 3 * 9 + 3, cu)); for (let k = 0; k < 6; k++) { R.pset(qx, qy + k, BL); if (k < 5) R.pset(qx + Math.floor(k / 1.5), qy + k, BL); } R.pset(qx + 1, qy + 6, K); }
  if (t > elige) { const cx2 = w0 + 8 + 5 * 6 + 2, cy2 = w1 + 18 + 3 * 9 + 2; R.anillo(cx2, cy2, 6 + Math.round((t * 8) % 3), AMA); }
  if (t > dia) R.numero('1', (w0 + w2) / 2, w3 - 2, { centro: true, color: AMA });
  if (t > elige && t < elige + 0.8) R.icono('!', 86, 106, AMA, K);
};
// 5 · el despacho del programador: el tablero de salas × horarios
const DESP = () => fijo('despacho', () => {
  // la pared de yeso con su trama, el zócalo de madera y la moqueta
  pinta(0, 0, 319, 136, (x, y) => rampa(HS('#7a8a9a', '#8a9aa8', '#9aaab8', '#aab8c4'), 2.2 - y / 136 * 0.8 + (azar(x >> 1, y >> 1) - 0.5) * 0.5 + (x > 276 && y < 46 ? -0.6 : 0), x, y));
  R.rect(0, 120, 319, 136, H('#6a4a2a')); for (let x = 0; x < 320; x += 22) R.rect(x, 120, x, 136, H('#4a3018')); R.rect(0, 120, 319, 120, H('#9a6a3a'));
  pinta(0, 137, 319, 179, (x, y) => rampa(HS('#2a3448', '#34405a', '#3e4c68'), 1 + (y - 137) / 43 + ((x + y * 2) % 7 === 0 ? -0.6 : 0) + (azar(x, y) - 0.5) * 0.4, x, y));
  // la ventana con la ciudad de día y la persiana
  caja(10, 22, 62, 96, H('#9ac8e8'), H('#e8e2d0')); pinta(12, 24, 60, 94, (x, y) => rampa(HS('#bfe0f4', '#9ac8e8', '#7ab0d8'), (y - 24) / 30, x, y));
  for (const [x, w, hh] of [[14, 10, 40], [26, 8, 56], [36, 12, 30], [50, 9, 48]]) { R.rect(x, 94 - hh, x + w, 94, H('#6a7a90')); for (let j = 94 - hh + 3; j < 92; j += 5) for (let i = x + 2; i < x + w - 1; i += 3) R.pset(i, j, H('#c8d8e8')); }
  for (let y = 26; y < 50; y += 3) R.rect(12, y, 60, y, H('#e8e2d0')); R.rect(10, 96, 62, 99, H('#e8e2d0'));
  // el tablero de corcho con la rejilla: seis salas (filas) por siete horarios (columnas)
  caja(78, 24, 262, 120, H('#c89a5a'), H('#5a3a1a')); pinta(80, 26, 260, 118, (x, y) => rampa(HS('#a8783a', '#b8884a', '#c89a5a'), 1 + (azar(x, y) - 0.5) * 1.6, x, y));
  for (let j = 0; j < 6; j++) { caja(82, 37 + j * 13, 96, 48 + j * 13, H('#1a1a24')); T.a_cifras(R, String(j + 1), 89, 47 + j * 13); }
  for (let i = 0; i < 7; i++) { const cx = 110 + i * 21; R.disco(cx, 31, 4, K); R.disco(cx, 31, 3, BL); R.linea(cx, 31, cx, 29, K); R.linea(cx, 31, cx + 1 + (i % 3), 31, K); }
  for (let j = 0; j <= 6; j++) R.linea(100, 36 + j * 13, 258, 36 + j * 13, H('#6a4a2a'));
  pinta(0, 137, 319, 179, (x, y) => rampa(HS('#2a3448', '#34405a', '#3e4c68', '#4a5a78'), 1 + (y - 137) / 30 + ((x + y * 2) % 7 === 0 ? -0.7 : 0) + (azar(x >> 1, y) - 0.5) * 0.5, x, y));
  // la pared: un reloj, un calendario, una balda con latas de película y una fuente de agua; la pantalla de la mesa
  R.disco(290, 70, 10, K); R.disco(290, 70, 9, BL); R.linea(290, 70, 290, 63, K); R.linea(290, 70, 295, 72, K);
  caja(272, 88, 312, 116, H('#f2ead2')); R.rect(273, 89, 311, 95, ROJO); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R.rect(276 + i * 6, 99 + j * 5, 279 + i * 6, 101 + j * 5, H('#b8b0a0'));
  R.rect(0, 100, 10, 102, H('#6a4a2a')); for (let k = 0; k < 3; k++) { R.disco(5, 96 - k * 4, 4, K); R.disco(5, 96 - k * 4, 3, H('#8a8e98')); R.pset(5, 96 - k * 4, K); }
  caja(66, 98, 76, 136, H('#c8d8e8')); R.rect(67, 99, 75, 110, H('#7ab0e8')); R.rect(68, 112, 74, 114, H('#3a3e48'));
  caja(200, 112, 250, 140, H('#2a2e38')); R.rect(222, 140, 228, 144, H('#4a4e58'));
});
const p5 = (t) => {
  pegar(DESP());
  const fichas = tramo(t, P5 + 0.6, @ventas@22.6@), sal = t > @ventas@20.9@, hor = t > @ventas@21.7@;
  // las fichas: verdes con la máscara (la película) y grises (las demás); se llenan fila a fila
  for (let j = 0; j < 6; j++) for (let i = 0; i < 7; i++) { const k = j * 7 + i, on = fichas * 42 > k, masc = (i + j) % 3 !== 2 || j < 2; if (!on) continue; const x = 102 + i * 21, y = 38 + j * 13;
    caja(x, y, x + 15, y + 9, masc ? H('#2a8a4a') : H('#8a8a96')); if (masc) { R.rect(x + 5, y + 2, x + 10, y + 7, H('#9aa0aa')); R.pset(x + 6, y + 4, K); R.pset(x + 9, y + 4, K); R.rect(x + 6, y + 6, x + 9, y + 6, K); } }
  if (sal) for (let j = 0; j < 6; j++) if (Math.floor(t * 4 + j) % 2) R.rect(82, 37 + j * 13, 96, 37 + j * 13, AMA);
  if (hor) for (let i = 0; i < 7; i++) if (Math.floor(t * 4 + i) % 2) R.anillo(110 + i * 21, 31, 5, AMA);
  // la pantalla del ordenador con la gráfica que sube
  R.rect(203, 115, 247, 137, H('#0a1a2a')); for (let i = 0; i < 40; i++) { const hh = Math.round(3 + i * 0.4 * fichas + Math.sin(i + t * 3) * 1.5); R.pset(205 + i, Math.max(116, 135 - hh), H('#3ae88a')); }
  // el programador señala el tablero; su compañera teclea; el teléfono suena y ella lo coge
  const pr = R.actor(EL.senor30, Math.round(lerp(20, 140, tramo(t, P5 + 0.1, P5 + 1.4))), 170, t, { dir: 1, anda: t > P5 + 0.1 && t < P5 + 1.4, dedo: t > P5 + 1.4, habla: t > P5 + 1.6 && Math.sin(t * 6) > 0.2, sonrisa: hor });
  const suena = t > P5 + 0.8 && t < P5 + 2.4;
  R.actor(EL.tecnica, 262, 153, t, { dir: -1, sostiene: t > P5 + 2.4 && t < P5 + 4.2 ? true : false, habla: t > P5 + 2.6 && t < P5 + 4.2 && Math.sin(t * 7) > 0 });
  pinta(190, 146, 319, 152, (x, y) => rampa(HS('#7a5634', '#9a6e44', '#b8865a'), 2.4 - (y - 146) * 0.4 + (Math.sin(x * 0.2) > 0.85 ? -0.8 : 0), x, y)); R.rect(190, 145, 319, 145, K);
  pinta(194, 153, 319, 179, (x, y) => rampa(HS('#3a2614', '#4a321c', '#5a3e24'), 1 + (Math.sin(x * 0.07 + y * 0.4) > 0.8 ? -0.7 : 0) + (x % 40 === 0 ? -1 : 0), x, y)); R.rect(194, 153, 194, 179, K);
  R.rect(256, 140, 280, 145, BL); R.rect(258, 138, 278, 140, H('#e8e2d0')); R.rect(290, 126, 306, 145, H('#8a5a3a')); for (const [dx, dy] of [[-6, -10], [0, -16], [6, -12], [-3, -20], [4, -22]]) R.disco(298 + dx, 126 + dy, 5, H('#3a8a4a'));
  const tx = 240, ty = 143; caja(tx - 8, ty - 4, tx + 8, ty + 3, H('#2a2a34')); if (t < P5 + 2.4 || t > P5 + 4.2) { R.rect(tx - 7, ty - 7, tx + 7, ty - 5, H('#3a3a44')); }
  if (suena && Math.floor(t * 8) % 2) { R.linea(tx - 11, ty - 10, tx - 9, ty - 8, AMA); R.linea(tx + 10, ty - 10, tx + 8, ty - 8, AMA); R.icono('!', tx - 3, ty - 22, AMA, K); }
  // la puerta del despacho entreabierta con el pasillo y alguien que pasa con cajas de película
  const px = Math.round(lerp(-20, 110, tramo(t, P5 + 2, P6))); if (px > -18) { const rt = R.actor(EL.tecnico, px, 178, t, { dir: 1, anda: true, sostiene: true }); const [hx, hy] = rt.mano; for (let k = 0; k < 3; k++) { R.disco(hx + 2, hy - 2 - k * 3, 5, K); R.disco(hx + 2, hy - 2 - k * 3, 4, H('#8a8e98')); R.pset(hx + 2, hy - 2 - k * 3, K); } }
};
// 6 · la sala de cerca: el reloj de dos horas y media en la pantalla
const reloj30 = (R2, t, [x0, y0, x1, y1]) => {
  pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#0a0c1a', '#141a34', '#1e2650'), 1 + Math.sin((x + y) * 0.05 + t * 0.4) * 0.6 + (azar(x >> 2, y >> 2) - 0.5) * 0.5, x, y));
  const cx = Math.round((x0 + x1) / 2) - 30, cy = Math.round((y0 + y1) / 2) + 2, rr = 34, u = tramo(t, @estreno@24.4@, @estreno@25.4@), fin = u * 2.5 / 12 * Math.PI * 2;
  R.disco(cx, cy, rr + 3, K); R.disco(cx, cy, rr + 2, H('#c8a04a')); R.disco(cx, cy, rr, H('#f2ead2'));
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i, j); if (d > rr - 1 || d < 4) continue; let a = Math.atan2(i, -j); if (a < 0) a += Math.PI * 2; if (a <= fin && (i + j) % 2 === 0) R.pset(cx + i, cy + j, H('#f0803a')); }
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.linea(Math.round(cx + Math.sin(a) * (rr - 5)), Math.round(cy - Math.cos(a) * (rr - 5)), Math.round(cx + Math.sin(a) * (rr - 2)), Math.round(cy - Math.cos(a) * (rr - 2)), K); }
  const am = u * 2.5 * Math.PI * 2; R.linea(cx, cy, Math.round(cx + Math.sin(am) * (rr - 6)), Math.round(cy - Math.cos(am) * (rr - 6)), K);
  R.linea(cx, cy, Math.round(cx + Math.sin(fin) * (rr - 14)), Math.round(cy - Math.cos(fin) * (rr - 14)), K); R.linea(cx + 1, cy, Math.round(cx + 1 + Math.sin(fin) * (rr - 14)), Math.round(cy - Math.cos(fin) * (rr - 14)), K); R.disco(cx, cy, 2, ROJO);
  if (u >= 1) R.numero('2:30', cx + 70, cy + 8, { tam: 16, centro: true });
  if (t > @estreno@26.3@) { const s = Math.min(1, (t - @estreno@26.3@) * 4); R.icono('?', cx + 54, cy - 34 + Math.round((1 - s) * 6), AMA, K, 3); }
};
const p6 = (t) => {
  const o = { encuadre: 'cine', camara: 'pantalla', pantalla: reloj30, publico: 'normal' }; const g = DO.hoy(R, t, o) || {}, su = g.suelo ?? 176;
  const asusta = t > @estreno@25.1@ && t < @estreno@26.4@, duda = t > @estreno@26.4@;
  const r = R.actor(EL.chicoHoy, 120, su, t, { dir: 1, sostiene: true, sorpresa: asusta, triste: duda });
  { const [hx, hy] = r.mano; caja(hx - 3, hy - 14, hx + 4, hy + 1, ROJO); R.rect(hx - 2, hy - 13, hx + 3, hy - 11, BL); R.linea(hx + 2, hy - 20, hx, hy - 14, BL); }
  R.actor(EL.chicaHoy, 140, su, t, { dir: -1, habla: duda && Math.sin(t * 6) > 0, sonrisa: asusta });
  DO.hoyDelante(R, t, o);
};
// 7 · el panel del mundo: las chinchetas en el orden de la voz
const p7 = (t) => {
  const o = { encuadre: 'vestibulo', camara: 'mapa', fechas: 0, horas: 1 }; const g = T.cine(R, t, o), pin = g.pines ?? {};
  // la balda de folletos de abajo, con sus colores
  pinta(0, 152, 319, 179, (x, y) => rampa(HS('#2a1418', '#3a1c20', '#4a2428'), 1 + (Math.sin(x * 0.3 + y) > 0.85 ? -0.6 : 0), x, y)); R.rect(0, 152, 319, 153, H('#c8a04a'));
  for (let k = 0; k < 18; k++) { const x = 6 + k * 13, c = HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a', '#e8e2d0')[k % 5]; caja(x, 158 + (k % 2) * 2, x + 10, 176, c); R.rect(x + 2, 162 + (k % 2) * 2, x + 8, 163 + (k % 2) * 2, BL); R.rect(x + 2, 166 + (k % 2) * 2, x + 6, 166 + (k % 2) * 2, K); }
  const fases = [['eeuu', 18, @estreno@30.4@, [-2, -22]], ['espana', 17, @estreno@32.0@, [18, -16]], ['mexico', 17, @estreno@32.5@, [-2, 22]]];
  const COL = { 17: H('#ffd36a'), 18: H('#ff5a6a') };
  let mano = null;
  for (const [p, dia, ti, [dx, dy]] of fases) { const [x, y] = pin[p] ?? [100, 60]; if (t < ti - 0.7) continue;
    const u = tramo(t, ti - 0.7, ti); if (u < 1) { mano = [x, y, u]; continue; }
    const r = 2 + ((t * 1.4 + x) % 1) * 7; R.anillo(x + 0.5, y + 0.5, r, (Math.floor(r) & 1) ? COL[dia] : mez(COL[dia], K, 0.4)); R.linea(x, y, x + 1, y - 4, H('#c8ccd4')); R.disco(x + 1, y - 5, 2, COL[dia]); R.pset(x, y - 6, BL);
    const s = tramo(t, ti, ti + 0.25), px = x + dx, py = y + dy + Math.round((1 - s) * 4); R.linea(x + 1, y - 5, px, py - 4, H('#c8ccd4')); R.rect(px - 9, py - 11, px + 9, py + 2, H('#05060f')); R.rect(px - 8, py - 10, px + 8, py + 1, mez(COL[dia], K, 0.55)); T.a_cifras(R, String(dia), px, py); }
  // la chincheta que baja a clavarse (con su sombra que se encoge) antes de encenderse
  if (mano) { const [x, y, u] = mano, cae = Math.round((1 - u * u) * 20); R.disco(x + 1, y + 1, Math.max(1, 3 - Math.round(u * 2)), mez(H('#1a3a2a'), K, 0.5)); R.linea(x, y - cae, x + 1, y - 4 - cae, H('#c8ccd4')); R.disco(x + 1, y - 5 - cae, 3, K); R.disco(x + 1, y - 5 - cae, 2, H('#e8e2d0')); R.pset(x, y - 6 - cae, BL); }
};
// 8 · el panel de paletas del vestíbulo
const FLAP = () => fijo('paletas', () => {
  pinta(0, 0, 319, 140, (x, y) => rampa(HS('#2a0e18', '#3e1424', '#561c30', '#6a2438'), 1.4 + Math.sin(x * 0.45) * 0.8 + (azar(x, y) - 0.5) * 0.4 - (x > 276 && y < 46 ? 0.8 : 0), x, y));
  R.rect(0, 138, 319, 141, H('#c8a04a')); R.rect(0, 138, 319, 138, H('#f0d880'));
  pinta(0, 142, 319, 179, (x, y) => { const m = ((x >> 3) + (y >> 2)) % 4, d = ((x * 3 + y * 5) % 11 === 0); return d ? H('#e8b848') : m === 0 ? H('#2a3a6a') : m === 2 ? H('#3a1a3a') : H('#4a1e3a'); });
  caja(34, 22, 270, 134, H('#141418'), H('#c8a04a')); R.rect(36, 24, 268, 28, H('#2a2a30'));
  for (let j = 0; j < 5; j++) { const y = 31 + j * 20; R.rect(40, y, 264, y + 16, H('#1e1e24')); R.rect(40, y + 16, 264, y + 16, H('#0a0a0e'));
    for (let i = 0; i < 6; i++) { caja(118 + i * 12, y + 1, 128 + i * 12, y + 15, H('#2a2a32')); R.rect(119 + i * 12, y + 8, 127 + i * 12, y + 8, H('#0a0a0e')); }
    caja(206, y + 1, 220, y + 15, H('#2a2a32')); caja(222, y + 1, 236, y + 15, H('#2a2a32')); R.rect(207, y + 8, 235, y + 8, H('#0a0a0e')); }
  // los apliques de latón a los lados y un poste con su cuerda abajo
  for (const x of [14, 290]) { R.rect(x, 62, x + 6, 82, H('#c8a04a')); R.disco(x + 3, 60, 5, H('#fff0b0')); }
});
const p8 = (t) => {
  pegar(FLAP());
  const filas = [['eeuu', 18], ['mexico', 17], ['espana', 17], ['ru', 16], ['china', 16]], gira = @estreno@36.2@;
  filas.forEach(([p, dia], j) => { const y = 31 + j * 20; bandera(46, y + 3, p);
    for (let i = 0; i < 6; i++) { const on = Math.sin(t * 2 + i + j) > 0.6; R.rect(120 + i * 12, y + 3, 126 + i * 12, y + 6, on ? H('#3a8ae8') : H('#4a4a5a')); R.rect(120 + i * 12, y + 10, 126 + i * 12, y + 13, H('#3a3a44')); }
    let d = dia; const flap = j >= 3 ? tramo(t, gira + (j - 3) * 0.25, gira + (j - 3) * 0.25 + 0.5) : 1; if (j >= 3 && flap < 1) d = flap < 0.5 ? 18 : 17;
    const s = String(d); R.numero(s[0], 213, y + 13, { color: BL }); R.numero(s[1], 229, y + 13, { color: BL });
    if (flap > 0 && flap < 1 && Math.floor(t * 12) % 2) { R.rect(206, y + 7, 236, y + 9, H('#5a5a64')); }
    if (j >= 3 && flap >= 1 && t < gira + 2) R.anillo(221, y + 8, 12 + Math.round((t * 6) % 3), AMA); });
  // dos fans miran el panel; un acomodador barre por delante
  const asom = t > gira + 0.3;
  R.actor(EL.chica, 120, 164, t, { dir: 1, sorpresa: asom, dedo: asom && t < gira + 1.6, habla: !asom && Math.sin(t * 5) > 0.3 });
  R.actor(EL.chico, 140, 164, t, { dir: -1, sorpresa: asom, sonrisa: t > gira + 1.2 });
  const ax = Math.round(lerp(300, 180, tramo(t, P8 + 0.2, P9))); const ra = R.actor(EL.vecino ?? EL.senor30, ax, 172, t, { dir: -1, anda: true, sostiene: [ax - 4, 166] });
  R.linea(ra.mano[0], ra.mano[1], ra.mano[0] - 8, 172, H('#8a6440')); R.rect(ra.mano[0] - 12, 171, ra.mano[0] - 6, 173, H('#e8c848'));
  if (asom && t < gira + 1.4) R.icono('!', 131, 128, AMA, K);
};
// 9 · las puertas: el candado de la IMAX, tres semanas
const p9 = (t) => {
  const tacha = tramo(t, @estreno@41.7@, @estreno@42.7@), o = { encuadre: 'imax', semanas: Math.min(3, Math.floor(tacha * 3.99)) }; const g = T.cine(R, t, o), su = g.suelo ?? 160;
  const cierra = @estreno@40.0@, llega = tramo(t, P9 + 0.2, @estreno@40.4@), vuelve = tramo(t, @estreno@41.4@, P10 - 0.2);
  // el acomodador cierra el candado y señala la otra puerta
  R.actor(EL.espectadora, 160, su, t, { dir: -1, dedo: t > cierra - 0.6 && t < cierra + 0.3 || t > @estreno@41.0@ && t < @estreno@42.4@, sonrisa: t > @estreno@42.4@ });
  // el fan llega con su cubo de palomitas, se frena, se entristece y se va a la puerta normal
  const fx = vuelve > 0 ? Math.round(lerp(98, 232, vuelve)) : Math.round(lerp(-20, 98, llega));
  const r = R.actor(EL.chicoHoy, fx, su, t, { dir: 1, anda: (llega > 0 && llega < 1) || (vuelve > 0 && vuelve < 1), sorpresa: t > @estreno@40.4@ && vuelve === 0, triste: vuelve > 0, sostiene: true });
  { const [hx, hy] = r.mano; caja(hx - 3, hy - 6, hx + 4, hy + 1, ROJO); R.rect(hx - 2, hy - 5, hx + 3, hy - 4, BL); for (let k = 0; k < 4; k++) R.pset(hx - 2 + k * 2, hy - 7 - (k % 2), H('#fff6d0')); }
  if (t > @estreno@40.4@ && vuelve === 0) R.icono('!', fx + 4, su - 40, AMA, K);
  T.cineDelante(R, t, o);
  // el clic del candado: un destello en la placa
  if (t > cierra && t < cierra + 0.4) { R.anillo(101, 160, 5 + Math.round((t - cierra) * 20), AMA); }
};
// 10 · el multicine de noche: las dos marquesinas
const CINEN = () => fijo('multicine', () => {
  // la fachada de paneles y ladrillo, las puertas de cristal, la acera y la calle
  pinta(0, 30, 319, 150, (x, y) => { const lad = ((y >> 2) + ((x >> 3) & 1)) % 2, j = (y % 4 === 0) || ((x + ((y >> 2) & 1) * 4) % 8 === 0); return j ? H('#3a1e1e') : rampa(HS('#5a2a2a', '#6a3232', '#7a3a38'), 1 + lad * 0.6 + (azar(x >> 1, y) - 0.5) * 0.6, x, y); });
  R.rect(0, 26, 319, 30, H('#2a1414')); R.rect(0, 30, 319, 31, H('#c8a04a'));
  for (const [x0, x1] of [[34, 150], [196, 262]]) { caja(x0, 112, x1, 150, H('#1a2a3a')); for (let x = x0 + 2; x < x1; x += 14) R.rect(x, 113, x, 149, H('#c8a04a')); pinta(x0 + 1, 113, x1 - 1, 149, (x, y) => (y < 128 && (x + y) % 3 === 0 ? H('#ffe8a0') : null)); }
  R.rect(0, 150, 319, 162, H('#5a5a64')); for (let x = 0; x < 320; x += 16) R.rect(x, 150, x, 162, H('#46464e')); R.rect(0, 150, 319, 150, H('#8a8a94'));
  R.rect(0, 163, 319, 164, H('#9a9aa4')); pinta(0, 165, 319, 179, (x, y) => rampa(HS('#1a1a22', '#24242e', '#2e2e3a'), 1 + (azar(x >> 1, y) - 0.5) * 1.2, x, y));
  for (let x = 6; x < 320; x += 40) R.rect(x, 172, x + 18, 173, H('#c8b848'));
  // las farolas
  for (const x of [8, 180, 312]) { R.rect(x, 92, x + 2, 150, H('#2a2a34')); R.rect(x - 3, 88, x + 5, 92, H('#3a3a44')); R.rect(x - 2, 92, x + 4, 94, H('#fff0b0')); }
});
const p10 = (t) => {
  pegar(CINEN()); cieloNoche(0, 0, 319, 25, t);
  // dos focos que barren el cielo (no llegan a la esquina de Atom)
  for (const [bx, ph] of [[60, 0], [240, 2]]) { const a = -Math.PI / 2 + Math.sin(t * 0.7 + ph) * 0.5; for (let r = 4; r < 70; r++) { const x = Math.round(bx + Math.cos(a) * r), y = Math.round(28 + Math.sin(a) * r); if (y < 0 || calma(x, y)) continue; for (let w = -1; w <= 1; w++) if ((x + y + w) % 2 === 0) R.pset(x + w, y, mez(R.pget(x + w, y), H('#c8d0f8'), 0.35)); } }
  // la marquesina IMAX (x 26–158): bombillas que corren, el desierto y el gusano que asoma en «Dune»
  const m1 = [26, 36, 158, 104], gus = tramo(t, @estreno@44.0@, @estreno@44.9@), igual = @estreno@46.1@;
  caja(m1[0], m1[1], m1[2], m1[3], H('#1a1018'), H('#c8a04a'));
  R.recorte([m1[0] + 4, m1[1] + 4, m1[2] - 4, m1[3] - 4]);
  pinta(m1[0] + 4, m1[1] + 4, m1[2] - 4, m1[3] - 4, (x, y) => y < 70 ? rampa(HS('#f8b060', '#f08840', '#c85a3a'), (y - 40) / 14, x, y) : rampa(HS('#e8a050', '#c87838', '#a85a2a'), 1 + Math.sin(x * 0.08 + y * 0.3) + (y - 70) / 20, x, y));
  R.disco(120, 56, 8, H('#fff0b0'));
  if (gus > 0) { const gh = Math.round(gus * 30); for (let j = 0; j < gh; j++) { const w = 9 - Math.round(j / gh * 3), cx = 70 + Math.round(Math.sin(j * 0.12) * 3); for (let i = -w; i <= w; i++) R.pset(cx + i, 92 - j, (i + j) % 4 === 0 ? H('#6a4a2a') : H('#8a6038')); } if (gus > 0.6) { R.disco(70, 92 - gh, 7, H('#2a1a14')); for (let k = 0; k < 8; k++) R.pset(70 + Math.round(Math.cos(k) * 6), 92 - gh + Math.round(Math.sin(k) * 6), BL); } for (let k = 0; k < 10; k++) R.pset(56 + k * 3, 96 - Math.round(Math.abs(Math.sin(t * 9 + k)) * 3), H('#f0c070')); }
  R.recorte(null);
  pictoGigante(140, 46, AMA);
  for (let k = 0; k < 26; k++) { const on = (Math.floor(t * 8) + k) % 4 === 0; const x = k < 13 ? m1[0] + 2 + k * 10 : m1[0] + 2 + (k - 13) * 10, y = k < 13 ? m1[1] + 1 : m1[3] - 1; R.pset(x, y, on ? BL : AMA); }
  caja(56, 108, 128, 126, H('#0a0a10'), H('#c8a04a')); R.numero('18', 92, 123, { tam: 16, centro: true });
  // la marquesina pequeña (x 190–268): la máscara con su capucha
  const m2 = [190, 50, 268, 104]; caja(m2[0], m2[1], m2[2], m2[3], H('#0e1a12'), H('#c8a04a'));
  pinta(m2[0] + 3, m2[1] + 3, m2[2] - 3, m2[3] - 3, (x, y) => rampa(HS('#0a2a14', '#14401e', '#1e5a2a'), 1 + Math.sin(x * 0.2 + t) * 0.5 + (azar(x, y) - 0.5), x, y));
  DO.e_mascara(R, 229, 77, 2.6, { capucha: true, ojos: 0.6 + 0.4 * Math.sin(t * 3) });
  for (let k = 0; k < 16; k++) { const on = (Math.floor(t * 8) + k) % 4 === 0; R.pset(m2[0] + 2 + (k % 8) * 10, k < 8 ? m2[1] + 1 : m2[3] - 1, on ? BL : AMA); }
  caja(204, 108, 254, 126, H('#0a0a10'), H('#c8a04a')); R.numero('18', 229, 123, { tam: 16, centro: true });
  if (t > igual) { const s = Math.floor(t * 4) % 2; R.numero('=', 166, 123, { tam: 16, centro: true }); if (s) { R.anillo(92, 117, 22, AMA); R.anillo(229, 117, 18, AMA); } }
  // las dos colas en la acera: miran arriba, señalan el gusano
  const asom = t > @estreno@44.3@;
  [EL.chicaHoy, EL.chico, EL.senor30].forEach((d, k) => R.actor(d, 48 + k * 22, 158, t, { dir: k === 1 ? -1 : 1, sorpresa: asom && k !== 2, dedo: asom && k === 0, habla: k === 2 && Math.sin(t * 5) > 0.3 }));
  [EL.chicoHoy, EL.espectadora, EL.vecino ?? EL.chico].forEach((d, k) => R.actor(d, 204 + k * 22, 158, t, { dir: k === 0 ? 1 : -1, sonrisa: t > igual, salto: t > igual && t < igual + 0.6 && k === 0 ? 2 : 0 }));
  // un coche que pasa por delante
  const cx = Math.round(lerp(-70, 380, tramo(t, P10 + 0.5, P10 + 3.6))); caja(cx, 164, cx + 48, 176, H('#2a6ac8')); caja(cx + 10, 157, cx + 36, 165, H('#2a5ab8')); R.rect(cx + 13, 159, cx + 22, 163, H('#9ad0f0')); R.rect(cx + 24, 159, cx + 33, 163, H('#9ad0f0'));
  for (const wx of [cx + 10, cx + 38]) { R.disco(wx, 177, 4, K); R.disco(wx, 177, 2, H('#8a8a94')); } R.rect(cx + 46, 167, cx + 48, 169, AMAL);
};
const efectos = [[2.2, 'papel'], [3.45, 'boing'], [P2 + 0.9, 'pop'], [@ventas@7.35@, 'lapiz'], [@ventas@8.1@, 'campana'], [@ventas@10.3@, 'papel'], [@ventas@11.9@, 'brillo'],
  [@ventas@16.45@, 'bip'], [@ventas@17.1@, 'boing'], [P5 + 0.8, 'ring'], [@ventas@21.0@, 'tic'], [@estreno@24.5@, 'tic'], [@estreno@26.4@, 'pop'],
  [@estreno@30.35@, 'toc'], [@estreno@31.95@, 'toc'], [@estreno@32.45@, 'toc'], [@estreno@36.2@, 'tic'], [@estreno@36.45@, 'tic'], [@estreno@40.0@, 'cerrojo'], [@estreno@42.2@, 'lapiz'], [@estreno@44.1@, 'avalancha'], [@estreno@46.2@, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, año: 2026 });
''', 'dd-cifras'))

# ───────────────────────────────────────────────────────────────────────────────────────────────── DD-ESPERA
E['dd-espera'] = ('Lo que falta', '''// DD-ESPERA (frases 29–31), 2026. Ocho planos, cortados en la palabra:
// 1. el mapa del fan de cerca, casi completo, con la «?» en el centro: el fan llega con la última pieza de puzle en alto,
//    la prueba de puntillas y en «still missing» se queda con la pieza y su «?» (corta en «There was talk»);
// 2. la pared del salón: la mano tacha en el calendario de noviembre el 16 y luego el 18; en «didn't come out» la barra
//    de la tele de al lado vuelve del 99 a 0 (el gag 1) y sale «?»; el gato de la cómoda mira (corta en «As of today»);
// 3. el portátil en el sofá: el único tráiler, el de julio («7»), se repite; la mano le da otra vez y el contador de
//    vueltas sube; el gato duerme en el brazo del sofá; llueve en la ventana;
// 4. el plató: Downey, de paisano, entra, se planta ante el móvil del aro de luz (que se enciende) y en «weight» mira el
//    reloj (icono de reloj); el técnico se ríe; el foco sobre la máscara (corta en «posted»);
// 5. el móvil en la mano, sobre la mesa del desayuno: el vídeo mudo (el altavoz tachado) de Downey mirando el reloj una y
//    otra vez; los corazones suben; en «patience» un reloj de arena gira (corta en «Time will tell»);
// 6. el póster de cerca con dos huecos: en la balda, el reloj de arena se da la vuelta en «Time will tell»; aparecen
//    las siluetas de Lobezno y Deadpool y la mano pega una nota «?» en cada una al nombrarlas (corta en «are listed»);
// 7. el escritorio desde arriba: en la hoja, la mano firma dos veces (el crédito de material adicional); en «wrote
//    something», la marca verde; en «not that they're in it», el fotograma con «?»;
// 8. la tormenta de arena: tres siluetas salen del polvo, Lobezno, Deadpool y Hulk, cada una con su «?» al nombrarla.''', _en(COMUN + r'''
const Q2 = @trailer@4.25@, Q3 = @trailer@10.55@, Q4 = @paciencia@15.385@, Q5 = @paciencia@19.62@, Q6 = @paciencia@26.75@, Q7 = @reparto@33.75@, Q8 = @reparto@40.6@;
// 1 · el mapa de cerca: la pieza que falta
const pieza = (x, y, c, cs) => { R.rect(x - 1, y - 1, x + 10, y + 10, K); R.rect(x, y, x + 9, y + 9, c); R.disco(x + 5, y - 2, 2, K); R.disco(x + 5, y - 2, 1, c); R.disco(x + 11, y + 5, 2, K); R.disco(x + 11, y + 5, 1, c); R.rect(x, y + 8, x + 9, y + 9, cs); R.rect(x + 1, y + 1, x + 3, y + 1, BL); };
const p1 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'mapa', mapa: 0.55 + 0.29 * tramo(t, 0.3, 2.6) }; const g = DO.hoy(R, t, o) || {}, [cx, cy] = g.centro ?? [146, 79];
  const entra = tramo(t, 0.5, 1.6), prueba = t > 1.6 && t < 3.2, sale = tramo(t, 3.4, Q2 - 0.1), jig = prueba ? Math.round(Math.sin(t * 14) * 2) : 0;
  if (t > 3.0 && t < 3.9) { const r = 14 + Math.round(((t - 3.0) * 20) % 6); R.anillo(cx, cy, r, AMA); R.anillo(cx, cy, r + 1, mez(AMA, K, 0.5)); }
  // el fan llega con la última pieza en alto, la prueba de puntillas y se queda con la «?»
  const su = g.suelo ?? 176, fx = Math.round(lerp(300, 150, entra)), r = R.actor(EL.chicoHoy, fx, su, t, { dir: -1, anda: entra > 0 && entra < 1, sostiene: t < 3.3 ? [fx - 4 + jig, su - 30] : false, salto: prueba ? Math.round(Math.abs(Math.sin(t * 7)) * 3) : 0, triste: t > 3.3, sorpresa: prueba });
  if (t < 3.3) { const [hx, hy] = r.mano; pieza(hx - 6, hy - 12, H('#3ac85a'), H('#1a8a3a')); } else { pieza(fx + 14, su - 10, H('#3ac85a'), H('#1a8a3a')); R.icono('?', fx + 3, su - 42, AMA, K, 2); }
  if (t > 3.2 && t < Q2) R.icono('X', cx + 20, cy - 26, ROJO, K, 2);
};
// 2 · la pared del salón: el calendario y la tele
const PARED = () => fijo('paredCal', () => {
  pinta(0, 0, 319, 140, (x, y) => { const f = x % 12; return f < 1 ? H('#5a6a5a') : (f === 6 && y % 8 === 0) ? H('#c8b080') : rampa(HS('#6a7a62', '#7a8a70', '#8a9a7e'), 1.4 + (f < 6 ? 0.4 : -0.2) + (azar(x >> 1, y >> 1) - 0.5) * 0.4 - (x > 276 && y < 46 ? 0.6 : 0), x, y); });
  R.rect(156, 136, 319, 140, H('#e8e2d0')); R.rect(156, 140, 319, 141, H('#9a9280'));
  pinta(0, 136, 155, 171, (x, y) => { const f = x % 12; return f < 1 ? H('#5a6a5a') : rampa(HS('#6a7a62', '#7a8a70', '#8a9a7e'), 1.2 + (f < 6 ? 0.4 : -0.2) + (azar(x >> 1, y >> 1) - 0.5) * 0.4, x, y); });
  // la cómoda de madera con sus cajones y tiradores
  R.rect(0, 172, 156, 179, H('#e8e2d0')); R.rect(0, 172, 156, 172, H('#9a9280'));
  pinta(156, 142, 319, 179, (x, y) => rampa(HS('#5a3418', '#7a4a24', '#9a6234'), 1.2 + (Math.sin(x * 0.13 + Math.sin(y * 0.5) * 2) > 0.8 ? -0.8 : 0) + (y < 145 ? 1.4 : 0), x, y));
  for (const x of [160, 240]) { R.rect(x, 150, x + 78, 150, H('#3a2010')); R.rect(x, 150, x, 179, H('#3a2010')); R.rect(x + 30, 158, x + 46, 160, H('#c8a04a')); R.rect(x + 30, 158, x + 46, 158, H('#f0d880')); }
  // el calendario colgado de su clavo (x 22–150, y 20–134)
  R.linea(86, 48, 64, 56, K); R.linea(86, 48, 108, 56, K); R.disco(86, 48, 2, H('#8a8e98'));
  caja(22, 56, 150, 170, H('#f6f2ea')); R.rect(23, 57, 149, 76, ROJO); R.rect(23, 74, 149, 76, H('#a81e28')); R.numero('11', 86, 72, { tam: 16, centro: true });
  for (const x of [34, 136]) { R.disco(x, 66, 4, H('#f6f2ea')); R.disco(x, 66, 3, H('#c8a04a')); }
  for (let i = 0; i < 7; i++) R.rect(26 + i * 17, 79, 40 + i * 17, 81, i === 0 ? ROJO : H('#b8b0a0'));
  for (let d = 1; d <= 30; d++) { const row = Math.floor((d - 1) / 7), col = (d - 1) % 7, x = 26 + col * 17, y = 84 + row * 17; R.rect(x, y, x + 15, y + 15, H('#e8e2d0')); R.rect(x + 1, y + 1, x + 14, y + 14, H('#fbf8f0')); T.a_cifras(R, String(d), x + 8, y + 13); }
  for (const d of [16, 18]) { const row = Math.floor((d - 1) / 7), col = (d - 1) % 7, x = 26 + col * 17 + 8, y = 84 + row * 17 + 8; R.anillo(x, y, 9, ROJO); R.anillo(x, y, 8, ROJO); }
  // la tele en su peana (x 196–300, y 52–128) y lo de la cómoda: planta, mando, cuenco de palomitas, foto
  caja(196, 52, 300, 126, H('#1a1a22')); R.rect(240, 126, 256, 134, H('#2a2a34')); R.rect(226, 134, 270, 138, H('#2a2a34'));
  R.rect(166, 118, 182, 140, H('#a8603a')); R.rect(166, 118, 182, 120, H('#c87a4a')); for (const [dx, dy] of [[-6, -6], [0, -14], [6, -8], [-3, -20], [5, -22], [0, -28]]) { R.disco(174 + dx, 116 + dy, 5, H('#2a6a3a')); R.disco(173 + dx, 115 + dy, 3, H('#3a8a4a')); }
  caja(286, 130, 312, 140, H('#e8e2d0')); for (let k = 0; k < 8; k++) R.disco(290 + k * 3, 128 - (k % 2) * 2, 2, H('#fff6d0'));
  caja(156, 132, 162, 140, H('#2a2a34')); R.rect(158, 134, 160, 134, ROJO);
});
const p2 = (t) => {
  pegar(PARED());
  const X1 = @trailer@5.25@, X2 = @trailer@6.85@, nada = @trailer@8.55@;
  const cel = (d) => { const row = Math.floor((d - 1) / 7), col = (d - 1) % 7; return [26 + col * 17 + 8, 84 + row * 17 + 8]; };
  const cruz = (d, u) => { const [x, y] = cel(d); const n = Math.round(u * 24); for (let i = 0; i <= Math.min(12, n); i++) { R.rect(x - 6 + i, y - 6 + i, x - 5 + i, y - 5 + i, H('#1a1a2a')); } for (let i = 0; i <= n - 12; i++) { R.rect(x + 6 - i, y - 6 + i, x + 7 - i, y - 5 + i, H('#1a1a2a')); } };
  const u1 = tramo(t, X1 - 0.35, X1), u2 = tramo(t, X2 - 0.35, X2); if (u1 > 0) cruz(16, u1); if (u2 > 0) cruz(18, u2);
  // la mano con el rotulador: va al 16, al 18 y se retira
  const [ax, ay] = cel(16), [bx, by] = cel(18), mueve = tramo(t, X1 + 0.2, X2 - 0.4), fuera = tramo(t, X2 + 0.3, X2 + 1.2), ent = tramo(t, Q2, X1 - 0.4);
  let px = lerp(ax, bx, mueve), py = lerp(ay, by, mueve); if (t < X1) { const u = t < X1 - 0.35 ? 0 : u1; px = ax - 6 + (u < 0.5 ? u * 24 : 12 - (u - 0.5) * 24); py = ay - 6 + Math.min(12, u * 24); } if (t >= X2 - 0.35 && t < X2) { const u = u2; px = bx - 6 + (u < 0.5 ? u * 24 : 12 - (u - 0.5) * 24); py = by - 6 + Math.min(12, u * 24); }
  px = Math.round(lerp(lerp(30, px, ent), px - 30, fuera)); py = Math.round(lerp(lerp(200, py, ent), py + 80, fuera));
  if (ent > 0 && fuera < 1) { R.linea(px, py, px - 5, py + 7, K); R.linea(px + 1, py, px - 4, py + 7, H('#1a1a2a')); R.pset(px, py, H('#1a1a2a')); T.brazo(R, px - 22, 194, px - 9, py + 9, '#7a3a3a', 1, {}); }
  // la tele: la barra sube a 99 y vuelve a 0 en «didn't come out»
  const [x0, y0, x1, y1] = [199, 55, 297, 123]; pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#0a0e1a', '#121a2e', '#1a2440'), 1 + (y - y0) / 40 + (azar(x >> 1, y >> 1) - 0.5) * 0.5, x, y));
  const c = t < nada ? Math.min(0.99, tramo(t, Q2, nada - 1.2) * 0.99) : tramo(t, nada + 0.6, Q3 + 2) * 0.4, pc = Math.floor(c * 100);
  caja(212, 98, 284, 106, H('#0a0a10'), H('#5a6a7a')); const w = Math.round(70 * c); if (w > 0) R.rect(213, 99, 212 + w, 105, H('#3ae88a'));
  R.numero(pc + '%', 248, 90, { tam: 16, centro: true });
  if (t > nada && t < nada + 1.4) R.icono('?', 288, 60, AMA, K, 2);
  // el gato de la cómoda: sigue la mano con la cabeza y mueve la cola
  const gx = 120, gy = 140, mira = px > 60 ? 1 : 0; R.disco(gx, gy - 4, 6, H('#3a3a44')); R.disco(gx + 7, gy - 9, 4, H('#3a3a44')); R.pset(gx + 5, gy - 14, H('#3a3a44')); R.pset(gx + 9, gy - 14, H('#3a3a44')); R.pset(gx + 6 + mira, gy - 10, AMA); R.pset(gx + 9 + mira, gy - 10, AMA);
  for (let k = 0; k < 7; k++) R.pset(gx - 6 - k, gy - 2 - Math.round(Math.sin(t * 3 + k * 0.6) * k * 0.5), H('#3a3a44'));
};
// 3 · el portátil en el sofá: el tráiler de julio, otra vez
const SOFA = () => fijo('sofa', () => {
  pinta(0, 0, 319, 92, (x, y) => rampa(HS('#3a2a3a', '#4a3448', '#5a4058'), 1.2 + (x % 16 < 1 ? -1 : 0) + (azar(x >> 1, y >> 1) - 0.5) * 0.5 + (x > 276 && y < 46 ? -0.5 : 0), x, y));
  // la ventana con la noche (la lluvia la pone el plano), el cuadro y la lámpara de pie
  caja(198, 18, 268, 70, H('#141c34'), H('#e8e2d0')); R.rect(232, 19, 233, 69, H('#e8e2d0')); pinta(199, 19, 267, 69, (x, y) => (x === 232 || x === 233) ? null : rampa(HS('#0e1430', '#16204a', '#202c5a'), (y - 19) / 20, x, y));
  for (const [x, w, hh] of [[202, 8, 20], [214, 10, 30], [238, 9, 24], [252, 12, 34]]) { R.rect(x, 69 - hh, x + w, 69, H('#0a0e1e')); for (let j = 69 - hh + 3; j < 68; j += 4) for (let i = x + 2; i < x + w - 1; i += 3) if (azar(i, j) < 0.5) R.pset(i, j, H('#f0d880')); }
  caja(40, 18, 96, 58, H('#2a4a6a'), H('#c8a04a')); pinta(42, 20, 94, 56, (x, y) => rampa(HS('#f0a050', '#e86a3a', '#a83a3a'), (y - 20) / 12, x, y)); R.poligono([[42, 56], [60, 38], [74, 48], [94, 34], [94, 56]], H('#2a1a2a'));
  R.rect(12, 22, 14, 92, H('#8a6a3a')); R.poligono([[4, 22], [22, 22], [18, 8], [8, 8]], H('#f0d8a0')); for (let j = 22; j < 60; j++) for (let i = -j + 14; i <= j - 14; i++) if ((i + j) % 3 === 0) R.pset(13 + i, j + 2, mez(H('#4a3448'), H('#fff0b0'), 0.3 - (j - 22) * 0.007));
  // el sofá: respaldo, cojines con su trama, brazos, asiento y la manta de cuadros
  pinta(0, 70, 319, 179, (x, y) => { if (y < 112) return rampa(HS('#5a2a2a', '#7a3a34', '#9a4a40', '#b85a4a'), 2 - (y - 70) / 30 + ((x + y) % 4 === 0 ? -0.6 : 0) + (x % 80 < 2 ? -1.4 : 0), x, y); return rampa(HS('#5a2a2a', '#6a3230', '#7a3a34', '#9a4a40'), 2.6 - (y - 112) / 40 + ((x * 3 + y) % 5 === 0 ? -0.6 : 0), x, y); });
  for (const x of [0, 296]) pinta(x, 96, x + 23, 179, (xx, y) => rampa(HS('#4a2222', '#6a3230', '#8a423a'), 2 - (y - 96) / 50 + (y < 100 ? 1 : 0) + ((xx + y) % 4 === 0 ? -0.5 : 0), xx, y));
  pinta(220, 120, 296, 179, (x, y) => (((x >> 3) + (y >> 3)) % 2 ? (x % 8 === 0 || y % 8 === 0 ? H('#c8a04a') : H('#2a5a8a')) : (x % 8 === 0 || y % 8 === 0 ? H('#c8a04a') : H('#3a7aa8'))));
  for (const [x, c] of [[30, '#e8b848'], [60, '#3a8a6a']]) { R.disco(x, 108, 14, K); R.disco(x, 108, 13, H(c)); R.disco(x - 4, 103, 4, mez(H(c), BL, 0.4)); }
  // el cuenco de palomitas en el cojín
  R.disco(256, 112, 12, K); R.disco(256, 112, 11, H('#e83a3a')); R.rect(244, 104, 268, 112, H('#e83a3a')); for (let k = 0; k < 12; k++) R.disco(248 + (k % 6) * 3, 102 - Math.floor(k / 6) * 3 + (k % 2), 2, H('#fff6d0'));
});
const p3 = (t) => {
  pegar(SOFA());
  // la lluvia en la ventana
  R.recorte([199, 19, 267, 69]); for (let k = 0; k < 30; k++) { const x = 199 + Math.round(azar(k, 1) * 68), y = 19 + ((azar(k, 2) * 50 + t * 70) % 54); R.linea(x, Math.round(y), x - 1, Math.round(y) + 3, H('#6a7ab0')); } R.recorte(null);
  // el portátil: la base con su teclado y la pantalla
  R.poligono([[96, 150], [224, 150], [238, 166], [82, 166]], K); R.poligono([[98, 151], [222, 151], [235, 165], [85, 165]], H('#b8bcc4'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 14; i++) R.rect(104 + i * 8 + j * 2 - j, 153 + j * 3, 109 + i * 8 + j * 2 - j, 154 + j * 3, H('#3a3e48'));
  caja(100, 60, 220, 151, H('#2a2e38')); const [x0, y0, x1, y1] = [104, 64, 216, 144];
  const vuelta = 2.4, f = ((t - Q3) % vuelta) / vuelta, n = 41 + Math.floor(Math.max(0, t - Q3) / vuelta);
  pinta(x0, y0, x1, y1 - 14, (x, y) => rampa(HS('#06120a', '#0e2a16', '#1a4a26', '#2a6a36'), 1 + Math.sin(x * 0.07 + t * 2) * 0.6 + (y - y0) / 40 + (azar(x >> 1, y >> 1, Math.floor(t * 6)) - 0.5) * 0.6, x, y));
  R.recorte([x0, y0, x1, y1 - 14]); DO.e_mascara(R, 160 + Math.round(f * 10), 98, 3, { capucha: true, ojos: 0.5 + 0.5 * Math.sin(t * 5) }); for (let k = 0; k < 10; k++) { const a = t * 2 + k, x = 160 + Math.round(Math.cos(a) * 40), y = 98 + Math.round(Math.sin(a * 1.3) * 26); R.pset(x, y, VERDE); } R.recorte(null);
  R.rect(x0, y1 - 13, x1, y1, H('#14161e')); R.rect(x0 + 18, y1 - 8, x1 - 30, y1 - 7, H('#4a4e58')); R.rect(x0 + 18, y1 - 8, x0 + 18 + Math.round((x1 - x0 - 48) * f), y1 - 7, ROJO); R.disco(x0 + 18 + Math.round((x1 - x0 - 48) * f), y1 - 8, 2, BL);
  R.poligono([[x0 + 4, y1 - 11], [x0 + 4, y1 - 4], [x0 + 10, y1 - 8]], BL);
  // el calendario de julio en una ficha («7») y el contador de vueltas con su flecha
  const brilla = t > @trailer@12.5@ && t < @trailer@13.4@;
  caja(x0 + 4, y0 + 4, x0 + 24, y0 + 24, brilla && Math.floor(t * 8) % 2 ? AMA : BL); R.rect(x0 + 5, y0 + 5, x0 + 23, y0 + 9, ROJO); R.numero('7', x0 + 14, y0 + 22, { centro: true, color: K });
  R.anillo(x1 - 26, y1 - 8, 4, BL); R.pset(x1 - 22, y1 - 12, BL); R.pset(x1 - 21, y1 - 11, BL); R.numero(String(n), x1 - 8, y1 - 4, { centro: true, color: AMA });
  if (f > 0.88) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t * 6; R.pset(160 + Math.round(Math.cos(a) * 10), 98 + Math.round(Math.sin(a) * 10), BL); }
  // la mano que vuelve a dar al botón en cada vuelta
  const toca = f > 0.85 || f < 0.08, hx = toca ? 168 : 196, hy = toca ? 158 : 172;
  T.brazo(R, hx + 56, 198, hx + 2, hy + 4, '#5a4a8a', -1, { codo: [hx + 40, hy + 26] });
  // el gato duerme en el brazo del sofá y mueve la cola
  const gx = 18, gy = 96; R.disco(gx, gy, 9, H('#c87a3a')); R.disco(gx + 9, gy - 2, 5, H('#c87a3a')); R.pset(gx + 7, gy - 7, H('#c87a3a')); R.pset(gx + 11, gy - 7, H('#c87a3a')); R.rect(gx + 7, gy - 2, gx + 8, gy - 2, K); R.rect(gx + 10, gy - 2, gx + 11, gy - 2, K);
  for (let j = -6; j <= 6; j += 3) R.linea(gx - 4 + j, gy - 6, gx - 2 + j, gy - 3, H('#a85a2a'));
  for (let k = 0; k < 8; k++) R.pset(gx - 9 - Math.round(Math.sin(t * 2 + k * 0.5) * 2), gy + 2 - k, H('#c87a3a'));
};
// 4 · el plató: Downey mira el reloj ante el móvil
const p4 = (t) => {
  const o = { encuadre: 'plato', mascara: 1 }; const g = T.plato(R, t, o), su = g.suelo ?? 160;
  const ent = tramo(t, Q4 + 0.1, Q4 + 1.5), reloj = t > @paciencia@17.6@ && t < Q5, x = Math.round(lerp(250, 112, ent));
  const r = R.actor(EL.rdj, x, su, t, { dir: -1, anda: ent > 0 && ent < 1, sostiene: reloj ? [x + 2, su - 20] : false, habla: t > Q4 + 1.6 && t < @paciencia@17.5@ && Math.sin(t * 6) > 0, sonrisa: t > @paciencia@18.6@ });
  if (reloj) { const [hx, hy] = r.mano; R.rect(hx - 2, hy - 1, hx + 2, hy + 2, K); R.rect(hx - 1, hy, hx + 1, hy + 1, Math.floor(t * 4) % 2 ? BL : H('#c8d8e8')); R.icono('reloj', x - 2, su - 50 - Math.round(Math.abs(Math.sin(t * 5))), BL, K, 2); }
  // el móvil en su trípode con el aro de luz, de cara a él, y su piloto
  const tx = 84, ty = su - 34; R.linea(tx - 5, su, tx, su - 20, K); R.linea(tx + 5, su, tx, su - 20, K); R.linea(tx, su, tx, su - 26, H('#5a5a64'));
  for (let a = 0; a < 6.28; a += 0.05) { const px = Math.round(tx + Math.cos(a) * 10), py = Math.round(ty + Math.sin(a) * 10); R.pset(px, py, t > Q4 + 1.4 ? H('#fffbe8') : H('#8a8a94')); R.pset(px + (px > tx ? 1 : -1), py, K); }
  caja(tx - 3, ty - 6, tx + 3, ty + 6, H('#1a1a22')); R.rect(tx - 2, ty - 5, tx + 2, ty + 5, H('#3a5a8a'));
  if (t > Q4 + 1.4) { for (let k = 0; k < 10; k++) { const yy = ty - 8 + k * 2; R.pset(tx + 13 + k, yy, mez(R.pget(tx + 13 + k, yy), H('#fffbe8'), 0.4)); } if (Math.floor(t * 2) % 2) R.pset(tx, ty - 8, ROJO); }
  // el técnico de la grúa se ríe
  R.actor(EL.camarografo ?? EL.tecnico, 178, su, t, { dir: -1, sonrisa: t > @paciencia@16.9@, habla: t > @paciencia@16.9@ && t < @paciencia@18.0@ && Math.sin(t * 9) > 0 });
  T.platoDelante(R, t, o);
};
// 5 · el móvil en la mano: el vídeo mudo
const MESA = () => fijo('mesaDes', () => {
  pinta(0, 0, 319, 179, (x, y) => rampa(HS('#6a4426', '#7e5430', '#94643a', '#a8744a'), 1.6 + Math.sin(x * 0.05 + Math.sin(y * 0.11) * 3) * 0.7 + (Math.sin(y * 0.6 + x * 0.02) > 0.92 ? -1 : 0) + (azar(x >> 1, y) - 0.5) * 0.4 + (x > 276 && y < 46 ? -0.4 : 0), x, y));
  for (let y = 30; y < 180; y += 30) R.rect(0, y, 319, y, H('#4a2e18'));
  // la taza, el bol de cereales, las llaves, las gafas, la libreta y las migas
  R.disco(52, 52, 16, K); R.disco(52, 52, 15, BL); R.disco(52, 52, 11, H('#5a3418')); R.disco(48, 48, 3, H('#8a5a34')); R.rect(67, 48, 74, 56, K); R.rect(68, 49, 72, 55, BL);
  R.disco(262, 132, 24, K); R.disco(262, 132, 23, H('#e8e2d0')); R.disco(262, 132, 18, H('#f8f4ea')); for (let k = 0; k < 16; k++) R.disco(250 + Math.round(azar(k, 1) * 24), 122 + Math.round(azar(k, 2) * 20), 2, H('#e8b848'));
  caja(26, 110, 82, 168, H('#f6f2e6')); for (let y = 118; y < 166; y += 6) R.rect(30, y, 78, y, H('#a8c0d8')); R.rect(34, 110, 34, 168, ROJO);
  R.disco(244, 40, 5, K); R.disco(244, 40, 4, H('#c8a04a')); R.rect(248, 39, 262, 41, H('#c8a04a')); for (const x of [254, 258]) R.rect(x, 42, x + 1, 44, H('#c8a04a'));
  R.anillo(230, 70, 6, K); R.anillo(246, 70, 6, K); R.linea(236, 70, 240, 70, K);
  for (let k = 0; k < 14; k++) R.pset(90 + Math.round(azar(k, 3) * 40), 140 + Math.round(azar(k, 4) * 30), H('#e8c070'));
});
const p5 = (t) => {
  pegar(MESA());
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const f = (t * 0.5 + k / 4) % 1; R.pset(Math.round(52 + Math.sin(t * 2 + k) * 3), Math.round(40 - f * 14), f > 0.6 ? H('#b8a890') : H('#e8e2d0')); }
  // el móvil (x 116–204, y 24–178) y la mano que lo sujeta por abajo
  caja(116, 24, 204, 179, H('#1a1a22')); R.rect(117, 25, 203, 27, H('#3a3a44')); const [x0, y0, x1, y1] = [120, 30, 200, 176];
  // el vídeo (arriba): el cuarto de Downey, él mira el reloj una y otra vez
  pinta(x0, y0, x1, 112, (x, y) => rampa(HS('#3a3a4a', '#4a4a5c', '#5a5a6e'), 1.4 + (y > 96 ? -0.8 : 0) + (x % 14 === 0 ? -0.6 : 0), x, y));
  caja(126, 40, 150, 64, H('#9ac8e8'), H('#e8e2d0')); R.rect(126, 54, 150, 54, H('#e8e2d0')); R.rect(166, 52, 192, 54, H('#8a6440')); for (let k = 0; k < 5; k++) R.rect(168 + k * 5, 44, 171 + k * 5, 52, HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a', '#e8e2d0')[k]);
  const mira = (t % 2.2) > 0.8 && (t % 2.2) < 1.9, vx = 152;
  const r = R.actor(EL.rdj, vx, 108, t, { dir: 1, sostiene: mira ? [vx + 13, 88] : false, sonrisa: !mira });
  if (mira) { const [hx, hy] = r.mano; R.rect(hx - 2, hy - 1, hx + 2, hy + 2, K); R.rect(hx - 1, hy, hx + 1, hy + 1, BL); R.icono('reloj', vx + 22, 66, BL, K, 2); }
  // el altavoz tachado (vídeo mudo), la barra de progreso
  R.rect(126, 72, 130, 77, BL); R.poligono([[130, 70], [135, 67], [135, 82], [130, 79]], BL); R.linea(124, 68, 138, 82, ROJO); R.linea(125, 68, 139, 82, ROJO);
  R.rect(x0, 112, x1, 114, H('#4a4a54')); R.rect(x0, 112, x0 + Math.round(((t * 0.3) % 1) * 80), 114, ROJO);
  // «patience»: el reloj de arena gira en el vídeo; «subjects»: tres puntos
  const pa = @paciencia@24.4@; if (t > pa) arena(140, 96, tramo(t, pa + 0.5, Q6 + 1), tramo(t, pa, pa + 0.5));
  if (t > @paciencia@25.3@) for (let k = 0; k < 3; k++) if (Math.floor(t * 3) % 3 >= k) R.disco(178 + k * 6, 104, 2, BL);
  // debajo: el chip de la fecha (12), los corazones que suben y los comentarios en rayas
  pinta(x0, 115, x1, y1, () => H('#101018')); caja(124, 118, 148, 132, H('#2a2a34'), H('#5a5a6a')); R.numero('12', 136, 129, { centro: true, color: BL });
  const likes = 1200 + Math.floor(tramo(t, Q5, Q6) * 8700); R.disco(160, 124, 3, ROJO); R.disco(164, 124, 3, ROJO); R.poligono([[157, 125], [167, 125], [162, 131]], ROJO); R.numero(String(likes), 186, 130, { centro: true, color: BL });
  for (let k = 0; k < 4; k++) { const y = 138 + k * 8 - Math.round(((t * 4) % 8)); if (y < 136 || y > 168) continue; R.disco(126, y + 2, 2, HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a')[k]); R.rect(131, y + 1, 131 + 20 + (k * 13) % 40, y + 2, H('#6a6a7a')); }
  for (let k = 0; k < 5; k++) { const f = ((t * 0.6 + k * 0.2) % 1), y = Math.round(160 - f * 36); if (f < 0.9) { R.disco(194, y, 1, ROJO); R.disco(196, y, 1, ROJO); R.pset(195, y + 1, ROJO); } }
  T.brazo(R, 236, 198, 206, 166, '#2a5a6a', -1, {});
};
// 6 · el póster con dos huecos: las siluetas y sus notas «?»
const fantasma = (def, x, suelo, t, o, a, c, borde) => escalado(def, x - 12, suelo - 40, 1, t, o, (cc, i, j) => (b4(i, j) < a ? (borde && !BUFA[(j - 1) * 320 + i] ? borde : c) : null));
const nota = (x, y, c = AMA) => { R.rect(x + 1, y + 1, x + 14, y + 14, mez(c, K, 0.5)); caja(x, y, x + 13, y + 13, c, mez(c, K, 0.3)); R.icono('?', x + 3, y + 2, K, mez(c, K, 0.2)); };
const p6 = (t) => {
  const o = { encuadre: 'pareja', k: 2 }; const g = T.batalla(R, t, o), [ix, iy] = g.izq ?? [132, 150], [dx, dy] = g.der ?? [168, 150];
  const ap = tramo(t, @reparto@28.1@, @reparto@29.3@), W = @reparto@32.2@, D = @reparto@32.9@;
  for (const cx of [ix + 5, dx + 9]) for (let j = -18; j <= 4; j++) for (let i = -11; i <= 11; i++) if ((i / 11) ** 2 + (j / 22) ** 2 < 1 && b4(cx + i, iy + j) < ap * 0.7) R.pset(cx + i, iy - 12 + j, mez(R.pget(cx + i, iy - 12 + j), H('#fff0c8'), 0.55));
  fantasma(EL.lobezno ?? EL.thor, ix - 2, iy, t, { dir: 1, quieto: true }, ap, H('#1a1424'), t > W && t < W + 0.4 ? AMAL : H('#5a4a6a'));
  fantasma(EL.deadpool ?? EL.steve, dx + 2, dy, t, { dir: -1, quieto: true }, ap, H('#1a1424'), t > D && t < D + 0.4 ? AMAL : H('#6a3a4a'));
  if (t > W && t < W + 0.5) for (const k of [0, 3, 6]) R.linea(ix + 14, iy - 12 + k / 3, ix + 19, iy - 15 + k / 3, BL);
  T.batallaDelante(R, t, o);
  // la mano pega una nota «?» en cada silueta
  const n1 = tramo(t, W - 0.5, W), n2 = tramo(t, D - 0.5, D), ret = tramo(t, D + 0.2, D + 1.2);
  if (n1 >= 1) nota(ix, iy - 30); if (n2 >= 1) nota(dx + 2, dy - 30, H('#ffb0c8'));
  const obj = t < W ? [ix + 6, iy - 22] : t < D ? [dx + 8, dy - 22] : [dx + 8, dy - 22], u = t < W ? n1 : t < D ? n2 : 1;
  if (t > W - 0.6 && ret < 1) { const hx = Math.round(lerp(lerp(obj[0] - 60, obj[0], u), obj[0] - 120, ret)), hy = Math.round(lerp(lerp(obj[1] + 70, obj[1], u), obj[1] + 120, ret)); if (u < 1) nota(hx - 4, hy - 8, t < W ? AMA : H('#ffb0c8')); T.brazo(R, hx - 30, 196, hx - 6, hy + 2, '#3a4a8a', 1, { codo: [hx - 28, hy + 34] }); }
  // «Time will tell»: el reloj de arena de la balda se da la vuelta
  arena(250, 160, tramo(t, @reparto@26.9@ + 0.5, Q7), tramo(t, Q6, Q6 + 0.5));
};
// 7 · el escritorio: dos firmas y el fotograma con «?»
const garabato = (x, y, u, c) => { const n = Math.round(u * 40); let px = x, py = y; for (let i = 1; i <= n; i++) { const nx = x + i, ny = y + Math.round(Math.sin(i * 0.7) * 3 + Math.sin(i * 0.23) * 2); R.linea(px, py, nx, ny, c); px = nx; py = ny; } return [px, py]; };
const p7 = (t) => {
  const o = { encuadre: 'pared', camara: 'escritorio' }; T.estudio(R, t, o);
  // la hoja: dos renglones de firma y sus rayas
  for (const y of [86, 98]) R.rect(194, y, 240, y, H('#b8b0a0'));
  R.rect(194, 116, 240, 116, H('#5a5a6a')); R.rect(194, 130, 240, 130, H('#5a5a6a'));
  const f1 = tramo(t, @reparto@34.6@, @reparto@35.5@), f2 = tramo(t, @reparto@35.6@, @reparto@36.6@);
  let pt = [196, 113]; if (f1 > 0) pt = garabato(196, 112, f1 * 0.9, H('#1a2a6a')); if (f2 > 0) pt = garabato(196, 126, f2 * 0.9, H('#1a2a6a'));
  if (t > @reparto@38.4@) { const s = tramo(t, @reparto@38.4@, @reparto@38.7@); if (s > 0.3) T.visto(R, 236, 106, 1); }
  // los dos iconos de arriba (las garras y las katanas) y el fotograma con «?»
  caja(194, 70, 208, 82, H('#2a2a34')); for (const x of [198, 201, 204]) R.linea(x, 72, x, 80, H('#c8ccd4'));
  caja(212, 70, 226, 82, H('#3a1a24')); R.linea(214, 80, 224, 72, H('#c8ccd4')); R.linea(214, 72, 224, 80, H('#c8ccd4'));
  const fo = tramo(t, @reparto@39.8@, @reparto@40.2@); if (fo > 0) { const y = 66 - Math.round((1 - fo) * 8); caja(150, y, 182, y + 22, H('#1a1a22')); for (let k = 0; k < 4; k++) { R.rect(152 + k * 8, y + 1, 155 + k * 8, y + 2, BL); R.rect(152 + k * 8, y + 19, 155 + k * 8, y + 20, BL); } R.icono('?', 161, y + 6, AMA, K); }
  // la mano con el bolígrafo
  const ent = tramo(t, Q7, @reparto@34.5@), sal = tramo(t, @reparto@36.8@, @reparto@37.8@), [hx, hy] = [Math.round(lerp(lerp(170, pt[0], ent), 290, sal)), Math.round(lerp(lerp(190, pt[1], ent), 200, sal))];
  if (sal < 1) { R.linea(hx, hy, hx + 6, hy + 8, K); R.linea(hx + 1, hy, hx + 7, hy + 8, H('#1a2a6a')); T.brazo(R, hx + 12, 194, hx + 7, hy + 10, '#7a3a3a', -1, {}); }
  T.estudioDelante(R, t, o);
};
// 8 · la tormenta: tres siluetas con su «?»
const p8 = (t) => {
  const o = { encuadre: 'vacio' }; const g = DO.vacio(R, t, o) || {}, su = g.suelo ?? 160;
  const W = @reparto@42.0@, D = @reparto@42.5@, Hk = @reparto@43.2@, sale = tramo(t, Q8, Q8 + 1.4), ap = tramo(t, Q8, Q8 + 1.6);
  const a = (x0, x1) => Math.round(lerp(x0, x1, sale));
  fantasma(EL.lobezno ?? EL.thor, a(70, 112), su, t, { dir: 1, anda: sale < 1 }, ap, H('#2a1a1a'), t > W && t < W + 0.5 ? AMAL : H('#8a5a3a'));
  fantasma(EL.deadpool ?? EL.steve, a(250, 196), su, t, { dir: -1, anda: sale < 1 }, ap, H('#2a1a1a'), t > D && t < D + 0.5 ? AMAL : H('#8a3a3a'));
  fantasma(EL.hulk, 152, su - 2, t, { dir: 1, quieto: false }, tramo(t, Q8 + 0.6, Hk), H('#1a2a1a'), t > Hk ? H('#5ac85a') : H('#3a6a3a'));
  for (const [x, ti, c] of [[a(70, 112) + 4, W, AMA], [a(250, 196) + 4, D, H('#ff8aa8')], [158, Hk, H('#7aff7a')]]) if (t > ti) R.icono('?', x, su - 48 - Math.round((1 - tramo(t, ti, ti + 0.25)) * 6), c, K, 2);
  // el polvo que pasa por delante
  for (let k = 0; k < 50; k++) { const x = ((azar(k, 1) * 340 + t * (60 + azar(k, 2) * 40)) % 340) - 10, y = 120 + azar(k, 3) * 58; R.pset(Math.round(x), Math.round(y), k % 3 ? H('#c89a6a') : H('#a8784a')); }
  if (DO.vacioDelante) DO.vacioDelante(R, t, o);
};
const efectos = [[1.8, 'toc'], [@trailer@3.3@, 'boing'], [@trailer@5.0@, 'lapiz'], [@trailer@6.6@, 'lapiz'], [@trailer@8.6@, 'boing'], [Q3 + 2.4 * 0.86, 'golpecito'], [Q3 + 2.4 * 1.86, 'golpecito'],
  [Q4 + 1.4, 'interruptor'], [@paciencia@17.7@, 'tic'], [@paciencia@24.5@, 'whoosh'], [@paciencia@26.9@, 'golpecito'],
  [@reparto@32.2@, 'papel'], [@reparto@32.9@, 'papel'], [@reparto@34.7@, 'firma'], [@reparto@35.7@, 'firma'], [@reparto@38.5@, 'brillo'], [@reparto@39.9@, 'pop'],
  [Q8 + 0.2, 'rafaga'], [@reparto@42.0@, 'pop'], [@reparto@42.5@, 'pop'], [@reparto@43.2@, 'pop']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3], [Q4, p4], [Q5, p5], [Q6, p6], [Q7, p7], [Q8, p8]], { efectos, año: 2026 });
''', 'dd-espera'))

# ───────────────────────────────────────────────────────────────────────────────────────────────── DD-SECRET
E['dd-secret'] = ('Guerras Secretas', '''// DD-SECRET (frases 32–34), 2026; las viñetas de cómic sin año y 2027 al final. Doce planos, cortados en la palabra:
// 1. la sala de cine de cerca: en la pantalla, la luz verde del búnker deja el símbolo en «Doom takes Banner»; en «wakes
//    Wanda», los ojos rojos que se abren entre las piedras; dos espectadores se miran (corta en «and heroes»);
// 2. la ciudad en ruinas: Doom en lo alto con la luz verde, Hulk en su columna verde y Wanda con chispas rojas; héroes de
//    varios mundos llegan por los dos lados (corta en «Kevin Feige»);
// 3. la rueda de prensa de cerca: Feige habla en el atril; Steve y Cíclope llegan y se dan la mano en «together» (corta
//    en «is the fun way»);
// 4. la pantalla del pabellón: las hojas 2000 → 2026 y «25»; en el escenario chocan los cinco; ovación (corta en «And the
//    title»);
// 5. el espacio: dos Tierras se acercan como coches de choque; en «December 17» la hoja «17» y en «2027» su cifra;
// 6. una tienda de cómics: el expositor gira y se para; la mano saca los dos tomos, 1984 y 2015 (corta en «In the 1984»);
// 7. viñeta (1984): en el espacio, una estrella blanca enorme (el Beyonder) se enciende en «being» y tira de un haz que
//    sube desde la Tierra con héroes y villanos (corta en «brought»);
// 8. viñeta, el planeta lejano: la columna de luz baja y deja a los héroes a un lado y a los villanos al otro; en «Hulk»
//    se ilumina entre ellos; en «stealing his power» el poder se tuerce hacia Doom, que brilla en verde;
// 9. viñeta (2015): burbujas de universos se acercan, chocan en «collide» y se rompen en «vanish»; Doom mira desde abajo
//    (corta en «and Doom gathers»);
// 10. viñeta, el mundo de retazos: los trozos vuelan a Doom, las costuras se encienden en «stitches» y en «god-emperor»
//    sube el trono y él se sienta (corta en «Universes colliding»);
// 11. la sala de cine de lado: en la pantalla chocan dos mundos y la luz verde se lleva la silueta de Hulk; un fan se
//    levanta con «!» en «sound familiar» (corta en «Marvel hasn't said»);
// 12. la mesa con la balanza: el cómic pesa; la mano pone la lata de película en el otro platillo y en «the resemblance
//    is there» se equilibran; el taco de calendario pasa a «17» y «2027» (la barra a 2027).''', _en(COMUN + r'''
const S2 = @sabemos@6.05@, S3 = @sabemos@9.75@, S4 = @sabemos@13.65@, S5 = @ochenta@17.906@, S6 = @ochenta@24.15@, S7 = @ochenta@27.85@, S8 = @ochenta@32.35@, S9 = @ochenta@39.5@, S10 = @dios@44.65@, S11 = @dios@50.35@, S12 = @dios@54.65@;
const DENTRO = (x, y) => x >= 9 && x <= 310 && y >= 8 && y <= 171 && !(x >= 270 && y <= 50);
const OA = { encuadre: 'mundo', camara: 'arena' };
const vineta = (clave, dib) => fijo(clave, () => { T.comic(R, 0, OA); dib(); });
const pintaV = (f) => pinta(9, 8, 310, 171, (x, y) => (DENTRO(x, y) ? f(x, y) : null));
const cartucho = (x, y, txt) => { caja(x, y, x + 40, y + 16, H('#f8e070'), K); R.rect(x + 1, y + 13, x + 39, y + 15, H('#d8b840')); R.numero(txt, x + 20, y + 12, { centro: true, color: K }); };
// 1 · la sala de cerca: en la pantalla, el búnker y Wanda
const peli1 = (R2, t, [x0, y0, x1, y1]) => {
  const w = t > @sabemos@4.5@, cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1;
  if (!w) {
    pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#2a2a28', '#3e3e3a', '#5a5a56', '#7a7a74'), 1.6 + ((x % 24 < 1 || y % 18 < 1) ? -1 : 0) + (azar(x >> 1, y >> 1) - 0.5) * 0.5, x, y));
    R.rect(x0, y1 - 22, x1, y1, H('#4a4a46')); for (let x = x0; x <= x1; x += 6) R.rect(x, y1 - 22, x, y1, H('#3a3a36'));
    // la silla, la pizarra con garabatos, la cámara en su trípode y la taza en la mesa
    if (t < @sabemos@3.4@) { caja(cx - 8, y1 - 44, cx + 8, y1 - 30, H('#4a6a8a')); R.rect(cx - 8, y1 - 30, cx + 8, y1 - 27, H('#3a5a7a')); R.rect(cx - 7, y1 - 27, cx - 6, y1 - 20, K); R.rect(cx + 6, y1 - 27, cx + 7, y1 - 20, K); }
    else { R.poligono([[cx - 34, y1 - 22], [cx - 22, y1 - 34], [cx - 14, y1 - 26], [cx - 26, y1 - 18]], H('#4a6a8a')); }
    caja(x0 + 10, y0 + 10, x0 + 70, y0 + 44, H('#1e3a2a'), H('#8a8a84')); for (let k = 0; k < 6; k++) R.linea(x0 + 14 + k * 9, y0 + 18 + (k % 3) * 7, x0 + 20 + k * 9, y0 + 14 + (k % 3) * 7, H('#c8e8d0'));
    R.linea(x1 - 40, y1 - 18, x1 - 34, y1 - 40, K); R.linea(x1 - 28, y1 - 18, x1 - 34, y1 - 40, K); caja(x1 - 44, y1 - 50, x1 - 24, y1 - 38, H('#2a2a30')); R.disco(x1 - 24, y1 - 44, 4, H('#5a5a64')); if (Math.floor(t * 2) % 2) R.pset(x1 - 40, y1 - 48, ROJO);
    caja(x1 - 90, y1 - 30, x1 - 56, y1 - 26, H('#6a4a2a')); R.rect(x1 - 78, y1 - 36, x1 - 74, y1 - 31, BL);
    const v = tramo(t, @sabemos@2.9@, @sabemos@3.6@); if (v > 0) { const I = Math.sin(Math.min(1, v) * Math.PI); for (let y = y0; y <= y1 - 18; y++) for (let x = cx - 26; x <= cx + 26; x++) { const e = Math.abs(x - cx) / (8 + I * 18); if (e < 1 && (x + y) % (e < 0.5 ? 1 : 2) === 0) R.pset(x, y, e < 0.4 ? H('#c8ffd8') : VERDE); } }
    if (t > @sabemos@3.4@) { for (let j = -5; j <= 5; j++) for (let i = -30; i <= 30; i++) { const d = (i / 30) ** 2 + (j / 5) ** 2; if (d < 1 && d > 0.6) R.pset(cx + i, y1 - 12 + j, VERDE); } R.disco(cx, y1 - 12, 3, VERDES); for (const a of [0, 1.57, 3.14, 4.71]) R.linea(cx + Math.round(Math.cos(a) * 8), y1 - 12 + Math.round(Math.sin(a) * 2), cx + Math.round(Math.cos(a) * 22), y1 - 12 + Math.round(Math.sin(a) * 4), VERDE); }
  } else {
    pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#1a1420', '#2a2030', '#3a2c40', '#5a4a58'), 1 + (y - y0) / 50 + Math.sin(x * 0.2 + y * 0.1) * 0.5 + (azar(x >> 2, y >> 2) - 0.5) * 0.8, x, y));
    for (const [x, y, r] of [[cx - 50, y1 - 20, 22], [cx + 46, y1 - 16, 26], [cx - 10, y1 - 4, 30]]) { R.disco(x, y, r, H('#3a3440')); R.disco(x - 3, y - 4, r - 6, H('#4a4450')); }
    const o = tramo(t, @sabemos@5.0@, @sabemos@5.4@); for (const dx of [-10, 10]) { R.rect(cx + dx - 4, cy + 4, cx + dx + 4, cy + 4 + Math.round(o * 2), H('#ff3a4a')); R.rect(cx + dx - 3, cy + 4, cx + dx + 3, cy + 4, H('#ffd0d8')); }
    for (let k = 0; k < 14; k++) { const a = t * 2 + k, r = 20 + (t * 30 + k * 7) % 30; R.pset(cx + Math.round(Math.cos(a) * r), cy + 6 + Math.round(Math.sin(a) * r * 0.5), H('#ff5a7a')); }
  }
};
const p1 = (t) => {
  const o = { encuadre: 'cine', camara: 'pantalla', pantalla: peli1, publico: 'normal' }; const g = DO.hoy(R, t, o) || {}, su = g.suelo ?? 176;
  const v = t > @sabemos@3.3@ && t < @sabemos@4.6@, w = t > @sabemos@5.2@;
  R.actor(EL.chico, 128, su, t, { dir: 1, sorpresa: v || w, habla: !v && !w && Math.sin(t * 6) > 0.3 });
  R.actor(EL.chica, 146, su, t, { dir: -1, sorpresa: w, habla: v && Math.sin(t * 7) > 0, dedo: w });
  DO.hoyDelante(R, t, o);
};
// 2 · la ciudad en ruinas: Doom, Hulk en la luz, Wanda y los héroes que llegan
const p2 = (t) => {
  const o = { encuadre: 'campo', doom: 1 }; const g = T.batalla(R, t, o), su = g.suelo ?? 158;
  // la columna verde con Hulk dentro y Wanda con sus chispas rojas, a los pies del montón
  for (let y = 60; y <= 150; y++) for (let x = 100; x <= 124; x++) { const e = Math.abs(x - 112) / 12; if ((x + y + Math.floor(t * 8)) % (e < 0.5 ? 2 : 3) === 0) R.pset(x, y, e < 0.4 ? H('#b8ffd0') : VERDE); }
  fantasmaV(EL.hulk, 106, 150, t);
  R.actor(EL.wandaDD, 196, 150, t, { dir: -1, brazos: Math.sin(t * 2) > -0.3 });
  for (let k = 0; k < 10; k++) { const a = t * 3 + k, r = 8 + (t * 20 + k * 5) % 10; R.pset(203 + Math.round(Math.cos(a) * r), 136 + Math.round(Math.sin(a) * r), H('#ff4a6a')); }
  R.actor(EL.doom, 153, 121, t, { dir: 1, brazos: true });
  // los héroes de varios mundos llegan por los lados
  const u = tramo(t, S2 + 0.1, S2 + 2.2);
  [[EL.thor, -30, 34, 1], [EL.steve, -46, 54, 1], [EL.sam, -62, 74, 1], [EL.ciclope, 340, 232, -1], [EL.sue, 356, 250, -1], [EL.namor, 372, 268, -1]].forEach(([d, a, b, dir], k) => R.actor(d, Math.round(lerp(a, b, u)), su + (k % 3) * 4, t, { dir, anda: u > 0 && u < 1, sorpresa: u >= 1 && t > @sabemos@8.6@ }));
  T.batallaDelante(R, t, o);
};
const fantasmaV = (def, x, suelo, t) => escalado(def, x - 12, suelo - 40, 1, t, { dir: 1, brazos: Math.sin(t * 3) > 0 }, (c) => mez(c, VERDE, 0.55));
// 3 · la rueda de prensa de cerca: Feige; Steve y Cíclope se dan la mano
const p3 = (t) => {
  const o = { encuadre: 'prensa', camara: 'cerca', flashes: 0.4 + 0.5 * tramo(t, @sabemos@11.5@, @sabemos@12.5@) }; const g = DO.escenario(R, t, o) || {}, su = g.suelo ?? 150;
  const u = tramo(t, S3 + 0.2, @sabemos@11.8@), mano = t > @sabemos@11.9@;
  const rs = R.actor(EL.steve, Math.round(lerp(40, 92, u)), su, t, { dir: 1, anda: u > 0 && u < 1, sostiene: mano ? [108, su - 13] : false, sonrisa: mano });
  const rc = R.actor(EL.ciclope, Math.round(lerp(290, 112, u)), su, t, { dir: -1, anda: u > 0 && u < 1, sostiene: mano ? [110, su - 13 + (Math.floor(t * 6) % 2)] : false, sonrisa: mano });
  R.actor(EL.feige, 153, su, t, { dir: 1, habla: Math.sin(t * 6) > 0, dedo: t > @sabemos@12.7@, sonrisa: t > @sabemos@13.1@ });
  DO.escenarioDelante(R, t, o);
  if (mano && t < @sabemos@12.9@) for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + t * 4; R.pset(109 + Math.round(Math.cos(a) * 6), su - 14 + Math.round(Math.sin(a) * 5), AMAL); }
};
// 4 · la pantalla del pabellón: 2000 → 2026 y «25»
const p4 = (t) => {
  const o = { encuadre: 'auditorio', camara: 'pantalla', pantalla: 'fechas', numeros: ['2000', '2026'], ovacion: tramo(t, @sabemos@15.4@, @sabemos@16.4@) }; const g = DO.escenario(R, t, o) || {}, su = g.suelo ?? 146;
  const choca = @sabemos@14.4@, u = tramo(t, S4, choca);
  R.actor(EL.steve, Math.round(lerp(90, 140, u)), su, t, { dir: 1, anda: u > 0 && u < 1, brazos: t > choca && t < choca + 0.6, sonrisa: t > choca });
  R.actor(EL.ciclope, Math.round(lerp(230, 170, u)), su, t, { dir: -1, anda: u > 0 && u < 1, brazos: t > choca && t < choca + 0.6, sonrisa: t > choca });
  R.actor(EL.bestia ?? EL.thor, 110, su, t, { dir: 1, salto: t > choca ? Math.round(Math.abs(Math.sin(t * 6)) * 3) : 0 }); R.actor(EL.thor, 200, su, t, { dir: -1, dedo: t > choca });
  if (t > choca && t < choca + 0.5) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28; R.pset(162 + Math.round(Math.cos(a) * 8), su - 26 + Math.round(Math.sin(a) * 6), AMAL); }
  const n = tramo(t, @sabemos@15.5@, @sabemos@15.9@); if (n > 0) R.numero('25', 140, 104 - Math.round((1 - n) * 8), { tam: 16, centro: true });
  if (DO.h_confeti && t > @sabemos@15.5@) DO.h_confeti(R, t, { n: 40, y0: 10, y1: 140 });
  DO.escenarioDelante(R, t, o);
};
// 5 · el espacio: dos Tierras que se acercan; «17» y «2027»
const p5 = (t) => {
  const o = { encuadre: 'espacio', camara: 'choque', choque: 0.74 * tramo(t, S5, S6) }; DO.cosmos(R, t, o);
  const d = tramo(t, @ochenta@21.5@, @ochenta@21.9@), a = tramo(t, @ochenta@22.9@, @ochenta@23.3@);
  if (d > 0) { const y = 112 + Math.round((1 - d) * 40); R.rect(135, y + 2, 187, y + 46, mez(K, H('#000000'), 0.5)); caja(132, y, 184, y + 44, BL, K); R.rect(133, y + 1, 183, y + 10, ROJO); for (const x of [142, 158, 174]) R.rect(x, y - 3, x + 1, y + 3, H('#8a8e98')); R.numero('17', 158, y + 34, { tam: 16, centro: true, color: K }); R.numero('12', 158, y + 9, { centro: true, color: BL }); }
  if (a > 0) R.numero('2027', 158, 100 - Math.round((1 - a) * 6), { tam: 16, centro: true });
};
// 6 · la tienda de cómics: el expositor giratorio
const TIENDA = () => fijo('tienda', () => {
  pinta(0, 0, 319, 140, (x, y) => rampa(HS('#2a3a4a', '#344658', '#3e5266'), 1.4 + (azar(x >> 1, y >> 1) - 0.5) * 0.5 - (x > 276 && y < 46 ? 0.6 : 0), x, y));
  // las baldas de cómics a los lados, con portadas de colores
  for (const [bx0, bx1] of [[6, 96], [224, 316]]) for (let j = 0; j < 4; j++) { const y = 30 + j * 26; if (bx0 > 200 && y < 50) continue; R.rect(bx0, y + 22, bx1, y + 24, H('#6a4a2a')); R.rect(bx0, y + 22, bx1, y + 22, H('#9a6a3a'));
    for (let i = bx0 + 2; i < bx1 - 8; i += 11) { const c = HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a', '#a83ad8', '#e87a3a')[(i + j * 3) % 6]; caja(i, y + 2, i + 9, y + 21, c); R.rect(i + 2, y + 4, i + 7, y + 6, BL); R.disco(i + 5, y + 13, 3, mez(c, K, 0.4)); } }
  // el suelo de baldosas y el mostrador de la derecha
  pinta(0, 141, 319, 179, (x, y) => (((x >> 4) + (y >> 3)) % 2 ? H('#c8b898') : H('#a89878')));
  R.rect(0, 140, 319, 141, H('#4a3a2a'));
  caja(236, 120, 319, 179, H('#7a4a2a')); R.rect(237, 121, 318, 124, H('#a86a3a')); caja(270, 104, 300, 120, H('#3a3e48')); R.rect(272, 106, 298, 114, H('#1a2a1a'));
});
const p6 = (t) => {
  pegar(TIENDA());
  // el expositor: un poste y portadas que pasan (gira) hasta pararse
  const para = @ochenta@26.5@, gir = t < para ? (t - S6) * 40 : (para - S6) * 40;
  R.rect(158, 30, 162, 166, H('#5a5e68')); R.rect(146, 162, 174, 166, H('#3a3e48'));
  for (let j = 0; j < 4; j++) { const y = 34 + j * 32; R.recorte([110, y, 210, y + 28]); for (let i = -1; i < 5; i++) { const x = 110 + ((i * 24 + gir) % 120 + 120) % 120 - 12, c = HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a', '#a83ad8')[(i + j + 10) % 5]; caja(x, y + 2, x + 20, y + 27, c); R.rect(x + 3, y + 5, x + 17, y + 8, BL); R.disco(x + 10, y + 17, 5, mez(c, K, 0.4)); } R.recorte(null); R.rect(110, y, 210, y, H('#8a8e98')); }
  // los dos tomos que la mano saca: 1984 (azul, una estrella blanca) y 2015 (morado, retazos)
  const s1 = tramo(t, @ochenta@26.5@, @ochenta@27.0@), x1 = Math.round(lerp(150, 92, s1)), x2 = Math.round(lerp(152, 214, s1));
  if (s1 > 0) { caja(x1 - 18, 92, x1 + 18, 140, H('#2a4a9a')); R.disco(x1, 110, 7, BL); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28; R.linea(x1, 110, x1 + Math.round(Math.cos(a) * 12), 110 + Math.round(Math.sin(a) * 12), BL); } cartucho(x1 - 20, 124, '1984');
    caja(x2 - 18, 92, x2 + 18, 140, H('#5a2a7a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) R.rect(x2 - 14 + i * 7, 98 + j * 6, x2 - 9 + i * 7, 102 + j * 6, HS('#3ac85a', '#e8b848', '#3a8ae8', '#e83a3a')[(i + j) % 4]); cartucho(x2 - 20, 124, '2015'); }
  if (s1 > 0 && s1 < 1) { T.brazo(R, x2 + 14, 194, x2 + 6, 142, '#3a4a8a', -1, {}); }
  // el dependiente asiente desde el mostrador; un gato duerme encima
  R.actor(EL.vecino ?? EL.senor30, 280, 136, t, { dir: -1, sonrisa: s1 > 0.5, habla: t < para && Math.sin(t * 6) > 0.3 });
  const gx = 252, gy = 120; R.disco(gx, gy, 5, H('#3a3a44')); R.disco(gx + 5, gy - 3, 3, H('#3a3a44')); for (let k = 0; k < 6; k++) R.pset(gx - 5 - k, gy + Math.round(Math.sin(t * 3 + k * 0.6) * k * 0.4), H('#3a3a44'));
};
// 7 · viñeta (1984): el Beyonder y el haz que sube de la Tierra
const V7 = () => vineta('beyonder', () => {
  pintaV((x, y) => rampa(HS('#0a0a24', '#141a3a', '#1e2650', '#2a3468'), 1 + (y / 171) * 1.4 + Math.sin(x * 0.05 + y * 0.03) * 0.5, x, y));
  for (let k = 0; k < 70; k++) { const x = 9 + Math.round(azar(k, 1) * 300), y = 8 + Math.round(azar(k, 2) * 160); if (DENTRO(x, y)) R.pset(x, y, k % 4 ? H('#a8b0d8') : BL); }
  // la Tierra abajo a la izquierda, con sus continentes y su halo
  for (let y = 100; y <= 171; y++) for (let x = 9; x <= 150; x++) { const d = Math.hypot(x - 50, y - 200); if (d < 92) R.pset(x, y, (Math.sin(x * 0.12) + Math.cos(y * 0.15 + x * 0.05)) > 0.7 ? H('#3a9a4a') : H('#2a6ab8')); else if (d < 96) R.pset(x, y, H('#8ac8f0')); }
});
const p7 = (t) => {
  T.comic(R, t, OA); pegar(V7());
  const ser = tramo(t, S7 + 0.2, @ochenta@31.3@) ** 2, hz = tramo(t, @ochenta@31.4@, S8);
  // la estrella blanca: crece desde un punto, rayos que giran y un núcleo que late; un cometa cruza
  const sx = 208, sy = 64, rr = 3 + Math.round(ser * 19 + Math.sin(t * 6) * 2);
  { const u = tramo(t, S7, S7 + 2.6), x = Math.round(lerp(40, 180, u)), y = Math.round(lerp(30, 50, u)); if (u > 0 && u < 1) for (let i = 0; i < 12; i++) R.pset(x - i, y - Math.round(i * 0.15), i < 2 ? BL : H('#8ab0e8')); }
  if (ser > 0.02) { for (let k = 0; k < 16; k++) { const a = k / 16 * 6.28 + t * 0.6, L = rr + 10 + (k % 2) * 14; R.linea(sx, sy, Math.round(sx + Math.cos(a) * L), Math.round(sy + Math.sin(a) * L), k % 2 ? H('#fff6c8') : BL); } R.disco(sx, sy, rr, H('#fff6c8')); R.disco(sx, sy, rr - 3, BL); }
  else { R.disco(sx, sy, 2, BL); }
  // el haz de la Tierra a la estrella y los que suben por él
  if (hz > 0) { for (let i = 0; i <= 100; i++) { const u = i / 100; if (u > hz) break; const x = Math.round(lerp(70, sx, u)), y = Math.round(lerp(130, sy, u)); for (let w = -4; w <= 4; w++) if ((x + y + w) % 2 === 0 || Math.abs(w) < 2) R.pset(x + w, y, Math.abs(w) < 2 ? BL : H('#fff6c8')); }
    [EL.steve, EL.doom, EL.thor, EL.magneto ?? EL.loki, EL.hulk].forEach((d, k) => { const u = Math.max(0, hz * 1.1 - k * 0.14); if (u <= 0) return; const x = Math.round(lerp(70, sx, u * 0.8)), y = Math.round(lerp(130, sy, u * 0.8)); R.actor(d, x - 7, y + 12, t, { dir: k % 2 ? -1 : 1, brazos: true }); }); }
  cartucho(14, 13, '1984');
  T.comicDelante(R, t, OA);
};
// 8 · viñeta: el planeta lejano; la luz los deja; Hulk; Doom se queda el poder
const p8 = (t) => {
  const baja = tramo(t, S8, @ochenta@34.2@), apaga = t > @ochenta@36.2@, l = apaga ? 0 : Math.min(0.99, 0.2 + baja * 0.75 + tramo(t, @ochenta@34.2@, @ochenta@36.2@) * 0.04);
  const o = { encuadre: 'mundo', camara: 'arena', luz: l, poder: tramo(t, @ochenta@37.1@, @ochenta@38.3@) }; const g = T.comic(R, t, o), su = g.suelo ?? 158, [dx] = g.doom ?? [220, 158];
  const sal = tramo(t, @ochenta@34.0@, @ochenta@35.2@), hk = @ochenta@35.7@;
  [[EL.steve, 66], [EL.thor, 86], [EL.sam, 46]].forEach(([d, x], k) => { if (sal > 0) R.actor(d, Math.round(lerp(150, x, sal)), su, t, { dir: 1, anda: sal < 1, dedo: sal >= 1 && k === 0, enfado: sal >= 1 }); });
  [[EL.magneto ?? EL.loki, 248], [EL.loki, 268]].forEach(([d, x]) => { if (sal > 0) R.actor(d, Math.round(lerp(162, x, sal)), su, t, { dir: -1, anda: sal < 1, enfado: sal >= 1 }); });
  if (sal > 0) { const hx = Math.round(lerp(152, 112, sal)); R.actor(EL.hulk, hx, su, t, { dir: 1, brazos: t > hk && t < hk + 0.8, enfado: true }); if (t > hk && t < hk + 1.2) { R.anillo(hx + 8, su - 16, 16 + Math.round((t - hk) * 10), H('#7aff7a')); R.icono('!', hx + 4, su - 52, H('#7aff7a'), K, 2); } }
  const brilla = t > @ochenta@38.0@; if (sal > 0) R.actor(EL.doom, dx - 7, su, t, { dir: -1, brazos: t > @ochenta@36.9@ });
  if (brilla) for (let k = 0; k < 12; k++) { const a = k / 12 * 6.28 + t * 2, r = 14 + Math.sin(t * 6 + k) * 3; R.pset(dx + Math.round(Math.cos(a) * r), su - 14 + Math.round(Math.sin(a) * r), VERDE); }
  T.comicDelante(R, t, o);
};
// 9 · viñeta (2015): las burbujas que chocan y se rompen
const V9 = () => vineta('burbujas', () => {
  pintaV((x, y) => rampa(HS('#1a0a2a', '#2a1440', '#3a1e58', '#4a2a6a'), 1 + Math.sin(x * 0.04) * 0.6 + (y / 171) + (azar(x >> 2, y >> 2) - 0.5) * 0.6, x, y));
  for (let k = 0; k < 60; k++) { const x = 9 + Math.round(azar(k, 5) * 300), y = 8 + Math.round(azar(k, 6) * 130); if (DENTRO(x, y)) R.pset(x, y, k % 3 ? H('#c8a8e8') : BL); }
  // el suelo de roca del borde, abajo
  pintaV((x, y) => (y > 150 + Math.round(Math.sin(x * 0.07) * 4) ? rampa(HS('#2a1a2a', '#3a2638', '#4a3248'), 1 + (azar(x, y) - 0.5), x, y) : null));
});
const burbuja = (x, y, r, c1, c2, k) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, c1); R.recorte([x - r, y + 2, x + r, y + r]); R.disco(x, y + r + 2, r, c2); R.recorte(null); R.anillo(x, y, r, K); R.disco(x - Math.round(r * 0.4), y - Math.round(r * 0.4), Math.max(1, Math.round(r / 5)), BL);
  for (let i = -2; i <= 2; i++) R.pset(x + i * 3, y + 3 - (i & 1), K); };
const p9 = (t) => {
  T.comic(R, t, OA); pegar(V9());
  const ch = @dios@43.0@, va = @dios@43.8@, u = tramo(t, S9, ch), cx = 160, cy = 70;
  const B = [[40, 40, '#3a8ae8', '#3ac85a'], [280, 70, '#e83a3a', '#e8b848'], [100, 130, '#a83ad8', '#8ac8f0'], [230, 140, '#e8b848', '#c8783a']];
  if (t < ch) B.forEach(([x, y, c1, c2], k) => burbuja(Math.round(lerp(x, cx + (k % 2 ? 14 : -14), u * 0.9)), Math.round(lerp(y, cy + (k < 2 ? -8 : 10), u * 0.9)), 14 + k * 2, H(c1), H(c2), k));
  else if (t < va) { const e = tramo(t, ch, va); for (let k = 0; k < 20; k++) { const a = k / 20 * 6.28, r = 6 + e * 30 + (k % 3) * 4; R.linea(cx, cy, cx + Math.round(Math.cos(a) * r), cy + Math.round(Math.sin(a) * r), k % 2 ? AMA : BL); } R.disco(cx, cy, 10 - Math.round(e * 6), BL); }
  else { const e = tramo(t, va, S10); for (let k = 0; k < 18; k++) { const a = k / 18 * 6.28 + 0.2, d = 12 + e * 70, x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d * 0.7), c = HS('#3a8ae8', '#e83a3a', '#a83ad8', '#e8b848', '#3ac85a')[k % 5]; if (e < 0.95) R.poligono([[x, y - 3], [x + 3, y + 2], [x - 2, y + 3]], c); } }
  // Doom, pequeño, mira desde la roca y al final levanta los brazos
  R.actor(EL.doom, 150, 160, t, { dir: 1, brazos: t > @dios@44.2@, sorpresa: t > ch && t < va });
  if (t > @dios@41.3@) cartucho(14, 13, '2015');
  T.comicDelante(R, t, OA);
};
// 10 · viñeta: el mundo de retazos; las costuras; el trono
const p10 = (t) => {
  const tr = @dios@48.9@, o = { encuadre: 'mundo', cose: tramo(t, @dios@46.5@, @dios@47.7@), choque: 0, trono: t > tr ? 1 : 0 }; T.comic(R, t, o);
  // los trozos que vuelan hacia Doom y el hilo verde con el que cose
  const junta = tramo(t, S10, @dios@46.4@); if (junta < 1) for (let k = 0; k < 12; k++) { const a = k / 12 * 6.28, d = (1 - junta) * 110 + 6, x = Math.round(160 + Math.cos(a) * d), y = Math.round(100 + Math.sin(a) * d * 0.6); if (DENTRO(x, y)) R.poligono([[x, y - 3], [x + 4, y + 1], [x - 2, y + 3]], HS('#3a8ae8', '#e83a3a', '#a83ad8', '#e8b848')[k % 4]); }
  const cose = t > @dios@46.5@ && t < @dios@47.8@; if (cose) for (let k = 0; k < 30; k++) { const x = 120 + k * 3, y = 124 + Math.round(Math.sin(k * 0.8 + t * 8) * 3); R.pset(x, y, VERDE); }
  if (t < tr) R.actor(EL.doom, 153, 112, t, { dir: 1, brazos: junta < 1 || cose, sostiene: cose ? [168, 104] : false });
  else { R.actor(EL.doom, 153, 96, t, { dir: 1, brazos: t > @dios@49.2@ && t < @dios@50.0@ }); if (t < tr + 0.25) velo(9, 8, 310, 171, BL, 0.6 - (t - tr) * 2.4); for (let k = 0; k < 8; k++) { const a = t * 2 + k * 0.8; R.pset(160 + Math.round(Math.cos(a) * 14), 64 + Math.round(Math.sin(a) * 4), AMA); } }
  T.comicDelante(R, t, o);
};
// 11 · la sala de lado: en la pantalla, dos mundos chocan y la luz verde se lleva a Hulk
const peli11 = (R2, t, [x0, y0, x1, y1]) => {
  pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#0a0a1e', '#141838', '#20264e'), 1 + Math.sin(x * 0.05 + y * 0.04 + t) * 0.6 + (azar(x >> 2, y >> 2) - 0.5) * 0.6, x, y));
  const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, u = tramo(t, S11, @dios@50.9@);
  if (t < @dios@51.6@) { for (const [s, c1, c2] of [[-1, '#3a8ae8', '#3ac85a'], [1, '#e83a3a', '#e8b848']]) { const x = Math.round(cx + s * lerp(70, 22, u)); R.disco(x, cy, 22, H(c1)); R.disco(x - 6, cy - 6, 8, H(c2)); } if (u >= 1) { R.disco(cx, cy, 14 + Math.round((t * 20) % 8), BL); } }
  else { for (let y = y0; y <= y1; y++) for (let x = cx - 18; x <= cx + 18; x++) if ((x + y) % 2 === 0) R.pset(x, y, Math.abs(x - cx) < 8 ? H('#c8ffd8') : VERDE); const hu = tramo(t, @dios@51.7@, @dios@53.0@); escalado(EL.hulk, cx - 24, Math.round(lerp(cy + 6, y0 - 40, hu)), 2, t, { dir: 1, brazos: true }, (c) => mez(c, VERDE, 0.5), [x0, y0, x1, y1]); DO.e_mascara(R, cx + 60, cy, 3, { capucha: true, ojos: 1 }); }
};
const p11 = (t) => {
  const o = { encuadre: 'cine', pantalla: peli11, publico: 'normal' }; DO.hoy(R, t, o);
  const fam = @dios@53.3@, su = 166;
  R.actor(EL.chicoHoy, 182, su - (t > fam ? 2 : 0), t, { dir: -1, sorpresa: t > fam - 1, dedo: t > fam, salto: t > fam && t < fam + 0.6 ? 3 : 0 });
  R.actor(EL.chicaHoy, 200, su, t, { dir: -1, habla: t > fam && Math.sin(t * 7) > 0, sonrisa: t > fam + 0.5 });
  DO.hoyDelante(R, t, o);
  if (t > fam) R.icono('!', 186, su - 46, AMA, K, 2);
};
// 12 · la mesa: la balanza, el cómic y la lata de película; el calendario de 2027
const MESA12 = () => fijo('balanza', () => {
  pinta(0, 0, 319, 118, (x, y) => { const f = x % 20; return rampa(HS('#2a2638', '#342e46', '#3e3854'), 1.2 + (f < 10 ? 0.3 : -0.2) + (f === 0 ? -0.8 : 0) + (azar(x >> 1, y >> 1) - 0.5) * 0.4 - (x > 276 && y < 46 ? 0.5 : 0), x, y); });
  // una balda con cómics y una figurita, y la ventana con la luna
  R.rect(14, 60, 120, 63, H('#6a4a2a')); for (let i = 18; i < 100; i += 7) caja(i, 36, i + 5, 59, HS('#e83a3a', '#3a8ae8', '#f0c830', '#3ac85a', '#a83ad8')[(i >> 3) % 5]);
  caja(196, 54, 260, 104, H('#141c3a'), H('#e8e2d0')); R.rect(227, 55, 228, 103, H('#e8e2d0')); R.disco(246, 70, 6, H('#f8f0c8')); R.disco(244, 68, 5, H('#141c3a'));
  // la mesa de madera
  pinta(0, 118, 319, 179, (x, y) => rampa(HS('#5a3418', '#7a4a24', '#9a6234', '#b87a44'), 2.2 - (y - 118) / 40 + (Math.sin(x * 0.11 + Math.sin(y * 0.4) * 3) > 0.8 ? -0.9 : 0) + (y < 121 ? 1 : 0), x, y));
  R.rect(0, 118, 319, 118, K);
  // la lámpara de mesa y un bote de lápices
  R.rect(28, 92, 32, 128, H('#3a3a44')); R.poligono([[16, 92], [44, 92], [38, 80], [22, 80]], H('#c8a04a')); for (let j = 0; j < 30; j++) for (let i = -j; i <= j; i++) if ((i + j) % 3 === 0) R.pset(30 + i, 94 + j, mez(H('#7a4a24'), H('#fff0b0'), 0.25));
  caja(60, 104, 74, 128, H('#3a5a8a')); for (const [x, c] of [[63, '#e83a3a'], [67, '#f0c830'], [71, '#3ac85a']]) R.rect(x, 94, x + 1, 104, H(c));
});
const p12 = (t) => {
  pegar(MESA12());
  const pone = tramo(t, @dios@55.2@, @dios@55.9@), eq = tramo(t, @dios@56.6@, @dios@57.9@), ang = pone < 1 ? 0.28 : 0.28 * (1 - eq) * Math.cos((t - @dios@55.9@) * 9) * (1 - eq);
  // la balanza: pie, columna, astil que se inclina y dos platillos
  const cx = 150, cy = 70; caja(cx - 20, 124, cx + 20, 132, H('#c8a04a')); R.rect(cx - 2, cy, cx + 2, 124, H('#c8a04a')); R.rect(cx - 1, cy, cx - 1, 124, H('#f0d880'));
  const lx = Math.round(cx - Math.cos(ang) * 50), ly = Math.round(cy + Math.sin(ang) * 50), rx = Math.round(cx + Math.cos(ang) * 50), ry = Math.round(cy - Math.sin(ang) * 50);
  R.linea(lx, ly, rx, ry, K); R.linea(lx, ly + 1, rx, ry + 1, H('#c8a04a')); R.disco(cx, cy, 4, H('#c8a04a')); R.disco(cx, cy, 2, H('#8a6a2a'));
  for (const [px, py] of [[lx, ly], [rx, ry]]) { R.linea(px, py, px - 14, py + 30, H('#8a6a2a')); R.linea(px, py, px + 14, py + 30, H('#8a6a2a')); R.rect(px - 18, py + 30, px + 18, py + 32, H('#c8a04a')); R.rect(px - 18, py + 32, px + 18, py + 32, H('#8a6a2a')); }
  // el cómic en el platillo izquierdo y la lata de película (o la mano que la trae) en el derecho
  caja(lx - 12, ly + 12, lx + 12, ly + 30, H('#2a4a9a')); DO.e_mascara(R, lx, ly + 20, 1.2, { ojos: 0.8 }); R.rect(lx - 11, ly + 13, lx + 11, ly + 15, AMA);
  const kx = Math.round(lerp(300, rx, pone)), ky = Math.round(lerp(150, ry + 24, pone));
  R.disco(kx, ky, 11, K); R.disco(kx, ky, 10, H('#8a8e98')); R.disco(kx, ky, 6, H('#5a5e68')); R.disco(kx, ky, 2, H('#c8ccd4')); for (const a of [0.6, 2.7, 4.8]) R.disco(kx + Math.round(Math.cos(a) * 7), ky + Math.round(Math.sin(a) * 7), 1, H('#3a3e48'));
  if (pone < 1) T.brazo(R, kx + 46, 190, kx + 10, ky + 2, '#3a4a8a', -1, { codo: [kx + 38, ky + 32] });
  if (t > S12 && t < @dios@56.6@) R.icono('?', rx + 14, ry - 18, AMA, K, 2);
  if (eq >= 1) R.numero('=', cx, cy - 8, { tam: 16, centro: true });
  // el taco de calendario: pasa a 17 de diciembre de 2027
  const fl = tramo(t, @dios@58.3@, @dios@58.8@); caja(232, 120, 288, 168, H('#3a3a44')); caja(236, 124, 284, 164, BL, H('#b8b0a0')); R.rect(237, 125, 283, 133, ROJO);
  R.numero(fl > 0.5 ? '17' : '18', 260, 158, { tam: 16, centro: true, color: K }); R.numero('12', 260, 132, { centro: true, color: BL });
  if (fl > 0 && fl < 1) R.poligono([[236, 124], [284, 124], [284 - fl * 10, 124 + fl * 40], [236 + fl * 10, 124 + fl * 40]], H('#e8e2d0'));
  if (fl > 0.5) R.numero('2027', 260, 114, { tam: 16, centro: true });
  // el gato pasea por la mesa y se sienta junto a la balanza
  const g = tramo(t, S12 + 0.3, S12 + 2.6), gx = Math.round(lerp(-10, 96, g)), gy = 128, paso = g > 0 && g < 1 ? Math.floor(t * 8) % 2 : 0;
  R.disco(gx, gy - 6, 6, H('#e8e2d0')); R.disco(gx + 7, gy - 11, 4, H('#e8e2d0')); R.pset(gx + 5, gy - 16, H('#e8e2d0')); R.pset(gx + 9, gy - 16, H('#e8e2d0')); R.pset(gx + 6, gy - 12, K); R.pset(gx + 9, gy - 12, K);
  R.rect(gx - 4, gy - 2, gx - 3, gy + paso, H('#c8c0b0')); R.rect(gx + 3, gy - 2, gx + 4, gy + 1 - paso, H('#c8c0b0')); for (let k = 0; k < 7; k++) R.pset(gx - 6 - k, gy - 8 - Math.round(Math.sin(t * 3 + k * 0.6) * k * 0.5), H('#e8e2d0'));
};
const año = (t) => (t >= S7 && t < S11 ? null : t > @dios@58.5@ ? 2027 : 2026);
const efectos = [[@sabemos@3.2@, 'zumbido'], [@sabemos@5.2@, 'brillo'], [S2 + 0.3, 'whoosh'], [@sabemos@11.9@, 'palmada'], [@sabemos@12.9@, 'flash'], [@sabemos@14.4@, 'palmada'], [@sabemos@15.6@, 'publico'],
  [@ochenta@19.5@, 'whoosh'], [@ochenta@21.6@, 'papel'], [@ochenta@23.0@, 'brillo'], [@ochenta@25.0@, 'whoosh'], [@ochenta@26.6@, 'papel'], [@ochenta@31.0@, 'brillo'], [@ochenta@31.6@, 'whoosh'],
  [@ochenta@33.0@, 'zumbido'], [@ochenta@35.7@, 'boom'], [@ochenta@37.2@, 'zumbido'], [@dios@43.0@, 'boom'], [@dios@43.8@, 'chof'], [@dios@45.0@, 'whoosh'], [@dios@46.6@, 'lapiz'], [@dios@48.9@, 'campana'],
  [@dios@50.9@, 'boom'], [@dios@53.3@, 'boing'], [@dios@55.9@, 'toc'], [@dios@57.9@, 'brillo'], [@dios@58.4@, 'papel']];
T.rodar(E, R, [[0, p1], [S2, p2], [S3, p3], [S4, p4], [S5, p5], [S6, p6], [S7, p7], [S8, p8], [S9, p9], [S10, p10], [S11, p11], [S12, p12]], { efectos, año });
''', 'dd-secret'))

# ───────────────────────────────────────────────────────────────────────────────────────────────── DD-CIERRE
E['dd-cierre'] = ('Cierre', '''// DD-CIERRE (frase 35), 2026. Dos planos:
// 1. la mesa de Atom a oscuras, de cerca: el monitor con la barra quieta en 99 % y la cuenta atrás (29 días) que baja; el
//    gato cruza y pisa el teclado («If the final trailer comes out»): las teclas se encienden y la barra sigue en 99; se
//    hace un ovillo junto al ratón (corta en «And you»);
// 2. el estudio a oscuras (o.dormido): Atom se ha dormido (una burbuja de sueño que se hincha y se deshincha a su lado);
//    el reloj de la pared sigue bajando; en el corcho se encienden la máscara de Doom y el puño verde, con un hilo rojo y
//    una «?» en «Doom wants Hulk».''', _en(COMUN + r'''
const K2 = @final@3.55@;
// la burbuja de sueño de Atom, junto a su esquina
const suena = (t) => { const r = 3 + Math.round((Math.sin(t * 2.4) + 1) * 2.2), x = 270, y = 40; R.anillo(x, y, r, H('#c8e0ff')); R.pset(x - Math.round(r / 2), y - Math.round(r / 2), BL); R.disco(x + 4, y + r + 3, 1, H('#c8e0ff')); };
// 1 · la mesa de cerca: el monitor en 99 % y la cuenta atrás; el gato y el teclado
const MESAN = () => fijo('mesaNoche', () => {
  pinta(0, 0, 319, 118, (x, y) => rampa(HS('#0e1024', '#161a34', '#1e2444'), 1 + (x % 14 < 1 ? -0.8 : 0) + (azar(x >> 1, y >> 1) - 0.5) * 0.5 - (x > 276 && y < 46 ? 0.5 : 0), x, y));
  // la ventana con la luna, que deja su luz azul en la mesa
  caja(262, 56, 316, 112, H('#0a1030'), H('#3a4060')); R.rect(288, 57, 289, 111, H('#3a4060')); R.disco(302, 74, 6, H('#e8eaf8')); R.disco(300, 72, 5, H('#0a1030'));
  for (let k = 0; k < 12; k++) R.pset(264 + Math.round(azar(k, 1) * 50), 60 + Math.round(azar(k, 2) * 48), H('#8a90b8'));
  pinta(0, 118, 319, 179, (x, y) => rampa(HS('#1e140c', '#2e1e12', '#3e2a18', '#4e3620'), 1.4 + (Math.sin(x * 0.11 + Math.sin(y * 0.4) * 3) > 0.8 ? -0.9 : 0) + (y < 121 ? 1.2 : 0) + (x > 240 ? 0.6 : 0), x, y)); R.rect(0, 118, 319, 118, K);
  // el monitor (x 56–234, y 14–118), su pie, el teclado y el ratón; el flexo apagado, la taza fría y las figuritas
  caja(56, 24, 234, 114, H('#2a2e38')); R.rect(136, 114, 154, 122, H('#3a3e48')); R.rect(120, 122, 170, 126, H('#3a3e48'));
  caja(70, 136, 214, 162, H('#2a2e38')); for (let j = 0; j < 3; j++) for (let i = 0; i < 16; i++) caja(74 + i * 8 + j * 2, 140 + j * 7, 80 + i * 8 + j * 2, 145 + j * 7, H('#4a4e58'), K);
  R.disco(236, 150, 6, K); R.disco(236, 150, 5, H('#4a4e58')); R.linea(236, 144, 230, 130, H('#2a2e38'));
  R.rect(22, 70, 25, 128, H('#3a3a44')); R.poligono([[10, 70], [36, 70], [30, 58], [16, 58]], H('#5a5a64'));
  caja(260, 126, 276, 146, H('#e8e2d0')); R.rect(261, 127, 275, 130, H('#3a2416'));
  DO.e_mascara(R, 292, 140, 1.4, { ojos: 0.2 }); R.disco(306, 150, 5, H('#2a8a3a')); R.rect(302, 152, 310, 160, H('#2a8a3a'));
  R.rect(286, 160, 312, 162, H('#4a3a2a'));
});
const p1 = (t) => {
  pegar(MESAN());
  // la pantalla: el reproductor esperando, la barra en 99 % que late y la cuenta atrás
  const [x0, y0, x1, y1] = [60, 28, 230, 110]; pinta(x0, y0, x1, y1, (x, y) => rampa(HS('#060a14', '#0c1424', '#121c34'), 1 + (y - y0) / 60 + (azar(x >> 1, y >> 1) - 0.5) * 0.4, x, y));
  R.numero('99%', 145, 64, { tam: 16, centro: true });
  caja(80, 72, 210, 82, H('#0a0a10'), H('#3a4a5a')); R.rect(81, 73, 207, 81, Math.floor(t * 2) % 2 ? H('#3ae88a') : H('#2ac87a')); R.rect(208, 73, 209, 81, H('#1a2a2a'));
  const quedan = 29 * 86400 + 6 * 3600 + 14 * 60 + 52 - Math.floor(t), hh = Math.floor((quedan % 86400) / 3600), mm = Math.floor((quedan % 3600) / 60), ss = quedan % 60, d2 = (n) => String(n).padStart(2, '0');
  R.numero('29', 96, 102, { centro: true, color: ROJO }); R.numero(d2(hh) + ':' + d2(mm) + ':' + d2(ss), 160, 102, { centro: true, color: H('#c8d0e8') });
  // el gato cruza la mesa, pisa el teclado (las teclas se encienden) y se hace un ovillo
  const cruza = tramo(t, 0.3, @final@2.6@), gx = Math.round(lerp(-20, 216, cruza)), gy = 150, paso = cruza > 0 && cruza < 1 ? Math.floor(t * 8) % 2 : 0;
  if (gx > 70 && gx < 214 && cruza < 1) for (let k = 0; k < 4; k++) { const i = Math.floor((gx - 74) / 8) + k - 2; if (i >= 0 && i < 16) caja(74 + i * 8 + 2, 147, 80 + i * 8 + 2, 152, H('#8ac8ff'), K); }
  if (cruza < 1) { R.disco(gx, gy - 8, 7, H('#c87a3a')); R.disco(gx + 8, gy - 14, 5, H('#c87a3a')); R.pset(gx + 5, gy - 20, H('#c87a3a')); R.pset(gx + 10, gy - 20, H('#c87a3a')); R.pset(gx + 7, gy - 15, AMA); R.pset(gx + 10, gy - 15, AMA);
    R.rect(gx - 5, gy - 3, gx - 4, gy + paso, H('#a85a2a')); R.rect(gx + 4, gy - 3, gx + 5, gy + 1 - paso, H('#a85a2a')); for (let k = 0; k < 8; k++) R.pset(gx - 8 - k, gy - 10 - Math.round(Math.sin(t * 4 + k * 0.6) * k * 0.4), H('#c87a3a')); }
  else { const ox = 244, oy = 164; R.disco(ox, oy, 8, H('#c87a3a')); R.disco(ox + 6, oy - 2, 4, H('#c87a3a')); R.rect(ox + 4, oy - 2, ox + 5, oy - 2, K); R.rect(ox + 7, oy - 2, ox + 8, oy - 2, K); for (let k = 0; k < 6; k++) R.pset(ox - 8 + k, oy + 6 - Math.round(Math.abs(Math.sin(t * 2 + k)) * 1), H('#a85a2a')); }
  // la luz de la luna en la mesa
  for (let y = 120; y < 179; y++) for (let x = 250 - (y - 120); x < 300 - (y - 120) * 0.5; x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), H('#8a90c8'), 0.25));
};
// 2 · el estudio dormido: el reloj sigue bajando; la máscara, el puño y la «?»
const p2 = (t) => {
  const o = { encuadre: 'estudio', dormido: 1, dias: 29, pared: 0.8 }; T.estudio(R, t, o);
  const q = @final@4.95@, enc = tramo(t, @final@4.9@, @final@5.3@);
  // en el corcho: la máscara de Doom y el puño verde se encienden con un hilo rojo y una «?» entre los dos
  const [mx, my, fx, fy] = [42, 58, 112, 58];
  if (enc > 0) { R.anillo(mx, my, 12, mez(H('#1e2444'), AMA, enc)); R.anillo(fx, fy, 12, mez(H('#1e2444'), AMA, enc)); }
  caja(mx - 9, my - 11, mx + 9, my + 11, H('#1e3a24')); DO.e_mascara(R, mx, my, 1.6, { capucha: true, ojos: enc });
  caja(fx - 9, fy - 11, fx + 9, fy + 11, H('#1e2a3a')); R.disco(fx, fy - 1, 6, H('#2a8a3a')); for (let k = 0; k < 4; k++) R.rect(fx - 5 + k * 3, fy - 8, fx - 4 + k * 3, fy - 5, H('#3aa84a')); R.rect(fx - 3, fy + 5, fx + 3, fy + 9, H('#2a8a3a'));
  const hilo = tramo(t, @final@4.5@, q); for (let i = 0; i <= Math.round(hilo * 52); i++) R.pset(mx + 9 + i, my + Math.round(Math.sin(i / 52 * Math.PI) * 6), ROJO);
  if (t > q) { const dy = Math.round((1 - tramo(t, q, q + 0.25)) * 5); R.disco(77, 74 - dy, 10, K); R.disco(77, 74 - dy, 9, H('#2a1a2a')); R.icono('?', 72, 66 - dy, AMA, K, 2); }
  T.estudioDelante(R, t, o);
  suena(t);
};
const efectos = [[1.4, 'tecleo'], [@final@3.2@, 'miau'], [@final@4.95@, 'pop']];
T.rodar(E, R, [[0, p1], [K2, p2]], { efectos, año: 2026 });
''', 'dd-cierre'))
