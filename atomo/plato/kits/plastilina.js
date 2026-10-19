// Kit de plastilina (stop-motion) para las escenas del vídeo largo.
//
//   import { crearPlato, PIEZA, ... } from '/atomo/plato/kits/plastilina.js';
//   const P = await crearPlato({ piezas: 6, globo: true, tablero: true, polvo: 8, camara: { pos, mira, fov } });
//   function dibujar(t) {
//     const n = P.fotograma(t), ts = n / 12;   // fotograma a 12 fps
//     P.limpiar();
//     P.atomo({ pos, escala, energia: E.energia(ts), ts });
//     P.tablero({ ... }); P.pieza(0, { tipo: PIEZA.LUNA, pos, escala }); ...
//     P.render(n);
//   }
//
// El plató es el del demo aprobado (estilos/10-arcilla-3d.html): ciclorama azul pizarra con
// estrellitas de arcilla, luz cálida de estudio, relleno frío y contraluz. Todo se modela con
// distancias con signo (uniones suaves = arcilla que se funde) y se ilumina con sombras suaves,
// oclusión, dispersión bajo la superficie, huellas dactilares y el «hervor» de cada fotograma.
//
// Para que cueste poco en un servidor sin GPU:
//   · el ciclorama (ruido, estrellitas, luz) se hornea una sola vez en dos texturas (luz directa
//     y luz ambiente); en cada fotograma solo se le añaden la sombra y la oclusión de la arcilla,
//     calculadas a un tercio de resolución (son suaves) y ampliadas con filtro bilineal;
//   · cada pieza tiene un volumen envolvente (esfera; caja orientada para el tablero): cada rayo
//     calcula cuáles cruza y solo evalúa esas piezas; lejos de una pieza se usa la distancia a su
//     volumen;
//   · las sombras y la oclusión usan versiones simplificadas de cada pieza (sin huellas, bultos ni
//     relieves pequeños); el detalle solo se calcula donde el rayo toca la arcilla.

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

export const PIEZA = { LUNA: 1, REMOLINO: 2, ESTRELLA: 3, PESA: 4, FICHA: 5, GLIFO: 6, BOCADILLO: 7 };
export const GLIFO = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '?': 10, '✓': 11, '✗': 12, '·': 13 };
export const COLOR = { TINTA: 0, MANTEQUILLA: 1, MOSTAZA: 2, CREMA: 3, TERRACOTA: 4, VERDE: 5 };
export const veredictoATipo = (v) => (v === '✓' ? 1 : v === '✗' ? 2 : 0);

// radio de la esfera envolvente de cada tipo de pieza (en sus unidades locales)
const RADIO_PIEZA = { 1: 0.62, 2: 0.48, 3: 0.62, 4: 0.66, 5: 0.56, 6: 0.66, 7: 1.32 };
// tablero (unidades locales): paso entre casillas, semiancho, semialto, semigrosor, fila de números, fila de huecos
export const TAB = { PASO: 1.0, HW: 3.3, HH: 1.1, GR: 0.3, YD: 0.57, YW: -0.29 };
const f3 = (v) => v.toFixed(4);

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
const vec3 C_BUTTER = vec3(0.760, 0.610, 0.350);
const vec3 C_SLATE  = vec3(0.030, 0.042, 0.090);
const vec3 C_STAR   = vec3(0.780, 0.700, 0.520);
const vec3 C_INK    = vec3(0.035, 0.045, 0.100);
const vec3 C_GREEN  = vec3(0.110, 0.300, 0.115);
const vec3 C_RED    = vec3(0.600, 0.105, 0.045);
const vec3 C_LIGHT  = vec3(0.780, 0.700, 0.540);
const vec3 C_SAND   = vec3(0.500, 0.420, 0.300);
const vec3 C_OCHRE  = vec3(0.600, 0.330, 0.045);
const vec3 C_OCEAN  = vec3(0.045, 0.150, 0.300);
const vec3 C_LAND   = vec3(0.190, 0.320, 0.105);
const vec3 C_GOLD   = vec3(0.720, 0.430, 0.050);
const vec3 C_WATER  = vec3(0.120, 0.370, 0.600);
const vec3 C_STEEL  = vec3(0.075, 0.080, 0.100);
const vec3 C_DUST   = vec3(0.560, 0.520, 0.460);

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

