// KIT DEL EPISODIO 3 · «VIRUS» (kits/ep03-virus.js). Lo crea ep3-virus, que es la única escena que lo usa; entregado con
// su hoja de prueba (escenas/ep03-virus-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k) queda CONGELADO.
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra y uniformes), con el mismo
// material, la misma luz y la misma paleta, y una función por pieza que la coloca (como ep03-adn.js o ep03-tocar.js):
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposVirus, uniformesVirus, virus, onda, moneda, guante } from '/atomo/plato/kits/ep03-virus.js';
//   const UV = uniformesVirus();
//   const P = await crearPlato({ piezas: ['virus', 'onda', 'moneda', 'guante', 'guante'], tiposExtra: tiposVirus(),
//                                uniformes: { ...UV }, ... });
//   function dibujar(t) { ...; P.limpiar(); virus(P, 0, { pos, escala }); onda(P, 1, UV, { pos, escala, fase }); P.render(n); }
//
// tiposVirus(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados). Cada función se llama como P.pieza,
// entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de P.pieza (pos, escala, rot
// [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve puntos del mundo para poner otras cosas.
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'virus' · virus(P, i, { … })
//      El virus de la gripe: una envoltura casi esférica (radio VIRUS_MEDIDAS.R = 0,4, algo irregular) de pizarra
//      violácea y translúcida, erizada de 40 espículas que llegan a VIRUS_MEDIDAS.PUAS = 0,55: hemaglutininas (palitos
//      con la punta engrosada, crema) y, una de cada cinco, neuraminidasas (un tallo fino con una cabeza de seta, ocre).
//      Es del tamaño de la mota de ep3-adn (bolita de 0,4 con púas a 0,55): para que mida D px de punta a punta,
//      escala = D / (2 · 0,55 · px por unidad). Sin forma (borroso) se hace en 2D, con un blur sobre su foto.
//      Devuelve { centro, radio (mundo, hasta la punta de las púas) }.
//  · 'onda' · onda(P, i, UV, { lambda: 2, amplitud: 0,35, fase: 0, largo: 3 })
//      La onda de luz: un alambre que dibuja una sinusoide y que brilla por dentro (luz propia crema y ámbar), en el
//      plano xy local, a lo largo de x de −largo a +largo (largo ≤ 3,8), con y = amplitud · sen(2π x / lambda + fase).
//      Va en uniformes (uOnda): una sola onda por plató. Para que corra, lo barato es una foto y moverla en 2D (una onda
//      que viaja es la misma forma desplazada); el alambre no da sombra. Devuelve { punto(x) } (mundo, x local).
//  · 'moneda' · moneda(P, i, { … })
//      Una moneda de arcilla bronceada, de radio 1 y 0,16 de grueso, con la cara hacia +z (y la misma en −z): canto
//      alzado, una corona de 44 perlas y, en el campo hundido, el busto de perfil de una persona mirando a +x (cráneo,
//      frente, nariz, labios, barbilla, cuello, el arranque de los hombros y un moño), en relieve de cúpula y con el
//      pelo marcado. Sin letras ni números. Devuelve { centro, normal, punto(x, y) } (mundo; x, y locales en la cara).
//  · 'guante' · guante(P, i, { lado: 'der' })
//      Un guante de cocina acolchado (crema, con el pespunte en rombos, el ribete y la presilla de óxido) puesto sobre
//      la mano de la persona: sale de la manga de su jersey gris (con el puño de canalé), que sigue hacia −y hasta −2,4.
//      La muñeca en el origen, los dedos hacia +y (la punta del guante en y ≈ 1,46), el dorso hacia +z y la palma
//      hacia −z; el pulgar a la izquierda en el derecho (lado 'der', mirando el dorso) y a la derecha en el izquierdo
//      ('izq', el espejo). Devuelve { punta, palma, pulgar, muneca } (mundo).
//
// COMPONER EN 2D: foto(P) → copia del lienzo de WebGL (tras P.render).
//
// COSTE (este servidor, 1920 × 1080, sobre transparente; ver la hoja): el virus de ~230 px, ~0,4 s; dos guantes de
// ~600 px y la moneda de ~400 px a la vez, ~1–2 s; la onda a pantalla completa, ~1 s (una sola foto). Con la carga
// de otras escenas, el doble o el triple.
import * as THREE from 'three';

