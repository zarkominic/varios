// Kit de la segunda prueba de identidad en plastilina (cosmos-plastilina.html): de ti a la Vía Láctea.
// Se apoya en kits/plastilina-prueba.js (el plató, la persona, Atom y las piezas) y añade:
//  · TIPOS_COSMOS: la regla que se desliza (reglaC), con las etiquetas «10^e m» horneadas en una textura;
//  · crearMundo(): el «mundo en relieve», un plató de plastilina visto desde arriba que se aleja ×10 en
//    cada salto: casa y calle, barrio, ciudad, campos, región, la península, la Tierra, la Luna, el Sol,
//    las órbitas, las estrellas vecinas y la galaxia. Es un relieve (altura por píxel) que se ilumina
//    como la arcilla del plató (huellas, dispersión, luz cálida, sombras suaves) y hierve en cada
//    fotograma. Se dibuja entero en cada fotograma, sin fotos, a la escala que toque (zoom continuo).
//
// Coste. En este servidor (SwiftShader) un sombreador ejecuta todo su código en cada píxel, aunque esté
// dentro de un «if» que no se cumple. Por eso el mundo tiene cuatro variantes del sombreador, cada una
// con solo lo que se ve en su tramo de escalas (cerca · lejos · sol · espacio).

import * as THREE from 'three';
import { glslGlifos } from '/atomo/plato/kits/plastilina-prueba.js';

// =====================================================================================================
// La regla que se desliza
// =====================================================================================================
export const E_MIN = -4, E_MAX = 21;
const N_ETQ = E_MAX - E_MIN + 1;
// caja de cada etiqueta en unidades de etiqueta (el «10» mide 1 de alto y empieza en x = 0)
const ETQ = { X0: -0.15, X1: 2.6, Y0: -0.62, Y1: 0.78, CW: 320, CH: 160, K: 0.6 };
const f5 = (v) => Number(v).toFixed(5);

export const TIPOS_COSMOS = {
  reglaC: { radio: 2.0, glifos: [], glsl: /* glsl */`
// regla de potencias de diez que se desliza: el exponente uReglaC.x queda a la altura uReglaC.y (local);
// las filas cercanas a la flecha se ven más grandes (lupa, uReglaC.z) y la actual, en terracota
uniform sampler2D uEtiq;
uniform vec4 uReglaC;
const float RS = 0.75;
float etiqC(vec2 p, float e) {
  vec2 caja = vec2(${f5(ETQ.X1 - ETQ.X0)}, ${f5(ETQ.Y1 - ETQ.Y0)});
  vec2 uv = (p - vec2(${f5(ETQ.X0)}, ${f5(ETQ.Y0)})) / caja;
  vec2 cuv = clamp(uv, 0.0, 1.0);
  float fila = clamp(e - ${f5(E_MIN)}, 0.0, ${f5(N_ETQ - 1)});
  float d = texture(uEtiq, vec2(cuv.x, (fila + 0.03 + cuv.y * 0.94) / ${f5(N_ETQ)})).r * ${f5(ETQ.K)};
  return d + length((uv - cuv) * caja);
}
float reglaTintaC(vec3 q, out float cur) {
  float s = uReglaC.x, ya = uReglaC.y;
  float e = s + (q.y - ya) / RS;
  float er = floor(e + 0.5);
  float yr = ya + (er - s) * RS;
  const float XL = -0.56;
  float marcas = sdSeg(q.xy, vec2(XL, yr), vec2(XL + 0.24, yr));
  float e0 = floor(e);
  float y0 = ya + (e0 - s) * RS;
  for (int k = 2; k <= 9; k++) {
    float yk = y0 + log(float(k)) * 0.4342945 * RS;
    marcas = min(marcas, sdSeg(q.xy, vec2(XL, yk), vec2(XL + (k == 5 ? 0.15 : 0.09), yk)));
  }
  float dd = er - s;
  float esc = 0.205 * (1.0 + uReglaC.z * exp(-dd * dd * 2.4));
  float txt = etiqC((q.xy - vec2(XL + 0.3, yr)) / esc, er) * esc;
  txt += (er < ${f5(E_MIN - 0.5)} || er > ${f5(E_MAX + 0.5)}) ? 1e3 : 0.0;
  cur = 1.0 - smoothstep(0.2, 0.55, abs(dd));
  // la tinta se esconde en los bordes de arriba y de abajo
  float borde = smoothstep(1.83, 1.62, abs(q.y));
  float tinta = min(churro(marcas, q.z - 0.06, 0.017 * borde), churro(txt, q.z - 0.06, 0.0125 * mix(1.0, 1.3, cur) * borde));
  return max(tinta, abs(q.y) - 1.8);
}
float pz_reglaC(vec3 q, vec4 T, out float m) {
  float losa = sdRoundBox(q, vec3(0.64, 1.85, 0.06), 0.05);
  float cur;
  float t = reglaTintaC(q, cur);
  m = t < losa ? (cur > 0.5 ? 3.0 : 1.0) : (q.x < -0.57 ? 2.0 : 0.0);
  return smin(losa, t, 0.008);
}
float pzc_reglaC(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.62, 1.83, 0.05), 0.04); }
vec3 pzcol_reglaC(vec3 q, vec4 T, float m) {
  if (m > 2.5) return C_TERRA * 1.05;
  if (m > 1.5) return C_SAGE * 1.2;
  if (m > 0.5) return C_INK;
  return C_CREAM * (0.94 + 0.12 * vnoise(q * 4.0));
}
` },
};

// uniformes que necesita la regla (se pasan a crearPlato({ uniformes }))
export const uniformesRegla = () => ({ uEtiq: { value: null }, uReglaC: { value: new THREE.Vector4(0, 1.5, 0.45, 0) } });

// hornea en una textura la distancia 2D al trazo de cada etiqueta «10^e m» (una fila por exponente)
export function hornearEtiquetas(P) {
  const { CW, CH } = ETQ;
  const tipo = P.renderer.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType;
  const rt = new THREE.WebGLRenderTarget(CW, CH * N_ETQ, { type: tipo, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false });
  const frag = /* glsl */`
precision highp float;
out vec4 fragColor;
${glslGlifos('0123456789−m')}
float digito(int k, vec2 p) {
  float dp, d = 1e5;
  if (k == 0) d = g0(p, dp);
  if (k == 1) d = g1(p, dp);
  if (k == 2) d = g2(p, dp);
  if (k == 3) d = g3(p, dp);
  if (k == 4) d = g4(p, dp);
  if (k == 5) d = g5(p, dp);
  if (k == 6) d = g6(p, dp);
  if (k == 7) d = g7(p, dp);
  if (k == 8) d = g8(p, dp);
  if (k == 9) d = g9(p, dp);
  return d;
}
void main() {
  vec2 fc = gl_FragCoord.xy;
  int fila = int(floor(fc.y / ${f5(CH)}));
  int e = ${E_MIN} + fila;
  vec2 uv = vec2(fc.x / ${f5(CW)}, (fc.y - float(fila) * ${f5(CH)}) / ${f5(CH)});
  vec2 p = mix(vec2(${f5(ETQ.X0)}, ${f5(ETQ.Y0)}), vec2(${f5(ETQ.X1)}, ${f5(ETQ.Y1)}), uv);
  float dp;
  float d = min(g1(p - vec2(0.2, 0.0), dp), g0(p - vec2(0.66, 0.0), dp));
  vec2 pe = (p - vec2(1.02, 0.36)) / 0.58;
  float de;
  float xm;
  if (e < 0) { de = min(gmenos(pe - vec2(0.24, 0.0), dp), digito(-e, pe - vec2(0.8, 0.0))); xm = 2.1; }
  else if (e < 10) { de = digito(e, pe - vec2(0.28, 0.0)); xm = 1.82; }
  else { de = min(digito(e / 10, pe - vec2(0.28, 0.0)), digito(e - (e / 10) * 10, pe - vec2(0.84, 0.0))); xm = 2.12; }
  d = min(d, de * 0.58);
  d = min(d, gm((p - vec2(xm, -0.14)) / 0.72, dp) * 0.72);
  fragColor = vec4(clamp(d / ${f5(ETQ.K)}, 0.0, 1.0), 0.0, 0.0, 1.0);
}`;
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3, vertexShader: 'in vec3 position;\nvoid main() { gl_Position = vec4(position.xy, 0.0, 1.0); }', fragmentShader: frag,
    depthTest: false, depthWrite: false,
  });
  const esc = new THREE.Scene(); const me = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat); me.frustumCulled = false; esc.add(me);
  P.renderer.setRenderTarget(rt);
  P.renderer.render(esc, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));
  P.renderer.setRenderTarget(null);
  P.U.uEtiq.value = rt.texture;
  return rt;
}

