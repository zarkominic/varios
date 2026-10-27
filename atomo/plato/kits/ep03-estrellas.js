// KIT DEL EPISODIO 3 · «ESTRELLAS» (kits/ep03-estrellas.js). Lo crea ep3-sol y, una vez entregado con su hoja de prueba
// (escenas/ep03-estrellas-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que
// lo usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta (una pieza propia con tiposExtra, o 2D
// encima) y lo dice en su informe.
// Lo usan: ep3-sol (lo crea), ep3-vuelta, ep3-neutrones y ep3-despedida.
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra y uniformes), con el mismo
// material, la misma luz y la misma paleta, una función por pieza que la coloca y le pasa sus parámetros, y unas pocas
// ayudas 2D (resplandores y destellos) para componer encima de las fotos:
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposEstrellas, uniformesEstrellas, sol, nucleo, ... } from '/atomo/plato/kits/ep03-estrellas.js';
//   const P = await crearPlato({ piezas: ['sol', 'nucleo', ...], tiposExtra: tiposEstrellas(['sol', 'nucleo']),
//                                uniformes: uniformesEstrellas(), ... });
//   function dibujar(t) { ...; P.limpiar(); sol(P, 0, { pos, escala, corte: 1, calor: 0.8 }); P.render(n); }
//
// tiposEstrellas(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados: así se compila menos).
// uniformesEstrellas() da los uniformes del kit para crearPlato({ uniformes }) (júntalos con los de otros kits:
// { ...uniformesEstrellas(), ...uniformesTiempo() }). Los parámetros del Sol, de la estrella gigante y del montón van en
// esos uniformes: UN SOL, UNA GIGANTE Y UN MONTÓN POR FOTOGRAMA (para dos, dos fotos). Cada función de pieza se llama como
// P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de P.pieza (pos, escala,
// rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los puntos del mundo que hacen falta para poner
// cosas encima. Lo que se anima son sus parámetros (y pos, escala, rot). Unidades locales: las de cada pieza (abajo).
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'sol' · sol(P, i, { corte: 0, calor: 0, aprieta: 0, giro })
//      El Sol de arcilla con el aspecto del de crearMundo (plastilina-cosmos-adulta.js): ámbar y naranja con granulación
//      fina en celdillas (la misma fórmula, el mismo ruido), el limbo oscuro y las dos manchas en el mismo sitio; esfera de
//      radio 1. Sin rot ni corte, de frente, es el disco del mundo: centro, radio y manchas coinciden (para cortar desde la
//      foto del mundo, ver solComoMundo). El resplandor de alrededor va en 2D: halo(g, x, y, R, k, 'sol').
//      corte (0…1): se quita un OCTANTE (el de +x, +y, +z: una cuña de 0° a 90° alrededor del eje y, por encima de y = 0,
//      que se abre como un gajo) y deja ver el interior en tres caras: el NÚCLEO (una bola de radio 0,30, entera, que
//      asoma en la esquina), la zona RADIATIVA (0,28 a 0,71, capas de arcilla naranja en anillos finos, más claras hacia
//      dentro) y la de CONVECCIÓN (0,71 a 1, celdas de arcilla oscura con surcos entre ellas), en terrazas (cada zona algo
//      más alta que la de dentro) y con una costura oscura entre ellas. Mientras se abre, la esfera gira para enseñar el
//      octante: rot = rot (si se da) + giro × SOL_GIRO (giro, por defecto = corte; SOL_GIRO = [0,52, −0,5, 0]: el octante
//      queda de cara a la cámara, algo a la derecha y desde algo arriba). calor (0…1): el núcleo pasa de naranja a rojo
//      blanco y su luz tiñe la parte de dentro de la zona radiativa (brilloNucleo lo remata en 2D). aprieta (0…1): el
//      núcleo se encoge un 16 % y los anillos de la zona radiativa se aprietan hacia el centro (el peso que aprieta).
//      Devuelve { centro, radio (mundo), local(x, y, z) → mundo (unidades del Sol), cara(k, a, r) → punto del mundo en la
//      cara k del corte (0: el plano x = 0; 1: el que se abre, z = 0 con el corte entero; 2: el suelo, y = 0), a un ángulo
//      a (0…π/2, dentro del cuarto de disco) y a r radios del centro, borde(ang) → píxel del borde del disco }.
//      ep3-sol hace con cara() la máscara de las tres caras en pantalla (por donde rebota la luz). Coste: el Sol vivo de
//      750 px, con Atom, ~0,35–0,6 s por fotograma.
//  · 'nucleo' · nucleo(P, i, { helio: false, calor: 0 })
//      El núcleo de Atom sin órbitas (hidrógeno): las mismas ocho bolitas de terracota y crema en racimo, del mismo tamaño
//      relativo (racimo de radio ~0,62; con la escala de Atom, A_ESC, es su núcleo). helio: el núcleo que sale de la
//      fusión, doce bolitas en un racimo mayor (radio ~0,72). calor (0…1): brilla por dentro (ámbar). Se aplasta y se ladea
//      con sq y rot (la resignación es un gesto: sq [1,15, 0,7, 1,15] y rot z ±0,35).
//  · 'estrellas' · estrellas(P, i, { semilla: 1, celda: 0,09, tamano: 0,16, densidad: 0,55, hueco: null, profundidad: 0,24, trozo })
//      El montón de estrellas de arcilla: una sola pieza con repetición. Cuentas de arcilla con luz propia (blancas, crema,
//      ámbar y rojizas; unas pocas grandes y muchas pequeñas) repartidas en una losa de x −1…1, y −0,5625…0,5625 (16:9) y
//      z ±profundidad/2, una por celda (como mucho) de lado `celda`, con probabilidad `densidad` y radio hasta
//      tamano × celda. hueco: { x, y, r } (local) sin estrellas (donde va el Sol). semilla cambia el reparto. trozo:
//      [x0, x1, y0, y1] (local): solo se dibuja ese trozo de la losa (para repartir una foto cara en varios fotogramas).
//      Sin sombra (solo luz propia). Coste: la losa entera llenando la pantalla, ~2–4 s; media losa, la mitad (es para
//      fotos).
//  · 'gigante' · gigante(P, i, { apaga: 0, corte: 0, hunde: 0, giro })
//      La estrella mucho mayor y rojiza (una supergigante): esfera de radio 1, arcilla roja y naranja con celdas de
//      convección enormes (unas seis de lado a lado) separadas por surcos oscuros, el limbo muy oscuro y la piel con bultos
//      grandes. apaga (0…1): se enfría y se apaga (el naranja pasa a rojo oscuro, los surcos se ensanchan, la luz propia
//      baja a un cuarto); el resplandor 2D, halo(..., 'gigante') con k = 1 − 0,7·apaga. corte (0…1): la misma cuña del
//      Sol (el octante, que gira con giro × SOL_GIRO), con las capas de cebolla de una estrella vieja: envoltura de
//      hidrógeno (roja), helio
//      (naranja), carbono (ámbar), oxígeno (crema), silicio (gris azulado) y el núcleo de hierro (una bola gris oscura y al
//      rojo, radio 0,2). hunde (0…1): el centro se hunde de golpe: las capas de dentro (radio < 0,5) caen hacia el centro
//      (en hunde 1 ocupan la mitad) y el núcleo se encoge hasta una bola apretada de radio 0,075 hecha de las mismas
//      bolitas grises de la estrella de neutrones (en hunde 1 es esa pieza, a escala), con un brillo azulado en el
//      momento del colapso (máximo en hunde ≈ 0,5). Devuelve { centro, radio, local, cara, borde, nucleo: centro de la
//      bola del centro (mundo), radioNucleo (mundo) }.
//  · 'particula' · particula(P, i, { tipo: 'electron'|'proton'|'neutron', mezcla: 0 })
//      Partículas del colapso, bolitas de arcilla: electrón (azul, radio 0,45, con luz propia azulada), protón (rojo,
//      radio 1) y neutrón (gris, radio 1). mezcla (0…1, en el protón): pasa a neutrón (el electrón que entra en el protón
//      se lo lleva, ep3-vuelta). Cada partícula es una pieza (ep3-vuelta: 6 a la vez como mucho).
//  · 'neutrones' · neutrones(P, i, { brillo: 0,5 })
//      La estrella de neutrones: una bola apretada, sin huecos, de bolitas grises (neutrones) que se tocan, de radio 1;
//      brillo (0…1): un filo de luz fría azulada. Es la bola del centro de la gigante en hunde 1 (con escala × 0,075).
//
// AYUDAS 2D (g: contexto 2D con la transformación de 1920 × 1080; respetan la transformación de g)
//  · halo(g, x, y, R, k = 1, tipo = 'sol'|'gigante'|'neutrones'|'nucleo') — el resplandor alrededor de una estrella de
//    radio R px (el del Sol imita el de crearMundo: ámbar cerca del borde y otro más ancho y tenue). Va DEBAJO de la foto
//    de la pieza (dibuja también por dentro del disco, y la pieza lo tapa) o encima con dentro: false.
//  · destello(g, x, y, r, k = 1, { rayos: 6, giro: 0, color: 'calido'|'frio', anillo: 0…1 }) — el destello de una fusión
//    o de una estrella que muere: un punto blanco, un resplandor ámbar, unos rayos finos y, con anillo, una onda que se
//    abre (anillo: lo abierta que está). r: radio del resplandor (px).
//  · brilloNucleo(g, x, y, r, k) — el calor del núcleo cortado (un resplandor blanco y ámbar sobre la bola).
//
// LA FOTO DEL SOL Y EL CORTE DESDE EL MUNDO
//  · solComoMundo(P, [x, y, R], z = 0) → { pos, escala } del Sol que, de frente y sin corte, cae en el disco (x, y, R)
//    px del mundo de crearMundo (FINAL_TIERRA.sol de ep03-cosmos.js: (721, 470) y 376 px). Así ep3-sol pasa de la foto del
//    mundo a la pieza sin que se note y ep3-vuelta devuelve el Sol de la pieza a su sitio del mundo.
//  · vistaLocal(P, pos, rot) → la dirección hacia la cámara en coordenadas locales (sol y gigante la calculan solas).
//
// EL CIELO DEL FINAL DE ep3-sol (el primer fotograma de ep3-vuelta)
//  · CIELO: dónde quedan el Sol pequeño (CIELO.sol: [x, y, R] px), la gigante (CIELO.gigante: [x, y, R] px y CIELO.apaga,
//    lo apagada que está al final) y los dos montones de estrellas (CIELO.monton: cerca y lejos, con su semilla, su pos y
//    su escala en el plató de las escenas de plastilina, cámara pos [0, 3,8, 15,5], mira [0, 2,3, 0], fov 28).
//  · fotosCielo(P, idx) → las fotos del cielo (idx: { sol, estrellas, gigante } índices de esas piezas en el plató, que
//    tiene que estar creado con alfa: true): { sol, gigante, giganteApagada, cerca, lejos } (lienzos de 1920 × 1080 sin
//    viñeta ni grano; los montones ya con su resplandor y con claros detrás de la gigante y alrededor de Atom, que va
//    en (230, 780)). Tarda unos 10–20 s; para repartirlas en fotogramas baratos, fotoCielo(P, idx, parte, F) hace una
//    sola parte de PARTES_CIELO (sol, gigante, giganteApagada y cada montón en dos mitades, 'cerca:0', 'cerca:1',
//    'lejos:0', 'lejos:1': ~1–4 s cada una) y la deja en F (el montón queda hecho al llegar su segunda mitad).
//  · cielo(g, F, { u: 1, apaga: CIELO.apaga, t: 0 }) compone el cielo sobre lo que haya en g (el fondo del espacio):
//    u = 0, el Sol grande en el sitio del Sol del mundo (721, 470, 376 px) con las estrellas muy abiertas (fuera de
//    cuadro); u = 1, el final de ep3-sol (el Sol pequeño en el centro entre el montón y la gigante arriba a la derecha).
//    t: segundos, para el titileo (en el último fotograma de ep3-sol, t = CIELO.tFinal). ep3-vuelta empieza con
//    cielo(g, F, { u: 1, t: CIELO.tFinal }) sobre el mismo fondo (fondoCielo) y aparta el montón a su manera.
//  · fondoCielo(mundo, n) → la foto del espacio de crearMundo a 10⁹ sin Sol, sin Tierra y sin Luna (el carbón con
//    estrellitas), para debajo del cielo; ep03-cosmos.js da la cámara.
//
// COSTE (este servidor, 1920 × 1080, carga 4–6; con el servidor tranquilo, menos): Sol vivo de 750 px con Atom, ~0,35–0,6 s
// por fotograma; núcleo de 250 px, ~0,3 s; media losa del montón, ~1,5–4 s (la de lejos, la más cara); gigante de 600 px,
// ~0,8 s; partícula, ~0,1 s; estrella de neutrones de 400 px, ~0,6 s; hoja de prueba, 0,4–2 s por celda. Lo quieto se
// fotografía (con 2–3 fotos que se alternan para el hervor). Nada del kit usa filtros de lienzo en cada fotograma (en
// este servidor cuestan): los desenfoques van horneados en las fotos.
//
// CONGELADO el 21-10-2026, entregado con la hoja de prueba (escenas/ep03-estrellas-hoja.html: __frame(0) la hoja entera,
// __frame(k) la celda k). Las escenas que lo usan no lo cambian.
import * as THREE from 'three';
import { estadoMundo, camara, fotoMundo } from '/atomo/plato/kits/ep03-cosmos.js';

