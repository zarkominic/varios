// =====================================================================================
// COPIA de kits/papel.js para la prueba de identidad (prueba-papel.html, prueba-mixta.html).
// kits/papel.js lo usan escenas terminadas del episodio 2 y no se toca. Añadidos de esta copia:
//  · zoomFisico(fn): mientras se dibuja fn, la textura de fibras se queda a tamaño de pantalla y
//    la sombra crece con la escala del trazado (para acercamientos ×10 sin fibras borrosas).
//  · atomo(): colores del núcleo, electrones y órbitas (o.nucA, o.nucB, o.elec, o.elecL, o.orb),
//    fase de los electrones (o.fase, rad) y balanceo (o.balanceo) dados desde fuera.
//  · luz(dx, dy): dirección de la sombra (por defecto la del kit) para casarla con otra técnica.
// -------------------------------------------------------------------------------------
// Kit de RECORTES DE PAPEL para las escenas del vídeo largo (atomo/plato/escenas/*.html)
// -------------------------------------------------------------------------------------
// Stop-motion de papel recortado a 12 fps, Canvas 2D, marco de diseño 1920x1080.
// Sale del demo aprobado estilos/06-recortes-papel.html: piezas Path2D "cortadas a mano"
// con textura de fibras procedural, sombra según la altura de la pieza, filo de luz de
// la lámpara (arriba-izquierda, fijo en pantalla), temblor de stop-motion con semilla y
// capas estáticas en caché.
//
// USO MÍNIMO (una escena):
//
//   import { escena } from '/atomo/plato/escena.js';
//   import * as K from '/atomo/plato/kits/papel.js';
//   const E = await escena('mi-escena');
//   await K.preparar();                                   // lienzo + bandas + texturas + fuentes
//   const fondo = K.capa(() => K.fondoNoche({ ... }));    // capa fija, se dibuja una vez
//   function escenaEn(t) {                                // coreografía: SOLO dibuja el instante t
//     const g = K.g;                                      // contexto actual (coordenadas 1920x1080)
//     K.papel(K.circulo(80, 3), K.C.gold, { d: 4, seed: 3 });
//     K.atomo(1700, 200, t, E.energia(t));
//   }
//   E.iniciar((t) => K.fotograma(t, escenaEn, { fondo }), { paso: 1 / 12 });
//
// CONVENCIONES
//  · Todas las coordenadas son de diseño (1920x1080). El lienzo interno mide eso siempre; si la
//    ventana no es 16:9 el CSS lo encaja con bandas (object-fit: contain) del color `bandas`.
//  · `K.g` es el contexto en el que se dibuja AHORA (enlace vivo: cambia dentro de capa/sprite).
//    Úsalo como `K.g.save()` o guárdalo en una variable local DENTRO de cada función de dibujo.
//  · `K.F` es el fotograma de stop-motion (round(t·12)); el temblor y el parpadeo dependen de él,
//    así que el mismo t dibuja siempre lo mismo.
//  · Las piezas son Path2D con una propiedad `.bb = [x0, y0, x1, y1]` (caja), que necesita el filo
//    de luz. Todas las fábricas de formas del kit la ponen. Si construyes un Path2D a mano, ponle bb.
//  · Altura `d` de una pieza (0…14): sombra más grande y más desplazada. 1–3 piezas pegadas,
//    4–8 tarjetas sobre el fondo, 10+ piezas levantadas a mano (al colocarlas).
//  · Prohibido escribir palabras: K.etiqueta() / K.escribir() solo deben recibir números y símbolos
//    permitidos por el contrato (✓ ✗ flechas ½ ° % «24 h» «12 h» «km», años, MIT, N, S, E, D, C).
//    Para superíndice usa «^»: '×10^6' → ×10⁶. El signo menos tipográfico es '−'.
//    ✓ y ✗ no se escriben: K.sello() los recorta como piezas.
//  · Coste: los lienzos son de CPU (willReadFrequently). En el servidor sin GPU cada orden de dibujo
//    acelerada por SwiftShader cuesta ~10 veces más; así una escena cargada sale a ~0,1 s de dibujo
//    + ~0,15 s de captura. Lo que no cambia, en K.capa / K.sprite. Evita sombras en piezas enormes
//    que se redibujan en cada fotograma (mejor un sprite con la sombra ya hecha).
//  · Colocar piezas: en stop-motion no hay fundidos. Una pieza entra «posándose» (K.colocar(u):
//    llega desde la lámpara, más grande y con más sombra, y rebota un poco) o se desliza fuera de
//    cuadro. K.elevar(d, fn) sube todas las piezas de fn (más sombra) mientras están en la mano.
//  · Luz fija: el filo de luz se calcula en pantalla. Si giras un sprite, su filo gira con él; para
//    discos que giran, dibuja el sprite girado y después K.filo(contorno) sin girar.
//
// API (resumen; cada función está documentada donde se define)
//  Lienzo y fotograma: preparar, capa, sprite, pegar, fotograma, g, F, W, H, FPS
//  Utilidades:        rng, hsh, cl, seg, eio, eout, ein, eback, eiob, lerp, mezcla, aimAt, TAU, PI, D2R
//  Paleta:            C
//  Pieza de papel:    papel, textura, filo, sombra, sinSombra, temblor, elevar, colocar
//  Formas:            poligono, suave, circulo, circuloPts, mancha, estrella, rect, rectRecortado,
//                     rectRecortadoPts, anillo, fase, elipse, tira, escalar, arcoPts, bezierPts, trozo
//  Hilos y costuras:  hilo, chincheta, puntadas
//  Accesorios:        flecha, flechaPath, sello, etiqueta, escribir, reloj, huracan, espiralPath,
//                     nube, persona, personaArriba, atomo, estrellaColgante, remolino, lavabo,
//                     paisajeEcuador
//  Tierra:            tierra (globo con continentes, gira con lon0, se inclina con lat0, se achata),
//                     proyectarGlobo, tierraPlana (mapa equirrectangular), CONTINENTES
//  Fondos y marco:    fondoNoche, marco
// =====================================================================================

export const W = 1920, H = 1080, FPS = 12;
export const TAU = Math.PI * 2, PI = Math.PI, D2R = PI / 180;

// ---------------------------------------------------------------- paleta (del demo + ampliada)
export const C = {
  bg: '#0b1027', sky: '#111933',
  // capas oscuras con saltos de valor claros (petición del revisor del demo)
  ring1: '#17214a', ring2: '#1f2b5a', ring3: '#283669',
  nube1: '#33437a', nube2: '#253262', nube3: '#161e44', frame: '#080c1b',
  ivory: '#f1e5c7', ivory2: '#e4d4ab', ivory3: '#d6c393', card: '#ebdfc0', ink: '#1a2342', ink2: '#2b3561',
  gold: '#e2ad47', goldD: '#b7832f', goldL: '#f3cf77',
  coral: '#d6624a', coralD: '#a64733', coralL: '#e98a6e',
  mustard: '#dfa743', mustardD: '#b07f2c',
  teal: '#2a6a7c', teal2: '#4d8d99', tealD: '#1d4e5c', sage: '#95af7f', sageD: '#6f8c5f', sand: '#d9b46a',
  moonDark: '#2b3967', backing: '#1d2a54', skin: '#efd0ad', skinD: '#d6ad86', hair: '#3a2a22',
  dsky: '#1a2652', hillA: '#2b3d6c', hillB: '#285462', hillC: '#3d7364', tree: '#1d4250',
  // ampliación ep02
  agua: '#3f8fa3', aguaD: '#2a6a7c', aguaL: '#8cc3c8', aguaLL: '#c4e0dc',
  loza: '#f4eedf', lozaD: '#d9cfba', metal: '#b9bfc6', metalD: '#7d858f',
  madera: '#b9773f', maderaD: '#8e5a2e', maderaL: '#d39a5c',
  plum: '#7a4a6e', plumD: '#5a3552', blue: '#4f6fb0', blueD: '#37508a', rose: '#e7a59a',
  hielo: '#eee6d4', suelo: '#c9a46a', sueloD: '#a8844f',
};

// ---------------------------------------------------------------- utilidades
export function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function hsh(a, b) { let h = Math.imul(a + 0x9e3779b9 | 0, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15 | 0, 0xc2b2ae35); h = Math.imul(h ^ h >>> 15, 0x2c1b3c6d); h = Math.imul(h ^ h >>> 12, 0x297a2d39); h ^= h >>> 15; return (h >>> 0) / 4294967296; }
export const cl = (x) => x < 0 ? 0 : x > 1 ? 1 : x;
/** progreso 0..1 de t entre a y b */
export const seg = (t, a, b) => cl((t - a) / (b - a));
export const eio = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
export const eout = (x) => 1 - Math.pow(1 - x, 3);
export const ein = (x) => x * x * x;
export const eback = (x, c1 = 1.4) => { const c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
export const eiob = (x) => { const c2 = 1.2 * 1.525; return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2; };
export const lerp = (a, b, u) => a + (b - a) * u;
/** ángulo de brazo (persona) para señalar hacia (dx, dy) desde el hombro */
export const aimAt = (dx, dy) => Math.atan2(-dx, dy);
/** mezcla dos colores '#rrggbb' (u = 0 → a, 1 → b) */
export function mezcla(a, b, u) {
  const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join('');
}
function mk(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; }
// Lienzos en CPU: en el servidor sin GPU (SwiftShader) cada orden de dibujo acelerada cuesta mucho;
// con willReadFrequently Chrome usa Skia por software, mucho más rápido para muchas piezas pequeñas.
let CPU = true;
const ctx2d = (c) => c.getContext('2d', CPU ? { willReadFrequently: true } : undefined);

// ---------------------------------------------------------------- estado
/** contexto 2D en el que se dibuja ahora (enlace vivo) */
export let g = null;
/** fotograma de stop-motion (12 fps) */
export let F = 0;
let main = null, cv = null, ELEV = 0, ultimo = null, marcoSp = null, FUENTE = 'Fraunces';
// zoom físico (copia de prueba): ZF activo → textura a tamaño de pantalla y sombra ∝ escala
let ZF = false, LX = 0.6, LY = 1.05;
const escalaActual = () => { const m = g.getTransform(); return Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1; };
/** dibuja fn con «zoom físico»: fibras a tamaño de pantalla y sombras que crecen con la escala */
export function zoomFisico(fn) { const p = ZF; ZF = true; try { fn(); } finally { ZF = p; } }
/** dirección de la sombra por unidad de altura (por defecto 0.6, 1.05: luz arriba-izquierda) */
export function luz(dx = 0.6, dy = 1.05) { LX = dx; LY = dy; }

// ---------------------------------------------------------------- textura de papel (mosaico continuo)
let TEXA, TEXB;
function hacerTexturas() {
  const N = 512, r = rng(1234);
  const oct = [[4, .5], [8, .32], [16, .2], [32, .13], [128, .09]].map(([gg, a]) => {
    const L = new Float32Array(gg * gg); for (let i = 0; i < L.length; i++) L[i] = r() * 2 - 1; return { gg, a, L };
  });
  const A = mk(N, N), a = ctx2d(A), ia = a.createImageData(N, N);
  const B = mk(N, N), b = ctx2d(B), ib = b.createImageData(N, N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let s = 0;
    for (const o of oct) {
      const fx = x / N * o.gg, fy = y / N * o.gg, x0 = fx | 0, y0 = fy | 0;
      let tx = fx - x0, ty = fy - y0; tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
      const x1 = (x0 + 1) % o.gg, y1 = (y0 + 1) % o.gg, L = o.L, q = o.gg;
      const p = L[y0 * q + x0], qq = L[y0 * q + x1], m = L[y1 * q + x0], n = L[y1 * q + x1];
      const top = p + (qq - p) * tx, bot = m + (n - m) * tx;
      s += o.a * (top + (bot - top) * ty);
    }
    const gr = r() * 2 - 1, i = (y * N + x) * 4;
    const v = 239 + 13 * s + 6 * gr;
    ia.data[i] = v; ia.data[i + 1] = v - 1.5; ia.data[i + 2] = v - 4; ia.data[i + 3] = 255;
    const w = Math.max(0, 16 * s + 4 * gr);
    ib.data[i] = w; ib.data[i + 1] = w * 0.97; ib.data[i + 2] = w * 0.9; ib.data[i + 3] = 255;
  }
  a.putImageData(ia, 0, 0); b.putImageData(ib, 0, 0);
  for (let k = 0; k < 900; k++) {
    const light = r() < 0.6, cx = light ? b : a;
    const pts = []; let px = r() * N, py = r() * N, an = r() * TAU; const len = 5 + Math.pow(r(), 1.6) * 34;
    for (let s = 0; s <= 6; s++) { pts.push([px, py]); an += (r() - 0.5) * 0.8; px += Math.cos(an) * len / 6; py += Math.sin(an) * len / 6; }
    cx.lineWidth = 0.35 + r() * 0.85; cx.lineCap = 'round';
    cx.strokeStyle = light ? `rgba(255,246,228,${0.18 + r() * 0.4})` : `rgba(96,78,60,${0.06 + r() * 0.13})`;
    for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) {
      cx.beginPath(); cx.moveTo(pts[0][0] + ox, pts[0][1] + oy);
      for (let s = 1; s < pts.length; s++) cx.lineTo(pts[s][0] + ox, pts[s][1] + oy);
      cx.stroke();
    }
  }
  for (let k = 0; k < 160; k++) {
    const x = r() * N, y = r() * N, rr = 0.4 + r() * 0.9;
    a.fillStyle = `rgba(80,64,50,${0.1 + r() * 0.15})`; a.beginPath(); a.arc(x, y, rr, 0, TAU); a.fill();
  }
  TEXA = A; TEXB = B;
}
function pats(c) {
  if (!c.__pa) { c.__pa = c.createPattern(TEXA, 'repeat'); c.__pb = c.createPattern(TEXB, 'repeat'); }
  return c;
}

// ---------------------------------------------------------------- lienzo
/**
 * Prepara la página: lienzo 1920x1080 (usa <canvas id="c"> si existe), bandas por CSS si la
 * ventana no es 16:9, texturas de papel y la fuente Fraunces (para números y símbolos).
 * opciones: { bandas: color de las bandas (C.bg), fuente: true }
 */