// =====================================================================================================
// Los continentes: se pintan una vez (Canvas 2D) en la proyección ortográfica centrada en nosotros,
// que es justo como se ve la Tierra desde arriba. Canal R tierra · G montañas · B hielo (lienzo 1);
// R desierto · G bosque (lienzo 2).
// =====================================================================================================
export const NOSOTROS = { lat: 40.406, lon: -3.735 };   // el sitio de la persona (una ciudad de la Meseta)
const COSTAS = {
  eurasia: [36.0,-5.6, 36.7,-4.4, 36.8,-2.4, 36.7,-2.1, 37.6,-0.98, 38.3,-0.5, 38.75,0.2, 39.5,-0.33, 40.7,0.9, 41.4,2.2, 42.3,3.3, 42.7,3.05,
    43.5,3.9, 43.3,5.4, 43.7,7.3, 44.4,8.9, 44.1,9.8, 43.5,10.3, 42.4,11.2, 41.8,12.3, 40.8,14.2, 40.0,15.6, 38.0,15.7, 38.9,16.6, 40.0,16.6, 40.4,17.2, 39.8,18.4,
    41.1,16.9, 41.9,15.6, 43.6,13.5, 44.8,12.3, 45.4,12.3, 45.7,13.6, 45.3,14.4, 44.0,15.3, 43.5,16.4, 42.6,18.1, 41.3,19.4, 40.4,19.5, 39.6,19.9,
    38.3,21.2, 36.4,22.5, 37.4,23.2, 37.9,23.7, 38.4,24.1, 39.4,22.9, 40.6,22.9, 40.4,23.9, 40.9,25.9, 40.1,26.4, 39.4,26.2, 38.4,26.9, 37.0,27.4,
    36.7,28.3, 36.2,30.0, 36.9,30.7, 36.1,32.7, 36.8,34.5, 36.6,36.1, 35.5,35.8, 33.9,35.5, 32.8,35.0, 31.5,34.4, 31.0,32.5, 29.9,32.6,
    29.5,35.0, 27.5,35.6, 24.0,38.0, 21.5,39.2, 18.0,41.5, 15.0,42.8, 12.8,45.0, 13.5,48.5, 15.0,51.0, 16.5,52.5, 17.5,55.5, 19.0,57.8, 22.5,59.8,
    23.6,58.6, 24.5,56.4, 26.3,56.4, 25.0,55.0, 24.2,51.6, 25.8,51.6, 26.5,50.1, 28.0,49.0, 29.4,48.0, 30.0,48.9, 29.2,50.6, 27.2,56.3,
    25.6,59.5, 25.2,62.0, 25.0,66.5, 23.0,68.5, 21.0,72.5, 19.0,72.8, 15.5,73.8, 12.0,74.8, 9.0,76.5, 8.1,77.5, 10.3,79.8, 13.1,80.3,
    16.5,82.3, 20.0,86.5, 21.5,88.0, 22.5,91.0, 20.0,93.0, 16.5,95.0, 15.0,98.0, 10.0,99.0, 25.0,121.0, 35.0,125.0, 45.0,140.0, 60.0,160.0,
    70.0,160.0, 73.0,140.0, 77.0,105.0, 73.0,80.0, 71.5,72.0, 69.0,66.0, 68.5,54.0, 67.8,44.0, 66.3,41.5, 64.6,40.4, 64.8,36.6, 66.2,33.8,
    66.6,34.8, 67.2,41.0, 68.8,40.0, 69.3,33.0, 70.2,30.5, 71.1,25.8, 70.6,22.0, 69.6,18.9, 68.3,15.4, 67.3,14.4, 65.5,12.0, 63.4,10.4,
    62.5,6.2, 61.3,5.0, 60.4,5.3, 58.9,5.7, 58.1,8.0, 59.0,10.2, 59.6,10.6, 59.0,11.1, 57.7,11.9, 56.6,12.7, 55.6,13.0, 55.4,14.3, 56.2,14.7,
    56.7,16.4, 58.0,16.7, 59.3,18.1, 60.6,17.6, 62.4,17.3, 63.8,20.4, 65.6,22.1, 65.0,25.4, 64.2,24.2, 63.1,21.6, 61.5,21.5, 60.4,22.3,
    60.2,24.9, 60.5,27.8, 59.9,30.3, 59.5,28.0, 59.4,24.7, 58.4,23.6, 57.0,24.0, 57.6,22.0, 56.5,21.0, 55.7,21.1, 54.7,20.0, 54.4,18.7,
    54.8,17.5, 54.5,16.5, 53.9,14.2, 54.1,12.1, 54.3,10.9, 54.8,10.0, 55.6,10.6, 56.6,10.4, 57.7,10.6, 57.1,8.6, 56.0,8.1, 55.0,8.6,
    53.9,8.7, 53.5,7.0, 53.2,5.6, 52.9,4.8, 51.9,4.0, 51.2,2.8, 51.0,1.9, 50.1,1.5, 49.9,0.4, 49.5,0.1, 49.3,-0.4, 49.6,-1.6, 48.6,-2.0,
    48.7,-3.5, 48.4,-4.5, 47.8,-4.2, 47.2,-2.2, 46.2,-1.2, 45.0,-1.2, 43.5,-1.5, 43.3,-2.0, 43.3,-2.9, 43.5,-3.8, 43.6,-5.7, 43.4,-8.4,
    42.9,-9.3, 42.2,-8.8, 41.1,-8.7, 39.6,-9.1, 38.7,-9.5, 37.9,-8.9, 37.0,-9.0, 37.0,-7.9, 37.2,-7.0, 36.5,-6.3],
  africa: [35.8,-5.8, 35.9,-5.3, 35.2,-3.0, 35.1,-2.0, 35.7,-0.6, 36.5,1.5, 36.8,3.0, 36.9,5.5, 36.9,8.6, 37.3,9.9, 37.1,11.0, 36.0,10.6,
    34.7,10.8, 33.9,10.1, 33.4,11.2, 32.9,13.2, 32.4,15.1, 31.2,16.3, 30.3,19.0, 31.0,20.0, 32.1,20.1, 32.9,22.0, 32.1,24.0, 31.6,25.2,
    31.2,29.9, 31.5,31.5, 31.3,32.3, 29.9,32.6, 27.9,33.6, 25.0,35.0, 22.0,36.8, 19.6,37.2, 17.0,38.8, 15.5,39.5, 13.0,42.0, 11.6,43.1,
    10.4,45.0, 11.3,48.5, 11.8,51.3, 9.5,50.8, 5.0,48.5, 2.0,45.3, -1.0,42.0, -4.0,39.7, -6.8,39.3, -10.5,40.4, -15.0,40.7, -17.5,37.5,
    -19.8,34.9, -22.0,35.5, -24.0,35.5, -25.9,32.6, -29.9,31.0, -33.0,27.9, -34.0,25.6, -34.4,22.0, -34.8,20.0, -34.0,18.4, -31.5,18.2,
    -28.6,16.5, -25.0,14.8, -22.9,14.5, -17.3,11.8, -13.5,12.5, -8.8,13.2, -6.0,12.3, -3.5,11.0, 0.4,9.4, 2.0,9.8, 3.9,9.5, 4.3,8.0,
    4.3,6.0, 6.4,3.4, 6.2,1.5, 5.6,-0.2, 5.0,-1.8, 5.2,-4.0, 4.4,-7.5, 5.0,-9.5, 6.3,-10.8, 7.5,-12.5, 8.5,-13.2, 10.0,-14.5, 11.5,-16.5,
    12.5,-16.7, 14.7,-17.4, 16.0,-16.5, 18.0,-16.0, 20.8,-17.0, 22.0,-16.5, 23.7,-15.9, 26.0,-14.5, 27.9,-12.9, 28.8,-11.0, 30.4,-9.6,
    31.5,-9.8, 32.5,-9.2, 33.6,-7.6, 34.0,-6.8, 35.0,-6.2],
  gb: [51.1,1.4, 51.5,1.0, 52.0,1.6, 52.9,1.7, 53.6,0.1, 54.5,-0.6, 55.0,-1.4, 56.0,-3.0, 56.5,-2.6, 57.1,-2.1, 57.7,-1.8, 57.6,-3.6,
    58.6,-3.0, 58.6,-5.0, 57.8,-5.8, 57.3,-6.0, 56.4,-5.5, 55.6,-4.9, 54.7,-4.9, 54.9,-3.4, 54.4,-3.5, 53.4,-3.0, 53.3,-4.5, 52.8,-4.6,
    51.8,-5.3, 51.6,-4.0, 51.4,-3.2, 50.7,-4.6, 50.1,-5.7, 50.4,-4.1, 50.6,-2.4, 50.8,-1.1, 50.8,-0.1],
  irlanda: [55.2,-7.3, 54.6,-5.6, 53.3,-6.2, 52.2,-6.4, 51.8,-8.5, 51.5,-9.8, 52.1,-10.3, 53.3,-9.0, 54.3,-10.0, 55.1,-8.3],
  islandia: [66.5,-23.0, 66.2,-15.0, 65.0,-13.6, 64.0,-15.5, 63.4,-18.5, 63.8,-22.7, 64.9,-24.0, 65.6,-24.5],
  corcega: [43.0,9.4, 42.0,9.5, 41.4,9.2, 41.9,8.6, 42.6,8.7],
  cerdena: [41.2,9.2, 40.9,9.7, 39.2,9.6, 38.9,8.6, 39.9,8.4, 40.9,8.2],
  sicilia: [38.3,12.4, 38.2,15.6, 37.0,15.3, 36.7,15.1, 37.1,14.2, 37.6,12.6],
  mallorca: [39.95,3.1, 39.6,3.5, 39.3,3.0, 39.6,2.35],
  ibiza: [39.1,1.6, 38.85,1.45, 38.95,1.2],
  creta: [35.5,23.6, 35.3,26.3, 35.0,26.2, 35.1,24.0],
  chipre: [35.6,34.6, 35.0,34.0, 34.6,33.0, 35.1,32.3, 35.4,33.4],
  madagascar: [-12.0,49.3, -15.5,50.3, -25.0,47.0, -25.5,45.2, -22.0,43.3, -16.0,44.5],
  srilanka: [9.8,80.0, 6.0,80.5, 7.0,81.8],
  groenlandia: [83.0,-35, 81.5,-15, 76.5,-18.5, 70.5,-22, 68.0,-31, 65.6,-37.6, 63.0,-41.5, 60.0,-43.5, 61.0,-48.0, 64.2,-51.7, 68.6,-53,
    70.5,-54, 74.5,-57.5, 76.5,-68.0, 78.5,-72.5, 81.5,-62],
  norteamerica: [60.0,-64.5, 58.0,-62.5, 55.0,-59.5, 52.5,-56.0, 50.5,-58.5, 49.0,-64.5, 48.8,-64.2, 47.0,-65.0, 45.5,-61.0, 44.5,-63.5,
    43.5,-65.7, 44.0,-69.0, 42.4,-70.9, 41.7,-70.0, 41.2,-72.0, 40.6,-74.0, 39.0,-74.5, 37.0,-76.0, 35.2,-75.5, 33.8,-78.0, 32.8,-79.9,
    30.3,-81.4, 27.0,-80.0, 25.8,-80.1, 25.1,-81.0, 26.5,-82.0, 27.9,-82.7, 29.5,-83.5, 30.0,-84.5, 30.4,-87.5, 29.0,-89.4, 29.5,-92.0,
    29.5,-94.8, 27.5,-97.3, 25.9,-97.2, 22.0,-97.8, 19.2,-96.1, 18.5,-94.5, 18.6,-91.5, 21.5,-90.3, 21.5,-87.0, 18.0,-88.0, 15.7,-88.5,
    16.0,-85.0, 15.0,-83.3, 11.0,-83.7, 9.4,-79.5, 8.0,-80.0, 15.0,-95.0, 22.0,-106.0, 32.0,-117.0, 50.0,-125.0, 60.0,-140.0, 70.0,-140.0,
    70.0,-120.0, 68.0,-100.0, 70.0,-90.0, 67.0,-87.0, 63.5,-90.5, 58.8,-94.2, 57.0,-92.0, 55.0,-82.5, 51.5,-80.0, 53.0,-78.8, 55.0,-77.5,
    58.5,-78.0, 60.5,-77.5, 62.5,-78.0, 61.5,-71.5, 59.0,-69.0, 60.3,-65.0],
  baffin: [73.5,-80.0, 70.5,-68.0, 67.0,-62.0, 64.0,-65.5, 62.5,-70.0, 65.5,-74.0, 69.0,-78.0, 71.5,-86.0],
  terranova: [51.6,-55.5, 49.7,-53.5, 46.6,-53.0, 47.6,-59.3, 49.5,-58.0],
  cuba: [23.2,-81.5, 23.1,-79.0, 22.0,-77.5, 20.2,-74.1, 19.9,-77.5, 21.6,-81.0, 22.5,-84.5],
  espanola: [19.9,-72.6, 19.8,-70.0, 18.5,-68.4, 18.2,-71.0, 18.4,-74.4],
  sudamerica: [9.0,-79.5, 9.5,-77.0, 11.0,-74.8, 11.8,-72.0, 10.6,-66.9, 10.7,-62.0, 8.5,-60.0, 6.8,-58.1, 5.8,-55.0, 4.9,-52.3, 2.0,-50.5,
    0.0,-50.0, -1.4,-48.5, -1.0,-46.0, -2.5,-44.3, -2.8,-41.0, -3.7,-38.5, -5.0,-36.5, -5.8,-35.2, -8.1,-34.9, -10.5,-36.3, -13.0,-38.5,
    -15.5,-38.9, -18.0,-39.6, -20.3,-40.3, -22.0,-41.0, -23.0,-43.2, -24.0,-46.4, -25.5,-48.3, -27.6,-48.5, -30.0,-50.5, -32.0,-52.0,
    -34.0,-53.5, -34.9,-56.2, -34.6,-58.4, -36.5,-56.7, -38.7,-62.3, -41.0,-63.0, -42.5,-63.6, -44.5,-65.5, -46.0,-67.5, -48.0,-66.0,
    -50.0,-68.9, -52.4,-68.4, -54.9,-67.3, -55.9,-67.3, -53.0,-74.0, -40.0,-73.7, -30.0,-71.5, -18.5,-70.3, -12.0,-77.1, -5.0,-81.1,
    -2.2,-80.9, 1.0,-80.0, 4.0,-77.4, 7.0,-77.8],
  hielo_artico: [80,-180, 81,-120, 82,-60, 82,-20, 81,0, 80,20, 81,60, 80,100, 80,150],
};
// mares dentro de la tierra (se borran)
const MARES = {
  negro: [41.2,29.1, 42.7,27.7, 44.2,28.6, 45.5,29.6, 46.5,30.7, 46.0,32.0, 45.3,32.5, 44.4,34.0, 45.0,35.5, 45.3,36.5, 46.0,38.0, 47.1,38.5,
    45.8,38.0, 44.7,37.8, 43.6,39.7, 41.6,41.6, 41.0,39.7, 41.3,36.3, 42.0,35.1, 41.2,31.4],
  caspio: [47.0,51.5, 45.5,49.0, 44.5,47.0, 43.0,47.5, 40.4,49.9, 38.5,48.9, 37.0,50.5, 36.8,53.5, 38.0,53.9, 40.0,53.0, 42.5,52.5, 44.5,50.5,
    46.5,53.0, 46.8,52.0],
  marmara: [40.9,27.5, 40.4,27.3, 40.4,29.0, 40.8,29.2],
  aral: [46.5,59.5, 44.0,58.5, 43.5,60.5, 46.0,61.5],
  baltico_sur: [],
  hudson_estrecho: [],
};
const MONTES = [
  // [lat, lon, ...], ancho (grados) y altura relativa
  [[42.8,-1.8, 42.65,0.7, 42.5,2.8], 1.0, 1.0],                                   // Pirineos
  [[40.2,-6.8, 40.3,-5.2, 40.8,-4.0, 41.2,-3.3], 0.75, 0.8],                       // Sistema Central
  [[43.0,-6.8, 43.0,-4.5, 42.9,-3.0], 0.8, 0.8],                                  // Cantábrica
  [[42.0,-3.0, 41.2,-1.8, 40.3,-1.0], 0.9, 0.55],                                 // Ibérico
  [[36.9,-5.2, 37.1,-3.3, 37.8,-2.0, 38.5,-0.5], 0.9, 0.8],                       // Béticas
  [[44.2,7.0, 45.8,7.0, 46.4,8.5, 46.6,10.5, 47.2,12.5, 47.5,15.0], 1.4, 1.0],    // Alpes
  [[44.3,9.0, 43.5,11.8, 42.5,13.5, 41.0,15.0, 39.0,16.3], 0.9, 0.6],             // Apeninos
  [[48.5,18.5, 49.3,21.5, 47.8,24.5, 46.0,25.5, 45.4,23.0], 1.2, 0.6],            // Cárpatos
  [[45.5,15.0, 43.5,17.5, 42.0,20.5, 40.0,21.5, 38.5,22.0], 1.3, 0.6],            // Balcanes
  [[43.5,40.0, 42.8,44.0, 41.5,48.5], 1.2, 1.0],                                  // Cáucaso
  [[30.5,-9.0, 31.5,-6.5, 33.0,-4.0, 34.5,0.5, 36.0,4.5, 36.0,8.0], 1.5, 0.9],    // Atlas
  [[59.5,6.5, 62.0,8.5, 64.5,13.0, 67.5,16.5, 69.5,20.0], 1.6, 0.7],              // Escandinavos
  [[51.0,58.0, 56.0,59.5, 61.0,59.0, 66.0,62.0, 68.0,66.0], 1.6, 0.5],            // Urales
  [[37.0,44.5, 33.5,47.5, 30.0,51.5, 27.5,56.0], 2.0, 0.8],                       // Zagros
  [[37.0,30.0, 37.5,34.0, 38.5,38.5, 39.5,42.0], 1.6, 0.8],                       // Tauro
  [[14.0,38.5, 11.0,38.0, 8.0,38.5], 3.0, 0.8],                                   // Etiopía
  [[2.0,36.0, -3.0,37.3, -8.0,35.0], 1.8, 0.7],                                   // Rift
  [[-27.0,29.5, -30.0,29.0, -32.5,27.0], 1.4, 0.6],                               // Drakensberg
  [[35.5,74.0, 31.0,79.0, 28.0,85.0, 27.5,92.0], 2.5, 1.0],                       // Himalaya
  [[34.5,-84.0, 38.0,-80.0, 41.0,-77.0, 44.0,-72.0], 1.6, 0.5],                   // Apalaches
  [[8,-73, 0,-78, -15,-72, -30,-70, -45,-72], 2.0, 1.0],                          // Andes
];
const DESIERTOS = [
  [30,-9, 31.5,10, 31,25, 30,32, 22,33, 16,37, 15,30, 16,20, 15,10, 16,0, 17,-10, 21,-16, 27,-12],
  [30,38, 28,48, 22,55, 18,52, 15,45, 20,40],
  [-20,13, -18,22, -25,25, -29,20, -28,16],
  [35,52, 32,60, 28,60, 30,52],
  [46,55, 45,66, 40,66, 38,57],
];
const BOSQUES = [
  [5,-10, 8,10, 5,30, -5,31, -12,25, -10,13, 0,9],                     // selva del Congo y Guinea
  [62,5, 70,25, 66,45, 60,60, 56,40, 58,15],                           // taiga
  [52,-2, 54,12, 50,20, 47,15, 47,3],                                   // Europa central
  [-2,-75, 4,-60, -5,-45, -15,-45, -15,-65],                            // Amazonía
  [45,-80, 50,-65, 45,-62, 35,-80],                                    // bosques de Norteamérica
];

// proyección ortográfica centrada en nosotros: (lat, lon) → (x, y) en la esfera unidad (x este, y norte)
function orto(lat, lon) {
  const r = Math.PI / 180, f0 = NOSOTROS.lat * r, l0 = NOSOTROS.lon * r, f = lat * r, l = lon * r;
  const x = Math.cos(f) * Math.sin(l - l0);
  const y = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l - l0);
  const c = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l - l0);
  if (c >= 0) return [x, y];
  const k = 1 / Math.hypot(x, y);          // detrás del borde: se pega al borde
  return [x * k, y * k];
}
// local (metros, este/norte desde nosotros) de un punto (lat, lon); para alinear el terreno cercano
export function enMetros(lat, lon) { const [x, y] = orto(lat, lon); return [x * 6.371e6, y * 6.371e6]; }

// difuminado rápido (cajas separables) de un canal
function difuminar(a, N, r, pasadas = 2) {
  const t = new Float32Array(N * N), k = 1 / (2 * r + 1);
  for (let p = 0; p < pasadas; p++) {
    for (let y = 0; y < N; y++) {
      const f = y * N;
      let acc = 0;
      for (let x = -r; x <= r; x++) acc += a[f + Math.min(N - 1, Math.max(0, x))];
      for (let x = 0; x < N; x++) { t[f + x] = acc * k; acc += a[f + Math.min(N - 1, x + r + 1)] - a[f + Math.max(0, x - r)]; }
    }
    for (let x = 0; x < N; x++) {
      let acc = 0;
      for (let y = -r; y <= r; y++) acc += t[Math.min(N - 1, Math.max(0, y)) * N + x];
      for (let y = 0; y < N; y++) { a[y * N + x] = acc * k; acc += t[Math.min(N - 1, y + r + 1) * N + x] - t[Math.max(0, y - r) * N + x]; }
    }
  }
  return a;
}
function pintarContinentes(N, N2) {
  const lienzo = (n) => { const c = document.createElement('canvas'); c.width = c.height = n; const g = c.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, n, n); return g; };
  const px = (n, [x, y]) => [(x * 0.5 + 0.5) * n, (0.5 - y * 0.5) * n];
  const camino = (g, n, l, cerrar = true) => {
    g.beginPath();
    for (let i = 0; i < l.length; i += 2) { const [a, b] = px(n, orto(l[i], l[i + 1])); i ? g.lineTo(a, b) : g.moveTo(a, b); }
    if (cerrar) g.closePath();
  };
  const canal = (g, n) => { const d = g.getImageData(0, 0, n, n).data, a = new Float32Array(n * n); for (let i = 0; i < n * n; i++) a[i] = d[i * 4] / 255; return a; };
  const gT = lienzo(N), gM = lienzo(N), gH = lienzo(N), gD = lienzo(N2), gB = lienzo(N2);
  gT.fillStyle = '#fff';
  for (const [n, l] of Object.entries(COSTAS)) if (n !== 'hielo_artico') { camino(gT, N, l); gT.fill(); }
  gT.fillStyle = '#000';
  for (const l of Object.values(MARES)) if (l.length) { camino(gT, N, l); gT.fill(); }
  gM.lineCap = 'round'; gM.lineJoin = 'round';
  for (const [l, ancho, alto] of MONTES) {
    gM.strokeStyle = `rgba(255,255,255,${alto})`;
    gM.lineWidth = ancho * N / 2048 * 22;
    camino(gM, N, l, false); gM.stroke();
  }
  gH.fillStyle = '#fff';
  camino(gH, N, COSTAS.groenlandia); gH.fill(); camino(gH, N, COSTAS.hielo_artico); gH.fill();
  gD.fillStyle = '#fff'; for (const l of DESIERTOS) { camino(gD, N2, l); gD.fill(); }
  gB.fillStyle = '#fff'; for (const l of BOSQUES) { camino(gB, N2, l); gB.fill(); }
  const k = N / 2048;
  const T = difuminar(canal(gT, N), N, Math.max(1, Math.round(1.5 * k)), 2);
  const Mo = difuminar(canal(gM, N), N, Math.round(7 * k), 3);
  const Hh = difuminar(canal(gH, N), N, Math.max(1, Math.round(2 * k)), 2);
  const D = difuminar(canal(gD, N2), N2, Math.round(4 * N2 / 512), 3);
  const B = difuminar(canal(gB, N2), N2, Math.round(4 * N2 / 512), 3);
  const a = new Uint8Array(N * N * 4), b = new Uint8Array(N2 * N2 * 4);
  const q = (v) => Math.max(0, Math.min(255, Math.round(v * 255)));
  for (let i = 0; i < N * N; i++) { a[i * 4] = q(T[i]); a[i * 4 + 1] = q(Mo[i] * 1.6); a[i * 4 + 2] = q(Hh[i]); a[i * 4 + 3] = 255; }
  for (let i = 0; i < N2 * N2; i++) { b[i * 4] = q(D[i]); b[i * 4 + 1] = q(B[i]); b[i * 4 + 2] = 0; b[i * 4 + 3] = 255; }
  return [a, b];
}

