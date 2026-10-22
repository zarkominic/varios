// KIT DEL EPISODIO 3 · «ADN» (kits/ep03-adn.js). Lo crea ep3-adn y, una vez entregado con su hoja de prueba
// (escenas/ep03-adn-hoja.html), queda CONGELADO: las escenas que lo usan no lo cambian. Si algo no basta, la escena lo
// resuelve por su cuenta (una pieza propia con tiposExtra, o 2D encima) y lo dice en su informe.
// Lo usan: ep3-adn (lo crea) y ep3-lectura (la doble hélice y sus peldaños).
//
// Son tipos de pieza para el plató de kits/plastilina-adulta.js (crearPlato con tiposExtra), con el mismo material,
// la misma luz y la misma paleta, y una función por pieza que la coloca y le pasa sus parámetros (como ep03-tocar.js):
//
//   import { crearPlato } from '/atomo/plato/kits/plastilina-adulta.js';
//   import { tiposAdn, celula, madeja, hilo, helice } from '/atomo/plato/kits/ep03-adn.js';
//   const P = await crearPlato({ piezas: ['celula', 'helice', 'reglaA', 'flecha'], tiposExtra: tiposAdn(['celula', 'helice']), ... });
//   function dibujar(t) { ...; P.limpiar(); helice(P, 1, { pos, escala, avance: ts }); P.render(n); }
//
// tiposAdn(nombres?) da los tipos para tiposExtra (todos, o solo los nombrados: así se compila menos). Cada función de
// pieza se llama como P.pieza, entre P.limpiar() y P.render(n), con el índice de la pieza en `piezas`, y acepta lo de
// P.pieza (pos, escala, rot [x, y, z] (euler YXZ), sq, toque, huellaFija) más lo suyo; devuelve los puntos del mundo
// que hacen falta para poner otras cosas (el centro del núcleo, la punta del hilo, el centro de un peldaño…). Las
// piezas no cambian de forma al moverlas: lo que se anima son sus parámetros (y pos, escala y rot).
//
// EL HILO DEL ADN es siempre el mismo material (AD_HILO: crema de marfil, con el retorcido de un hilo de dos cabos):
// la madeja, el hilo que se estira y las dos hebras de la doble hélice. Los peldaños llevan los colores de las bases
// de ep03-tocar.js (BASES: A terracota, T oliva, G ocre, C pizarra), los mismos del peldaño de bolitas.
//
// LAS PIEZAS (tipo · función · unidades locales · parámetros propios)
//  · 'celula' · celula(P, i, { corte: 1, nucleo: 1, madeja: true, semilla: 0 })
//      Una célula de arcilla «de museo», abierta en cuña: un esferoide achatado (semiejes 1 × 0,74 × 0,94, la base algo
//      plana en y ≈ −0,68) con la membrana rosada y translúcida; corte (0…1) abre una cuña vertical que mira a +z (0:
//      cerrada · 1: unos 56° a cada lado) y deja ver el citoplasma en las dos caras del corte (gelatina clara con
//      gránulos, mitocondrias de terracota con sus crestas, vesículas crema, el retículo en bandas alrededor del núcleo
//      y la membrana doble en el borde). El NÚCLEO es una esfera de radio 0,44 en ADN_MEDIDAS.nucleo ([0, 0,04, 0,02]):
//      no se corta, asoma entero en la cuña.
//        nucleo 1: la envoltura entera, de pizarra azulada con sus poros (opaca).
//        nucleo 0: solo la mitad de atrás de la envoltura (z < 0: un cuenco oscuro) con la MADEJA dentro (madeja: true).
//      EL NÚCLEO TRANSLÚCIDO se compone en 2D con dos fotos (ver velarNucleo): la de nucleo 1 encima de la de nucleo 0,
//      transparente en el centro y opaca en el borde, como una burbuja de cristal esmerilado con la madeja dentro.
//      Gira la pieza para que +z (la cuña) mire más o menos a la cámara (p. ej. rot [0,1, −0,35, 0]).
//      semilla: cambia el reparto de los orgánulos y la madeja de dentro. Devuelve { nucleo (centro, mundo), radio
//      (del núcleo, mundo), elipse: { x, y, r } (el núcleo en pantalla, px de diseño), salida (mundo: el punto de
//      delante y arriba del núcleo, por donde sale el hilo) }.
//  · 'madeja' · madeja(P, i, { semilla: 0, suelto: 0 })
//      La madeja de hilo: un ovillo flojo de unas 16 vueltas de hilo (cada una un lazo ondulado con su orientación) sobre
//      un núcleo de hilo apretado; radio ~1,08 (el hilo tiene 0,05 de radio). semilla gira el ovillo y cambia sus
//      ondas; suelto (0…1) saca una punta de hilo por arriba y delante, de hasta ~0,9 de largo. Es la misma madeja que
//      va dentro del núcleo de la célula (allí, a 0,8 × 0,44 = 0,35 de escala). Devuelve { punta } (mundo: el extremo
//      del hilo suelto, o lo alto del ovillo).
//  · 'hilo' · hilo(P, i, { largo: 4, tension: 1, fase: 0 })
//      Un hilo que se estira: el mismo hilo de la madeja (radio 0,05) desde pos a lo largo de +y local, de `largo`
//      unidades locales (sin tope: la pieza se estira sola). tension 0: ondulado (dos ondas cruzadas de 0,22 de
//      amplitud) · 1: tenso y recto. El arranque (los primeros 0,6) no se ondula, para que nazca de su sitio. fase
//      mueve las ondas (el hilo «culebrea»). Para un hilo de R de radio en el mundo:
//      escala = R / 0,05. Devuelve { desde, punta, punto(u) } (mundo; u de 0 a 1 a lo largo).
//  · 'helice' · helice(P, i, { avance: 0, giro: 0, semilla: 0, resalta: 0, largo: 6 })
//      La doble hélice como escalera retorcida, con repetición (sin fin): el eje en y local, dos hebras de hilo crema
//      con cuentas (azúcar) y nudos de latón (fosfato) a radio ADN_MEDIDAS.R = 1, una vuelta cada 10 peldaños
//      (ADN_MEDIDAS.PASO = 3,4; un peldaño cada ADN_MEDIDAS.H = 0,34, las proporciones del ADN B) y los peldaños como
//      tablillas planas partidas en el centro: cada mitad del color de su base, con la costura y 2 (A–T) o 3 (G–C)
//      puentes de latón. La secuencia es fija para cada semilla (secuenciaAdn).
//        avance (peldaños): la hélice entera corre a lo largo de +y (rígida: el peldaño k está en y = (k + avance)·H);
//          «pasan uno por segundo»: avance = t.
//        giro (rad): gira la hélice sobre su eje.
//        resalta (0…1): el peldaño que queda en el centro de la pieza (y ≈ 0: el de k = −round(avance)) se enciende
//          un poco (luz propia de su color): «el que se está leyendo».
//        largo: medio largo visible (unidades locales; 6 por defecto, ±6 = unos 35 peldaños); los extremos se cortan
//          en seco: deja que salgan del encuadre.
//      Devuelve { centro (mundo), peldano(k) (mundo del centro del peldaño k), actual (el k del centro), par(k) ('AT',
//      'TA', 'GC' o 'CG') }.
//
// COMPONER EN 2D (el plató creado con { alfa: true, post: false } y la receta de «lo que no se mueve» del kit)
//  · foto(P) → copia del lienzo de WebGL (tras P.render).
//  · velarNucleo(g, fotoAbierta, elipse, { opacidad: 0.5, borde: 0.95 }) pinta encima de lo que ya hay en g (la foto
//    con nucleo 1) la foto con nucleo 0 (fotoAbierta, la madeja dentro) a través de una máscara radial en la elipse del
//    núcleo: en el centro se ve la madeja (el velo deja pasar 1 − opacidad) y hacia el borde la envoltura se vuelve
//    opaca (borde: opacidad en el borde), como el cristal esmerilado. Las dos fotos tienen que ser del mismo encuadre;
//    lo que no es el núcleo es igual en las dos, así que la máscara solo cambia el núcleo. Más barato (y es lo que hace
//    ep3-adn): en vez de la foto con nucleo 0, la MADEJA SOLA sobre transparente (P.render(n, { fondo: false }) con
//    madeja(P, i, { pos: c.nucleo, escala: 0,8 × ADN_MEDIDAS.RN × escala de la célula, rot: la de la célula, semilla:
//    la de la célula }): es la misma madeja de dentro, en el mismo sitio. Respeta la transformación de g.
//
// COSTE (este servidor, 1920 × 1080, servidor cargado con otros agentes renderizando; ver la hoja): célula de ~600 px,
// 1,5–3 s (es una foto: se hace al cargar); madeja de ~500 px, 1–2 s; hilo, 0,2–0,6 s (vivo); hélice a pantalla
// completa en vertical, 1,5–3 s (viva). Lo quieto se fotografía; lo que se mueve lleva envolvente.
//
// CONGELADO el 22-10-2026, entregado con la hoja de prueba (escenas/ep03-adn-hoja.html: __frame(0) la hoja entera,
// __frame(k) la celda k). Las escenas que lo usan no lo cambian.
import * as THREE from 'three';
import { BASES } from '/atomo/plato/kits/ep03-tocar.js';

