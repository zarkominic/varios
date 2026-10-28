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
// El laboratorio de física de una universidad, en cinco encuadres. Devuelve los puntos que las escenas necesitan para
// dibujar encima (flechas del eje, «?», «✓», trayectorias): ver cada encuadre. o.encuadre:
//   · 'tunel' (por defecto): la nave del túnel de viento. Al fondo, la pared de bloques pintados con la ventana al campus
//     (cielo tramado con nubes a dos velocidades, el edificio de ladrillo con su torre, árboles que se mecen, estudiantes
//     que pasan), el armario eléctrico con sus pilotos y amperímetros, la bandeja de cables, el reloj, los pictogramas;
//     el túnel azul de lado: la boca con su panal, la cámara de ensayo acristalada (la rejilla de calibrar dentro, los
//     reflejos en el cristal) y el difusor hasta el ventilador grande, que gira detrás de su rejilla. Dentro, el balón de
//     hoy (T.balon, s 2,2) sujeto por su eje a una horquilla con rótula: gira sobre sí mismo (o.giro) y su eje traza un
//     círculo lento alrededor de la dirección del viento (o.precesion), con la estela cian del marcador que deja ver el
//     círculo; las líneas de humo salen del peine de toberas y se abren alrededor del balón (o.viento). En primer
//     término: la cámara rápida en su trípode (piloto rojo, contador que corre), el lanzador de balones de dos ruedas con
//     su cesta, el carro rojo de herramientas (un balón desinflado encima, el trapo que se mece) y, a la derecha, la mesa
//     con el monitor (la curva del giro que corre y el punto que da vueltas en su círculo), la taza con vapor, el teclado
//     y un papel que aletea con la corriente. o.giro 0–1 (1 por defecto: el giro de un buen pase; 0, quieto);
//     o.precesion 0–1 (1 por defecto: el eje da una vuelta lenta cada o.periodo s, 4,5 por defecto; 0: el eje no se
//     mueve); o.viento 0–1 (1 por defecto: el humo corre; 0, el túnel apagado y el ventilador parado si o.giro también
//     es 0); o.rpm (número del contador de la cámara de ensayo; por defecto 600 × o.giro, null lo apaga); o.peonza
//     (true: la peonza gira en la mesa, con el eje que da vueltas al mismo ritmo que el del balón). Devuelve
//     { bola: [x, y], punta: [x, y], cola: [x, y], ang, peonza: [x, y] | null }.
//   · 'pizarra': el aula del departamento: la pizarra verde grande con su marco de roble, la bandeja con tizas y borrador
//     y, en tiza, el lanzador y el receptor, el suelo, la parábola del pase discontinua y cinco balones a lo largo de ella
//     con su eje en flecha; en las esquinas, fórmulas de símbolos (θ, ω = 600, τ = r × F, flechas) y una peonza de tiza
//     con su flecha circular. o.u (0–1, 1 por defecto) va dibujando la parábola y los balones (la tiza avanza);
//     o.solucion (0–1, 0 por defecto): con 0, los ejes siguen todos mirando arriba como un giroscopio perfecto (el
//     enigma); al subir, se borran y aparecen los nuevos, con la punta que sigue la curva y su circulito de precesión
//     (la flecha que da vueltas). Alrededor: la ventana a la derecha con el campus, el reloj, el polvo de tiza en el haz
//     de sol, la mesa del profesor a la izquierda con la bola del mundo y el péndulo de Newton que choca, el parqué.
//     Devuelve { balones: [[x, y, ang], …] (los cinco puntos de la curva), cima: [x, y] }.
//   · 'mesa': el inserto de la mesa de madera de arce: la peonza grande en el centro (e_peonza, o.precesion como arriba,
//     con su estela), un balón de juguete en su soporte, un giroscopio de laboratorio con el volante que gira en sus
//     aros, el café con su vapor, la libreta con la curva y los círculos dibujados, el lápiz, la regla, el cronómetro
//     que corre; detrás, la estantería desenfocada y la luz de la ventana con motas de polvo. Devuelve { peonza: [x, y] }
//     (la punta de la peonza sobre la mesa) y { cima: [x, y] } (el extremo de su eje).
//   · 'parque': el parque del campus a media tarde: cielo tramado con nubes de tres tonos a tres velocidades y bandadas,
//     el edificio de ladrillo con su torre del reloj y otro bloque, árboles que se mecen, el paseo con farolas y
//     estudiantes pequeños que pasan, el estanque con los reflejos que tiemblan, nenúfares, juncos, dos patos que nadan
//     y uno que bucea, y el césped de primer término con el parterre de flores que se mecen, un banco, una papelera y una
//     ardilla que cruza a saltos. Los cúmulos grandes van bajos (y 60–80) para dejar tranquilas la barra y la zona de
//     Atom. El cielo de x 84–250, y 20–96 (la torre ocupa x 54–78) queda libre para el balón que da volteretas. Devuelve
//     { agua: [64, 120, 264, 156], pato: [176, 146] } (dónde nadar el pato del gag).
//   · 'arriba': el campo visto desde arriba (3,6 px por yarda): césped segado a franjas de cinco yardas, las líneas cada
//     cinco yardas, las marcas de cada yarda en las bandas y en el centro, los números con su flechita (20 a la
//     izquierda, 50 en x 120, 10 a la derecha), la línea de gol en x 300 y la zona de anotación inventada (franjas
//     diagonales en dos colores, sin letras) de x 301 al borde, la banda de arriba (y 0–47) oscura, en la sombra de la
//     grada, con bancos y neveras de poco contraste (tranquila, bajo Atom y la barra del año) y la de abajo con
//     banquillos, conos y la pista; de vida, la sombra de una nube que cruza, la segadora pequeña con su operario por la
//     banda de abajo y tres gaviotas con sus sombras. Devuelve { yarda: 3.6, x50: 120, y0: 48, y1: 170 } (x de una yarda: x50 + (yd − 50) × yarda, con yd 0–100 desde la
//     portería de la izquierda).
// Exporta también e_peonza (la peonza que gira y precesa) y e_pato (el pato ofendido) para las escenas.
export function labGiro(R, t, o = {}) {
  const enc = o.encuadre ?? 'tunel';
  if (enc === 'pizarra') return d_gPizarra(R, t, o);
  if (enc === 'mesa') return d_gMesa(R, t, o);
  if (enc === 'parque') return d_gParque(R, t, o);
  if (enc === 'arriba') return d_gArriba(R, t, o);
  return d_gTunel(R, t, o);
}
// ── F · la fábrica de balones de Ada, Ohio (hoy) ─────────────────────────────────────────────────────────────────────
// Oficio, calma y luz cálida de fábrica: cuero, hilo y cordones, a mano. El logotipo es inventado (un balón con una
// corona encima, sin letras). Cuatro encuadres distintos (o.encuadre):
//   · 'calle' (por defecto): la calle mayor de Ada. Cielo tramado con cúmulos de tres tonos a varias velocidades, cirros,
//     la estela de un avión y golondrinas; al fondo el depósito de agua, la torre de la iglesia, el silo y los campos de
//     maíz; a la izquierda tres comercios de ladrillo de dos plantas (toldos, escaparates: la tienda de deportes con
//     balones, la cafetería, la barbería con su poste que gira, la bandera de EE. UU. que ondea); a la derecha la fábrica:
//     nave de ladrillo con tejado en diente de sierra, ventanales, el logotipo en un medallón crema, la entrada con
//     marquesina y el muelle de carga con dos puertas (una abierta, con cajas y un operario que lleva una carretilla al
//     camión de caja aparcado de lado); el vapor del respiradero; la acera de losas con farolas, banco, buzón, boca de
//     riego y maceteros; la calzada con la doble línea amarilla, la camioneta aparcada y un tractor que pasa despacio.
//     o.luz 'dia' (por defecto) o 'noche' (cielo de estrellas, ventanas y farolas encendidas con su cono de luz, y el
//     camión que sale del muelle con los faros encendidos y cruza la calle: o.sale 0–1 lo fija; sin él, cada 16 s).
//   · 'corte': dentro, la sala de corte: ventanas altas con el pueblo detrás (nubes y el depósito), rayos de sol tramados,
//     fluorescentes colgados (uno parpadea), cerchas, pared de ladrillo pintado con zócalo verde, estantería con rollos de
//     cuero, el cuadro eléctrico con pilotos, el reloj, el extintor; la gran mesa de corte con una piel de vaca extendida
//     (con los huecos de los paneles ya cortados), plantillas, cuchilla; la troqueladora que baja cada 3 s y corta un panel;
//     la estampadora con su rollo de lámina dorada (estampa la corona y brilla); pilas de los cuatro paneles; dos cortadores
//     pequeños al fondo; el suelo de hormigón pulido con la franja amarilla y el reflejo de los tubos.
//     o.cartel (null por defecto, sin cartel): el cartel de la pared con el pictograma del cerdo, que se tacha (0–0,5) y
//     da paso a la vaca (0,5–1), para «no es de piel de cerdo».
//   · 'costura': la fila de cuatro máquinas de coser industriales con su lámpara, cada una con su costurera o costurero
//     pequeño que cose (la aguja sube y baja, el balón avanza); conos de hilo en el estante con el hilo que corre; la pared
//     de ladrillo visto con ventanales de acero (el pueblo y el depósito detrás), la estación de dar la vuelta en primer
//     término a la izquierda (o.vuelta 0–1: el balón del revés, de color carne, pasa por la barra y sale del derecho);
//     cubos con balones del revés, el carro con balones dados la vuelta, el ventilador que gira, suelo de tablas.
//   · 'cordones': la estación de los cordones (banco con el balón en su soporte, el cordón blanco que entra y sale de los
//     ojales, la lezna, el carrete de cordón), la de inflado con su manómetro grande en la pared (o.inflado 0–1 sube la
//     aguja y el balón se hincha), la báscula con su pantallita (cifras), la cinta con balones terminados que avanza, las
//     cajas con el logotipo apiladas en un palé, un tablón de corcho con dibujos de balones, la ventana a la calle y una
//     radio. o.gato (enredo 0–1; sin él, no hay gato): pinta el gato de la fábrica con su cordón en el suelo (x 150, pies
//     y 160); la escena puede pintarlo ella misma con f_gato.
export function fabricaAda(R, t, o = {}) {
  const enc = o.encuadre ?? 'calle';
  if (enc === 'corte') return e_faCorte(R, t, o);
  if (enc === 'costura') return e_faCostura(R, t, o);
  if (enc === 'cordones') return e_faCordones(R, t, o);
  return e_faCalle(R, t, o);
}
// ── G · el estadio de la patada ─────────────────────────────────────────────────────────────────────────────────────
// Dos estadios inventados, sin escudos ni letras: o.lugar 'vegas' (por defecto: cubierto; el techo translúcido con sus
// cojines lechosos, las vigas que convergen y la pasarela de focos que respiran, los estandartes de títulos inventados
// (estrella y año en dos cifras) que se mecen, la skycam que cuelga de cuatro cables y viaja, el videomarcador colgado
// (repetición de una patada, marcador con reloj y down, medidor de ruido), palcos de cristal oscuro bajo Atom, la grada
// de dos anfiteatros llena de público pequeño que bota, hace la ola y dispara flashes, y las cintas de LED que corren) o 'denver' (abierto: cielo frío de invierno
// tramado con nubes de tres tonos a tres velocidades y cuervos, las Rocosas nevadas con sus canales de roca y el bosque
// de pinos al pie, torres de focos, el marcador sobre patas, banderines al viento y un anfiteatro de público abrigado
// con gorros y bufandas y el vaho que sale; o.nieve 0–1 hace nevar en tres capas y blanquea el césped; con nieve, los
// operarios soplan la nieve de la banda). Equipos inventados: verde azulado y naranja (Las Vegas), granate y blanco
// (Denver). La banda del fondo tiene vida: el banquillo, la nevera, los fotógrafos con teleobjetivo y flash, la cadena
// de los árbitros con el indicador de «4» (cuarto down) y estufas con vaho en Denver.
//   o.encuadre:
//   · 'pateo' (por defecto): de lado, a ras de césped. El césped (y 122–179) con franjas de segado en perspectiva, las
//     líneas cada cinco yardas (gol en x ≈ 206, fondo en x ≈ 250 junto a la banda), los números 40-30-20-10 con su
//     flechita, las marcas de cada yarda, los hash, la zona de anotación pintada con sus conos, detrás la red de
//     prácticas con dos balones y el cámara de televisión que gira la cámara (x 282–300, pies en y 142), y los postes (base en x 261, y 146; travesaño de (255, 106) a (267, 110);
//     palos hasta y ≈ 48). Los pies del pateador y del que sujeta, en y = 147 (el balón, en x ≈ 156, y ≈ 143); el balón
//     sale hacia la derecha y arriba por encima del travesaño. o.linea (true por defecto) pinta la línea de bloqueo con
//     g_lineaPateo (dos tríos de linieros frente a frente, x 166–214, pies en y 156–164); o.linea false la quita.
//   · 'postes': desde la zona de anotación, de frente a los postes en Y (travesaño en y 94–96 de x 113 a 207, palos hasta
//     y 20 con sus cintas naranjas, base acolchada en x 152–168 y 104–132), la red de detrás levantada (x 92–228,
//     y 40–118) que deja ver la grada, el videomarcador entre los palos (Las Vegas) o las montañas entre ellos (Denver);
//     una paloma posada en el larguero (x 178, pies en y 93; o.paloma false la quita; o.agacha 0–1 la agacha; exportada
//     g_paloma(R, x, y, t, agacha, dir) para el gag). Suelo: la zona de anotación pintada (y 130–170) y la línea de gol
//     (y 171–174); los personajes se plantan en y 150–178.
//   · 'vestuario': el vestuario del equipo (los colores según o.lugar): taquillas de madera con casco, hombreras, la
//     camiseta con su número y la toalla; el banco acolchado; la tele de la pared con la repetición de una patada; el
//     reloj; la puerta de las duchas con vaho y goteo (x 266–319); la moqueta con el escudo inventado; el carrito de acero
//     de preparar balones (sobre él, en y 128: dos balones, cepillos, toalla y el inflador con el manómetro que tiembla) y
//     la caja de balones de patada (x 238–284), marcados con una franja blanca y su número (sin la «K»: no hay letras). El
//     pateador se planta en x ≈ 128–146 con los pies en y = 160.
//   o.aire 0–1: hace visible el aire como moléculas que tiemblan (puntitos de luz con su sombra) en todo el volumen sobre
//     el campo: más juntas en Las Vegas (nivel del mar, 100 %), unas 5/6 en Denver; con frío (o.frio 0–1, por defecto
//     igual que o.nieve) se apiñan (hasta un 12 % más) y tiemblan más despacio. Además el videomarcador pasa a mostrar la
//     comparación de un vistazo: dos cubos de aire, el del mar (ola) con 12 moléculas y el de la montaña con 10 (11 con
//     frío). o.pantalla fuerza el contenido del marcador ('repeticion', 'marcador', 'ruido', 'aire').
export function estadioPatada(R, t, o = {}) {
  const lugar = o.lugar === 'denver' ? 'denver' : 'vegas', enc = o.encuadre ?? 'pateo';
  if (enc === 'vestuario') { f_patVestuario(R, t, lugar, o); return; }
  const nieve = lugar === 'denver' ? f_patLim(o.nieve ?? 0) : 0, p = { lugar, nieve, frio: f_patLim(o.frio ?? nieve), aire: f_patLim(o.aire ?? 0) };
  if (enc === 'postes') f_patPostesPlano(R, t, p, o); else f_patPateo(R, t, p, o);
}
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

// la paleta del laboratorio del giro
const d_gC = Object.fromEntries(Object.entries({
  pared: '#c4c8bc', paredS: '#a8aca0', paredL: '#d8dbd0', junta: '#9a9e92', zocalo: '#5a6268', zocaloL: '#7a848a',
  techo: '#d6d8ce', techoS: '#b4b8ac', luz: '#f4f6ea',
  suelo: '#8a9296', sueloS: '#727a80', sueloL: '#a2aaae', sueloD: '#5c646a',
  tun: '#2e6a92', tunS: '#1e4c6e', tunL: '#4e8ab4', tunD: '#163852',
  dentro: '#26323e', dentroL: '#32404e', rejilla: '#3c4c5c',
  humo: '#eef2f4', humoS: '#a8b6c0', marca: '#5ae8f0', marcaS: '#2a9ab0',
  armario: '#8a949a', armarioS: '#6a747a', armarioL: '#a8b2b6',
  mesa: '#9a7a56', mesaS: '#74583a', mesaL: '#b8966a', mesaD: '#4e3a26',
  pantalla: '#0e1a2e', pantallaL: '#3ac8e8', curva: '#7af0a0',
  ladrillo: '#a4503c', ladrilloS: '#7a3828', ladrilloL: '#c4684e', piedraC: '#e2d8c4',
  pizarra: '#2e463a', pizarraL: '#38523f', pizarraB: '#3a5446', tiza: '#eef2ea', tizaS: '#a8b8aa', tizaA: '#f0d878', tizaC: '#8ad8f0',
  roble: '#8e6238', robleS: '#68441e', robleL: '#b07e48',
  parquet: '#b08250', parquetS: '#8a6238', parquetL: '#c89a64',
  cesped: '#5aa040', cespedS: '#468a32', cespedL: '#78bc54', cespedD: '#33702a',
  agua: '#4a86a8', aguaS: '#3a6c8e', aguaL: '#7ab4d0', aguaD: '#2c5674',
  arce: '#d8b888', arceS: '#bc9a6a', arceL: '#ead0a2', arceD: '#9c7a4c',
}).map(([k, v]) => [k, hex(v)]));

// un fondo fijo del laboratorio del giro, pintado una vez en su búfer y copiado en cada fotograma
const d_gFIJOS = new Map();

function d_gFijo(R, clave, dibuja) {
  let b = d_gFIJOS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_gFIJOS.set(clave, b); }
  R.copiar(b);
}

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function d_gMezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// aclara u oscurece (hacia c, en a) el píxel que ya hay en (x, y): luces, sombras y reflejos
function d_gTinte(R, x, y, c, a) { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, d_gMezcla(R.pget(x, y), c, a)); }

// el umbral de la trama ordenada 4 × 4 (para los degradados tramados)
const d_gBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_gUm = (x, y) => d_gBAYER[(y & 3) * 4 + (x & 3)];

// degradado tramado vertical en el rectángulo [x0, y0, x1, y1] con los colores cols de arriba abajo (respeta el recorte)
function d_gDegradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), p = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, d_gUm(x, y) < p ? cols[i + 1] : cols[i]); }
}

// cúmulo de tres tonos (sombra, cuerpo, luz) con la base plana; respeta el recorte
function d_gNube(R, cx, cy, w, c, sem = 0) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 911)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 912) - 0.5) * w * 0.05, r]); }
  for (const [x, y, r] of bolas) R.disco(x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) R.disco(x, y, r, c[1]);
  for (const [x, y, r] of bolas) R.disco(x - 1, y - 2, r * 0.66, c[2]);
  const yb = Math.round(cy + w * 0.07); R.linea(cx - w * 0.44, yb, cx + w * 0.44, yb, c[0]);
}

// el cielo de día tramado en [x0, y0, x1, y1] (ventana o cielo abierto): degradado, cirros casi quietos, nubes de tres
// tonos a dos velocidades y un par de pájaros; se recorta a su hueco
const d_gCIELO = ['#3e86cc', '#559ad8', '#70b0e2', '#90c6ea', '#b4daf0'].map(hex);

const d_gNUBE = ['#b4c4d8', '#e8eef4', '#ffffff'].map(hex);

function d_gCielo(R, t, x0, y0, x1, y1, sem = 0, bajas = false) {
  R.recorte([x0, y0, x1, y1]);
  d_gDegradado(R, x0, y0, x1, y1, d_gCIELO);
  const W = x1 - x0, H = y1 - y0;
  for (let k = 0; k < 3; k++) { const y = y0 + Math.round(H * (0.12 + k * 0.1)), x = x0 + ((h(k, sem, 913) * W * 2 + t * 0.4) % (W + 60)) - 30, w = 20 + k * 6;
    for (let i = 0; i < w; i++) { const cx = Math.round(x + i), cy = y - Math.round((i / w) ** 2 * 2); if (h(i >> 1, k, 914 + sem) > 0.3 && !(cx > 274 && cy < 48)) R.pset(cx, cy, d_gNUBE[1]); } }
  for (let k = 0; k < 4; k++) { const lejos = k >= 2, w = lejos ? 12 + k * 2 : 20 + k * 8, v = lejos ? 1.1 : 2.6 + k, y = y0 + Math.round(H * (bajas ? (lejos ? 0.4 + (k - 2) * 0.08 : 0.6 + k * 0.14) : lejos ? 0.62 + (k - 2) * 0.1 : 0.3 + k * 0.16)), x = x0 - 30 + ((h(k, sem, 915) * (W + 60) + t * v) % (W + 60));
    d_gNube(R, x, y, w, lejos ? [d_gNUBE[0], hex('#d4dee8'), d_gNUBE[1]] : d_gNUBE, k + sem); }
  for (let k = 0; k < 2; k++) { const u = ((t + k * 4 + sem) / 9) % 1, bx = Math.round(x0 - 4 + u * (W + 8)), by = Math.round(y0 + H * 0.25 + k * 6 + Math.sin(t * 1.7 + k) * 2), al = Math.sin(t * 12 + k * 2) > 0;
    R.pset(bx, by, hex('#2a3040')); R.pset(bx - 1, by - (al ? 1 : 0), hex('#2a3040')); R.pset(bx + 1, by - (al ? 1 : 0), hex('#2a3040')); }
  R.recorte(null);
}

// un árbol de copa redonda en tres tonos (luz arriba a la izquierda) que se mece; r, el radio de la copa
const d_gHOJA = ['#2e5a2a', '#447a34', '#5e9a42', '#86b85a'].map(hex);

function d_gArbol(R, x, suelo, t, r, k = 0, hoja = d_gHOJA) {
  const al = Math.round(r * 1.1), m = Math.sin(t * 1.3 + k) * r * 0.06;
  R.rect(x - 1, suelo - al, x + 1, suelo, hex('#5a4030')); R.pset(x - 1, suelo - al, hex('#7a5a40')); R.linea(x, suelo - al + 3, x - Math.round(r * 0.5), suelo - al - 2, hex('#5a4030'));
  const cy = suelo - al - r * 0.7, bolas = [];
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + k; bolas.push([x + Math.cos(a) * r * 0.5 + m, cy + Math.sin(a) * r * 0.35, r * (0.55 + 0.15 * h(i, k, 920))]); }
  bolas.push([x + m, cy - r * 0.3, r * 0.6]);
  for (const [bx, by, br] of bolas) R.disco(bx + 1, by + 1, br, hoja[0]);
  for (const [bx, by, br] of bolas) R.disco(bx, by, br, hoja[1]);
  for (const [bx, by, br] of bolas) R.disco(bx - br * 0.25, by - br * 0.3, br * 0.62, hoja[2]);
  for (let i = 0; i < r * 3; i++) { const a = h(i, k, 921) * Math.PI * 2, d = h(i, k, 922) * r * 0.9, px = Math.round(x + m + Math.cos(a) * d - r * 0.2), py = Math.round(cy - r * 0.2 + Math.sin(a) * d * 0.8);
    if (Math.sin(a) < 0.2) R.pset(px, py, h(i, k, 923) > 0.5 ? hoja[3] : hoja[2]); else R.pset(px, py, hoja[0]); }
}

// un estudiante pequeño (unas 10 px) que pasa o espera: pelo, cara, jersey, mochila y piernas que se alternan
const d_gROPA = ['#c84a3a', '#3a6aa8', '#e8b040', '#4a8a5a', '#8a4a9a', '#e8e4dc'].map(hex);

const d_gPIEL = ['#f0c8a0', '#c89064', '#8a5a3a'].map(hex);

function d_gGente(R, x, suelo, t, k, anda = true, dir = 1) {
  const ropa = d_gROPA[k % d_gROPA.length], piel = d_gPIEL[k % 3], pelo = [hex('#2a1e18'), hex('#6a4024'), hex('#d8b060')][(k * 7) % 3], p = anda ? Math.floor(t * 6 + k) % 2 : 0;
  x = Math.round(x); suelo = Math.round(suelo);
  R.rect(x - 1, suelo - 3, x - 1, suelo - (p ? 1 : 0), hex('#2a3446')); R.rect(x + 1, suelo - 3, x + 1, suelo - (p ? 0 : 1), hex('#2a3446'));
  R.rect(x - 1, suelo - 7, x + 1, suelo - 4, ropa); R.pset(x + (dir > 0 ? 1 : -1), suelo - 7, d_gMezcla(ropa, hex('#ffffff'), 0.3));
  R.rect(x - (dir > 0 ? 2 : -2), suelo - 7, x - (dir > 0 ? 2 : -2), suelo - 5, k % 2 ? hex('#3a3a4a') : hex('#8a5a2a'));
  R.rect(x - 1, suelo - 10, x + 1, suelo - 8, piel); R.rect(x - 1, suelo - 10, x + 1, suelo - 10, pelo); R.pset(x - dir, suelo - 9, pelo);
}

// las cifras pequeñas de 3 × 5 de los paneles y los relojes
const d_gDIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function d_gCifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = d_gDIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// el reloj de pared redondo (cx, cy, r) con su aguja de segundos que avanza
function d_gReloj(R, cx, cy, r, t) {
  R.disco(cx, cy, r + 1, hex('#2a2a30')); R.disco(cx, cy, r, hex('#f4f2ea')); R.disco(cx + 1, cy + 1, r - 1, hex('#e4e0d4')); R.disco(cx, cy, r - 1, hex('#f8f6ee'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 1.5)), Math.round(cy + Math.sin(a) * (r - 1.5)), hex('#4a4a52')); }
  R.linea(cx, cy, cx + Math.round(Math.cos(-1.1) * (r - 3)), cy + Math.round(Math.sin(-1.1) * (r - 3)), hex('#2a2a30'));
  R.linea(cx, cy, cx + Math.round(Math.cos(2.2) * (r - 2)), cy + Math.round(Math.sin(2.2) * (r - 2)), hex('#2a2a30'));
  const s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2; R.linea(cx, cy, cx + Math.round(Math.cos(s) * (r - 1)), cy + Math.round(Math.sin(s) * (r - 1)), hex('#c83a3a'));
  R.pset(cx, cy, hex('#c83a3a'));
}

// la geometría de la cámara de ensayo y del balón (para la escena y para la estela)
const d_gT = { x0: 98, x1: 204, y0: 64, y1: 102, bx: 150, by: 83 };

// el eje del balón (o de la peonza) que da vueltas: inclinación th y azimut fi → el vector en pantalla (vx, vy) del eje
// que apunta al viento (izquierda), con un poco de vista desde arriba (el círculo se ve como una elipse)
function d_gEje(th, fi) { const ax = -Math.cos(th), ay = -Math.sin(th) * Math.cos(fi), az = Math.sin(th) * Math.sin(fi); return [ax, ay + az * 0.45, az]; }

function d_gTunelFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, G = d_gC, K = C.k;
  // el techo de placas con las dos luminarias largas (bajas de contraste: arriba va la barra del año)
  rect(0, 0, 319, 15, G.techo); for (let x = 0; x < 320; x += 40) rect(x, 0, x, 15, G.techoS); rect(0, 7, 319, 7, G.techoS); rect(0, 15, 319, 16, G.techoS);
  for (const [x0, x1] of [[30, 120], [190, 270]]) { rect(x0, 9, x1, 13, hex('#a8aca4')); rect(x0 + 1, 10, x1 - 1, 12, G.luz); for (let x = x0 + 6; x < x1; x += 6) pset(x, 11, hex('#e0e2d8')); }
  // la pared de bloques de hormigón pintados: juntas en tresbolillo, grano del bloque, sombra bajo el techo
  rect(0, 17, 319, 125, G.pared);
  for (let y = 17; y < 126; y++) { const fila = Math.floor((y - 17) / 8), dx = fila % 2 ? 12 : 0;
    for (let x = 0; x < 320; x++) { if ((y - 17) % 8 === 7) { pset(x, y, G.junta); continue; } if ((x + dx) % 24 === 23) { pset(x, y, G.junta); continue; }
      const g = h(x, y, 930); if (g < 0.06) pset(x, y, G.paredS); else if (g > 0.95 || (y - 17) % 8 === 0) pset(x, y, G.paredL); } }
  for (let x = 0; x < 320; x++) for (let y = 17; y < 21; y++) if (d_gUm(x, y) < (21 - y) / 5) pset(x, y, G.paredS);
  // el zócalo de goma y el suelo de epoxi gris con las juntas en perspectiva, motas y el brillo de las luces
  rect(0, 122, 319, 127, G.zocalo); rect(0, 122, 319, 122, G.zocaloL);
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const g = h(x, y, 931); pset(x, y, g < 0.08 ? G.sueloS : g > 0.96 ? G.sueloL : G.suelo); }
  for (const yy of [133, 141, 152, 166]) rect(0, yy, 319, yy, G.sueloS);
  for (let k = -8; k <= 8; k++) { const xa = 160 + k * 38; linea(xa, 128, 160 + k * 80, 180, G.sueloS); }
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.abs(x - 90 - (y - 130) * 0.4); if (d < 10 && d_gUm(x, y) < 0.25 * (1 - d / 10)) pset(x, y, G.sueloL); }

  // la ventana al campus (el cristal se pinta en cada fotograma): marco de aluminio, alféizar y la persiana recogida
  rect(4, 22, 58, 70, hex('#5a646c')); rect(5, 23, 57, 69, hex('#c8d0d4')); rect(6, 24, 56, 68, K);
  rect(2, 70, 60, 73, hex('#d8dcd4')); rect(2, 73, 60, 73, G.paredS);
  // el armario eléctrico bajo la ventana: dos puertas, rejillas, amperímetros, la seta de emergencia
  rect(2, 78, 56, 131, K); rect(3, 79, 55, 130, G.armario); rect(3, 79, 55, 80, G.armarioL); rect(29, 79, 29, 130, G.armarioS); rect(3, 128, 55, 130, G.armarioS);
  for (const x of [26, 32]) rect(x, 100, x, 108, hex('#3a3e44'));
  for (let y = 116; y < 126; y += 2) { rect(6, y, 24, y, G.armarioS); rect(34, y, 52, y, G.armarioS); }
  for (const [cx, cy] of [[11, 89], [21, 89]]) { disco(cx, cy, 4, K); disco(cx, cy, 3, hex('#f2efe4')); linea(cx - 2, cy + 1, cx + 2, cy + 1, hex('#8a8a8a')); }
  rect(36, 84, 52, 94, K); rect(37, 85, 51, 93, hex('#1a2a1e'));
  rect(4, 131, 54, 132, hex('#4a5054'));
  // los cables del armario al túnel por la canaleta del zócalo
  rect(56, 118, 62, 121, hex('#4a5054')); rect(56, 118, 62, 118, hex('#6a7074'));

  // la bandeja de cables por encima del túnel, con sus soportes, y los pictogramas (ruido, ventilador, gafas)
  rect(60, 26, 276, 29, hex('#7a8288')); rect(60, 26, 276, 26, hex('#a8b0b4')); for (let x = 64; x < 276; x += 6) pset(x, 28, hex('#5a6268'));
  for (const x of [70, 150, 230]) rect(x, 17, x + 1, 26, hex('#5a6268'));
  for (let x = 62; x < 274; x += 3) pset(x, 25, [hex('#2a2a30'), hex('#c83a3a'), hex('#3a6aa8')][Math.floor(x / 3) % 3]);
  const picto = (x, y, c, dib) => { rect(x, y, x + 10, y + 10, K); rect(x + 1, y + 1, x + 9, y + 9, c); dib(x + 1, y + 1); };
  picto(64, 36, hex('#3a6aa8'), (x, y) => { rect(x + 1, y + 2, x + 2, y + 6, C.blanco); rect(x + 6, y + 2, x + 7, y + 6, C.blanco); linea(x + 2, y + 1, x + 6, y + 1, C.blanco); });
  picto(78, 36, hex('#e8c040'), (x, y) => { disco(x + 4, y + 4, 3, K); disco(x + 4, y + 4, 1, hex('#e8c040')); linea(x + 1, y + 1, x + 7, y + 7, K); });
  picto(92, 36, hex('#3a6aa8'), (x, y) => { rect(x + 1, y + 3, x + 7, y + 5, C.blanco); rect(x + 2, y + 4, x + 3, y + 4, hex('#3a6aa8')); rect(x + 5, y + 4, x + 6, y + 4, hex('#3a6aa8')); });
  // el póster del pase en espiral (sin letras): la parábola y el balón con las flechas del giro
  rect(162, 33, 204, 58, K); rect(163, 34, 203, 57, hex('#f4f0e2')); rect(163, 34, 203, 37, hex('#2e6a92'));
  for (let i = 0; i < 36; i++) { const u = i / 35, x = 166 + u * 34, y = 54 - Math.sin(u * Math.PI) * 13; pset(Math.round(x), Math.round(y), i % 2 ? hex('#c83a3a') : hex('#8a4a24')); }
  disco(183, 40, 2, hex('#8a4a24')); pset(186, 39, hex('#8a4a24')); pset(180, 41, hex('#8a4a24')); linea(178, 44, 188, 44, hex('#3a6aa8')); pset(187, 43, hex('#3a6aa8'));
  for (let y = 50; y < 56; y += 2) rect(193, y, 201, y, hex('#a8a090'));
  // el tablón de corcho con hojas y fotos pinchadas
  rect(110, 34, 154, 58, hex('#6a4a2a')); rect(111, 35, 153, 57, hex('#c89a62')); for (let k = 0; k < 40; k++) pset(111 + Math.floor(h(k, 1, 932) * 42), 35 + Math.floor(h(k, 2, 932) * 22), hex('#a87a48'));
  for (const [x, y, w, al, c] of [[114, 38, 10, 13, '#f4f2ea'], [127, 37, 12, 9, '#e8f0f4'], [142, 40, 9, 12, '#f8e8a0'], [128, 48, 13, 7, '#f4f2ea']]) { rect(x + 1, y + 1, x + w + 1, y + al + 1, hex('#8a6a40')); rect(x, y, x + w, y + al, hex(c)); for (let yy = y + 2; yy < y + al - 1; yy += 2) rect(x + 2, yy, x + w - 2 - (yy % 3), yy, hex('#a8a8b0')); pset(x + Math.round(w / 2), y + 1, hex('#c83a3a')); }
  rect(129, 38, 137, 44, hex('#5a8ab0')); rect(129, 42, 137, 44, hex('#5aa040'));

  // el túnel: las patas y la viga de abajo
  for (const x of [72, 112, 190, 232, 262]) { rect(x, 106, x + 3, 136, G.tunD); rect(x, 106, x, 136, G.tunS); rect(x - 2, 136, x + 5, 138, K); }
  rect(66, 108, 276, 111, G.tunD); rect(66, 108, 276, 108, G.tunS);
  // la boca: la tobera que se estrecha, con su panal de abeja y el labio
  poligono([[60, 54], [98, 62], [98, 104], [60, 112]], G.tunS);
  poligono([[62, 56], [98, 63], [98, 66], [62, 61]], G.tunL);
  poligono([[62, 61], [98, 66], [98, 102], [62, 108]], G.tun);
  for (let x = 64; x < 96; x += 4) { const yy = 58 + (x - 60) * 0.21; linea(x, Math.round(yy), x, Math.round(yy + 50 - (x - 60) * 0.42), G.tunS); }
  rect(56, 52, 62, 114, K); rect(57, 53, 61, 113, G.tunD);
  for (let y = 55; y < 112; y += 3) for (let x = 57; x < 62; x += 2) pset(x + ((y / 3) % 2), y, hex('#5a7a92'));
  // la cámara de ensayo: el marco de perfiles con remaches, el cristal, la base con el contador
  const T0 = d_gT;
  rect(T0.x0 - 2, T0.y0 - 4, T0.x1 + 2, T0.y0 - 1, G.tunS); rect(T0.x0 - 2, T0.y0 - 4, T0.x1 + 2, T0.y0 - 4, G.tunL);
  rect(T0.x0 - 2, T0.y1 + 1, T0.x1 + 2, T0.y1 + 7, G.tunS); rect(T0.x0 - 2, T0.y1 + 1, T0.x1 + 2, T0.y1 + 1, G.tunL); rect(T0.x0 - 2, T0.y1 + 7, T0.x1 + 2, T0.y1 + 7, G.tunD);
  for (let x = T0.x0 + 2; x < T0.x1; x += 8) { pset(x, T0.y0 - 3, G.tunD); pset(x, T0.y1 + 5, G.tunD); }
  for (const x of [T0.x0 - 2, T0.x1 - 1]) { rect(x, T0.y0 - 4, x + 3, T0.y1 + 7, G.tunS); rect(x, T0.y0 - 4, x, T0.y1 + 7, G.tunL); }
  // el contador del giro (se pinta en cada fotograma): su caja
  rect(134, T0.y1 + 9, 166, T0.y1 + 19, K); rect(135, T0.y1 + 10, 165, T0.y1 + 18, hex('#3a4248'));
  // el difusor que se abre hasta el ventilador
  poligono([[T0.x1 + 2, T0.y0 - 4], [240, 56], [240, 110], [T0.x1 + 2, T0.y1 + 7]], G.tunS);
  poligono([[T0.x1 + 2, T0.y0 - 2], [240, 58], [240, 62], [T0.x1 + 2, T0.y0 + 1]], G.tunL);
  poligono([[T0.x1 + 2, T0.y0 + 1], [240, 62], [240, 108], [T0.x1 + 2, T0.y1 + 5]], G.tun);
  for (let x = 212; x < 240; x += 8) { const a = (x - 206) / 34; linea(x, Math.round(T0.y0 - 2 - a * 6), x, Math.round(T0.y1 + 5 + a * 3), G.tunS); }
  // la carcasa del ventilador: el tambor con sus aros y tornillos (el ventilador se pinta en cada fotograma)
  disco(258, 84, 27, K); disco(258, 84, 26, G.tunS); disco(257, 83, 25, G.tun); disco(258, 84, 22, K);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(258 + Math.cos(a) * 24), Math.round(84 + Math.sin(a) * 24), G.tunL); }
  rect(246, 110, 270, 120, G.tunD); rect(246, 110, 270, 110, G.tunS); rect(250, 113, 266, 118, hex('#5a6268')); for (let x = 252; x < 266; x += 3) rect(x, 114, x, 117, hex('#3a4248'));
  // el armario de control junto al túnel, a la derecha, bajo la zona tranquila
  rect(282, 58, 316, 120, K); rect(283, 59, 315, 119, G.armario); rect(283, 59, 315, 60, G.armarioL); rect(283, 118, 315, 119, G.armarioS);
  rect(287, 64, 311, 78, K); rect(288, 65, 310, 77, hex('#14201a'));
  for (let y = 96; y < 116; y += 3) rect(287, y, 311, y, G.armarioS);
  // la franja de seguridad amarilla y negra en el suelo, delante del túnel
  for (let x = 58; x < 280; x++) for (let y = 141; y < 144; y++) pset(x, y, Math.floor((x + y) / 4) % 2 ? hex('#e8c040') : hex('#2a2a30'));
  // el reflejo del túnel en el epoxi (tenue, partido por las juntas)
  for (let y = 146; y < 160; y++) for (let x = 64; x < 274; x++) if (d_gUm(x, y) < 0.18 * (1 - (y - 146) / 14) && y !== 152) pset(x, y, d_gMezcla(R.pget(x, y), G.tun, 0.5));
}

// el lanzador de balones: dos ruedas de goma en su horquilla, la rampa, el trípode y la cesta de balones al lado
function d_gLanzador(R, x, suelo, t, gira) {
  const { rect, pset, linea, disco } = R, K = C.k;
  for (const [dx, dy] of [[-12, 0], [12, 0], [0, -3]]) linea(x, suelo - 22, x + dx, suelo + dy, hex('#3a3e44'));
  rect(x - 2, suelo - 26, x + 2, suelo - 20, hex('#5a6268'));
  rect(x - 14, suelo - 38, x + 10, suelo - 26, K); rect(x - 13, suelo - 37, x + 9, suelo - 27, hex('#d8d4c8')); rect(x - 13, suelo - 37, x + 9, suelo - 36, C.blanco);
  for (const [cx, cy] of [[x - 6, suelo - 41], [x - 6, suelo - 22]]) { disco(cx, cy, 6, K); disco(cx, cy, 5, hex('#3a3a40')); disco(cx, cy, 2, hex('#8a9098'));
    const a = t * 9 * gira; for (let k = 0; k < 3; k++) { const b = a + k * 2.09; pset(Math.round(cx + Math.cos(b) * 4), Math.round(cy + Math.sin(b) * 4), hex('#6a6a70')); } }
  rect(x + 2, suelo - 33, x + 16, suelo - 30, hex('#8a9098')); rect(x + 2, suelo - 33, x + 16, suelo - 33, hex('#b8c0c8'));
  pset(x + 7, suelo - 28, gira > 0 ? (Math.floor(t * 2) % 2 ? hex('#5af07a') : hex('#2a7a3a')) : hex('#7a2a2a'));
  // la cesta de alambre con balones de hoy (el cuero, los cordones, el brillo)
  rect(x - 34, suelo - 14, x - 16, suelo, K); rect(x - 33, suelo - 13, x - 17, suelo - 1, hex('#5a6268'));
  for (let k = 0; k < 4; k++) { const bx = x - 30 + k * 4, by = suelo - 15 - (k % 2) * 2; R.disco(bx, by, 3, C.cuero); pset(bx - 1, by - 2, C.cueroL); pset(bx, by - 1, C.cordon); pset(bx + 1, by - 1, C.cordon); }
  for (let xx = x - 33; xx < x - 16; xx += 3) rect(xx, suelo - 13, xx, suelo - 1, hex('#8a9098'));
  rect(x - 33, suelo - 7, x - 17, suelo - 7, hex('#8a9098'));
}

// la cámara rápida en su trípode, mirando a la cámara de ensayo, con su cable y el piloto rojo que parpadea
function d_gCamara(R, x, suelo, t) {
  const { rect, pset, linea, disco } = R, K = C.k;
  for (const dx of [-11, 10, 2]) { linea(x, suelo - 24, x + dx, suelo, K); linea(x + 1, suelo - 24, x + dx + 1, suelo, hex('#4a5058')); }
  rect(x - 1, suelo - 30, x + 2, suelo - 24, hex('#3a3e44'));
  rect(x - 9, suelo - 40, x + 9, suelo - 30, K); rect(x - 8, suelo - 39, x + 8, suelo - 31, hex('#2a2e36')); rect(x - 8, suelo - 39, x + 8, suelo - 39, hex('#4a5058'));
  rect(x + 9, suelo - 38, x + 15, suelo - 32, K); rect(x + 10, suelo - 37, x + 14, suelo - 33, hex('#3a3e48')); rect(x + 14, suelo - 36, x + 15, suelo - 34, hex('#5a8ab0')); pset(x + 14, suelo - 37, hex('#c8e8f8'));
  rect(x - 6, suelo - 37, x + 2, suelo - 33, hex('#14202a')); d_gCifras(R, String(1000 + (Math.floor(t * 30) % 9000)).slice(0, 2), x - 5, suelo - 37, hex('#5af07a'));
  if (Math.floor(t * 2) % 2) { disco(x + 6, suelo - 42, 1, hex('#ff4a3a')); pset(x + 6, suelo - 44, hex('#ff8a7a')); } else pset(x + 6, suelo - 42, hex('#7a2a2a'));
  linea(x - 8, suelo - 31, x - 22, suelo - 2, hex('#2a2a30')); linea(x - 22, suelo - 2, x - 40, suelo - 1, hex('#2a2a30'));
}

// la mesa del monitor (a la derecha, en primer término): el monitor con la curva del giro y el círculo de la precesión,
// el teclado, la taza, los papeles que aletean con la corriente del túnel; devuelve la y de la tapa
function d_gMesaMonitor(R, t, fi, giro, viento) {
  const { rect, pset, linea, disco } = R, K = C.k, G = d_gC, top = 146;
  // la tapa de madera con su canto y las patas de metal
  rect(226, top, 319, top + 4, K); rect(227, top + 1, 319, top + 3, G.mesa); rect(227, top + 1, 319, top + 1, G.mesaL); rect(227, top + 4, 319, top + 5, G.mesaD);
  for (let x = 230; x < 320; x += 13) pset(x, top + 2, G.mesaS);
  for (const x of [230, 314]) { rect(x, top + 5, x + 2, 179, hex('#4a5058')); rect(x, top + 5, x, 179, hex('#7a8288')); }
  rect(232, top + 12, 312, top + 13, hex('#4a5058'));
  // el monitor
  rect(258, top - 6, 266, top, hex('#3a3e44')); rect(252, top - 1, 272, top, hex('#2a2e34'));
  const m0 = 232, m1 = 292, n0 = top - 40, n1 = top - 6;
  rect(m0, n0, m1, n1, K); rect(m0 + 1, n0 + 1, m1 - 1, n1 - 1, hex('#2a2e36')); rect(m0 + 3, n0 + 3, m1 - 3, n1 - 3, G.pantalla);
  R.recorte([m0 + 3, n0 + 3, m1 - 3, n1 - 3]);
  for (let x = m0 + 3; x <= m1 - 3; x += 6) for (let y = n0 + 4; y < n1 - 3; y += 2) pset(x, y, hex('#1a2a40'));
  // la curva del giro (una onda que corre: la vuelta de los cordones) a la izquierda
  for (let x = m0 + 4; x < m0 + 34; x++) { const y = n0 + 18 + Math.round(Math.sin((x - t * 40 * Math.max(0.15, giro)) * 0.45) * 6 * Math.max(0.2, giro)); pset(x, y, G.curva); if (x % 3 === 0) pset(x, n0 + 18, hex('#2a4a60')); }
  // el círculo de la precesión, visto de frente, con el punto que lo recorre y su estela
  const cx = m0 + 46, cy = n0 + 17; R.anillo(cx, cy, 9, hex('#2a5a78'), 2); pset(cx, cy, hex('#2a5a78'));
  for (let k = 0; k < 10; k++) { const a = fi - k * 0.18; pset(Math.round(cx + Math.cos(a) * 9), Math.round(cy + Math.sin(a) * 9), k === 0 ? G.marca : d_gMezcla(G.marcaS, G.pantalla, k / 12)); }
  disco(cx + Math.cos(fi) * 9, cy + Math.sin(fi) * 9, 1, G.marca);
  rect(m0 + 4, n1 - 6, m0 + 4 + Math.round(24 * giro), n1 - 5, G.pantallaL);
  R.recorte(null);
  for (let i = 0; i < 9; i++) pset(m1 - 14 + i, n0 + 3 + i, hex('#2a3a50'));
  pset(m1 - 3, n1 - 1, Math.floor(t * 1.5) % 2 ? hex('#5af07a') : hex('#2a6a3a'));
  // el teclado, el ratón, la taza con su vapor
  rect(240, top - 3, 274, top, K); rect(241, top - 2, 273, top - 1, hex('#c8ccd0')); for (let x = 242; x < 273; x += 2) pset(x, top - 2, hex('#8a9098'));
  rect(278, top - 2, 281, top, hex('#c8ccd0')); pset(279, top - 2, hex('#e8ecf0'));
  rect(284, top - 9, 291, top, K); rect(285, top - 8, 290, top - 1, hex('#e8e4dc')); rect(285, top - 6, 290, top - 4, hex('#2e6a92')); rect(291, top - 6, 293, top - 3, K); pset(292, top - 5, hex('#e8e4dc')); pset(285, top - 8, C.blanco);
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; d_gTinte(R, 287 + Math.sin(u * 6 + k) * 1.5 + u * 3, top - 10 - u * 12, hex('#ffffff'), 0.7 * (1 - u)); }
  // los papeles: uno bajo el teclado, otro que aletea con el aire del túnel (se levanta su esquina)
  const al = viento > 0 ? Math.round((Math.sin(t * 7) * 0.5 + 0.5) * 3 * viento) : 0;
  rect(262, top - 1, 280, top, hex('#f4f2ea')); for (let x = 264; x < 279; x += 3) pset(x, top - 1, hex('#a8a8b0'));
  R.poligono([[312, top + 1], [319, top + 1], [319, top - al], [314, top - al - 1]], hex('#f8f6ee')); if (al > 1) linea(314, top - al - 1, 319, top - al, hex('#c8c4b8'));
  return top;
}

// el carro de herramientas rojo con sus cajones, las llaves encima, un balón desinflado y el trapo que cuelga
function d_gCarro(R, x, suelo, t) {
  const { rect, pset, disco, linea } = R, K = C.k;
  rect(x - 12, suelo - 22, x + 12, suelo - 4, K); rect(x - 11, suelo - 21, x + 11, suelo - 5, hex('#b83030')); rect(x - 11, suelo - 21, x + 11, suelo - 20, hex('#e05a4a'));
  for (const y of [suelo - 16, suelo - 11]) { rect(x - 11, y, x + 11, y, hex('#7a1e1e')); rect(x - 3, y + 2, x + 3, y + 2, hex('#c8d0d8')); }
  rect(x - 14, suelo - 23, x + 14, suelo - 22, hex('#5a6268'));
  for (const dx of [-9, 9]) { disco(x + dx, suelo - 2, 2, K); pset(x + dx, suelo - 2, hex('#8a9098')); }
  linea(x - 10, suelo - 25, x - 2, suelo - 24, hex('#c8d0d8')); linea(x + 1, suelo - 25, x + 8, suelo - 26, hex('#8a9098')); disco(x + 9, suelo - 26, 1, hex('#8a9098'));
  R.poligono([[x - 4, suelo - 24], [x + 5, suelo - 25], [x + 7, suelo - 23], [x - 5, suelo - 23]], C.cueroS);
  const m = Math.round(Math.sin(t * 2.3) * 1); rect(x + 12, suelo - 19, x + 14, suelo - 11 + m, hex('#e8e0c8')); pset(x + 13 + m, suelo - 10 + m, hex('#e8e0c8'));
}

function d_gTunel(R, t, o) {
  const { rect, pset, linea, disco } = R, G = d_gC, K = C.k, T0 = d_gT;
  const giro = o.giro ?? 1, prec = o.precesion ?? 1, viento = o.viento ?? 1, periodo = o.periodo ?? 4.5;
  d_gFijo(R, 'tunel', () => d_gTunelFijo(R));
  // la ventana: el cielo y el campus (el edificio de ladrillo con su torre, los árboles, un estudiante que pasa)
  d_gCielo(R, t, 6, 24, 56, 68, 3);
  R.recorte([6, 24, 56, 68]);
  R.poligono([[6, 52], [20, 46], [36, 50], [57, 44], [57, 69], [6, 69]], hex('#7aa0b0'));
  rect(14, 40, 44, 62, G.ladrilloS); rect(15, 41, 43, 62, G.ladrillo); for (let y = 43; y < 62; y += 2) for (let x = 15 + (y % 4 ? 1 : 0); x < 43; x += 4) pset(x, y, G.ladrilloS);
  for (let x = 17; x < 42; x += 5) for (const y of [44, 51]) { rect(x, y, x + 2, y + 4, hex('#2a3a4a')); pset(x, y, hex('#8ac8e8')); }
  rect(26, 30, 32, 41, G.piedraC); rect(27, 32, 31, 36, G.ladrillo); R.poligono([[25, 30], [29, 25], [33, 30]], hex('#4a6a7a')); rect(28, 33, 30, 35, hex('#f4f2ea'));
  rect(6, 62, 56, 68, hex('#5aa040')); for (let x = 6; x < 57; x += 2) pset(x, 62, hex('#78bc54'));
  d_gArbol(R, 10, 66, t, 7, 1); d_gArbol(R, 50, 66, t, 8, 2);
  { const u = (t / 12) % 1, px = 2 + u * 60; d_gGente(R, px, 67, t, 2, true, 1); const v = ((t + 5) / 15) % 1; d_gGente(R, 60 - v * 60, 66, t, 4, true, -1); }
  R.recorte(null);
  // el reflejo del cristal de la ventana y el parteluz
  for (const d of [12, 36]) for (let y = 25; y < 68; y++) { const x = d + (68 - y) * 0.3; d_gTinte(R, x, y, hex('#ffffff'), 0.28); d_gTinte(R, x + 1, y, hex('#ffffff'), 0.18); d_gTinte(R, x + 4, y, hex('#ffffff'), 0.12); }
  rect(30, 24, 31, 68, hex('#c8d0d4'));
  // los pilotos del armario: verdes que parpadean, el ámbar del túnel encendido; las agujas de los amperímetros tiemblan
  for (const [cx, cy] of [[11, 89], [21, 89]]) { const a = -2.4 + 0.9 * Math.max(viento, giro) + Math.sin(t * 13 + cx) * 0.05; linea(cx, cy + 1, Math.round(cx + Math.cos(a) * 3), Math.round(cy + 1 + Math.sin(a) * 3), C.rojo); }
  for (let k = 0; k < 6; k++) { const on = h(k, Math.floor(t * 3 + k * 0.3), 933) > 0.4; pset(39 + k * 2, 87, on ? hex('#5af07a') : hex('#1e4a2a')); }
  rect(39, 90, 39 + Math.round(10 * (0.5 + 0.5 * Math.sin(t * 2))), 91, hex('#5ab8f0'));
  pset(8, 112, viento > 0 ? hex('#ffb040') : hex('#6a4a2a')); pset(12, 112, hex('#5af07a'));
  // el armario de control: la pantallita con la barra del caudal y los pilotos
  rect(289, 70, 289 + Math.round(20 * viento * (0.92 + 0.08 * Math.sin(t * 5))), 72, hex('#5af07a')); for (let k = 0; k < 5; k++) pset(290 + k * 4, 75, Math.floor(t * 2 + k) % 3 ? hex('#3ac8e8') : hex('#1e3a4a'));
  for (let k = 0; k < 3; k++) { disco(292 + k * 8, 85, 2, K); disco(292 + k * 8, 85, 1, [hex('#5af07a'), hex('#ffb040'), hex('#ff4a3a')][k]); }
  // dentro de la cámara de ensayo: la pared del fondo oscura con la rejilla de calibrar
  rect(T0.x0, T0.y0, T0.x1, T0.y1, G.dentro);
  for (let x = T0.x0 + 3; x < T0.x1; x += 8) for (let y = T0.y0 + 1; y < T0.y1; y++) if (y % 2) pset(x, y, G.rejilla);
  for (let y = T0.y0 + 4; y < T0.y1; y += 8) for (let x = T0.x0; x < T0.x1; x++) if (x % 2) pset(x, y, G.rejilla);
  for (let y = T0.y0; y < T0.y0 + 4; y++) rect(T0.x0, y, T0.x1, y, G.dentroL);
  // el peine de toberas del humo a la entrada
  for (let k = 0; k < 7; k++) { const y = T0.y0 + 5 + k * 5; rect(T0.x0, y - 1, T0.x0 + 3, y + 1, hex('#8a9098')); pset(T0.x0 + 3, y, hex('#c8d0d8')); }
  // el eje que da vueltas: inclinación y azimut (la vuelta lenta de la precesión)
  const fi = 2 * Math.PI * t / periodo, th = 0.24 * prec, [vx, vy, vz] = d_gEje(th, fi), L = 12, bx = T0.bx, by = T0.by, Rb3 = 16;
  // el humo: siete hilos (uno cada 5 px) que salen del peine, se apiñan al rozar el balón (más los de dentro) y se rizan
  // en la estela; el hilo del centro muere en la punta y renace detrás. Cada hilo es una línea tenue por la que corren
  // bocanadas más blancas
  if (viento > 0) {
    R.recorte([T0.x0 + 4, T0.y0 + 1, T0.x1, T0.y1 - 1]);
    for (let k = 0; k < 7; k++) { const d = (k - 3) * 5 + 0.5, sg = Math.sign(d);
      for (let x = T0.x0 + 4; x < T0.x1; x++) { const dx = x - bx;
        if (k === 3 && dx > -14 && dx < 11) continue;
        const g = Math.exp(-((dx / 15) ** 2)), off = k === 3 ? 0 : sg * (Rb3 * Math.exp(-Math.abs(d) / 10)) * g;
        const tras = dx > 8 ? Math.min(1, (dx - 8) / 16) : 0, riza = tras * Math.exp(-Math.abs(d) / 6) * 1.6 * Math.sin(dx * 0.42 - t * 13 * viento + k * 1.7);
        const y = Math.round(by + d + off + riza + tras * vy * 2.5 * Math.exp(-Math.abs(d) / 8));
        const f = ((x - t * 72 * viento + k * 11) % 18 + 18) % 18;
        pset(x, y, f < 11 ? (f < 2 ? G.humoS : G.humo) : d_gMezcla(G.humoS, G.dentro, 0.35)); } }
    R.recorte(null);
  }
  // la horquilla de la rótula: el poste que sube desde la base y el aro detrás del balón
  rect(bx - 1, by + 6, bx + 1, T0.y1, hex('#8a9098')); rect(bx - 1, by + 6, bx - 1, T0.y1, hex('#c8d0d8'));
  R.anillo(bx, by, 10, hex('#6a7480'), 0); disco(bx, by + 6, 2, hex('#5a6268'));
  // la estela del marcador (cian): la punta del eje deja su círculo lento
  const P = (a) => { const [ex, ey] = d_gEje(th, a); return [bx + ex * (L + 5), by + ey * (L + 5)]; };
  if (prec > 0) for (let k = 1; k < 26; k++) { const [px, py] = P(fi - k * 0.2); if (k % 2) pset(Math.round(px), Math.round(py), d_gMezcla(G.marca, G.dentro, k / 30)); }
  // la varilla del eje que asoma por las dos puntas, y el balón que gira
  const ang = Math.atan2(vy, vx), punta = [bx + vx * (L + 4), by + vy * (L + 4)], cola = [bx - vx * (L + 4), by - vy * (L + 4)];
  linea(punta[0], punta[1], cola[0], cola[1], hex('#c8d0d8'));
  balon(R, bx, by, t, { epoca: 'hoy', s: 2.2, ang, giro: t * 2.6 * giro });
  if (vz < 0) linea(punta[0], punta[1], bx + vx * (L - 1), by + vy * (L - 1), hex('#c8d0d8'));
  disco(punta[0], punta[1], 1, G.marca); pset(Math.round(cola[0]), Math.round(cola[1]), hex('#8a9098'));
  // el cristal de la cámara de ensayo: los dos reflejos diagonales y el brillo del canto
  for (const d of [T0.x0 + 14, T0.x0 + 66]) for (let y = T0.y0; y <= T0.y1; y++) { const x = d + (T0.y1 - y) * 0.5; d_gTinte(R, x, y, hex('#ffffff'), 0.22); d_gTinte(R, x + 1, y, hex('#ffffff'), 0.14); if (d === T0.x0 + 14) d_gTinte(R, x + 5, y, hex('#ffffff'), 0.1); }
  rect(T0.x0, T0.y0, T0.x1, T0.y0, hex('#8ab8d0'));
  // el contador del giro (rpm): cifras verdes y el piloto
  const rpm = o.rpm === undefined ? Math.round(600 * giro) : o.rpm;
  if (rpm != null) { const s = String(rpm), n = s.length; d_gCifras(R, s, 151 - n * 2, T0.y1 + 11, hex('#5af07a')); pset(137, T0.y1 + 13, Math.floor(t * 4) % 2 ? hex('#5af07a') : hex('#2a5a3a')); }
  // el ventilador grande: las palas que giran detrás de la rejilla, el cubo y la rejilla de seguridad
  { const cx = 258, cy = 84, va = Math.max(viento, giro * 0.3), a0 = t * 7 * va;
    disco(cx, cy, 21, hex('#1e2830'));
    for (let p = 0; p < 6; p++) { const a = a0 + p * Math.PI / 3; for (let r = 4; r < 21; r++) for (let w = -0.18; w <= 0.2; w += 0.06) { const b = a + w + r * 0.012; pset(Math.round(cx + Math.cos(b) * r), Math.round(cy + Math.sin(b) * r), w > 0.1 ? hex('#a8b4c0') : hex('#7a8896')); } }
    disco(cx, cy, 4, hex('#3a4450')); disco(cx - 1, cy - 1, 2, hex('#8a98a8'));
    for (let r = 7; r < 22; r += 5) R.anillo(cx, cy, r, hex('#3a4450'), 0);
    linea(cx - 21, cy, cx + 21, cy, hex('#3a4450')); linea(cx, cy - 21, cx, cy + 21, hex('#3a4450')); }
  // primer término: el lanzador de balones a la izquierda, la cámara rápida en su trípode y la mesa del monitor
  d_gLanzador(R, 52, 168, t, Math.max(giro * 0.4, 0));
  d_gCamara(R, 92, 174, t);
  d_gCarro(R, 210, 160, t);
  const top = d_gMesaMonitor(R, t, fi, giro, viento);
  let pz = null;
  if (o.peonza) { pz = [303, top + 1]; e_peonza(R, pz[0], pz[1], t, { s: 1.3, precesion: prec, periodo, giro: Math.max(giro, 0.5), rastro: true }); }
  return { bola: [bx, by], punta: [Math.round(punta[0]), Math.round(punta[1])], cola: [Math.round(cola[0]), Math.round(cola[1])], ang, peonza: pz };
}

// Una peonza de madera torneada con sus anillos de colores (rojo, crema, azul), la punta de metal y el mango, apoyada
// por la punta en (x, y). o.s escala (1: unos 15 px de alto); o.giro 0–1 (1 por defecto: las franjas pintadas corren y
// el brillo tiembla; 0, quieta); o.precesion 0–1 (1 por defecto): el eje, inclinado, traza un círculo lento alrededor
// de la vertical (una vuelta cada o.periodo s, 4,5 por defecto, como el balón del túnel), no cabecea deprisa; o.rastro
// (true) deja la estela cian punteada del círculo que traza el mango; o.fase desplaza la vuelta. Pinta su sombra sobre
// la mesa. Devuelve [x, y] del extremo del mango (para una flecha del eje).
const d_gPEONZA = { rojo: ['#7a1e1e', '#b83030', '#e85a4a', '#ff9a80'], crema: ['#a88a5a', '#d8bc88', '#f0dcae', '#fff4d8'], azul: ['#1e3a6a', '#2e5a9a', '#4a80c8', '#8ab8f0'], metal: ['#4a5058', '#8a9098', '#c8d0d8', '#ffffff'] };
for (const k in d_gPEONZA) d_gPEONZA[k] = d_gPEONZA[k].map(hex);

export function e_peonza(R, x, y, t, o = {}) {
  const s = o.s ?? 1, L = 15 * s, Rm = 6 * s, giro = o.giro ?? 1, prec = o.precesion ?? 1, periodo = o.periodo ?? 4.5;
  const fi = 2 * Math.PI * t / periodo + (o.fase ?? 0), th = 0.3 * prec, ex = Math.sin(th) * Math.cos(fi), ez = Math.sin(th) * Math.sin(fi), ey = -Math.cos(th);
  // el eje en pantalla (vista un poco desde arriba: la profundidad sube un poco la imagen)
  const ax = ex, ay = ey + ez * 0.3, top = [x + ax * L, y + ay * L];
  // la sombra en la mesa
  for (let j = -2; j <= 2; j++) for (let i = -Math.round(Rm * 1.2); i <= Math.round(Rm * 1.2); i++) if ((i / (Rm * 1.2)) ** 2 + (j / 2.2) ** 2 < 1) d_gTinte(R, x + i + Math.round(ex * L * 0.5) + 2, y + j + 1, hex('#2a1a10'), 0.35);
  // la estela del círculo del mango, la mitad de atrás antes del cuerpo
  const anillo = (delante) => { if (!o.rastro || prec <= 0) return; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2, d = Math.sin(a) > 0; if (d !== delante) continue; const qx = x + Math.sin(th) * Math.cos(a) * L, qy = y - Math.cos(th) * L + Math.sin(th) * Math.sin(a) * L * 0.3; if (k % 2 === 0) R.pset(Math.round(qx), Math.round(qy), d ? d_gC.marca : d_gC.marcaS); } };
  anillo(false);
  // el perfil: radio según la altura u (0 la punta, 1 el mango) y el material de cada tramo
  const perfil = (u) => u < 0.07 ? [0.12, 'metal'] : u < 0.52 ? [0.15 + (u - 0.07) / 0.45 * 0.85, u < 0.3 ? 'azul' : 'crema'] : u < 0.66 ? [Math.sqrt(1 - ((u - 0.52) / 0.16) ** 2 * 0.55), u < 0.6 ? 'rojo' : 'crema'] : u < 0.72 ? [0.55, 'rojo'] : [0.14, 'crema'];
  const sp = giro * t * 9, paso = 0.5 / L;
  for (let u = 0; u <= 1; u += paso) {
    const [rr, mat] = perfil(u), r = Math.max(0.6, rr * Rm), rx = r, ry = Math.max(0.5, r * 0.32), cx = x + ax * L * u, cy = y + ay * L * u, P = d_gPEONZA[mat];
    for (let j = Math.floor(-ry); j <= Math.ceil(ry); j++) { const q = 1 - (j / (ry + 0.3)) ** 2; if (q <= 0) continue; const hw = rx * Math.sqrt(q);
      for (let i = Math.round(-hw); i <= Math.round(hw); i++) { const lx = i / (hw + 0.01); let tono = lx < -0.45 ? 2 : lx > 0.55 ? 0 : 1; if (j < 0 && u > 0.5 && u < 0.73) tono = Math.min(3, tono + 1);
        // las franjas pintadas que corren con el giro (se ven en la cara de delante)
        const ang = Math.asin(Math.max(-1, Math.min(1, lx))) + sp; if (mat !== 'metal' && u > 0.12 && u < 0.7 && j >= 0 && Math.sin(ang * 3) > 0.72) tono = Math.max(0, tono - 1);
        if (Math.abs(lx) > 0.92) tono = 0;
        R.pset(Math.round(cx + i), Math.round(cy + j), P[tono]); } }
  }
  // el brillo del hombro y la tapa, que tiembla con el giro
  const sh = 0.6, hx = x + ax * L * sh - Rm * 0.4, hy = y + ay * L * sh - 1; R.pset(Math.round(hx), Math.round(hy), d_gPEONZA.crema[3]); if (giro > 0 && Math.sin(t * 40) > 0) R.pset(Math.round(hx + 1), Math.round(hy), d_gPEONZA.crema[3]);
  R.pset(Math.round(top[0]), Math.round(top[1]), d_gPEONZA.crema[3]);
  // las rayitas de movimiento a los lados (el giro)
  if (giro > 0.2) for (const sg of [-1, 1]) { const mx = x + ax * L * 0.55 + sg * (Rm + 2), my = y + ay * L * 0.55; if (Math.floor(t * 6 + (sg > 0 ? 1 : 0)) % 2) { R.pset(Math.round(mx), Math.round(my - 1), d_gC.humoS); R.pset(Math.round(mx + sg), Math.round(my + 1), d_gC.humoS); } }
  anillo(true);
  return [Math.round(top[0]), Math.round(top[1])];
}

const d_gPZ = { x0: 26, y0: 22, x1: 262, y1: 116 };

// la parábola del pase en la pizarra: el punto u (0–1) y su tangente
function d_gParabola(u) { const x = 48 + u * 196, y = 100 - Math.sin(u * Math.PI) * 64; return [x, y, Math.atan2(-Math.cos(u * Math.PI) * 64 * Math.PI, 196)]; }

// un trazo de tiza con grano (de g px de grueso)
function d_gTiza(R, x0, y0, x1, y1, c, k = 0, g = 1) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); for (let a = 0; a < g; a++) if (h(x + a, y, 940 + k) < 0.85) R.pset(x + a, y, c); }
}

// una flecha de tiza de (x0, y0) a (x1, y1)
function d_gFlechaTiza(R, x0, y0, x1, y1, c, k = 0) {
  d_gTiza(R, x0, y0, x1, y1, c, k); const a = Math.atan2(y1 - y0, x1 - x0);
  for (const s of [-1, 1]) d_gTiza(R, x1, y1, x1 - Math.cos(a + s * 0.5) * 4, y1 - Math.sin(a + s * 0.5) * 4, c, k + 1);
}

// un balón de tiza (contorno de huso con sus cordones) centrado en (x, y), girado ang
function d_gBalonTiza(R, x, y, ang, c, k = 0) {
  const ca = Math.cos(ang), sa = Math.sin(ang);
  for (let a = 0; a < Math.PI * 2; a += 0.12) { const px = Math.cos(a) * 8, py = Math.sin(a) * 4 * (1 - 0.25 * Math.abs(Math.cos(a))); const X = Math.round(x + px * ca - py * sa), Y = Math.round(y + px * sa + py * ca); if (h(X, Y, 950 + k) < 0.88) R.pset(X, Y, c); }
  for (let i = -2; i <= 2; i++) { const X = Math.round(x + i * 1.5 * ca - (-1.5) * sa), Y = Math.round(y + i * 1.5 * sa + (-1.5) * ca); R.pset(X, Y, c); }
}

// los símbolos de tiza de las fórmulas (sin letras latinas): θ, ω, τ, =, ×, +, el círculo de giro
const d_gSIMB = {
  th: ['.##.', '#..#', '####', '#..#', '.##.'], om: ['#...#', '#...#', '#.#.#', '.#.#.'], tau: ['####', '.#..', '.#..', '.#..'],
  eq: ['###', '...', '###'], por: ['#.#', '.#.', '#.#'], mas: ['.#.', '###', '.#.'], ve: ['....#', '#####', '....#'], pa: ['.#', '#.', '#.', '#.', '.#'], pc: ['#.', '.#', '.#', '.#', '#.'],
};

function d_gSimbolo(R, k, x, y, c) { const f = d_gSIMB[k]; f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] === '#' && h(x + i, y + j, 960) < 0.92) R.pset(x + i, y + j, c); }); return f[0].length + 2; }

function d_gFormula(R, partes, x, y, c) { for (const p of partes) { if (typeof p === 'number' || /^[0-9]+$/.test(p)) { d_gCifras(R, String(p), x, y, c); x += String(p).length * 4 + 2; } else x += d_gSimbolo(R, p, x, y + (p === 'eq' || p === 'mas' || p === 'por' ? 1 : 0), c); } return x; }

function d_gPizarraFija(R) {
  const { rect, pset, linea, disco, poligono } = R, G = d_gC, K = C.k, Z = d_gPZ;
  // la pared de yeso pintado, crema, con su grano y la sombra bajo el techo; el techo con su moldura
  rect(0, 0, 319, 11, hex('#e6e2d4')); rect(0, 11, 319, 13, hex('#c8c2b0')); for (let x = 0; x < 320; x += 48) rect(x, 0, x, 10, hex('#d4cebe'));
  for (let y = 14; y < 136; y++) for (let x = 0; x < 320; x++) { const g = h(x, y, 941); pset(x, y, g < 0.05 ? hex('#cfc4a4') : g > 0.97 ? hex('#f0e8d0') : (d_gUm(x, y) < Math.max(0, (20 - y) / 8) ? hex('#d0c6a8') : hex('#e2d8bc'))); }
  // el arrimadero de madera bajo la pizarra y el rodapié
  rect(0, 122, 319, 136, G.roble); for (let x = 0; x < 320; x += 20) { rect(x, 123, x, 135, G.robleS); rect(x + 1, 123, x + 1, 135, G.robleL); } rect(0, 122, 319, 122, G.robleL); rect(0, 136, 319, 137, G.robleS);
  for (let y = 124; y < 135; y++) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 942) > 0.88) pset(x, y, G.robleS);
  // el parqué en espiga con su brillo
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y - 138, b = Math.floor((x + yy * 1.3) / 10), c = (b + Math.floor(yy / 6)) % 2, g = h(x >> 1, y, 943 + c);
    pset(x, y, ((x + Math.round(yy * 1.3)) % 10 === 0 || yy % 6 === 0) ? G.parquetS : g > 0.9 ? G.parquetL : g < 0.1 ? G.parquetS : c ? G.parquet : d_gMezcla(G.parquet, G.parquetL, 0.3)); }
  // el haz de sol de la ventana en el suelo
  poligono([[230, 140], [276, 140], [250, 180], [196, 180]], (x, y) => d_gUm(x, y) < 0.45 ? d_gMezcla(R.pget(x, y), hex('#fff0c0'), 0.35) : R.pget(x, y));
  // la pizarra: el marco de roble con su sombra, el verde con el borrón de las clases de antes
  rect(Z.x0 - 3, Z.y0 - 3, Z.x1 + 4, Z.y1 + 4, hex('#9a8a6a'));
  rect(Z.x0 - 4, Z.y0 - 4, Z.x1 + 3, Z.y1 + 3, G.robleS); rect(Z.x0 - 3, Z.y0 - 3, Z.x1 + 2, Z.y1 + 2, G.roble); rect(Z.x0 - 3, Z.y0 - 3, Z.x1 + 2, Z.y0 - 3, G.robleL); rect(Z.x0 - 3, Z.y0 - 3, Z.x0 - 3, Z.y1 + 2, G.robleL);
  for (let y = Z.y0; y <= Z.y1; y++) for (let x = Z.x0; x <= Z.x1; x++) { const g = h(x >> 2, y >> 1, 944), b = Math.sin(x * 0.05 + y * 0.12) + Math.sin(x * 0.021 - y * 0.05) * 1.4; pset(x, y, b > 1.4 && d_gUm(x, y) < 0.4 ? G.pizarraB : g > 0.93 ? G.pizarraL : G.pizarra); }
  for (let k = 0; k < 6; k++) { const x0 = Z.x0 + 20 + k * 40, y0 = Z.y0 + 10 + (k % 3) * 25; for (let i = 0; i < 26; i++) for (let j = 0; j < 4; j++) if (d_gUm(x0 + i, y0 + j * 3) < 0.25) pset(x0 + i + j, y0 + j * 3, G.pizarraB); }
  // la bandeja de las tizas
  rect(Z.x0 - 6, Z.y1 + 3, Z.x1 + 5, Z.y1 + 6, G.roble); rect(Z.x0 - 6, Z.y1 + 3, Z.x1 + 5, Z.y1 + 3, G.robleL); rect(Z.x0 - 6, Z.y1 + 7, Z.x1 + 5, Z.y1 + 7, G.robleS);
  for (let x = Z.x0; x < Z.x1; x += 2) if (h(x, 1, 945) > 0.6) pset(x, Z.y1 + 4, hex('#d8d8d0'));
  // el borrador de fieltro, las tizas (blanca, amarilla, azul) y la regla de pizarra colgada
  rect(200, Z.y1, 214, Z.y1 + 3, hex('#5a3a22')); rect(200, Z.y1, 214, Z.y1, hex('#7a5a3a')); rect(201, Z.y1 + 2, 213, Z.y1 + 3, hex('#c8c8c0'));
  for (const [x, c] of [[60, G.tiza], [66, G.tizaA], [70, G.tizaC], [176, G.tiza]]) { rect(x, Z.y1 + 2, x + 3, Z.y1 + 3, c); pset(x, Z.y1 + 3, d_gMezcla(c, K, 0.3)); }
  // el enrollable de la pantalla de proyección encima, la tubería pintada que baja por la pared
  rect(Z.x0 + 30, 15, Z.x1 - 30, 18, hex('#c8c4b8')); rect(Z.x0 + 30, 18, Z.x1 - 30, 18, hex('#9a968a')); rect(Z.x0 + 26, 14, Z.x0 + 30, 19, hex('#5a5a62')); rect(Z.x1 - 30, 14, Z.x1 - 26, 19, hex('#5a5a62'));
  // el interruptor y el termostato de la pared de la izquierda, bajo el reloj
  rect(9, 66, 15, 75, hex('#b8b09a')); rect(10, 67, 14, 74, hex('#f4f0e2')); rect(11, 69, 13, 72, hex('#d8d2c0'));
  rect(8, 84, 16, 92, hex('#b8b09a')); rect(9, 85, 15, 91, hex('#f4f0e2')); R.disco(12, 88, 2, hex('#c8c2b0'));
  // la papelera metálica junto al radiador, con un papel arrugado
  rect(264, 160, 274, 176, hex('#3a3e44')); rect(265, 161, 273, 175, hex('#6a7078')); for (let x = 266; x < 273; x += 2) rect(x, 162, x, 174, hex('#8a9098')); R.disco(268, 159, 2, hex('#f4f2ea')); R.pset(267, 158, hex('#c8c4b8'));
  // la ventana a la derecha (el cristal se pinta en cada fotograma), su alféizar y el radiador de hierro
  rect(276, 54, 316, 112, hex('#8a7a62')); rect(277, 55, 315, 111, hex('#f2ecdc')); rect(279, 57, 313, 109, K);
  rect(274, 112, 318, 115, hex('#f2ecdc')); rect(274, 115, 318, 115, hex('#b8ae96'));
  rect(280, 118, 314, 134, hex('#7a7e82')); for (let x = 282; x < 314; x += 4) { rect(x, 119, x + 2, 133, hex('#9aa0a4')); rect(x, 119, x, 133, hex('#b8bec2')); }
  // la mesa del profesor en primer término a la izquierda: tablero de roble, cajonera, y encima libros
  rect(0, 140, 62, 145, K); rect(0, 141, 62, 143, G.roble); rect(0, 141, 62, 141, G.robleL); rect(0, 144, 62, 145, G.robleS);
  rect(2, 146, 30, 179, G.robleS); rect(3, 147, 29, 179, G.roble); for (const y of [156, 167]) { rect(3, y, 29, y, G.robleS); rect(13, y - 5, 19, y - 4, hex('#c8a040')); }
  rect(56, 146, 60, 179, G.robleS);
  for (const [x, w, c] of [[4, 4, '#8a2a2a'], [8, 3, '#2a4a7a'], [11, 4, '#3a6a3a'], [15, 3, '#c8a040']]) { rect(x, 128, x + w - 1, 140, hex(c)); rect(x, 128, x + w - 1, 128, d_gMezcla(hex(c), hex('#ffffff'), 0.3)); rect(x, 131, x + w - 1, 131, hex('#e8d8a0')); }
}

function d_gPizarra(R, t, o) {
  const { rect, pset, linea, disco } = R, G = d_gC, Z = d_gPZ, u = o.u ?? 1, sol = o.solucion ?? 0;
  d_gFijo(R, 'pizarra', () => d_gPizarraFija(R));
  // la ventana: el cielo y el campus con los árboles que se mecen y un ciclista que pasa
  d_gCielo(R, t, 279, 57, 313, 109, 7);
  R.recorte([279, 57, 313, 109]);
  rect(279, 88, 313, 109, hex('#5aa040')); for (let x = 279; x < 314; x += 2) pset(x, 88, hex('#78bc54'));
  rect(286, 74, 313, 90, G.ladrillo); for (let y = 76; y < 90; y += 2) for (let x = 286 + (y % 4 ? 2 : 0); x < 314; x += 4) pset(x, y, G.ladrilloS); for (let x = 290; x < 312; x += 6) { rect(x, 78, x + 2, 82, hex('#2a3a4a')); pset(x, 78, hex('#8ac8e8')); }
  d_gArbol(R, 282, 100, t, 9, 5);
  { const v = ((t + 2) / 8) % 1, cx = 274 + v * 46; R.disco(cx - 3, 104, 2, C.k); R.disco(cx + 3, 104, 2, C.k); linea(cx - 3, 104, cx, 101, hex('#c83a3a')); linea(cx, 101, cx + 3, 104, hex('#c83a3a')); d_gGente(R, cx, 101, t, 3, false, 1); }
  R.recorte(null);
  rect(295, 57, 296, 109, hex('#f2ecdc')); rect(279, 82, 313, 83, hex('#f2ecdc'));
  for (const d of [281, 299]) for (let y = 58; y < 108; y++) d_gTinte(R, d + (108 - y) * 0.3, y, hex('#ffffff'), 0.25);
  // el polvo de tiza que flota en el haz de sol
  for (let k = 0; k < 14; k++) { const a = (t * 0.05 + h(k, 1, 946)) % 1, x = Math.round(206 + a * 70 + Math.sin(t * 0.7 + k) * 4), y = Math.round(150 - a * 90 + Math.cos(t * 0.5 + k * 2) * 3); if (x > 196 && y > 30) d_gTinte(R, x, y, hex('#fff6d8'), 0.7); }
  // el reloj de la pared, entre la pizarra y la ventana
  d_gReloj(R, 12, 46, 7, t);
  // lo dibujado con tiza: el suelo, el lanzador y el receptor (figuras de palitos), los ejes de cotas
  d_gTiza(R, Z.x0 + 10, 106, Z.x1 - 10, 106, G.tizaS, 1);
  for (const [x, dir] of [[40, 1], [252, -1]]) { R.anillo(x, 88, 3, G.tiza, 0); d_gTiza(R, x, 91, x, 99, G.tiza, 2); d_gTiza(R, x, 99, x - 3, 105, G.tiza, 3); d_gTiza(R, x, 99, x + 3, 105, G.tiza, 4); d_gTiza(R, x, 93, x + 5 * dir, 89, G.tiza, 5); d_gTiza(R, x, 93, x - 4 * dir, 97, G.tiza, 6); }
  // la parábola discontinua, que la tiza va trazando hasta u
  for (let i = 0; i <= 120 * u; i++) { const [x, y] = d_gParabola(i / 120); if (i % 6 < 4) pset(Math.round(x), Math.round(y), h(i, 1, 947) < 0.85 ? G.tiza : G.tizaS); }
  if (u < 1) { const [x, y] = d_gParabola(u); disco(x, y, 1, G.tiza); }
  // los cinco balones: con sol 0, los ejes paralelos (la punta arriba todo el vuelo: el enigma); con sol, la punta sigue
  // la curva y cada balón lleva su circulito de precesión con la flecha que da vueltas
  const balones = [];
  for (let k = 0; k < 5; k++) {
    const uk = 0.1 + k * 0.2; const [x, y, tg] = d_gParabola(uk); balones.push([Math.round(x), Math.round(y), tg]);
    if (uk > u + 0.001) continue;
    const a0 = d_gParabola(0.1)[2];
    if (sol < 1) { const c = sol > 0 ? d_gMezcla(G.tizaA, G.pizarra, sol * 0.85) : G.tizaA; d_gBalonTiza(R, x, y, a0, c, k); d_gFlechaTiza(R, x - Math.cos(a0) * 9, y - Math.sin(a0) * 9, x + Math.cos(a0) * 14, y + Math.sin(a0) * 14, c, k * 3); }
    if (sol > 0) { const ak = d_gParabola(Math.min(uk, 0.1 + (uk - 0.1) * Math.min(1, sol * 1.5)))[2], vis = sol > 0.3;
      if (vis) { d_gBalonTiza(R, x, y, ak, G.tiza, k + 10); const nx = x + Math.cos(ak) * 14, ny = y + Math.sin(ak) * 14; d_gFlechaTiza(R, x - Math.cos(ak) * 9, y - Math.sin(ak) * 9, nx, ny, G.tiza, k * 3 + 30);
        // el circulito de la precesión alrededor de la punta, con su flecha que da vueltas
        const cr = 4, ph = t * 1.4 + k; for (let a = 0; a < Math.PI * 1.6; a += 0.3) { const px = nx + Math.cos(a + ph) * cr * 0.5, py = ny + Math.sin(a + ph) * cr; pset(Math.round(px), Math.round(py), G.tizaC); }
        const af = ph + Math.PI * 1.6; pset(Math.round(nx + Math.cos(af) * cr * 0.5), Math.round(ny + Math.sin(af) * cr) - 1, G.tizaC); } }
  }
  // con la solución, el dibujo grande del centro: el balón con la punta arriba, las flechas del aire que le empujan la
  // punta por debajo y la flecha circular de la precesión alrededor de su eje (se dibuja con sol)
  if (sol > 0.25) { const q = Math.min(1, (sol - 0.25) / 0.6), cx = 146, cy = 84, a = -0.45;
    d_gBalonTiza(R, cx, cy, a, G.tiza, 90); d_gBalonTiza(R, cx, cy, a, G.tiza, 91);
    d_gTiza(R, cx - Math.cos(a) * 12, cy - Math.sin(a) * 12, cx + Math.cos(a) * 22, cy + Math.sin(a) * 22, G.tizaS, 92);
    for (let k = 0; k < 3; k++) if (q > k * 0.25) d_gFlechaTiza(R, cx + 2 + k * 5, cy + 16 + k * 2, cx + 6 + k * 4, cy + 6 + k, G.tizaA, 93 + k * 3);
    if (q > 0.75) { const nx = cx + Math.cos(a) * 22, ny = cy + Math.sin(a) * 22, ph = t * 1.4;
      for (let b = 0; b < Math.PI * 1.7; b += 0.18) pset(Math.round(nx + Math.cos(b + ph) * 4), Math.round(ny + Math.sin(b + ph) * 7), G.tizaC);
      const bf = ph + Math.PI * 1.7; d_gFlechaTiza(R, nx + Math.cos(bf - 0.3) * 4, ny + Math.sin(bf - 0.3) * 7, nx + Math.cos(bf) * 4, ny + Math.sin(bf) * 7, G.tizaC, 99); } }
  // las fórmulas de símbolos: ω = 600 arriba a la izquierda; τ = r × F con la flecha; θ en un ángulo; la peonza
  d_gFormula(R, ['om', 'eq', '600'], Z.x0 + 8, Z.y0 + 8, G.tiza);
  d_gFormula(R, ['tau', 'eq', 'pa', 've', 'por', 've', 'pc'], Z.x0 + 8, Z.y0 + 20, G.tiza);
  { const x = Z.x0 + 12, y = Z.y0 + 44; d_gTiza(R, x, y, x + 18, y, G.tizaS, 70); d_gTiza(R, x, y, x + 15, y - 9, G.tizaS, 71); for (let a = -0.54; a < 0; a += 0.1) pset(Math.round(x + Math.cos(a) * 9), Math.round(y + Math.sin(a) * 9), G.tizaA); d_gSimbolo(R, 'th', x + 11, y - 7, G.tizaA); }
  // la peonza de tiza (arriba a la derecha) con su eje inclinado y el círculo de su mango
  { const x = Z.x1 - 28, y = Z.y0 + 38, fi = t * 1.4; d_gTiza(R, x - 7, y - 12, x, y, G.tiza, 80); d_gTiza(R, x + 7, y - 12, x, y, G.tiza, 81); d_gTiza(R, x - 7, y - 12, x + 7, y - 12, G.tiza, 82); d_gTiza(R, x, y - 12, x + 2, y - 22, G.tiza, 83);
    for (let a = 0; a < Math.PI * 2; a += 0.25) pset(Math.round(x + 2 + Math.cos(a) * 7), Math.round(y - 22 + Math.sin(a) * 2.5), G.tizaC);
    pset(Math.round(x + 2 + Math.cos(fi) * 7), Math.round(y - 22 + Math.sin(fi) * 2.5), G.tizaA); d_gFlechaTiza(R, x + 10, y - 19, x + 12, y - 24, G.tizaC, 84); }
  // la mesa: la bola del mundo que gira despacio y el péndulo de Newton que choca
  { const gx = 46, gy = 126; R.disco(gx, gy, 7, hex('#2a3a5a')); R.disco(gx, gy, 6, hex('#3a78b8')); R.recorte([gx - 6, gy - 6, gx + 6, gy + 6]);
    for (let k = 0; k < 3; k++) { const px = gx - 8 + ((t * 2 + k * 6) % 18); R.disco(px, gy - 2 + k * 2, 2, hex('#6aaa4a')); } R.recorte(null); pset(gx - 3, gy - 3, hex('#a8d8f8'));
    R.anillo(gx, gy, 8, hex('#c8a040'), 2); rect(gx - 1, gy + 8, gx + 1, 139, hex('#8a7040')); rect(gx - 4, 139, gx + 4, 140, hex('#6a5030')); }
  { const x0 = 22, top = 124, base = 140; rect(x0, top, x0 + 18, top, hex('#c8d0d8')); rect(x0, top, x0, base, hex('#c8d0d8')); rect(x0 + 18, top, x0 + 18, base, hex('#c8d0d8')); rect(x0 - 2, base, x0 + 20, base, hex('#3a3a40'));
    const f = Math.sin(t * 3.4), aL = f < 0 ? f * 0.6 : 0, aR = f > 0 ? f * 0.6 : 0;
    for (let k = 0; k < 5; k++) { const px = x0 + 5 + k * 2.2, a = k === 0 ? aL : k === 4 ? aR : 0, bx = px + Math.sin(a) * 10 + (k === 0 ? -0 : 0), by = top + Math.cos(a) * 10;
      linea(px, top, bx, by, hex('#9aa0a8')); R.disco(bx, by + 1, 1.3, hex('#c8d0d8')); pset(Math.round(bx), Math.round(by), C.blanco); } }
  return { balones, cima: [Math.round(d_gParabola(0.5)[0]), Math.round(d_gParabola(0.5)[1])] };
}

function d_gMesaFija(R) {
  const { rect, pset, linea, disco, poligono } = R, G = d_gC, K = C.k;
  // la pared del fondo, desenfocada: el gris verdoso con la estantería borrosa, los libros en manchas y la ventana
  for (let y = 0; y < 92; y++) for (let x = 0; x < 320; x++) pset(x, y, d_gUm(x, y) < 0.5 + 0.25 * Math.sin(x * 0.03) ? hex('#b8bcb0') : hex('#aeb2a6'));
  // la ventana con la luz blanca, desenfocada (a la izquierda)
  for (let y = 6; y < 70; y++) for (let x = 8; x < 92; x++) { const e = Math.min(x - 8, 92 - x, y - 6, 70 - y); pset(x, y, e > 4 ? (d_gUm(x, y) < 0.5 ? hex('#f4f6ee') : hex('#e8f0f0')) : d_gUm(x, y) < e / 5 ? hex('#e8ecdc') : hex('#c8ccc0')); }
  for (let y = 6; y < 70; y++) { pset(49, y, hex('#d0d4c8')); pset(50, y, hex('#c8ccc0')); }
  for (let x = 8; x < 92; x++) { pset(x, 37, hex('#d0d4c8')); }
  // las copas de los árboles por la ventana, manchas verdes suaves
  for (const [cx, cy, r] of [[24, 54, 12], [70, 58, 14], [44, 62, 9]]) for (let y = cy - r; y < cy + r; y++) for (let x = cx - r; x < cx + r; x++) if (Math.hypot(x - cx, y - cy) < r && y < 70 && x > 8 && x < 92 && d_gUm(x, y) < 0.6) pset(x, y, Math.hypot(x - cx + 3, y - cy + 3) < r * 0.6 ? hex('#a8cc90') : hex('#8ab478'));
  // la estantería desenfocada: tablas y lomos de libros como manchas, un frasco y una maqueta
  for (const y of [50, 80]) { rect(110, y, 270, y + 3, hex('#8a7a62')); rect(110, y, 270, y, hex('#a89a80')); }
  let x = 114; for (let k = 0; k < 26; k++) { const w = 4 + Math.floor(h(k, 1, 950) * 4), al = 14 + Math.floor(h(k, 2, 950) * 10), fila = k < 13 ? 50 : 80, c = ['#8a4a3a', '#4a6a8a', '#c8a050', '#5a7a5a', '#7a5a8a', '#d8d0c0'][k % 6];
    if (k === 13) x = 114; const xx = x; for (let yy = fila - al; yy < fila; yy++) for (let i = 0; i < w; i++) if (d_gUm(xx + i, yy) < 0.85) pset(xx + i, yy, d_gMezcla(hex(c), hex('#b8bcb0'), 0.35)); x += w + 1 + (k % 4 === 0 ? 6 : 0); }
  for (let y = 36; y < 50; y++) for (let i = 0; i < 9; i++) if (Math.hypot(i - 4, (y - 43) * 1.2) < 7 && d_gUm(250 + i, y) < 0.7) pset(250 + i, y, hex('#9ac0c8'));
  for (let y = 60; y < 80; y++) for (let i = 0; i < 12; i++) if (Math.hypot(i - 6, y - 72) < 7 && d_gUm(232 + i, y) < 0.6) pset(232 + i, y, hex('#c8a07a'));
  // la mesa de arce, con su veta, las juntas de los listones y el canto delantero
  for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y - 92, cx = (x - 160) * (1 - yy * 0.002), lis = Math.floor((cx + 400) / 46);
    const v = Math.sin(yy * 0.35 + Math.sin(cx * 0.04 + lis * 1.7) * 2.2 + h(lis, yy >> 3, 951) * 0.8) + (h(x >> 2, y, 952) - 0.5) * 0.6;
    pset(x, y, Math.abs(((cx + 400) % 46)) < 1 ? G.arceD : v > 0.92 ? G.arceS : v < -0.95 ? G.arceL : G.arce); }
  rect(0, 92, 319, 93, G.arceD); rect(0, 94, 319, 94, d_gMezcla(G.arce, K, 0.15));
  // la luz de la ventana sobre la mesa (una mancha tramada que se abre hacia delante)
  for (let y = 95; y < 180; y++) for (let x = 0; x < 320; x++) { const a = (y - 95) / 85, x0 = 8 + a * 40, x1 = 92 + a * 120; if (x > x0 && x < x1 && d_gUm(x, y) < 0.32) pset(x, y, d_gMezcla(R.pget(x, y), hex('#fff6dc'), 0.45)); }
  // la libreta abierta con la curva del pase, los círculos de la precesión y las rayas
  poligono([[196, 150], [276, 146], [282, 176], [200, 180]], hex('#c8c0a8'));
  poligono([[196, 148], [276, 144], [281, 173], [199, 177]], hex('#f6f2e4'));
  linea(238, 146, 240, 175, hex('#b8b0a0'));
  for (let k = 0; k < 6; k++) { linea(201, 153 + k * 4, 235, 151 + k * 4, hex('#c8d4e8')); linea(243, 151 + k * 4, 277, 149 + k * 4, hex('#c8d4e8')); }
  for (let i = 0; i < 30; i++) { const u = i / 29; pset(Math.round(203 + u * 30), Math.round(170 - Math.sin(u * Math.PI) * 14), hex('#3a4a8a')); }
  for (let k = 0; k < 3; k++) { const cx = 250 + k * 9, cy = 158; for (let a = 0; a < 6.2; a += 0.5) pset(Math.round(cx + Math.cos(a) * 3), Math.round(cy + Math.sin(a) * 3), hex('#3a4a8a')); linea(cx, cy, cx + 3, cy - 5, hex('#c83a3a')); }
  d_gCifras(R, '600', 250, 166, hex('#3a4a8a'));
  // el lápiz y la regla
  linea(208, 140, 238, 134, hex('#e8b030')); linea(208, 141, 238, 135, hex('#c88a20')); pset(207, 141, hex('#f0c8a0')); pset(206, 141, hex('#2a2a30')); rect(238, 134, 240, 135, hex('#e87a8a'));
  poligono([[100, 170], [190, 166], [191, 171], [101, 175]], hex('#e8e4d4')); for (let k = 0; k < 18; k++) linea(102 + k * 5, 170 - k * 0.22, 102 + k * 5, 172 - k * 0.22 - (k % 2), hex('#6a6a70'));
}

function d_gMesa(R, t, o) {
  const { rect, pset, linea, disco } = R, G = d_gC, K = C.k;
  d_gFijo(R, 'mesa', () => d_gMesaFija(R));
  // las motas de polvo que flotan en la luz de la ventana
  for (let k = 0; k < 16; k++) { const a = (t * 0.04 + h(k, 3, 953)) % 1, x = Math.round(14 + h(k, 4, 953) * 140 + Math.sin(t * 0.6 + k) * 5), y = Math.round(10 + a * 120); d_gTinte(R, x, y, hex('#fffbe8'), 0.6); }
  // el café: la taza de cerámica con su asa, el café con su brillo, el vapor que sube y se riza
  { const x = 38, y = 140; R.disco(x + 3, y + 16, 9, d_gMezcla(G.arce, K, 0.35));
    rect(x - 8, y - 2, x + 8, y + 15, K); rect(x - 7, y - 1, x + 7, y + 14, hex('#e8e4dc')); rect(x - 7, y - 1, x - 5, y + 14, hex('#ffffff')); rect(x + 4, y - 1, x + 7, y + 14, hex('#c8c4bc'));
    rect(x - 7, y + 5, x + 7, y + 8, hex('#2e6a92')); rect(x + 8, y + 2, x + 12, y + 10, K); rect(x + 9, y + 3, x + 11, y + 9, hex('#e8e4dc')); rect(x + 9, y + 5, x + 9, y + 7, K);
    rect(x - 6, y - 1, x + 6, y, hex('#5a3420')); pset(x - 3, y - 1, hex('#a8704a'));
    for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1, sx = x + Math.sin(u * 7 + k * 1.3) * (2 + u * 3), sy = y - 3 - u * 34; if (u < 0.85) { d_gTinte(R, sx, sy, hex('#ffffff'), 0.6 * (1 - u)); d_gTinte(R, sx + 1, sy, hex('#ffffff'), 0.4 * (1 - u)); } } }
  // el cronómetro que corre (segundos y décimas)
  { const x = 96, y = 146; R.disco(x + 2, y + 2, 11, d_gMezcla(G.arce, K, 0.3)); R.disco(x, y, 11, K); R.disco(x, y, 10, hex('#c8d0d8')); R.disco(x - 1, y - 1, 8, hex('#e8ecf0')); rect(x - 2, y - 15, x + 2, y - 11, hex('#8a9098')); rect(x - 3, y - 16, x + 3, y - 15, K);
    rect(x - 7, y - 3, x + 7, y + 3, hex('#2a3a2a')); const s = (t * 10) % 1000, txt = String(Math.floor(s / 10) % 100).padStart(2, '0') + String(Math.floor(s) % 10); d_gCifras(R, txt, x - 6, y - 2, hex('#a8f0a0')); }
  // la otra peonza, tumbada y quieta, con su cordel enrollado; dos clips
  { const x = 78, y = 172; R.disco(x + 1, y + 2, 6, d_gMezcla(G.arce, K, 0.3)); R.poligono([[x - 8, y - 4], [x + 2, y - 7], [x + 8, y], [x + 2, y + 4], [x - 8, y + 2]], d_gPEONZA.azul[1]);
    R.poligono([[x - 8, y - 4], [x + 2, y - 7], [x + 1, y - 3], [x - 8, y - 1]], d_gPEONZA.azul[2]); rect(x - 10, y - 3, x - 8, y + 1, d_gPEONZA.crema[1]); pset(x + 8, y, d_gPEONZA.metal[2]);
    for (let k = 0; k < 4; k++) linea(x - 5 + k * 3, y - 5, x - 6 + k * 3, y + 2, hex('#e8e0c8')); linea(x - 10, y - 1, x - 22, y + 4, hex('#e8e0c8')); linea(x - 22, y + 4, x - 28, y + 2, hex('#e8e0c8')); }
  for (const [x, y] of [[178, 174], [186, 171]]) { rect(x, y, x + 5, y + 2, hex('#a8b0b8')); rect(x + 1, y + 1, x + 4, y + 1, d_gMezcla(G.arce, K, 0.1)); }
  // el balón de juguete en su soporte de alambre, con la luz
  { const x = 106, y = 118; linea(x - 9, y + 12, x - 4, y + 4, hex('#4a5058')); linea(x + 9, y + 12, x + 4, y + 4, hex('#4a5058')); rect(x - 11, y + 12, x + 11, y + 13, hex('#4a5058'));
    balon(R, x, y, t, { epoca: 'hoy', s: 1.6, ang: -0.15, giro: 0 }); }
  // el giroscopio de laboratorio: el pie, la horquilla, el aro exterior, el aro interior y el volante que gira
  { const x = 262, y = 116, a = t * 22;
    rect(x - 12, y + 26, x + 12, y + 29, K); rect(x - 11, y + 26, x + 11, y + 27, hex('#8a9098')); rect(x - 1, y + 14, x + 1, y + 26, hex('#c8d0d8'));
    R.anillo(x, y, 14, hex('#b8a060'), 0); R.anillo(x, y, 13, hex('#e8c860'), 0);
    for (let k = 0; k < 60; k++) { const b = k / 60 * Math.PI * 2, px = x + Math.cos(b) * 10 * 0.45, py = y + Math.sin(b) * 10; pset(Math.round(px), Math.round(py), Math.cos(b) > 0 ? hex('#c8d0d8') : hex('#8a9098')); }
    R.disco(x, y, 6.5, hex('#5a6268')); R.disco(x, y, 5.5, hex('#9aa4b0')); R.disco(x - 1, y - 1, 3, hex('#c8d0d8'));
    for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 2; pset(Math.round(x + Math.cos(b) * 4), Math.round(y + Math.sin(b) * 4), hex('#3a4048')); }
    linea(x - 14, y, x + 14, y, hex('#e8c860')); pset(x, y, C.blanco); }
  // la peonza grande en el centro, que gira y precesa
  const P = o.peonza ?? [160, 156], cima = e_peonza(R, P[0], P[1], t, { s: 3.2, precesion: o.precesion ?? 1, periodo: o.periodo ?? 4.5, giro: o.giro ?? 1, rastro: o.rastro ?? true });
  return { peonza: P, cima };
}

const d_gAG = { x0: 64, y0: 120, x1: 264, y1: 156 };

// la forma del estanque: una elipse irregular
const d_gEnAgua = (x, y) => { const cx = 164, cy = 138, rx = 100 + Math.sin(y * 0.3) * 3, ry = 18; return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1; };

function d_gParqueFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, G = d_gC, K = C.k;
  // el césped de todo el suelo (el cielo se pinta en cada fotograma por encima de y 100), con su trama de matas
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const g = h(x, y, 960), lejos = y < 112; pset(x, y, lejos ? (g < 0.3 ? G.cespedS : G.cesped) : g < 0.1 ? G.cespedS : g > 0.93 ? G.cespedL : (x + (y >> 1)) % 7 === 0 && g > 0.6 ? G.cespedD : G.cesped); }
  // el paseo de grava detrás del estanque, con su bordillo
  for (let y = 108; y < 116; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 961) > 0.8 ? hex('#b8a888') : h(x, y, 962) < 0.15 ? hex('#a08e6e') : hex('#d0c0a0'));
  rect(0, 116, 319, 116, hex('#a08e6e'));
  // el estanque: el borde de piedras, el agua con su degradado tramado (los reflejos se pintan en cada fotograma)
  for (let y = 116; y < 162; y++) for (let x = 40; x < 290; x++) { if (!d_gEnAgua(x, y)) { if (d_gEnAgua(x, y - 2) || d_gEnAgua(x, y + 2) || d_gEnAgua(x - 3, y) || d_gEnAgua(x + 3, y)) pset(x, y, h(x >> 1, y >> 1, 963) > 0.5 ? hex('#9a968a') : hex('#7a766c')); continue; }
    const f = (y - 120) / 36; pset(x, y, d_gUm(x, y) < f ? G.aguaS : G.agua); }
  // los juncos y las espadañas en las orillas, los nenúfares con una flor
  for (let k = 0; k < 22; k++) { const lado = k < 11, x = lado ? 66 + k * 2 : 252 + (k - 11) * 2, base = 140 + (k % 3), al = 8 + Math.floor(h(k, 1, 964) * 9); linea(x, base, x + (k % 2 ? 1 : -1), base - al, k % 3 ? hex('#3a7a2a') : hex('#5a9a3a')); if (k % 4 === 0) rect(x, base - al - 2, x, base - al + 1, hex('#6a4024')); }
  for (const [x, y] of [[110, 148], [118, 152], [214, 130], [226, 150], [98, 133]]) { R.disco(x, y, 3, hex('#3a8a3a')); pset(x + 1, y - 1, hex('#5aaa4a')); pset(x + 2, y, d_gC.agua); }
  rect(214, 129, 215, 129, hex('#f0a0c0')); pset(214, 128, hex('#ffd0e0'));
  // el banco de listones y la papelera en primer término, el sendero de losas
  for (let y = 164; y < 180; y++) for (let x = 120; x < 220; x++) { const a = x + (y - 164) * 0.6; if (a > 126 && a < 216) pset(x, y, Math.floor(a / 12) % 2 === (y > 171 ? 1 : 0) ? hex('#c8c0b0') : hex('#b8b0a0')); }
  { const bx = 254, by = 170; rect(bx - 22, by - 13, bx + 22, by - 12, G.mesaS); rect(bx - 22, by - 16, bx + 22, by - 15, G.mesa); rect(bx - 22, by - 9, bx + 22, by - 8, G.mesaL); rect(bx - 22, by - 7, bx + 22, by - 6, G.mesa); rect(bx - 22, by - 5, bx + 22, by - 5, G.mesaS);
    for (const dx of [-18, 18]) { rect(bx + dx, by - 17, bx + dx + 1, by, hex('#2a2e34')); } }
  { const x = 296, y = 176; rect(x - 5, y - 14, x + 5, y, K); rect(x - 4, y - 13, x + 4, y - 1, hex('#3a5a3a')); for (let xx = x - 3; xx < x + 4; xx += 2) rect(xx, y - 12, xx, y - 2, hex('#2a4a2a')); rect(x - 5, y - 15, x + 5, y - 14, hex('#4a6a4a')); }
}

function d_gParque(R, t, o) {
  const { rect, pset, linea, disco } = R, G = d_gC, K = C.k;
  d_gFijo(R, 'parque', () => d_gParqueFijo(R));
  // el cielo de la tarde tramado, con nubes a tres velocidades y una bandada que cruza
  d_gCielo(R, t, 0, 0, 319, 99, 11, true);
  R.recorte([0, 0, 319, 99]);
  // los cúmulos grandes, bajos (por debajo de la zona de Atom y de la barra del año), a dos velocidades
  for (let k = 0; k < 2; k++) { const w = 62 - k * 16, v = 1.4 + k * 2.2, x = -70 + ((h(k, 5, 965) * 460 + t * v) % 460), y = 66 + k * 10; d_gNube(R, x, y, w, d_gNUBE, 30 + k); }
  { const u = ((t + 1) / 14) % 1; for (let k = 0; k < 5; k++) { const bx = Math.round(330 - u * 380 + (k % 2) * 5 + k * 6), by = Math.round(40 + Math.abs(k - 2) * 3 + Math.sin(t * 1.3) * 2), al = Math.sin(t * 11 + k) > 0;
    if (bx > 270 && by < 48) continue; pset(bx, by, hex('#2a3040')); pset(bx - 1, by - (al ? 1 : 0), hex('#2a3040')); pset(bx + 1, by - (al ? 1 : 0), hex('#2a3040')); } }
  // al fondo: la colina con árboles lejanos, el edificio de ladrillo con su torre del reloj y otro bloque más bajo
  R.poligono([[0, 86], [60, 80], [140, 84], [220, 78], [320, 84], [320, 100], [0, 100]], hex('#6a9a7a'));
  for (let x = 0; x < 320; x += 7) R.disco(x + (x % 3), 85 - (x % 5), 4, hex('#5a8a6a'));
  rect(20, 62, 112, 99, G.ladrilloS); rect(21, 63, 111, 99, G.ladrillo); for (let y = 65; y < 99; y += 2) for (let x = 21 + (y % 4 ? 2 : 0); x < 111; x += 4) pset(x, y, G.ladrilloS);
  R.poligono([[18, 63], [66, 54], [114, 63]], hex('#4a5a6a')); for (let x = 26; x < 108; x += 3) pset(x, 62, hex('#3a4a5a'));
  for (let x = 26; x < 108; x += 9) for (const y of [68, 82]) { rect(x, y, x + 4, y + 8, G.piedraC); rect(x + 1, y + 1, x + 3, y + 7, hex('#3a4a5a')); pset(x + 1, y + 1, hex('#a8d0e8')); }
  rect(58, 88, 74, 99, G.piedraC); rect(61, 90, 71, 99, hex('#5a3a2a'));
  // la torre del reloj (por debajo de la barra del año): fuste de ladrillo, el reloj, el campanario y el chapitel
  rect(56, 26, 76, 63, G.ladrilloS); rect(57, 27, 75, 63, G.ladrillo); rect(57, 27, 59, 63, G.ladrilloL); for (let y = 29; y < 63; y += 2) for (let x = 57 + (y % 4 ? 2 : 0); x < 75; x += 4) pset(x, y, G.ladrilloS);
  rect(55, 36, 77, 37, G.piedraC); rect(55, 52, 77, 53, G.piedraC);
  d_gReloj(R, 66, 44, 5, t);
  R.poligono([[54, 27], [66, 16], [78, 27]], hex('#4a6a7a')); linea(66, 16, 66, 14, hex('#c8a040'));
  rect(80, 72, 140, 99, hex('#d8ccb0')); rect(80, 72, 140, 73, hex('#b8ac90')); for (let x = 84; x < 138; x += 7) { rect(x, 77, x + 3, 83, hex('#3a4a5a')); rect(x, 88, x + 3, 94, hex('#3a4a5a')); pset(x, 77, hex('#a8d0e8')); }
  // a la derecha, el bloque de cristal de los laboratorios, con reflejos de nubes que pasan
  rect(196, 58, 270, 99, hex('#4a6a7a')); for (let y = 60; y < 99; y += 6) rect(196, y, 270, y, hex('#3a5060')); for (let x = 200; x < 270; x += 10) rect(x, 58, x, 99, hex('#3a5060'));
  R.recorte([197, 59, 269, 98]); for (let k = 0; k < 3; k++) { const rx = 190 + ((t * 2 + k * 30) % 90); d_gNube(R, rx, 70 + k * 9, 16, [hex('#6a8a9a'), hex('#8aa8b8'), hex('#a8c4d0')], 40 + k); } R.recorte(null);
  rect(194, 56, 272, 58, hex('#8a9aa4'));
  R.recorte(null);
  // los árboles del parque: grandes en los lados (fuera del cielo libre del centro), medianos detrás del paseo
  d_gArbol(R, 150, 104, t, 9, 3); d_gArbol(R, 180, 106, t, 8, 4);
  d_gArbol(R, 12, 120, t, 22, 6); d_gArbol(R, 306, 122, t, 20, 7, ['#2a5226', '#3e6e30', '#56903e', '#7cb052'].map(hex));
  // las farolas del paseo
  for (const x of [44, 132, 238]) { rect(x, 92, x, 112, hex('#2a2e34')); rect(x - 2, 89, x + 2, 92, hex('#2a2e34')); pset(x, 90, hex('#f4ecc0')); rect(x - 1, 112, x + 1, 113, hex('#2a2e34')); }
  // los estudiantes que pasan por el paseo (y uno sentado en la hierba lejos)
  for (let k = 0; k < 4; k++) { const v = 8 + k * 3, u = ((t / v + h(k, 1, 966)) % 1), dir = k % 2 ? -1 : 1, x = dir > 0 ? -10 + u * 340 : 330 - u * 340; d_gGente(R, x, 114, t, k + 1, true, dir); }
  // el agua: los reflejos que tiemblan (el cielo y la torre), las ondas que corren
  for (let y = 121; y < 156; y++) for (let x = 64; x < 266; x++) { if (!d_gEnAgua(x, y)) continue; const w = Math.sin(y * 1.3 + t * 2.4 + x * 0.05);
    if (w > 0.9 && (x + y) % 3 === 0) pset(x, y, G.aguaL); else if (w < -0.95) pset(x, y, G.aguaD); }
  R.recorte([64, 120, 264, 156]);
  for (let y = 121; y < 136; y++) for (let x = 140; x < 190; x++) if (d_gEnAgua(x, y) && Math.abs(x + Math.round(Math.sin(y * 0.9 + t * 3) * 1.5) - 166) < 6 && (y % 2)) d_gTinte(R, x, y, G.ladrillo, 0.4);
  R.recorte(null);
  // los patos de fondo: dos que nadan en círculo y uno que bucea (la cola al aire)
  for (let k = 0; k < 2; k++) { const a = t * 0.25 + k * 2.5, x = 104 + k * 132 + Math.cos(a) * 10, y = 141 + Math.sin(a) * 4; d_gPatito(R, x, y, t, Math.sin(a) > 0 ? -1 : 1, k); }
  { const b = (t % 5) / 5, x = 132, y = 131; if (b < 0.6) { rect(x, y - 2, x + 2, y, hex('#6a5a4a')); pset(x + 1, y - 3, hex('#4a3a2a')); for (let k = 0; k < 2; k++) R.anillo(x + 1, y, 3 + k * 2 + b * 4, k ? G.aguaS : G.aguaL, 2); } else { d_gPatito(R, x, y, t, 1, 3); } }
  // el parterre de primer término: las flores que se mecen con la brisa
  for (let k = 0; k < 16; k++) { const x = 4 + k * 5 + Math.round(h(k, 1, 967) * 3), y = 170 + Math.round(h(k, 2, 967) * 6), m = Math.round(Math.sin(t * 1.8 + k * 0.7) * 1);
    R.linea(x, y + 4, x + m, y, G.cespedD); const c = [hex('#e84a6a'), hex('#f0d040'), hex('#f4f2ea'), hex('#a86ae0')][k % 4]; pset(x + m, y - 1, c); pset(x + m - 1, y, c); pset(x + m + 1, y, c); pset(x + m, y, hex('#e8b030')); }
  // la ardilla que cruza el césped a saltos y se para a mirar
  { const u = (t / 9) % 1, x = Math.round(330 - u * 360), salta = u > 0.45 && u < 0.55 ? 0 : Math.abs(Math.sin(t * 9)) * 3, y = Math.round(176 - salta);
    if (x > -10 && x < 330) { rect(x, y - 3, x + 4, y, hex('#a8643a')); rect(x - 1, y - 5, x, y - 3, hex('#a8643a')); pset(x - 2, y - 4, C.k); rect(x + 4, y - 7, x + 6, y - 2, hex('#c8804a')); pset(x + 6, y - 8, hex('#c8804a')); pset(x + 1, y - 2, hex('#e8c8a0')); } }
  return { agua: [d_gAG.x0, d_gAG.y0, d_gAG.x1, d_gAG.y1], pato: [176, 146] };
}

// un patito de fondo (6 px), marrón con la cabeza verde, con su estela
function d_gPatito(R, x, y, t, dir, k) {
  x = Math.round(x); y = Math.round(y + Math.sin(t * 2 + k) * 0.5);
  R.rect(x - 3, y - 2, x + 2, y, hex('#7a5a3a')); R.pset(x - 3 * dir, y - 3, hex('#5a4026')); R.rect(x + 2 * dir, y - 4, x + 2 * dir + (dir > 0 ? 1 : -1), y - 3, hex('#2a6a3a')); R.pset(x + 4 * dir, y - 3, hex('#e8b030'));
  R.pset(x - 1, y - 2, hex('#a8885a')); for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(x - (3 + i) * dir, y + (i % 2), d_gC.aguaL);
}

// Un ánade real de unos 18 px que nada con su línea de flotación en (x, y): cuerpo pardo con el ala gris y el espejuelo
// azul, la cabeza verde con el collar blanco y el pico amarillo, y las ondas que le rodean. mira (0–1): levanta y gira la
// cabeza hacia arriba y atrás (hacia el balón que pasa), frunce la ceja, eriza las plumas de la nuca y menea la cola,
// ofendido; a 1 se queda mirando. o.dir (1, mira a la derecha; -1, a la izquierda) y o.nada (true por defecto: avanza
// meciéndose). Las escenas pueden añadir un «!» o un «#» con R.icono encima.
const d_gPATO = pal({ k: '#1c1222', p: '#7a5a3a', P: '#a8845a', g: '#9a9aa4', G: '#c8c8d0', b: '#3a6ac8', v: '#2a7a4a', V: '#4aa86a', w: '#f6f2ea', y: '#e8b030', Y: '#b8801c', n: '#2a2a30', c: '#f6f2ea' });

const d_gPATO_CUERPO = [
  '..................',
  '....PPPPPPPPPP....',
  'ppPPPPGGGGGGPPPP..',
  'ppppPGGGGbbGGPPPP.',
  '.pppppGGGGbbPPPPpp',
  '..ppppppppppppppp.',
];

const d_gPATO_CABEZA = [
  '..vvv..',
  '.vVvvv.',
  '.vvvnvyy',
  '..vvvvYy',
  '...ww...',
];

const d_gPATO_MIRA = [
  'yy....',
  'Yyvv..',
  '.vvvvv',
  '.vVnvv',
  '..vvvv',
  '..vvv.',
  '..ww..',
];

export function e_pato(R, x, y, t, mira = 0, o = {}) {
  const dir = o.dir ?? 1, m = Math.max(0, Math.min(1, mira)), bob = Math.round(Math.sin(t * 2.2) * 0.6), avanza = (o.nada ?? true) ? Math.sin(t * 1.1) * 1.5 : 0;
  x = Math.round(x + avanza); y = Math.round(y + bob);
  // las ondas alrededor, que se abren despacio
  for (let k = 0; k < 2; k++) { const u = ((t * 0.6 + k * 0.5) % 1), rx = 10 + u * 8, ry = 2 + u * 1.5; for (let a = 0; a < Math.PI * 2; a += 0.22) { const px = Math.round(x + Math.cos(a) * rx), py = Math.round(y + 1 + Math.sin(a) * ry); if (Math.sin(a) > -0.2 && (Math.floor(a * 4) % 2)) R.pset(px, py, u < 0.5 ? d_gC.aguaL : d_gC.aguaS); } }
  // el cuerpo (la cola que menea cuando se ofende)
  R.dibujo(d_gPATO_CUERPO, dir > 0 ? x - 11 : x - 7, y - 6, dir, d_gPATO);
  if (m > 0.3 && Math.floor(t * 8) % 2) R.pset(x - 12 * dir, y - 5, d_gPATO.p);
  // la cabeza: de frente, o levantada y vuelta hacia arriba-atrás cuando mira
  const hx = x + 4 * dir;
  if (m < 0.5) { const sube = Math.round(m * 4); R.rect(hx, y - 7 - sube, hx + dir, y - 5, d_gPATO.v); R.dibujo(d_gPATO_CABEZA, dir > 0 ? hx - 2 : hx - 4, y - 11 - sube, dir, d_gPATO); }
  else { const hy = y - 14, x0 = dir > 0 ? hx - 3 : hx - 2; R.rect(hx - dir, hy + 6, hx, y - 5, d_gPATO.v); R.dibujo(d_gPATO_MIRA, x0, hy, dir, d_gPATO);
    // la ceja fruncida (baja hacia el pico) sobre el ojo y las plumas erizadas de la nuca
    const ex = x0 + (dir > 0 ? 3 : 2); R.pset(ex - dir, hy + 1, d_gPATO.k); R.pset(ex, hy + 2, d_gPATO.k); R.pset(ex + dir, hy + 2, d_gPATO.k);
    if (m > 0.7) { const nx = x0 + (dir > 0 ? 6 : -1); R.pset(nx, hy + 2, d_gPATO.V); R.pset(nx + dir, hy + 1, d_gPATO.v); R.pset(nx, hy + 4, d_gPATO.V); R.pset(nx + dir, hy + 4, d_gPATO.v); } }
  return [hx, y - 10];
}

const d_gCA = { yarda: 3.6, x50: 120, y0: 48, y1: 170 };

function d_gArribaFijo(R) {
  const { rect, pset, linea } = R, G = d_gC, A = d_gCA, X = (yd) => Math.round(A.x50 + yd * A.yarda);
  // la banda de fuera: el tartán oscuro de la banda, el muro y la sombra de la grada (arriba, tranquila)
  for (let y = 0; y < A.y0; y++) for (let x = 0; x < 320; x++) { const g = h(x, y, 970); pset(x, y, y < 18 ? (g < 0.5 ? hex('#3a4a3e') : hex('#344438')) : g < 0.08 ? G.cespedD : d_gMezcla(G.cespedS, hex('#20302a'), 0.45)); }
  rect(0, 17, 319, 18, hex('#4a5a50'));
  // la banda de arriba, en la sombra de la grada (tranquila: la barra del año y Atom van encima): la línea discontinua de
  // la zona de entrenadores, los bancos y las neveras vistos desde arriba, todo de poco contraste
  for (let x = 0; x < 320; x += 6) rect(x, A.y0 - 8, x + 3, A.y0 - 8, hex('#5a7a5e'));
  for (const x of [60, 92, 200, 232]) { rect(x, 24, x + 22, 28, hex('#2a3a32')); rect(x, 24, x + 22, 24, hex('#3e5046')); }
  for (const x of [130, 172]) { rect(x, 30, x + 5, 34, hex('#3e5a6a')); rect(x, 30, x + 5, 30, hex('#5a7a8a')); }
  for (let y = A.y1; y < 180; y++) for (let x = 0; x < 320; x++) { const g = h(x, y, 971); pset(x, y, y > A.y1 + 9 ? (g < 0.5 ? hex('#8a5a3e') : hex('#7e5236')) : g < 0.08 ? G.cespedD : G.cespedS); }
  // el césped segado a franjas de cinco yardas, con el grano de las matas
  for (let y = A.y0; y < A.y1; y++) for (let x = 0; x < 320; x++) { const fr = Math.floor((x - A.x50) / (A.yarda * 5) + 100) % 2, g = h(x, y, 972); pset(x, y, g < 0.07 ? G.cespedD : g > 0.94 ? G.cespedL : fr ? G.cesped : d_gMezcla(G.cesped, G.cespedL, 0.35)); }
  // la zona de anotación (inventada: franjas diagonales en dos colores, sin letras) a la derecha
  const zx = X(50);
  for (let y = A.y0; y < A.y1; y++) for (let x = zx + 1; x < 320; x++) pset(x, y, Math.floor((x + y) / 10) % 2 ? C.equipoA : C.equipoAS);
  // las líneas: las bandas, cada cinco yardas, las marcas de cada yarda (en las bandas y en los «hash marks»)
  rect(0, A.y0, 319, A.y0 + 1, C.cal); rect(0, A.y1 - 1, 319, A.y1, C.cal);
  for (let yd = -40; yd <= 50; yd += 5) { const x = X(yd); if (x < 0 || x > 319) continue; for (let y = A.y0; y < A.y1; y++) if (h(x, y, 973) < 0.95) pset(x, y, C.cal); if (yd === 50) rect(x, A.y0, x + 1, A.y1, C.cal); }
  for (let yd = -40; yd < 50; yd++) { const x = X(yd); if (x < 0 || x > 319 || yd % 5 === 0) continue; const hy = Math.round(A.y0 + (A.y1 - A.y0) * 0.42), hy2 = Math.round(A.y0 + (A.y1 - A.y0) * 0.58); for (const [y0, y1] of [[A.y0 + 2, A.y0 + 4], [A.y1 - 4, A.y1 - 2], [hy - 1, hy + 1], [hy2 - 1, hy2 + 1]]) rect(x, y0, x, y1, C.cal); }
  // los números de las yardas (10, 20… 50… 10), con sus flechitas hacia la portería más cercana
  for (let yd = -30; yd <= 40; yd += 10) { const v = 50 - Math.abs(yd), x = X(yd); if (x < 8 || x > 296) continue; const s = String(v);
    for (const yy of [A.y0 + 14, A.y1 - 20]) { R.numero(s, x, yy + 6, { centro: true, color: C.cal, sombra: false });
      if (v !== 50) { const fx = x + (yd < 0 ? -10 : 10), fd = yd < 0 ? -1 : 1; pset(fx, yy, C.cal); pset(fx + fd, yy + 1, C.cal); pset(fx, yy + 2, C.cal); } } }
  // la marca del centro del campo (un óvalo inventado, sin letras) en la yarda 50
  for (let a = 0; a < Math.PI * 2; a += 0.08) pset(Math.round(A.x50 + Math.cos(a) * 9), Math.round((A.y0 + A.y1) / 2 + Math.sin(a) * 6), hex('#e8e0b8'));
  // los banquillos y la línea de la banda: cajas de material, la nevera, los conos
  for (const x of [40, 72, 236]) { rect(x, A.y1 + 2, x + 12, A.y1 + 3, hex("#3a3a46")); rect(x, A.y1 + 2, x + 12, A.y1 + 2, hex("#5a5a66")); }
  for (const x of [104, 108]) { rect(x, A.y1 + 3, x + 2, A.y1 + 5, hex('#e8783a')); pset(x + 1, A.y1 + 4, hex('#ffffff')); }
}

function d_gArriba(R, t, o) {
  const { rect, pset, linea } = R, A = d_gCA;
  d_gFijo(R, 'arriba', () => d_gArribaFijo(R));
  // la sombra de una nube que cruza el campo despacio
  { const cx = -80 + ((t * 9) % 480), cy = 80 + Math.sin(t * 0.1) * 10; for (let y = Math.max(0, Math.round(cy - 30)); y < Math.min(180, cy + 30); y++) for (let x = Math.max(0, Math.round(cx - 60)); x < Math.min(320, cx + 60); x++) { const e = ((x - cx) / 60) ** 2 + ((y - cy) / 30) ** 2 + (h(x >> 3, y >> 3, 974) - 0.5) * 0.3; if (e < 1 && d_gUm(x, y) < 0.5 && !(x > 270 && y < 48)) d_gTinte(R, x, y, hex('#10281a'), 0.22); } }
  // la segadora pequeña con su operario, por la banda de abajo, dejando la franja más clara
  { const u = (t / 30) % 1, x = Math.round(330 - u * 360), y = A.y1 + 7; rect(x - 4, y - 2, x + 4, y + 2, hex('#c83a3a')); rect(x - 3, y - 1, x + 3, y + 1, hex('#e85a4a')); rect(x + 4, y - 1, x + 5, y + 1, hex('#2a2a30')); pset(x - 1, y, hex('#f0c8a0')); pset(x - 2, y, hex('#3a6aa8'));
    for (let i = 6; i < 30; i += 2) d_gTinte(R, x + i, y, hex('#ffffff'), 0.12); }
  // las gaviotas que cruzan, con sus sombras desplazadas en el césped
  for (let k = 0; k < 3; k++) { const u = ((t + k * 3.3) / 11) % 1, bx = Math.round(-10 + u * 340), by = Math.round(60 + k * 30 + Math.sin(t * 0.8 + k) * 6), al = Math.sin(t * 9 + k * 2) > 0;
    d_gTinte(R, bx + 8, by + 10, hex('#10281a'), 0.4); d_gTinte(R, bx + 7, by + 10, hex('#10281a'), 0.3); d_gTinte(R, bx + 9, by + 10, hex('#10281a'), 0.3);
    pset(bx, by, C.blanco); pset(bx - 1, by - (al ? 1 : -1), hex('#c8ccd4')); pset(bx + 1, by - (al ? 1 : -1), hex('#c8ccd4')); pset(bx - 2, by - (al ? 2 : -1), hex('#8a909a')); pset(bx + 2, by - (al ? 2 : -1), hex('#8a909a')); }
  return { yarda: A.yarda, x50: A.x50, y0: A.y0, y1: A.y1 };
}

// la paleta de la fábrica: ladrillo, crema, cuero, hilo, madera, hormigón y la luz cálida
const e_FA = pal({
  lad: '#a8503a', ladS: '#843a2a', ladL: '#c46a50', ladD: '#5e2a20', mort: '#c8b49a', mortS: '#9a8a76',
  tan: '#c89a6a', tanS: '#a07a50', tanL: '#e0b888', crem: '#ecdcb8', cremS: '#d0bc96', cremL: '#faf0d8',
  verP: '#5e7a5a', verPS: '#4a6248', verPL: '#7a9874', techo: '#6a5a50', techoS: '#4e4038', viga: '#8a7a6e', vigaS: '#5e5048', vigaL: '#a89a8a',
  sue: '#a8988a', sueS: '#8a7a6e', sueL: '#c4b4a2', sueR: '#ddd0bc', fra: '#e8c040', fraS: '#b89420',
  tubo: '#fffaea', tuboS: '#e8dcb0', luz: '#ffe8b0', luzL: '#fff6d8', sol: '#ffe2a8',
  piel: '#8a4a24', pielS: '#683416', pielL: '#a8603a', pielC: '#c4844e', carne: '#dcbc96', carneS: '#b8966e', carneL: '#f0d8b4',
  hilo: '#f6f2e8', hiloS: '#cdc6b6', mesa: '#9a7048', mesaS: '#74502e', mesaL: '#b88a5a', mesaD: '#4e3420',
  maq: '#3e6a72', maqS: '#2a4a52', maqL: '#6a9aa0', maqD: '#1e3238', gris: '#7a7a82', grisS: '#55555e', grisL: '#a8a8b0',
  caja: '#c8a070', cajaS: '#9a7448', cajaL: '#e0c090', cinta: '#d8c8a0',
  maiz: '#b8a848', maizS: '#8a8034', maizV: '#6a9a3a', maizVS: '#4a7a2a', bosque: '#4a6a44', bosqueS: '#365236',
  noche: '#ffd890', nocheL: '#fff0c0', ven: '#f8d070', venS: '#e0a848',
  azulT: '#3e5a8a', azulTS: '#2a4064', rojoT: '#b84a3a', verdeT: '#4a7a4a', ocreT: '#c8903a', blancoT: '#e8e4dc',
  pielP: '#e0b090', pielP2: '#a8744a', pielP3: '#6a4428', pelo1: '#4a3020', pelo2: '#c8a060', pelo3: '#1c1424', pelo4: '#8a8a94',
});

// el tramado ordenado (Bayer 4 × 4): umbral de cada píxel
const e_faBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_faU = (x, y) => e_faBAYER[((y & 3) << 2) | (x & 3)];

// cifras diminutas de 3 × 5 (pantallas, báscula, números de las puertas): solo dígitos
const e_faDIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function e_faCifras(R, txt, x, y, c) { for (const ch of txt) { const g = e_faDIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// una capa fija con huecos: se pinta una vez en su búfer (lo no pintado queda a 0, transparente) y en cada fotograma se
// copian solo sus píxeles pintados encima de lo que ya hay (un recorrido)
const e_faCAPAS = new Map();

function e_faCapa(R, clave, dibuja) {
  let b = e_faCAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_faCAPAS.set(clave, b); }
  const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; }
}

// los cielos ricos (como en th-comun.js): bandas con transición tramada, nubes de tres tonos
const e_faCIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d8ecee']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3e3e6a']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const e_faNUBES = { dia: ['#a8d6f2', '#d8eefc', '#ffffff'].map(hex), noche: ['#1a2048', '#262e58', '#343e6c'].map(hex) };

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function e_faNube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// el cielo de Ohio (copia de d_cieloD de th-comun.js, recortada): bandas tramadas, el sol con su halo, la estela de un
// avión, cirros lentos y cúmulos a varias velocidades; de noche, estrellas que titilan, la luna creciente y una fugaz.
// o.hor, o.modo ('dia' | 'noche'), o.sol [x, y, r], o.luna [x, y, r], o.estela [y, pendiente], o.cumulos
function e_faCielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = e_faCIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = e_faU(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;
  if (modo === 'noche') {
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? C.blanco : hex('#8a94c0'); }
    const [lx, ly, lr] = o.luna ?? [200, 26, 6];
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? hex('#c8c0a8') : hex('#f4ecd0'); else if (d > lr && d < lr + 4 && e_faU(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = e_mezcla(B[y * 320 + x], hex('#f4ecd0'), 0.25); }
    { const k = Math.floor(t / 7), u = (t % 7) / 0.7; if (u < 1) { const x0 = 30 + h(k, 1, 305) * 190, y0 = 18 + h(k, 2, 305) * hor * 0.3; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 60 - i * 1.7), y = Math.round(y0 + u * 22 - i * 0.6); if (y >= 0 && y < hor && !atom(x, y)) pset(x, y, i < 2 ? C.blanco : hex('#8a94c0')); } } }
  } else if (o.sol !== null) {
    const [sx, sy, sr] = o.sol ?? [226, 22, 8], R2 = sr + 10;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (e_faU(x, y) < q * q) B[y * 320 + x] = e_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.42); }
  }
  if (o.estela !== null && modo !== 'noche') {
    const [e0, pe] = o.estela ?? [hor * 0.45, 0.04], u = ((t + 3) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe);
    for (let i = 3; i < 190; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 1 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
      if (e_faU(x, y) < d) B[y * 320 + x] = hex('#f4f8fc'); if (i > 18 && e_faU(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = hex('#cfe4f4'); }
    if (ax >= 0 && ax < 320 && !atom(ax, ay)) { R.rect(ax - 2, ay, ax + 1, ay, C.blanco); pset(ax - 1, ay - 1, C.grisL); if (Math.floor(t * 2.5) % 2) pset(ax + 1, ay, C.rojo); }
  }
  const cn = e_faNUBES[modo];
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.3) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    if (x + w / 2 > 268 && y < 50) continue;   // la esquina de Atom, tranquila
    e_faNube(R, Math.round(x), y, w, k, cn); }
  if (modo === 'dia' && o.sol !== null) { const [sx, sy, sr] = o.sol ?? [226, 22, 8]; R.disco(sx, sy, sr + 1, C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }
}

// paño de ladrillo: hiladas de 4 px a matajunta, cada pieza con su tono, el canto de arriba con luz y algún desconchón;
// c = [cuerpo, sombra, luz, mortero]; k cambia el reparto
function e_faLadrillos(R, x0, y0, x1, y1, k = 0, c = [e_FA.lad, e_FA.ladS, e_FA.ladL, e_FA.mort]) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / 4), r = (y - y0) % 4, f = y * 320;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const xx = x - x0 + (fila & 1) * 4, pieza = Math.floor(xx / 8), q = xx % 8;
      let col; if (r === 3 || q === 7) col = c[3];
      else { const v = h(pieza, fila, 500 + k); col = v < 0.2 ? c[1] : v > 0.85 ? c[2] : c[0]; if (r === 0 && q < 6 && v > 0.45) col = c[2]; if (h(x, y, 501 + k) < 0.045) col = c[1]; }
      B[f + x] = col; } }
}

// el logotipo inventado de la fábrica: un balón de lado con sus cordones y una corona de tres puntas encima, sin letras;
// s escala (1: unos 14 × 12 px)
function e_faLogo(R, cx, cy, s = 1, cols = null) {
  const { pset } = R, [cp, cpS, cpL, ch, co, coS] = cols ?? [e_FA.piel, e_FA.pielS, e_FA.pielL, e_FA.hilo, C.oro, C.oroS];
  const L = 7 * s, W = 4 * s, by = cy + 2 * s;
  for (let j = -W; j <= W; j++) for (let i = -L; i <= L; i++) { const e = (i / L) ** 2 + 0, w = W * (1 - e) ** 0.7; if (Math.abs(j) > w) continue; const borde = Math.abs(j) > w - 1 || Math.abs(i) > L - 1;
    pset(cx + i, by + j, borde ? C.k : j < -w * 0.3 && i < L * 0.3 ? cpL : j > w * 0.4 ? cpS : cp); }
  for (let i = -Math.round(L * 0.45); i <= Math.round(L * 0.45); i++) pset(cx + i, by - Math.round(W * 0.35), ch);
  for (let i = -Math.round(L * 0.4); i <= Math.round(L * 0.4); i += Math.max(2, s + 1)) { pset(cx + i, by - Math.round(W * 0.35) - 1, ch); pset(cx + i, by - Math.round(W * 0.35) + 1, ch); }
  // la corona
  const cy0 = by - W - 1, cw = Math.round(4 * s);
  for (let i = -cw; i <= cw; i++) for (let j = 0; j < Math.max(2, Math.round(1.5 * s)); j++) pset(cx + i, cy0 - j, j === 0 ? coS : co);
  for (const px of [-cw, 0, cw]) { const alto = Math.round((px === 0 ? 3.2 : 2.4) * s); for (let j = 0; j < alto; j++) { const w = Math.max(0, Math.round((alto - j) / alto * s * 0.8)); for (let i = -w; i <= w; i++) pset(cx + px + i, cy0 - Math.max(2, Math.round(1.5 * s)) - j, co); }
    pset(cx + px, cy0 - Math.max(2, Math.round(1.5 * s)) - alto, C.oroL); }
}

// un balón de hoy de lado, pequeño (l: la mitad del largo); o.reves: del revés (color carne, áspero, las costuras
// fuera); o.cordon (0–1): cuántas puntadas de cordón lleva; o.hinchado (0–1): de deshinchado y arrugado a terso
function e_faBalon(R, cx, cy, l = 6, o = {}) {
  const { pset } = R, rev = !!o.reves, hin = o.hinchado ?? 1, W = Math.max(2, Math.round(l * (0.42 + 0.2 * hin))), cord = o.cordon ?? 1;
  const c = rev ? [e_FA.carne, e_FA.carneS, e_FA.carneL] : [e_FA.piel, e_FA.pielS, e_FA.pielL];
  for (let j = -W; j <= W; j++) for (let i = -l; i <= l; i++) { const w = W * Math.sqrt(Math.max(0, 1 - (i / l) ** 2)) ** 0.8; if (Math.abs(j) > w + 0.2) continue;
    const borde = Math.abs(j) > w - 0.8; let col = borde ? C.k : j < -w * 0.35 && i < l * 0.2 ? c[2] : j > w * 0.35 ? c[1] : c[0];
    if (!borde && rev && h(i + cx, j + cy, 520) < 0.18) col = c[1];
    if (!borde && hin < 0.7 && (i + Math.round(j * 0.5)) % 3 === 0) col = c[1];
    pset(cx + i, cy + j, col); }
  if (rev) { for (let i = -l + 2; i <= l - 2; i++) pset(cx + i, cy, e_FA.carneS); return; }
  pset(cx - Math.round(l * 0.4), cy - W + 2, e_FA.cremL);
  const n = Math.max(1, Math.round(4 * cord)), y0 = cy - Math.round(W * 0.45);
  if (cord > 0) for (let i = -Math.round(l * 0.4); i <= -Math.round(l * 0.4) + n * 2; i++) pset(cx + i, y0, e_FA.hilo);
  for (let k = 0; k < n; k++) { const x = cx - Math.round(l * 0.4) + k * 2; pset(x, y0 - 1, e_FA.hilo); pset(x, y0 + 1, e_FA.hiloS); }
}

// una caja de cartón de balones terminados: solapas, cinta, la corona estampada y su sombra
function e_faCaja(R, x0, y0, x1, y1, k = 0) {
  const { rect, pset } = R;
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, e_FA.caja); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, e_FA.cajaL); rect(x1 - 2, y0 + 3, x1 - 1, y1 - 1, e_FA.cajaS);
  rect(Math.round((x0 + x1) / 2), y0 + 1, Math.round((x0 + x1) / 2), y0 + 4, e_FA.cinta); rect(x0 + 1, y0 + 3, x1 - 1, y0 + 3, e_FA.cajaS);
  for (let i = 0; i < 4; i++) pset(x0 + 2 + Math.floor(h(i, k, 530) * (x1 - x0 - 4)), y0 + 5 + Math.floor(h(i, k, 531) * Math.max(1, y1 - y0 - 7)), e_FA.cajaS);
  if (x1 - x0 > 12 && y1 - y0 > 10) e_faLogo(R, Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2) + 1, 1, [e_FA.cajaS, e_FA.mesaS, e_FA.cajaS, e_FA.caja, e_FA.mesaS, e_FA.mesaS]);
}

// una figura de fondo (unos 12 px: no es del elenco): piernas, cuerpo, delantal, brazos y cabeza; o.c camisa, o.del
// delantal, o.anda, o.trabaja (los brazos se mueven a la altura de la mesa), o.dir, o.fase, o.sentado, o.carga (lleva una
// caja delante)
function e_faFigura(R, x, suelo, t, o = {}) {
  const { rect, pset } = R, d = o.dir ?? 1, f = o.fase ?? 0, cam = o.c ?? e_FA.azulT, piel = o.piel ?? e_FA.pielP, pelo = o.pelo ?? e_FA.pelo1, pan = o.pan ?? hex('#3a3a4a');
  const paso = o.anda ? Math.sin(t * 9 + f) : 0, a = Math.round(paso * 1.4), sub = o.anda && Math.abs(paso) > 0.7 ? 1 : 0, y = suelo - sub;
  if (!o.sentado) { rect(x - 1 + a, y - 3, x - 1 + a, suelo - 1, pan); rect(x + 1 - a, y - 3, x + 1 - a, suelo - 1, pan); pset(x - 1 + a, suelo, C.k); pset(x + 1 - a, suelo, C.k); pset(x + 2 - a, suelo, C.k); }
  else { rect(x - 1, y - 4, x + 2 * d, y - 3, pan); }
  rect(x - 2, y - 9, x + 2, y - 4, cam); pset(x - 2 * d, y - 4, e_mezcla(cam, C.k, 0.3)); pset(x + 2 * d, y - 9, e_mezcla(cam, C.blanco, 0.25));
  if (o.del) { rect(x - 1, y - 7, x + 1, y - 4, o.del); pset(x, y - 8, o.del); }
  const br = o.trabaja ? Math.round(Math.sin(t * (o.vel ?? 5) + f) * 1.5) : 0;
  if (o.carga) { rect(x + d * 2, y - 7, x + d * 6, y - 3, C.k); rect(Math.min(x + d * 3, x + d * 5), y - 6, Math.max(x + d * 3, x + d * 5), y - 4, e_FA.caja); pset(x + d * 3, y - 7, piel); }
  else if (o.trabaja) { pset(x + d * 3, y - 6 + br, cam); pset(x + d * 4, y - 6 + br, piel); pset(x - d * 1 + d * 4, y - 5 - br, piel); pset(x + d * 3, y - 5 - br, cam); }
  else { const b = Math.round(-paso); pset(x - 3, y - 7, cam); pset(x - 3, y - 5 + b, piel); pset(x + 3, y - 7, cam); pset(x + 3, y - 5 - b, piel); }
  rect(x - 1, y - 12, x + 1, y - 10, piel); rect(x - 1, y - 13, x + 1, y - 13, pelo); pset(x - d, y - 12, pelo); if (o.coleta) pset(x - 2 * d, y - 11, pelo);
  pset(x + d, y - 11, C.k);
}

// el decorado de fuera: cielo (en cada fotograma), la capa fija de la calle y la vida encima
function e_faCalle(R, t, o) {
  const { rect, pset, disco, linea } = R, noche = o.luz === 'noche', hor = 100;
  e_faCielo(R, t, { hor, modo: noche ? 'noche' : 'dia', sol: [186, 28, 8], estela: [40, 0.05], luna: [190, 26, 6], cumulos: 5 });
  // golondrinas que cruzan alto (de día)
  if (!noche) for (let k = 0; k < 4; k++) { const u = ((t + k * 0.6) % 12) / 12, x = Math.round(340 - u * 380 + k * 7), y = Math.round(38 + Math.sin(t * 1.3 + k) * 3 + k * 3), a = Math.sin(t * 13 + k * 2) > 0; if (x > 268 && y < 48) continue; pset(x, y, hex('#2a2436')); pset(x - 1, y - (a ? 1 : 0), hex('#2a2436')); pset(x + 1, y - (a ? 1 : 0), hex('#2a2436')); pset(x - 2, y - (a ? 2 : -1), hex('#2a2436')); pset(x + 2, y - (a ? 2 : -1), hex('#2a2436')); }
  e_faCapa(R, noche ? 'fa:calle:noche' : 'fa:calle:dia', () => { e_faCalleFija(R, noche); if (noche) e_faNoche(R); });
  // el depósito de agua: la luz roja de aviso que parpadea; la veleta de la iglesia
  if (Math.floor(t * 1.2) % 2) { pset(40, 26, C.rojo); pset(40, 25, hex('#ff8a7a')); }
  { const a = Math.sin(t * 0.5) * 2; linea(148, 26, Math.round(148 + a), 25, C.k); pset(Math.round(148 + a * 1.4), 24, C.k); }
  // el vapor del respiradero de la nave y el de la chimenea pequeña
  for (const [vx, vy, k] of [[196, 46, 0], [232, 44, 1]]) for (let i = 0; i < 5; i++) { const u = ((t * 0.32 + i / 5 + k * 0.37) % 1), sx = Math.round(vx + u * 14 + Math.sin(t * 1.3 + i) * 1.5), sy = Math.round(vy - u * 22); if (sx > 268 && sy < 48) continue; disco(sx, sy, u < 0.3 ? 1 : u < 0.7 ? 2 : 3, noche ? (u > 0.6 ? hex('#3a3e5a') : hex('#4e5270')) : u > 0.6 ? hex('#e8eef4') : hex('#ffffff')); if (!noche && u > 0.4) pset(sx + 1, sy + 2, hex('#c8d4e0')); }
  // la bandera de la fachada (de 50 estrellas, insinuada) que ondea
  { const bx = 104, by = 72; for (let i = 0; i < 13; i++) for (let j = 0; j < 8; j++) { const ox = Math.round(Math.sin(t * 5 - i * 0.6) * (i > 2 ? 1 : 0.4)); pset(bx + i, by + j + ox + Math.round(i * 0.3), i < 6 && j < 4 ? ((i + j) % 2 ? C.blanco : C.azul) : j % 2 ? C.blanco : C.rojo); } }
  // el poste de la barbería que gira
  { const px = 120, s = Math.floor(t * 6); for (let y = 103; y <= 113; y++) for (let x = px; x <= px + 2; x++) pset(x, y, (y + x + s) % 4 < 2 ? C.rojo : (y + x + s) % 4 === 2 ? C.blanco : hex('#3a5ab8')); }
  // el muelle: la puerta abierta con su luz, un operario que lleva la carretilla con cajas al camión y vuelve
  const sale = noche ? (o.sale ?? ((t % 16) / 16)) : -1;
  if (!noche) {
    const u = (t % 9) / 9, ida = u < 0.5, v = ida ? u / 0.5 : (u - 0.5) / 0.5, e = v * v * (3 - 2 * v), x = Math.round(ida ? 250 + e * 20 : 270 - e * 20);
    e_faFigura(R, x, 115, t, { anda: e > 0.02 && e < 0.98, dir: ida ? 1 : -1, c: e_FA.azulT, del: e_FA.pielS, carga: ida, fase: 1 });
    rect(x + (ida ? -4 : 3), 109, x + (ida ? -4 : 3), 115, C.metalD); pset(x + (ida ? -4 : 3), 116, C.k);
  } else if (sale < 0.25) {
    // de madrugada, el camión todavía en el muelle con los pilotos encendidos y el motor en marcha
    e_faCamion(R, 292, 127, t, { noche: true, vibra: true });
  }
  // el operario de la entrada que saluda; dos paseantes por la acera del fondo de la bocacalle
  if (!noche) { const u = (t % 14) / 14, x = Math.round(134 + u * 30); e_faFigura(R, x, 112, t, { anda: true, dir: 1, c: hex('#c8604a'), pelo: e_FA.pelo2, fase: 2 });
    const u2 = ((t + 6) % 18) / 18, x2 = Math.round(166 - u2 * 32); e_faFigura(R, x2, 111, t, { anda: true, dir: -1, c: hex('#5a8a6a'), pelo: e_FA.pelo3, coleta: true, fase: 4 }); }
  // la calzada: el tractor que pasa despacio (de día) y el camión que se va con los faros (de noche)
  if (!noche) { const u = ((t + 4) % 26) / 26, x = Math.round(-50 + u * 420); e_faTractor(R, x, 177, t); }
  else if (sale >= 0.25) { const v = (sale - 0.25) / 0.75, x = Math.round(300 - v * v * 420); e_faCamion(R, x, 176, t, { noche: true, faros: true, dir: -1 }); }
}

// lo fijo de la calle (se pinta una vez en su capa): fondo de campos, depósito, iglesia, comercios, fábrica, acera, calzada
function e_faCalleFija(R, noche) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  // los campos de maíz y la arboleda del fondo (se ven por la bocacalle y por encima de nada más)
  for (let x = 0; x < 320; x++) { const yc = Math.round(91 - 3 * (0.5 + 0.5 * Math.sin(x * 0.07) * Math.sin(x * 0.023 + 1)) - (h(x >> 1, 3, 540) < 0.4 ? 1 : 0)); for (let y = yc; y < 97; y++) B[y * 320 + x] = y === yc ? e_FA.bosque : (x + y) % 5 === 0 ? e_FA.bosqueS : e_mezcla(e_FA.bosque, hex('#a8c8d8'), 0.25); }
  for (let y = 97; y < 112; y++) for (let x = 0; x < 320; x++) { const fila = ((x + (y - 97) * 3) >> 2) % 2; B[y * 320 + x] = y < 100 ? (fila ? e_FA.maiz : e_FA.maizS) : fila ? (h(x, y, 541) < 0.3 ? e_FA.maizV : e_FA.maizVS) : e_FA.maiz; }
  // el depósito de agua sobre sus patas (por encima de los tejados de la izquierda)
  { const cx = 40; for (const dx of [-9, -3, 3, 9]) linea(cx + dx, 54, cx + Math.round(dx * 0.6), 70, C.metalD); linea(cx - 9, 62, cx + 9, 62, C.metalS); linea(cx - 9, 62, cx + 3, 54, C.metalS); linea(cx + 9, 62, cx - 3, 54, C.metalS);
    rect(cx, 40, cx, 56, C.metalS);
    for (let j = 0; j < 16; j++) { const w = j < 3 ? 6 + j * 2 : j > 12 ? 12 - (j - 12) * 2 : 12; for (let i = -w; i <= w; i++) pset(cx + i, 38 + j, Math.abs(i) === w ? C.k : i > w * 0.4 ? hex('#b8c0c8') : i < -w * 0.5 ? hex('#f0f4f8') : hex('#dce2e8')); }
    for (let i = -12; i <= 12; i++) pset(cx + i, 46, hex('#3a5a8a')); for (let i = -12; i <= 12; i++) pset(cx + i, 47, hex('#2a4a7a'));
    rect(cx - 13, 52, cx + 13, 52, C.k); for (let i = -13; i <= 13; i += 2) pset(cx + i, 51, C.metalD); rect(cx - 1, 33, cx + 1, 37, C.metalS); pset(cx, 27, C.metalD); rect(cx, 28, cx, 32, C.metalD); }
  // la iglesia blanca de la bocacalle con su torre y el silo de grano detrás
  { rect(150, 64, 163, 96, C.k); rect(151, 65, 162, 96, hex('#d8dce0')); for (let y = 66; y < 96; y += 2) rect(151, y, 162, y, hex('#c4c8d0')); rect(152, 66, 154, 95, hex('#b8bcc4'));
    rect(155, 52, 166, 72, C.k); rect(156, 52, 165, 72, hex('#c8a87a')); for (let y = 54; y < 72; y += 3) rect(156, y, 165, y, hex('#a88a5a')); disco(160, 52, 5, C.k); disco(160, 52, 4, hex('#a8acb4')); }
  { rect(140, 50, 156, 96, C.k); rect(141, 50, 155, 96, hex('#f2efe6')); for (let y = 52; y < 96; y += 3) rect(141, y, 155, y, hex('#dcd8d0')); rect(153, 50, 155, 96, hex('#cfcac0'));
    poligono([[139, 50], [148, 27], [157, 50]], C.k); poligono([[141, 49], [148, 30], [155, 49]], hex('#5a5e6a')); linea(148, 30, 155, 49, hex('#3e424c'));
    rect(145, 56, 151, 64, C.k); rect(146, 57, 150, 64, hex('#2a3446')); disco(148, 57, 3, C.k); disco(148, 57, 2, hex('#2a3446')); rect(148, 57, 148, 64, hex('#5a6278'));
    rect(144, 74, 152, 84, C.k); rect(145, 75, 151, 84, noche ? e_FA.ven : hex('#6a7aa0')); rect(148, 75, 148, 84, C.k); rect(145, 79, 151, 79, C.k); }
  // la bocacalle: el asfalto que se va al fondo, el seto y un arce rojo de otoño
  for (let y = 97; y < 128; y++) { const u = (y - 97) / 31, a = Math.round(146 - u * 15), b = Math.round(156 + u * 12); for (let x = 131; x <= 168; x++) { let c = x < a - 3 || x > b + 3 ? (x < a - 3 ? C.hierbaS : C.hierba) : x < a || x > b ? (y % 3 ? C.acera : C.aceraS) : h(x, y, 545) < 0.07 ? C.asfaltoS : C.asfalto; if (x >= a && x <= b && Math.abs(x - (a + b) / 2) < 0.6 && y % 4 < 2) c = C.linea; B[y * 320 + x] = c; } }
  for (let y = 112; y < 128; y += 2) for (let x = 131; x < 169; x += 5) if (h(x, y, 546) < 0.3) pset(x, y, C.hierbaL);
  for (const [ax, ay, r] of [[136, 98, 7], [131, 102, 5], [166, 100, 6]]) { disco(ax, ay, r + 1, C.k); disco(ax, ay, r, hex('#a83a2a')); disco(ax - 2, ay - 2, Math.round(r * 0.6), hex('#d8603a')); pset(ax - 3, ay - 3, hex('#f0905a')); rect(ax, ay + r - 1, ax, 111, C.cortezaS); }
  // ── los tres comercios de ladrillo de la izquierda (de 0 a 131)
  const TIENDAS = [
    { x0: 0, x1: 44, top: 62, lad: [e_FA.lad, e_FA.ladS, e_FA.ladL, e_FA.mort], toldo: [C.rojo, C.blanco], tipo: 'deportes' },
    { x0: 45, x1: 92, top: 56, lad: [hex('#c8a07a'), hex('#a8805a'), hex('#e0bc94'), hex('#e8dcc8')], toldo: [hex('#3a7a4a'), hex('#f2efe6')], tipo: 'cafe' },
    { x0: 93, x1: 131, top: 66, lad: [hex('#8a4a3a'), hex('#6a3428'), hex('#a8604a'), hex('#c0ab90')], toldo: [hex('#2a4a8a'), hex('#f2efe6')], tipo: 'barberia' },
  ];
  TIENDAS.forEach((s, k) => { const { x0, x1, top } = s;
    e_faLadrillos(R, x0, top + 4, x1, 113, 10 + k, s.lad);
    // la cornisa con sus ménsulas
    rect(x0, top, x1, top + 3, C.k); rect(x0, top + 1, x1, top + 2, hex('#d8d0c0')); rect(x0, top + 1, x1, top + 1, hex('#f2ece0')); for (let x = x0 + 2; x < x1; x += 5) { rect(x, top + 4, x + 1, top + 6, hex('#b8b0a0')); pset(x, top + 4, hex('#e8e0d0')); }
    rect(x0, top + 7, x1, top + 7, s.lad[1]);
    // las ventanas de arriba, con arco de ladrillo, guillotina, cortina y el cielo reflejado
    const nv = Math.floor((x1 - x0 - 4) / 14);
    for (let w = 0; w < nv; w++) { const wx = x0 + 4 + w * Math.floor((x1 - x0 - 4) / nv), wy = top + 11;
      rect(wx - 1, wy - 2, wx + 9, wy - 1, s.lad[1]); rect(wx, wy - 3, wx + 8, wy - 3, s.lad[2]);
      rect(wx - 1, wy, wx + 9, wy + 16, C.k); for (let y = wy + 1; y <= wy + 15; y++) for (let x = wx; x <= wx + 8; x++) { const p = (y - wy) / 15; B[y * 320 + x] = noche ? (h(k, w, 542) < 0.6 ? (p < 0.5 ? e_FA.ven : e_FA.venS) : hex('#1a1e34')) : (x - wx + y - wy) % 9 < 2 ? hex('#e4f4fc') : p < 0.4 ? hex('#a8d0ec') : hex('#6a98bc'); }
      rect(wx, wy + 8, wx + 8, wy + 8, hex('#f2efe6')); rect(wx + 4, wy + 1, wx + 4, wy + 15, hex('#f2efe6'));
      rect(wx, wy + 1, wx + 1, wy + 7, (k + w) % 2 ? hex('#e8c8a0') : hex('#c8a0c8')); rect(wx - 2, wy + 16, wx + 10, wy + 17, hex('#d8d0c0')); }
    // el rótulo del comercio: una tabla con su pictograma (sin letras)
    const ry = 88; rect(x0 + 3, ry, x1 - 3, ry + 6, C.k); rect(x0 + 4, ry + 1, x1 - 4, ry + 5, s.toldo[0]); rect(x0 + 4, ry + 1, x1 - 4, ry + 1, e_mezcla(s.toldo[0], C.blanco, 0.3));
    const mx = Math.round((x0 + x1) / 2);
    if (s.tipo === 'deportes') e_faBalonPicto(R, mx, ry + 3);
    else if (s.tipo === 'cafe') { rect(mx - 3, ry + 2, mx + 1, ry + 4, C.blanco); pset(mx + 2, ry + 3, C.blanco); pset(mx - 2, ry + 1, hex('#d8d0c0')); pset(mx, ry + 1, hex('#d8d0c0')); }
    else { linea(mx - 3, ry + 1, mx + 3, ry + 5, C.blanco); linea(mx - 3, ry + 5, mx + 3, ry + 1, C.blanco); pset(mx - 4, ry + 1, C.blanco); pset(mx - 4, ry + 5, C.blanco); }
    // el toldo a rayas con su faldón ondulado y su sombra
    for (let y = 95; y <= 100; y++) for (let x = x0 + 1 - (y - 95); x <= x1 - 1 + (y - 95); x++) { if (x < x0 - 3 || x > x1 + 3) continue; B[y * 320 + Math.max(0, Math.min(319, x))] = Math.floor((x - x0 + 60) / 4) % 2 ? s.toldo[1] : s.toldo[0]; }
    for (let x = x0 - 5; x <= x1 + 5; x++) { if (x < 0 || x > 319) continue; const c = Math.floor((x - x0 + 60) / 4) % 2 ? s.toldo[1] : s.toldo[0]; pset(x, 101, c); if ((x & 3) !== 3) pset(x, 102, e_mezcla(c, C.k, 0.2)); }
    rect(x0 + 1, 103, x1 - 1, 104, e_mezcla(s.lad[1], C.k, 0.35));
    // el escaparate con su género, la puerta y el zócalo
    const ex1 = x1 - 14; rect(x0 + 2, 105, ex1, 126, C.k); rect(x0 + 3, 106, ex1 - 1, 125, noche ? e_FA.venS : hex('#4a6a7a'));
    if (!noche) for (let y = 106; y <= 125; y++) for (let x = x0 + 3; x < ex1; x++) if ((x - x0 + y) % 11 < 2) B[y * 320 + x] = hex('#8ab8cc');
    if (s.tipo === 'deportes') { rect(x0 + 4, 117, ex1 - 2, 118, C.maderaL); rect(x0 + 4, 110, ex1 - 2, 111, C.maderaL); for (let i = 0; i < 4; i++) e_faBalon(R, x0 + 9 + i * 6, 115, 3); for (let i = 0; i < 3; i++) { rect(x0 + 6 + i * 8, 120, x0 + 10 + i * 8, 125, [C.rojo, hex('#2a6a8a'), hex('#e8e0d0')][i]); rect(x0 + 6 + i * 8, 119, x0 + 10 + i * 8, 119, C.k); } e_faBalon(R, x0 + 14, 108, 3); }
    else if (s.tipo === 'cafe') { rect(x0 + 4, 116, ex1 - 2, 125, hex('#6a4a34')); rect(x0 + 4, 116, ex1 - 2, 116, hex('#8a6448')); for (let i = 0; i < 4; i++) { const tx = x0 + 6 + i * 7; rect(tx, 112, tx + 3, 115, [C.blanco, hex('#e8c8a0'), C.blanco, hex('#c87a5a')][i]); pset(tx + 4, 113, C.blanco); } for (let i = 0; i < 3; i++) disco(x0 + 9 + i * 9, 108, 1, hex('#f8e0a0')); }
    else { rect(x0 + 4, 106, x0 + 13, 120, hex('#b8c8d0')); rect(x0 + 5, 107, x0 + 12, 119, hex('#d8e4ea')); disco(x0 + 18, 118, 3, hex('#8a2a2a')); rect(x0 + 16, 121, x0 + 20, 125, C.metalD); }
    rect(ex1 + 2, 104, x1 - 2, 126, C.k); rect(ex1 + 3, 105, x1 - 3, 126, noche ? e_FA.venS : s.toldo[0]); rect(ex1 + 4, 106, x1 - 4, 114, noche ? e_FA.ven : hex('#6a8a9a')); pset(x1 - 4, 118, C.oro);
    rect(x0, 126, x1, 128, e_mezcla(s.lad[1], C.k, 0.25)); rect(x0, 126, x1, 126, s.lad[2]);
  });
  // el mástil de la bandera (la tela la pinta la vida, porque ondea)
  rect(102, 70, 103, 71, C.metalD); linea(96, 80, 103, 71, C.metalL);
  // ── la fábrica (de 168 a 319): tejado en diente de sierra, fachada de ladrillo, entrada y muelle de carga
  for (let k = 0; k < 8; k++) { const x0 = 168 + k * 19; poligono([[x0, 58], [x0, 46], [x0 + 19, 58]], C.k);
    poligono([[x0 + 1, 57], [x0 + 1, 48], [x0 + 17, 57]], e_FA.techo); linea(x0 + 1, 48, x0 + 17, 57, e_FA.vigaL);
    for (let y = 47; y < 57; y++) pset(x0 + 1, y, noche ? e_FA.ven : (y % 2 ? hex('#a8d0ec') : hex('#e4f4fc')));
    for (let y = 50; y < 57; y += 2) for (let x = x0 + 3; x < x0 + 3 + (y - 48) * 1.7; x += 4) pset(x, y, e_FA.techoS); }
  rect(192, 44, 199, 49, C.k); rect(193, 44, 198, 48, C.metalS); rect(192, 43, 199, 43, C.metalD);   // el respiradero
  rect(229, 40, 235, 49, C.k); rect(230, 40, 234, 49, e_FA.ladS); rect(228, 39, 236, 40, hex('#5a5a62'));   // la chimenea pequeña
  e_faLadrillos(R, 168, 58, 319, 128, 20);
  rect(168, 58, 319, 60, C.k); rect(168, 59, 319, 59, hex('#d8d0c0'));
  for (const px of [168, 200, 236, 274, 316]) { rect(px, 61, px + 3, 116, e_FA.ladS); rect(px, 61, px, 116, e_FA.ladL); }
  // los ventanales de la nave (de acero, con muchos paños; de noche, encendidos)
  for (const [wx, ww] of [[174, 22], [206, 26], [242, 28], [280, 32]]) { rect(wx, 64, wx + ww, 84, C.k);
    for (let y = 65; y < 84; y++) for (let x = wx + 1; x < wx + ww; x++) { const marco = (x - wx) % 5 === 0 || (y - 65) % 5 === 4; B[y * 320 + x] = marco ? hex('#3a4048') : noche ? ((y - 65) < 9 ? e_FA.ven : e_FA.venS) : (x + y) % 10 < 2 ? hex('#e4f4fc') : y < 72 ? hex('#a8cce4') : hex('#7aa0bc'); }
    rect(wx - 1, 85, wx + ww + 1, 86, hex('#c8c0b0')); for (let x = wx + 2; x < wx + ww; x += 4) pset(x, 87, e_FA.ladD); }
  // el medallón crema con el logotipo, entre los ventanales y la marquesina
  { const cx = 220, cy = 96; for (let j = -10; j <= 10; j++) for (let i = -19; i <= 19; i++) { const e = (i / 19) ** 2 + (j / 10) ** 2; if (e > 1) continue; pset(cx + i, cy + j, e > 0.82 ? C.k : e > 0.66 ? C.oroS : j < -4 ? e_FA.cremL : e_FA.crem); }
    e_faLogo(R, cx, cy, 1.5); }
  // la entrada: marquesina, puertas de cristal, aplique, escalones y dos jardineras
  rect(205, 107, 235, 109, C.k); rect(206, 107, 234, 108, hex('#3a3a46')); rect(206, 109, 234, 109, e_FA.ladD);
  rect(209, 110, 231, 127, C.k); for (let y = 111; y <= 126; y++) for (let x = 210; x <= 230; x++) B[y * 320 + x] = x === 220 ? C.k : noche ? (y < 118 ? e_FA.noche : e_FA.ven) : (x + y) % 9 < 2 ? hex('#cfe4f0') : hex('#5a7a8a');
  rect(218, 117, 218, 121, C.metalL); rect(222, 117, 222, 121, C.metalL); rect(206, 127, 234, 128, hex('#b8b4ac'));
  for (const jx of [200, 236]) { rect(jx, 120, jx + 6, 127, C.k); rect(jx + 1, 121, jx + 5, 127, hex('#8a8a90')); for (let i = 0; i < 4; i++) { disco(jx + 1 + i * 1.5, 118, 2, C.hierbaS); pset(jx + 1 + i * 1.5, 116, [C.rojo, C.amarillo, C.rosa, C.blanco][i]); } }
  // el muelle de carga: plataforma de hormigón con topes amarillos y negros, dos puertas enrollables (la 1 abierta)
  rect(240, 116, 319, 128, C.k); rect(240, 117, 319, 127, hex('#b8b0a4')); rect(240, 117, 319, 117, hex('#d0c8bc')); for (let x = 244; x < 320; x += 12) { rect(x, 119, x + 3, 125, C.k); rect(x + 1, 120, x + 2, 124, e_FA.fra); pset(x + 1, 122, C.k); }
  for (const [dx, abierta, num] of [[244, true, '1'], [284, false, '2']]) { rect(dx, 90, dx + 26, 116, C.k);
    if (abierta) { rect(dx + 1, 91, dx + 25, 115, noche ? e_FA.ven : hex('#d8b878')); rect(dx + 1, 91, dx + 25, 94, hex('#8a7a6a')); for (let i = 0; i < 3; i++) e_faCaja(R, dx + 3 + i * 6, 103 - (i % 2) * 6, dx + 9 + i * 6, 115 - (i % 2) * 6, i); e_faCaja(R, dx + 16, 104, dx + 24, 115, 4); rect(dx + 2, 92, dx + 24, 92, noche ? e_FA.nocheL : hex('#fff4d0')); }
    else { for (let y = 91; y < 116; y++) rect(dx + 1, y, dx + 25, y, y % 3 === 0 ? hex('#8a8e98') : y % 3 === 1 ? hex('#b8bcc4') : hex('#a4a8b0')); rect(dx + 11, 112, dx + 15, 113, C.k); }
    rect(dx - 1, 88, dx + 27, 89, e_FA.fra); for (let x = dx - 1; x < dx + 28; x += 4) rect(x, 88, x + 1, 89, C.k); e_faCifras(R, num, dx + 12, 82, C.blanco); }
  // el camión de caja aparcado de lado delante de la puerta 2 (de día; de noche ya se va)
  if (!noche) e_faCamion(R, 292, 127, 0, {});
  // ── la acera de losas, el bordillo, la cuneta y el mobiliario
  for (let y = 128; y < 143; y++) { const f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = y === 128 ? C.aceraS : x % 20 === 0 || (y - 128) % 8 === 7 && x % 40 < 20 ? C.aceraS : h(x, y, 543) < 0.05 ? hex('#9894a0') : (y < 131 ? hex('#bab6c0') : C.acera); }
  for (const [x0, l] of [[34, 5], [126, 4], [246, 6]]) for (let i = 0; i < l; i++) pset(x0 + i, 133 + Math.round(Math.sin(i + x0) * 1.2) + (i >> 1), C.aceraS);
  rect(0, 143, 319, 143, hex('#d8d4dc')); rect(0, 144, 319, 145, C.aceraS); rect(0, 146, 319, 146, hex('#34343e'));
  // las farolas de hierro (de tres brazos), el banco, el buzón, la boca de riego y los maceteros
  for (const lx of [62, 182, 300]) { rect(lx - 2, 136, lx + 2, 139, C.k); rect(lx - 1, 74, lx + 1, 138, hex('#2a3038')); rect(lx, 74, lx, 136, hex('#4a5260'));
    for (const d of [-1, 1]) { linea(lx, 78, lx + d * 5, 74, hex('#2a3038')); disco(lx + d * 6, 72, 2, C.k); pset(lx + d * 6, 72, noche ? e_FA.nocheL : hex('#f2efe6')); pset(lx + d * 6, 73, noche ? e_FA.noche : hex('#d8d4cc')); }
    disco(lx, 70, 2, C.k); pset(lx, 70, noche ? e_FA.nocheL : hex('#f2efe6')); for (let i = 0; i < 3; i++) pset(lx - 1 + i, 92, C.oroS); }
  { const bx = 84; rect(bx, 131, bx + 16, 132, C.k); rect(bx, 129, bx + 16, 130, C.maderaL); rect(bx, 126, bx + 16, 127, C.madera); rect(bx, 125, bx + 16, 125, C.maderaL); for (const lx of [bx + 1, bx + 15]) rect(lx, 125, lx, 136, C.k); }
  { const mx = 22; rect(mx, 118, mx + 8, 134, C.k); rect(mx + 1, 119, mx + 7, 133, hex('#2a4a8a')); poligono([[mx, 119], [mx + 4, 115], [mx + 8, 119]], C.k); poligono([[mx + 1, 118], [mx + 4, 116], [mx + 7, 118]], hex('#3a5aa0')); rect(mx + 2, 122, mx + 6, 122, C.k); rect(mx + 1, 134, mx + 2, 137, C.k); rect(mx + 6, 134, mx + 7, 137, C.k); pset(mx + 2, 120, hex('#5a7ac0')); }
  { const fx = 156; rect(fx, 131, fx + 4, 138, C.k); rect(fx + 1, 132, fx + 3, 138, hex('#e8c040')); rect(fx, 130, fx + 4, 131, hex('#c89a20')); rect(fx - 1, 133, fx + 5, 134, hex('#c89a20')); pset(fx + 1, 132, hex('#f8e080')); }
  for (const px of [4, 136, 196]) { rect(px, 126, px + 10, 134, C.k); rect(px + 1, 127, px + 9, 134, hex('#a8907a')); rect(px + 1, 127, px + 9, 127, hex('#c8b098')); for (let i = 0; i < 5; i++) { disco(px + 1 + i * 2, 124 - (i % 2), 2, C.hierbaS); pset(px + 1 + i * 2, 122 - (i % 2), [C.rojo, C.amarillo, hex('#c86ab8'), C.blanco, C.naranja][i]); } }
  // las sombras de las farolas sobre la acera
  for (const lx of [62, 182, 300]) for (let i = 2; i < 14; i++) if (lx + i < 320) pset(lx + i, 139 + (i >> 2), e_mezcla(C.acera, C.k, 0.25));
  // la calzada: asfalto con grano, parches, la doble línea amarilla, la tapa de alcantarilla y la camioneta aparcada
  for (let y = 147; y < 180; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const q = h(x, y, 544); B[f + x] = q < 0.06 ? C.asfaltoS : q > 0.965 ? hex('#5a5a6c') : C.asfalto; } }
  for (const [x0, y0] of [[110, 152], [210, 172], [290, 158]]) for (let i = 0; i < 16; i++) pset(x0 + i, y0 + Math.round(Math.sin(i * 0.7 + x0) * 1.5), hex('#2e2e3a'));
  rect(0, 147, 319, 147, hex('#3e3e4c')); rect(0, 164, 319, 164, C.linea); rect(0, 166, 319, 166, C.linea);
  { const mx = 236, my = 156; for (let j = -2; j <= 2; j++) for (let i = -7; i <= 7; i++) { const e = (i / 7.5) ** 2 + (j / 2.6) ** 2; if (e < 1) pset(mx + i, my + j, e > 0.7 ? C.k : (i + j) % 3 ? hex('#5a5a66') : hex('#46464e')); } }
  e_faCamioneta(R, 36, 160, noche);
}

// el pictograma de un balón en un rótulo
function e_faBalonPicto(R, cx, cy) { for (let i = -3; i <= 3; i++) { const w = i === -3 || i === 3 ? 0 : 1; for (let j = -w; j <= w; j++) R.pset(cx + i, cy + j, C.blanco); } R.pset(cx - 1, cy - 1, e_FA.piel); R.pset(cx + 1, cy - 1, e_FA.piel); }

// de noche, todo lo que no es luz se oscurece y azulea (sobre la capa: respeta los huecos a 0)
function e_faNoche(R) {
  const B = R.buf, deja = new Set([e_FA.ven, e_FA.venS, e_FA.noche, e_FA.nocheL, C.rojo]);
  for (let i = 0; i < 57600; i++) { const c = B[i]; if (!c || deja.has(c)) continue; const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
    B[i] = (0xff000000 | (Math.min(255, Math.round(b * 0.5 + 40)) << 16) | (Math.min(255, Math.round(g * 0.36 + 20)) << 8) | Math.min(255, Math.round(r * 0.34 + 18))) >>> 0; }
  // los conos de luz de las farolas y el resplandor de la puerta del muelle, tramados
  for (const lx of [62, 182, 300]) for (let y = 74; y < 146; y++) { const w = (y - 74) * 0.36; for (let x = Math.round(lx - w - 6); x <= Math.round(lx + w + 6); x++) { if (x < 0 || x > 319) continue; const i = y * 320 + x; if (!B[i]) continue; const q = 0.34 * (1 - (y - 74) / 80) * (Math.abs(x - lx) < w * 0.6 + 3 ? 1 : 0.5); if (q > 0 && e_faU(x, y) < q * 1.4) B[i] = e_mezcla(B[i], e_FA.noche, 0.22); } }
  for (let y = 116; y < 150; y++) for (let x = 236; x < 282; x++) { const i = y * 320 + x; if (!B[i]) continue; const q = 0.5 * (1 - (y - 116) / 34) * (1 - Math.abs(x - 257) / 26); if (q > 0 && e_faU(x, y) < q) B[i] = e_mezcla(B[i], e_FA.noche, 0.3); }
  for (let y = 128; y < 146; y++) for (let x = 205; x < 236; x++) { const i = y * 320 + x; const q = 0.4 * (1 - (y - 128) / 18); if (q > 0 && e_faU(x, y) < q) B[i] = e_mezcla(B[i], e_FA.noche, 0.3); }
}

// un camión de caja de lado (x: el centro; suelo): la caja blanca con el logotipo, la cabina, ruedas con tapacubos,
// el parachoques, los pilotos; o.dir (1: morro a la derecha), o.noche (pilotos y faros encendidos), o.faros (el haz de luz
// delante, tramado), o.vibra (el motor en marcha: tiembla un píxel y echa humo)
function e_faCamion(R, x, suelo, t, o = {}) {
  const { rect, pset, disco } = R, d = o.dir ?? 1, vb = o.vibra && Math.floor(t * 12) % 2 ? 1 : 0, y = suelo - vb, X = (i) => x + i * d, rx = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  if (o.faros) for (let j = -8; j <= 10; j++) for (let i = 1; i < 70; i++) { const yy = y - 10 + j, w = 2 + i * 0.16; if (Math.abs(j) > w) continue; const xx = X(26 + i); if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue; const q = 0.55 * (1 - i / 70); if (e_faU(xx, yy) < q) pset(xx, yy, e_mezcla(R.pget(xx, yy), e_FA.nocheL, 0.45)); }
  rx(-28, 10, y - 30, y - 6, C.k); rx(-27, 9, y - 29, y - 7, o.noche ? hex('#8a8ea8') : hex('#eef0f2')); rx(-27, 9, y - 29, y - 28, o.noche ? hex('#a0a4bc') : C.blanco); rx(-27, 9, y - 9, y - 7, o.noche ? hex('#6a6e88') : hex('#c8ccd4'));
  for (let i = -24; i < 8; i += 6) rx(i, i, y - 27, y - 9, o.noche ? hex('#7a7e98') : hex('#dde0e4'));
  e_faLogo(R, X(-9), y - 19, 1);
  rx(11, 25, y - 22, y - 6, C.k); rx(12, 24, y - 21, y - 7, o.noche ? hex('#6a3a3a') : hex('#c84a3a')); rx(15, 23, y - 20, y - 14, o.noche ? hex('#2a3048') : hex('#8ac8e8')); rx(22, 23, y - 20, y - 15, o.noche ? hex('#3a4058') : hex('#cfe8f6')); rx(12, 24, y - 21, y - 21, o.noche ? hex('#8a5050') : hex('#e86a5a'));
  rx(24, 26, y - 10, y - 7, C.k); pset(X(25), y - 10, o.noche ? e_FA.nocheL : hex('#f8f0c0')); pset(X(-28), y - 10, C.rojo); pset(X(-28), y - 9, C.rojo);
  rx(-29, 26, y - 6, y - 5, hex('#3a3a46'));
  for (const wx of [-20, -12, 18]) { disco(X(wx), y - 2, 4, C.k); disco(X(wx), y - 2, 2, C.metalS); pset(X(wx), y - 2, C.metalL); if (o.faros || o.vibra) { const a = t * (o.faros ? 14 : 0); pset(Math.round(X(wx) + Math.cos(a) * 2), Math.round(y - 2 + Math.sin(a) * 2), C.metalD); } }
  if (o.vibra || o.faros) for (let i = 0; i < 3; i++) { const u = ((t * 0.9 + i / 3) % 1); disco(Math.round(X(-30) - d * u * 10), Math.round(y - 4 - u * 6), u < 0.5 ? 1 : 2, hex('#5a5e78')); }
}

// la camioneta aparcada junto al bordillo (x: el centro; suelo)
function e_faCamioneta(R, x, suelo, noche) {
  const { rect, pset, disco } = R, c = noche ? hex('#3a4a6a') : hex('#3a6a8a'), cS = noche ? hex('#2a3450') : hex('#2a4e68'), cL = noche ? hex('#4a5a7a') : hex('#5a8aaa');
  rect(x - 24, suelo + 1, x + 24, suelo + 2, e_mezcla(C.asfalto, C.k, 0.4));
  rect(x - 23, suelo - 10, x + 23, suelo - 3, C.k); rect(x - 22, suelo - 9, x + 22, suelo - 4, c); rect(x - 22, suelo - 9, x + 22, suelo - 9, cL); rect(x - 22, suelo - 5, x + 22, suelo - 4, cS);
  rect(x + 1, suelo - 17, x + 16, suelo - 10, C.k); rect(x + 2, suelo - 16, x + 15, suelo - 10, c); rect(x + 4, suelo - 15, x + 14, suelo - 11, noche ? hex('#1a2034') : hex('#8ac8e8')); rect(x + 12, suelo - 15, x + 13, suelo - 12, noche ? hex('#2a3048') : hex('#cfe8f6'));
  rect(x - 21, suelo - 13, x - 1, suelo - 10, C.k); rect(x - 20, suelo - 12, x - 2, suelo - 10, cS); for (let i = 0; i < 3; i++) { rect(x - 18 + i * 5, suelo - 15, x - 15 + i * 5, suelo - 12, i === 1 ? hex('#c8a070') : hex('#a8b090')); }
  rect(x + 22, suelo - 8, x + 23, suelo - 6, noche ? hex('#8a8a60') : hex('#f8f0c0')); pset(x - 23, suelo - 8, C.rojo);
  for (const wx of [-14, 14]) { disco(x + wx, suelo - 1, 4, C.k); disco(x + wx, suelo - 1, 2, C.metal); pset(x + wx - 1, suelo - 2, C.metalL); }
}

// un tractor verde que pasa por la calzada (x: el centro; suelo), con el granjero con gorra, la rueda grande con sus tacos
// que giran, el tubo de escape que echa humo y el guardabarros
function e_faTractor(R, x, suelo, t) {
  const { rect, pset, disco, linea } = R, g = hex('#3a8a3a'), gS = hex('#2a6a2a'), gL = hex('#5aaa4a'), am = hex('#e8c040');
  rect(x - 22, suelo + 1, x + 20, suelo + 2, e_mezcla(C.asfalto, C.k, 0.4));
  rect(x - 4, suelo - 14, x + 18, suelo - 6, C.k); rect(x - 3, suelo - 13, x + 17, suelo - 7, g); rect(x - 3, suelo - 13, x + 17, suelo - 13, gL); for (let i = 0; i < 4; i++) rect(x + 8 + i * 2, suelo - 12, x + 8 + i * 2, suelo - 8, gS);
  rect(x + 12, suelo - 22, x + 13, suelo - 14, C.k); rect(x + 11, suelo - 23, x + 14, suelo - 22, C.k);
  for (let i = 0; i < 3; i++) { const u = ((t * 1.2 + i / 3) % 1); disco(Math.round(x + 12 - u * 8), Math.round(suelo - 24 - u * 9), u < 0.4 ? 1 : 2, u > 0.6 ? hex('#c8ccd4') : hex('#8a8e98')); }
  rect(x - 14, suelo - 26, x - 2, suelo - 24, C.k); rect(x - 13, suelo - 25, x - 3, suelo - 25, gS); rect(x - 13, suelo - 24, x - 13, suelo - 12, C.k); rect(x - 3, suelo - 24, x - 3, suelo - 14, C.k);
  // el granjero, de espaldas a la marcha, con la gorra y la camisa de cuadros
  rect(x - 10, suelo - 18, x - 6, suelo - 13, hex('#c84a3a')); pset(x - 9, suelo - 17, hex('#8a2a2a')); pset(x - 7, suelo - 15, hex('#8a2a2a')); rect(x - 9, suelo - 21, x - 7, suelo - 19, e_FA.pielP); rect(x - 10, suelo - 22, x - 6, suelo - 22, hex('#2a4a8a')); pset(x - 5, suelo - 22, hex('#2a4a8a')); pset(x - 6, suelo - 16, e_FA.pielP); linea(x - 6, suelo - 16, x - 2, suelo - 17, C.k);
  const rueda = (cx, cy, r, v) => { disco(cx, cy, r + 1, C.k); disco(cx, cy, r, hex('#2a2a30')); disco(cx, cy, Math.round(r * 0.55), am); disco(cx, cy, Math.round(r * 0.25), hex('#b8901c'));
    for (let k = 0; k < 10; k++) { const a = -t * v + k * Math.PI / 5; pset(Math.round(cx + Math.cos(a) * (r - 0.5)), Math.round(cy + Math.sin(a) * (r - 0.5)), hex('#4a4a54')); } };
  rueda(x - 8, suelo - 8, 9, 2.4); rueda(x + 14, suelo - 4, 4, 5);
  poligono_(R, [[x - 18, suelo - 12], [x - 8, suelo - 18], [x + 2, suelo - 12]], gS);
}

// polígono auxiliar (para no destructurar en las firmas cortas)
function poligono_(R, pts, c) { R.poligono(pts, c); }

// un fluorescente colgado de dos cadenas: carcasa, dos tubos y el resplandor tramado sobre la pared (o.apagado)
function e_faFluor(R, x0, x1, y, yTecho, apagado = false) {
  const { rect, pset } = R;
  for (const cx of [x0 + 3, x1 - 3]) for (let j = yTecho; j < y; j++) pset(cx, j, j % 2 ? e_FA.grisS : e_FA.gris);
  rect(x0, y, x1, y + 3, C.k); rect(x0 + 1, y, x1 - 1, y + 1, e_FA.grisL); rect(x0 + 1, y + 2, x1 - 1, y + 2, apagado ? e_FA.tuboS : e_FA.tubo); rect(x0 + 1, y + 3, x1 - 1, y + 3, apagado ? e_FA.grisL : e_FA.luzL);
}

// el resplandor de un fluorescente sobre lo que hay debajo (un trapecio tramado que se abre hacia abajo)
function e_faResplandor(R, x0, x1, y0, y1, q = 0.3, c = e_FA.luz) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), a = Math.round(x0 - u * 14), b = Math.round(x1 + u * 14), f = q * (1 - u);
    for (let x = Math.max(0, a); x <= Math.min(319, b); x++) if (e_faU(x, y) < f) B[y * 320 + x] = e_mezcla(B[y * 320 + x], c, 0.3); }
}

// un rayo de sol inclinado desde una ventana alta hasta el suelo, tramado (cálido)
function e_faRayo(R, x0, y0, w, y1, inclin, q = 0.28) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const dx = Math.round((y - y0) * inclin), f = q * (0.6 + 0.4 * (1 - (y - y0) / (y1 - y0)));
    for (let x = x0 + dx; x < x0 + dx + w; x++) if (x >= 0 && x < 320 && e_faU(x, y) < f) B[y * 320 + x] = e_mezcla(B[y * 320 + x], e_FA.sol, 0.32); }
}

// el pueblo visto por una ventana (lo pinta la vida, recortado al hueco): cielo, nubes que pasan, el depósito, los
// tejados, un árbol que se mece y un pájaro
function e_faVistaPueblo(R, t, x0, y0, x1, y1, k = 0) {
  const { rect, pset, disco, poligono } = R;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) pset(x, y, p < 0.45 ? hex('#7ab8e8') : e_faU(x, y) < (p - 0.45) * 3 ? hex('#b8dcf0') : hex('#94c8ec')); }
  for (const [v, w, yy, s] of [[3, 16, 0.25, 1], [5, 22, 0.15, 2]]) e_faNube(R, Math.round(x0 - 20 + ((t * v + k * 37 + s * 50) % (x1 - x0 + 50))), Math.round(y0 + (y1 - y0) * yy) + 4, w, s + k, e_faNUBES.dia);
  const base = y1 - Math.round((y1 - y0) * 0.25);
  { const cx = x0 + Math.round((x1 - x0) * (0.3 + 0.4 * h(k, 1, 560))), ty = base - 18; for (let j = 0; j < 7; j++) { const w = j < 1 || j > 5 ? 3 : 4; for (let i = -w; i <= w; i++) pset(cx + i, ty + j, Math.abs(i) === w ? hex('#8a94a0') : hex('#d8e0e8')); } for (const dx of [-3, 3]) for (let j = 7; j < 18; j++) pset(cx + dx - Math.sign(dx) * Math.round(j / 9), ty + j, hex('#6a7480')); }
  for (let i = 0; i < 4; i++) { const hx = x0 - 4 + i * Math.round((x1 - x0) / 3), hw = 12, hy = base - 6 - (i % 2) * 3; poligono([[hx, hy], [hx + hw / 2, hy - 5], [hx + hw, hy]], i % 2 ? hex('#7a5a4a') : hex('#5a5a6a')); rect(hx + 1, hy, hx + hw - 1, y1, i % 2 ? hex('#b0584a') : hex('#e8d0a0')); rect(hx + hw - 2, hy, hx + hw - 1, y1, i % 2 ? hex('#8a4038') : hex('#c8b080')); for (const wx of [hx + 3, hx + 7]) { rect(wx, hy + 2, wx + 1, hy + 4, hex('#3a5a7a')); pset(wx, hy + 2, hex('#8ab8d8')); } }
  { const m = Math.round(Math.sin(t * 1.1 + k) * 1), ax = x1 - 8; disco(ax + m, base - 6, 6, hex('#3a6a3a')); disco(ax - 2 + m, base - 8, 4, hex('#5a8a4a')); rect(ax, base - 2, ax, y1, C.cortezaS); }
  { const u = ((t + k * 3) % 9) / 9, bx = Math.round(x0 + u * (x1 - x0 + 10) - 5), by = Math.round(y0 + 6 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 13) > 0; pset(bx, by, C.k); pset(bx - 1, by - (a ? 1 : 0), C.k); pset(bx + 1, by - (a ? 1 : 0), C.k); }
  R.recorte(null);
}

// el suelo de hormigón pulido de la nave: juntas de dilatación, manchas, el reflejo tramado de las luces y la franja
// amarilla del pasillo (y0: donde empieza; franja [y, alto] o null)
function e_faHormigon(R, y0, franja = [0, 0], reflejos = []) {
  const B = R.buf;
  for (let y = y0; y < 180; y++) { const f = y * 320, p = (y - y0) / (180 - y0);
    for (let x = 0; x < 320; x++) { const q = h(x, y, 570); let c = q < 0.05 ? e_FA.sueS : q > 0.97 ? e_FA.sueL : e_faU(x, y) < p * 0.5 ? e_FA.sueS : e_FA.sue;
      if ((x + Math.round((y - y0) * (x - 160) / 90)) % 64 === 0) c = e_FA.sueS;
      B[f + x] = c; } }
  for (const yy of [y0 + 10, y0 + 26]) if (yy < 180) for (let x = 0; x < 320; x++) B[yy * 320 + x] = e_FA.sueS;
  rect_(R, 0, y0, 319, y0, e_FA.sueS);
  for (const [rx0, rx1] of reflejos) { const c = (rx0 + rx1) / 2, w = (rx1 - rx0) / 2; for (let y = y0 + 2; y < Math.min(180, y0 + 34); y++) for (let x = rx0 - 4; x <= rx1 + 4; x++) { const q = 0.4 * (1 - (y - y0) / 34) * Math.max(0, 1 - (Math.abs(x - c) / (w + 4)) ** 2) * (0.6 + 0.4 * h(x >> 1, 0, 573)); if (x >= 0 && x < 320 && e_faU(x, y) < q) B[y * 320 + x] = e_FA.sueR; } }
  // las huellas de las ruedas de la carretilla, una mancha de aceite y el sumidero con su rejilla
  for (let k = 0; k < 2; k++) for (let x = 0; x < 320; x++) { const y = Math.round(y0 + 18 + k * 4 + Math.sin(x * 0.02 + k) * 3); if (y < 180 && h(x >> 2, k, 574) < 0.6) B[y * 320 + x] = e_mezcla(B[y * 320 + x], e_FA.sueS, 0.6); }
  for (let j = -2; j <= 2; j++) for (let i = -6; i <= 6; i++) { const yy = Math.min(179, y0 + 30 + j), xx = 236 + i; if ((i / 6.5) ** 2 + (j / 2.5) ** 2 < 1 && e_faU(xx, yy) < 0.6) B[yy * 320 + xx] = e_mezcla(e_FA.sue, hex('#4a4038'), 0.5); }
  { const dx = 150, dy = Math.min(174, y0 + 36); R.rect(dx, dy, dx + 10, dy + 3, C.k); for (let i = 1; i < 10; i += 2) R.rect(dx + i, dy + 1, dx + i, dy + 2, e_FA.grisS); R.rect(dx, dy, dx + 10, dy, e_FA.sueL); }
  if (franja) { const [fy, fa] = franja; for (let y = fy; y < fy + fa; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = h(x >> 1, y, 571) < 0.08 ? e_FA.fraS : e_FA.fra; }
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 1, 572) * 316), y = y0 + 4 + Math.floor(h(k, 2, 572) * (176 - y0)); R.pset(x, y, e_FA.sueS); R.pset(x + 1, y, e_FA.sueS); }
}

function rect_(R, x0, y0, x1, y1, c) { R.rect(x0, y0, x1, y1, c); }

// el techo de la nave: cerchas de acero (triangulación) sobre las placas, con su luz y su sombra; tranquilas arriba a la
// izquierda (la barra del año) y a la derecha (Atom)
function e_faTecho(R, y1) {
  const { rect, linea, pset } = R;
  rect(0, 0, 319, y1, e_FA.techoS); for (let y = 0; y < y1; y += 4) rect(0, y, 319, y, e_mezcla(e_FA.techoS, e_FA.techo, 0.5));
  for (let x = 0; x < 320; x += 40) { linea(x, y1, x + 20, 2, e_FA.vigaS); linea(x + 20, 2, x + 40, y1, e_FA.vigaS); }
  rect(0, y1 - 2, 319, y1, e_FA.vigaS); rect(0, y1 - 2, 319, y1 - 2, e_FA.viga); rect(0, 1, 319, 2, e_FA.vigaS);
  for (let x = 6; x < 320; x += 40) pset(x, y1 - 1, e_FA.vigaL);
}

function e_faCorte(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_fijo(R, 'fa:corte', () => e_faCorteFijo(R));
  // por las ventanas altas, el pueblo (recortado a cada hueco)
  for (const [k, x0] of [[0, 24], [1, 96], [2, 168]]) e_faVistaPueblo(R, t, x0 + 2, 22, x0 + 53, 49, k);
  for (const x0 of [24, 96, 168]) { rect(x0 + 27, 22, x0 + 28, 49, hex('#3a4048')); rect(x0 + 2, 35, x0 + 53, 35, hex('#3a4048')); for (let i = 0; i < 6; i++) pset(x0 + 6 + i * 8, 24 + i * 4, hex('#e8f4fc')); }
  // los fluorescentes: el segundo parpadea a ratos
  const parpa = (t % 8.3) < 0.35 && Math.sin(t * 60) > -0.1;
  for (const [x0, x1, k] of [[30, 84, 0], [130, 184, 1], [222, 270, 2]]) { e_faFluor(R, x0, x1, 58, 15, k === 1 && parpa); }
  // el cartel del cerdo y la vaca (o.cartel)
  if (o.cartel != null) e_faCartelPiel(R, 256, 70, o.cartel, t);
  // los pilotos del cuadro eléctrico y el segundero del reloj
  for (let i = 0; i < 4; i++) pset(292 + i * 4, 94, (Math.floor(t * (1 + i * 0.4) + i) % 3) ? [C.verdeL, C.rojo, C.amarillo, C.verdeL][i] : hex('#3a3a3a'));
  { const a = t * Math.PI / 30 * 6 - Math.PI / 2; linea(116, 76, Math.round(116 + Math.cos(a) * 4), Math.round(76 + Math.sin(a) * 4), C.rojo); }
  // los dos cortadores del fondo (detrás de la mesa: la mesa se vuelve a pintar delante)
  e_faFigura(R, 108, 118, t, { trabaja: true, dir: 1, c: e_FA.azulT, del: e_FA.pielS, fase: 0, vel: 3.2 });
  e_faFigura(R, 176, 118, t, { trabaja: true, dir: -1, c: hex('#7a5a8a'), del: e_FA.pielS, pelo: e_FA.pelo2, coleta: true, fase: 2, vel: 2.6 });
  e_faCapa(R, 'fa:corte:mesa', () => e_faMesaCorte(R));
  // la cuchilla del cortador de la izquierda, que sigue la plantilla
  { const u = (Math.sin(t * 1.1) + 1) / 2, cx = Math.round(118 + u * 14), cy = Math.round(117 + Math.sin(t * 2.2) * 1); linea(cx, cy, cx + 3, cy - 3, C.metalL); pset(cx + 3, cy - 3, C.k); pset(cx - 1, cy + 1, e_FA.pielP); }
  // la troqueladora: el cabezal baja cada 3 s, corta, sube; el panel cortado se suma a la pila
  { const c = t % 3, baja = c < 0.35 ? c / 0.35 : c < 0.6 ? 1 : c < 1.1 ? 1 - (c - 0.6) / 0.5 : 0, y = Math.round(84 + baja * 16);
    rect(232, 76, 262, y + 6, hex('#3a3a44')); rect(233, 76, 261, y + 5, e_FA.maq); rect(233, 76, 261, 77, e_FA.maqL); rect(259, 78, 261, y + 5, e_FA.maqS);
    rect(236, y + 6, 258, y + 9, C.k); rect(237, y + 6, 257, y + 8, e_FA.grisL); for (let i = 0; i < 3; i++) pset(240 + i * 7, y + 2, C.oroL);
    if (c > 0.3 && c < 0.45) for (let i = 0; i < 5; i++) pset(234 + i * 6, y + 11 - (i % 2), C.oroL);
    const n = 5 + Math.floor(t / 3) % 4; for (let i = 0; i < n; i++) e_faPanel(R, 280, 116 - i, 9, 3, i === n - 1 ? [e_FA.pielL, e_FA.piel, e_FA.pielC] : [e_FA.piel, e_FA.pielS, e_FA.pielL]); }
  // la estampadora: estampa la corona dorada en un panel cada 4 s (destello)
  { const c = (t + 1) % 4, baja = c < 0.3 ? c / 0.3 : c < 0.5 ? 1 : c < 0.9 ? 1 - (c - 0.5) / 0.4 : 0, y = Math.round(92 + baja * 8);
    rect(22, y, 38, y + 4, C.k); rect(23, y, 37, y + 3, e_FA.grisL); rect(29, y + 4, 31, y + 6, C.oroS);
    if (c > 0.3 && c < 0.7) { pset(26, 106, C.oroL); pset(34, 106, C.oroL); pset(30, 103, C.blanco); pset(24, 108, C.oroL); }
    const a = t * 0.6; pset(Math.round(16 + Math.cos(a) * 3), Math.round(90 + Math.sin(a) * 3), C.oroS); }
  // motas de polvo en los rayos de sol
  for (let k = 0; k < 16; k++) { const x = Math.round(70 + h(k, 1, 575) * 120 + Math.sin(t * 0.4 + k) * 6 + ((t * 2 + k * 9) % 40)), y = Math.round(60 + ((h(k, 2, 575) * 90 + t * (2 + k % 3)) % 90)); if (Math.sin(t * 1.3 + k) > 0) pset(x, y, e_FA.luzL); }
}

// lo fijo de la sala de corte
function e_faCorteFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  e_faTecho(R, 14);
  // la pared: ladrillo pintado de crema arriba, el zócalo verde abajo con su moldura; la junta de cada hilada se nota
  e_faLadrillos(R, 0, 15, 319, 128, 30, [e_FA.crem, e_FA.cremS, e_FA.cremL, e_mezcla(e_FA.cremS, e_FA.crem, 0.5)]);
  e_faLadrillos(R, 0, 100, 319, 128, 31, [e_FA.verP, e_FA.verPS, e_FA.verPL, e_mezcla(e_FA.verPS, e_FA.verP, 0.5)]);
  rect(0, 98, 319, 99, e_FA.mesaS); rect(0, 98, 319, 98, e_FA.mesaL);
  // las ventanas altas de acero (el paisaje lo pinta la vida) con su alféizar
  for (const x0 of [24, 96, 168]) { rect(x0, 20, x0 + 55, 51, C.k); rect(x0 + 1, 21, x0 + 54, 50, hex('#3a4048')); rect(x0 - 2, 52, x0 + 57, 54, e_FA.cremL); rect(x0 - 2, 55, x0 + 57, 55, e_FA.cremS); }
  // el pilar y la tubería del aire comprimido, con su manómetro y una llave roja
  rect(0, 60, 319, 62, C.k); rect(0, 61, 319, 61, e_FA.grisL); for (let x = 12; x < 320; x += 48) { rect(x, 59, x + 2, 63, e_FA.grisS); }
  rect(0, 15, 6, 128, e_FA.cremS); rect(6, 15, 7, 128, e_mezcla(e_FA.cremS, C.k, 0.3));
  // el reloj de pared
  disco(116, 76, 7, C.k); disco(116, 76, 6, C.blanco); for (let k = 0; k < 12; k++) pset(Math.round(116 + Math.cos(k * Math.PI / 6) * 5), Math.round(76 + Math.sin(k * Math.PI / 6) * 5), C.k); linea(116, 76, 116, 72, C.k); linea(116, 76, 119, 77, C.k);
  // la estantería de la izquierda con rollos de cuero (vistos de frente: espirales) y pieles dobladas
  rect(44, 64, 92, 98, C.k); rect(45, 65, 91, 97, e_FA.mesaD); for (const y of [76, 88, 97]) { rect(44, y, 92, y + 1, e_FA.mesa); rect(44, y, 92, y, e_FA.mesaL); }
  for (let i = 0; i < 5; i++) { const cx = 50 + i * 9, cy = 71; disco(cx, cy, 4, C.k); disco(cx, cy, 3, [e_FA.piel, e_FA.pielL, e_FA.pielS, e_FA.piel, e_FA.pielC][i]); for (let a = 0; a < 12; a += 1) { const r = a / 4; pset(Math.round(cx + Math.cos(a * 1.4) * r), Math.round(cy + Math.sin(a * 1.4) * r), e_FA.pielS); } }
  for (let i = 0; i < 4; i++) { const x = 47 + i * 11; rect(x, 80, x + 9, 87, C.k); for (let j = 0; j < 3; j++) rect(x + 1, 81 + j * 2, x + 8, 82 + j * 2, j % 2 ? e_FA.pielS : [e_FA.piel, e_FA.pielL, e_FA.pielC, e_FA.piel][i]); }
  for (let i = 0; i < 6; i++) { rect(47 + i * 7, 90, 52 + i * 7, 96, C.k); rect(48 + i * 7, 91, 51 + i * 7, 96, i % 2 ? e_FA.caja : e_FA.cajaS); }
  // el tablón de seguridad: pictogramas (gafas, guantes, la mano y la cuchilla), sin letras
  rect(134, 68, 166, 92, C.k); rect(135, 69, 165, 91, hex('#2a6a4a')); for (let i = 0; i < 3; i++) { const px = 138 + i * 9; rect(px, 72, px + 7, 79, C.blanco); rect(px, 82, px + 7, 89, C.blanco); }
  disco(140, 75, 1, C.k); disco(144, 75, 1, C.k); pset(142, 75, C.k); rect(148, 74, 153, 78, hex('#2a5ab8')); rect(157, 73, 161, 78, hex('#e8c040')); pset(159, 74, C.k); pset(159, 75, C.k); pset(159, 77, C.k);
  rect(140, 84, 142, 88, e_FA.pielP); pset(139, 85, e_FA.pielP); rect(147, 84, 152, 86, C.metalL); linea(156, 88, 161, 83, C.rojo); linea(156, 83, 161, 88, C.rojo);
  // el cuadro eléctrico con sus pilotos y el extintor rojo
  rect(286, 82, 312, 112, C.k); rect(287, 83, 311, 111, e_FA.grisL); rect(287, 83, 311, 84, C.blanco); rect(309, 85, 310, 110, e_FA.gris); rect(290, 98, 308, 108, e_FA.gris); for (let i = 0; i < 4; i++) { rect(291 + i * 4, 99, 292 + i * 4, 106, C.k); rect(291 + i * 4, 103, 292 + i * 4, 103, e_FA.grisL); } rect(296, 87, 301, 92, e_FA.fra); poligono([[298, 88], [296, 91], [301, 91]], C.k);
  rect(272, 104, 278, 122, C.k); rect(273, 105, 277, 121, C.rojo); rect(273, 105, 274, 121, hex('#e86a5a')); rect(274, 101, 276, 104, C.k); linea(276, 102, 280, 106, C.k); rect(271, 99, 279, 99, C.metalD);
  // el pasillo de luz y sombra
  e_faResplandor(R, 30, 84, 62, 98, 0.25); e_faResplandor(R, 130, 184, 62, 98, 0.25); e_faResplandor(R, 222, 270, 62, 98, 0.25);
  // el suelo
  e_faHormigon(R, 128, [166, 3], [[30, 84], [130, 184], [222, 270]]);
  for (let x = 0; x < 320; x++) { pset(x, 128, e_FA.verPS); pset(x, 129, e_mezcla(e_FA.sue, C.k, 0.2)); }
  // los rayos de sol de las ventanas, que cruzan la pared y llegan al suelo
  e_faRayo(R, 40, 56, 22, 150, 0.55); e_faRayo(R, 112, 56, 22, 150, 0.55);
  // los recortes de cuero por el suelo
  for (let k = 0; k < 9; k++) { const x = Math.floor(h(k, 3, 576) * 300) + 8, y = 136 + Math.floor(h(k, 4, 576) * 40); if (y > 163 && y < 170) continue; rect(x, y, x + 2, y, e_FA.pielL); pset(x + 1, y + 1, e_FA.pielS); }
  // en primer término: el contenedor de recortes (abajo a la izquierda) y el palé con pieles dobladas (abajo a la derecha)
  for (let y = 176; y < 180; y++) for (let x = 0; x < 34; x++) if (e_faU(x, y) < 0.5) pset(x, y, e_mezcla(e_FA.sue, C.k, 0.3));
  rect(2, 156, 30, 177, C.k); rect(3, 157, 29, 176, hex('#4a6a8a')); rect(3, 157, 29, 158, hex('#6a8aaa')); for (let x = 6; x < 28; x += 5) rect(x, 160, x, 175, hex('#3a5a7a'));
  for (let k = 0; k < 14; k++) { const x = 4 + Math.floor(h(k, 1, 586) * 24), y = 151 + Math.floor(h(k, 2, 586) * 6); rect(x, y, x + 2 + (k % 3), y + 1, [e_FA.piel, e_FA.pielL, e_FA.pielS, e_FA.pielC][k % 4]); }
  rect(286, 172, 319, 177, C.k); rect(287, 173, 319, 176, C.maderaL); for (let x = 290; x < 320; x += 9) rect(x, 175, x + 4, 176, C.maderaD);
  for (let j = 0; j < 4; j++) { rect(288 + j, 165 - j * 4, 319, 172 - j * 4, C.k); rect(289 + j, 166 - j * 4, 319, 171 - j * 4, [e_FA.piel, e_FA.pielL, e_FA.pielS, e_FA.pielC][j]); rect(289 + j, 166 - j * 4, 319, 166 - j * 4, e_mezcla([e_FA.piel, e_FA.pielL, e_FA.pielS, e_FA.pielC][j], C.blanco, 0.25)); for (let x = 292 + j; x < 319; x += 6) pset(x, 169 - j * 4, e_FA.pielS); }
  // la troqueladora (el cuerpo fijo: la columna, la base y la mesa con su goma de corte)
  rect(228, 70, 266, 76, C.k); rect(229, 71, 265, 75, e_FA.maqS); rect(229, 71, 265, 71, e_FA.maqL);
  rect(262, 76, 268, 140, C.k); rect(263, 76, 267, 139, e_FA.maq); rect(263, 76, 263, 139, e_FA.maqL); rect(266, 76, 267, 139, e_FA.maqS);
  rect(226, 108, 268, 116, C.k); rect(227, 109, 267, 115, e_FA.maq); rect(227, 109, 267, 110, e_FA.maqL); rect(229, 107, 261, 108, hex('#e8e0c8'));
  for (let i = 0; i < 3; i++) e_faPanel(R, 245, 105 - i, 9, 3, [e_FA.piel, e_FA.pielS, e_FA.pielL]);
  rect(230, 116, 260, 140, C.k); rect(231, 117, 259, 139, e_FA.maqS); rect(233, 120, 257, 136, e_FA.maqD); rect(236, 123, 241, 126, hex('#2a8a3a')); rect(244, 123, 249, 126, C.rojo); pset(237, 124, C.verdeL); rect(226, 140, 268, 142, C.k);
  // el carro con las pilas de los cuatro paneles (a la derecha)
  rect(270, 118, 300, 120, C.k); rect(271, 118, 299, 119, C.metalL); rect(272, 120, 273, 138, C.metalD); rect(297, 120, 298, 138, C.metalD); rect(270, 130, 300, 131, C.metalS); disco(273, 140, 2, C.k); disco(297, 140, 2, C.k);
  for (let s = 0; s < 3; s++) for (let i = 0; i < 4; i++) e_faPanel(R, 278 + s * 8, 128 - i, 3, 1, [e_FA.piel, e_FA.pielS, e_FA.pielL]);
  // la estampadora de la izquierda (cuerpo fijo): columna, rollo de lámina dorada, la mesa y la base
  rect(10, 82, 44, 88, C.k); rect(11, 83, 43, 87, e_FA.maq); rect(11, 83, 43, 83, e_FA.maqL);
  rect(40, 88, 46, 140, C.k); rect(41, 88, 45, 139, e_FA.maq); rect(41, 88, 41, 139, e_FA.maqL);
  disco(16, 90, 5, C.k); disco(16, 90, 4, C.oro); disco(16, 90, 2, C.oroS); pset(14, 88, C.oroL);
  rect(14, 106, 46, 112, C.k); rect(15, 107, 45, 111, e_FA.maq); rect(15, 107, 45, 107, e_FA.maqL); e_faPanel(R, 30, 105, 8, 2, [e_FA.piel, e_FA.pielS, e_FA.pielL]); e_faLogo(R, 30, 103, 1, [C.oro, C.oroS, C.oroL, C.oroL, C.oro, C.oroS]);
  rect(16, 112, 40, 140, C.k); rect(17, 113, 39, 139, e_FA.maqS); rect(19, 116, 37, 120, e_FA.maqD); for (let i = 0; i < 3; i++) pset(21 + i * 6, 118, [C.verdeL, C.amarillo, C.rojo][i]); rect(12, 140, 46, 142, C.k);
}

// la gran mesa de corte (capa: va delante de los cortadores del fondo): tablero de madera con su canto, la piel de vaca
// extendida con sus huecos de paneles ya cortados, plantillas de metal, una cuchilla, la regla y las patas con su sombra
function e_faMesaCorte(R) {
  const { rect, pset, poligono, linea } = R;
  // la sombra en el suelo
  for (let y = 143; y < 150; y++) for (let x = 64 + (y - 143); x < 220 - (y - 143); x++) if (e_faU(x, y) < 0.55) pset(x, y, e_mezcla(e_FA.sue, C.k, 0.3));
  poligono([[70, 108], [212, 108], [222, 124], [60, 124]], C.k); poligono([[71, 109], [211, 109], [220, 123], [62, 123]], e_FA.mesa);
  for (let y = 110; y < 123; y += 3) linea(64 - Math.round((y - 123) * 0.6), y, 218 + Math.round((y - 123) * 0.6), y, e_FA.mesaL);
  rect(60, 124, 222, 128, C.k); rect(61, 124, 221, 127, e_FA.mesaS); rect(61, 124, 221, 124, e_FA.mesaL);
  for (const lx of [64, 140, 216]) { rect(lx - 2, 128, lx + 2, 146, C.k); rect(lx - 1, 128, lx + 1, 145, e_FA.mesaS); rect(lx - 1, 128, lx - 1, 145, e_FA.mesa); }
  rect(62, 138, 220, 139, e_FA.mesaD); for (let i = 0; i < 6; i++) { rect(72 + i * 10, 133, 79 + i * 10, 137, C.k); rect(73 + i * 10, 134, 78 + i * 10, 137, i % 2 ? e_FA.piel : e_FA.pielL); }
  // la piel de vaca: contorno irregular (las patas y el cuello), grano, borde más oscuro y la luz de arriba
  const cx = 150, cy = 115, rx = 48, ry = 6.5;
  for (let j = -9; j <= 9; j++) for (let i = -60; i <= 60; i++) { const a = Math.atan2(j / ry, i / rx), r = 1 + 0.13 * Math.sin(a * 4 + 0.6) + 0.06 * Math.sin(a * 9 + 1.3), d = Math.hypot(i / rx, j / ry);
    if (d > r) continue; const x = cx + i, y = cy + j; if (x < 66 || x > 216 || y < 109 || y > 123) continue; let c = d > r - 0.1 ? e_FA.pielS : j < -2 ? e_FA.pielL : e_FA.piel; if (h(x, y, 577) < 0.12) c = e_FA.pielS; if (h(x, y, 578) < 0.05) c = e_FA.pielC; pset(x, y, c); }
  // los huecos de los paneles ya cortados (se ve la madera) con su borde fresco
  for (const [hx, hy] of [[168, 113], [184, 117], [170, 120]]) { e_faPanel(R, hx, hy, 7, 2, [e_FA.mesa, e_FA.mesaS, e_FA.mesaL]); pset(hx - 7, hy, e_FA.pielC); pset(hx + 7, hy, e_FA.pielC); }
  // las plantillas de metal con la forma del panel, la regla y la cuchilla
  e_faPanel(R, 126, 114, 8, 2, [e_FA.grisL, e_FA.gris, C.blanco]); linea(98, 120, 122, 120, C.metalL); linea(98, 121, 122, 121, C.metalS); for (let x = 100; x < 122; x += 3) pset(x, 120, C.k);
  rect(196, 111, 204, 112, C.k); rect(197, 111, 200, 111, hex('#e8c040')); rect(201, 111, 203, 111, C.metalL);
  for (let i = 0; i < 3; i++) e_faPanel(R, 80 + i * 1, 117 - i, 7, 2, [e_FA.piel, e_FA.pielS, e_FA.pielL]);
}

// un panel de los cuatro del balón (un huso de punta a punta, de lado: l, el medio largo; w, el medio ancho);
// c = [cuerpo, borde, luz]
function e_faPanel(R, cx, cy, l, w, c) {
  for (let i = -l; i <= l; i++) { const ww = Math.round(w * Math.sqrt(1 - (i / (l + 0.5)) ** 2)); for (let j = -ww; j <= ww; j++) R.pset(cx + i, cy + j, Math.abs(j) === ww || Math.abs(i) === l ? c[1] : j < 0 ? c[2] : c[0]); }
}

// el cartel del cerdo y la vaca: un marco con el pictograma del cerdo; con u de 0 a 0,5 se tacha con una cruz roja que se
// dibuja sola; de 0,5 a 1, la vaca aparece por debajo, tramada, y la cruz se va (x, y: la esquina de arriba a la izquierda)
function e_faCartelPiel(R, x, y, u, t) {
  const { rect, pset, linea, disco } = R; u = Math.max(0, Math.min(1, u));
  rect(x, y, x + 24, y + 20, C.k); rect(x + 1, y + 1, x + 23, y + 19, e_FA.cremL); rect(x + 1, y + 18, x + 23, y + 19, e_FA.cremS); pset(x + 12, y - 1, C.metalD);
  const vaca = u > 0.5 ? Math.min(1, (u - 0.5) / 0.3) : 0, cerdo = 1 - vaca;
  const dibuja = (f, a) => { for (let j = 0; j < 14; j++) for (let i = 0; i < 20; i++) { const c = f(i, j); if (c && e_faU(x + 2 + i, y + 3 + j) < a) pset(x + 2 + i, y + 3 + j, c); } };
  if (cerdo > 0) dibuja((i, j) => { const e = ((i - 9) / 7) ** 2 + ((j - 6) / 4.2) ** 2; if (e < 1) return e > 0.75 ? hex('#a85a6a') : hex('#e89aa8'); if (i >= 15 && i <= 18 && j >= 4 && j <= 7) return hex('#d87a8a'); if ((i === 5 || i === 12) && j > 9 && j < 13) return hex('#a85a6a'); if (i === 2 && j === 4) return hex('#a85a6a'); return 0; }, cerdo);
  if (vaca > 0) dibuja((i, j) => { const e = ((i - 9) / 7) ** 2 + ((j - 6) / 3.8) ** 2; if (e < 1) return h(i >> 2, j >> 2, 579) < 0.4 ? C.k : C.blanco; if (i >= 15 && i <= 19 && j >= 2 && j <= 6) return i > 17 && j > 4 ? hex('#e8a8a8') : C.blanco; if (i === 15 && j === 1) return e_FA.cremS; if ((i === 4 || i === 6 || i === 12 || i === 14) && j > 9 && j < 13) return C.k; return 0; }, vaca);
  const cruz = Math.min(1, u / 0.5) * (u > 0.7 ? Math.max(0, 1 - (u - 0.7) / 0.15) : 1);
  if (cruz > 0) { const n1 = Math.min(1, cruz * 2), n2 = Math.max(0, cruz * 2 - 1);
    for (let k = 0; k <= 18 * n1; k++) { pset(x + 3 + k, y + 3 + Math.round(k * 0.72), C.rojo); pset(x + 4 + k, y + 3 + Math.round(k * 0.72), C.rojoS); }
    for (let k = 0; k <= 18 * n2; k++) { pset(x + 21 - k, y + 3 + Math.round(k * 0.72), C.rojo); pset(x + 20 - k, y + 3 + Math.round(k * 0.72), C.rojoS); } }
  if (u > 0.85 && u < 0.98) for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.57; pset(Math.round(x + 12 + Math.cos(a) * 14), Math.round(y + 10 + Math.sin(a) * 11), C.oroL); }
}

// la fila de máquinas en x 70, 128, 186, 244 (mesa a y 112–117; los costureros detrás); la estación de dar la vuelta en
// x 10–50 (la barra a y 96–134)
function e_faCostura(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_fijo(R, 'fa:costura', () => e_faCosturaFijo(R));
  for (const [k, x0] of [[3, 60], [4, 178]]) e_faVistaPueblo(R, t, x0 + 2, 22, x0 + 79, 67, k);
  for (const x0 of [60, 178]) { for (let x = x0 + 2; x <= x0 + 79; x += 13) rect(x, 22, x, 67, hex('#2a3038')); for (let y = 22; y <= 67; y += 9) rect(x0 + 2, y, x0 + 79, y, hex('#2a3038')); rect(x0 + 2 + 13 * 2, 31, x0 + 2 + 13 * 3, 40, e_mezcla(hex('#94c8ec'), C.blanco, 0.2)); for (let i = 0; i < 5; i++) pset(x0 + 8 + i * 15, 26 + i * 8, hex('#e8f4fc')); }
  // los costureros, cada uno a su ritmo, detrás de su máquina
  const MQ = [70, 128, 186, 244];
  MQ.forEach((mx, k) => e_faFigura(R, mx - 12, 113, t, { sentado: true, trabaja: true, dir: 1, c: [e_FA.azulT, hex('#8a4a6a'), e_FA.verdeT, e_FA.ocreT][k], pelo: [e_FA.pelo1, e_FA.pelo2, e_FA.pelo3, e_FA.pelo4][k], piel: [e_FA.pielP, e_FA.pielP2, e_FA.pielP3, e_FA.pielP][k], coleta: k % 2 === 1, fase: k * 1.7, vel: 4 + k * 0.5 }));
  e_faCapa(R, 'fa:costura:mesas', () => { for (const mx of MQ) e_faMesaCoser(R, mx); });
  MQ.forEach((mx, k) => { const v = 6 + k, f = t * v + k;
    // la aguja que sube y baja, el balón (dos paneles cosidos del revés) que avanza bajo el prensatelas, el hilo del cono
    const ay = Math.round(99 + (Math.sin(f * 3) > 0 ? 1 : 0)); rect(mx + 2, 97, mx + 2, ay + 2, C.metalL); pset(mx + 2, ay + 3, C.blanco);
    const bx = mx + 2 + ((t * 3 + k * 5) % 10) - 5; e_faBalon(R, Math.round(bx), 108, 5, { reves: true });
    linea(mx + 16, 82, mx + 4, 93, e_FA.hiloS); pset(mx + 4 + Math.round(((t * 20 + k) % 12)), Math.round(93 - ((t * 20 + k) % 12) * 0.9), C.blanco);
    // la lámpara de cada máquina, que tiembla un poco con la vibración
    if (Math.floor(f * 2) % 7 === 0) pset(mx - 4, 96, e_FA.luzL); });
  // la estación de dar la vuelta (o.vuelta: 0 del revés, 1 del derecho), con la operaria que tira
  { const u = o.vuelta ?? ((t % 6) / 6), e = Math.max(0, Math.min(1, (u - 0.2) / 0.6)), y = Math.round(96 + e * 22);
    if (e < 0.5) e_faBalon(R, 30, y, 8, { reves: true, hinchado: 0.6 }); else e_faBalon(R, 30, y, 8, { cordon: 0, hinchado: 0.7 });
    if (e > 0.35 && e < 0.65) for (let k = 0; k < 4; k++) pset(Math.round(30 + Math.cos(t * 9 + k * 1.6) * 11), Math.round(y + Math.sin(t * 9 + k * 1.6) * 6), e_FA.luzL); }
  e_faCapa(R, 'fa:costura:barra', () => { const { rect: r } = R; r(29, 90, 31, 136, C.k); r(30, 90, 30, 136, C.metalL); });
  // el ventilador de pie que gira (fondo, a la derecha) y sus cintas
  { const fx = 300, fy = 78; disco(fx, fy, 9, C.k); disco(fx, fy, 8, e_FA.grisL); for (let k = 0; k < 3; k++) { const a = t * 12 + k * 2.09; for (let r = 1; r < 7; r++) pset(Math.round(fx + Math.cos(a) * r), Math.round(fy + Math.sin(a) * r), e_FA.gris); }
    for (let r = 2; r <= 8; r += 3) for (let a = 0; a < 6.28; a += 0.25) pset(Math.round(fx + Math.cos(a) * r), Math.round(fy + Math.sin(a) * r), e_FA.grisS); disco(fx, fy, 1, C.k);
    for (let i = 0; i < 6; i++) pset(Math.round(fx - 10 - i - Math.sin(t * 11 + i) * i * 0.4), fy - 4 + Math.round(Math.sin(t * 9 + i * 0.8) * 1.4), i % 2 ? C.rojo : C.rojoS); }
  // los conos de hilo del estante que giran (la marca se ve pasar)
  for (let i = 0; i < 6; i++) { const cx = 152 + i * 5; if (Math.floor(t * 4 + i) % 2) pset(cx, 82, e_FA.hiloS); }
}

// lo fijo de la sala de costura
function e_faCosturaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  e_faTecho(R, 12);
  // ladrillo visto (rojo de verdad) con pilastras y la viga de acero
  e_faLadrillos(R, 0, 13, 319, 126, 40);
  for (const px of [44, 162, 266]) { rect(px, 13, px + 7, 126, e_FA.ladS); rect(px, 13, px + 1, 126, e_FA.ladL); for (let y = 16; y < 126; y += 8) rect(px + 2, y, px + 7, y, e_FA.ladD); }
  rect(0, 13, 319, 16, C.k); rect(0, 14, 319, 15, e_FA.grisS); for (let x = 4; x < 320; x += 12) pset(x, 14, e_FA.grisL);
  // dos ventanales de acero con su dintel de ladrillo a sardinel y el alféizar de piedra (el paisaje es de la vida)
  for (const x0 of [60, 178]) { for (let x = x0 - 2; x <= x0 + 83; x += 2) { rect(x, 16, x, 20, (x >> 1) % 2 ? e_FA.ladS : e_FA.lad); } rect(x0 - 2, 20, x0 + 83, 20, e_FA.mort);
    rect(x0, 21, x0 + 81, 68, C.k); rect(x0 + 1, 21, x0 + 80, 67, hex('#2a3038')); rect(x0 - 3, 69, x0 + 84, 71, hex('#c8c0b0')); rect(x0 - 3, 69, x0 + 84, 69, hex('#e8e0d0')); rect(x0 - 3, 72, x0 + 84, 72, e_FA.ladD); }
  // el estante de los conos de hilo (blanco, crudo y marrón) con su hilo, entre las ventanas
  rect(146, 84, 186, 86, C.k); rect(147, 84, 185, 85, e_FA.mesaL); for (let i = 0; i < 7; i++) { const cx = 150 + i * 5; poligono([[cx - 2, 83], [cx, 74], [cx + 2, 83]], C.k); rect(cx - 1, 76, cx + 1, 83, [e_FA.hilo, e_FA.hiloS, e_FA.hilo, e_FA.carne, e_FA.hilo, e_FA.pielL, e_FA.hilo][i]); pset(cx - 1, 77, C.blanco); rect(cx, 72, cx, 74, e_FA.mesaS); }
  // el tablón con muestras: paneles con su costura, en sus clavos; y el calendario de pictogramas (rayas y un círculo)
  rect(8, 30, 40, 58, C.k); rect(9, 31, 39, 57, hex('#b88a5a')); for (let k = 0; k < 40; k++) pset(9 + Math.floor(h(k, 1, 580) * 30), 31 + Math.floor(h(k, 2, 580) * 26), hex('#9a6e40'));
  for (let i = 0; i < 3; i++) { e_faPanel(R, 16 + i * 9, 40, 3, 6, [e_FA.piel, e_FA.pielS, e_FA.pielL]); pset(16 + i * 9, 33, C.rojo); for (let j = -4; j <= 4; j += 2) pset(16 + i * 9 + 3, 40 + j, e_FA.hilo); }
  for (let i = 0; i < 3; i++) rect(12 + i * 9, 51, 18 + i * 9, 55, C.blanco); disco(31, 53, 2, C.rojo);
  rect(278, 30, 304, 54, C.k); rect(279, 31, 303, 53, C.blanco); for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) rect(281 + i * 4, 37 + j * 4, 283 + i * 4, 39 + j * 4, (i + j) % 3 ? e_FA.cremS : C.rojo); rect(279, 31, 303, 35, C.rojo);
  // el carril de luces largo sobre la fila
  rect(60, 80, 300, 81, e_FA.grisS); for (let x = 64; x < 300; x += 58) { e_faFluor(R, x, x + 40, 82, 16); }
  // el suelo de tablas de arce con vetas, juntas y el brillo del barniz
  for (let y = 126; y < 180; y++) { const f = y * 320, fila = Math.floor((y - 126) / 5), r = (y - 126) % 5;
    for (let x = 0; x < 320; x++) { const xx = x + fila * 37, tabla = Math.floor(xx / 46), q = xx % 46, v = h(tabla, fila, 581);
      let c = r === 4 || q === 0 ? hex('#7a5a3a') : v < 0.3 ? hex('#b88a5a') : v > 0.7 ? hex('#d0a070') : hex('#c4965e'); if (r !== 4 && Math.sin(xx * 0.3 + v * 9 + r) > 0.92) c = hex('#a87a4a'); if (r === 0 && q > 2 && h(x, y, 582) < 0.3) c = hex('#dcb080');
      B[f + x] = c; } }
  rect(0, 126, 319, 127, e_FA.ladD); rect(0, 128, 319, 128, hex('#6a4a2a'));
  for (let y = 132; y < 160; y++) for (let x = 70; x < 300; x++) if (e_faU(x, y) < 0.18 * (1 - (y - 132) / 28)) B[y * 320 + x] = hex('#e8c48c');
  // los cubos con balones del revés junto a cada máquina, y el carro con balones del derecho (en primer término)
  for (const bx of [100, 158, 216]) { rect(bx, 124, bx + 12, 138, C.k); rect(bx + 1, 125, bx + 11, 137, hex('#5a7a9a')); rect(bx + 1, 125, bx + 11, 126, hex('#7a9aba')); for (let i = 0; i < 3; i++) e_faBalon(R, bx + 3 + i * 3, 122 - (i % 2) * 2, 3, { reves: true }); }
  { const cx = 262; rect(cx, 134, cx + 46, 148, C.k); rect(cx + 1, 135, cx + 45, 147, hex('#8a8a90')); for (let x = cx + 3; x < cx + 45; x += 4) rect(x, 135, x, 147, hex('#6a6a72')); rect(cx + 1, 135, cx + 45, 135, hex('#b8b8c0'));
    for (let i = 0; i < 6; i++) e_faBalon(R, cx + 7 + i * 7, 131 - (i % 2) * 3, 4, { cordon: 0 }); for (let i = 0; i < 4; i++) e_faBalon(R, cx + 11 + i * 8, 125, 4, { cordon: 0 });
    for (const wx of [cx + 4, cx + 42]) { disco(wx, 150, 2, C.k); pset(wx, 150, e_FA.grisL); } }
  // la estación de dar la vuelta: el pie, el plato y la caja de los ya vueltos
  rect(16, 134, 44, 140, C.k); rect(17, 135, 43, 139, e_FA.maq); rect(17, 135, 43, 135, e_FA.maqL); rect(22, 140, 38, 152, C.k); rect(23, 140, 37, 151, e_FA.maqS); rect(14, 152, 46, 154, C.k);
  e_faCaja(R, 50, 140, 70, 154, 7); for (let i = 0; i < 3; i++) e_faBalon(R, 54 + i * 6, 138, 3, { cordon: 0 });
  for (let y = 154; y < 158; y++) for (let x = 12; x < 74; x++) if (e_faU(x, y) < 0.5) pset(x, y, hex('#8a6a42'));
  // en primer término: la cesta de mimbre con conos de hilo (abajo a la derecha) y la alfombrilla de goma junto a la fila
  { const cx = 286; rect(cx, 162, cx + 30, 178, C.k); for (let y = 163; y < 178; y++) for (let x = cx + 1; x < cx + 30; x++) pset(x, y, (x + (y >> 1)) % 4 < 2 ? hex('#c8a060') : hex('#a07a40')); rect(cx + 1, 163, cx + 29, 164, hex('#e0c080'));
    for (let i = 0; i < 6; i++) { const x = cx + 4 + i * 4; R.poligono([[x - 2, 162], [x, 154 + (i % 2) * 2], [x + 2, 162]], C.k); rect(x - 1, 157 + (i % 2) * 2, x + 1, 161, [e_FA.hilo, e_FA.carne, e_FA.hiloS, e_FA.pielL, e_FA.hilo, e_FA.cremS][i]); } }
  for (let y = 146; y < 152; y++) for (let x = 84; x < 262; x++) B[y * 320 + x] = (x + y) % 3 === 0 ? hex('#2a2a30') : hex('#3a3a42');
  rect(84, 146, 261, 146, hex('#4a4a54'));
}

// una máquina de coser industrial sobre su mesa (mx: la aguja), con el brazo, el volante, la lámpara de cuello de cisne,
// el cono de hilo en su soporte, el pedal y la sombra (capa: va delante del costurero)
function e_faMesaCoser(R, mx) {
  const { rect, pset, disco, linea } = R;
  rect(mx - 22, 110, mx + 24, 116, C.k); rect(mx - 21, 110, mx + 23, 112, e_FA.mesaL); rect(mx - 21, 113, mx + 23, 115, e_FA.mesa);
  for (const lx of [mx - 19, mx + 21]) { rect(lx - 1, 116, lx + 1, 140, C.k); pset(lx, 117, e_FA.grisL); } rect(mx - 19, 132, mx + 21, 133, C.k);
  rect(mx - 4, 134, mx + 6, 138, C.k); rect(mx - 3, 135, mx + 5, 137, e_FA.gris);
  for (let y = 140; y < 145; y++) for (let x = mx - 24 + (y - 140); x < mx + 26; x++) if (e_faU(x, y) < 0.5) pset(x, y, hex('#8a6a42'));
  // el cuerpo de la máquina: base, columna y brazo, con su luz arriba y su sombra
  rect(mx - 2, 104, mx + 18, 110, C.k); rect(mx - 1, 105, mx + 17, 109, e_FA.maq); rect(mx - 1, 105, mx + 17, 105, e_FA.maqL);
  rect(mx + 12, 90, mx + 18, 105, C.k); rect(mx + 13, 91, mx + 17, 104, e_FA.maq); rect(mx + 13, 91, mx + 13, 104, e_FA.maqL);
  rect(mx - 1, 90, mx + 18, 96, C.k); rect(mx, 91, mx + 17, 95, e_FA.maq); rect(mx, 91, mx + 17, 91, e_FA.maqL); rect(mx, 95, mx + 17, 95, e_FA.maqS);
  rect(mx, 96, mx + 4, 98, C.k); rect(mx + 1, 96, mx + 3, 97, e_FA.grisL);
  disco(mx + 20, 96, 4, C.k); disco(mx + 20, 96, 3, e_FA.grisS); pset(mx + 20, 96, e_FA.grisL);
  // la lámpara de cuello de cisne y su luz sobre la mesa
  linea(mx - 6, 110, mx - 6, 98, C.k); linea(mx - 6, 98, mx - 3, 94, C.k); rect(mx - 6, 94, mx - 2, 96, C.k); pset(mx - 4, 96, e_FA.luzL);
  for (let y = 100; y < 110; y++) for (let x = mx - 8; x <= mx + 6; x++) if (e_faU(x, y) < 0.3 * (1 - Math.abs(x - mx + 1) / 8)) pset(x, y, e_mezcla(R.pget(x, y), e_FA.luz, 0.3));
  // el soporte del cono de hilo
  rect(mx + 16, 80, mx + 16, 90, C.k); poligono_(R, [[mx + 14, 88], [mx + 16, 81], [mx + 18, 88]], e_FA.hilo); pset(mx + 15, 86, C.blanco);
}

// el banco de los cordones (x 20–120, tablero a y 118), el manómetro (x 178, y 66), la báscula (x 206–232), la cinta
// (x 140–250, y 110), las cajas en el palé (x 256–318) y el gato (o.gato) en el suelo a x 150
function e_faCordones(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_fijo(R, 'fa:cordones', () => e_faCordonesFijo(R));
  e_faVistaPueblo(R, t, 132, 28, 175, 55, 5); rect(153, 28, 154, 55, hex('#e8e0d0')); rect(132, 41, 175, 42, hex('#e8e0d0'));
  // el lazador del fondo, que tira del cordón con los dos brazos (detrás del banco)
  e_faFigura(R, 62, 116, t, { trabaja: true, dir: 1, c: hex('#5a8a6a'), del: e_FA.pielS, pelo: e_FA.pelo4, fase: 0.5, vel: 2.2 });
  e_faCapa(R, 'fa:cordones:banco', () => e_faBancoCordones(R));
  // el balón en el soporte: el cordón blanco entra y sale de los ojales, la lezna empuja, el carrete gira
  { const c = (t % 5) / 5, n = Math.floor(c * 9); e_faBalon(R, 78, 106, 9, { cordon: Math.min(1, c * 1.2) });
    const ly = 106 - 4, lx = 72 + n; linea(lx, ly, lx + 6, ly - 6 + Math.round(Math.sin(t * 6) * 2), e_FA.hilo); linea(lx + 6, ly - 6 + Math.round(Math.sin(t * 6) * 2), 98, 108, e_FA.hiloS);
    linea(lx + 1, ly + 1, lx + 4, ly + 4, C.metalL); pset(lx + 4, ly + 5, e_FA.mesaS);
    disco(108, 112, 4, C.k); disco(108, 112, 3, e_FA.hilo); const a = -t * 3; pset(Math.round(108 + Math.cos(a) * 2), Math.round(112 + Math.sin(a) * 2), e_FA.hiloS); }
  // el manómetro de la estación de inflado: la aguja sube con o.inflado (o sola, cada 6 s) y el balón se hincha
  { const u = o.inflado ?? Math.min(1, ((t % 6) / 6) * 1.4), a = Math.PI * (0.8 + 1.4 * u), x = 178, y = 66;
    linea(x, y, Math.round(x + Math.cos(a) * 9), Math.round(y + Math.sin(a) * 9), C.rojo); disco(x, y, 1, C.k);
    e_faBalon(R, 181, 103, 8, { hinchado: 0.35 + u * 0.65 });
    if (u > 0.15 && u < 0.98) for (let i = 0; i < 3; i++) { const v = ((t * 3 + i / 3) % 1); pset(Math.round(172 - v * 4), Math.round(98 - v * 3), e_FA.cremL); } }
  // la báscula: las cifras cambian cuando le ponen un balón (peso entre 14 y 15 onzas)
  { const p = 14 + (Math.floor(t / 2) % 2 ? 1 : 0); e_faCifras(R, String(p), 216, 95, hex('#8af0a8')); if (Math.floor(t * 2) % 2) pset(229, 99, hex('#8af0a8')); }
  // la cinta con balones terminados que avanza hacia las cajas (los rodillos giran)
  { const off = (t * 6) % 18; for (let i = 0; i < 7; i++) { const x = Math.round(140 + i * 18 + off); if (x > 140 && x < 250) e_faBalon(R, x, 120, 5); }
    for (let x = 142; x < 250; x += 6) pset(x + Math.floor(t * 8) % 3, 127, e_FA.grisL); }
  // el operario de las cajas, que lleva una al palé y vuelve
  { const u = (t % 10) / 10, ida = u < 0.5, v = ida ? u / 0.5 : (u - 0.5) / 0.5, e = v * v * (3 - 2 * v), x = Math.round(ida ? 252 + e * 26 : 278 - e * 26);
    e_faFigura(R, x, 140, t, { anda: e > 0.02 && e < 0.98, dir: ida ? 1 : -1, c: e_FA.azulT, del: e_FA.pielS, pelo: e_FA.pelo3, carga: ida, fase: 3 }); }
  // la radio que suena (las notitas suben) y la luz del ventanuco que cae
  { const u = (t * 0.6) % 1; pset(Math.round(118 + Math.sin(t * 2) * 2), Math.round(84 - u * 12), u < 0.7 ? C.oroL : e_FA.cremS); pset(Math.round(122 + Math.sin(t * 2.5 + 1) * 2), Math.round(82 - ((u + 0.5) % 1) * 12), C.oroL); }
  for (let k = 0; k < 12; k++) { const x = Math.round(150 + h(k, 1, 583) * 60 + ((t * 2 + k * 9) % 30)), y = Math.round(60 + ((h(k, 2, 583) * 70 + t * (2 + k % 3)) % 70)); if (Math.sin(t * 1.3 + k) > 0) pset(x, y, e_FA.luzL); }
  if (o.gato != null) f_gato(R, 150, 160, t, o.gato);
}

// lo fijo de la sala de los cordones
function e_faCordonesFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  e_faTecho(R, 12);
  // la pared: paneles de madera clara abajo y ladrillo pintado de crema arriba, la moldura y el zócalo
  e_faLadrillos(R, 0, 13, 319, 92, 50, [e_FA.crem, e_FA.cremS, e_FA.cremL, e_mezcla(e_FA.cremS, e_FA.crem, 0.5)]);
  for (let y = 92; y < 132; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const q = x % 16; B[f + x] = q === 0 ? e_FA.mesaS : q === 1 ? e_FA.mesaL : Math.sin(x * 0.7 + y * 0.05 + Math.floor(x / 16)) > 0.85 ? e_FA.mesa : hex('#b88a5a'); } }
  rect(0, 91, 319, 92, e_FA.mesaD); rect(0, 93, 319, 93, e_FA.mesaL);
  // el ventanuco a la calle (el paisaje es de la vida) con su marco blanco
  rect(129, 25, 178, 58, hex('#e8e0d0')); rect(131, 27, 176, 56, C.k); rect(127, 58, 180, 60, hex('#d8d0c0'));
  // el tablón de corcho con dibujos de balones (paneles, cotas con flechas), fotos y chinchetas
  rect(12, 24, 86, 72, C.k); rect(13, 25, 85, 71, hex('#c89a5a')); for (let k = 0; k < 70; k++) pset(13 + Math.floor(h(k, 1, 584) * 72), 25 + Math.floor(h(k, 2, 584) * 46), hex('#a87a40'));
  rect(17, 29, 45, 49, C.blanco); e_faBalon(R, 31, 39, 9, { cordon: 1 }); linea(20, 46, 42, 46, C.azul); pset(20, 45, C.azul); pset(42, 45, C.azul); pset(19, 46, C.azul); pset(43, 46, C.azul); disco(31, 29, 1, C.rojo);
  rect(50, 30, 80, 46, hex('#f2efe6')); for (let i = 0; i < 4; i++) e_faPanel(R, 58 + (i % 2) * 14, 35 + (i >> 1) * 6, 6, 2, [e_FA.carne, e_FA.pielS, e_FA.carneL]); linea(53, 44, 77, 44, C.rojo); disco(65, 30, 1, hex('#2a8a3a'));
  rect(18, 54, 34, 66, C.k); rect(19, 55, 33, 65, hex('#8ac8e8')); rect(19, 61, 33, 65, hex('#5aa83a')); disco(26, 59, 2, hex('#3a3a46')); disco(26, 54, 1, C.amarillo);
  rect(40, 52, 58, 68, C.k); rect(41, 53, 57, 67, hex('#f8f0d8')); for (let j = 0; j < 4; j++) rect(43, 56 + j * 3, 43 + 8 + (j * 3) % 5, 56 + j * 3, e_FA.cremS); e_faCifras(R, '1955', 42, 62, C.rojoS);
  rect(64, 52, 82, 66, C.k); rect(65, 53, 81, 65, hex('#f2efe6')); e_faLogo(R, 73, 59, 1); disco(73, 52, 1, C.azul);
  // el manómetro grande de la estación de inflado (la aguja es de la vida), la manguera, la llave y el filtro
  disco(178, 66, 12, C.k); disco(178, 66, 11, C.metalL); disco(178, 66, 10, C.blanco); for (let k = 0; k <= 14; k++) { const a = Math.PI * (0.8 + 1.4 * k / 14); pset(Math.round(178 + Math.cos(a) * 9), Math.round(66 + Math.sin(a) * 9), C.k); if (k % 7 === 0) pset(Math.round(178 + Math.cos(a) * 8), Math.round(66 + Math.sin(a) * 8), C.k); }
  for (let k = 11; k <= 14; k++) { const a = Math.PI * (0.8 + 1.4 * k / 14); pset(Math.round(178 + Math.cos(a) * 7), Math.round(66 + Math.sin(a) * 7), C.verdeL); }
  pset(173, 62, C.blanco); rect(177, 78, 179, 84, C.metalS); rect(171, 84, 187, 86, C.metalD); linea(186, 86, 186, 96, C.k); linea(186, 96, 178, 100, C.k); linea(178, 100, 172, 98, C.k); rect(190, 82, 194, 90, C.k); rect(191, 83, 193, 89, hex('#c8d8e0'));
  // la radio en su repisa
  rect(108, 84, 134, 86, e_FA.mesaD); rect(110, 74, 132, 84, C.k); rect(111, 75, 131, 83, hex('#8a3a2a')); for (let y = 76; y < 83; y += 2) rect(112, y, 121, y, hex('#6a2a1a')); disco(126, 79, 3, C.k); disco(126, 79, 2, e_FA.crem); linea(112, 74, 106, 64, C.metalD);
  // la estantería del fondo a la derecha con carretes de cordón y cajas de cámaras (vejigas)
  rect(256, 50, 318, 92, C.k); rect(257, 51, 317, 91, e_FA.mesaD); for (const y of [64, 78, 90]) { rect(256, y, 318, y + 1, e_FA.mesa); rect(256, y, 318, y, e_FA.mesaL); }
  for (let i = 0; i < 7; i++) { const cx = 263 + i * 8; disco(cx, 59, 4, C.k); disco(cx, 59, 3, e_FA.hilo); disco(cx, 59, 1, e_FA.mesaS); pset(cx - 1, 57, C.blanco); }
  for (let i = 0; i < 4; i++) { rect(259 + i * 14, 67, 270 + i * 14, 77, C.k); rect(260 + i * 14, 68, 269 + i * 14, 77, i % 2 ? e_FA.cajaS : e_FA.caja); rect(260 + i * 14, 68, 269 + i * 14, 68, e_FA.cajaL); }
  for (let i = 0; i < 5; i++) { rect(260 + i * 11, 80, 268 + i * 11, 89, C.k); rect(261 + i * 11, 81, 267 + i * 11, 89, i % 2 ? hex('#3a3a46') : hex('#4a4a5a')); disco(264 + i * 11, 85, 2, hex('#6a6a7a')); }
  // el reloj de pared y el perchero con dos delantales de cuero y una gorra
  disco(226, 40, 7, C.k); disco(226, 40, 6, C.blanco); for (let k = 0; k < 12; k++) pset(Math.round(226 + Math.cos(k * Math.PI / 6) * 5), Math.round(40 + Math.sin(k * Math.PI / 6) * 5), C.k); linea(226, 40, 226, 36, C.k); linea(226, 40, 229, 41, C.k);
  rect(94, 30, 124, 31, e_FA.mesaD); for (const [hx, c] of [[99, e_FA.piel], [109, e_FA.pielL], [119, hex('#2a4a8a')]]) { pset(hx, 32, C.metalD); if (hx < 115) { rect(hx - 3, 33, hx + 3, 50, C.k); rect(hx - 2, 34, hx + 2, 49, c); rect(hx - 2, 34, hx - 2, 49, e_mezcla(c, C.blanco, 0.2)); linea(hx - 3, 33, hx - 5, 40, e_FA.pielS); } else { rect(hx - 3, 33, hx + 3, 36, C.k); rect(hx - 2, 33, hx + 2, 35, c); rect(hx + 3, 35, hx + 5, 36, c); } }
  // la tubería del aire que cruza la pared hasta el manómetro, con sus abrazaderas
  rect(186, 46, 255, 47, C.metalD); rect(186, 46, 255, 46, C.metalL); for (let x = 192; x < 255; x += 14) rect(x, 45, x + 1, 48, e_FA.grisS); rect(186, 46, 187, 56, C.metalD);
  // los fluorescentes y su resplandor
  e_faFluor(R, 30, 76, 19, 13); e_faFluor(R, 190, 236, 19, 13); e_faResplandor(R, 30, 76, 23, 60, 0.22); e_faResplandor(R, 190, 236, 23, 60, 0.22);
  // la báscula sobre su peana, con la pantallita (las cifras son de la vida)
  rect(204, 102, 234, 110, C.k); rect(205, 103, 233, 109, e_FA.grisL); rect(205, 103, 233, 103, C.blanco); rect(212, 92, 232, 101, C.k); rect(213, 93, 231, 100, hex('#1a2a22')); rect(206, 110, 232, 140, C.k); rect(207, 110, 231, 139, e_FA.gris); rect(207, 110, 208, 139, e_FA.grisL);
  // el pie de la estación de inflado (el balón lo pinta la vida) con su aguja
  rect(166, 108, 196, 112, C.k); rect(167, 109, 195, 111, e_FA.maq); rect(167, 109, 195, 109, e_FA.maqL); rect(172, 112, 190, 140, C.k); rect(173, 112, 189, 139, e_FA.maqS); rect(173, 112, 173, 139, e_FA.maqL); rect(180, 104, 181, 108, C.metalL);
  // la cinta transportadora (la banda y los rodillos; los balones son de la vida)
  rect(138, 124, 252, 130, C.k); rect(139, 124, 251, 126, hex('#3a3a44')); rect(139, 127, 251, 129, e_FA.grisS); for (const lx of [144, 246]) { rect(lx, 130, lx + 2, 146, C.k); rect(lx, 130, lx, 146, e_FA.grisL); }
  // el palé con las cajas apiladas (con el logotipo), el film y la carretilla
  rect(254, 134, 318, 140, C.k); rect(255, 135, 317, 139, C.maderaL); for (let x = 258; x < 318; x += 14) rect(x, 137, x + 5, 139, C.maderaD);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3 - (j === 2 ? 1 : 0); i++) e_faCaja(R, 256 + i * 20 + j * 4, 116 - j * 18, 274 + i * 20 + j * 4, 134 - j * 18, i + j * 3);
  for (let y = 82; y < 134; y += 3) for (let x = 256; x < 318; x += 7) if (h(x, y, 585) < 0.4) pset(x, y, hex('#e8eef4'));
  // el suelo de hormigón con la franja y el reflejo de los tubos
  e_faHormigon(R, 140, [172, 2], [[30, 76], [190, 236]]); for (let x = 0; x < 320; x++) { pset(x, 131, e_FA.mesaD); pset(x, 140, e_mezcla(e_FA.sue, C.k, 0.25)); }
  for (let y = 132; y < 140; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x + y) % 9 === 0 ? e_FA.sueS : e_FA.sue;
  // el cubo con trozos de cordón y la escoba apoyada a la izquierda
  rect(4, 128, 14, 142, C.k); rect(5, 129, 13, 141, hex('#5a7a9a')); for (let i = 0; i < 4; i++) linea(6 + i * 2, 128, 8 + i * 2, 124 - (i % 2) * 2, e_FA.hilo);
}

// el banco de los cordones (capa: delante del lazador): tablero de roble con su canto, el soporte del balón, las
// herramientas (lezna, tijeras, el bote de agujas), el cordón suelto que cuelga del canto (el del gato) y la sombra
function e_faBancoCordones(R) {
  const { rect, pset, linea, disco } = R;
  for (let y = 141; y < 147; y++) for (let x = 14 + (y - 141); x < 128; x++) if (e_faU(x, y) < 0.5) pset(x, y, e_mezcla(e_FA.sue, C.k, 0.3));
  rect(14, 114, 128, 122, C.k); rect(15, 114, 127, 116, e_FA.mesaL); rect(15, 117, 127, 121, e_FA.mesa); for (let x = 20; x < 127; x += 23) rect(x, 117, x, 121, e_FA.mesaS);
  for (const lx of [18, 122]) { rect(lx - 2, 122, lx + 2, 142, C.k); rect(lx - 1, 122, lx + 1, 141, e_FA.mesaS); }
  rect(16, 132, 126, 134, C.k); rect(17, 132, 125, 133, e_FA.mesaS); for (let i = 0; i < 4; i++) e_faCaja(R, 26 + i * 22, 123, 42 + i * 22, 131, 20 + i);
  // el soporte del balón (una cuna de madera con su tornillo)
  rect(68, 110, 88, 114, C.k); rect(69, 111, 87, 113, e_FA.mesaD); rect(76, 113, 80, 114, C.metalS);
  // las herramientas: la lezna, las tijeras, el bote de agujas y unas puntas de cordón
  rect(26, 112, 36, 113, C.k); rect(27, 112, 31, 112, e_FA.mesaL); rect(32, 112, 35, 112, C.metalL);
  linea(42, 113, 50, 110, C.metalL); linea(42, 110, 50, 113, C.metalL); disco(41, 110, 1, C.rojo); disco(41, 113, 1, C.rojo);
  rect(54, 106, 59, 113, C.k); rect(55, 107, 58, 113, hex('#6a8aa0')); for (let i = 0; i < 3; i++) pset(55 + i, 105 - i % 2, C.metalL);
  for (let i = 0; i < 3; i++) linea(98 + i * 3, 113, 104 + i * 3, 111, e_FA.hilo);
  // el cordón suelto que cuelga del canto y llega al suelo, hacia el gato
  for (let k = 0; k < 14; k++) pset(126 + Math.round(Math.sin(k * 0.5) * 1.5), 118 + k * 2, e_FA.hilo);
  for (let x = 128; x < 140; x++) pset(x, 146 + Math.round(Math.sin(x * 0.6) * 0.7), e_FA.hilo);
}

// el gato de la fábrica (naranja atigrado, de lado; x: el centro, y: el suelo) con su cordón blanco. enredo 0–1: con 0,
// juega (agazapado, la pata da zarpazos al extremo del cordón que se mueve, la cola se agita); hacia 0,5 se revuelca
// y el cordón le da vueltas; con 1, sentado muy digno, envuelto en tres vueltas de cordón, la cola que se mueve despacio
// y los ojos entornados. Unos 16 px de largo. o.dir (1: mira a la derecha)
export function f_gato(R, x, y, t, enredo = 0, o = {}) {
  const { rect, pset, linea, disco } = R, d = o.dir ?? 1, X = (i) => x + i * d, e = Math.max(0, Math.min(1, enredo));
  const g = hex('#e0903a'), gS = hex('#a85e22'), gL = hex('#f8c070'), raya = hex('#8a4a1a'), ojo = hex('#5aa83a'), nar = hex('#e8a0a8');
  const hilo = e_FA.hilo, hiloS = e_FA.hiloS;
  // la sombra
  for (let i = -8; i <= 8; i++) if ((i & 1) === 0 || Math.abs(i) < 5) pset(x + i, y + 1, e_mezcla(R.pget(x + i, y + 1) || e_FA.sue, C.k, 0.3));
  if (e < 0.35) {
    // agazapado: el cuerpo bajo, la grupa alta que se menea, la pata que da zarpazos al cordón
    const meneo = Math.round(Math.sin(t * 10) * (e < 0.2 ? 1 : 0)), zar = Math.sin(t * 7) > 0.3, cola = Math.sin(t * 6);
    for (let i = -6; i <= 4; i++) { const alto = 4 + (i < -2 ? 1 : 0); for (let j = 0; j < alto; j++) pset(X(i), y - 1 - j + (i < -2 ? -meneo : 0), j === alto - 1 ? gL : (i % 3 === 0 ? raya : j === 0 ? gS : g)); }
    rect(Math.min(X(3), X(7)), y - 6, Math.max(X(3), X(7)), y - 2, g); pset(X(4), y - 7, gS); pset(X(7), y - 7, gS); pset(X(4), y - 8, raya); pset(X(7), y - 8, raya);
    pset(X(6), y - 5, ojo); pset(X(8), y - 4, nar); pset(X(5), y - 4, gL); pset(X(3), y - 6, raya);
    pset(X(-5), y, gS); pset(X(-2), y, gS); pset(X(2), y, gS);
    const px = zar ? 9 : 6, py = zar ? y - 3 : y; pset(X(px - 1), py, g); pset(X(px), py, gL);
    for (let i = 1; i <= 7; i++) pset(X(-6 - i), Math.round(y - 4 - i * 0.8 - Math.sin(cola * 2 + i * 0.6) * (i * 0.4)), i > 5 ? raya : g);
    // el cordón: llega desde la izquierda y su extremo baila delante de la pata
    const ex = X(11 + Math.round(Math.sin(t * 3.3) * 2)), ey = y - 1 - Math.round(Math.abs(Math.sin(t * 4.1)) * 3);
    linea(X(-16), y, X(-9), y, hilo); linea(X(-9), y, X(0), y, hilo); linea(X(0), y, ex, ey, hilo); pset(ex, ey, C.blanco); pset(ex + d, ey, hiloS);
  } else if (e < 0.75) {
    // se revuelca: la tripa arriba, las patas al aire, el cordón le da vueltas
    const f = (e - 0.35) / 0.4, rueda = Math.sin(t * 8) > 0 ? 1 : 0;
    for (let i = -6; i <= 6; i++) for (let j = 0; j < 4; j++) pset(X(i), y - 1 - j, j === 3 ? hex('#e8e0d8') : j === 0 ? gS : i % 3 === 0 ? raya : g);
    rect(Math.min(X(6), X(9)), y - 5, Math.max(X(6), X(9)), y - 1, g); pset(X(7), y - 3, ojo); pset(X(9), y - 2, nar); pset(X(6), y - 6, gS); pset(X(9), y - 6, gS);
    for (const [px, k] of [[-4, 0], [-1, 1], [2, 2], [4, 3]]) { const a = Math.sin(t * 9 + k * 1.7); pset(X(px), y - 5 - (a > 0 ? 1 : 0), g); pset(X(px + (a > 0 ? 1 : 0)), y - 6 - (a > 0 ? 1 : 0), gL); }
    for (let i = 1; i <= 6; i++) pset(X(-6 - i), y - 1 - Math.round(Math.abs(Math.sin(t * 5 + i)) * 2), i > 4 ? raya : g);
    const vueltas = 1 + Math.round(f * 2); for (let v = 0; v < vueltas; v++) { const cx = -3 + v * 3; for (let j = 0; j < 5; j++) pset(X(cx + (j + rueda) % 2), y - 1 - j, hilo); }
    linea(X(-16), y, X(-7), y, hilo); for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1; pset(Math.round(X(0) + Math.cos(a) * 8), Math.round(y - 4 + Math.sin(a) * 3), hilo); }
  } else {
    // sentado, muy digno, envuelto en cordón: el pecho erguido, la cola alrededor de las patas, ojos entornados
    const cola = Math.sin(t * 1.5), parpa = (t % 4) < 0.2;
    for (let j = 0; j < 9; j++) { const w = j < 3 ? 4 : j < 6 ? 3 : 2; for (let i = -w; i <= w; i++) pset(X(i - 1), y - 1 - j, i === -w ? gS : i === w ? gL : (j + i) % 4 === 0 ? raya : g); }
    rect(X(0), y - 3, X(2), y - 1, hex('#e8e0d8'));
    rect(Math.min(X(-2), X(3)), y - 14, Math.max(X(-2), X(3)), y - 10, g); pset(X(-2), y - 15, gS); pset(X(-1), y - 16, raya); pset(X(3), y - 15, gS); pset(X(3), y - 16, raya);
    pset(X(0), y - 12, parpa ? gS : raya); pset(X(2), y - 12, parpa ? gS : raya); pset(X(0), y - 13, gS); pset(X(2), y - 13, gS); pset(X(1), y - 11, nar); pset(X(4), y - 11, gL); pset(X(-3), y - 11, gL); pset(X(1), y - 15, raya);
    for (let i = 1; i <= 7; i++) pset(X(3 + i * 0.9 - (i > 4 ? (i - 4) * 1.5 : 0)), Math.round(y - Math.max(0, (i - 4)) * (1 + cola * 0.5)), i > 5 ? raya : g);
    // las tres vueltas de cordón, con su brillo, y el lazo que cuelga
    for (const [j0, k] of [[2, 0], [5, 1], [8, 2]]) { for (let i = -5; i <= 4; i++) pset(X(i - (k === 2 ? 0 : 0)), y - j0 - Math.round(i * 0.25), (i + k) % 3 === 0 ? hiloS : hilo); }
    pset(X(4), y - 6, hilo); pset(X(5), y - 5, hilo); pset(X(5), y - 4, hilo); pset(X(6), y - 3, hiloS);
    linea(X(-16), y, X(-6), y, hilo);
  }
}

const f_patLim = (u) => Math.max(0, Math.min(1, u));

// umbral de la trama ordenada 4 × 4 (0–1)
const f_PATB = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const f_patB4 = (x, y) => f_PATB[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR): a = 0 deja c, a = 1 da d
function f_patMezcla(c, d, a) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >>> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >>> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// un búfer fijo por lienzo y clave: se pinta una vez (lo que no se pinta queda transparente, a 0) y se guarda
const f_patCAPAS = new WeakMap();

function f_patCapa(R, clave, dibuja) {
  let m = f_patCAPAS.get(R); if (!m) f_patCAPAS.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega un búfer: las filas desde y0 enteras y, por encima, solo los píxeles pintados (lo transparente deja ver el cielo)
function f_patPegar(R, b, y0 = 0) {
  const B = R.buf; for (let i = 0; i < y0 * 320; i++) { const v = b[i]; if (v) B[i] = v; }
  B.set(b.subarray(y0 * 320), y0 * 320);
}

// cifras de 3 × 5 (solo dígitos); rev: del revés (giradas 180°, como se leen los números del lado lejano del campo)
const f_PATDIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function f_patCifras(R, txt, x, y, c, o = {}) {
  const s = String(txt), ex = o.ex ?? 1, ey = o.ey ?? 1, paso = 3 * ex + (o.sep ?? 1), n = s.length;
  for (let k = 0; k < n; k++) { const g = f_PATDIG[s.charCodeAt(o.rev ? n - 1 - k : k) - 48]; if (!g) continue;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) { const jj = o.rev ? 4 - j : j, ii = o.rev ? 2 - i : i; if (g[jj * 3 + ii] === '1') R.rect(x + k * paso + i * ex, y + j * ey, x + k * paso + i * ex + ex - 1, y + j * ey + ey - 1, c); } }
}

// un dibujo de filas de letras con su paleta (dir −1: de espejo, alineado a la derecha del ancho)
function f_patSprite(R, filas, x, y, dir, pal) {
  const w = filas[0].length; filas.forEach((f, j) => { for (let i = 0; i < w; i++) { const c = pal[f[i]]; if (c != null) R.pset(x + (dir > 0 ? i : w - 1 - i), y + j, c); } });
}

const f_PAT = pal({
  techo: '#121622', techoL: '#1a2030', viga: '#262e42', vigaL: '#3a4660', panelO: '#2a3246', panel: '#8494ae', panelL: '#b4c2d6', panelB: '#dce6f2',
  luz: '#fff2c8', luzS: '#a89c74', calido: '#ffc878', asiento: '#262a36', asientoL: '#343a4a', escalon: '#4a4e5c', escalonL: '#6a6e7e',
  cristalS: '#121a28', cristal: '#1c283c', cristalL: '#30425e', hormigon: '#7e7e88', hormigonS: '#5a5a66', hormigonL: '#9e9ea8',
  poste: '#f4cc2a', posteS: '#b88e12', posteL: '#fff6a0', cinta: '#f07a34', cintaS: '#b8501e',
  muro: '#16303e', muroL: '#24505e', apron: '#3a6634', apronS: '#2c5228', apronL: '#4a7a42',
  zonaA: '#1e8a8a', zonaB: '#8a2a3a', blancoS: '#c8ccd4', negro: '#14141c',
  paloma: '#8e94a4', palomaS: '#60667a', palomaL: '#bcc2d0', palomaV: '#4a9a7a', palomaM: '#8a5a9a', palomaW: '#3e4458', pata: '#e08a8a', pico: '#3a3440', ojo: '#f08a3a',
  nieve: '#f6f9fc', nieveS: '#ccd8e6', molec: '#f0faff', molecS: '#3a6a9e', vaho: '#dfe6ee',
  pinoS: '#1a3a32', pino: '#24483e', pinoL: '#2e5a4a',
});

// la ropa del público: los colores del equipo de casa (más), los del visitante y ropa de calle
const f_PATROPA = {
  vegas: ['#1e8a8a', '#1e8a8a', '#146464', '#f07a34', '#1e8a8a', '#e8e8f0', '#2a2a36', '#8a2a3a', '#f07a34', '#5a6a8a', '#146464', '#c8c8d0'].map(hex),
  denver: ['#8a2a3a', '#8a2a3a', '#641e2a', '#f2eee2', '#8a2a3a', '#2a2a36', '#1e8a8a', '#5a5a6a', '#641e2a', '#c8a050', '#3a4a6a', '#f2eee2'].map(hex),
};

const f_PATPIEL = ['#f0c8a0', '#d8a07a', '#a86a44', '#7a4a2e'].map(hex), f_PATPELO = ['#2a1e18', '#5a3a22', '#c8a060', '#1a1418', '#8a8a96'].map(hex);

// el público de una grada, fila a fila de la lejana a la cercana: filas = [[y de los hombros, tamaño 1–3], …]; o.x0, o.x1;
// o.hueco(x, y) → true donde no hay gente (escaleras, túneles, palcos); la ola recorre la grada, unos botan y aplauden, en
// Las Vegas saltan flashes de móviles y en Denver (o.frio) llevan gorro y bufanda y les sale vaho
function f_patPublico(R, t, filas, lugar, o = {}) {
  const { rect, pset } = R, ROPA = f_PATROPA[lugar], frio = lugar === 'denver', x0 = o.x0 ?? 0, x1 = o.x1 ?? 319;
  const vaho = f_PAT.vaho, blanco = C.blanco ?? hex('#ffffff');
  filas.forEach(([yb, k], fi) => {
    const sep = k === 1 ? 3 : k === 2 ? 5 : 6;
    for (let x = x0 + (fi % 2) * (sep >> 1); x <= x1 - sep + 1; x += sep) {
      if (o.hueco && o.hueco(x + (sep >> 1), yb)) continue;
      const i = Math.round(x / sep), r = h(i, fi, 411); if (r < 0.05) continue;
      const ropa = ROPA[Math.floor(h(i, fi, 412) * ROPA.length)], piel = f_PATPIEL[Math.floor(h(i, fi, 413) * 4)], pelo = f_PATPELO[Math.floor(h(i, fi, 414) * 5)];
      const ola = (((x / 420 - t * 0.19 + fi * 0.006) % 1) + 1) % 1, ri = ola < 0.045, salta = ri || h(i, fi, Math.floor(t * 0.8 + r * 7)) > 0.982;
      const bota = !salta && Math.sin(t * (5 + r * 3) + i * 1.7) > 0.9 ? 1 : 0, y = yb - (salta ? k : 0) - bota;
      const luz = f_patMezcla(ropa, blanco, 0.28), som = f_patMezcla(ropa, 0xff000000, 0.3), gorro = frio && h(i, fi, 415) < 0.55 ? ROPA[Math.floor(h(i, fi, 416) * ROPA.length)] : -1;
      if (k === 1) {
        rect(x, y - 1, x + 1, y, ropa); pset(x, y - 1, luz); pset(x + (i & 1), y - 2, gorro >= 0 ? gorro : piel);
        if (salta) { pset(x - 1, y - 3, piel); pset(x + 2, y - 3, piel); }
      } else if (k === 2) {
        rect(x, y - 2, x + 3, y + 1, ropa); rect(x, y - 2, x + 3, y - 2, luz); rect(x + 3, y - 1, x + 3, y + 1, som);
        rect(x + 1, y - 4, x + 2, y - 3, piel); if (gorro >= 0) rect(x + 1, y - 5, x + 2, y - 5, gorro); else pset(x + 1, y - 4, pelo);
        if (frio && h(i, fi, 417) < 0.4) rect(x, y - 2, x + 3, y - 2, ROPA[(i + 3) % ROPA.length]);
        if (salta) { pset(x - 1, y - 3, ropa); pset(x - 1, y - 4, piel); pset(x + 4, y - 3, ropa); pset(x + 4, y - 4, piel); }
      } else {
        rect(x, y - 3, x + 4, y + 2, ropa); rect(x, y - 3, x + 4, y - 3, luz); rect(x + 4, y - 2, x + 4, y + 2, som); rect(x + 2, y - 1, x + 2, y + 2, som);
        rect(x + 1, y - 6, x + 3, y - 4, piel); pset(x + 3, y - 4, f_patMezcla(piel, 0xff000000, 0.2));
        if (gorro >= 0) { rect(x + 1, y - 7, x + 3, y - 6, gorro); pset(x + 2, y - 8, blanco); } else { rect(x + 1, y - 6, x + 3, y - 6, pelo); pset(x + 1, y - 5, pelo); }
        if (frio && h(i, fi, 417) < 0.45) { rect(x, y - 3, x + 4, y - 3, ROPA[(i + 3) % ROPA.length]); pset(x + 1, y - 2, ROPA[(i + 3) % ROPA.length]); }
        if (salta) { pset(x - 1, y - 4, ropa); pset(x - 1, y - 5, ropa); pset(x - 1, y - 6, piel); pset(x + 5, y - 4, ropa); pset(x + 5, y - 5, ropa); pset(x + 5, y - 6, piel); }
        // una bufanda que gira por encima de la cabeza
        if (h(i, fi, 418) > 0.965) { const a = t * 7 + i; for (let q = 1; q <= 4; q++) pset(Math.round(x + 2 + Math.cos(a) * q), Math.round(y - 9 + Math.sin(a) * q * 0.4), q % 2 ? C.naranja : blanco); pset(x + 2, y - 8, piel); }
      }
      // el vaho del aliento (Denver) y los flashes de los móviles (Las Vegas)
      if (frio && k > 1) { const ph = (t * 0.7 + r * 5) % 2.4; if (ph < 0.9) { const dy = Math.round(ph * 4); pset(x + k + 2, y - 3 * k + 2 - dy, vaho); if (ph > 0.3) pset(x + k + 3, y - 3 * k + 1 - dy, vaho); } }
      if (!frio && h(i, fi, Math.floor(t * 9)) > 0.996) { pset(x + 1, y - 2 * k - 1, blanco); pset(x, y - 2 * k - 1, f_PAT.luz); pset(x + 2, y - 2 * k - 1, f_PAT.luz); pset(x + 1, y - 2 * k - 2, f_PAT.luz); }
    }
  });
}

// los asientos y los escalones de cada fila, en el búfer fijo (se ven donde falta alguien)
function f_patAsientos(R, filas, x0, x1, hueco) {
  filas.forEach(([yb, k]) => {
    const sep = k === 1 ? 3 : k === 2 ? 5 : 6;
    for (let x = x0; x <= x1; x++) { if (hueco && hueco(x, yb)) continue; const s = (x % sep) === sep - 1;
      for (let y = yb - k; y <= yb + (k > 1 ? 1 : 0); y++) R.pset(x, y, s ? f_PAT.asiento : y === yb - k ? f_PAT.asientoL : f_PAT.asiento);
      R.pset(x, yb + (k > 1 ? 2 : 1), (x + yb) % 7 ? f_PAT.escalon : f_PAT.escalonL); }
  });
}

// las escaleras de una grada: la franja de hormigón con su peldañeado y la barandilla del centro
function f_patEscalera(R, x, y0, y1, w) {
  for (let y = y0; y <= y1; y++) for (let i = 0; i < w; i++) R.pset(x + i, y, y % 3 === 0 ? f_PAT.hormigonS : i === 0 ? f_PAT.hormigonL : f_PAT.hormigon);
  R.rect(x + (w >> 1), y0, x + (w >> 1), y1, f_PAT.escalonL);
}

// un túnel de salida a la grada (vomitorio): el hueco oscuro con su dintel y la barandilla
function f_patTunel(R, x, y0, y1, w) {
  R.rect(x - 1, y0 - 2, x + w, y1, f_PAT.hormigonS); R.rect(x - 1, y0 - 2, x + w, y0 - 2, f_PAT.hormigonL); R.rect(x, y0, x + w - 1, y1, f_PAT.negro);
  for (let y = y0 + 1; y <= y1; y++) R.pset(x + 1, y, hex('#20202a')); R.rect(x - 2, y0 - 4, x + w + 1, y0 - 4, f_PAT.escalonL);
  for (let i = 0; i <= w; i += 3) R.rect(x - 1 + i, y0 - 4, x - 1 + i, y0 - 3, f_PAT.escalonL);
}

// una figura pequeña de fondo (unos 9 px): piernas, cuerpo con luz y sombra, cabeza o casco con la rejilla
function f_patFigura(R, x, yb, t, ropa, o = {}) {
  const { rect, pset } = R, anda = o.anda ? Math.floor(t * 6 + x) % 2 : 0, piel = o.piel ?? f_PATPIEL[1], dir = o.dir ?? 1;
  rect(x, yb - 2, x, yb - (anda ? 1 : 0), o.pantalon ?? hex('#e8e8ec')); rect(x + 2, yb - 2, x + 2, yb - (anda ? 0 : 1) + (anda ? 0 : 1), o.pantalon ?? hex('#e8e8ec'));
  pset(x, yb, f_PAT.negro); pset(x + 2, yb, f_PAT.negro);
  rect(x, yb - 6, x + 2, yb - 3, ropa); pset(x + (dir > 0 ? 0 : 2), yb - 6, f_patMezcla(ropa, hex('#ffffff'), 0.3)); rect(x + (dir > 0 ? 2 : 0), yb - 5, x + (dir > 0 ? 2 : 0), yb - 3, f_patMezcla(ropa, 0xff000000, 0.3));
  if (o.casco != null) { rect(x, yb - 9, x + 2, yb - 7, o.casco); pset(x + (dir > 0 ? 2 : 0), yb - 7, f_PAT.blancoS); pset(x + 1, yb - 9, f_patMezcla(o.casco, hex('#ffffff'), 0.4)); }
  else { rect(x, yb - 9, x + 2, yb - 7, piel); rect(x, yb - 9, x + 2, yb - 9, o.gorra ?? f_PATPELO[(x >> 2) % 5]); if (o.gorra != null) pset(x + (dir > 0 ? 3 : -1), yb - 9, o.gorra); }
  if (o.brazo) { pset(x + (dir > 0 ? 3 : -1), yb - 6, ropa); pset(x + (dir > 0 ? 4 : -2), yb - 7, piel); }
}

// el techo translúcido de Las Vegas, visto desde dentro hasta y1: paneles lechosos (apagados junto a la barra del año y a
// Atom, para que esas zonas queden tranquilas) entre vigas que convergen, las cerchas, la pasarela con su fila de focos
function f_patTecho(R, y1) {
  const { rect, pset, linea } = R; rect(0, 0, 319, y1, f_PAT.techo);
  const filas = []; for (let y = 0, a = 10; y < y1 - 2; y += a + 1, a = Math.max(3, a - 2)) filas.push([y, Math.min(y + a, y1 - 3)]);
  filas.forEach(([ya, yb], k) => {
    const w = Math.max(14, 44 - k * 9), luz = Math.min(1, 0.25 + k * 0.25);
    for (let x0 = -(k * 13) % w; x0 < 320; x0 += w + 1) for (let y = ya; y <= yb; y++) for (let x = Math.max(0, x0); x < Math.min(320, x0 + w); x++) {
      const calma = (x >= 18 && x <= 172 && y <= 15) || (x >= 274 && y >= 2 && y <= 46);
      const g = 1 - Math.abs((x - x0) / w - 0.5) * 1.4 - ((y - ya) / (yb - ya + 1)) * 0.25, base = calma ? f_patMezcla(f_PAT.panelO, f_PAT.panel, 0.18) : f_patMezcla(f_PAT.panelO, f_PAT.panel, luz);
      pset(x, y, f_patB4(x, y) < g * (calma ? 0.45 : 0.9) ? f_patMezcla(base, calma ? f_PAT.panel : f_PAT.panelB, calma ? 0.25 : 0.6) : base);
      // las costillas de los cojines de plástico (una línea de luz y otra de sombra) y alguna mancha de sol
      if ((x - x0) % 6 === 3) pset(x, y, f_patMezcla(R.pget(x, y), f_PAT.panelO, 0.35));
      if (!calma && y === ya) pset(x, y, f_patMezcla(base, f_PAT.panelB, 0.5));
      if (!calma && h(x >> 2, y >> 1, 21) > 0.96) pset(x, y, f_PAT.panelB);
    }
  });
  // las vigas maestras, que convergen hacia el fondo, con su filo de luz
  for (let k = -6; k <= 6; k++) { const xa = 160 + k * 56, xb = 160 + k * 30; linea(xa, 0, xb, y1 - 2, f_PAT.viga); linea(xa + 1, 0, xb + 1, y1 - 2, k < 0 ? f_PAT.vigaL : f_PAT.techoL); }
  // la cercha de celosía y la pasarela de los focos
  rect(0, y1 - 3, 319, y1, f_PAT.viga); rect(0, y1 - 3, 319, y1 - 3, f_PAT.vigaL);
  for (let x = 0; x < 320; x += 4) { linea(x, y1 - 2, x + 2, y1, f_PAT.techoL); }
  for (let x = 6; x < 320; x += 13) { if (x >= 270) continue; rect(x, y1 - 1, x + 3, y1, f_PAT.luzS); rect(x + 1, y1, x + 2, y1, f_PAT.luz); }
}

// los estandartes de los títulos (inventados) colgados de la pasarela: tela del equipo con su franja, una estrella y el
// año en dos cifras; se mecen un poco con el aire del techo
function f_patEstandartes(R, t, xs, y0, alto) {
  const { rect, pset } = R, anios = ['98', '07', '15', '21', '03'];
  xs.forEach((x, k) => { const m = Math.sin(t * 0.9 + k * 1.7) * 0.8;
    rect(x - 1, y0, x + 12, y0, f_PAT.vigaL); rect(x + 1, y0 - 3, x + 1, y0, f_PAT.viga); rect(x + 10, y0 - 3, x + 10, y0, f_PAT.viga);
    for (let j = 1; j <= alto; j++) { const dx = Math.round(m * j / alto); rect(x + dx, y0 + j, x + 11 + dx, y0 + j, C.equipoA); pset(x + dx, y0 + j, hex('#2aa0a0')); pset(x + 11 + dx, y0 + j, C.equipoAS);
      if (j === 2 || j === 3) rect(x + dx + 1, y0 + j, x + dx + 10, y0 + j, C.naranja); }
    const dx = Math.round(m * 0.5); pset(x + 5 + dx, y0 + 5, f_PAT.luz); rect(x + 4 + dx, y0 + 6, x + 6 + dx, y0 + 6, f_PAT.luz); pset(x + 5 + dx, y0 + 7, f_PAT.luz);
    f_patCifras(R, anios[k % 5], x + 2 + Math.round(m * 0.8), y0 + 9, C.blanco, { sep: 1 });
    for (let i = 0; i < 12; i += 2) pset(x + i + Math.round(m), y0 + alto + 1, C.equipoA); });
}

// las cosas que se mueven bajo el techo: los focos que respiran y la skycam, colgada de cuatro cables, que viaja
function f_patTechoVivo(R, t, y1, campo) {
  const { rect, pset, linea } = R;
  for (let x = 6; x < 270; x += 13) if (Math.sin(t * 1.3 + x) > 0.6) { pset(x + 1, y1 + 1, f_PAT.luz); pset(x + 2, y1 + 1, f_PAT.luz); }
  const cx = Math.round(150 + Math.sin(t * 0.21) * 70), cy = Math.round(campo + Math.sin(t * 0.37) * 4);
  const cab = (x0, y0) => linea(x0, y0, cx, cy - 3, (x, y) => (x + y) % 2 ? hex('#1a1c26') : null);
  cab(-40, y1 + 6); cab(360, y1 + 6); cab(cx - 70, y1); cab(cx + 60, y1);
  rect(cx - 4, cy - 3, cx + 4, cy + 2, f_PAT.negro); rect(cx - 3, cy - 2, cx + 3, cy + 1, hex('#3a3e4c')); rect(cx - 3, cy - 2, cx + 3, cy - 2, hex('#5a5e6e'));
  rect(cx - 2, cy + 2, cx + 2, cy + 4, f_PAT.negro); pset(cx - 1, cy + 3, hex('#5a8ac8')); pset(cx + 3, cy - 2, Math.floor(t * 2) % 2 ? hex('#ff4040') : hex('#7a2020'));
}

// el videomarcador: marco negro con su tornillería, la pantalla de píxeles con la trama de líneas, y lo que da: una
// repetición de patada, el marcador con los puntos, el reloj y el down, el medidor de ruido o (aire) los dos cubos de aire
function f_patPantalla(R, t, x0, y0, x1, y1, p, modo) {
  const { rect, pset, disco, linea } = R, w = x1 - x0, hh = y1 - y0;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, f_PAT.negro); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, hex('#3a3e4a')); rect(x0, y0, x1, y1, hex('#0a1220'));
  const m = modo ?? (p.aire > 0 ? 'aire' : ['repeticion', 'marcador', 'ruido'][Math.floor(t / 4) % 3]);
  const cl = (x, y, c) => { if (x >= x0 && x <= x1 && y >= y0 && y <= y1) pset(x, y, c); };
  if (m === 'repeticion') {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / hh; pset(x, y, u > 0.62 ? (((x - x0) >> 2) % 2 ? hex('#3a8a3a') : hex('#4a9a44')) : f_patMezcla(hex('#1e2a46'), hex('#3a4a6e'), u)); }
    const gx = x1 - Math.round(w * 0.18), gy = y0 + Math.round(hh * 0.62); rect(gx, gy - 9, gx, gy, f_PAT.poste); rect(gx - 5, gy - 9, gx + 5, gy - 9, f_PAT.poste); rect(gx - 5, gy - hh * 0.55, gx - 5, gy - 9, f_PAT.poste); rect(gx + 5, gy - hh * 0.55, gx + 5, gy - 9, f_PAT.poste);
    const u = (t % 3) / 3, bx = Math.round(x0 + w * 0.15 + u * (gx - x0 - w * 0.15)), by = Math.round(gy - 2 - Math.sin(u * Math.PI) * hh * 0.5);
    for (let q = 1; q < 6; q++) { const uq = Math.max(0, u - q * 0.04); cl(Math.round(x0 + w * 0.15 + uq * (gx - x0 - w * 0.15)), Math.round(gy - 2 - Math.sin(uq * Math.PI) * hh * 0.5), hex('#c8d8f0')); }
    rect(bx - 1, by, bx + 1, by + 1, C.cuero); pset(bx, by, C.cueroL);
    const kx = x0 + Math.round(w * 0.12); rect(kx, gy - 6, kx + 1, gy - 2, C.equipoA); rect(kx, gy - 8, kx + 1, gy - 7, C.naranja); pset(kx + 2, gy - 1, C.blanco);
  } else if (m === 'marcador') {
    rect(x0, y0, x1, y1, hex('#0e1628')); const mid = x0 + (w >> 1);
    rect(x0 + 3, y0 + 3, mid - 3, y0 + 6, C.equipoA); rect(mid + 3, y0 + 3, x1 - 3, y0 + 6, C.equipoB); pset(x0 + 5, y0 + 4, C.naranja); pset(mid + 5, y0 + 4, C.blanco);
    f_patCifras(R, '24', x0 + Math.round(w * 0.25) - 6, y0 + 9, hex('#ffd860'), { ex: 2, ey: 2 }); f_patCifras(R, '21', mid + Math.round(w * 0.25) - 6, y0 + 9, hex('#ffd860'), { ex: 2, ey: 2 });
    const sg = 59 - Math.floor(t) % 60; f_patCifras(R, '0' + String(sg).padStart(2, '0'), mid - 7, y1 - 6, hex('#ff6a4a')); rect(mid - 3, y1 - 5, mid - 3, y1 - 5, hex('#ff6a4a')); rect(mid - 3, y1 - 3, mid - 3, y1 - 3, hex('#ff6a4a'));
    f_patCifras(R, '4', x1 - 6, y1 - 6, C.blanco); for (let k = 0; k < 3; k++) disco(x0 + 5 + k * 4, y1 - 4, 1, k < 2 ? hex('#ffd860') : hex('#3a4258'));
  } else if (m === 'ruido') {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, f_patB4(x, y) < 0.3 ? hex('#2a0e2a') : hex('#180a1e'));
    const n = 9, bw = Math.max(2, Math.floor((w - 14) / n)), v = 0.5 + 0.5 * Math.sin(t * 1.7);
    for (let k = 0; k < n; k++) { const alto = Math.round((hh - 6) * Math.min(1, (k + 1) / n * (0.4 + v * 0.8))), bx = x0 + 12 + k * bw;
      rect(bx, y1 - 2 - alto, bx + bw - 2, y1 - 2, k > 6 ? hex('#ff4a4a') : k > 3 ? hex('#ffd040') : hex('#4ae07a')); }
    // el altavoz que «grita» (un pictograma)
    rect(x0 + 3, y0 + (hh >> 1) - 2, x0 + 5, y0 + (hh >> 1) + 2, C.blanco); linea(x0 + 6, y0 + (hh >> 1) - 2, x0 + 9, y0 + (hh >> 1) - 5, C.blanco); linea(x0 + 6, y0 + (hh >> 1) + 2, x0 + 9, y0 + (hh >> 1) + 5, C.blanco); rect(x0 + 9, y0 + (hh >> 1) - 5, x0 + 9, y0 + (hh >> 1) + 5, C.blanco);
  } else {
    // los dos cubos de aire: el del mar con 12 moléculas, el de la montaña con 10 (11 con frío)
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, f_patB4(x, y) < 0.2 ? hex('#12223a') : hex('#0c1830'));
    const s = Math.min(hh - 9, Math.floor(w * 0.3)), cubos = [[x0 + Math.round(w * 0.27) - (s >> 1), 12, 'mar'], [x0 + Math.round(w * 0.73) - (s >> 1), p.frio > 0.5 ? 11 : 10, 'monte']];
    for (const [cx, n, tipo] of cubos) { const cy = y0 + 2, d = 3;
      rect(cx, cy + d, cx + s, cy + d + s, hex('#16304e')); linea(cx, cy + d, cx + d, cy, hex('#6aa0d0')); linea(cx + s, cy + d, cx + s + d, cy, hex('#6aa0d0')); linea(cx + d, cy, cx + s + d, cy, hex('#6aa0d0')); linea(cx + s + d, cy, cx + s + d, cy + s, hex('#3a6a9a')); linea(cx + s, cy + d + s, cx + s + d, cy + s, hex('#3a6a9a'));
      for (const [a, b, c, e] of [[cx, cy + d, cx + s, cy + d], [cx, cy + d + s, cx + s, cy + d + s], [cx, cy + d, cx, cy + d + s], [cx + s, cy + d, cx + s, cy + d + s]]) linea(a, b, c, e, hex('#8ac8f0'));
      const lento = tipo === 'monte' && p.frio > 0.5 ? 0.6 : 1;
      for (let k = 0; k < n; k++) { const gx = cx + 2 + Math.round(((k % 4) + 0.5) / 4 * (s - 4) + Math.sin(t * 3.1 * lento + k * 2.3) * 1.2), gy = cy + d + 2 + Math.round((Math.floor(k / 4) + 0.5) / 3 * (s - 4) + Math.cos(t * 2.7 * lento + k * 1.7) * 1.2);
        pset(gx, gy, f_PAT.molec); pset(gx + 1, gy, hex('#8ac8f0')); pset(gx, gy + 1, f_PAT.molecS); }
      const iy = cy + d + s + 2, ix = cx + (s >> 1) - 3;
      if (tipo === 'mar') for (let i = 0; i < 7; i++) { pset(ix + i, iy + (i % 4 === 1 ? 0 : i % 4 === 3 ? 2 : 1), hex('#4aa8e8')); }
      else { linea(ix, iy + 2, ix + 3, iy - 1, hex('#c8d4e4')); linea(ix + 3, iy - 1, ix + 6, iy + 2, hex('#c8d4e4')); pset(ix + 3, iy - 1, C.blanco); }
    }
  }
  // la trama de líneas de la pantalla y el brillo de una esquina
  for (let y = y0 + 1; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) pset(x, y, f_patMezcla(R.pget(x, y), 0xff000000, 0.18));
  for (let k = 0; k < 6; k++) cl(x0 + 1 + k, y0 + 1, f_patMezcla(R.pget(x0 + 1 + k, y0 + 1), hex('#ffffff'), 0.3));
}

// el césped de lado (desde y0, la banda lejana, hasta abajo) en el búfer fijo: franjas de segado en perspectiva, las
// líneas cada cinco yardas (la de gol en X = 206 y la de fondo en 250), la zona de anotación pintada, más allá la pista
// de hierba oscura, los números del lado lejano del revés, las marcas de cada yarda y los hash; vx: el punto de fuga
function f_patCampo(R, y0, lugar) {
  const B = R.buf, vx = 160, vy = y0 - 200, cal = C.cal, zona = lugar === 'denver' ? f_PAT.zonaB : f_PAT.zonaA;
  const verA = hex('#4c9640'), verB = hex('#3e8436'), verS = hex('#2e6a2a'), verL = hex('#62aa52'), bruma = hex('#6a8a7a');
  for (let y = y0; y < 180; y++) { const s = (y - vy) / (y0 - vy), lejos = Math.max(0, 1 - (y - y0) / 20);
    for (let x = 0; x < 320; x++) { const X = vx + (x - vx) / s; let c;
      if (X > 251) { c = (h(x, y, 31) < 0.15) ? f_PAT.apronS : f_PAT.apron; if (X > 256 && X < 259) c = f_PAT.apronL; }
      else { c = Math.floor((X - 30) / 22) % 2 ? verA : verB; const n = h(x, y, 32);
        if (X > 206) { const d = ((X - 206) * 0.7 + (y - y0) * 0.9) % 9; if (d < 4.2 && f_patB4(x, y) < 0.7) c = zona; }
        if (n < 0.1) c = verS; else if (n > 0.94) c = verL;
        if (y > 158 && h(x, y >> 1, 33) < 0.14) c = f_patMezcla(c, verS, 0.6);
        const k = Math.round((X - 30) / 22), L = 30 + 22 * k; if (k >= 0 && L <= 250 && Math.abs(X - L) * s < (L === 206 ? 1.3 : 0.8)) c = cal;
        if (y <= y0 + 1) c = cal; }
      if (lejos > 0 && f_patB4(x, y) < lejos * 0.35) c = f_patMezcla(c, bruma, 0.25);
      B[y * 320 + x] = c; } }
  const px = (X, y) => Math.round(vx + (X - vx) * (y - vy) / (y0 - vy));
  // las marcas de cada yarda junto a la banda y los dos hash
  for (let X = 30; X < 250; X += 4.4) { const a = px(X, y0 + 3); R.rect(a, y0 + 3, a, y0 + 4, cal); for (const yh of [y0 + 18, y0 + 40]) { const b = px(X, yh); R.rect(b, yh, b, yh + 1, cal); } }
  // los números del lado lejano, a ambos lados de cada línea de diez yardas (40, 30, 20, 10 hacia la portería), con la
  // flechita que apunta a la portería más cercana
  [[74, '30'], [118, '20'], [162, '10'], [30, '40']].forEach(([X, n]) => { const y = y0 + 7, a = px(X, y); f_patCifras(R, n, a - 9, y, cal, { ex: 2, ey: 1, sep: 6 });
    const fx = a + 12; R.pset(fx, y + 1, cal); R.pset(fx, y + 2, cal); R.pset(fx, y + 3, cal); R.pset(fx + 1, y + 2, cal); });
}

// lo que hay detrás de la línea de fondo en el plano de pateo: los conos naranjas de las esquinas de la zona de anotación,
// la red de prácticas del pateador en su armazón (con dos balones que cuelgan), y el cámara de televisión en su trípode,
// que va girando la cámara para seguir la jugada (de pie en x ≈ 292, y 141)
function f_patFondoCampo(R, t, p) {
  const { rect, pset, linea } = R;
  for (const x of [206, 250]) { rect(x - 1, 117, x + 1, 121, hex('#f07a2a')); rect(x - 1, 117, x - 1, 121, hex('#ffa060')); pset(x, 119, C.blanco); }
  // la red de prácticas: el armazón de tubo y la malla tramada
  rect(276, 106, 277, 128, hex('#3a3e48')); rect(314, 106, 315, 128, hex('#3a3e48')); rect(276, 106, 315, 107, hex('#3a3e48'));
  for (let y = 108; y <= 127; y++) for (let x = 278; x <= 313; x++) if (((x + y) % 4 === 0 || (x - y + 400) % 4 === 0)) pset(x, y, f_patMezcla(R.pget(x, y), hex('#14141c'), 0.6));
  for (const [x, y] of [[288, 125], [302, 124]]) { rect(x - 3, y - 1, x + 3, y + 1, C.cuero); rect(x - 2, y - 2, x + 2, y - 2, C.cuero); rect(x - 1, y - 1, x + 1, y - 1, C.cordon); }
  rect(276, 128, 315, 128, hex('#2a2e38'));
  // el cámara: el trípode, el cuerpo de la cámara con su parasol y el piloto rojo, y él detrás
  const g = Math.sin(t * 0.35) * 0.5, cx = 292, cy = 132;
  linea(cx, cy + 2, cx - 5, 142, hex('#2a2a30')); linea(cx, cy + 2, cx + 5, 142, hex('#2a2a30')); linea(cx, cy + 2, cx, 142, hex('#3a3a40'));
  rect(cx - 6, cy - 4, cx + 4, cy + 1, hex('#1e2028')); rect(cx - 5, cy - 3, cx + 3, cy, hex('#3a3e4a')); rect(cx - 5, cy - 3, cx + 3, cy - 3, hex('#5a5e6e'));
  rect(cx - 10 - Math.round(g * 2), cy - 3 + Math.round(g), cx - 6, cy, hex('#14141a')); pset(cx - 10 - Math.round(g * 2), cy - 2 + Math.round(g), hex('#5a8ac8'));
  pset(cx + 2, cy - 4, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#7a1a1a'));
  f_patFigura(R, cx + 6, 142, t, hex('#2a2a34'), { gorra: hex('#1a1a20'), piel: f_PATPIEL[1], dir: -1, pantalon: hex('#3a3a44') });
  linea(cx + 5, cy - 1, cx + 2, cy - 1, hex('#1a1a20'));
}

// los postes de lado (pateo): la base acolchada, el cuello de cisne, el travesaño que se aleja y los dos palos con sus cintas
function f_patPostesLado(R, t, viento) {
  const { rect, pset, linea } = R, P = f_PAT;
  rect(258, 128, 264, 147, f_PAT.muro); rect(258, 128, 258, 147, f_PAT.muroL); rect(258, 147, 264, 147, f_PAT.negro);
  rect(260, 112, 262, 128, P.poste); pset(260, 113, P.posteL); rect(262, 112, 262, 127, P.posteS);
  linea(261, 112, 263, 108, P.poste); linea(255, 106, 267, 110, P.poste); linea(255, 107, 267, 111, P.posteS); linea(255, 105, 267, 109, P.posteL);
  rect(254, 46, 255, 106, P.poste); rect(255, 46, 255, 106, P.posteS); rect(266, 50, 267, 110, P.poste); rect(267, 50, 267, 110, P.posteS); pset(266, 52, P.posteL);
  for (const [x, y] of [[254, 46], [266, 50]]) for (let q = 0; q < 7; q++) { const a = viento ? Math.sin(t * 9 + q * 0.9 + x) * 1.5 : Math.sin(t * 1.2 + x) * 0.4, xx = Math.round(x + 1 + (viento ? q * 0.9 : 0) + a * q / 7), yy = y + 1 + (viento ? Math.round(q * 0.3) : q); pset(xx, yy, q % 2 ? P.cintaS : P.cinta); }
}

// los postes de frente (plano 'postes'): base acolchada, cuello, travesaño y palos con su luz y sombra y las cintas
function f_patPostesFrente(R, t, viento) {
  const { rect, pset } = R, P = f_PAT;
  rect(150, 104, 170, 133, f_PAT.negro); rect(151, 105, 169, 132, P.muro); rect(151, 105, 153, 132, P.muroL); rect(166, 105, 169, 132, hex('#0e2430'));
  for (let y = 110; y < 132; y += 7) rect(151, y, 169, y, hex('#0e2430'));
  rect(157, 96, 163, 104, P.poste); rect(157, 96, 158, 104, P.posteL); rect(162, 96, 163, 104, P.posteS);
  rect(112, 93, 208, 97, P.posteS); rect(112, 93, 208, 95, P.poste); rect(112, 93, 208, 93, P.posteL);
  for (const x of [112, 204]) { rect(x, 20, x + 4, 97, P.poste); rect(x, 20, x + 1, 97, P.posteL); rect(x + 4, 20, x + 4, 97, P.posteS); rect(x, 19, x + 4, 19, P.posteS); }
  for (const x of [114, 206]) for (let q = 0; q < 12; q++) { const a = viento ? Math.sin(t * 8 + q * 0.8 + x) * 2 : Math.sin(t * 1.1 + x * 0.1) * 0.6, xx = Math.round(x + (viento ? q * 0.9 : 0) + a * q / 12), yy = 20 + (viento ? Math.round(q * 0.4) : q); pset(xx, yy, q % 3 ? P.cinta : P.cintaS); pset(xx + 1, yy, P.cintaS); }
}

// g_paloma: la paloma del larguero, de unos 12 × 9 px con los pies en (x, y); da cabezadas, parpadea y a veces picotea;
// agacha 0–1 la aplasta contra el travesaño (la cabeza hundida, los ojos cerrados) y al final se le erizan dos plumas
// que se van volando; dir 1 mira a la derecha, −1 a la izquierda
const g_PALOMA = [[
  '.......GG...', '......GGOK..', '......GGG...', '......VM....', '..LLLGVMG...', 'TTLGGGGGGS..', '.TGWGWGGGS..', '...SGGGGS...', '....P..P....'], [
  '............', '.......GG...', '......GGOK..', '......VMG...', '..LLLGVMGG..', 'TTLGWGWGGS..', '.TSGGGGGGS..', '...SGGGGS...', '....P..P....'], [
  '............', '............', '............', '.......GG...', '..LLLLGGCK..', 'TTLGWGWVMG..', '.TSGGGGGGGS.', '..SSGGGGGS..', '....P..P....']];

export function g_paloma(R, x, y, t, agacha = 0, dir = 1) {
  const a = f_patLim(agacha), f = a > 0.66 ? 2 : a > 0.25 ? 1 : 0, P = f_PAT;
  const parpa = (t * 0.9 + x) % 3.1 < 0.12, pica = f === 0 && (t + x * 0.3) % 4.3 < 0.35;
  const pal = { G: P.paloma, L: P.palomaL, S: P.palomaS, V: P.palomaV, M: P.palomaM, W: P.palomaW, T: P.palomaW, P: P.pata, K: P.pico, O: parpa ? P.paloma : P.ojo, C: P.palomaS };
  const filas = pica ? g_PALOMA[1] : g_PALOMA[f], cab = f === 0 && !pica && Math.sin(t * 2.2 + x) > 0.7 ? 1 : 0;
  const arriba = filas.slice(0, 3).map((s) => cab ? '.' + s.slice(0, 11) : s), abajo = filas.slice(3), sil = Object.fromEntries(Object.keys(pal).map((k) => [k, hex('#1a1a24')]));
  // el contorno oscuro, para que se lea sobre la grada
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { f_patSprite(R, arriba, x - 6 + dx, y - 8 + dy, dir, sil); f_patSprite(R, abajo.slice(0, 5), x - 6 + dx, y - 5 + dy, dir, sil); }
  f_patSprite(R, arriba, x - 6, y - 8, dir, pal);
  f_patSprite(R, abajo, x - 6, y - 5, dir, pal);
  if (a > 0.85) for (let k = 0; k < 2; k++) { const u = ((t * 0.8 + k * 0.5) % 1), px = Math.round(x - 2 * dir + (k ? 3 : -2) + Math.sin(u * 9 + k) * 2), py = Math.round(y - 7 - u * 10); R.pset(px, py, P.palomaL); R.pset(px + 1, py, P.paloma); }
}

// g_lineaPateo: la línea de bloqueo del gol de campo de lado, por delante de todo: tres linieros del equipo que patea
// (verde azulado) frente a tres del que defiende (granate), escalonados en profundidad (pies en y 156, 160 y 164; x
// 166–214); o.empuje 0–1: al llegar el pie chocan (se juntan, levantan los brazos) y al final saltan los de la defensa
export function g_lineaPateo(R, t, o = {}) {
  const e = f_patLim(o.empuje ?? 0), EL = ELENCO_CHIBI, choque = e > 0.55 ? Math.min(1, (e - 0.55) * 4) : 0, salto = e > 0.75 ? Math.round(Math.sin(Math.min(1, (e - 0.75) * 4) * Math.PI) * 6) : 0;
  const ataque = { X: hex('#1e8a8a'), x: hex('#e8783a'), w: hex('#7ad8d8'), C: hex('#1e8a8a'), c: hex('#e8783a'), W: hex('#1e8a8a'), o: hex('#e8783a') };
  for (const [k, ys] of [[0, 154], [1, 159], [2, 164]]) {
    R.actor(EL.liniero, 166 + k * 6 + Math.round(choque * 3), ys, t, { dir: 1, pal: ataque, brazos: choque > 0.5, quieto: choque > 0 });
    R.actor(EL.liniero, 192 + k * 6 - Math.round(choque * 3), ys, t, { dir: -1, brazos: choque > 0.5, salto: k === 1 ? salto : 0, quieto: choque > 0, sorpresa: choque > 0.5 && k === 0 });
  }
}

// la nieve: copos en tres capas (lejos, finos y lentos; en medio; cerca, grandes y rápidos) que caen con el viento y
// bailan; la de cerca la pinta g_nieveDelante por delante de los personajes; respeta la zona de Atom y la barra del año
function f_patNieve(R, t, n, capas) {
  const { pset, rect } = R, P = f_PAT;
  for (const c of capas) { const cuantos = Math.round(n * [170, 110, 46][c]), v = [9, 16, 30][c], viento = [5, 9, 16][c];
    for (let k = 0; k < cuantos; k++) { const y = Math.round(((h(k, c, 51) * 200 + t * v * (0.8 + h(k, c, 52) * 0.4)) % 200) - 10), x = Math.round(((h(k, c, 53) * 360 + t * viento + Math.sin(t * 1.4 + k) * (c + 1) * 1.5) % 360 + 360) % 360 - 20);
      if (x < 0 || x > 319 || y < 0 || y > 179 || (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 16)) continue;
      if (c === 0) pset(x, y, P.nieveS); else if (c === 1) { pset(x, y, P.nieve); if (k % 3 === 0) pset(x + 1, y, P.nieveS); } else { rect(x, y, x + 1, y + 1, P.nieve); pset(x + 1, y + 1, P.nieveS); } } }
}

// g_nieveDelante: los copos grandes de la capa cercana, para pintarlos después de los personajes (n = o.nieve, 0–1)
export function g_nieveDelante(R, t, n = 0) { if (n > 0) f_patNieve(R, t, n, [2]); }

// el aire hecho visible: moléculas (un punto de luz con su filo y su sombra) que tiemblan sin parar por el volumen
// [x0, y0, x1, y1]; densidad 1 = a nivel del mar; frío: tiemblan más despacio; respeta la zona de Atom y la barra del año
function f_patAire(R, t, a, dens, frio, [x0, y0, x1, y1]) {
  const { pset } = R, n = Math.round(300 * dens * a), w = x1 - x0, hh = y1 - y0, v = 1 - 0.45 * frio, P = f_PAT, B = R.buf, oscuro = hex('#0e1a32');
  // el fondo se apaga y se enfría un poco para que el aire se lea de un vistazo
  for (let y = Math.max(0, y0 - 2); y <= Math.min(179, y1 + 2); y++) { const f = a * 0.42 * Math.min(1, (y - y0 + 3) / 6, (y1 + 3 - y) / 6); for (let x = x0; x <= x1; x++) B[y * 320 + x] = f_patMezcla(B[y * 320 + x], oscuro, f); }
  for (let k = 0; k < n; k++) {
    const bx = x0 + h(k, 1, 61) * w + Math.sin(t * 0.3 * v + k) * 6, by = y0 + h(k, 2, 61) * hh + Math.cos(t * 0.27 * v + k * 1.3) * 4;
    const x = Math.round(bx + Math.sin(t * (5 + h(k, 3, 61) * 4) * v + k * 2.1) * 1.3), y = Math.round(by + Math.cos(t * (4 + h(k, 4, 61) * 4) * v + k * 1.7) * 1.3);
    if ((x >= 272 && y <= 48) || (x >= 16 && x <= 174 && y <= 16)) continue;
    pset(x - 1, y, P.molecS); pset(x, y - 1, P.molecS); pset(x + 2, y, P.molecS); pset(x, y + 2, P.molecS); pset(x + 1, y + 2, P.molecS); pset(x + 2, y + 1, P.molecS);
    pset(x, y, P.molec); pset(x + 1, y, hex('#bfe4fa')); pset(x, y + 1, hex('#9ad0f4')); pset(x + 1, y + 1, hex('#6aaee6'));
  }
}

// las Rocosas: la cordillera lejana (cresta en yb − amp, más baja bajo Atom) con la nieve en lo alto (luz a la izquierda,
// sombra en las laderas que miran a la derecha), los canales de roca, la bruma de la base, y las lomas de pinos delante
function f_patMontes(R, yb, amp) {
  const { pset, rect } = R, roca = hex('#7a86a6'), rocaS = hex('#5c6888'), bruma = hex('#a6b4cc'), nieveL = hex('#f4f8fc'), nieveS = hex('#b8c6dc'), nieveM = hex('#dce6f2');
  const cresta = (x) => Math.round(yb - amp * (0.55 + 0.28 * Math.sin(x * 0.024 + 1.1) + 0.12 * Math.sin(x * 0.067 + 0.3) + 0.06 * Math.sin(x * 0.17 + 2.2)) + Math.max(0, x - 246) * 0.45);
  for (let x = 0; x < 320; x++) { const c = cresta(x), d = cresta(x + 1) - cresta(x - 1), linea = c + Math.round(amp * 0.38 + 2 * Math.sin(x * 0.11) + 2 * h(x >> 2, 1, 71));
    for (let y = c; y <= yb + 4; y++) { let col;
      if (y < linea && !(h(x >> 1, (y - c) >> 2, 72) < 0.18 && y > c + 3)) col = d > 0 ? (f_patB4(x, y) < 0.5 ? nieveS : nieveM) : (y === c ? nieveL : f_patB4(x, y) < 0.8 ? nieveL : nieveM);
      else col = d > 0 ? rocaS : (h(x, y >> 1, 73) < 0.2 ? rocaS : roca);
      const b = (y - (yb - 6)) / 10; if (b > 0 && f_patB4(x, y) < b) col = bruma;
      pset(x, y, col); } }
  // las lomas cercanas, de pinos, con su cresta dentada
  const yl = yb + 4; for (let x = 0; x < 320; x++) { const c = Math.round(yl - 5 - 3 * Math.sin(x * 0.05 + 0.7) - 2 * Math.sin(x * 0.13)) + (h(x, 0, 74) < 0.3 ? -1 : 0);
    for (let y = c; y <= yl + 8; y++) pset(x, y, y === c ? f_PAT.pinoL : h(x, y, 75) < 0.25 ? f_PAT.pinoS : f_PAT.pino); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 3, 76) * 319), y = yl - 4 - Math.round(3 * Math.sin(x * 0.05 + 0.7)); rect(x, y - 3, x, y, f_PAT.pinoS); rect(x - 1, y - 1, x + 1, y, f_PAT.pinoS); if (k % 3 === 0) pset(x, y - 3, nieveM); }
}

// el cielo frío de invierno (búfer fijo): bandas tramadas de azul pálido a blanco grisáceo hasta hor
function f_patCieloFrio(R, hor) {
  const P = [[0, '#5a7ca6'], [0.3, '#7896ba'], [0.6, '#9cb2cc'], [0.85, '#c2d0de'], [1, '#d8e0e8']].map(([f, c]) => [f, hex(c)]), B = R.buf;
  for (let y = 0; y < 180; y++) { const u = Math.min(1, y / hor); let i = 0; while (i + 2 < P.length && u >= P[i + 1][0]) i++;
    const f = (u - P[i][0]) / (P[i + 1][0] - P[i][0]); for (let x = 0; x < 320; x++) B[y * 320 + x] = f_patB4(x, y) < f ? P[i + 1][1] : P[i][1]; }
}

// cúmulo de tres tonos (sombra, cuerpo, luz) con la base plana; c = [sombra, cuerpo, luz]
function f_patNube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 81)); bolas.push([cx + u * w * 0.86, cy - r * 0.45, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  R.rect(Math.round(cx - w * 0.45), Math.round(cy + w * 0.08), Math.round(cx + w * 0.45), Math.round(cy + w * 0.08) + 1, c[0]);
}

// las nubes de Denver a tres velocidades (los velos lejanos casi quietos, los cúmulos medianos y los cercanos), que se
// oscurecen cuando nieva, y una pareja de cuervos que cruza; hor: hasta dónde baja el cielo
function f_patNubes(R, t, hor, nieve) {
  const { pset } = R, c3 = [['#a8b8cc', '#d4dee8', '#f4f8fc'], ['#8a96a8', '#aab4c2', '#c8d0da']].map((v) => v.map(hex)), cn = c3[0].map((c, i) => f_patMezcla(c, c3[1][i], nieve));
  for (let k = 0; k < 3; k++) { const y = 10 + k * 9, x0 = ((h(k, 1, 82) * 400 + t * (0.6 + k * 0.3)) % 440) - 60, w = 50 + k * 14;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || h(i >> 2, k, 83) < 0.25 || (x >= 272 && y <= 48) || (x <= 174 && y <= 16)) continue; pset(x, y, cn[1]); if (i % 3 === 0) pset(x + 2, y - 1, cn[2]); if (i % 4 === 1) pset(x - 1, y + 1, cn[0]); } }
  for (let k = 3; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 8 : 16 + k * 3, v = cerca ? 2.6 + k : 1 + k * 0.3, x = ((h(k, 2, 82) * 460 + t * v) % 480) - 70, y = Math.round(cerca ? hor - 14 + k * 3 : hor - 26 + k * 2);
    // junto a la esquina de Atom la nube se deshace en el cielo (se funde con su color) para dejarla tranquila
    const fun = f_patLim((x + w * 0.5 - 236) / 40) * (y < 52 ? 1 : 0), cielo = R.pget(Math.max(0, Math.min(319, Math.round(x))), Math.max(0, y - 8));
    f_patNube(R, Math.round(x), y, w, k, fun > 0 ? cn.map((c) => f_patMezcla(c, cielo, fun * 0.92)) : cn); }
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 11 + k * 9 + 40) % 380) - 30), y = Math.round(hor - 30 + k * 3 + Math.sin(t * 0.8 + k) * 2), ala = Math.sin(t * 9 + k * 2) > 0; if (x >= 272 || (x <= 174 && y <= 16)) continue;
    pset(x, y, hex('#2a2a34')); pset(x - 1, y - (ala ? 1 : 0), hex('#2a2a34')); pset(x + 1, y - (ala ? 1 : 0), hex('#2a2a34')); pset(x - 2, y - (ala ? 2 : -1), hex('#3a3a48')); pset(x + 2, y - (ala ? 2 : -1), hex('#3a3a48')); }
}

// una torre de focos de Denver: el mástil de celosía y el panel de focos con su halo frío
function f_patTorreFocos(R, x, yTop, yBase) {
  const { rect, pset, linea } = R;
  rect(x - 1, yTop + 10, x + 1, yBase, hex('#4a5060')); for (let y = yTop + 12; y < yBase; y += 4) { linea(x - 1, y, x + 1, y + 3, hex('#6a7080')); }
  rect(x - 9, yTop, x + 9, yTop + 9, f_PAT.negro); rect(x - 8, yTop + 1, x + 8, yTop + 8, hex('#2a2e38'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { rect(x - 7 + i * 3, yTop + 2 + j * 2, x - 6 + i * 3, yTop + 2 + j * 2, f_PAT.luz); pset(x - 6 + i * 3, yTop + 3 + j * 2, f_PAT.luzS); }
}

// la banda del fondo (y de la valla, yv, al borde del césped, yc): el muro acolchado con la cinta de LED, el banquillo
// con jugadores pequeños sentados y de pie, la nevera y los vasos, los fotógrafos, la cadena de los árbitros con el «4»
// del down, un árbitro que pasea; en Denver, estufas con vaho y, si nieva, un operario que sopla la nieve
function f_patBanda(R, t, p, yv, yc, x1 = 252) {
  const { rect, pset, linea } = R, P = f_PAT, casa = p.lugar === 'denver' ? C.equipoB : C.equipoA, acento = p.lugar === 'denver' ? C.blanco : C.naranja;
  // la cinta de LED de la valla: chevrones que corren y, a ratos, un barrido de color
  const barr = (t % 6) / 6 * 420 - 50;
  for (let x = 0; x < 320; x++) for (let y = yv + 2; y <= yv + 5; y++) { const v = ((x + Math.floor(t * 24) + Math.abs(y - yv - 3.5) * 2) % 12); let c = v < 3 ? acento : casa; if (Math.abs(x - barr) < 10) c = f_patMezcla(c, hex('#ffffff'), 0.5 - Math.abs(x - barr) / 20); pset(x, y, f_patB4(x, y) < 0.85 ? c : f_patMezcla(c, 0xff000000, 0.4)); }
  // el banquillo y los suyos
  rect(14, yc - 6, 96, yc - 4, hex('#2a2e3a')); rect(14, yc - 6, 96, yc - 6, hex('#4a5060')); for (const x of [16, 55, 94]) rect(x, yc - 3, x, yc - 1, hex('#1a1c24'));
  for (let k = 0; k < 9; k++) { const x = 18 + k * 9, de = h(k, 5, 91) < 0.35, anda = k === 4; const xx = anda ? Math.round(18 + ((t * 6 + 30) % 80)) : x;
    f_patFigura(R, xx, de || anda ? yc - 1 : yc - 4, t, casa, { casco: de ? casa : null, piel: f_PATPIEL[k % 4], anda, dir: anda ? 1 : (k % 2 ? 1 : -1), brazo: !anda && (t + k) % 5 < 0.5, pantalon: hex('#e8e8ec') }); }
  // la nevera naranja (sin letras) con su grifo, la mesa de vasos y las toallas
  rect(100, yc - 9, 106, yc - 1, hex('#c85a1e')); rect(100, yc - 9, 106, yc - 8, C.blanco); rect(101, yc - 7, 101, yc - 2, hex('#f08a4a')); pset(105, yc - 3, hex('#3a3a3a'));
  rect(108, yc - 5, 118, yc - 4, hex('#d8dce4')); rect(109, yc - 3, 109, yc - 1, hex('#8a8e96')); rect(117, yc - 3, 117, yc - 1, hex('#8a8e96')); for (let i = 0; i < 4; i++) pset(110 + i * 2, yc - 6, i % 2 ? hex('#e8e8f0') : hex('#7ad8d8'));
  // la cadena de los árbitros: los dos palos con su marca naranja y el del down con el «4»
  const cx = 132 + Math.round(Math.sin(t * 0.2) * 2);
  for (const x of [cx, cx + 44]) { rect(x, yc - 13, x, yc - 1, hex('#1a1a1a')); rect(x - 1, yc - 15, x + 1, yc - 13, hex('#f07a2a')); }
  for (let i = 0; i <= 44; i++) pset(cx + i, Math.round(yc - 4 + Math.sin(i / 44 * Math.PI) * 2), (i % 2) ? hex('#a8a8b0') : hex('#6a6a74'));
  rect(cx + 22, yc - 14, cx + 22, yc - 1, hex('#1a1a1a')); rect(cx + 19, yc - 19, cx + 25, yc - 13, hex('#f07a2a')); f_patCifras(R, '4', cx + 21, yc - 18, C.blanco);
  for (const [x, k] of [[cx - 3, 0], [cx + 18, 1], [cx + 41, 2]]) { const v = { gorra: hex('#1a1a1a'), piel: f_PATPIEL[(k + 1) % 4], pantalon: hex('#1a1a1a') }; f_patFigura(R, x, yc - 1, t, hex('#f07a2a'), v); }
  // los fotógrafos con el teleobjetivo blanco, de rodillas, y el flash de vez en cuando
  for (const [x, k] of [[196, 0], [212, 1], [228, 2]]) { if (x > x1) continue; rect(x, yc - 5, x + 3, yc - 1, hex('#2a2a34')); rect(x + 1, yc - 8, x + 3, yc - 6, f_PATPIEL[k + 1]); rect(x + 1, yc - 8, x + 3, yc - 8, hex('#2a2a34'));
    rect(x + 3, yc - 6, x + 8, yc - 5, hex('#e8e8e0')); pset(x + 8, yc - 6, hex('#3a3a3a')); rect(x + 2, yc - 5, x + 3, yc - 4, hex('#1a1a20'));
    if (h(k, Math.floor(t * 3), 92) > 0.9) { pset(x + 4, yc - 9, C.blanco); pset(x + 3, yc - 9, P.luz); pset(x + 5, yc - 9, P.luz); pset(x + 4, yc - 10, P.luz); } }
  // el árbitro de rayas que pasea por la banda
  { const x = Math.round(180 + Math.sin(t * 0.25) * 12); f_patFigura(R, x, yc - 1, t, hex('#f2f2f2'), { gorra: hex('#f2f2f2'), anda: Math.abs(Math.cos(t * 0.25)) > 0.3, dir: Math.cos(t * 0.25) > 0 ? 1 : -1, pantalon: hex('#ffffff') }); rect(x, yc - 5, x + 2, yc - 5, hex('#1a1a1a')); rect(x, yc - 3, x + 2, yc - 3, hex('#1a1a1a')); }
  if (p.lugar === 'denver') {
    // las estufas de la banda: el cajón con la rejilla al rojo y el vaho que sube
    for (const x of [60, 118]) { rect(x, yc - 8, x + 7, yc - 1, hex('#3a3e48')); rect(x + 1, yc - 7, x + 6, yc - 4, Math.sin(t * 5 + x) > 0 ? hex('#ff7a2a') : hex('#e85a1a')); for (let i = 1; i < 6; i += 2) rect(x + i, yc - 7, x + i, yc - 4, hex('#a8381a'));
      for (let q = 0; q < 4; q++) { const u = (t * 0.6 + q * 0.25) % 1; pset(Math.round(x + 3 + Math.sin(u * 6 + q) * 2), Math.round(yc - 10 - u * 14), u < 0.6 ? P.vaho : P.nieveS); } }
    if (p.nieve > 0) { const x = Math.round(240 - ((t * 5) % 30)); if (x <= x1 + 6) { f_patFigura(R, x, yc - 1, t, hex('#f0a020'), { gorra: hex('#f0a020'), anda: true, dir: -1 });
      rect(x - 4, yc - 4, x - 1, yc - 4, hex('#3a3a3a')); for (let q = 0; q < 6; q++) { const u = (t * 2 + q / 6) % 1; pset(Math.round(x - 5 - u * 12), Math.round(yc - 3 - Math.sin(u * 3) * 4 + h(q, 1, 93) * 2), P.nieve); } } }
  }
}

// la nieve que cuaja: polvo blanco tramado sobre el césped (más junto a la banda) y sobre el borde de la valla
// (a manchas: ventisqueros donde el viento la amontona y calvas donde no cuaja), más espesa junto a la banda lejana
function f_patNieveSuelo(R, n, y0) {
  const B = R.buf, P = f_PAT; if (n <= 0) return;
  const suave = (x, y) => { const gx = x / 26, gy = y / 7, ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy, a = h(ix, iy, 94), b = h(ix + 1, iy, 94), c = h(ix, iy + 1, 94), d = h(ix + 1, iy + 1, 94);
    return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy; };
  for (let y = y0; y < 180; y++) { const borde = Math.max(0, 1 - (y - y0) / 14); for (let x = 0; x < 320; x++) {
    const m = suave(x, y) * 0.8 + 0.2 * suave(x * 2.3 + 40, y * 1.7) + borde * 0.3, f = Math.min(1, Math.max(0, (m - 1 + n * 0.62) * 3.2)), v = f_patB4(x, y) * 0.7 + h(x, y, 95) * 0.3;
    if (v < f) B[y * 320 + x] = v < f - 0.3 ? P.nieve : P.nieveS; else if (v < f + 0.1) B[y * 320 + x] = f_patMezcla(B[y * 320 + x], P.nieveS, 0.4); } }
}

// el plano de pateo de lado: techo o cielo y montañas, grada, banda, césped, postes, nieve y aire, y la línea de bloqueo
function f_patPateo(R, t, p, o) {
  const den = p.lugar === 'denver', yc = 122, yv = 102;
  if (den) {
    R.copiar(f_patCapa(R, 'cieloPateo', () => f_patCieloFrio(R, 70)));
    f_patNubes(R, t, 50, p.nieve);
    const hueco = (x, y) => (x >= 46 && x <= 50) || (x >= 150 && x <= 154) || (x >= 248 && x <= 252) || (x >= 96 && x <= 106 && y >= 86 && y <= 93) || (x >= 196 && x <= 206 && y >= 86 && y <= 93);
    const FILAS = [[79, 1], [82, 1], [87, 2], [92, 2], [97, 3], [102, 3]];
    f_patPegar(R, f_patCapa(R, 'estadioDenver', () => {
      f_patMontes(R, 64, 30);
      // el anillo del estadio: el voladizo de acero, la barandilla y el marcador sobre patas
      R.rect(0, 74, 319, 77, hex('#4a4e5a')); R.rect(0, 74, 319, 74, hex('#7a7e8a')); for (let x = 0; x < 320; x += 6) R.rect(x, 75, x, 77, hex('#3a3e48'));
      R.rect(0, 78, 319, yv + 1, f_PAT.asiento); f_patAsientos(R, FILAS, 0, 319, hueco);
      for (const x of [46, 150, 248]) f_patEscalera(R, x, 78, yv - 1, 5); f_patTunel(R, 97, 88, 95, 9); f_patTunel(R, 197, 88, 95, 9);
      R.rect(80, 58, 81, 74, hex('#3a3e48')); R.rect(137, 58, 138, 74, hex('#3a3e48')); R.linea(80, 66, 138, 66, hex('#3a3e48'));
      f_patTorreFocos(R, 30, 24, 74); f_patTorreFocos(R, 226, 26, 74);
      R.rect(0, yv, 319, yv + 7, f_PAT.muro); R.rect(0, yv, 319, yv, f_PAT.muroL); R.rect(0, yv + 6, 319, yv + 7, hex('#0e2430'));
      R.rect(0, yv + 8, 319, yc - 1, f_PAT.apron); for (let x = 0; x < 320; x++) for (let y = yv + 8; y < yc; y++) if (h(x, y, 96) < 0.15) R.pset(x, y, f_PAT.apronS);
      f_patCampo(R, yc, 'denver');
    }), 74);
    f_patPantalla(R, t, 72, 36, 146, 57, p, o.pantalla);
    // los banderines del anillo, al viento
    for (const [x, c] of [[168, C.equipoB], [184, C.blanco], [200, C.equipoB], [254, C.blanco]]) { R.rect(x, 61, x, 74, hex('#2a2e38')); R.pset(x, 60, hex('#c8c8d0')); for (let i = 1; i <= 9; i++) { const a = Math.round(Math.sin(t * 6 + i * 0.7 + x) * (i / 9) * 1.5); R.rect(x + i, 61 + a + Math.floor(i / 4), x + i, 65 + a - Math.floor(i / 3), c); } }
    for (const x of [30, 226]) R.halo(x, 29, 14, [hex('#c8d4e2'), hex('#e0e8f0')], 0.5);
    f_patPublico(R, t, FILAS, 'denver', { hueco });
  } else {
    const hueco = (x, y) => (y < 58 && x >= 266) || (x >= 40 && x <= 44) || (x >= 132 && x <= 136) || (x >= 222 && x <= 226) || (x >= 84 && x <= 94 && y >= 79 && y <= 89) || (x >= 176 && x <= 186 && y >= 79 && y <= 89);
    const ARRIBA = [[34, 1], [37, 1], [40, 1], [43, 1], [46, 1], [49, 1], [52, 1]], ABAJO = [[73, 2], [78, 2], [83, 2], [88, 2], [94, 3], [100, 3]];
    R.copiar(f_patCapa(R, 'estadioVegas', () => {
      f_patTecho(R, 30);
      R.rect(0, 31, 319, 55, f_PAT.asiento); f_patAsientos(R, ARRIBA, 0, 265, hueco);
      // los palcos de cristal oscuro bajo Atom (la zona queda tranquila)
      R.rect(266, 31, 319, 56, f_PAT.cristalS); for (let x = 268; x < 320; x += 10) { R.rect(x, 33, x + 8, 54, f_PAT.cristal); R.rect(x, 33, x + 8, 33, f_PAT.cristalL); }
      R.rect(0, 56, 319, 61, f_PAT.negro);
      // la fila de palcos entre los dos anfiteatros: cristal con luz cálida
      R.rect(0, 62, 319, 68, f_PAT.hormigonS); for (let x = 2; x < 320; x += 14) { R.rect(x, 63, x + 11, 67, f_PAT.cristal); R.rect(x, 63, x + 11, 63, f_PAT.cristalL); }
      R.rect(0, 69, 319, yv, f_PAT.asiento); f_patAsientos(R, ABAJO, 0, 319, hueco);
      for (const x of [40, 132, 222]) f_patEscalera(R, x, 69, yv - 1, 5); f_patTunel(R, 85, 81, 89, 9); f_patTunel(R, 177, 81, 89, 9);
      for (const x of [41, 133, 223]) f_patEscalera(R, x, 31, 54, 4);
      R.rect(0, yv, 319, yv + 7, f_PAT.muro); R.rect(0, yv, 319, yv, f_PAT.muroL); R.rect(0, yv + 6, 319, yv + 7, hex('#0e2430'));
      R.rect(0, yv + 8, 319, yc - 1, f_PAT.apron); for (let x = 0; x < 320; x++) for (let y = yv + 8; y < yc; y++) if (h(x, y, 96) < 0.15) R.pset(x, y, f_PAT.apronS);
      f_patCampo(R, yc, 'vegas');
    }));
    f_patPublico(R, t, ARRIBA, 'vegas', { hueco, x1: 265 });
    // la cinta de LED entre anfiteatros
    for (let x = 0; x < 320; x++) for (let y = 57; y <= 60; y++) { const v = (x - Math.floor(t * 30) + (y - 57) * 2 + 3200) % 16; R.pset(x, y, v < 4 ? C.naranja : f_patB4(x, y) < 0.5 ? C.equipoA : hex('#146464')); }
    // la gente de los palcos: siluetas que van y vienen tras el cristal
    for (let k = 0; k < 9; k++) { const xp = 2 + k * 28 + 6 + Math.round(Math.sin(t * 0.5 + k * 2) * 3); R.rect(xp, 65, xp + 1, 67, hex('#3a2a20')); R.pset(xp, 64, f_PATPIEL[k % 4]); if (k % 3 === 0) R.rect(xp + 4, 64, xp + 5, 67, hex('#2a2a3a')); }
    f_patPublico(R, t, ABAJO, 'vegas', { hueco });
    f_patEstandartes(R, t, [22, 44, 66, 222, 244], 31, 14);
    // el videomarcador colgado del techo con sus cables (por debajo de la barra del año)
    R.rect(126, 0, 126, 19, hex('#22283a')); R.rect(194, 0, 194, 19, hex('#22283a'));
    f_patPantalla(R, t, 114, 22, 206, 47, p, o.pantalla);
    R.rect(112, 49, 208, 50, f_PAT.negro); for (let x = 113; x < 208; x++) R.pset(x, 49, ((x + Math.floor(t * 20)) % 10) < 5 ? C.naranja : C.equipoA);
    f_patTechoVivo(R, t, 30, 62);
  }
  f_patBanda(R, t, p, yv, yc);
  f_patFondoCampo(R, t, p);
  if (den && p.nieve > 0) f_patNieveSuelo(R, p.nieve, yc);
  f_patPostesLado(R, t, den);
  if (den && p.nieve > 0) f_patNieve(R, t, p.nieve, [0, 1]);
  if (p.aire > 0) f_patAire(R, t, p.aire, (den ? 0.83 : 1) * (1 + 0.12 * p.frio), p.frio, [0, 18, 319, 152]);
  if (o.linea !== false) g_lineaPateo(R, t, { empuje: o.empuje ?? 0 });
}

// el plano de los postes, de frente desde la zona de anotación: grada (o cielo y montañas), red, valla, zona pintada
function f_patPostesPlano(R, t, p, o) {
  const den = p.lugar === 'denver', yv = 118, yl = 130;
  const red = (x, y) => x >= 92 && x <= 228 && y >= 40 && y <= 118;
  // la zona de anotación de frente: hierba con franjas, la línea de fondo, las rayas diagonales del equipo, el escudo
  // inventado (un balón entre dos estrellas) y la línea de gol
  const suelo = (lugar) => {
    const zona = lugar === 'denver' ? f_PAT.zonaB : f_PAT.zonaA, verA = hex('#4c9640'), verB = hex('#3e8436'), verS = hex('#2e6a2a'), verL = hex('#62aa52');
    for (let y = yv + 8; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (y - 40) / 90, X = 160 + (x - 160) / s; let c;
      if (y < yl) c = h(x, y, 97) < 0.2 ? f_PAT.apronS : f_PAT.apron;
      else { c = Math.floor((y - yl) / (4 + (y - yl) * 0.12)) % 2 ? verA : verB; const n = h(x, y, 98); if (n < 0.1) c = verS; else if (n > 0.94) c = verL;
        if (y >= 134 && y <= 167) { const d = ((X * 0.5 + (y - 134) * 1.4) % 12 + 12) % 12; if (d < 5 && f_patB4(x, y) < 0.75) c = zona; }
        if (y <= yl + 1 || (y >= 171 && y <= 174)) c = C.cal; }
      R.pset(x, y, c); }
    // el escudo pintado en el césped, aplastado por la perspectiva: el óvalo, el balón y dos estrellas
    for (let y = 140; y <= 162; y++) for (let x = 112; x <= 208; x++) { const e = ((x - 160) / 46) ** 2 + ((y - 151) / 10) ** 2; if (e <= 1) R.pset(x, y, e > 0.82 ? C.cal : e > 0.7 ? zona : f_patMezcla(zona, 0xff000000, 0.25)); }
    for (let y = 147; y <= 155; y++) for (let x = 146; x <= 174; x++) { const e = ((x - 160) / 14) ** 2 + ((y - 151) / 4.2) ** 2; if (e <= 1) R.pset(x, y, e > 0.75 ? C.cueroS : C.cuero); }
    R.rect(152, 151, 168, 151, C.cal); for (let x = 155; x <= 165; x += 2) R.pset(x, 150, C.cal);
    for (const sx of [128, 192]) { R.rect(sx - 4, 151, sx + 4, 151, C.cal); R.rect(sx - 1, 149, sx + 1, 153, C.cal); R.pset(sx, 148, C.cal); R.pset(sx, 154, C.cal); }
  };
  if (den) {
    R.copiar(f_patCapa(R, 'cieloPostes', () => f_patCieloFrio(R, 52)));
    f_patNubes(R, t, 48, p.nieve);
    const FILAS = [[56, 1], [59, 1], [62, 1], [65, 1], [71, 2], [76, 2], [81, 2], [86, 2], [92, 3], [98, 3], [104, 3], [110, 3], [116, 3]];
    const hueco = (x) => (x >= 36 && x <= 41) || (x >= 278 && x <= 283);
    f_patPegar(R, f_patCapa(R, 'estadioDenverP', () => {
      f_patMontes(R, 44, 18);
      R.rect(0, 50, 319, 53, hex('#4a4e5a')); R.rect(0, 50, 319, 50, hex('#7a7e8a'));
      R.rect(0, 54, 319, yv, f_PAT.asiento); f_patAsientos(R, FILAS, 0, 319, hueco); for (const x of [36, 278]) f_patEscalera(R, x, 54, yv - 1, 6);
      f_patTorreFocos(R, 252, 16, 50);
      R.rect(0, yv, 319, yv + 7, f_PAT.muro); R.rect(0, yv, 319, yv, f_PAT.muroL);
      suelo('denver');
    }), 50);
    R.halo(252, 21, 14, [hex('#c8d4e2'), hex('#e0e8f0')], 0.5);
    f_patPublico(R, t, FILAS, 'denver', { hueco });
  } else {
    const FILAS = [[22, 1], [25, 1], [28, 1], [31, 1], [34, 1], [37, 1], [40, 1], [43, 1], [62, 2], [67, 2], [72, 2], [77, 2], [82, 2], [88, 3], [94, 3], [100, 3], [106, 3], [112, 3]];
    const hueco = (x, y) => (y < 48 && x >= 266) || (x >= 36 && x <= 41) || (x >= 280 && x <= 285 && y > 56);
    R.copiar(f_patCapa(R, 'estadioVegasP', () => {
      f_patTecho(R, 17);
      R.rect(0, 18, 319, 47, f_PAT.asiento); f_patAsientos(R, FILAS.slice(0, 8), 0, 265, hueco);
      R.rect(266, 18, 319, 47, f_PAT.cristalS); for (let x = 268; x < 320; x += 10) { R.rect(x, 20, x + 8, 45, f_PAT.cristal); R.rect(x, 20, x + 8, 20, f_PAT.cristalL); }
      R.rect(0, 48, 319, 52, f_PAT.negro);
      R.rect(0, 53, 319, 58, f_PAT.hormigonS); for (let x = 2; x < 320; x += 14) { R.rect(x, 54, x + 11, 57, f_PAT.cristal); R.rect(x, 54, x + 11, 54, f_PAT.cristalL); }
      R.rect(0, 59, 319, yv, f_PAT.asiento); f_patAsientos(R, FILAS.slice(8), 0, 319, hueco);
      for (const x of [36, 280]) f_patEscalera(R, x, 59, yv - 1, 6);
      R.rect(0, yv, 319, yv + 7, f_PAT.muro); R.rect(0, yv, 319, yv, f_PAT.muroL);
      suelo('vegas');
    }));
    f_patPublico(R, t, FILAS.slice(0, 8), 'vegas', { hueco, x1: 265 });
    for (let x = 0; x < 320; x++) for (let y = 49; y <= 51; y++) { const v = (x + Math.floor(t * 30) + 3200) % 16; R.pset(x, y, v < 4 ? C.naranja : C.equipoA); }
    for (let k = 0; k < 9; k++) { const xp = 8 + k * 28 + Math.round(Math.sin(t * 0.5 + k * 2) * 3); R.rect(xp, 56, xp + 1, 57, hex('#3a2a20')); R.pset(xp, 55, f_PATPIEL[k % 4]); }
    f_patPublico(R, t, FILAS.slice(8), 'vegas', { hueco });
    f_patEstandartes(R, t, [24, 48, 72, 228, 250], 18, 13);
    R.rect(130, 0, 130, 20, hex('#22283a')); R.rect(190, 0, 190, 20, hex('#22283a'));
    f_patPantalla(R, t, 124, 23, 196, 44, p, o.pantalla);
    f_patTechoVivo(R, t, 17, 54);
  }
  // la valla con su cinta de LED, la red levantada detrás de los postes (con sus mástiles) y la gente de la banda
  const casa = den ? C.equipoB : C.equipoA, acento = den ? C.blanco : C.naranja;
  for (let x = 0; x < 320; x++) for (let y = yv + 2; y <= yv + 5; y++) { const v = ((x + Math.floor(t * 24) + Math.abs(y - yv - 3.5) * 2) % 12); R.pset(x, y, v < 3 ? acento : casa); }
  for (const x of [90, 228]) { R.rect(x, 36, x + 1, yv + 9, hex('#2a2e38')); R.pset(x, 36, hex('#6a7080')); }
  for (let y = 40; y <= 117; y++) for (let x = 92; x <= 227; x++) { const i = y * 320 + x; R.buf[i] = f_patMezcla(R.buf[i], hex('#141820'), 0.28); }
  for (let y = 40; y <= 118; y++) for (let x = 92; x <= 227; x++) { const sag = Math.round(Math.sin((x - 92) / 136 * Math.PI) * 2), yy = y - sag; if (((x + yy) % 5 === 0 || (x - yy + 400) % 5 === 0) && (x + y) % 2 === 0) R.pset(x, y, hex('#1a1c24')); }
  R.linea(92, 40, 227, 40, hex('#3a3e48'));
  f_patFigura(R, 40, 128, t, hex('#2a2a34'), { gorra: hex('#2a2a34'), piel: f_PATPIEL[2] }); R.rect(43, 121, 47, 122, hex('#e8e8e0'));
  f_patFigura(R, 264, 128, t, casa, { casco: casa, anda: true, dir: -1 });
  if (den && p.nieve > 0) f_patNieveSuelo(R, p.nieve, yl);
  f_patPostesFrente(R, t, den);
  if (o.paloma !== false) g_paloma(R, 178, 93, t, o.agacha ?? 0, -1);
  if (den && p.nieve > 0) f_patNieve(R, t, p.nieve, [0, 1]);
  if (p.aire > 0) f_patAire(R, t, p.aire, (den ? 0.83 : 1) * (1 + 0.12 * p.frio), p.frio, [0, 18, 319, 140]);
}

// el vestuario (el equipo de casa de o.lugar): techo con luces, la franja del equipo con su escudo inventado, las taquillas
// de madera, la tele, el reloj, la puerta de las duchas con vaho, la moqueta con el escudo, el banco, el carrito de
// preparar balones con el inflador y el manómetro, la caja de balones numerados y el cesto de toallas en primer término
function f_patVestuario(R, t, lugar) {
  const { rect, pset, disco, linea } = R, den = lugar === 'denver', casa = den ? C.equipoB : C.equipoA, casaS = den ? C.equipoBS : C.equipoAS, acento = den ? C.blanco : C.naranja;
  const mad = hex('#a8743c'), madS = hex('#7a5028'), madL = hex('#c8945a'), madD = hex('#5a3a1e');
  R.copiar(f_patCapa(R, 'vestuario' + lugar, () => {
    // el techo de placas con sus juntas
    rect(0, 0, 319, 10, hex('#2a2e38')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 10, hex('#22252e')); rect(0, 5, 319, 5, hex('#22252e'));
    for (let x = 0; x < 320; x++) for (let y = 0; y <= 10; y++) if (h(x, y, 101) < 0.08) pset(x, y, hex('#33384a'));
    // las rejillas del aire, los rociadores y la bandeja de cables
    for (const x of [96, 222]) { rect(x, 2, x + 22, 8, hex('#3a3e4a')); for (let i = x + 2; i < x + 21; i += 2) rect(i, 3, i, 7, hex('#262a34')); rect(x, 2, x + 22, 2, hex('#4a4e5c')); }
    for (const x of [40, 150, 286]) { pset(x, 10, hex('#8a8e98')); pset(x - 1, 10, hex('#5a5e68')); pset(x + 1, 10, hex('#5a5e68')); }
    rect(0, 11, 319, 12, casaS);
    // la franja del equipo: rayas finas y una banda del color de acento
    for (let y = 13; y <= 30; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x + y) % 6 === 0) ? casaS : y === 26 || y === 27 ? acento : casa);
    // las taquillas: el armario de arriba con rejillas, el hueco con la camiseta, las hombreras y la toalla, el banco y el cajón
    for (let k = 0; k < 8; k++) { const x0 = 2 + k * 33, x1 = x0 + 30, num = ['3', '12', '55', '9', '27', '81', '64', '17'][k];
      rect(x0 - 2, 31, x1 + 2, 118, madD); rect(x0 - 1, 31, x1 + 1, 118, madS);
      rect(x0, 32, x1, 45, mad); rect(x0, 32, x1, 32, madL); for (let y = 35; y <= 42; y += 2) rect(x0 + 4, y, x1 - 4, y, madS); rect(x0, 45, x1, 45, madD);
      // la plaquita del nombre: solo una barra con trazos
      rect(x0 + 6, 47, x1 - 6, 50, hex('#d8d4c8')); for (let i = x0 + 8; i < x1 - 8; i += 3) pset(i, 48, hex('#6a6a6a'));
      // el hueco
      for (let y = 51; y <= 98; y++) for (let x = x0 + 1; x <= x1 - 1; x++) pset(x, y, f_patMezcla(hex('#5a3a22'), hex('#2e1e12'), Math.max(0, 1 - (y - 51) / 22) * 0.7 + (f_patB4(x, y) < 0.2 ? 0.1 : 0)));
      rect(x0 + 2, 60, x1 - 2, 60, madD);
      // el casco en la balda, con la rejilla y su brillo
      const cx = x0 + 15; disco(cx, 57, 5, casa); rect(cx - 5, 57, cx + 5, 59, casa); disco(cx - 2, 55, 1, f_patMezcla(casa, hex('#ffffff'), 0.5)); rect(cx - 1, 52, cx, 59, acento); rect(cx + 3, 57, cx + 6, 59, hex('#d8d8dc')); pset(cx + 4, 58, hex('#8a8a90'));
      // las hombreras y la camiseta colgada con su número
      rect(x0 + 6, 62, x1 - 6, 66, hex('#e8e8ec')); rect(x0 + 6, 62, x1 - 6, 62, C.blanco); rect(x0 + 6, 66, x1 - 6, 66, hex('#b8b8c0'));
      rect(x0 + 5, 66, x1 - 5, 86, casa); rect(x0 + 5, 66, x0 + 6, 86, f_patMezcla(casa, hex('#ffffff'), 0.2)); rect(x1 - 6, 66, x1 - 5, 86, casaS); rect(x0 + 9, 66, x1 - 9, 67, acento);
      f_patCifras(R, num, cx - (num.length * 7 - 1) / 2, 72, acento, { ex: 2, ey: 2, sep: 1 });
      // cada taquilla, con lo suyo: la toalla en el gancho, una foto pegada, las botas colgadas de los cordones, la bolsa
      if (k % 2 === 0) { rect(x1 - 4, 60, x1 - 2, 80, hex('#eeeeea')); rect(x1 - 2, 60, x1 - 2, 80, hex('#c8c8c4')); for (let y = 62; y < 80; y += 5) pset(x1 - 3, y, hex('#d8d8d4')); }
      if (k % 3 === 1) { rect(x0 + 1, 68, x0 + 5, 74, C.blanco); rect(x0 + 2, 69, x0 + 4, 71, hex('#7ab8e8')); rect(x0 + 2, 72, x0 + 4, 73, hex('#5a9a4a')); pset(x0 + 3, 70, hex('#ffe08a')); }
      if (k % 3 === 2) { linea(x1 - 3, 61, x1 - 4, 82, hex('#e8e8e8')); rect(x1 - 6, 82, x1 - 2, 85, hex('#1a1a20')); pset(x1 - 2, 85, hex('#c8c8c8')); }
      if (k === 4 || k === 7) { rect(x0 + 2, 88, x0 + 14, 97, hex('#2a2e3a')); rect(x0 + 2, 88, x0 + 14, 88, hex('#4a5060')); rect(x0 + 6, 86, x0 + 10, 87, hex('#1a1a20')); rect(x0 + 3, 92, x0 + 13, 92, casa); }
      rect(x0 + 5, 94, x0 + 11, 97, hex('#1a1a20')); rect(x0 + 16, 94, x0 + 22, 97, hex('#1a1a20')); pset(x0 + 6, 98, hex('#c8c8c8')); pset(x0 + 17, 98, hex('#c8c8c8'));
      // el banco acolchado y el cajón con su tirador
      rect(x0, 99, x1, 103, casa); rect(x0, 99, x1, 99, f_patMezcla(casa, hex('#ffffff'), 0.3)); rect(x0, 103, x1, 103, casaS);
      rect(x0, 104, x1, 116, mad); rect(x0, 104, x1, 104, madL); rect(x0 + 12, 109, x1 - 12, 110, hex('#c8c8c8')); for (let y = 106; y < 116; y += 3) rect(x0 + 1, y, x0 + 4, y, madS); }
    // la puerta de las duchas: el marco, los azulejos blancos de dentro, la ducha y el sumidero
    rect(266, 31, 319, 118, hex('#d8d4cc')); rect(266, 31, 319, 46, hex('#c8c4bc'));
    rect(272, 48, 316, 118, hex('#3a3e48')); rect(274, 50, 314, 118, hex('#cfd8dc'));
    for (let y = 50; y <= 118; y++) for (let x = 274; x <= 314; x++) if ((y - 50) % 5 === 0 || (x - 274) % 5 === 0) pset(x, y, hex('#a8b4ba')); else if (h(x, y, 102) < 0.08) pset(x, y, hex('#e8f0f2'));
    rect(298, 60, 299, 74, hex('#9aa0a8')); rect(294, 58, 303, 60, hex('#b8c0c8')); rect(295, 61, 302, 61, hex('#6a7078'));
    // el suelo: el zócalo y la moqueta del color del equipo, con su textura y el escudo inventado (un balón y dos estrellas)
    rect(0, 117, 319, 119, hex('#1a1a20'));
    for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 103); pset(x, y, n < 0.18 ? f_patMezcla(casaS, 0xff000000, 0.3) : n > 0.9 ? f_patMezcla(casa, 0xff000000, 0.2) : f_patMezcla(casaS, 0xff000000, 0.12)); }
    for (let y = 136; y <= 176; y++) for (let x = 90; x <= 230; x++) { const e = ((x - 160) / 70) ** 2 + ((y - 156) / 20) ** 2; if (e <= 1) pset(x, y, e > 0.86 ? acento : e > 0.74 ? f_patMezcla(casaS, 0xff000000, 0.12) : casa); }
    for (let y = 148; y <= 164; y++) for (let x = 138; x <= 182; x++) { const e = ((x - 160) / 22) ** 2 + ((y - 156) / 8) ** 2; if (e <= 1) pset(x, y, e > 0.75 ? C.cueroS : C.cuero); }
    rect(146, 156, 174, 156, C.cal); for (let x = 150; x <= 170; x += 3) rect(x, 155, x, 157, C.cal);
    for (const sx of [116, 204]) { rect(sx - 5, 156, sx + 5, 156, acento); rect(sx - 1, 153, sx + 1, 159, acento); }
    // los charcos de luz de los focos del techo sobre la moqueta, y la sombra al pie de las taquillas
    for (const [lx, ly] of [[70, 128], [200, 126]]) for (let y = ly - 7; y <= ly + 7; y++) for (let x = lx - 50; x <= lx + 50; x++) { const e = ((x - lx) / 50) ** 2 + ((y - ly) / 7) ** 2; if (e < 1 && f_patB4(x, y) < (1 - e) * 0.6) pset(x, y, f_patMezcla(R.pget(x, y), hex('#fff0d0'), 0.18)); }
    for (let x = 0; x < 266; x++) for (let y = 120; y <= 123; y++) if (f_patB4(x, y) < (124 - y) / 5) pset(x, y, f_patMezcla(R.pget(x, y), 0xff000000, 0.35));
    // la sombra del carrito y la de la caja sobre la moqueta
    for (const [cx, cy, rx] of [[193, 160, 44], [262, 166, 28]]) for (let y = cy - 3; y <= cy + 3; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / 3.5) ** 2; if (e < 1) pset(x, y, f_patMezcla(R.pget(x, y), 0xff000000, 0.35)); }
    // las botellas de agua en su portabotellas, junto al banco
    rect(112, 134, 132, 142, hex('#3a3e48')); rect(112, 134, 132, 134, hex('#5a5e6a')); for (let k = 0; k < 5; k++) { rect(113 + k * 4, 126, 115 + k * 4, 133, k % 2 ? hex('#e8e8f0') : acento); pset(114 + k * 4, 125, hex('#3a3a3a')); pset(113 + k * 4, 128, hex('#ffffff')); }
    // el banco suelto del centro, con una toalla y una bolsa
    rect(20, 128, 110, 131, mad); rect(20, 128, 110, 128, madL); rect(20, 131, 110, 131, madS); for (const x of [24, 104]) { rect(x, 132, x + 2, 142, madD); }
    rect(60, 125, 72, 127, hex('#eeeeea')); rect(60, 127, 72, 127, hex('#c8c8c4')); rect(30, 136, 48, 142, hex('#2a2a34')); rect(30, 136, 48, 136, hex('#4a4a58')); rect(36, 134, 42, 135, hex('#1a1a20'));
  }));
  // las luces del techo con su halo; la tira de LED parpadea un poco
  for (const x of [196, 246, 8]) { rect(x - 4, 3, x + 4, 5, hex('#fff4d8')); R.halo(x, 6, 10, [hex('#3a3e4a'), hex('#4a4e5a')], 0.6); rect(x - 4, 3, x + 4, 5, hex('#fff4d8')); }
  // la tele de la pared con la repetición de una patada, y el reloj con su segundero
  rect(190, 13, 248, 30, f_PAT.negro); f_patPantalla(R, t, 192, 15, 246, 28, { aire: 0 }, 'repeticion');
  { const cx = 260, cy = 21; disco(cx, cy, 7, hex('#1a1a20')); disco(cx, cy, 6, hex('#f2f0ea')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), hex('#5a5a5a')); }
    const s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2; linea(cx, cy, Math.round(cx + Math.cos(s) * 5), Math.round(cy + Math.sin(s) * 5), hex('#c83a3a')); linea(cx, cy, cx + 3, cy - 1, hex('#1a1a20')); linea(cx, cy, cx, cy - 4, hex('#1a1a20')); }
  // la ducha que gotea y el vaho que sale por la puerta
  { const u = (t * 1.3) % 1; pset(298, Math.round(62 + u * 50), hex('#8ac8f0')); if (u > 0.9) { pset(296, 113, hex('#8ac8f0')); pset(300, 113, hex('#8ac8f0')); } }
  for (let q = 0; q < 18; q++) { const u = (t * 0.12 + q / 18) % 1, x = Math.round(292 + Math.sin(u * 5 + q) * 10 - u * 24), y = Math.round(114 - u * 62), r = 3 + Math.round(u * 5);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && f_patB4(x + i, y + j) < 0.6 * (1 - u * 0.8)) { const px = x + i, py = y + j; if (py > 47) pset(px, py, f_patMezcla(R.pget(px, py), hex('#ffffff'), 0.5)); } }
  // el carrito de preparar balones: acero con brillo, dos baldas, ruedas; encima balones, cepillos, toalla y el inflador
  const ac = hex('#b8c0cc'), acS = hex('#7a8494'), acL = hex('#e8eef6');
  rect(154, 130, 232, 132, ac); rect(154, 130, 232, 130, acL); rect(154, 132, 232, 132, acS);
  for (const x of [156, 229]) rect(x, 133, x + 2, 157, acS); rect(156, 133, 156, 157, ac);
  rect(156, 148, 231, 150, ac); rect(156, 148, 231, 148, acL); for (const x of [157, 230]) { disco(x, 159, 2, f_PAT.negro); pset(x, 159, hex('#6a6a70')); }
  for (let k = 0; k < 3; k++) { rect(162 + k * 10, 143 - k, 170 + k * 10, 147, hex('#eeeeea')); rect(162 + k * 10, 143 - k, 170 + k * 10, 143 - k, C.blanco); rect(162 + k * 10, 147, 170 + k * 10, 147, hex('#c8c8c4')); }
  rect(200, 142, 226, 147, hex('#2a2a34')); rect(200, 142, 226, 142, hex('#4a4a58')); for (let x = 203; x < 224; x += 4) rect(x, 140, x + 2, 141, x % 8 ? hex('#c8a060') : hex('#e8e8e8'));
  const balonCaja = (x, y, n, rot = 0) => { for (let j = -3; j <= 3; j++) for (let i = -6; i <= 6; i++) { const e = (i / 6.5) ** 2 + (j / 3.6) ** 2; if (e <= 1) pset(x + i, y + j, e > 0.7 ? C.cueroS : j < -1 ? C.cueroL : C.cuero); }
    rect(x - 3, y - 1, x + 3, y - 1, C.cordon); for (let i = -2; i <= 2; i += 2) pset(x + i, y - 2, C.cordon); if (n) { rect(x - 5, y - 2, x - 4, y + 2, C.blanco); f_patCifras(R, n, x + 1, y - 2, C.blanco); } };
  balonCaja(172, 126, null); balonCaja(212, 126, '7');
  // los cepillos, la toalla y el inflador con su manómetro (la aguja tiembla)
  rect(186, 127, 196, 129, madS); for (let x = 187; x < 196; x++) pset(x, 126, hex('#d8c8a0')); rect(178, 128, 182, 129, hex('#3a3a3a'));
  rect(220, 128, 230, 129, hex('#eeeeea')); rect(160, 120, 162, 129, hex('#3a3e48')); disco(161, 118, 4, f_PAT.negro); disco(161, 118, 3, C.blanco);
  { const a = -Math.PI * 0.75 + 1.1 + Math.sin(t * 7) * 0.08; linea(161, 118, Math.round(161 + Math.cos(a) * 3), Math.round(118 + Math.sin(a) * 3), hex('#c83a3a')); }
  linea(162, 125, 166, 128, hex('#2a2a2a')); linea(166, 128, 168, 127, hex('#2a2a2a'));
  // la caja de los balones de patada: tablillas, el número de cada balón y una franja blanca (sin letras)
  rect(238, 140, 284, 166, madD); rect(239, 141, 283, 165, mad); for (let y = 146; y < 166; y += 6) rect(239, y, 283, y, madS); rect(239, 141, 283, 141, madL);
  for (const x of [242, 280]) rect(x, 141, x + 1, 165, madS);
  ['1', '2', '3', '4'].forEach((n, k) => balonCaja(245 + k * 10, 138 - (k % 2) * 2, n));
  balonCaja(262, 131, '5');
  rect(252, 152, 270, 157, hex('#eeeae0')); f_patCifras(R, '24', 256, 153, hex('#3a3a3a'));
  // el cesto de toallas en primer término (la lona, el armazón y las toallas que asoman)
  rect(0, 150, 34, 179, hex('#4a4a52')); for (let y = 152; y < 180; y++) for (let x = 1; x <= 33; x++) pset(x, y, (x + y * 2) % 5 === 0 ? hex('#7a7a7e') : x > 28 ? hex('#6e6e74') : x < 4 ? hex('#a0a0a6') : hex('#8a8a8e'));
  rect(0, 150, 34, 151, hex('#c8ccd4')); rect(0, 150, 0, 179, hex('#c8ccd4')); rect(34, 150, 34, 179, hex('#8a8e96')); rect(4, 166, 30, 167, hex('#5a5a62')); f_patCifras(R, '3', 14, 158, hex('#c8ccd4'));
  for (let k = 0; k < 5; k++) { const x = 3 + k * 6; rect(x, 144 + (k % 2) * 2, x + 6, 151, hex('#eeeeea')); rect(x, 144 + (k % 2) * 2, x + 6, 144 + (k % 2) * 2, C.blanco); rect(x + 6, 145, x + 6, 151, hex('#c8c8c4')); }
}
