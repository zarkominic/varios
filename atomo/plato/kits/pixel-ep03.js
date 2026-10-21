// PIXEL ART · episodio 3 (muestra de un minuto: px-ep3-hola, px-ep3-ojo, px-ep3-promesa, px-ep3-cajon).
// Kit compartido de las escenas px-*.html. Parte de la prueba aprobada (escenas/prueba-pixel.html y
// estilos/17-pixel-art.html) y sube el listón: paleta cerrada pero rica (rampas con desplazamiento de tono:
// sombras hacia el violeta, luces hacia el ámbar), tramado Bayer, capas con paralaje, animación a saltos de
// píxel entero, luz principal cálida y contraluz frío. Misma identidad que la plastilina adulta: plató de
// color tierra, Atom de latón con núcleo de terracota y crema, persona de jersey gris y pantalón caqui.
//
//   import { escena } from '/atomo/plato/escena.js';
//   import { crearPixel } from '/atomo/plato/kits/pixel-ep03.js';
//   const E = await escena('px-ep3-hola', 'ep03px');
//   const PX = crearPixel(document.getElementById('lienzo'));          // lienzo de 480 × 270 píxeles reales
//   const plato = PX.crearPlato();
//   function dibujar(t) {
//     plato.dibujar({ t });                                            // fondo (limpia la pantalla entera)
//     PX.persona({ x: 150, y: 214, altura: 120, pose: 'sostener', t });
//     PX.atom({ ...PX.ATOM_SITIO, t, energia: E.energia(t) });
//     PX.cartela(t, E.cartela);
//     PX.presentar(t);                                                  // escala ×4 sin suavizado y post
//   }
//   E.iniciar(dibujar);                                                // 30 fps; los sprites se animan a 12–15
//
// EL LIENZO
//   W × H = 480 × 270 píxeles reales; presentar() los escala ×4 (1920 × 1080) a vecino más próximo. Con otra
//   ventana: escala entera si cabe, si no «sharp bilinear», con bandas. Coste: un fotograma típico, 5–30 ms.
//   Todo el dibujo va a un búfer Uint32 (colores ABGR de hex()). Las coordenadas son de píxel real; redondea tú
//   las posiciones de lo que se mueve (Math.round) para que todo salte de píxel en píxel.
//   · crearPixel(lienzo, { post }) → PX: el objeto con todo lo de abajo. post: { vineta: 0.32 (oscurece las
//     esquinas con tramado, en el propio píxel), resplandor: 0.3 (halo suave de lo más brillante: núcleo,
//     electrones, luces), grano: 0.03 (grano fino de película, a 1920), lineas: 0 (líneas de barrido: 0,04–0,08
//     para un toque CRT; apagadas por defecto) }. PX.post se puede cambiar en cualquier momento.
//   · PX.presentar(t): sube el búfer, escala y aplica el post. Va al final de dibujar(t). El grano depende de t
//     (determinista). Haz tus instantáneas antes de presentar (la viñeta se escribe en el búfer).
//   · Destino del dibujo: por defecto, la pantalla. nuevaCapa(w, h) crea un búfer aparte ({ w, h, buf }; 0 =
//     transparente) y en(capa, () => { … }) dibuja dentro de él. pegar(capa, dx, dy, { envolver, opaco })
//     la copia a la pantalla (o al destino actual); parallax(capa, camX, camY, factor, opciones) = pegar con
//     -round(cam·factor). instantanea() copia la pantalla a una capa; ampliar(capa, fx, fy, m, sx, sy) la amplía
//     ×m a vecino más próximo alrededor de (fx, fy), llevándolo a (sx, sy) (golpe de zoom «de juego»).
//
// PRIMITIVAS (en el destino actual)
//   limpiar(c) · pset(x, y, c) · pget(x, y) · rect(x0, y0, x1, y1, c) (inclusivo) · linea(x0, y0, x1, y1, c,
//   salto = 1) (Bresenham; salto 2 = punteada) · disco(cx, cy, r, c) · elipse(cx, cy, rx, ry, c) · anillo(cx,
//   cy, r, c) (circunferencia de 1 px, «pixel perfect») · c puede ser una función (x, y) → color.
//   tono(rampa, v, x, y, k = 1): el color de la rampa para el nivel continuo v, con tramado Bayer 4×4 (k: cuánto
//   tramado; 0 = sin tramar, solo redondea). degradado(x0, y0, x1, y1, rampa, (x, y) → v, k): rellena un
//   rectángulo con un nivel por píxel. degradadoV(x0, y0, x1, y1, rampa, v0, v1, k) y degradadoRadial(cx, cy,
//   r, rampa, vCentro, vBorde, k): los dos casos de siempre.
//   luz(cx, cy, r, color, fuerza, pasos = 4): suma luz de un color con caída suave, cuantizada en escalones
//   tramados (sigue pareciendo píxel). sombra(cx, cy, rx, ry, fuerza): oscurece una elipse con tramado (la sombra
//   de contacto, el velo detrás de algo). oscurecer(x0, y0, x1, y1, k). velo(color, u): fundido tramado de toda
//   la pantalla hacia un color (u 0…1; el «fogonazo blanco» es velo(PAL.BLANCO, u)). sombraRect(...).
//   Utilidades exportadas: clamp, mezcla, lin, suave, entra, sale, entraSale, rebote, fot(t, fps = 12) (número
//   de fotograma de sprite: anima a 2 o a 3), paso(t, fps) (el instante cuantizado), mulberry32, hash2, vnoise,
//   fbm, b4, b8 (umbrales Bayer), hex, rgb, color, mezclaColor, luma.
//
// PALETA (PAL; cada rampa va de oscuro a claro)
//   TELON y SUELO (plató tierra, como el ciclorama de la plastilina) · NOCHE, ESTRELLA, NEBULOSA (cosmos) ·
//   LATON, TERRACOTA, CREMA, AMBAR (Atom, regla, cartela) · PIEL, PELO, JERSEY, CAQUI, ZAPATO, OJO (persona) ·
//   BOJ (regla de madera corriente) · NOGAL (la regla de potencias y la cartela) · NIEBLA · BLANCO, TINTA.
//
// ATOM (siempre el mismo, en todas las escenas)
//   atom({ x, y, r = 13, t, energia = 0, fase, brillo = 0, saludo = 0, velo = 0.3, fps = 15 }) → { x, y, r }
//    · x, y: el centro (píxel). r: el radio de las órbitas. ATOM_SITIO = { x: 58, y: 190, r: 14 }: su sitio de
//      presentador, abajo a la izquierda (se lee en el móvil: ~32 px de ancho a 480). Con r ≥ 18 las órbitas son
//      de 2 px y con r ≥ 34, de 3; con r ≥ 14, el núcleo lleva protones y neutrones (con r ≥ 26, cada bola
//      se separa de la de detrás con un borde oscuro).
//    · energia: E.energia(t). Late: el núcleo crece un píxel, el halo ámbar se abre y los electrones brillan.
//    · fase: ángulo de los electrones (por defecto, t · 2,3 rad/s, a 15 fps). brillo: 0…1, brillo extra (el
//      «soy Atom»). saludo: 0…1, un electrón sale de su órbita sobre un alambre fino y se mece (el «hola»).
//    · velo: un velo oscuro tramado detrás, para que se lea sobre fondos claros (0 lo quita).
//
// LA PERSONA (HUMANO.md: cabeza H/6, piernas 0,47 H, codo en la cintura, muñeca en la entrepierna…)
//   persona({ x, y, altura = 110, pose = 'depie', t, vida = true, giro = 0, mira, cabeza, parpadeo, aspecto =
//             'adulto', edad, apunta, lado = 1, manos, fase, partes = 'todo', sombra = 0.45 }) → anclas
//    · x, y: el punto entre los pies, en el suelo (píxel). altura: de la coronilla a la suela, en píxeles (en un
//      plano general 90–130; 300+ para la cara). Se dibuja sola, con contorno selectivo, luz principal cálida
//      arriba a la izquierda y contraluz a la derecha; la cara se simplifica con el tamaño (ojos de 1, 2 o con
//      iris, cejas, nariz y boca).
//    · pose: 'depie' · 'sostener' (las dos manos delante, a media altura del pecho: agarran algo; manos: [dx, dy,
//      dz] mueve el agarre, en unidades de altura) · 'señalar' (apunta con el índice a apunta: [x, y] de pantalla;
//      lado 1 = el brazo de la derecha de la pantalla, −1 el de la izquierda; el codo queda doblado y por encima
//      de la cintura) · 'saludar' (lado; la mano abierta se mece con t) · 'mirarArriba' · 'andar' (fase: el
//      ángulo del paso; usa giro para el 3/4) · o una mezcla { de: pose, a: pose, u } (u 0…1).
//    · giro: el cuerpo gira sobre sí (radianes; ±0,6 = tres cuartos). cabeza: { giro, cabeceo (+ arriba),
//      ladeo }. mira: [gx, gy] (−1…1) los ojos. parpadeo: 0/1 (con vida, parpadea solo y respira un píxel).
//    · aspecto: 'adulto' (el de la plastilina: pelo castaño corto, jersey gris, pantalón caqui) · 'nino' (cabeza
//      de 1/4,7 de la altura y piernas de 0,45 H) · edad: 0 (niño) … 1 (adulto) interpola las proporciones
//      (crecer no es escalar). También { edad, piel, pelo, jersey, pantalon, zapato } con rampas propias.
//    · partes: 'todo' · 'sinManos' · 'manos' (para meter algo entre el cuerpo y los dedos: persona sinManos,
//      el objeto, persona manos con los mismos parámetros). sombra: la sombra de contacto (0 la quita).
//    · Devuelve las anclas, en píxeles: { cabeza: [x, y], radioCabeza, ojos: [[x, y], [x, y]], manos: [izq, der]
//      (centro de la palma; izq = la de la izquierda de la pantalla), indice (punta del índice al señalar),
//      hombros, pies, coronilla (y), suela (y) }.
//   POSES (las funciones de cada pose) y mezclarPoses(a, b, u) por si se quiere una propia.
//
// LA MANO SUELTA (de cerca: «una mano se acerca a una silla»)
//   mano({ x, y, largo = 60, angulo = 0, tipo = 'abierta', palma = 'dorso', manga = 0.5, lado = 1 }) → { punta, palma, muneca }
//    · (x, y): la muñeca. largo: la mano en píxeles (de la muñeca a la punta de los dedos). angulo: hacia dónde
//      apuntan los dedos (0 = a la derecha, en radianes). tipo: 'abierta' · 'relajada' · 'agarra' · 'señala'.
//    · palma: 'dorso' (se ve el dorso; de lado, los dedos se abren en vertical) · 'camara' · 'abajo' · 'dentro'.
//      manga: cuánto antebrazo con jersey se ve detrás (0…1; 1 ≈ 3 manos). La misma luz y contorno que la persona.
//
// FORMA (los objetos de cada escena con la misma luz que todo lo demás)
//   forma({ x0, y0, x1, y1, sdf, rampa, lo = 1, hi, grosor = 6, contorno = rampa[0], k = 0.2, textura, plano = 0 })
//    · sdf(x, y): distancia en píxeles, negativa dentro (círculos, cajas redondeadas, uniones…). Relieve «de
//      almohada» de grosor px, luz principal y contraluz, la rampa con tramado k (0 = sin tramar), contorno
//      selectivo (null lo quita). plano (0…1) aplana el relieve (una placa, una hoja). textura(x, y, v, d) → v.
//
// LA REGLA DE POTENCIAS DE DIEZ (de 10⁻³⁵ a 10²⁷; niebla de Planck debajo y red de galaxias encima)
//   regla({ e, entera = 0, actual = round(e), marca = actual, x = REGLA.x, y0, y1, aparece = 1, resalta, t })
//    · Una regla de nogal con canto de latón, de pie en el borde derecho (x = 420, de y = 14 a 222), con una
//      marca por potencia; e (puede ser fraccionario) es la potencia que queda en el centro (y = 118): anímalo y
//      la escala corre. A la izquierda, «10^e m» de cada potencia visible en crema y la actual grande, en ámbar,
//      en su placa, con la flecha del marcador apuntando a marca.
//    · entera (0…1): se comprime sin saltos hasta verse entera (−4 en el centro, ~2,8 px por potencia), con la
//      niebla abajo y la red arriba; quedan los rótulos 10⁻³⁵, 10⁰ y 10²⁷ y el actual grande.
//    · aparece (0…1): entra desde la derecha. resalta: { de, a } enciende en ámbar las marcas de ese tramo.
//    · Devuelve { y(e) (la y de pantalla de una potencia), x, ancho, S (px por potencia) }: para poner algo
//      junto a una marca (el «?» que la recorre: texto('?', R.x - 10, R.y(e) - 3, …)).
//   niebla(x0, y0, x1, y1, t) y redGalaxias(x0, y0, x1, y1, t): los dos remates, para usarlos sueltos.
//
// CARTELA DE CAPÍTULO (la misma maqueta que en los kits adultos)
//   cartela(t, texto, { x, y, sale = 0.75, fin = 1.2 }) → presencia (1 entera · 0…1 saliendo · 0 no está)
//    · Placa de nogal de 190 × 110 px centrada en (240, 117) con marco de latón y el número del salto ('0', '−4',
//      '+21', '½') en ámbar, de 56 px de alto (si no cabe en 140 de ancho, menor). Quieta de 0 a 0,75 s (ya
//      compuesta en el 0); de 0,75 a 1,2 s sube con peso y se va por arriba. Sin texto no hace nada. Va la última,
//      justo antes de presentar.
//
// NÚMEROS Y SÍMBOLOS (sin palabras: solo lo que permite el CONTRATO)
//   texto(cadena, x, y, { esc = 1, color, rampa, sombra = TINTA, contorno, suave, alinear = 'izq', bisel })
//    · Glifos de 5 × 7 a mano: 0–9 − + ½ ? ! ✓ ✗ → ← ↑ ↓ × ° % . : / = ≈ y las unidades m, k (km), s, h. «^»
//      sube a exponente lo que le sigue (cifras y signo, en 3 × 5): '10^−4 m', '10^27 m'. '-' vale por '−'.
//    · y: el borde de arriba de las cifras (los exponentes asoman 2·esc por encima). esc: escala entera; con esc
//      ≥ 3 (o suave: true) los trazos se redondean y, con rampa, llevan degradado y bisel (cifras de cartela).
//    · Devuelve { x0, y0, w, h }. anchoTexto(cadena, esc).
//
// FONDOS
//   crearPlato({ ancho = 640, focoX = 300, sueloY = 200, semilla }) → { capa, ancho, sueloY, focoX, dibujar({
//     camX = 80, t, polvo = 1 }) }: el plató tierra (ciclorama sin costura, charco de luz del foco en la pared y
//     en el suelo, haz de luz desde arriba a la izquierda con motas de polvo). camX 80 = centrado; focoX es x de
//     la capa (en pantalla, focoX − camX). Pinta la pantalla entera.
//   crearCielo({ ancho = 640, alto = 270, semilla, via = 0.8, nebulosa = 0.5, densidad = 1 }) → { capa,
//     dibujar({ camX = 0, camY = 0, t }) }: cielo estrellado con Vía Láctea tramada, nebulosas y tres planos
//     de estrellas con paralaje (0,25 · 0,5 · 1) que titilan a 8 fps.
//
// Determinista: todo el azar lleva semilla y dibujar(t) solo depende de t.

export const W = 480, H = 270, ESCALA = 4;
const TAU = Math.PI * 2;

// ════════════════════════════════════════════════════════════════════════════
//  COLOR Y PALETA
// ════════════════════════════════════════════════════════════════════════════
export const hex = (h) => { const n = parseInt(h.slice(1), 16); return (0xff000000 | ((n & 255) << 16) | (n & 0xff00) | (n >> 16)) >>> 0; };
const pal = (a) => a.map(hex);
const c8 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
export const rgb = (c) => [c & 255, (c >>> 8) & 255, (c >>> 16) & 255];
export const color = (r, g, b) => (0xff000000 | (c8(b) << 16) | (c8(g) << 8) | c8(r)) >>> 0;
export function mezclaColor(a, b, u) {
  return color((a & 255) + ((b & 255) - (a & 255)) * u, ((a >>> 8) & 255) + (((b >>> 8) & 255) - ((a >>> 8) & 255)) * u,
    ((a >>> 16) & 255) + (((b >>> 16) & 255) - ((a >>> 16) & 255)) * u);
}
export const luma = (c) => ((c & 255) * 0.299 + ((c >>> 8) & 255) * 0.587 + ((c >>> 16) & 255) * 0.114) / 255;

