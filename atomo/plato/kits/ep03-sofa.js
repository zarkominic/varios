// KIT DEL EPISODIO 3 · «SOFÁ» (kits/ep03-sofa.js). Lo crea ep3-mapa y, una vez entregado con su hoja de prueba
// (escenas/ep03-sofa-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que lo
// usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta y lo dice en su informe.
// Lo usan: ep3-mapa (lo crea) y ep3-andromeda (la ventana; empieza en el último fotograma de ep3-mapa: SALON).
//
// Tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra y uniformes), con su material,
// su luz y su paleta, más el cielo de la ventana en 2D (las estrellas en rayas, horneadas al cargar) y el salón entero
// del final de ep3-mapa (la persona sentada en el sofá, de espaldas, mirando por la ventana).
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposSofa, uniformesSofa, sofa, bol, ventana, hornearRayas, cieloVentana, vidrioVentana } from '/atomo/plato/kits/ep03-sofa.js';
//   const P = await crearPlato({ piezas: ['ventana', 'sofa', 'bol'], tiposExtra: tiposSofa(), uniformes: uniformesSofa(),
//                                alfa: true, post: false, ... });
//   const RAYAS = hornearRayas();                                       // una vez, al cargar (~0,2 s)
//   function dibujar(t) {
//     P.limpiar(); const v = ventana(P, 0, { pos, escala }); sofa(P, 1, { ... }); bol(P, 2, { ... });
//     P.render(n, { fondo: false });
//     cieloVentana(g, v.hueco, { t, rayas: RAYAS });                    // el cielo, DEBAJO
//     g.drawImage(lienzo de WebGL);                                      // la habitación, con el hueco transparente
//     vidrioVentana(g, v.hueco);                                         // el reflejo del vidrio, ENCIMA
//   }
//
// Cada función de pieza se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`,
// y acepta lo de P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los
// puntos del mundo (y, la ventana, de la pantalla) que hacen falta para poner otras cosas. Las piezas miran a +z (de
// cara a la cámara con rot [0, 0, 0]); su arriba es +y. tiposSofa(nombres?) da los tipos para tiposExtra (todos, o
// solo los nombrados). UNA VENTANA POR FOTOGRAMA (sus medidas van en un uniforme del kit, uVentana: para dos, dos fotos).
//
// LAS PIEZAS
//  · 'sofa' · sofa(P, i, { tela: 'oliva', plazas: 2, cojin: true, hundido: -1 })
//      Sofá de arcilla tapizado: bastidor, cojines del asiento (uno por plaza, algo abombados, con su costura), cojines
//      del respaldo, brazos redondeados y cuatro patas cortas de nogal; con cojin, un cojín suelto de ámbar a rayas
//      crema apoyado en el brazo izquierdo (el de −x). UNIDADES = LAS DE LA PERSONA (como la silla de ep03-tocar.js):
//      el centro de arriba del asiento en el origen (y = 0), el suelo en y = −0,427 (la altura del asiento de la postura
//      'sentada' del «humano»), el respaldo hacia −z (hasta z = −0,40) y el frente en z = +0,30. Mide de ancho 1,66
//      (2 plazas) o 2,32 (3), con los brazos, y 0,85 de alto hasta lo alto del respaldo (y = 0,42).
//      tela: 'oliva' · 'terracota' · 'mostaza' · 'pizarra' · 'crema' (TELAS). plazas: 2 o 3. hundido: la plaza (0, 1, 2
//      desde −x) cuyo cojín se hunde un poco donde se sienta alguien (−1: ninguna).
//      Devuelve { asiento(k): el centro de arriba del cojín k (mundo: ahí va h.punto('asiento') de la persona sentada),
//      brazoIzq, brazoDer: lo alto de cada brazo (mundo: ahí se apoya el bol), respaldo: lo alto del respaldo, en medio }.
//      sofaPara(asientoMundo, escalaPersona, rotY, plaza, plazas) da { pos, escala, rot } para que la plaza `plaza` caiga
//      en el asiento de una persona sentada (asientoMundo: h.punto('asiento') o esqueletoHumano('sentada').puntos.asiento
//      llevado al mundo).
//  · 'bol' · bol(P, i, { color: 'crema', palomitas: 1 })
//      Bol de cerámica vidriada lleno de palomitas: las palomitas son bolitas de arcilla crema con bultos (cada una
//      distinta), algo de mantequilla en los huecos y alguna cascarilla tostada; asoman en montón por encima del borde.
//      Unidades: el borde del bol tiene radio 0,5 y está en y = 0,36; la base, en y = 0 (se apoya en lo que tenga
//      debajo); con palomitas 1 el montón llega a y ≈ 0,56. color: 'crema' (crema con una raya de terracota bajo el
//      borde) · 'terracota' · 'pizarra' (BOLES). palomitas: 0 (vacío) … 1 (colmado).
//      Devuelve { base, boca: lo alto del montón, borde(ang): un punto del borde } (mundo).
//  · 'ventana' · ventana(P, i, { aspecto: 1.25, parteluz: 'cruz', pared: 'salvia', cortinas: true, muro: [3, 2.6, 2.4],
//                               suelo: 0 })
//      Un trozo de pared de yeso pintado (con su textura de llana y su rodapié) con una ventana: el hueco, el marco de
//      madera pintada de crema con su moldura, el parteluz y el alféizar; con cortinas, dos cortinas de tela de pliegues
//      recogidas a los lados, colgadas de una barra de latón. EL HUECO ESTÁ VACÍO (no hay vidrio en 3D): con el plató en
//      alfa: true y P.render(n, { fondo: false }) se ve lo que se pinte debajo (cieloVentana). Unidades: el hueco mide
//      1 de ancho (x de −0,5 a 0,5) y `aspecto` de alto (y de −aspecto/2 a aspecto/2), centrado en el origen; la cara de
//      la pared está en z = 0 (el marco sale hasta z ≈ 0,05 y el alféizar hasta z ≈ 0,13) y su grosor va hacia −z.
//      muro: [semiancho, hasta abajo, hasta arriba] del trozo de pared desde el centro del hueco (unidades del hueco); el
//      rodapié va en lo bajo de la pared. suelo: si es > 0, un suelo de tablas de madera (con las juntas y la veta) que
//      sale de lo bajo de la pared hacia +z hasta esa profundidad (unidades del hueco); 0, sin suelo.
//      parteluz: 'ninguno' (un solo vidrio) · 'cruz' (cuatro vidrios) · 'vertical' (dos hojas). pared: 'salvia' (verde
//      gris apagado) · 'crema' · 'arcilla' (rosa tostado) · 'pizarra' (PAREDES).
//      Devuelve { hueco: [[x, y] × 4] (px de diseño: arriba-izquierda, arriba-derecha, abajo-derecha, abajo-izquierda),
//      centro (mundo y px), punto(u, v): el punto del mundo del hueco en (u, v) ∈ [−0,5, 0,5]² (u a lo ancho, v a lo alto),
//      alfeizar: el centro de lo alto del alféizar (mundo), pared(x, y): un punto de la cara de la pared en unidades del
//      hueco (mundo; para colgar el reloj) }.
//
// EL CIELO DE LA VENTANA (2D; g con la transformación de 1920 × 1080)
//  · hornearRayas({ semilla: 3, ancho: 1024, alto: 640 }) → rayas: tres capas (lejos, medio, cerca) de estrellas en rayas
//    pintadas una vez al cargar (cada raya, una estela que se apaga detrás de una cabeza brillante; las cercanas, más
//    largas, gruesas y brillantes; blancas cálidas y alguna azulada) y una neblina de fondo (la Vía Láctea por dentro).
//  · cieloVentana(g, hueco, { t, rayas, velocidad: 1, angulo: −0,12, fuerza: 1, fondo: true, encima: null })
//      Pinta el cielo dentro del hueco (recortado al cuadrilátero hueco que devuelve ventana()): el fondo azul noche con
//      la neblina y las tres capas de rayas que corren (de derecha a izquierda y algo hacia abajo con angulo −0,12 rad),
//      cada una a su velocidad (paralaje). t en segundos (el del fotograma: ts); velocidad: 1 = una raya cercana cruza la
//      ventana en ~1,4 s; 0 = quietas (con velocidad 0 las rayas se vuelven puntos: estrellas quietas). fuerza: brillo
//      de las rayas (0…1). fondo: false no pinta el azul (solo rayas). encima(g): una función que pinta algo más dentro
//      del mismo recorte (Andrómeda en ep3-andromeda; la Tierra y la Luna en ep3-mapa), entre el fondo y las rayas
//      cercanas. Va DEBAJO del lienzo del plató (la pared tapa el borde del hueco). Unos milisegundos.
//  · vidrioVentana(g, hueco, { fuerza: 1 }): el vidrio, encima de todo: un reflejo frío en diagonal y un borde de luz
//    en el canto de arriba, muy suaves (que se lea que hay cristal). Unos milisegundos.
//  · recorteHueco(g, hueco): pone el recorte del hueco en g (para pintar dentro lo que se quiera, con save/restore).
//
// EL SALÓN (el plano final de ep3-mapa, el primero de ep3-andromeda)
//  · SALON: las medidas del salón con la cámara del plató de las pruebas (pos [0, 3,8, 15,5], mira [0, 2,3, 0], fov 28):
//    dónde van la pared con la ventana, el sofá, la persona («humano», 'sentada', aspecto 'adulto', de espaldas), el bol
//    y el reloj de pared (de ep03-tiempo.js), en dos encuadres: SALON.general (el plano entero) y SALON.cerca (por encima
//    del hombro, la ventana grande y el reloj al lado). El último fotograma de ep3-mapa es SALON.general con el reloj
//    en una hora (minutos 60, sector [0, 60]).
//  · salon(P, I, { encuadre: 'general', reloj: null, persona: {}, n }) pone las piezas del salón en el plató (entre
//    P.limpiar() y P.render): I = { ventana, sofa, persona, bol, reloj } (índices de las piezas; las que falten no se
//    ponen; el reloj necesita uniformesTiempo() y tiposTiempo(['reloj']) de ep03-tiempo.js y, en reloj, sus opciones:
//    { minutos, sector }). persona: lo que se quiera cambiar de su P.pieza (p. ej. postura). Devuelve { ventana (lo de
//    ventana()), sofa, bol, persona (h), reloj (lo de reloj()), encuadre }.
//
// COSTE (este servidor, 1920 × 1080; con otras escenas renderizando al lado, el doble o más): ver la hoja de prueba
// (window.__tiempos). La pared con la ventana llenando la pantalla, ~1–2 s (una foto al cargar: no va en vivo); el sofá
// de ~900 px, ~1 s; el bol de ~300 px, ~0,6 s; el cielo y el vidrio, unos milisegundos.
import * as THREE from 'three';
import { esqueletoHumano, postura } from '/atomo/plato/kits/plastilina-adulta.js';
import { reloj as relojTiempo } from '/atomo/plato/kits/ep03-tiempo.js';

