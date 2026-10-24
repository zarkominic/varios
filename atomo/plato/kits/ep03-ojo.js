// KIT DEL OJO · episodio 3 (lo crea ep3-hola; lo reutilizan ep3-ojo, ep3-pelo, ep3-celulas, ep3-andromeda y ep3-centro).
// Piezas de plastilina adulta para el plató de kits/plastilina-adulta.js (crearPlato), como tiposExtra. CONGELADO desde
// la entrega de ep3-hola: si una escena necesita otra cosa, la hace en su página (o en su propio kit) y lo dice.
// Hoja de prueba (un fotograma por pieza y por variante): escenas/kit-ep03-ojo.html (?vista=… para una sola).
//
// USO
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposOjo, uniformesOjo, ponerOjo, ponerCorte, CAPA, COSA, haciaCamara } from '/atomo/plato/kits/ep03-ojo.js';
//   const UO = uniformesOjo();
//   const P = await crearPlato({ piezas: [..., 'ojo', 'franja', 'cosa', 'ojoCorte'],
//     tiposExtra: tiposOjo({ cosas: ['celula', 'atomo', 'galaxia'] }), uniformes: UO, ... });
//   // en cada fotograma, entre P.limpiar() y P.render(n) (los uniformes no se borran solos: ponlos siempre):
//   ponerOjo(UO, { arriba: 0.2, abajo: 0.1, mirada: [0, 0], pupila: 0.5, entorna: 0 });
//   P.pieza(iOjo, { pos, escala, rot: haciaCamara(P, pos), variante: CAPA.TODO });
//
// LAS PIEZAS (cada una es un tipo; su tamaño, con la escala de P.pieza)
//  · 'ojo' — el ojo exterior de la persona (su ojo izquierdo: el lagrimal queda a la izquierda de la pantalla), de frente
//    (mira a +z), hundido en su cuenca. Globo de esclerótica crema con la córnea abombada, iris castaño con fibras y
//    collarete ámbar, pupila, brillo húmedo; dos párpados de piel (el de arriba con pestañas de arcilla en mechones, el de
//    abajo con las suyas pintadas), el pliegue del de arriba, el lagrimal rosado, la ceja y un trozo de cara alrededor
//    (una losa de piel de 6,8 × 4,6 unidades: la ceja, la frente, el pómulo, la sien y el arranque de la nariz).
//    Unidades locales: el centro del ojo en el origen; el globo, de radio OJO.R = 1, con su centro en z = −OJO.BZ. Los
//    párpados giran alrededor de una bisagra horizontal delante del globo (OJO.H), así que se juntan en dos rincones en
//    punta, en x = ±0,92 (OJO.EX = 1,15: la rendija es algo más ancha que el globo; se ve de unos ±0,8). Abierto, el borde
//    de arriba queda en y = +0,48 y el de abajo en −0,34 (en el centro); cerrados, se juntan en −0,04.
//    · Revisión de ep3-hola: abierto, el de arriba se afina hacia el borde (la cara del borde mira a la cámara: rosada y
//      húmeda, con la raya oscura de las raíces) y las pestañas salen de esa raya; antes salían de dentro de la concha y
//      asomaban sueltas por encima del borde. Más allá de los rincones la junta de los dos párpados se redondea (OJ_KR):
//      antes dejaba un surco en V bajo la piel que se veía como una costura horizontal desde cada rincón. Las pestañas cuya
//      raíz quede bajo la piel de alrededor (ceja) no salen.
//    · Los párpados se mueven con UNIFORMES (ponerOjo, en cada fotograma): arriba / abajo = cierre de cada párpado (0
//      abierto · 1 cerrado; < 0 abre algo más, hasta −0,1 se ve bien), mirada [x, y] (−1…1, hacia la derecha/izquierda de
//      la pantalla y arriba/abajo), pupila (0…1; 0,5 normal), entorna (0…1: el de abajo sube y el de arriba baja un poco,
//      mirar con esfuerzo), piel (factor del tono, 1 = la piel 'media' del «humano») y sombra (true: el globo y los
//      párpados dan sombra a la cara; false: no, y la cara no cambia al parpadear; ver ep3-hola).
//      aberturaOjo(arriba, abajo, entorna) da la y local (en el centro) del borde de cada párpado; cierreParaAbertura(y,
//      lado) el cierre que deja ese borde en y (para dejar la rendija justa sobre una franja: ±medio alto de la franja).
//    · variante = CAPA: TODO (0) · GLOBO (1, solo el globo: para una foto quieta) · PARPADOS (2, la piel y los párpados
//      sin el globo: por la rendija se ve lo de detrás). Con GLOBO + cosas + PARPADOS, compuestos en 2D por ese orden,
//      lo que pasa por delante del globo queda «tras los párpados» (ep3-hola). La sombra y la oclusión usan el ojo entero
//      (con sombra: true), así que el globo de una foto lleva la sombra de los párpados de ese instante.
//    · Encuadre: a pantalla completa, con la cámara de las pruebas, el ojo en P.punto(960, 540, 5) y la escala que dé el
//      ancho de rendija que se quiera (ep3-hola: 1380 / (2,1 · px por unidad)). Más cerca de la cámara la luz del plató
//      llega rasante; más lejos (z < 4,5), la parte de abajo del cuadro queda por debajo del suelo del plató y la oclusión
//      la ennegrece.
//  · 'franja' — la franja de luz: una losa emisiva horizontal (x de −1 a 1, con las puntas afinadas como una rendija),
//    luz blanca cálida. variante = medio alto (unidades locales: 0,08 es una franja de 0,16 de alto; puede bajar hasta
//    0,004, un borde fino); color = apagado (0 encendida · 1 apagada). Va delante del ojo, de cara a la cámara.
//    resplandorFranja(g, …) le pone el halo en 2D.
//  · 'cosa' — un solo tipo con la variante en T: lo que se apaga a los lados del ojo y lo que pasa por la franja.
//    variante = COSA.CELULA (0, célula abierta como un huevo frito: membrana, núcleo con nucléolo, mitocondrias) ·
//    ATOMO (1, un átomo cualquiera: núcleo de siete bolitas pizarra y crema y tres órbitas de alambre crema; no es Atom)
//    · GALAXIA (2, espiral de dos brazos: bulbo cálido, brazos azulados, carriles de polvo, cúmulos) · ESTRELLAS (3, un
//    puñado: doce estrellas de cinco puntas, la del kit, repetidas) · REMOLINO (4, la galaxia tenue: más pequeña,
//    borrosa y apagada) · TELEFONO (5, losa de 0,47 × 0,96 con la pantalla encendida, sin letras: un fondo y una
//    rejilla de iconos). color = apagado (0…1: pierde la luz propia y se oscurece). Todo cabe en un radio de 0,62;
//    la cara de cada una mira a +z (la galaxia y el remolino, de frente: inclínalos con rot).
//    tiposOjo({ cosas: [...] }) mete en el sombreador solo las variantes que se piden (programa más corto: compila antes
//    y cuesta algo menos); pedir una que no está da la primera de la lista.
//    El pelo y la Luna de la franja son los del kit compartido ('pelo', 'tronco', 'luna').
//  · 'ojoCorte' — el ojo en corte, de perfil: el globo (radio 1, centro en el origen) cortado por el plano z = 0, que se ve
//    desde +z: el anillo de la pared con sus capas (esclerótica, coroides, retina), la córnea delante (a −x, por donde
//    entra la luz), el iris, el cristalino, el nervio óptico detrás y, en la cara interior del fondo (x > 0), la REJILLA
//    DE LA RETINA: puntitos al tresbolillo (una sola forma repetida, CORTE.PASO de paso). variante 0: la córnea a −x · 1:
//    en espejo (a +x). Se ve mejor girado de tres cuartos, con el fondo alejándose de la cámara para mirar dentro:
//    rot [0,15, 0,55, 0] (variante 0) o [0,15, −0,55, 0] (variante 1); girado al revés se ve la retina por detrás.
//    · Uniformes (ponerCorte): separacion (en celdas de la rejilla, la distancia entre los dos puntos de luz del fondo;
//      con ≤ CORTE.FUSION = 1 ya no queda ninguna célula a oscuras entre ellos y se ven como uno), brillo (0…1) y haces
//      (0…1: los dos rayos que entran por la pupila, se cruzan en el cristalino y caen en los puntos). Las células que
//      reciben luz se encienden; las demás quedan pálidas.
//      puntosCorte(separacion) da dónde caen los dos puntos (locales), para poner algo junto a ellos.
//
// AYUDAS
//   haciaCamara(P, pos) → rot [x, y, 0] que pone la cara +z de una pieza en pos mirando a la cámara del plató.
//   resplandorFranja(g, x0, x1, y, alto, fuerza) → halo aditivo en 2D de una franja horizontal de pantalla (px de diseño).
//   sombraParpados(foto, { blur, dy, color }) → la sombra 2D de los párpados (una foto de la capa PARPADOS) sobre el globo.
//   vinetaOjo(gc, zo) → la piel se apaga hacia los bordes alrededor del ojo enorme (zo: su tamaño respecto al de ep3-hola).
//   EL FINAL DE ep3-hola (= el primer fotograma de ep3-ojo): HOLA (todas sus medidas), encuadreHola(P) (las colocaciones
//   en el plató) y pintarFinalHola(P, U, { ojo, franja, cosa }) → el lienzo de ese fotograma sin Atom ni post (Atom va en
//   HOLA.ATOM). Ver su comentario, al final del archivo, y la vista 18 de la hoja de prueba.
//
// COSTE (este servidor, 1920 × 1080, solo esta pieza, con la máquina tranquila): el ojo a pantalla completa, 1,5–2,5 s por
// fotograma (PARPADOS algo menos que TODO; lejos del ojo solo se calcula la piel, porque los párpados, el globo y las
// pestañas van dentro de un «if» que en casi toda la cara no se cumple, y eso sí ahorra); una cosa de 200 px, 0,1–0,3 s;
// el corte a 800 px, ~1 s; la franja larga, ~0,5 s (su esfera envolvente es grande: mejor una foto si no cambia). Cada
// tipo usado suma su programa a la carga (unos 2–4 s). ep3-hola, además, solo pinta de nuevo la zona de los párpados
// (setScissor) y remienda el resto con una foto: ver su función remendar().

