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
// El laboratorio de cascos (2022–2026). La física de frenar la cabeza, sin morbo: el gag es un huevo. o.encuadre:
//   · 'torre' (por defecto): la sala de ensayos. A la izquierda, la estantería de acero con cascos de equipos inventados
//     (algunos con la funda acolchada), cajas y bloques de espuma, y el foco de estudio que alumbra la torre. En el centro,
//     la torre de caídas doble (pilares x 88–180, viga arriba en y 22, el motor del cabrestante en y 15–22): dos calles
//     con sus guías (centros x 114 y 154), los electroimanes que sueltan el huevo (abajo en y 42), las barreras de luz
//     con su haz rojo (y 112), el reloj de pared sobre la estantería, la regla roja en el
//     pilar central y los yunques con su célula de carga (la cara de arriba, donde se posan los huevos, en y 126) sobre
//     el zócalo de hormigón con la cinta amarilla y negra. A la derecha, la ventana a la nave de impactos (el péndulo
//     golpea un casco montado cada pocos segundos), la cámara rápida en su trípode delante de la mesa (cabeza en y 107–117,
//     el objetivo hacia los yunques) con la luz de grabación, la mesa con
//     el monitor grande de la fuerza (la curva roja, alta y estrecha, sin funda; la verde azulada, baja y ancha, con funda),
//     el monitor pequeño con la vista de la cámara y su contador, el rack de adquisición con sus luces y la taza que humea;
//     al fondo a la derecha, la puerta con el ojo de buey (alguien pasa por el pasillo) y el pictograma de salida. La
//     baliza de la torre parpadea en ámbar mientras los huevos están arriba y se queda verde al caer.
//     o.u (0–1, opcional): si se da, el decorado dibuja los dos huevos con h_huevo (con funda en la calle de la derecha, la
//     x 154; sin funda en la de la izquierda, la x 114) y la gráfica crece con la caída; sin o.u la escena pone los huevos.
//     o.curva (0–1): cuánto de las dos curvas se ha dibujado (por defecto 1, o lo que marque o.u).
//     o.alto (px, por defecto 72): altura de caída que se pasa a h_huevo.
//   · 'vitrina': la sala de la historia del casco, en penumbra: la vitrina iluminada (cristal x 30–266, y 28–124) con cinco
//     cascos en su soporte sobre peanas blancas, de izquierda a derecha el arnés de cuero (1905), el casco de cuero (1925), el primer
//     casco de plástico con una barra (1943), el casco moderno con rejilla (1990) y el moderno con la funda acolchada encima
//     (2022, sobre un plato que gira); los focos del techo con sus conos y las motas de polvo que flotan, la línea del
//     tiempo dorada con sus puntos, los reflejos fijos del cristal y un brillo que lo barre despacio; el mueble de nogal,
//     el pie con la pantalla de pictogramas (cambia cada pocos segundos), los cuadros con siluetas de jugadores de época,
//     el pasillo de la derecha por el que pasa alguien y el suelo pulido con el reflejo de la vitrina. o.años (true por
//     defecto) pone el año bajo cada casco; false lo quita.
//   · 'entreno': un campo de entrenamiento de día. El cielo tramado con nubes de tres tonos a tres velocidades y pájaros;
//     el edificio de entrenamiento de ladrillo con sus ventanales, árboles que se mecen, la grada pequeña de aluminio con
//     algo de público, la bandera que ondea y los postes amarillos al fondo; en el césped (rayas de cortacésped, líneas de
//     yardas en perspectiva), jugadores pequeños con la funda acolchada encima del casco: tres empujan por turnos el
//     trineo de placaje (sus almohadillas se hunden), uno hace eslalon entre conos, los muñecos de placaje se balancean y el
//     entrenador pequeño (con su carpeta) toca el silbato; al fondo, dos jugadores se pasan el balón. En primer término, la bolsa de balones, dos cascos con funda en
//     la hierba y, a la derecha, la mesa con la nevera de agua y los vasos.
export function labCasco(R, t, o = {}) {
  const enc = o.encuadre === 'vitrina' ? 'vitrina' : o.encuadre === 'entreno' ? 'entreno' : 'torre';
  if (enc === 'vitrina') return g_vitrina(R, t, o);
  if (enc === 'entreno') return g_entreno(R, t, o);
  return g_torre(R, t, o);
}
// El estadio de hoy, de noche (decorado de la pregunta, de los chips, de la Super Bowl y del cierre). Cinco encuadres,
// todos con fondo fijo en un búfer y la vida encima. o.encuadre:
//   · 'noche' (por defecto): el gran estadio abierto visto desde la banda de cerca, un poco en alto. Cielo nocturno tramado
//     con el resplandor de la ciudad, estrellas que titilan y nubes de tres tonos iluminadas por debajo a tres
//     velocidades; cuatro baterías de focos sobre mástiles (y 17–25) con su halo, bombillas que parpadean, haces de luz y
//     polillas; el borde del estadio con su anillo de luces, banderas que ondean y el marcador central (x 138–182,
//     y 17–30) que alterna el tanteo (o.marcador) y la repetición de un pase; la grada alta, la cinta de LED que corre, los
//     palcos con luz cálida y gente que se mueve, la grada baja con escaleras y vomitorios; el público pequeño (camisetas
//     de los dos equipos inventados) que salta, hace la ola y enciende el móvil; el muro acolchado con su banda de LED; el
//     banquillo del fondo con los suplentes pequeños que pasean y los entrenadores; el césped con franjas de corte, las
//     líneas de cinco yardas en perspectiva, las marcas de yarda, los números (los del fondo, del revés), el escudo
//     inventado del centro y el desgaste; la «skycam» colgada de sus cuatro cables, que se pasea sobre el campo.
//   · 'cesped': el césped a ras de suelo, con el estadio vacío detrás desenfocado (gradas de asientos, palcos, los focos
//     como círculos de luz que laten), un cortacésped pequeño al fondo, un aspersor, briznas que se mecen con el viento,
//     gotas de rocío que brillan y polillas: para el balón de la presentación de Atom (centro libre hacia x 160, y 138).
//   · 'antenas': desde la pasarela técnica bajo el techo: el campo allá abajo con los jugadores como puntos que se mueven
//     (cada décima de segundo, como los ve el sistema), la grada de enfrente con su público y sus antenas que parpadean;
//     en primer término la pasarela de rejilla con barandilla, dos antenas receptoras sobre mástil que emiten ondas hacia
//     el campo, mazos de cables que cuelgan, la caja de empalmes con sus luces, el foco de trabajo y la grada de abajo.
//   · 'sala': la sala de datos a oscuras: el videowall de cinco pantallas (el campo visto desde arriba con los puntos de
//     los jugadores, la estela y la trayectoria del pase; barras de velocidad; la curva que corre; el balón que gira con su
//     «600»; las antenas del estadio triangulando a un jugador), el armario de servidores con sus luces, la ventana al
//     estadio iluminado, la fila de puestos con técnicos pequeños con auriculares y la moqueta con el reflejo azul.
//   · 'superbowl': el gran estadio inventado de la final, al atardecer de Los Ángeles: cielo tramado de añil a naranja con
//     nubes de tres tonos a tres velocidades, el sol que se pone tras las colinas, la ciudad lejana con sus luces, un
//     avión que baja hacia el aeropuerto, un dirigible y dos reflectores que barren el cielo; el techo translúcido enorme
//     (paneles en rombo, iluminado desde dentro, con ondas de luz de colores que lo recorren) y, debajo, el vestíbulo
//     encendido con gente; la explanada con palmeras que se mecen, farolas con banderolas, el lago con su fuente y los
//     reflejos, un carrito de globos y la gente que llega en riadas hacia las puertas.
//   o.moviles 0–1 (0,6): cuántas luces de móvil se encienden en la grada; o.ola (true): la ola que recorre la grada;
//   o.marcador ([21, 17]): el tanteo del marcador central ('noche'); o.muestreo (true): en 'antenas' y 'sala', los
//   puntos se mueven a saltos de una décima de segundo; o.jugada (true): en 'antenas' y 'sala', los puntos juegan la
//   jugada del pase (7 s en bucle).
// La geometría de cada encuadre (suelos, huecos, piezas) está en el comentario de h_estadioDelante.
export function estadioHoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'noche';
  if (enc === 'cesped') return h_cesped(R, t, o);
  if (enc === 'antenas') return h_antenas(R, t, o);
  if (enc === 'sala') return h_sala(R, t, o);
  if (enc === 'superbowl') return h_superbowl(R, t, o);
  return h_noche(R, t, o);
}
// los colores del laboratorio, la vitrina y el campo de entrenamiento
const g_C = pal({
  pared: '#c6ced6', paredS: '#b2bac4', paredL: '#dce2e8', junta: '#98a2ae', techo: '#e0e4e8', techoS: '#c2c8d0', cornisa: '#aab2bc',
  zocalo: '#56606c', zocaloL: '#76808c', suelo: '#8a929c', sueloS: '#767e88', sueloL: '#a2aab4', sueloJ: '#7c848e', brillo: '#b8c0c8',
  estante: '#46546a', estanteL: '#7a8aa0', estanteS: '#2e3a4a', carton: '#b88e58', cartonS: '#8a6638', cartonL: '#d4aa70',
  espuma: '#e0c860', espumaS: '#b89a38', espumaA: '#5a8ac8', espumaAS: '#3a6aa0',
  hormigon: '#a09a92', hormigonS: '#7e7870', hormigonL: '#bab4ac', acero: '#8c96a4', aceroL: '#c4ccd8', aceroS: '#5c6676', aceroD: '#3c4452',
  pilar: '#d8a02a', pilarS: '#a8761a', pilarL: '#f0c050', regla: '#c83a3a',
  monitor: '#0e1622', monitorR: '#1a2a3a', rojoC: '#e8504a', verdeC: '#3ac8b0', cursor: '#2a4058',
  mesa: '#d8d2c6', mesaS: '#aea698', mesaL: '#ece8e0', pata: '#5a6472',
  nave: '#3a4250', naveS: '#2a303c', naveL: '#56606e', cristal: '#a8c8dc', reflejo: '#e8f2f8',
  puerta: '#7a8a9a', puertaS: '#5a6a7a', puertaL: '#9aaaba', pasillo: '#e8e2cc', salida: '#2aa85a',
  // la funda acolchada
  funda: '#6a7e96', fundaS: '#4a5a70', fundaL: '#92a6bc',
  // la cáscara del huevo, la yema
  huevo: '#f2e6cc', huevoS: '#d4c09a', huevoD: '#a88e66', huevoL: '#fffaee', yema: '#f2b42a', yemaS: '#d88a1e', yemaL: '#fde27a',
  // la vitrina
  muro: '#2a3644', muroS: '#202a36', muroL: '#36445a', nogal: '#6a4228', nogalS: '#4a2c18', nogalL: '#8a5a36', laton: '#d8b048', latonS: '#a07c28',
  fondoV: '#e6dac0', fondoVS: '#cfc0a0', fondoVL: '#f6eedc', peana: '#eceae4', peanaS: '#c4c0b8', cono: '#f8f0d0', sueloV: '#3a2c26', sueloVL: '#5a463a',
  // el campo de entrenamiento
  cielo0: '#5aa8e8', cielo1: '#74b8ee', cielo2: '#92caf2', cielo3: '#b4daf4', nube: '#ffffff', nubeM: '#e2ecf6', nubeS: '#b8cae0',
  arbol: '#3a7a3a', arbolS: '#2a5a2a', arbolL: '#5a9a4a', ladrillo: '#a85a42', ladrilloS: '#86422e', ladrilloL: '#c27258', vidrio: '#5a8ab0', vidrioL: '#9ac4e0',
  grada: '#b4bcc6', gradaS: '#868e98', poste: '#f0c82a', posteS: '#b8941a',
  cesped1: '#4e9a3c', cesped2: '#5aa844', cespedS: '#3c7e2e', cespedD: '#2e6624', cespedL: '#78c05a', cal: '#f2f2ea',
  trineo: '#c83a3a', trineoS: '#8e2424', trineoL: '#e8605a', cono: '#e8783a', conoS: '#b0521e', nevera: '#e86a2a', neveraS: '#b04a1a', neveraL: '#f4945a',
  red: '#d8d2c0', redS: '#a8a090',
});

// tramado ordenado 4×4: un umbral entre 0 y 1 para cada píxel (degradados sin franjas lisas)
const g_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function g_um(x, y) { return (g_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16; }

// un búfer fijo propio (como e_fijo), pero que devuelve el búfer para poder sacar máscaras de él
const g_FIJOS = new Map();

function g_fijo(R, clave, dibuja) {
  let b = g_FIJOS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); g_FIJOS.set(clave, b); }
  R.copiar(b);
  return b;
}

// cifras pequeñas de 3×5 (contadores de pantallas)
const g_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function g_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = g_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// un casco de lado (cx: centro, yb: la base, s: escala, dir: 1 mira a la derecha). tipo: 'gorro' (el arnés de cuero de
// 1905, blando, con orejeras y costuras), 'cuero' (el de cuero de los años veinte, con su barboquejo), 'plastico' (el
// primero de plástico, brillante, con una barra), 'moderno' (carcasa grande con rejilla, raya y respiraderos). col: [sombra,
// base, luz] de la carcasa. funda: la funda acolchada encima (costillas de espuma que siguen la cúpula)
function g_casco(R, cx, yb, s, tipo, dir, col, funda = false) {
  const { pset, linea } = R, W = 8 * s, Hh = 9 * s, b = tipo === 'gorro' ? 0.6 : 0.74, cy0 = tipo === 'gorro' ? 0.36 : 0.3;
  const U = (x) => (x + 0.5 - cx) / W * dir, V = (y) => (yb - y - 0.5) / Hh;
  const dentro = (x, y) => { const u = U(x), v = V(y); if (u * u + ((v - cy0) / b) ** 2 > 1) return false;
    if (v < 0) return false; if (tipo !== 'gorro' && u > 0.38 && v < 0.42) return false; if (tipo === 'gorro' && u > 0.55 && v < 0.5) return false; return true; };
  const conF = (x, y) => funda && V(y) > 0.36 && (U(x) ** 2 + ((V(y) - cy0) / b) ** 2 <= 1.12 ** 2) && !(U(x) > 0.5 && V(y) < 0.5);
  const x0 = Math.floor(cx - W * 1.3), x1 = Math.ceil(cx + W * 1.3), y0 = Math.floor(yb - Hh * 1.3), y1 = Math.ceil(yb + Hh * 0.4);
  // las orejeras de cuero: una solapa redondeada que cuelga sobre la oreja (larga en el arnés, corta en el de cuero),
  // con su pespunte
  if (tipo === 'gorro' || tipo === 'cuero') { const ex = cx - dir * W * 0.08, ew = W * (tipo === 'gorro' ? 0.26 : 0.22), ya = yb - Hh * 0.4, yz = yb + Hh * (tipo === 'gorro' ? 0.36 : 0.12);
    for (let y = Math.round(ya); y <= Math.round(yz); y++) for (let x = Math.round(ex - ew); x <= Math.round(ex + ew); x++) { const dy = Math.max(0, y - (yz - ew)), d = Math.hypot((x - ex) / ew, dy / ew);
      if (d > 1.05) continue; pset(x, y, d > 0.8 || y === Math.round(ya) ? C.k : Math.abs(d - 0.55) < 0.12 && (x + y) % 2 ? col[2] : (x - ex) * dir > 0 ? col[1] : col[0]); } }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (conF(x, y)) { // la funda: costillas por ángulo, cada una con su lomo claro y su surco oscuro
      const borde = !conF(x - 1, y) || !conF(x + 1, y) || !conF(x, y - 1);
      if (borde) { pset(x, y, C.k); continue; }
      const u = U(x), v = V(y) - cy0, a = Math.atan2(v / b, u) / Math.PI * 7, f = a - Math.floor(a), r = Math.hypot(u, v / b);
      pset(x, y, f < 0.18 ? g_C.fundaS : r > 0.98 ? g_C.fundaS : (f < 0.5 && (x - cx) * dir < 0.5 * W) || V(y) > 0.9 ? g_C.fundaL : g_C.funda);
      continue; }
    if (!dentro(x, y)) continue;
    if (!dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1) || !dentro(x, y + 1)) { pset(x, y, C.k); continue; }
    const u = U(x), v = V(y), sx = (x + 0.5 - cx) / W, l = (v - 0.2) * 0.9 - sx * 0.5 + (g_um(x, y) - 0.5) * 0.3;
    let c = l > 0.55 ? col[2] : l > -0.05 ? col[1] : col[0];
    if (tipo === 'gorro' || tipo === 'cuero') { const a = Math.atan2((v - cy0) / b, u) / Math.PI * (tipo === 'gorro' ? 5 : 4); if (Math.abs(a - Math.round(a)) < 0.06 && v > 0.2) c = col[0]; }
    { const r = Math.hypot(u, (v - cy0) / b); if (tipo === 'moderno' && r > 0.8 && r < 0.9 && v > 0.62) c = C.blanco; }
    if (tipo === 'moderno' && v > 0.12 && v < 0.24 && u < 0.3) c = col[0];
    pset(x, y, c); }
  // brillo (la carcasa de plástico brilla más) y el agujero de la oreja
  const bx = Math.round(cx - W * 0.3), by = Math.round(yb - Hh * 0.82);
  if (!funda) { pset(bx, by, C.blanco); if (tipo === 'plastico' || tipo === 'moderno') { pset(bx + 1, by, C.blanco); pset(bx, by + 1, col[2]); pset(bx + 2, by - 1 + (s > 1.2 ? 0 : 1), col[2]); } }
  if (tipo === 'plastico' || tipo === 'moderno') { const ex = Math.round(cx - dir * W * 0.02), ey = Math.round(yb - Hh * 0.28); pset(ex, ey, C.k); if (s > 1.2) { pset(ex + 1, ey, C.k); pset(ex, ey + 1, C.k); pset(ex + 1, ey + 1, col[0]); } }
  if (tipo === 'moderno' && !funda) for (let k = 0; k < 2; k++) pset(Math.round(cx - dir * W * (0.2 + k * 0.22)), Math.round(yb - Hh * 0.92 + k), C.k);
  // la cara: el barboquejo del de cuero, la barra del de plástico, la rejilla del moderno
  const fx = (u) => Math.round(cx + dir * u * W), fy = (v) => Math.round(yb - v * Hh);
  if (tipo === 'cuero') { linea(fx(0.0), fy(0.25), fx(0.55), fy(-0.18), g_C.cartonS); pset(fx(0.0), fy(0.25), g_C.laton); }
  if (tipo === 'gorro') { linea(fx(-0.06), fy(-0.26), fx(0.5), fy(-0.42), g_C.cartonS); }
  if (tipo === 'plastico') { linea(fx(0.36), fy(0.36), fx(1.02), fy(0.2), C.k); linea(fx(0.36), fy(0.3), fx(1.0), fy(0.14), hex('#c8ccd4')); pset(fx(0.38), fy(0.34), C.k); }
  if (tipo === 'moderno') { const g = hex('#d4d8e0'), gs = hex('#8a909c');
    for (const v of [0.4, 0.2, 0.0]) { linea(fx(0.36), fy(v), fx(1.08), fy(v - 0.04), gs); linea(fx(0.36), fy(v) - 1, fx(1.08), fy(v - 0.04) - 1, g); }
    linea(fx(1.08), fy(0.4), fx(1.04), fy(-0.06), g); linea(fx(0.74), fy(0.4), fx(0.72), fy(-0.04), g);
    linea(fx(0.0), fy(0.08), fx(0.5), fy(-0.12), C.k); pset(fx(0.5), fy(-0.12), C.blanco); }
}

// El huevo del gag (exportado: lo dibujan la escena o el decorado). x, y: el punto donde se posa (el centro de su base;
// en la torre, la cara del yunque, y 126). o.funda (true/false): la funda acolchada encima. o.u (0–1): cuelga del imán
// (0), cae acelerando (0,04–0,5), toca (0,5): con funda se aplasta un poco, rebota y se queda entero (brilla); sin funda se
// aplasta de golpe, se agrieta con un zigzag, la tapa se le ladea, suelta un hilillo de yema que hace un charquito y le
// dan vueltas tres estrellitas de mareo (de dibujos animados: es un huevo). o.alto (px, 72): la altura de caída. o.s
// (escala, 1: unos 9 × 12 px). Pinta su sombra en el suelo, que crece al acercarse
export function h_huevo(R, x, y, t, o = {}) {
  const { pset, disco } = R, u = Math.max(0, Math.min(1, o.u ?? 1)), s = o.s ?? 1, alto = o.alto ?? 72, F = !!o.funda;
  const rx0 = 4.6 * s, ry0 = 6.2 * s;
  let dy = 0, sx = 1, sy = 1, roto = false;
  if (u < 0.04) dy = -alto;
  else if (u < 0.5) { const q = (u - 0.04) / 0.46; dy = -alto * (1 - q * q); sy = 1 + 0.08 * q; sx = 1 - 0.05 * q; }
  else if (F) { const q = (u - 0.5) / 0.5;   // con funda: se aplasta, rebota bajito dos veces y se queda
    if (q < 0.08) { const k = Math.sin(q / 0.08 * Math.PI); sx = 1 + 0.16 * k; sy = 1 - 0.18 * k; }
    else if (q < 0.4) { const k = (q - 0.08) / 0.32; dy = -Math.sin(k * Math.PI) * 6 * s; }
    else if (q < 0.55) { const k = (q - 0.4) / 0.15; dy = -Math.sin(k * Math.PI) * 2 * s; }
    else { const k = Math.max(0, 1 - (q - 0.55) / 0.3); sx = 1 + Math.sin(q * 40) * 0.04 * k; sy = 1 - Math.sin(q * 40) * 0.04 * k; } }
  else { const q = (u - 0.5) / 0.5; roto = q > 0.05; if (q < 0.06) { const k = Math.sin(q / 0.06 * Math.PI); sx = 1 + 0.26 * k; sy = 1 - 0.28 * k; } }
  const rx = rx0 * sx, ry = ry0 * sy, by = y + dy, cyy = by - ry;
  // la sombra en el suelo
  const cerca = Math.max(0, 1 - (-dy) / (alto + 1)), rs = Math.round((2 + 3 * cerca) * s);
  for (let i = -rs; i <= rs; i++) if (cerca > 0.15 || (i + Math.round(t * 8)) % 2 === 0) pset(Math.round(x + i), y, C.k);
  // las rayas de velocidad mientras cae deprisa
  if (u > 0.2 && u < 0.5) for (let k = -1; k <= 1; k++) for (let j = 2; j < 10; j += 1) if ((j + k) % 3) pset(Math.round(x + k * 3 * s), Math.round(cyy - ry - j - 1), j < 5 ? g_C.huevoS : g_C.paredS);
  const quiebra = roto ? Math.round(cyy - ry * 0.05) : -999;
  const dentro = (px, py) => { const ddy = (py + 0.5 - cyy) / ry, r = rx * (1 + 0.16 * ddy), ddx = (px + 0.5 - x) / r; return ddx * ddx + ddy * ddy <= 1; };
  const x0 = Math.floor(x - rx * 1.4), x1 = Math.ceil(x + rx * 1.4), y0 = Math.floor(cyy - ry - 1), y1 = Math.ceil(by);
  // el charquito de yema (por detrás del huevo) y el hilillo que baja por la cáscara
  if (roto) { const q = Math.min(1, ((u - 0.5) / 0.5 - 0.05) / 0.35), w = Math.round((2 + 5 * q) * s);
    for (let i = -w; i <= w + 2; i++) { pset(Math.round(x + i + 2), y - 1, Math.abs(i) > w - 1 ? g_C.yemaS : g_C.yema); if (Math.abs(i - 1) < w - 2) pset(Math.round(x + i + 2), y - 2, g_C.yema); }
    pset(Math.round(x + w), y - 2, g_C.yemaL); }
  for (let py = y0; py <= y1; py++) for (let px = x0; px <= x1; px++) {
    let qy = py; if (roto && py < quiebra) qy = py + 1;   // la tapa se levanta un píxel
    const qx = roto && py < quiebra ? px - (py < quiebra - 2 ? 1 : 0) : px;
    if (!dentro(qx, qy)) continue;
    const borde = !dentro(qx - 1, qy) || !dentro(qx + 1, qy) || !dentro(qx, qy - 1) || !dentro(qx, qy + 1);
    if (borde) { pset(px, py, C.k); continue; }
    const nx = (qx + 0.5 - x) / rx, ny = (qy + 0.5 - cyy) / ry, l = -nx * 0.6 - ny * 0.7 + (g_um(px, py) - 0.5) * 0.35;
    pset(px, py, l > 0.55 ? g_C.huevoL : l > -0.2 ? g_C.huevo : l > -0.6 ? g_C.huevoS : g_C.huevoD); }
  if (!F) { pset(Math.round(x - rx * 0.4), Math.round(cyy - ry * 0.5) - (roto ? 1 : 0), C.blanco); pset(Math.round(x - rx * 0.4), Math.round(cyy - ry * 0.5) + 1 - (roto ? 1 : 0), g_C.huevoL); }
  // la grieta en zigzag, el hilillo de yema y las estrellitas de mareo
  if (roto) { for (let px = Math.floor(x - rx); px <= Math.ceil(x + rx); px++) { const zz = quiebra + ((px & 1) ? 0 : -1); if (dentro(px, zz + 1) || dentro(px, zz)) pset(px, zz, C.k); }
    const q = Math.min(1, ((u - 0.5) / 0.5 - 0.05) / 0.3), lg = Math.round(q * (by - quiebra - 1));
    for (let j = 1; j <= lg; j++) pset(Math.round(x + rx * 0.62), quiebra + j, j === lg ? g_C.yemaS : g_C.yema);
    for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.09, ex = Math.round(x + Math.cos(a) * 7 * s), ey = Math.round(cyy - ry - 4 * s + Math.sin(a) * 2);
      const c = Math.sin(a) > 0 ? g_C.yemaL : g_C.pilarL; pset(ex, ey, c); pset(ex - 1, ey, c); pset(ex + 1, ey, c); pset(ex, ey - 1, c); pset(ex, ey + 1, c); } }
  // la funda acolchada: una cofia de costillas de espuma sobre la mitad de arriba, un poco más ancha que la cáscara
  if (F) { const tope = cyy - ry * 0.05;
    const enF = (px, py) => { if (py + 0.5 > tope) return false; const ddy = (py + 0.5 - cyy) / (ry + 1.4), r = (rx + 1.3) * (1 + 0.16 * ddy), ddx = (px + 0.5 - x) / r; return ddx * ddx + ddy * ddy <= 1; };
    for (let py = Math.floor(cyy - ry - 2); py <= Math.ceil(tope); py++) for (let px = Math.floor(x - rx - 3); px <= Math.ceil(x + rx + 3); px++) {
      if (!enF(px, py)) continue;
      if (!enF(px - 1, py) || !enF(px + 1, py) || !enF(px, py - 1) || !enF(px, py + 1)) { pset(px, py, C.k); continue; }
      const k = ((px - Math.round(x)) % 3 + 3) % 3; pset(px, py, k === 0 ? g_C.fundaS : (px < x && py < cyy - ry * 0.5) ? g_C.fundaL : g_C.funda); }
    for (let px = Math.floor(x - rx - 1); px <= Math.ceil(x + rx + 1); px++) if (enF(px, Math.floor(tope) - 1)) pset(px, Math.floor(tope), C.k);
    // al quedarse entero, un brillo de «¡bien!»
    if (u > 0.82) { const f = Math.sin((u - 0.82) * 40); if (f > 0) { const bx = Math.round(x + rx + 3), byy = Math.round(cyy - ry - 1); pset(bx, byy, C.blanco); pset(bx - 1, byy, g_C.yemaL); pset(bx + 1, byy, g_C.yemaL); pset(bx, byy - 1, g_C.yemaL); pset(bx, byy + 1, g_C.yemaL); } } }
}