const W = 1920, H = 1080;
const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const mix = (a, b, x) => a + (b - a) * x;
const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const v3 = (p) => `vec3(${fl(p[0])}, ${fl(p[1])}, ${fl(p[2])})`;

// el núcleo de Atom (las mismas bolitas que NUC de plastilina-adulta.js: semilla 77)
export const NUC_H = (() => {
  const r = mulberry32(77), out = [];
  const N = 8;
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 0.4;
    const k = 0.33 + 0.03 * r();
    out.push([Math.cos(ph) * rr * k, y * k * 0.92, Math.sin(ph) * rr * k]);
  }
  return out;
})();
// el de helio: doce bolitas en un racimo algo mayor (los dos núcleos fundidos)
export const NUC_HE = (() => {
  const r = mulberry32(4242), out = [];
  const N = 12;
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 1.1;
    const k = 0.43 + 0.04 * r();
    out.push([Math.cos(ph) * rr * k * 1.08, y * k * 0.9, Math.sin(ph) * rr * k]);
  }
  return out;
})();
// la esfera gira esto (× giro) para enseñar la cuña del corte
export const SOL_GIRO = [0.52, -0.5, 0];

// ---------------------------------------------------------------- GLSL común
const GLSL_COMUN = /* glsl */`
#ifndef ESTRELLAS_COMUN
#define ESTRELLAS_COMUN 1
uniform vec4 uSolK;      // corte · calor · aprieta · —
uniform vec4 uSolV;      // dirección hacia la cámara (local del Sol)
uniform vec4 uGigK;      // apaga · corte · hunde · —
uniform vec4 uGigV;      // dirección hacia la cámara (local de la gigante)
uniform vec4 uMonton;    // celda · semilla · tamaño · densidad
uniform vec4 uMontonH;   // hueco: x, y, radio (local) · profundidad
uniform vec4 uMontonR;   // trozo de la losa que se dibuja: x0, x1, y0, y1 (local)
vec2 esHash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float esRuido2(vec2 x) {
  vec2 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
// la granulación del Sol de crearMundo (la misma fórmula): celdillas claras entre surcos oscuros, y sus dos manchas
float esGranos(vec2 n, out float man) {
  vec2 w = n * 26.0 + 0.5 * vec2(esRuido2(n * 5.0 + uBoil.xy * 0.1), esRuido2(n * 5.0 + 7.0 + uBoil.yz * 0.1));
  vec2 wi = floor(w);
  float f1 = 9.0, f2 = 9.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 o = vec2(float(i), float(j));
    vec2 dd = wi + o + 0.15 + 0.7 * esHash22(wi + o) - w;
    float dq = dot(dd, dd);
    if (dq < f1) { f2 = f1; f1 = dq; } else if (dq < f2) f2 = dq;
  }
  float cel = smoothstep(0.0, 0.35, sqrt(f2) - sqrt(f1));
  man = 0.0;
  for (int k = 0; k < 2; k++) {
    vec2 mc = k == 0 ? vec2(-0.32, 0.18) : vec2(0.22, -0.36);
    man = max(man, 1.0 - smoothstep(0.025, 0.055, length((n - mc) * vec2(1.0, 1.4)) + 0.025 * esRuido2(n * 40.0)));
  }
  return 0.6 * cel + 0.4 * esRuido2(n * 5.0 + 3.0);
}
// la cuña quitada (un octante cuando está abierta del todo): por encima de y = 0 y, alrededor del eje y, del ángulo 0
// (+z) al A (hacia +x); > 0 dentro de la cuña
float esCuna(vec3 q, float A) {
  vec2 p = vec2(q.x, q.z);
  return min(min(p.x, dot(p, vec2(-cos(A), sin(A)))), q.y);
}
// celdas de convección en el corte: Voronoi de la dirección (f2 − f1)
float esCeldas3(vec3 w) {
  vec3 wi = floor(w);
  float f1 = 9.0, f2 = 9.0;
  for (int k = 0; k < 27; k++) {
    vec3 o = vec3(float(k % 3), float((k / 3) % 3), float(k / 9)) - 1.0;
    vec3 c = wi + o;
    vec3 dd = c + 0.2 + 0.6 * vec3(hash13(c), hash13(c + 3.1), hash13(c + 6.7)) - w;
    float dq = dot(dd, dd);
    if (dq < f1) { f2 = f1; f1 = dq; } else if (dq < f2) f2 = dq;
  }
  return sqrt(f2) - sqrt(f1);
}
// coordenadas en la cara de corte: s = distancia al eje y, y = altura (las dos caras de la cuña pasan por el eje)
// bolitas apretadas (neutrones): red de lado s, bolitas de radio rb con el centro dentro de Rin, y una bola por debajo
float esBolitas(vec3 q, float s, float rb, float Rin, out float id) {
  // dos redes cúbicas entrelazadas (cúbica centrada), giradas: las bolitas no forman cuadrícula
  const mat3 G = mat3(0.8165, -0.4082, -0.4082, 0.0, 0.7071, -0.7071, 0.5774, 0.5774, 0.5774);
  vec3 p = G * q;
  float d = length(q) - (Rin - 0.03);
  id = 0.0;
  for (int L = 0; L < 2; L++) {
    vec3 o = float(L) * vec3(0.5 * s);
    vec3 b = floor((p - o) / s);
    for (int k = 0; k < 8; k++) {
      vec3 c = (b + vec3(float(k & 1), float((k >> 1) & 1), float((k >> 2) & 1))) * s + o;
      float dc = length(c) < Rin ? length(p - c) - rb : 1e5;
      if (dc < d) { d = dc; id = hash13(c * 7.31 + 1.7); }
    }
  }
  return d;
}
vec3 esColorNeutron(float id) { return vec3(0.13, 0.135, 0.16) * (0.8 + 0.4 * id); }
#endif
`;

