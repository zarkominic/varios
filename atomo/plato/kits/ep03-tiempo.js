// KIT DEL EPISODIO 3 · «TIEMPO» (kits/ep03-tiempo.js). Lo crea ep3-sol y, una vez entregado con su hoja de prueba
// (escenas/ep03-tiempo-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que lo
// usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta y lo dice en su informe.
// Lo usan: ep3-sol (lo crea), ep3-medula, ep3-lectura, ep3-luz y ep3-mapa.
//
// Tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra y uniformes) y, para la luz, una
// ayuda 2D. Sin palabras: solo números (cifras de churro del kit, sin separadores ni decimales).
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposTiempo, uniformesTiempo, calendario, reloj, arena, vidrioArena, rayo, caminoRebotes } from '/atomo/plato/kits/ep03-tiempo.js';
//   const P = await crearPlato({ piezas: ['calendario', 'reloj'], tiposExtra: tiposTiempo(['calendario', 'reloj']),
//                                uniformes: uniformesTiempo(), ... });   // con otros kits: { ...uniformesTiempo(), ...otros }
//   function dibujar(t) { ...; P.limpiar(); calendario(P, 0, { pos, escala, numero: 2000 }); P.render(n); rayo(g, puntos, { hasta }); }
//
// Los parámetros de cada pieza van en uniformes del kit: UN CALENDARIO, UN RELOJ Y UN RELOJ DE ARENA POR FOTOGRAMA (para
// dos, dos fotos). Cada función se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en
// `piezas`, y acepta lo de P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo. Las
// piezas miran a +z (de cara a la cámara con rot [0, 0, 0]); su arriba es +y.
//
// LAS PIEZAS
//  · 'calendario' · calendario(P, i, { numero: 1, anterior: null, hoja: 0, mes: null, dias: 30 })
//      Taco de calendario de arcilla: un bloque de hojas crema (de x −0,5 a 0,5, y −0,62 a 0,42, con el canto de las
//      hojas a rayas), la cabecera de terracota arriba (y 0,42 a 0,62) con dos anillas de latón, y en la hoja de delante
//      el número en cifras de churro oscuras (hasta 7 cifras; se encogen para caber). hoja (0…1): la hoja de delante
//      (que lleva `anterior`; por defecto numero − 1) se levanta por la cabecera y se va por detrás, enseñando `numero`.
//      Para que las hojas pasen solas: hojaEn(t, claves) da { numero, anterior, hoja } (ver abajo).
//      mes (1…12): en vez de un número grande, la hoja es la de un mes: su número arriba, grande, y debajo los días (1 …
//      dias, de 28 a 31) en una cuadrícula de siete columnas (ep3-medula: «un calendario de cuatro meses»); con hoja,
//      la de delante es el mes `anterior`.
//      Devuelve { hoja: centro de la hoja (mundo), arriba: el centro de la cabecera (mundo) }. Unidades: el bloque mide
//      1 × 1,24 × 0,16.
//  · 'reloj' · reloj(P, i, { minutos: 0, segundos: null, sector: null, numeros: 'horas' })
//      Reloj de pared de arcilla: caja redonda de terracota con aro de latón (radio 1), esfera crema con las 60 marcas
//      y 12 números de churro, aguja de las horas y de los minutos (oscuras) y, si se da segundos, el segundero
//      (terracota, fino). minutos: el tiempo en minutos desde las 12 (mueve las dos agujas: 90 = las 1 y media).
//      segundos: la posición del segundero (0…60). sector: [desde, hasta] en minutos: una cuña de ámbar sobre la esfera
//      (el tiempo que pasa; con segundero, en segundos: sectorSegundos: true). numeros: 'horas' (1…12) o 'minutos' (5, 10
//      … 55 y 0 arriba). Devuelve { centro, punta: punta del minutero (mundo), radio (mundo) }.
//  · 'arena' · arena(P, i, { cae: 0 })
//      Reloj de arena: dos tapas de nogal (radio 0,55), tres columnas torneadas, la arena ocre en la ampolla de arriba
//      (con su embudo) y su montón abajo, y el hilo que cae entre las dos mientras cae está entre 0 y 1. cae (0…1): la
//      arena que ya ha caído. El vidrio va en 2D (no hay piezas transparentes): vidrioArena(g, info, { fuerza }) pinta
//      encima el contorno de las dos ampollas, con sus brillos, a partir de lo que devuelve arena(): { centro, contorno
//      (px: los dos lados de la silueta del vidrio) }. Unidades: mide 2 de alto (y −1 … 1).
//
// LA LUZ (2D, en un lienzo encima de la foto o del plató; g con la transformación de 1920 × 1080)
//  · rayo(g, puntos, { hasta: ∞, grosor: 7, brillo: 1, cabeza: 1, sombra: 1, color: 'luz' })
//      El rayo de luz de alambre: un alambre de latón claro y caliente, con su brillo especular, un resplandor
//      cálido alrededor y una sombra corta debajo (todo con trazos, sin filtros de lienzo: unos milisegundos), que va por la poligonal `puntos` ([[x, y], …] px) hasta la longitud
//      `hasta` (px recorridos desde el primer punto: para que avance). cabeza (0…1): la cuenta de luz en la punta.
//      color: 'luz' (blanco cálido) o 'frio' (blanco azulado). Devuelve { punta: [x, y], largo (de toda la poligonal),
//      angulo (de la punta) }.
//  · caminoRebotes({ desde, n: 24, paso: [40, 90], dentro: (x, y) → bool, salida: [x, y] | null, semilla: 1, deriva })
//      → [[x, y], …]: un camino de pinball (tramos rectos que rebotan) que empieza en `desde`, se queda donde dentro()
//      diga y, si se da salida, acaba en ese punto (el rayo sale por ahí). deriva (0…1): cuánto tira hacia la salida.
//  · caminoVueltas({ centro, rx, ry, vueltas: 7,5, desde: 0, giro: 0, puntos: 64 por vuelta }) → [[x, y], …]: un
//    camino que da vueltas a una elipse (ep3-luz: siete vueltas y media a la Tierra), con las vueltas algo separadas.
//  · largoCamino(puntos), puntoEn(puntos, s) → [x, y, ángulo] a la distancia s.
//  · hojaEn(t, claves) → { numero, anterior, hoja }: claves [[t0, numero0], [t1, numero1], …] (en cada ti ya se ve
//    numeroi; la hoja anterior se va en DUR_HOJA s antes de ti).
//
// COSTE (este servidor, 1920 × 1080, la pieza sola llenando ~400 px): calendario ~0,4–0,7 s, reloj ~0,5–0,8 s, reloj de
// arena ~0,5 s; el rayo y el vidrio, unos milisegundos.
//
// CONGELADO el 21-10-2026, entregado con la hoja de prueba (escenas/ep03-tiempo-hoja.html). Las escenas que lo usan no lo
// cambian.
import * as THREE from 'three';

