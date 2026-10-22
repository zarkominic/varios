// KIT DEL EPISODIO 3 · «BALANZA» (kits/ep03-balanza.js). Lo crea ep3-proton y, una vez entregado con su hoja de prueba
// (escenas/ep03-balanza-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que
// lo usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta (una pieza propia con tiposExtra, o 2D
// encima) y lo dice en su informe. Lo usan: ep3-proton (lo crea), ep3-promesa, ep3-medula, ep3-gato, ep3-neutrones y
// ep3-borde. Sale de la balanza de arcilla de escenas/muestra-paleta-ep03.html (vista arcilla), la misma de latón con
// peana de nogal, para que se reconozca de una escena a otra.
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra), con el mismo material, la
// misma luz y la misma paleta, y una función por pieza que la coloca y le pasa sus parámetros:
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposBalanza, balanza, caida, silueta, cielo, BALANZA } from '/atomo/plato/kits/ep03-balanza.js';
//   const P = await crearPlato({ piezas: ['balanza', 'silueta', 'cielo', …], tiposExtra: tiposBalanza(), … });
//   function dibujar(t) {
//     …; P.limpiar();
//     const b = balanza(P, 0, { pos, escala, angulo: caida(ts, { t0: 3, a: BALANZA.A_MAX }) });
//     silueta(P, 1, { pos: b.platoIzq, escala: 0.8 * escalaBalanza });   // lo de los platos, en su punto
//     cielo(P, 2, { pos: b.platoDer, escala: 0.6 * escalaBalanza });
//     P.render(n);
//   }
//
// tiposBalanza(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados). Cada función de pieza se llama como
// P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de P.pieza (pos, escala,
// rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo.
//
// LA BALANZA (tipo 'balanza')
//   balanza(P, i, { pos, escala, rot, angulo: 0 }) → geometría (abajo)
//    · Unidades: las del brazo. El pivote en el origen; el brazo de latón va de x = −1 a 1 (BALANZA.L = 1); cada platillo
//      cuelga de su punta con tres hilos, BALANZA.HILO = 0,66 por debajo; el pie de latón baja hasta y = −1,24 y la peana
//      de nogal (0,76 × 0,12 × 0,34) está en y = −1,3 (su cara de abajo, el suelo, en BALANZA.SUELO = −1,36). Mira a +z.
//      Para posarla en el suelo del plató: pos = [x, −BALANZA.SUELO × escala, z].
//    · angulo (rad): el giro del brazo; positivo baja el platillo IZQUIERDO (el de −x), negativo el derecho; 0, nivelada.
//      BALANZA.A_MAX = 0,17 es la caída de la muestra (un plato que pesa mucho más que el otro). El fiel (la aguja de
//      latón que cuelga del pivote por delante del pie) gira con el brazo y marca en el cuadrante fijo del pie: la raya
//      central es «nivelada».
//    · Los platillos son cuencos de latón de 0,72 × 0,44 (BALANZA.PLATO: semiejes 0,36 y 0,22), abiertos hacia arriba.
//   geometriaBalanza({ pos, escala, rot, angulo }) (también sin plató) → { pivote, puntaIzq, puntaDer, platoIzq,
//      platoDer (mundo: el centro del fondo de cada platillo, donde se posa lo que lleva), peana (mundo: el centro de su
//      cara de arriba), fiel (mundo: la punta del fiel), angulo }.
//   enPlato(geo, lado, l = [0, 0, 0], escalaBalanza) → punto del mundo en el platillo 'izq' | 'der' desplazado l (unidades
//      de la balanza, en ejes del mundo girados como la balanza): para poner varias cosas en un plato.
//
// EL MOVIMIENTO (funciones puras de t, en segundos; devuelven el ángulo)
//   caida(t, { t0, dur: 0,7, de: 0, a: A_MAX, rebote: 0,18, peso: 2,4 }) — CAÍDA CON PESO: hasta t0 vale de; de t0 a
//     t0 + dur va de «de» a «a» arrancando despacio y acelerando (como algo pesado que vence); al llegar rebota un poco
//     (rebote: fracción del recorrido; dos o tres vaivenes amortiguados, ~0,9 s) y se queda en «a». rebote 0: llega sin
//     pasarse (ep3-proton: «nivelada, sin pasarse»; entonces el final también se frena: ease in-out).
//   vaiven(t, { t0: 0, centro: 0, amp: 0,06, f: 0,45, amortigua: 0 }) — la balanza que oscila sin decidirse (ep3-borde):
//     centro + amp · sen(2π f (t − t0)), con amortigua (1/s) para que se apague.
//   nivelar(t, { t0, dur, de }) = caida(t, { t0, dur, de, a: 0, rebote: 0 }).
//
// LO QUE VA EN LOS PLATOS (variantes; lo demás, quarks, protón, cucharita, esfera, se pone encima desde su kit)
//   Todas tienen el origen en el centro de su base (y = 0 apoya en el fondo del plato: pos = b.platoIzq), crecen hacia +y
//   y miran a +z. Escala: en unidades del mundo (para que quepa en un plato, escala ≈ 0,5–0,9 × la de la balanza).
//  · 'silueta' · silueta(P, i, { colores: [A, B], mezcla: 0, brillo: 0,4, peana: 1 })
//      La silueta de una persona de frente, recortada en una losa de arcilla carbón (grosor 0,07) y LLENA DE PUNTITOS:
//      cuentas en relieve en las dos caras, en una red hexagonal de paso SILUETA.PASO = 0,036 (unas 28 filas de la cabeza
//      a los pies). Mide 1 de alto (los pies en y = 0, la coronilla en 1) con las proporciones de HUMANO.md (cabeza 1/6,
//      hombros 0,25, piernas 0,47), de pie sobre una peanita (peana: 0 la quita, para ponerla en otro sitio). Colores:
//      A y B lineales [r, g, b] (por defecto A = ámbar, el de los electrones de Atom: «átomos»); mezcla (0…1) es la parte
//      de puntitos de color B (ep3-medula: A rojo de células, B verde de bacterias, mezcla 0,5). brillo (0…1): luz propia
//      de los puntitos (se leen de lejos y en el móvil). Los colores van en la pieza (uniformes): se pueden animar.
//      Devuelve { cabeza, pecho, pies, puntito(fx, fy) (mundo de la cuenta más cercana a la fracción fx, fy de la caja
//      de la silueta, en su cara de delante: para lanzarse hacia un puntito) }.
//  · 'cielo' · cielo(P, i, { brillo: 0,6 })
//      El cielo estrellado: una cúpula de arcilla azul noche (radio 0,5, alto 0,44) cuajada de estrellas, cuentas crema y
//      ámbar de tamaños distintos con luz propia, y la franja tenue de la Vía Láctea. brillo: la luz de las estrellas.
//      Devuelve { cima }.
//  · 'coches' · coches(P, i, { })
//      Una montaña de cochecitos de arcilla amontonados (carrocería, cabina con lunas oscuras y ruedas), de colores
//      apagados de la paleta: un monte de radio 0,46 y alto 0,72, con los coches de ~0,08 de largo. Devuelve { cima }.
//  · 'arena' · arena(P, i, { })
//      Un montón de arena fina: un cono suave de radio 0,36 y alto 0,26 con su grano, algún brillo de cuarzo y una
//      lengua de arena caída al pie. Devuelve { cima }.
//
// COSTE (este servidor, 1920 × 1080 con el plató, la sombra y el fondo; servidor tranquilo; con otras escenas al lado, el
// doble): ver window.__tiempos de la hoja de prueba. La balanza vacía a ~800 px de ancho, ~1 s; cada cosa en su plato
// suma poco (son pequeñas); la silueta grande sola (ep3-medula, ~800 px de alto), ~1–2 s; la montaña de coches es lo más
// caro por píxel (la red de coches). Lo quieto se fotografía; si solo gira el brazo, la balanza va viva (su sombra
// también se mueve).
//
// CONGELADO el 22-10-2026, entregado con la hoja de prueba (escenas/ep03-balanza-hoja.html).
import * as THREE from 'three';