import * as THREE from 'three';

export const CAPA = { TODO: 0, GLOBO: 1, PARPADOS: 2 };
export const COSA = { CELULA: 0, ATOMO: 1, GALAXIA: 2, ESTRELLAS: 3, REMOLINO: 4, TELEFONO: 5 };
const NOMBRES_COSA = ['celula', 'atomo', 'galaxia', 'estrellas', 'remolino', 'telefono'];
// geometría del ojo (unidades locales): radio del globo, su centro (z = −BZ), radio medio de los párpados, ancho de la
// rendija respecto al globo y elevación del borde de cada párpado abierto y cerrado (radianes, del punto delantero)
export const OJO = { R: 1, BZ: 0.35, RL: 1.06, EX: 1.15, H: 0.7, ARRIBA: 1.1, ABAJO: -0.85, CIERRE: -0.12 };
// rejilla de la retina del corte: paso (en tangente del ángulo desde el centro), radio interior de la pared
export const CORTE = { PASO: 0.11, RI: 0.86, FUSION: 1, V0: -0.48 };

const f = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));

// ---------------------------------------------------------------- GLSL común
const GLSL_OJO_COMUN = /* glsl */`
#ifndef OJO_COMUN
#define OJO_COMUN 1
uniform vec4 uOjoA;    // cierre del párpado de arriba · del de abajo · mirada x · mirada y
uniform vec4 uOjoB;    // pupila (0…1) · entorna (0…1) · piel (factor) · sombra (1: el globo y los párpados dan sombra a la cara)
uniform vec4 uCorte;   // separación (celdas) · brillo · haces · —
const float OJ_BZ = ${f(OJO.BZ)}, OJ_RL = ${f(OJO.RL)}, OJ_EX = ${f(OJO.EX)}, OJ_H = ${f(OJO.H)};
const float OJ_AU = ${f(OJO.ARRIBA)}, OJ_AL = ${f(OJO.ABAJO)}, OJ_AC = ${f(OJO.CIERRE)};
// redondeo de la junta de los dos párpados (crece de OJ_XR0 a OJ_XR1 en |x| / OJ_EX: desde dentro de la rendija hasta los rincones)
const float OJ_KR = 0.12, OJ_XR0 = 0.62, OJ_XR1 = 0.85;
float sdCajaO(vec3 p, vec3 b) { vec3 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0); }
#endif
`;

