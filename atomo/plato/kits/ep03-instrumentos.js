// KIT DEL EPISODIO 3 · «INSTRUMENTOS» (kits/ep03-instrumentos.js). Lo crea ep3-ojo y, una vez entregado con su hoja de
// prueba (escenas/ep03-instrumentos-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las
// escenas que lo usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta (una pieza propia con
// tiposExtra, o 2D encima) y lo dice en su informe.
// Lo usan: ep3-ojo (lo crea: microscopio, anillo y telescopio), ep3-virus (el microscopio de colegio) y ep3-borde (el
// telescopio).
//
// Es UN tipo de pieza, 'instrumento', para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra y
// uniformes), con la variante en T (como la 'cosa' de ep03-ojo.js): el mismo material, la misma luz y la misma paleta.
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposInstrumentos, uniformesInstrumentos, ponerInstrumentos, instrumento, INSTR } from '/atomo/plato/kits/ep03-instrumentos.js';
//   const UI = uniformesInstrumentos();
//   const P = await crearPlato({ piezas: ['instrumento', ...], tiposExtra: tiposInstrumentos({ variantes: ['telescopio'] }),
//                                uniformes: { ...UI }, ... });
//   function dibujar(t) {
//     ...; P.limpiar();
//     ponerInstrumentos(UI, { rueda: 0, haz: 1, fase: 0.3, luz: 1 });      // los uniformes no se borran solos: ponlos siempre
//     const k = instrumento(P, 0, { variante: 'telescopio', pos, escala, rot });
//     P.render(n);
//   }
//
// tiposInstrumentos({ variantes }) mete en el sombreador solo las variantes pedidas (por defecto, las cuatro): compila
// antes y la carga baja. Pedir una que no está da la primera de la lista. instrumento(P, i, { variante, ... }) se llama
// como P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) y devuelve sus puntos del mundo.
//
// LAS VARIANTES (INSTR; unidades locales: todas caben en una esfera de radio 1,35 alrededor del origen; +y arriba;
// los microscopios, de perfil en el plano xy, se leen de frente con rot [0, 0, 0] y de tres cuartos con rot y ±0,5)
//  · MICROSCOPIO (0) · el microscopio de investigación, binocular: base y brazo de esmalte marfil, cabezal con dos
//      oculares negros inclinados hacia +x (hacia quien mira), revólver de latón con tres objetivos (con su anillo de
//      color), platina oscura con una preparación de vidrio, condensador de acero, lámpara en la base y los mandos del
//      enfoque, negros y coaxiales, a los dos lados del brazo. De y −0,99 (la base) a +0,94 (los oculares); el brazo en
//      x ≈ −0,3 y la platina en x ≈ 0,19. Uniforme: luz (0…1, la lámpara de la base se enciende).
//  · ANILLO (1) · el anillo de un acelerador de partículas, tumbado en el plano xz (de radio ANILLO_R = 0,95 por el centro
//      del tubo): 28 imanes de pizarra azulada con un surco arriba, bridas de latón entre ellos, el tubo del haz en el
//      surco (luz ámbar) y cuatro detectores en barril (dos grandes y dos menores) en los ángulos 0, 90, 180 y 270° (el 0 en
//      +x), con las caras en anillos de terracota, crema y pizarra. Se ve bien desde arriba de tres cuartos: rot [0,5…0,9,
//      giro, 0]. Uniformes: haz (0…1, la luz del tubo entero) y fase (0…1: dos paquetes de luz que dan la vuelta en sentidos
//      contrarios, en ±fase × 360° desde el detector de +x: con fase 0 y 0,5 chocan en un detector).
//  · TELESCOPIO (2) · el telescopio espacial (como el Webb): el espejo primario de 18 hexágonos dorados (cóncavo, con el
//      hueco del centro) mirando a +z, centrado en (0, 0,17, 0) y de unos 1,03 de ancho; el secundario delante (en
//      z = 0,62) sobre tres puntales; detrás, la placa y el módulo de instrumentos; debajo, el parasol de cinco capas
//      plateadas (un hexágono alargado en x, de ±0,98, que se abren en abanico hacia los bordes), el cuerpo de la nave y
//      el panel solar (hacia +z). De tres cuartos, desde algo arriba: rot [0,3, −0,55, 0]. Sin uniformes.
//  · COLEGIO (3) · el microscopio de laboratorio de colegio, monocular y más sencillo: pie de herradura y brazo curvo de
//      esmalte verde oliva, tubo recto y vertical con un ocular, revólver con tres objetivos, platina negra con dos
//      pinzas, el ESPEJO redondo debajo de la platina (en vez de lámpara) y una RUEDA de enfoque grande a cada lado del
//      brazo, moleteada y con una marca crema que gira. Uniforme: rueda (radianes: el giro de la rueda; «por mucho que se
//      gire la rueda»).
//    ponerInstrumentos(U, { rueda, haz, fase, luz }) escribe los uniformes (uno por plató: dos instrumentos del mismo
//    tipo en un fotograma comparten rueda, haz, fase y luz).
//
// PUNTOS (locales; instrumento() los devuelve en el mundo, en .puntos y con .punto(nombre)):
//   microscopio: ocular (la punta de los oculares), objetivo (la punta del objetivo de trabajo), platina (la
//     preparación), lampara · colegio: ocular, objetivo, platina, espejo, rueda (el centro de la rueda de +z) · anillo:
//     centro, detector0…detector3, y haz(u) → el punto del tubo a u vueltas (0 en +x, hacia +z) · telescopio: espejo (el
//     centro del primario), secundario, eje (un punto a 1 unidad por delante del primario, para apuntar), parasol (el
//     centro de la capa de arriba), panel.
//   apuntarTelescopio(P? , desde, hacia) → rot que pone el eje del telescopio (+z) en la dirección desde → hacia (con el
//     parasol abajo): para «apunta al borde» (ep3-borde).
//
// EL FINAL DE ep3-ojo (= el primer fotograma de ep3-promesa): FIN_OJO (el telescopio en el centro: su pantalla, su
// tamaño, su giro y la profundidad, para la cámara de las pruebas, pos [0, 3,8, 15,5], mira [0, 2,3, 0], fov 28) y
// encuadreFinOjo(P) (pos, escala, rot en el plató); cieloOjo(lienzo, { semilla }) pinta el cielo estrellado de fondo
// (2D, con semilla: siempre el mismo) y pintarFinOjo(P, U, i) da el último fotograma sin Atom ni post (el cielo y el
// telescopio). Atom va encima en su sitio de presentador (FIN_OJO.ATOM: centro (230, 780), órbitas de 180 px).
//
// COSTE (este servidor, 1920 × 1080, con el plató; ver la hoja): cada instrumento de ~600–700 px, 0,4–1,2 s por fotograma
// con la máquina tranquila (el anillo de 1.300 px de ancho, algo más: es fino y muchos rayos rozan); con la carga de otras
// escenas, el doble o el triple. El tipo, con las cuatro variantes, suma ~3–5 s a la carga por cada pieza que lo use.