// ---------------------------------------------------------------- el Sol
// (KA, KE: lo que la arcilla recibe de luz frente a lo que da por sí misma; ajustado contra la foto del mundo)
const GLSL_SOL = GLSL_COMUN + /* glsl */`
#define SOL_KA 0.30
#define SOL_KE 1.15
float solCara(float r, float ap) {
  // terrazas: la convección más alta que la zona radiativa, y esta algo más que el borde del núcleo
  return 0.014 * smoothstep(0.68, 0.73, r) + 0.006 * smoothstep(0.27, 0.31, r);
}
float pz_sol(vec3 q, vec4 T, out float m) {
  float A = uSolK.x * 1.5707963, ap = uSolK.z;
  float r = length(q);
  float d = r - 1.0;
  m = 0.0;
  if (A > 0.002) {
    float dc = esCuna(q, A) - solCara(r, ap);
    if (dc > d) m = 1.0;
    d = max(d, dc);
  }
  float rc = 0.30 * (1.0 - 0.16 * ap);
  float dn = r - rc - 0.004 * sin(q.x * 37.0 + uBoil.x) * sin(q.y * 31.0 + uBoil.y) * sin(q.z * 34.0);
  if (dn < d) m = 2.0;
  return min(d, dn);
}
float pzc_sol(vec3 q, vec4 T) {
  float A = uSolK.x * 1.5707963;
  float d = length(q) - 0.985;
  if (A > 0.002) d = max(d, esCuna(q, A) + 0.012);
  return min(d, length(q) - 0.28 * (1.0 - 0.16 * uSolK.z));
}
vec3 pzcol_sol(vec3 q, vec4 T, float m) {
  float r = length(q);
  float calor = uSolK.y, ap = uSolK.z;
  vec3 V = normalize(uSolV.xyz);
  if (m < 0.5) {
    vec2 n = q.xy / max(r, 1e-4);
    float man;
    float gran = esGranos(n, man);
    vec3 c = mix(vec3(0.36, 0.075, 0.015), vec3(0.74, 0.32, 0.055), gran);
    c = mix(c, vec3(0.10, 0.035, 0.015), man * 0.85);
    float mu = clamp(dot(q / max(r, 1e-4), V), 0.0, 1.0);
    vec3 col = c * (0.16 + 0.84 * pow(mu, 0.9));
    gEm = col * SOL_KE * (0.07 + 0.15 * mu) * (1.0 - man);
    gTr = 0.5; gBri = 0.45;
    return col * SOL_KA;
  }
  if (m < 1.5) {
    // las caras del corte: anillos por el radio; aprieta junta los de la zona radiativa hacia el centro
    vec3 dir = q / max(r, 1e-4);
    float rr = r * (1.0 + 0.22 * ap * smoothstep(0.75, 0.3, r));
    vec3 col; float e;
    if (r > 0.71) {
      // convección: celdas de arcilla oscura que suben y bajan, con surcos entre ellas
      float u = (r - 0.71) / 0.29;
      float cel = esCeldas3(q * 10.5 + 3.0);
      float k = smoothstep(0.03, 0.28, cel) * (0.8 + 0.2 * sin(u * 3.1416));
      col = mix(vec3(0.20, 0.035, 0.010), vec3(0.62, 0.20, 0.04), k);
      col *= 0.92 + 0.14 * vnoise(q * 40.0);
      e = 0.07 + 0.1 * k;
    } else if (r > 0.27) {
      // zona radiativa: capas finas de arcilla naranja, más claras y más calientes hacia dentro
      float u = (r - 0.27) / 0.44;
      col = mix(vec3(0.72, 0.27, 0.05), vec3(0.54, 0.15, 0.03), u);
      float an = abs(fract(rr * 26.0) - 0.5);
      col *= 1.0 - 0.18 * (1.0 - smoothstep(0.06, 0.2, an));
      col *= 0.93 + 0.1 * vnoise(dir * 30.0 + rr * 20.0);
      float hot = calor * exp(-(r - 0.27) * 7.0);
      col = mix(col, vec3(0.95, 0.66, 0.30), 0.55 * hot);
      e = 0.08 + 0.08 * (1.0 - u) + 0.5 * hot;
    } else {
      col = mix(vec3(0.80, 0.32, 0.06), vec3(1.0, 0.86, 0.62), calor);
      e = 0.2 + 0.8 * calor;
    }
    // costuras entre las zonas
    float cos1 = 1.0 - smoothstep(0.004, 0.012, abs(r - 0.71)), cos2 = 1.0 - smoothstep(0.004, 0.011, abs(r - 0.28));
    col *= 1.0 - 0.5 * max(cos1, cos2);
    // el filo de la cara (la superficie del Sol vista de canto): un borde oscuro y fino
    col *= 1.0 - 0.4 * smoothstep(0.975, 0.998, r);
    gEm = col * e;
    gTr = 0.6; gBri = 0.5;
    return col * 0.3;
  }
  // el núcleo: de naranja a rojo blanco
  vec3 col = mix(vec3(0.82, 0.32, 0.06), vec3(1.0, 0.90, 0.70), calor);
  col *= 0.94 + 0.1 * vnoise(q * 30.0 + uBoil);
  // una bola: más oscura hacia su borde (se lee redonda aunque brille)
  float muN = clamp(dot(q / max(r, 1e-4), V), 0.0, 1.0);
  col *= 0.55 + 0.45 * pow(muN, 0.7);
  gEm = col * (0.25 + 1.2 * calor);
  gTr = 1.0; gBri = 0.6;
  return col * 0.4;
}
`;

