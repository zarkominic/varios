// KIT DEL EPISODIO 3 · «TOCAR» (kits/ep03-tocar.js). Lo crea ep3-casa y, una vez entregado con su hoja de prueba
// (escenas/ep03-tocar-hoja.html), queda CONGELADO: las escenas que lo usan no lo cambian. Si algo no basta, la escena lo
// resuelve por su cuenta (una pieza propia con tiposExtra, o 2D encima) y lo dice en su informe.
// Lo usan: ep3-casa (lo crea), ep3-lectura, ep3-promesa, ep3-silla, ep3-gato, ep3-proton, ep3-planck, ep3-vuelta,
// ep3-neutrones, ep3-andromeda y ep3-despedida.
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra), con el mismo material,
// la misma luz y la misma paleta, y una función por pieza que la coloca y le pasa sus parámetros:
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposTocar, fila, estadio, ... } from '/atomo/plato/kits/ep03-tocar.js';
//   const P = await crearPlato({ piezas: ['fila', 'estadio', 'reglaA', 'flecha'], tiposExtra: tiposTocar(), ... });
//   function dibujar(t) { ...; P.limpiar(); fila(P, 0, { pos, escala, n: 1e7, fase: ts }); estadio(P, 1, { ... }); P.render(n); }
//
// tiposTocar(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados: así se compila menos). Cada función
// de pieza se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de
// P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los puntos del mundo
// que hacen falta para poner otras cosas encima (el asiento de la silla, el cuenco de la cucharilla…). Las piezas no
// cambian de forma al moverlas: lo que se anima son sus parámetros (y pos, escala y rot). Unidades locales: las de
// cada pieza (abajo); la escala las lleva al mundo del plató (la persona «humano» mide 1,765 × su escala).
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'peldano' · peldano(P, i, { par: 'AT'|'TA'|'GC'|'CG' | [colorIzq, colorDer], extremos: true })
//      El peldaño de la doble hélice visto de cerca, hecho de bolitas: las dos bases como maquetas de bolas de arcilla
//      (un anillo de seis átomos en las pirimidinas T y C; uno de seis y otro de cinco en las purinas A y G; con sus
//      oxígenos y nitrógenos, más oscuros, y los hidrógenos, crema y pequeños), en el plano xy (la cara mira a +z) de
//      x ≈ −0,8 a 0,8, con los puentes de latón en el centro (2 en A–T, 3 en G–C) y, con extremos, los nudos del
//      esqueleto (anillo de azúcar y fosfato) hasta x ≈ ±1,15. Cada base lleva su color (BASES: A terracota, T oliva,
//      G ocre, C pizarra; ep03-adn.js debería usar estos mismos) o uno a medida ([r, g, b] lineal). Devuelve { centro,
//      izq, der } (mundo). Atom va delante del centro, sobre los puentes (ep3-lectura termina y ep3-casa empieza así).
//  · 'fila' · fila(P, i, { n, fase, sinCentro, pixel })
//      La fila de átomos «como Atom» (núcleo de terracota y crema, tres órbitas de latón y electrones de ámbar), uno por
//      unidad local a lo largo de x, centrada en el átomo 0. Una sola pieza con repetición y nivel de detalle: según los
//      píxeles que mide cada átomo en pantalla (la función los calcula; pixel los fuerza) pasa de Atoms con órbitas
//      (> 24 px) a cuentas (9–24), a una sarta (2–6) y a un hilo de ámbar de unos 7 px (< 2 px), así que vale de 10 átomos
//      a 10 millones (n hasta 1e7: «diez millones de átomos en fila hacen un milímetro»). fase: el reloj de los electrones
//      (segundos); sinCentro: quita el átomo 0 (para poner en su sitio el que crece). Devuelve { punto(k) (mundo del
//      átomo k), pxAtomo, extremos: [mundo del primero, del último] }.
//  · 'reglamm' · reglaMm(P, i, { })
//      La regla de milímetros de boj, de 0 a 1 mm: 1 mm = 1 unidad local, con el origen en 0,5 mm (x de −0,68 a 0,86,
//      y de −0,22 a 0,22, la cara hacia +z en z = 0,04). Marcas grabadas desde el canto de arriba: largas en 0 y 1 mm,
//      media en 0,5 y cortas cada décima; «0» y «1 mm» grabados debajo. Devuelve { punto(mm, y) } (mundo; por defecto
//      en el canto de arriba, donde se apoya la fila: 1e7 átomos de 0 a 1).
//  · 'estadio' · estadio(P, i, { guisante: 1, brilloGuisante: 0, sinCesped })
//      El átomo-estadio: un cuenco ovalado con siete gradas en relieve (asientos de colores apagados, pasillos), muro
//      exterior con pilares, cuatro torres de focos, el césped a rayas con sus líneas y porterías, y el guisante (el
//      núcleo) en el centro del campo. Unidades: el borde de fuera mide 0,98 × 0,78 (semiejes x, z), el césped está en
//      y = 0 y las gradas suben hasta y = 0,30; mira hacia +y (inclínalo hacia la cámara con rot x ≈ 0,6–0,9).
//      guisante: tamaño (1 = radio 0,014; 0 = sin guisante); brilloGuisante: un poco de luz propia (0…1) para que se lea
//      de lejos. Devuelve { guisante, centro, borde(ang) } (mundo) y, en pantalla, las elipses de su nube: anillo (sobre
//      las gradas) y bola (la cáscara que lo envuelve). geometriaEstadio(P, opciones) da lo mismo sin poner la pieza.
//      La NUBE DE ELECTRONES («borrosa, como una cáscara translúcida») va en 2D, encima de la foto del estadio:
//      nubeElectrones(g, { ...e.anillo, extension, t }) sobre las gradas; nubeElectrones(g, { ...e.bola, forma: 'bola' })
//      la cáscara entera. De lejos (ep3-gato, ep3-proton, ep3-planck), el átomo es el estadio pequeño con brilloGuisante 1
//      y las dos nubes encima (hoja de prueba, celda 17).
//  · 'silla' · silla(P, i, { })
//      Silla de madera de haya con respaldo de tres listones y travesaños. Unidades = las de la persona: el centro de
//      arriba del asiento en el origen, el suelo en y = −0,427 (la altura del asiento de la postura 'sentada' del
//      «humano»: con la escala de la persona y pos = h.punto('asiento') de la postura sentada, las patas pisan el suelo);
//      el respaldo hacia −z. Devuelve { asiento, respaldo } (mundo). sillaPara(asiento, escalaPersona, rotY) da las
//      opciones de la silla para una persona (asiento: h.punto('asiento') de la postura 'sentada').
//  · 'chispas' · chispas(P, i, { n: 7, semilla: 0, fuerza: 1 })
//      Chispitas de luz (estrellas de cuatro puntas, de arcilla blanca y ámbar con luz propia) repartidas a lo largo de
//      x ∈ [−1, 1] (y ±0,15, z ±0,1); semilla: cambia cuáles brillan y su tamaño (pasa ts × 12 para que chisporroteen a
//      12 fps); fuerza 0…1. El brillo 2D de alrededor: brilloChispas(g, puntos).
//  · 'terron' · terron(P, i, { })
//      Terrón de azúcar: cubo de lado 1 (−0,5…0,5) con las aristas gastadas y la superficie de granos brillantes.
//  · 'cucharilla' · cucharilla(P, i, { })
//      Cucharilla de café de plata vieja: el cuenco en el origen (su fondo en y ≈ −0,02, abierto hacia +y) y el mango
//      hacia +x hasta x ≈ 1,0. Devuelve { cuenco, mango } (mundo: donde va el terrón y donde la coge la mano).
//  · 'cajon' · cajon(P, i, { abierto: 0 })
//      Una cómoda pequeña de nogal con un cajón (pomo de latón): caja de 1,1 × 0,64 × 0,72 (−0,55…0,55, −0,32…0,32,
//      −0,36…0,36) sobre cuatro patitas; el cajón sale hacia +z (abierto 0…1, hasta 0,5). Devuelve { interior, frente }
//      (mundo: el fondo del cajón, donde se posa el terrón, y el pomo).
//  · 'multitud' · multitud(P, i, { radio: 6, hueco: 0, aparicion: 1, semilla: 0 })
//      La humanidad en figuritas: una sola figura de arcilla repetida (cabeza, pelo, jersey, pantalón; cambian el color
//      del jersey, del pantalón, de la piel y del pelo, la altura y un poco la postura) sobre el suelo en un círculo de
//      radio `radio` y con un hueco central de radio `hueco` (para la persona), en una red de 0,42 con desorden.
//      Unidades: la figura mide 1 (pies en y = 0); la pieza va con pos en el suelo (y = 0 del mundo si está en el plató).
//      aparicion 0…1: van saliendo una a una (cada una crece desde el suelo). Devuelve { radioMundo }.
//  · 'figurita' · figurita(P, i, { semilla })
//      Una figurita suelta, la misma de la multitud (ep3-andromeda, «los primeros humanos»), con los pies en y = −0,5 y la
//      cabeza en 0,5. semilla elige colores y altura como en la multitud.
//  · 'gato' · gato(P, i, { pelaje: 'atigrado'|'gris'|'crema', ojos: 1, cabeza: 0 })
//      Gato tumbado de lado, de cara a la cámara (+z), con la cola rodeándolo; ojos: 0 abiertos (ámbar, pupila de raja) …
//      1 cerrados de gusto («encantado»); cabeza: levanta la cabeza hacia la mano (0…1). Unidades: mide 1,1 de la cola al
//      morro (x de −0,55 a 0,6), el suelo en y = −0,3. Devuelve { lomo, cabeza } (mundo: donde se posa la mano).
//  · 'cifra' · cifra(P, i, { ceros: 0, color: 'crema' })
//      Un 7 y sus ceros en churro de arcilla: «7» y luego `ceros` ceros (0…27; con fracción, el último está saliendo).
//      Sin separadores. Unidades: cifras de alto 1, avance 0,66; el 7 centrado en x = 0, el cero k en x = 0,66 (k + 1).
//      Devuelve { ancho (unidades locales), punto(k) (mundo de la cifra k: 0 el 7) }.
//
// COMPONER EN 2D (el plató creado con { alfa: true, post: false } y la receta de «lo que no se mueve» del kit)
//  · foto(P) → copia del lienzo de WebGL (tras P.render).
//  · nubeElectrones(g, { centro, ejeX, ejeY, forma: 'anillo'|'bola', interior, extension, desde, t, semilla, fuerza,
//    motas, bocanadas, desenfoque }) pinta la nube de electrones: bocanadas de neblina crema y ámbar (en una capa
//    desenfocada) y motas de ámbar que giran (t, en segundos). La elipse en px de diseño: centro y dos semidiámetros
//    conjugados (estadio() los da). Respeta la transformación de g (se puede escalar y mover con el estadio).
//  · brilloChispas(g, pts, { radio, fuerza }) añade el resplandor 2D de las chispas (pts: [[x, y, k]] en píxeles).
//
// COSTE (este servidor, 1920 × 1080, una pieza sola llenando su celda de la hoja de prueba, con el plató, la sombra y el
// fondo; servidor tranquilo, carga 2–5 en los 4 núcleos; con otras escenas renderizando a la vez, el doble): peldaño
// 3,2–4,2 s · fila 1,3–2,3 s · regla de mm 2,2 s · estadio 1,9–2,4 s · silla 1,3 s · chispas 1,2–1,3 s · terrón 0,6 s ·
// cucharilla 0,9–1 s · cajón 0,8–0,9 s · multitud 2,2–2,7 s · figurita 0,8–0,9 s · gato 1–1,1 s · cifra 0,6–1,5 s. Lo
// quieto se fotografía (al cargar o en un fotograma barato poco antes de hacer falta, como en ep3-casa); lo que se mueve
// lleva envolvente (el rayo marcha primero con una forma barata y solo cerca paga la pieza entera). Sin la pasada de
// fondo (P.render(n, { fondo: false }) sobre la foto del plató vacío) se ahorra la sombra: en ep3-casa la fila viva
// cuesta 0,7–2 s por fotograma. Primer dibujo de cada programa: SwiftShader lo compila entonces (el estreno de la
// persona cuesta ~5 s; hazlo al cargar con la pieza pequeña, como ep3-casa).
//
// CONGELADO el 21-10-2026, entregado con la hoja de prueba (escenas/ep03-tocar-hoja.html: __frame(0) la hoja entera,
// __frame(k) la celda k). Las escenas que lo usan no lo cambian.
import * as THREE from 'three';