const W = 1920, H = 1080;
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const mix = (a, b, x) => a + (b - a) * x;
function semillero(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export const TELAS = { oliva: 0, terracota: 1, mostaza: 2, pizarra: 3, crema: 4 };
export const BOLES = { crema: 0, terracota: 1, pizarra: 2 };
export const PAREDES = { salvia: 0, crema: 1, arcilla: 2, pizarra: 3 };
export const PARTELUZ = { ninguno: 0, cruz: 1, vertical: 2 };
const idx = (tabla, v, porDefecto = 0) => (typeof v === 'number' ? v : (tabla[v] ?? porDefecto));

// ---------------------------------------------------------------- GLSL común
const GLSL_COMUN = /* glsl */`
#ifndef SOFA_COMUN
#define SOFA_COMUN 1
uniform vec4 uVentana;    // aspecto · parteluz · pared · cortinas
uniform vec4 uVentana2;   // muro: semiancho · abajo · arriba · suelo (profundidad)
const vec3 SF_NOGAL = vec3(0.150, 0.085, 0.048);
const vec3 SF_LATON = vec3(0.470, 0.300, 0.085);
const vec3 SF_AMBAR = vec3(0.700, 0.360, 0.075);
const vec3 SF_CREMA = vec3(0.560, 0.490, 0.370);
float sfH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
float sfH2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
// vetas de madera a lo largo de un eje (u: a lo largo; w: las otras dos)
float sfVeta(float u, vec2 w, float f) {
  float n = vnoise(vec3(u * 0.6, w * 6.0));
  return sin((dot(w, vec2(1.0, 0.7)) + 0.12 * n + 0.02 * sin(u * 3.0)) * f);
}
#endif
`;

// ---------------------------------------------------------------- SOFÁ
// T: x cojín suelto (1) · y tela · z plazas · w plaza hundida (−1 ninguna)
const GLSL_SOFA = /* glsl */`
vec3 sfTela(float v) {
  if (v < 0.5) return vec3(0.118, 0.128, 0.068);   // oliva
  if (v < 1.5) return vec3(0.330, 0.105, 0.048);   // terracota
  if (v < 2.5) return vec3(0.380, 0.235, 0.055);   // mostaza
  if (v < 3.5) return vec3(0.068, 0.084, 0.110);   // pizarra
  return vec3(0.470, 0.410, 0.310);                // crema
}
// un cojín de asiento (abombado arriba, con el canto redondo); x local del cojín
float sfCojin(vec3 p, float hund) {
  float d = sdRoundBox(p - vec3(0.0, -0.068, 0.0), vec3(0.318, 0.062, 0.262), 0.055);
  float b = max(1.0 - p.x * p.x / 0.1, 0.0) * max(1.0 - p.z * p.z / 0.069, 0.0);
  d -= 0.016 * b;
  // hundido donde se sienta alguien
  d += hund * 0.03 * exp(-dot(p.xz, p.xz) / 0.03) * smoothstep(-0.07, 0.0, p.y);
  return d;
}
float sfRespaldo(vec3 p) {
  // cojín del respaldo, algo echado hacia atrás
  p.z += 0.09 * (p.y - 0.19);
  float d = sdRoundBox(p - vec3(0.0, 0.19, -0.205), vec3(0.315, 0.185, 0.07), 0.068);
  d -= 0.012 * max(1.0 - p.x * p.x / 0.1, 0.0) * max(1.0 - (p.y - 0.19) * (p.y - 0.19) / 0.034, 0.0);
  return d;
}
float pz_sofa(vec3 q, vec4 T, out float m) {
  float pl = T.z < 2.5 ? 2.0 : 3.0;
  float hw = pl * 0.33;                  // semiancho del hueco de los asientos
  float ax = hw + 0.085;                 // centro de los brazos
  // bastidor (debajo de los cojines)
  float base = sdRoundBox(q - vec3(0.0, -0.255, -0.05), vec3(hw + 0.16, 0.1, 0.345), 0.05);
  // respaldo (bastidor de atrás)
  float resp = sdRoundBox(q - vec3(0.0, 0.03, -0.335), vec3(hw + 0.16, 0.385, 0.068), 0.065);
  // brazos: una caja y un rulo arriba
  vec3 a = vec3(abs(q.x) - ax, q.y, q.z);
  float brazo = sdRoundBox(a - vec3(0.0, -0.08, -0.04), vec3(0.075, 0.27, 0.33), 0.06);
  brazo = smin(brazo, sdCapsule(a, vec3(0.012, 0.17, -0.36), vec3(0.012, 0.17, 0.29), 0.088), 0.04);
  float d = smin(min(base, resp), brazo, 0.02);
  m = 0.0;
  // cojines del asiento: el de esta plaza y el vecino (la costura entre los dos)
  float k = clamp(floor((q.x + hw) / 0.66), 0.0, pl - 1.0);
  float xk = -hw + 0.33 + 0.66 * k;
  float kv = clamp(k + (q.x > xk ? 1.0 : -1.0), 0.0, pl - 1.0);
  float xv = -hw + 0.33 + 0.66 * kv;
  float c1 = sfCojin(q - vec3(xk, 0.0, 0.012), abs(k - T.w) < 0.5 ? 1.0 : 0.0);
  float c2 = sfCojin(q - vec3(xv, 0.0, 0.012), abs(kv - T.w) < 0.5 ? 1.0 : 0.0);
  float cs = min(c1, c2);
  if (cs < d) m = 1.0;
  d = min(d, cs);
  // cojines del respaldo
  float r1 = sfRespaldo(q - vec3(xk, 0.0, 0.0)), r2 = sfRespaldo(q - vec3(xv, 0.0, 0.0));
  float rs = min(r1, r2);
  if (rs < d) m = 2.0;
  d = min(d, rs);
  // patas
  vec3 pp = vec3(abs(q.x) - (hw + 0.115), q.y, abs(q.z + 0.05) - 0.29);
  float pata = capsulaC(pp, vec3(0.0, -0.33, 0.0), vec3(0.0, -0.418, 0.0), 0.03, 0.022);
  if (pata < d) m = 3.0;
  d = min(d, pata);
  // cojín suelto, apoyado en el brazo izquierdo (−x) y el respaldo
  if (T.x > 0.5) {
    vec3 c = q - vec3(-hw + 0.13, 0.13, -0.15);
    float ca = 0.55, cb = 0.3;
    c.xy = mat2(cos(ca), sin(ca), -sin(ca), cos(ca)) * c.xy;
    c.yz = mat2(cos(cb), sin(cb), -sin(cb), cos(cb)) * c.yz;
    float cj = sdRoundBox(c, vec3(0.15, 0.15, 0.035), 0.04) - 0.02 * max(1.0 - c.x * c.x / 0.03, 0.0) * max(1.0 - c.y * c.y / 0.03, 0.0);
    if (cj < d) m = 4.0;
    d = min(d, cj);
  }
  return d;
}
float pzc_sofa(vec3 q, vec4 T) {
  float pl = T.z < 2.5 ? 2.0 : 3.0;
  float hw = pl * 0.33;
  float base = sdRoundBox(q - vec3(0.0, -0.2, -0.05), vec3(hw + 0.15, 0.15, 0.33), 0.05);
  float resp = sdRoundBox(q - vec3(0.0, 0.03, -0.335), vec3(hw + 0.15, 0.37, 0.06), 0.06);
  return min(base, resp);
}
vec3 pzcol_sofa(vec3 q, vec4 T, float m) {
  if (m > 3.5) {
    // cojín suelto: ámbar con rayas crema
    vec3 c = q - vec3(-T.z * 0.33 + 0.13, 0.13, -0.15);
    float r = smoothstep(0.35, 0.5, abs(fract((c.x + c.y) * 9.0) - 0.5) * 2.0);
    gBri = 0.7;
    return mix(SF_AMBAR * 0.82, SF_CREMA, 0.75 * r) * (0.92 + 0.12 * vnoise(q * 60.0));
  }
  if (m > 2.5) { gBri = 1.6; return SF_NOGAL * (0.9 + 0.12 * sfVeta(q.y, q.xz, 120.0)); }
  vec3 c = sfTela(T.y);
  // trama de la tela (relieve fino) y algo de variación
  float tr = sin(q.x * 520.0) * sin(q.y * 520.0 + q.z * 520.0);
  gG = vec3(0.0006 * cos(q.x * 520.0), 0.0006 * cos(q.y * 520.0), 0.0006 * cos(q.z * 520.0));
  c *= 0.9 + 0.08 * tr * 0.5 + 0.16 * (vnoise(q * 9.0) - 0.5);
  if (m > 0.5 && m < 1.5) c *= 1.06;          // los cojines del asiento, algo más claros (les da la luz)
  if (m > 1.5 && m < 2.5) c *= 1.0;
  if (m < 0.5) c *= 0.88;                     // el bastidor, más oscuro
  gBri = 0.55;
  return c;
}
`;

// ---------------------------------------------------------------- BOL DE PALOMITAS
// T: x palomitas (0…1) · y color del bol
const GLSL_BOL = /* glsl */`
const float BOL_R = 0.567;                // radio de la esfera del cuenco (borde de radio 0,5 en y = 0,36)
const float BOL_Y = 0.06;                 // el cuenco empieza encima del pie
float bolCuenco(vec3 q) {
  vec3 c = q - vec3(0.0, BOL_R + BOL_Y, 0.0);
  float sh = abs(length(c) - BOL_R + 0.02) - 0.02;
  sh = smax(sh, q.y - 0.36, 0.012);
  // el pie: un aro bajo
  vec2 pf = vec2(length(q.xz) - 0.19, q.y - 0.035);
  float pie = sdRoundRect(pf, vec2(0.03, 0.035), 0.012);
  return smin(sh, pie, 0.03);
}
// altura del montón de palomitas a la distancia r del eje
float bolMonton(float r, float k) { return 0.33 + k * 0.2 * (1.0 - r * r / 0.23); }
// una palomita: bolita con bultos (cada una distinta)
float bolPalomita(vec3 p, float r, float s) {
  vec3 v = p / r;
  float l = sin(v.x * 4.1 + s * 6.0) * sin(v.y * 3.7 + s * 11.0) * sin(v.z * 4.3 + s * 3.0);
  float l2 = sin(v.x * 7.3 - s * 5.0) * sin(v.y * 6.9 + s * 2.0) * sin(v.z * 7.7 - s * 9.0);
  return (length(p) - r * (1.0 + 0.22 * l + 0.1 * l2)) * 0.72;
}
float bolPalomitas(vec3 q, float k, out float cel) {
  cel = 0.0;
  if (k < 0.01) return 1e5;
  const float CS = 0.105;
  vec2 c0 = floor(q.xz / CS);
  float d = 1e5;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 c = c0 + vec2(float(i), float(j));
    float h1 = sfH2(c), h2 = sfH2(c + 7.31), h3 = sfH2(c + 3.17);
    vec2 xz = (c + 0.5 + 0.55 * (vec2(h1, h2) - 0.5)) * CS;
    float rr = length(xz);
    if (rr > 0.45) continue;
    float y = bolMonton(rr, k) + 0.03 * (h3 - 0.5);
    float r = 0.058 + 0.018 * h1;
    float dk = bolPalomita(q - vec3(xz.x, y, xz.y), r, h3 + h2);
    if (dk < d) { d = dk; cel = h1 + 2.0 * h3; }
  }
  // el relleno de debajo (que no se vea el fondo del bol entre palomitas)
  float rq = length(q.xz);
  float relleno = max(q.y - (bolMonton(rq, k) - 0.035), length(q - vec3(0.0, BOL_R + BOL_Y, 0.0)) - BOL_R + 0.045);
  d = smin(d, relleno, 0.03);
  return d;
}
float pz_bol(vec3 q, vec4 T, out float m) {
  float cu = bolCuenco(q);
  float cel;
  float pa = bolPalomitas(q, T.x, cel);
  m = 0.0;
  if (pa < cu) m = 1.0 + fract(cel);
  return min(cu, pa);
}
float pzc_bol(vec3 q, vec4 T) {
  float rq = length(q.xz);
  float e = length(q - vec3(0.0, BOL_R + BOL_Y, 0.0)) - BOL_R + 0.012;
  return max(max(e, q.y - max(bolMonton(rq, T.x) - 0.03, 0.34)), 0.06 - q.y);
}
vec3 pzcol_bol(vec3 q, vec4 T, float m) {
  if (m > 0.5) {
    // palomitas: crema muy clara, mantequilla en los huecos, alguna cascarilla tostada
    float s = fract(m);
    vec3 c = vec3(0.70, 0.64, 0.50) * (0.92 + 0.14 * vnoise(q * 40.0));
    float hueco = smoothstep(0.02, -0.03, q.y - bolMonton(length(q.xz), T.x));
    c = mix(c, vec3(0.56, 0.40, 0.14), 0.55 * hueco + 0.25 * smoothstep(0.6, 0.9, vnoise(q * 30.0 + s * 5.0)));
    float casc = step(0.82, s) * smoothstep(0.55, 0.75, vnoise(q * 55.0 + s * 13.0));
    c = mix(c, vec3(0.20, 0.10, 0.035), 0.85 * casc);
    gBri = 0.45;
    return c;
  }
  // el cuenco: vidriado (brillante), por dentro crema
  float r = length(q.xz);
  vec3 c = SF_CREMA * 1.04;
  float v = T.y;
  if (length(q - vec3(0.0, BOL_R + BOL_Y, 0.0)) > BOL_R - 0.02 && q.y < 0.35) {
    if (v < 0.5) {
      c = SF_CREMA * 1.05;
      float raya = smoothstep(0.006, 0.0, abs(q.y - 0.29) - 0.026) + smoothstep(0.004, 0.0, abs(q.y - 0.225) - 0.008);
      c = mix(c, vec3(0.42, 0.12, 0.05), raya);
    } else if (v < 1.5) c = vec3(0.40, 0.125, 0.055);
    else c = vec3(0.075, 0.09, 0.115);
  }
  c *= 0.95 + 0.08 * vnoise(q * 18.0);
  gBri = 2.6;
  return c;
}
`;

// ---------------------------------------------------------------- VENTANA (en su trozo de pared)
// uVentana: aspecto · parteluz (0 ninguno, 1 cruz, 2 vertical) · pared (color) · cortinas (0/1)
// uVentana2: semiancho del muro · cuánto baja · cuánto sube · suelo (profundidad, 0 sin suelo)
const GLSL_VENTANA = /* glsl */`
vec3 vnPared(float v) {
  if (v < 0.5) return vec3(0.150, 0.165, 0.125);   // salvia
  if (v < 1.5) return vec3(0.420, 0.370, 0.280);   // crema
  if (v < 2.5) return vec3(0.330, 0.175, 0.125);   // arcilla
  return vec3(0.080, 0.095, 0.115);                // pizarra
}
// el marco y el parteluz (todo lo de madera alrededor del hueco); m: 1 marco · 2 alféizar
float vnMadera(vec3 q, out float m) {
  float a = uVentana.x * 0.5;
  // el marco: un aro rectangular que sale de la pared (con una moldura) y el telar dentro del hueco
  vec2 b = vec2(0.5, a);
  float fuera = sdRoundRect(q.xy, b + 0.075, 0.02);
  float dentro = sdRoundRect(q.xy, b, 0.004);
  float aro = max(fuera, -dentro);
  float marco = max(aro, abs(q.z - 0.02) - 0.03);
  // la moldura (un junquillo redondo por fuera)
  marco = smin(marco, length(vec2(abs(sdRoundRect(q.xy, b + 0.06, 0.02)), q.z - 0.045)) - 0.016, 0.01);
  // el telar (el canto del hueco, hacia dentro de la pared)
  float telar = max(max(sdRoundRect(q.xy, b + 0.01, 0.004), -dentro), abs(q.z + 0.07) - 0.07);
  marco = min(marco, telar);
  // el parteluz: listones finos por dentro del hueco
  float pl = 1e5;
  if (uVentana.y > 0.5) {
    pl = sdRoundBox(q - vec3(0.0, 0.0, -0.02), vec3(0.018, a, 0.022), 0.006);
    if (uVentana.y < 1.5) pl = min(pl, sdRoundBox(q - vec3(0.0, 0.0, -0.02), vec3(0.5, 0.018, 0.022), 0.006));
  }
  // el junquillo de los vidrios (un filo fino por dentro del hueco)
  float junq = max(max(sdRoundRect(q.xy, b + 0.002, 0.004), -sdRoundRect(q.xy, b - 0.022, 0.004)), abs(q.z + 0.02) - 0.012);
  pl = min(pl, junq);
  marco = min(marco, pl);
  m = 1.0;
  // el alféizar: una tabla que sale de la pared bajo el hueco
  float alf = sdRoundBox(q - vec3(0.0, -a - 0.1, 0.06), vec3(0.62, 0.028, 0.085), 0.018);
  if (alf < marco) m = 2.0;
  return min(marco, alf);
}
// las cortinas: dos paños de pliegues, recogidos a los lados, colgados de una barra
float vnCortinas(vec3 q, out float m) {
  m = 0.0;
  if (uVentana.w < 0.5) return 1e5;
  float a = uVentana.x * 0.5;
  float yb = a + 0.2;                                        // la barra (va aparte: vnBarra)
  // cada paño: de x = ±0,58 a ±0,9, del suelo del hueco − 0,4 a la barra; recogido a media altura (más estrecho)
  vec3 c = vec3(abs(q.x), q.y, q.z);
  float yl = -a - 0.42;
  float u = clamp((c.y - yl) / (yb - yl), 0.0, 1.0);
  float rec = 1.0 - 0.45 * exp(-pow((u - 0.42) / 0.16, 2.0));  // el recogido
  float xc = 0.755 + 0.06 * (1.0 - rec);
  float hw = 0.16 * rec;
  float pli = 0.022 * sin((c.x - xc) / max(hw, 0.05) * 9.4 + 0.6) * (0.6 + 0.4 * rec);
  float pano = sdRoundBox(vec3(c.x - xc, c.y - (yl + yb) * 0.5, c.z - 0.12 - pli), vec3(hw, (yb - yl) * 0.5, 0.012), 0.01);
  m = 3.0;
  return pano * 0.8;
}
float vnBarra(vec3 q) {
  float yb = uVentana.x * 0.5 + 0.2;
  vec3 c = vec3(abs(q.x), q.y, q.z);
  return min(sdCapsule(q, vec3(-0.92, yb, 0.16), vec3(0.92, yb, 0.16), 0.018), length(c - vec3(0.95, yb, 0.16)) - 0.034);
}
float pz_ventana(vec3 q, vec4 T, out float m) {
  float a = uVentana.x * 0.5;
  // la pared: una losa con el hueco (de grosor 0,14 hacia −z)
  float L = uVentana2.x, y0 = -uVentana2.y, y1 = uVentana2.z;
  float pared = sdRoundBox(q - vec3(0.0, (y0 + y1) * 0.5, -0.07), vec3(L, (y1 - y0) * 0.5, 0.07), 0.02);
  pared = max(pared, -sdRoundRect(q.xy, vec2(0.5, a) + 0.01, 0.004));
  // el rodapié
  float rod = sdRoundBox(q - vec3(0.0, y0 + 0.07, 0.012), vec3(L, 0.07, 0.012), 0.006);
  m = 0.0;
  float d = pared;
  if (rod < d) m = 5.0;
  d = min(d, rod);
  // el suelo (tablas)
  if (uVentana2.w > 0.0) {
    float zs = uVentana2.w;
    float su = sdRoundBox(q - vec3(0.0, y0 - 0.05, zs * 0.5 - 0.14), vec3(L, 0.05, zs * 0.5 + 0.14), 0.01);
    if (su < d) m = 6.0;
    d = min(d, su);
  }
  float mm;
  // (coste) el marco y el alféizar, solo cerca del hueco; las cortinas, solo a los lados: lejos, su caja
  float cajaM = sdRoundBox(q - vec3(0.0, -0.05, 0.04), vec3(0.66, a + 0.2, 0.2), 0.0);
  if (cajaM < d) {
    float ma = cajaM > 0.05 ? cajaM : vnMadera(q, mm);
    if (ma < d) { d = ma; m = cajaM > 0.05 ? 1.0 : mm; }
  }
  if (uVentana.w > 0.5) {
    float ba = vnBarra(q);
    if (ba < d) { d = ba; m = 4.0; }
    float yb = a + 0.2, yl = -a - 0.42;
    float cajaC = sdRoundBox(vec3(abs(q.x) - 0.75, q.y - (yb + yl) * 0.5, q.z - 0.13), vec3(0.24, (yb - yl) * 0.5 + 0.06, 0.08), 0.0);
    if (cajaC < d) {
      float cu = cajaC > 0.05 ? cajaC : vnCortinas(q, mm);
      if (cu < d) { d = cu; m = cajaC > 0.05 ? 3.0 : mm; }
    }
  }
  return d;
}
float pzc_ventana(vec3 q, vec4 T) {
  float a = uVentana.x * 0.5;
  float L = uVentana2.x, y0 = -uVentana2.y, y1 = uVentana2.z;
  float pared = sdRoundBox(q - vec3(0.0, (y0 + y1) * 0.5, -0.07), vec3(L, (y1 - y0) * 0.5, 0.07), 0.02);
  pared = max(pared, -sdRoundRect(q.xy, vec2(0.5, a) + 0.02, 0.004));
  if (uVentana2.w > 0.0) pared = min(pared, sdRoundBox(q - vec3(0.0, y0 - 0.05, uVentana2.w * 0.5 - 0.14), vec3(L, 0.05, uVentana2.w * 0.5 + 0.14), 0.01));
  return pared;
}
vec3 pzcol_ventana(vec3 q, vec4 T, float m) {
  if (m > 5.5) {
    // suelo de tablas: nogal claro, juntas cada 0,16 y testas desplazadas
    float fila = floor(q.x / 0.16);
    float u = q.z + sfH(fila) * 3.0;
    float junta = smoothstep(0.004, 0.0, abs(fract(q.x / 0.16) - 0.5) * 0.16 - 0.077) + smoothstep(0.006, 0.0, abs(fract(u / 1.3) - 0.5) * 1.3 - 0.645);
    vec3 c = vec3(0.19, 0.108, 0.058) * (0.86 + 0.18 * sfH(fila + 0.5)) * (0.9 + 0.1 * sfVeta(q.z, vec2(q.x, q.y), 90.0));
    c *= 1.0 - 0.55 * clamp(junta, 0.0, 1.0);
    gBri = 1.5;
    return c;
  }
  if (m > 4.5) { gBri = 1.1; return SF_CREMA * 0.82 * (0.95 + 0.08 * vnoise(q * 30.0)); }    // rodapié
  if (m > 3.5) { gBri = 3.0; return SF_LATON * (0.9 + 0.2 * vnoise(q * 30.0)); }            // barra
  if (m > 2.5) {
    // cortinas: lino teja con su caída
    vec3 c = vec3(0.30, 0.115, 0.06) * (0.88 + 0.16 * vnoise(q * vec3(40.0, 4.0, 40.0)));
    gBri = 0.5;
    return c;
  }
  if (m > 0.5) {
    // madera pintada de crema (algo gastada en los cantos)
    vec3 c = SF_CREMA * (0.93 + 0.08 * vnoise(q * 25.0));
    if (m > 1.5) c *= 0.97;
    gBri = 1.3;
    return c;
  }
  // la pared: yeso pintado con marcas de llana y una mancha de luz cálida
  vec3 c = vnPared(uVentana.z);
  float ll = vnoise(q * vec3(3.0, 3.0, 1.0)) * 0.6 + vnoise(q * vec3(11.0, 9.0, 1.0)) * 0.4;
  c *= 0.9 + 0.16 * (ll - 0.5);
  // marcas de llana (relieve fino en la normal)
  gG = vec3(0.004 * (vnoise(q * vec3(6.0, 5.0, 1.0)) - 0.5), 0.004 * (vnoise(q * vec3(5.0, 6.0, 1.0) + 3.1) - 0.5), 0.0);
  gBri = 0.6;
  return c;
}
`;


// ---------------------------------------------------------------- MESITA (auxiliar, junto al sofá)
// T: y madera (0 nogal, 1 haya)
const GLSL_MESITA = /* glsl */`
float pz_mesita(vec3 q, vec4 T, out float m) {
  // tablero redondo (radio 0,22, canto redondeado) y tres patas abiertas que se afinan; el suelo en y = −0,55
  vec2 w = vec2(length(q.xz) - 0.2, q.y + 0.018);
  float tab = sdRoundRect(w, vec2(0.02, 0.016), 0.014) - 0.002;
  tab = min(tab, max(length(q.xz) - 0.21, abs(q.y + 0.018) - 0.016));
  float pa = 1e5;
  for (int k = 0; k < 3; k++) {
    float a = 6.2832 * float(k) / 3.0 + 0.6;
    vec2 c = vec2(cos(a), sin(a));
    pa = min(pa, capsulaC(q, vec3(c.x * 0.1, -0.03, c.y * 0.1), vec3(c.x * 0.17, -0.548, c.y * 0.17), 0.022, 0.012));
  }
  // un aro que une las patas a media altura
  float aro = length(vec2(length(q.xz) - 0.135, q.y + 0.32)) - 0.008;
  m = 0.0;
  return min(tab, min(pa, aro));
}
float pzc_mesita(vec3 q, vec4 T) { return max(length(q.xz) - 0.19, abs(q.y + 0.018) - 0.014); }
vec3 pzcol_mesita(vec3 q, vec4 T, float m) {
  vec3 c = T.y < 0.5 ? SF_NOGAL * 1.15 : vec3(0.20, 0.105, 0.048);
  float v = q.y > -0.04 ? sfVeta(q.x, q.zy, 140.0) : sfVeta(q.y, q.xz, 160.0);
  c *= 0.88 + 0.08 * v + 0.12 * (vnoise(q * vec3(3.0, 30.0, 3.0)) - 0.5);
  if (q.y > -0.003 && length(q.xz) < 0.19) c *= 1.1;
  gBri = 1.6;
  return c;
}
`;

const TIPOS = {
  sofa: { radio: 1.32, glifos: [], glsl: GLSL_COMUN + GLSL_SOFA },
  bol: { radio: 0.72, glifos: [], glsl: GLSL_COMUN + GLSL_BOL },
  ventana: { radio: 7.5, glifos: [], glsl: GLSL_COMUN + GLSL_VENTANA },
  mesita: { radio: 0.64, glifos: [], glsl: GLSL_COMUN + GLSL_MESITA },
};
export const TIPOS_SOFA = TIPOS;
export function tiposSofa(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-sofa: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
  return o;
}
export function uniformesSofa() {
  return { uVentana: { value: new THREE.Vector4(1.25, 1, 0, 1) }, uVentana2: { value: new THREE.Vector4(3, 2.6, 2.4, 0) } };
}
const exigir = (P, k) => { if (!P.U[k]) throw new Error(`ep03-sofa: crea el plató con uniformes: uniformesSofa() (falta ${k})`); };

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

export function sofa(P, i, o = {}) {
  const b = base(o);
  const plazas = (o.plazas ?? 2) >= 3 ? 3 : 2;
  P.pieza(i, { ...b, variante: idx(TELAS, o.tela ?? 'oliva'), color: plazas });
  escribirT(P, i, (o.cojin ?? true) ? 1 : 0, o.hundido ?? -1);
  const hw = plazas * 0.33;
  return {
    asiento: (k = 0) => mundoPieza(b, [-hw + 0.33 + 0.66 * k, 0, 0.012]),
    brazoIzq: mundoPieza(b, [-(hw + 0.085), 0.262, 0]), brazoDer: mundoPieza(b, [hw + 0.085, 0.262, 0]),
    respaldo: mundoPieza(b, [0, 0.42, -0.33]),
  };
}
// pos/escala/rot del sofá para que su plaza `plaza` caiga en el asiento de una persona sentada (de escala e)
export function sofaPara(asientoMundo, e, rotY = 0, plaza = 0, plazas = 2) {
  const hw = plazas * 0.33;
  const l = [-hw + 0.33 + 0.66 * plaza, 0, 0.012];
  const v = new THREE.Vector3(...l).multiplyScalar(e).applyEuler(new THREE.Euler(0, rotY, 0, 'YXZ'));
  return { pos: [asientoMundo[0] - v.x, asientoMundo[1] - v.y, asientoMundo[2] - v.z], escala: e, rot: [0, rotY, 0] };
}
export function bol(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: idx(BOLES, o.color ?? 'crema') });
  escribirT(P, i, cl(o.palomitas ?? 1), 0);
  const k = cl(o.palomitas ?? 1);
  return {
    base: mundoPieza(b, [0, 0, 0]), boca: mundoPieza(b, [0, k > 0 ? 0.33 + 0.2 * k + 0.06 : 0.1, 0]),
    borde: (ang) => mundoPieza(b, [0.5 * Math.cos(ang), 0.36, 0.5 * Math.sin(ang)]),
  };
}
export function mesita(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.madera === 'haya' ? 1 : 0 });
  return { tablero: mundoPieza(b, [0, 0, 0]), suelo: mundoPieza(b, [0, -0.55, 0]) };
}
export function ventana(P, i, o = {}) {
  exigir(P, 'uVentana');
  const b = base(o);
  const aspecto = o.aspecto ?? 1.25;
  const muro = o.muro ?? [3, 2.6, 2.4];
  P.U.uVentana.value.set(aspecto, idx(PARTELUZ, o.parteluz ?? 'cruz', 1), idx(PAREDES, o.pared ?? 'salvia'), (o.cortinas ?? true) ? 1 : 0);
  P.U.uVentana2.value.set(muro[0], muro[1], muro[2], o.suelo ?? 0);
  // (la esfera envolvente de la pieza tiene radio 7,5 unidades del hueco: el muro y el suelo tienen que caber en ella)
  P.pieza(i, b);
  const pt = (u, v, z = 0) => mundoPieza(b, [u, v, z]);
  const pr = (w) => P.proyectar(w);
  const a = aspecto / 2;
  const hueco = [pr(pt(-0.5, a)), pr(pt(0.5, a)), pr(pt(0.5, -a)), pr(pt(-0.5, -a))];
  const c = pt(0, 0);
  return {
    hueco, centro: { mundo: c, px: pr(c) }, aspecto,
    punto: (u, v) => pt(u, v * aspecto),
    alfeizar: pt(0, -a - 0.072, 0.06),
    pared: (x, y) => pt(x, y, 0),
  };
}