export async function preparar(o = {}) {
  const bandas = o.bandas ?? C.bg;
  if (o.cpu === false) CPU = false;
  cv = document.getElementById('c');
  if (!cv) { cv = document.createElement('canvas'); cv.id = 'c'; document.body.appendChild(cv); }
  cv.width = W; cv.height = H;
  const st = document.createElement('style');
  st.textContent = `html,body{margin:0;height:100%;background:${bandas};overflow:hidden}
    #c{position:fixed;inset:0;width:100%;height:100%;display:block;object-fit:contain;background:${bandas}}`;
  document.head.appendChild(st);
  main = ctx2d(cv);
  g = main;
  if (o.fuente !== false) {
    try {
      if (!document.querySelector('link[data-papel-fuente]')) {
        const ln = document.createElement('link');
        ln.rel = 'stylesheet'; ln.dataset.papelFuente = '1';
        ln.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600..900;1,9..144,500..700&display=block';
        const cargada = new Promise((r) => { ln.onload = r; ln.onerror = r; setTimeout(r, 6000); });
        document.head.appendChild(ln);
        await cargada;
      }
      await Promise.race([
        Promise.all([
          document.fonts.load('900 80px Fraunces', '0123456789MITNSEDC h%½×−+°'),
          document.fonts.load('700 40px Fraunces', '0123456789MITNSEDC h%½×−+°'),
        ]),
        new Promise((r) => setTimeout(r, 6000)),
      ]);
    } catch (e) { /* sin red: se usa la fuente de respaldo */ }
  }
  hacerTexturas();
  return { canvas: cv, g: main };
}

/**
 * Lienzo fuera de pantalla dibujado UNA vez (para capas fijas). Dentro de `dibujar`, K.g apunta
 * a ese lienzo, en coordenadas de diseño. Devuelve el canvas (se pega con g.drawImage(c, 0, 0)).
 */
export function capa(dibujar, w = W, h = H) {
  const c = mk(w, h), prev = g;
  g = ctx2d(c);
  try { dibujar(g); } finally { g = prev; }
  return c;
}

/**
 * Pieza compuesta en caché con el origen en el centro: dibuja una vez `dibujar()` en un lienzo
 * de (w + 2·pad) x (h + 2·pad) con (0,0) en su centro. Devuelve { c, ox, oy, w, h }.
 * Se pega con K.pegar(sp, x, y, { rot, esc, d }). Útil para objetos fijos con muchas piezas
 * (sus sombras internas quedan hechas). Ojo: si el sprite gira, gira también su filo de luz.
 */
export function sprite(w, h, dibujar, pad = 30) {
  const cw = w + 2 * pad, ch = h + 2 * pad, c = mk(cw, ch), prev = g;
  g = ctx2d(c); g.translate(cw / 2, ch / 2);
  try { dibujar(g); } finally { g = prev; }
  return { c, ox: cw / 2, oy: ch / 2, w: cw, h: ch };
}

/** pega un sprite en (x, y) con rotación/escala opcionales y sombra extra opcional (o.d) */
export function pegar(sp, x = 0, y = 0, o = {}) {
  g.save(); g.translate(x, y);
  if (o.rot) g.rotate(o.rot);
  if (o.esc && o.esc !== 1) g.scale(o.esc, o.esc);
  if (o.alfa != null) g.globalAlpha = o.alfa;
  if (o.d) sombra(o.d, o.sa ?? 0.5);
  g.drawImage(sp.c, -sp.ox, -sp.oy);
  if (o.d) sinSombra();
  g.restore();
}

/**
 * Compone el instante t: fondo (capa fija o color), la escena (`dibujar(t)`), el marco de papel
 * y el parpadeo de exposición. Si t es el mismo que el último dibujado no hace nada.
 * opciones: { fondo: canvas | color, marco: true, parpadeo: true }
 */
export function fotograma(t, dibujar, o = {}) {
  const clave = t + '|' + (o.clave ?? '');
  if (ultimo === clave) return;
  ultimo = clave;
  F = Math.round(t * FPS + 1e-6);
  g = main; ELEV = 0;
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  if (o.fondo && typeof o.fondo !== 'string') g.drawImage(o.fondo, 0, 0);
  else { g.fillStyle = o.fondo || C.bg; g.fillRect(0, 0, W, H); }
  g.save();
  try { dibujar(t); } finally { g = main; g.restore(); ELEV = 0; }
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  sinSombra();
  if (o.marco !== false) marco();
  if (o.parpadeo !== false) {
    const fl = hsh(F, 999) - 0.5;
    g.fillStyle = fl > 0 ? `rgba(255,238,210,${fl * 0.03})` : `rgba(0,0,8,${-fl * 0.05})`;
    g.fillRect(0, 0, W, H);
  }
}

// ---------------------------------------------------------------- pieza de papel
export function sinSombra() { g.shadowColor = 'rgba(0,0,0,0)'; g.shadowBlur = 0; g.shadowOffsetX = 0; g.shadowOffsetY = 0; }
/** sombra de una pieza a altura d (la luz viene de arriba-izquierda) */
export function sombra(d, a = 0.55) {
  g.shadowColor = `rgba(3,5,14,${a})`; g.shadowBlur = 1.5 + d * 2.1;
  g.shadowOffsetX = d * LX; g.shadowOffsetY = d * LY;
}
/** textura de fibras sobre la pieza (ta: multiplicar, tb: trama clara) */
export function textura(path, seed = 0, ta = 1, tb = 0.55, rule = 'nonzero') {
  pats(g);
  const k = ZF ? 1 / escalaActual() : 1;
  const M = new DOMMatrix([k, 0, 0, k, ((seed * 137.31) % 512) * k, ((seed * 91.77) % 512) * k]);
  g.save();
  if (ta > 0) { g.__pa.setTransform(M); g.globalCompositeOperation = 'multiply'; g.globalAlpha = ta; g.fillStyle = g.__pa; g.fill(path, rule); }
  if (tb > 0) { g.__pb.setTransform(M); g.globalCompositeOperation = 'screen'; g.globalAlpha = tb; g.fillStyle = g.__pb; g.fill(path, rule); }
  g.restore();
}
/**
 * Filo de luz arriba-izquierda y filo oscuro abajo-derecha (en píxeles de pantalla: la luz no
 * gira con la pieza). Necesita path.bb.
 */
export function filo(path, rule = 'nonzero', a = 1) {
  const bb = path.bb; if (!bb) return;
  const m = g.getTransform(), det = m.a * m.d - m.b * m.c, sc = Math.sqrt(Math.abs(det)) || 1;
  const loc = (dx, dy) => [(m.d * dx - m.c * dy) / det, (-m.b * dx + m.a * dy) / det];
  const mg = 4 / sc;
  g.save(); g.clip(path, rule);
  const band = (dx, dy, col) => {
    const [lx, ly] = loc(dx, dy), ex = mg + Math.abs(lx), ey = mg + Math.abs(ly), p = new Path2D();
    p.rect(bb[0] - ex, bb[1] - ey, bb[2] - bb[0] + 2 * ex, bb[3] - bb[1] + 2 * ey);
    p.addPath(path, new DOMMatrix([1, 0, 0, 1, lx, ly]));
    g.fillStyle = col; g.fill(p, 'evenodd');
  };
  band(1.15, 1.7, `rgba(255,244,222,${0.4 * a})`);
  band(-0.8, -1.2, `rgba(16,10,6,${0.32 * a})`);
  g.restore();
}
/**
 * Pieza de papel. opciones:
 *  d: altura (sombra) [3] · sa: opacidad de sombra [0.5] · seed: desplaza la textura
 *  ta / tb: intensidad de textura [1 / 0.55] · edge: filo de luz [1] · rule: 'nonzero'|'evenodd'
 *  print: función que imprime detalles DENTRO de la pieza (recortada a ella), antes de la textura
 */
export function papel(path, col, o = {}) {
  let d = (o.d ?? 3) + ELEV; const rule = o.rule || 'nonzero';
  if (ZF) d *= Math.min(4, Math.max(0.3, escalaActual()));
  g.fillStyle = col;
  if (d > 0) {
    sombra(d, o.sa ?? 0.5); g.fill(path, rule);
    if (d > 1.2) {
      g.shadowColor = 'rgba(3,5,14,0.42)'; g.shadowBlur = 1.1;
      g.shadowOffsetX = Math.min(d, 2.5) * 0.35 * LX / 0.6; g.shadowOffsetY = Math.min(d, 2.5) * 0.6 * LY / 1.05;
      g.fill(path, rule);
    }
    sinSombra();
  } else g.fill(path, rule);
  if (o.print) { g.save(); g.clip(path, rule); o.print(g); g.restore(); }
  textura(path, o.seed ?? 0, o.ta ?? 1, o.tb ?? 0.55, rule);
  const e = o.edge ?? 1;
  if (e > 0) filo(path, rule, e);
}
/** temblor de stop-motion: desplaza y gira g un poco, distinto en cada fotograma (id = pieza) */
export function temblor(id, amp = 0.6, ra = 0.0035) {
  g.translate((hsh(F, id * 3 + 1) - 0.5) * 2 * amp, (hsh(F, id * 3 + 2) - 0.5) * 2 * amp);
  g.rotate((hsh(F, id * 3 + 3) - 0.5) * 2 * ra);
}
/** dibuja `fn` con todas las piezas `d` más altas (p. ej. mientras una mano las levanta) */
export function elevar(d, fn) { const prev = ELEV; ELEV += d; try { fn(); } finally { ELEV = prev; } }
/**
 * Para piezas que se posan (u: 0 = en el aire / fuera, 1 = posada). Devuelve
 * { dx, dy, s, d, vis }: desplazamiento hacia la lámpara, escala, altura extra y si se ve.
 * Uso: const p = K.colocar(u); g.translate(x + p.dx, y + p.dy); g.scale(p.s, p.s); K.elevar(p.d, ...)
 */
export function colocar(u, o = {}) {
  const amp = o.amp ?? 1;
  if (u <= 0) return { dx: 0, dy: 0, s: 1, d: 0, vis: false };
  const v = eback(cl(u), o.rebote ?? 1.2), L = 1 - v;
  return { dx: -26 * L * amp, dy: -36 * L * amp, s: 1 + 0.14 * L * amp, d: Math.max(0, 12 * L * amp), vis: true };
}

// ---------------------------------------------------------------- formas cortadas a mano
function wob(seed, amp, n = 5) {
  const r = rng(seed), hs = [];
  for (let i = 0; i < n; i++) hs.push([2 + Math.floor(r() * 7) + i * 2, r() * TAU, amp * (0.5 + r() * 0.5) / (1 + i * 0.7)]);
  return (th) => { let s = 0; for (const [k, p, a] of hs) s += a * Math.sin(k * th + p); return s; };
}
function bbOf(pts, bb) {
  let [x0, y0, x1, y1] = bb || [1e9, 1e9, -1e9, -1e9];
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return [x0, y0, x1, y1];
}
/** polígono cerrado (añade un subtrazado a p si se pasa) */
export function poligono(pts, p = new Path2D()) { pts.forEach(([x, y], i) => i ? p.lineTo(x, y) : p.moveTo(x, y)); p.closePath(); p.bb = bbOf(pts, p.bb); return p; }
/** contorno suavizado (curvas por los puntos medios) */
export function suave(pts, p = new Path2D()) {
  const n = pts.length;
  const mid = (i) => [(pts[i % n][0] + pts[(i + 1) % n][0]) / 2, (pts[i % n][1] + pts[(i + 1) % n][1]) / 2];
  const m0 = mid(n - 1); p.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) { const m = mid(i); p.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1]); }
  p.closePath(); p.bb = bbOf(pts, p.bb); return p;
}
/** puntos de un círculo cortado a mano (amp: ondulación; scal/sn: festón) */
export function circuloPts(R, seed = 1, amp = 0.006, scal = 0, sn = 0, rx = 1, ry = 1) {
  const w = wob(seed, amp), n = Math.max(40, Math.round(R * 0.9)), pts = [];
  for (let i = 0; i < n; i++) {
    const th = i / n * TAU; let r = R * (1 + w(th));
    if (scal) r += scal * (Math.pow(Math.abs(Math.sin(sn * th / 2)), 0.55) - 0.75);
    pts.push([r * Math.cos(th) * rx, r * Math.sin(th) * ry]);
  }
  return pts;
}
export function circulo(R, seed = 1, amp = 0.006, scal = 0, sn = 0) { return poligono(circuloPts(R, seed, amp, scal, sn)); }
/** elipse cortada a mano */
export function elipse(rx, ry, seed = 1, amp = 0.006) { return poligono(circuloPts(Math.max(rx, ry), seed, amp, 0, 0, rx / Math.max(rx, ry), ry / Math.max(rx, ry))); }
/** corona circular (usar rule 'evenodd') */
export function anillo(R1, R2, seed = 1) { const p = poligono(circuloPts(R2, seed, 0.003)); poligono(circuloPts(R1, seed + 1, 0.003), p); return p; }
/** mancha orgánica (nubes, charcos) */
export function mancha(R, seed = 1, amp = 0.18, n = 9, aplast = 0.85) {
  const r = rng(seed), pts = [];
  for (let i = 0; i < n; i++) { const th = i / n * TAU + (r() - 0.5) * 0.3, rr = R * (1 + (r() - 0.5) * 2 * amp); pts.push([rr * Math.cos(th), rr * Math.sin(th) * aplast]); }
  return suave(pts);
}
export function estrella(R, ri, nPts = 5, rot = -PI / 2, seed = 1) {
  const r = rng(seed), pts = [];
  for (let i = 0; i < nPts * 2; i++) {
    const th = rot + i / (nPts * 2) * TAU, rr = (i % 2 ? ri : R) * (1 + (r() - 0.5) * 0.06);
    pts.push([rr * Math.cos(th), rr * Math.sin(th)]);
  }
  return poligono(pts);
}
export function rect(x, y, w, h, r = 0) { const p = new Path2D(); p.roundRect(x, y, w, h, r); p.bb = [x, y, x + w, y + h]; return p; }
/** puntos de un rectángulo redondeado con ondulación de tijera */
export function rectRecortadoPts(x, y, w, h, rad, seed = 1, amp = 1.2) {
  rad = Math.min(rad, w / 2 - 0.01, h / 2 - 0.01);
  const st = 6, wv = wob(seed, 1, 6), pts = [];
  const per = 2 * (w + h - 4 * rad) + TAU * rad, n = Math.max(12, Math.round(per / st));
  const sides = [w - 2 * rad, PI / 2 * rad, h - 2 * rad, PI / 2 * rad, w - 2 * rad, PI / 2 * rad, h - 2 * rad, PI / 2 * rad];
  const P = (s) => {
    let k = 0; while (s > sides[k] && k < 7) { s -= sides[k]; k++; }
    switch (k) {
      case 0: return [x + rad + s, y, 0, -1];
      case 1: { const a = -PI / 2 + s / rad; return [x + w - rad + rad * Math.cos(a), y + rad + rad * Math.sin(a), Math.cos(a), Math.sin(a)]; }
      case 2: return [x + w, y + rad + s, 1, 0];
      case 3: { const a = s / rad; return [x + w - rad + rad * Math.cos(a), y + h - rad + rad * Math.sin(a), Math.cos(a), Math.sin(a)]; }
      case 4: return [x + w - rad - s, y + h, 0, 1];
      case 5: { const a = PI / 2 + s / rad; return [x + rad + rad * Math.cos(a), y + h - rad + rad * Math.sin(a), Math.cos(a), Math.sin(a)]; }
      case 6: return [x, y + h - rad - s, -1, 0];
      default: { const a = PI + s / rad; return [x + rad + rad * Math.cos(a), y + rad + rad * Math.sin(a), Math.cos(a), Math.sin(a)]; }
    }
  };
  for (let i = 0; i < n; i++) { const [px, py, nx, ny] = P(i / n * per); const o = wv(i / n * TAU) * amp; pts.push([px + nx * o, py + ny * o]); }
  return pts;
}
export function rectRecortado(x, y, w, h, rad, seed = 1, amp = 1.2) { return poligono(rectRecortadoPts(x, y, w, h, rad, seed, amp)); }
/** fase lunar: lado iluminado hacia +x (side=1) o -x (side=-1); k=1 nueva, 0 cuarto, -1 llena */
export function fase(R, k, side, seed = 1) {
  const w = wob(seed, 0.006), n = Math.max(24, Math.round(R * 0.5)), p = new Path2D();
  for (let i = 0; i <= n; i++) { const th = -PI / 2 + i / n * PI, r = R * (1 + w(th)); const x = side * r * Math.cos(th), y = r * Math.sin(th); i ? p.lineTo(x, y) : p.moveTo(x, y); }
  for (let i = 1; i < n; i++) { const th = PI / 2 - i / n * PI; p.lineTo(side * k * R * Math.cos(th) * (1 + w(th + 2) * 0.6), R * Math.sin(th)); }
  p.closePath(); p.bb = [-R * 1.05, -R * 1.05, R * 1.05, R * 1.05]; return p;
}
/**
 * Tira de papel a lo largo de una polilínea (ancho = semiancho, número o función de 0..1).
 * Uniones a inglete. Sirve para órbitas, cintas, trazos de ✓, mangos…
 */