const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
function semillero(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// ---------------------------------------------------------------- colores
// colores lineales (como los de la paleta del kit); empaquetar([r, g, b]) los lleva a un solo número para la pieza
export const BASES = {
  A: [0.21, 0.055, 0.025],   // adenina: terracota
  T: [0.07, 0.082, 0.033],   // timina: oliva
  G: [0.19, 0.105, 0.024],   // guanina: ocre
  C: [0.042, 0.06, 0.092],   // citosina: pizarra azul
};
export const COLORES = {
  crema: [0.56, 0.49, 0.37], ambar: [0.70, 0.36, 0.07], terracota: [0.50, 0.15, 0.06], oliva: [0.12, 0.13, 0.07],
  pizarra: [0.10, 0.12, 0.16], ocre: [0.45, 0.28, 0.06], marfil: [0.62, 0.58, 0.48], nogal: [0.15, 0.088, 0.052],
};
// empaqueta un color lineal en un número (raíz cuadrada en 8 bits por canal: 24 bits exactos en un float)
export function empaquetar(c) {
  const q = (v) => Math.round(Math.sqrt(cl(v)) * 255);
  return q(c[0]) * 65536 + q(c[1]) * 256 + q(c[2]);
}

// ---------------------------------------------------------------- GLSL común del kit
const GLSL_COMUN = /* glsl */`
#ifndef TOCAR_COMUN
#define TOCAR_COMUN 1
vec3 tcColor(float v) {
  v = floor(v + 0.5);
  float r = floor(v / 65536.0), g = floor((v - r * 65536.0) / 256.0), b = v - r * 65536.0 - g * 256.0;
  vec3 c = vec3(r, g, b) / 255.0; return c * c;
}
float tcH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
float tcH2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
mat2 tcGiro(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
// estiramiento: las piezas de largo variable (fila, multitud, cifra) llegan con la escala multiplicada por L para
// que su esfera envolvente las cubra; T.w = L devuelve las unidades de siempre (q × L) y la distancia se divide por L
float tcL(vec4 T) { return max(T.w, 1.0); }
const vec3 TC_TERRA = vec3(0.500, 0.150, 0.060);
const vec3 TC_CREAM = vec3(0.560, 0.490, 0.370);
const vec3 TC_LATON = vec3(0.470, 0.300, 0.085);
const vec3 TC_ELEC = vec3(0.36, 0.095, 0.01);
const vec3 TC_AMBAR = vec3(0.760, 0.390, 0.085);
const vec3 TC_HAYA = vec3(0.20, 0.105, 0.048);
const vec3 TC_NOGAL = vec3(0.150, 0.085, 0.048);
// vetas de madera a lo largo de un eje (u: coordenada a lo largo, w: las otras dos)
float tcVeta(float u, vec2 w, float f) {
  float n = vnoise(vec3(u * 0.6, w * 6.0));
  return sin((dot(w, vec2(1.0, 0.7)) + 0.12 * n + 0.02 * sin(u * 3.0)) * f);
}
#endif
`;

// ---------------------------------------------------------------- PELDAÑO
// Las dos bases de un par, como maquetas de bolitas en el plano xy (la cara del peldaño mira a +z): cada base es un
// anillo de seis átomos (pirimidina: T, C) o un anillo de seis y uno de cinco unidos (purina: A, G), con sus átomos
// sueltos (oxígenos y nitrógenos, algo más oscuros, e hidrógenos, crema y pequeños) y el eslabón hacia el esqueleto.
// Coordenadas de la base derecha (x > 0; el borde de los puentes hacia x = 0); la izquierda es su simétrica (−x).
// [x, y, z, r + 10 × clase] · clase 0: anillo (color de la base) · 1: átomo suelto (más oscuro) · 2: hidrógeno (crema)
const PEL_BASES = (() => {
  const r = semillero(20261021);
  const at = (x, y, rr, k = 0) => [x, y, 0.02 * (r() - 0.5), rr + 10 * k];
  const pol = (cx, cy, rho, n, a0) => Array.from({ length: n }, (_, i) => [cx + rho * Math.cos(a0 + i * 2 * Math.PI / n), cy + rho * Math.sin(a0 + i * 2 * Math.PI / n)]);
  // pirimidina: hexágono con un vértice hacia el compañero (−x)
  const pir = [];
  const hx = 0.31, rho = 0.128;
  for (const [x, y] of pol(hx, 0, rho, 6, Math.PI)) pir.push(at(x, y, 0.079));
  pir.push(at(hx + 0.25 * Math.cos(2.09), 0.25 * Math.sin(2.09), 0.073, 1));     // oxígeno arriba
  pir.push(at(hx + 0.25 * Math.cos(-2.09), 0.25 * Math.sin(-2.09), 0.071, 1));   // nitrógeno abajo
  pir.push(at(hx + 0.34 * Math.cos(-2.2), 0.34 * Math.sin(-2.2), 0.05, 2));     // su hidrógeno
  pir.push(at(hx + 0.25 * Math.cos(1.05), 0.25 * Math.sin(1.05), 0.074, 1));     // metilo
  pir.push(at(hx + 0.33 * Math.cos(0.8), 0.33 * Math.sin(0.8), 0.048, 2));
  pir.push(at(hx + 0.25, -0.02, 0.07));                                          // eslabón hacia el azúcar
  pir.push(at(hx + 0.37, 0.01, 0.068));
  pir.push(at(hx + 0.49, -0.015, 0.066));
  // purina: hexágono y pentágono unidos por el lado de la derecha
  const pur = [];
  const ux = 0.25;
  for (const [x, y] of pol(ux, 0, rho, 6, Math.PI)) pur.push(at(x, y, 0.079));
  const v1 = [ux + rho * Math.cos(Math.PI / 3), rho * Math.sin(Math.PI / 3)], v2 = [ux + rho * Math.cos(-Math.PI / 3), rho * Math.sin(-Math.PI / 3)];
  const ap = 2 * rho * Math.sin(Math.PI / 6), rp = ap / (2 * Math.sin(Math.PI / 5)), cp = v1[0] + Math.sqrt(rp * rp - (ap / 2) ** 2);
  for (const [x, y] of pol(cp, 0, rp, 5, 0)) if (x > v1[0] + 0.02) pur.push(at(x, y, 0.077));
  pur.push(at(ux + 0.25 * Math.cos(2.09), 0.25 * Math.sin(2.09), 0.073, 1));
  pur.push(at(ux + 0.35 * Math.cos(2.3), 0.35 * Math.sin(2.3), 0.049, 2));
  pur.push(at(ux + 0.25 * Math.cos(-2.09), 0.25 * Math.sin(-2.09), 0.05, 2));
  pur.push(at(cp + rp + 0.11, -0.015, 0.07));
  pur.push(at(cp + rp + 0.23, 0.01, 0.067));
  // el esqueleto (con extremos): anillo de azúcar de cinco y el fosfato
  const esq = [];
  for (const [x, y] of pol(0.9, 0.0, 0.1, 5, 0.3)) esq.push(at(x, y, 0.066));
  esq.push(at(1.04, 0.13, 0.1, 1));
  esq.push(at(1.11, 0.24, 0.06, 1));
  esq.push(at(1.13, 0.04, 0.058, 1));
  return { pir, pur, esq };
})();
const glslArr = (n, a) => `const vec4 ${n}[${a.length}] = vec4[${a.length}](${a.map((b) => `vec4(${b.map(fl).join(', ')})`).join(', ')});`;
const GLSL_PELDANO = /* glsl */`
${glslArr('PEL_PIR', PEL_BASES.pir)}
${glslArr('PEL_PUR', PEL_BASES.pur)}
${glslArr('PEL_ESQ', PEL_BASES.esq)}
// una base (purina o no) en p (coordenadas de la base derecha); id: 0…: su bolita; clase
float tcBase(vec3 p, bool purina, float giro, out float id, out float clase) {
  p.yz = tcGiro(giro) * p.yz;              // el «giro de hélice» de cada base
  float d = 1e5, dm = 1e5; id = 0.0; clase = 0.0;
  if (purina) {
    for (int i = 0; i < ${PEL_BASES.pur.length}; i++) {
      vec4 b = PEL_PUR[i]; float k = floor(b.w / 10.0), r = b.w - 10.0 * k;
      float db = length(p - b.xyz) - r;
      if (db < dm) { dm = db; id = float(i); clase = k; }
      d = smin(d, db, 0.014);
    }
  } else {
    for (int i = 0; i < ${PEL_BASES.pir.length}; i++) {
      vec4 b = PEL_PIR[i]; float k = floor(b.w / 10.0), r = b.w - 10.0 * k;
      float db = length(p - b.xyz) - r;
      if (db < dm) { dm = db; id = float(i); clase = k; }
      d = smin(d, db, 0.014);
    }
  }
  return d;
}
float tcEsqueleto(vec3 p, out float id, out float clase) {
  float d = 1e5, dm = 1e5; id = 0.0; clase = 0.0;
  for (int i = 0; i < ${PEL_BASES.esq.length}; i++) {
    vec4 b = PEL_ESQ[i]; float k = floor(b.w / 10.0), r = b.w - 10.0 * k;
    float db = length(p - b.xyz) - r;
    if (db < dm) { dm = db; id = float(i); clase = k; }
    d = smin(d, db, 0.016);
  }
  return d;
}
// el par: 0 A–T · 1 T–A · 2 G–C · 3 C–G · 4 a medida (purina a la izquierda); ¿es purina la base de ese lado?
bool tcPurina(float par, bool izq) { float p = floor(par + 0.5); return izq ? (p < 0.5 || (p > 1.5 && p < 2.5) || p > 3.5) : (p > 0.5 && p < 1.5) || (p > 2.5 && p < 3.5); }
// m: lado (0 der · 1 izq) × 1000 + parte (0 base · 1 esqueleto · 2 puente) × 100 + clase × 10 + (id mod 10)
float pz_peldano(vec3 q, vec4 T, out float m) {
  bool izq = q.x < 0.0;
  vec3 p = vec3(abs(q.x), izq ? -q.y : q.y, q.z);
  float id, cl;
  float d = tcBase(p, tcPurina(T.y, izq), izq ? -0.18 : 0.18, id, cl);
  m = (izq ? 1000.0 : 0.0) + cl * 10.0 + mod(id, 10.0);
  // la base del otro lado, cerca del centro
  if (abs(q.x) < 0.3) {
    vec3 po = izq ? q : vec3(-q.x, -q.y, q.z);
    float id2, cl2;
    float d2 = tcBase(po, tcPurina(T.y, !izq), izq ? 0.18 : -0.18, id2, cl2);
    if (d2 < d) m = (izq ? 0.0 : 1000.0) + cl2 * 10.0 + mod(id2, 10.0);
    d = smin(d, d2, 0.014);
  }
  // puentes de hidrógeno: alambres de latón entre las dos bases (2 en A–T, 3 en G–C)
  float np = (T.y > 1.5 && T.y < 3.5) ? 3.0 : 2.0;
  float dp = 1e5;
  for (int k = 0; k < 3; k++) {
    if (float(k) >= np) break;
    float y = np > 2.5 ? (float(k) - 1.0) * 0.085 : (float(k) - 0.5) * 0.11;
    dp = min(dp, sdCapsule(q, vec3(-0.14, y, 0.0), vec3(0.14, y, 0.0), 0.011));
  }
  if (dp < d) m = 200.0;
  d = min(d, dp);
  if (T.z > 0.5) {
    float de = tcEsqueleto(p, id, cl);
    if (de < d) m = (izq ? 1000.0 : 0.0) + 100.0 + cl * 10.0 + mod(id, 10.0);
    d = smin(d, de, 0.016);
  }
  return d;
}
float pza_peldano(vec3 q, vec4 T) { return sdCapsule(q, vec3(-0.95, 0.0, 0.0), vec3(0.95, 0.0, 0.0), T.z > 0.5 ? 0.4 : 0.36); }
float pzc_peldano(vec3 q, vec4 T) { return sdCapsule(q, vec3(-0.75, 0.0, 0.0), vec3(0.75, 0.0, 0.0), 0.05); }
vec3 tcColBase(float k) { return k < 0.5 ? vec3(${BASES.A.map(fl)}) : k < 1.5 ? vec3(${BASES.T.map(fl)}) : k < 2.5 ? vec3(${BASES.G.map(fl)}) : vec3(${BASES.C.map(fl)}); }
vec3 pzcol_peldano(vec3 q, vec4 T, float m) {
  if (abs(m - 200.0) < 0.5) { gBri = 3.0; return TC_LATON; }
  bool izq = m > 999.0;
  float r = izq ? m - 1000.0 : m;
  float parte = floor(r / 100.0), cl = floor(mod(r, 100.0) / 10.0), id = mod(r, 10.0);
  vec3 c;
  if (T.y > 3.5) c = tcColor(izq ? T.x : T.w);
  else {
    float p = floor(T.y + 0.5);
    float kl = p < 0.5 ? 0.0 : p < 1.5 ? 1.0 : p < 2.5 ? 2.0 : 3.0;
    float kr = p < 0.5 ? 1.0 : p < 1.5 ? 0.0 : p < 2.5 ? 3.0 : 2.0;
    c = tcColBase(izq ? kl : kr);
  }
  if (parte > 0.5) c = cl > 0.5 ? vec3(0.20, 0.12, 0.05) : vec3(0.075, 0.07, 0.08);
  else if (cl > 1.5) c = mix(c, TC_CREAM, 0.7);
  else if (cl > 0.5) c *= 0.62;
  else c *= 0.9 + 0.2 * tcH(id * 3.1 + (izq ? 1.7 : 0.0));
  gTr = 0.3;
  return c * (0.94 + 0.12 * vnoise(q * 14.0));
}
`;

// ---------------------------------------------------------------- FILA DE ÁTOMOS
// tres órbitas inclinadas (como el símbolo del átomo): marco de cada una (mundo local → plano de la órbita)
// las órbitas de Atom (las mismas inclinaciones que P.atomo: giro z de i·60° + 15° sobre una inclinación x de 0,44) y
// su núcleo de ocho bolitas, a escala de la fila (órbita de radio 0,40: los átomos casi se tocan)
const ORB_FILA = [0, 1, 2].map((i) => {
  const m = new THREE.Matrix4().makeRotationZ(i * Math.PI / 3 + 0.26).multiply(new THREE.Matrix4().makeRotationX(0.44));
  return new THREE.Matrix3().setFromMatrix4(m).transpose().elements;   // del átomo al plano de la órbita (columnas)
});
const NUC_FILA = (() => {
  const r = semillero(77), out = [];
  for (let i = 0; i < 8; i++) {
    const y = 1 - (2 * (i + 0.5)) / 8, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 0.4, k = (0.33 + 0.03 * r()) * 0.238;
    out.push([Math.cos(ph) * rr * k, y * k * 0.92, Math.sin(ph) * rr * k]);
  }
  return out;
})();
const GLSL_FILA = /* glsl */`
const mat3 ORBF[3] = mat3[3](${ORB_FILA.map((e) => `mat3(${e.map(fl).join(', ')})`).join(', ')});
const float RORB = 0.40;
const vec3 NUCF[8] = vec3[8](${NUC_FILA.map((p) => `vec3(${p.map(fl).join(', ')})`).join(', ')});
// un átomo «como Atom» en p (centro en el origen; separación 1), k: su número, fase: reloj, pl: tamaño del píxel
// (unidades locales). m: 0 protón · 1 neutrón · 2 órbita · 3 electrón · 4 hilo
float tcAtomoF(vec3 p, float k, float fase, float pl, out float m) {
  float s = 1.0 / max(pl, 1e-6);                     // píxeles por átomo
  float det = smoothstep(9.0, 24.0, s);               // 1: órbitas y electrones · 0: una cuenta
  float d = 1e5, dm = 1e5; m = 0.0;
  // (coste) lejos del átomo basta su esfera; lejos del núcleo, la del núcleo
  float r0 = length(p);
  float rAt = det > 0.02 ? 0.47 : 0.17;
  if (r0 > rAt + 0.04) { m = 2.0; return r0 - rAt; }
  // núcleo: ocho bolitas de terracota y crema (de cerca); de lejos, una cuenta
  float rn = mix(0.15, 0.069, det);
  if (r0 > 0.24) d = r0 - 0.16;
  else for (int i = 0; i < 8; i++) {
    float db = length(p - NUCF[i] * det) - rn;
    if (db < dm) { dm = db; m = mod(float(i), 2.0); }
    d = smin(d, db, 0.012);
  }
  if (det > 0.02) {
    float rt = max(0.012, 0.7 * pl), re = max(0.036, 1.3 * pl) * smoothstep(0.25, 0.7, det);
    float R = RORB * mix(0.55, 1.0, det);
    for (int i = 0; i < 3; i++) {
      vec3 pp = ORBF[i] * p;
      float dt = length(vec2(length(pp.xz) - R, pp.y)) - rt;
      if (dt < d) { d = dt; m = 2.0; }
      float a = fase * 2.0 * (i == 1 ? -1.0 : 1.0) + 6.283 * tcH(k * 3.0 + float(i));
      float de = length(pp - vec3(R * cos(a), 0.0, R * sin(a))) - re;
      if (de < d) { d = de; m = 3.0; }
    }
  }
  return d;
}
float pz_fila(vec3 q, vec4 T, out float m) {
  float L = tcL(T); q *= L;
  float pl = max(T.x, 1e-6), fase = T.z;
  float n = max(abs(T.y), 1.0);
  float k0 = -floor((n - 1.0) * 0.5), k1 = k0 + n - 1.0;
  float s = 1.0 / pl;
  // el hilo (lejos): segmento de k0 a k1, de unos 4 px de grueso
  float rl = max(0.2, 3.4 * pl);
  float fus = 1.0 - smoothstep(2.0, 6.0, s);
  float dl = length(vec2(length(q.yz), max(max(k0 - q.x, q.x - k1), 0.0))) - rl;
  if (s < 2.0) { m = 4.0; return dl / L; }
  float rr = length(q.yz);
  if (rr > 0.6) { m = 4.0; return (length(vec2(rr, max(max(k0 - q.x, q.x - k1), 0.0))) - 0.47) / L; }
  // los átomos: el de esta celda y el vecino más cercano
  float kc = clamp(floor(q.x + 0.5), k0, k1);
  float kv = clamp(kc + (q.x > kc ? 1.0 : -1.0), k0, k1);
  float d = 1e5; m = 0.0;
  for (int j = 0; j < 2; j++) {
    float k = j == 0 ? kc : kv;
    if (T.y < 0.0 && abs(k) < 0.5) continue;
    // el vecino solo se calcula entero si su esfera queda más cerca que lo que ya hay
    if (j == 1 && length(q - vec3(k, 0.0, 0.0)) - 0.47 > d) { d = min(d, length(q - vec3(k, 0.0, 0.0)) - 0.47); continue; }
    float mm;
    float da = tcAtomoF(q - vec3(k, 0.0, 0.0), k, fase, pl, mm);
    if (da < d) { d = da; m = mm; }
  }
  if (fus > 0.0) {
    float dh = length(vec2(length(q.yz), max(max(k0 - q.x, q.x - k1), 0.0))) - mix(0.04, 0.12, fus);
    if (dh < d) m = 4.0;
    d = smin(d, dh, 0.15 * fus + 0.001);
  }
  return d / L;
}
float pza_fila(vec3 q, vec4 T) {
  float L = tcL(T); q *= L;
  float pl = max(T.x, 1e-6), n = max(abs(T.y), 1.0);
  float k0 = -floor((n - 1.0) * 0.5), k1 = k0 + n - 1.0;
  return (length(vec2(length(q.yz), max(max(k0 - q.x, q.x - k1), 0.0))) - max(0.47, 3.4 * pl + 0.02)) / L;
}
float pzc_fila(vec3 q, vec4 T) {
  float L = tcL(T); q *= L;
  float n = max(abs(T.y), 1.0);
  float k0 = -floor((n - 1.0) * 0.5), k1 = k0 + n - 1.0;
  return (length(vec2(length(q.yz), max(max(k0 - q.x, q.x - k1), 0.0))) - 0.06) / L;
}
vec3 pzcol_fila(vec3 q, vec4 T, float m) {
  float L = tcL(T); q *= L;
  if (m > 3.5) { gEm = TC_AMBAR * 0.3; gBri = 1.6; return mix(TC_ELEC, TC_TERRA, 0.3) * (0.92 + 0.12 * vnoise(q * vec3(0.0, 9.0, 9.0) + floor(q.x) * 0.37)); }
  if (m > 2.5) { gEm = TC_AMBAR * 0.35; gBri = 1.6; return TC_ELEC; }
  if (m > 1.5) { gBri = 3.0; gEm = TC_LATON * 0.04; return TC_LATON; }
  gTr = 0.6;
  return (m > 0.5 ? TC_CREAM : TC_TERRA) * (0.93 + 0.14 * vnoise(q * 30.0));
}
`;

// ---------------------------------------------------------------- REGLA DE MILÍMETROS
const GLSL_REGLAMM = /* glsl */`
// la tira de boj de 0 a 1 mm (1 unidad = 1 mm, el origen en 0,5 mm): x de −0,68 a 0,86, y de −0,22 a 0,22, cara en z = 0,04
float tcMarcasMm(vec2 p) {
  // marcas grabadas desde el canto de arriba (y = 0,22): cada décima (cortas), en 0,5 (media) y en 0 y 1 (largas)
  float x = p.x + 0.5;               // milímetros desde el 0
  if (x < -0.02 || x > 1.02) return 1e5;
  float u = x * 10.0, i = floor(u + 0.5);
  float largo = mod(i, 10.0) < 0.5 ? 0.14 : mod(i, 5.0) < 0.5 ? 0.095 : 0.05;
  float dx = abs(u - i) * 0.1;
  float dy = max(0.22 - largo - p.y, 0.0);
  return length(vec2(dx, dy)) - (largo > 0.12 ? 0.0065 : 0.0045);
}
float tcNumMm(vec2 p) {
  float dp, d = 1e5;
  const float S = 0.12;
  d = min(d, g0((p - vec2(-0.5, -0.03)) / S, dp) * S);
  d = min(d, g1((p - vec2(0.5, -0.03)) / S, dp) * S);
  d = min(d, gm((p - vec2(0.62, -0.03)) / S, dp) * S);
  d = min(d, gm((p - vec2(0.71, -0.03)) / S, dp) * S);
  return d - 0.0115;
}
float pz_reglamm(vec3 q, vec4 T, out float m) {
  float d = sdRoundBox(q - vec3(0.09, 0.0, 0.0), vec3(0.77, 0.22, 0.04), 0.018);
  float g = min(tcMarcasMm(q.xy), tcNumMm(q.xy));
  float surco = max(g, abs(q.z - 0.04) - 0.009);
  m = surco < 0.004 ? 1.0 : 0.0;
  return smax(d, -surco, 0.003) * 0.9;
}
float pzc_reglamm(vec3 q, vec4 T) { return sdRoundBox(q - vec3(0.09, 0.0, 0.0), vec3(0.75, 0.2, 0.03), 0.015); }
vec3 pzcol_reglamm(vec3 q, vec4 T, float m) {
  float g = min(tcMarcasMm(q.xy), tcNumMm(q.xy));
  float tinta = 1.0 - smoothstep(-0.002, 0.004, g);
  float v = tcVeta(q.x, q.yz, 90.0);
  vec3 boj = vec3(0.24, 0.15, 0.065) * (0.9 + 0.05 * v + 0.12 * (vnoise(q * vec3(2.0, 20.0, 20.0)) - 0.5));
  if (q.z < 0.03) boj *= 0.8;
  gBri = 1.3;
  return mix(boj, vec3(0.03, 0.022, 0.018), tinta);
}
`;

// ---------------------------------------------------------------- ESTADIO
const GLSL_ESTADIO = /* glsl */`
#ifndef TOCAR_ESTADIO
#define TOCAR_ESTADIO 1
// planta del estadio: distancia (en el suelo) al borde del césped, un rectángulo de esquinas redondeadas
float tcPlanta(vec2 p) { return sdRoundRect(p, vec2(0.56, 0.36), 0.15); }
const float EST_ANCHO = 0.42;    // de la línea del césped al muro de fuera
const float EST_BASE = -0.12;    // suelo del estadio
const int EST_N = 7;             // gradas
float tcGrada(float dP, int k) { return 0.06 + float(k) * (EST_ANCHO - 0.07) / float(EST_N); }
float tcAltoGrada(int k) { return 0.03 + float(k + 1) * 0.036; }
#endif
// m: 0 césped · 1 grada (asiento) · 2 muro de fuera · 3 guisante · 4 foco (poste) · 5 foco (luz) · 6 portería · 7 borde
float pz_estadio(vec3 q, vec4 T, out float m) {
  float dP = tcPlanta(q.xz);
  // césped: losa de arriba en y = 0
  float d = max(max(q.y, EST_BASE - q.y), dP - 0.07);
  m = 0.0;
  // gradas: losas anidadas cada vez más altas (la escalera del cuenco)
  float dg = 1e5;
  for (int k = 0; k < EST_N; k++) {
    float o = tcGrada(dP, k);
    float g = max(max(o - dP, dP - EST_ANCHO), max(q.y - tcAltoGrada(k), EST_BASE - q.y));
    dg = min(dg, g);
  }
  // pretil de arriba
  float pre = max(max(EST_ANCHO - 0.03 - dP, dP - EST_ANCHO), max(q.y - tcAltoGrada(EST_N - 1) - 0.035, EST_BASE - q.y));
  dg = min(dg, pre);
  if (dg < d) m = (dP > EST_ANCHO - 0.035) ? 2.0 : 1.0;
  d = min(d, dg);
  // torres de focos en las cuatro esquinas
  vec3 a = vec3(abs(q.x), q.y, abs(q.z));
  vec3 base = vec3(0.80, 0.0, 0.62);
  float poste = sdCapsule(a, base + vec3(0.0, 0.25, 0.0), base + vec3(-0.02, 0.56, -0.015), 0.011);
  vec3 lc = a - (base + vec3(-0.025, 0.58, -0.02));
  lc.xz = tcGiro(0.66) * lc.xz;
  float luz = sdRoundBox(lc, vec3(0.06, 0.035, 0.012), 0.006);
  if (poste < d) m = 4.0;
  d = min(d, poste);
  if (luz < d) m = 5.0;
  d = min(d, luz);
  // porterías: dos postes y el larguero, en las líneas de fondo
  vec3 pq = vec3(abs(q.x) - 0.5, q.y, q.z);
  float por = min(sdCapsule(vec3(pq.x, pq.y, abs(pq.z)), vec3(0.0, 0.0, 0.034), vec3(0.0, 0.024, 0.034), 0.0035),
                  sdCapsule(pq, vec3(0.0, 0.024, -0.034), vec3(0.0, 0.024, 0.034), 0.0035));
  if (por < d) m = 6.0;
  d = min(d, por);
  // el guisante
  if (T.x > 0.001) {
    float r = 0.014 * T.x;
    float gd = length(q - vec3(0.0, r * 0.92, 0.0)) - r;
    if (gd < d) m = 3.0;
    d = min(d, gd);
  }
  return d * 0.9;
}
float pza_estadio(vec3 q, vec4 T) {
  float d = max(tcPlanta(q.xz) - 0.44, abs(q.y - 0.11) - 0.26);
  vec3 a = vec3(abs(q.x), q.y, abs(q.z));
  return min(d, sdCapsule(a, vec3(0.8, 0.2, 0.62), vec3(0.76, 0.6, 0.6), 0.09));
}
float pzc_estadio(vec3 q, vec4 T) {
  float dP = tcPlanta(q.xz);
  return max(max(abs(dP - 0.34) - 0.06, q.y - 0.2), EST_BASE + 0.01 - q.y);
}
vec3 pzcol_estadio(vec3 q, vec4 T, float m) {
  float dP = tcPlanta(q.xz);
  if (m > 5.5) { gBri = 1.4; return vec3(0.40, 0.39, 0.36); }
  if (m > 4.5) { gEm = vec3(0.9, 0.78, 0.55) * 0.35; return vec3(0.42, 0.38, 0.30); }
  if (m > 3.5) { gBri = 2.6; return vec3(0.12, 0.11, 0.095); }
  if (m > 2.5) {
    // guisante: verde de guisante, brillante, con un punto de luz propia para leerse de lejos
    gBri = 2.2; gTr = 0.5; gEm = vec3(0.10, 0.24, 0.02) * (0.08 + 0.5 * T.z);
    return vec3(0.10, 0.21, 0.02) * (0.95 + 0.1 * vnoise(q * 300.0));
  }
  if (m > 1.5) {
    // muro de fuera: hormigón claro con pilares y bandas de sombra
    float ang = atan(q.z, q.x);
    float pil = smoothstep(0.75, 0.9, abs(fract(ang * 9.549) - 0.5) * 2.0);
    vec3 c = vec3(0.095, 0.088, 0.078) * (0.92 + 0.1 * vnoise(q * 40.0));
    c *= 1.0 - 0.25 * pil;
    if (q.y > tcAltoGrada(EST_N - 1) + 0.005) c = vec3(0.075, 0.07, 0.062);
    return c;
  }
  if (m > 0.5) {
    // gradas: la huella clara (pasillo de hormigón) y los asientos de colores apagados por sectores; escaleras
    float t = (dP - 0.06) / ((EST_ANCHO - 0.07) / float(EST_N));
    float fk = fract(t);
    float ang = atan(q.z, q.x);
    float sector = floor((ang + 3.1416) / 6.2832 * 14.0);
    float esc = abs(fract((ang + 3.1416) / 6.2832 * 14.0) - 0.5);
    vec3 asiento = sector < 2.0 || (sector > 6.0 && sector < 9.0) ? vec3(0.15, 0.038, 0.017)
                 : mod(sector, 2.0) < 0.5 ? vec3(0.15, 0.125, 0.085) : vec3(0.04, 0.05, 0.026);
    vec3 horm = vec3(0.075, 0.07, 0.064);
    float fila = smoothstep(0.35, 0.45, fk) * (1.0 - smoothstep(0.88, 0.97, fk));
    vec3 c = mix(horm, asiento, fila);
    // asientos sueltos: puntitos
    float pu = step(0.5, fract(ang * 60.0 * (1.0 + 0.3 * floor(t)) ));
    c *= 0.9 + 0.12 * pu * fila;
    if (esc < 0.035) c = horm * 0.85;
    // relieve: cada fila de asientos, un bultito
    return c * (0.95 + 0.08 * vnoise(q * 50.0));
  }
  // césped a rayas, con las líneas de cal
  float ray = step(0.5, fract(q.x * 10.0));
  vec3 c = mix(vec3(0.026, 0.048, 0.015), vec3(0.036, 0.064, 0.02), ray) * (0.92 + 0.12 * vnoise(q * 120.0));
  if (dP > -0.01) c = vec3(0.03, 0.04, 0.02);
  vec2 p = q.xz;
  float lin = 1e5;
  lin = min(lin, abs(sdRoundRect(p, vec2(0.5, 0.31), 0.0)));
  lin = min(lin, max(abs(p.x), abs(p.y) - 0.31));
  lin = min(lin, abs(length(p) - 0.075));
  vec2 ap = vec2(abs(p.x) - 0.5, p.y);
  lin = min(lin, abs(sdRoundRect(ap, vec2(0.085, 0.16), 0.0)));
  lin = min(lin, abs(sdRoundRect(ap, vec2(0.035, 0.07), 0.0)));
  lin = min(lin, length(p) - 0.006);
  if (lin < 0.0042) c = vec3(0.24, 0.23, 0.205);
  return c;
}
`;

// ---------------------------------------------------------------- SILLA
const GLSL_SILLA = /* glsl */`
// m: 0 madera (patas, travesaños) · 1 asiento · 2 respaldo
float pz_silla(vec3 q, vec4 T, out float m) {
  vec3 a = vec3(abs(q.x), q.y, q.z);
  // asiento algo hundido en el centro
  float hund = 0.012 * (1.0 - smoothstep(0.0, 0.2, length(q.xz * vec2(1.0, 1.1))));
  float asiento = sdRoundBox(q - vec3(0.0, -0.022 - hund * 0.5, 0.0), vec3(0.212, 0.02 + hund * 0.5, 0.205), 0.014);
  // patas (las de atrás siguen hacia arriba: los postes del respaldo)
  float pd = capsulaC(a, vec3(0.178, -0.03, 0.168), vec3(0.186, -0.425, 0.182), 0.019, 0.015);
  float pt = capsulaC(a, vec3(0.178, -0.425, -0.2), vec3(0.18, -0.03, -0.172), 0.016, 0.019);
  float po = capsulaC(a, vec3(0.18, -0.03, -0.172), vec3(0.172, 0.45, -0.232), 0.019, 0.016);
  float patas = min(min(pd, pt), po);
  // travesaños
  float tr = sdCapsule(a, vec3(0.183, -0.3, 0.168), vec3(0.183, -0.3, -0.19), 0.009);
  tr = min(tr, sdCapsule(q, vec3(-0.18, -0.25, 0.172), vec3(0.18, -0.25, 0.172), 0.009));
  tr = min(tr, sdCapsule(q, vec3(-0.18, -0.33, -0.19), vec3(0.18, -0.33, -0.19), 0.009));
  // respaldo: larguero curvo de arriba, uno a media altura y tres listones
  vec3 r = q; r.z += 0.045 * (1.0 - r.x * r.x / 0.04) * 0.25;
  float lar = sdRoundBox(r - vec3(0.0, 0.415, -0.226), vec3(0.17, 0.035, 0.012), 0.01);
  float med = sdCapsule(r, vec3(-0.17, 0.15, -0.2), vec3(0.17, 0.15, -0.2), 0.01);
  float lis = 1e5;
  for (int k = -1; k <= 1; k++) {
    float x = float(k) * 0.075;
    lis = min(lis, sdRoundBox(r - vec3(x, 0.28, -0.21 - 0.015 * (0.28 - 0.15)), vec3(0.016, 0.12, 0.007), 0.006));
  }
  float resp = min(min(lar, med), lis);
  float d = min(patas, tr);
  m = 0.0;
  if (asiento < d) m = 1.0;
  d = smin(d, asiento, 0.01);
  if (resp < d) m = 2.0;
  return smin(d, resp, 0.008);
}
float pzc_silla(vec3 q, vec4 T) {
  float asiento = sdRoundBox(q - vec3(0.0, -0.022, 0.0), vec3(0.2, 0.016, 0.19), 0.01);
  vec3 a = vec3(abs(q.x), q.y, q.z);
  float p = min(sdCapsule(a, vec3(0.178, -0.03, 0.168), vec3(0.186, -0.42, 0.182), 0.012), sdCapsule(a, vec3(0.178, -0.42, -0.2), vec3(0.172, 0.44, -0.23), 0.012));
  return min(asiento, p);
}
vec3 pzcol_silla(vec3 q, vec4 T, float m) {
  vec3 c = TC_HAYA;
  float v;
  if (m > 0.5 && m < 1.5) v = tcVeta(q.z, q.xy, 140.0);
  else if (m > 1.5) v = tcVeta(q.x, q.yz, 140.0);
  else v = tcVeta(q.y, q.xz, 160.0);
  c *= 0.88 + 0.07 * v + 0.14 * (vnoise(q * vec3(3.0, 30.0, 3.0)) - 0.5);
  if (m > 0.5 && m < 1.5 && q.y > -0.01) c *= 1.08;
  gBri = 1.4;
  return c;
}
`;

// ---------------------------------------------------------------- CHISPAS
const GLSL_CHISPAS = /* glsl */`
float tcEstrella4(vec3 p, float s, float a) {
  p.xy = tcGiro(a) * p.xy;
  vec3 b = abs(p);
  float d = capsulaC(b, vec3(0.0), vec3(s, 0.0, 0.0), 0.16 * s, 0.01 * s);
  d = min(d, capsulaC(b, vec3(0.0), vec3(0.0, s, 0.0), 0.16 * s, 0.01 * s));
  d = min(d, capsulaC(b, vec3(0.0), vec3(0.0, 0.0, 0.35 * s), 0.16 * s, 0.03 * s));
  return min(d, length(p) - 0.2 * s);
}
float pz_chispas(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float n = clamp(floor(T.y + 0.5), 1.0, 16.0);
  float sem = floor(T.z + 0.5), fu = T.x;
  float d = 1e5;
  for (int k = 0; k < 16; k++) {
    if (float(k) >= n) break;
    float fk = float(k);
    float h1 = tcH(fk * 1.7 + sem * 0.113), h2 = tcH(fk * 3.1 + sem * 0.271), h3 = tcH(fk * 5.3 + sem * 0.071);
    float x = -1.0 + 2.0 * (fk + 0.15 + 0.7 * tcH(fk * 2.3)) / n;
    vec3 c = vec3(x, (h1 - 0.5) * 0.3, (h2 - 0.5) * 0.2);
    float s = fu * (0.05 + 0.1 * h3) * step(0.25, h1 * 0.6 + h2 * 0.6);
    if (s < 0.004) continue;
    d = min(d, tcEstrella4(q - c, s, h2 * 3.0));
  }
  return d * 0.8;
}
float pza_chispas(vec3 q, vec4 T) { return sdCapsule(q, vec3(-1.05, 0.0, 0.0), vec3(1.05, 0.0, 0.0), 0.34); }
float pzc_chispas(vec3 q, vec4 T) { return 1e5; }
vec3 pzcol_chispas(vec3 q, vec4 T, float m) {
  gEm = vec3(1.0, 0.72, 0.36) * 0.55; gBri = 2.0;
  return vec3(0.75, 0.62, 0.42);
}
`;

// ---------------------------------------------------------------- TERRÓN
const GLSL_TERRON = /* glsl */`
float pz_terron(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float d = sdRoundBox(q, vec3(0.5), 0.06);
  // granos: la superficie mordida, más en las aristas
  float g = vnoise(q * 26.0) * 0.6 + vnoise(q * 55.0) * 0.4;
  vec3 b = abs(q);
  float arista = smoothstep(0.38, 0.5, max(min(b.x, b.y), max(min(b.y, b.z), min(b.x, b.z))));
  return (d + 0.012 * g + 0.02 * arista * g) * 0.85;
}
float pza_terron(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.53), 0.06); }
float pzc_terron(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.47), 0.05); }
vec3 pzcol_terron(vec3 q, vec4 T, float m) {
  float g = vnoise(q * 70.0);
  float brillo = smoothstep(0.8, 0.95, vnoise(q * 90.0 + 3.0));
  gBri = 1.6 + 2.0 * brillo; gTr = 0.6;
  gEm = vec3(0.08, 0.075, 0.07) * brillo;
  return vec3(0.66, 0.64, 0.6) * (0.9 + 0.12 * g);
}
`;

// ---------------------------------------------------------------- CUCHARILLA
const GLSL_CUCHARILLA = /* glsl */`
float pz_cucharilla(vec3 q, vec4 T, out float m) {
  m = 0.0;
  // cuenco: elipsoide hueco abierto hacia arriba (borde en y ≈ 0,03)
  vec3 c = q - vec3(0.0, 0.035, 0.0);
  float ext = elipsoideP(c, vec3(0.24, 0.085, 0.17));
  float inte = elipsoideP(c - vec3(0.0, 0.016, 0.0), vec3(0.225, 0.08, 0.155));
  float cu = smax(ext, -inte, 0.006);
  cu = smax(cu, q.y - 0.034, 0.008);
  // mango: se estrecha en el cuello y se ensancha y aplana al final, con una curva suave hacia arriba
  float u = clamp((q.x - 0.22) / 0.82, 0.0, 1.0);
  float yc = 0.035 + 0.1 * u * u;
  float an = mix(0.022, 0.06, smoothstep(0.35, 1.0, u)) * (1.0 - 0.3 * smoothstep(0.0, 0.15, u) * (1.0 - smoothstep(0.15, 0.4, u)));
  vec3 h = vec3(q.x - clamp(q.x, 0.22, 1.04), (q.y - yc) / 0.38, q.z / max(an, 0.01) * 0.02);
  float mg = (length(h) - 0.02) * 0.9;
  mg = smax(mg, abs(q.z) - an, 0.01);
  return smin(cu, mg, 0.03);
}
float pzc_cucharilla(vec3 q, vec4 T) { return 1e5; }
vec3 pzcol_cucharilla(vec3 q, vec4 T, float m) {
  gBri = 3.0;
  return vec3(0.36, 0.355, 0.34) * (0.95 + 0.08 * vnoise(q * 12.0));
}
`;

// ---------------------------------------------------------------- CAJÓN
const GLSL_CAJON = /* glsl */`
// m: 0 mueble · 1 frente del cajón · 2 pomo · 3 interior
float pz_cajon(vec3 q, vec4 T, out float m) {
  float ab = clamp(T.x, 0.0, 1.0) * 0.5;
  // mueble: caja con el hueco del cajón en el frente
  float caja = sdRoundBox(q, vec3(0.55, 0.32, 0.36), 0.025);
  float tapa = sdRoundBox(q - vec3(0.0, 0.335, 0.0), vec3(0.58, 0.022, 0.385), 0.012);
  float hueco = sdRoundBox(q - vec3(0.0, -0.01, 0.1), vec3(0.47, 0.215, 0.36), 0.01);
  float mueble = smax(caja, -hueco, 0.006);
  mueble = smin(mueble, tapa, 0.01);
  vec3 a = vec3(abs(q.x), q.y, abs(q.z));
  mueble = min(mueble, capsulaC(a, vec3(0.5, -0.32, 0.31), vec3(0.5, -0.4, 0.31), 0.035, 0.03));
  // el cajón: caja hueca que sale hacia +z, su frente y el pomo
  vec3 c = q - vec3(0.0, -0.01, ab);
  float cj = sdRoundBox(c - vec3(0.0, 0.0, 0.0), vec3(0.455, 0.2, 0.34), 0.01);
  float dentro = sdRoundBox(c - vec3(0.0, 0.03, 0.0), vec3(0.425, 0.2, 0.31), 0.008);
  cj = smax(cj, -dentro, 0.004);
  float fr = sdRoundBox(c - vec3(0.0, 0.0, 0.352), vec3(0.465, 0.205, 0.022), 0.012);
  float pomo = length(c - vec3(0.0, 0.0, 0.405)) - 0.042;
  pomo = smin(pomo, sdCapsule(c, vec3(0.0, 0.0, 0.37), vec3(0.0, 0.0, 0.4), 0.018), 0.01);
  float d = mueble; m = 0.0;
  if (cj < d) { d = cj; m = c.y < 0.17 && abs(c.x) < 0.43 && abs(c.z) < 0.315 ? 3.0 : 1.0; }
  if (fr < d) { d = fr; m = 1.0; }
  if (pomo < d) { d = pomo; m = 2.0; }
  return d;
}
float pzc_cajon(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.53, 0.3, 0.34), 0.02); }
vec3 pzcol_cajon(vec3 q, vec4 T, float m) {
  if (m > 1.5 && m < 2.5) { gBri = 3.2; return vec3(0.47, 0.33, 0.12); }
  float v = tcVeta(q.x, q.yz, 90.0);
  vec3 c = TC_NOGAL * 1.25 * (0.88 + 0.07 * v + 0.14 * (vnoise(q * vec3(2.0, 20.0, 20.0)) - 0.5));
  if (m > 2.5) return c * 0.55;
  if (m > 0.5) c *= 1.18;
  gBri = 1.3;
  return c;
}
`;

// ---------------------------------------------------------------- FIGURITAS (multitud y figurita)
const GLSL_FIGURA = /* glsl */`
#ifndef TOCAR_FIGURA
#define TOCAR_FIGURA 1
// una figurita (pies en y = 0, alto 1 × al), con sus colores según h (semilla 0…1). m: 0 piel · 1 pelo · 2 jersey · 3 pantalón
float tcFigura(vec3 p, float h, float h2, out float m) {
  float al = 0.9 + 0.2 * h2;
  p /= al;
  vec3 a = vec3(abs(p.x), p.y, p.z);
  float cab = length(p - vec3(0.0, 0.875, 0.0)) - 0.105;
  float pelo = length(p - vec3(0.0, 0.9, -0.012)) - 0.105;
  pelo = smax(pelo, -(p.y - 0.875 + 0.035 * p.z * 10.0 * step(0.0, p.z)) , 0.02);
  float tor = capsulaC(p, vec3(0.0, 0.47, 0.0), vec3(0.0, 0.7, 0.0), 0.12, 0.13);
  tor = smin(tor, length((p - vec3(0.0, 0.69, 0.0)) * vec3(0.8, 1.6, 1.4)) - 0.13, 0.04);
  float bra = capsulaC(a, vec3(0.14, 0.7, 0.0), vec3(0.17, 0.43, 0.02), 0.042, 0.036);
  float pie = capsulaC(a, vec3(0.06, 0.48, 0.0), vec3(0.065, 0.05, 0.0), 0.06, 0.045);
  pie = smin(pie, length((a - vec3(0.065, 0.03, 0.035)) * vec3(1.2, 2.2, 0.9)) - 0.05, 0.02);
  float cuello = sdCapsule(p, vec3(0.0, 0.72, 0.0), vec3(0.0, 0.8, 0.0), 0.045);
  float d = min(cab, cuello); m = 0.0;
  if (pelo < d) { d = pelo; m = 1.0; }
  float ropa = smin(tor, bra, 0.02);
  if (ropa < d) m = 2.0;
  d = smin(d, ropa, 0.015);
  if (pie < d) m = 3.0;
  d = smin(d, pie, 0.02);
  return d * al;
}
vec3 tcColFigura(float m, float h, float h2, vec3 q) {
  float k = floor(h * 6.0), j = floor(fract(h * 7.3) * 4.0), s = floor(fract(h * 13.7) * 4.0);
  if (m < 0.5) return (s < 0.5 ? vec3(0.50, 0.305, 0.205) : s < 1.5 ? vec3(0.56, 0.36, 0.25) : s < 2.5 ? vec3(0.34, 0.18, 0.1) : vec3(0.19, 0.095, 0.05));
  if (m < 1.5) return (j < 0.5 ? vec3(0.08, 0.05, 0.034) : j < 1.5 ? vec3(0.02, 0.016, 0.014) : j < 2.5 ? vec3(0.32, 0.21, 0.09) : vec3(0.42, 0.40, 0.37));
  if (m < 2.5) return (k < 0.5 ? vec3(0.25, 0.24, 0.22) : k < 1.5 ? vec3(0.12, 0.13, 0.07) : k < 2.5 ? vec3(0.42, 0.26, 0.06)
                      : k < 3.5 ? vec3(0.10, 0.12, 0.16) : k < 4.5 ? vec3(0.50, 0.44, 0.32) : vec3(0.40, 0.12, 0.05)) * (0.92 + 0.12 * vnoise(q * 40.0));
  return (j < 1.5 ? vec3(0.12, 0.10, 0.068) : j < 2.5 ? vec3(0.06, 0.07, 0.09) : vec3(0.18, 0.12, 0.07));
}
#endif
`;
const GLSL_MULTITUD = GLSL_FIGURA + /* glsl */`
// la multitud: red de 0,42 con desorden, en el círculo de radio T.y con hueco de radio floor(T.x)/10; aparición:
// fract(T.x); semilla: T.z. m: 10 × celda… (se recalcula en el color)
const float MU_PASO = 0.42;
float tcCeldaMu(vec2 c, vec4 T, out vec2 pos, out float h, out float h2, out float esc) {
  float sem = T.z;
  h = tcH2(c + sem * 1.37); h2 = tcH2(c * 1.31 + 7.1 + sem);
  pos = (c + (vec2(h, h2) - 0.5) * 0.5) * MU_PASO;
  float r = length(pos), R = T.y, hueco = floor(T.x) * 0.1;
  float dentro = step(r, R) * step(hueco, r);
  float ap = clamp((fract(T.x) - 0.0005) / 0.998, 0.0, 1.0);
  float orden = tcH2(c * 0.77 + 3.3 + sem);
  esc = dentro * smoothstep(orden * 0.8, orden * 0.8 + 0.2, ap);
  return esc;
}
float pz_multitud(vec3 q, vec4 T, out float m) {
  float L = tcL(T); q *= L;
  vec2 c0 = floor(q.xz / MU_PASO);
  float d = 1e5; m = 0.0;
  // la superficie del grupo (para que el rayo no se pierda entre figuras lejanas)
  for (int j = 0; j < 4; j++) {
    vec2 c = c0 + vec2(float(j & 1), float(j >> 1));
    vec2 pos; float h, h2, esc;
    tcCeldaMu(c, T, pos, h, h2, esc);
    if (esc < 0.02) continue;
    vec3 p = q - vec3(pos.x, 0.0, pos.y);
    p.xz = tcGiro(h * 6.283) * p.xz;
    float mm;
    float df = tcFigura(p / esc, h, h2, mm) * esc;
    if (df < d) { d = df; m = mm; }
  }
  // fuera de la celda la distancia puede pasarse: el paso se limita al tamaño de la celda
  d = min(d, max(q.y - 1.25, 0.12));
  return d / L;
}
float pza_multitud(vec3 q, vec4 T) {
  float L = tcL(T); q *= L;
  return max(length(q.xz) - (T.y + 0.35), max(q.y - 1.2, -q.y - 0.05)) / L;
}
float pzc_multitud(vec3 q, vec4 T) { return 1e5; }
vec3 pzcol_multitud(vec3 q, vec4 T, float m) {
  float L = tcL(T); q *= L;
  // la figura más cercana (la misma búsqueda) para su color
  vec2 c0 = floor(q.xz / MU_PASO);
  float best = 1e5, hb = 0.0, h2b = 0.0, mb = 0.0;
  for (int j = 0; j < 4; j++) {
    vec2 c = c0 + vec2(float(j & 1), float(j >> 1));
    vec2 pos; float h, h2, esc;
    tcCeldaMu(c, T, pos, h, h2, esc);
    if (esc < 0.02) continue;
    vec3 p = q - vec3(pos.x, 0.0, pos.y);
    p.xz = tcGiro(h * 6.283) * p.xz;
    float mm;
    float df = tcFigura(p / esc, h, h2, mm) * esc;
    if (df < best) { best = df; hb = h; h2b = h2; mb = mm; }
  }
  return tcColFigura(mb, hb, h2b, q);
}
`;
const GLSL_FIGURITA = GLSL_FIGURA + /* glsl */`
float pz_figurita(vec3 q, vec4 T, out float m) { return tcFigura(q + vec3(0.0, 0.5, 0.0), fract(T.z * 0.6180339 + 0.13), fract(T.z * 0.7548777 + 0.31), m); }
float pzc_figurita(vec3 q, vec4 T) { return capsulaC(q, vec3(0.0, -0.4, 0.0), vec3(0.0, 0.3, 0.0), 0.07, 0.08); }
vec3 pzcol_figurita(vec3 q, vec4 T, float m) { return tcColFigura(m, fract(T.z * 0.6180339 + 0.13), fract(T.z * 0.7548777 + 0.31), q); }
`;

// ---------------------------------------------------------------- GATO
const GLSL_GATO = /* glsl */`
// m: 0 pelo · 1 pelo claro (pecho, hocico, patas) · 2 nariz · 3 ojo · 4 dentro de la oreja · 5 bigote
vec3 tcCabezaGato(vec3 q, vec4 T) {
  // marco de la cabeza: centro y giro hacia la cámara (y un poco arriba con T.x)
  vec3 c = vec3(0.36, 0.13 + 0.06 * T.x, 0.04);
  vec3 h = q - c;
  h.xz = tcGiro(-0.5) * h.xz;      // la cara mira a la cámara (+z), un poco hacia su cuerpo
  h.yz = tcGiro(-0.25 * T.x) * h.yz;
  return h;
}
float pz_gato(vec3 q, vec4 T, out float m) {
  m = 0.0;
  // cuerpo tumbado: tronco, pecho y cadera
  float d = elipsoideP(q - vec3(-0.04, -0.09, 0.0), vec3(0.42, 0.19, 0.2));
  d = smin(d, elipsoideP(q - vec3(0.22, -0.07, 0.01), vec3(0.17, 0.2, 0.18)), 0.08);
  d = smin(d, elipsoideP(q - vec3(-0.3, -0.07, -0.01), vec3(0.2, 0.2, 0.21)), 0.08);
  // patas delanteras, recogidas hacia delante
  vec3 a = vec3(q.x, q.y, abs(q.z - 0.02));
  float pd = capsulaC(a, vec3(0.24, -0.2, 0.085), vec3(0.47, -0.265, 0.1), 0.05, 0.045);
  pd = smin(pd, elipsoideP(a - vec3(0.48, -0.268, 0.1), vec3(0.06, 0.035, 0.05)), 0.03);
  float pt = elipsoideP(q - vec3(-0.18, -0.24, 0.17), vec3(0.16, 0.06, 0.07));
  d = smin(d, min(pd, pt), 0.04);
  // cola que rodea el cuerpo por delante
  float co = 1e5;
  vec3 p0 = vec3(-0.5, -0.18, -0.05), p1 = vec3(-0.52, -0.25, 0.14), p2 = vec3(-0.3, -0.27, 0.27), p3 = vec3(0.02, -0.275, 0.26);
  co = min(co, capsulaC(q, p0, p1, 0.05, 0.045));
  co = min(co, capsulaC(q, p1, p2, 0.045, 0.04));
  co = min(co, capsulaC(q, p2, p3, 0.04, 0.032));
  d = smin(d, co, 0.03);
  // cabeza
  vec3 h = tcCabezaGato(q, T);
  float cab = elipsoideP(h, vec3(0.15, 0.13, 0.135));
  cab = smin(cab, elipsoideP(h - vec3(0.0, -0.045, 0.085), vec3(0.075, 0.05, 0.06)), 0.04);   // hocico
  vec3 ha = vec3(abs(h.x), h.y, h.z);
  cab = smin(cab, elipsoideP(ha - vec3(0.085, -0.03, 0.04), vec3(0.075, 0.07, 0.07)), 0.04);   // mofletes
  float or = capsulaC(ha, vec3(0.085, 0.08, -0.01), vec3(0.11, 0.2, -0.02), 0.055, 0.008);
  or = smax(or, -(h.z + 0.01 - 0.2 * (ha.x - 0.09)), 0.01);
  float orIn = capsulaC(ha - vec3(0.0, 0.0, 0.008), vec3(0.088, 0.09, 0.0), vec3(0.108, 0.18, -0.008), 0.035, 0.004);
  cab = smin(cab, or, 0.02);
  float nariz = elipsoideP(h - vec3(0.0, -0.02, 0.148), vec3(0.018, 0.012, 0.012));
  float bi = 1e5;
  for (int k = 0; k < 3; k++) {
    float y = -0.045 - 0.012 * float(k);
    bi = min(bi, sdCapsule(ha, vec3(0.04, y, 0.13), vec3(0.17, y + 0.02 - 0.02 * float(k), 0.11), 0.0028));
  }
  float dc = min(cab, nariz);
  d = smin(d, cab, 0.06);
  if (nariz < d) m = 2.0;
  d = min(d, nariz);
  if (bi < d) m = 5.0;
  d = min(d, bi);
  if (m < 1.5 && orIn < 0.004 && h.z > -0.02) m = 4.0;
  return d * 0.85;
}
float pza_gato(vec3 q, vec4 T) { return sdRoundBox(q - vec3(0.025, 0.08, 0.035), vec3(0.62, 0.42, 0.33), 0.12); }
float pzc_gato(vec3 q, vec4 T) { return elipsoideP(q - vec3(-0.04, -0.09, 0.0), vec3(0.38, 0.16, 0.17)); }
vec3 pzcol_gato(vec3 q, vec4 T, float m) {
  // pelaje: 0 atigrado ocre · 1 gris pizarra · 2 crema
  float pe = floor(T.y + 0.5);
  vec3 base = pe < 0.5 ? vec3(0.30, 0.13, 0.035) : pe < 1.5 ? vec3(0.075, 0.075, 0.08) : vec3(0.36, 0.28, 0.18);
  vec3 claro = vec3(0.42, 0.38, 0.32);
  vec3 h = tcCabezaGato(q, T);
  if (m > 4.5) { gBri = 1.0; return vec3(0.65, 0.62, 0.56); }
  if (m > 3.5) return vec3(0.45, 0.22, 0.17);
  if (m > 1.5) return vec3(0.38, 0.14, 0.12);
  // ojos: cerrados (dos arcos oscuros felices) o abiertos (ámbar con pupila de raja)
  vec3 he = vec3(abs(h.x) - 0.06, h.y - 0.025, h.z);
  float ojoZona = length(he.xy * vec2(1.0, 1.6));
  float cer = clamp(T.z, 0.0, 1.0);
  vec3 col = base;
  // rayas del atigrado (en el lomo y la cola), más oscuras
  float ray = smoothstep(0.55, 0.75, sin(q.x * 38.0 + 3.0 * vnoise(q * 6.0)) * 0.5 + 0.5) * smoothstep(-0.12, 0.05, q.y + 0.1 * q.z);
  if (pe < 0.5) col = mix(col, col * 0.55, ray);
  else if (pe < 1.5) col = mix(col, col * 0.7, ray * 0.6);
  // claro: pecho, hocico, puntas de las patas
  float pecho = 1.0 - smoothstep(0.05, 0.12, length((q - vec3(0.33, -0.1, 0.13)) * vec3(1.0, 0.8, 1.4)));
  float hoc = h.z > 0.06 ? 1.0 - smoothstep(0.04, 0.07, length(h.xy - vec2(0.0, -0.05))) : 0.0;
  float patas = 1.0 - smoothstep(0.03, 0.06, length(vec3(q.x - 0.48, q.y + 0.268, abs(q.z - 0.02) - 0.1)));
  col = mix(col, claro, max(max(pecho, hoc), patas));
  if (h.z > 0.08 && ojoZona < 0.045) {
    if (cer > 0.5) {
      float arco = abs(length(he.xy - vec2(0.0, -0.022)) - 0.026);
      if (arco < 0.0045 && he.y > -0.012) col = vec3(0.02, 0.015, 0.012);
    } else {
      col = vec3(0.45, 0.30, 0.05);
      if (abs(he.x) < 0.007) col = vec3(0.01);
      gEm = vec3(0.05, 0.03, 0.0);
    }
  }
  // relieve de pelo: hebras finas a lo largo del cuerpo
  float f = vnoise(vec3(q.x * 8.0, q.y * 90.0, q.z * 90.0));
  gG = vec3(0.0, 0.004, 0.004) * (f - 0.5);
  return col * (0.94 + 0.12 * vnoise(q * 25.0));
}
`;

// ---------------------------------------------------------------- CIFRA: el 7 y sus ceros
const GLSL_CIFRA = /* glsl */`
const float CI_AV = 0.66;
float tcDigito(vec3 p, float c) {   // c: 0 el cero · 7 el siete
  float dp;
  float d2 = c > 3.5 ? g7(p.xy, dp) : g0(p.xy, dp);
  return churro(d2, p.z, 0.085);
}
float pz_cifra(vec3 q, vec4 T, out float m) {
  float L = tcL(T); q *= L;
  m = 0.0;
  float n = max(T.y, 0.0), nz = ceil(n - 1e-4);
  float d = tcDigito(q, 7.0);
  if (nz > 0.5) {
    float k = clamp(floor(q.x / CI_AV + 0.5) - 1.0, 0.0, nz - 1.0);
    for (int j = 0; j < 2; j++) {
      float kk = clamp(k + float(j) * (q.x / CI_AV - 1.0 > k ? 1.0 : -1.0), 0.0, nz - 1.0);
      float s = kk > nz - 1.5 ? clamp(n - (nz - 1.0), 0.0, 1.0) : 1.0;
      s = s < 1.0 ? s * s * (3.0 - 2.0 * s) : 1.0;
      if (s < 0.02) continue;
      vec3 p = (q - vec3(CI_AV * (kk + 1.0), 0.0, 0.0)) / s;
      d = min(d, tcDigito(p, 0.0) * s);
    }
  }
  return d / L;
}
float pza_cifra(vec3 q, vec4 T) {
  float L = tcL(T); q *= L;
  float nz = ceil(max(T.y, 0.0) - 1e-4), x1 = CI_AV * nz;
  return sdRoundBox(q - vec3(x1 * 0.5, 0.0, 0.0), vec3(x1 * 0.5 + 0.45, 0.62, 0.16), 0.05) / L;
}
float pzc_cifra(vec3 q, vec4 T) { return 1e5; }
vec3 pzcol_cifra(vec3 q, vec4 T, float m) { return colorGlifo(T.z) * (0.94 + 0.1 * vnoise(q * 6.0)); }
`;

// ---------------------------------------------------------------- los tipos
const TIPOS = {
  peldano: { envolvente: true, radio: 1.3, glifos: [], glsl: GLSL_COMUN + GLSL_PELDANO },
  fila: { envolvente: true, radio: 0.56, glifos: [], glsl: GLSL_COMUN + GLSL_FILA },
  reglamm: { radio: 0.9, glifos: ['0', '1', 'm'], glsl: GLSL_COMUN + GLSL_REGLAMM },
  estadio: { envolvente: true, radio: 1.12, glifos: [], glsl: GLSL_COMUN + GLSL_ESTADIO },
  silla: { radio: 0.66, glifos: [], glsl: GLSL_COMUN + GLSL_SILLA },
  chispas: { envolvente: true, radio: 1.15, glifos: [], glsl: GLSL_COMUN + GLSL_CHISPAS },
  terron: { envolvente: true, radio: 0.82, glifos: [], glsl: GLSL_COMUN + GLSL_TERRON },
  cucharilla: { radio: 1.08, glifos: [], glsl: GLSL_COMUN + GLSL_CUCHARILLA },
  cajon: { radio: 0.98, glifos: [], glsl: GLSL_COMUN + GLSL_CAJON },
  multitud: { envolvente: true, radio: 1.3, glifos: [], glsl: GLSL_COMUN + GLSL_MULTITUD },
  figurita: { radio: 0.6, glifos: [], glsl: GLSL_COMUN + GLSL_FIGURITA },
  gato: { envolvente: true, radio: 0.75, glifos: [], glsl: GLSL_COMUN + GLSL_GATO },
  cifra: { envolvente: true, radio: 0.6, glifos: ['7', '0'], glsl: GLSL_COMUN + GLSL_CIFRA },
};
export const TIPOS_TOCAR = TIPOS;
export function tiposTocar(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-tocar: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
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

export const PARES = { AT: 0, TA: 1, GC: 2, CG: 3 };
export function peldano(P, i, o = {}) {
  const b = base(o);
  const par = o.par ?? 'AT';
  const v = Array.isArray(par) ? 4 : (PARES[par] ?? 0);
  P.pieza(i, { ...b, variante: v, color: (o.extremos ?? true) ? 1 : 0 });
  if (Array.isArray(par)) escribirT(P, i, empaquetar(par[0]), empaquetar(par[1]));
  return { centro: mundoPieza(b, [0, 0, 0]), izq: mundoPieza(b, [-1, 0, 0]), der: mundoPieza(b, [1, 0, 0]) };
}

// píxeles que mide en pantalla una unidad local a lo largo del eje ax de la pieza (cerca de su centro)
function pxPorUnidad(P, b, ax = [1, 0, 0], l0 = [0, 0, 0]) {
  const a = P.proyectar(mundoPieza(b, l0)), c = P.proyectar(mundoPieza(b, [l0[0] + ax[0], l0[1] + ax[1], l0[2] + ax[2]]));
  if (!a || !c) return 1;
  return Math.max(1e-9, Math.hypot(c[0] - a[0], c[1] - a[1]));
}
export function fila(P, i, o = {}) {
  const n = Math.max(1, Math.round(o.n ?? 11));
  const k0 = -Math.floor((n - 1) / 2), k1 = k0 + n - 1;
  const b0 = base(o);
  const px = o.pixel ? 1 / o.pixel : pxPorUnidad(P, b0);
  const L = Math.max(1, (Math.max(-k0, k1) + 0.5) / TIPOS.fila.radio);
  P.pieza(i, { ...b0, escala: b0.escala * L, sq: [1, 1, 1], variante: o.sinCentro ? -n : n, color: o.fase ?? 0 });
  escribirT(P, i, 1 / px, L);
  return { punto: (k) => mundoPieza(b0, [k, 0, 0]), pxAtomo: px, extremos: [mundoPieza(b0, [k0, 0, 0]), mundoPieza(b0, [k1, 0, 0])] };
}
export function reglaMm(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  return { punto: (mm, y = 0.22) => mundoPieza(b, [mm - 0.5, y, 0.04]) };
}
export function estadio(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.sinCesped ? 1 : 0, color: o.brilloGuisante ?? 0 });
  const g = o.guisante ?? 1;
  escribirT(P, i, g, 0);
  return { ...geometriaEstadio(P, b, g) };
}
// dónde queda el estadio (sin ponerlo): el guisante, el centro, un punto del borde y las elipses de pantalla de la nube
// (anillo: sobre las gradas, a media altura; bola: la cáscara que lo envuelve, de lejos el átomo)
export function geometriaEstadio(P, o, g = 1) {
  const b = base(o);
  const pr = (l) => P.proyectar(mundoPieza(b, l));
  const elipse = (c, ex, ez) => {
    const pc = pr(c), px = pr([c[0] + ex, c[1], c[2]]), pz = pr([c[0], c[1], c[2] + ez]);
    return pc && px && pz ? { centro: pc, ejeX: [px[0] - pc[0], px[1] - pc[1]], ejeY: [pz[0] - pc[0], pz[1] - pc[1]] } : null;
  };
  // la bola: un círculo en pantalla del tamaño del estadio y algo más
  const an0 = elipse([0, 0.17, 0], 0.76, 0.58);
  const an = an0 && { ...an0, interior: 0.86, exterior: 1.26 };
  let bola = null;
  if (an) {
    const R = 1.32 * Math.max(Math.hypot(...an.ejeX), Math.hypot(...an.ejeY));
    const pc = pr([0, 0.08, 0]);
    bola = { centro: pc, ejeX: [R, 0], ejeY: [0, 0.86 * R] };
  }
  return {
    guisante: mundoPieza(b, [0, 0.013 * g, 0]), centro: mundoPieza(b, [0, 0, 0]),
    borde: (ang) => mundoPieza(b, [Math.cos(ang) * 0.95, 0.3, Math.sin(ang) * 0.75]),
    anillo: an, bola,
  };
}
export function silla(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  return { asiento: mundoPieza(b, [0, 0, 0]), respaldo: mundoPieza(b, [0, 0.42, -0.22]) };
}
// pos/escala/rot de la silla para una persona «humano» (h: lo que devuelve P.pieza de la persona, con la postura
// sentada o cualquiera: la silla va donde quedaría el asiento de la postura sentada) — opciones: { escala, rot }
export function sillaPara(asientoMundo, escalaPersona, rotY = 0) {
  return { pos: asientoMundo, escala: escalaPersona, rot: [0, rotY, 0] };
}
export function chispas(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: o.n ?? 7, color: Math.floor(o.semilla ?? 0) });
  escribirT(P, i, o.fuerza ?? 1, 0);
}
export function terron(P, i, o = {}) { P.pieza(i, base(o)); }
export function cucharilla(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  return { cuenco: mundoPieza(b, [0, -0.01, 0]), mango: mundoPieza(b, [0.86, 0.11, 0]) };
}
export function cajon(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, b);
  const ab = cl(o.abierto ?? 0) * 0.5;
  escribirT(P, i, cl(o.abierto ?? 0), 0);
  return { interior: mundoPieza(b, [0, -0.2, ab]), frente: mundoPieza(b, [0, -0.01, ab + 0.405]) };
}
export function multitud(P, i, o = {}) {
  const b0 = base(o);
  const R = o.radio ?? 6, hueco = o.hueco ?? 0, ap = cl(o.aparicion ?? 1);
  const L = Math.max(1, (R + 0.6) / TIPOS.multitud.radio);
  P.pieza(i, { ...b0, escala: b0.escala * L, sq: [1, 1, 1], variante: R, color: o.semilla ?? 0 });
  escribirT(P, i, Math.floor(hueco * 10) + 0.0005 + 0.998 * ap, L);
  return { radioMundo: R * b0.escala };
}
export function figurita(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, color: o.semilla ?? 0 });
}
export const PELAJES = { atigrado: 0, gris: 1, crema: 2 };
export function gato(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: PELAJES[o.pelaje ?? 'atigrado'] ?? 0, color: o.ojos ?? 1 });
  escribirT(P, i, o.cabeza ?? 0, 0);
  return { lomo: mundoPieza(b, [-0.05, 0.12, 0]), cabeza: mundoPieza(b, [0.36, 0.28, 0.04]) };
}
export const COLOR_CIFRA = { tinta: 0, mantequilla: 1, mostaza: 2, crema: 3, terracota: 4, oliva: 5 };
export function cifra(P, i, o = {}) {
  const b0 = base(o);
  const ceros = Math.max(0, o.ceros ?? 0);
  const ancho = 0.66 * Math.ceil(ceros - 1e-4) + 0.5;
  const L = Math.max(1, (ancho + 0.4) / TIPOS.cifra.radio);
  P.pieza(i, { ...b0, escala: b0.escala * L, sq: [1, 1, 1], variante: ceros, color: COLOR_CIFRA[o.color ?? 'crema'] ?? 3 });
  escribirT(P, i, 0, L);
  return { ancho, punto: (k) => mundoPieza(b0, [0.66 * k, 0, 0]) };
}

