// Fontanería y decorados del episodio 13 (la física del fútbol americano) en el estilo canónico pixel chibi, al nivel de
// episodios/ESTANDAR.md. Ocho decorados (guion.md): A West Point (1913), B Cedar Point (1913), C Washington y el campo de
// 1905, D el campo de 1906, E el laboratorio del giro, F la fábrica de Ada (Ohio), G el estadio de la patada (Las Vegas
// cubierto y Denver con nieve), H el laboratorio del casco y el estadio de hoy. Más el mapa de papel de EE. UU.
// (ov-mapas.js) y la pieza que sale en casi todo: el balón de cada época. Sin marcas ni escudos de la NFL ni de equipos
// reales de hoy: colores genéricos y escudos inventados. Reutiliza del episodio 10 la paleta, rodar, la mano y la silla.
//
//   import * as T from '/atomo/plato/escenas/fa-comun.js';
//   const { E, R, M } = await T.preparar('fa-gancho');
//   T.rodar(E, R, [[0, (t) => T.westPoint(R, t)]], { año: 1913 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { albersEEUU, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el cuero de los balones (de época y de hoy), los cordones y el césped
    cuero: '#8a4a24', cueroS: '#5e2e14', cueroL: '#b86e3a', cordon: '#f2eee2', cordonS: '#c8c0b0',
    cesped: '#4a8a3a', cespedS: '#3a6e2e', cespedL: '#6aaa4a', cal: '#f2f2ea',
    // la lana de los jerséis de 1905–1913 y el gris de West Point
    lanaAzul: '#2a3458', lanaNegra: '#2a2430', oroViejo: '#c8a040', grisCadete: '#8c8ca0', piedra: '#9a9488', piedraS: '#6e6a62',
    // los equipos inventados de hoy y las pantallas
    equipoA: '#1e8a8a', equipoAS: '#146464', equipoB: '#8a2a3a', equipoBS: '#641e2a', naranja: '#e8783a',
    pantalla: '#0e1a2e', pantallaL: '#3ac8e8',
  }),
};

const ATOM = [297, 24];
// Atom arriba a la derecha, grande y solo (GUIA-ESTILO.md)
function conAtomGrande(R) {
  R.companero = (t, e = 0) => {
    const x = ATOM[0], y = ATOM[1] + Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)), r = 13 + 2.4 * e;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) R.pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
    R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e });
  };
  R.caja = () => {};
}

