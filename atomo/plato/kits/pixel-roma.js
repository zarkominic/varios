// Kit «pixel roma»: lo del episodio 5 encima de pixel aventura (personajes con ropa romana). El denario con su barra de
// plata (el ancla del episodio), el mapa del Mediterráneo con el imperio, cielos de día, de tarde y de tormenta,
// edificios (templo, columnas, bloques de pisos, acueducto, Panteón, murallas, cabañas), el salón de mármol del gancho,
// animales (loba, elefante, oveja, perro, caballo) y un trirreme.
//
//   import { crearRoma, PR } from '/atomo/plato/kits/pixel-roma.js';
//   const R = await crearRoma(lienzo);   // todo lo de crearAventura (personaje, ELENCO, PALA…) y lo de aquí
//
// Mismo lienzo (320 × 180 ×6) y mismas reglas: personajes pequeños, sin primeros planos; solo números y símbolos.
import { crearAventura, PALA, ELENCO } from '/atomo/plato/kits/pixel-aventura.js';
import { pal, hex } from '/atomo/plato/kits/pixel-retro.js';

export const PR = {
  TARDE: pal(['#3a1446', '#6a2450', '#a83a4a', '#e0663a', '#f8a048', '#ffd878']),
  DIA: pal(['#2e5aa8', '#4a7ac8', '#6c9ad8', '#98bce6', '#c8dcf2']),
  TORMENTA: pal(['#141020', '#221c30', '#342a42', '#4a3e56', '#66586e']),
  NUBE: pal(['#8a7a9a', '#c8bcd0', '#f0e8f0', '#ffffff']),
  NUBE_TARDE: pal(['#5a1e4a', '#8a3a5a', '#c86a6a', '#f0a080']),
  SOL: pal(['#fff4c0', '#ffc860']),
  MAR: pal(['#0c2240', '#123660', '#1c4e82', '#2e6aa0', '#5a96c4']),
  TIERRA: pal(['#4a3420', '#6e4e2e', '#94703e', '#b89256', '#d6b47a']),
  HIERBA: pal(['#1a3218', '#2a4e22', '#40702c', '#62923a', '#90b84e']),
  PLATA: pal(['#34384e', '#5e6684', '#959cb8', '#ccd4e6', '#ffffff']),
  COBRE: pal(['#3a1a10', '#6a3018', '#9a5028', '#c87a40', '#e8a868']),
  NIEVE: pal(['#5a6a8a', '#8a9ac0', '#c0cce6', '#ffffff']),
  ROCA: pal(['#241e2c', '#3e3446', '#5c5062', '#807280']),
  AGUA: pal(['#1a3a6a', '#2a5a9a', '#4a8ac8', '#8ac0ee', '#d0ecff']),
  GRIS: pal(['#2a2830', '#4a4650', '#6e6a74', '#9a96a0', '#c8c4cc']),
  ELEFANTE: pal(['#3a3440', '#5a5260', '#7c7482', '#a29aa6']),
  LANA: pal(['#8a8478', '#c8c0b0', '#eee8dc', '#ffffff']),
  MADERA: pal(['#2e1a10', '#4e3018', '#704a28', '#946a3c']),
  PAJA: pal(['#5a4218', '#8a6a28', '#b89040', '#e0bc68']),
};

// Lon/lat (grados) del mapa: del Atlántico a Mesopotamia, del Sáhara a Escocia.
const LON0 = -12, LON1 = 50, LAT0 = 24, LAT1 = 59;
export const LUGARES = {
  roma: [12.5, 41.9], cartago: [10.3, 36.8], cannas: [16.1, 41.3], sevilla: [-6, 37.4], constantinopla: [29, 41],
  alpes: [7, 45.3], rubicon: [12.3, 44.1], persia: [44.5, 33.3], ravena: [12.2, 44.4], atenas: [23.73, 37.98],
  alejandria: [29.9, 31.2], londres: [-0.1, 51.5], cartagena: [-1, 37.6],
  // Grecia y el mundo griego
  esparta: [22.43, 37.07], olimpia: [21.63, 37.64], maraton: [23.96, 38.15], termopilas: [22.53, 38.8], salamina: [23.5, 37.95],
  delos: [25.27, 37.4], pela: [22.52, 40.76], queronea: [22.85, 38.5], babilonia: [44.42, 32.54], persepolis: [52.89, 29.93],
  sardes: [28.04, 38.49], siracusa: [15.3, 37.07], massalia: [5.4, 43.3], napoles: [14.25, 40.85], cirene: [21.86, 32.82],
  bizancio: [29, 41], olbia: [31.9, 46.7], sinope: [35.1, 42.0], emporion: [3.1, 42.1], tebas: [23.32, 38.32], corinto: [22.93, 37.9],
  dublin: [-6.26, 53.35], nuevayork: [-74, 40.7], edimburgo: [-3.19, 55.95], tara: [-6.6, 53.58],
  mileto: [27.28, 37.53], efeso: [27.34, 37.94], troya: [26.24, 39.96], indo: [71.5, 32], bactra: [66.9, 36.76], siena: [32.9, 24.09],
  // Egipto
  menfis: [31.25, 29.85], guiza: [31.13, 29.98], luxor: [32.65, 25.7], asuan: [32.9, 24.09], kerma: [30.4, 19.6], napata: [31.8, 18.5],
  kadesh: [36.5, 34.56], hattusa: [34.6, 40.0], avaris: [31.82, 30.79],
};
// Mares (polígonos en lon/lat): todo lo que no es mar es tierra.
const MAR = {
  med: [[-5.6, 36.1], [-4.5, 36.7], [-2, 36.8], [-0.5, 38.3], [0.2, 39.5], [-0.3, 40.2], [1, 41], [3.2, 41.9], [3.1, 43], [4.5, 43.4], [6.5, 43.1], [8.5, 44.4], [10, 44], [10.5, 43], [12.3, 41.7], [14, 40.8], [15.6, 40], [15.8, 38.5], [16.6, 38.4], [17.1, 39], [16.5, 39.8], [17.2, 40.5], [18.5, 40.1], [18, 40.6], [16, 41.9], [14, 42.6], [12.4, 44.2], [12.3, 45.4], [13.7, 45.6], [15, 44.5], [17, 43.4], [19, 42], [19.5, 40.5], [20.0, 39.7], [20.3, 39.3], [20.7, 38.9], [21.1, 38.4], [21.3, 37.9], [21.6, 37.6], [21.7, 37.0], [21.9, 36.8], [22.2, 37.0], [22.4, 36.45], [22.6, 36.8], [22.8, 36.5], [23.05, 36.45], [23.0, 37.0], [22.75, 37.5], [23.2, 37.4], [23.1, 37.6], [23.4, 37.95], [23.6, 37.9], [24.0, 37.65], [24.05, 38.0], [23.6, 38.4], [22.9, 38.85], [22.6, 38.9], [23.0, 39.2], [22.9, 39.6], [22.6, 40.0], [22.6, 40.5], [23.0, 40.5], [23.7, 40.2], [23.4, 40.0], [24.0, 40.0], [24.4, 40.15], [23.9, 40.5], [24.5, 40.9], [25.5, 40.9], [26.0, 40.8], [26.3, 40.1], [26.6, 39.3], [26.9, 38.9], [26.6, 38.6], [27.0, 38.4], [26.3, 38.3], [27.2, 37.9], [27.3, 37.4], [27.6, 37.0], [28.2, 36.7], [30.5, 36.8], [32.8, 36.1], [36, 36.8], [35.9, 35], [35, 33], [34.3, 31.3], [32.3, 31.2], [30, 31.4], [25, 31.8], [20, 32], [20, 30.4], [19, 30.3], [15.6, 31.6], [11.5, 33.1], [10.2, 34.2], [11, 35.2], [10.2, 36.9], [9.8, 37.3], [8, 36.9], [3, 36.8], [0, 35.8], [-2, 35.1], [-5.4, 35.9]],
  atlanticoN: [[-20, 18], [-20, 74], [-80, 74], [-80, 63], [-64, 60], [-60, 55], [-56, 52], [-60, 47], [-66, 44.5], [-70, 42], [-74, 40.5], [-75.5, 37], [-76, 35], [-81, 31], [-80.2, 25.5], [-82, 24], [-82, 18]],
  corinto: [[21.7, 38.35], [22.4, 38.2], [22.9, 38.03], [23.15, 38.0], [22.9, 38.15], [22.2, 38.42], [21.6, 38.5]],
  arabigo: [[56.5, 26.5], [57, 25.5], [61, 25.2], [66.5, 25.3], [68, 23.5], [70, 22.5], [72.8, 21], [73.2, 17], [75, 12], [77.5, 8], [80, 8], [80, 0], [43, 0], [43, 11.5], [51, 11.8], [52, 12.2], [55, 17], [57.5, 19], [59.5, 22.5], [58.5, 23.6], [56.5, 24]],
  marmara: [[26.4, 40.2], [27.5, 40.3], [29, 40.4], [29.1, 41.1], [28, 41], [26.7, 40.6]],
  atlantico: [[-20, 20], [-16, 24], [-13, 27.7], [-10, 29.5], [-9.6, 30.5], [-9.8, 32], [-8.5, 33.3], [-6.8, 34], [-5.9, 35.8], [-6.3, 36.5], [-7.4, 37.2], [-8.9, 37], [-8.8, 38.7], [-9.5, 38.8], [-8.9, 40], [-8.8, 42], [-9.3, 43], [-7.7, 43.7], [-4, 43.4], [-1.8, 43.4], [-1.2, 44.6], [-1.2, 46.2], [-2.2, 47.1], [-4.5, 47.8], [-4.7, 48.5], [-3, 48.8], [-1.6, 48.6], [-1.4, 49.7], [0.2, 49.6], [1.6, 50.2], [1.6, 51], [2.5, 51.1], [3.6, 51.4], [4.5, 52.5], [5, 53.3], [7, 53.6], [8.6, 53.9], [8.6, 55.5], [8.2, 56.8], [10.5, 57.7], [10.6, 59.2], [9, 58.8], [7, 58], [5.5, 58.8], [5, 60], [-20, 60]],
  baltico: [[10.5, 54.5], [14, 54], [18, 54.7], [21, 55], [21, 57], [24, 57.5], [24, 59.5], [19, 59.5], [18.5, 58], [16.5, 57], [16, 56], [14.5, 55.5], [12.8, 55.5], [12.5, 56.2], [11, 57.5], [10.6, 57.6]],
  negro: [[28, 41.2], [29, 41.2], [31, 41.1], [33, 42], [35, 42], [36, 41.6], [38, 41], [40, 41], [41.5, 41.5], [41.7, 42.6], [40, 43.5], [38.5, 44.3], [37.5, 45], [36.6, 45.4], [35, 45], [33.5, 44.4], [32.5, 45.3], [33.5, 46], [31.5, 46.6], [30.7, 46.5], [29.7, 45.3], [28.6, 44.3], [28, 43], [27.9, 42]],
  caspio: [[47, 42.5], [49.5, 40.4], [49, 38.5], [49.5, 37.5], [51, 36.8], [54, 37], [53.9, 38.9], [53, 40], [53, 42], [51.5, 44.5], [50, 46.3], [47.5, 45.5]],
  rojo: [[32.4, 30], [32.7, 29], [33.5, 27.5], [35, 25.5], [36.5, 23], [38, 20], [40, 17], [43, 13], [44, 14], [41, 19], [39, 22], [37, 25], [35.2, 28], [34.6, 29.5], [34, 27.9], [33.2, 28.8], [32.6, 30]],
  persico: [[47.8, 30.2], [48.8, 30], [50, 29.5], [51, 28], [53, 26.8], [56.5, 26.5], [56, 24], [54, 24], [52, 24.2], [51, 25.5], [50.5, 26.5], [49.5, 27.2], [48.5, 28.5]],
};
const ISLAS = {
  britania: [[-5.7, 50], [-4, 50.3], [-1.5, 50.6], [1.4, 51.2], [1.7, 52.6], [0.3, 53.4], [-0.2, 54.2], [-1.5, 55.5], [-2, 56], [-2.9, 56.5], [-1.8, 57.6], [-3.3, 58.6], [-5, 58.6], [-6.2, 57.5], [-5.6, 56.2], [-5.4, 55.4], [-4.8, 54.8], [-3.4, 54.9], [-3, 54], [-3.1, 53.3], [-4.6, 53.2], [-4.2, 52.3], [-5.3, 51.8], [-3.4, 51.4], [-4.5, 51.1]],
  irlanda: [[-10, 51.6], [-6.2, 52.2], [-6, 53.5], [-5.6, 54.6], [-7.2, 55.3], [-8.5, 54.4], [-10, 53.6], [-9.4, 52.6]],
  sicilia: [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.6, 37.6]],
  cerdena: [[8.4, 39], [9.6, 39.1], [9.8, 41], [8.4, 41]],
  corcega: [[8.6, 41.4], [9.4, 41.4], [9.5, 43], [8.7, 42.6]],
  creta: [[23.5, 35.3], [26.3, 35.1], [26.2, 35.4], [23.6, 35.6]],
  chipre: [[32.3, 34.7], [34.6, 35.6], [33.9, 35.1], [32.5, 35.1]],
  groenlandia: [[-55, 60], [-42, 60], [-20, 70], [-18, 80], [-40, 83], [-62, 80], [-68, 76], [-58, 68]],
  islandia: [[-24, 63.4], [-18, 63.4], [-13.5, 64.5], [-14.5, 66.4], [-22, 66.4], [-24, 65.5]],
  terranova: [[-59.4, 47.6], [-55.5, 46.6], [-52.6, 46.8], [-53, 49.5], [-55.5, 51.6], [-57.2, 50.6]],
  eubea: [[22.8, 38.95], [23.6, 38.55], [24.6, 38.0], [24.4, 38.3], [23.4, 38.95], [22.9, 39.05]],
  lesbos: [[25.85, 39.1], [26.6, 39.0], [26.4, 39.4], [25.9, 39.35]],
  quios: [[25.9, 38.2], [26.15, 38.25], [26.1, 38.6], [25.9, 38.55]],
  samos: [[26.6, 37.65], [27.05, 37.7], [26.95, 37.8], [26.6, 37.8]],
  rodas: [[27.7, 35.95], [28.25, 36.45], [28.05, 36.45], [27.75, 36.15]],
  naxos: [[25.35, 36.95], [25.6, 37.0], [25.55, 37.2], [25.4, 37.18]],
  paros: [[25.05, 37.0], [25.25, 37.0], [25.25, 37.15], [25.08, 37.15]],
  andros: [[24.65, 37.75], [24.95, 37.85], [24.8, 38.0], [24.65, 37.9]],
  tenos: [[25.0, 37.5], [25.25, 37.6], [25.1, 37.7]],
  milo: [[24.35, 36.65], [24.55, 36.65], [24.5, 36.8], [24.35, 36.78]],
  tera: [[25.35, 36.35], [25.48, 36.35], [25.45, 36.48]],
  salamina: [[23.4, 37.88], [23.55, 37.9], [23.55, 37.98], [23.45, 37.98]],
  egina: [[23.42, 37.7], [23.55, 37.7], [23.5, 37.78]],
  lemnos: [[25.05, 39.8], [25.4, 39.8], [25.35, 40.0], [25.1, 40.0]],
  tasos: [[24.55, 40.6], [24.8, 40.6], [24.75, 40.8], [24.6, 40.8]],
  corfu: [[19.65, 39.5], [19.95, 39.4], [20.0, 39.6], [19.75, 39.8]],
  cefalonia: [[20.35, 38.1], [20.75, 38.1], [20.65, 38.35], [20.45, 38.3]],
  zante: [[20.65, 37.65], [20.95, 37.7], [20.85, 37.9]],
};
export const ZONAS = {
  italia: [[6.8, 44], [7, 46], [10.5, 46.8], [13.7, 46.5], [13.7, 45.6], [12.3, 45.3], [12.5, 44], [14, 42.4], [16.2, 41.8], [18.6, 40.2], [17, 38.8], [15.8, 36.4], [12.1, 37.4], [11.8, 38.4], [8, 38.8], [8, 41.4], [9.5, 43.1], [7.5, 43.8]],
  cartago: [[-6.5, 35.5], [-1, 35.2], [3, 36.9], [8, 37.2], [11.2, 37.4], [11.5, 32.5], [8, 32.5], [-3, 33.8], [-6.5, 34.5], [-6.5, 35.5], [-7, 37.2], [-4, 37.8], [0.4, 38.8], [0.8, 40.6], [-1, 41], [-3, 39.5], [-6.5, 38.5]],
  grecia: [[19.3, 40.0], [19.8, 41.0], [23, 41.4], [26.6, 41.3], [27.2, 40.4], [27.3, 39.2], [28.6, 37.5], [28.4, 36.3], [26.5, 35.0], [23.3, 35.1], [21.4, 36.4], [20.3, 38.0], [19.3, 39.5]],
  macedonia: [[20.4, 40.3], [20.8, 41.6], [23, 41.9], [24.5, 41.3], [23.8, 40.4], [22.6, 39.9], [21.4, 39.8]],
  persia: [[22.8, 41.0], [26, 42.2], [29, 42.5], [35, 42.1], [41.5, 41.6], [45, 43], [49, 41.5], [54, 41], [60, 40.5], [66, 40.5], [70, 38.5], [72, 36.5], [74, 33.5], [72.5, 30], [71, 26], [68, 24], [66.5, 25.3], [61, 25.2], [57, 25.5], [56.5, 27], [52, 28], [50, 30], [48, 30], [47, 29], [44, 30.5], [39, 30], [36, 28], [34, 26], [32, 23], [29, 23], [25, 29.5], [25, 31.6], [29, 31], [32, 31.2], [34.3, 31.3], [35.9, 35], [36, 36.8], [30.5, 36.8], [28.4, 36.6], [27.2, 37.4], [26.4, 38.4], [26.4, 39.4], [26.2, 40.2], [25.4, 40.9], [23.8, 40.7]],
  imperio: [[-10, 36], [-10, 44], [-2, 48], [-5, 48.5], [-6, 50], [-5.5, 55], [-2.5, 55.2], [1, 55], [3.5, 51.5], [6, 51.8], [7.5, 50], [8, 47.5], [10, 47.6], [13, 48.3], [17, 48.2], [19, 47.8], [22, 48.2], [24.5, 48], [27, 47.6], [30, 46], [33, 46], [36, 45.5], [41.5, 42.5], [44, 41.5], [46, 40], [45, 37.5], [46, 35], [48.5, 31], [48.5, 29.5], [46, 30.5], [44, 32], [40, 32], [37, 29.5], [35, 27], [34, 26], [33, 24], [25, 24], [25, 29.8], [20, 30], [15, 30.5], [10, 31.5], [8, 32.5], [1, 34], [-2, 34], [-6, 33], [-9, 32.5], [-10, 34]],
};
const dentroPol = (x, y, P) => {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, yi] = P[i], [xj, yj] = P[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
};