const W = 1920, H = 1080;
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const mix = (a, b, x) => a + (b - a) * x;
const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const DIGITOS = '0123456789'.split('');

// ---------------------------------------------------------------- GLSL común: cifras pintadas (con relieve en la normal)
const GLSL_COMUN = /* glsl */`
#ifndef TIEMPO_COMUN
#define TIEMPO_COMUN 1
uniform vec4 uCal;     // número · anterior · hoja · modo (0 número, 1 mes)
uniform vec4 uCal2;    // días del mes · días del anterior · —
uniform vec4 uReloj;   // minutos · segundos (−1: sin segundero) · sector desde · sector hasta (minutos o segundos)
uniform vec4 uReloj2;  // números (0 horas, 1 minutos) · sector en segundos (1) · —
uniform vec4 uArena;   // cae (0…1) · —
const float P10[9] = float[9](1.0, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, 10000000.0, 100000000.0);
float tiDigito(vec2 p, float d) {
  float dp;
  if (d < 0.5) return g0(p, dp);
  if (d < 1.5) return g1(p, dp);
  if (d < 2.5) return g2(p, dp);
  if (d < 3.5) return g3(p, dp);
  if (d < 4.5) return g4(p, dp);
  if (d < 5.5) return g5(p, dp);
  if (d < 6.5) return g6(p, dp);
  if (d < 7.5) return g7(p, dp);
  if (d < 8.5) return g8(p, dp);
  return g9(p, dp);
}
float tiCifras(float n) { float c = 1.0; for (int k = 1; k < 9; k++) if (n >= P10[k]) c += 1.0; return c; }
// distancia a un número entero escrito centrado en el origen (cifras de alto 1, avance TI_AV)
#define TI_AV 0.78
float tiNumero(vec2 p, float n) {
  n = floor(max(n, 0.0) + 0.5);
  float N = tiCifras(n);
  float w = N * TI_AV;
  float k = clamp(floor((p.x + 0.5 * w) / TI_AV), 0.0, N - 1.0);
  float x = p.x - (-0.5 * w + 0.5 * TI_AV + k * TI_AV);
  int e = int(N - 1.0 - k);
  float d = floor(n / P10[e]) - 10.0 * floor(n / P10[e + 1]);
  return tiDigito(vec2(x, p.y), d);
}
// tinta de churro: cobertura de un trazo de grosor r (en las unidades de p) y relieve en la normal (gG)
float tiTinta(float d, float r, float px) { return 1.0 - smoothstep(r - px, r + px, d); }
#endif
`;