export const VIRUS_MEDIDAS = { R: 0.4, PUAS: 0.55, RADIO: 0.6, MANGA: 2.4, PUNTA: 1.46 };
const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));

// las 40 espículas: direcciones repartidas como una espiral de Fibonacci (con un poco de desorden fijo)
const PUAS = (() => {
  const n = 40, out = [];
  let a = 0x2f6b1;
  const r = () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; };
  for (let i = 0; i < n; i++) {
    const y = 1 - (i + 0.5) * 2 / n, k = Math.sqrt(1 - y * y), t = i * 2.39996 + 0.4;
    const v = new THREE.Vector3(Math.cos(t) * k + 0.12 * (r() - 0.5), y + 0.12 * (r() - 0.5), Math.sin(t) * k + 0.12 * (r() - 0.5)).normalize();
    out.push([v.x, v.y, v.z, i % 5 === 2 ? 1 : 0]);
  }
  return out;
})();

// ---------------------------------------------------------------- GLSL común del kit
const GLSL_COMUN = /* glsl */`
#ifndef KIT_EP03_VIRUS
#define KIT_EP03_VIRUS 1
uniform vec4 uOnda;   // lambda · amplitud · fase · largo (medio largo), en unidades locales de la onda
float vrElip(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-5); }
float vrElip2(vec2 p, vec2 r) { return (length(p / r) - 1.0) * min(r.x, r.y); }
float vrSeg2(vec2 p, vec2 a, vec2 b, float r) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float vrCapC(vec3 p, vec3 a, vec3 b, float r1, float r2) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - mix(r1, r2, h); }
#endif
`;

// ---------------------------------------------------------------- el virus
const GLSL_VIRUS = /* glsl */`
const vec4 VR_PUAS[${PUAS.length}] = vec4[](${PUAS.map((p) => `vec4(${p.map(fl).join(', ')})`).join(', ')});
// m: 0 envoltura · 1 hemaglutinina (crema) · 2 neuraminidasa (ocre)
float vrVirus(vec3 q, out float m) {
  m = 0.0;
  vec3 e = q * vec3(1.0, 1.04, 0.97);
  float d = length(e) - 0.4;
  d += 0.012 * sin(q.x * 9.0 + 1.3) * sin(q.y * 8.0 - 0.4) * sin(q.z * 7.0 + 2.1);
  float dh = 1e5, dn = 1e5;
  for (int i = 0; i < ${PUAS.length}; i++) {
    vec4 s = VR_PUAS[i];
    vec3 n = s.xyz;
    if (s.w > 0.5) {
      dn = min(dn, min(sdCapsule(q, n * 0.36, n * 0.49, 0.013), length(q - n * 0.515) - 0.04));
    } else {
      dh = min(dh, vrCapC(q, n * 0.36, n * 0.525, 0.017, 0.03));
    }
  }
  float dp = min(dh, dn);
  if (dp < d) m = dh < dn ? 1.0 : 2.0;
  return smin(d, dp, 0.02) * 0.9;
}
float vrVirusC(vec3 q) { return length(q) - 0.37; }
float vrVirusA(vec3 q) { return length(q) - 0.575; }
vec3 vrVirusCol(vec3 q, float m) {
  float v = 0.92 + 0.16 * vnoise(q * 14.0);
  if (m > 1.5) { gBri = 1.4; return vec3(0.44, 0.27, 0.085) * v; }
  if (m > 0.5) { gBri = 1.3; gTr = 0.3; return vec3(0.52, 0.46, 0.37) * v; }
  // la envoltura: pizarra violácea, translúcida, con la membrana algo granulada
  gTr = 0.4;
  gG = vec3(sin(q.y * 70.0), sin(q.z * 64.0 + 1.0), sin(q.x * 76.0 + 2.0)) * 0.05;
  return vec3(0.21, 0.165, 0.235) * v;
}
`;