export async function preparar(id) {
  const E = await escena(id, 'ep13');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el balón de rugby (la melé), el casco de cuero (el pase) y el chip (la ciencia)
  Object.assign(R.ICONOS, {
    rugby: ['..###..', '.#####.', '#######', '#.#.#.#', '#######', '.#####.', '..###..'],
    casco: ['.#####.', '#######', '##.#.##', '#.....#', '#.....#', '.#...#.', '.......'],
    chip: ['.#.#.#.', '#######', '.#...#.', '##.#.##', '.#...#.', '#######', '.#.#.#.'],
  });
  // la barra de tiempo: la melé (1905–1912), el pase (1913–1969) y la ciencia (1970–2026)
  R.tramosTiempo([[1905, 1912, R.PALA.ORO, 'rugby'], [1913, 1969, R.PALA.AZUL, 'casco'], [1970, 2026, R.PALA.ROJO, 'chip']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// ── El mapa de papel de EE. UU. ────────────────────────────────────────────────────────────────────────────────────────
export const LUGARES = {
  westPoint: [-73.96, 41.39], washington: [-77.04, 38.90], saintLouis: [-90.20, 38.63], waukesha: [-88.23, 43.01],
  southBend: [-86.25, 41.68], sandusky: [-82.71, 41.45], ada: [-83.82, 40.77], denver: [-104.99, 39.74],
  lasVegas: [-115.14, 36.17], inglewood: [-118.34, 33.95], nuevaYork: [-74.0, 40.71], jacksonville: [-81.66, 30.33],
};
// zonas del mapa: [zoom, centro]
const ZONAS = { eeuu: [1, [-96, 37.5]], noreste: [3.2, [-77, 40.5]], medioeste: [2.4, [-86, 41.5]], oeste: [2.2, [-112, 37]] };
// el mapa de papel de EE. UU. sobre la mesa de madera (el del 12). Con o.zona ('eeuu', 'noreste', 'medioeste', 'oeste')
// encuadra una zona; con o.zoom y o.centro ([lon, lat]) encuadra una zona libre; con o.desde (una zona) y o.u (0–1) va de
// una zona a otra. El papel lleva grabadas en el mar las ondas de los mapas antiguos y los dobleces, y la rosa de los
// vientos en un trozo de mar libre (o.rosa [x, y] la fija y false la quita). Una vista quieta se pinta una vez y se
// guarda. Devuelve la proyección (P([lon, lat]) → [x, y]) para las chinchetas
export function mapa(R, t, o = {}) {
  const libre = o.zoom != null || o.centro != null, B = libre ? [o.zoom ?? 1, o.centro ?? ZONAS.eeuu[1]] : ZONAS[o.zona ?? 'eeuu'];
  const A = o.desde ? ZONAS[o.desde] ?? B : B, u = o.desde ? Math.max(0, Math.min(1, o.u ?? 0)) : 1, e = u * u * (3 - 2 * u);
  const zoom = lerp(A[0], B[0], e), centro = [lerp(A[1][0], B[1][0], e), lerp(A[1][1], B[1][1], e)];
  const P = albersEEUU([20, 14, 300, 170], { zoom, centro });
  // dónde va la rosa: la de la zona (o la de las dos, a medio camino), la que se pida o, en la zona libre, la que se busque
  const ra = e_ROSA[o.desde ?? o.zona ?? 'eeuu'], rb = libre ? undefined : e_ROSA[o.zona ?? 'eeuu'];
  let rosa = o.rosa === false ? null : o.rosa ?? (rb === undefined && libre && !o.desde ? 'busca' : ra && rb ? [Math.round(lerp(ra[0], rb[0], e)), Math.round(lerp(ra[1], rb[1], e))] : e < 0.5 ? ra ?? (rb ? rb : 'busca') : rb ?? 'busca');
  const quieta = !o.desde || u <= 0 || u >= 1, clave = 'mapa:' + zoom.toFixed(4) + ',' + centro[0].toFixed(4) + ',' + centro[1].toFixed(4) + ':' + rosa;
  const pinta = () => {
    mapaPapel(R, 0, P, { eeuu: true, mesa: 6 });
    if (rosa === 'busca') rosa = e_buscaMar(R);
    e_mapaGrabado(R);
    if (rosa) e_rosa(R, rosa[0], rosa[1]);
  };
  if (quieta && (e_FIJOS.has(clave) || e_MAPAS < 8)) { if (!e_FIJOS.has(clave)) e_MAPAS++; e_fijo(R, clave, pinta); } else pinta();
  return P;
}
// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };


// un fondo fijo que se pinta una vez en su búfer y se copia en cada fotograma (como en th-comun.js)
const e_FIJOS = new Map();

function e_fijo(R, clave, dibuja) {
  let b = e_FIJOS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_FIJOS.set(clave, b); }
  R.copiar(b);
}

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// las rosas de los vientos de cada zona (centro en pantalla), en un trozo de mar que no tapa costa ni lo que las escenas
// ponen encima; null: la zona no tiene mar libre
const e_ROSA = { eeuu: [282, 100], noreste: [282, 140], medioeste: null, oeste: [40, 150] };

let e_MAPAS = 0;   // vistas quietas del mapa ya guardadas (como mucho 8)

const e_MAR = ['#86a6bc', '#7898b0', '#6c8aa2'].map(hex);

// el grabado del papel, encima del mapa ya pintado: en el mar, ondas de buril («~») en tresbolillo donde hay agua alrededor
// (no pisan costas ni la zona de Atom), y los dos dobleces del papel (una raya de luz con su sombra al lado)
function e_mapaGrabado(R) {
  const mar = (x, y) => { const c = R.pget(x, y); return c === e_MAR[0] || c === e_MAR[1] || c === e_MAR[2]; };
  for (let j = 0, y = 18; y < 166; j++, y += 9) for (let x = 28 + (j % 2) * 8; x < 292; x += 16) {
    const X = x + Math.round((h(x, y, 520) - 0.5) * 4), Y = y + Math.round((h(x, y, 521) - 0.5) * 2);
    if (X > 272 && Y < 48) continue;
    let ok = true; for (let i = -4; i <= 4 && ok; i += 2) for (let k = -2; k <= 3; k++) if (!mar(X + i, Y + k)) { ok = false; break; }
    if (!ok) continue;
    const c = hex('#6a88a0'), cl = hex('#9ab6c8');
    R.pset(X - 3, Y + 1, c); R.pset(X - 2, Y, c); R.pset(X - 1, Y, c); R.pset(X, Y + 1, c); R.pset(X + 1, Y + 1, c); R.pset(X + 2, Y, c); R.pset(X + 3, Y, c);
    R.pset(X - 2, Y - 1, cl); R.pset(X + 2, Y - 1, cl);
  }
  for (let y = 6; y < 174; y++) for (const x of [108, 214]) { R.pset(x, y, e_mezcla(R.pget(x, y), hex('#fff8e8'), 0.22)); R.pset(x + 1, y, e_mezcla(R.pget(x + 1, y), hex('#3a2a1a'), 0.12)); }
  for (let x = 6; x < 314; x++) { R.pset(x, 91, e_mezcla(R.pget(x, 91), hex('#fff8e8'), 0.22)); R.pset(x, 92, e_mezcla(R.pget(x, 92), hex('#3a2a1a'), 0.12)); }
}

// busca, en la vista ya pintada, un sitio de mar libre para la rosa (radio 12), de la esquina de abajo a la derecha hacia
// arriba y hacia la izquierda, fuera de la zona de Atom y de la barra del año; null si no lo hay
function e_buscaMar(R) {
  const mar = (x, y) => { const c = R.pget(x, y); return c === e_MAR[0] || c === e_MAR[1] || c === e_MAR[2]; };
  for (let x = 282; x >= 40; x -= 6) for (let y = 150; y >= 28; y -= 6) {
    if (x > 264 && y < 58) continue;
    let ok = true; for (let j = -12; j <= 12 && ok; j += 3) for (let i = -12; i <= 12; i += 3) if (!mar(x + i, y + j)) { ok = false; break; }
    if (ok) return [x, y];
  }
  return null;
}

// la rosa de los vientos impresa en el papel (centro x, y; unos 23 px): el aro doble con sus marcas cada 22,5°, las ocho
// puntas en dos tonos (la mitad en luz y la otra en sombra, como las de los mapas antiguos), el norte rojo con su remate y
// el botón del centro
function e_rosa(R, x, y) {
  const tinta = hex('#4a3e34'), media = hex('#a8987a'), papel = hex('#e8dcbc'), rojo = hex('#b83a2a'), rojoS = hex('#7a2418');
  for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * 11), Math.round(y + Math.sin(a) * 11), tinta); if (k % 2 === 0) R.pset(Math.round(x + Math.cos(a) * 9), Math.round(y + Math.sin(a) * 9), media); }
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * 10), Math.round(y + Math.sin(a) * 10), tinta); }
  for (let k = 7; k >= 0; k--) {
    const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? 6 : 12, w = k % 2 ? 1.6 : 2.6, px = -Math.sin(a) * w, py = Math.cos(a) * w, tx = x + Math.cos(a) * l, ty = y + Math.sin(a) * l;
    const norte = k === 0, luz = norte ? rojo : k % 2 ? hex('#cbbd9a') : hex('#f6eed8'), sombra = norte ? rojoS : k % 2 ? hex('#8a7a5a') : hex('#6a5a42');
    R.poligono([[x + px, y + py], [tx, ty], [x, y]].map(([u, v]) => [Math.round(u), Math.round(v)]), luz);
    R.poligono([[x - px, y - py], [tx, ty], [x, y]].map(([u, v]) => [Math.round(u), Math.round(v)]), sombra);
    if (k % 2 === 0) R.linea(Math.round(x + px), Math.round(y + py), Math.round(tx), Math.round(ty), tinta);
  }
  R.pset(x, y - 14, rojo); R.pset(x - 1, y - 13, rojo); R.pset(x + 1, y - 13, rojo);   // el remate del norte
  R.disco(x, y, 1, tinta); R.pset(x, y, hex('#c8a040'));
}


