// Fontanería y decorados del episodio 12 (huracanes y tornados) en el estilo canónico pixel chibi, al nivel de
// episodios/ESTANDAR.md. Ocho decorados: A el aeródromo de Bryan (1943), B dentro del huracán y el ojo, C la máquina de
// calor, D Galveston (1900), E ojos en el cielo (la órbita y la sala de pronóstico), F el taller de Saffir (1971), G las
// Grandes Llanuras y el laboratorio de Fujita en Chicago, H hoy (el centro de huracanes, el P-3 y la costa del golfo).
// Más el mapa de papel de EE. UU. (ov-mapas.js). Reutiliza del episodio 10 la paleta, rodar, la mano y la silla.
//
//   import * as T from '/atomo/plato/escenas/hu-comun.js';
//   const { E, R, M } = await T.preparar('hu-gancho');
//   T.rodar(E, R, [[0, (t) => T.aerodromo(R, t)]], { año: 1943 });
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
    // el amarillo de entrenamiento de los AT-6 de 1943 y el azul del fuselaje
    at6: '#f0c030', at6S: '#c8941c', at6L: '#f8e070', at6A: '#2a4a8a', at6AS: '#1e3468',
    // el huracán: nubes de tormenta, lluvia y el sol del ojo
    nubeT0: '#e8ecf4', nubeT1: '#c4ccdc', nubeT2: '#98a2b8', nubeT3: '#6a7490', nubeT4: '#454c66', lluvia: '#a8b8d0', lluviaS: '#7a8aa8',
    // el mar caliente del trópico
    tropico0: '#5ad0d8', tropico1: '#2aa8c0', tropico2: '#1a7ea0', tropico3: '#145c80', calor: '#f07a3a', calorL: '#f8b060',
    // Galveston 1900: madera pintada de las casas victorianas
    victR: '#c8604a', victRS: '#9a4636', victA: '#7aa0b8', victAS: '#56788e', victC: '#e8dcc0', victCS: '#c4b494', victV: '#8ab07a', victVS: '#5e8456',
    // el centro de huracanes y las pantallas de hoy
    pantalla: '#0e1a2e', pantallaL: '#3ac8e8', noaa: '#2a4a8a', noaaL: '#4a7ac8',
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
  const E = await escena(id, 'ep12');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el barómetro (a ciegas) y el avión (cazarlos); el satélite ya está en el kit
  Object.assign(R.ICONOS, {
    barometro: ['..###..', '.#.#.#.', '#..#..#', '#..##.#', '#.....#', '.#####.', '...#...'],
    avion: ['...#...', '...#...', '.#####.', '#######', '...#...', '..###..', '.......'],
  });
  // la barra de tiempo: a ciegas (1900–1942), cazarlos (1943–1959) y verlos venir (1960–2026)
  R.tramosTiempo([[1900, 1942, R.PALA.ORO, 'barometro'], [1943, 1959, R.PALA.AZUL, 'avion'], [1960, 2026, R.PALA.ROJO, 'satelite']]);
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
  bryan: [-96.37, 30.67], galveston: [-94.80, 29.30], chicago: [-87.63, 41.88], miami: [-80.19, 25.76],
  destin: [-86.50, 30.39], biloxi: [-88.89, 30.40], rodanthe: [-75.47, 35.59], gulfShores: [-87.70, 30.25],
  pensilvania: [-77.2, 40.9], llanuras: [-97.5, 36.5], oklahoma: [-97.5, 35.5], kansas: [-98.3, 38.5],
};
// zonas del mapa: [zoom, centro]
const ZONAS = { eeuu: [1, [-96, 37.5]], golfo: [2.6, [-88.5, 29.5]], texas: [4.2, [-95.4, 29.8]], carolina: [5, [-76.4, 35.6]], llanuras: [1.9, [-96.5, 36]], sureste: [2.2, [-83, 33.5]] };
// el mapa de papel de EE. UU. Con o.zona ('eeuu', 'golfo', 'texas', 'carolina', 'llanuras', 'sureste') encuadra una zona;
// con o.desde y o.u (0–1) va de una zona a otra. Devuelve la proyección (P([lon, lat]) → [x, y]) para las chinchetas
export function mapa(R, t, o = {}) {
  const a = ZONAS[o.desde ?? o.zona ?? 'eeuu'], b = ZONAS[o.zona ?? 'eeuu'], u = o.desde ? Math.max(0, Math.min(1, o.u ?? 0)) : 1, e = u * u * (3 - 2 * u);
  const P = albersEEUU([20, 14, 300, 170], { zoom: lerp(a[0], b[0], e), centro: [lerp(a[1][0], b[1][0], e), lerp(a[1][1], b[1][1], e)] });
  mapaPapel(R, t, P, { eeuu: true, rosa: [44, 150], mesa: 6 }); return P;
}