// =====================================================================================================
// El mundo en relieve
// =====================================================================================================
const GLSL_COMUN = /* glsl */`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform float uDis;          // píxeles de diseño (1920 x 1080) por píxel del búfer
uniform float uZ, uMpp;      // log10 del zoom · metros por píxel de diseño
uniform float uFrame;
uniform vec3 uBoil;
const vec3 C_TERRA  = vec3(0.722, 0.165, 0.082);
const vec3 C_CREAM  = vec3(0.640, 0.560, 0.420);
const vec3 C_SAGE   = vec3(0.090, 0.270, 0.230);
const vec3 C_MUST   = vec3(0.860, 0.450, 0.055);
const vec3 C_BUTTER = vec3(0.440, 0.340, 0.190);
const vec3 C_SLATE  = vec3(0.030, 0.042, 0.090);
const vec3 C_STAR   = vec3(0.780, 0.700, 0.520);
const vec3 C_INK    = vec3(0.012, 0.016, 0.050);
const vec3 C_LIGHT  = vec3(0.520, 0.460, 0.350);
const vec3 C_SAND   = vec3(0.265, 0.212, 0.150);
const vec3 C_OCEAN  = vec3(0.020, 0.058, 0.098);
const vec3 C_LAND   = vec3(0.062, 0.090, 0.028);
const vec3 C_WATER  = vec3(0.042, 0.120, 0.230);
const vec3 C_PIEL   = vec3(0.640, 0.360, 0.235);
const vec3 C_JERSEY = vec3(0.700, 0.150, 0.085);
const vec3 C_VAQUERO = vec3(0.040, 0.080, 0.190);
const vec3 C_PELO   = vec3(0.115, 0.046, 0.022);
const vec3 C_HIERBA = vec3(0.085, 0.165, 0.040);
const vec3 C_ARBOL  = vec3(0.045, 0.120, 0.035);
const vec3 C_ASFALTO = vec3(0.050, 0.055, 0.075);
const vec3 C_ACERA  = vec3(0.330, 0.300, 0.250);
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec2 x) {
  vec2 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
float vnoise3(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3(vec2 p) { return 0.5 * vnoise(p) + 0.3 * vnoise(p * 2.03 + 7.1) + 0.2 * vnoise(p * 4.07 + 3.3); }
float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdBox(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }
float sdRBox(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float sdElipse(vec2 p, vec2 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-6); }
// perfil de un borde redondeado de arcilla: 0 en el borde, 1 a una distancia r hacia dentro
float bisel(float d, float r) { float t = clamp(-d / r, 0.0, 1.0); return sqrt(1.0 - (1.0 - t) * (1.0 - t)); }
mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
`;

// ---------- pasada A: el mundo → altura, material y color ----------
// Salidas: o0 = (altura en px de diseño, material, emisión, —) · o1 = (color, —) · o2 = (luz que irradia, —)
// Materiales: 0 arcilla · 1 agua · 2 nube · 3 sol · 4 tablero · 5 cuenta (estrella, planeta)
const GLSL_MUNDO = /* glsl */`
layout(location = 0) out vec4 o0;
layout(location = 1) out vec4 o1;
layout(location = 2) out vec4 o2;
uniform vec4 uSuelo;      // la Tierra vista desde arriba: su centro (nosotros) en pantalla · radio (px) · altura de su cima
uniform float uKH;        // exageración del relieve del suelo
uniform float uTablero;   // altura del tablero del espacio (px, relativa)
uniform vec4 uLuna;       // centro (px) · radio (px) · peso
uniform vec4 uSol;        // centro (px) · radio (px) · peso
uniform vec4 uSis;        // el Sol en pantalla · px por semieje de la órbita de la Tierra · peso
uniform vec4 uVec;        // el Sol en pantalla · px por año luz · peso
uniform vec4 uGal;        // centro de la galaxia en pantalla · px por radio de galaxia · peso
uniform vec4 uAqui;       // dónde estamos (px) · aparición de la marca · —
uniform vec4 uEstr[3];    // octavas de estrellas de fondo: desplazamiento (celdas) · celdas por px · peso
uniform vec4 uEstrG[2];   // octavas de estrellas de la galaxia: — · celdas por px · peso
uniform vec2 uAncla;      // centro del zoom en pantalla
uniform sampler2D uCont1, uCont2;

struct Sup { float h; vec3 c; float m; float e; vec3 glow; };
void pon(inout Sup s, float cov, float h, vec3 c, float m) { s.h = mix(s.h, h, cov); s.c = mix(s.c, c, cov); if (cov > 0.5) s.m = m; }
void ponE(inout Sup s, float cov, float h, vec3 c, float m, float e) { pon(s, cov, h, c, m); s.e = mix(s.e, e, cov); }
void mezcla(inout Sup a, Sup b, float w) { a.h = mix(a.h, b.h, w); a.c = mix(a.c, b.c, w); a.e = mix(a.e, b.e, w); a.glow = mix(a.glow, b.glow, w); if (w > 0.5) a.m = b.m; }
// cuenta de arcilla (estrella, planeta): cúpula aplastada con su halo de luz
void cuenta(inout Sup s, vec2 q, float r, float hBase, vec3 c, float brillo, vec3 colHalo) {
  if (r < 0.08) return;
  float d = length(q) - r;
  float cov = clamp(0.5 - d, 0.0, 1.0);
  if (cov > 0.0) ponE(s, cov, hBase + sqrt(max(r * r - dot(q, q), 0.0)) * 0.8, c, 5.0, brillo * 0.3);
  s.glow += colHalo * brillo * exp(-max(d, 0.0) / max(r * 1.6, 1.5)) * (1.0 - cov) * 0.5;
}
vec3 colorEstrella(float k) {
  return k < 0.5 ? C_STAR : k < 0.7 ? vec3(0.6, 0.66, 0.82) : k < 0.86 ? vec3(0.86, 0.62, 0.36) : vec3(0.88, 0.42, 0.3);
}
void estrellasOctava(inout Sup s, vec2 P, vec4 oct, float dens, float brillo) {
  if (oct.w < 0.002) return;
  vec2 c = (P - uAncla) * oct.z + oct.xy;
  vec2 id = floor(c), f = fract(c);
  if (hash12(id + 17.0) > dens) return;
  vec2 j = 0.2 + 0.6 * hash22(id + 3.1);
  float tam = mix(0.028, 0.07, pow(hash12(id + 9.7), 3.0));
  float rpx = tam * min(1.0 / oct.z, 85.0) * oct.w;
  vec2 q = (f - j) / oct.z;
  vec3 col = colorEstrella(hash12(id + 41.0));
  cuenta(s, q, rpx, uTablero, col, brillo * oct.w * (0.4 + 0.6 * hash12(id + 5.5)), col);
}
void tablero(inout Sup s, vec2 P) {
  s.h = uTablero; s.m = 4.0; s.e = 0.0; s.glow = vec3(0.0);
  s.c = C_SLATE * (0.86 + 0.28 * vnoise(P * 0.0035 + 3.0)) * (0.94 + 0.12 * vnoise(P * 0.021)) * mix(1.0, 0.6, smoothstep(15.5, 20.0, uZ));
}
// ---------- lo común al suelo cercano y lejano: el río, el centro, los tejados ----------
const float PY = 55.0, PX = 100.0, LOTE = 12.7143;
const vec2 CIUDAD = vec2(3500.0, 2500.0);
float rioY(float x) { return 650.0 + 250.0 * sin(x / 1800.0 + 0.5) + 90.0 * sin(x / 600.0) + 3000.0 * sin(x / 15000.0) + 8000.0 * (sin(x / 52000.0 + 1.0) - 0.841471); }
float rioD(vec2 p) {
  float y = rioY(p.x);
  float dy = (rioY(p.x + 8.0) - rioY(p.x - 8.0)) / 16.0;
  return (p.y - y) / sqrt(1.0 + dy * dy);
}
float centroD(vec2 p) { return length((p - CIUDAD) / vec2(2600.0, 2000.0)) - 1.0; }
vec3 colorTejado(float k) {
  if (k < 0.42) return vec3(0.52, 0.14, 0.07);
  if (k < 0.62) return vec3(0.40, 0.11, 0.06);
  if (k < 0.74) return vec3(0.13, 0.15, 0.21);
  if (k < 0.84) return vec3(0.58, 0.30, 0.05);
  if (k < 0.92) return vec3(0.09, 0.20, 0.17);
  return vec3(0.42, 0.24, 0.14);
}
vec3 colorEdificio(float k) {
  if (k < 0.3) return vec3(0.30, 0.29, 0.30);
  if (k < 0.5) return C_CREAM * 0.8;
  if (k < 0.65) return vec3(0.36, 0.26, 0.17);
  if (k < 0.8) return vec3(0.16, 0.18, 0.24);
  return vec3(0.45, 0.20, 0.12);
}
// edificios del centro: cuatro por manzana (2 x 2), de azotea plana con pretil y máquinas
void edificio(inout Sup s, vec2 u2, vec2 bid, float side, float pw, float mH) {
  vec2 q = vec2(u2.x - sign(u2.x) * 22.25, abs(u2.y) - 16.6);
  vec2 eid = bid * 13.0 + vec2(sign(u2.x), side);
  float k = hash12(eid + 3.3), k2 = hash12(eid + 8.8);
  vec2 b = vec2(mix(15.0, 20.5, k2), mix(7.5, 10.5, k));
  float d = sdRBox(q, b, 1.2);
  float cov = clamp(0.5 - d / pw, 0.0, 1.0);
  if (cov <= 0.0) return;
  float alto = mix(14.0, 62.0, k * k) * mH;
  float pretil = (1.0 - smoothstep(0.6, 1.4, -d)) * 1.6;
  vec3 c = colorEdificio(hash12(eid + 1.7)) * (0.9 + 0.15 * vnoise(q * 0.3));
  float maq = sdRBox(q - vec2(mix(-8.0, 8.0, k2), mix(-3.0, 3.0, k)), vec2(2.2, 1.6), 0.4);
  float h = alto + pretil + 2.0 * (1.0 - step(0.0, maq));
  c = mix(c, c * 0.75, step(maq, 0.0));
  pon(s, cov, h, c, 0.0);
}
`;