// ---------------------------------------------------------------- el ojo exterior
const GLSL_OJO = /* glsl */`
// los bordes de los párpados giran alrededor de una bisagra horizontal delante del centro del globo (pb.z = OJ_H), así
// que se juntan en dos rincones en punta (el lagrimal y el rabillo); ángulos: elevación del punto delantero del borde
vec2 ojBordes() {
  float en = uOjoB.y;
  float au = mix(OJ_AU, OJ_AC, uOjoA.x) - 0.16 * en;
  float al = mix(OJ_AL, OJ_AC, uOjoA.y) + 0.26 * en;
  return vec2(au, min(al, au - 0.004));
}
// la cara alrededor del ojo (z de la superficie): baja en los rincones, sube en la ceja, la frente, el pómulo y la
// nariz (a la izquierda: es el ojo izquierdo de la persona)
float ojZs(vec2 p) {
  float ax = abs(p.x), kx = ax / OJ_EX;
  float yc = 1.12 + 0.07 * (1.0 - (p.x + 0.2) * (p.x + 0.2) / 3.2);
  float dy = (p.y - yc) / 0.36;
  float ceja = exp(-dy * dy) * (1.0 - 0.3 * smoothstep(0.6, 2.2, p.x));
  float frente = smoothstep(1.15, 1.9, p.y);
  float mej = smoothstep(-0.26, -0.95, p.y) * exp(-(p.x - 0.2) * (p.x - 0.2) / 3.2) * 1.3;
  float sien = smoothstep(1.6, 2.7, ax);
  float nariz = smoothstep(-1.6, -2.6, p.x) * (1.0 - smoothstep(0.3, 1.6, abs(p.y + 0.25)));
  // los rincones (lagrimal y rabillo): un hoyo donde se juntan los párpados
  float bx = (kx - 0.72) / 0.1, by = p.y / 0.08;
  float hoyo = exp(-bx * bx - by * by);
  return 0.47 + 0.3 * ceja + 0.2 * frente + 0.3 * mej + 0.12 * sien + 0.34 * nariz - 0.06 * hoyo;
}
// mirada: dirección del centro de la córnea (desde el centro del globo)
vec3 ojMirada() { return normalize(vec3(uOjoA.z * 0.34, uOjoA.w * 0.28, 1.0)); }
// el borde de un párpado (ángulo a): un círculo de la concha; centro, radio y ejes de su plano
void ojBorde(float a, out vec3 cc, out float rho, out vec3 e2) {
  e2 = vec3(0.0, sin(a), cos(a));
  cc = vec3(0.0, 0.0, OJ_H) - e2 * (OJ_H * cos(a));
  rho = sqrt(OJ_RL * OJ_RL - OJ_H * OJ_H * sin(a) * sin(a));
}
// pestañas de un párpado: una por celda del borde, finas y curvadas hacia fuera y hacia la cámara
float ojPestanas(vec3 pb, float a, float lado, float largo, float dp) {
  vec3 cc, e2; float rho;
  ojBorde(a, cc, rho, e2);
  vec3 nP = vec3(0.0, cos(a), -sin(a)) * lado;
  vec3 w = pb - cc;
  float phi = atan(dot(w, e2), w.x);
  float id = floor(phi / dp);
  float ph = (id + 0.5) * dp + 0.25 * dp * (hash12(vec2(id, lado)) - 0.5);
  float s = sin(ph);
  float L = largo * smoothstep(0.7, 0.93, s) * (0.62 + 0.6 * hash12(vec2(id, 3.0 + lado)));
  vec3 B = cc + rho * (cos(ph) * vec3(1.0, 0.0, 0.0) + s * e2);
  vec3 nO = normalize(B);
  float h3 = hash12(vec2(id, 7.0 + lado));
  // mechones: las pestañas vecinas se juntan de dos en dos o de tres en tres
  float mech = sin(id * 2.1 + 1.3 * sin(id * 0.7));
  vec3 dir = normalize(nO * (1.0 + 0.45 * h3) + nP * (0.6 - 0.25 * h3) + vec3(0.12 * mech, 0.0, 0.0));
  if (hash12(vec2(id, 11.0)) < 0.12) L = 0.0;
  // la raíz, en la arista de delante del borde, justo por dentro de la piel de fuera del párpado: la pestaña sale del
  // borde mismo (con la raíz más adentro solo asomaba la punta, separada del borde). La piel de fuera, en el borde, está
  // en r = 1,058 con el ojo abierto (el párpado se afina, ver ojoD) y en 1,112 cerrándose
  float rFuera = mix(1.112, 1.058, smoothstep(0.45, 0.95, a));
  vec3 Bo = B + nO * (rFuera - OJ_RL - 0.006) - nP * 0.006;
  // si el borde queda bajo la piel de alrededor (el párpado muy abierto, bajo la ceja), sus pestañas no salen
  vec3 qB = vec3(Bo.x * OJ_EX, Bo.y, Bo.z - OJ_BZ);
  L *= smoothstep(0.0, 0.04, qB.z - ojZs(qB.xy));
  vec3 Ex = Bo + normalize(dir + nP * 0.25) * L;
  float c = capsulaC(pb, Bo, Ex, 0.0078, 0.0022);
  return c + ((L < 0.03) ? 1e5 : 0.0);
}
// el ojo: m 0 piel · 1 párpado · 2 globo · 5 pestañas · 6 lagrimal
float ojoD(vec3 q, float capa, out float m, bool fino) {
  vec3 k = vec3(q.x / OJ_EX, q.y, q.z);
  vec3 pb = k - vec3(0.0, 0.0, -OJ_BZ);
  float r = length(pb);
  // la piel: una losa con la superficie de ojZs, el borde blando y el hueco del globo
  float zs = ojZs(q.xy);
  float piel = (q.z - zs) * 0.74;
  piel = max(piel, zs - 0.4 - q.z);
  piel = smax(piel, sdRoundRect(q.xy, vec2(3.4, 2.3), 1.0), 0.3);
  piel = smax(piel, -(r - 1.016), 0.05);
  m = 0.0;
  // (coste) lejos del ojo solo hay piel: los párpados, el globo y las pestañas se calculan solo cerca (en SwiftShader
  // la rama se salta cuando todo el bloque de píxeles cae fuera, que es casi toda la cara)
  if (r > 1.42) return capa > 0.5 && capa < 1.5 ? 1e5 : piel;
  vec2 A = ojBordes();
  // los párpados: casquetes de una concha esférica sobre el globo, cortados por planos que giran en la bisagra
  float delante = max(-(pb.z + 0.1), abs(k.x) - 0.95);
  vec3 ph = pb - vec3(0.0, 0.0, OJ_H);
  float dU = dot(ph, vec3(0.0, cos(A.x), -sin(A.x)));
  // el de arriba se afina hacia el borde (de 0,104 a 0,05 de grueso, por fuera; por dentro sigue sobre el globo): abierto,
  // la cara del borde mira a la cámara y, gruesa, era una banda de piel entre la rendija y las pestañas
  // (solo con el ojo abierto: al cerrarse la cara del borde ya no mira a la cámara, y el borde grueso es el que se junta
  // con el de abajo)
  float af = mix(1.0, smoothstep(0.0, 0.16, dU), smoothstep(0.45, 0.95, A.x));
  float concha = (abs(r - mix(1.033, OJ_RL, af)) - mix(0.025, 0.052, af)) * 0.9;
  float conchaL = abs(r - 1.066) - 0.04;
  float pU = smax(smax(concha, -dU, 0.048), delante, 0.1);
  float pL = smax(smax(conchaL, -dot(ph, vec3(0.0, -cos(A.y), sin(A.y))), 0.032), delante, 0.1);
  // hacia los rincones la junta de los dos párpados se redondea (sin esto queda un surco en V que la piel copia)
  float par = smin(pU, pL, 0.001 + OJ_KR * smoothstep(OJ_XR0, OJ_XR1, abs(k.x)));
  // lagrimal: un bultito rosado en el rincón de dentro (izquierda de la pantalla)
  float lag = elipsoideP(k - vec3(-0.77, -0.025, 0.33), vec3(0.05, 0.04, 0.045));
  float cara = smin(piel, par, 0.13);
  cara = smin(cara, lag, 0.03);
  float pest = 1e5;
#ifndef OJ_SIN_PEST
  if (fino && abs(pb.y - 0.3) < 0.75 && abs(k.x) < 0.95) pest = ojPestanas(pb, A.x, 1.0, 0.115, 0.03);
#endif
  // el globo, la córnea y el hoyuelo de la pupila
  vec3 g = ojMirada();
  float globo = r - 1.0;
  globo = smin(globo, length(pb - g * 0.63) - 0.46, 0.09);
  if (fino) {
    float rho = mix(0.05, 0.14, uOjoB.x) * 1.1;
    globo = smax(globo, -(length(pb - g * 1.25) - sqrt(rho * rho + 0.0225)), 0.03);
  }
  if (capa > 0.5 && capa < 1.5) { cara = 1e5; pest = 1e5; lag = 1e5; }
  if (capa > 1.5) globo = 1e5;
  float d = min(cara, globo);
  if (globo <= cara) m = 2.0;
  else if (lag < min(piel, par) + 0.008) m = 6.0;
  else if (par < piel + 0.02) m = 1.0;
  if (pest < d) { m = 5.0; d = pest; }
  return d;
}
float pz_ojo(vec3 q, vec4 T, out float m) { return ojoD(q, T.y, m, true) * 0.95; }
// envolvente (nunca más lejos que la forma): la piel sin detalles y una esfera alrededor del globo, los párpados y las
// pestañas; el rayo llega barato hasta casi la superficie y solo entonces paga la forma entera
float pza_ojo(vec3 q, vec4 T) {
  vec3 pb = vec3(q.x / OJ_EX, q.y, q.z + OJ_BZ);
  float caja = sdCajaO(q - vec3(0.0, 0.0, 0.3), vec3(3.42, 2.32, 0.72));
  float piel = (q.z - ojZs(q.xy)) * 0.72 - 0.03;
  return max(caja, min(piel, length(pb) - 1.27));
}
// forma simplificada (sombras y oclusión): siempre por dentro de la de verdad, y barata (se evalúa ~30 veces por píxel)
float pzc_ojo(vec3 q, vec4 T) {
  vec3 k = vec3(q.x / OJ_EX, q.y, q.z);
  vec3 pb = k - vec3(0.0, 0.0, -OJ_BZ);
  float r = length(pb);
  float dy = (q.y - 1.18) / 0.36;
  float kx = (abs(q.x) / OJ_EX - 0.72) / 0.1, ky = q.y / 0.08;
  float zs = 0.47 + 0.27 * exp(-dy * dy) + 0.37 * smoothstep(-0.26, -0.95, q.y) * exp(-(q.x - 0.2) * (q.x - 0.2) / 3.2) - 0.07 * exp(-kx * kx - ky * ky);
  float piel = max((q.z - zs) * 0.7 + 0.02, -(r - 1.03));
  if (r > 1.3 || uOjoB.w < 0.5) return piel * 0.9;
  vec2 A = ojBordes();
  vec3 ph = pb - vec3(0.0, 0.0, OJ_H);
  float fuera = max(-(pb.z + 0.1), abs(k.x) - 0.92);
  float dU = dot(ph, vec3(0.0, cos(A.x), -sin(A.x))), af = mix(1.0, smoothstep(0.0, 0.16, dU), smoothstep(0.45, 0.95, A.x));
  float par = min(max(max(abs(r - mix(1.033, OJ_RL, af)) - mix(0.012, 0.035, af), fuera), -dU + 0.01),
                  max(max(abs(r - 1.066) - 0.025, fuera), -dot(ph, vec3(0.0, -cos(A.y), sin(A.y))) + 0.01));
#ifdef OJ_PZC0
  return 1e5;
#endif
  return min(min(piel, par), r - 0.985) * 0.9;
}
vec3 pzcol_ojo(vec3 q, vec4 T, float m) {
  vec3 k = vec3(q.x / OJ_EX, q.y, q.z);
  vec3 pb = k - vec3(0.0, 0.0, -OJ_BZ);
  vec3 cPiel = C_PIEL * uOjoB.z;
  float v = 0.95 + 0.1 * vnoise(q * 9.0);
  if (m > 4.5 && m < 5.5) { gBri = 0.7; return vec3(0.045, 0.03, 0.022) * (0.85 + 0.3 * vnoise(q * 30.0)); }
  if (m > 5.5) { gTr = 1.0; gBri = 1.8; return mix(cPiel, vec3(0.55, 0.22, 0.2), 0.55) * v; }
  if (m > 1.5) {
    // el globo: esclerótica con venitas hacia los rincones; iris castaño con fibras, collarete y anillo oscuro; pupila
    vec3 g = ojMirada();
    vec3 n = normalize(pb);
    float ang = acos(clamp(dot(n, g), -1.0, 1.0));
    vec3 e1 = normalize(cross(vec3(0.0, 1.0, 0.0), g)), e2 = cross(g, e1);
    float th = atan(dot(n, e2), dot(n, e1));
    float pr = mix(0.05, 0.14, uOjoB.x);
    const float RI = 0.345;
    gBri = 1.7;
    vec3 c;
    if (ang < RI) {
      float u = clamp((ang - pr) / (RI - pr), 0.0, 1.0);
      float fib = vnoise(vec3(th * 7.0, u * 2.0, 1.3)) * 0.6 + vnoise(vec3(th * 23.0, u * 5.0, 4.1)) * 0.4;
      c = vec3(0.10, 0.056, 0.03) * (0.6 + 0.9 * fib);
      c = mix(c, vec3(0.30, 0.15, 0.05) * (0.7 + 0.6 * fib), (1.0 - smoothstep(0.08, 0.26, abs(u - 0.3))) * 0.75);
      c *= mix(1.0, 0.35, smoothstep(0.78, 1.0, u));
      c = mix(vec3(0.012, 0.01, 0.009), c, smoothstep(0.0, 0.06, u));
      gBri = 2.2;
    } else {
      c = vec3(0.50, 0.455, 0.40) * (0.96 + 0.06 * vnoise(pb * 6.0));
      float rin = smoothstep(0.55, 1.0, abs(n.x));
      c = mix(c, c * vec3(1.0, 0.8, 0.76), rin * 0.75);
      float vena = 1.0 - smoothstep(0.0, 0.03, abs(vnoise(pb * vec3(5.0, 11.0, 5.0)) - 0.5));
      c = mix(c, vec3(0.42, 0.14, 0.11), vena * rin * 0.45);
      c *= mix(1.0, 0.85, smoothstep(RI, RI + 0.06, ang) * (1.0 - smoothstep(RI + 0.06, RI + 0.2, ang)));
    }
    // brillo húmedo: el reflejo de la ventana de luz, arriba a la izquierda de la córnea
    vec3 chv = normalize(g + vec3(-0.2, 0.24, 0.0));
    float rf = 1.0 - smoothstep(0.035, 0.065, acos(clamp(dot(n, chv), -1.0, 1.0)));
    gEm = vec3(0.95, 0.92, 0.86) * 0.32 * rf;
    return c;
  }
  // piel: algo translúcida; el borde de los párpados rosado y húmedo con la raya oscura de las pestañas; la ceja; el
  // pliegue de arriba; ojeras suaves
  gTr = 1.0;
  vec3 c = cPiel * v;
  vec2 A = ojBordes();
  float r = length(pb);
  vec3 ph = pb - vec3(0.0, 0.0, OJ_H);
  float bU = dot(ph, vec3(0.0, cos(A.x), -sin(A.x))), bL = dot(ph, vec3(0.0, -cos(A.y), sin(A.y)));
  float sobreConcha = 1.0 - smoothstep(0.02, 0.1, abs(r - OJ_RL - 0.04));
  float bm = min(bU, bL);
  c = mix(c, c * vec3(1.1, 0.8, 0.78), (1.0 - smoothstep(0.0, 0.09, bm)) * sobreConcha * 0.55);
  float raya = (1.0 - smoothstep(0.012, 0.03, abs(bm - 0.03))) * sobreConcha * step(OJ_RL + 0.02, r);
  c = mix(c, vec3(0.05, 0.035, 0.026), raya * (bU < bL ? 0.85 : 0.45));
  // la cara del borde de arriba (el lado del plano del párpado de arriba, bU > bL): rosada y húmeda por dentro y, por
  // fuera, la línea oscura de las raíces de las pestañas (abierto, la cara mira a la cámara: así las pestañas salen de una
  // raya y no de una banda de piel); todo en máscaras suaves, y se pierde antes de los rincones
  float enCara = (1.0 - smoothstep(0.012, 0.035, bU)) * smoothstep(0.0, 0.04, bU - bL)
               * (1.0 - smoothstep(1.06, 1.08, r)) * (1.0 - smoothstep(0.5, 0.68, abs(k.x)));
  if (enCara > 0.001) {
    float fuera = smoothstep(1.026, 1.042, r);
    c = mix(c, c * vec3(1.08, 0.78, 0.76), enCara * (1.0 - fuera) * 0.6);
    c = mix(c, vec3(0.05, 0.035, 0.026), enCara * fuera * 0.88);
  }
  if (bL < bU) {
    // pestañas de abajo, pintadas: rayitas cortas que salen del borde
    float phL = atan(ph.y, pb.x);
    float rl = 1.0 - smoothstep(0.25, 0.5, abs(fract(phL / 0.045) - 0.5) * 2.0);
    float lar = (1.0 - smoothstep(0.03, 0.085, bL)) * smoothstep(0.015, 0.03, bL) * sobreConcha;
    c = mix(c, vec3(0.06, 0.04, 0.03), rl * lar * 0.6 * smoothstep(0.75, 0.3, abs(k.x)));
  }
  if (m > 0.5) gBri = 1.3;
  // pliegue del párpado de arriba (queda en la piel, encima del párpado abierto)
  float yPl = 0.9 * sqrt(max(0.0, 1.0 - k.x * k.x / 1.1)) - 0.02;
  float pl = exp(-pow((q.y - yPl) / 0.05, 2.0)) * smoothstep(1.1, 0.5, abs(k.x));
  c *= 1.0 - 0.22 * pl;
  // ojera
  float oj = exp(-pow((q.y + 0.78 + 0.12 * k.x * k.x) / 0.18, 2.0)) * smoothstep(1.3, 0.3, abs(k.x));
  c = mix(c, c * vec3(0.86, 0.8, 0.86), oj * 0.4);
  // la ceja: pelos que salen hacia arriba en la cabeza (izquierda) y se tumban hacia fuera en la cola
  float yC = 1.1 + 0.11 * (1.0 - pow((q.x + 0.25) / 1.6, 2.0));
  float ancho = mix(0.14, 0.05, smoothstep(-1.3, 1.5, q.x));
  float masc = (1.0 - smoothstep(ancho - 0.04, ancho + 0.01, abs(q.y - yC + 0.012 * q.x))) * smoothstep(-1.5, -1.2, q.x) * (1.0 - smoothstep(1.4, 1.7, q.x));
  if (masc > 0.001) {
    vec2 hd = normalize(vec2(1.0, mix(1.6, -0.3, smoothstep(-1.3, 1.4, q.x))));
    vec2 hp = vec2(-hd.y, hd.x);
    float pel = vnoise(vec3(dot(q.xy, hp) * 95.0, dot(q.xy, hd) * 7.0, 2.0));
    float hilo = smoothstep(0.4, 0.66, pel) * masc;
    c = mix(c, vec3(0.06, 0.04, 0.027), hilo * 0.92);
    gBri = mix(gBri, 0.6, hilo);
  }
  return c;
}
`;