// ---------------------------------------------------------------- 2D
export function foto(P) {
  const l = P.renderer.domElement;
  const c = document.createElement('canvas'); c.width = l.width; c.height = l.height;
  c.getContext('2d').drawImage(l, 0, 0);
  return c;
}
// La NUBE DE ELECTRONES, en 2D (borrosa y translúcida: bocanadas de luz crema y ámbar y motas de ámbar que giran).
//   nubeElectrones(g, { centro: [x, y], ejeX: [dx, dy], ejeY: [dx, dy], forma: 'anillo'|'bola', interior, extension,
//                       desde, t, semilla, fuerza, motas, bocanadas })
//   · centro, ejeX y ejeY: la elipse en pantalla (px de diseño) como centro y dos semidiámetros conjugados; con el
//     estadio, los da estadio(P, i, …).anillo (sobre las gradas) o .bola (la cáscara de lejos)
//   · forma 'anillo': las bocanadas entre interior y exterior (fracciones de la elipse; 0,6 y 1,06 por defecto; el
//     anillo del estadio trae los suyos, para que no pise el césped); 'bola': más densas
//     hacia el borde (la cáscara), con el centro casi limpio para que se vea el guisante
//   · extension 0…1: se extiende alrededor desde el ángulo `desde` (rad, en la elipse; π: por la izquierda) en los dos
//     sentidos; t: segundos (las motas giran); fuerza: opacidad (0…1)
export function nubeElectrones(g, { centro, ejeX, ejeY, forma = 'anillo', interior = null, exterior = 1.06, extension = 1, desde = Math.PI, t = 0,
  semilla = 7, fuerza = 1, motas = 240, bocanadas = 150, desenfoque = 7 } = {}) {
  if (!centro || !ejeX || !ejeY) return;
  const [cx, cy] = centro, [ax, ay] = ejeX, [bx, by] = ejeY;
  const R = Math.hypot(ax, ay), rIn = interior ?? (forma === 'anillo' ? 0.6 : 0);
  const rnd = semillero(semilla);
  const vis = (th) => {
    const d = Math.abs((((th - desde) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
    return cl((extension * Math.PI * 1.12 - d) / 0.5);
  };
  const radio = () => {
    if (forma === 'anillo') { const u = (rnd() + rnd() + rnd()) / 3; return rIn + (exterior - rIn) * u; }
    return 1 - 0.45 * Math.pow(rnd(), 1.6);
  };
  const en = (th, rr) => [cx + (ax * Math.cos(th) + bx * Math.sin(th)) * rr, cy + (ay * Math.cos(th) + by * Math.sin(th)) * rr];
  const k = fuerza * (extension > 0 ? 1 : 0);
  if (k <= 0) return;
  // la neblina se pinta en una capa aparte y se desenfoca entera
  const cw = g.canvas.width, ch = g.canvas.height;
  if (!nubeElectrones.capa || nubeElectrones.capa.width !== cw || nubeElectrones.capa.height !== ch) {
    nubeElectrones.capa = document.createElement('canvas'); nubeElectrones.capa.width = cw; nubeElectrones.capa.height = ch;
  }
  const capa = nubeElectrones.capa, gc = capa.getContext('2d');
  // (coste) solo se limpia, se pinta y se desenfoca el rectángulo que ocupa la nube
  const M = g.getTransform();
  const ext = R * 1.6 + Math.hypot(bx, by) * 0.1;
  const esq = [[cx - ext, cy - ext], [cx + ext, cy - ext], [cx - ext, cy + ext], [cx + ext, cy + ext]].map(([x, y]) => [M.a * x + M.c * y + M.e, M.b * x + M.d * y + M.f]);
  const marg = 3 * desenfoque * cw / 1920;
  const rx0 = Math.max(0, Math.floor(Math.min(...esq.map((p) => p[0])) - marg)), ry0 = Math.max(0, Math.floor(Math.min(...esq.map((p) => p[1])) - marg));
  const rx1 = Math.min(cw, Math.ceil(Math.max(...esq.map((p) => p[0])) + marg)), ry1 = Math.min(ch, Math.ceil(Math.max(...esq.map((p) => p[1])) + marg));
  if (rx1 <= rx0 || ry1 <= ry0) return;
  gc.setTransform(1, 0, 0, 1, 0, 0); gc.clearRect(rx0, ry0, rx1 - rx0, ry1 - ry0);
  gc.setTransform(M);
  for (let i = 0; i < bocanadas; i++) {
    const th = rnd() * 2 * Math.PI, rr = radio(), [x, y] = en(th, rr);
    const v = vis(th) * k;
    const s = (0.13 + 0.13 * rnd()) * R * (forma === 'anillo' ? 1 : 1.2) * (0.55 + 0.45 * v);
    const a = (0.13 + 0.1 * rnd()) * v;
    if (v < 0.01) continue;
    const gr = gc.createRadialGradient(x, y, 0, x, y, s);
    gr.addColorStop(0, `rgba(236,222,196,${a})`); gr.addColorStop(0.5, `rgba(224,198,158,${a * 0.5})`); gr.addColorStop(1, 'rgba(210,180,140,0)');
    gc.fillStyle = gr; gc.fillRect(x - s, y - s, 2 * s, 2 * s);
  }
  gc.globalCompositeOperation = 'lighter';
  for (let i = 0; i < Math.round(bocanadas / 5); i++) {
    const th = rnd() * 2 * Math.PI, rr = radio(), [x, y] = en(th, rr);
    const v = vis(th) * k;
    const s = (0.18 + 0.12 * rnd()) * R;
    if (v < 0.01) continue;
    const gr = gc.createRadialGradient(x, y, 0, x, y, s);
    gr.addColorStop(0, `rgba(255,165,75,${0.07 * v})`); gr.addColorStop(1, 'rgba(255,150,60,0)');
    gc.fillStyle = gr; gc.fillRect(x - s, y - s, 2 * s, 2 * s);
  }
  gc.globalCompositeOperation = 'source-over';
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  g.filter = `blur(${(desenfoque * cw / 1920).toFixed(1)}px)`;
  g.drawImage(capa, rx0, ry0, rx1 - rx0, ry1 - ry0, rx0, ry0, rx1 - rx0, ry1 - ry0); g.filter = 'none';
  g.restore();
  // motas: electrones que giran, pequeños y nítidos, con una estela corta
  g.save();
  for (let i = 0; i < motas; i++) {
    const th0 = rnd() * 2 * Math.PI, rr = radio(), w = (0.3 + 0.5 * rnd()) * (rnd() < 0.5 ? -1 : 1), sz = 0.8 + 1.3 * rnd() * rnd();
    const th = th0 + w * t;
    const v = vis(th) * k;
    if (v < 0.02) continue;
    const [x, y] = en(th, rr), [x2, y2] = en(th - w * 0.08, rr);
    g.strokeStyle = `rgba(255,190,110,${0.25 * v})`; g.lineWidth = sz; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x2, y2); g.lineTo(x, y); g.stroke();
    g.fillStyle = `rgba(255,212,150,${0.6 * v})`;
    g.beginPath(); g.arc(x, y, sz, 0, 2 * Math.PI); g.fill();
  }
  g.restore();
}
export function brilloChispas(g, pts, { radio = 46, fuerza = 1 } = {}) {
  g.save(); g.globalCompositeOperation = 'lighter';
  for (const [x, y, k = 1] of pts) {
    const R = radio * k;
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    gr.addColorStop(0, `rgba(255,214,150,${0.5 * fuerza * k})`); gr.addColorStop(0.35, `rgba(240,160,80,${0.16 * fuerza * k})`); gr.addColorStop(1, 'rgba(200,110,50,0)');
    g.fillStyle = gr; g.fillRect(x - R, y - R, 2 * R, 2 * R);
  }
  g.restore();
}