// ---------------------------------------------------------------- la onda de luz
const GLSL_ONDA = /* glsl */`
float vrOnda(vec3 q) {
  float k = 6.2831853 / max(uOnda.x, 0.05), A = uOnda.y, L = uOnda.w;
  float x = clamp(q.x, -L, L);
  float s = k * x + uOnda.z;
  float dy = (q.y - A * sin(s)) / sqrt(1.0 + (A * k * cos(s)) * (A * k * cos(s)));
  float dx = q.x - x;
  return (length(vec3(dx, dy, q.z)) - 0.032) * 0.7;
}
float vrOndaA(vec3 q) {
  vec3 b = abs(q) - vec3(uOnda.w + 0.08, abs(uOnda.y) + 0.09, 0.09);
  return length(max(b, 0.0)) + min(max(b.x, max(b.y, b.z)), 0.0);
}
vec3 vrOndaCol(vec3 q) {
  // un alambre de luz: el núcleo crema muy brillante, con un leve retorcido de dos cabos
  float k = 6.2831853 / max(uOnda.x, 0.05);
  float tw = 0.5 + 0.5 * sin(q.x * 60.0 + atan(q.z, q.y - uOnda.y * sin(k * q.x + uOnda.z)) * 2.0);
  gBri = 1.6;
  gEm = vec3(0.95, 0.76, 0.48) * (0.26 + 0.06 * tw);
  return vec3(0.66, 0.58, 0.44);
}
`;

// ---------------------------------------------------------------- la moneda
const GLSL_MONEDA = /* glsl */`
// el busto de perfil (mira a +x), en unidades de la moneda: distancia 2D con signo (dentro < 0)
float vrCraneo(vec2 p) { return vrElip2(p - vec2(-0.04, 0.2), vec2(0.27, 0.3)); }
float vrBusto(vec2 p) {
  float d = vrCraneo(p);
  d = smin(d, vrElip2(p - vec2(0.12, 0.07), vec2(0.165, 0.25)), 0.06);                // la cara
  d = smin(d, vrSeg2(p, vec2(0.245, 0.17), vec2(0.335, 0.045), 0.03), 0.04);         // la nariz
  d = smin(d, length(p - vec2(0.245, -0.06)) - 0.05, 0.03);                         // los labios
  d = smin(d, length(p - vec2(0.2, -0.155)) - 0.07, 0.05);                          // la barbilla
  d = smin(d, vrSeg2(p, vec2(0.02, -0.15), vec2(0.04, -0.44), 0.125), 0.05);         // el cuello
  d = smin(d, vrElip2(p - vec2(-0.04, -0.58), vec2(0.37, 0.15)), 0.08);              // los hombros
  d = smin(d, length(p - vec2(-0.265, 0.11)) - 0.115, 0.04);                         // el moño
  d = max(d, -0.68 - p.y);                                                          // el busto, cortado abajo
  // la cuenca del ojo y el hueco bajo la nariz, apenas
  d = smax(d, -(length(p - vec2(0.33, 0.035)) - 0.022), 0.01);
  return d;
}
// m: 0 campo · 1 relieve (busto) · 2 canto y perlas
float vrMoneda(vec3 q, out float m) {
  m = 0.0;
  float r = length(q.xy), az = abs(q.z);
  vec2 w = vec2(r - 0.97, az - 0.05);
  float d = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.03;
  // el campo, hundido dentro del canto
  d = smax(d, -max(r - 0.895, 0.064 - az), 0.012);
  // la corona de perlas
  float sec = 6.2831853 / 44.0, a = atan(q.y, q.x);
  a = mod(a + 0.5 * sec, sec) - 0.5 * sec;
  vec2 pp = r * vec2(cos(a), sin(a));
  float dPer = length(vec3(pp - vec2(0.835, 0.0), az - 0.064)) - 0.02;
  // el busto en relieve de cúpula (hasta 0,045 sobre el campo)
  float s = vrBusto(q.xy);
  float h = 0.045 * smoothstep(0.0, 0.12, -s);
  float dRel = max(s, az - 0.064 - h) * 0.85;
  if (r > 0.89 || dPer < d) m = 2.0;
  if (dRel < min(d, dPer)) m = 1.0;
  return min(min(d, dPer), dRel);
}
float vrMonedaC(vec3 q) { vec2 w = vec2(length(q.xy) - 0.95, abs(q.z) - 0.04); return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.02; }
float vrMonedaA(vec3 q) { vec2 w = vec2(length(q.xy) - 1.0, abs(q.z) - 0.115); return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)); }
vec3 vrMonedaCol(vec3 q, float m) {
  float v = 0.93 + 0.14 * vnoise(q * 11.0);
  gBri = 2.3;
  if (m > 1.5) return vec3(0.44, 0.29, 0.11) * v;                       // canto y perlas, gastados y claros
  if (m > 0.5) {
    // el busto: las partes altas, pulidas; el pelo, con surcos ondulados
    float s = vrBusto(q.xy);
    float alto = smoothstep(0.0, 0.1, -s);
    float pelo = smoothstep(0.015, -0.015, vrCraneo(q.xy) + 0.02) * step(q.x, 0.1 - 0.4 * max(q.y - 0.2, 0.0)) +
                 smoothstep(0.012, -0.012, length(q.xy - vec2(-0.265, 0.11)) - 0.115);
    float ola = sin((q.x * 0.6 + q.y) * 95.0 + 3.0 * sin(q.x * 20.0));
    gG = vec3(0.0, 0.25 * ola, 0.0) * pelo;
    return mix(vec3(0.33, 0.2, 0.08), vec3(0.52, 0.35, 0.14), alto) * v * (1.0 - 0.12 * pelo * (0.5 + 0.5 * ola));
  }
  return vec3(0.21, 0.13, 0.06) * v;                                     // el campo, con la pátina oscura
}
`;