// ---------------------------------------------------------------- el calendario
const GLSL_CAL = GLSL_COMUN + /* glsl */`
// la hoja que pasa: gira alrededor del eje x por la cabecera (y = 0,42, z = 0,012), hacia arriba y por detrás
vec3 calHojaLocal(vec3 q, float h) {
  float a = h * 3.0;   // casi media vuelta
  vec3 o = vec3(0.0, 0.42, 0.015);
  vec3 p = q - o;
  float c = cos(a), s = sin(a);
  // p = Rx(−a) · p  (la hoja sube hacia +z y luego por detrás)
  return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z) + o;
}
float calHoja(vec3 p) { return sdRoundBox(p - vec3(0.0, -0.1, 0.006), vec3(0.47, 0.5, 0.004), 0.004); }
float pz_calendario(vec3 q, vec4 T, out float m) {
  m = 0.0;
  // el taco (hojas) y la cabecera con sus anillas
  float d = sdRoundBox(q - vec3(0.0, -0.1, -0.07), vec3(0.49, 0.52, 0.07), 0.03);
  float cab = sdRoundBox(q - vec3(0.0, 0.52, -0.06), vec3(0.51, 0.1, 0.09), 0.035);
  if (cab < d) m = 1.0;
  d = min(d, cab);
  for (int k = 0; k < 2; k++) {
    vec3 a = q - vec3(k == 0 ? -0.22 : 0.22, 0.62, 0.0);
    float an = length(vec2(length(a.yz) - 0.075, a.x)) - 0.018;
    if (an < d) m = 2.0;
    d = min(d, an);
  }
  // la hoja que pasa
  float h = uCal.z;
  if (h > 0.001 && h < 0.999) {
    float dh = calHoja(calHojaLocal(q, h));
    if (dh < d) m = 3.0;
    d = min(d, dh);
  }
  return d;
}
float pzc_calendario(vec3 q, vec4 T) { return min(sdRoundBox(q - vec3(0.0, -0.1, -0.07), vec3(0.47, 0.5, 0.05), 0.03), sdRoundBox(q - vec3(0.0, 0.52, -0.06), vec3(0.49, 0.08, 0.07), 0.03)); }
// la cara de una hoja (p.xy local de la hoja, p.y de −0,6 a 0,4): el número o el mes
vec3 calCara(vec2 p, float numero, float dias, float modo, out float tinta) {
  vec3 papel = vec3(0.60, 0.54, 0.42) * (0.95 + 0.06 * vnoise(vec3(p * 30.0, 1.0)));
  float px = 0.006;
  if (modo < 0.5) {
    float N = tiCifras(floor(numero + 0.5));
    float alto = min(0.42, 0.88 / (N * TI_AV));
    float dd = tiNumero((p - vec2(0.0, -0.1)) / alto, numero) * alto;
    tinta = tiTinta(dd, 0.075 * alto, px);
    // una raya fina bajo la cabecera (como un calendario de verdad)
    tinta = max(tinta, (1.0 - smoothstep(0.004, 0.008, abs(p.y - 0.33))) * step(abs(p.x), 0.4) * 0.6);
  } else {
    // el mes arriba, grande; los días en siete columnas debajo
    float dm = tiNumero((p - vec2(0.0, 0.22)) / 0.17, numero) * 0.17;
    tinta = tiTinta(dm, 0.075 * 0.17, px);
    vec2 c = (p - vec2(-0.4025, 0.06)) / vec2(0.115, -0.11);
    vec2 ci = floor(c);
    float dia = ci.y * 7.0 + ci.x + 1.0;
    if (ci.x >= 0.0 && ci.x < 7.0 && ci.y >= 0.0 && ci.y < 5.0 && dia <= dias) {
      vec2 lc = (c - ci - 0.5) * vec2(0.115, -0.11);
      float a = 0.046;
      float dd = tiNumero(lc / a, dia) * a;
      tinta = max(tinta, tiTinta(dd, 0.09 * a, 0.004));
    }
  }
  return mix(papel, vec3(0.05, 0.035, 0.03), tinta);
}
vec3 pzcol_calendario(vec3 q, vec4 T, float m) {
  if (m > 2.5) {
    vec3 p = calHojaLocal(q, uCal.z);
    float t;
    vec3 c = calCara(p.xy, uCal.y, uCal2.y, uCal.w, t);
    // por detrás, papel liso algo más oscuro
    if (p.z < 0.006) c = vec3(0.50, 0.45, 0.35);
    gBri = 0.8;
    return c;
  }
  if (m > 1.5) { gBri = 3.0; return C_BRASS; }
  if (m > 0.5) return vec3(0.42, 0.11, 0.05) * (0.92 + 0.12 * vnoise(q * 9.0));
  // el taco: la cara de delante con su hoja; los cantos, a rayas (las hojas)
  if (q.z > -0.002 && abs(q.x) < 0.475 && q.y < 0.41) {
    float t;
    vec3 c = calCara(q.xy, uCal.x, uCal2.x, uCal.w, t);
    gBri = 0.8;
    return c;
  }
  float raya = 0.5 + 0.5 * sin(q.z * 900.0);
  return vec3(0.56, 0.50, 0.39) * (0.86 + 0.14 * raya);
}
`;