export { BASES };
const fl = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(+x.toFixed(6)));
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
function semillero(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const v3 = (a) => `vec3(${a.map(fl).join(', ')})`;
const m3 = (m) => `mat3(${m.elements.map(fl).join(', ')})`;

// ---------------------------------------------------------------- medidas
export const ADN_MEDIDAS = {
  R: 1.0, H: 0.34, PASO: 3.4,            // hélice: radio de las hebras, peldaño, vuelta (10 peldaños)
  HILO: 0.05,                            // radio del hilo (madeja, hilo)
  nucleo: [0.0, 0.04, 0.02], RN: 0.44,   // célula: centro y radio del núcleo
  MADEJA: 1.08,                          // radio de la madeja
};
const { R: HX_R, H: HX_H, PASO: HX_PASO } = ADN_MEDIDAS;

// ---------------------------------------------------------------- la secuencia de la hélice
// 64 pares fijos (0 A–T · 1 T–A · 2 G–C · 3 C–G); el peldaño k de la semilla s es SEC[(k + 17 s) mod 64]
const SEC = (() => { const r = semillero(31415); return Array.from({ length: 64 }, () => Math.floor(r() * 4)); })();
export const PARES_ADN = ['AT', 'TA', 'GC', 'CG'];
export function secuenciaAdn(k, semilla = 0) { const j = (((Math.round(k) + 17 * Math.round(semilla)) % 64) + 64) % 64; return PARES_ADN[SEC[j]]; }

// ---------------------------------------------------------------- la madeja: el ovillo
// un núcleo de hilo apretado (radio MA_R0) cuyas vueltas de fuera (MAD_S: 36 círculos máximos ondulados) son solo color
// y relieve, calculados una vez por píxel, y 5 lazos sueltos de verdad (MAD_M, MAD_A) que le dan la silueta floja
const rotAzar = (r) => {
  const u1 = r(), u2 = r(), u3 = r();
  const q = new THREE.Quaternion(Math.sqrt(1 - u1) * Math.sin(2 * Math.PI * u2), Math.sqrt(1 - u1) * Math.cos(2 * Math.PI * u2),
    Math.sqrt(u1) * Math.sin(2 * Math.PI * u3), Math.sqrt(u1) * Math.cos(2 * Math.PI * u3));
  return new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
};
const MAD = (() => {
  const r = semillero(20261022), out = [];
  for (let i = 0; i < 5; i++) out.push({ m: rotAzar(r), a: [0.96 + 0.06 * r(), 0.03 + 0.02 * r(), 0.04 + 0.04 * r(), 6.2832 * r()] });
  return out;
})();
const MADS = (() => {
  const r = semillero(4242), out = [];
  for (let i = 0; i < 36; i++) {
    const z = 2 * r() - 1, a = 2 * Math.PI * r(), k = Math.sqrt(1 - z * z);
    out.push([k * Math.cos(a), z, k * Math.sin(a), 6.2832 * r()]);
  }
  return out;
})();

// ---------------------------------------------------------------- la célula: orgánulos (solo color en las caras del corte)
const ORG = (() => {
  const r = semillero(7031), mito = [], ves = [];
  const nc = ADN_MEDIDAS.nucleo, rn = ADN_MEDIDAS.RN;
  const dentro = (p, k) => (p[0] / 1.0) ** 2 + (p[1] / 0.74) ** 2 + (p[2] / 0.94) ** 2 < k * k;
  const lejos = (p, d) => Math.hypot(p[0] - nc[0], p[1] - nc[1], p[2] - nc[2]) > rn + d;
  while (mito.length < 34) {
    const p = [2 * r() - 1, 1.5 * r() - 0.75, 2 * r() - 1];
    if (!dentro(p, 0.82) || !lejos(p, 0.14)) continue;
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(r() * 6.28, r() * 6.28, r() * 6.28));
    mito.push({ p, m: new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q)) });
  }
  while (ves.length < 46) {
    const p = [2 * r() - 1, 1.5 * r() - 0.75, 2 * r() - 1];
    if (!dentro(p, 0.86) || !lejos(p, 0.08)) continue;
    ves.push([...p, 0.028 + 0.035 * r()]);
  }
  return { mito, ves };
})();