const g_LANES = [114, 154], g_YUNQUE = 126;

// la parte fija de la sala (se pinta una vez)
function g_torreFija(R) {
  const { rect, pset, linea, disco, poligono } = R, L = g_C;
  // la pared de paneles con juntas, motas, la guarda y el zócalo
  rect(0, 0, 319, 179, L.pared);
  for (let k = 0; k < 220; k++) pset(Math.floor(h(k, 1, 610) * 320), 17 + Math.floor(h(k, 2, 610) * 116), h(k, 3, 610) < 0.5 ? L.paredS : L.paredL);
  for (let x = 36; x < 320; x += 40) { rect(x, 17, x, 132, L.junta); rect(x + 1, 17, x + 1, 132, L.paredL); }
  for (let y = 17; y < 133; y++) if (y % 2 === 0) { pset(0, y, L.paredS); }
  rect(0, 92, 319, 95, L.cornisa); rect(0, 92, 319, 92, L.paredL); rect(0, 95, 319, 95, L.junta);
  rect(0, 133, 319, 139, L.zocalo); rect(0, 133, 319, 133, L.zocaloL);
  // el techo de placas con sus perfiles, los plafones y los rociadores
  rect(0, 0, 319, 13, L.techo); for (let x = 4; x < 320; x += 30) rect(x, 0, x, 13, L.techoS); rect(0, 6, 319, 6, L.techoS);
  for (let k = 0; k < 60; k++) pset(Math.floor(h(k, 4, 610) * 320), Math.floor(h(k, 5, 610) * 13), L.techoS);
  rect(0, 14, 319, 16, L.cornisa); rect(0, 14, 319, 14, L.paredL); rect(0, 16, 319, 16, L.junta);
  for (const x of [12, 196, 262]) { rect(x - 1, 12, x + 1, 13, L.aceroS); pset(x, 11, L.aceroD); }
  // la rejilla de ventilación en la pared y el termostato
  rect(42, 22, 66, 30, C.k); rect(43, 23, 65, 29, L.aceroL); for (let y = 24; y < 29; y += 2) rect(44, y, 64, y, L.aceroS);
  rect(240, 64, 246, 72, C.k); rect(241, 65, 245, 71, L.mesaL); rect(242, 66, 244, 67, L.monitorR);

  // la estantería de acero (x 2–78): montantes perforados, cuatro baldas con cascos de equipos inventados, cajas, espuma
  for (const x of [3, 75]) { rect(x, 30, x + 3, 139, L.estanteS); rect(x, 30, x + 1, 139, L.estante); for (let y = 33; y < 138; y += 4) pset(x + 2, y, C.k); }
  const BAL = [56, 82, 108, 132];
  for (const y of BAL) { rect(2, y, 79, y + 3, C.k); rect(3, y, 78, y + 1, L.estanteL); rect(3, y + 2, 78, y + 2, L.estante); rect(4, y + 4, 77, y + 5, L.paredS); }
  rect(2, 30, 79, 31, L.estanteS);
  const EQ = [[hex('#146464'), hex('#1e8a8a'), hex('#5ac0b8')], [hex('#641e2a'), hex('#8a2a3a'), hex('#c25a68')], [hex('#a8761a'), hex('#d8a02a'), hex('#f0d070')], [hex('#c4c8d0'), hex('#eceef2'), hex('#ffffff')], [hex('#1e2a4e'), hex('#2e3e6e'), hex('#5a6ea8')]];
  [[14, 56, 0, 1, false], [36, 56, 3, -1, true], [60, 56, 1, 1, false], [16, 82, 4, 1, true], [40, 82, 2, -1, false], [64, 82, 0, -1, true]].forEach(([x, y, k, d, f]) => g_casco(R, x, y, 1, 'moderno', d, EQ[k], f));
  // la balda de abajo: cajas de cartón con sus etiquetas de barras, y bloques de espuma de colores
  for (const [x0, x1, alto] of [[6, 26, 16], [28, 44, 12]]) { rect(x0, 108 - alto, x1, 107, C.k); rect(x0 + 1, 109 - alto, x1 - 1, 107, L.carton); rect(x0 + 1, 109 - alto, x1 - 1, 109 - alto, L.cartonL); rect(x1 - 2, 109 - alto, x1 - 1, 107, L.cartonS);
    rect(Math.round((x0 + x1) / 2) - 1, 109 - alto, Math.round((x0 + x1) / 2), 111 - alto, L.cartonS); rect(x0 + 3, 103 - alto + 10, x0 + 9, 106 - alto + 10, C.blanco); for (let x = x0 + 4; x < x0 + 9; x += 2) rect(x, 104 - alto + 10, x, 105 - alto + 10, C.k); }
  for (const [x0, y0, x1, c, cs] of [[48, 96, 62, L.espuma, L.espumaS], [52, 88, 60, L.espumaA, L.espumaAS], [64, 100, 76, L.espumaA, L.espumaAS]]) {
    rect(x0, y0, x1, 107, C.k); rect(x0 + 1, y0 + 1, x1 - 1, 107, c); for (let y = y0 + 2; y < 107; y += 2) for (let x = x0 + 1 + (y % 4 ? 1 : 0); x < x1; x += 3) pset(x, y, cs); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, C.blanco); }
  // abajo del todo: una caja de huevos abierta (la reserva para el ensayo) y un rollo de cinta
  rect(8, 124, 40, 131, C.k); rect(9, 125, 39, 131, hex('#c8bca0')); for (let k = 0; k < 6; k++) { disco(12 + k * 5, 125, 2, g_C.huevo); pset(11 + k * 5, 124, g_C.huevoL); pset(13 + k * 5, 126, g_C.huevoS); }
  for (let x = 10; x < 39; x += 5) rect(x, 128, x + 2, 130, hex('#a89c80'));
  disco(58, 127, 4, C.k); disco(58, 127, 3, L.pilar); disco(58, 127, 1, C.k);

  // el foco de estudio (panel de luz) en su pie, a la izquierda de la torre, que alumbra las calles
  rect(80, 38, 82, 152, L.aceroD); rect(80, 38, 80, 152, L.aceroS); linea(81, 152, 76, 158, L.aceroD); linea(81, 152, 87, 158, L.aceroD); linea(81, 152, 81, 159, L.aceroD);
  rect(76, 26, 88, 44, C.k); rect(77, 27, 87, 43, hex('#fffce8')); for (let y = 28; y < 43; y += 3) rect(78, y, 86, y, hex('#f0e8c0')); rect(87, 27, 87, 43, L.aceroS);

  // la torre de caídas doble: el zócalo de hormigón, los pilares amarillos, la viga y el cabrestante
  rect(84, 132, 182, 140, C.k); rect(85, 133, 181, 140, L.hormigon); rect(85, 133, 181, 133, L.hormigonL);
  for (let k = 0; k < 40; k++) pset(86 + Math.floor(h(k, 6, 610) * 95), 134 + Math.floor(h(k, 7, 610) * 6), L.hormigonS);
  for (const x of [87, 179]) { rect(x - 1, 135, x + 1, 137, L.aceroD); pset(x, 135, L.aceroL); }
  for (const [x0, x1] of [[88, 93], [131, 135], [175, 180]]) { rect(x0, 22, x1, 132, C.k); rect(x0 + 1, 22, x1 - 1, 131, L.pilar); rect(x0 + 1, 22, x0 + 1, 131, L.pilarL); rect(x1 - 1, 22, x1 - 1, 131, L.pilarS);
    for (let y = 30; y < 130; y += 18) { pset(x0 + 2, y, C.k); pset(x1 - 2, y, C.k); } }
  rect(86, 20, 182, 26, C.k); rect(87, 21, 181, 25, L.pilar); rect(87, 21, 181, 21, L.pilarL); rect(87, 25, 181, 25, L.pilarS);
  for (let x = 92; x < 180; x += 10) pset(x, 23, L.pilarS);
  // el motor del cabrestante sobre la viga (a la izquierda, lejos de la cifra del año), con su polea y el cable
  rect(96, 15, 118, 20, C.k); rect(97, 16, 117, 19, L.aceroS); rect(97, 16, 117, 16, L.aceroL); disco(102, 18, 2, L.aceroD); disco(112, 18, 2, L.aceroD); linea(114, 20, 114, 26, C.k); linea(118, 18, 154, 21, C.k);
  // la regla roja del pilar central, con las marcas cada 8 px
  for (let y = 30; y < 126; y += 4) rect(y % 8 ? 132 : 131, y, y % 8 ? 133 : 135, y, y % 16 ? L.regla : C.k);
  // las dos calles: las guías de acero, el carro con el electroimán y su cable, y el yunque con la célula de carga
  for (const lx of g_LANES) {
    for (const gx of [lx - 9, lx + 9]) { rect(gx, 26, gx + 1, 126, L.aceroS); rect(gx, 26, gx, 126, L.aceroL); for (let y = 40; y < 126; y += 22) { rect(gx - 1, y, gx + 2, y + 1, L.aceroD); } }
    rect(lx, 26, lx, 33, L.aceroD);
    rect(lx - 11, 33, lx + 11, 36, C.k); rect(lx - 10, 34, lx + 10, 35, L.acero); rect(lx - 10, 34, lx + 10, 34, L.aceroL);
    rect(lx - 5, 36, lx + 5, 42, C.k); rect(lx - 4, 37, lx + 4, 41, L.aceroD); rect(lx - 4, 37, lx + 4, 37, L.aceroS); rect(lx - 2, 41, lx + 2, 41, hex('#c83a3a'));
    linea(lx + 6, 34, lx + 8, 28, C.k); linea(lx + 8, 28, lx + 8, 26, C.k);
    rect(lx - 11, 126, lx + 11, 132, C.k); rect(lx - 10, 126, lx + 10, 128, L.aceroL); rect(lx - 10, 126, lx + 10, 126, C.blanco); rect(lx - 10, 129, lx + 10, 131, L.acero);
    rect(lx - 4, 129, lx + 4, 131, L.aceroD); pset(lx - 3, 130, L.aceroL);
    // la sombra de la calle en el yunque y los cables que bajan al canal del suelo
    linea(lx + 10, 131, lx + 14, 140, C.k); }
  // la baliza en el pilar derecho (la luz la pone cada fotograma)
  rect(181, 28, 185, 30, L.aceroD);
  // el suelo de resina: juntas en perspectiva, brillos y reflejos de la torre, la cinta de seguridad y el canal de cables
  rect(0, 140, 319, 179, L.suelo); rect(0, 140, 319, 141, L.sueloS);
  for (const y of [148, 159, 173]) rect(0, y, 319, y, L.sueloJ);
  for (let k = -6; k <= 16; k++) { const xa = k * 28; linea(xa, 142, Math.round(160 + (xa - 160) * 1.9), 179, L.sueloJ); }
  for (let k = 0; k < 160; k++) pset(Math.floor(h(k, 8, 610) * 320), 142 + Math.floor(h(k, 9, 610) * 38), h(k, 10, 610) < 0.5 ? L.sueloS : L.sueloL);
  for (const y of [143, 145, 148]) { for (let x = 88; x < 94; x++) if ((x + y) % 2) pset(x, y, L.pilarS); for (let x = 175; x < 181; x++) if ((x + y) % 2) pset(x, y, L.pilarS); for (let x = 131; x < 136; x++) if ((x + y) % 2) pset(x, y, L.pilarS); }
  for (let y = 142; y <= 144; y++) for (let x = 84; x <= 183; x++) pset(x, y, ((x + y) >> 2) % 2 ? hex('#e8c040') : C.k);
  for (const [x, y, w] of [[196, 156, 30], [20, 162, 26], [240, 168, 34], [110, 164, 22], [48, 152, 18]]) { rect(x, y, x + w, y, L.brillo); rect(x + 4, y + 2, x + w - 6, y + 2, L.brillo); }
  rect(150, 149, 236, 152, C.k); rect(151, 150, 235, 151, hex('#d8b030')); for (let x = 153; x < 235; x += 4) pset(x, 150, C.k);

  // la ventana a la nave de impactos (lo de dentro lo pone cada fotograma): el marco y el alféizar
  rect(186, 22, 272, 54, C.k); rect(187, 23, 271, 53, L.aceroL); rect(184, 54, 274, 56, C.k); rect(185, 54, 273, 55, L.mesaL);
  // la mesa: el tablero, el faldón, las patas, el rack de adquisición, el teclado y el ratón
  rect(184, 104, 276, 108, C.k); rect(185, 104, 275, 106, L.mesa); rect(185, 104, 275, 104, L.mesaL); rect(185, 107, 275, 107, L.mesaS);
  for (const x of [188, 271]) { rect(x - 1, 108, x + 1, 139, C.k); rect(x, 108, x, 139, L.pata); }
  rect(232, 112, 266, 139, C.k); rect(233, 113, 265, 138, hex('#2a313c')); for (const y of [118, 126, 134]) { rect(233, y, 265, y, C.k); rect(233, y + 1, 265, y + 1, hex('#3a4250')); }
  for (let y = 114; y < 118; y++) for (let x = 236; x < 252; x += 2) pset(x, y, hex('#1a2028'));
  rect(196, 100, 226, 103, C.k); rect(197, 100, 225, 102, hex('#d8dce4')); for (let x = 198; x < 225; x += 2) pset(x, 101, hex('#9aa0ac'));
  rect(230, 101, 234, 103, C.k); pset(231, 101, C.blanco);
  // el monitor grande en su brazo y el pequeño de la cámara (lo de dentro, cada fotograma)
  rect(214, 96, 218, 103, C.k); rect(215, 96, 217, 103, L.aceroS); rect(208, 102, 224, 103, L.aceroD);
  rect(188, 58, 244, 97, C.k); rect(189, 59, 243, 96, hex('#262c36')); rect(189, 59, 243, 59, hex('#4a5260'));
  rect(254, 82, 258, 103, C.k); rect(255, 82, 257, 103, L.aceroS); rect(250, 102, 262, 103, L.aceroD);
  rect(246, 66, 274, 86, C.k); rect(247, 67, 273, 85, hex('#262c36'));
  // la taza en la mesa
  rect(277, 98, 282, 103, C.k);
  // la puerta del fondo a la derecha: marco, hoja con su ojo de buey, la manilla, la placa de empuje y el pictograma de salida
  rect(280, 52, 318, 139, C.k); rect(281, 53, 317, 139, L.aceroL); rect(284, 56, 314, 139, L.puerta); rect(284, 56, 314, 56, L.puertaL); rect(313, 57, 314, 139, L.puertaS);
  for (let y = 100; y < 136; y += 6) rect(286, y, 311, y, L.puertaS);
  disco(299, 74, 9, C.k); disco(299, 74, 8, L.aceroL); disco(299, 74, 7, C.k);
  rect(285, 96, 293, 99, C.k); rect(286, 97, 292, 98, L.aceroL); rect(310, 97, 312, 108, C.k); pset(311, 98, C.blanco);
  rect(290, 45, 308, 50, C.k); rect(291, 46, 307, 49, L.salida); rect(293, 47, 294, 48, C.blanco); linea(295, 48, 297, 47, C.blanco); rect(302, 47, 305, 47, C.blanco); pset(304, 46, C.blanco); pset(304, 48, C.blanco);
  // el trípode de la cámara rápida, delante de la mesa, a la altura de los yunques
  linea(192, 118, 183, 157, C.k); linea(192, 118, 201, 157, C.k); linea(192, 118, 192, 159, C.k); linea(193, 118, 202, 157, L.aceroS); linea(186, 140, 198, 140, L.aceroD);
  rect(189, 117, 195, 119, C.k);
  // el reloj de pared sobre la estantería (las agujas, cada fotograma)
  disco(20, 23, 6, C.k); disco(20, 23, 5, C.blanco); for (let k = 0; k < 12; k++) pset(Math.round(20 + Math.cos(k * Math.PI / 6) * 4), Math.round(23 + Math.sin(k * Math.PI / 6) * 4), k % 3 ? L.paredS : C.k);
  // los pictogramas de seguridad en la puerta, bajo el ojo de buey: gafas obligatorias y peligro de caída de objetos
  rect(287, 84, 297, 94, C.k); rect(288, 85, 296, 93, hex('#2a5aa8')); rect(289, 88, 295, 90, C.blanco); pset(292, 89, hex('#2a5aa8')); pset(290, 89, C.k); pset(294, 89, C.k);
  R.poligono([[299, 94.5], [304.5, 83.5], [310, 94.5]], C.k); R.poligono([[300.6, 93.5], [304.5, 85.8], [308.4, 93.5]], hex('#e8c040')); rect(304, 88, 304, 91, C.k); pset(304, 93, C.k);
}