// ---------------------------------------------------------------- el reloj
const GLSL_RELOJ = GLSL_COMUN + /* glsl */`
#define PI2 6.2831853
float reAguja(vec3 q, float ang, float largo, float r, float z) {
  vec2 d = vec2(sin(ang), cos(ang));
  return sdCapsule(q, vec3(-d * 0.12 * largo, z), vec3(d * largo, z), r);
}
float pz_reloj(vec3 q, vec4 T, out float m) {
  m = 0.0;
  // caja (un cilindro de canto redondo, de z −0,2 a 0) con la esfera hundida (r < 0,9, z > −0,01) y el aro de latón
  vec2 w = vec2(length(q.xy) - 1.0 + 0.05, abs(q.z + 0.1) - 0.1 + 0.05);
  float caja = length(max(w, 0.0)) + min(max(w.x, w.y), 0.0) - 0.05;
  caja = max(caja, -max(length(q.xy) - 0.9, -(q.z + 0.01)));
  float aro = length(vec2(length(q.xy) - 0.95, q.z - 0.015)) - 0.055;
  float d = smin(caja, aro, 0.02);
  if (aro < caja) m = 1.0;
  // agujas
  float mins = uReloj.x;
  float aM = mins / 60.0 * PI2, aH = mins / 720.0 * PI2;
  float h = reAguja(q, aH, 0.48, 0.032, 0.03);
  float mi = reAguja(q, aM, 0.74, 0.024, 0.06);
  float ag = min(h, mi);
  if (uReloj.y >= 0.0) {
    float s = reAguja(q, uReloj.y / 60.0 * PI2, 0.82, 0.011, 0.085);
    if (s < ag && s < d) m = 4.0;
    ag = min(ag, s);
  }
  float cap = length(q - vec3(0.0, 0.0, 0.07)) - 0.055;
  if (ag < d && m < 3.5) m = 2.0;
  d = min(d, ag);
  if (cap < d) m = 3.0;
  return min(d, cap);
}
float pzc_reloj(vec3 q, vec4 T) { vec2 w = vec2(length(q.xy) - 0.97, abs(q.z + 0.1) - 0.08); return length(max(w, 0.0)) + min(max(w.x, w.y), 0.0); }
vec3 pzcol_reloj(vec3 q, vec4 T, float m) {
  if (m > 3.5) { gBri = 1.4; return vec3(0.46, 0.10, 0.04); }
  if (m > 2.5) { gBri = 3.0; return C_BRASS; }
  if (m > 1.5) { gBri = 1.3; return vec3(0.03, 0.025, 0.022); }
  if (m > 0.5) { gBri = 3.0; return C_BRASS * (0.88 + 0.2 * vnoise(q * 20.0)); }
  float r = length(q.xy);
  if (r < 0.905 && q.z > -0.03) {
    // la esfera
    vec3 col = vec3(0.60, 0.55, 0.43) * (0.95 + 0.06 * vnoise(q * 25.0));
    float ang = atan(q.x, q.y); if (ang < 0.0) ang += PI2;
    // la cuña del tiempo que pasa (ámbar)
    float k = uReloj2.y > 0.5 ? 60.0 : 60.0;
    float a0 = uReloj.z / k * PI2, a1 = uReloj.w / k * PI2;
    if (a1 > a0 + 0.001 && r < 0.86) {
      float dentro = step(a0, ang) * step(ang, a1);
      col = mix(col, vec3(0.78, 0.40, 0.10), 0.62 * dentro);
    }
    // marcas de los minutos y de las horas
    float am = ang / PI2 * 60.0;
    float fm = abs(fract(am + 0.5) - 0.5) * PI2 / 60.0 * r;
    float hora = step(abs(fract(am / 5.0 + 0.1) - 0.1), 0.025);
    float lm = hora > 0.5 ? 0.075 : 0.04;
    float marca = (1.0 - smoothstep(hora > 0.5 ? 0.008 : 0.004, (hora > 0.5 ? 0.008 : 0.004) + 0.004, fm)) * step(0.86 - lm, r) * step(r, 0.86);
    // los números
    float tinta = 0.0;
    float ai = floor(ang / PI2 * 12.0 + 0.5);
    float an = ai / 12.0 * PI2;
    vec2 c = vec2(sin(an), cos(an)) * 0.68;
    float num = uReloj2.x < 0.5 ? (ai < 0.5 || ai > 11.5 ? 12.0 : ai) : mod(ai, 12.0) * 5.0;
    float a = 0.13;
    float dd = tiNumero((q.xy - c) / a, num) * a;
    tinta = tiTinta(dd, 0.085 * a, 0.004);
    col = mix(col, vec3(0.05, 0.035, 0.03), max(marca, tinta));
    gBri = 0.8;
    return col;
  }
  return vec3(0.44, 0.12, 0.05) * (0.92 + 0.12 * vnoise(q * 8.0));
}
`;