// ---------------------------------------------------------------- GLSL común del kit
const GLSL_COMUN = /* glsl */`
#ifndef ADN_COMUN
#define ADN_COMUN 1
const float AD_PI = 3.14159265;
float adH(float n) { return fract(sin(n * 91.3458 + 0.71) * 47453.5453); }
mat2 adGiro(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
// estiramiento (como en ep03-tocar): las piezas de largo variable llegan con la escala multiplicada por L
float adL(vec4 T) { return max(T.w, 1.0); }
const vec3 AD_HILO = vec3(0.60, 0.515, 0.375);     // el hilo del ADN: crema de marfil
const vec3 AD_LATON = vec3(0.47, 0.30, 0.085);
const vec3 AD_MEMBRANA = vec3(0.50, 0.335, 0.285);  // membrana: arcilla rosada
const vec3 AD_CITO = vec3(0.47, 0.35, 0.26);        // citoplasma (cara del corte): gelatina clara
const vec3 AD_MITO = vec3(0.36, 0.125, 0.06);       // mitocondria: terracota
const vec3 AD_RE = vec3(0.40, 0.215, 0.175);        // retículo: arcilla
const vec3 AD_NUCLEO = vec3(0.10, 0.105, 0.165);    // envoltura del núcleo: pizarra azulada
const float AD_FIB = 0.05;                          // radio del hilo
// el retorcido del hilo (dos cabos): u a lo largo del hilo, a alrededor (rad); 0…1
float adRetorcido(float u, float a) { return 0.5 + 0.5 * sin(u * 62.0 + 2.0 * a); }
const int MAD_N = ${MAD.length};
const mat3 MAD_M[${MAD.length}] = mat3[${MAD.length}](${MAD.map((l) => m3(l.m)).join(', ')});
const vec4 MAD_A[${MAD.length}] = vec4[${MAD.length}](${MAD.map((l) => `vec4(${l.a.map(fl).join(', ')})`).join(', ')});
const int MAD_NS = ${MADS.length};
const vec4 MAD_S[${MADS.length}] = vec4[${MADS.length}](${MADS.map((v) => `vec4(${v.map(fl).join(', ')})`).join(', ')});
const float MA_R0 = 0.9;
vec3 adOvGiro(vec3 q, float sem) { q.xz = adGiro(sem * 1.9) * q.xz; q.xy = adGiro(sem * 0.7) * q.xy; return q; }
vec3 adOvGiroInv(vec3 q, float sem) { q.xy = adGiro(-sem * 0.7) * q.xy; q.xz = adGiro(-sem * 1.9) * q.xz; return q; }
// la madeja (radio ~1,08): id del lazo suelto más cercano (−1: el ovillo); uv: (a lo largo, alrededor) del lazo
float adMadeja(vec3 q, float sem, out float id, out vec2 uv) {
  q = adOvGiro(q, sem);
  float d = length(q) - MA_R0 + 0.008 * sin(q.x * 13.0 + sem) * sin(q.y * 11.0) * sin(q.z * 12.0);
  id = -1.0; uv = vec2(0.0);
  float dm = d;
  for (int i = 0; i < MAD_N; i++) {
    vec3 p = MAD_M[i] * q;
    vec4 a = MAD_A[i];
    float th = atan(p.z, p.x);
    float ph = a.w + sem * 2.3;
    float rho = a.x + a.y * sin(3.0 * th + ph);
    float y0 = a.z * sin(2.0 * th + ph * 1.3);
    vec2 w = vec2(length(p.xz) - rho, p.y - y0);
    float di = (length(w) - AD_FIB) * 0.85;
    if (di < dm) { dm = di; id = float(i); uv = vec2(th * rho, atan(w.y, w.x)); }
    d = smin(d, di, 0.02);
  }
  return d;
}
// las vueltas del ovillo (color y relieve en un punto de su superficie, en unidades de la madeja): devuelve el color
// y en g el relieve (gradiente, para gG); la vuelta de índice mayor queda encima en los cruces
vec3 adOvillo(vec3 q, float sem, out vec3 g) {
  vec3 u = normalize(adOvGiro(q, sem));
  const float w = 0.058;
  float top = -1.0, aT = 0.0, alT = 0.0; vec3 nT = vec3(0.0, 1.0, 0.0);
  for (int i = 0; i < MAD_NS; i++) {
    vec3 n = MAD_S[i].xyz;
    vec3 e1 = normalize(cross(n, vec3(0.31, 0.95, 0.07)));
    vec3 e2 = cross(n, e1);
    float al = atan(dot(u, e2), dot(u, e1));
    float a = dot(u, n) + 0.035 * sin(3.0 * al + MAD_S[i].w + sem);
    if (abs(a) < w) { top = float(i); aT = a; alT = al; nT = n; }
  }
  g = vec3(0.0);
  if (top < 0.0) return AD_HILO * 0.12 * (0.7 + 0.6 * smoothstep(0.3, 0.7, vnoise(q * vec3(40.0, 9.0, 40.0))));
  float x = aT / w, pf = sqrt(max(1.0 - x * x, 0.0));
  vec3 t = nT - u * dot(u, nT);
  g = adOvGiroInv(-t * x / max(pf, 0.25) * 0.7, sem);
  float k = 0.86 + 0.16 * adH(top + 3.0 * sem);
  return AD_HILO * k * (0.32 + 0.68 * pf) * (0.86 + 0.2 * adRetorcido(alT * MA_R0, asin(clamp(x, -1.0, 1.0)) * 1.5));
}
// el color del hilo en un punto de la madeja (id y uv de adMadeja)
vec3 adColorMadeja(vec3 q, float sem, float id, vec2 uv, out vec3 g) {
  g = vec3(0.0);
  if (id < -0.5) return adOvillo(q, sem, g);
  float k = 0.86 + 0.16 * adH(id + 40.0 + 3.0 * sem);
  return AD_HILO * k * (0.84 + 0.2 * adRetorcido(uv.x, uv.y));
}
#endif
`;