// ---------- el suelo cercano: casas, calles, árboles, coches, el río y la persona ----------
const GLSL_CERCA = /* glsl */`
vec3 colorCoche(float k) {
  if (k < 0.2) return C_MUST * 0.85;
  if (k < 0.4) return vec3(0.08, 0.25, 0.22);
  if (k < 0.55) return C_CREAM;
  if (k < 0.7) return C_TERRA;
  if (k < 0.85) return vec3(0.07, 0.12, 0.30);
  return vec3(0.35, 0.36, 0.38);
}
// copa de árbol: varias bolas de arcilla verde, abultadas
void arbol(inout Sup s, vec2 q, float r, float alto, float pw, float sem) {
  if (length(q) > r * 2.0) return;
  float hb = 0.0, dd = 1e5;
  for (int i = 0; i < 4; i++) {
    float a = sem * 6.0 + float(i) * 1.7;
    vec2 cc = (i == 0) ? vec2(0.0) : vec2(cos(a), sin(a)) * r * 0.45;
    float rr = (i == 0) ? r * 0.72 : r * 0.55;
    dd = min(dd, length(q - cc) - rr);
    hb = max(hb, sqrt(max(rr * rr - dot(q - cc, q - cc), 0.0)) / rr);
  }
  dd += 0.06 * r * (vnoise(q * 3.0 / r + uBoil.xy * 0.3 + sem * 9.0) - 0.5);
  float cov = clamp(0.5 - dd / pw, 0.0, 1.0);
  vec3 c = mix(C_ARBOL, C_HIERBA * 1.1, 0.35 + 0.4 * hash12(vec2(sem, 3.0))) * (0.85 + 0.3 * vnoise(q * 2.5 / r + sem));
  pon(s, cov, alto * (0.55 + 0.45 * hb), c, 0.0);
}
// tejado a dos aguas (cumbrera a lo largo de x o de y) o a cuatro aguas; q relativo al centro, b = semilados
void tejado(inout Sup s, vec2 q, vec2 b, float tipo, vec3 col, float alto, float pw) {
  float d = sdRBox(q, b, 0.25);
  float cov = clamp(0.5 - d / pw, 0.0, 1.0);
  if (cov <= 0.0) return;
  vec2 a = abs(q);
  float pend, fila;
  if (tipo < 0.5) { pend = 1.0 - a.y / b.y; fila = a.y; }
  else if (tipo < 1.5) { pend = 1.0 - a.x / b.x; fila = a.x; }
  else { pend = min(1.0 - a.y / b.y, (1.0 - a.x / b.x) * b.x / b.y); fila = b.y * (1.0 - pend); }
  pend = clamp(pend, 0.0, 1.0);
  float lado = tipo < 0.5 ? b.y : (tipo < 1.5 ? b.x : b.y);
  // tejas: hileras paralelas a la cumbrera, cada una un poco levantada en su borde
  float t = fract(fila / 0.42);
  float teja = 0.09 * smoothstep(0.0, 0.85, t) * (1.0 - smoothstep(0.85, 1.0, t)) * (1.0 - smoothstep(0.04, 0.12, pw));
  float cumbre = 1.0 - smoothstep(0.0, 0.25, lado * (1.0 - pend));
  float h = alto + lado * 0.8 * pend * bisel(d, 0.4) + teja + 0.15 * cumbre;
  vec3 c = col * (0.9 + 0.2 * hash12(floor(vec2(fila / 0.42, q.x / 0.5)))) * (0.92 + 0.16 * smoothstep(0.7, 1.0, t));
  c = mix(c, col * 0.7, cumbre * 0.6);
  pon(s, cov, h, c, 0.0);
}
void coche(inout Sup s, vec2 q, float k, float pw) {
  float d = sdRBox(q, vec2(2.15, 0.92), 0.55);
  float cov = clamp(0.5 - d / pw, 0.0, 1.0);
  if (cov <= 0.0) return;
  vec3 c = colorCoche(k) * (0.92 + 0.12 * vnoise(q * 2.0));
  float h = 0.55 + 0.5 * bisel(d, 0.35);
  float dt = sdRBox(q - vec2(-0.15, 0.0), vec2(1.2, 0.74), 0.4);
  h += 0.6 * bisel(dt, 0.35);
  float luna = step(dt, 0.0) * (step(0.62, q.x + 0.15) + step(q.x + 0.15, -0.8));
  c = mix(c, vec3(0.025, 0.04, 0.07), luna * 0.9);
  pon(s, cov, h, c, 0.0);
}
// la persona vista desde arriba (un poco más grande que la real, para que se la vea): hombros con el
// jersey, la cabeza con el pelo y las puntas de los zapatos
void personaArriba(inout Sup s, vec2 q, float pw) {
  q /= 2.3;
  pw /= 2.3;
  float dz = min(sdElipse(q - vec2(-0.09, -0.17), vec2(0.06, 0.1)), sdElipse(q - vec2(0.09, -0.17), vec2(0.06, 0.1)));
  pon(s, clamp(0.5 - dz / pw, 0.0, 1.0), 0.15, C_INK * 2.6, 0.0);
  float db = sdElipse(q, vec2(0.25, 0.13));
  pon(s, clamp(0.5 - db / pw, 0.0, 1.0), 1.45 * 2.3 + 0.15 * bisel(db, 0.08), C_JERSEY, 0.0);
  float dm = min(sdElipse(q - vec2(-0.215, 0.0), vec2(0.055, 0.075)), sdElipse(q - vec2(0.215, 0.0), vec2(0.055, 0.075)));
  pon(s, clamp(0.5 - dm / pw, 0.0, 1.0) * step(db, 0.02), 1.38 * 2.3, C_JERSEY * 0.85, 0.0);
  float dc = length(q - vec2(0.0, 0.01)) - 0.105;
  pon(s, clamp(0.5 - dc / pw, 0.0, 1.0), 1.65 * 2.3 + 0.25 * bisel(dc, 0.08), C_PELO * 1.4, 0.0);
}
void sueloCerca(inout Sup s, vec2 p, float pw, float detalle) {
  float v = mod(p.y + 4.75 + 27.5, PY) - 27.5;
  float u = mod(p.x + 50.0, PX) - 50.0;
  vec2 bid = vec2(floor((p.x + 50.0) / PX), floor((p.y + 4.75 + 27.5) / PY));
  float cy = abs(v), cx = 50.0 - abs(u);
  float side = v >= 0.0 ? 1.0 : -1.0;
  float vl = cy - 5.45;
  float li = clamp(floor((u + 44.5) / LOTE), 0.0, 6.0);
  float ul = u - (-44.5 + (li + 0.5) * LOTE);
  vec2 lid = bid * 17.0 + vec2(li, side);
  float k1 = hash12(lid + 0.5), k2 = hash12(lid + 7.3), k3 = hash12(lid + 13.1), k4 = hash12(lid + 21.7), k5 = hash12(lid + 29.9);
  bool nuestra = bid.x == 0.0 && bid.y == 0.0 && li == 3.0 && side > 0.0;
  bool parque = !(bid.x == 0.0 && bid.y == 0.0) && hash12(bid + 91.0) < 0.1;
  bool centro = centroD(p) < 0.0;
  float dRio = rioD(p);
  bool orilla = abs(dRio) < 70.0;
  // césped de la parcela (con rayas de cortacésped en algunas)
  float raya = step(0.5, fract(ul / 1.6)) * step(0.55, k5);
  s.h = 0.1; s.m = 0.0;
  s.c = C_HIERBA * (0.85 + 0.25 * vnoise(p * 0.6) + 0.08 * raya) * (0.9 + 0.2 * k5);
  if (parque || orilla) s.c = C_HIERBA * (0.95 + 0.2 * vnoise(p * 0.2));
  if (centro) s.c = C_ACERA * 0.8 * (0.9 + 0.2 * vnoise(p * 0.5));
  // acera, bordillo y asfalto
  float dAce = min(cy - 5.45, cx - 5.5);
  float covA = clamp(0.5 - dAce / pw, 0.0, 1.0) * (orilla ? step(cx, 6.0) : 1.0);
  vec2 bald = fract(p / 1.25);
  float junta = (1.0 - smoothstep(0.0, 0.06, min(min(bald.x, 1.0 - bald.x), min(bald.y, 1.0 - bald.y)))) * detalle;
  pon(s, covA, 0.18 - 0.02 * junta, C_ACERA * (0.9 + 0.15 * vnoise(p * 1.7)) * (1.0 - 0.18 * junta), 0.0);
  float dAsf = min(cy - 3.25, cx - 3.5);
  if (orilla) dAsf = cx - 3.5;
  float covS = clamp(0.5 - dAsf / pw, 0.0, 1.0);
  float bord = 1.0 - smoothstep(0.0, 0.2, abs(dAsf + 0.08));
  pon(s, covS, 0.0, C_ASFALTO * (0.85 + 0.3 * vnoise(p * 0.9)), 0.0);
  s.h += 0.1 * bord * detalle;
  float linea = max(step(cy, 0.13) * step(0.5, fract(p.x / 6.0)) * step(4.0, cx), step(cx, 0.13) * step(0.5, fract(p.y / 6.0)) * step(4.0, cy));
  float cebra = step(cy, 3.0) * step(cx, 5.2) * step(3.6, cx) * step(0.5, fract(p.y / 0.9));
  cebra = max(cebra, step(cx, 3.0) * step(cy, 5.2) * step(3.6, cy) * step(0.5, fract(p.x / 0.9)));
  pon(s, max(linea, cebra * (orilla ? 0.0 : 1.0)) * covS * clamp(1.6 - pw * 3.0, 0.0, 1.0), 0.04, C_CREAM * 1.05, 0.0);
  // el río: agua, orillas con árboles y puentes donde lo cruzan las calles
  float covR = clamp(0.5 - (abs(dRio) - 36.0) / pw, 0.0, 1.0);
  float puente = clamp(0.5 - (cx - 4.2) / pw, 0.0, 1.0);
  vec3 agua = vec3(0.05, 0.16, 0.26) * (0.85 + 0.25 * vnoise(p / 9.0 + uBoil.xy * 0.2));
  pon(s, covR * (1.0 - puente), -1.5 + 0.12 * sin(p.x / 3.0 + 1.3 * sin(p.y / 2.0)), agua, 1.0);
  pon(s, covR * puente, 1.2 + 0.4 * bisel(cx - 4.2, 0.6), C_ACERA * 0.95, 0.0);
  if (detalle <= 0.0) return;
  // dentro de la parcela (vl en 0..22, ul en ±6.36): seto, casa, camino, árboles, piscina, coche
  bool dentro = vl > 0.0 && cx > 5.5 && !orilla;
  if (dentro && centro) edificio(s, vec2(u, v), bid, side, pw, 1.0);
  if (dentro && !parque && !centro) {
    vec2 q = vec2(ul, vl);
    float hw = mix(3.6, 4.6, k1), hd = mix(3.7, 4.9, k2);
    float hx = mix(-0.7, 0.7, k3), hy = 4.6 + hd + 1.4 * k4;
    float tipo = k2 < 0.55 ? 0.0 : (k2 < 0.82 ? 1.0 : 2.0);
    vec3 col = colorTejado(k3 * 0.7 + k5 * 0.3);
    if (nuestra) { hw = 4.0; hd = 3.3; hx = 0.6; hy = 7.0; tipo = 0.0; col = vec3(0.56, 0.15, 0.07); }
    float dSeto = abs(vl - 0.45) - 0.32;
    float hueco = step(abs(ul - hx - 0.6), 0.8);
    float covSeto = clamp(0.5 - dSeto / pw, 0.0, 1.0) * (1.0 - hueco) * step(0.5, fract(k1 * 7.0) + 0.3);
    pon(s, covSeto, 0.6 + 0.25 * vnoise(p * 3.0), C_ARBOL * 1.2 * (0.9 + 0.2 * vnoise(p * 2.0)), 0.0);
    float dCam = sdBox(q - vec2(hx + 0.6, (hy - hd) * 0.5), vec2(0.55, (hy - hd) * 0.5));
    vec2 lf = fract(vec2(q.x * 1.0, q.y / 0.8));
    float losa = smoothstep(0.0, 0.08, min(lf.y, 1.0 - lf.y));
    pon(s, clamp(0.5 - dCam / pw, 0.0, 1.0), 0.14 + 0.04 * losa, C_CREAM * (0.85 + 0.1 * losa), 0.0);
    if (k4 > 0.72 && !nuestra) {
      vec2 qp = q - vec2(-hx * 1.5, hy + hd + 4.0);
      float dp = sdRBox(qp, vec2(1.6, 2.6), 0.8);
      float covP = clamp(0.5 - dp / pw, 0.0, 1.0);
      float borde = 1.0 - smoothstep(0.0, 0.35, abs(dp + 0.2));
      pon(s, covP, 0.0 - 0.35 * bisel(dp + 0.3, 0.3), mix(vec3(0.15, 0.4, 0.55), C_CREAM, borde), borde > 0.5 ? 0.0 : 1.0);
      s.h += 0.12 * borde * covP;
    }
    // la casa (en algunas, en forma de L)
    tejado(s, q - vec2(hx, hy), vec2(hw, hd), tipo, col, 5.0, pw);
    if (k5 > 0.62 && !nuestra) tejado(s, q - vec2(hx + hw * 0.55 * sign(k3 - 0.5), hy + hd + 1.2), vec2(hw * 0.42, 1.8), 1.0, col * 0.95, 4.2, pw);
    if (k5 > 0.55 || nuestra) {
      float dch = sdRBox(q - vec2(hx + hw * 0.5, hy + hd * 0.35), vec2(0.45, 0.45), 0.1);
      pon(s, clamp(0.5 - dch / pw, 0.0, 1.0), 9.0, vec3(0.42, 0.2, 0.14) * (0.9 + 0.2 * vnoise(q * 5.0)), 0.0);
    }
    vec2 ta = vec2(mix(-4.2, 4.2, k4), hy + hd + mix(2.5, 6.5, k1));
    if (nuestra) ta = vec2(-4.5, 2.4);
    float ra = nuestra ? 2.1 : mix(1.8, 3.0, k3);
    arbol(s, q - ta, ra, nuestra ? 7.0 : mix(6.0, 9.0, k2), pw, k5 + li);
    if (k3 > 0.5) arbol(s, q - vec2(mix(4.0, -4.0, k1), 1.8 + 0.6 * k2), mix(1.4, 2.0, k4), mix(5.0, 6.5, k5), pw, k4 + li * 3.0);
    if (k1 > 0.6 && !nuestra) {
      vec2 qc = q - vec2(hx - hw - 1.3, hy - hd + 1.0);
      coche(s, vec2(qc.y, qc.x), k3, pw);
    }
  }
  if (parque && !orilla) {
    vec2 c = vec2(u, v);
    float de = sdElipse(c - vec2(10.0, 12.0) * side, vec2(9.0, 5.0)) + 1.5 * (vnoise(c * 0.2) - 0.5);
    float covE = clamp(0.5 - de / pw, 0.0, 1.0);
    pon(s, covE, -0.2 * bisel(de, 1.0), vec3(0.06, 0.18, 0.3) * (0.9 + 0.2 * vnoise(c * 0.5)), 1.0);
    vec2 g = c / 9.0, gi = floor(g), gf = fract(g);
    float kk = hash12(gi + bid * 3.0);
    if (kk > 0.45 && de > 2.0 && dAce > 1.0) arbol(s, (gf - 0.5 - 0.25 * (hash22(gi) - 0.5)) * 9.0, mix(2.0, 3.4, kk), 8.0, pw, kk * 10.0);
  }
  if (orilla && abs(dRio) > 38.0 && cx > 6.0) {
    float t = (p.x + 2.0) / 9.0;
    vec2 q = vec2((fract(t) - 0.5) * 9.0, abs(dRio) - 50.0);
    if (hash12(vec2(floor(t), sign(dRio))) > 0.3) arbol(s, q, mix(2.2, 3.4, hash12(vec2(floor(t), 4.0))), 9.0, pw, floor(t) * 0.37);
  }
  if (cy > 2.6 && cy < 6.6 && cx > 6.0 && !centro && !orilla) {
    float t = (p.x + 3.0) / 11.0;
    vec2 q = vec2((fract(t) - 0.5) * 11.0, (cy - 4.55));
    if (hash12(vec2(floor(t), bid.y * 2.0 + side)) > 0.4 && hash12(bid + 5.0) > 0.35) arbol(s, q, 1.7, 7.0, pw, floor(t));
  }
  if (cy < 3.3 && cx > 4.0 && !orilla) {
    float t = (p.x + 1.3) / 7.5;
    float kc = hash12(vec2(floor(t), bid.y * 3.0 + side + 5.0));
    vec2 q = vec2((fract(t) - 0.5) * 7.5, (cy - 2.15));
    bool nuestroCoche = bid.y == 0.0 && side > 0.0 && floor(t) == 0.0;
    if (kc > 0.62 || nuestroCoche) coche(s, q, nuestroCoche ? 0.1 : hash12(vec2(floor(t), 9.0 + side)), pw);
  }
  personaArriba(s, p, pw);
}
`;