// ══ Los decorados: primera versión de cada uno. Cada función pinta los 320 × 180 píxeles en cada fotograma ══════════
// (ESTANDAR.md). Las cabeceras dicen lo que se ve y sus opciones; las escenas ponen a los personajes con R.actor.

// ── la pieza de todo el episodio: el balón ────────────────────────────────────────────────────────────────────────────
// El balón de cada época, de perfil, con su centro en (x, y): o.epoca '1906' (gordo, casi un melón de rugby: cuero marrón
// claro con la costura y los cordones gruesos), '1913' (más estrecho pero todavía gordo y redondeado) u 'hoy' (el
// alargado y puntiagudo, cuero marrón rojizo con el grano punteado, las dos rayas blancas no van: sin marcas, los
// cordones blancos y una corona pequeña estampada en lugar de letras); o.s escala (1: unos 11 px de largo hoy); o.ang
// el ángulo del eje en radianes (0 apunta a la derecha, positivo hacia abajo); o.giro (vueltas) hace correr los cordones
// alrededor del eje y la luz por el cuero, para que se vea girar en espiral; o.estela pinta las líneas de viento detrás;
// o.volteretas (true: da vueltas de punta a punta, el pato herido). Sin contorno grueso: el canon chibi.
export function balon(R, x, y, t, o = {}) { R.disco(Math.round(x), Math.round(y), Math.round(4 * (o.s ?? 1)), C.cuero); }