// ---------------------------------------------------------------- CÉLULA
const GLSL_CELULA = /* glsl */`
const vec3 AD_NC = ${v3(ADN_MEDIDAS.nucleo)};
const float AD_RN = ${fl(ADN_MEDIDAS.RN)};
const int CE_NMITO = ${ORG.mito.length};
const vec3 CE_MP[${ORG.mito.length}] = vec3[${ORG.mito.length}](${ORG.mito.map((o) => v3(o.p)).join(', ')});
const mat3 CE_MM[${ORG.mito.length}] = mat3[${ORG.mito.length}](${ORG.mito.map((o) => m3(o.m)).join(', ')});
const int CE_NVES = ${ORG.ves.length};
const vec4 CE_V[${ORG.ves.length}] = vec4[${ORG.ves.length}](${ORG.ves.map((v) => `vec4(${v.map(fl).join(', ')})`).join(', ')});
float ceForma(vec3 q) {
  float d = elipsoideP(q, vec3(1.0, 0.74, 0.94));
  d = smax(d, -0.68 - q.y, 0.1);
  return d + 0.006 * sin(q.x * 9.0 + 1.3) * sin(q.y * 8.0) * sin(q.z * 7.0 + 0.4);
}
// la cuña: < 0 dentro (mira a +z, su arista vertical pasa por z = −0,12), semiapertura a
float ceCuna(vec3 q, float a) {
  vec2 p = vec2(q.x, q.z + 0.12);
  return max(dot(p, vec2(cos(a), -sin(a))), dot(p, vec2(-cos(a), -sin(a))));
}
float pz_celula(vec3 q, vec4 T, out float m) {
  float corte = clamp(T.x, 0.0, 1.0), sem = floor(T.y + 0.5), nucleo = T.z;
  float dc = ceForma(q);
  float dw = corte > 0.001 ? ceCuna(q, corte * 0.98) : 1e5;
  float d = max(dc, -dw);
  m = -dw > dc ? 1.0 : 0.0;
  vec3 qn = q - AD_NC;
  float dn = length(qn) - AD_RN;
  // el hueco del núcleo en el citoplasma
  d = max(d, -dn);
  float ds;
  if (nucleo > 0.5) ds = dn;
  else ds = max(abs(dn + 0.022) - 0.022, qn.z);      // solo la mitad de atrás: un cuenco
  if (ds < d) m = 2.0;
  d = min(d, ds);
  if (nucleo < 0.5 && T.w > 0.5) {
    float sM = AD_RN * 0.8, id; vec2 uv;
    float dm = adMadeja(qn / sM, sem, id, uv) * sM;
    if (dm < d) m = 10.0 + max(id, -1.0) + 1.0;
    d = min(d, dm);
  }
  return d;
}
float pzc_celula(vec3 q, vec4 T) {
  float corte = clamp(T.x, 0.0, 1.0);
  float d = elipsoideP(q, vec3(0.96, 0.7, 0.9));
  if (corte > 0.001) d = max(d, -ceCuna(q, corte * 0.98));
  float dn = length(q - AD_NC);
  return min(d, T.z > 0.5 ? dn - AD_RN * 0.95 : (T.w > 0.5 ? dn - AD_RN * 0.8 * 0.86 : 1e5));
}
// los poros de la envoltura: puntitos oscuros en una red de Fibonacci (n: la normal)
float cePoros(vec3 n) {
  float best = 1.0;
  for (int i = 0; i < 220; i++) {
    float y = 1.0 - (float(i) + 0.5) * 2.0 / 220.0, r = sqrt(1.0 - y * y), a = float(i) * 2.39996;
    vec3 p = vec3(cos(a) * r, y, sin(a) * r);
    best = min(best, length(n - p));
  }
  return 1.0 - smoothstep(0.022, 0.04, best);
}
vec3 ceCitoplasma(vec3 q, float sem) {
  vec3 c = AD_CITO * (0.93 + 0.12 * vnoise(q * 9.0 + sem));
  // gránulos (ribosomas)
  c *= 1.0 - 0.28 * smoothstep(0.72, 0.82, vnoise(q * 60.0 + 3.0 * sem));
  // el retículo: bandas finas alrededor del núcleo
  float e = length(q - AD_NC) - AD_RN;
  float an = atan(q.y - AD_NC.y, q.x - AD_NC.x);
  float banda = sin(e * 88.0 + 1.6 * sin(an * 3.0 + q.z * 5.0 + sem));
  float er = smoothstep(0.62, 0.9, banda) * smoothstep(0.035, 0.07, e) * (1.0 - smoothstep(0.17, 0.3, e)) * (0.55 + 0.45 * vnoise(q * 7.0));
  c = mix(c, AD_RE, er * 0.85);
  // mitocondrias: óvalos de terracota con un borde más oscuro y sus crestas
  for (int i = 0; i < CE_NMITO; i++) {
    vec3 cp = CE_MP[i];
    cp.xz = adGiro(sem * 0.9) * cp.xz;
    vec3 p = CE_MM[i] * (q - cp);
    float dm = elipsoideP(p, vec3(0.18, 0.068, 0.078));
    if (dm < 0.006) {
      float borde = smoothstep(-0.018, -0.004, dm);
      float cresta = smoothstep(0.55, 0.85, sin(p.x * 70.0 + 2.0 * sin(p.y * 40.0)));
      vec3 cm = mix(AD_MITO * 1.25, AD_MITO * 0.75, cresta * (1.0 - borde));
      cm = mix(cm, AD_MITO * 0.6, borde);
      c = mix(c, cm, 1.0 - smoothstep(0.0, 0.006, dm));
    }
  }
  // vesículas: círculos crema con el borde más oscuro
  for (int i = 0; i < CE_NVES; i++) {
    vec4 v = CE_V[i];
    vec3 vp = v.xyz; vp.xz = adGiro(sem * 0.9) * vp.xz;
    float dv = length(q - vp) - v.w;
    if (dv < 0.006) {
      vec3 cv = mix(vec3(0.66, 0.6, 0.46), vec3(0.42, 0.3, 0.2), smoothstep(-0.012, -0.002, dv));
      c = mix(c, cv, 1.0 - smoothstep(0.0, 0.006, dv));
    }
  }
  return c;
}
vec3 pzcol_celula(vec3 q, vec4 T, float m) {
  float sem = floor(T.y + 0.5);
  if (m > 9.5) {
    // la madeja de dentro
    float sM = AD_RN * 0.8, id; vec2 uv; vec3 g;
    vec3 qm = (q - AD_NC) / sM;
    adMadeja(qm, sem, id, uv);
    vec3 c = adColorMadeja(qm, sem, id, uv, g);
    gG = g; gTr = 0.45; gBri = 1.3;
    // la luz que entra por la envoltura translúcida
    gEm = c * 0.22;
    return c;
  }
  if (m > 1.5) {
    vec3 qn = q - AD_NC;
    vec3 n = normalize(qn);
    gTr = 0.55; gBri = 1.7;
    vec3 c = AD_NUCLEO * (0.88 + 0.22 * vnoise(q * 16.0));
    float po = cePoros(n);
    c = mix(c, c * 0.5, po);
    // la cara de dentro del cuenco (nucleo 0): más oscura, para que la madeja destaque
    if (length(qn) < AD_RN - 0.02) c *= 0.55;
    return c;
  }
  if (m > 0.5) {
    // cara del corte: citoplasma, con la membrana doble en el borde
    vec3 c = ceCitoplasma(q, sem);
    float e = -ceForma(q);
    float mem = smoothstep(0.004, 0.009, e) * (1.0 - smoothstep(0.014, 0.019, e)) + smoothstep(0.024, 0.029, e) * (1.0 - smoothstep(0.034, 0.039, e));
    c = mix(c, AD_MEMBRANA * 0.6, mem * 0.8);
    c = mix(AD_MEMBRANA * 1.05, c, smoothstep(0.0, 0.004, e));
    gTr = 0.6;
    return c;
  }
  gTr = 0.7; gBri = 1.15;
  return AD_MEMBRANA * (0.9 + 0.14 * vnoise(q * 5.0)) * (0.97 + 0.06 * vnoise(q * 31.0));
}
`;