const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);

export const BALANZA = { L: 1, HILO: 0.66, PIE: 1.24, PEANA_Y: -1.3, SUELO: -1.36, A_MAX: 0.17, PLATO: [0.36, 0.22], FONDO: -0.045, RADIO: 1.62 };
export const SILUETA = { PASO: 0.036, ALTO: 1 };
// los colores lineales de la paleta (como los de ep03-tocar.js)
export const COLORES_BALANZA = {
  ambar: [0.70, 0.36, 0.07], rojo: [0.42, 0.06, 0.035], verde: [0.13, 0.20, 0.05], crema: [0.56, 0.49, 0.37],
  azul: [0.07, 0.11, 0.20], terracota: [0.50, 0.15, 0.06],
};
// empaqueta un color lineal en un número (raíz cuadrada en 8 bits por canal: 24 bits exactos en un float)
export function empaquetar(c) {
  const q = (v) => Math.round(Math.sqrt(cl(v)) * 255);
  return q(c[0]) * 65536 + q(c[1]) * 256 + q(c[2]);
}

// ---------------------------------------------------------------- GLSL común
const GLSL_COMUN = /* glsl */`
#ifndef BALANZA_COMUN
#define BALANZA_COMUN 1
float bzH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
float bzH2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float bzH3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
vec3 bzColor(float v) {
  v = floor(v + 0.5);
  float r = floor(v / 65536.0), g = floor((v - r * 65536.0) / 256.0), b = v - r * 65536.0 - g * 256.0;
  vec3 c = vec3(r, g, b) / 255.0; return c * c;
}
float bzElip(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-5); }
mat2 bzGiro(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
#endif
`;