// ---------------------------------------------------------------- el reloj de arena
const GLSL_ARENA = GLSL_COMUN + /* glsl */`
// radio de la ampolla a la altura y (|y| de 0,05 a 0,92): cuello de 0,05 y panza de 0,42
float arPerfil(float y) { float u = clamp((abs(y) - 0.04) / 0.88, 0.0, 1.0); return 0.05 + 0.38 * pow(sin(1.5708 * min(u / 0.55, 1.0)), 1.2) * (1.0 - 0.35 * smoothstep(0.7, 1.0, u)); }
float pz_arena(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float rr = length(q.xz);
  // tapas y columnas (nogal)
  float tapa = min(sdRoundBox(q - vec3(0.0, 0.96, 0.0), vec3(0.55, 0.045, 0.55), 0.03), sdRoundBox(q - vec3(0.0, -0.96, 0.0), vec3(0.55, 0.045, 0.55), 0.03));
  tapa = max(tapa, rr - 0.56);
  float col = 1e5;
  for (int k = 0; k < 3; k++) {
    float a = 1.5708 + float(k) * 2.0944;
    vec2 c = vec2(cos(a), sin(a)) * 0.48;
    float rc = 0.035 + 0.012 * sin(q.y * 9.0) * sin(q.y * 9.0);
    col = min(col, max(length(q.xz - c) - rc, abs(q.y) - 0.95));
  }
  float d = min(tapa, col);
  // la arena: arriba, lo que queda (con su embudo); abajo, el montón; y el hilo
  float cae = uArena.x;
  float rIn = arPerfil(q.y) - 0.012;
  float hTop = mix(0.80, 0.07, sqrt(cae));
  float arriba = max(max(rr - rIn, -q.y + 0.05), q.y - hTop + 0.12 * (1.0 - smoothstep(0.0, 0.3, rr)) * step(0.02, cae));
  float hBot = mix(-0.93, -0.30, sqrt(cae));
  float abajo = max(max(rr - (arPerfil(q.y) - 0.012), -(q.y + 0.92)), q.y - hBot + 0.45 * rr);
  float hilo = (cae > 0.001 && cae < 0.999) ? max(rr - 0.012, abs(q.y - (hBot * 0.5 + 0.02)) - (0.02 - hBot * 0.5)) : 1e5;
  float ar = min(min(cae < 0.999 ? arriba : 1e5, cae > 0.001 ? abajo : 1e5), hilo);
  if (ar < d) m = 1.0;
  return min(d, ar);
}
float pzc_arena(vec3 q, vec4 T) { return max(length(q.xz) - 0.53, abs(abs(q.y) - 0.96) - 0.035); }
vec3 pzcol_arena(vec3 q, vec4 T, float m) {
  if (m > 0.5) { gBri = 0.6; return vec3(0.46, 0.30, 0.12) * (0.88 + 0.24 * vnoise(q * 60.0)); }
  return C_WOOD * (0.85 + 0.3 * vnoise(vec3(q.x * 3.0, q.y * 40.0, q.z * 3.0)));
}
`;

