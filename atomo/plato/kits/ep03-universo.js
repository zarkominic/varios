// KIT DEL EPISODIO 3 · «UNIVERSO» (kits/ep03-universo.js). EN CONSTRUCCIÓN (lo crea ep3-universo).
import { GLSL_REMATES } from '/atomo/plato/kits/plastilina-adulta.js';

const W = 1920, H = 1080;
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);

// ---------------------------------------------------------------- el cielo: un WebGL propio (la red, la esfera, la niebla)
const PRELUDIO = /* glsl */`#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;
vec3 gG; vec3 gEm; float gBri; float gTr;
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float capsulaC(vec3 p, vec3 a, vec3 b, float r1, float r2) {
  vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(r1, r2, h);
}
`;
const GLSL_CIELO = /* glsl */`
uniform vec2 uRes;
uniform vec4 uRed;    // centro (px de diseño, y hacia abajo) · px por unidad de p · fuerza de la luz propia
uniform vec4 uRedO;   // p en el centro · velo (0…1: cuánto se ve la red) · hervor (n)
uniform vec4 uEsf;    // centro (px) · radio (px) · k (0…1)
uniform vec4 uEsf2;   // borde de niebla · cristal · fuera (oscurece lo de fuera) · aumento (lupa del cristal)
const vec3 LCOL = vec3(1.0, 0.80, 0.60);
const vec3 LDIR = vec3(-0.55, 0.62, 0.56);
const vec3 FCOL = vec3(0.24, 0.31, 0.48);
const vec3 FDIR = vec3(0.78, 0.22, 0.58);
vec2 disenio() { return vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) * (${W.toFixed(1)} / uRes.x); }
vec3 luzArcilla(vec3 alb, vec3 n, float bri) {
  vec3 L = normalize(LDIR), F = normalize(FDIR);
  float dif = max(dot(n, L), 0.0), fil = max(dot(n, F), 0.0);
  vec3 h = normalize(L + vec3(0.0, 0.0, 1.0));
  float esp = pow(max(dot(n, h), 0.0), 24.0) * 0.06 * bri;
  return alb * (LCOL * dif * 1.25 + FCOL * fil * 0.55 + 0.22) + LCOL * esp;
}
vec3 redEn(vec2 P) {
  vec2 p = uRedO.xy + vec2(P.x - uRed.x, uRed.y - P.y) / uRed.z;
  vec3 alb = colorRed(p, 1.0);
  // la arcilla hierve: un relieve finísimo que cambia con cada fotograma
  float hv = vnoise(vec3(P * 0.11, uRedO.w * 1.7)) - 0.5;
  vec3 n = normalize(vec3(-gG.xy * 3.0 + 0.05 * vec2(hv, -hv), 1.0));
  return luzArcilla(alb, n, gBri) + gEm * uRed.w;
}
void main() {
  vec2 P = disenio();
  vec3 col = redEn(P);
  float a = uRedO.z;
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));
  fragColor = vec4(col * a, a);
}
`;

function compilar(gl, tipo, src) {
  const sh = gl.createShader(tipo); gl.shaderSource(sh, src); gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh), m = /ERROR: 0:(\d+)/.exec(log), ls = src.split('\n');
    throw new Error('ep03-universo GLSL: ' + log + '\n' + (m ? ls.slice(Math.max(0, +m[1] - 3), +m[1] + 2).join('\n') : ''));
  }
  return sh;
}
const VERT = `#version 300 es\nvoid main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;

/** El cielo del universo en un lienzo WebGL propio (1920 × 1080 en captura). */
export function crearCielo({ escala = 1 } = {}) {
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.round(W * escala); lienzo.height = Math.round(H * escala);
  const gl = lienzo.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true, premultipliedAlpha: true, alpha: true, depth: false });
  const prog = (frag) => {
    const p = gl.createProgram();
    gl.attachShader(p, compilar(gl, gl.VERTEX_SHADER, VERT)); gl.attachShader(p, compilar(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const inf = gl.getActiveUniform(p, i); u[inf.name] = gl.getUniformLocation(p, inf.name); }
    return { p, u };
  };
  const pRed = prog(PRELUDIO + GLSL_REMATES + GLSL_CIELO);
  const vao = gl.createVertexArray();
  const px = new Uint8Array(4);
  function dibujar(est) {
    const r = est.red ?? {};
    gl.bindVertexArray(vao);
    gl.viewport(0, 0, lienzo.width, lienzo.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    const pr = pRed;
    gl.useProgram(pr.p);
    gl.uniform2f(pr.u.uRes, lienzo.width, lienzo.height);
    const c = r.centro ?? [960, 540];
    gl.uniform4f(pr.u.uRed, c[0], c[1], (r.celda ?? 60) * 4.2, r.luz ?? 1);
    const o = r.origen ?? [0, 0];
    gl.uniform4f(pr.u.uRedO, o[0], o[1], cl(r.velo ?? 1), est.n ?? 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return lienzo;
  }
  return { lienzo, gl, dibujar };
}