function g_torre(R, t, o) {
  const { rect, pset, linea, disco } = R, L = g_C;
  g_fijo(R, 'casco-torre', () => g_torreFija(R));
  const u = o.u, cur = Math.max(0, Math.min(1, o.curva ?? (u == null ? 1 : (u - 0.48) / 0.4)));
  // los plafones del techo (uno parpadea a ratos) y su luz tramada
  for (const [x0, x1, k] of [[26, 72, 0], [186, 236, 1]]) { const on = !(k && (t % 6.7) < 0.22 && Math.sin(t * 60) > -0.2);
    rect(x0, 1, x1, 6, C.k); rect(x0 + 1, 2, x1 - 1, 5, on ? C.blanco : L.techoS); for (let x = x0 + 5; x < x1; x += 5) rect(x, 2, x, 5, on ? hex('#e8eef4') : L.techo);
    if (on) for (let y = 7; y < 14; y++) for (let x = x0 - (y - 7); x <= x1 + (y - 7); x++) if ((x + y) % 4 === 0) pset(x, y, hex('#f4f6f8')); }
  // la cinta de la rejilla, que ondea con el aire
  for (let i = 0; i < 6; i++) pset(Math.round(60 + Math.sin(t * 8 + i * 0.8) * i * 0.5), 31 + i, i % 2 ? hex('#8e2424') : hex('#c83a3a'));
  // la luz del foco sobre las calles (tramada, que respira un poco)
  for (let y = 30; y < 126; y += 2) for (let x = 96 + ((y >> 1) & 1); x < 172; x += 6) if (h(x, y, 611) < 0.35 + Math.sin(t * 1.3) * 0.04) pset(x, y, x > 130 && x < 136 ? L.pilarL : L.paredL);
  // la nave de impactos tras la ventana: plafones, la pared del fondo, el banco del péndulo; el péndulo golpea el casco
  R.recorte([188, 24, 270, 52]);
  for (let y = 24; y <= 52; y++) for (let x = 188; x <= 270; x++) pset(x, y, y < 28 ? L.naveL : (y > 45 ? L.naveS : ((x >> 3) + (y >> 4)) % 2 ? L.nave : hex('#343c4a')));
  for (const x of [196, 230, 262]) { R.linea(x, 25, x + 12, 25, hex('#e8eef4')); }
  for (let x = 188; x <= 270; x++) pset(x, 46, L.naveL);
  { const px = 214, py = 27, ciclo = t % 3.6, ang = -0.9 * Math.abs(Math.cos(Math.PI * ciclo / 3.6)), ex = Math.round(px + Math.sin(ang) * 14), ey = Math.round(py + Math.cos(ang) * 14);
    R.linea(px - 6, 26, px + 6, 26, hex('#d8a02a')); R.linea(px, py, ex, ey, hex('#c4ccd8')); R.disco(ex, ey, 3, C.k); R.disco(ex, ey, 2, hex('#8c96a4'));
    // el casco montado que recibe el golpe, en su soporte
    R.linea(px + 7, 46, px + 7, 40, hex('#5c6676')); g_casco(R, px + 6, 40, 0.7, 'moderno', -1, [hex('#641e2a'), hex('#8a2a3a'), hex('#c25a68')]);
    if (Math.abs(ciclo - 1.8) < 0.15) for (let k = 0; k < 4; k++) R.pset(px + 2 + (k % 2) * 2, 35 + k * 2, C.blanco); }
  // un técnico pequeño al fondo de la nave, que anota en su tablilla
  { const tx = 252 + Math.round(Math.sin(t * 0.4) * 6), b = Math.floor(t * 2) % 2; R.rect(tx - 1, 38, tx + 1, 44, hex('#f2f2f6')); R.rect(tx - 1, 35, tx + 1, 37, hex('#e0b090')); R.pset(tx, 34, hex('#3a2a1e')); R.pset(tx - 1, 45, hex('#2a2430')); R.pset(tx + 1, 45 - b, hex('#2a2430')); R.pset(tx - 2, 40, hex('#c8a060')); }
  R.recorte(null);
  // el cristal de la ventana: el montante, las vetas de reflejo y un brillo que pasa despacio
  rect(229, 23, 229, 53, L.aceroL);
  for (const d of [192, 238]) for (let i = 0; i < 28; i++) if (i % 3) pset(d + Math.round(i * 0.5), 52 - i, L.reflejo);
  { const sx = 180 + Math.round((t * 18) % 140); for (let i = 0; i < 28; i++) for (let w = 0; w < 3; w++) { const x = sx + w + Math.round(i * 0.5); if (x > 187 && x < 271 && x !== 229) pset(x, 52 - i, hex('#c8dcea')); } }
  // la baliza de la torre: ámbar que parpadea mientras los huevos están arriba; verde cuando ya han caído
  { const arriba = u != null && u < 0.5, on = arriba ? Math.sin(t * 10) > 0 : true;
    disco(183, 27, 2, C.k); disco(183, 27, 1, arriba ? (on ? hex('#f0b030') : hex('#7a5a2a')) : hex('#5ad06a')); if (arriba && on) { pset(186, 25, hex('#f0d080')); pset(186, 29, hex('#f0d080')); } }
  // la cámara rápida en la cabeza del trípode: cuerpo, parasol y objetivo hacia los yunques, el visor de atrás y el
  // piloto rojo de grabación
  rect(184, 107, 201, 117, C.k); rect(185, 108, 200, 116, hex('#2a313c')); rect(185, 108, 200, 108, hex('#4a5260')); rect(185, 116, 200, 116, hex('#1a2028'));
  rect(177, 109, 184, 115, C.k); rect(178, 110, 183, 114, hex('#4a5262')); rect(178, 110, 183, 110, hex('#6a7484')); pset(178, 112, hex('#8ac0e0')); pset(179, 111, C.blanco);
  rect(193, 110, 199, 114, hex('#1a2028')); for (let i = 0; i < 4; i++) pset(194 + i, 113 - (Math.floor(t * 9 + i) % 3), hex('#5ac0e0'));
  pset(188, 110, Math.floor(t * 2) % 2 ? hex('#e83a3a') : hex('#5a2a2a')); rect(186, 105, 191, 106, C.k);
  // el reloj de pared: el minutero da la vuelta despacio
  { const a = t * 0.1 - 1.2, b = t * 0.008 + 0.6; linea(20, 23, Math.round(20 + Math.cos(a) * 4), Math.round(23 + Math.sin(a) * 4), C.k); linea(20, 23, Math.round(20 + Math.cos(b) * 3), Math.round(23 + Math.sin(b) * 3), C.k); pset(20, 23, hex('#c83a3a')); }
  // las barreras de luz de cada calle (miden la velocidad de llegada): sus cajitas en las guías y el haz rojo
  for (const lx of g_LANES) { for (const gx of [lx - 11, lx + 10]) { rect(gx, 109, gx + 2, 114, C.k); pset(gx + 1, 111, Math.floor(t * 3 + lx) % 2 ? hex('#e83a3a') : hex('#7a2a2a')); }
    for (let x = lx - 8; x <= lx + 9; x++) if ((x + Math.floor(t * 20)) % 3 === 0) pset(x, 112, hex('#ff6a5a')); }
  // los huevos, si el decorado los pone
  if (u != null) { h_huevo(R, g_LANES[0], g_YUNQUE, t, { u, funda: false, alto: o.alto ?? 72 }); h_huevo(R, g_LANES[1], g_YUNQUE, t, { u, funda: true, alto: o.alto ?? 72 }); }
  // el monitor grande: la rejilla, los ejes, la curva roja (sin funda: alta y estrecha) y la verde (con funda: baja y
  // ancha), las líneas de pico y la flecha que baja entre las dos; el cursor recorre la pantalla
  { const X0 = 192, Y0 = 92, W = 48, Hh = 30;
    for (let x = X0; x <= X0 + W; x += 8) for (let y = Y0 - Hh; y <= Y0; y += 2) pset(x, y, L.cursor);
    for (let y = Y0 - Hh; y <= Y0; y += 6) for (let x = X0; x <= X0 + W; x += 2) pset(x, y, L.cursor);
    linea(X0, Y0, X0 + W, Y0, hex('#8a9aac')); linea(X0, Y0, X0, Y0 - Hh, hex('#8a9aac'));
    const n = Math.round(W * cur);
    let pa = null, pb = null;
    for (let i = 0; i <= n; i++) { const xx = X0 + i, ya = Y0 - Math.round(27 * Math.exp(-(((i - 18) / 3.2) ** 2))), yb2 = Y0 - Math.round(12 * Math.exp(-(((i - 22) / 7.5) ** 2)));
      if (pb) linea(pb[0], pb[1], xx, yb2, L.verdeC); if (pa) linea(pa[0], pa[1], xx, ya, L.rojoC); pa = [xx, ya]; pb = [xx, yb2]; }
    if (cur > 0.6) { for (let x = X0 + 1; x < X0 + W; x += 2) { pset(x, Y0 - 27, hex('#7a3a3a')); pset(x, Y0 - 12, hex('#2a6a60')); }
      const ay = Y0 - 25 + (Math.floor(t * 3) % 3); linea(X0 + 36, Y0 - 25, X0 + 36, Y0 - 15, C.blanco); pset(X0 + 35, ay + 7, C.blanco); pset(X0 + 37, ay + 7, C.blanco); }
    if (cur >= 1) { const cx = X0 + Math.floor((t * 12) % W); for (let y = Y0 - Hh; y < Y0; y += 1) if (y % 2) pset(cx, y, hex('#3a5a78')); }
    for (let i = 0; i < 6; i++) pset(X0 + 40 + i, Y0 - Hh + 1 + i, hex('#3a4a5e')); }
  // el monitor pequeño: lo que ve la cámara (las dos calles con sus huevos) y el contador de fotogramas
  { R.recorte([248, 68, 272, 84]); for (let y = 68; y <= 84; y++) for (let x = 248; x <= 272; x++) pset(x, y, (x + y) % 5 ? hex('#3a4656') : hex('#465466'));
    linea(252, 82, 268, 82, hex('#c4ccd8')); for (const xx of [255, 265]) { linea(xx - 3, 70, xx - 3, 82, hex('#d8a02a')); }
    const q = u == null ? 1 : Math.min(1, u / 0.5), yy = Math.round(72 + 8 * q * q);
    for (const [xx, f] of [[258, false], [263, true]]) { pset(xx, yy, hex('#f2e6cc')); pset(xx, yy - 1, f ? hex('#6a7e96') : hex('#f2e6cc')); pset(xx + 1, yy, hex('#d4c09a')); }
    R.recorte(null); pset(249, 69, Math.floor(t * 2) % 2 ? hex('#e83a3a') : hex('#3a4656')); g_cifras(R, String(Math.floor(t * 31) % 1000).padStart(3, '0'), 262, 69, hex('#5ad06a')); }
  // el rack de adquisición: luces que parpadean y la barra del nivel
  for (let k = 0; k < 6; k++) pset(254 + k * 2, 115, Math.floor(t * (2 + k * 0.7) + k) % 3 === 0 ? hex('#5ad06a') : hex('#2a4a2a'));
  for (let k = 0; k < 2; k++) { const w = Math.round(8 + 6 * Math.abs(Math.sin(t * (1.7 + k)))); rect(236, 121 + k * 8, 236 + w, 122 + k * 8, k ? hex('#3ac8b0') : hex('#e8c040')); rect(237 + w, 121 + k * 8, 252, 122 + k * 8, hex('#1a2028')); pset(262, 121 + k * 8, Math.floor(t * 4 + k) % 2 ? hex('#e83a3a') : hex('#4a2a2a')); }
  // la taza (el café humea)
  rect(278, 99, 281, 103, hex('#e8e2d6')); rect(278, 99, 281, 99, hex('#5e3a1e')); pset(282, 100, C.k); pset(283, 101, C.k); pset(282, 102, C.k);
  for (let k = 0; k < 4; k++) { const q = (t * 0.6 + k / 4) % 1, yy = Math.round(97 - q * 10), xx = Math.round(279 + Math.sin(t * 2 + k * 1.7) * 1.5 + q * 1.5); if (q < 0.85) pset(xx, yy, q < 0.5 ? hex('#f4f6f8') : hex('#dce2e8')); }
  // el ojo de buey de la puerta: el pasillo iluminado y alguien que pasa de vez en cuando
  { R.recorte([292, 67, 306, 81]); R.disco(299, 74, 6, L.pasillo); for (let y = 67; y <= 81; y++) { pset(292 + ((y * 3) % 14), y, hex('#d8d2bc')); } R.linea(292, 78, 306, 78, hex('#c8c0a8'));
    const q = (t % 9) / 2.2; if (q < 1) { const px = Math.round(288 + q * 24); for (let y = 72; y <= 81; y++) R.linea(px - 2, y, px + 2, y, y < 74 ? hex('#e0b090') : hex('#3a5a8a')); R.linea(px - 2, 71, px + 2, 71, hex('#3a2a1e')); }
    R.recorte(null); for (let i = 0; i < 4; i++) pset(295 + i, 70 + i, hex('#f8f4e8')); }
}

const g_PEANAS = [60, 106, 152, 198, 244];

const g_HISTORIA = [['gorro', 1905, false], ['cuero', 1925, false], ['plastico', 1943, false], ['moderno', 1990, false], ['moderno', 2022, true]];

function g_vitrinaFija(R, años) {
  const { rect, pset, linea, disco } = R, L = g_C;
  // la pared de tela oscura con su trama vertical, el techo y el carril de los focos
  rect(0, 0, 319, 179, L.muro);
  for (let y = 15; y < 150; y++) for (let x = (y * 7) % 3; x < 320; x += 3) if (h(x, y, 620) < 0.55) pset(x, y, L.muroS);
  for (let k = 0; k < 140; k++) pset(Math.floor(h(k, 1, 620) * 320), 15 + Math.floor(h(k, 2, 620) * 135), L.muroL);
  rect(0, 0, 319, 11, hex('#1a222c')); for (let x = 10; x < 320; x += 24) rect(x, 0, x, 11, hex('#222c38')); rect(0, 12, 319, 13, hex('#3a4656')); rect(0, 14, 319, 14, C.k);
  // las molduras y el zócalo de la sala
  rect(0, 146, 319, 150, L.nogalS); rect(0, 146, 319, 146, L.nogalL);
  // a la izquierda: el cuadro con la foto de época (siluetas de un equipo con su balón) y el pie con la pantalla
  rect(2, 38, 24, 68, L.laton); rect(3, 39, 23, 67, L.latonS); rect(5, 41, 21, 65, hex('#d8c8a0'));
  for (let y = 41; y <= 65; y++) for (let x = 5; x <= 21; x++) if (h(x, y, 621) < 0.25) pset(x, y, hex('#c8b48a'));
  for (const [x, y] of [[8, 52], [12, 51], [16, 52], [10, 58], [14, 58], [18, 58]]) { rect(x - 1, y, x + 1, y + 4, hex('#5a4630')); pset(x, y - 1, hex('#5a4630')); }
  disco(13, 61, 1, hex('#8a6a44'));
  rect(10, 104, 14, 146, C.k); rect(11, 104, 13, 146, L.aceroS); rect(6, 144, 18, 146, C.k);
  rect(2, 84, 22, 104, C.k); rect(3, 85, 21, 103, hex('#1a222c'));
  // la vitrina: el remate de nogal con su tira de luz, los costados, el fondo de lino, el suelo interior y las peanas
  rect(26, 20, 270, 28, C.k); rect(27, 21, 269, 27, L.nogal); rect(27, 21, 269, 21, L.nogalL); rect(27, 27, 269, 27, L.nogalS);
  for (let x = 30; x < 268; x += 3) pset(x, 24, L.nogalS);
  rect(26, 28, 270, 124, C.k);
  for (let y = 29; y < 112; y++) for (let x = 30; x < 267; x++) { // el lino del fondo, más claro cerca de cada foco
    let l = 0.15 + (112 - y) / 83 * 0.15; for (const px of g_PEANAS) { const d = Math.hypot((x - px) / 22, (y - 60) / 46); if (d < 1) l += (1 - d) * 0.75; }
    l += (h(x >> 1, y, 622) - 0.5) * 0.15 + ((x + y * 2) % 5 === 0 ? -0.08 : 0);
    pset(x, y, l + (g_um(x, y) - 0.5) * 0.25 > 0.6 ? L.fondoVL : l + (g_um(x, y) - 0.5) * 0.25 > 0.3 ? L.fondoV : L.fondoVS); }
  rect(28, 29, 29, 123, L.nogalS); rect(267, 29, 268, 123, L.nogalS);
  rect(30, 29, 266, 30, hex('#fff6d8')); for (let x = 30; x < 267; x += 2) pset(x, 31, hex('#f0e2b8'));
  for (let y = 112; y <= 122; y++) for (let x = 30; x < 267; x++) pset(x, y, y === 112 ? L.fondoVS : ((x + y) % 4 === 0 && y > 114) ? hex('#d8caa8') : hex('#e2d6ba'));
  // las peanas: cara de arriba clara, frente con su sombra y la sombra que dejan en el suelo de la vitrina
  for (const px of g_PEANAS) { rect(px - 12, 117, px + 13, 119, hex('#c8baa0'));
    rect(px - 11, 97, px + 11, 118, C.k); rect(px - 10, 98, px + 10, 117, L.peana); rect(px - 10, 97, px + 10, 99, C.blanco); rect(px + 7, 100, px + 10, 117, L.peanaS); rect(px - 10, 100, px - 10, 117, hex('#f8f6f2')); }
  // los cascos, del arnés de cuero a la funda acolchada
  const COLS = [[hex('#5e3a1e'), hex('#8a5a30'), hex('#b07a44')], [hex('#4e2e16'), hex('#7a4a24'), hex('#a8743c')], [hex('#641e2a'), hex('#8a2a3a'), hex('#c25a68')], [hex('#146464'), hex('#1e8a8a'), hex('#5ac0b8')], [hex('#c4c8d0'), hex('#eceef2'), hex('#ffffff')]];
  g_HISTORIA.forEach(([tipo, , f], i) => { const px = g_PEANAS[i]; rect(px - 4, 95, px + 3, 97, C.k); rect(px - 3, 95, px + 2, 96, hex('#3a3a44')); rect(px - 2, 86, px + 1, 95, C.k); rect(px - 1, 86, px, 95, hex('#4a4a56'));
    g_casco(R, px - 2, 89, 1.7, tipo, 1, COLS[i], f); });
  // la línea del tiempo dorada en el borde del suelo interior, con un punto por casco y la flecha al final
  rect(36, 121, 258, 121, L.laton); rect(36, 122, 258, 122, L.latonS);
  for (const px of g_PEANAS) { disco(px, 121, 2, C.k); disco(px, 121, 1, L.laton); }
  linea(258, 118, 262, 121, L.laton); linea(258, 124, 262, 121, L.laton);
  // los reflejos fijos del cristal y el montante del centro
  rect(148, 29, 148, 123, hex('#a8b4c0'));
  for (const d of [40, 86, 176, 222]) for (let i = 0; i < 80; i++) if ((i % 9) < 6) { pset(d + Math.round(i * 0.35), 110 - i, hex('#f8f4ea')); if (i % 2) pset(d + 2 + Math.round(i * 0.35), 110 - i, hex('#f0ead8')); }
  // el mueble de nogal: los paneles con sus vetas, las placas de latón con los años (o sin ellos)
  rect(24, 124, 272, 146, C.k); rect(25, 125, 271, 145, L.nogal); rect(25, 125, 271, 126, L.nogalL);
  for (let y = 127; y < 145; y++) for (let x = 25; x < 272; x++) if (Math.sin(x * 0.11 + y * 0.9 + Math.sin(x * 0.05) * 3) > 0.82) pset(x, y, L.nogalS);
  for (let x = 72; x < 260; x += 46) rect(x + 11, 128, x + 11, 143, L.nogalS);
  g_PEANAS.forEach((px, i) => { rect(px - 11, 129, px + 11, 137, C.k); rect(px - 10, 130, px + 10, 136, L.laton); rect(px - 10, 130, px + 10, 130, hex('#f0d070')); rect(px - 10, 136, px + 10, 136, L.latonS);
    if (años) g_cifras(R, g_HISTORIA[i][1], px - 7, 131, hex('#4a3410')); else rect(px - 6, 133, px + 6, 133, L.latonS); });
  rect(24, 145, 272, 146, L.nogalS);
  // a la derecha: el paso al pasillo (lo de dentro, cada fotograma), con su jamba
  rect(278, 54, 318, 150, C.k); rect(279, 55, 317, 56, L.nogalL);
  // el suelo pulido de tablas oscuras, con el reflejo cálido de la vitrina y los charcos de luz
  rect(0, 151, 319, 179, L.sueloV);
  for (let y = 151; y < 180; y++) { const off = (Math.floor(y / 5) * 37) % 60; for (let x = 0; x < 320; x++) { if (y % 5 === 0) pset(x, y, hex('#2c201c')); else if ((x + off) % 60 === 0) pset(x, y, hex('#2c201c')); else if (h(x >> 2, y, 623) < 0.18) pset(x, y, L.sueloVL); } }
  for (let y = 152; y < 174; y++) if (y % 2 === 0) for (let x = 30; x < 267; x++) if (h(x >> 3, y, 625) < 0.62 - (y - 152) * 0.026) pset(x, y, y < 158 ? hex('#8a6c4e') : hex('#6e543e'));
  for (const px of g_PEANAS) for (let y = 152; y < 170; y++) if ((y & 1) === 0) pset(px, y, hex('#9a7a58'));
}

function g_vitrina(R, t, o) {
  const { rect, pset, linea, disco } = R, L = g_C, años = o.años !== false;
  g_fijo(R, 'casco-vitrina' + (años ? '' : '-sin'), () => g_vitrinaFija(R, años));
  // los focos del carril (uno por casco) y su cono tramado hasta la vitrina
  g_PEANAS.forEach((px, i) => { const x = px - 4; rect(x - 3, 15, x + 3, 19, C.k); rect(x - 2, 15, x + 2, 18, hex('#3a4656')); rect(x - 2, 19, x + 2, 19, hex('#fff6c8'));
    for (let y = 20; y < 21; y++) pset(x, y, C.blanco);
    for (let k = 0; k < 4; k++) { const q = ((t * 0.08 + k * 0.27 + i * 0.13) % 1), my = Math.round(32 + q * 60), mx = Math.round(px - 8 + h(k, i, 624) * 16 + Math.sin(t * 0.7 + k + i) * 3); pset(mx, my, (k + i) % 2 ? hex('#fffaf0') : hex('#f8ecc8')); } });
  // el plato del último casco gira: sus marcas corren por el canto
  { const px = g_PEANAS[4]; rect(px - 10, 97, px + 10, 98, C.k); for (let x = px - 9; x <= px + 9; x++) pset(x, 97, ((x + Math.floor(t * 6)) % 4 === 0) ? hex('#8a909c') : hex('#c8ccd4')); }
  // el brillo que barre el cristal despacio (cada 7 s)
  { const q = (t % 7) / 7, sx = Math.round(-40 + q * 360); for (let i = 0; i < 94; i++) for (let w = 0; w < 5; w++) { const x = sx + w + Math.round(i * 0.35); if (x > 29 && x < 267 && x !== 148 && (w + i) % 2 === 0) pset(x, 123 - i, hex('#fffcf2')); } }
  // el piloto de la alarma de la vitrina
  pset(264, 32, Math.floor(t * 1.5) % 2 ? hex('#e83a3a') : hex('#5a2a2a'));
  // la pantalla del pie: un casco, luego un huevo con funda, luego la curva que baja (pictogramas, sin letras)
  { R.recorte([3, 85, 21, 103]); const fase = Math.floor(t / 3) % 3, k = (t % 3) / 3;
    for (let y = 85; y <= 103; y++) for (let x = 3; x <= 21; x++) pset(x, y, (y + Math.floor(t * 6)) % 7 ? hex('#1e3048') : hex('#24385a'));
    if (fase === 0) g_casco(R, 11, 99, 0.85, 'moderno', 1, [hex('#146464'), hex('#1e8a8a'), hex('#5ac0b8')], k > 0.5);
    else if (fase === 1) h_huevo(R, 12, 100, t, { u: Math.min(1, 0.4 + k), funda: true, alto: 8, s: 0.8 });
    else { for (let i = 0; i < 16; i++) { pset(4 + i, 100 - Math.round(12 * Math.exp(-(((i - 6) / 1.6) ** 2))), hex('#e8504a')); pset(4 + i, 100 - Math.round(5 * Math.exp(-(((i - 8) / 4) ** 2))), hex('#3ac8b0')); } }
    R.recorte(null); pset(20, 86, hex('#3a4a5e')); }
  // el pasillo de la derecha: la luz del fondo, el suelo en perspectiva, un banco y alguien que pasa de vez en cuando
  { R.recorte([279, 57, 317, 150]);
    for (let y = 57; y <= 150; y++) for (let x = 279; x <= 317; x++) pset(x, y, y > 120 ? (((x - 298) * 40 / (y - 100) + 400) % 8 < 1 ? hex('#8a7a66') : hex('#a8967e')) : (x > 290 && x < 306 && y > 70) ? hex('#f2e8cc') : (x + y) % 3 ? hex('#5a6878') : hex('#52606e'));
    R.linea(291, 70, 305, 70, hex('#c8bc9c')); R.linea(290, 121, 306, 121, hex('#6a5a4a'));
    for (const yy of [82, 98]) R.linea(281, yy, 288, yy + 4, hex('#4a5666'));
    const q = (t % 11) / 3; if (q < 1) { const px = Math.round(282 + q * 32), b = Math.floor(t * 5) % 2;
      for (let y = 104; y <= 118; y++) R.linea(px - 2, y, px + 2, y, y < 108 ? hex('#c89a70') : y < 114 ? hex('#8a3a4a') : hex('#2a2a3a')); R.linea(px - 2, 103, px + 2, 103, hex('#2a1e18')); R.pset(px - 1 + b, 119, hex('#2a2a3a')); R.pset(px + 1 - b, 119, hex('#2a2a3a')); }
    R.recorte(null); }
}

const g_CIELO_E = new Map();

// la perspectiva del césped: en la fila y, la coordenada s «del campo» que cae en la columna x (las líneas de yardas son
// s = 20 + 40·k)
function g_campoS(x, y) { return (x - 160) / (1 + (y - 80) / 99) + 160; }