// ══ Los decorados: primera versión de cada uno. Cada función pinta los 320 × 180 píxeles en cada fotograma ══════════
// (ESTANDAR.md). Las cabeceras dicen lo que se ve y sus opciones; las escenas ponen a los personajes con R.actor.

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado y unas bandas, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── A · el aeródromo de Bryan, Texas (julio de 1943) ──────────────────────────────────────────────────────────────────
// Bryan Army Air Field por la mañana: el cielo de verano de Texas con la tormenta que asoma en el horizonte (o.tormenta
// 0–1: de un muro gris lejano a nubes negras que tapan medio cielo, con rayos lejanos), el hangar de arcos con su puerta
// abierta y mecánicos dentro, la torre de control de madera, la manga de viento que se hincha con las rachas, la fila de
// avionetas AT-6 amarillas aparcadas, el surtidor y el camión cisterna, bidones, la pista de hormigón con sus juntas y la
// hierba seca que se mece. o.encuadre: 'general' (por defecto), 'hangar' (más cerca, el hangar y dos avionetas) o
// 'pista' (la pista hacia la tormenta, para el despegue). El suelo donde se plantan los personajes: y ≈ 146–160
export function aerodromo(R, t, o = {}) { provisional(R, t, C.cielo1 ?? hex('#8ac0e0'), hex('#c8b070')); }
// la avioneta de entrenamiento AT-6 «Texan» de perfil: fuselaje amarillo con el capó azul, la cabina larga de dos
// plazas con su cubierta de cristal (o.abierta), la estrella de la USAAF, el tren fijo, la hélice que gira (o.helice
// 0–1, la velocidad) y el escape. x, y: el punto donde las ruedas tocan el suelo; o.dir ±1; o.s 1 (unos 46 px de largo)
// o 2 (plano medio, con los dos pilotos pequeños en la cabina: o.piloto, o.copiloto = definiciones del elenco); o.inclina
// (radianes, para despegar o sacudirse); o.vuelo true quita la sombra del suelo
export function at6(R, x, y, t, o = {}) { R.rect(x - 20, y - 10, x + 20, y - 4, C.at6); }

// ── B · dentro del huracán y el ojo ───────────────────────────────────────────────────────────────────────────────────
// Dentro de la pared del huracán: muros de nubes oscuras que pasan deprisa en varias capas, cortinas de lluvia en
// diagonal que se mueven, rachas, relámpagos que encienden las nubes por dentro, gotas que golpean (para poner encima la
// avioneta sacudida). o.oscuro 0–1; o.claro 0–1 (se abre hacia el ojo: la luz que entra por un lado)
export function tormentaDentro(R, t, o = {}) { provisional(R, t, hex('#454c66'), hex('#6a7490')); }
// El ojo del huracán: un estadio de nubes blancas con paredes que giran despacio, el sol arriba en un cielo azul limpio,
// y abajo, según o.suelo: 'texas' (el campo de Texas de 1943: parcelas, caminos, un pueblo y un río, con las sombras de
// las nubes) o 'mar' (el mar en calma con su brillo). Pájaros que viajan dentro del ojo dando vueltas. o.vista: 'dentro'
// (por defecto, desde la avioneta, con la pared al fondo) o 'arriba' (el ojo desde lo alto, la espiral entera alrededor,
// como un satélite). o.corte 0–1 (corte lateral: el aire que sube por la pared y una parte que baja por el centro, con
// flechas que se mueven)
export function ojo(R, t, o = {}) { provisional(R, t, hex('#8ac0e0'), hex('#e8ecf4')); }

