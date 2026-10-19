// Piezas comunes a todas las formas: semillas por partícula, paleta y utilidades.
import { rig } from '../estado.js';
export const N = 7000;
export const TAU = Math.PI * 2;

function aleatorio(semilla) {
  let a = semilla;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = aleatorio(11);
export const S1 = new Float32Array(N);
export const S2 = new Float32Array(N);
export const S3 = new Float32Array(N);
export const S4 = new Float32Array(N);
// Dirección aleatoria por partícula (para el remolino de las transformaciones).
export const DIR = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  S1[i] = rnd();
  S2[i] = rnd();
  S3[i] = rnd();
  S4[i] = rnd();
  const th = TAU * rnd();
  const ph = Math.acos(2 * rnd() - 1);
  DIR[i * 3] = Math.sin(ph) * Math.cos(th);
  DIR[i * 3 + 1] = Math.cos(ph);
  DIR[i * 3 + 2] = Math.sin(ph) * Math.sin(th);
}

// --- utilidades ---------------------------------------------------------
export const C = {
  blanco: [1.0, 0.95, 0.88],
  cian: [0.3, 0.72, 1.0],
  electron: [0.55, 0.9, 1.0],
  proton: [1.0, 0.42, 0.22],
  neutron: [0.42, 0.58, 1.0],
  azul: [0.25, 0.55, 1.0],
  rojo: [1.0, 0.25, 0.18],
  naranja: [1.0, 0.52, 0.14],
  sol: [1.0, 0.78, 0.32],
  oceano: [0.1, 0.32, 0.95],
  tierra: [0.25, 0.75, 0.38],
  arena: [0.75, 0.6, 0.35],
};
export const ARCOIRIS = [
  [1.0, 0.22, 0.18],
  [1.0, 0.52, 0.12],
  [1.0, 0.88, 0.22],
  [0.28, 0.95, 0.4],
  [0.22, 0.55, 1.0],
  [0.58, 0.32, 1.0],
];

export const poner = (v, x, y, z) => {
  v[0] = x;
  v[1] = y;
  v[2] = z;
};
export const color = (c, rgb, k = 1) => poner(c, rgb[0] * k, rgb[1] * k, rgb[2] * k);
export const mezclar = (c, a, b, k, f = 1) =>
  poner(c, (a[0] + (b[0] - a[0]) * k) * f, (a[1] + (b[1] - a[1]) * k) * f, (a[2] + (b[2] - a[2]) * k) * f);

export function enEsfera(u, v, r, p, cx = 0, cy = 0, cz = 0) {
  const th = TAU * u;
  const ph = Math.acos(2 * v - 1);
  poner(p, cx + r * Math.sin(ph) * Math.cos(th), cy + r * Math.cos(ph), cz + r * Math.sin(ph) * Math.sin(th));
}
export const enBola = (u, v, w, r, p, cx, cy, cz) => enEsfera(u, v, r * Math.cbrt(w), p, cx, cy, cz);

// Punto a lo largo de un segmento, con grosor alrededor.
export function enHaz(ax, ay, bx, by, s, grosor, i, p) {
  const dx = bx - ax;
  const dy = by - ay;
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L;
  const ny = dx / L;
  const g = (S2[i] - 0.5) * grosor;
  poner(p, ax + dx * s + nx * g, ay + dy * s + ny * g, (S4[i] - 0.5) * grosor);
}

// Continentes: suma de senos, barata y suficientemente orgánica.
export const continente = (x, y, z) =>
  Math.sin(2.1 * x + 1.3) * Math.sin(2.4 * y + 0.4) * Math.sin(1.9 * z + 2.1) +
  0.55 * Math.sin(4.3 * x + 2.2 * z) * Math.sin(3.7 * y + 1.1) +
  0.3 * Math.sin(7.1 * y + 5.3 * x);


// Instante (ts, segundos desde que empezó la escena) en que la voz dice la palabra
// asociada a `nombre` en el guion. Sin marcas (banco de pruebas) devuelve `porDefecto`.
export const marca = (nombre, porDefecto) => {
  const v = rig.marcas?.[nombre];
  return typeof v === 'number' ? v : porDefecto;
};
export const idioma = () => rig.idioma ?? 'es';

// Puntos que dibujan un texto o símbolo (✓, ✗, ?, D, O, C…), muestreados de forma
// determinista. Devuelve Float32Array [x0, y0, x1, y1, …] con el texto de 1 unidad
// de alto, centrado en el origen. En Node (sin canvas) devuelve ceros.
const _glifos = new Map();
export function glifo(texto, n, { fuente = 'bold 200px "DejaVu Sans", sans-serif', semilla = 3 } = {}) {
  const clave = `${texto}|${n}|${fuente}|${semilla}`;
  if (_glifos.has(clave)) return _glifos.get(clave);
  const res = new Float32Array(n * 2);
  if (typeof document === 'undefined') {
    _glifos.set(clave, res);
    return res;
  }
  const lienzo = document.createElement('canvas');
  const ctx = lienzo.getContext('2d', { willReadFrequently: true });
  ctx.font = fuente;
  const ancho = Math.ceil(ctx.measureText(texto).width) + 40;
  const alto = 280;
  lienzo.width = ancho;
  lienzo.height = alto;
  ctx.font = fuente;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(texto, ancho / 2, alto / 2);
  const datos = ctx.getImageData(0, 0, ancho, alto).data;
  const llenos = [];
  let y0 = alto, y1 = 0;
  for (let y = 0; y < alto; y++)
    for (let x = 0; x < ancho; x++)
      if (datos[(y * ancho + x) * 4 + 3] > 128) {
        llenos.push(x, y);
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  const m = llenos.length / 2;
  if (m === 0) {
    _glifos.set(clave, res);
    return res;
  }
  const escala = 1 / Math.max(1, y1 - y0);
  let a = semilla;
  const azar = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let k = 0; k < n; k++) {
    const j = Math.floor(azar() * m);
    res[k * 2] = (llenos[j * 2] + azar() - ancho / 2) * escala;
    res[k * 2 + 1] = -((llenos[j * 2 + 1] + azar() - (y0 + y1) / 2) * escala);
  }
  _glifos.set(clave, res);
  return res;
}