// ---------------------------------------------------------------- la balanza
const GLSL_BALANZA = /* glsl */`
const float BZ_H = ${fl(BALANZA.HILO)};
const vec2 BZ_P = vec2(${fl(BALANZA.PLATO[0])}, ${fl(BALANZA.PLATO[1])});
float bzPlatillo(vec3 q, vec3 P) {
  float d = bzElip(q - P, vec3(BZ_P.x, 0.085, BZ_P.y));
  d = smax(d, q.y - P.y - 0.012, 0.01);
  d = smax(d, -bzElip(q - P - vec3(0.0, 0.03, 0.0), vec3(BZ_P.x - 0.035, 0.07, BZ_P.y - 0.03)), 0.008);
  // el reborde: un churrito de latón alrededor
  vec3 r = q - P - vec3(0.0, 0.006, 0.0);
  float e = length(vec2(length(r.xz / BZ_P) - 0.97, r.y / 0.22)) * 0.22 - 0.012;
  return min(d, e);
}
float bzHilos(vec3 q, vec3 E, vec3 P) {
  float d = sdCapsule(q, E, P + vec3(-(BZ_P.x - 0.03), 0.0, 0.0), 0.006);
  d = min(d, sdCapsule(q, E, P + vec3(BZ_P.x - 0.03, 0.0, 0.0), 0.006));
  return min(d, sdCapsule(q, E, P + vec3(0.0, 0.0, -(BZ_P.y - 0.03)), 0.006));
}
// el cuadrante del fiel: un arco de latón fijo en el pie, con rayas (la del centro, más larga: «nivelada»)
float bzCuadrante(vec3 q, out float raya) {
  vec2 p = q.xy;
  float r = length(p), a = atan(p.x, -p.y);                 // a = 0 hacia abajo
  float banda = max(abs(r - 0.33) - 0.035, abs(a) - 0.42);
  float d = max(banda, abs(q.z - 0.035) - 0.01) - 0.006;
  // rayas en relieve cada 0,1 rad (la central, más larga y gruesa)
  float k = floor(a / 0.1 + 0.5), ac = k * 0.1;
  float larga = abs(k) < 0.5 ? 1.0 : 0.0;
  vec2 dir = vec2(sin(ac), -cos(ac));
  float along = dot(p, dir), ortho = abs(dot(p, vec2(-dir.y, dir.x)));
  float rr = max(abs(along - (0.33 + 0.012 * larga)) - (0.022 + 0.014 * larga), ortho - (0.006 + 0.003 * larga));
  rr = max(rr, abs(a) - 0.4);
  float dr = max(rr, abs(q.z - 0.05) - 0.008) - 0.002;
  raya = dr < d ? 1.0 : 0.0;
  return min(d, dr);
}
float pz_balanza(vec3 q, vec4 T, out float m) {
  float a = T.y, c = cos(a), s = sin(a);
  vec3 EL = vec3(-c, -s, 0.0), ER = vec3(c, s, 0.0);
  vec3 PL = EL - vec3(0.0, BZ_H, 0.0), PR = ER - vec3(0.0, BZ_H, 0.0);
  vec2 qb = vec2(c * q.x + s * q.y, -s * q.x + c * q.y);
  // el brazo: algo más grueso en el centro, con remates en las puntas
  float gr = 0.026 + 0.012 * (1.0 - smoothstep(0.0, 0.9, abs(qb.x)));
  float lat = sdRoundBox(vec3(qb.x, qb.y, q.z), vec3(1.0, gr, 0.026), 0.018);
  lat = min(lat, min(length(q - EL), length(q - ER)) - 0.044);
  lat = min(lat, length(q) - 0.075);
  lat = min(lat, sdCapsule(q, vec3(0.0, -1.24, 0.0), vec3(0.0, -0.05, 0.0), 0.038));
  lat = smin(lat, sdTorus(q - vec3(0.0, -1.2, 0.0), vec2(0.05, 0.022)), 0.02);   // collarín
  // el fiel: cuelga del pivote por delante del pie y gira con el brazo
  vec3 fd = vec3(s, -c, 0.0);
  float fiel = sdCapsule(q, vec3(0.0, 0.0, 0.07), fd * 0.37 + vec3(0.0, 0.0, 0.07), 0.011);
  fiel = min(fiel, length(q - vec3(0.0, 0.0, 0.07)) - 0.03);
  float raya;
  float cuad = bzCuadrante(q, raya);
  lat = min(lat, min(fiel, cuad));
  lat = min(lat, min(bzPlatillo(q, PL), bzPlatillo(q, PR)));
  float peana = sdRoundBox(q - vec3(0.0, ${fl(BALANZA.PEANA_Y)}, 0.0), vec3(0.38, 0.06, 0.17), 0.035);
  float hilo = min(bzHilos(q, EL, PL), bzHilos(q, ER, PR));
  float d = smin(lat, peana, 0.02);
  m = peana < lat ? 1.0 : 0.0;
  if (hilo < d) m = 2.0;
  if (cuad < min(d, hilo) + 0.001 && raya > 0.5) m = 3.0;
  d = min(d, hilo);
  return d * 0.9;
}
float pzc_balanza(vec3 q, vec4 T) {
  float a = T.y, c = cos(a), s = sin(a);
  vec3 EL = vec3(-c, -s, 0.0), ER = vec3(c, s, 0.0);
  vec2 qb = vec2(c * q.x + s * q.y, -s * q.x + c * q.y);
  float d = sdRoundBox(vec3(qb, q.z), vec3(0.98, 0.022, 0.022), 0.015);
  d = min(d, sdCapsule(q, vec3(0.0, -1.24, 0.0), vec3(0.0, -0.05, 0.0), 0.032));
  d = min(d, sdRoundBox(q - vec3(0.0, ${fl(BALANZA.PEANA_Y)}, 0.0), vec3(0.37, 0.05, 0.16), 0.03));
  d = min(d, max(bzElip(q - EL + vec3(0.0, BZ_H, 0.0), vec3(BZ_P.x - 0.02, 0.075, BZ_P.y - 0.02)), q.y - EL.y + BZ_H));
  return min(d, max(bzElip(q - ER + vec3(0.0, BZ_H, 0.0), vec3(BZ_P.x - 0.02, 0.075, BZ_P.y - 0.02)), q.y - ER.y + BZ_H));
}
vec3 pzcol_balanza(vec3 q, vec4 T, float m) {
  if (m > 2.5) { gBri = 3.0; return C_MARFIL * 0.8; }
  if (m > 1.5) return vec3(0.05, 0.04, 0.03);
  if (m > 0.5) {
    float n = vnoise(vec3(q.x * 5.0, q.y * 30.0, q.z * 5.0));
    return C_WOOD * (0.9 + 0.08 * sin((q.x + 0.3 * q.z + 0.04 * n) * 60.0 + 3.0 * n) + 0.2 * (n - 0.5));
  }
  gBri = 3.2;
  return C_BRASS * 0.8 * (0.88 + 0.2 * vnoise(q * vec3(30.0, 3.0, 30.0)));
}
`;

