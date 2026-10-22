// KIT DEL EPISODIO 3 · «UNIVERSO» (kits/ep03-universo.js). Lo crea ep3-universo y, una vez entregado con su hoja de prueba
// (escenas/ep03-universo-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que lo
// usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta y lo dice en su informe.
// Lo usan: ep3-universo (lo crea), ep3-borde (la esfera y la niebla), ep3-centro (la niebla del principio) y ep3-despedida
// (la galaxia encogida sobre la red).
//
// Dos partes: EL CIELO (la red de galaxias, la esfera de lo observable y la niebla brillante), que se pinta en un WebGL
// propio y se compone en 2D, y TRES PIEZAS DE ARCILLA para el plató de plastilina-adulta.js (la goma, la hormiga y la meta).
//
// ================================================================================================ EL CIELO
//   import { crearCielo, celdaRed, veloRed, RED, FINAL_UNIVERSO } from '/atomo/plato/kits/ep03-universo.js';
//   const cielo = crearCielo();                         // un lienzo WebGL propio de 1920 × 1080 (no se añade a la página)
//   cielo.dibujar(est);  g.drawImage(cielo.lienzo, 0, 0, 1920, 1080);   // o const foto = cielo.foto(est)
// est = { red, esfera, niebla, n, res }: lo que no se da no se pinta. n: el fotograma (el hervor de la arcilla). res (0…1):
// la resolución (0,5: la mitad en cada eje, cuatro veces más barato; para los fotogramas en movimiento: se dibuja escalado
// a 1920 × 1080 y la foto quieta, a res 1). El lienzo sale con transparencia (premultiplicada): lo que no tapa, se ve.
//  · red: { celda, centro, origen, luz: 1, velo: 1 }
//      LA RED DE GALAXIAS: la de colorRed del remate de la regla del lote 0 (GLSL_REMATES de plastilina-adulta.js), una
//      losa de arcilla azul noche casi negra con los filamentos en relieve, de luz cálida, cúmulos brillantes en los nudos y
//      puntitos-galaxia sueltos, a pantalla completa y a cualquier escala (se pinta entera en cada llamada: no es una
//      textura que se estira, así que nunca se ve borrosa). celda: lo que mide en px una celda grande de la red (la
//      escala; en el remate de la regla, unos 45 px); centro: el píxel donde cae el punto `origen` de la red (en unidades
//      de la red: una celda grande = 1/RED.K). RED.NODO es un cúmulo brillante: con origen RED.NODO, en `centro` hay un nudo
//      (ahí va «nosotros», la Vía Láctea). luz: la fuerza de su luz propia; velo (0…1): cuánto se ve (0: transparente).
//      celdaRed(z) y veloRed(z): la escala y lo que se ve de la red con el mundo en 10^z (la red no encoge ×10 en cada salto,
//      como el mundo, sino ×2,3: de una celda de ~2.800 px en 10²² a 45 px en 10²⁷; empieza a verse hacia 10^22,3 y está
//      entera en 10^23,6).
//  · esfera: { c, r, k: 1, borde: 1, cristal: 1, fuera: 0.5, lupa: 0.1, puntos: 1 }
//      LA ESFERA DE LO OBSERVABLE (necesita red): una cáscara de vidrio translúcida, centrada en c con radio r px. Dentro, la
//      red se ve algo aumentada (lupa: la refracción del vidrio, 0…0,3), más clara y llena de puntitos-galaxia (puntos);
//      fuera, más oscura (fuera: lo que oscurece, 0…1: lo que no podemos ver); en el borde interior, la niebla brillante
//      (borde 0…1: el fondo cósmico, el límite de lo que se ve); el cristal (0…1): un filo de luz en el borde, el reflejo
//      del foco arriba a la izquierda, un velo de vidrio y un halo cálido fuera. k (0…1): aparece (todo a la vez).
//  · niebla: { centro, escala: 260, luz: 1, abre: 0, cAbre, borde: 90, velo: 1 }
//      LA NIEBLA BRILLANTE: una pared de bocanadas de arcilla que brilla, ámbar y crema con manchas algo más frías (el fondo
//      cósmico de microondas en el estilo de la arcilla), que llena la pantalla. escala: px por bocanada grande; centro: el
//      píxel del origen de la niebla (moverlo la desplaza; escala y centro juntos acercan o alejan la cámara); abre (px): un
//      hueco redondo que se abre en cAbre (por defecto, el centro de la pantalla), con el borde rasgado de `borde` px (la
//      niebla «que se abre» de ep3-centro: abre de 0 a ~1.300 lo vacía); velo (0…1): su opacidad (para fundir con otra cosa:
//      ep3-borde, la imagen del telescopio que se funde en la niebla). Sin red, la niebla sola; con red y esfera, la niebla
//      solo va en el borde de la esfera (esfera.borde).
//   cielo.foto(est) → una copia del lienzo (las composiciones quietas son fotos: hazlas al cargar o en un fotograma barato,
//   y para que hiervan, dos o tres con n distintos).
//   cielo.nodo(origen, cerca) → el cúmulo más brillante de la red cerca del punto `origen` (unidades de la red), leído en la
//   GPU: para poner algo justo en un nudo.
//
// ESCALAS Y ENCUADRES
//  · RED: { K: 4,2 (celdas grandes por unidad de la red), NODO } (NODO: un cúmulo, en unidades de la red).
//  · celdaRed(z), veloRed(z): ver arriba. ESFERA_M = 4,4e26 m: el radio del universo observable (93.000 millones de años luz
//    de diámetro).
//  · ENLACE (el fotograma 0 de ep3-universo = el último de ep3-andromeda, en números): la Vía Láctea y Andrómeda de
//    crearMundo con el mundo a 10²² (540 px = 10²² m): la Vía Láctea en ENLACE.via (190, 560) con 27 px por radio de galaxia;
//    Andrómeda a 1.296 px (2,4e22 m) en ENLACE.andromeda (1430, 183), 1,5 veces mayor (40 px por radio), girada
//    ENLACE.giroAnd y aplastada ENLACE.aplastaAnd (un disco muy inclinado); la vara de alambre de la línea de tiempo (rayo de
//    ep03-tiempo.js, grosor 6) de borde a borde (ENLACE.vara), con la luz en ENLACE.luz del camino (el último tramo) y tres
//    figuritas de ep03-tocar.js de pie junto a ella cerca de la Vía Láctea (ENLACE.figuritas: x, y de los pies, alto px,
//    semilla); la regla en 10²² (e 22, ya 0, actual 22, lupa 0,5, en P.punto(1655, 528, 0,4), escala 1,42, rot [0, −0,12, 0]);
//    Atom en (230, 780). El fondo es el mundo de ep03-cosmos.js en 10²² sin galaxia (camaraPorTierra(22, …) con capas: { uGal:
//    [0, 0, 1, 0] }); las dos galaxias son fotos de la de crearMundo (fotoGalaxia, abajo) puestas en 2D.
//  · FINAL_UNIVERSO (el último fotograma de ep3-universo = el primero de ep3-borde): la red con celda 45 y origen RED.NODO en
//    (840, 470), y la esfera en c (840, 470), r 330, k 1, borde 1, cristal 1, fuera 0,5, lupa 0,1; un punto ámbar en el
//    centro (la Vía Láctea: nosotros, ver puntoNosotros); la regla en 10²⁷ (como en ENLACE, e 27); Atom en (230, 780).
//  · fotoEnlace(mundo, estadoMundo, camaraPorTierra, { z: 22, via, radio: 27, n }) → { fondo, galaxia: { lienzo, r } }: UNA
//    foto del mundo en 10²² con la galaxia en su sitio: el fondo de ENLACE sin la galaxia (tapada con el color de
//    alrededor) y la galaxia recortada en redondo (la Vía Láctea y, girada, aplastada y ×1,5, Andrómeda). Así se hace
//    ENLACE en ep3-universo (y lo puede hacer igual ep3-andromeda).
//  · fotoGalaxia(mundo, estadoMundo, camaraPorTierra, { radio: 300, n }) → { lienzo, r }: la galaxia de crearMundo sola, a
//    radio px, recortada en redondo con el borde fundido (para ponerla en 2D a cualquier tamaño y giro, también grande).
//    Las dos reciben las funciones de ep03-cosmos.js (este kit no lo importa).
//  · puntoNosotros(g, [x, y], { r: 5, k: 1 }): una cuenta de luz ámbar con su halo (la Vía Láctea encogida hasta un punto).
//
// ================================================================================================ LAS PIEZAS
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposUniverso, uniformesUniverso, goma, hormiga, meta } from '/atomo/plato/kits/ep03-universo.js';
//   const P = await crearPlato({ piezas: ['goma', 'hormiga', 'meta'], tiposExtra: tiposUniverso(), uniformes: uniformesUniverso(), … });
//   P.limpiar(); goma(P, 0, { desde, hasta, alto }); hormiga(P, 1, { pos, escala, paso }); meta(P, 2, { pos, escala }); P.render(n);
// Cada función se llama como P.pieza, entre P.limpiar() y P.render(n), y acepta lo de P.pieza (pos, escala, rot [x, y, z]
// (euler YXZ), sq, toque, huellaFija) más lo suyo. Las piezas miran a +z (de cara a la cámara con rot [0, 0, 0]); su arriba
// es +y. tiposUniverso(nombres?) da los tipos para tiposExtra (todos o solo los nombrados). UNA GOMA POR FOTOGRAMA (sus
// medidas van en un uniforme del kit).
//  · 'goma' · goma(P, i, { desde, hasta, alto: 30, z: 1.5, estira: 0, marcas: 9, color: 'latex' })
//      Una goma elástica de látex: una tira de sección redonda y plana, con los extremos algo más anchos (donde se sujeta),
//      tendida recta de `desde` a `hasta` (px de diseño, en el plano z del plató) y de `alto` px de grueso. estira (0…1):
//      cuánto está estirada: se adelgaza un poco y las marcas (`marcas` puntos de tinta, repartidos a lo largo) se separan
//      solas con la goma y se alargan; para estirarla, aleja `hasta` (o los dos extremos) y sube estira. color: 'latex'
//      (crema tostada) · 'oliva' · 'pizarra'. Devuelve { punto(u): el píxel del canto de arriba a la fracción u (0 en desde,
//      1 en hasta), marca(k): el píxel de la marca k, y: px por unidad }.
//  · 'hormiga' · hormiga(P, i, { pos, escala, paso: 0, rot })
//      Una hormiga de arcilla de perfil, andando hacia +x: cabeza con antenas acodadas y mandíbulas, tórax, pecíolo y
//      abdomen (gáster), y seis patas que van a trípode (paso: la fase, una vuelta = un paso de cada trípode; súbelo con el
//      camino andado). Unidades: mide 1 de la punta del abdomen a la de las mandíbulas (x de −0,46 a 0,52) y pisa en y =
//      −0,3 (los pies). Arcilla casi negra de reflejos rojizos. Devuelve { pies: el punto del mundo de los pies, en medio }.
//  · 'meta' · meta(P, i, { pos, escala, ondea: 0, rot })
//      La meta: un alfiler de latón con una banderita de cuadros (crema y tinta) que ondea (ondea: la fase). Unidades: la
//      punta del alfiler en el origen (se clava donde caiga pos), mide 1 de alto; la bandera, a la derecha (+x), de 0,55.
//
// COSTE (este servidor, 1920 × 1080; con la carga habitual de varias escenas a la vez, el doble o más). El cielo a pantalla
// completa: la red, ~1,5 s (res 0,5: ~0,4 s); con la esfera, ~1,7 s; la niebla sola, ~0,6 s. La goma de 1.300 px, ~0,4 s;
// la hormiga de ~120 px, ~0,3 s; la meta, ~0,2 s.
import * as THREE from 'three';
import { GLSL_REMATES } from '/atomo/plato/kits/plastilina-adulta.js';