export const PAL = {
  TINTA: hex('#07060a'),
  BLANCO: hex('#fffaf0'),
  // plató: telón y suelo tierra; las sombras tiran a ciruela y las luces a melocotón
  TELON: pal(['#0b090c', '#131014', '#1b161b', '#241d22', '#2e2529', '#392e30', '#463837', '#54433f', '#644f48', '#765c52', '#8a6b5d', '#a07e6b']),
  SUELO: pal(['#09080a', '#110e11', '#191418', '#221b1e', '#2c2325', '#372c2c', '#433533', '#51403b', '#614c44', '#735a4f']),
  // cosmos
  NOCHE: pal(['#04050b', '#080a15', '#0c0f20', '#11162c', '#171e39', '#1f2747', '#283256', '#333e66', '#404d77', '#4f5d88']),
  ESTRELLA: pal(['#3a4570', '#6b7aa8', '#a6b6df', '#dde6ff', '#ffffff']),
  NEBULOSA: pal(['#0d0b1c', '#16112b', '#21163a', '#2f1d47', '#412755', '#583565']),
  // Atom (latón claro, núcleo de terracota y crema, electrones ámbar)
  LATON: pal(['#2a1a0c', '#553617', '#86592a', '#b5833e', '#ddb05c', '#f2d38a', '#fff1c8']),
  TERRACOTA: pal(['#3a120e', '#682016', '#9b3a24', '#c9583a', '#e8805a', '#fbb08a']),
  CREMA: pal(['#3d332f', '#6f6157', '#a39180', '#cfbfa8', '#ece2cf', '#fffaee']),
  AMBAR: pal(['#4d2006', '#8f440c', '#d27818', '#f5a832', '#ffd46e', '#fff2c4']),
  // persona
  PIEL: pal(['#2a1416', '#552a2a', '#86483e', '#b26a55', '#d38d70', '#eab08f', '#f8d2b5']),
  PELO: pal(['#120b0a', '#24150f', '#3a2216', '#54331f', '#704629', '#8d5c37']),
  JERSEY: pal(['#14151d', '#22242f', '#353845', '#4c505c', '#666a75', '#838690', '#a3a5ad', '#c5c6cb']),
  CAQUI: pal(['#1a1712', '#2e2a1f', '#474030', '#635a43', '#807558', '#9d916f', '#b9ad89']),
  ZAPATO: pal(['#120b09', '#2a1910', '#452a1a', '#643d25', '#855334']),
  OJO: pal(['#170c0e', '#3a2018', '#6b4328', '#9a6a3e', '#f1e7dd']),
  // madera y piezas
  BOJ: pal(['#3a2410', '#6a4520', '#9a6c35', '#c79a55', '#e6c27c', '#f7e0a8']),
  NOGAL: pal(['#0f0907', '#1d110c', '#2d1b12', '#40271a', '#553523', '#6d452e', '#87583a']),
  NIEBLA: pal(['#262a38', '#3f4556', '#5e6474', '#828796', '#a9adb8', '#cfd1d7']),
};

// ════════════════════════════════════════════════════════════════════════════
//  UTILIDADES
// ════════════════════════════════════════════════════════════════════════════
export function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function hash2(ix, iy) { let h = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
export function vnoise(x, y) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const v00 = hash2(x0, y0), v10 = hash2(x0 + 1, y0), v01 = hash2(x0, y0 + 1), v11 = hash2(x0 + 1, y0 + 1);
  const top = v00 + (v10 - v00) * sx, bot = v01 + (v11 - v01) * sx;
  return top + (bot - top) * sy;
}
export function fbm(x, y, oct = 3) { let v = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < oct; i++) { v += a * vnoise(x * f + i * 17.3, y * f - i * 9.1); n += a; a *= 0.5; f *= 2.03; } return v / n; }
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const mezcla = (a, b, u) => a + (b - a) * u;
export const lin = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
export const suave = (a, b, v) => { const p = lin(v, a, b); return p * p * (3 - 2 * p); };
export const entra = (p) => { p = clamp(p, 0, 1); return p * p * p; };
export const sale = (p) => { p = clamp(p, 0, 1); return 1 - (1 - p) ** 3; };
export const entraSale = (p) => { p = clamp(p, 0, 1); return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(2 - 2 * p, 3) / 2; };
export const rebote = (p) => { p = clamp(p, 0, 1); const c = 1.70158 * 1.2; return 1 + (c + 1) * (p - 1) ** 3 + c * (p - 1) ** 2; };
export const fot = (t, fps = 12) => Math.floor(t * fps + 1e-6);
export const paso = (t, fps = 12) => fot(t, fps) / fps;
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const B8 = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
export const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
export const b8 = (x, y) => (B8[((y & 7) << 3) | (x & 7)] + 0.5) / 64;
export function tono(rampa, v, x, y, k = 1) {
  let l = Math.floor(v), f = v - l;
  if (k < 1) f = k <= 0 ? (f >= 0.5 ? 1 : 0) : clamp((f - 0.5) / k + 0.5, 0, 1);
  if (f > b4(x, y)) l++;
  return rampa[l < 0 ? 0 : l >= rampa.length ? rampa.length - 1 : l];
}
const norm3 = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const suma3 = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const smin = (a, b, k) => { const h = clamp(0.5 + (0.5 * (b - a)) / k, 0, 1); return mezcla(b, a, h) - k * h * (1 - h); };

// luz del kit (dirección hacia la luz; x a la derecha, y hacia abajo, z hacia la cámara)
const LK = norm3([-0.46, -0.56, 0.69]);    // principal cálida: arriba a la izquierda, delante
const LR = norm3([0.9, -0.18, -0.4]);      // contraluz frío: a la derecha y detrás

// ════════════════════════════════════════════════════════════════════════════
//  DESTINO DEL DIBUJO Y PRIMITIVAS
// ════════════════════════════════════════════════════════════════════════════
const PANTALLA = { w: W, h: H, buf: new Uint32Array(W * H) };
let T = PANTALLA;
export function nuevaCapa(w = W, h = H) { return { w, h, buf: new Uint32Array(w * h) }; }
export function en(capa, fn) { const prev = T; T = capa; try { return fn(); } finally { T = prev; } }
export function destino() { return T; }
export function limpiar(c = PAL.TINTA) { T.buf.fill(c); }
export function pset(x, y, c) { if (x >= 0 && y >= 0 && x < T.w && y < T.h) T.buf[(y | 0) * T.w + (x | 0)] = c; }
export function pget(x, y) { return x >= 0 && y >= 0 && x < T.w && y < T.h ? T.buf[(y | 0) * T.w + (x | 0)] : 0; }
const col = (c, x, y) => (typeof c === 'function' ? c(x, y) : c);
export function rect(x0, y0, x1, y1, c) {
  x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0)); x1 = Math.min(T.w - 1, Math.round(x1)); y1 = Math.min(T.h - 1, Math.round(y1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const k = col(c, x, y); if (k) T.buf[y * T.w + x] = k; }
}
export function linea(x0, y0, x1, y1, c, salto = 1) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let err = dx + dy, k = 0;
  for (let n = 0; n < 4000; n++) {
    if (k++ % salto === 0) { const q = col(c, x0, y0); if (q) pset(x0, y0, q); }
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}
export function elipse(cx, cy, rx, ry, c) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
    const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry;
    if (u * u + v * v <= 1) { const q = col(c, x, y); if (q) pset(x, y, q); }
  }
}
export const disco = (cx, cy, r, c) => elipse(cx, cy, r, r, c);
export function anillo(cx, cy, r, c) {
  const pts = trazoElipse(cx, cy, r, r, 0);
  for (const [x, y] of pts) pset(x, y, col(c, x, y));
}
// puntos de una elipse girada, de un píxel, sin escalones dobles (L) — «pixel perfect»
function trazoElipse(cx, cy, rx, ry, ang, conTheta = false) {
  const N = Math.max(16, Math.ceil(TAU * Math.max(rx, ry) * 2));
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const raw = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * TAU, ex = rx * Math.cos(th), ey = ry * Math.sin(th);
    const x = Math.floor(cx + ex * ca - ey * sa), y = Math.floor(cy + ex * sa + ey * ca);
    const u = raw[raw.length - 1];
    if (!u || u[0] !== x || u[1] !== y) raw.push([x, y, th]);
  }
  while (raw.length > 1 && raw[0][0] === raw[raw.length - 1][0] && raw[0][1] === raw[raw.length - 1][1]) raw.pop();
  // quita el píxel de cada esquina en L
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const a = raw[(i - 1 + raw.length) % raw.length], b = raw[i], c = raw[(i + 1) % raw.length];
    if (Math.abs(a[0] - c[0]) === 1 && Math.abs(a[1] - c[1]) === 1 && (a[0] === b[0] || a[1] === b[1]) && out.length && out[out.length - 1] === a) continue;
    out.push(b);
  }
  return conTheta ? out : out.map((p) => [p[0], p[1]]);
}
export function degradado(x0, y0, x1, y1, rampa, fn, k = 1) {
  x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0)); x1 = Math.min(T.w - 1, Math.round(x1)); y1 = Math.min(T.h - 1, Math.round(y1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = fn(x, y); if (v != null) T.buf[y * T.w + x] = tono(rampa, v, x, y, k); }
}
export const degradadoV = (x0, y0, x1, y1, rampa, v0, v1, k = 1) => degradado(x0, y0, x1, y1, rampa, (x, y) => mezcla(v0, v1, (y - y0) / Math.max(1, y1 - y0)), k);
export const degradadoRadial = (cx, cy, r, rampa, vc, vb, k = 1) => degradado(cx - r, cy - r, cx + r, cy + r, rampa, (x, y) => {
  const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; return d > 1 ? null : mezcla(vc, vb, d);
}, k);
// suma luz con caída suave, cuantizada en escalones tramados
export function luz(cx, cy, r, c, fuerza = 0.5, pasos = 4) {
  if (r <= 0 || fuerza <= 0) return;
  const [cr, cg, cb] = typeof c === 'number' ? rgb(c) : c;
  for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(T.h - 1, Math.ceil(cy + r)); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(T.w - 1, Math.ceil(cx + r)); x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (d >= 1) continue;
    const I = fuerza * (1 - d) * (1 - d);
    const q = Math.floor(I * pasos + b4(x, y)) / pasos;
    if (q <= 0) continue;
    const i = y * T.w + x, p = T.buf[i]; if (!p) continue;
    T.buf[i] = color((p & 255) + cr * q, ((p >>> 8) & 255) + cg * q, ((p >>> 16) & 255) + cb * q);
  }
}
function multiplicar(i, f) { const p = T.buf[i]; if (p) T.buf[i] = color((p & 255) * f, ((p >>> 8) & 255) * f, ((p >>> 16) & 255) * f); }
export function sombra(cx, cy, rx, ry, fuerza = 0.5) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(T.h - 1, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(T.w - 1, Math.ceil(cx + rx)); x++) {
    const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry, d = u * u + v * v; if (d >= 1) continue;
    const q = Math.floor(fuerza * (1 - d) * 4 + b4(x, y)) / 4;
    if (q > 0) multiplicar(y * T.w + x, 1 - Math.min(0.9, q));
  }
}
export function sombraRect(x0, y0, x1, y1, fuerza = 0.5, borde = 4) {
  for (let y = Math.max(0, Math.round(y0 - borde)); y <= Math.min(T.h - 1, Math.round(y1 + borde)); y++) for (let x = Math.max(0, Math.round(x0 - borde)); x <= Math.min(T.w - 1, Math.round(x1 + borde)); x++) {
    const dx = Math.max(x0 - x, 0, x - x1), dy = Math.max(y0 - y, 0, y - y1), d = Math.hypot(dx, dy) / borde;
    if (d >= 1) continue;
    const q = Math.floor(fuerza * (1 - d) * 4 + b4(x, y)) / 4;
    if (q > 0) multiplicar(y * T.w + x, 1 - Math.min(0.9, q));
  }
}
export function oscurecer(x0, y0, x1, y1, k) {
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(T.h - 1, Math.round(y1)); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(T.w - 1, Math.round(x1)); x++) multiplicar(y * T.w + x, 1 - k);
}
export function velo(c, u) {
  if (u <= 0) return;
  for (let y = 0; y < T.h; y++) for (let x = 0; x < T.w; x++) if (b8(x, y) < u) T.buf[y * T.w + x] = c;
}
export function pegar(capa, dx = 0, dy = 0, { envolver = false, opaco = false } = {}) {
  dx = Math.round(dx); dy = Math.round(dy);
  for (let y = 0; y < T.h; y++) {
    let sy = y - dy;
    if (envolver) sy = ((sy % capa.h) + capa.h) % capa.h; else if (sy < 0 || sy >= capa.h) continue;
    const fila = sy * capa.w, dfila = y * T.w;
    if (!envolver && opaco) {
      const x0 = Math.max(0, dx), x1 = Math.min(T.w, dx + capa.w);
      if (x1 > x0) T.buf.set(capa.buf.subarray(fila + x0 - dx, fila + x1 - dx), dfila + x0);
      continue;
    }
    for (let x = 0; x < T.w; x++) {
      let sx = x - dx;
      if (envolver) sx = ((sx % capa.w) + capa.w) % capa.w; else if (sx < 0 || sx >= capa.w) continue;
      const c = capa.buf[fila + sx];
      if (c) T.buf[dfila + x] = c;
    }
  }
}
export const parallax = (capa, camX = 0, camY = 0, factor = 1, o = {}) => pegar(capa, -Math.round(camX * factor), -Math.round(camY * factor), o);
export function instantanea() { const c = nuevaCapa(T.w, T.h); c.buf.set(T.buf); return c; }
export function ampliar(capa, fx, fy, m, sx = W / 2, sy = H / 2, fondo = PAL.TINTA) {
  for (let y = 0; y < T.h; y++) for (let x = 0; x < T.w; x++) {
    const ax = Math.floor(fx + (x + 0.5 - sx) / m), ay = Math.floor(fy + (y + 0.5 - sy) / m);
    T.buf[y * T.w + x] = ax >= 0 && ay >= 0 && ax < capa.w && ay < capa.h ? (capa.buf[ay * capa.w + ax] || fondo) : fondo;
  }
}
function blitSprite(spr, dx = 0, dy = 0) {
  for (let j = 0; j < spr.h; j++) for (let i = 0; i < spr.w; i++) { const c = spr.px[j * spr.w + i]; if (c) pset(spr.x0 + i + dx, spr.y0 + j + dy, c); }
}

