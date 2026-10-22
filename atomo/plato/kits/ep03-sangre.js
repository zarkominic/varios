// KIT DEL EPISODIO 3 · «SANGRE» (kits/ep03-sangre.js). Lo crea ep3-celulas y, una vez entregado con su hoja de prueba
// (escenas/ep03-sangre-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k a tamaño completo), queda CONGELADO:
// las escenas que lo usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta (una pieza propia con
// tiposExtra, o 2D encima) y lo dice en su informe. Lo usan ep3-celulas (lo crea), ep3-medula y ep3-virus.
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra), con el material, la luz y
// la paleta del resto del episodio, y una función por pieza que la coloca y le pasa sus parámetros:
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposSangre, globulo, fila, rio, vaso, cortePelo, medula } from '/atomo/plato/kits/ep03-sangre.js';
//   const P = await crearPlato({ piezas: ['globulos', 'vaso', …], tiposExtra: tiposSangre(['globulos', 'vaso']), … });
//   function dibujar(t) { …; P.limpiar(); rio(P, 0, { pos, escala, avance: ts * 1.4 }); vaso(P, 1, { … }); …; P.render(n); }
//
// tiposSangre(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados: así se compila menos). Cada función de
// pieza se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de
// P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los puntos del mundo que
// hacen falta para poner otras cosas encima o junto a ella. mundoPieza(o, local) da cualquier punto local en el mundo.
//
// MEDIDAS. La unidad de los glóbulos es su radio: un glóbulo rojo mide 2 de ancho (unos 7,5 µm: 1 = 3,75 µm). El pelo
// mide 12 glóbulos de ancho (unos 90 µm): con la misma unidad, el corte de un pelo de radio 1 va a escala 12 × la de los
// glóbulos, y una fila de 12 glóbulos de paso 2 (SANGRE.PASO) lo cubre justo de lado a lado (ep3-celulas).
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'globulo' · globulo(P, i, { edad: 0 })
//      Un glóbulo rojo: un disco bicóncavo de arcilla carmesí, de radio 1, con el eje en z (la cara hundida mira a +z;
//      de canto se ve como un bizcocho con la cintura fina). Grueso 0,66 en el borde y 0,24 en el centro. Algo
//      translúcido, con brillo húmedo y el hoyo más oscuro. edad (0…1): envejece (ep3-medula): pierde el rojo vivo hacia
//      un pardo apagado, encoge un 8 %, el hoyo se rellena un poco y el borde se arruga en puntas romas. Devuelve
//      { centro, radio (mundo), normal (mundo: hacia donde mira la cara) }.
//  · 'globulos' · fila(P, i, { n: 12, paso: 2, llegada: 1 }) · rio(P, i, { avance: 0, semilargo: 12, canal: 3, semilla: 0 })
//      Muchos glóbulos (los mismos, una sola pieza con repetición: se calcula solo el más cercano y sus vecinos).
//      – fila: n glóbulos (1…16) en fila a lo largo de x, tumbados en el plano z = 0 (la cara a +z), centrados en el
//        origen, de paso `paso` (2: se tocan). llegada (0…1): van llegando uno a uno, de izquierda a derecha: cada uno
//        baja desde arriba a la izquierda (desde +z y −x, dando media vuelta) y se posa en su sitio; con llegada 1 están
//        todos quietos en fila. El glóbulo k se posa cuando llegada = llegadaFila(k, n) y empieza a verse en
//        salidaFila(k, n). Devuelve { centros (mundo, los sitios finales), extremos: [izq, der] (mundo: los bordes de la
//        fila en su eje), ancho (mundo), normal (mundo) }.
//      – río: un río de glóbulos a lo largo de x (de −semilargo a +semilargo) que avanza hacia +x: un glóbulo cada
//        SANGRE.PASO_RIO a lo largo, repartidos dentro de un cilindro de radio `canal` (algo hacia el fondo, −z: para un
//        vaso abierto por delante), cada uno con su giro, que dan vueltas despacio al avanzar. avance: lo que ha corrido
//        el río (unidades locales; p. ej. ts × 1,6); semilla (0…999): otro reparto. Los que salen por un extremo
//        desaparecen (pon semilargo más allá del cuadro). Devuelve { eje: [a, b] (mundo) }.
//  · 'vaso' · vaso(P, i, { abierto: true, semilargo: 3 })
//      Un vaso sanguíneo recto a lo largo de x: la luz de radio 1 y la pared de 1 a 1,3, en tres capas que se ven en los
//      cortes (íntima rosa pálida, media muscular de rosa teja con fibras en anillo, adventicia crema con fibras), y por
//      dentro el endotelio: celdas alargadas como adoquines, con su núcleo. abierto (true): cortado a lo largo por el plano
//      z = 0, sin la mitad de delante (se ve por dentro, como un canal; es donde corre el río); false: el tubo entero (se
//      ve por fuera, la adventicia con capilares finos). semilargo ≤ 4,2. Los extremos son cortes limpios (el anillo con
//      sus capas). Devuelve { eje: [a, b], centro (mundo), radioLuz (mundo) }.
//  · 'cortePelo' · cortePelo(P, i, { largo: 1.2 })
//      Un trozo de pelo de radio 1 (algo ovalado: 1 × 0,94 en z), de eje y, cortado en y = 0 (la cara de arriba) y largo
//      hacia −y. El costado es la cutícula de escamas del pelo-tronco de las pruebas (las mismas tejas, con el borde libre
//      hacia +y); la cara del corte, de fuera adentro: la cutícula en capas finas de ámbar claro (0,9–1), la corteza de
//      color caramelo en celdas poligonales con fibrillas y gránulos de melanina, y la médula, hundida y esponjosa, de
//      color pardo oscuro (radio ~0,2, irregular). Devuelve { centro (de la cara), normal (de la cara), radio (mundo),
//      diametro: [izq, der] (mundo: los extremos del diámetro en x de la cara) }.
//  · 'medula' · medula(P, i, { largo: 1, brillo: 0 })
//      Un hueso largo cortado (la médula ósea en corte), de radio 1 y eje y, cortado en y = 0 y largo hacia −y. En la cara:
//      el hueso compacto, de marfil, en un anillo de 0,7 a 1 con sus laminillas y sus osteonas (anillos con el canal
//      oscuro en medio); el hueso esponjoso, de 0,32 a 0,7, una red de trabéculas de marfil; y la médula roja, hundida, en
//      los huecos y en el centro: granulosa (células apretadas) y de rojo oscuro. El costado es el periostio, de color
//      crema rosado, con fibras a lo largo y vasitos finos. brillo (0…1): la médula da luz propia cálida y late (la
//      «fábrica» trabajando; fase con brilloFase, en s). Devuelve { centro (de la cara), normal, radio (mundo), puntos:
//      [mundo × 8] (sitios de la médula en la cara, del centro hacia fuera: de donde salen glóbulos nuevos) }.
//
// 2D (para componer encima, como el resto del episodio)
//  · sombraSilueta(src, { dx, dy, blur, alfa, W }) → un lienzo con la sombra 2D de una foto con transparencia (la
//    silueta, desplazada, desenfocada y oscura): para los glóbulos vivos sobre la foto de un decorado (el vaso o el pelo),
//    que así dejan sombra sin volver a pintar el decorado. La luz del plató viene de arriba a la izquierda: dx, dy > 0.
//
// COSTE (este servidor, 1920 × 1080, con el plató; con otras escenas renderizando a la vez, el doble o más): ver
// window.__tiempos de la hoja de prueba. Un glóbulo de 400 px, ~0,4 s; la fila de 12 quietos (1100 px de ancho), ~0,6 s,
// y mientras llegan (se calculan los 12), ~1 s; el río a pantalla completa, ~1–1,5 s; el vaso abierto a pantalla
// completa, ~2 s (mejor una foto); el corte del pelo de 1100 px, ~1,5 s (foto); la médula de 800 px, ~1,5 s (foto).
// Lo que no se mueve se fotografía al cargar (el vaso, el pelo, la médula) y encima van los glóbulos vivos con
// sombraSilueta.
//
// CONGELADO el 22-10-2026, entregado con la hoja de prueba (escenas/ep03-sangre-hoja.html).
import * as THREE from 'three';