const TIPOS = {
  calendario: { radio: 1.5, glifos: DIGITOS, glsl: GLSL_CAL },
  reloj: { radio: 1.07, glifos: DIGITOS, glsl: GLSL_RELOJ },
  arena: { radio: 1.45, glifos: DIGITOS, glsl: GLSL_ARENA },
};
export function tiposTiempo(nombres = null) {
  if (!nombres) return { ...TIPOS };
  return Object.fromEntries(nombres.map((k) => [k, TIPOS[k]]));
}
export function uniformesTiempo() {
  return {
    uCal: { value: new THREE.Vector4(1, 0, 0, 0) }, uCal2: { value: new THREE.Vector4(30, 30, 0, 0) },
    uReloj: { value: new THREE.Vector4(0, -1, 0, 0) }, uReloj2: { value: new THREE.Vector4(0, 0, 0, 0) },
    uArena: { value: new THREE.Vector4(0, 0, 0, 0) },
  };
}
const exigir = (P, k) => { if (!P.U[k]) throw new Error(`ep03-tiempo: crea el plató con uniformes: uniformesTiempo() (falta ${k})`); };
const rotM = (rot) => new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ'));
const aMundo = (pos, escala, rot) => { const R = rotM(rot); return (x, y, z) => { const v = new THREE.Vector3(x, y, z).multiplyScalar(escala).applyMatrix4(R); return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z]; }; };

// ---------------------------------------------------------------- funciones de pieza
export function calendario(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], numero = 1, anterior = null, hoja = 0, mes = null, dias = 30, diasAnterior = null, toque = false, huellaFija = null } = {}) {
  exigir(P, 'uCal');
  const esMes = mes != null;
  const n = esMes ? mes : numero;
  const a = anterior ?? (esMes ? ((mes + 10) % 12) + 1 : Math.max(0, numero - 1));
  P.U.uCal.value.set(n, a, cl(hoja), esMes ? 1 : 0);
  P.U.uCal2.value.set(dias, diasAnterior ?? dias, 0, 0);
  P.pieza(i, { pos, escala, rot, sq, toque, huellaFija });
  const m = aMundo(pos, escala, rot);
  return { hoja: m(0, -0.1, 0.01), arriba: m(0, 0.52, 0.03) };
}
export function reloj(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], minutos = 0, segundos = null, sector = null, sectorSegundos = false, numeros = 'horas', toque = false, huellaFija = null } = {}) {
  exigir(P, 'uReloj');
  P.U.uReloj.value.set(minutos, segundos == null ? -1 : segundos, sector ? sector[0] : 0, sector ? sector[1] : 0);
  P.U.uReloj2.value.set(numeros === 'minutos' ? 1 : 0, sectorSegundos ? 1 : 0, 0, 0);
  P.pieza(i, { pos, escala, rot, sq, toque, huellaFija });
  const m = aMundo(pos, escala, rot);
  const a = (minutos / 60) * 2 * Math.PI;
  return { centro: pos, punta: m(Math.sin(a) * 0.74, Math.cos(a) * 0.74, 0.06), radio: escala };
}
// el perfil de la ampolla (como arPerfil del GLSL)
function arPerfil(y) {
  const u = cl((Math.abs(y) - 0.04) / 0.88);
  return 0.05 + 0.38 * Math.pow(Math.sin(1.5708 * Math.min(u / 0.55, 1)), 1.2) * (1 - 0.35 * ss(0.7, 1, u));
}
export function arena(P, i, { pos = [0, 2, 0], escala = 1, rot = [0, 0, 0], sq = [1, 1, 1], cae = 0, toque = false, huellaFija = null } = {}) {
  exigir(P, 'uArena');
  P.U.uArena.value.set(cl(cae), 0, 0, 0);
  P.pieza(i, { pos, escala, rot, sq, toque, huellaFija });
  const m = aMundo(pos, escala, rot);
  // la silueta del vidrio en pantalla: los dos lados (de arriba abajo)
  const izq = [], der = [];
  for (let k = 0; k <= 40; k++) {
    const y = 0.92 - (1.84 * k) / 40;
    const r = arPerfil(y);
    izq.push(P.proyectar(m(-r, y, 0))); der.push(P.proyectar(m(r, y, 0)));
  }
  return { centro: P.proyectar(pos), contorno: { izq, der } };
}
/** El vidrio del reloj de arena, en 2D encima de la foto (info: lo que devuelve arena()). */
export function vidrioArena(g, info, { fuerza = 1 } = {}) {
  const { izq, der } = info.contorno;
  g.save();
  // el vidrio: un velo frío muy leve dentro de la silueta
  g.beginPath(); izq.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); [...der].reverse().forEach((p) => g.lineTo(...p)); g.closePath();
  g.fillStyle = `rgba(190,205,225,${0.06 * fuerza})`; g.fill();
  // el borde: una línea clara y fina, y una sombra fina por fuera
  g.lineJoin = 'round';
  for (const lado of [izq, der]) {
    g.beginPath(); lado.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p)));
    g.strokeStyle = `rgba(20,20,26,${0.35 * fuerza})`; g.lineWidth = 3.5; g.stroke();
    g.strokeStyle = `rgba(225,230,240,${0.55 * fuerza})`; g.lineWidth = 1.6; g.stroke();
  }
  // brillos: una franja en cada ampolla, del lado de la luz (izquierda)
  g.globalCompositeOperation = 'screen';
  for (const [a, b] of [[4, 15], [25, 36]]) {
    g.beginPath();
    for (let k = a; k <= b; k++) { const p = izq[k], q = der[k]; const x = mix(p[0], q[0], 0.2); (k === a ? g.moveTo : g.lineTo).call(g, x, p[1]); }
    g.strokeStyle = `rgba(255,255,255,${0.32 * fuerza})`; g.lineWidth = Math.max(3, Math.abs(der[10][0] - izq[10][0]) * 0.06); g.lineCap = 'round'; g.stroke();
  }
  g.restore();
}