import * as THREE from 'three';

export const INSTR = { MICROSCOPIO: 0, ANILLO: 1, TELESCOPIO: 2, COLEGIO: 3 };
const NOMBRES = ['microscopio', 'anillo', 'telescopio', 'colegio'];
export const ANILLO_R = 0.95;

// ---------------------------------------------------------------- GLSL común
const GLSL_COMUN = /* glsl */`
uniform vec4 uInstr;   // rueda (rad) · haz (0…1) · fase (0…1) · luz (0…1)
// cilindro con tapas entre a y b, de radio r (exacto)
float inCyl(vec3 p, vec3 a, vec3 b, float r) {
  vec3 ba = b - a, pa = p - a;
  float baba = dot(ba, ba), paba = dot(pa, ba);
  float x = length(pa * baba - ba * paba) - r * baba;
  float y = abs(paba - baba * 0.5) - baba * 0.5;
  float x2 = x * x, y2 = y * y * baba;
  float d = (max(x, y) < 0.0) ? -min(x2, y2) : (((x > 0.0) ? x2 : 0.0) + ((y > 0.0) ? y2 : 0.0));
  return sign(d) * sqrt(abs(d)) / baba;
}
float inCaja(vec3 p, vec3 b) { vec3 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0); }
// extrusión en z de una distancia 2D (d2) con medio grosor h y redondeo r
float inExtr(float d2, float z, float h, float r) { vec2 w = vec2(d2 + r, abs(z) - h + r); return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - r; }
vec2 inGira(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
`;

// ---------------------------------------------------------------- MICROSCOPIO de investigación
const GLSL_MICRO = /* glsl */`
// m: 0 esmalte marfil · 1 negro · 2 latón · 3 platina · 4 vidrio · 5 lámpara · 6 acero · 7 anillo de color
float inMicro(vec3 q, out float m) {
  m = 0.0;
  float base = sdRoundBox(q - vec3(0.02, -0.905, 0.0), vec3(0.56, 0.08, 0.36), 0.075);
  // el brazo: una columna que sale del fondo de la base y se inclina un poco hacia delante arriba
  vec3 a = q; a.x += 0.36 - 0.07 * smoothstep(-0.3, 0.45, q.y);
  float brazo = sdRoundBox(a - vec3(0.0, -0.2, 0.0), vec3(0.08, 0.62, 0.1), 0.055);
  float cab = sdRoundBox(q - vec3(-0.07, 0.47, 0.0), vec3(0.34, 0.08, 0.11), 0.055);
  float bino = sdRoundBox(q - vec3(0.12, 0.585, 0.0), vec3(0.12, 0.06, 0.125), 0.045);
  float soporte = sdRoundBox(q - vec3(-0.15, 0.03, 0.0), vec3(0.16, 0.035, 0.075), 0.02);
  float d = smin(base, brazo, 0.09);
  d = smin(d, cab, 0.08);
  d = smin(d, bino, 0.035);
  d = smin(d, soporte, 0.03);
  d *= 0.9;
  // los oculares (negros): dos tubos inclinados hacia +x y arriba, en z = ±0,068
  vec3 qe = vec3(q.x, q.y, abs(q.z) - 0.068);
  const vec3 E0 = vec3(0.15, 0.62, 0.0), ED = vec3(0.7547, 0.6561, 0.0);
  float ocu = min(inCyl(qe, E0, E0 + ED * 0.27, 0.036), inCyl(qe, E0 + ED * 0.24, E0 + ED * 0.36, 0.044)) - 0.006;
  if (ocu < d) m = 1.0;
  d = smin(d, ocu, 0.012);
  // el revólver (latón) y tres objetivos
  vec3 qo = vec3(q.x, q.y, abs(q.z));
  float rev = inCyl(q, vec3(0.17, 0.43, 0.0), vec3(0.205, 0.355, 0.0), 0.11) - 0.012;
  float ob = capsulaC(q, vec3(0.2, 0.34, 0.0), vec3(0.2, 0.165, 0.0), 0.042, 0.028);
  ob = min(ob, capsulaC(qo, vec3(0.18, 0.34, 0.06), vec3(0.11, 0.21, 0.125), 0.036, 0.025));
  float lat = min(rev, ob);
  if (lat < d) m = 2.0;
  d = smin(d, lat, 0.01);
  // la platina (oscura), la preparación (vidrio) y el condensador debajo
  float pla = sdRoundBox(q - vec3(0.19, 0.06, 0.0), vec3(0.25, 0.022, 0.24), 0.014);
  if (pla < d) m = 3.0;
  d = min(d, pla);
  float vid = sdRoundBox(q - vec3(0.19, 0.087, 0.0), vec3(0.16, 0.005, 0.062), 0.003);
  if (vid < d) m = 4.0;
  d = min(d, vid);
  float con = inCyl(q, vec3(0.19, -0.12, 0.0), vec3(0.19, 0.03, 0.0), 0.058) - 0.006;
  float lam = inCyl(q, vec3(0.19, -0.845, 0.0), vec3(0.19, -0.8, 0.0), 0.07) - 0.008;
  float ac = min(con, lam);
  if (ac < d) m = lam < con ? 5.0 : 6.0;
  d = smin(d, ac, 0.01);
  // los mandos del enfoque, coaxiales, a los dos lados del brazo
  float mg = inCyl(qo, vec3(-0.3, -0.36, 0.08), vec3(-0.3, -0.36, 0.165), 0.112) - 0.01;
  float mf = inCyl(qo, vec3(-0.3, -0.36, 0.16), vec3(-0.3, -0.36, 0.215), 0.064) - 0.008;
  float mandos = min(mg, mf);
  if (mandos < d) m = 1.0;
  d = smin(d, mandos, 0.012);
  return d;
}
float inMicroC(vec3 q) {
  float base = sdRoundBox(q - vec3(0.02, -0.905, 0.0), vec3(0.53, 0.06, 0.33), 0.06);
  vec3 a = q; a.x += 0.36 - 0.07 * smoothstep(-0.3, 0.45, q.y);
  float brazo = sdRoundBox(a - vec3(0.0, -0.2, 0.0), vec3(0.06, 0.6, 0.08), 0.05);
  float cab = sdRoundBox(q - vec3(-0.07, 0.47, 0.0), vec3(0.32, 0.06, 0.09), 0.05);
  float pla = sdRoundBox(q - vec3(0.19, 0.06, 0.0), vec3(0.23, 0.012, 0.22), 0.01);
  return min(min(base, brazo), min(cab, pla)) * 0.85;
}
float inMicroA(vec3 q) {
  return min(min(inCaja(q - vec3(0.02, -0.9, 0.0), vec3(0.6, 0.12, 0.4)), inCaja(q - vec3(-0.025, -0.035, 0.0), vec3(0.5, 0.79, 0.28))),
             inCaja(q - vec3(0.3, 0.77, 0.0), vec3(0.22, 0.2, 0.15)));
}
vec3 inMicroCol(vec3 q, float m) {
  float v = 0.94 + 0.12 * vnoise(q * 7.0);
  if (m < 0.5) { gBri = 1.7; return vec3(0.56, 0.52, 0.44) * v; }
  if (m < 1.5) { gBri = 1.9; return vec3(0.03, 0.028, 0.03) * v; }
  if (m < 2.5) {
    // los objetivos: latón, con un anillo de color y la punta negra
    gBri = 3.2;
    if (q.y < 0.32 && q.y > 0.15) {
      float yo = q.y;
      if (yo < 0.195) { gBri = 1.8; return vec3(0.03, 0.028, 0.03); }
      if (abs(yo - 0.25) < 0.012) { gBri = 1.6; return vec3(0.42, 0.11, 0.05); }
    }
    return vec3(0.47, 0.33, 0.12) * v;
  }
  if (m < 3.5) { gBri = 2.0; return vec3(0.045, 0.047, 0.055) * v; }
  if (m < 4.5) {
    // el portaobjetos: vidrio verdoso y, en el centro, la muestra teñida
    gTr = 1.0; gBri = 2.6;
    float mu = 1.0 - smoothstep(0.03, 0.05, length(q.xz - vec2(0.19, 0.0)));
    gEm = vec3(0.30, 0.10, 0.12) * 0.12 * mu;
    return mix(vec3(0.40, 0.46, 0.45), vec3(0.46, 0.14, 0.18), mu);
  }
  if (m < 5.5) { float l = uInstr.w; gEm = vec3(1.0, 0.82, 0.55) * 0.55 * l; gTr = 1.0; return mix(vec3(0.3, 0.29, 0.26), vec3(0.62, 0.56, 0.44), l); }
  gBri = 3.0; return vec3(0.24, 0.24, 0.25) * v;
}
`;