// ---------------------------------------------------------------- la franja de luz
const GLSL_FRANJA = /* glsl */`
float pz_franja(vec3 q, vec4 T, out float m) {
  float h = max(T.y, 0.004);
  float dz = min(h, 0.045);
  float hh = h * mix(0.4, 1.0, 1.0 - smoothstep(0.55, 1.0, abs(q.x)));
  m = 0.0;
  return sdRoundBox(q, vec3(1.0, hh, dz), min(hh, dz) * 0.95) * 0.85;
}
float pzc_franja(vec3 q, vec4 T) { float h = max(T.y, 0.004) * 0.4; return sdRoundBox(q, vec3(0.98, h, min(h, 0.04)), min(h, 0.04) * 0.9); }
vec3 pzcol_franja(vec3 q, vec4 T, float m) {
  float on = 1.0 - clamp(T.z, 0.0, 1.0);
  float perfil = mix(0.55, 1.0, 1.0 - smoothstep(0.3, 1.0, abs(q.x)));
  gEm = vec3(1.0, 0.87, 0.64) * 0.34 * on * perfil * (0.92 + 0.12 * vnoise(q * vec3(4.0, 20.0, 20.0)));
  gTr = 1.0; gBri = 0.6;
  return mix(vec3(0.16, 0.13, 0.1), vec3(0.62, 0.55, 0.43), on);
}
`;

// ---------------------------------------------------------------- las cosas (un tipo, variante en T)
const NUC_ATOMO = (() => {
  const out = [];
  for (let i = 0; i < 7; i++) {
    const y = 1 - (2 * (i + 0.5)) / 7, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 0.9;
    out.push([Math.cos(ph) * rr * 0.085, y * 0.08, Math.sin(ph) * rr * 0.085]);
  }
  return out;
})();
const ORB_ATOMO = [0, 1, 2].map((i) => new THREE.Matrix4().makeRotationZ(i * Math.PI / 3 + 0.3).multiply(new THREE.Matrix4().makeRotationX(0.4)));
const mat3glsl = (m4) => { const e = new THREE.Matrix3().setFromMatrix4(m4.clone().transpose()).elements; return `mat3(${e.map((x) => x.toFixed(5)).join(', ')})`; };
const ESTRELLAS = (() => {
  // doce estrellas en un puñado (x, y, z, tamaño)
  let s = 4242; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const out = [];
  while (out.length < 12) {
    const p = [r() * 2 - 1, r() * 2 - 1, (r() * 2 - 1) * 0.5];
    if (Math.hypot(p[0], p[1], p[2] * 2) > 1) continue;
    const t = 0.05 + 0.06 * Math.pow(r(), 2);
    if (out.some((o) => Math.hypot(o[0] - p[0] * 0.44, o[1] - p[1] * 0.44) < 0.15)) continue;
    out.push([p[0] * 0.44, p[1] * 0.44, p[2] * 0.2, t]);
  }
  return out;
})();