// ---------------------------------------------------------------- núcleos de hidrógeno y de helio
const GLSL_NUCLEO = GLSL_COMUN + /* glsl */`
const vec3 NUCH[8] = vec3[8](${NUC_H.map(v3).join(', ')});
const vec3 NUCHE[12] = vec3[12](${NUC_HE.map(v3).join(', ')});
float pz_nucleo(vec3 q, vec4 T, out float m) {
  float d = 1e5, best = 1e5; m = 0.0;
  if (T.y < 0.5) {
    for (int i = 0; i < 8; i++) { float di = length(q - NUCH[i]) - 0.29; if (di < best) { best = di; m = float(i - (i / 2) * 2); } d = smin(d, di, 0.05); }
  } else {
    for (int i = 0; i < 12; i++) { float di = length(q - NUCHE[i]) - 0.29; if (di < best) { best = di; m = float(i - (i / 2) * 2); } d = smin(d, di, 0.05); }
  }
  return d - 0.0035 * bultos(q * 1.6);
}
float pzc_nucleo(vec3 q, vec4 T) { return length(q) - (T.y < 0.5 ? 0.4 : 0.5); }
vec3 pzcol_nucleo(vec3 q, vec4 T, float m) {
  vec3 col = m < 0.5 ? C_TERRA * (0.92 + 0.16 * vnoise(q * 9.0)) : C_CREAM * (0.94 + 0.1 * vnoise(q * 11.0));
  float k = T.z;
  gEm = C_AMBAR * (0.08 + 0.55 * k) * smoothstep(0.62, 0.0, length(q)) + col * 0.12 * k;
  gTr = 0.55; gBri = 1.0;
  return col;
}
`;

// ---------------------------------------------------------------- el montón de estrellas
const GLSL_MONTON = GLSL_COMUN + /* glsl */`
vec3 esColorEstrella(float k) {
  return k < 0.36 ? vec3(0.66, 0.54, 0.32) : k < 0.62 ? vec3(0.40, 0.50, 0.72) : k < 0.84 ? vec3(0.72, 0.34, 0.08) : vec3(0.62, 0.12, 0.04);
}
float pza_estrellas(vec3 q, vec4 T) {
  vec2 c = vec2(0.5 * (max(uMontonR.x, -1.0) + min(uMontonR.y, 1.0)), 0.5 * (max(uMontonR.z, -0.5625) + min(uMontonR.w, 0.5625)));
  vec2 h = vec2(0.5 * (min(uMontonR.y, 1.0) - max(uMontonR.x, -1.0)), 0.5 * (min(uMontonR.w, 0.5625) - max(uMontonR.z, -0.5625)));
  return sdRoundBox(q - vec3(c, 0.0), vec3(h + 0.02, uMontonH.w * 0.5 + uMonton.x * 0.25), 0.01);
}
float pz_estrellas(vec3 q, vec4 T, out float m) {
  float c = uMonton.x, sem = uMonton.y;
  vec2 id0 = floor(q.xy / c);
  float d = 1e5; m = 0.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 id = id0 + vec2(float(i), float(j));
    vec2 jit = esHash22(id + sem * 7.7);
    vec3 cp = vec3((id + 0.22 + 0.56 * jit) * c, (hash12(id + sem * 3.3) - 0.5) * uMontonH.w);
    float h = hash12(id + sem * 9.1);
    float rad = c * mix(0.05, uMonton.z, h * h * h * h);
    rad *= step(hash12(id + sem * 1.7 + 17.0), uMonton.w);
    rad *= step(abs(cp.x), 1.0) * step(abs(cp.y), 0.5625) * step(uMontonR.x, cp.x) * step(cp.x, uMontonR.y) * step(uMontonR.z, cp.y) * step(cp.y, uMontonR.w);
    rad *= smoothstep(uMontonH.z, uMontonH.z * 1.3 + 0.01, length(cp.xy - uMontonH.xy));
    float di = rad > 0.0005 ? length(q - cp) - rad : 1e5;
    if (di < d) { d = di; m = hash12(id + sem * 4.1 + 41.0) + floor(h * 8.0); }
  }
  // fuera de la losa (del trozo), pasos grandes: las cuentas están todas dentro
  return max(min(d, c * 0.5), pza_estrellas(q, T));
}
float pzc_estrellas(vec3 q, vec4 T) { return 1e3; }
vec3 pzcol_estrellas(vec3 q, vec4 T, float m) {
  float k = fract(m), h = floor(m) / 8.0;
  vec3 col = esColorEstrella(k) * (0.92 + 0.12 * vnoise(q * 80.0));
  gEm = col * (0.10 + 0.32 * h);
  gTr = 0.4; gBri = 0.7;
  return col * 0.45;
}
`;