// ---------------------------------------------------------------- MADEJA
const SUELTO = [[0.05, 0.62, 0.74], [0.02, 0.22, 0.18], [-0.06, 0.24, 0.04], [0.08, 0.2, -0.04]];
const GLSL_MADEJA = /* glsl */`
// la punta suelta: tres tramos de hilo que salen por arriba y delante (s: 0…1, el largo)
const vec3 MA_A = ${v3(SUELTO[0])}, MA_D1 = ${v3(SUELTO[1])}, MA_D2 = ${v3(SUELTO[2])}, MA_D3 = ${v3(SUELTO[3])};
float maSuelto(vec3 q, float s) {
  vec3 b = MA_A + MA_D1 * s, c = b + MA_D2 * s, e = c + MA_D3 * s;
  float d = sdCapsule(q, MA_A, b, AD_FIB);
  d = min(d, sdCapsule(q, b, c, AD_FIB));
  return min(d, sdCapsule(q, c, e, AD_FIB));
}
float pz_madeja(vec3 q, vec4 T, out float m) {
  float sem = floor(T.y + 0.5), id; vec2 uv;
  float d = adMadeja(q, sem, id, uv);
  m = id + 1.0;
  if (T.z > 0.001) { float ds = maSuelto(q, T.z); if (ds < d) m = 100.0; d = smin(d, ds, 0.02); }
  return d;
}
float pza_madeja(vec3 q, vec4 T) {
  float d = length(q) - 1.12;
  return T.z > 0.001 ? min(d, sdCapsule(q, MA_A, MA_A + (MA_D1 + MA_D2 + MA_D3) * T.z, 0.24)) : d;
}
float pzc_madeja(vec3 q, vec4 T) { return length(q) - 0.88; }
vec3 pzcol_madeja(vec3 q, vec4 T, float m) {
  float sem = floor(T.y + 0.5), id; vec2 uv;
  gTr = 0.45; gBri = 1.3;
  if (m > 99.5) return AD_HILO * (0.84 + 0.2 * adRetorcido(q.y * 3.0, atan(q.z, q.x)));
  adMadeja(q, sem, id, uv);
  vec3 g;
  vec3 c = adColorMadeja(q, sem, id, uv, g);
  gG = g;
  return c;
}
`;