// ── C · la máquina de calor ───────────────────────────────────────────────────────────────────────────────────────────
// Corte lateral del huracán sobre el Atlántico tropical: el mar caliente con su oleaje, los destellos y el termómetro
// clavado en una boya («80°» / «26,5°» en números, o.unidad 'f' | 'c'); el vapor invisible que sube en ondas de calor
// (o.vapor 0–1), las gotas que nacen al subir y sueltan chispas de calor (o.gotas 0–1), las columnas de nubes que crecen
// y el aire del mar que se aspira por abajo (flechas que se mueven, o.aspira 0–1). o.motor 0–1: el huracán se dibuja como
// un motor (pistones de nubes, un volante que gira) junto a una fila de centrales eléctricas pequeñas al fondo. o.cizalla
// 0–1 (acto 6): una tormenta joven a la que el viento de arriba tuerce y deshace. o.tierra 0–1: la Tierra que gira vista
// desde fuera, con el aire que se tuerce (Coriolis) y la franja del ecuador sin tormentas
export function maquinaCalor(R, t, o = {}) { provisional(R, t, C.tropico2, C.tropico0); }
// El baño de casa (el gag del lavabo): azulejos con juntas, el lavabo de porcelana con su grifo, el agua que se va por el
// desagüe en remolino (o.giro ±1, el sentido) con un patito de goma que da vueltas, el espejo que se empaña (o.vaho 0–1),
// la toalla, el cepillo de dientes en su vaso, una planta y la ventana con la luz de la mañana
export function lavabo(R, t, o = {}) { provisional(R, t, hex('#e8e4dc'), hex('#c8d4dc')); }

// ── D · Galveston (1900) ──────────────────────────────────────────────────────────────────────────────────────────────
// La isla de Galveston en 1900. o.encuadre: 'calle' (calle de casas victorianas de madera pintada con porches y
// balaustradas, el tranvía de mulas, farolas de gas, palmeras, carros, gente con sombrero que pasea; al fondo los
// mástiles del puerto), 'playa' (la playa con el oleaje que crece, la caseta de baño, el muelle de madera y el cielo que
// se pone gris) u 'oficina' (la oficina del Weather Bureau en el tejado de un edificio de ladrillo: la veleta, el
// anemómetro de cazoletas que gira, el mástil con la bandera roja de aviso de tormenta, el barómetro en la pared y el
// telégrafo). o.agua 0–1 (el mar que sube y cruza la calle, de noche, sin víctimas); o.noche 0–1; o.cielo 'claro' |
// 'gris' | 'tormenta'. o.despues: el muro de diecisiete pies frente al mar (o.muro 0–1, cuánto se ha construido), las
// casas subidas con gatos (o.sube 0–1) y la tubería de la draga que bombea arena (o.arena 0–1)
export function galveston(R, t, o = {}) { provisional(R, t, hex('#a8c8e0'), C.victC); }

// ── E · ojos en el cielo ──────────────────────────────────────────────────────────────────────────────────────────────
// La Tierra desde la órbita: el espacio con estrellas que titilan, el planeta grande con océanos, continentes de
// América vistos desde arriba, nubes que se mueven y la línea de luz; el satélite TIROS-1 (un tambor con paneles y
// antenas) que cruza y hace fotos (o.foto: el destello); o.remolino 0–1: un remolino que nace en alta mar (Esther, 1961);
// o.espiral 0–1: un huracán formado
export function orbita(R, t, o = {}) { provisional(R, t, hex('#0a0e24'), hex('#1e4a8a')); }
// La sala de pronóstico (años 50–70): mapas del tiempo en la pared con isobaras y símbolos, el teletipo que escupe papel,
// tablones con las listas de nombres (en pictogramas de personas, sin letras: o.listas, seis columnas que giran), el
// archivador con el cajón de los nombres retirados (o.cajon 0–1 se cierra de golpe), mesas con lámparas, café, ceniceros,
// el reloj de pared y la ventana con palmeras de Miami
export function salaPronostico(R, t, o = {}) { provisional(R, t, hex('#d8d0b8'), hex('#8a7a5a')); }

// ── F · el taller de Saffir (Coral Gables, Florida, 1971) ─────────────────────────────────────────────────────────────
// El taller de un ingeniero de estructuras: el banco de viento (un ventilador enorme con su rejilla y las aspas que
// giran, o.viento 0–1), casas de prueba a escala (de madera, con tejas que se levantan y salen volando según o.categoria
// 1–5), un indicador con la escala del 1 al 5 en números que se enciende (o.marca), planos en la pared, la mesa de
// dibujo con regla, la campanita de recepción (para el gag), herramientas colgadas, luz de fluorescentes y la ventana
// con el sol de Florida
export function tallerSaffir(R, t, o = {}) { provisional(R, t, hex('#c8c0a8'), hex('#6a6a7a')); }