// ---------------------------------------------------------------- ANILLO del acelerador
const GLSL_ANILLO = /* glsl */`
const float AN_R = ${ANILLO_R.toFixed(3)};
// m: 0 imán · 2 brida de latón · 3 detector · 5 tubo del haz
vec3 anGira(vec3 q, float a) { float c = cos(a), s = sin(a); return vec3(c * q.x + s * q.z, q.y, -s * q.x + c * q.z); }
float anDetector(vec3 q, float ang, out float s4, out vec3 k4) {
  const float Q = 1.5707963;
  float i4 = floor(ang / Q + 0.5);
  k4 = anGira(q, i4 * Q); k4.x -= AN_R;
  s4 = mod(i4, 2.0) < 0.5 ? 1.0 : 0.76;
  vec2 o = abs(k4.xy);
  float oct = max(max(o.x, o.y), (o.x + o.y) * 0.7071) - 0.165 * s4;
  return max(oct, abs(k4.z) - 0.15 * s4) - 0.008;
}
float inAnillo(vec3 q, out float m) {
  m = 0.0;
  float ang = atan(q.z, q.x);
  const float SEC = 6.2831853 / 28.0;
  vec3 k = anGira(q, floor(ang / SEC + 0.5) * SEC); k.x -= AN_R;
  float iman = sdRoundBox(k, vec3(0.06, 0.052, SEC * AN_R * 0.5 - 0.016), 0.018);
  iman = smax(iman, -(length(k.xy - vec2(0.0, 0.054)) - 0.027), 0.008);
  vec3 k1 = anGira(q, (floor(ang / SEC) + 0.5) * SEC); k1.x -= AN_R;
  vec2 w = vec2(length(k1.xy) - 0.058, abs(k1.z) - 0.009);
  float brida = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.004;
  float tubo = length(vec2(length(q.xz) - AN_R, q.y - 0.044)) - 0.016;
  float d = iman;
  if (brida < d) m = 2.0;
  d = min(d, brida);
  if (tubo < d) m = 5.0;
  d = min(d, tubo);
  float s4; vec3 k4;
  float det = anDetector(q, ang, s4, k4);
  if (det < d) m = 3.0;
  d = smin(d, det, 0.015);
  return d * 0.9;
}
float inAnilloC(vec3 q) {
  float ang = atan(q.z, q.x), s4; vec3 k4;
  float t = length(vec2(length(q.xz) - AN_R, q.y)) - 0.045;
  return min(t, anDetector(q, ang, s4, k4) + 0.02) * 0.85;
}
float inAnilloA(vec3 q) { return length(vec2(length(q.xz) - AN_R, q.y)) - 0.215; }
vec3 inAnilloCol(vec3 q, float m) {
  float v = 0.93 + 0.14 * vnoise(q * 9.0);
  float ang = atan(q.z, q.x);
  if (m < 0.5) { gBri = 1.6; return vec3(0.10, 0.13, 0.18) * v; }
  if (m < 2.5) { gBri = 3.2; return vec3(0.47, 0.33, 0.12) * v; }
  if (m < 3.5) {
    // el detector: anillos concéntricos en las caras (terracota, crema, pizarra) y bandas en el costado
    float s4; vec3 k4;
    anDetector(q, ang, s4, k4);
    float r = length(k4.xy) / s4, cara = smoothstep(0.13, 0.145, abs(k4.z) / s4);
    float sp = abs(fract(atan(k4.y, k4.x) / 0.7853982 + 0.5) - 0.5);
    vec3 cc = r < 0.045 ? vec3(0.62, 0.32, 0.07) : r < 0.08 ? vec3(0.07, 0.08, 0.10) : r < 0.12 ? vec3(0.44, 0.15, 0.07) : vec3(0.50, 0.46, 0.38);
    cc = mix(cc, vec3(0.05, 0.05, 0.06), (1.0 - smoothstep(0.025, 0.05, sp)) * step(0.045, r) * 0.7);
    // el costado: arcilla terracota con dos aros crema y las juntas de las placas
    float zz = abs(k4.z) / s4;
    float aro = 1.0 - smoothstep(0.008, 0.014, abs(zz - 0.085));
    float junta = (1.0 - smoothstep(0.02, 0.04, sp)) * 0.5;
    vec3 cl = mix(vec3(0.42, 0.14, 0.065), vec3(0.52, 0.47, 0.38), aro);
    cl *= 1.0 - junta;
    gBri = 1.5;
    return mix(cl, cc, cara) * v;
  }
  // el tubo: luz ámbar (el haz entero, con haz) y dos paquetes que corren en sentidos contrarios (fase)
  float u = ang / 6.2831853;
  float f = uInstr.z;
  float d1 = fract(u - f + 0.5) - 0.5, d2 = fract(u + f + 0.5) - 0.5;
  // (cada paquete deja detrás una estela que se apaga: el de +fase va hacia +ángulo y el de −fase, al revés)
  float paq = exp(-d1 * d1 / 0.0004) + exp(-d2 * d2 / 0.0004);
  float cola = exp(min(d1, 0.0) / 0.04) * step(d1, 0.0) + exp(-max(d2, 0.0) / 0.04) * step(0.0, d2);
  float luz = uInstr.y * (0.05 + 1.3 * paq + 0.3 * cola);
  gEm = vec3(1.0, 0.58, 0.18) * luz;
  gTr = 1.0; gBri = 1.4;
  return mix(vec3(0.10, 0.09, 0.08), vec3(0.76, 0.45, 0.14), clamp(luz * 2.0, 0.0, 1.0));
}
`;