function g_entrenoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, L = g_C;
  // el cielo tramado, más claro hacia el horizonte
  const CI = [L.cielo0, L.cielo1, L.cielo2, L.cielo3];
  for (let y = 0; y < 80; y++) for (let x = 0; x < 320; x++) { const f = y / 72 * 3 + (h(x >> 3, y >> 2, 630) - 0.5) * 0.3; pset(x, y, CI[Math.max(0, Math.min(3, Math.floor(f + g_um(x, y) - 0.5)))]); }
  // la arboleda del fondo: copas en tres tonos
  for (let k = 0; k < 34; k++) { const x = k * 10 + Math.floor(h(k, 1, 631) * 8), r = 6 + h(k, 2, 631) * 6, y = 66 - r * 0.6;
    disco(x, y + 1, r, L.arbolS); disco(x - 1, y, r * 0.85, L.arbol); disco(x - 2, y - 2, r * 0.45, L.arbolL); }
  for (let k = 0; k < 220; k++) pset(Math.floor(h(k, 3, 631) * 320), 52 + Math.floor(h(k, 4, 631) * 20), h(k, 5, 631) < 0.5 ? L.arbolS : L.arbolL);
  // el edificio de entrenamiento: ladrillo con juntas, ventanales que reflejan el cielo, la cornisa, las máquinas del tejado
  rect(100, 38, 206, 74, C.k); rect(101, 39, 205, 74, L.ladrillo);
  for (let y = 40; y < 74; y += 3) { rect(101, y, 205, y, L.ladrilloS); for (let x = 101 + ((y / 3) % 2 ? 0 : 3); x < 206; x += 6) pset(x, y + 1, L.ladrilloS); }
  for (let k = 0; k < 50; k++) pset(101 + Math.floor(h(k, 6, 631) * 104), 39 + Math.floor(h(k, 7, 631) * 34), L.ladrilloL);
  rect(100, 36, 206, 39, C.k); rect(101, 37, 205, 38, hex('#d8d2c4'));
  for (let k = 0; k < 6; k++) { const x0 = 106 + k * 16; rect(x0, 44, x0 + 11, 56, C.k); for (let y = 45; y < 56; y++) for (let x = x0 + 1; x < x0 + 11; x++) pset(x, y, (x - x0 + (y - 45)) % 9 < 2 ? L.vidrioL : y < 50 ? hex('#7aa8cc') : L.vidrio); rect(x0 + 6, 45, x0 + 6, 55, C.k); }
  rect(140, 60, 166, 74, C.k); rect(141, 61, 165, 74, hex('#3a4a5a')); rect(153, 61, 153, 74, C.k); for (let y = 62; y < 74; y += 3) { pset(146, y, L.vidrioL); pset(160, y, L.vidrioL); }
  rect(136, 58, 170, 60, hex('#d8d2c4'));
  rect(112, 30, 128, 36, C.k); rect(113, 31, 127, 35, hex('#a8b0bc')); for (let x = 114; x < 127; x += 2) pset(x, 32, hex('#7a828e'));
  rect(176, 32, 186, 36, C.k); rect(177, 33, 185, 35, hex('#a8b0bc'));
  rect(200, 24, 200, 37, hex('#c8ccd4'));
  // la grada pequeña de aluminio a la izquierda, con su público
  for (let k = 0; k < 6; k++) { const y = 58 + k * 3; rect(8 - k, y, 84 + k, y + 1, k % 2 ? L.gradaS : L.grada); rect(8 - k, y + 2, 84 + k, y + 2, hex('#5a6270')); }
  for (let x = 10; x < 84; x += 12) linea(x, 58, x - 6, 78, hex('#5a6270'));
  // los postes amarillos al fondo, a la derecha (lejos de Atom)
  rect(236, 62, 237, 82, L.posteS); rect(236, 62, 236, 82, L.poste);
  rect(222, 60, 252, 62, C.k); rect(222, 61, 252, 61, L.poste); rect(222, 46, 223, 61, L.poste); rect(251, 46, 252, 61, L.poste); rect(223, 46, 223, 61, L.posteS); rect(252, 46, 252, 61, L.posteS);
  // la valla de malla delante de los árboles, con sus postes
  for (let y = 72; y < 80; y++) for (let x = 0; x < 320; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) pset(x, y, (y === 72) ? hex('#8a929c') : hex('#9aa4ae'));
  for (let x = 0; x < 320; x += 26) rect(x, 70, x + 1, 80, hex('#6a727c')); rect(0, 71, 319, 71, hex('#6a727c'));
  // el césped en perspectiva: las rayas del cortacésped, las líneas de yardas, las marcas y el polvo de cal
  for (let y = 80; y < 150; y++) for (let x = 0; x < 320; x++) { const s = g_campoS(x, y), banda = Math.floor((s + 400) / 20) % 2, w = 0.35 + (y - 80) / 140;
    const lin = Math.abs(((s - 20) % 40 + 40) % 40 - 20) > 20 - w, hash = (Math.abs(y - 104) < 1 || Math.abs(y - 128) < 1) && Math.abs(((s + 400) % 8) - 4) < w * 0.7;
    let c = banda ? L.cesped1 : L.cesped2; const n = h(x, y, 632); if (n < 0.12) c = L.cespedS; else if (n > 0.93) c = L.cespedL;
    pset(x, y, lin || hash ? (n < 0.15 ? hex('#d8dccc') : L.cal) : c); }
  for (let y = 80; y < 84; y++) for (let x = 0; x < 320; x++) if (g_um(x, y) < 0.5 - (y - 80) * 0.12) pset(x, y, L.cespedS);
  // la banda de fuera (más oscura, hierba más larga) y la línea lateral
  rect(0, 148, 319, 150, L.cal); for (let x = 0; x < 320; x += 3) pset(x, 150, hex('#d8dccc'));
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 633); pset(x, y, n < 0.22 ? L.cespedD : n < 0.6 ? L.cespedS : n < 0.92 ? L.cesped1 : L.cespedL); }
  for (let k = 0; k < 260; k++) { const x = Math.floor(h(k, 1, 634) * 320), y = 154 + Math.floor(h(k, 2, 634) * 26); pset(x, y, L.cespedL); pset(x, y + 1, L.cespedS); }
  // la bolsa de balones (malla) a la izquierda, con los balones dentro
  for (const [x, y] of [[10, 160], [18, 158], [14, 153], [22, 163], [8, 166]]) { disco(x, y, 4, C.k); disco(x, y, 3, C.cuero); pset(x - 1, y - 2, C.cueroL); pset(x, y - 1, C.cordon); pset(x + 1, y - 1, C.cordon); }
  for (let y = 150; y < 170; y++) for (let x = 4; x < 28; x++) if (((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) && Math.hypot((x - 16) / 12, (y - 160) / 10) < 1) pset(x, y, L.red);
  linea(16, 150, 20, 144, L.redS); linea(20, 144, 24, 147, L.redS); rect(3, 169, 29, 170, hex('#2a4a20'));
  // dos cascos con la funda acolchada en la hierba
  g_casco(R, 42, 171, 1.3, 'moderno', 1, [hex('#146464'), hex('#1e8a8a'), hex('#5ac0b8')], true);
  g_casco(R, 64, 175, 1.3, 'moderno', -1, [hex('#641e2a'), hex('#8a2a3a'), hex('#c25a68')], true);
  // la mesa plegable con la nevera de agua y los vasos, a la derecha
  rect(266, 138, 318, 141, C.k); rect(267, 138, 317, 139, hex('#e8e4dc')); rect(267, 140, 317, 140, hex('#b8b2a4'));
  for (const x of [270, 314]) { linea(x, 141, x - 3, 166, C.k); linea(x, 141, x + 3, 166, C.k); }
  rect(278, 112, 302, 138, C.k); rect(279, 113, 301, 137, L.nevera); rect(279, 113, 282, 137, L.neveraL); rect(297, 113, 301, 137, L.neveraS);
  rect(277, 108, 303, 113, C.k); rect(278, 109, 302, 112, hex('#f2f2ea')); rect(278, 112, 302, 112, hex('#c8c8bc'));
  for (const y of [118, 132]) rect(279, y, 301, y, L.neveraS);
  rect(288, 131, 292, 134, C.k); rect(289, 132, 291, 133, hex('#f2f2ea'));
  for (let k = 0; k < 3; k++) { rect(306 + k * 4, 130 - (k === 1 ? 0 : 0), 308 + k * 4, 137, C.k); rect(307 + k * 4, 131, 307 + k * 4, 137, hex('#f2f2ea')); }
  rect(305, 127, 311, 137, C.k); rect(306, 128, 310, 137, hex('#e8e8f0')); for (let y = 129; y < 137; y += 2) pset(306, y, hex('#c8c8d4'));
  rect(262, 168, 318, 170, hex('#2a4a20'));
}

// un jugador pequeño de entrenamiento (unos 11 px), con la funda acolchada encima del casco. x, suelo; col: color del
// jersey; o.corre (fase de piernas), o.empuja (inclinado hacia o.dir), o.dir
function g_jugadorito(R, x, suelo, t, col, o = {}) {
  const { pset, rect } = R, d = o.dir ?? 1, f = o.corre ? Math.floor(t * 10 + (o.fase ?? 0)) % 2 : 0, inc = o.empuja ? d : 0, bob = o.corre ? f : 0;
  x = Math.round(x); suelo = Math.round(suelo);
  // piernas (pantalón blanco y medias)
  pset(x - 1 + (o.corre ? (f ? -1 : 1) : 0) - (o.empuja ? d : 0), suelo - 1, C.k); pset(x + 1 + (o.corre ? (f ? 1 : -1) : 0) - (o.empuja ? d : 0), suelo - 1, C.k);
  rect(x - 1, suelo - 4 - bob, x + 1, suelo - 2 - bob, hex('#ecece4')); pset(x, suelo - 2 - bob, hex('#b8b8b0'));
  // el jersey con las hombreras y el número (dos rayitas), y el brazo
  rect(x - 2 + inc, suelo - 8 - bob, x + 2 + inc, suelo - 5 - bob, col); rect(x - 2 + inc, suelo - 8 - bob, x + 2 + inc, suelo - 8 - bob, C.k === col ? col : hex('#f2f2ea'));
  pset(x + inc - d, suelo - 6 - bob, C.k); pset(x + 3 * d + inc, suelo - 6 - bob - (o.empuja ? 1 : 0), hex('#c88a5a'));
  // el casco con la funda: lomos de espuma gris azulada y la rejilla
  const hx = x + inc * 2, hy = suelo - 11 - bob;
  rect(hx - 2, hy, hx + 2, hy + 2, g_C.funda); pset(hx - 1, hy - 1, g_C.fundaL); pset(hx + 1, hy - 1, g_C.fundaL); pset(hx, hy - 1, g_C.fundaS); pset(hx - 2, hy, g_C.fundaS); pset(hx + 2, hy, g_C.fundaS);
  pset(hx - d, hy + 1, g_C.fundaL); pset(hx + 2 * d, hy + 2, hex('#c8ccd4')); pset(hx + d, hy + 2, hex('#c88a5a')); pset(hx - 2 * d, hy + 2, col);
}

function g_entreno(R, t, o) {
  const { rect, pset, linea, disco } = R, L = g_C;
  const b = g_fijo(R, 'casco-entreno', () => g_entrenoFijo(R));
  let M = g_CIELO_E.get('m');
  if (!M) { M = new Uint8Array(320 * 80); const S = new Set([L.cielo0, L.cielo1, L.cielo2, L.cielo3]); for (let i = 0; i < 320 * 80; i++) if (S.has(b[i])) M[i] = 1; g_CIELO_E.set('m', M); }
  const B = R.buf, cielo = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 80 && M[y * 320 + x]) B[y * 320 + x] = c; };
  // las nubes: tres tamaños, tres alturas, tres velocidades, cada una en tres tonos (las altas, suaves bajo la barra)
  [[34, 22, 1.2, 0], [22, 34, 2.1, 1], [14, 46, 3.4, 2], [26, 18, 0.9, 3], [16, 40, 2.6, 4]].forEach(([w, y, v, k]) => {
    const cx = ((h(k, 1, 635) * 360 + t * v) % 380) - 40, r = w * 0.3, BL = [[-w * 0.42, 1, r * 0.75], [-w * 0.12, -1.5, r], [w * 0.22, -0.5, r * 0.9], [w * 0.45, 1, r * 0.65]];
    for (const [cs, dd, sh] of [[L.nubeS, 1, 1], [L.nubeM, 0, 0.92], [L.nube, -1, 0.55]]) for (const [dx, dy, rr] of BL) { const R2 = rr * sh;
      for (let j = Math.floor(-R2); j <= R2; j++) for (let i = Math.floor(-R2 * 1.3); i <= R2 * 1.3; i++) if ((i / 1.3) ** 2 + j * j <= R2 * R2 && (y + dy + j + dd) < y + r * 0.7) cielo(cx + dx + i + dd * 0.5, y + dy + j + dd, cs); } });
  // los pájaros (un par de uves que cruzan), dentro del cielo y lejos de Atom
  for (let k = 0; k < 3; k++) { const q = ((t + k * 1.3) / 16) % 1, bx = 262 - q * 280 + k * 6, by = 28 + k * 3 + Math.sin(t * 2 + k) * 2, al = Math.sin(t * 12 + k) > 0;
    if (bx < 268) { cielo(bx, by, C.k); cielo(bx - 1, by - (al ? 1 : 0), C.k); cielo(bx + 1, by - (al ? 1 : 0), C.k); } }
  // las copas de los árboles se mecen (brillos que van y vienen)
  for (let k = 0; k < 24; k++) if (Math.sin(t * 2.2 + k * 1.9) > 0.3) pset(Math.floor(h(k, 9, 636) * 320), 50 + Math.floor(h(k, 8, 636) * 16), L.arbolL);
  // la bandera del tejado, que ondea (barras y estrellas, sin escudos)
  for (let i = 0; i < 13; i++) for (let j = 0; j < 7; j++) { const yy = 24 + j + Math.round(Math.sin(t * 5 - i * 0.6) * 1.2 * (i / 12)); pset(201 + i, yy, i < 5 && j < 4 ? ((i + j) % 2 ? hex('#3a4a8a') : hex('#f2f2ea')) : j % 2 ? hex('#f2f2ea') : hex('#c83a3a')); }
  // el público de la grada: alguno se mueve
  for (let k = 0; k < 9; k++) { const x = 12 + Math.floor(h(k, 1, 637) * 66), fila = Math.floor(h(k, 2, 637) * 5), y = 57 + fila * 3, ar = Math.sin(t * 3 + k) > 0.6;
    pset(x, y, [hex('#e0b090'), hex('#8a5a3a'), hex('#c89a70')][k % 3]); pset(x, y + 1, [hex('#1e8a8a'), hex('#c83a3a'), hex('#e8c040'), hex('#3a4a8a')][k % 4]); if (ar && k % 3 === 0) pset(x + 1, y - 1, hex('#e0b090')); }
  // los muñecos de placaje, que se balancean (uno acaba de recibir)
  for (const [x, k] of [[258, 0], [272, 1]]) { const a = Math.sin(t * 3 + k * 2) * (k ? 1.2 : 0.5); for (let j = 0; j < 14; j++) { const xx = Math.round(x + a * j / 14); rect(xx - 2, 100 - j, xx + 2, 100 - j, j % 5 < 2 ? hex('#2a2430') : hex('#c83a3a')); pset(xx - 2, 100 - j, C.k); pset(xx + 2, 100 - j, j % 5 < 2 ? C.k : hex('#8e2424')); } rect(x - 3, 100, x + 3, 101, hex('#2a2430')); }
  // el trineo de placaje: la base, los muelles y las tres almohadillas, que se hunden cuando empuja el jugador de turno
  const turno = Math.floor(t / 3) % 3, q = (t % 3) / 3, contacto = q > 0.25 && q < 0.65, empuje = contacto ? Math.sin((q - 0.25) / 0.4 * Math.PI) : 0, dx = Math.round(empuje * 3);
  rect(40 - dx, 108, 96 - dx, 110, C.k); rect(41 - dx, 108, 95 - dx, 109, hex('#5a6472'));
  for (let k = 0; k < 3; k++) { const px = 50 + k * 18 - dx, hund = k === turno ? Math.round(empuje * 2) : 0;
    rect(px + 3, 102, px + 8, 104, hex('#8a929c')); rect(px - 1 - hund, 92, px + 4 - hund, 107, C.k); rect(px - hund, 93, px + 3 - hund, 106, L.trineo); rect(px - hund, 93, px - hund, 106, L.trineoL); rect(px + 3 - hund, 93, px + 3 - hund, 106, L.trineoS); }
  // los tres jugadores del trineo: el de turno arranca, empuja y vuelve a la fila
  const JC = [hex('#1e8a8a'), hex('#8a2a3a'), hex('#1e8a8a')];
  for (let k = 0; k < 3; k++) { const pos = (k - turno + 3) % 3;
    if (pos === 0) { const x = q < 0.25 ? lerp(112, 58 + k * 18 + 6, q / 0.25) : q < 0.65 ? 58 + k * 18 + 6 - dx : lerp(58 + k * 18 + 6, 120, (q - 0.65) / 0.35); g_jugadorito(R, x, 112, t, JC[k], { dir: q < 0.65 ? -1 : 1, corre: !contacto, empuja: contacto, fase: k }); }
    else g_jugadorito(R, 116 + pos * 6, 112, t, JC[k], { dir: -1, fase: k }); }
  // el entrenador pequeño con su carpeta, que toca el silbato cada pocos segundos
  { const x = 134, y = 116, pita = (t % 4) < 0.6; rect(x - 1, y - 4, x + 1, y - 2, hex('#2a2a36')); rect(x - 2, y - 8, x + 2, y - 5, hex('#e8e8f0')); rect(x - 2, y - 11, x + 2, y - 9, hex('#c89a70')); rect(x - 2, y - 12, x + 2, y - 12, hex('#2a3458')); pset(x + 3, y - 12, hex('#2a3458'));
    rect(x + 2, y - 7, x + 4, y - 5, hex('#a8743c')); pset(x - 1, y - 1, C.k); pset(x + 1, y - 1, C.k);
    if (pita) { pset(x - 3, y - 10, hex('#c8ccd4')); for (let k = 0; k < 3; k++) pset(x - 5 - k, y - 12 - k + Math.round(Math.sin(t * 30 + k)), C.blanco); pset(x - 6, y - 10, C.blanco); } }
  // el eslalon entre conos: los conos por fila, y el jugador que los sortea por delante y por detrás
  const xj = 150 + ((t * 16) % 100), yj = 104 + Math.round(Math.sin((xj - 150) / 16 * Math.PI) * 3);
  const conos = [158, 174, 190, 206, 222], cono = (x) => { pset(x, 100, L.cono); rect(x - 1, 101, x + 1, 102, L.cono); pset(x + 1, 102, L.conoS); rect(x - 2, 103, x + 2, 103, L.conoS); };
  if (yj < 104) g_jugadorito(R, xj, yj, t, hex('#8a2a3a'), { corre: true, dir: 1, fase: 1 });
  for (const x of conos) cono(x);
  if (yj >= 104) g_jugadorito(R, xj, yj, t, hex('#8a2a3a'), { corre: true, dir: 1, fase: 1 });
  // al fondo, dos jugadores se pasan el balón (el balón vuela en arco y gira; el que lo recibe da un saltito)
  { const c = 2.6, q2 = (t % (2 * c)) / c, ida = q2 < 1, k = ida ? q2 : q2 - 1, xa = 176, xb = 214, yA = 92;
    const vuela = k > 0.2 && k < 0.8, f = (k - 0.2) / 0.6, bx = Math.round(ida ? lerp(xa + 3, xb - 3, f) : lerp(xb - 3, xa + 3, f)), byy = Math.round(yA - 10 - Math.sin(f * Math.PI) * 9);
    g_jugadorito(R, xa, yA, t, hex('#1e8a8a'), { dir: 1, fase: 0 }); g_jugadorito(R, xb, yA - (!ida && k < 0.2 || ida && k > 0.8 ? 1 : 0), t, hex('#1e8a8a'), { dir: -1, fase: 1 });
    if (vuela) { pset(bx, byy, C.cuero); pset(bx + (Math.floor(t * 16) % 2 ? 1 : -1), byy, C.cueroS); pset(bx, byy - 1, C.cueroL); } }
  // el viento en la hierba de la banda: briznas que se doblan
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 638) * 320), y = 156 + Math.floor(h(k, 2, 638) * 23), s = Math.sin(t * 2.5 - x * 0.05 + k) > 0.2 ? 1 : 0;
    pset(x + s, y - 1, L.cespedL); pset(x, y, L.cesped1); }
  // un brillo en la nevera
  pset(281, 115 + Math.floor(t * 2) % 20, hex('#ffc49a'));
}

// los colores propios del estadio de hoy
const h_P = pal({
  // el cielo nocturno con el resplandor de la ciudad y sus nubes (sombra, cuerpo, luz y borde encendido)
  n0: '#080a1c', n1: '#0e1230', n2: '#161a40', n3: '#22224c', n4: '#302a58', n5: '#46305e', n6: '#5e3a62',
  nube0: '#181834', nube1: '#26264c', nube2: '#3e3660', nube3: '#6e4a6a', estrella: '#ece8ff', estrellaD: '#6a6aa0',
  // acero, hormigón y asientos de las gradas
  acero: '#181a26', aceroM: '#2a2e40', aceroL: '#464c64', aceroB: '#7a82a0', horm: '#3a3a48', hormL: '#5c5c6c', hormS: '#22222a',
  asiento: '#1a4a56', asientoS: '#10343e', asientoL: '#2a6a76',
  // el césped de noche bajo los focos: franja clara (gA) y franja oscura (gB)
  gAS: '#3c8030', gA: '#4e9a3c', gAL: '#66b24c', gBS: '#2e6a28', gB: '#3e8634', gBL: '#52984a', gNiebla: '#26483a',
  banda: '#2c5a2a', bandaL: '#366a32', pintura: '#eaf0e2', pinturaS: '#b4c4ac',
  // los focos y su halo
  foco: '#fffbea', focoM: '#fff0b8', focoG: '#c8b47a', halo1: '#2a2a50', halo2: '#423a5c', halo3: '#6a5a68',
  // los palcos con luz cálida
  palco: '#d8a068', palcoL: '#f4d4a0', palcoS: '#9a6a48',
  // piel y pelo del público
  p1: '#f0d0b0', p2: '#d8a878', p3: '#a8744a', p4: '#6e462a', pelo1: '#2a1e18', pelo2: '#6a4426', pelo3: '#c8a060',
  blanco: '#f4f4ee', gris: '#9a9aa8', negro: '#16161c', movil: '#f4f8ff', rojo: '#e83a3a', verde: '#5af07a', ambar: '#f8b83a',
  // la sala de datos
  muro: '#141a2a', muroL: '#1e2638', muroS: '#0c101c', moqueta: '#1a1e2c', moquetaL: '#232838', moquetaS: '#12141e',
  pant: '#08142a', pantL: '#3ac8e8', pantM: '#1e6a8a', pantS: '#0e2a44', cian: '#7ae8ff',
  // el atardecer de Los Ángeles
  a0: '#1c1c48', a1: '#2e2a5e', a2: '#4a3270', a3: '#7a3e74', a4: '#b2506e', a5: '#e0705e', a6: '#f29a5e', a7: '#f8c472', a8: '#fce0a0',
  colina1: '#7a4a7a', colina2: '#5a3466', colina3: '#3e2650', sol: '#fff2c0', solL: '#ffe08a',
  techo0: '#c8a8b8', techo1: '#e8cac0', techo2: '#f8e6d0', techoS: '#8a6a86', techoR: '#6e5274', dentro: '#fff0c8', dentroM: '#f8c87a',
  losa: '#9a8494', losaL: '#b49aa2', losaS: '#7a687c', junta: '#625470', agua: '#5a4a7a', aguaL: '#a8708a', aguaS: '#3a3060',
  palma: '#2a1e2e', palmaL: '#4a3440', palmaH: '#1e3a2a', palmaHL: '#3a5a3a',
});

// las camisetas del público (los dos equipos inventados y ropa de calle) con su sombra, y las pieles
const h_CAMIS = [[C.equipoA, C.equipoAS], [C.naranja, hex('#b85a2a')], [C.equipoB, C.equipoBS], [hex('#e8e4dc'), hex('#b8b4ac')], [hex('#2a2a34'), hex('#18181e')], [hex('#3a5a9a'), hex('#2a4070')], [hex('#c8b040'), hex('#9a8430')], [hex('#6a6a7a'), hex('#4a4a58')]];

const h_PIEL = [h_P.p1, h_P.p2, h_P.p3, h_P.p4];

const h_PELO = [h_P.pelo1, h_P.pelo2, h_P.pelo3, h_P.pelo1];

// la trama de Bayer 4 × 4 (0–1) para los degradados y los bordes tramados
const h_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const h_b4 = (x, y) => (h_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function h_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el fondo fijo de cada encuadre: se pinta una vez en su búfer y se copia en cada fotograma; junto a él, la máscara
// del cielo (1 donde se ve cielo) para que las nubes y las estrellas no pisen lo que hay delante
const h_FIJOS = new Map();

function h_fijo(R, clave, dibuja) {
  let f = h_FIJOS.get(clave);
  if (!f) {
    const b = R.nuevo(), prev = R.usar(b), cielo = new Uint8Array(320 * 180);
    dibuja(cielo); R.usar(prev); f = { b, cielo }; h_FIJOS.set(clave, f);
  }
  R.copiar(f.b);
  return f.cielo;
}

// degradado vertical tramado de y0 a y1 por una lista de colores
function h_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) {
    const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > h_b4(x, y) ? cols[i + 1] : cols[i]);
  }
}

// una nube de tres tonos y su borde encendido por debajo (la luz viene de abajo: la ciudad, el estadio o el sol que se
// ha puesto); cols = [sombra, cuerpo, luz, borde]; solo pinta donde la máscara del cielo lo deja
function h_nube(R, cx, cy, w, hh, cols, sem, cielo) {
  const nb = Math.max(3, Math.round(w / 9)), B = [];
  for (let k = 0; k < nb; k++) B.push([cx - w / 2 + (k + 0.5) * w / nb, cy - h(k, sem, 5) * hh * 0.45, w / nb * 0.85 + 3, hh * (0.55 + 0.45 * h(k, sem, 6))]);
  const x0 = Math.floor(cx - w / 2 - 6), x1 = Math.ceil(cx + w / 2 + 6), y0 = Math.floor(cy - hh * 1.5), y1 = Math.ceil(cy + hh * 0.4);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    if (cielo && !cielo[y * 320 + x]) continue;
    let f = 0; for (const [bx, by, rx, ry] of B) { const v = 1 - ((x - bx) / rx) ** 2 - ((y - by) / ry) ** 2; if (v > f) f = v; }
    if (f <= 0 || (f < 0.2 && h_b4(x, y) > f / 0.2)) continue;
    const v = (y - y0) / (y1 - y0) + (h_b4(x, y) - 0.5) * 0.18;
    R.pset(x, y, v > 0.86 ? cols[3] : v > 0.66 ? cols[2] : (f > 0.45 || v > 0.45) ? cols[1] : cols[0]);
  }
}

// las tres capas de nubes que cruzan el cielo a distintas velocidades, entre y0 e y1
function h_nubes(R, t, y0, y1, cols, sem, cielo, n = 7) {
  for (let k = 0; k < n; k++) {
    const capa = k % 3, v = [1.6, 3.4, 6.2][capa], w = 26 + h(k, sem, 1) * 40 + capa * 8, hh = 3 + capa * 1.5 + h(k, sem, 2) * 2;
    const x = ((h(k, sem, 3) * 460 + t * v) % 460) - 70, y = y0 + (y1 - y0) * (capa / 2.4 + h(k, sem, 4) * 0.2);
    h_nube(R, Math.round(x), Math.round(y), w, hh, cols, sem + k * 7, cielo);
  }
}

// estrellas que titilan (solo en el cielo; apagadas en la zona de Atom)
function h_estrellas(R, t, yMax, n, sem, cielo) {
  for (let k = 0; k < n; k++) {
    const x = Math.floor(h(k, 1, sem) * 320), y = Math.floor(h(k, 2, sem) * yMax);
    if (!cielo[y * 320 + x]) continue;
    const b = Math.sin(t * (1.1 + (k % 4) * 0.6) + k * 1.7), atom = x > 272 && y < 48;
    if (b > -0.2) R.pset(x, y, b > 0.7 && !atom && k % 3 === 0 ? h_P.estrella : h_P.estrellaD);
  }
}