// ── A · West Point, Nueva York (1 de noviembre de 1913) ───────────────────────────────────────────────────────────────
// La tarde de otoño del partido Ejército–Notre Dame. Cielo de otoño tramado (sol bajo, nubes de tres tonos a varias
// velocidades, bandadas que migran), los edificios de piedra gris de la academia con sus torres góticas, árboles con
// las hojas rojas y amarillas que caen y vuelan, el río Hudson detrás con un vapor de ruedas, y el campo de hierba
// amarillenta con las líneas de cal cada cinco yardas (por eso lo llamaban «gridiron»), los postes de gol en forma de H.
//   o.encuadre:
//   · 'grada' (por defecto): desde detrás de la banda: la grada de madera llena de cadetes de gris (bustos que se mueven,
//     gorros que vuelan), banderines sin letras, los periodistas con sus cámaras de fuelle y el humo del magnesio, la mula
//     del Ejército con su manta en la banda (exportar g_mula para el gag del programa), el campo con los dos equipos al
//     fondo pequeños;
//   · 'campo': a ras de campo y alargado, para el pase largo: el pasillo de la banda por el que corre el receptor libre,
//     los defensores lejos, la grada como fondo continuo; deja libre una franja de cielo por la que viaja el balón;
//   · 'marcador': el marcador de madera de números que se cuelgan (o.marcador [a, b]), con la grada y el atardecer.
//   o.mele 0–1: la melé en el centro del campo (los jugadores apilados empujando), para el plano de cómo se jugaba.
export function westPoint(R, t, o = {}) { provisional(R, t, C.lanaAzul, C.cesped); }

// ── B · Cedar Point, Ohio (verano de 1913) ──────────────────────────────────────────────────────────────────────────
// El balneario a orillas del lago Erie: el gran hotel de madera blanca con sus galerías y banderas, casetas de baño a
// rayas, bañistas con trajes de época (pequeños, de fondo), sombrillas, un muelle con barcas, gaviotas, el lago con olas
// suaves que brillan y la arena con huellas, algas y conchas. Cielo de verano tramado con cúmulos.
//   o.encuadre: 'playa' (por defecto: general, con la torre de socorrista de madera a la derecha y sitio en la arena para
//   dos personajes que se lanzan el balón, a unos 120 px el uno del otro) o 'cerca' (la arena de cerca, para el balón
//   gordo en las manos: la toalla, el salvavidas, el cubo).
//   o.luz: 'dia' o 'tarde' (atardecer dorado entre turnos).
export function cedarPoint(R, t, o = {}) { provisional(R, t, C.cielo ?? C.lanaAzul, C.cal); }