export async function crearRoma(lienzo) {
  const R = await crearAventura(lienzo);
  const { W, H, pset, rect, linea, disco, poligono, tone, b4, hash2, vnoise, clamp, lerp, tramo, sale, TAU } = R;
  const CONTORNO = PALA.CONTORNO;

  // ── Iconos extra para la caja (7 × 7) ────────────────────────────────────────────────────────────────────────────
  Object.assign(R.ICONOS, {
    espadas: ['#.....#', '.#...#.', '..#.#..', '...#...', '..#.#..', '##...##', '#.....#'],
    moneda: ['..###..', '.#...#.', '#..#..#', '#.###.#', '#..#..#', '.#...#.', '..###..'],
    arena: ['#######', '.#...#.', '..#.#..', '...#...', '..#.#..', '.#.#.#.', '#######'],
    punal: ['......#', '.....#.', '....#..', '...#...', '#.#....', '.#.....', '#.#....'],
    laurel: ['.#...#.', '#.....#', '#.....#', '#.....#', '.#...#.', '..#.#..'],
    cruz: ['...#...', '...#...', '#######', '...#...', '...#...', '...#...', '...#...'],
    persona: ['..#..', '.###.', '#.#.#', '..#..', '.#.#.', '.#.#.'],
    flecha: ['....#..', '.....#.', '#######', '.....#.', '....#..'],
    casa: ['...#...', '..###..', '.#####.', '#######', '.#...#.', '.#.#.#.', '.#####.'],
    columna: ['#######', '.#####.', '..#.#..', '..#.#..', '..#.#..', '.#####.', '#######'],
    casco: ['..###..', '.#####.', '##...##', '#..#..#', '#..#..#', '#.....#', '.#...#.'],
    estrella: ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '##...##'],
    rana: ['.#...#.', '###.###', '#######', '.#####.', '#.#.#.#'],
    urna: ['.#####.', '..#.#..', '.#####.', '#######', '#######', '.#####.', '..###..'],
    rayo: ['...###', '..###.', '.###..', '#####.', '..##..', '.##...', '#.....'],
    fuego: ['...#...', '..##...', '..###..', '.#####.', '.##.##.', '#######', '.#####.'],
    calabaza: ['...#...', '.##.##.', '#######', '#.#.#.#', '#######', '#.....#', '.#####.'],
    caramelo: ['#.....#', '##.#.##', '.#####.', '#######', '.#####.', '##.#.##', '#.....#'],
    murcielago: ['#.....#', '##.#.##', '#######', '.##.##.', '..#.#..'],
    mascara: ['.#####.', '#######', '#.###.#', '#######', '##.#.##', '#.###.#', '.#####.'],
    piramide: ['...#...', '..###..', '..#.#..', '.#####.', '.#.#.#.', '#######', '#######'],
    carro: ['.....##', '....###', '#######', '.#..##.', '###....', '#.#....', '###....'],
    ankh: ['..###..', '.#...#.', '.#...#.', '..###..', '#######', '...#...', '...#...'],
    ojo: ['.#####.', '#..#..#', '.#####.', '...#...', '..#.#..', '.#...#.', '#.....#'],
    corazon: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
    pluma: ['....##.', '...###.', '..####.', '.####..', '.###...', '.#.....', '#......'],
  });

  // ── Cielos: tarde, día y tormenta (la noche es R.cielo) ─────────────────────────────────────────────────────────
  const nubesR = (t, o = {}) => {
    const n = o.n ?? 6, rp = o.rampa ?? PR.NUBE, vel = o.vel ?? 3, y0 = o.y0 ?? 14, y1 = o.y1 ?? 70;
    for (let k = 0; k < n; k++) {
      const w = 18 + 26 * hash2(k, 3), h = 4 + 5 * hash2(k, 4), cy = y0 + (y1 - y0) * hash2(k, 5);
      const cx = ((k * 97 + 40 * hash2(k, 6) + t * vel * (0.6 + hash2(k, 7))) % (W + 2 * w)) - w;
      for (let y = Math.floor(cy - h * 1.6); y <= cy + h; y++) for (let x = Math.floor(cx - w); x <= cx + w; x++) {
        const u = (x - cx) / w, v = (y - cy) / h, bul = 0.35 * Math.sin(u * 7 + k);
        const d = u * u + (v + (v < 0 ? bul : 0)) ** 2;
        if (d < 1 - 0.35 * b4(x, y)) pset(x, y, tone(rp, (o.base ?? 1.6) + (v < 0 ? 1.2 : -0.2) - u * 0.6, x, y));
      }
    }
  };
  const cieloR = (t, tipo = 'tarde', o = {}) => {
    const hor = o.hor ?? H, rp = tipo === 'dia' ? PR.DIA : tipo === 'tormenta' ? PR.TORMENTA : PR.TARDE;
    const sol = o.sol, fl = tipo === 'tormenta' && o.rayos && (t * 0.7 % 3) < 0.08;
    for (let y = 0; y < Math.min(H, hor); y++) for (let x = 0; x < W; x++) {
      let v = tipo === 'dia' ? 0.3 + (y / hor) * 3.9 : tipo === 'tormenta' ? 0.4 + (y / hor) * 2.6 + 1.2 * vnoise(x * 0.04 + t * 0.3, y * 0.08) : 0.2 + (y / hor) * 5.4;
      if (sol) v += 1.5 * Math.exp(-Math.hypot(x - sol[0], (y - sol[1]) * 1.3) / 26);
      if (fl) v += 2;
      pset(x, y, tone(rp, v, x, y));
    }
    if (sol) { disco(sol[0], sol[1], sol[2] + 2, PR.SOL[1]); disco(sol[0], sol[1], sol[2], PR.SOL[0]); }
    if (o.nubes !== false) nubesR(t, { rampa: tipo === 'dia' ? PR.NUBE : tipo === 'tormenta' ? PR.TORMENTA : PR.NUBE_TARDE, base: tipo === 'tormenta' ? 0.6 : 1.4, y1: hor * 0.55, ...(o.nubes || {}) });
    if (fl) for (let k = 0, x = o.rayos[0], y = 0; y < hor * 0.8; k++) { const nx = x + Math.round((hash2(k, Math.floor(t)) - 0.5) * 8); linea(x, y, nx, y + 8, PR.NUBE[3]); x = nx; y += 8; }
  };
  // colinas: capas de siluetas (de lejos a cerca), con hierba o tierra
  const colinas = (y, o = {}) => {
    const rp = o.rampa ?? PR.HIERBA, amp = o.amp ?? 10, f = o.frec ?? 0.03, sem = o.semilla ?? 1;
    for (let x = 0; x < W; x++) {
      const top = Math.round(y - amp * (0.5 + 0.5 * Math.sin(x * f + sem)) - amp * 0.4 * vnoise(x * 0.08, sem));
      for (let yy = Math.max(0, top); yy < (o.hasta ?? H); yy++) pset(x, yy, tone(rp, (o.luz ?? 2.4) - (yy - top) * 0.05 + (yy === top ? 1 : 0), x, yy));
    }
  };
  // silueta de Roma: templos con frontón, cúpulas, columnas y cipreses (determinista por semilla)
  const skyline = (base, o = {}) => {
    const c = o.color ?? PALA.PURPURA[0], borde = o.borde ?? PALA.PURPURA[1], esc = o.esc ?? 1, sem = o.semilla ?? 7;
    let x = o.x0 ?? -4;
    for (let k = 0; x < (o.x1 ?? W + 4); k++) {
      const tipo = Math.floor(hash2(k, sem) * 5), w = Math.round((10 + 16 * hash2(k, sem + 1)) * esc), h = Math.round((8 + 18 * hash2(k, sem + 2)) * esc);
      if (tipo === 0) { rect(x, base - h, x + w, base, c); poligono([[x - 1, base - h], [x + w / 2, base - h - w * 0.3], [x + w + 1, base - h]], c); }
      else if (tipo === 1) { rect(x, base - h * 0.6, x + w, base, c); disco(x + w / 2, base - h * 0.6, w * 0.45, c); }
      else if (tipo === 2) { for (let i = 0; i < 3; i++) poligono([[x + i * 4, base], [x + i * 4 + 2, base - h * (1.1 + 0.2 * i)], [x + i * 4 + 4, base]], c); }
      else rect(x, base - h * 0.7, x + w, base, c);
      for (let yy = base - h; yy < base; yy += 3) pset(x, yy, borde);
      x += w + Math.round(2 * hash2(k, sem + 3));
    }
  };

  // ── Arquitectura ─────────────────────────────────────────────────────────────────────────────────────────────
  const columna = (cx, suelo, h, o = {}) => {
    const w = o.w ?? 6, rp = o.rampa ?? PALA.MARMOL, top = suelo - h;
    for (let y = top + 3; y < suelo - 2; y++) for (let x = cx - w; x <= cx + w; x++) {
      const u = (x - cx + w) / (2 * w);
      pset(x, y, tone(rp, 3.6 - u * 2.8 + (((x - cx + w) % 3 === 0) ? -0.8 : 0), x, y));
    }
    rect(cx - w - 3, top, cx + w + 3, top + 2, rp[3]); rect(cx - w - 3, top + 3, cx + w + 3, top + 3, rp[1]);
    rect(cx - w - 2, suelo - 3, cx + w + 2, suelo, rp[2]); rect(cx - w - 2, suelo, cx + w + 2, suelo, rp[0]);
    if (o.rota) for (let y = top; y < top + o.rota; y++) for (let x = cx - w - 3; x <= cx + w + 3; x++) pset(x, y, 0);
  };
  const templo = (cx, suelo, w, h, o = {}) => {
    const rp = o.rampa ?? PALA.MARMOL, n = o.n ?? 6, x0 = cx - w / 2, x1 = cx + w / 2;
    for (let k = 0; k < 3; k++) rect(x0 - 3 + k * 2, suelo - (k + 1) * 2, x1 + 3 - k * 2, suelo - k * 2, rp[2 + (k & 1)]);
    const base = suelo - 6, ent = base - h;
    rect(x0 + 2, ent + 4, x1 - 2, base, rp[0]);
    for (let i = 0; i < n; i++) { const x = Math.round(x0 + 3 + i * (w - 6) / (n - 1)); for (let y = ent + 4; y < base; y++) { pset(x - 1, y, rp[3]); pset(x, y, rp[2]); pset(x + 1, y, rp[1]); } }
    rect(x0, ent, x1, ent + 4, rp[3]); rect(x0, ent + 4, x1, ent + 4, rp[1]);
    poligono([[x0 - 1, ent], [cx, ent - w * 0.22], [x1 + 1, ent]], (x, y) => tone(rp, 3.4 - (y - ent + w * 0.22) / (w * 0.22) * 0.8, x, y));
    linea(x0 - 1, ent, cx, ent - w * 0.22, rp[1]); linea(cx, ent - w * 0.22, x1 + 1, ent, rp[1]);
    if (o.color) rect(x0 + 1, ent + 1, x1 - 1, ent + 2, o.color[2]);
  };
  // bloque de pisos (ínsula): paredes de terracota, ventanas, ropa tendida, tejado; o.humo / o.fuego
  const insula = (x0, suelo, w, pisos, t, o = {}) => {
    const rp = o.rampa ?? PALA.TERRACOTA, hp = 11, top = suelo - pisos * hp;
    for (let y = top; y <= suelo; y++) for (let x = x0; x <= x0 + w; x++) pset(x, y, tone(rp, 2.4 - (x - x0) / w * 1.2 + (hash2(x >> 1, y >> 1) - 0.5) * 0.5, x, y));
    for (let p = 0; p < pisos; p++) {
      const y = top + p * hp;
      rect(x0, y, x0 + w, y, rp[0]);
      for (let x = x0 + 4; x < x0 + w - 4; x += 9) {
        const luz = o.noche && hash2(x, p) > 0.5;
        rect(x, y + 3, x + 3, y + 7, luz ? PALA.AMARILLO[2] : PALA.CONTORNO); rect(x, y + 3, x + 3, y + 3, rp[0]);
        if (hash2(x, p + 9) > 0.7 && p < pisos - 1) { linea(x - 2, y + 9, x + 6, y + 9, PALA.MARRON[1]); const cc = [PALA.AZUL, PALA.BLANCO, PALA.AMARILLO, PALA.VERDE][Math.floor(hash2(x, p) * 4)]; rect(x - 1 + Math.round(Math.sin(t * 2 + x)), y + 10, x + 1 + Math.round(Math.sin(t * 2 + x)), y + 12, cc[2]); }
      }
    }
    for (let k = 0; k < 4; k++) rect(x0 - 2 + k, top - 4 + k, x0 + w + 2 - k, top - 4 + k, PALA.TERRACOTA[k & 1 ? 1 : 2]);
    if (o.humo || o.fuego) {
      const fx = x0 + w * 0.6;
      if (o.fuego) for (let k = 0; k < 8; k++) { const hh = 3 + 6 * hash2(k, Math.floor(t * 12)); linea(fx - 4 + k, top - 4, fx - 4 + k, top - 4 - hh * (1 - Math.abs(k - 3.5) / 5), k % 2 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2]); }
      for (let y = 0; y < top - 6; y++) {
        const f = (top - 6 - y) / Math.max(1, top - 6), cx = fx + f * 18 + 3 * Math.sin(y * 0.15 - t * 1.4), r = 2 + f * 7;
        for (let x = Math.round(cx - r); x <= cx + r; x++) if (b4(x, y) < 0.7 - f * 0.5 - Math.abs(x - cx) / r * 0.3) pset(x, y, PR.GRIS[1 + (x + y & 1)]);
      }
    }
  };
  // puesto de comida callejera: toldo a rayas, mostrador, ollas con vapor
  const puesto = (x0, suelo, t) => {
    rect(x0, suelo - 12, x0 + 30, suelo, PALA.MARRON[1]); rect(x0, suelo - 12, x0 + 30, suelo - 11, PALA.MARRON[3]);
    for (let x = x0 - 2; x <= x0 + 32; x++) for (let y = suelo - 28; y <= suelo - 22 + ((x - x0) % 6 < 3 ? 1 : 0); y++) pset(x, y, ((x - x0) >> 2) & 1 ? PALA.ROJO[2] : PALA.BLANCO[2]);
    linea(x0, suelo - 22, x0, suelo - 12, PALA.MARRON[0]); linea(x0 + 30, suelo - 22, x0 + 30, suelo - 12, PALA.MARRON[0]);
    for (const ox of [6, 16, 24]) { disco(x0 + ox, suelo - 14, 3, PALA.TERRACOTA[2]); rect(x0 + ox - 3, suelo - 14, x0 + ox + 3, suelo - 12, PALA.TERRACOTA[1]); for (let k = 0; k < 3; k++) { const y = suelo - 18 - ((t * 8 + k * 4 + ox) % 10); if (b4(x0 + ox, Math.round(y)) < 0.6) pset(x0 + ox + Math.round(Math.sin(y * 0.6 + ox)), Math.round(y), PALA.BLANCO[2]); } }
  };
  const trono = (cx, suelo, o = {}) => {
    const s = o.esc ?? 1, c = o.tela ?? PALA.PURPURA;
    rect(cx - 14 * s, suelo - 40 * s, cx + 14 * s, suelo - 36 * s, PALA.ORO[2]); rect(cx - 12 * s, suelo - 36 * s, cx + 12 * s, suelo - 6 * s, c[2]); rect(cx - 12 * s, suelo - 36 * s, cx - 10 * s, suelo - 6 * s, c[3]);
    rect(cx - 18 * s, suelo - 24 * s, cx - 13 * s, suelo, PALA.ORO[1]); rect(cx + 13 * s, suelo - 24 * s, cx + 18 * s, suelo, PALA.ORO[1]);
    rect(cx - 18 * s, suelo - 24 * s, cx - 13 * s, suelo - 23 * s, PALA.ORO[3]); rect(cx + 13 * s, suelo - 24 * s, cx + 18 * s, suelo - 23 * s, PALA.ORO[3]);
    rect(cx - 13 * s, suelo - 12 * s, cx + 13 * s, suelo - 8 * s, PALA.ORO[2]);
    disco(cx, suelo - 42 * s, 3 * s, PALA.ORO[3]);
  };
  // el salón de mármol del gancho: tres arcos al atardecer, columnas, cortina rasgada, mosaico, estrado y trono
  const SUELO_SALON = 132;
  const salon = (t, o = {}) => {
    const SUELO = SUELO_SALON;
    for (let y = 0; y < SUELO; y++) for (let x = 0; x < W; x++) {
      let l = 0; for (const ax of [80, 160, 240]) l = Math.max(l, 1 - Math.hypot(x - ax, (y - 70) * 0.9) / 120);
      const junta = (y % 16 === 0) || ((x + (Math.floor(y / 16) & 1) * 12) % 24 === 0) ? -0.7 : 0;
      pset(x, y, tone(PALA.MARMOL, 0.6 + 2.0 * l + junta * l, x, y));
    }
    for (const ax of [80, 160, 240]) {
      const w = 22, top = 34, base = SUELO - 22;
      for (let y = top - w; y <= base; y++) for (let x = ax - w; x <= ax + w; x++) {
        if (y < top && Math.hypot(x - ax, y - top) > w) continue;
        pset(x, y, tone(PR.TARDE, 0.3 + (y - (top - w)) / (base - top + w) * 5.4, x, y));
      }
      if (ax === 160) { disco(160, 86, 9, PR.SOL[1]); disco(160, 86, 7, PR.SOL[0]); }
      for (let x = ax - w; x <= ax + w; x++) {
        const h = 6 + 5 * hash2(x >> 2, ax) + (Math.abs(x - ax + 8) < 5 ? 6 - Math.abs(x - ax + 8) : 0);
        for (let y = Math.round(base - h); y <= base; y++) pset(x, y, PALA.PURPURA[0]);
      }
      for (let a = Math.PI; a <= TAU; a += 0.02) { pset(Math.round(ax + Math.cos(a) * (w + 1)), Math.round(top + Math.sin(a) * (w + 1)), PALA.MARMOL[1]); pset(Math.round(ax + Math.cos(a) * (w + 2)), Math.round(top + Math.sin(a) * (w + 2)), PALA.MARMOL[0]); }
      rect(ax - w - 2, base, ax + w + 2, base + 2, PALA.MARMOL[1]);
    }
    for (const cx of [40, 120, 200, 280]) columna(cx, SUELO, SUELO - 4);
    rect(0, 0, W, 3, PALA.MARMOL[0]);
    if (o.cortina !== false) for (let y = 9; y < 96; y++) {
      const ancho = 16 - y * 0.08 + 2 * Math.sin(y * 0.2 + t * 1.2), x0 = 46;
      for (let x = x0; x < x0 + ancho; x++) {
        if (y > 80 && hash2(x, 7) * 16 < y - 80) continue;
        pset(x, y, tone(PALA.PURPURA, 2.6 - ((x - x0) % 6) * 0.35 + (x - x0 < 1 ? 1 : 0), x, y));
      }
    }
    mosaico(SUELO);
    for (let y = SUELO; y < H; y++) for (let x = 120; x < 200; x++) if (b4(x, y) < 0.25 - Math.abs(x - 160 - (y - SUELO) * 0.4) / 200) pset(x, y, PALA.AMARILLO[3]);
    rect(70, SUELO - 4, 150, SUELO + 6, PALA.MARMOL[2]); rect(70, SUELO - 5, 150, SUELO - 4, PALA.MARMOL[3]); rect(70, SUELO + 6, 150, SUELO + 7, PALA.MARMOL[0]);
    if (o.trono !== false) trono(106, SUELO - 4, { esc: 0.95 });
    if (o.estatua !== false) {
      poligono([[236, SUELO + 6], [276, SUELO + 2], [278, SUELO + 7], [238, SUELO + 11]], (x, y) => tone(PALA.MARMOL, 3 - (y - SUELO - 2) / 4, x, y));
      disco(282, SUELO + 3, 4, PALA.MARMOL[3]); pset(283, SUELO + 2, PALA.MARMOL[1]);
      poligono([[226, SUELO + 2], [236, SUELO + 2], [236, SUELO + 9], [226, SUELO + 9]], PALA.MARMOL[1]);
    }
  };
  // suelo de mosaico en damero que se aleja (desde y0 hasta abajo)
  const mosaico = (y0, o = {}) => {
    const a = o.a ?? PALA.TERRACOTA, b = o.b ?? PALA.MARMOL;
    for (let y = y0; y < H; y++) {
      const z = 0.35 + 0.65 * (y - y0) / (H - y0);
      for (let x = 0; x < W; x++) {
        const u = (x - 160) / (z * 30), v = 2.2 / z;
        const casilla = (Math.floor(u) + Math.floor(v)) & 1;
        const junta = (u - Math.floor(u)) * z * 30 < 1 || (v - Math.floor(v)) < 0.05 / z;
        pset(x, y, junta ? b[0] : tone(casilla ? a : b, 1.6 + z, x, y));
      }
    }
  };
  // suelo de tierra o empedrado plano (y0 → abajo)
  const suelo = (y0, rp = PR.TIERRA, o = {}) => {
    for (let y = y0; y < H; y++) for (let x = 0; x < W; x++) {
      let v = (o.luz ?? 2.2) + (y - y0) * 0.02 + (hash2(x >> 1, y >> 1) - 0.5) * 0.7;
      if (o.losas) { const fila = Math.floor((y - y0) / 6), bx = Math.floor((x + (fila & 1) * 7) / 14); if ((y - y0) % 6 === 0 || (x + (fila & 1) * 7) % 14 === 0) v -= 1.2; else v += (hash2(bx, fila) - 0.5) * 0.6; }
      pset(x, y, tone(rp, v, x, y));
    }
  };
  // acueducto de x0 a x1: arcos con la base en «base» y el canal arriba en «top»; p = cuánto se ha construido
  const acueducto = (x0, x1, base, top, t, o = {}) => {
    const p = o.p ?? 1, rp = o.rampa ?? PALA.TERRACOTA, xf = lerp(x0, x1, p), luz = o.vano ?? 16;
    for (let y = top; y <= base; y++) for (let x = x0; x <= xf; x++) {
      const k = Math.floor((x - x0) / luz), cx = x0 + k * luz + luz / 2, ry = (base - top) * 0.62;
      const hueco = Math.abs(x - cx) < luz / 2 - 3 && (y > base - ry || Math.hypot((x - cx) / (luz / 2 - 3), (y - (base - ry)) / ((luz / 2 - 3) * 0.9)) < 1) && y > top + 7;
      if (hueco) continue;
      pset(x, y, tone(rp, 2.6 - ((x - x0) % luz) / luz * 1.2 + ((y - top) % 5 === 0 ? -0.6 : 0), x, y));
    }
    rect(x0, top - 2, xf, top, rp[3]);
    for (let x = x0; x <= xf; x++) if (((x + Math.floor(t * 18)) % 6) < 3) pset(x, top - 1, PR.AGUA[(x + Math.floor(t * 18)) % 6 === 0 ? 4 : 3]);
  };
  // el Panteón por dentro: cúpula de casetones, el óculo y el rayo de sol que se mueve por el suelo
  const panteon = (t, o = {}) => {
    const cx = 160, cy = 120, r = 118;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const d = Math.hypot(x - cx, (y - cy) * 1.05);
      let v = 0.8 + 1.4 * (1 - d / r);
      if (y < cy && d < r) { const ang = Math.atan2(y - cy, x - cx), anillo = Math.floor(d / 14), casetón = Math.floor(ang * 18 / Math.PI); if ((d % 14 < 2) || ((ang * 18 / Math.PI) % 1 < 0.12)) v -= 0.8; else v += ((anillo + casetón) & 1) * 0.2; }
      if (y >= cy) v = 1.4 + (y - cy) * 0.03;
      pset(x, y, tone(PALA.MARMOL, v, x, y));
    }
    disco(cx, cy - r + 4, 7, PR.DIA[3]);
    const lx = cx + 40 * Math.sin(t * 0.25 + (o.fase ?? 0));
    for (let y = cy - r + 8; y < H; y++) {
      const f = (y - (cy - r + 8)) / (H - (cy - r + 8)), x0 = lerp(cx - 6, lx - 14, f), x1 = lerp(cx + 6, lx + 14, f);
      for (let x = Math.round(x0); x <= x1; x++) if (b4(x, y) < 0.35 + (y > cy ? 0.3 : 0)) pset(x, y, PALA.AMARILLO[3]);
    }
    for (let k = 0; k < 8; k++) { const x = 20 + k * 40; columna(x, cy + 30, 34, { w: 4 }); }
  };
  // muralla con almenas; o.puerta = [x, ancho, abierta 0–1]
  const muralla = (x0, x1, suelo_, h, o = {}) => {
    const rp = o.rampa ?? PR.ROCA, top = suelo_ - h;
    for (let y = top; y <= suelo_; y++) for (let x = x0; x <= x1; x++) {
      const fila = Math.floor(y / 5), junta = y % 5 === 0 || (x + (fila & 1) * 4) % 8 === 0;
      pset(x, y, tone(rp, (o.luz ?? 2.2) + (junta ? -1 : 0) + (hash2(x >> 2, fila) - 0.5) * 0.4, x, y));
    }
    for (let x = x0; x <= x1; x += 8) rect(x, top - 4, x + 4, top, rp[2]);
    if (o.puerta) {
      const [px, pw, ab] = o.puerta;
      for (let y = suelo_ - h * 0.7; y <= suelo_; y++) for (let x = px - pw / 2; x <= px + pw / 2; x++) if (y > suelo_ - h * 0.7 + pw / 2 || Math.hypot(x - px, y - (suelo_ - h * 0.7 + pw / 2)) < pw / 2) pset(x, y, o.dentro ? o.dentro(x, y) : PALA.CONTORNO);
      const hoja = Math.round(pw / 2 * (1 - ab));
      if (hoja > 0) { rect(px - pw / 2, suelo_ - h * 0.55, px - pw / 2 + hoja, suelo_, PR.MADERA[2]); rect(px + pw / 2 - hoja, suelo_ - h * 0.55, px + pw / 2, suelo_, PR.MADERA[1]); }
    }
  };
  const empalizada = (x0, x1, suelo_, h, o = {}) => {
    for (let x = x0; x <= x1; x += 3) { const hh = h + Math.round(2 * hash2(x, 1)); rect(x, suelo_ - hh, x + 2, suelo_, PR.MADERA[1 + (x & 1)]); pset(x + 1, suelo_ - hh - 1, PR.MADERA[3]); }
    rect(x0, suelo_ - h * 0.7, x1, suelo_ - h * 0.7 + 1, PR.MADERA[0]);
    if (o.puerta) { const [px, pw, ab] = o.puerta; rect(px - pw / 2, suelo_ - h, px + pw / 2, suelo_, o.fondoPuerta ?? PR.HIERBA[2]); const hoja = Math.round(pw / 2 * (1 - ab)); rect(px - pw / 2, suelo_ - h, px - pw / 2 + hoja, suelo_, PR.MADERA[2]); rect(px + pw / 2 - hoja, suelo_ - h, px + pw / 2, suelo_, PR.MADERA[1]); }
  };
  const cabana = (cx, suelo_, s = 1, t = 0, o = {}) => {
    const w = 12 * s, h = 9 * s;
    rect(cx - w, suelo_ - h, cx + w, suelo_, PR.MADERA[2]); for (let x = cx - w; x <= cx + w; x += 3) linea(x, suelo_ - h, x, suelo_, PR.MADERA[1]);
    rect(cx - 2 * s, suelo_ - 6 * s, cx + 2 * s, suelo_, PALA.CONTORNO);
    poligono([[cx - w - 3 * s, suelo_ - h + 1], [cx, suelo_ - h - 12 * s], [cx + w + 3 * s, suelo_ - h + 1]], (x, y) => tone(PR.PAJA, 3 - (x - cx + w) / (2 * w) * 1.6 + ((x + y) % 4 === 0 ? -0.8 : 0), x, y));
    if (o.humo) for (let y = 0; y < 14; y++) { const yy = suelo_ - h - 12 * s - y; const x = cx + Math.round(Math.sin(yy * 0.4 + t * 2) * 2); if (b4(x, yy) < 0.6 - y / 30) pset(x, yy, PR.GRIS[3]); }
  };

  // ── Seres (animales) con el mismo acabado que los personajes: contorno oscuro y luz por la izquierda ─────────────
  // bicho(cx, suelo, dir, prims): prims = ['e', x, y, rx, ry, rampa, nivel] | ['l', x0, y0, x1, y1, grosor, rampa, nivel]
  //   | ['d', x, y, color] (píxel encima de todo: ojos). Coordenadas con y negativa hacia arriba desde el suelo.
  const bicho = (cx, suelo_, dir, prims, o = {}) => {
    const S = o.r ?? 44, W2 = S * 2 + 6, H2 = S * 2 + 6, ox = S + 3, oy = S * 2 + 2;
    const col = new Uint8Array(W2 * H2), ramp = new Array(W2 * H2), lvl = new Float32Array(W2 * H2), out = new Uint32Array(W2 * H2);
    const put = (x, y, rp, v) => { const X = Math.round(ox + x * dir), Y = Math.round(oy + y); if (X < 0 || X >= W2 || Y < 0 || Y >= H2) return; const k = Y * W2 + X; col[k] = 1; ramp[k] = rp; lvl[k] = v; };
    for (const p of prims) {
      if (p[0] === 'e') { const [, x0, y0, rx, ry, rp, v] = p; for (let y = -ry; y <= ry; y += 0.5) for (let x = -rx; x <= rx; x += 0.5) if ((x / rx) ** 2 + (y / ry) ** 2 <= 1) put(x0 + x, y0 + y, rp, v ?? 1.6); }
      else if (p[0] === 'l') { const [, x0, y0, x1, y1, g, rp, v] = p; const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2)); for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let a = -g / 2; a <= g / 2; a += 0.5) for (let b = -g / 2; b <= g / 2; b += 0.5) put(x + a, y + b, rp, v ?? 1.6); } }
    }
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) {
      const k = y * W2 + x; if (!col[k]) continue;
      const rp = ramp[k];
      const izq = x > 0 && col[k - 1] && ramp[k - 1] === rp, arr = y > 0 && col[k - W2] && ramp[k - W2] === rp, der = x < W2 - 1 && col[k + 1] && ramp[k + 1] === rp, aba = y < H2 - 1 && col[k + W2] && ramp[k + W2] === rp;
      let v = Math.round(lvl[k]); if (!izq || !arr) v += 1; else if (!der || !aba) v -= 1;
      out[k] = rp[clamp(v, 0, rp.length - 1)];
    }
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) { const k = y * W2 + x; if (col[k]) continue; if ((x > 0 && col[k - 1]) || (x < W2 - 1 && col[k + 1]) || (y > 0 && col[k - W2]) || (y < H2 - 1 && col[k + W2])) out[k] = CONTORNO; }
    for (const p of prims) if (p[0] === 'd') { const X = Math.round(ox + p[1] * dir), Y = Math.round(oy + p[2]); if (X >= 0 && X < W2 && Y >= 0 && Y < H2) out[Y * W2 + X] = p[3]; }
    const X0 = Math.round(cx - ox), Y0 = Math.round(suelo_ - oy);
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) { const c = out[y * W2 + x]; if (c) pset(X0 + x, Y0 + y, c); }
  };
  const patas = (xs, y0, largo, g, rp, anda, t) => xs.map((x, i) => { const a = anda ? Math.sin(t * 8 + i * Math.PI * (i < 2 ? 1 : 0) + (i & 1) * Math.PI) * largo * 0.35 : 0; return ['l', x, y0, x + a, 0 - 1, g, rp, 1.3]; });
  const loba = (cx, suelo_, t, o = {}) => {
    const s = o.esc ?? 1, rp = o.rampa ?? PR.GRIS, d = o.dir ?? 1, cab = o.cabeza ?? 0;
    bicho(cx, suelo_, d, [
      ['l', -9 * s, -9 * s, -15 * s, -4 * s + Math.sin(t * 3) * s, 2.5 * s, rp, 1.4],
      ...patas([-7 * s, -5 * s, 5 * s, 7 * s], -6 * s, 6 * s, 2.2 * s, rp, o.anda, t),
      ['e', 0, -9 * s, 10 * s, 4.5 * s, rp, 1.8],
      ['e', 9 * s, (-12 + cab) * s, 4 * s, 3.5 * s, rp, 2],
      ['e', 13 * s, (-10.5 + cab) * s, 2.5 * s, 1.6 * s, rp, 2],
      ['l', 8 * s, (-15 + cab) * s, 9 * s, (-18 + cab) * s, 1.6 * s, rp, 1.6],
      ['d', 10 * s, (-13 + cab) * s, PALA.AMARILLO[3]], ['d', 15 * s, (-11 + cab) * s, CONTORNO],
    ], { r: Math.ceil(20 * s) });
  };
  const perro = (cx, suelo_, t, o = {}) => {
    const s = o.esc ?? 0.6;
    if (o.duerme) return bicho(cx, suelo_, o.dir ?? 1, [['e', 0, -3 * s, 9 * s, 3.5 * s + (Math.sin(t * 2) > 0 ? 0.5 : 0), PALA.MARRON, 2], ['e', 7 * s, -3 * s, 3 * s, 2.5 * s, PALA.MARRON, 2.2], ['d', 8 * s, -3 * s, CONTORNO]], { r: 12 });
    loba(cx, suelo_, t, { ...o, esc: s, rampa: PALA.MARRON });
  };
  const oveja = (cx, suelo_, t, o = {}) => {
    const d = o.dir ?? 1, come = Math.sin(t * 1.3 + cx) > 0.3 ? 2 : 0;
    bicho(cx, suelo_, d, [...patas([-3, -1, 2, 4], -3, 3, 1.4, PR.GRIS, false, t), ['e', 0, -5, 5.5, 3.2, PR.LANA, 2], ['e', 5, -6 + come, 2, 1.8, PR.GRIS, 1.4], ['d', 6, -6 + come, CONTORNO]], { r: 10 });
  };
  const elefante = (cx, suelo_, t, o = {}) => {
    const s = o.esc ?? 1, rp = PR.ELEFANTE, d = o.dir ?? 1, tr = Math.sin(t * 2.4) * 2 * s;
    bicho(cx, suelo_, d, [
      ['l', -12 * s, -16 * s, -15 * s, -8 * s, 1.5 * s, rp, 1.2],
      ...patas([-9 * s, -5 * s, 5 * s, 9 * s], -8 * s, 8 * s, 5 * s, rp, o.anda, t * 0.6),
      ['e', 0, -16 * s, 13 * s, 9 * s, rp, 1.8],
      ['e', 12 * s, -19 * s, 6 * s, 6 * s, rp, 2],
      ['l', 16 * s, -17 * s, 19 * s + tr * 0.3, -9 * s, 3.2 * s, rp, 1.8], ['l', 19 * s + tr * 0.3, -9 * s, 20 * s + tr, -3 * s, 2.6 * s, rp, 1.8],
      ['e', 8 * s, -18 * s, 4 * s, 5.5 * s, rp, 1],
      ['l', 15 * s, -14 * s, 19 * s, -12 * s, 1.4 * s, PALA.BLANCO, 2.5],
      ...(o.manta ? [['e', -1 * s, -21 * s, 8 * s, 3 * s, o.manta, 2]] : []),
      ['d', 13 * s, -21 * s, CONTORNO],
    ], { r: Math.ceil(26 * s) });
  };
  const caballo = (cx, suelo_, t, o = {}) => {
    const s = o.esc ?? 1, rp = o.rampa ?? PALA.MARRON, d = o.dir ?? 1;
    bicho(cx, suelo_, d, [
      ['l', -10 * s, -15 * s, -13 * s, -7 * s, 2 * s, PALA.NEGRO, 1.2],
      ...patas([-7 * s, -5 * s, 6 * s, 8 * s], -10 * s, 10 * s, 2.2 * s, rp, o.anda, t),
      ['e', 0, -14 * s, 10 * s, 5 * s, rp, 1.8],
      ['l', 8 * s, -16 * s, 12 * s, -24 * s, 4 * s, rp, 1.8], ['e', 14 * s, -23 * s, 4 * s, 2.5 * s, rp, 2],
      ['l', 9 * s, -19 * s, 11 * s, -26 * s, 1.5 * s, PALA.NEGRO, 1],
      ['d', 14 * s, -24 * s, CONTORNO],
    ], { r: Math.ceil(30 * s) });
  };
  const cesta = (cx, suelo_, t) => {
    bicho(cx, suelo_, 1, [['e', -2, -6, 3, 2.5, PALA.PIEL, 2.2], ['e', 3, -6, 3, 2.5, PALA.PIEL, 2.2], ['e', 0, -3, 9, 3.5, PR.PAJA, 1.8], ['d', -1, -6, CONTORNO], ['d', 4, -6, CONTORNO], ['d', 0, -4 - (Math.sin(t * 5) > 0.5 ? 1 : 0), PR.PAJA[0]]], { r: 12 });
  };
  // trirreme: casco con espolón, remos que bogan y vela cuadrada (dir 1 → derecha)
  const trirreme = (cx, y, t, o = {}) => {
    const s = o.esc ?? 1, d = o.dir ?? 1, vela = o.vela ?? PALA.ROJO, bob = Math.round(Math.sin(t * 2 + cx) * 1);
    const X = (u) => cx + u * s * d, Y = (v) => y + v * s + bob;
    for (let k = 0; k < 9; k++) { const u = -20 + k * 5, a = Math.sin(t * 5 + k * 0.3) * 3; linea(X(u), Y(-2), X(u - 3 + a), Y(5), PR.MADERA[1]); }
    poligono([[X(-26), Y(-8)], [X(24), Y(-6)], [X(30), Y(-1)], [X(24), Y(0)], [X(20), Y(2)], [X(-20), Y(2)], [X(-28), Y(-12)]], (x, yy) => tone(PR.MADERA, 2.6 - (yy - Y(-8)) * 0.3, x, yy));
    linea(X(-24), Y(-4), X(22), Y(-3), PALA.ORO[2]);
    pset(X(22), Y(-4), PALA.BLANCO[3]); pset(X(23), Y(-4), CONTORNO);
    linea(X(0), Y(-8), X(0), Y(-34), PR.MADERA[0]);
    for (let v = -32; v <= -12; v += 0.5 / s) for (let u = -11; u <= 11; u += 0.5 / s) { const b = Math.sin(t * 1.5) * 0.5 * (v + 32) / 20; pset(Math.round(X(u + b)), Math.round(Y(v)), tone(vela, 2.6 - u * d * 0.05 + (Math.abs(u) > 9 ? -0.6 : 0), Math.round(X(u)), Math.round(Y(v)))); }
    linea(X(-12), Y(-32), X(12), Y(-32), PR.MADERA[1]);
    if (o.carga) for (let k = 0; k < 3; k++) disco(X(-12 + k * 6), Y(-10), 2, PALA.ORO[2 + (k & 1)]);
  };

  // ── El mapa del Mediterráneo (proyección lon/lat simple), con el imperio y las zonas encima ──────────────────────
  // o.vista = [lon0, lon1, lat0, lat1] encuadra el mapa (por defecto, del Atlántico a Mesopotamia): interpolando la
  // vista entre dos encuadres se hace zoom (el Mediterráneo → Italia → el Tíber).
  const VISTA = [LON0, LON1, LAT0, LAT1];
  const mapas = new Map();
  const proyMapa = (lon, lat, rc = [0, 0, W - 1, H - 1], v = VISTA) => [rc[0] + (lon - v[0]) / (v[1] - v[0]) * (rc[2] - rc[0]), rc[1] + (v[3] - lat) / (v[3] - v[2]) * (rc[3] - rc[1])];
  const lonlat = (x, y, rc, v = VISTA) => [v[0] + (x - rc[0]) / (rc[2] - rc[0]) * (v[1] - v[0]), v[3] - (y - rc[1]) / (rc[3] - rc[1]) * (v[3] - v[2])];
  const baseMapa = (rc, v) => {
    const k = rc.join(',') + '|' + v.map((q) => q.toFixed(3)).join(',');
    if (mapas.has(k)) return mapas.get(k);
    if (mapas.size > 6) mapas.clear();
    const tierra = new Uint8Array(W * H), imp = new Uint8Array(W * H), ita = new Uint8Array(W * H), car = new Uint8Array(W * H), dist = new Float32Array(W * H), lon = new Float32Array(W * H), lat = new Float32Array(W * H);
    const cajas = (G) => Object.values(G).map((P) => [P, Math.min(...P.map((q) => q[0])), Math.max(...P.map((q) => q[0])), Math.min(...P.map((q) => q[1])), Math.max(...P.map((q) => q[1]))]);
    const mares = cajas(MAR), islas = cajas(ISLAS);
    const en = (L, a, b) => L.some(([P, x0, x1, y0, y1]) => a >= x0 && a <= x1 && b >= y0 && b <= y1 && dentroPol(a, b, P));
    for (let y = rc[1]; y <= rc[3]; y++) for (let x = rc[0]; x <= rc[2]; x++) {
      const [a0, b0] = lonlat(x + 0.5, y + 0.5, rc, v), i = y * W + x;
      // la costa se ondula un poco con ruido, para que no se vean los segmentos rectos al hacer zoom
      const k = (v[1] - v[0]) / 62, fq = 1 / k;   // el ruido escala con el encuadre: en el Egeo, la costa no se deforma
      const a = a0 + ((vnoise(a0 * 2.2 * fq, b0 * 2.2 * fq) - 0.5) * 0.3 + (vnoise(a0 * 7 * fq, b0 * 7 * fq + 5) - 0.5) * 0.1) * k;
      const b = b0 + ((vnoise(a0 * 2.2 * fq + 9, b0 * 2.2 * fq) - 0.5) * 0.3 + (vnoise(a0 * 7 * fq + 3, b0 * 7 * fq) - 0.5) * 0.1) * k;
      const t = !en(mares, a, b) || en(islas, a, b);
      tierra[i] = t ? 1 : 0;
      imp[i] = t && dentroPol(a, b, ZONAS.imperio) ? 1 : 0;
      ita[i] = t && dentroPol(a, b, ZONAS.italia) ? 1 : 0;
      car[i] = t && dentroPol(a, b, ZONAS.cartago) ? 1 : 0;
      dist[i] = Math.hypot(a0 - LUGARES.roma[0], (b0 - LUGARES.roma[1]) * 1.3);
      lon[i] = a0; lat[i] = b0;
    }
    const m = { tierra, imp, ita, car, dist, lon, lat };
    mapas.set(k, m);
    return m;
  };
  // ¿está el píxel i dentro del polígono pol? (se calcula una vez por encuadre y polígono)
  const zonaEn = (M, pol, i) => {
    M.z ??= new Map();
    if (!M.z.has(pol)) { const m = new Uint8Array(W * H); for (let k = 0; k < W * H; k++) if (M.tierra[k] && M.lon[k]) m[k] = dentroPol(M.lon[k], M.lat[k], pol) ? 1 : 0; M.z.set(pol, m); }
    return M.z.get(pol)[i];
  };
  // El Tíber (de los Apeninos a Ostia, pasando por Roma)
  const TIBER = [[12.1, 43.9], [12.35, 43.4], [12.4, 43.0], [12.6, 42.6], [12.55, 42.2], [12.48, 41.9], [12.36, 41.8], [12.25, 41.73]];
  // mapa(t, o): o.rc = rectángulo; o.vista = encuadre; o.imperio = 0–1 (crece desde Roma); o.italia, o.cartago = 0–1
  // (zonas tempranas); o.colorImperio; o.oeste / o.este = oscurecer (0–1) a un lado de o.corte (lon); o.manchas = 0–1
  // (epidemias); o.grietas = 0–1 (la frontera se rompe); o.luzMar / o.luzItalia = 0–1 (resaltar el mar o la bota);
  // o.tiber = 0–1 (el río se dibuja desde la fuente); o.colinas = 0–1 (las siete colinas junto a Roma).
  const mapa = (t, o = {}) => {
    const rc = o.rc ?? [0, 0, W - 1, H - 1], v = o.vista ?? VISTA, M = baseMapa(rc, v), ci = o.colorImperio ?? PALA.PURPURA;
    const pImp = o.imperio ?? 0, maxD = 42, ppg = (rc[2] - rc[0]) / (v[1] - v[0]);   // píxeles por grado
    const [cx0, cy0] = proyMapa(...LUGARES.cartago, rc, v);
    for (let y = rc[1]; y <= rc[3]; y++) for (let x = rc[0]; x <= rc[2]; x++) {
      const i = y * W + x;
      let c;
      if (!M.tierra[i]) {
        const ola = Math.sin(x * 0.3 + y * 0.9 - t * 1.6) * Math.sin(x * 0.07 + t * 0.4) > 0.8;
        c = tone(PR.MAR, 2.2 + (ola ? 1 : 0) + 0.4 * vnoise(x * 0.05, y * 0.05) + (o.luzMar ?? 0) * 1.4, x, y);
        const costa = (x > 0 && M.tierra[i - 1]) || (x < W - 1 && M.tierra[i + 1]) || (y > 0 && M.tierra[i - W]) || (y < H - 1 && M.tierra[i + W]);
        if (costa) c = PR.MAR[4];
      } else {
        const vv = 2.3 + 0.9 * (vnoise(M.lon[i] * 0.35, M.lat[i] * 0.35) - 0.5) + 0.4 * (hash2(x >> 1, y >> 1) - 0.5);
        const norte = M.lat[i] > 43.5;   // bosques solo al norte; el sur, ocre
        const bosque = vnoise(M.lon[i] * 0.9 + 9, M.lat[i] * 0.9) + 0.25 * vnoise(M.lon[i] * 3, M.lat[i] * 3) + (norte ? 0.12 : -0.2);
        c = (bosque > 0.68 + 0.12 * b4(x, y) ? tone(PR.HIERBA, vv, x, y) : tone(PR.TIERRA, vv, x, y));
        if (o.luzItalia && M.ita[i]) c = tone(PR.TIERRA, vv + 1.6 * o.luzItalia, x, y);
        const frente = M.dist[i] / maxD;
        let enImp = M.imp[i] && frente < pImp - 0.04 * b4(x, y);
        if (o.italia && M.ita[i] && M.dist[i] < o.italia * 9 + 1 * b4(x, y)) enImp = true;
        if (enImp) c = tone(ci, 2.1 + 0.6 * (vnoise(x * 0.08, y * 0.08) - 0.5), x, y);
        if (o.cartago && M.car[i] && Math.hypot(x - cx0, y - cy0) < o.cartago * 70 * ppg / 5.16 + 3 * b4(x, y)) c = tone(PALA.AMARILLO, 1.8, x, y);
        if (o.zonas) for (const z of o.zonas) {
          const dentro = zonaEn(M, z.pol, i);
          if (!dentro) continue;
          const d = z.centro ? Math.hypot(M.lon[i] - z.centro[0], (M.lat[i] - z.centro[1]) * 1.3) / (z.radio ?? 40) : 0;
          if ((z.p ?? 1) >= 1 || d < (z.p ?? 1) - 0.03 * b4(x, y)) c = tone(z.color, (z.luz ?? 2.1) + 0.6 * (vnoise(x * 0.08, y * 0.08) - 0.5), x, y);
        }
        if (o.manchas && M.imp[i] && vnoise(x * 0.09 + 3, y * 0.09) < o.manchas * 0.6 - 0.05 + 0.1 * b4(x, y)) c = tone(PALA.NEGRO, 1.4, x, y);
        const borde = M.imp[i] && ((x > 0 && M.tierra[i - 1] && !M.imp[i - 1]) || (x < W - 1 && M.tierra[i + 1] && !M.imp[i + 1]) || (y > 0 && M.tierra[i - W] && !M.imp[i - W]) || (y < H - 1 && M.tierra[i + W] && !M.imp[i + W]));
        if (borde && pImp > 0.99) c = o.grietas && hash2(x >> 1, y >> 1) < o.grietas ? PALA.ROJO[2] : ci[0];
        const costa = (x > 0 && !M.tierra[i - 1]) || (x < W - 1 && !M.tierra[i + 1]) || (y > 0 && !M.tierra[i - W]) || (y < H - 1 && !M.tierra[i + W]);
        if (costa) c = o.luzItalia && M.ita[i] ? PALA.AMARILLO[3] : PR.TIERRA[0];
      }
      let osc = 0;
      if (o.oeste && M.lon[i] < (o.corte ?? 19)) osc = o.oeste; if (o.este && M.lon[i] >= (o.corte ?? 19)) osc = o.este;
      if (osc && b4(x, y) < osc) c = (x + y) & 1 ? PALA.CONTORNO : PR.MAR[0];
      pset(x, y, c);
    }
    if (o.tiber) {
      const pts = TIBER.map(([a, b]) => proyMapa(a, b, rc, v)), g = Math.max(1, Math.round(ppg / 40));
      ruta(pts, o.tiber, PR.AGUA[3], { flecha: false, continua: true, grueso: g });
    }
    if (o.colinas) {
      const [rx, ry] = proyMapa(...LUGARES.roma, rc, v), s = ppg / 160;
      [[0.15, -0.05], [-0.05, -0.12], [0.1, 0.12], [-0.15, 0.05], [0.25, 0.08], [0.02, 0.24], [-0.12, -0.25]].forEach(([dx, dy], k) => {
        if (o.colinas * 7 < k + 0.5) return;
        const hx = rx + dx * ppg * 0.6 + 6 * s, hy = ry - dy * ppg * 0.6;
        for (let j = 0; j < 6 * s; j++) { const w = Math.round((6 * s - j) * 1.3); R.rect(Math.round(hx - w), Math.round(hy - j), Math.round(hx + w), Math.round(hy - j), tone(PR.HIERBA, 1.4 + j / (6 * s) * 2, Math.round(hx), Math.round(hy - j))); }
      });
    }
    if (o.marco !== false) { rect(rc[0], rc[1], rc[2], rc[1], PALA.MARRON[0]); rect(rc[0], rc[3], rc[2], rc[3], PALA.MARRON[0]); rect(rc[0], rc[1], rc[0], rc[3], PALA.MARRON[0]); rect(rc[2], rc[1], rc[2], rc[3], PALA.MARRON[0]); }
  };
  const lugar = (nombre, rc, v) => proyMapa(...(Array.isArray(nombre) ? nombre : LUGARES[nombre]), rc, v).map(Math.round);
  // encuadres con nombre para el zoom
  const VISTAS = { mundo: VISTA, italia: [5, 20.5, 36.2, 47.2], roma: [11.2, 13.8, 41.2, 43.0], egeo: [18.6, 32.8, 34.4, 42.4], grecia: [21.0, 25.4, 36.6, 39.1], salamina: [23.2, 23.9, 37.75, 38.15], persia: [-6, 80, 10.5, 58.8], irlanda: [-11.5, 0.5, 51.3, 58.0], atlantico: [-82, 12, 18, 70.8], egipto: [20, 42, 16.5, 36.5], nilo: [26.5, 37.5, 21.5, 32.6] };
  const entre = (a, b, p) => a.map((q, i) => q + (b[i] - q) * p);
  // punto que late sobre el mapa (una ciudad), con su color
  const punto = (x, y, t, c = PALA.ORO, r = 2) => { const l = Math.sin(t * 5) > 0 ? 1 : 0; disco(x, y, r + l, CONTORNO); disco(x, y, r - 1 + l, c[3]); pset(x, y, c[2]); };
  // ruta punteada que se dibuja (p 0–1) a lo largo de una lista de puntos [x, y]
  const ruta = (pts, p, c = PALA.ROJO[3], o = { grueso: true }) => {
    const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let quedan = tot * p;
    for (let i = 1; i < pts.length && quedan > 0; i++) {
      const f = Math.min(1, quedan / L[i - 1]), [ax, ay] = pts[i - 1], bx = ax + (pts[i][0] - ax) * f, by = ay + (pts[i][1] - ay) * f;
      const n = Math.ceil(L[i - 1] * f);
      for (let k = 0; k <= n; k++) { const x = Math.round(ax + (bx - ax) * k / Math.max(1, n)), y = Math.round(ay + (by - ay) * k / Math.max(1, n)); if (o.continua || ((x + y) >> 1) % 2 === 0) { const g = o.grueso === true ? 2 : (o.grueso || 1); for (let gx = 0; gx < g; gx++) for (let gy = 0; gy < g; gy++) { if (!o.continua) pset(x + gx, y + gy + 1, CONTORNO); pset(x + gx, y + gy, c); } } }
      quedan -= L[i - 1];
      if (quedan <= 0 && o.flecha !== false) { const a = Math.atan2(by - ay, bx - ax); for (const s of [-1, 1]) linea(Math.round(bx), Math.round(by), Math.round(bx - 4 * Math.cos(a + s * 0.6)), Math.round(by - 4 * Math.sin(a + s * 0.6)), c); }
    }
  };

  // ── La barra de tiempo: reyes (753–509 a. C.), república (509–27 a. C.) e imperio (27 a. C.–476), con un marcador.
  // barraTiempo(t, año, o): año negativo = antes de Cristo. o.x0, o.x1, o.y, o.alto; o.encendidos (0–3, cuántos tramos
  // se ven, para presentarla); o.iconos (true: corona, dos personas y laurel encima de cada tramo, a escala o.esc).
  const TRAMOS = [[-753, -509, PALA.ORO, 'corona'], [-509, -27, PALA.ROJO, 'persona'], [-27, 476, PALA.PURPURA, 'laurel']];
  let TRAMOS_ACT = null;
  const tramosTiempo = (tr) => { TRAMOS_ACT = tr; };   // cambia los tramos por defecto (cada episodio los suyos)
  const barraTiempo = (t, año, o = {}) => {
    const x0 = o.x0 ?? 40, x1 = o.x1 ?? 280, y = o.y ?? 8, alto = o.alto ?? 3, enc = o.encendidos ?? 3, esc = o.esc ?? 1;
    const tr = o.tramos ?? TRAMOS_ACT ?? TRAMOS, a0 = tr[0][0], a1 = tr[tr.length - 1][1];
    const X = (a) => Math.round(x0 + (a - a0) / (a1 - a0) * (x1 - x0));
    rect(x0 - 1, y - 1, x1 + 1, y + alto, CONTORNO);
    tr.forEach(([a, b, rp, ic], i) => {
      const on = enc > i, p = clamp(enc - i, 0, 1);
      for (let x = X(a); x <= X(a) + (X(b) - X(a)) * p; x++) for (let j = 0; j < alto; j++) pset(x, y + j, on ? tone(rp, 2.6 - j / alto * 1.2 + (j === 0 ? 1 : 0), x, y + j) : PALA.NEGRO[1]);
      if (o.iconos && on) { const cx = (X(a) + X(b)) / 2, w = R.ICONOS[ic][0].length * esc; R.icono(ic, Math.round(cx - w / 2 - (ic === 'persona' ? w * 0.6 : 0)), y - 9 * esc, rp[3], CONTORNO, esc); if (ic === 'persona') R.icono(ic, Math.round(cx + w * 0.1), y - 9 * esc, rp[3], CONTORNO, esc); }
      rect(X(a), y - 1, X(a), y + alto, CONTORNO);
    });
    if (o.cero !== false && a0 < 0 && a1 > 0) { rect(X(0), y + alto, X(0), y + alto + 2, PALA.BLANCO[3]); }
    if (año != null) {
      const mx = X(clamp(año, a0, a1)), parp = Math.sin(t * 6) > -0.3;
      if (parp) { pset(mx, y + alto + 1, PALA.BLANCO[3]); rect(mx - 1, y + alto + 2, mx + 1, y + alto + 2, PALA.BLANCO[3]); rect(mx - 2, y + alto + 3, mx + 2, y + alto + 3, PALA.BLANCO[3]); }
      if (o.numero !== false) R.numero(String(Math.abs(Math.round(año))), mx, y + alto + 13, { centro: true });
    }
  };

  // ── El denario: plata (0–1) que pasa a cobre, cara de perfil en relieve, brillo; o.hueco (0–1) lo vacía ──────────
  const caraMask = (u, w) => ((u - 0.02) / 0.4) ** 2 + ((w + 0.12) / 0.46) ** 2 < 1 || (Math.abs(u + 0.02) < 0.17 && w > 0.2 && w < 0.66) || ((u - 0.4) / 0.11) ** 2 + ((w + 0.06) / 0.12) ** 2 < 1;
  const laurelMask = (u, w) => { const a = Math.atan2(w + 0.12, u - 0.02), d = Math.hypot((u - 0.02) / 0.4, (w + 0.12) / 0.46); return d > 0.86 && d < 1.12 && a < -0.6 && a > -2.9 && Math.sin(a * 22) > 0.1; };
  const denario = (cx, cy, r, plata, t, o = {}) => {
    const hueco = o.hueco ?? 0;
    for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y++) for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy);
      if (d > r + 0.6) continue;
      if (d > r - 0.4) { pset(x, y, CONTORNO); continue; }
      if (hueco > 0 && d < r * hueco * 0.86) { if (d > r * hueco * 0.86 - 1.2) pset(x, y, CONTORNO); continue; }
      const rp = b4(x, y) < plata ? PR.PLATA : PR.COBRE;
      let v = 2.4 - 1.1 * (dx + dy) / (r * 1.4);
      if (d > r * 0.84) v += (dx + dy < 0 ? 0.8 : -0.8);
      else if (d > r * 0.76 && d < r * 0.8 && Math.sin(Math.atan2(dy, dx) * 26) > 0) v -= 1;
      else {
        const u = dx / r, w = dy / r, m = caraMask(u, w), pas = 1.4 / r;
        if (m) { v += 0.3; if (!caraMask(u - pas, w - pas)) v += 1.1; if (!caraMask(u + pas, w + pas)) v -= 1.2; if (((u - 0.22) / 0.06) ** 2 + ((w + 0.17) / 0.05) ** 2 < 1) v -= 1.4; }
        else if (laurelMask(u, w)) v += (Math.sin(Math.atan2(w + 0.12, u) * 22) > 0.6 ? 1 : -0.6);
      }
      if (plata > 0.5 && o.brillo !== false) { const b = ((t * 0.5) % 2.5) - 1; if (Math.abs((dx - dy) / (r * 2) - b) < 0.025) v += 1.6; }
      pset(x, y, tone(rp, v, x, y));
    }
  };
  // barra vertical de plata con su % encima (x, y = esquina de abajo a la izquierda)
  const barra = (x, y, h, plata, o = {}) => {
    const w = o.w ?? 8, lleno = Math.round(h * plata);
    rect(x - 1, y - h - 1, x + w + 1, y + 1, CONTORNO);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const yy = y - j, xx = x + i; pset(xx, yy, j < lleno ? tone(PR.PLATA, 3 - i / w * 1.4 + (i === 0 ? 1 : 0), xx, yy) : tone(PR.COBRE, 2.2 - i / w * 1.2, xx, yy)); }
    if (o.numero !== false) R.numero(`${Math.round(plata * 100)}%`, x + w / 2, y - h - 5, { centro: true });
  };

  // ── Tijeras (para recortar la plata y partir el mapa) ───────────────────────────────────────────────────────────
  const tijeras = (x, y, abre, o = {}) => {
    const a = 0.15 + 0.35 * abre, L = o.largo ?? 14, ang = o.ang ?? 0;
    for (const s of [-1, 1]) {
      const ex = x + Math.cos(ang + s * a) * L, ey = y + Math.sin(ang + s * a) * L;
      linea(x, y, Math.round(ex), Math.round(ey), PR.PLATA[3]); linea(x, y + 1, Math.round(ex), Math.round(ey) + 1, PR.PLATA[1]);
      const hx = x - Math.cos(ang - s * a) * 6, hy = y - Math.sin(ang - s * a) * 6;
      R.anillo(Math.round(hx), Math.round(hy), 2.5, PALA.ROJO[2]);
    }
    pset(x, y, CONTORNO);
  };

  // ── El imperio en el mapa según el año: cuánto ocupa Roma en cada momento (año negativo = antes de Cristo) ─────
  // mapaAño(t, año, o): Roma diminuta en el 753, Italia hacia el 264 a. C., el Mediterráneo hacia el 27 a. C., el máximo
  // en el 117; desde el 395 el oeste se va apagando hasta el 476. Pinta Roma (y Constantinopla desde el 330).
  const estadoAño = (a) => {
    const f = (x, x0, x1) => clamp((x - x0) / (x1 - x0), 0, 1);
    if (a < -264) return { italia: lerp(0.06, 1, f(a, -509, -264)), imperio: 0 };
    return { italia: 1, imperio: a < -146 ? lerp(0.18, 0.42, f(a, -264, -146)) : a < -27 ? lerp(0.42, 0.66, f(a, -146, -27)) : lerp(0.66, 1, f(a, -27, 117)),
      oeste: a > 395 ? lerp(0, 0.6, f(a, 395, 476)) : 0 };
  };
  const mapaAño = (t, año, o = {}) => {
    const e = estadoAño(año);
    mapa(t, { ...e, ...o });
    const v = o.vista;
    punto(...lugar('roma', undefined, v), t, PALA.ROJO, 2);
    if (año >= 330) punto(...lugar('constantinopla', undefined, v), t, PALA.ORO, 2);
  };
  // flecha gruesa sobre el mapa (migraciones, empujones): pts en píxeles, p = cuánto se ha dibujado
  const flechaMapa = (pts, p, c = PALA.ROJO[3]) => {
    ruta(pts, p, c, { continua: true, grueso: 2, flecha: false });
    if (p <= 0) return;
    const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let q = tot * p, i = 1; while (i < pts.length - 1 && q > L[i - 1]) { q -= L[i - 1]; i++; }
    const [ax, ay] = pts[i - 1], f = Math.min(1, q / L[i - 1]), bx = ax + (pts[i][0] - ax) * f, by = ay + (pts[i][1] - ay) * f, ang = Math.atan2(pts[i][1] - ay, pts[i][0] - ax);
    poligono([[bx + Math.cos(ang) * 6, by + Math.sin(ang) * 6], [bx + Math.cos(ang + 2.3) * 6, by + Math.sin(ang + 2.3) * 6], [bx + Math.cos(ang - 2.3) * 6, by + Math.sin(ang - 2.3) * 6]], c);
  };
  // ambiente de la escena: luz (contraluz) y sombra por defecto para todos los personajes
  let AMB = {};
  const ambiente = (o) => { AMB = o || {}; };
  const personaje = (cx, suelo_, h, o = {}) => R.personaje(cx, suelo_, h, { ...AMB, ...o });

  // ── Halloween y fiestas de los muertos ────────────────────────────────────────────────────────────────────────
  const NARANJA = pal(['#5a1e08', '#a8400e', '#e0741c', '#ffa83a', '#ffd88a']);
  const NABO = pal(['#4a3050', '#8a6a94', '#c8b0c8', '#f0e4ec']);
  const VERDEF = pal(['#0e3a24', '#1e7a44', '#46c46a', '#a8ffb0']);   // verde «fantasma»
  // calabaza tallada (o.tallada: cara encendida que parpadea; o.luz: halo)
  const calabaza = (x, suelo_, s, t, o = {}) => {
    const w = 9 * s, h = 7 * s, cy = suelo_ - h;
    if (o.tallada !== false && o.luz !== false) R.halo(x, cy, 14 * s, [NARANJA[0], NARANJA[1]], 0.7);
    for (let y = -h; y <= h; y++) for (let xx = -w; xx <= w; xx++) {
      const d = (xx / w) ** 2 + (y / h) ** 2; if (d > 1) continue;
      const costilla = Math.abs(Math.sin((xx / w) * Math.PI * 2.2)) < 0.12;
      pset(Math.round(x + xx), Math.round(cy + y), tone(NARANJA, 2.6 - xx / w * 0.9 - y / h * 0.5 + (costilla ? -1 : 0), Math.round(x + xx), Math.round(cy + y)));
    }
    rect(x - 1, cy - h - 3 * s, x + 1, cy - h, PR.HIERBA[1]); pset(x + 2, cy - h - 3 * s, PR.HIERBA[2]);
    if (o.tallada !== false) {
      const fl = 0.5 + 0.5 * Math.sin(t * 13 + x) * Math.sin(t * 5), c = fl > 0.3 ? PALA.AMARILLO[3] : PALA.AMARILLO[2];
      for (const sx of [-1, 1]) poligono([[x + sx * 4 * s - 2 * s, cy - 1 * s], [x + sx * 4 * s, cy - 4 * s], [x + sx * 4 * s + 2 * s, cy - 1 * s]], c);
      poligono([[x - 6 * s, cy + 1.5 * s], [x + 6 * s, cy + 1.5 * s], [x + 4 * s, cy + 4.5 * s], [x - 4 * s, cy + 4.5 * s]], c);
      rect(x - 2 * s, cy + 1.5 * s, x - 1 * s, cy + 3 * s, NARANJA[1]); rect(x + 1 * s, cy + 3 * s, x + 2 * s, cy + 4.5 * s, NARANJA[1]);
    }
  };
  // nabo tallado irlandés, con una brasa dentro
  const nabo = (x, suelo_, s, t, o = {}) => {
    const r = 6 * s, cy = suelo_ - r;
    if (o.luz !== false) R.halo(x, cy, 12 * s, [NARANJA[0], NARANJA[1]], 0.6);
    for (let y = -r; y <= r; y++) for (let xx = -r; xx <= r; xx++) { if (Math.hypot(xx, y * 1.1) > r) continue; pset(Math.round(x + xx), Math.round(cy + y), tone(NABO, 2.4 - xx / r * 0.9 - (y < -r * 0.4 ? -0.6 : 0) + (y < -r * 0.3 ? 0 : 0), Math.round(x + xx), Math.round(cy + y))); }
    for (let y = -r; y < -r * 0.3; y++) for (let xx = -r; xx <= r; xx++) if (Math.hypot(xx, y * 1.1) <= r) pset(Math.round(x + xx), Math.round(cy + y), tone(PALA.MORADO, 2, Math.round(x + xx), Math.round(cy + y)));
    const c = Math.sin(t * 11 + x) > -0.3 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2];
    rect(x - 3 * s, cy - 1 * s, x - 1.5 * s, cy, c); rect(x + 1.5 * s, cy - 1 * s, x + 3 * s, cy, c); rect(x - 3 * s, cy + 2 * s, x + 3 * s, cy + 3 * s, c);
    linea(x, cy - r, x - 2 * s, cy - r - 4 * s, PR.HIERBA[2]);
  };
  // hoguera con troncos, llamas, chispas y su luz
  const hoguera = (x, suelo_, s, t) => {
    R.halo(x, suelo_ - 8 * s, 34 * s, [PALA.ANTORCHA[0], PALA.ANTORCHA[1]], 0.85);
    for (const d of [-1, 1]) linea(x - 8 * s * d, suelo_, x + 6 * s * d, suelo_ - 5 * s, PR.MADERA[1]);
    for (let k = 0; k < 9; k++) { const hh = (8 + 10 * hash2(k, Math.floor(t * 12))) * s * (1 - Math.abs(k - 4) / 6); linea(Math.round(x - 4 * s + k * s), suelo_ - 2, Math.round(x - 4 * s + k * s), Math.round(suelo_ - 2 - hh), k % 3 === 0 ? PALA.ANTORCHA[4] : k % 2 ? PALA.ANTORCHA[3] : PALA.ANTORCHA[2]); }
    for (let k = 0; k < 6; k++) { const f = ((t * 0.7 + k / 6) % 1); pset(Math.round(x + Math.sin(k * 3 + t) * 6 * s), Math.round(suelo_ - 14 * s - f * 30 * s), PALA.ANTORCHA[3]); }
  };
  const murcielagos = (t, o = {}) => {
    const n = o.n ?? 5;
    for (let k = 0; k < n; k++) { const x = ((k * 71 + t * (14 + k * 3)) % 360) - 20, y = (o.y0 ?? 20) + 20 * hash2(k, 4) + 6 * Math.sin(t * 2 + k), ala = Math.sin(t * 14 + k) > 0; R.icono('murcielago', Math.round(x), Math.round(y) - (ala ? 1 : 0), PALA.CONTORNO, PALA.NEGRO[2]); }
  };
  const lapida = (x, suelo_, o = {}) => {
    const w = o.w ?? 7, h = o.h ?? 12, rp = o.rampa ?? PR.ROCA;
    for (let y = suelo_ - h; y <= suelo_; y++) for (let xx = -w; xx <= w; xx++) { if (y < suelo_ - h + w && Math.hypot(xx, y - (suelo_ - h + w)) > w) continue; pset(x + xx, y, tone(rp, 2.4 - xx / w * 0.8, x + xx, y)); }
    if (o.cruz !== false) { rect(x - 2, suelo_ - h + 4, x + 2, suelo_ - h + 4, rp[0]); rect(x, suelo_ - h + 2, x, suelo_ - h + 8, rp[0]); }
    if (o.flores) for (let k = 0; k < 5; k++) { pset(x - 6 + k * 3, suelo_ - 1, o.flores[3]); pset(x - 6 + k * 3, suelo_, PR.HIERBA[2]); }
  };
  const caramelos = (x, y, n, t) => { for (let k = 0; k < n; k++) { const cx = x + (k % 4) * 6 - 9, cy = y - Math.floor(k / 4) * 4, c = [PALA.ROJO, PALA.AZUL, PALA.VERDE, PALA.AMARILLO, PALA.MORADO][k % 5]; rect(cx - 1, cy - 1, cx + 1, cy + 1, c[2]); pset(cx - 2, cy - 1, c[1]); pset(cx - 2, cy + 1, c[1]); pset(cx + 2, cy - 1, c[1]); pset(cx + 2, cy + 1, c[1]); pset(cx, cy - 1, c[3]); } };
  // fantasma de sábana (con ojos), que flota
  const fantasma = (x, suelo_, s, t, o = {}) => {
    const fl = Math.sin(t * 2 + x) * 2 * s, rp = o.rampa ?? PALA.BLANCO;
    bicho(x, suelo_ + fl, 1, [['e', 0, -14 * s, 7 * s, 8 * s, rp, 2.4], ['l', -6 * s, -10 * s, -7 * s, -1 * s, 3 * s, rp, 2.2], ['l', 6 * s, -10 * s, 7 * s, -1 * s, 3 * s, rp, 2], ['e', 0, -6 * s, 7 * s, 5 * s, rp, 2.2],
      ['d', -2 * s, -15 * s, CONTORNO], ['d', 2 * s, -15 * s, CONTORNO], ['d', -2 * s, -14 * s, CONTORNO], ['d', 2 * s, -14 * s, CONTORNO]], { r: Math.ceil(20 * s) });
  };
  // altar de muertos: escalones con mantel, cempasúchil, velas, calaveras de azúcar, fotos y papel picado arriba
  const altar = (cx, suelo_, t, o = {}) => {
    const w = o.w ?? 70;
    for (let k = 0; k < 3; k++) { const y = suelo_ - k * 14, ww = w - k * 16; rect(cx - ww, y - 14, cx + ww, y, PALA.MORADO[1 + (k & 1)]); rect(cx - ww, y - 14, cx + ww, y - 13, PALA.BLANCO[3]); }
    for (let k = 0; k < 14; k++) { const x = cx - w + 4 + k * (2 * w - 8) / 13; R.disco(Math.round(x), suelo_ - 1, 2, NARANJA[3]); pset(Math.round(x), suelo_ - 1, NARANJA[4]); }
    for (let k = 0; k < 4; k++) { const x = Math.round(cx - 36 + k * 24), y = suelo_ - 16; rect(x - 1, y - 6, x + 1, y, PALA.BLANCO[3]); const f = Math.sin(t * 13 + k) > 0 ? 1 : 0; pset(x, y - 7 - f, PALA.ANTORCHA[3]); pset(x, y - 8 - f, PALA.AMARILLO[3]); R.halo(x, y - 8, 8, [PALA.ANTORCHA[0], PALA.ANTORCHA[1]], 0.5); }
    for (let k = 0; k < 3; k++) { const x = Math.round(cx - 20 + k * 20), y = suelo_ - 34; R.disco(x, y, 4, PALA.BLANCO[3]); pset(x - 2, y - 1, [PALA.AZUL, PALA.ROJO, PALA.VERDE][k][2]); pset(x + 2, y - 1, [PALA.AZUL, PALA.ROJO, PALA.VERDE][k][2]); rect(x - 1, y + 2, x + 1, y + 2, PALA.ROJO[2]); }
    for (let k = 0; k < 2; k++) { const x = Math.round(cx - 12 + k * 24), y = suelo_ - 48; rect(x - 5, y - 8, x + 5, y + 4, PR.MADERA[2]); rect(x - 4, y - 7, x + 4, y + 3, PALA.PIEL[1 + k]); }
    for (let k = 0; k < 9; k++) { const x = cx - w + k * (2 * w) / 8, y = suelo_ - 70, c = [PALA.ROJO, NARANJA, PALA.AMARILLO, PALA.VERDE, PALA.AZUL, PALA.MORADO][k % 6]; poligono([[x - 6, y], [x + 6, y], [x + 6, y + 9 + Math.round(Math.sin(t * 2 + k))], [x - 6, y + 9]], c[2]); pset(Math.round(x), y + 4, c[0]); }
    linea(cx - w - 6, suelo_ - 70, cx + w + 6, suelo_ - 70, PALA.NEGRO[2]);
  };
  const farolChino = (x, y, t) => { const b = Math.round(Math.sin(t * 1.5 + x) * 2); R.halo(x, y + b, 10, [PALA.ROJO[0], PALA.ROJO[1]], 0.6); R.disco(x, y + b, 4, PALA.ROJO[2]); rect(x - 4, y + b - 1, x + 4, y + b, PALA.ROJO[3]); rect(x - 2, y + b - 5, x + 2, y + b - 4, PALA.ORO[2]); rect(x - 2, y + b + 4, x + 2, y + b + 5, PALA.ORO[2]); };
  // rueda del año: mitad luminosa y mitad oscura, con un marcador (ang en radianes desde arriba)
  const ruedaAño = (cx, cy, r, ang) => {
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d = Math.hypot(x, y); if (d > r) continue; const a = Math.atan2(x, -y), luz = a > 0; pset(cx + x, cy + y, d > r - 1.5 ? PALA.CONTORNO : luz ? tone(PALA.AMARILLO, 2.5 - d / r, cx + x, cy + y) : tone(PALA.MORADO, 1.2 - d / r * 0.6, cx + x, cy + y)); }
    R.disco(cx + Math.round(r * 0.5), cy, 4, PALA.AMARILLO[3]); R.disco(cx - Math.round(r * 0.5), cy, 4, PR.NIEVE[3]); R.disco(cx - Math.round(r * 0.5) + 2, cy - 1, 3, PALA.MORADO[1]);
    linea(cx, cy, Math.round(cx + Math.sin(ang) * (r - 2)), Math.round(cy - Math.cos(ang) * (r - 2)), PALA.ROJO[3]); R.disco(cx, cy, 2, PALA.ROJO[3]);
  };

  // R.buf es un getter (el búfer en uso); el «...R» lo congelaría en la pantalla y los fundidos saldrían negros
  return Object.defineProperty({
    ...R, PALA, PR, ELENCO, LUGARES, ZONAS, personaje, ambiente, mapaAño, estadoAño, flechaMapa,
    NARANJA, NABO, VERDEF, calabaza, nabo, hoguera, murcielagos, lapida, caramelos, fantasma, altar, farolChino, ruedaAño,
    nubesR, cieloR, colinas, skyline, columna, templo, insula, puesto, trono, salon, SUELO_SALON, mosaico, suelo, acueducto,
    panteon, muralla, empalizada, cabana, bicho, loba, perro, oveja, elefante, caballo, cesta, trirreme,
    mapa, proyMapa, lugar, VISTAS, entre, barraTiempo, tramosTiempo, ZONAS_MAPA: ZONAS, punto, ruta, denario, barra, tijeras,
  }, 'buf', { get: () => R.buf, enumerable: true });
}