// ════════════════════════════════════════════════════════════════════════════
//  NÚMEROS Y SÍMBOLOS (glifos a mano; nada de letras salvo las unidades)
// ════════════════════════════════════════════════════════════════════════════
const F57 = {
  '0': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  '1': ['..#..', '.##..', '#.#..', '..#..', '..#..', '..#..', '#####'],
  '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  '3': ['.###.', '#...#', '....#', '..##.', '....#', '#...#', '.###.'],
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  '6': ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  '9': ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  '−': ['....', '....', '....', '####', '....', '....', '....'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  '!': ['#', '#', '#', '#', '#', '.', '#'],
  'm': ['.....', '.....', '####.', '#.#.#', '#.#.#', '#.#.#', '#.#.#'],
  'k': ['#...', '#...', '#..#', '#.#.', '##..', '#.#.', '#..#'],
  's': ['....', '....', '.###', '#...', '.##.', '...#', '###.'],
  'h': ['#...', '#...', '###.', '#..#', '#..#', '#..#', '#..#'],
  '°': ['.#.', '#.#', '.#.', '...', '...', '...', '...'],
  '%': ['##...', '##..#', '...#.', '..#..', '.#...', '#..##', '...##'],
  '½': ['.#...#...', '##...#...', '.#..#.##.', '.#..#...#', '###.#..#.', '...#..#..', '...#..###'],
  '✓': ['.......', '......#', '.....##', '#...##.', '##.##..', '.###...', '..#....'],
  '✗': ['#...#', '##.##', '.###.', '..#..', '.###.', '##.##', '#...#'],
  '→': ['.......', '....#..', '.....#.', '#######', '.....#.', '....#..', '.......'],
  '←': ['.......', '..#....', '.#.....', '#######', '.#.....', '..#....', '.......'],
  '↑': ['..#..', '.###.', '#.#.#', '..#..', '..#..', '..#..', '..#..'],
  '↓': ['..#..', '..#..', '..#..', '..#..', '#.#.#', '.###.', '..#..'],
  '×': ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  '.': ['.', '.', '.', '.', '.', '.', '#'],
  ':': ['.', '.', '#', '.', '.', '#', '.'],
  '/': ['....#', '...#.', '...#.', '..#..', '.#...', '.#...', '#....'],
  '=': ['.....', '.....', '#####', '.....', '#####', '.....', '.....'],
  '≈': ['.....', '.##.#', '#..#.', '.....', '.##.#', '#..#.', '.....'],
};
const F35 = {
  '0': ['###', '#.#', '#.#', '#.#', '###'], '1': ['.#.', '##.', '.#.', '.#.', '###'], '2': ['##.', '..#', '.#.', '#..', '###'],
  '3': ['##.', '..#', '.#.', '..#', '##.'], '4': ['#.#', '#.#', '###', '..#', '..#'], '5': ['###', '#..', '##.', '..#', '##.'],
  '6': ['.##', '#..', '###', '#.#', '###'], '7': ['###', '..#', '.#.', '.#.', '.#.'], '8': ['###', '#.#', '###', '#.#', '###'],
  '9': ['###', '#.#', '###', '..#', '##.'], '−': ['...', '...', '###', '...', '...'], '+': ['...', '.#.', '###', '.#.', '...'],
};
const NORMALIZA = { '-': '−', '*': '×', 'x': '×' };
const CACHE_TEXTO = new Map();
function maquetar(str) {
  const items = [];
  let x = 0, sup = false;
  for (const raw of str) {
    if (raw === '^') { sup = true; continue; }
    const ch = NORMALIZA[raw] ?? raw;
    if (sup && !F35[ch]) sup = false;
    if (ch === ' ') { x += 3; continue; }
    const g = sup ? F35[ch] : F57[ch];
    if (!g) continue;
    items.push({ g, x, y: sup ? 0 : 2 });
    x += g[0].length + 1;
  }
  const w = Math.max(0, x - 1), h = 9;
  const m = new Uint8Array(Math.max(1, w * h));
  for (const it of items) for (let j = 0; j < it.g.length; j++) for (let i = 0; i < it.g[j].length; i++) if (it.g[j][i] === '#') m[(it.y + j) * w + it.x + i] = 1;
  return { m, w, h };
}
function mascaraTexto(str, s, suaveTxt) {
  const clave = str + '|' + s + '|' + (suaveTxt ? 1 : 0);
  let r = CACHE_TEXTO.get(clave);
  if (r) return r;
  const L = maquetar(str), w = L.w * s, h = L.h * s, M = new Uint8Array(Math.max(1, w * h));
  const m = (i, j) => (i < 0 || j < 0 || i >= L.w || j >= L.h ? 0 : L.m[j * L.w + i]);
  for (let Y = 0; Y < h; Y++) for (let X = 0; X < w; X++) {
    if (!suaveTxt || s < 2) { M[Y * w + X] = m(Math.floor(X / s), Math.floor(Y / s)); continue; }
    const u = (X + 0.5) / s - 0.5, v = (Y + 0.5) / s - 0.5, i0 = Math.floor(u), j0 = Math.floor(v), fu = u - i0, fv = v - j0;
    const val = m(i0, j0) * (1 - fu) * (1 - fv) + m(i0 + 1, j0) * fu * (1 - fv) + m(i0, j0 + 1) * (1 - fu) * fv + m(i0 + 1, j0 + 1) * fu * fv;
    M[Y * w + X] = val >= 0.5 ? 1 : 0;
  }
  r = { M, w, h };
  if (CACHE_TEXTO.size > 300) CACHE_TEXTO.clear();
  CACHE_TEXTO.set(clave, r);
  return r;
}
export const anchoTexto = (str, esc = 1) => maquetar(str).w * Math.max(1, Math.round(esc));
export function texto(str, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.esc ?? 1));
  const { color: c = PAL.CREMA[4], rampa = null, sombra: csom = PAL.TINTA, contorno = null, alinear = 'izq' } = o;
  const suaveTxt = o.suave ?? s >= 3, bisel = o.bisel ?? s >= 3;
  const { M, w, h } = mascaraTexto(String(str), s, suaveTxt);
  if (!w) return { x0: x, y0: y, w: 0, h: 0 };
  const x0 = Math.round(alinear === 'centro' ? x - w / 2 : alinear === 'der' ? x - w : x), y0 = Math.round(y) - 2 * s;
  const at = (i, j) => (i >= 0 && j >= 0 && i < w && j < h ? M[j * w + i] : 0);
  const off = Math.max(1, Math.round(s / 2));
  if (csom != null) for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (at(i, j)) pset(x0 + i + off, y0 + j + off, csom);
  if (contorno != null) for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) {
    if (at(i, j)) continue;
    if (at(i - 1, j) || at(i + 1, j) || at(i, j - 1) || at(i, j + 1) || (s >= 3 && (at(i - 1, j - 1) || at(i + 1, j - 1) || at(i - 1, j + 1) || at(i + 1, j + 1)))) pset(x0 + i, y0 + j, contorno);
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!at(i, j)) continue;
    let k = c;
    if (rampa) {
      let v = mezcla(rampa.length - 1.3, rampa.length * 0.4, clamp((j - 1.5 * s) / (7.5 * s), 0, 1));
      if (bisel) { if (!at(i, j - Math.max(1, s >> 2))) v += 1.2; else if (!at(i, j + Math.max(1, s >> 2))) v -= 1; if (!at(i - 1, j)) v += 0.4; }
      k = tono(rampa, v, x0 + i, y0 + j, 0.4);
    }
    pset(x0 + i, y0 + j, k);
  }
  return { x0, y0: y0 + 2 * s, w, h: 7 * s };
}

// ════════════════════════════════════════════════════════════════════════════
//  ATOM
// ════════════════════════════════════════════════════════════════════════════
export const ATOM_SITIO = { x: 58, y: 190, r: 14 };
// tres órbitas inclinadas (como el de plastilina: una casi horizontal y dos que se cruzan)
const ORBITAS = [
  { ang: -0.16, k: 0.4, s: 1, v: 1.0, f0: 0.0 },
  { ang: 1.12, k: 0.34, s: -1, v: 1.17, f0: 2.2 },
  { ang: -1.02, k: 0.3, s: 1, v: 0.86, f0: 4.1 },
];
// núcleo: nueve bolas (protones de terracota y neutrones de crema) en un racimo
const NUCLEO = (() => {
  const out = [[0, 0, 0.12, 1]];
  for (let i = 0; i < 8; i++) {
    const y = 1 - (2 * (i + 0.5)) / 8, r = Math.sqrt(1 - y * y), a = i * 2.39996;
    out.push([Math.cos(a) * r * 0.6, y * 0.6, Math.sin(a) * r * 0.6, i % 3 === 0 ? 0 : 1]);
  }
  return out;  // [x, y, z, tipo (0 protón, 1 neutrón)]
})();
export function atom(o = {}) {
  const { x = ATOM_SITIO.x, y = ATOM_SITIO.y, r = ATOM_SITIO.r, t = 0, energia = 0, brillo = 0, saludo = 0, fps = 15 } = o;
  const kv = o.velo ?? 0.3;
  const tq = paso(t, fps);
  const eq = Math.round(clamp(energia, 0, 1) * 4) / 4;
  const fa = o.fase ?? tq * 2.3;
  const cx = Math.round(x), cy = Math.round(y);
  if (kv > 0) sombra(cx, cy, r * 1.5, r * 1.5, kv);
  luz(cx, cy, r * (1.05 + 0.3 * eq + 0.5 * brillo), PAL.AMBAR[3], 0.13 + 0.2 * eq + 0.45 * brillo, 3);
  // sprite propio (transparente) para el contorno
  const n = 2 * Math.ceil(r * 2.6 + 8), c0 = n / 2;
  const spr = nuevaCapa(n, n);
  const grueso = r >= 34 ? 1.5 : r >= 18 ? 1.0 : 0;
  const re = r >= 34 ? 3 : r >= 22 ? 2.4 : r >= 12 ? 1.8 : 1.3;
  const brillante = eq >= 0.5 || brillo > 0.4;
  en(spr, () => {
    const pix = [];   // [x, y, z, color] de las órbitas
    const electrones = [];
    ORBITAS.forEach((ob, i) => {
      const ca = Math.cos(ob.ang), sa = Math.sin(ob.ang), ry = r * ob.k;
      const colorDe = (th, z, X, Y) => {
        const lado = ((X - c0) * -0.6 + (Y - c0) * -0.8) / r;   // hacia la luz
        if (z < 0) return z < -0.55 ? PAL.LATON[1] : PAL.LATON[2];
        return lado > 0.45 ? PAL.LATON[6] : lado > -0.2 ? PAL.LATON[5] : PAL.LATON[4];
      };
      if (!grueso) {
        for (const [X, Y, th] of trazoElipse(c0, c0, r, ry, ob.ang, true)) {
          const z = ob.s * Math.sin(th);
          pix.push([X, Y, z, colorDe(th, z, X, Y)]);
        }
      } else {
        const R = Math.ceil(r + 2);
        for (let Y = Math.floor(c0 - R); Y <= c0 + R; Y++) for (let X = Math.floor(c0 - R); X <= c0 + R; X++) {
          const dx = X + 0.5 - c0, dy = Y + 0.5 - c0;
          const lx = dx * ca + dy * sa, ly = -dx * sa + dy * ca;
          const f = Math.hypot(lx / r, ly / ry);
          const g = Math.hypot(lx / (r * r), ly / (ry * ry)) / Math.max(f, 1e-6);
          const d = (f - 1) / Math.max(g, 1e-6);
          if (Math.abs(d) > grueso) continue;
          const th = Math.atan2(ly / ry, lx / r), z = ob.s * Math.sin(th);
          let cc = colorDe(th, z, X, Y);
          if (z >= 0 && d > grueso * 0.35) cc = PAL.LATON[3];       // canto de abajo del alambre
          pix.push([X, Y, z, cc]);
        }
      }
      // su electrón
      const th = fa * ob.v + ob.f0, ex = r * Math.cos(th), ey = ry * Math.sin(th);
      electrones.push({ x: c0 + ex * ca - ey * sa, y: c0 + ex * sa + ey * ca, z: ob.s * Math.sin(th), i });
    });
    // el saludo: un electrón sale de la órbita sobre un alambre y se mece
    let alambre = null;
    if (saludo > 0) {
      const e0 = electrones[1];
      const ob = ORBITAS[1], ca = Math.cos(ob.ang), sa = Math.sin(ob.ang);
      // el punto de la órbita más arriba a la derecha y delante
      let best = null;
      for (let k = 0; k < 64; k++) {
        const th = (k / 64) * TAU, ex = r * Math.cos(th), ey = r * ob.k * Math.sin(th), z = ob.s * Math.sin(th);
        if (z < 0) continue;
        const X = c0 + ex * ca - ey * sa, Y = c0 + ex * sa + ey * ca, sc = X - c0 - (Y - c0);
        if (!best || sc > best[2]) best = [X, Y, sc];
      }
      const L = clamp(saludo, 0, 1) * r * 1.05;
      const a = -0.95 + 0.38 * Math.sin(tq * 8.5) * clamp(saludo * 1.5, 0, 1);
      alambre = { x0: best[0], y0: best[1], x1: best[0] + Math.cos(a) * L, y1: best[1] + Math.sin(a) * L };
      e0.x = alambre.x1; e0.y = alambre.y1; e0.z = 1; e0.alambre = true;
    }
    const dibElectron = (e) => {
      const X = e.x, Y = e.y, delante = e.z >= 0;
      const rr = re + (e.alambre ? 0.6 : 0) + (brillante && delante ? 0.35 : 0);
      disco(X, Y, rr, (px, py) => {
        const d = Math.hypot(px + 0.5 - X + rr * 0.3, py + 0.5 - Y + rr * 0.3) / rr;
        if (!delante) return d < 0.5 ? PAL.AMBAR[3] : PAL.AMBAR[2];
        return d < 0.45 ? (brillante ? PAL.AMBAR[5] : PAL.AMBAR[4]) : d < 1.0 ? PAL.AMBAR[3] : PAL.AMBAR[2];
      });
      if (rr < 1.6) pset(Math.floor(X), Math.floor(Y), delante ? (brillante ? PAL.AMBAR[5] : PAL.AMBAR[4]) : PAL.AMBAR[2]);
    };
    // detrás: órbitas, electrones
    for (const p of pix) if (p[2] < 0) pset(p[0], p[1], p[3]);
    for (const e of electrones) if (e.z < 0) dibElectron(e);
    // núcleo
    const rn = Math.max(2.4, r * 0.3) + (eq >= 0.75 ? 1 : eq >= 0.5 ? 0.5 : 0) + brillo * 0.5;
    const giro = tq * 0.7, cg = Math.cos(giro), sg = Math.sin(giro);
    const bolas = NUCLEO.map(([bx, by, bz, tp]) => [(bx * cg + bz * sg) * rn * 0.78, by * rn * 0.78, (-bx * sg + bz * cg) * rn * 0.78, tp]);
    const rb = rn * 0.52;
    const nb = 2 * Math.ceil(rn + 2), idB = new Int8Array(nb * nb).fill(-1), zB = new Float32Array(nb * nb), colB = new Uint32Array(nb * nb);
    const o0 = Math.floor(c0 - rn - 1);
    for (let Y = o0; Y < o0 + nb; Y++) for (let X = o0; X < o0 + nb; X++) {
      const dx = X + 0.5 - c0, dy = Y + 0.5 - c0;
      if (dx * dx + dy * dy > (rn + 0.2) * (rn + 0.2)) continue;
      let best = null, id = 99;
      if (r >= 14) {
        bolas.forEach((b, k) => {
          const qx = dx - b[0] * 1.08, qy = dy - b[1] * 1.08, q2 = qx * qx + qy * qy;
          if (q2 > rb * rb) return;
          const z = b[2] + Math.sqrt(rb * rb - q2);
          if (!best || z > best[0]) { best = [z, qx / rb, qy / rb, (z - b[2]) / rb, b[3]]; id = k; }
        });
      }
      if (!best) {   // núcleo pequeño: una bola con un punto de crema
        const q2 = (dx * dx + dy * dy) / (rn * rn);
        best = [0, dx / rn, dy / rn, Math.sqrt(Math.max(0, 1 - q2)), (dx + dy < -rn * 0.5) ? 1 : 0];
      }
      const lam = Math.max(0, best[1] * LK[0] + best[2] * LK[1] + best[3] * LK[2]);
      const ramp = best[4] ? PAL.CREMA : PAL.TERRACOTA;
      const v = 1.1 + 3.9 * lam + (brillante ? 0.5 : 0);
      const k = (Y - o0) * nb + (X - o0);
      idB[k] = id; zB[k] = best[0]; colB[k] = tono(ramp, v, X, Y, 0);
    }
    for (let j = 0; j < nb; j++) for (let i = 0; i < nb; i++) {
      const k = j * nb + i; if (idB[k] < 0) continue;
      let c = colB[k];
      if (r >= 26) for (const [di, dj] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
        const ii = i + di, jj = j + dj; if (ii < 0 || jj < 0 || ii >= nb || jj >= nb) continue;
        const k2 = jj * nb + ii;
        if (idB[k2] >= 0 && idB[k2] !== idB[k] && zB[k2] > zB[k] + 0.4) { c = mezclaColor(c, PAL.TERRACOTA[0], 0.55); break; }
      }
      pset(o0 + i, o0 + j, c);
    }
    // delante: órbitas, alambre, electrones
    for (const p of pix) if (p[2] >= 0) pset(p[0], p[1], p[3]);
    if (alambre) {
      linea(alambre.x0, alambre.y0, alambre.x1, alambre.y1, PAL.LATON[5]);
      if (r >= 30) linea(alambre.x0 + 1, alambre.y0, alambre.x1 + 1, alambre.y1, PAL.LATON[3]);
    }
    for (const e of electrones) if (e.z >= 0) dibElectron(e);
  });
  // contorno oscuro (se lee sobre fondos claros) y a la pantalla
  const out = new Uint32Array(spr.buf);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    if (spr.buf[j * n + i]) continue;
    const v = (a, b) => (a >= 0 && b >= 0 && a < n && b < n ? spr.buf[b * n + a] : 0);
    if (v(i - 1, j) || v(i + 1, j) || v(i, j - 1) || v(i, j + 1)) out[j * n + i] = PAL.NOGAL[1];
  }
  blitSprite({ px: out, w: n, h: n, x0: cx - c0, y0: cy - c0 });
  // brillo de los electrones que hablan
  if (brillante) luz(cx, cy, r * 0.75, PAL.AMBAR[4], 0.14 + 0.2 * brillo, 3);
  return { x: cx, y: cy, r };
}