// ---------------------------------------------------------------- EL CIELO DE LA VENTANA (2D)
// las tres capas de rayas: [velocidad (px/s de la losa a velocidad 1), cuántas, largo, grueso, brillo]
const CAPAS_RAYAS = [
  { v: 70, n: 150, largo: [16, 46], grueso: [0.9, 1.4], brillo: [0.35, 0.7] },
  { v: 190, n: 70, largo: [40, 120], grueso: [1.4, 2.2], brillo: [0.55, 0.9] },
  { v: 520, n: 26, largo: [110, 280], grueso: [2.4, 3.8], brillo: [0.8, 1.0] },
];
const lienzo2 = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export function hornearRayas({ semilla = 3, ancho = 1024, alto = 640 } = {}) {
  const r = semillero(semilla * 7919 + 101);
  // la neblina del fondo: azul noche, una banda lechosa en diagonal y estrellitas quietas muy tenues
  const fondo = lienzo2(ancho, alto), gf = fondo.getContext('2d');
  const gr = gf.createLinearGradient(0, 0, 0, alto);
  gr.addColorStop(0, '#070a16'); gr.addColorStop(0.55, '#0c1224'); gr.addColorStop(1, '#141a2c');
  gf.fillStyle = gr; gf.fillRect(0, 0, ancho, alto);
  for (let i = 0; i < 26; i++) {
    const u = r(), x = u * ancho, y = alto * (0.78 - 0.55 * u) + (r() - 0.5) * alto * 0.28, R = 60 + 150 * r();
    const h = gf.createRadialGradient(x, y, 0, x, y, R);
    const c = r() < 0.6 ? '150,140,170' : '190,150,120';
    h.addColorStop(0, `rgba(${c},${0.05 + 0.06 * r()})`); h.addColorStop(1, `rgba(${c},0)`);
    gf.fillStyle = h; gf.fillRect(x - R, y - R, 2 * R, 2 * R);
  }
  for (let i = 0; i < 260; i++) {
    const x = r() * ancho, y = r() * alto, a = 0.12 + 0.3 * r() * r();
    gf.fillStyle = `rgba(230,225,215,${a})`; gf.fillRect(x, y, 1.2, 1.2);
  }
  // las capas (rayas y, en el mismo sitio, sus cabezas solas: con velocidad 0 se ven puntos)
  const capas = CAPAS_RAYAS.map((K, k) => {
    const rayas = lienzo2(ancho, alto), puntos = lienzo2(ancho, alto);
    const gr2 = rayas.getContext('2d'), gp = puntos.getContext('2d');
    const estrellas = [];
    for (let i = 0; i < K.n; i++) {
      estrellas.push({ x: r() * ancho, y: r() * alto, L: mix(K.largo[0], K.largo[1], r() * r()), g: mix(K.grueso[0], K.grueso[1], r()),
        b: mix(K.brillo[0], K.brillo[1], r()), frio: r() < 0.28 });
    }
    for (const e of estrellas) {
      const col = e.frio ? '200,215,255' : '255,236,205';
      // (para que la losa empalme sin costuras, cada raya se pinta también desplazada una losa a los lados y arriba/abajo)
      for (const dx of [-ancho, 0, ancho]) for (const dy of [-alto, 0, alto]) {
        const x = e.x + dx, y = e.y + dy;
        if (x + e.L < -10 || x > ancho + 10 || y < -10 || y > alto + 10) continue;
        // la estela: de la cabeza (x) hacia la derecha, apagándose
        const l = gr2.createLinearGradient(x, 0, x + e.L, 0);
        l.addColorStop(0, `rgba(${col},${e.b})`); l.addColorStop(0.25, `rgba(${col},${0.55 * e.b})`); l.addColorStop(1, `rgba(${col},0)`);
        gr2.strokeStyle = l; gr2.lineWidth = e.g; gr2.lineCap = 'round';
        gr2.beginPath(); gr2.moveTo(x, y); gr2.lineTo(x + e.L, y); gr2.stroke();
        if (k === 2) {
          // las cercanas, con un halo ancho y tenue
          gr2.lineWidth = e.g * 3.2; gr2.globalAlpha = 0.18;
          gr2.beginPath(); gr2.moveTo(x, y); gr2.lineTo(x + e.L * 0.7, y); gr2.stroke();
          gr2.globalAlpha = 1;
        }
        // la cabeza
        const R = e.g * (k === 2 ? 2.2 : 1.6);
        for (const gg of [gr2, gp]) {
          const h = gg.createRadialGradient(x, y, 0, x, y, R * 2.2);
          h.addColorStop(0, `rgba(255,250,240,${e.b})`); h.addColorStop(0.35, `rgba(${col},${0.6 * e.b})`); h.addColorStop(1, `rgba(${col},0)`);
          gg.fillStyle = h; gg.beginPath(); gg.arc(x, y, R * 2.2, 0, 2 * Math.PI); gg.fill();
        }
      }
    }
    return { rayas, puntos, v: K.v };
  });
  return { fondo, capas, ancho, alto };
}
export function recorteHueco(g, hueco) {
  g.beginPath();
  g.moveTo(hueco[0][0], hueco[0][1]);
  for (let k = 1; k < hueco.length; k++) g.lineTo(hueco[k][0], hueco[k][1]);
  g.closePath();
  g.clip();
}
const cajaHueco = (hueco) => {
  const xs = hueco.map((p) => p[0]), ys = hueco.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};