export function tira(pts, ancho = 4, p = new Path2D()) {
  const n = pts.length; if (n < 2) return p;
  const L = [0]; for (let i = 1; i < n; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tot = L[n - 1] || 1, wf = typeof ancho === 'function' ? ancho : () => ancho;
  const nrm = (i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], c = pts[i];
    let n1x = 0, n1y = 0, k = 0;
    if (i > 0) { const dx = c[0] - a[0], dy = c[1] - a[1], l = Math.hypot(dx, dy) || 1; n1x += -dy / l; n1y += dx / l; k++; }
    if (i < n - 1) { const dx = b[0] - c[0], dy = b[1] - c[1], l = Math.hypot(dx, dy) || 1; n1x += -dy / l; n1y += dx / l; k++; }
    const l = Math.hypot(n1x, n1y) || 1; let nx = n1x / l, ny = n1y / l;
    // inglete: alarga en las esquinas
    if (i > 0 && i < n - 1) {
      const dx = c[0] - a[0], dy = c[1] - a[1], ll = Math.hypot(dx, dy) || 1, cs = (nx * -dy / ll + ny * dx / ll);
      const f = 1 / Math.max(0.35, cs); nx *= f; ny *= f;
    }
    return [nx, ny];
  };
  const left = [], right = [];
  for (let i = 0; i < n; i++) { const [nx, ny] = nrm(i), w = wf(L[i] / tot); left.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); right.push([pts[i][0] - nx * w, pts[i][1] - ny * w]); }
  return poligono([...left, ...right.reverse()], p);
}
/** copia de un trazado escalada (en caché) */
const escalados = new Map();
export function escalar(p, k) {
  if (!escalados.has(p)) escalados.set(p, new Map());
  const m = escalados.get(p);
  if (!m.has(k)) { const q = new Path2D(); q.addPath(p, new DOMMatrix([k, 0, 0, k, 0, 0])); q.bb = p.bb.map((v) => v * k); m.set(k, q); }
  return m.get(k);
}
/** puntos de un arco de elipse (ángulos en radianes, en sentido del lienzo) */
export function arcoPts(cx, cy, rx, ry, a0, a1, n = 40) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  return pts;
}
/** puntos de una curva de Bézier cúbica */
export function bezierPts(a, b, c, d, n = 40) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n, v = 1 - u;
    pts.push([v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0], v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1]]);
  }
  return pts;
}
/** recorta una polilínea a la fracción [u0, u1] de su longitud */
export function trozo(pts, u0, u1) {
  const n = pts.length, L = [0];
  for (let i = 1; i < n; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tot = L[n - 1], a = u0 * tot, b = u1 * tot, out = [];
  const at = (s) => { let i = 1; while (i < n - 1 && L[i] < s) i++; const k = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; };
  out.push(at(a));
  for (let i = 0; i < n; i++) if (L[i] > a && L[i] < b) out.push(pts[i]);
  out.push(at(b));
  return out;
}

// ---------------------------------------------------------------- hilos, chinchetas, costuras
/** chincheta dorada (encuadernador) */
export function chincheta(x, y, r = 8.5) {
  g.save(); g.translate(x, y); g.scale(r / 8.5, r / 8.5);
  const gr = g.createRadialGradient(-3, -3.5, 1, 0, 0, 9.5);
  gr.addColorStop(0, '#fbe7a8'); gr.addColorStop(0.45, '#d6a94e'); gr.addColorStop(1, '#8a6224');
  sombra(1.6, 0.6); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 8.5, 0, TAU); g.fill(); sinSombra();
  g.fillStyle = 'rgba(255,250,225,0.55)'; g.beginPath(); g.ellipse(-2.8, -3.4, 2.4, 1.5, -0.6, 0, TAU); g.fill();
  g.restore();
}
/** hilo recto (para colgar piezas) */
export function hilo(x1, y1, x2, y2, a = 0.75, ancho = 1.4) {
  g.save(); sombra(1.6, 0.45); g.strokeStyle = `rgba(226,216,196,${a})`; g.lineWidth = ancho; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); sinSombra(); g.restore();
}
/**
 * Costura de hilo (línea discontinua con sombra) por una polilínea, de la fracción u0 a u1.
 * o: { col: 'rgb(...)'|'#..', ancho: 3, guion: [11, 9], nudos: true, d: 1.8 }
 */
export function puntadas(pts, o = {}) {
  const u0 = o.u0 ?? 0, u1 = o.u1 ?? 1; if (u1 - u0 < 0.005) return;
  const q = (u0 > 0 || u1 < 1) ? trozo(pts, u0, u1) : pts;
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash(o.guion ?? [11, 9]); g.lineDashOffset = o.desfase ?? 0;
  sombra(o.d ?? 1.8, 0.5); g.strokeStyle = o.col ?? C.ivory; g.lineWidth = o.ancho ?? 3;
  g.beginPath(); q.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke();
  g.setLineDash([]);
  if (o.nudos !== false) {
    g.fillStyle = o.col ?? C.ivory;
    const knot = (x, y) => { g.beginPath(); g.arc(x, y, (o.ancho ?? 3) * 1.4, 0, TAU); g.fill(); };
    if (u0 < 0.02) knot(...pts[0]);
    if (u1 > 0.98) knot(...pts[pts.length - 1]);
  }
  sinSombra(); g.restore();
}

// ---------------------------------------------------------------- flechas
/**
 * Trazado de una flecha de papel que sigue la polilínea pts (desde pts[0] hasta la punta).
 * o: { ancho: semiancho del cuerpo (7), punta: largo de la punta (24), alas: ancho de la punta
 *      respecto al cuerpo (2.3), u: fracción ya "dibujada" (crece desde el origen), cola: 0..1
 *      para recortar el principio (flecha que viaja) }
 */