// ---------------------------------------------------------------- TELESCOPIO espacial
const GLSL_TELE = /* glsl */`
// m: 0 placa / nave (oscuro) · 2 espejo dorado · 3 parasol · 4 panel solar · 6 puntal · 8 módulo (lámina dorada oscura)
const vec2 TE_C = vec2(0.0, 0.17);
// hexágono con los lados planos a izquierda y derecha (r: medio ancho entre lados)
float teHex(vec2 p, float r) {
  const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
  p = abs(p.yx);
  p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
  p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
  return length(p) * sign(p.y);
}
// la celda de la rejilla hexagonal (paso 1) del punto p: desplazamiento (xy) y centro (zw)
vec4 teCelda(vec2 p) {
  const vec2 s = vec2(1.0, 1.7320508);
  vec2 a = mod(p, s) - 0.5 * s;
  vec2 b = mod(p - 0.5 * s, s) - 0.5 * s;
  return dot(a, a) < dot(b, b) ? vec4(a, p - a) : vec4(b, p - b);
}
// el primario: 18 segmentos (los anillos 1 y 2 de la rejilla, sin el del centro), cóncavo
float teEspejo(vec3 q, out vec2 id) {
  vec2 r = q.xy - TE_C;
  vec4 c = teCelda(r / 0.2);
  float j = floor(c.w / 0.8660254 + 0.5), i = floor(c.z - 0.5 * j + 0.5);
  float an = (abs(i) + abs(j) + abs(i + j)) * 0.5;
  id = vec2(i, j);
  float hx = teHex(c.xy, 0.5) * 0.2;
  float zc = -0.2 * dot(r, r);
  float dz = abs(q.z - zc) - 0.014;
  float d = (an > 0.5 && an < 2.5) ? max(dz, hx + 0.0065) : max(dz, -hx + 0.0065);
  return max(d, length(r) - 0.52);
}
float teParasol(vec3 q, out float capa) {
  float d = 1e5; capa = 0.0;
  vec2 xz = q.xz - vec2(0.0, -0.1);
  float borde = clamp(length(xz * vec2(0.9, 1.4)), 0.0, 1.0);
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float y0 = -0.52 - fi * (0.024 + 0.022 * borde * borde);
    float s = max(abs(xz.y) - 0.6 - fi * 0.01, abs(xz.x) + abs(xz.y) * 0.9 - 0.98 - fi * 0.012) * 0.75;
    float di = max(abs(q.y - y0) - 0.004, s);
    if (di < d) { d = di; capa = fi; }
  }
  return d * 0.85;
}
float inTele(vec3 q, out float m) {
  m = 2.0;
  vec2 id;
  float d = teEspejo(q, id);
  // la placa de detrás, el módulo de instrumentos y la torre
  float placa = inExtr(teHex(q.xy - TE_C, 0.36), q.z + 0.1, 0.024, 0.015);
  float modulo = sdRoundBox(q - vec3(0.0, 0.05, -0.27), vec3(0.17, 0.17, 0.12), 0.03);
  float torre = sdCapsule(q, vec3(0.0, -0.12, -0.27), vec3(0.0, -0.5, -0.2), 0.045);
  float atras = min(placa, torre);
  if (atras < d) m = 0.0;
  d = min(d, atras);
  if (modulo < d) m = 8.0;
  d = min(d, modulo);
  // el secundario y sus tres puntales
  const vec3 S2 = vec3(0.0, 0.17, 0.62);
  float sec = inCyl(q, S2 - vec3(0.0, 0.0, 0.015), S2 + vec3(0.0, 0.0, 0.02), 0.06) - 0.004;
  float pt = min(sdCapsule(q, vec3(0.0, 0.64, -0.03), S2, 0.0095), min(sdCapsule(q, vec3(-0.41, -0.065, -0.03), S2, 0.0095), sdCapsule(q, vec3(0.41, -0.065, -0.03), S2, 0.0095)));
  float sp = min(sec, pt);
  if (sp < d) m = sec < pt ? 0.0 : 6.0;
  d = min(d, sp);
  // el parasol, la nave y el panel solar
  float capa;
  float par = teParasol(q, capa);
  if (par < d) m = 3.0;
  d = min(d, par);
  float nave = sdRoundBox(q - vec3(0.0, -0.73, -0.05), vec3(0.2, 0.065, 0.18), 0.02);
  float panel = sdRoundBox(q - vec3(0.0, -0.79, 0.4), vec3(0.24, 0.007, 0.16), 0.004);
  if (nave < d) m = 0.0;
  d = min(d, nave);
  if (panel < d) m = 4.0;
  d = min(d, panel);
  return d;
}
float inTeleC(vec3 q) {
  vec2 r = q.xy - TE_C;
  float esp = max(abs(q.z + 0.2 * dot(r, r)) - 0.008, length(r) - 0.42);
  float par = max(abs(q.y + 0.56) - 0.03, max(abs(q.z + 0.1) - 0.55, abs(q.x) + abs(q.z + 0.1) * 0.9 - 0.9)) * 0.75;
  float nave = sdRoundBox(q - vec3(0.0, -0.73, -0.05), vec3(0.18, 0.05, 0.16), 0.02);
  return min(min(esp, par), nave) * 0.85;
}
float inTeleA(vec3 q) {
  return min(min(inCaja(q - vec3(0.0, 0.075, 0.12), vec3(0.55, 0.64, 0.55)), inCaja(q - vec3(0.0, -0.61, -0.1), vec3(1.12, 0.12, 0.72))),
             inCaja(q - vec3(0.0, -0.735, 0.175), vec3(0.27, 0.11, 0.43)));
}
vec3 inTeleCol(vec3 q, float m) {
  float v = 0.94 + 0.12 * vnoise(q * 8.0);
  if (m > 1.5 && m < 2.5) {
    // oro: cada segmento con su tono, un brillo vivo y el borde algo más oscuro
    vec2 id;
    teEspejo(q, id);
    float h = hash12(id + 3.7);
    gBri = 3.4;
    gEm = vec3(0.30, 0.18, 0.04) * 0.05;
    return mix(vec3(0.60, 0.40, 0.10), vec3(0.66, 0.46, 0.15), h) * v;
  }
  if (m > 2.5 && m < 3.5) {
    // el parasol: membrana plateada con un punto de lila; la capa de arriba, algo más clara
    float capa;
    teParasol(q, capa);
    gBri = 2.8; gTr = 0.5;
    float pl = 0.93 + 0.14 * vnoise(q * vec3(9.0, 2.0, 9.0));
    gEm = vec3(0.26, 0.22, 0.30) * 0.03;
    return mix(vec3(0.42, 0.38, 0.47), vec3(0.30, 0.27, 0.35), capa / 4.0) * pl;
  }
  if (m > 3.5 && m < 4.5) {
    vec2 g = fract(q.xz * vec2(16.0, 14.0));
    float lin = step(0.9, max(g.x, g.y));
    gBri = 2.4;
    return mix(vec3(0.05, 0.07, 0.11), vec3(0.30, 0.26, 0.18), lin) * v;
  }
  if (m > 5.5 && m < 6.5) { gBri = 2.6; return vec3(0.20, 0.19, 0.18) * v; }
  if (m > 7.5) { gBri = 2.6; return vec3(0.30, 0.18, 0.05) * v; }
  gBri = 1.8; return vec3(0.06, 0.06, 0.07) * v;
}
`;