const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);

// ---------------------------------------------------------------- medidas
// R: radio del glóbulo · PASO: paso de la fila (se tocan) · ST: retardo entre glóbulos de la fila (en duraciones de la
// llegada de uno) · PASO_RIO: un glóbulo cada tanto a lo largo del río · VASO: radio de la luz y grueso de la pared ·
// PELO: glóbulos que caben en el ancho de un pelo
export const SANGRE = { R: 1, PASO: 2, ST: 0.38, PASO_RIO: 1.3, VASO: { R: 1, PARED: 0.3, SEMILARGO_MAX: 4.2 }, PELO: 12, NMAX: 16 };
export const COLORES_SANGRE = {
  globulo: [0.34, 0.027, 0.02],       // carmesí (lineal)
  viejo: [0.15, 0.06, 0.036],         // el pardo del glóbulo viejo
  endotelio: [0.40, 0.15, 0.115],
  media: [0.36, 0.085, 0.065],
  adventicia: [0.40, 0.29, 0.19],
  corteza: [0.25, 0.135, 0.068],      // la corteza del pelo, caramelo
  medulaPelo: [0.095, 0.054, 0.032],
  hueso: [0.50, 0.44, 0.33],
  medulaRoja: [0.28, 0.035, 0.03],
  periostio: [0.44, 0.31, 0.235],
};
const v3 = (c) => `vec3(${c.map(fl).join(', ')})`;

