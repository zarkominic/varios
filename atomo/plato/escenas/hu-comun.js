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
// La isla de Galveston en septiembre de 1900 y lo que hizo después; cada encuadre pinta los 320 × 180 en cada fotograma,
// con su capa fija en un búfer de R.nuevo() (una por encuadre, cielo y noche) y la vida encima. o.encuadre:
//  · 'calle' (por defecto): cinco casas victorianas de madera pintada (azul, crema, roja, verde y una casita amarilla) de
//    dos plantas sobre pilares de ladrillo con celosía: galerías de una o dos alturas con pies derechos torneados,
//    ménsulas, friso de husillos y balaustrada; hastiales de escamas con ojo de buey y pendolón, tejados de pizarra, de
//    tablilla o de teja verde con buhardilla, una torrecilla redonda con su tejado cónico y su veleta, un mirador,
//    contraventanas, cortinas, helechos colgados, chimeneas; jardines con césped, adelfas en flor, arriates y la valla de
//    estacas con sus cancelas; palmeras datileras que se mecen. Detrás, el puerto: una fragata atracada con todo el
//    aparejo largado, mástiles de otros veleros con las velas recogidas y su jarcia, la chimenea de un vapor que humea, el
//    elevador de grano, almacenes y el campanario con su reloj (las agujas andan). Los postes del telégrafo con sus
//    hilos y el tendido del tranvía; la calle de conchas machacadas con rodadas y las vías. Pasan el tranvía eléctrico
//    abierto con pasajeros, conductor y trole con chispas (o.tranvia: 'mulas' para el tranvía cerrado de mulas, false
//    para quitarlo o un número para dejarlo quieto en esa x), una calesa y el carro del hielo (o.coches: false los quita),
//    y por la acera de enfrente paseantes con bombín, canotier, chistera y sombrilla, una señora con su cesta y un niño
//    con su aro. Vida en las casas: el abuelo de la mecedora, la vecina que barre el porche, alguien que pasa por detrás
//    de una ventana, cortinas que se mueven, el gato de la valla, palomas en los hilos que se van y vuelven, gaviotas,
//    humo. Delante, la acera de ladrillo con el poste del telégrafo, la farola de gas, el poste de atar caballos, la boca
//    de riego, un barril y hojas que arrastra el viento. o.noche: ventanas, farolas y luna (o la tormenta).
//    o.agua 0–1 (si no se dice otra cosa, de noche y con tormenta): el mar sube por la calle y la cruza de lado a lado:
//    la corriente de derecha a izquierda con crestas, espuma y regueros, el reflejo de las ventanas encendidas, barriles,
//    tablas, un cajón y un trozo de valla que flotan, la lluvia y los relámpagos (por delante de los personajes, con
//    R.delante), las farolas que se apagan una a una y las palmeras dobladas; sin víctimas: abajo se apagan las ventanas
//    y arriba siguen encendidas. La escala de mareas del poste de delante (pies: 5, 10, 15 y 20) marca la altura del
//    agua, o.agua × 15 pies (o.agua = 1: 15). o.escala: true la pone también sin agua.
//  · 'playa': la playa del golfo: el mar con su mar de fondo, el camino del sol y sombras de nubes, tres líneas de
//    rompientes y la resaca que sube y baja por la arena mojada con su encaje de espuma (o.oleaje 0–1, por defecto según
//    el cielo; o.agua 0–1: el mar sube por la playa); el muelle de pesca con su pescador, la casa de baños sobre pilotes
//    (la Pagoda: torre, pabellones, bañadores tendidos, gente en la galería y banderas al viento) con su pasarela, las
//    casetas de lona a rayas, una barca varada, un tronco, la línea de algas y conchas, bañistas con traje de rayas que
//    saltan las olas, paseantes, un niño con su cometa, correlimos que siguen a la ola, pelícanos en fila, gaviotas,
//    velas y un vapor en el horizonte, el barrón de las dunas en las esquinas. Con tormenta, cortinas de lluvia, rayos y
//    nadie en la playa (menos los personajes).
//  · 'oficina': la oficina del Weather Bureau en el último piso del edificio Levy: techo de chapa repujada, yeso con su
//    friso estarcido, arrimadero de roble, suelo de tablas con alfombra; el barómetro de mercurio en su tabla de caoba
//    con la escala 28–31 (o.presion en pulgadas, 29,9 por defecto: la columna y el nonio bajan), el termómetro, el
//    calendario en el 8, el reloj de péndulo (agujas y péndulo que andan), la esfera de la veleta del tejado (su aguja
//    sigue al viento), el mapa del golfo con la costa, Cuba, las isobaras, la trayectoria y Galveston; el escritorio de
//    persiana con sus casilleros llenos de papeles, el barógrafo (el tambor gira y la plumilla baja con la presión), el
//    telégrafo (o.telegrafo 0–1: cuánto repiquetea), los telegramas, el pincho, el tintero, la lámpara de queroseno; la
//    estantería con libros, cartas enrolladas y la bandera de aviso doblada, el globo, el perchero, la papelera, la silla
//    giratoria; el ventilador del techo que gira, la bombilla; la ventana de guillotina con la ciudad y el golfo, las nubes
//    que pasan, la lluvia en el cristal, la persiana que se mueve y el gato que duerme en el alféizar; motas de polvo en
//    la luz, una mosca y la brisa que levanta los papeles. De noche, la lámpara y la bombilla encendidas.
//  · 'tejado': la azotea del edificio de ladrillo: el golfo en el horizonte y la ciudad abajo (edificios con cornisas,
//    depósitos de agua, la catedral, la cúpula, palmeras, ropa tendida que se agita), el pretil, el suelo de tela
//    asfáltica con grava y un charco, la caseta de la escalera con su puerta y su farol, la garita de los termómetros, el
//    pluviómetro, el heliógrafo que brilla, el anemómetro de cazoletas (gira más deprisa con más viento), la veleta, la
//    chimenea con su humo tumbado, la claraboya, palomas en el pretil y gaviotas que pelean contra el viento; el mástil de
//    señales con la verga y las drizas: o.bandera 0–1 sube la bandera roja con el cuadro negro (por defecto, arriba);
//    o.banderas: 2 para el aviso de huracán (dos banderas).
//  · 'isla': Galveston vista desde el golfo: la ciudad entera sobre una franja de arena que apenas asoma del mar (casas
//    diminutas, la catedral, la cúpula, el depósito de agua, los elevadores de grano, los mástiles del puerto, las casas
//    de baños, palmeras y el faro de Bolívar, que de noche gira); delante, el mar con sus crestas y el camino del sol,
//    una goleta que pasa, delfines, pelícanos y gaviotas.
// o.noche 0–1 (entre medias, la mezcla de las dos capas: el anochecer); o.cielo 'claro' | 'gris' | 'tormenta' (las
// nubes, la luz y el viento, que mueve palmeras, banderas, humos y cazoletas; o.viento 0–1 lo fuerza).
// o.despues: lo que hizo Galveston después (1902–1910), con su o.encuadre (sin él: 'casas' si llega o.sube u o.arena;
// si no, 'muro'):
//  · 'muro': el muro de hormigón de diecisiete pies que se aleja junto a la playa, con su albardilla, la cara curva, las
//    juntas, las manchas y el verdín, la escollera de granito al pie y la escalinata con sus pasamanos; arriba, la
//    barandilla, las farolas y gente que pasea; detrás, la ciudad nueva (tejados, chimeneas, palmeras, una torre); la
//    playa con su sombrilla, un niño, paseantes por la orilla, el mar con barcos y pelícanos. o.muro 0–1: cuánto se ha
//    construido (lo que falta son encofrados, pilotes, la grúa de vapor con su cubo y su caldera, y obreros); o.olas 0–1:
//    las olas que rompen contra la escollera y suben por la cara (por defecto según el cielo).
//  · 'casas': las casas subidas con gatos de tornillo: la del centro sube con o.sube 0–1 (30 px, unos diez pies) sobre
//    sus pilas de vigas cruzadas, con cuatro gatos y sus obreros que dan vueltas a las barras; a la izquierda, una ya
//    subida sobre el relleno nuevo, con su talud y un obrero con carretilla; a la derecha, una que espera a su altura de
//    siempre, con dos vecinos en el porche; la tubería de la draga sobre caballetes que escupe arena con agua; o.arena
//    0–1: el relleno sube bajo la casa (con su dique de tablas); detrás, casas lejanas ya subidas sobre pilotes; delante,
//    la pasarela de tablones sobre pilotes con paseantes y el barro con charcos. El porche de la casa del centro (para el
//    perro del gag, que pone la escena) y la escalera nueva los da d_galvestonPorche(o); la escalera sale con
//    o.escalera (por defecto, cuando o.sube llega a 1).
// Las coordenadas de cada encuadre (suelos, puertas, instrumentos, zonas libres) están en d_GALVESTON.
export function galveston(R, t, o = {}) {
  const despues = !!o.despues, encD = o.encuadre ?? (o.sube != null || o.arena != null ? 'casas' : 'muro');
  const enc = despues ? (encD === 'casas' ? 'casas' : 'muro') : (['playa', 'oficina', 'tejado', 'isla'].includes(o.encuadre) ? o.encuadre : 'calle');
  const agua = enc === 'calle' || enc === 'playa' ? d_lim(o.agua ?? 0) : 0;
  const noche = d_lim(o.noche ?? (agua > 0 && enc === 'calle' ? 1 : 0));
  const cielo = ['claro', 'gris', 'tormenta'].includes(o.cielo) ? o.cielo : agua > 0 && enc === 'calle' ? 'tormenta' : 'claro';
  const viento = d_lim(o.viento ?? (cielo === 'tormenta' ? 1 : cielo === 'gris' ? 0.6 : 0.25));
  const S = { t, o, agua, noche, cielo, viento, tn: d_tinte(noche, cielo), tnN: d_tinte(noche) };
  ({ calle: d_galCalle, playa: d_galPlaya, oficina: d_galOficina, tejado: d_galTejado, isla: d_galIsla, muro: d_galMuro, casas: d_galCasas })[enc](R, t, S);
}
// ── E · ojos en el cielo ──────────────────────────────────────────────────────────────────────────────────────────────
// La Tierra desde el espacio, con el sol por la izquierda. El planeta lleva costas de verdad (Natural Earth, como los
// mapas): el golfo de México, Florida, Cuba y la costa de EE. UU. se reconocen. Tiene el mar con su plataforma turquesa
// junto a las costas y el brillo del sol que chispea en el agua; selvas, sabanas, desiertos (el Sahara, el suroeste),
// las praderas, los Andes y las Rocosas, el bosque boreal, la tundra y el hielo de Groenlandia. Las nubes son de tres
// tonos, con su sombra en el suelo: las del trópico van hacia el oeste y las del norte hacia el este, y hay un frente frío
// que sale de la costa este y la franja de nubes del ecuador, donde saltan relámpagos. En el borde derecho cae la noche,
// con las luces de las ciudades, y alrededor brilla el halo azul de la atmósfera. Detrás quedan estrellas que titilan, la
// Vía Láctea, la Luna, una estrella fugaz que entra en la atmósfera y la segunda etapa de un cohete que da vueltas a lo
// lejos. Delante gira y cruza el satélite TIROS-1 de 1960: un tambor de dieciocho caras cubierto de células solares
// azules (las caras pasan al girar y la que mira al sol destella), con sus aros de metal, la antena de arriba y las cuatro
// varillas de abajo. En 'globo' se ve además su órbita, punteada.
// La Tierra gira con o.vel (grados por segundo hacia el este; 0 por defecto, quieta; 1–2 se nota sin marear): en el
// instante o.t0 (0 por defecto) el centro de la vista es el que dicen o.lon / o.mira, y luego se desplaza. Las nubes se
// mueven siempre.
//  o.encuadre:
//   'globo' (por defecto): el planeta entero, de x 38 a 194 y de y 21 a 177 (centro 116, 99; radio 78), con América en
//     el centro. o.lat y o.lon fijan el centro de la vista (18 y −60), fijos en cada plano.
//   'cerca': la órbita baja. El borde curvo del planeta cruza la pantalla (y ≈ 117 a la izquierda, 80 en el centro y 128
//     a la derecha), con la atmósfera encima y el espacio arriba. El satélite pasa grande, en plano medio. o.mira [lat,
//     lon] es el punto que queda en (150, 150); por defecto, el remolino o la espiral si los hay y, si no, el golfo [25, −88].
//  o.tiros: 0–1, por dónde va el satélite en su paso de izquierda a derecha; por defecto cruza solo cada 12 s; false lo
//   quita. Devuelve su posición en pantalla.
//  o.foto: 0–1. La cámara de abajo hace la foto: un destello con su anillo y el visor (cuatro esquinas y un piloto rojo)
//   que enmarca lo fotografiado. El objetivo es o.objetivo [lat, lon]; si no se da, el remolino, la espiral o lo que hay
//   bajo el satélite.
//  o.envia: 0–1. Ondas de radio bajan del satélite a la estación de Fort Monmouth (Nueva Jersey), que parpadea al recibirlas.
//  o.remolino: 0–1. Un remolino de tormentas nace en alta mar frente a África (Esther, 1961), con relámpagos; se sitúa
//   con o.remolinoEn [lat, lon], por defecto [12, −32].
//  o.espiral: 0–1. Un huracán formado, que gira en sentido antihorario: bandas en espiral, la masa central y el ojo
//   (desde 0,6). Se sitúa con o.espiralEn, por defecto [24, −71], al este de las Bahamas.
//  o.giro: 0–1. Coriolis, para la frase del giro (lo hace orbita y no maquinaCalor). Hasta 0,25 se ve el ecuador
//   punteado, con galones que corren hacia el este (el giro de la Tierra) y la franja de ±5° rayada en amarillo; de 0,2 a
//   0,7 entran cuatro flechas de aire hacia una baja presión en [28, −50]: la recta punteada blanca es el camino sin giro
//   y la naranja se tuerce a la derecha; de 0,6 a 1 nace allí la espiral antihoraria, con un aro de flechas que gira; y
//   desde 0,8 parpadean en la franja del ecuador dos símbolos de huracán tachados. Va mejor con o.lat 10 y o.vel 0.
// Devuelve { sat: [x, y] del satélite o null, P: ([lat, lon]) → [x, y, visible] }, para poner encima lo que haga falta.
export function orbita(R, t, o = {}) {
  const cerca = o.encuadre === 'cerca', mira = o.mira ?? ((o.remolino ?? 0) > 0 ? o.remolinoEn ?? [12, -32] : (o.espiral ?? 0) > 0 ? o.espiralEn ?? [24, -71] : [25, -88]);
  const giro = (o.vel ?? 0) * (t - (o.t0 ?? 0));   // lo que ha girado la Tierra desde o.t0
  const G = cerca ? { cx: 150, cy: 404, r: 324, lat0: mira[0] - 51.4, lon0: mira[1] - giro, halo: 8, cerca }
    : { cx: 116, cy: 99, r: 78, lat0: o.lat ?? 18, lon0: (o.lon ?? -60) - giro, halo: 4, cerca };
  const P = (ll) => e_proyecta(G, ll[0], ll[1]);
  e_espacio(R, t, cerca);
  // el camino del satélite: en 'globo', una elipse inclinada alrededor del planeta (por delante abajo, por detrás arriba);
  // en 'cerca', una recta que cruza sobre el borde del planeta
  const u = o.tiros === false ? null : typeof o.tiros === 'number' ? o.tiros : ((t + 3) / 12) % 1;
  let sat = null, delante = true;
  if (u != null) {
    if (cerca) sat = [Math.round(-60 + u * 440), Math.round(92 - u * 14 + Math.sin(u * Math.PI) * -6)];
    else { const f = Math.PI * (1.12 - 1.24 * u), px = 95 * Math.cos(f), py = 30 * Math.sin(f), c = Math.cos(-0.32), s = Math.sin(-0.32);
      sat = [Math.round(G.cx + px * c - py * s), Math.round(G.cy + px * s + py * c)]; delante = Math.sin(f) > -0.02; }
  }
  if (!cerca) e_orbitaLinea(R, G, t, false);
  if (sat && !delante) e_tiros(R, sat[0], sat[1], t, 1.2, {});
  e_globo(R, t, G, o);
  if (!cerca) e_orbitaLinea(R, G, t, true);
  if (o.giro) e_coriolis(R, t, G, o.giro);
  // la foto: el visor sobre el objetivo
  const fo = o.foto ?? 0;
  if (fo > 0 && fo < 1 && sat) {
    let obj = o.objetivo ? P(o.objetivo) : (o.remolino ?? 0) > 0 ? P(o.remolinoEn ?? [12, -32]) : (o.espiral ?? 0) > 0 ? P(o.espiralEn ?? [24, -71]) : null;
    if (!obj || !obj[2]) obj = [sat[0], sat[1] + (cerca ? 46 : 16), true];
    e_visor(R, t, obj[0], obj[1], cerca ? 30 : 11, cerca ? 20 : 8, fo);
  }
  if ((o.envia ?? 0) > 0 && sat) e_ondas(R, t, sat, P([40.3, -74.1]), o.envia, cerca);
  if (sat && delante) e_tiros(R, sat[0], sat[1], t, cerca ? 3 : 1.6, { flash: fo });
  return { sat: sat && delante ? sat : null, P };
}
// La sala de los pronosticadores de Miami (años 50–70). Las paredes son de yeso verde salvia, con su textura y la luz
// de la ventana; hay un friso de tablas de roble con su moldura, un techo de placas acústicas con el fluorescente (que
// parpadea a ratos) y el ventilador de techo que gira, y el suelo de losetas de linóleo en damero, con vetas, juntas en
// perspectiva, la mancha de sol de la ventana y las sombras de los muebles.
// En la sala están:
//  · la ventana con la persiana subida y su cordón que se balancea. Fuera se ve el cielo de Florida tramado con
//    cúmulos de tres tonos, dos cocoteros que se mecen, casas de estuco con teja roja, el seto, la calle con coches y
//    pelícanos que pasan (todo recortado a su hueco);
//  · el gran mapa del tiempo de superficie, con costas de verdad (el golfo, Florida, Cuba), isobaras con sus números,
//    el frente frío (triángulos azules) y el cálido (semicírculos rojos), observaciones de estación con sus barbas de
//    viento, la trayectoria del huracán en puntos rojos con su símbolo, que parpadea, y chinchetas; debajo, el
//    listón con los lápices grasos;
//  · el reloj de pared, el barómetro de latón (la aguja tiembla) y el calendario;
//  · el tablero de corcho con las seis listas de nombres: seis columnas de fichas con pictogramas de mujer y de hombre,
//    con su número del 1 al 6 encima y el contador del año en la cabecera;
//  · el archivador de cuatro cajones con el de los nombres retirados (etiqueta roja) y encima la cafetera de filtro
//    humeante, dos tazas y archivadores de anillas;
//  · el teletipo que escupe papel (las líneas suben, el carro va y viene, el piloto parpadea) junto a la pila de papel
//    continuo;
//  · la mesa de roble con el flexo encendido y su cono de luz, la máquina de escribir (el carro avanza y vuelve), la
//    taza de café humeante, el cenicero con el cigarrillo que echa su hilo de humo y los papeles;
//  · la mesa de trazar, con la carta del Atlántico, el compás, la regla, el teléfono negro de disco, otra taza y la
//    lámpara de cuello de cisne.
// Y vida: motas de polvo en la luz de la ventana y, por el cristal esmerilado de la puerta (en 'tablero'), la sombra
// de alguien que pasa.
// Opciones:
//  o.encuadre: 'general' (por defecto: la sala entera), 'tablero' (más cerca: el tablero de las listas grande, la
//   puerta del pasillo con su cristal esmerilado, el reloj, el corcho con tiras de teletipo, el archivador y, por
//   delante abajo a la izquierda, la esquina de la mesa de trazar con su taza) o 'archivador' (inserto: el archivador de
//   cerca, con el cajón de los nombres retirados lleno de fichas con pictogramas, alguno tachado; detrás, el corcho con
//   fichas grandes, la tira de teletipo que ondea, la sombra del ventilador que barre la pared y, delante, una planta;
//   sin personajes).
//  o.listas: true (por defecto) avanza sola la lista en uso, una columna cada 1,5 s (y vuelve a la 1 cada 9 s), con el
//   marco amarillo, el número encendido, un brillo que baja por la columna y el contador del año de la placa, que
//   empieza en o.año0 (1979). Un número da la lista en uso (0–6, fraccionario: al pasar de entero, el marco parpadea; la
//   placa suma un año por lista, así que 6 vuelve a la 1 con seis años más) y false quita marco y placa.
//  o.alternos: 0–1. Con 0 todas las fichas son de mujer (1953–1978); al subir, la mitad se dan la vuelta una a una y
//   salen hombres, alternos (desde 1979).
//  o.cajon: 0–1, el gag. Con 0 el cajón está abierto, con las fichas asomando; hacia 0,55 se cierra de golpe, el
//   archivador tiembla, sale polvo por las rendijas, saltan las tazas de encima y una ficha se escapa y cae revoloteando
//   hasta el suelo, donde queda en 1. Sin o.cajon, el cajón está cerrado y no pasa nada.
//  o.luz: 0–1 enciende el flexo (1 por defecto).
// Devuelve el instante de la lista en uso, { col, año }, para sincronizar.
export function salaPronostico(R, t, o = {}) {
  const enc = o.encuadre ?? 'general', a0 = o.año0 ?? 1979;
  const L = o.listas === false ? null : typeof o.listas === 'number' ? o.listas : (t % 9) / 1.5;
  const col = L == null ? -1 : ((Math.floor(L) % 6) + 6) % 6, año = L == null ? a0 : a0 + Math.floor(L);
  const alt = o.alternos ?? 0, caj = o.cajon;
  if (enc === 'archivador') { e_salaArchivador(R, t, caj); return { col, año }; }
  const G = enc === 'tablero';
  e_fijo(R, G ? 'sala-tablero' : 'sala-general', () => e_salaFija(R, G));
  if (G) {
    // el cristal esmerilado de la puerta: la sombra de alguien que pasa por el pasillo
    e_sombraPasillo(R, t, 13, 27, 45, 95);
    e_fluorescente(R, t, 178, 216, 2);
    e_reloj(R, t, 236, 30, 11);
    e_tablero(R, t, 62, 16, 222, 118, 2, col, año, alt, L);
    e_archivador(R, t, 248, 74, 306, 160, caj);
    e_motas(R, t, 60, 250, 30, 140, 22, hex('#f4ecd0'), 3);
    e_ventilador(R, t, 250, 0, 1.2);
    // la esquina de la mesa de trazar, por delante, abajo a la izquierda, con su taza humeante
    e_esquinaMesa(R, t);
  } else {
    e_ventana(R, t);
    e_fluorescente(R, t, 232, 270, 3);
    e_reloj(R, t, 191, 30, 8);
    e_barometro(R, t, 191, 54, 7);
    e_mapaVivo(R, t);
    e_tablero(R, t, 204, 22, 270, 92, 1, col, año, alt, L);
    e_archivador(R, t, 276, 88, 314, 150, caj);
    e_teletipo(R, t, 16, 148);
    e_mesaTrazar(R, t);
    e_mesaRoble(R, t, o.luz ?? 1);
    e_ventilador(R, t, 200, 0, 1);
    e_motas(R, t, 20, 120, 40, 150, 26, hex('#f8f0d4'), 1);
  }
  return { col, año };
}
// ── F · el taller de Saffir (Coral Gables, Florida, 1971) ─────────────────────────────────────────────────────────────
// El taller de un ingeniero de estructuras en 1971: pared de bloques pintados de crema con la moldura y el zócalo verde
// salvia, techo de placas y fluorescentes de taller colgados de cadenas (uno parpadea), suelo de terrazo de Florida con
// chinas de colores, juntas de latón, el brillo de los tubos y la luz del sol, rayada por las lamas, que entra por la
// ventana. El banco de viento: un ventilador enorme en su caja de chapa verde con remaches, la rejilla de alambre y cuatro
// aspas de aluminio que, con o.viento (0–1), pasan de quietas a girar y a emborronarse en un disco; rachas de aire blancas
// que cruzan el taller, la cinta roja atada a la rejilla que se estira y ondea, la caja de mando (el mando gira con la
// velocidad y el piloto se enciende) y el anemómetro de pared con su aguja y el contador de mph. La mesa de prueba de madera
// con la cinta métrica en el canto, el plato giratorio y la casita a escala (contrachapado con césped, valla, arbolito,
// buzón y banderita), cuyas tejas aletean y salen volando según o.categoria (0–5, admite decimales): en 1 se van unas
// pocas del borde de barlovento, en 2 casi la mitad (asoma el fieltro negro) y aletean las contraventanas, en 3 quedan
// pocas y se ve el contrachapado, de 3,3 a 4,1 se van los tableros (se ven las vigas), salta un cristal y la chimenea cae a
// la mesa, y desde 4,15 la armadura entera vuela y queda junto a la casa; hacia 5 la casita se desmonta como una maqueta
// (o.desmonta 0–1, por defecto sale de la categoría: de 4,4 a 5): la fachada cae hacia delante, las paredes de los lados se
// abren y la de atrás se tumba, y se ven el suelo de tablas, el papel pintado y los muebles diminutos. Las piezas sueltas
// (tejas, contraventanas, tablas) vuelan a sotavento dando vueltas y quedan en la mesa y en el suelo. El panel de la
// escala: una caja de nogal con cinco ventanillas y los números del 1 al 5 en grande (amarillo, ámbar, naranja, rojo y
// magenta) que se encienden en orden con o.marca (0–5; la que está a medias parpadea antes de quedarse encendida; por
// defecto, la parte entera de la categoría; o.solo: solo la de o.marca), con su halo y su luz de color en la pared. Además:
// dos planos azules chinchetados (las puntas aletean con el viento), el barómetro de latón, la balda con maquetas de
// repuesto (una casa de una planta, una de dos y una casa móvil), el tablero perforado con las herramientas colgadas sobre
// su silueta pintada (se mecen con el viento), la ventana de lamas de cristal con el sol de Florida, nubes a dos
// velocidades, una gaviota, la casa de enfrente de piedra coralina con tejas árabes y buganvilla, la palmera real que se
// mece, el seto de hibiscos, coches que pasan y algún paseante (todo recortado al hueco), el gato del alféizar, el mostrador
// de recepción de fórmica dorada con la campanita, la bandeja de papeles y el teléfono de disco color aguacate, el
// termostato redondo, el reloj con segundero y la puerta de la calle (o.puerta 0–1 la abre: se ven la acera al sol, el
// seto, la palmera y un coche aparcado, y entra luz en el suelo). Delante, la mesa de dibujo con la regla en T, la
// escuadra, el plano, la taza que humea y el flexo encendido, y el caballete con una maqueta a medio hacer (van por delante
// de los personajes: la escena los recibe en R.delante, que rodar pinta al final del plano; o.delante false lo quita).
// o.gag (0–1): la teja del gag sale de la casita, cruza el taller y golpea la campanita en 0,7 (tiembla, suelta ondas y un
// destello) y queda en el mostrador. o.mph fija el contador del anemómetro (por defecto sale de la categoría: 74, 96, 111,
// 130 y 157, y en medio interpola). o.giro: el ángulo de las aspas, si la escena lo integra cuando o.viento cambia dentro
// de un plano. o.encuadre: 'general' (por defecto, todo el taller), 'banco' (el banco de viento de cerca, un plano de
// objetos: el ventilador enorme, la casita grande, el anemómetro de cazoletas que gira en la mesa, el de pared, la gráfica
// de la fuerza contra la velocidad, el plano de un anclaje de tejado, el cronómetro colgado, la libreta y la taza; la mano
// canónica puede girar el mando), 'escala' (el panel grande con cada número, su icono de daños y su umbral en mph, la balda
// de maquetas con archivadores, el casco y planos enrollados, la papelera, la escoba, el tablero de herramientas, el reloj
// y la caja de cartón con piezas en primer plano; sitio delante para dos personajes) o 'mostrador' (el mostrador de cerca
// con la campanita grande para el gag, el libro de visitas, la placa, el correo, el tarjetero que pasa fichas con el aire,
// el teléfono, el archivador con su planta, la máquina de escribir, la silla, el título colegiado, el reloj, la ventana con
// el gato, el calendario, la puerta, la palmera de maceta y, al fondo por el arco, el banco de viento con la casita de la
// que sale la teja; o.detras repinta el mostrador delante de quien esté detrás). Coordenadas para las escenas: f_TALLER
export function tallerSaffir(R, t, o = {}) {
  const cat = Math.max(0, Math.min(5, o.categoria ?? 0));
  const s = {
    t, cat, v: Math.max(0, Math.min(1, o.viento ?? (cat > 0 ? Math.min(1, 0.3 + cat * 0.14) : 0))),
    marca: o.marca ?? Math.floor(cat), solo: !!o.solo, gag: o.gag ?? -1, puerta: Math.max(0, Math.min(1, o.puerta ?? 0)),
    des: o.desmonta ?? f_lim((cat - 4.4) / 0.6), giro: o.giro,
  };
  s.mph = o.mph ?? f_mph(cat);
  const enc = o.encuadre ?? 'general';
  if (enc === 'banco') f_tsBanco(R, s);
  else if (enc === 'escala') f_tsEscala(R, s);
  else if (enc === 'mostrador') f_tsMostrador(R, s);
  else f_tsGeneral(R, s);
  if (o.delante !== false) { const viejo = R.delante; R.delante = () => { if (viejo) viejo(); f_tallerDelante(R, t, o); }; }
}
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

// lo que las escenas necesitan saber de cada encuadre (coordenadas del lienzo de 320 × 180; pies = la y del suelo que se
// pasa a R.actor). Más detalle en la cabecera de cada pieza
export const d_GALVESTON = {
  calle: { pies: [158, 174], libre: [34, 290], aceraEnfrente: 123, calzada: [126, 148], rieles: 143, coches: 148, casas: { base: 112, porche: 104, piso2: 78, alero: 54 },
    puertas: [[30, 86, 37, 103], [107, 86, 114, 103], [191, 86, 198, 103], [257, 86, 264, 103]], postes: { lejos: [104, 236], cerca: 15 }, farolas: [[128, 124], [258, 124], [302, 156]], palmeras: [71, 214, 281], reloj: [150, 66], sol: [226, 24],
    escala: { x: [21, 28], cero: 178, pxPorPie: 5.2, pies: (agua) => agua * 15, lineaAgua: (agua) => 178 - agua * 15 * 5.2 }, aguaLejos: (agua) => (agua * 15 > 1.2 ? Math.round(112 - (agua * 15 - 1.2) * 2.5) : 124) },
  playa: { pies: [150, 172], libre: [40, 280], horizonte: 74, orilla: 124, resaca: (agua) => 130 + Math.round(agua * 28), muelle: [[-8, 150], [96, 91]], pescador: [92, 89], casaBanos: [186, 268, 102], pasarela: [[334, 146], [262, 103]], barca: [218, 146, 252, 154], casetas: [90, 125, 132, 137], tronco: [40, 165, 68, 170], sol: [226, 22] },
  oficina: { pies: [154, 170], libre: [40, 250], suelo: 146, ventana: [14, 28, 62, 102], gato: [26, 103], barometro: { tabla: [83, 30, 95, 130], columna: 89, escala: [42, 71], tope: (p) => Math.round(68 - (p - 28) * 7.33) }, termometro: [70, 34, 62], calendario: [65, 70, 79, 88], reloj: [116, 40], veleta: [132, 96], mapa: [142, 28, 232, 80], galveston: [163, 44],
    escritorio: { x: [140, 240], tablero: 112, hueco: [173, 207] }, lampara: [148, 98], barografo: [152, 96, 174, 111], telegrafo: [214, 100, 234, 111], telegramas: [196, 107, 207, 110], estanteria: [246, 60, 300, 145], perchero: 309 },
  tejado: { pies: [150, 172], libre: [56, 272], suelo: 138, pretil: [124, 137], puerta: [18, 110, 34, 140], garita: [57, 100, 89, 142], anemometro: [150, 62], veleta: [186, 70], mastil: { x: 232, base: 142, tope: 20, verga: 28, banderaArriba: (b) => Math.round(126 - b * 96), cornamusa: [236, 132] }, chimenea: [262, 93, 276, 142], claraboya: [280, 158, 318, 172], sol: [120, 32] },
  isla: { horizonte: 112, isla: [105, 112], catedral: [150, 77], cupula: [196, 82], faro: [306, 74], banos: [104, 182], goleta: { y: 158, x: (t) => ((t * 6 + 40) % 400) - 40 } },
  muro: { pies: [148, 172], libre: [50, 180], top: (x) => Math.round(58 + 38 * x / 238), pie: (x) => Math.round(146 - 42 * x / 238), escalera: [62, 84], orilla: (x) => (x < 168 ? 999 : 180 - (x - 168) * 0.963), horizonte: 102, obra: (muro) => Math.round(muro * 238), sombrilla: [214, 128] },
  casas: { viejo: 152, nuevo: 122, sube: 30, casa: [104, 163], izquierda: [-20, 49], derecha: [240, 301], tuberia: { y: 140, boca: [229, 140] }, relleno: (arena) => Math.round(152 - arena * 30), pasarela: 160, pies: [160, 176] },
};

// umbral del tramado ordenado 4 × 4 en (x, y), entre 0 y 1
const d_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbral = (x, y) => d_BAYER[((y & 3) << 2) | (x & 3)];

const d_lim = (u) => Math.max(0, Math.min(1, u));

const d_suave = (u) => { u = d_lim(u); return u * u * (3 - 2 * u); };

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function d_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el color de noche de un color de día (azulado y oscuro, como la calle de noche del 11)
function d_nocturno(c) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  return (0xff000000 | (Math.min(255, Math.round(b * 0.42 + 30)) << 16) | (Math.min(255, Math.round(g * 0.3 + 16)) << 8) | Math.min(255, Math.round(r * 0.27 + 12))) >>> 0;
}

// tinte para lo que se pinta en cada fotograma encima del fondo: el color de día, el de noche o una mezcla
function d_tinte(n, cielo = 'claro') {
  const velo = d_velo(cielo);
  if (n <= 0 && !velo) return (c) => c;
  const cache = new Map();
  return (c) => { let v = cache.get(c); if (v === undefined) { v = velo ? d_mezcla(c, velo[0], velo[1]) : c; if (n > 0) v = n >= 1 ? d_nocturno(v) : d_mezcla(v, d_nocturno(v), n); cache.set(c, v); } return v; };
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. Cada capa
// guarda su máscara (1 = el fondo que se pintó antes de marca(): cielo, mar o arena), para pintar nubes, olas y pájaros
// solo por detrás de lo demás; dibuja(marca, mascara) puede fijar la máscara antes de teñir la capa (nublado, noche)
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let c = d_capas.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(320 * 180);
    let foto = null, hecha = false;
    const mascara = () => { if (foto) for (let i = 0; i < m.length; i++) m[i] = b[i] === foto[i] ? 1 : 0; hecha = true; };
    const info = dibuja(() => (foto = b.slice()), mascara);
    if (!hecha) mascara();
    R.usar(prev); c = { b, m, info }; d_capas.set(clave, c);
  }
  return c;
}

// copia el fondo del encuadre: de día, de noche o, entre medias, la mezcla de los dos
function d_fondo(R, clave, noche, dibuja) {
  if (noche <= 0.02 || noche >= 0.98) { const n = noche >= 0.98 ? 1 : 0, c = d_capa(R, clave + '|' + n, (mc, mk) => dibuja(n, mc, mk)); R.copiar(c.b); return c; }
  const a = d_capa(R, clave + '|0', (mc, mk) => dibuja(0, mc, mk)), b = d_capa(R, clave + '|1', (mc, mk) => dibuja(1, mc, mk)), B = R.buf;
  for (let i = 0; i < 57600; i++) B[i] = a.b[i] === b.b[i] ? a.b[i] : d_mezcla(a.b[i], b.b[i], noche);
  return noche < 0.5 ? a : b;
}

// oscurece de noche lo ya pintado de la capa (menos el cielo y las luces encendidas)
function d_anochecer(R, foto, deja, hor = 180) {
  const B = R.buf, lim = hor * 320;
  for (let i = 0; i < 57600; i++) { const c = B[i]; if (foto && i < lim && c === foto[i]) continue; if (deja.has(c)) continue; B[i] = d_nocturno(c); }
}

// bajo un cielo cubierto, todo pierde color y luz (menos el cielo, que ya es el suyo)
function d_nublado(R, foto, cielo, hor = 180) {
  const B = R.buf, c = cielo === 'gris' ? hex('#6e7484') : hex('#363c4c'), a = cielo === 'gris' ? 0.22 : 0.38, lim = hor * 320;
  for (let i = 0; i < 57600; i++) { if (foto && i < lim && B[i] === foto[i]) continue; B[i] = d_mezcla(B[i], c, a); }
}

// el mismo velo para lo que se pinta en cada fotograma
const d_velo = (cielo) => (cielo === 'gris' ? [hex('#6e7484'), 0.22] : cielo === 'tormenta' ? [hex('#363c4c'), 0.38] : null);

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]
function d_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_umbral(x, y) < p ? b : a;
  }
}

const d_hx = (P) => P.map(([f, c]) => [f, hex(c)]);

const d_CIELOS = {
  claro: d_hx([[0, '#3a86d6'], [0.2, '#4a9ee6'], [0.42, '#6cb6ee'], [0.64, '#8ec8f0'], [0.82, '#b0daf2'], [0.95, '#d8eaee']]),
  gris: d_hx([[0, '#5a6478'], [0.24, '#6a7488'], [0.48, '#7e889a'], [0.7, '#939cac'], [0.88, '#aab0bc']]),
  tormenta: d_hx([[0, '#1c202c'], [0.3, '#262c3a'], [0.55, '#333a4a'], [0.78, '#434b5a'], [0.93, '#545c6a']]),
  noche: d_hx([[0, '#05070d'], [0.35, '#0a0e18'], [0.7, '#111725'], [0.92, '#1a2232']]),
  nocheClara: d_hx([[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']]),
};

// los tres tonos de las nubes (sombra, cuerpo, luz) de cada cielo
const d_NUBES = Object.fromEntries(Object.entries({ claro: ['#a8d0ee', '#d6ecfa', '#ffffff'], gris: ['#6e7888', '#8c95a4', '#aab2be'], tormenta: ['#20242e', '#30363f', '#454c58'], noche: ['#0c1018', '#151b26', '#222a38'], nocheClara: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

// la paleta de Galveston
const d_P = pal({
  moldura: '#f6f2ea', molduraS: '#cfc6b4', molduraD: '#a89e8c', persiana: '#3e6a4a', persianaS: '#2a4a34', persianaR: '#7a3a2e', persianaRS: '#5a2a22',
  cristal: '#9ccbe4', cristalS: '#5a86a8', cristalD: '#34465a', cristalL: '#e4f4fc', cortina: '#f0ead8', cortinaS: '#cfc4ac',
  luz: '#ffd88a', luzS: '#f0b860', luzL: '#fff0c0', farol: '#ffe8a0', farolL: '#fff8dc', oscuro: '#141a26',
  pizarra: '#5a5e6a', pizarraS: '#40444e', pizarraL: '#767a88', tablilla: '#8a5a42', tablillaS: '#6a4030', tablillaL: '#a87458', tejaV: '#4a6a5a', tejaVS: '#34503f', tejaVL: '#6a8a76',
  celosia: '#c8bca4', hueco: '#2a2420', pilar: '#9a5644', pilarS: '#74402f',
  cesped: '#5a9a3a', cespedS: '#3e7a2a', cespedL: '#7ab84a', adelfa: '#3a6a3a', adelfaS: '#264a2a', adelfaF: '#f08aa8', adelfaB: '#fbe2ea',
  tabla: '#a8987e', tablaS: '#86765e', tablaL: '#c4b498', bordillo: '#c4c0b8', bordilloS: '#8e8a84',
  concha: '#d6cab0', conchaS: '#b8aa8e', conchaL: '#ece2cc', rodada: '#c4b698', traviesa: '#6a5040', riel: '#767a86', rielL: '#d0d4dc',
  ladr0: '#b05a48', ladr1: '#a04e3e', ladr2: '#c06a54', ladr3: '#94483a', mortero: '#8e7c6a', musgo: '#6a7a4a',
  mastil: '#6e6a74', mastilL: '#8e8a94', verga: '#5e5a66', vela: '#e2d8c4', velaS: '#b8ae9c', jarcia: '#8c90a0',
  bruma: '#c8d4dc', almacen: '#9a6a5a', almacenS: '#7e5444', elevador: '#b8bcc4', elevadorS: '#949aa6', campanario: '#c8b8a0', campanarioS: '#a0907a',
  poste: '#7a5a3e', posteS: '#55402c', posteL: '#9a7a58', aislador: '#5ab8a0', cable: '#2a2a34', hierro: '#3a3e46', hierroL: '#6a707c', hierroS: '#24262c',
  agua0: '#1a3044', agua1: '#22394f', agua2: '#2c4660', agua3: '#3a5672', espuma: '#c8d4dc', espumaS: '#7a8c9e', piel: '#e8b48a', pielS: '#b07a54', pielD: '#8a5a3a',
});

// cifras diminutas de 3 × 5 (las de la escala de mareas): solo dígitos
const d_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function d_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = d_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// disco que solo pinta en el cielo (m: la máscara de la capa)
function d_discoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = c; } }
}

const d_psM = (B, m, x, y, c) => { x |= 0; y |= 0; if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) B[y * 320 + x] = c; };

// cúmulo de tres tonos con la base plana, solo en el cielo; ap < 1 lo aplasta (estratos)
function d_nubeM(B, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) d_discoM(B, m, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) d_discoM(B, m, x, y, r, c[1]);
  for (const [x, y, r] of bolas) d_discoM(B, m, x - 1, y - 2, r * 0.68, c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { d_psM(B, m, x, y0, c[0]); d_psM(B, m, x, y0 + 1, c[0]); if (Math.abs(x - cx) < w * 0.4) d_psM(B, m, x, y0 - 1, c[1]); }
}

// jirón de nube de tormenta (elipse de borde deshilachado), solo en el cielo: cuerpo oscuro y borde de arriba más claro
function d_jironM(B, m, cx, cy, rx, ry, sem, c0, c1, c2) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) { const f = y * 320, dy = (y - cy) / ry;
    for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) { if (!m[f + x]) continue; const e = ((x - cx) / rx) ** 2 + dy * dy + (h((x - cx) >> 2, y >> 1, sem) - 0.5) * 0.55;
      if (e < 1) B[f + x] = e > 0.72 ? (dy < 0 ? c2 : c0) : dy > 0.35 ? c0 : c1; } }
}

// el cielo que se mueve: nubes en tres alturas a distinta velocidad, según el cielo (y de noche, estrellas)
function d_nubesGal(R, t, m, hor, cielo, nn, viento) {
  const B = R.buf, v = 0.6 + viento * 3;
  if (nn && cielo === 'claro') {   // noche clara: estrellas que titilan y alguna nube oscura
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 620) * 319), y = Math.round(h(k, 2, 620) ** 1.3 * (hor - 8)); if (x > 272 && y < 48) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 620) * 2) + k * 1.7); if (tw > -0.4) d_psM(B, m, x, y, tw > 0.5 ? C.blanco : hex('#8a94c0')); }
    for (let k = 0; k < 3; k++) d_nubeM(B, m, ((h(k, 4, 621) * 420 + t * v * (1 + k * 0.4)) % 460) - 70, 26 + k * 16, 36 + k * 8, k, d_NUBES.nocheClara, 0.7);
    return;
  }
  const cn = d_NUBES[nn ? 'noche' : cielo];
  if (cielo === 'claro') {
    // cirros en colas de yegua, muy altos y casi quietos (el aviso de que algo viene por el golfo)
    for (let k = 0; k < 5; k++) { const w = 40 + Math.round(h(k, 5, 622) * 50), x0 = ((h(k, 6, 622) * 440 + t * (0.6 + k * 0.2)) % 480) - 90, y = 16 + k * 9 + Math.round(h(k, 7, 622) * 5);
      for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI), yy = y - Math.round((i / w) ** 2 * 4); if ((x > 272 && yy < 48) || h(i >> 2, k, 623) < 0.2) continue; d_psM(B, m, x, yy, e > 0.4 ? cn[1] : cn[0]); if (e > 0.6 && i % 3) d_psM(B, m, x + 2, yy - 1, cn[2]); if (i > w * 0.8 && i % 2) d_psM(B, m, x, yy + 1, cn[0]); } }
    for (let k = 4; k >= 0; k--) { const cerca = k < 2, w = cerca ? 34 + k * 12 : 16 + ((k * 7) % 9), vv = (cerca ? 3.2 + k : 1.2 + k * 0.3) * v * 0.6, y = cerca ? 44 + k * 14 : 54 + (k - 2) * 8, x = ((h(k, 8, 622) * 470 + t * vv) % 520) - 100;
      d_nubeM(B, m, x, y, w, k + 3, cn); }
  } else if (cielo === 'gris') {
    // estratos anchos y bajos, en dos capas que van a distinta velocidad
    for (let k = 0; k < 9; k++) { const capa = k % 3, w = 60 + Math.round(h(k, 9, 624) * 60) + capa * 14, y = 12 + capa * 22 + Math.round(h(k, 10, 624) * 10), x = ((h(k, 11, 624) * 520 + t * v * (1.4 + capa * 1.1)) % 600) - 140;
      d_nubeM(B, m, x, y, w, k + 11, capa === 2 ? [cn[0], cn[0], cn[1]] : cn, 0.62); }
  } else {
    // tormenta: jirones bajos que corren deprisa sobre un techo de nubes
    for (let k = 0; k < 12; k++) { const capa = k % 3, rx = 34 + h(k, 12, 625) * 40, ry = 5 + capa * 3 + h(k, 13, 625) * 4, y = 8 + capa * 20 + h(k, 14, 625) * 12, x = ((h(k, 15, 625) * 560 + t * v * (3 + capa * 2.6)) % 620) - 150;
      d_jironM(B, m, x, y, rx, ry, k + 30, cn[0], cn[1], cn[2]); }
  }
}

// el rayo: cada pocos segundos, un trazo quebrado en el cielo; devuelve el destello (0–1) para iluminar el plano
function d_rayo(R, t, m, hor, cada = 5.3) {
  const k = Math.floor(t / cada), u = t - k * cada - 0.6; if (u < 0 || u > 0.32) return 0;
  const B = R.buf, x0 = 30 + h(k, 1, 630) * 230, luz = u < 0.06 || (u > 0.14 && u < 0.2) ? 1 : 0.45;
  let x = x0, y = 0; const bl = hex('#f4f0ff'), az = hex('#a8b4f0');
  while (y < hor - 6) { const nx = x + (h(k, y, 631) - 0.5) * 9, ny = y + 3 + h(k, y, 632) * 4; R.linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), (xx, yy) => (m[yy * 320 + xx] ? bl : null)); d_psM(B, m, Math.round(nx) + 1, Math.round(ny), az); if (h(k, y, 633) < 0.18) { let bx = nx, by = ny; for (let i = 0; i < 4; i++) { const ax = bx + (h(k, y + i, 634) - 0.3) * 7, ay = by + 3; R.linea(Math.round(bx), Math.round(by), Math.round(ax), Math.round(ay), (xx, yy) => (m[yy * 320 + xx] ? az : null)); bx = ax; by = ay; } } x = nx; y = ny; }
  return luz;
}

// el destello del rayo sobre todo el plano (una pasada)
function d_destello(R, f) { if (f <= 0) return; const B = R.buf, c = hex('#c8d0f0'); for (let i = 0; i < 57600; i++) B[i] = d_mezcla(B[i], c, 0.28 * f); }

// la lluvia: trazos en diagonal que caen con el viento, entre y0 e y1
function d_lluvia(R, t, n, viento, y0 = 0, y1 = 180, c = hex('#9aa8bc'), c2 = hex('#6a7890')) {
  const { pset } = R, dx = 0.35 + viento * 0.9;
  for (let k = 0; k < n; k++) { const v = 150 + h(k, 1, 640) * 90, L = 4 + Math.round(h(k, 2, 640) * 5), xa = h(k, 3, 640) * 420, ya = ((h(k, 4, 640) * 400 + t * v) % (y1 - y0 + 30)) + y0 - 15, xb = xa - (ya - y0) * dx * 0.2 + ((t * v * dx) % 420);
    const x = ((xb % 420) + 420) % 420 - 50; for (let i = 0; i < L; i++) pset(Math.round(x - i * dx), Math.round(ya - i), i < 2 ? c : c2); }
}

// las casas de la calle: x, ancho, plantas, colores (luz, cuerpo, sombra), tejado, galerías, torrecilla, mirador, chimenea
const d_CASAS = () => [
  { x: 6, w: 56, pisos: 2, col: [hex('#9cc0d8'), C.victA, C.victAS], tej: [d_P.pizarraL, d_P.pizarra, d_P.pizarraS], techo: 'cuatro', torre: 'izq', galeria: 1, chim: 40, pers: d_P.persiana, persS: d_P.persianaS, sem: 1 },
  { x: 80, w: 62, pisos: 2, col: [hex('#f6eed8'), C.victC, C.victCS], tej: [d_P.tablillaL, d_P.tablilla, d_P.tablillaS], techo: 'hastial', galeria: 2, chim: null, pers: d_P.persiana, persS: d_P.persianaS, sem: 2, escamas: [hex('#e8b8a0'), hex('#d89c84'), hex('#b07a64')] },
  { x: 158, w: 54, pisos: 2, col: [hex('#e08068'), C.victR, C.victRS], tej: [d_P.pizarraL, d_P.pizarra, d_P.pizarraS], techo: 'hastial', galeria: 1, bow: true, chim: 42, pers: hex('#3a4a3a'), persS: hex('#262e26'), sem: 3, escamas: [hex('#f0d890'), hex('#e0c070'), hex('#b0904c')] },
  { x: 228, w: 48, pisos: 2, col: [hex('#a8cc96'), C.victV, C.victVS], tej: [d_P.tejaVL, d_P.tejaV, d_P.tejaVS], techo: 'cuatro', galeria: 2, chim: 32, pers: d_P.persianaR, persS: d_P.persianaRS, sem: 4 },
  { x: 288, w: 44, pisos: 1, col: [hex('#f4e0a0'), hex('#e8cc80'), hex('#bc9e58')], tej: [d_P.tablillaL, d_P.tablilla, d_P.tablillaS], techo: 'cuatro', galeria: 1, chim: null, pers: d_P.persiana, persS: d_P.persianaS, sem: 5 },
];

// las tablas de una fachada (tingladillo): cada tabla con su sombra debajo, su canto de luz y alguna veta
function d_tablas(R, x0, y0, x1, y1, cL, c, cS, sem) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const f = y * 320, fila = Math.floor((y - y0) / 3), r = (y - y0) % 3;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let col = r === 2 ? cS : r === 0 ? cL : c; if (r === 1 && h(x >> 3, fila, sem * 7 + 640) < 0.12) col = d_mezcla(c, cS, 0.35); if (r !== 2 && (x + fila * 11 + sem * 5) % 37 === 0) col = cS; B[f + x] = col; } }
}

// una ventana de guillotina de dos hojas con su marco, frontón, alféizar y contraventanas; luz: 0 apagada, 1 encendida
function d_ventanaV(R, x, y, w, alto, s, luz, persianas = true) {
  const { rect, pset } = R, M = d_P.moldura, MS = d_P.molduraS;
  if (persianas) for (const sx of [x - 5, x + w + 1]) { rect(sx, y - 1, sx + 3, y + alto, s.persS); for (let yy = y; yy < y + alto; yy += 2) rect(sx + 1, yy, sx + 3, yy, s.pers); rect(sx, y - 1, sx, y + alto, d_mezcla(s.persS, C.k, 0.4)); }
  rect(x - 2, y - 4, x + w + 1, y - 3, M); rect(x - 1, y - 2, x + w, y - 2, MS); rect(x - 3, y - 5, x + w + 2, y - 5, MS);   // el frontón
  rect(x - 1, y - 1, x + w, y + alto, M); rect(x + w, y - 1, x + w, y + alto, MS);
  for (let yy = y; yy < y + alto; yy++) for (let xx = x; xx < x + w; xx++) { let c;
    if (luz) { const p = (yy - y) / alto; c = p < 0.45 ? d_P.luzL : p < 0.8 ? d_P.luz : d_P.luzS; }
    else { const p = (yy - y) / alto; c = p < 0.3 ? d_P.cristal : d_umbral(xx, yy) < (p - 0.3) * 1.6 ? d_P.cristalD : d_P.cristalS; if ((xx - x + (yy - y)) % 11 < 2 && p < 0.7) c = d_P.cristalL; }
    pset(xx, yy, c); }
  if (!luz) { rect(x, y, x, y + alto - 1, d_P.cortina); rect(x + w - 1, y, x + w - 1, y + alto - 1, d_P.cortina); pset(x + 1, y + 1, d_P.cortinaS); pset(x + w - 2, y + 1, d_P.cortinaS); }
  const my = y + Math.floor(alto / 2); rect(x, my, x + w - 1, my, M); rect(x + (w >> 1), y, x + (w >> 1), y + alto - 1, M);   // el travesaño y el parteluz
  rect(x - 2, y + alto + 1, x + w + 1, y + alto + 1, M); rect(x - 1, y + alto + 2, x + w, y + alto + 2, MS);   // el alféizar
}

// la puerta de entrada con su montante de cristal, los cuarterones y el pomo
function d_puertaV(R, x, y, w, alto, col, luz) {
  const { rect, pset } = R, M = d_P.moldura, MS = d_P.molduraS, cS = d_mezcla(col, C.k, 0.3), cL = d_mezcla(col, C.blanco, 0.2);
  rect(x - 2, y - 7, x + w + 1, y + alto, M); rect(x + w + 1, y - 7, x + w + 1, y + alto, MS);
  rect(x, y - 5, x + w - 1, y - 2, luz ? d_P.luz : d_P.cristalS); for (let i = 1; i < w; i += 2) pset(x + i, y - 4, M); rect(x - 1, y - 1, x + w, y - 1, M);   // el montante
  rect(x, y, x + w - 1, y + alto - 1, col); rect(x + 1, y + 1, x + w - 2, y + 7, luz ? d_P.luzS : d_P.cristalD); rect(x + 1, y + 1, x + w - 2, y + 1, cS);
  rect(x + 1, y + 10, x + (w >> 1) - 1, y + alto - 3, cS); rect(x + (w >> 1) + 1, y + 10, x + w - 2, y + alto - 3, cS); rect(x + 2, y + 11, x + (w >> 1) - 1, y + alto - 4, col); rect(x + (w >> 1) + 2, y + 11, x + w - 2, y + alto - 4, cL);
  pset(x + w - 2, y + 9, C.oro);
}

// una galería de madera (porche): el suelo, los pies derechos torneados, las ménsulas, el friso de husillos y la
// balaustrada; oscurece la pared de detrás (la sombra del techo de la galería)
function d_galeriaV(R, x0, x1, ySuelo, yTecho, luces) {
  const { rect, pset } = R, B = R.buf, M = d_P.moldura, MS = d_P.molduraS, MD = d_P.molduraD;
  for (let y = yTecho; y < ySuelo; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x; if (x < 0 || x > 319 || luces.has(B[i])) continue; B[i] = d_mezcla(B[i], hex('#2a2030'), y < yTecho + 5 ? 0.46 : 0.32); }
  rect(x0 - 1, yTecho - 1, x1 + 1, yTecho, M); rect(x0 - 1, yTecho + 1, x1 + 1, yTecho + 1, MD);   // el larguero de arriba
  for (let x = x0; x <= x1; x++) { pset(x, yTecho + 3, (x & 1) ? M : MD); } rect(x0, yTecho + 4, x1, yTecho + 4, M); rect(x0, yTecho + 2, x1, yTecho + 2, M);   // el friso de husillos
  rect(x0 - 1, ySuelo, x1 + 1, ySuelo, M); rect(x0 - 1, ySuelo + 1, x1 + 1, ySuelo + 1, MS);   // el canto del suelo
  rect(x0, ySuelo - 6, x1, ySuelo - 6, M); rect(x0, ySuelo - 5, x1, ySuelo - 5, MD);   // el pasamanos
  for (let x = x0 + 1; x < x1; x += 3) { rect(x, ySuelo - 4, x, ySuelo - 1, M); pset(x, ySuelo - 2, MS); pset(x + 1, ySuelo - 1, MD); }   // los balaustres
  const n = Math.max(2, Math.round((x1 - x0) / 12)), paso = (x1 - x0) / n;
  for (let k = 0; k <= n; k++) { const px = Math.round(x0 + k * paso) - (k === n ? 1 : 0);
    rect(px, yTecho + 1, px + 1, ySuelo - 1, M); rect(px + 1, yTecho + 5, px + 1, ySuelo - 1, MS); pset(px, yTecho + 8, MD); pset(px, ySuelo - 8, MD); rect(px - 1, ySuelo - 7, px + 2, ySuelo - 7, M);
    for (const d of [-1, 1]) { if ((k === 0 && d < 0) || (k === n && d > 0)) continue; const bx = d > 0 ? px + 2 : px - 1; pset(bx, yTecho + 5, M); pset(bx + d, yTecho + 5, M); pset(bx + 2 * d, yTecho + 5, M); pset(bx, yTecho + 6, M); pset(bx + d, yTecho + 6, MS); pset(bx, yTecho + 7, MS); } }   // las ménsulas
}

// las tejas: hiladas con su sombra, juntas al tresbolillo y alguna teja más clara; dentro(x, y) decide qué se pinta
function d_tejas(R, x0, y0, x1, y1, [cL, c, cS], dentro, sem, escama = false) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / 3), r = (y - y0) % 3, f = y * 320;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (!dentro(x, y)) continue; let col;
      if (escama) { const m = (x + (fila & 1) * 2) & 3; col = r === 2 ? (m === 0 || m === 3 ? cS : c) : r === 0 && m === 1 ? cL : c; }
      else { const m = (x + fila * 3 + sem * 2) % 6; col = r === 2 ? cS : m === 0 ? cS : h(x / 6 | 0, fila, sem + 650) < 0.18 ? cL : c; }
      B[f + x] = col; } }
}

// una casa victoriana de madera de Galveston sobre sus pilares (se pinta en la capa fija). s: { x, w, base, pisos, col,
// tej, techo 'hastial' | 'cuatro', torre 'izq', galeria 1 | 2, bow, chim, pers, persS, sem, escamas }; luz(planta, k):
// si la ventana k de esa planta está encendida. Devuelve dónde quedan sus huecos (para la vida de cada fotograma)
function d_casaV(R, s, luz, luces) {
  const { rect, pset, poligono, linea, disco } = R, { x, w, base } = s, x1 = x + w - 1, [cL, c, cS] = s.col, M = d_P.moldura, MS = d_P.molduraS, MD = d_P.molduraD;
  const f1 = base - 8, f2 = f1 - 26, e = s.pisos === 2 ? f2 - 24 : f1 - 24, cx = Math.round(x + w / 2);
  const out = { f1, f2, e, ventanas: [], chimenea: null, puerta: null, galerias: [], finial: null };
  // la chimenea de ladrillo, por detrás del tejado
  if (s.chim != null) { const hx = x + s.chim, top = e - (s.techo === 'hastial' ? Math.round(w * 0.3) : 16) - 6; rect(hx - 1, top - 1, hx + 6, top + 1, d_P.pizarraS); rect(hx, top + 2, hx + 5, e, C.ladrillo); for (let y = top + 3; y < e; y += 2) for (let xx = hx + ((y >> 1) & 1); xx < hx + 6; xx += 3) pset(xx, y, C.ladrilloS); rect(hx + 4, top + 2, hx + 5, e, C.ladrilloS); rect(hx, top, hx + 5, top, C.ladrilloL); out.chimenea = [hx + 3, top - 2]; }
  // el tejado
  if (s.techo === 'cuatro') {
    const rh = s.pisos === 2 ? 15 : 13, a = x + Math.round(w * 0.3), b = x1 - Math.round(w * 0.3), yr = e - rh;
    const dentro = (xx, yy) => { const u = (yy - yr) / rh; return xx >= lerp(a, x - 4, u) && xx <= lerp(b, x1 + 4, u); };
    d_tejas(R, x - 4, yr, x1 + 4, e, s.tej, dentro, s.sem);
    for (let yy = yr; yy <= e; yy++) { const u = (yy - yr) / rh, l = Math.round(lerp(a, x - 4, u)), r = Math.round(lerp(b, x1 + 4, u)); pset(l, yy, C.k); pset(r, yy, C.k); for (let xx = l + 1; xx < l + 1 + Math.round(u * 5); xx++) pset(xx, yy, d_mezcla(R.pget(xx, yy), C.k, 0.28)); }
    rect(a, yr - 1, b, yr - 1, C.k); rect(a, yr, b, yr, s.tej[0]);
    if (w > 46) { const dx = cx - 4, dy = e - 9; poligono([[dx - 2, dy + 1], [dx + 4, dy - 6], [dx + 10, dy + 1]], C.k); poligono([[dx - 1, dy + 1], [dx + 4, dy - 5], [dx + 9, dy + 1]], M); rect(dx, dy + 1, dx + 8, e - 1, c); rect(dx + 1, dy + 2, dx + 7, e - 2, d_P.cristalS); rect(dx + 4, dy + 2, dx + 4, e - 2, M); pset(dx + 2, dy + 3, d_P.cristalL); }   // la buhardilla
    rect(x - 5, e, x1 + 5, e + 1, M); rect(x - 5, e + 2, x1 + 5, e + 2, MD);   // el alero
  } else {
    const py = e - Math.round(w * 0.42);
    poligono([[x - 5, e + 2], [cx, py - 2], [x1 + 6, e + 2]], C.k);
    poligono([[x - 3, e + 1], [cx, py], [x1 + 4, e + 1]], s.tej[2]);
    poligono([[x - 1, e + 1], [cx, py + 2], [x1 + 2, e + 1]], M);
    const ins = (xx, yy) => { const u = (yy - (py + 5)) / (e - py - 5); return u >= 0 && xx >= cx - u * (cx - x - 2) && xx <= cx + u * (x1 - 2 - cx); };
    d_tejas(R, x, py + 5, x1, e, s.escamas ?? s.col, ins, s.sem, true);
    for (let k = 3; k < e - py; k += 3) { const u = k / (e - py); pset(Math.round(cx - u * (cx - x + 1)), py + k + 1, MD); pset(Math.round(cx + u * (x1 + 1 - cx)), py + k + 1, MD); }   // los colgantes de la moldura
    rect(cx, py + 2, cx, py + 9, M); linea(cx - 4, py + 8, cx, py + 4, M); linea(cx + 4, py + 8, cx, py + 4, M); pset(cx, py + 10, MD);   // el pendolón del hastial
    rect(cx, py - 6, cx, py - 2, C.k); pset(cx, py - 7, C.oro); out.finial = [cx, py - 7];
    const oy = Math.round(e - (e - py) * 0.4); disco(cx, oy, 4, M); disco(cx, oy, 3, luz(3, 0) ? d_P.luz : d_P.cristalS); rect(cx - 3, oy, cx + 3, oy, M); rect(cx, oy - 3, cx, oy + 3, M); if (!luz(3, 0)) pset(cx - 1, oy - 2, d_P.cristalL);   // el ojo de buey
    rect(x - 2, e, x1 + 2, e + 1, M);
  }
  // la fachada de tablas, las esquineras, la cornisa con sus canecillos y la faja entre plantas
  d_tablas(R, x, e + 2, x1, f1, cL, c, cS, s.sem);
  rect(x, e + 2, x + 1, f1, M); rect(x1 - 1, e + 2, x1, f1, MS);
  rect(x, e + 2, x1, e + 4, M); for (let xx = x + 2; xx < x1 - 1; xx += 5) { rect(xx, e + 5, xx + 1, e + 6, M); pset(xx + 1, e + 7, MD); }
  if (s.pisos === 2) { rect(x, f2 - 1, x1, f2, M); rect(x, f2 + 1, x1, f2 + 1, MD); }
  // las ventanas (dos o tres por planta) y la puerta
  const nV = w > 54 ? 3 : 2, vw = 7, puertaX = s.puerta ?? (nV === 3 ? cx - 4 : x + Math.round(w * 0.68) - 4);
  for (let p = 0; p < s.pisos; p++) { const yb = p === 0 ? f1 : f2, alto = p === 0 ? 14 : 12, y = yb - alto - 6;
    for (let k = 0; k < nV; k++) { let vx = Math.round(x + (k + 0.5) * w / nV) - (vw >> 1); if (p === 0 && Math.abs(vx + 3 - (puertaX + 4)) < 9) continue; if (p === 0 && s.bow && k === 0) continue; if (s.torre && k === 0 && vx < x + 14) vx = x + 14;
      const on = luz(p, k); d_ventanaV(R, vx, y, vw, alto, s, on); out.ventanas.push([vx, y, vx + vw - 1, y + alto - 1, p, on]); } }
  d_puertaV(R, puertaX, f1 - 18, 8, 18, d_mezcla(s.pers, C.k, 0.1), luz(0, 9)); out.puerta = [puertaX, f1 - 18, puertaX + 7, f1 - 1];
  // el mirador de la planta baja
  if (s.bow) { const bx = x + 4, by = f2 + 3; rect(bx - 1, by - 3, bx + 21, by - 1, C.k); d_tejas(R, bx - 1, by - 6, bx + 21, by - 2, s.tej, (xx, yy) => xx >= bx + (by - 2 - yy) && xx <= bx + 20 - (by - 2 - yy), s.sem + 9); rect(bx - 2, by - 1, bx + 22, by, M);
    d_tablas(R, bx, by + 1, bx + 3, f1, cS, d_mezcla(cS, C.k, 0.15), d_mezcla(cS, C.k, 0.35), s.sem); d_tablas(R, bx + 4, by + 1, bx + 16, f1, cL, c, cS, s.sem); d_tablas(R, bx + 17, by + 1, bx + 20, f1, cL, cL, c, s.sem);
    for (const [vx, vw2] of [[bx + 1, 2], [bx + 6, 9], [bx + 18, 2]]) { rect(vx - 1, by + 4, vx + vw2, by + 18, M); rect(vx, by + 5, vx + vw2 - 1, by + 17, luz(0, 5) ? d_P.luz : d_P.cristalS); rect(vx, by + 11, vx + vw2 - 1, by + 11, M); if (!luz(0, 5)) pset(vx, by + 6, d_P.cristalL); }
    rect(bx - 1, f1 - 3, bx + 21, f1, MS); out.ventanas.push([bx + 6, by + 5, bx + 14, by + 17, 0, luz(0, 5)]); }
  // las galerías
  const g1 = s.galeria === 2 ? [x + 2, x1 - 2] : s.torre ? [x + 14, x1 - 2] : s.bow ? [x + 26, x1 - 2] : [x + Math.round(w * 0.3), x1 - 2];
  if (s.galeria >= 1) { d_galeriaV(R, g1[0], g1[1], f1, s.pisos === 2 ? f2 + 2 : e + 3, luces); out.galerias.push([g1[0], g1[1], f1]);
    if (s.galeria === 1 && s.pisos === 2) { const ty = f2 - 2; d_tejas(R, g1[0] - 2, ty - 4, g1[1] + 2, ty, s.tej, () => true, s.sem + 4); rect(g1[0] - 3, ty + 1, g1[1] + 3, ty + 2, M); rect(g1[0] - 3, ty - 5, g1[1] + 3, ty - 5, C.k); } }
  if (s.galeria === 2 && s.pisos === 2) { d_galeriaV(R, x + 2, x1 - 2, f2, e + 7, luces); out.galerias.push([x + 2, x1 - 2, f2]);
    for (const hx of [x + 12, x1 - 12]) { R.linea(hx, e + 8, hx, e + 10, MD); disco(hx, e + 12, 2, C.hierbaS); pset(hx - 1, e + 11, C.hierba); pset(hx + 2, e + 13, C.hierba); pset(hx - 2, e + 14, C.hierbaS); } }   // helechos colgados
  // la torrecilla redonda de la esquina, con su tejado cónico de escamas
  if (s.torre) { const tx = x + 3, r = 8, top = e - 10, ap = top - 22;
    for (let yy = top; yy <= f1; yy++) for (let i = -r; i <= r; i++) { const u = (i + r) / (2 * r), fila = Math.floor((yy - top) / 3), rr = (yy - top) % 3; let col = u < 0.22 ? cS : u < 0.55 ? c : u < 0.86 ? cL : c; if (rr === 2) col = d_mezcla(col, C.k, 0.22); if (Math.abs(i) === r) col = C.k; pset(tx + i, yy, col); if (fila < 0) break; }
    rect(tx - r - 1, top - 2, tx + r + 1, top, M); rect(tx - r, top + 1, tx + r, top + 1, MD); rect(tx - r, f2 - 1, tx + r, f2, M);
    for (const [wy, al] of [[top + 6, 12], [f2 + 6, 13]]) { rect(tx - 2, wy - 2, tx + 2, wy + al, M); rect(tx - 1, wy - 1, tx + 1, wy + al - 1, luz(wy < f2 ? 1 : 0, 7) ? d_P.luz : d_P.cristalS); pset(tx - 1, wy, luz(wy < f2 ? 1 : 0, 7) ? d_P.luzL : d_P.cristalL); rect(tx - 1, wy + (al >> 1), tx + 1, wy + (al >> 1), M); out.ventanas.push([tx - 1, wy - 1, tx + 1, wy + al - 1, wy < f2 ? 1 : 0, luz(wy < f2 ? 1 : 0, 7)]); }
    for (let yy = ap; yy < top - 1; yy++) { const hw = Math.round((r + 2) * (yy - ap) / (top - 1 - ap)), fila = Math.floor((yy - ap) / 3), rr = (yy - ap) % 3;
      for (let i = -hw; i <= hw; i++) { const u = (i + hw) / (2 * hw + 1), m = (i + 40 + (fila & 1) * 2) & 3; let col = u < 0.3 ? s.tej[2] : u > 0.72 ? s.tej[0] : s.tej[1]; if (rr === 2 && (m === 0 || m === 3)) col = d_mezcla(col, C.k, 0.3); if (Math.abs(i) === hw) col = C.k; pset(tx + i, yy, col); } }
    rect(tx, ap - 6, tx, ap, C.k); disco(tx, ap - 2, 1, C.oro); out.finial = [tx, ap - 7]; }
  // los pilares de ladrillo con la celosía entre medias y la escalera de la entrada
  rect(x, f1 + 2, x1, base, d_P.hueco);
  for (let yy = f1 + 2; yy < base; yy++) for (let xx = x; xx <= x1; xx++) if (((xx + yy) & 3) === 0 || ((xx - yy + 400) & 3) === 0) pset(xx, yy, d_P.celosia);
  for (let px = x; px <= x1 - 2; px += Math.max(10, Math.round((w - 3) / Math.round((w - 3) / 13)))) { rect(px, f1 + 2, px + 2, base, d_P.pilar); for (let yy = f1 + 3; yy < base; yy += 2) pset(px + ((yy >> 1) & 1) * 2, yy, d_P.pilarS); }
  rect(x1 - 2, f1 + 2, x1, base, d_P.pilar);
  const ex = puertaX + 4; for (let i = 0; i < 5; i++) { const y = f1 + 2 + i * 2; rect(ex - 7, y, ex + 7, y, d_P.tablaL); rect(ex - 7, y + 1, ex + 7, y + 1, d_P.tablaS); }
  for (const d of [-1, 1]) { linea(ex + 8 * d, f1 - 6, ex + 8 * d, f1 - 1, M); linea(ex + 8 * d, f1 - 6, ex + 9 * d, base + 1, M); rect(ex + 8 * d, f1 + 1, ex + 8 * d, base + 2, MS); }
  out.escalera = [ex - 7, ex + 7, f1 + 1, base + 2];
  return out;
}

// los veleros y el vapor del puerto, detrás de las casas: mástiles con sus vergas y velas recogidas, la jarcia y la
// chimenea del vapor; el elevador de grano, los almacenes y el campanario con su reloj
function d_puertoFondo(R, nn) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P;
  // los almacenes del muelle (asoman entre las casas)
  for (const [x0, x1, y0] of [[60, 82, 86], [138, 160, 90], [210, 232, 84], [272, 292, 88]]) { rect(x0, y0, x1, 112, P.almacen); for (let y = y0 + 3; y < 112; y += 3) for (let x = x0 + ((y / 3) & 1) * 2; x < x1; x += 4) pset(x, y, P.almacenS); rect(x0, y0, x1, y0 + 1, P.almacenS); for (let x = x0 + 3; x < x1 - 3; x += 7) { rect(x, y0 + 8, x + 3, y0 + 16, hex('#3a2a2a')); pset(x + 1, y0 + 7, P.almacenS); pset(x + 2, y0 + 7, P.almacenS); } }
  // el elevador de grano: chapa ondulada, el cuerpo alto y la caseta de arriba
  { const x0 = 274, x1 = 290; rect(x0, 54, x1, 100, P.elevador); for (let x = x0; x <= x1; x += 2) rect(x, 54, x, 100, P.elevadorS); rect(x1 - 3, 54, x1, 100, P.elevadorS); poligono([[x0, 55], [(x0 + x1) / 2, 50], [x1 + 1, 55]], P.mastil); for (const wy of [60, 72]) rect(x0 + 5, wy, x0 + 7, wy + 3, hex('#5a6070')); }
  // los veleros: [x del casco, mástiles [dx, tope]]
  const barcos = [[30, [[-8, 30], [4, 26]]], [114, [[-8, 22], [6, 26]]], [192, [[-6, 24], [8, 20]]], [252, [[-6, 30], [8, 34]]]];
  for (const [bx, mas] of barcos) {
    for (let i = 0; i < mas.length - 1; i++) { const [a, ya] = mas[i], [b, yb] = mas[i + 1]; linea(bx + a, ya + 2, bx + b, yb + 12, (xx, yy) => ((xx + yy) & 1 ? P.jarcia : null)); linea(bx + b, yb + 2, bx + a, ya + 12, (xx, yy) => ((xx + yy) & 1 ? P.jarcia : null)); }
    linea(bx + mas[0][0], mas[0][1] + 2, bx + mas[0][0] - 22, 100, (xx, yy) => ((xx + yy) % 3 ? null : P.jarcia)); const ul = mas[mas.length - 1]; linea(bx + ul[0], ul[1] + 2, bx + ul[0] + 18, 100, (xx, yy) => ((xx + yy) % 3 ? null : P.jarcia));
    for (const [dx, top] of mas) { const mx = bx + dx; rect(mx, top, mx, 100, P.mastil); rect(mx + 1, top + 8, mx + 1, 100, P.mastilL); pset(mx, top - 1, P.verga);
      for (let k = 0; k < 4; k++) { const yy = top + 4 + k * 7, l = 5 + k * 2; if (yy > 92) break; rect(mx - l, yy, mx + l, yy, P.verga); rect(mx - l + 1, yy + 1, mx + l - 1, yy + 1, P.vela); for (let xx = mx - l + 2; xx < mx + l - 1; xx += 3) pset(xx, yy + 2, P.velaS); }
      linea(mx, top + 1, mx - 7, top + 26, (xx, yy) => ((xx + yy) % 3 === 0 ? P.jarcia : null)); linea(mx, top + 1, mx + 7, top + 26, (xx, yy) => ((xx + yy) % 3 === 0 ? P.jarcia : null)); }
  }
  // la chimenea del vapor (roja con la boca negra) y su mástil
  { const fx = 220; rect(fx - 3, 70, fx + 3, 100, hex('#a83a2a')); rect(fx + 1, 70, fx + 3, 100, hex('#7a2a20')); rect(fx - 3, 70, fx + 3, 74, hex('#24222a')); rect(fx - 3, 80, fx + 3, 81, C.blanco); rect(fx - 1, 66, fx + 1, 70, hex('#a83a2a')); linea(fx - 3, 76, fx - 12, 100, P.jarcia); linea(fx + 3, 76, fx + 12, 100, P.jarcia); }
  // el campanario de ladrillo claro con su reloj, el cuerpo de campanas y la aguja de pizarra
  { const x0 = 143, x1 = 157, cx = 150; rect(x0, 48, x1, 100, P.campanario); rect(x1 - 3, 48, x1, 100, P.campanarioS); for (let y = 50; y < 100; y += 4) rect(x0, y, x1, y, P.campanarioS);
    rect(x0 - 1, 46, x1 + 1, 47, P.campanarioS); rect(x0 + 3, 50, x0 + 5, 58, hex('#3a3040')); rect(x1 - 5, 50, x1 - 3, 58, hex('#3a3040')); for (let y = 51; y < 58; y += 2) { pset(x0 + 4, y, P.campanarioS); pset(x1 - 4, y, P.campanarioS); }
    disco(cx, 66, 5, C.k); disco(cx, 66, 4, C.blanco); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 3.4), Math.round(66 + Math.sin(k * Math.PI / 6) * 3.4), C.grisS);
    rect(x0 + 4, 76, x1 - 4, 86, hex('#3a3040')); poligono([[x0 + 4, 76], [cx, 72], [x1 - 3, 76]], hex('#3a3040'));
    for (let y = 22; y < 46; y++) { const hw = Math.round(7 * (y - 22) / 24); rect(cx - hw, y, cx + hw, y, P.pizarra); rect(cx + Math.ceil(hw / 2), y, cx + hw, y, P.pizarraL); pset(cx - hw, y, P.pizarraS); }
    rect(cx, 17, cx, 22, C.k); rect(cx - 1, 18, cx + 1, 18, C.k); }
}

// los postes del telégrafo de la acera de enfrente (x) y el de delante, a la izquierda
const d_POSTES = [104, 236];

// los cables: dos crucetas por poste y cuatro hilos en cada una, con su comba; el hilo del tranvía y sus tirantes
function d_cablesCalle(R) {
  const { pset, linea } = R, cab = hex('#3a3a46');
  const pts = [-20, ...d_POSTES, 360];
  for (const [yb, dxs] of [[41, [-7]], [46, [5]]]) for (const dx of dxs) for (let i = 0; i < pts.length - 1; i++) { const a = pts[i] + dx, b = pts[i + 1] + dx, baja = i === pts.length - 2 ? 16 : 0;
    for (let x = a; x <= b; x++) { const u = (x - a) / (b - a); pset(x, Math.round(yb + baja * u + 5 * 4 * u * (1 - u)), cab); } }
  for (let x = 0; x < 320; x++) pset(x, 100, d_P.hierro);   // el hilo del tranvía
  for (const px of d_POSTES) { linea(px, 92, px + 1, 100, d_P.hierro); linea(px + 1, 92, px + 40, 99, (xx, yy) => ((xx + yy) & 1 ? d_P.hierro : null)); linea(px - 1, 92, px - 40, 99, (xx, yy) => ((xx + yy) & 1 ? d_P.hierro : null)); }
  for (const [yb, y2, dx] of [[34, 42, -7], [39, 47, 5]]) linea(16 + dx, yb + 1, d_POSTES[0] + dx, y2, cab);   // del poste de delante al de enfrente
}

// la capa fija de la calle: cielo, puerto, casas, jardines, aceras y calzada (sin lo que se mueve)
function d_calleFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, linea } = R, B = R.buf, P = d_P, luces = new Set([P.luz, P.luzS, P.luzL]);
  d_degradado(R, 0, 112, d_CIELOS[nn ? (cielo === 'claro' ? 'nocheClara' : 'noche') : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [226, 24, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  if (nn && cielo === 'claro') { disco(226, 26, 6, hex('#f4ecd0')); disco(229, 24, 5, d_CIELOS.nocheClara[1][1]); }
  // la bruma del horizonte, sobre la bahía
  for (let y = 90; y < 112; y++) for (let x = 0; x < 320; x++) if (d_umbral(x, y) < (y - 90) / 26) B[y * 320 + x] = d_mezcla(B[y * 320 + x], nn ? hex('#1a2230') : cielo === 'claro' ? P.bruma : hex('#9aa2ae'), 0.6);
  const foto = marca();
  d_puertoFondo(R, nn);
  // una bruma ligera sobre el puerto, que lo empuja hacia el fondo
  for (let y = 16; y < 112; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i] !== foto[i]) B[i] = d_mezcla(B[i], foto[i], 0.22); }
  // la fragata atracada en el hueco entre las dos primeras casas, con todo el aparejo largado: los tres palos, las
  // vergas, las velas cuadradas que se hinchan (mayor, gavia, juanete y sobrejuanete), los estays y el gallardete
  { const P2 = d_P, palos = [[61, 30], [71, 20], [81, 32]];
    for (const [mx, top] of palos) { rect(mx, top, mx, 102, P2.mastil); rect(mx + 1, top + 10, mx + 1, 102, P2.mastilL); }
    linea(61, 32, 71, 22, P2.jarcia); linea(71, 22, 81, 34, P2.jarcia); linea(61, 32, 52, 70, P2.jarcia); linea(81, 34, 92, 70, P2.jarcia);
    for (const [mx, top] of palos) { const tiers = mx === 71 ? [[top + 4, 4, 4], [top + 10, 6, 6], [top + 18, 8, 8], [top + 28, 9, 11]] : [[top + 4, 4, 4], [top + 10, 5, 6], [top + 18, 7, 8], [top + 28, 8, 10]];
      for (const [y0, l, al] of tiers) { rect(mx - l - 1, y0, mx + l + 1, y0, P2.verga); for (let y = y0 + 1; y <= y0 + al; y++) { const u = (y - y0) / al, panza = Math.round(Math.sin(u * Math.PI) * 1.5), w = Math.round(l + u); for (let x = mx - w + panza; x <= mx + w + panza; x++) pset(x, y, x >= mx + w - 1 + panza ? P2.velaS : y === y0 + al ? P2.velaS : (x + y) % 7 === 0 ? hex('#ede4d2') : hex('#f4ecdc')); } } }
    for (let y = 26; y < 62; y++) { const u = (y - 26) / 36, x1 = 60, x0 = Math.round(60 - 10 * u); for (let x = x0; x < x1; x++) pset(x, y, x === x0 ? P2.velaS : hex('#f4ecdc')); } }
  // las casas
  const lucesAbajo = nn ? 0.5 : 0, info = [];
  d_CASAS().forEach((s, k) => { s.base = 112; info.push(d_casaV(R, s, (p, j) => (nn ? (p >= 1 ? h(k, j, 660) < 0.85 : h(k, j, 661) < lucesAbajo) : false), luces)); });
  // los jardines: el césped, las adelfas de los huecos, los arriates y la valla de estacas con sus cancelas
  for (let y = 112; y < 120; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 112 ? P.cespedS : h(x, y, 662) < 0.14 ? P.cespedL : h(x, y, 663) < 0.1 ? P.cespedS : P.cesped;
  for (const [ax, sem] of [[68, 1], [146, 2], [220, 3], [282, 4]]) for (let k = 0; k < 7; k++) { const bx = ax + Math.round((h(k, sem, 664) - 0.5) * 16), by = 108 - Math.round(h(k, sem, 665) * 14), r = 3 + Math.round(h(k, sem, 666) * 3);
    disco(bx, by + 1, r, P.adelfaS); disco(bx - 1, by, r - 1, P.adelfa); for (let j = 0; j < 4; j++) { const fx = bx + Math.round((h(k, j, 667) - 0.5) * r * 2), fy = by + Math.round((h(k, j, 668) - 0.6) * r * 1.6); pset(fx, fy, j % 3 ? P.adelfaF : P.adelfaB); } }
  info.forEach((inf, k) => { for (let x = d_CASAS()[k].x + 2; x < d_CASAS()[k].x + d_CASAS()[k].w - 2; x += 4) { const fx = x + (k % 2); pset(fx, 111, [C.rojo, C.rosa, C.amarillo, C.blanco][(x >> 2) % 4]); pset(fx + 1, 111, C.hierbaS); } });
  { const gates = info.map((inf) => inf.escalera); for (let x = 0; x < 320; x++) { const enGate = gates.some(([a, b]) => x >= a - 1 && x <= b + 1); if (enGate) continue;
      if (x % 3 === 0) { rect(x, 115, x, 120, P.moldura); pset(x, 114, P.moldura); pset(x - 1, 121, P.cespedS); } pset(x, 116, P.molduraS); pset(x, 119, P.molduraS); } }
  for (const [a, b, , yb] of info.map((inf) => inf.escalera)) { rect(a - 1, yb, b + 1, 119, hex('#c8b89a')); for (let y = yb + 1; y < 120; y += 2) rect(a - 1, y, b + 1, y, hex('#b0a080')); rect(a - 2, 113, a - 2, 120, P.moldura); rect(b + 2, 113, b + 2, 120, P.moldura); }
  // la acera de tablas de enfrente y el bordillo
  for (let y = 120; y < 124; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 120 ? P.tablaL : (x + (y & 1) * 3) % 9 === 0 ? P.tablaS : h(x, y, 669) < 0.06 ? P.tablaS : P.tabla;
  rect(0, 124, 319, 124, P.bordillo); rect(0, 125, 319, 125, P.bordilloS);
  // la calzada de conchas machacadas, con las rodadas, las vías del tranvía y alguna boñiga
  for (let y = 126; y < 149; y++) { const f = y * 320, rod = (y >= 130 && y <= 132) || (y >= 145 && y <= 147);
    for (let x = 0; x < 320; x++) { const q = h(x, y, 670); B[f + x] = q < 0.07 ? P.conchaS : q > 0.93 ? P.conchaL : rod && h(x >> 1, y, 671) < 0.6 ? P.rodada : P.concha; } }
  for (let x = 0; x < 320; x += 5) { linea(x, 140, x + 1, 143, P.traviesa); pset(x + 2, 141, P.traviesa); }
  for (const ry of [139, 143]) { rect(0, ry, 319, ry, P.riel); for (let x = 0; x < 320; x++) if ((x + ry) % 7 < 4) pset(x, ry, P.rielL); rect(0, ry + 1, 319, ry + 1, hex('#5a5048')); }
  for (const [mx, my] of [[48, 134], [190, 146], [262, 131]]) { pset(mx, my, hex('#7a6040')); pset(mx + 1, my, hex('#6a5030')); pset(mx, my - 1, hex('#8a7050')); }
  // el bordillo de granito de este lado y la acera de ladrillo, con sus hiladas cada vez más altas
  rect(0, 149, 319, 149, hex('#e0dcd4')); rect(0, 150, 319, 151, P.bordillo); rect(0, 152, 319, 152, P.bordilloS);
  const hil = [153, 156, 159, 163, 167, 172, 177, 181];
  for (let y = 153; y < 180; y++) { const f = y * 320, r = hil.findIndex((v) => y < v), y0 = hil[r - 1] ?? 153, L = 8 + r * 2, junta = y === y0;
    for (let x = 0; x < 320; x++) { const xx = x + (r & 1) * (L >> 1), k = Math.floor(xx / L); let c;
      if (junta || xx % L === 0) c = h(k, r, 672) < 0.15 ? P.musgo : P.mortero;
      else { const q = h(k, r, 673); c = q < 0.25 ? P.ladr0 : q < 0.5 ? P.ladr1 : q < 0.75 ? P.ladr2 : P.ladr3; if (y === y0 + 1) c = d_mezcla(c, C.blanco, 0.12); if (h(x, y, 674) < 0.04) c = d_mezcla(c, C.k, 0.2); }
      B[f + x] = c; } }
  // las sombras de la farola, del poste y de la boca de riego sobre la acera
  if (cielo === 'claro' && !nn) { for (let i = 0; i < 30; i++) { const xx = 301 - i, yy = 156 + Math.round(i * 0.28); pset(xx, yy, d_mezcla(R.pget(xx, yy), C.k, 0.3)); pset(xx, yy + 1, d_mezcla(R.pget(xx, yy + 1), C.k, 0.3)); }
    for (let i = 0; i < 9; i++) rect(266 - i, 158 + (i >> 2), 268 - i, 158 + (i >> 2), d_mezcla(R.pget(266 - i, 158), C.k, 0.3));
    for (let i = 0; i < 12; i++) rect(44 - i, 160 + (i >> 2), 46 - i, 160 + (i >> 2), d_mezcla(R.pget(44 - i, 160), C.k, 0.3)); }
  d_cablesCalle(R);
  mascara();
  if (!nn && cielo !== 'claro') d_nublado(R, foto, cielo);
  if (nn) d_anochecer(R, foto, luces);
  return info;
}

// una palmera datilera de jardín: el tronco con sus cicatrices en rombo y su lado de luz, la falda de hojas secas, los
// dátiles y la copa de palmas en arco en tres tonos (las de atrás más oscuras), que se mece y, con viento, se dobla y
// tira de las palmas hacia un lado; tn: el tinte de la noche
function d_palmera(R, x, base, alto, t, viento, tn, sem = 0) {
  const { pset } = R, m = Math.sin(t * (1.1 + viento * 2.2) + x * 0.7) * (1.2 + viento * 2), top = base - alto, dob = viento * 9;
  const lean = (u) => Math.round(u * (1.5 + m * 0.6) - dob * u * u);
  const tr = tn(C.corteza), trS = tn(C.cortezaS), trL = tn(hex('#b0a08c')), trD = tn(d_mezcla(C.corteza, C.k, 0.25)), k = tn(C.k);
  for (let y = base; y >= top; y--) { const u = (base - y) / alto, xx = x + lean(u), r = (y + (xx & 1) + sem) % 4;
    for (let i = -2; i <= 2; i++) pset(xx + i, y, i === -2 ? trL : i === 2 ? trS : r === 0 ? trD : tr); pset(xx - 3, y, k); pset(xx + 3, y, k); if (r === 2) { pset(xx - 1, y, trS); pset(xx + 1, y, trS); } }
  for (let i = -3; i <= 3; i++) pset(x + i, base, trS);
  const cx = x + lean(1), cy = top, seca = tn(hex('#9a7a44')), secaS = tn(hex('#7a5a30'));
  for (let j = 0; j < 9; j++) { const a = Math.PI / 2 + (j - 4) * 0.22, l = 5 + (j % 3); for (let d = 1; d < l; d++) pset(Math.round(cx + Math.cos(a) * d * 0.9 - viento * d * 0.4), cy + 2 + d, d > l - 2 ? secaS : seca); }
  const palma = (a, l, c, cS, cL) => { for (let d = 1; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d - viento * f * f * l * 0.55), yy = Math.round(cy + Math.sin(a) * d * 0.62 + f * f * l * (0.55 - viento * 0.3));
      pset(xx, yy, f > 0.82 ? cL : c); pset(xx, yy + 1, c); if (d > 2) { const fl = Math.max(1, Math.round((1 - f) * 4 + 0.5)); for (let j = 1; j <= fl; j++) pset(xx - Math.round(viento * j * 0.6), yy + j, j === fl ? cS : c); if (d % 2 === 0) pset(xx, yy - 1, cS); } } };
  const sw = (j) => Math.sin(t * (1.6 + viento * 3) + j * 0.9 + x) * (0.05 + viento * 0.08) + m * 0.02;
  const P0 = tn(hex('#2e6a2a')), P0S = tn(hex('#245a24')), P0L = tn(C.hierbaS), P1 = tn(C.hierba), P1L = tn(C.verdeL), P1S = tn(C.hierbaS), P1H = tn(C.hierbaL);
  for (let j = 0; j < 11; j++) palma(-Math.PI - 0.15 + j * ((Math.PI + 0.3) / 10) + sw(j), 15 + (j % 3) * 3, P0, P0S, P0L);
  R.disco(cx, cy + 1, 3, tn(hex('#6a5a3a'))); for (let j = 0; j < 5; j++) pset(cx - 2 + j, cy + 3 + (j % 2), tn(C.naranja));
  for (let j = 0; j < 12; j++) palma(-Math.PI - 0.35 + j * ((Math.PI + 0.7) / 11) + sw(j + 9), 12 + ((j * 5) % 4) * 2, j % 2 ? P1 : P1L, P1S, P1H);
}

// un paseante pequeño (unos 11 px) con sombrero: k elige quién (caballero con bombín, señora con sombrilla, hombre con
// canotier, señora con cesta, niño con su aro, caballero con chistera y bastón); dir ±1; anda o no
function d_paseante(R, x, suelo, t, k, dir = 1, anda = true, tn = (c) => c) {
  const { pset, rect } = R, tipo = k % 6, paso = anda ? Math.floor(t * 5 + k) % 2 : 0, X = (i) => Math.round(x + i * dir);
  const ropa = [[hex('#3a3a4a'), hex('#2a2a36')], [hex('#c86a7a'), hex('#9a4a5a')], [hex('#d8cfb8'), hex('#a89e88')], [hex('#5a7aa8'), hex('#3e5a80')], [hex('#6a5a4a'), hex('#4a3e32')], [hex('#2a2a30'), hex('#1a1a20')]][tipo].map(tn);
  const piel = tn([d_P.piel, d_P.pielD, d_P.piel, d_P.pielS, d_P.piel, d_P.piel][tipo]), k0 = tn(C.k);
  const mujer = tipo === 1 || tipo === 3, nino = tipo === 4, y = suelo - (nino ? 8 : 11);
  if (mujer) { for (let j = 0; j < 6; j++) { const w = 1 + (j >> 1); rect(Math.min(X(-w), X(w + 1)), y + 5 + j, Math.max(X(-w), X(w + 1)), y + 5 + j, j === 5 ? ropa[1] : ropa[0]); } pset(X(paso ? -2 : 3), suelo, k0); }
  else { const pi = tn(tipo === 2 ? hex('#a89e88') : hex('#2a2a34')); rect(X(0), y + 7, X(0), suelo - (paso ? 1 : 0), pi); rect(X(1), y + 7, X(1), suelo - (paso ? 0 : 1), pi); pset(X(paso ? -1 : 2), suelo, k0); pset(X(paso ? 1 : 0), suelo, k0); }
  rect(Math.min(X(-1), X(2)), y + 3, Math.max(X(-1), X(2)), y + (mujer ? 5 : 7), ropa[0]); pset(X(2), y + 4, ropa[1]); pset(X(-1), y + 6, ropa[1]);
  rect(Math.min(X(0), X(1)), y + 1, Math.max(X(0), X(1)), y + 2, piel); pset(X(2), y + 2, piel);
  const som = tn([hex('#2a2a30'), hex('#f0e0c8'), hex('#e8d8a0'), hex('#8a5a3a'), hex('#5a4a3a'), hex('#1a1a20')][tipo]);
  if (tipo === 1 || tipo === 3) { rect(Math.min(X(-2), X(3)), y, Math.max(X(-2), X(3)), y, som); rect(Math.min(X(-1), X(2)), y - 1, Math.max(X(-1), X(2)), y - 1, som); pset(X(2), y - 2, tn(C.rojo)); }
  else if (tipo === 5) { rect(Math.min(X(-1), X(2)), y, Math.max(X(-1), X(2)), y, som); rect(Math.min(X(0), X(1)), y - 3, Math.max(X(0), X(1)), y - 1, som); }
  else if (tipo === 2) { rect(Math.min(X(-2), X(3)), y, Math.max(X(-2), X(3)), y, som); rect(Math.min(X(0), X(1)), y - 1, Math.max(X(0), X(1)), y - 1, som); pset(X(0), y - 1, tn(hex('#2a2a6a'))); }
  else { rect(Math.min(X(-1), X(2)), y, Math.max(X(-1), X(2)), y, som); rect(Math.min(X(0), X(1)), y - 1, Math.max(X(0), X(1)), y - 1, som); }
  if (tipo === 1) { const sx = X(1), sy = y - 4; rect(sx, sy, sx, y + 3, k0); rect(sx - 3, sy, sx + 3, sy, tn(hex('#f4e8f0'))); rect(sx - 2, sy - 1, sx + 2, sy - 1, tn(hex('#f4e8f0'))); pset(sx - 3, sy + 1, tn(hex('#d8b8c8'))); pset(sx + 3, sy + 1, tn(hex('#d8b8c8'))); pset(sx, sy - 2, tn(hex('#d8b8c8'))); }   // la sombrilla
  if (tipo === 3) { rect(Math.min(X(2), X(4)), y + 5, Math.max(X(2), X(4)), y + 6, tn(hex('#a8844a'))); pset(X(3), y + 4, tn(hex('#a8844a'))); pset(X(3), y + 5, tn(C.rojo)); }   // la cesta
  if (tipo === 5) { R.linea(X(2), y + 5, X(4), suelo, tn(hex('#6a4a2a'))); }   // el bastón
  if (tipo === 4) { const ax = X(6), ay = suelo - 3, g = t * 8 * dir; R.anillo(ax + 0.5, ay + 0.5, 3, tn(hex('#8a6a3a'))); pset(Math.round(ax + Math.cos(g) * 2), Math.round(ay + Math.sin(g) * 2), tn(hex('#5a4a2a'))); R.linea(X(2), y + 5, ax - dir, ay - 1, tn(hex('#6a4a2a'))); }   // el aro
}

// el tranvía eléctrico abierto de Galveston (o, con mulas, el viejo tranvía cerrado): x es la trasera según dir; suelo,
// los rieles. Pasajeros pequeños con sombrero, el conductor en la plataforma, el trole con chispas
function d_tranvia(R, x, suelo, t, dir = 1, mulas = false) {
  const { rect, pset, linea, disco } = R, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  const amar = hex('#d8a840'), amarS = hex('#a87a2a'), amarL = hex('#f0cc68'), roj = hex('#a83a2a'), verde = hex('#2e4a3a'), techo = hex('#e8e0d0'), techoS = hex('#b8ae9c');
  if (mulas) {
    const L = 40; r(0, L, suelo - 26, suelo - 6, C.k); r(1, L - 1, suelo - 25, suelo - 7, amar); r(1, L - 1, suelo - 12, suelo - 7, roj); r(1, L - 1, suelo - 25, suelo - 24, amarL);
    for (let i = 4; i < L - 4; i += 7) { r(i, i + 4, suelo - 22, suelo - 15, d_P.cristalS); pset(X(i + 1), suelo - 21, d_P.cristalL); pset(X(i + 2), suelo - 18, d_P.piel); pset(X(i + 2), suelo - 19, hex('#2a2a30')); }
    r(-2, L + 2, suelo - 28, suelo - 26, techo); r(-2, L + 2, suelo - 27, suelo - 27, techoS); for (const wx of [7, L - 7]) { disco(X(wx), suelo - 3, 3, C.k); disco(X(wx), suelo - 3, 1, C.metal); }
    r(L + 1, L + 5, suelo - 10, suelo - 8, verde);
    R.caballo(dir > 0 ? X(L + 6) : X(L + 6) - 26, suelo, t, { dir, galopa: true, color: hex('#8a7a6a'), sombra: hex('#6a5a4a') });
    const ox = dir > 0 ? X(L + 26) : X(L + 26); pset(ox, suelo - 21, hex('#6a5a4a')); pset(ox, suelo - 22, hex('#6a5a4a')); pset(ox - dir, suelo - 22, hex('#6a5a4a'));   // las orejas largas de la mula
    return;
  }
  const L = 68, y0 = suelo - 30;
  // el trole hasta el hilo, con chispas de vez en cuando
  linea(X(10), y0 - 2, X(-14), 100, C.k); linea(X(11), y0 - 2, X(-13), 100, hex('#4a4a52')); if (Math.sin(t * 23) > 0.85) { pset(X(-14), 101, hex('#e8f0ff')); pset(X(-15), 99, hex('#9ab8ff')); pset(X(-13), 102, hex('#ffffff')); }
  // el techo con su linternón, los pies derechos y las cortinas recogidas
  r(-2, L + 2, y0 - 1, y0 + 2, C.k); r(-1, L + 1, y0, y0 + 1, techo); r(8, L - 8, y0 - 3, y0 - 1, techoS); r(8, L - 8, y0 - 4, y0 - 4, C.k); for (let i = 10; i < L - 9; i += 4) pset(X(i), y0 - 2, d_P.cristalS);
  r(-1, L + 1, y0 + 3, y0 + 4, roj); for (let i = 0; i <= L; i += 2) pset(X(i), y0 + 4, (i >> 1) & 1 ? C.blanco : roj);
  for (let i = 4; i <= L - 4; i += 8) { r(i, i, y0 + 5, suelo - 9, verde); }
  // los bancos con los pasajeros
  for (let i = 8, k = 0; i < L - 6; i += 8, k++) { const quien = h(k, 1, 680), alt = quien < 0.25;
    if (quien < 0.85) { const px = X(i - 4), hx = Math.round(Math.sin(t * 7 + k) > 0.97 ? 1 : 0); rect(px - 1, y0 + 12, px + 1, y0 + 17, [hex('#3a3a4a'), hex('#c86a7a'), hex('#5a7aa8'), hex('#d8cfb8')][k % 4]); rect(px - 1, y0 + 9 + hx, px, y0 + 11 + hx, d_P.piel); rect(px - 2, y0 + 8 + hx, px + 1, y0 + 8 + hx, alt ? hex('#f0e0c8') : hex('#2a2a30')); if (alt) pset(px - 1, y0 + 7 + hx, C.rojo); else pset(px, y0 + 7 + hx, hex('#2a2a30')); }
    if (h(k, 2, 680) < 0.6) { const px = X(i - 2); rect(px, y0 + 13, px + 1, y0 + 17, [hex('#6a5a4a'), hex('#4a6a8a'), hex('#8a3a4a')][k % 3]); rect(px, y0 + 10, px + 1, y0 + 12, d_P.pielS); rect(px - 1, y0 + 9, px + 2, y0 + 9, hex('#e8d8a0')); } }
  // la caja: los costados con sus franjas, el estribo y el número
  r(0, L, suelo - 13, suelo - 7, C.k); r(1, L - 1, suelo - 12, suelo - 8, amar); r(1, L - 1, suelo - 12, suelo - 12, amarL); r(1, L - 1, suelo - 9, suelo - 8, amarS); r(1, L - 1, suelo - 10, suelo - 10, roj);
  for (let i = 6; i < L - 6; i += 8) { r(i, i + 5, suelo - 12, suelo - 11, d_mezcla(amar, C.k, 0.12)); }
  r(-1, L + 1, suelo - 6, suelo - 5, hex('#3a3a40')); r(2, L - 2, suelo - 4, suelo - 4, hex('#5a5a62'));
  // las plataformas: el conductor delante con su manivela, el faro y el cobrador detrás
  r(L - 1, L + 3, y0 + 5, suelo - 8, amarS); r(L + 2, L + 3, y0 + 10, y0 + 13, C.k); pset(X(L + 3), y0 + 11, hex('#fff6d0'));
  { const mx = X(L - 3); rect(mx - 1, y0 + 12, mx + 1, y0 + 19, hex('#24324a')); rect(mx - 1, y0 + 9, mx, y0 + 11, d_P.piel); rect(mx - 2, y0 + 8, mx + 1, y0 + 8, hex('#24324a')); pset(mx + dir, y0 + 15, C.k); pset(mx + dir * 2, y0 + 14 + (Math.floor(t * 2) % 2), C.metal); }
  { const cx = X(2); rect(cx - 1, y0 + 12, cx + 1, y0 + 19, hex('#24324a')); rect(cx - 1, y0 + 9, cx, y0 + 11, d_P.pielD); rect(cx - 2, y0 + 8, cx + 1, y0 + 8, hex('#24324a')); }
  // las ruedas de los bogies, que giran
  for (const wx of [9, 17, L - 17, L - 9]) { disco(X(wx), suelo - 2, 3, C.k); disco(X(wx), suelo - 2, 1.5, C.metalS); const a = t * 10 * dir; pset(Math.round(X(wx) + Math.cos(a) * 2), Math.round(suelo - 2 + Math.sin(a) * 2), C.metalL); }
}

// un coche de caballos (calesa con capota) o el carro del hielo, de lado, con su caballo al trote y el cochero
function d_coche(R, x, suelo, t, tipo, dir) {
  const { rect, pset, disco, linea } = R, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  R.caballo(dir > 0 ? X(24) : X(24) - 26, suelo, t, { dir, galopa: true, color: tipo === 'hielo' ? hex('#4a3a32') : hex('#8a5a32'), sombra: tipo === 'hielo' ? hex('#2e241e') : hex('#5a3418') });
  linea(X(14), suelo - 9, X(27), suelo - 11, C.k);   // las varas
  if (tipo === 'hielo') {
    r(-2, 20, suelo - 22, suelo - 7, C.k); r(-1, 19, suelo - 21, suelo - 8, hex('#e8eef4')); r(-1, 19, suelo - 21, suelo - 20, hex('#3a6ab8')); r(-1, 19, suelo - 9, suelo - 8, hex('#3a6ab8'));
    { const sx = X(9), sy = suelo - 15; for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3; linea(Math.round(sx - Math.cos(a) * 3), Math.round(sy - Math.sin(a) * 3), Math.round(sx + Math.cos(a) * 3), Math.round(sy + Math.sin(a) * 3), hex('#3a6ab8')); } }   // el copo pintado
    if (Math.floor(t * 3) % 2) pset(X(4), suelo - 6, hex('#a8d0f0'));   // gotea el hielo
    const cx = X(20); rect(cx - 1, suelo - 20, cx + 1, suelo - 14, hex('#5a4a3a')); rect(cx - 1, suelo - 23, cx, suelo - 21, d_P.pielD); rect(cx - 2, suelo - 24, cx + 1, suelo - 24, hex('#e8d8a0'));
    for (const wx of [3, 15]) { disco(X(wx), suelo - 4, 4, C.k); disco(X(wx), suelo - 4, 3, hex('#a83a2a')); disco(X(wx), suelo - 4, 1, C.k); const a = t * 8 * dir; for (let k = 0; k < 3; k++) { const b = a + k * 2.1; pset(Math.round(X(wx) + Math.cos(b) * 2), Math.round(suelo - 4 + Math.sin(b) * 2), C.k); } }
  } else {
    r(2, 14, suelo - 13, suelo - 8, C.k); r(3, 13, suelo - 12, suelo - 9, hex('#2a2a34')); r(3, 13, suelo - 12, suelo - 12, hex('#5a5a6a'));
    linea(X(1), suelo - 26, X(11), suelo - 26, C.k); for (let i = 0; i < 8; i++) linea(X(1 + i), suelo - 26 + (i < 2 ? 2 - i : 0), X(1 + i), suelo - 14, (xx, yy) => (i < 2 || yy < suelo - 24 ? hex('#3a3a46') : null)); r(1, 2, suelo - 24, suelo - 14, hex('#3a3a46'));   // la capota
    const cx = X(9); rect(cx - 1, suelo - 19, cx + 1, suelo - 13, hex('#4a3a5a')); rect(cx - 1, suelo - 22, cx, suelo - 20, d_P.piel); rect(cx - 2, suelo - 23, cx + 1, suelo - 23, hex('#2a2a30')); pset(cx - 1, suelo - 24, hex('#2a2a30'));
    linea(X(10), suelo - 17, X(30), suelo - 18, hex('#4a3a2a'));   // las riendas
    for (const wx of [5, 13]) { disco(X(wx), suelo - 5, 5, C.k); disco(X(wx), suelo - 5, 4, hex('#3a2a20')); disco(X(wx), suelo - 5, 3, C.k); const a = t * 7 * dir; for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 4; linea(Math.round(X(wx) - Math.cos(b) * 3), Math.round(suelo - 5 - Math.sin(b) * 3), Math.round(X(wx) + Math.cos(b) * 3), Math.round(suelo - 5 + Math.sin(b) * 3), hex('#8a6a4a')); } pset(X(wx), suelo - 5, C.oro); }
  }
}

// la farola de gas de hierro fundido (base, fuste con su anillo, la barra del farolero y el farol de cuatro cristales);
// encendida: 0–1 (de noche, el halo y el cono de luz); tn: el tinte de la noche
function d_farola(R, x, base, alto, enc, t, tn) {
  const { pset, poligono } = R, rect = (a, b, c2, d, col) => { for (let y = b; y <= d; y++) for (let xx = a; xx <= c2; xx++) pset(xx, y, col); }, H = tn(d_P.hierro), HL = tn(d_P.hierroL), HS = tn(d_P.hierroS), top = base - alto;
  rect(x - 2, base - 4, x + 2, base, H); rect(x - 3, base - 1, x + 3, base, HS); rect(x - 1, base - 6, x + 1, base - 5, HL);
  rect(x, top + 10, x + 1, base - 5, H); pset(x, top + 14, HL); rect(x - 1, top + 22, x + 2, top + 23, HL); rect(x - 4, top + 11, x + 5, top + 11, H); pset(x - 4, top + 10, H); pset(x + 5, top + 10, H);
  const parp = enc > 0 && enc < 1 ? (Math.sin(t * 31) > 0.2 ? 1 : 0.3) : enc;
  rect(x - 3, top + 2, x + 4, top + 9, H); rect(x - 2, top + 3, x + 3, top + 8, parp > 0.5 ? d_P.farol : parp > 0 ? d_P.luzS : tn(d_P.cristalS)); if (parp > 0.5) rect(x, top + 4, x + 1, top + 7, d_P.farolL); else pset(x - 1, top + 4, tn(d_P.cristalL));
  rect(x - 2, top + 3, x - 2, top + 8, H); rect(x + 3, top + 3, x + 3, top + 8, H);
  poligono([[x - 4, top + 2], [x + 0.5, top - 2], [x + 6, top + 2]], H); pset(x, top - 3, HL); rect(x - 3, top + 1, x + 4, top + 1, HL);
  if (parp > 0.5) for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 1.1); if (d > 4 && d < 12 && d_umbral(x + i, top + 5 + j) < (12 - d) / 14) { const xx = x + i, yy = top + 5 + j, c = R.pget(xx, yy); pset(xx, yy, d_mezcla(c, d_P.farol, 0.35 * parp)); } }
}

// el poste de madera del telégrafo: las vetas, las crucetas con sus aisladores y los clavos para subir; hasta: dónde se
// corta por abajo (el agua)
function d_poste(R, x, base, top, ancho, tn, hasta = 999) {
  const { rect, pset } = R, P = d_P, y1 = Math.min(base, hasta), hw = ancho >> 1;
  for (let y = top; y <= y1; y++) { for (let i = -hw; i <= hw; i++) pset(x + i, y, tn(i === -hw ? P.posteL : i >= hw - (ancho > 3 ? 1 : 0) ? P.posteS : (h(i, y >> 2, 690) < 0.2 ? P.posteS : P.poste))); pset(x - hw - 1, y, tn(C.k)); pset(x + hw + 1, y, tn(C.k)); if (y > top + 30 && (y - top) % 9 === 0 && y < y1) pset(x + (((y - top) / 9) & 1 ? hw + 2 : -hw - 2), y, tn(P.hierroL)); }
  const ca = ancho > 3 ? [[top + 4, 13], [top + 9, 11]] : [[top + 3, 9], [top + 8, 8]];
  for (const [cy, l] of ca) { if (cy > y1) continue; rect(x - l, cy, x + l, cy + 1, tn(P.posteS)); rect(x - l, cy, x + l, cy, tn(P.poste)); for (let i = -l + 1; i <= l - 1; i += Math.max(3, Math.round(l / 2.4))) { pset(x + i, cy - 1, tn(P.aislador)); pset(x + i, cy - 2, tn(hex('#8ad8c8'))); } R.linea(x - 3, cy + 5, x - l + 2, cy + 2, tn(P.posteS)); R.linea(x + 3, cy + 5, x + l - 2, cy + 2, tn(P.posteS)); }
}

// el agua de la calle: d (pies) sobre el asfalto de conchas; devuelve la línea de flotación de cada cosa: wl(yBase, cota)
function d_nivel(d) {
  const k = (y) => lerp(2.5, 5.2, d_lim((y - 112) / 66));
  const wl = (yb, cota) => yb - Math.max(0, d - cota) * k(yb);
  const top = d <= 0 ? 999 : d <= 0.6 ? 126 : d <= 1.2 ? Math.round(lerp(124, 112, (d - 0.6) / 0.6)) : Math.round(wl(112, 1.2));
  return { wl, top, soloCalzada: d > 0 && d <= 0.6 };
}

// ══ la calle (cada fotograma) ══
function d_galCalle(R, t, S) {
  const { o, agua, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, d = agua * 15, niv = d_nivel(d), B = R.buf;
  const capa = d_fondo(R, 'calle|' + cielo, noche, (n, mc, mk) => d_calleFijo(R, cielo, n, mc, mk)), m = capa.m;
  const casas = capa.info;
  // el cielo que se mueve, los pájaros y los humos
  d_nubesGal(R, t, m, 112, cielo, nn, viento);
  const destello = agua > 0 || (cielo === 'tormenta' && nn) ? d_rayo(R, t, m, 100) : 0;
  if (!nn && cielo !== 'tormenta') { for (let k = 0; k < 3; k++) { const x = Math.round(((k * 131 + t * (9 + k * 3) * (1 + viento)) % 380) - 30), y = 30 + k * 12 + Math.round(Math.sin(t * 0.9 + k) * 3); if (m[y * 320 + x] && !(x > 268 && y < 50)) R.gaviota(x, y, t, k); } }
  const tranquilo = (x, y) => (x > 270 && y < 50) || (x > 14 && x < 176 && y < 18);
  for (const [k, c] of casas.entries()) if (c.chimenea && (nn || cielo !== 'claro' || k === 3)) { const [hx, hy] = c.chimenea; for (let i = 0; i < 5; i++) { const u = (t * (0.4 + viento * 0.6) + i / 5) % 1, sx = Math.round(hx + u * (6 + viento * 26) + Math.sin(t * 2 + i) * 1.2), sy = Math.round(hy - u * (14 - viento * 9)); if (!tranquilo(sx, sy)) d_discoM(B, m, sx, sy, u < 0.4 ? 1 : 2, tn(u > 0.6 ? hex('#a8a8b0') : hex('#d0d0d4'))); } }
  { const fx = 220; for (let i = 0; i < 7; i++) { const u = (t * 0.25 + i / 7) % 1, sx = Math.round(fx + u * (10 + viento * 40) + Math.sin(t + i * 2) * 2), sy = Math.round(64 - u * (26 - viento * 14)); if (!tranquilo(sx, sy)) d_discoM(B, m, sx, sy, 1 + u * 3, tn(u > 0.5 ? hex('#6a6a74') : hex('#4a4a54'))); } }
  // los gallardetes de los mástiles y la bandera del vapor, al viento
  for (const [mx, my] of [[28, 28], [40, 24], [106, 22], [184, 21], [200, 17], [246, 30], [260, 34]]) for (let i = 1; i <= 4 + Math.round(viento * 3); i++) d_psM(B, m, mx + i, my + Math.round(Math.sin(t * (5 + viento * 6) - i * 0.9) * (0.6 + i * 0.15)), tn(i % 2 ? C.rojo : C.blanco));
  // el reloj del campanario (las agujas avanzan) y la veleta de la torrecilla
  { const a = t * 0.08 - 1.2, b = t * 0.01 + 2.2; R.linea(150, 66, Math.round(150 + Math.cos(a) * 3), Math.round(66 + Math.sin(a) * 3), tn(C.k)); R.linea(150, 66, Math.round(150 + Math.cos(b) * 2), Math.round(66 + Math.sin(b) * 2), tn(C.k)); }
  if (casas[0]?.finial) { const [vx, vy] = casas[0].finial, g = Math.sin(t * (0.8 + viento * 3)) * (0.3 + viento * 0.4) + (viento > 0.5 ? 0.8 : 0); for (let i = -3; i <= 3; i++) R.pset(Math.round(vx + Math.cos(g) * i), vy - 1, tn(C.k)); R.pset(Math.round(vx + Math.cos(g) * 3), vy - 2, tn(C.k)); R.pset(Math.round(vx - Math.cos(g) * 3), vy - 2, tn(C.oro)); R.pset(Math.round(vx - Math.cos(g) * 3), vy, tn(C.oro)); }
  // las palomas en los cables, que de vez en cuando se van y vuelven
  if (!nn && agua === 0) { const ciclo = t % 14, vuela = ciclo > 9 && ciclo < 12.5; for (let k = 0; k < 5; k++) { const bx = 168 + k * 7 + (k % 2), by = Math.round(63 + 4 * 4 * ((bx - 146) / 80) * (1 - (bx - 146) / 80)) - 1;
      if (!vuela) { R.rect(bx, by - 1, bx + 2, by, hex('#6a6a7a')); R.pset(bx + (Math.sin(t * 2 + k * 3) > 0.7 ? 3 : -1), by - 2, hex('#5a5a6a')); }
      else { const u = ciclo < 11 ? (ciclo - 9) / 2 : 1 - (ciclo - 11) / 1.5, x = Math.round(bx + u * 40 + k * u * 4), y = Math.round(by - u * 22 + Math.sin(k) * u * 5), a = Math.sin(t * 14 + k) > 0; R.pset(x, y, hex('#5a5a6a')); R.pset(x - 1, y - (a ? 1 : -1), hex('#5a5a6a')); R.pset(x + 1, y - (a ? 1 : -1), hex('#5a5a6a')); } } }
  // la vida de las casas: cortinas que se mueven en las ventanas abiertas, alguien que pasa por dentro, el abuelo en la
  // mecedora de la galería de arriba, la vecina que barre su porche y el gato en la valla
  const casaV = (k) => casas[k] ?? { ventanas: [], galerias: [] };
  if (agua === 0) {
    for (const [k, j] of [[1, 3], [3, 2], [2, 1]]) { const v = casaV(k).ventanas[j]; if (!v || v[5]) continue; const [x0, y0, x1, y1] = v; R.recorte([x0, y0, x1, y1]); const sw = Math.sin(t * (1.5 + viento * 3) + k) * (1 + viento * 2); for (let y = y0; y <= y1; y++) { const ex = Math.round(sw * (y - y0) / (y1 - y0 + 1) * 2); R.pset(x0 + 1 + Math.max(0, ex), y, tn(d_P.cortina)); R.pset(x0 + 2 + Math.max(0, ex), y, tn(d_P.cortinaS)); } R.recorte(null); }
    { const v = casaV(2).ventanas[2]; if (v && !nn) { const [x0, y0, x1, y1] = v, u = (t % 9) / 9; if (u > 0.2 && u < 0.6) { R.recorte([x0, y0, x1, y1]); const sx = Math.round(lerp(x0 - 3, x1 + 2, (u - 0.2) / 0.4)); R.rect(sx, y0 + 5, sx + 2, y1, hex('#4a4a5a')); R.disco(sx + 1, y0 + 4, 1.5, hex('#4a4a5a')); R.recorte(null); } } }
    { const g = casaV(1).galerias[1]; if (g) { const mx = g[0] + 10, my = g[2], bal = Math.sin(t * 2.2) * 1.2; R.linea(Math.round(mx - 3 + bal), my - 1, Math.round(mx + 3 + bal), my - 1, tn(hex('#6a4a2a'))); R.rect(Math.round(mx + 2 + bal * 0.5), my - 9, Math.round(mx + 3 + bal * 0.5), my - 2, tn(hex('#6a4a2a'))); R.rect(Math.round(mx - 1 + bal * 0.6), my - 8, Math.round(mx + 1 + bal * 0.6), my - 3, tn(hex('#5a5a6a'))); R.rect(Math.round(mx - 1 + bal * 0.7), my - 11, Math.round(mx + bal * 0.7), my - 9, tn(d_P.piel)); R.pset(Math.round(mx - 1 + bal * 0.7), my - 12, tn(hex('#d8d8d8'))); R.pset(Math.round(mx + bal * 0.7), my - 12, tn(hex('#d8d8d8'))); } }
    { const g = casaV(4).galerias[0]; if (g && !nn) { const bx = g[0] + 12 + Math.round(Math.sin(t * 0.7) * 6), by = g[2], esc = Math.sin(t * 6); R.rect(bx - 1, by - 10, bx + 1, by - 4, tn(hex('#8a5a8a'))); R.rect(bx - 2, by - 3, bx + 2, by - 1, tn(hex('#8a5a8a'))); R.rect(bx - 1, by - 12, bx, by - 11, tn(d_P.pielS)); R.rect(bx - 1, by - 13, bx + 1, by - 13, tn(hex('#f0ead8'))); const ex = bx + 3 + Math.round(esc * 2); R.linea(bx + 1, by - 8, ex, by - 1, tn(hex('#a8844a'))); R.rect(ex - 1, by - 1, ex + 1, by - 1, tn(hex('#d8b860'))); if (esc > 0.6) R.pset(ex + 2, by - 2, tn(hex('#c8b8a0'))); } }
    { const gx = 128, gy = 113, cola = Math.sin(t * 2.4); R.rect(gx, gy - 3, gx + 3, gy - 1, tn(hex('#3a3a3a'))); R.rect(gx + 3, gy - 5, gx + 5, gy - 3, tn(hex('#3a3a3a'))); R.pset(gx + 3, gy - 6, tn(hex('#3a3a3a'))); R.pset(gx + 5, gy - 6, tn(hex('#3a3a3a'))); if ((t % 3.1) > 0.15) R.pset(gx + 4, gy - 4, tn(hex('#c8d840'))); for (let i = 1; i <= 4; i++) R.pset(gx - i, Math.round(gy - 2 - Math.max(0, i - 1) * (0.5 + 0.5 * cola)), tn(hex('#3a3a3a'))); }
  }
  // el agua que sube y cruza la calle (lo que está metido en ella se pinta después, cortado en su línea de flotación)
  if (agua > 0) d_aguaCalle(R, t, S, niv, casas);
  // las palmeras de los jardines
  for (const [px, pb, alto, sem] of [[71, 118, 60, 1], [214, 119, 46, 2], [281, 118, 56, 3]]) { const corte = niv.wl(pb, 1); if (corte < pb - alto + 6) continue; R.recorte([0, 0, 319, Math.floor(corte)]); d_palmera(R, px, pb, alto, t, viento, tn, sem); R.recorte(null); }
  // los paseantes de la acera de enfrente, el tranvía y los coches de caballos (de día, sin agua)
  if (agua === 0 && noche < 0.5) {
    for (let k = 0; k < 6; k++) { const dir = k % 2 ? -1 : 1, v = 5 + k * 1.3, x = dir > 0 ? ((t * v + k * 71) % 380) - 30 : 350 - ((t * v + k * 53) % 380); d_paseante(R, x, 123, t, k, dir, true, tn); }
    const tv = o.tranvia;
    if (tv !== false) { const mulas = tv === 'mulas', x = typeof tv === 'number' ? tv : ((t * 30 + 140) % 560) - 120; d_tranvia(R, x, 143, t, 1, mulas); }
    if (o.coches !== false) { const u = (t * 26 + 60) % 520; d_coche(R, 380 - u, 148, t, 'calesa', -1); const u2 = (t * 18 + 300) % 640; d_coche(R, 390 - u2, 148, t, 'hielo', -1); }
  }
  // los postes del telégrafo de enfrente y las farolas de gas (de noche encendidas; con el agua se apagan una a una)
  for (const px of d_POSTES) d_poste(R, px, 124, 36, 3, tn, Math.floor(niv.wl(124, 0.5)));
  const encendida = (umbral) => (noche < 0.3 ? 0 : agua <= umbral ? 1 : agua < umbral + 0.04 ? 0.5 : 0);
  for (const [lx, um] of [[128, 0.4], [258, 0.58]]) { const wl = niv.wl(124, 0.5); if (wl < 124 - 30) continue; R.recorte([0, 0, 319, Math.floor(wl)]); d_farola(R, lx, 124, 30, encendida(um), t, tn); R.recorte(null); }
  // delante: el poste del telégrafo con la escala de mareas, la farola, el poste de atar, la boca de riego y el barril
  { const wl = Math.floor(niv.wl(178, 0)); d_poste(R, 15, 179, 30, 5, tn, agua > 0 ? wl : 999);
    if (agua > 0 || o.escala) { const ex = 21; for (let y = 72; y <= Math.min(178, agua > 0 ? wl : 178); y++) { R.rect(ex, y, ex + 7, y, tn(y % 2 ? hex('#f4f0e6') : hex('#e8e2d4'))); R.pset(ex + 7, y, tn(hex('#b8b0a0'))); }
      for (let p = 0; p <= 20; p++) { const y = Math.round(178 - p * 5.2); if (agua > 0 && y > wl) continue; const largo = p % 5 === 0 ? 7 : 3; R.rect(ex, y, ex + largo - 1, y, tn(p % 5 === 0 ? C.rojo : C.k)); if (p % 5 === 0 && p > 0) d_cifras(R, p, ex + (p >= 10 ? 0 : 4), y - 6, tn(C.k)); }
      R.rect(ex - 1, 71, ex + 8, 71, tn(C.k)); for (const yy of [80, 120, 160]) if (agua === 0 || yy < wl) { R.pset(ex + 1, yy, tn(d_P.hierroL)); R.pset(ex + 6, yy, tn(d_P.hierroL)); } } }
  { const wl = niv.wl(156, 0.5); if (wl > 156 - 84) { R.recorte([0, 0, 319, Math.floor(agua > 0 ? wl : 179)]); d_farola(R, 302, 156, 84, encendida(0.76), t, tn); R.recorte(null); } }
  if (agua === 0) {
    { const px = 46, b = 160; R.rect(px - 1, b - 14, px + 1, b, tn(d_P.hierro)); R.rect(px, b - 14, px, b - 2, tn(d_P.hierroL)); R.rect(px - 2, b - 1, px + 2, b, tn(d_P.hierroS)); R.rect(px - 1, b - 18, px + 3, b - 15, tn(d_P.hierro)); R.pset(px + 3, b - 17, tn(d_P.hierroL)); R.pset(px - 1, b - 19, tn(d_P.hierro)); R.anillo(px + 2.5, b - 12.5, 1.6, tn(d_P.hierroL)); }
    { const hx = 268, b = 158; R.rect(hx - 2, b - 9, hx + 2, b, tn(hex('#8a2a24'))); R.rect(hx + 1, b - 9, hx + 2, b, tn(hex('#6a1e1a'))); R.rect(hx - 3, b - 10, hx + 3, b - 9, tn(hex('#a83a2e'))); R.rect(hx - 4, b - 6, hx + 4, b - 5, tn(hex('#8a2a24'))); R.pset(hx, b - 11, tn(hex('#a83a2e'))); R.rect(hx - 3, b, hx + 3, b, tn(hex('#5a1a16'))); R.pset(hx - 1, b - 8, tn(hex('#c85a4a'))); }
    { const bx = 24, b = 176; for (let y = b - 13; y <= b; y++) { const w = 5 + Math.round(Math.sin((y - b + 13) / 13 * Math.PI) * 1.5); R.rect(bx - w, y, bx + w, y, tn((y - b) % 5 === 0 ? d_P.hierro : y % 2 ? hex('#8a5a32') : hex('#9a6a3a'))); R.pset(bx - w, y, tn(hex('#5a3a20'))); R.pset(bx + w - 1, y, tn(hex('#6a4a2a'))); } R.rect(bx - 5, b - 14, bx + 5, b - 14, tn(hex('#6a4a2a'))); R.pset(bx - 2, b - 10, tn(hex('#b88a50'))); }
    // hojas y papeles que arrastra el viento por la acera
    for (let k = 0; k < Math.round(3 + viento * 8); k++) { const v = 30 + h(k, 1, 700) * 50 * (0.5 + viento), x = ((h(k, 2, 700) * 400 + t * v) % 400) - 40, y = 156 + Math.round(h(k, 3, 700) * 22 + Math.sin(t * 5 + k) * 1.5 - Math.abs(Math.sin(t * 3 + k)) * viento * 4); R.pset(Math.round(x), y, tn(k % 3 ? hex('#8a7a3a') : hex('#e8e0d0'))); R.pset(Math.round(x) + 1, y + (Math.floor(t * 6 + k) % 2), tn(k % 3 ? hex('#6a5a2a') : hex('#c8c0b0'))); }
  }
  // la lluvia (por delante de los personajes) y el destello del rayo
  if (agua > 0 || cielo === 'tormenta') { const prev = R.delante; const fuerza = agua > 0 ? 1 : 0.6; R.delante = () => { if (prev) prev(); d_lluvia(R, t, Math.round(160 * fuerza), viento); if (destello) d_destello(R, destello); }; }
  else if (destello) d_destello(R, destello);
}

// el mar que cruza la calle: la superficie en bandas tramadas (más clara lejos), crestas en perspectiva que corren de
// derecha a izquierda con la corriente y rompen en espuma, regueros largos de espuma, el reflejo roto de las ventanas
// encendidas y de las farolas, las salpicaduras de la lluvia, barriles, tablas y cajones que flotan y cabecean
function d_aguaCalle(R, t, S, niv, casas) {
  const B = R.buf, top = niv.top, y1 = niv.soloCalzada ? 148 : 179, P = d_P, alto = Math.max(1, y1 - top);
  const c0 = P.agua0, c1 = P.agua1, c2 = P.agua2, c3 = P.agua3, esp = P.espuma, espS = P.espumaS;
  for (let y = top; y <= y1; y++) { const f = y * 320, p = (y - top) / alto, um = p < 0.1 ? p / 0.1 : p < 0.45 ? (p - 0.1) / 0.35 : (p - 0.45) / 0.55, a = p < 0.1 ? c3 : p < 0.45 ? c2 : c1, b = p < 0.1 ? c2 : p < 0.45 ? c1 : c0;
    for (let x = 0; x < 320; x++) B[f + x] = d_umbral(x, y) < um ? b : a; }
  // las crestas: cada fila con su paso, su velocidad y su tamaño (más grandes y rápidas cerca)
  const filas = niv.soloCalzada ? 5 : 16;
  for (let r = 0; r < filas; r++) { const f = (r + 0.6) / filas, y0 = top + 2 + (alto - 4) * f ** 1.35, paso = 9 + 34 * f, v = 8 + 34 * f;
    for (let k = -1; k < 340 / paso + 1; k++) { const a = h(k, r, 720), b = h(k, r, 721); if (a < 0.25) continue;
      const xx = Math.round(k * paso + (b - 0.5) * paso * 0.7 - ((t * v + r * 23) % paso)), w = Math.round((2 + 15 * f) * (0.55 + a * 0.6)), yy = Math.round(y0 + (b - 0.5) * 3 * f + Math.sin(t * 2.2 + k + r) * f), al = 1 + Math.round(f * 2.5 * a);
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin(i / w * Math.PI) * al); R.pset(xx + i, yc, i < w * 0.4 ? esp : c3); R.pset(xx + i, yc + 1, c0); if (f > 0.5 && i > w * 0.2 && i < w * 0.6) R.pset(xx + i, yc - 1, espS); }
      if (h(k, r, Math.floor(t * 1.5 + a * 5) + 722) < 0.22) { for (let i = -1; i < 3 + f * 4; i++) R.pset(xx + i - 1, yy - al - 1 + (i & 1), esp); R.pset(xx - 2, yy - al, espS); R.pset(xx + 5 + f * 3, yy - al + 1, espS); } } }
  // los regueros de espuma que arrastra la corriente
  for (let k = 0; k < 14; k++) { const yy = Math.round(top + 3 + h(k, 1, 723) * (alto - 6)), f = (yy - top) / alto, L = 10 + Math.round(h(k, 2, 723) * 30 * (0.4 + f)), x0 = Math.round(340 - ((t * (14 + f * 40) + h(k, 3, 723) * 400) % 420));
    for (let i = 0; i < L; i++) if ((i + k) % 3 !== 0 || f > 0.6) R.pset(x0 + i, yy + Math.round(Math.sin((x0 + i) * 0.15 + t) * 0.6), i < L * 0.3 ? esp : espS); }
  // la orilla del agua contra las casas, con su espuma que sube y baja
  if (!niv.soloCalzada) for (let x = 0; x < 320; x++) { const yy = top + Math.round(Math.sin(x * 0.21 + t * 4) * 0.8 + Math.sin(x * 0.07 - t * 2.3)); R.pset(x, yy, (x + Math.floor(t * 12)) % 5 ? esp : espS); if ((x + Math.floor(t * 8)) % 4 === 0) R.pset(x, yy - 1, espS); if ((x * 7 + Math.floor(t * 5)) % 23 === 0) { R.pset(x, yy - 2, esp); R.pset(x + 1, yy - 3, espS); } }
  else { R.rect(0, 126, 319, 126, espS); for (let x = 0; x < 320; x += 3) R.pset(x + (Math.floor(t * 9) % 3), 148, esp); }
  // el reflejo de las ventanas encendidas, roto por las olas
  const lit = []; for (const c of casas) for (const v of c.ventanas) if (v[5] && v[3] < top) lit.push([v[0], v[2]]);
  for (const [a, b] of lit) for (let j = 0; j < 14; j += 2) { const y = top + 2 + j, sh = Math.round(Math.sin(y * 0.9 + t * 5 + a) * (1 + j * 0.15)), w = Math.max(1, Math.round((b - a + 1) * (1 - j / 16))); if (y > y1) break; for (let x = a + sh; x < a + sh + w; x++) if (d_umbral(x, y) < 0.85 - j / 18) R.pset(x, y, j < 6 ? P.luzS : hex('#a8844a')); }
  // las salpicaduras de la lluvia
  for (let k = 0; k < 22; k++) { const fr = Math.floor(t * 7), x = Math.round(h(k, fr, 710) * 319), y = Math.round(top + 3 + h(k, fr, 711) * (alto - 3)), g = (y - top) / alto > 0.5; R.pset(x, y, esp); if (g) { R.pset(x - 1, y - 1, espS); R.pset(x + 1, y - 1, espS); R.pset(x, y - 2, espS); } }
  // lo que arrastra la corriente: barriles, tablas, un cajón y un trozo de valla, que cabecean (más grandes cerca)
  for (let k = 0; k < 6; k++) { const yb = lerp(top + 6, y1 - 4, h(k, 1, 712)), f = (yb - top) / alto, v = 10 + f * 30, s = f > 0.55 ? 2 : 1, x = Math.round(350 - ((t * v + k * 97) % 420)), y = Math.round(yb + Math.sin(t * 2.5 + k) * (0.6 + f)), tipo = k % 4;
    if (y > y1 - 2 || y < top + 3) continue; const ang = Math.sin(t * 1.7 + k) * 0.18;
    if (tipo === 0) { R.rect(x - 3 * s, y - 3 * s, x + 3 * s, y, hex('#6a4a2a')); R.rect(x - 3 * s, y - 2 * s, x + 3 * s, y - 2 * s, P.hierro); R.rect(x - 2 * s, y - 3 * s, x + 2 * s, y - 3 * s, hex('#8a6a3a')); if (s > 1) R.rect(x - 3 * s, y - 5, x + 3 * s, y - 5, P.hierro); }
    else if (tipo === 1) { R.linea(x - 9 * s, Math.round(y - ang * 9 * s), x + 9 * s, Math.round(y + ang * 9 * s), hex('#8a6a4a')); R.linea(x - 9 * s, Math.round(y - ang * 9 * s) - 1, x + 9 * s, Math.round(y + ang * 9 * s) - 1, hex('#a88a5a')); if (s > 1) R.linea(x - 9 * s, Math.round(y - ang * 18) + 1, x + 9 * s, Math.round(y + ang * 18) + 1, hex('#6a4a2a')); }
    else if (tipo === 2) { R.rect(x - 3 * s, y - 4 * s, x + 3 * s, y, hex('#9a7a4a')); R.rect(x - 3 * s, y - 4 * s, x + 3 * s, y - 4 * s, hex('#b89a64')); R.linea(x - 3 * s, y - 4 * s, x + 3 * s, y, hex('#6a4a2a')); }
    else { for (let i = -3; i <= 3; i++) { const px = x + i * 3 * s, py = Math.round(y + i * ang * 3 * s); R.rect(px, py - 5 * s, px + s - 1, py, d_P.molduraS); R.pset(px, py - 5 * s - 1, d_P.molduraS); } R.linea(x - 9 * s, Math.round(y - 3 * s - ang * 9 * s), x + 9 * s, Math.round(y - 3 * s + ang * 9 * s), d_P.molduraD); }
    for (let i = -6 * s; i <= 6 * s; i++) R.pset(x + i, y + 1, (i + Math.floor(t * 8)) % 3 ? esp : espS); R.pset(x + 7 * s, y, espS); R.pset(x + 8 * s, y + 1, espS); }
  // y, cerca, lo grande que pasa despacio: una mecedora volcada, una puerta de tablas y un cubo que gira
  if (!niv.soloCalzada) for (let k = 0; k < 3; k++) { const v = 9 + k * 5, x = Math.round(380 - ((t * v + k * 150) % 480)), y = Math.round(160 + k * 7 + Math.sin(t * 1.8 + k) * 1.5), ang = Math.sin(t * 1.3 + k) * 0.12, pal = hex('#7a5a3a'), palL = hex('#a07a4e');
    if (k === 0) { R.linea(x - 8, y, x + 8, Math.round(y + ang * 16), pal); R.linea(x - 8, y - 1, x + 8, Math.round(y - 1 + ang * 16), palL); for (const dx of [-6, -2, 2, 6]) R.linea(x + dx, y - 1, x + dx + 2, y - 7, pal); R.linea(x - 7, y - 7, x + 9, y - 6, palL); R.linea(x + 6, y - 1, x + 10, y - 9, pal); }
    else if (k === 1) { R.poligono([[x - 12, Math.round(y - 2 - ang * 12)], [x + 12, Math.round(y - 2 + ang * 12)], [x + 12, Math.round(y + 1 + ang * 12)], [x - 12, Math.round(y + 1 - ang * 12)]], hex('#8a6a42')); for (let i = -10; i <= 10; i += 4) R.linea(x + i, Math.round(y - 2 + ang * i), x + i, Math.round(y + 1 + ang * i), hex('#6a4e30')); R.linea(x - 10, Math.round(y - 1 - ang * 10), x + 10, Math.round(y + ang * 10), hex('#5a4026')); }
    else { R.rect(x - 3, y - 4, x + 3, y, hex('#8a8e98')); R.rect(x - 3, y - 4, x + 3, y - 4, hex('#b8bcc4')); R.rect(x - 3, y - 2, x + 3, y - 2, hex('#6a6e78')); R.linea(x - 3, y - 5, x + 3, y - 6 + Math.round(Math.sin(t * 3) * 1), hex('#4a4e58')); }
    for (let i = -13; i <= 13; i++) if ((i + Math.floor(t * 9)) % 3) R.pset(x + i, y + 2, i < -8 || i > 8 ? espS : esp); R.pset(x + 14, y + 1, esp); R.pset(x + 15, y + 2, espS); }
  // la estela de los postes y las farolas metidos en el agua
  for (const [px, yb] of [[15, 179], [104, 124], [236, 124], [128, 124], [258, 124], [302, 156]]) { const wl = Math.round(niv.wl(yb, px === 15 ? 0 : 0.5)); if (wl > yb || wl < top) continue; for (let i = 0; i < 7; i++) { R.pset(px - 3 - i, wl + Math.round(i / 2.5), (i + Math.floor(t * 10)) % 3 ? esp : espS); } R.pset(px + 3, wl - 1, esp); R.pset(px + 4 + Math.round(Math.sin(t * 9)), wl - 2, espS); }
}

// los colores del mar del golfo (lejos, medio, cerca, rompiente, espuma sucia) y de la arena según el cielo
const d_MAR = Object.fromEntries(Object.entries({
  claro: ['#7aaccc', '#5a92b2', '#4e8494', '#5c9488', '#8ab4a2'], gris: ['#8496a2', '#68808c', '#5c7476', '#6a807a', '#8a9c94'], tormenta: ['#525e68', '#3e4c56', '#36464c', '#405052', '#5c6a6c'],
}).map(([k, v]) => [k, v.map(hex)]));

const d_ARENA = pal({ seca: '#e6d2a6', secaS: '#ccb488', secaL: '#f4e6c4', moj: '#b89e78', mojS: '#a08864', mojL: '#d4c6aa', alga: '#5a5a2a', algaS: '#3e3e1e', concha: '#f8f0e0' });

const d_HP = 74;   // el horizonte de la playa

// un muelle de madera que se aleja (de N, cerca, a F, lejos): el canto del tablero, la barandilla y los pilotes hasta el
// agua o la arena (fondo: y del suelo en cada punto); devuelve los pies de los pilotes [x, y, escala]
function d_muelle(R, N, F, s0, s1, n, fondo, cols) {
  const { rect, pset, linea } = R, [cT, cTS, cTL, cP, cPS] = cols, pies = [];
  const pts = []; for (let i = 0; i <= n; i++) { const u = 1 - (1 - 0.86 ** i) / (1 - 0.86 ** n), v = 1 - u; pts.push([lerp(N[0], F[0], v), lerp(N[1], F[1], v), lerp(s0, s1, v)]); }
  for (let i = n; i >= 0; i--) { const [x, y, s] = pts[i], yb = fondo(x, y, s), w = Math.max(1, Math.round(s * 2));
    for (const dx of [-Math.round(s * 3), Math.round(s * 3)]) { rect(Math.round(x + dx), Math.round(y + 2 * s), Math.round(x + dx) + w - 1, Math.round(yb), cP); pset(Math.round(x + dx) + w - 1, Math.round(y + 3 * s), cPS); if (s > 0.5) rect(Math.round(x + dx) + w - 1, Math.round(y + 2 * s), Math.round(x + dx) + w - 1, Math.round(yb), cPS); pies.push([Math.round(x + dx), Math.round(yb), s]); }
    if (s > 0.45) linea(Math.round(x - s * 3), Math.round(y + 3 * s), Math.round(x + s * 3 + w), Math.round(lerp(y + 3 * s, yb, 0.7)), cPS); }
  for (let i = 0; i < n; i++) { const [xa, ya, sa] = pts[i], [xb, yb, sb] = pts[i + 1];
    R.poligono([[xa, ya], [xb, yb], [xb, yb + Math.max(1, 3.4 * sb)], [xa, ya + Math.max(1, 3.4 * sa)]], cT);
    linea(Math.round(xa), Math.round(ya), Math.round(xb), Math.round(yb), cTL); linea(Math.round(xa), Math.round(ya + 3.4 * sa), Math.round(xb), Math.round(yb + 3.4 * sb), cTS); if (sa > 0.5) linea(Math.round(xa), Math.round(ya + 1.7 * sa), Math.round(xb), Math.round(yb + 1.7 * sb), cTS);
    linea(Math.round(xa), Math.round(ya - 6 * sa), Math.round(xb), Math.round(yb - 6 * sb), cTL); if (sa > 0.4) linea(Math.round(xa), Math.round(ya - 3 * sa), Math.round(xb), Math.round(yb - 3 * sb), cTS); }
  for (const [x, y, s] of pts) { linea(Math.round(x), Math.round(y - 6 * s), Math.round(x), Math.round(y), cTS); if (s > 0.6) pset(Math.round(x), Math.round(y - 6 * s) - 1, cTL); }
  return { pies, pts };
}

// la casa de baños sobre pilotes (como la Pagoda de Galveston): el salón con sus ventanas y la galería, el tejado de
// aleros levantados, la torre de dos cuerpos y los pabellones de las esquinas; devuelve dónde van las banderas
function d_casaBanos(R, luces) {
  const { rect, pset, poligono, linea } = R, M = d_P.moldura, MS = d_P.molduraS, MD = d_P.molduraD, mur = hex('#efe4c8'), murS = hex('#cbbc98'), roj = hex('#a8463a'), rojS = hex('#7a3028'), rojL = hex('#c8644e'), ver = hex('#3e6a4a');
  const x0 = 186, x1 = 268, deck = 102, agua = 114, out = { banderas: [], pilotes: [] };
  for (let x = x0 + 2; x <= x1 - 2; x += 6) { rect(x, deck + 2, x + 1, agua + 2, d_P.posteS); pset(x, deck + 3, d_P.poste); out.pilotes.push([x, agua]); }
  for (let x = x0 + 5; x <= x1 - 5; x += 12) { linea(x, deck + 3, x + 6, agua - 2, d_P.posteS); linea(x + 6, deck + 3, x, agua - 2, d_P.posteS); }
  rect(x0 - 2, deck, x1 + 2, deck + 2, d_P.tabla); rect(x0 - 2, deck, x1 + 2, deck, d_P.tablaL); rect(x0 - 2, deck + 2, x1 + 2, deck + 2, d_P.tablaS);
  // el salón: tablas verticales, ventanas en arco y la galería con su barandilla
  rect(x0 + 4, 84, x1 - 4, deck - 1, mur); for (let x = x0 + 4; x <= x1 - 4; x += 2) rect(x, 84, x, deck - 1, (x >> 1) % 3 ? mur : murS); rect(x1 - 7, 84, x1 - 4, deck - 1, murS);
  for (let x = x0 + 8; x < x1 - 8; x += 7) { rect(x, 87, x + 3, 93, ver); rect(x + 1, 88, x + 2, 93, luces ? d_P.luz : d_P.cristalS); pset(x + 1, 87, ver); pset(x + 2, 87, ver); pset(x + 1, 88, luces ? d_P.luzL : d_P.cristalL); }
  rect(x0, 95, x1, 95, M); rect(x0, 96, x1, 96, MD); for (let x = x0 + 1; x < x1; x += 2) rect(x, 97, x, deck - 1, M); rect(x0, deck - 1, x1, deck - 1, MS);
  for (let x = x0; x <= x1; x += 9) rect(x, 84, x, deck - 1, M);
  // el tejado de aleros levantados, con sus hiladas
  const tej = (a, b, y0, y1, vuelo) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), l = Math.round(a + 6 - u * 6 - (u > 0.75 ? (u - 0.75) * 4 * vuelo : 0)), r = Math.round(b - 6 + u * 6 + (u > 0.75 ? (u - 0.75) * 4 * vuelo : 0)); for (let x = l; x <= r; x++) pset(x, y, (y - y0) % 3 === 2 ? rojS : (x + y) % 5 === 0 ? rojL : roj); pset(l, y, C.k); pset(r, y, C.k); } rect(a - vuelo, y1 + 1, b + vuelo, y1 + 1, M); };
  tej(x0, x1, 76, 83, 3);
  // los pabellones de las esquinas con su tejado de pirámide
  for (const px of [x0 + 2, x1 - 14]) { rect(px, 72, px + 12, 84, mur); rect(px + 9, 72, px + 12, 84, murS); rect(px + 3, 75, px + 5, 81, ver); rect(px + 7, 75, px + 9, 81, ver); poligono([[px - 2, 72], [px + 6, 63], [px + 14, 72]], roj); linea(px + 6, 63, px + 14, 72, rojS); rect(px - 3, 72, px + 15, 72, M); rect(px + 6, 58, px + 6, 63, C.k); out.banderas.push([px + 7, 58, 5]); }
  // la torre de dos cuerpos con sus aleros
  { const a = 214, b = 240; rect(a + 2, 64, b - 2, 76, mur); rect(b - 6, 64, b - 2, 76, murS); for (let x = a + 4; x < b - 4; x += 5) { rect(x, 67, x + 2, 73, ver); rect(x + 1, 68, x + 1, 73, d_P.cristalS); }
    tej(a, b, 60, 64, 3); rect(a + 7, 52, b - 7, 60, mur); rect(b - 10, 52, b - 7, 60, murS); rect(a + 10, 54, a + 12, 58, ver); rect(b - 12, 54, b - 11, 58, ver);
    poligono([[a + 4, 52], [(a + b) / 2, 42], [b - 3, 52]], roj); linea((a + b) / 2, 42, b - 3, 52, rojS); rect(a + 3, 52, b - 3, 52, M); rect((a + b) / 2, 33, (a + b) / 2, 42, C.k); out.banderas.push([(a + b) / 2 + 1, 33, 9]); }
  // los bañadores tendidos en la galería
  for (let x = x0 + 6; x < x1 - 6; x += 3) { const c = [hex('#2a3a6a'), hex('#c83a3a'), C.blanco, hex('#2a3a6a'), hex('#3a6a4a')][(x / 3 | 0) % 5]; if ((x / 3 | 0) % 4 === 1) continue; rect(x, 97, x + 1, 99, c); }
  return out;
}

// la capa fija de la playa: cielo, mar (de base), arena con sus ondas, huellas, conchas y algas; el muelle de pesca, la
// casa de baños con su pasarela, las casetas de lona, la barca varada y el tronco
function d_playaFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, A = d_ARENA, mar = d_MAR[cielo], luces = new Set([d_P.luz, d_P.luzL, d_P.luzS]);
  d_degradado(R, 0, d_HP + 1, d_CIELOS[nn ? 'noche' : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [226, 22, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  for (let y = d_HP - 6; y <= d_HP; y++) for (let x = 0; x < 320; x++) if (d_umbral(x, y) < (y - d_HP + 6) / 7) B[y * 320 + x] = d_mezcla(B[y * 320 + x], cielo === 'claro' ? hex('#e8eef0') : hex('#b8bec4'), 0.5);
  for (let y = d_HP + 1; y < 126; y++) { const p = (y - d_HP) / (126 - d_HP), f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = p < 0.25 ? (d_umbral(x, y) < p * 4 ? mar[1] : mar[0]) : p < 0.7 ? (d_umbral(x, y) < (p - 0.25) / 0.45 ? mar[2] : mar[1]) : (d_umbral(x, y) < (p - 0.7) / 0.3 ? mar[3] : mar[2]); }
  // la arena mojada y la seca, con las ondas del viento, huellas, conchas y la línea de algas
  for (let y = 126; y < 180; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { let c;
      if (y < 138) { c = h(x, y, 730) < 0.08 ? A.mojS : y < 129 ? A.mojL : A.moj; if (y >= 135 && d_umbral(x, y) < (y - 134) / 4) c = A.secaS; }
      else { const onda = Math.sin(x * 0.11 + y * 0.9 + Math.sin(x * 0.03) * 2), q = h(x, y, 731); c = onda > 0.82 ? A.secaS : onda < -0.9 ? A.secaL : A.seca; if (q < 0.05) c = A.secaS; else if (q > 0.97) c = A.secaL; }
      B[f + x] = c; } }
  for (let x = 0; x < 320; x++) { const y = 138 + Math.round(Math.sin(x * 0.09) * 1.4 + Math.sin(x * 0.31) * 0.6); if (h(x, 1, 732) < 0.55) pset(x, y, h(x, 2, 732) < 0.5 ? A.alga : A.algaS); if (h(x, 3, 732) < 0.12) pset(x, y - 1, A.alga); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 733) * 319), y = 140 + Math.round(h(k, 2, 733) * 38); pset(x, y, A.concha); if (k % 3 === 0) pset(x + 1, y, A.secaS); }
  for (let k = 0; k < 14; k++) { const x = 30 + k * 9 + Math.round(Math.sin(k) * 3), y = 176 - k * 3; pset(x, y, A.secaS); pset(x + 2, y + 1, A.secaS); }   // unas huellas que van hacia el agua
  const foto = marca();
  // el muelle de pesca de la izquierda, que se mete en el mar
  const fondo = (x, y, s) => y + 20 * s, muelle = d_muelle(R, [-8, 150], [96, 91], 1.25, 0.26, 16, fondo, [d_P.tabla, d_P.tablaS, d_P.tablaL, d_P.poste, d_P.posteS]);
  // la casa de baños y su pasarela hasta la playa
  const banos = d_casaBanos(R, nn);
  const pas = d_muelle(R, [334, 146], [262, 103], 1.1, 0.42, 9, fondo, [d_P.tabla, d_P.tablaS, d_P.tablaL, d_P.poste, d_P.posteS]);
  // las casetas de lona a rayas, la barca varada con sus remos y el tronco que trajo el mar
  for (const [cx, cy, c] of [[96, 136, hex('#c83a3a')], [112, 134, hex('#2a5aa8')], [126, 137, hex('#3a8a4a')]]) { for (let j = 0; j < 9; j++) { const w = 1 + Math.round(j * 0.6); for (let i = -w; i <= w; i++) pset(cx + i, cy - 9 + j, (i + 20) % 3 === 0 ? C.blanco : i > w - 2 ? d_mezcla(c, C.k, 0.25) : c); } pset(cx, cy - 10, C.k); rect(cx - 1, cy - 4, cx, cy, hex('#3a2a20')); rect(cx - 6, cy + 1, cx + 6, cy + 1, A.secaS); }
  { const bx = 236, by = 152; poligono([[bx - 18, by - 6], [bx + 16, by - 6], [bx + 12, by], [bx - 14, by]], hex('#e8e0d0')); rect(bx - 17, by - 6, bx + 15, by - 6, hex('#3a5a7a')); rect(bx - 13, by - 2, bx + 11, by, hex('#c8bca8')); rect(bx - 16, by - 5, bx + 14, by - 5, hex('#5a7a9a')); linea(bx - 6, by - 7, bx + 14, by - 9, d_P.posteL); linea(bx - 8, by - 7, bx + 10, by - 10, d_P.poste); rect(bx - 16, by + 1, bx + 12, by + 2, A.secaS); linea(bx + 16, by - 5, bx + 30, by + 4, hex('#c8b890')); }
  { const tx = 40, ty = 168; rect(tx, ty - 3, tx + 26, ty, hex('#8a7a62')); rect(tx, ty - 3, tx + 26, ty - 3, hex('#a8987c')); rect(tx, ty, tx + 26, ty, hex('#6a5a46')); disco(tx, ty - 1, 2, hex('#a8987c')); pset(tx, ty - 1, hex('#6a5a46')); rect(tx + 2, ty + 1, tx + 28, ty + 2, A.secaS); linea(tx + 18, ty - 3, tx + 22, ty - 7, hex('#8a7a62')); }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, cielo, d_HP + 1);
  if (nn) d_anochecer(R, foto, luces, d_HP + 1);
  return { muelle, banos, pas };
}

// las olas de la playa: el mar con las crestas del mar de fondo, el camino del sol, las sombras de las nubes, las tres
// líneas de rompientes que llegan, la resaca que sube y baja por la arena mojada con su encaje de espuma (y que sube
// más con o.agua), las salpicaduras en los pilotes
function d_olasPlaya(R, t, m, cielo, ol, agua, tn, pilotes, tnN = tn) {
  const B = R.buf, mar = d_MAR[cielo].map(tnN), esp = tnN(hex('#f4f8f4')), espS = tnN(hex('#c8d4d0')), A = d_ARENA, yOr = 124, T = 5.2 - ol * 1.6;
  for (let y = d_HP + 1; y < 126; y++) { const p = (y - d_HP) / (126 - d_HP), f = y * 320; for (let x = 0; x < 320; x++) { if (!m[f + x]) continue; B[f + x] = p < 0.25 ? (d_umbral(x, y) < p * 4 ? mar[1] : mar[0]) : p < 0.7 ? (d_umbral(x, y) < (p - 0.25) / 0.45 ? mar[2] : mar[1]) : (d_umbral(x, y) < (p - 0.7) / 0.3 ? mar[3] : mar[2]); } }
  if (cielo === 'claro') for (let y = d_HP + 2; y < 120; y += 2) { const f = (y - d_HP) / 46, w = 2 + f * 18; for (let k = 0; k < 2 + f * 4; k++) { const x = Math.round(226 + (h(k, y, Math.floor(t * 4)) - 0.5) * 2 * w); if (h(k, y, Math.floor(t * 6) + 9) < 0.5) d_psM(B, m, x, y, tn(C.blanco)); } }
  for (let k = 0; k < 2; k++) { const cx = ((k * 190 + t * 6) % 520) - 100, cy = d_HP + 16 + k * 18, rx = 60, ry = 4 + k * 3; for (let y = Math.max(d_HP + 2, cy - ry); y < Math.min(122, cy + ry); y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2))); for (let x = Math.max(0, Math.round(cx - w)); x < Math.min(320, cx + w); x++) { const i = y * 320 + x; if (m[i] && d_umbral(x, y) < 0.5) B[i] = d_mezcla(B[i], tn(hex('#2a4a5a')), 0.25); } } }
  // el mar de fondo: crestas en perspectiva que avanzan hacia la orilla
  for (let r = 0; r < 12; r++) { const f = (r + 1) / 12, y0 = d_HP + 2 + (yOr - 14 - d_HP) * f ** 1.4, paso = 12 + 30 * f, v = 3 + 8 * f;
    for (let k = -1; k < 340 / paso; k++) { const a = h(k, r, 735), b = h(k, r, 736); if (a < 0.25) continue; const xx = Math.round(k * paso + (b - 0.5) * paso * 0.8 + ((t * v + r * 17) % paso)) - paso, w = Math.round((2 + 14 * f) * (0.55 + a * 0.7)), yy = Math.round(y0 + Math.sin(t * 1.3 + k + r) * f * (0.6 + ol)), al = 1 + Math.round(f * (1 + ol * 2) * a);
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin(i / w * Math.PI) * al); d_psM(B, m, xx + i, yc, i < w * 0.6 ? mar[4] : mar[1]); d_psM(B, m, xx + i, yc + 1, mar[2]); }
      if (f > 0.4 && h(k, r, Math.floor(t * 1.2 + a * 5)) < 0.1 + ol * 0.25) { const bx = xx + Math.round(w / 2); for (let i = -2; i <= 2; i++) d_psM(B, m, bx + i, yy - al - 1, esp); d_psM(B, m, bx, yy - al - 2, espS); } } }
  // las rompientes: tres líneas que llegan, se levantan, rompen en espuma y se deshacen en la orilla
  for (let k = 0; k < 3; k++) { const u = ((t / T) + k / 3) % 1, yb = Math.round(lerp(yOr - 14, yOr + 1, u)), alto = Math.round(1 + u * (1.5 + ol * 2.5)), rota = u > 0.35;
    for (let x = 0; x < 320; x++) { const corte = h(Math.floor((x + k * 40 + Math.floor(t / T + k / 3) * 37) / 14), k, 737); if (corte < 0.3 - ol * 0.25 - u * 0.2) continue; const yy = yb + Math.round(Math.sin(x * 0.05 + k) * 1.5);
      if (!rota) { d_psM(B, m, x, yy, mar[4]); d_psM(B, m, x, yy + 1, mar[2]); if (x % 3 === 0) d_psM(B, m, x, yy - 1, espS); }
      else { for (let j = 0; j < alto; j++) d_psM(B, m, x, yy - j, j === alto - 1 ? esp : (x + j) & 1 ? esp : espS); d_psM(B, m, x, yy + 1, mar[2]); for (let j = 1; j < 3 + u * 5; j++) if (h(x, j + Math.floor(t * 4), 738) < 0.5 - j * 0.07) d_psM(B, m, x, yy - alto - j + (j > 2 ? 2 : 0), espS); } } }
  // la resaca: el agua sube por la arena mojada y se retira (con o.agua llega mucho más arriba)
  const fase = (t / T) % 1, sube = fase < 0.45 ? d_suave(fase / 0.45) : 1 - d_suave((fase - 0.45) / 0.55), ytope = yOr + 6 + Math.round(agua * 28);
  const pel = d_mezcla(mar[4], tn(A.mojL), 0.42), pelS = d_mezcla(mar[3], tn(A.moj), 0.4), brillo = tn(hex('#e8f0ec'));
  for (let x = 0; x < 320; x++) { const e = Math.round(lerp(yOr, ytope + 4 * ol, sube) + Math.sin(x * 0.07 + t * 0.6) * 2 + Math.sin(x * 0.19) * 1), emax = ytope + 4 * ol + 2;
    for (let y = yOr; y <= Math.max(e, emax + Math.round(agua * 6)); y++) { const i = y * 320 + x; if (y > 179 || !m[i]) continue;
      if (y < e) { const enc = h((x + Math.round(t * 6 * (sube > 0.5 ? 1 : -1))) >> 1, y, 739), cerca = e - y; B[i] = cerca < 2 ? espS : enc < 0.08 + 0.08 * (1 - sube) - agua * 0.04 ? espS : enc > 0.97 ? brillo : (y - yOr) < 3 ? pelS : pel; }
      else if (y === e) B[i] = esp; else if (y <= emax) B[i] = y === emax ? tn(A.mojS) : (h(x, y, 740) < 0.06 ? tn(A.mojL) : tn(A.moj)); } }
  // la espuma contra los pilotes
  for (const [px, py, s] of pilotes) { if (py < d_HP + 4) continue; const g = Math.floor(t * 6 + px) % 3; d_psM(B, m, px - 1, py - 1, esp); d_psM(B, m, px + 2, py - 1, g ? esp : espS); if (ol > 0.5 && (t * 2 + px * 0.3) % 2 < 0.4) { d_psM(B, m, px, py - 3, esp); d_psM(B, m, px + 1, py - 4, espS); d_psM(B, m, px - 1, py - 4, espS); } }
}

// pelícanos pardos que pasan en fila rozando las olas, planeando y batiendo las alas de vez en cuando
function d_pelicanos(R, t, y, tn, cada = 17) {
  const u = (t % cada) / cada, x0 = -40 + u * 420;
  for (let k = 0; k < 4; k++) { const x = Math.round(x0 - k * 13), yy = Math.round(y + Math.sin(t * 1.2 + k * 0.8) * 1.5 + k), bate = Math.sin(t * 7 - k) > 0.6, c = tn(hex('#6a5e52')), cS = tn(hex('#4a4038'));
    R.rect(x - 2, yy, x + 2, yy, c); R.pset(x + 3, yy - 1, tn(hex('#e8e0c8'))); R.pset(x + 4, yy - 1, tn(hex('#c8a040'))); R.pset(x + 5, yy, tn(hex('#c8a040')));
    if (bate) { R.pset(x - 1, yy - 1, cS); R.pset(x - 2, yy - 2, cS); R.pset(x + 1, yy - 1, cS); R.pset(x, yy - 2, cS); } else { R.rect(x - 5, yy - 1, x - 2, yy - 1, cS); R.rect(x + 1, yy - 1, x + 4, yy - 1, cS); } }
}

// la gente de la playa: bañistas con trajes de rayas que saltan las olas, paseantes, un niño con su cometa, gente en la
// galería de la casa de baños y el pescador del muelle; n: cuánta (0 con tormenta)
function d_gentePlaya(R, t, n, tn, viento, m) {
  const { pset, rect } = R;
  for (let k = 0; k < Math.round(4 * n); k++) { const x = 138 + k * 17 + Math.round(Math.sin(t * 0.3 + k) * 4), salto = Math.max(0, Math.sin(t * 2.4 + k * 1.7)) > 0.9 ? 1 : 0, y = 121 + (k % 2) * 2 - salto, raya = k % 2 ? tn(hex('#2a3a6a')) : tn(hex('#c83a3a'));
    rect(x, y - 3, x + 1, y, raya); pset(x, y - 2, tn(C.blanco)); rect(x, y - 5, x + 1, y - 4, tn(d_P.piel)); pset(x, y - 6, tn(k % 3 ? hex('#3a2a1a') : hex('#e8d8a0'))); pset(x + 1, y - 6, tn(k % 3 ? hex('#3a2a1a') : hex('#e8d8a0')));
    if (salto) { pset(x - 1, y - 5, tn(d_P.piel)); pset(x + 2, y - 5, tn(d_P.piel)); } R.rect(x - 1, y + 1, x + 2, y + 1, tn(hex('#f4f8f4'))); }
  for (let k = 0; k < Math.round(3 * n); k++) { const dir = k % 2 ? -1 : 1, v = 4 + k, x = dir > 0 ? ((t * v + k * 113) % 380) - 30 : 350 - ((t * v + k * 67) % 380); d_paseante(R, x, 140 + k * 2, t, [1, 0, 3][k], dir, true, tn); }
  if (n > 0 && viento > 0.15) { const kx = 70 + Math.round(Math.sin(t * 0.7) * 6 + viento * 10), ky = 30 + Math.round(Math.cos(t * 0.9) * 4), nx = 66, ny = 140;
    R.linea(kx, ky + 3, nx + 2, ny - 8, (xx, yy) => ((xx + yy) % 2 ? tn(hex('#f4f0e6')) : null));
    R.poligono([[kx, ky - 4], [kx + 3, ky], [kx, ky + 4], [kx - 3, ky]], tn(C.rojo)); pset(kx, ky - 3, tn(C.amarillo)); pset(kx + 1, ky, tn(C.amarillo)); R.linea(kx - 3, ky, kx + 3, ky, tn(hex('#8a2a2a')));
    for (let i = 1; i < 9; i++) pset(Math.round(kx - i * 0.7 - viento * i), Math.round(ky + 4 + i + Math.sin(t * 6 + i) * 1.2), tn(i % 2 ? C.amarillo : C.rojo));
    d_paseante(R, nx, ny, t, 4, -1, false, tn); R.linea(nx + 2, ny - 7, nx + 4, ny - 9, tn(d_P.piel)); }
  if (n > 0) for (let k = 0; k < 5; k++) { const x = 196 + k * 14 + Math.round(Math.sin(t * 0.4 + k * 2) * 3), y = 100; if (k === 2) continue; rect(x, y - 3, x + 1, y - 1, tn([hex('#3a3a4a'), hex('#c86a7a'), hex('#d8cfb8'), hex('#5a7aa8'), hex('#8a5a8a')][k])); rect(x, y - 5, x + 1, y - 4, tn(d_P.piel)); rect(x - 1, y - 6, x + 2, y - 6, tn(k % 2 ? hex('#f0e0c8') : hex('#2a2a30'))); }
  if (n > 0) { const fx = 92, fy = 89, pic = Math.sin(t * 1.1) > 0.8 ? 1 : 0; rect(fx, fy - 3, fx + 1, fy, tn(hex('#5a6a3a'))); rect(fx, fy - 5, fx + 1, fy - 4, tn(d_P.pielS)); rect(fx - 1, fy - 6, fx + 2, fy - 6, tn(hex('#e8d8a0'))); R.linea(fx + 2, fy - 3, fx + 8, fy - 9 + pic, tn(hex('#5a4a2a'))); R.linea(fx + 8, fy - 9 + pic, fx + 10, fy + 6, (xx, yy) => ((xx + yy) % 2 ? tn(hex('#d8d8d0')) : null)); }
}

// correlimos que corren detrás de la ola y delante de ella, en la línea de la resaca
function d_correlimos(R, t, tn, agua) {
  const T = 5.2, fase = (t / T) % 1, sube = fase < 0.45 ? d_suave(fase / 0.45) : 1 - d_suave((fase - 0.45) / 0.55);
  for (let k = 0; k < 4; k++) { const x = 150 + k * 9 + Math.round(Math.sin(t * 0.5 + k) * 6), y = Math.round(lerp(126, 131 + agua * 28, sube)) + 1 + (k % 2), paso = Math.floor(t * 14 + k) % 2, c = tn(hex('#8a7a66')), cL = tn(hex('#f0ece4'));
    R.rect(x, y - 2, x + 2, y - 2, c); R.pset(x + 1, y - 1, cL); R.pset(x + 3, y - 2, tn(C.k)); R.pset(x, y - 3, c); R.pset(x + 1 - paso, y, tn(C.k)); R.pset(x + 1 + paso, y, tn(C.k)); }
}

// barrón (la hierba de las dunas) que se mece en las esquinas de abajo
function d_barron(R, t, viento, tn, zonas) {
  for (const [x0, x1, yb] of zonas) for (let x = x0; x <= x1; x += 2) { const alto = 6 + Math.round(h(x, 1, 741) * 10), sw = Math.sin(t * (2 + viento * 3) + x * 0.3) * (1 + viento * 2) - viento * 3, c = tn(h(x, 2, 741) < 0.5 ? hex('#8a9a4a') : hex('#a8a860'));
    for (let j = 0; j < alto; j++) { const u = j / alto; R.pset(Math.round(x + sw * u * u), yb - j, j > alto - 3 ? tn(hex('#c8b870')) : c); } if (h(x, 3, 741) < 0.3) R.pset(Math.round(x + sw), yb - alto - 1, tn(hex('#d8c890'))); }
}

// ══ la playa (cada fotograma) ══
function d_galPlaya(R, t, S) {
  const { o, agua, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, ol = d_lim(o.oleaje ?? (cielo === 'tormenta' ? 1 : cielo === 'gris' ? 0.6 : 0.3)), B = R.buf;
  const capa = d_fondo(R, 'playa|' + cielo, noche, (n, mc, mk) => d_playaFijo(R, cielo, n, mc, mk)), m = capa.m, inf = capa.info;
  // el cielo, las nubes, la lluvia lejana y los barcos del horizonte
  d_nubesGal(R, t, m, d_HP, cielo, nn, viento);
  if (cielo === 'tormenta') for (let k = 0; k < 3; k++) { const cx = ((k * 140 + t * 4) % 420) - 50, cc = tn(hex('#56606c')); for (let y = 28; y < d_HP; y++) for (let x = Math.round(cx); x < cx + 44; x++) { if (x < 0 || x > 319 || !m[y * 320 + x]) continue; const lado = 1 - Math.abs(x - cx - 22) / 22, abajo = (y - 28) / (d_HP - 28); if (((x - (y >> 1) + Math.floor(t * 24)) % 4 === 0) && h(x, y >> 2, 742) < lado * (0.5 + abajo * 0.5)) B[y * 320 + x] = cc; } }
  const destello = cielo === 'tormenta' ? d_rayo(R, t, m, d_HP - 4, 6.1) : 0;
  for (const [bx, v, tipo] of [[40, 1.2, 0], [150, -0.8, 1], [262, 0.6, 2]]) { const x = Math.round(((bx + t * v) % 360 + 360) % 360) - 20, y = d_HP;
    if (tipo === 1) { for (let i = -6; i <= 6; i++) d_psM(B, m, x + i, y - 1, tn(hex('#3a3a46'))); for (let i = -4; i <= 4; i++) d_psM(B, m, x + i, y - 2, tn(hex('#5a5a66'))); d_psM(B, m, x, y - 3, tn(hex('#a83a2a'))); d_psM(B, m, x, y - 4, tn(hex('#a83a2a'))); for (let i = 0; i < 6; i++) d_psM(B, m, x - 2 - i * 2, y - 5 - Math.round(i * 0.6), tn(hex('#7a7a84'))); }
    else { for (let i = -3; i <= 3; i++) d_psM(B, m, x + i, y - 1, tn(hex('#4a4a56'))); for (let j = 2; j < 9; j++) for (let i = 0; i < Math.round((9 - j) * 0.7); i++) d_psM(B, m, x + i, y - j, tn(j < 4 ? hex('#d8d4cc') : C.blanco)); d_psM(B, m, x - 1, y - 5, tn(hex('#d8d4cc'))); } }
  // el mar, las rompientes y la resaca
  const pil = [...inf.muelle.pies, ...inf.pas.pies, ...inf.banos.pilotes.map(([x, y]) => [x, y, 0.5])];
  d_olasPlaya(R, t, m, cielo, ol, agua, tn, pil, S.tnN);
  // las banderas de la casa de baños, al viento
  for (const [fx, fy, l] of inf.banos.banderas) for (let i = 0; i < l; i++) for (let j = 0; j < (l > 6 ? 5 : 3); j++) R.pset(fx + i, fy + j + Math.round(Math.sin(t * (5 + viento * 7) - i * 0.8) * (0.4 + i * 0.12)), tn(l > 6 ? (i < 4 && j < 3 ? ((i + j) & 1 ? C.blanco : C.azul) : j % 2 ? C.blanco : C.rojo) : C.rojo));
  // gaviotas, pelícanos, correlimos y la gente
  if (cielo !== 'tormenta' && !nn) { for (let k = 0; k < 3; k++) { const x = Math.round(((k * 113 + t * (8 + k * 3)) % 380) - 30), y = 26 + k * 10 + Math.round(Math.sin(t * 0.8 + k) * 3); if (m[y * 320 + x] && !(x > 268 && y < 50)) R.gaviota(x, y, t, k); } d_pelicanos(R, t, d_HP + 10, tn); }
  for (const [x, y] of [[inf.muelle.pies[6]?.[0] ?? 40, inf.muelle.pts[3]?.[1] ?? 120]]) { R.rect(x, Math.round(y) - 9, x + 2, Math.round(y) - 8, tn(C.blanco)); R.pset(x + 3, Math.round(y) - 9, tn(C.naranja)); R.pset(x, Math.round(y) - 7, tn(hex('#b8c4d4'))); }
  if (!nn) d_correlimos(R, t, tn, agua);
  d_gentePlaya(R, t, cielo === 'tormenta' || nn ? 0 : cielo === 'gris' ? 0.5 : 1, tn, viento, m);
  // la hierba de las dunas, en las esquinas de abajo
  d_barron(R, t, viento, tn, [[0, 26, 179], [296, 319, 179]]);
  if (cielo === 'tormenta') { const prev = R.delante; R.delante = () => { if (prev) prev(); d_lluvia(R, t, 110, viento); if (destello) d_destello(R, destello); }; }
}

const d_OF = pal({
  techo: '#4e4032', techoL: '#5e4e3e', techoS: '#3e3228', yeso: '#b4bc9c', yesoS: '#a2aa8a', yesoL: '#c4caac', friso: '#8a8a5a', frisoS: '#6e6e46',
  roble: '#7a5232', robleS: '#5a3a22', robleL: '#9a6c42', robleD: '#3e2616', caoba: '#6a3420', caobaS: '#4a2214', caobaL: '#8a4a2c',
  tabla: '#8a6440', tablaS: '#6a4a2e', tablaL: '#a87c50', alfombra: '#8a2e2a', alfombraS: '#6a2220', alfombraB: '#2a3a5a', alfombraO: '#c89a4a',
  laton: '#c8a040', latonS: '#8a6a24', latonL: '#f0d878', mercurio: '#c8ccd4', mercurioL: '#f4f6fa', papelV: '#e8dcb8', papelVS: '#c8b890', mapaMar: '#a8c8d8', mapaTierra: '#e4d8a8', telegrama: '#e8d870', telegramaS: '#c0b050', cuero: '#3a5a3a',
});

// la vista por la ventana desde el cuarto piso: tejados de ladrillo con cornisas, un campanario, y el golfo al fondo
function d_vistaVentana(R, x0, y0, x1, y1, cielo, nn) {
  const { rect, pset } = R, hor = y0 + 40;
  // el golfo: una franja de mar con su brillo
  for (let y = hor; y < hor + 5; y++) for (let x = x0; x <= x1; x++) pset(x, y, y === hor ? hex('#8ab0c0') : d_umbral(x, y) < 0.4 ? hex('#4e8494') : hex('#5a92b2'));
  // los tejados y las fachadas de ladrillo de enfrente, más cerca cuanto más abajo
  const tonos = [[hex('#a86a5a'), hex('#8a5444')], [hex('#c4a080'), hex('#a08060')], [hex('#9a5a48'), hex('#7a4636')], [hex('#b8b0a0'), hex('#948c7c')]];
  for (const [bx, bw, by, k] of [[x0 - 4, 20, hor + 4, 0], [x0 + 14, 16, hor + 1, 1], [x0 + 28, 26, hor + 6, 2], [x0 + 6, 22, hor + 16, 3], [x0 + 30, 22, hor + 20, 0]]) {
    const [c, cS] = tonos[k]; rect(Math.max(x0, bx), by, Math.min(x1, bx + bw), y1, c); rect(Math.max(x0, bx + bw - 3), by, Math.min(x1, bx + bw), y1, cS); rect(Math.max(x0, bx - 1), by - 1, Math.min(x1, bx + bw + 1), by, hex('#d8d0c0'));
    for (let wy = by + 3; wy < y1 - 2; wy += 6) for (let wx = bx + 2; wx < bx + bw - 2; wx += 5) if (wx >= x0 && wx + 1 <= x1) { rect(wx, wy, wx + 1, wy + 3, nn && h(wx, wy, 750) < 0.4 ? d_P.luz : hex('#3a3a4a')); } }
  // el campanario de la catedral, con su aguja
  { const cx = x0 + 22; rect(cx - 3, hor - 18, cx + 3, hor + 2, hex('#d8c8a8')); rect(cx + 1, hor - 18, cx + 3, hor + 2, hex('#b8a888')); rect(cx - 1, hor - 14, cx, hor - 10, hex('#4a3a3a')); for (let y = hor - 30; y < hor - 18; y++) { const w = Math.round((y - hor + 30) / 12 * 4); rect(cx - w, y, cx + w, y, hex('#6a6e7a')); } pset(cx, hor - 31, C.oro); }
}

// la capa fija de la oficina: el techo de chapa repujada, la pared de yeso con su friso, el arrimadero de roble, el suelo
// de tablas con la alfombra, la ventana, el barómetro (sin la columna), el reloj, el mapa del golfo, el escritorio de
// persiana con sus casilleros, la estantería, el perchero y la papelera
function d_oficinaFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, O = d_OF, luces = new Set([d_P.luz, d_P.luzL, d_P.luzS, d_P.farol, d_P.farolL]);
  // la ventana: primero el cielo de fuera (la máscara), luego la ciudad
  const W = [14, 28, 62, 102];
  d_degradado(R, 0, 70, d_CIELOS[nn ? 'noche' : cielo]);
  const foto = marca();
  d_vistaVentana(R, W[0], W[1], W[2], W[3], cielo, nn);
  const enVentana = (x, y) => x >= W[0] && x <= W[2] && y >= W[1] && y <= W[3];
  // el techo de chapa repujada y la moldura
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) { const i = x % 10, j = y % 10, borde = i === 0 || j === 0, rombo = Math.abs(i - 5) + Math.abs(j - 5) === 3; B[y * 320 + x] = borde ? O.techoS : rombo ? O.techoL : O.techo; }
  rect(0, 12, 319, 12, O.robleL); rect(0, 13, 319, 14, O.roble); rect(0, 15, 319, 15, O.robleD);
  // la pared de yeso, moteada, con el friso estarcido y la moldura de colgar cuadros
  for (let y = 16; y < 108; y++) for (let x = 0; x < 320; x++) { if (enVentana(x, y)) continue; const q = h(x >> 1, y >> 1, 751); B[y * 320 + x] = q < 0.1 ? O.yesoS : q > 0.94 ? O.yesoL : O.yeso; }
  for (let x = 0; x < 320; x++) { for (let y = 17; y < 23; y++) { const i = x % 12, j = y - 17; if ((i === 6 && j > 0 && j < 5) || (Math.abs(i - 6) === 2 && j === 2) || (Math.abs(i - 6) === 3 && j === 1) || (i === 0 && j === 3)) pset(x, y, j === 2 ? O.friso : O.frisoS); } pset(x, 24, O.roble); pset(x, 25, O.yesoS); }
  // el arrimadero de tablas machihembradas, el remate y el rodapié
  rect(0, 108, 319, 108, O.robleL); rect(0, 109, 319, 110, O.roble); rect(0, 111, 319, 111, O.robleD);
  for (let y = 112; y < 142; y++) for (let x = 0; x < 320; x++) { const i = x % 5; B[y * 320 + x] = i === 0 ? O.robleD : i === 1 ? O.robleL : h(x >> 2, y >> 3, 752) < 0.1 ? O.robleS : O.roble; }
  rect(0, 141, 319, 141, O.robleL); rect(0, 142, 319, 145, O.robleS); rect(0, 142, 319, 142, O.roble);
  // el suelo de tablas, con sus juntas, vetas y clavos
  const hil = [146, 149, 152, 156, 160, 165, 170, 176, 181];
  for (let y = 146; y < 180; y++) { const r = hil.findIndex((v) => y < v), y0 = hil[r - 1] ?? 146, L = 30 + r * 6; for (let x = 0; x < 320; x++) { const xx = x + r * 13, k = Math.floor(xx / L); let c = y === y0 ? O.tablaS : xx % L === 0 ? O.tablaS : h(k, r, 753) < 0.3 ? O.tablaL : O.tabla; if (y !== y0 && h(x >> 2, y, 754) < 0.06) c = O.tablaS; if (xx % L === 3 && y === y0 + 1) c = O.robleD; B[y * 320 + x] = c; } }
  // la alfombra con su cenefa y los rombos del centro
  for (let y = 154; y < 177; y++) for (let x = 64; x < 258; x++) { const bx = Math.min(x - 64, 257 - x), by = Math.min(y - 154, 176 - y), b = Math.min(bx, by * 2); let c;
    if (b < 2) c = O.alfombraB; else if (b < 5) c = (x + y) % 4 === 0 ? O.alfombraO : O.alfombraB; else if (b < 6) c = O.alfombraO; else { const dx = Math.abs(((x - 64) % 24) - 12), dy = Math.abs(((y - 154) % 12) - 6) * 2; c = dx + dy < 6 ? O.alfombraO : dx + dy < 8 ? O.alfombraB : h(x >> 1, y, 755) < 0.08 ? O.alfombraS : O.alfombra; }
    pset(x, y, c); } for (let x = 64; x < 258; x += 2) { pset(x, 177, O.alfombraO); pset(x + 1, 153, O.alfombraO); }
  // la ventana de guillotina: el marco de roble, el travesaño, los parteluces, el alféizar y la persiana enrollable
  rect(W[0] - 4, W[1] - 6, W[2] + 4, W[1] - 1, O.roble); rect(W[0] - 6, W[1] - 7, W[2] + 6, W[1] - 6, O.robleL); rect(W[0] - 4, W[1] - 1, W[2] + 4, W[1] - 1, O.robleD);
  rect(W[0] - 4, W[1], W[0] - 1, W[3], O.roble); rect(W[2] + 1, W[1], W[2] + 4, W[3], O.robleS); rect(W[0] - 4, W[1], W[0] - 4, W[3], O.robleD);
  rect(W[0] - 6, W[3] + 1, W[2] + 6, W[3] + 2, O.robleL); rect(W[0] - 6, W[3] + 3, W[2] + 6, W[3] + 3, O.robleD); rect(W[0] - 3, W[3] + 4, W[2] + 3, W[3] + 6, O.roble);
  const my = Math.round((W[1] + W[3]) / 2); rect(W[0], my - 1, W[2], my + 1, O.roble); rect(W[0], my + 1, W[2], my + 1, O.robleD); rect(Math.round((W[0] + W[2]) / 2), W[1], Math.round((W[0] + W[2]) / 2) + 1, W[3], O.roble);
  for (const yy of [W[1], my + 2]) for (let k = 0; k < 9; k++) pset(W[0] + 2 + k, yy + 1 + k, d_mezcla(R.pget(W[0] + 2 + k, yy + 1 + k), C.blanco, 0.35));   // brillos en el cristal
  rect(W[0] - 2, W[1], W[2] + 2, W[1] + 7, hex('#e8dcc0')); for (let x = W[0] - 2; x <= W[2] + 2; x += 3) pset(x, W[1] + 6, hex('#c8b898')); rect(W[0] - 2, W[1] + 8, W[2] + 2, W[1] + 8, O.roble);
  // el termómetro de pared y el calendario en el 8
  { const tx = 70; rect(tx - 2, 34, tx + 2, 62, O.robleL); rect(tx - 1, 35, tx + 1, 61, hex('#f0ece0')); rect(tx, 38, tx, 58, hex('#c8c8d0')); rect(tx, 44, tx, 59, C.rojo); disco(tx, 59, 1.5, C.rojo); for (let y = 38; y < 58; y += 3) pset(tx - 1, y, C.k); }
  { const cx = 72, cy = 70; rect(cx - 7, cy, cx + 7, cy + 18, hex('#f4f0e4')); rect(cx - 7, cy, cx + 7, cy + 4, C.rojo); rect(cx - 7, cy + 18, cx + 7, cy + 18, hex('#c8c0b0')); d_cifras(R, '8', cx - 1, cy + 7, C.k); for (let i = 0; i < 4; i++) rect(cx - 5, cy + 14 + (i >> 1) * 2, cx - 5 + 3 + (i % 2) * 4, cy + 14 + (i >> 1) * 2, hex('#a8a090')); pset(cx, cy - 1, C.k); }
  // el barómetro de mercurio: la tabla de caoba con su copete, la caja de latón, la escala con sus cifras y la cubeta
  { const bx = 89; rect(bx - 6, 36, bx + 6, 130, O.caoba); rect(bx + 4, 36, bx + 6, 130, O.caobaS); rect(bx - 6, 36, bx - 6, 130, O.caobaL); poligono([[bx - 7, 37], [bx, 30], [bx + 7, 37]], O.caoba); pset(bx, 31, O.caobaL); disco(bx, 34, 1.5, O.laton);
    rect(bx - 3, 40, bx + 3, 118, O.latonS); rect(bx - 2, 40, bx + 2, 118, O.laton); rect(bx - 2, 40, bx - 2, 118, O.latonL);
    rect(bx - 2, 42, bx + 2, 71, hex('#2a2a30')); rect(bx - 2, 42, bx - 2, 71, O.latonS);   // la ranura de la escala
    for (let p = 28; p <= 31; p += 0.1) { const y = Math.round(68 - (p - 28) * 7.33), ent = Math.abs(p - Math.round(p)) < 0.05; pset(bx + 3, y, C.k); if (ent) { pset(bx + 4, y, C.k); pset(bx - 3, y, C.k); } }
    rect(bx - 14, 43, bx - 5, 71, O.caobaS); d_cifras(R, '31', bx - 12, 44, O.latonL); d_cifras(R, '30', bx - 12, 51, O.latonL); d_cifras(R, '29', bx - 12, 58, O.latonL); d_cifras(R, '28', bx - 12, 65, O.latonL);
    for (let y = 74; y < 116; y += 6) rect(bx - 2, y, bx + 2, y, O.latonS);
    rect(bx - 4, 118, bx + 4, 127, O.latonS); rect(bx - 3, 118, bx + 3, 126, O.laton); rect(bx - 3, 119, bx - 2, 125, O.latonL); rect(bx - 4, 127, bx + 4, 128, O.caobaS); pset(bx, 129, O.latonL);
    rect(bx + 7, 80, bx + 9, 104, O.caobaL); rect(bx + 8, 82, bx + 8, 102, hex('#e8e4dc')); rect(bx + 8, 92, bx + 8, 102, C.rojo); }
  // el reloj de péndulo: la caja con su frontón, la esfera y la puerta de cristal
  { const cx = 116; rect(cx - 8, 30, cx + 8, 88, O.robleS); rect(cx - 7, 31, cx + 7, 87, O.roble); poligono([[cx - 9, 31], [cx, 25], [cx + 9, 31]], O.robleS); rect(cx + 5, 31, cx + 7, 87, O.robleS);
    disco(cx, 40, 6.5, O.laton); disco(cx, 40, 5.5, hex('#f4f0e4')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 4.6), Math.round(40 + Math.sin(k * Math.PI / 6) * 4.6), C.k);
    rect(cx - 5, 50, cx + 5, 84, hex('#2a2620')); rect(cx - 5, 50, cx + 5, 50, O.latonS); rect(cx - 6, 49, cx - 6, 85, O.robleL); pset(cx - 4, 52, hex('#6a6a70')); pset(cx - 3, 53, hex('#6a6a70')); }
  // el registrador del viento: la esfera de la veleta del tejado, con su cable
  { const cx = 132, cy = 96; disco(cx, cy, 6, O.robleS); disco(cx, cy, 5, hex('#f0ece0')); for (let k = 0; k < 8; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 4) * 4), Math.round(cy + Math.sin(k * Math.PI / 4) * 4), C.k); rect(cx, 15, cx, cy - 7, hex('#3a3a40')); }
  // el mapa del golfo clavado en la pared: la costa, Cuba, las isobaras, la trayectoria y Galveston
  { const x0 = 142, y0 = 28, x1 = 232, y1 = 80; rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, O.yesoS); rect(x0, y0, x1, y1, O.papelV); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x >> 2, y >> 2, 756) < 0.12) pset(x, y, O.papelVS);
    const cost = (x) => y0 + 12 + Math.round(Math.sin((x - x0) * 0.05) * 3 + ((x - x0) > 60 ? ((x - x0) - 60) * 0.1 : 0));
    for (let x = x0 + 2; x < x1 - 1; x++) { const yc = cost(x); for (let y = y0 + 2; y < yc; y++) pset(x, y, O.mapaTierra); pset(x, yc, O.caobaS); for (let y = yc + 1; y < y1 - 1; y++) pset(x, y, O.mapaMar); }
    for (let y = y0 + 12; y < y1 - 1; y++) { const xc = x0 + 2 + Math.round(10 + (y - y0) * 0.35 + Math.sin(y * 0.2) * 2); for (let x = x0 + 2; x < xc; x++) pset(x, y, O.mapaTierra); pset(xc, y, O.caobaS); }   // México
    for (let y = y0 + 24; y < y1 - 2; y++) { const xc = x1 - 12 + Math.round(Math.sin(y * 0.3)); for (let x = xc; x < x1 - 1; x++) pset(x, y, O.mapaTierra); pset(xc, y, O.caobaS); }   // la península de Florida
    for (let x = x1 - 40; x < x1 - 8; x++) { const yy = y1 - 8 + Math.round(Math.sin((x - x1) * 0.2) * 1.5); pset(x, yy, O.mapaTierra); pset(x, yy + 1, O.mapaTierra); pset(x, yy - 1, O.caobaS); }   // Cuba
    for (let x = x0 + 28; x < x0 + 46; x++) { pset(x, y1 - 4 - Math.round((x - x0 - 28) * 0.2), O.mapaTierra); pset(x, y1 - 3, O.mapaTierra); }   // el Yucatán
    const lx = x1 - 30, ly = y1 - 18; for (const r of [6, 11, 16]) for (let a = 0; a < Math.PI * 2; a += 0.08) { const x = Math.round(lx + Math.cos(a) * r * 1.3), y = Math.round(ly + Math.sin(a) * r * 0.75); if (x > x0 && x < x1 && y > y0 && y < y1 && (a * 10 | 0) % 3) pset(x, y, hex('#6a4a8a')); }
    pset(lx, ly, hex('#6a4a8a')); pset(lx - 1, ly, hex('#6a4a8a')); pset(lx + 1, ly, hex('#6a4a8a')); pset(lx, ly - 1, hex('#6a4a8a')); pset(lx, ly + 1, hex('#6a4a8a'));
    for (let k = 0; k <= 20; k++) { const u = k / 20, x = Math.round(lerp(x1 - 22, x0 + 22, u)), y = Math.round(lerp(y1 - 10, cost(x0 + 22) + 2, u) + Math.sin(u * 3) * 2); if (k % 2 === 0) pset(x, y, C.rojo); }   // la trayectoria hacia Texas
    disco(x0 + 21, cost(x0 + 21) + 1, 1.5, C.rojo); pset(x0 + 21, cost(x0 + 21), C.blanco);   // Galveston
    d_cifras(R, '29', x0 + 50, y0 + 30, hex('#6a4a8a')); d_cifras(R, '30', x0 + 30, y0 + 22, hex('#6a4a8a'));
    for (const [px, py] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1]]) { pset(px, py, C.rojo); pset(px + 1, py + 1, C.rojoS); } }
  // los cables del telégrafo que suben por la pared y salen por la ventana
  for (const dx of [0, 3]) { rect(226 + dx, 16 + dx, 226 + dx, 104, hex('#2a2a30')); rect(W[2] + 4, 16 + dx, 226 + dx, 16 + dx, hex('#2a2a30')); } for (const [x, y] of [[120, 16], [180, 16], [226, 60], [229, 60]]) pset(x, y + 1, hex('#e8e8e0'));
  // el escritorio de persiana: el cuerpo de casilleros con sus papeles, el tablero de cuero y los dos pedestales de cajones
  { const x0 = 142, x1 = 238, yt = 112;
    rect(x0, 84, x1, yt, O.robleS); rect(x0 + 2, 86, x1 - 2, yt - 1, O.robleD); for (let x = x0 + 1; x < x1; x++) { const u = (x - x0) / (x1 - x0), yy = 84 - Math.round(Math.sin(u * Math.PI) * 4); rect(x, yy, x, 85, x % 2 ? O.roble : O.robleL); }
    for (let cy = 0; cy < 3; cy++) for (let cx = 0; cx < 11; cx++) { const px = x0 + 4 + cx * 8, py = 88 + cy * 7; if (px + 6 > x1 - 3) continue; rect(px, py, px + 6, py + 5, O.robleS); rect(px + 1, py + 1, px + 5, py + 5, hex('#2a1e14')); const q = h(cx, cy, 757); if (q < 0.7) { rect(px + 1, py + 2 + Math.round(q * 2), px + 5, py + 5, q < 0.3 ? hex('#f0e8d4') : q < 0.5 ? O.telegrama : hex('#d8c8a8')); pset(px + 2, py + 3, hex('#a89878')); } }
    rect(x0 - 2, yt, x1 + 2, yt + 3, O.roble); rect(x0 - 2, yt, x1 + 2, yt, O.robleL); rect(x0 + 4, yt, x1 - 4, yt, O.cuero); rect(x0 - 2, yt + 3, x1 + 2, yt + 3, O.robleD);
    for (const [a, b] of [[x0, x0 + 30], [x1 - 30, x1]]) { rect(a, yt + 4, b, 144, O.roble); rect(b - 2, yt + 4, b, 144, O.robleS); for (let k = 0; k < 4; k++) { const dy = yt + 6 + k * 7; rect(a + 2, dy, b - 3, dy + 5, O.robleL); rect(a + 3, dy + 1, b - 3, dy + 5, O.roble); rect(Math.round((a + b) / 2) - 2, dy + 3, Math.round((a + b) / 2) + 1, dy + 3, O.laton); } rect(a, 144, b, 145, O.robleD); }
    rect(x0 + 31, yt + 4, x1 - 31, 144, hex('#2a1e14')); rect(x0 + 31, yt + 4, x1 - 31, yt + 6, O.roble);
    // la silla giratoria de madera, metida bajo el tablero
    { const sx = 190; rect(sx - 8, 124, sx + 8, 126, O.roble); rect(sx - 8, 124, sx + 8, 124, O.robleL); rect(sx - 7, 112, sx + 7, 114, O.roble); for (let x = sx - 6; x <= sx + 6; x += 3) rect(x, 115, x, 123, O.robleS); rect(sx - 1, 127, sx + 1, 136, C.k); linea(sx, 136, sx - 8, 142, C.k); linea(sx, 136, sx + 8, 142, C.k); pset(sx - 8, 143, d_P.hierroL); pset(sx + 8, 143, d_P.hierroL); } }
  // en el tablero: el barógrafo (la caja con su tapa de cristal y el tambor), el tintero y la plumilla, los telegramas,
  // el pincho con más telegramas, el telégrafo (manipulador y resonador de latón) y la lámpara de queroseno
  { const gx = 152, gy = 111; rect(gx, gy - 4, gx + 22, gy, O.caoba); rect(gx, gy - 4, gx + 22, gy - 4, O.caobaL); rect(gx + 1, gy - 15, gx + 21, gy - 5, hex('#c8dce8')); rect(gx + 2, gy - 14, gx + 20, gy - 6, hex('#a8c0d0')); rect(gx + 1, gy - 15, gx + 21, gy - 15, C.blanco); pset(gx + 2, gy - 13, C.blanco); pset(gx + 3, gy - 12, C.blanco);
    rect(gx + 4, gy - 13, gx + 12, gy - 6, hex('#f4f0e6')); rect(gx + 4, gy - 13, gx + 4, gy - 6, hex('#c8c0b0')); rect(gx + 12, gy - 13, gx + 12, gy - 6, hex('#c8c0b0')); }
  { rect(184, 108, 187, 111, C.k); pset(185, 107, C.k); linea(186, 107, 190, 102, hex('#f0e8d0')); }
  for (let k = 0; k < 4; k++) rect(196 + (k & 1), 110 - k, 207 - (k & 1), 110 - k, k % 2 ? O.telegrama : O.telegramaS);
  { rect(209, 103, 209, 111, d_P.hierro); for (let k = 0; k < 4; k++) rect(207, 104 + k * 2, 211, 104 + k * 2, k % 2 ? O.telegrama : hex('#f0e8d4')); }
  { const tx = 214; rect(tx, 109, tx + 20, 111, O.caoba); rect(tx, 109, tx + 20, 109, O.caobaL); rect(tx + 12, 103, tx + 14, 108, O.latonS); rect(tx + 16, 103, tx + 18, 108, O.latonS); rect(tx + 12, 102, tx + 18, 102, O.laton); pset(tx + 13, 104, O.latonL); pset(tx + 17, 104, O.latonL); }
  { const lx = 148; rect(lx - 3, 108, lx + 3, 111, O.laton); rect(lx - 2, 106, lx + 2, 107, O.latonS); rect(lx - 1, 98, lx + 1, 105, hex('#e8eef0')); pset(lx - 1, 99, C.blanco); rect(lx - 2, 97, lx + 2, 97, O.latonS); }
  // la estantería con libros de registro, cartas enrolladas y la bandera de aviso doblada; encima, el globo terráqueo
  { const x0 = 248, x1 = 298; rect(x0, 62, x1, 145, O.robleS); rect(x0 + 2, 64, x1 - 2, 143, O.robleD); rect(x0 - 2, 60, x1 + 2, 62, O.roble); rect(x0 - 2, 60, x1 + 2, 60, O.robleL);
    for (const [sy, k] of [[84, 0], [104, 1], [124, 2], [142, 3]]) { rect(x0 + 2, sy, x1 - 2, sy + 1, O.roble); rect(x0 + 2, sy, x1 - 2, sy, O.robleL);
      let x = x0 + 3; while (x < x1 - 4) { const w = 2 + Math.floor(h(x, k, 758) * 3), al = 12 + Math.floor(h(x, k, 759) * 6), c = [hex('#6a2a2a'), hex('#2a4a6a'), hex('#4a5a2a'), hex('#7a5a2a'), hex('#3a2a3a')][Math.floor(h(x, k, 760) * 5)];
        if (k === 1 && x > x0 + 28) { for (let j = 0; j < 3; j++) { disco(x + 3, sy - 3 - j * 4, 2, hex('#e8dcb8')); pset(x + 3, sy - 3 - j * 4, hex('#c8b890')); } x += 8; continue; }
        if (k === 0 && x > x0 + 30) { rect(x, sy - 6, x + 12, sy - 1, C.rojo); rect(x + 4, sy - 5, x + 8, sy - 2, C.k); rect(x, sy - 6, x + 12, sy - 6, hex('#e85a5a')); x += 14; continue; }
        rect(x, sy - al, x + w - 1, sy - 1, c); pset(x, sy - al + 2, O.latonL); rect(x, sy - 4, x + w - 1, sy - 4, d_mezcla(c, C.k, 0.3)); x += w; } }
    disco(262, 51, 7, O.robleS); disco(262, 51, 6, hex('#6a9ab0')); for (const [dx, dy] of [[-2, -3], [1, -2], [2, 1], [-3, 2], [0, 3]]) pset(262 + dx, 51 + dy, hex('#c8b070')); rect(261, 58, 263, 60, O.laton); R.anillo(262.5, 51.5, 7, O.laton); }
  // el perchero con el abrigo, el bombín y el paraguas
  { const px = 309; rect(px, 70, px + 1, 144, O.robleS); rect(px - 5, 143, px + 6, 145, O.robleS); rect(px - 4, 72, px + 5, 73, O.robleS); rect(px - 5, 74, px + 1, 104, hex('#2e2e3c')); rect(px - 5, 74, px - 4, 104, hex('#3e3e4c')); rect(px - 2, 66, px + 4, 69, hex('#1e1e26')); rect(px - 3, 69, px + 5, 69, hex('#1e1e26')); rect(px + 3, 90, px + 5, 140, hex('#2a2a36')); rect(px + 3, 90, px + 4, 92, O.robleL); }
  // la papelera de mimbre con papeles arrugados
  { const px = 242; for (let y = 134; y < 145; y++) { const w = 4 + Math.round((y - 134) * 0.15); rect(px - w, y, px + w, y, (y + px) % 2 ? hex('#a8844a') : hex('#8a6a3a')); } disco(px - 1, 133, 2, hex('#f0ece0')); pset(px + 2, 133, hex('#d8d0c0')); }
  // de día, la luz de la ventana sobre el suelo y la pared
  if (!nn && cielo === 'claro') { for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (y - 104) / 76, xa = lerp(64, 110, u), xb = lerp(118, 222, u); if (x >= xa && x <= xb && !(y < 146 && x > 140) && d_umbral(x, y) < 0.75) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff0c0'), 0.18); } }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, 'gris');
  if (nn) { for (let i = 0; i < 57600; i++) { const c = B[i]; if (c === foto[i] || luces.has(c)) continue; B[i] = d_mezcla(c, d_nocturno(c), 0.8); } }
  return { W };
}

// ══ la oficina (cada fotograma) ══
// o.presion: pulgadas de mercurio (por defecto 29,9; en el huracán bajó hasta 28,5); o.telegrafo 0–1: cuánto repiquetea
function d_galOficina(R, t, S) {
  const { o, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, O = d_OF, B = R.buf;
  const capa = d_fondo(R, 'oficina|' + cielo, noche, (n, mc, mk) => d_oficinaFijo(R, cielo, n, mc, mk)), m = capa.m, W = capa.info.W;
  // por la ventana: las nubes que corren, gaviotas y la lluvia en el cristal
  d_nubesGal(R, t, m, 70, cielo, nn, viento);
  if (cielo !== 'tormenta' && !nn) { const x = Math.round(W[0] + ((t * 7) % 60)), y = W[1] + 14 + Math.round(Math.sin(t * 0.9) * 3); if (m[y * 320 + x]) { R.recorte([W[0], W[1], W[2], W[3]]); R.gaviota(x, y, t, 1); R.recorte(null); } }
  const destello = cielo === 'tormenta' ? d_rayo(R, t, m, 66, 5.7) : 0;
  if (cielo !== 'claro') { R.recorte([W[0], W[1] + 9, W[2], W[3]]); for (let k = 0; k < (cielo === 'tormenta' ? 30 : 16); k++) { const x = W[0] + Math.round(h(k, 1, 761) * (W[2] - W[0])), v = 6 + h(k, 2, 761) * 14, y = W[1] + 9 + Math.round((h(k, 3, 761) * 80 + t * v) % (W[3] - W[1] - 9)); R.pset(x, y, tn(hex('#d8e4f0'))); R.pset(x, y - 1, tn(hex('#a8b8c8'))); if (k % 3 === 0) R.pset(x, y - 2, tn(hex('#a8b8c8'))); } R.recorte(null); }
  // la persiana enrollable que se mueve con el aire, con su anilla
  { const sw = Math.round(Math.sin(t * (1.2 + viento * 3)) * (0.5 + viento * 1.5)), cx = Math.round((W[0] + W[2]) / 2) + sw; R.linea(Math.round((W[0] + W[2]) / 2), W[1] + 9, cx, W[1] + 15, tn(hex('#c8b898'))); R.anillo(cx + 0.5, W[1] + 17.5, 1.6, tn(O.laton)); }
  // el gato que duerme en el alféizar (mueve la cola)
  gato(R, 26, W[3] + 1, t, { dir: 1 });
  // la columna de mercurio del barómetro, que baja con la presión, y el nonio que la sigue
  { const p = typeof o.presion === 'number' ? o.presion : 29.9, bx = 89, yp = Math.round(68 - (Math.max(28, Math.min(31, p)) - 28) * 7.33); for (let y = Math.max(42, yp); y <= 71; y++) { R.pset(bx - 1, y, tn(y === yp ? O.mercurioL : O.mercurioL)); R.pset(bx, y, tn(O.mercurio)); R.pset(bx + 1, y, tn(hex('#9aa0ac'))); } R.pset(bx, yp - 1, tn(O.mercurio)); R.rect(bx - 3, yp - 1, bx - 3, yp + 1, tn(O.latonL)); R.rect(bx + 3, yp - 1, bx + 3, yp + 1, tn(O.latonL)); R.pset(bx + 4, yp, tn(O.latonS)); }
  // el reloj: las agujas y el péndulo que oscila
  { const cx = 116, a = t * 0.1 - 1.4, b = t * 0.008 + 1.9; R.linea(cx, 40, Math.round(cx + Math.cos(a) * 4), Math.round(40 + Math.sin(a) * 4), tn(C.k)); R.linea(cx, 40, Math.round(cx + Math.cos(b) * 3), Math.round(40 + Math.sin(b) * 3), tn(C.k)); const g = Math.sin(t * Math.PI) * 0.32, px = Math.round(cx + Math.sin(g) * 26), py = Math.round(52 + Math.cos(g) * 26); R.linea(cx, 52, px, py, tn(O.latonS)); R.disco(px, py, 2.5, tn(O.laton)); R.pset(px - 1, py - 1, tn(O.latonL)); }
  // la aguja del registrador del viento, que sigue a la veleta
  { const a = -Math.PI / 2 + Math.sin(t * 0.4) * 0.6 + viento * 1.4 + Math.sin(t * (2 + viento * 4)) * viento * 0.2; R.linea(132, 96, Math.round(132 + Math.cos(a) * 4), Math.round(96 + Math.sin(a) * 4), tn(C.rojo)); R.pset(132, 96, tn(C.k)); }
  // el barógrafo: el tambor gira despacio y la plumilla dibuja la presión (cae si baja)
  { const gx = 152, gy = 111, p = typeof o.presion === 'number' ? o.presion : 29.9, cae = d_lim((29.9 - p) / 1.4); for (let k = 0; k < 4; k++) { const x = gx + 5 + ((k * 2 + Math.floor(t * 0.5)) % 7); R.rect(x, gy - 13, x, gy - 6, tn(hex('#d8d4ca'))); }
    for (let x = gx + 5; x <= gx + 11; x++) { const u = (x - gx - 5) / 6, y = Math.round(gy - 11 + u * u * cae * 5 + Math.sin(x + t) * 0.3); R.pset(x, y, tn(hex('#6a3a8a'))); } const py = Math.round(gy - 11 + cae * 5); R.linea(gx + 11, py, gx + 19, py - 2, tn(O.latonS)); R.pset(gx + 19, py - 3, tn(O.laton)); }
  // el telégrafo: el manipulador sube y baja (puntos y rayas) y el resonador chasquea
  { const act = typeof o.telegrafo === 'number' ? o.telegrafo : 0.5, tx = 214, k = Math.floor(t * 9), abajo = h(k, Math.floor(k / 7), 762) < act * 0.75 && (k % 7) < 5; R.rect(tx + 2, abajo ? 106 : 105, tx + 9, abajo ? 106 : 105, tn(O.latonS)); R.rect(tx + 2, abajo ? 106 : 105, tx + 3, abajo ? 106 : 105, tn(O.latonL)); R.disco(tx + 9, abajo ? 105 : 104, 1.5, tn(hex('#1a1a1a'))); R.rect(tx + 4, 107, tx + 5, 108, tn(O.latonS));
    R.rect(tx + 12, abajo ? 101 : 100, tx + 18, abajo ? 101 : 100, tn(O.latonL)); if (abajo && k % 2) { R.pset(tx + 19, 99, tn(C.blanco)); } }
  // el ventilador del techo, que gira, y la bombilla; de noche, la lámpara de queroseno y la bombilla encendidas
  { const cx = 236; R.rect(cx, 0, cx, 6, tn(O.latonS)); R.rect(cx - 2, 6, cx + 2, 9, tn(O.laton)); R.pset(cx - 1, 7, tn(O.latonL)); for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2, l = Math.round(Math.cos(a) * 18), d = Math.sin(a) > 0; if (Math.abs(l) < 2) continue; R.linea(cx, 8, cx + l, 8 + (d ? 1 : 0), tn(d ? O.robleS : O.roble)); } }
  { const bx = 120; R.rect(bx, 12, bx, 18, tn(hex('#2a2a30'))); R.rect(bx - 3, 18, bx + 3, 19, tn(hex('#e8e0c0'))); R.rect(bx - 1, 20, bx + 1, 22, nn ? d_P.farolL : tn(hex('#d8d4c8'))); }
  if (nn) { const parp = 0.9 + Math.sin(t * 13) * 0.04 + Math.sin(t * 7.3) * 0.04; for (const [lx, ly, r, a] of [[148, 101, 36, 0.26], [120, 24, 34, 0.16]]) for (let j = -r; j <= r; j++) { const yy = ly + j; if (yy < 0 || yy > 179) continue; for (let i = -r; i <= r; i++) { const xx = lx + i, d = Math.hypot(i, j * 1.1); if (xx < 0 || xx > 319 || d < 3 || d > r) continue; const q = (1 - d / r) ** 1.5; if (d_umbral(xx, yy) < q * 1.6) { const k = yy * 320 + xx; B[k] = d_mezcla(B[k], d_P.farol, a * parp * (0.4 + q)); } } } R.rect(147, 100, 149, 103, d_P.farolL); R.pset(148, 99, d_P.farol); }
  // la brisa del ventilador levanta la hoja de arriba de los telegramas y la del calendario; una mosca da vueltas
  { const lev = Math.max(0, Math.sin(t * 2.3)) * 2; R.linea(197, 107, 206, Math.round(107 - lev), tn(O.telegrama)); R.pset(206, Math.round(106 - lev), tn(O.telegramaS)); if (Math.sin(t * 1.7) > 0.5) { R.pset(66, 87, tn(hex('#f4f0e4'))); R.pset(65, 86, tn(hex('#d8d0c0'))); } }
  { const a = t * 2.1, mx = Math.round(170 + Math.cos(a) * 26 + Math.sin(a * 2.7) * 8), my = Math.round(92 + Math.sin(a * 1.3) * 12); R.pset(mx, my, tn(hex('#1a1a20'))); if (Math.floor(t * 20) % 2) { R.pset(mx - 1, my - 1, tn(hex('#9aa0b0'))); R.pset(mx + 1, my - 1, tn(hex('#9aa0b0'))); } }
  // las motas de polvo en la luz de la ventana
  if (!nn && cielo === 'claro') for (let k = 0; k < 16; k++) { const u = h(k, 1, 763), x = Math.round(lerp(70, 180, u) + Math.sin(t * 0.4 + k) * 5 + t * 1.2) % 200, y = Math.round(150 - ((h(k, 2, 763) * 80 + t * (2 + h(k, 3, 763) * 2)) % 80)); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(x, y, hex('#fff4d0')); }
  if (destello) d_destello(R, destello * 0.8);
}

// la ciudad vista desde la azotea: el golfo en el horizonte, tejados lejanos con bruma, los edificios de ladrillo de
// enfrente con sus cornisas, depósitos de agua, la cúpula, las dos torres de la catedral y palmeras
function d_ciudadAbajo(R, nn) {
  const { rect, pset, disco, poligono } = R, B = R.buf;
  for (let y = 86; y < 96; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 86 ? hex('#9ac0d0') : d_umbral(x, y) < 0.3 ? hex('#4e8494') : hex('#5a92b2');
  for (let x = 0; x < 320; x += 1) if (h(x, 1, 770) < 0.08) pset(x, 88 + Math.floor(h(x, 2, 770) * 6), hex('#e4f0f4'));
  // la ciudad baja de entre medias (calles, patios y tejados planos) y los tejados lejanos con bruma
  for (let y = 98; y < 127; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 2, y >> 1, 775); B[y * 320 + x] = y < 104 ? hex('#a4a0a4') : q < 0.3 ? hex('#7a6e6c') : q < 0.6 ? hex('#8e807a') : hex('#6a605e'); if (y > 104 && (x * 3 + y) % 11 === 0) B[y * 320 + x] = hex('#4a4250'); }
  for (let k = 0; k < 40; k++) { const bx = Math.round(h(k, 1, 771) * 330) - 10, bw = 6 + Math.round(h(k, 2, 771) * 12), by = 92 + Math.round(h(k, 3, 771) * 6), c = [hex('#a8a4a8'), hex('#b8a49c'), hex('#9ca4ac')][k % 3]; rect(bx, by, bx + bw, 112, c); rect(bx, by, bx + bw, by, d_mezcla(c, C.blanco, 0.25)); if (k % 3 === 0) poligono([[bx, by], [bx + bw / 2, by - 4], [bx + bw, by]], d_mezcla(c, C.k, 0.15)); }
  // la catedral con sus dos torres y la cúpula del juzgado
  { const cx = 74; for (const tx of [cx - 9, cx + 9]) { rect(tx - 3, 70, tx + 3, 104, hex('#d8ccb4')); rect(tx + 1, 70, tx + 3, 104, hex('#b8ac94')); rect(tx - 1, 76, tx, 82, hex('#4a3e3e')); poligono([[tx - 4, 70], [tx, 60], [tx + 4, 70]], hex('#6a6e7a')); pset(tx, 59, C.oro); } rect(cx - 6, 84, cx + 6, 104, hex('#d0c4ac')); poligono([[cx - 7, 84], [cx, 78], [cx + 7, 84]], hex('#c4b8a0')); disco(cx, 90, 2, hex('#6a5a8a')); }
  { const cx = 196; rect(cx - 10, 86, cx + 10, 106, hex('#c8bca8')); for (let y = 74; y < 86; y++) { const w = Math.round(Math.sqrt(1 - ((86 - y) / 12) ** 2) * 9); rect(cx - w, y, cx + w, y, y < 78 ? hex('#7aa0a0') : hex('#6a9090')); pset(cx + w, y, hex('#4a6a6a')); } rect(cx, 68, cx, 74, C.k); pset(cx, 67, C.oro); for (let x = cx - 8; x <= cx + 8; x += 4) rect(x, 90, x + 1, 96, hex('#4a4040')); }
  // los edificios de ladrillo de enfrente, con cornisas, ventanas y depósitos de agua en el tejado
  const ed = [[0, 30, 100, hex('#a86a5a')], [28, 26, 104, hex('#c4a080')], [100, 34, 98, hex('#9a5a48')], [132, 28, 102, hex('#b8b0a0')], [214, 30, 100, hex('#a86a5a')], [242, 36, 96, hex('#c09070')], [276, 46, 102, hex('#9a5a48')]];
  for (const [bx, bw, by, c] of ed) { const cS = d_mezcla(c, C.k, 0.25); rect(bx, by, bx + bw, 126, c); rect(bx + bw - 4, by, bx + bw, 126, cS); for (let y = by + 4; y < 126; y += 3) for (let x = bx + ((y / 3) & 1) * 2; x < bx + bw; x += 5) pset(x, y, cS);
    rect(bx - 1, by - 2, bx + bw + 1, by, hex('#e0d8c8')); rect(bx - 1, by + 1, bx + bw + 1, by + 1, cS); for (let x = bx; x < bx + bw; x += 3) pset(x, by + 2, hex('#e0d8c8'));
    for (let wy = by + 6; wy < 124; wy += 8) for (let wx = bx + 3; wx < bx + bw - 4; wx += 6) { rect(wx, wy, wx + 2, wy + 4, nn && h(wx, wy, 772) < 0.5 ? d_P.luz : hex('#3a3e4e')); pset(wx, wy, hex('#e0d8c8')); if (!nn) pset(wx + 2, wy + 1, hex('#8ab0c8')); } }
  for (const [tx, ty] of [[40, 90], [254, 86]]) { for (let j = 0; j < 9; j++) rect(tx - 5, ty - j, tx + 5, ty - j, j % 3 === 0 ? hex('#5a4030') : hex('#8a6a4a')); poligono([[tx - 6, ty - 9], [tx, ty - 13], [tx + 6, ty - 9]], hex('#5a4a3a')); for (const lx of [tx - 4, tx + 4]) rect(lx, ty + 1, lx, ty + 6, hex('#4a3a2a')); }
  for (const [px, pb] of [[150, 104], [170, 106]]) { rect(px, pb - 14, px, pb, hex('#7a6a5a')); for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6; for (let d = 1; d < 7; d++) pset(Math.round(px + Math.cos(a) * d), Math.round(pb - 14 + Math.sin(a) * d * 0.6 + d * d * 0.08), k % 2 ? hex('#4a7a3a') : hex('#3a6a2e')); } }
}

// la capa fija de la azotea: cielo, el golfo y la ciudad; el pretil de ladrillo con su albardilla; el suelo de tela
// asfáltica con grava; la caseta de la escalera con su puerta; la garita de los termómetros; el pluviómetro; el
// heliógrafo; los mástiles de la veleta y del anemómetro; el mástil de señales con su verga; la chimenea y la claraboya
function d_tejadoFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, luces = new Set([d_P.luz, d_P.luzL, d_P.luzS]);
  d_degradado(R, 0, 96, d_CIELOS[nn ? 'noche' : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [120, 32, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  const foto = marca();
  d_ciudadAbajo(R, nn);
  // el pretil de ladrillo y su albardilla de piedra
  for (let y = 124; y < 136; y++) for (let x = 0; x < 320; x++) { const fila = (y - 124) >> 1, junta = (y - 124) % 2 === 1 || (x + (fila & 1) * 3) % 6 === 0; B[y * 320 + x] = y < 127 ? (y === 124 ? hex('#e8e0d0') : y === 126 ? hex('#a8a090') : hex('#d0c8b8')) : junta ? hex('#7a4a3a') : h(x / 6 | 0, fila, 773) < 0.25 ? C.ladrilloL : C.ladrillo; }
  rect(0, 136, 319, 137, hex('#5a3a2e'));
  // el suelo de la azotea: tela asfáltica con grava, las juntas de las láminas y un charco
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 774); let c = q < 0.12 ? hex('#6a6670') : q > 0.9 ? hex('#8a8690') : hex('#56525c'); if ((x + Math.floor(y * 0.4)) % 47 === 0) c = hex('#3e3a44'); B[y * 320 + x] = c; }
  for (let y = 164; y < 172; y++) for (let x = 118; x < 168; x++) if (((x - 143) / 25) ** 2 + ((y - 168) / 4) ** 2 < 1) B[y * 320 + x] = (x + y) % 9 === 0 ? hex('#c8d8e8') : hex('#7a8a9a');
  // la caseta de la escalera, con su puerta de madera, el farol y su tejadillo
  { const x0 = 4, x1 = 50; rect(x0, 94, x1, 140, C.ladrillo); for (let y = 96; y < 140; y += 3) for (let x = x0 + ((y / 3) & 1) * 3; x < x1; x += 6) pset(x, y, C.ladrilloS); rect(x1 - 4, 94, x1, 140, C.ladrilloS);
    rect(x0 - 2, 90, x1 + 2, 94, hex('#5a5e6a')); rect(x0 - 2, 90, x1 + 2, 90, hex('#7a7e8a')); rect(x0 - 2, 94, x1 + 2, 94, hex('#2a2a34'));
    rect(18, 110, 34, 140, hex('#3a2a1e')); rect(19, 111, 33, 140, hex('#6a4a2e')); for (const yy of [113, 125]) { rect(21, yy, 31, yy + 9, hex('#5a3e26')); rect(22, yy + 1, 31, yy + 9, hex('#7a5636')); } pset(31, 126, C.oro); rect(17, 108, 35, 109, hex('#d0c8b8'));
    rect(40, 104, 44, 110, C.k); rect(41, 105, 43, 109, nn ? d_P.luz : hex('#c8d0d8')); pset(42, 103, C.k); }
  // la garita de los termómetros: la caja blanca de lamas sobre sus patas, con su tejadillo
  { const x0 = 60, x1 = 86, y0 = 106, y1 = 128; for (const lx of [x0 + 2, x1 - 3]) rect(lx, y1, lx + 1, 142, hex('#e8e4dc')); linea(x0 + 2, 138, x1 - 2, 132, hex('#c8c0b4'));
    rect(x0, y0, x1, y1, hex('#f4f0e8')); for (let y = y0 + 2; y < y1; y += 2) { rect(x0 + 1, y, x1 - 1, y, hex('#c8c0b4')); } rect(x1 - 3, y0, x1, y1, hex('#d8d0c4')); rect(x0 + 12, y0 + 2, x0 + 12, y1 - 1, hex('#a8a094')); pset(x0 + 13, y0 + 11, d_P.hierro);
    poligono([[x0 - 3, y0], [(x0 + x1) / 2, y0 - 6], [x1 + 3, y0]], hex('#f4f0e8')); linea((x0 + x1) / 2, y0 - 6, x1 + 3, y0, hex('#c8c0b4')); rect(x0 - 3, y0, x1 + 3, y0, hex('#a8a094')); }
  // el pluviómetro de cobre y el heliógrafo (la bola de cristal sobre su peana)
  { rect(96, 130, 102, 142, hex('#b87a4a')); rect(101, 130, 102, 142, hex('#8a5a32')); rect(95, 129, 103, 129, hex('#d89a6a')); rect(97, 141, 101, 142, hex('#6a4a2a')); }
  { rect(110, 134, 114, 142, hex('#8a8a90')); rect(108, 132, 116, 133, hex('#6a6a70')); disco(112, 128, 4, hex('#c8e0f0')); disco(112, 128, 3, hex('#a8c8e0')); pset(111, 126, C.blanco); }
  // los mástiles de la veleta y del anemómetro, con sus vientos, y el mástil de señales con la verga
  for (const [mx, top] of [[150, 64], [186, 72]]) { rect(mx, top, mx + 1, 142, hex('#4a4e58')); rect(mx, top, mx, 142, hex('#7a7e88')); rect(mx - 3, 140, mx + 4, 142, hex('#3a3e46')); linea(mx, top + 20, mx - 14, 142, hex('#6a6e78')); linea(mx + 1, top + 20, mx + 15, 142, hex('#6a6e78')); }
  { const mx = 232; rect(mx, 20, mx + 1, 142, hex('#e8e4dc')); rect(mx + 1, 20, mx + 1, 142, hex('#b8b4ac')); disco(mx, 18, 1.5, C.oro); rect(mx - 12, 28, mx + 13, 29, hex('#d8d4cc')); rect(mx - 12, 29, mx + 13, 29, hex('#a8a49c')); rect(mx - 4, 140, mx + 5, 142, hex('#3a3e46')); rect(mx + 3, 132, mx + 5, 133, d_P.hierro); }
  // la chimenea de ladrillo y la claraboya
  { const x0 = 262, x1 = 276; rect(x0, 96, x1, 142, C.ladrillo); for (let y = 98; y < 142; y += 3) for (let x = x0 + ((y / 3) & 1) * 3; x < x1; x += 6) pset(x, y, C.ladrilloS); rect(x1 - 3, 96, x1, 142, C.ladrilloS); rect(x0 - 1, 94, x1 + 1, 96, hex('#8a8a90')); rect(x0 + 2, 93, x1 - 2, 93, C.k); }
  { const x0 = 280, x1 = 318; rect(x0, 160, x1, 172, hex('#3a3e46')); for (let x = x0 + 2; x < x1; x += 6) for (let y = 161; y < 171; y++) pset(x, y, hex('#5a5e66')); for (let x = x0 + 1; x < x1; x++) for (let y = 161; y < 171; y++) if ((x - x0) % 6 !== 1) pset(x, y, (x + y) % 7 === 0 ? hex('#c8d8e8') : hex('#6a8098')); rect(x0, 158, x1, 159, hex('#5a5e66')); }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, cielo);
  if (nn) d_anochecer(R, foto, luces);
  return {};
}

// ══ la azotea (cada fotograma) ══
// o.bandera 0–1: la bandera roja con el cuadro negro (aviso de temporal) sube por el mástil; o.banderas: 2 para el aviso
// de huracán (dos banderas, una encima de otra)
function d_galTejado(R, t, S) {
  const { o, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, B = R.buf;
  const capa = d_fondo(R, 'tejado|' + cielo, noche, (n, mc, mk) => d_tejadoFijo(R, cielo, n, mc, mk)), m = capa.m;
  d_nubesGal(R, t, m, 96, cielo, nn, viento);
  const destello = cielo === 'tormenta' ? d_rayo(R, t, m, 84, 5.9) : 0;
  // las gaviotas que pelean contra el viento, casi quietas en el aire
  if (cielo !== 'tormenta' || viento < 0.9) for (let k = 0; k < 3; k++) { const x = Math.round(70 + k * 60 + Math.sin(t * 0.6 + k) * (8 - viento * 6) - viento * 10), y = 40 + k * 9 + Math.round(Math.sin(t * 1.7 + k * 2) * 2); if (m[y * 320 + x]) R.gaviota(x, y, t * (1 + viento), k); }
  // el humo de la chimenea, tumbado por el viento
  for (let i = 0; i < 7; i++) { const u = (t * (0.35 + viento * 0.5) + i / 7) % 1, sx = Math.round(270 - u * (8 + viento * 50) + Math.sin(t * 2 + i) * 1.5), sy = Math.round(90 - u * (24 - viento * 18)); if (!(sx > 272 && sy < 50)) R.disco(sx, sy, 1 + u * 3, tn(u > 0.6 ? hex('#9a9aa2') : hex('#c8c8cc'))); }
  // la ropa tendida en una azotea de enfrente, que se agita
  { const y0 = 99; R.linea(102, y0, 130, y0 + 1, tn(hex('#3a3a40'))); for (let k = 0; k < 4; k++) { const x = 105 + k * 7, sw = Math.round(Math.sin(t * (4 + viento * 6) + k) * (1 + viento * 2)) - Math.round(viento * 2); for (let j = 1; j < 6; j++) for (let i = 0; i < 4; i++) R.pset(x + i + Math.round(sw * j / 5), y0 + j, tn([C.blanco, hex('#c8d8f0'), hex('#f0c8c8'), C.blanco][k])); } }
  // el heliógrafo brilla al sol
  if (!nn && cielo === 'claro' && Math.sin(t * 2.3) > 0.3) { R.pset(113, 127, C.blanco); R.pset(114, 126, hex('#fff8dc')); R.pset(112, 125, hex('#fff8dc')); }
  // el anemómetro: cuatro cazoletas que giran (más deprisa con más viento) y su caja de contactos
  { const cx = 150, cy = 62, w = (2 + viento * 14) * t; R.rect(cx - 2, cy + 2, cx + 3, cy + 6, tn(hex('#3a3e46'))); R.pset(cx - 1, cy + 3, tn(hex('#7a7e88')));
    const tazas = []; for (let k = 0; k < 4; k++) { const a = w + k * Math.PI / 2; tazas.push([Math.cos(a), Math.sin(a)]); } tazas.sort((p, q) => p[1] - q[1]);
    for (const [c, s] of tazas) { const x = Math.round(cx + c * 11), y = cy + Math.round(s * 1.5); R.linea(cx, cy, x, y, tn(hex('#4a4e58'))); const col = s < 0 ? tn(hex('#5a5e68')) : tn(hex('#a8aeb8')), hueco = tn(hex('#2a2c34')), dx = s > 0 ? 1 : -1; R.disco(x, y, 2.4, col); if (Math.abs(c) < 0.8) { R.pset(x + dx, y, hueco); R.pset(x + dx, y - 1, hueco); R.pset(x + dx * 2, y, hueco); } R.pset(x - dx, y - 2, tn(s > 0 ? C.blanco : hex('#7a7e88'))); }
    R.pset(cx, cy - 1, tn(hex('#d8d8e0'))); }
  // la veleta: la flecha gira con el viento (de canto se ve corta) y las cuatro bolas de los rumbos
  { const cx = 186, cy = 70, g = 0.4 + Math.sin(t * 0.5) * 0.4 + Math.sin(t * (2 + viento * 5)) * (0.08 + viento * 0.25), L = Math.round(Math.cos(g) * 10), z = Math.round(Math.sin(g) * 2);
    R.rect(cx - 8, cy + 6, cx + 9, cy + 6, tn(hex('#4a4e58'))); for (const bx of [cx - 8, cx + 9]) R.disco(bx, cy + 6, 1.2, tn(C.oro)); R.pset(cx, cy + 4, tn(C.oro)); R.pset(cx + 1, cy + 8, tn(C.oro));
    R.linea(cx - L, cy - z, cx + L, cy + z, tn(C.k)); const px = cx + L, py = cy + z; R.pset(px + Math.sign(L), py, tn(C.k)); R.pset(px, py - 1, tn(C.k)); R.pset(px, py + 1, tn(C.k)); for (let j = -2; j <= 2; j++) R.pset(cx - L - Math.sign(L) * (Math.abs(j) > 1 ? 0 : 1), cy - z + j, tn(C.k)); R.pset(cx, cy, tn(C.oro)); }
  // las banderas de aviso: suben por la driza con o.bandera y ondean al viento
  { const mx = 232, sube = d_lim(typeof o.bandera === 'number' ? o.bandera : 1), n = o.banderas === 2 ? 2 : 1, y0 = Math.round(lerp(126, 30, sube));
    R.linea(mx + 4, 132, mx + 2, 30, tn(hex('#c8c0a8'))); R.linea(mx + 5, 133, mx + 13, 30, tn(hex('#c8c0a8')));
    for (let f = 0; f < n; f++) { const fy = y0 + f * 12; if (fy > 128) continue; for (let i = 0; i < 12; i++) { const amp = (0.3 + viento * 1.2) * i / 11, dy = Math.round(Math.sin(t * (6 + viento * 8) - i * 0.9) * amp); for (let j = 0; j < 10; j++) { const negro = i >= 4 && i <= 7 && j >= 3 && j <= 6; R.pset(mx + 2 + i, fy + j + dy, tn(negro ? hex('#1a1a20') : j === 0 || i === 11 ? hex('#a82a2a') : hex('#d83a3a'))); } } } }
  // las palomas en el pretil, que picotean
  for (let k = 0; k < 3; k++) { const px = 120 + k * 11 + (k === 2 ? 60 : 0), pic = Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0; R.rect(px, 121, px + 3, 123, tn(hex('#7a7a8a'))); R.pset(px + 4, 121 + pic, tn(hex('#5a5a6a'))); R.pset(px + 5, 121 + pic, tn(C.naranja)); R.pset(px, 120, tn(hex('#9a9aaa'))); }
  if (cielo === 'tormenta') { const prev = R.delante; R.delante = () => { if (prev) prev(); d_lluvia(R, t, 140, viento); if (destello) d_destello(R, destello); }; }
}

const d_HI = 112;   // el horizonte (y la orilla de la isla)

// la capa fija de la isla: el cielo y la franja de tierra que apenas asoma del mar, con la ciudad entera encima: casas
// diminutas, las dos torres de la catedral, la cúpula, el depósito de agua, los elevadores de grano del puerto con los
// mástiles detrás, las casas de baños sobre pilotes en la orilla, palmeras y, al fondo a la derecha, el faro de Bolívar
function d_islaFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, luces = new Set([d_P.luz, d_P.luzL, d_P.luzS]);
  d_degradado(R, 0, d_HI, d_CIELOS[nn ? 'noche' : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [226, 26, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  for (let y = d_HI; y < 180; y++) { const p = (y - d_HI) / 68, f = y * 320, mar = nn ? d_MAR[cielo].map(d_nocturno) : d_MAR[cielo]; for (let x = 0; x < 320; x++) B[f + x] = p < 0.2 ? (d_umbral(x, y) < p * 5 ? mar[1] : mar[0]) : p < 0.6 ? (d_umbral(x, y) < (p - 0.2) / 0.4 ? mar[2] : mar[1]) : mar[2]; }
  const foto = marca();
  const bruma = cielo === 'claro' ? hex('#c8d4dc') : hex('#a8b0b8'), lej = (c, a = 0.35) => d_mezcla(c, bruma, a);
  // los mástiles del puerto (detrás de la ciudad, al otro lado de la isla)
  for (const mx of [214, 222, 236, 244, 252, 268]) { rect(mx, 82 + (mx % 5), mx, 104, lej(d_P.mastil, 0.5)); for (const yy of [86, 92]) rect(mx - 3, yy + (mx % 5), mx + 3, yy + (mx % 5), lej(d_P.verga, 0.5)); }
  // la ciudad: hileras de casas diminutas con sus tejados, de lejos más claras
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 70; k++) { const x = Math.round(h(k, fila, 780) * 316) - 4, w = 4 + Math.round(h(k, fila, 781) * 5), base = 104 + fila * 2, alto = 3 + Math.round(h(k, fila, 782) * 4), y0 = base - alto, a = 0.45 - fila * 0.12;
    const c = lej([C.victC, C.victA, C.victR, C.victV, hex('#e8cc80'), C.blanco][Math.floor(h(k, fila, 783) * 6)], a), te = lej([d_P.pizarra, d_P.tablilla, d_P.tejaV][k % 3], a);
    rect(x, y0, x + w, base, c); rect(x + w - 1, y0, x + w, base, d_mezcla(c, C.k, 0.15)); if (k % 2) poligono([[x - 1, y0 + 0.5], [x + w / 2, y0 - 3], [x + w + 1, y0 + 0.5]], te); else rect(x - 1, y0 - 1, x + w + 1, y0, te);
    if (w > 6 && alto > 4) pset(x + 2, y0 + 2, nn ? d_P.luz : lej(d_P.cristalS, a)); }
  // la catedral (dos torres), la cúpula, el depósito de agua, los elevadores de grano y las palmeras
  { const cx = 150; for (const tx of [cx - 5, cx + 5]) { rect(tx - 2, 86, tx + 2, 104, lej(hex('#d8ccb4'))); rect(tx + 1, 86, tx + 2, 104, lej(hex('#b8ac94'))); poligono([[tx - 3, 86], [tx, 78], [tx + 3, 86]], lej(hex('#6a6e7a'))); pset(tx, 77, lej(C.oro)); } rect(cx - 3, 92, cx + 3, 104, lej(hex('#d0c4ac'))); }
  { const cx = 196; rect(cx - 6, 94, cx + 6, 104, lej(hex('#c8bca8'))); for (let y = 86; y < 94; y++) { const w = Math.round(Math.sqrt(1 - ((94 - y) / 8) ** 2) * 6); rect(cx - w, y, cx + w, y, lej(hex('#7aa0a0'))); } rect(cx, 82, cx, 86, lej(C.k)); }
  { const cx = 92; for (const lx of [cx - 4, cx + 4]) rect(lx, 90, lx, 104, lej(d_P.hierro)); linea(cx - 4, 96, cx + 4, 102, lej(d_P.hierro)); linea(cx + 4, 96, cx - 4, 102, lej(d_P.hierro)); rect(cx - 5, 82, cx + 5, 90, lej(hex('#8a8e98'))); poligono([[cx - 6, 82], [cx, 78], [cx + 6, 82]], lej(hex('#5a5e6a'))); }
  for (const [ex, et] of [[254, 90], [272, 92]]) { const ce = lej(hex('#8a7a6a'), 0.3), ceS = lej(hex('#6a5a4a'), 0.3); rect(ex - 6, et, ex + 6, 104, ce); for (let x = ex - 6; x <= ex + 6; x += 3) rect(x, et, x, 104, ceS); poligono([[ex - 7, et], [ex, et - 5], [ex + 7, et]], lej(d_P.pizarra, 0.3)); rect(ex - 2, et - 9, ex + 2, et - 4, ce); poligono([[ex - 3, et - 9], [ex, et - 11], [ex + 3, et - 9]], lej(d_P.pizarra, 0.3)); for (let y = et + 3; y < 102; y += 5) pset(ex - 3, y, lej(hex('#3a3040'), 0.3)); }
  linea(258, 96, 268, 98, lej(hex('#6a5a4a'), 0.3));
  for (const px of [40, 70, 118, 172, 228, 290]) { rect(px, 96, px, 106, lej(C.corteza, 0.2)); for (let k = 0; k < 6; k++) { const a = -Math.PI + k * Math.PI / 5; for (let d = 1; d < 5; d++) pset(Math.round(px + Math.cos(a) * d), Math.round(96 + Math.sin(a) * d * 0.5 + d * d * 0.1), lej(k % 2 ? C.hierba : C.hierbaS, 0.2)); } }
  // el faro de Bolívar al otro lado del canal: la torre negra con su linterna
  { const fx = 306; rect(fx - 2, 80, fx + 2, 108, lej(hex('#2a2a30'), 0.3)); rect(fx - 1, 80, fx - 1, 108, lej(hex('#4a4a52'), 0.3)); rect(fx - 2, 76, fx + 2, 79, lej(hex('#e8e0c8'), 0.2)); rect(fx - 3, 75, fx + 3, 75, lej(C.k, 0.3)); pset(fx, 74, lej(C.k, 0.3)); rect(fx - 6, 106, fx + 8, 110, lej(hex('#c8b890'), 0.3)); }
  // la franja de arena: la playa que apenas asoma, con la línea de espuma
  for (let y = 105; y < d_HI; y++) for (let x = 0; x < 320; x++) { const c = y < 108 ? hex('#c8b88e') : y < 110 ? hex('#e6d2a6') : hex('#d4c49c'); if (B[y * 320 + x] === foto[y * 320 + x] || y >= 108) B[y * 320 + x] = lej(c, 0.2); }
  // las casas de baños sobre pilotes en la orilla
  for (const bx of [104, 182]) { for (let x = bx - 10; x <= bx + 10; x += 3) rect(x, 108, x, 113, lej(d_P.posteS, 0.2)); rect(bx - 12, 107, bx + 12, 108, lej(d_P.tabla, 0.2)); rect(bx - 10, 101, bx + 10, 106, lej(hex('#efe4c8'), 0.2)); for (let x = bx - 8; x < bx + 9; x += 3) pset(x, 103, lej(hex('#3e6a4a'), 0.2)); poligono([[bx - 12, 101], [bx, 95], [bx + 12, 101]], lej(hex('#a8463a'), 0.2)); poligono([[bx - 4, 96], [bx, 91], [bx + 4, 96]], lej(hex('#a8463a'), 0.2)); rect(bx, 86, bx, 91, lej(C.k, 0.2)); }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, cielo);
  if (nn) d_anochecer(R, foto, luces);
  return {};
}

// una goleta de dos palos que navega con las velas hinchadas, cabeceando (x: el centro del casco, y: la línea de flotación)
function d_goleta(R, x, y, t, tn, dir = 1) {
  const { pset, rect, poligono, linea } = R, cab = Math.sin(t * 1.6) * 1.2, X = (i) => Math.round(x + i * dir), Y = (j, i = 0) => Math.round(y + j + cab * i / 20);
  poligono([[X(-22), Y(-5, -22)], [X(24), Y(-6, 24)], [X(18), Y(1, 18)], [X(-18), Y(1, -18)]], tn(hex('#2a2a34'))); linea(X(-22), Y(-5, -22), X(24), Y(-6, 24), tn(hex('#c8a040'))); linea(X(-20), Y(-3, -20), X(21), Y(-4, 21), tn(hex('#5a3a2a')));
  for (const [mx, top, w] of [[-6, -40, 16], [8, -44, 18]]) { linea(X(mx), Y(-6, mx), X(mx), Y(top, mx), tn(hex('#5a4a3a')));
    for (let j = top + 3; j < -8; j++) { const u = (j - top - 3) / (-8 - top - 3), l = Math.round(w * (0.5 + 0.5 * u)), panza = Math.round(Math.sin(u * Math.PI) * 2); for (let i = 1; i <= l; i++) pset(X(mx - i - panza * (i > l / 2 ? 1 : 0)), Y(j, mx - i), tn(i > l - 2 ? hex('#c8bca8') : (j - top) % 6 === 0 ? hex('#d8d0c0') : hex('#f4eee2'))); } }
  for (let j = -38; j < -8; j++) { const u = (j + 38) / 30, l = Math.round(10 * u); for (let i = 0; i < l; i++) pset(X(10 + i), Y(j, 10 + i), tn(i < 1 ? hex('#c8bca8') : hex('#f4eee2'))); }
  linea(X(8), Y(-44, 8), X(26), Y(-7, 26), tn(hex('#8a7a6a'))); for (let i = 0; i < 6; i++) pset(X(8 - i), Y(-45, 8) + Math.round(Math.sin(t * 6 - i) * 0.6), tn(C.rojo));
  for (let i = 0; i < 10; i++) pset(X(-24 - i * 2), Math.round(y + 1 + (i & 1)), tn(hex('#e8f0f0')));   // la estela
}

// ══ la isla desde el golfo (cada fotograma) ══
function d_galIsla(R, t, S) {
  const { noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, B = R.buf;
  const capa = d_fondo(R, 'isla|' + cielo, noche, (n, mc, mk) => d_islaFijo(R, cielo, n, mc, mk)), m = capa.m;
  d_nubesGal(R, t, m, d_HI, cielo, nn, viento);
  // el mar: crestas en perspectiva, el camino del sol, sombras de nubes y la espuma en la orilla
  const mar = d_MAR[cielo].map(S.tnN), esp = S.tnN(hex('#f4f8f4')), ol = cielo === 'tormenta' ? 1 : cielo === 'gris' ? 0.6 : 0.3;
  if (cielo === 'claro' && !nn) for (let y = d_HI + 2; y < 180; y += 2) { const f = (y - d_HI) / 68, w = 2 + f * 22; for (let k = 0; k < 2 + f * 5; k++) { const x = Math.round(226 + (h(k, y, Math.floor(t * 4)) - 0.5) * 2 * w); if (h(k, y, Math.floor(t * 6) + 9) < 0.5) d_psM(B, m, x, y, tn(C.blanco)); } }
  for (let r = 0; r < 15; r++) { const f = (r + 1) / 15, y0 = d_HI + 3 + 62 * f ** 1.5, paso = 10 + 34 * f, v = 2 + 9 * f;
    for (let k = -1; k < 340 / paso; k++) { const a = h(k, r, 790), b = h(k, r, 791); if (a < 0.22) continue; const xx = Math.round(k * paso + (b - 0.5) * paso * 0.8 + ((t * v + r * 17) % paso)) - paso, w = Math.round((2 + 16 * f) * (0.55 + a * 0.7)), yy = Math.round(y0 + Math.sin(t * 1.4 + k + r) * (f > 0.5 ? 1 : 0)), al = 1 + Math.round(f * (1.5 + ol * 2) * a);
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin(i / w * Math.PI) * al); d_psM(B, m, xx + i, yc, i < w * 0.65 ? mar[4] : mar[1]); d_psM(B, m, xx + i, yc + 1, tn(hex('#2e5a6a'))); }
      if (f > 0.45 && h(k, r, Math.floor(t * 1.2 + a * 5)) < 0.12 + ol * 0.2) { const bx = xx + Math.round(w / 2); for (let i = -2; i <= 2; i++) d_psM(B, m, bx + i, yy - al - 1, esp); } } }
  for (let x = 0; x < 320; x++) if ((x + Math.floor(t * 6)) % 5 < 3) d_psM(B, m, x, d_HI + (Math.sin(x * 0.2 + t * 2) > 0.3 ? 1 : 0), esp);
  // delfines que saltan, pelícanos, gaviotas y la goleta que pasa
  { const u = (t % 9) / 1.2; if (u < 1) { const dx = 70 + Math.floor(t / 9) % 3 * 60, x = Math.round(dx + u * 18), y = Math.round(150 - Math.sin(u * Math.PI) * 9), c = tn(hex('#6a7a8a')); R.rect(x - 3, y, x + 3, y + 1, c); R.pset(x + 4, y + (u < 0.5 ? 0 : 1), c); R.pset(x, y - 1, c); R.pset(x - 4, y + (u < 0.5 ? 1 : 0), c); R.pset(x - 5, y + (u < 0.5 ? 2 : -1), c); R.pset(x + 1, y + 1, tn(hex('#c8d4dc'))); } }
  if (cielo !== 'tormenta') { d_pelicanos(R, t, 124, tn, 14); for (let k = 0; k < 3; k++) { const x = Math.round(((k * 113 + t * (8 + k * 3)) % 380) - 30), y = 40 + k * 14 + Math.round(Math.sin(t * 0.8 + k) * 3); if (m[y * 320 + x] && !(x > 268 && y < 50)) R.gaviota(x, y, t, k); } }
  // el humo de las chimeneas de la ciudad y la luz del faro
  for (const cx of [60, 130, 210]) for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3) % 1; d_psM(B, m, Math.round(cx + u * (4 + viento * 14)), Math.round(100 - u * 10), tn(hex('#c8c8cc'))); }
  if (nn || cielo === 'tormenta') { const on = Math.sin(t * 2.2) > 0.2; if (on) { R.rect(305, 77, 307, 78, d_P.farolL); for (let i = 1; i < 30; i++) { const a = Math.sin(t * 2.2) * 0.6; d_psM(B, m, Math.round(306 - i * Math.cos(a)), 77 - Math.round(i * 0.08), d_P.farol); } } }
  d_goleta(R, ((t * 6 + 40) % 400) - 40, 158, t, tn, 1);
  if (cielo === 'tormenta') { const prev = R.delante; R.delante = () => { if (prev) prev(); d_lluvia(R, t, 120, viento); }; }
}

// la geometría del muro en perspectiva: en la columna x, la albardilla (arriba) y el pie; se aleja hacia la derecha
const d_MURO = { x1: 238, top: (x) => Math.round(lerp(58, 96, x / 238)), pie: (x) => Math.round(lerp(146, 104, x / 238)), orilla: (x) => (x < 168 ? 999 : 180 - (x - 168) * 0.963) };

const d_esMar = (x, y) => y >= 101 && y > d_MURO.orilla(x);

// la capa fija del muro (lo que no depende de o.muro ni del oleaje): cielo, mar del fondo, la ciudad elevada que asoma
// por encima del muro y la playa
function d_muroFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, A = d_ARENA, mar = d_MAR[cielo], luces = new Set([d_P.luz, d_P.luzL, d_P.luzS]);
  d_degradado(R, 0, 104, d_CIELOS[nn ? 'noche' : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [226, 22, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  const marN = nn ? mar.map(d_nocturno) : mar;
  for (let y = 102; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 102) / 30, mar = marN; B[y * 320 + x] = p < 0.3 ? (d_umbral(x, y) < p * 3.3 ? mar[1] : mar[0]) : p < 1 ? (d_umbral(x, y) < (p - 0.3) / 0.7 ? mar[2] : mar[1]) : mar[2]; }
  const foto = marca();
  // la playa: arena seca y mojada hasta la orilla, que va en diagonal
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const o = d_MURO.orilla(x); if (y < 101 || y > o || y < d_MURO.pie(Math.min(x, 238)) - 2) continue; const q = h(x, y, 800), moj = y > o - 7 + (x - 168) * 0.03; let c = moj ? (q < 0.1 ? A.mojS : A.moj) : (Math.sin(x * 0.12 + y * 0.8) > 0.84 ? A.secaS : q < 0.05 ? A.secaS : q > 0.96 ? A.secaL : A.seca); if (moj && y > o - 2) c = A.mojL; B[y * 320 + x] = c; }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 801) * 220), y = 140 + Math.round(h(k, 2, 801) * 38); if (y < d_MURO.orilla(x) - 8) pset(x, y, A.concha); }
  for (let k = 0; k < 16; k++) { const x = 96 + k * 6 + Math.round(Math.sin(k) * 2), y = 176 - k * 2; pset(x, y, A.secaS); pset(x + 2, y + 1, A.secaS); }
  { const cx = 30, cy = 170; rect(cx - 9, cy - 3, cx + 9, cy, A.secaS); rect(cx - 8, cy - 4, cx + 8, cy - 1, hex('#d8c494')); for (const [dx, al] of [[-6, 6], [0, 9], [6, 6]]) { rect(cx + dx - 2, cy - 4 - al, cx + dx + 2, cy - 4, hex('#d8c494')); rect(cx + dx + 1, cy - 4 - al, cx + dx + 2, cy - 4, A.secaS); for (let i = -2; i <= 2; i += 2) pset(cx + dx + i, cy - 5 - al, hex('#d8c494')); } rect(cx, cy - 18, cx, cy - 13, hex('#6a4a2a')); rect(cx + 1, cy - 18, cx + 3, cy - 17, C.rojo); for (let i = -12; i <= 12; i++) pset(cx + i, cy + 1, A.mojS); }
  // la ciudad nueva por detrás del muro: tejados, chimeneas, palmeras y una torre, más pequeños cuanto más lejos
  for (let k = 0; k < 16; k++) { const x = Math.round(k * 15 + h(k, 1, 802) * 8), u = x / 238, s = lerp(1, 0.3, u), top = d_MURO.top(x), w = Math.round((10 + h(k, 2, 802) * 8) * s), alto = Math.round((10 + h(k, 3, 802) * 12) * s), c = [C.victA, C.victC, C.victR, C.victV, hex('#e8cc80')][k % 5];
    if (x > 236) continue; const y0 = top - alto; rect(x, y0, x + w, top, c); rect(x + w - Math.max(1, Math.round(2 * s)), y0, x + w, top, d_mezcla(c, C.k, 0.2)); poligono([[x - 1, y0 + 1], [x + w / 2, y0 - Math.round(6 * s)], [x + w + 1, y0 + 1]], [d_P.pizarra, d_P.tablilla, d_P.tejaV][k % 3]);
    if (s > 0.5) { rect(x + 2, y0 + 3, x + 3, y0 + 5, d_P.cristalS); if (w > 8) rect(x + w - 4, y0 + 3, x + w - 3, y0 + 5, d_P.cristalS); } if (k % 4 === 1) rect(x + w - 3, y0 - Math.round(8 * s), x + w - 2, y0 - 2, C.ladrillo); }
  for (const [px, s] of [[34, 1], [118, 0.75], [180, 0.5]]) { const top = d_MURO.top(px), alto = Math.round(26 * s), cy = top - alto; rect(px, cy, px + Math.max(1, Math.round(s * 2)) - 1, top, C.corteza); for (let k = 0; k < 9; k++) { const a = -Math.PI + k * Math.PI / 8; for (let d = 1; d < 10 * s; d++) pset(Math.round(px + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.55 + d * d * 0.05), k % 2 ? C.hierba : C.hierbaS); } }
  { const tx = 150, top = d_MURO.top(tx); rect(tx - 3, top - 30, tx + 3, top, hex('#d8ccb4')); rect(tx + 1, top - 30, tx + 3, top, hex('#b8ac94')); poligono([[tx - 4, top - 30], [tx, top - 40], [tx + 4, top - 30]], d_P.pizarra); rect(tx - 1, top - 26, tx, top - 22, hex('#4a3e3e')); }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, cielo);
  if (nn) d_anochecer(R, foto, luces);
  return {};
}

// el muro, la escollera y la escalinata (cada fotograma, porque o.muro cambia cuánto hay hecho); tn: el tinte
function d_muroHormigon(R, t, hecho, tn) {
  const { pset, rect, linea } = R, B = R.buf, xm = Math.round(hecho * d_MURO.x1);
  const cap = tn(hex('#ece8e0')), capS = tn(hex('#8a867e')), cara = tn(hex('#b8b2a6')), caraL = tn(hex('#cec8bc')), caraLL = tn(hex('#dcd6ca')), junta = tn(hex('#9a948a')), mancha = tn(hex('#a6a094')), verdin = tn(hex('#5a6a4a')), verdinS = tn(hex('#3e4a34'));
  for (let x = 0; x < Math.min(xm, d_MURO.x1); x++) { const top = d_MURO.top(x), pie = d_MURO.pie(x), H = pie - top, u = x / 238, junV = Math.abs(((u * 12) % 1)) < 0.05 + u * 0.05, est = h(x >> 1, 1, 803) < 0.07;
    for (let y = top; y <= pie; y++) { const v = (y - top) / H; let c;
      if (v < 0.06) c = y === top ? tn(C.blanco) : cap; else if (v < 0.12) c = capS; else if (v < 0.2) c = d_umbral(x, y) < (v - 0.12) / 0.08 ? cara : junta; else if (v < 0.5) c = cara; else c = d_umbral(x, y) < (v - 0.5) / 0.5 ? caraLL : caraL;
      if (Math.abs(v - 0.36) < 0.5 / H || Math.abs(v - 0.7) < 0.5 / H) c = junta; if (junV && v > 0.1) c = junta; if (est && v > 0.12 && v < 0.5 + h(x, 2, 803) * 0.3) c = mancha; if (v > 0.9) c = d_umbral(x, y) < (v - 0.9) * 10 ? verdinS : verdin;
      B[y * 320 + x] = c; } }
  // la escalinata metida en la cara del muro, con sus pasamanos
  { const a = 62, b = 84; for (let x = a; x <= b && x < xm; x++) { const top = d_MURO.top(x), pie = d_MURO.pie(x), H = pie - top, paso = Math.max(2, Math.round(H / 14)); for (let y = top + Math.round(H * 0.1); y <= pie; y++) { const k = (y - top) % paso; B[y * 320 + x] = k === 0 ? tn(hex('#f0ece4')) : k === 1 ? tn(hex('#c8c2b6')) : tn(hex('#a8a296')); } }
    for (const xx of [a - 1, b + 1]) if (xx < xm) { const top = d_MURO.top(xx), pie = d_MURO.pie(xx); rect(xx - 1, top, xx, pie, tn(hex('#d8d2c6'))); linea(xx, top - 5, xx, pie - 2, tn(d_P.hierro)); } }
  // la barandilla de hierro y las farolas del paseo de arriba
  for (let x = 0; x < Math.min(xm, 236); x += 2) { const top = d_MURO.top(x), s = lerp(1, 0.3, x / 238); pset(x, top - Math.round(7 * s), tn(d_P.hierro)); if (x % Math.max(2, Math.round(8 * s)) < 2) linea(x, top - Math.round(7 * s), x, top - 1, tn(d_P.hierro)); }
  for (const lx of [20, 110, 176]) if (lx < xm) { const top = d_MURO.top(lx), s = lerp(1, 0.3, lx / 238), al = Math.round(26 * s); rect(lx, top - al, lx, top - 1, tn(d_P.hierro)); R.disco(lx, top - al - 1, Math.max(1, 2 * s), tn(hex('#f4f0e0'))); }
  // la escollera de bloques de granito al pie
  for (let k = 0; k < 46; k++) { const x = Math.round(k * 5.4 + h(k, 1, 804) * 4), u = x / 238; if (x > xm + 6 || x > 244) continue; const s = lerp(1.2, 0.35, u), pie = d_MURO.pie(x), w = Math.round((5 + h(k, 2, 804) * 5) * s), al = Math.round((4 + h(k, 3, 804) * 4) * s), y0 = pie - Math.round(2 * s) + Math.round(h(k, 4, 804) * 4 * s);
    R.poligono([[x - w, y0 + al], [x - w + 1, y0 + 1], [x - 1, y0 - 1], [x + w - 1, y0 + 1], [x + w, y0 + al]], tn(hex('#8a8690'))); R.linea(x - w + 1, y0 + 1, x - 1, y0 - 1, tn(hex('#b8b4bc'))); R.linea(x - 1, y0 - 1, x + w - 1, y0 + 1, tn(hex('#a8a4ac'))); R.rect(x, y0 + 1, x + w - 1, y0 + al, tn(hex('#6a6670'))); if (s > 0.7) R.pset(x - 2, y0 + 2, tn(hex('#d8d4dc'))); }
  // lo que falta por hacer: los pilotes, los encofrados de tablas, la grúa de vapor con su cubo y los obreros
  if (hecho < 1) { for (let x = xm; x < 238; x++) { const top = d_MURO.top(x), pie = d_MURO.pie(x), H = pie - top, u = x / 238, s = lerp(1, 0.3, u); const tabla = Math.floor((x - xm) / Math.max(2, Math.round(4 * s)));
      for (let y = top + Math.round(H * 0.3); y <= pie; y++) B[y * 320 + x] = (x - xm) % Math.max(2, Math.round(4 * s)) === 0 ? tn(hex('#6a4a2e')) : tabla % 2 ? tn(hex('#a8845a')) : tn(hex('#96744c')); if ((x - xm) % Math.max(3, Math.round(9 * s)) === 0) R.rect(x, top - Math.round(10 * s), x, pie, tn(hex('#5a3e26'))); }
    if (xm < 236) { const cx = Math.min(214, xm + 12), base = d_MURO.pie(cx) + Math.round(lerp(14, 4, cx / 238)), s = lerp(1.2, 0.4, cx / 238), mh = Math.round(64 * s), mx = cx, my = base - mh, g = -0.9 + Math.sin(t * 0.45) * 0.35, L = Math.round(44 * s), bx = Math.round(mx - Math.cos(g) * L), by = Math.round(my + 8 * s + Math.sin(g) * L * 0.5), W = tn(hex('#5a4026')), WL = tn(hex('#7a5a36'));
      R.rect(mx - Math.round(14 * s), base - Math.round(12 * s), mx + Math.round(6 * s), base, tn(hex('#7a5a3a'))); R.rect(mx - Math.round(14 * s), base - Math.round(14 * s), mx + Math.round(7 * s), base - Math.round(12 * s), tn(hex('#4a4a52'))); R.rect(mx - Math.round(11 * s), base - Math.round(9 * s), mx - Math.round(7 * s), base - Math.round(5 * s), tn(hex('#ffb040'))); R.rect(mx + Math.round(2 * s), base - Math.round(24 * s), mx + Math.round(4 * s), base - Math.round(14 * s), tn(d_P.hierro));
      R.linea(mx, base - Math.round(12 * s), mx, my, W); R.linea(mx + 1, base - Math.round(12 * s), mx + 1, my, WL); R.linea(mx, my, mx + Math.round(16 * s), base, W); R.linea(mx, my, mx - Math.round(18 * s), base - Math.round(12 * s), W);
      R.linea(mx, base - Math.round(16 * s), bx, by, W); R.linea(mx, my, bx, by, (xx, yy) => ((xx + yy) & 1 ? tn(C.k) : null)); const cb = by + Math.round((18 + Math.sin(t * 1.3) * 5) * s); R.linea(bx, by, bx, cb, tn(C.k)); R.rect(bx - Math.round(3 * s), cb, bx + Math.round(3 * s), cb + Math.round(5 * s), tn(d_P.hierro)); R.rect(bx - Math.round(3 * s), cb, bx + Math.round(3 * s), cb, tn(hex('#a8a4a0')));
      for (let i = 0; i < 5; i++) { const u2 = (t * 0.6 + i / 5) % 1; R.disco(Math.round(mx + 3 * s + u2 * (6 + 10 * u2)), Math.round(base - 25 * s - u2 * 20), 1 + u2 * 2.5, tn(u2 > 0.6 ? hex('#a8a8b0') : hex('#e0e0e4'))); }
      for (let k = 0; k < 3; k++) { const wx = Math.round(xm - 6 - k * 12 * s), wt = d_MURO.top(wx); if (wx < 0) continue; const tr = Math.sin(t * 4 + k * 2) > 0; d_paseante(R, wx, wt - 1, t, 0, k % 2 ? 1 : -1, false, (c) => tn(c === hex('#3a3a4a') ? hex('#4a5a7a') : c)); if (tr) R.linea(wx + 2, wt - 6, wx + 4, wt - 2, tn(hex('#8a7a6a'))); } } }
  return xm;
}

// ══ el muro (cada fotograma) ══
function d_galMuro(R, t, S) {
  const { o, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, B = R.buf, hecho = d_lim(o.muro ?? 1), ol = d_lim(o.olas ?? (cielo === 'tormenta' ? 1 : cielo === 'gris' ? 0.5 : 0.25)), mar = d_MAR[cielo].map(S.tnN), esp = S.tnN(hex('#f4f8f4')), espS = S.tnN(hex('#c8d4d0'));
  const capa = d_fondo(R, 'muro|' + cielo, noche, (n, mc, mk) => d_muroFijo(R, cielo, n, mc, mk)), m = capa.m;
  d_nubesGal(R, t, m, 102, cielo, nn, viento);
  // el mar del fondo: el camino del sol, las sombras de las nubes, crestas, espuma y la orilla con su resaca; un velero
  // y un vapor en el horizonte y pelícanos que pasan rozando el agua
  if (cielo === 'claro' && !nn) for (let y = 104; y < 180; y += 2) { const f = (y - 102) / 78, w = 3 + f * 26; for (let k = 0; k < 2 + f * 5; k++) { const x = Math.round(282 + (h(k, y, Math.floor(t * 4)) - 0.5) * 2 * w); if (d_esMar(x, y) && h(k, y, Math.floor(t * 6) + 9) < 0.5) d_psM(B, m, x, y, S.tnN(C.blanco)); } }
  for (let k = 0; k < 2; k++) { const cx = ((k * 170 + t * 6) % 460) - 60, cy = 120 + k * 30, rx = 50, ry = 4 + k * 3; for (let y = Math.max(103, cy - ry); y < Math.min(180, cy + ry); y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2))); for (let x = Math.max(0, Math.round(cx - w)); x < Math.min(320, cx + w); x++) { const i = y * 320 + x; if (m[i] && d_esMar(x, y) && d_umbral(x, y) < 0.5) B[i] = d_mezcla(B[i], S.tnN(hex('#2a4a5a')), 0.25); } } }
  for (const [bx, v, tipo] of [[262, 0.8, 0], [300, -0.5, 1]]) { const x = Math.round(((bx + t * v) % 340 + 340) % 340), y = 102; if (x < 252) continue;
    if (tipo) { for (let i = -5; i <= 5; i++) d_psM(B, m, x + i, y - 1, S.tnN(hex('#3a3a46'))); d_psM(B, m, x, y - 2, S.tnN(hex('#a83a2a'))); d_psM(B, m, x, y - 3, S.tnN(hex('#a83a2a'))); for (let i = 0; i < 5; i++) d_psM(B, m, x - 2 - i * 2, y - 4 - Math.round(i * 0.5), S.tnN(hex('#8a8a94'))); }
    else { for (let i = -3; i <= 3; i++) d_psM(B, m, x + i, y - 1, S.tnN(hex('#4a4a56'))); for (let j = 2; j < 9; j++) for (let i = 0; i < Math.round((9 - j) * 0.7); i++) d_psM(B, m, x + i, y - j, S.tnN(C.blanco)); } }
  if (cielo !== 'tormenta') { const u = (t % 15) / 15; for (let k = 0; k < 4; k++) { const x = Math.round(lerp(330, 180, u) + k * 11), y = Math.round(128 + k * 3 + Math.sin(t * 1.2 + k) * 1.5); if (!d_esMar(x, y)) continue; const bate = Math.sin(t * 7 - k) > 0.6, c = tn(hex('#6a5e52')); R.rect(x - 2, y, x + 2, y, c); R.pset(x - 3, y - 1, tn(hex('#c8a040'))); if (bate) { R.pset(x - 1, y - 1, c); R.pset(x, y - 2, c); R.pset(x + 1, y - 1, c); } else { R.rect(x - 5, y - 1, x + 5, y - 1, tn(hex('#4a4038'))); } } }
  for (let r = 0; r < 10; r++) { const f = (r + 1) / 10, y0 = 103 + 70 * f ** 1.4, paso = 10 + 26 * f, v = 3 + 9 * f;
    for (let k = -1; k < 340 / paso; k++) { const a = h(k, r, 805), b = h(k, r, 806); if (a < 0.25) continue; const xx = Math.round(k * paso + (b - 0.5) * paso * 0.8 + ((t * v + r * 17) % paso)) - paso, yy = Math.round(y0), w = Math.round((2 + 12 * f) * (0.55 + a * 0.7)), al = 1 + Math.round(f * (1 + ol * 2) * a);
      for (let i = 0; i < w; i++) { const x = xx + i, yc = yy - Math.round(Math.sin(i / w * Math.PI) * al); if (!d_esMar(x, yc - 1)) continue; d_psM(B, m, x, yc, i < w * 0.6 ? mar[4] : mar[1]); d_psM(B, m, x, yc + 1, mar[2]); } } }
  const T = 5 - ol * 1.4, fase = (t / T) % 1, sube = fase < 0.45 ? d_suave(fase / 0.45) : 1 - d_suave((fase - 0.45) / 0.55);
  for (let x = 168; x < 252; x++) { const o0 = d_MURO.orilla(x), sc = lerp(1, 0.2, (x - 168) / 84), e = Math.round(o0 - sube * (5 + ol * 6) * sc + Math.sin(x * 0.1 + t) * sc); for (let y = Math.max(101, e); y <= Math.round(o0) + 1; y++) { if (y > 179) continue; B[y * 320 + x] = y === e ? esp : h(x >> 1, y, 807 + Math.floor(t * 3)) < 0.16 ? espS : mar[4]; }
    for (let k = 0; k < 3; k++) { const u = ((t / T) + k / 3) % 1, y = Math.round(o0 + (2 + (1 - u) * 12) * sc * 1.2); if (y < 180 && d_esMar(x, y) && h(Math.floor((x + k * 30) / 8), k + Math.floor(t / T + k / 3) * 3, 808) < 0.55 + ol * 0.3) { d_psM(B, m, x, y, u > 0.5 ? esp : espS); if (u > 0.6 && (x & 1)) d_psM(B, m, x, y - 1, esp); } } }
  // el muro, la escollera y lo que falta por hacer
  const xm = d_muroHormigon(R, t, hecho, tn);
  // las olas que rompen contra la escollera (con o.olas): penachos de espuma que suben por la cara del muro
  if (ol > 0.4) for (let k = 0; k < 4; k++) { const fase2 = ((t + k * 1.7) % (4 - ol)) / 1.2; if (fase2 > 1) continue; const x = 150 + k * 22, pie = d_MURO.pie(x), top = d_MURO.top(x), alto = Math.round((pie - top) * (0.3 + ol * 0.7) * Math.sin(fase2 * Math.PI)); for (let j = 0; j < alto; j++) { const w = Math.round((1 - j / alto) * 6 + 2); for (let i = -w; i <= w; i++) if (h(i, j + Math.floor(t * 9), 809 + k) < 0.55) R.pset(x + i + Math.round(j * 0.15), pie - j, h(i, j, 810) < 0.5 ? esp : espS); } }
  // la gente que pasea por el paseo de arriba (asoma por encima de la barandilla), gaviotas y pelícanos
  if (hecho > 0.3 && cielo !== 'tormenta') for (let k = 0; k < 5; k++) { const dir = k % 2 ? -1 : 1, v = 3 + k, x = dir > 0 ? ((t * v + k * 61) % (xm + 20)) - 10 : xm + 10 - ((t * v + k * 47) % (xm + 20)); if (x < 0 || x > xm - 2) continue; const top = d_MURO.top(x), s = lerp(1, 0.3, x / 238); if (s < 0.5) continue; d_paseante(R, x, top - 1, t, [1, 0, 2, 5, 3][k], dir, true, tn); }
  if (cielo !== 'tormenta') for (let k = 0; k < 4; k++) { const x = Math.round(((k * 113 + t * (8 + k * 3)) % 380) - 30), y = 24 + k * 12 + Math.round(Math.sin(t * 0.8 + k) * 3); if (m[y * 320 + x] && y < d_MURO.top(Math.min(x, 238)) - 8 && !(x > 268 && y < 50)) R.gaviota(x, y, t, k); }
  if (cielo !== 'tormenta') {
    for (let k = 0; k < 3; k++) { const v = 4 + k * 1.5, u = ((t * v / 90 + k * 0.37) % 1), dir = k % 2 ? -1 : 1, x = Math.round(lerp(176, 236, dir > 0 ? u : 1 - u)), y = Math.round(d_MURO.orilla(x) - 6 - k * 2); d_paseante(R, x, y, t, [1, 2, 5][k], dir, true, tn); }
    { const sx = 214, sy = 128; R.linea(sx, sy, sx + 1, sy - 12, tn(d_P.posteS)); for (let i = -6; i <= 6; i++) { const yy = sy - 12 + Math.round(Math.abs(i) * 0.4); R.pset(sx + i, yy, tn(Math.abs(i) % 4 < 2 ? hex('#c83a3a') : C.blanco)); R.pset(sx + i, yy - 1, tn(Math.abs(i) < 5 ? (Math.abs(i) % 4 < 2 ? hex('#c83a3a') : C.blanco) : null) ?? tn(C.blanco)); } }
    { const kx = 60, ky = 166, cava = Math.sin(t * 5) > 0; d_paseante(R, kx, ky, t, 4, 1, false, tn); R.rect(kx + 4, ky - 3, kx + 6, ky, tn(hex('#3a6ab8'))); if (cava) R.pset(kx + 5, ky - 4, tn(d_ARENA.seca)); R.rect(kx - 6, ky - 2, kx - 2, ky, tn(d_ARENA.secaS)); R.rect(kx - 5, ky - 4, kx - 3, ky - 3, tn(d_ARENA.secaS)); R.pset(kx - 4, ky - 5, tn(C.rojo)); } }
  if (cielo === 'tormenta') { const prev = R.delante; R.delante = () => { if (prev) prev(); d_lluvia(R, t, 120, viento); }; }
}

const d_CS = { viejo: 152, nuevo: 122, sube: 30, casa: { x: 104, w: 60 } };

// el porche de la casa que sube (la del centro), para el perro del gag: { x0, x1, y } (y: el suelo del porche) y la
// escalera nueva { arriba: [x, y], abajo: [x, y] }
export function d_galvestonPorche(o = {}) {
  const s = d_lim(o.sube ?? 0), base = d_CS.viejo - Math.round(s * d_CS.sube), f1 = base - 8, arena = d_lim(o.arena ?? 0), suelo = Math.round(lerp(d_CS.viejo, d_CS.nuevo, arena));
  return { x0: d_CS.casa.x + 28, x1: d_CS.casa.x + d_CS.casa.w - 4, y: f1, escalera: { arriba: [d_CS.casa.x + 36, f1], abajo: [d_CS.casa.x + 36 + (f1 < suelo - 2 ? Math.round((suelo - f1) * 0.9) : 0), suelo] } };
}

// un obrero pequeño con gorra y peto que empuja la barra de un gato (fase: en qué punto de la vuelta va) o carga
function d_obrero(R, x, suelo, t, k, dir, tn, empuja = true) {
  const { pset, rect } = R, X = (i) => Math.round(x + i * dir), f = Math.sin(t * 3 + k * 1.3), inc = empuja ? Math.round(f * 1.2) : 0, ropa = tn([hex('#3a5a8a'), hex('#5a4a3a'), hex('#6a6a3a'), hex('#3a4a6a')][k % 4]), piel = tn([d_P.piel, d_P.pielD, d_P.pielS, d_P.piel][k % 4]);
  rect(Math.min(X(0), X(1)), suelo - 4, Math.max(X(0), X(1)), suelo, ropa); pset(X(empuja ? -1 : 0), suelo, tn(C.k)); pset(X(2), suelo, tn(C.k));
  rect(Math.min(X(inc), X(2 + inc)), suelo - 9, Math.max(X(inc), X(2 + inc)), suelo - 5, ropa); pset(X(1 + inc), suelo - 8, tn(hex('#e8e0d0')));
  rect(Math.min(X(inc), X(1 + inc)), suelo - 11, Math.max(X(inc), X(1 + inc)), suelo - 10, piel); rect(Math.min(X(-1 + inc), X(2 + inc)), suelo - 12, Math.max(X(-1 + inc), X(2 + inc)), suelo - 12, tn(hex('#4a4a52'))); pset(X(2 + inc), suelo - 11, tn(hex('#4a4a52')));
  if (empuja) { R.linea(X(2 + inc), suelo - 8, X(5 + inc), suelo - 7, piel); }
}

// la capa fija: el cielo, el fondo de casas ya subidas, la casa de la izquierda terminada sobre el relleno nuevo, la de
// la derecha esperando a su altura de siempre, la tubería de la draga sobre sus caballetes, el barro del suelo viejo y la
// pasarela de tablones de delante
function d_casasFijo(R, cielo, nn, marca, mascara = () => {}) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, luces = new Set([d_P.luz, d_P.luzL, d_P.luzS]), V = d_CS.viejo, N = d_CS.nuevo;
  d_degradado(R, 0, 120, d_CIELOS[nn ? 'noche' : cielo]);
  if (!nn && cielo === 'claro') { const [sx, sy, sr] = [226, 22, 8]; for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < 18 && d_umbral(x, y) < ((18 - d) / 10) ** 2) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); } disco(sx, sy, sr + 1, C.solL); disco(sx, sy, sr, C.sol); disco(sx - 3, sy - 3, 3, hex('#fffcec')); }
  const foto = marca();
  // el fondo: una fila de casas lejanas, unas ya subidas sobre pilotes altos, con bruma; y el muro a lo lejos
  const bruma = cielo === 'claro' ? hex('#c8d8e4') : hex('#a8b0ba'), lej = (c) => d_mezcla(c, bruma, 0.45);
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 821); B[y * 320 + x] = d_mezcla(y < 112 ? (q < 0.5 ? hex('#cbbf9a') : hex('#bfb28e')) : q < 0.12 ? hex('#5e5040') : q > 0.92 ? hex('#8a7a62') : hex('#6e604c'), bruma, y < 112 ? 0.3 : Math.max(0, 0.25 - (y - 112) * 0.01)); }
  for (let k = 0; k < 18; k++) { const x = k * 19 - 8 + Math.round(h(k, 1, 820) * 8), w = 10 + Math.round(h(k, 2, 820) * 6), alto = 10 + Math.round(h(k, 3, 820) * 6), pil = [12, 3, 8, 0][k % 4], base = 108 - pil + Math.round(h(k, 5, 820) * 3), y0 = base - alto, c = lej([C.victA, C.victC, C.victR, C.victV, hex('#e8cc80')][k % 5]);
    if (pil) for (let px = x + 1; px < x + w; px += 3) rect(px, base, px, base + pil, lej(k % 4 === 2 ? hex('#8a6a42') : d_P.posteS)); if (k % 4 === 2) for (let j = 0; j < pil; j += 2) rect(x + 1, base + j, x + w - 1, base + j, lej(hex('#6a4e30')));
    rect(x, y0, x + w, base, c); rect(x + w - 2, y0, x + w, base, d_mezcla(c, C.k, 0.15)); for (let yy = y0 + 2; yy < base; yy += 3) rect(x, yy, x + w - 3, yy, d_mezcla(c, C.k, 0.08)); poligono([[x - 2, y0 + 1], [x + w / 2, y0 - 6], [x + w + 2, y0 + 1]], lej([d_P.pizarra, d_P.tablilla, d_P.tejaV][k % 3]));
    for (let wx = x + 2; wx < x + w - 2; wx += 4) rect(wx, y0 + 3, wx + 1, y0 + 6, lej(d_P.cristalS)); rect(x + 1, base - 1, x + w - 1, base - 1, lej(d_P.moldura));
    if (k % 3 === 1) { const px = x + w + 4, pb = base + pil; rect(px, pb - 22, px, pb, lej(C.corteza)); for (let j = 0; j < 7; j++) { const a = -Math.PI + j * Math.PI / 6; for (let d = 1; d < 7; d++) pset(Math.round(px + Math.cos(a) * d), Math.round(pb - 22 + Math.sin(a) * d * 0.6 + d * d * 0.08), lej(j % 2 ? C.hierba : C.hierbaS)); } } }
  // el suelo: el relleno nuevo (arena gris y húmeda) a la izquierda, a la altura nueva, con su talud; el barro del suelo
  // viejo con charcos en el resto
  for (let y = N; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, talud = 76 + (y - N) * 0.5; if (y < V && x > talud) { if (y > 124) { const q = h(x, y, 823); B[i] = q < 0.12 ? hex('#5e5040') : q > 0.92 ? hex('#8a7a62') : hex('#6e604c'); } continue; } if (y < V && x <= talud) { const q = h(x, y, 822); B[i] = x > talud - 2 ? hex('#a89a7c') : q < 0.1 ? hex('#b0a282') : q > 0.95 ? hex('#e0d4b4') : hex('#c8bc9c'); continue; }
    const q = h(x, y, 823); B[i] = q < 0.12 ? hex('#5e5040') : q > 0.92 ? hex('#8a7a62') : hex('#6e604c'); }
  for (const [cx, cy, rx, ry] of [[40, 170, 22, 3], [196, 174, 30, 3], [290, 166, 18, 2]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1) B[y * 320 + x] = (x + y) % 9 === 0 ? hex('#c8dce8') : hex('#7a94a8');
  // la casa de la izquierda, ya subida: el relleno nuevo debajo y la escalera nueva
  { const s = { x: -20, w: 70, pisos: 2, col: [hex('#9cc0d8'), C.victA, C.victAS], tej: [d_P.pizarraL, d_P.pizarra, d_P.pizarraS], techo: 'cuatro', galeria: 2, chim: 50, pers: d_P.persiana, persS: d_P.persianaS, sem: 11, base: N };
    const inf = d_casaV(R, s, () => false, luces); }
  // la casa de la derecha, esperando a su altura de siempre, con gente sentada en el porche
  const der = d_casaV(R, { x: 240, w: 62, pisos: 2, col: [hex('#e08068'), C.victR, C.victRS], tej: [d_P.tablillaL, d_P.tablilla, d_P.tablillaS], techo: 'hastial', galeria: 1, chim: 44, pers: hex('#3a4a3a'), persS: hex('#262e26'), sem: 12, escamas: [hex('#f0d890'), hex('#e0c070'), hex('#b0904c')], base: V }, () => false, luces);
  // la tubería de la draga sobre caballetes, que entra por la derecha y acaba en la boca, encima del hueco
  { const yT = 140; for (const cx of [252, 290]) { linea(cx - 6, 159, cx, yT + 3, d_P.poste); linea(cx + 6, 159, cx, yT + 3, d_P.poste); linea(cx - 4, 152, cx + 4, 152, d_P.posteS); rect(cx - 7, yT + 3, cx + 7, yT + 4, d_P.posteL); }
    for (let x = 234; x < 320; x++) { rect(x, yT - 2, x, yT + 2, (x % 20) < 2 ? d_P.hierroS : d_P.hierro); pset(x, yT - 1, d_P.hierroL); pset(x, yT + 2, d_P.hierroS); if (x % 20 === 0) { rect(x, yT - 3, x + 1, yT + 3, d_P.hierroS); pset(x, yT - 3, d_P.hierroL); } }
    rect(230, yT - 3, 234, yT + 3, d_P.hierroS); rect(231, yT - 2, 233, yT + 2, d_P.hierro); pset(231, yT - 2, d_P.hierroL); }
  // la pasarela de tablones sobre pilotes, delante
  { const y0 = 160; for (let x = 0; x < 320; x++) { const k = Math.floor(x / 9); rect(x, y0, x, y0 + 3, x % 9 === 0 ? d_P.tablaS : h(k, 1, 824) < 0.3 ? d_P.tablaL : d_P.tabla); pset(x, y0, d_P.tablaL); pset(x, y0 + 3, d_P.posteS); }
    for (let x = 6; x < 320; x += 22) { rect(x, y0 + 4, x + 1, 180, d_P.poste); rect(x + 1, y0 + 4, x + 1, 180, d_P.posteS); linea(x + 1, y0 + 5, x + 12, 179, d_P.posteS); } }
  mascara();
  if (cielo !== 'claro') d_nublado(R, foto, cielo, 120);
  if (nn) d_anochecer(R, foto, luces, 120);
  return { der };
}

// la casa del centro, pintada una vez en su propio búfer (transparente donde no hay casa) para subirla con o.sube
const d_casaSube = new Map();

function d_casaCentro(R) {
  let b = d_casaSube.get('c'); if (b) return b;
  b = R.nuevo(); const prev = R.usar(b);
  const info = d_casaV(R, { x: d_CS.casa.x, w: d_CS.casa.w, pisos: 2, col: [hex('#f6eed8'), C.victC, C.victCS], tej: [d_P.tejaVL, d_P.tejaV, d_P.tejaVS], techo: 'hastial', galeria: 2, chim: null, pers: d_P.persianaR, persS: d_P.persianaRS, sem: 13, escamas: [hex('#a8cc96'), C.victV, C.victVS], base: d_CS.viejo }, () => false, new Set());
  R.usar(prev); b.info = info; d_casaSube.set('c', b); return b;
}

// ══ las casas subidas (cada fotograma) ══
// o.sube 0–1 (la casa del centro sube 30 px, unos diez pies); o.arena 0–1 (el relleno sube hasta la altura nueva);
// o.escalera (por defecto, con o.sube = 1): la escalera nueva del porche al relleno
function d_galCasas(R, t, S) {
  const { o, noche, cielo, viento, tn } = S, nn = noche >= 0.5 ? 1 : 0, B = R.buf, V = d_CS.viejo, N = d_CS.nuevo;
  const sube = d_lim(o.sube ?? 0.5), arena = d_lim(o.arena ?? 0.4), dy = Math.round(sube * d_CS.sube), yA = Math.round(lerp(V, N, arena));
  const capa = d_fondo(R, 'casas|' + cielo, noche, (n, mc, mk) => d_casasFijo(R, cielo, n, mc, mk)), m = capa.m;
  d_nubesGal(R, t, m, 120, cielo, nn, viento);
  if (cielo !== 'tormenta') for (let k = 0; k < 3; k++) { const x = Math.round(((k * 113 + t * (8 + k * 3)) % 380) - 30), y = 26 + k * 11 + Math.round(Math.sin(t * 0.8 + k) * 3); if (m[y * 320 + x] && !(x > 268 && y < 50)) R.gaviota(x, y, t, k); }
  // el relleno delante de las casas: arena húmeda con regueros y charcos que brillan, del nivel de ahora (yA) hasta la
  // pasarela; con o.arena = 0 es el barro de siempre. Se pinta antes que la casa y los gatos, que quedan encima
  { const tope = Math.min(yA, V); for (let y = tope; y < 160; y++) for (let x = 74; x < 240; x++) { if (x < 76 + (y - N) * 0.5) continue; const i = y * 320 + x, q = h(x, y, 825), ag = Math.sin(x * 0.2 + y * 0.9 - t * 3) > 0.9;
      B[i] = arena > 0 ? tn(y === tope ? hex('#a8b8c4') : ag ? hex('#8aa0b0') : q < 0.12 ? hex('#a89a7c') : q > 0.94 ? hex('#ddd0b0') : hex('#c4b896')) : tn(q < 0.12 ? hex('#5e5040') : q > 0.92 ? hex('#8a7a62') : hex('#6e604c')); }
    if (arena > 0) { for (let x = 240; x < 244; x++) R.rect(x, tope - 2, x, 159, tn(x === 240 ? d_P.tablaL : d_P.tablaS)); for (let y = tope; y < 159; y += 4) R.rect(240, y, 243, y, tn(d_P.posteS)); } }
  // la casa del centro, a su altura de ahora
  const cb = d_casaCentro(R), x0 = d_CS.casa.x - 8, x1 = d_CS.casa.x + d_CS.casa.w + 8;
  for (let y = 20; y <= V + 3; y++) { const yy = y - dy; if (yy < 0 || yy > 179) continue; const f = y * 320, g = yy * 320; for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const c = cb[f + x]; if (c) B[g + x] = tn(c); } }
  // las pilas de vigas cruzadas bajo los durmientes y los gatos de tornillo, con los obreros que los hacen girar
  const baseCasa = V - dy;
  if (dy > 1) for (const [cx, k] of [[d_CS.casa.x + 6, 0], [d_CS.casa.x + 24, 1], [d_CS.casa.x + 40, 2], [d_CS.casa.x + d_CS.casa.w - 8, 3]]) {
    const suelo = Math.min(V, yA), alto = Math.max(0, suelo - baseCasa - 8); for (let j = 0; j < alto; j += 3) { const larga = (j / 3) % 2 === 0, ancho = larga ? 7 : 4; R.rect(cx - ancho, suelo - j - 2, cx + ancho, suelo - j, tn(larga ? hex('#8a6a42') : hex('#6a4e30'))); R.rect(cx - ancho, suelo - j - 2, cx + ancho, suelo - j - 2, tn(hex('#a8844e'))); if (!larga) for (const ex of [cx - 3, cx + 2]) R.rect(ex, suelo - j - 1, ex + 1, suelo - j, tn(hex('#b8945e'))); }
    const yg = suelo - alto; R.rect(cx - 3, yg - 7, cx + 3, yg - 1, tn(d_P.hierro)); R.rect(cx - 2, yg - 7, cx - 2, yg - 1, tn(d_P.hierroL)); R.rect(cx - 4, yg - 1, cx + 4, yg, tn(d_P.hierroS)); R.rect(cx - 1, baseCasa + 1, cx + 1, yg - 8, tn(d_P.hierroS)); for (let y = baseCasa + 2; y < yg - 8; y += 2) R.pset(cx, y, tn(d_P.hierroL)); R.rect(cx - 5, baseCasa, cx + 5, baseCasa + 1, tn(hex('#5a4026')));
    const a = t * 2.4 + k * 1.6, bl = Math.round(Math.cos(a) * 7); R.linea(cx - bl, yg - 4 + Math.round(Math.sin(a) * 1.5), cx + bl, yg - 4 - Math.round(Math.sin(a) * 1.5), tn(d_P.hierroS));
    d_obrero(R, cx + (k % 2 ? 9 : -10), suelo, t, k, k % 2 ? -1 : 1, tn, true); }
  else for (const cx of [d_CS.casa.x + 6, d_CS.casa.x + 40]) { R.rect(cx - 2, V - 6, cx + 2, V - 1, tn(d_P.hierro)); }
  // la boca de la tubería escupe arena con agua: el chorro en arco, las salpicaduras y el reguero que se extiende
  { const bx = 229, by = 140, pulso = 0.85 + Math.sin(t * 5) * 0.15, cae = Math.min(158, Math.max(yA + 4, 146)), L = 10 + pulso * 6, col = [hex('#c8b890'), hex('#a8b8c0'), hex('#e0d4b4'), hex('#8a9aa4')];
    for (let i = 0; i <= 24; i++) { const u = i / 24, x = Math.round(bx - u * L), y = Math.round(by + u * u * (cae - by)), w = 2 + Math.round(u * 3); for (let j = -w; j <= w; j++) { const q = h(x + j, Math.floor(t * 12) + i, 826); R.pset(x + j * (u > 0.5 ? 1 : 0) + (u > 0.5 ? 0 : 0), y + (u > 0.5 ? 0 : j >> 1), tn(q < 0.45 ? col[0] : q < 0.7 ? col[2] : q < 0.9 ? col[1] : C.blanco)); } }
    for (let k = 0; k < 14; k++) { const a = h(k, Math.floor(t * 8), 827) * Math.PI, r = 2 + h(k, 3, 827) * 8, x = Math.round(bx - L + Math.cos(a) * r), y = Math.round(cae - Math.sin(a) * r * 0.7); R.pset(x, y, tn(k % 2 ? hex('#f0ece0') : hex('#a8b8c0'))); }
    for (let k = 0; k < 7; k++) { const u = ((t * 0.5 + k / 7) % 1), x = Math.round(bx - L - u * 70), y = cae + 1 + (k % 3); R.rect(x, y, x + 4, y, tn(hex('#e0e8ec'))); R.pset(x + 5, y, tn(hex('#a8b8c0'))); } }
  // la escalera nueva del porche al relleno (cuando la casa ya está arriba)
  const P = d_galvestonPorche({ sube, arena });
  if ((o.escalera ?? sube >= 0.999) && P.y < yA - 3) { const [ax, ay] = P.escalera.arriba, [bx2, by2] = P.escalera.abajo, n = Math.max(3, Math.round((by2 - ay) / 3));
    for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(lerp(ax, bx2, u)), y = Math.round(lerp(ay, by2, u)); R.rect(x - 2, y, x + 8, y, tn(d_P.tablaL)); R.rect(x - 2, y + 1, x + 8, y + 1, tn(d_P.tablaS)); }
    for (const d of [-3, 9]) { R.linea(ax + d, ay - 6, bx2 + d, by2 - 6, tn(d_P.moldura)); R.linea(ax + d, ay + 1, bx2 + d, by2, tn(d_P.molduraS)); R.linea(bx2 + d, by2 - 6, bx2 + d, by2, tn(d_P.moldura)); } }
  // la vida: los vecinos del porche de la derecha, gente en la pasarela, un obrero con su carretilla y el capataz
  { const g = capa.info.der.galerias[0]; if (g && !nn) { for (const [px, k] of [[g[0] + 8, 0], [g[0] + 20, 1]]) { const y = g[2]; R.rect(px, y - 6, px + 2, y - 1, tn(k ? hex('#c86a7a') : hex('#3a3a4a'))); R.rect(px, y - 8, px + 1, y - 7, tn(d_P.piel)); R.rect(px - 1, y - 9, px + 2, y - 9, tn(k ? hex('#f0e0c8') : hex('#2a2a30'))); if (Math.sin(t * 2 + k) > 0.6) R.pset(px + 3, y - 5, tn(d_P.piel)); } } }
  for (let k = 0; k < 3; k++) { const dir = k % 2 ? -1 : 1, v = 5 + k * 2, x = dir > 0 ? ((t * v + k * 97) % 380) - 30 : 350 - ((t * v + k * 61) % 380); d_paseante(R, x, 159, t, [1, 5, 2][k], dir, true, tn); }
  { const u = (t * 0.07) % 1, x = Math.round(lerp(20, 70, Math.abs(u * 2 - 1))), dir = u < 0.5 ? 1 : -1; d_obrero(R, x, N, t, 1, dir, tn, false); R.rect(x + dir * 3, N - 4, x + dir * 8, N - 2, tn(hex('#5a5a62'))); R.disco(x + dir * 9, N - 2, 1.6, tn(C.k)); R.rect(x + dir * 4, N - 5, x + dir * 7, N - 5, tn(hex('#c8bc9c'))); }
  { const fx = 196, fy = Math.max(yA, 124); if (fy < V) { d_obrero(R, fx, fy, t, 3, -1, tn, false); if (Math.sin(t * 1.5) > 0) R.linea(fx - 1, fy - 8, fx - 5, fy - 11, tn(d_P.piel)); } }
  if (cielo === 'tormenta') { const prev = R.delante; R.delante = () => { if (prev) prev(); d_lluvia(R, t, 100, viento); }; }
}

// el satélite TIROS-1 de 1960 visto un poco desde arriba: el tambor de dieciocho caras cubierto de células solares
// azules en filas (las caras pasan al girar, en tres tonos según les da el sol, y la que lo refleja destella), los aros de
// metal de arriba y de abajo, la tapa con sus anillos de células y los radios que giran, el cubo central con la antena de
// arriba y las cuatro varillas de abajo que giran con él (las de detrás, detrás del tambor). x, y: el centro del tambor;
// s: la escala (1: unos 13 px de ancho; 3: plano medio, unos 40 px); o.flash (0–1): el destello de la cámara de abajo,
// con su estrella de cuatro puntas y un anillo que se abre
export function e_tiros(R, x, y, t, s = 1, o = {}) {
  const { pset, linea } = R, hw = 6.5 * s, hh = 3.4 * s, e = 2.3 * s, giro = t * 1.25 + (o.fase ?? 0), TAU = Math.PI * 2, paso = TAU / 18;
  const yT = y - hh, yB = y + hh, luzA = -0.95, oscuro = e_C.contorno;
  const varillas = (frente) => {
    for (let k = 0; k < 4; k++) { const a = giro + k * Math.PI / 2 + 0.4, sa = Math.sin(a), ca = Math.cos(a); if ((ca > 0) !== frente) continue;
      const bx = x + sa * hw * 0.92, by = yB + ca * e * 0.92, L = 7 * s, tx = bx + sa * L * 0.8, ty = by + ca * L * 0.35 + L * 0.75;
      linea(bx, by, tx, ty, frente ? e_C.metalA : e_C.metalB); if (s >= 2) linea(bx + 1, by, tx + 1, ty, e_C.metalC); pset(Math.round(tx), Math.round(ty), e_C.metalA); }
  };
  varillas(false);
  // el costado: columna a columna, cada una en su cara
  const x0 = Math.round(x - hw), x1 = Math.round(x + hw);
  for (let X = x0; X <= x1; X++) {
    const uu = Math.max(-1, Math.min(1, (X + 0.5 - x) / hw)), a = Math.asin(uu), sq = Math.sqrt(1 - uu * uu);
    const f = Math.floor((((a - giro) % TAU) + TAU) % TAU / paso), fb = Math.floor((((Math.asin(Math.max(-1, Math.min(1, (X + 1.5 - x) / hw))) - giro) % TAU) + TAU) % TAU / paso);
    const ac = (f + 0.5) * paso + giro, lum = Math.cos(ac - luzA) * 0.7 + 0.3 * sq, brillo = Math.abs(Math.atan2(Math.sin(ac - luzA / 2), Math.cos(ac - luzA / 2))) < 0.11;
    const lv = Math.max(0, Math.min(4, Math.round(1.3 + lum * 2.4)));
    const ya = Math.round(yT + sq * e), yb = Math.round(yB + sq * e);
    const borde = f !== fb;
    for (let Y = ya; Y <= yb; Y++) {
      let c = e_C.celdas[lv];
      if ((Y - ya) % Math.max(2, Math.round(1.6 * s)) === 0) c = e_C.celdas[Math.max(0, lv - 2)];   // las filas de células
      if (s >= 2 && ((ac - giro + 100 * paso) % paso) > paso * 0.45 && ((ac - giro + 100 * paso) % paso) < paso * 0.55) c = e_C.celdas[Math.max(0, lv - 1)];
      if (brillo && (Y + X) % 3 !== 0) c = Y % 2 ? e_C.destello : e_C.celdas[4];
      if (borde) c = oscuro;
      pset(X, Y, c);
    }
    // los aros de metal de arriba y de abajo (y uno en medio en plano medio)
    const met = lum > 0.55 ? e_C.metalA : lum > 0.1 ? e_C.metalB : e_C.metalC;
    pset(X, ya, met); pset(X, yb, met); if (s >= 2) { pset(X, ya + 1, met); pset(X, yb - 1, met); pset(X, Math.round((ya + yb) / 2), e_C.metalC); }
    pset(X, yb + 1, oscuro);
  }
  // la tapa: una elipse con anillos de células, los radios que giran y el cubo de metal en medio
  for (let j = -Math.ceil(e); j <= Math.ceil(e); j++) for (let i = -Math.ceil(hw); i <= Math.ceil(hw); i++) {
    const q = (i / hw) ** 2 + (j / e) ** 2; if (q > 1) continue;
    const rr = Math.sqrt(q), ang = Math.atan2(j / e, i / hw), rad = ((ang - giro) % (TAU / 9) + TAU) % (TAU / 9) < 0.09;
    let c = rr > 0.9 ? e_C.metalA : rr < 0.28 ? (rr < 0.16 ? e_C.metalA : e_C.metalB) : (Math.round(rr * 4 * s) % 2 ? e_C.celdas[3] : e_C.celdas[2]);
    if (rad && rr >= 0.28 && rr <= 0.9) c = e_C.celdas[1];
    if (i < -hw * 0.3 && j < 0 && rr > 0.3 && rr < 0.9 && (i + j) % 3 === 0) c = e_C.celdas[4];   // la luz del sol en la tapa
    pset(Math.round(x + i), Math.round(yT + j), c);
  }
  // el contorno de arriba y la antena del centro, con su bolita
  for (let i = -Math.ceil(hw); i <= Math.ceil(hw); i++) { const q = 1 - (i / hw) ** 2; if (q < 0) continue; pset(Math.round(x + i), Math.round(yT - Math.sqrt(q) * e) - 1, oscuro); }
  pset(x0 - 1, Math.round(yT), oscuro); pset(x1 + 1, Math.round(yT), oscuro); for (let Y = Math.round(yT); Y <= Math.round(yB); Y++) { pset(x0 - 1, Y, oscuro); pset(x1 + 1, Y, oscuro); }
  const ta = Math.round(yT - 5.5 * s);
  linea(x, Math.round(yT) - 1, x, ta, e_C.metalA); if (s >= 2) linea(x + 1, Math.round(yT) - 1, x + 1, ta, e_C.metalC); pset(x, ta - 1, e_C.metalA); if (s >= 2) { pset(x - 1, ta - 1, e_C.metalB); pset(x, ta - 2, e_C.destello); }
  varillas(true);
  // el destello de la cámara
  const fl = o.flash ?? 0;
  if (fl > 0 && fl < 1) {
    const cx = Math.round(x + Math.sin(giro * 0.2) * hw * 0.2), cy = Math.round(yB + e + 1), k = Math.sin(Math.min(1, fl * 4) * Math.PI / 2) * (1 - fl), L = Math.round((5 + 9 * s) * k);
    for (let i = -L; i <= L; i++) { const w = 1 - Math.abs(i) / (L + 1); if (w > 0.15) { pset(cx + i, cy, e_C.flash); pset(cx, cy + i, e_C.flash); } if (s >= 2 && Math.abs(i) < L * 0.6) { pset(cx + i, cy + Math.round(i * 0.5), e_C.destello); pset(cx + i, cy - Math.round(i * 0.5), e_C.destello); } }
    if (k > 0.2) R.disco(cx, cy, Math.max(1, Math.round(2 * s * k)), e_C.flash);
    const ra = 3 + fl * (22 + 18 * s);
    for (let a = 0; a < TAU; a += 1 / ra) if (Math.sin(a * 9 + t * 4) > -0.3 && fl < 0.85) pset(Math.round(cx + Math.cos(a) * ra), Math.round(cy + Math.sin(a) * ra * 0.7), fl < 0.4 ? e_C.flash : e_C.destello);
  }
}

// el fondo del espacio (fijo, en un búfer): el negro azulado tramado, la Vía Láctea en diagonal (resplandor tramado,
// polvo oscuro y estrellitas apretadas), una nebulosa tenue, las estrellas quietas y, en 'globo', la Luna con sus mares
// y cráteres; luego, encima, las estrellas que titilan, la segunda etapa del cohete que da vueltas y la estrella fugaz
function e_espacio(R, t, cerca) {
  e_fijo(R, cerca ? 'orbita-cerca' : 'orbita-globo', () => {
    const B = R.buf;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      let v = cerca ? (y / 130) * 2.2 : 0.4 + (y / 180) * 1.2;
      // la Vía Láctea: una banda en diagonal por abajo a la derecha (en 'cerca', arriba a la izquierda)
      const d = cerca ? (x * 0.42 + y - 40) / 1.09 : (x * -0.8 + y + 6) / 1.28, banda = Math.exp(-((d / (cerca ? 16 : 20)) ** 2));
      const n = e_vruido(x * 0.09, y * 0.09) * 0.6 + e_vruido(x * 0.23 + 9, y * 0.23) * 0.4, polvo = e_vruido(x * 0.06 + 30, y * 0.14) > 0.62 && banda > 0.3;
      v += banda * (0.6 + n * 1.6) * (polvo ? 0.35 : 1);
      if (!cerca) v += 2.2 * Math.exp(-((x / 20) ** 2) - (((y - 84) / 46) ** 2));   // el resplandor del sol, que queda a la izquierda
      if (x > 270 && y < 50) v *= 0.6;   // la esquina de Atom, tranquila
      let l = Math.floor(v); if (v - l > e_BAYER[((y & 3) << 2) | (x & 3)]) l++;
      B[y * 320 + x] = e_C.espacio[Math.max(0, Math.min(e_C.espacio.length - 1, l))];
      // la nebulosa: jirones violetas y rosados abajo a la izquierda, más densos en el centro
      if (!cerca) { const dn = Math.hypot(x - 24, (y - 148) * 1.3), nd = (e_vruido(x * 0.13 + 5, y * 0.13) * 0.65 + e_vruido(x * 0.34, y * 0.34 + 7) * 0.35) * Math.max(0, 1 - dn / 34) * 1.6;
        const bb = e_BAYER[((y & 3) << 2) | (x & 3)]; if (nd > 0.34 + bb * 0.22) B[y * 320 + x] = nd > 0.85 ? e_C.nebulosa[2] : nd > 0.58 ? e_C.nebulosa[1] : e_C.nebulosa[0]; }
      if (banda > 0.25 && h(x, y, 410) < 0.07 * banda && !polvo) B[y * 320 + x] = h(x, y, 411) < 0.5 ? e_C.estrellaB : e_C.estrellaA;
    }
    for (let k = 0; k < 260; k++) { const x = Math.floor(h(k, 1, 412) * 320), y = Math.floor(h(k, 2, 412) * 180); if (x > 270 && y < 50 && k % 3) continue; B[y * 320 + x] = h(k, 3, 412) < 0.7 ? e_C.estrellaB : e_C.estrellaA; }
    // la Luna: gris con sus mares, cráteres con el borde claro, iluminada por la izquierda y con el lado derecho en sombra
    const [lx, ly, lr] = cerca ? [236, 46, 7] : [248, 58, 10];
    for (let j = -lr - 1; j <= lr + 1; j++) for (let i = -lr - 1; i <= lr + 1; i++) {
      const d = Math.hypot(i, j); if (d > lr + 0.5) continue; const X = lx + i, Y = ly + j;
      const lum = (-i * 0.75 - j * 0.35 + Math.sqrt(Math.max(0, lr * lr - d * d)) * 0.55) / lr, mar = e_vruido(i * 0.45 + 50, j * 0.45 + 20) > 0.58;
      let c = lum > 0.62 ? e_C.luna[3] : lum > 0.3 ? e_C.luna[2] : lum > 0.02 ? e_C.luna[1] : e_C.luna[0];
      if (mar && lum > 0.02) c = lum > 0.5 ? e_C.luna[2] : e_C.luna[1];
      if (lum > 0.02 && lum < 0.12 && ((X + Y) & 1)) c = e_C.luna[0];
      B[Y * 320 + X] = c;
    }
    for (const [i, j, r] of cerca ? [[-2, -2, 1], [2, 2, 1]] : [[-4, -3, 2], [1, 4, 1], [-1, -6, 1], [4, -2, 1], [-6, 3, 1]]) {
      R.anillo(lx + i, ly + j, r, e_C.luna[1]); R.pset(lx + i - 1, ly + j - r, e_C.luna[3]); R.pset(lx + i + r, ly + j, e_C.luna[1]); }
    // el halo de la Luna
    for (let j = -lr - 4; j <= lr + 4; j++) for (let i = -lr - 4; i <= lr + 4; i++) { const d = Math.hypot(i, j); if (d > lr + 0.5 && d < lr + 4 && e_BAYER[(((ly + j) & 3) << 2) | ((lx + i) & 3)] < (lr + 4 - d) / 10) B[(ly + j) * 320 + lx + i] = e_C.espacio[3]; }
  });
  // las estrellas que titilan (algunas con su cruz)
  for (let k = 0; k < 70; k++) {
    const x = Math.floor(h(k, 7, 413) * 320), y = Math.floor(h(k, 8, 413) * (cerca ? 110 : 180)); if (x > 270 && y < 50) continue;
    const tw = Math.sin(t * (1.2 + h(k, 9, 413) * 2.5) + k * 2.1); if (tw < -0.2) continue;
    R.pset(x, y, tw > 0.6 ? C.blanco : e_C.estrellaA);
    if (k % 9 === 0 && tw > 0.75) { R.pset(x - 1, y, e_C.estrellaB); R.pset(x + 1, y, e_C.estrellaB); R.pset(x, y - 1, e_C.estrellaB); R.pset(x, y + 1, e_C.estrellaB); }
  }
  // otro satélite, lejos: un punto que brilla al cruzar despacio
  { const u = ((t + 4) % 26) / 26, x = Math.round(cerca ? 40 + u * 180 : 214 + u * 100), y = Math.round(cerca ? 18 + u * 30 : 96 + u * 34); if (!(x > 270 && y < 50)) { R.pset(x, y, Math.sin(t * 2.3) > 0.2 ? C.blanco : e_C.estrellaA); if (Math.sin(t * 2.3) > 0.85) { R.pset(x - 1, y, e_C.estrellaB); R.pset(x + 1, y, e_C.estrellaB); } } }
  if (cerca) return;
  // la segunda etapa del cohete Thor-Able, que se aleja dando vueltas: un cilindro con su tobera y un brillo al girar
  { const d = (t * 1.4) % 150, x = 304 - d, y = 150 + d * 0.16, a = t * 0.8, ca = Math.cos(a), sa = Math.sin(a);
    if (x > 206) for (let i = -4; i <= 4; i++) { const px = Math.round(x + ca * i), py = Math.round(y + sa * i * 0.6);
      R.pset(px, py, i > 2 ? e_C.metalC : sa > 0 ? e_C.metalA : e_C.metalB); R.pset(px, py + 1, i > 2 ? e_C.contorno : e_C.metalC); }
    if (Math.abs(ca) > 0.97 && x > 206) R.pset(Math.round(x), Math.round(y) - 1, C.blanco); }
}

// la línea punteada de la órbita del satélite en 'globo': la mitad de delante (por encima del planeta) o la de detrás
// (solo se ve fuera del disco, el planeta la tapa); los puntos avanzan despacio en el sentido de la marcha
function e_orbitaLinea(R, G, t, frente) {
  const c = Math.cos(-0.32), s = Math.sin(-0.32);
  for (let k = 0; k < 220; k++) { const f = k / 220 * Math.PI * 2 - t * 0.05, sf = Math.sin(f); if ((sf > 0) !== frente || (k + Math.floor(t * 4)) % 4) continue;
    const px = 95 * Math.cos(f), py = 30 * sf, x = Math.round(G.cx + px * c - py * s), y = Math.round(G.cy + px * s + py * c);
    if (!frente && Math.hypot(x - G.cx, y - G.cy) < G.r + 2) continue;
    R.pset(x, y, frente ? e_C.orbita : e_C.orbitaS); }
}

// proyección ortográfica del planeta G: (lat, lon) → [x, y, visible]
function e_proyecta(G, lat, lon) {
  const D = Math.PI / 180, f = lat * D, l = (lon - G.lon0) * D, f0 = G.lat0 * D;
  const x = Math.cos(f) * Math.sin(l), y = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l), z = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l);
  return [Math.round(G.cx + G.r * x), Math.round(G.cy - G.r * y), z > 0.02];
}

// la tabla de cada encuadre del planeta (se calcula una vez): por cada píxel del disco y de su halo, la normal y su
// latitud y longitud relativa
const e_TABLAS = new Map();

function e_tabla(G) {
  const clave = [G.cx, G.cy, G.r, G.lat0.toFixed(2), G.halo].join(',');
  let T = e_TABLAS.get(clave); if (T) return T;
  if (e_TABLAS.size > 6) e_TABLAS.clear();   // o.lat y o.mira van fijos en cada plano: si cambian, no se acumulan tablas
  const D = 180 / Math.PI, s0 = Math.sin(G.lat0 / D), c0 = Math.cos(G.lat0 / D), ra = G.r + G.halo, L = [];
  for (let y = Math.max(0, Math.floor(G.cy - ra)); y <= Math.min(179, Math.ceil(G.cy + ra)); y++) for (let x = Math.max(0, Math.floor(G.cx - ra)); x <= Math.min(319, Math.ceil(G.cx + ra)); x++) {
    const nx = (x + 0.5 - G.cx) / G.r, ny = (G.cy - y - 0.5) / G.r, d = Math.hypot(nx, ny); if (d > ra / G.r) continue;
    const nz = d < 1 ? Math.sqrt(1 - d * d) : 0;
    L.push(y * 320 + x, nx, ny, nz, d, d < 1 ? Math.asin(Math.max(-1, Math.min(1, nz * s0 + ny * c0))) * D : 0, d < 1 ? Math.atan2(nx, nz * c0 - ny * s0) * D : 0);
  }
  T = { n: L.length / 7, v: Float64Array.from(L) }; e_TABLAS.set(clave, T); return T;
}

// la tierra a 0,25° (lon −179…52, lat −60…84), rasterizada una vez desde las costas: 0 mar, 1 plataforma (mar poco
// hondo junto a la costa), 2 tierra. El golfo de México y Florida salen del contorno detallado de EE. UU.
let e_MAPA = null;

function e_mapa() {
  if (e_MAPA) return e_MAPA;
  const W = 924, H = 576, M = new Uint8Array(W * H);
  const llena = (P, v) => { const n = P.length / 2;
    for (let j = 0; j < H; j++) { const lat = 84 - (j + 0.5) / 4, xs = [];
      for (let i = 0; i < n; i++) { const k = (i + 1) % n, y0 = P[2 * i + 1], y1 = P[2 * k + 1]; if ((y0 <= lat) !== (y1 <= lat)) xs.push(P[2 * i] + (lat - y0) / (y1 - y0) * (P[2 * k] - P[2 * i])); }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) { const a = Math.max(0, Math.ceil((xs[k] + 179) * 4 - 0.5)), b = Math.min(W - 1, Math.floor((xs[k + 1] + 179) * 4 - 0.5)); for (let i = a; i <= b; i++) M[j * W + i] = v; } } };
  for (const P of e_TIERRA) llena(P, 2);
  // el golfo: se borra la caja y se rellena con el contorno detallado
  for (let j = Math.floor((84 - 31) * 4); j < Math.ceil((84 - 24.4) * 4); j++) for (let i = Math.floor((-97.3 + 179) * 4); i < Math.ceil((-79.6 + 179) * 4); i++) M[j * W + i] = 0;
  llena(e_GOLFO, 2);
  // la plataforma: el mar a menos de 3 celdas de la costa (dos pasadas de ventana corrida, en horizontal y en vertical)
  const Hz = new Uint8Array(W * H), S = M.slice();
  for (let j = 0; j < H; j++) { let n = 0; for (let i = -3; i < W + 3; i++) { if (i + 3 < W && M[j * W + i + 3] === 2) n++; if (i - 4 >= 0 && M[j * W + i - 4] === 2) n--; if (i >= 0 && i < W && n > 0) Hz[j * W + i] = 1; } }
  for (let i = 0; i < W; i++) { let n = 0; for (let j = -3; j < H + 3; j++) { if (j + 3 < H && Hz[(j + 3) * W + i]) n++; if (j - 4 >= 0 && Hz[(j - 4) * W + i]) n--; if (j >= 0 && j < H && n > 0 && !M[j * W + i]) S[j * W + i] = 1; } }
  e_MAPA = S; return S;
}

// lo que hay en (lat, lon) según el mapa rasterizado: 0 mar, 1 plataforma, 2 tierra (fuera del recorte, mar)
const e_suelo = (lat, lon) => { if (lat >= 84 || lat < -60 || lon < -179 || lon >= 52) return 0; return e_mapa()[Math.floor((84 - lat) * 4) * 924 + Math.floor((lon + 179) * 4)]; };

// el bioma de cada sitio (para el color de la tierra): n es ruido de 0 a 1 para mezclar los bordes
function e_bioma(lat, lon, n) {
  lon += (n - 0.5) * 7; lat += (n - 0.5) * 3.5;   // los bordes entre biomas, ondulados
  const a = Math.abs(lat);
  if (lat > 59 && lon > -58 && lon < -16) return 'hielo';
  if (a > 70) return n < 0.5 ? 'hielo' : 'tundra';
  if (a > 58) return n < 0.45 ? 'tundra' : 'boreal';
  if (lon > -18) { if (lat > 46) return 'templado'; if (lat > 16 + n * 3 && lat < 34) return 'desierto'; if (lat > 9 + n * 3) return 'sabana'; if (lat > -12) return 'selva'; return n < 0.5 ? 'sabana' : 'desierto'; }
  if (lat > 48) return lon < -110 && n < 0.5 ? 'monte' : 'boreal';
  if (lon < -104 && lat > 31) return n < 0.45 ? 'monte' : lat > 40 ? 'boreal' : 'desierto';
  if (lon > -118 && lon < -100 && lat > 22 && lat <= 31) return n < 0.6 ? 'desierto' : 'sabana';
  if (lon > -104 && lon < -96 && lat > 30) return 'pradera';
  if (lat > 17 && lat < 23 && lon < -97) return 'sabana';
  if (lat < 6 && lat > -46 && lon < -68 + (lat < -20 ? 2 : 0)) return lat < -16 && lat > -30 && n < 0.6 ? 'desierto' : 'monte';
  if (lat < -38) return 'sabana';
  if (a < 13) return 'selva';
  if (lat < 0) return n < 0.55 ? 'sabana' : 'templado';
  return lat > 36 ? 'templado' : 'verde';
}

// el planeta, píxel a píxel (una pasada por el disco): el suelo con su relieve o el mar con su luz, las nubes de tres
// tonos (las finas dejan ver el suelo) con su sombra, las tormentas (remolino y espiral), los relámpagos, la noche con
// sus ciudades, la franja del ecuador de o.giro, el brillo del sol en el agua, la bruma del borde y el halo de la
// atmósfera (fino, con un filo claro del lado del sol)
function e_globo(R, t, G, o) {
  const B = R.buf, T = e_tabla(G), V = T.v, cerca = G.cerca, D2R = Math.PI / 180;
  const L0 = cerca ? [-0.7, 0.62, 0.36] : [-0.5, 0.36, 0.79], Ln = Math.hypot(...L0), L = L0.map((v) => v / Ln);
  const Hm = Math.hypot(L[0], L[1], L[2] + 1), H = [L[0] / Hm, L[1] / Hm, (L[2] + 1) / Hm], hz = (cerca ? 7 : 4) / G.r;
  const rem = o.remolino ?? 0, [rlat, rlon] = o.remolinoEn ?? [12, -32];
  const gi = o.giro ?? 0, esp = Math.max(o.espiral ?? 0, gi > 0.6 ? (gi - 0.6) / 0.4 : 0), [elat, elon] = o.espiralEn ?? (gi > 0 && !o.espiral ? [28, -50] : [24, -71]);
  const cosE = Math.cos(elat * D2R), cosR = Math.cos(rlat * D2R);
  // la densidad de nubes en (lat, lon): ruido que viaja con los vientos (al oeste en el trópico, al este más al norte),
  // racimos de tormentas en la franja del ecuador, cielos más limpios en los subtrópicos, cirros alargados y nubes de
  // borrasca en las latitudes medias, y el frente frío que sale de la costa este
  const nubes = (lat, lon, oct) => {
    const a = Math.abs(lat), dr = a < 20 ? -0.55 : a > 34 ? 0.7 : -0.55 + (a - 20) / 14 * 1.25, u = lon - dr * t, v = lat;
    let f = e_vruido(u * 0.12 + 3, v * 0.17) * 0.5 + e_vruido(u * 0.27 + 17, v * 0.34 + t * 0.03) * 0.26;
    if (oct > 2) f += e_vruido(u * 0.6 + 41, v * 0.7) * 0.15 + e_vruido(u * 1.25 + 7, v * 1.4 - t * 0.05) * (cerca ? 0.1 : 0.06) + (cerca ? 0 : 0.02);
    else f += 0.12;
    if (oct > 4) f += (e_vruido(u * 2.6 + 5, v * 2.9) - 0.5) * 0.14;
    const itcz = 0.13 * Math.exp(-(((lat - 7) / 4) ** 2)) * (e_vruido(u * 0.3 + 60, 2.5) * 1.6 - 0.2);
    const cirro = a > 30 ? (e_vruido(u * 0.07 + 80, v * 0.7) - 0.62) * 0.35 * Math.min(1, (a - 30) / 8) : 0;
    const cov = itcz - 0.1 * Math.exp(-(((a - 24) / 7) ** 2)) + 0.06 * Math.exp(-(((a - 52) / 9) ** 2)) + Math.max(0, cirro);
    const lf = lon - 0.7 * t + 60, fr = lf > -18 && lf < 26 ? 0.2 * Math.exp(-(((lat - (36 + lf * 0.55)) / 2.1) ** 2)) * Math.min(1, (lf + 18) / 8, (26 - lf) / 8) * (0.5 + e_vruido(u * 0.5, 9)) : 0;
    return f + cov + fr - 0.66;
  };
  // las tormentas: el remolino joven (grumoso, poco organizado) y la espiral (dos bandas desiguales, la masa central, la
  // pared del ojo, la más blanca, y el ojo); las dos giran en sentido antihorario
  const tormenta = (lat, lon) => {
    let d = 0;
    if (rem > 0) { const dx = (lon - rlon) * cosR, dy = lat - rlat, rr = Math.hypot(dx, dy) + 0.01, th = Math.atan2(dy, dx), R0 = 1.8 + rem * 2.6;
      d = rem * 0.95 * Math.exp(-((rr / R0) ** 2)) * (0.45 + 0.55 * Math.cos(th + 2.4 * Math.log(rr + 0.4) - t * 0.7)) * (0.5 + 1.0 * e_vruido(lon * 1.3 + 9, lat * 1.3 - t * 0.2)); }
    if (esp > 0) { const dx = (lon - elon) * cosE, dy = lat - elat, rr = Math.hypot(dx, dy) + 0.01, th = Math.atan2(dy, dx), s = 0.45 + 0.55 * esp, R0 = 10 * s;
      const brazo = Math.max(0, Math.cos(3 * th + 5.4 * Math.log(rr + 0.35) - t * 1.4)) ** 1.8 * (0.6 + 0.4 * Math.cos(th - t * 0.47 + 1)), nucleo = Math.exp(-((rr / (3.1 * s)) ** 4));
      let v = esp * (1.15 * nucleo + 0.8 * brazo * Math.exp(-((rr / R0) ** 2)) * Math.min(1, rr / 2.2)) * (0.75 + 0.5 * e_vruido(lon * 1.8 + t * 0.2, lat * 1.8));
      const ojo = (cerca ? 0.38 : 0.62) * s;
      if (esp > 0.55 && rr < ojo) return -1;
      if (esp > 0.55 && rr < ojo * 1.9) v = Math.max(v, esp * 1.3);
      d = Math.max(d, v); }
    return d;
  };
  for (let k = 0; k < T.n; k++) {
    const b7 = k * 7, idx = V[b7], nx = V[b7 + 1], ny = V[b7 + 2], nz = V[b7 + 3], dd = V[b7 + 4], x = idx % 320, y = (idx - x) / 320, by = e_BAYER[((y & 3) << 2) | (x & 3)];
    if (dd >= 1) {   // el halo de la atmósfera, fuera del disco: un filo claro junto al borde del lado del sol, que se apaga
      const px = (dd - 1) * G.r, lit = (nx * L[0] + ny * L[1]) / dd, q = 1 - px / G.halo;
      if (lit < -0.35) { if (px < 1.2 && by < 0.5) B[idx] = e_C.halo[0]; continue; }
      const it = q * q * (0.35 + 0.65 * Math.max(0, lit + 0.2));
      if (px < 1) B[idx] = lit > 0.1 ? e_C.halo[3] : e_C.halo[2];
      else if (by < it) B[idx] = it > 0.5 ? e_C.halo[2] : it > 0.22 ? e_C.halo[1] : e_C.halo[0];
      continue;
    }
    const lat = V[b7 + 5], lon = ((V[b7 + 6] + G.lon0 + 540) % 360) - 180;
    const luz = nx * L[0] + ny * L[1] + nz * L[2];
    let lv = (luz + 0.08) / 0.9 * 4;
    // el suelo, con la costa un poco rota por el ruido y el relieve sombreado
    const w = (e_vruido(lon * 1.7, lat * 1.7) - 0.5) * (cerca ? 0.45 : 0.7), su = e_suelo(lat + w, lon - w), n1 = e_vruido(lon * 0.45 + 70, lat * 0.45);
    let ramp, chis = false;
    if (su === 2) {
      const bio = e_bioma(lat, lon, n1); ramp = e_C.bio[bio];
      const f = cerca ? 0.8 : 0.6, e0 = e_vruido(lon * f + 3, lat * f), rel = (bio === 'monte' ? 1.5 : cerca ? 0.32 : 0.4) * ((e_vruido((lon + 0.35) * f + 3, lat * f) - e0) * -L[0] * 3 + (e_vruido(lon * f + 3, (lat + 0.35) * f) - e0) * L[1] * 3);
      lv += rel * 4 + (e_vruido(lon * 1.3 + 3, lat * 1.3) - 0.5) * 0.7 + (cerca ? (e_vruido(lon * 4.1 + 9, lat * 4.3) - 0.5) * 0.6 : 0); if (h(x, y, 414) < 0.05) lv -= 0.6;
    } else { ramp = su === 1 ? e_C.plataforma : e_C.oceano; lv += (n1 - 0.5) * 0.6;
      const g = nx * H[0] + ny * H[1] + nz * H[2]; if (g > 0.972) { lv += (g - 0.972) * 90; chis = g > 0.99 && h(x, y, Math.floor(t * 5)) > 0.9; } }
    if (gi > 0 && Math.abs(lat) < 5.5 && luz > 0.08 && (x - y + 400) % 4 === 0 && by < gi * 1.6) { ramp = e_C.franja; lv = Math.max(2.2, lv - 0.6); }
    // las nubes: densidad, luz por arriba a la izquierda y sombra por abajo a la derecha
    let dn = nubes(lat, lon, cerca ? 5 : 3);
    const ts = tormenta(lat, lon); if (ts < 0) dn = -0.3; else dn = Math.max(dn, ts - 0.12 + Math.min(0.15, ts));
    let c;
    if (dn > 0) {
      const tau = Math.min(1, dn / 0.16);
      if (tau > 0.3) {   // un borde limpio: el filo de la nube va un tono más oscuro (sin tramas que parezcan letras)
        const dl = nubes(lat + 0.8, lon - 1.1, 2) + Math.max(0, tormenta(lat + 0.8, lon - 1.1) - 0.12), sombra = dl > dn + 0.025 ? -1 : dl < dn - 0.02 ? 1 : 0;
        const lc = (cerca ? Math.max(0, lv) * 0.68 + 0.3 + tau * 0.95 + sombra * 1.0 : Math.max(0, lv) * 0.82 + 0.35 + tau * 0.85 + sombra * 0.85) - (tau < 0.5 ? 0.7 : 0);
        let l = Math.floor(lc); if (lc - l > by) l++; c = e_C.nube[Math.max(0, Math.min(4, l))];
        // relámpagos dentro de las tormentas grandes
        if (dn > 0.1 && (ts > 0.25 || Math.abs(lat - 7) < 5) && h(Math.floor(lon * (cerca ? 2 : 1)), Math.floor(lat * (cerca ? 2 : 1)), 415 + Math.floor(t * 9)) > (ts > 0.25 ? 0.985 : 0.996)) c = luz < 0.05 ? e_C.rayo : C.blanco;
      }
    } else if (dn > -0.12 && nubes(lat - 0.6, lon + 0.9, 2) + Math.max(0, tormenta(lat - 0.6, lon + 0.9) - 0.12) > 0.03) lv -= 1;   // la sombra de una nube
    if (c === undefined) {
      if (luz < -0.02) {   // de noche: las luces de las ciudades
        c = luz < -0.12 || by > (luz + 0.12) / 0.1 ? ramp[0] : ramp[1];
        if (su === 2 && ramp !== e_C.bio.desierto && ramp !== e_C.bio.hielo && ramp !== e_C.bio.tundra && h(Math.floor(lon * 2), Math.floor(lat * 2), 416) > 0.88 && h(x, y, 417) > 0.55) c = Math.sin(t * 3 + x * 1.7 + y) > -0.6 ? e_C.ciudad : e_C.ciudadS;
      } else { let l = Math.floor(lv); if (lv - l > by) l++; c = ramp[Math.max(1, Math.min(4, l))]; if (chis) c = e_C.chispa; }
    }
    // la bruma azul del borde, del lado del sol
    if (dd > 1 - hz && luz > -0.05) { const q = (dd - 1 + hz) / hz, lit = (nx * L[0] + ny * L[1]) / dd; if (lit > -0.3 && by < q * (0.45 + 0.4 * Math.max(0, lit))) c = q > 0.7 && lit > 0 ? e_C.halo[3] : e_C.halo[2]; }
    B[idx] = c;
  }
  // la estrella fugaz: entra en la atmósfera por el lado de la noche cada pocos segundos
  if (!cerca) { const k = Math.floor(t / 6.5), u = (t % 6.5) / 0.5; if (u < 1) { const a = 0.2 + h(k, 1, 418) * 0.6, x0 = G.cx + Math.cos(a) * (G.r + 4), y0 = G.cy + Math.sin(a) * (G.r + 4);
    for (let i = 0; i < 7; i++) { const s = u * 10 - i; if (s < 0) continue; R.pset(Math.round(x0 - Math.cos(a) * s - Math.sin(a) * s * 0.6), Math.round(y0 - Math.sin(a) * s + Math.cos(a) * s * 0.6), i < 2 ? C.blanco : e_C.fugaz); } } }
}

// Coriolis sobre el planeta (g = o.giro, 0–1): el ecuador punteado con galones que corren hacia el este (el giro de la
// Tierra), las cuatro flechas de aire que van a la baja presión y se tuercen a la derecha (con el camino recto que
// llevarían sin el giro, punteado en blanco), el aro de flechas antihorario alrededor de la espiral y los huracanes
// tachados sobre la franja del ecuador
function e_coriolis(R, t, G, g) {
  const P = (lat, lon) => e_proyecta(G, lat, lon), ease = (a, b) => { const u = Math.max(0, Math.min(1, (g - a) / (b - a))); return u * u * (3 - 2 * u); };
  const ue = ease(0, 0.22);
  for (let k = 0; k <= 290 * ue; k++) { const [x, y, v] = P(0, G.lon0 - 86 + k * 0.5); if (v && k % 6 < 4) R.pset(x, y, e_C.ecuador); }
  if (ue > 0.6) for (let k = 0; k < 4; k++) { const lon = G.lon0 - 64 + ((k * 32 + t * 8) % 128), [x, y, v] = P(0, lon), [x2] = P(0, lon - 3); if (!v) continue;
    const dx = Math.sign(x - x2) || 1; R.pset(x, y - 1, C.blanco); R.pset(x + dx, y, C.blanco); R.pset(x, y + 1, C.blanco); R.pset(x - dx, y - 2, e_C.ecuador); R.pset(x - dx, y + 2, e_C.ecuador); }
  // las cuatro flechas hacia la baja presión
  const [clat, clon] = [28, -50], cosC = Math.cos(clat * Math.PI / 180), r0 = 19;
  for (let k = 0; k < 4; k++) {
    const u = ease(0.2 + k * 0.05, 0.6 + k * 0.03); if (u <= 0) continue;
    const a0 = k * Math.PI / 2 + 0.35;
    for (let s = 0; s < 0.62 * Math.min(1, u * 1.4); s += 0.035) { const rr = r0 * (1 - s), p = P(clat + Math.sin(a0) * rr, clon + Math.cos(a0) * rr / cosC); if (p[2] && Math.round(s / 0.035) % 2 === 0) { R.pset(p[0], p[1], e_C.recto); R.pset(p[0] + 1, p[1] + 1, e_C.aireS); } }
    const pts = []; for (let s = 0; s <= u; s += 0.02) { const rr = r0 * (1 - 0.58 * s), a = a0 + 1.9 * s * s; pts.push(P(clat + Math.sin(a) * rr, clon + Math.cos(a) * rr / cosC)); }
    e_flecha(R, pts, e_C.aire, e_C.aireS);
  }
  // el aro antihorario alrededor de la espiral
  const ua = ease(0.66, 0.92);
  if (ua > 0) for (let k = 0; k < 2; k++) { const pts = []; for (let s = 0; s <= 1.9 * ua; s += 0.05) { const a = k * Math.PI + t * 0.9 + s; pts.push(P(clat + Math.sin(a) * 6.5, clon + Math.cos(a) * 6.5 / cosC)); } e_flecha(R, pts, e_C.giro, e_C.aireS); }
  // los huracanes tachados sobre el ecuador
  if (g > 0.8 && Math.sin(t * 5) > -0.6) for (const lon of [G.lon0 + 20, G.lon0 - 28]) { const [x, y, v] = P(0, lon); if (!v) continue;
    R.disco(x, y, 5, e_C.aireS); e_simboloHuracan(R, x, y, e_C.franjaL); R.linea(x - 4, y + 4, x + 4, y - 4, C.rojo); R.linea(x - 4, y + 3, x + 3, y - 4, C.rojo); }
}

// una flecha de 1 px con su contorno oscuro por los puntos pts ([x, y, visible]), con una punta pequeña al final
function e_flecha(R, pts, c, cS) {
  const vis = pts.filter((p) => p[2]); if (vis.length < 2) return;
  for (let i = 1; i < vis.length; i++) { const [a, b] = [vis[i - 1], vis[i]]; for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) R.linea(a[0] + dx, a[1] + dy, b[0] + dx, b[1] + dy, cS); }
  for (let i = 1; i < vis.length; i++) { const [a, b] = [vis[i - 1], vis[i]]; R.linea(a[0], a[1], b[0], b[1], c); }
  const p = vis[vis.length - 1], q = vis[Math.max(0, vis.length - 4)], an = Math.atan2(p[1] - q[1], p[0] - q[0]);
  const pt = (d, s) => [Math.round(p[0] + Math.cos(an) * d - Math.sin(an) * s), Math.round(p[1] + Math.sin(an) * d + Math.cos(an) * s)];
  R.poligono([pt(4, 0), pt(-2, -3.5), pt(-2, 3.5)], cS); R.poligono([pt(3, 0), pt(-1, -2), pt(-1, 2)], c);
}

// el símbolo de huracán de los mapas del tiempo (un círculo con dos brazos curvos, antihorario), de unos 9 px (s = 1)
function e_simboloHuracan(R, x, y, c, s = 1) {
  R.anillo(x, y, 2 * s, c); R.pset(x, y, c);
  for (const a0 of [0, Math.PI]) for (let i = 0; i <= 6 * s; i++) { const a = a0 - i * 0.22 / s, r = 2 * s + i * 0.45; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y - Math.sin(a) * r), c); }
}

// el visor de la cámara: cuatro esquinas que se cierran sobre lo fotografiado y destellan con el disparo, y el piloto
// rojo que parpadea (u, 0–1: el tiempo de la foto)
function e_visor(R, t, x, y, w, hh, u) {
  const k = 1 + (1 - Math.min(1, u * 5)) * 0.8, a = Math.round(w * k), b = Math.round(hh * k), L = Math.max(3, Math.round(w * 0.35)), dis = u > 0.12 && u < 0.24;
  if (u > 0.82 && Math.sin(t * 30) > 0) return;
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const cx = x + sx * a, cy = y + sy * b, c = dis ? e_C.flash : C.blanco;
    R.linea(cx, cy, cx - sx * L, cy, e_C.contorno); R.linea(cx, cy, cx, cy - sy * Math.round(L * 0.8), e_C.contorno);
    R.linea(cx, cy - sy, cx - sx * L, cy - sy, c); R.linea(cx - sx, cy, cx - sx, cy - sy * Math.round(L * 0.8), c); }
  if (dis) for (let i = -a + 2; i <= a - 2; i += 2) { R.pset(x + i, y - b + 1, e_C.flash); R.pset(x + i, y + b - 1, e_C.flash); }
  if (Math.sin(t * 7) > 0) R.disco(x + a - 2, y - b + 2, 1, C.rojo);
}

// las ondas de radio del satélite a la estación de tierra (est = [x, y, visible]): arcos que bajan y la estación que
// parpadea al recibirlos
function e_ondas(R, t, sat, est, u, cerca) {
  if (!est[2]) return;
  const dx = est[0] - sat[0], dy = est[1] - sat[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, w = cerca ? 9 : 6;
  for (let k = 0; k < 4; k++) { const f = (u * 2.6 + k / 4) % 1; if (u < k * 0.1) continue; const cx = sat[0] + dx * f, cy = sat[1] + dy * f, ww = Math.round(w * (0.6 + f * 0.6));
    for (let i = -ww; i <= ww; i++) { const bend = (i * i) / (ww * 2.2), px = Math.round(cx - uy * i - ux * bend), py = Math.round(cy + ux * i - uy * bend); R.pset(px - Math.round(ux), py - Math.round(uy), e_C.contorno); R.pset(px, py, f < 0.75 ? e_C.radio : e_C.radioS); } }
  // la estación de tierra: una antena de plato pequeña que parpadea, con un anillo cuando llega la señal
  const on = Math.sin(t * 12) > 0, [x, y] = est;
  R.rect(x - 2, y, x + 2, y + 1, e_C.contorno); R.pset(x, y - 1, e_C.contorno); R.linea(x - 3, y - 4, x + 1, y - 1, C.blanco); R.linea(x - 2, y - 5, x + 2, y - 2, e_C.metalB); R.pset(x + 1, y - 5, on ? C.rojo : e_C.radio);
  const pul = (u * 2.6 * 4) % 1; if (u > 0.3) R.anillo(x, y - 2, Math.round(2 + pul * 6), pul < 0.5 ? e_C.radio : e_C.radioS);
}

// un fondo fijo que se pinta una vez en su búfer y se copia en cada fotograma (como en th-comun.js)
const e_FIJOS = new Map();

function e_fijo(R, clave, dibuja) {
  let b = e_FIJOS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_FIJOS.set(clave, b); }
  R.copiar(b);
}

// el umbral del tramado ordenado 4 × 4 (copiado de th-comun.js): transiciones tramadas limpias
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// ruido de valor suave (0–1) sobre una rejilla de 256 × 256, con su tabla calculada una vez
const e_RN = (() => { const a = new Float32Array(65536); for (let i = 0; i < 65536; i++) a[i] = h(i & 255, i >> 8, 401); return a; })();

// el ruido de valor en (x, y), interpolado suave entre los nudos de la rejilla
function e_vruido(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const x0 = xi & 255, y0 = (yi & 255) << 8, x1 = (x0 + 1) & 255, y1 = ((yi + 1) & 255) << 8;
  const a = e_RN[y0 + x0], b = e_RN[y0 + x1], c = e_RN[y1 + x0], d = e_RN[y1 + x1];
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// una rampa de colores a partir de una cadena de hex separados por espacios
const e_rampa = (s) => s.split(' ').map(hex);

// los colores de la órbita: el espacio, la Luna, el planeta (océano, plataforma, biomas y nubes en rampas de la noche
// a la luz), el halo de la atmósfera, el satélite y las flechas de Coriolis
const e_C = {
  espacio: e_rampa('#03040e #070a1c #0c1128 #141a3a #1e2450 #2a2e5e'), nebulosa: e_rampa('#1e1636 #34204a #5a3058'), estrellaA: hex('#c8d0f4'), estrellaB: hex('#6a74a8'),
  luna: e_rampa('#3a3a48 #7a7a86 #a8a8b2 #d8d6d0'), fugaz: hex('#f8d890'),
  oceano: e_rampa('#0b1840 #0f285e #163c80 #1f55a2 #2c6cbc'), plataforma: e_rampa('#081a30 #145a78 #2486a4 #3aa6c0 #5ac4d0'),
  nube: e_rampa('#1c2234 #74809a #a8b4c8 #d4dce8 #f6f8fc'), franja: e_rampa('#3a3420 #8a7a3a #c8b45a #e8d47a #f8eaa0'),
  bio: {
    selva: e_rampa('#08120c #183a1e #26562a #367234 #4a8a3e'), verde: e_rampa('#0a140c #26482a #3c6a36 #548444 #6c9a52'), templado: e_rampa('#0c140c #34502c #50703e #6a8a4c #84a05e'),
    sabana: e_rampa('#141408 #504e26 #74723a #94904a #b0a85e'), pradera: e_rampa('#14140c #5a5a34 #7c7c48 #9a985a #b2ae70'),
    desierto: e_rampa('#1a140c #7a603e #a6845a #c8a46e #dec08a'), monte: e_rampa('#120e0c #4e4234 #6e5e48 #8a7a62 #a8987e'),
    boreal: e_rampa('#08100c #1a3628 #284a34 #3a5e42 #4c7252'), tundra: e_rampa('#101010 #50504a #6e6e62 #8a8a7c #a6a496'),
    hielo: e_rampa('#1a1e2a #8898ae #b6c4d4 #d8e2ec #f4f8fc'),
  },
  halo: e_rampa('#16205a #2c48a8 #5a8ae0 #a4c8f4'), chispa: hex('#e8f4ff'), ciudad: hex('#ffd878'), ciudadS: hex('#c89040'), rayo: hex('#c8d8ff'),
  celdas: e_rampa('#0c1236 #18245e #263c8a #3658b2 #5a80d4'), destello: hex('#e0f4ff'), metalA: hex('#e4e8f0'), metalB: hex('#a4acbc'), metalC: hex('#5e6676'), contorno: hex('#0a0c18'),
  flash: hex('#fffbe8'), orbita: hex('#8ab8e8'), orbitaS: hex('#3a5288'), radio: hex('#9af0c8'), radioS: hex('#4aa888'),
  ecuador: hex('#f8e8a0'), franjaL: hex('#f8eab0'), recto: hex('#e8eef8'), aire: hex('#f8a040'), aireS: hex('#3a1a10'), giro: hex('#f8d050'),
};

// las costas del planeta (lon, lat seguidos, anillo a anillo), sacadas de geo-ov.js (Natural Earth, dominio público):
// TIERRA recortada a lon −179…45 y lat −60…84 y simplificada (Douglas-Peucker 0,25°), y el contorno detallado de EE. UU.
// (EEUU48) dentro de la caja del golfo de México y Florida (lon −97,3…−79,6, lat 24,4…31)
const e_TIERRA = [[-67.8,-53.8,-65,-54.6,-65.4,-55.2,-67,-54.8,-68,-55.6,-69.2,-55.4,-72.2,-54.4,-74.6,-52.8,-71,-54,-70.2,-52.8,-68.6,-52.6],[-58.4,-51,-57.6,-51.4,-58,-51.8,-59.4,-52.2,-59.8,-51.8,-60.6,-52.2,-61.2,-51.8],[45,-25.4,44,-25,43.4,-22,44.4,-20,44,-17.4,44.4,-16.2,45,-16],[-72.6,20,-70,19.6,-68.2,18.6,-68.6,18.2,-70.6,18.4,-71.4,17.6,-72.4,18.2,-73.8,18,-74.4,18.8,-72.2,18.8,-72.8,19.6,-73.4,19.6],[-79.6,22.8,-78.2,22.6,-75.6,20.8,-74.2,20.4,-77.8,20,-77,20.4,-78,20.8,-78.6,21.6,-81.8,22.2,-82.2,22.4,-81.8,22.6,-85,22,-82.2,23.2],[15.6,38.2,15.2,36.6,12.4,37.6,12.6,38.2],[9.2,41.2,9.8,40.6,9.8,39.2,8.8,39,8.2,41],[-123.4,48.6,-125.6,48.8,-128,50,-128.4,50.8,-125.8,50.4],[-56,50.8,-56.8,49.8,-56,50.2,-55.4,50,-55.8,49.6,-53.4,49.2,-53.8,48.6,-53,48.8,-52.6,47.6,-53,46.8,-54.2,46.8,-54.2,47.8,-55.4,47,-56,47,-55.2,47.4,-56.2,47.6,-59.2,47.6,-58.8,48.4,-59.2,48.6,-57.4,50.8,-55.4,51.6],[-132.6,54,-131.6,54.2,-132,53,-131.2,52.2,-133,53.4,-133.2,54.2],[-6.8,52.4,-8.6,51.8,-10,51.8,-9.2,53,-9.6,54,-6.6,55.2,-5.6,54.6],[-153,57.2,-154,56.8,-154.6,57.6,-152.6,58,-152,57.6],[-3,58.6,-4,57.6,-2,57.8,-3,56,-2,56,-1,54.6,-0.4,54.6,0.6,53,1.8,52.8,1,51.8,1.4,51.4,0.6,50.8,-3,50.8,-5.2,50,-5.8,50.2,-3.4,51.4,-5.2,52,-4.2,52.4,-4.8,52.8,-4.6,53.6,-3,53.4,-2.8,54,-3.6,54.6,-4.8,54.8,-5,55.8,-5.6,55.4,-6.2,56.8,-5,58.6],[-85.2,65.8,-85,65.2,-80,63.8,-81,63.4,-83,64.2,-85.4,63.2,-85.8,63.6,-87.2,63.6,-86.4,64,-85.8,65.8],[-14.4,66.6,-14.6,65.8,-13.6,65.2,-14.8,64.4,-18.6,63.6,-22.8,64,-21.8,64.4,-24,65,-22.2,65.4,-24.2,65.6,-23.6,66.4,-22,66.4,-20.6,65.8,-19,66.4,-17.8,66,-16.2,66.6],[-75.8,67.2,-77,67.2,-77.2,67.6,-76.8,68.2,-75.8,68.4,-75,68],[45,12.8,43.6,12.6,42.6,15.2,42.6,16.8,40.8,19.6,39.2,21.4,38.6,23.8,37.6,24.4,35.2,28.2,34.6,28.2,34.8,29.6,33.8,27.6,32.4,30,34.2,26.2,35.6,24,35.6,23.2,36.8,22,37.6,18.6,38.4,18,39.4,16,43.4,12.4,42.6,11.8,44.6,10.4,45,10.4,45,1.8,40.4,-2.6,38.6,-5.8,39.4,-6.8,39.2,-8.4,40.6,-10.8,40.8,-14.6,40.2,-16,37.4,-17.6,34.8,-19.8,34.6,-20.4,35.6,-22,35.6,-24,32.6,-25.6,32.8,-26.2,32.6,-28.2,28.2,-32.8,25.8,-33.8,22.6,-33.8,19.6,-34.8,18.4,-34,17.8,-32.6,18.2,-31.6,15.2,-27,14.4,-22,11.8,-18,11.6,-16.6,12.6,-13.4,13.6,-12,13.6,-10.6,12.8,-9.2,13.2,-8.6,11.8,-5,8.8,-1,9.8,3.2,8.6,4.8,5.8,4.4,4.4,6.4,2.6,6.4,-2,4.8,-4.6,5.2,-8,4.4,-12.8,7.8,-13.2,9,-14.8,11,-16.6,12.2,-16.6,13.6,-17.6,14.8,-16.6,15.6,-16.4,17.2,-16.4,20.2,-17.2,21,-16,23.8,-13.2,27.6,-11.6,28.2,-9.6,30,-9.8,31.2,-9.4,32.6,-6.8,34.2,-5.8,35.8,-2.2,35.2,1.6,36.6,8.4,37,9.6,37.4,10.2,37.2,10.2,36.8,11.2,37,10.6,36.4,10.8,34.8,10.2,34.4,10.4,33.8,15.2,32.4,15.6,31.4,19.2,30.4,20.2,31,20.2,32.2,21.6,32.8,28.8,31,31,31.6,32,31,32.2,31.4,33.8,31,34.6,31.6,36,34.6,35.8,36.4,36.2,36.8,34.6,36.8,34,36.2,32.6,36.2,31.6,36.6,29.6,36.2,27.6,36.8,26.4,38.2,26.8,39,26.2,39.6,27.4,40.4,28.8,40.6,29.2,41.2,31.2,41.2,33.6,42,35.2,42,38.4,41,40.4,41,41.6,41.6,41.6,42.6,36.6,45.2,38.2,46.2,37.6,46.6,39.2,47.4,35,46.4,35,45.8,36.6,45.6,36.4,45.2,33.8,44.4,33.4,44.6,33.6,45,32.6,45.4,33.6,46,31.6,46.4,31.6,46.8,30.6,46.6,29.6,45,28.8,45,27.6,42.6,28.8,41.2,27.6,41,26.4,40.2,26.2,40.8,24.8,41,23.6,40.8,24.4,40.2,22.6,40.4,23.4,39.2,23,39,24,38.2,24,37.8,23.2,38,23.4,37.4,22.8,37.4,23.2,36.4,22.6,36.4,21.6,36.8,21.2,38.4,19.4,40.4,19.6,41.8,16,43.6,14.8,45.2,14.4,45.2,14,44.8,13.8,45.6,13.2,45.8,12.4,45.4,12.6,44.2,15.2,42,15.8,42,15.8,41.6,18.6,40.2,18.4,39.8,16.8,40.4,16.6,39.8,17.2,39.4,17.2,39,16.2,38,15.6,38,16.2,39,15.4,40,12.2,41.8,10.6,43,10.2,44,8.8,44.4,6.6,43.2,4.6,43.4,3.2,43.2,3,42,0.8,41,-0.4,39.4,0.2,38.8,-2.2,36.8,-4.4,36.8,-5.4,36,-6.4,37,-8.8,37,-8.8,38.4,-9.4,38.8,-8.8,40.8,-9.4,43,-8,43.8,-1.8,43.4,-1.4,44,-1.2,46,-3,47.6,-4.4,48,-4.6,48.8,-1.6,48.6,-1.8,49.8,-1,49.4,1.4,50.2,1.6,51,3.8,51.6,4.6,53.2,8.2,53.6,8.8,54,8.2,55.6,8.6,57.2,10.6,57.8,10.4,57,10.8,56.6,9.6,55.6,9.8,54.6,10.8,54.4,10.8,54,12.6,54.6,14.2,53.8,17.6,55,19.6,54.4,19.8,55,21.4,55.2,21.2,56.8,21.6,57.4,22.6,57.8,23.4,57,24.2,57,24.4,58.4,23.4,58.6,23.4,59.2,28,59.6,29.2,60,28.2,60.6,22.8,59.8,21.4,60.8,21.6,61.8,21.2,62.6,21.6,63.2,25.4,65.2,25.4,65.6,23.8,66,22.2,65.8,21.2,65,21.4,64.4,17.8,62.8,17.2,61.4,18.8,60.2,17.8,59,16.8,58.8,15.8,56.2,14.6,56.2,14.2,55.4,12.8,55.4,10.4,59.6,8.4,58.4,7.2,58.2,5.6,58.6,5,62,10.6,64.6,14.8,67.8,19.2,69.8,23,70.2,24.6,71,28.2,71.2,31.4,70.6,30,70.2,31.2,69.6,32.2,70,41.2,67.6,41.2,66.8,38.4,66,33.2,66.6,34.8,66,34.8,64.4,37,64,37.2,64.4,36.6,64.8,37.2,65.2,39.6,64.6,40.4,64.8,39.8,65.6,42.2,66.6,44,66.2,44.6,66.8,43.6,67.4,44.2,68,43.6,68.6,45,68.4],[-95.6,69.2,-96.2,68.8,-99.8,69.4,-98.2,70.2],[-90.4,69.6,-90.4,68.6,-89.2,69.4,-88,68.6,-88.2,68,-87.2,67.2,-85.6,68.8,-85.4,70,-82.6,69.8,-81.2,69.2,-81.2,68.8,-82,68.2,-81.2,67.6,-81.4,67.2,-83.2,66.4,-85.8,66.6,-87.2,64.8,-88.4,64.2,-89.8,64,-90.6,63.6,-90.8,63,-93.2,62,-94.2,61,-94.6,59,-93.2,58.8,-92.2,57.2,-90.8,57.4,-85,55.4,-82.2,55.2,-82,53.4,-81.4,52.2,-79.8,51.2,-79,51.6,-78.6,52.6,-79,54.2,-79.8,54.8,-78.2,55.2,-76.4,56.6,-77.2,58.2,-78.4,58.8,-77.2,60,-78,62.4,-73.8,62.4,-71.4,61.2,-69.6,61.2,-69.2,59,-67.6,58.2,-66.2,58.8,-64.6,60.4,-61.4,57,-61.8,56.4,-57.2,54.6,-56.8,53.8,-55.8,53.4,-55.6,52.2,-60,50.2,-66.4,50.2,-71,46.8,-68.6,48.4,-65,49.2,-64.2,48.8,-65,48.2,-64.4,46.2,-63.2,45.8,-61.4,46,-60.4,47,-60.4,46.4,-59.8,46,-65.4,43.6,-66,43.6,-66.2,44.6,-64.4,45.4,-67,45.2,-67,44.8,-70,43.8,-70.6,43,-70.8,42.4,-70,41.6,-73.6,41,-71.8,41,-74,40.8,-74.8,39,-75.4,39.6,-75,38.4,-75.8,37.2,-75.6,38,-76.4,39.2,-76.2,38.2,-77,38.2,-76.2,38,-75.6,35.6,-79,33.6,-81.2,31.4,-81.2,30,-80,27,-80.4,25.2,-81.2,25.2,-82.8,28,-82.8,29.2,-84,30.2,-85,29.6,-86.4,30.4,-89.2,30.4,-89.6,30.2,-89.2,29.4,-90.2,29.2,-91.6,29.8,-93.8,29.8,-96.6,28.4,-97.4,27.4,-97,26,-97.8,22.4,-96.2,19.4,-94.4,18.2,-90.8,19.4,-90.2,21,-87,21.6,-86.8,20.8,-87.8,18.4,-88.2,18.6,-88.4,16.6,-88.8,16,-85,16,-83.4,15.4,-83.2,14.4,-83.8,11.2,-82.2,9,-81.4,8.8,-79.6,9.6,-76.8,8.6,-75.6,9.4,-75.4,10.6,-74.8,11.2,-73.4,11.2,-71.8,12.4,-71,12.2,-71.8,11.4,-71.6,9.2,-71,10,-71.4,11,-70.2,11.4,-69.8,12.2,-68.2,10.6,-66.2,10.6,-64.8,10.2,-64.2,10.6,-61.8,10.8,-62.6,10.4,-62.4,10,-60.8,9.4,-60.6,8.6,-59,8,-58.4,6.8,-57,6,-54,5.8,-51.2,4.2,-50.4,2,-50,1.8,-49.8,1,-50.6,0.2,-50.4,0,-48.6,-0.2,-48.6,-1.2,-47.8,-0.6,-44.8,-1.6,-44.4,-2,-44.6,-2.6,-43.4,-2.4,-40,-2.8,-37.2,-4.8,-35.6,-5,-34.6,-7.2,-35,-9,-38.6,-13,-39.2,-17.8,-40.8,-21.8,-42,-23,-44.6,-23.4,-47.6,-24.8,-48.4,-25.8,-48.8,-28.6,-53.8,-34.4,-54.8,-35,-56.2,-34.8,-58.4,-33.8,-58.4,-34.4,-57.2,-35.2,-57.4,-36,-56.6,-36.4,-57.6,-38.2,-59.2,-38.6,-62.2,-38.8,-62,-40.6,-65,-41,-65,-42,-64.2,-42.4,-63.8,-42,-63.4,-42.6,-65.2,-43.4,-65.6,-45,-67.2,-45.6,-67.6,-46.2,-65.6,-47.2,-66,-48,-67.2,-48.6,-67.8,-49.8,-69,-50.6,-68.2,-52.4,-69.4,-52.2,-70.8,-52.8,-71,-53.8,-74.8,-52.2,-75.6,-48.6,-74,-46.8,-75.6,-46.6,-74.6,-45.8,-74.4,-44,-73.2,-44.4,-72.6,-42.4,-73.4,-42,-73.6,-43.4,-74.2,-43.2,-73.2,-39.2,-73.6,-37.2,-73.2,-37,-71.4,-32.4,-71.4,-28.8,-70.8,-27.6,-70.2,-19.8,-70.4,-18.2,-76,-14.6,-79.8,-7.2,-81.2,-6,-80.8,-5.6,-81.4,-4.6,-79.8,-2.6,-80,-2.2,-80.4,-2.6,-81,-2.2,-80,0.8,-78.8,1.4,-78.4,2.6,-77,3.8,-77.4,4.2,-77.4,6.8,-78.2,7.6,-78.2,8.4,-79.6,9,-80.4,8.2,-80,7.6,-80.8,7.2,-81,7.8,-83.4,8.4,-83.6,9.2,-85,10.2,-85,9.6,-85.6,10,-85.6,11.2,-87.6,13,-87.4,13.4,-91.2,14,-94.6,16.2,-96.6,15.8,-103.4,18.4,-105.4,20,-105.6,20.4,-105.2,21.4,-106,22.8,-109.2,25.6,-109.2,26.4,-112.2,29,-113,31.2,-113.8,31.6,-114.8,31.8,-114.6,30.2,-111.6,26.8,-110.6,24.4,-109.4,23.4,-110,22.8,-112.2,24.8,-112.2,26,-115,27.8,-114.6,27.8,-114.2,28.6,-115.4,29.6,-117.2,33,-118.4,34,-120.6,34.6,-124.4,40.4,-124.4,42.8,-123.8,45.6,-124.6,48.2,-123,48,-122.6,47.2,-122.8,49,-127.4,50.8,-128,51.8,-127.8,52.4,-129,52.8,-129.2,53.6,-132,55.6,-132.2,56.4,-133.4,57.2,-134,58.2,-136.6,58.2,-139.8,59.6,-147,61,-148.2,60.8,-148,60,-151.6,59.2,-151.4,60.8,-150.2,61,-150.6,61.4,-154,59.4,-153.2,59,-154.2,58.2,-156.2,57.4,-158.4,56,-164.8,54.4,-157.6,57.6,-157,59,-159,58.4,-160.4,59.2,-162,58.8,-161.8,59.6,-163.8,59.8,-165.2,60.6,-165.4,61.2,-166,61.6,-164.6,63.2,-163,63.2,-160.8,63.8,-161.4,64.4,-160.8,64.8,-165,64.4,-166.4,64.8,-168,65.8,-164.4,66.6,-163.6,66.6,-163.8,66.2,-161.6,66.2,-166.8,68.4,-166.2,69,-163.2,69.4,-161.8,70.4,-156.6,71.4,-154.2,70.8,-143.6,70.2,-136.4,69,-134.4,69.6,-132.8,69.6,-129.8,70.2,-129,69.8,-128,70.6,-125.8,69.6,-124.4,70.2,-124.2,69.4,-121.4,69.8,-115.2,69,-113.8,68.4,-115.2,68,-109.8,68,-108.8,67.4,-107.8,68,-108.8,68.4,-108.2,68.8,-106,68.8,-104.2,68,-101.4,67.6,-98.4,67.8,-98.6,68.4,-97.6,68.6,-96,68.2,-96,67.4,-95.4,68.2,-94.6,68.2,-94.2,69.2,-96.4,70.2,-96.4,71.2,-95.2,72,-92.8,71.4,-91.4,70.2,-92.4,69.8],[-114.2,73.2,-114.6,72.8,-112.4,73,-111,72.6,-109.8,73,-108.2,71.8,-107.6,72.2,-108.4,73.2,-106.4,73.2,-105.4,72.8,-104.4,71,-101,70,-101,69.6,-102.6,69.6,-102,69.2,-102.4,68.8,-106,69.2,-113.2,68.6,-113.8,69,-116,69.2,-117.2,70,-112.4,70.4,-117.8,70.6,-118.4,71,-116,71.4,-119.4,71.6,-117.8,72.8,-115.2,73.4],[-76.2,73.2,-79.4,72.8,-80.8,73.4,-80.4,73.8,-78,73.8],[-86.6,73.2,-85.8,72.6,-84.8,73.4,-82.2,73.8,-80.6,72.8,-80.8,72.2,-77.8,72.8,-74.2,71.8,-74,71.4,-72.2,71.6,-67.8,70.2,-67,69.2,-68.8,68.8,-64.8,67.8,-63.4,67,-61.8,67,-62.2,66.2,-63.8,65,-66.6,66.4,-68,66.4,-68,65.8,-65.2,64.4,-64.6,63.4,-65,62.8,-68.8,63.8,-66.2,62,-71,63,-72.2,63.4,-71.8,63.8,-74.8,64.8,-77.6,64.2,-78.6,64.6,-77.8,65.4,-74,65.6,-74.2,65.8,-72.6,67.4,-72.8,67.8,-76.8,69,-76.2,69.2,-79,70.2,-81.2,69.8,-88.6,70.4,-89.4,70.8,-88.4,71.2,-89.8,71.2,-90.2,72.2,-88.4,73.6,-85.8,73.8],[-100.4,73.8,-97.4,73.8,-97,73.6,-98,73,-96.4,72.6,-96.6,71.8,-99.2,71.4,-102.4,72.6,-102.4,72.8,-100.4,72.8,-101.4,73.4],[-93.2,72.8,-94.2,72,-95.4,72.2,-96,73.4,-94.4,74.2,-90.4,74],[-120.4,71.4,-123,71,-125.8,72,-123.8,73.8,-124.8,74.4,-117.6,74.2,-115.4,73.6,-120.4,71.8],[-93.6,75,-94.2,74.6,-96.8,75,-94.8,75.6],[-98.4,76.8,-97.6,76.4,-98.2,75,-100.8,75.2,-100.8,75.6,-102.4,75.6,-102.6,76.4],[-108.2,76.2,-107.8,75.8,-105.8,76,-105.6,75.6,-106.2,75,-113.6,74.4,-113.8,74.8,-111.8,75.2,-117.6,75.2,-115.4,76.6,-109,75.6,-110.4,76.4,-109.6,76.8,-108.6,76.8],[-94.6,77.2,-91.6,76.8,-90.6,76.6,-91,76.2,-89.2,75.6,-81,75.8,-79.8,75,-81.8,74.4,-92.4,74.8,-92.8,76,-97,76.8,-96.6,77.2],[-116.2,77.6,-116.2,77,-117,76.6,-121.4,76,-122.8,76.2,-119,77.6],[-110.2,77.8,-112,77.4,-113.4,77.8,-111.2,78.2,-109.8,78],[24.8,78,22.6,77.4,20.8,77.8,21.4,78,20.8,78.4,23,78.6],[-95.8,78.2,-98,78.2,-98.6,79,-95.6,78.4],[-100,78.4,-99.6,78,-105.2,78.4,-104.2,78.8,-105.4,79,-105.4,79.4,-100.8,78.8],[18.4,79.8,21.6,79,19,78.6,17.2,76.8,13.8,77.4,14.8,77.8,11.2,79,10.4,79.8,17,80.2],[25.4,80.4,27.4,80.2,26,79.6,23,79.4,20.2,79.6,17.4,80.4],[-87,79.8,-85.8,79.4,-89,78.4,-90.8,78.2,-92.8,78.4,-94,78.8,-93,79.4,-95,79.4,-96.6,80.2,-94.2,81,-94.6,81.2,-92.4,81.4,-87.8,80.4],[-68.4,83.2,-63.6,83,-61.8,82.4,-67.6,81.6,-65.4,81.6,-71.2,79.8,-76.8,79.4,-75.4,79.2,-76.2,79,-75.4,78.6,-79.8,77.2,-77.8,76.8,-80.6,76.2,-89.4,76.6,-89.6,77,-87.8,77.2,-88.2,78,-85,77.6,-88,78.4,-85,79.4,-86.8,80.4,-81.8,80.6,-87.6,80.6,-91.6,82,-85.4,82.8,-83.2,82.4,-82.4,83,-79.2,83.2],[-27,83.6,-20.8,82.8,-31.4,82,-22.8,82.2,-22,81.8,-23.2,81.2,-15.8,82,-12.8,81.8,-12.2,81.4,-20,80.2,-17.6,80.2,-19.6,78.8,-19.6,77.6,-18.4,77,-21.6,76.6,-19.8,76.2,-19.6,75.2,-20.6,75.2,-19.4,74.4,-21.6,74.2,-20.4,73.8,-20.8,73.6,-23.6,73.4,-22.2,72.6,-22.2,72.2,-24.8,72.4,-22,71.6,-21.8,70.8,-23.4,70.6,-25.4,71.4,-25.2,70.8,-26.4,70.2,-22.2,70.2,-27.6,68.6,-31.8,68.2,-34.2,66.8,-39.8,65.6,-40.6,64.8,-41.2,63.6,-42.8,62.8,-42.4,62,-43.4,60.2,-44.8,60,-46.2,61,-48.2,61,-51.6,63.6,-52.2,65.2,-53.6,66.2,-53.2,66.8,-54,67.2,-53,68.4,-51.4,68.8,-50.8,70,-53.4,69.4,-54.6,69.6,-54.4,70.8,-51.4,70.6,-55.8,71.8,-54.6,72.6,-57.2,74.8,-58.6,75.2,-58.6,75.6,-61.2,76.2,-68.4,76.2,-71.4,77,-66.8,77.4,-73.2,78,-73.2,78.4,-65.6,79.4,-65.2,79.8,-68,80.2,-62.2,81.4,-62.6,81.8,-57.2,82.2,-53,82,-50.4,82.4,-44.4,81.8,-46.8,82.2,-46.8,82.6,-43.4,83.2]];

const e_GOLFO = [-81.45,30.7,-81.25,29.8,-80.95,29.1,-80.55,28.6,-80.55,28.1,-80.05,26.8,-80.15,25.65,-80.2,25.75,-80.3,25.6,-80.35,25.35,-80.3,25.3,-80.2,25.5,-80.35,25.15,-80.65,24.9,-80.45,25.2,-81.15,25.15,-81.15,25.4,-81.3,25.7,-81.6,25.9,-81.7,25.85,-81.85,26.4,-82.05,26.55,-82.1,26.5,-82.2,26.7,-82.1,26.65,-82.05,26.95,-82.2,26.9,-82.15,26.8,-82.25,26.7,-82.7,27.45,-82.75,27.55,-82.65,27.5,-82.4,27.85,-82.5,27.9,-82.45,27.8,-82.55,27.85,-82.55,27.95,-82.7,28.05,-82.7,27.95,-82.6,27.8,-82.75,27.6,-82.85,27.85,-82.85,28.2,-82.8,28.05,-82.65,28.6,-82.8,29.15,-83.05,29.15,-83.1,29.25,-83.4,29.5,-83.4,29.65,-84,30.1,-84.25,30.1,-84.35,30,-84.35,29.9,-84.55,29.9,-84.9,29.75,-84.9,29.8,-85.1,29.7,-85,29.6,-84.7,29.75,-85.05,29.6,-85.35,29.65,-85.4,29.85,-85.35,29.7,-85.3,29.8,-85.45,29.95,-86.3,30.35,-86.75,30.4,-88,30.25,-87.75,30.3,-87.9,30.4,-87.9,30.6,-88,30.7,-88.15,30.3,-88.9,30.4,-89.3,30.3,-89.3,30.4,-89.45,30.2,-89.85,30,-89.65,29.85,-89.5,30.1,-89.35,30.05,-89.45,30,-89.35,29.9,-89.2,29.95,-89.3,29.9,-89.25,29.85,-89.35,29.85,-89.3,29.75,-89.4,29.8,-89.45,29.65,-89.55,29.75,-89.5,29.6,-89.7,29.6,-89.7,29.55,-89.5,29.4,-89.2,29.35,-89.1,29.2,-89,29.2,-89.1,29.15,-89.05,29.15,-89.15,29,-89.25,29.1,-89.4,28.95,-89.3,29.2,-89.4,29.1,-89.65,29.3,-89.85,29.3,-90.2,29.1,-90.45,29.35,-90.6,29.3,-90.55,29.25,-90.85,29.05,-90.95,29.2,-91.35,29.3,-91.25,29.35,-91.1,29.25,-91.15,29.35,-91.2,29.45,-91.35,29.4,-91.35,29.5,-91.45,29.45,-91.55,29.65,-91.65,29.65,-91.6,29.75,-91.85,29.7,-91.85,29.85,-92.2,29.75,-92.1,29.6,-92,29.6,-92.25,29.55,-93.2,29.75,-93.45,29.75,-94.15,29.65,-94.75,29.35,-94.8,29.4,-94.65,29.5,-94.5,29.5,-94.75,29.55,-94.7,29.7,-94.75,29.8,-95,29.65,-94.9,29.3,-95.15,29.2,-95.15,29.1,-94.8,29.35,-94.75,29.35,-95.4,28.85,-96.35,28.4,-96.9,28.05,-97.1,27.8,-97.3,27.45,-97.3,26.7,-97.15,26.1,-97.3,26.55,-97.3,27.45,-97.1,27.9,-96.4,28.4,-96.7,28.3,-96.75,28.4,-96.8,28.2,-96.95,28.1,-97.05,28.2,-97.2,28.1,-97.05,28.1,-97,28.05,-97.2,27.85,-97.3,27.85,-97.25,27.7,-97.3,27.6,-97.3,26.15,-97.15,26.05,-97.15,25.95,-97.3,25.95,-97.3,31,-81.4,31];

// lo que va por delante de los personajes en 'general': la mesa de roble con todo lo de encima, para quien se pone
// detrás (de x 70 a 128, con los pies en y ≈ 140: se le ve de cintura para arriba). En 'tablero' y 'archivador' no hace
// nada
export function salaPronosticoDelante(R, t, o = {}) {
  if ((o.encuadre ?? 'general') === 'general') e_mesaRoble(R, t, o.luz ?? 1);
}

// los colores de la sala
const e_S = {
  pared: e_rampa('#7e9270 #92a684 #a4b894 #b4c8a4 #c4d6b2 #d4e2c2'), techo: e_rampa('#a8a492 #c4c0ae #d8d4c2 #e8e4d4'),
  roble: e_rampa('#3a2414 #5a3a1e #7a5230 #9a6c40 #b88a54 #d4a86c'), suelo: e_rampa('#6e5a48 #8e7660 #b0a084 #d2c6a8 #e2d8bc'),
  metal: e_rampa('#3a4038 #5a6258 #747c70 #8c9486 #a8b0a0 #c8d0c0'), tele: e_rampa('#3e4a44 #56645a #6e7e72 #8a9a8c #a8b8a8'),
  papel: e_rampa('#a8a290 #ccc6b2 #e6e0cc #f6f2e4'), tinta: hex('#6a6458'), corcho: e_rampa('#7a5232 #9a6a42 #b8865a #d0a272'),
  mapaTierra: hex('#e4d8ae'), mapaMar: hex('#c8dce6'), mapaPapel: hex('#ece6d0'), costa: hex('#4e6680'), isobara: hex('#6a4e3a'),
  frio: hex('#2a5ab8'), calido: hex('#c83a3a'), mujer: hex('#c8466a'), mujerS: hex('#8a2a48'), hombre: hex('#2e5aa8'), hombreS: hex('#1e3a70'),
  ficha: hex('#f4f0e2'), fichaS: hex('#d4ccb4'), marca: hex('#f0c030'), marcaS: hex('#a87a10'), luzFlexo: hex('#f8e0a0'), negro: hex('#1e1c22'), negroL: hex('#4a4852'),
  cielo: e_rampa('#3a88d8 #5aa2e4 #7ab8ec #9accf0 #bfe0f2'), nubeV: e_rampa('#a8c8e4 #d4e6f4 #ffffff'), estuco: hex('#f0e6d4'), estucoS: hex('#d0c4ae'), teja: hex('#c8643e'), tejaS: hex('#94442a'),
  palma: hex('#3a7a30'), palmaS: hex('#28562a'), palmaL: hex('#6aa84a'), tronco: hex('#a08a6a'), troncoS: hex('#76644a'), latón: hex('#c8a040'), latónL: hex('#f0d070'), latónS: hex('#8a6a20'),
};

// la parte fija de la sala (se pinta una vez por encuadre): techo, paredes, friso, suelo con su luz y sombras, y en
// 'general' el marco de la ventana, el mapa del tiempo, el listón, el calendario y el corcho del tablero; en 'tablero',
// la puerta de cristal esmerilado, el corcho con tiras de teletipo y el corcho del tablero
function e_salaFija(R, G) {
  const B = R.buf, s = G ? 1.5 : 1, yT = G ? 9 : 12, yR = G ? 120 : 94, yZ = G ? 141 : 121, yS = G ? 145 : 125, yv = G ? 84 : 70, K = (yS - yv) * (G ? 2.6 : 4);
  // el techo: placas acústicas con sus agujeritos y la perfilería en T
  for (let y = 0; y <= yT; y++) for (let x = 0; x < 320; x++) { let c = e_S.techo[2]; if (y === yT || y === Math.round(yT / 2) || x % Math.round(26 * s) === 0) c = e_S.techo[1]; else if (h(x, y, 501) < 0.12) c = e_S.techo[1]; else if (y < 3) c = e_S.techo[3]; B[y * 320 + x] = c; }
  // la moldura de roble
  for (let x = 0; x < 320; x++) { B[(yT + 1) * 320 + x] = e_S.roble[4]; B[(yT + 2) * 320 + x] = e_S.roble[3]; B[(yT + 3) * 320 + x] = e_S.roble[1]; }
  // la pared de yeso verde: textura, un poco más oscura arriba y la luz cálida que entra por la ventana (a la izquierda)
  for (let y = yT + 4; y < yR; y++) for (let x = 0; x < 320; x++) {
    let v = 3 - (y < yT + 14 ? (yT + 14 - y) / 10 : 0) + (e_vruido(x * 0.18, y * 0.18) - 0.5) * 0.9 + (h(x, y, 502) < 0.06 ? -0.6 : 0);
    if (!G) v += Math.max(0, 1.2 - Math.hypot(x - 40, (y - 60) * 0.8) / 70);
    else v += Math.max(0, 0.8 - Math.hypot(x - 300, y - 70) / 110);
    let l = Math.floor(v); if (v - l > e_BAYER[((y & 3) << 2) | (x & 3)]) l++; B[y * 320 + x] = e_S.pared[Math.max(0, Math.min(5, l))];
  }
  // la moldura del friso, el friso de tablas de roble con sus junquillos y vetas, y el rodapié
  for (let x = 0; x < 320; x++) { B[yR * 320 + x] = e_S.roble[5]; B[(yR + 1) * 320 + x] = e_S.roble[3]; B[(yR + 2) * 320 + x] = e_S.roble[1]; }
  const tabla = Math.round(7 * s);
  for (let y = yR + 3; y < yZ; y++) for (let x = 0; x < 320; x++) { const i = x % tabla; let c = i === 0 ? e_S.roble[1] : i === 1 ? e_S.roble[4] : e_vruido(x * 0.5, y * 0.07 + Math.floor(x / tabla) * 3) > 0.62 ? e_S.roble[2] : e_S.roble[3]; if (y === yR + 3) c = e_S.roble[1]; B[y * 320 + x] = c; }
  for (let y = yZ; y < yS; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === yZ ? e_S.roble[4] : y === yS - 1 ? e_S.roble[0] : e_S.roble[1];
  // el suelo de linóleo en damero, en perspectiva, con vetas de mármol y sus juntas
  for (let y = yS; y < 180; y++) for (let x = 0; x < 320; x++) {
    const zw = K / (y - yv), xw = (x - 160) * zw / 160, T = G ? 0.4 : 0.42, i = Math.floor(xw / T + 100), j = Math.floor(zw / T), fx = xw / T + 100 - i, fz = zw / T - j;
    const claro = (i + j) & 1, vet = e_vruido(xw * 16 + i * 7, zw * 26 + j * 5) > 0.74;
    let l = claro ? 3 : 1; if (vet) l += claro ? -1 : 1; if (fx < 0.05 || fz < 0.06) l = claro ? 2 : 0;
    B[y * 320 + x] = e_S.suelo[l];
  }
  const vela = (x0, y0, x1, y1, col, a, paso = 2) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if ((x + y) % paso === 0) B[y * 320 + x] = e_mezcla(B[y * 320 + x], col, a); };
  const sombraSuelo = (x0, x1, y, alto) => { for (let j = 0; j < alto; j++) for (let x = x0 - j; x <= x1 + j; x++) if (x >= 0 && x < 320 && y + j < 180 && (x + j) % 2 === 0) B[(y + j) * 320 + x] = e_mezcla(B[(y + j) * 320 + x], hex('#2a2018'), 0.45 - j * 0.1); };
  if (!G) {
    // el haz de luz de la ventana: una franja tramada que baja en diagonal hasta el suelo
    for (let y = 30; y < 126; y++) { const xa = Math.round(12 + (y - 30) * 0.42), xb = Math.round(64 + (y - 30) * 0.5); for (let x = Math.max(xa, 68); x <= xb; x++) if ((x * 3 + y) % 5 === 0) B[y * 320 + x] = e_mezcla(B[y * 320 + x], hex('#fff4d0'), 0.22); }
    // la mancha de sol de la ventana en el suelo (un trapecio que se alarga hacia la derecha)
    for (let y = yS + 2; y < 160; y++) { const u = (y - yS) / 35, xa = Math.round(14 + u * 30), xb = Math.round(62 + u * 46); for (let x = xa; x <= xb; x++) if ((x + y) % 2 === 0 && Math.abs(x - (xa + xb) / 2) > 1) B[y * 320 + x] = e_mezcla(B[y * 320 + x], hex('#fff0c8'), 0.35); }
    // el marco de la ventana (madera pintada de blanco), el alféizar y la persiana recogida arriba
    R.rect(7, 23, 67, 89, e_S.roble[0]); R.rect(8, 24, 66, 88, hex('#e8e4d8')); R.rect(8, 24, 66, 24, C.blanco); R.rect(66, 24, 66, 88, hex('#b8b4a6'));
    R.rect(4, 89, 70, 92, e_S.roble[0]); R.rect(5, 89, 69, 90, hex('#f0ece0')); R.rect(5, 91, 69, 91, hex('#c8c4b4'));
    for (let y = 93; y < 97; y++) for (let x = 6 + (y - 93); x < 68 - (y - 93); x++) if ((x + y) % 2 === 0) B[y * 320 + x] = e_mezcla(B[y * 320 + x], C.k, 0.25);
    // el mapa del tiempo con su marco, y el listón de los lápices
    R.rect(79, 23, 179, 93, e_S.roble[0]); R.rect(80, 24, 178, 92, e_S.roble[3]); R.rect(80, 24, 178, 24, e_S.roble[5]); R.rect(80, 24, 80, 92, e_S.roble[4]); R.rect(178, 25, 178, 92, e_S.roble[1]);
    e_mapaTiempo(R, 83, 27, 175, 89);
    for (let k = 0; k < 4; k++) R.pset(83 + Math.round(h(k, 1, 503) * 4) + (k % 2) * 86, 28 + (k > 1 ? 58 : 0), [C.rojo, C.amarillo, C.rojo, hex('#3a8a4a')][k]);
    R.rect(78, 93, 180, 96, e_S.roble[0]); R.rect(79, 93, 179, 94, e_S.roble[4]); R.rect(79, 95, 179, 95, e_S.roble[2]);
    for (const [x, c] of [[90, C.rojo], [96, hex('#2a5ab8')], [101, C.k], [150, hex('#2a8a4a')]]) { R.rect(x, 92, x + 4, 92, c); R.pset(x + 5, 92, hex('#e8d8b0')); }
    R.rect(120, 91, 127, 92, hex('#e0c8c8')); R.rect(120, 91, 127, 91, hex('#f0dede'));   // el borrador
    // el calendario de pared: la foto de una playa arriba y la cuadrícula de días (una casilla tachada en rojo)
    R.rect(183, 66, 199, 89, C.k); R.rect(184, 67, 198, 88, e_S.papel[3]); R.rect(185, 68, 197, 75, hex('#7ab8e0')); R.rect(185, 73, 197, 75, hex('#e8d4a0')); R.rect(185, 72, 197, 72, hex('#5a98c8')); R.pset(194, 70, C.amarillo); R.rect(188, 69, 188, 72, e_S.tronco); R.pset(187, 69, e_S.palma); R.pset(189, 69, e_S.palma);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.pset(186 + i * 2, 78 + j * 3, (i + j * 6) === 15 ? C.rojo : e_S.tinta);
    R.pset(191, 65, e_S.latónS);
    // el corcho del tablero de las listas
    e_corcho(R, 204, 22, 270, 92);
    // las sombras de los muebles en el suelo
    sombraSuelo(18, 46, 148, 3); sombraSuelo(66, 146, 152, 3); sombraSuelo(164, 258, 163, 3); sombraSuelo(276, 314, 150, 3);
  } else {
    // la puerta del pasillo, de roble con su cristal esmerilado, a la izquierda
    R.rect(8, 20, 50, 145, e_S.roble[0]); R.rect(9, 21, 49, 144, e_S.roble[3]); R.rect(9, 21, 49, 21, e_S.roble[5]); R.rect(9, 21, 9, 144, e_S.roble[4]);
    R.rect(12, 26, 46, 96, e_S.roble[1]); for (let y = 27; y <= 95; y++) for (let x = 13; x <= 45; x++) B[y * 320 + x] = h(x, y, 504) < 0.3 ? hex('#c8d4cc') : (x + y) % 3 ? hex('#dce4dc') : hex('#e8eee6');
    for (const [y0, y1] of [[102, 121], [125, 141]]) { R.rect(13, y0, 45, y1, e_S.roble[1]); R.rect(14, y0 + 1, 44, y1 - 1, e_S.roble[3]); R.rect(14, y0 + 1, 44, y0 + 1, e_S.roble[4]); }
    R.disco(45, 106, 2, e_S.latónS); R.pset(44, 105, e_S.latónL);
    for (let y = 97; y < 100; y++) R.rect(12, y, 46, y, e_S.roble[2]);
    // el corcho del tablero de las listas
    e_corcho(R, 62, 16, 222, 118);
    // la tira de corcho con dos tiras de teletipo, bajo el reloj
    R.rect(227, 48, 246, 106, e_S.roble[1]); e_corcho(R, 228, 49, 245, 105, true);
    for (let k = 0; k < 2; k++) { const x = 230 + k * 8, y = 52 + k * 6, l = 40 - k * 8; R.rect(x, y, x + 6, y + l, e_S.papel[3]); R.rect(x + 6, y, x + 6, y + l, e_S.papel[1]); for (let i = 3; i < l - 1; i += 2) R.rect(x + 1, y + i, x + 1 + Math.round(2 + h(k, i, 505) * 3), y + i, e_S.tinta); R.pset(x + 3, y + 1, C.rojo); }
    sombraSuelo(248, 306, 160, 4);
  }
}

// un tablero de corcho con su marco de roble (o sin marco, el pequeño): el corcho moteado y algún agujero de chincheta
function e_corcho(R, x0, y0, x1, y1, sinMarco = false) {
  if (!sinMarco) { R.rect(x0, y0, x1, y1, e_S.roble[0]); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, e_S.roble[4]); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, e_S.roble[1]); R.rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, e_S.roble[1]); }
  const m = sinMarco ? 0 : 2;
  for (let y = y0 + m; y <= y1 - m; y++) for (let x = x0 + m; x <= x1 - m; x++) { const n = h(x, y, 506); R.pset(x, y, n < 0.18 ? e_S.corcho[1] : n > 0.9 ? e_S.corcho[3] : e_S.corcho[2]); }
  for (let k = 0; k < 10; k++) R.pset(x0 + 3 + Math.floor(h(k, x0, 507) * (x1 - x0 - 6)), y0 + 3 + Math.floor(h(k, y0, 508) * (y1 - y0 - 6)), e_S.corcho[0]);
}

// el mapa del tiempo de superficie en [x0, x1] × [y0, y1] (lon −100…−56, lat 8…38): el papel con la tierra y el mar,
// las costas de verdad, la cuadrícula, las isobaras cada 4 hPa con sus números, la baja del huracán junto a las Bahamas
// y el anticiclón de las Azores-Bermudas, los frentes, las observaciones de estación y la trayectoria en puntos rojos
function e_mapaTiempo(R, x0, y0, x1, y1) {
  const W = x1 - x0, H = y1 - y0, lon = (x) => -100 + (x - x0) / W * 44, lat = (y) => 38 - (y - y0) / H * 30;
  const X = (lo) => Math.round(x0 + (lo + 100) / 44 * W), Y = (la) => Math.round(y0 + (38 - la) / 30 * H);
  const pres = (x, y) => { const lo = lon(x), la = lat(y); return 1013 - 17 * Math.exp(-(((lo + 68) * 0.95) ** 2 + (la - 21) ** 2) / 34) + 9 * Math.exp(-(((lo + 60) / 9) ** 2 + ((la - 33) / 6) ** 2)) - 6 * Math.exp(-(((lo + 92) / 7) ** 2 + ((la - 36) / 5) ** 2)) + (la - 23) * 0.15; };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const t = e_suelo(lat(y), lon(x)) === 2; R.pset(x, y, t ? e_S.mapaTierra : e_S.mapaMar); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const t = e_suelo(lat(y), lon(x)) === 2; if (t && (e_suelo(lat(y), lon(x + 1)) !== 2 || e_suelo(lat(y + 1), lon(x)) !== 2 || e_suelo(lat(y), lon(x - 1)) !== 2 || e_suelo(lat(y - 1), lon(x)) !== 2)) R.pset(x, y, e_S.costa); }
  for (let lo = -95; lo < -56; lo += 10) for (let y = y0; y <= y1; y += 2) R.pset(X(lo), y, hex('#c8ccc4'));
  for (let la = 10; la < 38; la += 10) for (let x = x0; x <= x1; x += 2) R.pset(x, Y(la), hex('#c8ccc4'));
  // las isobaras: donde el escalón de 4 hPa cambia con el vecino
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = Math.floor(pres(x, y) / 4), b = Math.floor(pres(x + 1, y) / 4), c = Math.floor(pres(x, y + 1) / 4); if (a !== b || a !== c) R.pset(x, y, e_S.isobara); }
  for (const [lo, la, n] of [[-98, 30, '1012'], [-64, 36.3, '1020'], [-90, 15, '1008']]) e_cifras(R, n, X(lo), Y(la), e_S.isobara);
  // el frente frío (triángulos azules hacia el sureste) y el cálido (semicírculos rojos)
  const fr = [[-99, 30], [-94, 33], [-89, 35.5], [-84, 37.5]];
  for (let i = 1; i < fr.length; i++) R.linea(X(fr[i - 1][0]), Y(fr[i - 1][1]), X(fr[i][0]), Y(fr[i][1]), e_S.frio);
  for (let i = 0; i < 6; i++) { const u = (i + 0.5) / 6, k = Math.min(2, Math.floor(u * 3)), f = u * 3 - k, x = Math.round(X(fr[k][0]) + (X(fr[k + 1][0]) - X(fr[k][0])) * f), y = Math.round(Y(fr[k][1]) + (Y(fr[k + 1][1]) - Y(fr[k][1])) * f); R.pset(x + 1, y + 1, e_S.frio); R.pset(x + 1, y + 2, e_S.frio); R.pset(x, y + 1, e_S.frio); R.pset(x + 2, y + 1, e_S.frio); }
  const fc = [[-84, 37.5], [-76, 36.5], [-68, 37.5]];
  for (let i = 1; i < fc.length; i++) R.linea(X(fc[i - 1][0]), Y(fc[i - 1][1]), X(fc[i][0]), Y(fc[i][1]), e_S.calido);
  for (let i = 0; i < 4; i++) { const x = X(-82 + i * 4), y = Y(37.2 - (i === 1 || i === 2 ? 0.5 : 0)); R.pset(x, y - 1, e_S.calido); R.pset(x + 1, y - 1, e_S.calido); R.pset(x, y - 2, e_S.calido); }
  // observaciones de estación: un circulito con su barba de viento
  for (let k = 0; k < 14; k++) { const lo = -98 + h(k, 1, 509) * 40, la = 10 + h(k, 2, 509) * 26, x = X(lo), y = Y(la), a = Math.atan2(la - 21, lo + 68) + 1.9;
    R.pset(x, y, C.k); R.pset(x + 1, y, C.k); R.pset(x, y + 1, C.k); R.pset(x + 1, y + 1, h(k, 3, 509) < 0.5 ? C.k : e_S.mapaPapel);
    for (let i = 2; i < 5; i++) R.pset(Math.round(x + Math.cos(a) * i), Math.round(y - Math.sin(a) * i), C.k); }
  // la trayectoria del huracán: puntos rojos que vienen de las Antillas
  for (const [lo, la] of [[-55, 13.5], [-57.5, 14.8], [-60, 16.1], [-62.5, 17.4], [-65, 18.7]]) { R.pset(X(lo), Y(la), e_S.calido); R.pset(X(lo) + 1, Y(la), e_S.calido); }
}

// lo que se mueve en el mapa: el símbolo del huracán, que parpadea, y la previsión, que se va dibujando a trazos
function e_mapaVivo(R, t) {
  const X = (lo) => Math.round(83 + (lo + 100) / 44 * 92), Y = (la) => Math.round(27 + (38 - la) / 30 * 62);
  const x = X(-68), y = Y(21), on = Math.sin(t * 4) > -0.3;
  if (on) e_simboloHuracan(R, x, y, e_S.calido);
  const u = (t % 6) / 6;
  for (let i = 0; i < 12 * u; i++) if (i % 3 < 2) R.pset(Math.round(x - i * 0.9), Math.round(y - 2 - i * 0.55), e_S.calido);
}

// el reloj de pared redondo: aro (de roble o de latón), esfera con sus marcas, horario, minutero y el segundero rojo que
// salta cada segundo
function e_reloj(R, t, cx, cy, r) {
  R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, e_S.roble[2]); R.disco(cx, cy, r - 1, e_S.roble[4]); R.disco(cx, cy, r - 2, e_S.papel[3]);
  R.pset(cx - Math.round(r * 0.5), cy - Math.round(r * 0.6), C.blanco);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), k % 3 ? e_S.papel[0] : C.k); }
  const m = (t / 60 + 0.62) * Math.PI * 2 - Math.PI / 2, hh = (10.4 / 12 + t / 43200) * Math.PI * 2 - Math.PI / 2, s = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  R.linea(cx, cy, Math.round(cx + Math.cos(hh) * r * 0.45), Math.round(cy + Math.sin(hh) * r * 0.45), C.k);
  R.linea(cx, cy, Math.round(cx + Math.cos(m) * r * 0.72), Math.round(cy + Math.sin(m) * r * 0.72), C.k);
  R.linea(cx, cy, Math.round(cx + Math.cos(s) * r * 0.78), Math.round(cy + Math.sin(s) * r * 0.78), C.rojo); R.pset(cx, cy, C.rojo);
}

// el barómetro aneroide de latón: aro brillante, esfera con su arco de marcas y la aguja, que tiembla
function e_barometro(R, t, cx, cy, r) {
  R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, e_S.latón); R.disco(cx - 1, cy - 1, r - 1, e_S.latónL); R.disco(cx, cy, r - 1, e_S.latón); R.disco(cx, cy, r - 2, e_S.papel[3]);
  for (let k = 0; k <= 8; k++) { const a = Math.PI * (0.8 + k * 0.175); R.pset(Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), k === 2 ? C.rojo : e_S.papel[0]); }
  const a = Math.PI * 1.15 + Math.sin(t * 7) * 0.04 + Math.sin(t * 1.3) * 0.05;
  R.linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), C.k); R.pset(cx, cy, e_S.latónS);
}

// la ventana en 'general' (cristal de x 11 a 63 y de y 27 a 85): fuera, el cielo de Florida, los cúmulos, las casas de
// estuco con teja, el seto, la calle con un coche que pasa, dos cocoteros y pelícanos (recortado a su hueco); dentro,
// el parteluz, el travesaño, la persiana recogida con su cordón que se balancea y una planta en el alféizar
function e_ventana(R, t) {
  const x0 = 11, x1 = 63, y0 = 27, y1 = 85;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (70 - y0) * 4; for (let x = x0; x <= x1; x++) { let l = Math.floor(v); if (v - l > e_BAYER[((y & 3) << 2) | (x & 3)]) l++; R.pset(x, y, e_S.cielo[Math.max(0, Math.min(4, l))]); } }
  R.recorte([x0, y0, x1, y1]);
  for (let k = 0; k < 3; k++) { const w = [16, 11, 22][k], x = Math.round(((t * [1.2, 0.7, 1.8][k] + k * 41) % 100) + x0 - 24), y = [40, 50, 34][k]; e_cumulo(R, x, y, w, k); }
  // los pelícanos que pasan en fila
  { const u = ((t + 2) % 16) / 16, bx = Math.round(x0 - 10 + u * 80); for (let i = 0; i < 3; i++) { const x = bx - i * 6, y = 46 + i * 2 + Math.round(Math.sin(t * 2 + i) * 1), al = Math.sin(t * 6 + i) > 0; R.pset(x, y, C.k); R.pset(x - 1, y - (al ? 1 : 0), C.k); R.pset(x + 1, y - (al ? 1 : 0), C.k); R.pset(x - 2, y - (al ? 1 : -1), C.k); R.pset(x + 2, y - (al ? 1 : -1), C.k); R.pset(x + 1, y + 1, hex('#e8c060')); } }
  // las casas de estuco con su teja roja, el seto y la calle
  for (const [a, b, top] of [[x0 - 2, 30, 66], [30, 50, 68], [48, x1 + 2, 64]]) { R.rect(a, top, b, 76, e_S.estuco); R.rect(a, top, b, top, e_S.estucoS); R.poligono([[a - 2, top], [b + 2, top], [b - 3, top - 4], [a + 3, top - 4]], e_S.teja); R.rect(a + 3, top - 4, b - 3, top - 4, e_S.tejaS); for (let x = a + 3; x < b - 2; x += 6) { R.rect(x, top + 3, x + 2, top + 6, hex('#5a8ab0')); R.pset(x, top + 3, hex('#8ab8d8')); } }
  for (let x = x0; x <= x1; x++) { const yy = 74 + Math.round(Math.sin(x * 0.7) * 0.8); R.rect(x, yy, x, 79, x % 3 ? hex('#3a7a3a') : hex('#2a5e2a')); }
  R.rect(x0, 80, x1, 85, hex('#8a8a90')); R.rect(x0, 82, x1, 82, hex('#c8c8b0'));
  { const u = (t % 9) / 9, cx = Math.round(x0 - 20 + u * 90); R.rect(cx, 79, cx + 13, 82, hex('#5ab0c0')); R.rect(cx + 3, 77, cx + 10, 79, hex('#5ab0c0')); R.rect(cx + 4, 78, cx + 9, 78, hex('#c8e8f0')); R.rect(cx, 81, cx + 13, 81, C.blanco); R.pset(cx + 2, 83, C.k); R.pset(cx + 11, 83, C.k); R.pset(cx + 13, 80, C.amarillo); }
  e_cocotero(R, t, 54, 85, 46, 0); e_cocotero(R, t, 20, 80, 28, 2);
  R.recorte(null);
  // el parteluz y el travesaño, con su reflejo
  R.rect(36, y0, 38, y1, hex('#e8e4d8')); R.rect(38, y0, 38, y1, hex('#b8b4a6')); R.rect(x0, 46, x1, 47, hex('#e8e4d8')); R.rect(x0, 48, x1, 48, hex('#b8b4a6'));
  for (const [px, py, n] of [[14, 50, 9], [17, 50, 5], [41, 52, 10]]) for (let i = 0; i < n; i++) { const x = px + i, y = py + i * 2; if (y <= y1) R.pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.35)); }
  // la persiana recogida arriba: las lamas apretadas y el cordón que se balancea con su borla
  for (let y = y0; y < y0 + 7; y++) R.rect(x0 - 1, y, x1 + 1, y, y % 2 ? hex('#e8e0c8') : hex('#c8c0a6'));
  R.rect(x0 - 1, y0 + 7, x1 + 1, y0 + 7, hex('#8a8270'));
  { const sw = Math.sin(t * 1.4) * 2; R.linea(58, y0 + 8, Math.round(58 + sw), 62, hex('#e8e0c8')); R.rect(Math.round(57 + sw), 62, Math.round(59 + sw), 65, hex('#c8c0a6')); }
  // la planta en el alféizar (lengua de suegra) en su maceta
  R.rect(14, 82, 22, 89, C.k); R.rect(15, 83, 21, 89, hex('#c86a3a')); R.rect(15, 83, 21, 84, hex('#e08a5a'));
  for (const [dx, al] of [[0, 9], [2, 12], [4, 10], [6, 8]]) for (let j = 0; j < al; j++) { const x = 15 + dx + Math.round(Math.sin(j * 0.3 + dx) * 0.6), y = 82 - j; R.pset(x, y, j % 3 ? hex('#4a8a3a') : hex('#c8c060')); R.pset(x + 1, y, hex('#2e6a2a')); }
}

// un cúmulo pequeño de tres tonos para la ventana (lo recorta R.recorte)
function e_cumulo(R, cx, cy, w, k) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]].map(([a, b, r]) => [cx + a * w + (h(k, a * 9, 510) - 0.5) * 2, cy + b * w, Math.max(1, r * w)]);
  for (const [x, y, r] of B) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), e_S.nubeV[0]);
  for (const [x, y, r] of B) R.disco(Math.round(x), Math.round(y), Math.round(r), e_S.nubeV[1]);
  for (const [x, y, r] of B) R.disco(Math.round(x - 1), Math.round(y - 1), Math.round(r * 0.7), e_S.nubeV[2]);
  R.linea(Math.round(cx - w * 0.45), Math.round(cy + w * 0.25), Math.round(cx + w * 0.45), Math.round(cy + w * 0.25), e_S.nubeV[0]);
}

// un cocotero que se mece (x, suelo: el pie; alto en px; k desfasa): tronco curvo con sus anillos, cocos y las palmas
// en arco con los foliolos colgando, en tres tonos
function e_cocotero(R, t, x, suelo, alto, k) {
  const m = Math.sin(t * 1.2 + k) * 1.6;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + Math.sin(u * 1.7) * 5 + m * u * u); R.pset(px, suelo - j, j % 3 ? e_S.tronco : e_S.troncoS); R.pset(px + 1, suelo - j, e_S.troncoS); }
  const tx = Math.round(x + Math.sin(1.7) * 5 + m), ty = suelo - alto;
  for (let f = 0; f < 9; f++) { const a = -Math.PI * 1.05 + f * Math.PI * 1.1 / 8 + Math.sin(t * 2 + f + k) * 0.08, l = 9 + (f % 3) * 2;
    for (let d = 1; d < l; d++) { const xx = Math.round(tx + Math.cos(a) * d), yy = Math.round(ty + Math.sin(a) * d * 0.55 + d * d / 16); R.pset(xx, yy, d > l - 3 ? e_S.palmaS : f % 2 ? e_S.palma : e_S.palmaL); if (d > 2 && d % 2 === 0) R.pset(xx, yy + 1, e_S.palmaS); } }
  R.pset(tx, ty + 1, hex('#6a4a2a')); R.pset(tx + 1, ty + 2, hex('#6a4a2a'));
}

// el tablero de las seis listas (marco x0–x1 × y0–y1, s = 1 o 2 la escala de las fichas): el contador del año en su
// placa de la cabecera, los números 1–6 de las columnas y las fichas de cartulina clavadas con su pictograma de mujer
// (rosa, falda) o de hombre (azul, hombros); el marco amarillo de la lista en uso, con un brillo que baja, y las fichas
// que se dan la vuelta con o.alternos
function e_tablero(R, t, x0, y0, x1, y1, s, col, año, alt, L) {
  const cw = s === 1 ? 10 : 25, cx0 = x0 + (s === 1 ? 5 : 11), fy = y0 + (s === 1 ? 19 : 30), filas = s === 1 ? 5 : 4, fh = s === 1 ? 9 : 17, fw = s === 1 ? 7 : 14, fhh = s === 1 ? 9 : 16;
  // la placa del año
  if (col >= 0) { const w = s === 1 ? 19 : 35, hp = s === 1 ? 7 : 13, px = s === 1 ? Math.round((x0 + x1) / 2 - w / 2) : x1 - w - 8, py = y0 + 2; R.rect(px, py, px + w, py + hp, C.k); R.rect(px + 1, py + 1, px + w - 1, py + hp - 1, hex('#2a2a30'));
    if (s === 2) { R.rect(px + 1, py + 1, px + w - 1, py + 1, hex('#4a4a52')); for (let i = 0; i < 4; i++) R.rect(px + 2 + i * 8, py + 2, px + 8 + i * 8, py + hp - 2, hex('#1c1c22')); }
    e_cifras(R, String(año), px + (s === 1 ? 2 : 3), py + (s === 1 ? 1 : 2), e_S.marca, s === 1 ? 1 : 2);
    if (s === 2) for (let i = 0; i < 4; i++) R.rect(px + 2 + i * 8, py + 7, px + 8 + i * 8, py + 7, hex('#16161a')); }
  for (let c = 0; c < 6; c++) {
    const x = cx0 + c * cw, act = c === col;
    e_cifras(R, String(c + 1), x + Math.round(fw / 2) - (s === 1 ? 1 : 3), fy - (s === 1 ? 7 : 13), act ? e_S.marca : hex('#3a2a1a'), s);
    for (let r = 0; r < filas; r++) {
      const y = fy + r * fh, hombre = (c + r) % 2 === 1, th = 0.08 + (((c * 7 + r * 5) % 24) / 24) * 0.8, d = alt - th;
      let w = 1, esH = hombre && d > 0; if (hombre && Math.abs(d) < 0.05) w = Math.abs(Math.cos((d + 0.05) / 0.1 * Math.PI));
      const ww = Math.max(1, Math.round(fw * w)), xa = x + Math.round((fw - ww) / 2);
      R.rect(xa + 1, y + 1, xa + ww, y + fhh, e_S.corcho[0]);   // la sombra de la ficha
      R.rect(xa, y, xa + ww - 1, y + fhh - 1, e_S.ficha); R.rect(xa, y + fhh - 1, xa + ww - 1, y + fhh - 1, e_S.fichaS);
      if (w > 0.6) { const P = esH ? e_PICTO.hombre : e_PICTO.mujer, k = s === 1 ? 1 : 2, px = x + Math.round((fw - 5 * k) / 2), py = y + (s === 1 ? 1 : 1);
        P.forEach((fila, j) => { for (let i = 0; i < 5; i++) if (fila[i] === '#') R.rect(px + i * k, py + j * k, px + i * k + k - 1, py + j * k + k - 1, i > 2 && j > 2 ? (esH ? e_S.hombreS : e_S.mujerS) : esH ? e_S.hombre : e_S.mujer); }); }
      R.pset(x + Math.round(fw / 2), y, C.rojo);   // la chincheta
    }
    if (act) { const ya = fy - (s === 1 ? 9 : 15), yb = fy + filas * fh, fr = ((L % 1) + 1) % 1 < 0.12 ? (Math.floor(t * 12) % 2 ? e_S.marca : C.blanco) : e_S.marca;
      R.rect(x - 2, ya, x + fw + 1, ya, fr); R.rect(x - 2, yb, x + fw + 1, yb, fr); R.rect(x - 2, ya, x - 2, yb, fr); R.rect(x + fw + 1, ya, x + fw + 1, yb, fr);
      // un brillo que baja por la lista en uso
      const gy = Math.round(ya + ((t * 30) % (yb - ya + 20))); if (gy < yb) { R.pset(x - 2, gy, C.blanco); R.pset(x + fw + 1, gy, C.blanco); } }
  }
}

// los pictogramas de las fichas (5 × 7): mujer, con falda; hombre, con hombros
const e_PICTO = { mujer: ['.###.', '.###.', '..#..', '.###.', '.###.', '#####', '.#.#.'], hombre: ['.###.', '.###.', '..#..', '#####', '.###.', '.###.', '.#.#.'] };

// cifras diminutas de 3 × 5 (copiadas de th-comun.js), con escala s
const e_DIGITOS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

// escribe las cifras de txt desde (x, y) con el color c (s: escala de cada píxel)
function e_cifras(R, txt, x, y, c, s = 1) { for (const ch of txt) { const g = e_DIGITOS[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); x += 4 * s; } }

// el archivador metálico de cuatro cajones (x0–x1 × y0–y1, el pie en y1), a cualquier escala: la chapa verde oliva
// cepillada, más clara arriba a la izquierda, con sus cantos de luz y de sombra; cada cajón con el portaetiquetas y su
// ficha, el tirador cromado con su sombra, tornillos y algún arañazo; la cerradura y el zócalo. El segundo cajón es el de
// los nombres retirados (etiqueta roja con un aspa). Encima, la cafetera de filtro humeante, dos tazas y archivadores de
// anillas. caj (o.cajon): el cajón abierto con las fichas asomando (con sus pestañas y, de cerca, los pictogramas, alguno
// tachado), que se cierra de golpe: temblor, nubecillas de polvo por las rendijas, las tazas que saltan, la etiqueta que
// vibra y una ficha que se escapa, da vueltas en el aire y cae revoloteando hacia la sala
function e_archivador(R, t, x0, y0, x1, y1, caj, cafeDer = false) {
  const s = (x1 - x0) / 38, si = Math.min(s, 2), M = e_S.metal, hay = caj != null, op = !hay ? 0 : caj < 0.55 ? 1 - (caj / 0.55) ** 2 : 0, e = hay && caj >= 0.55 ? (caj - 0.55) / 0.45 : -1;
  const tiembla = e >= 0 && e < 0.35 ? Math.round(Math.sin(e * 60) * (1 - e / 0.35) * Math.max(1, s * 0.7)) : 0, X0 = x0 + tiembla, X1 = x1 + tiembla;
  const salto = (k) => e >= 0 && e < 0.5 ? Math.round(Math.abs(Math.sin(e * Math.PI * 4 + k)) * (1 - e * 2) * 3 * si) : 0;
  // lo de encima: la cafetera, dos tazas y los archivadores de anillas (saltan con el golpe)
  e_cafetera(R, t, Math.round(X0 + (cafeDer ? 27 : 6) * s), y0 - 1 - salto(0), si);
  for (const [dx, c, k] of (cafeDer ? [[13, hex('#e8e4d8'), 1], [19, hex('#c84a3a'), 2]] : [[18, hex('#e8e4d8'), 1], [23.5, hex('#c84a3a'), 2]])) { const x = Math.round(X0 + dx * s), y = y0 - 1 - salto(k), w = Math.round(4 * si), hh = Math.round(5 * si);
    R.rect(x - 1, y - hh, x + w, y, C.k); R.rect(x, y - hh + 1, x + w - 1, y - 1, c); R.rect(x, y - hh + 1, x + w - 1, y - hh + 1, hex('#3a2414')); R.rect(x, y - hh + 2, x, y - 2, e_mezcla(c, C.blanco, 0.5));
    R.rect(x + w + 1, y - hh + 2, x + w + Math.round(si), y - 2, C.k); if (si > 1.4) R.pset(x + w + 1, y - hh + 3, c); }
  { const x = Math.round(X0 + (cafeDer ? 3 : 29) * s), y = y0 - 1; for (let k = 0; k < 3; k++) { const c = [hex('#3a5a8a'), hex('#8a3a3a'), hex('#3a6a4a')][k], xx = x + Math.round(k * 2.4 * si), w = Math.round(2.2 * si), hh = Math.round(9 * si) - k;
    R.rect(xx, y - hh, xx + w, y, C.k); R.rect(xx + 1, y - hh + 1, xx + w - 1 + (si < 1.5 ? 1 : 0), y - 1, c); R.rect(xx + 1, y - Math.round(hh * 0.6), xx + w - 1, y - Math.round(hh * 0.6) + Math.round(si * 0.6), e_S.ficha); } }
  // la chapa cepillada: más clara arriba a la izquierda, con vetas finas
  const chapa = (xa, ya, xb, yb, base) => { for (let y = Math.max(0, ya); y <= Math.min(179, yb); y++) for (let x = Math.max(0, xa); x <= Math.min(319, xb); x++) {
    let v = base + 0.5 - (y - ya) / Math.max(1, yb - ya) * 0.9 - (x - xa) / Math.max(1, xb - xa) * 0.4 + (e_vruido(x * 0.7 / s, y * 0.06 + xa) - 0.5) * 0.8; let l = Math.floor(v); if (v - l > e_BAYER[((y & 3) << 2) | (x & 3)]) l++; R.pset(x, y, M[Math.max(1, Math.min(5, l))]); } };
  R.rect(X0, y0, X1, y1, M[0]); chapa(X0 + 1, y0 + 1, X1 - 1, y1 - 1, 2.6); R.rect(X0 + 1, y0 + 1, X1 - 1, y0 + 1, M[5]); R.rect(X0 + 1, y0 + 1, X0 + 1, y1 - 1, M[4]); R.rect(X1 - Math.max(1, Math.round(s)), y0 + 2, X1 - 1, y1 - 1, M[1]);
  const top = y0 + Math.round(3 * s), cajH = (y1 - Math.round(6 * s) - top) / 4;
  for (const k of [0, 2, 3, 1]) {   // el de los retirados, el último: cuando está abierto queda por delante
    const a = Math.round(top + k * cajH), b = Math.round(top + (k + 1) * cajH) - 1, abre = k === 1 ? op : 0, dy = Math.round(abre * 5 * s), dx = Math.round(abre * s);
    if (abre > 0) {   // el hueco, el interior con las fichas que asoman y los costados del cajón
      R.rect(X0 + 2, a, X1 - 3, b, M[0]);
      const fa = a + dy, n = 14, cw = Math.max(2, Math.floor((X1 - X0 - 10) / n));
      for (let i = 0; i < n; i++) { const fx = X0 + 5 + i * cw, ch = Math.round((3 + (i % 3) * 0.8) * s * abre) + 1, yt = fa - ch, tab = i % 3 === 1 ? hex('#e8a0a0') : i % 3 === 2 ? hex('#a0c0e8') : e_S.ficha, tw = Math.max(1, Math.round(cw * 0.45)), tx = fx + (i % 2 ? cw - 1 - tw : 0);
        R.rect(fx, yt, fx + cw - 1, fa, e_S.ficha); R.rect(fx + cw - 1, yt, fx + cw - 1, fa, e_S.fichaS); R.rect(tx, yt - Math.max(1, Math.round(s * 0.8)), tx + tw - 1, yt, tab);
        if (s >= 2.5 && ch > 9) { const P = i % 2 ? e_PICTO.hombre : e_PICTO.mujer, px = fx + Math.round((cw - 5) / 2), py = yt + 2; P.forEach((f, j) => { for (let q = 0; q < 5; q++) if (f[q] === '#') R.pset(px + q, py + j, i % 2 ? e_S.hombre : e_S.mujer); });
          if (i % 4 === 2) { R.linea(px - 1, py, px + 5, py + 6, C.rojo); R.linea(px + 5, py, px - 1, py + 6, C.rojo); } } }
      R.rect(X0 + 2 - dx, a - 1 + dy - Math.round(3 * s * abre), X0 + 3 - dx, b + dy, M[1]); R.rect(X1 - 4 + dx, a - 1 + dy - Math.round(3 * s * abre), X1 - 3 + dx, b + dy, M[1]);
      R.rect(X0 + 2 - dx, b + dy + 1, X1 - 3 + dx, b + dy + Math.max(1, Math.round(s)), e_mezcla(M[0], C.k, 0.3));   // su sombra
    } else R.rect(X0 + 2, b + 1, X1 - 3, b + 1, M[0]);   // la rendija
    const fa = a + dy, fb = b + dy, fx0 = X0 + 2 - dx, fx1 = X1 - 3 + dx;
    R.rect(fx0, fa, fx1, fb, M[0]); chapa(fx0 + 1, fa + 1, fx1 - 1, fb - 1, 2.9); R.rect(fx0 + 1, fa + 1, fx1 - 1, fa + 1, M[5]); R.rect(fx0 + 1, fb - 1, fx1 - 1, fb - 1, M[1]); R.rect(fx1 - 1, fa + 2, fx1 - 1, fb - 1, M[2]);
    if (s >= 1.4) for (const [px, py] of [[fx0 + 3, fa + 3], [fx1 - 3, fa + 3], [fx0 + 3, fb - 3], [fx1 - 3, fb - 3]]) { R.pset(px, py, M[1]); R.pset(px - 1, py - 1, M[5]); }   // los tornillos
    if (s >= 2) for (let q = 0; q < 2; q++) { const sx = fx0 + 8 + Math.floor(h(k, q, 515) * (fx1 - fx0 - 30)), sy = fa + 6 + Math.floor(h(k, q + 2, 515) * Math.max(1, fb - fa - 12)); R.linea(sx, sy, sx + Math.round(6 * s * h(q, k, 516) + 4), sy + 1 + q, M[4]); }   // arañazos
    // el portaetiquetas con su ficha (la roja con el aspa, la de los retirados) y el tirador cromado con su sombra
    const mx = Math.round((fx0 + fx1) / 2), lw = Math.round(5 * s), lh = Math.max(2, Math.round(2.2 * s)), ly = fa + Math.round(2.5 * s);
    R.rect(mx - lw - 1, ly - 1, mx + lw + 1, ly + lh + 1, M[1]); R.rect(mx - lw - 1, ly - 1, mx + lw + 1, ly - 1, M[5]); R.rect(mx - lw, ly, mx + lw, ly + lh, k === 1 ? hex('#c83a3a') : e_S.ficha);
    if (k === 1) { const tb = e >= 0 && e < 0.4 ? Math.round(Math.sin(e * 50) * 1.5) : 0, d = Math.min(lh, Math.round(lh * 0.8)); R.linea(mx - d + tb, ly, mx + d + tb, ly + lh, C.blanco); R.linea(mx + d + tb, ly, mx - d + tb, ly + lh, C.blanco); }
    else for (let i = mx - lw + 1; i < mx + lw; i += 2) R.pset(i, ly + Math.round(lh / 2), h(i, k, 517) < 0.7 ? e_S.tinta : e_S.ficha);
    const hy = ly + lh + Math.round(2.5 * s), hw = Math.round(6 * s), hg = Math.max(1, Math.round(s * 0.9));
    R.rect(mx - hw + 1, hy + hg + 1, mx + hw + 1, hy + hg + Math.max(1, Math.round(s * 0.6)), M[1]);   // la sombra del tirador
    R.rect(mx - hw, hy, mx + hw, hy + hg, C.k); R.rect(mx - hw, hy, mx + hw, hy, M[5]); if (hg > 1) R.rect(mx - hw + 1, hy + 1, mx + hw - 1, hy + hg - 1, e_S.metal[4]); R.pset(mx - hw + 2, hy, C.blanco); R.pset(mx - hw + 3, hy, C.blanco);
  }
  R.disco(Math.round(X1 - 5 * s), y0 + Math.round(1.6 * s), Math.max(1, Math.round(s * 0.8)), M[5]); R.pset(Math.round(X1 - 5 * s), y0 + Math.round(1.6 * s), M[1]);   // la cerradura
  R.rect(X0 + 1, y1 - Math.round(4 * s), X1 - 1, y1 - 1, M[1]); R.rect(X0 + 1, y1 - Math.round(4 * s), X1 - 1, y1 - Math.round(4 * s), M[0]);   // el zócalo
  // el golpe: nubecillas de polvo por las rendijas del cajón, y la ficha que se escapa
  if (e >= 0 && e < 0.85) { const a = Math.round(top + cajH), q = e / 0.85;
    for (let i = 0; i < 16; i++) { const lado = i % 3 === 0 ? 0 : i % 3 === 1 ? -1 : 1, v = (6 + h(i, 2, 511) * 12) * s, px = lado === 0 ? X0 + (h(i, 1, 511) * 0.8 + 0.1) * (X1 - X0) : (lado > 0 ? X1 + 1 : X0 - 1) + lado * v * Math.sqrt(q), py = (lado === 0 ? a - 2 - v * 0.4 * Math.sqrt(q) : a + h(i, 3, 511) * cajH * 0.8) - q * 5 * si, r = (1.5 + q * 5) * si * (0.6 + h(i, 4, 511) * 0.6) * (s > 2 ? 1.6 : 1), den = (1 - q) * 1.3;
      for (let yy = Math.floor(py - r); yy <= py + r; yy++) for (let xx = Math.floor(px - r); xx <= px + r; xx++) { const d = Math.hypot(xx + 0.5 - px, yy + 0.5 - py) / r; if (d <= 1 && e_BAYER[((yy & 3) << 2) | (xx & 3)] < den * (1.2 - d)) R.pset(xx, yy, d < 0.5 ? hex('#e8e2d4') : hex('#c8c0b0')); } } }
  if (e >= 0) { const q = Math.min(1, e / 0.95), x = Math.round(X0 + (X1 - X0) * 0.5 - q * (X1 - X0) * 0.9 - Math.sin(q * 9) * 5 * si * (1 - q)), up = Math.sin(Math.min(1, q * 2.4) * Math.PI / 2) * 14 * si, fall = Math.max(0, q - 0.38) / 0.62, y = Math.round(top + cajH - up + fall * fall * (y1 - top - cajH + 14 * si) - (q >= 1 ? 1 : 0));
    const W = Math.round(6 * si), Hh = Math.round(8 * si), fl = q >= 1 ? 1 : Math.abs(Math.cos(q * 11)), w = Math.max(1, Math.round(W * fl)), hh = q >= 1 ? Math.max(2, Math.round(si)) : Hh;
    R.rect(x - Math.floor(w / 2) - 1, y - 1, x + Math.ceil(w / 2), y + hh, C.k); R.rect(x - Math.floor(w / 2), y, x + Math.ceil(w / 2) - 1, y + hh - 1, e_S.ficha);
    if (q < 1 && w > 4) { const P = e_PICTO.mujer, px = x - 2, py = y + Math.max(1, Math.round((hh - 7) / 2)); P.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.pset(px + i, py + j, e_S.mujer); }); }
    if (q > 0.5 && q < 1) for (let i = 1; i < 4; i++) R.pset(x + (i % 2 ? 3 : -3) * si, y - i * 2 * si, hex('#d8d0c0')); }
}

// la cafetera de filtro de los 50 (x: borde izquierdo; y: el apoyo; s: escala): el cuerpo cromado con su brillo y su
// banda, la base más ancha, el pico, el asa negra, el pomo de cristal ámbar de la tapa, el cable y el vapor que sube
function e_cafetera(R, t, x, y, s) {
  const w = Math.round(7 * s), hh = Math.round(12 * s), b = Math.max(1, Math.round(1.5 * s));
  R.rect(x - 1, y - b, x + w + 1, y, C.k); R.rect(x, y - b + 1, x + w, y - 1, e_S.metal[2]);
  R.rect(x, y - hh, x + w, y - b, C.k); R.rect(x + 1, y - hh + 1, x + w - 1, y - b - 1, e_S.metal[4]); R.rect(x + 1, y - hh + 1, x + Math.max(1, Math.round(s)), y - b - 1, e_S.metal[5]); R.rect(x + w - Math.max(1, Math.round(s)), y - hh + 1, x + w - 1, y - b - 1, e_S.metal[2]);
  R.pset(x + 2, y - hh + 2, C.blanco); R.rect(x + 1, y - Math.round(hh * 0.45), x + w - 1, y - Math.round(hh * 0.45), e_S.metal[1]);
  R.linea(x + w, y - Math.round(hh * 0.4), x + w + Math.round(2.5 * s), y - hh + Math.round(s), C.k); R.linea(x + w, y - Math.round(hh * 0.4) - 1, x + w + Math.round(2.5 * s) - 1, y - hh + Math.round(s) - 1, e_S.metal[3]);   // el pico
  R.rect(x - Math.round(2 * s), y - hh + Math.round(3 * s), x - 1, y - hh + Math.round(3 * s), C.k); R.rect(x - Math.round(2 * s), y - hh + Math.round(3 * s), x - Math.round(2 * s), y - Math.round(4 * s), C.k);   // el asa
  R.rect(x + Math.round(w / 2) - Math.round(s), y - hh - Math.round(2 * s), x + Math.round(w / 2) + Math.round(s), y - hh, C.k); R.rect(x + Math.round(w / 2) - Math.round(s) + 1, y - hh - Math.round(2 * s) + 1, x + Math.round(w / 2) + Math.round(s) - 1, y - hh - 1, hex('#c8843a')); R.pset(x + Math.round(w / 2), y - hh - Math.round(2 * s) + 1, hex('#f0c080'));
  R.linea(x + w + 1, y - 1, x + w + Math.round(4 * s), y, C.k);
  e_vapor(R, x + Math.round(w / 2), y - hh - Math.round(2 * s), t, 1, hex('#f4f2ec'), Math.round(8 * s));
}

// vapor que sube de una taza o de la cafetera (copiado de th-comun.js): bocanadas que crecen, se deshacen tramadas y se
// las lleva el aire
function e_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1 + u * 2.6, cx = x + u * alto * 0.4 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (d < 0.6 && u < 0.5) R.pset(xx, yy, col); else if (e_BAYER[((yy & 3) << 2) | (xx & 3)] < (1.05 - u) * (1.25 - d) * 0.8) R.pset(xx, yy, col); } }
}

// el hilo de humo de un cigarrillo: sube recto y luego se ondula y se deshace
function e_humo(R, t, x, y) {
  for (let i = 0; i < 26; i++) { const u = i / 26, xx = x + Math.sin(u * 7 - t * 2.2) * u * 4 + u * 3, yy = y - i; if (h(i, Math.floor(t * 8), 512) < 1 - u * 0.8) R.pset(Math.round(xx), yy, u < 0.4 ? hex('#d8d8dc') : hex('#a8a8b4')); }
}

// el teletipo (x: borde izquierdo, suelo: el pie): el mueble de chapa gris verdosa sobre sus patas, la carcasa de
// arriba con su ventanilla (el carro de imprimir va y viene), el teclado, el piloto que parpadea, el rollo de papel
// detrás y la hoja que sube con las líneas impresas, que se curva arriba; a su izquierda, la pila de papel continuo
function e_teletipo(R, t, x, suelo) {
  const T = e_S.tele, sube = (t * 3.2) % 3;
  // la pila de papel continuo plegado
  for (let k = 0; k < 8; k++) { const y = suelo - 1 - k * 2, dx = (k % 2) * 2; R.rect(x - 14 + dx, y - 1, x - 2 + dx, y, e_S.papel[k % 2 ? 2 : 3]); R.pset(x - 14 + dx, y, e_S.papel[0]); R.pset(x - 2 + dx, y - 1, e_S.papel[1]); }
  // la hoja que sale por arriba (detrás del mueble), con las líneas que suben
  const pa = x + 6, pb = x + 23, ytop = suelo - 66;
  R.rect(pa - 1, ytop, pb + 1, suelo - 48, C.k); R.rect(pa, ytop + 1, pb, suelo - 48, e_S.papel[3]); R.rect(pb, ytop + 1, pb, suelo - 48, e_S.papel[1]);
  for (let j = 0; j < 9; j++) { const yy = Math.round(suelo - 50 - j * 2 - sube); if (yy <= ytop + 2) continue; R.rect(pa + 2, yy, pa + 2 + Math.round(5 + h(j + Math.floor(t * 3.2 / 3) * 9, 1, 513) * 10), yy, e_S.tinta); }
  for (let i = pa; i <= pb; i++) R.pset(i, ytop + (Math.sin(i * 0.5 + t * 3) > 0.3 ? 0 : 1), e_S.papel[1]);   // la curva de arriba, que tiembla
  // la carcasa de arriba con la ventanilla y el carro
  R.rect(x - 2, suelo - 50, x + 31, suelo - 36, C.k); R.rect(x - 1, suelo - 49, x + 30, suelo - 37, T[3]); R.rect(x - 1, suelo - 49, x + 30, suelo - 49, T[4]); R.rect(x + 28, suelo - 48, x + 30, suelo - 37, T[2]);
  R.rect(x + 3, suelo - 47, x + 26, suelo - 41, C.k); R.rect(x + 4, suelo - 46, x + 25, suelo - 42, hex('#2a3430'));
  R.rect(x + 4, suelo - 46, x + 25, suelo - 46, e_S.papel[2]);
  { const cx = x + 5 + Math.round(((t * 9) % 18)); R.rect(cx, suelo - 45, cx + 2, suelo - 43, T[4]); R.pset(cx + 1, suelo - 46, C.k); }
  for (let i = 0; i < 6; i++) R.pset(x + 6 + i * 3, suelo - 41, hex('#4a5a50'));
  R.pset(x + 27, suelo - 39, Math.sin(t * 6) > 0 ? hex('#f0a030') : hex('#6a4a20'));
  // el teclado inclinado
  R.rect(x - 2, suelo - 36, x + 31, suelo - 31, C.k); R.rect(x - 1, suelo - 35, x + 30, suelo - 32, T[2]);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 9; i++) R.pset(x + 1 + i * 3 + j, suelo - 34 + j * 2, (i + j + Math.floor(t * 7)) % 11 === 0 ? C.blanco : hex('#e8e4d4'));
  // el mueble con sus patas y la rejilla
  R.rect(x, suelo - 31, x + 29, suelo - 4, C.k); R.rect(x + 1, suelo - 30, x + 28, suelo - 5, T[2]); R.rect(x + 1, suelo - 30, x + 2, suelo - 5, T[3]); R.rect(x + 26, suelo - 30, x + 28, suelo - 5, T[1]);
  for (let y = suelo - 26; y < suelo - 18; y += 2) R.rect(x + 7, y, x + 22, y, T[1]);
  R.rect(x + 12, suelo - 14, x + 17, suelo - 12, T[4]);
  for (const px of [x + 1, x + 26]) { R.rect(px, suelo - 4, px + 2, suelo, C.k); R.pset(px + 1, suelo - 3, T[3]); }
}

// la mesa de roble de 'general' (x 60–148, tablero en y 122–127, pie en y 152): el faldón con la cajonera de latón y el
// hueco de las rodillas con la papelera de rejilla y sus bolas de papel; encima, de izquierda a derecha, el montón de papeles, el cenicero con el cigarrillo y su hilo de
// humo, la taza de café humeante, la máquina de escribir negra (el carro avanza, la hoja se va llenando de renglones y
// al final suena la campanilla) y el flexo de brazos articulados con su muelle, su pantalla verde y el cono de luz sobre
// la mesa (luz 0–1). Entre los papeles y la máquina (x 70–98) queda el sitio de quien trabaja detrás
function e_mesaRoble(R, t, luz) {
  const O = e_S.roble;
  // el tablero, visto un poco desde arriba, con su veta y el canto
  R.rect(60, 121, 148, 128, C.k); R.rect(61, 122, 147, 126, O[4]); for (let x = 62; x < 147; x++) if (e_vruido(x * 0.2, 3) > 0.6) R.pset(x, 123 + (x % 3), O[3]); R.rect(61, 122, 147, 122, O[5]); R.rect(61, 127, 147, 128, O[2]);
  // el faldón: el hueco de las rodillas y la cajonera con sus tiradores
  R.rect(62, 129, 146, 152, C.k); R.rect(63, 129, 145, 151, O[3]); R.rect(68, 131, 116, 151, O[0]); R.rect(68, 131, 116, 133, O[1]);
  for (let x = 64; x < 146; x += 1) if (e_vruido(x * 0.3, 11) > 0.62) R.pset(x, 130 + (x % 2), O[2]);
  for (let k = 0; k < 3; k++) { const y = 131 + k * 7; R.rect(120, y, 143, y + 5, O[2]); R.rect(121, y + 1, 142, y + 4, O[4]); R.rect(121, y + 1, 142, y + 1, O[5]); R.rect(129, y + 2, 134, y + 3, e_S.latónS); R.rect(130, y + 2, 133, y + 2, e_S.latónL); }
  R.rect(63, 129, 145, 129, O[1]);
  // la papelera de rejilla bajo la mesa, con bolas de papel arrugado
  R.rect(100, 140, 112, 151, C.k); for (let y = 141; y < 151; y++) for (let x = 101; x < 112; x++) R.pset(x, y, (x + y) % 3 === 0 ? e_S.metal[2] : (x - y + 60) % 3 === 0 ? e_S.metal[1] : O[0]);
  R.rect(100, 140, 112, 141, e_S.metal[4]); for (const [px, py] of [[103, 138], [107, 137], [110, 139]]) { R.disco(px, py, 2, e_S.papel[3]); R.pset(px - 1, py, e_S.papel[1]); R.pset(px + 1, py + 1, e_S.papel[0]); }
  // el cono de luz del flexo sobre la mesa
  if (luz > 0) { for (let y = 111; y < 122; y++) { const u = (y - 111) / 11, xa = Math.round(116 - u * 10), xb = Math.round(126 + u * 8); for (let x = xa; x <= xb; x++) if ((x + y) % 2 === 0 && e_BAYER[((y & 3) << 2) | (x & 3)] < luz * 0.55) R.pset(x, y, e_mezcla(R.pget(x, y), e_S.luzFlexo, 0.4)); }
    for (let x = 102; x < 140; x++) for (let y = 122; y < 127; y++) if ((x + y) % 2 === 0) R.pset(x, y, e_mezcla(R.pget(x, y), e_S.luzFlexo, 0.45 * luz * (1 - Math.abs(x - 121) / 22))); }
  // el montón de papeles con su pisapapeles
  for (let k = 0; k < 4; k++) { R.rect(62 + k, 117 + k, 71 + k, 121, C.k); R.rect(63 + k, 118 + k, 70 + k, 121, e_S.papel[3 - (k % 2)]); }
  R.rect(64, 119, 68, 119, e_S.tinta); R.disco(68, 116, 2, C.k); R.disco(68, 116, 1, hex('#5a8ab0')); R.pset(67, 115, C.blanco);
  // el cenicero de cristal con el cigarrillo y su humo
  R.rect(74, 120, 83, 122, C.k); R.rect(75, 120, 82, 121, hex('#8ab0c0')); R.rect(76, 121, 81, 121, hex('#5a7a8a')); R.pset(76, 120, hex('#c8e0e8'));
  R.rect(79, 119, 84, 119, C.blanco); R.pset(84, 119, (Math.sin(t * 2.6) > 0 ? hex('#f0802a') : hex('#c8502a'))); e_humo(R, t, 84, 118);
  // la taza de café humeante
  R.rect(87, 115, 93, 122, C.k); R.rect(88, 116, 92, 121, C.blanco); R.rect(88, 116, 92, 116, hex('#5a3a1a')); R.rect(94, 117, 94, 120, C.k); R.rect(88, 117, 88, 120, hex('#e8e4d8'));
  e_vapor(R, 90, 114, t, 2, hex('#f0eee8'), 14);
  // la máquina de escribir: el cuerpo negro con su brillo, las teclas, el carro que avanza con la hoja y la campanilla
  const car = (t % 5) / 5, cx = Math.round(-car * 8), ding = car > 0.95;
  R.rect(102 + cx, 99, 116 + cx, 110, C.k); R.rect(103 + cx, 100, 115 + cx, 110, e_S.papel[3]); for (let j = 0; j < 4; j++) R.rect(105 + cx, 102 + j * 2, 105 + cx + Math.max(0, Math.min(8, Math.round(car * 14) - j * 2)), 102 + j * 2, e_S.tinta);
  R.rect(99 + cx, 109, 119 + cx, 112, C.k); R.rect(100 + cx, 110, 118 + cx, 111, e_S.negroL); R.rect(97 + cx, 110, 98 + cx, 110, e_S.metal[5]); R.disco(120 + cx, 110, 1, e_S.negroL);
  R.rect(99, 112, 121, 121, C.k); R.rect(100, 113, 120, 120, e_S.negro); R.rect(100, 113, 120, 113, e_S.negroL); R.rect(100, 120, 120, 120, hex('#0e0c12'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 8; i++) R.pset(101 + i * 2 + j, 115 + j * 2, (i * 3 + j + Math.floor(t * 9)) % 13 === 0 ? e_S.metal[2] : e_S.papel[2]);
  if (ding) { R.pset(122, 106, C.amarillo); R.pset(123, 105, C.amarillo); R.pset(124, 107, C.amarillo); }
  // el flexo: la base, los brazos con su muelle, la pantalla verde con su borde de luz
  R.rect(136, 119, 145, 121, C.k); R.rect(137, 119, 144, 120, hex('#2e5a44')); R.pset(138, 119, hex('#5a8a6a'));
  R.linea(140, 119, 134, 98, C.k); R.linea(141, 119, 135, 98, hex('#3a6a52')); R.linea(134, 98, 124, 103, C.k); R.linea(134, 99, 124, 104, hex('#3a6a52')); R.disco(134, 98, 1, e_S.latón);
  for (let i = 0; i < 6; i++) R.pset(139 - i, 113 - i * 2, i % 2 ? e_S.metal[5] : e_S.metal[2]);   // el muelle
  R.poligono([[127, 101], [120, 100], [114, 109], [127, 110]], C.k); R.poligono([[126, 102], [120, 101], [116, 108], [126, 109]], hex('#2e6a4a')); R.pset(124, 102, hex('#6a9a7a')); R.pset(125, 103, hex('#5a8a6a'));
  R.rect(116, 110, 127, 110, luz > 0 ? e_S.luzFlexo : e_S.metal[1]);
}

// la mesa de trazar de 'general' (x 160–258, tablero inclinado de y 128 a 138, pie en y 164): la carta del Atlántico con
// la trayectoria en rojo, el compás y la regla, el teléfono de disco, otra taza humeante, la lámpara de cuello de cisne
// con su pantalla verde, y debajo, las cartas enrolladas en su estante
function e_mesaTrazar(R, t) {
  const O = e_S.roble;
  R.poligono([[162, 127], [256, 127], [260, 139], [158, 139]], C.k); R.poligono([[163, 128], [255, 128], [258, 138], [160, 138]], O[4]);
  // la carta sobre la mesa: mar azul pálido, la costa y la trayectoria
  R.poligono([[172, 129], [236, 129], [238, 137], [170, 137]], hex('#dce8ec'));
  for (let x = 172; x < 200; x++) { const y = 132 + Math.round(Math.sin(x * 0.3) * 1.5); R.pset(x, y, e_S.costa); if (x < 188) R.rect(x, y + 1, x, 137, e_S.mapaTierra); }
  for (let i = 0; i < 6; i++) R.pset(230 - i * 6, 131 + Math.round(i * 0.8), e_S.calido);
  R.linea(204, 130, 222, 136, e_S.metal[4]); R.linea(204, 131, 222, 137, e_S.metal[1]);   // la regla
  R.linea(212, 128, 208, 136, e_S.metal[5]); R.linea(212, 128, 216, 135, e_S.metal[5]); R.pset(212, 127, C.k);   // el compás
  R.rect(158, 139, 260, 141, C.k); R.rect(159, 139, 259, 140, O[2]);
  for (const px of [162, 252]) { R.rect(px, 141, px + 3, 164, C.k); R.rect(px + 1, 141, px + 2, 163, O[3]); }
  R.rect(165, 152, 252, 154, C.k); R.rect(166, 152, 251, 153, O[2]);
  for (let k = 0; k < 6; k++) { const x = 172 + k * 13; R.disco(x, 149, 2, C.k); R.disco(x, 149, 1, e_S.papel[2]); R.rect(x, 147, x + 9, 151, e_S.papel[3]); R.rect(x, 151, x + 9, 151, e_S.papel[1]); R.disco(x + 10, 149, 2, C.k); R.disco(x + 10, 149, 1, e_S.papel[2]); }
  // el teléfono negro de disco
  R.rect(164, 121, 176, 128, C.k); R.rect(165, 122, 175, 127, e_S.negro); R.rect(165, 122, 175, 122, e_S.negroL); R.disco(170, 125, 2, e_S.papel[2]); R.pset(170, 125, C.k);
  R.rect(163, 118, 177, 120, C.k); R.rect(164, 118, 176, 119, e_S.negroL); R.rect(163, 117, 165, 118, C.k); R.rect(175, 117, 177, 118, C.k);
  // la taza y la lámpara de cuello de cisne
  R.rect(240, 121, 245, 128, C.k); R.rect(241, 122, 244, 127, hex('#3a6a9a')); R.rect(241, 122, 244, 122, hex('#2a1a10')); e_vapor(R, 242, 120, t, 4, hex('#f0eee8'), 12);
  R.rect(248, 125, 255, 128, C.k); R.rect(249, 125, 254, 127, e_S.latón); R.linea(252, 125, 250, 108, C.k); R.linea(253, 125, 251, 108, e_S.latónS);
  R.poligono([[243, 104], [252, 106], [251, 112], [240, 111]], C.k); R.poligono([[244, 105], [251, 107], [250, 111], [241, 110]], hex('#2a7a4a')); R.rect(241, 111, 250, 112, e_S.luzFlexo);
  for (let y = 113; y < 128; y++) { const u = (y - 113) / 15, xa = Math.round(238 - u * 10), xb = Math.round(250 + u * 4); for (let x = xa; x <= xb; x++) if ((x + y) % 3 === 0) R.pset(x, y, e_mezcla(R.pget(x, y), e_S.luzFlexo, 0.3)); }
}

// el ventilador de techo (cx, desde y0; s la escala): la varilla, el motor con su remate y cuatro aspas de madera que
// giran en perspectiva, con su eje que brilla
function e_ventilador(R, t, cx, y0, s) {
  const yb = y0 + Math.round(9 * s);
  R.rect(cx, y0, cx + 1, yb, C.k); R.rect(cx - 3, yb, cx + 4, yb + 2, C.k); R.rect(cx - 2, yb, cx + 3, yb + 1, e_S.latón); R.pset(cx - 1, yb, e_S.latónL);
  for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a), L = 20 * s;
    for (let d = 3; d < L; d++) { const x = Math.round(cx + 0.5 + ca * d), y = Math.round(yb + 2 + sa * d * 0.18); R.pset(x, y, sa > 0 ? e_S.roble[3] : e_S.roble[1]); if (d > 6) R.pset(x, y + 1, e_S.roble[0]); } }
  R.rect(cx - 1, yb + 2, cx + 2, yb + 3, e_S.latónS);
}

// la sombra de alguien que pasa tras el cristal esmerilado de la puerta (x0–x1 × y0–y1): una silueta borrosa que va y
// viene de vez en cuando
function e_sombraPasillo(R, t, x0, y0, x1, y1) {
  const u = (t % 11) / 11; if (u > 0.55) return; const cx = x0 - 12 + u / 0.55 * (x1 - x0 + 24);
  for (let y = y0 + 12; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dx = x - cx, cabeza = Math.hypot(dx, y - (y0 + 20)) < 5, cuerpo = y > y0 + 25 && Math.abs(dx) < 8 - Math.max(0, (y - y0 - 60) * 0.05); if ((cabeza || cuerpo) && (x + y) % 2 === 0) R.pset(x, y, e_mezcla(R.pget(x, y), hex('#5a6458'), 0.5)); }
}

// la esquina de la mesa de trazar por delante en 'tablero' (abajo a la izquierda, x 0–58, y 150–180), con la taza
// humeante y el borde de la carta
function e_esquinaMesa(R, t) {
  const O = e_S.roble;
  R.poligono([[0, 150], [52, 150], [62, 162], [0, 162]], C.k); R.poligono([[0, 151], [51, 151], [60, 161], [0, 161]], O[4]); R.rect(0, 151, 50, 151, O[5]);
  R.poligono([[0, 153], [40, 153], [46, 160], [0, 160]], hex('#dce8ec')); for (let x = 2; x < 38; x += 4) R.pset(x, 156, e_S.costa);
  R.rect(0, 162, 62, 166, C.k); R.rect(0, 162, 61, 164, O[2]); R.rect(52, 166, 57, 180, C.k); R.rect(53, 166, 56, 180, O[2]);
  R.rect(20, 141, 28, 152, C.k); R.rect(21, 142, 27, 151, C.blanco); R.rect(21, 142, 27, 142, hex('#5a3a1a')); R.rect(29, 144, 30, 148, C.k); e_vapor(R, 24, 139, t, 6, hex('#f0eee8'), 16);
}

// el inserto del archivador ('archivador'): la pared de yeso con el friso, el borde del tablero con dos fichas, el
// archivador grande (x 92–232) con el cajón de los retirados lleno de fichas, la cafetera y las tazas encima, la sombra
// del ventilador que barre la pared y una tira de teletipo clavada que ondea con el aire
function e_salaArchivador(R, t, caj) {
  e_fijo(R, 'sala-archivador', () => {
    const B = R.buf;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 3 + (e_vruido(x * 0.1, y * 0.1) - 0.5) * 1.1 + Math.max(0, 0.9 - Math.hypot(x - 300, y - 40) / 140) - (y < 20 ? (20 - y) / 14 : 0); let l = Math.floor(v); if (v - l > e_BAYER[((y & 3) << 2) | (x & 3)]) l++; B[y * 320 + x] = e_S.pared[Math.max(0, Math.min(5, l))]; }
    for (let x = 0; x < 320; x++) { B[150 * 320 + x] = e_S.roble[5]; B[151 * 320 + x] = e_S.roble[3]; B[152 * 320 + x] = e_S.roble[3]; B[153 * 320 + x] = e_S.roble[1]; }
    for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const i = x % 14; B[y * 320 + x] = i < 2 ? (i ? e_S.roble[4] : e_S.roble[1]) : e_vruido(x * 0.3, y * 0.05 + Math.floor(x / 14) * 3) > 0.6 ? e_S.roble[2] : e_S.roble[3]; }
    e_corcho(R, -4, 10, 60, 140);
    for (const [x, y, hombre] of [[10, 30, false], [34, 30, true], [10, 70, true], [34, 70, false], [10, 110, false]]) { R.rect(x + 2, y + 2, x + 21, y + 31, e_S.corcho[0]); R.rect(x, y, x + 19, y + 29, e_S.ficha); R.rect(x, y + 29, x + 19, y + 29, e_S.fichaS);
      const P = hombre ? e_PICTO.hombre : e_PICTO.mujer; P.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.rect(x + 2 + i * 3, y + 4 + j * 3, x + 4 + i * 3, y + 6 + j * 3, hombre ? e_S.hombre : e_S.mujer); }); R.disco(x + 10, y + 1, 1, C.rojo); }
    // la sombra del archivador en la pared
    for (let y = 66; y < 180; y++) for (let x = 233; x < 246; x++) if ((x + y) % 2 === 0 && x - 233 < 13 - (y < 72 ? 72 - y : 0)) B[y * 320 + x] = e_mezcla(B[y * 320 + x], hex('#3a4a34'), 0.35);
  });
  // la sombra del ventilador que barre la pared de la derecha
  for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2; for (let d = 6; d < 60; d++) { const x = Math.round(278 + Math.cos(a) * d * 0.7), y = Math.round(78 + Math.sin(a) * d * 0.35); if (x > 236 && x < 320 && !(x > 274 && y < 46) && (x + y) % 2 === 0) R.pset(x, y, e_mezcla(R.pget(x, y), hex('#4a5a44'), 0.25)); } }
  // la tira de teletipo clavada, que ondea con el aire del ventilador
  for (let j = 0; j < 40; j++) { const sw = Math.round(Math.sin(t * 4 + j * 0.25) * j * 0.06), x = 262 + sw, y = 92 + j; R.rect(x, y, x + 12, y, e_S.papel[3]); R.pset(x + 12, y, e_S.papel[1]); if (j % 3 === 1 && j > 2) R.rect(x + 2, y, x + 2 + Math.round(4 + h(j, 1, 514) * 6), y, e_S.tinta); }
  R.disco(268, 92, 1, C.rojo);
  e_motas(R, t, 236, 320, 50, 150, 14, hex('#f4ecd0'), 5);
  e_archivador(R, t, 92, 62, 232, 220, caj, true);
  e_plantaDelante(R, t);
}

// una planta grande en primer término, abajo a la derecha (fuera de foco: hojas grandes en dos verdes con su nervio),
// que se mece con el aire del ventilador: da profundidad al inserto
function e_plantaDelante(R, t) {
  R.rect(276, 166, 320, 180, C.k); R.rect(277, 167, 320, 180, hex('#a85a3a')); R.rect(277, 167, 320, 169, hex('#c8784a')); R.rect(277, 175, 320, 176, hex('#8a4a2e'));
  for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 - 0.9 + k * 0.42 + Math.sin(t * 1.8 + k) * 0.05, L = 34 + (k % 3) * 8, bx = 296 + (k - 3) * 3, by = 168;
    for (let d = 2; d < L; d++) { const u = d / L, w = Math.sin(u * Math.PI) * (6 + (k % 2) * 2), cx = bx + Math.cos(a) * d, cy = by + Math.sin(a) * d + u * u * 8;
      for (let i = -w; i <= w; i++) { const x = Math.round(cx - Math.sin(a) * i), y = Math.round(cy + Math.cos(a) * i * 0.6); R.pset(x, y, Math.abs(i) < 0.8 ? hex('#8ac85a') : i < 0 ? hex('#3a7a2e') : hex('#2a5e24')); } } }
}

// el fluorescente del techo: la caja con su difusor, el tubo que brilla y, a ratos, un parpadeo
function e_fluorescente(R, t, x0, x1, y) {
  const on = !((t % 9.1) < 0.3 && Math.sin(t * 60) > 0);
  R.rect(x0, y, x1, y + 4, C.k); R.rect(x0 + 1, y + 1, x1 - 1, y + 3, on ? C.blanco : e_S.techo[1]); for (let x = x0 + 4; x < x1; x += 4) R.pset(x, y + 2, on ? hex('#e8f0f0') : e_S.techo[0]);
  if (on) for (let x = x0 - 2; x <= x1 + 2; x += 2) R.pset(x, y + 5, e_mezcla(R.pget(x, y + 5), C.blanco, 0.5));
}

// motas de polvo que flotan despacio en la luz, dentro de x0–x1 × y0–y1 (copiado de th-comun.js)
function e_motas(R, t, x0, x1, y0, y1, n, c, k = 0) {
  const md = (v, m) => ((v % m) + m) % m;
  for (let i = 0; i < n; i++) { const x = x0 + md(h(i, k, 130) * (x1 - x0) + Math.sin(t * 0.4 + i) * 5 + t * 1.3, x1 - x0), y = y1 - md(h(i, k, 131) * (y1 - y0) + t * (1.5 + h(i, k, 132) * 2), y1 - y0);
    if (Math.sin(t * 1.3 + i * 2.1) > -0.3 && !(x > 272 && y < 48)) R.pset(Math.round(x), Math.round(y), c); }
}

// la paleta del taller: bloques crema y zócalo salvia, terrazo, el verde máquina del ventilador, la madera de las mesas,
// el azul de los planos, el nogal del panel, la casita (tejas de asfalto, contrachapado, césped), el cromo de la
// campanita, la fórmica dorada y el aguacate de 1971, el tablero perforado y lo que se ve por la ventana de Florida
const f_TS = pal({
  pared: '#e2d8be', paredS: '#d0c4a6', paredL: '#eee8d6', junta: '#c0b392', banda: '#7f9c88', bandaS: '#6c8876', bandaL: '#97b39f', bandaJ: '#5a7464',
  moldura: '#d0c4a2', molduraL: '#f2ecda', molduraS: '#9a8e70', zocalo: '#3c3834', zocaloL: '#5c5852',
  techo: '#e2ded2', techoS: '#d2ccbe', techoL: '#ece9e0', cornisa: '#d8d0bc',
  terr: '#d8ccb4', terrS: '#c6b9a0', terrL: '#e6dcc8', laton: '#b8944a', latonL: '#dcbc70', china1: '#f6f2e8', china2: '#8e8880', china3: '#b0684a', china4: '#6c8a78', china5: '#4e4e58',
  vent: '#5c7366', ventS: '#465a4e', ventL: '#7e9888', ventD: '#2e3a34', hueco: '#18201c', huecoL: '#26302a', aspa: '#b2babe', aspaS: '#7a848a', aspaL: '#e0e6e8', rejilla: '#c8ccce', rejillaS: '#5e6662', rejillaM: '#9aa2a4',
  mesa: '#a87a4c', mesaS: '#7c5532', mesaL: '#c8955e', mesaD: '#4a3020', contra: '#d4b078', contraS: '#a8844c', contraL: '#e8cc98', balsa: '#ead8aa', balsaS: '#c8b080',
  plano: '#2f5ea6', planoS: '#22477e', planoL: '#dce8fc', planoM: '#5a84c4', planoD: '#1a3664', chincheR: '#d83a3a', chincheA: '#e8c040',
  panel: '#4e3a2a', panelS: '#2e2018', panelL: '#72583e', panelV: '#5e4632', cristalP: '#1a1412', cristalL: '#3a302a',
  casa: '#f2e8cc', casaS: '#d4c6a2', casaL: '#fffaea', casaD: '#b8a882', teja1: '#76695f', teja2: '#8b7d71', teja3: '#615650', tejaL: '#a89a8c', tejaD: '#3a322c',
  tablero: '#c8a46c', tableroS: '#9c7844', fieltro: '#4a4446', fieltroL: '#625a5a', viga: '#e0bc84', vigaS: '#b08c58', interior: '#4e3c30', papelP: '#e2c8a6', papelPS: '#c4a884', suelito: '#b8885a', suelitoS: '#946a40',
  postigo: '#3f7a5a', postigoS: '#2a5840', puertaC: '#2e5a8a', ladrilloC: '#a84a3a', cesped: '#6aa84a', cespedS: '#4a8034', cespedL: '#8cc864',
  cromo: '#e8ecf0', cromoS: '#a8b0b8', cromoD: '#5e6874', formica: '#d8a640', formicaS: '#b08428', formicaL: '#f0c868', aguacate: '#8a9a4a', aguacateS: '#62703a', aguacateL: '#aaba68',
  pegboard: '#b89262', pegboardS: '#9a7646', pegboardH: '#6a4e2e', silueta: '#7a5c3a', mango: '#c83a3a', mangoS: '#8e2424',
  alu: '#c4c8cc', aluS: '#868c92', aluL: '#eef0f2', lama: '#e2f2f6', lamaS: '#7a96a4',
  cieloF0: '#2f7ed8', cieloF1: '#4294e2', cieloF2: '#64aeec', cieloF3: '#92c8f2', cieloF4: '#c6e4f6',
  coral: '#e6d0ae', coralS: '#c8ae86', coralL: '#f4e4c8', tejaB: '#d0703e', tejaBS: '#a24e26', tejaBL: '#ea9460', buganvilla: '#c8307a', buganvillaL: '#e860a0',
  hibisco: '#d8304a', seto: '#3e8a3e', setoS: '#2a6a2e', setoL: '#5aa850', acera: '#d8d2c4', aceraS: '#b8b0a0', asfaltoF: '#5a5a62',
  luzSol: '#fff0c4', luzFl: '#f6fbff', esmalte: '#eef0ea', esmalteS: '#b8bcb4', tuboOff: '#9aa0a4', cadena: '#6a6a6a',
  nogal: '#6a4a30', nogalS: '#4a3220', nogalL: '#8a6444', listones: '#8e6038', listonesS: '#6c4626', listonesL: '#a8784a',
  maquina: '#3a6a9a', maquinaS: '#284c74', maquinaL: '#5a8ac0', verdeL: '#3aa86a', titulo: '#f4ecd8',
});

// las cinco categorías: rampas de luz para los números (de la luz a la sombra) y la rampa apagada
const f_CAT = [null,
  ['#fffbd8', '#fbec8a', '#f4d23c', '#d8aa1e', '#a87c14'], ['#fff0c8', '#fcd27c', '#f6a83a', '#d8801e', '#a85a14'],
  ['#ffe2c0', '#fcb07a', '#f07a34', '#c8561e', '#943a14'], ['#ffd6c8', '#f88a74', '#e04432', '#b02a22', '#7e1a16'],
  ['#ffd4e8', '#f08ab8', '#c8387a', '#9a2258', '#6a143c']].map((r) => r && r.map(hex));

// la rampa de una ventanilla apagada: la cifra se adivina en marrón oscuro tras el cristal
const f_APAGADA = ['#6a5a4c', '#5a4a3e', '#4c3e34', '#40342c', '#362a24'].map(hex);

// los umbrales de la escala en mph (la de hoy, la que dice la voz): 74, 96, 111, 130 y 157
const f_UMBRAL = [0, 74, 96, 111, 130, 157];

// el contador del anemómetro según la categoría (con decimales interpola entre umbrales; 0 sin viento)
function f_mph(cat) { if (cat <= 0) return 0; const k = Math.min(4, Math.floor(cat)), u = cat - k; return Math.round(k >= 5 ? 157 : lerp(f_UMBRAL[k], k < 5 ? f_UMBRAL[k + 1] : 170, u)); }

// recorta a 0–1
const f_lim = (u) => Math.max(0, Math.min(1, u));

// la curva suave de 0 a 1 (arranca y llega despacio)
const f_suave = (u) => { u = f_lim(u); return u * u * (3 - 2 * u); };

// mezcla dos colores del lienzo (0xAABBGGRR): a = 0 deja c, a = 1 da d
function f_mezcla(c, d, a) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >>> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >>> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// el umbral de la trama ordenada 4 × 4 (0–1): degradados, halos y luces tramados, sin ruido
const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama en el píxel (x, y)
const f_b4 = (x, y) => (f_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// aclara (o tiñe) el píxel (x, y) hacia col en la proporción a, respetando el recorte
function f_aclara(R, x, y, col, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, f_mezcla(R.pget(x, y), col, a)); }

// la capa fija de un encuadre: se pinta una vez por lienzo en un búfer aparte y se copia entera en cada fotograma
const f_CAPAS = new WeakMap();

// pinta (una vez) y copia la capa fija clave del lienzo R
function f_capa(R, clave, dibuja) {
  let m = f_CAPAS.get(R); if (!m) f_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function f_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// cifras diminutas de 3 × 5 (contadores, la cinta métrica, el calendario): solo dígitos
// las rejillas de 3 × 5 de las cifras del 0 al 9
const f_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

// escribe txt (solo dígitos) con cifras de 3 × 5 desde (x, y), en el color c
function f_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = f_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// una pieza que vuela dando vueltas (teja, contraventana, tablilla): un rectángulo w × al girado el ángulo a, con su
// cara de luz y su canto en sombra
function f_pieza(R, x, y, w, al, a, c, cS) {
  const ca = Math.cos(a), sa = Math.sin(a);
  for (let j = 0; j < al; j++) for (let i = 0; i < w; i++) { const u = i - (w - 1) / 2, v = j - (al - 1) / 2; R.pset(Math.round(x + u * ca - v * sa), Math.round(y + u * sa + v * ca), j === al - 1 ? cS : c); }
}

// una nube pequeña de tres tonos (sombra abajo, cuerpo, luz arriba) solo con discos (respeta R.recorte)
function f_nube(R, cx, cy, w) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), hex('#c4dcee'));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), hex('#e8f4fb'));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.7), C.blanco);
}

// el techo de placas (hasta y1), de poco contraste porque por encima pasa la barra del año
function f_techo(R, y1, k = 0) {
  const T = f_TS; R.rect(0, 0, 319, y1, T.techo);
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) if (h(x, y, 70 + k) < 0.07) R.pset(x, y, T.techoS);
  for (let x = 12; x < 320; x += 30) R.rect(x, 0, x, y1, T.techoS);
  R.rect(0, Math.round(y1 / 2), 319, Math.round(y1 / 2), T.techoS);
}

// una pared de bloques de hormigón pintados (bw × bh con su junta): cada bloque con su tono, el canto de arriba y el de la
// izquierda con luz, el de abajo y el de la derecha en sombra, y los poros de la pintura. cols = [base, sombra, luz, junta]
function f_bloques(R, x0, y0, x1, y1, bw, bh, cols, k = 0) {
  const [base, sombra, luz, junta] = cols, medio = f_mezcla(base, sombra, 0.45), claro = f_mezcla(base, luz, 0.5);
  for (let y = y0; y <= y1; y++) {
    const fila = Math.floor((y - y0) / bh), dy = (y - y0) % bh, off = (fila & 1) * (bw >> 1);
    for (let x = x0; x <= x1; x++) {
      const xx = x - x0 + off, dx = xx % bw, col = Math.floor(xx / bw);
      let p;
      if (dy === bh - 1 || dx === bw - 1) p = junta;
      else {
        const v = h(col, fila, 40 + k); p = v < 0.24 ? medio : v > 0.86 ? claro : base;
        if (dy === 0 || dx === 0) p = f_mezcla(p, luz, 0.55);
        else if (dy === bh - 2 || dx === bw - 2) p = f_mezcla(p, sombra, 0.55);
        else if (h(x, y, 42 + k) < 0.045) p = sombra;
      }
      R.pset(x, y, p);
    }
  }
}

// la pared entera del taller: bloques crema arriba, la moldura y el zócalo salvia abajo, el rodapié de goma
function f_paredTaller(R, y0, yMold, ySuelo, bw = 16, bh = 8) {
  const T = f_TS;
  f_bloques(R, 0, y0, 319, yMold - 1, bw, bh, [T.pared, T.paredS, T.paredL, T.junta], 1);
  R.rect(0, yMold, 319, yMold + 2, T.moldura); R.rect(0, yMold, 319, yMold, T.molduraL); R.rect(0, yMold + 2, 319, yMold + 2, T.molduraS);
  f_bloques(R, 0, yMold + 3, 319, ySuelo - 5, bw, bh, [T.banda, T.bandaS, T.bandaL, T.bandaJ], 2);
  R.rect(0, ySuelo - 4, 319, ySuelo - 1, T.zocalo); R.rect(0, ySuelo - 4, 319, ySuelo - 4, T.zocaloL);
}

// el suelo de terrazo de Florida (de y0 a y1): chinas de cinco colores, más gruesas cerca, las juntas de latón en
// perspectiva hacia fugaX, la penumbra junto a la pared y el brillo de los fluorescentes (xs: sus centros)
function f_terrazo(R, y0, y1, xs = [], k = 0, fugaX = 160) {
  const T = f_TS, chinas = [T.china1, T.china2, T.china3, T.china4, T.china5];
  for (let y = y0; y <= y1; y++) {
    const f = (y - y0) / Math.max(1, y1 - y0);
    for (let x = 0; x < 320; x++) {
      const v = h(x, y, 60 + k); let p = v < 0.3 ? T.terrS : v > 0.94 ? T.terrL : T.terr;
      if (y < y0 + 3 && (x + y) % (y - y0 + 2) === 0) p = T.terrS;
      if (h(x, y, 61 + k) < 0.07 + f * 0.04) { p = chinas[Math.floor(h(x, y, 62 + k) * 5)]; if (f > 0.55 && h(x, y, 63 + k) < 0.4) R.pset(x + 1, y, p); }
      R.pset(x, y, p);
    }
  }
  for (const y of [y0 + 6, y0 + 15, y0 + 28]) if (y <= y1) R.rect(0, y, 319, y, T.laton);
  for (let kx = -8; kx <= 17; kx++) { const xa = kx * 34 + 6; R.linea(xa, y0, Math.round(fugaX + (xa - fugaX) * 2), y1, T.laton); }
  // el reflejo de los tubos en el terrazo pulido
  for (const xc of xs) for (let y = y0 + 2; y < Math.min(y1, y0 + 30); y++) { const w = 22 - (y - y0) * 0.6; for (let x = Math.round(xc - w); x <= xc + w; x++) if ((x + y) % 2 === 0 && f_b4(x, y) < 0.5 - (y - y0) / 70 - Math.abs(x - xc) / (w * 3)) f_aclara(R, x, y, T.luzFl, 0.35); }
  R.rect(0, y0, 319, y0, f_mezcla(T.terrS, T.zocalo, 0.35));
}

// la sombra suave de un mueble en el suelo: un óvalo tramado (cx, cy; rx, ry)
function f_sombraSuelo(R, cx, cy, rx, ry, a = 0.22) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d < 1 && f_b4(cx + i, cy + j) < 1.2 - d) f_aclara(R, cx + i, cy + j, f_TS.zocalo, a); }
}

// un fluorescente de taller colgado de dos cadenas (de x0 a x1, el reflector en y): el reflector esmaltado, los dos tubos
// (apagados si on es falso) y el cono de luz tramado sobre la pared, de alto píxeles
function f_fluor(R, x0, x1, y, on, techo = 11, alto = 30) {
  const { rect, pset } = R, T = f_TS;
  for (const xc of [x0 + 5, x1 - 5]) for (let yy = techo; yy < y; yy++) pset(xc + (yy & 1), yy, T.cadena);
  rect(x0, y - 1, x1, y + 2, C.k); rect(x0 + 1, y - 1, x1 - 1, y, T.esmalte); rect(x0 + 1, y + 1, x1 - 1, y + 1, T.esmalteS);
  rect(x0 + 2, y + 2, x1 - 2, y + 3, on ? T.luzFl : T.tuboOff); if (on) rect(x0 + 3, y + 2, x1 - 3, y + 2, C.blanco); else rect(x0 + 2, y + 3, x1 - 2, y + 3, T.esmalteS);
  pset(x0 + 2, y + 2, T.esmalteS); pset(x1 - 2, y + 2, T.esmalteS);
  if (on) for (let j = 0; j < alto; j++) { const e = j * 0.95; for (let x = Math.round(x0 - e); x <= Math.round(x1 + e); x++) { const yy = y + 4 + j; if ((x + yy) % 2 === 0 && f_b4(x, yy) < 0.85 - j / alto - Math.abs(x - (x0 + x1) / 2) / ((x1 - x0) / 2 + e) * 0.4) f_aclara(R, x, yy, T.luzFl, 0.2); } }
}

// el parpadeo del fluorescente viejo: se apaga dos instantes seguidos, una vez por periodo p
const f_parpadeo = (t, p, k = 0) => { const u = (t + k) % p; return u < 0.07 || (u > 0.14 && u < 0.2) || (u > 0.5 && u < 0.53); };

// la caja del ventilador (centro cx, cy; radio de las aspas r): chapa verde con bisel y remaches, la boca redonda con su
// aro y el motor al fondo, la placa del fabricante (sin letras), las patas en A hasta el suelo, la caja de mando al lado
// (mando y piloto, se pintan en f_ventAspas) y el cable
function f_ventCaja(R, cx, cy, r, suelo, o = {}) {
  const { rect, pset, disco, linea } = R, T = f_TS, m = r + 7, x0 = cx - m, x1 = cx + m, y0 = cy - m, y1 = cy + m;
  // las patas y la base (detrás de la caja)
  for (const [xa, xb] of [[x0 + 8, x0 + 2], [x1 - 8, x1 - 2]]) { for (let k = 0; k < 3; k++) linea(xa + k - 1, y1 - 2, xb + k - 1, suelo - 2, k === 1 ? T.ventL : C.k); rect(xb - 4, suelo - 2, xb + 4, suelo, C.k); rect(xb - 3, suelo - 2, xb + 3, suelo - 2, T.ventS); }
  rect(x0 + 6, suelo - 9, x1 - 6, suelo - 7, C.k); rect(x0 + 6, suelo - 8, x1 - 6, suelo - 8, T.ventS);
  // la caja, con las esquinas romas
  rect(x0, y0 + 2, x1, y1 - 2, C.k); rect(x0 + 2, y0, x1 - 2, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, C.k);
  rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, T.vent); rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, T.vent);
  rect(x0 + 2, y0 + 1, x1 - 2, y0 + 2, T.ventL); rect(x0 + 1, y0 + 2, x0 + 2, y1 - 2, T.ventL); rect(x0 + 2, y1 - 2, x1 - 2, y1 - 1, T.ventS); rect(x1 - 2, y0 + 2, x1 - 1, y1 - 2, T.ventS);
  for (let y = y0 + 3; y < y1 - 2; y++) for (let x = x0 + 3; x < x1 - 2; x++) if (h(x, y, 90) < 0.04) pset(x, y, T.ventS);   // la pintura martelé
  for (let i = x0 + 5; i <= x1 - 5; i += 8) { pset(i, y0 + 4, T.ventD); pset(i, y1 - 4, T.ventD); pset(i - 1, y0 + 3, T.ventL); }
  for (let j = y0 + 5; j <= y1 - 5; j += 8) { pset(x0 + 4, j, T.ventD); pset(x1 - 4, j, T.ventD); pset(x0 + 3, j - 1, T.ventL); }
  // la boca: el aro estampado, el hueco oscuro con su degradado y el motor al fondo con sus aletas
  disco(cx, cy, r + 4, T.ventS); disco(cx, cy, r + 3, C.k); disco(cx, cy, r + 2, T.ventD); disco(cx, cy, r + 1, T.hueco);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1 && d > 0.55 && f_b4(cx + i, cy + j) < (d - 0.55) * 0.9 && i + j < 0) pset(cx + i, cy + j, T.huecoL); }
  for (let a = Math.PI * 1.05; a < Math.PI * 1.7; a += 0.03) pset(Math.round(cx + Math.cos(a) * (r + 3)), Math.round(cy + Math.sin(a) * (r + 3)), T.ventL);
  const rm = Math.round(r * 0.3); disco(cx, cy, rm + 1, C.k); disco(cx, cy, rm, hex('#2a322e')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(cx + Math.round(Math.cos(a) * 3), cy + Math.round(Math.sin(a) * 3), cx + Math.round(Math.cos(a) * rm), cy + Math.round(Math.sin(a) * rm), hex('#3e4842')); }
  // la placa del fabricante (barras, sin letras) y el cable que baja por la pata
  const px = x0 + 5, py = y1 - 11; rect(px, py, px + 12, py + 6, C.k); rect(px + 1, py + 1, px + 11, py + 5, T.cromoS); rect(px + 2, py + 2, px + 8, py + 2, T.cromoD); rect(px + 2, py + 4, px + 10, py + 4, T.cromoD); pset(px + 1, py + 1, T.cromo);
  for (let y = y1; y < suelo - 1; y++) pset(x1 - 10 + Math.round((y - y1) * 0.2), y, hex('#1e1e22'));
  if (o.mando !== false) {   // la caja de mando, colgada del lado derecho
    const bx = x1 + 1, by = cy + Math.round(r * 0.35); rect(bx, by, bx + 9, by + 17, C.k); rect(bx + 1, by + 1, bx + 8, by + 16, hex('#3a3e44')); rect(bx + 1, by + 1, bx + 8, by + 1, hex('#5a5e66')); rect(bx + 8, by + 2, bx + 8, by + 16, hex('#2a2c30'));
    rect(bx - 1, by + 4, bx, by + 6, C.metalD); rect(bx - 1, by + 12, bx, by + 14, C.metalD);
  }
}

// las aspas, la rejilla y la cinta del ventilador (encima de f_ventCaja): las cuatro aspas anchas de aluminio con el
// filo de ataque claro y el de salida en sombra; con viento giran y, deprisa, se emborronan en un disco tramado; la
// rejilla de alambre (aros y radios con su sombra), el tapacubos con su espiral, la cinta roja atada que se estira y
// ondea, y en la caja de mando el mando que gira y el piloto rojo
function f_ventAspas(R, cx, cy, r, t, v, giro, o = {}) {
  const { pset, disco, linea, rect } = R, T = f_TS, n = 4, paso = Math.PI * 2 / n;
  const rot = giro ?? (v > 0 ? t * (1.5 + 24 * v) : 0.35), borron = Math.min(0.75, v * 0.9);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const d2 = i * i + j * j; if (d2 > r * r) continue; const rho = Math.sqrt(d2) / r; if (rho < 0.28) continue;
    let rel = Math.atan2(j, i) - rot; rel = ((rel % paso) + paso * 1.5) % paso - paso / 2;
    const del = 0.36 * Math.sin(Math.min(1, rho * 1.15) * Math.PI * 0.92) + 0.07, x = cx + i, y = cy + j;
    if (rel > -del && rel < del) {
      if (borron > 0.45 && f_b4(x, y) < borron - 0.25) continue;
      const u = (rel + del) / (2 * del), filo = (del - Math.abs(rel)) * rho * r;
      pset(x, y, filo < 0.9 && borron < 0.45 ? T.aspaS : u > 0.78 ? T.aspaL : u < 0.24 ? T.aspaS : rho > 0.9 ? T.aspaS : T.aspa);
    } else if (rel <= -del && rel > -del - borron * 1.1) { if (f_b4(x, y) < (1 - (-del - rel) / (borron * 1.1)) * 0.55) pset(x, y, T.aspaS); }
  }
  // con mucho viento, el brillo del disco que gira (un arco claro que da vueltas)
  if (borron > 0.4) for (let a = 0; a < 1.2; a += 0.02) { const an = rot * 0.15 - 2.2 + a, rr = r * (0.55 + 0.3 * Math.sin(a * 2.6)); pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr), T.aspaL); }
  // la rejilla: aros apretados de alambre (el de fuera más grueso), ocho radios y el tapacubos
  const nA = Math.max(4, Math.round(r / 5));
  for (let i = 1; i <= nA; i++) R.anillo(cx, cy, r * (0.3 + 0.7 * i / nA) - 0.5, i === nA ? T.rejilla : T.rejillaM);
  R.anillo(cx, cy, r + 0.5, T.rejillaS);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + Math.PI / 8, ca = Math.cos(a), sa = Math.sin(a); linea(Math.round(cx + ca * r * 0.26), Math.round(cy + sa * r * 0.26), Math.round(cx + ca * r), Math.round(cy + sa * r), T.rejilla); }
  const rt = Math.max(3, Math.round(r * 0.17)); disco(cx, cy, rt + 1, C.k); disco(cx, cy, rt, T.cromo); disco(cx + 1, cy + 1, rt - 1, T.cromoS); pset(cx - 1, cy - 1, C.blanco);
  for (let k = 0; k < 3; k++) { const a = rot * 0.2 + k * 2.1; pset(Math.round(cx + Math.cos(a) * (rt - 1)), Math.round(cy + Math.sin(a) * (rt - 1)), T.cromoD); }
  // la cinta roja atada arriba a la derecha de la rejilla: cuelga sin viento, con viento se estira y ondea
  const ax = Math.round(cx + Math.cos(-0.7) * r), ay = Math.round(cy + Math.sin(-0.7) * r), L = Math.round(8 + r * 0.12 + v * 10), dirA = lerp(Math.PI / 2 - 0.15, 0.08, Math.min(1, v * 1.6));
  for (let i = 0; i < L; i++) { const w = Math.sin(t * (6 + v * 14) - i * 0.7) * (0.4 + v * 1.6) * (i / L), x = ax + Math.cos(dirA) * i - Math.sin(dirA) * w, y = ay + Math.sin(dirA) * i + Math.cos(dirA) * w;
    pset(Math.round(x), Math.round(y), i % 3 === 2 ? C.rojoS : C.rojo); pset(Math.round(x), Math.round(y) + 1, C.rojoS); }
  pset(ax, ay, C.k); pset(ax + 1, ay, C.k);
  // la caja de mando: el mando negro con su raya blanca que gira con la velocidad y el piloto rojo encendido
  if (o.mando !== false) {
    const bx = cx + r + 8, by = cy + Math.round(r * 0.35), mx = bx + 4, my = by + 6, a = -Math.PI * 0.75 + v * Math.PI * 1.5;
    disco(mx, my, 3, C.k); disco(mx, my, 2, hex('#1e1e22')); pset(mx + Math.round(Math.cos(a) * 2), my + Math.round(Math.sin(a) * 2), C.blanco);
    for (let k = 0; k < 5; k++) { const b = -Math.PI * 0.75 + k * Math.PI * 0.375; pset(mx + Math.round(Math.cos(b) * 4), my + Math.round(Math.sin(b) * 4), hex('#9a9ea4')); }
    disco(mx, by + 13, 1, v > 0 ? (Math.floor(t * 3) % 4 ? C.rojo : hex('#ff8a7a')) : hex('#5a2a2a')); if (v > 0) pset(mx - 1, by + 12, hex('#ffc0b0'));
  }
}

// las rachas de aire que salen del ventilador hacia la derecha (de x0 a x1, entre y0 e y1): trazos blancos ondulados
// que se desvanecen por la cola, corren más deprisa con más viento, algunos rematados con un rizo, y se apagan al
// alejarse; los tapa lo que se pinte después (la casita)
function f_rachas(R, x0, x1, y0, y1, t, v, n = 16) {
  if (v <= 0.02) return; const L = x1 - x0, cnt = Math.round(n * (0.4 + v));
  for (let k = 0; k < cnt; k++) {
    const vel = 90 + 170 * v + h(k, 3, 91) * 50, cab = x0 + ((t * vel + h(k, 1, 91) * 977) % (L + 60)) - 20, yb = y0 + h(k, 2, 91) * (y1 - y0);
    const lg = Math.round(10 + v * 16 + h(k, 4, 91) * 10), amp = 0.8 + h(k, 5, 91) * 1.6, fase = h(k, 6, 91) * 6, apaga = 1 - Math.max(0, (cab - x0) / L - 0.5) / 0.5;
    if (apaga <= 0) continue;
    for (let i = 0; i < lg; i++) {
      const x = Math.round(cab - i); if (x < x0 || x > x1) continue;
      const y = Math.round(yb + Math.sin(x * 0.08 + fase + t * 2) * amp), a = (1 - i / lg) * 0.9 * apaga;
      if (i < 3 || f_b4(x, y) < a + 0.25) { f_aclara(R, x, y, hex('#f4fbff'), Math.min(0.9, a + 0.3)); if (i % 2 === 0) f_aclara(R, x, y + 1, hex('#8a9aa8'), a * 0.3); }
    }
    if (k % 4 === 0 && apaga > 0.4) for (let j = 0; j < 7; j++) { const an = -1.6 + j * 0.85; f_aclara(R, Math.round(cab + 1 + Math.cos(an) * 2.2), Math.round(yb - 2 + Math.sin(an) * 2.2), C.blanco, 0.55 * apaga); }
  }
}

// el anemómetro de pared (centro cx, cy; radio r): esfera blanca con marcas, la aguja roja que tiembla con el viento y,
// debajo, el contador de mph en cifras verdes
function f_anemometro(R, cx, cy, r, t, mph, v) {
  const { disco, pset, linea, rect } = R, T = f_TS;
  disco(cx + 1, cy + 1, r + 1, f_TS.paredS); disco(cx, cy, r + 1, C.k); disco(cx, cy, r, T.cromoS); disco(cx, cy, r - 1, hex('#f8f6ee'));
  for (let k = 0; k <= 10; k++) { const a = Math.PI * 0.75 + k * Math.PI * 0.15, l = k % 5 === 0 ? 3 : 2; linea(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), Math.round(cx + Math.cos(a) * (r - 1 - l)), Math.round(cy + Math.sin(a) * (r - 1 - l)), k > 7 ? C.rojo : C.k); }
  const tiembla = mph > 0 ? Math.sin(t * 23) * 0.04 * (0.5 + v) : 0, a = Math.PI * 0.75 + Math.min(1, mph / 180) * Math.PI * 1.5 + tiembla;
  linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), C.rojo); disco(cx, cy, 1, C.k); pset(cx - Math.round(r * 0.4), cy - Math.round(r * 0.4), C.blanco);
  const w = 14, x0 = cx - w / 2, y0 = cy + r + 3; rect(x0 - 1, y0 - 1, x0 + w, y0 + 7, C.k); rect(x0, y0, x0 + w - 1, y0 + 6, hex('#10201a'));
  const txt = String(Math.max(0, Math.min(999, mph | 0))); f_cifras(R, txt, Math.round(cx - txt.length * 2 + 1), y0 + 1, mph > 0 ? hex('#7ae89a') : hex('#2e5a3e'));
}

// la casita a escala sobre su plato giratorio (cx: el centro; base: la y de la mesa; W: el ancho de las paredes). d: la
// categoría (0–5), v: el viento, des: el desmontaje (0–1). Devuelve la geometría (x0, x1, yw, gb, cumbrera) para que
// las tejas que vuelan salgan del tejado
function f_casita(R, cx, base, W, t, d, v, des, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, T = f_TS, g = W >= 60;
  const bh = Math.max(2, Math.round(W / 12)), gb = base - 3 - bh - 3;
  const Hw = Math.round(W * 0.42), Hr = Math.round(W * 0.34), ov = Math.max(2, Math.round(W * 0.07)), dep = Math.max(3, Math.round(W * 0.13));
  const x0 = Math.round(cx - W / 2), x1 = x0 + W, yw = gb - Hw, yr = yw - Hr;
  const bx0 = Math.round(cx - W * 0.8), bx1 = Math.round(cx + W * 0.8), rx = Math.round(W * 0.92);
  const geo = { x0, x1, yw, gb, yr, Hw, Hr, ov, base, bx0, bx1, W };
  // el plato giratorio de chapa con sus marcas de grados y la flecha roja del índice
  rect(cx - rx + 2, base - 2, cx + rx - 2, base, C.k); rect(cx - rx, base - 1, cx + rx, base - 1, C.k);
  rect(cx - rx + 2, base - 2, cx + rx - 2, base - 2, T.cromo); rect(cx - rx + 1, base - 1, cx + rx - 1, base - 1, T.cromoS); rect(cx - rx + 3, base, cx + rx - 3, base, T.cromoD);
  for (let x = cx - rx + 4; x < cx + rx - 3; x += g ? 4 : 3) pset(x, base - 1, x % (g ? 16 : 12) < 2 ? C.k : T.cromoD);
  pset(cx, base + 1, C.rojo); pset(cx - 1, base + 2, C.rojo); pset(cx + 1, base + 2, C.rojo);
  // el tablero de contrachapado (las capas en el canto) y el césped de flocado por encima
  rect(bx0, base - 3 - bh + 1, bx1, base - 3, T.contraS); rect(bx0, base - 3 - bh + 1, bx1, base - 3 - bh + 1, T.contraL);
  for (let y = base - 3 - bh + 2; y <= base - 3; y += 2) for (let x = bx0; x <= bx1; x++) if ((x + y) % 5) pset(x, y, T.contra);
  rect(bx0, gb + 1, bx1, gb + 2, T.cesped); for (let x = bx0; x <= bx1; x++) { if (h(x, 1, 95) < 0.3) pset(x, gb + 1, T.cespedL); if (h(x, 2, 95) < 0.3) pset(x, gb + 2, T.cespedS); }
  rect(bx0 - 1, gb + 1, bx0 - 1, base - 3, C.k); rect(bx1 + 1, gb + 1, bx1 + 1, base - 3, C.k);
  // las tejas caídas sobre el césped y el tablero, a sotavento (cuantas más, más categoría)
  for (let k = 0; k < Math.floor(d * 3); k++) { const px = Math.round(x1 + 2 + h(k, 1, 96) * (bx1 - x1 - 3)), py = gb + 1 + (k % 2); rect(px, py, px + 2, py, k % 3 ? T.teja1 : T.teja3); pset(px, py + 1, T.tejaD); }
  // el arbolito de maqueta (esponja en un palito), que se dobla con el viento y en 4–5 se tumba; la valla de estacas;
  // el buzón; la banderita en su mástil, que ondea
  const tx = Math.round(bx0 + W * 0.12), tumba = f_suave((d - 4.2) / 0.6), dobla = v * (1.5 + W / 30) + Math.sin(t * 9 + 1) * v * 0.8;
  { const al = Math.round(W * 0.34), rc = Math.max(3, Math.round(W * 0.11)), a = -Math.PI / 2 + tumba * 1.35 + dobla * 0.06, ex = tx + Math.cos(a) * al, ey = gb + Math.sin(a) * al;
    linea(tx, gb, Math.round(ex), Math.round(ey), T.mesaS); linea(tx + 1, gb, Math.round(ex) + 1, Math.round(ey), T.mesa);
    const cxA = Math.round(ex + dobla), cyA = Math.round(ey), hojas = d > 3 ? Math.max(0.55, 1 - (d - 3) * 0.25) : 1, rr = Math.max(2, Math.round(rc * hojas));
    disco(cxA + 1, cyA + 1, rr, T.cespedS); disco(cxA, cyA, rr, T.cesped); disco(cxA - 1, cyA - 1, Math.max(1, rr - 2), T.cespedL);
    for (let k = 0; k < 4; k++) pset(cxA + Math.round((h(k, 3, 97) - 0.5) * rr * 1.6), cyA + Math.round((h(k, 4, 97) - 0.5) * rr * 1.4), T.cespedS); }
  for (let x = bx0 + 2; x < x0 - 2; x += 2) { if (d > 3.6 && h(x, 5, 97) < (d - 3.6) * 0.5) continue; const al = g ? 4 : 3, inc = Math.round(v * h(x, 6, 97) * (d > 3 ? 2 : 0.6)); linea(x, gb + 2, x + inc, gb + 2 - al, C.blanco); }
  rect(bx0 + 2, gb - (g ? 2 : 1), x0 - 3, gb - (g ? 2 : 1), C.blanco);
  { const mx = x0 - Math.round(W * 0.1); rect(mx, gb - Math.round(W * 0.12), mx, gb, C.k); rect(mx - 2, gb - Math.round(W * 0.12) - 2, mx + 2, gb - Math.round(W * 0.12), hex('#3a5a9a')); pset(mx + 2, gb - Math.round(W * 0.12) - 3, C.rojo); }
  { const fx = bx1 - 3, al = Math.round(W * 0.36); rect(fx, gb - al, fx, gb, T.cromoS); pset(fx, gb - al - 1, T.oro ?? C.oro);
    const lg = Math.round(4 + W * 0.06 + v * 3), an = Math.max(3, Math.round(W * 0.07)), cae = 1 - Math.min(1, v * 2);
    for (let i = 1; i <= lg; i++) for (let j = 0; j < an; j++) { const w = v > 0 ? Math.round(Math.sin(t * (8 + v * 16) - i * 0.9) * (i / lg) * (0.6 + v)) : 0, x = fx + i - Math.round(cae * i * 0.6), y = gb - al + j + w + Math.round(cae * i * 0.8);
      pset(x, y, i <= lg * 0.45 && j < an * 0.6 ? hex('#2a4a9a') : j % 2 ? C.blanco : C.rojo); } }
  // ── la casa ──
  const roof = d < 4.15, techoVuela = f_suave((d - 4.15) / 0.35);
  const thF = des * 1.0, th = (a, b) => f_suave((thF - a) / b) * Math.PI / 2;
  const angF = th(0, 0.6), angS = th(0.1, 0.6), angB = th(0.2, 0.6);
  // el interior que se ve sin tejado: el suelo de tablas, la pared de atrás empapelada (con un cuadrito) y los muebles
  if (!roof || des > 0) {
    const yb = gb - dep;
    rect(x0, yb, x1, gb, T.suelito); for (let y = yb + 1; y <= gb; y += 2) rect(x0, y, x1, y, T.suelitoS); for (let x = x0 + 3; x < x1; x += 7) pset(x + (Math.floor((x - x0) / 7) % 2) * 3, yb + 2, T.suelitoS);
    // la pared de atrás: de pie (o tumbándose hacia atrás, cada vez más baja)
    const hb = Math.round(Hw * Math.cos(angB) + Hw * Math.sin(angB) * 0.18), top = yb - hb;
    rect(x0, top, x1, yb, C.k); rect(x0 + 1, top + 1, x1 - 1, yb, angB > 1.2 ? T.casaS : T.papelP);
    if (angB < 1.2) {
      for (let x = x0 + 2; x < x1 - 1; x += 4) rect(x, top + 1, x + 1, yb - 1, T.papelPS);
      for (let x = x0 + 3; x < x1 - 1; x += 4) for (let y = top + 2; y < yb - 1; y += 3) pset(x + 1, y, hex('#d88a7a'));
      rect(x0 + 1, yb - 1, x1 - 1, yb, T.suelitoS);
      const vw = Math.max(4, Math.round(W * 0.16)), vh = Math.max(2, Math.round(hb * 0.38)), vx = Math.round(x0 + W * 0.2), vy = top + Math.round(hb * 0.22);
      if (hb > 7) { rect(vx - 1, vy - 1, vx + vw, vy + vh, C.blanco); rect(vx, vy, vx + vw - 1, vy + vh - 1, hex('#bfe0f0')); rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh - 1, C.blanco); pset(vx, vy, C.blanco); }
      const fx = Math.round(x0 + W * 0.62), fy = top + Math.round(hb * 0.25), fw = Math.max(3, Math.round(W * 0.12)), fh = Math.max(2, Math.round(hb * 0.24));
      if (hb > 6) { rect(fx, fy, fx + fw, fy + fh, C.oroS ?? C.oro); rect(fx + 1, fy + 1, fx + fw - 1, fy + fh - 1, hex('#7ab0d8')); if (fh > 3) rect(fx + 1, fy + fh - 2, fx + fw - 1, fy + fh - 1, hex('#6aa84a')); }
    } else { for (let x = x0 + 2; x < x1 - 1; x += 3) pset(x, top + 1, T.casaD); }
    // los muebles diminutos: la camita, la mesita y la lámpara
    const mb = Math.max(2, Math.round(W * 0.06));
    rect(x0 + 3, gb - mb - 1, x0 + 3 + Math.round(W * 0.28), gb - 1, C.k); rect(x0 + 4, gb - mb, x0 + 2 + Math.round(W * 0.28), gb - 2, hex('#c85a5a')); rect(x0 + 4, gb - mb, x0 + 6, gb - mb + 1, C.blanco);
    const mx = Math.round(cx + W * 0.12); rect(mx, gb - mb - 1, mx + Math.round(W * 0.14), gb - mb, T.mesaS); rect(mx, gb - mb, mx, gb, T.mesaS); rect(mx + Math.round(W * 0.14), gb - mb, mx + Math.round(W * 0.14), gb, T.mesaS);
    const lx = x1 - 4; rect(lx, gb - mb - 3, lx, gb, T.cromoD); rect(lx - 1, gb - mb - 4, lx + 1, gb - mb - 3, C.amarillo);
  }
  // las paredes de los lados: de canto (de pie) o abriéndose hacia fuera hasta quedar tumbadas sobre el césped
  for (const [px, sg] of [[x0, -1], [x1, 1]]) {
    const yb = gb - dep, sa = Math.sin(angS), ca = Math.cos(angS);
    const P = [[px, gb + 1], [px, yb], [px + sg * Hw * sa, yb - Hw * ca], [px + sg * Hw * sa, gb + 1 - Hw * ca]].map(([x, y]) => [Math.round(x), Math.round(y)]);
    if (angS > 0.05) { poligono(P.map(([x, y]) => [x + sg, y + 1]), C.k); poligono(P, T.casa); for (let k = 1; k < 5; k++) { const u = k / 5; linea(Math.round(px + sg * Hw * sa * u), Math.round(gb - Hw * ca * u), Math.round(px + sg * Hw * sa * u), Math.round(yb - Hw * ca * u), T.casaS); } }
    else { rect(Math.min(px, px + sg), yb - Hw, Math.max(px, px + sg), gb, T.casaS); rect(px, yb - Hw, px, gb, C.k); }
  }
  // la fachada: de pie, inclinándose hacia delante (cada vez más baja) o tumbada delante, enseñando la cara de dentro
  if (angF < 1.25) f_fachada(R, x0, x1, Math.round(gb - Hw * Math.cos(angF)), gb, W, t, d, v);
  else { const hh = Math.max(2, Math.round(Hw * Math.sin(angF) * 0.2)); rect(x0 - 1, gb, x1 + 1, gb + hh + 1, C.k); rect(x0, gb + 1, x1, gb + hh, T.papelP); rect(x0, gb + hh, x1, gb + hh, T.casaS); for (let x = x0 + 2; x < x1; x += 4) rect(x, gb + 1, x + 1, gb + hh - 1, T.papelPS);
    const ww = Math.max(3, Math.round(W * 0.17)); for (const wx of [Math.round(x0 + W * 0.13), Math.round(x0 + W * 0.52)]) rect(wx, gb + hh - Math.max(1, Math.round(hh * 0.7)), wx + ww, gb + hh - 1, T.interior);
    const dw = Math.max(2, Math.round(W * 0.16)), dx = Math.round(cx - dw / 2) + Math.round(W * 0.06); rect(dx, gb + 1, dx + dw, gb + Math.max(1, Math.round(hh * 0.6)), T.interior); }
  // el tejado: tableros, armadura y tejas (mientras siga puesto) o la armadura que se va volando y cae junto a la casa
  if (roof) f_tejado(R, geo, t, d, v);
  else {
    const p = techoVuela, lx = x1 + Math.round(W * 0.05), ly = gb + 2, ancho = Math.round(W * 0.42);
    if (p < 1) {
      const dx = Math.round(p * (lx + ancho / 2 - cx)), dy = Math.round(-Math.sin(p * Math.PI) * Hr * 0.8 + p * p * (ly - yw)), rotA = p * 0.9;
      for (let k = 0; k <= 6; k++) { const u = k / 6, xa = x0 - ov + u * (W + 2 * ov), xb = lerp(x0 + Hr, x1 - Hr, u); const ax = cx + dx + (xa - cx) * Math.cos(rotA), ay = yw + dy + (xa - cx) * Math.sin(rotA) * 0.5, bx = cx + dx + (xb - cx) * Math.cos(rotA) + Hr * Math.sin(rotA), by = yr + dy + (xb - cx) * Math.sin(rotA) * 0.5 + Hr * (1 - Math.cos(rotA)); linea(Math.round(ax), Math.round(ay), Math.round(bx), Math.round(by), k % 3 ? T.viga : T.vigaS); }
      linea(Math.round(cx + dx - (W / 2 + ov) * Math.cos(rotA)), Math.round(yw + dy - (W / 2) * Math.sin(rotA) * 0.5), Math.round(cx + dx + (W / 2 + ov) * Math.cos(rotA)), Math.round(yw + dy + (W / 2) * Math.sin(rotA) * 0.5), T.vigaS);
    } else {
      for (let j = 0; j < 3; j++) rect(lx + j, ly - j, lx + ancho - j, ly - j, j === 1 ? T.vigaS : T.viga);
      for (let x = lx + 2; x < lx + ancho; x += 4) rect(x, ly - 2, x, ly, T.vigaS); rect(lx - 1, ly + 1, lx + ancho + 1, ly + 1, T.mesaS);
    }
  }
  // la chimenea que se tumba (3,6–3,9) y queda en la mesa
  if (d >= 3.9) { const cw = Math.max(4, Math.round(W * 0.16)), cxh = cx + rx + 1, cyh = base - 1; rect(cxh - 1, cyh - 3, cxh + cw + 1, cyh + 1, C.k); rect(cxh, cyh - 2, cxh + cw, cyh, T.ladrilloC); for (let x = cxh + 1; x < cxh + cw; x += 3) pset(x, cyh - 1, hex('#e0c8b0')); rect(cxh, cyh - 2, cxh + cw, cyh - 2, hex('#c4644e')); }
  return geo;
}

// la fachada de la casita entre yt (arriba) y gb (el suelo): tablas de chilla con su luz y su sombra, las esquineras
// blancas, la puerta azul con su pomo y su escalón, las dos ventanas con cruz, cristal y brillo (en 3,4 salta un cristal)
// y sus contraventanas verdes de lamas, que aletean y salen volando; el zócalo gris y la sombra del alero
function f_fachada(R, x0, x1, yt, gb, W, t, d, v) {
  const { rect, pset } = R, T = f_TS, Hw = gb - yt, Hn = Math.round(W * 0.42), k = Hn > 0 ? Hw / Hn : 1, g = W >= 60;
  if (Hw < 1) return;
  rect(x0, yt, x1, gb, C.k); rect(x0 + 1, yt + 1, x1 - 1, gb - 1, T.casa);
  for (let y = yt + 2; y < gb - 1; y += g ? 3 : 2) { rect(x0 + 1, y, x1 - 1, y, T.casaS); if (g) rect(x0 + 1, y - 1, x1 - 1, y - 1, T.casaL); }
  rect(x0 + 1, yt + 1, x0 + 2, gb - 1, T.casaL); rect(x1 - 2, yt + 1, x1 - 1, gb - 1, T.casaS); rect(x0 + 1, yt + 1, x1 - 1, yt + 1, T.casaD);
  rect(x0 + 1, gb - 1, x1 - 1, gb - 1, hex('#8a8a8a'));
  const Y = (f) => Math.round(yt + f * Hw);
  // la puerta, en el centro
  const dw = Math.max(3, Math.round(W * 0.16)), dx = Math.round((x0 + x1) / 2 - dw / 2) + Math.round(W * 0.06), dt = Y(0.36);
  rect(dx - 1, dt - 1, dx + dw, gb - 1, C.k); rect(dx, dt, dx + dw - 1, gb - 2, T.puertaC); rect(dx, dt, dx, gb - 2, hex('#4a7ab0'));
  if (g && gb - dt > 10) { rect(dx + 2, dt + 2, dx + dw - 3, dt + Math.round((gb - dt) * 0.4), hex('#244a72')); rect(dx + 2, gb - Math.round((gb - dt) * 0.45), dx + dw - 3, gb - 4, hex('#244a72')); }
  pset(dx + dw - 2, Math.round((dt + gb) / 2), C.oro); rect(dx - 2, gb, dx + dw + 1, gb, hex('#a8a8a8'));
  // las dos ventanas con sus contraventanas
  const ww = Math.max(4, Math.round(W * 0.17)), wh = Math.max(2, Math.round(Hw * 0.42)), wy = Y(0.26);
  [Math.round(x0 + W * 0.13), Math.round(x0 + W * 0.58) - (g ? 0 : 1)].forEach((wx, i) => {
    const ax = i === 0 ? wx : wx - Math.round(W * 0.06);
    rect(ax - 1, wy - 1, ax + ww, wy + wh, C.blanco); rect(ax, wy, ax + ww - 1, wy + wh - 1, d >= 3.4 + i * 0.25 ? T.interior : hex('#8ac4e4'));
    if (!(d >= 3.4 + i * 0.25)) { pset(ax + 1, wy + 1, C.blanco); if (ww > 5) pset(ax + 2, wy + 1, hex('#d0ecfa')); }
    rect(ax + (ww >> 1), wy, ax + (ww >> 1), wy + wh - 1, C.blanco); rect(ax, wy + (wh >> 1), ax + ww - 1, wy + (wh >> 1), C.blanco);
    rect(ax - 1, wy + wh, ax + ww, wy + wh, T.casaD);
    // contraventanas: la de sotavento (derecha) de cada ventana se va antes; aletean antes de soltarse
    for (const [sx, lado, um] of [[ax - 2 - Math.max(1, Math.round(ww * 0.4)), -1, 2.9 + i * 0.35], [ax + ww + 1, 1, 2.45 + i * 0.3]]) {
      if (d >= um) continue;
      const sw = Math.max(1, Math.round(ww * 0.4)), ale = d > um - 0.9 && v > 0 ? Math.sin(t * (16 + v * 10) + sx) : 0, w2 = Math.max(1, Math.round(sw * (1 - Math.abs(ale) * 0.7)));
      const xa = lado < 0 ? sx + sw - w2 : sx;
      rect(xa, wy - 1, xa + w2, wy + wh, T.postigo); for (let y = wy; y < wy + wh; y += 2) rect(xa, y, xa + w2, y, T.postigoS);
      if (ale > 0.4) rect(xa, wy - 1, xa + w2, wy - 1, C.blanco);
    }
  });
  // la sombra del alero sobre la fachada
  if (Hw > 4) for (let x = x0 + 1; x < x1; x++) if (x % 2) pset(x, yt + 2, T.casaD);
}

// el tejado a cuatro aguas de la casita (geo: lo que devuelve f_casita): la armadura (las vigas que se ven cuando faltan
// tableros), los cuatro tableros de contrachapado con sus juntas, las hileras de tejas de asfalto al tresbolillo (tres
// tonos, el canto en sombra), cada teja con su umbral de viento (antes las del borde de barlovento, las del alero y las
// de la cumbrera): aletean al acercarse y desaparecen al pasarlo; la chimenea de ladrillo (que se inclina en 3,6–3,9)
// y el canalón blanco con la sombra sobre la fachada
function f_tejado(R, geo, t, d, v) {
  const { rect, pset, linea } = R, T = f_TS, { x0, x1, yw, yr, Hr, ov, W } = geo, g = W >= 60;
  const ins = Hr + ov, xl = (y) => (x0 - ov) + (yw - y) * (ins / Hr), xr = (y) => (x1 + ov) - (yw - y) * (ins / Hr);
  const ancho = W + 2 * ov, panel = (x) => Math.min(3, Math.floor((x - (x0 - ov)) / ancho * 4)), umbralP = (j) => 3.0 + j * 0.28;
  // la armadura y los tableros, píxel a píxel dentro del trapecio
  for (let y = yr; y <= yw; y++) {
    const a = Math.round(xl(y)), b = Math.round(xr(y));
    for (let x = a; x <= b; x++) {
      const j = panel(x), ida = d >= umbralP(j) + 0.3, aletea = !ida && d > umbralP(j) - 0.2 && v > 0 && Math.sin(t * 13 + j * 2) > 0.3;
      let c;
      if (ida) c = ((x - x0) % (g ? 6 : 4) === 0) ? T.viga : (y === yw || y === yr) ? T.vigaS : T.interior;
      else if (d < 2.2 + 1.1 * ((x - (x0 - ov)) / ancho) + 0.5 * h(x >> 2, y >> 1, 102)) c = (yw - y) % (g ? 3 : 2) === 0 ? T.fieltroL : T.fieltro;   // el fieltro asfáltico bajo las tejas
      else { c = (y - yr) % (g ? 8 : 6) === 0 ? T.tableroS : T.tablero; if (x === Math.round((x0 - ov) + (j + 1) * ancho / 4)) c = T.tableroS; if (aletea && y < yr + 2) c = T.tableroS; if (h(x, y, 103) < 0.05) c = T.tableroS; }
      pset(x, y, c);
    }
  }
  // las tejas, hilera a hilera desde el alero
  const sh = g ? 3 : 2, sw = g ? 6 : 4, nr = Math.floor(Hr / sh);
  let i = 0;
  for (let r = 0; r < nr; r++) {
    const y1 = yw - 1 - r * sh, y0 = y1 - sh + 1, a = Math.round(xl(y0)), b = Math.round(xr(y0)), off = (r % 2) * (sw >> 1);
    for (let x = a - off; x <= b; x += sw, i++) {
      const xs = Math.max(a, x), xe = Math.min(b, x + sw - 1); if (xe < xs) continue;
      const j = panel(xs); if (d >= umbralP(j) + 0.3) continue;
      const u = (xs - a) / Math.max(1, b - a), borde = r === 0 || r === nr - 1 || xs <= a + 1 || xe >= b - 1;
      const um = 0.7 + 3.0 * (0.5 * h(i, r, 98) + 0.5 * Math.min(1, u * 1.2)) - (borde ? 0.45 : 0);
      if (d >= um) continue;
      const lev = v > 0 && d > um - 0.55 && Math.sin(t * (15 + 10 * v) + i * 2.3) > 0.1 - (d - um + 0.55) ? 1 : 0;
      const col = [T.teja1, T.teja2, T.teja3][Math.floor(h(i, r, 99) * 3)];
      rect(xs, y0 - lev, xe, y1 - lev, col); rect(xs, y1 - lev, xe, y1 - lev, T.tejaD); if (xe === x + sw - 1) rect(xe, y1 - lev - (g ? 1 : 0), xe, y1 - lev, T.tejaD);
      if (h(i, r, 100) < 0.35) rect(xs, y0 - lev, xs + (g ? 1 : 0), y0 - lev, T.tejaL);
      if (lev) { rect(xs, y1, xe, y1, C.k); rect(xs, y1 - 1, xe, y1 - 1, T.tejaL); }
    }
  }
  // la cumbrera y los limatesas (los cantos inclinados)
  rect(Math.round(xl(yr)), yr, Math.round(xr(yr)), yr, d < 2.2 ? T.tejaD : T.vigaS);
  linea(x0 - ov, yw, Math.round(xl(yr)), yr, d < 1.6 ? T.tejaD : T.vigaS); linea(x1 + ov, yw, Math.round(xr(yr)), yr, d < 1.6 ? T.tejaD : T.vigaS);
  // la chimenea de ladrillo, que se inclina y cae
  if (d < 3.9) {
    const inc = f_suave((d - 3.6) / 0.3), cw = Math.max(3, Math.round(W * 0.1)), chx = Math.round(x1 - W * 0.3), chb = Math.round(yr + Hr * 0.35), cht = yr - Math.max(3, Math.round(W * 0.09));
    for (let y = cht; y <= chb; y++) { const dx = Math.round(inc * (chb - y) * 0.8); rect(chx + dx, y, chx + cw + dx, y, (y - cht) % 2 ? T.ladrilloC : hex('#c4644e')); if ((y - cht) % 2 === 0) pset(chx + dx + 1 + ((y >> 1) % 2) * 2, y, hex('#e0c8b0')); pset(chx + dx - 1, y, C.k); pset(chx + cw + dx + 1, y, C.k); }
    rect(chx - 1 + Math.round(inc * (chb - cht) * 0.8), cht - 1, chx + cw + 1 + Math.round(inc * (chb - cht) * 0.8), cht - 1, hex('#5a5a5a'));
  }
  // el canalón blanco y su sombra sobre la fachada
  rect(x0 - ov, yw, x1 + ov, yw, C.blanco); rect(x0 - ov, yw + 1, x1 + ov, yw + 1, T.casaD);
}

// las piezas que se lleva el viento desde el tejado de la casita (geo): tejas y, con más categoría, contraventanas,
// trozos de tablero y tablas de la chilla; cada una vuela a sotavento dando vueltas en su arco y cae (hasta suelo) o
// sale por xMax
function f_escombros(R, geo, t, d, v, xMax, suelo) {
  if (v <= 0.05 || d < 0.6) return; const T = f_TS, { x0, x1, yw, yr, W } = geo, n = Math.min(10, Math.round(d * 2 * (0.4 + v)));
  for (let k = 0; k < n; k++) {
    const P = (1.4 + h(k, 1, 101) * 1.1) * (1.25 - 0.45 * v), u = ((t / P + h(k, 2, 101)) % 1), sx = x0 + h(k, 3, 101) * W * 0.9, sy = lerp(yw, yr, h(k, 4, 101)), L = (xMax - sx) * (0.55 + h(k, 5, 101) * 0.6);
    const x = sx + u * L, y = sy - Math.sin(Math.min(1, u * 1.4) * Math.PI) * (6 + h(k, 6, 101) * 14) * (W / 40) + u * u * (suelo - sy) * (0.5 + h(k, 7, 101) * 0.6);
    if (x > xMax || y > suelo) continue;
    const tipo = d >= 4.3 && k % 4 === 3 ? 3 : d >= 3.4 && k % 3 === 2 ? 2 : d >= 2.4 && k % 4 === 1 ? 1 : 0, a = t * (9 + k) + k;
    const s = W >= 60 ? 1.5 : 1;
    if (tipo === 0) f_pieza(R, x, y, Math.round(4 * s), Math.round(2 * s), a, [T.teja1, T.teja2, T.teja3][k % 3], T.tejaD);
    else if (tipo === 1) f_pieza(R, x, y, Math.round(2 * s), Math.round(5 * s), a, T.postigo, T.postigoS);
    else if (tipo === 2) f_pieza(R, x, y, Math.round(5 * s), Math.round(3 * s), a, T.tablero, T.tableroS);
    else f_pieza(R, x, y, Math.round(7 * s), 1 + (s > 1 ? 1 : 0), a, T.casa, T.casaS);
  }
}

// la teja del gag (u 0–1): sale del tejado (sx, sy), vuela en arco y da en la campanita (bx, by: lo alto de la cúpula)
// en u = 0,7; rebota y queda tumbada en el mostrador (yM). Devuelve el golpe (0–1 desde que suena, o −1)
function f_tejaGag(R, u, sx, sy, bx, by, yM, s = 1) {
  if (u < 0) return -1; const T = f_TS;
  if (u < 0.7) { const e = u / 0.7, x = lerp(sx, bx, e), y = lerp(sy, by, e) - Math.sin(e * Math.PI) * 26 * s; f_pieza(R, x, y, Math.round(4 * s), Math.round(2 * s), e * 14, T.teja2, T.tejaD); return -1; }
  const e = Math.min(1, (u - 0.7) / 0.14), x = bx + (3 + e * 7) * s, y = lerp(by - 2 * s, yM - 1, e) - Math.sin(e * Math.PI) * 5 * s;
  f_pieza(R, x, y, Math.round(4 * s), Math.round(2 * s), e < 1 ? 14 + e * 9 : 0, T.teja2, T.tejaD);
  return (u - 0.7) / 0.3;
}

// la campanita de recepción (x: el centro; y: la base; s 1 o 2): la peana negra con su brillo, la cúpula cromada con la
// luz arriba a la izquierda y el reflejo, el botón del timbre; golpe (0–1, o −1): tiembla, suelta ondas y un destello
function f_campana(R, x, y, s, t, golpe = -1) {
  const { rect, pset, disco } = R, T = f_TS, sh = golpe >= 0 && golpe < 0.5 ? Math.round(Math.sin(golpe * 120) * (1 - golpe * 2) * s) : 0;
  rect(x - 5 * s, y - 2 * s + 1, x + 5 * s, y, C.k); rect(x - 4 * s, y - 2 * s + 1, x + 4 * s, y - 1, hex('#2a2a32')); rect(x - 4 * s, y - 2 * s + 1, x + 4 * s, y - 2 * s + 1, hex('#5a5a66'));
  const cy = y - 2 * s, r = 4 * s, X = x + sh;
  for (let j = -r - 1; j <= 0; j++) for (let i = -r - 1; i <= r + 1; i++) { const dd = Math.hypot(i, j * 1.05); if (dd > r + 0.5) continue; const c = dd > r - 0.6 ? C.k : (i < -r * 0.2 && j < -r * 0.3) ? T.cromo : (i > r * 0.35 || j > -1) ? T.cromoD : T.cromoS; pset(X + i, cy + j, c); }
  pset(X - Math.round(r * 0.45), cy - Math.round(r * 0.55), C.blanco); if (s > 1) { pset(X - Math.round(r * 0.45) + 1, cy - Math.round(r * 0.55), C.blanco); pset(X - Math.round(r * 0.45), cy - Math.round(r * 0.55) + 1, C.blanco); }
  rect(X - s + 1, cy - r - 2 * s, X + s - 1, cy - r, C.k); rect(X, cy - r - 2 * s + 1, X, cy - r, T.cromoS); disco(X, cy - r - 2 * s, s, C.k); pset(X, cy - r - 2 * s, T.cromo);
  if (golpe >= 0 && golpe < 1) {
    for (let i = 0; i < 3; i++) { const rr = (6 + i * 4 + golpe * 10) * s, f = golpe * 1.6 + i * 0.25; if (f > 1.2) continue;
      for (const [a0, a1] of [[-0.9, 0.5], [Math.PI - 0.5, Math.PI + 0.9]]) for (let a = a0; a <= a1; a += 0.5 / rr) { const px = Math.round(X + Math.cos(a) * rr), py = Math.round(cy - r * 0.5 + Math.sin(a) * rr * 0.8); if ((px + py) % 2 === 0 || f < 0.5) pset(px, py, f < 0.6 ? C.blanco : T.cromoS); } }
    if (golpe < 0.3) { const sx = X + 2 * s, sy = cy - r - 3 * s, l = Math.round((3 - golpe * 6) * s) + 1; for (let k = -l; k <= l; k++) { pset(sx + k, sy, hex('#fff6c0')); pset(sx, sy + k, hex('#fff6c0')); } pset(sx, sy, C.blanco); }
  }
}

// los iconos de daños de cada categoría, en el color de su ventanilla (cx, cy: el centro; 21 × 15): 1 la casa entera y
// dos tejas que salen volando; 2 le falta una esquina del tejado y el arbolito se dobla; 3 medio tejado, con las vigas;
// 4 solo las paredes, con una grieta y tablas al aire; 5 un montón de tablas en el suelo y el remolino
function f_iconoDanos(R, k, cx, cy, c, cS) {
  const { rect, pset, linea, poligono } = R, x0 = cx - 10, y1 = cy + 7;
  const paredes = () => { rect(x0 + 4, cy - 1, x0 + 15, y1, c); rect(x0 + 6, cy + 1, x0 + 8, cy + 3, cS); rect(x0 + 11, cy + 2, x0 + 13, y1, cS); };
  const tejado = () => poligono([[x0 + 2, cy - 1], [x0 + 9.5, cy - 7], [x0 + 18, cy - 1]], c);
  if (k <= 3) paredes();
  if (k === 1) { tejado(); rect(x0 + 13, cy - 6, x0 + 13, cy - 4, c); for (const [x, y] of [[x0 + 17, cy - 8], [x0 + 20, cy - 5]]) { rect(x, y, x + 1, y, c); pset(x - 2, y, cS); } }
  if (k === 2) { poligono([[x0 + 2, cy - 1], [x0 + 9.5, cy - 7], [x0 + 13, cy - 4], [x0 + 13, cy - 1]], c); for (const [x, y] of [[x0 + 16, cy - 7], [x0 + 19, cy - 4], [x0 + 18, cy - 9]]) { rect(x, y, x + 1, y, c); pset(x - 2, y, cS); }
    linea(x0, y1, x0 + 1, cy - 2, cS); rect(x0 + 1, cy - 4, x0 + 3, cy - 3, c); }
  if (k === 3) { poligono([[x0 + 2, cy - 1], [x0 + 9.5, cy - 7], [x0 + 10, cy - 1]], c); for (let x = x0 + 11; x <= x0 + 17; x += 2) linea(x, cy - 1, x0 + 10, cy - 6, cS); for (const [x, y] of [[x0 + 19, cy - 8], [x0 + 16, cy - 10]]) { rect(x, y, x + 2, y, c); } }
  if (k === 4) { rect(x0 + 4, cy - 1, x0 + 15, y1, c); rect(x0 + 4, cy - 1, x0 + 15, cy - 1, cS); linea(x0 + 9, cy, x0 + 11, cy + 4, cS); linea(x0 + 11, cy + 4, x0 + 10, y1, cS); rect(x0 + 6, cy + 1, x0 + 8, cy + 3, cS);
    for (const [x, y, w] of [[x0 + 14, cy - 6, 4], [x0 + 17, cy - 3, 3], [x0 + 9, cy - 8, 3]]) rect(x, y, x + w, y, c); }
  if (k === 5) { for (const [x, y, w] of [[x0 + 1, y1, 18], [x0 + 3, y1 - 1, 13], [x0 + 5, y1 - 2, 9], [x0 + 8, y1 - 3, 3]]) rect(x, y, x + w, y, c); linea(x0 + 4, y1 - 3, x0 + 9, y1 - 6, c); linea(x0 + 12, y1 - 4, x0 + 16, y1 - 2, cS);
    for (let a = 0; a < 5.5; a += 0.35) pset(Math.round(cx + 4 + Math.cos(a) * (1 + a)), Math.round(cy - 5 + Math.sin(a) * (1 + a) * 0.6), c); }
}

// el panel de la escala: caja de nogal con su veta, el bisel, cuatro tornillos y cinco ventanillas de cristal (cw × ch,
// desde x0, y0) con los números del 1 al 5 (tam: el tamaño de la cifra). Las encendidas tienen el fondo en su color, el
// número con su rampa de luz, un halo y el brillo del cristal; la que se está encendiendo (marca con decimales) parpadea;
// o.solo deja encendida solo la de marca. o.iconos (alto en px) añade debajo de cada número su icono de daños; o.mph,
// la placa con el umbral. Devuelve [x1, y1], la esquina de abajo a la derecha de la caja
function f_panel15(R, x0, y0, cw, ch, t, marca, o = {}) {
  const { rect, pset } = R, T = f_TS, gap = o.gap ?? 2, pad = o.pad ?? 3, tam = o.tam ?? 16, ic = o.iconos ?? 0, mp = o.mph ? 9 : 0;
  const x1 = x0 + pad * 2 + cw * 5 + gap * 4 - 1, y1 = y0 + pad * 2 + ch + ic + mp - 1;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, T.panel);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if (h(x >> 3, y, 120) < 0.18 && (x + y) % 3) pset(x, y, T.panelV);
  rect(x0, y0, x1, y0, T.panelL); rect(x0, y0, x0, y1, T.panelL); rect(x0, y1, x1, y1, T.panelS); rect(x1, y0, x1, y1, T.panelS);
  for (const [sx, sy] of [[x0 + 1, y0 + 1], [x1 - 2, y0 + 1], [x0 + 1, y1 - 2], [x1 - 2, y1 - 2]]) { pset(sx, sy, T.cromoS); pset(sx + 1, sy + 1, T.panelS); }
  for (let k = 1; k <= 5; k++) {
    const cx0 = x0 + pad + (k - 1) * (cw + gap), cy0 = y0 + pad, f = marca - (k - 1);
    let on = o.solo ? (Math.floor(marca) === k || (f > 0 && f < 1 && Math.ceil(marca) === k)) : f >= 1;
    if (f > 0 && f < 1 && !(o.solo && Math.floor(marca) === k)) on = f > 0.12 && (Math.sin(t * 43 + k) > 0.55 - f * 1.4 || f > 0.92);
    if (o.solo && f >= 1 && Math.floor(marca) !== k) on = false;
    const ramp = f_CAT[k], fondo = on ? f_mezcla(ramp[3], C.k, 0.5) : T.cristalP;
    rect(cx0, cy0, cx0 + cw - 1, cy0 + ch - 1, C.k); rect(cx0 + 1, cy0 + 1, cx0 + cw - 2, cy0 + ch - 2, fondo);
    if (on) for (let y = cy0 + 1; y < cy0 + ch - 1; y++) for (let x = cx0 + 1; x < cx0 + cw - 1; x++) { const dd = Math.hypot((x - cx0 - cw / 2) / (cw / 2), (y - cy0 - ch / 2) / (ch / 2)); if (f_b4(x, y) < (1 - dd) * 1.1) pset(x, y, f_mezcla(ramp[3], C.k, 0.12)); if (dd < 0.55 && f_b4(x, y) < (0.55 - dd) * 1.4) pset(x, y, f_mezcla(ramp[2], ramp[3], 0.4)); }
    R.numero(String(k), cx0 + Math.round(cw / 2) + 1, cy0 + Math.round(ch / 2 + tam * 0.56), { tam, centro: true, rampa: on ? ramp : f_APAGADA, sombra: false });
    // el brillo del cristal (una raya en diagonal) y la bombilla que se transparenta
    for (let i = 0; i < Math.min(cw, ch) * 0.5; i++) { const x = cx0 + 2 + i, y = cy0 + ch - 3 - i * 2; if (y > cy0 + 1 && (i % 3 !== 2)) pset(x, y, on ? f_mezcla(ramp[1], C.blanco, 0.4) : T.cristalL); }
    if (ic) { const iy = cy0 + ch + 1; rect(cx0, iy, cx0 + cw - 1, iy + ic - 2, C.k); rect(cx0 + 1, iy + 1, cx0 + cw - 2, iy + ic - 3, on ? f_mezcla(ramp[4], C.k, 0.5) : T.cristalP); f_iconoDanos(R, k, cx0 + Math.round(cw / 2), iy + Math.round(ic / 2) - 1, on ? ramp[1] : f_APAGADA[1], on ? ramp[3] : f_APAGADA[3]); }
    if (mp) { const my = cy0 + ch + ic + 1, txt = String(f_UMBRAL[k]); rect(cx0 + 2, my, cx0 + cw - 3, my + 6, T.cromoS); rect(cx0 + 2, my, cx0 + cw - 3, my, T.cromo); f_cifras(R, txt, cx0 + Math.round(cw / 2) - txt.length * 2 + 1, my + 1, on ? hex('#3a2418') : T.cromoD); }
    // el halo de luz que se escapa por el canto del cristal
    if (on && o.halo !== false) for (let x = cx0 - 1; x <= cx0 + cw; x++) { if ((x + t * 10 | 0) % 7 === 0) continue; pset(x, cy0 - 1, ramp[2]); }
  }
  return [x1, y1];
}

// la luz de colores que echan las ventanillas encendidas sobre lo que hay debajo (la pared, la balda): manchas tramadas
function f_panelLuz(R, x0, y0, cw, gap, pad, marca, alto, o = {}) {
  for (let k = 1; k <= 5; k++) { if (!(o.solo ? Math.floor(marca) === k : marca >= k)) continue; const cx = x0 + pad + (k - 1) * (cw + gap) + cw / 2, col = f_CAT[k][2];
    for (let j = 0; j < alto; j++) for (let i = -cw; i <= cw; i++) { const x = Math.round(cx + i), y = y0 + j; if ((x + y) % 2 === 0 && f_b4(x, y) < (1 - j / alto) * (1 - Math.abs(i) / cw) * 0.9) f_aclara(R, x, y, col, 0.18); } }
}

// un plano azul chinchetado (x0..x1, y0..y1): papel cianotipo con su retícula, el dibujo en blanco (tipo 0: el alzado de
// una casa con cotas; tipo 1: la planta con sus habitaciones; tipo 2: el detalle de un anclaje de tejado), el cajetín, la
// sombra en la pared y las chinchetas. Las puntas de abajo se levantan con el viento en f_planoPunta
function f_plano(R, x0, y0, x1, y1, tipo) {
  const { rect, pset, linea } = R, T = f_TS, w = x1 - x0, hh = y1 - y0;
  rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, f_TS.paredS); rect(x0, y0, x1, y1, T.plano);
  for (let x = x0 + 2; x < x1; x += 4) for (let y = y0 + 1; y < y1; y += 2) pset(x, y, T.planoS);
  for (let y = y0 + 2; y < y1; y += 4) for (let x = x0 + 1; x < x1; x += 2) pset(x, y, T.planoS);
  rect(x0, y0, x1, y0, T.planoM); rect(x0, y0, x0, y1, T.planoM); rect(x0, y1, x1, y1, T.planoD);
  const L = T.planoL, X = (f) => Math.round(x0 + f * w), Y = (f) => Math.round(y0 + f * hh);
  if (tipo === 0) {
    rect(X(0.18), Y(0.42), X(0.72), Y(0.42), L); rect(X(0.18), Y(0.42), X(0.18), Y(0.74), L); rect(X(0.72), Y(0.42), X(0.72), Y(0.74), L); rect(X(0.12), Y(0.74), X(0.8), Y(0.74), L);
    linea(X(0.12), Y(0.42), X(0.45), Y(0.16), L); linea(X(0.45), Y(0.16), X(0.78), Y(0.42), L);
    rect(X(0.26), Y(0.5), X(0.34), Y(0.6), L); rect(X(0.52), Y(0.5), X(0.6), Y(0.6), L); rect(X(0.4), Y(0.56), X(0.46), Y(0.74), L);
    rect(X(0.12), Y(0.84), X(0.8), Y(0.84), T.planoM); pset(X(0.12), Y(0.82), L); pset(X(0.12), Y(0.86), L); pset(X(0.8), Y(0.82), L); pset(X(0.8), Y(0.86), L);
    for (let k = 0; k < 3; k++) linea(X(0.84), Y(0.2 + k * 0.08), X(0.94), Y(0.2 + k * 0.08), T.planoM);
  } else if (tipo === 1) {
    rect(X(0.1), Y(0.14), X(0.9), Y(0.14), L); rect(X(0.1), Y(0.7), X(0.9), Y(0.7), L); rect(X(0.1), Y(0.14), X(0.1), Y(0.7), L); rect(X(0.9), Y(0.14), X(0.9), Y(0.7), L);
    rect(X(0.5), Y(0.14), X(0.5), Y(0.38), L); rect(X(0.1), Y(0.42), X(0.62), Y(0.42), L); rect(X(0.62), Y(0.42), X(0.62), Y(0.7), L);
    for (let a = 0; a < 1.6; a += 0.2) pset(Math.round(X(0.5) + Math.cos(a) * 3), Math.round(Y(0.42) + Math.sin(a) * 3), T.planoM);
    rect(X(0.1), Y(0.8), X(0.9), Y(0.8), T.planoM); for (const f of [0.1, 0.5, 0.9]) rect(X(f), Y(0.77), X(f), Y(0.83), L);
  } else {
    rect(X(0.15), Y(0.55), X(0.85), Y(0.62), L); linea(X(0.15), Y(0.55), X(0.5), Y(0.2), L); linea(X(0.5), Y(0.2), X(0.85), Y(0.55), L);
    for (let k = 0; k < 4; k++) rect(X(0.25 + k * 0.17), Y(0.4), X(0.25 + k * 0.17), Y(0.66), T.planoM); f_punto(R, X(0.5), Y(0.75), L);
    rect(X(0.12), Y(0.86), X(0.88), Y(0.86), T.planoM);
  }
  rect(x1 - Math.round(w * 0.32), y1 - 5, x1 - 2, y1 - 2, T.planoD); rect(x1 - Math.round(w * 0.32) + 1, y1 - 4, x1 - 6, y1 - 4, T.planoM);   // el cajetín (barras)
  for (const [cx, cy, c] of [[x0 + 2, y0 + 2, T.chincheR], [x1 - 2, y0 + 2, T.chincheA]]) { R.disco(cx, cy, 1, c); pset(cx - 1, cy - 1, C.blanco); pset(cx + 1, cy + 1, C.k); }
}

// un punto gordo (disco de radio 2) para los dibujos de los planos
const f_punto = (R, x, y, c) => R.disco(x, y, 2, c);

// la punta de abajo de un plano, que el viento levanta y dobla (x, y: la esquina; lado ±1; v el viento)
function f_planoPunta(R, x, y, lado, t, v, k = 0) {
  const { pset } = R, T = f_TS, a = v > 0.05 ? (0.45 + 0.4 * Math.sin(t * (7 + v * 9) + k)) * (0.4 + v) : 0.25, l = 5 + Math.round(v * 2);
  for (let i = 0; i < l; i++) for (let j = 0; j <= i; j++) { const px = x - lado * (l - 1 - i) + lado * Math.round(j * a * 0.5), py = y - (l - 1 - i) + j - Math.round(j * a); if (j === i) pset(px, py, C.k); else pset(px, py, j > i * 0.5 ? T.planoL : T.plano); }
}

// el tablero perforado (x0..x1, y0..y1) con la silueta pintada de cada herramienta y los ganchos (lo fijo)
function f_pegFijo(R, x0, y0, x1, y1) {
  const { rect, pset } = R, T = f_TS;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, T.mesaD); rect(x0, y0, x1, y1, T.pegboard); rect(x0, y0, x1, y0, hex('#d0aa78')); rect(x0, y1, x1, y1, T.pegboardS);
  for (let y = y0 + 2; y < y1; y += 4) for (let x = x0 + 2 + ((y >> 2) & 1) * 0; x < x1; x += 4) { pset(x, y, T.pegboardH); pset(x + 1, y + 1, hex('#c8a474')); }
  for (const tl of f_HERR(x0, y0)) f_herr(R, tl, 0, T.silueta, true);
}

// las herramientas del tablero, en coordenadas del tablero (x0, y0): martillo, serrucho, tres llaves, dos destornilladores,
// alicates, nivel, sargento, rollo de cable y flexómetro
const f_HERR = (x0, y0) => [
  { t: 'martillo', x: x0 + 4, y: y0 + 4 }, { t: 'serrucho', x: x0 + 14, y: y0 + 3 }, { t: 'llave', x: x0 + 4, y: y0 + 22, l: 9 }, { t: 'llave', x: x0 + 8, y: y0 + 22, l: 12 }, { t: 'llave', x: x0 + 12, y: y0 + 22, l: 15 },
  { t: 'destornillador', x: x0 + 18, y: y0 + 24, c: 0 }, { t: 'destornillador', x: x0 + 22, y: y0 + 24, c: 1 }, { t: 'alicates', x: x0 + 27, y: y0 + 23 },
  { t: 'nivel', x: x0 + 4, y: y0 + 40 }, { t: 'sargento', x: x0 + 28, y: y0 + 4 }, { t: 'cable', x: x0 + 31, y: y0 + 34 }, { t: 'metro', x: x0 + 24, y: y0 + 39 },
];

// una herramienta (tl: {t, x, y}) colgada; dx la mece; sil true pinta solo su silueta en el tablero (un píxel más gruesa)
function f_herr(R, tl, dx, col, sil = false) {
  const { rect, pset, linea, disco } = R, T = f_TS, x = tl.x + (sil ? 0 : dx), y = tl.y, M = sil ? col : C.metalL, Ms = sil ? col : C.metalS, Mg = sil ? col : T.mango, Mgs = sil ? col : T.mangoS, W = sil ? col : hex('#c89a5a'), Ws = sil ? col : hex('#9a6e3a');
  const e = sil ? 1 : 0;
  if (tl.t === 'martillo') { rect(x - 1 - e, y, x + 6 + e, y + 2 + e, M); rect(x - 1, y + 2, x + 6, y + 2, Ms); rect(x + 2 - e, y + 3, x + 3 + e, y + 14 + e, W); rect(x + 3, y + 3, x + 3, y + 14, Ws); pset(x - 1, y - 1, Ms); }
  else if (tl.t === 'serrucho') { rect(x - e, y - e, x + 4 + e, y + 4 + e, W); rect(x + 1, y + 1, x + 3, y + 3, sil ? col : T.pegboard); for (let i = 0; i < 12; i++) { rect(x + 1 - e, y + 5 + i, x + 5 + Math.round(i * 0.3) + e, y + 5 + i, M); if (!sil && i % 2) pset(x + 5 + Math.round(i * 0.3), y + 5 + i, Ms); } if (!sil) rect(x + 1, y + 5, x + 1, y + 16, C.metalD); }
  else if (tl.t === 'llave') { rect(x - e, y - e, x + 1 + e, y + tl.l + e, M); rect(x - 1 - e, y - 1 - e, x + 2 + e, y + 1, M); if (!sil) { pset(x, y - 1, T.pegboard); rect(x + 1, y + 2, x + 1, y + tl.l, Ms); } rect(x - 1 - e, y + tl.l - 1, x + 2 + e, y + tl.l + 1 + e, M); }
  else if (tl.t === 'destornillador') { const c = sil ? col : tl.c ? hex('#e8c040') : hex('#3a7ad8'); rect(x - 1 - e, y - e, x + 1 + e, y + 5 + e, c); if (!sil) rect(x + 1, y, x + 1, y + 5, f_mezcla(c, C.k, 0.3)); rect(x - e, y + 6, x + e, y + 13 + e, M); }
  else if (tl.t === 'alicates') { linea(x, y, x - 1, y + 7, Mg); linea(x + 2, y, x + 3, y + 7, Mg); if (sil) { linea(x - 1, y, x - 2, y + 7, col); linea(x + 3, y, x + 4, y + 7, col); } rect(x, y - 3, x + 2, y, M); pset(x + 1, y - 1, Ms); }
  else if (tl.t === 'nivel') { rect(x - e, y - e, x + 17 + e, y + 3 + e, sil ? col : hex('#e8c040')); if (!sil) { rect(x, y + 3, x + 17, y + 3, hex('#b8901c')); rect(x + 7, y + 1, x + 10, y + 2, hex('#9ae8b0')); pset(x + 8 + Math.round(dx), y + 1, C.blanco); } }
  else if (tl.t === 'sargento') { rect(x - e, y - e, x + 1 + e, y + 14 + e, M); rect(x - e, y - e, x + 6 + e, y + 1 + e, M); rect(x + 5 - e, y + 2, x + 6 + e, y + 4, M); rect(x - e, y + 13 - e, x + 5 + e, y + 14 + e, M); rect(x + 4 - e, y + 9, x + 4 + e, y + 13, Mg); if (!sil) rect(x + 3, y + 8, x + 5, y + 8, Mg); }
  else if (tl.t === 'cable') { R.anillo(x, y, 4 + e, sil ? col : C.naranja); R.anillo(x, y, 3, sil ? col : C.naranjaS ?? C.naranja); if (sil) R.anillo(x, y, 5, col); else linea(x + 3, y + 3, x + 2 + Math.round(dx * 2), y + 9, C.naranja); }
  else if (tl.t === 'metro') { disco(x, y, 3 + e, sil ? col : hex('#e8c040')); if (!sil) { disco(x, y, 1, hex('#3a3a3a')); rect(x + 3, y + 1, x + 6, y + 2, hex('#f0e0a0')); pset(x - 1, y - 2, C.blanco); } }
  if (!sil) { pset(tl.x, tl.y - 2, C.metalD); }
}

// la balda de maquetas de repuesto (x0..x1; y: la tabla): escuadras de hierro, una casa de una planta, una de dos y una
// casa móvil, y un bote de clavos; con mas, también los archivadores de colores, el casco amarillo de obra y los planos
// enrollados
function f_baldaMaquetas(R, x0, x1, y, s = 1, mas = false) {
  const { rect, pset } = R, T = f_TS;
  rect(x0, y, x1, y + 2, C.k); rect(x0, y, x1, y, T.mesaL); rect(x0, y + 1, x1, y + 1, T.mesa);
  for (const bx of [x0 + 6, x1 - 6]) { rect(bx, y + 3, bx, y + 8, C.metalD); for (let i = 0; i < 5; i++) pset(bx + i, y + 3 + i, C.metalD); }
  const casa = (cx, w, hw, hr, pisos, techo) => { const xa = cx - (w >> 1), xb = xa + w; rect(xa - 1, y - hw - 1, xb + 1, y - 1, C.k); rect(xa, y - hw, xb, y - 1, T.casa); for (let yy = y - hw + 1; yy < y - 1; yy += 2) rect(xa, yy, xb, yy, T.casaS);
    for (let p = 0; p < pisos; p++) for (let i = 0; i < 2; i++) rect(xa + 2 + i * Math.round(w * 0.5), y - hw + 2 + p * Math.round(hw / pisos), xa + 3 + i * Math.round(w * 0.5), y - hw + 3 + p * Math.round(hw / pisos), hex('#8ac4e4'));
    R.poligono([[xa - 2, y - hw], [cx, y - hw - hr], [xb + 3, y - hw]], C.k); R.poligono([[xa - 1, y - hw], [cx, y - hw - hr + 1], [xb + 2, y - hw]], techo); };
  casa(x0 + Math.round(16 * s), Math.round(14 * s), Math.round(6 * s), Math.round(4 * s), 1, T.teja2);
  casa(x0 + Math.round(36 * s), Math.round(11 * s), Math.round(10 * s), Math.round(4 * s), 2, hex('#a85a3e'));
  { const xa = x0 + Math.round(48 * s), xb = xa + Math.round(18 * s), hh = Math.round(5 * s); rect(xa - 1, y - hh - 1, xb + 1, y - 1, C.k); rect(xa, y - hh, xb, y - 2, hex('#e8ecee')); rect(xa, y - hh + 2, xb, y - hh + 2, hex('#4a8ac8')); for (let x = xa + 2; x < xb - 1; x += 4) rect(x, y - hh + 1, x + 1, y - hh + 1, hex('#8ac4e4')); rect(xa + 3, y - 1, xa + 4, y - 1, C.k); rect(xb - 4, y - 1, xb - 3, y - 1, C.k); }
  { const bx = x1 - Math.round(12 * s); rect(bx, y - 6, bx + 5, y - 1, C.k); rect(bx + 1, y - 5, bx + 4, y - 1, C.metalL); rect(bx + 1, y - 3, bx + 4, y - 3, C.rojo); pset(bx + 2, y - 6, C.metalS); }
  if (mas) {
    const ax = x0 + Math.round(92 * s); [hex('#c83a3a'), hex('#2a5aa8'), hex('#3a8a4a'), hex('#e8c040'), hex('#2a5aa8')].forEach((c, k) => { const hh = 12 + (k % 2); rect(ax + k * 4, y - hh, ax + k * 4 + 3, y - 1, C.k); rect(ax + k * 4 + 1, y - hh + 1, ax + k * 4 + 2, y - 1, c); rect(ax + k * 4 + 1, y - hh + 4, ax + k * 4 + 2, y - hh + 5, C.blanco); });
    const cx = ax + 34; R.disco(cx, y - 4, 6, C.k); rect(cx - 8, y - 2, cx + 8, y - 1, C.k); R.disco(cx, y - 4, 5, hex('#f0c030')); rect(cx - 7, y - 2, cx + 7, y - 2, hex('#d8a020')); rect(cx - 5, y - 1, cx + 5, y - 1, hex('#b88418')); R.pset(cx - 2, y - 7, hex('#fff0a0')); R.pset(cx - 1, y - 8, hex('#fff0a0')); rect(cx, y - 9, cx, y - 4, hex('#d8a020'));
    const rx = cx + 14; for (let k = 0; k < 3; k++) { const yy = y - 2 - (k === 2 ? 3 : 0), xx = rx + (k === 2 ? 4 : k * 7); rect(xx, yy - 2, xx + 16, yy, C.k); rect(xx + 1, yy - 1, xx + 15, yy - 1, k === 1 ? hex('#e8eef8') : T.plano); R.disco(xx + 16, yy - 1, 1, k === 1 ? hex('#c8d4e8') : T.planoM); }
  }
}

// lo que se ve por la ventana de Florida, recortado a cl: el cielo tramado, el sol (sol: [x, y]) con su halo, dos nubes a
// distinta velocidad, una gaviota, la casa de enfrente de piedra coralina con tejas árabes, ventanas en arco, el balcón de
// hierro y la buganvilla, la palmera real que se mece, coches que pasan detrás del seto de hibiscos, alguien que pasa por
// la acera
function f_fuera(R, cl, t, sol, k = 0) {
  const { pset, disco, linea } = R, T = f_TS, [a, b, c, d] = cl, rc = (x0, y0, x1, y1, col) => f_rc(R, cl, x0, y0, x1, y1, col);
  const cols = [T.cieloF0, T.cieloF1, T.cieloF2, T.cieloF3, T.cieloF4], hor = d - Math.round((d - b) * 0.22);
  for (let y = b; y <= d; y++) { const base = Math.min(1, (y - b) / Math.max(1, hor - b)) * 4; for (let x = a; x <= c; x++) { let v = base; if (sol) { const dd = Math.hypot(x - sol[0], y - sol[1]); if (dd < 22) v += (1 - dd / 22) * 2.2; } v = Math.min(4, v); let l = Math.floor(v); if (v - l > f_b4(x, y)) l++; pset(x, y, cols[Math.min(4, l)]); } }
  R.recorte(cl);
  if (sol) { disco(sol[0], sol[1], 6, hex('#fff6d0')); disco(sol[0], sol[1], 5, C.sol); disco(sol[0] - 1, sol[1] - 1, 3, hex('#fffcf0')); }
  const W = c - a + 40;
  f_nube(R, a - 20 + ((t * 1.6 + k * 30) % W), b + Math.round((d - b) * 0.18), 16);
  f_nube(R, a - 20 + ((t * 0.7 + 18 + k * 50) % W), b + Math.round((d - b) * 0.36), 11);
  { const u = ((t + k * 3) / 13) % 1, gx = Math.round(c + 10 - u * (c - a + 30)), gy = Math.round(b + 8 + Math.sin(t * 1.4) * 3), al = Math.sin(t * 9) > 0; if (Math.floor((t + k * 3) / 13) % 2 === 0) { pset(gx, gy, C.blanco); pset(gx - 1, gy - (al ? 1 : 0), C.blanco); pset(gx + 1, gy - (al ? 1 : 0), C.blanco); pset(gx - 2, gy - (al ? 2 : 0), C.blanco); pset(gx + 2, gy - (al ? 2 : 0), C.blanco); pset(gx, gy + 1, C.grisL); } }
  // la casa de enfrente
  const fx = a + Math.round((c - a) * 0.38), fy = b + Math.round((d - b) * 0.42), fb = d - Math.round((d - b) * 0.16);
  rc(fx, fy, c + 4, fb, T.coral); for (let y = fy; y <= fb; y++) for (let x = fx; x <= c; x++) if (h(x, y, 130 + k) < 0.12) pset(x, y, T.coralS); rc(fx, fy, fx, fb, T.coralS);
  for (let j = 0; j < 3; j++) { const yy = fy - 3 + j; rc(fx - 2, yy, c + 4, yy, j === 0 ? T.tejaBL : j === 1 ? T.tejaB : T.tejaBS); } for (let x = fx - 2; x <= c; x += 3) { pset(x, fy - 3, T.tejaBS); pset(x, fy - 1, C.k); }
  for (let i = 0; i < 3; i++) { const wx = fx + 5 + i * 10, wy = fy + 5; if (wx + 5 > c + 4) continue; rc(wx, wy + 2, wx + 4, wy + 9, hex('#2a3a4a')); disco(wx + 2, wy + 2, 2, hex('#2a3a4a')); rc(wx + 1, wy + 3, wx + 1, wy + 8, hex('#5a7a9a')); rc(wx - 1, wy + 10, wx + 5, wy + 10, T.coralL); }
  rc(fx + 3, fy + 16, fx + 26, fy + 16, C.k); for (let x = fx + 4; x < fx + 26; x += 2) rc(x, fy + 13, x, fy + 15, C.k); rc(fx + 3, fy + 12, fx + 26, fy + 12, C.k);
  for (let i = 0; i < 26; i++) { const bx = fx + 22 + Math.round(h(i, 1, 131) * 10), by = fy + Math.round(h(i, 2, 131) * 14); pset(bx, by, i % 3 ? T.buganvilla : T.buganvillaL); if (i % 2) pset(bx + 1, by + 1, T.seto); }
  // el coche que pasa (detrás del seto) y el seto de hibiscos con sus flores
  { const ciclo = 9, n = Math.floor((t + k * 4) / ciclo), u = ((t + k * 4) % ciclo) / ciclo, dir = n % 2 ? -1 : 1, x = dir > 0 ? a - 30 + u * (c - a + 60) : c + 30 - u * (c - a + 60), y = fb - 1;
    const col = [hex('#c8603a'), hex('#4a8a6a'), hex('#e8d8a8'), hex('#5a7ac8')][n % 4]; rc(x - 11, y - 5, x + 11, y - 1, col); rc(x - 6, y - 8, x + 5, y - 5, col); rc(x - 5, y - 7, x - 1, y - 6, hex('#a8d8f0')); rc(x + 1, y - 7, x + 4, y - 6, hex('#a8d8f0')); rc(x - 11, y - 3, x + 11, y - 3, f_mezcla(col, C.k, 0.3)); if (n % 4 === 2) rc(x - 9, y - 4, x + 9, y - 3, hex('#8a5a2a'));
    disco(Math.round(x - 7), y, 2, C.k); disco(Math.round(x + 7), y, 2, C.k); }
  for (let x = a; x <= c; x++) { const top = fb - 4 - Math.round(h(x >> 1, 3, 132 + k) * 3 + Math.sin(x * 0.4 + t * 1.2) * 0.6); rc(x, top, x, fb + 2, (x + top) % 3 ? T.seto : T.setoS); pset(x, top, T.setoL); if (h(x, 4, 132 + k) < 0.16) { pset(x, top + 1, T.hibisco); pset(x, top + 2, hex('#f06a7a')); } }
  rc(a, fb + 3, c, d, T.acera); for (let x = a + 3; x <= c; x += 9) rc(x, fb + 3, x, d, T.aceraS); rc(a, fb + 3, c, fb + 3, C.blanco);
  // el paseante, a ratos
  { const u = ((t + 4 + k * 5) % 15) / 15; if (u < 0.6) { const px = Math.round(a - 6 + u / 0.6 * (c - a + 12)), py = d - 1, pas = Math.floor(t * 6) % 2; rc(px, py - 9, px + 2, py - 4, hex('#e8a040')); rc(px, py - 11, px + 2, py - 10, hex('#e0b090')); pset(px + 1, py - 12, hex('#5a3a2a')); rc(px - 1, py - 12, px + 3, py - 12, hex('#f0e8c8')); pset(px + pas, py - 3, hex('#3a3a5a')); pset(px + 2 - pas, py - 3, hex('#3a3a5a')); pset(px + pas, py - 2, hex('#3a3a5a')); pset(px + 2 - pas, py - 2, hex('#3a3a5a')); } }
  // la palmera real: el tronco liso gris con sus anillos y el capitel verde, la copa que se mece
  { const px = a + Math.round((c - a) * 0.22), top = b + Math.round((d - b) * 0.14), m = Math.sin(t * 1.1 + k) * 1.6;
    for (let y = top + 8; y <= d; y++) { const u = (d - y) / (d - top), xx = Math.round(px + m * u * u + Math.sin(u * 2) * 1.2); rc(xx - 1, y, xx + 1, y, y < top + 14 ? hex('#7aa05a') : hex('#c4c0b4')); pset(xx + 1, y, y < top + 14 ? hex('#5a8040') : hex('#9a968a')); if (y % 4 === 0 && y >= top + 14) pset(xx - 1, y, hex('#a8a498')); }
    const cx = Math.round(px + m), cy = top + 7; for (let f = 0; f < 9; f++) { const an = -Math.PI + f * Math.PI / 8 + Math.sin(t * 1.8 + f + k) * 0.08, l = 10 + (f % 3) * 2; for (let i = 1; i <= l; i++) { const x = Math.round(cx + Math.cos(an) * i), y = Math.round(cy + Math.sin(an) * i * 0.55 + i * i / 26); pset(x, y, i > l - 3 ? T.setoS : T.setoL); pset(x, y + 1, T.seto); } } }
  R.recorte(null);
}

// la ventana de lamas de cristal (jalousie) de Florida, de x0..x1 × y0..y1: el marco de aluminio, el parteluz, las lamas
// con su brillo arriba y su canto, las pinzas de los lados, las manivelas y el alféizar; por ella, f_fuera
function f_ventanaLamas(R, x0, y0, x1, y1, t, sol, k = 0) {
  const { rect, pset } = R, T = f_TS, cl = [x0 + 2, y0 + 2, x1 - 2, y1 - 2], mx = Math.round((x0 + x1) / 2);
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, T.alu); rect(x0, y0, x1, y0, T.aluL); rect(x0, y0, x0, y1, T.aluL); rect(x1, y0, x1, y1, T.aluS);
  f_fuera(R, cl, t, sol, k);
  for (let y = cl[1] + 4; y <= cl[3]; y += 5) {
    for (let x = cl[0]; x <= cl[2]; x++) { f_aclara(R, x, y - 4, T.lama, 0.55); if ((x + y) % 2 === 0) f_aclara(R, x, y - 3, T.lama, 0.25); f_aclara(R, x, y, T.lamaS, 0.45); }
    rect(cl[0], y, cl[0] + 1, y, T.aluS); rect(mx - 3, y, mx + 3, y, T.aluS); rect(cl[2] - 1, y, cl[2], y, T.aluS);
  }
  for (let i = 0; i < 14; i++) { const x = cl[0] + 6 + i, y = cl[1] + 3 + i * 3; if (y < cl[3]) { f_aclara(R, x, y, C.blanco, 0.35); f_aclara(R, x + 22, y, C.blanco, 0.25); } }
  rect(mx - 1, y0, mx + 1, y1, T.alu); rect(mx - 1, y0, mx - 1, y1, T.aluL); rect(mx + 1, y0, mx + 1, y1, T.aluS);
  for (const xm of [Math.round((x0 + mx) / 2), Math.round((mx + x1) / 2)]) { rect(xm - 2, y1 - 3, xm + 2, y1 - 2, T.aluS); rect(xm + 2, y1 - 2, xm + 4, y1 - 2, C.k); pset(xm, y1 - 3, T.aluL); }
  rect(x0 - 3, y1 + 2, x1 + 3, y1 + 4, C.k); rect(x0 - 2, y1 + 2, x1 + 2, y1 + 3, T.molduraL); rect(x0 - 2, y1 + 4, x1 + 2, y1 + 4, T.molduraS);
}

// la luz del sol que entra por la ventana de lamas y cae en el suelo (de y0 a y1): un paralelogramo tramado de luz
// cálida, rayado por las lamas y partido por el parteluz (xa..xb arriba; desplaza: cuánto se corre a la izquierda abajo)
function f_luzSuelo(R, xa, xb, y0, y1, desplaza, a = 0.28) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), s = Math.round(desplaza * f), x0 = xa - s, x1 = xb - s, mid = Math.round((x0 + x1) / 2), raya = (y - y0) % 5 === 4;
    for (let x = x0; x <= x1; x++) { if (Math.abs(x - mid) < 2) continue; if (f_b4(x, y) < (raya ? 0.25 : 0.8) - f * 0.3) f_aclara(R, x, y, f_TS.luzSol, a); } }
}

// el reloj de pared redondo con su segundero rojo que salta (cx, cy, r)
function f_reloj(R, cx, cy, r, t, h0 = 10.2) {
  const { disco, pset, linea } = R; disco(cx + 1, cy + 1, r + 1, f_TS.paredS); disco(cx, cy, r + 1, C.k); disco(cx, cy, r, hex('#f8f4e8'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), k % 3 ? f_TS.cromoS : C.k); }
  const hh = (h0 + t / 3600) % 12, mm = (hh % 1) * 60 + t / 60, ah = hh / 12 * Math.PI * 2 - Math.PI / 2, am = mm / 60 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * r * 0.5), Math.round(cy + Math.sin(ah) * r * 0.5), C.k); linea(cx, cy, Math.round(cx + Math.cos(am) * r * 0.8), Math.round(cy + Math.sin(am) * r * 0.8), C.k);
  linea(cx, cy, Math.round(cx + Math.cos(as) * r * 0.85), Math.round(cy + Math.sin(as) * r * 0.85), C.rojo); pset(cx, cy, C.rojo);
}

// el calendario de 1971 colgado (x0..x1, y0..y1): la foto de una playa con su palmera arriba y la cuadrícula del mes
// con los días tachados (sin letras)
function f_calendario(R, x0, y0, x1, y1, t, v = 0) {
  const { rect, pset } = R, w = x1 - x0, mid = y0 + Math.round((y1 - y0) * 0.45), ale = v > 0.05 ? Math.round(Math.sin(t * 11) * v * 1.5) : 0;
  pset(Math.round((x0 + x1) / 2), y0 - 2, C.k); rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, f_TS.paredS); rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, C.blanco);
  rect(x0 + 1, y0 + 1, x1 - 1, mid - 3, f_TS.cieloF2); rect(x0 + 1, mid - 6, x1 - 1, mid - 3, hex('#3aa8c0')); rect(x0 + 1, mid - 3, x1 - 1, mid - 2, hex('#f0dca0'));
  pset(x0 + 3, y0 + 3, C.sol); rect(x0 + w - 5, mid - 10, x0 + w - 5, mid - 3, f_TS.mesaS); for (let i = -3; i <= 3; i++) pset(x0 + w - 5 + i, mid - 10 - (Math.abs(i) < 2 ? 1 : 0), f_TS.seto);
  rect(x0 + 1, mid - 1, x1 - 1, mid, C.rojo);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const x = x0 + 2 + i * Math.floor((w - 3) / 7), y = mid + 2 + j * 3; if (y + 1 >= y1) continue; pset(x, y, f_TS.cromoD); if (j * 7 + i < 12) { pset(x, y, C.rojo); } }
  if (ale) { rect(x0 + 1, y1 - 2 + Math.min(0, ale), x1 - 1, y1 - 1, f_TS.paredS); }
}

// la puerta de la calle (x0..x1, y0..y1, con su marco): de madera con el cristal esmerilado arriba y dos cuarterones;
// ab (0–1) la abre hacia dentro y por el hueco se ven la acera al sol, el césped, la palmera y un coche aparcado
function f_puertaCalle(R, x0, y0, x1, y1, t, ab) {
  const { rect, pset } = R, T = f_TS;
  rect(x0 - 3, y0 - 3, x1 + 3, y1, C.k); rect(x0 - 2, y0 - 2, x1 + 2, y1, T.molduraL); rect(x0 - 2, y0 - 2, x0 - 2, y1, C.blanco); rect(x1 + 2, y0 - 2, x1 + 2, y1, T.molduraS);
  const cl = [x0, y0, x1, y1 - 1];
  if (ab > 0) {   // fuera: el cielo, el seto, la acera, el coche aparcado y la palmera, recortados al hueco
    for (let y = y0; y < y1; y++) f_rc(R, cl, x0, y, x1, y, y < y0 + 30 ? (y < y0 + 15 ? T.cieloF2 : T.cieloF3) : y < y0 + 44 ? T.coral : y < y0 + 52 ? T.seto : T.acera);
    R.recorte(cl); f_nube(R, x0 + 8 + ((t * 1.2) % 30), y0 + 8, 10); R.recorte(null);
    for (let x = x0; x <= x1; x++) if (h(x, 1, 140) < 0.3) f_rc(R, cl, x, y0 + 43, x, y0 + 44, T.setoL);
    { const cxa = x0 + 6, cy0 = y0 + 40, car = hex('#3a7ad8'), carS = hex('#28589e'), carL = hex('#6aa0e8');   // el coche aparcado junto a la acera
      f_rc(R, cl, cxa - 1, cy0 + 4, cxa + 34, cy0 + 11, C.k); f_rc(R, cl, cxa, cy0 + 5, cxa + 33, cy0 + 10, car); f_rc(R, cl, cxa, cy0 + 5, cxa + 33, cy0 + 5, carL); f_rc(R, cl, cxa, cy0 + 9, cxa + 33, cy0 + 10, carS);
      f_rc(R, cl, cxa + 7, cy0, cxa + 24, cy0 + 4, C.k); f_rc(R, cl, cxa + 8, cy0 + 1, cxa + 23, cy0 + 4, car); f_rc(R, cl, cxa + 9, cy0 + 2, cxa + 15, cy0 + 4, hex('#a8d8f0')); f_rc(R, cl, cxa + 17, cy0 + 2, cxa + 22, cy0 + 4, hex('#a8d8f0')); f_rc(R, cl, cxa + 10, cy0 + 2, cxa + 10, cy0 + 3, C.blanco);
      f_rc(R, cl, cxa, cy0 + 8, cxa + 33, cy0 + 8, T.cromo); for (const wx of [cxa + 7, cxa + 26]) { f_rc(R, cl, wx - 3, cy0 + 9, wx + 3, cy0 + 13, C.k); f_rc(R, cl, wx - 1, cy0 + 10, wx + 1, cy0 + 12, T.cromoS); } }
    f_rc(R, cl, x0 + 3, y0 + 6, x0 + 4, y0 + 60, hex('#c4c0b4')); for (let i = -6; i <= 6; i++) f_rc(R, cl, x0 + 4 + i, y0 + 5 - Math.abs(i) / 2 + Math.round(Math.sin(t * 1.3 + i) * 0.6), x0 + 4 + i, y0 + 6 - Math.abs(i) / 2, T.seto);
    for (let y = y0 + 54; y < y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 4 === 0) f_rc(R, cl, x, y, x, y, T.aceraS);
  }
  const w = Math.round((x1 - x0) * Math.cos(ab * 1.32)), xa = x0, xb = x0 + w;
  if (w >= 2) {
    rect(xa, y0, xb, y1 - 1, C.k); rect(xa + 1, y0 + 1, xb - 1, y1 - 1, T.listones); rect(xa + 1, y0 + 1, xa + 1, y1 - 1, T.listonesL);
    if (w > 8) { const gy1 = y0 + Math.round((y1 - y0) * 0.42); rect(xa + 3, y0 + 4, xb - 3, gy1, C.k); rect(xa + 4, y0 + 5, xb - 4, gy1 - 1, hex('#cfe0e6')); for (let y = y0 + 5; y < gy1; y++) for (let x = xa + 4; x < xb - 3; x++) if (h(x, y, 141) < 0.2) pset(x, y, hex('#e6f0f2')); rect(xa + 4, y0 + 5, xa + 4, gy1 - 1, C.blanco);
      for (const [ya, yb] of [[gy1 + 4, gy1 + 18], [gy1 + 22, y1 - 6]]) { rect(xa + 3, ya, xb - 3, yb, T.listonesS); rect(xa + 4, ya + 1, xb - 4, yb - 1, T.listones); rect(xa + 3, ya, xb - 3, ya, T.listonesL); } }
    pset(xb - 3, Math.round((y0 + y1) / 2) + 6, C.oro); pset(xb - 3, Math.round((y0 + y1) / 2) + 7, C.oroS ?? C.oro);
  }
}

// el mostrador de recepción (x0..x1; yT: el canto de la fórmica; yS: el suelo): la tapa de fórmica dorada con su canto, el
// frente de listones de madera con las ranuras y el zócalo; s escala el grosor
function f_mostrador(R, x0, x1, yT, yS, s = 1) {
  const { rect, pset } = R, T = f_TS, gt = 2 * s + 1;
  rect(x0 - 1, yT - gt, x1 + 1, yT + 1, C.k); rect(x0, yT - gt + 1, x1, yT - 1, T.formica); rect(x0, yT - gt + 1, x1, yT - gt + 1, T.formicaL); rect(x0, yT, x1, yT, T.formicaS);
  for (let x = x0 + 2; x < x1; x += 5) if (h(x, 1, 150) < 0.5) pset(x, yT - gt + 2, T.formicaL);
  rect(x0, yT + 2, x1, yS - 3, T.listones); for (let x = x0 + 3; x < x1; x += 4 * s) { rect(x, yT + 2, x, yS - 4, T.listonesS); pset(x + 1, yT + 3, T.listonesL); }
  rect(x0, yT + 2, x1, yT + 2, T.listonesS); rect(x0, yS - 3, x1, yS - 1, T.zocalo); rect(x0, yS - 3, x1, yS - 3, T.zocaloL); rect(x1, yT + 2, x1, yS - 1, C.k); rect(x0 - 1, yT + 2, x0 - 1, yS - 1, C.k);
}

// el teléfono de disco color aguacate (x: la izquierda; y: la base; s 1 o 2): el cuerpo, el disco con sus agujeros, el
// auricular en su horquilla y el cable rizado
function f_telefono(R, x, y, s = 1) {
  const { rect, pset, disco } = R, T = f_TS;
  rect(x, y - 5 * s, x + 11 * s, y, C.k); rect(x + 1, y - 5 * s + 1, x + 11 * s - 1, y - 1, T.aguacate); rect(x + 1, y - 5 * s + 1, x + 11 * s - 1, y - 5 * s + 1, T.aguacateL); rect(x + 1, y - 1, x + 11 * s - 1, y - 1, T.aguacateS);
  disco(x + Math.round(5.5 * s), y - Math.round(2.5 * s), 2 * s, C.blanco); for (let k = 0; k < 6; k++) { const a = k * 0.9 - 2.4; pset(Math.round(x + 5.5 * s + Math.cos(a) * 1.5 * s), Math.round(y - 2.5 * s + Math.sin(a) * 1.3 * s), T.aguacateS); } pset(x + Math.round(5.5 * s), y - Math.round(2.5 * s), T.cromoS);
  rect(x - s, y - 8 * s, x + 12 * s, y - 6 * s, C.k); rect(x, y - 8 * s + 1, x + 11 * s, y - 6 * s - (s > 1 ? 1 : 0), T.aguacate); rect(x - s, y - 9 * s, x + 2 * s, y - 6 * s, C.k); rect(x + 9 * s, y - 9 * s, x + 12 * s, y - 6 * s, C.k); rect(x, y - 8 * s, x + 1 * s, y - 7 * s, T.aguacateL); rect(x + 10 * s, y - 8 * s, x + 11 * s, y - 7 * s, T.aguacateL);
  for (let i = 0; i < 6 * s; i++) pset(x + 11 * s + 1 + i, y - 2 + ((i & 1) ? 1 : 0), T.aguacateS);
}

// la mesa de dibujo en primer plano, abajo a la izquierda: el tablero inclinado (x1: su borde derecho, y0: arriba) con el
// plano a medio dibujar, la regla en T de madera con sus marcas, la escuadra de plástico verde, el portaminas, la goma y
// sus migas, el canto de lápices, la taza que humea y el flexo de brazo con su luz sobre el papel
function f_mesaDibujo(R, t, x1 = 78, y0 = 138) {
  const { rect, pset, linea, poligono, disco } = R, T = f_TS, inc = 0.16;
  const yA = (x) => Math.round(y0 + (x1 - x) * inc);   // el canto de arriba, que sube hacia la derecha
  // el pie de hierro y la tabla
  rect(x1 - 30, 166, x1 - 26, 179, C.k); rect(x1 - 29, 166, x1 - 27, 179, hex('#3a3a40')); rect(8, 168, 12, 179, C.k); rect(9, 168, 11, 179, hex('#3a3a40'));
  poligono([[-2, yA(-2) - 1], [x1 + 1, y0 - 1], [x1 + 5, 162], [-2, 174]], C.k);
  poligono([[-1, yA(-1)], [x1, y0], [x1 + 4, 161], [-1, 173]], T.contraL);
  for (let y = y0; y < 174; y++) for (let x = 0; x <= x1 + 4; x++) if (h(x >> 2, y, 160) < 0.12 && R.pget(x, y) === T.contraL) pset(x, y, T.contra);
  // el plano sujeto con cinta: papel blanco con el alzado a lápiz
  poligono([[6, yA(6) + 4], [x1 - 14, yA(x1 - 14) + 4], [x1 - 11, 158], [8, 168]], hex('#dfe2da'));
  for (const [xa, xb, f] of [[14, 52, 0.3], [14, 40, 0.6]]) linea(xa, Math.round(yA(xa) + 6 + f * 14), xb, Math.round(yA(xb) + 6 + f * 14), hex('#8a8aa0'));
  linea(16, yA(16) + 12, 30, yA(30) + 6, hex('#8a8aa0')); linea(30, yA(30) + 6, 44, yA(44) + 12, hex('#8a8aa0')); rect(22, yA(22) + 14, 26, yA(22) + 17, hex('#a8a8bc'));
  for (const xx of [6, x1 - 16]) { rect(xx, yA(xx) + 3, xx + 4, yA(xx) + 5, hex('#e8e0b0')); }
  // la regla en T: la cabeza (fuera del cuadro) y la hoja de madera con sus marcas y su canto transparente
  const ry = (x) => yA(x) + 13; for (let x = -1; x <= x1 - 4; x++) { rect(x, ry(x), x, ry(x) + 3, x % 2 ? hex('#d8a860') : hex('#e4b870')); pset(x, ry(x) + 4, T.mesaS); if (x % 4 === 0) pset(x, ry(x), C.k); if (x % 8 === 0) pset(x, ry(x) + 1, C.k); }
  // la escuadra verde transparente
  for (let y = 0; y < 12; y++) for (let x = 0; x <= y; x++) { const px = 38 + x, py = ry(38) - 1 - 11 + y; if (y === 11 || x === 0 || x === y) pset(px, py, hex('#2a8a5a')); else if ((px + py) % 2 === 0) f_aclara(R, px, py, hex('#5ae0a0'), 0.35); }
  // el portaminas, la goma, las migas
  linea(52, ry(52) - 4, 62, ry(62) - 7, C.k); linea(52, ry(52) - 5, 61, ry(61) - 8, hex('#e8c040')); pset(51, ry(51) - 4, C.metalD);
  rect(18, ry(18) + 6, 22, ry(18) + 8, hex('#f0a0a8')); rect(18, ry(18) + 8, 22, ry(18) + 8, hex('#c87078')); for (let k = 0; k < 4; k++) pset(24 + k * 2, ry(24) + 8 + (k % 2), hex('#e8a8b0'));
  // el canto de abajo (el portalápices) y la taza de café que humea
  linea(-1, 174, x1 + 5, 162, C.k); linea(-1, 175, x1 + 5, 163, T.mesaS); linea(-1, 176, x1 + 5, 164, T.mesa);
  { const tx = x1 - 6, ty = 160; rect(tx - 3, ty - 6, tx + 3, ty, C.k); rect(tx - 2, ty - 5, tx + 2, ty - 1, C.blanco); rect(tx + 2, ty - 5, tx + 2, ty - 1, hex('#c8c4b8')); rect(tx - 2, ty - 5, tx + 2, ty - 5, hex('#5a3a22')); rect(tx + 4, ty - 4, tx + 4, ty - 2, C.k);
    for (let i = 0; i < 3; i++) { const u = (t * 0.35 + i / 3) % 1, yy = Math.round(ty - 7 - u * 14), xx = Math.round(tx + Math.sin(u * 7 + t + i) * 1.5); if (f_b4(xx, yy) < 1 - u) { pset(xx, yy, hex('#f4f4f4')); if (u < 0.5) pset(xx + 1, yy, hex('#e8e8e8')); } } }
  // el flexo: la pinza en el canto, el brazo cromado de dos tramos con sus muelles y rótulas, la pantalla verde
  // esmaltada con el aro encendido, el cono de luz tramado y la mancha de luz sobre el papel
  const px = x1 - 3, py = y0 - 1, ex = x1 - 10, ey = y0 - 30, sx = x1 - 32, sy = y0 - 22, lx = sx - 4, ly = y0 + 14;
  for (let j = 0; j < 22; j++) { const f = j / 21, cxl = lerp(sx - 3, lx, f), w = lerp(4, 15, f), yy = Math.round(lerp(sy + 6, ly, f)); for (let x = Math.round(cxl - w); x <= Math.round(cxl + w); x++) if ((x + yy) % 2 === 0 && f_b4(x, yy) < 0.5 - f * 0.25) f_aclara(R, x, yy, hex('#fff6c8'), 0.3); }
  for (let j = -6; j <= 6; j++) for (let i = -16; i <= 16; i++) { const x = lx + i, y = ly + j + Math.round(i * -0.16), dd = Math.hypot(i / 16, j / 6); if (dd < 1 && R.pget(x, y) !== C.k && f_b4(x, y) < 1.1 - dd) f_aclara(R, x, y, hex('#fff2c0'), 0.45); }
  rect(px - 2, py - 1, px + 2, py + 3, C.k); rect(px - 1, py, px + 1, py + 2, C.metalS); pset(px, py, C.metalL);
  for (const [ax, ay, bx, by] of [[px, py - 1, ex, ey], [ex, ey, sx + 3, sy - 2]]) { linea(ax + 1, ay + 1, bx + 1, by + 1, C.k); linea(ax - 1, ay, bx - 1, by, C.k); linea(ax, ay, bx, by, T.cromo); linea(ax, ay + 1, bx, by + 1, T.cromoS); }
  for (let i = 3; i < 12; i += 3) { const x = Math.round(lerp(px, ex, i / 14)) + 2, y = Math.round(lerp(py, ey, i / 14)); pset(x, y, C.k); pset(x + 1, y, T.cromoS); }
  disco(ex, ey, 2, C.k); disco(ex, ey, 1, T.cromoS); pset(ex - 1, ey - 1, T.cromo);
  poligono([[sx + 5, sy - 4], [sx + 8, sy + 1], [sx - 4, sy + 9], [sx - 9, sy + 3]], C.k);
  poligono([[sx + 5, sy - 3], [sx + 7, sy + 1], [sx - 4, sy + 8], [sx - 8, sy + 3]], hex('#3a6a4a'));
  linea(sx + 4, sy - 3, sx - 7, sy + 3, hex('#6aa07a')); disco(sx + 5, sy - 3, 2, C.k); pset(sx + 5, sy - 3, T.cromo);
  linea(sx - 8, sy + 4, sx - 3, sy + 9, hex('#fff6c0')); linea(sx - 7, sy + 4, sx - 3, sy + 8, hex('#fffbe8'));
}

// el mapa que trae Simpson (exportado, va por delante del personaje): un mapa del Atlántico doblado en tres, con la
// costa, el golfo, la espiral de un huracán y su trayectoria punteada, que se abre con abierto (0–1). x, y: la mano
// (el borde de abajo a la izquierda del mapa); dir ±1
export function f_mapaSimpson(R, x, y, t, abierto = 0, dir = 1) {
  const { rect, pset } = R, T = f_TS, w = Math.round(9 + abierto * 13), hh = 10, x0 = dir > 0 ? x : x - w, x1 = x0 + w, y0 = y - hh;
  rect(x0 - 1, y0 - 1, x1 + 1, y + 1, C.k); rect(x0, y0, x1, y, hex('#9ac8e4'));
  for (let yy = y0; yy <= y; yy++) for (let xx = x0; xx <= x1; xx++) { const u = (xx - x0) / Math.max(1, w), v = (yy - y0) / hh; if (u < 0.42 - v * 0.08 || (u < 0.56 && v > 0.45 && Math.abs(u - 0.5) < 0.06 + (1 - v) * 0.02)) pset(xx, yy, (xx + yy) % 5 ? hex('#e8d8a8') : hex('#c8b880')); }
  rect(x0, y0, x1, y0, C.blanco); rect(x0, y0, x0, y, C.blanco);
  if (abierto > 0.35) { const cx = Math.round(x0 + w * 0.78), cy = y0 + 4; for (let a = 0; a < 7; a += 0.45) pset(Math.round(cx + Math.cos(a + t * 3) * a * 0.42), Math.round(cy + Math.sin(a + t * 3) * a * 0.32), C.blanco); pset(cx, cy, C.rojo);
    for (let k = 1; k < 6; k++) if (k % 2) pset(cx - k * 2, cy + Math.round(k * 0.8), C.rojo); }
  for (const f of [1 / 3, 2 / 3]) if (w > 12) for (let yy = y0 + 1; yy <= y; yy++) pset(Math.round(x0 + w * f), yy, hex('#7aa0b8'));
  rect(x0, y, x1, y, hex('#7a8a98'));
}

// la mesa de prueba (x0..x1; yT: el canto delantero de la tapa; yS: el suelo; g: de cerca): la tapa de madera con su veta
// vista desde un poco arriba, el canto con la cinta métrica amarilla (marcas y cifras), el faldón, las patas con el
// travesaño y, debajo, la caja de herramientas roja, las planchas de balsa y el bote de clavos
function f_mesaPrueba(R, x0, x1, yT, yS, g = false) {
  const { rect, pset } = R, T = f_TS, tt = g ? 4 : 3, fa = g ? 10 : 7, pw = g ? 5 : 3;
  rect(x0 - 1, yT - tt - 1, x1 + 1, yT + fa, C.k);
  rect(x0, yT - tt, x1, yT - 1, T.mesaL); for (let y = yT - tt; y < yT; y++) for (let x = x0; x <= x1; x++) if (h(x >> 2, y, 170) < 0.25 || h(x, y, 171) < 0.06) pset(x, y, T.mesa);
  rect(x0, yT, x1, yT, hex('#e0b07a'));
  rect(x0, yT + 1, x1, yT + fa - 1, T.mesa); rect(x0, yT + fa - 1, x1, yT + fa - 1, T.mesaS);
  const ty = yT + 1 + (g ? 1 : 0), th = g ? 4 : 2; rect(x0 + 2, ty, x1 - 2, ty + th - 1, hex('#ecc440')); rect(x0 + 2, ty + th - 1, x1 - 2, ty + th - 1, hex('#c49a20'));
  for (let x = x0 + 2; x <= x1 - 2; x += 2) { pset(x, ty, C.k); if ((x - x0) % 10 === 2) pset(x, ty + 1, C.k); }
  if (g) for (let x = x0 + 12, n = 1; x < x1 - 6; x += 20, n++) f_cifras(R, n, x, ty, C.k);
  for (let x = x0 + 4; x < x1 - 4; x += 9) if (h(x, 3, 172) < 0.6) pset(x, yT + fa - 3, T.mesaS);
  for (const lx of [x0 + 1, x1 - pw - 1]) { rect(lx - 1, yT + fa, lx + pw, yS - 1, C.k); rect(lx, yT + fa, lx + pw - 1, yS - 1, T.mesa); rect(lx, yT + fa, lx, yS - 1, T.mesaL); rect(lx + pw - 1, yT + fa, lx + pw - 1, yS - 1, T.mesaS); }
  const yb = Math.round((yT + fa + yS) / 2) + 2; rect(x0 + pw + 1, yb, x1 - pw - 2, yb + (g ? 3 : 2), C.k); rect(x0 + pw + 1, yb + 1, x1 - pw - 2, yb + (g ? 2 : 1), T.mesaS);
  // debajo: la caja de herramientas, las planchas de balsa y el bote de clavos, en la penumbra
  const tb = x0 + pw + 6, tw = g ? 30 : 20, thh = g ? 12 : 8; rect(tb, yS - thh - 1, tb + tw, yS - 1, C.k); rect(tb + 1, yS - thh, tb + tw - 1, yS - 2, hex('#a83030')); rect(tb + 1, yS - thh, tb + tw - 1, yS - thh, hex('#c84a4a')); rect(tb + 1, yS - thh + 3, tb + tw - 1, yS - thh + 3, hex('#7a2020'));
  rect(tb + Math.round(tw / 2) - 3, yS - thh - 3, tb + Math.round(tw / 2) + 3, yS - thh - 2, C.k); pset(tb + Math.round(tw / 2) - 3, yS - thh - 1, C.k); pset(tb + Math.round(tw / 2) + 3, yS - thh - 1, C.k); pset(tb + 3, yS - thh + 2, C.metalL);
  const bb = tb + tw + 6, bw = g ? 40 : 26; for (let k = 0; k < 3; k++) { rect(bb + k, yS - 2 - k * 2, bb + bw - k * 3, yS - 2 - k * 2, k % 2 ? T.balsaS : T.balsa); rect(bb + k, yS - 1 - k * 2, bb + bw - k * 3, yS - 1 - k * 2, T.balsaS); }
  const cb = bb + bw + 4; if (cb + 7 < x1 - pw - 2) { rect(cb, yS - 8, cb + 6, yS - 1, C.k); rect(cb + 1, yS - 7, cb + 5, yS - 1, C.metal); rect(cb + 1, yS - 7, cb + 5, yS - 7, C.metalL); rect(cb + 1, yS - 4, cb + 5, yS - 4, hex('#c83a3a')); pset(cb + 2, yS - 8, C.metalS); }
  for (let y = yT + fa; y < yS; y++) for (let x = x0 + pw + 1; x < x1 - pw - 1; x++) if ((x + y) % 2 === 0 && f_b4(x, y) < 0.45 - (y - yT - fa) / (yS - yT - fa) * 0.3) f_aclara(R, x, y, C.k, 0.22);
}

// las tejas caídas por el suelo (n, en x0..x1 × y0..y1), de su color, tumbadas
function f_tejasSuelo(R, n, x0, x1, y0, y1, k = 0) {
  const T = f_TS; for (let i = 0; i < n; i++) { const x = Math.round(x0 + h(i, 1, 180 + k) * (x1 - x0)), y = Math.round(y0 + h(i, 2, 180 + k) * (y1 - y0)), c = [T.teja1, T.teja2, T.teja3][i % 3]; R.rect(x, y, x + 3, y, c); R.rect(x + 1, y + 1, x + 3, y + 1, T.tejaD); if (i % 4 === 0) R.pset(x, y, T.tejaL); }
}

// motas de polvo que flotan en la luz del sol (dentro del paralelogramo que baja de la ventana)
function f_motasLuz(R, t, xa, xb, y0, y1, desplaza, n = 14) {
  for (let k = 0; k < n; k++) { const f = (h(k, 1, 190) + t * (0.02 + h(k, 2, 190) * 0.02)) % 1, y = Math.round(y0 + f * (y1 - y0)), s = desplaza * f, x = Math.round(xa - s + h(k, 3, 190) * (xb - xa) + Math.sin(t * 0.6 + k) * 3);
    if (Math.sin(t * 1.4 + k * 2) > -0.2) f_aclara(R, x, y, f_TS.luzSol, 0.75); }
}

// 'general': todo el taller
function f_tsGeneral(R, s) {
  const { t, cat, v, des } = s, T = f_TS, { rect } = R;
  f_capa(R, 'ts-general', () => {
    f_techo(R, 10); rect(0, 11, 319, 13, T.cornisa); rect(0, 11, 319, 11, T.techoS); rect(0, 13, 319, 13, T.molduraS);
    f_paredTaller(R, 14, 98, 136);
    f_terrazo(R, 136, 179, [34, 155, 243]);
    f_sombraSuelo(R, 38, 137, 38, 2); f_sombraSuelo(R, 132, 137, 46, 2); f_sombraSuelo(R, 250, 137, 34, 2);
    f_luzSuelo(R, 178, 214, 137, 179, 30, 0.42);
    // el barómetro aneroide de latón entre los planos y el panel
    { const bx = 89, by = 33; R.disco(bx + 1, by + 1, 8, T.paredS); R.disco(bx, by, 8, C.k); R.disco(bx, by, 7, hex('#c89a40')); R.disco(bx, by, 6, hex('#8a6420')); R.disco(bx, by, 5, hex('#f4eedc'));
      for (let k = 0; k < 9; k++) { const a = Math.PI * 0.8 + k * Math.PI * 1.4 / 8; R.pset(Math.round(bx + Math.cos(a) * 4), Math.round(by + Math.sin(a) * 4), k < 3 ? C.rojo : k > 5 ? hex('#3a6ab8') : C.k); }
      R.linea(bx, by, bx + 2, by - 3, C.k); R.linea(bx, by, bx - 3, by - 1, hex('#c89a40')); R.pset(bx, by, C.k); R.pset(bx - 3, by - 4, hex('#fff6d0')); R.rect(bx - 1, by - 10, bx + 1, by - 9, hex('#8a6420')); }
    f_plano(R, 4, 20, 36, 46, 0); f_plano(R, 41, 19, 75, 45, 1);
    // el enchufe de la pared con el cable del ventilador
    rect(80, 124, 85, 129, C.k); rect(81, 125, 84, 128, T.esmalte); R.pset(82, 126, C.k); R.pset(83, 127, C.k); for (let x = 66; x < 82; x++) R.pset(x, 132 + (x > 74 ? Math.round((x - 74) * -0.4) + 3 : 3), hex('#1e1e22'));
    f_ventCaja(R, 38, 88, 30, 136);
    f_baldaMaquetas(R, 104, 172, 64);
    f_pegFijo(R, 178, 56, 212, 100);
    f_mesaPrueba(R, 92, 172, 116, 136);
    f_mostrador(R, 220, 280, 106, 136);
    // la bandeja de papeles y el tarjetero en el mostrador
    rect(239, 100, 251, 103, C.k); rect(240, 100, 250, 102, hex('#4a4a52')); rect(241, 98, 249, 100, C.blanco); rect(242, 97, 248, 97, hex('#e8e0c8'));
    // el termostato redondo de 1971 bajo la ventana, con su cable
    R.disco(276, 92, 5, C.k); R.disco(276, 92, 4, hex('#d8d0bc')); R.disco(276, 92, 2, hex('#a89a80')); R.pset(275, 90, C.blanco); R.pset(278, 91, C.rojo); R.rect(276, 97, 276, 102, hex('#8a8478'));
    // la placa de la puerta y el conducto de la luz que baja junto al tablero
    rect(214, 14, 215, 52, T.cromoS); rect(214, 14, 214, 52, T.cromo); rect(212, 52, 217, 57, C.k); rect(213, 53, 216, 56, T.esmalte); R.pset(214, 54, C.k); R.pset(215, 54, C.k);
  });
  // los fluorescentes (el del centro parpadea) con su luz en la pared
  f_fluor(R, 10, 58, 16, true); f_fluor(R, 130, 180, 16, !f_parpadeo(t, 6.3)); f_fluor(R, 218, 268, 16, true, 11, 8);
  // las puntas de los planos que se levantan con el viento
  f_planoPunta(R, 36, 46, 1, t, v, 0); f_planoPunta(R, 41, 45, -1, t, v * 0.7, 2); f_planoPunta(R, 75, 45, 1, t, v, 4);
  // el panel de la escala y su luz sobre la pared y la balda
  f_panel15(R, 102, 20, 18, 22, t, s.marca, { solo: s.solo });
  f_panelLuz(R, 102, 49, 18, 2, 3, s.marca, 14, { solo: s.solo });
  f_anemometro(R, 89, 62, 8, t, s.mph, v);
  // las herramientas del tablero, que se mecen con el viento
  f_HERR(178, 56).forEach((tl, k) => f_herr(R, tl, Math.round(Math.sin(t * (5 + k) + k) * v * 1.4), 0));
  // la ventana de lamas con Florida detrás, el gato del alféizar, el reloj y la puerta
  f_ventanaLamas(R, 218, 22, 272, 80, t, [228, 34]);
  gato(R, 260, 81, t, { dir: -1 });
  f_reloj(R, 300, 50, 5, t);
  f_puertaCalle(R, 287, 59, 314, 136, t, s.puerta);
  if (s.puerta > 0) for (let y = 137; y < 160; y++) { const f = (y - 137) / 23, x0 = Math.round(288 - f * 26), x1 = Math.round(314 - f * 8); for (let x = x0; x <= x1; x++) if (f_b4(x, y) < s.puerta * (0.8 - f * 0.5)) f_aclara(R, x, y, T.luzSol, 0.3); }
  // el banco de viento: aspas, rejilla y cinta; las rachas que cruzan el taller
  f_ventAspas(R, 38, 88, 30, t, v, s.giro);
  f_rachas(R, 70, 305, 60, 114, t, v);
  // la casita de prueba y lo que se lleva el viento
  const geo = f_casita(R, 132, 115, 36, t, cat, v, des);
  f_tejasSuelo(R, Math.floor(cat * 2.4), 176, 236, 139, 158);
  f_escombros(R, geo, t, cat, v, 305, 158);
  // el mostrador: la campanita (y la teja del gag) y el teléfono
  f_telefono(R, 256, 104, 1);
  const golpe = f_tejaGag(R, s.gag, geo.x1 - 2, geo.yr + 4, 231, 93, 103, 1);
  f_campana(R, 231, 104, 1, t, golpe);
  f_motasLuz(R, t, 196, 232, 86, 170, 60);
}

// 'banco': el banco de viento de cerca (un plano de objetos)
function f_tsBanco(R, s) {
  const { t, cat, v, des } = s, T = f_TS, { rect } = R;
  f_capa(R, 'ts-banco', () => {
    f_techo(R, 8, 3); rect(0, 9, 319, 11, T.cornisa); rect(0, 9, 319, 9, T.techoS); rect(0, 11, 319, 11, T.molduraS);
    f_paredTaller(R, 12, 92, 152, 24, 12);
    f_terrazo(R, 152, 179, [172], 3, 190);
    f_sombraSuelo(R, 42, 172, 52, 4); f_sombraSuelo(R, 214, 158, 110, 4);
    f_plano(R, 114, 22, 158, 62, 2);
    // la gráfica de la fuerza contra la velocidad: papel milimetrado, ejes y la curva que se dispara
    { const x0 = 226, y0 = 16, x1 = 262, y1 = 44; rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, T.paredS); rect(x0, y0, x1, y1, hex('#f4f0e2')); for (let x = x0 + 2; x < x1; x += 3) rect(x, y0 + 1, x, y1 - 1, hex('#d8e8d0')); for (let y = y0 + 2; y < y1; y += 3) rect(x0 + 1, y, x1 - 1, y, hex('#d8e8d0'));
      rect(x0 + 4, y0 + 3, x0 + 4, y1 - 4, C.k); rect(x0 + 4, y1 - 4, x1 - 3, y1 - 4, C.k); for (let x = 0; x < x1 - x0 - 8; x++) { const yy = Math.round(y1 - 5 - (x / (x1 - x0 - 8)) ** 2 * (y1 - y0 - 9)); R.pset(x0 + 5 + x, yy, C.rojo); R.pset(x0 + 5 + x, yy + 1, hex('#e88a8a')); }
      R.disco(x0 + 2, y0 + 2, 1, T.chincheA); }
    f_ventCaja(R, 40, 86, 48, 172);
    f_mesaPrueba(R, 110, 330, 128, 172, true);
    // la libreta de datos abierta y el lápiz en la mesa (a la derecha) y el cronómetro colgado de un clavo
    rect(294, 121, 319, 127, C.k); rect(295, 122, 306, 126, hex('#f2eedc')); rect(308, 122, 319, 126, hex('#f6f2e2')); for (let y = 123; y < 126; y += 2) { rect(297, y, 305, y, hex('#9ab0c8')); rect(309, y, 318, y, hex('#9ab0c8')); } rect(307, 122, 307, 126, hex('#c8c0a8')); R.linea(300, 120, 314, 117, hex('#e8c040')); R.pset(299, 120, C.k); R.pset(314, 117, hex('#f0a0a8'));
    R.pset(300, 92, C.metalD); R.linea(300, 93, 297, 98, C.k); R.linea(300, 93, 303, 98, C.k); R.disco(300, 104, 6, C.k); R.disco(300, 104, 5, T.cromo); R.disco(300, 104, 4, hex('#f8f6ee')); R.rect(299, 97, 301, 98, T.cromoS); for (let k = 0; k < 12; k += 3) { const a = k * Math.PI / 6; R.pset(Math.round(300 + Math.cos(a) * 3), Math.round(104 + Math.sin(a) * 3), C.k); } R.pset(298, 102, C.blanco);
  });
  f_fluor(R, 132, 212, 13, !f_parpadeo(t, 7.1, 2), 9, 34);
  f_planoPunta(R, 114, 62, -1, t, v * 0.8, 1); f_planoPunta(R, 158, 62, 1, t, v, 3);
  f_anemometro(R, 286, 66, 15, t, s.mph, v);
  f_ventAspas(R, 40, 86, 48, t, v, s.giro);
  f_rachas(R, 96, 319, 38, 124, t, v, 22);
  const geo = f_casita(R, 200, 127, 80, t, cat, v, des);
  // el anemómetro de cazoletas en la mesa, entre el ventilador y la casita, que gira con el viento; el segundero del
  // cronómetro y la taza que humea
  { const ax = 120, ab = 127, top = ab - 22, giro = t * (1 + v * 18); rect(ax - 4, ab - 2, ax + 4, ab, C.k); rect(ax - 3, ab - 2, ax + 3, ab - 1, T.cromoS); rect(ax, top, ax, ab - 2, C.k); rect(ax + 1, top + 2, ax + 1, ab - 3, T.cromoS);
    for (let k = 0; k < 3; k++) { const a = giro + k * 2.094, ex = Math.round(ax + Math.cos(a) * 8), ey = Math.round(top + Math.sin(a) * 2); R.linea(ax, top, ex, ey, C.k); const fr = Math.sin(a) > 0; R.disco(ex, ey, 2, C.k); R.disco(ex, ey, 1, fr ? T.cromo : T.cromoD); } R.disco(ax, top, 1, C.rojo); }
  { const a = Math.floor(t * 5) / 5 * Math.PI * 2 / 60 * 6 - Math.PI / 2; R.linea(300, 104, Math.round(300 + Math.cos(a) * 3), Math.round(104 + Math.sin(a) * 3), C.rojo); }
  { const mx = 291, my = 127; rect(mx - 4, my - 9, mx + 4, my, C.k); rect(mx - 3, my - 8, mx + 3, my - 1, hex('#2a6a9a')); rect(mx - 3, my - 8, mx + 3, my - 8, hex('#5a2a14')); rect(mx - 3, my - 5, mx + 3, my - 5, C.blanco);
    for (let i = 0; i < 3; i++) { const u = (t * 0.35 + i / 3) % 1, yy = Math.round(my - 10 - u * 14), xx = Math.round(mx - u * v * 10 + Math.sin(u * 7 + t + i) * 1.5); if (f_b4(xx, yy) < 1 - u) R.pset(xx, yy, hex('#f4f4f4')); } }
  f_tejasSuelo(R, Math.floor(cat * 3), 230, 319, 156, 176, 2);
  f_escombros(R, geo, t, cat, v, 330, 168);
  f_motasLuz(R, t, 120, 300, 20, 120, 0, 10);
}

// 'escala': el panel grande con los iconos y los umbrales, la balda de maquetas y sitio delante para dos personajes
function f_tsEscala(R, s) {
  const { t, v } = s, T = f_TS, { rect } = R;
  f_capa(R, 'ts-escala', () => {
    f_techo(R, 9, 5); rect(0, 10, 319, 12, T.cornisa); rect(0, 10, 319, 10, T.techoS); rect(0, 12, 319, 12, T.molduraS);
    f_paredTaller(R, 13, 122, 140, 20, 10);
    f_terrazo(R, 140, 179, [51, 191], 5, 150);
    f_plano(R, -22, 22, 16, 60, 1);
    f_pegFijo(R, 280, 54, 330, 112);
    // el conducto de los cables del panel y su caja de interruptores
    rect(266, 34, 269, 98, C.k); rect(267, 34, 268, 98, T.cromoS); rect(267, 34, 267, 98, T.cromo); for (const y of [50, 80]) rect(265, y, 270, y + 1, C.metalD);
    rect(262, 98, 274, 112, C.k); rect(263, 99, 273, 111, T.esmalteS); rect(263, 99, 273, 99, T.esmalte); rect(267, 102, 269, 108, C.k); rect(268, 103, 268, 105, C.blanco);
    f_baldaMaquetas(R, 64, 236, 116, 1.25, true);
    // la papelera de metal con planos arrugados y la escoba apoyada en la pared
    rect(26, 124, 40, 139, C.k); rect(27, 125, 39, 139, hex('#6a7480')); rect(27, 125, 28, 139, hex('#8a949e')); for (let y = 127; y < 139; y += 3) rect(29, y, 38, y, hex('#5a626c')); rect(25, 123, 41, 124, hex('#4a525c'));
    for (const [bx, by, c] of [[30, 122, C.blanco], [35, 121, hex('#e8e0c8')], [33, 119, hex('#9ab8e0')]]) { R.disco(bx, by, 2, c); R.pset(bx - 1, by, hex('#b8b0a0')); }
    R.linea(252, 139, 262, 104, C.k); R.linea(253, 139, 263, 104, hex('#c8a060')); R.poligono([[247, 139], [258, 139], [256, 131], [250, 131]], hex('#c8a040')); for (let x = 248; x < 258; x += 2) R.linea(x, 132, x, 139, hex('#a8802a')); rect(249, 130, 257, 131, C.rojo);
    f_sombraSuelo(R, 160, 141, 150, 2, 0.15);
    for (let k = 0; k < 26; k++) { const x = Math.round(30 + h(k, 1, 210) * 250), y = Math.round(144 + h(k, 2, 210) * 30); R.pset(x, y, T.balsa); if (k % 3) R.pset(x + 1, y, T.balsaS); }
  });
  f_fluor(R, 22, 80, 15, true, 10, 12); f_fluor(R, 160, 222, 15, !f_parpadeo(t, 5.7, 1), 10, 12);
  // la polilla que da vueltas alrededor del fluorescente
  { const a = t * 3.1, x = Math.round(190 + Math.cos(a) * 18 + Math.sin(a * 2.3) * 4), y = Math.round(21 + Math.sin(a) * 3); R.pset(x, y, hex('#8a7a6a')); R.pset(x + (Math.sin(t * 30) > 0 ? 1 : -1), y, hex('#b8a890')); }
  f_HERR(280, 54).forEach((tl, k) => f_herr(R, tl, Math.round(Math.sin(t * (1.2 + k * 0.3) + k) * 0.6), 0));
  f_reloj(R, 10, 80, 6, t, 10.4);
  f_panel15(R, 24, 22, 42, 38, t, s.marca, { solo: s.solo, gap: 5, pad: 5, tam: 32, iconos: 20, mph: true });
  f_panelLuz(R, 24, 99, 42, 5, 5, s.marca, 30, { solo: s.solo });
  f_motasLuz(R, t, 40, 240, 30, 136, -10, 10);
}

// 'mostrador': el mostrador de cerca con la campanita grande; al fondo, por el arco, el banco de viento
function f_tsMostrador(R, s) {
  const { t, cat, v, des } = s, T = f_TS, { rect, pset } = R, CL = [0, 26, 101, 151];
  f_capa(R, 'ts-mostrador', () => {
    f_techo(R, 9, 7); rect(0, 10, 319, 12, T.cornisa); rect(0, 10, 319, 10, T.techoS); rect(0, 12, 319, 12, T.molduraS);
    f_paredTaller(R, 13, 100, 152, 16, 8);
    f_terrazo(R, 152, 179, [180], 7, 140);
    // el arco al taller: dentro, la pared del fondo más pequeña, su suelo y los planos
    R.recorte(CL);
    f_bloques(R, 0, 26, 101, 131, 12, 6, [T.pared, T.paredS, T.paredL, T.junta], 8);
    rect(0, 106, 101, 107, T.moldura); f_bloques(R, 0, 108, 101, 129, 12, 6, [T.banda, T.bandaS, T.bandaL, T.bandaJ], 9); rect(0, 130, 101, 132, T.zocalo);
    for (let y = 133; y <= 151; y++) for (let x = 0; x <= 101; x++) { const v2 = h(x, y, 200); R.pset(x, y, v2 < 0.3 ? T.terrS : v2 > 0.93 ? T.china3 : v2 > 0.88 ? T.china4 : T.terr); }
    R.linea(20, 133, -10, 151, T.laton); R.linea(60, 133, 56, 151, T.laton); R.linea(100, 133, 120, 151, T.laton); rect(0, 140, 101, 140, T.laton);
    f_plano(R, 36, 30, 60, 50, 0); f_plano(R, 64, 32, 86, 50, 2);
    f_ventCaja(R, 12, 98, 22, 140, { mando: false });
    f_mesaPrueba(R, 38, 101, 120, 140);
    R.recorte(null);
    for (let y = 26; y <= 151; y++) for (let x = 0; x <= 101; x++) if ((x + y) % 2 === 0 && f_b4(x, y) < 0.3) f_aclara(R, x, y, hex('#3a3428'), 0.18);   // la penumbra del fondo
    // el marco del arco
    rect(102, 22, 110, 151, C.k); rect(103, 22, 109, 151, T.molduraL); rect(108, 22, 109, 151, T.molduraS); rect(0, 22, 109, 25, C.k); rect(0, 23, 108, 24, T.molduraL); rect(0, 25, 101, 25, T.molduraS);
    // la pared de recepción: el título colegiado con su sello, el archivador con la planta, la máquina de escribir y la silla
    rect(124, 28, 150, 48, C.k); rect(125, 29, 149, 47, hex('#8a6438')); rect(127, 31, 147, 45, T.titulo); for (let y = 34; y < 42; y += 2) rect(130, y, 144, y, hex('#b8ac90')); R.disco(142, 42, 2, C.oro); R.pset(141, 41, C.oroL ?? C.oro); rect(141, 44, 141, 46, C.rojo); rect(143, 44, 143, 46, C.rojo);
    rect(118, 62, 150, 106, C.k); rect(119, 63, 149, 106, hex('#8a9098')); rect(119, 63, 149, 63, hex('#b0b6be')); for (const y of [64, 78, 92]) { rect(120, y + 1, 148, y + 12, hex('#9aa0a8')); rect(130, y + 5, 138, y + 6, C.metalD); rect(131, y + 5, 137, y + 5, C.metalL); rect(122, y + 3, 127, y + 4, C.blanco); }
    rect(128, 54, 140, 62, C.k); rect(129, 55, 139, 61, hex('#b0583a')); rect(129, 55, 139, 55, hex('#d07858'));
    for (let k = 0; k < 18; k++) { const a = -Math.PI + k * 0.37, l = 4 + (k % 4) * 2; for (let i = 0; i < l; i++) R.pset(Math.round(134 + Math.cos(a) * i * 0.8), Math.round(54 + Math.sin(a) * i * 0.4 + (k % 3 === 0 ? i * 0.9 : 0)), i % 3 ? T.seto : T.setoL); }
    rect(194, 88, 238, 106, C.k); rect(195, 89, 237, 106, hex('#6a5a4a'));
    rect(200, 80, 232, 92, C.k); rect(201, 81, 231, 91, T.maquina); rect(201, 81, 231, 81, T.maquinaL); rect(203, 88, 229, 90, hex('#2a2a32')); for (let x = 204; x < 229; x += 3) R.pset(x, 89, C.blanco); rect(206, 72, 226, 80, C.blanco); rect(206, 72, 226, 72, hex('#e8e4d8')); for (let y = 74; y < 79; y += 2) rect(208, y, 220 - (y % 4) * 2, y, hex('#8a8aa0')); rect(199, 82, 200, 84, T.cromoS); rect(232, 82, 233, 84, T.cromoS);
    rect(242, 84, 258, 106, C.k); rect(243, 85, 257, 106, hex('#3a4a6a')); rect(243, 85, 257, 86, hex('#5a6a8a'));
  });
  f_fluor(R, 150, 214, 15, !f_parpadeo(t, 6.9, 3), 10, 26);
  // la ventana de lamas con el gato, el reloj, el calendario y la puerta de la calle
  f_ventanaLamas(R, 196, 22, 250, 66, t, [206, 32], 1);
  gato(R, 238, 67, t, { dir: -1 });
  f_reloj(R, 172, 40, 8, t, 10.3);
  f_calendario(R, 256, 26, 274, 56, t, v * 0.3);
  f_puertaCalle(R, 287, 56, 315, 152, t, s.puerta);
  // al fondo, por el arco: el banco de viento en marcha y la casita
  R.recorte(CL);
  f_ventAspas(R, 12, 98, 22, t, v, s.giro, { mando: false });
  f_rachas(R, 30, 101, 70, 118, t, v, 8);
  const geo = f_casita(R, 72, 119, 28, t, cat, v, des);
  f_escombros(R, geo, t, cat, v, 200, 150);
  R.recorte(null);
  if (s.puerta > 0) for (let y = 153; y < 176; y++) { const f = (y - 153) / 23, x0 = Math.round(288 - f * 30), x1 = Math.round(315 - f * 6); for (let x = x0; x <= x1; x++) if (f_b4(x, y) < s.puerta * (0.8 - f * 0.5)) f_aclara(R, x, y, T.luzSol, 0.32); }
  f_mostradorCerca(R, t, v, s.gag, geo.x1 - 1, geo.yr + 2);
  f_areca(R, 121, 161, t, v * 0.4);
  f_motasLuz(R, t, 170, 230, 70, 140, 30, 8);
}

// una palmera areca en su maceta de barro (x: el centro; pb: el suelo): frondas arqueadas con sus foliolos, las de fuera
// más caídas, que se mecen con el aire (v)
function f_areca(R, x, pb, t, v = 0) {
  const { rect, pset } = R, T = f_TS;
  rect(x - 6, pb - 10, x + 6, pb, C.k); rect(x - 5, pb - 9, x + 5, pb - 1, hex('#c8603a')); rect(x - 6, pb - 10, x + 6, pb - 8, hex('#e08058')); rect(x - 6, pb - 8, x + 6, pb - 8, hex('#9a4628')); rect(x + 3, pb - 7, x + 5, pb - 1, hex('#9a4628'));
  for (let k = 0; k < 9; k++) {
    const sg = (k - 4) / 4, H = 26 - Math.abs(sg) * 8, ab = 15 + Math.abs(sg) * 3, mece = Math.sin(t * (1.2 + v * 6) + k) * (0.6 + v * 2) * Math.abs(sg + 0.2), n = 24;
    for (let i = 1; i <= n; i++) { const f = i / n, px = Math.round(x + sg * f * ab + mece * f), py = Math.round(pb - 10 - H * (2 * f - f * f * (1 + Math.abs(sg) * 0.8)) * 0.9);
      pset(px, py, f > 0.85 ? T.setoS : T.seto); if (i % 2 === 0 && f > 0.15) { pset(px - 1, py + 1, T.setoL); pset(px + 1, py + 1, T.setoS); if (f > 0.4) { pset(px - 2, py + 2, T.seto); pset(px + 2, py + 2, T.setoS); } } }
  }
}

// el mostrador de recepción de cerca y lo que tiene encima: el frente con su moldura y su penumbra, el libro de visitas
// abierto con el bolígrafo de cadena, la placa del nombre (barras), el correo, el tarjetero que pasa fichas con el aire,
// el teléfono de disco y la campanita grande; la teja del gag sale de (sx, sy) y la golpea
function f_mostradorCerca(R, t, v, gag, sx = 85, sy = 91) {
  const { rect, pset } = R, T = f_TS;
  f_mostrador(R, 114, 278, 112, 152, 2);
  rect(114, 122, 278, 123, T.listonesL); rect(114, 124, 278, 124, T.listonesS);
  for (let y = 136; y < 149; y++) for (let x = 114; x <= 278; x++) if ((x + y) % 2 === 0 && f_b4(x, y) < (y - 136) / 16) pset(x, y, f_mezcla(T.listones, C.k, 0.35));
  R.poligono([[192, 111], [196, 105], [226, 105], [230, 111]], C.k); R.poligono([[194, 110], [197, 106], [210, 106], [210, 110]], C.blanco); R.poligono([[211, 110], [211, 106], [225, 106], [228, 110]], hex('#f4f0e6'));
  for (let y = 107; y < 110; y++) { rect(199, y, 208, y, (y & 1) ? hex('#a8b8d0') : C.blanco); rect(213, y, 224, y, (y & 1) ? hex('#a8b8d0') : hex('#f4f0e6')); }
  rect(232, 106, 236, 110, C.k); rect(233, 107, 235, 109, hex('#3a3a3a')); R.linea(234, 106, 228, 101, C.k); R.linea(235, 106, 229, 101, hex('#3a6ab8')); for (let i = 0; i < 6; i++) pset(229 + i, 104 + (i & 1), hex('#8a8a8a'));
  rect(120, 103, 144, 110, C.k); rect(121, 104, 143, 109, hex('#6a4a2a')); rect(123, 105, 141, 108, C.oro); rect(125, 106, 135, 106, hex('#6a4a2a')); rect(125, 107, 131, 107, hex('#8a6a3a'));
  rect(147, 105, 161, 110, C.k); rect(148, 106, 160, 109, C.blanco); rect(148, 107, 160, 107, hex('#e8e0c8')); rect(149, 104, 159, 105, hex('#d8ecf4')); pset(150, 104, C.rojo);
  for (let y = 105; y <= 111; y++) for (let x = 150 + (111 - y) * 2; x <= 214 + (111 - y) * 2; x++) if (f_b4(x, y) < 0.55) f_aclara(R, x, y, T.luzSol, 0.22);   // la luz de la ventana en la fórmica
  { const rx = 264, ry = 110; rect(rx - 1, ry - 2, rx + 13, ry, C.k); rect(rx, ry - 1, rx + 12, ry - 1, hex('#3a3a3a')); R.disco(rx + 6, ry - 8, 6, C.k);
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.42 + Math.sin(t * (2 + v * 9)) * (0.1 + v * 0.3), x2 = Math.round(rx + 6 + Math.cos(a) * 9), y2 = Math.round(ry - 8 + Math.sin(a) * 9); R.linea(rx + 6, ry - 8, x2, y2, k % 2 ? hex('#f4f0e6') : C.blanco); pset(x2, y2, hex('#c8c0a8')); }
    rect(rx + 5, ry - 9, rx + 7, ry - 7, C.metalD); }
  f_telefono(R, 240, 111, 2);
  const golpe = f_tejaGag(R, gag, sx, sy, 176, 89, 111, 2);
  f_campana(R, 176, 111, 2, t, golpe);
}

// el caballete de primer plano, abajo a la derecha del encuadre general: dos patas en A, el tablón con su veta y, encima,
// una maqueta a medio hacer (el entramado de montantes de una casita, sin paredes), el bote de cola con su pincel y
// virutas de balsa
function f_caballete(R, t) {
  const { rect, pset, linea } = R, T = f_TS, yT = 160;
  for (const xa of [276, 312]) { linea(xa - 6, 179, xa, yT + 2, C.k); linea(xa - 5, 179, xa + 1, yT + 2, T.mesa); linea(xa + 6, 179, xa, yT + 2, C.k); linea(xa + 7, 179, xa + 1, yT + 2, T.mesaS); }
  rect(262, yT - 1, 320, yT + 5, C.k); rect(263, yT, 320, yT + 1, T.mesaL); rect(263, yT + 2, 320, yT + 4, T.mesa); for (let x = 266; x < 320; x += 7) pset(x, yT + 3, T.mesaS); rect(263, yT + 4, 320, yT + 4, T.mesaS);
  // el entramado de la maqueta: solera, montantes, la viga de arriba y dos pares de cabios, de pino con su perfil oscuro
  const x0 = 272, x1 = 304, b = yT - 1, al = 14, pino = hex('#d8a860'), pinoS = hex('#9a6a34');
  rect(x0 - 1, b - 2, x1 + 1, b, C.k); rect(x0, b - 1, x1, b - 1, pino);
  for (let x = x0; x <= x1; x += 4) { rect(x - 1, b - al, x + 1, b - 1, C.k); rect(x, b - al, x, b - 2, x % 8 ? pino : pinoS); }
  rect(x0 - 1, b - al - 1, x1 + 1, b - al + 1, C.k); rect(x0, b - al, x1, b - al, pino);
  rect(x0 + 9, b - 9, x0 + 14, b - 3, C.k); rect(x0 + 10, b - 8, x0 + 13, b - 4, hex('#8ac4e4')); pset(x0 + 10, b - 8, C.blanco);
  for (const [xa, xb] of [[x0, x0 + 16], [x0 + 16, x1]]) { const xm = Math.round((xa + xb) / 2); linea(xa, b - al - 1, xm, b - al - 8, C.k); linea(xm, b - al - 8, xb, b - al - 1, C.k); linea(xa + 1, b - al - 1, xm, b - al - 7, pino); linea(xm, b - al - 7, xb - 1, b - al - 1, pinoS); }
  rect(306, yT - 7, 312, yT - 1, C.k); rect(307, yT - 6, 311, yT - 1, C.blanco); rect(307, yT - 6, 311, yT - 5, C.rojo); linea(309, yT - 7, 312, yT - 13, hex('#c8a060')); pset(312, yT - 13, hex('#3a3a3a'));
  for (let k = 0; k < 7; k++) pset(264 + Math.round(h(k, 1, 220) * 8), yT - 1, k % 2 ? T.balsa : T.balsaS);
}

// la caja de cartón con listones y paredes de maqueta, en primer plano a la derecha del encuadre de la escala
function f_cajaMaquetas(R) {
  const { rect } = R;
  const x0 = 286, y0 = 150; rect(x0 - 1, y0 - 1, 320, 180, C.k); rect(x0, y0, 319, 179, hex('#c8965a')); rect(x0, y0, 319, y0 + 1, hex('#e0b07a')); rect(x0, y0 + 2, x0 + 1, 179, hex('#a87840')); for (let y = y0 + 6; y < 180; y += 7) rect(x0 + 3, y, 319, y, hex('#b4844c'));
  rect(x0 + 6, y0 + 10, x0 + 24, y0 + 12, hex('#a87840')); rect(x0 + 8, y0 + 11, x0 + 22, y0 + 11, hex('#8a6030'));
  for (const [dx, al, c] of [[4, 14, f_TS.balsa], [8, 18, f_TS.balsaS], [12, 11, f_TS.balsa], [20, 16, f_TS.casa], [26, 9, f_TS.balsa]]) { rect(x0 + dx, y0 - al, x0 + dx + 1, y0, c); R.pset(x0 + dx + 1, y0 - al, C.k); }
  rect(x0 + 15, y0 - 8, x0 + 23, y0 - 1, C.k); rect(x0 + 16, y0 - 7, x0 + 22, y0 - 1, f_TS.casa); rect(x0 + 18, y0 - 5, x0 + 20, y0 - 3, hex('#8ac4e4'));
}

// lo que va por delante de los personajes (exportado; tallerSaffir lo deja en R.delante y rodar lo pinta al final del
// plano): en el encuadre general, la mesa de dibujo del primer plano y el caballete con la maqueta a medio hacer; en el de
// la escala, la caja de cartón con piezas de maqueta (abajo a la derecha); en el del mostrador, con o.detras, el
// mostrador, lo que hay encima y la palmera de maceta (para quien se ponga detrás del mostrador)
export function f_tallerDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'general';
  if (enc === 'general') { f_mesaDibujo(R, t, 78, 140); f_caballete(R, t); }
  else if (enc === 'escala') f_cajaMaquetas(R);
  else if (enc === 'mostrador' && o.detras) { const cat = Math.max(0, Math.min(5, o.categoria ?? 0)), v = Math.max(0, Math.min(1, o.viento ?? (cat > 0 ? Math.min(1, 0.3 + cat * 0.14) : 0))); f_mostradorCerca(R, t, v, o.gag ?? -1); f_areca(R, 121, 161, t, v * 0.4); }
}

// dónde ponen las escenas a los personajes y la acción en cada encuadre del taller (x: el borde izquierdo del sprite de
// 15 px; suelo: la y de los pies)
export const f_TALLER = {
  general: { suelo: [140, 162], saffir: [176, 150], simpsonPuerta: [293, 138], simpsonLlega: [204, 152], puerta: [287, 59, 314, 136], mesa: [92, 172, 116], casita: [132, 115, 36], ventilador: [38, 88, 30], mando: [80, 105], panel: [102, 20, 205, 47], campana: [231, 104], mostrador: [220, 280, 106], ventana: [218, 22, 272, 80], delante: [[0, 104, 92, 179], [262, 140, 319, 179]] },
  banco: { mesa: [110, 319, 128], casita: [200, 127, 80], ventilador: [40, 86, 48], mando: [100, 109], manoMando: [111, 109, -1], anemometro: [286, 66] },
  escala: { suelo: [148, 172], panel: [24, 22, 263, 98], celdas: [29, 76, 123, 170, 217], anchoCelda: 42, personajes: [[96, 160], [196, 162]], delante: [285, 133, 319, 179] },
  mostrador: { suelo: [156, 176], mostrador: [114, 278, 112], campana: [176, 111], puerta: [287, 56, 315, 152], arco: [0, 26, 101, 151], casita: [72, 119, 28], detras: 118 },
};