// ── C · Washington y el campo de 1905 ───────────────────────────────────────────────────────────────────────────────
// La Casa Blanca en otoño de 1905. o.encuadre:
//   · 'fuera': la fachada norte con su pórtico, la verja, carruajes y algún automóvil de época que pasan (por delante de la
//     gente), farolas de gas, árboles con hojas de otoño, gente pequeña con bombín y sombrillas;
//   · 'despacho' (por defecto): el despacho de 1905, con chimenea, papel pintado, retratos (sin caras reconocibles), la
//     bandera de 45 estrellas, el gran escritorio con papeles, tintero, teléfono de candelabro y el osito de peluche con un
//     casco de cuero diminuto (exportar c_osito(R, x, y, t, caido 0–1) para el gag: el casco se le cae sobre los ojos);
//     sitio para cuatro o cinco personajes de pie delante del escritorio;
//   · 'reglas': el inserto del libro de reglas abierto sobre la mesa (diagramas de jugadas con círculos y flechas, sin
//     letras), con una flecha hacia delante que se dibuja sola (o.flecha 0–1) y la zona prohibida del centro de la línea.
export function casaBlanca(R, t, o = {}) { provisional(R, t, C.piedra, C.lanaAzul); }

// El campo embarrado de una universidad del este en 1905: barro con charcos y huellas, líneas de cal medio borradas, la
// grada de madera con público abrigado (bustos), banderines, un árbol desnudo, el cielo gris de noviembre. o.mele 0–1: la
// cuña de jugadores con jerséis de lana a rayas que empuja (el montón se mueve como un bloque, brazos y piernas), y o.u
// (0–1) el polvo y el barro que salta; un médico con maletín y un camillero pequeños esperan en la banda.
export function campo1905(R, t, o = {}) { provisional(R, t, C.cueroS, C.cespedS); }

// ── D · el campo de 1906 ────────────────────────────────────────────────────────────────────────────────────────────
// Un campo universitario pequeño del Medio Oeste a principios de otoño: hierba con calvas, líneas de cal, postes de gol
// de madera en H, una grada pequeña y público de pie a lo largo de la cuerda (bombines, canotiers, sombrillas, niños
// subidos a una valla), un coche de caballos y una bicicleta aparcados, árboles y un granero o una iglesia de madera al
// fondo, cielo de septiembre tramado. o.encuadre: 'general' (por defecto, el partido de lado, con sitio para el pase de
// unas veinte yardas) o 'entreno' (el campo de entrenamiento cerrado con una valla de tablas, para practicar a escondidas:
// la valla con una tabla suelta por la que asoma un vecino curioso, exportar d_vecino(R, x, y, t, asoma 0–1)).
export function campo1906(R, t, o = {}) { provisional(R, t, C.cespedL, C.cesped); }

// ── E · el laboratorio del giro (hoy) ────────────────────────────────────────────────────────────────────────────────
// El laboratorio de física de una universidad. o.encuadre:
//   · 'tunel' (por defecto): el túnel de viento acristalado con un balón de hoy sujeto por su eje que gira (o.giro) y
//     las líneas de humo que lo rodean, el ventilador grande al fondo que gira, cuadros eléctricos con luces, la cámara
//     rápida en su trípode, monitores con la curva del giro (sin letras), mesas con herramientas y papeles, ventanas con
//     el campus detrás (árboles, un edificio de ladrillo);
//   · 'pizarra': la pizarra verde con la parábola de un pase y el balón dibujado con su eje en varios puntos, flechas,
//     fórmulas hechas de símbolos (θ, ω, →, sin palabras), tiza y borrador; o.u (0–1) va dibujando el eje que gira;
//   · 'mesa': el inserto de la mesa con la peonza que gira (exportar e_peonza(R, x, y, t, o) con o.precesion 0–1: el eje
//     traza círculos lentos, no cabecea deprisa), un balón pequeño de juguete, un giroscopio de laboratorio, café y notas;
//   · 'parque': el parque del campus con un estanque, patos, árboles, bancos y estudiantes pequeños, para el balón que da
//     volteretas (exportar e_pato(R, x, y, t, mira 0–1) para el gag del pato ofendido);
//   · 'arriba': un campo de fútbol visto desde arriba (vista cenital de césped con las líneas cada cinco yardas y los
//     números), para dibujar encima las trayectorias que se desvían un poco a un lado.
export function labGiro(R, t, o = {}) { provisional(R, t, C.piedra, C.pantalla); }