// ---------------------------------------------------------------- el guante de cocina
const GLSL_GUANTE = /* glsl */`
// m: 0 tela acolchada · 1 ribete y presilla · 2 manga de punto · 3 puño de canalé
float vrGuante(vec3 q, float lado, out float m) {
  vec3 p = vec3(q.x * lado, q.y, q.z);
  m = 0.0;
  // el cuerpo, ahuecado como una mano que tantea (la palma hacia −z)
  vec3 c = p - vec3(0.05, 0.86, 0.0);
  c.z += 0.09 * (c.y * c.y) - 0.03;
  float cuerpo = vrElip(c, vec3(0.41, 0.6, 0.2));
  vec3 pt = p; pt.z *= 1.2;
  float pulgar = vrCapC(pt, vec3(-0.24, 0.42, -0.02), vec3(-0.5, 0.92, -0.06), 0.15, 0.12) * 0.83;
  // el puño del guante, algo acampanado y aplanado
  float rp = length(vec2(p.x, p.z / 0.8));
  vec2 w = vec2(rp - mix(0.385, 0.35, clamp((p.y + 0.24) / 0.6, 0.0, 1.0)), abs(p.y - 0.05) - 0.29);
  float puno = (min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.035) * 0.8;
  float d = smin(cuerpo, pulgar, 0.09);
  d = smin(d, puno, 0.12);
  // el ribete del borde y la presilla colgando a un lado
  float rib = length(vec2(rp - 0.375, p.y + 0.235)) - 0.045;
  float pres = length(vec2(length(p.xy - vec2(0.47, -0.1)) - 0.085, p.z)) - 0.022;
  float dr = min(rib, pres);
  if (dr < d) m = 1.0;
  d = smin(d, dr, 0.015);
  // la manga del jersey, que entra en el guante, y su puño de canalé
  vec3 pm = p; pm.z /= 0.9;
  float manga = vrCapC(pm, vec3(0.0, -2.45, 0.0), vec3(0.0, -0.1, 0.0), 0.285, 0.27) * 0.9;
  if (manga < d) m = p.y > -0.55 ? 3.0 : 2.0;
  return min(d, manga);
}
float vrGuanteC(vec3 q, float lado) {
  vec3 p = vec3(q.x * lado, q.y, q.z);
  float d = vrElip(p - vec3(0.05, 0.84, 0.0), vec3(0.34, 0.52, 0.14));
  return min(d, sdCapsule(p, vec3(0.0, -2.4, 0.0), vec3(0.0, 0.1, 0.0), 0.22));
}
float vrGuanteA(vec3 q) {
  return min(sdCapsule(q, vec3(0.0, -2.5, 0.0), vec3(0.0, -0.3, 0.0), 0.36), length(q - vec3(0.0, 0.55, 0.0)) - 1.06);
}
vec3 vrGuanteCol(vec3 q, float lado, float m) {
  vec3 p = vec3(q.x * lado, q.y, q.z);
  float v = 0.93 + 0.14 * vnoise(q * 9.0);
  if (m > 2.5) {                                                        // canalé del puño
    float a = atan(p.z, p.x);
    gG = vec3(-sin(a), 0.0, cos(a)) * cos(a * 26.0) * 0.12;
    return vec3(0.25, 0.24, 0.22) * v;
  }
  if (m > 1.5) {                                                        // punto del jersey
    float u = (p.x + 0.6 * p.z) * 40.0, f = fract(p.y * 34.0 + abs(fract(u) - 0.5) * 0.9);
    gG = vec3(0.0, cos(6.2832 * f) * 0.06, 0.0);
    return vec3(0.25, 0.24, 0.22) * v * (0.94 + 0.08 * sin(6.2832 * f));
  }
  if (m > 0.5) return vec3(0.36, 0.13, 0.055) * v;                     // ribete y presilla, óxido
  // tela acolchada en rombos con su pespunte
  float s1 = fract((p.x + p.y) * 4.0), s2 = fract((p.x - p.y) * 4.0);
  float k1 = sin(3.14159 * s1), k2 = sin(3.14159 * s2);
  float c1 = cos(3.14159 * s1), c2 = cos(3.14159 * s2);
  float g = 3.14159 * 4.0 * 0.018;
  gG = vec3((c1 * k2 + k1 * c2) * lado, c1 * k2 - k1 * c2, 0.0) * g;
  float costura = 1.0 - smoothstep(0.0, 0.07, min(min(s1, 1.0 - s1), min(s2, 1.0 - s2)));
  return vec3(0.56, 0.49, 0.38) * v * (1.0 - 0.22 * costura);
}
`;