// ---------- la arcilla ----------
const GLSL_ARCILLA = /* glsl */`
out vec4 fragColor;
uniform float uFrame, uFlicker, uLump;
uniform vec3 uBoil;
uniform vec4 uB[NB];            // volúmenes envolventes: 0 átomo · 1 globo · 2 tablero · 3 polvo · 4.. piezas

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
float lumps(vec3 q) {
  return sin(q.x * 3.3 + uBoil.x) * sin(q.y * 2.9 + uBoil.y) * sin(q.z * 3.1 + uBoil.z)
       + 0.5 * sin(q.x * 6.1 - uBoil.y) * sin(q.y * 5.7 + uBoil.z) * sin(q.z * 6.3 + uBoil.x);
}
// churro de arcilla tumbado en el plano z = 0 (algo aplastado)
float churro(float d2, float z, float r) { return (length(vec2(d2, z * 1.25)) - r * 1.25) * 0.8; }

// distancia 2D al trazo central de un glifo (alto 1, centrado); dp: distancia a su bolita
float glifo(vec2 p, int g, out float dp) {
  dp = 1e5;
  float d = 1e5;
  if (g == 1) {
    d = min(sdSeg(p, vec2(0.06, -0.5), vec2(0.06, 0.5)), sdSeg(p, vec2(0.06, 0.5), vec2(-0.2, 0.27)));
    d = min(d, sdSeg(p, vec2(-0.17, -0.5), vec2(0.29, -0.5)));
  } else if (g == 2) {
    d = sdArco(p, vec2(0.0, 0.21), 0.27, vec2(0.5, 0.86603), vec2(-0.17365, 0.98481));
    d = min(d, sdSeg(p, vec2(0.207, 0.036), vec2(-0.27, -0.5)));
    d = min(d, sdSeg(p, vec2(-0.27, -0.5), vec2(0.3, -0.5)));
  } else if (g == 3) {
    d = sdArco(p, vec2(0.0, 0.235), 0.235, vec2(0.86603, 0.5), vec2(-0.5, 0.86603));
    d = min(d, sdArco(p, vec2(0.0, -0.245), 0.255, vec2(0.86603, -0.5), vec2(-0.5, 0.86603)));
  } else if (g == 4) {
    d = min(sdSeg(p, vec2(0.14, -0.5), vec2(0.14, 0.5)), sdSeg(p, vec2(0.14, 0.5), vec2(-0.3, -0.14)));
    d = min(d, sdSeg(p, vec2(-0.3, -0.14), vec2(0.31, -0.14)));
  } else if (g == 5) {
    d = min(sdSeg(p, vec2(0.27, 0.5), vec2(-0.18, 0.5)), sdSeg(p, vec2(-0.18, 0.5), vec2(-0.185, 0.045)));
    d = min(d, sdArco(p, vec2(0.0, -0.19), 0.29, vec2(0.99452, -0.10453), vec2(-0.69466, 0.71934)));
  } else if (g == 6) {
    d = abs(length(p - vec2(0.0, -0.21)) - 0.27);
    d = min(d, sdArco(p, vec2(0.45, -0.21), 0.72, vec2(-0.81915, 0.57358), vec2(0.81915, 0.57358)));
  } else if (g == 10) {
    d = sdArco(p, vec2(0.0, 0.24), 0.25, vec2(0.64279, 0.76604), vec2(-0.34202, 0.93969));
    d = min(d, sdSeg(p, vec2(0.125, 0.0235), vec2(0.0, -0.09)));
    d = min(d, sdSeg(p, vec2(0.0, -0.09), vec2(0.0, -0.17)));
    dp = length(p - vec2(0.0, -0.43));
  } else if (g == 11) {
    d = min(sdSeg(p, vec2(-0.33, 0.03), vec2(-0.1, -0.23)), sdSeg(p, vec2(-0.1, -0.23), vec2(0.35, 0.31)));
  } else if (g == 12) {
    d = min(sdSeg(p, vec2(-0.27, -0.27), vec2(0.27, 0.27)), sdSeg(p, vec2(-0.27, 0.27), vec2(0.27, -0.27)));
  } else if (g == 13) {
    dp = length(p);
  }
  return d;
}

// ficha de veredicto: losa de arcilla con el símbolo en churro claro encima (tipo 1 ✓ · 2 ✗)
float fichaD(vec3 q, float tipo, out float m) {
  float d = sdRoundBox(q, vec3(0.32, 0.32, 0.085), 0.075);
  float dp;
  float g2 = glifo(q.xy / 0.6, tipo < 1.5 ? 11 : 12, dp) * 0.6;
  float ds = churro(g2, q.z - 0.085, 0.058);
  m = ds < d ? 1.0 : 0.0;
  return smin(d, ds, 0.03);
}
float fichaC(vec3 q) { return sdRoundBox(q, vec3(0.32, 0.32, 0.12), 0.08); }

#ifdef ATOMO
uniform vec3 uCen, uSq;
uniform float uAEsc;
uniform mat3 uYaw;
uniform vec4 uNuc[8];
uniform float uKn, uKr;
uniform mat3 uRingM[3];
uniform vec2 uRing;
uniform vec4 uElec[3];
uniform vec3 uAPrint;
vec3 atomLocal(vec3 p) { return uYaw * ((p - uCen) / (uSq * uAEsc)); }
float atomSDF(vec3 p) {
  vec3 q = atomLocal(p);
  float d = 1e5;
  for (int i = 0; i < 8; i++) d = smin(d, length(q - uNuc[i].xyz) - uNuc[i].w, uKn);
  for (int i = 0; i < 3; i++) {
    vec3 r = uRingM[i] * q;
    float ang = atan(r.z, r.x);
    float dt = sdTorus(r, uRing * vec2(1.0, 1.0 + 0.09 * sin(ang * 5.0 + float(i) * 2.1 + uBoil.x) + 0.05 * sin(ang * 11.0 + uBoil.y)));
    float de = length(q - uElec[i].xyz) - uElec[i].w;
    dt = smin(dt, de, 0.05);
    d = smin(d, dt, uKr);
  }
  d -= uLump * lumps(q);
  return d * min(uSq.x, uSq.y) * uAEsc * 0.9;
}
float atomSDFc(vec3 p) {
  vec3 q = atomLocal(p);
  float d = length(q) - 0.6;
  for (int i = 0; i < 3; i++) {
    d = min(d, sdTorus(uRingM[i] * q, uRing));
    d = min(d, length(q - uElec[i].xyz) - uElec[i].w);
  }
  return d * min(uSq.x, uSq.y) * uAEsc * 0.9;
}
vec3 atomAlb(vec3 q) {
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
  }
  return col / max(ws, 1e-4);
}
#endif

#ifdef GLOBO
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
float globoSDF(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  float l = length(q);
  float d = l - R;
  if (d > 0.14 * R) return d - 0.09 * R;
  if (d > -0.1 * R) d -= R * 0.032 * tierra(q / max(l, 1e-4));
  d = smin(d, globoBanda(q, R), 0.03 * R);
  d -= uLump * R * lumps(q / R * 1.3);
  return d * 0.92;
}
float globoSDFc(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  return min(length(q) - R * 1.01, globoBanda(q, R));
}
#endif

#ifdef TABLERO
uniform vec4 uTC;        // centro, factor de distancia
uniform mat3 uTM;        // mundo → local (rotación y escala)
uniform vec4 uTBox;      // caja local envolvente: semiancho, semialto, z mínima, z máxima
uniform vec4 uCelda[6];  // tipo (0 · 1 ✓ · 2 ✗), elevación, aplastamiento, giro
uniform vec4 uCelda2[6]; // escala, desplazamiento x, desplazamiento y, —
uniform vec3 uTPrint;
// la ficha de la casilla (en coordenadas de la casilla); 1e5 si está vacía
float fichaCelda(vec3 c, int i, out float mf, out vec3 tq, bool detalle) {
  vec4 ce = uCelda[i];
  mf = 0.0; tq = c;
  if (ce.x < 0.5) return 1e5;
  vec4 c2 = uCelda2[i];
  vec3 sq = vec3(1.0 + 0.55 * ce.z, 1.0 + 0.55 * ce.z, 1.0 - ce.z) * c2.x;
  tq = c - vec3(c2.y, ${f3(TAB.YW)} + c2.z, -0.1 + 0.16 * sq.z + ce.y);
  float cs = cos(ce.w), sn = sin(ce.w);
  tq.xy = vec2(cs * tq.x + sn * tq.y, -sn * tq.x + cs * tq.y);
  tq /= sq;
  return (detalle ? fichaD(tq, ce.x, mf) : fichaC(tq)) * min(sq.x, sq.z);
}
// m: 0 cuerpo · 1 borde · 2 número · 3 ficha ✓ · 4 su símbolo · 5 ficha ✗ · 6 su símbolo
float tableroD(vec3 q, out float m, out vec3 lq) {
  m = 0.0; lq = q;
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f3(TAB.GR)}), vec3(${f3(TAB.HW)}, ${f3(TAB.HH)}, ${f3(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f3(TAB.PASO)} + 3.0), 0.0, 5.0);
  int i = int(fi);
  vec3 c = q - vec3((fi - 2.5) * ${f3(TAB.PASO)}, 0.0, 0.0);
  float mf; vec3 tq;
  float df = fichaCelda(c, i, mf, tq, true);
  if (d > 0.22) return min(d - 0.12, df);
  // churro ocre alrededor del borde
  float br = churro(abs(sdRoundRect(q.xy, vec2(${f3(TAB.HW - 0.17)}, ${f3(TAB.HH - 0.17)}), 0.28)), q.z - 0.005, 0.05);
  if (br < d) m = 1.0;
  d = smin(d, br, 0.035);
  // hueco de la casilla
  float hw = sdRoundBox(c - vec3(0.0, ${f3(TAB.YW)}, 0.0), vec3(0.375, 0.375, 0.1), 0.12);
  d = smax(d, -hw, 0.05);
  // número de la casilla en churro azul tinta
  float dp;
  float g2 = glifo((c.xy - vec2(0.0, ${f3(TAB.YD)})) / 0.4, i + 1, dp) * 0.4;
  float dg = churro(g2, c.z - 0.006, 0.04);
  if (dg < d) m = 2.0;
  d = smin(d, dg, 0.022);
  if (df < d) { m = 3.0 + mf + (uCelda[i].x > 1.5 ? 2.0 : 0.0); lq = tq + vec3(fi * 3.1, 0.0, 0.0); }
  return min(d, df);
}
float tableroSDF(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float m; vec3 lq;
  return tableroD(q, m, lq) * uTC.w;
}
float tableroSDFc(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f3(TAB.GR)}), vec3(${f3(TAB.HW)}, ${f3(TAB.HH)}, ${f3(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f3(TAB.PASO)} + 3.0), 0.0, 5.0);
  vec3 c = q - vec3((fi - 2.5) * ${f3(TAB.PASO)}, 0.0, 0.0);
  float mf; vec3 tq;
  d = max(d, -sdRoundBox(c - vec3(0.0, ${f3(TAB.YW)}, 0.0), vec3(0.375, 0.375, 0.1), 0.12));
  return min(d, fichaCelda(c, int(fi), mf, tq, false)) * uTC.w;
}
// el rayo cruza la caja orientada del tablero: tramo [ta, tb]
bool cajaTablero(vec3 ro, vec3 rd, out float ta, out float tb) {
  vec3 o = uTM * (ro - uTC.xyz), d = uTM * rd;
  vec3 inv = 1.0 / d;
  vec3 lo = vec3(-uTBox.x, -uTBox.y, uTBox.z), hi = vec3(uTBox.x, uTBox.y, uTBox.w);
  vec3 t0 = (lo - o) * inv, t1 = (hi - o) * inv;
  vec3 mn = min(t0, t1), mx = max(t0, t1);
  ta = max(max(mn.x, mn.y), mn.z); tb = min(min(mx.x, mx.y), mx.z);
  return tb > max(ta, 0.0);
}
#endif

#if NPOLVO > 0
uniform vec4 uPolvo[NPOLVO];
float polvoSDF(vec3 p) {
  float d = 1e5;
  for (int i = 0; i < NPOLVO; i++) {
    vec4 s = uPolvo[i];
    if (s.w > 0.001) d = smin(d, length(p - s.xyz) - s.w, 0.03);
  }
  return d;
}
#endif

#if NP > 0
uniform vec4 uPC[NP];    // centro, factor de distancia (escala mínima)
uniform mat3 uPM[NP];    // mundo → local (incluye escala)
uniform vec4 uPT[NP];    // tipo, variante, p1, p2
uniform vec4 uPS[NP];    // huella xyz, —
float lunaD(vec3 q) {
  // creciente con cráteres (la Luna del demo)
  q.x += 0.15;
  q.z /= 0.6;
  float d = length(q) - 0.5;
  float dc = length(q.xy - vec2(-0.21, 0.0)) - 0.46;
  d = smax(d, -dc, 0.1);
  d = smax(d, -(length(q - vec3(0.36, 0.06, 0.38)) - 0.06), 0.025);
  d = smax(d, -(length(q - vec3(0.22, -0.3, 0.36)) - 0.045), 0.02);
  return d * 0.6;
}
float remolinoD(vec3 q) {
  // espiral de agua: semicírculos que crecen, con cola
  vec2 p = q.xy;
  float d = sdArco(p, vec2(0.0), 0.08, vec2(0.0, 1.0), vec2(0.0, 1.0));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.125, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.17, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.215, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.26, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.305, vec2(0.0, -1.0), vec2(0.62161, 0.78333)));
  float r = 0.042 + 0.03 * clamp(length(p) / 0.32, 0.0, 1.0);
  return churro(d, q.z, r);
}
float estrellaD(vec3 q) {
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.1;
  vec2 w = vec2(d2, abs(q.z) - 0.04);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.1;
}
float pesaD(vec3 q, out float m) {
  float body = length((q - vec3(0.0, -0.13, 0.0)) * vec3(1.0, 1.08, 1.0)) - 0.37;
  body = smax(body, -(q.y + 0.43), 0.06);
  vec3 h = q - vec3(0.0, 0.2, 0.0);
  float ha = length(vec2(length(h.xy) - 0.21, h.z)) - 0.065;
  ha = max(ha, -(h.y + 0.02));
  m = ha < body ? 1.0 : 0.0;
  return smin(body * 0.95, ha, 0.07);
}
float glifoD(vec3 q, int g, out float m) {
  float dp;
  float d2 = glifo(q.xy, g, dp);
  float d = churro(d2, q.z, 0.085);
  float db = length(vec2(dp, q.z * 1.1)) - 0.11;
  m = 0.0;
  return min(d, db * 0.9);
}
float bocadilloD(vec3 q, float puntos, out float m) {
  vec3 k = vec3(0.95, 0.66, 0.3);
  float k0 = length(q / k), k1 = length(q / (k * k));
  float d = k0 * (k0 - 1.0) / k1;
  float tail = sdCapsule(q, vec3(-0.42, -0.38, 0.0), vec3(-0.86, -0.8, 0.0), 0.09);
  d = smin(d, tail, 0.22);
  m = 0.0;
  float dd = 1e5;
  for (int i = 0; i < 3; i++) {
    float s = clamp(puntos - float(i), 0.0, 1.0);
    if (s > 0.01) {
      float x = (float(i) - 1.0) * 0.32;
      dd = min(dd, length(q - vec3(x, 0.0, 0.27 - 0.03 * abs(float(i) - 1.0))) - 0.085 * s);
    }
  }
  if (dd < d) m = 1.0;
  return smin(d, dd, 0.02);
}
float piezaD(vec3 q, vec4 T, out float m) {
  int tipo = int(T.x + 0.5);
  m = 0.0;
  if (tipo == 1) return lunaD(q);
  if (tipo == 2) return remolinoD(q);
  if (tipo == 3) return estrellaD(q);
  if (tipo == 4) return pesaD(q, m);
  if (tipo == 5) return fichaD(q, T.y, m);
  if (tipo == 6) return glifoD(q, int(T.y + 0.5), m);
  if (tipo == 7) return bocadilloD(q, T.z, m);
  return 1e5;
}
float piezaSDF(vec3 p, int i) {
  float m;
  vec3 q = uPM[i] * (p - uPC[i].xyz);
  return (piezaD(q, uPT[i], m) - uLump * 0.6 * lumps(q * 1.4)) * uPC[i].w;
}
float piezaSDFc(vec3 p, int i) {
  float m;
  vec4 T = uPT[i];
  vec3 q = uPM[i] * (p - uPC[i].xyz);
  if (int(T.x + 0.5) == 5) return fichaC(q) * uPC[i].w;
  return piezaD(q, T, m) * uPC[i].w;
}
#endif

float acotar(vec3 p, int i) { return length(p - uB[i].xyz) - uB[i].w; }

// distancia a la arcilla de la máscara, con detalle (rayo de cámara y normal)
float mapObj(vec3 p, int msk) {
  float d = 1e5;
#ifdef ATOMO
  if ((msk & 1) != 0) { float b = acotar(p, 0); d = min(d, b > 0.25 ? b : atomSDF(p)); }
#endif
#ifdef GLOBO
  if ((msk & 2) != 0) { float b = acotar(p, 1); d = min(d, b > 0.25 ? b : globoSDF(p)); }
#endif
#ifdef TABLERO
  if ((msk & 4) != 0) d = min(d, tableroSDF(p));
#endif
#if NPOLVO > 0
  if ((msk & 8) != 0) { float b = acotar(p, 3); d = min(d, b > 0.25 ? b : polvoSDF(p)); }
#endif
#if NP > 0
  for (int i = 0; i < NP; i++) {
    if ((msk & (16 << i)) != 0) { float b = acotar(p, 4 + i); d = min(d, b > 0.25 ? b : piezaSDF(p, i)); }
  }
#endif
  return d;
}
// versión simplificada (sombras y oclusión)
float mapC(vec3 p, int msk) {
  float d = 1e5;
#ifdef ATOMO
  if ((msk & 1) != 0) { float b = acotar(p, 0); d = min(d, b > 0.25 ? b : atomSDFc(p)); }
#endif
#ifdef GLOBO
  if ((msk & 2) != 0) { float b = acotar(p, 1); d = min(d, b > 0.25 ? b : globoSDFc(p)); }
#endif
#ifdef TABLERO
  if ((msk & 4) != 0) { float b = acotar(p, 2); d = min(d, b > 0.25 ? b : tableroSDFc(p)); }
#endif
#if NPOLVO > 0
  if ((msk & 8) != 0) { float b = acotar(p, 3); d = min(d, b > 0.25 ? b : polvoSDF(p)); }
#endif
#if NP > 0
  for (int i = 0; i < NP; i++) {
    if ((msk & (16 << i)) != 0) { float b = acotar(p, 4 + i); d = min(d, b > 0.25 ? b : piezaSDFc(p, i)); }
  }
#endif
  return d;
}

// qué volúmenes envolventes cruza un rayo (máscara) y el tramo [t0, t1] que ocupan
int mascara(vec3 ro, vec3 rd, out float t0, out float t1) {
  int m = 0; t0 = 1e5; t1 = -1.0;
  for (int i = 0; i < NB; i++) {
    vec4 b = uB[i];
    if (b.w <= 0.0) continue;
    float ta, tb;
#ifdef TABLERO
    if (i == 2) {
      if (!cajaTablero(ro, rd, ta, tb)) continue;
    } else
#endif
    {
      vec3 oc = ro - b.xyz;
      float bb = dot(oc, rd), c = dot(oc, oc) - b.w * b.w;
      float h = bb * bb - c;
      if (h < 0.0) continue;
      h = sqrt(h);
      ta = -bb - h; tb = -bb + h;
      if (tb < 0.0) continue;
    }
    m |= (1 << i);
    t0 = min(t0, max(ta, 0.0)); t1 = max(t1, tb);
  }
  return m;
}
// qué piezas hay cerca de un punto
int cercanas(vec3 p, float pad) {
  int m = 0;
  for (int i = 0; i < NB; i++) {
    vec4 b = uB[i];
    if (b.w > 0.0 && length(p - b.xyz) < b.w + pad) m |= (1 << i);
  }
  return m;
}

float softShadow(vec3 p, vec3 L, float maxT, float k) {
  float t0, t1;
  int msk = mascara(p, L, t0, t1);
  if (msk == 0) return 1.0;
  float t = max(t0, 0.04), res = 1.0, end = min(t1, maxT);
  for (int i = 0; i < SOMBRA_PASOS; i++) {
    if (t > end) break;
    float h = mapC(p + L * t, msk);
    res = min(res, k * h / t);
    t += clamp(h, 0.02, 0.45);
    if (res < 0.002) break;
  }
  res = clamp(res, 0.0, 1.0);
  return res * res * (3.0 - 2.0 * res);
}

float aoBg(vec3 p, vec3 n) {
  int msk = cercanas(p, 2.2);
  if (msk == 0) return 1.0;
  float o = 0.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.35 * float(i) * float(i) * 0.5 + 0.1;
    float d = mapC(p + n * h, msk);
    o += clamp((h - d) / h, 0.0, 1.0) * (1.0 / float(i));
  }
  return clamp(1.0 - 0.42 * o, 0.0, 1.0);
}

#ifdef PASO_SOMBRA
// ---------- sombra y oclusión de la arcilla sobre el ciclorama (a resolución reducida) ----------
uniform float uSombraEsc;
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy * uSombraEsc);
  vec3 nb; float arc;
  float tb = bgHit(ro, rd, nb, arc);
  vec3 p = ro + rd * tb;
  vec3 L = normalize(LPOS - p);
  float sh = softShadow(p + nb * 0.01, L, length(LPOS - p), 16.0);
  float ao = aoBg(p, nb);
  fragColor = vec4(sh, ao, 0.0, 1.0);
}
#else
uniform sampler2D uBgD, uBgA, uSombra;

vec3 normalObj(vec3 p, int msk) {
  const vec2 k = vec2(1.0, -1.0); float e = 0.0012;
  return normalize(k.xyy * mapObj(p + k.xyy * e, msk) + k.yyx * mapObj(p + k.yyx * e, msk) + k.yxy * mapObj(p + k.yxy * e, msk) + k.xxx * mapObj(p + k.xxx * e, msk));
}
float aoObj(vec3 p, vec3 n, int msk) {
  float o = 0.0, s = 1.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.02 + 0.11 * float(i);
    float d = min(mapC(p + n * h, msk), bgSDF(p + n * h));
    o += (h - d) * s; s *= 0.7;
  }
  return clamp(1.0 - 2.0 * o, 0.0, 1.0);
}

// huellas dactilares: remolinos de surcos en parches
vec4 fingerprint(vec3 x, float sc, float seed, float pixW) {
  vec3 y = x * sc + seed;
  vec3 c = floor(y);
  if (hash13(c + 5.3) < 0.3) return vec4(0.0);
  vec3 h = vec3(hash13(c), hash13(c + 17.1), hash13(c + 31.7));
  vec3 ctr = c + 0.32 + 0.36 * h;
  vec3 v = y - ctr;
  v.y *= 1.0 + 0.5 * h.x;
  float r = length(v);
  float m = 1.0 - smoothstep(0.1, 0.3, r);
  if (m <= 0.0) return vec4(0.0);
  float spacing = 0.042;
  float fade = 1.0 - smoothstep(0.35, 0.75, pixW * sc / spacing);
  float ph = r * 6.2832 / spacing + 2.5 * vnoise(y * 5.0);
  return vec4(m * fade * cos(ph) * (v / (r + 1e-4)) * 0.22, m * fade * (0.5 - 0.5 * sin(ph)));
}

vec3 colorGlifo(float c) {
  if (c < 0.5) return C_INK;
  if (c < 1.5) return C_BUTTER;
  if (c < 2.5) return C_MUST;
  if (c < 3.5) return C_LIGHT;
  if (c < 4.5) return C_TERRA;
  return C_GREEN;
}

// color de la arcilla en p: albedo, coordenadas locales (texturas), semilla, detalle, escala local
void materialAt(vec3 p, int msk, out vec3 alb, out vec3 lp, out float bs, out float det, out float esc) {
  det = 1.0; alb = C_CREAM; lp = p; bs = 0.0; esc = 1.0;
  float best = 1e5;
#ifdef ATOMO
  if ((msk & 1) != 0) {
    float d = atomSDF(p);
    if (d < best) {
      best = d;
      vec3 q = atomLocal(p);
      alb = atomAlb(q); lp = q + uAPrint; bs = 1.0; esc = uAEsc;
    }
  }
#endif
#ifdef GLOBO
  if ((msk & 2) != 0) {
    float d = globoSDF(p);
    if (d < best) {
      best = d;
      vec3 q = uGM * (p - uGC.xyz);
      float R = uGC.w;
      vec3 dir = normalize(q);
      float land = tierra(dir);
      vec3 oc = C_OCEAN * (0.88 + 0.24 * vnoise(q / R * 4.0));
      vec3 lc = C_LAND * (0.85 + 0.3 * vnoise(q / R * 6.0 + 3.0));
      alb = mix(oc, lc, smoothstep(0.3, 0.7, land));
      float band = globoBanda(q, R);
      alb = mix(alb, C_GOLD * (0.92 + 0.16 * vnoise(q / R * 9.0)), 1.0 - smoothstep(-0.004 * R, 0.012 * R, band - (length(q) - R - R * 0.032 * land)));
      lp = q / R * 1.6 + uGPrint; bs = 2.0; esc = R * 0.6;
    }
  }
#endif
#ifdef TABLERO
  if ((msk & 4) != 0) {
    vec3 q = uTM * (p - uTC.xyz);
    float m; vec3 lq;
    float d = tableroD(q, m, lq) * uTC.w;
    if (d < best) {
      best = d;
      if (m < 0.5) alb = C_SAND * (0.94 + 0.12 * vnoise(q * 1.7));
      else if (m < 1.5) alb = C_OCHRE;
      else if (m < 2.5) alb = C_INK;
      else if (m < 3.5) alb = C_GREEN * (0.92 + 0.16 * vnoise(lq * 3.0));
      else if (m < 4.5) alb = C_LIGHT;
      else if (m < 5.5) alb = C_RED * (0.92 + 0.16 * vnoise(lq * 3.0));
      else alb = C_LIGHT;
      lp = lq * 0.75 + uTPrint; bs = 3.0; esc = uTC.w / 0.75;
      if (m > 1.5 && m < 2.5) det = 0.6;
    }
  }
#endif
#if NPOLVO > 0
  if ((msk & 8) != 0) {
    float d = polvoSDF(p);
    if (d < best) { best = d; alb = C_DUST; lp = p * 3.0; bs = 4.0; det = 0.4; esc = 0.33; }
  }
#endif
#if NP > 0
  for (int i = 0; i < NP; i++) {
    if ((msk & (16 << i)) == 0) continue;
    vec3 q = uPM[i] * (p - uPC[i].xyz);
    float m;
    vec4 T = uPT[i];
    float d = piezaD(q, T, m) * uPC[i].w;
    if (d < best) {
      best = d;
      int tipo = int(T.x + 0.5);
      vec3 c = C_CREAM;
      if (tipo == 1) c = C_BUTTER * (0.95 + 0.1 * vnoise(q * 5.0)) + vec3(0.03, 0.01, -0.01) * vnoise(q * 18.0);
      else if (tipo == 2) c = C_WATER * (0.9 + 0.2 * vnoise(q * 6.0));
      else if (tipo == 3) c = mix(C_GOLD, C_BUTTER, 0.4) * (0.94 + 0.12 * vnoise(q * 5.0));
      else if (tipo == 4) c = m > 0.5 ? C_STEEL * 1.3 : C_STEEL;
      else if (tipo == 5) c = m > 0.5 ? C_LIGHT : (T.y < 1.5 ? C_GREEN : C_RED) * (0.92 + 0.16 * vnoise(q * 3.0));
      else if (tipo == 6) c = colorGlifo(T.z);
      else if (tipo == 7) c = m > 0.5 ? C_INK : C_LIGHT * (0.95 + 0.08 * vnoise(q * 3.0));
      alb = c; lp = q * 0.8 + uPS[i].xyz; bs = 5.0 + float(i); esc = uPC[i].w / 0.8;
    }
  }
#endif
}

vec3 shadeObj(vec3 p, vec3 rd, float tObj, float key, int msk) {
  vec3 n = normalObj(p, msk);
  vec3 alb, lp; float bs, det, esc;
  materialAt(p, msk, alb, lp, bs, det, esc);
  float pixW = uPix * tObj / max(esc, 0.05);
  vec4 nd = vnoised(lp * 2.6 + bs * 11.0);
  vec3 g = nd.yzw * 0.13;
  vec4 nm = vnoised(lp * 7.5 + bs * 5.0);
  g += nm.yzw * 0.07;
  vec4 f1 = fingerprint(lp, 1.05, bs * 3.7, pixW);
  vec4 f2 = fingerprint(lp + 0.31, 1.6, bs * 9.1 + 4.0, pixW);
  g += f1.xyz * 1.7 + f2.xyz * 1.1;
  vec4 gr = vnoised(lp * 40.0 + bs);
  g += gr.yzw * 0.018 * (1.0 - smoothstep(0.012, 0.03, pixW));
  g *= det;
  n = normalize(n - (g - n * dot(g, n)));
  alb *= 1.0 - (0.15 * f1.w + 0.10 * f2.w) * det - 0.05 * smoothstep(0.55, 0.85, gr.x);

  vec3 L = normalize(LPOS - p);
  float sh = softShadow(p + n * 0.025, L, 30.0, 9.0);
  int near = cercanas(p, 0.6);
  float ao = aoObj(p, n, near);
  float ndl = dot(n, L);
  float wrapD = max((ndl + 0.28) / 1.28, 0.0);
  vec3 sss = pow(alb, vec3(1.55)) * 1.4 * smoothstep(-0.35, 0.15, ndl) * (1.0 - smoothstep(0.15, 0.6, ndl));
  vec3 V = -rd, Hh = normalize(L + V);
  float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);
  float spec = (pow(max(dot(n, Hh), 0.0), 22.0) * 0.10 + pow(max(dot(n, Hh), 0.0), 90.0) * 0.12) * (0.8 + 0.6 * fres);
  float spot = spotCone(p);
  vec3 col = (alb * wrapD + sss * 0.5) * LCOL * key * sh * spot;
  col += spec * LCOL * key * sh * spot * smoothstep(-0.1, 0.3, ndl);
  col += alb * vec3(0.38, 0.44, 0.62) * pow(max(dot(n, normalize(FILL_DIR)) * 0.5 + 0.5, 0.0), 1.5) * 0.5 * ao;
  float up = n.y * 0.5 + 0.5;
  col += alb * mix(vec3(0.07, 0.05, 0.06), vec3(0.12, 0.15, 0.26), up) * 0.6 * ao;
  float rim = pow(1.0 - max(dot(n, V), 0.0), 2.6) * max(dot(n, normalize(RIM_DIR)) + 0.35, 0.0);
  col += RIM_COL * alb * rim * 1.2 * ao;
  col *= mix(0.55, 1.0, ao);
  return col;
}

void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy);
  vec3 nb; float arc;
  float tb = bgHit(ro, rd, nb, arc);

  float tObj = 1e5, bestR = 1e5, bestT = 0.0;
  float t0, t1;
  int msk = mascara(ro, rd, t0, t1);
  if (msk != 0) {
    float t = t0;
    float fin = min(t1, tb);
    for (int i = 0; i < RAYO_PASOS; i++) {
      vec3 p = ro + rd * t;
      float d = mapObj(p, msk);
      if (d < 0.00022 * t) { tObj = t; break; }
      float r = d / (uPix * t);
      if (r < bestR) { bestR = r; bestT = t; }
      t += d * 0.92;
      if (t > fin) break;
    }
  }

  vec3 col;
  float key = 2.6 * uFlicker;
  if (tObj < tb) {
    col = shadeObj(ro + rd * tObj, rd, tObj, key, msk);
  } else {
    ivec2 px = ivec2(gl_FragCoord.xy);
    vec3 D = texelFetch(uBgD, px, 0).rgb; D = D * D * 4.0;
    vec3 A = texelFetch(uBgA, px, 0).rgb; A = A * A * 0.5;
    vec2 sa = texture(uSombra, gl_FragCoord.xy / uRes).rg;
    col = (D * key * mix(0.16, 1.0, sa.x) + A * sa.y) * mix(0.6, 1.0, sa.y);
    if (bestR < 0.75 && bestT < tb) {
      float cov = 1.0 - smoothstep(0.0, 0.75, bestR);
      col = mix(col, shadeObj(ro + rd * bestT, rd, bestT, key, msk), cov);
    }
  }

  col *= 1.05;
  col = aces(col);
  col = pow(col, vec3(1.0 / 2.2));
  vec2 q = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - 0.38 * pow(length(q * vec2(1.0, 1.15)) * 1.35, 2.6);
  col += (hash12(gl_FragCoord.xy + uFrame * 17.13) - 0.5) * 0.028;
  fragColor = vec4(col, 1.0);
}
#endif
`;