// ---------------------------------------------------------------- hojas que pasan
export const DUR_HOJA = 0.28;
/** claves: [[t0, n0], [t1, n1], …]: en ti ya se ve ni; la hoja anterior se va en DUR_HOJA s antes de ti. */
export function hojaEn(t, claves, dur = DUR_HOJA) {
  let k = 0;
  while (k + 1 < claves.length && t >= claves[k + 1][0] - dur) k++;
  const [tk, nk] = claves[k];
  if (k === 0 || t >= tk) return { numero: nk, anterior: k > 0 ? claves[k - 1][1] : nk, hoja: 0 };
  return { numero: nk, anterior: claves[k - 1][1], hoja: ss(0, 1, (t - (tk - dur)) / dur) };
}

// ---------------------------------------------------------------- el rayo de luz de alambre (2D)
export function largoCamino(pts) { let L = 0; for (let k = 1; k < pts.length; k++) L += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); return L; }
export function puntoEn(pts, s) {
  if (s <= 0) return [...pts[0], Math.atan2(pts[1][1] - pts[0][1], pts[1][0] - pts[0][0])];
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (s <= l || k === pts.length - 1) { const u = l > 0 ? cl(s / l) : 1; return [mix(a[0], b[0], u), mix(a[1], b[1], u), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
    s -= l;
  }
  return [...pts[pts.length - 1], 0];
}
// la poligonal recortada a la longitud s
function recortar(pts, s) {
  const out = [pts[0]];
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (s <= l) { const u = l > 0 ? s / l : 1; out.push([mix(a[0], b[0], u), mix(a[1], b[1], u)]); return out; }
    out.push(b); s -= l;
  }
  return out;
}
const COL_RAYO = {
  luz: { borde: [110, 62, 18], cuerpo: [232, 182, 104], brillo: [255, 248, 226], halo: [255, 190, 100], cabeza: [255, 250, 235] },
  frio: { borde: [60, 72, 100], cuerpo: [190, 205, 235], brillo: [250, 252, 255], halo: [150, 185, 255], cabeza: [245, 250, 255] },
};
/** El rayo de luz de alambre por la poligonal pts hasta la longitud `hasta` (px). */
export function rayo(g, pts, { hasta = Infinity, grosor = 7, brillo = 1, cabeza = 1, sombra = 1, color = 'luz' } = {}) {
  if (!pts || pts.length < 2) return null;
  const L = largoCamino(pts);
  const s = Math.min(hasta, L);
  const C = COL_RAYO[color] ?? COL_RAYO.luz;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const tip = puntoEn(pts, s);
  if (s > 0.5) {
    const q = recortar(pts, s);
    const camino = (dx = 0, dy = 0) => { g.beginPath(); q.forEach((p, k) => (k ? g.lineTo(p[0] + dx, p[1] + dy) : g.moveTo(p[0] + dx, p[1] + dy))); };
    g.save();
    g.lineJoin = 'round'; g.lineCap = 'round';
    // resplandor (sin filtros de lienzo, que en este servidor cuestan: trazos cada vez más anchos y más tenues)
    g.globalCompositeOperation = 'screen';
    for (const [w, a] of [[5.2, 0.05], [3.6, 0.08], [2.4, 0.12], [1.6, 0.16]]) { camino(); g.strokeStyle = rgba(C.halo, a * brillo); g.lineWidth = grosor * w; g.stroke(); }
    g.globalCompositeOperation = 'source-over';
    // sombra corta debajo
    if (sombra > 0) {
      for (const [w, a] of [[1.6, 0.12], [1.05, 0.2]]) { camino(grosor * 0.7, grosor * 1.0); g.strokeStyle = `rgba(0,0,0,${a * sombra})`; g.lineWidth = grosor * w; g.stroke(); }
    }
    // el alambre: canto oscuro, cuerpo y brillo especular (la luz viene de arriba a la izquierda)
    camino(); g.strokeStyle = rgba(C.borde, 1); g.lineWidth = grosor; g.stroke();
    camino(-grosor * 0.06, -grosor * 0.06); g.strokeStyle = rgba(C.cuerpo, 1); g.lineWidth = grosor * 0.7; g.stroke();
    camino(-grosor * 0.17, -grosor * 0.17); g.strokeStyle = rgba(C.brillo, 0.9); g.lineWidth = grosor * 0.26; g.stroke();
    g.restore();
  }
  if (cabeza > 0.001) {
    const [x, y] = tip;
    g.save();
    g.globalCompositeOperation = 'screen';
    const R = grosor * 5.5;
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    gr.addColorStop(0, rgba(C.cabeza, 0.95 * cabeza)); gr.addColorStop(0.18, rgba(C.halo, 0.55 * cabeza)); gr.addColorStop(1, rgba(C.halo, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 2 * Math.PI); g.fill();
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = rgba(C.cabeza, cabeza);
    g.beginPath(); g.arc(x, y, grosor * 0.95, 0, 2 * Math.PI); g.fill();
    g.restore();
  }
  return { punta: [tip[0], tip[1]], largo: L, angulo: tip[2] };
}
/** Un camino de pinball: tramos rectos que rebotan, desde `desde`, dentro de dentro(x, y), y que acaba en `salida`. */
export function caminoRebotes({ desde, n = 24, paso = [40, 90], dentro = () => true, salida = null, semilla = 1, deriva = 0.25 } = {}) {
  const r = mulberry32(semilla * 7919 + 3);
  const pts = [[...desde]];
  let p = [...desde];
  let ang = r() * 2 * Math.PI;
  for (let k = 0; k < n; k++) {
    let ok = false;
    for (let intento = 0; intento < 40 && !ok; intento++) {
      // cada rebote cambia de dirección entre 50° y 150° (como una bola de pinball), con algo de tirón hacia la salida
      const giro = (r() < 0.5 ? -1 : 1) * mix(0.9, 2.6, r());
      let a = ang + giro;
      if (salida) {
        const as = Math.atan2(salida[1] - p[1], salida[0] - p[0]);
        const u = deriva * (k / n);
        a = Math.atan2(mix(Math.sin(a), Math.sin(as), u), mix(Math.cos(a), Math.cos(as), u));
      }
      const l = mix(paso[0], paso[1], r());
      const q = [p[0] + Math.cos(a) * l, p[1] + Math.sin(a) * l];
      // el tramo entero dentro
      let dentroTodo = true;
      for (let j = 1; j <= 6; j++) { const u = j / 6; if (!dentro(mix(p[0], q[0], u), mix(p[1], q[1], u))) { dentroTodo = false; break; } }
      if (dentroTodo) { pts.push(q); p = q; ang = a; ok = true; }
    }
    if (!ok) break;
  }
  if (salida) pts.push([...salida]);
  return pts;
}
/** Un camino que da vueltas a una elipse (ep3-luz). */
export function caminoVueltas({ centro, rx, ry, vueltas = 7.5, desde = 0, giro = 0, puntos = 64, separa = 0.04 } = {}) {
  const out = [];
  const N = Math.ceil(vueltas * puntos);
  for (let k = 0; k <= N; k++) {
    const u = k / puntos, a = desde + u * 2 * Math.PI;
    const s = 1 + separa * (u / Math.max(vueltas, 1e-3) - 0.5) * 2;
    const x = Math.cos(a) * rx * s, y = Math.sin(a) * ry * s;
    out.push([centro[0] + x * Math.cos(giro) - y * Math.sin(giro), centro[1] + x * Math.sin(giro) + y * Math.cos(giro)]);
  }
  return out;
}