// una batería de focos (marco de acero y la rejilla de lámparas con su halo); una lámpara parpadea de vez en cuando
function h_foco(R, cx, y, w, hh, t, k) {
  R.halo(cx, y + hh / 2, w * 0.95, [h_P.halo1, h_P.halo2, h_P.halo3], 1.15);
  R.rect(cx - w / 2 - 1, y - 1, cx + w / 2, y + hh, h_P.acero); R.rect(cx - w / 2 - 1, y - 1, cx + w / 2, y - 1, h_P.aceroL);
  for (let j = 0; j < Math.floor(hh / 3); j++) for (let i = 0; i < Math.floor(w / 4); i++) {
    const x = cx - w / 2 + 1 + i * 4, yy = y + 1 + j * 3, off = i === (k * 3 + 1) % Math.floor(w / 4) && j === 0 && (t + k * 1.3) % 6 < 0.25 && Math.floor(t * 20) % 2;
    R.rect(x, yy, x + 2, yy + 1, off ? h_P.focoG : h_P.focoM); if (!off) R.pset(x + 1, yy, h_P.foco);
  }
}

// el público de una grada: filas de cabezas y camisetas (los dos equipos por secciones), gente que salta, la ola que
// corre y las luces de los móviles. o.techo(x): primera fila; o.hueco(x, y): pasillos y vomitorios; o.oscuro: grada
// en sombra; o.paso: separación de filas
function h_publico(R, t, y0, y1, o = {}) {
  const paso = o.paso ?? 3, mov = o.moviles ?? 0.6, sem = o.sem ?? 0, osc = o.oscuro ? 0.3 : 0;
  const olaX = o.ola === false ? -999 : ((t * 64) % 460) - 70;
  for (let y = y0, f = 0; y <= y1; y += paso, f++) for (let x = f & 1; x < 319; x += 2) {
    if (o.techo && y < o.techo(x)) continue; if (o.hueco && o.hueco(x, y)) continue;
    const r = h(x, y, sem); if (r < 0.05) continue;
    const atom = x >= 270 && y <= 48, sec = Math.floor((x + 9 * f) / 46), loc = h(sec, 3, sem) < 0.5, r2 = h(x, y, sem + 1);
    const ci = r2 < 0.6 ? (loc ? 0 : 2) : r2 < 0.7 ? (loc ? 1 : 3) : 3 + Math.floor(h(x, y, sem + 2) * 5);
    let [cam, camS] = h_CAMIS[ci], piel = h_PIEL[Math.floor(r * 4) % 4], pelo = h_PELO[Math.floor(r2 * 4) % 4];
    const d = (atom ? 0.55 : 0) + osc;
    if (d > 0) { const n = h_P.acero; cam = h_mez(cam, n, d); camS = h_mez(camS, n, d); piel = h_mez(piel, n, d); pelo = h_mez(pelo, n, d); }
    const arriba = Math.abs(x - olaX - f * 1.5) < 7 || h(x, y, sem + Math.floor(t * 2.2 + r * 3)) < 0.035, dy = arriba ? -1 : 0;
    R.pset(x, y + dy, piel); R.pset(x + 1, y + dy, r > 0.5 ? pelo : h_mez(piel, h_P.acero, 0.3));
    R.pset(x, y + 1 + dy, cam); R.pset(x + 1, y + 1 + dy, camS);
    if (arriba) { R.pset(x, y + 1, cam); if (Math.abs(x - olaX - f * 1.5) < 4) R.pset(x + (f & 1), y - 2, piel); }
    if (!atom && h(x, y, sem + 9 + Math.floor(t * 1.2 + r * 5)) < mov * 0.03) { R.pset(x + 1, y - 1 + dy, h_P.movil); if (r2 > 0.97) { R.pset(x + 1, y - 2 + dy, h_P.foco); R.pset(x + 2, y - 1 + dy, h_P.focoM); } }
  }
}

// un texto de números del revés (los números del fondo del campo, pintados para quien está en la otra banda)
function h_numeroDelReves(R, texto, cx, cy, c) {
  const b = R.nuevo(), prev = R.usar(b); R.numero(texto, 40, 20, { centro: true, color: 1, sombra: false }); R.usar(prev);
  for (let y = 8; y < 24; y++) for (let x = 20; x < 60; x++) if (b[y * 320 + x] === 1) R.pset(cx - (x - 40) - 1, cy - (y - 16), c);
}

// la jugada del pase en coordenadas del campo (X a lo largo, 0–1; Y a lo ancho, 0 banda de fondo – 1 banda de cerca):
// 11 de ataque (verde azulado) que van hacia la derecha, 11 de defensa (granate) y el balón. 7 s en bucle
function h_jugada(t) {
  const p = (((t % 7) + 7) % 7) / 7, u = Math.max(0, Math.min(1, (p - 0.15) / 0.47)), lan = Math.max(0, Math.min(1, (p - 0.4) / 0.22)), sig = Math.max(0, (p - 0.62) / 0.23);
  const m = (a, b) => a + (b - a) * u, L = 0.5, at = [], de = [];
  for (const y of [0.42, 0.46, 0.5, 0.54, 0.58]) at.push([L - 0.012 - 0.012 * u, y]);
  const qb = [L - 0.03 - 0.05 * Math.min(1, u * 2), 0.5];
  at.push(qb, [m(L - 0.06, L - 0.02), m(0.5, 0.72)], [m(L - 0.01, L + 0.07), 0.64]);
  const wr = [L - 0.01 + 0.26 * u + 0.12 * Math.min(1, sig), m(0.1, 0.3)];
  at.push(wr, [m(L - 0.01, L + 0.19), m(0.9, 0.78)], [m(L - 0.02, L + 0.11), m(0.26, 0.4)]);
  for (const y of [0.44, 0.48, 0.52, 0.56]) de.push([L + 0.012 - 0.025 * u, y + (y - 0.5) * 0.3 * u]);
  for (const y of [0.34, 0.5, 0.66]) de.push([m(L + 0.06, L + 0.1), m(y, y * 0.6 + 0.16)]);
  de.push([L + 0.035 + 0.24 * u + 0.1 * Math.min(1, sig), m(0.12, 0.27)], [m(L + 0.035, L + 0.2), m(0.88, 0.8)]);
  de.push([m(L + 0.14, L + 0.3) + 0.1 * Math.min(1, sig), m(0.34, 0.3)], [m(L + 0.14, L + 0.22), m(0.66, 0.5)]);
  let balon, alto = 0;
  if (lan <= 0) balon = [qb[0], qb[1]];
  else if (lan < 1) { const c = [L - 0.01 + 0.26, 0.3]; balon = [qb[0] + (c[0] - qb[0]) * lan, qb[1] + (c[1] - qb[1]) * lan]; alto = Math.sin(lan * Math.PI); }
  else balon = [wr[0] + 0.006, wr[1]];
  return { at, de, balon, alto, lan, qb, p };
}

const h_bordeN = (x) => Math.round(34 - 7 * ((x - 160) / 160) ** 2);

const h_FOCOS_N = [[34, 16], [96, 16], [146, 14], [252, 14]];

const h_sN = (y) => 1 + (y - 108) * 0.62 / 72;

const h_pasilloSup = (x) => ((x + 21) % 58) < 3;

const h_pasilloInf = (x) => ((x + 26) % 52) < 3;

const h_vomitorio = (x, y) => y >= 81 && y <= 89 && Math.abs(((x + 26) % 104) - 54) <= 4;

function h_noche(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const cielo = h_fijo(R, 'noche', (cielo) => {
    h_degradado(R, 0, 0, 319, 42, [h_P.n0, h_P.n1, h_P.n2, h_P.n3, h_P.n4, h_P.n5, h_P.n6]);
    for (let y = 0; y < 42; y++) for (let x = 0; x < 320; x++) if (y < h_bordeN(x)) cielo[y * 320 + x] = 1;
    // los mástiles de los focos (las baterías y su halo van encima en cada fotograma)
    for (const [cx, w] of h_FOCOS_N) { const y0 = h_bordeN(cx) - 3; for (let y = y0; y < h_bordeN(cx); y++) { pset(cx - 2, y, h_P.aceroM); pset(cx + 1, y, h_P.aceroM); if ((y + cx) % 4 === 0) linea(cx - 2, y, cx + 1, y + 3, h_P.acero); }
      for (let y = y0; y < h_bordeN(cx); y++) { cielo[y * 320 + cx - 2] = 0; cielo[y * 320 + cx - 1] = 0; cielo[y * 320 + cx] = 0; cielo[y * 320 + cx + 1] = 0; }
      for (let y = y0 - 9; y < y0; y++) for (let x = cx - w / 2 - 1; x <= cx + w / 2; x++) cielo[y * 320 + x] = 0; }
    // el marcador central sobre el borde: estructura, patas y la sombra de la pantalla (que se pinta encima)
    rect(186, 15, 228, 32, h_P.acero); rect(186, 15, 228, 15, h_P.aceroL); rect(190, 31, 191, 34, h_P.aceroM); rect(223, 31, 224, 34, h_P.aceroM);
    for (let y = 14; y < 35; y++) for (let x = 185; x < 230; x++) cielo[y * 320 + x] = 0;
    // el borde del estadio: la cornisa de acero con su anillo de luces
    for (let x = 0; x < 320; x++) { const yt = h_bordeN(x); rect(x, yt, x, yt + 3, h_P.aceroM); pset(x, yt, h_P.aceroL); pset(x, yt + 3, h_P.acero); if (x % 4 === 0) pset(x, yt + 1, x > 270 && yt < 46 ? h_P.aceroL : h_P.focoM); if (x % 4 === 2) pset(x, yt + 2, h_P.acero); }
    // la grada alta y la baja: filas de asientos (el público va encima) y las escaleras
    const grada = (ya, yb, techo, pas, base) => { for (let x = 0; x < 320; x++) for (let y = Math.max(ya, techo(x)); y <= yb; y++) {
      const r = (((y - base) % 3) + 3) % 3;
      if (pas(x)) pset(x, y, (y & 1) ? h_P.hormL : h_P.horm);
      else pset(x, y, r === 2 ? h_P.hormS : (h(x >> 1, y, 11) < 0.2 ? h_P.asientoL : (r === 0 ? h_P.asiento : h_P.asientoS))); } };
    grada(0, 56, (x) => h_bordeN(x) + 4, h_pasilloSup, 31);
    // la fascia de la grada alta (su cinta de LED se pinta encima) y los palcos con su luz cálida
    rect(0, 57, 319, 60, h_P.acero); rect(0, 60, 319, 60, h_P.aceroM);
    rect(0, 61, 319, 68, h_P.acero);
    for (let x0 = 1; x0 < 320; x0 += 12) { for (let y = 62; y <= 67; y++) for (let x = x0 + 1; x <= Math.min(319, x0 + 10); x++) {
        const v = (y - 62) / 5 + (h_b4(x, y) - 0.5) * 0.3; pset(x, y, v < 0.15 ? h_P.palcoL : v < 0.7 ? h_P.palco : h_P.palcoS); }
      for (let x = x0 + 2; x < x0 + 10; x += 3) pset(x, 62, h_P.foco); linea(x0 + 3, 67, x0 + 6, 62, h_mez(h_P.palco, h_P.palcoL, 0.5)); rect(x0 + 1, 66, x0 + 10, 67, h_mez(h_P.palcoS, h_P.acero, 0.4)); }
    rect(0, 68, 319, 68, h_P.aceroL);
    grada(69, 93, () => 69, h_pasilloInf, 69);
    for (let x = 0; x < 320; x++) for (let y = 81; y <= 89; y++) if (h_vomitorio(x, y)) { const c = ((x + 26) % 104) - 54; pset(x, y, y === 81 || Math.abs(c) === 4 ? h_P.hormL : y < 84 ? h_P.negro : h_P.acero); }
    // el muro acolchado del campo (su banda de LED va encima)
    rect(0, 94, 319, 100, h_P.aceroM); rect(0, 94, 319, 94, h_P.aceroL); rect(0, 99, 319, 100, C.equipoAS); for (let x = 0; x < 320; x += 16) rect(x, 99, x, 100, C.equipoBS);
    // la banda del fondo: césped más oscuro, los bancos, las neveras naranjas, las mesas con vasos y las estufas
    for (let y = 101; y < 108; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 12) < 0.3 ? h_P.bandaL : h_P.banda);
    for (const [a, b] of [[92, 150], [170, 228]]) { rect(a, 102, b, 102, h_P.gris); rect(a, 103, b, 103, h_P.aceroL); for (let x = a + 2; x < b; x += 9) pset(x, 104, h_P.acero); }
    for (const x of [86, 232]) { rect(x, 101, x + 3, 105, C.naranja); rect(x, 101, x + 3, 101, h_P.blanco); pset(x + 3, 103, hex('#b85a2a')); rect(x + 6, 103, x + 11, 103, h_P.gris); for (let i = 0; i < 3; i++) pset(x + 7 + i * 2, 102, h_P.blanco); }
    for (const x of [72, 246]) { rect(x, 100, x + 4, 105, h_P.aceroL); rect(x + 1, 101, x + 3, 102, C.naranja); }
    // el césped: franjas de corte en perspectiva, la luz de los focos, la neblina del fondo y el desgaste del centro
    for (let y = 108; y < 180; y++) {
      const s = h_sN(y), a = Math.max(0, 1 - (y - 108) / 36) * 0.42;
      const cA = [h_P.gAS, h_P.gA, h_P.gAL].map((c) => h_mez(c, h_P.gNiebla, a)), cB = [h_P.gBS, h_P.gB, h_P.gBL].map((c) => h_mez(c, h_P.gNiebla, a));
      for (let x = 0; x < 320; x++) {
        const X = (x - 160) / s, cs = (Math.floor(X / 20 + 64) & 1) ? cA : cB, n = h(x, y, 31), gr = h(x >> 1, Math.floor(y / (1 + s)), 32);
        const luz = 1 - Math.abs(x - 160) / 250 - Math.max(0, y - 158) / 50, uso = 0.14 * Math.exp(-((x - 160) ** 2) / 900 - ((y - 140) ** 2) / 140);
        let i = 1; if (n < 0.13 + uso || h_b4(x, y) > luz + 0.22) i = 0; else if (n > 0.9 || (gr > 0.78 && (x + y) % 3 === 0)) i = 2;
        pset(x, y, cs[i]);
      }
    }
    // el escudo inventado del centro: un anillo con una estrella
    for (let j = -7; j <= 7; j++) for (let i = -21; i <= 21; i++) { const d = (i / 21) ** 2 + (j / 7) ** 2; if (d > 1) continue; pset(160 + i, 139 + j, d > 0.78 ? h_P.pintura : d > 0.62 ? C.equipoA : h_mez(C.equipoAS, h_P.gB, 0.25)); }
    { const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 4.5 : 11; pts.push([160 + Math.cos(a) * r, 139.5 + Math.sin(a) * r * 0.36]); } R.poligono(pts, C.naranja); }
    // las líneas de cinco yardas en perspectiva, las bandas y las marcas de cada yarda
    rect(0, 108, 319, 108, h_P.pintura); rect(0, 109, 319, 109, h_P.pinturaS);
    for (let k = -9; k <= 9; k++) for (let y = 110; y <= 175; y++) { const x = Math.round(160 + k * 20 * h_sN(y)); if (x < -1 || x > 320 || h(x, y, 33) < 0.05) continue; pset(x, y, h_P.pintura); if (y > 146) pset(x + 1, y, h_P.pinturaS); }
    for (let j = -45; j <= 45; j++) { if (j % 5 === 0) continue; for (const [ya, yb] of [[110, 111], [126, 127], [151, 153], [171, 173]]) { const x = Math.round(160 + j * 4 * h_sN(ya)); rect(x, ya, x, yb, h_P.pintura); } }
    rect(0, 175, 319, 177, h_P.pintura); rect(0, 177, 319, 177, h_P.pinturaS); for (let x = 0; x < 320; x++) { pset(x, 178, h(x, 1, 34) < 0.4 ? h_P.bandaL : h_P.banda); pset(x, 179, h_P.banda); }
    // los números de la banda de cerca (con su flecha hacia la portería) y los del fondo, del revés; la pintura gastada
    for (let k = -8; k <= 8; k += 2) { const n = String(50 - Math.abs(k) * 5), x = Math.round(160 + k * 20 * h_sN(165));
      R.numero(n, x + 1, 169, { centro: true, color: h_P.pintura, sombra: false });
      if (k) { const ax = x + (k < 0 ? -13 : 12); for (let i = 0; i < 3; i++) rect(ax + (k < 0 ? i : -i), 164 - i, ax + (k < 0 ? i : -i), 164 + i, h_P.pintura); }
      const xf = Math.round(160 + k * 20 * h_sN(117)); h_numeroDelReves(R, n, xf + 1, 117, h_mez(h_P.pintura, h_P.gNiebla, 0.3)); }
    for (let y = 110; y < 172; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === h_P.pintura && h(x, y, 35) < 0.1) pset(x, y, h_P.pinturaS);
  });
  // el cielo: estrellas que titilan y nubes iluminadas por debajo, a tres velocidades
  h_estrellas(R, t, 30, 70, 41, cielo);
  h_nubes(R, t, 4, 26, [h_P.nube0, h_P.nube1, h_P.nube2, h_P.nube3], 3, cielo, 7);
  // las baterías de focos con su halo y las banderas del borde, que ondean
  h_FOCOS_N.forEach(([cx, w], k) => h_foco(R, cx, h_bordeN(cx) - 11, w, 7, t, k));
  for (const [x, c] of [[66, C.equipoA], [84, C.naranja], [232, C.equipoB], [264, C.equipoA]]) { const yb = h_bordeN(x); linea(x, yb - 1, x, yb - 10, h_P.aceroL);
    for (let i = 1; i <= 6; i++) { const ond = Math.round(Math.sin(t * 6 - i * 0.9 + x) * (i / 4)); for (let j = 0; j < 4; j++) pset(x + i, yb - 10 + j + ond, j === 0 ? h_mez(c, h_P.blanco, 0.3) : c); } }
  // el marcador central: el tanteo y, de vez en cuando, la repetición del pase
  { const [a, b] = o.marcador ?? [21, 17], fase = (t % 8) < 5, m = 48;
    R.halo(207, 23, 26, [h_P.halo1, h_P.halo2], 0.8); rect(186, 15, 228, 32, h_P.acero); rect(186, 15, 228, 15, h_P.aceroL);
    rect(m + 140, 17, m + 178, 30, h_P.pant);
    if (fase) { rect(m + 142, 19, m + 144, 21, C.equipoA); rect(m + 174, 19, m + 176, 21, C.equipoB); R.numero(String(a), m + 151, 28, { centro: true, fina: true, color: h_P.cian, sombra: false }); R.numero(String(b), m + 168, 28, { centro: true, fina: true, color: h_P.focoM, sombra: false });
      for (let i = 0; i < 4; i++) pset(m + 155 + i * 3, 19, i < 3 ? h_P.ambar : h_P.aceroL); if (Math.floor(t * 2) % 2) pset(m + 159, 25, h_P.blanco); }
    else { const u = ((t % 8) - 5) / 3; rect(m + 140, 26, m + 178, 30, hex('#1e5a2a')); for (let x = m + 142; x < m + 178; x += 6) rect(x, 26, x, 30, hex('#3a7a3a'));
      for (let k = 0; k <= u * 30; k++) { const x = m + 144 + k, y = Math.round(27 - Math.sin(k / 30 * Math.PI) * 8); pset(x, y, h_P.pantM); }
      const bx = m + 144 + u * 30, by = 27 - Math.sin(u * Math.PI) * 8; rect(Math.round(bx) - 1, Math.round(by), Math.round(bx) + 1, Math.round(by), C.cueroL); }
    for (let x = m + 140; x <= m + 178; x++) if ((x & 1) === 0) pset(x, 17, h_mez(h_P.pant, h_P.pantL, 0.3)); }
  // la grada alta y la baja, con su público
  h_publico(R, t, 31, 55, { techo: (x) => h_bordeN(x) + 4, hueco: h_pasilloSup, moviles: o.moviles, ola: o.ola, sem: 1, oscuro: true });
  h_publico(R, t, 69, 92, { hueco: (x, y) => h_pasilloInf(x) || h_vomitorio(x, y), moviles: o.moviles, ola: o.ola, sem: 2 });
  // la cinta de LED de la fascia y la banda del muro: bloques de colores con flechas que corren
  for (let x = 0; x < 320; x++) {
    const u = x + t * 26, sg = Math.floor(u / 30), px = Math.floor(u - sg * 30), c = [C.equipoA, C.naranja, C.equipoB, hex('#2a4a9a'), C.equipoA][((sg % 5) + 5) % 5];
    for (let y = 57; y <= 59; y++) pset(x, y, (px % 6) === Math.abs(y - 58) + 1 ? h_P.blanco : c);
    const v = x - t * 12, sv = Math.floor(v / 40), pv = ((v % 40) + 40) % 40, cv = [hex('#123a44'), hex('#3a1420'), hex('#14244a')][((sv % 3) + 3) % 3];
    for (let y = 95; y <= 98; y++) pset(x, y, pv < 2 ? h_P.acero : (y === 95 ? h_mez(cv, h_P.blanco, 0.15) : cv));
  }
  // los pictogramas de la banda del muro: el balón, la estrella y las flechas, que corren con ella
  for (let sv = Math.floor(-t * 12 / 40) - 1; sv * 40 + t * 12 < 340; sv++) { const cx = Math.round(sv * 40 + 20 + t * 12), tipo = ((sv % 3) + 3) % 3; if (cx < -8 || cx > 328) continue;
    if (tipo === 0) { rect(cx - 3, 96, cx + 3, 97, C.cuero); pset(cx - 4, 96, C.cueroS); pset(cx + 4, 97, C.cueroS); pset(cx, 96, h_P.blanco); pset(cx - 1, 96, h_P.blanco); pset(cx + 1, 96, h_P.blanco); }
    else if (tipo === 1) { rect(cx - 2, 96, cx + 2, 97, h_P.focoM); pset(cx, 95, h_P.focoM); pset(cx - 3, 96, h_P.focoM); pset(cx + 3, 96, h_P.focoM); pset(cx - 2, 98, h_P.focoM); pset(cx + 2, 98, h_P.focoM); }
    else for (let i = 0; i < 3; i++) { const q = cx - 6 + i * 5, on = (Math.floor(t * 4) + i) % 3 === 0; pset(q, 95, on ? h_P.blanco : h_P.cian); pset(q + 1, 96, on ? h_P.blanco : h_P.cian); pset(q + 1, 97, on ? h_P.blanco : h_P.cian); pset(q, 98, on ? h_P.blanco : h_P.cian); } }
  // en la banda del muro, cada tanto, el balón que cruza
  { const bx = Math.round(((t * 40) % 400) - 40); if (bx > 0 && bx < 316) { rect(bx - 2, 96, bx + 2, 97, C.cuero); pset(bx, 96, h_P.blanco); pset(bx - 3, 96, h_P.foco); } }
  // los palcos: gente que va y viene detrás del cristal
  for (let k = 0; k < 18; k++) { const x0 = 1 + ((k * 7) % 27) * 12, px = x0 + 2 + Math.round((Math.sin(t * 0.5 + k * 2.1) * 0.5 + 0.5) * 6); if (x0 > 318) continue;
    rect(px, 64, px + 1, 67, h_mez(h_P.palcoS, h_P.acero, 0.5)); pset(px, 63, h_P.palcoS); }
  // los haces de los focos en el aire y las polillas a su alrededor
  h_FOCOS_N.forEach(([cx], k) => { const y0 = h_bordeN(cx) - 4;
    for (const dx of [-60, -20, 25]) { const x1 = cx + dx, y1 = 120; for (let s = 6; s < 90; s += 3) { const u = s / 90, x = Math.round(cx + (x1 - cx) * u), y = Math.round(y0 + (y1 - y0) * u); if (y > 100 || h(x, y, 50 + Math.floor(t * 3)) < 0.45) continue; pset(x, y, h_mez(R.pget(x, y), h_P.focoM, 0.22)); } }
    for (let i = 0; i < 5; i++) { const a = t * (2.2 + i * 0.4) + i * 1.3 + k, px = Math.round(cx + Math.cos(a) * (6 + i * 2)), py = Math.round(y0 + 1 + Math.sin(a * 1.4) * 5); if (!(px > 272 && py < 48)) pset(px, py, h_P.focoM); } });
  // el banquillo del fondo: los suplentes pequeños (granate, con hombreras y casco), en corrillos, que pasean, botan o
  // se giran; los entrenadores con gorra y cascos de radio, y un ayudante con las botellas de agua
  { let x = 92; for (let i = 0; i < 20; i++) { x += 4 + Math.floor(h(i, 1, 52) * 4) + (i % 5 === 4 ? 9 : 0); if (x > 226) break; if (x > 150 && x < 172) x = 172;
    const px = Math.round(x + (i % 4 === 0 ? Math.sin(t * 0.6 + i) * 3 : 0)), y = 106 - (h(i, Math.floor(t * 2.5), 51) < 0.07 ? 1 : 0), espalda = h(i, 2, 52) < 0.5, lado = Math.sin(t * 0.25 + i * 1.7) > 0 ? 1 : -1;
    const cb = C.equipoB, cbL = h_mez(C.equipoB, h_P.blanco, 0.3), cbS = C.equipoBS;
    rect(px + 1, y - 7, px + 2, y - 7, cb); rect(px, y - 6, px + 3, y - 6, cb); pset(px + 1, y - 7, cbL); if (!espalda) pset(lado > 0 ? px + 3 : px, y - 6, h_P.gris);
    rect(px - 1, y - 5, px + 4, y - 5, cb); pset(px - 1, y - 5, cbL); rect(px, y - 4, px + 3, y - 3, cb); pset(px + 3, y - 4, cbS); pset(px + 3, y - 3, cbS);
    if (espalda) { pset(px + 1, y - 4, h_P.blanco); pset(px + 2, y - 4, h_P.blanco); } else pset(px, y - 4, h_P.blanco);
    rect(px, y - 2, px + 3, y - 1, hex('#d8d0c0')); pset(px + 3, y - 2, hex('#a8a090')); pset(px, y, cbS); pset(px + 3, y, cbS); pset(px + 1, y - 1, hex('#a8a090')); } }
  for (const [x0, k] of [[156, 0], [166, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.5 + k * 3) * 3), y = 106, mira = Math.sin(t * 0.7 + k * 2) > 0 ? 1 : -1;
    rect(x, y - 7, x + 2, y - 7, h_P.negro); pset(mira > 0 ? x + 3 : x - 1, y - 7, h_P.negro); rect(x, y - 6, x + 2, y - 5, h_PIEL[k + 1]); pset(x - 1, y - 6, h_P.gris); pset(x + 3, y - 6, h_P.gris);
    rect(x - 1, y - 4, x + 3, y - 2, k ? h_P.negro : h_P.blanco); rect(x, y - 1, x + 2, y - 1, hex('#5a5a68')); pset(x, y, h_P.negro); pset(x + 2, y, h_P.negro);
    if (Math.sin(t * 1.3 + k * 2) > 0.4) { pset(x + 4 * (mira > 0 ? 1 : 0) - (mira > 0 ? 0 : 2), y - 5, h_PIEL[k + 1]); } }
  { const x = Math.round(80 + ((t * 5) % 160)), y = 106; if (x < 236) { rect(x, y - 6, x + 2, y - 6, h_P.p2); rect(x, y - 5, x + 2, y - 2, h_P.blanco); rect(x + 3, y - 5, x + 5, y - 3, h_P.gris); for (let i = 0; i < 3; i++) pset(x + 3 + i, y - 6, C.naranja); pset(x, y - 1 + (Math.floor(t * 6) % 2), h_P.negro); pset(x + 2, y - 1 + (Math.floor(t * 6 + 1) % 2), h_P.negro); } }
  // la skycam, colgada de sus cuatro cables, que se pasea sobre el campo
  { const cx = Math.round(160 + Math.sin(t * 0.21) * 58), cy = Math.round(62 + Math.sin(t * 0.37) * 5), cab = (x, y, k) => (k % 5 === 0 ? h_P.aceroL : h_P.aceroM);
    for (const [ax, ay] of [[0, 48], [319, 50], [70, -2], [250, -2]]) linea(ax, ay, cx, cy - 3, cab);
    rect(cx - 3, cy - 3, cx + 3, cy + 2, h_P.acero); rect(cx - 3, cy - 3, cx + 3, cy - 3, h_P.aceroL); rect(cx - 1, cy - 5, cx + 1, cy - 4, h_P.aceroM);
    disco(cx, cy + 1, 1.5, hex('#4a6aa0')); pset(cx, cy, h_P.cian); pset(cx + 2, cy - 2, Math.floor(t * 2) % 2 ? h_P.rojo : hex('#5a1a1a')); }
}

