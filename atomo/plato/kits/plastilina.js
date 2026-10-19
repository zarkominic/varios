// Kit de plastilina (stop-motion) para las escenas del vídeo largo.
//
//   import { crearPlato, PIEZA, ... } from '/atomo/plato/kits/plastilina.js';
//   const P = await crearPlato({
//     camara: { pos, mira, fov }, globo: true, tablero: true, polvo: 8,
//     piezas: ['luna', 'ficha', 'glifo:3', ...],          // tipo fijo de cada pieza suelta
//     sombras: { tablero: ['p0', 'polvo'] },             // quién proyecta sombra sobre quién (además de sí misma)
//   });
//   function dibujar(t) {
//     const n = P.fotograma(t), ts = n / 12;               // fotograma a 12 fps
//     P.limpiar();
//     P.atomo({ pos, escala, energia: E.energia(ts), ts });
//     P.tablero({ ... }); P.pieza(0, { pos, escala, rot }); ...
//     P.render(n);
//   }
//
// El plató es el del demo aprobado (estilos/10-arcilla-3d.html): ciclorama azul pizarra con
// estrellitas de arcilla, luz cálida de estudio, relleno frío y contraluz. Todo se modela con
// distancias con signo (uniones suaves = arcilla que se funde) y se ilumina con sombras suaves,
// oclusión, dispersión bajo la superficie, huellas dactilares y el «hervor» de cada fotograma.
//
// Coste. En este servidor (SwiftShader, sin GPU) un sombreador ejecuta todo su código en cada
// píxel, aunque esté dentro de un «if» que no se cumple. Por eso el kit no usa un sombreador único:
//   · el ciclorama (ruido, estrellitas, luz) se hornea una sola vez en dos texturas (luz directa y
//     luz ambiente); cada fotograma solo le añade la sombra y la oclusión de la arcilla, calculadas a
//     un tercio de resolución (son suaves) con versiones simplificadas de las piezas;
//   · cada pieza se dibuja con su propio programa (solo su forma y su material) y solo en el
//     rectángulo de pantalla que ocupa; las piezas se componen con profundidad y bordes suavizados;
//   · las sombras sobre una pieza usan su forma simplificada y las de las piezas que se indiquen.

import * as THREE from 'three';

export const W = 1920, H = 1080, FPS = 12;