const GLSL_COSA = {
  celula: /* glsl */`
float csCelula(vec3 q, out float m) {
  float th = atan(q.y, q.x);
  float w = 1.0 + 0.04 * sin(3.0 * th + 0.7) + 0.025 * sin(5.0 * th + 2.0);
  float cuerpo = elipsoideP(q * vec3(1.0 / w, 1.0 / w, 1.0), vec3(0.47, 0.43, 0.15)) * 0.9;
  float rr = length(q.xy / vec2(0.47, 0.43) / w);
  float membrana = length(vec2((rr - 0.95) * 0.45, q.z - 0.015)) - 0.04;
  float nucleo = elipsoideP(q - vec3(0.07, 0.04, 0.085), vec3(0.165, 0.145, 0.105));
  float nucleolo = length(q - vec3(0.11, 0.075, 0.175)) - 0.045;
  float mito = capsulaC(q, vec3(-0.27, -0.1, 0.12), vec3(-0.17, -0.17, 0.125), 0.036, 0.034);
  mito = min(mito, capsulaC(q, vec3(0.15, -0.24, 0.115), vec3(0.27, -0.15, 0.105), 0.034, 0.032));
  mito = min(mito, capsulaC(q, vec3(-0.2, 0.18, 0.12), vec3(-0.09, 0.25, 0.11), 0.032, 0.03));
  float d = smin(cuerpo, membrana, 0.04);
  m = 0.0;
  if (membrana < cuerpo) m = 1.0;
  if (nucleo < d) m = 2.0;
  d = smin(d, nucleo, 0.03);
  if (nucleolo < d) m = 3.0;
  d = smin(d, nucleolo, 0.015);
  if (mito < d) m = 4.0;
  return smin(d, mito, 0.015);
}
float csCelulaC(vec3 q) { return elipsoideP(q, vec3(0.44, 0.40, 0.13)); }
vec3 csCelulaCol(vec3 q, float m) {
  float v = 0.92 + 0.16 * vnoise(q * 9.0);
  gTr = 1.0;
  if (m < 0.5) {
    vec2 cc = q.xy * 14.0 + 0.4 * vnoise(q * 5.0);
    float ves = (1.0 - smoothstep(0.14, 0.3, length(fract(cc) - 0.5))) * step(0.68, hash12(floor(cc)));
    gEm = vec3(0.5, 0.28, 0.22) * 0.03;
    return mix(vec3(0.52, 0.34, 0.28), vec3(0.44, 0.26, 0.22), ves * 0.4) * v;
  }
  if (m < 1.5) return vec3(0.46, 0.25, 0.22) * v;
  if (m < 2.5) { gEm = vec3(0.3, 0.1, 0.12) * 0.04; return vec3(0.30, 0.12, 0.15) * v; }
  if (m < 3.5) return vec3(0.17, 0.05, 0.08) * v;
  return vec3(0.30, 0.25, 0.09) * v;
}
`,
  atomo: /* glsl */`
const vec3 CS_NUC[7] = vec3[7](${NUC_ATOMO.map((p) => `vec3(${p.map((x) => x.toFixed(4)).join(', ')})`).join(', ')});
const mat3 CS_O0 = ${mat3glsl(ORB_ATOMO[0])};
const mat3 CS_O1 = ${mat3glsl(ORB_ATOMO[1])};
const mat3 CS_O2 = ${mat3glsl(ORB_ATOMO[2])};
float csOrbita(vec3 q, mat3 M, float fase, out float de) {
  vec3 r = M * q;
  float o = length(vec2(length(r.xz) - 0.4, r.y)) - 0.0115;
  vec3 e = vec3(cos(fase), 0.0, sin(fase)) * 0.4;
  de = length(r - e) - 0.036;
  return o;
}
float csAtomo(vec3 q, out float m) {
  float n = 1e5;
  for (int i = 0; i < 7; i++) n = smin(n, length(q - CS_NUC[i]) - 0.068, 0.012);
  float e0, e1, e2;
  float o = min(csOrbita(q, CS_O0, 0.6, e0), min(csOrbita(q, CS_O1, 2.6, e1), csOrbita(q, CS_O2, 4.7, e2)));
  float e = min(e0, min(e1, e2));
  m = 0.0;
  float d = n;
  if (o < d) { m = 1.0; d = o; }
  if (e < d) { m = 2.0; d = e; }
  return d;
}
float csAtomoC(vec3 q) { return length(q) - 0.15; }
vec3 csAtomoCol(vec3 q, float m) {
  if (m < 0.5) {
    // protones y neutrones: pizarra y crema según la bolita
    float best = 1e5, id = 0.0;
    for (int i = 0; i < 7; i++) { float dd = length(q - CS_NUC[i]); if (dd < best) { best = dd; id = float(i); } }
    gTr = 0.6;
    return mod(id, 2.0) < 0.5 ? vec3(0.2, 0.25, 0.31) : vec3(0.52, 0.47, 0.38);
  }
  if (m < 1.5) { gBri = 1.6; return vec3(0.54, 0.50, 0.42); }
  gEm = vec3(0.2, 0.32, 0.42) * 0.12;
  return vec3(0.16, 0.24, 0.32);
}
`,
  galaxia: /* glsl */`
// galaxia espiral de frente (en el plano xy): t = 0 nítida · 1 tenue (el remolino)
float csGalaxiaH(vec2 p, float t, out float brazo, out float polvo) {
  float r = length(p);
  float th = atan(p.y, p.x);
  float s = cos(2.0 * (th - 2.3 * log(max(r, 0.03) / 0.08)));
  brazo = mix(smoothstep(0.1, 0.95, s), smoothstep(-0.6, 1.0, s), t) * smoothstep(0.52, 0.16, r) * smoothstep(0.03, 0.1, r);
  float s2 = cos(2.0 * (th - 2.3 * log(max(r, 0.03) / 0.08)) - 0.9);
  polvo = smoothstep(0.75, 1.0, s2) * smoothstep(0.42, 0.14, r) * (1.0 - t);
  // sin plato: fuera de los brazos y del bulbo no hay arcilla (la galaxia se recorta como una espiral)
  float nucleo = smoothstep(0.3, 0.05, r);
  return -0.012 + mix(0.036, 0.024, t) * brazo + 0.018 * nucleo + 0.075 * exp(-r * r / 0.011);
}
float csGalaxia(vec3 q, float t, out float m) {
  float ra = mix(0.5, 0.42, t);
  vec3 k = q * (0.5 / ra);
  float b, pl;
  float h = csGalaxiaH(k.xy, t, b, pl);
  float disco = (abs(k.z) - h + 0.008 * pl) * 0.35;
  disco = max(disco, length(k.xy) - 0.5);
  float bulbo = elipsoideP(k, vec3(0.1, 0.1, 0.072));
  m = 0.0;
  return smin(disco, bulbo, 0.04) * (ra / 0.5);
}
float csGalaxiaC(vec3 q, float t) { return max(abs(q.z) - 0.006, length(q.xy) - 0.14); }
vec3 csGalaxiaCol(vec3 q, float t) {
  float ra = mix(0.5, 0.42, t);
  vec3 k = q * (0.5 / ra);
  float b, pl;
  csGalaxiaH(k.xy, t, b, pl);
  float r = length(k.xy);
  vec3 nucleo = vec3(0.62, 0.45, 0.24);
  vec3 c = mix(vec3(0.03, 0.033, 0.045), vec3(0.20, 0.25, 0.34), b);
  c = mix(c, nucleo, exp(-r * r / 0.012));
  c = mix(c, vec3(0.05, 0.035, 0.025), pl * 0.8);
  c *= mix(0.35, 1.0, smoothstep(0.5, 0.3, r));
  gBri = 0.5;
  // cúmulos blanco-azulados en los brazos
  vec2 cel = floor(k.xy * 26.0);
  float h = hash12(cel);
  float cu = (1.0 - smoothstep(0.12, 0.32, length(fract(k.xy * 26.0) - 0.5))) * step(0.8, h) * b;
  c = mix(c, vec3(0.55, 0.6, 0.7), cu * (1.0 - t));
  vec3 em = nucleo * exp(-r * r / 0.02) * 0.32 + vec3(0.35, 0.42, 0.55) * (0.08 * b * smoothstep(0.5, 0.3, r) + 0.25 * cu);
  float apagada = mix(1.0, 0.4, t);
  gEm = em * apagada;
  gTr = 0.5;
  return mix(c, vec3(0.05, 0.055, 0.065), t * 0.6) * mix(1.0, 0.6, t);
}
`,
  estrellas: /* glsl */`
const vec4 CS_EST[12] = vec4[12](${ESTRELLAS.map((p) => `vec4(${p.map((x) => x.toFixed(4)).join(', ')})`).join(', ')});
float csEstrella(vec3 q) {
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.1;
  vec2 w = vec2(d2, abs(q.z) - 0.05);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.1;
}
float csEstrellas(vec3 q, out float m) {
  float d = 1e5;
  m = 0.0;
  for (int i = 0; i < 12; i++) {
    vec4 e = CS_EST[i];
    float a = float(i) * 1.7;
    vec3 k = (q - e.xyz) / e.w;
    k.xy = mat2(cos(a), -sin(a), sin(a), cos(a)) * k.xy;
    float di = csEstrella(k) * e.w;
    if (di < d) { d = di; m = float(i); }
  }
  return d;
}
float csEstrellasC(vec3 q) {
  float d = 1e5;
  for (int i = 0; i < 12; i++) d = min(d, length(q - CS_EST[i].xyz) - CS_EST[i].w * 0.3);
  return d;
}
vec3 csEstrellasCol(vec3 q, float m) {
  float h = fract(m * 0.618);
  vec3 c = mix(vec3(0.62, 0.52, 0.34), vec3(0.5, 0.55, 0.62), step(0.6, h));
  gEm = c * 0.32;
  gBri = 1.4;
  return c;
}
`,
  telefono: /* glsl */`
float csTelefono(vec3 q, out float m) {
  float d = sdRoundBox(q, vec3(0.235, 0.48, 0.036), 0.034);
  float pant = sdRoundBox(q - vec3(0.0, 0.0, 0.04), vec3(0.213, 0.455, 0.008), 0.028);
  d = smax(d, -pant, 0.004);
  float cam = length(q - vec3(0.0, 0.43, 0.032)) - 0.012;
  float bot = sdRoundBox(q - vec3(0.24, 0.17, 0.0), vec3(0.008, 0.06, 0.016), 0.007);
  m = q.z > 0.028 && abs(q.x) < 0.205 && abs(q.y) < 0.447 ? 1.0 : 0.0;
  if (cam < d) m = 2.0;
  d = smax(d, -cam, 0.004);
  if (bot < d) m = 3.0;
  return min(d, bot);
}
float csTelefonoC(vec3 q) { return sdRoundBox(q, vec3(0.22, 0.46, 0.03), 0.03); }
vec3 csTelefonoCol(vec3 q, float m) {
  if (m < 0.5) { gBri = 2.4; return vec3(0.05, 0.05, 0.056); }
  if (m > 2.5) { gBri = 2.6; return vec3(0.09, 0.09, 0.1); }
  if (m > 1.5) return vec3(0.01);
  // la pantalla: un fondo de luz cálida y una rejilla de iconos redondeados, sin letras
  vec2 p = q.xy;
  vec3 fondo = mix(vec3(0.20, 0.26, 0.34), vec3(0.42, 0.30, 0.20), smoothstep(-0.4, 0.45, p.y + 0.15 * p.x));
  vec2 g = (p - vec2(-0.15, 0.32)) / vec2(0.1, 0.105);
  vec2 id = floor(g + 0.5);
  float ic = 0.0;
  vec3 col = fondo;
  if (id.x >= 0.0 && id.x <= 3.0 && id.y <= 0.0 && id.y >= -4.0) {
    float s = sdRoundRect(g - id, vec2(0.3), 0.12);
    ic = 1.0 - smoothstep(0.0, 0.03, s);
    float h = hash12(id + 7.0);
    vec3 ci = h < 0.25 ? vec3(0.55, 0.35, 0.12) : h < 0.5 ? vec3(0.22, 0.30, 0.14) : h < 0.75 ? vec3(0.50, 0.17, 0.08) : vec3(0.42, 0.44, 0.46);
    col = mix(col, ci, ic);
  }
  float dock = 1.0 - smoothstep(0.0, 0.01, sdRoundRect(p - vec2(0.0, -0.39), vec2(0.18, 0.045), 0.04));
  col = mix(col, col * 1.3 + 0.05, dock * 0.4);
  gEm = col * 0.42;
  gBri = 1.8;
  return col * 0.5;
}
`,
};
GLSL_COSA.remolino = GLSL_COSA.galaxia;