const h_FOCOS_C = [[30, 30, 8], [64, 24, 6], [102, 30, 9], [196, 26, 7], [236, 31, 8]];

const h_rayaC = (a, y) => 190 + a * (y - 84);

function h_cesped(R, t, o) {
  const { rect, pset, linea, disco } = R;
  h_fijo(R, 'cesped', () => {
    // el cielo, el anillo del techo y las gradas vacías: todo blando, tramado, sin bordes duros
    h_degradado(R, 0, 0, 319, 24, [h_P.n0, h_P.n1, h_P.n2, h_P.n3]);
    for (let y = 18; y < 26; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < (y - 18) / 8) pset(x, y, h_P.aceroM);
    for (let x = 4; x < 320; x += 7) for (let j = 0; j < 3; j++) if (h_b4(x + j, 21) < 0.6 && !(x > 266)) pset(x + (j & 1), 20 + j, h_mez(h_P.aceroM, h_P.focoM, 0.4 - j * 0.12));
    const fil = [h_P.asientoS, h_P.asiento, h_P.asientoL, h_P.asiento];
    for (let y = 26; y < 82; y++) for (let x = 0; x < 320; x++) {
      const fila = (y - 26) / 4.5, f = fila - Math.floor(fila), i = Math.floor(fila) % 4, c = f > 0.5 + (h_b4(x, y) - 0.5) * 0.8 ? fil[(i + 1) % 4] : fil[i];
      const pas = Math.abs(((x + 30) % 70) - 35) / 5; let col = pas < 1 && h_b4(x, y) > pas * 0.8 ? h_P.horm : c;
      if (y >= 50 && y <= 57) { const v = Math.abs(y - 53.5) / 4; col = h_b4(x, y) > v ? (((x % 18) < 2) ? h_P.palcoS : h_P.palco) : h_P.acero; }
      if (x > 266 && y < 48) col = h_mez(col, h_P.n2, 0.55);
      pset(x, y, col);
    }
    for (const c of [62, 132, 202]) for (let y = 62; y < 82; y++) for (let x = c - 10; x <= c + 10; x++) { const d = y < 70 ? Math.hypot((x - c) / 8, (y - 70) / 7) : Math.abs(x - c) / 8; if (d > 1.25) continue; if (h_b4(x, y) < (1.25 - d) * 1.6) pset(x, y, h_mez(R.pget(x, y), h_P.negro, d < 0.8 ? 0.75 : 0.45)); }
    // el videomarcador del fondo, apagado y desenfocado, con su marco
    for (let y = 30; y < 50; y++) for (let x = 6; x < 56; x++) { const e = Math.max(Math.abs(x - 31) / 25, Math.abs(y - 40) / 10); if (e > 1.1) continue; if (h_b4(x, y) < (1.1 - e) * 4) pset(x, y, e > 0.88 ? h_P.aceroM : h_P.pant); }
    for (let y = 80; y < 92; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < (y - 79) / 4) pset(x, y, h_mez(h_P.acero, C.equipoAS, (y - 80) / 14));
    // el césped a ras de suelo: franjas en perspectiva hacia el fondo, briznas en vertical más grandes cuanto más cerca
    for (let y = 88; y < 180; y++) {
      const d = y - 84, a = Math.max(0, 1 - d / 26) * 0.55, k = 1 + d / 22;
      const cA = [h_P.gAS, h_P.gA, h_P.gAL].map((c) => h_mez(c, h_P.gNiebla, a)), cB = [h_P.gBS, h_P.gB, h_P.gBL].map((c) => h_mez(c, h_P.gNiebla, a));
      for (let x = 0; x < 320; x++) {
        const s = (x - 190) / d, cs = (Math.floor(s / 2.5 + 0.5 + 40) & 1) ? cA : cB;
        const n = h(Math.floor(x / k * 1.6), Math.floor(y / (k * 0.9)), 61), m = h(x, y, 62);
        let i = 1; if (n < 0.28 || (m < 0.1 && d > 20)) i = 0; else if (n > 0.74 && m > 0.35) i = 2;
        if (y > 150 && h_b4(x, y) < (y - 150) / 70) i = Math.max(0, i - 1);
        pset(x, y, cs[i]);
      }
    }
    // las rayas de cinco yardas pintadas (hacia el punto de fuga), con la pintura gastada, y las marcas de yarda
    for (const a of [-1.25, 1.25]) for (let y = 88; y < 180; y++) { const w = (y - 84) / 36; for (let i = -Math.ceil(w); i <= Math.ceil(w); i++) { const x = Math.round(h_rayaC(a, y) + i); if (h(x, y, 63) < 0.12 + (y - 84) / 500) continue; pset(x, y, Math.abs(i) >= w - 0.3 ? h_P.pinturaS : h_P.pintura); } }
    for (const [ya, yb] of [[102, 105], [158, 168]]) for (const a of [-0.75, -0.25, 0.25, 0.75]) for (let y = ya; y <= yb; y++) { const x = Math.round(h_rayaC(a, y)); pset(x, y, h_P.pintura); if (y > 150) pset(x + 1, y, h_P.pinturaS); }
  });
  // los focos desenfocados: círculos de luz que laten, y las polillas que los rondan
  h_FOCOS_C.forEach(([x, y, r], k) => { const lat = 0.5 + 0.5 * Math.sin(t * 1.3 + k * 1.9);
    for (let j = -r - 4; j <= r + 4; j++) for (let i = -r - 4; i <= r + 4; i++) { const d = Math.hypot(i, j) / r; if (d > 1.45) continue; const px = x + i, py = y + j, f = R.pget(px, py);
      if (d > 1) { if (h_b4(px, py) < (1.45 - d) * 1.1 * (0.6 + lat * 0.4)) pset(px, py, h_mez(f, h_P.focoG, 0.4)); continue; }
      pset(px, py, h_mez(f, d > 0.82 ? h_P.foco : (d < 0.5 && i < 0 && j < 0) ? h_P.focoM : h_P.focoG, d > 0.82 ? 0.85 : 0.55 + lat * 0.15)); }
    disco(x - Math.round(r * 0.35), y - Math.round(r * 0.35), Math.max(1, r * 0.22), h_mez(h_P.focoM, h_P.foco, 0.6));
    for (let i = 0; i < 3; i++) { const a = t * (2 + i * 0.6) + k * 2 + i, px = Math.round(x + Math.cos(a) * (r + 3 + i)), py = Math.round(y + Math.sin(a * 1.3) * (r * 0.7)); pset(px, py, h_P.n0); } });
  for (let k = 0; k < 9; k++) { const x = 118 + k * 9, y = 21, l = Math.sin(t * 2 + k * 1.3); for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 4 && h_b4(x + i, y + j) < 0.55 + l * 0.2) pset(x + i, y + j, h_mez(R.pget(x + i, y + j), h_P.focoM, 0.5)); }
  // el videomarcador del fondo, con su salvapantallas: manchas de color desenfocadas que cambian
  for (let y = 33; y < 48; y++) for (let x = 10; x < 52; x++) { const a = Math.sin(x * 0.12 + t * 0.7) + Math.cos(y * 0.25 - t * 0.5); if (h_b4(x, y) < 0.55) pset(x, y, a > 0.6 ? h_mez(C.equipoA, h_P.pant, 0.35) : a < -0.6 ? h_mez(C.naranja, h_P.pant, 0.4) : h_mez(C.equipoB, h_P.pant, 0.5)); }
  // dos operarios desenfocados que barren las gradas
  for (const [k, y] of [[0, 46], [1, 70]]) { const x = Math.round(150 + Math.sin(t * 0.25 + k * 2.4) * 110); for (let j = -4; j <= 3; j++) for (let i = -2; i <= 2; i++) if (h_b4(x + i, y + j) < 0.75 - Math.abs(i) * 0.2) pset(x + i, y + j, j < -2 ? h_mez(h_P.p2, h_P.asiento, 0.4) : h_mez(hex('#e8783a'), h_P.asiento, 0.35)); }
  // la banda de LED del muro, desenfocada: manchas de color que corren despacio
  for (let x = 0; x < 320; x++) { const u = (x + t * 8) / 46, c = [C.equipoA, C.naranja, C.equipoB][((Math.floor(u) % 3) + 3) % 3], f = u - Math.floor(u);
    for (let y = 83; y <= 87; y++) if (h_b4(x, y) < 0.75 - Math.abs(y - 85) * 0.22 - Math.abs(f - 0.5) * 0.5) pset(x, y, h_mez(c, h_P.acero, 0.35)); }
  // al fondo, el cortacésped pequeño que va y viene, y el aspersor que gira y riega
  { const u = (t / 14) % 2, dir = u < 1 ? 1 : -1, x = Math.round(30 + (u < 1 ? u : 2 - u) * 240), y = 91;
    rect(x - 3, y - 2, x + 3, y, hex('#c83a2a')); rect(x - 3, y - 2, x + 3, y - 2, hex('#e85a3a')); pset(x - 2, y + 1, h_P.negro); pset(x + 2, y + 1, h_P.negro); linea(x - 4 * dir, y - 2, x - 7 * dir, y - 6, h_P.gris);
    rect(x - 9 * dir - 1, y - 9, x - 9 * dir + 1, y - 7, hex('#d8a040')); rect(x - 9 * dir - 1, y - 6, x - 9 * dir + 1, y - 3, hex('#3a4a7a')); pset(x - 9 * dir, y - 10, h_P.p2); pset(x - 9 * dir - 1, y - 2, h_P.negro); pset(x - 9 * dir + 1, y - 2 + (Math.floor(t * 4) % 2), h_P.negro);
    for (let i = 0; i < 4; i++) pset(x + dir * (4 + i), y - 1 - (Math.floor(t * 9 + i) % 3), h_P.gBL); }
  { const sx = 286, sy = 98, a = t * 1.6; rect(sx, sy - 2, sx, sy, h_P.gris);
    for (let k = 0; k < 14; k++) { const u = ((t * 1.4 + k / 14) % 1), dx = Math.cos(a + k * 0.05) * u * 26, dy = -Math.sin(u * Math.PI) * 7 + u * 3; const px = Math.round(sx + dx), py = Math.round(sy - 3 + dy); if (py > 46) pset(px, py, u < 0.7 ? hex('#c8e0f0') : hex('#8ab0c8')); } }
  // gotas de rocío que brillan sobre el césped
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 1, 64) * 320), y = 100 + Math.floor(h(k, 2, 64) * 76), b = Math.sin(t * 2.5 + k * 2.3); if (b > 0.75) { pset(x, y, h_P.blanco); if (b > 0.93 && y > 130) { pset(x - 1, y, h_P.gAL); pset(x + 1, y, h_P.gAL); pset(x, y - 1, h_P.gAL); } } }
  // las briznas de delante, que se mecen con el viento (las que tapan el pie del balón, en h_estadioDelante)
  for (let k = 0; k < 120; k++) { const bx = Math.floor(h(k, 1, 65) * 320), by = 150 + Math.floor(h(k, 2, 65) * 30), L = 3 + Math.floor((by - 146) / 6 + h(k, 3, 65) * 4), sw = Math.sin(t * 1.8 + bx * 0.05) * L * 0.25 + (h(k, 4, 65) - 0.5) * 3;
    linea(bx, by, Math.round(bx + sw), by - L, (x, y, i) => (i < L * 0.4 ? h_P.gB : h(k, 5, 65) < 0.5 ? h_P.gAL : h_P.gA)); }
}

const h_campoA = (X, Y) => { const xl = 26 + (-10 - 26) * Y, xr = 294 + (330 - 294) * Y; return [xl + (xr - xl) * X, 70 + Y * 42]; };

const h_ANTENAS = [[58, 76], [262, 80]];

function h_antenas(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const cielo = h_fijo(R, 'antenas', (cielo) => {
    h_degradado(R, 0, 0, 319, 26, [h_P.n0, h_P.n1, h_P.n2, h_P.n4, h_P.n6]);
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) cielo[y * 320 + x] = 1;
    // el borde de enfrente con sus focos y sus antenas (las luces van encima)
    rect(0, 22, 319, 25, h_P.aceroM); rect(0, 22, 319, 22, h_P.aceroL); for (let x = 1; x < 320; x += 3) pset(x, 23, h_P.focoG);
    for (const x of [40, 100, 206, 248]) { R.halo(x, 18, 9, [h_P.halo1, h_P.halo2, h_P.halo3], 1.1); rect(x - 5, 15, x + 5, 20, h_P.acero); for (let i = 0; i < 3; i++) rect(x - 4 + i * 3, 16, x - 3 + i * 3, 19, h_P.focoM); rect(x - 1, 20, x, 22, h_P.aceroM);
      for (let y = 7; y < 22; y++) for (let i = -10; i <= 10; i++) cielo[y * 320 + x + i] = 0; }
    // la grada de enfrente, lejos: el público en puntos, los palcos y el muro
    for (let y = 26; y < 66; y++) for (let x = 0; x < 320; x++) {
      if (y >= 44 && y <= 47) { pset(x, y, y === 44 || y === 47 ? h_P.acero : (x % 9 < 1 ? h_P.acero : (h_b4(x, y) < 0.6 ? h_P.palco : h_P.palcoS))); continue; }
      const fila = y & 1, r = h(x, y, 71); if (((x + 24) % 50) < 2) { pset(x, y, h_P.horm); continue; }
      pset(x, y, fila ? h_P.hormS : r < 0.08 ? h_P.asiento : h_mez(h_CAMIS[r < 0.5 ? (Math.floor(x / 40) % 2 ? 0 : 2) : Math.floor(r * 8) % 8][0], h_P.acero, y < 44 ? 0.4 : 0.2));
    }
    rect(0, 66, 319, 69, h_P.aceroM); rect(0, 66, 319, 66, h_P.aceroL); for (let x = 0; x < 320; x++) if ((x >> 3) & 1) pset(x, 67, C.equipoAS);
    // el campo allá abajo: franjas, líneas, la zona de anotación de la izquierda con su poste
    for (let y = 70; y <= 114; y++) { const Y = (y - 70) / 42, [xl] = h_campoA(0, Y), [xr] = h_campoA(1, Y);
      for (let x = 0; x < 320; x++) { if (y > 112) { pset(x, y, h_P.banda); continue; } const X = (x - xl) / (xr - xl);
        if (X < 0 || X > 1) { pset(x, y, h_P.banda); continue; }
        const ez = X < 0.09, cs = ez ? [C.equipoAS, C.equipoA, C.equipoA] : (Math.floor(X * 20) & 1) ? [h_P.gAS, h_P.gA, h_P.gAL] : [h_P.gBS, h_P.gB, h_P.gBL], n = h(x, y, 72);
        pset(x, y, cs[n < 0.2 ? 0 : n > 0.9 ? 2 : 1]); if (ez && ((x + y) % 7 === 0)) pset(x, y, h_mez(C.equipoA, h_P.pintura, 0.4)); } }
    for (let k = 0; k <= 20; k++) { const X = k === 0 ? 0 : 0.09 + (k - 1) * 0.91 / 19; const [x0, y0] = h_campoA(X, 0), [x1, y1] = h_campoA(X, 1); linea(x0, y0, x1, y1 - 1, k % 2 ? h_mez(h_P.pintura, h_P.gA, 0.35) : h_P.pintura); }
    linea(...h_campoA(0, 0), ...h_campoA(1, 0), h_P.pintura); linea(...h_campoA(0, 1).map((v, i) => v - i), ...h_campoA(1, 1).map((v, i) => v - i), h_P.pintura);
    { const [gx, gy] = h_campoA(0, 0.5); rect(gx - 1, gy - 1, gx, gy, hex('#c8b040')); linea(gx, gy - 1, gx, gy - 7, hex('#e8d040')); linea(gx - 3, gy - 7, gx + 3, gy - 7, hex('#e8d040')); pset(gx - 3, gy - 10, hex('#e8d040')); pset(gx + 3, gy - 10, hex('#e8d040')); linea(gx - 3, gy - 8, gx - 3, gy - 11, hex('#e8d040')); linea(gx + 3, gy - 8, gx + 3, gy - 11, hex('#e8d040')); }
    // la grada de abajo, vista desde arriba bajo la pasarela: cabezas y hombros en penumbra
    for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 114) / 5), r = (y - 114) % 5;
      pset(x, y, r === 4 ? h_P.hormS : ((x + f * 3) % 4 < 3 && h(Math.floor((x + f * 3) / 4), f, 73) > 0.1) ? (r < 2 ? h_mez(h_PIEL[Math.floor(h(Math.floor((x + f * 3) / 4), f, 74) * 4)], h_P.acero, 0.5) : h_mez(h_CAMIS[Math.floor(h(Math.floor((x + f * 3) / 4), f, 75) * 8)][0], h_P.acero, 0.45)) : h_P.asientoS); }
    // las columnas de celosía a los lados (la de la derecha, por debajo de la zona de Atom)
    const celosia = (x0, x1, y0, y1) => { rect(x0, y0, x0 + 2, y1, h_P.aceroM); rect(x1 - 2, y0, x1, y1, h_P.aceroM); pset(x0, y0, h_P.aceroL); rect(x0, y0, x0, y1, h_P.aceroL); rect(x1 - 2, y0, x1 - 2, y1, h_P.aceroL);
      for (let y = y0; y < y1; y += 14) { linea(x0 + 2, y, x1 - 2, y + 14, h_P.acero); linea(x0 + 2, y + 14, x1 - 2, y, h_P.aceroM); rect(x0, y, x1, y + 1, h_P.aceroM); pset(x0 + 1, y, h_P.aceroB); pset(x1 - 1, y, h_P.aceroB); } };
    celosia(0, 18, 0, 156); celosia(302, 319, 52, 156);
    // la barandilla de la pasarela (lado del campo): pasamanos, travesaño, postes y rodapié con franjas de aviso
    rect(0, 118, 319, 119, h_P.aceroL); rect(0, 118, 319, 118, h_P.aceroB); rect(0, 129, 319, 129, h_P.aceroM);
    for (let x = 22; x < 300; x += 34) { rect(x, 118, x + 1, 141, h_P.aceroM); pset(x, 120, h_P.aceroB); }
    for (let x = 0; x < 320; x++) for (let y = 137; y <= 140; y++) pset(x, y, ((x + y) >> 2) & 1 ? hex('#e8c030') : h_P.negro);
    // los mazos de cables que cuelgan entre los postes, con sus bridas, y la caja de empalmes con su puerta
    for (let x = 22; x < 290; x += 34) for (const [c, k] of [[h_P.negro, 0], [hex('#2a5aa8'), 1], [hex('#d8a030'), 2]]) for (let i = 0; i <= 34; i++) { const y = 121 + k + Math.round(Math.sin(i / 34 * Math.PI) * (3 + k)); pset(x + i, y, c); if (i === 17) pset(x + i, y + 1, h_P.blanco); }
    rect(150, 122, 166, 136, h_P.acero); rect(151, 123, 165, 135, h_P.gris); rect(151, 123, 165, 123, h_P.blanco); rect(152, 133, 164, 134, hex('#6a6a7a')); linea(158, 124, 158, 132, hex('#7a7a8a'));
    // el suelo de rejilla de la pasarela, en perspectiva, con su canto y las vigas que lo sostienen
    for (let y = 141; y <= 152; y++) for (let x = 0; x < 320; x++) { const q = (x + (y - 141) * 0.4) % 4, b = (y - 141) % 3; pset(x, y, b === 0 ? h_P.aceroL : q < 1 ? h_P.aceroM : (h(x, y, 76) < 0.15 ? h_P.horm : h_P.aceroM)); if (b !== 0 && q >= 1 && q < 3 && ((x + y) & 1)) pset(x, y, h_P.acero); }
    rect(0, 141, 319, 141, h_P.aceroB); rect(0, 153, 319, 155, h_P.aceroL); rect(0, 156, 319, 157, h_P.acero); for (let x = 40; x < 320; x += 80) { rect(x, 157, x + 4, 166, h_P.aceroM); rect(x, 157, x, 166, h_P.aceroL); }
    // la barandilla de cerca, al pie del encuadre (no tapa a los técnicos de la pasarela)
    rect(0, 168, 319, 170, h_P.aceroM); rect(0, 168, 319, 168, h_P.aceroB); for (let x = 60; x < 320; x += 100) { rect(x, 168, x + 2, 179, h_P.aceroM); rect(x, 168, x, 179, h_P.aceroL); }
    // las antenas: mástil, brazo, el panel blanco con su rejilla y la cúpula
    for (const [ax, ay] of h_ANTENAS) { rect(ax - 1, ay + 16, ax, 118, h_P.gris); rect(ax - 3, 116, ax + 2, 118, h_P.aceroL);
      rect(ax - 5, ay, ax + 4, ay + 16, h_P.acero); rect(ax - 4, ay + 1, ax + 3, ay + 15, h_P.blanco); rect(ax + 2, ay + 1, ax + 3, ay + 15, h_P.gris);
      for (let y = ay + 3; y < ay + 14; y += 2) rect(ax - 3, y, ax + 1, y, hex('#c8ccd8')); disco(ax, ay - 2, 3, h_P.blanco); disco(ax + 1, ay - 1, 1.5, h_P.gris);
      linea(ax - 1, ay + 16, ax - 1, 120, h_P.negro); linea(ax, ay + 16, ax + 2, 121, hex('#2a5aa8')); }
    // el foco de trabajo colgado de la columna, con su cono de luz sobre la pasarela
    rect(18, 96, 26, 99, h_P.acero); rect(20, 100, 25, 101, h_P.focoM);
    for (let y = 102; y < 150; y++) for (let x = 14; x < 70; x++) { const u = (y - 102) / 48, l = 22 - u * 6, r = 24 + u * 40; if (x < l || x > r) continue; if (h_b4(x, y) < 0.18 * (1 - u * 0.6)) pset(x, y, h_mez(R.pget(x, y), h_P.focoM, 0.25)); }
  });
  // el cielo: estrellas y nubes
  h_estrellas(R, t, 20, 40, 77, cielo);
  h_nubes(R, t, 3, 16, [h_P.nube0, h_P.nube1, h_P.nube2, h_P.nube3], 8, cielo, 6);
  // las antenas pequeñas del borde de enfrente, que parpadean, y los flashes del público de enfrente
  for (let k = 0; k < 9; k++) { const x = 18 + k * 33; rect(x, 24, x + 1, 25, h_P.blanco); pset(x, 23, (Math.floor(t * 10) + k) % 3 === 0 ? h_P.verde : hex('#1e5a2a')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 78) * 320), y = 27 + Math.floor(h(k, 2, 78) * 38); if (y >= 44 && y <= 47) continue; if (Math.sin(t * 1.7 + k * 2.9) > 0.8) pset(x, y, h_P.movil); }
  // la ola que recorre la grada de enfrente (brazos en alto) y un operario que camina por la pasarela del borde de enfrente
  { const ox = ((t * 48) % 420) - 50; for (let y = 26; y < 66; y += 2) { if (y >= 43 && y <= 48) continue; for (let x = Math.max(0, Math.round(ox - 7 + (y - 26) * 0.3)); x <= Math.min(319, Math.round(ox + 7 + (y - 26) * 0.3)); x++) if (h(x, y, 79) > 0.3) pset(x, y - 1, h(x, y, 80) < 0.5 ? h_mez(h_P.p2, h_P.acero, 0.2) : h_mez(h_CAMIS[Math.floor(h(x, y, 81) * 8)][0], h_P.blanco, 0.2)); } }
  { const u = (t / 24) % 1, x = Math.round(u < 0.5 ? 30 + u * 2 * 220 : 250 - (u - 0.5) * 2 * 220), y = 21, p = Math.floor(t * 5) % 2; if (!(x > 196 && x < 216) && !(x > 238 && x < 258)) { pset(x, y - 3, h_P.p2); rect(x, y - 2, x, y - 1, h_P.ambar); pset(x - p, y, h_P.acero); pset(x + p, y, h_P.acero); } }
  // la grada de abajo: gente que se levanta un momento y móviles que se encienden
  for (let k = 0; k < 26; k++) { const f = Math.floor(h(k, 1, 85) * 13), x0 = Math.floor(h(k, 2, 85) * 80) * 4 - f * 3, y = 114 + f * 5, on = h(k, Math.floor(t * 1.5 + k * 0.37), 86) < 0.35;
    if (!on || y > 178) continue; const c = h_mez(h_PIEL[k % 4], h_P.acero, 0.4); rect(x0, y - 1, x0 + 2, y, c); pset(x0 + 1, y - 2, h_mez(h_PELO[k % 4], h_P.acero, 0.3)); if (k % 3 === 0) pset(x0 + 3, y - 2, h_P.movil); }
  // los jugadores allá abajo: puntos con su sombra, que se mueven a saltos de una décima (como los ve el sistema)
  const tm = o.muestreo === false ? t : Math.floor(t * 10) / 10, J = o.jugada === false ? null : h_jugada(tm);
  if (J) { const punto = ([X, Y], c, cS) => { const [x, y] = h_campoA(X, Y).map(Math.round); pset(x + 1, y + 1, h_P.gBS); rect(x, y - 1, x + 1, y, c); pset(x, y - 2, cS); };
    J.de.forEach((p) => punto(p, C.equipoB, h_P.blanco)); J.at.forEach((p) => punto(p, C.equipoA, h_P.blanco));
    const [bx, by] = h_campoA(...J.balon).map(Math.round), al = Math.round(J.alto * 10); if (al) pset(bx, by, h_P.gBS); rect(bx, by - 1 - al, bx + 1, by - 1 - al, C.cueroL);
    const [rx, ry] = h_campoA(...J.at[8]).map(Math.round); if (Math.floor(t * 10) % 2) R.anillo(rx + 1, ry, 4, h_P.verde, 2); }
  // las ondas de las antenas hacia el campo: un pulso cada décima de segundo, que se abre y se apaga
  h_ANTENAS.forEach(([ax, ay], k) => { const dir = k ? -1 : 1;
    for (let q = 0; q < 5; q++) { const u = ((t * 10 + q) % 5) / 5, r = 6 + u * 34;
      for (let a = -0.9; a <= 0.9; a += 1.6 / r) { const ang = (dir > 0 ? 0.35 : Math.PI - 0.35) + a * dir, x = Math.round(ax + Math.cos(ang) * r), y = Math.round(ay + 6 + Math.sin(ang) * r * 0.8);
        if (y < 48 || h_b4(x, y) > 1 - u) continue; pset(x, y, u < 0.5 ? h_P.cian : h_P.pantM); } }
    pset(ax - 3, ay + 2, Math.floor(t * 10 + k) % 2 ? h_P.verde : hex('#1e5a2a')); pset(ax - 1, ay + 2, Math.floor(t * 3) % 2 ? h_P.ambar : h_P.gris); });
  // las luces de la caja de empalmes y el cable que se mece un poco
  for (let i = 0; i < 4; i++) pset(153 + i * 3, 126, (Math.floor(t * (3 + i)) + i) % 3 ? h_P.verde : h_P.negro);
  { const s = Math.round(Math.sin(t * 0.9) * 1.5); for (let i = 0; i <= 20; i++) pset(166 + i, 130 + Math.round(Math.sin(i / 20 * Math.PI) * (8 + s)), h_P.negro); }
  // polillas en el cono del foco de trabajo
  for (let i = 0; i < 4; i++) { const a = t * (2.4 + i * 0.5) + i * 1.7; pset(Math.round(24 + Math.cos(a) * (5 + i * 3)), Math.round(106 + Math.sin(a * 1.3) * 4), h_P.focoM); }
}