const W = 1920, H = 1080;
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const mix = (a, b, x) => a + (b - a) * x;
const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };

// ---------------------------------------------------------------- escalas
export const RED = { K: 4.2, NODO: [0.0672, 0.0422] };
export const ESFERA_M = 4.4e26;
/** px de una celda grande de la red con el mundo en 10^z (×2,3 por salto; 45 px en 10²⁷) */
export const celdaRed = (z) => 45 * Math.pow(10, (27 - z) * 0.36);
/** lo que se ve de la red con el mundo en 10^z */
export const veloRed = (z) => ss(22.3, 23.6, z);
export const ENLACE = {
  z: 22, via: [190, 560], rVia: 27, andromeda: [1430, 183], rAnd: 40, giroAnd: -0.62, aplastaAnd: 0.42,
  luz: 0.9, figuritas: [],
  regla: { e: 22, ya: 0, actual: 22, lupa: 0.5, pos: [1655, 528, 0.4], escala: 1.42, rot: [0, -0.12, 0] }, atomo: [230, 780],
};
{
  const [x0, y0] = ENLACE.via, [x1, y1] = ENLACE.andromeda, L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
  // de Andrómeda a la Vía Láctea (la luz va de Andrómeda hacia nosotros), de borde a borde
  ENLACE.vara = [[x1 - ux * ENLACE.rAnd * 0.75, y1 - uy * ENLACE.rAnd * 0.75], [x0 + ux * ENLACE.rVia * 1.1, y0 + uy * ENLACE.rVia * 1.1]];
  // tres figuritas de pie sobre la vara, entre la Vía Láctea y la luz (a 22, 48 y 74 px del extremo de la vara)
  const [xb, yb] = ENLACE.vara[1];
  ENLACE.figuritas = [[22, 46, 3], [48, 52, 7], [74, 44, 12]].map(([d, alto, semilla]) => ({ x: Math.round(xb + ux * d), y: Math.round(yb + uy * d), alto, semilla }));
}
export const FINAL_UNIVERSO = {
  red: { celda: 45, centro: [840, 470], origen: null, luz: 1, velo: 1 },
  esfera: { c: [840, 470], r: 330, k: 1, borde: 1, cristal: 1, fuera: 0.5, lupa: 0.1, puntos: 1 },
  regla: { e: 27, ya: 0, actual: 27, lupa: 0.5, pos: [1655, 528, 0.4], escala: 1.42, rot: [0, -0.12, 0] }, atomo: [230, 780],
};