export function cieloVentana(g, hueco, { t = 0, rayas, velocidad = 1, angulo = -0.12, fuerza = 1, fondo = true, encima = null } = {}) {
  if (!rayas) throw new Error('ep03-sofa: cieloVentana necesita rayas: hornearRayas()');
  const [x0, y0, x1, y1] = cajaHueco(hueco);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, w = x1 - x0, h = y1 - y0;
  // la losa a escala de la ventana: unos 560 px de losa por cada 500 px de ancho de hueco
  const s = Math.max(w, h * 0.8) / 560;
  g.save();
  recorteHueco(g, hueco);
  if (fondo) {
    // el fondo, sin girar y cubriendo el hueco
    const k = Math.max(w / rayas.ancho, h / rayas.alto) * 1.05;
    g.drawImage(rayas.fondo, cx - rayas.ancho * k / 2, cy - rayas.alto * k / 2, rayas.ancho * k, rayas.alto * k);
  }
  const capa = (C, kk) => {
    const vr = cl(velocidad * 1.6), vp = 1 - vr;
    const off = ((t * C.v * velocidad) % rayas.ancho + rayas.ancho) % rayas.ancho;
    g.save();
    g.translate(cx, cy); g.rotate(angulo); g.scale(s, s);
    // lo que cubre el hueco girado, en px de la losa
    const R = Math.hypot(w, h) / 2 / s + 4;
    const nx0 = Math.floor((-R + off) / rayas.ancho) - 1, nx1 = Math.ceil((R + off) / rayas.ancho);
    const ny0 = Math.floor(-R / rayas.alto) - 1, ny1 = Math.ceil(R / rayas.alto);
    for (let ix = nx0; ix <= nx1; ix++) for (let iy = ny0; iy <= ny1; iy++) {
      const px = ix * rayas.ancho - off, py = iy * rayas.alto + kk * 97;
      if (px > R || px + rayas.ancho < -R || py > R || py + rayas.alto < -R) continue;
      if (vr > 0.003) { g.globalAlpha = fuerza * vr; g.drawImage(C.rayas, px, py); }
      if (vp > 0.003) { g.globalAlpha = fuerza * vp; g.drawImage(C.puntos, px, py); }
    }
    g.restore();
  };
  capa(rayas.capas[0], 0);
  capa(rayas.capas[1], 1);
  if (encima) { g.save(); encima(g); g.restore(); }
  g.globalCompositeOperation = 'lighter';
  capa(rayas.capas[2], 2);
  g.restore();
}
export function vidrioVentana(g, hueco, { fuerza = 1 } = {}) {
  if (fuerza <= 0.002) return;
  const [x0, y0, x1, y1] = cajaHueco(hueco);
  const w = x1 - x0, h = y1 - y0;
  g.save();
  recorteHueco(g, hueco);
  g.globalCompositeOperation = 'screen';
  // un reflejo frío en diagonal (dos bandas)
  const l = g.createLinearGradient(x0, y0, x0 + w * 0.8, y0 + h);
  l.addColorStop(0.0, 'rgba(160,185,220,0)');
  l.addColorStop(0.18, `rgba(160,185,220,${0.07 * fuerza})`);
  l.addColorStop(0.3, 'rgba(160,185,220,0)');
  l.addColorStop(0.42, 'rgba(160,185,220,0)');
  l.addColorStop(0.5, `rgba(160,185,220,${0.045 * fuerza})`);
  l.addColorStop(0.56, 'rgba(160,185,220,0)');
  g.fillStyle = l; g.fillRect(x0, y0, w, h);
  // el canto de arriba, con algo de luz cálida de la habitación
  const b = g.createLinearGradient(0, y0, 0, y0 + h * 0.12);
  b.addColorStop(0, `rgba(255,210,160,${0.1 * fuerza})`); b.addColorStop(1, 'rgba(255,210,160,0)');
  g.fillStyle = b; g.fillRect(x0, y0, w, h * 0.12);
  g.restore();
}