function glslCosa(cosas) {
  const partes = [...new Set(cosas.map((n) => (n === 'remolino' ? 'galaxia' : n)))].map((n) => GLSL_COSA[n]).join('\n');
  // rama por variante (solo las pedidas); una variante que no está da la primera
  const ramas = (fn) => cosas.map((n) => `  if (abs(v - ${COSA[n.toUpperCase()].toFixed(1)}) < 0.5) return ${fn(n)};\n`).join('');
  const primera = cosas[0];
  const pz = (n) => ({ celula: 'csCelula(q, m)', atomo: 'csAtomo(q, m)', galaxia: 'csGalaxia(q, 0.0, m)', remolino: 'csGalaxia(q, 1.0, m)', estrellas: 'csEstrellas(q, m)', telefono: 'csTelefono(q, m)' })[n];
  const pzc = (n) => ({ celula: 'csCelulaC(q)', atomo: 'csAtomoC(q)', galaxia: 'csGalaxiaC(q, 0.0)', remolino: 'csGalaxiaC(q * 1.19, 1.0) / 1.19', estrellas: 'csEstrellasC(q)', telefono: 'csTelefonoC(q)' })[n];
  const col = (n) => ({ celula: 'csCelulaCol(q, m)', atomo: 'csAtomoCol(q, m)', galaxia: 'csGalaxiaCol(q, 0.0)', remolino: 'csGalaxiaCol(q, 1.0)', estrellas: 'csEstrellasCol(q, m)', telefono: 'csTelefonoCol(q, m)' })[n];
  return `${partes}
float pz_cosa(vec3 q, vec4 T, out float m) {
  float v = floor(T.y + 0.5);
  m = 0.0;
${ramas(pz)}  return ${pz(primera)};
}
float pzc_cosa(vec3 q, vec4 T) {
  float v = floor(T.y + 0.5);
${ramas(pzc)}  return ${pzc(primera)};
}
vec3 cosaColor(vec3 q, vec4 T, float m) {
  float v = floor(T.y + 0.5);
${ramas(col)}  return ${col(primera)};
}
vec3 pzcol_cosa(vec3 q, vec4 T, float m) {
  vec3 c = cosaColor(q, T, m);
  // apagado: pierde la luz propia y se hunde en la sombra
  float ap = clamp(T.z, 0.0, 1.0);
  gEm *= 1.0 - ap;
  float l = dot(c, vec3(0.3, 0.5, 0.2));
  return mix(c, vec3(l) * 0.25, ap * 0.85);
}
`;
}

// ---------------------------------------------------------------- el ojo en corte
const GLSL_CORTE = /* glsl */`
const float OC_RI = ${f(CORTE.RI)}, OC_PASO = ${f(CORTE.PASO)}, OC_V0 = ${f(CORTE.V0)};
const vec3 OC_LENTE = vec3(-0.66, 0.0, -0.1);
// los dos puntos de luz en el fondo (dirección desde el centro)
vec3 ocPunto(float lado) { return normalize(vec3(1.0, lado * 0.5 * uCorte.x * OC_PASO, OC_V0)); }
// célula de la rejilla más cercana (en tangentes u = y/x, v = z/x, al tresbolillo): su centro (u, v)
vec2 ocCelda(vec3 q) {
  vec2 uv = q.yz / max(q.x, 0.05);
  vec2 a = vec2(uv.x / OC_PASO, uv.y / (OC_PASO * 0.866));
  float fila = floor(a.y + 0.5);
  float off = 0.5 * mod(fila, 2.0);
  float col = floor(a.x - off + 0.5) + off;
  vec2 c1 = vec2(col * OC_PASO, fila * OC_PASO * 0.866);
  // la fila de al lado puede estar más cerca
  float fila2 = fila + (a.y > fila ? 1.0 : -1.0);
  float off2 = 0.5 * mod(fila2, 2.0);
  vec2 c2 = vec2((floor(a.x - off2 + 0.5) + off2) * OC_PASO, fila2 * OC_PASO * 0.866);
  return length(uv - c1) < length(uv - c2) ? c1 : c2;
}
float ocLuz(vec2 uv) {
  float s = 0.5 * uCorte.x * OC_PASO, sg = 0.45 * OC_PASO;
  vec2 a = vec2(s, OC_V0), b = vec2(-s, OC_V0);
  return (exp(-dot(uv - a, uv - a) / (2.0 * sg * sg)) + exp(-dot(uv - b, uv - b) / (2.0 * sg * sg))) * uCorte.y;
}
float ocCorteD(vec3 q, out float m, bool celdas) {
  float r = length(q);
  float pared = max(r - 1.0, OC_RI - r);
  // abertura delante (la córnea ocupa su sitio)
  pared = smax(pared, -max(length(q.yz) - 0.5, -(q.x + 0.72)), 0.03);
  float cornea = max(abs(length(q - vec3(-0.42, 0.0, 0.0)) - 0.62) - 0.024, q.x + 0.78);
  float iris = max(abs(q.x + 0.79) - 0.024, max(length(q.yz) - 0.5, 0.16 - length(q.yz)));
  float lente = elipsoideP(q - vec3(-0.66, 0.0, 0.0), vec3(0.12, 0.33, 0.33));
  float nervio = smax(capsulaC(q, vec3(0.86, -0.07, 0.0), vec3(1.42, -0.2, 0.0), 0.15, 0.12), OC_RI + 0.02 - r, 0.02);
  float cel = 1e5;
  if (celdas && q.x > 0.2) {
    vec2 c = ocCelda(q);
    vec3 C = OC_RI * normalize(vec3(1.0, c));
    cel = length(q - C) - 0.03;
    cel = max(cel, max(-(q.x - 0.35), c.y + 0.12));
  }
  float d = min(pared, min(cornea, min(iris, lente)));
  d = smin(d, cel, 0.012);
  m = 0.0;
  if (cornea <= d + 0.001) m = 1.0;
  if (iris <= d + 0.001) m = 2.0;
  if (lente <= d + 0.001) m = 3.0;
  if (cel <= d + 0.004) m = 5.0;
  d = max(d, q.z);   // el corte (el nervio queda entero)
  if (nervio < d) m = 4.0;
  d = min(d, nervio);
  // los haces de luz (delante del corte no: van por dentro, un poco detrás del plano)
  float hz = uCorte.z;
  if (hz > 0.001) {
    float rh = 0.016 * hz;
    float hs = 1e5;
    for (int i = 0; i < 2; i++) {
      vec3 P = OC_RI * ocPunto(i == 0 ? 1.0 : -1.0);
      vec3 O = OC_LENTE + (OC_LENTE - P) * 1.08;
      hs = min(hs, capsulaC(q, O, P, rh * 1.3, rh * 0.7));
    }
    if (hs < d) m = 6.0;
    d = min(d, hs);
  }
  return d;
}
float pz_ojoCorte(vec3 q, vec4 T, out float m) { if (T.y > 0.5) q.x = -q.x; return ocCorteD(q, m, true) * 0.9; }
float pzc_ojoCorte(vec3 q, vec4 T) { if (T.y > 0.5) q.x = -q.x; float m; return ocCorteD(q, m, false) * 0.9 + 0.01; }
vec3 pzcol_ojoCorte(vec3 q, vec4 T, float m) {
  if (T.y > 0.5) q.x = -q.x;
  float r = length(q);
  float v = 0.94 + 0.12 * vnoise(q * 8.0);
  if (m > 5.5) { gEm = vec3(1.0, 0.86, 0.62) * 0.33; return vec3(0.6, 0.53, 0.4); }
  if (m > 4.5) {
    vec2 uv = q.yz / max(q.x, 0.05);
    float l = ocLuz(ocCelda(q));
    gEm = vec3(1.0, 0.82, 0.55) * 0.75 * l;
    gTr = 1.0;
    return mix(vec3(0.42, 0.27, 0.22), vec3(0.62, 0.5, 0.36), clamp(l, 0.0, 1.0)) * v;
  }
  if (m > 3.5) { gTr = 1.0; return vec3(0.44, 0.30, 0.22) * v; }
  if (m > 2.5) { gTr = 1.0; gBri = 1.8; gEm = vec3(0.4, 0.3, 0.15) * 0.03; return vec3(0.52, 0.42, 0.26) * v; }
  if (m > 1.5) return vec3(0.12, 0.065, 0.035) * v;
  if (m > 0.5) { gBri = 2.2; return vec3(0.38, 0.42, 0.45) * v; }
  // la pared: en la cara del corte, las tres capas; por dentro, la retina oscura con un brillo donde cae la luz
  if (q.z > -0.02) {
    if (r > 0.94) return vec3(0.52, 0.47, 0.40) * v;
    if (r > 0.9) return vec3(0.16, 0.06, 0.04) * v;
    gTr = 1.0;
    return vec3(0.45, 0.24, 0.2) * v;
  }
  vec2 uv = q.yz / max(q.x, 0.05);
  float l = q.x > 0.2 ? ocLuz(uv) : 0.0;
  gEm = vec3(1.0, 0.8, 0.5) * 0.22 * l;
  return vec3(0.26, 0.10, 0.08) * v;
}
`;