// ---------------------------------------------------------------- GLSL común
const GLSL_COMUN = /* glsl */`
#ifndef SANGRE_COMUN
#define SANGRE_COMUN 1
float sgH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
const vec3 SG_ROJO = ${v3(COLORES_SANGRE.globulo)};
const vec3 SG_VIEJO = ${v3(COLORES_SANGRE.viejo)};
float sgCaja(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); }
// glóbulo rojo de radio 1, eje z: el borde es un toro y el centro un disco fino; la unión suave hace el hoyo.
// edad 0…1: encoge, el hoyo se rellena y el borde se arruga en puntas romas
float sgGlob(vec3 q, float edad) {
  float s = 1.0 - 0.08 * edad;
  q /= s;
  float r = length(q.xy);
  float toro = length(vec2(r - 0.635, q.z)) - 0.33;
  float disco = length(vec2(max(r - 0.55, 0.0), q.z)) - 0.12 - 0.07 * edad;
  float d = smin(toro, disco, 0.28);
  if (edad > 0.001) {
    float a = atan(q.y, q.x);
    float pu = 0.5 + 0.5 * cos(a * 11.0 + 1.3 + 2.0 * sin(a * 3.0));
    d -= edad * 0.075 * pu * pu * pu * smoothstep(0.5, 0.9, r);
  }
  return d * s * 0.9;
}
float sgGlobC(vec3 q, float edad) {
  float s = 1.0 - 0.08 * edad;
  q /= s;
  return (length(vec2(length(q.xy) - 0.635, q.z)) - 0.29) * s;
}
// color del glóbulo (q en sus unidades): carmesí con el hoyo más oscuro y el borde algo más claro; k: su identidad
vec3 sgGlobCol(vec3 q, float edad, float k) {
  float r = length(q.xy);
  float v = 0.9 + 0.2 * vnoise(q * 3.0 + k * 7.1);
  vec3 c = SG_ROJO * v * (0.9 + 0.2 * sgH(k * 3.7 + 0.4));
  c *= mix(0.68, 1.0, smoothstep(0.05, 0.55, r));
  c += vec3(0.06, 0.012, 0.008) * smoothstep(0.5, 0.8, r) * smoothstep(0.0, 0.25, abs(q.z));
  c = mix(c, SG_VIEJO * v, edad * 0.8);
  gTr = 0.55; gBri = 1.35;
  return c;
}
// las escamas de la cutícula (las del pelo-tronco del kit compartido, con otro nombre): filas al tresbolillo que envuelven
// el cilindro; el borde libre de cada escama mira a +y
const float SG_EH = 0.235, SG_EN = 9.0, SG_EW = 6.2831853 / 9.0;
float sgEscBorde(float j, float th, float rg, out vec2 id, out float x) {
  float off = 0.5 * SG_EW * mod(j, 2.0) + 0.3 * SG_EW * (hash12(vec2(j, 3.7)) - 0.5);
  float u = (th - off) / SG_EW;
  float c = floor(u);
  x = fract(u) - 0.5;
  id = vec2(mod(c, SG_EN), j);
  float h1 = hash12(id + 0.37), h2 = hash12(id + 5.13), h3 = hash12(id + 9.71);
  float arco = (0.075 + 0.05 * h1) * (1.0 - 4.0 * x * x);
  return (j + 1.0) * SG_EH + 0.04 * (h2 - 0.5) + arco + 0.035 * (h3 - 0.5) * x * 2.0 + rg;
}
float sgEscama(float th, float y, out vec2 id, out float x) {
  float k = floor(y / SG_EH);
  float rg = 0.0055 * sin(th * 27.0 + 1.7 * sin(th * 9.0 + y * 2.3)) + 0.003 * sin(th * 73.0 + y * 5.1);
  vec2 idA; float xA;
  float tA = sgEscBorde(k - 1.0, th, rg, idA, xA);
  if (y < tA) { id = idA; x = xA; return tA - y; }
  float tB = sgEscBorde(k, th, rg, id, x);
  if (y < tB) return tB - y;
  return sgEscBorde(k + 1.0, th, rg, id, x) - y;
}
float sgEscRelieve(vec3 q, out float m) {
  float th = atan(q.z, q.x) + 0.05 * q.y;
  vec2 id; float x;
  float s = sgEscama(th, q.y, id, x);
  float hs = hash12(id + 2.2);
  float grosor = 0.034 * (0.75 + 0.5 * hs) * (hs > 0.9 ? 1.5 : 1.0);
  float e = grosor * smoothstep(0.0, 0.016, s) * (1.0 - smoothstep(0.02, 1.25 * SG_EH, s));
  e += 0.01 * (1.0 - 4.0 * x * x);
  m = floor(hs * 8.0) + clamp(s / (1.4 * SG_EH), 0.0, 0.999);
  return e;
}
vec3 sgEscCol(vec3 q, float m) {
  float hs = floor(m) / 8.0, s = fract(m);
  float veta = vnoise(vec3(atan(q.z, q.x) * 9.0, q.y * 0.6, 0.0));
  vec3 base = vec3(0.105, 0.058, 0.033) * (0.8 + 0.3 * veta) * (0.86 + 0.28 * hs);
  base = mix(base, base * 0.55, smoothstep(0.45, 0.95, s));
  gTr = 0.75; gBri = 1.7;
  return mix(base, vec3(0.2, 0.125, 0.07), (1.0 - smoothstep(0.02, 0.09, s)) * 0.85);
}
// Voronoi 2D: x, distancia al borde de la celda · yz, la identidad de la celda · w, distancia a su centro
vec4 sgVoronoi(vec2 p) {
  vec2 n = floor(p), f = fract(p);
  vec2 mg = vec2(0.0), mr = vec2(0.0); float md = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 o = vec2(hash12(n + g), hash12(n + g + 17.3)) * 0.76 + 0.12;
    vec2 r = g + o - f;
    float d = dot(r, r);
    if (d < md) { md = d; mr = r; mg = g; }
  }
  float dc = sqrt(md);
  md = 8.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
    vec2 g = mg + vec2(float(i), float(j));
    vec2 o = vec2(hash12(n + g), hash12(n + g + 17.3)) * 0.76 + 0.12;
    vec2 r = g + o - f;
    vec2 dd = r - mr;
    if (dot(dd, dd) > 1e-5) md = min(md, dot(0.5 * (mr + r), normalize(dd)));
  }
  return vec4(md, n + mg, dc);
}
#endif
`;

