// Fontanería y decorados del episodio 43 (Haymitch: por qué el que ganó terminó destrozado), canon nuevo del 43 (relato
// hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate»), al nivel de episodios/ESTANDAR.md: el detalle de
// siempre. Reutiliza los decorados del 20 (jh-comun.js: distrito, interior, capitolio, arena (la sala de control), real,
// hoy, con sus Delante; distrito y capitolio pasan por un retoque del 43 más abajo: el porche de 'calle'/'puerta' hasta
// los bordes y, en el plató, el antepecho de las gradas y la primera fila de espaldas) y añade: B el prado del Covey, la casa de Haymitch, la destilería y la casa quemada (prado); D la
// arena de los Juegos 50 por dentro (arena50); F el estudio de las pausas y la consulta de los años sesenta (estudio).
// Personajes: ELENCO_JH y ELENCO_HM (pixel-chibi.js), por sus atributos, SIN logos, letras ni nada de las películas. LA
// VIOLENCIA NUNCA SE VE (las muertes se cuentan; nada de cuerpos, armas en uso ni sangre). CADA ENCUADRE TRAE DOS CÁMARAS
// (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en <x>Delante. Desde el 43 la
// esquina de Atom ya no hace falta dejarla vacía; la barra del tiempo (x 20–170, y 0–14), sí.
//
//   import * as T from '/atomo/plato/escenas/hm-comun.js';
//   const { E, R, M } = await T.preparar('hm-gancho');
//   T.rodar(E, R, [[0, (t) => T.prado(R, t, { encuadre: 'prado' })]], { año: 50 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_JH, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el Vigilante de los Juegos: ELENCO_CHIBI.vigilante lo pisa el vigilante de Gävle (ep22)
export { ELENCO_JH as JH } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_JH, a_cifras };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el Distrito 12: carbón, madera gastada, tejados de chapa, el cielo gris del amanecer
    carbon: '#2a2a30', carbonL: '#4a4a52', tabla: '#7a6a5a', tablaS: '#4a3e34', chapa: '#8a8e96', polvo: '#b8aa98',
    // el Capitolio: colores chillones, cristal, mármol blanco, el dorado
    capRosa: '#e85aa8', capTurq: '#3ad0c8', capMorado: '#8a4ad8', marmol: '#eef0f4', marmolS: '#c8ccd8', oroCap: '#e8b830',
    // la arena: el verde del prado del 50, el azul de la cúpula y el brillo del campo de fuerza
    prado: '#5ab84a', pradoS: '#2e7a2e', cupula: '#8ad8ff', campoF: '#e8fbff',
    // lo real y hoy: el azul de las pantallas
    pantallaHoy: '#4a8ae8',
    // el pan con ojos: corteza dorada, miga
    corteza: '#c8843a', cortezaS: '#8a5220', miga: '#f6e2b0',
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
  const E = await escena(id, 'ep43');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en Juegos (los libros no dan años): la rosa de Snow (Juegos 10), el broche (Juegos 50) y la
  // llama de Katniss (Juegos 74–75)
  Object.assign(R.ICONOS, {
    rosa: ['..##...', '.####..', '######.', '.####..', '...#...', '..##...', '...#...'],
    broche: ['.#####.', '#..#..#', '#.###.#', '#######', '#.###.#', '#..#..#', '.#####.'],
    llama: ['...#...', '..##...', '..###..', '.####..', '.#####.', '#######', '.#####.'],
  });
  R.tramosTiempo([[1, 30, R.PALA.ROJO, 'rosa'], [30, 62, R.PALA.ORO, 'broche'], [62, 76, R.PALA.NARANJA ?? R.PALA.ROJO, 'llama']]);
  R.companero = () => {};   // desde el 43 Atom no vive en la esquina: actúa en la escena (atom-personaje.js)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

export { distritoDelante, interior, interiorDelante, capitolioDelante, arena, arenaDelante, real, realDelante, hoy, hoyDelante } from '/atomo/plato/escenas/jh-comun.js';
import { distrito as jhDistrito, capitolio as jhCapitolio } from '/atomo/plato/escenas/jh-comun.js';

// ── El 12 y el Capitolio del 20, con los retoques del 43 (sin tocar jh-comun.js, que es del 20) ─────────────────────
// distrito(R, t, o) y capitolio(R, t, o): las MISMAS firmas, opciones y posiciones que los del 20 (jh-comun.js), y
// devuelven lo mismo. Retoques del 43:
//   distrito 'calle', cámara 'puerta': el suelo del porche, su canto y la sombra de debajo llegan hasta los dos bordes
//     del cuadro (en el 20 acababan en x 6 y x 313 y quedaba un hueco negro en x 0–5 y 314–319, y 160–169).
//   capitolio 'plato', cámara 'general': las gradas de los lados acaban en un antepecho acolchado (x 0–88 y 242–319,
//     de y 106 hasta el escenario: barandal de oro, capitoné rosa con tachuelas, tira de luces que corren y zócalo), así
//     el público del fondo queda por encima de y 105, lejos de las cabezas de los de la tarima (y≈120–130); los haces de
//     los focos lo siguen cruzando. Y delante de todo, abajo (y 160–179, x 0–268), la primera fila del público de
//     espaldas, a contraluz: chaquetas oscuras con el filo de luz, nucas y pelucas del Capitolio que se mecen y botan
//     cuando aplauden (o.aplausos); uno de cada cuatro alza una barra de luz; todo por debajo de los pies de la tarima (y 150), sin tapar a nadie. La cámara de la derecha sigue en x 296.
export function distrito(R, t, o = {}) {
  const g = jhDistrito(R, t, o);
  if (o.encuadre === 'calle' && o.camara === 'puerta') {
    // el porche sigue hasta el borde: se copian las seis columnas vecinas (con su luz y su tinte)
    const B = R.buf;
    for (let y = 160; y <= 169; y++) for (let k = 0; k < 6; k++) { B[y * 320 + k] = B[y * 320 + k + 6]; B[y * 320 + 314 + k] = B[y * 320 + 308 + k]; }
  }
  return g;
}
export function capitolio(R, t, o = {}) {
  const g = jhCapitolio(R, t, o);
  if ((o.encuadre ?? 'avenida') === 'plato' && (o.camara ?? 'general') === 'general') hm_platoPublico(R, t, o);
  return g;
}

// el canto de arriba del escenario redondo del plató (centro 160, 148; radios 100 × 20) en la columna x
const hm_escTope = (x) => { const u = (x - 160) / 100; return Math.abs(u) >= 1 ? 999 : Math.round(148 - 20 * Math.sqrt(1 - u * u)); };
function hm_platoPublico(R, t, o) {
  const { pset, rect, disco } = R, B = R.buf, ap = o.aplausos ?? 0.6;
  const oro = hex('#e8b830'), oroL = hex('#fff0a0'), oroS = hex('#a87818'), oroD = hex('#6a4a10');
  const ac = [hex('#5a1a52'), hex('#6e2466'), hex('#84307a'), hex('#3e1038')];   // capitoné: sombra media, cuerpo, luz, junta
  const luces = [hex('#a8fff2'), hex('#ff9ed2'), hex('#fff0a0'), hex('#c28cff')];
  // ─ el antepecho de las gradas, a los dos lados ─
  for (const [x0, x1] of [[0, 88], [242, 319]]) {
    for (let x = x0; x <= x1; x++) {
      const yb = Math.min(140, hm_escTope(x) - 1);
      for (let y = 106; y <= yb; y++) {
        let c;
        if (y === 106) c = oroL; else if (y === 107) c = oro; else if (y === 108) c = oroS; else if (y === 109) c = oroD;
        else if (y >= 120 && y <= 122) c = y === 121 ? hex('#1a0e2e') : hex('#24143e');
        else if (y >= yb - 2) c = y === yb ? hex('#120a22') : hex('#2a1646');
        else {
          // capitoné: rombos de 10 px con su junta, luz arriba a la izquierda de cada cojín
          const a = ((x + y * 1.4) % 10 + 10) % 10, b = ((x - y * 1.4) % 10 + 10) % 10;
          c = a < 1 || b < 1 ? ac[3] : a + b < 7 ? ac[2] : a + b > 13 ? ac[0] : ac[1];
          if ((x + y) % 2 === 0 && c === ac[1] && h(x >> 1, y >> 1, 91) < 0.12) c = ac[2];
        }
        B[y * 320 + x] = c;
      }
      // las tachuelas doradas en los cruces del capitoné
      for (let y = 111; y < yb - 3; y++) if (y < 119 || y > 123) { const a = ((x + y * 1.4) % 10 + 10) % 10, b = ((x - y * 1.4) % 10 + 10) % 10; if (a < 0.7 && b < 0.7) { pset(x, y, oro); if (x + 1 <= x1) pset(x + 1, y, oroL); } }
      // la tira de luces que corre (hacia el escenario)
      const ka = x0 === 0 ? x : 319 - x;
      if (ka % 3 === 0) { const f = (Math.floor(ka / 3) - Math.floor(t * 8)) % 8; pset(x, 121, f === 0 || f === -0 ? hex('#ffffff') : luces[((Math.floor(ka / 3) >> 2) % 4 + 4) % 4]); if (f === 0) { pset(x, 120, b_mez(B[120 * 320 + x], hex('#ffffff'), 0.5)); pset(x, 122, b_mez(B[122 * 320 + x], hex('#ffffff'), 0.5)); } }
      // los postes de latón del barandal
      if ((x0 === 0 ? x : 319 - x) % 22 === 10) for (let y = 110; y <= Math.min(yb - 3, 119); y++) pset(x, y, y % 3 ? oroS : oro);
    }
    // el brillo que corre por el barandal
    const xb = Math.round(x0 + ((t * 24) % ((x1 - x0) + 40)) - 20);
    for (let i = -3; i <= 3; i++) if (xb + i >= x0 && xb + i <= x1) pset(xb + i, 107, b_mez(oro, hex('#ffffff'), 0.7 - Math.abs(i) * 0.18));
    // manos del público del fondo apoyadas en el barandal, que dan palmas sobre él cuando aplauden
    for (let i = 0; i < 6; i++) { const mx = x0 + 6 + Math.round(h(i, x0, 92) * (x1 - x0 - 12)), up = ap > 0.5 && Math.sin(t * 8 + i * 2) > 0.4 ? 1 : 0; pset(mx, 105 - up, hex('#e8b890')); pset(mx + 1, 105 - up, hex('#e8b890')); pset(mx, 104 - up, hex('#c89870')); }
  }
  // los haces de los focos (los mismos que en el 20) vuelven a cruzar el antepecho
  [[40, hex('#ff9ed2'), 0], [96, hex('#a8fff2'), 1], [224, hex('#c28cff'), 2], [262, hex('#a8fff2'), 3]].forEach(([x0, col, k]) => {
    const x1 = 160 + Math.sin(t * 0.6 + k * 1.7) * 70;
    for (let y = 106; y <= 140; y++) { const u = (y - 23) / 127, cx = x0 + (x1 - x0) * u, m = 1 + 16 * u;
      for (let x = Math.max(0, Math.round(cx - m)); x <= Math.min(319, Math.round(cx + m)); x++) { if (x > 88 && x < 242) continue; if (y > Math.min(140, hm_escTope(x) - 1)) continue;
        if (((x + y) & 1) === 0 || Math.abs(x - cx) < m * 0.4) B[y * 320 + x] = b_mez(B[y * 320 + x], col, 0.22 * (1 - Math.abs(x - cx) / (m + 1) * 0.6)); } }
  });
  // ─ la primera fila, de espaldas, en primer plano (x 0–268, y 160–179) ─
  for (let y = 158; y <= 179; y++) for (let x = 0; x < 60; x++) B[y * 320 + x] = (x * 3 + y) % 5 === 0 ? hex('#1e1436') : hex('#140c26');   // la del 20, más pequeña, se borra
  const PEL = [['#ec5aaa', '#ff9ed2', '#a82e78'], ['#36ccc4', '#a8fff2', '#1a8888'], ['#a8e040', '#e0ff9a', '#5a8a1a'], ['#8a4ad8', '#c28cff', '#5a2a98'],
    ['#f08a30', '#ffc890', '#a8501a'], ['#f0d040', '#fff4a0', '#a88a10'], ['#f6f4f0', '#ffffff', '#b8b4c8'], ['#3a8ae8', '#9ac8ff', '#1a4a98']].map((p) => p.map(hex));
  const TRAJE = [hex('#1e0e30'), hex('#2a0e22'), hex('#0e1a2e'), hex('#24123a')], k = hex('#0a0614');
  for (let i = 0; i < 21; i++) {
    const x = 6 + i * 12 + Math.round(h(i, 3, 93) * 3), alto = h(i, 4, 93) < 0.4 ? 1 : 0, aplaude = h(i, 5, 93) < ap;
    const mece = Math.round(Math.sin(t * 2.2 + i * 1.3) * (aplaude ? 1.2 : 0.6)), bote = aplaude && Math.sin(t * 7 + i) > 0.5 ? 1 : 0;
    const yc = 166 - alto * 2 - bote, cx = x + mece, [pe, peL, peS] = PEL[(i * 5 + 3) % 8], tr = TRAJE[i % 4];
    // a contraluz: casi siluetas (están más cerca que el escenario), con el filo de la luz de la tarima arriba
    const ps = b_osc(pe, 0.42), pm = b_osc(pe, 0.62), trL = b_mez(tr, peL, 0.3);
    // los hombros y la espalda: chaqueta oscura redondeada, con el filo de luz arriba y la costura del centro
    rect(cx - 7, yc + 4, cx + 7, 179, k); rect(cx - 8, yc + 6, cx + 8, 179, k); rect(cx - 6, yc + 5, cx + 6, 179, tr); rect(cx - 7, yc + 7, cx + 7, 179, tr);
    for (let xx = cx - 6; xx <= cx + 6; xx++) pset(xx, yc + 5 + (Math.abs(xx - cx) > 4 ? 1 : 0), trL);
    pset(cx - 7, yc + 7, trL); pset(cx + 7, yc + 7, b_mez(tr, k, 0.3));
    for (let yy = yc + 9; yy <= 179; yy += 2) pset(cx, yy, b_mez(tr, k, 0.5));
    // la nuca (piel en sombra) asomando entre el pelo y el cuello de la chaqueta, y las orejas
    rect(cx - 2, yc + 3, cx + 2, yc + 4, hex('#a87858')); pset(cx, yc + 4, hex('#8a5a40')); pset(cx - 5, yc + 1, hex('#c89870')); pset(cx + 5, yc + 1, hex('#a87858'));
    // la peluca vista por detrás: oscura, con mechones y el filo de luz de color arriba
    disco(cx, yc - 1, 5, k); disco(cx, yc - 1, 4, ps); disco(cx - 1, yc - 2, 2, pm);
    for (let j = -3; j <= 3; j += 2) pset(cx + j, yc + 1 + (Math.abs(j) > 2 ? -1 : 0), pm);
    for (let j = -3; j <= 3; j++) pset(cx + j, yc - 5 + (Math.abs(j) > 2 ? 1 : 0), j < 1 ? peL : pe);
    const forma = i % 3;
    if (forma === 0) { disco(cx, yc - 7, 2, k); pset(cx, yc - 8, pe); pset(cx - 1, yc - 8, peL); pset(cx + 1, yc - 7, pm); }   // moño
    else if (forma === 1) for (let j = -2; j <= 2; j++) { const yy = yc - 7 - (2 - Math.abs(j)); pset(cx + j, yy, peL); pset(cx + j, yy + 1, pe); }   // cresta
    else { rect(cx - 5, yc, cx - 5, yc + 5, pm); rect(cx + 5, yc, cx + 5, yc + 5, ps); pset(cx - 5, yc - 1, pe); }   // melena
    // uno de cada cuatro alza una barra de luz (la mano al hombro) y la mece
    if (i % 4 === 1) { const an = Math.sin(t * 3 + i) * 0.5, bx = cx + 8, by = yc + 5, lc = luces[i % 4];
      for (let j = 4; j < 11; j++) for (const d of [-1, 1]) { const px = Math.round(bx + Math.sin(an) * j) + d, py = Math.round(by - Math.cos(an) * j); if (px >= 0 && px < 320 && py >= 0 && py < 180) B[py * 320 + px] = b_mez(B[py * 320 + px], lc, 0.35); }
      for (let j = 0; j < 11; j++) { const px = Math.round(bx + Math.sin(an) * j), py = Math.round(by - Math.cos(an) * j); pset(px, py, j < 2 ? hex('#e8b890') : j < 3 ? k : lc); }
      if (Math.floor(t * 4 + i) % 2) pset(Math.round(bx + Math.sin(an) * 10), Math.round(by - Math.cos(an) * 10), hex('#ffffff')); }
  }
}
export * as AT from '/atomo/plato/escenas/atom-personaje.js';

// ── B · El prado del Covey y la casa de Haymitch (Distrito 12, Juegos 50) ─────────────────────────────────────────────
// prado(R, t, o) pinta los 320 × 180 y devuelve su geometría ({ encuadre, camara, luz, suelo, libre, … }); pradoDelante(R,
// t, o), con las MISMAS opciones, va DESPUÉS de los actores. o.luz: 'amanecer' | 'dia' (por omisión) | 'tarde' | 'noche'
// (los tintes y cielos del 20, para que case con el Distrito 12). Lo fijo de cada encuadre, cámara y luz va en un búfer;
// cada fotograma se pinta encima lo vivo. La x de R.actor es su borde IZQUIERDO (ocupa x…x+15); y, los pies.
// o.sentados (true): pradoDelante vuelve a pintar el tronco ('prado') o la mesa ('casa' general) POR DELANTE de los
// actores, para los que se sientan detrás (asoman cabeza, hombros y pecho): ponlos con los pies en asientos[k].
// o.encuadre:
//   'prado': EL PRADO DEL COVEY, el sitio de Lenore Dove. 'general': cielo tramado con nubes de tres tonos a tres
//     velocidades y dos bandadas; sierras azuladas; a la izquierda la Veta lejos (seis casitas de tablas y chapa que
//     humean, un tendedero); el bosque del 12 (pinos de cuatro verdes, abedules, árboles de hoja) detrás de la alambrada
//     de postes y espino (con un hueco vencido en x 190–220); un roble en x 106; el sendero de tierra de la Veta a la
//     charca; la charca (x 200–292, y 117–141) que refleja cielo y bosque, con nenúfares, juncos y espadañas que se
//     mecen, brillos que corren, la estela del sol, anillos y dos libélulas; el tronco caído con setas (x 24–92, y 140–151);
//     la manta de parches con la cesta y la taza (x 115–157, y 150–159); la hierba que se mece EN ONDAS (cada brizna, con
//     flores), flores silvestres, piedras, mariposas (de día), luciérnagas (tarde y noche), neblina baja (amanecer).
//     'cerca': la orilla de la charca grande (y 101–143, toda la anchura) con el bosque detrás reflejado, nenúfares, una
//     rana que croa y salta al agua, libélulas; el tronco grande en primer término (x 72–206, y 153–168) para los dos
//     sentados; la esquina de la manta con la cesta (x 0–44, y 166–179); juncos en las orillas.
//     o.sol (0–1, cualquier valor por fotograma): 0 alto, 1 puesto detrás del bosque (por omisión 0.72 al amanecer, 0.05 de
//     día, 0.55 de tarde; de noche es la luna); va en x 214 (general) o 196 (cerca) y se refleja en el agua.
//     LAS OCAS (o.ocas 0–6, 4 por omisión): blancas, pico y patas naranjas, con contorno; cada una pasea, pasta, se estira
//     y grazna, y aletea a su ritmo; o.fila (true o la y): caminan en fila de izquierda a derecha; o.ocasQuietas: quietas
//     (respiran y giran la cabeza: el amanecer triste); de cerca, una nada en la charca. Para la que persigue a Atom, la
//     escena usa a_oca (abajo) con modo 'corre'. o.nido (true o [x, y]): el nido con cinco huevos, uno se mueve (el gag del
//     final); o.gominolas (true o [x, y], la esquina de abajo a la izquierda): la bolsa roja con lazo dorado y las gominolas
//     desparramadas en la hierba (ocupa x … x + 24, y − 17 … y + 2).
//     Devuelve suelo, libre, tronco, asientos, charca [x0, y0, x1, y1], manta, sol [x, y, r], ocas [[x, y]…] (pies), nido.
//   'casa': DENTRO DE LA CASA DE HAYMITCH (la Veta). 'general': pared de tablas con vetas, nudos y rendijas de luz, la
//     viga; la cocina de hierro (fuego que tiembla por la rejilla y su luz) con la olla que echa vapor y el tubo al techo;
//     la balda con tarros y el quinqué (encendido de noche); la puerta de tablas en zeta con la luz que se cuela; el reloj
//     de pared con su péndulo; la tina de zinc colgada; la chaqueta y la gorra de minero en los ganchos; la ventana con
//     la Veta gris (humo de chimeneas y un minero que pasa, recortados al cristal) y la luz que cae al suelo con polvo
//     flotando; la cuerda con ropa tendida que se mece; la mesa de tablas con dos sillas, un cuenco y la taza; la alfombra
//     trenzada; el taburete con la palangana; la cama de Sid con la manta de parches; juguetes de madera y la peonza que
//     gira; un ratón que se asoma por su agujero. o.vela (true): el bollo con la vela encendida en la mesa (el cumpleaños);
//     o.bollo: el bollo sin vela. 'mesa': la mesa de cerca, de tablas que vienen hacia nosotros, con el bollo grande y su
//     vela que tiembla (o.vela false: sin vela), dos platos, la taza de hojalata, el tarro con flores del prado, migas y un
//     paquetito atado, el pan y las patatas en los platos, el salero, la cuchara, el trapo de cuadros (x 2–54, y 158–179) y la
//     taza que humea; detrás, la ventana con la Veta, el calendario, la balda con platos y tazas, la sartén, el chal y el farol
//     y la cocina con el vapor; la mesa va SIEMPRE por delante (borde en y 112): los de detrás, con los pies en
//     asientos[k] (y 116), asoman cabeza y pecho. Devuelve
//     suelo, libre, mesa, asientos, vela (la punta de la llama), ventana, cocina, puerta, cama, peonza ('mesa': suelo 116).
//   'destileria': LA DESTILERÍA DE HATTIE en el bosque. 'general': copas y dos troncos grandes con musgo, el bosque en tres
//     términos con bruma (pinos de pisos con luz y sombra), rayos de luz entre los árboles con motas, una ardilla que sube y baja, hojas que caen, helechos
//     que se mecen; el cobertizo de postes y chapa; el hogar de piedras con su fuego pequeño; la caldera de cobre
//     martilleado con su cúpula (que echa vapor), el cuello de cisne, el barril del serpentín y el caño que gotea en la jarra de cristal
//     (o.llena 0–1); el tubo con el humo en bocanadas gordas; la tina del mosto con su pala, la garrafa de mimbre, los sacos de maíz y las cajas de
//     botellas. 'alambique': la caldera enorme con el fuego bajo ella, el cuello de cisne, el barril del serpentín y el caño
//     que gotea en la botella, que se llena (o.llena); cajas de botellas detrás. Devuelve suelo, libre, cajas (general:
//     donde se cargan), caldera, jarra o botella, caño, fuego.
//   'quemada': LA CASA QUEMADA, SIN fuego ni brasas: con o.luz 'tarde' o 'dia' la luz es gris de ceniza (de noche, noche).
//     'general': cielo gris con nubes y pájaros; la mina en la colina; la fila de casas de la Veta; dos casas vecinas en
//     pie con su porche; en medio, lejos, la silueta negra de la casa (tablas melladas, postes, chapa caída, la estufa y su
//     tubo) y la humareda gris espesa que sube y se tumba con el viento; vecinos pequeños mirando en dos corros (alguno se
//     tapa la boca), un agente de la paz al fondo; la calle de barro con roderas, charcos que reflejan el cielo, la bomba
//     de agua y cubos tirados; ceniza que vuela. 'cerca': el porche caído (tablas partidas, un agujero, un poste en pie y
//     otro caído, la chapa vencida, los escalones), la pared negra con los huecos de la puerta y la ventana por los que se
//     ve el cielo, las casas de al lado, humo que pasa de lado, ceniza que cae y LA TAZA DE HOJALATA en el barro
//     (o.taza false: sin la taza, para que la escena la pinte en la mano; g.taza sigue dando su sitio).
//     Devuelve suelo, libre, casa, humo, vecinos, bomba (general) y taza (cerca).
// pradoDelante: matas de hierba que se mecen en el borde de abajo ('prado'), el tronco con o.sentados ('prado'), la mesa
// con o.sentados ('casa' general; con el bollo y la vela si los hay) y la mesa con el bollo ('casa' mesa, siempre).
export function prado(R, t, o = {}) {
  const { enc, D, cam, luz } = a_prResuelve(o), F = a_prFijoDe(R, enc, D, cam, luz), tn = a_prTinte(luz);
  R.copiar(F.b);
  return { encuadre: enc, camara: cam, luz, ...D.vivo(R, t, cam, luz, o, tn, F) };
}
export function pradoDelante(R, t, o = {}) {
  const { enc, D, cam, luz } = a_prResuelve(o), F = a_prFijoDe(R, enc, D, cam, luz);
  if (D.delante) D.delante(R, t, cam, luz, o, a_prTinte(luz), F);
}
// ── D · La arena de los Juegos 50, por dentro ────────────────────────────────────────────────────────────────────────
// arena50(R, t, o) y arena50Delante(R, t, o) (con las MISMAS opciones, DESPUÉS de los actores). Una arena PRECIOSA Y
// VENENOSA: todo brilla demasiado, con colores un punto irreales (cielo cobalto, montaña violeta y nevada, flores rosa
// chicle, violeta y cian, frutos que relucen). LA VIOLENCIA NUNCA SE VE: ni cuerpos, ni sangre, ni armas en uso.
// o.luz: 'dia' (por omisión) | 'amanecer' | 'tarde' | 'noche' (tiñe todo el decorado; de noche, estrellas, luna y flores
// que brillan solas). El depósito está bajo tierra: allí o.luz no cambia nada. Cada encuadre trae dos cámaras (o.camara:
// 'general' o la suya). Todo devuelve { encuadre, camara, luz, suelo (y de los pies), libre [x0, x1] (franja para los
// personajes), … } y lo que se dice abajo. Vida en todos: nubes de tres tonos a tres velocidades, pájaros de colores,
// mariposas, flores y hierba que se mecen en ondas de viento, agua que destella, gotas, luces que parpadean.
// o.encuadre:
//   'prado' (por omisión): EL PRADO DE FLORES: el cielo, la montaña nevada al fondo, el bosque verde intenso, la
//     Cornucopia dorada pequeña a lo lejos, una charca que destella, conejos, mariposas y un sendero; a los lados, mantos
//     de flores que se mecen y en el centro un claro para los personajes, con LA FLOR (una flor violeta grande a la altura
//     de la mano, en flor [x, y]). o.polen (0–1): de esa flor sale un humo violeta que crece y se extiende con el viento.
//     o.paracaidas (0–1): un paracaídas plateado del Capitolio baja con una botellita (0 arriba, fuera de cuadro; 1 posado
//     en el suelo); o.paracaidasX cambia su x. Cámara 'flores': las flores de cerca (grandes, con tallos y hojas), la
//     montaña enorme detrás y el polen saliendo de las corolas. Devuelve flor, paracaidas [x, y] (la botellita), sol.
//   'bosque': EL BOSQUE: troncos con corteza, copas con frutos que relucen (venenosos), setas rosas, helechos, un arroyo
//     que cruza y destella, haces de luz con motas, pájaros de colores que pasan y uno posado, hojas que caen; a la
//     derecha el árbol grande con LA RAMA gruesa donde cabe una persona (rama [x, y]: donde se plantan los pies de
//     Maysilee). Cámara 'rama': la rama de cerca, que cruza el cuadro, con el bosque hondo debajo; sobre ella hay ~30 px
//     libres. Devuelve rama, arroyo [x0, y0, x1, y1].
//   'deposito': EL DEPÓSITO DE AGUA bajo tierra: caverna de roca húmeda con estratos y gotas, dos tuberías enormes con
//     bridas y remaches, la tubería vertical con su volante y su manómetro, el agua quieta que refleja las lámparas de
//     mantenimiento enjauladas (parpadean), la barandilla y el andén de hormigón mojado. o.estalla (0–1): destello en la
//     carga, la tubería revienta y el agua sale a chorros, hierve en el depósito y corre por el andén (sin nadie herido).
//     o.carga (true por omisión): el paquete atado a la brida. Cámara 'tuberia': la tubería de cerca, con la brida, los
//     pernos, el óxido y la carga atada debajo con su mecha; o.mecha (0–1): la mecha arde de su punta (mecha [x, y],
//     donde se acerca el pedernal) hasta la carga. Devuelve carga [x, y], agua o mecha.
//   'borde': EL BORDE DE LA ARENA: la meseta de hierba y flores que acaba en un acantilado de roca; detrás, un vacío con
//     niebla que sube y, muy lejos, un bosque «pintado» (el engaño). EL CAMPO DE FUERZA es invisible: solo se ve cuando algo
//     lo toca (o.campo 0–1: hexágonos que ondulan desde o.toque [x, y]; con o.campo solo, sin toque, «el borde que
//     brilla»: un velo de hexágonos que respira). o.rebote: [t0, x0, y0] un objeto (o.objeto: 'pinon' por omisión |
//     'hacha', solo en vuelo) lanzado en t0 desde (x0, y0) que choca con el campo (destello de hexágonos), vuelve y cae.
//     Cámara 'acantilado': el borde de lado: el filo arriba a la izquierda, la pared de roca que cae, la niebla abajo y el
//     muro invisible. Devuelve campo [x0, x1] (el muro: los hexágonos solo a partir de x0), borde (x del filo) y, con
//     o.rebote, rebote { impacto: [t, x, y], cae: [t, x, y] } para sincronizar el gesto y el efecto.
// arena50Delante pinta lo que va por delante de los personajes (bajo suelo − 12 dentro de libre, para no tapar caras):
// matas y flores de primer plano, helechos, hojas sobre la rama (por debajo de las rodillas), salpicaduras del depósito,
// jirones de niebla y el objeto de o.rebote en vuelo.
export function arena50(R, t, o = {}) {
  const g = b_geo(o), P = b_pal(g.luz);
  const F = b_capa(R, 'a50|' + g.encuadre + '|' + g.camara + '|' + g.luz, () => b_A50FIJO[g.encuadre](R, g, P));
  R.copiar(F.buf);
  b_A50VIVO[g.encuadre](R, R.buf, t, o, g, P, F);
  return b_salida(g, t, o);
}
export function arena50Delante(R, t, o = {}) {
  const g = b_geo(o), P = b_pal(g.luz);
  b_A50DELANTE[g.encuadre](R, R.buf, t, o, g, P);
  b_reboteDibuja(R, t, o, g, P);
}
// ── F · El estudio de las pausas y la consulta ──────────────────────────────────────────────────────────────────────
// estudio(R, t, o) y estudioDelante(R, t, o). o.encuadre:
//   'estudio' (por omisión): EL ESTUDIO DE ATOM, de noche y cálido, donde explica (pausas, el aviso y el cierre). Techo de
//     vigas, pared de ladrillo con su moldura y su zócalo, suelo de tablas en perspectiva con una alfombra de dibujo;
//     a la izquierda la puerta de cuarterones (con el abrigo y la bufanda colgados, el pomo de latón y la raya de luz del
//     pasillo por debajo, que a veces corta la sombra de alguien que pasa), encima un mapa antiguo enmarcado (costas,
//     rosa de los vientos y un barquito), y la estantería llena de libros (lomos sin letras, con bandas doradas), un barco
//     en una botella, una lechuza de barro y un globo terráqueo que gira despacio;
//     en el centro la pizarra verde con marco de roble, restos de borrador y su repisa con tizas y borrador
//     (o.pizarra: función (R, t, rect) que dibuja en ella, ya con R.recorte puesto al hueco: usa pset, linea, disco o
//     poligono, no R.rect); a la derecha la ventana de noche (luna con halo, estrellas que titilan, nubes de tres tonos a
//     tres velocidades, tejados con ventanas que se encienden, un árbol que se mece y algún murciélago) con cortinas de
//     terciopelo que se mecen con la corriente, el gato que duerme en el alféizar (respira y mueve la cola; o.gato
//     false lo quita), el radiador, el reloj de pared que avanza y la monstera en su maceta que se mueve; la mesa grande
//     de nogal con el cerebro de juguete en su peana, el reloj de arena que corre, la cesta de huevos de oca, la lupa y
//     la lámpara de latón con su cono de luz, polvo que flota en el haz y un leve parpadeo (o.lampara 0–1, por omisión
//     1). o.sin: lista de objetos de la mesa que no se pintan para que la escena los anime ('cerebro', 'reloj', 'cesta',
//     'lupa'): se pintan con c_cerebro, c_relojArena, c_cesta y c_lupa (exportadas). o.arena (0–1): cuánta arena ha
//     caído (sin ella, en bucle de 24 s).
//     Cámara 'general': la habitación entera; la mesa va detrás de los personajes (los que están a suelo 160 quedan
//     delante). o.mesaDelante true: la mesa y sus objetos los pinta estudioDelante, para que alguien se ponga detrás
//     (pies en geo.detras 142 los chibis, geo.detrasAtom 137 Atom a escala 1: asoman cabeza y manos sobre el tablero); lo
//     que la escena ponga sobre la mesa se pinta entonces DESPUÉS de estudioDelante. estudioDelante pone siempre en
//     primer plano la esquina del sillón de orejas con su manta y la mesita con la taza que humea (x 0–58, y 132–179).
//     Cámara 'mesa': la mesa de cerca, a escala doble: el pie de la pizarra con la repisa (o.pizarra también aquí), un
//     cuadro del faro, la ventana con el gato, y sobre la mesa el cerebro, el reloj de arena, la cesta, la lupa, la
//     lámpara con su cono, un cuaderno, lápices y la taza que humea, con el centro libre (mesa) para lo que pinte la
//     escena; para T.mano y para Atom a escala 2 de pie sobre la mesa. estudioDelante no pinta nada.
//   'consulta': LA CONSULTA DE UN PSIQUIATRA DE LOS AÑOS SESENTA, de tarde: papel pintado de rombos oliva y mostaza,
//     friso de cuarterones de nogal, suelo de tablas con alfombra; la ventana con persiana veneciana (por las rendijas
//     se ve el cielo con nubes que pasan, el edificio de enfrente y un árbol), cuyas rayas de luz caen sobre la pared, el
//     suelo y el diván, y se mueven despacio; el diván de cuero granate capitoneado con su almohadón; tres diplomas sin
//     letras (sello y renglones), una lámina de manchas simétricas, el reloj regulador con el péndulo que oscila, la
//     estantería baja con libros y la pecera con su pez rojo, el archivador metálico con un potus; el escritorio de
//     nogal con la máquina de escribir, carpetas, la taza que humea, la lámpara verde de banquero y el teléfono de disco,
//     y el sillón de cuero detrás. o.escritorioDelante (por omisión true): el escritorio lo pinta estudioDelante, para
//     que el psiquiatra quede detrás (pies en geo.detras, en x 236–266: asoman cabeza y hombros); con false lo pinta
//     estudio() y la gente puede ponerse delante. estudioDelante pone además un ficus en la esquina de abajo a la
//     izquierda.
//     Cámara 'escritorio': el escritorio de cerca: el secante de cuero con su papel verde libre en el centro (escritorio,
//     para la ficha «1961»), el fichero de madera con fichas de pestañas de colores, fichas sueltas, la lámpara de
//     banquero encendida, la máquina de escribir grande con su hoja de renglones, las carpetas, la pluma, la taza que
//     humea; detrás, la persiana con las rayas de luz que cruzan la mesa, un diploma y el reloj regulador con su péndulo.
//     estudioDelante no pinta nada.
// Lo de arriba queda limpio para la barra del año: nada importante en y 0–21 bajo x 20–170 (solo techo o papel pintado),
// y la esquina de Atom (x 278–318, y 4–44) es pared tranquila (ladrillo o papel pintado).
// Devuelve { encuadre, camara, suelo, libre, … } con la geometría de cada vista (ver la ENTREGA de cada auxiliar):
//   estudio/general: pizarra [x0, y0, x1, y1], mesa [x0, y0, x1, y1] (hueco libre sobre la mesa; los objetos se apoyan
//     en y = tablero), detras, detrasAtom, puerta, pomo, ventana, estanteria, lampara; estudio/mesa: mesa, pizarra,
//     cerebro, reloj, cesta, lupa, lampara;
//   consulta/general: escritorio [x, y] (centro del tablero), divan [x, y] (el asiento), detras (suelo tras el
//     escritorio), ventana, reloj; consulta/escritorio: escritorio [x0, y0, x1, y1] (el papel del secante), maquina,
//     fichero, lampara.
export function estudio(R, t, o = {}) {
  const enc = o.encuadre || 'estudio', cam = o.camara || 'general';
  if (enc === 'consulta') return cam === 'escritorio' ? c_consultaCerca(R, t, o) : c_consulta(R, t, o);
  return cam === 'mesa' ? c_estudioMesa(R, t, o) : c_estudioGeneral(R, t, o);
}
// lo que va por delante de los personajes (después de los actores, con las mismas opciones): en el estudio general, el
// sillón y la mesita con la taza; en la consulta general, el escritorio (si o.escritorioDelante no es false) y el ficus;
// en la mesa del estudio, la taza de té (para que Atom pase por detrás); en el escritorio de la consulta, nada
export function estudioDelante(R, t, o = {}) {
  const enc = o.encuadre || 'estudio', cam = o.camara || 'general';
  if (enc === 'consulta' && cam === 'general') { if (o.escritorioDelante !== false) c_escritorioConsulta(R, t); c_ficus(R, 10, 179, t); }
  else if (enc === 'estudio' && cam === 'mesa') c_tazaMesa(R);
  else if (enc === 'estudio' && cam === 'general') { if (o.mesaDelante) { c_mesaGrande(R); c_objetosMesa(R, t, o.sin || [], o.arena, o.lampara ?? 1, 1); } c_sillon(R, t); }
}
// encuadre, cámara y luz de las opciones (con sus valores por omisión); lo usan prado y pradoDelante
function a_prResuelve(o) {
  const enc = a_prENC[o.encuadre] ? o.encuadre : 'prado', D = a_prENC[enc], cam = D.camaras.includes(o.camara) ? o.camara : 'general';
  const luz = a_prLUZ[o.luz] ? o.luz : D.luz;
  return { enc, D, cam, luz: D.luces ? D.luces(luz) : luz };
}

// el búfer fijo de un encuadre, cámara y luz (se pinta una vez y se guarda)
function a_prFijoDe(R, enc, D, cam, luz) { return a_prFijo(R, [enc, cam, luz].join('|'), luz, D.cielo ? D.cielo(cam, luz) : null, (luces) => D.fijo(R, cam, luz, luces)); }

// trama de Bayer 4 × 4 (para degradados y fundidos tramados)
const a_prBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de la trama en (x, y)
const a_prUm = (x, y) => a_prBAYER[(y & 3) * 4 + (x & 3)];

// un canal entre 0 y 255
const a_prCl = (v) => Math.max(0, Math.min(255, Math.round(v)));

// un color del búfer a partir de (r, g, b)
const a_prDe = (r, g, b) => ((255 << 24) | (a_prCl(b) << 16) | (a_prCl(g) << 8) | a_prCl(r)) >>> 0;

// mezcla de dos colores (k = 0: a; k = 1: b)
function a_prMez(a, b, k) { return a_prDe((a & 255) * (1 - k) + (b & 255) * k, ((a >>> 8) & 255) * (1 - k) + ((b >>> 8) & 255) * k, ((a >>> 16) & 255) * (1 - k) + ((b >>> 16) & 255) * k); }

// las zonas tranquilas (la barra del año con sus cifras y la esquina de Atom): ni humo, ni nubes, ni pájaros
const a_prCalma = (x, y) => (y < 21 && x < 176) || (x > 271 && y < 49);

// el tinte de cada luz sobre un color (r, g, b) → (r, g, b), los mismos del 20
const a_prLUZ = {
  amanecer: (r, g, b) => [r * 0.8 + 34, g * 0.74 + 22, b * 0.78 + 34],
  dia: (r, g, b) => [r, g, b],
  tarde: (r, g, b) => [r * 0.84 + 58, g * 0.74 + 26, b * 0.6 + 8],
  noche: (r, g, b) => [r * 0.3 + 12, g * 0.34 + 18, b * 0.5 + 42],
  // la tarde gris de la casa quemada: casi sin color, apagada, con un poso violeta (el humo lo tapa todo)
  ceniza: (r, g, b) => { const l = (r + g + b) / 3; return [(r * 0.4 + l * 0.6) * 0.8 + 20, (g * 0.4 + l * 0.6) * 0.78 + 18, (b * 0.4 + l * 0.6) * 0.8 + 26]; },
};

const a_prTN = new Map();

// la función que tiñe un color con la luz (memorizada): lo que se pinta cada fotograma pasa por ella
function a_prTinte(luz) {
  let m = a_prTN.get(luz);
  if (!m) { const f = a_prLUZ[luz], cache = new Map(); m = (c) => { let v = cache.get(c); if (v === undefined) { const [r, g, b] = f(c & 255, (c >>> 8) & 255, (c >>> 16) & 255); v = a_prDe(r, g, b); cache.set(c, v); } return v; }; a_prTN.set(luz, m); }
  return m;
}

// una lista de colores '#a #b #c'
const a_prH = (s) => s.split(' ').map(hex);

// los cielos del 20: degradado (de arriba al horizonte), nubes [sombra, cuerpo, luz], sol y su halo
const a_prCIE = {
  amanecer: { g: a_prH('#4a5480 #74769e #a68aa8 #d6a2a2 #f2c49e'), n: a_prH('#8a7898 #c8a0b0 #f4d0c4'), sol: hex('#fff2cc'), halo: hex('#f8d6a6') },
  dia: { g: a_prH('#5a82b8 #7aa0cc #98b8d8 #b8cee0 #d0dce4'), n: a_prH('#9eaabe #d0d8e2 #f6f8fa'), sol: hex('#fffbe8'), halo: hex('#e6eef2') },
  tarde: { g: a_prH('#3c3c7a #764e92 #c4687e #ee905e #fac46c'), n: a_prH('#7a4a72 #d6827a #fac690'), sol: hex('#fff2b0'), halo: hex('#ffd68a') },
  noche: { g: a_prH('#0a0e2c #121840 #1a224e #242c58 #303662'), n: a_prH('#1e2650 #2c3462 #444c7a'), sol: hex('#f4f0dc'), halo: hex('#3a4270') },
  ceniza: { g: a_prH('#46465c #625e72 #85798a #a68e94 #c0a49c'), n: a_prH('#5e5a66 #847e8a #aaa4ac'), sol: hex('#f2e2c8'), halo: hex('#c4aca4') },
};

const a_prCACHE = new WeakMap();

// el fondo fijo de un encuadre: se pinta una vez en un búfer propio (cielo, decorado, tinte de la luz y, sin teñir, las
// luces); guarda la máscara del cielo (esCielo: donde va el sol; maskN: fuera de la barra del año, para las nubes, que
// sí pasan suaves por la esquina de Atom; mask: fuera de las dos zonas tranquilas, para los pájaros). cielo: { hor, estratos } o null (interiores). El sol NO va aquí: se pinta en vivo (o.sol se mueve)
function a_prFijo(R, clave, luz, cielo, dibuja) {
  let m = a_prCACHE.get(R); if (!m) a_prCACHE.set(R, (m = new Map()));
  let F = m.get(clave); if (F) return F;
  const b = R.nuevo(), prev = R.usar(b), B = R.buf, luces = [], esCielo = new Uint8Array(57600), mask = new Uint8Array(57600), maskN = new Uint8Array(57600);
  let foto = null;
  if (cielo) { a_prCieloFijo(R, luz, cielo); foto = B.slice(); }
  const dat = dibuja(luces) ?? {};
  const tn = a_prLUZ[luz];
  for (let i = 0; i < 57600; i++) {
    if (foto && B[i] === foto[i] && (i / 320 | 0) < cielo.hor) { esCielo[i] = 1; const x = i % 320, y = i / 320 | 0; if (!a_prCalma(x, y)) mask[i] = 1; if (!(y < 21 && x < 176)) maskN[i] = 1; continue; }
    if (luz === 'dia') continue; const c = B[i], [r, g, bb] = tn(c & 255, (c >>> 8) & 255, (c >>> 16) & 255); B[i] = a_prDe(r, g, bb);
  }
  for (const f of luces) f(luz === 'noche', luz === 'amanecer');
  R.usar(prev);
  F = { b, mask, maskN, esCielo, cielo, dat }; m.set(clave, F);
  return F;
}

// el cielo fijo: degradado tramado, estratos finos y, de noche, las estrellas
function a_prCieloFijo(R, luz, o) {
  const P = a_prCIE[luz], g = P.g, B = R.buf, n = g.length - 1, hor = o.hor;
  for (let y = 0; y < hor; y++) { const u = Math.min(0.999, y / hor) * n, i = Math.floor(u), f = u - i; for (let x = 0; x < 320; x++) B[y * 320 + x] = f > a_prUm(x, y) ? g[i + 1] : g[i]; }
  if (luz === 'noche') for (let k = 0; k < 80; k++) { const x = Math.floor(h(k, 1, 900) * 320), y = Math.floor(h(k, 2, 900) * hor * 0.85); if (!a_prCalma(x, y)) B[y * 320 + x] = k % 5 ? hex('#8a90b8') : hex('#e8ecff'); }
  else for (const [x0, yy, w] of o.estratos ?? [[20, 0.5, 96], [176, 0.62, 80], [96, 0.8, 130], [250, 0.86, 70]]) { const y = Math.round(yy * hor);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = 1 - Math.abs(i / w * 2 - 1); if (x < 0 || x > 319 || a_prCalma(x, y)) continue;
      if (e * 1.4 > a_prUm(x, y)) B[y * 320 + x] = P.n[2]; if (e > a_prUm(x, y + 1) + 0.3) B[(y + 1) * 320 + x] = P.n[1]; } }
}

// el sol (o la luna) en vivo, con su halo tramado, solo sobre el cielo (lo tapan el bosque y los tejados)
function a_prSol(R, F, luz, sx, sy, sr) {
  const P = a_prCIE[luz], B = R.buf, M = F.esCielo, noche = luz === 'noche', rr = sr * (noche ? 2.2 : 3.6), bajo = luz === 'tarde' || luz === 'amanecer';
  for (let y = Math.max(0, Math.floor(sy - rr)); y < Math.min(180, sy + rr); y++) for (let x = Math.max(0, Math.floor(sx - rr)); x < Math.min(320, sx + rr); x++) {
    const i = y * 320 + x; if (!M[i]) continue; const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy);
    if (d < sr) { B[i] = noche ? (h(x >> 1, y >> 1, 901) < 0.2 ? hex('#c8c4b0') : d > sr - 1.2 ? hex('#d8d4c0') : P.sol) : d > sr - 1.2 ? P.halo : bajo && y - sy > sr * 0.35 ? a_prMez(P.sol, hex('#ffb060'), 0.35) : P.sol;
      if (!noche && x - sx < -sr * 0.2 && y - sy < -sr * 0.2 && d < sr * 0.6) B[i] = hex('#ffffff'); }
    else { const q = 1 - (d - sr) / (rr - sr); if (q * q * 0.9 > a_prUm(x, y)) B[i] = a_prMez(B[i], P.halo, 0.5); }
  }
}

// las nubes (forma de cúmulo, de tres tonos, base plana), solo donde la máscara del cielo lo deja
const a_prNUBE = [[0, 0, 0.3], [-0.3, 0.06, 0.21], [0.3, 0.05, 0.23], [-0.1, -0.13, 0.24], [0.15, -0.09, 0.2], [0.46, 0.1, 0.13], [-0.47, 0.1, 0.12]];

// una nube en (cx, cy) de ancho w con sus tres tonos
function a_prNube(R, mask, cx, cy, w, [cS, c, cL]) {
  const B = R.buf, base = cy + w * 0.14;
  const capa = (dx0, dy0, f, col) => { for (const [dx, dy, r0] of a_prNUBE) { const r = Math.max(1, r0 * w * f), x0 = cx + dx * w + dx0, y0 = cy + dy * w + dy0;
    for (let y = Math.floor(y0 - r); y <= y0 + r; y++) { if (y < 0 || y > 179 || y > base + dy0 * 0.3) continue; for (let x = Math.floor(x0 - r); x <= x0 + r; x++) { if (x < 0 || x > 319) continue; const i = y * 320 + x; if (mask[i] && (x + 0.5 - x0) ** 2 + (y + 0.5 - y0) ** 2 <= r * r) B[i] = col; } } } };
  capa(0, 1, 1, cS); capa(0, 0, 0.94, c); capa(-1, -1.5, 0.62, cL);
}

// pájaros lejanos en uve que aletean (solo en el cielo)
function a_prPajaros(R, t, F, n, y, v, c, sem = 0) {
  const B = R.buf, ciclo = 420 / v + 6, u = (t + sem * 5.3) % ciclo, x0 = -40 + u * v;
  for (let k = 0; k < n; k++) { const x = Math.round(x0 - k * 9 - (k % 2) * 3), yy = Math.round(y + (k % 2 ? 4 : -1) * Math.ceil(k / 2) * 0.8 + Math.sin(t * 2 + k) * 1.5), a = Math.sin(t * 10 + k * 1.7) > 0;
    for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 1], [1, a ? -1 : 1], [-2, a ? -2 : 1], [2, a ? -2 : 1]]) { const px = x + dx, py = yy + dy; if (px >= 0 && px < 320 && py >= 0 && py < 180 && F.mask[py * 320 + px]) B[py * 320 + px] = c; } }
}

// lo vivo del cielo: tres capas de nubes a tres velocidades (o.humo: más grises), estrellas que titilan, pájaros
function a_prCieloVivo(R, t, F, luz, o = {}) {
  const P = a_prCIE[luz], hor = F.cielo.hor, cs = o.gris ? P.n.map((c) => a_prMez(c, hex('#8a8a92'), 0.35)) : P.n;
  const capas = [[0.9, 0.6, [[10, 0.28, 30], [130, 0.18, 24], [250, 0.34, 28]]], [2.2, 0.85, [[60, 0.46, 40], [200, 0.38, 34], [330, 0.5, 30]]], [4.2, 1, [[0, 0.66, 46], [170, 0.72, 52]]]];
  for (const [v, esc, lista] of capas) for (const [x0, yy, w] of lista) { const W = w * esc * (hor > 60 ? 1 : 0.8), x = ((x0 + t * v) % 440 + 440) % 440 - 60, y = Math.max(27, Math.round(yy * hor));
    const tonos = esc < 0.7 ? [a_prMez(cs[0], P.g[1], 0.4), a_prMez(cs[1], P.g[1], 0.4), a_prMez(cs[2], P.g[1], 0.35)] : cs; a_prNube(R, F.maskN, Math.round(x), y, W, tonos); }
  if (luz === 'noche') { const B = R.buf; for (let k = 0; k < 24; k++) { const x = Math.floor(h(k, 5, 902) * 320), y = Math.floor(h(k, 6, 902) * hor * 0.8), i = y * 320 + x; if (F.mask[i] && Math.sin(t * 3 + k * 2.1) > 0.3) B[i] = hex('#ffffff'); } }
  else { a_prPajaros(R, t, F, 5, Math.round(hor * 0.36), 22, luz === 'tarde' ? hex('#3a2440') : hex('#4a4a5e'), hor); a_prPajaros(R, t + 9, F, 3, Math.round(hor * 0.55), 15, luz === 'tarde' ? hex('#4a3050') : hex('#5a5a6e'), hor + 3); }
}

// humo que sube en bocanadas de tres tonos y se va con el viento (sin entrar en las zonas tranquilas); o.caja
// [x0, y0, x1, y1]: no sale de ahí (el humo que se ve por una ventana)
function a_prHumo(R, x, y, t, tn, o = {}) {
  const B = R.buf, n = o.n ?? 6, alto = o.alto ?? 30, viento = o.viento ?? 14, r0 = o.r ?? 1.2, v = o.v ?? 0.16, cj = o.caja;
  const cols = (o.cols ?? [hex('#5a5a66'), hex('#8a8a96'), hex('#b4b4be')]).map(tn);
  for (let k = n - 1; k >= 0; k--) { const u = (t * v + k / n) % 1, cx = x + u * viento + Math.sin(u * 6 + k + t * 0.7) * 2, cy = y - u * alto, r = r0 + u * (o.crece ?? 4);
    for (const [dx, dy, f, c] of [[0.5, 0.8, 1, cols[0]], [0, 0, 0.92, cols[1]], [-0.6, -0.7, 0.55, cols[2]]]) { const rr = r * f;
      for (let yy = Math.floor(cy + dy - rr); yy <= cy + dy + rr; yy++) for (let xx = Math.floor(cx + dx - rr); xx <= cx + dx + rr; xx++) {
        if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || a_prCalma(xx, yy)) continue; if (cj && (xx < cj[0] || xx > cj[2] || yy < cj[1] || yy > cj[3])) continue;
        const d = (xx + 0.5 - cx - dx) ** 2 + (yy + 0.5 - cy - dy) ** 2; if (d > rr * rr) continue;
        if (u > 0.7 && a_prUm(xx, yy) < (u - 0.7) * 3.3) continue; B[yy * 320 + xx] = c; } } }
}

// una humareda espesa (un incendio ya apagado): muchas bocanadas que se funden en una columna gris, oscura abajo y clara
// arriba, de bordes tramados, que sube alto y se tumba con el viento; nunca brasas ni llamas
function a_prHumareda(R, x, y, t, tn, o = {}) {
  const B = R.buf, n = o.n ?? 16, alto = o.alto ?? 90, viento = o.viento ?? 70, r0 = o.r ?? 3, crece = o.crece ?? 9, v = o.v ?? 0.06;
  const cs = [hex('#3e3a40'), hex('#5e5a62'), hex('#827e86'), hex('#a6a2a8'), hex('#c4c0c4')].map(tn);
  const L = []; for (let k = 0; k < n; k++) L.push((t * v + k / n) % 1); L.sort((a, b) => b - a);
  for (const u of L) { const k = Math.round(u * 1000), cx = x + u * u * viento + Math.sin(u * 7 + t * 0.5 + k) * 4 + Math.sin(u * 13 + t * 0.9) * 2, cy = y - u * alto + Math.sin(u * 9 + k) * 2, r = r0 + u * crece, col = cs[Math.min(4, Math.floor(u * 5))];
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) {
      if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || a_prCalma(xx, yy)) continue; const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue;
      const um = a_prUm(xx, yy); if (d > 0.7 && um < (d - 0.7) * 3.3) continue; if (u > 0.55 && um < (u - 0.55) * 2.3) continue;
      B[yy * 320 + xx] = col; } }
}

// un halo de luz que se mezcla con lo que hay (la vela, la estufa, las rendijas); a: fuerza
function a_prHalo(R, cx, cy, r, c, a) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (d >= 1) continue; const k = a * (1 - d) * (1 - d); if (k > 0.03 + a_prUm(x, y) * 0.05) B[y * 320 + x] = a_prMez(B[y * 320 + x], c, k); }
}

// montañas: perfil con ruido, luz en las laderas que miran a la izquierda, árboles en puntos y pinos en la cresta
function a_prMontes(R, base, amp, [cL, c, cS], sem, hasta, o = {}) {
  const B = R.buf, alt = (x) => base - amp * (0.5 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.14 + sem * 3.1));
  for (let x = 0; x < 320; x++) { const top = Math.round(alt(x)), luz = alt(x + 2) - alt(x - 2) > 0;
    for (let y = Math.max(0, top); y <= hasta; y++) { let col = y === top ? (luz ? cL : c) : luz && (y - top) < 6 && a_prUm(x, y) < 0.5 ? cL : c;
      if (o.arboles && h(x, y, sem) < 0.16) col = cS; else if (o.arboles && h(x, y, sem + 1) < 0.06) col = cL; if (!luz && (y - top) > 2 && a_prUm(x, y) < 0.3) col = cS;
      B[y * 320 + x] = col; }
    if (o.pinos && h(x, 0, sem + 2) < 0.22) { const a = 2 + Math.floor(h(x, 1, sem) * 4); for (let j = 0; j < a; j++) { const y = top - j; if (y >= 0) B[y * 320 + x] = cS; if (j < a - 1 && j % 2 === 0 && y >= 0) { if (x > 0) B[y * 320 + x - 1] = cS; if (x < 319) B[y * 320 + x + 1] = cS; } } } }
  return alt;
}

// tablas de madera gastada con vetas, nudos, clavos, juntas y la mugre de abajo; o.horiz: tablas tumbadas; o.ancho
function a_prTablas(R, x0, y0, x1, y1, [cL, c, cS, cJ], sem = 0, o = {}) {
  const B = R.buf, an = o.ancho ?? 6, hz = !!o.horiz, tonos = [c, a_prMez(c, cL, 0.3), a_prMez(c, cS, 0.28), a_prMez(c, cL, 0.12), a_prMez(c, cS, 0.12)];
  const veta = a_prMez(c, cS, 0.55), clavo = hex('#9a9aa2'), mugre = o.mugre ?? 5;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const u = hz ? y - y0 : x - x0, v = hz ? x : y, k = Math.floor(u / an), r = u - k * an, tono = Math.floor(h(k, 3, sem) * 5);
    let col = tonos[tono];
    const corte = Math.floor(h(k, 9, sem) * 60) + (hz ? x0 : y0);
    if (r === an - 1 || v === corte) col = cJ; else if (r === 0) col = a_prMez(tonos[tono], cL, 0.4);
    else if (h(k * 7 + r, Math.floor(v / (hz ? 7 : 5)), sem) < 0.17) col = veta;
    else if (h(k, Math.floor(v / 16), sem + 1) < 0.1 && r === (an >> 1) && v % 16 > 6 && v % 16 < 10) col = cS;
    if ((v - (hz ? x0 : y0)) % 22 === 3 && r === 1 && h(k, 5, sem) < 0.7) col = clavo;
    if (!hz && y1 - y < mugre && a_prUm(x, y) < (mugre - (y1 - y)) / mugre) col = cS;
    if (h(x, y, sem + 4) < 0.025) col = cS;
    B[y * 320 + x] = col;
  }
}

// chapa ondulada con óxido (para poligono: devuelve el color de (x, y)); cols [luz, base, sombra, óxido, óxido oscuro]
const a_prChapa = ([cL, c, cS, ox, oxS], sem = 0) => (x, y) => {
  if ((y + Math.floor(x / 22) * 4) % 10 === 0) return cS;
  if (h(x >> 3, y >> 2, sem) < 0.26 && h(x, y, sem) < 0.8) return h(x >> 1, y, sem + 1) < 0.5 ? ox : oxS;
  const m = x % 3; return m === 0 ? cL : m === 2 ? cS : c;
};

// suelo de tierra y polvo de carbón: [luz, base, sombra, carbón]; motas, piedrecitas
function a_prTierra(R, x0, y0, x1, y1, [cL, c, cS, cK], sem = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const q = h(x, y, sem), g = h(x >> 3, y >> 2, sem + 1);
    let k = g < 0.3 ? a_prMez(c, cS, 0.35) : g > 0.8 ? a_prMez(c, cL, 0.3) : c;
    if (q < 0.07) k = cS; else if (q < 0.1) k = cK; else if (q > 0.96) k = cL;
    B[y * 320 + x] = k;
  }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 140; k++) { const x = Math.floor(x0 + h(k, 1, sem + 7) * (x1 - x0)), y = Math.floor(y0 + h(k, 2, sem + 7) * (y1 - y0)); R.rect(x, y, x + 1, y, cS); R.pset(x, y - 1, cL); }
}

// maderas de las casas del 12 [luz, base, sombra, junta] (las del 20) y la chapa de sus tejados
const a_prMAD = [a_prH('#9a9088 #7a7068 #5a524c #3a3430'), a_prH('#8a8478 #6a6458 #4e4a40 #34302a'), a_prH('#a09484 #7e7262 #5c5246 #3a332c'), a_prH('#8c8a8e #6c6a70 #4e4c52 #2e2c32')];

const a_prCHAPA = a_prH('#a8acb4 #8a8e96 #62666e #9a5a32 #6a3a22');

// una casa de mineros de la Veta (la del 20): tablas, tejado de chapa a dos aguas, ventana, puerta, porche y el tubo de la
// estufa; o.noche: ventana encendida (en luces). x, suelo: esquina de abajo a la izquierda; devuelve { puerta, chimenea, ventana }
function a_prCasa(R, x, suelo, w, alto, sem, o, luces) {
  const { rect, pset, poligono } = R, P = a_prMAD[sem % a_prMAD.length], top = suelo - alto, pico = top - Math.round(w * 0.3);
  const tub = x + Math.round(w * 0.72), chim = [tub + 1, pico + Math.round((tub - x - w / 2) * 0.6) - 6];
  rect(tub, chim[1], tub + 2, top, hex('#3a3a42')); rect(tub, chim[1], tub, top, hex('#6a6a74')); rect(tub - 1, chim[1] - 1, tub + 3, chim[1], hex('#2a2a30'));
  poligono([[x - 4, top + 1], [x + w / 2, pico], [x + w + 4, top + 1]], a_prChapa(a_prCHAPA, sem));
  R.linea(x - 4, top + 1, x + w + 4, top + 1, hex('#3a3a42')); R.linea(x - 4, top + 1, Math.round(x + w / 2), pico, hex('#a8acb4'));
  a_prTablas(R, x, top + 2, x + w, suelo - 1, P, sem, { ancho: 5 + (sem % 2) });
  rect(x, top + 2, x + w, top + 3, P[3]);
  const vx = x + 4, vy = top + 7, vw = Math.min(12, Math.round(w * 0.26)), vh = Math.min(10, alto - 16);
  if (vh > 4) { rect(vx - 1, vy - 1, vx + vw + 1, vy + vh + 1, P[0]); rect(vx, vy, vx + vw, vy + vh, hex('#2a2e3a'));
    for (let j = 0; j <= vh; j++) for (let i = 0; i <= vw; i++) if ((i + j) % 7 < 2 && j < vh * 0.6) pset(vx + i, vy + j, hex('#6a7890'));
    rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, P[0]); rect(vx, vy + (vh >> 1), vx + vw, vy + (vh >> 1), P[0]);
    rect(vx + 1, vy + 1, vx + 2, vy + vh - 1, o.cortina ?? hex('#a89a7a')); rect(vx - 2, vy + vh + 2, vx + vw + 2, vy + vh + 2, P[3]);
    if (o.noche && h(sem, 3, 40) < 0.7) luces.push(() => { for (let j = 0; j <= vh; j++) for (let i = 0; i <= vw; i++) if (i !== vw >> 1 && j !== vh >> 1) pset(vx + i, vy + j, j < vh / 2 ? hex('#f8d888') : hex('#e8a850')); }); }
  const px = x + w - Math.round(w * 0.36), pw = Math.max(7, Math.round(w * 0.2)), py = suelo - Math.min(alto - 4, 17);
  rect(px - 1, py - 1, px + pw + 1, suelo - 1, P[3]);
  a_prTablas(R, px, py, px + pw, suelo - 2, [P[0], P[2], P[3], P[3]], sem + 5, { ancho: 3, mugre: 2 }); pset(px + pw - 2, py + 8, hex('#c8a040'));
  if (o.porche) { const a = x - 2, b = x + w + 2, ty = py - 4;
    rect(a, suelo - 3, b, suelo - 1, P[2]); for (let i = a; i <= b; i += 4) pset(i, suelo - 2, P[3]); rect(a, suelo - 3, b, suelo - 3, P[0]);
    for (const q of [a + 1, b - 1]) { rect(q, ty, q + 1, suelo - 3, P[1]); pset(q, ty, P[0]); }
    poligono([[a - 2, ty + 1], [a - 2, ty - 2], [b + 2, ty - 3], [b + 2, ty + 1]], a_prChapa(a_prCHAPA, sem + 3)); R.linea(a - 2, ty + 1, b + 2, ty + 1, hex('#3a3a42')); }
  return { puerta: [px, px + pw, py], chimenea: chim, ventana: [vx, vy, vx + vw, vy + vh] };
}

// una casita lejana de la Veta (6–16 px): tablas grises, tejado de chapa, ventanita y el tubo de la estufa; devuelve la chimenea
function a_prCasita(R, x, base, w, alto, sem) {
  const { rect, pset, poligono } = R, P = a_prMAD[sem % 4], top = base - alto, pico = top - Math.round(w * 0.32);
  for (let y = top; y < base; y++) for (let i = 0; i < w; i++) pset(x + i, y, i % 3 === 2 ? P[2] : h(i, y, sem) < 0.15 ? P[0] : P[1]);
  rect(x + w - 1, top, x + w - 1, base - 1, P[3]);
  poligono([[x - 2, top + 1], [x + w / 2, pico], [x + w + 2, top + 1]], a_prChapa(a_prCHAPA, sem)); R.linea(x - 2, top, Math.round(x + w / 2), pico, hex('#b0b4bc'));
  rect(x + 2, top + 2, x + 3, top + 3, hex('#2a2e3a')); rect(x + w - 4, base - 5, x + w - 3, base - 1, P[3]);
  const cx = x + Math.round(w * 0.7); rect(cx, pico + 1, cx, top, hex('#3a3a42')); return [cx, pico];
}

// una persona pequeña de fondo (x centro, y pies; 6–16 px): o.anda, o.dir, o.brazo ('arriba': se tapa la boca o saluda),
// o.casco; cols { ropa, pantalon, piel, pelo }
function a_prFigura(R, x, y, t, cols, o = {}) {
  const { rect, pset } = R, tn = o.tn ?? ((c) => c), a = o.alto ?? 10, dir = o.dir ?? 1;
  const cab = Math.max(2, Math.round(a * 0.3)), tron = Math.max(3, Math.round(a * 0.4)), pier = Math.max(1, a - cab - tron);
  const w = Math.max(3, Math.round(a * 0.34)), xl = Math.round(x - w / 2), xr = xl + w - 1, yT = y - pier - tron + 1, yC = yT - cab;
  const paso = o.anda ? Math.floor(t * 7 + x * 0.21) % 2 : 0, pc = tn(cols.pantalon ?? hex('#3a3a44')), rp = tn(cols.ropa), rpS = tn(a_prMez(cols.ropa, C.k, 0.35)), rpL = tn(a_prMez(cols.ropa, C.blanco, 0.25));
  rect(xl, y - pier + 1, xl, y - (paso ? 1 : 0), pc); rect(xr, y - pier + 1, xr, y - (paso ? 0 : 1), pc);
  rect(xl, yT, xr, y - pier, rp); rect(dir > 0 ? xl : xr, yT, dir > 0 ? xl : xr, y - pier, rpS); rect(dir > 0 ? xr : xl, yT, dir > 0 ? xr : xl, yT + 1, rpL);
  const bx = dir > 0 ? xr + 1 : xl - 1, sw = o.anda ? (Math.floor(t * 7 + x * 0.21) % 2 ? 1 : 0) : 0;
  if (o.brazo === 'arriba') { const up = Math.sin(t * 1.3 + x) > 0; rect(bx, yT - (up ? 1 : 0), bx, yT + 1, rpS); pset(bx, yT - (up ? 2 : 1), tn(cols.piel)); }
  else { rect(bx, yT + 1, bx, yT + tron - 1 + sw, rpS); pset(bx, yT + tron + sw, tn(cols.piel)); }
  rect(xl, yC, xr, yT - 1, tn(cols.piel)); rect(xl, yC, xr, yC, tn(cols.pelo)); pset(dir > 0 ? xl : xr, yC + 1, tn(cols.pelo)); if (cab > 2) pset(dir > 0 ? xr : xl, yC + 1, C.k);
  if (o.casco) { rect(xl - 1, yC - 1, xr + 1, yC, tn(hex('#5a5a62'))); pset(dir > 0 ? xr + 1 : xl - 1, yC, hex('#fff2a0')); }
  if (o.pañuelo) rect(xl, yC, xr, yC, tn(o.pañuelo));
}

// los colores de la gente del 12 (los del 20): ropa gastada gris, parda, azul lavado; piel y pelo
const a_prGENTE = [
  { ropa: hex('#6a6a74'), pantalon: hex('#3a3a44'), piel: hex('#e0b090'), pelo: hex('#2a2024') },
  { ropa: hex('#7a5a44'), pantalon: hex('#4a3e34'), piel: hex('#c8946a'), pelo: hex('#1e1a1c') },
  { ropa: hex('#5a6a80'), pantalon: hex('#2e3440'), piel: hex('#f0c8a0'), pelo: hex('#5a3a22') },
  { ropa: hex('#8a8070'), pantalon: hex('#4a443a'), piel: hex('#8a5a3a'), pelo: hex('#1a1416') },
  { ropa: hex('#7a3e3a'), pantalon: hex('#3a3034'), piel: hex('#e8bc98'), pelo: hex('#c8a060') },
];

// un pino (x centro, base, alto) en tres tonos, con un toque de luz en el lado del sol
function a_prPino(R, x, base, alto, [cL, c, cS], tronco) {
  const { poligono, rect } = R, pisos = Math.max(2, Math.round(alto / 6));
  rect(x, base - 3, x + 1, base, tronco);
  for (let j = 0; j < pisos; j++) { const y = base - 3 - j * (alto - 3) / pisos, w = (pisos - j) * alto * 0.11 + 1.5, ap = (alto - 3) / pisos * 1.5;
    poligono([[x + 0.5, y - ap], [x - w, y], [x + 1 + w, y]], c); poligono([[x + 0.5, y - ap], [x + 1 + w, y], [x + 1, y]], cS); R.pset(Math.round(x - w * 0.5), Math.round(y - 1), cL); R.pset(Math.round(x - w * 0.3), Math.round(y - 2), cL); }
}

// un racimo de hojas en tres tonos (cx, cy, r), con el borde de la derecha encendido por la luz (luz: color o null)
function a_prHojas(R, cx, cy, r, [cL, c, cS], sem, luz) {
  const B = R.buf, bolas = [[0, 0, 0.62]], borde = luz ? a_prMez(cL, luz, 0.45) : cL;
  for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + h(k, 1, sem) * 0.8; bolas.push([Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.42, 0.34 + h(k, 2, sem) * 0.18]); }
  for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r * 1.2); x <= cx + r * 1.2; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    let dentro = false, sub = 1; for (const [bx, by, f] of bolas) { const dd = ((x - cx - bx) ** 2 + (y - cy - by) ** 2) / (f * r) ** 2; if (dd < 1) { dentro = true; sub = Math.min(sub, dd); } }
    if (!dentro || (sub > 0.7 && h(x, y, sem) < 0.45)) continue;
    const dx = (x - cx) / r, dy = (y - cy) / r, q = h(x >> 1, y >> 1, sem + 1);
    let k = dy > 0.25 ? cS : q < 0.3 ? cS : c; if (dy < -0.1 && q > 0.6) k = cL; if (dx > 0.6 && dy < 0.3 && q > 0.35) k = borde; if (dy > 0.55 && q < 0.6) k = a_prMez(cS, hex('#000000'), 0.25);
    B[y * 320 + x] = k; }
}

// un tronco o una rama gruesa de (x0, y0) a (x1, y1), de grosor w0 a w1, con corteza de surcos, luz y sombra y musgo
function a_prRama(R, x0, y0, x1, y1, w0, w1, [cL, c, cS, cK], sem = 0, musgo = 0) {
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.ceil(L), B = R.buf, nx = (x1 - x0) / L, ny = (y1 - y0) / L;
  for (let i = 0; i <= n; i++) { const u = i / n, cx = x0 + (x1 - x0) * u + Math.sin(u * 7 + sem) * w0 * 0.06, cy = y0 + (y1 - y0) * u, r = (w0 + (w1 - w0) * u) / 2;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const ex = x + 0.5 - cx, ey = y + 0.5 - cy; if (ex * ex + ey * ey > r * r) continue;
      const per = ex * ny - ey * nx, a = ex * nx + ey * ny + i, q = per / r, lado = ny >= 0 ? -q : q;
      let k = lado > 0.4 ? cL : lado < -0.45 ? cS : c; if (Math.abs(q) > 0.86) k = cK;
      const surco = per + Math.sin(a * 0.25 + Math.floor(per / 3.2)) * 0.9 + 100, s3 = Math.floor(surco / 3.2);
      if (surco % 3.2 < 1 && h(s3, Math.floor(a / 7), sem) < 0.75) k = lado > 0.4 ? c : cK; else if (surco % 3.2 < 1.8 && lado > 0.4 && h(s3, Math.floor(a / 5), sem + 3) < 0.3) k = a_prMez(cL, C.blanco, 0.15);
      if (musgo && lado < -0.1 && h(x >> 1, y >> 1, sem + 2) < musgo) k = h(x, y, sem) < 0.5 ? hex('#4a6a2e') : hex('#6a8a3a');
      B[y * 320 + x] = k; } }
}

// las cortezas y follajes del bosque del 12
const a_prCORTEZA = a_prH('#8a6a52 #5e4a3a #3e3028 #241c18'), a_prFOLLAJE = a_prH('#6a8a3e #3e5e2e #263e22');

// guarda qué píxeles cambia un dibujo (para devolverlos tal cual en pradoDelante, por delante de los actores)
function a_prMarca(R, x0, y0, x1, y1, dibuja) {
  const B = R.buf, antes = B.slice(), m = new Uint8Array(57600); dibuja();
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x; if (B[i] !== antes[i]) m[i] = 1; }
  return { m, r: [x0, y0, x1, y1] };
}

// copia del búfer fijo los píxeles marcados (un tronco, una mesa, unas cajas): así tapan a quien está detrás
function a_prDevuelve(R, F, M) { const B = R.buf, [x0, y0, x1, y1] = M.r; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x; if (M.m[i]) B[i] = F.b[i]; } }

// a_oca(R, x, y, t, o): UNA OCA blanca de pico y patas naranjas (x centro, y pies; 14 × 16 px, contorno gris oscuro para
// que se lea en cualquier luz). o.dir (1: mira a la derecha), o.modo: 'camina' | 'pasta' (el cuello abajo, picotea) |
// 'estira' (el cuello arriba y grazna con el pico abierto) | 'aletea' (las alas arriba y abajo) | 'corre' (el cuello
// por delante, las alas medio abiertas: para perseguir a Atom) | 'quieta' (respira y gira la cabeza) | 'nada' (en el
// agua, sin patas, con ondas); o.tn: el tinte de la luz; o.k: su fase. Exportada: las escenas la usan para la oca que
// persigue a Atom. Devuelve { pico: [x, y] } (donde se engancha la órbita robada) y cabeza: [x, y].
export function a_oca(R, x, y, t, o = {}) {
  const tn = o.tn ?? ((c) => c), dir = o.dir ?? 1, k = o.k ?? 0, modo = o.modo ?? 'camina', B = R.buf;
  const c = tn(hex('#f6f4ee')), cL = tn(hex('#ffffff')), cS = tn(hex('#cfccc4')), cSS = tn(hex('#a4a198')), cK = tn(hex('#4a4842')), na = tn(hex('#f39030')), naS = tn(hex('#b85a1a')), ojo = hex('#1a1a1a');
  const corre = modo === 'corre', nada = modo === 'nada', fr = Math.floor(t * (corre ? 14 : 6) + k), bob = (modo === 'camina' || corre) && fr % 2 ? 1 : 0;
  const yb = y - (nada ? -4 : 0);   // en el agua, el cuerpo va 4 px más abajo (la línea del agua es y)
  const P = []; const r = (i0, i1, j0, j1, col, sinBorde) => P.push([i0, i1, j0, j1, col, sinBorde]);
  // las alas de detrás (al aletear) van antes del cuerpo
  const ala = modo === 'aletea' ? (fr % 3) : corre ? (fr % 2 ? 1 : 2) : -1;
  if (ala === 0) { r(-3, 1, -16, -10, cS); r(-5, -2, -19, -16, cS); r(-6, -5, -21, -19, cSS); }
  // el cuerpo (de lado, con la cola levantada)
  r(-4, 1, -9, -9, cL); r(-6, 3, -8, -8, c); r(-7, 3, -7, -7, c); r(-7, 4, -6, -6, c); r(-6, 4, -5, -5, c); r(-5, 3, -4, -4, cS); r(-3, 2, -3, -3, cS);
  r(-8, -8, -9, -8, c); r(-9, -9, -10, -9, cS);
  r(-5, 1, -6, -6, cS); r(-6, -6, -7, -7, cSS); r(2, 2, -5, -5, cS);   // el ala plegada y su borde
  // el cuello y la cabeza
  let hx = 0, hy = 0, pico = [0, 0];
  const cabeza = (i, j, abre) => { r(i + 1, i + 2, j, j, c); r(i, i + 3, j + 1, j + 3, c); r(i, i + 3, j + 3, j + 3, cS); r(i + 1, i + 2, j, j, cL);
    r(i + 4, i + 5, j + 1, j + 1, na); r(i + 4, i + 5, j + 2, j + 2, abre ? na : naS); if (abre) { r(i + 4, i + 5, j + 3, j + 3, naS); } r(i + 4, i + 4, j + 1, j + 1, naS, true);
    hx = i; hy = j; pico = [i + 6, j + 2]; };
  if (modo === 'pasta') { const p = Math.sin(t * 9 + k * 2) > 0.2 ? 1 : 0; r(3, 4, -9, -7, c); r(4, 5, -7, -5, c); r(5, 6, -5, -4, c); cabeza(5, -5 + p, false); }
  else if (modo === 'estira') { const abre = Math.sin(t * 6 + k) > 0.3; r(3, 4, -18, -8, c); r(3, 3, -14, -9, cS); cabeza(3, -21, abre);
    if (abre) for (const [a, b] of [[9, -22], [10, -24], [10, -20]]) P.push([a, a, b, b, tn(hex('#fffbe0')), true]); }
  else if (corre) { r(3, 5, -10, -9, c); r(5, 7, -11, -10, c); r(7, 8, -12, -11, c); cabeza(8, -14, Math.sin(t * 10) > 0); }
  else { const gira = modo === 'quieta' && Math.sin(t * 0.7 + k * 1.3) > 0.6 ? -1 : 0, res = modo === 'quieta' ? (Math.sin(t * 1.6 + k) > 0 ? 1 : 0) : 0;
    r(3, 4, -14 + res, -8, c); r(3, 3, -13 + res, -9, cS); cabeza(3 + gira, -17 + res, false); }
  // el ala de delante (al aletear o al correr)
  if (ala === 1) { r(-6, 1, -11, -9, c); r(-9, -5, -12, -11, c); r(-11, -9, -13, -12, cS); r(-6, 0, -9, -9, cS); }
  else if (ala === 2) { r(-8, 1, -8, -7, c); r(-12, -8, -7, -6, c); r(-13, -11, -6, -5, cS); r(-11, -5, -6, -6, cSS); }
  else if (ala === 0) { r(-2, 1, -14, -9, c); r(-4, -1, -17, -14, c); r(-5, -3, -19, -17, cL); r(-4, -4, -15, -12, cSS); r(-1, -1, -13, -11, cSS); }
  const X = (i) => x + i * dir, pon = (px, py, col) => { if (px >= 0 && px < 320 && py >= 0 && py < 180 && (!nada || py <= y)) B[py * 320 + px] = col; };
  const Y = (j) => yb + j - bob;
  // la sombra en el suelo (o las ondas del agua)
  if (nada) { const ond = Math.sin(t * 3 + k); for (let i = -10; i <= 8; i++) { const px = x + i, py = y + 1 + ((i + Math.round(ond * 2)) % 5 === 0 ? 1 : 0); if (px >= 0 && px < 320 && py < 180 && (i + k) % 3) B[py * 320 + px] = a_prMez(B[py * 320 + px], hex('#ffffff'), 0.35); } }
  else for (let i = -6; i <= 6; i++) { const px = x + i; if (px >= 0 && px < 320 && y + 1 < 180) B[(y + 1) * 320 + px] = a_prMez(B[(y + 1) * 320 + px], hex('#1a2a14'), Math.abs(i) > 4 ? 0.25 : 0.45); }
  // el contorno (todo un píxel más grande) y luego el relleno
  for (const [i0, i1, j0, j1, , sb] of P) { if (sb) continue; for (let j = j0 - 1; j <= j1 + 1; j++) for (let i = i0 - 1; i <= i1 + 1; i++) pon(X(i), Y(j), cK); }
  for (const [i0, i1, j0, j1, col] of P) for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) pon(X(i), Y(j), col);
  pon(X(hx + 2), Y(hy + 1), ojo);
  // las patas (naranja con su sombra) y los pies palmeados
  if (!nada) { const pa = (corre || modo === 'camina') ? fr % 2 : 0;
    for (const [i, alza] of [[-1, pa], [1, 1 - pa]]) { pon(X(i), Y(-2) + bob, na); pon(X(i), Y(-1) + bob - alza, naS); pon(X(i), y - alza, na); pon(X(i + 1), y - alza, na); } }
  return { pico: [x + pico[0] * dir, Y(pico[1])], cabeza: [x + (hx + 1) * dir, Y(hy + 1)] };
}

// dónde está cada oca y qué hace, en función de t (puro: lo mismo que se dibuja es lo que se devuelve). bases [[x, y]…];
// o.ocasQuietas: quietas (el amanecer triste); o.fila: caminan en fila de izquierda a derecha por y = o.fila (número) o
// por la primera base (en t = 0 la primera va en x 100 y las demás detrás, cada 17 px; 9 px/s); si no, cada una pasea, pasta, se estira y aletea a su ritmo
function a_prOcas(t, n, bases, o) {
  const L = [];
  for (let k = 0; k < n; k++) { const [bx, by] = bases[k % bases.length];
    if (o.ocasQuietas) { L.push({ x: bx, y: by, dir: k % 2 ? -1 : 1, modo: 'quieta', k }); continue; }
    if (o.fila) { const yf = typeof o.fila === 'number' ? o.fila : bases[0][1], x = Math.round(((t * 9 - k * 17 + 130) % 380 + 380) % 380 - 30); L.push({ x, y: yf + (k % 2), dir: 1, modo: 'camina', k }); continue; }
    const q = t + k * 2.7, P = 8, ni = Math.floor(q / P), f = q - ni * P, ida = (ni + k) % 2 === 0, w = Math.min(1, f / 2.5);
    const x = Math.round(bx - 7 + (ida ? w * 14 : 14 - w * 14)), modo = f < 2.5 ? 'camina' : f < 5.4 ? 'pasta' : f < 6.6 ? ((ni + k) % 2 ? 'aletea' : 'estira') : 'pasta';
    L.push({ x, y: by, dir: ida ? 1 : -1, modo, k }); }
  return L;
}

// la pradera de verano: verdes del lejos al cerca, manchas, trazos de hierba, matas pajizas y flores silvestres (más
// grandes cuanto más cerca)
const a_prPRA = a_prH('#b4d878 #92c25a #74aa48 #5a903c #42742e #c8c47a #2e5826');

const a_prFLOR = a_prH('#f6f4ea #f2d240 #b08ae0 #ee8eb0 #fff8c0');

function a_prPradera(R, x0, y0, x1, y1, sem) {
  const B = R.buf, G = a_prPRA;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), b = u < 0.22 ? 1 : u < 0.55 ? 2 : 3;
    for (let x = x0; x <= x1; x++) { const q = h(x, y, sem), g = h(x >> 3, y >> 2, sem + 1), s = h(x >> 4, y >> 3, sem + 2);
      let k = G[b]; if (g < 0.2) k = G[b - 1]; else if (g > 0.84) k = G[b + 1];
      if ((x + (y >> 1) * 2) % (u < 0.4 ? 5 : 3) === 0 && q < 0.5) k = G[Math.min(6, b + 1)]; else if (q > 0.95) k = G[Math.max(0, b - 1)];
      if (s < 0.09 && q < 0.6) k = G[5];
      B[y * 320 + x] = k; } }
  // las flores: puntos lejos, cruces de cuatro pétalos cerca, en corros
  const n = Math.round((x1 - x0) * (y1 - y0) / 26);
  for (let k = 0; k < n; k++) { const corro = Math.floor(k / 6), cx = x0 + h(corro, 1, sem + 5) * (x1 - x0), cy = y0 + Math.sqrt(h(corro, 2, sem + 5)) * (y1 - y0);
    const x = Math.round(cx + (h(k, 3, sem + 5) - 0.5) * 22), y = Math.round(cy + (h(k, 4, sem + 5) - 0.5) * 8); if (x < x0 || x > x1 || y < y0 || y > y1) continue;
    const u = (y - y0) / Math.max(1, y1 - y0), f = a_prFLOR[Math.floor(h(corro, 6, sem + 5) * 4)];
    if (u < 0.35) { B[y * 320 + x] = f; continue; }
    R.pset(x, y + 1, G[4]); if (u > 0.6) { R.pset(x - 1, y, f); R.pset(x + 1, y, f); R.pset(x, y - 1, f); R.pset(x, y, hex('#f8c030')); R.pset(x, y + 2, G[4]); } else R.pset(x, y, f); }
}

// las briznas que se mecen: una lista fija [x, y, largo, tono, flor, u] (libre(x, y): si ahí crece hierba)
function a_prBriznasHaz(y0, sem, libre, dens = 1) {
  const L = [];
  for (let y = y0 + 2; y <= 179; y++) { const u = (y - y0) / (179 - y0), n = Math.round((5 + u * 12) * dens);
    for (let k = 0; k < n; k++) { const x = Math.floor(h(k, y, sem) * 320); if (!libre(x, y)) continue;
      L.push([x, y, 2 + Math.round(u * 5 + h(k, y, sem + 1) * 2), Math.floor(h(k, y, sem + 2) * 3), h(k, y, sem + 3) < 0.07 ? 1 + Math.floor(h(k, y, sem + 4) * 4) : 0, u]); } }
  return L;
}

// lo vivo de la hierba: cada brizna se dobla con el viento, en ondas que cruzan el prado (la cresta, más clara)
const a_prBRI = a_prH('#4a8434 #66a244 #8ac05c #c0e290');

function a_prBriznas(R, t, L, tn, fuerza = 1) {
  const B = R.buf, cs = a_prBRI.map(tn), fl = a_prFLOR.map(tn);
  for (const [x, y, len, ci, flor, u] of L) { const ph = Math.sin(t * 1.7 - x * 0.035 + y * 0.05), m = (ph * (0.8 + u * 1.4) + Math.sin(t * 0.6 + y * 0.1) * 0.5) * fuerza, cresta = ph > 0.7;
    for (let j = 0; j < len; j++) { const px = x + Math.round(m * (j / len) ** 1.4), py = y - j; if (px < 0 || px > 319 || py < 0) continue;
      B[py * 320 + px] = j === len - 1 ? (cresta ? cs[3] : cs[2]) : cresta && j > 0 ? cs[2] : cs[ci === 0 ? 0 : 1]; }
    if (flor) { const px = x + Math.round(m), py = y - len; if (px >= 0 && px < 319 && py >= 0) { B[py * 320 + px] = fl[flor - 1]; if (u > 0.55) B[py * 320 + px + 1] = fl[flor - 1]; } } }
}

// matas de hierba alta que se mecen (por delante), en una fila de x0 a x1 con la base en y
function a_prMatas(R, t, x0, x1, y, n, tn, sem, alto = 6) {
  const cs = a_prH('#a8c86a #4a7a32 #6a9a3e').map(tn);
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, 1, sem) * (x1 - x0)), a = alto + Math.round(h(k, 2, sem) * alto * 0.6), m = Math.sin(t * 1.6 + x * 0.1);
    for (let b = -2; b <= 2; b++) for (let j = 0; j < a - Math.abs(b); j++) R.pset(Math.round(x + b + m * j / a * 2 + b * j * 0.15), y - j, j > a * 0.6 ? cs[0] : b % 2 ? cs[1] : cs[2]); }
}

// mariposas que revolotean (dos alas que se abren y se cierran)
function a_prMariposas(R, t, n, x0, x1, y0, y1, tn, sem) {
  const cols = a_prH('#f0c840 #f4f4f0 #e87a3a #8ab8f0');
  for (let k = 0; k < n; k++) { const u = t * 0.11 + h(k, 1, sem) * 7, x = Math.round(x0 + (x1 - x0) * (0.5 + 0.46 * Math.sin(u * 2.1 + k))), y = Math.round(y0 + (y1 - y0) * (0.5 + 0.42 * Math.sin(u * 3.3 + k * 2)) + Math.sin(t * 6 + k) * 2);
    const ab = Math.floor(t * 11 + k * 3) % 2, c = tn(cols[k % 4]), cS = tn(a_prMez(cols[k % 4], C.k, 0.35)), cu = tn(hex('#2a2a2a'));
    R.pset(x, y, cu); R.pset(x, y + 1, cu);
    if (ab) { R.rect(x - 2, y - 2, x - 1, y, c); R.rect(x + 1, y - 2, x + 2, y, c); R.pset(x - 2, y - 2, cS); R.pset(x + 2, y - 2, cS); R.pset(x - 1, y + 1, cS); R.pset(x + 1, y + 1, cS); }
    else { R.rect(x - 1, y - 3, x - 1, y, c); R.rect(x + 1, y - 3, x + 1, y, c); } }
}

// libélulas azules que se paran en el aire y salen disparadas sobre la charca
function a_prLibelulas(R, t, cx, cy, rx, ry, n, tn) {
  const az = tn(hex('#3a7ad8')), azL = tn(hex('#7ac0f0')), al = tn(hex('#e0f4ff'));
  for (let k = 0; k < n; k++) { const s = t * 0.5 + k * 3.1, salto = Math.floor(s), f = s - salto, a0 = h(salto, k, 70) * 6.28, a1 = h(salto + 1, k, 70) * 6.28, e = f < 0.75 ? 0 : (f - 0.75) * 4;
    const ax = Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * e, ay = Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * e, x = Math.round(cx + ax * rx), y = Math.round(cy + ay * ry + Math.sin(t * 5 + k) * 0.8);
    R.rect(x - 2, y, x + 2, y, az); R.pset(x + 2, y, azL); const w = Math.floor(t * 30 + k) % 2; R.pset(x, y - 1, al); R.pset(x - 1, y - 1 - w, al); R.pset(x + 1, y - 1 - w, al); }
}

// luciérnagas que se encienden y se apagan (de noche y al anochecer)
function a_prLuciernagas(R, t, x0, x1, y0, y1, n, sem = 0) {
  for (let k = 0; k < n; k++) { const on = Math.sin(t * 2.3 + k * 1.9 + sem); if (on < 0.2) continue;
    const x = Math.round(x0 + ((h(k, 1, 90 + sem) * (x1 - x0) + Math.sin(t * 0.5 + k) * 8 + (x1 - x0)) % (x1 - x0))), y = Math.round(y0 + h(k, 2, 90 + sem) * (y1 - y0) + Math.sin(t * 0.8 + k * 3) * 4);
    if (a_prCalma(x, y) || x < 1 || x > 318 || y < 1 || y > 178) continue; R.pset(x, y, on > 0.7 ? hex('#f8ffa0') : hex('#c8e070'));
    if (on > 0.7) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const i = (y + dy) * 320 + x + dx; R.buf[i] = a_prMez(R.buf[i], hex('#d8f070'), 0.45); } }
}

// juncos y espadañas de la orilla (lista fija [x, y, alto, tipo]; tipo 1: con la espiga parda) que se mecen
function a_prJuncos(R, t, L, tn) {
  const cs = a_prH('#3e6a2e #5e8a3a #8aae52').map(tn), esp = tn(hex('#6a4426')), espL = tn(hex('#9a6a3a'));
  for (const [x, y, al, tipo] of L) { const m = Math.sin(t * 1.3 + x * 0.15) + Math.sin(t * 0.5 + x * 0.05) * 0.5;
    for (let j = 0; j < al; j++) { const px = Math.round(x + m * (j / al) ** 2 * 3 + (tipo === 2 ? (j / al) ** 2 * 4 : 0)), py = y - j;
      if (tipo === 1 && j >= al - 6 && j < al - 1) { R.pset(px, py, esp); R.pset(px + 1, py, j === al - 3 ? espL : esp); } else R.pset(px, py, cs[(j + x) % 4 === 0 ? 2 : j < 3 ? 0 : 1]); } }
}

// una charca (elipse) que refleja lo que tiene encima (cielo, bosque, alambrada) con ondas; devuelve su máscara
function a_prCharca(R, cx, cy, rx, ry, sem, refl = 2.4) {
  const B = R.buf, agua = hex('#2e5a7a'), y0 = Math.round(cy - ry), m = new Uint8Array(57600);
  for (let y = y0; y <= cy + ry; y++) for (let x = Math.max(0, Math.round(cx - rx)); x <= Math.min(319, cx + rx); x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e > 1) continue;
    const d = y - y0, sy = Math.max(0, Math.round(y0 - 1 - d * refl)), sx = Math.max(0, Math.min(319, x + Math.round(Math.sin(y * 1.1 + x * 0.04) * 1.2)));
    let c = a_prMez(B[sy * 320 + sx], agua, 0.22 + 0.4 * d / (2 * ry));
    if ((y * 7 + (x >> 3) * 5) % 11 === 0 && h(x >> 2, y, sem) < 0.4) c = a_prMez(c, hex('#ffffff'), 0.16);
    if (e > 0.8 && y < cy) c = a_prMez(c, hex('#1a3020'), 0.45);
    B[y * 320 + x] = c; m[y * 320 + x] = 1; }
  // la orilla: barro claro delante, sombra de hierba detrás, piedras
  for (let x = Math.max(0, Math.round(cx - rx)); x <= Math.min(319, cx + rx); x++) { const u = (x - cx) / rx; if (Math.abs(u) > 1) continue; const yb = Math.round(cy + ry * Math.sqrt(1 - u * u));
    for (let j = 0; j < 3; j++) if (yb + j < 180) { B[(yb + j) * 320 + x] = j === 0 ? hex('#5a4a36') : h(x, j, sem) < 0.3 ? hex('#8a7656') : hex('#6e5c44'); m[(yb + j) * 320 + x] = 1; } }
  for (let k = 0; k < 9; k++) { const a = h(k, 1, sem + 3) * Math.PI, sx = cx + Math.cos(a) * rx * 0.98, sy = cy + Math.sin(a) * ry + 2, r = 1.2 + h(k, 2, sem + 3) * 1.6; R.disco(sx, sy, r, hex('#7a7468')); R.disco(sx - 0.5, sy - 0.6, r * 0.55, hex('#a8a296')); }
  return m;
}

// nenúfares (hojas redondas con su muesca) y alguna flor blanca y rosa
function a_prNenufares(R, L) {
  for (const [x, y, r, flor] of L) { for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) { const e = (i / (r * 2)) ** 2 + (j / r) ** 2; if (e > 1 || (i > 0 && Math.abs(j) <= 0 && i < r)) continue; R.pset(x + i, y + j, e > 0.6 ? hex('#3a6a2a') : j < 0 ? hex('#6aa046') : hex('#4e8a36')); }
    if (flor) { R.pset(x - 1, y - 1, hex('#f6f0f0')); R.pset(x + 1, y - 1, hex('#f6f0f0')); R.pset(x, y - 2, hex('#f6c8d8')); R.pset(x, y - 1, hex('#f2d040')); } }
}

// la manta de parches de Lenore Dove en la hierba (un paralelogramo en perspectiva), con la costura y una esquina doblada
function a_prManta(R, x0, y0, x1, y1, sesgo) {
  const P = a_prH('#c84a4a #e8b84a #4a8ac8 #ece2c8 #6aa85a #a85ab8'), alto = y1 - y0;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / alto, a = Math.round(x0 - sesgo * u), b = Math.round(x1 + sesgo * 0.4 * u);
    for (let x = a; x <= b; x++) { const pi = Math.floor((x - a) / ((b - a + 1) / 6)), pj = Math.floor(u * 3.999); let c = P[(pi * 2 + pj * 3) % 6];
      if (Math.floor((x - a) * 6 / (b - a + 1) * 2) % 2 === 0 && (y - y0) % 3 === 0) c = a_prMez(c, C.blanco, 0.2);
      if ((x - a) % Math.max(1, Math.round((b - a + 1) / 6)) === 0 || (y - y0) === Math.round(alto * pj / 4)) c = a_prMez(c, hex('#3a2a20'), 0.35);
      if (y === y1) c = a_prMez(c, hex('#2a3a1a'), 0.5); R.pset(x, y, c); } }
  R.poligono([[x1 - 6, y0], [x1, y0], [x1 + 1, y0 + 5]], hex('#d8cfb4')); R.linea(x1 - 6, y0, x1 + 1, y0 + 5, hex('#8a7a5a'));
}

// una cesta de mimbre con su tela (x, y: abajo a la izquierda, w de ancho)
function a_prCesta(R, x, y, w) {
  const { rect, pset } = R, a = Math.round(w * 0.55);
  for (let j = 0; j < a; j++) for (let i = 0; i < w; i++) pset(x + i, y - j, (i + j * 2) % 4 < 2 ? hex('#b88a4a') : hex('#8a6232'));
  rect(x, y - a, x + w - 1, y - a, hex('#d0a060')); rect(x + 1, y - a - 2, x + w - 3, y - a - 1, hex('#e8e0d0')); pset(x + 2, y - a - 2, hex('#c84a4a')); pset(x + 5, y - a - 1, hex('#c84a4a'));
  for (let i = 0; i < w; i++) { const yy = y - a - 2 - Math.round(Math.sin(i / (w - 1) * Math.PI) * a * 0.9); pset(x + i, yy, hex('#8a6232')); }
  rect(x, y + 1, x + w - 1, y + 1, hex('#3a4a24'));
}

// el nido con huevos de oca (x, y: el centro de abajo); uno se mueve de vez en cuando (el gag del final)
function a_prNido(R, x, y, t, tn) {
  const { pset } = R, paja = [hex('#b89a5a'), hex('#8a6a3a'), hex('#d8c080')].map(tn), hu = tn(hex('#f4f0e2')), huS = tn(hex('#cfc8b2'));
  for (let j = 0; j < 5; j++) for (let i = -10; i <= 10; i++) { if (Math.abs(i) > 10 - j * 0.6) continue; pset(x + i, y - j, paja[(i * 3 + j * 5 + 40) % 3]); }
  const mueve = (t % 3.2) < 0.7 ? Math.round(Math.sin(t * 28)) : 0;
  [[-6, 0], [-2, 0], [2, 0], [6, mueve], [0, -2]].forEach(([dx, m], k) => { const ex = x + dx + m, ey = y - 4 - (k === 4 ? 2 : 0);
    for (let j = -4; j <= 0; j++) for (let i = -2; i <= 2; i++) { if ((i * i) / 4 + ((j + 2) * (j + 2)) / 6 > 1.05) continue; pset(ex + i, ey + j, i > 0 || j === 0 ? huS : hu); } pset(ex - 1, ey - 3, tn(C.blanco)); });
  for (let i = -10; i <= 10; i += 2) pset(x + i, y - 4 + (i % 4 ? 0 : 1), paja[1]);
  return [x + 6 + mueve, y - 6];
}

// la bolsa roja de las gominolas, caída en la hierba (x, y: la esquina de abajo a la izquierda de la bolsa): papel rojo
// con contorno, luz a la izquierda y sombra a la derecha, el cuello fruncido atado con un lazo dorado que destella y, al
// lado, las gominolas rojas y doradas desparramadas, cada una con su brillo (ocupa x … x + 24, y − 17 … y + 2)
function a_prGominolas(R, x, y, t, tn) {
  const { rect, pset } = R, K = tn(C.k), rojo = [hex('#ff7a84'), hex('#e0303e'), hex('#b01c2a'), hex('#6a0e18')].map(tn), oro = [hex('#fff4b0'), hex('#f0c040'), hex('#b8841c')].map(tn);
  // la sombra en la hierba
  for (let i = -1; i <= 20; i++) pset(x + i, y + 1, a_prMez(R.buf[(y + 1) * 320 + Math.max(0, Math.min(319, x + i))] ?? 0, C.k, 0.45));
  // el cuerpo: un poco más ancho abajo, con el contorno, la luz y la sombra; dos pliegues del papel
  for (let j = 0; j <= 10; j++) { const yy = y - j, a = j > 7 ? 1 : 0, x0 = x + a, x1 = x + 11 - a;
    for (let xx = x0; xx <= x1; xx++) { const u = (xx - x0) / (x1 - x0); pset(xx, yy, xx === x0 || xx === x1 || j === 0 ? K : u < 0.22 ? rojo[0] : u > 0.72 ? rojo[2] : rojo[1]); } }
  rect(x + 4, y - 8, x + 4, y - 2, rojo[2]); rect(x + 7, y - 7, x + 7, y - 1, rojo[0]); pset(x + 2, y - 8, tn(C.blanco));
  // el cuello fruncido y el volante de papel de arriba
  rect(x + 3, y - 13, x + 8, y - 11, K); rect(x + 4, y - 13, x + 7, y - 11, rojo[1]); pset(x + 4, y - 12, rojo[0]);
  for (let i = 0; i < 8; i++) { const xx = x + 2 + i, a = 14 + (i % 2); pset(xx, y - a - 1, K); rect(xx, y - a, xx, y - 14, i < 3 ? rojo[0] : rojo[1]); }
  // el lazo dorado: la cinta, las dos lazadas y las dos puntas
  rect(x + 2, y - 11, x + 9, y - 10, oro[1]); rect(x + 2, y - 11, x + 9, y - 11, oro[0]);
  for (const s of [-1, 1]) { const cx = x + 5.5 + s * 4.5; rect(Math.round(cx - 1.5), y - 14, Math.round(cx + 1.5), y - 12, oro[1]); pset(Math.round(cx), y - 13, oro[2]); pset(Math.round(cx - s), y - 14, oro[0]);
    pset(Math.round(x + 5.5 + s * 2), y - 9, oro[1]); pset(Math.round(x + 5.5 + s * 3), y - 8, oro[2]); }
  rect(x + 5, y - 12, x + 6, y - 10, oro[2]); pset(x + 5, y - 12, oro[0]);
  if (Math.sin(t * 2.3) > 0.55) { pset(x + 2, y - 15, tn(C.blanco)); pset(x + 1, y - 14, oro[0]); pset(x + 3, y - 14, oro[0]); }
  // las gominolas desparramadas
  for (const [dx, dy, d] of [[14, 0, 0], [17, -2, 1], [19, 1, 0], [15, -4, 0], [22, -1, 1], [12, 2, 0]]) { const cs = d ? oro : rojo;
    rect(x + dx - 1, y + dy - 2, x + dx + 1, y + dy, K); rect(x + dx - 1, y + dy - 1, x + dx + 1, y + dy - 1, cs[1]); pset(x + dx, y + dy - 2, cs[d ? 0 : 1]); pset(x + dx - 1, y + dy - 1, cs[0]); pset(x + dx + 1, y + dy, cs[2]); }
  if (Math.sin(t * 2 + 1) > 0.6) pset(x + 17, y - 3, tn(C.blanco));
}
const a_prPRADO = {
  camaras: ['general', 'cerca'],
  luz: 'dia',
  cielo: (cam) => cam === 'cerca' ? { hor: 70, estratos: [[30, 0.45, 90], [190, 0.6, 70], [100, 0.82, 120]] } : { hor: 86 },
  fijo(R, cam, luz) {
    const { rect, pset, linea, disco, poligono } = R, B = R.buf, dat = {}, noH = new Uint8Array(57600);
    const PINO_L = a_prH('#5a7a62 #446652 #30483c'), PINO = a_prH('#4e7a44 #305a34 #1e3a24'), PINO_C = a_prH('#5a8a4a #3a6a38 #224428');
    if (cam === 'cerca') {
      // el bosque del otro lado de la charca: montes, dos filas de pinos y algún árbol de hoja
      a_prMontes(R, 64, 14, a_prH('#9aa4c0 #8490b0 #6e7a9c'), 1.3, 80);
      a_prMontes(R, 80, 8, a_prH('#5e7a5a #4a6448 #344a36'), 4.2, 94, { arboles: true, pinos: true });
      a_prPradera(R, 0, 92, 319, 179, 401);
      for (let k = 0; k < 44; k++) { const x = Math.round(h(k, 1, 402) * 334) - 7; a_prPino(R, x, 90, 12 + Math.round(h(k, 2, 402) * 12), PINO_L, hex('#2a2420')); }
      a_prBosque(R, 96, -6, 326, 34, 20, 42, 403, (x) => (x > 262 ? 44 : 60));
      // la orilla de enfrente (matas, juncos, una piedra grande), la charca grande con los reflejos y los nenúfares
      for (let x = 0; x < 320; x++) { const y0 = 96 + Math.round(Math.sin(x * 0.07) * 1.2); for (let y = y0; y <= 102; y++) pset(x, y, y === y0 ? hex('#2e4a26') : h(x, y, 404) < 0.5 ? hex('#5a8a3e') : hex('#4a7a34')); }
      for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 411) * 320), r = 3 + h(k, 2, 411) * 3; a_prHojas(R, x, 98, r, a_prH('#5a8a3e #3e6a30 #284a22'), k + 411, null); }
      disco(258, 99, 5, hex('#6a665c')); disco(257, 98, 3.4, hex('#9a968a'));
      const m = a_prCharca(R, 196, 122, 178, 21, 405, 1.6); for (let i = 0; i < 57600; i++) if (m[i]) noH[i] = 1;
      dat.nen = [[96, 116, 3, 0], [118, 130, 4, 1], [140, 112, 2, 0], [262, 134, 4, 0], [286, 120, 3, 1], [70, 136, 3, 0], [200, 138, 3, 0]];
      a_prNenufares(R, dat.nen);
      // la orilla de este lado: corros de flores, piedras, la esquina de la manta con la cesta, el tronco caído
      for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 406) * 320), y = 150 + Math.round(h(k, 2, 406) * 28), r = 1.5 + h(k, 3, 406) * 2.5; if (x > 60 && x < 210 && y < 170) continue; disco(x, y, r, hex('#7a7468')); disco(x - 0.6, y - 0.6, r * 0.6, hex('#a8a296')); }
      a_prManta(R, -10, 166, 44, 179, 6); a_prCesta(R, 8, 174, 14);
      for (let y = 166; y <= 179; y++) for (let x = 0; x < 50; x++) noH[y * 320 + x] = 1;
      dat.tronco = a_prMarca(R, 60, 140, 214, 172, () => {
        a_prRama(R, 72, 161, 200, 159, 14, 13, a_prCORTEZA, 407, 0.3);
        a_prRama(R, 150, 154, 158, 143, 5, 3, a_prCORTEZA, 408, 0.2);   // el muñón de una rama
        for (let j = -7; j <= 7; j++) for (let i = -4; i <= 4; i++) { const e = (i / 4.5) ** 2 + (j / 7.2) ** 2; if (e > 1) continue; const ri = Math.floor(Math.sqrt(e) * 4); pset(202 + i, 159 + j, e > 0.8 ? hex('#5e4a3a') : ri % 2 ? hex('#c8a070') : hex('#e0c090')); }
        pset(202, 159, hex('#8a6a4a'));
        for (const [sx, sy] of [[96, 152], [100, 151], [176, 151]]) { rect(sx, sy, sx, sy + 2, hex('#e8e0d0')); rect(sx - 2, sy - 1, sx + 2, sy - 1, hex('#c8784a')); pset(sx - 1, sy - 2, hex('#e8a070')); pset(sx, sy - 2, hex('#e8a070')); }
      });
      for (let i = 0; i < 57600; i++) if (dat.tronco.m[i]) noH[i] = 1;
      dat.juncos = [];
      for (const [a, b, y0] of [[0, 34, 141], [292, 320, 140], [222, 246, 141]]) for (let x = a; x < b; x += 2) dat.juncos.push([x, y0 + Math.round(h(x, 2, 409) * 3), 12 + Math.round(h(x, 1, 409) * 14), h(x, 3, 409) < 0.3 ? 1 : h(x, 3, 409) < 0.5 ? 2 : 0]);
      dat.hierba = a_prBriznasHaz(142, 410, (x, y) => !noH[y * 320 + x], 1.1);
      return dat;
    }
    // ─ general ─
    a_prMontes(R, 80, 18, a_prH('#a4aec8 #8e9ab8 #7884a4'), 2.7, 96);
    a_prMontes(R, 92, 8, a_prH('#6a8462 #566e50 #3e5440'), 5.1, 104, { arboles: true, pinos: true });
    a_prPradera(R, 0, 103, 319, 179, 301);
    // la Veta, a la izquierda y lejos: casitas grises con su tubo de estufa (humean en vivo) y un tendedero
    dat.chim = [];
    for (let k = 0; k < 6; k++) { const x = -4 + k * 13 + Math.round(h(k, 1, 302) * 3), base = 104 - (k % 2) * 2; dat.chim.push(a_prCasita(R, x, base, 10 + (k % 3), 7 + (k % 2), k)); }
    for (let x = 18; x < 40; x++) pset(x, 97 + Math.round(Math.sin((x - 18) / 22 * Math.PI) * 2), hex('#c8c0b0'));
    for (const [x, c] of [[22, '#e8e2d4'], [27, '#7a8ab0'], [33, '#a85a4a']]) rect(x, 99, x + 2, 101, hex(c));
    // el bosque del 12 detrás de la alambrada: pinos lejanos azulados, árboles de hoja y pinos cerca
    for (let k = 0; k < 50; k++) { const x = 64 + Math.round(h(k, 1, 303) * 266); a_prPino(R, x, 103, 14 + Math.round(h(k, 2, 303) * 14), PINO_L, hex('#2a2420')); }
    for (const [x, y, r] of [[128, 88, 9], [196, 86, 10], [262, 90, 8], [304, 88, 9]]) { rect(x, y, x + 1, 104, hex('#4a3a2e')); a_prHojas(R, x + 1, y, r, a_prFOLLAJE, x, null); }
    a_prBosque(R, 107, 70, 324, 26, 14, 32, 304, () => 60);
    for (const [x, r] of [[150, 5], [162, 4], [236, 5], [292, 6], [308, 4], [88, 4]]) a_prHojas(R, x, 109, r, a_prH('#6a9a4a #4a7a36 #2e5426'), x, null);
    // la alambrada del distrito (postes y espino), con un hueco por donde se cuela uno a cazar
    a_prAlambrada(R, 70, 319, 110, 15, 30, [190, 220]);
    // el roble del medio, a la izquierda (tronco con corteza y musgo, copa en racimos)
    a_prRama(R, 104, 124, 106, 74, 9, 6, a_prCORTEZA, 305, 0.25); a_prRama(R, 106, 84, 88, 66, 4, 2, a_prCORTEZA, 306); a_prRama(R, 106, 80, 124, 64, 4, 2, a_prCORTEZA, 307);
    for (let k = -4; k <= 4; k++) pset(105 + k, 125, hex('#3a4a24'));
    for (const [x, y, r] of [[90, 62, 11], [122, 58, 12], [106, 50, 12], [80, 72, 8], [132, 72, 9], [106, 68, 10]]) a_prHojas(R, x, y, r, a_prFOLLAJE, x + y, null);
    // el sendero de tierra que baja de la Veta a la charca
    for (let i = 0; i <= 200; i++) { const u = i / 200, cx = u * 196, cy = 112 + u * 22 + Math.sin(u * 3.5) * 4, w = 2 + u * 4;
      for (let dx = -w; dx <= w; dx++) for (let dy = -1; dy <= 1; dy++) { const x = Math.round(cx + dx), y = Math.round(cy + dy); if (x < 0 || x > 319) continue; const q = h(x, y, 308); pset(x, y, Math.abs(dx) > w - 1 ? hex('#7a6a48') : q < 0.1 ? hex('#6a5a40') : q > 0.9 ? hex('#c8b890') : hex('#a8946a')); noH[y * 320 + x] = 1; } }
    // la charca con su reflejo, nenúfares y piedras
    const m = a_prCharca(R, 246, 129, 46, 12, 309); for (let i = 0; i < 57600; i++) if (m[i]) noH[i] = 1;
    dat.nen = [[226, 126, 2, 0], [262, 132, 3, 1], [276, 124, 2, 0], [236, 135, 2, 0]]; a_prNenufares(R, dat.nen);
    // el tronco caído (para sentarse), la manta de parches con la cesta y la taza
    dat.tronco = a_prMarca(R, 16, 130, 100, 156, () => {
      a_prRama(R, 24, 146, 86, 145, 11, 10, a_prCORTEZA, 310, 0.3);
      for (let j = -5; j <= 5; j++) for (let i = -3; i <= 3; i++) { const e = (i / 3.4) ** 2 + (j / 5.4) ** 2; if (e > 1) continue; const ri = Math.floor(Math.sqrt(e) * 3.5); pset(88 + i, 145 + j, e > 0.78 ? hex('#5e4a3a') : ri % 2 ? hex('#c8a070') : hex('#e0c090')); }
      for (const [sx, sy] of [[40, 139], [44, 138]]) { rect(sx, sy, sx, sy + 1, hex('#e8e0d0')); rect(sx - 1, sy - 1, sx + 1, sy - 1, hex('#c8784a')); }
      rect(26, 152, 90, 152, hex('#2e4a22'));
    });
    for (let i = 0; i < 57600; i++) if (dat.tronco.m[i]) noH[i] = 1;
    a_prManta(R, 120, 150, 156, 159, 5); for (let y = 150; y <= 160; y++) for (let x = 112; x <= 160; x++) noH[y * 320 + x] = 1;
    a_prCesta(R, 140, 156, 10); rect(126, 153, 128, 156, hex('#a8aab0')); rect(126, 153, 126, 156, hex('#d8dae0')); pset(129, 154, hex('#a8aab0'));
    // piedras y corros grandes de flores en el primer término
    for (const [x, y, r] of [[8, 172, 4], [300, 168, 3], [196, 176, 2.5]]) { disco(x, y, r, hex('#6a665c')); disco(x - 1, y - 1, r * 0.65, hex('#9a968a')); pset(x - 1, y - 2, hex('#c8c4b8')); }
    dat.juncos = [];
    for (const [a, b, y0] of [[198, 214, 132], [280, 296, 132], [236, 248, 118]]) for (let x = a; x < b; x += 2) dat.juncos.push([x, y0 + Math.round(h(x, 2, 311) * 3), (y0 < 125 ? 7 : 10) + Math.round(h(x, 1, 311) * 8), h(x, 3, 311) < 0.35 ? 1 : h(x, 3, 311) < 0.5 ? 2 : 0]);
    dat.hierba = a_prBriznasHaz(104, 312, (x, y) => !noH[y * 320 + x]);
    return dat;
  },
  vivo(R, t, cam, luz, o, tn, F) {
    const d = F.dat, cerca = cam === 'cerca', hor = F.cielo.hor, noche = luz === 'noche';
    // el sol (o.sol 0: alto, 1: puesto detrás del bosque) o la luna, y el cielo vivo por delante
    const s = Math.max(0, Math.min(1, o.sol ?? { amanecer: 0.72, dia: 0.05, tarde: 0.55, noche: 0.15 }[luz])), sx = cerca ? 196 : 214, sy = Math.round(lerp(cerca ? 26 : 30, cerca ? 102 : 98, s)), sr = noche ? 5 : luz === 'dia' ? 7 : 9;
    a_prSol(R, F, luz, sx, sy, sr);
    a_prCieloVivo(R, t, F, luz);
    // las bocanadas de las chimeneas de la Veta (general)
    if (!cerca) d.chim.forEach(([x, y], k) => { if (k % 2 === 0 || k === 5) a_prHumo(R, x, y - 1, t + k * 1.3, tn, { n: 5, alto: 24, viento: 16, r: 0.8, crece: 3, v: 0.12 }); });
    // el agua: brillos que corren, la estela del sol, anillos y libélulas
    const [cx, cy, rx, ry] = cerca ? [196, 122, 178, 21] : [246, 129, 46, 12], B = R.buf;
    for (let k = 0; k < (cerca ? 18 : 8); k++) { const y = Math.round(cy - ry * 0.7 + h(k, 3, 320) * ry * 1.6), x0 = Math.round(cx - rx + ((h(k, 4, 320) * rx * 2 + t * (3 + k % 3)) % (rx * 2))), L = 3 + (k % 4) * 2;
      for (let i = 0; i < L; i++) { const x = x0 + i, e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (x >= 0 && x < 320 && e < 0.85) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#ffffff'), 0.28); } }
    if (sy < hor + 14 && Math.abs(sx - cx) < rx * 0.9) { const brillo = noche ? hex('#c8d0e8') : luz === 'dia' ? hex('#ffffff') : hex('#fff0b0');
      for (let k = 0; k < (cerca ? 34 : 16); k++) { const y = Math.round(cy - ry + 2 + h(k, 1, 321) * (ry * 2 - 3)), w = 1 + (y - cy + ry) * 0.25, x = Math.round(sx + (h(k, 2, 321) - 0.5) * w * 2 + Math.sin(t * 2 + k) * 1.5), e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
        if (e < 0.9 && Math.sin(t * 3 + k * 2.3) > 0) { R.pset(x, y, brillo); if (k % 3 === 0) R.pset(x + 1, y, brillo); } } }
    { const c = (t + 2) % 6, px = cerca ? 90 : 230, py = cerca ? 126 : 128; if (c < 2.4) { const r = c * 3.2; for (let a = 0; a < 6.28; a += 0.25) { const x = Math.round(px + Math.cos(a) * r), y = Math.round(py + Math.sin(a) * r * 0.32), e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 0.9) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#ffffff'), 0.4 * (1 - c / 2.4)); } } }
    if (!noche) a_prLibelulas(R, t, cerca ? 150 : 246, cerca ? 108 : 118, cerca ? 60 : 30, cerca ? 6 : 4, cerca ? 3 : 2, tn);
    // la rana del nenúfar (de cerca): croa (hincha el buche) y de vez en cuando salta al agua y vuelve
    if (cerca) { const c = t % 9, rx0 = 118, ry0 = 128, salta = c > 6 && c < 7.2, u = salta ? (c - 6) / 1.2 : 0, fx = Math.round(rx0 + u * 30), fy = Math.round(ry0 - Math.sin(u * Math.PI) * 10);
      const v = tn(hex('#4a8a2e')), vL = tn(hex('#7ab84a')), vS = tn(hex('#2e5a1e'));
      if (!(c > 7.2 && c < 8.4)) { const X = c > 7.2 ? rx0 : fx, Y = c > 7.2 ? ry0 : fy; R.rect(X - 2, Y - 3, X + 2, Y, v); R.rect(X - 2, Y - 3, X + 2, Y - 3, vL); R.pset(X - 2, Y - 4, vL); R.pset(X + 1, Y - 4, vL); R.pset(X - 2, Y - 4, C.k); R.pset(X + 1, Y - 4, C.k); R.rect(X - 3, Y, X - 2, Y, vS); R.rect(X + 2, Y, X + 3, Y, vS);
        if (!salta && Math.sin(t * 5) > 0.6) R.rect(X - 1, Y - 1, X + 1, Y, tn(hex('#e8e0a0'))); }
      else { const r = (c - 7.2) * 5; for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(rx0 + 30 + Math.cos(a) * r), Math.round(ry0 + Math.sin(a) * r * 0.3), tn(hex('#d8e8f0'))); } }
    // la neblina del amanecer, baja, que se arrastra sobre la hierba y el agua
    if (luz === 'amanecer') { const y0 = cerca ? 94 : 104; for (let y = y0; y < y0 + 16; y++) for (let x = 0; x < 320; x++) { const k = (0.5 + 0.5 * Math.sin(x * 0.04 + t * 0.25 + y * 0.3)) * (1 - Math.abs(y - y0 - 8) / 8); if (k > 0.25 + a_prUm(x, y) * 0.5) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#f4e4e8'), 0.35); } }
    // la hierba que se mece en ondas, los juncos, las flores
    a_prBriznas(R, t, d.hierba, tn, noche ? 0.6 : 1);
    a_prJuncos(R, t, d.juncos, tn);
    // las ocas (o.ocas, 0–6; 4 por omisión)
    const n = Math.max(0, Math.min(6, o.ocas ?? 4));
    const bases = cerca ? [[252, 172], [284, 168], [232, 128], [36, 160], [300, 176], [222, 166]] : [[176, 160], [206, 168], [150, 172], [228, 158], [116, 166], [262, 172]];
    const L = a_prOcas(t, n, bases, o), ocas = [];
    L.forEach((g) => { let { x, y, modo } = g; if (cerca && g.k === 2 && !o.fila) { const q = o.ocasQuietas ? 0 : t; modo = 'nada'; x = Math.round(232 + Math.sin(q * 0.18) * 30); y = 128; g.dir = Math.cos(q * 0.18) >= 0 ? 1 : -1; } a_oca(R, x, y, t, { dir: g.dir, modo, tn, k: g.k }); ocas.push([x, y]); });
    // el nido con huevos (o.nido) y las gominolas en la hierba (o.gominolas): true o [x, y]
    let nido = null; if (o.nido) { const [nx, ny] = Array.isArray(o.nido) ? o.nido : cerca ? [224, 176] : [196, 172]; nido = a_prNido(R, nx, ny, t, tn); }
    if (o.gominolas) { const [gx, gy] = Array.isArray(o.gominolas) ? o.gominolas : cerca ? [62, 175] : [92, 170]; a_prGominolas(R, gx, gy, t, tn); }
    // mariposas de día, luciérnagas al anochecer y de noche
    if (noche || luz === 'tarde') a_prLuciernagas(R, t, 0, 319, cerca ? 100 : 108, 172, noche ? 26 : 10, cerca ? 3 : 4);
    if (!noche) a_prMariposas(R, t, cerca ? 3 : 4, cerca ? 20 : 120, cerca ? 300 : 300, cerca ? 132 : 112, cerca ? 166 : 160, tn, cerca ? 5 : 6);
    if (cerca) return { suelo: 172, libre: [210, 296], tronco: [84, 161], asientos: [[96, 161], [126, 161], [156, 161]], charca: [18, 101, 319, 143], sol: [sx, sy, sr], ocas, nido, manta: [0, 166, 44, 179] };
    return { suelo: 164, libre: [10, 196], tronco: [28, 146], asientos: [[30, 146], [56, 146]], charca: [200, 117, 292, 141], manta: [115, 150, 157, 159], sol: [sx, sy, sr], ocas, nido, alambrada: [70, 110], veta: [0, 70] };
  },
  delante(R, t, cam, luz, o, tn, F) {
    // el tronco por delante de los que se sientan (o.sentados) y unas matas de hierba en el borde de abajo
    if (o.sentados) a_prDevuelve(R, F, F.dat.tronco);
    a_prMatas(R, t, 0, 319, 179, cam === 'cerca' ? 12 : 9, tn, cam === 'cerca' ? 41 : 42, cam === 'cerca' ? 7 : 5);
  },
};

// el bosque del 12 en una fila (base, de x0 a x1, n árboles de a0 a a1 px): pinos de tres verdes y alturas distintas,
// abedules de tronco blanco con sus manchas y árboles de hoja; la sombra del sotobosque en la base; max(x): el alto máximo
// en cada x (para no subir a la esquina de Atom)
function a_prBosque(R, base, x0, x1, n, a0, a1, sem, max) {
  const { rect, pset } = R, B = R.buf, PAL = [a_prH('#5a8a4a #3a6a38 #224428'), a_prH('#4e7a44 #305a34 #1e3a24'), a_prH('#6a8a50 #48683a #2e4828'), a_prH('#4a6e4a #2e5038 #1a3424')];
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, 1, sem) * (x1 - x0)), tipo = h(k, 4, sem), b = base - Math.round(h(k, 5, sem) * 3), al = Math.min(max(x), Math.round(a0 + h(k, 2, sem) * (a1 - a0)));
    if (tipo < 0.12) { rect(x, b - al * 0.6, x + 2, b, hex('#4a3a2e')); rect(x, b - al * 0.6, x, b, hex('#6a5442')); a_prHojas(R, x + 1, b - al * 0.7, al * 0.32, a_prFOLLAJE, x + sem, null); }
    else if (tipo < 0.2) { for (let y = Math.round(b - al * 0.8); y <= b; y++) { pset(x, y, hex('#e8e4dc')); pset(x + 1, y, hex('#b8b4ac')); if (h(x, y, sem) < 0.2) pset(x + (y & 1), y, hex('#2a2a2a')); }
      a_prHojas(R, x + 1, b - al * 0.75, al * 0.22, a_prH('#a8c460 #78a040 #4e7430'), x + sem + 1, null); }
    else a_prPino(R, x, b, al, PAL[Math.floor(h(k, 3, sem) * 4)], hex('#2a2018')); }
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const a = 2 + Math.round(h(x >> 2, 1, sem + 9) * 3); for (let j = 0; j < a; j++) { const y = base + 1 - j; if (y >= 0 && y < 180) B[y * 320 + x] = j === a - 1 ? hex('#2e4a26') : hex('#1e3420'); } }
}

// la alambrada del distrito: postes de madera cada paso px y cuatro hilos de espino que se comban; hueco [x0, x1]: los
// dos hilos de abajo, vencidos (por ahí se escapa uno al bosque)
function a_prAlambrada(R, x0, x1, base, alto, paso, hueco) {
  const { rect, pset } = R, pal = a_prH('#8a6a4c #5e4632 #3e2e22'), al = hex('#5e5e68'), alL = hex('#a4a4ae');
  for (let k = 0; k < 4; k++) for (let x = x0; x <= x1; x++) { const xi = (x - x0) % paso; let y = base - 3 - k * Math.round((alto - 4) / 3) + Math.round(Math.sin(xi / paso * Math.PI) * 1.5);
    if (hueco && x > hueco[0] && x < hueco[1] && k < 2) y += Math.round(Math.sin((x - hueco[0]) / (hueco[1] - hueco[0]) * Math.PI) * (5 - k * 2));
    pset(x, y, al); if ((x - x0) % 5 === 2) { pset(x, y - 1, alL); pset(x + 1, y + 1, alL); } }
  for (let x = x0; x <= x1; x += paso) { rect(x, base - alto, x + 1, base, pal[1]); rect(x, base - alto, x, base, pal[0]); rect(x - 1, base - alto - 1, x + 2, base - alto, pal[2]); rect(x + 1, base - 3, x + 1, base, pal[2]); pset(x - 1, base + 1, hex('#3a4a24')); pset(x + 2, base + 1, hex('#3a4a24')); }
}

// ropa tendida dentro de casa en una cuerda de (x0, y0) a (x1, y1): camisas, pantalones y trapos que se mecen despacio
function a_prRopa(R, t, x0, y0, x1, y1, tn, sem) {
  const cuerda = (x) => Math.round(y0 + (y1 - y0) * (x - x0) / (x1 - x0) + 4 * Math.sin((x - x0) / (x1 - x0) * Math.PI));
  for (let x = x0; x <= x1; x++) R.pset(x, cuerda(x), tn(hex('#d8d0c0')));
  const P = [a_prH('#e8e2d4 #c4bca8'), a_prH('#7a8ab0 #5a6888'), a_prH('#c8b098 #9a8268'), a_prH('#a85a4a #7a3e34'), a_prH('#6a7a5a #4a5a3e')];
  let x = x0 + 5, k = 0;
  while (x < x1 - 12) { const tipo = Math.floor(h(k, sem, 70) * 3), w = tipo === 1 ? 10 : tipo === 2 ? 7 : 12, alto = tipo === 1 ? 14 : tipo === 2 ? 9 : 11, [c, cS] = P[Math.floor(h(k, sem, 71) * 5)].map(tn), m = Math.sin(t * 0.9 + k * 1.3) * 0.7;
    for (let i = 0; i < w; i++) { const yy = cuerda(x + i) + 1, larg = tipo === 0 && (i < 3 || i > w - 4) ? 5 : tipo === 1 && (i === (w >> 1) || i === (w >> 1) - 1) ? 5 : alto;
      for (let j = 0; j < larg; j++) R.pset(x + i + Math.round(m * j / alto), yy + j, i === 0 || i === w - 1 || j === larg - 1 || (i + j * 2) % 9 === 0 ? cS : c); }
    R.pset(x + 1, cuerda(x + 1) - 1, tn(hex('#a88a5a'))); R.pset(x + w - 2, cuerda(x + w - 2) - 1, tn(hex('#a88a5a')));
    x += w + 4; k++; }
}

// la cocina de hierro (x, base: esquina de abajo a la izquierda; 44 × 34): remaches, horno, rejilla del fuego, patas, el
// tubo que sube al techo; devuelve dónde está la rejilla [x0, y0, x1, y1] y el centro de la olla
function a_prEstufa(R, x, base) {
  const { rect, pset } = R, k = hex('#2a2a30'), kL = hex('#4a4a54'), kS = hex('#18181c'), br = hex('#8a8a96');
  rect(x + 2, base - 4, x + 5, base, kS); rect(x + 38, base - 4, x + 41, base, kS);                      // las patas
  rect(x, base - 32, x + 43, base - 5, k); rect(x, base - 32, x + 43, base - 31, kL); rect(x, base - 32, x, base - 5, kL); rect(x + 43, base - 30, x + 43, base - 5, kS);
  rect(x - 2, base - 35, x + 45, base - 33, kS); rect(x - 2, base - 35, x + 45, base - 35, kL);          // la plancha de arriba
  for (const fx of [x + 8, x + 26]) { rect(fx, base - 35, fx + 9, base - 35, hex('#3a3a42')); pset(fx + 4, base - 35, br); }   // los fuegos
  rect(x + 4, base - 28, x + 22, base - 12, kS); rect(x + 5, base - 27, x + 21, base - 13, kL); rect(x + 6, base - 26, x + 20, base - 14, k); rect(x + 18, base - 21, x + 20, base - 19, br);   // el horno
  rect(x + 26, base - 22, x + 39, base - 10, kS);                                                        // el hueco de la rejilla (en vivo, el fuego)
  for (let i = x + 27; i < x + 39; i += 3) rect(i, base - 21, i, base - 11, hex('#3a3a42'));
  for (let i = x + 2; i < x + 43; i += 6) { pset(i, base - 30, br); pset(i, base - 7, br); }                // los remaches
  rect(x + 2, base - 8, x + 41, base - 7, kL);
  // el tubo, con el codo y la abrazadera, hasta el techo
  rect(x + 34, 10, x + 38, base - 36, k); rect(x + 34, 10, x + 34, base - 36, kL); rect(x + 33, 40, x + 39, 41, kS); rect(x + 33, 70, x + 39, 71, kS);
  return { rejilla: [x + 27, base - 21, x + 38, base - 11], olla: [x + 13, base - 36] };
}

// la olla de hierro con su tapa (cx, base)
function a_prOlla(R, cx, base) {
  const { rect, pset } = R; rect(cx - 8, base - 9, cx + 8, base - 1, hex('#3a3a42')); rect(cx - 8, base - 9, cx - 6, base - 1, hex('#5a5a66')); rect(cx + 6, base - 9, cx + 8, base - 1, hex('#24242a'));
  rect(cx - 9, base - 10, cx + 9, base - 10, hex('#6a6a76')); rect(cx - 7, base - 12, cx + 7, base - 11, hex('#4a4a54')); rect(cx - 1, base - 14, cx + 1, base - 13, hex('#6a6a76'));
  rect(cx - 10, base - 7, cx - 9, base - 6, hex('#24242a')); rect(cx + 9, base - 7, cx + 10, base - 6, hex('#24242a')); pset(cx - 5, base - 8, hex('#8a8a96'));
}

// una alfombra trenzada ovalada de trapos (anillos de colores con el punteado de la trenza)
function a_prAlfombra(R, cx, cy, rx, ry) {
  const P = a_prH('#8a4a3a #c8a060 #5a6a7a #a87a50 #6a7a5a');
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const e = Math.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2); if (e > 1) continue;
    const anillo = Math.floor(e * 7), c = P[anillo % 5]; R.pset(x, y, (x + y * 2) % 4 === 0 ? a_prMez(c, C.k, 0.3) : (x + y) % 4 === 1 ? a_prMez(c, C.blanco, 0.15) : c); }
}

// la mesa de tablas (x0..x1, la tabla de arriba en y0..y0+4, el canto, las patas hasta base)
function a_prMesa(R, x0, x1, y0, base) {
  const { rect, pset } = R, M = a_prH('#b08c64 #8a6a48 #6a4e34 #3e2c1e');
  rect(x0 + 6, y0 + 6, x0 + 8, base - 6, M[2]); rect(x1 - 8, y0 + 6, x1 - 6, base - 6, M[2]);                 // las patas de detrás
  a_prTablas(R, x0, y0, x1, y0 + 4, M, 520, { horiz: true, ancho: 2 }); rect(x0, y0, x1, y0, M[0]);
  rect(x0, y0 + 5, x1, y0 + 7, M[1]); rect(x0, y0 + 7, x1, y0 + 7, M[3]); for (let x = x0 + 3; x < x1; x += 11) pset(x, y0 + 6, M[2]);
  for (const lx of [x0 + 2, x1 - 5]) { rect(lx, y0 + 8, lx + 3, base, M[1]); rect(lx, y0 + 8, lx, base, M[0]); rect(lx + 3, y0 + 8, lx + 3, base, M[3]); }
  rect(x0 + 5, base - 8, x1 - 5, base - 7, M[2]);                                                             // el travesaño
  rect(x0 - 2, base + 1, x1 + 2, base + 1, hex('#3a2c22'));
}

// una silla de madera de respaldo de barrotes (x: izquierda, base; dir: hacia dónde mira el asiento)
function a_prSilla(R, x, base, dir) {
  const { rect } = R, M = a_prH('#a07a54 #7a5a3c #4e3826');
  const bx = dir > 0 ? x : x + 10; rect(bx, base - 30, bx + 1, base, M[1]); rect(bx, base - 30, bx, base, M[0]);
  for (const y of [base - 28, base - 23, base - 19]) rect(Math.min(bx, bx + 10 * dir), y, Math.max(bx + 1, bx + 10 * dir), y + 1, M[1]);
  rect(x, base - 14, x + 11, base - 12, M[0]); rect(x, base - 12, x + 11, base - 12, M[2]);
  rect(x + (dir > 0 ? 10 : 0), base - 12, x + (dir > 0 ? 11 : 1), base, M[1]); rect(x + 3, base - 6, x + 9, base - 6, M[2]);
}

// el bollo del cumpleaños (cx, base sobre la mesa; s = 1 normal, 2 de cerca) y, con vela, la vela que tiembla y su halo
function a_prBollo(R, cx, base, t, s, vela, tn) {
  const { pset } = R, w = 6 * s, a = 5 * s, cor = [hex('#e0a050'), hex('#c8843a'), hex('#8a5220'), hex('#f4cc80')].map(tn);
  for (let j = 0; j < a; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + ((j - a) / a) ** 2; if (e > 1) continue;
    let c = j > a * 0.75 ? cor[2] : i > w * 0.4 ? cor[1] : e < 0.35 && i < 0 ? cor[3] : cor[0]; if (h(i, j, 530) < 0.06 && j < a * 0.7) c = tn(hex('#f6e2b0')); pset(cx + i, base - a + j, c); }
  for (let i = -w + 1; i < w; i++) pset(cx + i, base, tn(hex('#5a3a20')));
  if (!vela) return null;
  const vh = 6 * s, vx = cx, top = base - a - vh + 1;
  for (let j = 0; j < vh; j++) for (let i = 0; i < s; i++) pset(vx + i, top + j, (j + i) % 3 === 0 ? tn(hex('#e85a6a')) : tn(hex('#f4f0e8')));
  pset(vx, top - 1, hex('#2a2a2a'));
  const fl = Math.sin(t * 13) * Math.sin(t * 7.7 + 1), dx = fl > 0.5 ? 1 : fl < -0.5 ? -1 : 0, fh = 3 * s + (Math.sin(t * 9) > 0 ? 1 : 0);
  for (let j = 0; j < fh; j++) { const ww = j >= 1 && j <= fh - 3 ? (s > 1 ? 1 : 0) : 0, x = vx + (j > fh / 2 ? dx : 0); for (let i = -ww; i <= s - 1 + ww; i++) pset(x + i, top - 2 - j, j < 2 ? hex('#fff8d0') : j < fh - 2 ? hex('#ffc848') : hex('#ff8a30')); }
  a_prHalo(R, vx + 0.5, top - 2 - fh / 2, 10 * s, hex('#ffd890'), 0.45 + 0.08 * fl);
  return [vx, top - 2 - fh];
}

const a_prCASA = {
  camaras: ['general', 'mesa'],
  luz: 'dia',
  cielo: null,
  fijo(R, cam, luz, luces) {
    const { rect, pset, linea, disco, poligono } = R, B = R.buf, dat = {}, P = a_prMAD[2], noche = luz === 'noche', CIE = a_prCIE[luz];
    // lo que se ve por la ventana: el cielo de la luz, gris, y las casas de la Veta con su barro
    const fuera = (x0, y0, x1, y1, s) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0) * (CIE.g.length - 1) * 0.9, i = Math.floor(u); for (let x = x0; x <= x1; x++) pset(x, y, a_prMez(u - i > a_prUm(x, y) ? CIE.g[i + 1] : CIE.g[i], hex('#9a9aa2'), 0.35)); }
      const suelo = y1 - Math.round((y1 - y0) * 0.22); dat.chimFuera = [];
      for (let k = 0; k < 4; k++) { const cx = x0 - 6 + k * Math.round((x1 - x0) / 3) + Math.round(h(k, 1, 510) * 4); dat.chimFuera.push(a_prCasita(R, cx, suelo - (k % 2) * 2, Math.round(12 * s), Math.round(9 * s), k + 1)); }
      for (let y = suelo; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x, y, 511) < 0.15 ? hex('#4a4a52') : hex('#6a645c'));
      for (let x = x0; x <= x1; x++) if (h(x >> 2, 1, 512) < 0.4) pset(x, suelo + 2, hex('#8a8e9a')); };
    if (cam === 'mesa') {
      // la pared del fondo y, a la izquierda, la ventana con la Veta; a la derecha, la cocina de hierro y el vapor
      a_prTablas(R, 0, 0, 319, 111, P, 541, { ancho: 8, mugre: 6 });
      const W = [36, 26, 104, 76]; rect(W[0] - 4, W[1] - 4, W[2] + 4, W[3] + 6, hex('#5a4a3a')); rect(W[0] - 3, W[1] - 3, W[2] + 3, W[3] + 3, hex('#8a7058'));
      fuera(W[0], W[1], W[2], W[3], 1.6);
      dat.marco = a_prMarca(R, W[0], W[1], W[2], W[3], () => { rect(W[0], W[1] + 24, W[2], W[1] + 25, hex('#6a5442')); rect(70, W[1], 71, W[3], hex('#6a5442'));
        for (let i = 0; i < 22; i++) { const y = W[1] + i * 2; if (y < W[3]) linea(W[0] + 2 + i, y, W[0] + 8 + i, y - 6, hex('#d8e0e8')); } });
      rect(W[0] - 6, W[3] + 6, W[2] + 6, W[3] + 9, hex('#8a7058')); rect(W[0] - 6, W[3] + 9, W[2] + 6, W[3] + 9, hex('#4a3a2e'));
      for (let y = W[1] - 6; y < W[3] + 4; y++) for (let x = W[0] - 10; x < W[0] - 2; x++) pset(x, y, (x + (y >> 2)) % 5 === 0 ? hex('#7a5a5a') : (y % 6 < 3 ? hex('#c8b8a0') : hex('#b0a088')));   // la cortina
      for (const [fx, fy, c] of [[44, 82, '#7a9a5a'], [52, 81, '#c8a060'], [96, 82, '#8a8e96']]) { rect(fx, fy - 6, fx + 4, fy, hex(c)); rect(fx, fy - 6, fx, fy, a_prMez(hex(c), C.blanco, 0.3)); }   // tarros en el alféizar
      dat.ventana = W;
      a_prEstufa(R, 238, 112); a_prOlla(R, 258, 77);
      // la luz de la ventana en la pared, tramada, y el zócalo con sus clavos
      for (let y = 30; y < 108; y++) for (let x = 108; x < 176; x++) { const u = (x - 108 - (y - 30) * 0.5) / 34; if (u > 0 && u < 1 && a_prUm(x, y) < 0.55 * Math.sin(u * Math.PI)) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#f4e0b0'), 0.22); }
      rect(0, 104, 319, 107, hex('#8a7058')); rect(0, 104, 319, 104, hex('#a88c6c')); rect(0, 107, 319, 107, hex('#4a3a2e'));
      for (let x = 6; x < 320; x += 23) pset(x, 105, hex('#3a3a42'));
      // a la derecha, la percha con el chal de lana y el farol de minero colgado
      rect(286, 54, 318, 56, hex('#6a5442')); rect(286, 54, 318, 54, hex('#8a7058')); for (const px of [292, 310]) { rect(px, 57, px + 1, 59, hex('#4a3a2e')); }
      poligono([[288, 58], [298, 58], [302, 92], [284, 90]], hex('#3a2a3a')); poligono([[289, 59], [297, 59], [300, 90], [286, 88]], hex('#7a4a6a'));
      for (let y = 60; y < 90; y += 3) linea(287 + Math.round((y - 60) * -0.08), y, 298 + Math.round((y - 60) * 0.1), y, hex('#8a5a7a'));
      for (let x = 286; x < 301; x += 2) rect(x, 91 - (x % 4 === 0 ? 0 : 1), x, 94, hex('#6a3a5a'));
      rect(306, 60, 314, 62, hex('#3a3a42')); rect(305, 63, 315, 78, hex('#2a2a30')); rect(306, 64, 314, 77, hex('#4a4a54')); rect(307, 66, 313, 74, hex('#c8b070')); rect(307, 66, 308, 74, hex('#f0e0a0')); rect(304, 78, 316, 80, hex('#2a2a30'));
      // la balda con los platos de loza de borde azul puestos de canto, el tarro de la sal y, colgadas, dos tazas y el cazo
      rect(146, 30, 214, 32, hex('#7a6248')); rect(146, 30, 214, 30, hex('#a08464')); rect(146, 33, 214, 33, hex('#2e241c'));
      for (const bx of [150, 208]) { poligono([[bx, 33], [bx + 4, 33], [bx, 40]], hex('#4a3a2e')); }
      for (let k = 0; k < 4; k++) { const cx = 158 + k * 12, cy = 23; disco(cx + 1, cy + 1, 6.5, hex('#3a2c22')); disco(cx, cy, 6.5, hex('#3a4a6a')); disco(cx, cy, 5.5, hex('#4a6aa8')); disco(cx, cy, 4.6, hex('#ece8dc')); disco(cx + 0.5, cy + 0.5, 3, hex('#d4d0c4')); pset(cx - 3, cy - 3, C.blanco); pset(cx - 2, cy - 4, C.blanco); }
      rect(204, 20, 211, 29, hex('#b8925a')); rect(204, 20, 205, 29, hex('#d8b07a')); rect(203, 18, 212, 19, hex('#6a4a2a')); rect(206, 23, 209, 26, hex('#e8e0cc'));
      for (const [mx, c] of [[160, '#c8ccd4'], [176, '#c86a4a']]) { rect(mx, 34, mx, 35, hex('#8a8a96')); rect(mx - 3, 36, mx + 3, 43, hex(c)); rect(mx - 3, 36, mx - 2, 43, a_prMez(hex(c), C.blanco, 0.4)); rect(mx + 3, 37, mx + 3, 43, a_prMez(hex(c), C.k, 0.35)); rect(mx + 4, 38, mx + 5, 41, a_prMez(hex(c), C.k, 0.2)); }
      rect(194, 34, 194, 46, hex('#8a8e96')); rect(195, 34, 195, 46, hex('#5a5e66')); disco(194.5, 49, 3.2, hex('#5a5e66')); disco(194, 48.5, 2.4, hex('#a8acb4')); pset(193, 47, C.blanco);
      // el calendario de papel clavado (una cuadrícula de días, uno marcado en rojo: el de la cosecha)
      rect(118, 40, 138, 66, hex('#4a3a2e')); rect(119, 41, 137, 65, hex('#ece4cc')); rect(119, 41, 137, 46, hex('#b83a32')); pset(128, 39, hex('#9a9aa2'));
      for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const x = 121 + i * 3, y = 49 + j * 4; rect(x, y, x + 1, y + 1, hex('#8a8270')); }
      for (let a = 0; a < 6.3; a += 0.4) pset(Math.round(130.5 + Math.cos(a) * 2.6), Math.round(58.5 + Math.sin(a) * 2.6), hex('#d8302a'));
      // la sartén y el colador colgados junto a la cocina, y la herradura sobre la ventana
      disco(222, 72, 9, hex('#1e1e24')); disco(222, 72, 7.5, hex('#34343c')); disco(220, 70, 4, hex('#44444e')); pset(217, 67, hex('#8a8a96')); rect(221, 50, 223, 63, hex('#2a2a30')); rect(221, 50, 221, 63, hex('#4a4a54')); pset(222, 48, hex('#9a9aa2'));
      for (let y = 66; y < 82; y++) for (let x = 196; x < 212; x++) { const e = ((x - 204) / 8) ** 2 + ((y - 72) / 7) ** 2; if (e > 1 || y < 72) continue; pset(x, y, e > 0.75 ? hex('#6a6e78') : (x + y) % 2 ? hex('#a8acb4') : hex('#7a7e88')); }
      rect(196, 71, 212, 72, hex('#c8ccd4')); rect(195, 71, 196, 72, hex('#8a8e96')); rect(212, 71, 213, 72, hex('#8a8e96'));
      for (let a = 0.2; a < 2.95; a += 0.12) pset(Math.round(70 + Math.cos(a + Math.PI) * 5), Math.round(22 - Math.sin(a + Math.PI) * 5), hex('#7a7e88'));
      a_prEstufa(R, 238, 112); a_prOlla(R, 258, 77);
      rect(0, 108, 319, 111, hex('#3a2c22'));
      // la mesa de cerca: tablas que vienen hacia nosotros, con vetas que ondulan, nudos, clavos, la luz de la ventana a la
      // izquierda y la penumbra en las esquinas de abajo; los platos de loza con el pan y las patatas, la cuchara, la taza
      // de hojalata, el tarro con flores del prado, el salero de madera, el trapo de cuadros, migas, arañazos y un cerco
      dat.mesa = a_prMarca(R, 0, 112, 319, 179, () => {
        const M = a_prH('#c8a276 #a07e56 #7c5c3c #4a3626 #d8b88a');
        for (let y = 112; y < 180; y++) { const u = (y - 112) / 68, sc = 0.7 + u * 0.6; for (let x = 0; x < 320; x++) { const xv = (x - 160) / sc + 160, k = Math.floor(xv / 24), r = ((xv % 24) + 24) % 24, yv = (y - 112) / (0.5 + u * 0.9);
          const v1 = 8 + 4 * Math.sin(yv * 0.09 + k * 2.1) + 1.5 * Math.sin(yv * 0.31 + k), v2 = 16 + 3 * Math.sin(yv * 0.07 + k * 1.3 + 2), kn = ((r - 12) / 3) ** 2 + ((yv - 20 - h(k, 1, 549) * 60) / 5) ** 2;
          let c = r < 0.8 * sc ? M[3] : r < 1.8 * sc ? M[0] : (k % 2 ? M[1] : a_prMez(M[1], M[0], 0.3));
          if (r >= 1.8 * sc && (Math.abs(r - v1) < 0.45 * sc || Math.abs(r - v2) < 0.4 * sc)) c = M[2];
          else if (r >= 1.8 * sc && h(k * 5 + Math.floor(r / 3), Math.floor(yv / 3), 542) < 0.14) c = a_prMez(c, M[2], 0.5);
          if (kn < 1 && h(k, 2, 549) < 0.7) c = kn < 0.35 ? M[3] : M[2];
          if (h(x, y, 543) < 0.008) c = M[3];
          const luzV = (150 - x - (y - 112) * 1.4) / 90; if (luzV > 0 && a_prUm(x, y) < luzV * 0.8) c = a_prMez(c, M[4], 0.35);
          const som = Math.max(0, (Math.abs(x - 160) / 160) ** 2 * u - 0.15); if (som > 0 && a_prUm(x, y) < som * 1.6) c = a_prMez(c, M[3], 0.4);
          pset(x, y, c); } }
        rect(0, 112, 319, 112, M[4]); rect(0, 113, 319, 113, M[0]); rect(0, 114, 319, 114, M[2]);
        for (let k = -3; k < 17; k++) { const x = Math.round((k * 24 + 12 - 160) * 1.3 + 160); for (const y of [174, 175]) if (x > 0 && x < 319) { pset(x, y, y === 174 ? hex('#9a9aa2') : hex('#3a3a42')); } }
        // arañazos de cuchillo y el cerco de una taza
        for (let k = 0; k < 16; k++) { const x = 20 + Math.round(h(k, 1, 550) * 280), y = 122 + Math.round(h(k, 2, 550) * 50), l = 3 + Math.round(h(k, 3, 550) * 5); linea(x, y, x + l, y - Math.round(h(k, 4, 550) * 2), M[4]); }
        for (let a = 0; a < 6.3; a += 0.15) if (Math.sin(a * 3) > -0.4) pset(Math.round(212 + Math.cos(a) * 7), Math.round(128 + Math.sin(a) * 2.6), M[2]);
        // la sombra de cada cosa sobre la mesa (la luz viene de la ventana, de la izquierda)
        const sombra = (cx, cy, rx, ry) => { for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 && x >= 0 && x < 320) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#2a1c12'), 0.35); };
        sombra(74, 153, 27, 9); sombra(256, 159, 25, 8); sombra(252, 146, 10, 3); sombra(98, 140, 9, 3); sombra(134, 128, 6, 2);
        // los platos de loza con el borde azul
        for (const [cx, cy, rx, ry] of [[70, 150, 26, 9], [252, 156, 24, 8]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e > 1) continue;
          pset(x, y, e > 0.9 ? hex('#3a4a6a') : e > 0.8 ? hex('#4a6aa8') : e > 0.62 ? (y < cy ? hex('#f6f4ec') : hex('#dcd8cc')) : e > 0.52 ? hex('#bab6aa') : (x - cx < -rx * 0.3 && y < cy ? hex('#f0ece2') : hex('#e2ded2'))); }
        // en el plato de la izquierda, una rebanada de pan; en el de la derecha, dos patatas cocidas
        poligono([[56, 151], [60, 143], [72, 141], [80, 145], [78, 153], [62, 155]], hex('#8a5424')); poligono([[58, 150], [61, 144], [71, 142], [78, 146], [76, 152], [62, 153]], hex('#e8cc90'));
        for (let k = 0; k < 9; k++) pset(61 + Math.round(h(k, 1, 551) * 14), 145 + Math.round(h(k, 2, 551) * 6), hex('#c8a868')); rect(62, 145, 66, 145, hex('#f6e4b4'));
        for (const [px, py] of [[244, 153], [257, 155]]) { for (let y = -4; y <= 4; y++) for (let x = -6; x <= 6; x++) { const e = (x / 6) ** 2 + (y / 4) ** 2; if (e > 1) continue; pset(px + x, py + y, e > 0.8 ? hex('#8a6a2a') : x + y < -3 ? hex('#f0d888') : x + y > 4 ? hex('#b89a4a') : hex('#d8bc6a')); } pset(px - 2, py - 1, hex('#7a5a2a')); pset(px + 3, py + 1, hex('#7a5a2a')); }
        // la cuchara de hojalata junto al plato
        linea(100, 160, 120, 166, hex('#6a6e78')); linea(100, 159, 120, 165, hex('#c8ccd4')); for (let y = -2; y <= 2; y++) for (let x = -3; x <= 3; x++) if ((x / 3.4) ** 2 + (y / 2.4) ** 2 <= 1) pset(97 + x, 158 + y, x + y < 0 ? hex('#e0e4ec') : hex('#9a9ea8'));
        // la taza de hojalata con el borde enrollado, la luz y la sombra
        rect(239, 127, 255, 147, hex('#3a3c44')); rect(240, 128, 254, 146, hex('#a8aab4')); rect(240, 128, 243, 146, hex('#d8dae2')); rect(241, 129, 241, 145, C.blanco); rect(251, 128, 254, 146, hex('#7a7c86'));
        rect(239, 126, 255, 128, hex('#c8cad4')); rect(241, 127, 253, 127, hex('#5a5c66')); rect(240, 146, 254, 146, hex('#6a6c76'));
        rect(255, 131, 259, 132, hex('#8a8c96')); rect(258, 132, 259, 140, hex('#8a8c96')); rect(255, 140, 259, 141, hex('#6a6c76')); rect(246, 136, 247, 138, hex('#8a8c96'));
        // el tarro de cristal con agua y flores del prado
        rect(85, 115, 103, 141, hex('#5a7884')); rect(86, 116, 102, 140, hex('#b8d0d8')); rect(86, 116, 88, 140, hex('#e0f0f4')); rect(100, 116, 102, 140, hex('#8aa0a8')); rect(88, 126, 100, 139, hex('#a0c4d0')); rect(88, 126, 100, 126, hex('#e8f8fc')); rect(85, 114, 103, 115, hex('#d8e8ec'));
        for (let k = 0; k < 4; k++) linea(90 + k * 3, 139, 92 + k * 2, 117, hex('#4a7a32'));
        for (const [fx, fy, c] of [[90, 104, '#f2d240'], [96, 100, '#b08ae0'], [100, 106, '#f6f4ea'], [86, 108, '#ee8eb0'], [94, 108, '#f2d240'], [104, 101, '#ee8eb0'], [83, 101, '#f6f4ea']]) { linea(94, 117, fx, fy + 2, hex('#4a7a32')); disco(fx, fy, 2, hex(c)); pset(fx - 1, fy - 1, a_prMez(hex(c), C.blanco, 0.5)); pset(fx, fy, hex('#f8c030')); }
        pset(84, 112, hex('#7ab84a')); pset(105, 110, hex('#7ab84a'));
        // el salero de madera con la sal
        for (let y = -3; y <= 3; y++) for (let x = -6; x <= 6; x++) { const e = (x / 6) ** 2 + (y / 3) ** 2; if (e > 1) continue; pset(132 + x, 126 + y, y < 0 ? (e > 0.6 ? hex('#6a4a2a') : hex('#f4f2ec')) : x < -2 ? hex('#c8945a') : hex('#8a5a30')); }
        // el trapo de cuadros rojos, doblado, en la esquina de la izquierda
        poligono([[6, 162], [48, 158], [54, 179], [2, 179]], hex('#5a2a22'));
        for (let y = 159; y < 180; y++) for (let x = 3; x < 54; x++) { const a = 6 - (y - 162) * 0.2, b = 48 + (y - 158) * 0.3; if (x < a || x > b || y < 160 - (x - 6) * 0.1) continue; const cu = (Math.floor((x - y * 0.2) / 4) + Math.floor(y / 4)) % 2; pset(x, y, cu ? hex('#c83a32') : hex('#ece4d8')); if ((x - Math.round(y * 0.2)) % 4 === 0 && !cu) pset(x, y, hex('#e0a8a0')); }
        linea(6, 162, 48, 158, hex('#f6f0e8')); linea(10, 170, 50, 166, hex('#8a2a22'));
        // migas por toda la mesa y el paquetito atado
        for (let k = 0; k < 30; k++) { const x = 60 + Math.round(h(k, 1, 544) * 200), y = 130 + Math.round(h(k, 2, 544) * 44); rect(x, y, x + (k % 2), y, hex('#e0b070')); pset(x, y + 1, hex('#8a6a40')); }
        rect(189, 155, 215, 169, hex('#4a3420')); rect(190, 156, 214, 168, hex('#a88a6a')); rect(190, 156, 214, 157, hex('#c8aa8a')); rect(212, 158, 214, 168, hex('#8a6a4a')); linea(202, 156, 202, 168, hex('#c83a32')); linea(190, 162, 214, 162, hex('#c83a32')); disco(202, 155, 2, hex('#c83a32')); pset(201, 154, hex('#f08080'));   // un paquetito atado
      });
      return dat;
    }
    // ─ general ─
    a_prTablas(R, 0, 9, 319, 129, P, 501, { ancho: 7, mugre: 8 });
    a_prTablas(R, 0, 0, 319, 8, a_prH('#6a5a48 #4e4236 #3a3028 #241e18'), 503, { horiz: true, ancho: 4 }); rect(0, 8, 319, 9, hex('#241e18'));
    for (const [x, y0, y1] of [[27, 60, 96], [132, 74, 112], [195, 20, 52]]) for (let y = y0; y < y1; y++) if (h(x, y >> 2, 502) < 0.8) pset(x, y, hex('#f4e0b0'));   // rendijas de luz
    rect(0, 126, 319, 129, hex('#4a3a2e')); rect(0, 126, 319, 126, hex('#6a5442'));                                                  // el zócalo
    a_prTablas(R, 0, 130, 319, 179, a_prH('#9a8064 #7a6248 #5a4634 #3a2c22'), 504, { horiz: true, ancho: 7 });
    rect(0, 130, 319, 130, hex('#2a201a'));
    // la ventana con la Veta gris (su luz cae al suelo), el visillo y la cortina
    const W = [212, 46, 252, 86]; dat.ventana = W;
    rect(W[0] - 4, W[1] - 4, W[2] + 4, W[3] + 5, hex('#4a3a2e')); rect(W[0] - 3, W[1] - 3, W[2] + 3, W[3] + 3, hex('#8a7058')); fuera(W[0], W[1], W[2], W[3], 1);
    dat.marco = a_prMarca(R, W[0], W[1], W[2], W[3], () => { rect(W[0], W[1] + 19, W[2], W[1] + 20, hex('#6a5442')); rect(W[0] + 19, W[1], W[0] + 20, W[3], hex('#6a5442'));
      for (let i = 0; i < 14; i++) { const y = W[1] + 2 + i * 3; if (y < W[3] - 4) linea(W[0] + 2 + i * 2, y, W[0] + 6 + i * 2, y - 4, hex('#d8e0e8')); } });
    rect(W[0] - 6, W[3] + 4, W[2] + 6, W[3] + 6, hex('#8a7058')); rect(W[0] - 6, W[3] + 6, W[2] + 6, W[3] + 6, hex('#3a2c22'));
    rect(W[0] - 8, W[1] - 8, W[2] + 8, W[1] - 7, hex('#3a3a42'));
    for (let y = W[1] - 6; y < W[3] + 2; y++) for (let x = W[2] + 1; x < W[2] + 9; x++) pset(x, y, (x + (y >> 2)) % 5 === 0 ? hex('#7a5a5a') : (y % 6 < 3 ? hex('#c8b8a0') : hex('#b0a088')));
    rect(W[0] + 2, W[3] + 1, W[0] + 6, W[3] + 3, hex('#7a9a5a'));                                                                    // un tarro con hierbas en el alféizar
    if (!noche) for (let y = 131; y < 172; y++) { const u = (y - 131) / 41, a = Math.round(170 - u * 40), b = Math.round(214 - u * 36); for (let x = a; x <= b; x++) if ((x + y) % 2 === 0 || u > 0.2) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#fff0c8'), 0.22); }
    // la puerta de tablas con su travesaño en zeta, el pestillo y la luz que se cuela por las rendijas
    a_prTablas(R, 64, 74, 90, 129, a_prH('#8a7a64 #6a5a48 #4e4234 #2e261e'), 505, { ancho: 5, mugre: 3 });
    rect(62, 72, 92, 73, hex('#3a2c22')); rect(62, 72, 63, 129, hex('#3a2c22')); rect(91, 72, 92, 129, hex('#3a2c22'));
    for (const y of [82, 118]) rect(64, y, 90, y + 2, hex('#5a4a38')); linea(66, 117, 88, 85, hex('#5a4a38')); linea(66, 118, 88, 86, hex('#4a3a2e'));
    rect(86, 100, 88, 103, hex('#8a8a96')); pset(87, 101, hex('#c8c8d0'));
    if (!noche) for (let y = 74; y < 129; y++) pset(91, y, hex('#f8e4b0'));
    // la cocina de hierro con la olla, la balda con tarros, latas y el quinqué, el cubo y el carbón
    const E = a_prEstufa(R, 10, 129); dat.rejilla = E.rejilla; dat.olla = E.olla; a_prOlla(R, E.olla[0] + 2, E.olla[1]);
    rect(2, 54, 58, 56, hex('#6a5442')); rect(2, 57, 58, 57, hex('#3a2c22')); rect(6, 57, 7, 62, hex('#4a3a2e')); rect(52, 57, 53, 62, hex('#4a3a2e'));
    for (const [jx, w, a, c] of [[4, 5, 8, '#b8d0d8'], [11, 6, 10, '#c8a060'], [19, 4, 6, '#8a8e96'], [25, 7, 7, '#a85a4a'], [34, 5, 9, '#d8d0c0']]) { rect(jx, 54 - a, jx + w, 53, hex(c)); rect(jx, 54 - a, jx, 53, a_prMez(hex(c), C.blanco, 0.35)); rect(jx, 54 - a, jx + w, 54 - a, a_prMez(hex(c), C.k, 0.3)); }
    rect(44, 44, 50, 53, hex('#c8a040')); rect(45, 40, 49, 44, hex('#e8eef4')); rect(46, 38, 48, 39, hex('#8a8a96')); rect(43, 52, 51, 53, hex('#8a6a30'));   // el quinqué
    dat.quinque = [47, 42];
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if (((i - 4) ** 2) / 20 + ((j - 4) ** 2) / 18 < 1) pset(64 + i - 4, 140 + j, j < 3 ? hex('#5a5a62') : hex('#3a3a42'));   // el cubo del carbón
    for (let k = 0; k < 6; k++) disco(60 + (k % 3) * 3, 138 + Math.floor(k / 3) * 2, 1.4, hex('#18181c'));
    rect(0, 100, 3, 129, hex('#a8aab4')); rect(0, 100, 0, 129, hex('#d8dae2'));   // la escoba apoyada
    // el taburete con la palangana del agua y la jarra
    rect(70, 154, 92, 156, hex('#8a6a48')); rect(70, 154, 92, 154, hex('#b08c64')); for (const lx of [72, 89]) rect(lx, 157, lx + 1, 170, hex('#6a4e34'));
    for (let i = 0; i < 18; i++) { const w = Math.round(Math.sin(i / 17 * Math.PI) * 4); rect(72 + i, 153 - w, 72 + i, 153, i < 3 || i > 14 ? hex('#8a8e96') : hex('#c0c4cc')); } rect(75, 149, 86, 149, hex('#8ab0c8'));
    rect(90, 140, 95, 153, hex('#c8b090')); rect(90, 140, 91, 153, hex('#e0ccb0')); rect(95, 143, 97, 148, hex('#a89070'));
    // el reloj de pared (el péndulo, en vivo)
    disco(150, 40, 8, hex('#4a3426')); disco(150, 40, 6, hex('#e8dcc0')); for (let a = 0; a < 12; a++) pset(Math.round(150 + Math.cos(a / 12 * 6.283) * 5), Math.round(40 + Math.sin(a / 12 * 6.283) * 5), hex('#5a4a3a'));
    linea(150, 40, 150, 36, hex('#2a2a2a')); linea(150, 40, 153, 41, hex('#2a2a2a')); rect(145, 48, 155, 66, hex('#4a3426')); rect(146, 49, 154, 65, hex('#2a1e18')); dat.reloj = [150, 50];
    // la tina de zinc colgada de un clavo y, en los ganchos, la chaqueta y la gorra de minero
    for (let y = 70; y < 96; y++) for (let x = 100; x < 132; x++) { const e = ((x - 116) / 16) ** 2 + ((y - 83) / 13) ** 2; if (e > 1) continue; pset(x, y, e > 0.82 ? hex('#5a5e66') : (x - 100) % 5 === 0 ? hex('#8a8e96') : x < 110 ? hex('#c0c4cc') : hex('#a0a4ac')); }
    rect(115, 66, 117, 70, hex('#3a3a42')); rect(104, 82, 128, 82, hex('#6a6e76'));
    rect(176, 80, 200, 81, hex('#4a3a2e')); for (const gx of [180, 194]) rect(gx, 82, gx + 1, 84, hex('#8a8a96'));
    poligono([[176, 84], [186, 84], [188, 112], [174, 112]], hex('#5a4a3e')); poligono([[176, 84], [180, 84], [178, 112], [174, 112]], hex('#7a6656')); rect(178, 92, 184, 92, hex('#3e3228'));
    rect(190, 84, 199, 89, hex('#3a3a42')); rect(188, 89, 201, 90, hex('#2a2a30')); rect(193, 85, 196, 87, hex('#6a6a74')); pset(194, 86, hex('#fff2a0'));
    // la cama de Sid con su manta de parches y la almohada, y la alfombra trenzada
    a_prAlfombra(R, 150, 160, 54, 12);
    const MC = a_prH('#8a6a48 #6a4e34 #4a3626'); rect(258, 118, 261, 152, MC[1]); rect(258, 118, 258, 152, MC[0]); rect(256, 116, 263, 118, MC[2]);
    rect(262, 134, 319, 146, MC[1]); rect(262, 146, 319, 148, MC[2]);
    rect(264, 126, 282, 134, hex('#ece6d8')); rect(264, 126, 282, 126, hex('#ffffff')); rect(266, 133, 280, 134, hex('#c8c0b0'));
    { const PP = a_prH('#8a4a3a #c8a060 #5a6a7a #6a7a5a #a87a50 #d8c8b0'); for (let y = 128; y <= 146; y++) for (let x = 278; x <= 319; x++) { const pi = Math.floor((x - 278) / 7), pj = Math.floor((y - 128) / 6); let c = PP[(pi + pj * 2) % 6]; if ((x - 278) % 7 === 0 || (y - 128) % 6 === 0) c = a_prMez(c, C.k, 0.35); if (y === 128) c = a_prMez(c, C.blanco, 0.2); pset(x, y, c); } }
    // la mesa (con o.sentados va también por delante) y las dos sillas
    a_prSilla(R, 100, 166, 1); a_prSilla(R, 206, 166, -1);
    dat.mesa = a_prMarca(R, 108, 130, 210, 170, () => { a_prMesa(R, 112, 204, 144, 168);
      rect(132, 140, 146, 143, hex('#d8d8e2')); rect(133, 141, 145, 142, hex('#b8b8c4'));                                               // un cuenco
      rect(186, 137, 191, 143, hex('#a8aab4')); rect(186, 137, 186, 143, hex('#d8dae2')); rect(191, 139, 193, 141, hex('#8a8c96')); }); // la taza
    // juguetes de madera en el suelo: un caballito y bloques; el agujero del ratón en el zócalo
    rect(236, 160, 248, 163, hex('#b08050')); rect(246, 154, 250, 160, hex('#b08050')); rect(249, 155, 251, 156, hex('#7a5030')); for (const lx of [237, 246]) rect(lx, 164, lx + 1, 168, hex('#8a6a40')); rect(232, 159, 236, 160, hex('#5a3a20'));
    for (const [bx, by, c] of [[214, 172, '#c84a4a'], [220, 172, '#4a8ac8'], [217, 167, '#e8b84a']]) { rect(bx, by - 4, bx + 4, by, hex(c)); rect(bx, by - 4, bx + 4, by - 4, a_prMez(hex(c), C.blanco, 0.4)); }
    rect(98, 121, 103, 126, hex('#1a1410')); disco(100.5, 121, 2.5, hex('#1a1410'));
    if (noche) luces.push(() => { a_prHalo(R, 47, 44, 46, hex('#ffcf80'), 0.5); rect(46, 41, 48, 43, hex('#fff2c0')); });
    return dat;
  },
  vivo(R, t, cam, luz, o, tn, F) {
    const d = F.dat, noche = luz === 'noche', W = d.ventana;
    // por la ventana: el humo de las chimeneas de enfrente y un vecino que pasa (recortados a la ventana)
    const caja = [W[0], W[1], W[2], W[3]];
    d.chimFuera.forEach(([x, y], k) => { if (k !== 2) a_prHumo(R, x, y - 1, t + k * 1.7, tn, { n: 5, alto: 18, viento: 10, r: 0.8, crece: 2.5, v: 0.13, caja }); });
    { const ciclo = 14, u = (t % ciclo) / ciclo, px = Math.round(W[0] - 6 + u * (W[2] - W[0] + 12)), sueloF = W[3] - Math.round((W[3] - W[1]) * 0.22) + 3;
      d.tmp ??= R.nuevo(); const ant = R.usar(d.tmp); R.copiar(ant); a_prFigura(R, px, sueloF, t, a_prGENTE[2], { anda: true, alto: cam === 'mesa' ? 14 : 9, tn, casco: true }); const tmp = R.buf; R.usar(ant);
      for (let y = W[1]; y <= W[3]; y++) for (let x = W[0]; x <= W[2]; x++) { const i = y * 320 + x; if (tmp[i] !== ant[i]) ant[i] = tmp[i]; } }
    a_prDevuelve(R, F, d.marco);   // los travesaños y los reflejos del cristal, por delante del humo y del vecino
    if (cam === 'mesa') {
      a_prHumo(R, 258, 63, t, tn, { n: 7, alto: 34, viento: -10, r: 1.4, crece: 4, v: 0.2, cols: [hex('#c8c8cc'), hex('#e0e0e4'), hex('#f4f4f6')] });
      for (let k = 0; k < 18; k++) { const x = Math.round(30 + ((h(k, 1, 545) * 90 + t * 3) % 90)), y = Math.round(40 + ((h(k, 2, 545) * 70 + t * (1 + k % 3)) % 70)); if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, a_prMez(R.buf[y * 320 + x], hex('#fff4d0'), 0.6)); }
      return { suelo: 116, libre: [20, 110], libre2: [192, 290], asientos: [[70, 116], [102, 116], [194, 116], [232, 116]], mesa: [0, 112, 319, 179], bollo: [160, 136], vela: o.vela === false ? null : [160, 103], ventana: W, cocina: [238, 112] };
    }
    // el fuego de la cocina (por la rejilla), el vapor de la olla, el péndulo del reloj, la ropa tendida
    const [rx0, ry0, rx1, ry1] = d.rejilla, fl = 0.5 + 0.5 * Math.sin(t * 11) * Math.sin(t * 6.3);
    for (let y = ry0; y <= ry1; y++) for (let x = rx0; x <= rx1; x++) { if ((x - rx0) % 3 === 0) continue; const q = h(x, Math.floor(y + t * 8), 546), b = (y - ry0) / (ry1 - ry0);
      R.pset(x, y, b + q * 0.5 > 1.1 - fl * 0.2 ? hex('#ffd060') : b + q * 0.5 > 0.7 ? hex('#f08a30') : hex('#8a2a1a')); }
    a_prHalo(R, (rx0 + rx1) / 2, ry1 + 4, 24, hex('#ffa050'), 0.28 + 0.1 * fl);
    a_prHumo(R, d.olla[0] + 2, d.olla[1] - 15, t, tn, { n: 6, alto: 26, viento: 8, r: 1, crece: 3.5, v: 0.22, cols: [hex('#c8c8cc'), hex('#e0e0e4'), hex('#f4f4f6')] });
    { const a = Math.sin(t * Math.PI) * 0.35, [px, py] = d.reloj; R.linea(px, py, Math.round(px + Math.sin(a) * 11), Math.round(py + Math.cos(a) * 11), tn(hex('#c8a040'))); R.disco(px + Math.sin(a) * 12, py + Math.cos(a) * 12, 2, tn(hex('#e8c050'))); }
    a_prRopa(R, t, 98, 30, 202, 33, tn, 547);
    // la peonza de Sid, que gira y se tambalea; el ratón que se asoma de vez en cuando
    { const x = 228 + Math.round(Math.sin(t * 1.3) * 4), y = 174, f = Math.floor(t * 12) % 3, cs = [hex('#c84a4a'), hex('#e8d8b0'), hex('#4a8ac8')].map(tn), ld = Math.round(Math.sin(t * 5) * 1);
      for (let j = 0; j < 6; j++) { const w = j < 4 ? j : 6 - j; for (let i = -w; i <= w; i++) R.pset(x + i + Math.round(ld * j / 6), y - j, cs[(i + w + f + 9) % 3]); } R.rect(x + ld, y - 8, x + ld, y - 6, tn(hex('#6a4a2a'))); R.pset(x, y + 1, tn(hex('#3a2c22'))); }
    { const c = t % 7; if (c > 4 && c < 6) { const s = Math.min(1, (c - 4) * 3, (6 - c) * 3), mx = 101 + Math.round(s * 4); R.rect(mx - 2, 123, mx + 1, 126, tn(hex('#8a8a92'))); R.pset(mx + 2, 125, tn(hex('#e8a0a8'))); R.pset(mx, 122, tn(hex('#b8b8c0'))); R.pset(mx + 1, 124, C.k); } }
    // el polvo que flota en la luz de la ventana
    if (!noche) for (let k = 0; k < 24; k++) { const u = (h(k, 1, 548) + t * 0.03 * (1 + k % 3)) % 1, x = Math.round(214 - u * 50 + Math.sin(t + k) * 3 + h(k, 2, 548) * 20), y = Math.round(88 + u * 70); if (Math.sin(t * 1.5 + k) > -0.2) R.pset(x, y, a_prMez(R.buf[y * 320 + x], hex('#fff4d0'), 0.55)); }
    if (noche) a_prHalo(R, 47, 44, 24, hex('#ffd890'), 0.12 + 0.06 * Math.sin(t * 9));
    // el bollo con la vela (o.vela) o sin ella (o.bollo), en la mesa
    const vela = (o.vela || o.bollo) ? a_prBollo(R, 158, 145, t, 1, !!o.vela, tn) : null;
    return { suelo: 168, libre: [92, 250], mesa: [158, 144], asientos: [[122, 150], [176, 150]], vela, ventana: W, cocina: [32, 129], puerta: [64, 74, 90, 129], cama: [262, 126, 319, 148], peonza: [228, 174] };
  },
  delante(R, t, cam, luz, o, tn, F) {
    // de cerca, la mesa va siempre por delante (con el bollo y la vela); en general, solo con o.sentados
    if (cam === 'mesa') { a_prDevuelve(R, F, F.dat.mesa); a_prBollo(R, 160, 146, t, 3, o.vela !== false, tn);
      a_prVaho(R, 247, 124, t, tn, { n: 5, alto: 12, viento: 4, r: 1, crece: 2.5, v: 0.22, cols: [hex('#c8ccd2'), hex('#e4e6ea'), hex('#f8f9fa')] }); return; }
    if (o.sentados) { a_prDevuelve(R, F, F.dat.mesa); if (o.vela || o.bollo) a_prBollo(R, 158, 145, t, 1, !!o.vela, tn); }
  },
};
// el cobre (luz, base, sombra, oscuro) y el cristal de las botellas
const a_prCOBRE = a_prH('#f4b888 #d4844c #a85a2e #6a3418'), a_prVIDRIO = a_prH('#e8f4f8 #b8d4dc #8aa8b4 #5a7884');

// una pieza de cobre redonda (elipse cx, cy, rx, ry): luz arriba a la izquierda, sombra abajo a la derecha, martilleado,
// el brillo y una fila de remaches en y = remY
function a_prCobre(R, cx, cy, rx, ry, sem, remY) {
  const [cL, c, cS, cK] = a_prCOBRE;
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, e = dx * dx + dy * dy; if (e > 1) continue;
    const l = -dx * 0.6 - dy * 0.8 + (h(x >> 1, y >> 1, sem) - 0.5) * 0.35; let k = e > 0.88 ? cK : l > 0.45 ? cL : l > -0.2 ? c : l > -0.7 ? cS : cK;
    if (h(x, y, sem + 1) < 0.05) k = a_prMez(k, hex('#2a6a5a'), 0.35);   // la pátina verde
    R.pset(x, y, k); }
  R.disco(cx - rx * 0.42, cy - ry * 0.45, Math.max(1, rx * 0.12), hex('#fff0d8'));
  if (remY !== undefined) for (let x = Math.ceil(cx - rx); x <= cx + rx; x += 3) { const dx = (x - cx) / rx, y = Math.round(remY); if (((y - cy) / ry) ** 2 + dx * dx < 0.92) { R.pset(x, y, cK); R.pset(x, y - 1, cL); } }
}

// un tubo de cobre por los puntos [[x, y]…] de grosor w (con su luz arriba y las abrazaderas en las juntas)
function a_prTubo(R, pts, w) {
  const [cL, c, cS, cK] = a_prCOBRE;
  for (let k = 0; k < pts.length - 1; k++) { const [x0, y0] = pts[k], [x1, y1] = pts[k + 1], n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; for (let j = -w; j <= w; j++) R.pset(Math.round(x), Math.round(y + j), j === -w ? cL : j === w ? cK : j < 0 ? c : cS); } }
  for (const [x, y] of pts.slice(1, -1)) { R.rect(x - 1, y - w - 1, x + 1, y + w + 1, cS); R.pset(x - 1, y - w - 1, cL); }
}

// un barril de duelas con aros de hierro (x0..x1, y0..y1)
function a_prBarril(R, x0, y0, x1, y1, sem) {
  const M = a_prH('#a07a50 #7a5a38 #5a4028 #3a2818'), w = x1 - x0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / w, d = (x - x0) % 5, b = Math.sin(u * Math.PI);
    let k = d === 4 ? M[3] : u < 0.25 ? M[2] : u > 0.7 ? M[0] : M[1]; if (h(x, y >> 2, sem) < 0.12 && d) k = M[2]; if (b < 0.3 && (y === y0 || y === y1)) continue; R.pset(x, y, k); }
  for (const hy of [y0 + 2, Math.round((y0 + y1) / 2), y1 - 3]) { R.rect(x0, hy, x1, hy + 1, hex('#3a3a42')); R.rect(x0 + 2, hy, x0 + 5, hy, hex('#7a7a86')); }
  R.rect(x0 + 1, y0, x1 - 1, y0, hex('#2a1e14'));
}

// una caja de botellas (x, base, ancho, alto), tablillas de madera; con cuellos de botella de cristal asomando
function a_prCaja(R, x, base, w, a, botellas, sem) {
  const M = a_prH('#c8a070 #a07a50 #7a5a38 #4a3420');
  if (botellas) for (let i = x + 2; i < x + w - 2; i += 4) { R.rect(i, base - a - 5, i + 2, base - a, a_prVIDRIO[1]); R.rect(i + 1, base - a - 8, i + 1, base - a - 5, a_prVIDRIO[2]); R.pset(i, base - a - 4, a_prVIDRIO[0]); R.pset(i + 1, base - a - 8, hex('#8a6a40')); }
  a_prTablas(R, x, base - a, x + w, base, M, sem, { horiz: true, ancho: Math.max(3, Math.round(a / 3)), mugre: 0 });
  R.rect(x, base - a, x + 1, base, M[3]); R.rect(x + w - 1, base - a, x + w, base, M[3]); R.rect(x, base - a, x + w, base - a, M[0]);
  for (const cx of [x + 1, x + w - 1]) for (const cy of [base - a + 1, base - 1]) R.pset(cx, cy, hex('#9a9aa2'));
}

// una garrafa de mimbre (cx, base, r)
function a_prGarrafa(R, cx, base, r) {
  for (let y = base - 2 * r; y <= base; y++) for (let x = cx - r; x <= cx + r; x++) { const e = ((x - cx) / r) ** 2 + ((y - base + r) / r) ** 2; if (e > 1) continue; R.pset(x, y, (x * 2 + y) % 4 < 2 ? hex('#a8844a') : e > 0.7 ? hex('#5a4024') : hex('#c8a060')); }
  R.rect(cx - 1, base - 2 * r - 4, cx + 1, base - 2 * r, a_prVIDRIO[2]); R.rect(cx - 1, base - 2 * r - 5, cx + 1, base - 2 * r - 5, hex('#8a6a40'));
}

// un saco de arpillera atado (x, base, w, a)
function a_prSaco(R, x, base, w, a) {
  for (let y = base - a; y <= base; y++) { const u = (y - base + a) / a, m = Math.round(Math.sin(u * Math.PI) * w * 0.12); for (let i = -m; i <= w + m; i++) R.pset(x + i, y, (i + y * 2) % 3 === 0 ? hex('#8a7450') : i > w * 0.65 ? hex('#9a8460') : hex('#c0a878')); }
  R.rect(x + (w >> 1) - 2, base - a - 3, x + (w >> 1) + 2, base - a, hex('#c0a878')); R.rect(x + (w >> 1) - 2, base - a - 1, x + (w >> 1) + 2, base - a - 1, hex('#5a4024'));
  for (let k = 0; k < 4; k++) R.pset(x + 2 + k * 3, base - a - 4 + (k % 2), hex('#f0d050'));   // granos de maíz que asoman
}

// helechos que se mecen (x, base, tamaño)
function a_prHelecho(R, t, x, base, s, tn, sem) {
  const v = [hex('#4a7a32'), hex('#6a9a3e'), hex('#2e5426')].map(tn);
  for (let k = 0; k < 5; k++) { const a = -2.6 + k * 0.55 + Math.sin(t * 1.2 + k + sem) * 0.08, L = s * (0.7 + 0.3 * Math.sin(k * 1.3 + 1));
    for (let i = 0; i < L; i++) { const px = Math.round(x + Math.cos(a) * i), py = Math.round(base + Math.sin(a) * i + (i / L) ** 2 * s * 0.4); R.pset(px, py, v[2]); if (i % 2 === 0 && i < L - 1) { R.pset(px, py - 1, v[1]); R.pset(px + 1, py + 1, v[0]); } } }
}

// la luz que entra entre los árboles: bandas diagonales cálidas con motas que flotan
function a_prRayos(R, t, L, tn) {
  const B = R.buf, c = tn(hex('#fff2c0'));
  for (const [x0, w] of L) { const a = 0.1 + 0.05 * Math.sin(t * 0.7 + x0); for (let y = 0; y < 180; y++) { const xs = Math.round(x0 + y * 0.45); for (let x = xs; x < xs + w; x++) if (x >= 0 && x < 320 && a_prUm(x, y) < 0.7) B[y * 320 + x] = a_prMez(B[y * 320 + x], c, a); } }
  for (let k = 0; k < 20; k++) { const [x0, w] = L[k % L.length], u = (h(k, 1, 650) + t * 0.025) % 1, y = Math.round(u * 170), x = Math.round(x0 + y * 0.45 + h(k, 2, 650) * w + Math.sin(t + k) * 2); if (x >= 0 && x < 320 && Math.sin(t * 2 + k) > -0.3) R.pset(x, y, c); }
}

// una ardilla que sube y baja por un tronco (x, de y0 a y1), para de vez en cuando y mueve la cola
function a_prArdilla(R, t, x, y0, y1, tn) {
  const c = tn(hex('#b8642a')), cS = tn(hex('#7a3e18')), cL = tn(hex('#e8a060')), ciclo = 10, u = (t % ciclo) / ciclo, f = u < 0.35 ? u / 0.35 : u < 0.5 ? 1 : u < 0.85 ? 1 - (u - 0.5) / 0.35 : 0, sube = u < 0.35, y = Math.round(y1 - (y1 - y0) * f);
  const cola = Math.floor(t * 4) % 2;
  R.rect(x, y, x + 2, y + 5, c); R.rect(x, y + 1, x, y + 4, cS); R.pset(x + 3, y + (sube ? 0 : 5), cL); R.pset(x + 2, y + (sube ? 0 : 5), C.k);
  R.rect(x - 2 - cola, y + (sube ? 4 : -2), x - 1, y + (sube ? 8 : 2), c); R.pset(x - 2 - cola, y + (sube ? 8 : -2), cL);
}

const a_prDESTILERIA = {
  camaras: ['general', 'alambique'],
  luz: 'dia',
  cielo: (cam) => ({ hor: cam === 'alambique' ? 52 : 74, estratos: [[180, 0.4, 60], [40, 0.7, 80]] }),
  fijo(R, cam, luz) {
    const { rect, pset, linea, disco, poligono } = R, B = R.buf, dat = {};
    const bruma = (y0, y1, k) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; B[i] = a_prMez(B[i], hex('#b8ccd0'), k * (1 - (y - y0) / (y1 - y0 + 1) * 0.5)); } };
    const suelo = (y0) => { a_prTierra(R, 0, y0, 319, 179, a_prH('#9a7e5a #7a6044 #5a4632 #3e3024'), 601);
      for (let k = 0; k < 420; k++) { const x = Math.round(h(k, 1, 602) * 320), y = y0 + Math.round(h(k, 2, 602) * (179 - y0)), d = h(k, 3, 602) < 0.5 ? 1 : -1; pset(x, y, hex('#b8743a')); pset(x + d, y + 1, hex('#8a5428')); }   // agujas de pino
      for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 603) * 320), y = y0 + Math.round(h(k, 2, 603) * (179 - y0)); rect(x, y, x + 1, y, h(k, 3, 603) < 0.5 ? hex('#c8a040') : hex('#a85a2a')); }   // hojas caídas
      for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 604) * 320), y = y0 + 4 + Math.round(h(k, 2, 604) * (175 - y0)); for (let i = 0; i < 7; i++) if (h(x + i, y, 605) < 0.7) pset(x + i, y, hex('#5a7a2e')); } };   // musgo
    if (cam === 'alambique') {
      a_prMontes(R, 50, 10, a_prH('#9aa8b8 #8494a8 #6e7e94'), 2.1, 70);
      // el fondo del bosque bajo los montes (lo que queda entre los pinos): verde azulado que se oscurece hacia abajo
      for (let y = 40; y <= 112; y++) { const u = Math.max(0, (y - 70) / 42); for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i] >>> 24) continue; B[i] = u > a_prUm(x, y) * 0.5 + 0.5 ? hex('#5e8458') : u > a_prUm(x, y) * 0.5 ? hex('#7a9a80') : hex('#94aca6'); } }
      // tres términos de pinos: lejos, pálidos y azulados en la bruma; en medio; y cerca, oscuros y altos
      a_prPinar(R, 84, -6, 326, 40, 14, 26, 651, a_prPINOS[0]); bruma(24, 84, 0.5);
      a_prPinar(R, 98, -6, 326, 30, 24, 42, 652, a_prPINOS[1], (x) => (x > 262 ? 52 : 80)); bruma(30, 98, 0.26);
      // entre el pinar del medio y el de cerca, la penumbra del sotobosque: troncos finos, matas y la luz que se cuela
      for (let y = 96; y <= 112; y++) for (let x = 0; x < 320; x++) { const u = (y - 96) / 16, tronco = h(x >> 1, 3, 653) < 0.12;
        B[y * 320 + x] = tronco ? (x & 1 ? hex('#4a3a2e') : hex('#6a5442')) : u + Math.sin(x * 0.21) * 0.15 > 0.55 + a_prUm(x, y) * 0.3 ? hex('#4e7246') : a_prUm(x, y) < 0.5 ? hex('#6a8c60') : hex('#7e9e72'); }
      a_prPinar(R, 112, -10, 330, 15, 46, 72, 611, a_prPINOS[2], (x) => (x > 262 ? 60 : 100)); bruma(40, 112, 0.08);
      suelo(112);
      // el hogar de piedras con la boca del fuego, la caldera grande de cobre con su cúpula, el cuello de cisne y el serpentín
      for (let k = 0; k < 13; k++) { const x = 36 + k * 8 + (k % 2) * 2, y = 150 + (k % 3) * 3; disco(x, y, 6, hex('#5a5650')); disco(x - 1, y - 1, 4.5, hex('#8a8478')); pset(x - 2, y - 3, hex('#b0aa9e')); }
      rect(62, 144, 106, 160, hex('#1a1410')); dat.fuego = [64, 146, 104, 158];
      a_prCobre(R, 84, 104, 46, 40, 612, 120); a_prCobre(R, 84, 64, 22, 9, 613);
      rect(80, 52, 88, 57, a_prCOBRE[2]); rect(80, 52, 82, 57, a_prCOBRE[1]);
      a_prTubo(R, [[86, 52], [112, 40], [150, 52], [196, 72]], 2);
      a_prBarril(R, 176, 70, 234, 158, 614);
      for (let k = 0; k < 4; k++) { const y = 84 + k * 16; linea(176, y, 234, y + 6, a_prCOBRE[2]); linea(176, y - 1, 234, y + 5, a_prCOBRE[0]); }   // el serpentín se adivina por fuera
      a_prBarril(R, 176, 70, 234, 74, 614);
      a_prTubo(R, [[234, 140], [242, 140], [246, 126]], 1); rect(244, 126, 248, 127, a_prCOBRE[3]);
      // la caja con la botella bajo el caño, otras cajas detrás, un saco y la garrafa
      a_prCaja(R, 268, 160, 50, 22, true, 615); a_prCaja(R, 272, 138, 44, 18, true, 616);
      a_prCaja(R, 230, 178, 34, 12, false, 617); dat.botella = [246, 132, 166];
      a_prGarrafa(R, 20, 176, 9); a_prSaco(R, 140, 176, 18, 14);
      for (let x = 0; x < 320; x++) { const y = 170 + Math.round(Math.sin(x * 0.05) * 2); for (let j = y; j < 180; j++) if (h(x, j, 618) < 0.25) pset(x, j, hex('#3e3024')); }
      return dat;
    }
    // ─ general ─
    a_prMontes(R, 70, 12, a_prH('#a8b4c4 #92a0b4 #7c8aa0'), 3.3, 92);
    // el fondo del bosque bajo los montes (lo que queda entre los pinos): verde azulado que se oscurece hacia abajo
    for (let y = 50; y <= 106; y++) { const u = Math.max(0, (y - 80) / 26); for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i] >>> 24) continue; B[i] = u > a_prUm(x, y) * 0.5 + 0.5 ? hex('#5e8458') : u > a_prUm(x, y) * 0.5 ? hex('#7a9a80') : hex('#94aca6'); } }
    // tres términos: pinos pálidos lejos en la bruma, el bosque del 12 en medio y pinos oscuros más cerca
    a_prPinar(R, 88, -6, 326, 44, 12, 24, 620, a_prPINOS[0]); bruma(40, 88, 0.5);
    a_prBosque(R, 98, -6, 326, 30, 22, 44, 621, (x) => (x > 262 ? 46 : 70)); bruma(46, 98, 0.3);
    a_prPinar(R, 104, -6, 326, 20, 28, 52, 622, a_prPINOS[2], (x) => (x > 262 ? 52 : 80)); bruma(52, 104, 0.12);
    suelo(102);
    // la senda pisada que viene del bosque al cobertizo, la luz moteada que cae entre las copas, raíces, piedras, setas y
    // el montón de leña
    for (let y = 104; y < 180; y++) { const u = (y - 104) / 76, cx = 150 - u * 110 + Math.sin(y * 0.08) * 6, w = 6 + u * 26; for (let x = Math.round(cx - w); x <= cx + w; x++) { if (x < 0 || x > 319) continue; const e = Math.abs(x - cx) / w; if (e > 0.85 && a_prUm(x, y) < (e - 0.85) * 6) continue; B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#c8a87a'), 0.35); } }
    for (const [cx, cy, rx, ry] of [[52, 128, 18, 4], [96, 170, 22, 5], [200, 166, 16, 3], [290, 132, 14, 3], [28, 156, 10, 3]]) for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1 && a_prUm(x, y) < (1 - e) * 1.2 && x >= 0 && x < 320) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#fff0c0'), 0.3); }
    for (const [x0, dx, L] of [[18, 1, 30], [8, -1, 10], [22, 1, 18]]) for (let i = 0; i < L; i++) { const x = x0 + i * dx, y = 170 + Math.round(i * 0.25 + Math.sin(i * 0.4) * 1.5); if (x < 0) continue; rect(x, y, x, y + 2, a_prCORTEZA[1]); pset(x, y, a_prCORTEZA[0]); pset(x, y + 3, a_prCORTEZA[3]); }
    for (let k = 0; k < 4; k++) for (let j = 0; j < 3 - (k >> 1); j++) { const lx = 30 + (k % 2) * 2 + j * 7 + (k >> 1) * 3, ly = 150 - (k >> 1) * 5; disco(lx, ly, 3, hex('#5a4030')); disco(lx, ly, 2, hex('#c8a070')); pset(lx, ly, hex('#8a6a40')); }
    for (const [px, py, r] of [[60, 172, 3], [112, 176, 2.5], [228, 172, 3], [304, 150, 2.5], [8, 120, 2]]) { disco(px, py, r, hex('#5a5650')); disco(px - 0.5, py - 0.5, r * 0.7, hex('#8a8478')); pset(Math.round(px - r * 0.4), Math.round(py - r * 0.5), hex('#b0aa9e')); }
    for (const [sx, sy] of [[48, 176], [52, 175], [214, 176]]) { rect(sx, sy, sx, sy + 2, hex('#e8e0d0')); rect(sx - 2, sy - 1, sx + 2, sy - 1, hex('#b8743a')); pset(sx - 1, sy - 2, hex('#e8a060')); }
    // las copas de arriba (sin tapar la barra del año ni la esquina de Atom) y los dos troncos grandes del primer término
    for (const [x, y, r] of [[196, 6, 16], [226, 2, 14], [252, 10, 12], [182, 22, 10], [4, 30, 14], [14, 8, 14]]) a_prHojas(R, x, y, r, a_prFOLLAJE, x + y, null);
    a_prRama(R, 12, 182, 12, 0, 20, 15, a_prCORTEZA, 623, 0.25); a_prRama(R, 4, 172, 26, 182, 8, 4, a_prCORTEZA, 624, 0.3);
    a_prRama(R, 262, 182, 258, 50, 15, 10, a_prCORTEZA, 625, 0.2); a_prRama(R, 258, 60, 232, 36, 6, 3, a_prCORTEZA, 626); a_prRama(R, 254, 176, 240, 182, 6, 3, a_prCORTEZA, 627);
    for (const [x, y, r] of [[236, 34, 10], [262, 44, 9], [222, 44, 8]]) a_prHojas(R, x, y, r, a_prFOLLAJE, x * 2 + y, null);
    // el cobertizo: dos postes y un tejado de tablas y chapa vieja, con su sombra
    for (let y = 104; y < 160; y++) for (let x = 104; x < 240; x++) { const u = (y - 104) / 56; if (x > 104 + u * 6 && x < 238 - u * 4) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#2a2018'), 0.28 * (1 - u * 0.6)); }
    for (const px of [112, 232]) { rect(px, 72, px + 2, 156, hex('#6a5038')); rect(px, 72, px, 156, hex('#8a6a4a')); rect(px + 2, 74, px + 2, 156, hex('#3e2e20')); }
    poligono([[104, 76], [242, 64], [244, 72], [104, 85]], a_prChapa(a_prCHAPA, 628)); poligono([[104, 85], [244, 72], [244, 75], [104, 88]], hex('#3a2c20')); linea(104, 88, 244, 75, hex('#241a12')); linea(104, 76, 242, 64, hex('#b8bcc4'));
    for (let x = 108; x < 240; x += 9) { const y = 86 - Math.round((x - 104) * 0.094); linea(x, y, x, y + 2, hex('#5a4634')); }
    // el hogar de piedras y la caldera de cobre con su cúpula, el cuello de cisne y el barril del serpentín con su caño
    for (let k = 0; k < 9; k++) { const x = 136 + k * 5 + (k % 2), y = 148 + (k % 2) * 2; disco(x, y, 4, hex('#5a5650')); disco(x - 1, y - 1, 3, hex('#8a8478')); pset(x - 1, y - 2, hex('#b0aa9e')); }
    rect(148, 142, 166, 151, hex('#1a1410')); dat.fuego = [149, 143, 165, 150];
    a_prCobre(R, 157, 124, 20, 17, 629, 131); a_prCobre(R, 157, 106, 10, 5, 630); rect(155, 98, 159, 101, a_prCOBRE[2]);
    a_prTubo(R, [[158, 99], [170, 92], [196, 108]], 1);
    a_prBarril(R, 190, 108, 214, 148, 631); a_prTubo(R, [[214, 140], [219, 140], [221, 143]], 1);
    rect(160, 72, 162, 140, hex('#3a3a42')); rect(160, 72, 160, 140, hex('#6a6a74'));                                 // el tubo del humo, por el tejado
    rect(216, 146, 226, 156, a_prVIDRIO[2]); rect(217, 147, 225, 155, a_prVIDRIO[1]); rect(217, 147, 218, 155, a_prVIDRIO[0]); rect(218, 144, 224, 145, a_prVIDRIO[3]); dat.jarra = [217, 147, 225, 155];
    // la tina del mosto con su pala, la garrafa, los sacos de maíz y las cajas de botellas (donde se cargan)
    a_prBarril(R, 118, 128, 136, 156, 632); rect(119, 128, 135, 130, hex('#8a6a3a')); linea(126, 129, 134, 112, hex('#a07a50')); linea(127, 129, 135, 112, hex('#7a5a38'));
    a_prGarrafa(R, 100, 156, 7); a_prSaco(R, 66, 156, 16, 14); a_prSaco(R, 84, 157, 14, 12);
    a_prCaja(R, 240, 160, 30, 14, true, 633); a_prCaja(R, 272, 160, 30, 14, true, 634); a_prCaja(R, 254, 146, 30, 14, true, 635); a_prCaja(R, 300, 160, 22, 14, false, 636);
    for (const [sx, sy] of [[36, 160], [40, 158], [290, 172]]) { rect(sx, sy, sx, sy + 2, hex('#e8e0d0')); rect(sx - 2, sy - 1, sx + 2, sy - 1, hex('#c84a3a')); pset(sx - 1, sy - 2, hex('#f0e8d8')); }
    return dat;
  },
  vivo(R, t, cam, luz, o, tn, F) {
    const d = F.dat, noche = luz === 'noche', al = cam === 'alambique';
    a_prCieloVivo(R, t, F, luz);
    // el fuego bajo la caldera (llamas pequeñas dentro de su boca) y su luz
    const [fx0, fy0, fx1, fy1] = d.fuego, fl = 0.5 + 0.5 * Math.sin(t * 11) * Math.sin(t * 6.1);
    for (let y = fy0; y <= fy1; y++) for (let x = fx0; x <= fx1; x++) { const b = (y - fy0) / (fy1 - fy0), q = h(x >> (al ? 1 : 0), Math.floor(y + t * 10), 640), lim = 1 - b - (q - 0.5) * 0.8 - Math.sin(x * 0.7 + t * 9) * 0.15;
      if (lim < 0.15) R.pset(x, y, hex('#ffe070')); else if (lim < 0.4) R.pset(x, y, hex('#f89838')); else if (lim < 0.6) R.pset(x, y, hex('#b83a1a')); }
    for (let x = fx0; x <= fx1; x += al ? 4 : 3) R.rect(x, fy1 - 1, x + (al ? 2 : 1), fy1, hex('#3a2418'));
    a_prHalo(R, (fx0 + fx1) / 2, fy1, al ? 60 : 34, hex('#ffa050'), (noche ? 0.55 : 0.3) + 0.1 * fl);
    // las gotas que caen del caño y llenan la botella (o.llena 0–1)
    const llena = Math.max(0, Math.min(1, o.llena ?? 0.45)), g = (t % 0.7) / 0.7;
    if (al) { const [bx, by, bb] = d.botella, [v0, v1, v2, v3] = a_prVIDRIO.map(tn);
      R.rect(bx - 6, by + 8, bx + 6, bb, v2); R.rect(bx - 5, by + 9, bx + 5, bb - 1, v1); R.rect(bx - 2, by, bx + 2, by + 7, v2); R.rect(bx - 1, by, bx + 1, by + 7, v1); R.rect(bx - 3, by - 1, bx + 3, by, v3);
      const ny = Math.round(bb - 1 - (bb - by - 10) * llena); R.rect(bx - 5, ny, bx + 5, bb - 1, tn(hex('#e8d8a8'))); R.rect(bx - 5, ny, bx + 5, ny, tn(hex('#fff4d0'))); R.rect(bx - 4, by + 10, bx - 3, bb - 3, v0);
      const gy = Math.round(128 + g * (ny - 128)); if (g < 0.92) { R.rect(bx, gy, bx, gy + 1, tn(hex('#fff8e0'))); R.pset(bx, gy - 1, tn(hex('#e8f0f0'))); } else { R.pset(bx - 2, ny - 1, C.blanco); R.pset(bx + 2, ny - 1, C.blanco); }
      a_prVaho(R, 84, 50, t, tn, { n: 11, alto: 36, viento: 16, r: 3, crece: 9, v: 0.15, cols: [hex('#b8bcc4'), hex('#dcdfe4'), hex('#f8f9fa')] });
      a_prRayos(R, t, [[120, 10], [250, 7]], tn);
      a_prHelecho(R, t, 6, 178, 16, tn, 1); a_prHelecho(R, t, 312, 178, 14, tn, 2);
      return { suelo: 172, libre: [256, 300], botella: [bx, by], caño: [246, 127], caldera: [84, 104], fuego: [84, 152] };
    }
    { const [jx0, jy0, jx1, jy1] = d.jarra, ny = Math.round(jy1 - (jy1 - jy0) * llena); R.rect(jx0, ny, jx1, jy1, tn(hex('#e8d8a8'))); R.pset(jx0, ny, tn(hex('#fff4d0'))); const gy = Math.round(144 + g * (ny - 144)); if (g < 0.9) R.pset(221, gy, tn(hex('#fff8e0'))); }
    a_prVaho(R, 161, 70, t, tn, { n: 16, alto: 60, viento: 40, r: 2.5, crece: 11, v: 0.09 });
    a_prVaho(R, 157, 97, t + 3, tn, { n: 6, alto: 16, viento: 5, r: 1.2, crece: 3, v: 0.24, cols: [hex('#b8bcc4'), hex('#dcdfe4'), hex('#f8f9fa')] });
    a_prRayos(R, t, [[40, 9], [150, 6], [196, 8]], tn);
    a_prArdilla(R, t, 20, 40, 150, tn);
    for (let k = 0; k < 5; k++) { const u = (t * 0.07 + h(k, 1, 641)) % 1, x = Math.round(150 + h(k, 2, 641) * 140 + Math.sin(t * 2 + k) * 6), y = Math.round(u * 160); if (y > 20) R.rect(x, y, x + 1, y, tn(k % 2 ? hex('#c8a040') : hex('#a85a2a'))); }   // hojas que caen
    if (noche) a_prLuciernagas(R, t, 30, 300, 90, 170, 20, 6);
    a_prHelecho(R, t, 30, 176, 14, tn, 3); a_prHelecho(R, t, 304, 178, 16, tn, 4); a_prHelecho(R, t, 180, 179, 10, tn, 5);
    return { suelo: 166, libre: [30, 104], cajas: [254, 160], caldera: [157, 124], jarra: [221, 150], fuego: [157, 147], barril: [190, 108, 214, 148] };
  },
};
// el carbón de las tablas quemadas [brillo de ceniza, carbón, negro, ceniza]
const a_prQUEM = a_prH('#423c40 #221e22 #0e0c10 #6e686c');

// una tabla quemada vertical (x, base, alto, ancho): negra, con la punta mellada, grietas en escamas y ceniza en el canto
function a_prTablaQ(R, x, base, alto, w, sem) {
  const [cL, c, cK, ce] = a_prQUEM;
  for (let i = 0; i < w; i++) { const top = base - alto + Math.round(h(i, 1, sem) * 4); for (let y = top; y <= base; y++) R.pset(x + i, y, i === 0 ? cL : (y + i * 3) % 4 === 0 && h(i, y >> 1, sem) < 0.6 ? cK : y < top + 2 ? ce : c); }
}

const a_prQUEMADA = {
  camaras: ['general', 'cerca'],
  luz: 'tarde',
  luces: (luz) => (luz === 'noche' ? 'noche' : 'ceniza'),   // de día o de tarde, la luz gris del humo
  cielo: (cam) => ({ hor: cam === 'cerca' ? 70 : 96 }),
  fijo(R, cam, luz, luces) {
    const { rect, pset, linea, disco, poligono } = R, B = R.buf, dat = {}, [cL, c, cK, ce] = a_prQUEM;
    if (cam === 'cerca') {
      a_prMontes(R, 66, 10, a_prH('#a89aa8 #8e8294 #766a7e'), 1.9, 80);
      for (let k = 0; k < 16; k++) a_prCasita(R, -4 + k * 22, 82 + (k % 2) * 2, 14, 9, k);
      a_prTierra(R, 0, 83, 319, 157, a_prH('#7a7270 #5e5654 #46403e #2a2628'), 707);
      a_prCasa(R, -18, 132, 50, 40, 1, {}, []); a_prCasa(R, 306, 132, 44, 38, 3, {}, []);   // las casas de al lado, en pie
      // la pared quemada: tablas negras de alturas melladas (por los huecos se ve el cielo), el hueco de la ventana y de la puerta
      for (let x = 40; x < 304; x += 4) { if ((x > 196 && x < 228) || (x > 100 && x < 116 && h(x, 2, 701) < 0.7)) continue; const top = x > 262 ? 64 + Math.round(h(x, 1, 701) * 20) : 48 + Math.round(h(x, 1, 701) * 40) + (x < 70 ? 16 : 0); a_prTablaQ(R, x, 132, 132 - top, 4, x); }
      rect(194, 56, 197, 132, cK); rect(226, 58, 229, 132, cK); rect(194, 56, 229, 59, cK); rect(194, 56, 194, 132, cL);                            // el marco de la puerta
      rect(132, 72, 168, 74, cK); rect(132, 98, 168, 100, cK); rect(132, 72, 134, 100, cK); rect(166, 72, 168, 100, cK); rect(150, 72, 151, 100, cK);   // el marco de la ventana
      // el porche: tablas del suelo partidas, un poste en pie, otro caído en diagonal, la chapa del tejadillo vencida
      a_prTablas(R, 30, 132, 300, 146, a_prH('#4a4448 #2e2a2c #1e1c1e #121014'), 702, { horiz: true, ancho: 4, mugre: 0 });
      for (let x = 120; x < 160; x++) for (let y = 134; y < 144; y++) if (((x - 140) / 20) ** 2 + ((y - 139) / 5) ** 2 < 1) pset(x, y, hex('#0e0c0e'));   // el agujero del suelo
      rect(60, 70, 64, 146, c); rect(60, 70, 60, 146, cL);
      poligono([[250, 146], [256, 146], [292, 80], [287, 78]], c); linea(250, 146, 287, 78, cL);
      poligono([[180, 60], [300, 96], [300, 104], [176, 66]], a_prChapa(a_prH('#5a5458 #3e3a3c #2a2628 #6a3a22 #4a2618'), 703)); linea(176, 66, 300, 104, cK);
      for (const [sx, a] of [[150, 146], [160, 152]]) { rect(140 - (a - 146), a, 210 + (a - 146), a + 5, hex('#3a3436')); rect(140 - (a - 146), a, 210 + (a - 146), a, hex('#5a5458')); }   // los escalones
      // el suelo de barro y ceniza, tablas caídas, la taza de hojalata
      a_prTierra(R, 0, 158, 319, 179, a_prH('#7a7270 #5e5654 #46403e #2a2628'), 704);
      for (let k = 0; k < 7; k++) { const x = Math.round(h(k, 1, 705) * 300), y = 160 + Math.round(h(k, 2, 705) * 16), L = 12 + Math.round(h(k, 3, 705) * 14), a = (h(k, 4, 705) - 0.5) * 0.4; for (let i = 0; i < L; i++) { const px = x + i, py = Math.round(y + i * a); pset(px, py, c); pset(px, py + 1, cK); if (i % 5 === 2) pset(px, py, cL); } }
      for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 706) * 320), y = 150 + Math.round(h(k, 2, 706) * 30); pset(x, y, ce); }
      // el primer término: montones de ceniza al pie del porche, las roderas de un carro, charcos que reflejan el cielo
      // gris, huellas de botas, cristales de la ventana y clavos (nada de bultos entre x 145–186: allí va la taza)
      for (const [mx, my, mw] of [[30, 159, 26], [96, 160, 20], [224, 159, 30], [288, 160, 22]]) for (let i = -mw; i <= mw; i++) { const a = Math.round(Math.cos(i / mw * 1.57) * 4); for (let j = 0; j <= a; j++) pset(mx + i, my - j + 2, j === a ? hex('#b4aeb0') : (i + j) % 3 ? hex('#8e888a') : hex('#a29c9e')); }
      for (const [y0, f] of [[167, 0], [176, 1.3]]) for (let x = 0; x < 320; x++) { if (x > 145 && x < 186 && y0 < 172) continue; const y = Math.round(y0 + Math.sin(x * 0.03 + f) * 1.5); pset(x, y, hex('#2e2a2c')); pset(x, y + 1, hex('#3e3a3c')); if (h(x, y0, 707) < 0.5) pset(x, y - 1, hex('#8a8486')); }
      for (const [cx, cy, rx, ry] of [[44, 171, 16, 3], [262, 174, 20, 3.5], [120, 178, 10, 2]]) for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e > 1) continue;
        pset(x, y, e > 0.75 ? hex('#3a3436') : y < cy ? hex('#8e8694') : a_prUm(x, y) < 0.5 ? hex('#a68e94') : hex('#b8a4a8')); if (y === Math.round(cy) && Math.abs(x - cx + rx * 0.3) < rx * 0.25) pset(x, y, hex('#e0d4d0')); }
      for (let k = 0; k < 9; k++) { const x = 62 + k * 9, y = 162 + Math.round(Math.sin(k * 0.9) * 2) + (k % 2) * 4; rect(x, y, x + 2, y + 1, hex('#3a3436')); pset(x + 1, y + 2, hex('#2a2628')); }
      for (let k = 0; k < 14; k++) { const x = 190 + Math.round(h(k, 1, 708) * 120), y = 160 + Math.round(h(k, 2, 708) * 18); pset(x, y, hex('#d8dce4')); if (k % 3 === 0) pset(x + 1, y, hex('#9aa0aa')); }
      for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 709) * 140), y = 162 + Math.round(h(k, 2, 709) * 16); pset(x, y, hex('#6a5a52')); pset(x + 1, y + 1, hex('#4a3a32')); }
      dat.taza = [176, 170];
      return dat;
    }
    // ─ general ─
    a_prMontes(R, 92, 18, a_prH('#a89aa8 #8e8294 #766a7e'), 3.9, 108);
    // la mina en la colina: la torre de extracción y la escombrera
    { const mx = 34, mb = 82; for (let i = 0; i < 16; i++) { pset(mx + Math.round(i * 0.4), mb - i, hex('#3a3440')); pset(mx + 12 - Math.round(i * 0.4), mb - i, hex('#3a3440')); } rect(mx + 4, mb - 18, mx + 8, mb - 16, hex('#3a3440')); disco(mx + 6, mb - 19, 2.5, hex('#4a4450'));
      poligono([[mx + 16, mb + 2], [mx + 30, mb - 10], [mx + 48, mb + 2]], hex('#4a4450')); }
    dat.chim = [];
    for (let k = 0; k < 15; k++) { const x = -6 + k * 23 + Math.round(h(k, 1, 711) * 5); dat.chim.push(a_prCasita(R, x, 114 - (k % 2) * 2, 13 + (k % 3), 9 + (k % 2), k)); }
    a_prTierra(R, 0, 115, 319, 179, a_prH('#8a7a6a #6e6052 #54483e #2e2a2c'), 712);
    // las roderas, los charcos que reflejan el cielo, la bomba de agua y cubos tirados
    for (let x = 0; x < 320; x++) { for (const [b, a] of [[150, 0.08], [164, 0.05]]) { const y = Math.round(b + (x - 160) * a * 0.2 + Math.sin(x * 0.04) * 2); pset(x, y, hex('#4a3e34')); pset(x, y + 1, hex('#5a4e42')); } }
    for (const [px, py, rx, ry] of [[52, 160, 14, 3], [214, 172, 18, 4], [292, 152, 10, 2.5]]) for (let y = Math.floor(py - ry); y <= py + ry; y++) for (let x = Math.floor(px - rx); x <= px + rx; x++) { if (((x - px) / rx) ** 2 + ((y - py) / ry) ** 2 > 1) continue; const sy = Math.max(0, Math.round(60 - (y - py) * 6)); pset(x, y, a_prMez(B[sy * 320 + x], hex('#4a4a5a'), 0.35)); }
    rect(120, 128, 123, 146, hex('#3a3a42')); rect(120, 128, 120, 146, hex('#6a6a74')); rect(116, 126, 126, 128, hex('#2a2a30')); linea(124, 130, 130, 124, hex('#4a4a52')); rect(124, 134, 126, 135, hex('#3a3a42'));
    rect(114, 146, 130, 148, hex('#6a6a74')); rect(115, 147, 129, 147, hex('#8a9aa8'));
    for (const [bx, by] of [[150, 142], [160, 146]]) { rect(bx, by - 4, bx + 5, by, hex('#7a7a86')); rect(bx, by - 4, bx, by, hex('#a8a8b4')); rect(bx - 1, by - 5, bx + 6, by - 5, hex('#5a5a62')); }
    // las dos casas vecinas, en pie
    const izq = a_prCasa(R, 6, 140, 46, 30, 1, { porche: true, noche: luz === 'noche' }, luces), der = a_prCasa(R, 266, 138, 44, 28, 2, { porche: true, noche: luz === 'noche' }, luces);
    dat.chimV = [izq.chimenea, der.chimenea];
    // LA CASA QUEMADA: la mancha de ceniza, el montón de tablas negras, los postes, la chapa caída, la estufa y su tubo en pie
    for (let y = 124; y < 142; y++) for (let x = 150; x < 266; x++) { const e = ((x - 208) / 58) ** 2 + ((y - 134) / 8) ** 2; if (e < 1 && a_prUm(x, y) < 1.1 - e) pset(x, y, e < 0.5 ? hex('#2a2628') : hex('#4a4446')); }
    for (let x = 176; x < 242; x += 3) a_prTablaQ(R, x, 134, 6 + Math.round(Math.sin((x - 176) / 66 * Math.PI) * 16 + h(x, 1, 713) * 6), 3, x);
    for (const [x, a] of [[178, 34], [184, 22], [190, 28], [228, 18], [234, 26]]) a_prTablaQ(R, x, 134, a, 4, x + 7);
    rect(174, 94, 177, 134, c); rect(174, 94, 174, 134, cL); rect(173, 93, 178, 94, cK);
    poligono([[238, 134], [242, 134], [232, 98], [229, 99]], c); linea(238, 134, 229, 99, cL);
    poligono([[186, 116], [224, 104], [226, 108], [188, 121]], a_prChapa(a_prH('#5a5458 #3e3a3c #2a2628 #6a3a22 #4a2618'), 714)); linea(188, 121, 226, 108, cK);
    poligono([[200, 128], [236, 118], [238, 122], [204, 132]], a_prChapa(a_prH('#5a5458 #3e3a3c #2a2628 #6a3a22 #4a2618'), 715));
    rect(208, 120, 222, 132, hex('#1e1c20')); rect(208, 120, 222, 121, hex('#3a3840')); rect(213, 86, 216, 120, hex('#2a2830')); rect(213, 86, 213, 120, hex('#4a4850')); rect(212, 85, 217, 86, cK);
    dat.casa = [172, 86, 244, 134]; dat.humo = [[196, 118], [214, 112], [230, 120]];
    return dat;
  },
  vivo(R, t, cam, luz, o, tn, F) {
    const d = F.dat, B = R.buf;
    a_prCieloVivo(R, t, F, luz, { gris: true });
    if (cam === 'cerca') {
      // el humo que pasa de lado, gris, y la ceniza que cae (sin brasas)
      for (let k = 0; k < 3; k++) a_prHumareda(R, 150 + k * 60, 132 - k * 8, t + k * 2.1, tn, { n: 12, alto: 70, viento: 80, r: 3, crece: 9, v: 0.07 });
      for (let y = 100; y < 158; y++) { const a = 0.08 + 0.06 * Math.sin(y * 0.2 + t * 0.6); for (let x = 0; x < 320; x++) if (a_prUm(x, y) < 0.5 && Math.sin(x * 0.03 - t * 0.8 + y * 0.05) > 0.3) B[y * 320 + x] = a_prMez(B[y * 320 + x], hex('#a8a4aa'), a); }
      for (let k = 0; k < 26; k++) { const u = (t * 0.06 * (1 + k % 3) + h(k, 1, 720)) % 1, x = Math.round((h(k, 2, 720) * 360 + t * 8 + Math.sin(t * 1.5 + k) * 6) % 340) - 10, y = Math.round(u * 175); if (!a_prCalma(x, y) && x >= 0 && x < 319) R.rect(x, y, x + (k % 2), y, tn(k % 3 ? hex('#8a8688') : hex('#c8c4c6'))); }
      // la taza de hojalata, de pie en el barro, abollada, con su asa y el brillo del borde
      const [tx, ty] = d.taza, lata = [hex('#d8dce4'), hex('#a4aab4'), hex('#6a707a'), hex('#ffffff')].map(tn);
      if (o.taza !== false) {
      R.rect(tx - 8, ty + 1, tx + 9, ty + 1, tn(hex('#2a2628')));
      R.rect(tx - 5, ty - 10, tx + 5, ty, lata[1]); R.rect(tx - 5, ty - 10, tx - 3, ty, lata[0]); R.rect(tx + 3, ty - 10, tx + 5, ty, lata[2]);
      R.rect(tx - 6, ty - 11, tx + 6, ty - 11, lata[0]); R.rect(tx - 4, ty - 12, tx + 4, ty - 12, lata[2]); R.rect(tx - 6, ty, tx + 6, ty, lata[2]);
      R.rect(tx + 6, ty - 9, tx + 8, ty - 8, lata[1]); R.rect(tx + 8, ty - 8, tx + 9, ty - 3, lata[1]); R.rect(tx + 6, ty - 3, tx + 8, ty - 2, lata[1]); R.pset(tx + 9, ty - 6, lata[2]);
      R.rect(tx - 1, ty - 6, tx, ty - 4, lata[2]); R.pset(tx + 1, ty - 5, lata[0]);   // la abolladura
      R.rect(tx - 5, ty - 3, tx + 5, ty - 3, tn(hex('#5a5458')));                      // la ceniza pegada
      if (Math.sin(t * 1.4) > 0.1) { R.pset(tx - 4, ty - 11, lata[3]); R.pset(tx - 4, ty - 8, lata[3]); }
      }
      return { suelo: 170, libre: [8, 120], taza: [tx, ty] };
    }
    // el humo gris, espeso, que sube del montón y se lo lleva el viento; el de las chimeneas vecinas, fino
    d.humo.forEach(([x, y], k) => a_prHumareda(R, x, y, t + k * 2.3, tn, { n: 16, alto: 76, viento: 44 - k * 6, r: 2.5, crece: 9, v: 0.06 + k * 0.012 }));
    d.chim.forEach(([x, y], k) => { if (k % 3 === 1) a_prHumo(R, x, y - 1, t + k, tn, { n: 4, alto: 18, viento: 12, r: 0.7, crece: 2, v: 0.14 }); });
    // los vecinos, pequeños y lejos, mirando (alguno se tapa la boca; uno se vuelve; un agente de la paz al fondo)
    const V = [[78, 142, 0, 1, 0], [86, 141, 3, 1, 'arriba'], [94, 143, 1, 1, 0], [102, 141, 4, 1, 0], [258, 146, 2, -1, 'arriba'], [268, 145, 0, -1, 0], [278, 147, 3, -1, 0], [148, 128, 1, 1, 0]];
    V.forEach(([x, y, c, dir, b], k) => a_prFigura(R, x, y, t, a_prGENTE[c], { tn, alto: y < 135 ? 8 : 10, dir: Math.sin(t * 0.4 + k * 2) > 0.85 ? -dir : dir, brazo: b }));
    { const x = 196, y = 140, bl = tn(hex('#f0f0ee')), blS = tn(hex('#c4c8d0')); R.rect(x - 2, y - 9, x + 1, y - 3, bl); R.rect(x - 2, y - 9, x - 2, y - 3, blS); R.rect(x - 2, y - 2, x - 2, y, blS); R.rect(x + 1, y - 2, x + 1, y, blS); R.rect(x - 2, y - 12, x + 1, y - 10, bl); R.rect(x - 1, y - 11, x + 1, y - 11, tn(hex('#1e2430'))); }
    for (let k = 0; k < 18; k++) { const u = (t * 0.05 * (1 + k % 3) + h(k, 1, 721)) % 1, x = Math.round(170 + h(k, 2, 721) * 140 + u * 40), y = Math.round(40 + u * 130); if (!a_prCalma(x, y) && x < 319) R.pset(x, y, tn(k % 3 ? hex('#8a8688') : hex('#c8c4c6'))); }
    return { suelo: 166, libre: [0, 150], casa: d.casa, humo: d.humo[1], vecinos: [[78, 102, 142], [258, 278, 146]], bomba: [121, 146] };
  },
};
const a_prENC = { prado: a_prPRADO, casa: a_prCASA, destileria: a_prDESTILERIA, quemada: a_prQUEMADA };

// la geometría de cada encuadre y cámara (la misma para arena50 y arena50Delante)
const b_GEO = {
  'prado|general': { suelo: 152, libre: [24, 272], horizonte: 104, flor: [118, 142], paracaidasX: 214, montana: [150, 30], cornucopia: [66, 106], charca: [228, 113, 298, 121], soles: { dia: [214, 34], amanecer: [58, 74], tarde: [244, 70], noche: [214, 32] } },
  'prado|flores': { suelo: 168, libre: [36, 282], horizonte: 118, flor: [150, 157], paracaidasX: 236, montana: [182, 22], soles: { dia: [232, 34], amanecer: [70, 92], tarde: [254, 88], noche: [232, 34] } },
  'bosque|general': { suelo: 160, libre: [20, 248], rama: [212, 88], arroyo: [0, 110, 319, 140], arbol: [262, 290] },
  'bosque|rama': { suelo: 120, libre: [56, 244], rama: [150, 120] },
  'deposito|general': { suelo: 158, libre: [16, 228], carga: [244, 147], agua: [0, 100, 319, 127], tuberia: [238, 254] },
  'deposito|tuberia': { suelo: 168, libre: [16, 166], carga: [196, 151], mecha: [172, 158] },
  'borde|general': { suelo: 160, libre: [16, 196], campo: [236, 319], borde: 208, toque: [262, 112] },
  'borde|acantilado': { suelo: 118, libre: [14, 156], campo: [226, 319], borde: 168, toque: [228, 96] },
};

// el encuadre, la cámara y la luz que piden las opciones, con su geometría
function b_geo(o) {
  const enc = ['prado', 'bosque', 'deposito', 'borde'].includes(o.encuadre) ? o.encuadre : 'prado';
  const otra = { prado: 'flores', bosque: 'rama', deposito: 'tuberia', borde: 'acantilado' }[enc];
  const camara = o.camara === otra ? otra : 'general';
  const luz = enc === 'deposito' ? 'dia' : (['amanecer', 'tarde', 'noche'].includes(o.luz) ? o.luz : 'dia');
  return { encuadre: enc, camara, luz, ...b_GEO[enc + '|' + camara] };
}

// lo que devuelve arena50: la geometría, con las posiciones que dependen de t y de las opciones
function b_salida(g, t, o) {
  const s = { encuadre: g.encuadre, camara: g.camara, luz: g.luz, suelo: g.suelo, libre: g.libre.slice() };
  if (g.encuadre === 'prado') { s.flor = g.flor.slice(); s.sol = (g.soles[g.luz] || g.soles.dia).slice(); s.horizonte = g.horizonte; s.paracaidas = b_paraPos(g, t, o).botella; }
  if (g.encuadre === 'bosque') { s.rama = g.rama.slice(); if (g.arroyo) s.arroyo = g.arroyo.slice(); }
  if (g.encuadre === 'deposito') { s.carga = g.carga.slice(); if (g.agua) s.agua = g.agua.slice(); if (g.mecha) s.mecha = b_mechaPunta(g, o.mecha ?? 0); }
  if (g.encuadre === 'borde') { s.campo = g.campo.slice(); s.borde = g.borde; if (o.rebote) { const r = b_rebote(o.rebote, g); s.rebote = { impacto: [r.ti, r.xi, Math.round(r.yi)], cae: [r.tc, Math.round(r.xc), g.suelo] }; } }
  return s;
}

// umbral del tramado ordenado 4 × 4
const b_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_um = (x, y) => b_BAY[((y & 3) << 2) | (x & 3)];

const b_lim = (u) => Math.max(0, Math.min(1, u));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function b_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// oscurece un color por k
const b_osc = (c, k) => (0xff000000 | (Math.round(((c >>> 16) & 255) * k) << 16) | (Math.round(((c >>> 8) & 255) * k) << 8) | Math.round((c & 255) * k)) >>> 0;

// un píxel en el búfer B, con los bordes comprobados
const b_ps = (B, x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };

// mezcla un color sobre lo que hay en (x, y)
const b_pm = (B, x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = b_mez(B[y * 320 + x], c, a); };

// los colores de la arena (de día); b_pal los tiñe para cada luz. Un punto irreales: demasiado limpios y saturados
const b_P0 = {
  nube: ['#9ab0e8', '#d4e2fa', '#ffffff', '#ffe2f6'],
  roca: ['#2e2a5a', '#433e78', '#5c5896', '#7a76b4', '#9c9ad0'], nieve: ['#8ea4e0', '#bccef6', '#e6eeff', '#ffffff'],
  bosqueL: ['#1c5a6c', '#26727c', '#3a9088', '#5ab09a', '#86d0b0'], bosque: ['#08382c', '#0e5a3a', '#168444', '#22ac54', '#58d86e', '#a8f48a'],
  hierba: ['#14602e', '#1e7c36', '#2c9a40', '#44b64a', '#6ad05a', '#9ae670', '#ccf69c'], tierra: ['#4a2e2a', '#6a4632', '#8e6644', '#b8905e', '#dcc08a'],
  rosa: ['#8a1a5e', '#d8329a', '#ff62c4', '#ffb4ea'], violeta: ['#3e1880', '#7034d0', '#a466ff', '#dcbcff'], amarillo: ['#9a5e0a', '#e2aa18', '#ffe23c', '#fffaa8'],
  cian: ['#127090', '#22b8d4', '#66eef2', '#d0ffff'], blanco: ['#8a7aa8', '#d0c8ec', '#fff2ff', '#ffffff'], naranja: ['#9a3a14', '#ea7228', '#ffa64c', '#ffe2a2'],
  polen: ['#5a2296', '#8e4ad8', '#c08cff', '#ead0ff'], agua: ['#0a3466', '#14569a', '#2480c8', '#40aee8', '#86dcff', '#eaffff'],
  fruto: ['#7a0834', '#d81c48', '#ff5a58', '#ffd2a8'], frutoV: ['#40085e', '#9228cc', '#cc6aff', '#f6d2ff'],
  corteza: ['#22161e', '#3c2626', '#5a3a30', '#7a5440', '#9c7452', '#bc9668'], musgo: ['#164426', '#24642e', '#3e8836', '#66a844'],
  cueva: ['#0c0e16', '#141a24', '#1e2632', '#2a3442', '#3a4656', '#4e5c70', '#6a7a8e'], tubo: ['#141a20', '#26323a', '#3c4c54', '#566a70', '#7a9294', '#b0c8c4', '#e4f4ee'],
  oxido: ['#4a200e', '#7a3a18', '#a85e2a', '#d08840'], hormigon: ['#2a2c30', '#3c3e44', '#52545a', '#6a6c72', '#8a8c90'],
  lampara: ['#ff9a30', '#ffcc60', '#fff2b0', '#ffffff'], aguaC: ['#04101a', '#08202e', '#0e3246', '#16485e', '#24647c', '#4c98b0', '#9adcec'],
  oro: ['#6a3e0a', '#b8781a', '#eab432', '#fff09a'], campo: ['#4ad8ff', '#a8f4ff', '#f0ffff'],
  niebla: ['#8ea6d0', '#b4c8e8', '#d4e2f4', '#eef4ff'], plata: ['#5a6474', '#9aa6b6', '#d8e2ee', '#ffffff'],
  conejo: ['#6a5040', '#a88a70', '#dcc8b0'], noche: ['#0a0e28', '#fff6d8'],
};

// el cielo de cada luz, de arriba abajo (sin teñir: cada luz tiene su degradado)
const b_CIELOS = {
  dia: ['#2a56d4', '#326ae2', '#3e82ec', '#529cf2', '#6ab6f4', '#88cef4', '#ace4f2', '#d6f6ee'],
  amanecer: ['#363888', '#52469e', '#7a54ae', '#b064ae', '#de80a6', '#f6a2a0', '#ffc4a0', '#ffe6c2'],
  tarde: ['#28469e', '#4456b2', '#7262b4', '#a86ca8', '#d8848e', '#f4a274', '#ffc466', '#fff0a6'],
  noche: ['#050820', '#080e2c', '#0c1436', '#101a42', '#16224e', '#1c2a5a', '#243464', '#30426e'],
};

const b_NUBES = { dia: null, amanecer: ['#7a5ea0', '#cc96be', '#ffd2cc', '#fff0e2'], tarde: ['#6a5490', '#cc8288', '#ffc48c', '#fff0be'], noche: ['#141c38', '#222c4c', '#343e62', '#4c5880'] };

// cómo tiñe cada luz: [color, cuánto, cuánto oscurece]
const b_TINTE = { dia: null, amanecer: ['#ff86a8', 0.16, 0.94], tarde: ['#ff8a34', 0.2, 0.9], noche: ['#0a1236', 0.58, 0.72] };

const b_PALES = new Map();

// la paleta de una luz (cacheada): cada color de b_P0 teñido; cielo y nubes, los suyos
function b_pal(luz) {
  let P = b_PALES.get(luz); if (P) return P;
  const T = b_TINTE[luz], f = (s) => { const c = hex(s); return T ? b_mez(b_osc(c, T[2]), hex(T[0]), T[1]) : c; };
  P = Object.fromEntries(Object.entries(b_P0).map(([k, v]) => [k, v.map(f)]));
  P.cielo = b_CIELOS[luz].map(hex); P.nube = (b_NUBES[luz] || b_P0.nube).map(hex);
  P.flores = [P.rosa, P.violeta, P.amarillo, P.cian, P.blanco, P.naranja];
  P.brillo = Object.fromEntries(['rosa', 'violeta', 'amarillo', 'cian', 'blanco', 'naranja', 'fruto', 'frutoV', 'campo', 'lampara', 'polen'].map((k) => [k, b_P0[k].map(hex)]));
  P.floresB = [P.brillo.rosa, P.brillo.violeta, P.brillo.amarillo, P.brillo.cian, P.brillo.blanco, P.brillo.naranja];
  P.luz = luz; b_PALES.set(luz, P); return P;
}

const b_CAPAS = new Map();

// la capa fija de un encuadre (se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma); dibuja() pinta en
// R.buf y devuelve sus máscaras ({ cielo, agua, hierba… }), que se guardan con el búfer
function b_capa(R, clave, dibuja) {
  let c = b_CAPAS.get(clave);
  if (!c) { const buf = R.nuevo(), prev = R.usar(buf); const extra = dibuja() || {}; R.usar(prev); c = { buf, ...extra }; b_CAPAS.set(clave, c); }
  return c;
}

// máscara de lo que sigue igual que en la foto fija (para saber qué es cielo, agua o hierba tras pintar lo de delante)
function b_mascara(B, foto, y0, y1, previa) {
  const M = previa || new Uint8Array(57600);
  for (let i = y0 * 320; i < Math.min(180, y1 + 1) * 320; i++) if (B[i] === foto[i]) M[i] = 1;
  return M;
}

// el cielo tramado de la arena (y 0–hor): el degradado de la luz, sin franjas (tramado ordenado con algo de ruido), un
// velo de cirros finos y quietos y, de noche, estrellas
function b_cieloF(B, P, hor) {
  const n = P.cielo.length - 1;
  for (let y = 0; y <= hor; y++) for (let x = 0; x < 320; x++) {
    const cir = Math.sin(x * 0.03 - y * 0.42 + Math.sin(x * 0.011 + y * 0.07) * 2) * 0.5 + 0.5;
    const f = y / hor * n + (h(x >> 3, y >> 2, 501) - 0.5) * 0.35 - (cir > 0.86 && y > 18 ? 0.5 : 0);
    B[y * 320 + x] = P.cielo[Math.max(0, Math.min(n, Math.floor(f + b_um(x, y))))];
  }
  if (P.luz === 'noche') for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 502) * 320), y = Math.floor(h(k, 2, 502) * hor * 0.85); if (x > 20 && x < 170 && y < 20) continue; b_ps(B, x, y, k % 5 ? hex('#8a96c8') : hex('#e8ecff')); }
}

// el sol (o la luna de noche) con su halo tramado
function b_astro(B, P, x, y) {
  const noche = P.luz === 'noche', r = noche ? 5 : 7, halo = noche ? hex('#9aa8d8') : P.luz === 'dia' ? hex('#fff8d0') : hex('#ffe0a0');
  for (let j = -26; j <= 26; j++) for (let i = -26; i <= 26; i++) { const d = Math.hypot(i, j); if (d > 26 || d <= r) continue; const a = (1 - (d - r) / (26 - r)) ** 2 * 0.55; if (b_um(x + i, y + j) < a * 1.4) b_pm(B, x + i, y + j, halo, a); }
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.2) continue;
    const c = noche ? (d > r - 1 ? hex('#c8cce8') : (h(i + 9, j + 9, 503) < 0.18 ? hex('#c0c6e0') : hex('#f2f2ff'))) : (d > r - 1.2 ? hex('#ffe890') : d < r * 0.5 && i + j < 0 ? hex('#ffffff') : hex('#fff8d8'));
    b_ps(B, x + i, y + j, c); }
}

// una nube de cúmulo (tres tonos y el ribete) sobre el cielo de la máscara M, en (cx, cy) con anchura w
function b_nube(B, M, cx, cy, w, sem, N) {
  const nb = 3 + Math.floor(w / 9), bol = [];
  for (let k = 0; k < nb; k++) { const u = k / (nb - 1), s = Math.sin(Math.PI * u); bol.push([cx + (u - 0.5) * w * 0.78, cy - s * w * 0.13 - h(k, sem, 504) * w * 0.07, w * (0.13 + 0.13 * s + h(k, sem, 505) * 0.05)]); }
  const yb = cy + w * 0.07;
  for (let y = Math.floor(cy - w * 0.42); y <= Math.ceil(yb); y++) { if (y < 0 || y > 179) continue;
    for (let x = Math.floor(cx - w * 0.55); x <= Math.ceil(cx + w * 0.55); x++) { if (x < 0 || x > 319 || !M[y * 320 + x]) continue;
      let best = -1, bv = 0, bi = 0; for (const [bx, by, br] of bol) { const d = 1 - Math.hypot(x - bx, (y - by) * 1.25) / br; if (d > best) { best = d; bv = (y - (by - br)) / (2 * br); bi = (x - bx) / br; } }
      if (best < (y > yb - 1.5 ? 0.12 : 0) || best < (h(x, y, 506) - 0.6) * 0.12) continue;
      const l = 0.9 - bv * 1.1 - bi * 0.2 + (y > yb - 2 ? -0.3 : 0) + (b_um(x, y) - 0.5) * 0.5;
      B[y * 320 + x] = best < 0.12 && bi < 0 && bv < 0.5 ? N[3] : l > 0.55 ? N[2] : l > 0.05 ? N[1] : N[0]; } }
}

// nubes del cielo a tres velocidades (las de abajo, más rápidas), pintadas solo donde la máscara dice cielo
function b_nubes(B, M, t, hor, N, n = 6) {
  for (let k = 0; k < n; k++) { const capa = k % 3, w = [34, 24, 15][capa] + Math.round(h(k, 1, 507) * 10), v = [0.7, 1.3, 2.2][capa];
    const y = Math.round([34, 46, 58][capa] * hor / 100 + h(k, 2, 507) * 8), x = ((h(k, 3, 507) * 420 + t * v) % 440) - 60;
    b_nube(B, M, x, y, w, k, N); }
}

// pájaros de colores que cruzan (alas que baten)
function b_pajaros(R, t, y0, cols, n = 4, sem = 0, v = 26) {
  for (let k = 0; k < n; k++) { const x = ((h(k, 1, 508 + sem) * 420 + t * (v + k * 4)) % 440) - 60, y = Math.round(y0 + h(k, 2, 508 + sem) * 18 + Math.sin(t * 1.2 + k) * 3), a = Math.sin(t * 11 + k * 2) > 0, c = cols[k % cols.length];
    const xi = Math.round(x); R.pset(xi, y, c[1]); R.pset(xi + 1, y, c[2]); R.pset(xi - 1, y + (a ? -1 : 1), c[1]); R.pset(xi + 2, y + (a ? -1 : 1), c[1]); R.pset(xi + 2, y, c[3]); }
}

// una mariposa que bate las alas en (x, y)
function b_mariposa(R, x, y, t, C, k) {
  x = Math.round(x); y = Math.round(y); const ab = Math.sin(t * 14 + k * 3) > -0.2;
  R.pset(x, y, hex('#1a1020')); R.pset(x, y + 1, hex('#1a1020'));
  if (ab) { R.pset(x - 1, y - 1, C[2]); R.pset(x - 2, y - 1, C[1]); R.pset(x - 1, y, C[3]); R.pset(x + 1, y - 1, C[2]); R.pset(x + 2, y - 1, C[1]); R.pset(x + 1, y, C[3]); R.pset(x - 1, y + 1, C[1]); R.pset(x + 1, y + 1, C[1]); }
  else { R.pset(x - 1, y - 1, C[2]); R.pset(x + 1, y - 1, C[2]); R.pset(x, y - 1, C[3]); }
}

// una montaña de picos (pk: [[x, alto, ancho]…]) con su base en y = base: cara de luz a la izquierda, cara de sombra,
// canales de nieve, estratos y el filo nevado; velo (0–1) la funde con la bruma del horizonte
function b_montana(B, P, pk, base, sem, velo = 0, bruma = 0) {
  const xs = Math.max(0, Math.min(...pk.map(([x, , a]) => x - a))), xe = Math.min(319, Math.max(...pk.map(([x, , a]) => x + a)));
  for (let x = xs; x <= xe; x++) {
    let top = 999, cual = null;
    for (const p of pk) { const d = Math.abs(x - p[0]) / p[2]; if (d >= 1) continue; const hh = p[1] * (1 - d) ** 1.15 + (h(x >> 1, 0, sem) - 0.5) * 2.2 + Math.sin(x * 0.4 + sem) * 0.8; if (base - hh < top) { top = base - hh; cual = p; } }
    if (!cual) continue; top = Math.round(top);
    for (let y = Math.max(0, top); y <= base; y++) {
      const alt = (base - y) / cual[1], lado = x < cual[0] + (base - y) * 0.06 + Math.sin(y * 0.3 + sem) * 1.5 ? 1 : 0;
      const nieve = alt > 0.5 + (h(x >> 1, y >> 2, sem + 1) - 0.5) * 0.25 + Math.sin(x * 0.21 + sem) * 0.07 || (alt > 0.32 && Math.sin((x - cual[0]) * 0.55 + (y - top) * (lado ? 0.6 : -0.6)) > 0.75);
      const surco = Math.sin((x - cual[0]) * 0.32 * (lado ? 1 : -1) + y * 0.5 + h(x >> 2, 0, sem + 2) * 3) > 0.82;
      let c;
      if (nieve) c = lado ? (y - top < 2 ? P.nieve[3] : surco ? P.nieve[1] : b_um(x, y) < 0.8 ? P.nieve[3] : P.nieve[2]) : (surco ? P.nieve[0] : b_um(x, y) < 0.7 ? P.nieve[1] : P.nieve[0]);
      else { const l = (lado ? 2.6 : 1.1) + (h(x >> 1, y >> 1, sem + 3) - 0.5) * 1.1 - (surco ? 1 : 0) + (Math.sin(y * 0.9 + x * 0.1) > 0.85 ? 0.8 : 0) - alt * 0.3; c = P.roca[Math.max(0, Math.min(4, Math.floor(l + b_um(x, y) * 0.8)))]; }
      if (velo > 0) { const a = velo * (0.7 + (y - top) / Math.max(1, base - top) * 0.3) + bruma * ((y - top) / Math.max(1, base - top)); c = b_mez(c, P.cielo[P.cielo.length - 1], Math.min(0.85, a)); }
      B[y * 320 + x] = c;
    }
  }
}

// una copa de árbol redonda (hojas en racimos con luz arriba a la izquierda); frutos: paleta de frutos que relucen
function b_copa(B, cx, cy, r, cols, sem, frutos = null, velo = null) {
  const n = cols.length - 1;
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) {
    const a = Math.atan2(j, i), rr = r * (0.84 + 0.16 * h(Math.round(a * 4), sem, 510) + 0.08 * Math.sin(a * 7 + sem)), d = Math.hypot(i, j * 1.12);
    if (d > rr) continue; const x = cx + i, y = cy + j; if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    const rac = h((x + sem) >> 2, (y + sem) >> 2, 511), l = 0.55 - (i * 0.55 + j * 0.8) / r * 0.45 + (rac - 0.5) * 0.5 + (h(x, y, 512) - 0.5) * 0.25 - (d > rr - 1.2 ? 0.2 : 0);
    let c = cols[Math.max(0, Math.min(n, Math.floor(l * (n + 0.6) + (b_um(x, y) - 0.5) * 0.7)))];
    if (velo) c = b_mez(c, velo[0], velo[1]);
    B[y * 320 + x] = c;
  }
  if (frutos) for (let k = 0; k < Math.round(r * 0.7); k++) { const a = h(k, sem, 513) * Math.PI * 2, d = h(k, sem, 514) * r * 0.75, x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d * 0.9);
    b_ps(B, x, y, frutos[1]); b_ps(B, x + 1, y, frutos[1]); b_ps(B, x, y + 1, frutos[0]); b_ps(B, x + 1, y + 1, frutos[0]); b_ps(B, x, y - 1, frutos[2]); b_ps(B, x, y, frutos[3]); }
}

// una flor en (x, y): tam 0 (un punto) a 4 (corola de pétalos de r 4), con luz y sombra; C: paleta de 4, cen: el centro
function b_flor(R, x, y, tam, C, cen) {
  x = Math.round(x); y = Math.round(y);
  if (tam === 0) { R.pset(x, y, C[2]); return; }
  if (tam === 1) { R.pset(x, y, cen); R.pset(x - 1, y, C[1]); R.pset(x + 1, y, C[2]); R.pset(x, y - 1, C[3]); R.pset(x, y + 1, C[0]); return; }
  const r = tam === 2 ? 2.2 : tam === 3 ? 3.2 : 4.4, np = tam === 2 ? 4 : 5;
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) {
    const d = Math.hypot(i, j * 1.15); if (d > r + 0.3) continue;
    const a = Math.atan2(j, i), pet = 0.66 + 0.34 * Math.abs(Math.cos(a * np / 2 + tam)); if (d > r * pet + 0.45) continue;
    let c; const l = -(i * 0.6 + j * 0.8) / r;
    if (d < r * 0.3) c = cen; else if (d > r * pet - 0.5) c = j > 0 ? C[0] : C[1]; else c = l > 0.35 ? C[3] : l > -0.25 ? C[2] : C[1];
    R.pset(x + i, y + j, c);
  }
  R.pset(x, y, cen); if (tam >= 3) R.pset(x - 1, y - 1, hex('#fffad0'));
}

// los datos de las flores que se mecen de un encuadre (cacheados): [x, base, alto, paleta, tam, fase]
const b_FLORES = new Map();

function b_floresDe(clave, n, zona, evita, sem) {
  let L = b_FLORES.get(clave); if (L) return L; L = [];
  for (let k = 0; L.length < n && k < n * 6; k++) {
    const yb = zona.y0 + h(k, 1, sem) ** 0.8 * (zona.y1 - zona.y0), x = zona.x0 + h(k, 2, sem) * (zona.x1 - zona.x0), u = (yb - zona.y0) / (zona.y1 - zona.y0);
    if (evita && evita(x, yb, k)) continue;
    const tam = Math.min(4, Math.floor(zona.t0 + u * (zona.t1 - zona.t0) + h(k, 3, sem) * 1.2)), mancha = Math.floor((x * 0.02 + yb * 0.05 + h(k >> 3, 4, sem) * 2)) % 6;
    L.push([x, yb, zona.a0 + u * (zona.a1 - zona.a0) * (0.7 + h(k, 5, sem) * 0.6), h(k, 6, sem) < 0.7 ? mancha : Math.floor(h(k, 7, sem) * 6), tam, h(k, 8, sem) * 6]);
  }
  L.sort((a, b) => a[1] - b[1]); b_FLORES.set(clave, L); return L;
}

// la racha de viento en x (ondas que recorren el prado de izquierda a derecha)
const b_racha = (x, y, t) => Math.sin(t * 1.6 - x * 0.035 + y * 0.03) * 0.7 + Math.sin(t * 2.9 - x * 0.08) * 0.3;

// pinta las flores de la lista con su tallo y su hoja, mecidas por el viento; de noche, las corolas brillan solas
function b_floresPinta(R, t, L, P, y0 = -1, y1 = 999) {
  const FL = P.luz === 'noche' ? P.floresB : P.flores, cen = [P.amarillo[2], P.violeta[0], P.naranja[1], P.blanco[3], P.amarillo[2], P.rosa[0]];
  for (const [x, yb, alto, pi, tam, fa] of L) { if (yb < y0 || yb >= y1) continue;
    const s = b_racha(x, yb, t) * alto * 0.16 + Math.sin(t * 3.3 + fa) * 0.35, hx = x + s, hy = yb - alto + Math.abs(s) * 0.25;
    const tallo = tam >= 3 ? P.hierba[1] : P.hierba[0];
    R.linea(x, yb, hx, hy, tallo); if (tam >= 2) R.linea(x + 1, yb, (x + hx) / 2 + 1, (yb + hy) / 2, P.hierba[2]);
    if (alto > 6) { const my = Math.round(yb - alto * 0.4), mx = Math.round(x + s * 0.4); R.pset(mx + 1, my, P.hierba[3]); R.pset(mx + 2, my - 1, P.hierba[4]); if (tam >= 3) { R.pset(mx - 1, my - 2, P.hierba[3]); R.pset(mx - 2, my - 3, P.hierba[4]); } }
    b_flor(R, hx, hy, tam, FL[pi], cen[pi]);
  }
}

// brillo del viento sobre la hierba: franjas claras que corren (solo donde la máscara dice hierba)
function b_brisa(B, M, t, y0, y1, c, fuerza = 1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!M[i]) continue;
    const w = b_racha(x, y, t) + Math.sin(x * 0.013 + t * 0.5) * 0.4; if (w < 0.55) continue;
    if (b_um(x, y + Math.floor(t * 6)) < (w - 0.55) * 0.9 * fuerza) B[i] = b_mez(B[i], c, 0.45); }
}

// un pino del bosque lejano (pisos con luz a la izquierda)
function b_pino(B, x, yb, alto, cols, sem) {
  const n = cols.length - 1;
  for (let y = yb - alto; y <= yb; y++) { const u = (y - (yb - alto)) / alto, w = Math.max(0.5, u * alto * 0.32 * (0.75 + 0.25 * ((y * 7 + sem) % 4) / 3));
    for (let i = -Math.round(w); i <= Math.round(w); i++) { const l = 0.6 - i / Math.max(1, w) * 0.4 + (h(x + i, y, sem) - 0.5) * 0.4 - u * 0.15; b_ps(B, x + i, y, cols[Math.max(0, Math.min(n, Math.floor(l * (n + 0.5) + b_um(x + i, y) * 0.5)))]); } }
}

// la corteza vertical de un tronco (x0–x1, y0–y1): vetas, grietas, luz a la izquierda, musgo abajo
function b_tronco(B, P, x0, x1, y0, y1, sem, velo = null) {
  const C = P.corteza, w = x1 - x0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = x0; x <= x1; x++) { if (x < 0 || x > 319) continue;
    const u = (x - x0) / Math.max(1, w), l = 3.4 - u * 2.6 - (u > 0.85 ? 0.8 : 0) + (u < 0.1 ? -0.6 : 0);
    const veta = Math.sin(x * 1.7 + h(x, y >> 3, sem) * 3 + y * 0.05) > 0.6 ? -0.9 : 0, grieta = h(x, Math.floor(y / 5), sem + 1) < 0.08 ? -1.4 : 0;
    let c = C[Math.max(0, Math.min(5, Math.floor(l + veta + grieta + (b_um(x, y) - 0.5) * 0.8)))];
    if (y > y1 - 10 && h(x, y >> 1, sem + 2) < (y - (y1 - 10)) / 14) c = P.musgo[Math.floor(h(x, y, sem + 3) * 3)];
    if (velo) c = b_mez(c, velo[0], velo[1]);
    B[y * 320 + x] = c; }
}

const b_A50FIJO = {
  prado(R, g, P) {
    const B = R.buf, gen = g.camara === 'general', HOR = g.horizonte, sol = g.soles[P.luz] || g.soles.dia;
    b_cieloF(B, P, HOR + 2); b_astro(B, P, sol[0], sol[1]);
    const foto = B.slice();
    // la sierra lejana y velada, la montaña nevada y sus vecinas
    if (gen) { b_montana(B, P, [[30, 26, 40], [92, 34, 46], [268, 36, 52], [312, 24, 34]], HOR - 4, 520, 0.42, 0.25);
      b_montana(B, P, [[g.montana[0], 64, 74], [204, 42, 48], [104, 36, 44]], HOR - 6, 530, 0.08, 0.35); }
    else { b_montana(B, P, [[40, 30, 52], [292, 40, 50]], HOR - 2, 520, 0.4, 0.25);
      b_montana(B, P, [[g.montana[0], 92, 104], [84, 50, 60], [262, 58, 56]], HOR - 4, 531, 0.06, 0.3); }
    // el bosque: una fila lejana azulada y la fila de delante, verde intenso, con frutos que relucen sueltos
    const yb = HOR + (gen ? 0 : -2), velo = [P.cielo[P.cielo.length - 1], 0.35];
    for (let y = yb - 5; y <= yb + 6; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = P.bosque[Math.max(0, Math.min(2, Math.floor(1.6 - (y - yb) * 0.12 + (h(x >> 1, y, 539) - 0.5) + b_um(x, y) * 0.5)))];
    for (let k = 0; k < 44; k++) { const x = Math.round(k * 7.6 + h(k, 1, 540) * 5) - 4, r = (gen ? 4 : 6) + Math.round(h(k, 2, 540) * 3); if (h(k, 3, 540) < 0.3) b_pino(B, x, yb - 2, r * 2 + 4, P.bosqueL, k); else b_copa(B, x, yb - r + 1, r, P.bosqueL, k + 40, null, velo); }
    for (let k = 0; k < 30; k++) { const x = Math.round(k * 11.2 + h(k, 4, 541) * 7) - 6, r = (gen ? 6 : 9) + Math.round(h(k, 5, 541) * 4); if (h(k, 6, 541) < 0.22) b_pino(B, x, yb + 5, r * 2 + 8, P.bosque, k + 70); else b_copa(B, x, yb - r + 6, r, P.bosque, k + 90, h(k, 7, 541) < 0.5 ? P.fruto : h(k, 7, 541) < 0.7 ? P.frutoV : null); }
    // la hierba del prado: más clara y amarilla a lo lejos, briznas, manchas de color de las flores lejanas
    const y0 = yb + 4, hierba = new Uint8Array(57600);
    const mantos = gen ? [[36, 122, 54, 9, 0], [250, 112, 62, 5, 1], [118, 110, 40, 3, 2], [296, 138, 50, 13, 4], [14, 150, 44, 14, 1], [196, 120, 32, 4, 3], [70, 132, 34, 7, 2], [312, 118, 24, 4, 5]]
      : [[40, 130, 80, 8, 1], [260, 126, 80, 7, 0], [150, 122, 60, 4, 2], [300, 145, 40, 12, 3]];
    for (let y = y0; y < 180; y++) { const u = (y - y0) / (179 - y0);
      for (let x = 0; x < 320; x++) {
        const brizna = h(x, Math.floor((y + h(x, 0, 542) * 5) / (1.5 + u * 4)), 543), mancha = (h(x >> 3, y >> 2, 544) - 0.5) * 0.8;
        let l = 4.6 - u * 2.6 + mancha + (brizna > 0.82 ? 1 : brizna < 0.14 ? -1 : 0) + (y < y0 + 2 ? -1.2 : 0);
        let c = P.hierba[Math.max(0, Math.min(6, Math.floor(l + b_um(x, y) * 0.9 - 0.3)))];
        for (const [mx, my, rx, ry, pi] of mantos) { const d = ((x - mx) / rx) ** 2 + ((y - my) / ry) ** 2; if (d < 1 && h(x, y, 545 + pi) < (1 - d) * (0.55 - u * 0.25)) c = P.flores[pi][(x + y) % 3 ? 2 : (u < 0.4 ? 3 : 1)]; }
        B[y * 320 + x] = c; } }
    // el sendero que baja del bosque al claro, pisado, con piedrecitas
    if (gen) for (let y = y0 + 1; y < 180; y++) { const u = (y - y0) / (179 - y0), xc = 150 + Math.sin(u * 3.4) * 22 - u * 10, w = 1 + u * 13;
      for (let x = Math.round(xc - w - 2); x <= Math.round(xc + w + 2); x++) { const d = Math.abs(x - xc) / w; if (d > 1 + h(x, y, 546) * 0.25) continue;
        const l = 3.2 - u * 1.2 + (h(x, y, 547) - 0.5) * 1.2 - (d > 0.85 ? 0.8 : 0); b_ps(B, x, y, h(x, y, 548) < 0.04 ? P.tierra[4] : P.tierra[Math.max(1, Math.min(4, Math.floor(l + b_um(x, y) * 0.6)))]); } }
    b_mascara(B, B, y0, 179, hierba);   // toda la hierba (las piedras, la charca y la Cornucopia se borran ahora de la máscara)
    const quita = (x0, y0q, x1, y1q) => { for (let y = Math.max(0, y0q); y <= Math.min(179, y1q); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) hierba[y * 320 + x] = 0; };
    // la charca con juncos (el agua que brilla)
    let agua = null;
    if (gen) { const [cx0, cy0, cx1, cy1] = g.charca, cx = (cx0 + cx1) / 2, cy = (cy0 + cy1) / 2, rx = (cx1 - cx0) / 2, ry = (cy1 - cy0) / 2; agua = new Uint8Array(57600);
      for (let y = cy0 - 1; y <= cy1 + 1; y++) for (let x = cx0 - 2; x <= cx1 + 2; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1.15) continue; hierba[y * 320 + x] = 0;
        if (d > 0.92) { b_ps(B, x, y, y < cy ? P.tierra[2] : P.hierba[1]); continue; }
        const v = (y - cy0) / (cy1 - cy0); b_ps(B, x, y, P.agua[Math.max(1, Math.min(5, Math.floor(4.2 - v * 2.6 + (h(x >> 2, y, 549) - 0.5) + b_um(x, y) * 0.6)))]); agua[y * 320 + x] = 1; }
      for (let k = 0; k < 14; k++) { const x = Math.round(cx0 + h(k, 1, 550) * (cx1 - cx0)), yy = h(k, 2, 550) < 0.5 ? cy0 : cy1 - 1, al = 4 + Math.round(h(k, 3, 550) * 5); for (let j = 0; j < al; j++) b_ps(B, x + (j > al - 2 ? 1 : 0), yy - j, j === al - 1 ? P.tierra[1] : P.hierba[j % 2 ? 1 : 2]); quita(x - 1, yy - al, x + 1, yy); } }
    // la Cornucopia: un cuerno dorado pequeño y lejano, con cajas y mochilas en la boca
    if (gen) { const [ox, oy] = g.cornucopia;
      for (let k = 0; k <= 22; k++) { const cx = ox + k, r = 6.2 - k * 0.24, cy = oy - 2 - k * 0.18 - (k > 16 ? (k - 16) * 0.5 : 0);
        for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) { const v = j / r; if (Math.abs(v) > 1) continue; const l = 2 - v * 1.6 + (k % 4 === 0 ? -0.8 : 0) + (b_um(cx, cy + j) - 0.5) * 0.6; b_ps(B, cx, cy + j, P.oro[Math.max(0, Math.min(3, Math.floor(l)))]); } }
      for (let j = -5; j <= 5; j++) for (let i = -2; i <= 1; i++) if (i * i / 4 + j * j / 30 < 1) b_ps(B, ox + i, oy - 2 + j, i < 0 ? P.oro[0] : hex('#1a1008'));
      [[-9, 3, 5, 3, P.tierra[3]], [-5, 4, 3, 2, P.hierba[0]], [-13, 4, 3, 2, P.tierra[2]], [5, 4, 4, 2, P.tierra[3]]].forEach(([dx, dy, w, hh, c]) => { for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) b_ps(B, ox + dx + i, oy + dy - j, j === hh - 1 ? b_mez(c, hex('#ffffff'), 0.3) : i === w - 1 ? b_osc(c, 0.7) : c); });
      quita(ox - 14, oy - 9, ox + 23, oy + 5); }
    // piedras con musgo
    (gen ? [[300, 132, 9, 6], [26, 136, 7, 5], [234, 108, 4, 2], [92, 160, 6, 4], [204, 112, 3, 2]] : [[24, 150, 10, 7], [300, 140, 8, 5]]).forEach(([px, py, rx, ry], k) => {
      for (let j = -ry; j <= 1; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1 && j < 0) continue; if (j >= 0 && Math.abs(i) > rx - 1) continue;
        const l = j >= 0 ? 0.6 : 2.6 - (i / rx) * 1.2 + (j / ry) * 1.2 + (h(px + i, py + j, 551) - 0.5); let c = j >= 0 ? P.hierba[0] : P.roca[Math.max(0, Math.min(4, Math.floor(l + b_um(px + i, py + j) * 0.6)))];
        if (j < -ry * 0.55 && h(px + i, py + j, 552 + k) < 0.55) c = P.musgo[2 + (i < 0 ? 1 : 0)]; b_ps(B, px + i, py + j, c); hierba[(py + j) * 320 + px + i] = 0; } });
    const cielo = b_mascara(B, foto, 0, HOR + 2);   // al final: solo el cielo que nada tapa
    return { cielo, hierba, agua };
  },
};

const b_A50VIVO = {
  prado(R, B, t, o, g, P, F) {
    const gen = g.camara === 'general', HOR = g.horizonte;
    b_nubes(B, F.cielo, t, HOR, P.nube, gen ? 7 : 6);
    if (P.luz !== 'noche') b_pajaros(R, t, gen ? 46 : 52, [P.brillo.cian, P.brillo.rosa, P.brillo.amarillo], 4);
    b_brisa(B, F.hierba, t, HOR + 4, 179, P.hierba[6], 1);
    // la charca: destellos que corren y el reflejo de una nube
    if (F.agua) for (let y = g.charca[1]; y <= g.charca[3]; y++) for (let x = g.charca[0]; x <= g.charca[2]; x++) { const i = y * 320 + x; if (!F.agua[i]) continue;
      const s = Math.sin(x * 0.7 - t * 3 + y * 1.3) + Math.sin(x * 0.23 + t * 1.7); if (s > 1.55) B[i] = P.agua[5]; else if (s > 1.2 && b_um(x, y) < 0.5) B[i] = P.agua[4]; }
    // conejos a lo lejos que mordisquean y dan un salto de vez en cuando
    if (gen) [[44, 117, 0], [262, 124, 1], [198, 116, 2]].forEach(([x0, y0, k]) => { const c = (t + k * 2.3) % 6, salta = c > 5.2 ? Math.sin((c - 5.2) / 0.8 * Math.PI) : 0, x = Math.round(x0 + Math.floor((t + k * 2.3) / 6) % 3 * 3 * (k % 2 ? -1 : 1)), y = Math.round(y0 - salta * 3), cab = c < 5.2 && Math.sin(t * 5 + k) > 0.3 ? 1 : 0;
      R.rect(x, y - 1, x + 2, y, P.conejo[1]); R.pset(x + 3, y - 1 + cab, P.conejo[1]); R.pset(x + 3, y - 3 + cab, P.conejo[2]); R.pset(x + 3, y - 2 + cab, P.conejo[1]); R.pset(x, y - 2, P.conejo[2]); R.pset(x - 1, y - 1, P.conejo[2]); R.pset(x + 1, y + 1, P.conejo[0]); });
    // las flores que se mecen (la zona del claro, donde van los personajes, con pocas y bajas)
    const L = gen ? b_floresDe('prado|g', 150, { y0: 116, y1: 179, x0: -4, x1: 324, t0: 1, t1: 3.4, a0: 2, a1: 9 }, (x, y, k) => (x > 84 && x < 232 && y > 130 && y < 168 && k % 6) || (x > 100 + (y - 116) * 0.2 && x < 196 + (y - 116) * 0.3 && y > 116), 560)
      : b_floresDe('prado|f', 120, { y0: 124, y1: 182, x0: -6, x1: 326, t0: 2, t1: 4.6, a0: 5, a1: 26 }, (x, y, k) => x > 112 && x < 196 && y > 150 && k % 3, 561);
    b_floresPinta(R, t, L, P);
    // LA FLOR: una flor violeta grande a la altura de la mano, la que suelta el polen
    { const [fx, fy] = g.flor, s = b_racha(fx, fy, t) * 1.2, fl = P.luz === 'noche' ? P.brillo.violeta : P.violeta, suelo = g.suelo;
      R.linea(fx - 1, suelo, fx + s, fy + 3, P.hierba[1]); R.linea(fx, suelo, fx + s + 1, fy + 3, P.hierba[2]);
      for (const [dx, dy] of [[-3, -3], [-4, -4], [2, -6], [3, -7]]) R.pset(fx + dx + s * 0.4, suelo + dy, P.hierba[3]);
      b_flor(R, fx + s, fy, 4, fl, P.amarillo[2]);
      const p = b_lim(o.polen ?? 0); if (p > 0) for (let k = 0; k < 3; k++) R.pset(Math.round(fx + s + Math.sin(t * 7 + k * 2) * 2), Math.round(fy - 2 - ((t * 9 + k * 3) % 6)), P.brillo.polen[3]); }
    // mariposas
    for (let k = 0; k < (gen ? 6 : 4); k++) { const x = ((h(k, 1, 570) * 340 + t * (6 + k * 2) * (k % 2 ? 1 : -1)) % 340 + 340) % 340 - 10, y = (gen ? 120 : 108) + h(k, 2, 570) * 40 + Math.sin(t * 2 + k * 1.7) * 5 + Math.sin(t * 5.3 + k) * 1.5;
      b_mariposa(R, x, y, t, P.floresB[k % 6], k); }
    // el polen venenoso
    b_polen(R, B, t, o, g, P);
    // el paracaídas plateado del Capitolio con la botellita
    b_paracaidas(R, t, o, g, P);
  },
};

const b_A50DELANTE = {
  prado(R, B, t, o, g, P) {
    const gen = g.camara === 'general', [l0, l1] = g.libre, tope = g.suelo + (gen ? 8 : 4);
    // matas y flores de primer plano: altas a los lados, bajas (por debajo de los pies) en la franja de los personajes
    const L = b_floresDe('prado|d|' + g.camara, gen ? 34 : 26, { y0: gen ? 168 : 174, y1: 186, x0: -8, x1: 328, t0: 3, t1: 4.6, a0: 8, a1: gen ? 22 : 34 }, null, 580);
    for (const f of L) { const dentro = f[0] > l0 - 6 && f[0] < l1 + 6; const al = dentro ? Math.min(f[2], f[1] - tope) : f[2]; if (al < 3) continue; b_floresPinta(R, t, [[f[0], f[1], al, f[3], dentro ? Math.min(3, f[4]) : f[4], f[5]]], P); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 581) * 330 - 5), yb = 180, dentro = x > l0 && x < l1, al = dentro ? 4 + h(k, 2, 581) * 4 : 8 + h(k, 2, 581) * 14, s = b_racha(x, yb, t) * al * 0.2;
      R.linea(x, yb, x + s, yb - al, P.hierba[1 + (k % 3)]); R.linea(x + 1, yb, x + 1 + s * 0.8, yb - al * 0.8, P.hierba[2 + (k % 3)]); }
    if ((o.polen ?? 0) > 0.3) for (let k = 0; k < 16; k++) { const x = ((h(k, 1, 582) * 320 + t * (8 + k % 4 * 3)) % 340) - 10, y = 120 + h(k, 2, 582) * 60 - ((t * (3 + k % 3)) % 30); if (b_um(k, Math.floor(t * 4)) < (o.polen - 0.3) * 1.6) R.pset(Math.round(x), Math.round(y), P.brillo.polen[2 + (k % 2)]); }
  },
};

// dónde está el paracaídas: posa en su x en paracaidas = 1; baja meciéndose
function b_paraPos(g, t, o) {
  const p = b_lim(o.paracaidas ?? 0), x0 = o.paracaidasX ?? g.paracaidasX, y = Math.round(-28 + p * (g.suelo - 2 + 28)), mece = (1 - p) * Math.sin(t * 1.6) * 5;
  return { p, x: Math.round(x0 + mece), y, botella: [Math.round(x0 + mece * 0.6), y] };
}

// el paracaídas plateado (cúpula con gajos y brillo) con sus cuerdas y la botellita; posado, la tela cae a un lado
function b_paracaidas(R, t, o, g, P) {
  if (o.paracaidas == null) return; const { p, x, y, botella: [bx, by] } = b_paraPos(g, t, o), PL = P.plata;
  const posado = p >= 0.999, cx = posado ? bx + 12 : x, cy = posado ? by - 1 : y - 26, rx = posado ? 12 : 16, ry = posado ? 4 : 10;
  for (let j = -ry; j <= 1; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1 && j < 0) continue; if (j > 0 && (Math.abs(i) > rx - 1 || h(i, 0, 590) < 0.5)) continue;
    const gajo = Math.round((i + rx) / (rx / 3)) % 2, l = 2.5 - i / rx * 0.9 + j / ry * 0.5 - (gajo ? 0.7 : 0) + (posado && (i + j * 3) % 7 === 0 ? -0.8 : 0) + (b_um(cx + i, cy + j) - 0.5) * 0.5;
    R.pset(cx + i, cy + j, j === 1 ? PL[0] : PL[Math.max(0, Math.min(3, Math.floor(l)))]); }
  if (!posado) for (let a = 0; a <= Math.PI + 0.01; a += 0.04) R.pset(Math.round(cx + Math.cos(a) * (rx + 1)), Math.round(cy - Math.sin(a) * (ry + 1)), b_osc(PL[0], 0.5));   // el contorno, para que se lea sobre el cielo
  if (!posado) { for (const dx of [-rx, -6, 6, rx]) R.linea(cx + dx, cy + 1, bx, by - 9, b_osc(PL[1], 0.7)); R.linea(cx - rx + 3, cy - ry + 4, cx - 4, cy - ry + 1, PL[3]); if (Math.sin(t * 6) > 0.2) R.pset(cx - 6, cy - ry + 3, hex('#ffffff')); }
  else for (let k = 0; k < 4; k++) R.linea(bx + 1, by - 8, cx - rx + 2 + k * 5, cy, PL[1]);
  // la botellita: cristal con el líquido claro y el tapón plateado
  R.rect(bx - 3, by - 8, bx + 2, by - 1, P.cian[0]); R.rect(bx - 2, by - 8, bx + 1, by - 1, P.brillo.cian[1]); R.rect(bx - 2, by - 5, bx + 1, by - 1, P.brillo.cian[2]); R.rect(bx - 2, by - 7, bx - 2, by - 3, hex('#ffffff'));
  R.rect(bx - 1, by - 11, bx, by - 9, PL[2]); R.rect(bx - 2, by - 12, bx + 1, by - 12, PL[3]); R.rect(bx - 3, by, bx + 2, by, PL[0]);
  if (Math.sin(t * 4) > 0.5) { R.pset(bx + 1, by - 6, hex('#ffffff')); R.pset(bx + 3, by - 7, hex('#ffffff')); }
}
// el polen: de la flor sale un humo violeta tramado que crece con o.polen y se va con el viento hacia la derecha
function b_polen(R, B, t, o, g, P) {
  const p = b_lim(o.polen ?? 0); if (p <= 0) return; const [fx, fy] = g.flor, C = P.brillo.polen;
  const n = 6 + Math.round(p * 18);
  for (let k = 0; k < n; k++) { const ed = ((t * 0.35 + h(k, 1, 600)) % 1), d = (8 + p * 110) * Math.sqrt(h(k, 2, 600)) * (0.5 + ed * 0.5), a = -0.4 + (h(k, 3, 600) - 0.5) * 2.8;
    const cx = fx + Math.cos(a) * d + ed * 10 + Math.sin(t * 0.7 + k) * 3, cy = fy - 6 + Math.sin(a) * d * 0.45 - ed * 6, r = (4 + h(k, 4, 600) * 9) * (0.4 + p * 0.8) * (0.6 + ed * 0.6), dens = Math.min(1, 0.25 + p) * (1 - ed * 0.6);
    for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) for (let i = -Math.ceil(r); i <= Math.ceil(r); i++) { const x = Math.round(cx + i), y = Math.round(cy + j * 0.7); if (x < 0 || x > 319 || y < 0 || y > 179) continue;
      const q = 1 - Math.hypot(i, j) / r; if (q <= 0) continue; const a2 = q * dens; if (b_um(x + Math.floor(t * 3), y) > a2 * 2.4) continue;
      B[y * 320 + x] = b_mez(B[y * 320 + x], C[a2 > 0.4 ? 2 : 1], 0.55 + a2 * 0.35); } }
  // la columna que sale de la corola
  for (let k = 0; k < 10; k++) { const u = ((t * 0.8 + k / 10) % 1), x = Math.round(fx + Math.sin(u * 6 + k) * (1 + u * 4) + u * 6), y = Math.round(fy - 3 - u * 18); R.pset(x, y, C[u < 0.5 ? 3 : 2]); if (u < 0.6) R.pset(x + 1, y, C[2]); }
}

// la mecha que arde: su punta según lo quemado (0: la punta libre, 1: llega a la carga)
function b_mechaPunta(g, m) { const [cx, cy] = g.carga, [mx, my] = g.mecha, u = b_lim(m); return [Math.round(mx + (cx - 3 - mx) * u), Math.round(my + (cy + 2 - my) * u)]; }

// la trayectoria (analítica en t − t0): sale hacia la derecha en parábola, choca con el muro en x = campo[0], vuelve
// más despacio y cae al suelo detrás del que lo lanzó
function b_rebote([t0, x0, y0], g) {
  const xm = g.campo[0] - 2, vx = 120, vy = -70, G = 170, ti = Math.max(0, (xm - x0) / vx), yi = y0 + vy * ti + G * ti * ti / 2, vyi = Math.min(-40, (vy + G * ti) * 0.7 - 50);
  const ys = g.suelo - 2, A = G / 2, Bq = vyi, Cq = yi - ys, tc = (-Bq + Math.sqrt(Math.max(0, Bq * Bq - 4 * A * Cq))) / (2 * A);
  const xc = Math.max(g.libre[0] + 4, Math.min(g.borde - 24, x0 - 18)), vx2 = (xc - xm) / tc;   // cae en la meseta, detrás del que lo lanzó
  return { t0, x0, y0, ti: t0 + ti, xi: xm, yi, vx, vy, G, vyi, vx2, tc: t0 + ti + tc, xc };
}

// la posición del objeto en t (null antes de lanzarlo): [x, y, giro]
function b_rebotePos(r, t) {
  if (t < r.t0) return null; if (t < r.ti) { const s = t - r.t0; return [r.x0 + r.vx * s, r.y0 + r.vy * s + r.G * s * s / 2, s * 14]; }
  const s = Math.min(t, r.tc) - r.ti; return [r.xi + r.vx2 * s, r.yi + r.vyi * s + r.G * s * s / 2, -(t - r.t0) * 12];
}

// el objeto lanzado (piñón o hacha), en vuelo o ya caído
function b_reboteDibuja(R, t, o, g, P) {
  if (!o.rebote || g.encuadre !== 'borde') return; const r = b_rebote(o.rebote, g); if (t < r.t0) return;
  let x, y, a;
  if (t < r.tc) { [x, y, a] = b_rebotePos(r, t); } else { const s = Math.min(0.5, t - r.tc); x = r.xc - s * 12; y = g.suelo - 2; a = 0; }
  x = Math.round(x); y = Math.round(y);
  if (o.objeto === 'hacha') { const ca = Math.cos(a), sa = Math.sin(a), q = (u, v) => [Math.round(x + u * ca - v * sa), Math.round(y + u * sa + v * ca)];
    for (let u = -5; u <= 4; u++) { const [px, py] = q(u, 0); R.pset(px, py, u > 2 ? P.corteza[2] : P.corteza[4]); }
    for (let u = 2; u <= 5; u++) for (let v = -3; v <= 1; v++) { const [px, py] = q(u, v); R.pset(px, py, v === -3 ? hex('#e8eef4') : u === 5 ? P.plata[1] : P.plata[2]); } }
  else { const pa = Math.round(a * 2) % 2;   // el piñón: escamas pardas que giran
    for (let j = -3; j <= 3; j++) for (let i = -2; i <= 2; i++) { if (i * i / 5 + j * j / 11 > 1) continue; R.pset(x + i, y + j, (i + j + pa + 9) % 2 ? P.corteza[3] : P.corteza[2]); }
    R.pset(x - 1, y - 2, P.corteza[5]); R.pset(x, y + 4, P.corteza[1]); }
  if (t < r.tc) { const [px, py] = b_rebotePos(r, t - 0.06) || [x, y]; R.pset(Math.round(px), Math.round(py), b_mez(P.cielo[5], hex('#ffffff'), 0.4)); }
}

// la bruma verde del fondo del bosque (tres tonos tramados, más clara hacia el centro, donde entra la luz)
function b_brumaBosque(B, P, y0, y1, claro = 92) {
  const H = [b_mez(P.bosqueL[0], P.niebla[0], 0.14), b_mez(P.bosqueL[1], P.niebla[1], 0.2), b_mez(P.bosqueL[2], P.niebla[2], 0.28), b_mez(P.bosqueL[3], P.niebla[3], 0.36)];
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const l = 2.4 - Math.abs(y - claro) / 50 - Math.abs(x - 170) / 260 + Math.sin(x * 0.09 + Math.sin(y * 0.05) * 2) * 0.22 + Math.sin(x * 0.023 - y * 0.04) * 0.25 + (h(x >> 2, y >> 2, 610) - 0.5) * 0.25;
    B[y * 320 + x] = H[Math.max(0, Math.min(3, Math.floor(l + b_um(x, y) * 0.9 - 0.2)))]; }
}

// haces de luz en diagonal (fijos) que aclaran lo que cruzan
function b_haces(B, P, y0, y1, k0) {
  const c = P.luz === 'noche' ? hex('#8a9ad8') : hex('#fff4c0');
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const s = x + y * 0.55, w = Math.sin(s * 0.045 + k0) * Math.sin(s * 0.013 + 1.1); if (w < 0.62) continue; if (b_um(x, y) < (w - 0.62) * 2.2) B[y * 320 + x] = b_mez(B[y * 320 + x], c, 0.22); }
}

// una seta venenosa (sombrero rosa con lunares; de noche, brilla)
function b_seta(B, P, x, y, r) {
  const C = P.luz === 'noche' ? P.brillo.rosa : P.rosa;
  for (let j = 0; j < r; j++) { b_ps(B, x, y - j, P.blanco[2]); b_ps(B, x + 1, y - j, P.blanco[1]); }
  for (let j = -r; j <= 0; j++) for (let i = -r - 1; i <= r + 1; i++) { if ((i / (r + 1)) ** 2 + (j / r) ** 2 > 1) continue; b_ps(B, x + i, y - r + j, j === 0 ? C[0] : (i + j) % 3 === 0 && j < -1 ? P.blanco[3] : i < 0 ? C[2] : C[1]); }
}

// un helecho (frondas en arco con foliolos) que se mece con t; lado: -1 hacia la izquierda, 1 hacia la derecha
function b_helecho(R, P, x, y, alto, lado, t, k) {
  for (let f = 0; f < 4; f++) { const ang = (f - 1.5) * 0.45 + lado * 0.35 + Math.sin(t * 1.3 + k + f) * 0.06, L = alto * (0.7 + 0.3 * ((f * 7 + k) % 3) / 2);
    let px = x, py = y; for (let s = 1; s <= L; s++) { const u = s / L, a = ang + u * u * 1.4 * Math.sign(ang || lado), nx = x + Math.sin(a) * s, ny = y - Math.cos(ang) * s + u * u * L * 0.45;
      R.pset(Math.round(nx), Math.round(ny), P.bosque[2]); if (s % 2 === 0 && u < 0.92) { const lf = Math.round((1 - u) * 3) + 1; for (let q = 1; q <= lf; q++) { R.pset(Math.round(nx - q), Math.round(ny - q * 0.3), P.bosque[q === 1 ? 3 : 4]); R.pset(Math.round(nx + q), Math.round(ny - q * 0.3), P.bosque[q === 1 ? 2 : 3]); } }
      px = nx; py = ny; } }
}

// el bosque, plano general: bruma, troncos lejanos, el arroyo, el suelo de musgo y hojas, árboles con frutos, el árbol
// grande de la derecha y su rama
function b_bosqueFijo(R, g, P) {
  const B = R.buf, frutos = [];
  b_brumaBosque(B, P, 0, 130);
  // troncos lejanos en la bruma y copas lejanas arriba
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 611) * 330 - 5), w = 2 + Math.round(h(k, 2, 611) * 3); b_tronco(B, P, x, x + w, 0, 104 + Math.round(h(k, 3, 611) * 8), 620 + k, [b_mez(P.bosqueL[2], P.niebla[2], 0.5), 0.62]); }
  for (let k = 0; k < 16; k++) b_copa(B, Math.round(k * 21 + h(k, 1, 612) * 8), 8 + Math.round(h(k, 2, 612) * 16), 14 + Math.round(h(k, 3, 612) * 6), P.bosqueL, 630 + k, null, [P.niebla[1], 0.3]);
  // matorrales de la otra orilla con bayas
  for (let k = 0; k < 20; k++) b_copa(B, Math.round(k * 17 + h(k, 1, 613) * 6), 106 + Math.round(h(k, 2, 613) * 4), 6 + Math.round(h(k, 3, 613) * 3), P.bosque.slice(1, 5), 640 + k, h(k, 4, 613) < 0.5 ? P.frutoV : null, [P.niebla[1], 0.18]);
  b_haces(B, P, 0, 140, 0.4);
  // el suelo: musgo y hojarasca, más velado al fondo
  const ym = (x) => 117 + x * 0.05 + Math.sin(x * 0.03) * 3, wa = (x) => 3 + x * 0.014;
  for (let x = 0; x < 320; x++) for (let y = Math.round(ym(x) - wa(x) - 4); y < 180; y++) { const u = b_lim((y - 108) / 70), parche = (h(x >> 4, y >> 3, 614) + h((x + 8) >> 4, (y + 4) >> 3, 618) + h(x >> 2, y >> 1, 619) * 0.7) / 2.7 + Math.sin(x * 0.07 + y * 0.21) * 0.12, hoja = h(x, y, 615);
    let c; if (parche < 0.5) c = P.musgo[Math.max(0, Math.min(3, Math.floor(2.6 - u * 1.4 + (hoja - 0.5) * 1.4 + b_um(x, y) * 0.5)))];
    else c = P.tierra[Math.max(0, Math.min(3, Math.floor(2.4 - u * 1.2 + (hoja - 0.5) * 1.6 + b_um(x, y) * 0.5)))];
    if (hoja > 0.965) c = [P.naranja[1], P.fruto[1], P.amarillo[1]][Math.floor(h(x, y, 616) * 3)];
    if (u < 0.3) c = b_mez(c, P.niebla[1], 0.3 * (1 - u / 0.3));
    B[y * 320 + x] = c; }
  // el arroyo: agua que refleja el cielo verde, orillas de piedras redondas
  const agua = new Uint8Array(57600);
  for (let x = 0; x < 320; x++) { const c0 = ym(x), w = wa(x);
    for (let y = Math.floor(c0 - w); y <= Math.ceil(c0 + w); y++) { const v = (y - c0) / w; if (Math.abs(v) > 1) continue; agua[y * 320 + x] = 1;
      B[y * 320 + x] = P.agua[Math.max(0, Math.min(5, Math.floor(3.4 - Math.abs(v) * 1.6 - (v < -0.6 ? 0.8 : 0) + (h(x >> 2, y, 617) - 0.5) + b_um(x, y) * 0.6)))]; }
    if (h(x >> 2, 0, 618) < 0.5) for (const sg of [-1, 1]) { const y = Math.round(c0 + sg * (w + 1)), r = 1 + Math.round(h(x >> 2, sg, 619) * 1.4); if ((x & 3) === 0) for (let j = -r; j <= 0; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) b_ps(B, x + i, y + j, P.roca[j === -r ? 4 : i > 0 ? 2 : 3]); } }
  const fA = B.slice();
  // árbol de la izquierda con un muñón de rama (donde se posa un pájaro) y árbol medio velado
  b_tronco(B, P, 126, 133, 20, 112, 650, [P.niebla[1], 0.25]);
  b_tronco(B, P, 18, 34, 0, 156, 651);
  for (let x = 34; x <= 54; x++) { const y = 70 - (x - 34) * 0.15; for (let j = 0; j < 4 - (x - 34) / 8; j++) b_ps(B, x, y + j, P.corteza[j === 0 ? 4 : 2]); }
  for (let i = -6; i <= 6; i++) { const r = 156 + Math.abs(i) * 0 , w = 6 - Math.abs(i) / 2; for (let j = 0; j < w; j++) { b_ps(B, 14 + i, r - j + 2, P.corteza[2]); b_ps(B, 38 + i, r - j + 2, P.corteza[1]); } }
  // el árbol grande de la derecha: tronco con raíces y un nudo
  const [ax0, ax1] = g.arbol; b_tronco(B, P, ax0, ax1, 0, 162, 652);
  for (let k = 0; k < 4; k++) { const x0 = ax0 + k * 9, dir = k < 2 ? -1 : 1; for (let s = 0; s < 14; s++) { const x = x0 + dir * s * (k % 2 ? 1.2 : 0.8), y = 152 + s * 0.6; for (let j = 0; j < 4 - s / 5; j++) b_ps(B, x, y + j, P.corteza[j === 0 ? 3 : 1]); } }
  for (let j = -4; j <= 4; j++) for (let i = -3; i <= 3; i++) if (i * i / 9 + j * j / 16 <= 1) b_ps(B, ax0 + 14 + i, 118 + j, i * i / 4 + j * j / 9 <= 1 ? hex('#140c12') : P.corteza[4]);
  // LA RAMA: sale del tronco hacia la izquierda, gruesa, con corteza, musgo encima y la punta con hojas
  const [rx, ry] = g.rama, top = (x) => Math.round(ry - 2 + (ax0 - x) * 0.035), grosor = (x) => 5 + (x - 174) / (ax0 - 174) * 6;
  for (let x = 172; x <= ax0 + 2; x++) { const y0 = top(x), gr = grosor(x);
    for (let j = 0; j <= gr; j++) { const v = j / gr, l = 4 - v * 3.2 + (Math.sin(x * 0.5 + j * 1.3) > 0.7 ? -0.9 : 0) + (h(x >> 1, j, 653) - 0.5) * 0.6; b_ps(B, x, y0 + j, P.corteza[Math.max(0, Math.min(5, Math.floor(l)))]); }
    if (h(x >> 1, 0, 654) < 0.55) b_ps(B, x, y0, P.musgo[3]); if (h(x, 1, 654) < 0.3) b_ps(B, x, y0 - 1, P.musgo[2]); }
  for (let j = 0; j < 14; j++) for (let i = -3; i <= 3; i++) if (i * i + (j - 7) ** 2 < 10) b_ps(B, 172 + i - j * 0.4, top(172) - 4 + j * 0.3, P.bosque[(i + j) % 3 + 2]);
  // la cúpula de hojas de arriba, con frutos que relucen (las de la barra del año y la esquina de Atom, en penumbra)
  for (let k = 0; k < 14; k++) { const x = Math.round(k * 25 + h(k, 1, 655) * 10 - 8), y = 6 + Math.round(h(k, 2, 655) * 18) + (x > 170 && x < 270 ? 18 : 0), r = 16 + Math.round(h(k, 3, 655) * 8);
    const calma = (x > 10 && x < 180 && y < 26) || x > 262; b_copa(B, x, y, r, P.bosque, 660 + k, calma ? null : (k % 2 ? P.fruto : P.frutoV), calma ? [P.bosque[0], 0.45] : null);
    if (!calma) for (let q = 0; q < 5; q++) frutos.push([Math.round(x + (h(q, k, 656) - 0.5) * r * 1.2), Math.round(y + (h(q, k, 657) - 0.2) * r * 0.7)]); }
  // lianas que cuelgan
  [[72, 62], [104, 48], [160, 58], [236, 50]].forEach(([x, L], k) => { for (let y = 20; y < 20 + L; y++) { const xx = x + Math.round(Math.sin(y * 0.12 + k) * 2); b_ps(B, xx, y, P.bosque[1]); if (y % 5 === k % 5) { b_ps(B, xx + 1, y, P.bosque[3]); b_ps(B, xx - 1, y + 1, P.bosque[2]); } } });
  // setas y helechos del suelo
  [[46, 152, 3], [52, 154, 2], [252, 158, 3], [300, 150, 2], [96, 134, 2]].forEach(([x, y, r]) => b_seta(B, P, x, y, r));
  b_recorta(agua, B, fA);
  return { agua, frutos };
}

// la rama de cerca: el tronco a la izquierda, la rama que cruza, hojas y frutos arriba y el bosque hondo debajo
function b_ramaFijo(R, g, P) {
  const B = R.buf, frutos = [];
  b_brumaBosque(B, P, 0, 179, 70);
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 670) * 330 - 5), w = 3 + Math.round(h(k, 2, 670) * 5); b_tronco(B, P, x, x + w, 0, 179, 680 + k, [b_mez(P.bosqueL[2], P.niebla[2], 0.5), 0.6]); }
  // el suelo, muy abajo: el arroyo que destella entre el musgo, velado
  const agua = new Uint8Array(57600);
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const ya = 170 + Math.sin(x * 0.04) * 3; let c = Math.abs(y - ya) < 2.5 ? P.agua[3 + (b_um(x, y) < 0.3 ? 1 : 0)] : P.musgo[1 + Math.floor(h(x >> 2, y >> 1, 671) * 2)]; if (Math.abs(y - ya) < 2.5) agua[y * 320 + x] = 1; B[y * 320 + x] = b_mez(c, P.niebla[2], 0.28); }
  for (let k = 0; k < 10; k++) b_copa(B, Math.round(k * 34 + h(k, 1, 672) * 10), 150 + Math.round(h(k, 2, 672) * 8), 9 + Math.round(h(k, 3, 672) * 4), P.bosqueL, 690 + k, null, [P.niebla[2], 0.22]);
  for (let k = 0; k < 9; k++) b_copa(B, Math.round(k * 38 + 10 + h(k, 1, 673) * 12), 132 + Math.round(h(k, 2, 673) * 10), 11 + Math.round(h(k, 3, 673) * 5), P.bosque.slice(0, 5), 695 + k, k % 3 ? null : P.frutoV, [P.niebla[1], 0.2]);
  [[66, 30, 70], [118, 24, 64], [214, 30, 58], [232, 40, 50]].forEach(([x, y0, L], k) => { for (let y = y0; y < y0 + L; y++) { const xx = x + Math.round(Math.sin(y * 0.1 + k) * 2); b_ps(B, xx, y, P.bosque[1]); if (y % 4 === k % 4) { b_ps(B, xx + 1, y, P.bosque[3]); b_ps(B, xx - 1, y + 1, P.bosque[2]); } } });
  b_haces(B, P, 0, 179, 1.7);
  // el tronco de la izquierda
  b_tronco(B, P, 0, 32, 0, 179, 700);
  // la rama gruesa
  const [rx, ry] = g.rama, top = (x) => Math.round(ry + (x - 30) * 0.01), gr = (x) => 17 - (x - 30) / 280 * 8;
  for (let x = 26; x <= 312; x++) { const y0 = top(x), G = gr(x) * (x > 300 ? (312 - x) / 12 : 1);
    for (let j = 0; j <= G; j++) { const v = j / Math.max(1, G), veta = Math.sin(x * 0.18 + j * 0.9 + Math.sin(x * 0.05) * 2) > 0.75 ? -1 : 0, l = 4.4 - v * 3.6 + veta + (h(x >> 1, j, 701) - 0.5) * 0.8 + (h(x >> 3, j >> 2, 702) < 0.1 ? -1.2 : 0);
      b_ps(B, x, y0 + j, P.corteza[Math.max(0, Math.min(5, Math.floor(l + b_um(x, y0 + j) * 0.5)))]); }
    if (h(x >> 2, 0, 703) < 0.6) { b_ps(B, x, y0, P.musgo[3]); if (h(x, 1, 703) < 0.5) b_ps(B, x, y0 + 1, P.musgo[2]); }
    if (h(x, 2, 703) < 0.04) b_ps(B, x, y0 + 3, hex('#c8d890')); }   // líquenes
  for (let s = 0; s < 34; s++) { const x = 270 + s, y = top(270) - s * 0.75; for (let j = 0; j < 4 - s / 12; j++) b_ps(B, x, y + j, P.corteza[j === 0 ? 4 : 2]); }   // la rama que sube
  for (let s = 0; s < 16; s++) { const x = 92 + s * 0.6, y = top(92) + 14 + s; b_ps(B, x, y, P.corteza[2]); b_ps(B, x + 1, y, P.corteza[1]); }   // un muñón que baja
  // la cúpula de hojas arriba (por encima de y 88 en la franja de los personajes), con frutos colgando de sus rabitos
  for (let k = 0; k < 13; k++) { const x = Math.round(k * 27 + h(k, 1, 704) * 10 - 6), lado = x < 56 || x > 244, y = (lado ? 40 : 18) + Math.round(h(k, 2, 704) * 16), r = 18 + Math.round(h(k, 3, 704) * 8);
    const calma = (x > 10 && x < 180 && y < 30) || x > 266; b_copa(B, x, y, r, P.bosque, 710 + k, calma ? null : P.fruto, calma ? [P.bosque[0], 0.4] : null); }
  b_copa(B, 300, 92, 12, P.bosque, 730, P.frutoV);
  [[40, 74], [48, 80], [254, 78], [266, 86], [282, 72]].forEach(([x, y], k) => { for (let j = 0; j < 6; j++) b_ps(B, x, y - j, P.bosque[1]); const C = k % 2 ? P.frutoV : P.fruto;
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 5) b_ps(B, x + i, y + 2 + j, i + j < -1 ? C[3] : i + j < 1 ? C[2] : C[1]); frutos.push([x - 1, y + 1]); });
  return { agua, frutos };
}

// lo que se mueve en el bosque: el arroyo, motas en los haces, frutos que relucen, pájaros, hojas que caen
function b_bosqueVivo(R, B, t, o, g, P, F) {
  const gen = g.camara === 'general', A = F.agua;
  for (let i = 0; i < 57600; i++) { if (!A[i]) continue; const x = i % 320, y = (i / 320) | 0, s = Math.sin((x - t * 16) * 0.22 + y * 1.7) + Math.sin((x - t * 9) * 0.07 + y * 0.4);
    if (s > 1.7 || h(x, y, Math.floor(t * 7)) < 0.006) B[i] = P.agua[5]; else if (s > 1.25 && b_um(x, y) < 0.6) B[i] = P.agua[4]; }
  for (const [k, [x, y]] of F.frutos.entries()) { const s = Math.sin(t * 1.7 + k * 2.3); if (s > 0.93) { R.pset(x, y - 1, hex('#ffffff')); R.pset(x - 1, y, P.brillo.fruto[3]); R.pset(x + 1, y, P.brillo.fruto[3]); R.pset(x, y + 1, P.brillo.fruto[3]); } }
  // motas en la luz
  const cm = P.luz === 'noche' ? hex('#c8d4ff') : hex('#fff8d0');
  for (let k = 0; k < 26; k++) { const x = (h(k, 1, 740) * 320 + Math.sin(t * 0.5 + k) * 8 + t * 2) % 320, y = 20 + ((h(k, 2, 740) * 140 + t * (2 + k % 3)) % 140); if (Math.sin(t * 1.5 + k * 1.9) > -0.2) R.pset(Math.round(x), Math.round(y), cm); }
  // pájaros de colores que cruzan el claro
  b_pajaros(R, t, gen ? 64 : 100, [P.brillo.cian, P.brillo.rosa, P.brillo.amarillo], 3, 3, 30);
  // el pájaro posado (en el muñón de la izquierda o en la rama que sube): picotea, mira y a veces aletea
  { const [px, py] = gen ? [50, 67] : [296, 93], c = (t % 5), al = c > 4.4, mira = Math.sin(t * 2.2) > 0 ? 1 : -1, C = P.brillo.rosa, y = py - (al ? 1 : 0);
    R.rect(px - 1, y - 1, px + 1, y, C[1]); R.pset(px - 2, y, C[0]); R.pset(px + mira, y - 2, C[2]); R.pset(px + mira * 2, y - 2, P.amarillo[2]); R.pset(px + mira, y - 3, C[3]);
    if (al) { R.pset(px - 1, y - 3, C[2]); R.pset(px + 1, y - 3, C[2]); } R.pset(px, y + 1, hex('#1a1020')); }
  // hojas que caen dando vueltas
  for (let k = 0; k < 7; k++) { const per = 9 + k % 3 * 2, u = ((t + k * 2.7) % per) / per, x = h(k, 1, 741) * 300 + 10 + Math.sin(u * 12 + k) * 7, y = 30 + u * 140, c = [P.naranja[2], P.amarillo[2], P.bosque[4]][k % 3];
    R.pset(Math.round(x), Math.round(y), c); R.pset(Math.round(x + (Math.sin(u * 24) > 0 ? 1 : -1)), Math.round(y), b_osc(c, 0.75)); }
}

// por delante en el bosque: helechos y matas a los lados; en la rama, hojas que brotan (por debajo de las rodillas) y
// hojas grandes en las esquinas de abajo
function b_bosqueDelante(R, B, t, o, g, P) {
  const [l0, l1] = g.libre;
  if (g.camara === 'general') {
    b_helecho(R, P, 6, 182, 26, 1, t, 1); b_helecho(R, P, 300, 184, 30, -1, t, 2); b_helecho(R, P, 316, 176, 18, -1, t, 3);
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 750) * 330 - 5), dentro = x > l0 && x < l1, al = dentro ? 3 + h(k, 2, 750) * 4 : 6 + h(k, 2, 750) * 10, s = b_racha(x, 180, t) * al * 0.15;
      R.linea(x, 180, x + s, 180 - al, P.bosque[2 + (k % 2)]); }
  } else {
    const ry = g.rama[1];
    for (const x0 of [36, 44, 52, 250, 262, 276, 290]) { const s = Math.sin(t * 1.8 + x0) * 1.2; for (let q = 0; q < 3; q++) { const x = x0 + q * 3, al = 5 + (q % 2) * 3; R.linea(x, ry + 1, x + s + q - 1, ry - al, P.bosque[2 + q % 2]); R.pset(Math.round(x + s + q - 1), ry - al, P.bosque[4]); } }
    [[-6, 184, 1], [328, 178, -1]].forEach(([x, y, d], k) => b_helecho(R, P, x, y, 34, d, t, k + 7));
  }
}

// borra de la máscara M lo que ya no es igual que en la foto (lo que se pintó encima después)
function b_recorta(M, B, foto) { for (let i = 0; i < 57600; i++) if (M[i] && B[i] !== foto[i]) M[i] = 0; }

// roca de caverna húmeda: estratos con su canto de luz y su sombra, grietas, regueros mojados que brillan
function b_rocaCueva(B, P, x0, y0, x1, y1, osc = 0) {
  const C = P.cueva;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const s = y + Math.sin(x * 0.045) * 5 + Math.sin(x * 0.13 + y * 0.04) * 2 + (h(x >> 3, 0, 760) - 0.5) * 5, banda = Math.floor(s / 9), fr = s / 9 - banda;
    let l = 2.6 + (h(banda, x >> 4, 761) - 0.5) * 1.2 + (h(x >> 1, y >> 1, 762) - 0.5) * 0.9 - osc + (h((x + banda * 11) >> 5, banda, 766) - 0.5) * 0.8;
    if (fr < 0.14) l += 1.2; else if (fr > 0.84) l -= 1.1;
    const pas = 9 + Math.floor(h(banda, 1, 767) * 14), cx = (x + Math.floor(h(banda, 2, 767) * 20)) % pas; if (cx === 0 && h(Math.floor(x / pas), banda, 763) < 0.55) l -= 1.4;   // grietas
    if (h(x, 0, 764) < 0.05 && h(x, banda, 765) < 0.6) l += 1 + (b_um(x, y) < 0.5 ? 0.6 : 0);   // regueros
    B[y * 320 + x] = C[Math.max(0, Math.min(6, Math.floor(l + b_um(x, y) * 0.8 - 0.3)))];
  }
}

// halo cálido de una lámpara sobre lo pintado (fijo)
function b_haloFijo(B, x, y, r, c, a) { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d >= r) continue; const q = (1 - d / r) ** 2 * a; if (b_um(x + i, y + j) < q * 2.2) b_pm(B, x + i, y + j, c, Math.min(0.5, q + 0.12)); } }

// una tubería horizontal (cilindro con brillo, bridas con pernos cada paso, abrazaderas y chorretones de óxido)
function b_tuboH(B, P, x0, x1, cy, r, paso, fase) {
  const T = P.tubo;
  for (let x = x0; x <= x1; x++) { const br = ((x - fase) % paso + paso) % paso < 4, rr = br ? r + 2 : r;
    for (let y = Math.round(cy - rr); y <= Math.round(cy + rr); y++) { const v = (y - cy) / rr, l = 4.2 - Math.abs(v + 0.35) * 3.4 - (v > 0.6 ? 0.8 : 0) + (br ? 0.4 : 0) + (h(x >> 1, y, 770) - 0.5) * 0.5;
      let c = T[Math.max(0, Math.min(6, Math.floor(l + b_um(x, y) * 0.6)))];
      if (!br && v > 0.35 && h(x >> 2, y >> 1, 771 + r) < 0.09) c = b_mez(c, P.oxido[1 + (y % 2)], 0.6);
      b_ps(B, x, y, c); }
    if (br && ((x - fase) % paso + paso) % paso === 1) for (const v of [-0.7, 0, 0.7]) { b_ps(B, x, Math.round(cy + v * (r + 1)), T[5]); b_ps(B, x + 1, Math.round(cy + v * (r + 1)), T[1]); }
    if (((x - fase) % paso + paso) % paso === 5 && h(x, 3, 773) < 0.6) for (let j = 1; j < 6 + (x % 7); j++) if (h(x, j, 772) < 0.8) b_ps(B, x + (j > 4 ? 1 : 0), Math.round(cy + r) + j, P.oxido[j < 3 ? 2 : 1]); }
}

// el depósito, plano general
function b_depoFijo(R, g, P) {
  const B = R.buf, L = [[36, 38], [128, 34], [204, 36]], [w0, wy0, w1, wy1] = g.agua;
  b_rocaCueva(B, P, 0, 0, 319, wy0 - 1);
  // estalactitas del techo (oscuras)
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 780) * 316), calma = x > 14 && x < 176, L2 = (calma ? 6 : 12) + Math.round(h(k, 2, 780) * (calma ? 6 : 18)); for (let j = 0; j < L2; j++) { const w = Math.round((1 - j / L2) * 3.5); for (let i = -w; i <= w; i++) b_ps(B, x + i, j, calma ? P.cueva[i < 0 ? 2 : 1] : P.cueva[i === -w ? 5 : i < 0 ? 4 : i === w ? 1 : 2]); } if (!calma) b_ps(B, x, L2, P.aguaC[6]); }
  // la boca abovedada de un canal, con su reja, al nivel del agua
  for (let y = 78; y < wy0; y++) for (let x = 92; x <= 168; x++) { const dx = (x - 130) / 38, dy = (y - 100) / 22; const d = dx * dx + dy * dy; if (d > 1) continue;
    b_ps(B, x, y, d > 0.72 ? P.cueva[(Math.floor(Math.atan2(dy, dx) * 6) % 2 ? 5 : 4) - (d > 0.9 ? 1 : 0)] : (x % 6 === 0 || y % 7 === 0) && d < 0.66 ? P.tubo[2] : P.cueva[0]); }
  for (const [x, y] of L) b_haloFijo(B, x, y, 34, P.lampara[0], 0.4);
  // las tuberías enormes (con abrazaderas a la roca) y la vertical con su volante y su manómetro
  b_tuboH(B, P, 0, 319, 54, 9, 64, 20); b_tuboH(B, P, 0, 319, 76, 6, 52, 40);
  for (const x of [60, 150, 290]) for (let y = 40; y < 46; y++) { b_ps(B, x, y, P.tubo[2]); b_ps(B, x + 1, y, P.tubo[1]); }
  // el cuadro eléctrico de la pared, a la derecha
  for (let y = 84; y <= 104; y++) for (let x = 292; x <= 314; x++) b_ps(B, x, y, x === 292 || y === 84 ? P.tubo[4] : x === 314 || y === 104 ? P.tubo[0] : P.tubo[2 + ((x + y) % 7 === 0 ? 1 : 0)]);
  for (let x = 296; x <= 310; x++) b_ps(B, x, 99, P.tubo[1]);
  // el agua del depósito, el muro de abajo y la barandilla
  const agua = new Uint8Array(57600);
  for (let y = wy0; y <= wy1; y++) for (let x = w0; x <= w1; x++) { const v = (y - wy0) / (wy1 - wy0); agua[y * 320 + x] = 1;
    B[y * 320 + x] = P.aguaC[Math.max(0, Math.min(6, Math.floor(1.4 + v * 1.4 + (h(x >> 3, y, 781) - 0.5) * 0.8 + b_um(x, y) * 0.7)))]; }
  const fA = B.slice();
  for (let x = 0; x < 320; x++) for (let y = wy0 - 2; y < wy0; y++) b_ps(B, x, y, P.cueva[4]);
  for (let y = wy1 + 1; y <= 134; y++) for (let x = 0; x < 320; x++) { const l = 2 + (y === wy1 + 1 ? 1.5 : 0) + (h(x >> 2, y >> 1, 782) - 0.5); B[y * 320 + x] = P.hormigon[Math.max(0, Math.min(4, Math.floor(l + b_um(x, y) * 0.6)))]; }
  // el andén de hormigón mojado, con juntas en perspectiva, la franja de aviso, la rejilla del desagüe y charcos
  for (let y = 135; y < 180; y++) { const u = (y - 135) / 45;
    for (let x = 0; x < 320; x++) { const xj = ((x - 160) / (1 + u * 0.5) + 160 + 2000) % 44, junta = xj < 1 || (y - 135) % Math.round(9 + u * 6) === 0;
      let l = 3 - u * 0.8 + (h(x >> 2, y >> 1, 783) - 0.5) * 0.9 - (junta ? 1.3 : 0); if (h(x, y, 784) < 0.03) l -= 1;
      let c = P.hormigon[Math.max(0, Math.min(4, Math.floor(l + b_um(x, y) * 0.6)))];
      if (y < 139) c = ((x + y * 1) >> 2) % 2 ? (y === 135 ? P.amarillo[2] : P.amarillo[1]) : P.cueva[0];   // la franja de aviso, gastada
      if (y < 139 && h(x, y, 785) < 0.2) c = P.hormigon[2];
      const ch = ((x - 70) / 40) ** 2 + ((y - 162) / 5) ** 2 < 1 || ((x - 190) / 26) ** 2 + ((y - 172) / 4) ** 2 < 1;
      if (ch) c = b_mez(c, P.aguaC[5], 0.35 + (b_um(x, y) < 0.3 ? 0.2 : 0));
      B[y * 320 + x] = c; } }
  for (let y = 164; y <= 170; y++) for (let x = 122; x <= 142; x++) b_ps(B, x, y, y === 164 || y === 170 || x === 122 || x === 142 ? P.tubo[4] : x % 3 === 0 ? P.tubo[0] : P.tubo[2]);
  for (let x = 0; x < 320; x++) { b_ps(B, x, 123, P.tubo[4]); b_ps(B, x, 124, P.tubo[2]); b_ps(B, x, 129, P.tubo[3]); }
  for (let x = 14; x < 320; x += 34) for (let y = 123; y <= 135; y++) { b_ps(B, x, y, P.tubo[4]); b_ps(B, x + 1, y, P.tubo[1]); }
  // la tubería vertical
  const [tx0, tx1] = g.tuberia, tc = (tx0 + tx1) / 2, tr = (tx1 - tx0) / 2;
  for (let y = 60; y <= 154; y++) { const br = (y > 136 && y < 141) || (y > 62 && y < 66), r = br ? tr + 2 : tr;
    for (let x = Math.round(tc - r); x <= Math.round(tc + r); x++) { const v = (x - tc) / r, l = 4.3 - Math.abs(v + 0.4) * 3.4 + (br ? 0.4 : 0) + (h(x, y >> 1, 786) - 0.5) * 0.5; b_ps(B, x, y, P.tubo[Math.max(0, Math.min(6, Math.floor(l + b_um(x, y) * 0.6)))]); }
    if (y > 141 && h(y, 0, 787) < 0.3) b_ps(B, tc + 4, y, P.oxido[2]); }
  for (let x = tc - tr - 4; x <= tc + tr + 4; x++) for (let y = 152; y <= 155; y++) b_ps(B, x, y, y === 152 ? P.tubo[4] : P.tubo[1]);
  // el volante (rojo) y la esfera del manómetro
  for (let a = 0; a < Math.PI * 2; a += 0.12) { b_ps(B, tc - 13 + Math.cos(a) * 6, 92 + Math.sin(a) * 6, P.fruto[1]); b_ps(B, tc - 13 + Math.cos(a) * 5, 92 + Math.sin(a) * 5, P.fruto[0]); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; R.linea(tc - 13 - Math.cos(a) * 5, 92 - Math.sin(a) * 5, tc - 13 + Math.cos(a) * 5, 92 + Math.sin(a) * 5, P.fruto[0]); }
  for (let x = tc - 9; x < tc - tr; x++) b_ps(B, x, 92, P.tubo[2]);
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j); if (d <= 4.4) b_ps(B, tc + tr + 6 + i, 112 + j, d > 3.5 ? P.tubo[1] : P.blanco[2]); }
  for (let x = tc + tr; x < tc + tr + 3; x++) b_ps(B, x, 112, P.tubo[3]);
  b_pozo(B, P, g.suelo);
  b_recorta(agua, B, fA);
  return { agua, lamparas: L };
}
// la tubería de cerca: la roca del fondo, el agua detrás, la tubería enorme sobre sus apoyos, la brida con pernos
function b_tuboFijo(R, g, P) {
  const B = R.buf, L = [[54, 42], [252, 58]];
  b_rocaCueva(B, P, 0, 0, 319, 129, 0.3);
  for (const [x, y] of L) b_haloFijo(B, x, y, 40, P.lampara[0], 0.34);
  b_tuboH(B, P, 0, 319, 30, 5, 70, 10);
  // la pasarela de rejilla con su barandilla, cables que cuelgan y un tubo de servicio con su llave
  for (let x = 0; x < 320; x++) { for (let y = 62; y <= 65; y++) b_ps(B, x, y, y === 62 ? P.tubo[4] : (x + y) % 3 ? P.tubo[1] : P.tubo[2]); b_ps(B, x, 52, P.tubo[3]); b_ps(B, x, 57, P.tubo[2]); if (x % 24 === 4) for (let y = 52; y < 62; y++) { b_ps(B, x, y, P.tubo[4]); b_ps(B, x + 1, y, P.tubo[1]); } }
  for (let k = 0; k < 3; k++) { const x0 = 20 + k * 110, x1 = x0 + 100, caida = 10 + k * 3; for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), y = 67 + Math.round(4 * caida * u * (1 - u)); b_ps(B, x, y, P.cueva[0]); b_ps(B, x, y + 2, k % 2 ? P.fruto[0] : P.tubo[0]); } }
  for (let y = 66; y < 92; y++) for (let x = 146; x <= 150; x++) b_ps(B, x, y, P.tubo[x === 146 ? 4 : x === 150 ? 1 : 3]);
  for (let a = 0; a < 6.3; a += 0.15) b_ps(B, 140 + Math.cos(a) * 4, 78 + Math.sin(a) * 4, P.fruto[1]); R.linea(136, 78, 144, 78, P.fruto[0]); R.linea(140, 74, 140, 82, P.fruto[0]);
  // un aviso pintado: un triángulo con su exclamación (solo un símbolo)
  for (let j = 0; j < 11; j++) for (let i = -j * 0.6; i <= j * 0.6; i++) b_ps(B, 214 + i, 70 + j, j === 10 || Math.abs(i) > j * 0.6 - 1 ? P.cueva[0] : P.amarillo[2]); for (let j = 3; j < 8; j++) if (j !== 6) b_ps(B, 214, 70 + j, P.cueva[0]);
  const agua = new Uint8Array(57600);
  for (let y = 130; y < 150; y++) for (let x = 0; x < 320; x++) { agua[y * 320 + x] = 1; B[y * 320 + x] = P.aguaC[Math.max(0, Math.min(6, Math.floor(1.6 + (y - 130) / 20 * 1.2 + (h(x >> 3, y, 790) - 0.5) * 0.8 + b_um(x, y) * 0.7)))]; }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (y - 150) / 30, junta = ((x - 160) / (1 + u * 0.6) + 2160) % 52 < 1 || (y - 150) % 11 === 0;
    let c = P.hormigon[Math.max(0, Math.min(4, Math.floor(3 - u * 0.7 + (h(x >> 2, y >> 1, 791) - 0.5) * 0.9 - (junta ? 1.3 : 0) + b_um(x, y) * 0.6)))];
    if (y < 153) c = ((x + y) >> 2) % 2 ? P.amarillo[y === 150 ? 2 : 1] : P.cueva[0];
    if (((x - 250) / 44) ** 2 + ((y - 170) / 5) ** 2 < 1) c = b_mez(c, P.aguaC[5], 0.4);
    B[y * 320 + x] = c; }
  const fA = B.slice();
  // apoyos de hormigón
  for (const sx of [96, 280]) for (let y = 128; y < 160; y++) for (let x = sx - 12; x <= sx + 12; x++) b_ps(B, x, y, P.hormigon[x < sx - 9 ? 3 : x > sx + 9 ? 0 : 2 - (h(x, y, 792) < 0.15 ? 1 : 0)]);
  // la tubería: cilindro enorme con remaches en las costuras, una franja pintada y la brida grande con sus pernos
  const cy = 112, r = 22, [bx] = g.carga;
  for (let x = 0; x < 320; x++) { const br = Math.abs(x - bx) <= 6, rr = br ? r + 4 : r;
    for (let y = cy - rr; y <= cy + rr; y++) { const v = (y - cy) / rr; let l = 4.4 - Math.abs(v + 0.35) * 3.6 - (v > 0.7 ? 0.7 : 0) + (br ? (Math.abs(x - bx) === 6 ? -1.2 : 0.4) : 0) + (h(x >> 1, y >> 1, 793) - 0.5) * 0.45;
      let c = P.tubo[Math.max(0, Math.min(6, Math.floor(l + b_um(x, y) * 0.6)))];
      if (!br && x > 40 && x < 56) c = b_mez(c, P.cian[0], 0.55);   // la franja pintada
      if (!br && v > 0.3 && h(x, 0, 794) < 0.14 && h(x, y >> 3, 797) < 0.55) c = b_mez(c, P.oxido[1 + ((x + y) % 2)], 0.55);
      if (!br && (x % 46 === 0) && Math.abs(v) < 0.95) c = P.tubo[1];
      if (!br && (x % 46 === 1) && (y - cy) % 5 === 0) c = P.tubo[6];
      B[y * 320 + x] = c; } }
  for (let k = 0; k < 9; k++) { const v = -0.85 + k * 0.21, y = Math.round(cy + v * (r + 2)); for (const dx of [-4, 4]) { b_ps(B, bx + dx, y, P.tubo[6]); b_ps(B, bx + dx + 1, y + 1, P.tubo[0]); } }
  for (let j = 1; j < 18; j++) for (const dx of [-7, 8]) if (h(dx, j, 795) < 0.75) b_ps(B, bx + dx + (j > 9 ? 1 : 0), cy + r + 2 + j * 0.6, P.oxido[j < 6 ? 2 : 1]);
  b_recorta(agua, B, fA);
  return { agua, lamparas: L };
}

// la carga: un paquete de lona atado con cuerda a la brida (en el plano general, más pequeño)
function b_carga(R, P, x, y, grande) {
  const w = grande ? 10 : 5, hh = grande ? 7 : 4;
  for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const l = 2.2 - i / w * 0.6 - j / hh * 0.8 + (h(x + i, y + j, 796) - 0.5) * 0.5; R.pset(x + i, y + j, P.tierra[Math.max(1, Math.min(4, Math.floor(l + b_um(x + i, y + j) * 0.5)))]); }
  for (let j = -hh; j <= hh; j++) { R.pset(x - Math.round(w / 2), y + j, P.oxido[0]); R.pset(x + Math.round(w / 2), y + j, P.oxido[0]); }
  for (let i = -w; i <= w; i++) R.pset(x + i, y, P.oxido[1]);
  if (grande) for (let j = 0; j < 8; j++) R.pset(x - Math.round(w / 2) + (j % 2), y - hh - j, P.oxido[1]);   // la cuerda que lo ata a la tubería
}

// lo que se mueve en el depósito: reflejos de las lámparas en el agua, ondas, gotas, lámparas que parpadean, el
// manómetro, el piloto del cuadro, la carga y el reventón
function b_depoVivo(R, B, t, o, g, P, F) {
  const gen = g.camara === 'general', A = F.agua, e = b_lim(o.estalla ?? 0);
  // el agua: reflejos verticales de las lámparas que ondulan y rizos
  for (let i = 0; i < 57600; i++) { if (!A[i]) continue; const x = i % 320, y = (i / 320) | 0;
    for (const [lx] of F.lamparas) { const off = Math.sin(y * 1.3 + t * 3 + lx) * (1.5 + (y % 4)), w = 1.4 + (y - 100) * 0.06; if (Math.abs(x - lx - off) < w && b_um(x, y) < 0.7) B[i] = (y + Math.floor(t * 4)) % 3 ? P.lampara[1] : P.lampara[0]; }
    if (Math.sin((x + t * 5) * 0.21 + y * 2.3) + Math.sin(x * 0.05 - t * 0.7) > 1.75) B[i] = P.aguaC[6];
    if (e > 0.15 && Math.abs(x - g.carga[0]) < 90 && h(x >> 1, y, Math.floor(t * 12)) < (e - 0.15) * 0.18 * (1 - Math.abs(x - g.carga[0]) / 90)) B[i] = P.blanco[2]; }
  // las lámparas enjauladas, que parpadean
  for (const [k, [lx, ly]] of F.lamparas.entries()) { const fl = h(k, Math.floor(t * 9), 800) < 0.08 ? 0 : 1;
    R.disco(lx, ly, 3, fl ? P.lampara[2] : P.lampara[0]); R.pset(lx - 1, ly - 1, fl ? P.lampara[3] : P.lampara[1]);
    for (const d of [-3, 0, 3]) R.linea(lx + d, ly - 4, lx + d, ly + 3, P.tubo[1]); R.linea(lx - 4, ly, lx + 4, ly, P.tubo[1]); R.rect(lx - 2, ly - 6, lx + 2, ly - 5, P.tubo[2]); R.linea(lx, ly - 7, lx, ly - 14, P.tubo[1]); }
  // gotas que caen del techo (y de la tubería) y hacen anillos en el agua
  const fuentes = gen ? [[70, 20, 110], [176, 24, 116], [290, 18, 104]] : [[150, 136, 148], [222, 136, 146]];
  for (const [k, [x, y0, y1]] of fuentes.entries()) { const per = 2.2 + k * 0.6, u = ((t + k * 0.9) % per) / per, cae = u < 0.5, y = y0 + (u / 0.5) ** 2 * (y1 - y0);
    if (cae) { R.pset(x, Math.round(y), P.aguaC[6]); R.pset(x, Math.round(y) - 1, P.aguaC[5]); } else { const r = (u - 0.5) * 16; for (let a = 0; a < 6.28; a += 0.5) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(y1 + Math.sin(a) * r * 0.25); if (A[py * 320 + px]) R.pset(px, py, P.aguaC[6]); } } }
  if (gen) {
    // el manómetro (la aguja tiembla) y el piloto rojo del cuadro
    const [tx0, tx1] = g.tuberia, mx = tx1 + 6, a = -2.2 + Math.sin(t * 0.8) * 0.3 + Math.sin(t * 9) * 0.05 + e * 3; R.linea(mx, 112, mx + Math.round(Math.cos(a) * 3), 112 + Math.round(Math.sin(a) * 3), P.fruto[0]);
    R.rect(296, 88, 298, 90, Math.sin(t * 4) > 0 ? P.brillo.fruto[2] : P.fruto[0]); R.rect(302, 88, 304, 90, Math.sin(t * 1.3) > 0.3 ? P.brillo.cian[2] : P.cian[0]); R.rect(296, 93, 310, 95, P.tubo[1]); R.pset(297 + Math.floor((t * 3) % 13), 94, P.brillo.amarillo[2]);
  }
  // la carga y su mecha
  const [cx, cy] = g.carga;
  if (o.carga !== false && e < 0.08) b_carga(R, P, cx, cy, !gen);
  if (!gen && o.carga !== false && e < 0.08) { const m = b_lim(o.mecha ?? 0), [px, py] = b_mechaPunta(g, m), [mx, my] = g.mecha;
    R.linea(cx - 7, cy + 2, px, py, P.tierra[3]); R.linea(cx - 7, cy + 3, px, py + 1, P.tierra[0]); if (m <= 0) { R.linea(mx, my, mx - 2, my + 3, P.tierra[3]); }
    if (o.mecha != null && m > 0) { for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d < 7 && b_um(px + i, py + j) < (1 - d / 7) * 0.9) b_pm(R.buf, px + i, py + j, P.brillo.lampara[1], 0.5); } R.disco(px, py, 2, P.brillo.lampara[2]); R.pset(px, py, hex('#ffffff')); } if (o.mecha != null && m > 0) for (let k = 0; k < 10; k++) { const a = h(k, Math.floor(t * 20), 801) * 6.28, d = 1 + h(k, Math.floor(t * 20), 802) * 6; R.pset(Math.round(px + Math.cos(a) * d), Math.round(py + Math.sin(a) * d - 1), k % 2 ? P.brillo.lampara[3] : P.brillo.naranja[2]); } }
  if (e > 0) b_reventon(R, B, t, e, g, P);
}

// el reventón: un destello, la brida que se abre y el agua que sale a chorros y corre por el suelo
function b_reventon(R, B, t, e, g, P) {
  const [cx, cy] = g.carga, gen = g.camara === 'general';
  if (e < 0.14) { const f = 1 - e / 0.14, rr = 110; for (let y = Math.max(0, cy - rr); y <= Math.min(179, cy + rr); y++) for (let x = Math.max(0, cx - rr); x <= Math.min(319, cx + rr); x++) { const q = (1 - Math.hypot(x - cx, y - cy) / rr) * f; if (q > 0 && b_um(x, y) < q * 1.8) B[y * 320 + x] = b_mez(B[y * 320 + x], P.lampara[3], Math.min(0.85, q + 0.2)); } }
  const s = b_lim((e - 0.06) / 0.3), C = P.agua;
  if (s <= 0) return;
  // los chorros: arcos de agua que salen de la brida, con gotas que corren por ellos
  const chorros = gen ? [[-2.5, 70], [-1.9, 85], [-1.2, 80], [-0.4, 60], [-3.0, 55], [0.3, 40]] : [[-2.4, 90], [-1.6, 110], [-0.9, 100], [-0.2, 80], [2.6, 60], [0.6, 70]];
  for (const [k, [a, v]] of chorros.entries()) { const vx = Math.cos(a) * v * s, vy = Math.sin(a) * v * s, G = 120, Tm = 1.4;
    for (let q = 0; q < 70; q++) { const u = q / 70 * Tm, x = cx + vx * u, y = cy + vy * u + G * u * u / 2; if (y > 179) break; const fl = (q + Math.floor(t * 30) + k * 7) % 5;
      R.pset(Math.round(x), Math.round(y), fl === 0 ? C[5] : fl < 3 ? C[4] : C[3]); if (q % 2 === 0) R.pset(Math.round(x) + 1, Math.round(y), C[3]); if (q > 8 && h(q, k, Math.floor(t * 15)) < 0.25) R.pset(Math.round(x + (h(q, k, 803) - 0.5) * 6), Math.round(y + (h(q, k, 804) - 0.5) * 4), C[5]); } }
  // la boca rota, la espuma y el agua que corre por el andén
  for (let k = 0; k < 18; k++) { const a = h(k, Math.floor(t * 12), 805) * 6.28, d = h(k, 1, 806) * 7 * s; R.pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), P.blanco[3]); }
  const yS = gen ? 152 : 151, ext = s * 200;
  for (let y = yS; y < 180; y++) for (let x = Math.max(0, Math.round(cx - ext)); x <= Math.min(319, Math.round(cx + ext * 0.5)); x++) { const w = Math.sin((x + t * 30 * (x < cx ? -1 : 1)) * 0.2 + y * 0.9), q = 1 - Math.abs(x - cx) / (x < cx ? ext : ext * 0.5); if (b_um(x, y) < 0.5 * s * q) B[y * 320 + x] = b_mez(B[y * 320 + x], w > 0.7 ? C[5] : C[3], 0.45); }
}

// por delante en el depósito: gotas de los chorros que salpican en el suelo y piedras en las esquinas
function b_depoDelante(R, B, t, o, g, P) {
  const e = b_lim(o.estalla ?? 0), [l0, l1] = g.libre;
  for (const [x0, x1] of [[-2, 12], [306, 322]]) for (let x = x0; x <= x1; x++) { const top = 168 + Math.round(Math.abs(x - (x0 + x1) / 2) * 0.8) + Math.round(h(x >> 1, 0, 810) * 2); for (let y = top; y < 180; y++) R.pset(x, y, P.cueva[y === top ? 4 : x < (x0 + x1) / 2 ? 3 : 1]); }
  if (e > 0.15) for (let k = 0; k < 24; k++) { const u = ((t * 1.8 + h(k, 1, 811)) % 1), x0 = g.carga[0] + (h(k, 2, 811) - 0.6) * 160, x = x0 + (h(k, 3, 811) - 0.5) * 20 * u, y = 179 - Math.sin(u * Math.PI) * (6 + h(k, 4, 811) * 10);
    if (x > l0 && x < l1 && y < g.suelo - 12) continue; R.pset(Math.round(x), Math.round(y), P.agua[k % 2 ? 5 : 4]); }
}

// el vacío: niebla que sube del fondo, clara arriba y azul honda abajo (y 0–179 en las x de xs(y) en adelante)
function b_vacio(B, P, y0, xs) {
  const N = [b_mez(P.cielo[7], P.niebla[3], 0.4), P.niebla[2], P.niebla[1], b_mez(P.niebla[0], P.cielo[3], 0.3), b_mez(P.niebla[0], P.cielo[1], 0.5)];
  for (let y = y0; y < 180; y++) for (let x = Math.max(0, xs(y)); x < 320; x++) { const u = (y - y0) / (179 - y0), banda = Math.sin(y * 0.35 + Math.sin(x * 0.03) * 2) > 0.7 ? -0.7 : 0;
    B[y * 320 + x] = N[Math.max(0, Math.min(4, Math.floor(u * 4.2 + banda + (h(x >> 3, y >> 1, 820) - 0.5) * 0.6 + b_um(x, y) * 0.8)))]; }
}

// el borde, plano general: la meseta de hierba y flores hasta el filo, la pared de roca, el vacío y el bosque «pintado»
function b_bordeFijo(R, g, P) {
  const B = R.buf, HOR = 100, sol = { dia: [180, 34], amanecer: [300, 92], tarde: [250, 76], noche: [190, 32] }[P.luz];
  b_cieloF(B, P, HOR + 12); b_astro(B, P, sol[0], sol[1]);
  const foto = B.slice();
  // el engaño: una sierra y un bosque lejanos, velados, que siguen al otro lado del vacío (las copas se repiten igual
  // cada 42 px: un decorado pintado)
  b_montana(B, P, [[250, 22, 40], [300, 30, 44], [196, 16, 30]], HOR + 2, 821, 0.55, 0.3);
  for (let k = 0; k < 40; k++) b_copa(B, Math.round(k * 8.4 + h(k % 5, 1, 822) * 4), HOR + 6, 4 + Math.round(h(k % 5, 2, 822) * 2), P.bosqueL, 830 + (k % 5), null, [P.cielo[7], 0.45]);
  const ex = (y) => Math.round(196 + (y - 108) * 0.2 + (h(y >> 2, 0, 823) - 0.5) * 6), fw = (y) => 4 + Math.round((y - 108) * 0.42);
  const vacio = b_vacioHondo(B, P, HOR + 8, (y) => (y < 108 ? 0 : ex(y)), [[300, 128, 9, 0.62], [262, 146, 7, 0.55], [232, 156, 5, 0.42], [312, 160, 6, 0.4]], 820);
  const fV = B.slice();
  // la meseta
  const hierba = new Uint8Array(57600);
  for (let y = 106; y < 180; y++) { const u = (y - 106) / 73;
    for (let x = 0; x <= ex(y); x++) { const brizna = h(x, Math.floor((y + h(x, 0, 824) * 5) / (1.5 + u * 4)), 825);
      let c = P.hierba[Math.max(0, Math.min(6, Math.floor(4.4 - u * 2.4 + (h(x >> 3, y >> 2, 826) - 0.5) * 0.8 + (brizna > 0.82 ? 1 : brizna < 0.14 ? -1 : 0) + b_um(x, y) * 0.9 - 0.3)))];
      for (const [mx, my, rx, ry, pi] of [[40, 124, 40, 8, 1], [130, 116, 40, 4, 0], [20, 160, 30, 14, 2], [160, 140, 26, 6, 3]]) { const d = ((x - mx) / rx) ** 2 + ((y - my) / ry) ** 2; if (d < 1 && h(x, y, 827 + pi) < (1 - d) * 0.45) c = P.flores[pi][(x + y) % 3 ? 2 : 3]; }
      B[y * 320 + x] = c; hierba[y * 320 + x] = 1; } }
  // el filo: la pared de roca en bloques que cae al vacío, con la hierba que cuelga del canto
  b_rocaFacetas(B, P, 106, 179, (y) => ex(y) - 2, (y) => ex(y) + fw(y), 828, 7, 5, (y) => Math.max(0, (y - 150) / 40));
  for (let y = 106; y < 180; y++) { const e = ex(y); for (let x = e - 2; x <= e + fw(y); x++) hierba[y * 320 + x] = 0;
    b_ps(B, e - 2, y, P.hierba[1]);
    if (h(y, 0, 830) < 0.45) for (let j = 0; j < 4; j++) b_ps(B, e - 1 + j * 0.4, y + j, P.hierba[2 + (j === 0 ? 2 : j === 1 ? 1 : 0)]); }
  // raíces y matas que cuelgan de la pared
  for (let k = 0; k < 5; k++) { const y0 = 116 + k * 12, x0 = ex(y0) + 2 + Math.round(h(k, 1, 836) * fw(y0) * 0.6), L = 5 + Math.round(h(k, 2, 836) * 8);
    for (let j = 0; j < L; j++) b_ps(B, x0 + Math.round(Math.sin(j * 0.6 + k) * 1.2), y0 + j, j % 3 ? P.musgo[2] : P.hierba[4]); }
  // piedras sueltas y un arbolito torcido junto al filo; el árbol grande a la izquierda
  [[176, 120, 5, 3], [150, 168, 7, 4], [60, 112, 3, 2]].forEach(([px, py, rx, ry]) => { for (let j = -ry; j <= 0; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) { b_ps(B, px + i, py + j, P.roca[Math.max(0, Math.min(4, Math.floor(3 - i / rx - j / ry * 0.5 + b_um(px + i, py + j) * 0.5 - 1.5)))]); hierba[(py + j) * 320 + px + i] = 0; } });
  b_tronco(B, P, 2, 12, 40, 150, 831);
  b_copa(B, 6, 44, 22, P.bosque, 832, P.fruto); b_copa(B, 24, 64, 14, P.bosque, 833, P.frutoV);
  for (let y = 104; y < 122; y++) { const x = 186 + Math.round((y - 104) * 0.1); b_ps(B, x, y, P.corteza[3]); }
  b_copa(B, 184, 100, 6, P.bosque, 834); b_copa(B, 190, 106, 4, P.bosque, 835);
  const cielo = b_mascara(B, foto, 0, HOR + 12);
  b_recorta(vacio, B, fV);
  return { cielo, hierba, vacio };
}
// el acantilado de lado: el filo arriba a la izquierda, la pared de roca en bloques con repisas, matas, raíces, un nido y
// un hilo de cascada; a la derecha el vacío hondo con agujas de roca en la niebla y el bosque «pintado» al fondo
function b_acantFijo(R, g, P) {
  const B = R.buf, HOR = 132, sol = { dia: [196, 36], amanecer: [300, 112], tarde: [252, 92], noche: [200, 34] }[P.luz];
  b_cieloF(B, P, HOR + 4); b_astro(B, P, sol[0], sol[1]);
  const foto = B.slice();
  b_montana(B, P, [[230, 28, 46], [292, 40, 50], [176, 18, 34]], HOR, 840, 0.5, 0.3);
  // el bosque del otro lado: copas que se repiten iguales cada 36 px (el engaño, un decorado pintado)
  for (let k = 0; k < 24; k++) b_copa(B, 160 + Math.round(k * 7.2), HOR + 3, 3 + Math.round(h(k % 5, 2, 841) * 2), P.bosqueL, 850 + (k % 5), null, [P.cielo[7], 0.4]);
  const vacio = b_vacioHondo(B, P, HOR + 4, () => 0, [[290, 140, 10, 0.62], [214, 150, 7, 0.55], [256, 158, 9, 0.45], [316, 164, 7, 0.38]], 851);
  const fV = B.slice();
  // la pared de roca
  const xr = (y) => Math.round(g.borde + Math.sin(y * 0.21) * 3 - (y - g.suelo) * 0.18 + (h(y >> 2, 0, 842) - 0.5) * 4);
  b_rocaFacetas(B, P, g.suelo - 6, 179, () => 0, xr, 843, 15, 10, (y) => Math.max(0, (y - 156) / 34));
  // la sombra bajo el canto de hierba y el hilo de agua que rezuma de una grieta y cae (mojado, oscuro y brillante)
  for (let y = g.suelo + 1; y <= g.suelo + 4; y++) for (let x = 0; x <= xr(y); x++) b_pm(B, x, y, P.roca[0], 0.6 - (y - g.suelo - 1) * 0.13);
  for (let y = g.suelo + 3; y < 180; y++) for (let x = 70; x <= 83; x++) { const a = (1 - Math.abs(x - 76.5) / 7) * 0.6; if (b_um(x, y) < a * 1.5) b_pm(B, x, y, P.agua[0], a); }
  // la cima: una franja de hierba con flores y raíces que asoman por el filo
  const hierba = new Uint8Array(57600);
  for (let y = g.suelo - 8; y <= g.suelo; y++) for (let x = 0; x <= xr(y) + 1; x++) { const c = P.hierba[Math.max(0, Math.min(6, Math.floor(3.8 - (y - g.suelo + 8) * 0.25 + (h(x, y, 846) - 0.5) * 1.6 + b_um(x, y) * 0.6)))]; b_ps(B, x, y, c); hierba[y * 320 + x] = 1; }
  for (let x = 0; x <= g.borde; x++) if (h(x, 0, 853) < 0.5) { const L = 1 + Math.floor(h(x, 1, 853) * 3); for (let j = 1; j <= L; j++) b_ps(B, x, g.suelo + j, P.hierba[j === 1 ? 2 : 1]); }
  for (let k = 0; k < 6; k++) { const x0 = g.borde - 4 + k * 2, L = 6 + k * 3; for (let j = 0; j < L; j++) b_ps(B, x0 + Math.round(Math.sin(j * 0.5 + k) * 1.5) + 2, g.suelo + 1 + j, P.corteza[3]); }
  // raíces y lianas que cuelgan de la cima por la pared
  for (const [x0, L] of [[22, 16], [48, 9], [104, 20], [134, 11], [152, 24]]) for (let j = 0; j < L; j++) { const x = x0 + Math.round(Math.sin(j * 0.45 + x0) * 1.6); b_ps(B, x, g.suelo + 2 + j, j % 4 === 3 ? P.hierba[4] : P.musgo[2]); if (j % 5 === 2) b_ps(B, x + 1, g.suelo + 2 + j, P.hierba[3]); }
  // las repisas: canto de luz, sombra debajo, matas, flores y piedras sueltas
  [[60, 136, 7], [110, 148, 8], [30, 160, 6], [150, 128, 5], [128, 166, 6]].forEach(([x, y, w], k) => {
    for (let i = -w; i <= w; i++) { b_ps(B, x + i, y, P.roca[4]); b_ps(B, x + i, y + 1, P.roca[0]); b_pm(B, x + i, y + 2, P.roca[0], 0.5); }
    for (let i = -w + 1; i <= w - 1; i += 2) { b_ps(B, x + i, y - 1, P.hierba[3]); b_ps(B, x + i + 1, y - 2, P.hierba[4]); if (h(i, k, 854) < 0.4) b_ps(B, x + i, y - 3, P.hierba[5]); }
    b_flor(R, x + 2, y - 3, 1, P.flores[k % 6], P.amarillo[2]); b_flor(R, x - 3, y - 2, 1, P.flores[(k + 2) % 6], P.amarillo[2]);
    b_ps(B, x + w - 1, y - 1, P.roca[3]); b_ps(B, x + w - 2, y - 1, P.roca[2]); });
  // el nido en la repisa de la derecha (ramitas tejidas)
  for (let i = -4; i <= 4; i++) for (let j = 0; j <= 2; j++) if (Math.abs(i) < 4 - j + 1) b_ps(B, 150 + i, 125 + j, (i + j) % 2 ? P.corteza[4] : P.corteza[2]);
  // un pino joven en la cima, a la izquierda
  b_pino(B, 14, g.suelo - 2, 46, P.bosque, 847);
  const cielo = b_mascara(B, foto, 0, HOR + 4);
  b_recorta(vacio, B, fV);
  return { cielo, hierba, vacio };
}
// el campo de fuerza: hexágonos que ondulan desde el punto de toque (o el del choque de o.rebote), solo desde campo[0]
function b_campo(B, t, o, g, P) {
  let f = b_lim(o.campo ?? 0) * (0.85 + 0.15 * Math.sin(t * 2.2)), [cx, cy] = o.toque || g.toque, ola = 0;
  if (o.rebote) { const r = b_rebote(o.rebote, g), s = t - r.ti; if (s >= 0 && s < 1.6) { const fi = (1 - s / 1.6) ** 0.7; if (fi > f) { f = fi; cx = r.xi; cy = r.yi; ola = s; } } }
  if (f <= 0) return;
  if (!o.toque && !ola && !(o.rebote && t >= b_rebote(o.rebote, g).ti)) {   // sin toque: el muro entero respira, un velo de hexágonos a lo largo del filo
    const x0 = g.campo[0], C = P.brillo.campo, S = 5.2;
    for (let y = 24; y < 180; y++) for (let x = x0; x < Math.min(320, x0 + 46); x++) { const u = (x - x0) / 46, onda = 0.5 + 0.5 * Math.sin(y * 0.09 - t * 2.4 + u * 3), a = f * (1 - u) ** 1.3 * (0.35 + 0.65 * onda) * Math.min(1, (y - 24) / 30);
      const q = (x * 0.57735 - y / 3) / S, r = (2 * y / 3) / S, s3 = -q - r; let rq = Math.round(q), rr = Math.round(r), rs = Math.round(s3);
      const dq = Math.abs(rq - q), dr = Math.abs(rr - r), ds = Math.abs(rs - s3); if (dq > dr && dq > ds) rq = -rr - rs; else if (dr > ds) rr = -rq - rs; else rs = -rq - rr;
      const borde = Math.max(Math.abs(q - rq), Math.abs(r - rr), Math.abs(s3 - rs)) * 2;
      if (borde > 0.8 ? b_um(x, y) < a * 2 : (x - x0 < 2 && b_um(x, y) < a * 1.5)) B[y * 320 + x] = b_mez(B[y * 320 + x], C[a > 0.4 ? 2 : 1], 0.45 + a * 0.5); }
    return; }
  const x0 = g.campo[0], RR = 22 + f * 70 + ola * 30, S = 5.2, C = P.brillo.campo;
  for (let y = Math.max(0, Math.floor(cy - RR)); y <= Math.min(179, Math.ceil(cy + RR)); y++) for (let x = Math.max(x0, Math.floor(cx - RR * 0.8)); x <= Math.min(319, Math.ceil(cx + RR * 0.8)); x++) {
    const d = Math.hypot((x - cx) * 1.25, y - cy); if (d > RR) continue;
    const q = (x * 0.57735 - y / 3) / S, r = (2 * y / 3) / S, s3 = -q - r; let rq = Math.round(q), rr = Math.round(r), rs = Math.round(s3);
    const dq = Math.abs(rq - q), dr = Math.abs(rr - r), ds = Math.abs(rs - s3); if (dq > dr && dq > ds) rq = -rr - rs; else if (dr > ds) rr = -rq - rs; else rs = -rq - rr;
    const borde = Math.max(Math.abs(q - rq), Math.abs(r - rr), Math.abs(s3 - rs)) * 2, onda = 0.5 + 0.5 * Math.sin(d * 0.32 - t * 7);
    const a = f * (1 - d / RR) ** 0.8 * (0.35 + 0.65 * onda) * (x - x0 < 4 ? (x - x0) / 4 : 1);
    if (borde > 0.8) { if (b_um(x, y) < a * 2) B[y * 320 + x] = b_mez(B[y * 320 + x], C[a > 0.45 ? 2 : 1], 0.45 + a * 0.5); }
    else if (h(rq, rr, 860) < 0.3 * onda && b_um(x, y) < a * 0.5) B[y * 320 + x] = b_mez(B[y * 320 + x], C[0], 0.3); }
  if (ola > 0 && ola < 0.25) { const k = 1 - ola / 0.25; for (let i = -4; i <= 4; i++) { b_pm(B, cx, cy + i, C[2], k); b_pm(B, cx + i * 0.5, cy, C[2], k); } }
}

// lo que se mueve en el borde: nubes, pájaros, la niebla que sube y se desliza, la hierba y las flores, piedrecitas
// que caen por el filo, el campo de fuerza
function b_bordeVivo(R, B, t, o, g, P, F) {
  const gen = g.camara === 'general', hor = gen ? 100 : 132;
  b_nubes(B, F.cielo, t, hor, P.nube, 6);
  if (P.luz !== 'noche') b_pajaros(R, t, gen ? 40 : 50, [P.brillo.cian, P.brillo.amarillo, P.brillo.rosa], 3, 7, 22);
  b_brisa(B, F.hierba, t, gen ? 106 : g.suelo - 8, 179, P.hierba[6], 1);
  // la niebla del vacío: velos que se deslizan despacio (solo donde la capa fija dice vacío)
  const V = F.vacio, yN = gen ? 110 : 128;
  for (let y = yN; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!V[i]) continue; const w = Math.sin(x * 0.035 - t * 0.5 + y * 0.18) + Math.sin(x * 0.012 + t * 0.25 + y * 0.07) * 0.8; if (w < 0.7) continue; if (b_um(x + Math.floor(t * 2), y) < (w - 0.7) * 0.8) B[i] = b_mez(B[i], P.niebla[3], 0.5); }
  // vencejos que planean por debajo del filo, en el vacío (dan la altura)
  if (P.luz !== 'noche') for (let k = 0; k < 3; k++) { const x = Math.round(340 - ((t * (9 + k * 3) + h(k, 1, 872) * 200) % 160)), y = Math.round((gen ? 132 : 146) + k * 9 + Math.sin(t * 0.9 + k * 2) * 3), a = Math.sin(t * 7 + k) > 0.3 ? 1 : 0, c = P.roca[1];
    for (const [dx, dy] of [[0, 0], [-1, -a], [1, -a], [-2, -1 - a], [2, -1 - a]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && xx < 320 && yy >= 0 && yy < 180 && V[yy * 320 + xx]) B[yy * 320 + xx] = c; } }
  if (!gen) {
    // el hilo de agua que cae por la pared, con su brillo que baja y la espuma abajo
    for (let y = g.suelo + 3; y < 180; y++) { const an = Math.min(2, (y - g.suelo - 3) / 14), x0 = Math.round(76 - an + Math.sin(y * 0.3) * 0.4), x1 = Math.round(76 + an + 1);
      for (let x = x0; x <= x1; x++) { const f = ((y * 2 - t * 80 + x * 5) % 9 + 9) % 9; R.pset(x, y, x === x0 ? P.agua[2] : f < 1.4 ? P.agua[5] : f < 4 ? P.agua[4] : P.agua[3]); } }
    for (let k = 0; k < 14; k++) { const a = h(k, Math.floor(t * 8), 873), b = h(k, 2, Math.floor(t * 8)); R.pset(76 + Math.round((a - 0.5) * 14 * b), 179 - Math.round(b * 7), k % 3 ? P.niebla[3] : P.agua[5]); }
    // el pájaro del nido: asoma, mira y se agacha
    { const ve = Math.sin(t * 0.7) > -0.3, cy = 123 - (ve ? 1 : 0); if (ve) { R.pset(150, cy, P.brillo.cian[1]); R.pset(151, cy, P.brillo.cian[2]); R.pset(149, cy + 1, P.brillo.cian[1]); R.pset(152, cy, P.brillo.amarillo[2]); R.pset(151, cy - 1, hex('#1a1020')); } }
  }
  if (gen) b_floresPinta(R, t, b_floresDe('borde|g', 60, { y0: 116, y1: 179, x0: -4, x1: 196, t0: 1, t1: 3.2, a0: 2, a1: 8 }, (x, y, k) => x > 190 + (y - 108) * 0.2 - 8 || (x > 30 && x < 180 && y > 136 && y < 166 && k % 4), 870), P);
  else b_floresPinta(R, t, b_floresDe('borde|a', 26, { y0: g.suelo - 6, y1: g.suelo, x0: 0, x1: g.borde - 6, t0: 1, t1: 2, a0: 2, a1: 4 }, (x, y, k) => x > 20 && x < 150 && k % 2, 871), P);
  // una piedrecita que se suelta del filo y cae a la niebla
  { const per = 7, u = (t % per) / per, x0 = gen ? 204 : g.borde, y0 = gen ? 118 : g.suelo; if (u < 0.5) { const s = u * per, x = x0 + s * 6, y = y0 + s * s * 40; if (y < 179) { R.pset(Math.round(x), Math.round(y), P.roca[3]); R.pset(Math.round(x) + 1, Math.round(y), P.roca[1]); } } }
  b_campo(B, t, o, g, P);
}
// por delante en el borde: matas en el primer plano (bajas en la franja de los personajes) y jirones de niebla abajo
function b_bordeDelante(R, B, t, o, g, P) {
  const [l0, l1] = g.libre, yb = g.camara === 'general' ? 180 : g.suelo + 2;
  for (let k = 0; k < 34; k++) { const x = Math.round(h(k, 1, 880) * (g.camara === 'general' ? 230 : g.borde + 4) - 4), dentro = x > l0 && x < l1, al = dentro ? 2 + h(k, 2, 880) * 3 : 6 + h(k, 2, 880) * 10, s = b_racha(x, yb, t) * al * 0.18;
    R.linea(x, yb, x + s, yb - al, P.hierba[1 + (k % 3)]); if (!dentro && k % 4 === 0) b_flor(R, x + s, yb - al, 2, P.flores[k % 6], P.amarillo[2]); }
  for (let k = 0; k < 4; k++) { const x = ((h(k, 1, 881) * 300 + t * (5 + k * 2)) % 360) - 40 + (g.camara === 'general' ? 120 : 140), y = 168 + k * 3; for (let i = 0; i < 26; i++) { const xx = Math.round(x + i); if (xx < g.borde + 10 || xx > 319) continue; if (b_um(xx, y) < Math.sin(i / 26 * Math.PI) * 0.6) R.pset(xx, y, P.niebla[3]); } }
}

Object.assign(b_A50FIJO, {
  bosque: (R, g, P) => (g.camara === 'general' ? b_bosqueFijo(R, g, P) : b_ramaFijo(R, g, P)),
  deposito: (R, g, P) => (g.camara === 'general' ? b_depoFijo(R, g, P) : b_tuboFijo(R, g, P)),
  borde: (R, g, P) => (g.camara === 'general' ? b_bordeFijo(R, g, P) : b_acantFijo(R, g, P)),
});
Object.assign(b_A50VIVO, { bosque: b_bosqueVivo, deposito: b_depoVivo, borde: b_bordeVivo });
Object.assign(b_A50DELANTE, { bosque: b_bosqueDelante, deposito: b_depoDelante, borde: b_bordeDelante });

// la paleta propia del estudio y de la consulta
const c_P = pal({
  lad0: '#8e4a34', lad1: '#9c543a', lad2: '#82422e', lad3: '#a8603f', lad4: '#904e3a', ladJ: '#4e2c22', ladL: '#c47c58', ladS: '#5e2e22',
  nog: '#6a4026', nogS: '#4a2a18', nogL: '#8e5a34', nogD: '#2e1a10', nogB: '#b07a44',
  roble: '#a8743e', robleS: '#7a5028', robleL: '#d0a060',
  techo: '#2a1a16', techoL: '#3a261e',
  pizarra: '#2c4a3a', pizarraS: '#223a2e', pizarraL: '#3c5c48', tiza: '#e8eee0', tizaS: '#9aaa9a',
  luz: '#ffd890', luzL: '#fff2c8', sombra: '#160c12',
  noche0: '#0c0e2a', noche1: '#141838', noche2: '#1c2048', noche3: '#282a58', noche4: '#3a3266', luna: '#f6f0d0', lunaS: '#d0c49c',
  tela: '#7a1e2a', telaS: '#4a1018', telaL: '#a8343e',
  alfR: '#8a2a26', alfA: '#26365a', alfO: '#c8923a', alfC: '#e2cc9a', alfS: '#4a1414',
  rosa: '#ee90a4', rosaS: '#b85a78', rosaL: '#ffc8d2', rosaD: '#8a3a58',
  arena: '#e8c070', arenaS: '#b8884a', arenaL: '#f8e0a0',
  laton: '#c8963a', latonS: '#8a6020', latonL: '#f2d27a',
  huevo: '#f2ece0', huevoS: '#c8bca8', mimbre: '#b8844a', mimbreS: '#7a5228', mimbreL: '#dcae6a',
  papel: '#a89a5a', papelS: '#8c7e46', papelL: '#c2b472', papelD: '#6e6236',
  cuero: '#6e2422', cueroS: '#441414', cueroL: '#9a4238',
  banq: '#2e7a4a', banqL: '#62c482', banqS: '#1a4a2e',
  metalV: '#7a8a7e', metalVS: '#55625a', metalVL: '#a8b6aa',
  sol: '#fff0c0', cielo: '#8ec4e8', cieloL: '#c4e2f4', cieloS: '#6aa6d6',
  maq: '#4e6058', maqS: '#2e3a36', maqL: '#7a9086', crema: '#f2e8d0', cremaS: '#cfc2a2',
  verdeP: '#a8b89a', verdePS: '#88987a',
});

const c_CACHE = new WeakMap();

// un fondo fijo pintado una vez en un búfer (por clave) y copiado en cada fotograma
function c_fondoFijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla de dos colores (k 0–1 hacia b)
function c_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe el píxel que ya hay hacia col
function c_tinte(R, x, y, col, k) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y); if (c) R.pset(x, y, c_mezcla(c, col, k)); }

// tramado ordenado 4 × 4
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_b4 = (x, y) => c_B4[((y & 3) << 2) | (x & 3)];

// la luz de la habitación horneada en el fondo: cada píxel se apaga hacia lo que no recibe luz y se calienta cerca de
// las fuentes ([[x, y, radio, fuerza]]); osc: cuánto se apaga como mucho
function c_iluminar(R, fuentes, osc, calido) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let L = 0; for (const [fx, fy, r, f] of fuentes) { const d = 1 - Math.hypot(x - fx, (y - fy) * 1.15) / r; if (d > 0) L += d * f; }
    L = Math.min(1, L); const c = R.pget(x, y), q = osc * (1 - L) + (c_b4(x, y) - 0.5) * 0.06;
    let n = q > 0.02 ? c_mezcla(c, c_P.sombra, q) : c; if (L > 0.55) n = c_mezcla(n, calido, (L - 0.55) * 0.4);
    R.pset(x, y, n);
  }
}

// un resplandor que se suma a lo pintado (círculo tramado que tiñe hacia col; a: fuerza en el centro)
function c_resplandor(R, cx, cy, r, col, a, ry = 1) {
  for (let y = Math.floor(cy - r * ry); y <= cy + r * ry; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot(x - cx, (y - cy) / ry) / r; if (d >= 1) continue; const k = (1 - d) * (1 - d) * a; if (k > c_b4(x, y) * 0.12) c_tinte(R, x, y, col, k); }
}

// sombra blanda en el suelo (elipse que oscurece lo que hay)
function c_sombra(R, cx, cy, rx, ry, a = 0.45) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d < 1) c_tinte(R, cx + i, cy + j, c_P.sombra, a * (1 - d * 0.6)); }
}

// pared de ladrillo de 10 × 5 a matajunta: cada pieza con su tono, el canto de luz arriba, la sombra abajo y motas
function c_ladrillo(R, x0, y0, x1, y1, k = 0) {
  const P = c_P, T5 = [P.lad0, P.lad1, P.lad2, P.lad3, P.lad4];
  R.rect(x0, y0, x1, y1, P.ladJ);
  for (let f = Math.floor(y0 / 5); f * 5 <= y1; f++) { const y = f * 5, dx = (f & 1) ? 5 : 0;
    for (let x = Math.floor((x0 - dx) / 10) * 10 + dx; x <= x1; x += 10) {
      const xa = Math.max(x0, x + 1), xb = Math.min(x1, x + 9), ya = Math.max(y0, y + 1), yb = Math.min(y1, y + 4); if (xb < xa || yb < ya) continue;
      const c = T5[Math.floor(h(x, y, 700 + k) * 5)]; R.rect(xa, ya, xb, yb, c);
      if (ya === y + 1) R.rect(xa, ya, xb - 1, ya, c_mezcla(c, P.ladL, 0.45));
      if (yb === y + 4) R.rect(xa + 1, yb, xb, yb, c_mezcla(c, P.ladS, 0.5));
      for (let i = 0; i < 4; i++) { const px = xa + Math.floor(h(x, y, 710 + i) * (xb - xa + 1)), py = ya + Math.floor(h(y, x, 720 + i) * (yb - ya + 1)); R.pset(px, py, i & 1 ? c_mezcla(c, P.ladS, 0.55) : c_mezcla(c, P.ladL, 0.35)); }
      if (h(x, y, 730 + k) < 0.06) R.rect(xa + 2, ya + 1, xa + 4, ya + 2, c_mezcla(c, P.ladJ, 0.5));   // un ladrillo desconchado
    } }
}

// suelo de tablas en perspectiva (punto de fuga vx, vy): tablas de distinto tono, juntas, testas, vetas y canto de luz
function c_tarima(R, y0, y1, vx, vy, ancho, [c0, c1, c2, cJ, cL], k = 0) {
  for (let y = y0; y <= y1; y++) { const s = y - vy, z = 900 / s, zA = 900 / (s - 1);
    for (let x = 0; x < 320; x++) { const u = (x - vx) * 40 / s / ancho, p = Math.floor(u), f = u - p, un = Math.floor((x + 1 - vx) * 40 / s / ancho);
      const o2 = h(p, 3, 900 + k) * 4, seg = Math.floor(z * 1.1 + o2), segA = Math.floor(zA * 1.1 + o2);
      let c = [c0, c1, c2][Math.floor(h(p, seg, 901 + k) * 3)];
      if (un !== p || seg !== segA) c = cJ;
      else if (h(p * 13 + Math.floor(f * 6), Math.floor(z * 2.5), 902 + k) < 0.2) c = c_mezcla(c, cJ, 0.3);
      else if (f < 0.1) c = c_mezcla(c, cL, 0.35);
      R.pset(x, y, c);
    } }
}

// alfombra en perspectiva (trapecio: borde de atrás en yb de xbl a xbr, borde de delante en yf de xfl a xfr): orla con
// greca, filete claro, campo con rombos concéntricos y medallón, desgaste y flecos delante
function c_alfombra(R, yb, yf, xbl, xbr, xfl, xfr, k = 0) {
  const P = c_P;
  for (let y = yb; y <= yf; y++) { const v = (y - yb) / (yf - yb), xl = lerp(xbl, xfl, v), xr = lerp(xbr, xfr, v), sx = (xr - xl) / (xbr - xbl);
    for (let x = Math.round(xl); x <= Math.round(xr); x++) { const u = (x - xl) / (xr - xl), bu = Math.min(x - xl, xr - x) / sx, bv = Math.min(y - yb, yf - y) / (0.7 + v * 0.6);
      let c;
      if (bu < 1.2 || bv < 1) c = P.alfS;
      else if (bu < 7 || bv < 4) c = ((Math.floor(u * 60) + Math.floor(v * 12)) & 1) ? P.alfO : P.alfA;
      else if (bu < 9 || bv < 5) c = P.alfC;
      else { const du = Math.abs(u - 0.5) * 2, dv = Math.abs(v - 0.5) * 2, m = du * 1.15 + dv;
        c = m < 0.22 ? (m < 0.1 ? P.alfC : P.alfO) : [P.alfR, P.alfA, P.alfR, P.alfO, P.alfR, P.alfA, P.alfR][Math.min(6, Math.floor(m * 3.2))];
        if (((Math.floor(u * 40) + Math.floor(v * 10)) % 5 === 0) && m > 0.3) c = P.alfC; }
      if (h(x, y, 940 + k) < 0.07) c = c_mezcla(c, P.alfC, 0.25);
      R.pset(x, y, c); } }
  for (let x = xfl; x <= xfr; x += 2) R.linea(x, yf + 1, x + (x < (xfl + xfr) / 2 ? -1 : 1), yf + 3, P.alfC);
}

// tablero de madera visto de frente (tablas horizontales): juntas, vetas claras y oscuras, algún nudo y el canto de luz
function c_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0 + 3, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 310 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 311 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 312 + k) * 34); if (h(x, g, 313 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 314 + k) * 12); } }
    if (h(f, 9, 315 + k) < 0.55 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 316 + k) * (x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; rect(nx - 4, ny, nx + 4, ny, cS); rect(nx - 2, ny - 1, nx + 2, ny + 1, cS); rect(nx - 1, ny, nx + 1, ny, cD); }
  }
  rect(x0, y0, x1, y0, cL);
}

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda, sombra abajo y a la derecha, y dos vetas
function c_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// un reloj de pared redondo: aro, esfera con marcas, agujas (h0: la hora al empezar) y el segundero rojo a saltos
function c_reloj(R, cx, cy, r, t, h0, aro) {
  const { disco, pset, linea } = R, K = C.k;
  disco(cx, cy, r + 1, K); disco(cx, cy, r, aro); disco(cx - 1, cy - 1, r - 1, (x, y, d) => (d > 0.8 ? C.oroL : aro)); disco(cx, cy, r - 1, aro);
  disco(cx, cy, r - 2, K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - r * 0.6 ? C.blanco : hex('#ece6da')));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 5; pset(Math.round(cx + Math.cos(a) * q), Math.round(cy + Math.sin(a) * q), k % 3 ? C.grisS : K); }
  const hora = h0 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * (r * 0.42)), Math.round(cy + Math.sin(ah) * (r * 0.42)), K);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 5)), Math.round(cy + Math.sin(am) * (r - 5)), K);
  linea(cx, cy, Math.round(cx + Math.cos(as) * (r - 4)), Math.round(cy + Math.sin(as) * (r - 4)), C.rojo);
  pset(cx, cy, C.oro);
}

// una nube de tres tonos (c: [sombra de abajo, cuerpo, luz, filo]); la recorta R.recorte
function c_nube(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[0] : !den(x, y - 1) ? c[3] : !den(x, y - 2) ? c[2] : c[1]);
}

// vapor que sube de una taza (x, y: la boca), en bocanadas que crecen, se deshacen por el borde y se las lleva el aire
function c_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1.2 + u * 3, cx = x + u * alto * 0.35 + Math.sin(u * 6 + k + t * 0.9) * 1.6, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (c_b4(xx, yy) < (1.05 - u) * (1.2 - d) * 0.8) c_tinte(R, xx, yy, col, 0.55); } }
}

// motas de polvo que flotan dentro de una zona (dentro(x, y) dice si se ven)
function c_motas(R, t, x0, x1, y0, y1, n, c, k = 0, dentro = null) {
  const md = (v, m) => ((v % m) + m) % m;
  for (let i = 0; i < n; i++) { const x = Math.round(x0 + md(h(i, k, 130) * (x1 - x0) + Math.sin(t * 0.7 + i) * 4 + t * 2.2, x1 - x0)), y = Math.round(y1 - md(h(i, k, 131) * (y1 - y0) + t * (2 + h(i, k, 132) * 3), y1 - y0));
    if (Math.sin(t * 1.7 + i * 2.1) > -0.4 && (!dentro || dentro(x, y))) R.pset(x, y, c); }
}

// ENTREGA: suelo 160 (pies), libre x 56–300 (delante de la estantería, la pizarra y la mesa); puerta x 8–40 × y 70–127
// (pomo en 36, 100); mapa 6–40 × 30–56; estantería x 46–102 × 31–127 (globo en 89, 78); pizarra (hueco) 114–202 × 30–92;
// ventana (cristal) 222–262 × 28–86 (gato en el alféizar, 224–246 × 80–90; radiador 222–262 × 97–112); mesa: tablero de
// y 130 (canto de atrás) a 137 (canto de delante), x 164–296, patas hasta y 153; los objetos se apoyan en y 134 (cerebro
// 180, reloj de arena 199, cesta 216, lupa 264); hueco libre sobre la mesa x 228–262; lámpara: base (281, 135), pantalla
// 270–292 × 105–116; monstera x 290–319 × 70–127 (detrás de la mesa); reloj (300, 58)
function c_estudioGeneral(R, t, o) {
  const P = c_P, sin = o.sin || [], luz = o.lampara ?? 1;
  c_fondoFijo(R, 'C_estudio', () => c_estudioFondo(R));
  c_ventanaNoche(R, t, 222, 28, 262, 86, [0.68, 0.2]);
  c_marcoVentana(R, 222, 28, 262, 86);
  c_cortina(R, 206, 223, 21, 98, t, 1); c_cortina(R, 261, 277, 21, 98, t, -1);
  if (o.gato !== false) c_gato(R, 236, 90, t);
  c_globo(R, 89, 78, 6, t);
  c_rayaPuerta(R, 9, 39, 127, t);
  c_reloj(R, 300, 58, 8, t, 11.2, P.laton);
  if (o.pizarra) { const r = [114, 30, 202, 92]; R.recorte(r); o.pizarra(R, t, r); R.recorte(null); }
  c_monstera(R, 307, 127, t, 1);
  c_raton(R, t);
  if (!o.mesaDelante) { c_mesaGrande(R); c_objetosMesa(R, t, sin, o.arena, luz, 1); }
  c_polilla(R, t, 281, 110, 17, 7, 2);
  return { encuadre: 'estudio', camara: 'general', suelo: 160, libre: [56, 300], pizarra: [114, 30, 202, 92], mesa: [228, 112, 262, 134], tablero: 134, detras: 142, detrasAtom: 137, puerta: [8, 70, 40, 127], pomo: [36, 100], ventana: [222, 28, 262, 86], estanteria: [46, 31, 102, 127], lampara: [281, 110] };
}
function c_estudioFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = c_P, K = C.k;
  // el techo de vigas con sus juntas y la moldura
  rect(0, 0, 319, 9, P.techo); for (let y = 0; y < 9; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 801) < 0.18 && (x & 1)) pset(x, y, P.techoL);
  for (const x of [30, 110, 190, 270]) { rect(x, 0, x + 5, 9, P.nogS); rect(x, 0, x, 9, P.nogL); rect(x + 5, 0, x + 5, 9, P.nogD); }
  rect(0, 9, 319, 12, P.nogS); rect(0, 9, 319, 9, P.nogB); rect(0, 10, 319, 10, P.nogL); rect(0, 12, 319, 12, P.nogD);
  // la pared de ladrillo y el zócalo
  c_ladrillo(R, 0, 13, 319, 121);
  rect(0, 13, 319, 13, P.ladS);
  rect(0, 121, 319, 127, P.nog); rect(0, 121, 319, 121, P.nogB); rect(0, 122, 319, 122, P.nogL); rect(0, 127, 319, 127, P.nogD); for (let x = 0; x < 320; x += 2) if (h(x, 1, 803) < 0.3) pset(x, 125, P.nogS);
  // el suelo de tablas y la alfombra
  c_tarima(R, 128, 179, 160, 40, 6, [hex('#7a4a2a'), hex('#865430'), hex('#704226'), hex('#3a2212'), hex('#b07a44')]);
  c_alfombra(R, 140, 174, 56, 250, 30, 278);
  // la puerta de cuarterones con su marco, el abrigo y la bufanda colgados y el pomo
  rect(4, 66, 44, 127, P.nogS); rect(4, 66, 44, 66, P.nogB); rect(4, 66, 4, 127, P.nogL); rect(44, 66, 44, 127, P.nogD); rect(3, 64, 45, 66, P.nogL); rect(3, 64, 45, 64, P.nogB);
  rect(8, 70, 40, 126, P.nog);
  c_cuarteron(R, 11, 73, 23, 95, P.nog, P.nogL, P.nogD, P.nogS, 1); c_cuarteron(R, 25, 73, 37, 95, P.nog, P.nogL, P.nogD, P.nogS, 2);
  c_cuarteron(R, 11, 99, 23, 123, P.nog, P.nogL, P.nogD, P.nogS, 3); c_cuarteron(R, 25, 99, 37, 123, P.nog, P.nogL, P.nogD, P.nogS, 4);
  rect(8, 70, 8, 126, P.nogL); rect(40, 70, 40, 126, P.nogD);
  disco(36, 100, 2, K); disco(36, 100, 1.5, P.laton); pset(35, 99, P.latonL); rect(35, 103, 37, 106, P.latonS); pset(36, 104, K);   // pomo y bocallave
  rect(15, 74, 17, 75, P.laton);   // la percha
  poligono([[12, 76], [20, 76], [23, 104], [9, 104]], K); poligono([[13, 77], [19, 77], [22, 103], [10, 103]], hex('#8a6a48'));   // el abrigo de paño, con su cuello, botones y bolsillo
  linea(11, 103, 13, 78, hex('#b08a60')); linea(19, 78, 21, 102, hex('#5e4630')); rect(16, 80, 16, 102, hex('#5e4630')); for (const y of [84, 90, 96]) pset(15, y, P.latonS);
  poligono([[13, 77], [16, 77], [16, 83]], hex('#5e4630')); poligono([[16, 77], [19, 77], [16, 83]], hex('#6e5438')); rect(11, 94, 14, 95, hex('#5e4630'));
  for (let y = 77; y < 92; y++) { const c = (y >> 1) & 1 ? hex('#c83a3a') : hex('#8e2424'); pset(19, y, c); pset(20, y, c); } for (let x = 19; x <= 20; x++) { pset(x, 92, hex('#e8d8b0')); pset(x, 93, hex('#e8d8b0')); }   // la bufanda
  // un mapa antiguo enmarcado sobre la puerta (costas, una rosa de los vientos y un barquito; sin letras)
  rect(6, 30, 40, 56, K); rect(7, 31, 39, 55, P.roble); rect(7, 31, 39, 31, P.robleL); rect(39, 31, 39, 55, P.robleS); rect(9, 33, 37, 53, hex('#e2cc9a'));
  for (let y = 33; y <= 53; y++) for (let x = 9; x <= 37; x++) { const tierra = Math.sin(x * 0.25 + 1) * 4 + Math.cos(y * 0.3) * 3 + (x - 23) * 0.4 > 2; if (tierra) pset(x, y, h(x, y, 805) < 0.15 ? hex('#a8884a') : hex('#c8a86a')); else if ((x + y * 2) % 7 === 0) pset(x, y, hex('#b8a478')); }
  for (let x = 9; x <= 37; x++) for (let y = 34; y <= 52; y++) if (R.pget(x, y) !== R.pget(x + 1, y) && R.pget(x + 1, y) === hex('#c8a86a')) pset(x, y, hex('#6a4a2a'));
  disco(15, 47, 3, hex('#8a6a3a')); linea(15, 43, 15, 51, hex('#5a3a1a')); linea(11, 47, 19, 47, hex('#5a3a1a')); pset(15, 43, C.rojo);
  rect(28, 38, 32, 39, hex('#6a4a2a')); pset(30, 36, C.blanco); pset(30, 37, C.blanco); for (let i = 0; i < 8; i++) pset(20 + i, 40 + (i & 1), hex('#8a6a4a'));
  c_tinte(R, 10, 34, C.blanco, 0.4); c_tinte(R, 11, 35, C.blanco, 0.4); c_tinte(R, 12, 36, C.blanco, 0.4);
  // la estantería llena
  c_estanteria(R, 46, 31, 102, 127);
  // la pizarra con su marco de roble, restos de borrador y la repisa con tizas y borrador
  rect(108, 24, 208, 98, K); rect(109, 25, 207, 97, P.roble); rect(109, 25, 207, 25, P.robleL); rect(109, 25, 109, 97, P.robleL); rect(207, 25, 207, 97, P.robleS); rect(109, 97, 207, 97, P.robleS);
  for (let x = 112; x < 206; x += 9) pset(x, 27, P.robleS); for (let y = 30; y < 95; y += 7) pset(111, y, P.robleS);
  rect(113, 29, 203, 93, K);
  for (let y = 30; y <= 92; y++) for (let x = 114; x <= 202; x++) { let c = h(x, y, 810) < 0.1 ? P.pizarraS : P.pizarra;
    const sw = Math.sin(x * 0.09 + Math.sin(y * 0.21) * 1.6 + y * 0.03); if (Math.abs(sw - 0.6) < 0.12 && h(x >> 1, y, 811) < 0.55) c = P.pizarraL;   // las pasadas del borrador
    if (y < 32 || x < 116) c = c_mezcla(c, K, 0.25); pset(x, y, c); }
  for (const [x, y] of [[118, 86], [121, 88], [196, 34], [192, 36], [198, 37]]) pset(x, y, P.tizaS);
  linea(186, 88, 199, 88, P.tizaS); for (let i = 0; i < 4; i++) linea(119 + i * 3, 34, 119 + i * 3, 39, P.tizaS); linea(117, 38, 130, 35, P.tizaS);   // un palote olvidado
  rect(106, 98, 210, 101, K); rect(107, 98, 209, 99, P.roble); rect(107, 98, 209, 98, P.robleL); rect(107, 100, 209, 100, P.robleS);
  for (const [x, c] of [[124, P.tiza], [130, hex('#f0d860')], [134, P.tiza], [190, hex('#f0a0b8')]]) { rect(x, 96, x + 4, 97, K); rect(x, 96, x + 3, 96, c); }
  rect(156, 94, 170, 97, K); rect(157, 94, 169, 95, P.robleS); rect(157, 96, 169, 97, hex('#7a7a80')); rect(157, 94, 169, 94, P.robleL);   // el borrador
  // la ventana: el marco, el alféizar y el radiador debajo; la barra de la cortina
  rect(216, 22, 268, 91, P.nogS); rect(216, 22, 268, 22, P.nogB); rect(216, 22, 216, 91, P.nogL); rect(268, 22, 268, 91, P.nogD);
  rect(212, 90, 272, 94, P.nog); rect(212, 90, 272, 90, P.nogB); rect(212, 94, 272, 94, P.nogD);
  rect(222, 97, 262, 112, K); for (let x = 223; x <= 261; x += 3) { rect(x, 98, x + 1, 111, hex('#c8c0b0')); pset(x, 98, C.blanco); rect(x + 1, 98, x + 1, 111, hex('#9a9282')); }
  rect(222, 104, 262, 104, hex('#8a8272')); rect(262, 106, 266, 107, P.latonS);
  rect(204, 19, 275, 20, P.latonS); rect(204, 19, 275, 19, P.latonL); disco(203, 19, 2, P.laton); disco(276, 19, 1.6, P.laton);
  // el clavo y la sombra del reloj, la sombra de la monstera en la pared
  c_sombra(R, 302, 62, 9, 8, 0.25);
  // la sombra de la mesa grande en el suelo (la mesa la pinta c_mesaGrande en cada fotograma)
  c_sombra(R, 230, 154, 74, 5, 0.42);
  // la pila de libros al pie de la estantería y la papelera con las bolas de papel
  c_librosSuelo(R, 104, 135);
  c_papelera(R, 306, 172);
  // la luz de la lámpara de la mesa y la de la habitación
  c_iluminar(R, [[281, 112, 210, 1.05], [160, 70, 230, 0.45]], 0.42, P.luz);
}
// la estantería: marco de nogal, fondo oscuro, baldas, libros de lomos sin letras (con bandas doradas), libros tumbados y
// apoyados, y cosas: un barco en una botella, una lechuza de barro, un jarrón; el hueco del globo (x 80–98, y 66–84) lo
// pinta c_globo en cada fotograma
function c_estanteria(R, x0, y0, x1, y1) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k;
  const LIB = ['#7a2a2a', '#2a4a6a', '#3a5a3a', '#8a6a2a', '#5a3a5a', '#a85a3a', '#2a3a4a', '#6a6a5a', '#c8a060', '#4a2a1a', '#3a6a6a', '#9a3a4a'].map(hex);
  rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1, P.nogS); rect(x0 + 1, y0 + 1, x0 + 1, y1, P.nogL);
  rect(x0 + 4, y0 + 4, x1 - 4, y1 - 3, hex('#24140c')); for (let x = x0 + 12; x < x1 - 4; x += 10) rect(x, y0 + 4, x, y1 - 3, hex('#1a0e08'));
  rect(x0 - 1, y0 - 2, x1 + 1, y0 + 1, P.nog); rect(x0 - 1, y0 - 2, x1 + 1, y0 - 2, P.nogB);
  // encima: un jarrón y libros tumbados
  rect(x0 + 6, y0 - 7, x0 + 22, y0 - 3, K); rect(x0 + 7, y0 - 6, x0 + 21, y0 - 5, LIB[1]); rect(x0 + 7, y0 - 4, x0 + 21, y0 - 3, LIB[0]); rect(x0 + 7, y0 - 6, x0 + 21, y0 - 6, hex('#5a7aa0'));
  rect(x1 - 14, y0 - 9, x1 - 8, y0 - 3, K); rect(x1 - 13, y0 - 8, x1 - 9, y0 - 3, hex('#3a7a8a')); pset(x1 - 12, y0 - 7, hex('#8ad0da')); rect(x1 - 12, y0 - 10, x1 - 10, y0 - 9, K);
  const baldas = []; for (let y = y0 + 22; y < y1 - 2; y += 21) baldas.push(y); baldas.push(y1 - 3);
  let arriba = y0 + 4;
  baldas.forEach((yb, b) => {
    rect(x0 + 2, yb, x1 - 2, yb + 2, P.nog); rect(x0 + 2, yb, x1 - 2, yb, P.nogB); rect(x0 + 2, yb + 2, x1 - 2, yb + 2, P.nogD);
    const alto = yb - arriba - 1;
    let x = x0 + 5;
    while (x < x1 - 5) {
      const r = h(x, yb, 840);
      if (b === 2 && x >= 80 && x <= 98) { x = 99; continue; }   // el hueco del globo
      if (b === 0 && x > 74 && x < 80) { // el barco en la botella, tumbada
        rect(x, yb - 7, x + 16, yb - 1, K); rect(x + 1, yb - 6, x + 15, yb - 2, hex('#2a5a4a')); rect(x + 15, yb - 5, x + 18, yb - 3, P.robleS);
        rect(x + 4, yb - 3, x + 11, yb - 2, P.robleS); linea(x + 7, yb - 6, x + 7, yb - 3, P.crema); rect(x + 5, yb - 5, x + 9, yb - 4, P.crema); pset(x + 2, yb - 6, hex('#8ad0b0')); x += 20; continue; }
      if (b === 3 && x > 60 && x < 66) { // la lechuza de barro
        disco(x + 4, yb - 5, 4, K); disco(x + 4, yb - 5, 3, hex('#9a6a3a')); disco(x + 2, yb - 7, 1.4, P.crema); disco(x + 6, yb - 7, 1.4, P.crema); pset(x + 2, yb - 7, K); pset(x + 6, yb - 7, K); pset(x + 4, yb - 5, P.laton); x += 10; continue; }
      if (r < 0.12 && x < x1 - 14) { // un montón tumbado
        for (let i = 0; i < 3; i++) { const c = LIB[Math.floor(h(x, i, 841) * LIB.length)], w = 10 + Math.floor(h(x, i, 842) * 3); rect(x, yb - 3 - i * 3, x + w, yb - 1 - i * 3, K); rect(x + 1, yb - 2 - i * 3, x + w - 1, yb - 2 - i * 3, c); pset(x + w - 2, yb - 2 - i * 3, P.crema); }
        x += 14; continue; }
      const w = 2 + Math.floor(h(x, yb, 843) * 3), hh = Math.min(alto, 11 + Math.floor(h(x, yb, 844) * 7)), c = LIB[Math.floor(h(x, yb, 845) * LIB.length)];
      if (r > 0.93 && x < x1 - 10) { // uno apoyado
        for (let i = 0; i < hh; i++) { const xx = x + Math.round(i * 0.45); rect(xx, yb - 1 - i, xx + w, yb - 1 - i, i === hh - 1 ? K : c); pset(xx, yb - 1 - i, K); pset(xx + w, yb - 1 - i, K); } x += w + Math.round(hh * 0.45) + 2; continue; }
      rect(x, yb - hh, x + w, yb - 1, K); rect(x + 1, yb - hh + 1, x + w - 1, yb - 1, c);
      rect(x + 1, yb - hh + 1, x + 1, yb - 1, c_mezcla(c, C.blanco, 0.22));
      if (w > 2) { rect(x + 1, yb - hh + 3, x + w - 1, yb - hh + 3, C.oro); rect(x + 1, yb - 4, x + w - 1, yb - 4, C.oroS); if (h(x, yb, 846) < 0.5) rect(x + 1, yb - hh + 6, x + w - 1, yb - hh + 8, c_mezcla(c, P.crema, 0.55)); }
      x += w + 1;
    }
    arriba = yb + 3;
  });
}

// el globo terráqueo en su soporte de latón (en la estantería), que gira despacio: mares, continentes de ruido, luz de
// la lámpara por la derecha y el meridiano
function c_globo(R, cx, cy, r, t) {
  const { pset, rect, linea } = R, P = c_P, K = C.k;
  rect(cx - 5, cy + r + 3, cx + 5, cy + r + 4, K); rect(cx - 4, cy + r + 3, cx + 4, cy + r + 3, P.laton); rect(cx, cy + r + 1, cx, cy + r + 2, P.latonS);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue;
    const nx = i / (r + 0.5), ny = j / (r + 0.5), nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), lon = Math.atan2(nx, nz) + t * 0.35, lat = Math.asin(ny);
    const tierra = Math.sin(lon * 2 + Math.sin(lat * 3) * 1.2) + Math.sin(lon * 3.7 + lat * 2.1 + 1) * 0.6 + Math.cos(lat * 5) * 0.3 > 0.55;
    let c = tierra ? (Math.abs(lat) > 1.1 ? C.blanco : h(Math.floor(lon * 4), Math.floor(lat * 4), 850) < 0.5 ? hex('#6aa04a') : hex('#c8a85a')) : hex('#3a78b8');
    const l = nx * 0.6 - ny * 0.4 + nz * 0.5; c = l < 0.05 ? c_mezcla(c, K, 0.45) : l > 0.75 ? c_mezcla(c, C.blanco, 0.3) : c;
    pset(cx + i, cy + j, d2 > (r - 0.8) ** 2 ? K : c); }
  for (let a = -2.4; a <= 0.9; a += 0.08) pset(Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2)), P.laton);
  pset(cx + r + 1, cy + 1, P.latonS);
}

// el cielo de noche visto por una ventana (x0–x1 × y0–y1; luna en [u, v] del hueco): degradado tramado, estrellas que
// titilan, la luna con halo y mares, nubes de tres tonos a tres velocidades, tejados con chimeneas y ventanas que se
// encienden, un árbol que se mece y, de vez en cuando, un murciélago. Todo recortado al hueco
function c_ventanaNoche(R, t, x0, y0, x1, y1, luna = [0.7, 0.2]) {
  const { pset, disco, poligono } = R, P = c_P; R.recorte([x0, y0, x1, y1]);
  const rampa = [P.noche0, P.noche1, P.noche2, P.noche3, P.noche4];
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (y1 - y0); for (let x = x0; x <= x1; x++) pset(x, y, rampa[Math.min(4, Math.floor(v * 3.4 + c_b4(x, y) * 0.95))]); }
  for (let k = 0; k < 24; k++) { const sx = x0 + Math.floor(h(k, 1, 960) * (x1 - x0)), sy = y0 + Math.floor(h(k, 2, 960) * (y1 - y0) * 0.6), b = Math.sin(t * (1.5 + (k % 5) * 0.7) + k * 1.9);
    if (b > -0.3) pset(sx, sy, b > 0.6 ? P.luzL : hex('#7a7ab8')); if (b > 0.8 && k % 3 === 0) { pset(sx - 1, sy, hex('#5a5a98')); pset(sx + 1, sy, hex('#5a5a98')); pset(sx, sy - 1, hex('#5a5a98')); pset(sx, sy + 1, hex('#5a5a98')); } }
  const mx = Math.round(x0 + (x1 - x0) * luna[0]), my = Math.round(y0 + (y1 - y0) * luna[1]), mr = Math.max(4, Math.round((x1 - x0) / 9));
  R.halo(mx, my, mr * 3, [hex('#22265a'), hex('#2e3268'), hex('#40427a')], 1.05);
  disco(mx, my, mr, P.lunaS); disco(mx - 0.5, my - 0.5, mr - 0.6, P.luna);
  for (const [dx, dy, rr] of [[-0.3, -0.1, 0.28], [0.25, 0.3, 0.2], [0.1, -0.4, 0.15]]) disco(mx + dx * mr, my + dy * mr, Math.max(1, rr * mr), P.lunaS);
  const W = x1 - x0, span = W + 70;
  for (const [k, yy, w, v] of [[0, y0 + (y1 - y0) * 0.16, W * 0.6, 1.4], [1, y0 + (y1 - y0) * 0.36, W * 0.42, 2.6], [2, y0 + (y1 - y0) * 0.5, W * 0.75, 0.8]]) {
    const cx = x0 - 35 + ((h(k, 5, 961) * span + t * v) % span); c_nube(R, cx, yy, w, k + 7, [hex('#181c44'), hex('#262a58'), hex('#3c3e72'), hex('#8a86b8')]); }
  // el murciélago
  { const u = (t / 9) % 1; if (u < 0.35) { const bx = Math.round(x0 - 4 + u / 0.35 * (W + 8)), by = Math.round(y0 + (y1 - y0) * 0.42 + Math.sin(u * 40) * 2), a = Math.sin(t * 18) > 0 ? -1 : 1; pset(bx, by, P.noche0); pset(bx - 1, by + a, P.noche0); pset(bx + 1, by + a, P.noche0); pset(bx - 2, by + a * 2, P.noche0); pset(bx + 2, by + a * 2, P.noche0); } }
  // el árbol que se mece, a contraluz
  { const tx = x0 + Math.round(W * 0.18), base = y1, sw = Math.sin(t * 1.3) * 1.5; R.linea(tx, base, tx, base - 18, hex('#0a0a1e')); R.linea(tx + 1, base, tx + 1, base - 16, hex('#0a0a1e'));
    for (let k = 0; k < 6; k++) disco(tx + Math.round((h(k, 1, 962) - 0.5) * 14 + sw * (0.5 + h(k, 2, 962))), base - 18 - Math.round(h(k, 3, 962) * 9), 4 + h(k, 4, 962) * 2, k & 1 ? hex('#0e1028') : hex('#141634')); }
  // los tejados con sus chimeneas y ventanas encendidas
  let x = x0 - 3, i = 0;
  while (x < x1) { const w = 9 + Math.floor(h(i, 1, 963) * 8), hh = 6 + Math.floor(h(i, 2, 963) * 7), yb = y1 - hh;
    poligono([[x, y1 + 1], [x, yb], [x + w / 2, yb - 4], [x + w, yb], [x + w, y1 + 1]], hex('#0c0c22'));
    R.linea(x, yb, x + Math.round(w / 2), yb - 4, hex('#3a3a6a')); if (h(i, 3, 963) < 0.6) { R.linea(x + w - 3, yb - 4, x + w - 3, yb - 1, hex('#0c0c22')); R.linea(x + w - 2, yb - 4, x + w - 2, yb - 1, hex('#0c0c22')); }
    for (let j = 0; j < 2; j++) { const wx = x + 2 + j * 4, wy = yb + 3; if (wx + 1 >= x + w) continue; const on = h(i, j, 964 + Math.floor((t + i * 2.3 + j) / 6)) < 0.55; if (on) { pset(wx, wy, hex('#f8c860')); pset(wx + 1, wy, hex('#f8c860')); pset(wx, wy + 1, hex('#d89a40')); pset(wx + 1, wy + 1, hex('#d89a40')); } }
    x += w + 1; i++; }
  R.recorte(null);
}

// el marco de la ventana: los junquillos en cruz, el reflejo cálido de la lámpara en el cristal y el pestillo
function c_marcoVentana(R, x0, y0, x1, y1) {
  const { rect, pset } = R, P = c_P, K = C.k, mx = Math.round((x0 + x1) / 2), my = Math.round(y0 + (y1 - y0) * 0.45);
  rect(x0 - 1, y0 - 1, x1 + 1, y0, K); rect(x0 - 1, y1, x1 + 1, y1 + 1, K); rect(x0 - 1, y0, x0, y1, K); rect(x1, y0, x1 + 1, y1, K);
  rect(mx - 1, y0, mx + 1, y1, P.nogS); rect(mx - 1, y0, mx - 1, y1, P.nogL); rect(x0, my - 1, x1, my + 1, P.nogS); rect(x0, my - 1, x1, my - 1, P.nogL);
  rect(mx - 2, my + 2, mx + 2, my + 3, P.laton); pset(mx - 2, my + 2, P.latonL);
  for (let i = 0; i < 12; i++) { c_tinte(R, x1 - 6 - i, y0 + 40 + i, P.luz, 0.3); c_tinte(R, x1 - 4 - i, y0 + 40 + i, P.luz, 0.2); }
}

// una cortina de terciopelo colgada de la barra (xa–xb, y0–y1), recogida con un alzapaño a media altura, con pliegues
// que se mecen con la corriente; lado 1: se recoge hacia la izquierda; -1, hacia la derecha
function c_cortina(R, xa, xb, y0, y1, t, lado) {
  const { pset } = R, P = c_P, K = C.k, W = xb - xa, yt = Math.round(y0 + (y1 - y0) * 0.6);
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (y1 - y0), w = y < yt ? lerp(W, W * 0.45, (y - y0) / (yt - y0)) : lerp(W * 0.45, W * 0.8, (y - yt) / (y1 - yt)), sway = Math.sin(t * 1.1 + v * 2.6) * v * 1.6;
    for (let i = 0; i <= w; i++) { const x = lado > 0 ? xa + i : xb - i, u = i / Math.max(1, w), f = Math.sin(u * Math.PI * 3.2 + sway * 0.9 + v * 0.5);
      const c = (i === Math.floor(w) || (y === y1)) ? K : f > 0.55 ? P.telaL : f > -0.35 ? P.tela : P.telaS; pset(x + Math.round(sway * u), y, c); } }
  const ax = lado > 0 ? xa + Math.round(W * 0.45) : xb - Math.round(W * 0.45);
  const ea = lado > 0 ? xa : ax, eb = lado > 0 ? ax : xb; R.rect(ea, yt - 1, eb, yt, P.laton); R.rect(ea, yt - 1, eb, yt - 1, P.latonL);
  for (let x = xa; x <= xb; x += 3) { R.pset(x, y0, K); R.pset(x, y0 - 1, P.latonS); }
}

// el gato que duerme hecho un ovillo (x, y: el suelo, de cara a la izquierda): cuerpo atigrado, la cabeza apoyada con
// las orejas, la cola que le rodea con la punta blanca que se mueve; respira, a veces mueve una oreja, y la luna le pone
// un filo por detrás
function c_gato(R, x, y, t) {
  const { pset } = R, K = C.k, G = hex('#6a6a7a'), GS = hex('#44444f'), GL = hex('#9a9ab0'), resp = Math.sin(t * 1.7) > 0 ? 0.5 : 0, oreja = (t % 5) < 0.25 ? 1 : 0;
  const cuerpo = (i, j) => (i / (8.5 + resp)) ** 2 + ((j + 4) / (4.6 + resp)) ** 2 < 1 && j <= -1;
  const cabeza = (i, j) => ((i + 7) / 3.8) ** 2 + ((j + 4) / 3.4) ** 2 < 1 || (j === -8 + oreja && (i === -9 || i === -5)) || (j === -7 && i >= -9 && i <= -4 && i !== -7);
  const den = (i, j) => cuerpo(i, j) || cabeza(i, j);
  for (let j = -11; j <= 0; j++) for (let i = -12; i <= 10; i++) { if (!den(i, j)) continue;
    const borde = !den(i - 1, j) || !den(i + 1, j) || !den(i, j - 1) || (!den(i, j + 1) && j < -1);
    let c = borde ? K : cabeza(i, j) && !cuerpo(i, j) ? (j < -5 ? GL : G) : j < -6 ? GL : j > -3 ? GS : G;
    if (!borde && cuerpo(i, j) && !cabeza(i, j) && (i + 20) % 4 === 0 && j < -2) c = GS;
    pset(x + i, y + j, c); }
  pset(x - 9, y - 4, K); pset(x - 8, y - 4, K); pset(x - 6, y - 4, K); pset(x - 5, y - 4, K); pset(x - 10, y - 2, hex('#e88a9a')); pset(x - 9, y - 7, hex('#e88a9a'));
  const cola = Math.round(Math.sin(t * 1.4) * 1.5);
  for (let i = -4; i <= 8; i++) pset(x + i, y - 1, i < -1 ? (i < -2 ? C.blanco : GL) : GS);
  pset(x - 5, y - 2 - Math.max(0, cola), C.blanco); if (cola > 0) pset(x - 6, y - 3, C.blanco);
  for (let i = -6; i <= 6; i++) { const yy = y - 10 - Math.round(resp) + Math.round((i / 8.5) ** 2 * 5); if (R.pget(x + i, yy + 1) === K) pset(x + i, yy + 1, hex('#a8a6d8')); }
}

// la raya de luz del pasillo bajo la puerta (x0–x1 en y), que a veces corta la sombra de alguien que pasa
function c_rayaPuerta(R, x0, x1, y, t) {
  const u = (t % 13) / 13, px = u < 0.3 ? lerp(x1 + 6, x0 - 6, u / 0.3) : -100;
  for (let x = x0; x <= x1; x++) { const tapa = Math.abs(x - px) < 4; R.pset(x, y, tapa ? hex('#5a3a22') : hex('#ffd890')); if (!tapa) { c_tinte(R, x, y + 1, c_P.luz, 0.4); if (c_b4(x, y + 2) < 0.4) c_tinte(R, x, y + 2, c_P.luz, 0.25); } }
}

// la monstera en su maceta de barro (cx, suelo): hojas ovaladas giradas, con su nervio, los cortes del borde y la luz
// de la lámpara por la izquierda, que se mecen con la corriente; s escala
function c_monstera(R, cx, yb, t, s = 1) {
  const { rect, pset, linea } = R, K = C.k, V = hex('#3a7a3a'), VS = hex('#22522a'), VL = hex('#6aaa4a'), BAR = hex('#b45a34'), BARS = hex('#7e3a22'), BARL = hex('#dc8a5a');
  const hojas = [[-13, -28, 8, -2.5, 0], [12, -32, 9, -0.5, 1], [-3, -42, 8, -1.7, 2], [-17, -16, 6, -2.9, 3], [15, -18, 7, -0.2, 4], [5, -26, 6, -1.2, 5]];
  for (const [dx, dy, r, a0, k] of hojas) { const sw = Math.sin(t * 1.2 + k * 1.3) * (1 + (-dy) / 28) * s, a = a0 + Math.sin(t * 1.2 + k) * 0.06, ex = cx + (dx + sw) * s, ey = yb - 16 * s + dy * s, R1 = r * s, R2 = r * s * 0.72, ca = Math.cos(a), sa = Math.sin(a);
    linea(cx, yb - 15 * s, Math.round(ex - ca * R1 * 0.8), Math.round(ey - sa * R1 * 0.8), VS);
    for (let j = -R1 - 1; j <= R1 + 1; j++) for (let i = -R1 - 1; i <= R1 + 1; i++) { const u = (i * ca + j * sa) / R1, v = (-i * sa + j * ca) / R2, e = u * u + v * v; if (e > 1.15) continue;
      const x = Math.round(ex + i), y = Math.round(ey + j); if (e > 0.88) { pset(x, y, K); continue; }
      const corte = Math.abs(v) > 0.45 && [-0.45, 0, 0.45].some((c0) => Math.abs(u - c0 - v * 0.15) < 0.07);
      pset(x, y, corte ? K : Math.abs(v) < 0.08 ? VL : (i * -0.6 + j * -0.8) > R1 * 0.2 ? VL : v * (a > -1.6 ? 1 : -1) > 0.35 ? VS : V); } }
  const pw = 9 * s, ph = 14 * s;
  for (let y = yb - ph; y <= yb; y++) { const w = Math.round(lerp(pw, pw * 0.75, (y - yb + ph) / ph)); rect(cx - w - 1, y, cx + w + 1, y, K); rect(cx - w, y, cx + w, y, BAR); pset(cx - w + 1, y, BARL); rect(cx + w - 2, y, cx + w, y, BARS); }
  rect(cx - pw - 2, yb - ph - 2, cx + pw + 2, yb - ph + 2, K); rect(cx - pw - 1, yb - ph - 1, cx + pw + 1, yb - ph + 1, BAR); rect(cx - pw - 1, yb - ph - 1, cx + pw + 1, yb - ph - 1, BARL);
  rect(cx - pw, yb - ph - 2, cx + pw, yb - ph - 2, hex('#3a2416'));
}

// la mesa grande de nogal del estudio (en cada fotograma, para poder ir delante o detrás de los personajes): tablero
// en perspectiva de y 130 (canto de atrás) a 137 (canto de delante), x 164–296, con vetas y la luz de la lámpara a la
// derecha; faldón con cajón y tirador de latón; patas torneadas (las de delante hasta y 153)
function c_mesaGrande(R) {
  const { rect, pset } = R, P = c_P, K = C.k;
  for (const x of [174, 285]) { rect(x, 143, x + 3, 147, K); rect(x + 1, 143, x + 2, 146, P.nogS); }
  for (const x of [166, 291]) { rect(x - 1, 143, x + 4, 153, K); rect(x, 143, x + 3, 152, P.nog); rect(x, 143, x, 152, P.nogL); rect(x + 3, 143, x + 3, 152, P.nogD); rect(x - 1, 147, x + 4, 148, P.nogS); rect(x - 1, 151, x + 4, 153, P.nogS); }
  for (let y = 130; y <= 137; y++) { const v = (y - 130) / 7, xl = Math.round(lerp(170, 164, v)), xr = Math.round(lerp(290, 296, v));
    for (let x = xl; x <= xr; x++) { let c = (y === 130 || x === xl || x === xr) ? K : P.nogL; if (c !== K && h(Math.floor(x / 5), y, 820) < 0.3) c = P.nog; if (c !== K && y === 131) c = P.nog;
      if (c !== K) { const d = 1 - Math.abs(x - 281) / 44; if (d > 0 && d * 0.5 > c_b4(x, y) * 0.5) c = c_mezcla(c, P.luz, d * 0.35); else if (x < 200) c = c_mezcla(c, P.sombra, 0.18); }
      pset(x, y, c); } }
  rect(163, 137, 297, 138, P.nogB); rect(163, 139, 297, 143, P.nog); rect(163, 143, 297, 143, P.nogD); rect(163, 139, 297, 139, P.nogS);
  for (let x = 164; x < 297; x += 2) if (h(x, 1, 821) < 0.3) pset(x, 141, P.nogS);
  rect(212, 140, 248, 142, P.nogS); rect(213, 140, 247, 140, P.nogD); rect(228, 141, 232, 142, P.laton); pset(228, 141, P.latonL);
  for (let x = 246; x < 297; x++) c_tinte(R, x, 138, P.luz, 0.3);
}

// los objetos de la mesa del estudio (escala s: 1 en la general, 2 en la de cerca): el cerebro, el reloj de arena, la
// cesta de huevos, la lupa y la lámpara con su cono de luz, el polvo en el haz y el parpadeo
function c_objetosMesa(R, t, sin, arena, luz, s) {
  const P = c_P, fl = luz * (((t * 1.7) % 6.3) < 0.12 ? 0.75 : 1) * (0.94 + Math.sin(t * 13) * 0.03 + Math.sin(t * 5.3) * 0.03);
  // las sombras de contacto de cada objeto sobre la mesa
  const so = s === 1 ? [['cerebro', 180, 134, 7, 1], ['reloj', 199, 135, 8, 1], ['cesta', 216, 135, 11, 1], ['lupa', 266, 136, 7, 1], ['', 281, 135, 7, 1]]
    : [['cerebro', 44, 121, 14, 2], ['reloj', 92, 125, 15, 2], ['cesta', 249, 153, 21, 3], ['lupa', 150, 163, 15, 2], ['', 283, 125, 14, 2]];
  for (const [n, x, y, rx, ry] of so) if (!n || !sin.includes(n)) c_sombra(R, x, y, rx, ry, 0.42);
  if (s === 1) {
    c_conoLuz(R, t, 281, 114, 134, 9, 26, fl);
    if (!sin.includes('cerebro')) c_cerebro(R, 180, 124, 1, 0, true);
    if (!sin.includes('reloj')) c_relojArena(R, 199, 135, 1, t, arena);
    if (!sin.includes('cesta')) c_cesta(R, 216, 135, 1);
    if (!sin.includes('lupa')) c_lupa(R, 264, 135, 1);
    c_lampara(R, 281, 135, 1, fl);
    c_resplandor(R, 281, 110, 34, P.luzL, 0.22 * fl, 0.8);
  } else {
    c_conoLuz(R, t, 282, 70, 150, 20, 64, fl);
    if (!sin.includes('cerebro')) c_cerebro(R, 44, 100, 2, 0, true);
    if (!sin.includes('reloj')) c_relojArena(R, 92, 124, 2, t, arena);
    if (!sin.includes('cesta')) c_cesta(R, 248, 152, 2);
    if (!sin.includes('lupa')) c_lupa(R, 146, 160, 2);
    c_lampara(R, 282, 124, 2, fl);
    c_resplandor(R, 282, 62, 60, P.luzL, 0.25 * fl, 0.8);
  }
}
// el cono de luz de la lámpara (de la boca de la pantalla en (cx, y0) hasta la mesa en y1; semiancho arriba a0 y abajo
// a1): tiñe tramado hacia la luz y deja motas de polvo que suben dentro
function c_conoLuz(R, t, cx, y0, y1, a0, a1, f) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (y1 - y0), a = lerp(a0, a1, v); for (let x = Math.round(cx - a); x <= cx + a; x++) { const e = 1 - Math.abs(x - cx) / a, k = (0.1 + e * 0.16) * f; if (k > c_b4(x, y) * 0.16) c_tinte(R, x, y, P.luzL, k); } }
  c_motas(R, t, cx - a1, cx + a1, y0 + 2, y1, Math.round(a1 * 0.5), P.luzL, 3, (x, y) => Math.abs(x - cx) < lerp(a0, a1, (y - y0) / (y1 - y0)) - 1);
}

// la lámpara de latón con pantalla de tela crema (cx, la base en yb; s escala; f el brillo)
function c_lampara(R, cx, yb, s, f) {
  const { rect, pset, poligono, disco } = R, P = c_P, K = C.k, ys = yb - 21 * s;
  rect(cx - 6 * s, yb - 2 * s, cx + 6 * s, yb, K); rect(cx - 5 * s, yb - 2 * s + 1, cx + 5 * s, yb - 1, P.laton); rect(cx - 5 * s, yb - 2 * s + 1, cx + 5 * s, yb - 2 * s + 1, P.latonL);
  rect(cx - Math.ceil(s / 2), ys + 3 * s, cx + Math.floor(s / 2), yb - 2 * s, P.latonS); rect(cx - Math.ceil(s / 2), ys + 3 * s, cx - Math.ceil(s / 2), yb - 2 * s, P.latonL);
  disco(cx, yb - 9 * s, 1.5 * s, P.laton);
  poligono([[cx - 6 * s, ys - 9 * s], [cx + 6 * s, ys - 9 * s], [cx + 11 * s, ys + 2 * s], [cx - 11 * s, ys + 2 * s]], K);
  poligono([[cx - 5 * s, ys - 8 * s], [cx + 5 * s, ys - 8 * s], [cx + 10 * s, ys + 1 * s], [cx - 10 * s, ys + 1 * s]], c_mezcla(hex('#e8c88a'), hex('#fff0c0'), f * 0.6));
  for (let y = ys - 8 * s; y <= ys + s; y++) { const u = (y - ys + 8 * s) / (9 * s), w = lerp(5, 10, u) * s; for (let x = Math.round(cx - w); x <= cx + w; x++) { if (((x - cx + 40) % (3 * s)) === 0) pset(x, y, hex('#d8b070')); if (x > cx + w * 0.55) pset(x, y, hex('#c8a060')); } }
  rect(cx - 10 * s, ys + 1 * s, cx + 10 * s, ys + 2 * s - 1 + (s > 1 ? 0 : 0), c_mezcla(P.luz, P.luzL, f));
  rect(cx - 5 * s, ys - 8 * s, cx + 5 * s, ys - 8 * s, hex('#fff6d8'));
  pset(cx + 7 * s, ys + 3 * s, P.laton); R.linea(cx + 7 * s, ys + 2 * s, cx + 7 * s, ys + 6 * s, P.latonS);   // la cadenita
}

// EL CEREBRO DE JUGUETE (exportado para que la escena lo haga rodar): de perfil, rosa, con circunvoluciones, el cerebelo
// rayado detrás y el tronco; (cx, cy) el centro, s escala, giro (radianes) desplaza los pliegues al rodar; peana: lo
// pone sobre su peana de madera con varilla de latón (apoyada en cy + 10 s)
export function c_cerebro(R, cx, cy, s = 1, giro = 0, peana = false) {
  const { pset, rect, disco } = R, P = c_P, K = C.k, rx = 9 * s, ry = 6.5 * s;
  if (peana) { rect(cx - 6 * s, cy + 8 * s, cx + 6 * s, cy + 10 * s, K); rect(cx - 5 * s, cy + 8 * s + 1, cx + 5 * s, cy + 10 * s - 1, c_P.nog); rect(cx - 5 * s, cy + 8 * s + 1, cx + 5 * s, cy + 8 * s + 1, c_P.nogB); rect(cx - Math.floor(s / 2), cy + 4 * s, cx + Math.floor(s / 2), cy + 8 * s, P.laton); }
  disco(cx + 4 * s, cy + 4 * s, 3.4 * s, K); disco(cx + 4 * s, cy + 4 * s, 3.4 * s - 1, (x, y) => (Math.floor((y - cy) / s) % 2 ? P.rosaS : P.rosa));   // el cerebelo
  rect(cx + 1 * s, cy + 4 * s, cx + 2 * s, cy + 7 * s, P.rosaD);
  for (let j = Math.floor(-ry - 1); j <= ry + 1; j++) for (let i = Math.floor(-rx - 1); i <= rx + 1; i++) {
    const e = (i / rx) ** 2 + (j / (j > 0 ? ry * 0.75 : ry)) ** 2; if (e > 1.12) continue;
    if (e > 0.86) { pset(cx + i, cy + j, K); continue; }
    const g = Math.sin(i / s * 0.95 + Math.sin(j / s * 0.85 + giro * 2) * 2.3 + giro * 3) * Math.cos(j / s * 0.5 - giro);
    let c = Math.abs(g) < 0.2 ? P.rosaS : P.rosa; const l = -i / rx * 0.5 - j / ry * 0.7;
    if (l > 0.45 && c === P.rosa) c = P.rosaL; else if (l < -0.45) c = c === P.rosaS ? P.rosaD : P.rosaS;
    pset(cx + i, cy + j, c); }
  for (let i = -Math.round(rx * 0.6); i < Math.round(rx * 0.5); i++) pset(cx + i, cy + Math.round(Math.sin(i / s * 0.6 + giro) * s * 0.8) + Math.round(1.5 * s), P.rosaD);   // la cisura
  pset(cx - Math.round(rx * 0.45), cy - Math.round(ry * 0.55), C.blanco); if (s > 1) pset(cx - Math.round(rx * 0.45) + 1, cy - Math.round(ry * 0.55), C.blanco);
}

// EL RELOJ DE ARENA (exportado: Atom lo sostiene en la consulta): tapas y columnas de madera, dos bulbos de cristal, la
// arena de arriba que baja, el chorro y el montón de abajo que crece; (cx, yb) la base, s escala, u (0–1) cuánta arena
// ha caído (sin u, un bucle de 24 s)
export function c_relojArena(R, cx, yb, s = 1, t = 0, u = null) {
  const { rect, pset } = R, P = c_P, K = C.k; u = u ?? ((t / 24) % 1);
  const H = 20 * s, hw = 5 * s, cap = 2 * s, yt = yb - H, mid = yt + H / 2, gH = H / 2 - cap;
  rect(cx - hw - 2 * s, yt, cx + hw + 2 * s, yt + cap - 1, K); rect(cx - hw - 2 * s + 1, yt + 1, cx + hw + 2 * s - 1, yt + cap - 1, P.nog); rect(cx - hw - 2 * s + 1, yt + 1, cx + hw + 2 * s - 1, yt + 1, P.nogB);
  rect(cx - hw - 2 * s, yb - cap + 1, cx + hw + 2 * s, yb, K); rect(cx - hw - 2 * s + 1, yb - cap + 1, cx + hw + 2 * s - 1, yb - 1, P.nog); rect(cx - hw - 2 * s + 1, yb - cap + 1, cx + hw + 2 * s - 1, yb - cap + 1, P.nogB);
  for (const dx of [-hw - s - 1, hw + s]) { rect(cx + dx, yt + cap, cx + dx + Math.max(0, s - 1), yb - cap, P.nogS); pset(cx + dx, yt + cap + 2, P.nogB); }
  const ancho = (y) => { const v = Math.abs(y + 0.5 - mid) / gH; return Math.max(0.6 * s, (hw - 0.5) * Math.pow(Math.min(1, v), 0.55)); };
  const arriba = (1 - u) * gH * 0.85, abajo = u * gH * 0.85;
  for (let y = yt + cap; y <= yb - cap; y++) { const w = ancho(y), wi = Math.round(w);
    for (let x = cx - wi - 1; x <= cx + wi + 1; x++) {
      const d = Math.abs(x - cx); if (d > wi) { pset(x, y, K); continue; }
      let arenaHay = false;
      if (y < mid) arenaHay = mid - y < arriba + (d / Math.max(1, wi)) * s * 1.2 && u < 1; else arenaHay = (yb - cap - y) < abajo + (1 - d / Math.max(1, wi)) * s * 2 && u > 0;
      if (arenaHay) pset(x, y, d === 0 && y >= mid ? P.arenaL : x < cx ? P.arena : P.arenaS);
      else c_tinte(R, x, y, hex('#d8f0ff'), 0.28); } }
  if (u > 0 && u < 1) for (let y = Math.round(mid); y < yb - cap - abajo - s; y++) if ((y + Math.floor(t * 18)) % 3) pset(cx, y, P.arenaL);
  for (let y = yt + cap + 1; y < mid - 1; y++) if (y % 3 === 0) pset(cx - Math.round(ancho(y)) + 1, y, C.blanco);
}

// LA CESTA DE HUEVOS DE OCA (exportada): cesta de mimbre trenzado con asa y cinco huevos grandes que asoman; (cx, yb) la
// base, s escala
export function c_cesta(R, cx, yb, s = 1) {
  const { rect, pset, disco } = R, P = c_P, K = C.k, w = 10 * s, hh = 7 * s, yt = yb - hh;
  for (let a = Math.PI; a <= Math.PI * 2; a += 0.04 / s) { const x = Math.round(cx + Math.cos(a) * (w - s)), y = Math.round(yt - 1 + Math.sin(a) * 8 * s); pset(x, y, K); pset(x, y + 1, P.mimbreS); if (s > 1) pset(x, y + 2, P.mimbre); }
  for (const [dx, dy, k] of [[-5, -2, 0], [5, -2, 1], [0, -3, 2], [-2, 0, 3], [3, 0, 4]]) { const ex = cx + dx * s, ey = yt + dy * s;
    for (let j = -4 * s - 1; j <= 3 * s + 1; j++) for (let i = -3 * s - 1; i <= 3 * s + 1; i++) { const e = (i / (3 * s)) ** 2 + (j / (j < 0 ? 4.2 * s : 3.2 * s)) ** 2; if (e > 1.15) continue; pset(ex + i, ey + j, e > 0.85 ? K : (i + j * 0.8) / s < -2.2 ? C.blanco : (i - j * 0.3) / s > 1.2 ? P.huevoS : P.huevo); } }
  for (let y = yt; y <= yb; y++) { const v = (y - yt) / hh, ww = Math.round(lerp(w, w * 0.8, v)); rect(cx - ww - 1, y, cx + ww + 1, y, K);
    for (let x = cx - ww; x <= cx + ww; x++) { const fila = Math.floor((y - yt) / (2 * s)), col = Math.floor((x - cx + 50 * s) / (3 * s)); pset(x, y, (fila + col) & 1 ? P.mimbreS : (y - yt) % (2 * s) === 0 ? P.mimbreL : P.mimbre); } }
  rect(cx - w - 1, yt - 1, cx + w + 1, yt, K); rect(cx - w, yt, cx + w, yt, P.mimbreL);
}

// LA LUPA (exportada), tumbada sobre la mesa: aro de latón, cristal con el reflejo y el mango de madera; (cx, cy) el
// centro del cristal, s escala
export function c_lupa(R, cx, cy, s = 1) {
  const { pset, linea, rect } = R, P = c_P, K = C.k, rx = 5 * s, ry = 2.6 * s;
  for (let i = 0; i < 8 * s; i++) { const x = cx + rx + i, y = cy + Math.round(i * 0.25); rect(x, y - Math.ceil(s / 2), x, y + s, K); if (s > 1) rect(x, y, x, y + s - 1, i < 2 * s ? P.laton : P.nogS); else pset(x, y, i < 2 ? P.laton : P.nogS); }
  for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -rx - 1; i <= rx + 1; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1.3) continue;
    if (e > 1) pset(cx + i, cy + j, e > 1.18 ? K : j < 0 ? P.latonL : P.laton); else c_tinte(R, cx + i, cy + j, hex('#cfefff'), j < -ry * 0.3 && i < 0 ? 0.55 : 0.2); }
  linea(cx - rx + s + 1, cy - 1, cx - Math.round(rx * 0.3), cy - Math.round(ry * 0.8), C.blanco);
}

// ENTREGA: suelo 150 (pies de Atom a escala 2 sobre la mesa; el tablero va de y 88 a 179), libre x 108–222; mesa (hueco
// libre) 108–222 × 92–146; pizarra (hueco) 0–100 × 24–50 (repisa en y 56); cuadro del faro 118–150 × 24–50; ventana
// 200–256 × 10–66 (gato en el alféizar, 208–230 × 60–70); cerebro (44, 100) en su peana; reloj de arena (92, 124: la
// base); cesta (248, 152: la base); lupa (146, 160); lámpara: base (282, 124), pantalla 260–304 × 64–86; cuaderno
// 20–92 × 152–175; taza 294–314 × 140–158
function c_estudioMesa(R, t, o) {
  const P = c_P, sin = o.sin || [], luz = o.lampara ?? 1;
  c_fondoFijo(R, 'C_estudioMesa', () => c_estudioMesaFondo(R));
  c_ventanaNoche(R, t, 200, 10, 256, 66, [0.62, 0.25]);
  c_marcoVentana(R, 200, 10, 256, 66);
  c_cortina(R, 254, 274, 3, 78, t, -1);
  if (o.gato !== false) c_gato(R, 220, 70, t);
  if (o.pizarra) { const r = [0, 24, 100, 50]; R.recorte(r); o.pizarra(R, t, r); R.recorte(null); }
  c_objetosMesa(R, t, sin, o.arena, luz, 2);
  c_vapor(R, 305, 140, t, 1, P.luzL, 22);
  c_newton(R, 169, 45, t);
  c_polilla(R, t, 282, 76, 30, 11);
  return { encuadre: 'estudio', camara: 'mesa', suelo: 150, libre: [108, 222], mesa: [108, 92, 222, 146], pizarra: [0, 24, 100, 50], cerebro: [44, 100], reloj: [92, 124], cesta: [248, 152], lupa: [146, 160], lampara: [282, 74] };
}
function c_estudioMesaFondo(R) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k;
  c_ladrillo(R, 0, 0, 319, 86, 3);
  // el pie de la pizarra, con su repisa, tizas y borrador
  rect(0, 20, 106, 58, K); rect(0, 20, 105, 23, P.roble); rect(0, 20, 105, 20, P.robleL); rect(0, 23, 105, 23, P.robleS); for (let y = 24; y <= 50; y++) for (let x = 0; x <= 100; x++) { let c = h(x, y, 812) < 0.1 ? P.pizarraS : P.pizarra; const sw = Math.sin(x * 0.07 + Math.sin(y * 0.15) * 1.6 + y * 0.02); if (Math.abs(sw - 0.5) < 0.1 && h(x >> 1, y, 813) < 0.55) c = P.pizarraL; pset(x, y, c); }
  rect(101, 20, 105, 55, P.roble); rect(101, 21, 101, 55, P.robleL); rect(105, 20, 105, 55, P.robleS); rect(0, 51, 105, 55, P.roble); rect(0, 51, 105, 51, P.robleL); rect(0, 55, 105, 55, P.robleS);
  rect(0, 56, 110, 61, K); rect(0, 56, 109, 58, P.roble); rect(0, 56, 109, 56, P.robleL); rect(0, 59, 109, 60, P.robleS);
  for (const [x, c] of [[12, P.tiza], [24, hex('#f0d860')], [70, P.tiza]]) { rect(x, 53, x + 9, 56, K); rect(x + 1, 54, x + 8, 55, c); rect(x + 1, 55, x + 8, 55, c_mezcla(c, K, 0.25)); }
  rect(36, 49, 62, 56, K); rect(37, 50, 61, 52, P.robleS); rect(37, 50, 61, 50, P.robleL); rect(37, 53, 61, 55, hex('#7a7a80')); for (let x = 38; x < 61; x += 3) pset(x, 54, hex('#9a9aa0'));
  for (let i = 0; i < 18; i++) if (h(i, 1, 814) < 0.7) pset(30 + Math.floor(h(i, 2, 814) * 50), 57, C.blanco);   // polvo de tiza
  // la ventana: el marco y el alféizar
  rect(194, 4, 262, 71, P.nogS); rect(194, 4, 262, 4, P.nogB); rect(194, 4, 194, 71, P.nogL); rect(262, 4, 262, 71, P.nogD);
  rect(190, 70, 266, 74, P.nog); rect(190, 70, 266, 70, P.nogB); rect(190, 74, 266, 74, P.nogD);
  rect(250, 0, 278, 1, P.latonS);
  // un cuadro pequeño: el faro de noche (abajo a la derecha de la ventana, fuera de la esquina de Atom)
  rect(118, 24, 150, 50, K); rect(119, 25, 149, 49, P.laton); rect(119, 25, 149, 25, P.latonL); rect(121, 27, 147, 47, K);
  for (let y = 28; y <= 46; y++) for (let x = 122; x <= 146; x++) pset(x, y, y < 40 ? (c_b4(x, y) < (y - 28) / 12 ? hex('#2a3a6a') : hex('#1a2246')) : (x + y) % 3 ? hex('#22305a') : hex('#3a4a7a'));
  rect(131, 32, 133, 43, C.blanco); rect(131, 35, 133, 36, C.rojo); rect(131, 39, 133, 40, C.rojo); rect(130, 31, 134, 31, K); rect(129, 43, 135, 44, hex('#3a3a4a')); linea(134, 32, 146, 29, hex('#f8e8a0'));
  // la mesa: el canto de atrás y el tablero de tablas que se ensanchan hacia nosotros, con vetas y nudos
  rect(0, 86, 319, 88, K); rect(0, 87, 319, 87, P.nogD);
  for (let y = 89, f = 0, alto = 7; y < 180; y += alto, f++, alto = Math.round(7 + f * 2.4)) {
    for (let yy = y; yy < Math.min(180, y + alto); yy++) for (let x = 0; x < 320; x++) {
      let c = h(f, 0, 830) < 0.33 ? P.nog : h(f, 0, 830) < 0.66 ? hex('#74482a') : hex('#62391f');
      const g = Math.sin(x * 0.02 * (1 + f * 0.2) + Math.sin(x * 0.05 + f) * 2 + (yy - y) * 0.9 / (1 + f * 0.3)); if (Math.abs(g) < 0.08) c = P.nogS; else if (g > 0.93) c = P.nogL;
      if (yy === y) c = P.nogD; else if (yy === y + 1) c = c_mezcla(c, P.nogB, 0.4);
      if (h(Math.floor(x / (3 + f)), f, 831) < 0.01) c = P.nogD;
      pset(x, yy, c); } }
  // el cuaderno abierto y los lápices (a un lado, sin letras)
  for (let y = 152; y <= 172; y++) for (let x = 20; x <= 88; x++) { const lado = x < 54; pset(x + Math.round((y - 152) * 0.15), y, x === 20 || x === 88 || y === 152 || y === 172 || x === 54 ? K : (y % 4 === 0 && x % 3 !== 0 && x > 24 && x < 84 && Math.abs(x - 54) > 3) ? hex('#a8b4c8') : lado ? P.crema : hex('#f8f0dc')); }
  for (const [x, c] of [[96, hex('#e8c040')], [102, hex('#c83a3a')]]) { for (let i = 0; i < 24; i++) { R.rect(x + i, 166 - Math.round(i * 0.3), x + i, 168 - Math.round(i * 0.3), i < 3 ? hex('#f0d0a0') : c); R.pset(x + i, 166 - Math.round(i * 0.3), i < 3 ? hex('#f0d0a0') : c_mezcla(c, C.blanco, 0.3)); } R.pset(x, 167, K); }
  // la taza (la escena no la toca), la balda de la pared, la pila de libros con el tintero, el tarro de gominolas, los
  // papeles sueltos con la regla y el cable de la lámpara
  c_sombra(R, 306, 159, 12, 2, 0.4); c_tazaMesa(R);
  c_baldaPared(R);
  c_pilaLibros(R, 0, 112);
  c_tarroGominolas(R, 11, 146);
  c_papelesMesa(R);
  c_cableLampara(R);
  c_sombra(R, 160, 128, 150, 30, 0.12);
  c_iluminar(R, [[282, 76, 230, 1.1], [120, 60, 260, 0.4]], 0.4, P.luz);
}
// ENTREGA: suelo 160 (pies), libre x 112–192 delante (y 14–300 si o.escritorioDelante es false); detras 134: los pies
// del que se pone tras el escritorio (en x 242–262 asoman cabeza y hombros); escritorio: tablero de y 129 (atrás) a 135
// (delante), x 192–296, centro (244, 132); diván: asiento de x 26–112 en y 124, cabecero a la izquierda; ventana
// (persiana) 18–78 × 22–84; reloj regulador x 186–206 × 18–80; pecera (152, 86); archivador x 296–318 × 76–126
function c_consulta(R, t, o) {
  const P = c_P;
  c_fondoFijo(R, 'C_consulta', () => c_consultaFondo(R));
  c_persiana(R, t, 18, 28, 78, 84);
  c_rayasLuz(R, t, 0);
  c_pendulo(R, 196, 50, 27, t, 1);
  c_reloj(R, 196, 29, 7, t, 16.1, P.nogL);
  c_pecera(R, 152, 86, t);
  c_potus(R, 307, 74, t);
  c_motas(R, t, 60, 200, 60, 150, 22, P.sol, 5, (x, y) => c_enRaya(x, y, t));
  if (o.escritorioDelante === false) c_escritorioConsulta(R, t);
  return { encuadre: 'consulta', camara: 'general', suelo: 160, libre: o.escritorioDelante === false ? [14, 300] : [112, 192], detras: 134, detrasLibre: [242, 262], escritorio: [244, 132], divan: [70, 124], ventana: [18, 28, 78, 84], reloj: [196, 29], pecera: [152, 86], archivador: [296, 76, 318, 126] };
}

// las rayas de la persiana proyectadas: ¿cae luz en (x, y)? (bandas inclinadas que bajan despacio)
function c_enRaya(x, y, t) { const p = y * 1 - x * 0.42 + t * 1.6; return ((p % 7) + 7) % 7 < 3.2; }

function c_rayasLuz(R, t, modo) {
  const P = c_P;
  if (modo === 0) {
    // en la pared, a la derecha de la ventana
    for (let y = 24; y <= 120; y++) { const x0 = 82 + Math.round((y - 24) * 0.55), x1 = x0 + 58 - Math.round((y - 24) * 0.12); for (let x = x0; x <= x1; x++) if (c_enRaya(x, y, t) && c_b4(x, y) < 0.75) c_tinte(R, x, y, P.sol, 0.22); }
    // en el suelo y el diván
    for (let y = 108; y <= 179; y++) { const x0 = 20 + Math.round((y - 108) * 1.2), x1 = x0 + 92 + Math.round((y - 108) * 0.5); for (let x = x0; x <= Math.min(319, x1); x++) if (c_enRaya(x, y, t)) c_tinte(R, x, y, P.sol, 0.28); }
  } else {
    for (let y = 0; y <= 179; y++) { const x0 = 40 + Math.round(y * 0.6), x1 = x0 + 150; for (let x = x0; x <= Math.min(319, x1); x++) if (c_enRaya(x * 0.6, y * 0.6, t)) c_tinte(R, x, y, P.sol, y > 84 ? 0.14 : 0.12); }
  }
}

function c_consultaFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = c_P, K = C.k;
  // el techo de yeso con su moldura
  rect(0, 0, 319, 8, hex('#d8ceb4')); for (let y = 0; y < 8; y++) for (let x = 0; x < 320; x++) if (h(x, y, 870) < 0.12) pset(x, y, hex('#c4b89c'));
  rect(0, 8, 319, 11, hex('#e8dec4')); rect(0, 9, 319, 9, hex('#b8ac90')); rect(0, 11, 319, 11, hex('#8a7e64'));
  // el papel pintado de rombos con florecillas
  c_papelPintado(R, 0, 12, 319, 87);
  // el friso de nogal: moldura, cuarterones y zócalo
  rect(0, 87, 319, 90, P.nog); rect(0, 87, 319, 87, P.nogB); rect(0, 90, 319, 90, P.nogD);
  rect(0, 91, 319, 121, P.nogS); for (let x = 2, k = 0; x < 316; x += 26, k++) c_cuarteron(R, x, 94, x + 22, 118, P.nog, P.nogL, P.nogD, P.nogS, k + 20);
  rect(0, 121, 319, 126, P.nogD); rect(0, 121, 319, 121, P.nog);
  // el suelo y la alfombra
  c_tarima(R, 127, 179, 160, 30, 5, [hex('#9a6a3e'), hex('#a8764a'), hex('#8e6038'), hex('#4a2e18'), hex('#c89a62')], 2);
  c_alfombra(R, 140, 174, 40, 250, 14, 280, 1);
  // la ventana con su marco (la persiana la pinta c_persiana en cada fotograma)
  rect(12, 22, 84, 90, K); rect(13, 23, 83, 89, hex('#e8e0cc')); rect(13, 23, 83, 23, C.blanco); rect(83, 23, 83, 89, hex('#b8ae96')); rect(8, 88, 88, 92, hex('#e8e0cc')); rect(8, 88, 88, 88, C.blanco); rect(8, 92, 88, 93, hex('#9a907a'));
  // los diplomas y la lámina de manchas
  c_diploma(R, 94, 26, 122, 50, 0); c_diploma(R, 128, 22, 150, 40, 1); c_diploma(R, 128, 44, 150, 62, 2);
  rect(156, 28, 178, 58, K); rect(157, 29, 177, 57, hex('#2a2a2a')); rect(159, 31, 175, 55, hex('#f2ecdc'));
  for (let j = 0; j < 22; j++) for (let i = 0; i < 8; i++) { const v = Math.sin(i * 0.9 + j * 0.45) + Math.sin(j * 0.7 + 1) * 0.8 - i * 0.18 + (h(i, j, 871) - 0.5) * 0.6; if (v > 0.35) { pset(167 - i, 32 + j, hex('#1c1c2a')); pset(167 + i, 32 + j, hex('#1c1c2a')); } }
  // el reloj regulador: la caja, la cresta y las pesas (la esfera y el péndulo van en cada fotograma)
  rect(186, 16, 206, 82, K); rect(187, 17, 205, 81, P.nog); rect(187, 17, 187, 81, P.nogL); rect(205, 17, 205, 81, P.nogD);
  poligono([[184, 17], [196, 9], [208, 17]], K); poligono([[186, 16], [196, 11], [206, 16]], P.nogL); rect(195, 7, 197, 9, P.laton);
  rect(189, 40, 203, 76, K); rect(190, 41, 202, 75, hex('#3a2416')); rect(190, 41, 191, 75, hex('#5a3c26'));
  for (const x of [192, 200]) { rect(x, 43, x, 54, P.latonS); rect(x - 1, 55, x + 1, 62, P.laton); pset(x - 1, 55, P.latonL); }
  rect(185, 82, 207, 84, P.nogS);
  // la estantería baja con libros, un busto y la pecera encima (la pecera, en cada fotograma)
  rect(98, 92, 168, 124, K); rect(99, 93, 167, 123, P.nogS); rect(99, 93, 167, 94, P.nogL); rect(101, 107, 165, 108, P.nog); rect(101, 107, 165, 107, P.nogB);
  const LIB = ['#7a2a2a', '#2a4a6a', '#3a5a3a', '#8a6a2a', '#c8a060', '#4a2a1a', '#5a6a7a'].map(hex);
  for (const [yb, y0] of [[106, 96], [122, 110]]) { let x = 102; while (x < 162) { const w = 2 + Math.floor(h(x, yb, 872) * 3), hh = Math.min(yb - y0, 8 + Math.floor(h(x, yb, 873) * 4)), c = LIB[Math.floor(h(x, yb, 874) * LIB.length)]; rect(x, yb - hh, x + w, yb, K); rect(x + 1, yb - hh + 1, x + w - 1, yb, c); if (w > 2) rect(x + 1, yb - hh + 2, x + w - 1, yb - hh + 2, C.oro); x += w + 1; } }
  disco(114, 84, 4, K); disco(114, 84, 3, hex('#e8e4dc')); rect(110, 88, 118, 92, K); rect(111, 88, 117, 91, hex('#d8d4cc')); pset(113, 83, C.blanco); rect(112, 85, 114, 85, hex('#b8b4ac'));   // el busto
  // el archivador metálico de cuatro cajones (portaetiquetas sin letras y tiradores)
  rect(296, 76, 318, 126, K); rect(297, 77, 317, 125, P.metalV); rect(297, 77, 317, 77, P.metalVL); rect(297, 77, 297, 125, P.metalVL); rect(317, 77, 317, 125, P.metalVS);
  for (let k = 0; k < 4; k++) { const y = 79 + k * 12; rect(298, y, 316, y + 10, P.metalVS); rect(298, y, 315, y + 9, P.metalV); rect(298, y, 315, y, P.metalVL); rect(303, y + 2, 311, y + 4, K); rect(304, y + 3, 310, y + 3, P.crema); rect(304, y + 6, 310, y + 7, hex('#3a4a44')); rect(304, y + 6, 310, y + 6, P.metalVL); }
  // el diván de cuero capitoneado: el cabecero alto a la izquierda, el almohadón, el colchón y las patas
  c_sombra(R, 68, 150, 48, 5, 0.4);
  for (const x of [30, 106]) { rect(x, 140, x + 3, 150, K); rect(x + 1, 140, x + 2, 149, P.nogL); }
  rect(24, 132, 114, 141, K); rect(25, 133, 113, 140, P.nog); rect(25, 133, 113, 133, P.nogB);
  rect(24, 122, 114, 133, K); rect(25, 123, 113, 132, P.cuero); rect(25, 123, 113, 124, P.cueroL); rect(25, 131, 113, 132, P.cueroS);
  poligono([[20, 133], [20, 102], [26, 96], [36, 97], [44, 112], [46, 133]], K); poligono([[21, 132], [21, 103], [26, 97], [35, 98], [43, 112], [45, 132]], P.cuero);
  linea(22, 102, 26, 98, P.cueroL); linea(26, 98, 34, 99, P.cueroL); linea(35, 99, 42, 111, P.cueroS); rect(21, 103, 22, 131, P.cueroL); rect(42, 113, 44, 131, P.cueroS);
  for (let y = 112; y < 130; y += 5) for (let x = 27 + ((y / 5) & 1) * 3; x < 42; x += 6) { pset(x, y, P.cueroS); pset(x + 1, y + 1, P.cueroL); linea(x - 2, y - 2, x, y, P.cueroS); }
  for (let x = 48; x < 112; x += 7) { pset(x, 127, P.cueroS); pset(x + 1, 128, P.cueroL); linea(x - 3, 125, x, 127, P.cueroS); linea(x + 3, 125, x, 127, P.cueroS); }
  rect(44, 114, 62, 123, K); disco(44, 118.5, 4.5, K); disco(62, 118.5, 4.5, K); rect(45, 115, 61, 122, hex('#e2d6b8')); disco(44, 118.5, 3.5, hex('#c8b894')); disco(62, 118.5, 3.5, hex('#d8caa8')); rect(45, 115, 61, 116, hex('#f4ecd8')); rect(45, 121, 61, 122, hex('#b8aa88'));
  for (let x = 48; x < 60; x += 4) rect(x, 115, x, 122, hex('#c8a870')); pset(44, 118, hex('#8a7a5a')); pset(62, 118, hex('#8a7a5a'));   // el rulo
  for (let y = 120; y <= 134; y++) for (let x = 94; x <= 110; x++) { const yy = y + Math.round((x - 94) * 0.1); pset(x, yy, x === 94 || x === 110 ? K : ((y >> 1) & 1) ? hex('#2a4a6a') : (y % 6 < 2 ? hex('#c8923a') : hex('#e2cc9a'))); }   // la manta doblada
  // el sillón de cuero tras el escritorio
  rect(234, 98, 262, 128, K); rect(235, 99, 261, 127, P.cueroS); rect(235, 99, 261, 101, P.cuero); rect(236, 102, 260, 120, P.cuero); rect(236, 102, 237, 120, P.cueroL);
  for (let y = 105; y < 120; y += 5) for (let x = 240 + ((y / 5) & 1) * 3; x < 258; x += 6) { pset(x, y, P.cueroS); pset(x + 1, y + 1, P.cueroL); }
  // la luz de la tarde que entra por la ventana
  c_iluminar(R, [[50, 52, 230, 1.0], [244, 100, 160, 0.35]], 0.38, P.sol);
}

// papel pintado de los sesenta: rejilla de rombos con florecillas de cuatro pétalos en los cruces, costuras verticales y
// algo de desgaste
function c_papelPintado(R, x0, y0, x1, y1, s = 1) {
  const P = c_P, w = 12 * s;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = (x + y * 1) / w, b = (x - y * 1) / w, fa = a - Math.floor(a), fb = b - Math.floor(b);
    let c = P.papel;
    if (fa < 0.07 || fb < 0.07) c = P.papelS;
    const cx = (Math.round(a) + Math.round(b)) * w / 2, cy = (Math.round(a) - Math.round(b)) * w / 2, dx = x - cx, dy = y - cy;
    if (Math.abs(dx) + Math.abs(dy) < 2.6 * s) c = Math.abs(dx) + Math.abs(dy) < 1.2 * s ? hex('#d8783a') : P.papelL;
    const mx = x - ((Math.floor(a) + Math.floor(b) + 1) * w / 2), my = y - ((Math.floor(a) - Math.floor(b)) * w / 2);
    if (Math.abs(mx) < 0.8 * s && Math.abs(my) < 0.8 * s) c = P.papelD;
    if (x % (40 * s) === 0) c = c_mezcla(c, P.papelD, 0.4);
    if (h(x >> 1, y >> 1, 880) < 0.04) c = c_mezcla(c, P.papelD, 0.3);
    R.pset(x, y, c);
  }
}

// un diploma enmarcado, sin letras: marco, paspartú, el arco del título en trazo, los renglones, el sello rojo con cintas
// y la firma; tipo cambia el marco (0 dorado, 1 negro, 2 nogal)
function c_diploma(R, x0, y0, x1, y1, tipo) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, M = [[C.oro, C.oroS, C.oroL], [hex('#2a2a2a'), hex('#141414'), hex('#5a5a5a')], [P.nogL, P.nogS, P.nogB]][tipo];
  rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, M[0]); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, M[2]); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, M[1]); rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, M[1]);
  rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, P.cremaS); rect(x0 + 4, y0 + 4, x1 - 4, y1 - 4, P.crema);
  const cx = Math.round((x0 + x1) / 2), w = x1 - x0;
  for (let i = -Math.round(w * 0.3); i <= Math.round(w * 0.3); i++) pset(cx + i, y0 + 7 + Math.round((i / (w * 0.3)) ** 2 * 1.5), hex('#3a3a4a'));
  for (let y = y0 + 11; y < y1 - 9; y += 3) rect(x0 + 7, y, x1 - 7 - Math.round(h(y, tipo, 885) * 5), y, hex('#a8a090'));
  disco(x0 + 8, y1 - 7, 2.5, hex('#c83a3a')); pset(x0 + 7, y1 - 8, hex('#f08a8a')); linea(x0 + 7, y1 - 5, x0 + 6, y1 - 3, hex('#c83a3a')); linea(x0 + 9, y1 - 5, x0 + 10, y1 - 3, hex('#c83a3a'));
  for (let i = 0; i < 8; i++) pset(x1 - 14 + i, y1 - 7 + Math.round(Math.sin(i * 1.3) * 1.2), hex('#2a3a7a'));
  for (let i = 0; i < 5; i++) c_tinte(R, x0 + 6 + i * 2, y0 + 4 + i * 3, C.blanco, 0.35);
}

// la persiana veneciana (hueco x0–x1 × y0–y1): fuera, el cielo con nubes que pasan, el edificio de enfrente con sus
// ventanas y un árbol; delante, las lamas crema con su sombra, las cintas, el cajón y el cordón con la borla que se mece
function c_persiana(R, t, x0, y0, x1, y1) {
  const { pset, rect, linea, disco } = R, P = c_P, K = C.k;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - y0) / (y1 - y0) + c_b4(x, y) * 0.3 < 0.45 ? P.cieloS : P.cielo);
  for (const [k, yy, w, v] of [[0, y0 + 12, 30, 2.2], [1, y0 + 24, 20, 3.4], [2, y0 + 6, 24, 1.3]]) { const span = (x1 - x0) + 50, cx = x0 - 25 + ((h(k, 6, 965) * span + t * v) % span); c_nube(R, cx, yy, w, k + 3, [hex('#b8cce0'), hex('#dce8f2'), hex('#f4f8fc'), C.blanco]); }
  for (let y = y0 + 30; y <= y1; y++) for (let x = x0 + 26; x <= x1; x++) { let c = (y % 4 === 0 || (x + ((y >> 2) & 1) * 3) % 6 === 0) ? hex('#9a6a52') : hex('#c08a6a'); const wx = (x - x0 - 30) % 12, wy = (y - y0 - 34) % 12; if (wx >= 0 && wx < 6 && wy >= 0 && wy < 7 && x > x0 + 28) c = wy < 2 ? hex('#4a5a6a') : hex('#2e3a48'); pset(x, y, c); }
  { const sw = Math.sin(t * 1.5) * 1.5; for (let k = 0; k < 7; k++) disco(x0 + 8 + Math.round((h(k, 1, 966) - 0.5) * 18 + sw * h(k, 2, 966)), y0 + 44 + Math.round(h(k, 3, 966) * 20), 5 + h(k, 4, 966) * 3, k & 1 ? hex('#4a8a3a') : hex('#6aa84a')); rect(x0 + 7, y0 + 60, x0 + 9, y1, hex('#5a4030')); }
  { const u = (t / 7) % 1; if (u < 0.5) { const bx = Math.round(x0 - 3 + u / 0.5 * (x1 - x0 + 6)), by = y0 + 16 + Math.round(Math.sin(u * 30) * 2), a = Math.sin(t * 16) > 0 ? -1 : 1; pset(bx, by, K); pset(bx - 1, by + a, K); pset(bx + 1, by + a, K); } }
  R.recorte(null);
  const inc = Math.sin(t * 0.35) * 0.5 + 0.5;
  for (let y = y0 + 2; y <= y1; y += 4) { rect(x0, y, x1, y + 1, P.crema); rect(x0, y + 2, x1, y + 2, inc > 0.5 ? P.cremaS : hex('#ddd2b8')); rect(x0, y, x1, y, inc > 0.5 ? C.blanco : P.crema); }
  for (const x of [x0 + 14, x1 - 14]) for (let y = y0; y <= y1; y++) pset(x, y, hex('#d8ccb0'));
  rect(x0 - 2, y0 - 3, x1 + 2, y0 + 1, K); rect(x0 - 1, y0 - 2, x1 + 1, y0, hex('#e8e0cc')); rect(x0 - 1, y0 - 2, x1 + 1, y0 - 2, C.blanco);
  rect(x0 - 1, y1 + 1, x1 + 1, y1 + 3, K); rect(x0, y1 + 1, x1, y1 + 2, hex('#e8e0cc'));
  const bx = x1 - 4 + Math.round(Math.sin(t * 1.2) * 1.5); linea(x1 - 4, y0, bx, y1 + 12, hex('#cfc2a2')); disco(bx, y1 + 14, 1.6, hex('#cfc2a2')); rect(bx, y1 + 15, bx, y1 + 17, hex('#b8aa88'));
}

// el péndulo del reloj regulador (colgado en (cx, y0), largo L; s escala), con su lenteja de latón que oscila
function c_pendulo(R, cx, y0, L, t, s = 1) {
  const a = Math.sin(t * Math.PI) * 0.22, bx = Math.round(cx + Math.sin(a) * L), by = Math.round(y0 + Math.cos(a) * L), P = c_P;
  R.linea(cx, y0, bx, by, P.latonS); R.disco(bx, by, 3 * s + 0.5, C.k); R.disco(bx, by, 3 * s - 0.5, P.laton); R.pset(bx - s, by - s, P.latonL); if (s > 1) R.disco(bx - s, by - s, s * 0.8, P.latonL);
}

// la pecera de cristal con su pez rojo que va y viene, burbujas y una planta (cx, cy: el centro)
function c_pecera(R, cx, cy, t) {
  const { pset, disco, rect } = R, P = c_P, K = C.k;
  disco(cx, cy, 7, K); disco(cx, cy, 6, (x, y, d) => y < cy - 3 ? c_mezcla(R.pget(x, y), hex('#dff4ff'), 0.25) : d > 0.8 ? hex('#5a9ab8') : hex('#7ac0d8'));
  rect(cx - 4, cy - 7, cx + 4, cy - 7, K); rect(cx - 3, cy - 6, cx + 3, cy - 6, hex('#bfe4f0')); rect(cx - 4, cy - 3, cx + 4, cy - 3, hex('#cfeefa'));
  rect(cx - 4, cy + 4, cx + 4, cy + 5, hex('#c8a870')); for (let i = -1; i < 2; i++) { const sw = Math.round(Math.sin(t * 2 + i) * 1); rect(cx + i * 2 + sw, cy, cx + i * 2 + sw, cy + 3, hex('#3a8a4a')); }
  const u = Math.sin(t * 0.9), fx = Math.round(cx + u * 3), dir = Math.cos(t * 0.9) > 0 ? 1 : -1, fy = cy + Math.round(Math.sin(t * 2.1));
  rect(fx - 1, fy, fx + 1, fy + 1, hex('#f07a2a')); pset(fx - 2 * dir, fy, hex('#f0a040')); pset(fx - 2 * dir, fy + 1, hex('#f0a040')); pset(fx + dir, fy, K);
  for (let k = 0; k < 2; k++) { const v = (t * 0.8 + k * 0.5) % 1; pset(fx + dir * 2, fy - 1 - Math.round(v * 3), C.blanco); }
  pset(cx - 4, cy - 1, C.blanco); pset(cx - 4, cy, C.blanco);
}

// el potus en su maceta sobre el archivador (cx, la base), con las ramas que cuelgan y se mecen
function c_potus(R, cx, yb, t) {
  const { rect, disco, pset } = R, K = C.k, V = hex('#4a9a3a'), VS = hex('#2e6a2a'), VL = hex('#8ac85a');
  rect(cx - 7, yb - 9, cx + 7, yb, K); rect(cx - 6, yb - 8, cx + 6, yb, hex('#e8e0cc')); rect(cx - 6, yb - 8, cx - 5, yb, C.blanco); rect(cx + 4, yb - 8, cx + 6, yb, hex('#b8ae96')); rect(cx - 7, yb - 10, cx + 7, yb - 9, hex('#3a2416'));
  for (let k = 0; k < 9; k++) { const a = -1.2 + k * 0.3, x = cx + Math.round(Math.cos(a - 0.4) * 7), y = yb - 12 - Math.round(Math.abs(Math.sin(a * 2)) * 5); disco(x, y, 2.6, K); disco(x, y, 2, k & 1 ? V : VL); pset(x, y, VS); }
  for (const [x, n, k] of [[cx - 6, 18, 0], [cx + 5, 26, 1]]) for (let i = 0; i < n; i += 3) { const sw = Math.round(Math.sin(t * 1.3 + k * 2 + i * 0.15) * (i / n) * 2.5), y = yb - 8 + i; pset(x + sw, y, VS); if (i % 6 === 0) { disco(x + sw + (k ? 2 : -2), y, 1.8, K); disco(x + sw + (k ? 2 : -2), y, 1.2, i % 12 ? V : VL); } }
}

// el escritorio de la consulta (lo pinta estudioDelante o estudio): tablero de nogal, dos cajoneras con tiradores, el
// hueco de las rodillas, y encima la máquina de escribir, las carpetas, la taza que humea, la lámpara de banquero
// encendida y el teléfono de disco
function c_escritorioConsulta(R, t) {
  const { rect, pset, poligono, linea } = R, P = c_P, K = C.k;
  rect(192, 135, 296, 159, K); rect(193, 135, 295, 158, P.nog); rect(193, 135, 193, 158, P.nogL);
  for (const [x0, x1] of [[195, 226], [262, 293]]) { for (let k = 0; k < 3; k++) { const y = 137 + k * 7; rect(x0, y, x1, y + 5, P.nogS); rect(x0, y, x1 - 1, y + 4, P.nogL); rect(x0 + 1, y + 1, x1 - 1, y + 4, P.nog); rect(Math.round((x0 + x1) / 2) - 3, y + 2, Math.round((x0 + x1) / 2) + 3, y + 3, P.laton); pset(Math.round((x0 + x1) / 2) - 3, y + 2, P.latonL); } }
  rect(228, 136, 260, 158, P.nogD); rect(228, 136, 260, 138, P.nogS); for (let x = 230; x < 260; x += 6) rect(x, 140, x, 156, hex('#24140c'));
  for (const x of [193, 292]) rect(x, 158, x + 3, 161, K);
  for (let y = 129; y <= 135; y++) { const v = (y - 129) / 6, xl = Math.round(lerp(196, 192, v)), xr = Math.round(lerp(292, 296, v)); for (let x = xl; x <= xr; x++) pset(x, y, y === 129 || x === xl || x === xr ? K : y === 135 ? P.nogB : h(x >> 3, y, 886) < 0.3 ? P.nog : P.nogL); }
  // la máquina de escribir, de frente y pequeña
  c_maquina(R, 197, 115, 1);
  // las carpetas y la taza
  for (let k = 0; k < 3; k++) { rect(244, 131 - k * 2, 262, 132 - k * 2, K); rect(245, 131 - k * 2, 261, 131 - k * 2, k === 1 ? hex('#d8c08a') : hex('#e8d4a0')); rect(254 + k, 130 - k * 2, 258 + k, 130 - k * 2, hex('#d8c08a')); }
  rect(229, 126, 235, 132, K); rect(230, 127, 234, 131, C.blanco); rect(234, 127, 234, 131, hex('#c8c0b0')); rect(230, 127, 234, 127, hex('#6a3a1a')); pset(236, 128, K); pset(236, 130, K); pset(237, 129, K);
  c_vapor(R, 231, 125, t, 2, C.blanco, 14);
  // la lámpara de banquero y su luz
  c_banquero(R, 285, 133, 1, t);
  // el teléfono de disco
  rect(264, 127, 274, 133, K); rect(265, 128, 273, 132, hex('#2a2a2e')); rect(265, 128, 273, 128, hex('#5a5a62')); R.disco(269, 130, 2, hex('#e8e0cc')); pset(269, 130, K);
  rect(263, 124, 275, 126, K); rect(264, 124, 274, 125, hex('#3a3a42')); rect(264, 124, 274, 124, hex('#6a6a72'));
}

// la máquina de escribir de los sesenta (verde gris), de frente: la hoja con renglones sin letras, el rodillo con sus
// pomos, la palanca de carro, el cesto de tipos, cuatro filas de teclas redondas y la barra espaciadora; (x, y) la
// esquina de arriba a la izquierda de su caja de 30 × 20 unidades; s escala (1 o 3)
function c_maquina(R, x, y, s) {
  const P = c_P, K = C.k, q = (a, b, c, d, col) => R.rect(x + a * s, y + b * s, x + (c + 1) * s - 1, y + (d + 1) * s - 1, col);
  q(9, 0, 21, 7, K); q(10, 0, 20, 7, P.crema); q(20, 0, 20, 7, P.cremaS); if (s > 1) for (let r = 2; r < 7; r += 2) R.rect(x + 11 * s, y + r * s + 1, x + (11 + 6 + Math.floor(h(r, 1, 887) * 3)) * s, y + r * s + 1, hex('#8a8a9a'));
  q(4, 7, 26, 10, K); q(5, 8, 25, 9, hex('#1e1e22')); q(5, 8, 25, 8, hex('#4a4a52')); q(2, 7, 4, 10, K); q(3, 8, 3, 9, hex('#c8ccd4')); q(26, 7, 28, 10, K); q(27, 8, 27, 9, hex('#c8ccd4'));
  q(0, 6, 3, 7, K); q(1, 6, 3, 6, hex('#d8dce4'));
  for (let r = 11; r <= 20; r++) { const e = Math.round((r - 11) * 0.35); q(3 - e, r, 27 + e, r, K); }
  for (let r = 11; r <= 19; r++) { const e = Math.round((r - 11) * 0.35); q(4 - e, r, 26 + e, r, r < 13 ? P.maqL : r > 17 ? P.maqS : P.maq); }
  q(10, 11, 20, 12, hex('#26302c')); for (let i = 11; i < 20; i += 2) q(i, 12, i, 12, hex('#8a9a92'));
  for (const [r, a, b] of [[13, 6, 24], [15, 5, 25], [17, 6, 24]]) for (let i = a; i <= b; i += 2) { q(i, r, i, r, hex('#1a1a1e')); if (s > 1) R.pset(x + i * s, y + r * s, hex('#e8e4d8')); }
  q(9, 19, 21, 19, hex('#1a1a1e')); if (s > 1) R.rect(x + 9 * s, y + 19 * s, x + 22 * s - 1, y + 19 * s, hex('#5a5a62'));
}

// la lámpara de banquero: pantalla de cristal verde con su luz debajo, el brazo y el pie de latón, la cadenita; (cx, yb)
// la base, s escala; el resplandor sobre la mesa
function c_banquero(R, cx, yb, s, t) {
  const { rect, pset, poligono } = R, P = c_P, K = C.k, ys = yb - 13 * s;
  rect(cx - 6 * s, yb - 2 * s, cx + 6 * s, yb, K); rect(cx - 5 * s, yb - 2 * s + 1, cx + 5 * s, yb - 1, P.laton); rect(cx - 5 * s, yb - 2 * s + 1, cx + 5 * s, yb - 2 * s + 1, P.latonL);
  rect(cx - Math.floor(s / 2), ys + 2 * s, cx + Math.floor(s / 2), yb - 2 * s, P.latonS);
  rect(cx - 8 * s, ys - 4 * s, cx + 8 * s, ys + 1 * s, K);
  for (let y = ys - 4 * s + 1; y <= ys + s - 1; y++) for (let x = cx - 8 * s + 1; x <= cx + 8 * s - 1; x++) { const v = (y - ys + 4 * s) / (5 * s); pset(x, y, v < 0.3 ? P.banqL : (x - cx) / s > 4 ? P.banqS : P.banq); }
  for (let x = cx - 8 * s + 1; x <= cx + 8 * s - 1; x += 2 * s) pset(x, ys - 4 * s + 1, hex('#b8f0c8'));
  rect(cx - 8 * s, ys + s, cx + 8 * s, ys + s, P.laton); rect(cx - 7 * s, ys + s + 1, cx + 7 * s, ys + s + Math.max(1, s - 1), P.luzL);
  R.linea(cx + 5 * s, ys + s, cx + 5 * s, ys + 5 * s, P.latonS); pset(cx + 5 * s, ys + 5 * s + 1, P.laton);
  c_resplandor(R, cx, yb - s, 20 * s, P.luz, 0.35, 0.35);
}

// el ficus del primer plano en la esquina de abajo a la izquierda (cx, la base), que se mece
function c_ficus(R, cx, yb, t) {
  const { rect, disco, linea } = R, K = C.k, V = hex('#2e6a3a'), VS = hex('#1a4226'), VL = hex('#5aa04a');
  linea(cx, yb - 14, cx + 2, yb - 52, hex('#5a3e28')); linea(cx + 1, yb - 14, cx + 3, yb - 52, hex('#3a2818'));
  for (let k = 0; k < 11; k++) { const sw = Math.sin(t * 1.1 + k * 0.8) * 1.6, x = Math.round(cx + (h(k, 1, 890) - 0.5) * 26 + sw), y = Math.round(yb - 20 - h(k, 2, 890) * 40), a = h(k, 3, 890) * Math.PI;
    for (let i = -4; i <= 4; i++) { const w = Math.round(Math.sqrt(16 - i * i) * 0.55); const xx = x + Math.round(Math.cos(a) * i), yy = y + Math.round(Math.sin(a) * i); disco(xx, yy, w + 1, K); }
    for (let i = -4; i <= 4; i++) { const w = Math.round(Math.sqrt(16 - i * i) * 0.55); const xx = x + Math.round(Math.cos(a) * i), yy = y + Math.round(Math.sin(a) * i); disco(xx, yy, w, i < -1 ? VL : k & 1 ? V : VS); } }
  rect(cx - 11, yb - 14, cx + 11, yb, K); rect(cx - 10, yb - 13, cx + 10, yb, hex('#c8b89a')); rect(cx - 10, yb - 13, cx - 8, yb, hex('#e8dcc0')); rect(cx + 6, yb - 13, cx + 10, yb, hex('#9a8a6e'));
  for (let x = cx - 10; x <= cx + 10; x += 3) rect(x, yb - 8, x + 1, yb - 7, hex('#b8a888'));
}

// ENTREGA: suelo 160 (pies de Atom a escala 2 sobre la mesa; el tablero va de y 84 a 179), libre x 104–220;
// escritorio (papel del secante, libre para la ficha) 108–212 × 112–166; máquina de escribir x 226–316 × 60–123
// (la hoja, 253–291 × 60–83); fichero x 12–60 × 106–150; lámpara de banquero (pantalla 52–100 × 61–76, base en
// (76, 112)); taza 72–96 × 138–164; persiana 4–50 × 28–70; diploma 112–160 × 22–46; reloj regulador 194–218 × 0–64
function c_consultaCerca(R, t, o) {
  const P = c_P;
  c_fondoFijo(R, 'C_consultaCerca', () => c_consultaCercaFondo(R));
  c_persiana(R, t, 4, 28, 50, 70);
  c_pendulo(R, 206, 30, 22, t, 2);
  c_reloj(R, 206, 14, 7, t, 16.1, P.nogL);
  c_banquero(R, 76, 112, 3, t);
  c_rayasLuz(R, t, 1);
  c_vapor(R, 84, 140, t, 4, C.blanco, 22);
  c_motas(R, t, 40, 220, 10, 120, 18, P.sol, 6, (x, y) => c_enRaya(x * 0.6, y * 0.6, t));
  return { encuadre: 'consulta', camara: 'escritorio', suelo: 160, libre: [104, 220], escritorio: [108, 112, 212, 166], maquina: [271, 92], hoja: [253, 60, 291, 83], fichero: [36, 118], lampara: [76, 70] };
}

function c_consultaCercaFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = c_P, K = C.k;
  c_papelPintado(R, 0, 0, 319, 48, 2);
  rect(0, 48, 319, 52, P.nog); rect(0, 48, 319, 48, P.nogB); rect(0, 52, 319, 52, P.nogD);
  rect(0, 53, 319, 82, P.nogS); for (let x = -10, k = 0; x < 320; x += 44, k++) c_cuarteron(R, x, 56, x + 40, 80, P.nog, P.nogL, P.nogD, P.nogS, k + 30);
  // la ventana (marco; la persiana va en cada fotograma)
  rect(0, 22, 54, 74, K); rect(0, 23, 53, 73, hex('#e8e0cc')); rect(0, 23, 53, 23, C.blanco); rect(53, 23, 53, 73, hex('#b8ae96')); rect(0, 72, 58, 76, hex('#e8e0cc')); rect(0, 72, 58, 72, C.blanco); rect(0, 76, 58, 77, hex('#9a907a'));
  // un diploma grande y la caja del regulador
  c_diploma(R, 112, 22, 160, 46, 0);
  rect(194, 0, 218, 64, K); rect(195, 0, 217, 63, P.nog); rect(195, 0, 195, 63, P.nogL); rect(217, 0, 217, 63, P.nogD); rect(198, 26, 214, 60, K); rect(199, 27, 213, 59, hex('#3a2416')); rect(199, 27, 200, 59, hex('#5a3c26'));
  // el tablero del escritorio: nogal con vetas largas
  rect(0, 82, 319, 84, K);
  for (let y = 85; y < 180; y++) for (let x = 0; x < 320; x++) { const g = Math.sin(x * 0.015 + Math.sin(x * 0.04 + y * 0.03) * 1.8 + y * 0.35 / (1 + (y - 85) * 0.02)); pset(x, y, Math.abs(g) < 0.07 ? P.nogS : g > 0.9 ? P.nogL : y < 88 ? P.nogB : P.nog); }
  // las carpetas de detrás
  for (let k = 0; k < 4; k++) { const y = 104 - k * 3; rect(112, y, 162, y + 3, K); rect(113, y + 1, 161, y + 2, k & 1 ? hex('#d8c08a') : hex('#e8d4a0')); rect(140 + k * 4, y - 1, 150 + k * 4, y, k & 1 ? hex('#d8c08a') : hex('#e8d4a0')); }
  // el secante: marco de cuero con esquinas de latón y el papel verde
  poligono([[100, 108], [220, 108], [228, 172], [92, 172]], K); poligono([[101, 109], [219, 109], [226, 171], [94, 171]], hex('#4a2a1e'));
  poligono([[107, 112], [213, 112], [219, 167], [101, 167]], P.verdeP);
  for (let y = 113; y < 167; y++) for (let x = 100; x < 220; x++) if (h(x, y, 891) < 0.05 && R.pget(x, y) === P.verdeP) pset(x, y, P.verdePS);
  for (const [a, b, c] of [[[100, 108], [112, 108], [100, 118]], [[220, 108], [208, 108], [221, 118]], [[92, 172], [106, 172], [93, 160]], [[228, 172], [214, 172], [227, 160]]]) poligono([a, b, c], P.laton);
  // el fichero de madera con fichas de pestañas de colores, y fichas sueltas
  for (let k = 0; k < 9; k++) { const x = 18 + k * 4, hh = 10 + Math.round(h(k, 1, 892) * 4); rect(x, 120 - hh, x + 18, 122, K); rect(x + 1, 121 - hh, x + 17, 122, k & 1 ? P.crema : hex('#fbf4e2')); rect(x + 12, 119 - hh, x + 16, 121 - hh, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8b830'), hex('#3a9a5a')][k % 4]); for (let r = 124 - hh; r < 121; r += 3) rect(x + 3, r, x + 13, r, hex('#c8c0b0')); }
  rect(12, 120, 60, 150, K); rect(13, 121, 59, 149, P.roble); rect(13, 121, 59, 122, P.robleL); rect(57, 121, 59, 149, P.robleS); rect(30, 130, 42, 136, K); rect(31, 131, 41, 135, P.laton); rect(32, 132, 40, 134, P.crema); rect(33, 140, 39, 142, P.latonS);
  for (const [x, y, k] of [[66, 160, 0], [74, 166, 1]]) { for (let i = 0; i < 26; i++) { rect(x + i, y + Math.round(i * 0.15), x + i, y + 13 + Math.round(i * 0.15), i === 0 || i === 25 ? K : P.crema); pset(x + i, y + Math.round(i * 0.15), K); pset(x + i, y + 13 + Math.round(i * 0.15), K); } for (let r = 4; r < 12; r += 3) linea(x + 3, y + r, x + 22, y + r + 3, hex('#b8b0a0')); }
  // la taza con su plato
  disco(84, 152, 12, K); disco(84, 152, 11, hex('#e8e2d4')); disco(83, 151, 8, C.blanco);
  rect(75, 138, 93, 151, K); rect(76, 139, 92, 150, hex('#e8e2d4')); rect(76, 139, 78, 150, C.blanco); rect(89, 139, 92, 150, hex('#b8b0a0')); rect(76, 139, 92, 141, hex('#4a2a14')); rect(76, 139, 92, 139, hex('#7a4a2a'));
  for (let y = 142; y <= 148; y++) { pset(94, y, K); pset(95, y, hex('#d8d0c0')); pset(96, y, K); } rect(93, 142, 96, 142, K); rect(93, 148, 96, 148, K);
  // la pluma estilográfica sobre el secante (en el borde)
  for (let i = 0; i < 26; i++) { const x = 190 + i, y = 160 - Math.round(i * 0.45); rect(x, y, x, y + 1, i < 4 ? P.latonL : i < 6 ? P.laton : hex('#1e1e2a')); } pset(215, 148, K);
  // la máquina de escribir grande
  c_maquina(R, 226, 60, 3);
  c_sombra(R, 160, 176, 170, 6, 0.2);
  c_iluminar(R, [[30, 40, 260, 0.95], [76, 110, 100, 0.5]], 0.34, P.sol);
}

// el primer plano del estudio general: la esquina del sillón de orejas de terciopelo verde con su manta de rayas, y la
// mesita redonda con la taza que humea (abajo a la izquierda, x 0–58)
function c_sillon(R, t) {
  const { rect, pset, poligono, disco, linea } = R, P = c_P, K = C.k, V = hex('#2e5a4a'), VS = hex('#1e3e34'), VL = hex('#4a7a62');
  poligono([[0, 134], [14, 132], [26, 138], [30, 179], [0, 179]], K); poligono([[0, 135], [13, 133], [25, 139], [29, 179], [0, 179]], V);
  linea(1, 135, 13, 133, VL); linea(13, 133, 25, 139, VL); for (let y = 140; y < 179; y += 6) for (let x = 4 + ((y / 6) & 1) * 4; x < 24; x += 8) { pset(x, y, VS); pset(x + 1, y + 1, VL); }
  rect(0, 158, 34, 179, K); rect(0, 159, 33, 179, V); rect(0, 159, 33, 161, VL); disco(30, 164, 5, K); disco(30, 164, 4, V); disco(29, 163, 2, VL);
  for (let y = 146; y < 179; y++) { const x0 = 2 + Math.round((y - 146) * 0.2); for (let x = x0; x < x0 + 14; x++) pset(x, y, ((x + y) >> 2) & 1 ? hex('#c8923a') : ((x - y) >> 2) & 1 ? hex('#e2cc9a') : hex('#8a2a26')); pset(x0 - 1, y, K); pset(x0 + 14, y, K); }
  for (let x = 2; x < 20; x += 2) linea(x + 6, 178, x + 6, 179, hex('#e2cc9a'));
  // la mesita y la taza que humea
  rect(44, 160, 46, 179, K); rect(45, 160, 45, 179, P.nogL);
  for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3) ** 2 < 1) pset(45 + i, 157 + j, (i / 14) ** 2 + (j / 3) ** 2 > 0.75 ? K : j < 0 ? P.nogL : P.nog);
  rect(39, 147, 49, 155, K); rect(40, 148, 48, 154, hex('#e8e2d4')); rect(40, 148, 41, 154, C.blanco); rect(46, 148, 48, 154, hex('#b8b0a0')); rect(40, 148, 48, 149, hex('#7a4a2a')); rect(49, 149, 51, 150, K); rect(51, 150, 51, 153, K); rect(49, 153, 51, 153, K);
  c_vapor(R, 44, 146, t, 3, c_P.luzL, 20);
  rect(52, 152, 58, 155, K); rect(53, 152, 57, 154, hex('#a8343e')); rect(53, 152, 57, 152, hex('#d85a5a'));   // un libro
}

// humo o vapor en bocanadas gordas que se solapan (x, y: la boca): cada bocanada es una coliflor de bordes tramados con
// la luz arriba a la izquierda y la sombra abajo a la derecha; crecen, se tuercen con el viento y se deshacen por arriba.
// o: n, alto, viento, r (radio al salir), crece, v (velocidad), cols [sombra, cuerpo, luz] (humo gris por omisión), caja
function a_prVaho(R, x, y, t, tn, o = {}) {
  const B = R.buf, n = o.n ?? 10, alto = o.alto ?? 40, viento = o.viento ?? 16, r0 = o.r ?? 2, crece = o.crece ?? 6, v = o.v ?? 0.15, cj = o.caja;
  const [cS, c, cL] = (o.cols ?? [hex('#5e5e68'), hex('#8e8e98'), hex('#c4c4cc')]).map(tn);
  const L = []; for (let k = 0; k < n; k++) L.push([(t * v + k / n) % 1, k]); L.sort((a, b) => b[0] - a[0]);
  for (const [u, k] of L) { const cx = x + Math.pow(u, 1.3) * viento + Math.sin(u * 5 + k * 1.7 + t * 0.6) * (1 + u * 2), cy = y - u * alto, r = r0 + u * crece;
    for (let yy = Math.floor(cy - r * 1.2); yy <= cy + r * 1.2; yy++) for (let xx = Math.floor(cx - r * 1.2); xx <= cx + r * 1.2; xx++) {
      if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || a_prCalma(xx, yy)) continue; if (cj && (xx < cj[0] || xx > cj[2] || yy < cj[1] || yy > cj[3])) continue;
      const dx = xx + 0.5 - cx, dy = yy + 0.5 - cy, an = Math.atan2(dy, dx), rr = r * (1 + 0.16 * Math.sin(an * 3 + k * 2.1) + 0.08 * Math.sin(an * 5 + k)), d = Math.hypot(dx, dy) / rr; if (d > 1) continue;
      const um = a_prUm(xx, yy); if (d > 0.78 && um < (d - 0.78) * 4.5) continue; if (u > 0.55 && um < (u - 0.55) * 2.2) continue;
      const l = (-dx * 0.55 - dy * 0.85) / rr; B[yy * 320 + xx] = l > 0.3 ? cL : l < -0.35 ? cS : c; } }
}

// un pino de ramas en pisos (x centro, base, alto; pal [luz, cuerpo, sombra, oscuro]): cada piso cuelga con el borde
// mellado, la luz en el lado izquierdo, la sombra a la derecha y bajo cada piso; el tronco asoma abajo
function a_prPinoP(R, x, base, alto, [cL, c, cS, cK], tronco, sem) {
  const B = R.buf, pisos = Math.max(3, Math.round(alto / 7)), top = base - alto, tr = Math.max(1, Math.round(alto / 24));
  for (let y = base - Math.round(alto * 0.18); y <= base; y++) for (let i = 0; i <= tr; i++) { const xx = x + i; if (xx >= 0 && xx < 320 && y >= 0 && y < 180) B[y * 320 + xx] = i === 0 ? cS : tronco; }
  for (let y = Math.max(0, top); y <= base - Math.round(alto * 0.12); y++) { const f = (y - top) / alto, p = Math.min(pisos - 1, Math.floor(f * pisos)), v = f * pisos - p;
    const w = (0.6 + f * alto * 0.3) * (0.55 + 0.45 * v) + (h(y, sem, 77) - 0.5) * 1.6;
    for (let xx = Math.round(x - w); xx <= Math.round(x + 1 + w); xx++) { if (xx < 0 || xx > 319) continue; const s = (xx - x - 0.5) / (w + 0.5), um = a_prUm(xx, y);
      let k = s < -0.55 ? (v > 0.3 ? cL : c) : s > 0.4 ? (s > 0.8 && um < 0.4 ? cK : cS) : (s > 0.1 && um < 0.4 ? cS : c);
      if (v > 0.86 && Math.abs(s) < 0.7 && um < 0.45) k = cS; if (Math.abs(s) > 0.92 && h(xx, y, sem) < 0.4) continue; B[y * 320 + xx] = k; } }
}

// un pinar en una fila (base, de x0 a x1, n pinos de a0 a a1 px; pal [luz, cuerpo, sombra, oscuro]): los de detrás, más
// bajos; la sombra del sotobosque en la base; max(x): el alto máximo en cada x
function a_prPinar(R, base, x0, x1, n, a0, a1, sem, pal, max = () => 999) {
  const B = R.buf, L = [];
  for (let k = 0; k < n; k++) L.push([Math.round(x0 + h(k, 1, sem) * (x1 - x0)), base - Math.round(h(k, 5, sem) * 4), h(k, 2, sem)]);
  L.sort((a, b) => a[1] - b[1]);
  for (const [x, b, q] of L) { const al = Math.min(max(x), Math.round(a0 + q * (a1 - a0))); a_prPinoP(R, x, b, al, pal, pal[3], x + sem); }
  // el sotobosque: matas bajas de bordes mellados, más claras arriba, que tapan el pie de los troncos
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const a = 2 + Math.round(h(x >> 2, 1, sem + 9) * 3 + Math.sin(x * 0.3 + sem) * 1.5); for (let j = 0; j < a; j++) { const y = base + 1 - j; if (y < 0 || y >= 180) continue;
    B[y * 320 + x] = j === a - 1 ? (a_prUm(x, y) < 0.5 ? pal[1] : pal[0]) : j === a - 2 ? pal[1] : a_prUm(x, y) < 0.5 ? pal[2] : pal[1]; } }
}

// los pinos de la destilería por términos [luz, cuerpo, sombra, oscuro]: lejos, en medio y cerca
const a_prPINOS = [a_prH('#b0c4bc #94aca6 #7a948e #627c78'), a_prH('#86aa74 #64885a #4a6e48 #34543a'), a_prH('#76a058 #507c42 #36603a #22462a')];

// el pozo de acceso del depósito (a la izquierda, x 0–27): una torre de hormigón que baja desde la trampilla del techo,
// por donde entra la luz de la arena, hasta el andén (base en suelo); en su cara, la escalera de mano (largueros en x 8–9
// y 20–21, peldaños cada 7 px desde y 46, los mismos que repinta hm-arena), con sus grapas, y la sombra que echa a la derecha
function b_pozo(B, P, suelo) {
  const H = P.hormigon, T = P.tubo;
  // la sombra de la torre sobre la pared, el agua, la barandilla y el andén
  for (let y = 0; y <= suelo + 3; y++) for (let x = 28; x < 36; x++) { const a = (1 - (x - 28) / 8) * 0.55; if (b_um(x, y) < a * 1.6) b_pm(B, x, y, P.cueva[0], a); }
  for (let y = suelo + 1; y <= suelo + 4; y++) for (let x = 0; x < 44; x++) { const a = 0.5 * (1 - (y - suelo - 1) / 4) * (1 - x / 44); if (a > 0.04) b_pm(B, x, y, P.cueva[0], a); }
  // el fuste: anillos de hormigón con juntas, manchas de humedad y la luz de arriba que se apaga al bajar
  for (let y = 0; y <= suelo; y++) for (let x = 0; x <= 27; x++) {
    const anillo = y % 13, junta = anillo === 0, lab = anillo === 1, lado = x >= 25;
    let l = 2.7 - y / suelo * 1.1 + (h(x >> 1, y >> 1, 890) - 0.5) * 0.7 + (lab ? 0.8 : 0) - (junta ? 1.4 : 0) - (lado ? 1.2 + (x - 25) * 0.4 : 0) + (x < 2 ? -0.4 : 0);
    if (h(x >> 2, Math.floor(y / 13), 891) < 0.18 && anillo > 3 && anillo < 11) l -= 0.6;   // parches de humedad
    let c = H[Math.max(0, Math.min(4, Math.floor(l + b_um(x, y) * 0.7)))];
    if (!lado && h(x, 0, 892) < 0.08 && h(x, Math.floor(y / 13), 893) < 0.5 && anillo > 1) c = b_mez(c, P.oxido[1], 0.35);   // chorretones de óxido
    B[y * 320 + x] = c; }
  // la trampilla del techo: el hueco con la luz de la arena (verde y oro), la reja y los haces que bajan
  for (let y = 0; y <= 9; y++) for (let x = 3; x <= 19; x++) { const borde = x === 3 || x === 19 || y === 9, reja = (x - 3) % 4 === 0;
    b_ps(B, x, y, borde ? T[1] : reja ? T[2] : y < 3 ? P.amarillo[3] : y < 6 ? P.lampara[2] : b_mez(P.hierba[5], P.lampara[2], 0.5)); }
  for (let x = 2; x <= 20; x++) { b_ps(B, x, 10, T[4]); b_ps(B, x, 11, T[0]); }
  for (let y = 12; y < 96; y++) { const a = 0.42 * (1 - (y - 12) / 84); for (let x = 3 + Math.round((y - 12) * 0.05); x <= 19 - Math.round((y - 12) * 0.03); x++) if (b_um(x, y) < a * (0.6 + 0.4 * Math.sin(x * 1.3 + y * 0.05))) b_pm(B, x, y, P.lampara[2], a); }
  // la base: zócalo con la franja de aviso
  for (let y = suelo - 4; y <= suelo; y++) for (let x = 0; x <= 27; x++) b_ps(B, x, y, y === suelo - 4 ? H[4] : y === suelo ? H[0] : ((x + y) >> 2) % 2 ? P.amarillo[1] : P.cueva[1]);
  // la escalera de mano: largueros, grapas a la pared y peldaños gastados (el centro, más claro)
  for (let y = 2; y < suelo; y++) for (const xr of [8, 20]) { b_ps(B, xr, y, T[0]); b_ps(B, xr + 1, y, T[4]); }
  for (let y = 2; y < suelo; y += 26) for (const xg of [6, 22]) { b_ps(B, xg, y, T[3]); b_ps(B, xg + 1, y, T[2]); b_ps(B, xg, y + 1, T[1]); b_ps(B, xg + 1, y + 1, T[1]); }
  for (let y = 4; y < suelo; y += 7) for (let x = 10; x <= 19; x++) { b_ps(B, x, y, x > 12 && x < 17 ? T[5] : T[4]); b_ps(B, x, y + 1, P.cueva[0]); }
  // dos flechas de chapa que señalan hacia abajo, en la cara de la torre
  for (const fy of [60, 112]) for (let j = 0; j < 4; j++) { b_ps(B, 23, fy + j, P.amarillo[2]); b_ps(B, 24, fy + j + 1, P.amarillo[1]); }
}

// roca de acantilado en facetas (bloques partidos con su cara de luz arriba a la derecha, grietas oscuras entre ellos,
// estratos ocres y violetas inclinados, musgo en los rellanos y chorretones); de y0 a y1, en x de xa(y) a xb(y);
// cw × ch el tamaño de los bloques; niebla(y) (0–1) la funde con la niebla del vacío
function b_rocaFacetas(B, P, y0, y1, xa, xb, sem, cw = 13, ch = 9, niebla = null) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const x0 = Math.max(0, xa(y)), x1 = Math.min(319, xb(y)), nb = niebla ? niebla(y) : 0;
    for (let x = x0; x <= x1; x++) {
      const yy = y + x * 0.12, gx = Math.floor(x / cw), gy = Math.floor(yy / ch);
      let d1 = 1e9, d2 = 1e9, id = 0, px = 0, py = 0;
      for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const cx = gx + i, cy = gy + j, qx = (cx + 0.15 + h(cx, cy, sem) * 0.7) * cw, qy = (cy + 0.15 + h(cx, cy, sem + 1) * 0.7) * ch, d = Math.hypot(x - qx, (yy - qy) * 1.3);
        if (d < d1) { d2 = d1; d1 = d; id = cx * 131 + cy; px = qx; py = qy; } else if (d < d2) d2 = d; }
      const banda = Math.floor(yy / 22), sep = d2 - d1;
      let l = 2.3 + (h(id, 0, sem + 2) - 0.5) * 1.3 + (h(banda, 0, sem + 3) - 0.5) * 0.6 + (x - px) / cw * 0.6 - (yy - py) / ch * 0.8 + (h(x, y, sem + 7) - 0.5) * 0.5;
      if (sep < 1.1) l -= 1.9; else if (sep < 2.3 && yy < py) l += 0.8;
      if (x1 - x < 2) l += 0.9;
      if (h(x >> 1, 0, sem + 4) < 0.06 && y > y0 + h(x >> 1, 1, sem + 4) * 50) l -= 0.7;   // chorretones de humedad
      let c = P.roca[Math.max(0, Math.min(4, Math.floor(l + b_um(x, y) * 0.7 - 0.2)))];
      if (h(banda, 1, sem + 6) < 0.4) c = b_mez(c, P.tierra[2], 0.22);
      if (sep >= 1.1 && yy - py < -ch * 0.22 && h(id, 1, sem + 5) < 0.42 && b_um(x, y) < 0.75) c = P.musgo[1 + (yy - py < -ch * 0.38 ? 2 : 1) - (h(x, y, sem + 8) < 0.3 ? 1 : 0)];
      if (nb > 0) c = b_mez(c, P.niebla[1], Math.min(0.9, nb));
      B[y * 320 + x] = c; } }
}

// el vacío hondo: la niebla que sube (clara arriba, azul abajo, con jirones), agujas de roca que asoman veladas a varias
// distancias y, muy abajo, copas de un bosque hundido en la bruma; desde y0, en las x de xs(y) en adelante; picos:
// [[x, cima, ancho, velo]…]. Devuelve la máscara del vacío (lo que se pinte encima se le quita con b_recorta)
function b_vacioHondo(B, P, y0, xs, picos, sem) {
  const N = [b_mez(P.cielo[7], P.niebla[3], 0.4), P.niebla[2], P.niebla[1], b_mez(P.niebla[0], P.cielo[3], 0.3), b_mez(P.niebla[0], P.cielo[1], 0.5)], M = new Uint8Array(57600);
  const fondo = (y) => N[Math.max(0, Math.min(4, Math.floor((y - y0) / (179 - y0) * 4.2)))];
  for (let y = y0; y < 180; y++) for (let x = Math.max(0, xs(y)); x < 320; x++) { const u = (y - y0) / (179 - y0), banda = Math.sin(y * 0.35 + Math.sin(x * 0.03) * 2) > 0.7 ? -0.7 : 0;
    B[y * 320 + x] = N[Math.max(0, Math.min(4, Math.floor(u * 4.2 + banda + (h(x >> 3, y >> 1, sem) - 0.5) * 0.6 + b_um(x, y) * 0.8)))]; M[y * 320 + x] = 1; }
  // las agujas de roca, de la más lejana a la más cercana: cara de luz a la derecha, estratos, un arbolito en la cima
  for (const [cx, top, w, velo] of picos) {
    for (let y = top; y < 180; y++) { const k = Math.min(1, (y - top) / (w * 2.2)), hw = w * (0.3 + 0.7 * k) + (h(y >> 1, cx, sem + 1) - 0.5) * 2.2 + Math.sin(y * 0.4 + cx) * 0.8;
      for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) { if (x < 0 || x > 319 || !M[y * 320 + x]) continue;
        const v = (x - cx) / Math.max(1, hw), est = Math.sin(y * 0.7 + x * 0.15) > 0.8 ? -0.8 : 0;
        let c = P.roca[Math.max(0, Math.min(4, Math.floor((v > 0.1 ? 3.1 : v > -0.5 ? 2 : 1.2) + est + (h(x >> 1, y >> 1, sem + 2) - 0.5) * 0.9 + b_um(x, y) * 0.6)))];
        if (y - top < 3 && h(x, 0, sem + 3) < 0.6) c = P.musgo[2];
        B[y * 320 + x] = b_mez(c, fondo(y), Math.min(0.92, velo + (y - top) / (180 - top) * 0.45)); } }
    for (let j = 0; j < 7; j++) for (let i = -Math.floor(j / 2); i <= Math.floor(j / 2); i++) b_pm(B, cx + 1 + i, top - 7 + j, P.bosque[i < 0 ? 3 : 2], 1 - velo * 0.9); }
  // el bosque hundido, abajo del todo, casi borrado por la bruma
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, sem + 4) * 330), r = 5 + Math.round(h(k, 2, sem + 4) * 4), y = 176 + Math.round(h(k, 3, sem + 4) * 6);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const xx = x + i, yy = y + j; if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || !M[yy * 320 + xx] || i * i + j * j * 1.2 > r * r) continue;
      B[yy * 320 + xx] = b_mez(P.bosqueL[(i + j < 0 ? 2 : 1) + (h(xx >> 1, yy >> 1, sem + 5) < 0.3 ? 1 : 0)], fondo(yy), 0.55); } }
  // jirones claros que cruzan a distintas alturas
  for (let k = 0; k < 5; k++) { const yb = y0 + 6 + k * Math.round((179 - y0) / 5.5);
    for (let y = yb; y < yb + 3; y++) for (let x = 0; x < 320; x++) { if (!M[y * 320 + x]) continue; const w = Math.sin(x * 0.025 + k * 2.1) + Math.sin(x * 0.07 + k) * 0.4 - Math.abs(y - yb - 1) * 0.4; if (w > 0.45 && b_um(x, y) < (w - 0.45) * 1.4) B[y * 320 + x] = b_mez(B[y * 320 + x], P.niebla[3], 0.6); } }
  return M;
}

// la polilla que da vueltas a la pantalla de la lámpara (centro cx, cy; radios rx, ry): cuerpo claro y alas que
// baten, con un respiro en que se posa y vuelve a arrancar; k desfasa
function c_polilla(R, t, cx, cy, rx, ry, k = 0) {
  const u = t * 1.9 + k, posa = ((t + k * 3) % 9) < 1.4, a = posa ? 1.2 : u + Math.sin(u * 2.3) * 0.5;
  const x = Math.round(cx + Math.cos(a) * rx + (posa ? 0 : Math.sin(u * 5.1) * 2)), y = Math.round(cy + Math.sin(a) * ry + (posa ? 0 : Math.cos(u * 4.3) * 2));
  const ala = !posa && Math.sin(t * 34 + k) > 0, CL = hex('#e8dcb8'), CS = hex('#a89870');
  R.pset(x, y, CS); R.pset(x + 1, y, CL);
  if (ala) { R.pset(x - 1, y - 1, CL); R.pset(x + 2, y - 1, CL); R.pset(x, y - 1, CS); } else { R.pset(x - 1, y, CS); R.pset(x + 2, y, CS); R.pset(x - 1, y + 1, CL); R.pset(x + 2, y + 1, CL); }
}

// el péndulo de Newton (x0 el pie izquierdo, yb la base; 15 × 12 px): base de nogal, el pórtico de latón y cinco bolas
// de acero colgadas de sus hilos; la de la punta sale, choca y sale la del otro lado (por t)
function c_newton(R, x0, yb, t) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, yt = yb - 11, ph = Math.sin(t * 3.4), A = Math.abs(ph) * 0.55;
  rect(x0, yb - 1, x0 + 14, yb, K); rect(x0 + 1, yb - 1, x0 + 13, yb - 1, P.nogL);
  rect(x0 + 1, yt, x0 + 1, yb - 2, P.latonS); rect(x0 + 13, yt, x0 + 13, yb - 2, P.latonS); rect(x0 + 1, yt, x0 + 13, yt, P.laton); pset(x0 + 1, yt, P.latonL); pset(x0 + 13, yt, P.latonL);
  for (let i = 0; i < 5; i++) { const px = x0 + 3 + i * 2, sale = (i === 0 && ph < 0) || (i === 4 && ph > 0), ang = sale ? (i === 0 ? -A : A) : 0;
    const bx = Math.round(px + Math.sin(ang) * 7), by = Math.round(yt + 1 + Math.cos(ang) * 7);
    linea(px, yt + 1, bx, by - 1, hex('#c8c0b0')); R.rect(bx, by - 1, bx + 1, by, hex('#9aa4b0')); pset(bx, by - 1, hex('#e8eef4')); pset(bx + 1, by, hex('#5a6470')); }
}

// la balda de pared del estudio (cámara de la mesa; x 154–190, la tabla en y 46): escuadras de hierro, tres libros de
// pie y uno apoyado (lomos sin letras, con bandas), y un cactus en su maceta; el péndulo de Newton (x 169) va aparte
function c_baldaPared(R) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  for (const x of [158, 186]) { linea(x, 48, x, 56, K); linea(x, 56, x - 5, 49, K); pset(x, 52, hex('#5a5a62')); }   // las escuadras
  for (const [x, w, hh, c] of [[156, 3, 13, hex('#2e5a8a')], [160, 3, 11, hex('#8a2e2e')], [164, 2, 12, hex('#3a6a3a')]]) {
    rect(x - 1, 45 - hh, x + w, 45, K); rect(x, 46 - hh, x + w - 1, 45, c); rect(x, 46 - hh, x, 45, c_mezcla(c, C.blanco, 0.3)); rect(x, 49 - hh, x + w - 1, 49 - hh, P.laton); rect(x, 42, x + w - 1, 42, P.laton); }
  linea(167, 45, 170, 36, K); linea(168, 45, 171, 36, hex('#c8963a')); linea(169, 45, 172, 37, K);   // el libro apoyado (tapado por el péndulo)
  rect(153, 46, 191, 48, K); rect(154, 46, 190, 47, P.roble); rect(154, 46, 190, 46, P.robleL);   // la tabla
  rect(184, 39, 189, 45, K); rect(185, 40, 188, 45, hex('#b45a34')); rect(185, 40, 188, 40, hex('#dc8a5a'));   // la maceta
  rect(185, 33, 187, 39, K); rect(186, 33, 186, 39, hex('#4a8a4a')); pset(184, 36, K); pset(188, 35, K); pset(184, 35, hex('#4a8a4a')); pset(188, 34, hex('#4a8a4a')); pset(186, 32, hex('#f08aa0'));
  for (let x = 154; x <= 190; x++) c_tinte(R, x, 49, P.sombra, 0.35);
}

// la pila de libros tumbados al fondo de la mesa, con el tintero y la pluma encima (x0 a la izquierda, yb la base)
function c_pilaLibros(R, x0, yb) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k;
  const L = [[0, 24, hex('#6a2a3a')], [2, 21, hex('#2e4a6a')], [1, 22, hex('#5a6a2a')]];
  let y = yb;
  for (const [dx, w, c] of L) { const hh = 5; rect(x0 + dx, y - hh, x0 + dx + w, y, K); rect(x0 + dx + 1, y - hh + 1, x0 + dx + w - 1, y - 1, c);
    rect(x0 + dx + 1, y - hh + 1, x0 + dx + w - 1, y - hh + 1, c_mezcla(c, C.blanco, 0.3)); rect(x0 + dx + w - 4, y - hh + 1, x0 + dx + w - 1, y - 1, P.crema); for (let yy = y - hh + 2; yy < y; yy += 1) pset(x0 + dx + w - 3, yy, P.cremaS);
    rect(x0 + dx + 4, y - hh + 2, x0 + dx + 5, y - 2, P.laton); y -= hh; }
  // el tintero de cristal oscuro con la tapa de latón y la pluma
  const tx = x0 + 9; rect(tx - 4, y - 7, tx + 4, y, K); rect(tx - 3, y - 6, tx + 3, y - 1, hex('#1e2a4a')); pset(tx - 2, y - 5, hex('#6a7ab8')); pset(tx - 2, y - 4, hex('#4a5a98'));
  rect(tx - 2, y - 9, tx + 2, y - 7, K); rect(tx - 1, y - 9, tx + 1, y - 8, P.laton);
  linea(tx + 1, y - 9, tx + 9, y - 24, hex('#e8e0d0')); linea(tx + 2, y - 10, tx + 10, y - 24, hex('#c8c0b0'));
  for (let i = 0; i < 9; i++) { const px = tx + 4 + Math.round(i * 0.6), py = y - 14 - i; pset(px + 1, py, hex('#f4ece0')); pset(px + 2, py, hex('#d8d0c0')); if (i % 3 === 0) pset(px + 3, py, hex('#c8c0b0')); }
  c_sombra(R, x0 + 13, yb + 1, 14, 2, 0.4);
}

// el tarro de cristal de gominolas de colores (cx, yb la base): tapa de corcho, el cristal con su reflejo y el montón
// de gominolas que se ve dentro
function c_tarroGominolas(R, cx, yb) {
  const { rect, pset } = R, P = c_P, K = C.k, w = 9, yt = yb - 22, cols = [hex('#e84a4a'), hex('#f0c040'), hex('#5ab84a'), hex('#e87ab8'), hex('#f08a3a'), hex('#7a9ae8')];
  c_sombra(R, cx + 2, yb + 1, 12, 2, 0.45);
  for (let y = yt + 4; y <= yb; y++) { const ww = y === yb ? w - 1 : w; pset(cx - ww - 1, y, K); pset(cx + ww + 1, y, K);
    for (let x = cx - ww; x <= cx + ww; x++) { if (y > yt + 9) { const g = h(Math.floor((x + 40) / 3), Math.floor((y + (x & 1)) / 3), 990); const c = cols[Math.floor(g * 6)]; pset(x, y, ((x + y) % 3) === 0 ? c_mezcla(c, K, 0.3) : (x + y) % 3 === 1 ? c_mezcla(c, C.blanco, 0.35) : c); }
      else c_tinte(R, x, y, hex('#dff0ff'), 0.25); } }
  rect(cx - w - 1, yb, cx + w + 1, yb, K);
  rect(cx - w + 1, yt + 1, cx + w - 1, yt + 4, K); rect(cx - w + 2, yt + 1, cx + w - 2, yt + 3, hex('#b88a5a')); rect(cx - w + 2, yt + 1, cx + w - 2, yt + 1, hex('#dcae7a')); for (let x = cx - w + 3; x < cx + w - 2; x += 3) pset(x, yt + 2, hex('#8a5a3a'));
  for (let y = yt + 6; y < yb - 2; y++) { if (y % 7 === 3) continue; c_tinte(R, cx - w + 2, y, C.blanco, 0.6); } c_tinte(R, cx + w - 1, yt + 7, C.blanco, 0.5); c_tinte(R, cx + w - 1, yt + 8, C.blanco, 0.5);
}

// los papeles sueltos de delante (cámara de la mesa): dos hojas cruzadas con renglones, una con un gráfico de barras
// y su clip de latón, la regla con sus marcas y dos bolas de papel arrugado
function c_papelesMesa(R) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  const hoja = (x0, y0, w, hh, k, fn) => { for (let j = 0; j <= hh; j++) for (let i = 0; i <= w; i++) { const x = x0 + i + Math.round(j * k), y = y0 + j - Math.round(i * k * 0.5);
    pset(x, y, i === 0 || j === 0 || i === w || j === hh ? K : fn(i, j)); } c_sombra(R, x0 + Math.round(w / 2) + 2, y0 + hh + 2, Math.round(w / 2), 2, 0.3); };
  hoja(178, 160, 30, 18, 0.12, (i, j) => j % 3 === 0 && i > 2 && i < 28 ? hex('#a8b4c8') : i < 2 ? hex('#e8a0a0') : P.crema);
  hoja(198, 157, 28, 20, -0.08, (i, j) => { const b = [8, 13, 6, 16, 11]; for (let k = 0; k < 5; k++) if (i >= 4 + k * 5 && i <= 6 + k * 5 && 18 - j <= b[k] * 0.8 && j < 18) return k === 3 ? hex('#d8443a') : hex('#4a7ab8'); return j === 18 && i > 2 ? hex('#7a7a80') : hex('#f8f0dc'); });
  rect(222, 154, 223, 161, P.latonS); rect(224, 154, 224, 160, P.laton); pset(223, 154, P.latonL);   // el clip
  // la regla de madera con sus marcas
  for (let i = 0; i < 46; i++) { const x = 238 + i, y = 172 - Math.round(i * 0.18); rect(x, y - 3, x, y + 1, K); rect(x, y - 2, x, y, hex('#e0b860')); if (i % 4 === 0) pset(x, y - 2, hex('#6a4a1a')); if (i % 8 === 0) pset(x, y - 1, hex('#6a4a1a')); pset(x, y, hex('#b88a3a')); }
  for (const [x, y] of [[118, 176], [292, 170]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, P.crema); pset(x - 1, y - 1, C.blanco); pset(x + 1, y, P.cremaS); pset(x, y + 1, P.cremaS); pset(x - 2, y + 1, P.cremaS); c_sombra(R, x + 1, y + 4, 5, 1, 0.3); }
}

// el cable de la lámpara (cámara de la mesa): sale de la base (282, 124) y cae por detrás hasta el borde derecho
function c_cableLampara(R) {
  for (let x = 290; x <= 319; x++) { const y = Math.round(123 + Math.sin((x - 290) / 29 * Math.PI) * 3 + (x - 290) * 0.12); R.pset(x, y, C.k); R.pset(x, y - 1, hex('#5a3a28')); }
}

// la taza de té de la cámara de la mesa (294–314 × 140–158; la escena no la toca): loza con su asa y el té; va en el
// fondo y otra vez en estudioDelante, para que Atom pase por detrás
function c_tazaMesa(R) {
  const K = C.k;
  R.rect(296, 140, 314, 158, K); R.rect(297, 141, 313, 157, hex('#e8e2d4')); R.rect(297, 141, 299, 157, C.blanco); R.rect(310, 141, 313, 157, hex('#b8b0a0')); R.rect(297, 140, 313, 142, hex('#7a4a2a')); R.rect(297, 140, 313, 140, hex('#a86a3a'));
  for (let y = 145; y <= 153; y++) { R.pset(294, y, K); R.pset(295, y, hex('#d8d0c0')); } R.rect(294, 145, 296, 145, K); R.rect(294, 153, 296, 153, K);
  for (let x = 298; x < 312; x += 4) R.pset(x, 150, hex('#4a6aa8'));
  R.rect(297, 157, 313, 157, hex('#a8a090'));
}

// la ratonera del zócalo (estudio general; el agujero en x 137–143, y 122–127): de vez en cuando asoma el ratón, mira,
// mueve los bigotes y se vuelve a meter
function c_raton(R, t) {
  const { pset, rect } = R, K = C.k, x0 = 137;
  rect(x0 + 1, 123, x0 + 5, 127, K); rect(x0 + 2, 122, x0 + 4, 122, K); pset(x0, 127, hex('#2e1a10')); pset(x0 + 6, 127, hex('#2e1a10'));
  const u = t % 11, sale = u < 0.5 ? u / 0.5 : u < 3.4 ? 1 : u < 3.8 ? (3.8 - u) / 0.4 : 0;
  if (sale <= 0) { if (Math.sin(t * 2.3) > 0.7) { pset(x0 + 2, 125, hex('#f0e070')); pset(x0 + 4, 125, hex('#f0e070')); } return; }
  const G = hex('#8a8a96'), GS = hex('#5a5a66'), dx = Math.round(sale * 4), mira = u > 1.6 && u < 2.6 ? 1 : 0;
  R.recorte([x0 + 1, 120, x0 + 12, 128]);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5 - (j === 0 ? 1 : 0); i++) pset(x0 + 1 + i + dx - 1, 124 + j, j === 3 ? GS : G);
  pset(x0 + 1 + dx, 123, GS); pset(x0 + 2 + dx, 122, hex('#e8a0b0')); pset(x0 + 2 + dx, 123, K);   // la oreja
  pset(x0 + 4 + dx, 125, (t * 3) % 4 < 0.2 ? GS : K);   // el ojo, que parpadea
  pset(x0 + 5 + dx, 126 - mira, hex('#f08a9a'));   // el hocico
  const bg = Math.sin(t * 20) > 0 ? 0 : 1; pset(x0 + 6 + dx, 125 + bg - mira, hex('#d8d8e0')); pset(x0 + 6 + dx, 127 - mira, hex('#d8d8e0'));
  R.recorte(null);
}

// la papelera de mimbre con bolas de papel arrugado (cx, yb la base) y una bola que no entró, en el suelo
function c_papelera(R, cx, yb) {
  const { rect, pset, disco } = R, P = c_P, K = C.k, w = 8, hh = 15, yt = yb - hh;
  c_sombra(R, cx + 2, yb + 1, 11, 2, 0.5);
  for (const [dx, dy] of [[-4, -1], [2, -2], [-1, -4], [5, 0]]) { disco(cx + dx, yt + dy, 3, K); disco(cx + dx, yt + dy, 2, P.crema); pset(cx + dx - 1, yt + dy - 1, C.blanco); pset(cx + dx + 1, yt + dy, P.cremaS); }
  for (let y = yt; y <= yb; y++) { const v = (y - yt) / hh, ww = Math.round(lerp(w, w - 2, v)); rect(cx - ww - 1, y, cx + ww + 1, y, K);
    for (let x = cx - ww; x <= cx + ww; x++) pset(x, y, y === yt ? P.mimbreL : ((Math.floor((x - cx + 40) / 2) + Math.floor((y - yt) / 2)) & 1) ? P.mimbreS : x > cx + ww - 2 ? P.mimbreS : P.mimbre); }
  rect(cx - w - 1, yt - 1, cx + w + 1, yt - 1, K);
  disco(cx - 15, yb - 1, 3, K); disco(cx - 15, yb - 1, 2, P.crema); pset(cx - 16, yb - 2, C.blanco); pset(cx - 14, yb - 1, P.cremaS); c_sombra(R, cx - 14, yb + 2, 4, 1, 0.4);
}

// la pila de libros en el suelo, al pie de la estantería (x0 a la izquierda, yb la base): tres tomos tumbados y uno
// abierto boca abajo encima
function c_librosSuelo(R, x0, yb) {
  const { rect, pset, poligono } = R, P = c_P, K = C.k; let y = yb;
  c_sombra(R, x0 + 9, yb + 1, 12, 2, 0.5);
  for (const [dx, w, c] of [[0, 18, hex('#3a4a7a')], [2, 15, hex('#7a3a2a')], [1, 16, hex('#4a6a3a')]]) { rect(x0 + dx, y - 4, x0 + dx + w, y, K); rect(x0 + dx + 1, y - 3, x0 + dx + w - 1, y - 1, c); rect(x0 + dx + 1, y - 3, x0 + dx + w - 1, y - 3, c_mezcla(c, C.blanco, 0.3)); rect(x0 + dx + w - 3, y - 3, x0 + dx + w - 1, y - 1, P.crema); pset(x0 + dx + 4, y - 2, P.laton); y -= 4; }
  poligono([[x0 + 1, y + 1], [x0 + 9, y - 4], [x0 + 17, y + 1]], K); poligono([[x0 + 3, y], [x0 + 9, y - 3], [x0 + 15, y]], hex('#c8a040')); pset(x0 + 9, y - 3, P.crema);
}