// las cinco pantallas del videowall [x0, y0, x1, y1]
const h_PANT = [[38, 24, 148, 96], [152, 24, 206, 58], [210, 24, 264, 58], [152, 62, 206, 96], [210, 62, 264, 96]];

function h_sala(R, t, o) {
  const { rect, pset, linea, disco } = R;
  h_fijo(R, 'sala', () => {
    // el techo con su rejilla y las tiras de luz, y la pared de paneles acústicos
    for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 40 === 0 || y === 5) ? h_P.muroS : (h_b4(x, y) < 0.3 ? h_P.muroL : h_P.muro));
    rect(0, 10, 319, 10, h_mez(h_P.pantM, h_P.muro, 0.4)); rect(0, 11, 319, 11, h_P.muroS);
    for (let y = 12; y < 114; y++) for (let x = 0; x < 320; x++) { const l = x % 5; pset(x, y, l === 0 ? h_P.muroS : l === 1 ? h_P.muroL : (h(x >> 2, y >> 3, 81) < 0.15 ? h_P.muroS : h_P.muro)); }
    for (let x = 0; x < 320; x++) { pset(x, 58, h_P.muroS); if (h_b4(x, 12) < 0.5) pset(x, 12, h_mez(h_P.muro, h_P.pantM, 0.5)); }
    // el resplandor de las pantallas en la pared
    for (let y = 14; y < 108; y++) for (let x = 26; x < 276; x++) { const d = Math.max(Math.max(0, 36 - x, x - 266) / 10, Math.max(0, 22 - y, y - 98) / 10); if (d > 0 && d < 1 && h_b4(x, y) > d) pset(x, y, h_mez(h_P.muro, h_P.pantM, 0.35 * (1 - d))); }
    // el marco del videowall
    rect(35, 21, 267, 99, h_P.negro); rect(35, 21, 267, 21, h_P.aceroL); for (const [a, b, c, d] of h_PANT) rect(a - 1, b - 1, c + 1, d + 1, h_P.acero);
    rect(140, 100, 162, 102, h_P.acero); rect(146, 103, 156, 112, h_P.aceroM);
    // el armario de servidores de la izquierda
    rect(4, 28, 30, 120, h_P.negro); rect(5, 29, 29, 119, h_P.acero); for (let y = 32; y < 116; y += 6) { rect(6, y, 28, y + 4, h_P.aceroM); rect(6, y, 28, y, h_P.aceroL); for (let x = 16; x < 27; x += 2) pset(x, y + 2, h_P.acero); }
    for (let y = 30; y < 118; y += 3) { pset(5, y, hex('#2a5aa8')); pset(29, y + 1, h_P.negro); }
    // la ventana al estadio (por debajo de la zona de Atom): el estadio iluminado de noche, recortado a su hueco
    rect(270, 48, 317, 112, h_P.negro); R.recorte([272, 50, 315, 110]);
    for (let y = 50; y <= 110; y++) for (let x = 272; x <= 315; x++) {
      let c; if (y < 60) c = h_b4(x, y) < (y - 50) / 10 ? h_P.n4 : h_P.n2; else if (y < 62) c = h_P.aceroM; else if (y < 80) c = (y & 1) ? h_P.hormS : h_CAMIS[Math.floor(h(x, y, 82) * 8)][0]; else if (y < 82) c = C.equipoAS;
      else c = (Math.floor((x - 272) / 5) & 1) ? h_P.gA : h_P.gB; pset(x, y, c); }
    for (const x of [280, 304]) { R.halo(x, 55, 6, [h_P.halo2, h_P.halo3], 1.2); rect(x - 3, 54, x + 3, 56, h_P.foco); }
    for (let x = 274; x < 316; x += 8) linea(x, 82, x + 5, 110, h_P.pintura);
    R.recorte(null);
    rect(293, 48, 294, 112, h_P.negro); rect(270, 75, 317, 76, h_P.negro); linea(274, 108, 290, 52, h_mez(h_P.n2, h_P.blanco, 0.2)); rect(268, 112, 319, 114, h_P.aceroL);
    // la moqueta: losetas con el pelo cruzado, el reflejo azul del videowall y la canaleta de cables
    for (let y = 115; y < 180; y++) for (let x = 0; x < 320; x++) { const tx = Math.floor(x / 16), ty = Math.floor((y - 115) / 8), dir = (tx + ty) & 1, n = h(x, y, 83);
      let c = n < 0.2 ? h_P.moquetaS : (dir ? ((x + (y >> 1)) % 3 === 0) : ((y % 3) === 0)) ? h_P.moquetaL : h_P.moqueta;
      const refl = Math.max(0, 1 - Math.abs(x - 150) / 140) * Math.max(0, 1 - (y - 115) / 40); if (h_b4(x, y) < refl * 0.5) c = h_mez(c, h_P.pantM, 0.45); pset(x, y, c); }
    rect(0, 114, 319, 114, h_P.muroS); for (let x = 0; x < 320; x++) if (h_b4(x, 113) < 0.6) pset(x, 113, h_mez(h_P.muro, h_P.pantL, 0.45)); rect(30, 150, 290, 152, h_P.aceroM); rect(30, 150, 290, 150, h_P.aceroL); for (let x = 34; x < 290; x += 12) pset(x, 151, h_P.acero);
    // la fila de puestos: la mesa, sus monitores (el brillo lo pone cada fotograma) y las sillas
    rect(36, 108, 266, 111, hex('#2a2a34')); rect(36, 108, 266, 108, hex('#4a4a5a')); rect(36, 112, 266, 121, hex('#1a1a22')); for (let x = 40; x < 266; x += 46) rect(x, 112, x + 1, 121, hex('#2a2a34')); rect(36, 121, 266, 121, h_P.muroS);
    for (let k = 0; k < 6; k++) { const x = 46 + k * 40; rect(x, 98, x + 12, 107, h_P.negro); rect(x + 5, 107, x + 7, 108, h_P.acero); }
    // dos sillas de ruedas vacías y una papelera, por detrás de donde se ponen los personajes
    for (const [x, d] of [[62, 1], [258, -1]]) { rect(x - 5, 138, x + 5, 140, hex('#2a2a3a')); rect(x - 5, 138, x + 5, 138, hex('#4a4a5e')); rect(x - 5 * d, 126, x - 3 * d, 138, hex('#2a2a3a')); rect(x - 6 * d, 126, x - 2 * d, 127, hex('#4a4a5e'));
      rect(x, 141, x, 146, h_P.aceroL); linea(x - 5, 148, x + 5, 148, h_P.aceroM); pset(x - 5, 149, h_P.negro); pset(x + 5, 149, h_P.negro); pset(x, 149, h_P.negro); for (let i = -6; i <= 6; i++) if (h_b4(x + i, 150) < 0.5) pset(x + i, 150, h_P.moquetaS); }
    rect(286, 140, 292, 149, h_P.aceroM); rect(286, 140, 292, 140, h_P.aceroL); for (let y = 142; y < 149; y += 2) rect(287, y, 291, y, h_P.acero);
  });
  // las pantallas del videowall
  const [s1, s2, s3, s4, s5] = h_PANT;
  const tm = o.muestreo === false ? t : Math.floor(t * 10) / 10, J = o.jugada === false ? h_jugada(0.5) : h_jugada(tm);
  // 1 · el campo visto desde arriba, con los puntos, sus estelas y la trayectoria del pase
  { const [a, b, c, d] = s1, X = (u) => Math.round(a + 4 + u * (c - a - 8)), Y = (v) => Math.round(b + 4 + v * (d - b - 8));
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) pset(x, y, (y - b) % 2 && h_b4(x, y) < 0.2 ? h_P.pantS : h_P.pant);
    R.recorte([a, b, c, d]);
    for (let y = b + 4; y <= d - 4; y++) for (let x = a + 4; x <= c - 4; x++) pset(x, y, (Math.floor((x - a - 4) / ((c - a - 8) / 10)) & 1) ? hex('#123a2a') : hex('#0e3022'));
    for (let k = 0; k <= 10; k++) linea(X(k / 10), b + 4, X(k / 10), d - 4, h_P.pantM, k % 2 ? 2 : 0);
    if (J.lan > 0) { const n = Math.round(Math.min(1, J.lan) * 40); for (let i = 0; i <= n; i++) { const u = i / 40, px = J.qb[0] + (0.75 - J.qb[0]) * u, py = J.qb[1] + (0.3 - J.qb[1]) * u; if (i % 2 === 0) pset(X(px), Y(py) - Math.round(Math.sin(u * Math.PI) * 8), h_P.ambar); } }
    for (let s = 1; s <= 4; s++) { const Jp = h_jugada(tm - s * 0.25); for (const [px, py] of Jp.at) pset(X(px), Y(py), h_mez(C.equipoA, h_P.pant, s / 5)); for (const [px, py] of Jp.de) pset(X(px), Y(py), h_mez(C.equipoB, h_P.pant, s / 5)); }
    for (const [px, py] of J.de) disco(X(px), Y(py), 1.6, hex('#e85a6a')); for (const [px, py] of J.at) disco(X(px), Y(py), 1.6, h_P.cian);
    rect(X(J.balon[0]) - 1, Y(J.balon[1]) - Math.round(J.alto * 8), X(J.balon[0]) + 1, Y(J.balon[1]) - Math.round(J.alto * 8), C.cueroL);
    R.anillo(X(J.at[8][0]) + 0.5, Y(J.at[8][1]) + 0.5, 4, h_P.ambar, Math.floor(t * 4) % 2 ? 2 : 0);
    R.recorte(null); }
  // 2 · barras de velocidad de seis jugadores, con la más alta en número
  { const [a, b, c, d] = s2; rect(a, b, c, d, h_P.pant); for (let y = b + 12; y < d; y += 6) for (let x = a + 2; x < c; x += 2) pset(x, y, h_P.pantS);
    let max = 0; for (let k = 0; k < 6; k++) { const v = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(t * (0.9 + k * 0.23) + k * 1.4)); max = Math.max(max, v); const hb = Math.round(v * (d - b - 14)), x = a + 4 + k * 8;
      rect(x, d - 2 - hb, x + 4, d - 2, k % 2 ? hex('#c84a5a') : C.equipoA); rect(x, d - 2 - hb, x + 4, d - 2 - hb, k % 2 ? hex('#f08a9a') : h_P.cian); }
    R.numero(String(Math.round(14 + max * 10)), c - 12, b + 9, { centro: true, fina: true, color: h_P.cian, sombra: false }); rect(a + 3, b + 4, a + 7, b + 6, h_P.ambar); }
  // 3 · la curva que corre (la velocidad del balón en el tiempo), con su rejilla
  { const [a, b, c, d] = s3; rect(a, b, c, d, h_P.pant); for (let x = a + 2; x < c; x += 8) for (let y = b + 2; y < d; y += 2) pset(x, y, h_P.pantS); for (let y = b + 8; y < d; y += 8) for (let x = a + 2; x < c; x += 2) pset(x, y, h_P.pantS);
    let py = null; for (let x = a + 2; x <= c - 2; x++) { const u = x + t * 14, y = Math.round((b + d) / 2 + Math.sin(u * 0.11) * 8 + Math.sin(u * 0.27) * 4); if (py !== null) linea(x - 1, py, x, y, h_P.pantL); py = y; }
    disco(c - 2, py, 1.5, h_P.blanco); }
  // 4 · el balón que gira, con su flecha de giro y el «600»
  { const [a, b, c, d] = s4, cx = (a + c) / 2, cy = b + 14; rect(a, b, c, d, h_P.pant);
    for (let j = -7; j <= 7; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 7) ** 2; if (e > 1) continue; pset(cx + i, cy + j, j < -3 ? C.cueroL : j > 3 ? C.cueroS : C.cuero); }
    const g = (t * 3) % 1; for (let k = 0; k < 3; k++) { const ph = ((g + k / 3) % 1), x = Math.round(cx - 10 + ph * 20), vis = Math.sin(ph * Math.PI); if (vis < 0.2) continue; linea(x, cy - 5, x, cy + 5, vis > 0.6 ? C.cordon : C.cordonS); }
    for (let k = 0; k < 14; k++) { const an = -Math.PI * 0.9 + k * 0.13 + (t * 2) % 0.13; pset(Math.round(cx + Math.cos(an) * 18), Math.round(cy + Math.sin(an) * 10), h_P.pantL); }
    pset(cx + 17, cy - 4, h_P.pantL); pset(cx + 18, cy - 5, h_P.pantL); pset(cx + 16, cy - 5, h_P.pantL);
    R.numero('600', cx + 1, d - 4, { centro: true, fina: true, color: h_P.ambar, sombra: false }); }
  // 5 · el estadio visto desde arriba: las antenas del anillo y las rayas a un jugador, que se actualizan cada décima
  { const [a, b, c, d] = s5, cx = (a + c) / 2, cy = (b + d) / 2; rect(a, b, c, d, h_P.pant);
    for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2; pset(Math.round(cx + Math.cos(an) * 24), Math.round(cy + Math.sin(an) * 14), h_P.pantM); }
    rect(cx - 14, cy - 7, cx + 14, cy + 7, hex('#123a2a')); for (let x = cx - 14; x <= cx + 14; x += 4) rect(x, cy - 7, x, cy + 7, hex('#1e5a3a'));
    const [jx, jy] = J.at[8], px = Math.round(cx - 14 + jx * 28), py = Math.round(cy - 7 + jy * 14);
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + 0.3, ax = Math.round(cx + Math.cos(an) * 24), ay = Math.round(cy + Math.sin(an) * 14), on = (Math.floor(t * 10) + k) % 4 === 0;
      if (on) linea(ax, ay, px, py, h_P.pantM, 2); rect(ax - 1, ay - 1, ax + 1, ay + 1, on ? h_P.verde : h_P.pantS); }
    disco(px, py, 1.6, h_P.ambar); }
  // los brillos de los cristales de las pantallas
  for (const [a, b] of h_PANT) { pset(a + 1, b + 1, h_mez(h_P.pant, h_P.blanco, 0.3)); pset(a + 2, b + 1, h_mez(h_P.pant, h_P.blanco, 0.2)); }
  // las luces del armario de servidores
  for (let y = 32; y < 116; y += 6) for (let i = 0; i < 4; i++) pset(8 + i * 2, y + 2, (h(y, i, Math.floor(t * (4 + i))) < 0.55) ? [h_P.verde, h_P.verde, h_P.ambar, h_P.pantL][i] : h_P.acero);
  // los monitores de la mesa, que cambian, y los técnicos pequeños con auriculares (de espaldas), que se mueven
  for (let k = 0; k < 6; k++) { const x = 46 + k * 40; rect(x + 1, 99, x + 11, 106, h_P.pant); for (let j = 0; j < 3; j++) rect(x + 2, 100 + j * 2, x + 2 + Math.round(3 + 5 * (0.5 + 0.5 * Math.sin(t * 1.5 + k + j * 2))), 100 + j * 2, j === 1 ? h_P.ambar : h_P.pantL); }
  for (let k = 0; k < 5; k++) { const x = 64 + k * 40 + Math.round(Math.sin(t * 0.6 + k * 1.7) * 1.5), y = 112, mira = Math.sin(t * 0.8 + k * 2.4) > 0.6 ? 1 : 0, pelo = h_PELO[k % 4];
    rect(x - 4, y - 7, x + 4, y + 2, hex('#2a2a3a')); rect(x - 3, y - 3, x + 3, y + 2, h_CAMIS[[0, 5, 3, 7, 2][k]][1]); rect(x - 3, y - 3, x + 3, y - 3, h_CAMIS[[0, 5, 3, 7, 2][k]][0]);
    disco(x + mira, y - 7, 3, pelo); pset(x + mira - 3, y - 7, h_P.negro); pset(x + mira + 3, y - 7, h_P.negro); linea(x + mira - 3, y - 9, x + mira + 3, y - 9, h_P.aceroL); pset(x + mira, y - 10, h_P.aceroL);
    if (k === 2 && (t % 6) > 3.5) { linea(x + 3, y - 3, x + 8, y - 10, h_CAMIS[3][0]); pset(x + 8, y - 11, h_P.p2); } }
  // el café con su vapor sobre la mesa
  { rect(252, 105, 255, 107, h_P.blanco); pset(256, 106, h_P.blanco); for (let i = 0; i < 3; i++) { const u = ((t * 0.6 + i / 3) % 1); pset(253 + Math.round(Math.sin(u * 7 + i) * 1.2), 104 - Math.round(u * 8), h_mez(h_P.muro, h_P.gris, 1 - u)); } }
  // la ventana: el estadio de fuera, con las luces de los móviles
  R.recorte([272, 62, 315, 79]); for (let k = 0; k < 10; k++) if (Math.sin(t * 2 + k * 2.7) > 0.7) pset(272 + Math.floor(h(k, 1, 84) * 44), 62 + Math.floor(h(k, 2, 84) * 18), h_P.movil); R.recorte(null);
}

const h_techoT = (x) => 60 + 34 * ((x - 186) / 130) ** 2;

const h_techoB = (x) => 98 + 6 * ((x - 186) / 130) ** 2;

const h_PALMAS = [[8, 179, 130], [114, 116, 72], [150, 116, 74], [226, 116, 72], [306, 179, 120]];

const h_PUERTAS = [122, 186, 252];

