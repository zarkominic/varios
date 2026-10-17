// Formas en las que se transforma el átomo. Cada forma calcula, para la
// partícula i en el instante t, su posición (p), su color (c) y devuelve su tamaño.
// ts es el tiempo desde que empezó la escena de esa forma (para coreografías).
import { N, TAU, S1, S2, S3, S4, DIR, C, ARCOIRIS, poner, color, mezclar, enEsfera, enBola, enHaz, continente } from './formas/base.js';
import { NUEVAS, CAMARAS_NUEVAS, CONTINUAS } from './formas/indice.js';

export { N, DIR, CONTINUAS };

// Racimo de nucleones (protones y neutrones).
const NUCLEONES = (() => {
  const lista = [[0, 0, 0]];
  const n = 13;
  for (let k = 0; k < n; k++) {
    const y = 1 - (2 * (k + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = k * 2.39996;
    lista.push([0.2 * r * Math.cos(th), 0.2 * y, 0.2 * r * Math.sin(th)]);
  }
  return lista;
})();

// Direcciones de los rayos azules dispersados (evitando la del haz).
const RAYOS = (() => {
  const lista = [];
  const n = 30;
  for (let k = 0; k < n; k++) {
    const y = 1 - (2 * (k + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = k * 2.39996;
    const d = [r * Math.cos(th), y, r * Math.sin(th)];
    if (Math.abs(d[0]) < 0.9) lista.push(d);
  }
  return lista;
})();

// Órbita k: círculo inclinado 70° y girado k·60° en el plano de la pantalla.
function orbita(k, th, r, p) {
  const x0 = r * Math.cos(th);
  const z0 = r * Math.sin(th);
  const inc = 1.22;
  const y1 = -z0 * Math.sin(inc);
  const z1 = z0 * Math.cos(inc);
  const giro = (k * Math.PI) / 3 + 0.35;
  const cg = Math.cos(giro);
  const sg = Math.sin(giro);
  poner(p, x0 * cg - y1 * sg, x0 * sg + y1 * cg, z1);
}

// --- formas -------------------------------------------------------------
function atomo(i, t, p, c) {
  const f = i / N;
  let tam;
  if (f < 0.12) {
    const k = i % NUCLEONES.length;
    const n = NUCLEONES[k];
    const vib = 0.012 * Math.sin(t * 11 + k * 1.7);
    enBola(S1[i], S2[i], S3[i], 0.1, p, n[0] * 1.15 + vib, n[1] * 1.15, n[2] * 1.15 - vib);
    color(c, k % 2 ? C.proton : C.neutron, 1.0);
    tam = 0.05;
  } else if (f < 0.62) {
    orbita(i % 3, TAU * S1[i], 1.18 + (S2[i] - 0.5) * 0.02, p);
    color(c, C.cian, 0.5);
    tam = 0.026;
  } else {
    const k = i % 3;
    const cabeza = t * (1.5 + k * 0.17) + k * 2.1;
    const s = S1[i];
    if (s < 0.08) {
      orbita(k, cabeza, 1.18, p);
      p[0] += (S2[i] - 0.5) * 0.08;
      p[1] += (S3[i] - 0.5) * 0.08;
      p[2] += (S4[i] - 0.5) * 0.08;
      color(c, C.electron, 1.4);
      tam = 0.06;
    } else {
      const d = (s - 0.08) / 0.92;
      orbita(k, cabeza - d * 1.6, 1.18 + (S2[i] - 0.5) * 0.03 * d, p);
      color(c, C.electron, 1.1 * (1 - d) ** 1.6);
      tam = 0.05 * (1 - d * 0.7);
    }
  }
  // giro lento de todo el átomo
  const g = t * 0.3;
  const x = p[0] * Math.cos(g) + p[2] * Math.sin(g);
  p[2] = -p[0] * Math.sin(g) + p[2] * Math.cos(g);
  p[0] = x;
  return tam;
}

function prisma(i, t, p, c) {
  const f = i / N;
  const V = [[-0.55, -0.55], [0, 0.4], [0.55, -0.55]];
  if (f < 0.2) {
    const s = (S1[i] + t * 0.3) % 1;
    if (S3[i] < 0.82) enHaz(-1.35, 0.62, -0.2, 0.06, s, 0.06, i, p);
    else enHaz(-0.2, 0.06, 0.25, -0.06, s, 0.05, i, p);
    color(c, C.blanco, 1.15);
    return 0.042;
  }
  if (f < 0.42) {
    const s = S2[i];
    if (S1[i] < 0.75) {
      const e = Math.floor(S3[i] * 3);
      const a = V[e];
      const b = V[(e + 1) % 3];
      const z = S4[i] < 0.5 ? 0.3 : -0.3;
      poner(p, a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, z);
    } else {
      const v = V[Math.floor(S3[i] * 3)];
      poner(p, v[0], v[1], -0.3 + 0.6 * s);
    }
    color(c, [0.65, 0.85, 1.0], 0.55);
    return 0.03;
  }
  if (f < 0.5) {
    let a = S1[i];
    let b = S2[i];
    if (a + b > 1) {
      a = 1 - a;
      b = 1 - b;
    }
    poner(
      p,
      V[0][0] + (V[1][0] - V[0][0]) * a + (V[2][0] - V[0][0]) * b,
      V[0][1] + (V[1][1] - V[0][1]) * a + (V[2][1] - V[0][1]) * b,
      (S3[i] - 0.5) * 0.6,
    );
    color(c, [0.45, 0.65, 1.0], 0.14);
    return 0.06;
  }
  const k = Math.floor(S3[i] * 6);
  const s = (S1[i] + t * 0.3) % 1;
  enHaz(0.25, -0.06, 1.35, 0.5 - k * 0.22, s, 0.04 + 0.05 * s, i, p);
  color(c, ARCOIRIS[k], 1.05);
  return 0.042;
}

function ondas(i, t, p, c) {
  const azul = i / N < 0.5;
  const lam = azul ? 0.45 : 0.7;
  const yc = azul ? 0.62 : -0.42;
  const x = -1.3 + 2.6 * S1[i];
  const y = yc + 0.22 * Math.sin((TAU * (x - 0.3 * t)) / lam);
  const halo = S3[i] < 0.25;
  const g = halo ? 0.09 : 0.025;
  poner(p, x, y + (S2[i] - 0.5) * g, (S4[i] - 0.5) * g);
  color(c, azul ? C.azul : C.rojo, halo ? 0.25 : 1.05);
  return halo ? 0.06 : 0.036;
}

function rayleigh(i, t, p, c) {
  const f = i / N;
  if (f < 0.16) {
    const lado = S4[i] < 0.5 ? -1 : 1;
    const vib = 0.025 * Math.sin(t * 13);
    enBola(S1[i], S2[i], S3[i], 0.15, p, lado * (0.15 + vib), 0, 0);
    color(c, [0.8, 0.86, 1.0], 0.7);
    return 0.05;
  }
  if (f < 0.32) {
    enHaz(-1.4, 0, -0.32, 0, (S1[i] + t * 0.45) % 1, 0.08, i, p);
    color(c, C.blanco, 1.1);
    return 0.04;
  }
  if (f < 0.82) {
    const d = (S1[i] + t * 0.4) % 1;
    const dist = 0.3 + d * 1.2;
    const r = RAYOS[Math.floor(S3[i] * RAYOS.length)];
    const g = 0.035 * d;
    poner(p, r[0] * dist + (S2[i] - 0.5) * g, r[1] * dist + (S4[i] - 0.5) * g, r[2] * dist);
    const k = 1 - d;
    color(c, C.azul, 0.5 + 1.3 * k);
    return 0.028 + 0.02 * k;
  }
  enHaz(0.32, 0, 1.45, 0, (S1[i] + t * 0.45) % 1, 0.08, i, p);
  color(c, C.rojo, 1.0);
  return 0.04;
}

function tierra(i, t, p, c) {
  const f = i / N;
  const cy = -0.15;
  if (f < 0.55) {
    enEsfera(S1[i], S2[i], 0.78, p);
    const tierraFirme = continente(p[0] * 2.4, p[1] * 2.4, p[2] * 2.4) > 0.18;
    const polo = Math.abs(p[1]) > 0.66;
    if (polo) color(c, [0.9, 0.95, 1.0], 1.5);
    else if (tierraFirme) mezclar(c, C.tierra, C.arena, S3[i] * 0.6, 1.6);
    else color(c, C.oceano, 1.3);
    const g = t * 0.25;
    const x = p[0] * Math.cos(g) + p[2] * Math.sin(g);
    p[2] = -p[0] * Math.sin(g) + p[2] * Math.cos(g);
    p[0] = x;
    p[1] += cy;
    return 0.04;
  }
  if (f < 0.86) {
    const r = 0.8 + S3[i] ** 1.5 * 0.2;
    const th = TAU * S1[i];
    poner(p, r * Math.cos(th), cy + r * Math.sin(th), (S4[i] - 0.5) * 0.3);
    const k = 1 - (r - 0.8) / 0.2;
    color(c, [0.35, 0.68, 1.0], 0.15 + 1.1 * k * k);
    return 0.045;
  }
  if (f < 0.92) {
    enBola(S1[i], S2[i], S3[i], 0.2, p, -1.05, 1.45, -0.6);
    color(c, C.sol, 1.7);
    return 0.06;
  }
  const s = (S1[i] + t * 0.35) % 1;
  const ax = -1.05;
  const ay = 1.45;
  const objetivo = [-0.45 + S2[i] * 0.5, 0.75 - S3[i] * 0.5];
  poner(p, ax + (objetivo[0] - ax) * s, ay + (objetivo[1] - ay) * s, -0.6 + 0.9 * s);
  color(c, C.sol, 0.9 * (1 - s * 0.6));
  return 0.035;
}

function atardecer(i, t, p, c) {
  const f = i / N;
  const cx = 0;
  const cy = -2.3;
  const R = 1.75;
  const S = [-1.15, -0.3];
  const O = [0, cy + R];
  if (f < 0.3) {
    const th = Math.PI / 2 + (S1[i] - 0.5) * 1.9;
    const r = R * (1 - 0.35 * S3[i] ** 2);
    poner(p, cx + r * Math.cos(th), cy + r * Math.sin(th), (S4[i] - 0.5) * 0.4);
    const borde = 1 - (R - r) / (0.35 * R);
    color(c, [0.2, 0.35, 0.75], 0.5 + 1.4 * borde ** 3);
    return 0.036;
  }
  if (f < 0.56) {
    const r = R + 0.03 + S3[i] ** 1.4 * 0.36;
    const th = Math.PI / 2 + (S1[i] - 0.5) * 1.9;
    poner(p, cx + r * Math.cos(th), cy + r * Math.sin(th), (S4[i] - 0.5) * 0.4);
    const calido = Math.max(0, Math.min(1, (-p[0] + 0.1) / 1.2));
    const k = 1 - (r - R - 0.03) / 0.36;
    mezclar(c, [0.3, 0.55, 1.0], [1.0, 0.45, 0.18], calido, 0.15 + 0.9 * k * k);
    return 0.045;
  }
  if (f < 0.63) {
    enBola(S1[i], S2[i], S3[i], 0.18, p, S[0], S[1], 0);
    color(c, C.naranja, 1.8);
    return 0.06;
  }
  if (f < 0.66) {
    enBola(S1[i], S2[i], S3[i], 0.05, p, O[0], O[1] + 0.03, 0);
    color(c, C.blanco, 2.2);
    return 0.035;
  }
  if (f < 0.88) {
    const s = (S1[i] + t * 0.32) % 1;
    enHaz(S[0] + 0.15, S[1] - 0.02, O[0], O[1] + 0.03, s, 0.06, i, p);
    if (s < 0.5) mezclar(c, C.blanco, C.naranja, s * 2, 1.1);
    else mezclar(c, C.naranja, C.rojo, (s - 0.5) * 2, 1.1);
    return 0.04;
  }
  const s0 = S2[i] * 0.8;
  const bx = S[0] + 0.15 + (O[0] - S[0] - 0.15) * s0;
  const by = S[1] + (O[1] - S[1]) * s0;
  const d = (S1[i] + t * 0.5) % 1;
  const ang = Math.PI * (0.25 + 0.5 * S3[i]);
  poner(p, bx + Math.cos(ang) * d * 0.7, by + Math.sin(ang) * d * 0.7, (S4[i] - 0.5) * 0.3);
  color(c, C.azul, 1.6 * (1 - d));
  return 0.035;
}

export const FORMAS = { atomo, prisma, ondas, rayleigh, tierra, atardecer, ...NUEVAS };

// Encuadre de cámara para cada forma: [x, y, z] de la cámara y punto al que mira.
export const CAMARAS = {
  atomo: { pos: [0, -0.45, 7.4], mira: [0, -0.55, 0] },
  prisma: { pos: [0.25, 0.35, 7.9], mira: [0, 0.05, 0] },
  ondas: { pos: [-0.35, 0.25, 7.9], mira: [0, 0.1, 0] },
  rayleigh: { pos: [0.7, 0.5, 7.7], mira: [0, 0.0, 0] },
  tierra: { pos: [0.35, 0.35, 7.0], mira: [-0.1, 0.25, 0] },
  atardecer: { pos: [0, 0.15, 7.4], mira: [-0.2, -0.3, 0] },
  ...CAMARAS_NUEVAS,
};
