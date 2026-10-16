// Forma de ejemplo (plantilla): una esfera de partículas que gira.
import { N, S1, S2, color, enEsfera, C } from './base.js';

export const camara = { pos: [0, 0.3, 7], mira: [0, 0.4, 0], balanceo: 0 };

export function forma(i, t, p, c, ts) {
  enEsfera(S1[i], S2[i], 1.0, p, 0, 0.4, 0);
  const g = t * 0.4;
  const x = p[0] * Math.cos(g) + p[2] * Math.sin(g);
  p[2] = -p[0] * Math.sin(g) + p[2] * Math.cos(g);
  p[0] = x;
  color(c, C.cian, 0.8);
  return 0.035;
}