// ---------------------------------------------------------------- un glóbulo
const GLSL_GLOBULO = /* glsl */`
// T.z = edad (0…1)
float pz_globulo(vec3 q, vec4 T, out float m) { m = 0.0; return sgGlob(q, T.z); }
float pzc_globulo(vec3 q, vec4 T) { return sgGlobC(q, T.z); }
vec3 pzcol_globulo(vec3 q, vec4 T, float m) { return sgGlobCol(q, T.z, 0.0); }
`;

// ---------------------------------------------------------------- muchos glóbulos (fila y río)
const GLSL_GLOBULOS = /* glsl */`
// T.x = llegada (fila) o avance (río) · T.y = modo (0 fila · 1 río) + semilla / 1000 · T.z = n (fila) o semilargo (río) ·
// T.w = paso (fila) o radio del canal (río)
const float SG_ST = ${fl(SANGRE.ST)}, SG_PR = ${fl(SANGRE.PASO_RIO)};
bool sgEsRio(vec4 T) { return T.y > 0.5; }
// FILA: el sitio y el giro del glóbulo k mientras llega (u: su avance 0…1; 0 = aún no ha salido)
vec3 sgFilaC(float k, vec4 T, out vec2 giro, out float u) {
  float n = T.z;
  float tot = 1.0 + (n - 1.0) * SG_ST;
  u = clamp(T.x * tot - k * SG_ST, 0.0, 1.0);
  float a = (1.0 - u) * (1.0 - u) * (1.0 - u);
  vec3 c = vec3((k - 0.5 * (n - 1.0)) * T.w, 0.0, 0.0);
  giro = vec2(a * 2.6, a * 1.4 * (sgH(k * 5.3 + 1.0) - 0.5));
  return c + a * vec3(-3.2, 0.5 * (sgH(k + 0.3) - 0.5), 5.0);
}
vec3 sgFilaL(vec3 q, float k, vec4 T, out float u) {
  vec2 g; vec3 c = sgFilaC(k, T, g, u);
  vec3 p = q - c;
  float cy = cos(g.x), sy = sin(g.x);
  p = vec3(cy * p.x - sy * p.z, p.y, sy * p.x + cy * p.z);
  float cx = cos(g.y), sx = sin(g.y);
  return vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
}
float sgFila(vec3 q, vec4 T, out float m) {
  float n = T.z, d = 1e5; m = 0.0;
  if (T.x >= 0.999) {
    float k0 = clamp(floor(q.x / T.w + 0.5 * n), 0.0, n - 1.0);
    for (int j = -1; j <= 1; j++) {
      float k = clamp(k0 + float(j), 0.0, n - 1.0);
      float dk = sgGlob(q - vec3((k - 0.5 * (n - 1.0)) * T.w, 0.0, 0.0), 0.0);
      if (dk < d) { d = dk; m = k; }
    }
    return d;
  }
  for (int i = 0; i < ${SANGRE.NMAX}; i++) {
    float k = float(i);
    if (k >= n) break;
    float u;
    vec3 p = sgFilaL(q, k, T, u);
    if (u <= 0.0) break;
    float dk = sgGlob(p, 0.0);
    if (dk < d) { d = dk; m = k; }
  }
  return d;
}
// RÍO: el glóbulo de la casilla s (centro en coordenadas del río, sin el avance) y su giro
vec3 sgRioC(float s, vec4 T, out vec2 ang) {
  float h = s * 7.13 + floor(fract(T.y) * 1000.0 + 0.5) * 1.37 + 0.5;
  float Rc = T.w;
  float a = s * 2.39996 + 1.6 * (sgH(h + 1.1) - 0.5);
  float rr = Rc * (0.25 + 0.6 * sqrt(sgH(h + 2.2)));
  vec3 c = vec3((s + 0.5 + 0.5 * (sgH(h) - 0.5)) * SG_PR, rr * cos(a), rr * sin(a) * 0.7 - 0.22 * Rc);
  ang = vec2(6.2832 * sgH(h + 3.3), 3.1416 * sgH(h + 4.4)) + T.x * 0.22 * (vec2(sgH(h + 5.5), sgH(h + 6.6)) - 0.5);
  return c;
}
vec3 sgRioL(vec3 q, float s, vec4 T, out float vis) {
  vec2 g; vec3 c = sgRioC(s, T, g);
  c.x += T.x;
  vis = abs(c.x) < T.z ? 1.0 : 0.0;
  vec3 p = q - c;
  float cy = cos(g.x), sy = sin(g.x);
  p = vec3(cy * p.x - sy * p.z, p.y, sy * p.x + cy * p.z);
  float cx = cos(g.y), sx = sin(g.y);
  return vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
}
float sgRio(vec3 q, vec4 T, out float m) {
  float s0 = floor((q.x - T.x) / SG_PR), d = 1e5; m = 0.0;
  for (int j = -2; j <= 2; j++) {
    float s = s0 + float(j);
    // (coste) lejos de un glóbulo basta su esfera (radio 1): el giro y la forma solo se pagan cerca
    vec2 g; vec3 c = sgRioC(s, T, g);
    c.x += T.x;
    if (abs(c.x) >= T.z) continue;
    float de = length(q - c) - 1.0;
    if (de > 0.12) { if (de < d) { d = de; m = s; } continue; }
    float vis;
    float dk = sgGlob(sgRioL(q, s, T, vis), 0.0);
    if (dk < d) { d = dk; m = s; }
  }
  // los glóbulos de las casillas que no se miran quedan a más de 2 pasos menos su radio
  return min(d, 2.0 * SG_PR - 1.05);
}
float pz_globulos(vec3 q, vec4 T, out float m) { return sgEsRio(T) ? sgRio(q, T, m) : sgFila(q, T, m); }
float pzc_globulos(vec3 q, vec4 T) {
  float m;
  if (sgEsRio(T)) {
    // (coste) la sombra del río: cada glóbulo como un disco grueso sin girar (los tres más cercanos)
    float s0 = floor((q.x - T.x) / SG_PR), d = 1e5;
    for (int j = -1; j <= 1; j++) {
      vec2 g; vec3 c = sgRioC(s0 + float(j), T, g);
      c.x += T.x;
      if (abs(c.x) >= T.z) continue;
      d = min(d, length(q - c) - 0.62);
    }
    return min(d, SG_PR - 0.6);
  }
  return sgFila(q, T, m) + 0.03;
}
float pza_globulos(vec3 q, vec4 T) {
  if (sgEsRio(T)) return sgCaja(q, vec3(T.z + 1.05, T.w + 1.05, T.w + 1.05));
  float hx = 0.5 * T.z * T.w + 0.06;
  if (T.x >= 0.999) return sgCaja(q, vec3(hx, 1.0, 0.36));
  return sgCaja(q - vec3(-1.6, 0.0, 2.5), vec3(hx + 2.75, 1.45, 3.65));
}
vec3 pzcol_globulos(vec3 q, vec4 T, float m) {
  float u, vis;
  vec3 p = sgEsRio(T) ? sgRioL(q, m, T, vis) : sgFilaL(q, m, T, u);
  if (!sgEsRio(T) && T.x >= 0.999) p = q - vec3((m - 0.5 * (T.z - 1.0)) * T.w, 0.0, 0.0);
  return sgGlobCol(p, 0.0, m);
}
`;