// ---------------------------------------------------------------- MICROSCOPIO de colegio
const GLSL_COLE = /* glsl */`
// m: 0 esmalte oliva · 1 negro · 3 platina · 6 cromo · 7 espejo · 8 marca de la rueda · 9 rueda (moleteada)
const vec3 CO_RUEDA = vec3(-0.255, 0.13, 0.0);
float inCole(vec3 q, out float m) {
  m = 0.0;
  vec3 qo = vec3(q.x, q.y, abs(q.z));
  // el pie de herradura (abierto hacia +x) y la columna
  float pie = sdRoundBox(q - vec3(-0.02, -0.925, 0.0), vec3(0.4, 0.065, 0.33), 0.06);
  pie = smax(pie, -sdRoundBox(q - vec3(0.36, -0.925, 0.0), vec3(0.24, 0.2, 0.13), 0.06), 0.05);
  float col = sdRoundBox(q - vec3(-0.27, -0.66, 0.0), vec3(0.065, 0.24, 0.075), 0.04);
  // el brazo: un arco grueso en el plano xy, de la articulación (abajo a la izquierda) al soporte del tubo (arriba)
  float arco = sdArco(q.xy, vec2(0.0, 0.0), 0.42, vec2(-0.9396926, 0.3420201), vec2(0.4226183, 0.9063078)) - 0.06;
  float brazo = inExtr(arco, q.z, 0.065, 0.03);
  float piv = inCyl(q, vec3(-0.28, -0.4, -0.1), vec3(-0.28, -0.4, 0.1), 0.075) - 0.008;
  float sop = sdRoundBox(q - vec3(0.06, 0.42, 0.0), vec3(0.1, 0.06, 0.07), 0.025);
  float brp = sdRoundBox(q - vec3(-0.215, -0.3, 0.0), vec3(0.06, 0.03, 0.06), 0.015);
  float d = smin(pie, col, 0.08);
  d = smin(d, brazo, 0.05);
  d = smin(d, sop, 0.04);
  d = smin(d, brp, 0.02);
  if (piv < d) m = 6.0;
  d = smin(d, piv, 0.02);
  d *= 0.92;
  // el tubo (negro) y el ocular
  float tubo = inCyl(q, vec3(0.14, -0.02, 0.0), vec3(0.14, 0.8, 0.0), 0.062) - 0.004;
  float ocu = inCyl(q, vec3(0.14, 0.78, 0.0), vec3(0.14, 0.95, 0.0), 0.044) - 0.004;
  float tu = min(tubo, ocu);
  if (tu < d) m = 1.0;
  d = smin(d, tu, 0.012);
  float labio = inCyl(q, vec3(0.14, 0.93, 0.0), vec3(0.14, 0.965, 0.0), 0.052) - 0.004;
  // el revólver y los objetivos (cromo)
  float rev = inCyl(q, vec3(0.14, -0.06, 0.0), vec3(0.14, -0.01, 0.0), 0.1) - 0.01;
  float ob = capsulaC(q, vec3(0.14, -0.05, 0.0), vec3(0.14, -0.2, 0.0), 0.034, 0.025);
  ob = min(ob, capsulaC(qo, vec3(0.12, -0.05, 0.055), vec3(0.075, -0.17, 0.105), 0.03, 0.022));
  float cr = min(min(labio, rev), ob);
  if (cr < d) m = 6.0;
  d = smin(d, cr, 0.008);
  // la platina (negra) con dos pinzas
  float pla = sdRoundBox(q - vec3(0.07, -0.3, 0.0), vec3(0.26, 0.018, 0.25), 0.01);
  if (pla < d) m = 3.0;
  d = min(d, pla);
  float pinza = sdRoundBox(qo - vec3(0.1, -0.276, 0.13), vec3(0.1, 0.005, 0.017), 0.004);
  if (pinza < d) m = 6.0;
  d = min(d, pinza);
  // el espejo, colgado bajo la platina en una horquilla, inclinado hacia la luz
  vec3 e = q - vec3(0.14, -0.6, 0.0);
  e.xy = inGira(e.xy, 0.5);
  e.yz = inGira(e.yz, -0.45);
  float esp = inCyl(e, vec3(0.0, -0.014, 0.0), vec3(0.0, 0.014, 0.0), 0.115) - 0.006;
  float hor = sdCapsule(qo, vec3(0.14, -0.33, 0.135), vec3(0.14, -0.6, 0.135), 0.011);
  hor = min(hor, inCyl(qo, vec3(0.14, -0.6, 0.1), vec3(0.14, -0.6, 0.14), 0.022));
  if (hor < d) m = 6.0;
  d = min(d, hor);
  if (esp < d) m = (e.y > 0.008 && length(e.xz) < 0.1) ? 7.0 : 6.0;
  d = min(d, esp);
  // la rueda de enfoque grande (moleteada, con su marca) y el botón fino, a cada lado del brazo
  float rg = inCyl(qo, CO_RUEDA + vec3(0.0, 0.0, 0.06), CO_RUEDA + vec3(0.0, 0.0, 0.125), 0.15) - 0.012;
  float rf = inCyl(qo, CO_RUEDA + vec3(0.0, 0.0, 0.12), CO_RUEDA + vec3(0.0, 0.0, 0.175), 0.07) - 0.01;
  float ru = min(rg, rf);
  if (ru < d) m = rg < rf ? 9.0 : 1.0;
  d = smin(d, ru, 0.01);
  return d;
}
float inColeC(vec3 q) {
  float pie = sdRoundBox(q - vec3(-0.02, -0.925, 0.0), vec3(0.37, 0.045, 0.3), 0.04);
  float tubo = inCyl(q, vec3(0.14, 0.0, 0.0), vec3(0.14, 0.78, 0.0), 0.05);
  float pla = sdRoundBox(q - vec3(0.07, -0.3, 0.0), vec3(0.24, 0.01, 0.23), 0.008);
  float arco = sdArco(q.xy, vec2(0.0, 0.0), 0.42, vec2(-0.9396926, 0.3420201), vec2(0.4226183, 0.9063078)) - 0.045;
  return min(min(pie, tubo), min(pla, inExtr(arco, q.z, 0.05, 0.02))) * 0.85;
}
float inColeA(vec3 q) {
  return min(inCaja(q - vec3(0.0, -0.9, 0.0), vec3(0.45, 0.12, 0.38)), inCaja(q - vec3(-0.06, 0.04, 0.0), vec3(0.42, 0.96, 0.3)));
}
vec3 inColeCol(vec3 q, float m) {
  float v = 0.94 + 0.12 * vnoise(q * 8.0);
  if (m < 0.5) { gBri = 1.9; return vec3(0.21, 0.23, 0.15) * v; }
  if (m < 1.5) { gBri = 1.9; return vec3(0.03, 0.028, 0.03) * v; }
  if (m < 3.5) { gBri = 2.0; return vec3(0.035, 0.035, 0.04) * v; }
  if (m < 6.5) { gBri = 3.0; return vec3(0.30, 0.30, 0.31) * v; }
  if (m < 7.5) { gBri = 3.4; gEm = vec3(0.6, 0.62, 0.66) * 0.06; return vec3(0.55, 0.57, 0.6); }
  // la rueda: moleteado en el canto y una marca crema en la cara de fuera, que gira con uInstr.x
  vec3 r = vec3(q.x, q.y, abs(q.z)) - CO_RUEDA;
  float th = atan(r.y, r.x) - uInstr.x * sign(q.z + 1e-4);
  float rr = length(r.xy);
  float canto = smoothstep(0.13, 0.15, rr);
  gG = vec3(-sin(th), cos(th), 0.0) * cos(th * 36.0) * 0.18 * canto;
  vec2 mk = vec2(cos(uInstr.x), sin(uInstr.x) * sign(q.z + 1e-4)) * 0.108;
  float marca = (1.0 - smoothstep(0.016, 0.022, length(r.xy - mk))) * step(0.12, r.z);
  gBri = 3.0;
  return mix(mix(vec3(0.30, 0.30, 0.31), vec3(0.18, 0.18, 0.19), canto) * v, vec3(0.62, 0.56, 0.42), marca);
}
`;