const TIPOS = {
  virus: { radio: 0.62, glifos: [], envolvente: true, glsl: GLSL_COMUN + GLSL_VIRUS + /* glsl */`
float pz_virus(vec3 q, vec4 T, out float m) { return vrVirus(q, m); }
float pzc_virus(vec3 q, vec4 T) { return vrVirusC(q); }
float pza_virus(vec3 q, vec4 T) { return vrVirusA(q); }
vec3 pzcol_virus(vec3 q, vec4 T, float m) { return vrVirusCol(q, m); }
` },
  onda: { radio: 4.0, glifos: [], envolvente: true, glsl: GLSL_COMUN + GLSL_ONDA + /* glsl */`
float pz_onda(vec3 q, vec4 T, out float m) { m = 0.0; return vrOnda(q); }
float pzc_onda(vec3 q, vec4 T) { return 1e5; }
float pza_onda(vec3 q, vec4 T) { return vrOndaA(q); }
vec3 pzcol_onda(vec3 q, vec4 T, float m) { return vrOndaCol(q); }
` },
  moneda: { radio: 1.05, glifos: [], envolvente: true, glsl: GLSL_COMUN + GLSL_MONEDA + /* glsl */`
float pz_moneda(vec3 q, vec4 T, out float m) { return vrMoneda(q, m); }
float pzc_moneda(vec3 q, vec4 T) { return vrMonedaC(q); }
float pza_moneda(vec3 q, vec4 T) { return vrMonedaA(q); }
vec3 pzcol_moneda(vec3 q, vec4 T, float m) { return vrMonedaCol(q, m); }
` },
  guante: { radio: 2.62, glifos: [], envolvente: true, glsl: GLSL_COMUN + GLSL_GUANTE + /* glsl */`
float pz_guante(vec3 q, vec4 T, out float m) { return vrGuante(q, T.y > 0.5 ? -1.0 : 1.0, m); }
float pzc_guante(vec3 q, vec4 T) { return vrGuanteC(q, T.y > 0.5 ? -1.0 : 1.0); }
float pza_guante(vec3 q, vec4 T) { return vrGuanteA(q); }
vec3 pzcol_guante(vec3 q, vec4 T, float m) { return vrGuanteCol(q, T.y > 0.5 ? -1.0 : 1.0, m); }
` },
};