// ── F · la fábrica de balones de Ada, Ohio (hoy) ─────────────────────────────────────────────────────────────────────
// o.encuadre:
//   · 'calle' (por defecto): la calle mayor de un pueblo pequeño de Ohio (casas de ladrillo, un depósito de agua, la
//     iglesia, campos de maíz al fondo, un tractor que pasa) y la fábrica: nave de ladrillo con su logotipo inventado (un
//     balón y una corona, sin letras), muelle de carga con camiones; o.luz 'dia' o 'noche' (las ventanas encendidas, el
//     camión que sale de madrugada con los faros);
//   · 'corte': dentro, la mesa de corte con pieles de cuero de vaca extendidas, troqueles con la forma de los cuatro
//     paneles, pilas de paneles, la estampadora, luz de fluorescentes, trabajadores pequeños al fondo;
//   · 'costura': las máquinas de coser en fila con su operario, los balones del revés que se dan la vuelta, el hilo;
//   · 'cordones': la estación de los cordones (el cordón blanco que se enhebra a mano), la de inflado con su manómetro,
//     la báscula, cajas de balones terminados, el gato de la fábrica (exportar f_gato(R, x, y, t, enredo 0–1)).
export function fabricaAda(R, t, o = {}) { provisional(R, t, C.cueroS, C.cuero); }

// ── G · el estadio de la patada ─────────────────────────────────────────────────────────────────────────────────────
// o.lugar 'vegas' (por defecto: estadio cubierto, techo translúcido con su estructura, luces, pantallas gigantes con
// gráficos sin letras, grada llena de público pequeño que se mueve) o 'denver' (estadio abierto, las montañas nevadas
// detrás, cielo frío de invierno; o.nieve 0–1 hace nevar). o.encuadre:
//   · 'pateo' (por defecto): de lado, a ras de césped: el pateador corre, el compañero sujeta el balón en el suelo, la
//     línea defensiva en primer término; sitio para el balón que sale hacia la derecha;
//   · 'postes': los postes amarillos en Y desde detrás, con la red, la grada al fondo y una paloma posada en el larguero
//     (exportar g_paloma(R, x, y, t, agacha 0–1) para el gag);
//   · 'vestuario': el vestuario con taquillas, bancos, la caja de balones marcados con una «K» y números, cepillos y
//     toallas, el pateador cepillando uno.
//   o.aire 0–1: muestra el aire como puntitos (más densos a nivel del mar, menos en Denver), para explicar la densidad.
export function estadioPatada(R, t, o = {}) { provisional(R, t, C.pantalla, C.cesped); }

// ── H · el laboratorio del casco y el estadio de hoy ─────────────────────────────────────────────────────────────────
// El laboratorio de cascos. o.encuadre:
//   · 'torre' (por defecto): la torre de caídas con su guía vertical, la plataforma, los sensores, monitores con la curva
//     de la fuerza (alta y estrecha sin funda, baja y ancha con funda), cascos en estanterías; exportar h_huevo(R, x, y, t,
//     o) con o.funda (true/false) y o.u (0–1: cae, toca y aguanta o se casca, sin morbo: es un huevo);
//   · 'vitrina': la vitrina iluminada con la historia del casco, del gorro de cuero al casco de plástico y a la funda
//     acolchada, con su luz y reflejos en el cristal;
//   · 'entreno': un campo de entrenamiento de día con jugadores pequeños con la funda acolchada sobre el casco, muñecos de
//     placaje, conos, el entrenador con silbato.
export function labCasco(R, t, o = {}) { provisional(R, t, C.piedraS, C.cesped); }

// El estadio de hoy. o.encuadre:
//   · 'noche' (por defecto): un estadio abierto de noche con los focos, la grada llena (público pequeño con luces de
//     móvil), el césped con las líneas y los números, el cielo nocturno con el resplandor de la ciudad: para el pase en
//     espiral de hoy a cámara lenta; exportar h_estadioDelante para lo que va por delante de los jugadores;
//   · 'cesped': el césped de cerca, con el estadio vacío detrás y desenfocado, para el balón de la presentación de Atom;
//   · 'antenas': el anillo del estadio con las antenas receptoras, cables, la pasarela técnica;
//   · 'sala': la sala de datos con pantallas que muestran puntos que se mueven (los jugadores), trayectorias de pases y
//     barras de velocidad, sin letras; técnicos pequeños con auriculares;
//   · 'superbowl': el gran estadio con techo translúcido de noche, iluminado desde dentro, la explanada con gente que
//     llega, palmeras, el cielo de Los Ángeles al atardecer.
export function estadioHoy(R, t, o = {}) { provisional(R, t, C.pantalla, C.cespedS); }