// ---------------------------------------------------------------- el vaso
const GLSL_VASO = /* glsl */`
// T.y = variante (0 abierto · 1 entero) · T.z = semilargo
const vec3 SG_ENDO = ${v3(COLORES_SANGRE.endotelio)};
const vec3 SG_MEDIA = ${v3(COLORES_SANGRE.media)};
const vec3 SG_ADV = ${v3(COLORES_SANGRE.adventicia)};
float sgVasoOnda(vec3 q, float a) { return 0.012 * sin(q.x * 2.1 + a * 3.0) + 0.008 * sin(q.x * 5.3 - a * 7.0); }
float pz_vaso(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float r = length(q.yz), a = atan(q.z, q.y);
  float d = abs(r - 1.15 - sgVasoOnda(q, a)) - 0.15;
  d = max(d, abs(q.x) - T.z);
  if (T.y < 0.5) d = max(d, q.z - 0.008 * sin(q.x * 3.0));
  return d * 0.85;
}
float pzc_vaso(vec3 q, vec4 T) {
  float r = length(q.yz);
  float d = max(abs(r - 1.15) - 0.13, abs(q.x) - T.z + 0.02);
  if (T.y < 0.5) d = max(d, q.z + 0.02);
  return d;
}
vec3 pzcol_vaso(vec3 q, vec4 T, float m) {
  float r = length(q.yz), a = atan(q.z, q.y);
  float rl = r - sgVasoOnda(q, a);
  float corte = (T.y < 0.5 && q.z > -0.02) || abs(q.x) > T.z - 0.012 ? 1.0 : 0.0;
  float v = 0.93 + 0.14 * vnoise(q * 5.0);
  if (corte > 0.5) {
    // las capas de la pared, en el corte
    gTr = 0.5;
    if (rl < 1.045) return mix(SG_ENDO * 1.25, vec3(0.55, 0.3, 0.24), 0.35) * v;
    if (rl < 1.215) {
      float fib = 0.5 + 0.5 * sin(rl * 260.0 + 2.0 * vnoise(q * 9.0));
      return SG_MEDIA * (0.82 + 0.3 * fib) * v;
    }
    float fa = vnoise(vec3(rl * 80.0, q.x * 6.0, a * 20.0));
    return SG_ADV * (0.85 + 0.25 * fa) * v;
  }
  if (rl < 1.15) {
    // por dentro: el endotelio, adoquines alargados a lo largo del vaso, con su núcleo
    vec4 vo = sgVoronoi(vec2(q.x * 2.4, a * 3.6));
    float borde = 1.0 - smoothstep(0.02, 0.07, vo.x);
    float nucleo = 1.0 - smoothstep(0.12, 0.2, vo.w);
    vec3 c = SG_ENDO * (0.88 + 0.24 * hash12(vo.yz)) * v;
    c = mix(c, c * 0.55, borde);
    c = mix(c, vec3(0.30, 0.10, 0.12), nucleo * 0.6);
    gTr = 0.6; gBri = 1.5;
    return c;
  }
  // por fuera (entero): la adventicia con capilares finos
  float fa = vnoise(vec3(q.x * 9.0, a * 4.0, 0.0));
  vec3 c = SG_ADV * (0.88 + 0.22 * fa) * v;
  float cap = abs(sin(q.x * 3.1 + 2.2 * sin(a * 2.0 + q.x * 0.7)) * 1.0 + 0.6 * sin(a * 5.0 - q.x * 1.3));
  c = mix(c, vec3(0.30, 0.06, 0.045), (1.0 - smoothstep(0.03, 0.09, cap)) * 0.75);
  gTr = 0.35;
  return c;
}
`;