// ---------------------------------------------------------------- la silueta de puntitos
// la silueta en 2D (de frente; y de 0 a 1), con las líneas de HUMANO.md (desde la coronilla: barbilla 0,17, hombros
// 0,21, codos y cintura 0,40, muñecas y entrepierna 0,53, dedos 0,63, rodillas 0,73)
const GLSL_SILUETA = /* glsl */`
const float SI_PASO = ${fl(SILUETA.PASO)};
float siCap(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}
float siForma(vec2 p) {
  vec2 s = vec2(abs(p.x), p.y);
  // cabeza (1/6 de alto) y cuello
  float d = length((p - vec2(0.0, 0.913)) / vec2(0.064, 0.084)) - 1.0;
  d *= 0.064;
  d = smin(d, siCap(s, vec2(0.0, 0.80), vec2(0.0, 0.85), 0.03, 0.028), 0.02);
  // tronco: de los hombros (0,79; 0,125 de ancho) a la cintura (0,60) y las caderas (0,50)
  d = smin(d, siCap(s, vec2(0.082, 0.765), vec2(0.06, 0.62), 0.048, 0.04), 0.03);
  d = smin(d, siCap(s, vec2(0.0, 0.76), vec2(0.0, 0.50), 0.075, 0.09), 0.04);
  d = smin(d, siCap(s, vec2(0.05, 0.53), vec2(0.06, 0.49), 0.05, 0.045), 0.02);
  // brazos colgando: hombro → codo (0,60) → muñeca (0,47) → dedos (0,37)
  d = smin(d, siCap(s, vec2(0.12, 0.765), vec2(0.142, 0.60), 0.032, 0.026), 0.015);
  d = min(d, siCap(s, vec2(0.142, 0.60), vec2(0.15, 0.47), 0.026, 0.021));
  d = smin(d, siCap(s, vec2(0.15, 0.47), vec2(0.152, 0.38), 0.024, 0.016), 0.01);
  // piernas: cadera → rodilla (0,27) → tobillo (0,04) y el pie
  d = smin(d, siCap(s, vec2(0.052, 0.48), vec2(0.055, 0.27), 0.05, 0.036), 0.02);
  d = min(d, siCap(s, vec2(0.055, 0.27), vec2(0.05, 0.045), 0.036, 0.026));
  d = smin(d, siCap(s, vec2(0.05, 0.03), vec2(0.075, 0.018), 0.022, 0.018), 0.015);
  return d;
}
// T.x = color A (empaquetado) · T.y = mezcla (B) + 2 × peana · T.z = brillo · T.w = color B
float siPeana(vec4 T) { return floor(T.y * 0.5 + 0.001); }
float siMezcla(vec4 T) { return T.y - 2.0 * siPeana(T); }
const float SI_GR = 0.035;
float pz_silueta(vec3 q, vec4 T, out float m) {
  float d2 = siForma(q.xy);
  vec2 w = vec2(d2 + 0.012, abs(q.z) - SI_GR + 0.012);
  float losa = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.012;
  // cuentas: red hexagonal en xy, en las dos caras
  vec2 rp = vec2(SI_PASO, SI_PASO * 0.8660254);
  vec2 g = q.xy / rp;
  float fy = floor(g.y + 0.5);
  float fx = floor(g.x - 0.5 * mod(fy, 2.0) + 0.5) + 0.5 * mod(fy, 2.0);
  vec2 c = vec2(fx, fy) * rp;
  float dentro = siForma(c);
  float rb = SI_PASO * 0.36 * (0.85 + 0.3 * bzH2(c * 31.0));
  float cuenta = dentro < -0.006 ? length(vec3(q.xy - c, abs(q.z) - SI_GR + 0.004)) - rb : 1e5;
  // se queda entre las de al lado (las cuentas son más pequeñas que la mitad del paso: el rayo no las salta)
  m = cuenta < losa ? 1.0 + bzH2(c * 17.3) : 0.0;
  float d = min(losa, cuenta);
  if (siPeana(T) > 0.5) {
    float pe = sdRoundBox(q - vec3(0.0, 0.012, 0.0), vec3(0.13, 0.012, 0.065), 0.01);
    if (pe < d) m = -1.0;
    d = min(d, pe);
  }
  return d * 0.85;
}
float pzc_silueta(vec3 q, vec4 T) {
  float d2 = siForma(q.xy);
  return max(d2 + 0.004, abs(q.z) - SI_GR + 0.004);
}
float pza_silueta(vec3 q, vec4 T) {
  float d2 = siForma(q.xy);
  vec2 w = vec2(d2 - 0.012, abs(q.z) - SI_GR - SI_PASO * 0.45);
  float d = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.004;
  if (siPeana(T) > 0.5) d = min(d, sdRoundBox(q - vec3(0.0, 0.012, 0.0), vec3(0.135, 0.016, 0.07), 0.01));
  return d;
}
vec3 pzcol_silueta(vec3 q, vec4 T, float m) {
  if (m < -0.5) { gBri = 3.0; return C_BRASS * 0.75; }
  if (m < 0.5) return vec3(0.022, 0.022, 0.026) * (0.85 + 0.3 * vnoise(q * 40.0));
  float h = m - 1.0;
  bool esB = h < siMezcla(T);
  vec3 c = esB ? bzColor(T.w) : bzColor(T.x);
  c *= 0.85 + 0.3 * fract(h * 7.31);
  gTr = 0.3;
  gEm = c * (0.04 + 0.5 * T.z) * (0.75 + 0.5 * fract(h * 13.7));
  return c;
}
`;