// ---------------------------------------------------------------- el cielo (GLSL)
const PRELUDIO = /* glsl */`#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;
vec3 gG; vec3 gEm; float gBri; float gTr;
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
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
uniform vec4 uRed;    // centro (px de diseño, y hacia abajo) · px por unidad de la red · fuerza de la luz propia
uniform vec4 uRedO;   // origen (unidades de la red) · velo · hervor (n)
uniform vec4 uEsf;    // centro (px) · radio (px) · k
uniform vec4 uEsf2;   // borde de niebla · cristal · fuera · lupa
uniform vec4 uEsf3;   // puntos · —
uniform vec4 uNie;    // centro (px) · px por bocanada · luz
uniform vec4 uNie2;   // hueco: centro (px) · radio (px) · borde (px)
uniform vec4 uNie3;   // velo · —
const vec3 LCOL = vec3(1.0, 0.80, 0.60);
const vec3 LDIR = vec3(-0.55, 0.62, 0.56);
const vec3 FCOL = vec3(0.24, 0.31, 0.48);
const vec3 FDIR = vec3(0.78, 0.22, 0.58);
vec2 disenio() { return vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) * (1920.0 / uRes.x); }
vec3 luzArcilla(vec3 alb, vec3 n, float bri) {
  vec3 L = normalize(LDIR), F = normalize(FDIR);
  float dif = max(dot(n, L), 0.0), fil = max(dot(n, F), 0.0);
  vec3 h = normalize(L + vec3(0.0, 0.0, 1.0));
  float esp = pow(max(dot(n, h), 0.0), 24.0) * 0.06 * bri;
  return alb * (LCOL * dif * 1.25 + FCOL * fil * 0.55 + 0.22) + LCOL * esp;
}
// el charco de luz del foco (arriba a la izquierda) sobre la losa: la arcilla no es un negro plano
float charco(vec2 P) { vec2 d = (P - vec2(620.0, 330.0)) / vec2(1500.0, 1150.0); return 0.8 + 0.42 * exp(-dot(d, d) * 2.2); }
vec3 gEmRed;
#ifdef RED
vec3 redEn(vec2 P, float extra) {
  vec2 p = uRedO.xy + vec2(P.x - uRed.x, uRed.y - P.y) / uRed.z;
  vec3 alb = colorRed(p, 1.0);
  gEmRed = gEm;
  // la arcilla hierve: un relieve finísimo que cambia con cada fotograma, y huellas suaves de los dedos
  float hv = vnoise(vec3(P * 0.11, uRedO.w * 1.7)) - 0.5;
  float hu = vnoise(vec3(P * 0.023 + 3.0, 0.5)) - 0.5;
  alb *= 1.0 + 0.25 * hu;
  vec3 n = normalize(vec3(-gG.xy * 3.0 + 0.06 * vec2(hv, -hv) + 0.03 * vec2(hu, hu), 1.0));
  return luzArcilla(alb, n, gBri) * charco(P) + gEm * uRed.w * (1.0 + extra);
}
#endif
#ifdef NIEBLA
vec2 hashN2(vec2 p) { return vec2(hash12(p), hash12(p + 17.31)); }
// una capa de bocanadas: casquetes de esfera en una rejilla con desorden, fundidos con un máximo suave (algodón)
float bocanadas(vec2 q, float sem) {
  vec2 i = floor(q), f = fract(q);
  float s = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y)), id = i + g + sem;
    vec2 o = hashN2(id);
    vec2 c = g + 0.15 + 0.7 * o;
    float r = 0.55 + 0.4 * hash12(id + 3.7);
    vec2 dd = f - c;
    float h2 = r * r - dot(dd, dd);
    float h = 0.3 * hash12(id + 9.1) + sqrt(max(h2, 0.0));
    s += exp(9.0 * h);
  }
  return log(s) / 9.0 - 0.25;
}
// la niebla brillante: bocanadas de arcilla que brilla (q en bocanadas grandes)
vec3 nieblaEn(vec2 q, float n) {
  float h1 = bocanadas(q, 0.0);
  float h2 = bocanadas(q * 2.4 + 5.3, 11.0);
  float h3 = vnoise(vec3(q * 9.0, 1.0 + floor(n) * 0.37));
  float h = max(h1, 0.62 * h2 + 0.35 * h1) + 0.03 * h3;
  vec2 gq = vec2(dFdx(h), dFdy(h)) * uNie.z / (1920.0 / uRes.x);
  vec3 nr = normalize(vec3(-gq * 0.9, 1.0));
  // el color: crema en lo alto de las bocanadas, ámbar en lo hondo, y manchas grandes algo más frías (el fondo cósmico)
  float t = vnoise(vec3(q * 0.45 + 11.0, 3.0)), f = vnoise(vec3(q * 0.8 + 21.0, 6.0));
  float alto = smoothstep(0.1, 1.0, h);
  vec3 c = mix(vec3(0.42, 0.20, 0.07), vec3(0.74, 0.60, 0.42), alto);
  c = mix(c, c * vec3(1.12, 0.88, 0.7), smoothstep(0.35, 0.75, t));
  c = mix(c, vec3(0.40, 0.40, 0.45) * (0.65 + 0.55 * alto), 0.4 * smoothstep(0.6, 0.85, f));
  vec3 col = luzArcilla(c * 0.75, nr, 0.5);
  // brilla por dentro: luz propia, algo más fuerte en lo hondo (como algodón con una luz detrás)
  col += c * (0.3 + 0.45 * (1.0 - alto)) * uNie.w;
  return col;
}
#endif
void main() {
  vec2 P = disenio();
  vec3 col = vec3(0.0);
  float a = 1.0;
#ifdef RED
  a = uRedO.z;
  float extra = 0.0;
  vec2 Pr = P;
#ifdef ESFERA
  float k = uEsf.w;
  vec2 d = (P - uEsf.xy) / uEsf.z;
  float r = length(d);
  float aa = 1.4 / uEsf.z;
  float dentro = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, r);
  // el vidrio aumenta un poco lo de dentro (más en el centro) y lo empuja hacia el borde
  float lupa = uEsf2.w * k * (1.0 - r * r) * dentro;
  Pr = uEsf.xy + (P - uEsf.xy) * (1.0 - lupa);
  extra = 0.6 * k * dentro;
#endif
  col = redEn(Pr, extra);
#ifdef ESFERA
  // dentro, lo observable: más claro y lleno de puntitos-galaxia (más junto a los filamentos); fuera, más oscuro
  col *= mix(1.0 - k * uEsf2.z, 1.0 + 0.25 * k, dentro);
  {
    float cerca = smoothstep(0.004, 0.05, dot(gEmRed, vec3(0.33)));
    vec2 Pg = Pr / 9.0;
    vec2 ci = floor(Pg), fr = fract(Pg) - 0.5;
    vec2 o = vec2(hash12(ci + 3.1), hash12(ci + 7.7)) - 0.5;
    float h = hash12(ci + 11.3);
    float pt = (1.0 - smoothstep(0.07, 0.2, length(fr - o * 0.55))) * step(0.9 - 0.5 * cerca, h);
    vec3 cg = mix(vec3(0.9, 0.76, 0.55), vec3(0.66, 0.74, 0.9), hash12(ci + 5.0));
    col += cg * pt * 0.4 * k * dentro * uEsf3.x * (0.35 + 0.65 * cerca);
  }
  // la niebla brillante en el borde interior: el límite de lo que se ve (bocanadas pequeñas, que brillan)
  float banda = smoothstep(0.7, 0.995, r) * dentro;
  if (uEsf2.x > 0.001) {
    float vb = vnoise(vec3(d * 7.0, 1.0)) * 0.5 + vnoise(vec3(d * 17.0, 2.0)) * 0.32 + vnoise(vec3(d * 40.0, 3.0)) * 0.18;
    vec3 nb = mix(vec3(0.66, 0.40, 0.17), vec3(0.95, 0.80, 0.58), smoothstep(0.3, 0.8, vb));
    float bk = pow(banda, 1.4) * smoothstep(0.15, 0.7, vb + 0.4 * banda) * uEsf2.x * k;
    col = mix(col, nb, 0.4 * bk) + nb * 0.5 * bk;
  }
  // el cristal: un velo de vidrio, una franja oscura justo dentro del filo (el grueso del vidrio), el filo de luz, el
  // reflejo del foco (una media luna fina arriba a la izquierda y un brillo pequeño y nítido) y un halo cálido fuera
  float cr = uEsf2.y * k;
  col = mix(col, col * 0.9 + vec3(0.03, 0.035, 0.045), 0.5 * cr * dentro);
  float grueso = exp(-pow((r - 0.975) * uEsf.z / 4.0, 2.0)) * dentro;
  col *= 1.0 - 0.25 * grueso * cr;
  float filo = exp(-pow((r - 0.996) * uEsf.z / 1.5, 2.0));
  col += vec3(1.0, 0.88, 0.68) * filo * 0.55 * cr;
  float sombraFilo = exp(-pow((r - 1.012) * uEsf.z / 2.5, 2.0)) * (1.0 - dentro);
  col *= 1.0 - 0.35 * sombraFilo * cr;
  float ang = atan(d.y, d.x);
  // media luna: un arco fino de luz a ~0,9 del radio, entre las 10 y las 11 (y hacia abajo en la pantalla es +y)
  float arco = exp(-pow((r - 0.9) * uEsf.z / 5.0, 2.0)) * smoothstep(0.7, 0.0, abs(ang + 2.2)) * dentro;
  col += vec3(1.0, 0.94, 0.82) * arco * 0.42 * cr;
  vec2 hd = (d - vec2(-0.5, -0.56)) * vec2(1.0, 1.6);
  float pin = exp(-dot(hd, hd) * uEsf.z * uEsf.z / 90.0);
  col += vec3(1.0, 0.97, 0.9) * pin * 0.8 * cr;
  float arco2 = exp(-pow((r - 0.93) * uEsf.z / 4.0, 2.0)) * smoothstep(0.5, 0.0, abs(ang - 0.95)) * dentro;
  col += vec3(0.7, 0.78, 0.92) * arco2 * 0.12 * cr;
  float halo = exp(-max(r - 1.0, 0.0) * 9.0) * (1.0 - dentro);
  col += vec3(0.62, 0.42, 0.22) * halo * 0.07 * cr;
  a = max(a, k * dentro);
#endif
#endif
#ifdef NIEBLA
  {
    vec2 q = (P - uNie.xy) / uNie.z;
    vec3 nb = nieblaEn(q, uRedO.w);
    // el hueco que se abre: un círculo de borde rasgado (las bocanadas se apartan)
    float an = 1.0;
    if (uNie2.z > 0.5) {
      float dh = length(P - uNie2.xy);
      float rasga = (bocanadas(q * 1.7 + 2.0, 31.0) - 0.6) * uNie2.w * 1.4;
      an = smoothstep(uNie2.z - uNie2.w * 0.5, uNie2.z + uNie2.w * 0.5, dh + rasga);
    }
    float v = uNie3.x * an;
#ifdef RED
    col = mix(col, nb, v);
    a = max(a, v);
#else
    col = nb; a = v;
#endif
  }
#endif
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));
  fragColor = vec4(col * a, a);
}
`;
// para buscar nudos: el valor de los cúmulos de la red en una rejilla
const GLSL_NODOS = /* glsl */`
uniform vec4 uMalla;   // origen (unidades de la red) · paso · —
void main() {
  vec2 p = uMalla.xy + (gl_FragCoord.xy - 0.5) * uMalla.z;
  vec2 r = redR(p);
  fragColor = vec4(r.y, r.x, 0.0, 1.0);
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

/** El cielo del universo (la red, la esfera y la niebla) en un lienzo WebGL propio de 1920 × 1080. */
export function crearCielo() {
  const lienzo = document.createElement('canvas');
  lienzo.width = W; lienzo.height = H;
  const gl = lienzo.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true, premultipliedAlpha: true, alpha: true, depth: false });
  const programas = {};
  const prog = (defs) => {
    if (programas[defs]) return programas[defs];
    const frag = PRELUDIO + defs.split(',').filter(Boolean).map((d) => `#define ${d} 1\n`).join('') + GLSL_REMATES + GLSL_CIELO;
    const p = gl.createProgram();
    gl.attachShader(p, compilar(gl, gl.VERTEX_SHADER, VERT)); gl.attachShader(p, compilar(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const inf = gl.getActiveUniform(p, i); u[inf.name] = gl.getUniformLocation(p, inf.name); }
    return (programas[defs] = { p, u });
  };
  const vao = gl.createVertexArray();
  const px = new Uint8Array(4);
  const f = (pr, nombre, ...v) => { const l = pr.u[nombre]; if (l != null) gl[`uniform${v.length}f`](l, ...v); };
  function dibujar(est = {}) {
    const res = cl(est.res ?? 1, 0.1, 1);
    const bw = Math.round(W * res), bh = Math.round(H * res);
    if (lienzo.width !== bw || lienzo.height !== bh) { lienzo.width = bw; lienzo.height = bh; }
    const defs = [est.red && 'RED', est.red && est.esfera && 'ESFERA', est.niebla && 'NIEBLA'].filter(Boolean).join(',');
    gl.bindVertexArray(vao);
    gl.viewport(0, 0, bw, bh);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    if (!defs) return lienzo;
    const pr = prog(defs);
    gl.useProgram(pr.p);
    f(pr, 'uRes', bw, bh);
    const r = est.red ?? {};
    const c = r.centro ?? [960, 540], o = r.origen ?? RED.NODO;
    f(pr, 'uRed', c[0], c[1], (r.celda ?? 45) * RED.K, r.luz ?? 1);
    f(pr, 'uRedO', o[0], o[1], cl(r.velo ?? 1), est.n ?? 0);
    const e = est.esfera;
    if (e) {
      f(pr, 'uEsf', e.c[0], e.c[1], e.r, cl(e.k ?? 1));
      f(pr, 'uEsf2', e.borde ?? 1, e.cristal ?? 1, e.fuera ?? 0.5, e.lupa ?? 0.1);
      f(pr, 'uEsf3', e.puntos ?? 1, 0, 0, 0);
    }
    const nb = est.niebla;
    if (nb) {
      const cn = nb.centro ?? [960, 540], ca = nb.cAbre ?? [960, 540];
      f(pr, 'uNie', cn[0], cn[1], nb.escala ?? 260, nb.luz ?? 1);
      f(pr, 'uNie2', ca[0], ca[1], Math.max(0, nb.abre ?? 0), nb.borde ?? 90);
      f(pr, 'uNie3', cl(nb.velo ?? 1), 0, 0, 0);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return lienzo;
  }
  function foto(est) {
    dibujar(est);
    const k = document.createElement('canvas'); k.width = lienzo.width; k.height = lienzo.height;
    k.getContext('2d').drawImage(lienzo, 0, 0);
    return k;
  }
  // el cúmulo más brillante cerca de `origen` (unidades de la red), en un cuadrado de lado 2·cerca
  function nodo(origen = [0, 0], cerca = 0.12) {
    const N = 96, paso = (2 * cerca) / N;
    const pr = (() => {
      if (programas.__nodos) return programas.__nodos;
      const p = gl.createProgram();
      gl.attachShader(p, compilar(gl, gl.VERTEX_SHADER, VERT)); gl.attachShader(p, compilar(gl, gl.FRAGMENT_SHADER, PRELUDIO + GLSL_REMATES + GLSL_NODOS));
      gl.linkProgram(p);
      return (programas.__nodos = { p, u: { uMalla: gl.getUniformLocation(p, 'uMalla') } });
    })();
    const ww = lienzo.width, hh = lienzo.height;
    gl.bindVertexArray(vao); gl.viewport(0, 0, N, N); gl.useProgram(pr.p);
    gl.uniform4f(pr.u.uMalla, origen[0] - cerca, origen[1] - cerca, paso, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const d = new Uint8Array(N * N * 4);
    gl.readPixels(0, 0, N, N, gl.RGBA, gl.UNSIGNED_BYTE, d);
    let mejor = -1, bi = 0;
    for (let i = 0; i < N * N; i++) {
      const x = i % N, y = Math.floor(i / N);
      const dc = Math.hypot(x - N / 2, y - N / 2) / (N / 2);
      const v = d[i * 4] - 40 * dc;
      if (v > mejor) { mejor = v; bi = i; }
    }
    gl.viewport(0, 0, ww, hh);
    const x = bi % N, y = Math.floor(bi / N);
    return [origen[0] - cerca + (x + 0.5) * paso, origen[1] - cerca + (y + 0.5) * paso];
  }
  return { lienzo, gl, dibujar, foto, nodo };
}

// ---------------------------------------------------------------- 2D: la galaxia en una foto y «nosotros»
/** La galaxia de crearMundo sola, a `radio` px, recortada en redondo con el borde fundido (ver la cabecera). */
export function fotoGalaxia(mundo, estadoMundo, camaraPorTierra, { radio = 300, n = 0 } = {}) {
  const R_GAL = 5e20;
  const z = Math.log10((R_GAL / radio) * 540);
  const C = camaraPorTierra(z, [960, 540], z);
  mundo.dibujar(estadoMundo(C, n, { luna: 0, capas: { uGal: [960, 540, radio, 1], uSol: [0, 0, 1, 0], uSis: [0, 0, 1, 0], uVec: [0, 0, 1, 0], uAqui: [0, 0, 0, 0] } }));
  const k = mundo.lienzo.width / W, L = Math.round(radio * 2.3);
  const c = document.createElement('canvas'); c.width = c.height = L;
  const x = c.getContext('2d');
  x.drawImage(mundo.lienzo, (960 - L / 2) * k, (540 - L / 2) * k, L * k, L * k, 0, 0, L, L);
  x.globalCompositeOperation = 'destination-in';
  const h = x.createRadialGradient(L / 2, L / 2, radio * 0.78, L / 2, L / 2, L / 2);
  h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = h; x.fillRect(0, 0, L, L);
  return { lienzo: c, r: radio };
}
/**
 * El fondo de ENLACE en una sola foto del mundo: el mundo de crearMundo en 10^z con la galaxia en `via` a `radio` px por
 * radio de galaxia; devuelve { fondo: el lienzo sin la galaxia (tapada con el color de alrededor), galaxia: { lienzo, r }
 * (la galaxia recortada en redondo, para ponerla en 2D: la Vía Láctea y, girada, aplastada y algo mayor, Andrómeda) }.
 */
export function fotoEnlace(mundo, estadoMundo, camaraPorTierra, { z = ENLACE.z, via = ENLACE.via, radio = ENLACE.rVia, n = 0 } = {}) {
  const C = camaraPorTierra(z, via, z);
  mundo.dibujar(estadoMundo(C, n, { luna: 0, capas: { uGal: [via[0], via[1], radio, 1], uSol: [0, 0, 1, 0], uSis: [0, 0, 1, 0], uVec: [0, 0, 1, 0], uAqui: [0, 0, 0, 0] } }));
  const k = mundo.lienzo.width / W;
  const fondo = document.createElement('canvas'); fondo.width = mundo.lienzo.width; fondo.height = mundo.lienzo.height;
  const f = fondo.getContext('2d'); f.drawImage(mundo.lienzo, 0, 0);
  const L = Math.round(radio * 2.6);
  const gal = document.createElement('canvas'); gal.width = gal.height = Math.round(L * k);
  const x = gal.getContext('2d');
  x.drawImage(mundo.lienzo, (via[0] - L / 2) * k, (via[1] - L / 2) * k, L * k, L * k, 0, 0, gal.width, gal.height);
  x.globalCompositeOperation = 'destination-in';
  const h = x.createRadialGradient(gal.width / 2, gal.height / 2, radio * 0.82 * k, gal.width / 2, gal.height / 2, gal.width / 2);
  h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = h; x.fillRect(0, 0, gal.width, gal.height);
  // el fondo sin la galaxia: un disco blando del color medio de un anillo alrededor
  const R0 = radio * 1.35, R1 = radio * 1.9;
  const d = f.getImageData(Math.max(0, (via[0] - R1) * k) | 0, Math.max(0, (via[1] - R1) * k) | 0, Math.ceil(2 * R1 * k), Math.ceil(2 * R1 * k)).data;
  let sr = 0, sg = 0, sb = 0, cnt = 0;
  const lado = Math.ceil(2 * R1 * k);
  for (let yy = 0; yy < lado; yy++) for (let xx = 0; xx < lado; xx++) {
    const rr = Math.hypot(xx - lado / 2, yy - lado / 2) / k;
    if (rr < R0 || rr > R1) continue;
    const o = (yy * lado + xx) * 4; sr += d[o]; sg += d[o + 1]; sb += d[o + 2]; cnt++;
  }
  const c = cnt ? [sr / cnt, sg / cnt, sb / cnt].map(Math.round) : [28, 26, 26];
  f.setTransform(k, 0, 0, k, 0, 0);
  const t = f.createRadialGradient(via[0], via[1], radio * 0.9, via[0], via[1], R0 * 1.1);
  t.addColorStop(0, `rgba(${c},1)`); t.addColorStop(1, `rgba(${c},0)`);
  f.fillStyle = t; f.beginPath(); f.arc(via[0], via[1], R0 * 1.1, 0, 2 * Math.PI); f.fill();
  return { fondo, galaxia: { lienzo: gal, r: radio * k } };
}
/** Una cuenta de luz ámbar con su halo: la Vía Láctea encogida hasta un punto (nosotros). */
export function puntoNosotros(g, [x, y], { r = 5, k = 1 } = {}) {
  if (k <= 0.002) return;
  g.save();
  g.globalCompositeOperation = 'screen';
  const R = r * 5.5;
  let h = g.createRadialGradient(x, y, 0, x, y, R);
  h.addColorStop(0, `rgba(255,214,150,${0.75 * k})`); h.addColorStop(0.25, `rgba(240,160,80,${0.35 * k})`); h.addColorStop(1, 'rgba(220,130,60,0)');
  g.fillStyle = h; g.beginPath(); g.arc(x, y, R, 0, 2 * Math.PI); g.fill();
  g.globalCompositeOperation = 'source-over';
  h = g.createRadialGradient(x - r * 0.25, y - r * 0.3, 0, x, y, r);
  h.addColorStop(0, `rgba(255,240,205,${k})`); h.addColorStop(0.7, `rgba(236,160,78,${k})`); h.addColorStop(1, `rgba(190,110,45,${0.9 * k})`);
  g.fillStyle = h; g.beginPath(); g.arc(x, y, r, 0, 2 * Math.PI); g.fill();
  g.restore();
}

// ================================================================================================ LAS PIEZAS (GLSL)
const GLSL_UNI = /* glsl */`
#ifndef UNIVERSO_COMUN
#define UNIVERSO_COMUN 1
uniform vec4 uGoma;   // semialto (relativo al semilargo) · estira (0…1) · marcas · color
#endif
`;
const GLSL_GOMA = GLSL_UNI + /* glsl */`
// la goma: x de −1 a 1 (el largo), semialto uGoma.x; sección de píldora, extremos algo más anchos
float gomaA() { return uGoma.x * (1.0 - 0.22 * uGoma.y); }
float pz_goma(vec3 q, vec4 T, out float m) {
  float a = gomaA();
  float ex = smoothstep(1.0 - 3.0 * uGoma.x, 1.0, abs(q.x));
  float ah = a * (1.0 + 0.3 * ex);
  float d = sdRoundBox(q, vec3(1.0, ah, 0.5 * a), 0.48 * a);
  d += 0.06 * a * (vnoise(vec3(q.x / a * 0.35, q.y / a * 1.5, q.z / a * 1.5) + uBoil) - 0.5);
  m = 0.0;
  return d;
}
float pzc_goma(vec3 q, vec4 T) { float a = gomaA(); return sdRoundBox(q, vec3(0.99, a * 0.9, 0.42 * a), 0.4 * a); }
vec3 pzcol_goma(vec3 q, vec4 T, float m) {
  float a = gomaA();
  vec3 c = uGoma.w < 0.5 ? vec3(0.30, 0.15, 0.055) : uGoma.w < 1.5 ? vec3(0.13, 0.14, 0.06) : vec3(0.07, 0.08, 0.10);
  c *= 0.9 + 0.16 * vnoise(q * vec3(40.0, 120.0, 120.0));
  // las marcas: puntos de tinta repartidos a lo largo (se separan y se alargan al estirar)
  float N = max(uGoma.z, 1.0);
  float u = (q.x + 1.0) * 0.5 * N;
  float iu = floor(u);
  vec2 dm = vec2((u - iu - 0.5) * 2.0 / N / (a * (1.0 + 1.1 * uGoma.y)), q.y / (a * (1.0 - 0.15 * uGoma.y)));
  float punto = 1.0 - smoothstep(0.42, 0.52, length(dm));
  if (q.z > 0.0 && iu >= 0.0 && iu < N) c = mix(c, vec3(0.6, 0.53, 0.4), punto);
  gBri = 2.2; gTr = 0.6;
  return c;
}
`;
const GLSL_HORMIGA = /* glsl */`
// la hormiga de perfil (+x la cabeza), pies en y = −0,3; T.y: la fase del paso (una vuelta = 1)
float hoPata(vec3 q, vec3 cad, vec3 rod, vec3 pie, float r) {
  return min(capsulaC(q, cad, rod, r * 1.2, r), capsulaC(q, rod, pie, r, r * 0.55));
}
float pz_hormiga(vec3 q, vec4 T, out float m) {
  float ph = T.y * 6.2832;
  // cuerpo: cabeza, tórax, pecíolo y gáster
  float cab = elipsoideP(q - vec3(0.37, 0.06, 0.0), vec3(0.09, 0.08, 0.075));
  float tor = elipsoideP(q - vec3(0.16, 0.03, 0.0), vec3(0.14, 0.055, 0.052));
  tor = smin(tor, elipsoideP(q - vec3(0.22, 0.06, 0.0), vec3(0.065, 0.045, 0.045)), 0.03);
  float pec = length(q - vec3(-0.01, 0.045, 0.0)) - 0.034;
  float gas = elipsoideP(q - vec3(-0.22, 0.09, 0.0), vec3(0.19, 0.125, 0.115));
  float d = smin(smin(cab, tor, 0.03), smin(pec, gas, 0.025), 0.025);
  d = smin(d, capsulaC(q, vec3(0.06, 0.03, 0.0), vec3(-0.04, 0.05, 0.0), 0.026, 0.026), 0.02);
  m = 0.0;
  // mandíbulas
  for (int s = -1; s <= 1; s += 2) {
    float z = 0.032 * float(s);
    d = smin(d, capsulaC(q, vec3(0.43, 0.01, z), vec3(0.5, -0.02, z * 0.4), 0.016, 0.007), 0.01);
  }
  // antenas acodadas (escapo hacia arriba y adelante, funículo hacia delante y abajo); se mecen con el paso
  for (int s = -1; s <= 1; s += 2) {
    float z = 0.04 * float(s), sw = 0.02 * sin(ph + float(s));
    vec3 a0 = vec3(0.42, 0.11, z), a1 = vec3(0.45, 0.27 + sw, z * 1.6), a2 = vec3(0.59 + sw, 0.19, z * 2.2);
    float an = min(capsulaC(q, a0, a1, 0.011, 0.009), capsulaC(q, a1, a2, 0.009, 0.012));
    if (an < d) m = 1.0;
    d = smin(d, an, 0.006);
  }
  // seis patas a trípode, finas y acodadas: el fémur sube hacia fuera hasta la rodilla (alta) y la tibia baja hasta el
  // pie, por delante (las de delante), debajo (las de en medio) o por detrás (las de atrás)
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float x0 = 0.23 - 0.07 * fk;
    float rx = 0.33 - 0.15 * fk - 0.04 * fk * fk;
    float px = 0.44 - 0.26 * fk - 0.06 * fk * fk;
    for (int s = -1; s <= 1; s += 2) {
      float grupo = mod(fk + (s > 0 ? 1.0 : 0.0), 2.0);
      float f = ph + grupo * 3.14159;
      float pasoX = 0.07 * sin(f);
      float alza = 0.05 * max(0.0, cos(f));
      vec3 cad = vec3(x0, -0.01, 0.03 * float(s));
      vec3 pie = vec3(px + pasoX, -0.3 + alza, 0.19 * float(s));
      vec3 rod = vec3(rx + 0.6 * pasoX, 0.07 + 0.6 * alza, 0.13 * float(s));
      float pa = min(capsulaC(q, cad, rod, 0.017, 0.013), capsulaC(q, rod, pie, 0.012, 0.006));
      if (pa < d) m = 1.0;
      d = smin(d, pa, 0.008);
    }
  }
  // ojos
  for (int s = -1; s <= 1; s += 2) {
    float o = length(q - vec3(0.4, 0.09, 0.065 * float(s))) - 0.024;
    if (o < d + 0.004) m = 2.0;
    d = smin(d, o, 0.006);
  }
  return d * 0.9;
}
float pzc_hormiga(vec3 q, vec4 T) {
  return min(elipsoideP(q - vec3(-0.22, 0.09, 0.0), vec3(0.17, 0.11, 0.1)), elipsoideP(q - vec3(0.25, 0.04, 0.0), vec3(0.2, 0.05, 0.05)));
}
vec3 pzcol_hormiga(vec3 q, vec4 T, float m) {
  // casi negra, con el tórax y las patas de un pardo rojizo oscuro; en el gáster, los bordes de los segmentos algo más
  // claros
  vec3 c = vec3(0.016, 0.010, 0.008) * (0.85 + 0.3 * vnoise(q * 30.0));
  if (q.x > 0.04 && q.x < 0.3) c = vec3(0.05, 0.02, 0.011);
  if (q.x < -0.05) c *= 1.0 + 1.2 * smoothstep(0.85, 0.98, sin((q.x + 0.22) * 40.0) * 0.5 + 0.5);
  if (m > 0.5 && m < 1.5) c = vec3(0.045, 0.022, 0.012);
  if (m > 1.5) { gBri = 4.0; return vec3(0.01, 0.008, 0.008); }
  gBri = 3.0;
  return c;
}
`;
const GLSL_META = /* glsl */`
// la meta: un alfiler de latón (punta en el origen, cabeza en y = 1) con una banderita de cuadros a +x; T.y: la fase
float metaOnda(vec3 q, float ph) { return 0.035 * sin(q.x * 11.0 - ph) * smoothstep(0.0, 0.25, q.x); }
float pz_meta(vec3 q, vec4 T, out float m) {
  float ph = T.y * 6.2832;
  float alf = capsulaC(q, vec3(0.0, 0.0, 0.0), vec3(0.0, 0.98, 0.0), 0.012, 0.03);
  float cab = length(q - vec3(0.0, 1.0, 0.0)) - 0.065;
  m = cab < alf ? 1.0 : 0.0;
  float d = smin(alf, cab, 0.02);
  // la bandera: un paño fino que ondea (de x 0,02 a 0,57, y 0,58 a 0,95)
  vec3 b = q - vec3(0.295, 0.765, 0.0);
  b.z -= metaOnda(q, ph);
  b.y += 0.025 * sin(q.x * 6.0 - ph) * q.x;
  float pa = sdRoundBox(b, vec3(0.27, 0.175, 0.006), 0.008);
  if (pa < d) m = 2.0;
  d = min(d, pa);
  return d * 0.85;
}
float pzc_meta(vec3 q, vec4 T) { return min(capsulaC(q, vec3(0.0, 0.05, 0.0), vec3(0.0, 0.95, 0.0), 0.01, 0.02), sdRoundBox(q - vec3(0.295, 0.765, 0.0), vec3(0.25, 0.16, 0.004), 0.004)); }
vec3 pzcol_meta(vec3 q, vec4 T, float m) {
  if (m < 1.5) { gBri = 3.0; return C_BRASS * (0.9 + 0.2 * vnoise(q * 30.0)); }
  // cuadros de 5 × 3
  vec2 u = vec2((q.x - 0.02) / 0.55 * 5.0, (q.y - 0.59) / 0.35 * 3.0);
  float cuadro = mod(floor(u.x) + floor(u.y), 2.0);
  vec3 c = mix(vec3(0.56, 0.50, 0.38), vec3(0.03, 0.025, 0.022), cuadro);
  gBri = 0.8;
  return c * (0.9 + 0.15 * vnoise(q * 50.0));
}
`;
const TIPOS = {
  goma: { radio: 1.08, glifos: [], glsl: GLSL_GOMA },
  hormiga: { radio: 0.75, glifos: [], glsl: GLSL_HORMIGA },
  meta: { radio: 1.08, glifos: [], glsl: GLSL_META },
};
export function tiposUniverso(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-universo: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
  return o;
}
export function uniformesUniverso() {
  return { uGoma: { value: new THREE.Vector4(0.05, 0, 9, 0) } };
}

// ---------------------------------------------------------------- funciones de pieza
const base = (o) => ({ pos: o.pos ?? [0, 0, 0], escala: o.escala ?? 1, rot: o.rot ?? [0, 0, 0], sq: o.sq ?? [1, 1, 1], toque: o.toque ?? false, huellaFija: o.huellaFija ?? null });
function mundoPieza(o, l) {
  const v = new THREE.Vector3(l[0] * (o.sq?.[0] ?? 1), l[1] * (o.sq?.[1] ?? 1), l[2] * (o.sq?.[2] ?? 1)).multiplyScalar(o.escala ?? 1)
    .applyEuler(new THREE.Euler(...(o.rot ?? [0, 0, 0]), 'YXZ'));
  const p = o.pos ?? [0, 0, 0];
  return [p[0] + v.x, p[1] + v.y, p[2] + v.z];
}
export const COLOR_GOMA = { latex: 0, oliva: 1, pizarra: 2 };
export function goma(P, i, { desde, hasta, alto = 30, z = 1.5, estira = 0, marcas = 9, color = 'latex', toque = false, huellaFija = null } = {}) {
  if (!P.U.uGoma) throw new Error('ep03-universo: crea el plató con uniformes: uniformesUniverso()');
  const mid = [(desde[0] + hasta[0]) / 2, (desde[1] + hasta[1]) / 2];
  const L = Math.hypot(hasta[0] - desde[0], hasta[1] - desde[1]) / 2;
  const pos = P.punto(mid[0], mid[1], z);
  const a = P.proyectar(pos), b = P.proyectar([pos[0] + 1, pos[1], pos[2]]);
  const pxU = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ang = Math.atan2(-(hasta[1] - desde[1]), hasta[0] - desde[0]);
  P.U.uGoma.value.set(cl((alto / 2) / L, 0.002, 0.5), cl(estira), Math.max(1, Math.round(marcas)), COLOR_GOMA[color] ?? 0);
  P.pieza(i, { pos, escala: L / pxU, rot: [0, 0, ang], toque, huellaFija });
  const ux = (hasta[0] - desde[0]) / (2 * L), uy = (hasta[1] - desde[1]) / (2 * L);
  const semi = (alto / 2) * (1 - 0.22 * cl(estira));
  const punto = (u) => [mix(desde[0], hasta[0], u) + uy * semi, mix(desde[1], hasta[1], u) - ux * semi];
  return { punto, marca: (k) => { const u = (k + 0.5) / Math.max(1, Math.round(marcas)); return [mix(desde[0], hasta[0], u), mix(desde[1], hasta[1], u)]; }, pxU, semialto: semi };
}
export function hormiga(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.paso ?? 0 });
  return { pies: mundoPieza(b, [0.05, -0.3, 0]) };
}
export function meta(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.ondea ?? 0 });
  return { cabeza: mundoPieza(b, [0, 1, 0]), bandera: mundoPieza(b, [0.3, 0.77, 0]) };
}