// ---------- el suelo lejano: la ciudad entera, los campos, los pueblos, la región y la península ----------
const GLSL_LEJOS = /* glsl */`
float ciudadD(vec2 p) { vec2 q = p - CIUDAD; return length(q * vec2(1.0, 1.12)) - 8500.0 + 3600.0 * (fbm3(p / 4200.0) - 0.5); }
vec3 colorCampo(float k) {
  if (k < 0.2) return vec3(0.44, 0.31, 0.09);
  if (k < 0.34) return vec3(0.31, 0.16, 0.07);
  if (k < 0.48) return vec3(0.14, 0.21, 0.06);
  if (k < 0.62) return vec3(0.38, 0.31, 0.19);
  if (k < 0.74) return vec3(0.2, 0.2, 0.08);
  if (k < 0.86) return vec3(0.48, 0.39, 0.21);
  return vec3(0.26, 0.23, 0.1);
}
// la ciudad de lejos: de cerca, cada parcela es una mancha de tejado o jardín; de más lejos, la ciudad es una
// maqueta de supermanzanas (losas de arcilla con tejados moteados, parques, torres en el centro) separadas por
// avenidas; por el borde, las supermanzanas se van dejando huecos (afueras)
const vec2 SMZ = vec2(400.0, 385.0);
void ciudadLejos(inout Sup s, vec2 p, float pw, float dC) {
  float v = mod(p.y + 4.75 + 27.5, PY) - 27.5;
  float u = mod(p.x + 50.0, PX) - 50.0;
  vec2 bid = vec2(floor((p.x + 50.0) / PX), floor((p.y + 4.75 + 27.5) / PY));
  float cy = abs(v), cx = 50.0 - abs(u);
  float side = v >= 0.0 ? 1.0 : -1.0;
  float li = clamp(floor((u + 44.5) / LOTE), 0.0, 6.0);
  vec2 lid = bid * 17.0 + vec2(li, side);
  float k3 = hash12(lid + 13.1), k4 = hash12(lid + 21.7), k5 = hash12(lid + 29.9);
  vec3 lote = mix(colorTejado(k3 * 0.7 + k5 * 0.3), C_HIERBA * 0.85, step(0.62, k4) * 0.8);
  float hLote = 4.0 + 4.0 * k4;
  // supermanzanas
  vec2 o = p - vec2(50.0, -4.75);
  vec2 si = floor(o / SMZ), sf = o - si * SMZ;
  float dE = min(min(sf.x, SMZ.x - sf.x), min(sf.y, SMZ.y - sf.y)) - 11.0;
  float ks = hash12(si + 7.7), ks2 = hash12(si + 3.1);
  float cen = smoothstep(0.3, -0.2, centroD(si * SMZ + SMZ * 0.5 + vec2(50.0, -4.75)));
  float hMin = 3.2 * pw / max(uKH, 0.1);
  float hS = max(8.0 + 8.0 * ks2, hMin) * (1.0 + 2.5 * cen);
  vec2 mt = p / max(45.0, pw * 2.2);
  vec3 cRes = mix(mix(vec3(0.42, 0.13, 0.07), vec3(0.3, 0.22, 0.17), vnoise(mt)), C_HIERBA * 0.75, smoothstep(0.55, 0.8, vnoise(mt * 0.7 + 4.0)) * 0.6);
  vec3 cDen = mix(C_CREAM * 0.62, vec3(0.3, 0.26, 0.24), vnoise(mt + 2.0));
  vec3 cS = ks < 0.12 ? C_HIERBA * (0.75 + 0.3 * vnoise(mt * 2.0)) : (ks < 0.3 || cen > 0.5 ? cDen : cRes);
  float hTex = (ks < 0.12 ? 6.0 * vnoise(mt * 3.0) : 3.0 * vnoise(mt * 1.7)) * max(1.0, hMin / 8.0);
  // torres del centro: unos bultos altos dentro de la supermanzana
  float torre = 0.0;
  if (cen > 0.2) {
    vec2 tg = sf / 190.0; vec2 ti = floor(tg);
    vec2 tc = (ti + 0.3 + 0.4 * hash22(si * 5.0 + ti)) * 190.0;
    float dT = sdRBox(sf - tc, vec2(48.0, 36.0) * (0.7 + 0.6 * hash12(ti + si)), 8.0);
    torre = (1.0 - smoothstep(-2.0, pw * 0.6, dT)) * step(0.35, hash12(ti * 3.0 + si)) * cen;
  }
  float sbW = smoothstep(2.6, 6.0, pw);
  float covSB = clamp(0.5 - (-dE) / pw, 0.0, 1.0);
  vec3 cSB = mix(cS, C_CREAM * 0.85, torre * 0.7);
  float hSB = (hS + hTex) * bisel(-dE, max(30.0, pw * 2.0)) + torre * max(60.0, hMin * 4.0) * (0.6 + 0.6 * ks2);
  s.c = mix(lote, cSB, sbW);
  s.h = mix(hLote, hSB, sbW);
  s.m = 0.0;
  // calles (finas, de la cuadrícula) y avenidas (entre supermanzanas)
  float wl = max(3.4, pw * 0.5);
  float covS = clamp((wl - min(cy, cx)) / pw + 0.5, 0.0, 1.0) * min(1.0, 7.0 / pw) * (1.0 - 0.75 * sbW);
  pon(s, covS, s.h * (1.0 - sbW), C_ASFALTO * 1.4, 0.0);
  pon(s, (1.0 - covSB) * sbW, 0.0, vec3(0.3, 0.28, 0.25), 0.0);
  // afueras: algunas supermanzanas no están (se ve el campo de debajo)
  float hueco = step(ks2, smoothstep(-2600.0, 200.0, dC) * 0.85);
  s.h = mix(s.h, -1e4, hueco);
}
// campos: parcelas grandes (de maqueta) partidas en franjas de cultivos, setos de churro verde entre parcelas,
// caminos claros entre franjas, olivares; bosquecillos y pueblos de casitas
void campos(inout Sup s, vec2 p, float pw) {
  vec2 zi = floor(p / 4200.0 + 0.5 * vec2(vnoise(p / 6000.0), vnoise(p / 6000.0 + 9.0)));
  float ang = (hash12(zi + 2.0) - 0.5) * 1.1;
  vec2 q = rot2(ang) * p;
  vec2 cel = vec2(1300.0, 900.0) * (0.75 + 0.5 * hash12(zi + 5.0));
  vec2 ci = floor(q / cel);
  vec2 cf = q - (ci + 0.5) * cel;
  float nS = 2.0 + floor(hash12(ci + zi * 7.0 + 9.0) * 3.0);
  float fx = (cf.x / cel.x + 0.5) * nS;
  float sI = floor(fx);
  vec2 id = ci * 7.0 + vec2(sI, 0.0) + zi * 131.0;
  float k = hash12(id);
  vec3 c = colorCampo(k) * (0.88 + 0.24 * vnoise(p / 160.0));
  float sr = sin(cf.y / 7.0 * 6.283);
  float fs = (1.0 - smoothstep(1.2, 3.0, pw)) * step(0.48, k) * step(k, 0.74);
  c *= 1.0 + 0.12 * sr * fs;
  float h = 2.0 + 0.6 * sr * fs;
  // olivares: puntitos oscuros en cuadrícula (de lejos, un moteado)
  float oli = step(0.74, k) * step(k, 0.86);
  vec2 og = fract(q / max(9.0, pw * 2.5)) - 0.5;
  float arb = (1.0 - smoothstep(0.18, 0.3, length(og))) * oli;
  c = mix(c, vec3(0.06, 0.1, 0.04), arb * 0.8);
  h += 3.0 * arb;
  // caminos claros entre franjas y setos (churros verdes) entre parcelas
  float bx = min(fract(fx), 1.0 - fract(fx)) * cel.x / nS;
  float by = (0.5 - abs(cf.y / cel.y)) * cel.y;
  float bp = min((0.5 - abs(cf.x / cel.x)) * cel.x, by);
  float lwC = max(4.0, pw * 0.5);
  float cam = (1.0 - smoothstep(lwC * 0.5, lwC, bx)) * min(1.0, 8.0 / pw + 0.3) * (1.0 - smoothstep(40.0, 90.0, pw));
  c = mix(c, vec3(0.46, 0.4, 0.28), cam * 0.8);
  float wS = max(14.0, pw * 0.9);
  float seto = 1.0 - smoothstep(0.0, wS, bp);
  float vis = 1.0 - smoothstep(60.0, 140.0, pw);
  float hMin = 2.5 * pw / max(uKH, 0.1);
  pon(s, 1.0, h, c, 0.0);
  pon(s, seto * vis, max(10.0, hMin) * sqrt(max(1.0 - bp * bp / (wS * wS), 0.0)) + 2.0, mix(C_ARBOL, C_HIERBA, 0.3) * (0.8 + 0.3 * vnoise(p / 30.0)), 0.0);
  // bosquecillos y encinares
  float bq = smoothstep(0.62, 0.68, fbm3(p / 3200.0 + 11.0));
  float copas = vnoise(p / max(25.0, pw * 2.5));
  pon(s, bq, max(12.0, hMin * 1.5) * (0.7 + 0.5 * copas), mix(C_ARBOL, C_HIERBA, 0.25) * (0.75 + 0.4 * copas), 0.0);
  // pueblos: casitas apiñadas alrededor de una plaza
  vec2 vg = p / 9000.0; vec2 vi = floor(vg);
  vec2 vc = (vi + 0.2 + 0.6 * hash22(vi + 50.0)) * 9000.0;
  float vr = mix(350.0, 900.0, hash12(vi + 51.0));
  float dv = length(p - vc) - vr + 200.0 * (vnoise(p / 260.0) - 0.5);
  float hayP = step(hash12(vi + 52.0), 0.65) * step(1500.0, ciudadD(vc));
  float tam = max(40.0, pw * 3.0);
  vec2 tc = floor(p / tam); vec2 tf = fract(p / tam) - 0.5;
  float casa = step(max(abs(tf.x), abs(tf.y)), 0.36) * step(hash12(tc + 2.0), 0.85);
  vec3 tej = mix(colorTejado(hash12(tc)), C_CREAM * 0.8, 0.2);
  float covV = clamp(0.5 - dv / pw, 0.0, 1.0) * hayP;
  pon(s, covV, 2.0, vec3(0.36, 0.3, 0.22), 0.0);
  pon(s, covV * casa, max(7.0, hMin) * (1.0 + 0.4 * hash12(tc + 7.0)), tej, 0.0);
}
const vec2 SIERRA[4] = vec2[4](vec2(-260187.0, -18394.0), vec2(-124226.0, -10757.0), vec2(-22306.0, 43844.0), vec2(36394.0, 88375.0));
const vec2 IBERICO[3] = vec2[3](vec2(60734.0, 177474.0), vec2(161860.0, 90058.0), vec2(231853.0, -8199.0));
// la región: la meseta en grandes manchas de cultivo (mostaza, ocre, salvia, terracota), dehesas moteadas,
// la sierra como un churro de arcilla pellizcado con la nieve en las cumbres, embalses
void region(inout Sup s, vec2 p, float pw) {
  vec2 k = p / 1000.0;
  float n1 = fbm3(k / 40.0);
  vec3 c = mix(vec3(0.32, 0.22, 0.09), vec3(0.19, 0.19, 0.07), smoothstep(0.35, 0.7, n1));
  float zona = vnoise(k / 14.0 + 3.0);
  c = mix(c, colorCampo(zona) * 0.85, 0.55) * (0.9 + 0.2 * vnoise(k / 3.0));
  // dehesa: motas de encina
  float deh = smoothstep(0.55, 0.62, vnoise(k / 22.0 + 8.0));
  vec2 dg = fract(k / max(0.35, pw / 400.0)) - 0.5;
  c = mix(c, vec3(0.07, 0.11, 0.04), deh * (1.0 - smoothstep(0.15, 0.3, length(dg))) * 0.8);
  float h = 400.0 * n1;
  float dS = 1e9;
  for (int i = 0; i < 3; i++) dS = min(dS, sdSeg(p, SIERRA[i], SIERRA[i + 1]));
  float dI = min(sdSeg(p, IBERICO[0], IBERICO[1]), sdSeg(p, IBERICO[1], IBERICO[2]));
  float mS = 1.0 - smoothstep(0.0, 20000.0, dS + 7000.0 * (vnoise(k / 15.0) - 0.5));
  float mI = (1.0 - smoothstep(0.0, 34000.0, dI + 12000.0 * (vnoise(k / 20.0 + 3.0) - 0.5))) * 0.6;
  float bult = 0.55 * vnoise(k / 7.0 + 1.3) + 0.3 * vnoise(k / 3.2 + 7.0) + 0.15 * vnoise(k / 1.4);
  float hm = (mS * 1900.0 + mI * 1300.0) * (0.35 + 0.65 * bult);
  h += hm;
  vec3 roca = mix(vec3(0.25, 0.17, 0.11), vec3(0.07, 0.14, 0.06), smoothstep(0.45, 0.65, vnoise(k / 4.0)));
  c = mix(c, roca, smoothstep(200.0, 800.0, hm));
  c = mix(c, vec3(0.66, 0.66, 0.68), smoothstep(1500.0, 1650.0, hm));
  // embalses al pie de la sierra
  vec2 eg = k / 22.0; vec2 ei = floor(eg);
  vec2 ec = (ei + 0.25 + 0.5 * hash22(ei + 31.0)) * 22.0;
  float de = length((k - ec) * vec2(1.0, 1.6)) - mix(1.2, 2.6, hash12(ei + 32.0)) + 0.8 * (vnoise(k * 1.3) - 0.5);
  float hayE = step(hash12(ei + 33.0), 0.5) * smoothstep(0.1, 0.4, mS + mI);
  float covE = clamp(0.5 - de * 1000.0 / pw, 0.0, 1.0) * hayE;
  s.h = mix(h, h - 60.0, covE); s.c = mix(c, vec3(0.05, 0.15, 0.25), covE); s.m = covE > 0.5 ? 1.0 : 0.0;
  // pueblos lejanos: puntitos de teja
  vec2 vg = p / 9000.0; vec2 vi = floor(vg);
  vec2 vc = (vi + 0.2 + 0.6 * hash22(vi + 50.0)) * 9000.0;
  float vr = mix(350.0, 900.0, hash12(vi + 51.0));
  float dv = length(p - vc) - max(vr, pw * 1.6);
  float hayP = step(hash12(vi + 52.0), 0.65);
  pon(s, clamp(0.5 - dv / pw, 0.0, 1.0) * hayP * (1.0 - smoothstep(5.5, 6.0, uZ)), s.h + max(8.0, 3.0 * pw / max(uKH, 0.1)), vec3(0.5, 0.17, 0.08), 0.0);
}
// la península y el mundo: la máscara de tierra pintada al cargar, con detalle de costa
float senoLat(vec2 xy) { float zz = sqrt(max(1.0 - dot(xy, xy), 0.0)); return xy.y * 0.7618 + zz * 0.6478; }
void continente(inout Sup s, vec2 p, float pw) {
  vec2 xy = p / 6.371e6;
  vec2 uv = vec2(0.5 + 0.5 * xy.x, 0.5 - 0.5 * xy.y);
  vec4 a = texture(uCont1, uv), b = texture(uCont2, uv);
  vec2 k = p / 1000.0;
  float n = (fbm3(k / 140.0) - 0.5) * 0.24 + (vnoise(k / 35.0) - 0.5) * 0.12;
  float tierra = smoothstep(0.48, 0.52, a.r + n);
  float sl = senoLat(xy);
  vec3 suelo = mix(vec3(0.16, 0.17, 0.06), vec3(0.07, 0.13, 0.05), smoothstep(0.72, 0.86, sl));
  suelo = mix(suelo, vec3(0.27, 0.2, 0.09), smoothstep(0.55, 0.0, abs(sl - 0.62)) * 0.5);
  suelo = mix(suelo, vec3(0.50, 0.36, 0.16), smoothstep(0.1, 0.6, b.r));
  suelo = mix(suelo, vec3(0.04, 0.11, 0.035), smoothstep(0.2, 0.7, b.g) * 0.85);
  suelo *= 0.88 + 0.24 * vnoise(k / 60.0);
  float rid = 1.0 - abs(2.0 * vnoise(k / 45.0 + 2.0) - 1.0);
  float mm = smoothstep(0.05, 0.9, a.g);
  float hM = mm * 3200.0 * (0.45 + 0.55 * rid * rid);
  suelo = mix(suelo, vec3(0.22, 0.17, 0.12), smoothstep(0.2, 0.6, mm) * 0.7);
  suelo = mix(suelo, vec3(0.62, 0.62, 0.64), smoothstep(0.97, 1.02, mm * (0.5 + 0.5 * rid)) * 0.8);
  suelo = mix(suelo, vec3(0.66, 0.68, 0.72), smoothstep(0.3, 0.6, a.b));
  float somero = smoothstep(0.15, 0.48, a.r + n);
  float ola = sin(dot(k, vec2(0.6, 0.8)) / 9.0 + 3.0 * vnoise(k / 50.0));
  vec3 mar = mix(vec3(0.025, 0.07, 0.15), vec3(0.04, 0.17, 0.25), somero) * (0.9 + 0.1 * ola);
  s.h = mix(-600.0 + 60.0 * ola, 250.0 + hM + 400.0 * vnoise(k / 80.0) + 1500.0 * smoothstep(0.3, 0.6, a.b), tierra);
  s.c = mix(mar, suelo, tierra);
  s.m = tierra < 0.5 ? 1.0 : 0.0;
}
// nubes de plastilina sobre la esfera (blancas, abultadas; despejado encima de nosotros)
void nubes(inout Sup s, vec2 xy, float w) {
  float r2 = dot(xy, xy);
  vec3 dir = vec3(xy, sqrt(max(1.0 - r2, 0.0)));
  float sl = senoLat(xy);
  // dos borrascas en el Atlántico: las nubes giran en espiral alrededor
  for (int i = 0; i < 2; i++) {
    vec2 cc = i == 0 ? vec2(-0.36, 0.3) : vec2(-0.55, -0.12);
    vec2 dq = xy - cc;
    float rr = length(dq);
    float giro = 3.2 * exp(-rr * rr / 0.012) * (i == 0 ? 1.0 : -0.8);
    dir.xy = cc + rot2(giro) * dq;
  }
  vec3 wd = dir * 3.0 + vec3(vnoise3(dir * 5.0 + 9.0), vnoise3(dir * 5.0 + 4.0), 0.0) * 0.8;
  float c = vnoise3(wd + 1.7) * 0.55 + vnoise3(wd * 2.6 + 3.1) * 0.3 + vnoise3(dir * 24.0 + uBoil * 0.04) * 0.15;
  c += 0.07 * cos(sl * 7.0) - 0.04;
  c *= smoothstep(0.04, 0.22, sqrt(r2));
  float cov = smoothstep(0.6, 0.625, c) * w;
  float hN = 900.0 + 6000.0 * sqrt(clamp((c - 0.6) / 0.08, 0.0, 1.0));
  s.h = mix(s.h, max(s.h, 0.0) + hN, cov);
  s.c = mix(s.c, vec3(0.72, 0.71, 0.68) * (0.92 + 0.1 * vnoise3(dir * 40.0)), cov);
  if (cov > 0.5) s.m = 2.0;
}
// la Tierra entera vista desde arriba (cúpula) con lo que toque a esta escala
void tierraEntera(inout Sup s, vec2 P, bool detalle) {
  vec2 p = (P - uSuelo.xy) * uMpp;
  float R = uSuelo.z * uMpp;
  float r = length(p);
  float pw = uMpp;
  Sup t; t.h = 0.0; t.c = vec3(0.0); t.m = 0.0; t.e = 0.0; t.glow = vec3(0.0);
  float wCont = smoothstep(5.35, 6.05, uZ);
#ifdef LEJOS
  region(t, p, pw);
  float wCampo = 1.0 - smoothstep(4.7, 5.4, uZ);
  if (wCampo > 0.0) { Sup f = t; campos(f, p, pw); mezcla(t, f, wCampo); }
  float dC = ciudadD(p);
  float covC = clamp(0.5 - dC / pw, 0.0, 1.0);
  Sup cz = t; ciudadLejos(cz, p, pw, dC);
  covC *= step(-5000.0, cz.h);
  cz.h = max(cz.h, 0.0);
  mezcla(t, cz, covC);
  float dRio = abs(rioD(p));
  float anchoR = 36.0 * (1.0 + 0.6 * smoothstep(0.0, 6000.0, dC));
  float covR = clamp(0.5 - (dRio - anchoR) / pw, 0.0, 1.0);
  covR = max(covR, (1.0 - smoothstep(0.0, pw * 0.7, dRio)) * 0.8);
  pon(t, covR, t.h - 4.0, vec3(0.05, 0.16, 0.26), 1.0);
  // autopistas: la ronda y seis radiales
  vec2 qc = p - CIUDAD;
  float rc = length(qc), ac = atan(qc.y, qc.x);
  float dRonda = abs(rc - 10200.0 - 500.0 * sin(ac * 3.0 + 1.0));
  float aR = floor(ac / 1.0472 + 0.5) * 1.0472 + 0.2;
  vec2 dirR = vec2(cos(aR), sin(aR));
  float dRad = abs(dot(qc, vec2(-dirR.y, dirR.x)) + 900.0 * sin(dot(qc, dirR) / 9000.0)) + step(dot(qc, dirR), 9800.0) * 1e5;
  float dA = min(dRonda, dRad);
  float covA = clamp((max(20.0, pw * 0.5) - dA) / pw + 0.5, 0.0, 1.0) * min(1.0, max(40.0 / pw, 0.7));
  pon(t, covA * (1.0 - smoothstep(6.0, 6.6, uZ)), t.h + 3.0, vec3(0.42, 0.38, 0.33), 0.0);
  Sup k = t; continente(k, p, pw);
  mezcla(t, k, max(wCont, step(0.5, k.m) * smoothstep(4.9, 5.25, uZ)));
#else
  continente(t, p, pw);
#endif
  nubes(t, p / R, smoothstep(5.65, 6.4, uZ));
  float rr = min(r, R);
  float hDome = -(rr * rr) / (R + sqrt(max(R * R - rr * rr, 0.0))) / uMpp;
  float covT = clamp(0.5 - (r - R) / uMpp, 0.0, 1.0);
  // el borde de la Tierra un poco azulado (la atmósfera)
  t.c = mix(t.c, vec3(0.2, 0.36, 0.62), smoothstep(0.86, 1.0, r / R) * 0.4);
  Sup T; T.h = uSuelo.w + hDome + t.h * uKH / uMpp; T.c = t.c; T.m = t.m; T.e = 0.0; T.glow = vec3(0.0);
  mezcla(s, T, covT);
  s.glow += vec3(0.25, 0.5, 1.0) * 0.32 * exp(-max(r - R, 0.0) / (0.045 * R)) * (1.0 - covT) * smoothstep(5.9, 6.6, uZ);
}
`;