// ---------------------------------------------------------------- el cielo estrellado
const GLSL_CIELO = /* glsl */`
const vec3 CI_R = vec3(0.5, 0.44, 0.5);
float ciEstrellas(vec3 q, out float id) {
  // una estrella por celda de una red en ángulos sobre la cúpula (filas de 0,15 rad de elevación; en cada fila, celdas
  // de ~0,15 rad de arco), con la estrella dentro de su celda y lejos del borde (no se corta)
  vec3 n = normalize(q / CI_R);
  float el = asin(clamp(n.y, 0.0, 1.0)), az = atan(n.z, n.x);
  const float CA = 0.15;
  float fila = floor(el / CA);
  float elc = (fila + 0.5) * CA;
  float nAz = max(1.0, floor(6.2832 * cos(elc) / CA));
  float col = floor((az + 3.14159) / 6.2832 * nAz);
  vec2 ce = vec2(fila, col);
  float h = bzH2(ce + 3.1);
  float es = (fila + 0.25 + 0.5 * bzH2(ce + 1.7)) * CA;
  float as = (col + 0.25 + 0.5 * bzH2(ce + 5.3)) / nAz * 6.2832 - 3.14159;
  vec3 o = vec3(cos(es) * cos(as), sin(es), cos(es) * sin(as)) * CI_R * 1.004;
  float r = h < 0.6 ? 0.006 + 0.006 * bzH2(ce + 9.7) : (h < 0.92 ? 0.011 + 0.006 * bzH2(ce + 2.2) : 0.0);
  if (es < 0.06) r = 0.0;
  id = h;
  return r > 0.0 ? length(q - o) - r : 1e5;
}
float pz_cielo(vec3 q, vec4 T, out float m) {
  float d = bzElip(q, CI_R);
  d = smax(d, -q.y, 0.02);
  d -= 0.004 * bultos(q * 8.0);
  float id;
  float de = ciEstrellas(q, id);
  m = de < d ? 1.0 + 0.99 * id : 0.0;
  return min(d, de) * 0.8;
}
float pzc_cielo(vec3 q, vec4 T) { return max(bzElip(q, CI_R - 0.01), -q.y); }
vec3 pzcol_cielo(vec3 q, vec4 T, float m) {
  float b = T.z;
  if (m > 0.5) {
    float h = m - 1.0;
    vec3 c = h < 0.35 ? vec3(0.62, 0.42, 0.14) : vec3(0.60, 0.55, 0.44);
    gEm = c * (0.3 + 1.1 * b) * (0.7 + 0.6 * fract(h * 17.0));
    gBri = 2.0;
    return c;
  }
  vec3 n = normalize(q / CI_R);
  // azul noche con la franja de la Vía Láctea (inclinada) y polvo de estrellas diminutas
  float banda = exp(-pow(dot(n, normalize(vec3(0.35, 0.25, -0.9))) / 0.2, 2.0));
  float polvo = smoothstep(0.82, 0.97, vnoise(q * 90.0));
  vec3 c = vec3(0.022, 0.03, 0.06) * (0.85 + 0.3 * vnoise(q * 9.0));
  c += vec3(0.05, 0.045, 0.05) * banda * (0.6 + 0.6 * vnoise(q * 14.0));
  gEm = (vec3(0.05, 0.045, 0.04) * banda * 0.35 + vec3(0.5, 0.45, 0.35) * polvo * 0.25) * (0.4 + b);
  gBri = 1.4;
  return c;
}
`;