// ════════════════════════════════════════════════════════════════════════════
//  LA PERSONA (HUMANO.md)
// ════════════════════════════════════════════════════════════════════════════
// medidas en unidades de altura (H = 1, de la coronilla a la suela); y hacia abajo desde el suelo (negativa)
const CUERPOS = {
  adulto: { cab: 0.17, hombroY: 0.79, ancHom: 0.25, cinY: 0.60, ancCin: 0.168, entY: 0.47, ancCad: 0.19, rodY: 0.27, brazo: 0.18, antebrazo: 0.14, mano: 0.10,
    rB: 0.033, rA: 0.028, rM: 0.047, rP: 0.036, rCu: 0.03, pie: 0.15, ojoY: 0.006 },
  // niño de unos 7 años: cabeza de 1/4,7 de la altura y piernas de 0,45 H
  nino: { cab: 1 / 4.7, hombroY: 0.755, ancHom: 0.235, cinY: 0.585, ancCad: 0.185, ancCin: 0.172, entY: 0.45, rodY: 0.255, brazo: 0.165, antebrazo: 0.13, mano: 0.093,
    rB: 0.032, rA: 0.027, rM: 0.046, rP: 0.036, rCu: 0.031, pie: 0.14, ojoY: 0.014 },
};
function cuerpoDe(edad) {
  const a = CUERPOS.nino, b = CUERPOS.adulto, u = clamp(edad, 0, 1), r = {};
  for (const k in b) r[k] = mezcla(a[k], b[k], u);
  r.s = r.cab / 0.17;   // escala de la cabeza
  return r;
}
const K_OBL = 0.22;   // la cámara mira un poco desde arriba: lo que se acerca baja en pantalla
const MAT = { PIEL: 1, PELO: 2, JERSEY: 3, PANT: 4, ZAP: 5, CUELLO: 6, OREJA: 7 };
const GR = { CUERPO: 0, MANO: 1, CABEZA: 2 };
const v3 = (a, f, side) => [side * Math.sin(a) * Math.cos(f), Math.cos(a) * Math.cos(f), Math.sin(f)];
const rotY = (p, g) => { const c = Math.cos(g), s = Math.sin(g); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; };
function ik(S, P, l1, l2, polo) {
  const d0 = [P[0] - S[0], P[1] - S[1], P[2] - S[2]];
  let d = Math.hypot(d0[0], d0[1], d0[2]);
  const dir = d > 1e-6 ? [d0[0] / d, d0[1] / d, d0[2] / d] : [0, 1, 0];
  d = clamp(d, Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-4);
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  let pv = suma3(polo, dir, -dot3(polo, dir));
  pv = norm3(Math.hypot(...pv) < 1e-4 ? [0, 1, 0] : pv);
  const E = [S[0] + dir[0] * a + pv[0] * h, S[1] + dir[1] * a + pv[1] * h, S[2] + dir[2] * a + pv[2] * h];
  return { E, W: [S[0] + dir[0] * d, S[1] + dir[1] * d, S[2] + dir[2] * d] };
}
// manos: cápsulas en el marco de la mano (u: a lo largo, s: hacia el pulgar, w: hacia donde mira la palma)
// [u0, s0, w0, u1, s1, w1, r0, r1]
const MANOS = {
  relajada: [[0, 0, 0, 0.05, 0, 0.004, 0.021, 0.022], [0.048, -0.002, 0.006, 0.088, -0.002, 0.014, 0.018, 0.013], [0.012, 0.016, 0.004, 0.04, 0.024, 0.014, 0.0095, 0.0075]],
  abierta: [[0, 0, 0, 0.046, 0, 0, 0.024, 0.025], [0.044, -0.016, 0, 0.084, -0.025, 0, 0.0082, 0.0068], [0.046, -0.005, 0, 0.095, -0.008, 0, 0.0086, 0.0072],
    [0.046, 0.006, 0, 0.092, 0.008, 0, 0.0086, 0.0072], [0.044, 0.016, 0, 0.08, 0.024, 0, 0.008, 0.0066], [0.01, 0.022, 0.004, 0.032, 0.048, 0.006, 0.0098, 0.0082]],
  agarra: [[0, 0, 0, 0.044, 0, 0.004, 0.022, 0.024], [0.04, 0, 0.012, 0.048, 0, 0.028, 0.021, 0.019], [0.014, 0.019, 0.01, 0.038, 0.012, 0.03, 0.0095, 0.0085]],
  señala: [[0, 0, 0, 0.044, 0, 0.004, 0.021, 0.023], [0.04, 0.004, 0.012, 0.047, 0.004, 0.026, 0.018, 0.017], [0.04, -0.012, 0, 0.098, -0.012, 0, 0.0078, 0.0068],
    [0.014, 0.019, 0.008, 0.04, 0.021, 0.022, 0.009, 0.0078]],
};
MANOS.puño = MANOS.agarra;
const PALMA = { relajada: (s) => [-s, 0, 0], puño: (s) => [-s, 0, 0], abierta: () => [0, 0, 1], agarra: () => [0, 1, 0], señala: () => [0, 1, 0] };

// cada pose → por brazo { a1, f1, a2, f2 } (ángulos: a hacia fuera, f hacia delante) o { mano: [x, y, z] (IK) },
// más tipo de mano, U (dirección de la mano), Wn (palma); por pierna { a, f, k }; cabeza; mirada.
const brazoQuieto = (side) => ({ a1: 0.085, f1: 0.03, a2: 0.05, f2: 0.12, tipo: 'relajada' });
const piernaQuieta = () => ({ a: 0.035, f: 0, k: 0 });
export const POSES = {
  depie: () => ({ brazos: [{ a1: 0.07, f1: 0.02, a2: 0.03, f2: 0.16, tipo: 'relajada' }, { a1: 0.1, f1: 0.05, a2: 0.06, f2: 0.1, tipo: 'relajada' }],
    piernas: [{ a: 0.028, f: 0, k: 0 }, { a: 0.05, f: 0.02, k: 0.02 }] }),
  sostener: (C, o) => {
    const m = o.manos ?? [0, 0, 0];
    const h = [0.072 + m[0], -C.cinY - 0.075 + m[1], 0.17 + m[2]];
    return {
      brazos: [-1, 1].map((sd) => ({ mano: [sd * h[0], h[1], h[2]], polo: [sd * 0.5, 1, -0.4], tipo: 'agarra', U: [-sd * 0.25, 0.05, 1], Wn: [0, 1, 0] })),
      piernas: [piernaQuieta(), piernaQuieta()], mirada: [0, 0.4],
    };
  },
  señalar: (C, o, ctx) => {
    const lado = o.lado ?? 1, i = lado < 0 ? 0 : 1;
    const S = ctx.hombro(lado);
    let dir = [1 * lado, -0.2, 0];
    if (o.apunta) { const P = ctx.aModelo(o.apunta); dir = norm3([P[0] - S[0], P[1] - S[1], 0.0]); }
    // el codo queda doblado y por encima de la cintura: la mano va a 0,25 del hombro, hacia el objetivo
    const alcance = 0.235;
    let dy = dir[1];
    const mano = [S[0] + dir[0] * alcance, S[1] + Math.min(dy * alcance, 0.12), S[2] + 0.07];
    const br = [brazoQuieto(-1), brazoQuieto(1)];
    br[i] = { mano, polo: [lado * 0.6, 0.8, -0.3], tipo: 'señala', apunta: o.apunta ? ctx.aModelo(o.apunta) : null, U: dir };
    return { brazos: br, piernas: [piernaQuieta(), piernaQuieta()], cabeza: { giro: dir[0] * 0.25 }, mirada: [dir[0] * 0.8, dir[1] * 0.6] };
  },
  saludar: (C, o) => {
    const lado = o.lado ?? 1, i = lado < 0 ? 0 : 1;
    const w = 0.34 * Math.sin(paso(o.t ?? 0, 12) * TAU * 1.6);
    const br = [brazoQuieto(-1), brazoQuieto(1)];
    br[i] = { mano: [lado * 0.215, -C.hombroY - 0.13, 0.06], polo: [lado * 0.7, 0.75, -0.2], tipo: 'abierta', U: [Math.sin(w) * lado + lado * 0.1, -Math.cos(w), 0.1], Wn: [0, 0, 1] };
    return { brazos: br, piernas: [piernaQuieta(), piernaQuieta()], cabeza: { ladeo: -lado * 0.06 } };
  },
  mirarArriba: () => ({
    brazos: [{ a1: 0.1, f1: -0.07, a2: 0.06, f2: 0.02, tipo: 'relajada' }, { a1: 0.1, f1: -0.07, a2: 0.06, f2: 0.02, tipo: 'relajada' }],
    piernas: [piernaQuieta(), piernaQuieta()], cabeza: { cabeceo: 0.48 }, mirada: [0, -1],
  }),
  andar: (C, o) => {
    const f = o.fase ?? paso(o.t ?? 0, 12) * TAU * 0.95;
    const pierna = (ph) => { const sw = Math.sin(ph); return { a: 0.03, f: 0.42 * sw, k: 0.85 * Math.max(0, Math.sin(ph - 1.35)) }; };
    const brazo = (ph) => { const sw = -Math.sin(ph); return { a1: 0.09, f1: 0.34 * sw, a2: 0.05, f2: 0.34 * sw + 0.32, tipo: 'relajada' }; };
    return { brazos: [brazo(f + Math.PI), brazo(f)], piernas: [pierna(f), pierna(f + Math.PI)] };
  },
};
POSES.senalar = POSES.señalar;
POSES.mirar = POSES.mirarArriba;
export function mezclarPoses(a, b, u) { return { de: a, a: b, u }; }

// resuelve la pose a puntos 3D (marco del cuerpo, sin girar)
function resolverPose(pose, C, o, ctx) {
  if (pose && typeof pose === 'object' && 'de' in pose) {
    const A = resolverPose(pose.de, C, o, ctx), B = resolverPose(pose.a, C, o, ctx), u = clamp(pose.u ?? 0, 0, 1);
    const L = (p, q) => [mezcla(p[0], q[0], u), mezcla(p[1], q[1], u), mezcla(p[2], q[2], u)];
    return {
      brazos: A.brazos.map((ba, i) => {
        const bb = B.brazos[i], S = ba.S;
        const E = suma3(S, norm3(suma3(L(ba.E, bb.E), S, -1)), C.brazo);
        const Wr = suma3(E, norm3(suma3(L(ba.W, bb.W), E, -1)), C.antebrazo);
        return { S, E, W: Wr, U: norm3(L(ba.U, bb.U)), Wn: norm3(L(ba.Wn, bb.Wn)), tipo: u < 0.5 ? ba.tipo : bb.tipo, apunta: u < 0.5 ? ba.apunta : bb.apunta };
      }),
      piernas: A.piernas.map((pa, i) => {
        const pb = B.piernas[i], Hj = pa.Hj;
        const K = suma3(Hj, norm3(suma3(L(pa.K, pb.K), Hj, -1)), C.muslo);
        return { Hj, K, A: suma3(K, norm3(suma3(L(pa.A, pb.A), K, -1)), C.canilla), pieGiro: mezcla(pa.pieGiro, pb.pieGiro, u) };
      }),
      cabeza: { giro: mezcla(A.cabeza.giro, B.cabeza.giro, u), cabeceo: mezcla(A.cabeza.cabeceo, B.cabeza.cabeceo, u), ladeo: mezcla(A.cabeza.ladeo, B.cabeza.ladeo, u) },
      mirada: [mezcla(A.mirada[0], B.mirada[0], u), mezcla(A.mirada[1], B.mirada[1], u)],
    };
  }
  const spec = typeof pose === 'function' ? pose(C, o, ctx) : typeof pose === 'string' ? (POSES[pose] ?? POSES.depie)(C, o, ctx) : pose;
  const brazos = [-1, 1].map((side, i) => {
    const b = spec.brazos?.[i] ?? brazoQuieto(side);
    const S = ctx.hombro(side);
    let E, Wr;
    if (b.mano) ({ E, W: Wr } = ik(S, b.mano, C.brazo, C.antebrazo, b.polo ?? [side * 0.5, 1, -0.3]));
    else { E = suma3(S, v3(b.a1, b.f1, side), C.brazo); Wr = suma3(E, v3(b.a2, b.f2, side), C.antebrazo); }
    const tipo = b.tipo ?? 'relajada';
    let U = b.U ? norm3(b.U) : norm3(suma3(suma3(Wr, E, -1), [0, 0.0, 0.12], C.antebrazo));
    if (b.apunta) U = norm3([b.apunta[0] - Wr[0], b.apunta[1] - Wr[1], (b.apunta[2] ?? 0) - Wr[2]]);
    let Wn = b.Wn ?? PALMA[tipo](side);
    Wn = suma3(Wn, U, -dot3(Wn, U));
    if (Math.hypot(...Wn) < 1e-3) Wn = Math.abs(U[2]) < 0.9 ? cruz(U, [0, 0, 1]) : cruz(U, [1, 0, 0]);
    return { S, E, W: Wr, U, Wn: norm3(Wn), tipo, apunta: b.apunta ?? null };
  });
  const piernas = [-1, 1].map((side, i) => {
    const p = spec.piernas?.[i] ?? piernaQuieta();
    const Hj = [side * C.ancCad * 0.27, -C.entY - 0.02, 0];
    const K = suma3(Hj, v3(p.a, p.f, side), C.muslo);
    const A = suma3(K, v3(p.a * 0.5, p.f - (p.k ?? 0), side), C.canilla);
    return { Hj, K, A, pieGiro: side * 0.3 };
  });
  return {
    brazos, piernas,
    cabeza: { giro: 0, cabeceo: 0, ladeo: 0, ...(spec.cabeza ?? {}) },
    mirada: spec.mirada ?? [0, 0],
  };
}

// cabeza: campo de distancias en el marco de la cabeza (unidades del adulto; origen en el centro del cráneo;
// x a la derecha, y hacia abajo, z hacia la cara). Cráneo y mandíbula unidos sin costura, nariz, orejas y pelo.
const CAB = {
  craneo: { c: [0, 0, 0], r: [0.0595, 0.074, 0.067] },
  mandibula: { c: [0, 0.042, 0.012], r: [0.044, 0.042, 0.05] },
  pivote: [0, 0.08, -0.01],
};
function sdElip(x, y, z, cx, cy, cz, rx, ry, rz) {
  const X = x - cx, Y = y - cy, Z = z - cz;
  const k0 = Math.sqrt((X / rx) ** 2 + (Y / ry) ** 2 + (Z / rz) ** 2), k1 = Math.sqrt((X / (rx * rx)) ** 2 + (Y / (ry * ry)) ** 2 + (Z / (rz * rz)) ** 2);
  return k1 > 1e-9 ? (k0 * (k0 - 1)) / k1 : -Math.min(rx, ry, rz);
}
function sdSeg(x, y, z, ax, ay, az, bx, by, bz, r) {
  const px = x - ax, py = y - ay, pz = z - az, vx = bx - ax, vy = by - ay, vz = bz - az;
  const t = clamp((px * vx + py * vy + pz * vz) / (vx * vx + vy * vy + vz * vz), 0, 1);
  return Math.hypot(px - vx * t, py - vy * t, pz - vz * t) - r;
}
function sdPiel(x, y, z) {
  let d = sdElip(x, y, z, 0, 0, 0, 0.0595, 0.074, 0.067);
  d = smin(d, sdElip(x, y, z, 0, 0.042, 0.012, 0.044, 0.042, 0.05), 0.022);
  d = smin(d, sdElip(x, y, z, 0, 0.074, 0.03, 0.021, 0.017, 0.024), 0.016);                      // barbilla
  d = smin(d, sdSeg(x, y, z, 0, 0.01, 0.058, 0, 0.03, 0.0675, 0.0056), 0.01);                 // nariz
  d = smin(d, sdElip(Math.abs(x), y, z, 0.058, 0.012, -0.004, 0.0105, 0.018, 0.011), 0.004);     // orejas
  return d;
}
// nacimiento del pelo: frente, sienes y nuca
function limitePelo(x, z) {
  const ax = Math.abs(x);
  let lim = -0.057 + 0.043 * suave(0.026, 0.056, ax) + 0.002 * Math.sin(x * 170);
  if (z < 0.03) lim = Math.max(lim, mezcla(lim, 0.036, suave(0.03, -0.035, z)));
  return lim;
}
function sdPelo(x, y, z, fino) {
  let d = sdElip(x, y, z, 0, -0.006, -0.005, 0.0655, 0.0798, 0.0738);
  d = smin(d, sdElip(x, y, z, 0.012, -0.067, 0.022, 0.045, 0.022, 0.04), 0.014);                 // tupé
  d = Math.max(d, (y - limitePelo(x, z)) * 0.7);
  if (fino) d += 0.0022 * (vnoise(x * 260 + z * 90, y * 260) - 0.5);                                // mechones en el contorno
  return d;
}
function matRot(giro, cabeceo, ladeo) {
  // R = Ry(giro) · Rx(cabeceo) · Rz(ladeo); cabeceo + = la cara sube
  const cy = Math.cos(giro), sy = Math.sin(giro), cx = Math.cos(cabeceo), sx = Math.sin(cabeceo), cz = Math.cos(ladeo), sz = Math.sin(ladeo);
  const Ry = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];
  const Rx = [1, 0, 0, 0, cx, -sx, 0, sx, cx];
  const Rz = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
  const mul = (A, B) => { const r = new Array(9); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) r[i * 3 + j] = A[i * 3] * B[j] + A[i * 3 + 1] * B[3 + j] + A[i * 3 + 2] * B[6 + j]; return r; };
  return mul(mul(Ry, Rx), Rz);
}
const aplicar = (M, v) => [M[0] * v[0] + M[1] * v[1] + M[2] * v[2], M[3] * v[0] + M[4] * v[1] + M[5] * v[2], M[6] * v[0] + M[7] * v[1] + M[8] * v[2]];
const aplicarT = (M, v) => [M[0] * v[0] + M[3] * v[1] + M[6] * v[2], M[1] * v[0] + M[4] * v[1] + M[7] * v[2], M[2] * v[0] + M[5] * v[1] + M[8] * v[2]];

const ASPECTOS = {
  adulto: { edad: 1 },
  nino: { edad: 0 },
};
function rampasDe(a) {
  return {
    [MAT.PIEL]: { r: a.piel ?? PAL.PIEL, lo: 2.0, hi: 5.55 },
    [MAT.CUELLO]: { r: a.piel ?? PAL.PIEL, lo: 1.7, hi: 4.5 },
    [MAT.OREJA]: { r: a.piel ?? PAL.PIEL, lo: 1.8, hi: 5.0 },
    [MAT.PELO]: { r: a.pelo ?? PAL.PELO, lo: 0.75, hi: 4.4 },
    [MAT.JERSEY]: { r: a.jersey ?? PAL.JERSEY, lo: 1.35, hi: 6.35 },
    [MAT.PANT]: { r: a.pantalon ?? PAL.CAQUI, lo: 1.0, hi: 5.4 },
    [MAT.ZAP]: { r: a.zapato ?? PAL.ZAPATO, lo: 0.6, hi: 3.9 },
  };
}