export function flechaPath(pts, o = {}) {
  const u = o.u ?? 1, u0 = o.cola ?? 0; if (u - u0 <= 0.003) return null;
  const q = trozo(pts, u0, u);
  const n = q.length, L = [0];
  for (let i = 1; i < n; i++) L.push(L[i - 1] + Math.hypot(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]));
  const tot = L[n - 1]; if (tot < 3) return null;
  const ancho = o.ancho ?? 7, head = Math.min(o.punta ?? 24, tot * 0.7), alas = o.alas ?? 2.3;
  const body = trozo(q, 0, Math.max(0.001, (tot - head) / tot));
  const tip = q[n - 1], base = body[body.length - 1];
  let tx = tip[0] - base[0], ty = tip[1] - base[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
  const nx = -ty, ny = tx, wh = ancho * alas;
  const p = new Path2D();
  // cuerpo (tira) + punta (triángulo) como un solo contorno
  const bw = typeof o.anchoFn === 'function' ? o.anchoFn : () => ancho;
  const m = body.length, BL = [0];
  for (let i = 1; i < m; i++) BL.push(BL[i - 1] + Math.hypot(body[i][0] - body[i - 1][0], body[i][1] - body[i - 1][1]));
  const left = [], right = [];
  for (let i = 0; i < m; i++) {
    const a = body[Math.max(0, i - 1)], b = body[Math.min(m - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const w = bw(BL[i] / (BL[m - 1] || 1));
    left.push([body[i][0] - dy * w, body[i][1] + dx * w]); right.push([body[i][0] + dy * w, body[i][1] - dx * w]);
  }
  const pts2 = [...left, [base[0] + nx * wh, base[1] + ny * wh], tip, [base[0] - nx * wh, base[1] - ny * wh], ...right.reverse()];
  return poligono(pts2, p);
}
/** flecha de papel dibujada (o: los de flechaPath + col, d, seed, edge) */
export function flecha(pts, o = {}) {
  const p = flechaPath(pts, o); if (!p) return;
  papel(p, o.col ?? C.ink, { d: o.d ?? 2.4, seed: o.seed ?? 7, tb: o.tb ?? 0.5, edge: o.edge ?? 0.8, sa: o.sa });
}

// ---------------------------------------------------------------- sello ✓ / ✗
const SELLOS = {};
function selloPiezas(R) {
  const k = 'R' + R;
  if (!SELLOS[k]) {
    const s = R / 80;
    SELLOS[k] = {
      disco: circulo(R, 14, 0.004, 6.5 * s, 22),
      dentro: circulo(R * 0.8, 15, 0.005),
      cruz: (() => {
        // un solo contorno (sin solapes, para que la textura y el filo no marquen el cruce)
        const a = 9.5 * s, L = 42 * s, q = [[a, a], [L, a], [L, -a], [a, -a], [a, -L], [-a, -L], [-a, -a], [-L, -a], [-L, a], [-a, a], [-a, L], [a, L]];
        const c = Math.SQRT1_2; return poligono(q.map(([x, y]) => [c * (x - y), c * (x + y)]));
      })(),
      check: tira([[-33 * s, 2 * s], [-10 * s, 26 * s], [34 * s, -28 * s]], 9.5 * s),
    };
  }
  return SELLOS[k];
}
/**
 * Sello de papel ✓ o ✗ que cae y se posa. u: 0 = no está, 1 = posado (con rebote).
 * o: { R: 80, rot: -0.12, col (fondo), ink (signo), id }
 */
export function sello(x, y, tipo, u, o = {}) {
  if (u <= 0) return;
  const R = o.R ?? 80, S = selloPiezas(R), id = o.id ?? 900;
  const v = eback(cl(u), 1.6), L = 1 - v;
  const bien = tipo === '✓' || tipo === 'si' || tipo === true;
  const col = o.col ?? (bien ? C.sage : C.coral), colD = o.colD ?? (bien ? C.sageD : C.coralD), ink = o.ink ?? C.ivory;
  g.save(); g.translate(x - 30 * L, y - 46 * L); temblor(id, 0.5, 0.01); g.rotate((o.rot ?? -0.12) + L * 0.5);
  const s = 1 + 0.55 * Math.max(0, L); g.scale(s, s);
  elevar(Math.max(0, L) * 16, () => {
    papel(S.disco, col, { d: 3.5, seed: id, sa: 0.6, tb: 0.45, print: () => {
      g.strokeStyle = 'rgba(255,240,220,0.5)'; g.lineWidth = 1.6; g.setLineDash([4, 4.5]);
      g.beginPath(); g.arc(0, 0, R * 0.88, 0, TAU); g.stroke(); g.setLineDash([]);
    } });
    papel(S.dentro, colD, { d: 1.2, seed: id + 1, tb: 0.4, edge: 0.7 });
    papel(bien ? S.check : S.cruz, ink, { d: 2.2, seed: id + 2 });
  });
  g.restore();
}

// ---------------------------------------------------------------- etiquetas con números/símbolos
/** mide/escribe un texto con superíndices '^' (p. ej. '×10^6') */
function runs(txt) {
  const out = []; let sup = false, buf = '';
  for (const ch of txt) {
    if (ch === '^') { if (buf) out.push({ s: buf, sup }); buf = ''; sup = true; continue; }
    if (sup && !/[0-9−\-+]/.test(ch)) { if (buf) out.push({ s: buf, sup }); buf = ''; sup = false; }
    buf += ch;
  }
  if (buf) out.push({ s: buf, sup });
  return out;
}
function medir(txt, size, peso) {
  let w = 0;
  for (const r of runs(txt)) { g.font = `${peso} ${r.sup ? size * 0.62 : size}px ${FUENTE}`; w += g.measureText(r.s).width + (r.sup ? size * 0.04 : 0); }
  return w;
}
/** escribe texto (solo números y símbolos permitidos) centrado en (x, y) (línea base media) */
export function escribir(txt, x, y, o = {}) {
  const size = o.size ?? 40, peso = o.peso ?? 800, col = o.col ?? C.ink;
  const w = medir(txt, size, peso); let cx = x - (o.align === 'left' ? 0 : o.align === 'right' ? w : w / 2);
  g.save(); g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
  for (const r of runs(txt)) {
    g.font = `${peso} ${r.sup ? size * 0.62 : size}px ${FUENTE}`;
    g.fillText(r.s, cx + (r.sup ? size * 0.04 : 0), y + (r.sup ? -size * 0.36 : size * 0.04));
    cx += g.measureText(r.s).width + (r.sup ? size * 0.04 : 0);
  }
  g.restore();
  return w;
}
const ETQ = new Map();
/**
 * Etiqueta de papel con un número o símbolo impreso (p. ej. '×10^6', 'MIT 1962', '24 h', '−½ %').
 * Se cachea como sprite. o: { size: 44, col: fondo, ink: tinta, pad: 22, forma: 'rect'|'bandera'|'circulo',
 * u: colocación 0..1, rot, d, id }
 */
export function etiqueta(x, y, txt, o = {}) {
  const u = o.u ?? 1; if (u <= 0) return;
  const size = o.size ?? 44, col = o.col ?? C.ivory, ink = o.ink ?? C.ink, forma = o.forma ?? 'rect', peso = o.peso ?? 800;
  const key = [txt, size, col, ink, forma, peso, o.seed ?? 0].join('|');
  if (!ETQ.has(key)) {
    const prev = g; g = main;
    const tw = medir(txt, size, peso); g = prev;
    const padx = o.pad ?? size * 0.5, w = tw + padx * 2 + (forma === 'bandera' ? size * 0.4 : 0), h = size * 1.45;
    const sp = sprite(w, h, () => {
      let p;
      if (forma === 'circulo') p = circulo(Math.max(w, h) / 2, 31 + (o.seed ?? 0), 0.006);
      else if (forma === 'bandera') {
        const pts = rectRecortadoPts(-w / 2, -h / 2, w, h, 6, 33 + (o.seed ?? 0), 0.8).filter(([px]) => px < w / 2 - size * 0.4);
        p = poligono([...pts, [w / 2 - size * 0.4, h / 2], [w / 2, h / 2], [w / 2 - size * 0.25, 0], [w / 2, -h / 2], [w / 2 - size * 0.4, -h / 2]]);
      } else p = rectRecortado(-w / 2, -h / 2, w, h, Math.min(14, h * 0.25), 32 + (o.seed ?? 0), 0.9);
      papel(p, col, { d: 0, seed: 40 + (o.seed ?? 0), tb: 0.45, print: () => {
        g.strokeStyle = 'rgba(26,35,66,0.22)'; g.lineWidth = 1.2;
        if (forma === 'circulo') { g.beginPath(); g.arc(0, 0, Math.max(w, h) / 2 - 8, 0, TAU); g.stroke(); }
        else g.strokeRect(-w / 2 + 7, -h / 2 + 7, w - 14 - (forma === 'bandera' ? size * 0.4 : 0), h - 14);
        escribir(txt, forma === 'bandera' ? -size * 0.2 : 0, 0, { size, col: ink, peso });
      } });
    }, 6);
    ETQ.set(key, sp);
  }
  const sp = ETQ.get(key), p = colocar(u);
  g.save(); g.translate(x + p.dx, y + p.dy); temblor(o.id ?? 950, 0.45, 0.004); g.rotate(o.rot ?? 0); g.scale(p.s, p.s);
  sombra((o.d ?? 3.5) + p.d, 0.55); g.drawImage(sp.c, -sp.ox, -sp.oy); sinSombra();
  g.restore();
}

// ---------------------------------------------------------------- reloj / cronómetro
/**
 * Reloj de papel en (x, y) de radio R. frac: posición de la aguja (0..1, desde arriba, horario).
 * o: { marcas: 24|12|60, sector: 0..1 (porción recorrida, coloreada), aro: color, cara: color,
 *      texto: '24 h' (impreso abajo), cronometro: bool (botón arriba), id, aguja2: frac de una
 *      segunda aguja corta }
 */
export function reloj(x, y, R, frac, o = {}) {
  const id = o.id ?? 970, k = 'reloj' + R + (o.cronometro ? 'c' : '') + (o.marcas ?? 12) + (o.texto ?? '') + (o.cara ?? '') + (o.aro ?? '');
  if (!ETQ.has(k)) {
    ETQ.set(k, sprite(2 * R + 40, 2 * R + 80, () => {
      if (o.cronometro) {
        papel(rect(-R * 0.12, -R * 1.28, R * 0.24, R * 0.3, 3), C.metalD, { d: 2, seed: id + 9 });
        papel(rect(-R * 0.2, -R * 1.42, R * 0.4, R * 0.16, 4), o.aro ?? C.coral, { d: 2.2, seed: id + 8 });
        g.save(); g.rotate(0.75); papel(rect(-R * 0.08, -R * 1.2, R * 0.16, R * 0.22, 3), C.metalD, { d: 2, seed: id + 7 }); g.restore();
      }
      papel(circulo(R, id, 0.004), o.aro ?? C.coral, { d: 0, seed: id + 1, tb: 0.45 });
      papel(circulo(R * 0.86, id + 2, 0.004), o.cara ?? C.ivory, { d: 2.2, seed: id + 3, print: () => {
        const n = o.marcas ?? 12;
        g.strokeStyle = C.ink; g.lineCap = 'round';
        for (let i = 0; i < n; i++) {
          const a = i / n * TAU - PI / 2, big = n === 60 ? i % 5 === 0 : n === 24 ? i % 6 === 0 : i % 3 === 0;
          const r1 = R * 0.8, r2 = R * (big ? 0.66 : 0.72);
          g.lineWidth = big ? 3.2 : 1.6; g.globalAlpha = big ? 0.85 : 0.6;
          g.beginPath(); g.moveTo(r1 * Math.cos(a), r1 * Math.sin(a)); g.lineTo(r2 * Math.cos(a), r2 * Math.sin(a)); g.stroke();
        }
        g.globalAlpha = 1;
        if (o.texto) escribir(o.texto, 0, R * 0.38, { size: R * 0.24, col: C.ink, peso: 800 });
      } });
    }));
  }
  const sp = ETQ.get(k);
  g.save(); g.translate(x, y); temblor(id, 0.45, 0.004);
  sombra(o.d ?? 4, 0.55); g.drawImage(sp.c, -sp.ox, -sp.oy); sinSombra();
  if (o.sector > 0) {
    g.save(); g.fillStyle = o.colSector ?? 'rgba(226,173,71,0.42)';
    g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R * 0.62, -PI / 2, -PI / 2 + TAU * Math.min(1, o.sector)); g.closePath(); g.fill(); g.restore();
  }
  const aguja = (f, len, w, col, idd) => {
    g.save(); g.rotate(f * TAU); temblor(idd, 0.3, 0.01);
    papel(poligono([[-w, R * 0.12], [w, R * 0.12], [w * 0.45, -len], [-w * 0.45, -len]]), col, { d: 2.2, seed: idd, edge: 0.6 });
    g.restore();
  };
  if (o.aguja2 != null) aguja(o.aguja2, R * 0.42, R * 0.045, C.ink2, id + 5);
  aguja(frac, R * 0.7, R * 0.04, o.colAguja ?? C.ink, id + 4);
  chincheta(0, 0, Math.max(4, R * 0.08));
  g.restore();
}

// ---------------------------------------------------------------- espirales, huracanes, nubes
/**
 * Trazado de un brazo en espiral: de radio r0 a r1 girando `vuelta` radianes desde a0
 * (vuelta > 0 gira en el sentido del lienzo = horario en pantalla). Ancho máx. w, afilado.
 */
export function espiralPath(r0, r1, a0, vuelta, w, p = new Path2D(), n = 48, cola = false) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const s = i / n, r = lerp(r0, r1, s), a = a0 + vuelta * s; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
  const perfil = cola ? (s) => w * Math.pow(1 - s, 0.85) * (0.75 + 0.25 * Math.sin(s * 9)) + 0.6 : (s) => w * Math.pow(Math.sin(PI * Math.min(1, s * 1.15)), 0.7) + 0.6;
  return tira(pts, perfil, p);
}
const HUR = new Map();
/**
 * Huracán de papel visto desde arriba, en (x, y) con radio R. giro: ángulo actual (rad).
 * sentido: +1 = gira antihorario en pantalla (hemisferio norte), −1 = horario (sur).
 * Las bandas se curvan como en las fotos de satélite de cada hemisferio (se arrastran al girar).
 * Para que se vea girar: giro = −sentido · ω · t.
 */
export function huracan(x, y, R, giro, sentido = 1, o = {}) {
  const id = o.id ?? 980, k = R + '|' + sentido + '|' + id;
  if (!HUR.has(k)) {
    const r = rng(id), bandas = [], finas = [];
    // gira con −sentido; las colas quedan atrás: al salir hacia fuera avanzan en +sentido (lienzo)
    for (let i = 0; i < 3; i++) bandas.push(espiralPath(R * 0.3, R * (0.98 + r() * 0.08), i / 3 * TAU + r() * 0.4, sentido * (2.5 + r() * 0.5), R * (0.2 + r() * 0.04), new Path2D(), 56, true));
    for (let i = 0; i < 3; i++) finas.push(espiralPath(R * 0.36, R * 0.8, i / 3 * TAU + 1.0, sentido * 2.0, R * 0.06, new Path2D(), 40, true));
    HUR.set(k, {
      bandas, finas,
      cuerpo: mancha(R * 0.47, id + 3, 0.08, 11, 1), centro: circulo(R * 0.3, id + 6, 0.02, R * 0.025, 14),
      ojo: circulo(R * 0.085, id + 4, 0.03), ojoA: circulo(R * 0.15, id + 5, 0.02),
    });
  }
  const P = HUR.get(k), d = o.d ?? 3;
  g.save(); g.translate(x, y); temblor(id, 0.5, 0.004); g.rotate(giro);
  if (o.esc) g.scale(o.esc, o.esc);
  P.bandas.forEach((b, i) => papel(b, i % 2 ? C.ivory2 : C.ivory, { d, seed: id + 10 + i, tb: 0.5, edge: 0.7 }));
  papel(P.cuerpo, C.ivory2, { d: d + 0.4, seed: id + 20, tb: 0.5 });
  P.finas.forEach((b, i) => papel(b, C.ivory, { d: 1, seed: id + 30 + i, edge: 0.6 }));
  papel(P.centro, C.ivory, { d: 1.4, seed: id + 21, tb: 0.5 });
  papel(P.ojoA, C.ivory3, { d: 0.8, seed: id + 40, edge: 0.6 });
  papel(P.ojo, o.colOjo ?? C.tealD, { d: 0.6, seed: id + 41, edge: 0.8 });
  g.restore();
}
/** nube de papel (cúmulo) de anchura w; devuelve el trazado (base plana abajo) */
export function nube(w, h, seed = 1) {
  const r = rng(seed), p = new Path2D(), n = 4 + Math.floor(r() * 2);
  const pts = [[-w / 2, 0]];
  for (let i = 0; i <= n * 6; i++) {
    const s = i / (n * 6), x = -w / 2 + s * w;
    const bump = Math.abs(Math.sin(s * n * PI)) ** 0.6, env = Math.sin(s * PI) ** 0.7;
    pts.push([x, -h * env * (0.55 + 0.45 * bump) * (0.9 + r() * 0.08)]);
  }
  pts.push([w / 2, 0]);
  return suave(pts, p);
}

// ---------------------------------------------------------------- agua y lavabo (ep02)
/**
 * Remolino de agua: brazos en espiral claros dentro de una elipse rx × ry (centro en el origen),
 * recortados a ella. giro: ángulo actual; sentido: +1 antihorario en pantalla, −1 horario;
 * fuerza: 0..1 (ancho y número de brazos).
 */
export function remolino(rx, ry, giro, sentido = 1, fuerza = 1, o = {}) {
  if (fuerza <= 0.01) return;
  const id = o.id ?? 1200, R = Math.max(rx, ry), k = 'rem' + R + '|' + sentido + '|' + id;
  if (!ETQ.has(k)) {
    const brazos = [], r = rng(id);
    for (let i = 0; i < 4; i++) brazos.push(espiralPath(R * 0.12, R * (0.92 + r() * 0.1), i / 4 * TAU + r() * 0.5, sentido * (3.4 + r() * 0.6), R * 0.07, new Path2D(), 60, true));
    ETQ.set(k, brazos);
  }
  const brazos = ETQ.get(k), n = Math.max(1, Math.round(4 * Math.min(1, fuerza * 1.3)));
  g.save(); g.scale(1, ry / R); g.rotate(giro);
  for (let i = 0; i < n; i++) {
    g.save(); g.scale(0.55 + 0.45 * fuerza, 0.55 + 0.45 * fuerza);
    papel(brazos[i], o.col ?? C.aguaL, { d: 0.8, seed: id + i, tb: 0.5, edge: 0.6, sa: 0.35 });
    g.restore();
  }
  g.restore();
}
const LAV = {};
/**
 * Lavabo de papel visto desde arriba, centro del seno en (x, y). Mide ~660 × 470 a escala 1.
 * o: { esc: 1, nivel: 0..1 (agua), giro, sentido (+1 antihorario), fuerza (remolino 0..1),
 *      id, encimera: color, extra(g): dibuja sobre el agua (mismas coordenadas) }
 */