const PARTES = {
  microscopio: { glsl: GLSL_MICRO, d: 'inMicro(q, m)', c: 'inMicroC(q)', a: 'inMicroA(q)', col: 'inMicroCol(q, m)' },
  anillo: { glsl: GLSL_ANILLO, d: 'inAnillo(q, m)', c: 'inAnilloC(q)', a: 'inAnilloA(q)', col: 'inAnilloCol(q, m)' },
  telescopio: { glsl: GLSL_TELE, d: 'inTele(q, m)', c: 'inTeleC(q)', a: 'inTeleA(q)', col: 'inTeleCol(q, m)' },
  colegio: { glsl: GLSL_COLE, d: 'inCole(q, m)', c: 'inColeC(q)', a: 'inColeA(q)', col: 'inColeCol(q, m)' },
};

function glslInstrumento(vars) {
  const ramas = (k) => vars.map((n) => `  if (abs(v - ${INSTR[n.toUpperCase()].toFixed(1)}) < 0.5) return ${PARTES[n][k]};\n`).join('');
  const p = vars[0];
  return `${GLSL_COMUN}${vars.map((n) => PARTES[n].glsl).join('\n')}
float pz_instrumento(vec3 q, vec4 T, out float m) {
  float v = floor(T.y + 0.5);
  m = 0.0;
${ramas('d')}  return ${PARTES[p].d};
}
float pzc_instrumento(vec3 q, vec4 T) {
  float v = floor(T.y + 0.5);
${ramas('c')}  return ${PARTES[p].c};
}
float pza_instrumento(vec3 q, vec4 T) {
  float v = floor(T.y + 0.5);
${ramas('a')}  return ${PARTES[p].a};
}
vec3 pzcol_instrumento(vec3 q, vec4 T, float m) {
  float v = floor(T.y + 0.5);
${ramas('col')}  return ${PARTES[p].col};
}
`;
}