// ---------- la Tierra pequeña, la Luna, el Sol y las órbitas ----------
const GLSL_SOL = /* glsl */`
void tierraPequena(inout Sup s, vec2 P) {
  float R = uSuelo.z;
  if (R > 7.0) { tierraEntera(s, P, false); return; }
  cuenta(s, P - uSuelo.xy, max(R, 5.0), uTablero, vec3(0.12, 0.3, 0.62), 0.9, vec3(0.3, 0.55, 1.0));
}
void luna(inout Sup s, vec2 P) {
  if (uLuna.w < 0.002) return;
  vec2 q = P - uLuna.xy; float R = max(uLuna.z, 2.0); float r = length(q);
  float d = r - R;
  float cov = clamp(0.5 - d, 0.0, 1.0) * uLuna.w;
  if (cov <= 0.0) return;
  vec2 n = q / R;
  float hz = sqrt(max(R * R - r * r, 0.0));
  float cr = 0.0, aro = 0.0;
  for (int k = 0; k < 10; k++) {
    vec2 cc = (hash22(vec2(float(k), 7.0)) - 0.5) * 1.6;
    float rk = 0.07 + 0.16 * hash12(vec2(float(k), 9.0));
    float dk = length(n - cc) / rk;
    cr += (1.0 - smoothstep(0.55, 1.0, dk)) * 0.6;
    aro += exp(-pow((dk - 1.05) * 4.5, 2.0)) * 0.5;
  }
  float mar = smoothstep(0.52, 0.6, vnoise(n * 2.4 + 4.0));
  vec3 c = mix(vec3(0.40, 0.39, 0.37), vec3(0.24, 0.24, 0.26), mar) * (0.9 + 0.2 * vnoise(n * 9.0 + uBoil.xy * 0.1));
  pon(s, cov, uTablero + hz * 0.95 + R * 0.07 * (aro - cr), c * (1.0 - 0.15 * cr), 0.0);
}
void sol(inout Sup s, vec2 P) {
  if (uSol.w < 0.002) return;
  vec2 q = P - uSol.xy; float R = max(uSol.z, 6.0); float r = length(q);
  float ang = atan(q.y, q.x);
  float bordeR = R * (1.0 + 0.006 * sin(ang * 23.0 + uBoil.x * 3.0) + 0.005 * sin(ang * 37.0 - uBoil.y * 4.0) + 0.01 * (vnoise(vec2(ang * 3.0, uBoil.z)) - 0.5));
  float d = r - bordeR;
  float cov = clamp(0.5 - d, 0.0, 1.0) * uSol.w;
  vec2 n = q / R;
  // plastilina naranja y amarilla amasadas juntas (vetas)
  vec2 w = n * 1.6 + vec2(vnoise(n * 2.6 + uBoil.xy * 0.15), vnoise(n * 2.6 + 7.0 + uBoil.yz * 0.15)) * 1.1;
  float veta = sin((w.x * 2.2 + w.y * 1.3 + 2.0 * vnoise(w * 2.0)) * 3.3);
  float veta2 = vnoise(w * 4.5 + 3.0);
  vec3 c = mix(vec3(0.9, 0.2, 0.012), vec3(1.0, 0.52, 0.04), smoothstep(-0.25, 0.35, veta));
  c = mix(c, vec3(0.72, 0.1, 0.01), smoothstep(0.62, 0.8, veta2) * 0.6);
  float hz = sqrt(max(R * R - r * r, 0.0));
  ponE(s, cov, uTablero + hz * 0.4 + R * 0.02 * veta, c, 3.0, 0.13);
  // llamas: lenguas de churro alrededor, naranjas y amarillas, que tiemblan en cada fotograma
  float fcov = 0.0;
  for (int k = 0; k < 18; k++) {
    float fk = float(k);
    float a0 = fk * 0.349 + 0.12 * sin(fk * 2.7) + 0.03 * (hash12(vec2(fk, uFrame)) - 0.5);
    float L = R * (0.13 + 0.09 * hash12(vec2(fk, 4.0))) * (0.92 + 0.16 * hash12(vec2(fk, uFrame + 2.0)));
    float wd = R * 0.075;
    float da = ang - a0; da = da - 6.2832 * floor(da / 6.2832 + 0.5);
    float rho = r - R * 0.97;
    float curva = (hash12(vec2(fk, 9.0)) - 0.5) * 0.9;
    float x = da * r - curva * rho * rho / max(L, 1.0);
    float t = clamp(rho / L, 0.0, 1.0);
    float ancho = wd * pow(1.0 - t, 0.8) * (0.55 + 0.45 * smoothstep(0.0, 0.3, t));
    float dl = max(abs(x) - ancho, max(-rho, rho - L));
    float cl = clamp(0.5 - dl, 0.0, 1.0) * uSol.w * step(R * 0.96, r);
    vec3 cf = mod(fk, 2.0) < 0.5 ? vec3(0.95, 0.22, 0.015) : vec3(1.0, 0.45, 0.03);
    ponE(s, cl, uTablero + R * 0.06 * (1.0 - t) + 2.0, cf, 3.0, 0.14);
    fcov = max(fcov, cl);
  }
  // la corona: luz cálida sobre el tablero
  s.glow += vec3(1.0, 0.5, 0.15) * uSol.w * 0.7 * exp(-max(d, 0.0) / (R * 0.3 + 4.0)) * (1.0 - cov) * (1.0 - fcov);
}
// las órbitas de los planetas (churros finos, elipses inclinadas) y los planetas; cinturones
const float AU_K[8] = float[8](0.387, 0.723, 1.0, 1.524, 5.203, 9.537, 19.19, 30.07);
const float FI[8] = float[8](2.1, 4.0, -0.9378, 0.7, 2.55, 4.85, 1.25, 3.55);
const float PR[8] = float[8](3.6, 5.6, 5.6, 4.6, 11.0, 9.5, 7.0, 7.0);
vec3 colorPlaneta(int k) {
  if (k == 0) return vec3(0.35, 0.33, 0.32);
  if (k == 1) return vec3(0.62, 0.5, 0.28);
  if (k == 2) return vec3(0.1, 0.25, 0.5);
  if (k == 3) return vec3(0.6, 0.18, 0.07);
  if (k == 4) return vec3(0.6, 0.42, 0.25);
  if (k == 5) return vec3(0.62, 0.52, 0.32);
  if (k == 6) return vec3(0.35, 0.6, 0.65);
  return vec3(0.12, 0.25, 0.62);
}
void sistema(inout Sup s, vec2 P) {
  if (uSis.w < 0.002) return;
  vec2 q = P - uSis.xy;
  for (int k = 0; k < 8; k++) {
    float a = AU_K[k] * uSis.z;
    float vis = smoothstep(14.0, 40.0, a) * (1.0 - smoothstep(2600.0, 5200.0, a)) * uSis.w;
    if (vis < 0.002) continue;
    float d = abs(sdElipse(q, vec2(a, a * 0.45)));
    float wd = 2.0;
    float cov = clamp(0.5 - (d - wd), 0.0, 1.0) * vis;
    pon(s, cov, uTablero + 2.6 * sqrt(max(1.0 - (d / wd) * (d / wd), 0.0)) + 0.5, C_CREAM * 0.8 * (0.9 + 0.1 * vnoise(q * 0.05)), 0.0);
    if (k == 2) continue;
    vec2 pp = vec2(cos(FI[k]) * a, sin(FI[k]) * a * 0.45);
    vec2 qp = q - pp;
    float pr = PR[k] * vis;
    cuenta(s, qp, pr, uTablero + 1.0, colorPlaneta(k) * (k == 4 ? 0.85 + 0.25 * sin(qp.y * 2.2) : 1.0), 0.15, colorPlaneta(k));
    if (k == 5) {
      float dAn = abs(sdElipse(qp, vec2(pr * 2.1, pr * 0.6))) - 1.2;
      pon(s, clamp(0.5 - dAn, 0.0, 1.0) * vis * step(0.0, length(qp) - pr * 0.95 + step(0.0, -qp.y) * 10.0), uTablero + pr * 0.9, vec3(0.6, 0.5, 0.32), 5.0);
    }
  }
  // cinturón de asteroides (2,2–3,3) y de Kuiper (30–50): cuentecitas
  vec2 e = q / uSis.z; e.y /= 0.45;
  float re = length(e), ae = atan(e.y, e.x);
  for (int b = 0; b < 2; b++) {
    float r0 = b == 0 ? 2.2 : 30.0, r1 = b == 0 ? 3.3 : 50.0;
    float vis = smoothstep(r0 * 10.0, r0 * 30.0, uSis.z * r0) * (1.0 - smoothstep(1800.0, 3600.0, uSis.z * r0)) * uSis.w;
    vec2 cel = vec2(floor(re / ((r1 - r0) / 7.0)), floor(ae / (6.2832 / (b == 0 ? 260.0 : 320.0))));
    float hay = step(hash12(cel + float(b) * 9.0), 0.42) * step(r0, re) * step(re, r1);
    float rc = (cel.x + 0.5) * (r1 - r0) / 7.0;
    float ac = (cel.y + 0.2 + 0.6 * hash12(cel + 3.0)) * 6.2832 / (b == 0 ? 260.0 : 320.0);
    vec2 pc = vec2(cos(ac), sin(ac) * 0.45) * rc * uSis.z;
    cuenta(s, q - pc, 1.4 * hay * vis, uTablero, vec3(0.42, 0.38, 0.33), 0.0, vec3(0.0));
  }
}
`;