// ---------------------------------------------------------------- el corte de un pelo
const GLSL_CORTE_PELO = /* glsl */`
// T.z = largo (hacia −y)
const vec3 SG_CORTEZA = ${v3(COLORES_SANGRE.corteza)};
const vec3 SG_MEDPELO = ${v3(COLORES_SANGRE.medulaPelo)};
// radio de la médula (irregular) en la dirección de p
float sgMedR(vec2 p) { float a = atan(p.y, p.x); return 0.2 + 0.035 * sin(a * 3.0 + 0.7) + 0.02 * sin(a * 7.0 + 2.1); }
float sgCaraPelo(vec2 p) {
  float r = length(p);
  // la médula, hundida; la cutícula del borde, un poco más alta que la corteza
  return -0.018 * (1.0 - smoothstep(sgMedR(p) - 0.03, sgMedR(p) + 0.015, r)) + 0.006 * smoothstep(0.88, 0.92, r);
}
float pz_cortePelo(vec3 q, vec4 T, out float m) {
  vec3 k = vec3(q.x, q.y, q.z / 0.94);
  float rr = length(k.xz);
  m = 0.0;
  float tapa = max((q.y - sgCaraPelo(k.xz)) * 0.9, -T.z - q.y);
  if (rr > 1.11) return max((rr - 1.075) * 0.94, tapa);
  float e = sgEscRelieve(vec3(k.x, q.y - 0.11, k.z), m);
  float th = atan(k.z, k.x);
  float r = 0.985 + e + 0.002 * sin(th * 41.0 + q.y * 3.0);
  return max((rr - r) * 0.42, tapa);
}
float pza_cortePelo(vec3 q, vec4 T) { return max(length(q.xz) - 1.08, max(q.y - 0.02, -T.z - q.y)); }
float pzc_cortePelo(vec3 q, vec4 T) { return max(length(vec2(q.x, q.z / 0.94)) - 0.97, max(q.y + 0.01, -T.z - q.y + 0.01)); }
vec3 pzcol_cortePelo(vec3 q, vec4 T, float m) {
  vec2 p = vec2(q.x, q.z / 0.94);
  float r = length(p);
  float h = sgCaraPelo(p);
  if (q.y < h - 0.006 || r > 1.0) return sgEscCol(vec3(p.x, q.y - 0.11, p.y), m);
  float v = 0.93 + 0.14 * vnoise(vec3(p * 9.0, 0.3));
  // la cutícula del borde: capas finas, de ámbar claro, translúcidas
  if (r > 0.9) {
    float capa = 0.5 + 0.5 * sin((r - 0.9) * 340.0 + 1.5 * vnoise(vec3(p * 20.0, 1.0)));
    gTr = 0.85; gBri = 1.6;
    return mix(vec3(0.34, 0.2, 0.09), vec3(0.17, 0.09, 0.045), smoothstep(0.55, 1.0, capa)) * v;
  }
  float rm = sgMedR(p);
  if (r < rm + 0.006) {
    // la médula: esponjosa y oscura, con agujeritos
    float hueco = 1.0 - smoothstep(0.2, 0.32, vnoise(vec3(p * 30.0, 2.0)));
    gTr = 0.4;
    return mix(SG_MEDPELO * (1.0 + 0.3 * vnoise(vec3(p * 12.0, 4.0))), SG_MEDPELO * 0.55, hueco * 0.8) * v;
  }
  // la corteza: celdas poligonales con fibrillas (puntitos) y gránulos de melanina
  vec4 vo = sgVoronoi(p * 7.5);
  vec3 c = SG_CORTEZA * (0.88 + 0.22 * hash12(vo.yz + 3.0)) * v;
  float fib = vnoise(vec3(p * 120.0, 0.5));
  c *= 0.92 + 0.12 * fib;
  c = mix(c, c * 0.72, 1.0 - smoothstep(0.015, 0.06, vo.x));
  vec2 gc = p * 46.0, gi = floor(gc);
  float gr = step(0.9, hash12(gi + 7.7)) * (1.0 - smoothstep(0.14, 0.3, length(fract(gc) - 0.5 - 0.25 * (vec2(hash12(gi), hash12(gi + 1.3)) - 0.5))));
  c = mix(c, vec3(0.03, 0.017, 0.01), gr * 0.85);
  // el borde de la médula, más oscuro (sombra del hundimiento)
  c *= mix(0.7, 1.0, smoothstep(rm, rm + 0.06, r));
  gTr = 0.45; gBri = 1.2;
  return c;
}
`;

