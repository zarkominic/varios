// GB-MINI-LETRAS · copia de bl-mini-letras.js (las letras gruesas de las miniaturas del 48) con T, I, ?, 6 y 0 para el 49.
// Origen (prueba de miniaturas sin Atom, con texto en inglés,
// aprobada por el usuario el 25/11/2026). Pixel 5 × 7 con contorno oscuro, sombra dura y brillo arriba, como «MARY» del 47.
//   palabra(R, txt, x, y, s, color, sombra, o): escribe txt (mayúsculas, cifras y espacio) con celdas de s px; devuelve
//   el ancho. ancho(txt, s): lo que medirá. o.contorno: el color del contorno.
import { hex } from '/atomo/plato/kits/pixel-retro.js';
const F = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'], B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'], E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'], L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'], N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'], U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '.#.#.', '.#.#.', '..#..'], Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  G: ['.###.', '#....', '#....', '#.###', '#...#', '#...#', '.###.'], K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'], I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '?': ['.###.', '#...#', '....#', '..##.', '..#..', '.....', '..#..'], 6: ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
  0: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'], 3: ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
};
export const ancho = (txt, s) => [...txt].reduce((a, ch) => a + (ch === ' ' ? 4 : 6) * s, 0) - s;
export function palabra(R, txt, x, y, s, c, sombra, o = {}) {
  const celdas = []; let cx = x;
  for (const ch of txt) { if (ch === ' ') { cx += 4 * s; continue; } const g = F[ch]; for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (g[j][i] === '#') celdas.push([cx + i * s, y + j * s]); cx += 6 * s; }
  const K = hex(o.contorno ?? '#1a1020'), d = Math.max(2, Math.round(s * 0.6));
  for (const [px, py] of celdas) R.rect(px - 1 + d, py - 1 + d, px + s + d, py + s + d, sombra);   // sombra dura
  for (const [px, py] of celdas) R.rect(px - 2, py - 2, px + s + 1, py + s + 1, K);              // contorno
  for (const [px, py] of celdas) R.rect(px, py, px + s - 1, py + s - 1, c);
  const hay = new Set(celdas.map(([px, py]) => px + ',' + py));
  for (const [px, py] of celdas) if (!hay.has(px + ',' + (py - s))) R.rect(px, py, px + s - 1, py, hex('#ffffff'));   // brillo solo en el canto de arriba de cada trazo
  for (const [px, py] of celdas) if (!hay.has(px + ',' + (py + s))) R.rect(px, py + s - 1, px + s - 1, py + s - 1, o.bajo ? hex(o.bajo) : c);
  return cx - x - s;
}

// nombre(R, x, y, s, c, sombra): «GÖBEKLI TEPE» con su diéresis (dos puntos sobre la O, a 2 celdas por encima de y:
// deja sitio arriba). Devuelve el ancho. o.lineas true: en dos líneas, «GÖBEKLI» y debajo «TEPE» (devuelve el alto).
export function nombre(R, x, y, s, c, sombra, o = {}) {
  const punto = (px, py) => { const K = hex('#1a1020'), d = Math.max(2, Math.round(s * 0.6));
    R.rect(px - 1 + d, py - 1 + d, px + s + d, py + s + d, sombra); R.rect(px - 2, py - 2, px + s + 1, py + s + 1, K); R.rect(px, py, px + s - 1, py + s - 1, c); R.rect(px, py, px + s - 1, py, hex('#ffffff')); };
  punto(x + 6 * s + s, y - 2 * s); punto(x + 6 * s + 3 * s, y - 2 * s);
  if (o.lineas) { palabra(R, 'GOBEKLI', x, y, s, c, sombra, o); palabra(R, 'TEPE', x, y + 9 * s, s, c, sombra, o); return 16 * s; }
  return palabra(R, 'GOBEKLI TEPE', x, y, s, c, sombra, o);
}