// ---------------------------------------------------------------- HILO
// T: x largo · y fase · z tension · w L (estiramiento). Unidades locales con el origen en el MEDIO del hilo (la función
// hilo() pone ahí la pieza); el arranque, en y = −largo/2
const RADIO_HILO = 1.0;
const GLSL_HILO = /* glsl */`
vec2 hiCentro(float y, float largo, float fase, float tension, float ondas) {
  float s = y + 0.5 * largo;
  float amp = 0.22 * (1.0 - tension) * smoothstep(0.0, 0.6, s);
  return amp * vec2(sin(s * 1.9 * ondas + fase), 0.7 * sin(s * 1.3 * ondas + 1.7 + fase * 1.3));
}
float pz_hilo(vec3 q, vec4 T, out float m) {
  float L = adL(T); q *= L;
  float largo = max(T.x, 0.0), fase = T.y, tension = clamp(T.z, 0.0, 1.0);
  float y = clamp(q.y, -0.5 * largo, 0.5 * largo);
  vec2 c = hiCentro(y, largo, fase, tension, 1.0);
  float d = length(vec3(q.x - c.x, q.y - y, q.z - c.y)) - AD_FIB;
  m = 0.0;
  return d * 0.8 / L;
}
float pza_hilo(vec3 q, vec4 T) {
  float L = adL(T); q *= L;
  float largo = max(T.x, 0.0);
  return (length(vec2(length(q.xz), max(abs(q.y) - 0.5 * largo, 0.0))) - 0.36) / L;
}
float pzc_hilo(vec3 q, vec4 T) { return 1e5; }
vec3 pzcol_hilo(vec3 q, vec4 T, float m) {
  float L = adL(T); q *= L;
  vec2 c = hiCentro(q.y, max(T.x, 0.0), T.y, clamp(T.z, 0.0, 1.0), 1.0);
  gTr = 0.45; gBri = 1.3;
  return AD_HILO * (0.86 + 0.2 * adRetorcido(q.y, atan(q.z - c.y, q.x - c.x)));
}
`;