const CACHE_P = new Map();
export function persona(o = {}) {
  const asp0 = typeof o.aspecto === 'string' ? (ASPECTOS[o.aspecto] ?? ASPECTOS.adulto) : (o.aspecto ?? ASPECTOS.adulto);
  const edad = o.edad ?? asp0.edad ?? 1;
  const t = o.t ?? 0;
  const vida = o.vida ?? true;
  // vida: respira (los hombros y la cabeza suben un píxel) y parpadea
  const f12 = fot(t, 12);
  const resp = vida && (f12 % 40) >= 20 ? 1 : 0;
  const parp = o.parpadeo ?? (vida && ((f12 + 7) % 49 < 2) ? 1 : 0);
  const animada = /saludar|andar/.test(JSON.stringify(o.pose ?? ''));
  const clave = JSON.stringify([o.x, o.y, o.altura, o.pose, animada ? f12 : 0, o.giro, o.mira, o.cabeza, parp, resp, edad, o.apunta, o.lado, o.manos, o.fase,
    o.partes, typeof o.aspecto === 'object' ? 1 : o.aspecto]);
  let spr = CACHE_P.get(clave);
  if (!spr) {
    spr = rasterPersona({ ...o, edad, asp: asp0, resp, parp, t });
    if (CACHE_P.size > 48) CACHE_P.delete(CACHE_P.keys().next().value);
    CACHE_P.set(clave, spr);
  }
  const ks = o.sombra ?? 0.45;
  if (ks > 0 && (o.partes ?? 'todo') !== 'manos') {
    const Hp = o.altura ?? 110;
    sombra(Math.round(o.x ?? 0) + Hp * 0.02, Math.round(o.y ?? 0) + 1, Hp * 0.2, Math.max(2, Hp * 0.035), ks);
  }
  blitSprite(spr);
  return spr.anclas;
}

// ── núcleo de rasterizado compartido (persona, mano): piezas con z-búfer, luz del kit, limpieza y contorno interior
// pieza: { g (grupo), m (material), bb: [x0, y0, x1, y1], f(px, py) → null | { z, nx, ny, nz, u, m?, ex? } }
function piezaCapsula(a, b, Ra, Rb, m, g, zoffPx = 0, extra = null) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1e-6, Rm = Math.max(Ra, Rb);
  return {
    g, m, bb: [Math.min(a[0], b[0]) - Rm - 1, Math.min(a[1], b[1]) - Rm - 1, Math.max(a[0], b[0]) + Rm + 1, Math.max(a[1], b[1]) + Rm + 1],
    f: (px, py) => {
      const tt = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / L2, 0, 1);
      const cx = a[0] + dx * tt, cy = a[1] + dy * tt, r = Ra + (Rb - Ra) * tt, ox = px - cx, oy = py - cy, d2 = ox * ox + oy * oy;
      if (d2 > r * r) return null;
      const nz = Math.sqrt(Math.max(0, 1 - d2 / (r * r)));
      return { z: a[2] + (b[2] - a[2]) * tt + nz * r + zoffPx, nx: ox / r, ny: oy / r, nz, u: tt, ex: extra };
    },
  };
}
function rasterizarPiezas(usadas, rampas, Hp, { textura = null, soloGrupo = -1 } = {}) {
  let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
  for (const p of usadas) { bx0 = Math.min(bx0, p.bb[0]); by0 = Math.min(by0, p.bb[1]); bx1 = Math.max(bx1, p.bb[2]); by1 = Math.max(by1, p.bb[3]); }
  bx0 = Math.max(Math.floor(bx0) - 2, -2); by0 = Math.max(Math.floor(by0) - 2, -2);
  bx1 = Math.min(Math.ceil(bx1) + 2, T.w + 1); by1 = Math.min(Math.ceil(by1) + 2, T.h + 1);
  const w = Math.max(1, bx1 - bx0 + 1), h = Math.max(1, by1 - by0 + 1);
  const mat = new Uint8Array(w * h), grp = new Uint8Array(w * h), pid = new Int16Array(w * h).fill(-1);
  const lvl = new Float32Array(w * h), zb = new Float32Array(w * h).fill(-1e9);
  for (let k = 0; k < usadas.length; k++) {
    const p = usadas[k];
    const x0 = Math.max(bx0, Math.floor(p.bb[0])), x1 = Math.min(bx1, Math.ceil(p.bb[2])), y0 = Math.max(by0, Math.floor(p.bb[1])), y1 = Math.min(by1, Math.ceil(p.bb[3]));
    for (let py = y0; py <= y1; py++) for (let px = x0; px <= x1; px++) {
      const r = p.f(px + 0.5, py + 0.5);
      if (!r) continue;
      const i = (py - by0) * w + (px - bx0);
      if (r.z <= zb[i]) continue;
      zb[i] = r.z;
      const m = r.m ?? p.m;
      mat[i] = m; grp[i] = p.g; pid[i] = k;
      const ra = rampas[m];
      const n = norm3([r.nx, r.ny, Math.max(0, r.nz)]);
      const lam = Math.max(0, dot3(n, LK)), rim = Math.max(0, dot3(n, LR));
      let v = ra.lo + (ra.hi - ra.lo) * (0.08 + 0.92 * lam);
      if (rim > 0.4) v += Math.min(1.3, (rim - 0.4) * 2.4);
      lvl[i] = textura ? textura(m, r, px, py, v) : v;
    }
  }
  // limpieza: quita píxeles sueltos y rellena agujeros de uno
  const lleno = (i, j) => i >= 0 && j >= 0 && i < w && j < h && mat[j * w + i] > 0;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const k = j * w + i, n = (lleno(i - 1, j) ? 1 : 0) + (lleno(i + 1, j) ? 1 : 0) + (lleno(i, j - 1) ? 1 : 0) + (lleno(i, j + 1) ? 1 : 0);
    if (mat[k] && n <= 1) mat[k] = 0;
    else if (!mat[k] && n >= 3) {
      const src = lleno(i - 1, j) ? k - 1 : lleno(i + 1, j) ? k + 1 : k - w;
      mat[k] = mat[src]; grp[k] = grp[src]; lvl[k] = lvl[src]; zb[k] = zb[src]; pid[k] = pid[src];
    }
  }
  // contorno interior: lo que queda justo detrás de otra pieza se oscurece
  const tol = 0.028 * Hp;
  const lvl2 = new Float32Array(lvl);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const k = j * w + i; if (!mat[k]) continue;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ii = i + di, jj = j + dj; if (!lleno(ii, jj)) continue;
      const k2 = jj * w + ii;
      if (pid[k2] !== pid[k] && zb[k2] > zb[k] + tol && !(grp[k] === GR.CABEZA && grp[k2] === GR.CABEZA)) { lvl2[k] -= 1.3; break; }
      if (mat[k2] !== mat[k] && grp[k] === GR.CABEZA && grp[k2] === GR.CABEZA && mat[k] === MAT.PIEL && mat[k2] === MAT.PELO && dj === -1) { lvl2[k] -= 0.9; break; }   // sombra del pelo en la frente
    }
  }
  const px = new Uint32Array(w * h);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const k = j * w + i; if (!mat[k]) continue;
    if (soloGrupo >= 0 && grp[k] !== soloGrupo) continue;
    px[k] = tono(rampas[mat[k]].r, lvl2[k], bx0 + i, by0 + j, 0.12);
  }
  return { px, mat, grp, lvl2, w, h, bx0, by0 };
}
function contornoSelectivo({ px, mat, w, h }, rampas) {
  const out = new Uint32Array(px);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const k = j * w + i; if (px[k]) continue;
    let m = 0;
    if (i > 0 && px[k - 1]) m = mat[k - 1]; else if (i < w - 1 && px[k + 1]) m = mat[k + 1]; else if (j > 0 && px[k - w]) m = mat[k - w]; else if (j < h - 1 && px[k + w]) m = mat[k + w];
    if (m) out[k] = m === MAT.PIEL || m === MAT.CUELLO || m === MAT.OREJA ? (rampas[MAT.PIEL].r)[0] : rampas[m].r[0];
  }
  return out;
}

// LA MANO SUELTA (de cerca: la mano que se acerca a la silla). (x, y) es la muñeca.
export function mano(o = {}) {
  const { x = 240, y = 135, largo = 60, angulo = 0, tipo = 'abierta', palma = 'dorso', manga = 0.5, lado = 1, aspecto = {} } = o;
  const Hp = largo / 0.1;
  const U = [Math.cos(angulo), Math.sin(angulo), 0];
  let Wn = palma === 'camara' ? [0, 0, 1] : palma === 'dorso' ? [0, 0, -1] : palma === 'dentro' ? [Math.sin(angulo), -Math.cos(angulo), 0] : [-Math.sin(angulo), Math.cos(angulo), 0];
  Wn = norm3(suma3(Wn, U, -dot3(Wn, U)));
  const Sx = norm3(cruz(Wn, U)).map((v) => v * -lado);
  const P = (u, sv, w) => [x + (U[0] * u + Sx[0] * sv + Wn[0] * w) * Hp, y + (U[1] * u + Sx[1] * sv + Wn[1] * w) * Hp, (U[2] * u + Sx[2] * sv + Wn[2] * w) * Hp];
  const rampas = rampasDe(aspecto);
  const piezas = [];
  for (const c of MANOS[tipo] ?? MANOS.abierta) piezas.push(piezaCapsula(P(c[0], c[1], c[2]), P(c[3], c[4], c[5]), c[6] * Hp, c[7] * Hp, MAT.PIEL, GR.MANO, 0.004 * Hp));
  if (manga > 0) {
    piezas.push(piezaCapsula(P(-0.012, 0, 0), P(-0.012 - manga * 0.14, 0, 0), 0.022 * Hp, 0.026 * Hp, MAT.PIEL, GR.MANO, 0));
    piezas.push(piezaCapsula(P(-0.03, 0, 0), P(-0.03 - manga * 0.3, 0, 0), 0.03 * Hp, 0.034 * Hp, MAT.JERSEY, GR.CUERPO, 0.01 * Hp, { brazo: 2 }));
  }
  const textura = (m, r, px, py, v) => (m === MAT.JERSEY && r.u < 0.12 ? v + ((px & 1) ? 0.35 : -0.45) : m === MAT.PIEL && Hp >= 300 ? v + 0.25 * (vnoise(px * 0.3, py * 0.3) - 0.5) : v);
  const RZ = rasterizarPiezas(piezas, rampas, Hp, { textura });
  // uñas (de cerca)
  if (largo >= 40) {
    const forma = MANOS[tipo] ?? MANOS.abierta;
    for (const c of forma.slice(1)) {
      if (c[6] > 0.012) continue;
      const q = P(c[3] - c[7] * 0.9, c[4], c[5] + c[7] * 0.5), X = Math.round(q[0]) - RZ.bx0, Y = Math.round(q[1]) - RZ.by0;
      const k = Y * RZ.w + X;
      if (X >= 0 && Y >= 0 && X < RZ.w && Y < RZ.h && RZ.mat[k] === MAT.PIEL && palma !== 'camara') RZ.px[k] = PAL.PIEL[6];
    }
  }
  blitSprite({ px: contornoSelectivo(RZ, rampas), w: RZ.w, h: RZ.h, x0: RZ.bx0, y0: RZ.by0 });
  const pu = P(0.098, -0.008, 0), pa = P(0.045, 0, 0.01);
  return { punta: [pu[0], pu[1]], palma: [pa[0], pa[1]], muneca: [x, y] };
}

// FORMA: una figura 2D (función de distancia en píxeles, negativa dentro) sombreada como pieza de pixel art:
// relieve «de almohada» de grosor px, luz del kit, rampa con tramado, contorno selectivo. Para los objetos de
// cada escena (monedas, calendario, silla, telescopio…). textura(x, y, v, d) → v cambia el nivel por píxel.
export function forma({ x0, y0, x1, y1, sdf, rampa, lo = 1, hi = null, grosor = 6, contorno = undefined, k = 0.2, textura = null, plano = 0 }) {
  hi = hi ?? rampa.length - 1.2;
  const X0 = Math.max(0, Math.floor(x0) - 1), Y0 = Math.max(0, Math.floor(y0) - 1), X1 = Math.min(T.w - 1, Math.ceil(x1) + 1), Y1 = Math.min(T.h - 1, Math.ceil(y1) + 1);
  const w = X1 - X0 + 1, h = Y1 - Y0 + 1; if (w <= 0 || h <= 0) return;
  const dentro = new Uint8Array(w * h);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const d = sdf(x + 0.5, y + 0.5);
    if (d > 0) continue;
    dentro[(y - Y0) * w + (x - X0)] = 1;
    const gx = sdf(x + 1, y + 0.5) - sdf(x, y + 0.5), gy = sdf(x + 0.5, y + 1) - sdf(x + 0.5, y), gl = Math.hypot(gx, gy) || 1;
    const sp = clamp(-d / Math.max(0.5, grosor), 0, 1), nz = Math.sqrt(1 - (1 - sp) ** 2) * (1 - plano) + plano;
    const n = norm3([(gx / gl) * (1 - sp) * (1 - plano), (gy / gl) * (1 - sp) * (1 - plano), nz]);
    const lam = Math.max(0, dot3(n, LK)), rim = Math.max(0, dot3(n, LR));
    let v = lo + (hi - lo) * (0.1 + 0.9 * lam);
    if (rim > 0.4) v += Math.min(1, (rim - 0.4) * 2);
    if (textura) v = textura(x, y, v, d);
    T.buf[y * T.w + x] = tono(rampa, v, x, y, k);
  }
  const cc = contorno === undefined ? rampa[0] : contorno;
  if (cc) for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (dentro[j * w + i]) continue;
    if ((i > 0 && dentro[j * w + i - 1]) || (i < w - 1 && dentro[j * w + i + 1]) || (j > 0 && dentro[(j - 1) * w + i]) || (j < h - 1 && dentro[(j + 1) * w + i])) T.buf[(Y0 + j) * T.w + X0 + i] = cc;
  }
}