// ── G · las Grandes Llanuras y el laboratorio de Fujita ───────────────────────────────────────────────────────────────
// Las Grandes Llanuras: el cielo enorme con la supercelda (la nube de yunque, la base rotando, el muro de lluvia), el
// trigo que se mece, la granja con su silo, el granero rojo, el molino que gira, postes de la luz, la vaca que mastica
// (el gag) y el tornado a lo lejos (o.tornado 0–1: el embudo que baja y avanza levantando polvo). o.luz 'tarde' | 'verde'
// (la luz verdosa de tormenta)
export function llanuras(R, t, o = {}) { provisional(R, t, hex('#6a7a5a'), hex('#c8b070')); }
// El laboratorio de Ted Fujita en la Universidad de Chicago: la mesa de luz llena de fotos aéreas y mapas de daños con
// marcas en espiral, la cámara en la mesa, carpetas, la ventana con los rascacielos de Chicago y el lago, estanterías con
// maquetas de tornados (un ventilador y humo que gira, o.maqueta 0–1)
export function labFujita(R, t, o = {}) { provisional(R, t, hex('#c8c0b0'), hex('#5a5a6a')); }
// Vista desde la avioneta de Fujita: el suelo desde arriba (campos, carreteras, granjas) cruzado por el camino de daños de
// un tornado (árboles tumbados en espiral, tejados abiertos, sin víctimas), la sombra de la avioneta que lo recorre y el
// destello de la cámara (o.foto). o.u 0–1: cuánto se ha recorrido
export function danosDesdeArriba(R, t, o = {}) { provisional(R, t, hex('#8a9a5a'), hex('#6a7a4a')); }

// ── H · hoy: el centro de huracanes, el P-3 y la costa ────────────────────────────────────────────────────────────────
// El Centro Nacional de Huracanes en Miami: la sala con la pared de pantallas (imágenes de satélite que se mueven, el
// cono de trayectoria, radar), mesas con monitores, pronosticadores pequeños que trabajan, el logo de la NOAA insinuado
// (un círculo con un ave), café, el reloj digital en números. o.pantalla: 'isaias' (el huracán en el golfo, el cono hacia
// Florida), 'nada' (el Atlántico vacío, tranquilo, «7» días) o 'radar'
export function centroHuracanes(R, t, o = {}) { provisional(R, t, hex('#1a2a3a'), hex('#3ac8e8')); }
// El avión de la NOAA WP-3D Orion de perfil (cuatro hélices, fuselaje blanco con la franja azul, el radar bajo la panza,
// el nombre insinuado y, en la cola, la rana Kermit pintada que da un saltito con o.salto 0–1). x, y: las ruedas o el
// centro en vuelo; o.dir ±1; o.s 1 | 2; o.vuelo
export function p3(R, x, y, t, o = {}) { R.rect(x - 30, y - 8, x + 30, y, C.blanco); }
// Dentro del P-3: la cabina larga con las consolas de científicos y sus pantallas que cambian, cables, asientos, las
// ventanillas con la pared del ojo pasando (o.fuera: 'tormenta' | 'ojo'), el tubo de lanzamiento de sondas (o.sonda 0–1:
// la sonda sale) y luces rojas de trabajo; todo se mueve un poco con las sacudidas (o.sacudida 0–1)
export function p3Dentro(R, t, o = {}) { provisional(R, t, hex('#3a3e4a'), hex('#5e6270')); }
// La costa del golfo en Destin (Florida): la playa de arena blanca, el agua verde esmeralda, los hoteles y las casas, el
// muelle, las palmeras, el faro. o.noche 0–1; o.huracan 0–1 (el viento, la lluvia y el mar alto); o.apagon 0–1 (las luces
// se apagan barrio a barrio, de la costa hacia dentro); o.calma 0–1 (el día después: el mar en calma, el sol)
export function costa(R, t, o = {}) { provisional(R, t, hex('#2aa8c0'), hex('#f4ecd8')); }
// La carretera NC-12 en los Outer Banks: la franja de arena entre el océano y el estrecho, la carretera con su línea,
// las dunas con la hierba, las casas sobre pilotes, el puente al fondo; o.agua 0–1 (las olas que pasan por encima y
// cubren la carretera), o.cielo 'gris' | 'claro'
export function carreteraOuterBanks(R, t, o = {}) { provisional(R, t, hex('#8a98a8'), hex('#e0d0a8')); }