export function lavabo(x, y, o = {}) {
  const id = o.id ?? 1100;
  if (!LAV.ok) {
    LAV.base = sprite(700, 520, () => {
      papel(rectRecortado(-330, -250, 660, 470, 44, id, 1), o.encimera ?? C.teal2, { d: 0, seed: id + 1, tb: 0.5, print: () => {
        g.strokeStyle = 'rgba(255,255,255,0.10)'; g.lineWidth = 1.4;
        for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(-330, i * 70); g.lineTo(330, i * 70); g.stroke(); }
        for (let i = -4; i <= 4; i++) { g.beginPath(); g.moveTo(i * 80, -250); g.lineTo(i * 80, 220); g.stroke(); }
      } });
      papel(elipse(244, 178, id + 2, 0.004), C.loza, { d: 3, seed: id + 3, tb: 0.4 });
      papel(elipse(214, 152, id + 4, 0.004), C.lozaD, { d: 0, seed: id + 5, tb: 0.35, edge: 0, print: () => {
        // hueco del seno: sombra arriba-izquierda, luz abajo-derecha
        const gr = g.createLinearGradient(-200, -150, 200, 150);
        gr.addColorStop(0, 'rgba(60,50,40,0.40)'); gr.addColorStop(0.45, 'rgba(60,50,40,0.05)'); gr.addColorStop(1, 'rgba(255,250,235,0.35)');
        g.fillStyle = gr; g.fillRect(-220, -160, 440, 320);
      } });
      // desagüe
      papel(circulo(19, id + 6, 0.01), C.metal, { d: 0.8, seed: id + 7, edge: 0.7 });
      papel(circulo(12, id + 8, 0.01), '#2a2f3a', { d: 0, seed: id + 9, edge: 0.6, print: () => {
        g.strokeStyle = C.metal; g.lineWidth = 2.2; g.beginPath(); g.moveTo(-12, 0); g.lineTo(12, 0); g.moveTo(0, -12); g.lineTo(0, 12); g.stroke();
      } });
    });
    LAV.grifo = sprite(220, 160, () => {
      // base del grifo en (0, 0); el caño baja hacia +y, sobre el seno
      g.save(); g.translate(-62, 0); papel(circulo(16, id + 20, 0.01), C.coral, { d: 2, seed: id + 21, edge: 0.6 }); g.restore();
      g.save(); g.translate(62, 0); papel(circulo(16, id + 22, 0.01), C.blue, { d: 2, seed: id + 23, edge: 0.6 }); g.restore();
      papel(circulo(28, id + 24, 0.01), C.metal, { d: 2.4, seed: id + 25, edge: 0.8 });
      papel(rectRecortado(-11, -6, 22, 76, 10, id + 26, 0.4), C.metal, { d: 3.4, seed: id + 27, edge: 0.8 });
      g.save(); g.translate(0, 64); papel(circulo(12, id + 28, 0.02), C.metalD, { d: 1, seed: id + 29, edge: 0.6 }); g.restore();
    });
    LAV.agua = elipse(200, 140, id + 30, 0.004);
    LAV.brillo = (() => { const p = new Path2D(); p.ellipse(0, 0, 176, 118, 0, PI * 1.08, PI * 1.42); p.ellipse(0, 0, 160, 104, 0, PI * 1.42, PI * 1.08, true); p.closePath(); p.bb = [-180, -120, 0, 0]; return p; })();
    LAV.ok = true;
  }
  const nivel = o.nivel ?? 1;
  g.save(); g.translate(x, y); temblor(id, 0.45, 0.002); if (o.esc && o.esc !== 1) g.scale(o.esc, o.esc);
  sombra(5 + (o.d ?? 0), 0.55); g.drawImage(LAV.base.c, -LAV.base.ox, -LAV.base.oy); sinSombra();
  if (nivel > 0.02) {
    // agua como papel vegetal: deja ver el desagüe
    g.save(); g.scale(nivel, nivel);
    g.globalAlpha = 0.86; papel(LAV.agua, C.agua, { d: 0.6, seed: id + 31, tb: 0.6, edge: 0.6, sa: 0.3 }); g.globalAlpha = 1;
    g.save(); g.clip(LAV.agua);
    remolino(190, 133, o.giro ?? 0, o.sentido ?? 1, o.fuerza ?? 0, { id: id + 40 });
    g.restore();
    papel(LAV.brillo, C.aguaLL, { d: 0.3, seed: id + 32, edge: 0.4, ta: 0.6 });
    g.restore();
  }
  if (o.extra) o.extra(g);
  g.drawImage(LAV.grifo.c, -LAV.grifo.ox, -208 - LAV.grifo.oy);
  g.restore();
}

const PAIS = new Map();
/**
 * Paisaje del ecuador (ep02): colinas lejanas en dos capas, el monumento de la línea con su globo,
 * el suelo de tierra y la línea del ecuador pintada en perspectiva. Devuelve un sprite con el
 * origen en el centro del horizonte: K.pegar(K.paisajeEcuador({ horizonte: 772 }), 960, 772).
 * o: { horizonte: y del horizonte en pantalla (772), monumento: desplazamiento x del monumento
 *      respecto al centro (0; null = sin monumento), escMonumento: 1, linea: true }
 */
export function paisajeEcuador(o = {}) {
  const hz = o.horizonte ?? 772, mx = o.monumento === undefined ? 0 : o.monumento, em = o.escMonumento ?? 1;
  const key = [hz, mx, em, o.linea].join('|');
  if (PAIS.has(key)) return PAIS.get(key);
  const abajo = H + 40 - hz, alto = Math.max(560, abajo) * 2;
  const sp = sprite(2000, alto, () => {
    const sierra = (seed, y0, amp, fr) => {
      const r = rng(seed), p1 = r() * TAU, p2 = r() * TAU, pts = [[-1000, 60]];
      for (let x = -1000; x <= 1000; x += 16) pts.push([x, y0 - amp * (0.6 * Math.sin(x * fr + p1) + 0.4 * Math.sin(x * fr * 2.7 + p2))]);
      pts.push([1000, 60]); return poligono(pts);
    };
    papel(sierra(801, -95, 40, 0.0042), C.ring3, { d: 4, seed: 802, sa: 0.55, tb: 0.45 });
    papel(sierra(803, -42, 26, 0.0061), C.hillA, { d: 4.5, seed: 804, sa: 0.6, tb: 0.45 });
    if (mx != null) {
      g.save(); g.translate(mx, -30); g.scale(em, em);
      papel(poligono([[-62, 0], [62, 0], [40, -300], [-40, -300]]), C.nube1, { d: 4, seed: 805, sa: 0.6, print: () => {
        g.fillStyle = 'rgba(0,0,20,0.18)'; g.fillRect(8, -300, 60, 300);
      } });
      papel(rect(-52, -312, 104, 16, 4), C.ring3, { d: 3, seed: 806 });
      g.translate(0, -362);
      papel(circulo(50, 807, 0.004), C.nube1, { d: 4, seed: 808, print: () => {
        g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 2;
        for (const k of [-0.6, 0, 0.6]) { g.beginPath(); g.ellipse(0, 0, 50 * Math.cos(k), 50, 0, 0, TAU); g.stroke(); }
      } });
      papel(tira(arcoPts(0, 0, 51, 13, 0.05, PI - 0.05, 24), 4.5), C.gold, { d: 1.6, seed: 809 });
      g.restore();
    }
    const r = rng(700), pts = [[-1000, abajo + 20]];
    for (let x = -1000; x <= 1000; x += 20) pts.push([x, 7 * Math.sin(x * 0.011) + 4 * Math.sin(x * 0.037 + 1)]);
    pts.push([1000, abajo + 20]);
    papel(poligono(pts), C.suelo, { d: 6, seed: 701, sa: 0.6, print: () => {
      const gr = g.createLinearGradient(0, 0, 0, abajo);
      gr.addColorStop(0, 'rgba(255,240,210,0.10)'); gr.addColorStop(0.18, 'rgba(0,0,0,0.06)'); gr.addColorStop(0.42, 'rgba(10,8,30,0.42)'); gr.addColorStop(0.7, 'rgba(10,8,30,0.66)'); gr.addColorStop(1, 'rgba(10,8,30,0.78)');
      g.fillStyle = gr; g.fillRect(-1000, -30, 2000, abajo + 60);
      g.fillStyle = 'rgba(90,60,30,0.25)';
      for (let i = 0; i < 160; i++) { g.beginPath(); g.ellipse((r() - 0.5) * 1900, 20 + r() * (abajo - 20), 2 + r() * 5, 1 + r() * 2, 0, 0, TAU); g.fill(); }
    } });
    if (o.linea !== false) {
      const wb = 9 + 0.0926 * abajo;
      papel(poligono([[-9, 2], [9, 2], [wb, abajo + 20], [-wb, abajo + 20]]), C.coral, { d: 0.8, seed: 702, edge: 0.6, print: () => {
        g.fillStyle = 'rgba(255,240,220,0.18)'; g.fillRect(-50, 0, 100, 6);
      } });
    }
  }, 20);
  PAIS.set(key, sp);
  return sp;
}

// ---------------------------------------------------------------- personas
const PER = {};
function piezasPersona() {
  if (PER.ok) return PER;
  PER.piernaI = rect(-6.5, -25, 5.2, 25, 2.4); PER.piernaD = rect(1.3, -25, 5.2, 25, 2.4);
  PER.zapatos = (() => { const p = rect(-8.2, -3.2, 7.4, 3.6, 1.6); p.addPath(rect(0.8, -3.2, 7.4, 3.6, 1.6)); p.bb = [-8.2, -3.2, 8.2, 0.4]; return p; })();
  PER.abrigo = (() => { const p = new Path2D(); p.moveTo(-12.5, -19); p.lineTo(12.5, -19); p.quadraticCurveTo(13, -21, 12.2, -24); p.lineTo(9.6, -47); p.quadraticCurveTo(8.6, -52, 3.5, -52.5); p.lineTo(-3.5, -52.5); p.quadraticCurveTo(-8.6, -52, -9.6, -47); p.lineTo(-12.2, -24); p.quadraticCurveTo(-13, -21, -12.5, -19); p.closePath(); p.bb = [-13.5, -53, 13.5, -18]; return p; })();
  PER.falda = (() => { const p = new Path2D(); p.moveTo(-15, -15); p.lineTo(15, -15); p.lineTo(9.6, -47); p.quadraticCurveTo(8.6, -52, 3.5, -52.5); p.lineTo(-3.5, -52.5); p.quadraticCurveTo(-8.6, -52, -9.6, -47); p.closePath(); p.bb = [-15, -53, 15, -15]; return p; })();
  PER.cuello = rect(-3, -56, 6, 6, 2);
  PER.cabeza = circulo(8.2, 95, 0.02);
  PER.pelo = (() => { const p = new Path2D(); p.moveTo(-8.8, 0.5); p.quadraticCurveTo(-9.8, -10.5, 0, -10.6); p.quadraticCurveTo(9.8, -10.5, 8.8, -1.5); p.quadraticCurveTo(4, -5.5, -3, -4.4); p.quadraticCurveTo(-6.5, -3, -8.8, 0.5); p.closePath(); p.bb = [-10, -11, 10, 1]; return p; })();
  PER.gorra = (() => { const p = new Path2D(); p.moveTo(-9, -1.5); p.quadraticCurveTo(-9.5, -12, 0, -12.5); p.quadraticCurveTo(9.5, -12, 9, -3.5); p.lineTo(15, -2.6); p.quadraticCurveTo(15.5, -0.8, 13, -0.6); p.lineTo(-9, -1.5); p.closePath(); p.bb = [-10, -13, 16, 0]; return p; })();
  PER.sombrero = (() => { const p = new Path2D(); p.moveTo(-16, -2); p.quadraticCurveTo(0, -5.5, 16, -2); p.quadraticCurveTo(17, 0.5, 13, 0.2); p.lineTo(-13, 0.2); p.quadraticCurveTo(-17, 0.5, -16, -2); p.closePath(); p.moveTo(-8, -3.4); p.quadraticCurveTo(-8.6, -14, 0, -14.4); p.quadraticCurveTo(8.6, -14, 8, -3.4); p.closePath(); p.bb = [-17, -15, 17, 1]; return p; })();
  PER.cinta = rect(-8.2, -5.8, 16.4, 2.6, 1);
  PER.brazo = rect(-2.6, -1, 5.2, 23, 2.6);
  PER.mano = circulo(3.1, 97, 0.03);
  PER.ok = true;
  return PER;
}
/**
 * Persona de papel de perfil/frente, con los pies en el origen (arriba = −y; mide ~76 px a escala 1).
 * o: { escala, abrigo, abrigoD, pantalon, piel, pelo (color), tocado: null|'gorra'|'sombrero'|'pelo',
 *      colTocado, falda: bool, brazoI, brazoD (ángulos: 0 = colgando; usar K.aimAt), id,
 *      manoD(g)/manoI(g): dibuja un objeto en la mano (coordenadas de la mano), paso: 0..1 (andar) }
 */
export function persona(o = {}) {
  const P = piezasPersona(), id = o.id ?? 1;
  const ab = o.abrigo ?? C.coral, abD = o.abrigoD ?? mezcla(ab, '#000000', 0.25), pt = o.pantalon ?? C.ink, piel = o.piel ?? C.skin;
  g.save(); if (o.escala && o.escala !== 1) g.scale(o.escala, o.escala);
  const paso = o.paso ?? 0, sw = Math.sin(paso * TAU) * 0.22;
  g.save(); g.translate(-3.9, -25); g.rotate(sw); g.translate(3.9, 25); papel(P.piernaI, pt, { d: 1.3, seed: id, edge: 0.6 }); g.restore();
  g.save(); g.translate(3.9, -25); g.rotate(-sw); g.translate(-3.9, 25); papel(P.piernaD, pt, { d: 1.3, seed: id + 9, edge: 0.6 }); g.restore();
  papel(P.zapatos, C.ink, { d: 1, seed: id + 10, edge: 0.5 });
  // brazo de atrás (izquierdo)
  g.save(); g.translate(-8.5, -46); g.rotate(o.brazoI ?? 0.18); papel(P.brazo, abD, { d: 1.2, seed: id + 1, edge: 0.5 });
  g.translate(0, 23); papel(P.mano, piel, { d: 0.8, seed: id + 11, edge: 0.5 }); if (o.manoI) o.manoI(g); g.restore();
  papel(o.falda ? P.falda : P.abrigo, ab, { d: 1.7, seed: id + 2 });
  papel(P.cuello, piel, { d: 0.6, seed: id + 12, edge: 0.4 });
  g.save(); g.translate(0, -61); papel(P.cabeza, piel, { d: 1.4, seed: id + 3, edge: 0.7 });
  const toc = o.tocado ?? 'pelo', ct = o.colTocado ?? o.pelo ?? C.hair;
  if (toc === 'pelo') papel(P.pelo, o.pelo ?? C.hair, { d: 0.8, seed: id + 4, edge: 0.6 });
  else if (toc === 'gorra') { g.save(); if (o.mirar === -1) g.scale(-1, 1); papel(P.gorra, ct, { d: 0.9, seed: id + 4, edge: 0.6 }); g.restore(); }
  else if (toc === 'sombrero') { papel(P.sombrero, ct, { d: 1, seed: id + 4, edge: 0.6 }); papel(P.cinta, C.ink, { d: 0.4, seed: id + 13, edge: 0.3 }); }
  g.restore();
  g.save(); g.translate(8.2, -46); g.rotate(o.brazoD ?? -0.18); papel(P.brazo, ab, { d: 1.6, seed: id + 5 });
  g.translate(0, 23); papel(P.mano, piel, { d: 1, seed: id + 14, edge: 0.5 }); if (o.manoD) o.manoD(g); g.restore();
  g.restore();
}
const PERA = {};
/**
 * Persona vista desde arriba (para tiovivos, plazas…): centro de la cabeza en el origen, mirando
 * hacia +x. o: { escala, abrigo, pelo, piel, brazoI, brazoD (ángulos respecto al frente: 0 =
 * brazo hacia delante, ±1.4 = pegado al cuerpo), id }
 */
