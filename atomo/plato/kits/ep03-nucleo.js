// KIT DEL EPISODIO 3 · «NÚCLEO» (kits/ep03-nucleo.js). Lo crea ep3-proton y, una vez entregado con su hoja de prueba
// (escenas/ep03-nucleo-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que
// lo usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta (una pieza propia con tiposExtra, o 2D
// encima) y lo dice en su informe. Lo usa ep3-proton (lo crea).
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra), con el mismo material, la
// misma luz y la misma paleta que el resto del episodio, y una función por pieza que la coloca y le pasa sus parámetros:
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposNucleo, nucleo, proton, quarks } from '/atomo/plato/kits/ep03-nucleo.js';
//   const P = await crearPlato({ piezas: ['nucleo', 'proton', 'quarks', …], tiposExtra: tiposNucleo(), … });
//   function dibujar(t) { …; P.limpiar(); quarks(P, 2, { pos, escala, fase: ts }); …; P.render(n); }
//
// tiposNucleo(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados: así se compila menos). Cada función
// de pieza se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de
// P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los puntos del mundo que
// hacen falta para poner otras cosas encima o para entrar en ellas con la cámara. Unidades locales: las de cada pieza.
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'nucleo' · nucleo(P, i, { n: 16, fase: 0, tiembla: 0, brillo: 0, camara })
//      El núcleo: un racimo de bolitas de arcilla apretadas, los protones rojos (arcilla roja tostada) y los neutrones
//      grises (gris cálido), cada bolita de radio NUCLEO.R = 0,2 con su pequeña variación de tono. Las posiciones son un
//      empaquetado fijo de NUCLEO.MAX = 40 bolitas ordenadas del centro hacia fuera (NUCLEONES: [x, y, z, 1 protón |
//      0 neutrón]): n elige cuántas (1…40; 16 es el oxígeno del cuerpo, 8 y 8; 12 el carbono). Con cualquier n, más o
//      menos la mitad son protones. tiembla (0…1): cada bolita se mueve un poco con fase (segundos; el «hervor» del núcleo
//      vivo); brillo (0…1): un poco de luz propia cálida, para que se lea de lejos. El radio del racimo es
//      radioNucleo(n) (≈ 0,2 · 1,25 · n^⅓). Devuelve { centro, radio (mundo), bolitas: [{ mundo, proton, r (mundo) }],
//      frente: el índice del protón más cercano a la cámara (camara: su posición; por defecto [0, 3,8, 15,5], la de las
//      escenas de plastilina): por donde se entra en él, punto(k) (mundo de la bolita k) }. geometriaNucleo(P, opciones)
//      da lo mismo sin poner la pieza.
//  · 'proton' · proton(P, i, { brillo: 0 })
//      El protón entero: una bola de radio 1 de la misma arcilla roja que los protones del núcleo, algo translúcida, con
//      sus bultitos y huellas. brillo (0…1): luz propia cálida. Devuelve { centro, radio (mundo), apoyo (mundo: el punto
//      de abajo, para posarlo en un plato) }.
//  · 'quarks' · quarks(P, i, { bandas: 1, vibra: 1, brillo: 1, fase: 0, cascara: 0, separacion: 1 })
//      El protón abierto: tres quarks (bolas de radio QUARKS.RB = 0,17, de terracota, oliva y pizarra azul: los tres
//      «colores», apagados, de la paleta) en los vértices de un triángulo de radio QUARKS.RT = 0,45 en el plano xy (la cara
//      mira a +z; el quark 0 arriba), unidos por tres CINTAS ELÁSTICAS de goma ámbar (planas, algo retorcidas) que vibran
//      y brillan:
//        – bandas (0…1): cuánto de cada cinta hay (crecen desde los dos quarks y se juntan en el medio; 0: los tres quarks
//          sueltos, como en el plato de la balanza);
//        – vibra (0…1): la amplitud de la vibración (ondas estacionarias, distintas en cada cinta), con fase (segundos);
//        – brillo (0…1): luz propia ámbar de las cintas (y un poco de los quarks), que late con fase;
//        – cascara (0…1): la mitad de atrás de la piel del protón, como un cuenco de arcilla roja detrás de los quarks
//          (radio 1, abierto hacia +z): «estamos dentro del protón». 0: sin cáscara; 1: la media esfera entera;
//          entre medias, un casquete más pequeño (solo el fondo);
//        – separacion (0,5…1,2): escala el triángulo (los quarks más juntos o más separados; las cintas se ajustan).
//      Para posarlos en un plato: rot [−π/2, 0, 0] (el triángulo tumbado) y pos a QUARKS.RB × escala sobre el fondo.
//      Devuelve { centro, quarks: [mundo × 3], cintas: [[mundo del medio de la cinta 0–1], …] }.
//
// 2D (para componer encima, como el resto del episodio)
//  · resplandor(g, x, y, radio, { color: [r, g, b] (0…255), fuerza: 1 }) un brillo aditivo redondo (para las cintas, los
//    destellos, el protón que se ilumina).
//
// COSTE (este servidor, 1920 × 1080, la pieza sola llenando su celda de la hoja de prueba, con el plató, la sombra y el
// fondo; con otras escenas renderizando a la vez, el doble): ver window.__tiempos de la hoja. Núcleo de 16 a ~350 px,
// del orden de 1 s; de 40, ~2 s (lo lento es el bucle de bolitas: n manda). Protón, < 1 s. Quarks con cintas, ~1–1,5 s
// a ~600 px; con cáscara, algo más (la cáscara es grande). Lo que no se mueve se fotografía (el núcleo).
//
// CONGELADO el 22-10-2026, entregado con la hoja de prueba (escenas/ep03-nucleo-hoja.html).
import * as THREE from 'three';