// ---------- el espacio: la nube de Oort, las estrellas vecinas, la galaxia ----------
const GLSL_ESPACIO = /* glsl */`
// estrellas vecinas: x, y (años luz) · radio (px) · color (0 amarilla, 1 blanca, 2 naranja, 3 roja)
const vec4 VEC[17] = vec4[17](vec4(-3.1, -3.0, 6.0, 0.0), vec4(-3.0, -3.25, 3.5, 2.0), vec4(-2.6, -3.3, 2.2, 3.0), vec4(4.2, 4.0, 3.0, 3.0),
  vec4(-7.2, 3.1, 2.5, 3.0), vec4(6.0, -5.7, 3.0, 3.0), vec4(-5.5, 6.5, 8.5, 1.0), vec4(2.6, -8.3, 2.5, 3.0), vec4(9.2, 3.0, 2.5, 3.0),
  vec4(-2.5, 10.0, 2.5, 3.0), vec4(8.4, -6.3, 4.5, 2.0), vec4(-10.3, -2.9, 3.0, 3.0), vec4(3.0, 10.6, 2.5, 3.0), vec4(-9.0, -7.0, 6.5, 1.0),
  vec4(11.0, -2.5, 4.0, 2.0), vec4(-6.5, -10.0, 5.0, 0.0), vec4(5.5, 10.5, 4.0, 2.0));
vec3 colorTipo(float t) { return t < 0.5 ? vec3(0.9, 0.7, 0.3) : t < 1.5 ? vec3(0.78, 0.82, 0.92) : t < 2.5 ? vec3(0.9, 0.52, 0.2) : vec3(0.85, 0.3, 0.18); }
void vecinas(inout Sup s, vec2 P) {
  if (uVec.w < 0.002) return;
  for (int i = 0; i < 17; i++) {
    vec4 v = VEC[i];
    vec2 q = P - (uVec.xy + v.xy * uVec.z);
    vec3 c = colorTipo(v.w);
    cuenta(s, q, v.z * uVec.w, uTablero, c, 0.9 * uVec.w, c);
  }
}
void oort(inout Sup s, vec2 P, float w) {
  if (w < 0.002) return;
  vec2 q = (P - uSis.xy) / uSis.z;        // en unidades de la órbita de la Tierra (UA)
  float r = length(q), a = atan(q.y, q.x);
  float na = floor(80.0 + 40.0 * hash12(vec2(floor(log(max(r, 1.0)) * 6.0), 2.0)));
  vec2 cel = vec2(floor(log(max(r, 1.0)) * 6.0), floor((a + 3.1416) / (6.2832 / na)));
  float rc = exp((cel.x + 0.15 + 0.7 * hash12(cel + 8.0)) / 6.0);
  float dens = smoothstep(1500.0, 5000.0, rc) * (1.0 - smoothstep(40000.0, 90000.0, rc));
  float hay = step(hash12(cel + 5.0), 0.45 * dens);
  float ac = (cel.y + 0.2 + 0.6 * hash12(cel + 1.0)) * 6.2832 / na - 3.1416;
  vec2 pc = vec2(cos(ac), sin(ac)) * rc * uSis.z;
  cuenta(s, P - uSis.xy - pc, 1.5 * hay * w, uTablero, vec3(0.55, 0.62, 0.7), 0.25 * w, vec3(0.5, 0.6, 0.8));
  s.glow += vec3(0.25, 0.32, 0.45) * 0.07 * w * dens * smoothstep(0.0, 1.0, r / 2000.0);
}
// la galaxia: un disco oscuro con la barra y el bulbo de crema, dos brazos mayores de churros trenzados con
// cuentas y polvo, dos menores más finos; los brazos se rompen en cuentas por fuera
const float G_PITCH = 0.23, G_SQ = 0.82, G_FASE = 1.17;
float galBrazos(vec2 g, out float dMay, out float dMen, out float kM) {
  float r = length(g);
  float th = atan(g.y, g.x);
  float ph = th - log(max(r, 0.04)) / G_PITCH - G_FASE;
  float pM = mod(ph + 1.5708, 3.14159) - 1.5708;
  float pm = mod(ph, 3.14159) - 1.5708;
  kM = mod(floor((ph + 1.5708) / 3.14159), 2.0);
  dMay = pM * r * 0.225;
  dMen = pm * r * 0.225;
  return r;
}
float galDensidad(vec2 g) {
  float dMay, dMen, kM;
  float r = galBrazos(g, dMay, dMen, kM);
  float wM = 0.04 + 0.035 * r, wm = 0.025 + 0.022 * r;
  float br = exp(-pow(dMay / wM, 2.0)) + 0.6 * exp(-pow(dMen / wm, 2.0));
  br *= smoothstep(0.1, 0.2, r) * (1.0 - smoothstep(0.85, 1.05, r));
  return br * 0.8 + 1.2 * exp(-r * r / 0.02) + 0.1 * (1.0 - smoothstep(0.6, 1.05, r));
}
// un churro (perfil redondo) de semiancho w a distancia d; se queda con el más alto
void churroG(inout Sup s, float d, float w, float hBase, vec3 c, float pxU, float alto) {
  if (w * pxU < 0.3) return;
  float cov = clamp((w - d) * pxU + 0.5, 0.0, 1.0);
  float h = hBase + sqrt(max(w * w - d * d, 0.0)) * pxU * alto;
  if (h > s.h || cov < 1.0) { s.h = mix(s.h, max(s.h, h), cov); s.c = mix(s.c, c, cov * step(s.h - 0.5, h)); if (cov > 0.5) s.m = 0.0; }
}
void galaxia(inout Sup s, vec2 P) {
  if (uGal.w < 0.002) return;
  float pxU = uGal.z;
  vec2 g = (P - uGal.xy) / pxU;
  g.y /= G_SQ;
  float dMay, dMen, kM;
  float r = galBrazos(g, dMay, dMen, kM);
  float lr = log(max(r, 0.04));
  float fade = 1.0 - smoothstep(0.78, 0.96, r + 0.08 * (vnoise(g * 6.0) - 0.5));
  fade *= step(0.25, fade);
  float ini = smoothstep(0.13, 0.22, r);
  float a = uGal.w;
  float hB = uTablero + 0.004 * pxU;
  // el disco: apenas un velo de arcilla añil que se funde con el tablero
  float dD = r - 1.0 - 0.1 * (vnoise(g * 3.0 + 1.0) - 0.5);
  float covD = (1.0 - smoothstep(-0.25, 0.05, dD)) * a;
  vec3 colD = mix(vec3(0.05, 0.045, 0.1), vec3(0.18, 0.11, 0.09), exp(-r * 2.6)) * (0.85 + 0.3 * vnoise(g * 9.0));
  pon(s, covD, uTablero + 0.004 * pxU * (1.0 - smoothstep(-0.3, 0.0, dD)), colD, 0.0);
  // brazos mayores: dos churros trenzados, con cortes y variaciones de grosor
  float var = 0.75 + 0.5 * vnoise(vec2(lr * 5.0, kM * 7.0));
  float corte = smoothstep(0.1, 0.24, vnoise(vec2(lr * 3.2 + 2.0, kM * 3.0 + 1.0)));
  float w = (0.042 + 0.036 * r) * fade * ini * var * corte * a;
  float tw = lr * 19.0 + kM * 2.0;
  float off = 0.42 * w * sin(tw);
  float tR = smoothstep(0.2, 0.7, r);
  vec3 cA = mix(vec3(0.72, 0.36, 0.13), vec3(0.13, 0.22, 0.66), tR) * (0.9 + 0.2 * vnoise(g * 30.0));
  vec3 cB = mix(vec3(0.78, 0.26, 0.2), vec3(0.34, 0.17, 0.56), tR) * (0.9 + 0.2 * vnoise(g * 27.0 + 3.0));
  float arriba = cos(tw);
  churroG(s, abs(dMay - off), w * 0.52, hB + w * pxU * 0.16 * arriba, cA, pxU, 0.8);
  churroG(s, abs(dMay + off), w * 0.48, hB - w * pxU * 0.16 * arriba, cB, pxU, 0.8);
  // polvo: un churrito oscuro por el lado de dentro
  churroG(s, abs(dMay + w * 1.05), w * 0.16 * smoothstep(0.25, 0.4, r), hB, vec3(0.045, 0.022, 0.018), pxU, 0.6);
  // brazos menores: un churro fino, lila
  float varm = 0.6 + 0.8 * vnoise(vec2(lr * 6.0, kM * 5.0 + 9.0));
  float cortem = smoothstep(0.22, 0.36, vnoise(vec2(lr * 4.0 + 7.0, kM * 2.0)));
  float wm = (0.02 + 0.018 * r) * fade * ini * varm * cortem * a;
  churroG(s, abs(dMen), wm, hB, mix(vec3(0.62, 0.24, 0.3), vec3(0.22, 0.2, 0.6), tR) * (0.9 + 0.2 * vnoise(g * 25.0)), pxU, 0.8);
  // cuentas a lo largo de los brazos: nebulosas rosas, estrellas azules, alguna amarilla
  for (int lado2 = 0; lado2 < 2; lado2++) {
    float u = lr * 30.0 + float(lado2) * 0.5;
    float ui = floor(u);
    vec2 sem = vec2(ui, kM * 5.0 + float(lado2) * 13.0);
    float kb = hash12(sem + 3.0);
    float lado = (hash12(sem + 7.0) - 0.5) * 2.2;
    float rb = exp((ui + 0.5 - float(lado2) * 0.5) / 30.0);
    float wb = (0.042 + 0.036 * rb);
    float dB = length(vec2((u - ui - 0.5) / 30.0 * rb * 4.35, dMay - lado * wb));
    float rB = wb * (0.2 + 0.2 * hash12(sem + 11.0)) * step(0.3, kb) * smoothstep(0.17, 0.26, r) * (1.0 - smoothstep(0.98, 1.12, r)) * a;
    vec3 cb = kb < 0.58 ? vec3(0.92, 0.1, 0.32) : kb < 0.86 ? vec3(0.22, 0.42, 1.0) : vec3(1.0, 0.72, 0.25);
    if (rB > 0.0) {
      float covB = clamp((rB - dB) * pxU + 0.5, 0.0, 1.0);
      float hBd = max(s.h, hB) + sqrt(max(rB * rB - dB * dB, 0.0)) * pxU * 0.9;
      s.h = mix(s.h, hBd, covB); s.c = mix(s.c, cb, covB); s.e = mix(s.e, 0.1, covB);
      s.glow += cb * 0.22 * exp(-max(dB - rB, 0.0) * pxU / 7.0) * (1.0 - covB);
    }
  }
  // barra y bulbo de crema, con su brillo
  vec2 gb = rot2(-0.45) * g;
  float dN = smin(sdElipse(gb, vec2(0.19, 0.055)), length(g) - 0.15, 0.08) + 0.012 * (vnoise(g * 20.0 + uBoil.xy * 0.2) - 0.5);
  float cN = clamp(0.5 - dN * pxU, 0.0, 1.0) * a;
  float hN = 0.08 * pxU * bisel(dN, 0.1) + 0.05 * pxU * exp(-dot(g, g) / 0.008);
  ponE(s, cN, hB + hN, mix(vec3(0.8, 0.42, 0.13), vec3(1.0, 0.72, 0.32), exp(-dot(g, g) / 0.008)) * (0.92 + 0.16 * vnoise(g * 30.0)), 0.0, 0.16);
  s.glow += vec3(1.0, 0.62, 0.3) * 0.32 * exp(-dot(g, g) / 0.035) * a;
  s.glow += vec3(0.25, 0.3, 0.8) * 0.045 * galDensidad(g) * fade * a;
}
// galaxias lejanas: remolinos pequeños de plastilina alrededor
const vec4 GLX[5] = vec4[5](vec4(-1.85, 0.95, 0.1, 0.5), vec4(-1.55, -0.78, 0.07, 2.0), vec4(1.45, -0.75, 0.08, 1.2), vec4(-0.5, 1.12, 0.045, 3.3), vec4(1.05, 1.1, 0.05, 4.4));
void lejanas(inout Sup s, vec2 P) {
  if (uGal.w < 0.002) return;
  vec2 g = (P - uGal.xy) / uGal.z;
  for (int i = 0; i < 5; i++) {
    vec4 G = GLX[i];
    vec2 q = rot2(G.w) * (g - G.xy);
    q.y /= 0.5 + 0.4 * fract(G.w * 3.7);
    float r = length(q) / G.z;
    if (r > 1.6) continue;
    float th = atan(q.y, q.x);
    float esp = 0.5 + 0.5 * cos(2.0 * th - 4.5 * log(max(r, 0.05)) + G.w);
    float brazo = smoothstep(0.55, 0.9, esp) * (1.0 - smoothstep(0.5, 1.0, r)) * smoothstep(0.12, 0.25, r);
    float nucleo = exp(-r * r * 14.0);
    float px = G.z * uGal.z;
    float cov = clamp(max(brazo, nucleo * 1.5) * 1.6 - 0.2, 0.0, 1.0) * uGal.w * clamp(px / 6.0, 0.0, 1.0);
    vec3 c = mix(vec3(0.32, 0.34, 0.62), vec3(0.85, 0.66, 0.42), clamp(nucleo * 1.6, 0.0, 1.0));
    pon(s, cov, uTablero + px * (0.05 * brazo + 0.14 * nucleo), c, 0.0);
    s.glow += mix(vec3(0.4, 0.45, 0.8), vec3(1.0, 0.8, 0.5), nucleo) * 0.15 * (nucleo + 0.3 * brazo) * uGal.w;
  }
}
// estrellas de la galaxia (dos octavas), tantas como diga su densidad
void estrellasGal(inout Sup s, vec2 P, vec4 oct) {
  if (oct.w < 0.002 || uGal.w < 0.001) return;
  vec2 c = (P - uGal.xy) * oct.z;
  vec2 id = floor(c), f = fract(c);
  vec2 g = ((id + 0.5) / oct.z) / uGal.z; g.y /= G_SQ;
  float dens = clamp(galDensidad(g) * 0.6, 0.04, 0.9);
  if (hash12(id + 17.0) > dens) return;
  vec2 j = 0.2 + 0.6 * hash22(id + 3.1);
  float rpx = mix(0.03, 0.07, pow(hash12(id + 9.7), 3.0)) * min(1.0 / oct.z, 85.0) * oct.w;
  vec3 col = colorEstrella(hash12(id + 41.0));
  cuenta(s, (f - j) / oct.z, rpx, uTablero, col, 0.4 * oct.w, col);
}
void marcaAqui(inout Sup s, vec2 P) {
  if (uAqui.z < 0.002) return;
  vec2 q = P - uAqui.xy;
  float rA = 15.0 * uAqui.z;
  float d = abs(length(q) - rA) - 2.4;
  pon(s, clamp(0.5 - d, 0.0, 1.0), s.h + 3.0 + 2.0 * sqrt(max(1.0 - d * d / 6.0, 0.0)), C_TERRA * 1.1, 0.0);
}
`;

// ---------- pasada A principal (variantes) ----------
const GLSL_MAIN_A = /* glsl */`
void main() {
  vec2 P = gl_FragCoord.xy * uDis;
  Sup s; s.h = 0.0; s.c = vec3(0.0); s.m = 0.0; s.e = 0.0; s.glow = vec3(0.0);
  tablero(s, P);
#ifdef CERCA
  {
    vec2 p = (P - uSuelo.xy) * uMpp;
    Sup t; t.h = 0.0; t.c = vec3(0.0); t.m = 0.0; t.e = 0.0; t.glow = vec3(0.0);
    float detalle = 1.0 - smoothstep(0.35, 0.8, uMpp);
    sueloCerca(t, p, uMpp, detalle);
    s.h = uSuelo.w + t.h * uKH / uMpp; s.c = t.c; s.m = t.m;
  }
#else
  for (int i = 0; i < 3; i++) estrellasOctava(s, P, uEstr[i], 0.5, 0.35);
#endif
#ifdef LEJOS
  tierraEntera(s, P, true);
#endif
#ifdef SOL
  sistema(s, P);
  tierraPequena(s, P);
  sol(s, P);
  luna(s, P);
#endif
#ifdef ESPACIO
  galaxia(s, P);
  for (int i = 0; i < 2; i++) estrellasGal(s, P, uEstrG[i]);
  lejanas(s, P);
  oort(s, P, uAqui.w);
  sistema(s, P);
  vecinas(s, P);
  cuenta(s, P - uSol.xy, 5.0 * uSol.w, uTablero + 1.0, vec3(1.0, 0.72, 0.25), 1.2 * uSol.w, vec3(1.0, 0.7, 0.3));
  marcaAqui(s, P);
#endif
  o0 = vec4(s.h, s.m, s.e, 0.0);
  o1 = vec4(s.c, 1.0);
  o2 = vec4(s.glow, 1.0);
}
`;

// ---------- pasada B: sombra suave y oclusión, sobre el relieve ----------
const GLSL_SOMBRA = /* glsl */`
uniform sampler2D uG0;
uniform vec3 uL;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy * 2.0);
  ivec2 lim = textureSize(uG0, 0) - 1;
  float h0 = texelFetch(uG0, c, 0).x;
  vec2 d2 = normalize(uL.xy);
  float pend = uL.z / length(uL.xy);
  float res = 1.0, s = 2.5;
  for (int i = 0; i < 22; i++) {
    ivec2 q = clamp(c + ivec2(d2 * s / uDis), ivec2(0), lim);
    float hs = texelFetch(uG0, q, 0).x;
    res = min(res, 7.0 * (h0 + pend * s - hs) / s);
    s *= 1.27;
  }
  res = clamp(res, 0.0, 1.0);
  res = res * res * (3.0 - 2.0 * res);
  // oclusión: vecinos más altos
  float o2 = 0.0;
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.785398 + 0.3;
    for (int j = 1; j <= 2; j++) {
      float r = float(j) * float(j) * 6.0;
      ivec2 q = clamp(c + ivec2(vec2(cos(a), sin(a)) * r / uDis), ivec2(0), lim);
      o2 += clamp((texelFetch(uG0, q, 0).x - h0) / (r * 1.5), 0.0, 1.0) / float(j);
    }
  }
  float ao = clamp(1.0 - o2 / 9.0, 0.0, 1.0);
  o = vec4(res, ao, h0, 1.0);
}
`;