function rasterPersona(o) {
  const Hp = o.altura ?? 110, X0 = Math.round(o.x ?? 0), Y0 = Math.round(o.y ?? 0);
  const C = cuerpoDe(o.edad);
  C.muslo = C.entY + 0.02 - C.rodY;
  C.canilla = C.rodY - 0.045;
  const s = C.s, giro = o.giro ?? 0, partes = o.partes ?? 'todo';
  const dyR = -(o.resp ?? 0) / Hp;   // respiración (un píxel)
  const ctx = {
    hombro: (side) => [side * (C.ancHom / 2 - C.rB), -C.hombroY + 0.012 + dyR, 0],
    aModelo: (p) => { const g = rotY([(p[0] - X0) / Hp, 0, 0], -giro); return [g[0], (p[1] - Y0) / Hp, 0]; },
  };
  const R = resolverPose(o.pose ?? 'depie', C, o, ctx);
  // al andar, el pie que apoya toca el suelo
  let bajada = 0;
  const maxA = Math.max(R.piernas[0].A[1], R.piernas[1].A[1]);
  bajada = -0.045 - maxA;
  const B = (p) => [p[0], p[1] + bajada, p[2]];
  // proyección: marco del cuerpo → pantalla (px)
  const proy = (p) => { const q = rotY(B(p), giro); return [X0 + q[0] * Hp, Y0 + (q[1] + K_OBL * q[2]) * Hp, q[2] * Hp]; };
  const cab = { ...R.cabeza, ...(o.cabeza ?? {}) };
  const mirada = o.mira ?? R.mirada;
  const rampas = rampasDe(typeof o.aspecto === 'object' ? o.aspecto : {});

  // ── piezas ──
  const piezas = [];
  const capsula = (a3, b3, ra, rb, m, g, zoff = 0, extra = null) => piezas.push(piezaCapsula(proy(a3), proy(b3), ra * Hp, rb * Hp, m, g, zoff * Hp, extra));
  // torso (jersey): forma 2D con normal «de almohada»
  const kx = Math.sqrt(Math.cos(giro) ** 2 + 0.25 * Math.sin(giro) ** 2);
  const yT = -C.hombroY + dyR, yB = -C.entY - 0.022;
  const anchoT = (y) => {
    const a = yT, b = -C.cinY, c = yB, wTop = C.ancHom / 2 - 0.022, wPe = C.ancHom / 2 - 0.024, wCi = C.ancCin / 2, wBa = C.ancCad / 2 + 0.002;
    if (y < a + 0.09) return mezcla(wTop, wPe, suave(a, a + 0.09, y));
    if (y < b) return mezcla(wPe, wCi, suave(a + 0.09, b, y));
    return mezcla(wCi, wBa, suave(b, c, y));
  };
  // el trapecio baja del cuello al hombro; el deltoides redondea la esquina; escote redondo
  const yTop = (ax) => yT - 0.013 + 0.017 * suave(0.03, C.ancHom / 2 - 0.02, ax);
  const rD = 0.036;
  const escote = (x, y) => Math.hypot(x / 0.033, (y - (yT - 0.016)) / 0.017) - 1;
  const sdT = (x, y) => {
    const ax = Math.abs(x);
    const caja = Math.max(ax - anchoT(y), yTop(ax) - y, y - yB);
    const del = Math.hypot(ax - (C.ancHom / 2 - rD), y - (yT + rD)) - rD;
    const d = smin(caja, del, 0.018);
    return Math.max(d, -escote(x, y) * 0.018);
  };
  {
    const cxT = proy([0, 0, 0])[0];
    const bb = [cxT - (C.ancHom / 2 + 0.02) * kx * Hp, Y0 + (yT + bajada - 0.02) * Hp, cxT + (C.ancHom / 2 + 0.02) * kx * Hp, Y0 + (yB + bajada + 0.02) * Hp];
    piezas.push({
      g: GR.CUERPO, m: MAT.JERSEY, bb,
      f: (px, py) => {
        const x = (px - cxT) / Hp / kx, y = (py - Y0) / Hp - bajada;
        const d = sdT(x, y);
        if (d > 0) return null;
        const h = 0.003, gx = sdT(x + h, y) - sdT(x - h, y), gy = sdT(x, y + h) - sdT(x, y - h), gl = Math.hypot(gx, gy) || 1;
        const sp = clamp(-d / 0.05, 0, 1), nz = Math.sqrt(1 - (1 - sp) ** 2);
        const pliegue = 0.03 * Math.sin(y * 70 + x * 20);   // arrugas suaves del punto
        return { z: (nz * 0.055 + pliegue * 0.1) * Hp, nx: (gx / gl) * (1 - sp), ny: (gy / gl) * (1 - sp), nz, u: 0, ex: { torso: 1, x, y, d } };
      },
    });
  }
  // cuello
  capsula([0, -1 + C.cab - 0.03 + dyR, -0.01], [0, -C.hombroY + 0.006 + dyR, -0.012], C.rCu, C.rCu * 1.1, MAT.CUELLO, GR.CUERPO, -0.03);
  // cadera (pantalón)
  {
    const c = proy([0, -C.entY - 0.033, 0]), hw = (C.ancCad / 2) * kx * Hp, hh = 0.04 * Hp, rr = 0.022 * Hp;
    piezas.push({
      g: GR.CUERPO, m: MAT.PANT, bb: [c[0] - hw - 1, c[1] - hh - 1, c[0] + hw + 1, c[1] + hh + 1],
      f: (px, py) => {
        const qx = Math.abs(px - c[0]) - hw + rr, qy = Math.abs(py - c[1]) - hh + rr;
        const d = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;
        if (d > 0) return null;
        const sp = clamp(-d / (0.04 * Hp), 0, 1), nz = Math.sqrt(1 - (1 - sp) ** 2), nx = qx > qy ? Math.sign(px - c[0]) : 0, ny = qx > qy ? 0 : Math.sign(py - c[1]);
        return { z: -0.02 * Hp + nz * 0.04 * Hp, nx: nx * (1 - sp), ny: ny * (1 - sp), nz, u: 0 };
      },
    });
  }
  // piernas y zapatos
  R.piernas.forEach((pg, i) => {
    const side = i ? 1 : -1;
    capsula(pg.Hj, pg.K, C.rM, C.rM * 0.82, MAT.PANT, GR.CUERPO, 0, { pierna: 1 });
    capsula(pg.K, pg.A, C.rP, C.rP * 0.8, MAT.PANT, GR.CUERPO, 0, { pierna: 2 });
    const kp = C.pie / 0.15;
    const talon = suma3(pg.A, [0, 0.022, -0.022]);
    const dirPie = rotY([0, 0, 1], pg.pieGiro);
    const punta = [pg.A[0] + dirPie[0] * 0.11 * kp, pg.A[1] + 0.025, pg.A[2] + dirPie[2] * 0.11 * kp];
    const a = proy(talon), b = proy(punta);
    const alza = (pg.A[1] + 0.045 + bajada) * Hp;   // < 0 si el pie está en el aire
    const Ra = 0.027 * Hp * kp, Rb = 0.023 * Hp * kp;
    const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1e-6;
    piezas.push({
      g: GR.CUERPO, m: MAT.ZAP, bb: [Math.min(a[0], b[0]) - Ra - 1, Math.min(a[1], b[1]) - Ra - 1, Math.max(a[0], b[0]) + Ra + 1, Math.max(a[1], b[1]) + Ra + 1],
      f: (px, py) => {
        const tt = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / L2, 0, 1);
        const cx = a[0] + dx * tt, cy = a[1] + dy * tt, r = Ra + (Rb - Ra) * tt, ox = px - cx, oy = py - cy, d2 = ox * ox + oy * oy;
        if (d2 > r * r) return null;
        const nz = Math.sqrt(Math.max(0, 1 - d2 / (r * r)));
        const zc = a[2] + (b[2] - a[2]) * tt;
        // suela plana: nada por debajo del suelo (que, visto un poco desde arriba, baja con z)
        const ys = Y0 + K_OBL * zc + alza;
        if (py > ys + 0.5) return null;
        return { z: zc + nz * r, nx: ox / r, ny: oy / r, nz, u: tt, ex: { suela: py > ys - Math.max(1, 0.012 * Hp) ? 1 : 0 } };
      },
    });
  });
  // brazos y manos
  const anclasManos = [], puntas = [];
  R.brazos.forEach((br, i) => {
    const side = i ? 1 : -1;
    capsula(suma3(br.S, norm3(suma3(br.E, br.S, -1)), 0.026), br.E, C.rB * 0.95, C.rB * 0.86, MAT.JERSEY, GR.CUERPO, 0.035, { brazo: 1 });
    capsula(br.E, br.W, C.rA, C.rA * 0.8, MAT.JERSEY, GR.CUERPO, 0.035, { brazo: 2 });
    const Sx = norm3(cruz(br.Wn, br.U)).map((v) => v * -side);
    const forma = MANOS[br.tipo] ?? MANOS.relajada;
    const k = C.mano / 0.1;
    const enMano = (u, sv, w) => [br.W[0] + (br.U[0] * u + Sx[0] * sv + br.Wn[0] * w) * k, br.W[1] + (br.U[1] * u + Sx[1] * sv + br.Wn[1] * w) * k, br.W[2] + (br.U[2] * u + Sx[2] * sv + br.Wn[2] * w) * k];
    for (const c of forma) capsula(enMano(c[0], c[1], c[2]), enMano(c[3], c[4], c[5]), c[6] * k, c[7] * k, MAT.PIEL, GR.MANO, 0.038);
    anclasManos[i] = proy(enMano(0.045, 0, 0.01));
    if (br.tipo === 'señala') puntas[i] = proy(enMano(0.1, -0.012, 0));
  });
  // cabeza (trazado de esferas contra su campo de distancias)
  const Rh = matRot(giro + (cab.giro ?? 0), cab.cabeceo ?? 0, cab.ladeo ?? 0);
  const C0 = [0, -1 + 0.079 * s + dyR, 0];
  const Pv = suma3(C0, CAB.pivote, s);
  const PvW = rotY(B(Pv), giro);
  const C0W = suma3(PvW, aplicar(Rh, [(C0[0] - Pv[0]), (C0[1] - Pv[1]), (C0[2] - Pv[2])]));
  const cabezaA = (q) => { const w = suma3(C0W, aplicar(Rh, q)); return [X0 + w[0] * Hp, Y0 + (w[1] + K_OBL * w[2]) * Hp, w[2] * Hp]; };
  {
    const cc = cabezaA([0, 0, 0]), R0 = 0.11 * s * Hp;
    const dl = norm3(aplicarT(Rh, [0, K_OBL, -1]));
    const fino = C.cab * Hp >= 40;
    const eps = 0.25 / (Hp * s), hN = Math.max(0.0005, 0.6 / (Hp * s));
    const sdC = (x, y, z) => Math.min(sdPiel(x, y, z), sdPelo(x, y, z, fino));
    piezas.push({
      g: GR.CABEZA, m: MAT.PIEL, bb: [cc[0] - R0, cc[1] - R0 - 0.01 * Hp, cc[0] + R0, cc[1] + R0 + 0.035 * Hp],
      f: (px, py) => {
        const xm = (px - X0) / Hp, ysm = (py - Y0) / Hp;
        const Z0 = C0W[2] + 0.3 * s;
        const ol = aplicarT(Rh, [xm - C0W[0], ysm - K_OBL * Z0 - C0W[1], Z0 - C0W[2]]).map((v) => v / s);
        const b = dot3(ol, dl), c = dot3(ol, ol) - 0.118 * 0.118, disc = b * b - c;
        if (disc < 0) return null;
        let tt = Math.max(0, -b - Math.sqrt(disc));
        const t1 = -b + Math.sqrt(disc);
        let p = null;
        for (let k = 0; k < 72 && tt < t1; k++) {
          const x = ol[0] + dl[0] * tt, y = ol[1] + dl[1] * tt, z = ol[2] + dl[2] * tt;
          const d = sdC(x, y, z);
          if (d < eps) { p = [x, y, z]; break; }
          tt += Math.max(d * 0.85, eps * 0.5);
        }
        if (!p) return null;
        const dp = sdPiel(p[0], p[1], p[2]), dh = sdPelo(p[0], p[1], p[2], fino);
        const pelo = dh < dp;
        const F = pelo ? (x, y, z) => sdPelo(x, y, z, false) : sdPiel;
        const n = norm3([F(p[0] + hN, p[1], p[2]) - F(p[0] - hN, p[1], p[2]), F(p[0], p[1] + hN, p[2]) - F(p[0], p[1] - hN, p[2]), F(p[0], p[1], p[2] + hN) - F(p[0], p[1], p[2] - hN)]);
        const nw = aplicar(Rh, n);
        const pw = suma3(C0W, aplicar(Rh, p), s);
        const oreja = !pelo && Math.abs(p[0]) > 0.052 && p[2] < 0.01 && p[1] > -0.01;
        return { z: pw[2] * Hp + 0.01 * Hp, nx: nw[0], ny: nw[1], nz: nw[2], m: pelo ? MAT.PELO : oreja ? MAT.OREJA : MAT.PIEL, ex: { q: p } };
      },
    });
  }

  // ── rasterizado con z-búfer ──
  const usadas = piezas.filter(partes === 'sinManos' ? (p) => p.g !== GR.MANO : () => true);
  const hh = C.cab * Hp;   // alto de la cabeza en píxeles
  const textura = (m, r, px, py, v) => {
    const ex = r.ex;
    if (m === MAT.JERSEY) {
      if (Hp >= 150) v += (px % 3 === 0 ? -0.22 : 0.06) + ((py & 1) ? 0.05 : -0.05);
      if (ex?.torso) {
        if (ex.y > yB - 0.022) v += (px & 1) ? 0.35 : -0.45;      // elástico del bajo
        const ce = escote(ex.x, ex.y);
        if (ce > 0 && ce < 0.42) v += 0.5 + ((px & 1) ? 0.3 : -0.3);   // cuello del jersey
      }
      if (ex?.brazo === 2 && r.u > 0.84) v += (px & 1) ? 0.35 : -0.45;   // puño
    } else if (m === MAT.PANT) {
      if (ex?.pierna && Math.abs(r.nx) < 0.14 && Hp >= 70) v += 0.45;    // raya del pantalón
      if (ex?.pierna === 2 && r.u < 0.12 && Hp >= 90) v -= 0.5;          // pliegue de la rodilla
    } else if (m === MAT.PELO && ex?.q) {
      const q = ex.q;
      if (hh >= 26) v += 0.42 * Math.sin(Math.atan2(q[2] + 0.03, q[0] + 0.022) * clamp(Math.round(hh / 5), 8, 48) + 4 * vnoise(q[0] * 90, q[1] * 90));
      else v += 0.3 * Math.sin((q[0] + q[1] * 0.5) * 140);
      if (q[1] < -0.045 && q[0] < 0.005 && q[0] > -0.04 && q[2] > 0.0) v += 0.7;   // brillo del pelo
      if (hh >= 22 && Math.abs(q[0] + 0.022) < 0.0035 && q[1] < -0.04 && q[2] > 0) v -= 1.2;   // raya
    } else if (m === MAT.ZAP && ex?.suela) v = 0.4;
    return v;
  };
  const RZ = rasterizarPiezas(usadas, rampas, Hp, { textura, soloGrupo: partes === 'manos' ? GR.MANO : -1 });
  const { px, mat, grp, lvl2, w, h, bx0, by0 } = RZ;

  // ── rasgos de la cara ──
  const enCara = (X, Y) => { const i = X - bx0, j = Y - by0; return i >= 0 && j >= 0 && i < w && j < h && grp[j * w + i] === GR.CABEZA && (mat[j * w + i] === MAT.PIEL); };
  const ponCara = (X, Y, c) => { X = Math.round(X); Y = Math.round(Y); if (partes !== 'manos' && enCara(X, Y)) px[(Y - by0) * w + (X - bx0)] = c; };
  const pielEn = (X, Y, dv) => { const i = Math.round(X) - bx0, j = Math.round(Y) - by0; if (i < 0 || j < 0 || i >= w || j >= h) return PAL.PIEL[2]; return tono(rampas[MAT.PIEL].r, lvl2[j * w + i] + dv, Math.round(X), Math.round(Y), 0); };
  const sup = (qx, qy, e = 'craneo') => {   // punto de la superficie de la cara (marco de la cabeza, × s)
    const E2 = CAB[e], cx = E2.c[0], cy = E2.c[1], rx = E2.r[0], ry = E2.r[1], rz = E2.r[2];
    const u = (qx - cx) / rx, v = (qy - cy) / ry, zz = E2.c[2] + rz * Math.sqrt(Math.max(0, 1 - u * u - v * v));
    const q = [qx * s, qy * s, zz * s];
    const nW = aplicar(Rh, norm3([u / rx, v / ry, (zz - E2.c[2]) / (rz * rz)]));
    const p = cabezaA(q);
    return { x: p[0], y: p[1], vis: nW[2] > 0.12 };
  };
  const OJOC = PAL.OJO;
  const gx = clamp(mirada[0], -1, 1), gy = clamp(mirada[1], -1, 1);
  const ojos = [];
  if (partes !== 'manos') {
    for (const sd of [-1, 1]) {
      const P = sup(sd * 0.025, C.ojoY);
      ojos.push([P.x, P.y]);
      if (!P.vis) continue;
      if (hh < 12) { ponCara(Math.floor(P.x), Math.floor(P.y), o.parp ? pielEn(P.x, P.y, -1.5) : OJOC[0]); continue; }
      if (hh < 26) {
        const X = Math.floor(P.x + gx * 0.35), Y = Math.floor(P.y - 0.5);
        if (o.parp) { ponCara(X, Y + 1, pielEn(X, Y + 1, -2)); ponCara(X + sd, Y + 1, pielEn(X, Y + 1, -1.5)); }
        else { ponCara(X, Y, OJOC[0]); ponCara(X, Y + 1, OJOC[0]); }
        continue;
      }
      if (hh < 50) {
        const X = Math.floor(P.x - 0.5 + gx * 0.5), Y = Math.floor(P.y - 0.5 + gy * 0.4);
        if (o.parp) { for (let k = -1; k <= 2; k++) ponCara(X + k, Y + 1, pielEn(X, Y + 1, -2.2)); continue; }
        ponCara(X, Y, OJOC[0]); ponCara(X + 1, Y, OJOC[0]); ponCara(X, Y + 1, OJOC[1]); ponCara(X + 1, Y + 1, OJOC[0]);
        ponCara(X + (sd < 0 ? -1 : 2), Y + 1, OJOC[4]);       // blanco del ojo, hacia fuera
        ponCara(X, Y, OJOC[0]);
        ponCara(X + (gx > 0.3 ? 1 : 0), Y, OJOC[4]);           // brillo
        if (hh >= 40) { ponCara(X - 1, Y - 1, OJOC[0]); ponCara(X + 2, Y - 1, OJOC[0]); ponCara(X, Y - 1, OJOC[0]); ponCara(X + 1, Y - 1, OJOC[0]); }   // párpado
        continue;
      }
      // ojo grande: almendra, iris, pupila, brillo y párpado
      const ew = 0.0095 * s * Hp, eh = 0.0058 * s * Hp, ir = 0.0052 * s * Hp;
      const icx = P.x + gx * ew * 0.38, icy = P.y + gy * eh * 0.35;
      const grosor = Math.max(1, Math.round(hh / 46));
      for (let Y = Math.floor(P.y - eh - grosor - 1); Y <= Math.ceil(P.y + eh + 1); Y++) for (let X = Math.floor(P.x - ew - 2); X <= Math.ceil(P.x + ew + 2); X++) {
        const u = (X + 0.5 - P.x) / ew, v = (Y + 0.5 - P.y) / eh;
        const arriba = -(1 - u * u) * (1 + 0.15 * u * sd) * (o.parp ? 0.08 : 1), abajo = (1 - u * u) * 0.8 * (o.parp ? 0.08 : 1);
        if (Math.abs(u) > 1.08) continue;
        if (v >= arriba && v <= abajo) {
          if (o.parp) { ponCara(X, Y, OJOC[0]); continue; }
          let c = OJOC[4];
          if (v < arriba + 0.55) c = mezclaColor(OJOC[4], PAL.PIEL[3], 0.5);   // sombra del párpado sobre el blanco
          const di = Math.hypot(X + 0.5 - icx, Y + 0.5 - icy);
          if (di < ir) c = di < ir * 0.45 ? OJOC[0] : di > ir * 0.82 ? OJOC[1] : (Y + 0.5 < icy ? OJOC[2] : OJOC[3]);
          if (Math.hypot(X + 0.5 - (icx - ir * 0.4), Y + 0.5 - (icy - ir * 0.45)) < Math.max(0.8, ir * 0.24)) c = PAL.BLANCO;
          ponCara(X, Y, c);
        } else if (v < arriba && v > arriba - (grosor + 0.6) / eh && Math.abs(u) < 1.06) ponCara(X, Y, OJOC[0]);   // párpado de arriba
        else if (v > abajo && v < abajo + 1.1 / eh && Math.abs(u) < 0.8 && !o.parp) ponCara(X, Y, pielEn(X, Y, -1));
      }
      if (hh >= 80) for (let k = 0; k < 4; k++) {     // pestañas en el rabillo
        const u = sd * (0.55 + k * 0.14), X = P.x + u * ew, Y = P.y - eh * (1 - u * u) - grosor - 0.4;
        ponCara(X + sd * 1, Y - 1, OJOC[0]);
      }
    }
    // cejas (rectas y serenas; con el arco suave de cerca)
    for (const sd of [-1, 1]) {
      if (hh < 14) continue;
      const cc = (rampas[MAT.PELO].r)[hh >= 50 ? 2 : 1];
      const sube = gy < -0.5 ? 1 : 0;
      if (hh < 26) {
        const m = sup(sd * 0.027, -0.02);
        if (!m.vis) continue;
        const L = hh < 20 ? 2 : 3, X = Math.round(m.x - (L - 1) / 2 + (sd > 0 ? 0.3 : -0.3)), Y = Math.round(m.y) - 1 - sube;
        for (let k = 0; k < L; k++) ponCara(X + k, Y, cc);
        continue;
      }
      const a = sup(sd * 0.011, -0.021), b = sup(sd * 0.041, -0.019);
      if (!a.vis && !b.vis) continue;
      const grosor = hh < 50 ? 1 : Math.round(hh / 36);
      const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y)) + 1;
      for (let k = 0; k <= n; k++) {
        const u = k / n, X = mezcla(a.x, b.x, u), Y = mezcla(a.y, b.y, u) - Math.sin(Math.min(1, u * 1.3) * Math.PI * 0.85) * hh * 0.011 - sube;
        const gk = Math.max(1, Math.round(grosor * (1 - 0.45 * u)));
        for (let g = 0; g < gk; g++) ponCara(X, Y - g, cc);
      }
    }
    // nariz
    {
      const P = sup(0.0, 0.034);
      if (P.vis && hh >= 12) {
        if (hh < 26) ponCara(P.x + 1, P.y, pielEn(P.x + 1, P.y, -1.2));
        else if (hh < 50) { ponCara(P.x + 1, P.y - 1, pielEn(P.x + 1, P.y - 1, -1)); ponCara(P.x + 1, P.y, pielEn(P.x, P.y, -1.4)); ponCara(P.x, P.y, pielEn(P.x, P.y, -1.4)); ponCara(P.x - 1, P.y - 2, pielEn(P.x, P.y - 2, 0.8)); }
        else {
          const k = Math.max(1, Math.round(hh / 70));
          for (const sd of [-1, 1]) for (let g = 0; g < k; g++) ponCara(P.x + sd * Math.round(0.0075 * s * Hp) + g, P.y + 1, OJOC[1]);
        }
      }
    }
    // boca
    {
      const P = sup(0.0, 0.056, 'craneo');
      const Q = sup(0.0, 0.057, 'mandibula');
      const M = Q.vis ? Q : P;
      if (M.vis && hh >= 13) {
        const mw = Math.max(1, Math.round(0.011 * s * Hp));
        const cBoca = pielEn(M.x, M.y, -2.1);
        for (let k = -mw; k <= mw; k++) ponCara(M.x + k, M.y, cBoca);
        if (hh >= 26) {
          const g = Math.max(1, Math.round(hh / 90));
          for (let k = 0; k < g; k++) { ponCara(M.x - mw - 1 - k, M.y - 1 - k, pielEn(M.x, M.y, -1.3)); ponCara(M.x + mw + 1 + k, M.y - 1 - k, pielEn(M.x, M.y, -1.3)); }
          for (let k = -mw + 1; k <= mw - 1; k++) for (let j = 1; j <= g; j++) ponCara(M.x + k, M.y + j, pielEn(M.x + k, M.y + j, 0.5));
        }
      }
    }
  }

  // ── contorno selectivo (el tono más oscuro de cada material) ──
  const out = contornoSelectivo(RZ, rampas);
  const ojoD = ojos[1] ?? [0, 0], cc = cabezaA([0, 0, 0]);
  return {
    px: out, w, h, x0: bx0, y0: by0,
    anclas: {
      cabeza: [cc[0], cc[1]], radioCabeza: 0.07 * s * Hp, ojos, ojo: ojoD,
      manos: anclasManos.map((p) => [p[0], p[1]]), indice: (puntas[1] ?? puntas[0]) ? [(puntas[1] ?? puntas[0])[0], (puntas[1] ?? puntas[0])[1]] : null,
      hombros: R.brazos.map((b) => { const p = proy(b.S); return [p[0], p[1]]; }),
      pies: R.piernas.map((p) => { const q = proy(p.A); return [q[0], Y0]; }),
      coronilla: Y0 - Hp, suela: Y0,
    },
  };
}

