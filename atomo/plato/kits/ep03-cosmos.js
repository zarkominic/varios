// KIT DEL EPISODIO 3 · «COSMOS» (kits/ep03-cosmos.js). Lo crea ep3-tierra y, una vez entregado con su hoja de prueba
// (escenas/ep03-cosmos-hoja.html: __frame(0) la hoja entera, __frame(k) la celda k), queda CONGELADO: las escenas que lo
// usan no lo cambian. Si algo no basta, la escena lo resuelve por su cuenta y lo dice en su informe.
// Lo usan: ep3-tierra (lo crea), ep3-vuelta, ep3-neutrones, ep3-luz, ep3-mapa, ep3-andromeda, ep3-universo y ep3-despedida.
//
// Es la cámara del mundo de cosmos-plastilina-adulta.html (el «mundo en relieve» de crearMundo, en el kit compartido
// plastilina-cosmos-adulta.js, que no se toca) sacada de la escena y escrita en función del exponente, más lo que va encima
// del mundo en el viaje de 10⁰ a 10⁹ (la Luna de verdad, el brillo de la ciudad, «tú estás aquí», los planetas en el hueco
// de la Luna, la cinta de costurera y las Tierras que caen en el Sol).
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { crearMundo, camara, estadoMundo, aPant, ... } from '/atomo/plato/kits/ep03-cosmos.js';
//   const P = await crearPlato({ ..., alfa: true });                  // el plató, encima del mundo
//   const mundo = crearMundo(document.getElementById('escena'), { captura: P.captura });
//   function dibujar(t) { const C = camara(zr); mundo.dibujar(estadoMundo(C, n, { ... })); ...; P.render(n, { fondo: false }); }
//
// UNIDADES. Todo el mundo va en metros, con el origen en la persona (x este, y norte), y se pasa a píxeles de diseño
// (1920 × 1080) con la escala del momento: 540 px son 10^z m (mpp = 10^z / 540 metros por píxel). Una cámara es
// C = { zr, z, mpp, ancla, centro }: el punto del mundo `centro` cae en el píxel `ancla`; zr es el exponente de la regla
// y z el de la cámara (zCam(zr): no siempre son iguales). aPant(C, [x, y]) → píxel; aMundo(C, [px, py]) → metros.
//
// LA CÁMARA (la de cosmos-plastilina-adulta, en función del exponente)
//  · zCam(zr): el zoom de la cámara para la regla en zr (el de cosmos: se acerca un poco en el sistema solar y al final
//    la galaxia entera cabe en el plano).
//  · centroCam(z), anclaCam(z): el centro y su píxel (de la persona a la Tierra; del Sol desde z ≈ 8,2; de la galaxia
//    desde z ≈ 19). solMundo(z): el Sol, que está «al lado» de la Tierra (1,49e9 m) hasta z = 9 y se aleja hasta su sitio
//    (1 UA) en z = 11,3, como en cosmos. aTierra(z): esa distancia.
//  · camara(zr, { hueco: false }) → C. Con hueco: true, la de ep3-tierra: entre 10⁷ y 10⁹ la Tierra se va a la izquierda
//    y la cámara se queda en z = HUECO.z (8,25) con la regla en 10⁸, para que quepa el hueco de la Luna (la Tierra en
//    HUECO.tierra = [185, 450] px y la Luna 1.231 px a su derecha); en 7 y en 9 es la de cosmos, idéntica.
//  · camaraPorTierra(z, [px, py], zr = z) → C con la Tierra en ese píxel (cualquier encuadre se puede escribir así).
//    tierraPx(C): dónde cae la Tierra (nosotros). mezclarCamaras(A, B, u): z lineal y la Tierra en pantalla lineal (para
//    ir de un encuadre propio a otro sin que el mundo dé bandazos; en u = 0 es A y en u = 1 es B, exactas).
//  · Fotogramas fijados: camara(0) = el plató de cosmos (la persona en 612, 585); camara(7) = la Tierra entera centrada
//    en (820, 500) con radio 344 px; camara(9) = el Sol de crearMundo en (721, 470) con radio 376 px y la Tierra como un
//    punto en FINAL_TIERRA.tierra (el último fotograma de ep3-tierra y el primero de ep3-sol).
//
// EL ESTADO DEL MUNDO
//  · estadoMundo(C, n, opciones) → est para mundo.dibujar(est) (n: el número de fotograma, que da el hervor). Opciones:
//      luna: 1 (peso de la Luna; con 0 no está) · aqui: 0 (la marca ámbar de «dónde estamos» en la galaxia, 0…1) ·
//      ins (la mirilla con la foto del plató, como en cosmos: { c, s, a, m }) · somA: [x, y, radio, fuerza] (sombra de
//      Atom) · somR: [x0, y0, x1, y1, fuerza, desenfoque] (sombra de la regla; por defecto la del borde derecho) ·
//      tilt: null (por defecto, el basculante de cosmos en las vistas del suelo) · capas: { uSol: [...], ... } (pisa lo
//      que se quiera).
//    LA LUNA va a su distancia real del apogeo (MUNDO.LUNA, 405.500 km de centro a centro), al este de la Tierra, para
//    cualquier z: a 10⁸ (con la cámara en HUECO.z) queda a 1.231 px; a 10⁹, a 219 px de la Tierra (casi un punto).
//  · fotoMundo(mundo, est) → lienzo con el mundo dibujado (para las fotos de lo quieto: la ciudad a 10⁴, la galaxia a
//    10²¹…). Para que lo quieto siga «hirviendo» como el stop-motion, haz 3 fotos con n distintos y ve alternándolas
//    (ep3-tierra lo hace así en la Tierra entera, el hueco y el Sol).
//  · varianteMundo(z): 'cerca' · 'lejos' · 'sol' · 'sistema' · 'espacio' (el sombreador que toca a esa escala).
//
// ENCIMA DEL MUNDO (2D, en un lienzo entre el mundo y el plató; g con la transformación de 1920 × 1080)
//  · brilloCiudad(g, C, k, { radioMin: 9, fuerza: 1 }): el halo cálido sobre la ciudad (centro MUNDO.CIUDAD, radio
//    MUNDO.R_CIUDAD), que se enciende con k (0…1). A 10⁴ cubre la ciudad entera con un resplandor ámbar y un borde
//    suave; de lejos no baja de radioMin px (a 10⁷ es un punto cálido en el centro de la Tierra).
//  · tierrasQueCaen(g, sprite, { t, gotas, sol: [x, y, R], rTierra, fuga }): las Tierras que caen en el Sol «como gotas
//    en una pecera», vistas desde arriba: cada una baja hacia el Sol (se aleja de la cámara: encoge y converge hacia
//    `fuga`, por defecto el centro del Sol) hasta su tamaño real (rTierra px), se funde (se aplasta y se vuelve ámbar)
//    y deja una onda que se abre sobre la superficie (una elipse, según la curvatura del Sol). gotasTierras({ t0, t1, n,
//    semilla, acelera }) da el calendario (cada vez más seguidas y más pequeñas). sprite: fotoTierra(...) o cualquier
//    lienzo redondo (el globo con repetición: una sola foto, n gotas).
//  · fotoTierra(mundo, n) → lienzo de 2·(R + borde) px con la Tierra entera del mundo (la de 10⁷, con continentes, nubes
//    y atmósfera) recortada en redondo: la misma Tierra que se acaba de ver.
//
// TIPOS DE PIEZA (plató de plastilina-adulta.js con tiposExtra: tiposCosmos(nombres?))
//  · 'planeta' · planeta(P, i, { pos, escala, rot, cual: 0…7 | 'mercurio'…'neptuno' })
//      Un planeta de arcilla, esfera de radio 1 (unidades locales) con su color y su relieve: 0 Mercurio (gris pardo con
//      cráteres), 1 Venus (crema con remolinos de nube), 2 la Tierra (océano, tierras ocres y verdes, nubes), 3 Marte
//      (óxido con manchas oscuras y casquete blanco), 4 Júpiter (bandas crema, ocre y pardas con remolinos y la Gran
//      Mancha Roja), 5 Saturno (mantequilla con bandas suaves; sin anillos), 6 Urano (turquesa pálido, casi liso),
//      7 Neptuno (azul hondo con una mancha oscura y dos nubes blancas). El polo norte en +y; la cara mira a +z.
//  · 'saturno' · saturno(P, i, { pos, escala, rot, anillos: 1 })
//      Saturno con sus anillos (la variante con anillos): los anillos C, B y A, con la división de Cassini, en el plano
//      xz local (hasta 2,27 radios). Para que no ensanchen una fila de planetas, ponlos MUY INCLINADOS con
//      rotAnillos(angulo, apertura): su eje mayor queda a `angulo` de la horizontal (70°: «\», de arriba a la izquierda
//      a abajo a la derecha) y se abren `apertura` (0,22: se ven como una elipse estrecha); así miden en horizontal ~0,9
//      radios a cada lado (no más que el planeta) y en vertical ~2,1. anillos: 0 = sin anillos (como 'planeta' 5).
//  · 'cinta' · cinta(P, i, { desde, hasta, alto, z, marcas, extension })
//      Cinta de costurera de tela crema con el canto cosido, marcas negras (una corta cada intervalo, larga cada cinco)
//      y puntas de latón en los dos extremos. Se tiende recta de `desde` a `hasta` (px de diseño; la cara mira a la
//      cámara): extension (0…1) es lo que lleva tendido (la punta de latón avanza y la cinta sale detrás); alto: su ancho
//      en px; marcas: cuántos intervalos caben entre desde y hasta (ep3-tierra: 40, uno cada 10.000 km); z: el plano
//      del plató (por defecto 1,5, delante del mundo).
//  · enPlato(P, sx, sy, rpx, z = 1.5) → { pos, escala } para poner una pieza de radio local 1 con su centro en el píxel
//    (sx, sy) y rpx px de radio (en el plano z del plató). Así se pone cualquier pieza encima del mundo.
//  · fotoPieza(P, poner, { rect, n }) → lienzo con lo que ponga `poner()` (P.pieza…), sobre transparente, sin viñeta ni
//    grano, recortado a rect = [x0, y0, x1, y1] px de diseño: los planetas de ep3-tierra son fotos así (sprites), hechas
//    al cargar, que la escena mueve y escala en 2D.
//
// LOS PLANETAS EN EL HUECO (frase 56, «todos los demás planetas caben justo en el hueco»)
//  · PLANETAS: los siete (sin la Tierra), con sus diámetros medios (m): suman 380.010 km. MUNDO.HUECO = 397.392 km de
//    superficie a superficie en el apogeo: sobran 17.382 km («un pelo»).
//  · filaPlanetas(C) → { tierra, luna (px y radio), desde, hasta (los bordes del hueco, px), sobra: [x0, x1] px (el
//    pelo), planetas: [{ nombre, cual, x, y, r }] } con los planetas a escala real, en fila y tocándose, desde la
//    superficie de la Tierra hacia la Luna, centrados en la línea Tierra–Luna. Con camara(8, { hueco: true }): la Tierra
//    en (185, 450) de radio 19 px, Júpiter de 212 px de radio, la Luna en (1.416, 450) de 5 px y el pelo de 53 px.
//
// «TÚ ESTÁS AQUÍ»
//  · aqui(P, i, C, { largo: 120, k: 1, desdeArriba: 10 }): la flecha del kit (pieza 'flecha' de plastilina-adulta,
//    i es su índice) apuntando hacia abajo, con la punta sobre nosotros (aPant(C, [0, 0])); largo en px (encógela con el
//    zoom: largoAqui(zr)); k: aparición (0…1, crece desde la punta).
//
// COSTE (este servidor compartido, carga 4–6): el mundo, 1,4–2,3 s por fotograma (pasada A: sol ~0,9 s, lejos ~1,7 s);
// con Atom y la regla, 3–3,6 s. Una foto del mundo cuesta lo mismo una vez. Planeta suelto llenando ~400 px: ~1 s.
// Cinta tendida de 1.200 px: ~0,4 s. Lo 2D (brillo, gotas, sprites), unos milisegundos.
//
// CONGELADO el 21-10-2026 con su hoja de prueba (escenas/ep03-cosmos-hoja.html).
import * as THREE from 'three';
import { crearMundo as crearMundoKit } from '/atomo/plato/kits/plastilina-cosmos-adulta.js';