// ---------------------------------------------------------------- API
/** El tipo 'instrumento' para crearPlato({ tiposExtra }). variantes: las que se meten en el sombreador. */
export function tiposInstrumentos({ variantes = NOMBRES } = {}) {
  let vars = variantes.map((n) => String(n).toLowerCase()).filter((n) => NOMBRES.includes(n));
  if (!vars.length) vars = ['telescopio'];
  return { instrumento: { radio: 1.35, glifos: [], envolvente: true, glsl: glslInstrumento(vars) } };
}
/** Los uniformes del kit, para crearPlato({ uniformes }) (y después, ponerInstrumentos). */
export function uniformesInstrumentos() {
  return { uInstr: { value: new THREE.Vector4(0, 0, 0, 0) } };
}
/** El estado de los instrumentos (cada fotograma): rueda (rad, colegio), haz y fase (anillo), luz (microscopio). */
export function ponerInstrumentos(U, { rueda = 0, haz = 0, fase = 0, luz = 0 } = {}) {
  U.uInstr.value.set(rueda, haz, fase, luz);
}
const varianteDe = (v) => (typeof v === 'string' ? INSTR[v.toUpperCase()] ?? 0 : v ?? 0);

/** Puntos locales con nombre de cada variante. */
export const PUNTOS = {
  [INSTR.MICROSCOPIO]: { ocular: [0.43, 0.88, 0], objetivo: [0.2, 0.14, 0], platina: [0.19, 0.093, 0], lampara: [0.19, -0.79, 0] },
  [INSTR.COLEGIO]: { ocular: [0.14, 0.97, 0], objetivo: [0.14, -0.225, 0], platina: [0.07, -0.28, 0], espejo: [0.14, -0.6, 0], rueda: [-0.255, 0.13, 0.13] },
  [INSTR.ANILLO]: { centro: [0, 0, 0], detector0: [ANILLO_R, 0, 0], detector1: [0, 0, ANILLO_R], detector2: [-ANILLO_R, 0, 0], detector3: [0, 0, -ANILLO_R] },
  [INSTR.TELESCOPIO]: { espejo: [0, 0.17, 0], secundario: [0, 0.17, 0.62], eje: [0, 0.17, 1], parasol: [0, -0.52, -0.1], panel: [0, -0.79, 0.4] },
};
/** Punto local → mundo con la colocación de P.pieza (pos, escala, rot euler YXZ, sq). */
export function aMundo({ pos = [0, 0, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1] } = {}, local) {
  const v = new THREE.Vector3(local[0] * sq[0] * escala, local[1] * sq[1] * escala, local[2] * sq[2] * escala);
  v.applyEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ'));
  return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
}
/**
 * Pone un instrumento (como P.pieza, entre P.limpiar() y P.render(n)). variante: 'microscopio' | 'anillo' | 'telescopio' |
 * 'colegio' o INSTR.*. Devuelve { puntos (mundo), punto(nombre), local(x, y, z) → mundo, haz(u) (anillo: el punto del
 * tubo a u vueltas) }.
 */
export function instrumento(P, i, { variante = 'telescopio', pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], toque = false, huellaFija = null } = {}) {
  const v = varianteDe(variante);
  P.pieza(i, { pos, escala, rot, sq, variante: v, toque, huellaFija });
  const col = { pos, escala, rot, sq };
  const puntos = Object.fromEntries(Object.entries(PUNTOS[v] ?? {}).map(([k, p]) => [k, aMundo(col, p)]));
  return {
    puntos, punto: (n) => puntos[n], local: (x, y, z) => aMundo(col, [x, y, z]),
    haz: (u) => aMundo(col, [ANILLO_R * Math.cos(2 * Math.PI * u), 0.044, ANILLO_R * Math.sin(2 * Math.PI * u)]),
  };
}
/** rot (euler YXZ) que pone el eje del telescopio (+z local) en la dirección desde → hacia (mundo), con el parasol abajo. */
export function apuntarTelescopio(desde, hacia) {
  const d = new THREE.Vector3(hacia[0] - desde[0], hacia[1] - desde[1], hacia[2] - desde[2]).normalize();
  return [-Math.asin(Math.max(-1, Math.min(1, d.y))), Math.atan2(d.x, d.z), 0];
}

// ---------------------------------------------------------------- el final de ep3-ojo = el principio de ep3-promesa
/**
 * El telescopio espacial flotando en el centro sobre un cielo estrellado (el último fotograma de ep3-ojo), con la cámara
 * de las pruebas (pos [0, 3,8, 15,5], mira [0, 2,3, 0], fov 28):
 *  · el centro del telescopio (su origen local) en P.punto(X, Y, Z), con la escala que da al parasol ANCHO px de ancho
 *    (unos 1,96 locales: escala = ANCHO / (1,96 · px por unidad)) y girado ROT;
 *  · el cielo: cieloOjo(lienzo, { semilla: SEMILLA }), y en 2D, por este orden: cielo, el telescopio (su foto, sin fondo),
 *    un halo cálido muy tenue detrás del espejo (HALO) y la sombra blanda bajo el sitio de Atom (SOMBRA_ATOM); Atom (ATOM,
 *    quieto) y el post del kit, encima.
 * ep3-ojo lo pinta así en su último fotograma (y en su último segundo, quieto); ep3-promesa puede empezar con
 * pintarFinOjo(P, U, i).
 */