// ════════════════════════════════════════════════════════════════════════════
//  LA REGLA DE POTENCIAS DE DIEZ
// ════════════════════════════════════════════════════════════════════════════
export const REGLA = { x: 420, ancho: 11, y0: 14, y1: 222, S: 42, EMIN: -35, EMAX: 27 };
const etiqueta = (e) => `10^${e < 0 ? '−' + -e : e} m`;
export function niebla(x0, y0, x1, y1, t = 0) {
  const tq = paso(t, 8);
  const rnd = mulberry32(77);
  const cx = (x0 + x1) / 2, ancho = x1 - x0;
  for (let k = 0; k < 14; k++) {
    const px = cx + (rnd() - 0.5) * ancho * 0.9 + Math.sin(tq * 0.5 + k) * 1.2, py = mezcla(y0 + 4, y1 - 2, rnd()), r = 3 + rnd() * Math.min(9, ancho * 0.22);
    disco(px, py, r, (x, y) => {
      if (y < y0 || y > y1) return 0;
      const nx = (x + 0.5 - px) / r, ny = (y + 0.5 - py) / r, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lam = Math.max(0, -0.55 * nx - 0.6 * ny + 0.58 * nz);
      const d = Math.hypot(nx, ny);
      if (d > 0.82 && b4(x, y) > (1 - d) * 4) return 0;
      return tono(PAL.NIEBLA, 1.2 + 3.2 * lam, x, y, 0.6);
    });
  }
}
const RED = (() => {
  const rnd = mulberry32(2718), nodos = [];
  for (let i = 0; i < 26; i++) nodos.push([rnd(), rnd(), 0.4 + rnd() * 0.6]);
  const lados = [];
  for (let i = 0; i < nodos.length; i++) for (let j = i + 1; j < nodos.length; j++) {
    const d = Math.hypot(nodos[i][0] - nodos[j][0], (nodos[i][1] - nodos[j][1]) * 1.6);
    if (d < 0.3) lados.push([i, j, d]);
  }
  return { nodos, lados };
})();
export function redGalaxias(x0, y0, x1, y1, t = 0) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  degradado(x0, y0, x1, y1, PAL.NOCHE, (x, y) => 1.0 + 0.8 * vnoise(x * 0.2, y * 0.2), 1);
  const P = (n) => [x0 + n[0] * (x1 - x0), y0 + n[1] * (y1 - y0)];
  for (const [i, j, d] of RED.lados) {
    const a = P(RED.nodos[i]), b = P(RED.nodos[j]);
    linea(a[0], a[1], b[0], b[1], (x, y) => (y < y0 || y > y1 || x < x0 || x > x1 ? 0 : d < 0.18 ? PAL.AMBAR[1] : (x + y) & 1 ? PAL.AMBAR[0] : 0));
  }
  const tw = fot(t, 6);
  RED.nodos.forEach((n, k) => {
    const [x, y] = P(n);
    if (x < x0 || x > x1 || y < y0 || y > y1) return;
    pset(x, y, (tw + k) % 7 === 0 ? PAL.AMBAR[5] : PAL.AMBAR[4]);
    if (n[2] > 0.75) { pset(x - 1, y, PAL.AMBAR[2]); pset(x + 1, y, PAL.AMBAR[2]); pset(x, y - 1, PAL.AMBAR[2]); pset(x, y + 1, PAL.AMBAR[2]); }
  });
}
function marcoLaton(x0, y0, x1, y1) {
  rect(x0, y0, x1, y1, PAL.NOGAL[0]);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, PAL.LATON[5]); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, PAL.LATON[4]);
  rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, PAL.LATON[2]); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, PAL.LATON[2]);
}
export function regla(o = {}) {
  const { e = 0, entera = 0, y0 = REGLA.y0, y1 = REGLA.y1, aparece = 1, t = 0, resalta = null } = o;
  const actual = o.actual ?? Math.round(e);
  const marca = o.marca ?? actual;
  const xs = Math.round((o.x ?? REGLA.x) + (1 - sale(clamp(aparece, 0, 1))) * 200);
  const an = REGLA.ancho;
  const u = suave(0, 1, clamp(entera, 0, 1));
  const tapa = 16;
  const Sf = (y1 - y0 - 2 * tapa) / (REGLA.EMAX - REGLA.EMIN);
  const S = 1 / mezcla(1 / REGLA.S, 1 / Sf, u);
  const ec = mezcla(e, (REGLA.EMAX + REGLA.EMIN) / 2, u);
  const yc = (y0 + y1) / 2;
  const Y = (ee) => yc - (ee - ec) * S;
  const yMin = Y(REGLA.EMAX + 0.5), yMax = Y(REGLA.EMIN - 0.5);
  // listón de nogal con canto de latón
  sombraRect(xs + 2, y0 + 3, xs + an + 2, y1 + 3, 0.45, 3);
  for (let y = y0; y <= y1; y++) for (let x = xs; x < xs + an; x++) {
    const i = x - xs;
    let c;
    if (i <= 1) c = i === 0 ? PAL.LATON[2] : ((y >> 1) & 1 ? PAL.LATON[4] : PAL.LATON[5]);
    else {
      const v = 3.1 + 0.9 * (vnoise(x * 0.9, y * 0.05) - 0.5) + 0.5 * Math.sin(y * 0.11 + x * 0.6) * 0.5 - (i >= an - 2 ? 1.3 : 0) + (i === 2 ? 0.8 : 0);
      c = tono(PAL.NOGAL, v, x, y, 0.5);
    }
    pset(x, y, c);
  }
  // remates: la niebla de Planck debajo de 10⁻³⁵ y la red de galaxias encima de 10²⁷
  if (yMax < y1) niebla(xs - 9, Math.max(y0, Math.round(yMax)), xs + an + 8, y1 + 2, t);
  if (yMin > y0) redGalaxias(xs + 2, y0, xs + an - 3, Math.min(y1, Math.round(yMin)), t);
  // conteras de latón
  for (const yy of [y0, y1 - 2]) { rect(xs - 1, yy, xs + an, yy + 2, PAL.LATON[3]); rect(xs - 1, yy, xs + an, yy, PAL.LATON[5]); }
  // marcas
  const eLo = Math.max(REGLA.EMIN, Math.ceil(ec - (y1 - yc) / S)), eHi = Math.min(REGLA.EMAX, Math.floor(ec + (yc - y0) / S));
  const enRango = (ee) => resalta && ee >= Math.min(resalta.de, resalta.a) && ee <= Math.max(resalta.de, resalta.a);
  for (let ee = eLo; ee <= eHi; ee++) {
    const ty = Math.round(Y(ee));
    if (ty < y0 + 3 || ty > y1 - 3) continue;
    const largo = u > 0.5 ? (ee % 5 === 0 ? 7 : 4) : 8;
    const c = enRango(ee) ? PAL.AMBAR[4] : PAL.CREMA[4];
    rect(xs, ty, xs + largo - 1, ty, c);
    if (u <= 0.5) pset(xs + largo, ty, PAL.CREMA[2]);
    if (S >= 16 && ee < REGLA.EMAX) for (let n = 2; n <= 9; n++) {
      const sy = Math.round(Y(ee + Math.log10(n)));
      if (sy > y0 + 3 && sy < y1 - 3) rect(xs, sy, xs + (n === 5 ? 4 : 2), sy, PAL.CREMA[2]);
    }
  }
  // rótulos
  const yAct = clamp(Math.round(Y(actual)), y0 + 13, y1 - 13);
  const txtAct = etiqueta(actual);
  const wAct = anchoTexto(txtAct, 2);
  const ponPequeno = (ee) => {
    const ty = Math.round(Y(ee));
    if (ty < y0 + 5 || ty > y1 - 5 || Math.abs(ty - yAct) < 17) return;
    texto(etiqueta(ee), xs - 5, ty - 3, { color: PAL.CREMA[3], alinear: 'der' });
  };
  if (u < 0.5) { for (let ee = eLo; ee <= eHi; ee++) if (ee !== actual) ponPequeno(ee); }
  else for (const ee of [REGLA.EMIN, 0, REGLA.EMAX]) if (ee !== actual) ponPequeno(ee);
  // el marcador: flecha de ámbar a la marca
  const ym = Math.round(Y(marca));
  if (ym >= y0 && ym <= y1) {
    rect(xs, ym, xs + an - 1, ym, PAL.AMBAR[4]);
    for (let k = 0; k < 4; k++) rect(xs - 2 - k, ym - k, xs - 2 - k, ym + k, k === 0 ? PAL.AMBAR[5] : PAL.AMBAR[3]);
    luz(xs + 2, ym, 9, PAL.AMBAR[3], 0.35, 3);
  }
  // el actual: grande, en ámbar, en su placa
  const px1 = xs - 8, px0 = px1 - wAct - 9;
  sombraRect(px0 + 2, yAct - 11, px1 + 2, yAct + 13, 0.5, 3);
  marcoLaton(px0, yAct - 12, px1, yAct + 11);
  degradado(px0 + 2, yAct - 10, px1 - 2, yAct + 9, PAL.NOGAL, (x, y) => 2.2 + 0.6 * (vnoise(x * 0.3, y * 0.9) - 0.5) - (y - yAct) * 0.04, 0.6);
  texto(txtAct, px0 + 5, yAct - 6, { esc: 2, rampa: PAL.AMBAR, sombra: PAL.NOGAL[0], suave: true, bisel: true });
  if (Math.abs(ym - yAct) > 2 && ym >= y0 && ym <= y1) linea(px1 + 1, yAct, xs - 6, ym, PAL.AMBAR[2]);
  else linea(px1 + 1, yAct, xs - 6, yAct, PAL.AMBAR[3]);
  return { y: Y, x: xs, ancho: an, S };
}

// ════════════════════════════════════════════════════════════════════════════
//  CARTELA DE CAPÍTULO
// ════════════════════════════════════════════════════════════════════════════
export const CARTELA = { x: 240, y: 117, w: 190, h: 110, sale: 0.75, fin: 1.2 };
export function cartela(t, txt, o = {}) {
  if (txt == null || txt === '') return 0;
  const { x = CARTELA.x, y = CARTELA.y, sale: ts = CARTELA.sale, fin = CARTELA.fin } = o;
  if (t >= fin) return 0;
  const u = t < ts ? 0 : (t - ts) / (fin - ts);
  const tq = paso(t, 30);
  let dy = 0;
  if (tq > ts) {
    const uu = clamp((tq - ts) / (fin - ts), 0, 1);
    dy = uu < 0.12 ? Math.round(3 * Math.sin((uu / 0.12) * Math.PI)) : -Math.round((y + CARTELA.h / 2 + 20) * Math.pow((uu - 0.12) / 0.88, 2.1));
  }
  const w = CARTELA.w, h = CARTELA.h;
  const X0 = Math.round(x - w / 2), Y0 = Math.round(y - h / 2) + dy, X1 = X0 + w - 1, Y1 = Y0 + h - 1;
  sombraRect(X0 + 5, Y0 + 7, X1 + 5, Y1 + 7, 0.6, 7);
  // placa de nogal: vetas horizontales
  degradado(X0, Y0, X1, Y1, PAL.NOGAL, (px, py) => {
    const yy = (py - Y0) / h;
    let v = 2.7 + 1.1 * (fbm(px * 0.012 + 3, py * 0.16, 3) - 0.5) + 0.55 * Math.sin(py * 0.9 + 4 * fbm(px * 0.02, py * 0.05)) * 0.5;
    v += 0.7 * (1 - yy) - 0.4;
    return v;
  }, 0.7);
  // marco de latón (bisel de 4 px) y ranura
  for (let k = 0; k < 4; k++) {
    const c1 = [PAL.LATON[2], PAL.LATON[5], PAL.LATON[4], PAL.LATON[3]][k], c2 = [PAL.LATON[1], PAL.LATON[3], PAL.LATON[2], PAL.LATON[2]][k];
    rect(X0 + k, Y0 + k, X1 - k, Y0 + k, c1); rect(X0 + k, Y0 + k, X0 + k, Y1 - k, c1);
    rect(X0 + k, Y1 - k, X1 - k, Y1 - k, c2); rect(X1 - k, Y0 + k, X1 - k, Y1 - k, c2);
  }
  rect(X0 - 1, Y0 - 1, X1 + 1, Y0 - 1, PAL.NOGAL[0]); rect(X0 - 1, Y1 + 1, X1 + 1, Y1 + 1, PAL.NOGAL[0]);
  rect(X0 - 1, Y0, X0 - 1, Y1, PAL.NOGAL[0]); rect(X1 + 1, Y0, X1 + 1, Y1, PAL.NOGAL[0]);
  rect(X0 + 4, Y0 + 4, X1 - 4, Y0 + 4, PAL.NOGAL[0]); rect(X0 + 4, Y0 + 4, X0 + 4, Y1 - 4, PAL.NOGAL[0]);
  rect(X0 + 5, Y1 - 4, X1 - 4, Y1 - 4, PAL.NOGAL[5]); rect(X1 - 4, Y0 + 5, X1 - 4, Y1 - 4, PAL.NOGAL[5]);
  for (const [cx, cy] of [[X0 + 9, Y0 + 9], [X1 - 9, Y0 + 9], [X0 + 9, Y1 - 9], [X1 - 9, Y1 - 9]]) {
    disco(cx, cy, 2.2, (px, py) => (px + py < cx + cy - 1 ? PAL.LATON[6] : px + py > cx + cy ? PAL.LATON[2] : PAL.LATON[4]));
    pset(cx + 1, cy + 2, PAL.NOGAL[1]);
  }
  // el número
  const s0 = String(txt);
  let esc = 8;
  while (esc > 3 && anchoTexto(s0, esc) > 140) esc--;
  const yN = Math.round(Y0 + (h - 7 * esc) / 2);
  texto(s0, x, yN, { esc, rampa: PAL.AMBAR, sombra: PAL.NOGAL[0], contorno: PAL.NOGAL[0], suave: true, bisel: true, alinear: 'centro' });
  return 1 - u;
}