// ---------------------------------------------------------------- EL SALÓN (el final de ep3-mapa)
// Medidas en el mundo del plató, con la cámara de las pruebas, en el encuadre general. El encuadre «cerca» es el mismo
// salón escalado s veces alrededor de `pivote` (como acercar la cámara a ese punto: la perspectiva es la de verdad).
// La persona se sienta en la plaza de la derecha (la 0 del sofá, que mira hacia atrás) y mete la mano derecha en el bol,
// que está en una mesita junto al brazo del sofá.
export const SALON = {
  camara: { pos: [0, 3.8, 15.5], mira: [0, 2.3, 0], fov: 28 },
  ventana: { pos: [1.3, 3.75, -3.0], escala: 3.1, aspecto: 1.12, parteluz: 'cruz', pared: 'salvia', cortinas: true, muro: [3.3, 3.75 / 3.1, 1.25], suelo: 2.8 },
  persona: { pos: [-2.2, 2.4, 1.0], escala: 2.4, rot: [0, Math.PI - 0.35, 0], aspecto: 'adulto',
    cabeza: [-0.32, -0.12, 0.04], mirada: [-0.3, 0.35] },
  sofa: { tela: 'oliva', plazas: 2, plaza: 0, cojin: true },
  // la mesita, en unidades del sofá (de la persona): junto a su brazo −x (a la derecha de la persona)
  mesita: { en: [-(0.66 + 0.17 + 0.25), 0.123, 0.02] },
  bol: { color: 'crema', escala: 0.24, palomitas: 1, giro: 0.4 },
  // la mano derecha, dentro del bol: el punto (unidades del bol) que busca la palma
  mano: { en: [0.06, 0.5, 0.12] },
  reloj: { en: [-1.42, 0.36], escala: 0.62 },
  encuadres: { general: { s: 1, pivote: [0, 0, 0] }, cerca: { s: 1.55, pivote: [-0.2, 3.4, -1.2] } },
};
export function transformarSalon(encuadre = 'general') {
  const E = typeof encuadre === 'string' ? SALON.encuadres[encuadre] : encuadre;
  const { s, pivote: c } = E;
  return { s, p: (w) => [c[0] + (w[0] - c[0]) * s, c[1] + (w[1] - c[1]) * s, c[2] + (w[2] - c[2]) * s] };
}
// la postura de la persona del salón: sentada, la cabeza hacia la ventana y la mano derecha en el bol. El brazo se
// busca (flex, abd y codo) para que la palma caiga en `objetivo` (punto local de la persona); se guarda por objetivo
const cacheBrazo = new Map();
function brazoHacia(base, objetivo, asp) {
  const clave = objetivo.map((v) => v.toFixed(3)).join(',');
  if (cacheBrazo.has(clave)) return cacheBrazo.get(clave);
  const prueba = (f, a, c) => {
    const pz = { ...base, brazoDer: [f, a, 0.15, c, 1.25, 0.35], manoDer: 1.3 };
    const m = esqueletoHumano(pz, asp).puntos.manoDer;
    return Math.hypot(m[0] - objetivo[0], m[1] - objetivo[1], m[2] - objetivo[2]);
  };
  let mejor = [0.2, 0.5, 0.6], dm = 1e9;
  for (let f = -0.4; f <= 1.21; f += 0.16) for (let a = 0.0; a <= 1.41; a += 0.14) for (let c = 0.15; c <= 1.5; c += 0.15) {
    const d = prueba(f, a, c); if (d < dm) { dm = d; mejor = [f, a, c]; }
  }
  // afinar
  let paso = 0.08;
  for (let it = 0; it < 24; it++) {
    let mejoro = false;
    for (const k of [0, 1, 2]) for (const sg of [-1, 1]) {
      const v = [...mejor]; v[k] += sg * paso;
      if (v[2] < 0.1) continue;           // el codo, siempre algo doblado
      const d = prueba(...v); if (d < dm) { dm = d; mejor = v; mejoro = true; }
    }
    if (!mejoro) paso *= 0.5;
  }
  const r = { brazoDer: [mejor[0], mejor[1], 0.15, mejor[2], 1.25, 0.35], error: dm };
  cacheBrazo.set(clave, r);
  return r;
}
export function posturaSalon(objetivoLocal = null, extra = {}) {
  const Pe = SALON.persona;
  const base = { ...postura('sentada'), cabeza: Pe.cabeza, mirada: Pe.mirada, ...extra };
  if (!objetivoLocal) return base;
  const b = brazoHacia(base, objetivoLocal, Pe.aspecto);
  return { ...base, brazoDer: b.brazoDer, manoDer: 1.3 };
}
// del mundo a lo local de una pieza de persona (pos, escala, rot)
function localPersona(pos, e, rot, w) {
  // la inversa del giro: el giro transpuesto
  const R = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ')).transpose();
  const u = new THREE.Vector3(w[0] - pos[0], w[1] - pos[1], w[2] - pos[2]).applyMatrix4(R);
  return [u.x / e, u.y / e, u.z / e];
}
export function salon(P, I, { encuadre = 'general', reloj = null, persona = {}, sofa: oSofa = {}, bol: oBol = {}, ventana: oVen = {}, mano = true } = {}) {
  const X = transformarSalon(encuadre);
  const out = { encuadre };
  const V = { ...SALON.ventana, ...oVen };
  const colV = { pos: X.p(V.pos), escala: V.escala * X.s, rot: [0, 0, 0] };
  if (I.ventana != null) out.ventana = ventana(P, I.ventana, { ...V, ...colV });
  const pared = (x, y) => mundoPieza(colV, [x, y, 0]);
  // dónde queda el asiento de la persona sentada (sin plató: el esqueleto), y el sofá con su plaza ahí
  const Pe = { ...SALON.persona, ...persona };
  if (I.persona == null && I.sofa == null && I.mesita == null && I.bol == null) { colocarReloj(); return out; }
  const e = Pe.escala * X.s, pos = X.p(Pe.pos);
  const sk0 = esqueletoHumano(posturaSalon(null), Pe.aspecto);
  const aMundo = (l) => mundoPieza({ pos, escala: e, rot: Pe.rot }, l);
  const asiento = aMundo(sk0.puntos.asiento);
  const S = { ...SALON.sofa, ...oSofa };
  const colS = sofaPara(asiento, e, Pe.rot[1], S.plaza, S.plazas);
  out.sofa = I.sofa != null ? sofa(P, I.sofa, { ...colS, tela: S.tela, plazas: S.plazas, cojin: S.cojin, hundido: S.plaza }) : sofaInfo(colS, S.plazas);
  // la mesita, junto al brazo del sofá, y el bol encima
  const colM = { pos: mundoPieza(colS, SALON.mesita.en), escala: e, rot: [0, Pe.rot[1] + 0.3, 0] };
  out.mesita = I.mesita != null ? mesita(P, I.mesita, colM) : { tablero: mundoPieza(colM, [0, 0, 0]) };
  const B = { ...SALON.bol, ...oBol };
  const colB = { pos: out.mesita.tablero, escala: B.escala * e, rot: [0, Pe.rot[1] + B.giro, 0] };
  out.bol = I.bol != null ? bol(P, I.bol, { ...colB, color: B.color, palomitas: B.palomitas }) : null;
  // la persona, con la mano derecha en el bol
  if (I.persona != null) {
    const obj = mano ? localPersona(pos, e, Pe.rot, mundoPieza(colB, SALON.mano.en)) : null;
    const pz = Pe.postura ?? posturaSalon(obj);
    out.persona = P.pieza(I.persona, { pos, escala: e, rot: Pe.rot, postura: pz, aspecto: Pe.aspecto, t: Pe.t ?? 0, partes: Pe.partes ?? null, huellaFija: [0.37, 0.21, 0] });
  }
  colocarReloj();
  return out;
  // el reloj de pared (de ep03-tiempo.js), colgado en la pared junto a la ventana
  function colocarReloj() {
    if (I.reloj == null || !reloj) return;
    const R = SALON.reloj;
    const w = pared(R.en[0], R.en[1]);
    const posR = [w[0], w[1], w[2] + 0.1 * X.s];
    out.reloj = relojTiempo(P, I.reloj, { pos: posR, escala: R.escala * X.s, rot: [0, 0, 0], ...reloj });
  }
}
function sofaInfo(b, plazas) {
  const hw = plazas * 0.33;
  return {
    asiento: (k = 0) => mundoPieza(b, [-hw + 0.33 + 0.66 * k, 0, 0.012]),
    brazoIzq: mundoPieza(b, [-(hw + 0.085), 0.262, 0]), brazoDer: mundoPieza(b, [hw + 0.085, 0.262, 0]),
    respaldo: mundoPieza(b, [0, 0.42, -0.33]),
  };
}