// ---------- pasada C: la arcilla iluminada como en el plató ----------
const GLSL_LUZ = /* glsl */`
uniform sampler2D uG0, uG1, uG2, uSom, uInserto;
uniform vec3 uL;
uniform float uFlicker;
uniform vec4 uLp[2];          // coordenadas de las huellas (dos octavas): desplazamiento · unidades por px · peso
uniform vec4 uIns;            // inserto (foto del plató): centro (px) · escala · opacidad
uniform vec4 uInsM;           // máscara del inserto: centro (px) · radio (px) · suavidad (px)
uniform vec4 uSomA;           // sombra de Atom sobre el mundo: centro (px) · radio · fuerza
uniform vec4 uSomR;           // sombra de la regla: rectángulo (x0, y0, x1, y1 en px)
uniform vec2 uSomRK;          // su fuerza · desenfoque
out vec4 o;
const vec3 LCOL = vec3(1.0, 0.78, 0.56);
const vec3 FILL_DIR = vec3(0.6, -0.5, 0.62);
const vec3 RIM_DIR = vec3(0.55, -0.6, 0.3);
const vec3 RIM_COL = vec3(1.0, 0.72, 0.50);
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
  float ph = r * 6.2832 / spacing + 2.5 * vnoise(y.xy * 5.0 + y.z);
  return vec4(m * fade * cos(ph) * (v / (r + 1e-4)) * 0.22, m * fade * (0.5 - 0.5 * sin(ph)));
}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
vec3 revelar(vec3 col, vec2 P) {
  col *= 1.05;
  col = aces(col);
  col = pow(col, vec3(1.0 / 2.2));
  vec2 q = P / vec2(1920.0, 1080.0) - 0.5;
  col *= 1.0 - 0.38 * pow(length(q * vec2(1.0, 1.15)) * 1.35, 2.6);
  return col + (hash12(gl_FragCoord.xy + uFrame * 17.13) - 0.5) * 0.028;
}
// detalle de la arcilla (bultos y huellas) en las coordenadas de una octava
void detalle(vec2 P, vec4 lp, float seed, inout vec3 g, inout float osc) {
  if (lp.w < 0.003) return;
  vec3 x = vec3((P - vec2(960.0, 540.0)) * lp.z + lp.xy, seed);
  float pixW = lp.z;
  vec4 nd = vnoised(x * 2.6 + uBoil * 0.06);
  vec3 gg = nd.yzw * 0.13;
  vec4 nm = vnoised(x * 7.5 + 5.0);
  gg += nm.yzw * 0.07;
  vec4 f1 = fingerprint(x, 1.05, seed * 3.7, pixW);
  vec4 f2 = fingerprint(x + 0.31, 1.6, seed * 9.1 + 4.0, pixW);
  gg += f1.xyz * 1.7 + f2.xyz * 1.1;
  g += gg * lp.w;
  osc += (0.15 * f1.w + 0.10 * f2.w) * lp.w;
}
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  ivec2 lim = textureSize(uG0, 0) - 1;
  vec2 P = gl_FragCoord.xy * uDis;
  vec4 g0 = texelFetch(uG0, c, 0);
  vec3 alb = texelFetch(uG1, c, 0).rgb;
  float h = g0.x, mat = g0.y, emis = g0.z;
  float hx = texelFetch(uG0, clamp(c + ivec2(1, 0), ivec2(0), lim), 0).x - texelFetch(uG0, clamp(c - ivec2(1, 0), ivec2(0), lim), 0).x;
  float hy = texelFetch(uG0, clamp(c + ivec2(0, 1), ivec2(0), lim), 0).x - texelFetch(uG0, clamp(c - ivec2(0, 1), ivec2(0), lim), 0).x;
  vec3 n = normalize(vec3(-hx / (2.0 * uDis), -hy / (2.0 * uDis), 1.0));
  // sombra y oclusión (a media resolución, con muestreo que respeta las alturas)
  vec2 uvS = gl_FragCoord.xy / vec2(textureSize(uG0, 0));
  vec4 sa = texture(uSom, uvS);
  vec2 ts = 1.0 / vec2(textureSize(uSom, 0));
  float wsum = 0.0; vec2 acc = vec2(0.0);
  for (int i = 0; i < 4; i++) {
    vec2 off = vec2(float(i & 1), float(i >> 1)) - 0.5;
    vec4 si = texture(uSom, uvS + off * ts);
    float w = exp(-abs(si.z - h) * 0.25) + 1e-4;
    acc += si.xy * w; wsum += w;
  }
  vec2 shao = acc / wsum;
  float sh = shao.x, ao = shao.y;
  // detalle de la arcilla
  vec3 gD = vec3(0.0); float osc = 0.0;
  float semilla = mat * 1.7 + 2.0;
  detalle(P, uLp[0], semilla, gD, osc);
  detalle(P, uLp[1], semilla + 5.0, gD, osc);
  float det = mat > 3.5 && mat < 4.5 ? 0.1 : (mat > 0.5 && mat < 1.5 ? 0.25 : 1.0);
  n = normalize(n - (gD * det - n * dot(gD * det, n)) * 0.6);
  alb *= 1.0 - osc * det;
  // luz
  vec3 L = normalize(uL);
  float ndl = dot(n, L);
  float wrapD = max((ndl + 0.28) / 1.28, 0.0);
  vec3 sss = pow(alb, vec3(1.55)) * 1.4 * smoothstep(-0.35, 0.15, ndl) * (1.0 - smoothstep(0.15, 0.6, ndl));
  vec3 V = vec3(0.0, 0.0, 1.0), Hh = normalize(L + V);
  float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);
  float nh = max(dot(n, Hh), 0.0);
  float brillo = mat > 0.5 && mat < 1.5 ? 2.2 : 1.0;
  float spec = (pow(nh, 22.0) * 0.10 + pow(nh, 90.0) * 0.12 * brillo) * (0.8 + 0.6 * fres) * brillo;
  vec2 qs = (P - vec2(780.0, 620.0)) / vec2(1250.0, 900.0);
  float spot = mix(0.5, 1.0, exp(-dot(qs, qs) * 1.6));
  float key = 2.25 * uFlicker * spot;
  float shK = mix(0.12, 1.0, sh);
  vec3 col = (alb * wrapD + sss * 0.5) * LCOL * key * shK;
  col += spec * LCOL * key * shK * smoothstep(-0.1, 0.3, ndl);
  col += alb * vec3(0.38, 0.44, 0.62) * pow(max(dot(n, normalize(FILL_DIR)) * 0.5 + 0.5, 0.0), 1.5) * 0.5 * ao;
  col += alb * mix(vec3(0.07, 0.05, 0.06), vec3(0.12, 0.15, 0.26), n.z * 0.5 + 0.5) * 0.6 * ao;
  float rim = pow(1.0 - max(dot(n, V), 0.0), 2.6) * max(dot(n, normalize(RIM_DIR)) + 0.35, 0.0);
  col += RIM_COL * alb * rim * 1.2 * ao;
  col *= mix(0.55, 1.0, ao);
  // emisión (el Sol, las cuentas que brillan) y la luz que irradian sobre el tablero
  col += emis * alb * 3.2;
  col += texelFetch(uG2, c, 0).rgb;
  // sombras de Atom y de la regla (vuelan sobre el mundo)
  float dA = length(P - uSomA.xy) / max(uSomA.z, 1.0);
  col *= 1.0 - uSomA.w * exp(-dA * dA * 1.6);
  vec2 rq = max(max(uSomR.xy - P, P - uSomR.zw), 0.0);
  float dR = length(rq) + min(max(max(uSomR.x - P.x, P.x - uSomR.z), max(uSomR.y - P.y, P.y - uSomR.w)), 0.0);
  col *= 1.0 - uSomRK.x * (1.0 - smoothstep(-uSomRK.y, uSomRK.y, dR));
  vec3 fin = revelar(col, P);
  // inserto: la foto del plató que se aleja (primer salto), en una mirilla redonda con borde de plastilina
  if (uIns.w > 0.001) {
    vec2 uvI = ((P - uIns.xy) / uIns.z + vec2(960.0, 540.0)) / vec2(1920.0, 1080.0);
    vec3 ci = texture(uInserto, uvI).rgb;
    float dC = length(P - uInsM.xy) - uInsM.z;
    vec2 rq = (abs(uvI - 0.5) - 0.5) * vec2(1920.0, 1080.0) * uIns.z;
    float d = max(dC, max(rq.x, rq.y));
    float mk = 1.0 - smoothstep(-1.5, 1.0, d);
    float somb = (1.0 - smoothstep(0.0, 34.0, d)) * step(0.0, d) * 0.5;
    float aro = (1.0 - smoothstep(2.0, 4.5, abs(d + 2.5))) * step(rq.x, -6.0) * step(rq.y, -6.0);
    fin *= 1.0 - somb * uIns.w;
    fin = mix(fin, ci, mk * uIns.w);
    fin = mix(fin, vec3(0.93, 0.8, 0.62) * (0.85 + 0.2 * vnoise(P * 0.08)), aro * 0.9 * uIns.w);
  }
  o = vec4(fin, 1.0);
}
`;

// ---------- el renderizador ----------
export function crearMundo(cont, { captura = true } = {}) {
  const W = 1920, H = 1080;
  const lienzo = document.createElement('canvas');
  lienzo.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;display:block';
  cont.insertBefore(lienzo, cont.firstChild);
  const gl = lienzo.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true, alpha: false, depth: false });
  gl.getExtension('EXT_color_buffer_float');
  const escala = captura ? 1 : Math.min(1, 1100 / W);
  const BW = Math.round(W * escala), BH = Math.round(H * escala);
  lienzo.width = BW; lienzo.height = BH;

  const VERT = `#version 300 es\nvoid main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;
  const compilar = (tipo, src) => {
    const sh = gl.createShader(tipo); gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      const lineas = src.split('\n');
      const m = /ERROR: 0:(\d+)/.exec(log);
      const ctx = m ? lineas.slice(Math.max(0, +m[1] - 3), +m[1] + 2).join('\n') : '';
      throw new Error('GLSL: ' + log + '\n' + ctx);
    }
    return sh;
  };
  const programa = (frag) => {
    const p = gl.createProgram();
    gl.attachShader(p, compilar(gl.VERTEX_SHADER, VERT)); gl.attachShader(p, compilar(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const inf = gl.getActiveUniform(p, i); const nm = inf.name.replace(/\[0\]$/, ''); u[nm] = gl.getUniformLocation(p, inf.name); }
    return { p, u };
  };
  const VARIANTES = {
    cerca: ['#define CERCA 1\n', GLSL_CERCA],
    lejos: ['#define LEJOS 1\n', GLSL_LEJOS],
    sol: ['#define SOL 1\n', GLSL_LEJOS + GLSL_SOL],
    espacio: ['#define ESPACIO 1\n', GLSL_LEJOS + GLSL_SOL + GLSL_ESPACIO],
  };
  const progA = {};
  for (const [k, [def, cuerpo]] of Object.entries(VARIANTES)) {
    const t0 = performance.now();
    progA[k] = programa(GLSL_COMUN.replace('precision highp int;', 'precision highp int;\n' + def) + GLSL_MUNDO + cuerpo + GLSL_MAIN_A);
    if (new URLSearchParams(location.search).has('perfil')) console.log('compilar', k, Math.round(performance.now() - t0));
  }
  const progB = programa(GLSL_COMUN + GLSL_SOMBRA);
  const progC = programa(GLSL_COMUN + GLSL_LUZ);

  const textura = (w, h, intFmt, fmt, tipo, filtro, datos = null) => {
    const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, intFmt, w, h, 0, fmt, tipo, datos);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtro); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtro);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  };
  const tG0 = textura(BW, BH, gl.RGBA32F, gl.RGBA, gl.FLOAT, gl.NEAREST);
  const tG1 = textura(BW, BH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
  const tG2 = textura(BW, BH, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.NEAREST);
  const SW = Math.ceil(BW / 2), SH = Math.ceil(BH / 2);
  const tS = textura(SW, SH, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.LINEAR);
  const fbA = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tG0, 0);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, tG1, 0);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, tG2, 0);
  gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2]);
  const fbS = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbS);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tS, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  const vao = gl.createVertexArray();
  const sincronizar = () => { const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); };
  const sincronizarF = () => { const px = new Float32Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, px); };
  const perfil = new URLSearchParams(location.search).has('perfil');
  let tP = 0;
  const medir = (k) => { if (!perfil) return; const a = performance.now(); console.log('pasada', k, Math.round(a - tP)); tP = a; };

  // continentes (una vez)
  const NC = 2048, NC2 = 512;
  const tc = performance.now();
  const [c1, c2] = pintarContinentes(NC, NC2);
  if (new URLSearchParams(location.search).has('perfil')) console.log('continentes', Math.round(performance.now() - tc));
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  const tC1 = textura(NC, NC, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR, c1);
  const tC2 = textura(NC2, NC2, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR, c2);
  let tIns = textura(4, 4, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);

  const fijar = (pr, nombre, tipo, ...v) => { const l = pr.u[nombre]; if (l == null) return; gl[`uniform${tipo}`](l, ...v); };
  const comunes = (pr, est) => {
    fijar(pr, 'uRes', '2f', BW, BH); fijar(pr, 'uDis', '1f', W / BW);
    fijar(pr, 'uZ', '1f', est.z); fijar(pr, 'uMpp', '1f', est.mpp); fijar(pr, 'uFrame', '1f', est.n);
    fijar(pr, 'uBoil', '3f', ...est.boil);
  };

  // compila de verdad cada variante ahora (dibujando un píxel), para que ningún fotograma pague su compilación
  {
    const t0 = performance.now();
    gl.bindVertexArray(vao);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
    gl.viewport(0, 0, 1, 1);
    for (const pr of [...Object.values(progA)]) { gl.useProgram(pr.p); gl.drawArrays(gl.TRIANGLES, 0, 3); gl.readBuffer(gl.COLOR_ATTACHMENT0); sincronizarF(); }
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbS); gl.useProgram(progB.p); gl.drawArrays(gl.TRIANGLES, 0, 3); sincronizarF();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.useProgram(progC.p); gl.drawArrays(gl.TRIANGLES, 0, 3); sincronizar();
    if (new URLSearchParams(location.search).has('perfil')) console.log('calentar', Math.round(performance.now() - t0));
  }
  return {
    lienzo,
    // la foto del plató para el primer salto
    inserto(fuente) {
      gl.deleteTexture(tIns);
      tIns = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tIns);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, fuente);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    },
    dibujar(est) {
      gl.bindVertexArray(vao);
      gl.disable(gl.BLEND);
      // A
      const pa = progA[est.variante] ?? progA.cerca;
      gl.useProgram(pa.p);
      comunes(pa, est);
      const ys = (y) => H - y;      // y de pantalla (abajo) → y de GL (arriba)
      fijar(pa, 'uSuelo', '4f', est.suelo[0], ys(est.suelo[1]), est.suelo[2], est.suelo[3]);
      fijar(pa, 'uKH', '1f', est.kh); fijar(pa, 'uTablero', '1f', est.tablero);
      fijar(pa, 'uAncla', '2f', est.ancla[0], ys(est.ancla[1]));
      const v4 = (nombre, a) => { const l = pa.u[nombre]; if (l != null) gl.uniform4fv(l, new Float32Array(a.flat())); };
      v4('uEstr', est.estr);
      v4('uEstrG', est.estrG ?? [[0, 0, 1, 0], [0, 0, 1, 0]]);
      for (const [k, v] of Object.entries(est.capas ?? {})) fijar(pa, k, '4f', v[0], ys(v[1]), v[2], v[3]);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tC1); fijar(pa, 'uCont1', '1i', 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tC2); fijar(pa, 'uCont2', '1i', 1);
      if (perfil) { sincronizar(); tP = performance.now(); }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
      gl.viewport(0, 0, BW, BH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (perfil) { gl.readBuffer(gl.COLOR_ATTACHMENT0); sincronizarF(); medir('A ' + est.variante); }
      // B
      gl.useProgram(progB.p);
      comunes(progB, est);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tG0); fijar(progB, 'uG0', '1i', 0);
      fijar(progB, 'uL', '3f', ...est.luz);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbS);
      gl.viewport(0, 0, SW, SH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (perfil) { sincronizarF(); medir('B'); }
      // C
      gl.useProgram(progC.p);
      comunes(progC, est);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tG0); fijar(progC, 'uG0', '1i', 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tG1); fijar(progC, 'uG1', '1i', 1);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, tS); fijar(progC, 'uSom', '1i', 2);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, tIns); fijar(progC, 'uInserto', '1i', 3);
      gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D, tG2); fijar(progC, 'uG2', '1i', 4);
      fijar(progC, 'uL', '3f', ...est.luz); fijar(progC, 'uFlicker', '1f', est.flicker);
      const l = progC.u.uLp; if (l != null) gl.uniform4fv(l, new Float32Array(est.lp.flat()));
      const ins = est.ins ?? { c: [960, 540], s: 1, a: 0, m: [960, 540, 0, 1] };
      fijar(progC, 'uIns', '4f', ins.c[0], ys(ins.c[1]), ins.s, ins.a);
      fijar(progC, 'uInsM', '4f', ins.m[0], ys(ins.m[1]), ins.m[2], ins.m[3]);
      const sa = est.somA ?? [0, 0, 1, 0];
      fijar(progC, 'uSomA', '4f', sa[0], ys(sa[1]), sa[2], sa[3]);
      const sr = est.somR ?? [0, 0, 0, 0, 0, 1];
      fijar(progC, 'uSomR', '4f', sr[0], ys(sr[3]), sr[2], ys(sr[1]));
      fijar(progC, 'uSomRK', '2f', sr[4], sr[5]);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, BW, BH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      sincronizar();
      medir('C');
    },
  };
}