// ---------------------------------------------------------------- la médula ósea en corte
const GLSL_MEDULA = /* glsl */`
// T.x = fase del latido (s) · T.z = largo · T.w = brillo (0…1)
const vec3 SG_HUESO = ${v3(COLORES_SANGRE.hueso)};
const vec3 SG_MROJA = ${v3(COLORES_SANGRE.medulaRoja)};
const vec3 SG_PERI = ${v3(COLORES_SANGRE.periostio)};
// 0: médula · 1: hueso (en la cara del corte)
float sgHueso(vec2 p) {
  float r = length(p);
  float compacto = smoothstep(0.66, 0.71, r);
  // trabéculas: un laberinto de puentes que se espesan hacia fuera
  float t = abs(sin(p.x * 10.5 + 1.4 * sin(p.y * 7.1)) + sin(p.y * 11.3 + 1.2 * sin(p.x * 8.3 + 1.0)));
  float ancho = mix(0.22, 0.62, smoothstep(0.3, 0.68, r));
  float trab = (1.0 - smoothstep(ancho - 0.12, ancho, t)) * smoothstep(0.26, 0.36, r);
  return max(compacto, trab);
}
float sgCaraHueso(vec2 p) { return -0.04 * (1.0 - sgHueso(p)); }
float pz_medula(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float rr = length(q.xz), a = atan(q.z, q.x);
  float lado = rr - (1.0 + 0.015 * sin(a * 5.0 + q.y * 2.0) + 0.008 * sin(a * 13.0 - q.y));
  return max(lado * 0.9, max((q.y - sgCaraHueso(q.xz)) * 0.7, -T.z - q.y));
}
float pza_medula(vec3 q, vec4 T) { return max(length(q.xz) - 1.03, max(q.y - 0.01, -T.z - q.y)); }
float pzc_medula(vec3 q, vec4 T) { return max(length(q.xz) - 0.97, max(q.y + 0.045, -T.z - q.y + 0.01)); }
vec3 pzcol_medula(vec3 q, vec4 T, float m) {
  vec2 p = q.xz;
  float r = length(p), a = atan(p.y, p.x);
  float v = 0.93 + 0.14 * vnoise(q * 7.0);
  if (q.y < -0.05 || r > 1.0) {
    // el periostio: crema rosado, fibras a lo largo y vasitos
    float fib = vnoise(vec3(a * 30.0, q.y * 2.0, 0.0));
    vec3 c = SG_PERI * (0.86 + 0.22 * fib) * v;
    float va = abs(a * 2.2 + 0.5 * sin(q.y * 5.0 + a * 3.0) - floor(a * 2.2 + 0.5 * sin(q.y * 5.0 + a * 3.0) + 0.5));
    c = mix(c, vec3(0.32, 0.07, 0.05), (1.0 - smoothstep(0.012, 0.03, va)) * 0.7);
    gTr = 0.4;
    return c;
  }
  float b = sgHueso(p);
  vec3 hueso = SG_HUESO * v;
  if (r > 0.68) {
    // hueso compacto: laminillas en anillo y osteonas (anillos con el canal oscuro)
    hueso *= 0.92 + 0.1 * sin(r * 190.0);
    vec2 og = p * 9.0;
    vec2 oi = floor(og + 0.5);
    vec2 oc = oi + 0.3 * (vec2(hash12(oi), hash12(oi + 2.7)) - 0.5);
    float od = length(og - oc);
    float dentro = step(0.73, length(oc / 9.0)) * step(length(oc / 9.0), 0.95);
    float anillos = 0.5 + 0.5 * sin(od * 40.0);
    hueso = mix(hueso, hueso * (0.82 + 0.2 * anillos), dentro * (1.0 - smoothstep(0.35, 0.45, od)));
    hueso = mix(hueso, vec3(0.08, 0.035, 0.025), dentro * (1.0 - smoothstep(0.06, 0.1, od)));
  }
  // la médula roja: granulosa (células apretadas); con brillo, luz propia cálida que late
  vec4 vo = sgVoronoi(p * 34.0);
  vec3 med = SG_MROJA * (0.75 + 0.5 * hash12(vo.yz)) * (0.8 + 0.25 * smoothstep(0.0, 0.25, vo.x)) * v;
  float lat = 0.75 + 0.25 * sin(T.x * 5.0 + r * 9.0);
  gEm = (1.0 - b) * T.w * lat * vec3(0.30, 0.055, 0.03) * (0.6 + 0.6 * hash12(vo.yz + 5.0));
  gTr = mix(0.5, 0.3, b); gBri = mix(1.4, 1.0, b);
  return mix(med, hueso, b);
}
`;

const TIPOS = {
  globulo: { radio: 1.06, glifos: [], glsl: GLSL_COMUN + GLSL_GLOBULO },
  globulos: { envolvente: true, radio: 16.2, glifos: [], glsl: GLSL_COMUN + GLSL_GLOBULOS },
  vaso: { radio: 4.45, glifos: [], glsl: GLSL_COMUN + GLSL_VASO },
  cortePelo: { envolvente: true, radio: 1.2, glifos: [], glsl: GLSL_COMUN + GLSL_CORTE_PELO },
  medula: { envolvente: true, radio: 1.25, glifos: [], glsl: GLSL_COMUN + GLSL_MEDULA },
};
export const TIPOS_SANGRE = TIPOS;
export function tiposSangre(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-sangre: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
  return o;
}