const VERT = /* glsl */`
in vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
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
  piezas = 0, atomo = true, globo = false, tablero = false, polvo = 0,
  camara = {}, semilla = 20261019, pasosRayo = 100, pasosSombra = 36, sombraEsc = 3,
} = {}) {
  const busqueda = new URLSearchParams(location.search);
  const captura = busqueda.has('captura');

  // lienzo 16:9 con bandas si la ventana tiene otra proporción
  const estilo = document.createElement('style');
  estilo.textContent = `html,body{margin:0;height:100%;background:#0c0f1d;overflow:hidden}
#escena{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#151a30;overflow:hidden}
#escena canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}`;
  document.head.appendChild(estilo);
  const cont = document.createElement('div'); cont.id = 'escena';
  const lienzo = document.createElement('canvas');
  cont.appendChild(lienzo); document.body.appendChild(cont);

  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: false, preserveDrawingBuffer: true, alpha: false });
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
  const proyectar = ([x, y, z]) => {
    const v = new THREE.Vector3(x, y, z).sub(cam.pos);
    const zc = v.dot(f);
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
  const NB = 4 + piezas;
  const defines = { NB, NP: piezas, NPOLVO: polvo, NSTARS, NCAPS: caps.length, RAYO_PASOS: pasosRayo, SOMBRA_PASOS: pasosSombra };
  if (atomo) defines.ATOMO = 1;
  if (globo) defines.GLOBO = 1;
  if (tablero) defines.TABLERO = 1;
  // depuración: ?dbg=NOMBRE,OTRO añade esos #define
  for (const k of (busqueda.get('dbg') ?? '').split(',').filter(Boolean)) defines[k] = 1;

  const comunes = {
    uRes: { value: new THREE.Vector2(W, H) },
    uCamPos: { value: cam.pos.clone() }, uCamRot: { value: camRot },
    uTanY: { value: cam.tanY }, uAsp: { value: ASP }, uPix: { value: 2 * cam.tanY / H },
  };
  const tipoRT = renderer.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType;
  const rtOpts = { type: tipoRT, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: false, stencilBuffer: false };
  const rtD = new THREE.WebGLRenderTarget(W, H, rtOpts), rtA = new THREE.WebGLRenderTarget(W, H, rtOpts);
  const rtS = new THREE.WebGLRenderTarget(Math.ceil(W / sombraEsc), Math.ceil(H / sombraEsc), {
    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false,
  });

  const hornoU = { ...comunes, uStars: { value: ESTR.map((s) => new THREE.Vector4(...s)) }, uSalida: { value: 0 } };
  const matHorno = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3, defines: { NSTARS }, uniforms: hornoU, vertexShader: VERT,
    fragmentShader: GLSL_COMUN + GLSL_HORNO, depthTest: false, depthWrite: false,
  });
  const v4 = (n) => Array.from({ length: n }, () => new THREE.Vector4());
  const m3 = (n) => Array.from({ length: n }, () => new THREE.Matrix3());
  const U = {
    ...comunes,
    uFrame: { value: 0 }, uFlicker: { value: 1 }, uLump: { value: 0.008 }, uBoil: { value: new THREE.Vector3() },
    uB: { value: v4(NB) }, uBgD: { value: rtD.texture }, uBgA: { value: rtA.texture }, uSombra: { value: rtS.texture },
    uSombraEsc: { value: sombraEsc },
    uCen: { value: new THREE.Vector3() }, uSq: { value: new THREE.Vector3(1, 1, 1) }, uAEsc: { value: 1 },
    uYaw: { value: new THREE.Matrix3() }, uNuc: { value: v4(8) }, uKn: { value: 0.05 }, uKr: { value: 0.02 },
    uRingM: { value: m3(3) }, uRing: { value: new THREE.Vector2(1.68, 0.092) }, uElec: { value: v4(3) }, uAPrint: { value: new THREE.Vector3() },
    uGC: { value: new THREE.Vector4() }, uGM: { value: new THREE.Matrix3() }, uCaps: { value: caps }, uGPrint: { value: new THREE.Vector3() },
    uTC: { value: new THREE.Vector4() }, uTM: { value: new THREE.Matrix3() }, uTBox: { value: new THREE.Vector4() },
    uCelda: { value: v4(6) }, uCelda2: { value: v4(6) }, uTPrint: { value: new THREE.Vector3() },
    uPolvo: { value: v4(Math.max(polvo, 1)) },
    uPC: { value: v4(Math.max(piezas, 1)) }, uPM: { value: m3(Math.max(piezas, 1)) }, uPT: { value: v4(Math.max(piezas, 1)) }, uPS: { value: v4(Math.max(piezas, 1)) },
  };
  const material = (extra) => new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3, defines: { ...defines, ...extra }, uniforms: U, vertexShader: VERT,
    fragmentShader: GLSL_COMUN + GLSL_ARCILLA, depthTest: false, depthWrite: false,
  });
  const matArcilla = material({}), matSombra = material({ PASO_SOMBRA: 1 });
  const quad = new THREE.PlaneGeometry(2, 2);
  const escena = (m) => { const s = new THREE.Scene(); const me = new THREE.Mesh(quad, m); me.frustumCulled = false; s.add(me); return s; };
  const escHorno = escena(matHorno), escArcilla = escena(matArcilla), escSombra = escena(matSombra);
  const camOrto = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const px = new Uint8Array(4);
  const sincronizar = () => gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);

  function hornear() {
    for (const [rt, s] of [[rtD, 0], [rtA, 1]]) {
      hornoU.uSalida.value = s;
      renderer.setRenderTarget(rt);
      renderer.render(escHorno, camOrto);
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
    rtD.setSize(bsz.x, bsz.y); rtA.setSize(bsz.x, bsz.y);
    rtS.setSize(Math.ceil(bsz.x / sombraEsc), Math.ceil(bsz.y / sombraEsc));
    hornear();
  }
  ajustar();

  // ---------- estado de cada fotograma ----------
  const B = U.uB.value;
  function limpiar() {
    for (const v of B) v.set(0, 0, 0, 0);
    for (let i = 0; i < piezas; i++) U.uPT.value[i].set(0, 0, 0, 0);
    for (const v of U.uPolvo.value) v.set(0, 0, 0, 0);
  }
  limpiar();
  let nActual = 0;
  const huella = (on, k) => (on ? [(azar(nActual, k) - 0.5) * 0.3, (azar(nActual, k + 1) - 0.5) * 0.3, (azar(nActual, k + 2) - 0.5) * 0.3] : [0, 0, 0]);

  // El átomo narrador: núcleo de bolitas, tres órbitas de churro inclinadas y tres electrones.
  //   pos, escala, yaw/pitch/roll (giro del cuerpo), sq [x,y,z] (aplastar en ejes del mundo),
  //   energia (0..1: late al hablar), ts (segundos: avanzan los electrones), electrones: [[x,y,z]|null]
  //   (posición local opcional de cada electrón, para sacarlo de su órbita), toque (huellas nuevas).
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
    let ext = Rr + tube + 0.22;
    ORB.forEach((M, i) => {
      U.uRingM.value[i].setFromMatrix4(M.clone().transpose());
      const th = 2 * Math.PI * VEL[i] * ts / 10 + FASE[i];
      let v = new THREE.Vector3(Rr * Math.cos(th), 0, Rr * Math.sin(th)).applyMatrix4(M);
      if (electrones[i]) v = new THREE.Vector3(...electrones[i]);
      U.uElec.value[i].set(v.x, v.y, v.z, 0.19);
      ext = Math.max(ext, v.length() + 0.24);
    });
    U.uAPrint.value.set(...huella(toque, 40));
    B[0].set(pos[0], pos[1], pos[2], ext * escala * Math.max(...sq) * 1.06 + 0.06);
  }

  // El globo de plastilina: océano, continentes pegados y el ecuador como tira dorada.
  function ponerGlobo({ pos = [0, 2, 0], radio = 1.4, inclinacion = 0.41, giro = 0, toque = false } = {}) {
    if (!globo) return;
    const R = new THREE.Matrix4().makeRotationZ(-inclinacion).multiply(new THREE.Matrix4().makeRotationY(giro));
    U.uGM.value.setFromMatrix4(R.clone().transpose());
    U.uGC.value.set(pos[0], pos[1], pos[2], radio);
    U.uGPrint.value.set(...huella(toque, 50));
    B[1].set(pos[0], pos[1], pos[2], radio * 1.16 + 0.05);
  }

  // El marcador: losa de arena con borde de churro ocre, seis números (1–6) y seis huecos.
  //   celdas[i] = { tipo: 0|1|2|'✓'|'✗', alto (elevación sobre el hueco), aplastar (+ aplasta,
  //   − estira), giro, escala, dx, dy }. inclinacion: hacia atrás (radianes); sq: aplastar el tablero.
  function ponerTablero({ pos = [0, 1.5, 0], escala = 0.8, inclinacion = 0.6, giro = 0, roll = 0, celdas = [], toque = false, sq = [1, 1, 1] } = {}) {
    if (!tablero) return;
    const M = rotTab({ inclinacion, giro, roll }).transpose();
    M.premultiply(new THREE.Matrix4().makeScale(1 / (sq[0] * escala), 1 / (sq[1] * escala), 1 / (sq[2] * escala)));
    U.uTM.value.setFromMatrix4(M);
    U.uTC.value.set(pos[0], pos[1], pos[2], escala * Math.min(...sq));
    let alto = 0, dy = 0;
    for (let i = 0; i < 6; i++) {
      const c = celdas[i] ?? {};
      const tipo = typeof c.tipo === 'string' ? veredictoATipo(c.tipo) : (c.tipo ?? 0);
      U.uCelda.value[i].set((c.escala ?? 1) > 0.01 ? tipo : 0, c.alto ?? 0, c.aplastar ?? 0, c.giro ?? 0);
      U.uCelda2.value[i].set(c.escala ?? 1, c.dx ?? 0, c.dy ?? 0, 0);
      if (tipo) { alto = Math.max(alto, (c.alto ?? 0) * (1 + Math.abs(c.aplastar ?? 0))); dy = Math.max(dy, Math.abs(c.dy ?? 0)); }
    }
    U.uTBox.value.set(TAB.HW + 0.08, TAB.HH + 0.08 + dy, -2 * TAB.GR - 0.08, 0.3 + alto);
    U.uTPrint.value.set(...huella(toque, 60));
    B[2].set(pos[0], pos[1], pos[2], escala * Math.max(...sq) * Math.hypot(TAB.HW + 0.15, TAB.HH + 0.15 + dy, 0.7 + alto) + 0.05);
  }

  // Polvo del golpe: bolitas [x, y, z, radio].
  function ponerPolvo(lista = []) {
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
    B[3].set(c.x, c.y, c.z, s.length() / 2 + rmax + 0.05);
  }

  // Piezas sueltas: iconos, fichas ✓/✗, glifos (números, ?, ·) y el bocadillo.
  //   { tipo: PIEZA.*, pos, escala, sq [x,y,z] (en ejes de la pieza), rot [x,y,z] (euler YXZ),
  //     variante (ficha: 1|2|'✓'|'✗'; glifo: GLIFO[c] o el carácter), color (glifo: COLOR.*),
  //     puntos (bocadillo: 0..3), toque }
  function ponerPieza(i, { tipo, pos = [0, 0, 0], escala = 1, sq = [1, 1, 1], rot = [0, 0, 0], variante = 0, color = 0, puntos = 0, toque = false } = {}) {
    if (i >= piezas) throw new Error(`pieza ${i}: el plató solo tiene ${piezas}`);
    if (!tipo || escala <= 0.005) { U.uPT.value[i].set(0, 0, 0, 0); B[4 + i].set(0, 0, 0, 0); return; }
    const R = rotXYZ(...rot);
    const S = sq.map((v) => v * escala);
    const M = R.clone().transpose().premultiply(new THREE.Matrix4().makeScale(1 / S[0], 1 / S[1], 1 / S[2]));
    U.uPM.value[i].setFromMatrix4(M);
    U.uPC.value[i].set(pos[0], pos[1], pos[2], Math.min(...S));
    const v = typeof variante !== 'string' ? variante : tipo === PIEZA.FICHA ? veredictoATipo(variante) : (GLIFO[variante] ?? 0);
    U.uPT.value[i].set(tipo, v, tipo === PIEZA.BOCADILLO ? puntos : color, 0);
    U.uPS.value[i].set(...huella(toque, 70 + i * 3), 0);
    B[4 + i].set(pos[0], pos[1], pos[2], RADIO_PIEZA[tipo] * Math.max(...S) + 0.05);
  }

  let ultimo = null;
  function render(n) {
    U.uFrame.value = n;
    U.uFlicker.value = 1 + (azar(n, 3) - 0.5) * 0.03;
    U.uBoil.value.set(1.3 + (azar(n, 4) - 0.5) * 0.5, 0.7 + (azar(n, 5) - 0.5) * 0.5, 2.1 + (azar(n, 6) - 0.5) * 0.5);
    renderer.setRenderTarget(rtS);
    renderer.render(escSombra, camOrto);
    renderer.setRenderTarget(null);
    renderer.render(escArcilla, camOrto);
    sincronizar();
    ultimo = n;
  }
  addEventListener('resize', () => { ajustar(); if (ultimo !== null) render(ultimo); });

  // compila los programas antes de empezar (para que el primer fotograma no pague la compilación)
  render(0);

  return {
    W, H, FPS, captura, renderer, U, proyectar, punto,
    fotograma: (t) => { nActual = Math.max(0, Math.floor(t * FPS + 1e-6)); return nActual; },
    limpiar, atomo: ponerAtomo, globo: ponerGlobo, tablero: ponerTablero, polvo: ponerPolvo, pieza: ponerPieza, render,
    // punto (mundo) del centro del hueco i del tablero, a una distancia d sobre su superficie
    casilla(tab, i, d = 0) {
      const v = new THREE.Vector3((i - 2.5) * TAB.PASO, TAB.YW, d).applyMatrix4(rotTab(tab)).multiplyScalar(tab.escala ?? 0.8);
      const pos = tab.pos ?? [0, 1.5, 0];
      return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
    },
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