export function personaArriba(o = {}) {
  if (!PERA.ok) {
    PERA.hombros = elipse(11, 21, 191, 0.02);
    PERA.cabeza = circulo(10, 192, 0.02);
    PERA.cara = (() => { const p = new Path2D(); p.arc(0, 0, 10, -1.05, 1.05); p.quadraticCurveTo(5, 0, 10 * Math.cos(-1.05), 10 * Math.sin(-1.05)); p.closePath(); p.bb = [3, -9, 10.5, 9]; return p; })();
    PERA.brazo = rect(-3.4, -3.4, 26, 6.8, 3.4);
    PERA.mano = circulo(3.8, 193, 0.03);
    PERA.ok = true;
  }
  const id = o.id ?? 300, ab = o.abrigo ?? C.coral;
  g.save(); if (o.escala && o.escala !== 1) g.scale(o.escala, o.escala);
  [[o.brazoI ?? -0.35, -1], [o.brazoD ?? 0.35, 1]].forEach(([a, s], i) => {
    g.save(); g.translate(-1, s * 15); g.rotate(a);
    papel(PERA.brazo, mezcla(ab, '#000000', 0.12), { d: 1.6, seed: id + i, edge: 0.5 });
    g.translate(23, 0); papel(PERA.mano, o.piel ?? C.skin, { d: 1.2, seed: id + 5 + i, edge: 0.5 }); if (s > 0 && o.manoD) o.manoD(g);
    g.restore();
  });
  papel(PERA.hombros, ab, { d: 2, seed: id + 2 });
  papel(PERA.cabeza, o.pelo ?? C.hair, { d: 2.4, seed: id + 3, edge: 0.7 });
  papel(PERA.cara, o.piel ?? C.skin, { d: 0.5, seed: id + 4, edge: 0.4 });
  g.restore();
}

// ---------------------------------------------------------------- átomo narrador
const AT = {};
function piezasAtomo() {
  if (AT.ok) return AT;
  AT.nuc = [[0, 0, 0], [20, 2, 1], [-19, -3, 0], [9.5, 19, 0], [-9.5, 17, 1], [10.5, -18, 1], [-9.5, -19, 0], [2, -6, 1], [-3, 8, 0]].map(([x, y, k], i) => ({ x, y, k, p: circulo(16.5, 70 + i, 0.02) }));
  AT.electron = circulo(12.5, 80, 0.02); AT.electronHi = circulo(7.8, 81, 0.03);
  AT.orb = [0, PI / 3, -PI / 3].map((ang) => {
    const a = 124, b = 43, wdt = 3.6, mkHalf = (fr) => {
      const p = new Path2D(), s0 = fr ? 0 : PI, s1 = fr ? PI : TAU, n = 60;
      for (let k = 0; k <= n; k++) { const s = s0 + (s1 - s0) * k / n; const x = (a + wdt) * Math.cos(s), y = (b + wdt) * Math.sin(s); k ? p.lineTo(x, y) : p.moveTo(x, y); }
      for (let k = n; k >= 0; k--) { const s = s0 + (s1 - s0) * k / n; p.lineTo((a - wdt) * Math.cos(s), (b - wdt) * Math.sin(s)); }
      p.closePath(); p.bb = [-a - wdt, -b - wdt, a + wdt, b + wdt]; return p;
    };
    return { ang, a, b, front: mkHalf(true), back: mkHalf(false) };
  });
  AT.ok = true;
  return AT;
}
/**
 * El átomo narrador (núcleo + 3 electrones en órbitas inclinadas, papel colgado de un hilo).
 * Late con la energía de la voz: se acerca a la cámara (escala y sombra) cuando habla.
 * (x, y): centro; t: segundos; e: E.energia(t) (0..1).
 * o: { escala: 0.55, hilo: true (cuelga desde arriba), techo: −20, id, vel: vueltas/s de los
 *      electrones (0.45), u: colocación 0..1, fase (rad), balanceo (rad), nucA, nucB, elec, elecL, orb }
 */
export function atomo(x, y, t, e = 0, o = {}) {
  const A = piezasAtomo(), id = o.id ?? 10, sc0 = o.escala ?? 0.55;
  const u = o.u ?? 1; if (u <= 0) return;
  const pc = colocar(u);
  const sway = o.balanceo ?? 0.02 * Math.sin(TAU * 0.23 * t + id), techo = o.techo ?? -20, Lh = y - techo;
  const cx = x + Math.sin(sway) * Lh * 0.15 + pc.dx, cy = y + pc.dy;
  const ee = cl(e), pulse = 1 + 0.085 * ee, lift = 3.5 * ee + pc.d;
  if (o.hilo !== false) hilo(x, techo, cx, cy - 30 * sc0 * pulse);
  g.save(); g.translate(cx, cy); g.rotate(-sway * 0.5); g.scale(sc0 * pulse * pc.s, sc0 * pulse * pc.s);
  const ph = o.fase ?? TAU * (o.vel ?? 0.45) * t;
  const cO = o.orb ?? C.ivory, cE = o.elec ?? C.gold, cEL = o.elecL ?? C.goldL, cA = o.nucA ?? C.coral, cB = o.nucB ?? C.ivory;
  const orbitPart = (fr) => {
    A.orb.forEach((ob, i) => {
      g.save(); temblor(id + i + (fr ? 5 : 0), 0.5, 0.004); g.rotate(ob.ang);
      papel(ob[fr ? 'front' : 'back'], cO, { d: 2.2 + lift * 0.6, seed: 12 + i, tb: 0.4, edge: 0.7 });
      const ea = ph + i * TAU / 3 + i * 0.7, sy = Math.sin(ea);
      if ((sy >= 0) === fr) {
        g.save(); g.translate(ob.a * Math.cos(ea), ob.b * sy); g.rotate(-ob.ang); temblor(id + 20 + i, 0.5);
        papel(A.electron, cE, { d: 3 + lift, seed: 20 + i });
        g.translate(-2.2, -2.6); papel(A.electronHi, cEL, { d: 0.6, seed: 25 + i, edge: 0 });
        g.restore();
      }
      g.restore();
    });
  };
  orbitPart(false);
  g.save(); temblor(id + 30, 0.5, 0.004);
  A.nuc.forEach((n, i) => {
    g.save(); g.translate(n.x, n.y); temblor(id + 31 + i, 0.35);
    papel(n.p, n.k ? cB : cA, { d: 2 + lift * 1.3, seed: 31 + i });
    g.restore();
  });
  g.restore();
  orbitPart(true);
  g.restore();
}

// ---------------------------------------------------------------- estrella colgante (como en el demo)
const ESTR = estrella(1, 0.47, 5, -PI / 2, 5);
/**
 * Estrella de papel colgada de un hilo desde (x, techo). len: largo del hilo; R: radio;
 * sway: balanceo (rad); twist: giro sobre el hilo (rad); tipo: 'plana' | 'plegada'.
 */
export function estrellaColgante(x, len, R, sway, twist, tipo = 'plana', id = 300, techo = -20) {
  const ex = x + Math.sin(sway) * len, ey = techo + Math.cos(sway) * len;
  hilo(x, techo, ex, ey - R * 0.92);
  g.save(); g.translate(ex, ey); temblor(id, 0.6, 0.01); g.rotate(-sway * 0.6);
  const sx = Math.cos(twist), backS = sx < 0;
  g.scale(Math.max(Math.abs(sx), 0.06), 1);
  const sp = escalar(ESTR, R);
  if (tipo === 'plegada') {
    const dark = backS ? '#9c7029' : C.goldD, lite = backS ? C.goldD : C.goldL;
    sombra(4.2, 0.55); g.fillStyle = C.gold; g.fill(sp); sinSombra();
    for (let i = 0; i < 10; i++) {
      const a0 = -PI / 2 + i / 10 * TAU, a1 = -PI / 2 + (i + 1) / 10 * TAU;
      const r0 = (i % 2 ? 0.47 : 1) * R, r1 = (i % 2 ? 1 : 0.47) * R;
      const p = new Path2D(); p.moveTo(0, 0); p.lineTo(r0 * Math.cos(a0), r0 * Math.sin(a0)); p.lineTo(r1 * Math.cos(a1), r1 * Math.sin(a1)); p.closePath();
      g.fillStyle = (i % 2 === 0) !== backS ? lite : dark; g.globalAlpha = 0.92; g.fill(p);
    }
    g.globalAlpha = 1;
    textura(sp, id, 0.9, 0.35);
  } else papel(sp, backS ? C.ivory3 : C.ivory, { d: 3, seed: id, edge: 0.6 });
  g.restore();
}