// ---------------------------------------------------------------- HÉLICE
// T: x avance (peldaños) · y semilla + 0,99 × resalta · z giro (rad) · w L (estiramiento; el medio largo va en el
// radio: largo = L × RADIO_HELICE − 0,6, y así la esfera envolvente cubre el cilindro de radio 1,24)
const RADIO_HELICE = 1.3;
const GLSL_HELICE = /* glsl */`
const float HX_R = ${fl(HX_R)}, HX_H = ${fl(HX_H)}, HX_W = ${fl(2 * Math.PI / HX_PASO)};
const float HX_K = ${fl(Math.sqrt(1 + (HX_R * 2 * Math.PI / HX_PASO) ** 2))};   // √(1 + (Rω)²)
const float HX_SEC[64] = float[64](${SEC.map(fl).join(', ')});
float hxPar(float k, float sem) { return HX_SEC[int(mod(k + 17.0 * sem, 64.0))]; }
// distancia a la línea central de la hebra que pasa por el ángulo ω·y + off; u: dónde (en peldaños) cae el punto más
// cercano de la hebra
float hxLinea(vec3 q, float off, out float u) {
  float r = length(q.xz), th = atan(q.z, q.x);
  float da = th - (HX_W * q.y + off);
  da = mod(da + AD_PI, 2.0 * AD_PI) - AD_PI;
  float s = HX_R * da;
  u = (q.y + s * HX_R * HX_W / (HX_K * HX_K)) / HX_H;
  return length(vec2(r - HX_R, s / HX_K));
}
// la hebra: cuentas (azúcar) a la altura de cada peldaño y nudos más finos (fosfato) entre ellas
float hxHebra(vec3 q, float off, out float u) {
  float dl = hxLinea(q, off, u);
  float c = 0.5 + 0.5 * cos(6.2832 * u);
  float rr = 0.13 + 0.05 * c * c * c + 0.02 * pow(1.0 - c, 4.0);
  return (dl - rr) * 0.8;
}
// el peldaño k (en el marco de la hélice: q.y ya sin el avance)
float hxPeldano(vec3 q, float k, float giro, out vec3 pr) {
  float yk = k * HX_H;
  pr = q - vec3(0.0, yk, 0.0);
  pr.xz = adGiro(-(HX_W * yk + giro)) * pr.xz;
  float d = sdRoundBox(pr, vec3(HX_R - 0.06, 0.056, 0.12), 0.045);
  // la costura del centro
  d = smax(d, 0.022 - abs(pr.x), 0.012);
  return d;
}
float hxPuentes(vec3 pr, float par) {
  float n = par > 1.5 ? 3.0 : 2.0;
  float d = 1e5;
  for (int j = 0; j < 3; j++) {
    if (float(j) >= n) break;
    float z = n > 2.5 ? (float(j) - 1.0) * 0.062 : (float(j) - 0.5) * 0.08;
    d = min(d, sdCapsule(pr, vec3(-0.05, 0.0, z), vec3(0.05, 0.0, z), 0.012));
  }
  return d;
}
float pz_helice(vec3 q, vec4 T, out float m) {
  float L = adL(T); q *= L;
  float largo = L * ${fl(RADIO_HELICE)} - 0.6;
  float avance = T.x, giro = T.z;
  float sem = floor(T.y + 0.001);
  vec3 p = q; p.y -= avance * HX_H;
  float u0, u1;
  float d0 = hxHebra(p, giro, u0), d1 = hxHebra(p, giro + AD_PI, u1);
  float d = min(d0, d1);
  m = 0.0;
  float k = floor(p.y / HX_H + 0.5);
  float kv = k + (p.y / HX_H > k ? 1.0 : -1.0);
  for (int j = 0; j < 2; j++) {
    float kk = j == 0 ? k : kv;
    vec3 pr;
    float dp = hxPeldano(p, kk, giro, pr);
    float db = hxPuentes(pr, hxPar(kk, sem));
    if (dp < d) m = pr.x > 0.0 ? 1.0 : 2.0;
    if (db < min(d, dp)) m = 3.0;
    d = smin(d, dp, 0.05);
    d = min(d, db);
  }
  d = max(d, abs(q.y) - largo);
  return d / L;
}
float pza_helice(vec3 q, vec4 T) {
  float L = adL(T); q *= L;
  float largo = L * ${fl(RADIO_HELICE)} - 0.6;
  return max(length(q.xz) - (HX_R + 0.24), abs(q.y) - largo) / L;
}
float pzc_helice(vec3 q, vec4 T) {
  float L = adL(T); q *= L;
  float largo = L * ${fl(RADIO_HELICE)} - 0.6;
  vec3 p = q; p.y -= T.x * HX_H;
  float u;
  float d = min(hxLinea(p, T.z, u), hxLinea(p, T.z + AD_PI, u)) - 0.11;
  return max(d * 0.8, abs(q.y) - largo) / L;
}
vec3 hxBase(float b) { return b < 0.5 ? vec3(${BASES.A.map(fl)}) : b < 1.5 ? vec3(${BASES.T.map(fl)}) : b < 2.5 ? vec3(${BASES.G.map(fl)}) : vec3(${BASES.C.map(fl)}); }
vec3 pzcol_helice(vec3 q, vec4 T, float m) {
  float L = adL(T); q *= L;
  float avance = T.x, giro = T.z;
  float sem = floor(T.y + 0.001), res = fract(T.y + 0.001) / 0.99;
  vec3 p = q; p.y -= avance * HX_H;
  if (m < 0.5) {
    // hebras: hilo crema; los nudos de fosfato, de latón
    float u0, u1;
    float d0 = hxLinea(p, giro, u0), d1 = hxLinea(p, giro + AD_PI, u1);
    float u = d0 < d1 ? u0 : u1;
    float c = 0.5 + 0.5 * cos(6.2832 * u);
    float lat = 1.0 - smoothstep(0.08, 0.3, c);
    gTr = 0.4; gBri = mix(1.3, 3.0, lat);
    vec3 col = AD_HILO * (0.86 + 0.18 * adRetorcido(u * 1.6, atan(p.z, p.x) * 3.0));
    return mix(col, AD_LATON * 0.95, lat);
  }
  float k = floor(p.y / HX_H + 0.5);
  if (m > 2.5) { gBri = 3.0; return AD_LATON; }
  float par = hxPar(k, sem);
  // la base de cada lado: 0 A · 1 T · 2 G · 3 C (el lado + es la hebra 0)
  float bIzq = par < 0.5 ? 0.0 : par < 1.5 ? 1.0 : par < 2.5 ? 2.0 : 3.0;
  float bDer = par < 0.5 ? 1.0 : par < 1.5 ? 0.0 : par < 2.5 ? 3.0 : 2.0;
  vec3 col = hxBase(m < 1.5 ? bIzq : bDer);
  col *= 1.25 * (0.92 + 0.14 * vnoise(q * 14.0));
  gTr = 0.3; gBri = 1.2;
  // el peldaño del centro de la pieza (k = −round(avance)), encendido
  if (res > 0.001 && abs(k + floor(avance + 0.5)) < 0.5) { gEm = col * 0.9 * res; col *= 1.0 + 0.5 * res; }
  return col;
}
`;