// ---------------------------------------------------------------- la gigante rojiza
const GLSL_GIGANTE = GLSL_COMUN + /* glsl */`
// celdas de convección enormes (Voronoi en la esfera): f2 − f1
float gigCeldas(vec3 n) {
  vec3 w = n * 3.1 + 0.25 * vec3(vnoise(n * 4.0 + uBoil * 0.05), vnoise(n * 4.0 + 5.0), vnoise(n * 4.0 + 9.0));
  vec3 wi = floor(w);
  float f1 = 9.0, f2 = 9.0;
  for (int k = 0; k < 27; k++) {
    vec3 o = vec3(float(k % 3), float((k / 3) % 3), float(k / 9)) - 1.0;
    vec3 c = wi + o;
    vec3 dd = c + 0.2 + 0.6 * vec3(hash13(c), hash13(c + 3.1), hash13(c + 6.7)) - w;
    float dq = dot(dd, dd);
    if (dq < f1) { f2 = f1; f1 = dq; } else if (dq < f2) f2 = dq;
  }
  return sqrt(f2) - sqrt(f1);
}
// radios de las capas (de fuera adentro): H 1 · He 0,62 · C 0,47 · O 0,37 · Si 0,28 · Fe 0,2; al hundirse, las de dentro caen
float gigCapa(float r, float hu) {
  float k = 1.0 + hu * 1.0 * smoothstep(0.62, 0.3, r);   // r aparente: lo de dentro de 0,5 cae a la mitad
  return r * k;
}
float pz_gigante(vec3 q, vec4 T, out float m) {
  float A = uGigK.y * 1.5707963, hu = uGigK.z;
  float r = length(q);
  float d = r - 1.0 - 0.018 * (vnoise(q * 2.6 + 1.3) - 0.5) - 0.006 * (vnoise(q * 7.0) - 0.5);
  m = 0.0;
  if (A > 0.002) {
    float rp = gigCapa(r, hu);
    float ter = 0.010 * smoothstep(0.60, 0.64, rp) + 0.006 * smoothstep(0.45, 0.49, rp) + 0.005 * smoothstep(0.35, 0.39, rp) + 0.004 * smoothstep(0.26, 0.30, rp);
    float dc = esCuna(q, A) - ter;
    if (dc > d) m = 1.0;
    d = max(d, dc);
  }
  // el núcleo: hierro (radio 0,2) → bola apretada de bolitas (0,075)
  float rc = mix(0.2, 0.075, smoothstep(0.0, 0.7, hu));
  float idb;
  float dn = hu > 0.6 ? esBolitas(q / rc, 0.15, 0.085, 0.92, idb) * rc : r - rc - 0.006 * sin(q.x * 40.0) * sin(q.y * 37.0 + 1.0) * sin(q.z * 41.0);
  if (dn < d) m = 2.0;
  return min(d, dn);
}
float pzc_gigante(vec3 q, vec4 T) {
  float A = uGigK.y * 1.5707963;
  float d = length(q) - 0.975;
  if (A > 0.002) d = max(d, esCuna(q, A) + 0.012);
  return min(d, length(q) - mix(0.2, 0.075, smoothstep(0.0, 0.7, uGigK.z)) * 0.85);
}
vec3 pzcol_gigante(vec3 q, vec4 T, float m) {
  float r = length(q);
  float ap = uGigK.x, hu = uGigK.z;
  vec3 V = normalize(uGigV.xyz);
  if (m < 0.5) {
    vec3 n = q / max(r, 1e-4);
    float cel = gigCeldas(n);
    float lane = smoothstep(0.0, 0.26 + 0.2 * ap, cel);
    float mot = vnoise(n * 7.0 + 2.0), gran = vnoise(n * 2.2 + 5.0);
    float k = (0.3 + 0.7 * lane) * (0.62 + 0.38 * smoothstep(0.25, 0.75, gran)) * (0.85 + 0.15 * mot);
    vec3 cHot = mix(vec3(0.66, 0.12, 0.028), vec3(0.34, 0.035, 0.012), ap);
    vec3 cCold = mix(vec3(0.20, 0.026, 0.009), vec3(0.06, 0.008, 0.004), ap);
    vec3 c = mix(cCold, cHot, k);
    float mu = clamp(dot(n, V), 0.0, 1.0);
    vec3 col = c * (0.12 + 0.88 * pow(mu, 1.2));
    gEm = col * (0.12 + 0.14 * mu) * (1.0 - 0.7 * ap);
    gTr = 0.5; gBri = 0.5;
    return col * 0.22;
  }
  if (m < 1.5) {
    float rp = gigCapa(r, hu);
    float s = length(q.xz), th = atan(q.y, s);
    vec3 col; float e;
    if (rp > 0.62) { float u = (rp - 0.62) / 0.38; col = mix(vec3(0.56, 0.09, 0.03), vec3(0.30, 0.035, 0.012), u); e = 0.08 + 0.06 * (1.0 - u);
      col *= 0.85 + 0.3 * smoothstep(0.03, 0.25, esCeldas3(q * 7.0 + 1.0)); }
    else if (rp > 0.47) { col = vec3(0.70, 0.24, 0.05); e = 0.12; }
    else if (rp > 0.37) { col = vec3(0.70, 0.42, 0.10); e = 0.13; }
    else if (rp > 0.28) { col = vec3(0.58, 0.52, 0.36); e = 0.12; }
    else { col = vec3(0.22, 0.27, 0.36); e = 0.12; }
    col *= 0.92 + 0.1 * vnoise(vec3(th * 12.0, rp * 30.0, 1.0));
    float an = abs(fract(rp * 30.0) - 0.5);
    col *= 1.0 - 0.08 * (1.0 - smoothstep(0.08, 0.2, an));
    // costuras entre capas
    float cs = 0.0;
    for (int k = 0; k < 5; k++) { float rk = k == 0 ? 0.62 : k == 1 ? 0.47 : k == 2 ? 0.37 : k == 3 ? 0.28 : 0.205; cs = max(cs, 1.0 - smoothstep(0.004, 0.011, abs(rp - rk))); }
    col *= 1.0 - 0.45 * cs;
    col *= 1.0 - 0.4 * smoothstep(0.975, 0.998, r);
    // lo que cae deja dentro un hueco oscuro, y el colapso da un brillo frío alrededor del centro
    float flash = exp(-pow((hu - 0.5) / 0.22, 2.0));
    float cerca = exp(-r * 9.0);
    col = mix(col, vec3(0.62, 0.72, 0.92), 0.6 * flash * cerca);
    gEm = col * (e * (1.0 - 0.5 * ap) + 1.2 * flash * cerca);
    gTr = 0.6; gBri = 0.5;
    return col * 0.3;
  }
  // el núcleo: hierro gris al rojo → bolitas grises apretadas con un filo azulado
  if (hu > 0.6) {
    float rc = mix(0.2, 0.075, smoothstep(0.0, 0.7, hu));
    float idb; esBolitas(q / rc, 0.15, 0.085, 0.92, idb);
    vec3 col = esColorNeutron(idb);
    gEm = vec3(0.18, 0.24, 0.40) * (0.25 + 0.6 * exp(-pow((hu - 0.5) / 0.25, 2.0)));
    gBri = 1.4;
    return col;
  }
  vec3 col = mix(vec3(0.20, 0.17, 0.16), vec3(0.42, 0.13, 0.05), 0.5 + 0.5 * vnoise(q * 25.0));
  gEm = vec3(0.30, 0.07, 0.02) * (0.5 + hu) + vec3(0.4, 0.5, 0.8) * exp(-pow((hu - 0.5) / 0.2, 2.0));
  gBri = 1.3;
  return col;
}
`;

// ---------------------------------------------------------------- partículas del colapso
const GLSL_PARTICULA = GLSL_COMUN + /* glsl */`
float pz_particula(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float R = T.y < 0.5 ? 0.45 : 1.0;
  return length(q) - R - 0.012 * R * sin(q.x * 9.0 / R + uBoil.x) * sin(q.y * 8.0 / R + uBoil.y) * sin(q.z * 9.5 / R + uBoil.z);
}
float pzc_particula(vec3 q, vec4 T) { return length(q) - (T.y < 0.5 ? 0.43 : 0.97); }
vec3 pzcol_particula(vec3 q, vec4 T, float m) {
  vec3 ruido = vec3(0.92 + 0.16 * vnoise(q * 6.0));
  if (T.y < 0.5) { vec3 c = vec3(0.035, 0.08, 0.30) * ruido; gEm = vec3(0.05, 0.12, 0.42) * 0.45; gTr = 0.5; return c; }
  vec3 pr = vec3(0.40, 0.045, 0.022), ne = vec3(0.15, 0.15, 0.17);
  vec3 c = (T.y < 1.5 ? mix(pr, ne, clamp(T.z, 0.0, 1.0)) : ne) * ruido;
  gTr = 0.4;
  return c;
}
`;

// ---------------------------------------------------------------- la estrella de neutrones
const GLSL_NEUTRONES = GLSL_COMUN + /* glsl */`
float pz_neutrones(vec3 q, vec4 T, out float m) { float id; float d = esBolitas(q, 0.15, 0.085, 0.93, id); m = id; return d; }
float pzc_neutrones(vec3 q, vec4 T) { return length(q) - 0.88; }
vec3 pzcol_neutrones(vec3 q, vec4 T, float m) {
  vec3 col = esColorNeutron(m);
  vec3 n = normalize(q);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.0);
  gEm = vec3(0.16, 0.24, 0.46) * T.z * (0.15 + 0.85 * rim);
  gBri = 1.5; gTr = 0.2;
  return col;
}
`;