// ---------------------------------------------------------------- la montaña de coches
const GLSL_COCHES = /* glsl */`
const float CO_C = 0.1;     // celda de la red de coches
float coMonte(vec3 q) {
  // monte de radio 0,46 y alto 0,72, la cima redondeada
  float r = length(q.xz);
  float h = 0.72 * (1.0 - pow(clamp(r / 0.46, 0.0, 1.0), 1.25));
  return max((q.y - h) * 0.42, -q.y);
}
float coCoche(vec3 p, float h, out float mm) {
  // carrocería, cabina y cuatro ruedas (el coche mira a +x), de 0,08 de largo
  float cuerpo = sdRoundBox(p - vec3(0.0, 0.0, 0.0), vec3(0.04, 0.011, 0.019), 0.008);
  float cabina = sdRoundBox(p - vec3(-0.004, 0.017, 0.0), vec3(0.021, 0.009, 0.016), 0.007);
  vec3 r = p; r.x = abs(r.x) - 0.025; r.z = abs(r.z) - 0.018; r.y += 0.011;
  float rueda = max(length(r.xy) - 0.011, abs(r.z) - 0.005);
  float d = smin(cuerpo, cabina, 0.006);
  mm = 0.0;
  // las lunas: una franja de la cabina
  if (cabina < cuerpo && p.y > 0.016) mm = 1.0;
  if (rueda < d) mm = 2.0;
  return min(d, rueda);
}
float pz_coches(vec3 q, vec4 T, out float m) {
  float monte = coMonte(q);
  // el núcleo oscuro del monte (los huecos entre coches se ven en sombra)
  float nucleo = monte + 0.05;
  m = 0.0;
  float d = nucleo;
  // los coches de la celda en la que está q y de la de arriba (para que no se corten por arriba)
  vec3 ce = floor(q / CO_C);
  for (int k = 0; k < 2; k++) {
    vec3 cc = ce + vec3(0.0, float(k), 0.0);
    vec3 c = (cc + 0.5) * CO_C;
    if (coMonte(c) > 0.0) continue;
    float h = bzH3(cc);
    vec3 p = q - c - (vec3(bzH3(cc + 1.3), bzH3(cc + 2.9), bzH3(cc + 4.1)) - 0.5) * 0.012;
    p.xz = bzGiro(h * 6.2832) * p.xz;
    p.xy = bzGiro((bzH3(cc + 6.6) - 0.5) * 0.9) * p.xy;
    p.yz = bzGiro((bzH3(cc + 7.7) - 0.5) * 0.7) * p.yz;
    float mm;
    float dc = coCoche(p, h, mm);
    if (dc < d) { d = dc; m = 1.0 + mm + 3.0 * floor(h * 7.0); }
  }
  // no saltarse una celda: el rayo avanza como mucho hasta el borde de la suya
  vec3 f = fract(q / CO_C) * CO_C;
  float borde = min(min(min(f.x, CO_C - f.x), min(f.y, CO_C - f.y)), min(f.z, CO_C - f.z)) + 0.004;
  if (monte < 0.06) d = min(d, borde);
  else d = min(d, monte);
  return d * 0.9;
}
float pzc_coches(vec3 q, vec4 T) { return coMonte(q) + 0.05; }
float pza_coches(vec3 q, vec4 T) { return coMonte(q) - 0.06; }
vec3 pzcol_coches(vec3 q, vec4 T, float m) {
  if (m < 0.5) return vec3(0.02, 0.018, 0.016);
  float k = floor((m - 1.0) / 3.0), mm = m - 1.0 - 3.0 * k;
  if (mm > 1.5) return vec3(0.015, 0.014, 0.013);
  if (mm > 0.5) { gBri = 3.0; return vec3(0.03, 0.04, 0.05); }
  vec3 c;
  if (k < 0.5) c = vec3(0.42, 0.08, 0.04);
  else if (k < 1.5) c = vec3(0.56, 0.49, 0.37);
  else if (k < 2.5) c = vec3(0.07, 0.11, 0.18);
  else if (k < 3.5) c = vec3(0.45, 0.28, 0.06);
  else if (k < 4.5) c = vec3(0.12, 0.14, 0.07);
  else if (k < 5.5) c = vec3(0.25, 0.24, 0.22);
  else c = vec3(0.5, 0.15, 0.06);
  gBri = 2.2;
  return c * (0.9 + 0.2 * vnoise(q * 60.0));
}
`;