const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const mix = (a, b, x) => a + (b - a) * x;
const prog = (x, a, b) => cl((x - a) / (b - a));
const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };
const eoc = (x) => 1 - Math.pow(1 - x, 3);
function semillero(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const azar = (n, k) => { const r = semillero((n + 1) * 7919 + k * 104729); r(); return r(); };
const fr = (x) => x - Math.floor(x);

export const crearMundo = crearMundoKit;

// ---------------------------------------------------------------- medidas (m)
export const MUNDO = {
  R_TIERRA: 6.371e6, R_SOL: 6.96e8, R_LUNA: 1.7374e6, UA: 1.496e11, AL: 9.461e15, R_GAL: 5e20,
  LUNA: 4.055e8,                       // Tierra–Luna en el apogeo, de centro a centro
  HUECO: 4.055e8 - 6.371e6 - 1.7374e6, // de superficie a superficie: 397.392 km
  CIUDAD: [3500, 2500], R_CIUDAD: 9000, // la ciudad del mundo (centro y radio, m)
  PX: 540,                             // 540 px = 10^z m
};
// los otros siete planetas, con sus diámetros medios (m); cual: el índice de color de la pieza
export const PLANETAS = [
  { nombre: 'mercurio', cual: 0, d: 4.879e6 }, { nombre: 'venus', cual: 1, d: 12.104e6 }, { nombre: 'marte', cual: 3, d: 6.779e6 },
  { nombre: 'jupiter', cual: 4, d: 139.82e6 }, { nombre: 'saturno', cual: 5, d: 116.46e6, anillos: true },
  { nombre: 'urano', cual: 6, d: 50.724e6 }, { nombre: 'neptuno', cual: 7, d: 49.244e6 },
];
export const CUAL = { mercurio: 0, venus: 1, tierra: 2, marte: 3, jupiter: 4, saturno: 5, urano: 6, neptuno: 7 };

// ---------------------------------------------------------------- la cámara de cosmos-plastilina-adulta
export const zCam = (zr) => zr + 0.12 * ss(0.4, 1.0, zr) * (1 - ss(4.5, 6.0, zr)) - 0.42 * ss(11.9, 12.7, zr) * (1 - ss(13.6, 14.6, zr)) - 0.19 * ss(19, 21, zr);
const FI_T = -0.9378;                                        // la Tierra en su órbita (elipse inclinada)
export const aTierra = (z) => Math.pow(10, mix(Math.log10(1.49e9), Math.log10(MUNDO.UA), ss(9.0, 11.3, z)));
export const solMundo = (z) => { const a = aTierra(z); return [-a * Math.cos(FI_T), -0.45 * a * Math.sin(FI_T)]; };
const GAL_DESDE_SOL = [-0.328 * MUNDO.R_GAL, 0.330 * MUNDO.R_GAL];   // el centro de la galaxia visto desde el Sol
export function centroCam(z) {
  const S = solMundo(z);
  const w1 = ss(8.2, 9.05, z), w2 = ss(19.2, 20.8, z);
  const c = [S[0] * w1, S[1] * w1];
  return [mix(c[0], S[0] + GAL_DESDE_SOL[0], w2), mix(c[1], S[1] + GAL_DESDE_SOL[1], w2)];
}
export function anclaCam(z) {
  let x = mix(612, 820, ss(0.5, 2.6, z)), y = mix(585, 500, ss(0.5, 2.6, z));
  x = mix(x, 720, ss(8.2, 9.05, z)); y = mix(y, 470, ss(8.2, 9.05, z));
  x = mix(x, 800, ss(19.2, 20.8, z)); y = mix(y, 480, ss(19.2, 20.8, z));
  return [x, y];
}
export const aPant = (C, w) => [C.ancla[0] + (w[0] - C.centro[0]) / C.mpp, C.ancla[1] - (w[1] - C.centro[1]) / C.mpp];
export const aMundo = (C, p) => [C.centro[0] + (p[0] - C.ancla[0]) * C.mpp, C.centro[1] - (p[1] - C.ancla[1]) * C.mpp];
export const tierraPx = (C) => aPant(C, [0, 0]);
const camCosmos = (zr) => { const z = zCam(zr); return { zr, z, mpp: Math.pow(10, z) / MUNDO.PX, ancla: anclaCam(z), centro: centroCam(z) }; };
export function camaraPorTierra(z, px, zr = z) { return { zr, z, mpp: Math.pow(10, z) / MUNDO.PX, ancla: [px[0], px[1]], centro: [0, 0] }; }
export function mezclarCamaras(A, B, u) {
  if (u <= 0) return A;
  if (u >= 1) return B;
  const ta = tierraPx(A), tb = tierraPx(B);
  return camaraPorTierra(mix(A.z, B.z, u), [mix(ta[0], tb[0], u), mix(ta[1], tb[1], u)], mix(A.zr, B.zr, u));
}
// el encuadre del hueco de la Luna (ep3-tierra, frase 56): la Tierra a la izquierda y la Luna a 1.231 px a su derecha
export const HUECO = { z: 8.25, tierra: [185, 450] };
export function camara(zr, { hueco = false } = {}) {
  if (!hueco || zr <= 7 || zr >= 9) return camCosmos(zr);
  const C7 = camCosmos(7), C9 = camCosmos(9);
  if (zr <= 8) {
    const u = zr - 7, t7 = tierraPx(C7);
    return camaraPorTierra(mix(7, HUECO.z, u), [mix(t7[0], HUECO.tierra[0], u), mix(t7[1], HUECO.tierra[1], u)], zr);
  }
  const u = zr - 8, t9 = tierraPx(C9);
  return camaraPorTierra(mix(HUECO.z, C9.z, u), [mix(HUECO.tierra[0], t9[0], u), mix(HUECO.tierra[1], t9[1], u)], zr);
}
// el último fotograma de ep3-tierra (el primero de ep3-sol): la cámara de cosmos en 10⁹
export const FINAL_TIERRA = (() => { const C = camCosmos(9); return { C, tierra: tierraPx(C), sol: [...aPant(C, solMundo(9)), MUNDO.R_SOL / C.mpp] }; })();
export const lunaMundo = () => [MUNDO.LUNA, 0];
export const varianteMundo = (z) => (z < 3.55 ? 'cerca' : z < 7.6 ? 'lejos' : z < 11.6 ? 'sol' : z < 16.9 ? 'sistema' : 'espacio');

// ---------------------------------------------------------------- el estado del mundo (como estadoMundo de cosmos)
export function estadoMundo(C, n, { luna = 1, aqui = 0, ins = null, somA = null, somR = [1548, 240, 1840, 905, 0.38, 34], tilt = null, capas = {} } = {}) {
  const { z, mpp } = C;
  const nos = aPant(C, [0, 0]);
  const Rpx = MUNDO.R_TIERRA / mpp;
  // octavas de las huellas de la arcilla: pegadas al mundo, de unos 80 px
  const L0 = Math.floor(z), f = z - L0;
  const mundoEn = [C.centro[0] + (960 - C.ancla[0]) * mpp, C.centro[1] + (C.ancla[1] - 540) * mpp];
  const lp = [0, 1].map((i) => {
    const u = 0.148 * Math.pow(10, L0 + i);
    return [fr(mundoEn[0] / u / 1000) * 1000, fr(mundoEn[1] / u / 1000) * 1000, mpp / u, i ? f : 1 - f];
  });
  const pesoCelda = (cpx) => ss(8, 30, cpx);
  const estr = [0, 1, 2].map((i) => {
    const L = L0 - 1 + i, Cl = 70 * Math.pow(10, L) / 540;
    const w = pesoCelda(Cl / mpp) * ss(6.2, 6.8, z) * (1 - ss(18.6, 19.6, z));
    return [fr(C.centro[0] / Cl / 1000) * 1000, fr(C.centro[1] / Cl / 1000) * 1000, mpp / Cl, w];
  });
  const estrG = [0, 1].map((i) => {
    const L = L0 + i, Cl = 70 * Math.pow(10, L) / 540;
    return [0, 0, mpp / Cl, pesoCelda(Cl / mpp) * ss(18.4, 19.4, z)];
  });
  const S = solMundo(z), sP = aPant(C, S);
  const G = [S[0] + GAL_DESDE_SOL[0], S[1] + GAL_DESDE_SOL[1]], gP = aPant(C, G);
  const variante = varianteMundo(z);
  // la Luna de verdad: al este, a la distancia del apogeo
  const lP = aPant(C, lunaMundo()), rL = MUNDO.R_LUNA / mpp;
  const fuera = lP[0] < -60 || lP[0] > 1980 || lP[1] < -60 || lP[1] > 1140;
  const est = {
    n, z, mpp, variante, boil: [1.3 + (azar(n, 4) - 0.5) * 0.5, 0.7 + (azar(n, 5) - 0.5) * 0.5, 2.1 + (azar(n, 6) - 0.5) * 0.5],
    flicker: 1 + (azar(n, 3) - 0.5) * 0.03,
    suelo: [nos[0], nos[1], Rpx, 0], kh: Math.min(60, 0.55 * Math.pow(10, 0.42 * Math.max(z - 2.5, 0)) * (1 - 0.2 * Math.exp(-Math.pow((z - 5.2) / 0.7, 2)))), tablero: -Rpx, ancla: C.ancla,
    luz: [-0.45, 0.55, 0.7], lp, estr, estrG,
    capas: {
      uLuna: [lP[0], lP[1], rL, fuera ? 0 : luna * ss(0.4, 1.2, rL)],
      uSol: [sP[0], sP[1], MUNDO.R_SOL / mpp, variante === 'espacio' ? 1 - 0.45 * ss(19.6, 20.4, z) : ss(7.9, 8.3, z)],
      uSis: [sP[0], sP[1], aTierra(z) / mpp, ss(9.3, 10.0, z) * (1 - ss(15.6, 16.4, z))],
      uVec: [sP[0], sP[1], MUNDO.AL / mpp, ss(15.8, 16.4, z) * (1 - ss(17.9, 18.5, z))],
      uGal: [gP[0], gP[1], MUNDO.R_GAL / mpp, ss(19.55, 20.2, z)],
      uAqui: [sP[0], sP[1], aqui, ss(14.0, 14.8, z) * (1 - ss(16.2, 16.9, z))],
      ...capas,
    },
    C, sP, lunaPx: [lP[0], lP[1], rL],
    // maqueta de macro: nítido en la franja del zoom, borroso arriba y abajo (solo mirando al suelo)
    tilt: tilt ?? [C.ancla[1], 150, 13, (1 - ss(5.3, 6.1, z)) * ss(0.25, 0.9, C.zr ?? z)],
  };
  if (ins) est.ins = ins;
  if (somA) est.somA = somA;
  if (somR) est.somR = somR;
  return est;
}
// una foto del mundo (el lienzo del mundo copiado)
export function fotoMundo(mundo, est) {
  mundo.dibujar(est);
  const c = document.createElement('canvas'); c.width = mundo.lienzo.width; c.height = mundo.lienzo.height;
  c.getContext('2d').drawImage(mundo.lienzo, 0, 0);
  return c;
}

// ---------------------------------------------------------------- el brillo de la ciudad
export function brilloCiudad(g, C, k, { radioMin = 9, fuerza = 1 } = {}) {
  if (k <= 0.002) return;
  const c = aPant(C, MUNDO.CIUDAD);
  const Rv = MUNDO.R_CIUDAD / C.mpp, R = Math.max(Rv, radioMin);
  // de lejos (un punto) es una cuenta de luz cálida con su resplandor; de cerca, la ciudad entera encendida
  const punto = 1 - ss(radioMin * 1.5, radioMin * 6, Rv);
  const a = cl(k * fuerza);
  g.save();
  // 1) la ciudad se calienta (overlay ámbar): sobre el suelo claro se lee como luz, no como velo
  g.globalCompositeOperation = 'overlay';
  let h = g.createRadialGradient(c[0], c[1], 0, c[0], c[1], R * 1.15);
  h.addColorStop(0, `rgba(255,150,50,${0.55 * a})`); h.addColorStop(0.7, `rgba(255,140,50,${0.4 * a})`); h.addColorStop(1, 'rgba(255,140,50,0)');
  g.fillStyle = h; g.beginPath(); g.arc(c[0], c[1], R * 1.15, 0, 2 * Math.PI); g.fill();
  // 2) luz: un resplandor que aclara (screen), más concentrado de lejos
  g.globalCompositeOperation = 'screen';
  const Rg = R * (1.35 + 1.4 * punto);
  h = g.createRadialGradient(c[0], c[1], 0, c[0], c[1], Rg);
  h.addColorStop(0, `rgba(255,205,140,${(0.42 + 0.5 * punto) * a})`);
  h.addColorStop(0.3, `rgba(250,170,90,${(0.3 + 0.25 * punto) * a})`);
  h.addColorStop(0.62, `rgba(230,140,60,${(0.14 + 0.1 * punto) * a})`);
  h.addColorStop(1, 'rgba(200,110,50,0)');
  g.fillStyle = h; g.beginPath(); g.arc(c[0], c[1], Rg, 0, 2 * Math.PI); g.fill();
  // 3) un borde de luz cálido que marca la ciudad (solo cuando se ve grande)
  const kb = ss(40, 160, Rv) * a;
  if (kb > 0.01) {
    g.lineWidth = Math.max(3, R * 0.035);
    g.strokeStyle = `rgba(255,200,120,${0.4 * kb})`;
    g.filter = `blur(${Math.max(2, R * 0.025).toFixed(1)}px)`;
    g.beginPath(); g.arc(c[0], c[1], R * 0.97, 0, 2 * Math.PI); g.stroke();
    g.filter = 'none';
  }
  g.restore();
}

// ---------------------------------------------------------------- las Tierras que caen en el Sol
// calendario: n gotas entre t0 y t1, cada vez más seguidas, más pequeñas y más rápidas; impacto en el disco unidad
export function gotasTierras({ t0, t1, n = 36, semilla = 7, acelera = 2.0 } = {}) {
  const r = semillero(semilla * 7919 + 13);
  const g = [];
  for (let i = 0; i < n; i++) {
    const u = i / Math.max(1, n - 1);
    const t = t0 + (t1 - t0) * Math.pow(u, 1 / acelera);
    // reparto uniforme en el disco, sin el borde (y las primeras, hacia el centro y arriba, que se lean)
    const a = r() * 2 * Math.PI, rr = Math.sqrt(r()) * (i < 3 ? 0.55 : 0.88);
    const imp = i < 3 ? [[-0.22, -0.18], [0.3, 0.1], [-0.05, 0.36]][i] : [rr * Math.cos(a), rr * Math.sin(a)];
    const dur = mix(1.05, 0.42, Math.pow(u, 0.7)) * (0.9 + 0.2 * r());
    const k0 = mix(16, 6, Math.pow(u, 0.6)) * (0.85 + 0.3 * r());
    g.push({ t, dur, imp, k0, giro: (r() - 0.5) * 0.6 });
  }
  return g;
}
// dibuja las gotas en el instante t. sol: [x, y, R] en px; rTierra: radio real de la Tierra en px; fuga: el punto al que
// convergen al alejarse (por defecto el centro del Sol). Devuelve cuántas se han fundido ya.
export function tierrasQueCaen(g, sprite, { t, gotas, sol, rTierra = 4, fuga = null, ondas = 1 } = {}) {
  const [cx, cy, R] = sol;
  const V = fuga ?? [cx, cy];
  let fundidas = 0;
  // primero las ondas (sobre la superficie), luego las gotas (encima)
  g.save();
  g.globalCompositeOperation = 'screen';
  for (const d of gotas) {
    const q = t - (d.t + d.dur);
    if (q < 0) continue;
    fundidas++;
    if (q > 1.1 || ondas <= 0) continue;
    const ix = cx + d.imp[0] * R, iy = cy - d.imp[1] * R;
    const rr2 = d.imp[0] * d.imp[0] + d.imp[1] * d.imp[1];
    const mu = Math.sqrt(Math.max(0.08, 1 - rr2));               // escorzo cerca del limbo
    const ang = Math.atan2(-d.imp[1], d.imp[0]);
    // destello cálido al tocar
    const fl = Math.exp(-q / 0.12);
    if (fl > 0.02) {
      const h = g.createRadialGradient(ix, iy, 0, ix, iy, rTierra * 6);
      h.addColorStop(0, `rgba(255,232,185,${0.8 * fl * ondas})`); h.addColorStop(0.4, `rgba(255,190,110,${0.35 * fl * ondas})`); h.addColorStop(1, 'rgba(255,170,90,0)');
      g.fillStyle = h; g.beginPath(); g.arc(ix, iy, rTierra * 6, 0, 2 * Math.PI); g.fill();
    }
    // dos ondas que se abren y se apagan: cresta clara con su seno oscuro por dentro
    for (const [ret, kk] of [[0, 1], [0.18, 0.55]]) {
      const qq = q - ret;
      if (qq <= 0) continue;
      const rad = rTierra * (1.3 + 10 * eoc(Math.min(1, qq / 1.0)));
      const al = kk * (1 - ss(0.1, 1.0, qq)) * ondas;
      if (al < 0.01) continue;
      g.save();
      g.translate(ix, iy); g.rotate(ang); g.scale(mu, 1);
      const lw = Math.max(1.6, rTierra * 0.75) / Math.sqrt(mu);
      g.globalCompositeOperation = 'multiply';
      g.lineWidth = lw * 1.2;
      g.strokeStyle = `rgba(150,70,30,${0.5 * al})`;
      g.beginPath(); g.arc(0, 0, Math.max(0.5, rad - lw * 1.1), 0, 2 * Math.PI); g.stroke();
      g.globalCompositeOperation = 'screen';
      g.lineWidth = lw;
      g.strokeStyle = `rgba(255,222,165,${0.75 * al})`;
      g.beginPath(); g.arc(0, 0, rad, 0, 2 * Math.PI); g.stroke();
      g.restore();
    }
  }
  g.restore();
  // las gotas: de lejos (cerca de la cámara, grandes) hacia la superficie
  const vivas = gotas.filter((d) => t >= d.t && t < d.t + d.dur + 0.14).sort((a, b) => (t - a.t) / a.dur - (t - b.t) / b.dur);
  for (const d of vivas) {
    const p = cl((t - d.t) / d.dur);
    const ix = cx + d.imp[0] * R, iy = cy - d.imp[1] * R;
    // profundidad: Z va de Z1/k0 a Z1 acelerando (cae): tamaño aparente k = Z1/Z
    const k = 1 / mix(1 / d.k0, 1, p * p);
    const x = V[0] + (ix - V[0]) * k, y = V[1] + (iy - V[1]) * k;
    let r = rTierra * k;
    let a = 1, sq = 1;
    const m = (t - (d.t + d.dur)) / 0.14;            // se funde: se aplasta, se aclara y desaparece
    if (m > 0) { a = 1 - m; sq = 1 - 0.6 * m; r *= 1 + 0.4 * m; }
    if (r < 0.4 || a <= 0) continue;
    g.save();
    g.globalAlpha = a * ss(0, 0.08, p + 0.001);
    g.translate(x, y); g.rotate(d.giro);
    g.scale(1, sq);
    g.drawImage(sprite, -r, -r, 2 * r, 2 * r);
    if (m > 0) {
      g.globalCompositeOperation = 'source-atop';
      g.fillStyle = `rgba(230,140,50,${0.7 * m})`;
      g.fillRect(-r, -r, 2 * r, 2 * r);
    }
    g.restore();
  }
  return fundidas;
}
// la Tierra entera del mundo (a 10⁷), recortada en redondo con su atmósfera: el sprite de las gotas
export function fotoTierra(mundo, n = 0, { borde = 0.06 } = {}) {
  const C = camaraPorTierra(7, [960, 540]);
  const est = estadoMundo(C, n, { luna: 0, somR: null, tilt: [540, 200, 0, 0] });
  mundo.dibujar(est);
  const R = MUNDO.R_TIERRA / C.mpp, Rb = R * (1 + borde);
  const k = mundo.lienzo.width / 1920;
  const lado = Math.ceil(2 * Rb * k);
  const c = document.createElement('canvas'); c.width = c.height = lado;
  const g = c.getContext('2d');
  g.beginPath(); g.arc(lado / 2, lado / 2, lado / 2, 0, 2 * Math.PI); g.clip();
  g.drawImage(mundo.lienzo, (960 - Rb) * k, (540 - Rb) * k, 2 * Rb * k, 2 * Rb * k, 0, 0, lado, lado);
  // el borde de la atmósfera se funde con lo que haya debajo
  g.globalCompositeOperation = 'destination-in';
  const h = g.createRadialGradient(lado / 2, lado / 2, lado / 2 * (R / Rb) * 0.97, lado / 2, lado / 2, lado / 2);
  h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = h; g.fillRect(0, 0, lado, lado);
  return c;
}

// ---------------------------------------------------------------- piezas sobre el mundo
// pos/escala para que una pieza de radio local 1 tenga su centro en el píxel (sx, sy) y mida rpx de radio
export function enPlato(P, sx, sy, rpx, z = 1.5) {
  const pos = P.punto(sx, sy, z);
  const a = P.proyectar(pos), b = P.proyectar([pos[0] + 1, pos[1], pos[2]]);
  const pxU = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return { pos, escala: rpx / pxU, pxU };
}
// una foto (sprite) de lo que ponga poner(), sin fondo, sin viñeta ni grano, recortada a rect (px de diseño)
export function fotoPieza(P, poner, { rect = [0, 0, 1920, 1080], n = 0 } = {}) {
  P.fotograma(n / 12); P.limpiar();
  poner();
  const post = P.U.uPost.value; P.U.uPost.value = 0;
  P.render(n, { fondo: false });
  P.U.uPost.value = post;
  const lz = P.renderer.domElement, k = lz.width / 1920;
  const [x0, y0, x1, y1] = rect.map((v) => Math.round(v));
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round((x1 - x0) * k)); c.height = Math.max(1, Math.round((y1 - y0) * k));
  c.getContext('2d').drawImage(lz, x0 * k, y0 * k, (x1 - x0) * k, (y1 - y0) * k, 0, 0, c.width, c.height);
  return c;
}
// la flecha de «tú estás aquí»: apunta hacia abajo con la punta sobre nosotros
export const largoAqui = (zr, l1 = 130) => l1 * Math.pow(10, -0.16 * Math.max(zr - 1, 0));
export function aqui(P, i, C, { largo = 120, k = 1, desdeArriba = 6, toque = false } = {}) {
  if (k <= 0.005 || largo < 0.5) { P.pieza(i, { escala: 0 }); return; }
  const tip = tierraPx(C);
  // la flecha del kit: punta en x local 0,42, base en −0,36 (0,78 de largo); girada −90°, la punta abajo
  const L = largo * k;
  const cy = tip[1] - desdeArriba * Math.min(1, largo / 60) - (0.42 / 0.78) * L;
  const e = enPlato(P, tip[0], cy, 1, 1.6);
  P.pieza(i, { pos: e.pos, escala: (L / 0.78) / e.pxU, rot: [0.25, 0, -Math.PI / 2], toque });
}
// Saturno: rot para que los anillos tengan su eje mayor a `angulo` (rad, de la horizontal; positivo = «\») y se abran
// `apertura` (seno del ángulo de apertura) vistos desde la cámara del plató
export function rotAnillos(P, angulo = 70 * Math.PI / 180, apertura = 0.22) {
  // ejes de la cámara (aprox.: de cámara a mira)
  const c = P.punto(960, 540, 0), d = P.punto(1060, 540, 0), e = P.punto(960, 440, 0);
  const der = new THREE.Vector3(d[0] - c[0], d[1] - c[1], d[2] - c[2]).normalize();
  const arr = new THREE.Vector3(e[0] - c[0], e[1] - c[1], e[2] - c[2]).normalize();
  const hacia = new THREE.Vector3().crossVectors(der, arr).normalize();      // hacia la cámara
  // eje mayor en pantalla: (cos, −sin) con y hacia arriba para «\»
  const mayor = der.clone().multiplyScalar(Math.cos(angulo)).addScaledVector(arr, -Math.sin(angulo)).normalize();
  const perp = new THREE.Vector3().crossVectors(mayor, hacia).normalize();   // en el plano de la pantalla (la cara que mira a la luz)
  const ab = Math.asin(cl(apertura, 0, 1));
  const normal = perp.clone().multiplyScalar(Math.cos(ab)).addScaledVector(hacia, Math.sin(ab)).normalize();   // eje y local
  const x = mayor.clone();
  const z = new THREE.Vector3().crossVectors(x, normal).normalize();
  const m = new THREE.Matrix4().makeBasis(x, normal, z);
  const eu = new THREE.Euler().setFromRotationMatrix(m, 'YXZ');
  return [eu.x, eu.y, eu.z];
}