// ---------------------------------------------------------------- API
/** Los tipos del kit para crearPlato({ tiposExtra }): todos, o solo los nombrados. */
export function tiposVirus(nombres = Object.keys(TIPOS)) {
  return Object.fromEntries(nombres.filter((n) => TIPOS[n]).map((n) => [n, TIPOS[n]]));
}
/** Los uniformes del kit, para crearPlato({ uniformes }) (la onda los escribe en cada llamada). */
export function uniformesVirus() {
  return { uOnda: { value: new THREE.Vector4(2, 0.35, 0, 3) } };
}
/** Punto local → mundo con la colocación de P.pieza (pos, escala, rot euler YXZ, sq). */
export function aMundo({ pos = [0, 0, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1] } = {}, local) {
  const v = new THREE.Vector3(local[0] * sq[0] * escala, local[1] * sq[1] * escala, local[2] * sq[2] * escala);
  v.applyEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ'));
  return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
}
const colocar = ({ pos = [0, 0, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1] }) => ({ pos, escala, rot, sq });

/** El virus de la gripe (ver arriba). */
export function virus(P, i, o = {}) {
  const c = colocar(o);
  P.pieza(i, { ...c, toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
  return { centro: c.pos, radio: VIRUS_MEDIDAS.PUAS * c.escala };
}
/** La onda de luz (ver arriba). UV: los uniformes de uniformesVirus(). */
export function onda(P, i, UV, { lambda = 2, amplitud = 0.35, fase = 0, largo = 3, ...o } = {}) {
  UV.uOnda.value.set(lambda, amplitud, fase, Math.min(3.8, largo));
  const c = colocar(o);
  P.pieza(i, { ...c, toque: o.toque ?? false });
  return { punto: (x) => aMundo(c, [x, amplitud * Math.sin(2 * Math.PI * x / lambda + fase), 0]) };
}
/** La moneda (ver arriba). */
export function moneda(P, i, o = {}) {
  const c = colocar(o);
  P.pieza(i, { ...c, toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
  const n = aMundo({ ...c, pos: [0, 0, 0] }, [0, 0, 1]);
  return { centro: c.pos, normal: n.map((x) => x / c.escala), punto: (x, y) => aMundo(c, [x, y, 0.08]) };
}
/** El guante de cocina con la manga (ver arriba). lado: 'der' | 'izq'. */
export function guante(P, i, { lado = 'der', ...o } = {}) {
  const c = colocar(o), s = lado === 'izq' ? -1 : 1;
  P.pieza(i, { ...c, variante: s < 0 ? 1 : 0, toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
  return {
    punta: aMundo(c, [0.05 * s, 1.44, 0]), palma: aMundo(c, [0.05 * s, 0.8, -0.2]),
    pulgar: aMundo(c, [-0.52 * s, 1.0, -0.05]), muneca: aMundo(c, [0, 0, 0]),
  };
}
/** Copia del lienzo de WebGL (tras P.render). */
export function foto(P) {
  const l = P.renderer.domElement;
  const c = document.createElement('canvas'); c.width = l.width; c.height = l.height;
  c.getContext('2d').drawImage(l, 0, 0);
  return c;
}