// ---------------------------------------------------------------- API
/**
 * Los tipos de pieza del kit para crearPlato({ tiposExtra }). cosas: las variantes de 'cosa' que se meten en el sombreador
 * (por defecto, todas). Se pueden pedir los tipos que no se usen: solo cuesta lo que se pone en `piezas`.
 */
export function tiposOjo({ cosas = NOMBRES_COSA } = {}) {
  cosas = cosas.filter((n) => NOMBRES_COSA.includes(n));
  if (!cosas.length) cosas = ['celula'];
  return {
    ojo: { radio: 3.3, glifos: [], envolvente: true, glsl: GLSL_OJO_COMUN + GLSL_OJO },
    franja: { radio: 1.08, glifos: [], glsl: GLSL_OJO_COMUN + GLSL_FRANJA },
    cosa: { radio: 0.62, glifos: [], glsl: GLSL_OJO_COMUN + glslCosa(cosas) },
    ojoCorte: { radio: 2.6, glifos: [], glsl: GLSL_OJO_COMUN + GLSL_CORTE },
  };
}
/** Los uniformes del kit, para crearPlato({ uniformes }) (y después, ponerOjo / ponerCorte). */
export function uniformesOjo() {
  return {
    uOjoA: { value: new THREE.Vector4(0, 0, 0, 0) },
    uOjoB: { value: new THREE.Vector4(0.5, 0, 1, 1) },
    uCorte: { value: new THREE.Vector4(6, 1, 0, 0) },
  };
}
/** El estado del ojo exterior (cada fotograma). */
export function ponerOjo(U, { arriba = 0, abajo = 0, mirada = [0, 0], pupila = 0.5, entorna = 0, piel = 1, sombra = true } = {}) {
  U.uOjoA.value.set(arriba, abajo, mirada[0], mirada[1]);
  U.uOjoB.value.set(pupila, entorna, piel, sombra ? 1 : 0);
}
/** El estado del ojo en corte (cada fotograma): separacion en celdas, brillo y haces (0…1). */
export function ponerCorte(U, { separacion = 6, brillo = 1, haces = 1 } = {}) {
  U.uCorte.value.set(separacion, brillo, haces, 0);
}
const mezclar = (a, b, x) => a + (b - a) * x;
// y (local, en el centro de la rendija) del borde de un párpado de ángulo a (plano por la bisagra OJO.H)
const yBorde = (a) => (-OJO.H * Math.cos(a) + Math.sqrt(OJO.RL * OJO.RL - OJO.H * OJO.H * Math.sin(a) ** 2)) * Math.sin(a);
/** y local (en el centro de la rendija) del borde de cada párpado: { arriba, abajo }. */
export function aberturaOjo(arriba = 0, abajo = 0, entorna = 0) {
  const au = mezclar(OJO.ARRIBA, OJO.CIERRE, arriba) - 0.16 * entorna;
  const al = Math.min(mezclar(OJO.ABAJO, OJO.CIERRE, abajo) + 0.26 * entorna, au - 0.004);
  return { arriba: yBorde(au), abajo: yBorde(al) };
}
/** El cierre de un párpado que deja su borde a la altura local y (en el centro). lado: 'arriba' | 'abajo'. */
export function cierreParaAbertura(y, lado = 'arriba') {
  // yBorde es monótona en a: se busca por bisección
  let lo = -1.4, hi = 1.4;
  for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (yBorde(m) < y) lo = m; else hi = m; }
  const a = (lo + hi) / 2, a0 = lado === 'arriba' ? OJO.ARRIBA : OJO.ABAJO;
  return (a - a0) / (OJO.CIERRE - a0);
}
/** Dónde caen los dos puntos de luz del corte (locales, con la córnea a −x), para una separación en celdas. */
export function puntosCorte(separacion) {
  return [1, -1].map((l) => { const v = new THREE.Vector3(1, l * 0.5 * separacion * CORTE.PASO, CORTE.V0).normalize().multiplyScalar(CORTE.RI); return [v.x, v.y, v.z]; });
}
/** rot (euler YXZ) que pone la cara +z de una pieza en pos mirando a la cámara del plató P. */
export function haciaCamara(P, pos) {
  // dos puntos del rayo que pasa por pos (a distintas profundidades) dan la dirección de la cámara
  const s = P.proyectar(pos);
  const a = P.punto(s[0], s[1], pos[2]), b = P.punto(s[0], s[1], pos[2] + 1);
  const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
  return [-Math.asin(d.y), Math.atan2(d.x, d.z), 0];
}
/** Halo aditivo de una franja horizontal de pantalla (px de diseño): de x0 a x1, centrada en y, de alto `alto`. */
export function resplandorFranja(g, x0, x1, y, alto, fuerza = 1) {
  if (fuerza <= 0.001) return;
  const cx = (x0 + x1) / 2, rx = Math.max(10, (x1 - x0) / 2);
  g.save();
  g.globalCompositeOperation = 'lighter';
  for (const [k, a] of [[1.6, 0.22], [4.5, 0.08]]) {
    const ry = Math.max(14, alto * k);
    g.save();
    g.translate(cx, y);
    g.scale(rx * (1 + 0.04 * k) / ry, 1);
    const gr = g.createRadialGradient(0, 0, 0, 0, 0, ry);
    gr.addColorStop(0, `rgba(255,212,155,${a * fuerza})`);
    gr.addColorStop(0.35, `rgba(255,205,145,${a * 0.55 * fuerza})`);
    gr.addColorStop(1, 'rgba(255,200,140,0)');
    g.fillStyle = gr;
    g.fillRect(-ry, -ry, 2 * ry, 2 * ry);
    g.restore();
  }
  g.restore();
}

// ---------------------------------------------------------------- ayudas 2D del ojo compuesto (ep3-hola)
/** La sombra que los párpados (una foto de la capa PARPADOS) dejan en el globo y en lo que pasa por delante: su silueta,
 * oscura, desenfocada y algo bajada. src y el lienzo devuelto, en px de dispositivo (W = ancho de diseño). */
export function sombraParpados(src, { blur = 18, dy = 10, color = 'rgba(8,4,3,0.75)', W = 1920 } = {}) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const gc = c.getContext('2d');
  gc.filter = `blur(${blur * c.width / W}px)`;
  gc.drawImage(src, 0, Math.round(dy * c.width / W));
  gc.filter = 'none';
  gc.globalCompositeOperation = 'source-in';
  gc.fillStyle = color; gc.fillRect(0, 0, c.width, c.height);
  return c;
}
/** La piel de la cara se apaga hacia los bordes (la mirada va a la rendija): elipse centrada en (960, 540) de
 * 1312 × 820 px por zo (el tamaño del ojo respecto al de ep3-hola); fuera, oscura al 60 %. gc, en px de dispositivo. */
export function vinetaOjo(gc, zo = 1, W = 1920) {
  const k = gc.canvas.width / W;
  gc.save();
  gc.setTransform(k * 1.6 * zo, 0, 0, k * zo, 960 * k, 540 * k);
  const gr = gc.createRadialGradient(0, 0, 0, 0, 0, 820);
  gr.addColorStop(0, 'rgba(12,7,5,0)'); gr.addColorStop(0.3, 'rgba(12,7,5,0.03)'); gr.addColorStop(0.6, 'rgba(12,7,5,0.2)'); gr.addColorStop(1, 'rgba(12,7,5,0.6)');
  gc.fillStyle = gr; gc.fillRect(-600 / zo, -540 / zo, 1200 / zo, 1080 / zo);
  gc.restore();
}