// ---------------------------------------------------------------- los tipos
const TIPOS = {
  celula: { radio: 1.06, glifos: [], glsl: GLSL_COMUN + GLSL_CELULA },
  madeja: { envolvente: true, radio: 1.66, glifos: [], glsl: GLSL_COMUN + GLSL_MADEJA },
  hilo: { envolvente: true, radio: RADIO_HILO, glifos: [], glsl: GLSL_COMUN + GLSL_HILO },
  helice: { envolvente: true, radio: RADIO_HELICE, glifos: [], glsl: GLSL_COMUN + GLSL_HELICE },
};
export const TIPOS_ADN = TIPOS;
export function tiposAdn(nombres = null) {
  if (!nombres) return { ...TIPOS };
  const o = {};
  for (const k of nombres) { if (!TIPOS[k]) throw new Error(`ep03-adn: no hay tipo «${k}»`); o[k] = TIPOS[k]; }
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
// el círculo de pantalla de una esfera del mundo (centro c, radio r)
function circuloPantalla(P, c, r) {
  const a = P.proyectar(c);
  if (!a) return null;
  let rp = 0;
  for (const d of [[r, 0, 0], [0, r, 0], [-r, 0, 0], [0, -r, 0]]) {
    const b = P.proyectar([c[0] + d[0], c[1] + d[1], c[2] + d[2]]);
    if (b) rp = Math.max(rp, Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  return { x: a[0], y: a[1], r: rp };
}

export function celula(P, i, o = {}) {
  const b = base(o);
  P.pieza(i, { ...b, variante: Math.round(o.semilla ?? 0), color: o.nucleo ?? 1 });
  escribirT(P, i, cl(o.corte ?? 1), (o.madeja ?? true) ? 1 : 0);
  const nucleo = mundoPieza(b, ADN_MEDIDAS.nucleo), radio = ADN_MEDIDAS.RN * b.escala;
  const nc = ADN_MEDIDAS.nucleo, rn = ADN_MEDIDAS.RN;
  const s = [0, 0.62, 0.78], ns = Math.hypot(...s);
  return { nucleo, radio, elipse: circuloPantalla(P, nucleo, radio), salida: mundoPieza(b, [nc[0] + rn * s[0] / ns, nc[1] + rn * s[1] / ns, nc[2] + rn * s[2] / ns]) };
}
export function madeja(P, i, o = {}) {
  const b = base(o);
  const s = cl(o.suelto ?? 0);
  P.pieza(i, { ...b, variante: Math.round(o.semilla ?? 0), color: s });
  const [a, d1, d2, d3] = SUELTO;
  const e = s > 0 ? [0, 1, 2].map((j) => a[j] + (d1[j] + d2[j] + d3[j]) * s) : [0, 1.0, 0];
  return { punta: mundoPieza(b, e), centro: b.pos };
}
export function hilo(P, i, o = {}) {
  const b = base(o);
  const largo = Math.max(0, o.largo ?? 4), tension = cl(o.tension ?? 1), fase = o.fase ?? 0;
  const medio = mundoPieza(b, [0, largo / 2, 0]);
  const L = Math.max(1, (largo / 2 + 0.45) / RADIO_HILO);
  if (largo <= 1e-4) { P.pieza(i, { ...b, escala: 0 }); return { desde: b.pos, punta: b.pos, punto: () => b.pos }; }
  P.pieza(i, { ...b, pos: medio, escala: b.escala * L, sq: b.sq, variante: fase, color: tension });
  escribirT(P, i, largo, L);
  // el centro del hilo a la altura s desde el arranque (como hiCentro)
  const centro = (s) => {
    const amp = 0.22 * (1 - tension) * (s <= 0 ? 0 : s >= 0.6 ? 1 : (s / 0.6) ** 2 * (3 - 2 * s / 0.6));
    return [amp * Math.sin(s * 1.9 + fase), s, amp * 0.7 * Math.sin(s * 1.3 + 1.7 + fase * 1.3)];
  };
  const punto = (u) => mundoPieza(b, centro(cl(u) * largo));
  return { desde: b.pos, punta: punto(1), punto };
}
export function helice(P, i, o = {}) {
  const b = base(o);
  const avance = o.avance ?? 0, giro = o.giro ?? 0, sem = Math.max(0, Math.round(o.semilla ?? 0)), res = cl(o.resalta ?? 0);
  const largo = Math.max(1, o.largo ?? 6);
  const L = (largo + 0.6) / RADIO_HELICE;
  P.pieza(i, { ...b, escala: b.escala * L, sq: b.sq, variante: sem + 0.99 * res, color: giro });
  escribirT(P, i, avance, L);
  const actual = -Math.round(avance);
  const peldano = (k) => mundoPieza(b, [0, (k + avance) * HX_H, 0]);
  return { centro: b.pos, peldano, actual, par: (k) => secuenciaAdn(k, sem) };
}

// ---------------------------------------------------------------- 2D
export function foto(P) {
  const l = P.renderer.domElement;
  const c = document.createElement('canvas'); c.width = l.width; c.height = l.height;
  c.getContext('2d').drawImage(l, 0, 0);
  return c;
}
// el núcleo translúcido: fotoAbierta (nucleo 0, la madeja dentro) encima de lo que hay, por una máscara radial
export function velarNucleo(g, fotoAbierta, elipse, { opacidad = 0.5, borde = 0.95 } = {}) {
  if (!elipse || !fotoAbierta) return;
  const W = 1920, H = 1080;
  const c = document.createElement('canvas'); c.width = fotoAbierta.width; c.height = fotoAbierta.height;
  const k = c.width / W;
  const gc = c.getContext('2d');
  gc.drawImage(fotoAbierta, 0, 0);
  gc.globalCompositeOperation = 'destination-in';
  const { x, y, r } = elipse;
  const gr = gc.createRadialGradient(x * k, y * k, 0, x * k, y * k, r * k);
  const a = (f) => 1 - (opacidad + (borde - opacidad) * f);
  for (const f of [0, 0.35, 0.6, 0.78, 0.9, 0.97]) gr.addColorStop(f, `rgba(0,0,0,${cl(a(Math.pow(f, 2.2))).toFixed(3)})`);
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  gc.fillStyle = gr;
  gc.fillRect(0, 0, c.width, c.height);
  g.drawImage(c, 0, 0, W, H);
}
