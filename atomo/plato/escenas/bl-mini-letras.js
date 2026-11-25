// BL-MINI-LETRAS · las letras gruesas de las miniaturas del 48 (prueba de miniaturas sin Atom, con texto en inglés,
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
  for (const [px, py] of celdas) R.rect(px, py, px + s - 1, py, hex('#ffffff'));               // brillo arriba
  return cx - x - s;
}