// ---------------------------------------------------------------- el final de ep3-hola = el principio de ep3-ojo
/**
 * El ojo enorme del final de ep3-hola, para que ep3-ojo empiece exactamente igual (y ep3-hola lo usa para su último
 * tramo: una sola receta). Con la cámara de las pruebas, crearPlato({ camara: { pos: [0, 3.8, 15.5], mira: [0, 2.3, 0],
 * fov: 28, desenfoque: 44 } }):
 *  · el ojo en P.punto(960, 540, Z_OJO), de cara a la cámara, con la rendija de RENDIJA_PX px de ancho (escala =
 *    RENDIJA_PX / (2,1 · px por unidad));
 *  · la franja, FRANJA.delante unidades locales del ojo más cerca de la cámara, de 2 × largoPx de largo y 2 × medioAltoPx
 *    de alto;
 *  · los párpados, en ABRE al llegar y, al final, con sus bordes a ±RENDIJA_FIN_PX px del centro (justo fuera de la
 *    franja); las tres COSAS (px de diseño, diámetro d), detrás de los párpados (COSAS_DELANTE unidades locales del ojo
 *    delante de su centro), apagadas al final (la foto encendida con el filtro APAGADA);
 *  · en 2D, por este orden: fondo #0b0807, globo (CAPA.GLOBO, sin sombra), cosas apagadas, sombraParpados (SOMBRA) y
 *    párpados (CAPA.PARPADOS, sombra: false), vinetaOjo(1), franja, resplandorFranja (HALO, en la y de la franja) y la
 *    sombra blanda bajo el sitio de presentador de Atom (SOMBRA_ATOM). Encima van Atom (ATOM: centro y diámetro de las
 *    órbitas en px, quieto) y el post del kit.
 */
export const HOLA = {
  Z_OJO: 5.0, RENDIJA_PX: 1380, ABRE: { arriba: 0, abajo: -0.06 }, PUPILA: 0.55, RENDIJA_FIN_PX: 31,
  FRANJA: { largoPx: 560, medioAltoPx: 26, delante: 1.2 },
  COSAS_DELANTE: 0.9,
  COSAS: [
    { cosa: 'CELULA', x: 830, y: 676, d: 180, rot: [0.25, -0.3, 0.2], lado: 'abajo' },
    { cosa: 'ATOMO', x: 1095, y: 674, d: 170, rot: [0.15, 0.45, 0], lado: 'abajo' },
    { cosa: 'GALAXIA', x: 960, y: 392, d: 360, rot: [-0.95, 0.1, 0.4], lado: 'arriba' },
  ],
  APAGADA: 'brightness(0.32) saturate(0.35)',
  SOMBRA: { blur: 18, dy: 10, color: 'rgba(8,4,3,0.75)' },
  HALO: { x0: 400, x1: 1520, alto: 30, fuerza: 1.3 },
  SOMBRA_ATOM: { x: 230, y: 780, r0: 40, r1: 190, color: '14,8,5', alfa: 0.55 },
  ATOM: { x: 230, y: 780, d: 180 },
  // nf de P.render de cada foto (el hervor de la arcilla depende de él: con los mismos, las mismas fotos)
  NF: { globo: 9004, cosas: 9006, franja: 9007, cerrado: 9008 },
};
/** Las colocaciones del final de ep3-hola en el plató P: { pos, escala, rot, pxLocal (px por unidad local del ojo),
 * franja: { pos, escala, rot, alto (variante), y (px) }, fin: { arriba, abajo } (cierres), cosas: [{ ...HOLA.COSAS[i],
 * variante, pos, escala }] }. */
export function encuadreHola(P) {
  const pxU = (p) => { const a = P.proyectar(p), b = P.proyectar([p[0] + 1, p[1], p[2]]); return Math.hypot(b[0] - a[0], b[1] - a[1]); };
  const pos = P.punto(960, 540, HOLA.Z_OJO);
  const escala = HOLA.RENDIJA_PX / (2.1 * pxU(pos));
  const pxLocal = escala * pxU(pos);
  const a = P.punto(960, 540, HOLA.Z_OJO), b = P.punto(960, 540, HOLA.Z_OJO + 1);
  const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  const dir = [0, 1, 2].map((i) => (b[i] - a[i]) / l);
  const fpos = pos.map((x, i) => x + dir[i] * HOLA.FRANJA.delante * escala);
  const fesc = HOLA.FRANJA.largoPx / pxU(fpos);
  const zc = HOLA.Z_OJO + HOLA.COSAS_DELANTE * escala;
  return {
    pos, escala, rot: haciaCamara(P, pos), pxLocal, dirCam: dir,
    franja: { pos: fpos, escala: fesc, rot: haciaCamara(P, fpos), alto: HOLA.FRANJA.medioAltoPx / (fesc * pxU(fpos)), y: P.proyectar(fpos)[1] },
    fin: { arriba: cierreParaAbertura(HOLA.RENDIJA_FIN_PX / pxLocal, 'arriba'), abajo: cierreParaAbertura(-HOLA.RENDIJA_FIN_PX / pxLocal, 'abajo') },
    cosas: HOLA.COSAS.map((c) => { const p = P.punto(c.x, c.y, zc); return { ...c, variante: COSA[c.cosa], pos: p, escala: c.d / (2 * 0.5 * pxU(p)) }; }),
  };
}
/**
 * El último fotograma de ep3-hola sin Atom ni post (un lienzo del tamaño del de WebGL), para empezar ep3-ojo con él.
 * piezas: los índices en P de { ojo, franja, cosa } (tipos de tiposOjo, con 'celula', 'atomo' y 'galaxia' entre las
 * cosas). fotos (opcional): { globo, cerrado, franja, cosasApagadas: [3 lienzos] } ya pintadas con esta receta, para no
 * pintarlas otra vez. Pinta con P (limpia sus piezas) y deja los uniformes del ojo en el estado final.
 */
export function pintarFinalHola(P, U, piezas, { fotos = {} } = {}) {
  const E = encuadreHola(P);
  const gl = P.renderer.domElement;
  const nuevo = () => { const c = document.createElement('canvas'); c.width = gl.width; c.height = gl.height; return c; };
  const foto = () => { const c = nuevo(); c.getContext('2d').drawImage(gl, 0, 0); return c; };
  const ojo = (estado, capa, nf) => {
    ponerOjo(U, { ...estado, pupila: HOLA.PUPILA, sombra: false });
    P.limpiar(); P.pieza(piezas.ojo, { pos: E.pos, escala: E.escala, rot: E.rot, variante: capa }); P.render(nf, { fondo: false });
    return foto();
  };
  const globo = fotos.globo ?? ojo(HOLA.ABRE, CAPA.GLOBO, HOLA.NF.globo);
  const apagadas = fotos.cosasApagadas ?? E.cosas.map((c) => {
    P.limpiar(); P.pieza(piezas.cosa, { pos: c.pos, escala: c.escala, rot: c.rot, variante: c.variante, color: 0 }); P.render(HOLA.NF.cosas, { fondo: false });
    const on = foto(), off = nuevo(), go = off.getContext('2d');
    go.filter = HOLA.APAGADA; go.drawImage(on, 0, 0); go.filter = 'none';
    return off;
  });
  const franja = fotos.franja ?? (() => {
    P.limpiar(); P.pieza(piezas.franja, { pos: E.franja.pos, escala: E.franja.escala, rot: E.franja.rot, variante: E.franja.alto }); P.render(HOLA.NF.franja, { fondo: false });
    return foto();
  })();
  const cerrado = fotos.cerrado ?? ojo(E.fin, CAPA.PARPADOS, HOLA.NF.cerrado);
  ponerOjo(U, { ...E.fin, pupila: HOLA.PUPILA, sombra: false });
  P.limpiar();
  const c = nuevo(), g = c.getContext('2d'), k = c.width / 1920;
  g.fillStyle = '#0b0807'; g.fillRect(0, 0, c.width, c.height);
  g.drawImage(globo, 0, 0);
  for (const off of apagadas) g.drawImage(off, 0, 0);
  g.drawImage(sombraParpados(cerrado, HOLA.SOMBRA), 0, 0);
  g.drawImage(cerrado, 0, 0);
  vinetaOjo(g, 1);
  g.drawImage(franja, 0, 0);
  g.setTransform(k, 0, 0, k, 0, 0);
  const h = HOLA.HALO;
  resplandorFranja(g, h.x0, h.x1, E.franja.y, h.alto, h.fuerza);
  const s = HOLA.SOMBRA_ATOM;
  const gr = g.createRadialGradient(s.x, s.y, s.r0, s.x, s.y, s.r1);
  gr.addColorStop(0, `rgba(${s.color},${s.alfa})`); gr.addColorStop(1, `rgba(${s.color},0)`);
  g.fillStyle = gr; g.fillRect(s.x - s.r1 - 10, s.y - s.r1 - 10, 2 * s.r1 + 20, 2 * s.r1 + 20);
  g.setTransform(1, 0, 0, 1, 0, 0);
  return c;
}