// ---------------------------------------------------------------- el montón de arena
const GLSL_ARENA = /* glsl */`
float arMonte(vec3 q) {
  float r = length(q.xz * vec2(1.0, 1.15));
  float h = 0.26 * (1.0 - smoothstep(0.0, 1.0, r / 0.36)) + 0.035 * exp(-pow((q.x - 0.25) / 0.07, 2.0) - pow((q.z - 0.06) / 0.1, 2.0));
  return max((q.y - h) * 0.6, -q.y);
}
float pz_arena(vec3 q, vec4 T, out float m) {
  m = 0.0;
  return arMonte(q) - 0.003 * vnoise(q * 120.0) - 0.004 * bultos(q * 6.0);
}
float pzc_arena(vec3 q, vec4 T) { return arMonte(q) + 0.01; }
vec3 pzcol_arena(vec3 q, vec4 T, float m) {
  float g = vnoise(q * 260.0), b = vnoise(q * 40.0);
  vec3 c = C_SAND * (0.8 + 0.25 * g + 0.15 * b) + vec3(0.03, 0.02, 0.005) * step(0.8, g);
  // granos de cuarzo que brillan
  float cu = step(0.93, vnoise(q * 430.0 + 3.0));
  gBri = 1.2 + 4.0 * cu;
  gEm = vec3(0.4, 0.36, 0.28) * cu * 0.08;
  return c;
}
`;