// ---------------------------------------------------------------- Tierra
// Continentes simplificados (lon, lat). Longitudes > 180 se usan para cruzar el antimeridiano.
export const CONTINENTES = {
  africa: [[-17, 21], [-16, 24], [-13, 27.5], [-9.8, 30], [-9.5, 32.5], [-6.5, 35], [-2, 35.2], [3, 36.8], [10.2, 37.2], [11, 35], [10.2, 33.8], [15, 32.3], [19.5, 30.4], [20.1, 32.4], [23, 32.6], [29, 30.9], [32.3, 31.3], [33.8, 28], [37, 22], [38.5, 18], [41, 14.5], [43.3, 12.6], [44.5, 10.5], [51.2, 11.8], [51, 10], [48.5, 5], [46, 2], [42, -1], [40, -4], [39.2, -8], [40.5, -11], [40.5, -15], [36.8, -18.5], [35, -21], [35.5, -24], [32.8, -26], [32.4, -29], [30, -31.5], [27.5, -33.5], [22, -34.2], [20, -34.8], [18.4, -34], [17.8, -32], [15.2, -27], [14.5, -22.5], [11.8, -17.5], [12.3, -13], [13.8, -10.5], [12.2, -6], [9, -1], [9.6, 2.5], [9.6, 4], [8.5, 4.5], [6, 4.3], [4.5, 6.3], [1.5, 6.2], [-2, 4.8], [-4, 5.2], [-7.5, 4.4], [-9.5, 5.4], [-11.5, 6.9], [-13.3, 8.8], [-15, 10.9], [-16.7, 12.4], [-17.4, 14.7], [-16.5, 16.5], [-16.2, 19.5]],
  eurasia: [[-9.3, 38.8], [-8.9, 37], [-6, 36.2], [-2, 36.8], [0, 38.6], [0.5, 40.5], [3.2, 42], [4.5, 43.4], [7.5, 43.8], [10, 44], [12.3, 41.8], [15.6, 38], [16.5, 39], [18.4, 40.1], [17, 41], [13.5, 43.6], [12.4, 45.4], [13.7, 45.6], [16, 43.5], [19.4, 41.8], [20, 39.6], [22.4, 36.5], [23, 37.9], [24, 40.7], [26, 40.8], [26.2, 39.5], [27.4, 37], [29.6, 36.2], [32.6, 36.1], [36, 36.8], [35.8, 34.6], [34.9, 32.8], [34.2, 31.3], [34.6, 28], [37, 25.5], [39, 21.5], [42.5, 16], [43.5, 12.8], [45, 13], [49, 14.6], [52.2, 16], [55, 17.6], [57.5, 19], [59.8, 22.5], [56.5, 24.3], [56.3, 26.2], [54, 24.2], [51.6, 24.4], [50.3, 26.6], [48.5, 28.8], [48, 30], [50, 30.2], [51.5, 27.9], [54.5, 26.6], [57.2, 25.8], [61.5, 25.2], [66.5, 25.4], [68, 23.6], [70, 21], [72.8, 19], [73.4, 16], [74.5, 13], [76.2, 9.5], [77.5, 8.1], [78.2, 9], [79.8, 10.3], [80.2, 13.5], [80.3, 15.9], [82.3, 17], [84.9, 19.3], [86.9, 21.4], [89, 22], [91.5, 22.5], [92.5, 20.5], [94.4, 17.5], [97.6, 16.5], [98.5, 13.5], [99.5, 10], [100.5, 6.5], [103.4, 3], [104.2, 1.4], [103.5, 4.5], [102.2, 6.2], [100.5, 8.5], [100, 13.4], [102, 12.2], [103, 10.5], [105, 8.6], [106.7, 10.4], [109.2, 12], [109, 15], [106.5, 18], [106.7, 20.5], [108, 21.5], [111, 21.5], [113.5, 22.3], [116.5, 23], [119, 25.5], [120, 27], [121.9, 30], [121, 32], [120.3, 34.3], [119.2, 35], [120.8, 36.6], [122.5, 37], [119, 37.2], [117.8, 38.5], [118, 39.2], [121, 40.8], [124.5, 39.8], [126, 37.5], [126.4, 34.6], [129.4, 35.4], [129.5, 37], [128, 38.6], [129.8, 41], [130.7, 42.3], [133, 42.8], [135.5, 43.8], [138, 46.5], [140.4, 48.5], [140.8, 51.5], [141.4, 53.2], [137.7, 54], [135.2, 54.7], [137, 56.4], [140.5, 57.8], [143, 59.3], [148, 59.4], [152, 59], [155, 59.3], [156.8, 61.7], [160, 61], [156.5, 57.5], [156, 52], [158.5, 52.9], [160, 54.5], [162, 56], [163.3, 58], [163.5, 60], [166, 60], [170, 60], [172, 61], [178, 62.5], [180, 64.5], [185, 65], [188, 66], [183, 67.5], [180, 69], [175, 70], [170, 70], [161, 69.5], [152, 70.8], [143, 72.7], [140, 72.5], [132, 71.5], [128, 72.6], [123, 73.5], [113, 73.6], [110, 76.5], [104, 77.7], [100, 76.5], [95, 76], [88, 75.3], [80, 73.5], [75, 72.5], [72, 70.5], [70, 73], [66, 69], [60, 69.8], [55, 68.5], [44, 68.5], [40, 66], [41, 64.5], [37, 63.8], [33, 66.5], [41, 67.5], [33, 69.3], [28, 71], [24, 71], [18, 69.5], [14, 67.5], [12.5, 65.8], [10, 63.5], [5.2, 62.5], [5, 60], [5.6, 58.5], [7, 58], [8.5, 58.2], [10.5, 59.4], [11.2, 58.8], [12, 56.5], [12.8, 55.4], [14.5, 56.2], [16.2, 56.6], [16.5, 57.8], [16.7, 59.2], [18.5, 60], [17.3, 61.5], [17.5, 62.5], [21, 64], [21.5, 65.3], [24, 65.8], [25.5, 65], [25, 64], [22, 63], [21.4, 60.8], [22.8, 60], [26.5, 60.4], [28, 59.5], [24, 59.3], [23.5, 58.5], [24.4, 57.5], [21, 57], [21, 56], [19.8, 54.4], [18.5, 54.7], [14.2, 53.9], [12, 54.2], [10, 54.6], [10, 55.5], [10.4, 56.2], [10.6, 57.7], [9.5, 57.2], [8.2, 56.8], [8.1, 55.4], [8.6, 54], [7, 53.5], [5, 53.1], [4, 51.6], [2.5, 51.1], [1.5, 50.2], [0.2, 49.6], [-1.3, 49.7], [-1.9, 48.7], [-4.6, 48.6], [-4.4, 47.9], [-2.4, 47.2], [-1.2, 46], [-1.4, 44.4], [-1.8, 43.4], [-4, 43.5], [-8, 43.7], [-9.3, 43], [-8.9, 41.5], [-8.8, 40]],
  gbr: [[-5.7, 50], [1.4, 51.3], [1.7, 52.7], [0.2, 53.5], [-2, 55.9], [-1.8, 57.6], [-3, 58.6], [-5, 58.6], [-6.2, 56.8], [-5, 55], [-3, 53.6], [-4.6, 53.2], [-4.3, 52.2], [-5.2, 51.7], [-3.5, 51.4]],
  irl: [[-6, 52.2], [-6.2, 53.9], [-5.6, 54.6], [-7.5, 55.3], [-8.5, 54.5], [-10, 54], [-10.2, 51.8], [-8.5, 51.6]],
  isl: [[-24, 65.5], [-22, 66.4], [-16, 66.5], [-13.6, 65.2], [-15, 64.3], [-19, 63.4], [-22.5, 63.8]],
  samerica: [[-77.3, 8.6], [-75.5, 10.6], [-72, 11.8], [-68, 10.6], [-63, 10.7], [-61, 10.1], [-58.5, 7], [-55, 6], [-52, 4.8], [-50, 1.8], [-49.5, 0], [-47.5, -0.8], [-44.5, -2.4], [-41, -2.9], [-38, -4], [-35.3, -5.3], [-34.9, -8], [-35.8, -10], [-38.5, -13], [-39, -17.5], [-40, -20.5], [-41, -22], [-43.5, -23], [-46.5, -24], [-48.5, -26.5], [-48.8, -28.5], [-50.5, -31], [-52.5, -33.5], [-54, -34.8], [-56, -34.9], [-57.3, -36.2], [-57.6, -38.2], [-62, -39], [-62.3, -40.9], [-65, -41], [-64.4, -42.6], [-65.5, -45], [-67.5, -46.5], [-66, -48], [-68.3, -50.2], [-69, -51.6], [-68.4, -52.4], [-70, -53], [-72, -53.8], [-74.5, -52], [-75.5, -48], [-74, -44], [-73.6, -40], [-73.4, -37], [-71.6, -33], [-71.4, -30], [-70.4, -24], [-70.2, -18.5], [-72, -17], [-76.2, -13.8], [-78, -10], [-79.8, -7], [-81.2, -6], [-80.4, -3.5], [-80, -1.5], [-80.6, 0], [-79.5, 1.5], [-78.5, 2.5], [-77.5, 4], [-77.4, 6.7]],
  namerica: [[-77.3, 8.6], [-79.5, 9.6], [-81.5, 9.0], [-83.5, 10.9], [-83.8, 14.8], [-86, 16], [-88.3, 15.7], [-88.2, 18.5], [-87.5, 21.5], [-90.4, 21.1], [-91, 19], [-94.5, 18.2], [-96, 19.5], [-97.4, 22], [-97.5, 26], [-97.2, 27.8], [-94.5, 29.5], [-91.5, 29.3], [-89.5, 29.2], [-89, 30.3], [-86, 30.4], [-84, 30], [-82.8, 27.8], [-81.8, 26], [-80.4, 25.2], [-80.1, 26.8], [-81.3, 30.5], [-80.8, 32.2], [-78.5, 33.8], [-76, 35.2], [-76.3, 37], [-75.6, 38], [-74, 40], [-72, 41], [-70, 41.7], [-70.6, 43], [-69, 44], [-67, 44.8], [-64, 45.4], [-61, 45.4], [-60, 46], [-64.5, 48.8], [-66.5, 49.5], [-60, 50.2], [-57, 51.5], [-55.7, 52.5], [-56.5, 54], [-58.5, 54.8], [-60.5, 55.8], [-61.8, 57], [-63, 58.5], [-64.5, 60.3], [-69.5, 61], [-72, 62.4], [-77.5, 62.5], [-78, 60], [-77, 56], [-79, 54.5], [-79.8, 51.5], [-82.5, 52.8], [-85, 55.2], [-88.5, 56.8], [-92.5, 57.2], [-94.5, 59], [-94, 61], [-92, 62.8], [-90, 64], [-87, 66.5], [-85, 69], [-90, 69], [-95, 68.5], [-98, 67.8], [-102, 68], [-108, 68.5], [-115, 68.8], [-121, 69.5], [-128, 70], [-133, 69.5], [-136, 68.9], [-141, 69.6], [-148, 70.4], [-152, 70.8], [-156.5, 71.3], [-160, 70.5], [-163, 69.5], [-166, 68.3], [-163.5, 66.5], [-168, 65.6], [-164.5, 64.5], [-161, 64.5], [-160.8, 63], [-165, 62.5], [-165.5, 61], [-162, 60], [-158, 58.7], [-157, 57.3], [-161, 55.9], [-164.8, 54.6], [-158, 56.3], [-154, 57.5], [-152, 59.5], [-150, 61], [-147, 60.8], [-144, 60], [-140, 59.7], [-137, 58.5], [-135, 57], [-133, 55.5], [-130.5, 54.3], [-130, 52], [-128, 50.8], [-125, 49.5], [-124.7, 48.4], [-124, 46], [-124, 43], [-124.4, 40.4], [-123.8, 39], [-122.5, 37.5], [-121.9, 36.5], [-120.6, 34.6], [-118.5, 34], [-117.1, 32.5], [-115.7, 29.8], [-114, 27.6], [-112, 25], [-110, 23], [-108.5, 25.5], [-106.4, 23.5], [-105.5, 21.5], [-105.5, 20], [-103.5, 18.3], [-101, 17.5], [-98, 16.2], [-96, 15.7], [-94, 16.1], [-92.3, 14.6], [-91, 13.9], [-89, 13.4], [-87.6, 13], [-86, 11.7], [-85.7, 10.2], [-84.8, 9.6], [-83.4, 8.4], [-81.5, 7.7], [-80, 7.4], [-79.5, 8.7], [-78.2, 8.3]],
  baffin: [[-61.5, 66.6], [-65, 64.6], [-68, 62.5], [-72, 63.8], [-76, 64.5], [-78, 66.5], [-74, 68.5], [-80, 70], [-88, 70.5], [-85, 73.5], [-78, 73], [-70, 72], [-66, 69.5]],
  cuba: [[-84.9, 21.9], [-82, 23.1], [-80, 23], [-77.5, 21.8], [-74.2, 20.2], [-77, 19.9], [-78.5, 21.5], [-81.5, 22.2]],
  espanola: [[-74.4, 18.6], [-72.8, 19.9], [-70, 19.7], [-68.4, 18.6], [-71.4, 17.6], [-74.4, 18.3]],
  japon: [[130, 31.2], [131.5, 31.5], [132, 33.8], [135, 33.5], [137, 34.5], [139.8, 35], [140.9, 37], [141.5, 40.5], [141.2, 41.8], [140, 40.5], [139.8, 38], [137, 37], [135.5, 35.6], [133, 35.5], [131, 34.4], [129.8, 33]],
  hokkaido: [[140, 41.5], [141.5, 42.5], [143.5, 42], [145.5, 43.3], [144, 44.2], [141.8, 45.4], [141, 43.2]],
  filipinas: [[120, 18.5], [122.3, 18.4], [122, 16], [124, 13], [125.5, 10], [126, 7], [125, 6], [123.5, 7.8], [122, 10.5], [121, 13.5], [120.5, 15]],
  borneo: [[109, 1.5], [110, -1.5], [114, -3.8], [116.5, -2], [117.8, 1], [119, 5], [117, 7], [115, 5], [113, 3.2], [111, 2.5]],
  sumatra: [[95.3, 5.5], [97.5, 5.2], [100.3, 2.2], [104, -1], [106, -3.5], [105.8, -5.8], [104.5, -5.8], [102, -4], [100, -1], [98.5, 1.8]],
  java: [[105.2, -6.8], [108, -6.2], [111, -6.5], [114.5, -7.7], [114.4, -8.7], [111, -8.2], [108, -7.8], [106, -7.4]],
  sulawesi: [[119.5, 0.5], [121, 1.2], [124.5, 1.3], [122.5, -0.8], [121.5, -1.5], [123, -4.5], [122, -5.5], [120.5, -5.5], [120.2, -2.8], [119, -2.5]],
  nuevaGuinea: [[131, -1.2], [134, -0.8], [136, -2.2], [138, -1.6], [141, -2.6], [145, -4.5], [147.5, -6], [147, -8], [150, -10.5], [146, -8.8], [143.5, -9.2], [142.5, -9.5], [141, -9.1], [139, -8], [138, -5.5], [135, -4.4], [132.5, -3.5], [131.5, -2.5]],
  australia: [[113.5, -22], [114, -26], [115, -30], [115.7, -33.5], [117.8, -35], [121, -33.9], [124, -33], [126, -32.3], [129, -31.6], [131.2, -31.5], [134, -32.6], [135.8, -34.8], [137.5, -33.3], [138, -35.5], [139.6, -36.5], [140.5, -38], [143.5, -38.8], [146.3, -39], [148.5, -37.8], [150, -37], [150.8, -34.5], [152.5, -32], [153.5, -29], [153.1, -25.5], [151, -23], [149.5, -21.7], [146.5, -19], [146, -17], [145.4, -15], [143.6, -14], [142.6, -10.8], [141.6, -12.8], [141.5, -15.5], [140.5, -17.5], [139, -17.2], [136.8, -15.8], [135.7, -15], [136.8, -12.3], [135, -12.2], [132.5, -11.5], [130.5, -12.3], [129.5, -14.8], [127.5, -14], [125.5, -14.5], [123.5, -16.5], [122.2, -18.2], [121, -19.6], [118.8, -20.3], [116.7, -20.6], [114.8, -21.7]],
  tasmania: [[144.6, -40.7], [148.3, -40.9], [148, -43.2], [146, -43.6], [145.2, -42.2]],
  nzNorte: [[172.7, -34.4], [174.5, -36], [175.8, -37], [178.5, -37.7], [177, -39.3], [176, -41.3], [174.8, -41.4], [175, -39.8], [173.8, -39.2], [174.6, -37.8]],
  nzSur: [[172.7, -40.5], [174.3, -41.7], [173, -43.8], [171, -45], [169, -46.6], [166.5, -46], [167, -44.8], [169, -43.4], [171.5, -41.8]],
  madagascar: [[49.3, -12], [50.5, -15.5], [49.5, -18], [48, -22.5], [47, -25], [45, -25.5], [43.6, -23.5], [43.3, -21.5], [44.5, -18], [44, -16.5], [46.5, -15.7], [48, -13.5]],
  srilanka: [[79.9, 9.8], [81.2, 8.5], [81.8, 7], [81.2, 6.2], [80.1, 6.1], [79.7, 8]],
};
export const DESIERTOS = {
  sahara: [[-14, 22], [-10, 27], [-4, 31], [5, 32], [12, 31], [20, 29], [28, 28], [32, 26], [33, 21], [28, 17], [20, 16], [12, 14], [3, 15], [-6, 16], [-12, 17]],
  arabia: [[39, 27], [43, 29], [48, 28], [52, 23], [55, 20], [50, 17], [45, 17.5], [42, 21]],
  gobi: [[90, 41], [96, 43], [105, 44], [112, 43], [110, 40], [103, 38], [95, 39]],
  australia: [[120, -22], [125, -20], [132, -21], [137, -24], [136, -28], [130, -29], [123, -28], [119, -26]],
};
export const HIELOS = {
  groenlandia: [[-44, 60], [-42, 62.5], [-40, 65], [-35, 66], [-22, 70], [-22, 73], [-18, 76], [-19, 79], [-28, 82.5], [-40, 83.5], [-60, 82], [-66, 80], [-73, 78], [-68, 76.5], [-60, 76], [-57, 74.5], [-55, 70.5], [-53, 68], [-50, 64], [-48, 61]],
  antartida: (() => { const r = rng(4242), p = []; for (let lon = -180; lon < 180; lon += 12) p.push([lon, -70 + (r() - 0.5) * 5 + (lon > -75 && lon < -55 ? 6 : 0)]); p.push([180, -71]); p.push([180, -90]); p.push([-180, -90]); return p; })(),
};

/**
 * Proyecta polígonos (lon, lat) sobre el globo visto con centro en (lon0, lat0), radio R.
 * Recorta al hemisferio visible y sigue el borde del disco donde el polígono pasa por detrás.
 * Devuelve un Path2D (todas las piezas como subtrazados) o null si nada se ve.
 */
export function proyectarGlobo(polys, lon0, lat0, R, paso = 3) {
  const cl0 = Math.cos(lat0 * D2R), sl0 = Math.sin(lat0 * D2R);
  const v3 = (lon, lat) => {
    const l = (lon - lon0) * D2R, p = lat * D2R;
    const x = Math.cos(p) * Math.sin(l), y = Math.sin(p), z = Math.cos(p) * Math.cos(l);
    return [x, y * cl0 - z * sl0, y * sl0 + z * cl0];
  };
  let out = null;
  for (const pts of polys) {
    const dense = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const k = Math.max(1, Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) / paso));
      for (let j = 0; j < k; j++) { const u = j / k; dense.push(v3(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u)); }
    }
    // recorte por el plano z = 0 (Sutherland–Hodgman), marcando salidas y entradas
    const res = []; const n = dense.length;
    if (!dense.some((v) => v[2] > 0)) continue;
    for (let i = 0; i < n; i++) {
      const A = dense[i], B = dense[(i + 1) % n], ina = A[2] >= 0, inb = B[2] >= 0;
      if (ina) res.push({ v: A });
      if (ina !== inb) {
        const u = A[2] / (A[2] - B[2]);
        const v = [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, 0];
        const l = Math.hypot(v[0], v[1]) || 1; v[0] /= l; v[1] /= l;
        res.push({ v, borde: ina ? 'sale' : 'entra' });
      }
    }
    if (res.length < 3) continue;
    // une cada salida con la siguiente entrada por el arco corto del borde
    let start = res.findIndex((r) => r.borde === 'entra');
    if (start < 0) start = 0;
    const ord = res.slice(start).concat(res.slice(0, start));
    const pts2 = [];
    for (let i = 0; i < ord.length; i++) {
      const r = ord[i];
      pts2.push([r.v[0] * R, -r.v[1] * R]);
      if (r.borde === 'sale') {
        const nx = ord[(i + 1) % ord.length];
        if (nx.borde === 'entra') {
          const a0 = Math.atan2(-r.v[1], r.v[0]); let a1 = Math.atan2(-nx.v[1], nx.v[0]), da = a1 - a0;
          while (da > PI) da -= TAU; while (da < -PI) da += TAU;
          const m = Math.ceil(Math.abs(da) / 0.08);
          for (let j = 1; j < m; j++) { const a = a0 + da * j / m; pts2.push([R * Math.cos(a), R * Math.sin(a)]); }
        }
      }
    }
    out = suave(pts2, out ?? new Path2D());
  }
  return out;
}
const TIERRA = new Map();
/**
 * Globo terráqueo de papel en (x, y), radio R. Gira cambiando lon0 (lon0 decreciente = gira
 * hacia el este, como la Tierra vista con el norte arriba); lat0 > 0 lo inclina para ver el norte.
 * o: { lon0: −22, lat0: 0, achatar: 0 (0.1 = 10 % más ancha), ecuador: true (costura dorada),
 *      base: false (disco de cartón con muescas detrás), atmosfera: true, eje: false (hilo por los
 *      polos), id, colOceano, colTierra, d }
 */