// ---------- utilidades de animación ----------
export const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const mix = (a, b, x) => a + (b - a) * x;
export const prog = (x, a, b) => cl((x - a) / (b - a));
export const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };
export const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eoc = (x) => 1 - Math.pow(1 - x, 3);
export const eic = (x) => x * x * x;
export const eob = (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// número fijo para cada fotograma y canal (el «hervor» del stop-motion)
export const azar = (n, k) => { const r = mulberry32((n + 1) * 7919 + k * 104729); r(); return r(); };
// oscilación amortiguada desde u = 0 (para asentarse tras un golpe): 0 antes, 1 en u = 0
export const muelle = (u, f = 3.2, k = 6) => (u < 0 ? 0 : Math.exp(-u * k) * Math.cos(u * f * 2 * Math.PI));
// brote: escala 0 → 1 que se completa en tFin (empieza `antes` segundos antes) y rebota un poco
export function brote(ts, tFin, antes = 0.25, sobre = 0.14) {
  if (ts < tFin - antes) return 0;
  const u = prog(ts, tFin - antes, tFin);
  if (ts < tFin) return eob(u, 2.2) * (1 + sobre * ss(0.5, 1, u));
  return 1 + sobre * muelle(ts - tFin, 2.6, 7);
}
// reloj de los movimientos de reposo (balanceos, giros, electrones) que frena hasta pararse
// en los últimos `t` segundos: la escena «se asienta y queda quieta» al final
export function calma(ts, fin, t = 0.8) {
  const a = fin - t;
  if (ts <= a) return ts;
  const u = Math.min(ts - a, t);
  return a + u - (u * u) / (2 * t);
}
export const veredictoATipo = (v) => (v === '✓' ? 1 : v === '✗' ? 2 : 0);
export const COLOR = { TINTA: 0, MANTEQUILLA: 1, MOSTAZA: 2, CREMA: 3, TERRACOTA: 4, VERDE: 5 };

// tablero (unidades locales): paso entre casillas, semiancho, semialto, semigrosor, fila de números, fila de huecos
export const TAB = { PASO: 1.0, HW: 3.3, HH: 1.1, GR: 0.3, YD: 0.57, YW: -0.29 };

const fl = (v) => { const s = Number(v).toFixed(5); return s; };
const rad = (g) => (g * Math.PI) / 180;

// ---------- glifos: trazos de churro (alto 1, centrados) ----------
// ['s', ax, ay, bx, by] segmento · ['a', cx, cy, r, centro°, semiapertura°] arco · ['c', cx, cy, r] círculo · ['p', x, y] bolita
const GLIFOS = {
  '1': [['s', 0.06, -0.5, 0.06, 0.5], ['s', 0.06, 0.5, -0.2, 0.27], ['s', -0.17, -0.5, 0.29, -0.5]],
  '2': [['a', 0, 0.21, 0.27, 60, 100], ['s', 0.207, 0.036, -0.27, -0.5], ['s', -0.27, -0.5, 0.3, -0.5]],
  '3': [['a', 0, 0.235, 0.235, 30, 120], ['a', 0, -0.245, 0.255, -30, 120]],
  '4': [['s', 0.14, -0.5, 0.14, 0.5], ['s', 0.14, 0.5, -0.3, -0.14], ['s', -0.3, -0.14, 0.31, -0.14]],
  '5': [['s', 0.27, 0.5, -0.18, 0.5], ['s', -0.18, 0.5, -0.185, 0.045], ['a', 0, -0.19, 0.29, -6, 134]],
  '6': [['c', 0, -0.21, 0.27], ['a', 0.45, -0.21, 0.72, 145, 35]],
  '?': [['a', 0, 0.24, 0.25, 50, 110], ['s', 0.125, 0.0235, 0, -0.09], ['s', 0, -0.09, 0, -0.17], ['p', 0, -0.43]],
  '✓': [['s', -0.33, 0.03, -0.1, -0.23], ['s', -0.1, -0.23, 0.35, 0.31]],
  '✗': [['s', -0.27, -0.27, 0.27, 0.27], ['s', -0.27, 0.27, 0.27, -0.27]],
  '·': [['p', 0, 0]],
};
const NOMBRE_GLIFO = { '1': 'g1', '2': 'g2', '3': 'g3', '4': 'g4', '5': 'g5', '6': 'g6', '?': 'gq', '✓': 'gsi', '✗': 'gno', '·': 'gpt' };
function glslGlifo(c) {
  let s = `float ${NOMBRE_GLIFO[c]}(vec2 p, out float dp) {\n  dp = 1e5; float d = 1e5;\n`;
  for (const t of GLIFOS[c]) {
    if (t[0] === 's') s += `  d = min(d, sdSeg(p, vec2(${fl(t[1])}, ${fl(t[2])}), vec2(${fl(t[3])}, ${fl(t[4])})));\n`;
    if (t[0] === 'a') s += `  d = min(d, sdArco(p, vec2(${fl(t[1])}, ${fl(t[2])}), ${fl(t[3])}, vec2(${fl(Math.cos(rad(t[4])))}, ${fl(Math.sin(rad(t[4])))}), vec2(${fl(Math.cos(rad(t[5])))}, ${fl(Math.sin(rad(t[5])))})));\n`;
    if (t[0] === 'c') s += `  d = min(d, abs(length(p - vec2(${fl(t[1])}, ${fl(t[2])})) - ${fl(t[3])}));\n`;
    if (t[0] === 'p') s += `  dp = min(dp, length(p - vec2(${fl(t[1])}, ${fl(t[2])})));\n`;
  }
  return s + '  return d;\n}\n';
}

// ---------- tipos de pieza suelta ----------
// cada tipo: radio envolvente (unidades locales), forma con detalle pz_<t>(q, T, m),
// forma simplificada (siempre dentro de la detallada) pzc_<t>(q, T) y color pzcol_<t>(q, T, m).
// T = (tipo, variante, color o puntos, —)
const RADIO_TIPO = { luna: 0.62, remolino: 0.48, estrella: 0.62, pesa: 0.66, ficha: 0.56, bocadillo: 1.32, glifo: 0.66 };
const GLSL_TIPOS = {
  luna: /* glsl */`
float pz_luna(vec3 q, vec4 T, out float m) {
  m = 0.0;
  vec3 k = q; k.x += 0.15; k.z /= 0.6;
  float d = length(k) - 0.5;
  d = smax(d, -(length(k.xy - vec2(-0.21, 0.0)) - 0.46), 0.1);
  d = smax(d, -(length(k - vec3(0.36, 0.06, 0.38)) - 0.06), 0.025);
  d = smax(d, -(length(k - vec3(0.22, -0.3, 0.36)) - 0.045), 0.02);
  return d * 0.6;
}
float pzc_luna(vec3 q, vec4 T) {
  vec3 k = q; k.x += 0.15; k.z /= 0.6;
  return max(length(k) - 0.48, -(length(k.xy - vec2(-0.21, 0.0)) - 0.48)) * 0.6;
}
vec3 pzcol_luna(vec3 q, vec4 T, float m) { return C_BUTTER * (0.95 + 0.1 * vnoise(q * 5.0)) + vec3(0.03, 0.01, -0.01) * vnoise(q * 18.0); }
`,
  remolino: /* glsl */`
float espiral(vec2 p) {
  float d = sdArco(p, vec2(0.0), 0.08, vec2(0.0, 1.0), vec2(0.0, 1.0));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.125, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.17, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.215, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.26, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  return min(d, sdArco(p, vec2(0.045, 0.0), 0.305, vec2(0.0, -1.0), vec2(0.62161, 0.78333)));
}
float pz_remolino(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float r = 0.042 + 0.03 * clamp(length(q.xy) / 0.32, 0.0, 1.0);
  return churro(espiral(q.xy), q.z, r);
}
float pzc_remolino(vec3 q, vec4 T) { return churro(espiral(q.xy), q.z, 0.035); }
vec3 pzcol_remolino(vec3 q, vec4 T, float m) { return C_WATER * (0.9 + 0.2 * vnoise(q * 6.0)); }
`,
  estrella: /* glsl */`
float pz_estrella(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.1;
  vec2 w = vec2(d2, abs(q.z) - 0.04);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.1;
}
float pzc_estrella(vec3 q, vec4 T) {
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.11;
  return max(d2, abs(q.z) - 0.12);
}
vec3 pzcol_estrella(vec3 q, vec4 T, float m) { return vec3(0.33, 0.2, 0.038) * (0.94 + 0.12 * vnoise(q * 5.0)); }
`,
  pesa: /* glsl */`
float pz_pesa(vec3 q, vec4 T, out float m) {
  float body = length((q - vec3(0.0, -0.13, 0.0)) * vec3(1.0, 1.08, 1.0)) - 0.37;
  body = smax(body, -(q.y + 0.43), 0.06);
  vec3 h = q - vec3(0.0, 0.2, 0.0);
  float ha = length(vec2(length(h.xy) - 0.21, h.z)) - 0.065;
  ha = max(ha, -(h.y + 0.02));
  m = ha < body ? 1.0 : 0.0;
  return smin(body * 0.95, ha, 0.07);
}
float pzc_pesa(vec3 q, vec4 T) {
  float body = max(length(q - vec3(0.0, -0.13, 0.0)) - 0.33, -(q.y + 0.4));
  vec3 h = q - vec3(0.0, 0.2, 0.0);
  return min(body, max(length(vec2(length(h.xy) - 0.21, h.z)) - 0.055, -(h.y + 0.02)));
}
vec3 pzcol_pesa(vec3 q, vec4 T, float m) { return m > 0.5 ? C_STEEL * 1.3 : C_STEEL; }
`,
  ficha: /* glsl */`
float pz_ficha(vec3 q, vec4 T, out float m) { return fichaD(q, T.y, m); }
float pzc_ficha(vec3 q, vec4 T) { return fichaC(q); }
vec3 pzcol_ficha(vec3 q, vec4 T, float m) { return m > 0.5 ? C_LIGHT : (T.y < 1.5 ? C_GREEN : C_RED) * (0.92 + 0.16 * vnoise(q * 3.0)); }
`,
  bocadillo: /* glsl */`
float pz_bocadillo(vec3 q, vec4 T, out float m) {
  vec3 k = vec3(0.95, 0.66, 0.3);
  float k0 = length(q / k), k1 = length(q / (k * k));
  float d = k0 * (k0 - 1.0) / k1;
  d = smin(d, sdCapsule(q, vec3(-0.42, -0.38, 0.0), vec3(-0.86, -0.8, 0.0), 0.09), 0.22);
  float dd = 1e5;
  for (int i = 0; i < 3; i++) {
    float s = clamp(T.z - float(i), 0.0, 1.0);
    float x = (float(i) - 1.0) * 0.32;
    dd = min(dd, length(q - vec3(x, 0.0, 0.27 - 0.03 * abs(float(i) - 1.0))) - 0.085 * s + (s < 0.01 ? 1.0 : 0.0));
  }
  m = dd < d ? 1.0 : 0.0;
  return smin(d, dd, 0.02);
}
float pzc_bocadillo(vec3 q, vec4 T) {
  vec3 k = vec3(0.92, 0.63, 0.27);
  float k0 = length(q / k), k1 = length(q / (k * k));
  return min(k0 * (k0 - 1.0) / k1, sdCapsule(q, vec3(-0.42, -0.38, 0.0), vec3(-0.86, -0.8, 0.0), 0.07));
}
vec3 pzcol_bocadillo(vec3 q, vec4 T, float m) { return m > 0.5 ? C_INK : C_LIGHT * (0.95 + 0.08 * vnoise(q * 3.0)); }
`,
};
function glslTipoGlifo(c) {
  const g = NOMBRE_GLIFO[c], t = `glifo_${g}`;
  return `
float pz_${t}(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float dp;
  float d2 = ${g}(q.xy, dp);
  return min(churro(d2, q.z, 0.085), (length(vec2(dp, q.z * 1.1)) - 0.11) * 0.9);
}
float pzc_${t}(vec3 q, vec4 T) {
  float dp;
  float d2 = ${g}(q.xy, dp);
  return min(churro(d2, q.z, 0.075), (length(vec2(dp, q.z * 1.1)) - 0.1) * 0.9);
}
vec3 pzcol_${t}(vec3 q, vec4 T, float m) { return colorGlifo(T.z); }
`;
}
const nombreTipo = (tipo) => (tipo.startsWith('glifo:') ? `glifo_${NOMBRE_GLIFO[tipo.slice(6)]}` : tipo);

// ---------- estrellitas del ciclorama y continentes del globo ----------
function estrellas(semilla, cuantas) {
  const r = mulberry32(semilla), out = [];
  let guard = 0;
  while (out.length < cuantas && guard++ < 4000) {
    const x = mix(-13, 13, r()), a = mix(-5.2, 2.1, r());
    if (out.some((s) => Math.hypot(s[0] - x, s[1] - a) < 1.3)) continue;
    const big = r();
    out.push([x, a, big > 0.85 ? mix(0.085, 0.11, r()) : mix(0.035, 0.065, r()), mix(0.55, 1, r())]);
  }
  while (out.length < cuantas) out.push([0, 99, 0.001, 0]);
  return out;
}
// manchas de tierra: [latitud, longitud, radio angular] en grados
const TIERRA = [
  [50, -102, 20], [62, -120, 12], [33, -95, 11], [18, -98, 6], [9, -82, 3.5], [72, -42, 9],
  [-4, -62, 15], [-20, -58, 12], [-36, -66, 8], [-48, -70, 4.5],
  [50, 14, 11], [62, 22, 8], [10, 18, 17], [-6, 26, 14], [-24, 26, 9], [-32, 22, 5], [19, 43, 7],
  [55, 80, 22], [60, 120, 16], [38, 100, 16], [23, 79, 9], [14, 103, 7], [36, 138, 4],
  [-25, 134, 12], [-90, 0, 17],
];

// ---------- GLSL común ----------
const GLSL_COMUN = /* glsl */`
precision highp float;
precision highp int;
const vec3 C_TERRA  = vec3(0.722, 0.165, 0.082);
const vec3 C_CREAM  = vec3(0.640, 0.560, 0.420);
const vec3 C_SAGE   = vec3(0.090, 0.270, 0.230);
const vec3 C_MUST   = vec3(0.860, 0.450, 0.055);
const vec3 C_BUTTER = vec3(0.440, 0.340, 0.190);
const vec3 C_SLATE  = vec3(0.030, 0.042, 0.090);
const vec3 C_STAR   = vec3(0.780, 0.700, 0.520);
const vec3 C_INK    = vec3(0.012, 0.016, 0.050);
const vec3 C_GREEN  = vec3(0.035, 0.150, 0.048);
const vec3 C_RED    = vec3(0.360, 0.038, 0.020);
const vec3 C_LIGHT  = vec3(0.520, 0.460, 0.350);
const vec3 C_SAND   = vec3(0.265, 0.212, 0.150);
const vec3 C_OCHRE  = vec3(0.210, 0.082, 0.009);
const vec3 C_OCEAN  = vec3(0.020, 0.058, 0.098);
const vec3 C_LAND   = vec3(0.062, 0.090, 0.028);
const vec3 C_GOLD   = vec3(0.270, 0.118, 0.010);
const vec3 C_WATER  = vec3(0.042, 0.120, 0.230);
const vec3 C_STEEL  = vec3(0.038, 0.041, 0.055);
const vec3 C_DUST   = vec3(0.380, 0.320, 0.240);

const float ZW = 4.2;   // pared del fondo en z = -ZW
const float RF = 2.6;   // radio de la curva del ciclorama

const vec3 LPOS = vec3(-7.0, 9.5, 10.5);
const vec3 LCOL = vec3(1.0, 0.78, 0.56);
const vec3 SPOT_AT = vec3(0.6, 1.4, -2.6);
const vec3 FILL_DIR = vec3(0.78, 0.22, 0.58);
const vec3 FILL_COL = vec3(0.30, 0.42, 0.78);
const vec3 RIM_DIR = vec3(0.45, 0.55, -0.70);
const vec3 RIM_COL = vec3(1.0, 0.72, 0.50);

uniform vec2 uRes;
uniform vec3 uCamPos;
uniform mat3 uCamRot;
uniform float uTanY, uAsp, uPix;

float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
vec4 vnoised(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  vec3 u = f * f * (3.0 - 2.0 * f), du = 6.0 * f * (1.0 - f);
  float a = hash13(i), b = hash13(i + vec3(1,0,0)), c = hash13(i + vec3(0,1,0)), d = hash13(i + vec3(1,1,0));
  float e = hash13(i + vec3(0,0,1)), f1 = hash13(i + vec3(1,0,1)), g = hash13(i + vec3(0,1,1)), h = hash13(i + vec3(1,1,1));
  float k0 = a, k1 = b - a, k2 = c - a, k3 = e - a, k4 = a - b - c + d, k5 = a - c - e + g, k6 = a - b - e + f1, k7 = -a + b + c - d + e - f1 - g + h;
  float v = k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z;
  vec3 dv = du * vec3(k1 + k4*u.y + k6*u.z + k7*u.y*u.z, k2 + k5*u.z + k4*u.x + k7*u.z*u.x, k3 + k6*u.x + k5*u.y + k7*u.x*u.y);
  return vec4(v, dv);
}

vec3 rayoEn(vec2 fc) {
  vec2 uv = fc / uRes * 2.0 - 1.0;
  return normalize(uCamRot * vec3(uv.x * uTanY * uAsp, uv.y * uTanY, -1.0));
}

// ---------- ciclorama ----------
float bgSDF(vec3 p) {
  float u = p.z + ZW, v = p.y;
  if (u < RF && v < RF) return RF - length(vec2(RF - u, RF - v));
  return min(u, v);
}
float bgHit(vec3 ro, vec3 rd, out vec3 n, out float arc) {
  float zc = -ZW + RF;
  if (rd.y < 0.0) {
    float t = -ro.y / rd.y; vec3 p = ro + rd * t;
    if (p.z >= zc) { n = vec3(0, 1, 0); arc = RF * 1.5707963 + (p.z - zc); return t; }
  }
  if (rd.z < 0.0) {
    float t = (-ZW - ro.z) / rd.z; vec3 p = ro + rd * t;
    if (p.y >= RF) { n = vec3(0, 0, 1); arc = -(p.y - RF); return t; }
  }
  vec2 o = vec2(ro.y - RF, ro.z - zc), d = vec2(rd.y, rd.z);
  float a = dot(d, d), b = dot(o, d), c = dot(o, o) - RF * RF;
  float h = max(b * b - a * c, 0.0);
  float t = (-b + sqrt(h)) / a;
  vec3 p = ro + rd * t;
  n = normalize(vec3(0.0, RF - p.y, zc - p.z));
  float ang = atan(zc - p.z, RF - p.y);
  arc = RF * (1.5707963 - ang);
  return t;
}
float spotCone(vec3 p) {
  vec3 sd = normalize(SPOT_AT - LPOS);
  float c = dot(normalize(p - LPOS), sd);
  return mix(0.12, 1.0, smoothstep(0.86, 0.985, c));
}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
`;

// ---------- horneado del ciclorama (una vez por cámara y tamaño) ----------
const GLSL_HORNO = /* glsl */`
out vec4 fragColor;
uniform vec4 uStars[NSTARS];
uniform int uSalida;   // 0: luz directa · 1: luz ambiente
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy);
  vec3 n; float arc;
  float tb = bgHit(ro, rd, n, arc);
  vec3 p = ro + rd * tb;
  vec3 alb = C_SLATE * (0.88 + 0.24 * vnoise(p * 0.55)) * (0.94 + 0.12 * vnoise(p * 3.1));
  vec4 nd = vnoised(p * 1.4);
  vec3 g = nd.yzw * 0.06;
  vec4 gr = vnoised(p * 22.0);
  g += gr.yzw * 0.010;
  vec2 st = vec2(p.x, arc);
  float starMask = 0.0; vec3 starN = n; float starShadow = 0.0;
  if (arc < 2.6) {
    vec2 shOff = vec2(0.035, 0.045);
    for (int i = 0; i < NSTARS; i++) {
      vec4 s = uStars[i];
      vec2 d = st - s.xy;
      float r = s.z;
      float dd = length(d);
      if (dd < r * 1.6) {
        float in1 = 1.0 - smoothstep(r - 0.008, r + 0.004, dd);
        if (in1 > starMask) {
          starMask = in1;
          float hz = sqrt(max(1.0 - dd * dd / (r * r), 0.0));
          vec3 tx = vec3(1, 0, 0), ty = normalize(cross(n, tx)) * -1.0;
          starN = normalize(n * (hz + 0.35) + tx * (d.x / r) * 0.9 + ty * (d.y / r) * 0.9);
          alb = mix(alb, C_STAR * s.w, in1);
        }
      }
      float ds = length(d - shOff * r / 0.06);
      starShadow = max(starShadow, (1.0 - smoothstep(r * 0.7, r * 1.25, ds)) * (1.0 - starMask));
    }
  }
  n = normalize(n - (g - n * dot(g, n)) * (1.0 - starMask));
  n = normalize(mix(n, starN, starMask));
  vec3 L = normalize(LPOS - p);
  float dist = length(LPOS - p);
  float fall = pow(16.0 / dist, 2.0);
  float ndl = max(dot(n, L), 0.0);
  float spot = spotCone(p);
  float sOsc = 1.0 - 0.45 * starShadow;
  vec3 D = alb * LCOL * 1.35 * ndl * spot * fall * sOsc;
  vec3 A = (alb * FILL_COL * 0.42 + alb * vec3(0.16, 0.20, 0.32) * 0.55) * sOsc;
  fragColor = vec4(uSalida == 0 ? sqrt(clamp(D / 4.0, 0.0, 1.0)) : sqrt(clamp(A / 0.5, 0.0, 1.0)), 1.0);
}
`;

// ---------- desenfoque del ciclorama horneado (profundidad de campo; una vez) ----------
const GLSL_DESENFOQUE = /* glsl */`
out vec4 fragColor;
uniform sampler2D uTex;
uniform vec2 uDir;
uniform float uFoco, uK;
void main() {
  vec2 fc = gl_FragCoord.xy;
  vec3 n; float arc;
  float t = bgHit(uCamPos, rayoEn(fc), n, arc);
  float r = uK * abs(1.0 - uFoco / t) * uRes.y / 1080.0;
  vec3 acc = vec3(0.0); float ws = 0.0;
  for (int i = -10; i <= 10; i++) {
    float x = float(i) / 10.0;
    float w = exp(-x * x * 2.5);
    acc += texture(uTex, (fc + uDir * x * r) / uRes).rgb * w; ws += w;
  }
  fragColor = vec4(acc / ws, 1.0);
}
`;

// ---------- números del tablero horneados (distancia 2D al trazo; una vez) ----------
const GLSL_HORNO_DIGITOS = (glifos) => /* glsl */`
precision highp float;
out vec4 fragColor;
uniform vec2 uTam;
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float sdArco(vec2 p, vec2 c, float r, vec2 cs, vec2 e) {
  p -= c;
  p = vec2(dot(p, cs), cs.x * p.y - cs.y * p.x);
  p.y = abs(p.y);
  return (p.y * e.x > p.x * e.y) ? length(p - e * r) : abs(length(p) - r);
}
${glifos}
void main() {
  vec2 uv = gl_FragCoord.xy / uTam;
  vec2 p = mix(vec2(-3.0, ${f4(TAB.YD - 0.32)}), vec2(3.0, ${f4(TAB.YD + 0.32)}), uv);
  float fi = clamp(floor(p.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  int i = int(fi);
  vec2 c = (vec2(p.x - (fi - 2.5) * ${f4(TAB.PASO)}, p.y - ${f4(TAB.YD)})) / 0.4;
  float dp, d = 1e5;
  if (i == 0) d = g1(c, dp);
  else if (i == 1) d = g2(c, dp);
  else if (i == 2) d = g3(c, dp);
  else if (i == 3) d = g4(c, dp);
  else if (i == 4) d = g5(c, dp);
  else d = g6(c, dp);
  fragColor = vec4(clamp(d * 0.4 / 0.5, 0.0, 1.0), 0.0, 0.0, 1.0);
}
`;

// ---------- biblioteca de formas ----------
const GLSL_FORMAS = /* glsl */`
out vec4 fragColor;
uniform float uFrame, uFlicker, uLump;
uniform vec3 uBoil;
uniform vec4 uB[NB];            // esferas envolventes: 0 átomo · 1 globo · 2 tablero · 3 polvo · 4.. piezas (radio 0 = no está)

float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdTorus(vec3 p, vec2 t) { vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdCapsule(vec3 p, vec3 a, vec3 b, float r) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float sdRoundBox(vec3 p, vec3 b, float r) { vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdRoundRect(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
// arco de centro c y radio r (cs = cos/sin del ángulo central, e = cos/sin de la semiapertura)
float sdArco(vec2 p, vec2 c, float r, vec2 cs, vec2 e) {
  p -= c;
  p = vec2(dot(p, cs), cs.x * p.y - cs.y * p.x);
  p.y = abs(p.y);
  return (p.y * e.x > p.x * e.y) ? length(p - e * r) : abs(length(p) - r);
}
float sdStar5(vec2 p, float r, float rf) {
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-0.809016994375, -0.587785252292);
  p.x = abs(p.x);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1;
  p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x);
  p.y -= r;
  vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
  float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}
// hervor barato: bultitos que cambian en cada fotograma (silueta del átomo y del globo)
float bultos(vec3 q) { return sin(q.x * 3.3 + uBoil.x) * sin(q.y * 2.9 + uBoil.y) * sin(q.z * 3.1 + uBoil.z); }
float lumps(vec3 q) {
  return sin(q.x * 3.3 + uBoil.x) * sin(q.y * 2.9 + uBoil.y) * sin(q.z * 3.1 + uBoil.z)
       + 0.5 * sin(q.x * 6.1 - uBoil.y) * sin(q.y * 5.7 + uBoil.z) * sin(q.z * 6.3 + uBoil.x);
}
// churro de arcilla tumbado en el plano z = 0 (algo aplastado)
float churro(float d2, float z, float r) { return (length(vec2(d2, z * 1.25)) - r * 1.25) * 0.8; }
// pieza ausente: muy lejos (selección, para que un NaN de sus uniformes no se propague)
float fuera(int i, float d) { return uB[i].w > 0.0 ? d : 1e5; }

vec3 colorGlifo(float c) {
  if (c < 0.5) return C_INK;
  if (c < 1.5) return C_BUTTER;
  if (c < 2.5) return vec3(0.60, 0.33, 0.035);
  if (c < 3.5) return C_LIGHT;
  if (c < 4.5) return C_TERRA;
  return C_GREEN;
}

struct Mat { vec3 alb; vec3 lp; float bs; float det; float esc; vec3 g; };
`;
// (aquí van los glifos que use el plató: ✓ y ✗ siempre)
const GLSL_FICHA = /* glsl */`
// ficha de veredicto: losa de arcilla con el símbolo en churro claro encima (tipo 1 ✓ · 2 ✗)
float fichaD(vec3 q, float tipo, out float m) {
  float d = sdRoundBox(q, vec3(0.32, 0.32, 0.085), 0.075);
  float dp;
  vec2 g = q.xy / 0.6;
  float g2 = (tipo < 1.5 ? gsi(g, dp) : gno(g, dp)) * 0.6;
  float ds = churro(g2, q.z - 0.085, 0.058);
  m = ds < d ? 1.0 : 0.0;
  return smin(d, ds, 0.03);
}
float fichaC(vec3 q) { return sdRoundBox(q, vec3(0.3, 0.3, 0.075), 0.07); }
`;

// ---------- piezas fijas ----------
const GLSL_ATOMO = /* glsl */`
uniform vec3 uCen, uSq;
uniform float uAEsc;
uniform mat3 uYaw;
uniform vec4 uNuc[8];
uniform mat3 uRingM[3];
uniform vec2 uRing;
uniform vec4 uElec[3];
uniform vec3 uBrazo;      // grosor del brazo de churro que une cada electrón con el núcleo (0: sin brazo)
uniform vec3 uAPrint;
float brazo(vec3 q, int i, float k) {
  float r = uBrazo[i] * k;
  return sdCapsule(q, uElec[i].xyz * 0.25, uElec[i].xyz, r) + (r > 0.001 ? 0.0 : 1e5);
}
vec3 atomLocal(vec3 p) { return uYaw * ((p - uCen) / (uSq * uAEsc)); }
float atomEsc() { return min(uSq.x, uSq.y) * uAEsc * 0.9; }
float sdf_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = 1e5;
  for (int i = 0; i < 8; i++) d = smin(d, length(q - uNuc[i].xyz) - uNuc[i].w, 0.05);
  for (int i = 0; i < 3; i++) {
    vec3 r = uRingM[i] * q;
    float dt = sdTorus(r, uRing * vec2(1.0, 1.0 + 0.1 * sin(dot(r, vec3(4.1, 2.3, 3.7)) + float(i) * 2.1 + uBoil.x)));
    float de = length(q - uElec[i].xyz) - uElec[i].w;
    d = smin(d, smin(dt, de, 0.05), 0.02);
    d = smin(d, brazo(q, i, 1.0), 0.09);
  }
  return (d - 0.009 * bultos(q * 1.6)) * atomEsc();
}
float sdfc_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = length(q) - 0.42;
  for (int i = 0; i < 3; i++) {
    d = min(d, sdTorus(uRingM[i] * q, uRing - vec2(0.0, 0.012)));
    d = min(d, length(q - uElec[i].xyz) - uElec[i].w + 0.012);
    d = min(d, brazo(q, i, 0.8));
  }
  return fuera(0, d * atomEsc());
}
// envolvente barata y conservadora (nunca más lejos que la forma real): primera fase del rayo
float sdfa_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = length(q) - 0.72;
  for (int i = 0; i < 3; i++) {
    d = min(d, sdTorus(uRingM[i] * q, uRing * vec2(1.0, 1.12)));
    d = min(d, length(q - uElec[i].xyz) - uElec[i].w);
    d = min(d, brazo(q, i, 1.1));
  }
  return d * atomEsc();
}
void mat_atomo(vec3 p, out Mat M) {
  vec3 q = atomLocal(p);
  vec3 col = vec3(0.0); float ws = 0.0;
  for (int i = 0; i < 8; i++) {
    float di = length(q - uNuc[i].xyz) - uNuc[i].w;
    float w = exp(-max(di, 0.0) * 55.0);
    col += w * ((i - (i / 2) * 2) == 0 ? C_TERRA : C_CREAM); ws += w;
  }
  for (int i = 0; i < 3; i++) {
    float dt = sdTorus(uRingM[i] * q, uRing);
    float w = exp(-max(dt, 0.0) * 55.0);
    col += w * C_SAGE; ws += w;
    float de = length(q - uElec[i].xyz) - uElec[i].w;
    w = exp(-max(de, 0.0) * 55.0);
    col += w * C_MUST * 1.4; ws += w * 1.4;
    w = exp(-max(brazo(q, i, 1.0), 0.0) * 55.0);
    col += w * C_SAGE; ws += w;
  }
  M.alb = col / max(ws, 1e-4);
  M.lp = q + uAPrint; M.bs = 1.0; M.det = 1.0; M.esc = uAEsc; M.g = vec3(0.0);
}
`;

const GLSL_GLOBO = /* glsl */`
uniform vec4 uGC;        // centro, radio
uniform mat3 uGM;        // mundo → local (eje = y)
uniform vec4 uCaps[NCAPS];
uniform vec3 uGPrint;
float tierra(vec3 dir) {
  float w = 0.05 * (vnoise(dir * 7.0) - 0.5) + 0.025 * (vnoise(dir * 15.0) - 0.5);
  float m = 0.0;
  for (int i = 0; i < NCAPS; i++) {
    vec4 c = uCaps[i];
    m = max(m, smoothstep(c.w - 0.012, c.w + 0.012, dot(dir, c.xyz) + w));
  }
  return m;
}
float globoBanda(vec3 q, float R) {
  vec2 b = vec2(length(q.xz) - R * 1.005, q.y);
  return sdRoundRect(b, vec2(0.055 * R, 0.085 * R), 0.05 * R);
}
float sdf_globo(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  float d = smin(length(q) - R, globoBanda(q, R), 0.03 * R);
  return (d - 0.006 * R * bultos(q / R * 2.2)) * 0.95;
}
float sdfc_globo(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  return fuera(1, min(length(q) - R * 0.985, globoBanda(q, R * 0.985)));
}
void mat_globo(vec3 p, out Mat M) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  vec3 dir = normalize(q);
  // continentes: manchas aplastadas (relieve por normal)
  vec3 t1 = normalize(cross(dir, vec3(0.0001, 1.0, 0.0002)));
  vec3 t2 = cross(dir, t1);
  float e = 0.012;
  float l0 = tierra(dir), l1 = tierra(normalize(dir + t1 * e)), l2 = tierra(normalize(dir + t2 * e));
  M.g = transpose(uGM) * (((l1 - l0) * t1 + (l2 - l0) * t2) * (0.03 / e));
  vec3 oc = C_OCEAN * (0.88 + 0.24 * vnoise(q / R * 4.0));
  vec3 lc = C_LAND * (0.85 + 0.3 * vnoise(q / R * 6.0 + 3.0));
  vec3 alb = mix(oc, lc, smoothstep(0.3, 0.7, l0));
  float band = globoBanda(q, R);
  float wb = 1.0 - smoothstep(-0.004 * R, 0.012 * R, band - (length(q) - R));
  M.alb = mix(alb, C_GOLD * (0.92 + 0.16 * vnoise(q / R * 9.0)), wb);
  M.g *= 1.0 - wb;
  M.lp = q / R * 1.6 + uGPrint; M.bs = 2.0; M.det = 1.0; M.esc = R * 0.6;
}
`;

const f4 = (v) => v.toFixed(4);
const GLSL_TABLERO = /* glsl */`
uniform vec4 uTC;        // centro, factor de distancia
uniform mat3 uTM;        // mundo → local (rotación y escala)
uniform vec4 uTBox;      // caja local envolvente: semiancho, semialto, z mínima, z máxima
uniform vec4 uCelda[6];  // tipo (0 · 1 ✓ · 2 ✗), elevación, aplastamiento, giro
uniform vec4 uCelda2[6]; // escala, desplazamiento x, desplazamiento y, —
uniform vec3 uTPrint;
uniform sampler2D uDigitos;
// distancia 2D al trazo de los números 1–6 (horneada en una textura; fuera de la fila, aproximada)
const vec4 DIG_CAJA = vec4(-3.0, ${f4(TAB.YD - 0.32)}, 3.0, ${f4(TAB.YD + 0.32)});
float digitos(vec2 p) {
  vec2 uv = (p - DIG_CAJA.xy) / (DIG_CAJA.zw - DIG_CAJA.xy);
  vec2 cuv = clamp(uv, 0.0, 1.0);
  float d = texture(uDigitos, cuv).r * 0.5;
  return d + length((uv - cuv) * (DIG_CAJA.zw - DIG_CAJA.xy));
}
// la ficha de la casilla i: coordenadas locales de la ficha y su factor de distancia
vec3 fichaLocal(vec3 c, int i, out float k, out float off) {
  vec4 ce = uCelda[i];
  vec4 c2 = uCelda2[i];
  vec3 sq = vec3(1.0 + 0.55 * ce.z, 1.0 + 0.55 * ce.z, 1.0 - ce.z) * c2.x;
  vec3 tq = c - vec3(c2.y, ${f4(TAB.YW)} + c2.z, -0.1 + 0.16 * sq.z + ce.y);
  float cs = cos(ce.w), sn = sin(ce.w);
  tq.xy = vec2(cs * tq.x + sn * tq.y, -sn * tq.x + cs * tq.y);
  k = min(sq.x, sq.z);
  off = ce.x < 0.5 ? 1e5 : 0.0;   // casilla vacía: muy lejos
  return tq / sq;
}
// m: 0 cuerpo · 1 borde · 2 número · 3 ficha ✓ · 4 su símbolo · 5 ficha ✗ · 6 su símbolo
float tableroD(vec3 q, out float m, out vec3 lq) {
  m = 0.0; lq = q;
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f4(TAB.GR)}), vec3(${f4(TAB.HW)}, ${f4(TAB.HH)}, ${f4(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  int i = int(fi);
  vec3 c = q - vec3((fi - 2.5) * ${f4(TAB.PASO)}, 0.0, 0.0);
  // churro ocre alrededor del borde
  float br = churro(abs(sdRoundRect(q.xy, vec2(${f4(TAB.HW - 0.17)}, ${f4(TAB.HH - 0.17)}), 0.28)), q.z - 0.005, 0.05);
  if (br < d) m = 1.0;
  d = smin(d, br, 0.035);
  // hueco de la casilla
  float hw = sdRoundBox(c - vec3(0.0, ${f4(TAB.YW)}, 0.0), vec3(0.375, 0.375, 0.1), 0.12);
  d = smax(d, -hw, 0.05);
  // número de la casilla en churro azul tinta
  float dg = churro(digitos(q.xy), c.z - 0.006, 0.04);
  if (dg < d) m = 2.0;
  d = smin(d, dg, 0.022);
  float mf, kf, of;
  vec3 tq = fichaLocal(c, i, kf, of);
  float df = fichaD(tq, uCelda[i].x, mf) * kf + of;
  if (df < d) { m = 3.0 + mf + (uCelda[i].x > 1.5 ? 2.0 : 0.0); lq = tq + vec3(fi * 3.1, 0.0, 0.0); }
  return min(d, df);
}
float sdf_tablero(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float m; vec3 lq;
  return tableroD(q, m, lq) * uTC.w;
}
float sdfc_tablero(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f4(TAB.GR)}), vec3(${f4(TAB.HW)}, ${f4(TAB.HH)}, ${f4(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  vec3 c = q - vec3((fi - 2.5) * ${f4(TAB.PASO)}, 0.0, 0.0);
  float kf, of;
  vec3 tq = fichaLocal(c, int(fi), kf, of);
  d = max(d, -sdRoundBox(c - vec3(0.0, ${f4(TAB.YW)}, 0.0), vec3(0.385, 0.385, 0.11), 0.12));
  return fuera(2, min(d, fichaC(tq) * kf + of) * uTC.w);
}
void mat_tablero(vec3 p, out Mat M) {
  vec3 q = uTM * (p - uTC.xyz);
  float m; vec3 lq;
  tableroD(q, m, lq);
  vec3 alb = C_SAND * (0.94 + 0.12 * vnoise(q * 1.7));
  if (m > 0.5) alb = C_OCHRE;
  if (m > 1.5) alb = C_INK;
  if (m > 2.5) alb = C_GREEN * (0.92 + 0.16 * vnoise(lq * 3.0));
  if (m > 3.5) alb = C_LIGHT;
  if (m > 4.5) alb = C_RED * (0.92 + 0.16 * vnoise(lq * 3.0));
  if (m > 5.5) alb = C_LIGHT;
  M.alb = alb; M.lp = lq * 0.75 + uTPrint; M.bs = 3.0; M.esc = uTC.w / 0.75; M.g = vec3(0.0);
  M.det = (m > 1.5 && m < 2.5) ? 0.6 : 1.0;
}
// el rayo cruza la caja orientada del tablero: tramo [ta, tb]
bool caja_tablero(vec3 ro, vec3 rd, out float ta, out float tb) {
  vec3 o = uTM * (ro - uTC.xyz), d = uTM * rd;
  vec3 inv = 1.0 / d;
  vec3 lo = vec3(-uTBox.x, -uTBox.y, uTBox.z), hi = vec3(uTBox.x, uTBox.y, uTBox.w);
  vec3 t0 = (lo - o) * inv, t1 = (hi - o) * inv;
  vec3 mn = min(t0, t1), mx = max(t0, t1);
  ta = max(max(mn.x, mn.y), mn.z); tb = min(min(mx.x, mx.y), mx.z);
  return tb > max(ta, 0.0);
}
`;

const GLSL_POLVO = /* glsl */`
uniform vec4 uPolvo[NPOLVO];
float sdf_polvo(vec3 p) {
  float d = 1e5;
  for (int i = 0; i < NPOLVO; i++) {
    vec4 s = uPolvo[i];
    d = smin(d, length(p - s.xyz) - s.w + (s.w > 0.001 ? 0.0 : 1e5), 0.05);
  }
  // grumos: bolitas irregulares
  return (d - 0.035 * (vnoise(p * 16.0 + uBoil) - 0.4)) * 0.75;
}
float sdfc_polvo(vec3 p) { return fuera(3, sdf_polvo(p) + 0.004); }
void mat_polvo(vec3 p, out Mat M) { M.alb = C_DUST * (0.9 + 0.2 * vnoise(p * 9.0)); M.lp = p * 4.0; M.bs = 4.0; M.det = 0.7; M.esc = 0.25; M.g = vec3(0.0); }
`;

const GLSL_PIEZAS_COMUN = /* glsl */`
uniform vec4 uPC[NP];    // centro, factor de distancia (escala mínima)
uniform mat3 uPM[NP];    // mundo → local (incluye escala)
uniform vec4 uPT[NP];    // tipo, variante, color o puntos, —
uniform vec4 uPS[NP];    // huella xyz, —
`;
// funciones de una pieza concreta (índice fijo i o la variable uPieza)
function glslPieza(sufijo, idx, tipo, b) {
  const t = nombreTipo(tipo);
  return `
float sdf_${sufijo}(vec3 p) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz); float m;
  return pz_${t}(q, uPT[${idx}], m) * uPC[${idx}].w;
}
float sdfc_${sufijo}(vec3 p) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz);
  return fuera(${b}, pzc_${t}(q, uPT[${idx}]) * uPC[${idx}].w);
}
void mat_${sufijo}(vec3 p, out Mat M) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz); float m;
  pz_${t}(q, uPT[${idx}], m);
  M.alb = pzcol_${t}(q, uPT[${idx}], m);
  M.lp = q * 0.8 + uPS[${idx}].xyz; M.bs = 5.0 + float(${idx}); M.det = 1.0; M.esc = uPC[${idx}].w / 0.8; M.g = vec3(0.0);
}
`;
}

// ---------- pasadas ----------
const GLSL_REVELAR = /* glsl */`
vec3 revelar(vec3 col) {
  col *= 1.05;
  col = aces(col);
  col = pow(col, vec3(1.0 / 2.2));
  vec2 q = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - 0.38 * pow(length(q * vec2(1.0, 1.15)) * 1.35, 2.6);
  return col + (hash12(gl_FragCoord.xy + uFrame * 17.13) - 0.5) * 0.028;
}
// tramo de un rayo de sombra que pasa por las esferas envolventes
bool rangoSombra(vec3 ro, vec3 rd, out float t0, out float t1) {
  t0 = 1e5; t1 = -1.0;
  for (int i = 0; i < NB; i++) {
    vec4 b = uB[i];
    vec3 oc = ro - b.xyz;
    float bb = dot(oc, rd), c = dot(oc, oc) - b.w * b.w;
    float h = bb * bb - c;
    bool ok = b.w > 0.0 && h > 0.0;
    h = sqrt(max(h, 0.0));
    float ta = -bb - h, tb = -bb + h;
#ifdef TABLERO
    if (i == 2) { float ca, cb; ok = b.w > 0.0 && caja_tablero(ro, rd, ca, cb); ta = ca; tb = cb; }
#endif
    ok = ok && tb > 0.0;
    t0 = ok ? min(t0, max(ta, 0.0)) : t0;
    t1 = ok ? max(t1, tb) : t1;
  }
  return t1 > 0.0;
}
float softShadow(vec3 p, vec3 L, float maxT, float k) {
  float t0, t1;
  rangoSombra(p, L, t0, t1);
  float t = max(t0, 0.04), res = 1.0, end = min(t1, maxT);
  for (int i = 0; i < SOMBRA_PASOS; i++) {
    if (t > end || res < 0.002) break;
    float h = mapC(p + L * t);
    res = min(res, k * h / t);
    t += clamp(h, 0.02, 0.45);
  }
  res = clamp(res, 0.0, 1.0);
  return res * res * (3.0 - 2.0 * res);
}
`;

const GLSL_PASO_SOMBRA = /* glsl */`
uniform float uSombraEsc;
float aoBg(vec3 p, vec3 n) {
  float o = 0.0;
  int nao = 0;
  for (int i = 0; i < NB; i++) nao = (uB[i].w > 0.0 && length(p - uB[i].xyz) < uB[i].w + 2.2) ? 4 : nao;
  for (int i = 1; i <= nao; i++) {
    float h = 0.35 * float(i) * float(i) * 0.5 + 0.1;
    float d = mapC(p + n * h);
    o += clamp((h - d) / h, 0.0, 1.0) * (1.0 / float(i));
  }
  return clamp(1.0 - 0.42 * o, 0.0, 1.0);
}
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy * uSombraEsc);
  vec3 nb; float arc;
  float tb = bgHit(ro, rd, nb, arc);
  vec3 p = ro + rd * tb;
  vec3 L = normalize(LPOS - p);
  float sh = softShadow(p + nb * 0.01, L, length(LPOS - p), 11.0);
  float ao = aoBg(p, nb);
  fragColor = vec4(sh, ao, 0.0, 1.0);
}
`;

const GLSL_PASO_FONDO = /* glsl */`
uniform sampler2D uBgD, uBgA, uSombra;
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec3 D = texelFetch(uBgD, px, 0).rgb; D = D * D * 4.0;
  vec3 A = texelFetch(uBgA, px, 0).rgb; A = A * A * 0.5;
  vec2 sa = texture(uSombra, gl_FragCoord.xy / uRes).rg;
  float key = 2.6 * uFlicker;
  vec3 col = (D * key * mix(0.16, 1.0, sa.x) + A * sa.y) * mix(0.6, 1.0, sa.y);
  fragColor = vec4(revelar(col), 1.0);
#ifdef DBG_SOMBRA
  fragColor = vec4(sa.x, sa.y, 0.0, 1.0);
#endif
}
`;

const GLSL_PASO_OBJETO = /* glsl */`
// huellas dactilares: remolinos de surcos en parches
vec4 fingerprint(vec3 x, float sc, float seed, float pixW) {
  vec3 y = x * sc + seed;
  vec3 c = floor(y);
  vec3 h = vec3(hash13(c), hash13(c + 17.1), hash13(c + 31.7));
  vec3 ctr = c + 0.32 + 0.36 * h;
  vec3 v = y - ctr;
  v.y *= 1.0 + 0.5 * h.x;
  float r = length(v);
  float m = (1.0 - smoothstep(0.1, 0.3, r)) * step(0.3, hash13(c + 5.3));
  float spacing = 0.042;
  float fade = 1.0 - smoothstep(0.35, 0.75, pixW * sc / spacing);
  float ph = r * 6.2832 / spacing + 2.5 * vnoise(y * 5.0);
  return vec4(m * fade * cos(ph) * (v / (r + 1e-4)) * 0.22, m * fade * (0.5 - 0.5 * sin(ph)));
}
vec3 normalObj(vec3 p) {
  vec3 n = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    vec3 e = 0.5773 * (2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0);
    n += e * SDF_OBJ(p + e * 0.0012);
  }
  return normalize(n);
}
float aoObj(vec3 p, vec3 n) {
  float o = 0.0, s = 1.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.02 + 0.11 * float(i);
    float d = min(mapC(p + n * h), bgSDF(p + n * h));
    o += (h - d) * s; s *= 0.7;
  }
  return clamp(1.0 - 2.0 * o, 0.0, 1.0);
}
vec3 shade(vec3 p, vec3 rd, float tObj, vec3 n, Mat M) {
  vec3 alb = M.alb, lp = M.lp;
  float bs = M.bs, det = M.det;
  float pixW = uPix * tObj / max(M.esc, 0.05);
  vec4 nd = vnoised(lp * 2.6 + bs * 11.0 + uBoil * 0.06);
  vec3 g = nd.yzw * 0.13;
  vec4 nm = vnoised(lp * 7.5 + bs * 5.0);
  g += nm.yzw * 0.07;
  vec4 f1 = fingerprint(lp, 1.05, bs * 3.7, pixW);
  vec4 f2 = fingerprint(lp + 0.31, 1.6, bs * 9.1 + 4.0, pixW);
  g += f1.xyz * 1.7 + f2.xyz * 1.1;
  vec4 gr = vnoised(lp * 40.0 + bs);
  g += gr.yzw * 0.018 * (1.0 - smoothstep(0.012, 0.03, pixW));
  g = g * det + M.g;
  n = normalize(n - (g - n * dot(g, n)));
  alb *= 1.0 - (0.15 * f1.w + 0.10 * f2.w) * det - 0.05 * smoothstep(0.55, 0.85, gr.x);

  vec3 L = normalize(LPOS - p);
  float sh = mix(0.1, 1.0, softShadow(p + n * 0.025, L, 30.0, 6.0));
  float ao = aoObj(p, n);
  float ndl = dot(n, L);
  float wrapD = max((ndl + 0.28) / 1.28, 0.0);
  vec3 sss = pow(alb, vec3(1.55)) * 1.4 * smoothstep(-0.35, 0.15, ndl) * (1.0 - smoothstep(0.15, 0.6, ndl));
  vec3 V = -rd, Hh = normalize(L + V);
  float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);
  float nh = max(dot(n, Hh), 0.0);
  float spec = (pow(nh, 22.0) * 0.10 + pow(nh, 90.0) * 0.12) * (0.8 + 0.6 * fres);
  float key = 2.6 * uFlicker * spotCone(p);
  vec3 col = (alb * wrapD + sss * 0.5) * LCOL * key * sh;
  col += spec * LCOL * key * sh * smoothstep(-0.1, 0.3, ndl);
  col += alb * vec3(0.38, 0.44, 0.62) * pow(max(dot(n, normalize(FILL_DIR)) * 0.5 + 0.5, 0.0), 1.5) * 0.5 * ao;
  float up = n.y * 0.5 + 0.5;
  col += alb * mix(vec3(0.07, 0.05, 0.06), vec3(0.12, 0.15, 0.26), up) * 0.6 * ao;
  float rim = pow(1.0 - max(dot(n, V), 0.0), 2.6) * max(dot(n, normalize(RIM_DIR)) + 0.35, 0.0);
  col += RIM_COL * alb * rim * 1.2 * ao;
  return col * mix(0.55, 1.0, ao);
}
bool esfera(vec3 ro, vec3 rd, vec4 b, out float ta, out float tb) {
  vec3 oc = ro - b.xyz;
  float bb = dot(oc, rd), c = dot(oc, oc) - b.w * b.w;
  float h = bb * bb - c;
  h = sqrt(max(h, 0.0));
  ta = -bb - h; tb = -bb + h;
  return bb * bb - c > 0.0 && tb > 0.0;
}
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy);
  float t0, t1;
#ifdef OBJ_CAJA
  bool dentro = caja_tablero(ro, rd, t0, t1);
#else
  bool dentro = esfera(ro, rd, uB[OBJ_B], t0, t1);
#endif
  if (!dentro) discard;
  float t = max(t0, 0.0), tHit = -1.0, bestR = 1e5, bestT = t;
#ifdef SDFA_OBJ
  // fase 1: envolvente barata hasta quedar cerca de la arcilla
  for (int i = 0; i < RAYO_PASOS; i++) {
    float d = SDFA_OBJ(ro + rd * t);
    if (d < 4.0 * uPix * t || t > t1) break;
    t += d;
  }
  bestT = t;
#endif
  for (int i = 0; i < RAYO_PASOS2; i++) {
    vec3 p = ro + rd * t;
    float d = SDF_OBJ(p);
    if (d < 0.00022 * t) { tHit = t; break; }
    float r = d / (uPix * t);
    if (r < bestR) { bestR = r; bestT = t; }
    t += d * 0.92;
    if (t > t1) break;
  }
  float cov = tHit > 0.0 ? 1.0 : 1.0 - smoothstep(0.0, 0.75, bestR);
  if (cov < 0.004) discard;
  float ts = tHit > 0.0 ? tHit : bestT;
  vec3 p = ro + rd * ts;
  vec3 n = normalObj(p);
  Mat M;
  MAT_OBJ(p, M);
  fragColor = vec4(revelar(shade(p, rd, ts, n, M)), cov);
  gl_FragDepth = clamp(ts / 100.0, 0.0, 1.0);
}
`;

const VERT_PANTALLA = /* glsl */`
in vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
const VERT_RECT = /* glsl */`
in vec3 position;
uniform vec4 uRect;   // rectángulo en coordenadas de recorte: x0, y0, x1, y1
void main() { gl_Position = vec4(mix(uRect.xy, uRect.zw, position.xy * 0.5 + 0.5), 0.0, 1.0); }
`;

// núcleo: bolitas en racimo (posiciones fijas, sembradas) — las del demo
const NUC = (() => {
  const r = mulberry32(77), out = [];
  const N = 8;
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 0.4;
    const k = 0.33 + 0.03 * r();
    out.push([Math.cos(ph) * rr * k, y * k * 0.92, Math.sin(ph) * rr * k]);
  }
  return out;
})();
const ORB = [0, 1, 2].map((i) => new THREE.Matrix4().makeRotationZ(i * Math.PI / 3 + 0.26).multiply(new THREE.Matrix4().makeRotationX(0.44)));
const VEL = [3, -3, 3], FASE = [0.3, 2.4, 4.4];

const rotXYZ = (rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ'));
const rotTab = ({ inclinacion = 0.6, giro = 0, roll = 0 }) => new THREE.Matrix4().makeRotationY(giro).multiply(new THREE.Matrix4().makeRotationX(-inclinacion)).multiply(new THREE.Matrix4().makeRotationZ(roll));

// ---------- el plató ----------
export async function crearPlato({
  camara = {}, atomo = true, globo = false, tablero = false, polvo = 0, piezas = [], sombras = {},
  semilla = 20261019, pasosRayo = 90, pasosSombra = 28, sombraEsc = 3,
} = {}) {
  const busqueda = new URLSearchParams(location.search);
  const captura = busqueda.has('captura');
  const NP = piezas.length;

  // lienzo 16:9 con bandas si la ventana tiene otra proporción
  const estilo = document.createElement('style');
  estilo.textContent = `html,body{margin:0;height:100%;background:#0c0f1d;overflow:hidden}
#escena{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#151a30;overflow:hidden}
#escena canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}`;
  document.head.appendChild(estilo);
  const cont = document.createElement('div'); cont.id = 'escena';
  const lienzo = document.createElement('canvas');
  cont.appendChild(lienzo); document.body.appendChild(cont);

  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: false, preserveDrawingBuffer: true, alpha: false, depth: true });
  renderer.setClearColor(0x151a30, 1);
  renderer.autoClear = false;
  const gl = renderer.getContext();

  // cámara
  const cam = {
    pos: new THREE.Vector3(...(camara.pos ?? [0, 3.6, 15])),
    mira: new THREE.Vector3(...(camara.mira ?? [0, 2.0, 0])),
    tanY: Math.tan(((camara.fov ?? 28) / 2) * Math.PI / 180),
  };
  const f = cam.mira.clone().sub(cam.pos).normalize();
  const r = new THREE.Vector3().crossVectors(f, new THREE.Vector3(0, 1, 0)).normalize();
  const u = new THREE.Vector3().crossVectors(r, f);
  const b = f.clone().negate();
  const camRot = new THREE.Matrix3().set(r.x, u.x, b.x, r.y, u.y, b.y, r.z, u.z, b.z);
  const ASP = W / H;
  // píxel (1920x1080) de un punto del mundo; null si queda detrás de la cámara
  const proyectar = ([x, y, z]) => {
    const v = new THREE.Vector3(x, y, z).sub(cam.pos);
    const zc = v.dot(f);
    if (zc < 0.2) return null;
    return [(v.dot(r) / zc / (cam.tanY * ASP) + 1) / 2 * W, (1 - v.dot(u) / zc / cam.tanY) / 2 * H];
  };
  // punto del mundo en el píxel (sx, sy) a la profundidad del plano z = z0
  const punto = (sx, sy, z0 = 0) => {
    const nx = (sx / W) * 2 - 1, ny = 1 - (sy / H) * 2;
    const d = new THREE.Vector3().addScaledVector(r, nx * cam.tanY * ASP).addScaledVector(u, ny * cam.tanY).add(f).normalize();
    const t = (z0 - cam.pos.z) / d.z;
    return [cam.pos.x + d.x * t, cam.pos.y + d.y * t, z0];
  };

  const NSTARS = 28;
  const ESTR = estrellas(semilla, NSTARS);
  const caps = TIERRA.map(([la, lo, a]) => {
    const LA = la * Math.PI / 180, LO = lo * Math.PI / 180;
    return new THREE.Vector4(Math.cos(LA) * Math.sin(LO), Math.sin(LA), Math.cos(LA) * Math.cos(LO), Math.cos(a * Math.PI / 180));
  });
  const NB = 4 + NP;

  // ---------- objetos y sus programas ----------
  // id → { b: índice de esfera envolvente, sdf, sdfc, mat }
  const objetos = [];
  if (atomo) objetos.push({ id: 'atomo', b: 0 });
  if (globo) objetos.push({ id: 'globo', b: 1 });
  if (tablero) objetos.push({ id: 'tablero', b: 2, caja: true });
  if (polvo) objetos.push({ id: 'polvo', b: 3 });
  piezas.forEach((tipo, i) => objetos.push({ id: `p${i}`, b: 4 + i, tipo }));
  const tiposUsados = [...new Set(piezas)];
  const glifos = new Set(['✓', '✗']);
  for (const t of tiposUsados) if (t.startsWith('glifo:')) glifos.add(t.slice(6));
  let decl = GLSL_FORMAS + [...glifos].map(glslGlifo).join('') + GLSL_FICHA;
  if (atomo) decl += GLSL_ATOMO;
  if (globo) decl += GLSL_GLOBO;
  if (tablero) decl += GLSL_TABLERO;
  if (polvo) decl += GLSL_POLVO;
  if (NP) {
    decl += GLSL_PIEZAS_COMUN;
    for (const t of tiposUsados) decl += t.startsWith('glifo:') ? glslTipoGlifo(t.slice(6)) : GLSL_TIPOS[t];
    piezas.forEach((t, i) => { decl += glslPieza(`p${i}`, i, t, 4 + i); });
  }
  const mapC = (ids) => `float mapC(vec3 p) {\n  float d = 1e5;\n${ids.map((id) => `  d = min(d, sdfc_${id}(p));\n`).join('')}  return d;\n}\n`;
  const todos = objetos.map((o) => o.id);
  const defines = { NB, NP: Math.max(NP, 1), NPOLVO: Math.max(polvo, 1), NSTARS, NCAPS: caps.length, RAYO_PASOS: pasosRayo, SOMBRA_PASOS: pasosSombra };
  // depuración: ?dbg=NOMBRE,OTRO añade esos #define
  for (const k of (busqueda.get('dbg') ?? '').split(',').filter(Boolean)) defines[k] = 1;

  const comunes = {
    uRes: { value: new THREE.Vector2(W, H) },
    uCamPos: { value: cam.pos.clone() }, uCamRot: { value: camRot },
    uTanY: { value: cam.tanY }, uAsp: { value: ASP }, uPix: { value: 2 * cam.tanY / H },
  };
  const tipoRT = renderer.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType;
  const rtOpts = { type: tipoRT, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
  const rtD = new THREE.WebGLRenderTarget(W, H, rtOpts), rtA = new THREE.WebGLRenderTarget(W, H, rtOpts), rtT = new THREE.WebGLRenderTarget(W, H, rtOpts);
  const rtSOpts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
  const rtS = new THREE.WebGLRenderTarget(Math.ceil(W / sombraEsc), Math.ceil(H / sombraEsc), rtSOpts);
  const rtS2 = new THREE.WebGLRenderTarget(Math.ceil(W / sombraEsc), Math.ceil(H / sombraEsc), rtSOpts);

  const v4 = (n) => Array.from({ length: n }, () => new THREE.Vector4());
  const m3 = (n) => Array.from({ length: n }, () => new THREE.Matrix3());
  const U = {
    ...comunes,
    uFrame: { value: 0 }, uFlicker: { value: 1 }, uLump: { value: 0.008 }, uBoil: { value: new THREE.Vector3() },
    uB: { value: v4(NB) }, uBgD: { value: rtD.texture }, uBgA: { value: rtA.texture }, uSombra: { value: rtS.texture },
    uSombraEsc: { value: sombraEsc },
    uCen: { value: new THREE.Vector3() }, uSq: { value: new THREE.Vector3(1, 1, 1) }, uAEsc: { value: 1 },
    uYaw: { value: new THREE.Matrix3() }, uNuc: { value: v4(8) },
    uRingM: { value: m3(3) }, uRing: { value: new THREE.Vector2(1.68, 0.092) }, uElec: { value: v4(3) }, uBrazo: { value: new THREE.Vector3() }, uAPrint: { value: new THREE.Vector3() },
    uGC: { value: new THREE.Vector4() }, uGM: { value: new THREE.Matrix3() }, uCaps: { value: caps }, uGPrint: { value: new THREE.Vector3() },
    uTC: { value: new THREE.Vector4() }, uTM: { value: new THREE.Matrix3() }, uTBox: { value: new THREE.Vector4() },
    uCelda: { value: v4(6) }, uCelda2: { value: Array.from({ length: 6 }, () => new THREE.Vector4(1, 0, 0, 0)) }, uTPrint: { value: new THREE.Vector3() }, uDigitos: { value: null },
    uPolvo: { value: v4(Math.max(polvo, 1)) },
    uPC: { value: v4(Math.max(NP, 1)) }, uPM: { value: m3(Math.max(NP, 1)) }, uPT: { value: v4(Math.max(NP, 1)) }, uPS: { value: v4(Math.max(NP, 1)) },
  };
  const quad = new THREE.PlaneGeometry(2, 2);
  const camOrto = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const crearPaso = (frag, { vert = VERT_PANTALLA, uniforms = U, extraDefs = {}, mezcla = false } = {}) => {
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3, defines: { ...defines, ...extraDefs }, uniforms, vertexShader: vert, fragmentShader: frag,
      depthTest: mezcla, depthWrite: mezcla, transparent: mezcla,
      blending: mezcla ? THREE.CustomBlending : THREE.NoBlending,
      blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    const s = new THREE.Scene(); const me = new THREE.Mesh(quad, mat); me.frustumCulled = false; s.add(me);
    return { mat, escena: s };
  };

  const hornoU = { ...comunes, uStars: { value: ESTR.map((s) => new THREE.Vector4(...s)) }, uSalida: { value: 0 } };
  const pasoHorno = crearPaso(GLSL_COMUN + GLSL_HORNO, { uniforms: hornoU });
  const desU = { ...comunes, uTex: { value: null }, uDir: { value: new THREE.Vector2(1, 0) },
    uFoco: { value: camara.foco ?? cam.pos.distanceTo(cam.mira) }, uK: { value: camara.desenfoque ?? 26 } };
  const pasoDes = crearPaso(GLSL_COMUN + GLSL_DESENFOQUE, { uniforms: desU });
  const pasoSombra = crearPaso(GLSL_COMUN + decl + mapC(todos.filter((id) => id !== 'polvo')) + GLSL_REVELAR + GLSL_PASO_SOMBRA);
  // suavizado de la sombra a baja resolución (3 tomas por eje)
  const suaU = { uTex: { value: null }, uDir: { value: new THREE.Vector2() }, uTam: { value: new THREE.Vector2() } };
  const pasoSuave = crearPaso(`precision highp float;\nout vec4 fragColor;\nuniform sampler2D uTex;\nuniform vec2 uDir, uTam;
void main() { vec2 uv = gl_FragCoord.xy / uTam, d = uDir / uTam;
  fragColor = 0.25 * texture(uTex, uv - d) + 0.5 * texture(uTex, uv) + 0.25 * texture(uTex, uv + d); }`, { uniforms: suaU });
  const pasoFondo = crearPaso(GLSL_COMUN + decl + mapC(todos) + GLSL_REVELAR + GLSL_PASO_FONDO);
  for (const o of objetos) {
    const lanzan = [o.id, ...(sombras[o.id] ?? [])].filter((id) => todos.includes(id));
    o.uRect = { value: new THREE.Vector4(-1, -1, 1, 1) };
    o.paso = crearPaso(GLSL_COMUN + decl + mapC(lanzan) + GLSL_REVELAR + GLSL_PASO_OBJETO, {
      vert: VERT_RECT, uniforms: { ...U, uRect: o.uRect }, mezcla: true,
      extraDefs: {
        SDF_OBJ: `sdf_${o.id}`, MAT_OBJ: `mat_${o.id}`, OBJ_B: o.b, ...(o.caja ? { OBJ_CAJA: 1 } : {}),
        ...(o.id === 'atomo' ? { SDFA_OBJ: 'sdfa_atomo', RAYO_PASOS2: 48 } : { RAYO_PASOS2: pasosRayo }),
      },
    });
  }

  const px = new Uint8Array(4);
  const sincronizar = () => gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);

  if (tablero) {
    const rtDig = new THREE.WebGLRenderTarget(2048, 224, { type: tipoRT, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false });
    const pd = crearPaso(GLSL_HORNO_DIGITOS('123456'.split('').map(glslGlifo).join('')), { uniforms: { uTam: { value: new THREE.Vector2(2048, 224) } } });
    renderer.setRenderTarget(rtDig);
    renderer.render(pd.escena, camOrto);
    renderer.setRenderTarget(null);
    U.uDigitos.value = rtDig.texture;
  }

  function hornear() {
    for (const [rt, s] of [[rtD, 0], [rtA, 1]]) {
      hornoU.uSalida.value = s;
      renderer.setRenderTarget(rt);
      renderer.render(pasoHorno.escena, camOrto);
      // profundidad de campo: desenfoque separable con radio según la distancia al foco
      for (const [de, a, dir] of [[rt, rtT, [1, 0]], [rtT, rt, [0, 1]]]) {
        desU.uTex.value = de.texture; desU.uDir.value.set(...dir);
        renderer.setRenderTarget(a);
        renderer.render(pasoDes.escena, camOrto);
      }
    }
    renderer.setRenderTarget(null);
    sincronizar();
  }

  // tamaño: en captura, 1920x1080 exactos; en la vista previa, a menos resolución
  const grueso = matchMedia('(pointer: coarse)').matches;
  function ajustar() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    const cw = Math.max(1, Math.round(W * s)), ch = Math.max(1, Math.round(H * s));
    cont.style.width = cw + 'px'; cont.style.height = ch + 'px';
    const maxAncho = captura ? W : grueso ? 640 : 960;
    renderer.setPixelRatio(captura ? W / cw : Math.min(window.devicePixelRatio || 1, maxAncho / cw));
    renderer.setSize(cw, ch, false);
    const bsz = new THREE.Vector2(); renderer.getDrawingBufferSize(bsz);
    comunes.uRes.value.copy(bsz);
    comunes.uPix.value = 2 * cam.tanY / bsz.y;
    rtD.setSize(bsz.x, bsz.y); rtA.setSize(bsz.x, bsz.y); rtT.setSize(bsz.x, bsz.y);
    rtS.setSize(Math.ceil(bsz.x / sombraEsc), Math.ceil(bsz.y / sombraEsc));
    rtS2.setSize(Math.ceil(bsz.x / sombraEsc), Math.ceil(bsz.y / sombraEsc));
    hornear();
  }
  ajustar();

  // ---------- estado de cada fotograma ----------
  const B = U.uB.value;
  const cajas = {};   // id → esquinas (mundo) del volumen envolvente, para su rectángulo de pantalla
  const cubo = (c, rr) => { const out = []; for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) out.push([c[0] + sx * rr, c[1] + sy * rr, c[2] + sz * rr]); return out; };
  function limpiar() {
    for (const v of B) v.set(0, 0, 0, 0);
    for (const k in cajas) delete cajas[k];
  }
  limpiar();
  let nActual = 0;
  const huella = (on, k) => (on ? [(azar(nActual, k) - 0.5) * 0.3, (azar(nActual, k + 1) - 0.5) * 0.3, (azar(nActual, k + 2) - 0.5) * 0.3] : [0, 0, 0]);

  // El átomo narrador: núcleo de bolitas, tres órbitas de churro inclinadas y tres electrones.
  //   pos, escala, yaw/pitch/roll (giro del cuerpo), sq [x,y,z] (aplastar en ejes del mundo),
  //   energia (0..1: late al hablar), ts (segundos: avanzan los electrones), electrones: [[x,y,z] |
  //   { pos: [x,y,z], mezcla: 0..1 } | { mundo: [dx,dy,dz], mezcla } | null] (posición local, o
  //   desplazamiento en el mundo desde el centro, de un electrón que sale de su órbita; con brazo: 0..1,
  //   un churro lo une al núcleo, como un brazo que señala o saluda), toque.
  function ponerAtomo({ pos = [0, 2, 0], escala = 1, yaw = -0.1, pitch = 0.05, roll = 0, sq = [1, 1, 1], energia = 0, ts = 0, electrones = [], toque = false, orbita = 1 } = {}) {
    if (!atomo) return;
    U.uCen.value.set(...pos); U.uAEsc.value = escala; U.uSq.value.set(...sq);
    const R = rotXYZ(pitch, yaw, roll);
    U.uYaw.value.setFromMatrix4(R.clone().transpose());
    const e = cl(energia);
    const ns = 1 + 0.07 * e, nr = 0.29 * (1 + 0.09 * e);
    NUC.forEach((p, i) => {
      const j = 0.006;
      U.uNuc.value[i].set(p[0] * ns + (azar(nActual, 10 + i) - 0.5) * j, p[1] * ns + (azar(nActual, 20 + i) - 0.5) * j, p[2] * ns + (azar(nActual, 30 + i) - 0.5) * j, nr);
    });
    const Rr = 1.68 * orbita * (1 + 0.025 * e), tube = 0.092;
    U.uRing.value.set(Rr, tube);
    let ext = Rr + tube * 1.15 + 0.03;
    ORB.forEach((M, i) => {
      U.uRingM.value[i].setFromMatrix4(M.clone().transpose());
      const th = 2 * Math.PI * VEL[i] * ts / 10 + FASE[i];
      let v = new THREE.Vector3(Rr * Math.cos(th), 0, Rr * Math.sin(th)).applyMatrix4(M);
      const el = electrones[i];
      U.uBrazo.value.setComponent(i, el && !Array.isArray(el) ? 0.06 * cl(el.brazo ?? 0) : 0);
      if (Array.isArray(el)) v = new THREE.Vector3(...el);
      else if (el && el.pos) v.lerp(new THREE.Vector3(...el.pos), cl(el.mezcla ?? 1));
      else if (el && el.mundo) {
        // desplazamiento en el mundo desde el centro del átomo → coordenadas locales
        const w = new THREE.Vector3(el.mundo[0] / (sq[0] * escala), el.mundo[1] / (sq[1] * escala), el.mundo[2] / (sq[2] * escala)).applyMatrix4(R.clone().transpose());
        v.lerp(w, cl(el.mezcla ?? 1));
      }
      U.uElec.value[i].set(v.x, v.y, v.z, 0.19);
      ext = Math.max(ext, v.length() + 0.21);
    });
    U.uAPrint.value.set(...huella(toque, 40));
    const rr = ext * escala * Math.max(...sq) + 0.03;
    B[0].set(pos[0], pos[1], pos[2], rr);
    cajas.atomo = cubo(pos, rr);
  }

  // El globo de plastilina: océano, continentes pegados y el ecuador como tira dorada.
  function ponerGlobo({ pos = [0, 2, 0], radio = 1.4, inclinacion = 0.41, giro = 0, toque = false } = {}) {
    if (!globo) return;
    const R = new THREE.Matrix4().makeRotationZ(-inclinacion).multiply(new THREE.Matrix4().makeRotationY(giro));
    U.uGM.value.setFromMatrix4(R.clone().transpose());
    U.uGC.value.set(pos[0], pos[1], pos[2], radio);
    U.uGPrint.value.set(...huella(toque, 50));
    const rr = radio * 1.075 + 0.03;
    B[1].set(pos[0], pos[1], pos[2], rr);
    cajas.globo = cubo(pos, rr);
  }

  // El marcador: losa de arena con borde de churro ocre, seis números (1–6) y seis huecos.
  //   celdas[i] = { tipo: 0|1|2|'✓'|'✗', alto (elevación sobre el hueco), aplastar (+ aplasta,
  //   − estira), giro, escala, dx, dy }. inclinacion: hacia atrás (radianes); sq: aplastar el tablero.
  function ponerTablero({ pos = [0, 1.5, 0], escala = 0.8, inclinacion = 0.6, giro = 0, roll = 0, celdas = [], toque = false, sq = [1, 1, 1] } = {}) {
    if (!tablero) return;
    const Rm = rotTab({ inclinacion, giro, roll });
    const M = Rm.clone().transpose();
    M.premultiply(new THREE.Matrix4().makeScale(1 / (sq[0] * escala), 1 / (sq[1] * escala), 1 / (sq[2] * escala)));
    U.uTM.value.setFromMatrix4(M);
    U.uTC.value.set(pos[0], pos[1], pos[2], escala * Math.min(...sq));
    let alto = 0, dy = 0;
    for (let i = 0; i < 6; i++) {
      const c = celdas[i] ?? {};
      const tipo = typeof c.tipo === 'string' ? veredictoATipo(c.tipo) : (c.tipo ?? 0);
      U.uCelda.value[i].set((c.escala ?? 1) > 0.01 ? tipo : 0, c.alto ?? 0, c.aplastar ?? 0, c.giro ?? 0);
      U.uCelda2.value[i].set(c.escala ?? 1, c.dx ?? 0, c.dy ?? 0, 0);
      if (tipo) { alto = Math.max(alto, (c.alto ?? 0) + 0.12 * Math.abs(c.aplastar ?? 0)); dy = Math.max(dy, Math.abs(c.dy ?? 0) + 0.2 * Math.max(0, -(c.aplastar ?? 0))); }
    }
    const bx = TAB.HW + 0.06, by = TAB.HH + 0.06 + dy, z0 = -2 * TAB.GR - 0.06, z1 = 0.3 + alto;
    U.uTBox.value.set(bx, by, z0, z1);
    U.uTPrint.value.set(...huella(toque, 60));
    const esq = [];
    const Ms = Rm.clone().multiply(new THREE.Matrix4().makeScale(sq[0] * escala, sq[1] * escala, sq[2] * escala));
    for (const x of [-bx, bx]) for (const y of [-by, by]) for (const z of [z0, z1]) {
      const v = new THREE.Vector3(x, y, z).applyMatrix4(Ms);
      esq.push([pos[0] + v.x, pos[1] + v.y, pos[2] + v.z]);
    }
    cajas.tablero = esq;
    const cz = (z0 + z1) / 2, cv = new THREE.Vector3(0, 0, cz).applyMatrix4(Ms);
    B[2].set(pos[0] + cv.x, pos[1] + cv.y, pos[2] + cv.z, escala * Math.max(...sq) * Math.hypot(bx, by, (z1 - z0) / 2) + 0.03);
  }

  // Polvo del golpe: bolitas [x, y, z, radio].
  function ponerPolvo(lista = []) {
    if (!polvo) return;
    const v = U.uPolvo.value;
    const box = new THREE.Box3();
    let rmax = 0, hay = false;
    for (let i = 0; i < polvo; i++) {
      const s = lista[i];
      if (s && s[3] > 0.002) { v[i].set(...s); box.expandByPoint(new THREE.Vector3(s[0], s[1], s[2])); rmax = Math.max(rmax, s[3]); hay = true; }
      else v[i].set(0, 0, 0, 0);
    }
    if (!hay) { B[3].set(0, 0, 0, 0); return; }
    const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
    const rr = s.length() / 2 + rmax + 0.05;
    B[3].set(c.x, c.y, c.z, rr);
    cajas.polvo = cubo([c.x, c.y, c.z], rr);
  }

  // Piezas sueltas (su tipo se fija al crear el plató).
  //   { pos, escala, sq [x,y,z] (en ejes de la pieza), rot [x,y,z] (euler YXZ),
  //     variante (ficha: '✓'|'✗'|1|2), color (glifo: COLOR.*), puntos (bocadillo: 0..3), toque }
  function ponerPieza(i, { pos = [0, 0, 0], escala = 1, sq = [1, 1, 1], rot = [0, 0, 0], variante = 0, color = 0, puntos = 0, toque = false } = {}) {
    if (i >= NP) throw new Error(`pieza ${i}: el plató solo tiene ${NP}`);
    if (escala <= 0.005) { B[4 + i].set(0, 0, 0, 0); return; }
    const tipo = piezas[i];
    const R = rotXYZ(...rot);
    const S = sq.map((v) => v * escala);
    const M = R.clone().transpose().premultiply(new THREE.Matrix4().makeScale(1 / S[0], 1 / S[1], 1 / S[2]));
    U.uPM.value[i].setFromMatrix4(M);
    U.uPC.value[i].set(pos[0], pos[1], pos[2], Math.min(...S));
    const v = typeof variante === 'string' ? veredictoATipo(variante) : variante;
    U.uPT.value[i].set(0, v, tipo === 'bocadillo' ? puntos : color, 0);
    U.uPS.value[i].set(...huella(toque, 70 + i * 3), 0);
    const rr = RADIO_TIPO[tipo.startsWith('glifo') ? 'glifo' : tipo] * Math.max(...S) + 0.03;
    B[4 + i].set(pos[0], pos[1], pos[2], rr);
    cajas[`p${i}`] = cubo(pos, rr);
  }

  // rectángulo de pantalla (coordenadas de recorte) que cubre unas esquinas; null si no se ve
  function rectangulo(esq) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const e of esq) {
      const s = proyectar(e);
      if (!s) return new THREE.Vector4(-1, -1, 1, 1);
      x0 = Math.min(x0, s[0]); x1 = Math.max(x1, s[0]); y0 = Math.min(y0, s[1]); y1 = Math.max(y1, s[1]);
    }
    x0 = Math.max(0, x0 - 3); y0 = Math.max(0, y0 - 3); x1 = Math.min(W, x1 + 3); y1 = Math.min(H, y1 + 3);
    if (x1 <= x0 || y1 <= y0) return null;
    return new THREE.Vector4(x0 / W * 2 - 1, 1 - y1 / H * 2, x1 / W * 2 - 1, 1 - y0 / H * 2);
  }

  let ultimo = null;
  // ?perfil: mide cada pasada (window.__perfil)
  const perfil = busqueda.has('perfil');
  let tPaso = 0;
  const medir = (k) => { if (!perfil) return; sincronizar(); const a = performance.now(); window.__perfil[k] = Math.round(a - tPaso); tPaso = a; };
  function render(n) {
    U.uFrame.value = n;
    U.uFlicker.value = 1 + (azar(n, 3) - 0.5) * 0.03;
    U.uBoil.value.set(1.3 + (azar(n, 4) - 0.5) * 0.5, 0.7 + (azar(n, 5) - 0.5) * 0.5, 2.1 + (azar(n, 6) - 0.5) * 0.5);
    if (perfil) { window.__perfil = {}; sincronizar(); tPaso = performance.now(); }
    renderer.setRenderTarget(rtS);
    renderer.render(pasoSombra.escena, camOrto);
    suaU.uTam.value.set(rtS.width, rtS.height);
    for (const [de, a, dir] of [[rtS, rtS2, [1, 0]], [rtS2, rtS, [0, 1]]]) {
      suaU.uTex.value = de.texture; suaU.uDir.value.set(...dir);
      renderer.setRenderTarget(a);
      renderer.render(pasoSuave.escena, camOrto);
    }
    medir('sombra');
    renderer.setRenderTarget(null);
    renderer.clear(true, true, false);
    renderer.render(pasoFondo.escena, camOrto);
    medir('fondo');
    // de lejos a cerca
    const visibles = objetos.filter((o) => B[o.b].w > 0 && cajas[o.id]);
    visibles.sort((a, c) => cam.pos.distanceTo(new THREE.Vector3(B[c.b].x, B[c.b].y, B[c.b].z)) - cam.pos.distanceTo(new THREE.Vector3(B[a.b].x, B[a.b].y, B[a.b].z)));
    for (const o of visibles) {
      const rc = rectangulo(cajas[o.id]);
      if (!rc) continue;
      o.uRect.value.copy(rc);
      renderer.render(o.paso.escena, camOrto);
      medir(o.id);
    }
    sincronizar();
    ultimo = n;
  }
  addEventListener('resize', () => { ajustar(); if (ultimo !== null) render(ultimo); });

  // compila los programas antes de empezar (para que el primer fotograma no pague la compilación)
  renderer.compile(pasoSombra.escena, camOrto);
  renderer.compile(pasoFondo.escena, camOrto);
  for (const o of objetos) renderer.compile(o.paso.escena, camOrto);
  render(0);

  return {
    W, H, FPS, captura, renderer, U, proyectar, punto,
    fotograma: (t) => { nActual = Math.max(0, Math.floor(t * FPS + 1e-6)); return nActual; },
    limpiar, atomo: ponerAtomo, globo: ponerGlobo, tablero: ponerTablero, polvo: ponerPolvo, pieza: ponerPieza, render,
    // punto (mundo) del centro del hueco i del tablero, a una distancia d sobre su superficie
    casilla(tab, i, d = 0) { return this.enTablero(tab, (i - 2.5) * TAB.PASO, TAB.YW, d); },
    // punto (mundo) de coordenadas locales (x, y, z) del tablero
    enTablero(tab, x, y, z = 0) {
      const v = new THREE.Vector3(x, y, z).applyMatrix4(rotTab(tab)).multiplyScalar(tab.escala ?? 0.8);
      const pos = tab.pos ?? [0, 1.5, 0];
      return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
    },
    normalTablero(tab) {
      const v = new THREE.Vector3(0, 0, 1).applyMatrix4(rotTab(tab));
      return [v.x, v.y, v.z];
    },
    // giro euler (YXZ) que alinea una pieza con el tablero (su cara +z con la normal del tablero)
    rotTablero(tab) { return [-(tab.inclinacion ?? 0.6), tab.giro ?? 0, tab.roll ?? 0]; },
  };
}