function h_superbowl(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const cielo = h_fijo(R, 'superbowl', (cielo) => {
    h_degradado(R, 0, 0, 319, 104, [h_P.a0, h_P.a1, h_P.a2, h_P.a3, h_P.a4, h_P.a5, h_P.a6, h_P.a7, h_P.a8]);
    // el sol que se pone tras las colinas, con su halo
    R.halo(40, 92, 30, [h_P.a6, h_P.a7, h_P.a8], 1.1); disco(40, 92, 9, h_P.solL); disco(40, 91, 7, h_P.sol);
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) cielo[y * 320 + x] = 1;
    // las colinas (dos términos) y la ciudad lejana a la derecha, con sus ventanas
    for (let x = 0; x < 320; x++) { const y1 = Math.round(88 + Math.sin(x * 0.03) * 4 + Math.sin(x * 0.11 + 1) * 2), y2 = Math.round(95 + Math.sin(x * 0.05 + 2) * 3);
      for (let y = y1; y < 112; y++) { pset(x, y, y < y2 ? (h_b4(x, y) < 0.2 ? h_P.colina2 : h_P.colina1) : h_P.colina2); cielo[y * 320 + x] = 0; } }
    for (let k = 0; k < 11; k++) { const x0 = 232 + k * 7, hh = 8 + Math.floor(h(k, 1, 91) * 14), w = 4 + Math.floor(h(k, 2, 91) * 3); rect(x0, 92 - hh, x0 + w, 100, h_P.colina3); rect(x0, 92 - hh, x0, 100, h_P.colina2);
      for (let y = 92 - hh + 2; y < 99; y += 2) for (let x = x0 + 1; x < x0 + w; x += 2) if (h(x, y, 92) < 0.3) pset(x, y, h_P.a7);
      for (let y = 92 - hh; y < 100; y++) for (let x = x0; x <= x0 + w; x++) cielo[y * 320 + x] = 0; }
    // el techo translúcido: paneles en rombo, la luz de dentro que lo atraviesa, el óvalo del graderío y del marcador
    for (let x = 52; x <= 319; x++) { const yt = Math.round(h_techoT(x)), yb = Math.round(h_techoB(x)); if (yt >= yb) continue;
      for (let y = yt; y <= yb; y++) { const v = (y - yt) / Math.max(1, yb - yt), u = (x - 186) / 130, pa = Math.floor((u * 14 + v * 4) + 40), pb = Math.floor((u * 14 - v * 4) + 40);
        const dentro = Math.max(0, 1 - ((x - 186) / 92) ** 2 - ((y - 84) / 12) ** 2);
        let c = v < 0.35 ? h_mez(h_P.techo0, h_P.a5, 0.25) : v < 0.7 ? h_P.techo1 : h_P.techo2; if ((pa + pb) & 1) c = h_mez(c, h_P.techoS, 0.12);
        if (h_b4(x, y) < dentro * 0.9) c = h_mez(c, h_P.dentro, 0.55); else if (h_b4(x, y) < Math.abs(u) ** 3 * 0.7) c = h_mez(c, h_P.techoS, 0.35);
        const mar = Math.abs(((x - 186) / 34) ** 2 + ((y - 80) / 5) ** 2 - 1); if (mar < 0.25) c = h_mez(c, h_P.techoR, 0.6);
        const lin = Math.abs((u * 14 + v * 4) - Math.round(u * 14 + v * 4)) < 0.06 || Math.abs((u * 14 - v * 4) - Math.round(u * 14 - v * 4)) < 0.06;
        pset(x, y, lin ? h_mez(c, h_P.techoS, 0.45) : c); cielo[y * 320 + x] = 0; }
      pset(x, yt, h_mez(h_P.techo2, h_P.a7, 0.5)); for (let y = 0; y < yt; y++) if (y >= 100) cielo[y * 320 + x] = 0; }
    // el canto del techo con su tira de luz y, debajo, el vestíbulo encendido entre columnas
    for (let x = 53; x < 320; x++) { const yb = Math.round(h_techoB(x)); rect(x, yb + 1, x, yb + 1, h_P.dentro); rect(x, yb + 2, x, yb + 3, h_P.techoR);
      for (let y = yb + 4; y < 114; y++) { const v = (y - yb - 4) / Math.max(1, 114 - yb - 4); pset(x, y, v < 0.4 ? h_P.dentro : h_b4(x, y) < 0.5 ? h_P.dentroM : h_P.dentro); }
      if (x % 14 === 0) rect(x, yb + 4, x + 1, 113, h_P.techoR); }
    R.poligono([[53, 93], [53, 114], [36, 114]], h_P.techo1); linea(53, 93, 36, 114, h_mez(h_P.techo2, h_P.a7, 0.5)); for (let y = 98; y < 114; y += 4) linea(53, y, Math.round(53 - (y - 93) * 17 / 21), y, h_P.techoS);
    // las puertas, con su luz que sale a la explanada
    for (const g of h_PUERTAS) { rect(g - 9, 104, g + 9, 114, h_P.blanco); rect(g - 9, 104, g + 9, 104, h_P.techoR); for (let x = g - 8; x < g + 9; x += 4) rect(x, 105, x, 114, h_P.dentroM); }
    // la explanada: losas en perspectiva hacia el estadio, con juntas y la luz cálida de las puertas
    for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) { const d = y - 100, gx = (x - 186) * 22 / d, gy = 600 / d;
      let c = (Math.floor(gx / 10) + Math.floor(gy)) & 1 ? h_P.losa : h_P.losaL; if (Math.abs(gx / 10 - Math.round(gx / 10)) < 0.06 + 0.4 / d || Math.abs(gy - Math.round(gy)) < 0.04 + 1.2 / d) c = h_P.junta;
      let luz = 0; for (const g of h_PUERTAS) luz = Math.max(luz, 1 - Math.hypot((x - g) / 26, (y - 116) / 12)); if (h_b4(x, y) < luz * 0.8) c = h_mez(c, h_P.dentroM, 0.35);
      if (h(x, y, 93) < 0.06) c = h_P.losaS; pset(x, y, c); }
    // el lago de la izquierda con su borde de piedra (los reflejos y la fuente se mueven encima)
    for (let y = 118; y < 152; y++) for (let x = 0; x < 104; x++) { const e = ((x - 40) / 64) ** 2 + ((y - 134) / 17) ** 2; if (e > 1) continue;
      const ry = 104 - (y - 118) * 2.6; let c = ry < 60 ? h_P.a3 : ry < 80 ? h_P.a4 : h_P.a5; if (e > 0.85) c = e > 0.93 ? h_P.losaL : h_P.losaS; else if (h_b4(x, y) < 0.3) c = h_mez(c, h_P.aguaS, 0.4); pset(x, y, c); }
    // el carrito de los globos (los globos se mecen encima)
    rect(236, 136, 252, 144, hex('#e8e0d0')); rect(236, 136, 252, 137, hex('#c83a3a')); for (let x = 237; x < 252; x += 4) rect(x, 138, x + 1, 144, hex('#c83a3a')); disco(239, 146, 2, h_P.negro); disco(249, 146, 2, h_P.negro); rect(234, 132, 254, 133, hex('#c83a3a'));
    // los troncos de las palmeras (las hojas se mecen encima)
    for (const [x, base, alto] of h_PALMAS) { const top = base - alto; for (let y = top; y <= base; y++) { const dx = Math.round(Math.sin((y - top) / alto * 1.4) * 2), w = 1 + (y - top) / alto * 1.4; for (let i = -Math.floor(w); i <= Math.ceil(w); i++) pset(x + dx + i, y, i <= 0 ? h_P.palma : h_P.palmaL); if ((y & 3) === 0) pset(x + dx, y, h_P.palmaL); cielo[y * 320 + x + dx] = 0; }
      for (let i = -4; i <= 4; i++) pset(x + i, base + 1, h_mez(h_P.losaS, h_P.junta, 0.5)); }
    // las farolas con sus banderolas
    for (const x of [98, 276]) { rect(x, 116, x + 1, 160, h_P.palma); rect(x - 2, 160, x + 3, 162, h_P.palma); rect(x - 2, 112, x + 3, 115, h_P.palma); }
  });
  // el cielo: nubes de tres tonos a tres velocidades, encendidas por debajo por el sol que se ha puesto
  h_estrellas(R, t, 20, 26, 99, cielo);
  h_nubes(R, t, 16, 56, [h_P.a2, h_P.a3, h_P.a5, h_P.a7], 21, cielo, 8);
  // dos reflectores que barren el cielo desde detrás del estadio (no llegan a la zona de Atom)
  for (const [bx, k] of [[118, 0], [236, 1]]) { const an = -Math.PI / 2 + (k ? -0.15 : -0.4) + Math.sin(t * 0.4 + k * 2) * 0.2, by = Math.round(h_techoT(bx)) - 1;
    for (let d = 4; d < 110; d++) { const w = d * 0.07, cx = bx + Math.cos(an) * d, cy = by + Math.sin(an) * d; for (let i = -Math.ceil(w); i <= Math.ceil(w); i++) { const x = Math.round(cx - Math.sin(an) * i), y = Math.round(cy + Math.cos(an) * i);
      if (x < 0 || x > 319 || y < 0 || !cielo[y * 320 + x] || (x > 270 && y < 48) || (y < 16 && x < 172)) continue; if (h_b4(x, y) < 0.35 * (1 - d / 110)) pset(x, y, h_mez(R.pget(x, y), h_P.a8, 0.4)); } } }
  // el avión que baja hacia el aeropuerto, con sus luces, y el dirigible con su cinta de luces de colores
  { const u = (t / 30 + 0.2) % 1, x = Math.round(330 - u * 360), y = Math.round(48 + u * 12); if (x > -6 && x < 326) { rect(x - 3, y, x + 3, y, h_P.colina3); pset(x - 1, y - 1, h_P.colina3); pset(x + 2, y - 1, h_P.colina3); pset(x - 4, y, Math.floor(t * 2) % 2 ? h_P.rojo : h_P.colina3); if (Math.sin(t * 9) > 0.5) pset(x + 4, y, h_P.blanco); pset(x - 2, y + 1, h_P.foco); } }
  { const x = Math.round(236 - (t * 2.2) % 140), y = 30 + Math.round(Math.sin(t * 0.5)); if (x > 4) { for (let j = -3; j <= 3; j++) for (let i = -11; i <= 11; i++) if ((i / 11) ** 2 + (j / 3.6) ** 2 <= 1) pset(x + i, y + j, j < -1 ? hex('#c8bcc8') : j > 1 ? hex('#6a5a72') : hex('#9a8aa0'));
      for (let i = -7; i <= 7; i++) pset(x + i, y, [C.equipoA, C.naranja, C.equipoB, h_P.blanco][((i + Math.floor(t * 6)) % 4 + 4) % 4]); poligono([[x + 9, y - 1], [x + 14, y - 4], [x + 14, y + 4], [x + 9, y + 1]], hex('#7a6a82')); rect(x - 2, y + 4, x + 2, y + 5, h_P.colina3); pset(x - 11, y, Math.floor(t * 1.5) % 2 ? h_P.rojo : h_P.a3); } }
  // pájaros que vuelven a la costa
  for (let k = 0; k < 5; k++) { const x = Math.round(((h(k, 1, 94) * 300 - t * (6 + k)) % 340 + 340) % 340 - 10), y = 60 + Math.round(h(k, 2, 94) * 16 + Math.sin(t + k) * 2), al = Math.floor(t * 6 + k) % 2; if (x > 270 && y < 48) continue; pset(x, y, h_P.colina3); pset(x - 1, y - al, h_P.colina3); pset(x + 1, y - al, h_P.colina3); }
  // las ondas de luz de colores que recorren el techo
  { const ox = ((t * 22) % 360) - 20, col = [C.equipoA, C.naranja, C.equipoB][Math.floor(t / 16.4) % 3];
    for (let x = Math.max(56, Math.round(ox - 8)); x <= Math.min(319, Math.round(ox + 8)); x++) { const yt = Math.round(h_techoT(x)) + 1, yb = Math.round(h_techoB(x)) - 1;
      for (let y = yt; y <= yb; y++) { const v = (y - yt) / Math.max(1, yb - yt), f = 1 - Math.abs(x - ox - (v - 0.5) * 6) / 8; if (f > 0 && h_b4(x, y) < f * 0.6) pset(x, y, h_mez(R.pget(x, y), col, 0.45)); } } }
  // en el vestíbulo, la gente que pasa (siluetas) y algún flash
  for (let k = 0; k < 22; k++) { const x = Math.round(((h(k, 1, 95) * 280 + t * (3 + (k % 4) * 2) * (k % 2 ? 1 : -1)) % 280 + 280) % 280 + 44), y = 112; if (x > 318) continue; rect(x, y - 5, x + 1, y, h_P.techoR); pset(x, y - 6, h_P.techoR); }
  if ((t % 3.7) < 0.08) disco(150 + Math.round(h(Math.floor(t / 3.7), 1, 96) * 80), 108, 1.5, h_P.blanco);
  // el lago: el sol y el estadio reflejados que tiemblan, ondas y la fuente
  for (let y = 120; y < 150; y += 2) { const w = Math.round(3 + (y - 120) * 0.1), ond = Math.round(Math.sin(y * 0.7 + t * 2.6) * 1.5); for (let i = -w; i <= w; i++) if (h(i, y, Math.floor(t * 4)) > 0.3) pset(40 + ond + i, y, y < 132 ? h_P.a8 : h_P.a7); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 97) * 90) + 6, y = 122 + Math.floor(h(k, 2, 97) * 24), e = ((x - 40) / 60) ** 2 + ((y - 134) / 15) ** 2; if (e > 0.8) continue; const L = 2 + Math.round(2 * Math.sin(t * 1.4 + k)); if (L > 0) linea(x, y, x + L, y, h_P.aguaL); }
  for (let k = 0; k < 18; k++) { const u = ((t * 0.9 + k / 18) % 1), side = k % 2 ? 1 : -1, x = Math.round(66 + side * u * 5), y = Math.round(132 - Math.sin(u * Math.PI) * 16 + u * 2); pset(x, y, u < 0.6 ? hex('#f0e8f0') : hex('#c8b0c8')); }
  rect(65, 132, 67, 133, hex('#d8d0e0'));
  // las hojas de las palmeras, que se mecen
  for (const [x, base, alto] of h_PALMAS) { const top = base - alto, cx = x, cy = top, s = alto > 100 ? 1.5 : 1;
    for (let k = 0; k < 9; k++) { const an = -Math.PI + k * Math.PI / 8 + Math.sin(t * 1.3 + k + x) * 0.08, L = (10 + (k % 3) * 3) * s;
      for (let i = 0; i <= L; i++) { const u = i / L, px = Math.round(cx + Math.cos(an) * i), py = Math.round(cy + Math.sin(an) * i * 0.7 + u * u * L * 0.6); if (px > 272 && py < 48) continue; pset(px, py, k % 2 ? h_P.palmaH : h_P.palmaHL); if (i % 2 === 0 && i > 2) pset(px, py + 1, h_P.palmaH); } }
    disco(cx, cy + 1, 2, h_P.palma); }
  // las farolas: el farol con su halo y la banderola que ondea (un balón y el «61»)
  for (const [x, k] of [[98, 0], [276, 1]]) { R.halo(x + 1, 110, 8, [h_mez(R.pget(x + 6, 110), h_P.dentroM, 0.3), h_P.dentroM], 1.1); rect(x - 1, 107, x + 2, 112, h_P.foco);
    for (let j = 0; j < 16; j++) { const ond = Math.round(Math.sin(t * 3 + j * 0.4 + k) * 1); rect(x + 2, 118 + j, x + 12 + ond, 118 + j, k ? C.equipoB : C.equipoA); }
    for (let i = 0; i < 5; i++) pset(x + 5 + i, 122, C.cueroL); pset(x + 7, 121, h_P.blanco); R.numero('61', x + 8, 132, { centro: true, fina: true, color: h_P.blanco, sombra: false }); }
  // los globos del carrito, que se mecen
  for (let k = 0; k < 5; k++) { const x = 238 + k * 4 + Math.round(Math.sin(t * 1.5 + k) * 1.5), y = 118 + (k % 2) * 3; linea(244, 132, x, y + 3, h_P.gris); disco(x, y, 2.4, [C.equipoA, C.naranja, C.equipoB, hex('#e8d040'), h_P.blanco][k]); pset(x - 1, y - 1, h_P.blanco); }
  // la gente que llega en riadas hacia las puertas (más pequeña cuanto más lejos), con camisetas de los dos equipos
  const gente = [];
  for (let k = 0; k < 34; k++) { const u = ((t * (0.03 + h(k, 1, 98) * 0.02) + h(k, 2, 98)) % 1), g = h_PUERTAS[k % 3], x0 = k % 4 === 0 ? -10 : k % 4 === 1 ? 330 : 60 + h(k, 3, 98) * 220, y0 = 182;
    const x = x0 + (g + (h(k, 4, 98) - 0.5) * 16 - x0) * u, y = y0 + (116 - y0) * u; gente.push([x, y, k, x0 < g ? 1 : -1]); }
  gente.sort((a, b) => a[1] - b[1]);
  for (const [x, y, k, dir] of gente) { const s = 0.5 + (y - 116) / 66 * 0.7, X = Math.round(x), Y = Math.round(y), hh = Math.round(9 * s), [cam, camS] = h_CAMIS[[0, 2, 0, 2, 1, 3, 5][k % 7]], paso = Math.floor(t * 6 + k) % 2;
    if (Y < 116) continue; const piel = h_PIEL[k % 4];
    rect(X - 1, Y - Math.round(hh * 0.45), X - 1 + Math.max(1, Math.round(2 * s)), Y - 1, h_P.palma);
    if (paso) { pset(X - 1, Y, h_P.palma); pset(X + Math.max(1, Math.round(2 * s)) - 1, Y - 1, h_P.palma); }
    rect(X - 1, Y - hh + Math.round(2 * s), X - 1 + Math.max(2, Math.round(3 * s)), Y - Math.round(hh * 0.45), cam); pset(X - 1 + Math.max(2, Math.round(3 * s)), Y - Math.round(hh * 0.5), camS);
    rect(X - 1, Y - hh, X - 1 + Math.max(1, Math.round(2 * s)), Y - hh + Math.round(2 * s) - 1, piel); pset(X - 1 + (dir > 0 ? 0 : 1), Y - hh, h_PELO[k % 4]);
    if (k % 6 === 0) { linea(X + 2, Y - hh + 1, X + 2, Y - hh - 6, h_P.gris); for (let j = 0; j < 3; j++) pset(X + 3 + j, Y - hh - 6 + Math.round(Math.sin(t * 6 + j) * 0.6), j === 1 ? h_P.blanco : cam); } }
}

// Lo que va por delante de los jugadores en el estadio de hoy, según el encuadre (o.encuadre, como en estadioHoy):
//   · 'noche': en la banda de cerca, la cámara de televisión sobre su pedestal con el cámara (abajo a la izquierda,
//     x 4–40, y 150–180) y el equipo de la cadena con los palos naranjas y el indicador del «down» (abajo a la derecha,
//     x 276–318, y 148–180); o.down (1–4, por defecto 2) es el número del indicador.
//   · 'cesped': las briznas altas de delante, que tapan el pie del balón (x 120–200, y 142–180) y se mecen.
//   · 'sala': los bordes de las mesas de delante en las esquinas, con teclado, taza y auriculares (x 0–56 y 264–319,
//     y 150–180).
//   · 'antenas' y 'superbowl': nada (la barandilla de cerca de la pasarela va en el fondo, por debajo de los pies).
// GEOMETRÍA de estadioHoy:
//   · 'noche': horizonte del césped en la banda de fondo, y 108; pies de los jugadores entre y 128 y 172 (pase de
//     izquierda a derecha: quarterback hacia x 60–90, receptor hacia x 230–260); línea de banda de cerca y 175–177; la
//     yarda 50 en x 160 y las líneas cada 5 yardas en x = 160 + k·20·(1 + (y − 108)·0,62/72); marcador x 138–182, y 17–30;
//     focos en x 34, 104, 216 y 250 (y 17–25); la skycam se mueve hacia x 100–220, y 57–67; cielo libre para el vuelo del
//     balón por encima de la grada: y 34–60.
//   · 'cesped': el balón, hacia x 160, y 128–148 (suelo y 148); rayas pintadas a los lados (x ≈ 70 y 310 abajo).
//   · 'antenas': pies de los técnicos en la pasarela, y 146–150, libres x 70–240 (la caja de empalmes en x 150–166 queda
//     detrás, a la altura del pecho); antenas en x 58 y 262 (paneles y 76–96); el campo, y 70–112.
//   · 'sala': pies de los entrenadores y técnicos, y 158–166, libres x 60–260; videowall x 36–266, y 14–90 (la pantalla
//     del campo x 38–148); la mesa de los técnicos de fondo, y 90–112.
//   · 'superbowl': pies de los personajes en la explanada, y 160–175, libres x 110–230; puertas en x 122, 186 y 252
//     (y 104–114); el lago x 0–104, y 118–152; el carrito de globos x 234–254; palmeras en x 8 y 306 (de lado a lado).
export function h_estadioDelante(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, enc = o.encuadre ?? 'noche';
  if (enc === 'noche') {
    // la cámara de televisión: pedestal con ruedas, el cuerpo, el objetivo largo, el visor y el cámara de espaldas
    { const pan = Math.round(Math.sin(t * 0.4) * 2), x = 18;
      rect(x - 10, 177, x + 10, 179, h_P.negro); disco(x - 8, 178, 1.5, h_P.aceroM); disco(x + 8, 178, 1.5, h_P.aceroM); rect(x - 1, 162, x + 1, 177, h_P.aceroM); rect(x - 1, 162, x - 1, 177, h_P.aceroL);
      rect(x - 6 + pan, 154, x + 6 + pan, 161, h_P.acero); rect(x - 6 + pan, 154, x + 6 + pan, 154, h_P.aceroL); rect(x + 6 + pan, 155, x + 16 + pan, 159, h_P.aceroM); rect(x + 16 + pan, 154, x + 18 + pan, 160, h_P.negro); pset(x + 17 + pan, 157, hex('#4a6aa0'));
      pset(x - 5 + pan, 155, Math.floor(t * 1.5) % 2 ? h_P.rojo : hex('#5a1a1a')); rect(x - 9 + pan, 155, x - 7 + pan, 159, h_P.negro); rect(x - 8 + pan, 156, x - 7 + pan, 158, h_P.pantL);
      const cx = x - 12; rect(cx - 3, 158, cx + 3, 170, hex('#2a2a3a')); rect(cx - 3, 158, cx + 3, 159, hex('#3a3a4e')); rect(cx - 2, 171, cx - 1, 179, h_P.negro); rect(cx + 1, 171, cx + 2, 179, h_P.negro);
      disco(cx, 154, 3, h_P.pelo1); rect(cx - 3, 151, cx + 3, 152, h_P.negro); rect(cx + 2, 160, cx + 7, 161, hex('#2a2a3a'));
      for (let i = 0; i < 20; i++) pset(x + 10 + i, 178 + Math.round(Math.sin(i * 0.5) * 0.6), h_P.negro); }
    // la cadena: dos palos naranjas con la cadena entre ellos y el indicador del «down», con sus portadores
    { const xs = [282, 300, 316], dn = String(o.down ?? 2), sw = Math.round(Math.sin(t * 0.6) * 1);
      for (const [i, x] of xs.entries()) { const px = x + (i === 1 ? sw : 0); rect(px, 148, px + 1, 172, C.naranja); rect(px + 1, 148, px + 1, 172, hex('#b85a2a'));
        if (i === 1) { rect(px - 4, 144, px + 5, 152, C.naranja); rect(px - 3, 145, px + 4, 151, h_P.negro); R.numero(dn, px + 1, 151, { centro: true, fina: true, color: h_P.focoM, sombra: false }); }
        else { rect(px - 2, 145, px + 3, 148, C.naranja); }
        const y = 166; rect(px - 2, y, px + 3, y + 6, h_P.negro); rect(px - 1, y, px + 1, y + 6, (Math.floor(px / 3) % 2) ? h_P.blanco : h_P.negro); rect(px - 2, y + 7, px - 1, 179, h_P.negro); rect(px + 2, y + 7, px + 3, 179, h_P.negro); disco(px, y - 3, 2.5, h_PIEL[i % 4]); rect(px - 2, y - 6, px + 2, y - 5, h_P.negro); }
      for (let x = 283; x < 316; x++) pset(x, 160 + Math.round(Math.sin((x - 283) / 33 * Math.PI) * 3), h_P.gris); }
    // un cable negro por el borde y un cono de la banda
    rect(46, 174, 50, 177, C.naranja); rect(47, 172, 49, 173, C.naranja); rect(46, 177, 50, 177, h_P.blanco);
  } else if (enc === 'cesped') {
    for (let k = 0; k < 46; k++) { const bx = 120 + Math.floor(h(k, 1, 66) * 80), by = 172 + Math.floor(h(k, 2, 66) * 8), L = 18 + Math.floor(h(k, 3, 66) * 18), sw = Math.sin(t * 1.6 + bx * 0.07) * 3 + (h(k, 4, 66) - 0.5) * 8;
      linea(bx, by, Math.round(bx + sw), by - L, (x, y, i) => (i < L * 0.3 ? h_P.gBS : i > L * 0.85 ? h_P.gAL : h(k, 5, 66) < 0.5 ? h_P.gA : h_P.gB));
      if (k % 3 === 0) linea(bx + 1, by, Math.round(bx + 1 + sw), by - L + 2, h_P.gBS); }
  } else if (enc === 'sala') {
    for (const [x0, x1, k] of [[0, 56, 0], [264, 319, 1]]) { rect(x0, 156, x1, 160, hex('#2e2e3a')); rect(x0, 156, x1, 156, hex('#4e4e5e')); rect(x0, 161, x1, 179, hex('#1a1a24')); for (let x = x0 + 4; x < x1; x += 14) rect(x, 162, x, 179, hex('#24242e'));
      const kx = k ? 276 : 10; rect(kx, 152, kx + 22, 155, h_P.aceroM); for (let i = 0; i < 10; i++) pset(kx + 1 + i * 2, 153, h_P.aceroL); for (let i = 0; i < 10; i++) pset(kx + 2 + i * 2, 154, (Math.floor(t * 5) + i) % 7 === 0 ? h_P.blanco : h_P.aceroL); }
    rect(40, 150, 46, 155, h_P.blanco); pset(47, 152, h_P.blanco); pset(47, 153, h_P.blanco); rect(41, 151, 45, 151, hex('#6a4a2a'));
    for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); pset(43 + Math.round(Math.sin(u * 6 + i) * 1.5), 148 - Math.round(u * 10), h_mez(h_P.moqueta, h_P.gris, 1 - u)); }
    R.anillo(304, 150, 4, h_P.negro); rect(299, 150, 301, 154, h_P.negro); rect(307, 150, 309, 154, h_P.negro);
  }
}