// ════════════════════════════════════════════════════════════════════════════
//  FONDOS: plató y cielo
// ════════════════════════════════════════════════════════════════════════════
export function crearPlato({ ancho = 640, focoX = 300, focoY = 118, sueloY = 200, semilla = 11 } = {}) {
  const capa = nuevaCapa(ancho, H);
  const fuente = [focoX - 150, -60];          // de dónde viene el haz
  const objetivo = [focoX, sueloY + 18];
  const ax = objetivo[0] - fuente[0], ay = objetivo[1] - fuente[1], al = Math.hypot(ax, ay);
  const haz = (x, y) => {
    const px = x - fuente[0], py = y - fuente[1];
    const along = (px * ax + py * ay) / al, perp = Math.abs(px * ay - py * ax) / al;
    if (along <= 0) return 0;
    const ancho2 = 18 + along * 0.42;
    return clamp(1 - perp / ancho2, 0, 1) ** 1.6 * clamp(along / 60, 0, 1) * (1 - clamp((along - al) / 60, 0, 1));
  };
  en(capa, () => {
    for (let y = 0; y < H; y++) for (let x = 0; x < ancho; x++) {
      let v;
      const borde = Math.abs(x - ancho / 2) / (ancho / 2);
      const tex = 0.55 * (fbm(x * 0.022 + semilla, y * 0.03, 3) - 0.5) + 0.25 * (vnoise(x * 0.25, y * 0.25) - 0.5);
      if (y < sueloY) {
        const k = y / sueloY;
        v = 1.8 + 2.4 * Math.pow(k, 1.3);
        v += 4.2 * Math.exp(-(((x - focoX) / 170) ** 2) - (((y - focoY) / 115) ** 2));
        v += 0.9 * Math.exp(-(((y - sueloY) / 9) ** 2));     // la curva del ciclorama recoge luz
        v -= 1.6 * borde * borde;
        v += tex;
        v += 1.0 * haz(x, y);
        capa.buf[y * ancho + x] = tono(PAL.TELON, v, x, y, 1);
      } else {
        const d = (y - sueloY) / (H - sueloY);
        v = 3.0 - 1.8 * d;
        v += 4.0 * Math.exp(-(((x - focoX) / (150 + 90 * d)) ** 2) - (((y - (sueloY + 24)) / 26) ** 2));
        v += 0.7 * Math.exp(-(((y - sueloY) / 6) ** 2));
        v -= 1.8 * borde * borde;
        v += tex * 0.6;
        v += 0.6 * haz(x, y);
        capa.buf[y * ancho + x] = tono(PAL.SUELO, v, x, y, 1);
      }
    }
  });
  const MOTAS = [];
  { const rnd = mulberry32(semilla * 7 + 1); for (let i = 0; i < 46; i++) MOTAS.push([rnd(), rnd(), rnd(), rnd()]); }
  return {
    capa, ancho, sueloY, focoX, focoY,
    dibujar({ camX = (ancho - W) / 2, t = 0, polvo = 1 } = {}) {
      const cx = Math.round(clamp(camX, 0, ancho - W));
      pegar(capa, -cx, 0, { opaco: true });
      if (polvo > 0) {
        const tq = paso(t, 12);
        for (const [a, b, c, d] of MOTAS) {
          const along = mezcla(70, al + 20, a), perp = (b - 0.5) * (18 + along * 0.42) * 1.4;
          let x = fuente[0] + (ax / al) * along - (ay / al) * perp, y = fuente[1] + (ay / al) * along + (ax / al) * perp;
          x += Math.sin(tq * (0.3 + c * 0.4) + d * 9) * 6; y += ((tq * (2 + c * 3) + d * 40) % 30) - 15;
          const k = haz(x, y);
          if (k < 0.25) continue;
          pset(Math.round(x - cx), Math.round(y), k > 0.6 && c > 0.5 ? PAL.TELON[11] : PAL.TELON[9]);
        }
      }
    },
  };
}
export function crearCielo({ ancho = 640, alto = H, semilla = 5, via = 0.8, nebulosa = 0.4, densidad = 1 } = {}) {
  const capa = nuevaCapa(ancho, alto);
  const viaAt = (x, y) => {
    const s = (x - ancho * 0.5) * 0.5 + (y - alto * 0.5) * 0.86, along = (x - ancho * 0.5) * 0.86 - (y - alto * 0.5) * 0.5;
    const n1 = fbm(x * 0.02 + semilla, y * 0.02, 4), n2 = vnoise(x * 0.08 + 3, y * 0.08);
    const width = 34 + 10 * Math.sin(along * 0.012);
    let v = Math.exp(-(s * s) / (width * width)) * (0.4 + 0.8 * n1);
    v -= 0.5 * Math.exp(-((s - 5) ** 2) / 40) * suave(0.45, 0.7, n2);
    return Math.max(0, v);
  };
  for (let y = 0; y < alto; y++) for (let x = 0; x < ancho; x++) {
    let v = 0.9 + 1.4 * (y / alto) + 2.6 * via * viaAt(x, y);
    const nb = fbm(x * 0.012 + 40 + semilla, y * 0.016, 4);
    const kn = nebulosa * suave(0.5, 0.85, nb);
    if (kn > b8(x, y) * 0.9 + 0.05) capa.buf[y * ancho + x] = tono(PAL.NEBULOSA, 0.4 + kn * 3.2 + v * 0.35, x, y, 1);
    else capa.buf[y * ancho + x] = tono(PAL.NOCHE, v, x, y, 1);
  }
  const rnd = mulberry32(semilla * 131 + 7);
  const est = [];
  const N = Math.round(420 * densidad * (ancho * alto) / (640 * 270));
  for (let g = 0; est.length < N && g < 40000; g++) {
    const x = rnd() * ancho, y = rnd() * alto;
    if (rnd() > 0.35 + 1.2 * viaAt(x, y)) continue;
    const q = rnd();
    est.push({ x, y, capa: q < 0.62 ? 0 : q < 0.9 ? 1 : 2, tinte: rnd() < 0.18 ? 1 : rnd() < 0.15 ? 2 : 0, k: 3 + Math.floor(rnd() * 5), ph: Math.floor(rnd() * 9) });
  }
  const CALIDA = pal(['#7a5a6a', '#e0a77c', '#ffe0b0']), FRIA = pal(['#4a6aa8', '#9cc4ff', '#eaf4ff']);
  return {
    capa, ancho, alto,
    dibujar({ camX = 0, camY = 0, t = 0, quieto = false } = {}) {
      parallax(capa, camX, camY, 0.25, { envolver: true });
      const f = fot(t, 8);
      for (const s of est) {
        const fac = [0.5, 0.75, 1][s.capa];
        let x = Math.round(s.x - camX * fac), y = Math.round(s.y - camY * fac);
        x = ((x % ancho) + ancho) % ancho; y = ((y % alto) + alto) % alto;
        if (x >= W || y >= H) continue;
        const tw = quieto ? 1 : ((f + s.ph) % s.k) === 0 ? 0 : 1;
        const R = s.tinte === 1 ? CALIDA : s.tinte === 2 ? FRIA : null;
        if (s.capa === 0) { if (tw) pset(x, y, PAL.ESTRELLA[1]); }
        else if (s.capa === 1) pset(x, y, R ? R[1 + tw] : PAL.ESTRELLA[2 + tw]);
        else {
          pset(x, y, R ? R[2] : PAL.ESTRELLA[4]);
          if (tw) { const g = R ? R[0] : PAL.ESTRELLA[1]; pset(x - 1, y, g); pset(x + 1, y, g); pset(x, y - 1, g); pset(x, y + 1, g); }
        }
      }
    },
  };
}

// ════════════════════════════════════════════════════════════════════════════
//  PRESENTACIÓN Y POST
// ════════════════════════════════════════════════════════════════════════════
export function crearPixel(lienzo, opciones = {}) {
  const captura = new URLSearchParams(location.search).has('captura');
  const post = { vineta: 0.32, resplandor: 0.3, grano: 0.03, lineas: 0, ...(opciones.post ?? {}) };
  const ctx = lienzo.getContext('2d');
  const bajo = document.createElement('canvas'); bajo.width = W; bajo.height = H;
  const bctx = bajo.getContext('2d');
  const img = bctx.createImageData(W, H);
  PANTALLA.buf = new Uint32Array(img.data.buffer);
  T = PANTALLA;
  // resplandor: los píxeles brillantes, a un cuarto y a un octavo, suavizados
  const brillo = document.createElement('canvas'); brillo.width = W; brillo.height = H;
  const brctx = brillo.getContext('2d');
  const brimg = brctx.createImageData(W, H), br32 = new Uint32Array(brimg.data.buffer);
  const r4 = document.createElement('canvas'); r4.width = W / 4; r4.height = Math.ceil(H / 4);
  const r8 = document.createElement('canvas'); r8.width = W / 8; r8.height = Math.ceil(H / 8);
  const r4c = r4.getContext('2d'), r8c = r8.getContext('2d');
  // viñeta (en el propio píxel, con tramado)
  const VIG = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = (x + 0.5) / W - 0.5, v = (y + 0.5) / H - 0.5, d = Math.hypot(u * 1.15, v * 1.35);
    VIG[y * W + x] = suave(0.36, 0.8, d);
  }
  // grano (a 1920) y líneas
  const granos = [];
  for (let k = 0; k < 4; k++) {
    const g = document.createElement('canvas'); g.width = 256; g.height = 256;
    const gc = g.getContext('2d'), gi = gc.createImageData(256, 256), rnd = mulberry32(900 + k);
    for (let i = 0; i < 256 * 256; i++) { const v = 128 + (rnd() + rnd() + rnd() - 1.5) * 120; gi.data[i * 4] = gi.data[i * 4 + 1] = gi.data[i * 4 + 2] = v; gi.data[i * 4 + 3] = 255; }
    gc.putImageData(gi, 0, 0);
    granos.push(ctx.createPattern(g, 'repeat'));
  }
  const lin4 = document.createElement('canvas'); lin4.width = 1; lin4.height = ESCALA;
  { const lc = lin4.getContext('2d'); lc.fillStyle = '#000'; lc.fillRect(0, ESCALA - 1, 1, 1); }
  const patLin = ctx.createPattern(lin4, 'repeat');
  let vista = null, medio = null, mctx = null;
  function ajustar() {
    const dpr = captura ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth, vh = window.innerHeight;
    const cw = Math.max(1, Math.round(vw * dpr)), ch = Math.max(1, Math.round(vh * dpr));
    lienzo.width = cw; lienzo.height = ch;
    lienzo.style.width = vw + 'px'; lienzo.style.height = vh + 'px';
    const s = Math.min(cw / W, ch / H);
    const w = Math.round(W * s), h = Math.round(H * s);
    vista = { s, w, h, x: Math.floor((cw - w) / 2), y: Math.floor((ch - h) / 2), cw, ch };
    const k = Math.ceil(s - 1e-6);
    if (Math.abs(s - Math.round(s)) < 1e-6 || s < 1) medio = null;
    else { medio = document.createElement('canvas'); medio.width = W * k; medio.height = H * k; mctx = medio.getContext('2d'); }
  }
  ajustar();
  if (!captura) window.addEventListener('resize', ajustar);
  function presentar(t = 0) {
    const buf = PANTALLA.buf;
    if (post.vineta > 0) {
      const k = post.vineta;
      for (let i = 0; i < W * H; i++) {
        const vg = VIG[i]; if (vg <= 0.02) continue;
        const x = i % W, y = (i / W) | 0;
        const q = Math.floor(vg * k * 6 + b4(x, y)) / 6;
        if (q > 0) { const p = buf[i]; const f = 1 - q; buf[i] = (0xff000000 | (((((p >>> 16) & 255) * f) | 0) << 16) | (((((p >>> 8) & 255) * f) | 0) << 8) | (((p & 255) * f) | 0)) >>> 0; }
      }
    }
    bctx.putImageData(img, 0, 0);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.fillStyle = '#04030a';
    if (vista.x > 0 || vista.y > 0) ctx.fillRect(0, 0, vista.cw, vista.ch);
    if (!medio) { ctx.imageSmoothingEnabled = false; ctx.drawImage(bajo, 0, 0, W, H, vista.x, vista.y, vista.w, vista.h); }
    else {
      mctx.imageSmoothingEnabled = false; mctx.drawImage(bajo, 0, 0, medio.width, medio.height);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(medio, 0, 0, medio.width, medio.height, vista.x, vista.y, vista.w, vista.h);
    }
    if (post.resplandor > 0) {
      let hay = false;
      for (let i = 0; i < W * H; i++) {
        const p = buf[i], l = ((p & 255) * 0.299 + ((p >>> 8) & 255) * 0.587 + ((p >>> 16) & 255) * 0.114) / 255;
        if (l > 0.66) { const f = Math.min(1, (l - 0.66) / 0.3); br32[i] = (0xff000000 | (((((p >>> 16) & 255) * f) | 0) << 16) | (((((p >>> 8) & 255) * f) | 0) << 8) | (((p & 255) * f) | 0)) >>> 0; hay = true; }
        else br32[i] = 0xff000000;
      }
      if (hay) {
        brctx.putImageData(brimg, 0, 0);
        r4c.imageSmoothingEnabled = true; r4c.drawImage(brillo, 0, 0, r4.width, r4.height);
        r8c.imageSmoothingEnabled = true; r8c.drawImage(r4, 0, 0, r8.width, r8.height);
        ctx.imageSmoothingEnabled = true; ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = post.resplandor * 0.6; ctx.drawImage(r4, 0, 0, r4.width, r4.height, vista.x, vista.y, vista.w, vista.h);
        ctx.globalAlpha = post.resplandor * 0.8; ctx.drawImage(r8, 0, 0, r8.width, r8.height, vista.x, vista.y, vista.w, vista.h);
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      }
    }
    if (post.lineas > 0) {
      ctx.globalAlpha = post.lineas; ctx.fillStyle = patLin;
      ctx.save(); ctx.translate(vista.x, vista.y); ctx.scale(vista.s / ESCALA, vista.s / ESCALA); ctx.fillRect(0, 0, W * ESCALA, H * ESCALA); ctx.restore();
      ctx.globalAlpha = 1;
    }
    if (post.grano > 0) {
      const f = fot(t, 12);
      ctx.save();
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = post.grano;
      ctx.translate(vista.x - Math.floor(hash2(f, 1) * 256), vista.y - Math.floor(hash2(f, 2) * 256));
      ctx.fillStyle = granos[f & 3]; ctx.fillRect(0, 0, vista.w + 256, vista.h + 256);
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    }
  }
  return {
    W, H, ESCALA, PAL, post, presentar, ajustar,
    // destino y primitivas
    nuevaCapa, en, destino, limpiar, pset, pget, rect, linea, elipse, disco, anillo, degradado, degradadoV, degradadoRadial,
    luz, sombra, sombraRect, oscurecer, velo, pegar, parallax, instantanea, ampliar, tono,
    // piezas
    texto, anchoTexto, atom, ATOM_SITIO, persona, POSES, mezclarPoses, mano, forma, regla, REGLA, niebla, redGalaxias, cartela, CARTELA, crearPlato, crearCielo,
    // utilidades
    clamp, mezcla, lin, suave, entra, sale, entraSale, rebote, fot, paso, mulberry32, hash2, vnoise, fbm, b4, b8, hex, rgb, color, mezclaColor, luma,
  };
}
