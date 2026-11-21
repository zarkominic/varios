// MINI-CHIBI · ayudas para las miniaturas con chibis (regla del usuario, 09/11/2026: «está bien que aparezcan los chibi en
// las miniaturas, es la esencia del canal, pero no uvitas con ojos, cositas muy de bebés»). Personas chibi del reparto,
// al doble, sobre el decorado real del episodio; nada de mascotas ni objetos con cara; luz de cine (viñeta, tinte y un
// halo que separa al personaje del fondo) para que se lea adulto.
//   figura(R, def, x, ySuelo, t, op, s): pinta el actor (R.actor con op) a escala s, con los pies en (x, ySuelo). Si
//     op.cosa(R, mano) existe, la pinta en el búfer del actor (en coordenadas 1:1, junto a la mano) antes de escalar, para
//     que lo que sostiene crezca con él. Devuelve { x0, y0, x1, y1, mano } en la pantalla.
//   grado(R, { cx, cy, rx, ry, desde, max, tinte, f }): viñeta oscura y un tinte de color de toda la imagen.
//   halo(R, cx, cy, rx, ry, color, f): luz que se suma (para recortar a los personajes contra el fondo).
//   desplazar(R, dx): mueve toda la imagen dx píxeles (para centrar un decorado en el recorte vertical de los Shorts).
const hx = (s) => (0xff000000 | (parseInt(s.slice(5, 7), 16) << 16) | (parseInt(s.slice(3, 5), 16) << 8) | parseInt(s.slice(1, 3), 16)) >>> 0;
const mez = (a, b, f) => { let r = 0; for (const sh of [0, 8, 16]) r |= (Math.round(((a >>> sh) & 255) * (1 - f) + ((b >>> sh) & 255) * f) & 255) << sh; return (0xff000000 | r) >>> 0; };
const VACIO = 0x01020304;
let tmp = null;

export function figura(R, def, x, ySuelo, t, op = {}, s = 2) {
  if (!tmp) tmp = R.nuevo();
  const prev = R.usar(tmp); tmp.fill(VACIO);
  const FX = 60, FY = 90;
  const r = R.actor(def, FX, FY, t, { quieto: true, ...op }) || {};
  const mano = r.mano || null;
  if (op.cosa) op.cosa(R, mano || [FX + 8, FY - 12]);
  R.usar(prev);
  let x0 = 320, y0 = 180, x1 = -1, y1 = -1;
  for (let y = 0; y < 180; y++) for (let xx = 0; xx < 320; xx++) if (tmp[y * 320 + xx] !== VACIO) { x0 = Math.min(x0, xx); x1 = Math.max(x1, xx); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) return null;
  const B = R.buf, ox = x - FX * s, oy = ySuelo - FY * s;
  for (let y = y0; y <= y1; y++) for (let xx = x0; xx <= x1; xx++) {
    const c = tmp[y * 320 + xx]; if (c === VACIO) continue;
    for (let j = 0; j < s; j++) for (let i = 0; i < s; i++) { const X = ox + xx * s + i, Y = oy + y * s + j; if (X >= 0 && X < 320 && Y >= 0 && Y < 180) B[Y * 320 + X] = c; }
  }
  return { x0: ox + x0 * s, y0: oy + y0 * s, x1: ox + x1 * s + s - 1, y1: oy + y1 * s + s - 1, mano: mano && [ox + mano[0] * s, oy + mano[1] * s] };
}

export function grado(R, { cx = 160, cy = 90, rx = 200, ry = 120, desde = 0.6, max = 0.6, fuerza = 1.4, tinte = null, f = 0 } = {}) {
  const B = R.buf, K = hx('#05060a'), T = tinte ? hx(tinte) : 0;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c = B[y * 320 + x];
    if (T) c = mez(c, T, f);
    const v = Math.hypot((x - cx) / rx, (y - cy) / ry);
    if (v > desde) c = mez(c, K, Math.min(max, (v - desde) * fuerza));
    B[y * 320 + x] = c;
  }
}

export function halo(R, cx, cy, rx, ry, color, f, pot = 1.2) {
  const B = R.buf, C = hx(color);
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1) B[y * 320 + x] = mez(B[y * 320 + x], C, f * (1 - d) ** pot);
  }
}

export function desplazar(R, dx) {
  const B = R.buf, c = B.slice();
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const sx = Math.min(319, Math.max(0, x - dx)); B[y * 320 + x] = c[y * 320 + sx]; }
}

// el año grande en blanco hueso con sombra dura (la cifra de las miniaturas)
export const HUESO = ['#f4f0e4', '#d8d2c2', '#a8a090', '#6a6458'].map(hx);
export const cifra = (R, txt, x, y, tam = 16) => R.numero(txt, x, y, { tam, centro: true, rampa: HUESO });