export const FIN_OJO = {
  X: 960, Y: 480, Z: 4.0, ANCHO: 900, ROT: [0.26, -0.55, 0.04], SEMILLA: 3,
  HALO: { x: 960, y: 430, r: 420, alfa: 0.10 },
  SOMBRA_ATOM: { x: 230, y: 780, r0: 40, r1: 190, color: '6,6,9', alfa: 0.35 },
  ATOM: { x: 230, y: 780, d: 180 },
  NF: 9301,
};
const pxUnidad = (P, p) => { const a = P.proyectar(p), b = P.proyectar([p[0] + 1, p[1], p[2]]); return Math.hypot(b[0] - a[0], b[1] - a[1]); };
/** { pos, escala, rot } del telescopio del final de ep3-ojo en el plató P. */
export function encuadreFinOjo(P) {
  const pos = P.punto(FIN_OJO.X, FIN_OJO.Y, FIN_OJO.Z);
  return { pos, escala: FIN_OJO.ANCHO / (1.96 * pxUnidad(P, pos)), rot: [...FIN_OJO.ROT] };
}
// número pseudoaleatorio con semilla
function azarSem(s) { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
/**
 * Pinta el cielo estrellado de ep3-ojo en el lienzo c (su tamaño, sea cual sea; el diseño es de 1920 × 1080): carbón azul
 * noche con un velo cálido muy tenue en diagonal (la Vía Láctea, sin forma), unas 900 estrellas finas y unas 40 cuentas
 * de luz con su resplandor (blancas, crema, ámbar y alguna azulada), sin estrellas en el sitio de Atom. Con semilla:
 * siempre el mismo. Devuelve c.
 */
export function cieloOjo(c, { semilla = FIN_OJO.SEMILLA } = {}) {
  const g = c.getContext('2d'), k = c.width / 1920;
  const r = azarSem(semilla * 7919 + 13);
  g.save();
  g.setTransform(k, 0, 0, k, 0, 0);
  const fondo = g.createLinearGradient(0, 0, 1920, 1080);
  fondo.addColorStop(0, '#07080d'); fondo.addColorStop(0.5, '#0b0b11'); fondo.addColorStop(1, '#08080b');
  g.fillStyle = fondo; g.fillRect(0, 0, 1920, 1080);
  // el velo de la galaxia: manchas blandas en una banda diagonal
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) {
    const u = r(), x = -100 + u * 2120, y = 900 - u * 760 + (r() - 0.5) * 260, R = 120 + r() * 260;
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    const a = 0.018 + 0.03 * r();
    gr.addColorStop(0, `rgba(${r() < 0.5 ? '120,92,70' : '86,90,112'},${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(x - R, y - R, 2 * R, 2 * R);
  }
  const lejosDeAtom = (x, y) => Math.hypot(x - 230, y - 780) > 170;
  // estrellas finas (más en la banda)
  for (let i = 0; i < 900; i++) {
    let x = r() * 1920, y = r() * 1080;
    if (r() < 0.45) { const u = r(); x = -100 + u * 2120; y = 900 - u * 760 + (r() - 0.5) * 300; }
    if (!lejosDeAtom(x, y)) continue;
    const b = Math.pow(r(), 2.2), rad = 0.6 + 1.3 * b;
    const t = r();
    const col = t < 0.6 ? [235, 225, 205] : t < 0.85 ? [250, 210, 150] : [190, 205, 235];
    g.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.25 + 0.6 * b})`;
    g.beginPath(); g.arc(x, y, rad, 0, 2 * Math.PI); g.fill();
  }
  // cuentas de luz (las estrellas que brillan): núcleo con su resplandor
  for (let i = 0; i < 40; i++) {
    const x = 40 + r() * 1840, y = 30 + r() * 1020;
    if (!lejosDeAtom(x, y)) continue;
    const rad = 1.6 + 2.6 * Math.pow(r(), 1.5);
    const t = r();
    const col = t < 0.45 ? [255, 244, 225] : t < 0.75 ? [255, 214, 150] : t < 0.9 ? [255, 170, 100] : [200, 215, 255];
    const R = rad * 7;
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    gr.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.9)`);
    gr.addColorStop(0.12, `rgba(${col[0]},${col[1]},${col[2]},0.55)`);
    gr.addColorStop(0.35, `rgba(${col[0]},${col[1]},${col[2]},0.08)`);
    gr.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
    g.fillStyle = gr; g.fillRect(x - R, y - R, 2 * R, 2 * R);
  }
  g.restore();
  return c;
}
/**
 * El último fotograma de ep3-ojo sin Atom ni post (un lienzo del tamaño del de WebGL): el cielo, el halo, el telescopio
 * (pieza i, tipo 'instrumento' con la variante telescopio) y la sombra bajo el sitio de Atom. Pinta con P (limpia sus
 * piezas). fotos (opcional): { cielo, telescopio } ya pintadas con esta receta.
 */
export function pintarFinOjo(P, U, i, { fotos = {} } = {}) {
  const gl = P.renderer.domElement;
  const nuevo = () => { const c = document.createElement('canvas'); c.width = gl.width; c.height = gl.height; return c; };
  const cielo = fotos.cielo ?? cieloOjo(nuevo());
  const tele = fotos.telescopio ?? (() => {
    const E = encuadreFinOjo(P);
    ponerInstrumentos(U, {});
    P.limpiar(); instrumento(P, i, { variante: 'telescopio', ...E }); P.render(FIN_OJO.NF, { fondo: false });
    const c = nuevo(); c.getContext('2d').drawImage(gl, 0, 0); return c;
  })();
  P.limpiar();
  const c = nuevo(), g = c.getContext('2d'), k = c.width / 1920;
  g.drawImage(cielo, 0, 0);
  g.setTransform(k, 0, 0, k, 0, 0);
  const h = FIN_OJO.HALO;
  g.globalCompositeOperation = 'lighter';
  const gh = g.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
  gh.addColorStop(0, `rgba(255,190,110,${h.alfa})`); gh.addColorStop(1, 'rgba(255,170,90,0)');
  g.fillStyle = gh; g.fillRect(h.x - h.r, h.y - h.r, 2 * h.r, 2 * h.r);
  g.globalCompositeOperation = 'source-over';
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.drawImage(tele, 0, 0);
  g.setTransform(k, 0, 0, k, 0, 0);
  const s = FIN_OJO.SOMBRA_ATOM;
  const gr = g.createRadialGradient(s.x, s.y, s.r0, s.x, s.y, s.r1);
  gr.addColorStop(0, `rgba(${s.color},${s.alfa})`); gr.addColorStop(1, `rgba(${s.color},0)`);
  g.fillStyle = gr; g.fillRect(s.x - s.r1 - 10, s.y - s.r1 - 10, 2 * s.r1 + 20, 2 * s.r1 + 20);
  g.setTransform(1, 0, 0, 1, 0, 0);
  return c;
}