const TIPOS = {
  sol: { radio: 1.02, glifos: [], glsl: GLSL_SOL },
  nucleo: { radio: 0.8, glifos: [], glsl: GLSL_NUCLEO },
  estrellas: { radio: 1.2, glifos: [], glsl: GLSL_MONTON, envolvente: true },
  gigante: { radio: 1.04, glifos: [], glsl: GLSL_GIGANTE },
  particula: { radio: 1.03, glifos: [], glsl: GLSL_PARTICULA },
  neutrones: { radio: 1.03, glifos: [], glsl: GLSL_NEUTRONES },
};
export function tiposEstrellas(nombres = null) {
  if (!nombres) return { ...TIPOS };
  return Object.fromEntries(nombres.map((k) => [k, TIPOS[k]]));
}
export function uniformesEstrellas() {
  return {
    uSolK: { value: new THREE.Vector4(0, 0, 0, 0) }, uSolV: { value: new THREE.Vector4(0, 0, 1, 0) },
    uGigK: { value: new THREE.Vector4(0, 0, 0, 0) }, uGigV: { value: new THREE.Vector4(0, 0, 1, 0) },
    uMonton: { value: new THREE.Vector4(0.09, 1, 0.16, 0.55) }, uMontonH: { value: new THREE.Vector4(0, 0, 0, 0.24) },
    uMontonR: { value: new THREE.Vector4(-9, 9, -9, 9) },
  };
}
const exigir = (P, k) => { if (!P.U[k]) throw new Error(`ep03-estrellas: crea el plató con uniformes: uniformesEstrellas() (falta ${k})`); };

// ---------------------------------------------------------------- geometría compartida
const rotM = (rot) => new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ'));
/** La dirección hacia la cámara en coordenadas locales de una pieza en pos con rot. */
export function vistaLocal(P, pos, rot = [0, 0, 0]) {
  const c = P.U.uCamPos.value;
  const d = new THREE.Vector3(c.x - pos[0], c.y - pos[1], c.z - pos[2]).normalize();
  return d.applyMatrix4(rotM(rot).transpose());
}
function geometria(P, pos, escala, rot, A) {
  const R = rotM(rot);
  const local = (x, y, z) => { const v = new THREE.Vector3(x, y, z).multiplyScalar(escala).applyMatrix4(R); return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z]; };
  // las tres caras del octante: 0 el plano x = 0 (de +z a +y) · 1 el que se abre (a φ = A: de la dirección (sen A, 0, cos A)
  // a +y) · 2 el suelo y = 0 (de +z a la dirección φ = A)
  const dirA = [Math.sin(A), 0, Math.cos(A)];
  const cara = (k, a, r = 1) => {
    const c = Math.cos(a) * r, s = Math.sin(a) * r;
    if (k === 0) return local(0, s, c);
    if (k === 1) return local(dirA[0] * c, s, dirA[2] * c);
    const f = a / (Math.PI / 2) * A;
    return local(Math.sin(f) * r, 0, Math.cos(f) * r);
  };
  const borde = (ang) => {
    const cen = P.proyectar(pos);
    const e = P.proyectar(local(1, 0, 0));
    const rpx = Math.hypot(e[0] - cen[0], e[1] - cen[1]);
    return [cen[0] + Math.cos(ang) * rpx, cen[1] - Math.sin(ang) * rpx];
  };
  return { centro: pos, radio: escala, local, cara, borde };
}

// ---------------------------------------------------------------- funciones de pieza
export function sol(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], corte = 0, calor = 0, aprieta = 0, giro = null, toque = false, huellaFija = null } = {}) {
  exigir(P, 'uSolK');
  const gi = giro ?? corte;
  const r = [rot[0] + gi * SOL_GIRO[0], rot[1] + gi * SOL_GIRO[1], rot[2] + gi * SOL_GIRO[2]];
  P.U.uSolK.value.set(cl(corte), cl(calor), cl(aprieta), 0);
  const V = vistaLocal(P, pos, r);
  P.U.uSolV.value.set(V.x, V.y, V.z, 0);
  P.pieza(i, { pos, escala, rot: r, sq, toque, huellaFija });
  return geometria(P, pos, escala, r, cl(corte) * Math.PI / 2);
}
export function nucleo(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], helio = false, calor = 0, toque = false, huellaFija = null } = {}) {
  P.pieza(i, { pos, escala, rot, sq, variante: helio ? 1 : 0, color: cl(calor), toque, huellaFija });
}
export function estrellas(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], semilla = 1, celda = 0.09, tamano = 0.16, densidad = 0.55, hueco = null, profundidad = 0.24, trozo = null, toque = false } = {}) {
  exigir(P, 'uMonton');
  P.U.uMonton.value.set(celda, semilla, tamano, densidad);
  P.U.uMontonH.value.set(hueco?.x ?? 0, hueco?.y ?? 0, hueco?.r ?? 0, profundidad);
  P.U.uMontonR.value.set(...(trozo ?? [-9, 9, -9, 9]));
  P.pieza(i, { pos, escala, rot, toque });
}
export function gigante(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], apaga = 0, corte = 0, hunde = 0, giro = null, toque = false, huellaFija = null } = {}) {
  exigir(P, 'uGigK');
  const gi = giro ?? corte;
  const r = [rot[0] + gi * SOL_GIRO[0], rot[1] + gi * SOL_GIRO[1], rot[2] + gi * SOL_GIRO[2]];
  P.U.uGigK.value.set(cl(apaga), cl(corte), cl(hunde), 0);
  const V = vistaLocal(P, pos, r);
  P.U.uGigV.value.set(V.x, V.y, V.z, 0);
  P.pieza(i, { pos, escala, rot: r, sq, toque, huellaFija });
  const gm = geometria(P, pos, escala, r, cl(corte) * Math.PI / 2);
  return { ...gm, nucleo: pos, radioNucleo: escala * mix(0.2, 0.075, ss(0, 0.7, hunde)) };
}
const TIPO_PART = { electron: 0, 'electrón': 0, proton: 1, 'protón': 1, neutron: 2, 'neutrón': 2 };
export function particula(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], tipo = 'proton', mezcla = 0, toque = false } = {}) {
  P.pieza(i, { pos, escala, rot, sq, variante: typeof tipo === 'number' ? tipo : TIPO_PART[tipo] ?? 1, color: cl(mezcla), toque });
}
export function neutrones(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], brillo = 0.5, toque = false } = {}) {
  P.pieza(i, { pos, escala, rot, color: cl(brillo), toque });
}

/** pos y escala del Sol que, de frente y sin corte, cae en el disco (x, y, R) px del mundo de crearMundo. */
export function solComoMundo(P, [x, y, R], z = 0) {
  // el centro en el píxel (x, y) a la profundidad z; la escala, para que la silueta (perspectiva) mida R px
  const pos = P.punto(x, y, z);
  const c = P.U.uCamPos.value;
  const D = Math.hypot(c.x - pos[0], c.y - pos[1], c.z - pos[2]);
  const a = P.proyectar(pos), b = P.proyectar([pos[0] + 1, pos[1], pos[2]]);
  const pxU = Math.hypot(b[0] - a[0], b[1] - a[1]);
  // una esfera de radio s a distancia D tiene una silueta de radio angular asin(s/D): s/√(1 − s²/D²) ≈ R/pxU
  const k = R / pxU;
  const s = k / Math.sqrt(1 + (k * k) / (D * D));
  return { pos, escala: s };
}