// ---------------------------------------------------------------- los planetas en fila (px)
export function filaPlanetas(C) {
  const T = tierraPx(C), L = aPant(C, lunaMundo());
  const rT = MUNDO.R_TIERRA / C.mpp, rL = MUNDO.R_LUNA / C.mpp;
  const dir = [L[0] - T[0], L[1] - T[1]], dl = Math.hypot(...dir), u = [dir[0] / dl, dir[1] / dl];
  let s = rT;
  const planetas = PLANETAS.map((p) => {
    const r = p.d / 2 / C.mpp;
    const c = s + r; s += 2 * r;
    return { ...p, x: T[0] + u[0] * c, y: T[1] + u[1] * c, r };
  });
  const sobra = [T[0] + u[0] * s, L[0] - u[0] * rL];
  return {
    tierra: [T[0], T[1], rT], luna: [L[0], L[1], rL], desde: [T[0] + u[0] * rT, T[1] + u[1] * rT], hasta: [L[0] - u[0] * rL, L[1] - u[1] * rL],
    sobra, planetas, u,
  };
}

// ---------------------------------------------------------------- tipos de pieza (GLSL)
const GLSL_PLANETA = /* glsl */`
#ifndef PLANETA_D
#define PLANETA_D 1
// relieve de cada planeta (altura sobre la esfera, en radios) y su color; n: dirección local (polo norte en +y)
float plRuido(vec3 p) { return vnoise(p) * 0.5 + vnoise(p * 2.03 + 7.1) * 0.3 + vnoise(p * 4.1 + 3.3) * 0.2; }
// cráteres: cuencos con reborde en celdas
float plCrateres(vec3 n, float esc) {
  vec3 p = n * esc;
  vec3 i = floor(p), f = fract(p);
  float h = 0.0;
  for (int k = 0; k < 8; k++) {
    vec3 o = vec3(float(k & 1), float((k >> 1) & 1), float((k >> 2) & 1));
    vec3 c = i + o;
    float hh = hash13(c);
    vec3 cc = o + 0.2 + 0.6 * vec3(hash13(c + 1.3), hash13(c + 2.7), hash13(c + 4.1));
    float r = 0.18 + 0.32 * hash13(c + 7.7);
    float d = length(f - cc) / r;
    h += step(hh, 0.55) * (-(1.0 - smoothstep(0.0, 0.85, d)) * 0.8 + exp(-pow((d - 1.0) * 3.5, 2.0)) * 0.45);
  }
  return h;
}
// bandas de Júpiter y Saturno: la latitud deformada por remolinos
float plLat(vec3 n, float k) { return n.y + 0.035 * k * (vnoise(n * 6.0) - 0.5) + 0.02 * k * sin(n.x * 9.0 + n.y * 14.0); }
float plAltura(vec3 n, float c) {
  if (c < 0.5) return 0.012 * plCrateres(n, 5.0) + 0.006 * plCrateres(n, 11.0);                       // Mercurio
  if (c < 1.5) return 0.004 * plRuido(n * 4.0 + vec3(0.0, n.y * 3.0, 0.0));                          // Venus
  if (c < 2.5) return 0.010 * smoothstep(0.52, 0.6, plRuido(n * 2.3 + 1.0));                          // la Tierra
  if (c < 3.5) return 0.006 * plCrateres(n, 6.0) + 0.006 * plRuido(n * 3.0);                         // Marte
  if (c < 5.5) { float l = plLat(n, c < 4.5 ? 1.0 : 0.5); return 0.005 * sin(l * (c < 4.5 ? 34.0 : 26.0)); }  // Júpiter, Saturno
  return 0.003 * sin(n.y * 18.0 + 2.0 * vnoise(n * 3.0));                                            // Urano, Neptuno
}
vec3 plColor(vec3 n, float c, out float bri) {
  bri = 0.8;
  float r = plRuido(n * 3.0);
  if (c < 0.5) return vec3(0.30, 0.28, 0.26) * (0.8 + 0.35 * r) - 0.05 * plCrateres(n, 5.0) * vec3(1.0);
  if (c < 1.5) { float sw = plRuido(vec3(n.x * 2.0 + 3.0 * n.y, n.y * 9.0, n.z * 2.0)); return mix(vec3(0.50, 0.40, 0.24), vec3(0.62, 0.55, 0.40), sw); }
  if (c < 2.5) {
    float l = smoothstep(0.52, 0.6, plRuido(n * 2.3 + 1.0));
    vec3 col = mix(vec3(0.03, 0.08, 0.17), mix(vec3(0.20, 0.17, 0.08), vec3(0.08, 0.11, 0.04), plRuido(n * 7.0)), l);
    float nube = smoothstep(0.58, 0.72, plRuido(vec3(n.x * 3.0, n.y * 7.0, n.z * 3.0) + 5.0));
    col = mix(col, vec3(0.62, 0.62, 0.60), nube * 0.9);
    return mix(col, vec3(0.66, 0.66, 0.64), smoothstep(0.86, 0.93, abs(n.y)));
  }
  if (c < 3.5) {
    vec3 col = mix(vec3(0.48, 0.17, 0.06), vec3(0.24, 0.09, 0.04), smoothstep(0.5, 0.7, plRuido(n * 2.6 + 2.0)));
    col *= 0.85 + 0.3 * plRuido(n * 9.0);
    return mix(col, vec3(0.64, 0.60, 0.54), smoothstep(0.84, 0.9, n.y));
  }
  if (c < 4.5) {
    float l = plLat(n, 1.0);
    float b = sin(l * 17.0 + 0.6);
    vec3 col = mix(vec3(0.46, 0.31, 0.18), vec3(0.64, 0.56, 0.42), smoothstep(-0.25, 0.25, b));
    col = mix(col, vec3(0.32, 0.17, 0.08), smoothstep(0.5, 0.9, sin(l * 8.5 - 0.9)) * 0.85);
    col *= 0.9 + 0.2 * plRuido(vec3(n.x * 4.0, l * 30.0, n.z * 4.0));
    // la Gran Mancha Roja: un óvalo terracota con un aro claro, a −22° de latitud
    vec2 gm = vec2(atan(n.x, n.z) - 0.35, (n.y + 0.37) * 1.9);
    float dm = length(gm / vec2(0.26, 0.13));
    col = mix(col, vec3(0.62, 0.55, 0.42), exp(-pow((dm - 1.15) * 3.0, 2.0)) * 0.6);
    col = mix(col, vec3(0.46, 0.14, 0.06), 1.0 - smoothstep(0.75, 1.0, dm));
    return col;
  }
  if (c < 5.5) {
    float l = plLat(n, 0.5);
    float b = sin(l * 13.0 + 1.0);
    vec3 col = mix(vec3(0.52, 0.42, 0.26), vec3(0.62, 0.55, 0.39), smoothstep(-0.4, 0.4, b));
    return col * (0.92 + 0.12 * plRuido(vec3(n.x * 3.0, l * 24.0, n.z * 3.0)));
  }
  if (c < 6.5) return vec3(0.33, 0.48, 0.50) * (0.94 + 0.08 * sin(n.y * 12.0)) * (0.95 + 0.08 * plRuido(n * 4.0));
  vec3 col = vec3(0.10, 0.17, 0.38) * (0.88 + 0.2 * plRuido(vec3(n.x * 3.0, n.y * 10.0, n.z * 3.0)));
  vec2 gm = vec2(atan(n.x, n.z) + 0.3, (n.y + 0.3) * 2.0);
  col = mix(col, vec3(0.04, 0.07, 0.17), 1.0 - smoothstep(0.7, 1.0, length(gm / vec2(0.22, 0.12))));
  float nube = exp(-pow((n.y + 0.08) * 22.0, 2.0)) * smoothstep(0.2, 0.5, sin(atan(n.x, n.z) * 2.0 + 0.5)) + exp(-pow((n.y - 0.42) * 26.0, 2.0)) * smoothstep(0.3, 0.6, sin(atan(n.x, n.z) * 3.0));
  return mix(col, vec3(0.60, 0.64, 0.68), clamp(nube, 0.0, 1.0) * 0.8);
}
// esfera con bultitos de arcilla en la silueta (fijos)
float plEsfera(vec3 q) { return length(q) - 1.0 - 0.006 * sin(q.x * 7.1 + 1.0) * sin(q.y * 6.3 + 2.0) * sin(q.z * 5.7); }
void plRelieve(vec3 q, float c) {
  vec3 n = normalize(q);
  vec3 t1 = normalize(cross(n, vec3(0.0001, 1.0, 0.0002))), t2 = cross(n, t1);
  float e = 0.01;
  float h0 = plAltura(n, c), h1 = plAltura(normalize(n + t1 * e), c), h2 = plAltura(normalize(n + t2 * e), c);
  gG = ((h1 - h0) * t1 + (h2 - h0) * t2) / e;
}
#endif
`;
const PLANETA = { radio: 1.06, glifos: [], glsl: GLSL_PLANETA + /* glsl */`
float pz_planeta(vec3 q, vec4 T, out float m) { m = 0.0; return plEsfera(q) * 0.95; }
float pzc_planeta(vec3 q, vec4 T) { return length(q) - 0.985; }
vec3 pzcol_planeta(vec3 q, vec4 T, float m) {
  vec3 n = normalize(q);
  float bri;
  vec3 c = plColor(n, T.y, bri);
  plRelieve(q, T.y);
  gBri = bri;
  return c;
}
` };
// los anillos de Saturno en el plano xz: C (1,24–1,53), B (1,53–1,95), Cassini (1,95–2,03), A (2,03–2,27)
const SATURNO = { radio: 2.32, glifos: [], glsl: GLSL_PLANETA + /* glsl */`
float stAnillo(vec3 q) {
  float r = length(q.xz);
  vec2 w = vec2(abs(r - 1.755) - 0.515, abs(q.y) - 0.012);
  float d = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.006;
  // la división de Cassini, un surco
  d = max(d, -(max(abs(r - 1.99) - 0.03, abs(q.y) - 0.03)));
  return d;
}
float pz_saturno(vec3 q, vec4 T, out float m) {
  float d = plEsfera(q) * 0.95;
  m = 0.0;
  if (T.y > 0.5) { float a = stAnillo(q); if (a < d) m = 1.0; d = min(d, a); }
  return d;
}
float pzc_saturno(vec3 q, vec4 T) {
  float d = length(q) - 0.985;
  if (T.y > 0.5) { float r = length(q.xz); d = min(d, max(abs(r - 1.755) - 0.5, abs(q.y) - 0.01)); }
  return d;
}
vec3 pzcol_saturno(vec3 q, vec4 T, float m) {
  if (m > 0.5) {
    float r = length(q.xz);
    float b = smoothstep(1.53, 1.6, r) * (1.0 - smoothstep(1.92, 1.95, r));     // B, el más claro
    float a = smoothstep(2.03, 2.06, r) * (1.0 - smoothstep(2.24, 2.27, r));    // A
    float cc = smoothstep(1.24, 1.3, r) * (1.0 - smoothstep(1.5, 1.53, r));     // C, oscuro
    float est = 0.88 + 0.14 * sin(r * 160.0) * sin(r * 37.0) + 0.06 * vnoise(vec3(r * 90.0, 0.0, 0.0));
    vec3 col = vec3(0.64, 0.56, 0.42) * b + vec3(0.54, 0.48, 0.37) * a + vec3(0.30, 0.26, 0.20) * cc;
    col = max(col, vec3(0.07, 0.06, 0.05));
    gBri = 1.0;
    return col * est;
  }
  vec3 n = normalize(q);
  float bri;
  vec3 c = plColor(n, 5.0, bri);
  plRelieve(q, 5.0);
  gBri = bri;
  return c;
}
` };
// la cinta de costurera: x local de −1 (punta de salida) a 1 (punta final); se ve hasta xf = −1 + 2·T.y; ancho = fract(T.z)
// (en unidades locales), marcas = floor(T.z) intervalos en toda la longitud
const CINTA = { radio: 1.04, glifos: [], glsl: /* glsl */`
float ciForma(vec3 q, vec4 T, float encoge) {
  float w = fract(T.z) * 0.5;
  float xf = -1.0 + 2.0 * T.y;
  float x0 = -1.0, x1 = xf;
  float cx = 0.5 * (x0 + x1), hx = max(0.5 * (x1 - x0), 0.0);
  // tela que ondula un poco (de cara a la cámara: la cara en +z)
  float ond = 0.12 * w * sin(q.x * 31.0 + 0.7) * sin(q.x * 7.0);
  vec3 p = vec3(q.x - cx, q.y, q.z - ond);
  float d = sdRoundBox(p, vec3(hx + 0.002, w - encoge, w * 0.07 + 0.0005), w * 0.05);
  // puntas de latón: una placa algo más gruesa en cada extremo
  float lp = w * 1.1;
  float p0 = sdRoundBox(vec3(q.x - (x0 + lp * 0.5), q.y, q.z - ond), vec3(lp * 0.5, w * 1.06 - encoge, w * 0.13), w * 0.06);
  float p1 = sdRoundBox(vec3(q.x - (x1 - lp * 0.5), q.y, q.z - ond), vec3(lp * 0.5, w * 1.06 - encoge, w * 0.13), w * 0.06);
  return min(d, min(p0, p1));
}
float pz_cinta(vec3 q, vec4 T, out float m) {
  m = 0.0;
  if (T.y < 0.001) return 1e3;
  float w = fract(T.z) * 0.5, xf = -1.0 + 2.0 * T.y, lp = w * 1.1;
  if (q.x < -1.0 + lp || q.x > xf - lp) m = 1.0;
  return ciForma(q, T, 0.0) * 0.9;
}
float pzc_cinta(vec3 q, vec4 T) { if (T.y < 0.001) return 1e3; return ciForma(q, T, 0.002); }
vec3 pzcol_cinta(vec3 q, vec4 T, float m) {
  float w = fract(T.z) * 0.5;
  if (m > 0.5) { gBri = 3.0; return C_BRASS * (0.9 + 0.2 * vnoise(q / w * 3.0)); }
  float y = q.y / w;                    // −1 … 1
  vec3 col = vec3(0.60, 0.53, 0.36) * (0.93 + 0.1 * vnoise(vec3(q.x / w * 1.5, y * 6.0, 1.0)));
  // trama de la tela
  col *= 0.96 + 0.04 * sin(q.x / w * 40.0) * sin(y * 30.0);
  // canto cosido: una línea fina oscura cerca de cada borde
  col *= 1.0 - 0.35 * (1.0 - smoothstep(0.03, 0.06, abs(abs(y) - 0.84)));
  // marcas desde el canto de arriba: cortas cada intervalo, largas cada cinco, y una media a la mitad
  float nm = floor(T.z);
  float u = (q.x + 1.0) * 0.5 * nm;
  float id = floor(u + 0.5);
  float dx = abs(u - id) * (2.0 / nm) / w;      // en anchos de cinta
  float largo = mod(id, 5.0) < 0.5 ? 1.15 : 0.55;
  float marca = (1.0 - smoothstep(0.09, 0.17, dx)) * step(0.72 - largo, y) * step(y, 0.72);
  float um = u * 2.0, idm = floor(um + 0.5);
  float dxm = abs(um - idm) * (1.0 / nm) / w;
  float media = (1.0 - smoothstep(0.08, 0.15, dxm)) * step(0.35, y) * step(y, 0.72) * step(0.5, mod(idm, 2.0));
  col = mix(col, vec3(0.03, 0.025, 0.02), max(marca, media * 0.8));
  gBri = 1.1;
  return col;
}
` };
export function tiposCosmos(nombres = null) {
  const todos = { planeta: PLANETA, saturno: SATURNO, cinta: CINTA };
  if (!nombres) return todos;
  return Object.fromEntries(nombres.map((k) => [k, todos[k]]));
}
const cualDe = (c) => (typeof c === 'string' ? CUAL[c] : c);
export function planeta(P, i, { pos, escala = 1, rot = [0, 0, 0], cual = 4, toque = false, huellaFija = null } = {}) {
  P.pieza(i, { pos, escala, rot, variante: cualDe(cual), toque, huellaFija });
}
export function saturno(P, i, { pos, escala = 1, rot = [0, 0, 0], anillos = 1, toque = false, huellaFija = null } = {}) {
  P.pieza(i, { pos, escala, rot, variante: anillos ? 1 : 0, toque, huellaFija });
}
// la cinta, tendida de desde a hasta (px de diseño)
export function cinta(P, i, { desde, hasta, alto = 12, z = 1.5, marcas = 40, extension = 1, toque = false } = {}) {
  if (extension <= 0.001) { P.pieza(i, { escala: 0 }); return; }
  const mid = [(desde[0] + hasta[0]) / 2, (desde[1] + hasta[1]) / 2];
  const largoPx = Math.hypot(hasta[0] - desde[0], hasta[1] - desde[1]);
  const e = enPlato(P, mid[0], mid[1], largoPx / 2, z);
  const ancho = cl(alto / (largoPx / 2), 0.0005, 0.999);
  const ang = Math.atan2(-(hasta[1] - desde[1]), hasta[0] - desde[0]);
  P.pieza(i, { pos: e.pos, escala: e.escala, rot: [0, 0, ang], variante: cl(extension), color: Math.round(marcas) + ancho, toque });
}