const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
function semillero(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// ---------------------------------------------------------------- el empaquetado del núcleo (fijo, con semilla)
export const NUCLEO = { R: 0.2, MAX: 40 };
export const NUCLEONES = (() => {
  // crecimiento: cada bolita nueva va al hueco libre más cercano al centro (entre muchas direcciones con semilla), así
  // que las n primeras forman siempre un racimo redondo y apretado (a 0,93 diámetros: algo aplastadas entre sí)
  const rnd = semillero(20261022), N = NUCLEO.MAX, R = NUCLEO.R, dmin = 2 * R * 0.93;
  const p = [[0, 0, 0]];
  const dirs = [];
  for (let k = 0; k < 900; k++) {
    const z = 2 * rnd() - 1, a = 2 * Math.PI * rnd(), s = Math.sqrt(1 - z * z);
    dirs.push([s * Math.cos(a), s * Math.sin(a) * 0.92, z]);
  }
  while (p.length < N) {
    let mejor = null, tMejor = 1e9;
    for (const u of dirs) {
      // el t más pequeño a lo largo de u en que la bolita no pisa a ninguna (las restricciones son intervalos prohibidos)
      const prohib = [];
      for (const b of p) {
        const bu = b[0] * u[0] + b[1] * u[1] + b[2] * u[2], bb = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
        const h = bu * bu - (bb - dmin * dmin);
        if (h > 0) prohib.push([bu - Math.sqrt(h), bu + Math.sqrt(h)]);
      }
      prohib.sort((x, y) => x[0] - y[0]);
      let t = 0;
      for (const [a, b] of prohib) if (a <= t + 1e-9 && b > t) t = b;
      if (t < tMejor - 1e-6) { tMejor = t; mejor = u; }
    }
    p.push([mejor[0] * tMejor, mejor[1] * tMejor, mejor[2] * tMejor]);
  }
  // protones y neutrones repartidos: de dos en dos, uno de cada, en un orden con semilla
  return p.map((q, i) => {
    const par = Math.floor(i / 2), primero = semillero(9100 + par)() < 0.5;
    const proton = (i % 2 === 0) === primero ? 1 : 0;
    return [+q[0].toFixed(5), +q[1].toFixed(5), +q[2].toFixed(5), proton];
  });
})();
// radio del racimo de n bolitas (local): la más lejana del centro, más su radio
export function radioNucleo(n = 16) {
  n = Math.max(1, Math.min(NUCLEO.MAX, Math.round(n)));
  let r = 0;
  for (let i = 0; i < n; i++) r = Math.max(r, Math.hypot(NUCLEONES[i][0], NUCLEONES[i][1], NUCLEONES[i][2]));
  return r + NUCLEO.R;
}
export const QUARKS = { RB: 0.17, RT: 0.45, CASCARA: 1.0 };
// los colores (lineales, como la paleta del plató)
export const COLORES_NUCLEO = {
  proton: [0.36, 0.062, 0.034], neutron: [0.205, 0.192, 0.172],
  quarks: [[0.42, 0.10, 0.035], [0.12, 0.17, 0.05], [0.055, 0.085, 0.17]], cinta: [0.62, 0.27, 0.045],
};
const v3 = (c) => `vec3(${c.map(fl).join(', ')})`;

// ---------------------------------------------------------------- GLSL
const GLSL_COMUN = /* glsl */`
#ifndef NUCLEO_COMUN
#define NUCLEO_COMUN 1
float nuH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
const vec3 NU_PROTON = ${v3(COLORES_NUCLEO.proton)};
const vec3 NU_NEUTRON = ${v3(COLORES_NUCLEO.neutron)};
const vec3 NU_Q0 = ${v3(COLORES_NUCLEO.quarks[0])};
const vec3 NU_Q1 = ${v3(COLORES_NUCLEO.quarks[1])};
const vec3 NU_Q2 = ${v3(COLORES_NUCLEO.quarks[2])};
const vec3 NU_CINTA = ${v3(COLORES_NUCLEO.cinta)};
// el rojo de los protones: arcilla roja tostada con su variación (para el núcleo y el protón entero)
vec3 nuRojo(vec3 q, float k) {
  float n = vnoise(q * 7.0 + k * 3.1);
  return NU_PROTON * (0.88 + 0.22 * n) * (0.94 + 0.12 * nuH(k * 1.7 + 0.3)) + vec3(0.02, 0.004, -0.004) * vnoise(q * 23.0);
}
#endif
`;

const GLSL_NUCLEO = /* glsl */`
const vec4 NU_P[${NUCLEO.MAX}] = vec4[${NUCLEO.MAX}](${NUCLEONES.map((b) => `vec4(${b.map(fl).join(', ')})`).join(', ')});
// T.x = fase · T.y = n · T.z = brillo · T.w = tiembla
vec3 nuCentro(int i, vec4 T) {
  vec3 c = NU_P[i].xyz;
  float f = float(i);
  return c + T.w * 0.016 * vec3(sin(T.x * 5.3 + f * 1.7), sin(T.x * 4.7 + f * 2.9), sin(T.x * 6.1 + f * 0.83));
}
float pz_nucleo(vec3 q, vec4 T, out float m) {
  int n = int(T.y + 0.5);
  float d = 1e5, dm = 1e5; m = 0.0;
  for (int i = 0; i < ${NUCLEO.MAX}; i++) {
    if (i >= n) break;
    float di = length(q - nuCentro(i, T)) - ${fl(NUCLEO.R)} * (0.97 + 0.06 * nuH(float(i) + 4.0));
    if (di < dm) { dm = di; m = float(i); }
    d = smin(d, di, 0.035);
  }
  return d - 0.004 * bultos(q * 9.0);
}
float pzc_nucleo(vec3 q, vec4 T) {
  int n = int(T.y + 0.5);
  float d = 1e5;
  for (int i = 0; i < ${NUCLEO.MAX}; i++) {
    if (i >= n) break;
    d = min(d, length(q - NU_P[i].xyz) - ${fl(NUCLEO.R * 0.85)});
  }
  return d;
}
float pza_nucleo(vec3 q, vec4 T) { return length(q) - uNucR(T); }
vec3 pzcol_nucleo(vec3 q, vec4 T, float m) {
  int i = int(m + 0.5);
  vec3 c;
  if (NU_P[i].w > 0.5) c = nuRojo(q, m);
  else c = NU_NEUTRON * (0.9 + 0.2 * vnoise(q * 7.0 + m)) * (0.93 + 0.14 * nuH(m * 2.3 + 1.0));
  gTr = NU_P[i].w > 0.5 ? 0.35 : 0.15;
  gEm = c * 0.35 * T.z;
  return c;
}
`;
// (la envolvente necesita el radio del racimo, que depende de n: va en una función aparte)
const glslRadioNucleo = () => {
  const radios = [];
  for (let n = 1; n <= NUCLEO.MAX; n++) radios.push(radioNucleo(n) + 0.03);
  return `const float NU_RAD[${NUCLEO.MAX}] = float[${NUCLEO.MAX}](${radios.map(fl).join(', ')});
float uNucR(vec4 T) { return NU_RAD[clamp(int(T.y + 0.5), 1, ${NUCLEO.MAX}) - 1]; }
`;
};

const GLSL_PROTON = /* glsl */`
// T.z = brillo
float pz_proton(vec3 q, vec4 T, out float m) {
  m = 0.0;
  return (length(q) - 1.0 - 0.012 * bultos(q * 2.6) - 0.006 * vnoise(q * 9.0)) * 0.95;
}
float pzc_proton(vec3 q, vec4 T) { return length(q) - 0.97; }
vec3 pzcol_proton(vec3 q, vec4 T, float m) {
  vec3 c = nuRojo(q * 0.2, 2.0);
  gTr = 0.45;
  gEm = c * (0.06 + 0.4 * T.z);
  return c;
}
`;

const GLSL_QUARKS = /* glsl */`
// T.x = fase (s) · T.y = bandas (0…1) · T.z = brillo (0…1) · T.w = cáscara × 1000 (entero) + vibra (0…0,999)
// T del cuerpo: el triángulo se escala con «separacion», que va en el entero de T.y: T.y = bandas + 2 × round(sep × 100)
float quSep(vec4 T) { float s = floor(T.y * 0.5) / 100.0; return s > 0.01 ? s : 1.0; }
float quBandas(vec4 T) { return T.y - 2.0 * floor(T.y * 0.5); }
float quVibra(vec4 T) { return fract(T.w); }
float quCascara(vec4 T) { return floor(T.w) / 1000.0; }
vec3 quQ(int k, vec4 T) {
  float a = 1.5708 + float(k) * 2.0944;
  // los quarks tiemblan un poco (se mueven: su energía)
  float f = float(k);
  vec3 j = quVibra(T) * 0.018 * vec3(sin(T.x * 7.1 + f * 2.1), sin(T.x * 6.3 + f * 1.3), 0.6 * sin(T.x * 5.2 + f));
  return vec3(cos(a), sin(a), 0.0) * ${fl(QUARKS.RT)} * quSep(T) + j;
}
// la cinta k (del quark k al k+1): distancia y su coordenada a lo largo (s) en sOut
float quCinta(vec3 q, int k, vec4 T, out float sOut) {
  vec3 A = quQ(k, T), B = quQ(k == 2 ? 0 : k + 1, T);
  vec3 ab = B - A; float L = length(ab); vec3 t = ab / L;
  vec3 c0 = (A + B) * 0.5;
  vec3 nIn = normalize(-c0 + t * dot(c0, t));            // hacia el centro del triángulo, en el plano
  vec3 nz = vec3(0.0, 0.0, 1.0);
  float s = clamp(dot(q - A, t) / L, 0.0, 1.0);
  sOut = s;
  // ondas estacionarias: la principal en el plano y otra fuera de él, con fases propias
  float fk = float(k);
  float v = quVibra(T);
  float w1 = sin(3.14159 * s) * sin(T.x * 9.0 + fk * 2.1);
  float w2 = sin(6.28318 * s) * cos(T.x * 12.5 + fk * 1.3);
  vec3 c = A + ab * s + nIn * (v * 0.07 * w1 - 0.02) + nz * (v * 0.045 * w2);
  vec3 r = q - c;
  // sección: cinta plana (ancho 0,13 en z, grosor 0,036), algo retorcida a lo largo
  float tw = 0.9 * (s - 0.5) + 0.25 * fk;
  float cs = cos(tw), sn = sin(tw);
  vec2 x = vec2(dot(r, nIn), dot(r, nz));
  x = vec2(cs * x.x - sn * x.y, sn * x.x + cs * x.y);
  float d = sdRoundRect(x, vec2(0.018, 0.064), 0.014);
  float dl = abs(dot(r, t));
  d = length(vec2(max(d, 0.0), max(dl - 0.004, 0.0))) + min(max(d, dl - 0.004), 0.0);
  // crecen desde los dos quarks y se juntan en el medio
  float g = quBandas(T);
  float hueco = 0.5 - 0.5 * g;
  float ds = (hueco - abs(s - 0.5)) * L;
  if (g < 0.999) d = max(d, ds);
  if (g < 0.001) d = 1e5;
  return d * 0.75;
}
float quCascaraD(vec3 q, vec4 T) {
  float k = quCascara(T);
  if (k < 0.001) return 1e5;
  float d = abs(length(q) - ${fl(QUARKS.CASCARA)}) - 0.035;
  // abierta hacia +z: k = 1 la media esfera de atrás; menos, solo el fondo
  float zc = mix(-0.95, 0.0, k);
  d = smax(d, q.z - zc, 0.05);
  return d - 0.006 * bultos(q * 3.0);
}
float pz_quarks(vec3 q, vec4 T, out float m) {
  float d = 1e5; m = 0.0;
  for (int k = 0; k < 3; k++) {
    float dq = length(q - quQ(k, T)) - ${fl(QUARKS.RB)} - 0.004 * bultos(q * 11.0);
    if (dq < d) { d = dq; m = float(k); }
  }
  for (int k = 0; k < 3; k++) {
    float s;
    float dc = quCinta(q, k, T, s);
    if (dc < d) m = 3.0 + float(k) + 0.9 * s;
    d = smin(d, dc, 0.03);
  }
  float dk = quCascaraD(q, T);
  if (dk < d) m = 7.0;
  d = min(d, dk);
  return d;
}
float pzc_quarks(vec3 q, vec4 T) {
  float d = 1e5;
  for (int k = 0; k < 3; k++) d = min(d, length(q - quQ(k, T)) - ${fl(QUARKS.RB * 0.9)});
  return min(d, quCascaraD(q, T) + 0.01);
}
float pza_quarks(vec3 q, vec4 T) {
  float r = ${fl(QUARKS.RT)} * quSep(T) + ${fl(QUARKS.RB)} + 0.12;
  float d = length(q) - r;
  if (quBandas(T) < 0.001) {
    d = 1e5;
    for (int k = 0; k < 3; k++) d = min(d, length(q - quQ(k, T)) - ${fl(QUARKS.RB)} - 0.03);
  }
  return min(d, quCascaraD(q, T) - 0.02);
}
vec3 pzcol_quarks(vec3 q, vec4 T, float m) {
  float b = T.z;
  float lat = 0.75 + 0.25 * sin(T.x * 6.0);
  if (m > 6.5) {
    // la piel del protón por dentro: arcilla roja, más clara y cálida hacia el centro (le llega la luz de las cintas)
    vec3 c = nuRojo(q * 0.25, 5.0) * 0.9;
    gTr = 0.4;
    gEm = vec3(0.30, 0.09, 0.03) * (0.12 + 0.3 * b) * smoothstep(1.2, 0.2, length(q.xy));
    return c;
  }
  if (m > 2.5) {
    // la goma ámbar de las cintas: rayas finas a lo largo y luz propia que corre por ellas
    float s = fract(m);
    float k = floor(m - 3.0);
    float corre = 0.6 + 0.4 * sin(s * 18.0 - T.x * 7.0 + k * 2.0);
    vec3 c = NU_CINTA * (0.86 + 0.14 * sin(q.z * 140.0)) * (0.92 + 0.12 * vnoise(q * 20.0));
    gBri = 1.6;
    gEm = NU_CINTA * b * (0.22 + 0.3 * corre) * lat;
    return c * 0.85;
  }
  int k = int(m + 0.5);
  vec3 c = k == 0 ? NU_Q0 : (k == 1 ? NU_Q1 : NU_Q2);
  c *= 0.9 + 0.2 * vnoise(q * 9.0 + m);
  gTr = 0.2;
  gEm = c * (0.03 + 0.16 * b * lat);
  return c;
}
`;

const TIPOS = {
  nucleo: { envolvente: true, radio: radioNucleo(NUCLEO.MAX) + 0.06, glifos: [], glsl: GLSL_COMUN + glslRadioNucleo() + GLSL_NUCLEO },
  proton: { radio: 1.04, glifos: [], glsl: GLSL_COMUN + GLSL_PROTON },
  quarks: { envolvente: true, radio: 1.1, glifos: [], glsl: GLSL_COMUN + GLSL_QUARKS },
};
export const TIPOS_NUCLEO = TIPOS;
export function tiposNucleo(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-nucleo: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
  return o;
}

// ---------------------------------------------------------------- funciones de pieza
const base = (o) => ({ pos: o.pos ?? [0, 0, 0], escala: o.escala ?? 1, rot: o.rot ?? [0, 0, 0], sq: o.sq ?? [1, 1, 1], toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
// punto del mundo de un punto local de una pieza (euler YXZ, como el kit)
export function mundoPieza(o, l) {
  const v = new THREE.Vector3(l[0] * (o.sq?.[0] ?? 1), l[1] * (o.sq?.[1] ?? 1), l[2] * (o.sq?.[2] ?? 1)).multiplyScalar(o.escala ?? 1)
    .applyEuler(new THREE.Euler(...(o.rot ?? [0, 0, 0]), 'YXZ'));
  const p = o.pos ?? [0, 0, 0];
  return [p[0] + v.x, p[1] + v.y, p[2] + v.z];
}
const escribirT = (P, i, x, w) => { const t = P.U.uPT.value[i]; t.x = x; t.w = w; };

export function nucleo(P, i, o = {}) {
  const b = base(o);
  const n = Math.max(1, Math.min(NUCLEO.MAX, Math.round(o.n ?? 16)));
  P.pieza(i, { ...b, variante: n, color: cl(o.brillo ?? 0) });
  escribirT(P, i, o.fase ?? 0, cl(o.tiembla ?? 0));
  return geometriaNucleo(P, o);
}
// dónde queda el núcleo (sin ponerlo): sus bolitas y el protón más cercano a la cámara
export function geometriaNucleo(P, o = {}) {
  const b = base(o);
  const n = Math.max(1, Math.min(NUCLEO.MAX, Math.round(o.n ?? 16)));
  const bolitas = NUCLEONES.slice(0, n).map((q) => ({ mundo: mundoPieza(b, q), proton: q[3] > 0.5, r: NUCLEO.R * b.escala }));
  // el protón «de delante»: el más cercano a la cámara entre los que se ven (los de fuera)
  // (o.camara: la posición de la cámara; por defecto, la de las escenas de plastilina, [0, 3,8, 15,5])
  let frente = -1, dmin = 1e9;
  const cam = o.camara ?? [0, 3.8, 15.5];
  bolitas.forEach((s, k) => {
    if (!s.proton) return;
    const d = Math.hypot(s.mundo[0] - cam[0], s.mundo[1] - cam[1], s.mundo[2] - cam[2]);
    if (d < dmin) { dmin = d; frente = k; }
  });
  return { centro: mundoPieza(b, [0, 0, 0]), radio: radioNucleo(n) * b.escala, bolitas, frente, punto: (k) => bolitas[k]?.mundo ?? null };
}
export function proton(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: 0, color: cl(o.brillo ?? 0) });
  return { centro: mundoPieza(b, [0, 0, 0]), radio: b.escala, apoyo: mundoPieza(b, [0, -1, 0]) };
}
export function quarks(P, i, o = {}) {
  const b = base(o);
  const sep = Math.max(0.5, Math.min(1.2, o.separacion ?? 1));
  const bandas = cl(o.bandas ?? 1);
  P.pieza(i, { ...b, variante: bandas + 2 * Math.round(sep * 100), color: cl(o.brillo ?? 1) });
  escribirT(P, i, o.fase ?? 0, Math.round(cl(o.cascara ?? 0) * 1000) + Math.min(0.999, cl(o.vibra ?? 1)));
  return geometriaQuarks(o);
}
export function geometriaQuarks(o = {}) {
  const b = base(o);
  const sep = Math.max(0.5, Math.min(1.2, o.separacion ?? 1));
  const qs = [0, 1, 2].map((k) => { const a = Math.PI / 2 + k * 2 * Math.PI / 3; return [Math.cos(a) * QUARKS.RT * sep, Math.sin(a) * QUARKS.RT * sep, 0]; });
  return {
    centro: mundoPieza(b, [0, 0, 0]),
    quarks: qs.map((q) => mundoPieza(b, q)),
    cintas: [0, 1, 2].map((k) => { const A = qs[k], B = qs[(k + 1) % 3]; return mundoPieza(b, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, 0]); }),
    radioQuark: QUARKS.RB * b.escala,
  };
}

// ---------------------------------------------------------------- 2D
export function resplandor(g, x, y, radio, { color = [255, 170, 90], fuerza = 1 } = {}) {
  if (fuerza <= 0.001 || radio <= 0.5) return;
  const [r, gg, b] = color;
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(x, y, 0, x, y, radio);
  gr.addColorStop(0, `rgba(${r},${gg},${b},${0.42 * fuerza})`);
  gr.addColorStop(0.35, `rgba(${r},${gg},${b},${0.14 * fuerza})`);
  gr.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  g.fillStyle = gr; g.fillRect(x - radio, y - radio, 2 * radio, 2 * radio);
  g.restore();
}