export function tierra(x, y, R, o = {}) {
  const id = o.id ?? 100, lon0 = o.lon0 ?? -22, lat0 = o.lat0 ?? 0, ach = o.achatar ?? 0;
  const key = R + '|' + id;
  if (!TIERRA.has(key)) TIERRA.set(key, { base: circulo(R * 1.4, id, 0.003), atmo: circulo(R + 10 * R / 118, id + 1, 0.004), oceano: circulo(R, id + 2, 0.004) });
  const T = TIERRA.get(key);
  g.save(); g.translate(x, y); temblor(id, 0.45, 0.0015);
  if (ach) g.scale(1 + ach, 1 - ach);
  if (o.base) {
    papel(T.base, C.backing, { d: 5, seed: id + 3, sa: 0.6, tb: 0.55, edge: 0.6, print: () => {
      g.strokeStyle = 'rgba(236,224,196,0.5)'; g.lineWidth = 1.3; const EB = R * 1.4;
      for (let i = 0; i < 72; i++) {
        const a = i / 72 * TAU, l = i % 6 === 0 ? 11 : 5;
        g.beginPath(); g.moveTo((EB - 9) * Math.cos(a), (EB - 9) * Math.sin(a)); g.lineTo((EB - 9 - l) * Math.cos(a), (EB - 9 - l) * Math.sin(a)); g.stroke();
      }
    } });
  }
  if (o.eje) { g.save(); sombra(1.6, 0.45); g.strokeStyle = 'rgba(226,216,196,0.85)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -R * 1.22); g.lineTo(0, R * 1.22); g.stroke(); sinSombra(); g.restore(); }
  if (o.atmosfera !== false) papel(T.atmo, C.teal2, { d: (o.d ?? 3) - 0.5, seed: id + 4 });
  papel(T.oceano, o.colOceano ?? C.teal, { d: 2, seed: id + 5, tb: 0.5, print: o.reticula === false ? null : () => {
    // retícula impresa muy suave (meridianos y paralelos)
    g.strokeStyle = 'rgba(220,240,240,0.10)'; g.lineWidth = 1.2;
    const cl0 = Math.cos(lat0 * D2R), sl0 = Math.sin(lat0 * D2R);
    for (let lat = -60; lat <= 60; lat += 30) {
      g.beginPath(); let pen = false;
      for (let lon = -180; lon <= 180; lon += 5) {
        const l = (lon - lon0) * D2R, p = lat * D2R, xx = Math.cos(p) * Math.sin(l), yy = Math.sin(p), zz = Math.cos(p) * Math.cos(l);
        const y2 = yy * cl0 - zz * sl0, z2 = yy * sl0 + zz * cl0;
        if (z2 < 0) { pen = false; continue; }
        if (pen) g.lineTo(xx * R, -y2 * R); else { g.moveTo(xx * R, -y2 * R); pen = true; }
      }
      g.stroke();
    }
    for (let lon = -180; lon < 180; lon += 30) {
      g.beginPath(); let pen = false;
      for (let lat = -90; lat <= 90; lat += 5) {
        const l = (lon - lon0) * D2R, p = lat * D2R, xx = Math.cos(p) * Math.sin(l), yy = Math.sin(p), zz = Math.cos(p) * Math.cos(l);
        const y2 = yy * cl0 - zz * sl0, z2 = yy * sl0 + zz * cl0;
        if (z2 < 0) { pen = false; continue; }
        if (pen) g.lineTo(xx * R, -y2 * R); else { g.moveTo(xx * R, -y2 * R); pen = true; }
      }
      g.stroke();
    }
  } });
  const k = R * 0.985;
  const land = proyectarGlobo(Object.values(CONTINENTES), lon0, lat0, k);
  if (land) papel(land, o.colTierra ?? C.sage, { d: 1.6, seed: id + 6 });
  const des = proyectarGlobo(Object.values(DESIERTOS), lon0, lat0, k);
  if (des) papel(des, C.sand, { d: 0.9, seed: id + 7, edge: 0.6 });
  const ice = proyectarGlobo(Object.values(HIELOS), lon0, lat0, k);
  if (ice) papel(ice, C.hielo, { d: 1.3, seed: id + 8 });
  if (o.ecuador !== false) {
    // ecuador: costura dorada (solo la mitad visible)
    const pts = [];
    for (let a = -90; a <= 90; a += 4) { const l = a * D2R; pts.push([Math.sin(l) * R, Math.sin(lat0 * D2R) * Math.cos(l) * R]); }
    g.save(); g.setLineDash([10, 7]); g.lineCap = 'round';
    sombra(1.2, 0.5); g.strokeStyle = o.colEcuador ?? C.goldL; g.lineWidth = o.anchoEcuador ?? Math.max(2.2, R / 60);
    g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke(); sinSombra(); g.restore();
  }
  if (o.extra) o.extra(g);   // dibujar cosas pegadas al globo (mismo sistema de coordenadas)
  g.restore();
}
/**
 * Mapa plano (equirrectangular) de anchura w y altura w/2 centrado en el origen.
 * o: { lon0: 0 (centro), sur: false (sur arriba), colOceano, colTierra, id, d, marco: true }
 */
export function tierraPlana(w, o = {}) {
  const h = w / 2, id = o.id ?? 150, lon0 = o.lon0 ?? 0, sgn = o.sur ? -1 : 1;
  const P = (lon, lat) => { let l = lon - lon0; while (l > 180) l -= 360; while (l < -180) l += 360; return [sgn * l / 360 * w, -sgn * lat / 180 * h]; };
  const camino = (polys) => {
    let p = null;
    for (const pts of polys) {
      const q = []; let ref = null;
      for (const [lon, lat] of pts) { let [x, y] = P(lon, lat); if (ref != null) { while (x - ref > w / 2) x -= w; while (ref - x > w / 2) x += w; } ref = x; q.push([x, y]); }
      p = suave(q, p ?? new Path2D());
    }
    return p;
  };
  const caja = rectRecortado(-w / 2, -h / 2, w, h, 10, id, 0.9);
  papel(caja, o.colOceano ?? C.teal, { d: o.d ?? 4, seed: id + 1, tb: 0.5, print: () => {
    g.strokeStyle = 'rgba(220,240,240,0.12)'; g.lineWidth = 1.2;
    for (let lat = -60; lat <= 60; lat += 30) { g.beginPath(); g.moveTo(-w / 2, -lat / 180 * h); g.lineTo(w / 2, -lat / 180 * h); g.stroke(); }
    for (let lon = -150; lon <= 150; lon += 30) { g.beginPath(); g.moveTo(lon / 360 * w, -h / 2); g.lineTo(lon / 360 * w, h / 2); g.stroke(); }
    const tierraP = camino(Object.values(CONTINENTES)), des = camino(Object.values(DESIERTOS)), ice = camino(Object.values(HIELOS));
    papel(tierraP, o.colTierra ?? C.sage, { d: 1.6, seed: id + 2 });
    papel(des, C.sand, { d: 0.9, seed: id + 3, edge: 0.6 });
    papel(ice, C.hielo, { d: 1.3, seed: id + 4 });
  } });
}

// ---------------------------------------------------------------- fondo y marco
function agujero(x, y, s, sparkle, r) {
  g.save(); g.translate(x, y);
  const R = 2 + s * 3.2, gr = g.createRadialGradient(0, 0, 0, 0, 0, R);
  gr.addColorStop(0, 'rgba(255,214,150,0.55)'); gr.addColorStop(0.35, 'rgba(255,200,130,0.2)'); gr.addColorStop(1, 'rgba(255,200,130,0)');
  g.fillStyle = gr; g.fillRect(-R, -R, 2 * R, 2 * R);
  g.fillStyle = '#fbe7b6';
  if (sparkle) { g.rotate(r * PI); g.fill(estrella(s * 3.2, s * 0.7, 4, 0, 3)); }
  else { g.beginPath(); g.arc(0, 0, s, 0, TAU); g.fill(); }
  g.restore();
}
function franjaNubes(seed, y, hmin, hmax, wmin, wmax) {
  const r = rng(seed), p = new Path2D(); let x = -60; p.moveTo(-60, 1140); p.lineTo(-60, y);
  while (x < W + 60) {
    const w = wmin + r() * (wmax - wmin), h = hmin + r() * (hmax - hmin), rr = (w * w / 4 + h * h) / (2 * h), cx = x + w / 2, cy = y - h + rr;
    p.arc(cx, cy, rr, Math.atan2(y - cy, -w / 2), Math.atan2(y - cy, w / 2)); x += w;
  }
  p.lineTo(x, 1140); p.closePath(); p.bb = [-60, y - hmax - 4, x, 1140]; return p;
}
/**
 * Fondo de cartulina nocturna (como el demo) dibujado en el contexto actual (usar dentro de K.capa).
 * o: { cielo: C.sky, luz: [x, y] (resplandor), estrellas: 240, evitar: [{x, y, r}|{x0,y0,x1,y1}],
 *      anillos: { x, y, radios: [470, 400, 336] } | null, nubes: true, semilla, vineta: 0.55,
 *      colorLuz: 'rgba(...)' }
 * Las nubes de abajo son tres franjas con saltos de valor claros (la del fondo más clara) y
 * quedan oscuras en la franja de subtítulos.
 */
export function fondoNoche(o = {}) {
  const full = new Path2D(); full.rect(0, 0, W, H); full.bb = [0, 0, W, H];
  papel(full, o.cielo ?? C.sky, { d: 0, seed: 1, ta: 1, tb: 0.36, edge: 0 });
  const [lx, ly] = o.luz ?? [960, 470];
  const gr = g.createRadialGradient(lx, ly, 40, lx, ly + 50, 1050);
  gr.addColorStop(0, o.colorLuz ?? 'rgba(88,108,172,0.26)'); gr.addColorStop(0.45, 'rgba(48,64,116,0.12)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const ev = o.evitar ?? [];
  const libre = (x, y) => !ev.some((e) => e.r != null ? Math.hypot(x - e.x, y - e.y) < e.r : x > e.x0 && x < e.x1 && y > e.y0 && y < e.y1);
  const r = rng(o.semilla ?? 77), an = o.anillos;
  for (let i = 0; i < (o.estrellas ?? 240); i++) {
    const x = 30 + r() * (W - 60), y = 30 + r() * (H - 60), s = 0.7 + Math.pow(r(), 3) * 2.5, sp = r() < 0.1, rr = r();
    if (an && Math.hypot(x - an.x, y - an.y) < an.radios[0] + 4) continue;
    if (!libre(x, y)) continue;
    agujero(x, y, s, sp, rr);
  }
  if (an) {
    const cols = [C.ring1, C.ring2, C.ring3];
    g.save(); g.translate(an.x, an.y);
    an.radios.forEach((R, i) => papel(i === 0 ? circulo(R, 11, 0.002, 10, 46) : circulo(R, 11 + i, 0.003), cols[Math.min(i, 2)], { d: i === 0 ? 5 : 4, seed: 2 + i, sa: 0.6, edge: 0.7, tb: 0.4 }));
    g.restore();
    const r2 = rng((o.semilla ?? 77) + 1);
    for (let i = 0; i < 50; i++) {
      const a = r2() * TAU, rr = an.radios[1] + 8 + r2() * (an.radios[0] - an.radios[1] - 16), x = an.x + rr * Math.cos(a), y = an.y + rr * Math.sin(a);
      if (!libre(x, y)) continue;
      agujero(x, y, 0.7 + Math.pow(r2(), 3) * 1.4, r2() < 0.08, r2());
    }
  }
  if (o.nubes !== false) {
    const sem = o.semilla ?? 31;
    const n1 = franjaNubes(sem, 958, 40, 74, 150, 250), n2 = franjaNubes(sem + 1, 1000, 28, 52, 110, 190), n3 = franjaNubes(sem + 2, 1040, 18, 34, 80, 150);
    const sombreado = (y0) => () => {
      const gg = g.createLinearGradient(0, y0 - 70, 0, y0 + 90);
      gg.addColorStop(0, 'rgba(255,240,215,0.10)'); gg.addColorStop(0.35, 'rgba(255,240,215,0.0)'); gg.addColorStop(1, 'rgba(0,0,10,0.35)');
      g.fillStyle = gg; g.fillRect(0, y0 - 90, W, 260);
    };
    papel(n1, C.nube1, { d: 6, seed: 6, sa: 0.65, edge: 0.9, print: sombreado(958) });
    papel(n2, C.nube2, { d: 7, seed: 7, sa: 0.7, edge: 0.85, print: sombreado(1000) });
    papel(n3, C.nube3, { d: 8, seed: 8, sa: 0.7, edge: 0.75, print: sombreado(1040) });
  }
  const vg = g.createRadialGradient(W / 2, H * 0.48, 520, W / 2, H * 0.5, 1250);
  vg.addColorStop(0, 'rgba(2,4,12,0)'); vg.addColorStop(1, `rgba(2,4,12,${o.vineta ?? 0.55})`);
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
}
/** marco de cartulina oscura alrededor del cuadro (lo pone K.fotograma; en caché) */
export function marco() {
  if (!marcoSp) {
    marcoSp = capa(() => {
      const p = new Path2D(); p.rect(-60, -60, W + 120, H + 120); p.bb = [-60, -60, W + 60, H + 60];
      poligono(rectRecortadoPts(22, 22, W - 44, H - 44, 28, 5, 1.4), p);
      papel(p, C.frame, { d: 9, rule: 'evenodd', seed: 9, sa: 0.75, tb: 0.35 });
    });
  }
  const b = 84;
  g.drawImage(marcoSp, 0, 0, W, b, 0, 0, W, b);
  g.drawImage(marcoSp, 0, H - b, W, b, 0, H - b, W, b);
  g.drawImage(marcoSp, 0, b, b, H - 2 * b, 0, b, b, H - 2 * b);
  g.drawImage(marcoSp, W - b, b, b, H - 2 * b, W - b, b, b, H - 2 * b);
}
