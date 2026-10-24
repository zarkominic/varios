// Kit del estilo «partículas» para las escenas del plató (atomo/plato/escenas/*-particulas.html).
//
// Todo es luz: puntos aditivos en la GPU (three.js 0.170), con profundidad de campo (bokeh), resplandor,
// desenfoque radial en los golpes de zoom, viñeta y grano, como el demo aprobado estilos/01-particulas.html.
// Lo comparten la prueba de identidad (prueba-particulas) y la del cosmos (cosmos-particulas):
//   · crearPlato()     lienzo 1920×1080, cámara «de mundo» con origen flotante, compositor y fondo
//   · P.atomo          el átomo narrador del canal (canal/avatar.png): mismas formas, partículas y colores
//                      que atomo/src/Atomo.jsx + atomo/herramientas/canal.mjs, a tamaño constante en pantalla
//   · persona()        la persona de partículas con las proporciones de atomo/plato/HUMANO.md
//   · P.regla()        la regla de potencias de diez (solo «10ⁿ m»), grande y legible
// Cada escena pone su coreografía. Todo es función pura de t y el azar lleva semilla.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

export { THREE };

// ── utilidades ───────────────────────────────────────────────────────────────
export const TAU = Math.PI * 2;
export function azar(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const lin = (x, a, b) => cl((x - a) / (b - a));
export const mix = (a, b, x) => a + (b - a) * x;
export const ss = (a, b, x) => { const t = lin(x, a, b); return t * t * (3 - 2 * t); };
export const suave = (x) => { x = cl(x); return x * x * x * (x * (x * 6 - 15) + 10); };
export const eio = (x) => { x = cl(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
export const eoc = (x) => { x = cl(x); return 1 - Math.pow(1 - x, 3); };
export const eob = (x, k = 1.4) => { x = cl(x); const c = k + 1; return 1 + c * Math.pow(x - 1, 3) + k * Math.pow(x - 1, 2); };
export const campana = (x, a, b, c, d) => ss(a, b, x) * (1 - ss(c, d, x));
// gaussiana con media 0 y desviación ~1 (suma de 4 uniformes)
export const gauss = (r) => (r() + r() + r() + r() - 2) * 1.732;

// ruido de valor 2D/3D con semilla (para generar formas en JS)
function hash3(i, j, k, s) {
  let h = Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 1440662683) + Math.imul(s, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function ruido3(x, y, z, s = 1) {
  const i = Math.floor(x), j = Math.floor(y), k = Math.floor(z);
  const fx = x - i, fy = y - j, fz = z - k;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy), w = fz * fz * (3 - 2 * fz);
  const a = (di, dj, dk) => hash3(i + di, j + dj, k + dk, s);
  const x00 = mix(a(0, 0, 0), a(1, 0, 0), u), x10 = mix(a(0, 1, 0), a(1, 1, 0), u);
  const x01 = mix(a(0, 0, 1), a(1, 0, 1), u), x11 = mix(a(0, 1, 1), a(1, 1, 1), u);
  return mix(mix(x00, x10, v), mix(x01, x11, v), w);
}
export const ruido2 = (x, y, s = 1) => ruido3(x, y, 0.5, s);
export function fbm3(x, y, z, s = 1, oct = 4) {
  let t = 0, a = 0.5, f = 1;
  for (let o = 0; o < oct; o++) { t += a * ruido3(x * f, y * f, z * f, s + o * 17); f *= 2.03; a *= 0.5; }
  return t / (1 - Math.pow(0.5, oct));
}

// ── GLSL común ───────────────────────────────────────────────────────────────
export const GLSL_RUIDO = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
// ruido simplex 3D (valor)
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  vec3 ns = 0.142857142857 * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 nr = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= nr.x; p1 *= nr.y; p2 *= nr.z; p3 *= nr.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
// rotacional de un potencial vectorial de ruido: flujo sin divergencia (curl noise)
vec3 curl(vec3 p) {
  const float e = 0.08;
  vec3 dx = vec3(e, 0.0, 0.0), dy = vec3(0.0, e, 0.0), dz = vec3(0.0, 0.0, e);
  vec3 o1 = vec3(31.416, -47.853, 12.679), o2 = vec3(-23.41, 19.73, 53.11);
  float a_y = snoise(p + dy) - snoise(p - dy), a_z = snoise(p + dz) - snoise(p - dz);
  float b_x = snoise(p + o1 + dx) - snoise(p + o1 - dx), b_z = snoise(p + o1 + dz) - snoise(p + o1 - dz);
  float c_x = snoise(p + o2 + dx) - snoise(p + o2 - dx), c_y = snoise(p + o2 + dy) - snoise(p + o2 - dy);
  return vec3(c_y - b_z, a_z - c_x, b_x - a_y) / (2.0 * e);
}
`;

// emisión de un punto de luz: tamaño en pantalla, profundidad de campo (círculo de confusión) y conservación
// de la energía cuando el punto es más pequeño que un píxel (así una ciudad que se aleja no se apaga ni se quema)
export const GLSL_EMITIR = /* glsl */ `
uniform float uFocal;      // píxeles por unidad de cámara a distancia 1
uniform float uAperture;   // círculo de confusión (px) por unidad de desenfoque relativo
uniform float uFocus;      // distancia de enfoque (unidades de cámara)
uniform float uAlpha;
varying vec3 vCol;
varying float vAlpha;
varying float vBokeh;
varying vec2 vNdc;
void emitir(vec4 mv, float tamCam, vec3 col, float a, float minPx) {
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  if (dist < 1e-6) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); vAlpha = 0.0; return; }
  // tamaño negativo: punto de tamaño fijo en pantalla (estrellas lejanas), sin atenuar
  float px = tamCam < 0.0 ? minPx : tamCam * uFocal / dist;
  float coc = uAperture * abs(dist - uFocus) / dist;
  float tot = sqrt(px * px + coc * coc);
  a *= (px * px) / (tot * tot);
  float bk = smoothstep(0.45, 0.9, coc / tot);
  a *= mix(1.0, 0.42, bk);
  if (tot < minPx) { a *= tot * tot / (minPx * minPx); tot = minPx; }
  gl_PointSize = min(tot, 400.0);
  vAlpha = a * uAlpha;
  vCol = col;
  vBokeh = bk;
  vNdc = gl_Position.xy / gl_Position.w;
  if (vAlpha < 0.00025) gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
}
`;

export const GLSL_PUNTO_FRAG = /* glsl */ `
#define TAU 6.28318531
varying vec3 vCol;
varying float vAlpha;
varying float vBokeh;
varying vec2 vNdc;
void main() {
  vec2 pc = gl_PointCoord * 2.0 - 1.0;
  pc.y = -pc.y;
  float r = length(pc);
  if (r > 1.0) discard;
  float perfil = exp(-r * r * 6.5);
  vec3 c = vCol;
  if (vBokeh > 0.01) {
    // diafragma de 7 láminas, borde algo más brillante, «ojo de gato» hacia los bordes y un leve fleco cromático
    float seg = TAU / 7.0;
    float an = mod(atan(pc.y, pc.x) + 0.35, seg) - 0.5 * seg;
    float rp = r * cos(0.5 * seg) / cos(an);
    float rr = mix(r, rp, 0.4);
    float disco = 1.0 - smoothstep(0.82, 0.98, rr);
    float borde = 0.6 + 0.4 * smoothstep(0.35, 0.95, rr);
    vec2 o = vNdc * vec2(1.0, 0.5625) * 0.5;
    float gato = 1.0 - smoothstep(0.84, 1.0, length(pc + o));
    perfil = mix(perfil, disco * borde * gato, vBokeh);
    c *= mix(vec3(1.0), vec3(0.92, 1.0, 1.12), vBokeh * smoothstep(0.7, 0.97, rr));
  }
  gl_FragColor = vec4(c * vAlpha * perfil, 1.0);
}
`;

// material genérico de «luces»: cada punto lleva color, intensidad, tamaño y parpadeo
//   position (vec3, unidades del nivel) · aCol (rgb, intensidad) · aTam (tamaño en unidades del nivel, px mínimo,
//   amplitud de parpadeo, fase)
const VERT_LUCES = /* glsl */ `
${GLSL_EMITIR}
uniform float uTime;
uniform float uEsc;
uniform float uMinPx;
uniform float uTamK;       // al ver un nivel más de cerca de lo previsto, partículas más pequeñas (y más intensas)
attribute vec4 aCol;
attribute vec4 aTam;
attribute vec4 aMov;       // luces que circulan (coches): dirección xz, velocidad, largo del tramo (sin el atributo: quietas)
void main() {
  vec3 q = position;
  if (aMov.z != 0.0) q.xz += aMov.xy * mod(aMov.z * uTime + aTam.w * aMov.w, aMov.w);
  vec4 mv = modelViewMatrix * vec4(q, 1.0);
  float tw = 1.0 + aTam.z * sin(uTime * (1.1 + 2.6 * fract(aTam.w * 7.13)) + aTam.w * 6.2832);
  emitir(mv, aTam.x * uEsc * uTamK, aCol.rgb, aCol.w * tw / (aTam.x > 0.0 ? uTamK * uTamK : 1.0), max(aTam.y, uMinPx));
}
`;

// ── capa de puntos genérica ───────────────────────────────────────────────────
export function geometria(attrs, n) {
  const g = new THREE.BufferGeometry();
  for (const [nom, [arr, k]] of Object.entries(attrs)) g.setAttribute(nom, new THREE.BufferAttribute(arr, k));
  g.setDrawRange(0, n ?? attrs.position[0].length / 3);
  return g;
}

// Acumulador de luces: L.add(x, y, z, r, g, b, intensidad, tamaño, minPx, parpadeo, fase)
export class Luces {
  constructor(cap, { mov = false, extra = 0 } = {}) {
    this.n = 0; this.cap = cap;
    this.P = new Float32Array(cap * 3); this.C = new Float32Array(cap * 4); this.T = new Float32Array(cap * 4);
    this.M = mov ? new Float32Array(cap * 4) : null;
    this.X = extra ? new Float32Array(cap * 4) : null;
  }
  // escala: las coordenadas y el tamaño se dividen por la unidad del nivel
  add(x, y, z, r, g, b, a, tam, minPx = 0, tw = 0, fase = 0) {
    if (this.n >= this.cap) return -1;
    const i = this.n++, u = this.u ?? 1;
    this.P[i * 3] = x / u; this.P[i * 3 + 1] = y / u; this.P[i * 3 + 2] = z / u;
    this.C[i * 4] = r; this.C[i * 4 + 1] = g; this.C[i * 4 + 2] = b; this.C[i * 4 + 3] = a;
    this.T[i * 4] = tam / u; this.T[i * 4 + 1] = minPx; this.T[i * 4 + 2] = tw; this.T[i * 4 + 3] = fase;
    return i;
  }
  mov(i, dx, dz, v, largo) {
    if (i < 0) return;
    const u = this.u ?? 1;
    this.M[i * 4] = dx; this.M[i * 4 + 1] = dz; this.M[i * 4 + 2] = v / u; this.M[i * 4 + 3] = largo / u;
  }
  extra(i, a, b, c, d) { if (i >= 0) this.X.set([a, b, c, d], i * 4); }
  geometria() {
    const at = { position: [this.P.subarray(0, this.n * 3), 3], aCol: [this.C.subarray(0, this.n * 4), 4], aTam: [this.T.subarray(0, this.n * 4), 4] };
    if (this.M) at.aMov = [this.M.subarray(0, this.n * 4), 4];
    if (this.X) at.aX = [this.X.subarray(0, this.n * 4), 4];
    return geometria(at);
  }
}

// ── el plató ─────────────────────────────────────────────────────────────────
const NEB_W = 512, NEB_H = 288;
function texturaNebulosa(semilla = 99) {
  const r = azar(semilla);
  const G = new Float32Array(256 * 256);
  for (let i = 0; i < G.length; i++) G[i] = r();
  const vn = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const i0 = (yi & 255) * 256, i1 = ((yi + 1) & 255) * 256, x0 = xi & 255, x1 = (xi + 1) & 255;
    const a = G[i0 + x0], b = G[i0 + x1], c = G[i1 + x0], d = G[i1 + x1];
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const fbm = (x, y) => { let s = 0, a = 0.5, f = 1; for (let o = 0; o < 5; o++) { s += a * vn(x * f, y * f); f *= 2.03; a *= 0.5; } return s; };
  const data = new Uint8Array(NEB_W * NEB_H * 4);
  for (let j = 0; j < NEB_H; j++) {
    for (let i = 0; i < NEB_W; i++) {
      const u = i / NEB_W, v = j / NEB_H;
      const px = u * 4.6, py = v * 2.6;
      const wx = fbm(px + 1.7, py + 9.2), wy = fbm(px + 8.3, py + 2.8);
      const n1 = fbm(px + 2.4 * wx, py + 2.4 * wy);
      const n2 = fbm(px * 1.5 + 5.1 + 1.6 * wy, py * 1.5 - 3.3 + 1.6 * wx);
      const n3 = fbm(px * 3.1 + 2.2 * wx, py * 3.1 - 1.3);
      const banda = Math.exp(-((v - 0.6 + 0.4 * (u - 0.5)) ** 2) * 12);
      const banda2 = Math.exp(-((v - 0.3 - 0.25 * (u - 0.5)) ** 2) * 9);
      const c1 = Math.max(0, n1 - 0.4) * 2.2 * (0.2 + banda);
      const c2 = Math.max(0, n2 - 0.44) * 2.4 * (0.15 + banda2);
      const polvo = Math.max(0, n3 - 0.5) * 2 * banda;           // filamentos oscuros
      const k = (j * NEB_W + i) * 4;
      const R = (c1 * 0.5 + c2 * 0.1) * (1 - 0.6 * polvo), Gc = (c1 * 0.2 + c2 * 0.36) * (1 - 0.6 * polvo), B = (c1 * 0.95 + c2 * 0.55) * (1 - 0.5 * polvo);
      data[k] = Math.min(255, R * 255); data[k + 1] = Math.min(255, Gc * 255); data[k + 2] = Math.min(255, B * 255); data[k + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, NEB_W, NEB_H, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.MirroredRepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

// fondo: cielo nocturno con horizonte (fase en tierra) y espacio con nebulosa (fase cósmica)
const FONDO_VERT = /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const FONDO_FRAG = /* glsl */ `
uniform sampler2D uNeb;
uniform float uCielo, uEspacio, uSuelo, uNebK, uTime;
uniform mat3 uRot;          // columnas: derecha, arriba, atrás de la cámara (en el mundo)
uniform vec4 uLente;        // tan(fov/2)·aspecto, tan(fov/2), desplazamiento NDC x, y
uniform vec4 uOcl[4];       // discos que tapan el fondo (px: x, y, radio, borde)
uniform vec4 uLimbo;        // limbo de la Tierra: x, y, radio (px), intensidad
uniform vec3 uSolDir;       // dirección (pantalla) de la luz del Sol para el limbo
uniform vec2 uDeriva;
uniform vec4 uCorona;       // x, y, radio (px), intensidad
varying vec2 vUv;
void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 v = normalize(vec3((ndc.x - uLente.z) * uLente.x, (ndc.y - uLente.w) * uLente.y, -1.0));
  vec3 d = uRot * v;
  vec2 px = vec2(vUv.x * 1920.0, (1.0 - vUv.y) * 1080.0);
  // cielo de la ciudad de noche: azul muy oscuro, con el halo de las luces cerca del horizonte (sin línea dura)
  float el = d.y;
  float oeste = clamp(-d.x * 0.7 + 0.3, 0.0, 1.0);
  vec3 cielo = mix(vec3(0.0017, 0.0024, 0.0062), vec3(0.0008, 0.0011, 0.003), smoothstep(0.0, 0.5, el));
  cielo += vec3(0.0032, 0.0026, 0.0032) * exp(-abs(el) / 0.07);
  cielo += oeste * vec3(0.0035, 0.0018, 0.001) * exp(-max(el, 0.0) / 0.12);
  vec3 suelo = vec3(0.001, 0.0012, 0.0019);
  vec3 tierra = mix(suelo, cielo, smoothstep(-0.05, 0.06, el));
  // espacio profundo: degradado y nebulosa muy tenue
  vec2 dc = (vUv - vec2(0.45, 0.5)) * vec2(1.0, 0.5625);
  float r = length(dc);
  vec3 esp = mix(vec3(0.0016, 0.0019, 0.005), vec3(0.0005, 0.0006, 0.0016), smoothstep(0.0, 0.6, r));
  vec3 neb = texture2D(uNeb, vUv * 0.9 + 0.05 + uDeriva).rgb;
  esp += neb * neb * uNebK;
  float tapa = 1.0;
  for (int i = 0; i < 4; i++) {
    vec4 o = uOcl[i];
    if (o.z > 0.0) tapa *= smoothstep(o.z - o.w, o.z + o.w, length(px - o.xy));
  }
  vec3 col = tierra * uCielo + esp * uEspacio * tapa + vec3(0.0009, 0.001, 0.0016) * uSuelo;
  // limbo atmosférico (fino, azul cian, más intenso del lado del Sol)
  if (uLimbo.w > 0.0) {
    vec2 q = px - uLimbo.xy;
    float rr = length(q);
    float x = (rr - uLimbo.z) / max(uLimbo.z, 1.0);
    float lado = 0.06 + 0.94 * pow(clamp(dot(q / max(rr, 1.0), uSolDir.xy) * 0.6 + 0.45, 0.0, 1.0), 1.5);
    float an = exp(-pow(max(x, 0.0) / 0.035, 1.2)) * smoothstep(-0.03, 0.0, x);
    float dentro = smoothstep(-0.16, 0.0, x) * (1.0 - smoothstep(0.0, 0.004, x));
    col += uLimbo.w * lado * (an * vec3(0.10, 0.32, 0.95) * 0.32 + dentro * vec3(0.05, 0.16, 0.5) * 0.12);
  }
  if (uCorona.w > 0.0) {
    vec2 q = px - uCorona.xy;
    float rr = length(q), x = max(rr - uCorona.z, 0.0) / uCorona.z;
    float an = atan(q.y, q.x);
    float serp = 0.55 + 0.45 * pow(max(cos(2.0 * an + 0.5), 0.0), 2.0) + 0.25 * pow(max(cos(5.0 * an + 1.1), 0.0), 4.0);
    float g = exp(-x / (0.18 * serp)) * 0.6 + exp(-x / 0.9) * 0.25;
    col += uCorona.w * g * smoothstep(-2.0, 2.0, rr - uCorona.z * 0.98) * vec3(1.0, 0.62, 0.3);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

// desenfoque radial de los golpes de zoom (alejamiento: el rastro va hacia fuera desde la posición actual)
const ZOOM = {
  uniforms: { tDiffuse: { value: null }, uC: { value: new THREE.Vector2(0.5, 0.5) }, uK: { value: 1 }, uGiro: { value: 0 } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uC;
    uniform float uK, uGiro;
    varying vec2 vUv;
    float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec2 asp = vec2(1.7778, 1.0);
      vec2 d = (vUv - uC) * asp;
      float j = hash(gl_FragCoord.xy);
      vec3 acc = vec3(0.0);
      float w = 0.0;
      for (int i = 0; i < 14; i++) {
        float s = (float(i) + j) / 14.0;
        float k = pow(uK, -s);
        float a = uGiro * s;
        vec2 q = mat2(cos(a), sin(a), -sin(a), cos(a)) * d * k;
        float wi = 1.0 - 0.5 * s;
        acc += texture2D(tDiffuse, uC + q / asp).rgb * wi;
        w += wi;
      }
      gl_FragColor = vec4(acc / w, 1.0);
    }`,
};

// acabado: aberración cromática en los bordes, viñeta, grano que respeta los negros
const ACABADO = {
  uniforms: { tDiffuse: { value: null }, uSemilla: { value: 0 }, uRes: { value: new THREE.Vector2(1920, 1080) }, uGrano: { value: 0.03 } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uSemilla, uGrano;
    uniform vec2 uRes;
    varying vec2 vUv;
    float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec2 c = vUv - 0.5;
      vec2 ca = c * vec2(1.0, 0.5625);
      float r2 = dot(ca, ca);
      vec2 off = c * 0.012 * r2;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      float vig = smoothstep(0.85, 0.2, length(ca * vec2(0.92, 1.25)) * 1.22);
      col *= mix(0.55, 1.0, vig);
      // negro de referencia: el resplandor muy tenue no levanta los negros
      col = max(col - 0.006, 0.0) * 1.006;
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      float g = hash(vUv * uRes + uSemilla * 71.3) - 0.5;
      col += g * uGrano * (0.12 + 0.88 * smoothstep(0.0, 0.35, l));
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }`,
};

// ── el átomo narrador (port de atomo/src/Atomo.jsx + canal.mjs) ───────────────
// Paleta del canal (atomo/src/formas/base.js)
export const C = {
  blanco: [1.0, 0.95, 0.88], cian: [0.3, 0.72, 1.0], electron: [0.55, 0.9, 1.0], proton: [1.0, 0.42, 0.22],
  neutron: [0.42, 0.58, 1.0], azul: [0.25, 0.55, 1.0], rojo: [1.0, 0.25, 0.18], naranja: [1.0, 0.52, 0.14],
  sol: [1.0, 0.78, 0.32], oceano: [0.1, 0.32, 0.95], tierra: [0.25, 0.75, 0.38], arena: [0.75, 0.6, 0.35],
};
const N_ATOMO = 7000;
const R_ORB = 1.18;
const glv = (c) => `vec3(${c.map((v) => v.toFixed(3)).join(', ')})`;
const ATOMO_VERT = /* glsl */ `
#define TAU 6.28318531
attribute vec4 aP;
attribute vec4 aQ;
uniform float uFase, uEnergia, uBrillo, uEscala, uApl, uGiro, uEstela, uMinPx;
uniform vec4 uMano;      // el electrón 0 sale de su órbita y hace de mano (posición local, peso)
varying vec3 vColor;
vec3 orbita(float k, float th, float r) {
  float x0 = r * cos(th), z0 = r * sin(th);
  float y1 = z0 * uApl, z1 = z0 * sqrt(1.0 - uApl * uApl);
  float g = k * 3.14159265 / 3.0 + uGiro;
  return vec3(x0 * cos(g) - y1 * sin(g), x0 * sin(g) + y1 * cos(g), z1);
}
void main() {
  float rol = aQ.x;
  vec3 p, c;
  float tam = aQ.y;
  if (rol < 0.5) {
    p = aP.xyz;
    c = aQ.z > 0.5 ? ${glv(C.proton)} : ${glv(C.neutron)};
  } else if (rol < 1.5) {
    p = orbita(aP.x, aP.y, aP.z);
    c = ${glv(C.cian)} * 0.6;
  } else {
    float k = aP.x;
    float cabeza = uFase + k * TAU / 3.0 + k * 0.9;
    if (aP.y < 0.0) {
      p = orbita(k, cabeza, ${R_ORB.toFixed(3)}) + vec3(aP.z, aP.w, aQ.z);
      c = ${glv(C.electron)} * 1.4;
    } else {
      float d = aP.y;
      p = orbita(k, cabeza - d * 1.4 * uEstela, aP.z);
      c = ${glv(C.electron)} * 1.1 * pow(1.0 - d, 1.6);
    }
    if (k < 0.5 && uMano.w > 0.0) {
      // la cabeza va a la «mano» y la estela hace de brazo, desde la mano hasta la órbita
      float d = aP.y < 0.0 ? 0.0 : aP.y;
      vec3 brazo = mix(uMano.xyz + (aP.y < 0.0 ? vec3(aP.z, aP.w, aQ.z) : vec3(0.0)), p, d * d);
      p = mix(p, brazo, uMano.w);
    }
  }
  vColor = c * uBrillo * (1.0 + uEnergia * 0.8);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float px = tam * uEscala / -mv.z;
  if (px < uMinPx) { vColor *= px * px / (uMinPx * uMinPx); px = uMinPx; }
  gl_PointSize = px;
  gl_Position = projectionMatrix * mv;
}
`;
const ATOMO_FRAG = /* glsl */ `
varying vec3 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float a = exp(-r * r * 5.5);
  gl_FragColor = vec4(vColor * a, a);
}
`;
function datosAtomo() {
  // mismas semillas que atomo/src/formas/base.js (S1..S4 y DIR) para que el núcleo sea el del avatar
  const rnd = azar(11);
  const S = [new Float32Array(N_ATOMO), new Float32Array(N_ATOMO), new Float32Array(N_ATOMO), new Float32Array(N_ATOMO)];
  for (let i = 0; i < N_ATOMO; i++) { S[0][i] = rnd(); S[1][i] = rnd(); S[2][i] = rnd(); S[3][i] = rnd(); rnd(); rnd(); }
  const NUC = [[0, 0, 0]];
  for (let k = 0; k < 13; k++) {
    const y = 1 - (2 * (k + 0.5)) / 13, r = Math.sqrt(1 - y * y), th = k * 2.39996;
    NUC.push([0.2 * r * Math.cos(th), 0.2 * y, 0.2 * r * Math.sin(th)]);
  }
  const P = new Float32Array(N_ATOMO * 4), Q = new Float32Array(N_ATOMO * 4), pos = new Float32Array(N_ATOMO * 3);
  for (let i = 0; i < N_ATOMO; i++) {
    const f = i / N_ATOMO, o = i * 4;
    const [s1, s2, s3, s4] = [S[0][i], S[1][i], S[2][i], S[3][i]];
    if (f < 0.14) {
      const k = i % NUC.length, n = NUC[k];
      const th = TAU * s1, ph = Math.acos(2 * s2 - 1), r = 0.1 * Math.cbrt(s3);
      P[o] = n[0] * 1.15 + r * Math.sin(ph) * Math.cos(th);
      P[o + 1] = n[1] * 1.15 + r * Math.cos(ph);
      P[o + 2] = n[2] * 1.15 + r * Math.sin(ph) * Math.sin(th);
      Q[o] = 0; Q[o + 1] = 0.055; Q[o + 2] = k % 2;
    } else if (f < 0.6) {
      P[o] = i % 3; P[o + 1] = TAU * s1; P[o + 2] = R_ORB + (s2 - 0.5) * 0.02;
      Q[o] = 1; Q[o + 1] = 0.03;
    } else {
      const k = i % 3;
      P[o] = k;
      if (s1 < 0.08) {
        P[o + 1] = -1; P[o + 2] = (s2 - 0.5) * 0.08; P[o + 3] = (s3 - 0.5) * 0.08; Q[o + 2] = (s4 - 0.5) * 0.08;
        Q[o] = 2; Q[o + 1] = 0.065;
      } else {
        const d = (s1 - 0.08) / 0.92;
        P[o + 1] = d; P[o + 2] = R_ORB + (s2 - 0.5) * 0.03 * d;
        Q[o] = 2; Q[o + 1] = 0.055 * (1 - d * 0.7);
      }
    }
  }
  return geometria({ position: [pos, 3], aP: [P, 4], aQ: [Q, 4] });
}

// sombra suave detrás de Atom: lo despega del Sol o de las luces de la ciudad
const SOMBRA_FRAG = /* glsl */ `
uniform float uA;
varying vec2 vUv;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = uA * exp(-r * r * 3.2) * (1.0 - smoothstep(0.85, 1.0, r));
  gl_FragColor = vec4(0.0, 0.0, 0.004, a);
}
`;

// ── crearPlato ───────────────────────────────────────────────────────────────
const _px = new Uint8Array(4);
export async function crearPlato({ fov = 30, fuentes = [] } = {}) {
  const CAPTURA = new URLSearchParams(location.search).has('captura');
  document.body.style.cssText = 'margin:0;height:100vh;background:#010205;overflow:hidden';
  const marco = document.createElement('div');
  marco.style.cssText = 'position:absolute;overflow:hidden;background:#010205';
  const lienzo = document.createElement('canvas');
  const capa = document.createElement('canvas');
  for (const c of [lienzo, capa]) { c.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;display:block'; marco.appendChild(c); }
  document.body.appendChild(marco);
  const ctx = capa.getContext('2d');

  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor(0x000000, 1);

  const contenido = new THREE.Scene();
  const arriba = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(fov, 16 / 9, 1e-4, 1e7);
  camara.matrixAutoUpdate = false;
  const camAtomo = new THREE.PerspectiveCamera(40, 16 / 9, 0.05, 500);

  const composer = new EffectComposer(renderer);
  const pasoContenido = new RenderPass(contenido, camara);
  const pasoZoom = new ShaderPass(ZOOM);
  pasoZoom.enabled = false;
  const pasoArriba = new RenderPass(arriba, camAtomo);
  pasoArriba.clear = false;
  const bloom = new UnrealBloomPass(new THREE.Vector2(1920, 1080), 0.75, 0.45, 0.32);
  bloom.materialHighPassFilter.fragmentShader = /* glsl */ `
    #include <common>
    uniform sampler2D tDiffuse;
    uniform vec3 defaultColor;
    uniform float defaultOpacity;
    uniform float luminosityThreshold;
    uniform float smoothWidth;
    varying vec2 vUv;
    void main() {
      vec2 px = vec2(dFdx(vUv.x), dFdy(vUv.y)) * 0.5;
      vec4 texel = 0.25 * (texture2D(tDiffuse, vUv + px * vec2(-1.0, -1.0)) + texture2D(tDiffuse, vUv + px * vec2(1.0, -1.0))
                         + texture2D(tDiffuse, vUv + px * vec2(-1.0, 1.0)) + texture2D(tDiffuse, vUv + px * vec2(1.0, 1.0)));
      float v = luminance(texel.xyz);
      texel.rgb *= min(1.0, 1.8 / max(v, 1e-4));
      float alpha = smoothstep(luminosityThreshold, luminosityThreshold + smoothWidth, v);
      gl_FragColor = mix(vec4(defaultColor.rgb, defaultOpacity), texel, alpha);
    }`;
  bloom.materialHighPassFilter.needsUpdate = true;
  for (const m of bloom.separableBlurMaterials) {
    const K = m.defines.KERNEL_RADIUS, sg = K / 2.1;
    m.uniforms.gaussianCoefficients.value = Array.from({ length: K }, (_, i) => Math.exp((-0.5 * i * i) / (sg * sg)));
  }
  const acabado = new ShaderPass(ACABADO);
  composer.addPass(pasoContenido);
  composer.addPass(pasoZoom);
  composer.addPass(pasoArriba);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  composer.addPass(acabado);

  // uniforms compartidos por todos los materiales de puntos
  const U = {
    uFocal: { value: 540 / Math.tan((fov * Math.PI) / 360) },
    uAperture: { value: 0 },
    uFocus: { value: 1 },
    uTime: { value: 0 },
  };

  const P = {
    THREE, renderer, contenido, arriba, camara, camAtomo, composer, bloom, ctx, capa, U, CAPTURA, fov,
    escala: 1, // píxeles del lienzo por píxel de diseño (1920×1080)
  };

  function encajar() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const W = Math.floor(Math.min(vw, (vh * 16) / 9)), H = Math.round((W * 9) / 16);
    marco.style.width = W + 'px'; marco.style.height = H + 'px';
    marco.style.left = Math.floor((vw - W) / 2) + 'px'; marco.style.top = Math.floor((vh - H) / 2) + 'px';
    const pr = CAPTURA ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    composer.setPixelRatio(pr);
    composer.setSize(W, H);
    capa.width = Math.round(W * pr); capa.height = Math.round(H * pr);
    P.escala = capa.height / 1080;
    U.uFocal.value = (capa.height / 2) / Math.tan((fov * Math.PI) / 360);
    acabado.uniforms.uRes.value.set(capa.width, capa.height);
  }
  encajar();
  if (!CAPTURA) window.addEventListener('resize', encajar);

  // ── material de luces ──
  P.materialLuces = (extra = {}) => new THREE.ShaderMaterial({
    uniforms: { ...U, uAlpha: { value: 1 }, uEsc: { value: 1 }, uMinPx: { value: 1.2 }, uTamK: { value: 1 }, ...extra },
    vertexShader: VERT_LUCES, fragmentShader: GLSL_PUNTO_FRAG,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  // capa de luces en la escena de contenido; devuelve el objeto (con .material.uniforms.uAlpha / uEsc)
  P.capa = (geo, mat, orden = 0) => {
    const o = new THREE.Points(geo, mat ?? P.materialLuces());
    o.frustumCulled = false; o.matrixAutoUpdate = false; o.matrixWorldAutoUpdate = false;
    o.renderOrder = orden;
    contenido.add(o);
    return o;
  };

  // ── la cámara del mundo (origen flotante) ──
  // vista: C posición (m, doble precisión), base [derecha, arriba, atrás] (vectores unitarios del mundo),
  // U unidad (m por unidad de cámara: así todo lo que se ve tiene coordenadas moderadas), F punto de pantalla
  // (px) por el que pasa el eje óptico (desplazamiento de lente).
  const vista = { C: [0, 0, 0], B: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], U: 1, F: [960, 540] };
  P.vista = vista;
  const tanV = Math.tan((fov * Math.PI) / 360);
  P.tanV = tanV;
  P.ponerVista = (C, B, Uu, F) => {
    vista.C = C; vista.B = B; vista.U = Uu; vista.F = F;
    const xf = (F[0] / 1920) * 2 - 1, yf = 1 - (F[1] / 1080) * 2;
    const n = 1e-4, top = n * tanV, hw = top * (16 / 9);
    camara.projectionMatrix.makePerspective(-hw * (1 + xf), hw * (1 - xf), top * (1 - yf), -top * (1 + yf), n, 1e7);
    camara.projectionMatrixInverse.copy(camara.projectionMatrix).invert();
    camara.matrixWorld.identity(); camara.matrixWorldInverse.identity();
    const fu = fondo.material.uniforms;
    fu.uRot.value.set(B[0][0], B[1][0], B[2][0], B[0][1], B[1][1], B[2][1], B[0][2], B[1][2], B[2][2]);
    fu.uLente.value.set(tanV * 16 / 9, tanV, xf, yf);
  };
  // matriz modelo-vista de un nivel: origen O (m), unidad u (m por unidad local), rotación Rl (fila mayor, mundo ← local)
  const _m = new THREE.Matrix4();
  P.mv = (O, u = 1, Rl = null, out = _m) => {
    const { C: Cc, B, U: Uu } = vista;
    const k = u / Uu;
    const M = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      let s = 0;
      for (let q = 0; q < 3; q++) s += B[i][q] * (Rl ? Rl[q * 3 + j] : q === j ? 1 : 0);
      M[i * 3 + j] = s * k;
    }
    const d = [(O[0] - Cc[0]) / Uu, (O[1] - Cc[1]) / Uu, (O[2] - Cc[2]) / Uu];
    const T = [0, 1, 2].map((i) => B[i][0] * d[0] + B[i][1] * d[1] + B[i][2] * d[2]);
    out.set(M[0], M[1], M[2], T[0], M[3], M[4], M[5], T[1], M[6], M[7], M[8], T[2], 0, 0, 0, 1);
    return out;
  };
  P.colocar = (obj, O, u = 1, Rl = null) => {
    P.mv(O, u, Rl, obj.matrixWorld);
    const un = obj.material.uniforms;
    if (un?.uEsc) un.uEsc.value = u / vista.U;
    return obj;
  };
  // proyección a pantalla (px de diseño) de un punto del mundo (m)
  const _v = new THREE.Vector3();
  P.aPantalla = (p) => {
    const { C: Cc, B, U: Uu } = vista;
    const d = [(p[0] - Cc[0]) / Uu, (p[1] - Cc[1]) / Uu, (p[2] - Cc[2]) / Uu];
    _v.set(B[0][0] * d[0] + B[0][1] * d[1] + B[0][2] * d[2], B[1][0] * d[0] + B[1][1] * d[1] + B[1][2] * d[2], B[2][0] * d[0] + B[2][1] * d[1] + B[2][2] * d[2]);
    const z = -_v.z;
    _v.applyMatrix4(camara.projectionMatrix);
    return [(_v.x * 0.5 + 0.5) * 1920, (0.5 - _v.y * 0.5) * 1080, z * Uu];
  };
  // píxeles por metro a una distancia dada (m)
  P.pxPorMetro = (dist) => 540 / (tanV * dist);

  // ── fondo ──
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: {
      uNeb: { value: texturaNebulosa() }, uCielo: { value: 1 }, uEspacio: { value: 0 }, uSuelo: { value: 0 }, uNebK: { value: 0.05 },
      uTime: { value: 0 }, uRot: { value: new THREE.Matrix3() }, uLente: { value: new THREE.Vector4(1, 1, 0, 0) },
      uOcl: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, 0, 1)) }, uLimbo: { value: new THREE.Vector4(0, 0, 0, 0) },
      uSolDir: { value: new THREE.Vector3(-1, 0, 0) }, uDeriva: { value: new THREE.Vector2(0, 0) }, uCorona: { value: new THREE.Vector4(0, 0, 0, 0) },
    },
    vertexShader: FONDO_VERT, fragmentShader: FONDO_FRAG,
    depthTest: false, depthWrite: false, transparent: true, blending: THREE.AdditiveBlending,
  }));
  fondo.frustumCulled = false; fondo.renderOrder = -100;
  arriba.add(fondo);
  P.fondo = fondo.material.uniforms;

  // estrellas del fondo (en px de pantalla: están en el infinito, no se mueven con el zoom)
  {
    const r = azar(4242), n = 2600;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 4), dat = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = r() * 1960 - 20; pos[i * 3 + 1] = r() * 1120 - 20;
      const cal = r();
      const c = cal < 0.14 ? [1.0, 0.8, 0.6] : cal < 0.32 ? [0.66, 0.78, 1.0] : [0.86, 0.9, 1.0];
      const br = 0.03 + 0.5 * r() ** 7;
      col.set([...c, br], i * 4);
      dat.set([1.2 + 2.2 * r() ** 4, r() * TAU, 0.2 + 0.4 * r(), r()], i * 4);
    }
    const mat = new THREE.ShaderMaterial({
      uniforms: { uAlpha: { value: 0 }, uTime: { value: 0 }, uOcl: P.fondo.uOcl, uEsc: { value: 1 }, uDesp: { value: new THREE.Vector3(0, 0, 1) } },
      vertexShader: /* glsl */ `
        attribute vec4 aCol; attribute vec4 aDat;
        uniform float uAlpha, uTime, uEsc; uniform vec4 uOcl[4]; uniform vec3 uDesp;
        varying vec3 vCol; varying float vAlpha; varying float vBokeh; varying vec2 vNdc;
        void main() {
          vec2 px = (position.xy - vec2(960.0, 540.0)) * uDesp.z + vec2(960.0, 540.0) + uDesp.xy;
          float tapa = 1.0;
          for (int i = 0; i < 4; i++) { vec4 o = uOcl[i]; if (o.z > 0.0) tapa *= smoothstep(o.z - o.w, o.z + o.w, length(px - o.xy)); }
          float tw = 1.0 - aDat.z * (0.5 + 0.5 * sin(uTime * (0.7 + 2.3 * aDat.w) + aDat.y));
          vAlpha = aCol.w * uAlpha * tapa * tw; vCol = aCol.rgb; vBokeh = 0.0;
          gl_Position = vec4(px.x / 960.0 - 1.0, 1.0 - px.y / 540.0, 0.0, 1.0);
          vNdc = gl_Position.xy;
          gl_PointSize = aDat.x * uEsc;
          if (vAlpha < 0.001) gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
        }`,
      fragmentShader: GLSL_PUNTO_FRAG,
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const o = new THREE.Points(geometria({ position: [pos, 3], aCol: [col, 4], aDat: [dat, 4] }), mat);
    o.frustumCulled = false; o.renderOrder = -90;
    arriba.add(o);
    P.estrellasFondo = mat.uniforms;
  }

  // ── Atom (y otros átomos iguales para las moléculas) ──
  const geoAtomo = datosAtomo();
  const D_ATOMO = 20;
  const tan20 = Math.tan((20 * Math.PI) / 180);
  const nuevoAtomo = (orden = 10) => {
    const grupo = new THREE.Group();
    const mat = new THREE.ShaderMaterial({
      uniforms: { uFase: { value: 0 }, uEnergia: { value: 0 }, uBrillo: { value: 0.32 }, uEscala: { value: 1 }, uApl: { value: 0.36 }, uGiro: { value: 0.26 }, uEstela: { value: 1 }, uMinPx: { value: 1.0 }, uMano: { value: new THREE.Vector4(0, 0, 0, 0) } },
      vertexShader: ATOMO_VERT, fragmentShader: ATOMO_FRAG,
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(geoAtomo, mat);
    pts.frustumCulled = false; pts.renderOrder = orden;
    grupo.add(pts);
    const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({
      uniforms: { uA: { value: 0 } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: SOMBRA_FRAG, transparent: true, depthTest: false, depthWrite: false, blending: THREE.NormalBlending,
    }));
    sombra.frustumCulled = false; sombra.renderOrder = orden - 5;
    arriba.add(sombra);
    arriba.add(grupo);
    // a: { x, y (px), radio (px de la órbita), energia, fase, rotX, rotY, rotZ, brillo, sombra, estela, mano: [x, y, z, peso], visible }
    return (a) => {
      const wpp = (2 * D_ATOMO * tan20) / 1080;       // unidades del mundo por px a la distancia D
      const esc = (a.radio * wpp) / R_ORB;
      const latido = 1 + 0.045 * (a.energia ?? 0);
      grupo.position.set((a.x - 960) * wpp, -(a.y - 540) * wpp, -D_ATOMO);
      grupo.scale.setScalar(esc * latido);
      grupo.rotation.set(a.rotX ?? 0, a.rotY ?? 0, a.rotZ ?? 0, 'YXZ');
      const u = mat.uniforms;
      u.uFase.value = a.fase ?? 0;
      u.uEnergia.value = a.energia ?? 0;
      u.uBrillo.value = 0.32 * (a.brillo ?? 1);
      u.uEstela.value = a.estela ?? 1;
      u.uEscala.value = (capa.height) / (2 * tan20);
      const m = a.mano ?? [0, 0, 0, 0];
      u.uMano.value.set(m[0], m[1], m[2], m[3]);
      const s = a.radio * 3.3 * wpp;
      sombra.position.set((a.x - 960) * wpp, -(a.y - 540) * wpp, -D_ATOMO - 0.01);
      sombra.scale.set(s, s, 1);
      sombra.material.uniforms.uA.value = a.sombra ?? 0;
      const v = (a.visible ?? 1) > 0;
      grupo.visible = v; sombra.visible = v && (a.sombra ?? 0) > 0;
    };
  };
  P.atomo = nuevoAtomo(10);
  P.crearAtomo = nuevoAtomo;

  // ── partículas en px de pantalla (en la capa de arriba, sin zoom): enlaces, pizarra, cotas ──
  P.capaPantalla = (n, orden = 20, blending = THREE.AdditiveBlending) => {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 4), tam = new Float32Array(n);
    const geo = geometria({ position: [pos, 3], aCol: [col, 4], aTam: [tam, 1] });
    const mat = new THREE.ShaderMaterial({
      uniforms: { uEsc: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute vec4 aCol; attribute float aTam; uniform float uEsc;
        varying vec3 vCol; varying float vAlpha; varying float vBokeh; varying vec2 vNdc;
        void main() {
          gl_Position = vec4(position.x / 960.0 - 1.0, 1.0 - position.y / 540.0, 0.0, 1.0);
          vNdc = gl_Position.xy; vCol = aCol.rgb; vAlpha = aCol.w; vBokeh = 0.0;
          float t = aTam * uEsc;
          if (t < 1.2) { vAlpha *= t * t / 1.44; t = 1.2; }
          gl_PointSize = t;
          if (vAlpha < 0.001) gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
        }`,
      fragmentShader: GLSL_PUNTO_FRAG,
      transparent: true, depthTest: false, depthWrite: false, blending,
    });
    const o = new THREE.Points(geo, mat);
    o.frustumCulled = false; o.renderOrder = orden;
    arriba.add(o);
    let m = 0;
    return {
      n,
      limpiar() { m = 0; },
      add(x, y, r, g, b, a, t) { if (m >= n || a < 0.001) return; pos[m * 3] = x; pos[m * 3 + 1] = y; col.set([r, g, b, a], m * 4); tam[m] = t; m++; },
      fin() {
        for (let i = m; i < n; i++) col[i * 4 + 3] = 0;
        geo.attributes.position.needsUpdate = true; geo.attributes.aCol.needsUpdate = true; geo.attributes.aTam.needsUpdate = true;
        mat.uniforms.uEsc.value = P.escala;
        o.visible = m > 0;
      },
    };
  };
  // un rectángulo oscuro translúcido (fondo de la pizarra), en px de pantalla
  P.panel = (orden = 15) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: { uR: { value: new THREE.Vector4(0, 0, 1, 1) }, uA: { value: 0 }, uRad: { value: 14 } },
      vertexShader: /* glsl */ `varying vec2 vPx; void main() { vPx = vec2((position.x * 0.5 + 0.5) * 1920.0, (0.5 - position.y * 0.5) * 1080.0); gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform vec4 uR; uniform float uA, uRad; varying vec2 vPx;
        void main() {
          vec2 c = uR.xy, h = uR.zw * 0.5;
          vec2 q = abs(vPx - c) - h + uRad;
          float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRad;
          float a = uA * (1.0 - smoothstep(-1.5, 1.5, d));
          if (a < 0.002) discard;
          gl_FragColor = vec4(0.004, 0.007, 0.018, a);
        }`,
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.NormalBlending,
    }));
    mesh.frustumCulled = false; mesh.renderOrder = orden;
    arriba.add(mesh);
    return (x, y, w, h, a) => { mesh.material.uniforms.uR.value.set(x, y, w, h); mesh.material.uniforms.uA.value = a; mesh.visible = a > 0.002; };
  };

  // ── fuentes ──
  if (fuentes.length) {
    try {
      await Promise.race([
        Promise.all(fuentes.map(([f, txt]) => document.fonts.load(f, txt))).then(() => document.fonts.ready),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
    } catch (e) { /* sin fuentes: las de reserva */ }
  }

  // ── render ──
  // o: { zoomK (≥1: factor de escala recorrido durante la exposición), zoomC [px], bloom: [fuerza, radio, umbral] }
  P.render = (t, o = {}) => {
    U.uTime.value = t;
    P.fondo.uTime.value = t;
    P.estrellasFondo.uTime.value = t;
    P.estrellasFondo.uEsc.value = P.escala;
    const k = o.zoomK ?? 1;
    pasoZoom.enabled = Math.abs(Math.log(k)) > 0.004;
    pasoZoom.uniforms.uK.value = k;
    const zc = o.zoomC ?? [960, 540];
    pasoZoom.uniforms.uC.value.set(zc[0] / 1920, 1 - zc[1] / 1080);
    pasoZoom.uniforms.uGiro.value = o.zoomGiro ?? 0;
    const [bf, br, bu] = o.bloom ?? [0.75, 0.45, 0.32];
    bloom.strength = bf; bloom.radius = br; bloom.threshold = bu;
    acabado.uniforms.uSemilla.value = Math.floor(t * 30) % 240;
    composer.render();
    // en captura se espera a que la GPU (SwiftShader) termine: así el tiempo medido es el coste real
    if (CAPTURA) renderer.getContext().readPixels(0, 0, 1, 1, renderer.getContext().RGBA, renderer.getContext().UNSIGNED_BYTE, _px);
  };

  P.ctx2d = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, capa.width, capa.height);
    ctx.setTransform(P.escala, 0, 0, P.escala, 0, 0);
    return ctx;
  };
  return P;
}

// ── la regla de potencias de diez ─────────────────────────────────────────────
// Cinta vertical: la década n está en y = y0 − n·D + desliz; el marcador está en la década z (real).
// La potencia que está en el marcador se ve grande (se lee en el móvil); las demás, pequeñas y tenues.
export const F_REGLA = (s, w = 600) => `${w} ${s}px "Inter Tight", "Helvetica Neue", Arial, sans-serif`;
const SUP = { '-': '⁻', '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
export function potencia(ctx, n, x, y, tam, al, color, alfa, glow = 0) {
  if (alfa <= 0.003) return;
  const exp = (n < 0 ? '−' : '') + Math.abs(n);
  const fb = F_REGLA(tam), fs = F_REGLA(Math.round(tam * 0.62)), fm = F_REGLA(Math.round(tam * 0.8), 500);
  ctx.font = fb; const w10 = ctx.measureText('10').width;
  ctx.font = fs; const we = ctx.measureText(exp).width;
  ctx.font = fm; const wm = ctx.measureText('m').width;
  const hueco = tam * 0.04, esp = tam * 0.26, total = w10 + hueco + we + esp + wm;
  const x0 = x - total * al;
  ctx.globalAlpha = alfa; ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  if (glow) { ctx.shadowColor = 'rgba(140,200,255,0.55)'; ctx.shadowBlur = glow; }
  ctx.font = fb; ctx.fillText('10', x0, y);
  ctx.font = fs; ctx.fillText(exp, x0 + w10 + hueco, y - tam * 0.42);
  ctx.font = fm; ctx.fillText('m', x0 + w10 + hueco + we + esp, y);
  ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
  ctx.globalAlpha = 1;
}
// r: { z, desliz (px), x (de la cinta), y0, D, golpe (0..1, destello del marcador), alfa, min, max }
export function regla(ctx, r) {
  const { z, desliz = 0, x = 1712, y0 = 214, D = 150, golpe = 0, alfa = 1, nMin = -6, nMax = 24, yTop = 92, yBot = 868 } = r;
  const yM = y0 - z * D + desliz;
  ctx.save();
  // panel: degradado oscuro a la derecha, con un filo fino (se lee sobre la ciudad, la Tierra o el Sol)
  const g = ctx.createLinearGradient(x - 330, 0, 1920, 0);
  g.addColorStop(0, 'rgba(1,2,6,0)'); g.addColorStop(0.35, 'rgba(1,2,6,0.5)'); g.addColorStop(1, 'rgba(1,2,6,0.72)');
  ctx.globalAlpha = alfa; ctx.fillStyle = g; ctx.fillRect(x - 330, 0, 1920 - x + 330, 1080);
  // la cinta: puntos finos, como las órbitas de Atom
  const fade = (y) => cl((y - yTop) / 60) * cl((yBot - y) / 60);
  for (let y = yTop; y <= yBot; y += 7) {
    ctx.globalAlpha = alfa * 0.55 * fade(y);
    ctx.fillStyle = '#7fb8ff';
    ctx.fillRect(x - 1, y - 1, 2, 2);
  }
  // marcas de década y subdivisiones logarítmicas
  for (let n = nMin; n <= nMax; n++) {
    const y = y0 - n * D + desliz;
    if (y < yTop - D || y > yBot + D) continue;
    for (let m = 2; m <= 9; m++) {
      const ym = y - D * Math.log10(m);
      const f = fade(ym);
      if (f <= 0) continue;
      ctx.globalAlpha = alfa * 0.38 * f; ctx.fillStyle = '#9cc4ff';
      ctx.fillRect(x + 6, ym - 0.6, m === 5 ? 9 : 5, 1.2);
    }
    const f = fade(y);
    if (f <= 0) continue;
    const act = cl(1 - Math.abs(y - yM) / (D * 0.72));
    const e = act * act * (3 - 2 * act);
    ctx.globalAlpha = alfa * f * (0.5 + 0.5 * e); ctx.fillStyle = '#e9f2ff';
    ctx.fillRect(x - 16, y - 1, 32, 2);
    const tam = mix(30, 62, e);
    potencia(ctx, n, x - 34 - 10 * e, y + tam * 0.36, tam, 1, e > 0.5 ? '#F4F8FF' : '#AFC3E6', alfa * f * (0.62 + 0.38 * e), e > 0.5 ? 14 * e : 0);
  }
  // el marcador: una cuenta de luz con su halo (como la cabeza de un electrón) y dos pestañas
  const R = 9 + 3 * golpe;
  let gr = ctx.createRadialGradient(x, yM, 0, x, yM, R * 5.5);
  gr.addColorStop(0, 'rgba(160,220,255,0.55)'); gr.addColorStop(0.25, 'rgba(90,170,255,0.18)'); gr.addColorStop(1, 'rgba(60,140,255,0)');
  ctx.globalAlpha = alfa; ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, yM, R * 5.5, 0, TAU); ctx.fill();
  gr = ctx.createRadialGradient(x - R * 0.25, yM - R * 0.3, 0, x, yM, R);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.5, '#cdeeff'); gr.addColorStop(1, 'rgba(120,200,255,0.85)');
  ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, yM, R, 0, TAU); ctx.fill();
  ctx.strokeStyle = 'rgba(214,236,255,0.9)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - R - 18, yM); ctx.lineTo(x - R - 6, yM); ctx.moveTo(x + R + 6, yM); ctx.lineTo(x + R + 18, yM); ctx.stroke();
  if (golpe > 0.01) {
    ctx.globalAlpha = alfa * golpe * 0.7; ctx.strokeStyle = '#bfe6ff'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, yM, R + 10 + 26 * (1 - golpe), 0, TAU); ctx.stroke();
  }
  ctx.restore();
}

// ── la calle de noche y el barrio (compartidos por las dos escenas) ───────────
// ── colores ──────────────────────────────────────────────────────────────────
export const SODIO = [1.0, 0.6, 0.26], LED = [0.86, 0.92, 1.0], VENTANA = [1.0, 0.72, 0.4], TV = [0.55, 0.72, 1.0];
export const FRIO = [0.48, 0.6, 0.95], ROJO = [1.0, 0.16, 0.1], FARO = [1.0, 0.95, 0.85];

// ── nivel 1: la calle y la casa (m) ──────────────────────────────────────────
export function construirCalle() {
  // V: luces de las casas (ventanas y farolillos), aparte para que no salgan desenfocadas en el plano de la persona
  const E_ = new Luces(30000), L = new Luces(20000), V = new Luces(12000);
  const r = azar(101);
  const linea = (a, b, paso, col, int, tam, dst = E_) => {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), n = Math.max(1, Math.round(d / paso));
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      dst.add(mix(a[0], b[0], u) + (r() - 0.5) * 0.04, mix(a[1], b[1], u) + (r() - 0.5) * 0.04, mix(a[2], b[2], u) + (r() - 0.5) * 0.04, ...col, int * (0.7 + 0.6 * r()), tam, 0, 0.1, r());
    }
  };
  // casas: en el norte detrás de la persona (dejando un hueco tras ella) y en el sur
  const casas = [];
  for (const dir of [-1, 1]) {
    let x = dir * 2.6;
    while (Math.abs(x) < 100) {
      const w = 8.5 + 3.5 * r();
      const x0 = dir > 0 ? x : x - w, x1 = dir > 0 ? x + w : x;
      casas.push({ x0, x1, z0: -16.5 - 2 * r(), z1: -7, pisos: r() < 0.65 ? 2 : 1, frente: 1 });
      x += dir * (w + 2.5 + 3 * r());
    }
  }
  for (let x = -100; x < 100;) {
    const w = 8.5 + 3.5 * r();
    casas.push({ x0: x, x1: x + w, z0: 18, z1: 27 + 2 * r(), pisos: r() < 0.6 ? 2 : 1, frente: -1 });
    x += w + 2.5 + 3 * r();
  }
  for (const c of casas) {
    const h = c.pisos * 3.1, hr = h + 2.4, zm = (c.z0 + c.z1) / 2;
    const e = 0.25, ci = 0.1, ct = 0.1;
    for (const x of [c.x0, c.x1]) for (const z of [c.z0, c.z1]) linea([x, 0, z], [x, h, z], e, FRIO, ci, ct);
    for (const y of [0, h]) {
      linea([c.x0, y, c.z0], [c.x1, y, c.z0], e, FRIO, ci, ct); linea([c.x0, y, c.z1], [c.x1, y, c.z1], e, FRIO, ci, ct);
      linea([c.x0, y, c.z0], [c.x0, y, c.z1], e, FRIO, ci, ct); linea([c.x1, y, c.z0], [c.x1, y, c.z1], e, FRIO, ci, ct);
    }
    // tejado a dos aguas (cumbrera paralela a la calle) con un punteado de tejas
    linea([c.x0, hr, zm], [c.x1, hr, zm], e, FRIO, ci * 1.3, ct);
    for (const x of [c.x0, c.x1]) { linea([x, h, c.z0], [x, hr, zm], e, FRIO, ci, ct); linea([x, h, c.z1], [x, hr, zm], e, FRIO, ci, ct); }
    for (let x = c.x0 + 0.5; x < c.x1; x += 0.7) for (let u = 0.08; u < 1; u += 0.13) {
      for (const z of [c.z0, c.z1]) E_.add(x + (r() - 0.5) * 0.3, mix(h, hr, u), mix(z, zm, u), ...FRIO, 0.03 + 0.02 * r(), 0.14, 0, 0, r());
    }
    // ventanas (encendidas o no) en las dos fachadas largas y una puerta con su farolillo
    const w = c.x1 - c.x0, nv = w > 10 ? 3 : 2;
    for (const zf of [c.z0, c.z1]) {
      const calle = (zf === c.z1) === (c.frente > 0);
      for (let p = 0; p < c.pisos; p++) {
        for (let k = 0; k < nv; k++) {
          const xc = c.x0 + (w * (k + 0.5)) / nv, y0 = p * 3.1 + 0.95;
          if (calle && p === 0 && k === Math.floor(nv / 2)) {
            V.add(xc, 2.45, zf + c.frente * 0.15, 1.0, 0.82, 0.55, 0.8, 0.16, 0, 0.05, r());
            for (let q = 0; q < 10; q++) V.add(xc + (r() - 0.5) * 1.6, 0.02, zf + c.frente * (0.3 + 2 * r() ** 2), 1.0, 0.7, 0.4, 0.016, 1.4, 0, 0, r());
            linea([xc - 0.5, 0, zf], [xc - 0.5, 2.1, zf], 0.25, FRIO, 0.04, 0.08); linea([xc + 0.5, 0, zf], [xc + 0.5, 2.1, zf], 0.25, FRIO, 0.04, 0.08);
            continue;
          }
          const lit = r() < 0.55;
          const col = r() < 0.16 ? TV : VENTANA;
          if (lit) {
            for (let i = 0; i < 5; i++) for (let j = 0; j < 6; j++) V.add(xc - 0.44 + 0.22 * i + (r() - 0.5) * 0.05, y0 + 0.1 + 0.22 * j + (r() - 0.5) * 0.05, zf + c.frente * 0.03, ...col, 0.04 * (0.8 + 0.4 * r()), 0.6, 0, 0.04, r());
            if (p === 0) for (let q = 0; q < 8; q++) V.add(xc + (r() - 0.5) * 2.4, 0.02, zf + c.frente * (0.4 + 2.5 * r() ** 2), ...col, 0.012, 1.6, 0, 0, r());
          }
          for (let i = 0; i <= 5; i++) for (let j = 0; j <= 6; j++) {
            if (!(i === 0 || i === 5 || j === 0 || j === 6)) continue;
            E_.add(xc - 0.55 + (1.1 * i) / 5, y0 + (1.3 * j) / 6, zf, ...(lit ? col : FRIO), lit ? 0.07 : 0.035, 0.08, 0, 0, r());
          }
        }
      }
    }
    // árbol en el jardín de algunas casas
    if (r() < 0.55) {
      const tx = mix(c.x0, c.x1, 0.2 + 0.6 * r()), tz = c.frente > 0 ? c.z1 + 2.5 + 2 * r() : c.z0 - 2.5 - 2 * r(), rc = 1.8 + 1.2 * r(), hc = 3.6 + 1.5 * r();
      linea([tx, 0, tz], [tx, hc - rc * 0.6, tz], 0.35, [0.5, 0.42, 0.35], 0.04, 0.1);
      for (let q = 0; q < 170; q++) {
        const u = r() * 2 - 1, th = r() * TAU, s = Math.sqrt(1 - u * u), rr = rc * (0.75 + 0.25 * r());
        E_.add(tx + s * Math.cos(th) * rr, hc + u * rr * 0.85, tz + s * Math.sin(th) * rr, 0.3, 0.62, 0.48, 0.04 + 0.05 * Math.max(0, u), 0.2, 0, 0.15, r());
      }
    }
  }
  // farolas: cabeza brillante, poste tenue y charco de luz en el suelo
  const farola = (x, z, col) => {
    for (let q = 0; q < 12; q++) L.add(x + (r() - 0.5) * 0.4, 5.6 + (r() - 0.5) * 0.25, z + (r() - 0.5) * 0.4, ...col, 0.6, 0.32, 0, 0.03, r());
    linea([x, 0, z], [x, 5.4, z], 0.4, [0.55, 0.55, 0.6], 0.035, 0.08);
    // charco de luz: resplandor suave (pocas partículas grandes) y brillo fino del suelo
    for (let q = 0; q < 36; q++) {
      const d = 6 * Math.sqrt(r()), a = r() * TAU, f = (1 - d / 8) ** 2;
      L.add(x + d * Math.cos(a), 0.02, z + d * Math.sin(a), ...col, 0.03 * f, 3.4, 0, 0, r());
    }
    for (let q = 0; q < 160; q++) {
      const d = 8 * Math.sqrt(r()), a = r() * TAU, f = (1 - d / 8) ** 2;
      L.add(x + d * Math.cos(a), 0.02, z + d * Math.sin(a), ...col, 0.08 * f + 0.004, 0.12, 0, 0.2, r());
    }
  };
  for (let x = -87; x < 100; x += 24.5) if (Math.abs(x + 12) > 5) farola(x + 12, 1.6, SODIO);
  for (let x = -96; x < 100; x += 24.5) farola(x, 9.4, SODIO);
  // luz a los pies de la persona (está de pie sobre la acera)
  for (let q = 0; q < 50; q++) { const d = 0.55 * Math.sqrt(r()), a = r() * TAU; L.add(d * Math.cos(a), 0.01, 0.06 + d * Math.sin(a) * 0.6, 1.0, 0.82, 0.62, 0.02 * (1 - d / 0.55), 0.35, 0, 0, r()); }
  // calzada: bordillos, línea discontinua y grano del asfalto
  for (let x = -100; x < 100; x += 0.5) {
    E_.add(x, 0.02, 2.0, 0.7, 0.72, 0.8, 0.045, 0.08, 0, 0, r()); E_.add(x, 0.02, 9.0, 0.7, 0.72, 0.8, 0.045, 0.08, 0, 0, r());
    if (((x + 100) % 6) < 3) E_.add(x, 0.02, 5.5, 0.95, 0.95, 0.9, 0.09, 0.12, 0, 0, r());
  }
  for (let q = 0; q < 2600; q++) E_.add(-100 + 200 * r(), 0.02, 2 + 7 * r(), 0.75, 0.75, 0.85, 0.008 + 0.02 * r() ** 3, 0.08, 0, 0.3, r());
  for (let q = 0; q < 5000; q++) {
    const zz = r() < 0.5 ? -7 + 6 * r() : 12 + 6 * r(), cesped = r() < 0.7;
    E_.add(-100 + 200 * r(), 0.03, zz, ...(cesped ? [0.35, 0.62, 0.5] : [0.6, 0.65, 0.8]), 0.012 + 0.02 * r() ** 3, 0.09, 0, 0.2, r());
  }
  // un par de coches aparcados con las luces de posición
  for (const [cx, cz] of [[-21, 3.3], [33, 7.8]]) {
    for (const s of [-0.65, 0.65]) L.add(cx - 2.1, 0.75, cz + s, ...ROJO, 0.26, 0.16, 0, 0.02, r());
    for (const [a, b] of [[[cx - 2.2, 0.6, cz - 0.85], [cx + 2.2, 0.6, cz - 0.85]], [[cx - 2.2, 0.6, cz + 0.85], [cx + 2.2, 0.6, cz + 0.85]], [[cx - 1.2, 1.4, cz - 0.7], [cx + 0.9, 1.4, cz - 0.7]], [[cx - 1.2, 1.4, cz + 0.7], [cx + 0.9, 1.4, cz + 0.7]]]) linea(a, b, 0.3, FRIO, 0.04, 0.08);
  }
  return { estructura: E_, luces: L, casas: V };
}

// ── nivel 2: el barrio (unidad 10 m) ──────────────────────────────────────────
export const XS = (i) => 61 + 122 * i; export const ZS = (j) => 5.5 + 82 * j;
export function construirBarrio() {
  const dentro = new Luces(20000, { mov: true }), fuera = new Luces(70000, { mov: true });
  dentro.u = 10; fuera.u = 10;
  const r = azar(202);
  const enCalle = (x, z) => Math.abs(x) < 100 && z > -26 && z < 32;
  const add = (x, y, z, ...resto) => (enCalle(x, z) ? dentro : fuera).add(x, y, z, ...resto);
  const XE = 1500, ZE = 1050;
  const esAvenida = (i) => ((i % 4) + 4) % 4 === 2;
  const esAvenidaZ = (j) => ((j % 4) + 4) % 4 === 3;
  const parque = (x, z) => x > XS(-4) && x < XS(-2) && z > ZS(1) && z < ZS(3);
  // farolas
  const farola = (x, z, col, int) => {
    if (enCalle(x, z) && Math.abs(z - 5.5) < 8) return;   // las de la calle de la persona ya están en el nivel 1
    const k = add(x, 5.5, z, ...col, int * (0.8 + 0.4 * r()), 3.2, 0, 0.04, r());
    add(x, 0.1, z, ...col, int * 0.12, 17, 0, 0, r());
    return k;
  };
  for (let j = -14; j <= 14; j++) {
    const z = ZS(j); if (Math.abs(z) > ZE) continue;
    const av = esAvenidaZ(j), off = av ? 10 : 5.2, paso = av ? 24 : 27;
    for (let x = -XE; x < XE; x += paso) for (const s of [-1, 1]) farola(x + (s > 0 ? paso / 2 : 0) + (r() - 0.5) * 2, z + s * off, av ? LED : SODIO, av ? 0.85 : 0.7);
  }
  for (let i = -14; i <= 14; i++) {
    const x = XS(i); if (Math.abs(x) > XE) continue;
    const av = esAvenida(i), off = av ? 10 : 5.2, paso = av ? 24 : 27;
    for (let z = -ZE; z < ZE; z += paso) for (const s of [-1, 1]) farola(x + s * off, z + (s > 0 ? paso / 2 : 0) + (r() - 0.5) * 2, av ? LED : SODIO, av ? 0.85 : 0.7);
  }
  // casas: ventanas cálidas, contorno tenue del tejado y alguna luz de jardín
  for (let i = -14; i <= 13; i++) for (let j = -14; j <= 13; j++) {
    const xa = XS(i) + 8, xb = XS(i + 1) - 8, za = ZS(j) + 8, zb = ZS(j + 1) - 8;
    if (Math.abs(xa) > XE || Math.abs(za) > ZE) continue;
    const cerca = Math.max(Math.abs((xa + xb) / 2) / 900, Math.abs((za + zb) / 2) / 650) < 1;
    if (parque((xa + xb) / 2, (za + zb) / 2)) {
      for (let q = 0; q < 26; q++) { const a = (q / 26) * TAU; add(mix(xa, xb, 0.5 + 0.38 * Math.cos(a)), 3.5, mix(za, zb, 0.5 + 0.36 * Math.sin(a)), ...LED, 0.22, 1.8, 0, 0.05, r()); }
      for (let q = 0; q < 700; q++) add(mix(xa, xb, r()), 4, mix(za, zb, r()), 0.25, 0.55, 0.45, 0.025 * r(), 4, 0, 0.1, r());
      continue;
    }
    for (const lado of [0, 1, 2, 3]) {
      const largo = lado < 2 ? xb - xa : zb - za;
      for (let s = 6; s < largo - 6; s += 12 + 3 * r()) {
        let cx, cz;
        if (lado === 0) { cx = xa + s; cz = za + 6; } else if (lado === 1) { cx = xa + s; cz = zb - 6; } else if (lado === 2) { cx = xa + 6; cz = za + s; } else { cx = xb - 6; cz = za + s; }
        if (enCalle(cx, cz) && Math.abs(cz) < 30) continue;
        const nv = cerca ? 2 + Math.floor(r() * 3) : 1 + (r() < 0.4 ? 1 : 0);
        for (let q = 0; q < nv; q++) {
          if (r() < 0.25) continue;
          const col = r() < 0.15 ? TV : VENTANA;
          add(cx + (r() - 0.5) * 8, 2 + 3 * r(), cz + (r() - 0.5) * 7, ...col, 0.3 + 0.3 * r(), 1.3, 0, 0.06, r());
        }
        if (cerca) for (const [a, b] of [[-4.5, -4], [4.5, -4], [-4.5, 4], [4.5, 4]]) add(cx + a, 7, cz + b, ...FRIO, 0.02, 0.9, 0, 0, r());
        if (r() < 0.2) add(cx + (r() - 0.5) * 10, 1, cz + (r() - 0.5) * 10, 1.0, 0.85, 0.6, 0.28, 0.8, 0, 0.1, r());
        if (r() < 0.25) for (let q = 0; q < 14; q++) add(cx + 6 * (r() - 0.5) + 5, 4, cz + 6 * (r() - 0.5), 0.28, 0.6, 0.48, 0.02, 2.5, 0, 0.1, r());
      }
    }
  }
  // coches por las avenidas y algunas calles: faros blancos en un carril, pilotos rojos en el otro
  const coche = (x, z, dx, dz, v, largo, col, fase) => {
    for (const s of [-0.75, 0.75]) {
      const k = add(x + dz * s, 0.7, z - dx * s, ...col, col === ROJO ? 0.4 : 0.6, col === ROJO ? 0.9 : 1.2, 0, 0, fase);
      (enCalle(x, z) ? dentro : fuera).mov(k, dx, dz, v, largo);
    }
  };
  for (let i = -12; i <= 12; i++) {
    const x = XS(i); if (!esAvenida(i) && r() < 0.75) continue;
    const n = esAvenida(i) ? 14 : 3;
    for (let q = 0; q < n; q++) { coche(x - 3, -ZE, 0, 1, 11 + 4 * r(), 2 * ZE, FARO, r()); coche(x + 3, -ZE, 0, 1, -(11 + 4 * r()), 2 * ZE, ROJO, r()); }
  }
  for (let j = -12; j <= 12; j++) {
    const z = ZS(j); if (!esAvenidaZ(j) && r() < 0.8) continue;
    const n = esAvenidaZ(j) ? 14 : 3;
    for (let q = 0; q < n; q++) { coche(-XE, z - 3, 1, 0, 12 + 4 * r(), 2 * XE, FARO, r()); coche(-XE, z + 3, 1, 0, -(12 + 4 * r()), 2 * XE, ROJO, r()); }
  }
  return { dentro, fuera };
}

// ── la persona (atomo/plato/HUMANO.md) ────────────────────────────────────────
// Metros, de pie, brazos colgando; y hacia arriba desde la suela, z hacia la cámara, x a su izquierda.
// Medidas desde la coronilla (fracción de H): barbilla 0,17 · hombros 0,21 · codos y cintura 0,40 ·
// muñecas y entrepierna 0,53 · puntas de los dedos 0,63 · rodillas 0,73 · suelo 1. Hombros 0,25 H, caderas 0,19 H.
export const H_PERSONA = 1.7;
// zonas (colores de luz): 0 piel, 1 pelo, 2 camisa, 3 pantalón, 4 zapatos
export function persona({ n = 18000, semilla = 7, H = H_PERSONA } = {}) {
  const r = azar(semilla);
  const k = H / 1.7;
  const piezas = [];
  const elip = (c, s, peso, zona) => piezas.push({ tipo: 'e', c, s, peso, zona });
  const tubo = (a, b, ra, rb, peso, zona) => piezas.push({ tipo: 't', a, b, ra, rb, peso, zona });
  // tronco: secciones elípticas [y, ancho, fondo]
  const TRONCO = [[0.785, 0.2, 0.15], [0.81, 0.29, 0.185], [0.86, 0.323, 0.2], [0.95, 0.3, 0.188], [1.02, 0.272, 0.176],
    [1.12, 0.3, 0.19], [1.22, 0.344, 0.212], [1.285, 0.36, 0.2], [1.325, 0.31, 0.165], [1.352, 0.15, 0.12]];
  piezas.push({ tipo: 'loft', S: TRONCO, peso: 0.6 });
  // cabeza (coronilla 1,70; barbilla 1,405 → 0,17 H), con pelo en la parte de arriba y de atrás
  piezas.push({ tipo: 'cabeza', peso: 0.27 });
  for (const s of [-1, 1]) elip([s * 0.098, 1.54, -0.005], [0.014, 0.03, 0.02], 0.008, 0);   // orejas
  tubo([0, 1.33, -0.01], [0, 1.43, 0.0], 0.05, 0.047, 0.035, 0);
  // cuello de la camisa
  tubo([0, 1.335, -0.012], [0, 1.37, -0.008], 0.062, 0.056, 0.02, 2);
  for (const s of [-1, 1]) {
    // hombro: el borde exterior queda a 0,125 H del centro → 0,25 H de ancho
    elip([s * 0.162, 1.296, -0.005], [0.05, 0.052, 0.055], 0.05, 2);
    // brazo (hombro 1,325 → codo 1,02 = 0,40 H) y antebrazo (codo → muñeca 0,80 = 0,53 H); manga hasta el codo
    tubo([s * 0.168, 1.325, -0.005], [s * 0.19, 1.02, -0.015], 0.047, 0.039, 0.16, 2);
    tubo([s * 0.19, 1.02, -0.015], [s * 0.202, 0.8, 0.0], 0.036, 0.028, 0.11, 0);
    // mano (puntas de los dedos en 0,63 H), con el pulgar hacia delante
    elip([s * 0.21, 0.748, 0.0], [0.039, 0.055, 0.021], 0.045, 0);
    elip([s * 0.212, 0.67, 0.0], [0.035, 0.043, 0.017], 0.035, 0);
    tubo([s * 0.178, 0.775, 0.012], [s * 0.172, 0.712, 0.022], 0.012, 0.01, 0.01, 0);
    // pierna: cadera → rodilla (0,46 = 0,73 H) → tobillo; pantalón
    tubo([s * 0.088, 0.84, 0.0], [s * 0.082, 0.46, 0.006], 0.08, 0.054, 0.3, 3);
    tubo([s * 0.082, 0.46, 0.006], [s * 0.077, 0.085, -0.008], 0.053, 0.042, 0.22, 3);
    elip([s * 0.083, 0.46, 0.035], [0.036, 0.034, 0.025], 0.01, 3);   // rodilla
    // zapato (0,15 H), suela en y = 0
    elip([s * 0.085, 0.034, -0.005], [0.047, 0.034, 0.1], 0.065, 4);
  }
  const total = piezas.reduce((s, p) => s + p.peso, 0);
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), info = new Float32Array(n * 4);
  let i = 0;
  const poner = (x, y, z, nx, ny, nz, zona) => {
    if (i >= n) return;
    const L = Math.hypot(nx, ny, nz) || 1;
    pos[i * 3] = x * k; pos[i * 3 + 1] = y * k; pos[i * 3 + 2] = z * k;
    nor[i * 3] = nx / L; nor[i * 3 + 1] = ny / L; nor[i * 3 + 2] = nz / L;
    const chispa = r() < 0.05;
    // x: zona·10 + brillo; y: tamaño (m); z: retraso al deshacerse (de los pies a la cabeza); w: azar
    info[i * 4] = zona * 10 + (chispa ? 2.0 : 0.75 + 0.5 * r());
    info[i * 4 + 1] = (chispa ? 0.0085 : 0.0058 + 0.0022 * r()) * k;
    info[i * 4 + 2] = cl((y / 1.7) * 0.82 + 0.18 * r());
    info[i * 4 + 3] = r();
    i++;
  };
  const esfera = () => { const u = r() * 2 - 1, th = r() * TAU, s = Math.sqrt(1 - u * u); return [s * Math.cos(th), u, s * Math.sin(th)]; };
  for (const p of piezas) {
    const cuantas = Math.round((n * 0.78 * p.peso) / total);
    for (let q = 0; q < cuantas; q++) {
      if (p.tipo === 'cabeza') {
        // coronilla 1,70 · barbilla 1,405: semialto 0,1475; la mandíbula se estrecha
        const [x, y, z] = esfera();
        const cy = 1.5525, a = 0.1475;
        const ta = ss(0.1, -1, y);
        const w = 0.1 * (1 - 0.17 * ta * ta), d = 0.112 * (1 - 0.1 * ta);
        const pelo = y > 0.42 - 0.5 * Math.max(0, -z) || z < -0.35;
        const e = pelo ? 1.05 + 0.03 * r() : 1;
        poner(x * w * e, cy + y * a * (pelo ? 1.02 : 1), z * d * e + (1 - ta) * 0.0 + 0.004 * ta, x / w, y / a, z / d, pelo ? 1 : 0);
      } else if (p.tipo === 'e') {
        const [x, y, z] = esfera();
        let zona = p.zona, esc = 1;
        if (zona < 0) {
          // cráneo: pelo por encima de la frente y por detrás; cara por delante
          const frente = z > 0.25 && y < 0.25;
          zona = frente ? 0 : 1; esc = frente ? 1 : 1.05 + 0.03 * r();
        }
        poner(p.c[0] + x * p.s[0] * esc, p.c[1] + y * p.s[1] * esc, p.c[2] + z * p.s[2] * esc, x / p.s[0], y / p.s[1], z / p.s[2], zona);
      } else if (p.tipo === 't') {
        const t = r(), th = r() * TAU;
        const ax = p.b[0] - p.a[0], ay = p.b[1] - p.a[1], az = p.b[2] - p.a[2];
        const L = Math.hypot(ax, ay, az), ux = ax / L, uy = ay / L, uz = az / L;
        let vx = -uy, vy = ux, vz = 0;
        const lv = Math.hypot(vx, vy, vz) || 1; vx /= lv; vy /= lv; vz /= lv;
        const wx = uy * vz - uz * vy, wy = uz * vx - ux * vz, wz = ux * vy - uy * vx;
        const rad = mix(p.ra, p.rb, t);
        const cx = p.a[0] + ax * t, cy = p.a[1] + ay * t, cz = p.a[2] + az * t;
        const nx = Math.cos(th) * vx + Math.sin(th) * wx, ny = Math.cos(th) * vy + Math.sin(th) * wy, nz = Math.cos(th) * vz + Math.sin(th) * wz;
        poner(cx + nx * rad, cy + ny * rad, cz + nz * rad, nx, ny, nz, p.zona);
      } else {
        const S = p.S;
        const y = mix(S[0][0], S[S.length - 1][0], r());
        let j = 0;
        while (j < S.length - 2 && S[j + 1][0] < y) j++;
        const u = lin(y, S[j][0], S[j + 1][0]), e = u * u * (3 - 2 * u);
        const w = mix(S[j][1], S[j + 1][1], e) / 2, d = mix(S[j][2], S[j + 1][2], e) / 2;
        const th = r() * TAU;
        const dy = (S[j + 1][1] - S[j][1]) / 2 / (S[j + 1][0] - S[j][0]);
        // camisa por encima del cinturón (0,95 m), pantalón por debajo
        poner(Math.cos(th) * w, y, Math.sin(th) * d, Math.cos(th) / w, -dy * 0.6, Math.sin(th) / d, y > 0.95 ? 2 : 3);
      }
    }
  }
  // un 20 % de las partículas, dentro del cuerpo (brillo bajo), y unas pocas grandes y tenues: resplandor interno
  const nSup = i;
  const nInt = Math.floor((n - nSup) * 0.92);
  for (let q = 0; q < nInt && i < n; q++) {
    const j = Math.floor(r() * nSup);
    const f = 0.35 + 0.55 * r();
    const x = pos[j * 3] / k - nor[j * 3] * 0.05 * f, y = pos[j * 3 + 1] / k - nor[j * 3 + 1] * 0.05 * f, z = pos[j * 3 + 2] / k - nor[j * 3 + 2] * 0.05 * f;
    const zona = Math.floor(info[j * 4] / 10 + 0.001);
    poner(x, y, z, r() - 0.5, r() - 0.5, r() - 0.5, zona);
    info[(i - 1) * 4] = zona * 10 + 0.45 + 0.25 * r();
  }
  while (i < n) {
    const j = Math.floor(r() * nSup);
    poner(pos[j * 3] / k - nor[j * 3] * 0.04, pos[j * 3 + 1] / k - nor[j * 3 + 1] * 0.04, pos[j * 3 + 2] / k - nor[j * 3 + 2] * 0.04, 0, 0, 1, 5);
    info[(i - 1) * 4] = 50 + 1;
    info[(i - 1) * 4 + 1] = 0.07 * k;
  }
  return { pos, nor, info, n };
}

// material de la persona: luz de contorno, zonas de color, ola de luz y, si se pide, dispersión: las chispas
// bajan por los pies a la calle y corren por las calles hasta su sitio (nivel de destino, p. ej. el barrio)
export function materialPersona(P) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ...P.U, uAlpha: { value: 1 }, uEsc: { value: 1 }, uOla: { value: -10 }, uDisp: { value: 0 },
      uMVdest: { value: new THREE.Matrix4() }, uEscDest: { value: 1 }, uTamDest: { value: 1 }, uSalida: { value: new THREE.Vector3(0, 0.05, 0.55) },
      uBrillo: { value: 1 },
    },
    vertexShader: /* glsl */ `
      ${GLSL_EMITIR}
      ${GLSL_RUIDO}
      uniform float uTime, uEsc, uOla, uDisp, uEscDest, uTamDest, uBrillo;
      uniform mat4 uMVdest;
      uniform vec3 uSalida;
      attribute vec3 aNor;
      attribute vec4 aInfo;
      attribute vec4 aDest;      // xyz destino (unidades del nivel de destino); w: brillo final
      attribute vec4 aVia;       // dos esquinas del camino por las calles (x, z)
      attribute vec3 aDestCol;
      const vec3 ZC0 = vec3(1.0, 0.76, 0.56);   // piel
      const vec3 ZC1 = vec3(1.0, 0.56, 0.26);   // pelo
      const vec3 ZC2 = vec3(1.0, 0.92, 0.8);    // camisa
      const vec3 ZC3 = vec3(0.56, 0.7, 1.0);    // pantalón
      const vec3 ZC4 = vec3(0.92, 0.72, 0.52);  // zapatos
      const vec3 ZC5 = vec3(1.0, 0.78, 0.55);   // resplandor interno
      void main() {
        float zona = floor(aInfo.x / 10.0 + 0.001);
        float b0 = aInfo.x - zona * 10.0;
        vec3 zc = zona < 0.5 ? ZC0 : zona < 1.5 ? ZC1 : zona < 2.5 ? ZC2 : zona < 3.5 ? ZC3 : zona < 4.5 ? ZC4 : ZC5;
        float zb = zona < 0.5 ? 1.05 : zona < 1.5 ? 0.85 : zona < 2.5 ? 1.0 : zona < 3.5 ? 0.85 : zona < 4.5 ? 0.7 : 0.03;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 nv = normalize(normalMatrix * aNor);
        vec3 vv = normalize(-mv.xyz);
        float rim = 1.0 - abs(dot(nv, vv));
        float br = 0.62 * uBrillo * b0 * zb * (zona > 4.5 ? 1.0 : 0.5 + 1.3 * pow(rim, 2.0));
        // el lado que mira a Atom (derecha de la pantalla) recibe su luz fría
        float lado = clamp(nv.x * 0.6 + 0.4, 0.0, 1.0);
        vec3 col = mix(zc, vec3(0.62, 0.86, 1.0), 0.45 * lado * rim);
        col = mix(col, vec3(1.0, 0.95, 0.88), 0.2 * (1.0 - rim));
        // ola de luz que recorre el cuerpo
        float ola = exp(-pow((position.y - uOla) / 0.11, 2.0));
        br *= 1.0 + 1.8 * ola;
        col = mix(col, vec3(0.75, 0.95, 1.0), 0.5 * ola);
        br *= 0.86 + 0.14 * sin(uTime * (1.6 + 3.0 * aInfo.w) + aInfo.w * 31.0);
        float tam = aInfo.y * uEsc;
        if (uDisp > 0.0) {
          float q = clamp((uDisp - aInfo.z * 0.55) / 0.45, 0.0, 1.0);
          if (q > 0.0) {
            // 1) baja a la calle; 2) corre por las calles (esquinas aVia) hasta el destino
            vec3 A = uSalida, B = vec3(aVia.x, uSalida.y, aVia.y), Cc = vec3(aVia.z, uSalida.y, aVia.w), D = aDest.xyz;
            float l1 = length(B - A), l2 = length(Cc - B), l3 = length(D - Cc), L = l1 + l2 + l3 + 1e-4;
            float e0 = smoothstep(0.0, 0.22, q);
            float e1 = clamp((q - 0.18) / 0.82, 0.0, 1.0);
            e1 = 1.0 - pow(1.0 - e1, 2.2);
            float s = e1 * L;
            vec3 pp = s < l1 ? mix(A, B, s / max(l1, 1e-4)) : s < l1 + l2 ? mix(B, Cc, (s - l1) / max(l2, 1e-4)) : mix(Cc, D, (s - l1 - l2) / max(l3, 1e-4));
            pp.y = mix(uSalida.y, D.y, smoothstep(0.85, 1.0, e1));
            vec4 md = uMVdest * vec4(pp, 1.0);
            vec3 p = mix(mv.xyz, md.xyz, e0);
            float d = max(-p.z, 1e-6);
            vec3 c = curl(vec3(p.xy / d * 3.0, aInfo.w * 5.0 + q));
            float viaje = e0 * (1.0 - smoothstep(0.9, 1.0, e1));
            p.xy += c.xy / (length(c.xy) + 1.0) * 0.012 * d * viaje;
            mv = vec4(p, 1.0);
            float llega = exp(-pow((e1 - 1.0) / 0.06, 2.0));
            col = mix(col, mix(vec3(1.0, 0.86, 0.62), aDestCol, smoothstep(0.7, 1.0, e1)), e0);
            br = mix(br, mix(0.55, aDest.w, smoothstep(0.85, 1.0, e1)) * (1.0 + 2.0 * llega), e0);
            tam = mix(tam, uTamDest * uEscDest * (1.0 + 0.8 * llega), e0);
          }
        }
        emitir(mv, tam, col, br, 1.25);
      }`,
    fragmentShader: GLSL_PUNTO_FRAG,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}