const TIPOS = {
  balanza: { radio: BALANZA.RADIO, glifos: [], glsl: GLSL_COMUN + GLSL_BALANZA },
  silueta: { envolvente: true, radio: 0.98, glifos: [], glsl: GLSL_COMUN + GLSL_SILUETA },
  cielo: { radio: 0.72, glifos: [], glsl: GLSL_COMUN + GLSL_CIELO },
  coches: { envolvente: true, radio: 0.9, glifos: [], glsl: GLSL_COMUN + GLSL_COCHES },
  arena: { radio: 0.52, glifos: [], glsl: GLSL_COMUN + GLSL_ARENA },
};
export const TIPOS_BALANZA = TIPOS;
export function tiposBalanza(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-balanza: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
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

export function geometriaBalanza(o = {}) {
  const b = base(o);
  const a = o.angulo ?? 0, c = Math.cos(a), s = Math.sin(a);
  const EL = [-c, -s, 0], ER = [c, s, 0];
  const fondo = (E) => [E[0], E[1] - BALANZA.HILO + BALANZA.FONDO, 0];
  return {
    angulo: a,
    pivote: mundoPieza(b, [0, 0, 0]), puntaIzq: mundoPieza(b, EL), puntaDer: mundoPieza(b, ER),
    platoIzq: mundoPieza(b, fondo(EL)), platoDer: mundoPieza(b, fondo(ER)),
    peana: mundoPieza(b, [0, BALANZA.PEANA_Y + 0.06, 0]), fiel: mundoPieza(b, [s * 0.37, -c * 0.37, 0.07]),
    _o: { ...b, angulo: a },
  };
}
export function balanza(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.angulo ?? 0 });
  return geometriaBalanza(o);
}
// punto en el plato 'izq' | 'der', desplazado l (unidades de la balanza, girado como ella)
export function enPlato(geo, lado, l = [0, 0, 0]) {
  const o = geo._o, a = o.angulo, c = Math.cos(a), s = Math.sin(a);
  const E = lado === 'izq' ? [-c, -s, 0] : [c, s, 0];
  return mundoPieza(o, [E[0] + l[0], E[1] - BALANZA.HILO + BALANZA.FONDO + l[1], l[2]]);
}

// ---------------------------------------------------------------- el movimiento
const eic = (x) => x * x * x;
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export function caida(t, { t0 = 0, dur = 0.7, de = 0, a = BALANZA.A_MAX, rebote = 0.18, peso = 2.4 } = {}) {
  if (t <= t0) return de;
  const u = (t - t0) / dur;
  if (rebote <= 0) return de + (a - de) * eio(cl(u));
  if (u < 1) return de + (a - de) * Math.pow(u, peso);
  // rebote amortiguado: arranca hacia atrás (choca y vuelve) y se asienta
  const v = (t - t0 - dur);
  return a - (a - de) * rebote * Math.exp(-v * 4.2) * Math.sin(v * 2 * Math.PI * 1.6);
}
export function vaiven(t, { t0 = 0, centro = 0, amp = 0.06, f = 0.45, amortigua = 0 } = {}) {
  const v = Math.max(0, t - t0);
  return centro + amp * Math.sin(2 * Math.PI * f * v) * Math.exp(-amortigua * v);
}
export const nivelar = (t, { t0 = 0, dur = 1, de = BALANZA.A_MAX } = {}) => caida(t, { t0, dur, de, a: 0, rebote: 0 });

// ---------------------------------------------------------------- lo que va en los platos
export function silueta(P, i, o = {}) {
  const b = base(o);
  const [A, B] = o.colores ?? [COLORES_BALANZA.ambar, COLORES_BALANZA.ambar];
  const mezcla = Math.min(0.999, cl(o.mezcla ?? 0));
  const peana = (o.peana ?? 1) ? 1 : 0;
  P.pieza(i, { ...b, variante: mezcla + 2 * peana, color: cl(o.brillo ?? 0.4) });
  escribirT(P, i, empaquetar(A), empaquetar(B ?? A));
  return {
    cabeza: mundoPieza(b, [0, 0.913, 0]), pecho: mundoPieza(b, [0, 0.68, 0.04]), pies: mundoPieza(b, [0, 0, 0]),
    puntito: (fx, fy) => {
      // la cuenta de la red más cercana a (x, y) de la caja de la silueta (x ∈ [−0,18, 0,18], y ∈ [0, 1])
      const px = -0.18 + 0.36 * fx, py = fy;
      const rx = SILUETA.PASO, ry = SILUETA.PASO * 0.8660254;
      const gy = Math.round(py / ry), off = 0.5 * (((gy % 2) + 2) % 2);
      const gx = Math.floor(px / rx - off + 0.5) + off;
      return mundoPieza(b, [gx * rx, gy * ry, 0.035]);
    },
  };
}
export function cielo(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, color: cl(o.brillo ?? 0.6) });
  return { cima: mundoPieza(b, [0, 0.44, 0]) };
}
export function coches(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  return { cima: mundoPieza(b, [0, 0.72, 0]) };
}
export function arena(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  return { cima: mundoPieza(b, [0, 0.26, 0]) };
}