// ---------------------------------------------------------------- ayudas 2D
const COL_HALO = {
  sol: [[255, 160, 60, 0.46, 0.14, 4], [190, 80, 25, 0.22, 0.7, 10]],
  gigante: [[230, 90, 40, 0.40, 0.16, 6], [150, 45, 25, 0.22, 0.8, 12]],
  neutrones: [[150, 185, 255, 0.40, 0.22, 4], [90, 120, 210, 0.18, 0.9, 10]],
  nucleo: [[255, 190, 110, 0.5, 0.35, 3], [230, 120, 50, 0.2, 1.2, 6]],
};
/** El resplandor alrededor de una estrella de radio R px (el del Sol imita el de crearMundo). */
export function halo(g, x, y, R, k = 1, tipo = 'sol', { dentro = true } = {}) {
  if (k <= 0.002 || R <= 0) return;
  g.save();
  g.globalCompositeOperation = 'screen';
  for (const [r, gg, b, a, esc, mn] of COL_HALO[tipo] ?? COL_HALO.sol) {
    const L = R * esc + mn;
    const Rm = R + 4.5 * L;
    const gr = g.createRadialGradient(x, y, dentro ? 0 : R * 0.98, x, y, Rm);
    const p0 = dentro ? R / Rm : 0;
    const st = (u) => Math.exp(-Math.max(0, u * Rm - R) / L);
    if (dentro) gr.addColorStop(0, `rgba(${r},${gg},${b},${a * k})`);
    for (const u of [p0, p0 + (1 - p0) * 0.1, p0 + (1 - p0) * 0.25, p0 + (1 - p0) * 0.45, p0 + (1 - p0) * 0.7, 1]) {
      gr.addColorStop(Math.min(1, u), `rgba(${r},${gg},${b},${(a * k * st(u)).toFixed(4)})`);
    }
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, Rm, 0, 2 * Math.PI); g.fill();
  }
  g.restore();
}
/** El destello de una fusión o de una estrella que muere. */
export function destello(g, x, y, r, k = 1, { rayos = 6, giro = 0, color = 'calido', anillo = 0 } = {}) {
  if (k <= 0.002 || r <= 0) return;
  const C = color === 'frio' ? [[235, 242, 255], [150, 190, 255], [90, 130, 230]] : [[255, 246, 225], [255, 196, 110], [240, 130, 50]];
  g.save();
  g.globalCompositeOperation = 'lighter';
  let gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, `rgba(${C[0]},${0.95 * k})`); gr.addColorStop(0.12, `rgba(${C[0]},${0.75 * k})`);
  gr.addColorStop(0.35, `rgba(${C[1]},${0.32 * k})`); gr.addColorStop(1, `rgba(${C[2]},0)`);
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 2 * Math.PI); g.fill();
  // rayos finos
  for (let i = 0; i < rayos; i++) {
    const a = giro + (i / rayos) * Math.PI * 2 + (i % 2) * 0.12;
    const L = r * (i % 2 ? 1.25 : 1.9);
    g.save(); g.translate(x, y); g.rotate(a);
    const gl = g.createLinearGradient(0, 0, L, 0);
    gl.addColorStop(0, `rgba(${C[0]},${0.7 * k})`); gl.addColorStop(0.4, `rgba(${C[1]},${0.25 * k})`); gl.addColorStop(1, `rgba(${C[2]},0)`);
    g.fillStyle = gl;
    const w = Math.max(1.2, r * 0.035);
    g.beginPath(); g.moveTo(0, -w); g.lineTo(L, 0); g.lineTo(0, w); g.closePath(); g.fill();
    g.restore();
  }
  if (anillo > 0) {
    const ra = r * (0.4 + 1.6 * anillo);
    g.lineWidth = Math.max(1.5, r * 0.06 * (1 - anillo));
    g.strokeStyle = `rgba(${C[1]},${0.5 * k * (1 - anillo)})`;
    g.beginPath(); g.arc(x, y, ra, 0, 2 * Math.PI); g.stroke();
  }
  g.restore();
}
/** El calor del núcleo cortado: un resplandor blanco y ámbar sobre la bola (r: radio de la bola en px). */
export function brilloNucleo(g, x, y, r, k = 1) {
  if (k <= 0.002) return;
  g.save();
  g.globalCompositeOperation = 'screen';
  const R = r * 2.6;
  const gr = g.createRadialGradient(x, y, 0, x, y, R);
  gr.addColorStop(0, `rgba(255,248,230,${0.55 * k})`); gr.addColorStop(0.3, `rgba(255,214,150,${0.35 * k})`);
  gr.addColorStop(0.6, `rgba(250,160,70,${0.14 * k})`); gr.addColorStop(1, 'rgba(230,120,50,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 2 * Math.PI); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- el cielo del final de ep3-sol
// (px de diseño; plató de las escenas de plastilina, cámara pos [0, 3,8, 15,5], mira [0, 2,3, 0], fov 28)
export const CIELO = {
  sol: [930, 470, 62],                       // el Sol pequeño, casi en el centro (la regla ocupa el borde derecho)
  solGrande: [721, 470, 376],                // el Sol del mundo (FINAL_TIERRA.sol de ep03-cosmos.js)
  gigante: [1262, 236, 150],                 // la gigante rojiza, al fondo, arriba a la derecha (a la izquierda de la regla)
  apaga: 0.42,                               // lo apagada que está al final de ep3-sol
  tFinal: 21.25,                             // el instante del último fotograma de ep3-sol (para el titileo)
  // lo que crecen las capas al principio (u = 0) respecto al final: el Sol × 376/62; las estrellas de cerca algo
  // menos y las de lejos mucho menos (paralaje); la gigante llega desde fuera de cuadro, arriba a la derecha
  crece: { sol: 376 / 62, cerca: 3.6, lejos: 1.9, gigante: 2.2 },
  // los dos montones: el de cerca (cuentas nítidas) y el de lejos (pequeñas, desenfocadas y más oscuras); z y escala
  // en el plató; la losa va centrada en la pantalla y el hueco, en el Sol
  monton: {
    cerca: { semilla: 3, celda: 0.085, tamano: 0.17, densidad: 0.3, profundidad: 0.22, z: 1.2, escala: 7.2, hueco: 0.05 },
    lejos: { semilla: 8, celda: 0.05, tamano: 0.15, densidad: 0.42, profundidad: 0.12, z: -1.0, escala: 8.6, hueco: 0.03 },
  },
};
const lienzoDe = (P) => P.renderer.domElement;
// el presentador (Atom) va siempre abajo a la izquierda: el montón deja un claro ahí
const SITIO_ATOM = [230, 780, 150];
// cada montón va en dos mitades (izquierda y derecha: cada una ~1,5–3 s); con las dos, la foto se termina sola
export const PARTES_CIELO = ['sol', 'gigante', 'giganteApagada', 'cerca:0', 'cerca:1', 'lejos:0', 'lejos:1'];
/**
 * Una de las fotos del cielo (PARTES_CIELO; cada una ~1–3 s: así se pueden repartir en fotogramas baratos) y la deja en F.
 * idx: { sol, estrellas, gigante } (índices de esas piezas en el plató, creado con alfa: true).
 */
export function fotoCielo(P, idx, parte, F = {}, { n = 7000 } = {}) {
  const lz = lienzoDe(P);
  const post = P.U.uPost.value; P.U.uPost.value = 0;
  const foto = () => { const c = document.createElement('canvas'); c.width = lz.width; c.height = lz.height; c.getContext('2d').drawImage(lz, 0, 0); return c; };
  P.fotograma(0); P.limpiar();
  F.giganteRef = [960, 540, 300];
  if (parte === 'sol') {
    // el Sol entero, de frente, en su sitio del mundo (376 px)
    sol(P, idx.sol, { ...solComoMundo(P, CIELO.solGrande, 0), corte: 0 });
    P.render(n, { fondo: false });
    F.sol = foto();
  } else if (parte === 'gigante' || parte === 'giganteApagada') {
    // la gigante, encendida o apagada, en el centro a 300 px (se lleva a su sitio en 2D)
    const ap = parte === 'gigante' ? 0 : 1;
    gigante(P, idx.gigante, { ...solComoMundo(P, F.giganteRef, -1.5), apaga: ap });
    P.render(n + 1 + ap, { fondo: false });
    // al fondo: algo desenfocada y velada (horneado: un filtro de lienzo en cada fotograma cuesta)
    const c = foto(), d = document.createElement('canvas'); d.width = c.width; d.height = c.height;
    const gd = d.getContext('2d'); gd.filter = `blur(${(1.3 * c.width / W).toFixed(2)}px) brightness(0.94)`; gd.drawImage(c, 0, 0);
    F[parte] = d;
  } else {
    // un montón (la mitad izquierda o la derecha): la losa centrada en la pantalla, con el hueco en el Sol pequeño
    const [nombre, mitad] = parte.split(':');
    const M = CIELO.monton[nombre];
    const centro = P.punto(960, 540, M.z), hs = P.punto(CIELO.sol[0], CIELO.sol[1], M.z);
    estrellas(P, idx.estrellas, { pos: centro, escala: M.escala, semilla: M.semilla, celda: M.celda, tamano: M.tamano, densidad: M.densidad,
      profundidad: M.profundidad, hueco: { x: (hs[0] - centro[0]) / M.escala, y: (hs[1] - centro[1]) / M.escala, r: M.hueco },
      trozo: mitad === '0' ? [-9, 0, -9, 9] : [0, 9, -9, 9] });
    P.render(n + 3 + M.semilla, { fondo: false });
    const crudo = F['_' + nombre] ?? (F['_' + nombre] = (() => { const c = document.createElement('canvas'); c.width = lz.width; c.height = lz.height; return c; })());
    crudo.getContext('2d').drawImage(lz, 0, 0);
    crudo['mitad' + mitad] = true;
    if (crudo.mitad0 && crudo.mitad1) F[nombre] = acabarMonton(crudo, nombre);
  }
  P.U.uPost.value = post;
  return F;
}
// el montón ya entero: resplandor alrededor de cada cuenta (las de lejos, además, desenfocadas y más oscuras) y los claros
function acabarMonton(c, nombre) {
  const k = c.width / W;
  const d = document.createElement('canvas'); d.width = c.width; d.height = c.height;
  const gd = d.getContext('2d');
  gd.filter = nombre === 'lejos' ? `blur(${(2.2 * k).toFixed(1)}px) brightness(0.62)` : 'none';
  gd.drawImage(c, 0, 0);
  gd.globalCompositeOperation = 'lighter';
  gd.filter = `blur(${(7 * k).toFixed(1)}px) brightness(${nombre === 'lejos' ? 0.35 : 0.55})`;
  gd.drawImage(c, 0, 0);
  gd.filter = 'none';
  // claros (en el cuadro final): detrás de la gigante y alrededor de Atom
  gd.globalCompositeOperation = 'destination-out';
  gd.setTransform(k, 0, 0, k, 0, 0);
  for (const [x, y, r] of [[CIELO.gigante[0], CIELO.gigante[1], CIELO.gigante[2] + 25], SITIO_ATOM]) {
    const gr = gd.createRadialGradient(x, y, r * 0.7, x, y, r);
    gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    gd.fillStyle = gr; gd.beginPath(); gd.arc(x, y, r, 0, 2 * Math.PI); gd.fill();
  }
  return d;
}
/** Las fotos del cielo, todas (al cargar; ~6–9 s). */
export function fotosCielo(P, idx, o = {}) {
  const F = {};
  for (const parte of PARTES_CIELO) fotoCielo(P, idx, parte, F, o);
  return F;
}
// una foto (de 1920 × 1080) escalada s veces alrededor del punto (px, py), que queda en (qx, qy)
function pegarEscalada(g, f, s, [px, py], [qx, qy] = [px, py], alfa = 1) {
  if (alfa <= 0.002) return;
  g.save(); g.globalAlpha *= alfa;
  g.translate(qx, qy); g.scale(s, s); g.translate(-px, -py);
  g.drawImage(f, 0, 0, W, H);
  g.restore();
}
/** Lo que ocupa cada cosa del cielo en u (0…1): { sol: [x, y, R], gigante: [x, y, R], cerca, lejos (escala de cada capa) }. */
export function estadoCielo(u = 1) {
  const e = cl(u);
  const lerp = (a, b) => a.map((v, k) => mix(v, b[k], e));
  // el Sol: de su sitio del mundo al centro, con el radio en escala logarítmica (encoge a ritmo constante)
  const kS = Math.pow(CIELO.crece.sol, 1 - e);
  const [sx, sy] = lerp(CIELO.solGrande.slice(0, 2), CIELO.sol.slice(0, 2));
  const kG = Math.pow(CIELO.crece.gigante, 1 - e);
  const g0 = [CIELO.gigante[0] + 900, CIELO.gigante[1] - 520];
  const gx = mix(g0[0], CIELO.gigante[0], eio(e)), gy = mix(g0[1], CIELO.gigante[1], eio(e));
  return {
    sol: [sx, sy, CIELO.sol[2] * kS], gigante: [gx, gy, CIELO.gigante[2] * kG],
    cerca: Math.pow(CIELO.crece.cerca, 1 - e), lejos: Math.pow(CIELO.crece.lejos, 1 - e),
  };
}
/**
 * Compone el cielo (u: 0 el Sol del mundo con las estrellas fuera de cuadro · 1 el final de ep3-sol) sobre lo que haya en g.
 * F: fotosCielo(). apaga: lo apagada que está la gigante (CIELO.apaga al final). t: segundos (titileo).
 */
export function cielo(g, F, { u = 1, apaga = CIELO.apaga, t = 0, sinSol = false } = {}) {
  const S = estadoCielo(u);
  const [sx, sy, sR] = S.sol;
  // las estrellas se abren desde el Sol (el centro del zoom): primero las de lejos, luego las de cerca
  pegarEscalada(g, F.lejos, S.lejos, CIELO.sol.slice(0, 2), [sx, sy]);
  pegarEscalada(g, F.cerca, S.cerca, CIELO.sol.slice(0, 2), [sx, sy]);
  // la gigante: su foto (encendida y apagada mezcladas) y su resplandor
  const [gx, gy, gR] = S.gigante;
  const ref = F.giganteRef, kg = gR / ref[2];
  halo(g, gx, gy, gR, 1 - 0.72 * apaga, 'gigante');
  pegarEscalada(g, F.gigante, kg, ref.slice(0, 2), [gx, gy], 1);
  if (apaga > 0.002) pegarEscalada(g, F.giganteApagada, kg, ref.slice(0, 2), [gx, gy], cl(apaga));
  void t;
  if (!sinSol) {
    // el Sol, con más resplandor cuando es pequeño (que se lea en el móvil)
    const peq = 1 - sR / CIELO.solGrande[2];
    halo(g, sx, sy, sR, 1 + 0.9 * peq, 'sol');
    if (peq > 0.01) {
      // y un resplandor ancho y cálido alrededor del Sol pequeño (el protagonista del final)
      g.save(); g.globalCompositeOperation = 'screen';
      const Rg = sR * 3.4, gr = g.createRadialGradient(sx, sy, sR * 0.8, sx, sy, Rg);
      gr.addColorStop(0, `rgba(255,190,100,${0.34 * peq})`); gr.addColorStop(0.35, `rgba(240,140,60,${0.12 * peq})`); gr.addColorStop(1, 'rgba(220,110,40,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(sx, sy, Rg, 0, 2 * Math.PI); g.fill();
      g.restore();
    }
    pegarEscalada(g, F.sol, sR / CIELO.solGrande[2], CIELO.solGrande.slice(0, 2), [sx, sy]);
  }
  return S;
}
/** La foto del espacio de crearMundo a 10⁹ sin Sol, sin Tierra y sin Luna (el carbón con estrellitas). */
export function fondoCielo(mundo, n = 0, extra = {}) {
  const C = camara(9);
  const est = estadoMundo(C, n, { luna: 0, ...extra, capas: { uSol: [0, 0, 1, 0], ...(extra.capas ?? {}) } });
  est.suelo = [-5000, -5000, 0.5, 0];
  return fotoMundo(mundo, est);
}