// ---------------------------------------------------------------- funciones de pieza
const base = (o) => ({ pos: o.pos ?? [0, 0, 0], escala: o.escala ?? 1, rot: o.rot ?? [0, 0, 0], sq: o.sq ?? [1, 1, 1], toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
/** Punto del mundo de un punto local de una pieza colocada con o = { pos, escala, rot, sq } (euler YXZ, como el kit). */
export function mundoPieza(o, l) {
  const v = new THREE.Vector3(l[0] * (o.sq?.[0] ?? 1), l[1] * (o.sq?.[1] ?? 1), l[2] * (o.sq?.[2] ?? 1)).multiplyScalar(o.escala ?? 1)
    .applyEuler(new THREE.Euler(...(o.rot ?? [0, 0, 0]), 'YXZ'));
  const p = o.pos ?? [0, 0, 0];
  return [p[0] + v.x, p[1] + v.y, p[2] + v.z];
}
const dirPieza = (o, l) => { const a = mundoPieza({ ...o, pos: [0, 0, 0] }, l), n = Math.hypot(...a); return a.map((x) => x / n); };
const escribirT = (P, i, x, w) => { const t = P.U.uPT.value[i]; t.x = x; t.w = w; };

export function globulo(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: 0, color: cl(o.edad ?? 0) });
  return { centro: mundoPieza(b, [0, 0, 0]), radio: b.escala, normal: dirPieza(b, [0, 0, 1]) };
}
/** La llegada (0…1 de la de la fila) en que el glóbulo k de una fila de n se posa en su sitio. */
export const llegadaFila = (k, n = 12) => (k * SANGRE.ST + 1) / (1 + (n - 1) * SANGRE.ST);
/** La llegada en que el glóbulo k de una fila de n empieza a moverse (antes no se ve). */
export const salidaFila = (k, n = 12) => (k * SANGRE.ST) / (1 + (n - 1) * SANGRE.ST);
export function fila(P, i, o = {}) {
  const b = base(o);
  const n = Math.max(1, Math.min(SANGRE.NMAX, Math.round(o.n ?? 12))), paso = o.paso ?? SANGRE.PASO;
  P.pieza(i, { ...b, variante: 0, color: n });
  escribirT(P, i, cl(o.llegada ?? 1), paso);
  return geometriaFila(o);
}
export function geometriaFila(o = {}) {
  const b = base(o);
  const n = Math.max(1, Math.min(SANGRE.NMAX, Math.round(o.n ?? 12))), paso = o.paso ?? SANGRE.PASO;
  const centros = [...Array(n).keys()].map((k) => mundoPieza(b, [(k - (n - 1) / 2) * paso, 0, 0]));
  const hx = ((n - 1) / 2) * paso + SANGRE.R * 0.97;
  return { centros, extremos: [mundoPieza(b, [-hx, 0, 0]), mundoPieza(b, [hx, 0, 0])], ancho: 2 * hx * b.escala, normal: dirPieza(b, [0, 0, 1]) };
}
export function rio(P, i, o = {}) {
  const b = base(o);
  const semilla = Math.max(0, Math.min(999, Math.round(o.semilla ?? 0)));
  const L = o.semilargo ?? 12;
  P.pieza(i, { ...b, variante: 1 + semilla / 1000, color: L });
  escribirT(P, i, o.avance ?? 0, o.canal ?? 3);
  return { eje: [mundoPieza(b, [-L, 0, 0]), mundoPieza(b, [L, 0, 0])] };
}
export function vaso(P, i, o = {}) {
  const b = base(o);
  const L = Math.min(SANGRE.VASO.SEMILARGO_MAX, o.semilargo ?? 3);
  P.pieza(i, { ...b, variante: o.abierto === false ? 1 : 0, color: L });
  return { eje: [mundoPieza(b, [-L, 0, 0]), mundoPieza(b, [L, 0, 0])], centro: mundoPieza(b, [0, 0, 0]), radioLuz: SANGRE.VASO.R * b.escala };
}
export function cortePelo(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: 0, color: o.largo ?? 1.2 });
  return geometriaCortePelo(o);
}
export function geometriaCortePelo(o = {}) {
  const b = base(o);
  return { centro: mundoPieza(b, [0, 0, 0]), normal: dirPieza(b, [0, 1, 0]), radio: b.escala, diametro: [mundoPieza(b, [-1, 0, 0]), mundoPieza(b, [1, 0, 0])] };
}
export function medula(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: 0, color: o.largo ?? 1 });
  escribirT(P, i, o.brilloFase ?? 0, cl(o.brillo ?? 0));
  const puntos = [...Array(8).keys()].map((k) => { const r = k === 0 ? 0 : 0.12 + 0.07 * k, a = k * 2.4; return mundoPieza(b, [r * Math.cos(a), -0.03, r * Math.sin(a)]); });
  return { centro: mundoPieza(b, [0, 0, 0]), normal: dirPieza(b, [0, 1, 0]), radio: b.escala, puntos };
}

// ---------------------------------------------------------------- 2D
/** La sombra 2D de una foto con transparencia (px de dispositivo; W = ancho de diseño): la silueta desplazada (dx, dy px
 * de diseño), desenfocada (blur px) y oscura (alfa). */
export function sombraSilueta(src, { dx = 14, dy = 16, blur = 10, alfa = 0.45, color = '10,5,3', W = 1920 } = {}) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const gc = c.getContext('2d'), k = c.width / W;
  gc.filter = `blur(${blur * k}px)`;
  gc.drawImage(src, Math.round(dx * k), Math.round(dy * k));
  gc.filter = 'none';
  gc.globalCompositeOperation = 'source-in';
  gc.fillStyle = `rgba(${color},${alfa})`; gc.fillRect(0, 0, c.width, c.height);
  return c;
}
