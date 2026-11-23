// Fontanería y decorados del episodio 47 (Mary Shelley: la chica de dieciocho años que inventó a Frankenstein), con el
// canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js: estudio) y
// añade: A Londres 1797–1814 (londres), B el lago de Ginebra en 1816 (lago), C el mundo del libro (libro), D Londres
// 1818–1823 (ciudad) y E Italia 1818–1822 (italia), y las piezas de las pausas (pausa).
// DERECHOS: NADA de las películas de Frankenstein (ni la cabeza plana, ni los tornillos, ni la piel verde, ni el
// laboratorio de rayos de 1931): la criatura va por lo que dice el LIBRO (ELENCO_MS.criaturaMS). Sin letras (solo números
// y símbolos). LA VIOLENCIA NUNCA SE VE y NADA MORBOSO: las muertes de los hijos y de Percy se cuentan con objetos (una
// cuna vacía, una vela en el mar, de lejos); en la buhardilla de Victor, instrumentos y frascos, nunca cuerpos.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/ms-comun.js';
//   const { E, R, M } = await T.preparar('ms-gancho');
//   T.rodar(E, R, [[0, (t) => T.lago(R, t, { encuadre: 'cuarto' })]], { año: 1816 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 46 (y el del 44, que reutiliza) por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_MS as MS } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43): se usa tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Londres de la Regencia: ladrillo hollín, piedra de Portland, la niebla, la tinta y el papel
    ladrillo: '#7a4a3a', ladrilloS: '#4e2e24', portland: '#c8c0ae', portlandS: '#8a8474', niebla: '#a8acb4', tinta: '#1c1a2a', papel: '#ece2c8',
    // el lago de Ginebra en el año sin verano: el agua gris acero, la tormenta, las velas
    lago: '#4a5a6a', lagoL: '#8a9aa8', tormenta: '#3a3e4a', rayo: '#e8ecff', vela: '#ffd890', velaS: '#e8a040',
    // el mundo del libro: la buhardilla, la cabaña del bosque, el hielo del Ártico
    madera: '#6a4a2a', maderaS: '#4a3220', bosque: '#2e4a32', hielo: '#d8e8f0', hieloS: '#9ab8c8',
    // Italia: el yeso blanco, el mar, el ocaso
    yeso: '#e8e0d0', yesoS: '#b8ae9c', mar: '#3a6a8a', marL: '#7aaac8', ocaso: '#e88a5a',
    // la criatura del libro: la piel amarillenta y los ojos acuosos
    criatura: '#d8c88a', criaturaS: '#b0a060',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep47');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo en los años de la vida de Mary: la pluma (1797–1815, la niña y la huida) y la vela (1816–1831,
  // el verano sin sol, el libro y lo que vino después)
  Object.assign(R.ICONOS, {
    pluma: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1797, 1816, R.PALA.ORO, 'pluma'], [1816, 1832, R.PALA.ROJO, 'vela']]);
  R.companero = () => {};   // canon del 43: Atom no vive en la esquina, actúa en la escena (T.AT)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };



// ── A · Londres, 1797–1814 ───────────────────────────────────────────────────────────────────────────────────────────
// Londres de la Regencia, con niebla y hollín. Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo va en un
// búfer (a_fijo) y encima la vida (fuego, velas, niebla, gente pequeña, pájaros, hojas, el gato, el ratón…).
// o.encuadre:
//   'casa' (por omisión): LA CASA DE LOS GODWIN por dentro, la biblioteca: a la izquierda una librería de caoba hasta el
//     techo (x 0–54) con su escalera apoyada y, delante, un escritorio con papeles, tintero, pluma y vela (x 4–44, tablero
//     y 116); la chimenea de mármol (x 104–170, boca x 118–156, y 102–138) con el fuego, el reloj de repisa (x 106–118) y
//     dos candeleros; encima, EL RETRATO DE LA MADRE (marco dorado x 112–162, y 22–86; óleo en pixel de una mujer de pelo
//     castaño con pañuelo blanco al cuello, de medio cuerpo, sin copiar ningún retrato real) entre dos apliques con vela;
//     un sillón de damasco junto al fuego (x 172–200) con una mesita y su taza; la puerta doble abierta (x 182–236, y
//     36–140) al salón de atrás, donde las visitas (figuritas de 10–12 px con levita) hablan junto a otra chimenea, con
//     humo de pipa; la ventana de guillotina (x 250–302, y 50–118) con cortinas y la calle de Londres en la niebla (casas,
//     un farol, paseantes y algún carruaje, recortados al hueco); un taburete en el rincón (x 262–278, asiento y 138,
//     suelo 150) para la niña callada; un gato que duerme en la piedra del hogar (x 146–160); la tarima de roble y una
//     alfombra turca. La pared llega hasta y 140 y el suelo empieza ahí: los pies van en y 150. o.cuna true: una cuna de
//     madera con capota junto a la chimenea (x 60–96, suelo 150) que se mece; o.bebe false la deja sin el hatillo blanco
//     (por omisión, con o.cuna, lleva un hatillo de lino con encaje, sin cara). o.visitas false: el salón de atrás vacío.
//     Libre x 40–240.
//     Cámara 'cuarto' (o.camara): UN CUARTO POBRE DE ALQUILER (1815): paredes de yeso desconchado con el ladrillo y el
//     enlistonado a la vista, manchas de humedad y grietas, una viga en el techo; una cama estrecha con manta remendada
//     (x 4–78), la cuna pequeña (x 84–114, suelo 150), una chimenea pequeña con brasas y un hervidor (x 120–166, boca x
//     130–156, y 114–140), la mesita (x 174–236, tablero y 128) con una vela que se consume y EL DIARIO abierto (x
//     182–212, y 121–127) y su pluma; una silla de anea (x 240–256); la ventana de cuarterones (x 252–304, y 48–108) con
//     un cristal remendado con papel y la niebla y los tejados con chimeneas que humean, una cortina rala que se mueve con
//     la corriente; un chal colgado de un clavo, un espejito rajado,
//     una cofia en su clavija, una repisa con una jarra y dos libros; un ratón que asoma por su agujero
//     del rodapié (x 296, y 138). o.cunaVacia true: la cuna vacía con la mantita doblada, nada más (por omisión lleva un
//     hatillo pequeño). o.noche true: de noche (la vela y las brasas mandan; la ventana, azul oscura). Suelo y 150,
//     libre x 40–260.
//   'cementerio': EL CEMENTERIO DE ST PANCRAS en un día nublado: cielo tramado con nubes de tres tonos a tres velocidades
//     y grajos; los tejados y chimeneas de Londres en la bruma; la iglesia vieja de piedra (nave x 84–150, torrecita x
//     62–84 con su cupulilla y la veleta que gira); un muro de ladrillo con albardilla al fondo (y 104–118) por donde pasea
//     un gato; dos árboles de otoño (tronco en x 24 y x 236) que sueltan hojas; lápidas inclinadas con musgo en tres
//     filas, una tumba de cajón y una cruz; el camino de grava que sube a la iglesia; LA LÁPIDA DE LA MADRE (x 140–180, y
//     100–150: piedra alta y clara con marco tallado, una guirnalda arriba y rayitas de letras nunca legibles, flores
//     silvestres al pie) y, al lado, un banco de piedra (x 186–220, asiento y 142, suelo 150) para la niña sentada; hierba
//     que se mueve con el viento y niebla baja. Suelo y 150, libre x 40–280.
//     Cámara 'lapida': de cerca, la piedra (x 72–248, de y 14 al borde de abajo) con la arista gastada, líquenes, musgo
//     en las juntas, la guirnalda tallada y seis renglones de rayitas incisas (sin letras); detrás, el cementerio
//     desenfocado; hojas que caen y una mariquita que sube por la piedra. o.dedo 0–1: la mano canónica (T.mano, manga
//     o.manga, por omisión la de Mary niña) sigue el renglón o.renglon (por omisión 2) de izquierda a derecha; sin o.dedo
//     no hay mano. Devuelve { renglones: [[x0, x1, y], …] } para que la escena ponga la mano donde quiera.
//   'calle': UNA CALLE DE LONDRES DE MADRUGADA (1814): el cielo que clarea (o.clarea 0–1, por omisión 0.45) con las
//     últimas estrellas y nubes de tres tonos; dos hileras de casas georgianas de ladrillo hollinado (la de la izquierda,
//     x 0–138, de cuatro alturas; la de la derecha, x 178–320, más baja, para dejar tranquila la esquina de Atom) con
//     planta baja de estuco, ventanas de guillotina (alguna encendida, con una silueta que pasa), puertas pintadas con
//     abanico de cristal y aldaba, escalones y verjas de hierro; por el hueco de la calle lateral (x 140–176) se ven casas
//     lejanas y una aguja en la niebla y pasa alguien pequeño; farolas de aceite que tiemblan (x 62, 158, 196) con su
//     reflejo; la acera de losas (y 132–143) y los adoquines mojados con charcos; palomas que picotean; humo de las
//     chimeneas; la niebla que corre. El carruaje (o.carruaje: x del morro del caballo, por omisión 200; false lo quita):
//     un coche cerrado oscuro (caja x +38…+90, ruedas en el suelo 150) con su farol, un baúl en el techo y el cochero en
//     el pescante, y el caballo que resopla vaho y mueve la cola; o.marcha true: las ruedas giran y el caballo anda (la
//     escena mueve o.carruaje para que se vaya). Suelo y 150, libre x 30–200.
// Devuelve { suelo, libre, … } con la geometría útil de cada encuadre. Llama a londresDelante después de los actores.
export function londres(R, t, o = {}) {
  const en = o.encuadre ?? 'casa';
  if (en === 'cementerio') return o.camara === 'lapida' ? a_lapida(R, t, o) : a_cementerio(R, t, o);
  if (en === 'calle') return a_calle(R, t, o);
  return o.camara === 'cuarto' ? a_cuarto(R, t, o) : a_casa(R, t, o);
}
// Lo que va por delante de los personajes (con las mismas opciones que londres): en 'casa', una butaca de orejas de
// espaldas en la esquina de abajo a la izquierda (x 0–36, y 108–180), capitoné, con una manta de cuadros encima; en 'cuarto', el baúl de viaje
// con sus flejes en la esquina de abajo a la izquierda (x 0–34, y 146–180); en 'cementerio', la verja de hierro de delante
// (x 0–34 y x 288–320) y una mata de hierba alta que se mueve; en 'lapida', unas briznas de hierba al pie; en 'calle', un
// poste de hierro fundido (x 6–18) y un charco que refleja el cielo (x 40–110, y 164–176), por debajo de los pies.
export function londresDelante(R, t, o = {}) {
  const en = o.encuadre ?? 'casa', { rect, pset, linea, disco, poligono } = R, P = a_P;
  if (en === 'cementerio' && o.camara === 'lapida') {
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 940) * 320), al = 6 + Math.round(h(k, 2, 940) * 12), m = Math.sin(t * 1.6 + k) * 2;
      linea(x, 180, x + Math.round(m), 180 - al, k % 3 ? P.hierbaS : P.hierbaL); }
    return {};
  }
  if (en === 'cementerio') {
    // la verja de delante: barrotes con lanza, travesaños y su sombra, a los dos lados
    for (const [x0, x1] of [[0, 34], [288, 320]]) {
      for (const y of [112, 160]) { rect(x0, y, x1, y + 2, P.hierro); rect(x0, y, x1, y, P.hierroL); }
      for (let x = x0 + 2; x < x1; x += 7) { rect(x, 100, x + 2, 180, P.hierroD); rect(x, 100, x, 180, P.hierroL);
        poligono([[x - 1, 100], [x + 1, 92], [x + 3, 100]], P.hierroD); pset(x + 1, 93, P.hierroL); disco(x + 1, 135, 1, P.hierro); }
    }
    // hierba alta delante, que se mece
    for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 3, 941) * 320), al = 8 + Math.round(h(k, 4, 941) * 10), m = Math.sin(t * 1.4 + x * 0.05) * 2.5;
      linea(x, 180, x + Math.round(m), 180 - al, k % 3 ? P.hierbaD : P.hierbaS); pset(x + Math.round(m), 180 - al, P.hierbaL); }
    return {};
  }
  if (en === 'calle') {
    // el charco: refleja el cielo del alba y tiembla
    const cl = o.clarea ?? 0.45;
    for (let y = 164; y <= 176; y++) { const w = Math.round(36 * Math.sqrt(1 - ((y - 170) / 7) ** 2)); for (let x = 75 - w; x <= 75 + w; x++) {
      const ond = Math.sin(x * 0.4 + t * 3 + y) > 0.85;
      pset(x, y, ond ? a_mez(P.adoquinL, P.albaL, cl * 0.5) : a_mez(a_mez(P.cielo1, P.alba, cl * 0.6 + (y - 164) * 0.01), P.adoquin, 0.45)); } }
    for (let x = 40; x <= 110; x++) { pset(x, 164 + Math.round(Math.abs(x - 75) / 9), P.adoquinS); }
    for (const fx of [62, 84]) rect(fx - 2, 166, fx + 2, 175, a_mez(P.luzV, P.adoquin, 0.4));   // el reflejo de las farolas
    // el poste de hierro fundido (un cañón viejo boca abajo)
    rect(5, 132, 19, 180, C.k); rect(6, 133, 18, 180, P.hierro); rect(7, 133, 9, 180, P.hierroL); rect(16, 133, 18, 180, P.hierroD);
    rect(4, 128, 20, 133, C.k); rect(5, 129, 19, 132, P.hierro); rect(5, 129, 19, 129, P.hierroL); disco(12, 127, 4, C.k); disco(12, 127, 3, P.hierro); pset(11, 125, P.hierroL);
    rect(4, 150, 20, 153, C.k); rect(5, 151, 19, 152, P.hierro); pset(8, 151, P.hierroL);
    return {};
  }
  if (o.camara === 'cuarto') {
    // el baúl de viaje en la esquina (lo que trajeron de Francia): tablas, flejes de hierro y su cerradura
    rect(0, 146, 34, 180, C.k); rect(0, 147, 33, 180, hex('#5a4028')); rect(0, 147, 33, 152, hex('#6e5034')); rect(0, 147, 33, 147, hex('#8a6a44'));
    for (let y = 156; y < 180; y += 6) rect(0, y, 33, y, hex('#46301e')); for (const x of [8, 26]) { rect(x, 147, x + 2, 180, P.hierro); rect(x, 147, x, 180, P.hierroL); }
    rect(15, 152, 19, 158, C.k); rect(16, 153, 18, 157, P.oroPS); pset(17, 155, C.k); rect(0, 153, 33, 153, C.k);
    return {};
  }
  // casa: la butaca de orejas de la esquina, vista de espaldas: respaldo capitoné de damasco con su vivo, la oreja y el
  // brazo, y una manta de cuadros doblada por encima
  const c = P.damasco, cS = P.damascoS, cL = P.damascoL;
  poligono([[0, 114], [6, 108], [22, 108], [30, 116], [33, 180], [0, 180]], C.k);
  poligono([[0, 115], [6, 109], [22, 109], [29, 117], [32, 180], [0, 180]], c);
  for (let y = 112; y < 180; y++) for (let x = 0; x < 33; x++) { const p = R.pget(x, y); if (p !== c) continue; if (x > 24) pset(x, y, cS); else if (x < 4) pset(x, y, cL); }
  for (let y = 118; y < 180; y += 8) for (let x = 4 + ((y - 118) / 8 & 1) * 5; x < 26; x += 10) { pset(x, y, cS); pset(x, y + 1, C.k); pset(x - 1, y - 1, cL); linea(x + 1, y + 1, x + 4, y + 4, cS); linea(x - 1, y + 1, x - 4, y + 4, cS); }
  linea(1, 114, 6, 109, cL); linea(6, 109, 22, 109, cL); linea(22, 109, 29, 116, cL);
  rect(26, 140, 36, 180, C.k); rect(27, 141, 35, 180, cS); rect(27, 141, 35, 142, cL); for (let y = 146; y < 180; y += 6) pset(31, y, c);   // el brazo
  for (let y = 120; y < 134; y++) for (let x = 0; x < 16 - Math.max(0, y - 128); x++) pset(x, y, ((x >> 2) + (y >> 2)) % 2 ? hex('#3a5a4a') : hex('#c8b890'));   // la manta de cuadros
  rect(0, 134, 10, 135, C.k); for (let x = 1; x < 14; x += 2) pset(x, 121 + (x % 3), hex('#e8dcb8'));
  return {};
}
// ── B · El lago de Ginebra, 1816 ─────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'lago' (por omisión): EL LAGO DE GINEBRA desde la orilla de Cologny. Fondo: el cielo tramado con nubarrones de tres
//     tonos a tres velocidades (estratos junto a las montañas, nubes en medio, jirones rápidos arriba) y gaviotas; los
//     Alpes con nieve (luz a la izquierda, sombra a la derecha, canales de roca y bruma al pie) y el Jura; la orilla de
//     enfrente con sus pueblos (horizonte del agua y 87). Medio: el agua gris acero con oleaje que corre, reflejos que
//     tiemblan y la barca del Lemán de dos velas latinas que cruza (x −40–220, y 104, la tapa la colina); a la derecha
//     LA COLINA con viñas en bancales y su camino, el muro de la terraza con la escalinata y VILLA DIODATI (x 184–256,
//     y 36–92: tejado a cuatro aguas con dos chimeneas que humean, tres alturas, contraventanas verdes, balcón corrido y
//     galería de arcos; alguien pasea por el balcón con calma); a la izquierda LA CASITA (x 54–114, y 96–140: teja,
//     chimenea con humo, una ventana encendida, la parra de la puerta en x 86–93) con su huerto, sus álamos que se mecen
//     y el embarcadero en diagonal (x 110–150, y 134–145) con el bote amarrado que cabecea (x 132–148, y 146); dos cisnes
//     en el agua de la derecha (x 210–306, y 144). Delante: la orilla de guijarros mojados donde lame el agua, la hierba
//     con el camino de tierra y sus charcos, una barca vieja boca abajo (x 4–26) y un poste de amarre (x 292). o.tormenta
//     0–1 (0): con 0, un día gris y frío de junio (nunca sol); al subir, el cielo se cierra en negro, cortinas de lluvia
//     barren las montañas, olas con espuma, los árboles y el humo se tumban con el viento, la villa y la casita encienden
//     las velas, por el camino de las viñas sube alguien con paraguas y farol, lluvia en diagonal en dos capas y
//     RELÁMPAGOS (rayo y destello de todo el plano: o.rayo, un instante o una lista para casarlo con el trueno; si no,
//     cada 4,6 s desde t 1,2; solo con tormenta > 0,3). Suelo y 152 (la orilla), libre x 30–280. Devuelve .rayo (0–1, el
//     destello de ahora), .barca, .bote, .villa [220, 64], .casita [84, 122].
//     Cámara 'ventana': desde dentro de la casita, la ventana de guillotina (cristal x 76–244, y 22–144, travesaño del
//     medio y 83–87) con el mismo paisaje fuera (o.tormenta, por omisión 1: la villa se ve en x 146–214), el vaho en los
//     bordes y abajo con una zona limpia en el centro, gotas y regueros que bajan por el cristal; el papel pintado de
//     rayas, las cortinas granate que mueve la corriente, la galería de madera, el alféizar (y 146–152) con una carta, un
//     libro y la vela (x 236) que alumbra cristal y pared; la tarima desde y 158. Suelo y 166, libre x 84–236.
//   'salon': EL SALÓN DE VILLA DIODATI de noche: la cornisa con dentículos, el damasco verde con pilastras, el zócalo de
//     paneles de nogal, LA CHIMENEA de mármol veteado (x 6–106; el hogar x 30–86, y 100–146) con el fuego que lame, las
//     ascuas, las chispas y su luz naranja, la repisa (y 86) con dos velas y el reloj con péndulo, el cuadro de un lago con
//     luna encima en marco dorado; dos cuadritos; DOS VENTANAS altas (x 160–192 y 218–250, y 30–108) con la noche de
//     tormenta, la lluvia, los regueros en el cristal y RELÁMPAGOS que dejan ver las montañas (o.rayo como en 'lago';
//     destello también dentro), sus cortinas de terciopelo y el aplique de dos velas entre ellas (x 205, y 66); el sillón
//     de orejas (x 266–294); el perro dormido junto al fuego (x 96–116, y 150); la tarima y la alfombra persa con su
//     medallón bajo la mesa. LA MESA LARGA (tapa x 140–258, y 140–146; patas a y 173) con papeles con renglones, plumas
//     en sus tinteros, libros y el candelabro de tres velas (x 190–210, y 114). o.lectura true: el atril con el libro
//     grande abierto (x 112–136, pie y 150, libro y 109–117) al que se le pasa una hoja cada 6 s. Suelo y 150, libre
//     x 30–290; detrás de la mesa asoman cabeza y hombros. Devuelve .mesa [x0, x1, yTapa], .atril, .ventanas, .rayo.
//     Cámara 'mesa': la mesa del desayuno por la mañana, luz gris de lluvia: la pared de paneles, la ventana (x 100–220,
//     y 16–98) con el lago gris, nubes bajas, lluvia y regueros, sus cortinas y la luz que entra en diagonal; el barómetro
//     de banjo con la aguja que tiembla en «tormenta» (x 32–60, y 24–88), un aplique, un cuadrito de flores, el aparador
//     con la cafetera de plata y el frutero (x 232–304); los respaldos de tres sillas (x 74, 140, 206). La mesa con
//     mantel (y 142–180) con tazas que humean, la tetera de plata que humea (x 104), el pan, la mantequilla, la
//     mermelada, el cabo de vela de anoche, las hojas de los demás escritas con rayitas y LA DE MARY EN BLANCO (x 150–180,
//     y 146–154) con su pluma y su tintero. Sentados detrás: suelo y 146 (cabeza y hombros sobre el mantel), libre
//     x 40–280. Devuelve .hojaMary [x0, y0, x1, y1].
//   'cuarto': EL CUARTO DE MARY de noche, en azul de luna: papel pintado de rayas, cornisa, zócalo de paneles, LOS
//     POSTIGOS cerrados (x 36–98, y 26–118) con UN HILO DE LUNA en la rendija del medio (x 66) y en dos tablas, luz por
//     arriba y por abajo, y su haz en diagonal hasta la mancha del suelo (x 138–166, y 170–178) con motas de polvo que
//     flotan (la luna pasa entre nubes: el hilo respira; no llueve esa noche); el palanganero con jarra y toalla (x 6–32),
//     el armario (x 102–150, y 46–150), el espejo ovalado (x 190–206, y 63–85), un grabado del lago (x 286–310, y
//     56–82); LA CAMA de medio dosel (pie x 160, cabecero x 258–266, colchón y 112, colcha y 116–142, almohada x 236–256,
//     y 104–112), la alfombrilla; una polilla que ronda la vela de la mesilla (x 268–292, la vela en x 276, se va
//     consumiendo; o.vela 0–1 fija cuánto). o.sueno 0–1: sobre la cama, LA VISIÓN en una nube de luz azulada y difusa
//     (centro [194, 66], 128 × 76 px) que se abre hasta 0,3; desde 0,2 aparecen el estudiante arrodillado junto a la mesa
//     larga y la forma tendida, que de 0,45 a 0,8 se incorpora, alta, y mueve el brazo; desde 0,78 se abren DOS OJOS
//     AMARILLOS Y ACUOSOS que miran al estudiante (parpadean a veces). Solo siluetas y luz. o.calido true: la misma visión
//     en luz cálida (el cierre). Suelo y 150, libre x 30–150. Devuelve .vision [x, y], .ojos [[x, y], [x, y]] (null hasta
//     0,78), .almohada [246, 108], .vela.
// Llama a lagoDelante después de los actores: en 'lago', los juncos de las esquinas y, con tormenta, la lluvia gorda de
// primer término con salpicaduras; en 'salon', la mesa larga con lo que hay encima; en 'mesa', la mesa del desayuno; en
// 'cuarto', la mesilla con la vela y, con o.manta true, la colcha que tapa a quien duerme (solo asoma la cabeza en la
// almohada). Pásale las mismas opciones que a lago().
export function lago(R, t, o = {}) {
  const enc = o.encuadre ?? 'lago';
  if (enc === 'salon') return o.camara === 'mesa' ? b_mesa(R, t, o) : b_salon(R, t, o);
  if (enc === 'cuarto') return b_cuarto(R, t, o);
  if (o.camara === 'ventana') return b_ventana(R, t, o);
  const tor = Math.max(0, Math.min(1, o.tormenta ?? 0));
  const r = b_paisaje(R, t, tor, o);
  return { suelo: 152, libre: [30, 280], horizonte: 86, villa: [220, 64], casita: [84, 122], embarcadero: [112, 168, 141], bote: r.bote, barca: r.barca, rayo: r.rayo };
}
// Lo que va por delante de los personajes, según el encuadre: en 'lago', los juncos de las dos esquinas (x 0–26 y
// 292–319, se mecen con el viento) y, con tormenta, la lluvia gorda de primer término con sus salpicaduras en la orilla;
// en 'salon', la mesa larga con sus papeles, plumas, tinteros y el candelabro (canto de delante y 152); en 'mesa', la
// mesa del desayuno entera (y 142–180); en 'cuarto', la mesilla con la vela (x 262–292) y, con o.manta true, la colcha
// que tapa el cuerpo de quien duerme (x 166–238, y 113–142: solo asoma la cabeza en la almohada).
export function lagoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'lago';
  if (enc === 'salon') { if (o.camara === 'mesa') b_mesaTabla(R, t, o); else b_salonMesa(R, t, o); return {}; }
  if (enc === 'cuarto') { if (o.manta) b_colcha(R, t); b_mesilla(R, t, o); return {}; }
  if (o.camara === 'ventana') return {};
  const tor = Math.max(0, Math.min(1, o.tormenta ?? 0)), vto = 0.25 + tor;
  // los juncos de las esquinas, que se doblan con el viento
  for (const [x0, x1, k] of [[0, 26, 0], [292, 319, 1]]) for (let i = 0; i < 13; i++) {
    const bx = x0 + Math.round(h(i, k, 801) * (x1 - x0)), alto = 18 + Math.round(h(i, k, 802) * 22), sw = Math.sin(t * (1.6 + tor * 2) + i * 0.9 + k) * (1.2 + vto * 2.2) + vto * 3;
    const cJ = i % 3 === 0 ? hex('#8a8a4a') : i % 3 === 1 ? hex('#5e6a36') : hex('#46522a');
    for (let j = 0; j < alto; j++) { const u = j / alto, x = Math.round(bx + sw * u * u); R.pset(x, 180 - j, j > alto - 3 ? hex('#a8a868') : cJ); if (u < 0.5) R.pset(x + 1, 180 - j, hex('#2e3620')); }
    if (i % 4 === 0) { const tx = Math.round(bx + sw), ty = 180 - alto; R.rect(tx - 1, ty - 5, tx + 1, ty, hex('#5a3a22')); R.pset(tx, ty - 6, hex('#7a5a36')); R.pset(tx - 1, ty - 4, hex('#3a2616')); }   // la espadaña
  }
  if (tor > 0.15) {
    b_lluvia(R, t, Math.round(40 * tor), 2 + tor * 2.4, 10, 0, 180, hex('#dce4f0'), hex('#9aa6ba'), 7, 260);    // gotas gordas cercanas
    // las salpicaduras en la orilla
    for (let k = 0; k < Math.round(16 * tor); k++) { const per = 0.5 + h(k, 1, 806) * 0.4, u = ((t + h(k, 2, 806) * 3) % per) / per, x = Math.round(h(k, 3, 806) * 300 + 10 + Math.floor((t + h(k, 2, 806) * 3) / per) * 37) % 320, y = 156 + Math.round(h(k, 4, 806) * 22);
      if (u < 0.35) { const r = Math.round(u * 8); R.pset(x - r, y, hex('#b8c4d4')); R.pset(x + r, y, hex('#b8c4d4')); if (u < 0.15) R.pset(x, y - 2, hex('#e0e8f0')); } }
  }
  return {};
}
// ── C · El mundo del libro (por el texto de 1818, nada de las películas) ─────────────────────────────────────────────
// libro(R, t, o): pinta los 320 × 180 en cada fotograma (lo fijo, en un búfer por encuadre y cámara). o.encuadre:
//   'buhardilla' (por omisión): EL TALLER DE VICTOR en una buhardilla de Ingolstadt, de noche. Cámara 'general': el techo
//     inclinado con sus cabrios y la viga maestra, una claraboya (x 180–232, y 7–28) con la lluvia, las nubes y la luna (y
//     un relámpago de vez en cuando, que la blanquea) y su haz de luna tramado hasta el suelo; a la izquierda una
//     estantería (x 4–106, y 42–146) con frascos de cristal de colores, botellas de Leyden y libros viejos; en la pared un
//     estante con un matraz que hierve sobre su lamparilla (x 186), dibujos clavados, hierbas secas colgadas, una mancha
//     de humedad; la mesa LARGA (x 120–240, tablero y 128) TAPADA con una sábana (debajo, solo una forma alargada);
//     a la derecha una mesita (x 250–292, tablero y 124) con la pila de Volta y sus discos de cobre y cinc, cables, un
//     compás de latón, un libro abierto y una vela casi consumida que parpadea (x 277, llama y ≈ 113) con su halo y una
//     polilla; un armario (x 296–320); el suelo de tablas en perspectiva, papeles, un cubo bajo la gotera (x 204) donde cae
//     una gota cada poco, y un ratón que cruza. o.despierta 0–1: de 0 a 0,6 la sábana respira y se ondula cada vez más;
//     desde 0,6 se levanta el pico de la cabecera (x 136–150) y asoma un ojo amarillo y acuoso (x ≈ 143, y ≈ 119) que
//     parpadea (solo eso). Suelo y 150, libre x 30–112 (y delante de la mesa, x 120–240, si alguien va hacia ella).
//     Cámara 'escalera': el rellano en penumbra: la puerta de la buhardilla abierta (hueco x 44–82, y 78–150) con la luz
//     de la vela dentro y el pico de la sábana al fondo, la hoja de la puerta que cruje, un charco de luz en el suelo, un
//     candil de pared (x 128, y 88), un cuadrito, una ventana emplomada (x 222–262, y 38–86) con lluvia y relámpagos, una
//     araña que baja de la viga, y la escalera que baja a la derecha: rellano y 150 hasta x 160, luego cinco peldaños de
//     14 px que bajan 6 px cada uno (el pie en ESC(x), que devuelve también la función). Libre x 20–160 y los peldaños.
//   'cabana': LA CABAÑA DE LOS DE LACEY en el bosque, de día (primavera). Cámara 'general': cielo tramado con nubes de
//     tres tonos a tres velocidades y pájaros, montes y bosque al fondo, un roble a la izquierda, un abeto a la derecha;
//     la casita (x 58–198) de piedra con tejado de paja, chimenea (x 170) con humo, dos ventanas (x 70–90 y 136–156, y
//     104–122) con la familia pequeñita que se mueve dentro (recortada a la ventana), puerta (x 102–120, y 116–150);
//     PEGADO a ella el cobertizo de tablas (x 198–300, pared y 110–150, tejado a un agua) con la GRIETA (x 236–240, y
//     114–142), por la que se escapa la luz del fuego (parpadea); la leña (x 302–318); el huerto con coles y judías en
//     varas (x 10–56), un seto de mimbre, gallinas que picotean, la ropa tendida que ondea (x 30–56) y el camino a la
//     puerta. Suelo y 150 (los pies), libre x 30–290. La criatura se pone de cara a la grieta: x ≈ 222 (dir 1) o
//     x ≈ 244 (dir -1); su cara cae en y ≈ 124–132, a la altura de la grieta.
//     Cámara 'dentro': dentro de la cabaña, de noche en invierno: paredes de piedra encalada encendidas por el fuego, vigas
//     con hierbas, una vasar con loza, una ventana emplomada (x 120–158, y 50–84) con el bosque nevado y la nieve que cae,
//     la mesa de pared (x 44–104, tablero y 124) con libros, pan, jarra y vela, el hogar (x 196–268) con el fuego que
//     arde, la olla en su llar y chispas, una alfombra de esparto, un gato que duerme junto al fuego (mueve la cola), la
//     puerta de fuera (x 282–312) y a la izquierda el tabique de tablas que da al cobertizo con la GRIETA (x 18–24, y
//     92–126); o.ojo true: un ojo amarillo que mira por la grieta y parpadea. Suelo y 152, libre x 40–260.
//   'artico': EL HIELO DEL ÁRTICO, de noche. Cámara 'general': cielo con estrellas que titilan y la AURORA de cortinas
//     verdes y malva que se mueven; icebergs en el horizonte (y 100); la llanura de hielo con crestas de presión, grietas
//     y brillos; el barco atrapado (casco x 222–298, cubierta y ≈ 94, palos hasta y 42) con faroles, humo de la estufa y
//     dos marineros pequeños; un trineo cargado (x 150–186, y 146–152) y un oso blanco lejos que camina; el viento
//     levanta nieve. Suelo y 152, libre x 30–200.
//     Cámara 'barco': el barco de cerca y de costado, al anochecer: el casco (x 112–312, cubierta y ≈ 86) con tracas,
//     cintas, portas, el ventanal de popa encendido, la escarcha y el hielo que lo aprieta, tres palos con vergas y velas
//     aferradas, faroles, la tripulación pequeña asomada a la borda, humo; la escala (x 124–134) que baja al hielo, y a la
//     izquierda el hielo hasta el horizonte (y 118) con icebergs. Suelo y 160, libre x 10–300 (delante del casco).
// Devuelve { suelo, libre, … } con lo que la escena necesita (ver geometría en cada encuadre).
// Llama a libroDelante después de los actores (la esquina de banco de trabajo en 'buhardilla', la barandilla en
// 'escalera', helechos en 'cabana', un cesto y un cubo en 'dentro', nieve que vuela y témpanos en 'artico').
export function libro(R, t, o = {}) {
  const en = o.encuadre ?? 'buhardilla', cam = o.camara ?? 'general';
  if (en === 'cabana') return cam === 'dentro' ? c_cabanaDentro(R, t, o) : c_cabana(R, t, o);
  if (en === 'artico') return cam === 'barco' ? c_barco(R, t, o) : c_artico(R, t, o);
  return cam === 'escalera' ? c_escalera(R, t, o) : c_buhardilla(R, t, o);
}
// libroDelante(R, t, o): lo que va por delante de los personajes, con las mismas o.encuadre y o.camara que libro:
//   'buhardilla' general: la esquina de un banco de trabajo (x 262–320, y 158–180) con un mortero, un tintero con pluma,
//     un matraz y papeles; 'escalera': el pasamanos y los balaustres de la escalera (x 160–320), por delante de quien baja;
//   'cabana' general: helechos y hierba alta en las esquinas de abajo (x 0–34 y 284–320), mecidos por el viento;
//     'dentro': un cesto de mimbre y un cubo de madera (x 290–320, y 158–180);
//   'artico': nieve que vuela por delante y témpanos en las esquinas de abajo (x 0–26 y 292–320).
export function libroDelante(R, t, o = {}) {
  const en = o.encuadre ?? 'buhardilla', cam = o.camara ?? 'general';
  if (en === 'cabana') { if (cam === 'dentro') c_cestoDelante(R, t); else c_helechos(R, t); }
  else if (en === 'artico') c_nieveDelante(R, t, cam);
  else if (cam === 'escalera') c_barandilla(R, t);
  else c_bancoDelante(R, t);
  return {};
}
// ── D · Londres, 1818–1823 ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'imprenta' (por omisión), o.camara 'general': UNA IMPRENTA Y LIBRERÍA de 1818 por dentro, de día: techo de tablas en penumbra
//     (franja tranquila bajo la barra del año) y la viga maestra en y 20–25,
//     pared de cal con desconchones de ladrillo y zócalo de tablas, suelo de tablas en perspectiva con manchas de tinta y
//     recortes; a la izquierda LA PRENSA DE MADERA (x 12–122: las dos piernas, el sombrero, el husillo de hierro, la
//     platina, el carro con el tímpano abierto y su pliego, la manivela y LA PALANCA, cuyo puño queda en x 116, y 74), con
//     el bote de tinta y los tampones al lado; un APRENDIZ pequeño al fondo (x 128, suelo 116) que entinta frotando los dos
//     tampones; LOS CHIBALETES con las cajas de tipos (x 146–206, y 64–100) con el reloj de pared encima (su péndulo se
//     mueve); PLIEGOS COLGADOS secándose en dos cuerdas (se mecen); EL ESCAPARATE de la librería al fondo a la derecha (x
//     216–298, y 48–108): cristales pequeños, la calle de enfrente con la niebla y paseantes que pasan (recortados al
//     hueco), un gorrión en el alféizar y, en la peana, libros en juegos de TRES TOMOS; una librería de pared (x 300–319, y 46–116: fuera de la esquina de Atom);
//     el haz de luz de la ventana en el suelo con motas. EL MOSTRADOR va en ciudadDelante (x 136–214, encimera y 134), y
//     o.tomos true pone en él TRES TOMITOS iguales de pie (x 143–181, y 122–133; sin título, con nervios dorados).
//     Suelo y 150. Libre para los personajes: x 40–134 y x 216–300 (delante); detrás del mostrador, un tendero en x
//     188–204 con suelo 144 (asoman cabeza y hombros; a la izquierda están los tomitos, a la derecha el tintero). Devuelve { suelo, libre, mostrador: [x0, y, x1], tomos: [[x, y]…],
//     palanca: [x, y] }.
//   'imprenta', o.camara 'escaparate': LA LIBRERÍA DESDE LA CALLE: cielo de Londres tramado con nubes de tres tonos a tres
//     velocidades, humo de chimeneas y pájaros; la fachada georgiana de ladrillo hollín (ventanas de guillotina, cornisa de
//     piedra con dentellones en y 21–26, por debajo de las cifras del año), el ESCAPARATE en mirador (x 52–170, y 92–144) lleno de libros (juegos de tres tomos, uno abierto), la
//     PUERTA verde con su abanico de cristal (x 182–212, suelo 152), el rótulo de tabla sin letras (un libro abierto
//     pintado en oro) y la MUESTRA colgante con forma de libro que se balancea, casas vecinas, una farola de aceite (x
//     262) que tiembla, acera de losas, bordillo, adoquines mojados con charcos que reflejan, alguien que cruza tras un
//     visillo y una vela en otra ventana, y el gato de la librería en el escalón (x 222) que mueve la cola; o.tomos
//     true: tres tomitos destacados en el centro del escaparate (x 98–124, y 118–130). Suelo y 156 (la acera), libre x
//     20–250. ciudadDelante pinta un carro de caballos que pasa por los adoquines de vez en cuando (o.carro false lo quita).
//   'teatro', o.camara 'general': UN TEATRO DE LONDRES LLENO (1823) visto desde el fondo de la platea: techo con artesones
//     en penumbra y una araña de velas (x 236, y 20–40), EL ARCO DEL PROSCENIO dorado (x 56–264, y 18–112) con su
//     cartela de una lira, el TELÓN ROJO recogido en bambalina y en dos caídas con sus alzapaños, en el escenario un
//     DECORADO PINTADO de laboratorio (de teatro, de cartón: bastidores con estantes de frascos pintados, una ventana
//     gótica pintada con su luna, una mesa de atrezo con retortas) y EL ACTOR ALTO (x 154–166, pies en y 104, unos 40 px):
//     cara empolvada muy pálida, pelo negro largo, túnica de arpillera con faja, piernas vendadas, brazos que se alargan despacio, de teatro y
//     nada de las películas; o.actores false lo quita (y al galán de casaca azul que retrocede, x 112); las CANDILEJAS (y
//     106–110) que tiemblan; el foso de la orquesta con músicos que tocan (arcos que se mueven); los PALCOS dorados a los
//     lados (izquierda tres pisos x 0–54, derecha dos pisos x 266–319, y 50–120), con cortinillas recogidas, y público
//     pequeño que aplaude, se abanica y mira con gemelos (arriba a la derecha, sobre los palcos, solo un cortinaje oscuro
//     tranquilo detrás de Atom); el foso con su pared de tablas; el fondo de la platea lleno de cabecitas (y 122–150). ciudadDelante pinta las filas de delante de la platea
//     (cabezas grandes de espaldas, sombreros, cofias y manos que aplauden, y 146–180). Palco bajo de la izquierda para
//     un personaje: x 6–50, suelo 118 (su pared de damasco va iluminada por un candelabro que tiembla, para que una figura de luto se lea; la barandilla
//     de delante, en ciudadDelante, empieza en y 106 y deja ver cabeza y hombros). Suelo del
//     escenario y 104 (x 96–228). Devuelve { suelo: 104, libre: [96, 228], palco: [6, 50, 118], actor: [x, y] (su cara) }.
//   'teatro', o.camara 'palco': UN PALCO DE CERCA visto desde la sala: la pared del fondo de damasco rojo con su dibujo,
//     un espejo con marco dorado y dos apliques de vela que tiemblan, una puerta, el perchero con una chistera, las
//     COLUMNAS DORADAS talladas a los lados (x 40–58 y x 262–280), la cornisa con flecos, las cortinas de terciopelo
//     recogidas, y en los palcos vecinos (cortados por los bordes, con su damasco, su aplique y su cortina) público pequeño que se
//     abanica, aplaude y mira con gemelos; por la puerta entreabierta pasa a ratos un acomodador con su vela; en el espejo
//     tiemblan las candilejas; la luz del
//     escenario que llega desde la izquierda con motas. ciudadDelante pinta LA BARANDILLA dorada con su repisa de
//     terciopelo (y 146–180) y, encima, unos gemelos de teatro; o.programa true: EL PROGRAMA sobre la repisa (x 204–228,
//     y 133–146), con rayitas de texto y UNA RAYA LARGA donde iría el nombre del monstruo; o.raya 0–1 hace brillar la raya
//     (el gag). Suelo y 150, libre x 70–250 (asoman cabeza y hombros por encima de la repisa, y 146). Para el programa en la mano
//     o de cerca, las escenas usan d_programa (exportada).
// Llama a ciudadDelante después de los actores con las mismas opciones: el mostrador y los tomitos en 'imprenta'; el
// carro en 'escaparate'; las cabezas de la platea y la barandilla del palco bajo en 'teatro'; la barandilla y el programa
// en 'palco'.
export function ciudad(R, t, o = {}) {
  const enc = o.encuadre || 'imprenta', cam = o.camara || 'general';
  if (enc === 'teatro') return cam === 'palco' ? d_palco(R, t, o) : d_teatro(R, t, o);
  return cam === 'escaparate' ? d_calleLibreria(R, t, o) : d_imprenta(R, t, o);
}
export function ciudadDelante(R, t, o = {}) {
  const enc = o.encuadre || 'imprenta', cam = o.camara || 'general';
  if (enc === 'teatro') { if (cam === 'palco') return d_palcoDelante(R, t, o); return d_teatroDelante(R, t, o); }
  if (cam === 'escaparate') return o.carro === false ? {} : d_carro(R, t);
  return d_mostrador(R, t, o);
}
// ── E · Italia, 1818–1822 ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'casa' (por omisión), cámara 'general': LA CASA BLANCA JUNTO AL MAR (Casa Magni, en Lerici), vista desde su propia
//     terraza: a la izquierda (x 14–152) la fachada de yeso blanco con su tejado de tejas, persianas verdes, la puerta
//     vidriera de la terraza (x 98–122, y 104–138) con la cortina que se mueve, un banco contra la pared y un limonero en
//     su maceta; a la derecha la terraza abierta con su balaustrada de piedra (x 152–304, y 120–138) y, detrás, el golfo:
//     barcas de pescadores con vela latina que pasan, un bote a remo, un velero en el horizonte (y 98), Lerici con su
//     castillo en el promontorio de la derecha y las colinas con olivos, pinos y cipreses detrás de la casa. Debajo de
//     la terraza, los arcos de la planta baja con el agua que entra. Un catalejo de latón en su trípode (x 266–292).
//     o.hora 'dia' | 'ocaso' | 'noche' (de noche: ventanas encendidas, el farol de la pared, las luces de Lerici, la luna
//     y las estrellas); o.cielo 'claro' | 'gris'. Suelo y 152 (la terraza), libre x 40–260.
//   cámara 'dentro': EL CUARTO ENCALADO: pared de cal con su textura, vigas encaladas, zócalo de almagre y suelo de
//     barro cocido; la ventana abierta al mar (x 124–176, y 34–96, con barcas, nubes y gaviotas recortadas a su hueco) y
//     el visillo que se mueve; debajo, la mesa de escribir (x 116–198, tablero y 120, patas a y 150) con papeles, un
//     cuaderno abierto, el tintero y la pluma, libros y una vela (encendida al ocaso y de noche); una silla apartada (x
//     98–114); un baúl (x 14–58), un estante con libros, una lucerna de latón y hierbas secas colgadas, un apunte del
//     mar enmarcado, una guitarra, la puerta de tablones entornada (x 284–314, y 54–136); o.cunas 1 | 2 (por omisión 1): la cuna de
//     madera (x 228–276, suelo 154) y una segunda de mimbre (x 282–314); o.cunaVacia true: vacías, con la mantita doblada
//     sobre el borde (nada morboso); sin ella, la mantita dentro, recogida. De día, el rayo de sol con motas de polvo; al
//     ocaso, naranja; de noche, la luna en la ventana y el halo de la vela. Suelo y 152, libre x 20–110 y 196–224.
//   'mar', cámara 'general': EL MAR EN TORMENTA, DE LEJOS, desde la orilla: nubes negras en tres capas a distinta
//     velocidad, relámpagos lejanos dentro de las nubes, cortinas de lluvia, olas grandes con crestas de espuma, la bruma
//     del horizonte (y 100) y UN BARQUITO DE VELA de dos palos (o.barco 0–1: de x 120, y 134 se aleja hasta x 238, y 102,
//     empequeñece y se pierde en la bruma; a partir de 0,6 se desvanece y en 1 ya no se ve; nunca un naufragio); o.barco
//     sin dar: no hay barco. Rocas a los lados, arena mojada y la espuma que sube y baja. o.calma true: el mar gris en
//     calma bajo un cielo cubierto, sin lluvia, con gaviotas, la playa vacía. Suelo y 174 (la arena), libre x 70–260.
//   'mar', cámara 'playa': LA PLAYA con la casa al fondo a la izquierda (x 14–96, sus arcos sobre la arena) y las
//     colinas, el golfo, Lerici lejos a la derecha; la ola que sube y baja por la arena mojada, correlimos que corren en
//     la orilla, un cangrejo, conchas, algas, las huellas que vienen de la casa, una barca varada con sus redes y un
//     pescador que las remienda (x 236–300). o.hora y o.cielo como en 'casa' (o.calma true = cielo 'gris'). Suelo y 152,
//     libre x 70–224 (Mary y el niño de pie mirando el horizonte, dir 1).
// Devuelve { suelo, libre, horizonte, … } con las cotas de cada encuadre. Llama a italiaDelante después de los actores
// (las esquinas de la balaustrada con sus macetas y la parra en 'casa'; las motas del rayo de sol en 'dentro'; las rocas
// y los rociones de espuma en 'mar'; las matas de la duna en 'playa').
export function italia(R, t, o = {}) {
  const enc = o.encuadre ?? 'casa', cam = o.camara ?? 'general';
  R.recorte(null);
  let r;
  if (enc === 'mar') r = cam === 'playa' ? e_playa(R, t, o) : e_mar(R, t, o);
  else r = cam === 'dentro' ? e_cuarto(R, t, o) : e_casa(R, t, o);
  R.recorte(null);
  return r;
}
// lo que va por delante de los personajes (mismas opciones que italia)
export function italiaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'casa', cam = o.camara ?? 'general';
  R.recorte(null);
  if (enc === 'mar') { if (cam === 'playa') e_playaDelante(R, t, o); else e_marDelante(R, t, o); }
  else if (cam === 'dentro') e_cuartoDelante(R, t, o);
  else e_casaDelante(R, t, o);
  return {};
}
// ── Piezas: los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio, a escala 2, con
// omisión: cada píxel lógico es un cuadrado de 2 × 2, con contorno oscuro, luz y sombra, y su sombra en el suelo), o.cual:
//   'sueno': una nube de sueño (bocadillo con la cola de puntitos) que flota, con dos figuritas dentro que se abrazan (una
//     mayor y una pequeña, la pequeña se mece), estrellitas que parpadean y el «58» encima (o.numero false lo quita);
//     unos 64 × 56 px a escala 2;
//   'volcan': un volcán que estalla (lava que baja, bocanadas de ceniza de tres grises que suben y crecen, piedrecitas)
//     y, a la derecha, un globo terráqueo que gira con una banda de nube gris que le da la vuelta (o.globo false lo
//     quita); o.nieve true: en su lugar, un campo de maíz verde con la nieve encima y copos que caen; unos 96 × 64 px;
//   'galvani': una mesa de laboratorio antiguo de madera con una pila de Volta (discos de cobre y cinc entre varillas de
//     vidrio), dos cables y una rana DE JUGUETE de hojalata (verde con remaches, la tripa amarilla y la llave de cuerda
//     en el lomo) que salta en arco con las patas estiradas (o.salto 0–1) con una chispa al empezar; unos 104 × 60 px;
//   'pelota': una pantalla antigua (monitor beis de tubo) con tres figuritas que se pasan una pelota en bucle y una cuarta
//     apartada a la derecha, cabizbaja; a su lado un corazón que se agrieta (o.grieta 0–1; con 1 las dos mitades se
//     separan un poco); unos 100 × 64 px;
//   'cuaderno': un cuaderno abierto que se escribe solo (las rayitas aparecen una a una y una pluma las sigue; o.escrito
//     0–1, por omisión avanza con t) y del que sale una luz cálida con chispas que suben; o.caja true: al lado, una cajita
//     de madera con la tapa abierta de la que sale luz; unos 84 × 48 px (120 con la caja).
// x, y: el centro de la base (donde se apoya; la sombra queda ahí). Devuelve { arriba: [x, y] } (lo más alto de la pieza,
// para la escena) y, en 'galvani', { rana: [x, y] }.
export function pausa(R, x, y, t, o = {}) {
  const s = o.s ?? 2, G = d_grilla(R, Math.round(x), Math.round(y), s), cual = o.cual || 'sueno';
  if (cual === 'volcan') return o.nieve ? d_maiz(R, G, t, o, x, y, s) : d_volcan(R, G, t, o, x, y, s);
  if (cual === 'galvani') return d_galvani(R, G, t, o, x, y, s);
  if (cual === 'pelota') return d_pelota(R, G, t, o, x, y, s);
  if (cual === 'cuaderno') return d_cuaderno(R, G, t, o, x, y, s);
  return d_sueno(R, G, t, o, x, y, s);
}
// la paleta de Londres (la Regencia, con niebla y hollín)
const a_P = pal({
  yesoT: '#8e8678', yesoTS: '#7e7668', cornisa: '#a8a090', cornisaS: '#6e675c',
  papel: '#3e5446', papelL: '#46604e', papelS: '#324438', papelD: '#26362c', oroP: '#a8904c', oroPS: '#7a6838', oroPL: '#e0c878',
  caoba: '#5a2e22', caobaS: '#3e1e16', caobaL: '#7a4232', caobaD: '#26120c',
  roble: '#8a5a34', robleS: '#6a4226', robleL: '#a8744a', robleD: '#4a2c18',
  marmol: '#d8d2c6', marmolS: '#a8a294', marmolV: '#bab2a4', marmolD: '#7a7468',
  hierro: '#2c2c34', hierroL: '#55556a', hierroD: '#18181e',
  brasa: '#c8401a', brasaL: '#f08030', brasaD: '#6a1a0e', llama: '#ffb040', llamaL: '#fff0a0',
  piel: '#e2b48c', pielS: '#b88462', pielL: '#f0cca6', pelo: '#7a4a2a', peloL: '#a8703e', peloD: '#4a2a18',
  vestido: '#3a4256', vestidoS: '#262c3c', vestidoL: '#4e5870', panu: '#efeadc', panuS: '#bcb6a6', panuL: '#ffffff',
  fondoO: '#3a3422', fondoOL: '#5a4e30', fondoOD: '#24200e',
  alfR: '#7a2626', alfA: '#2a3a5a', alfO: '#b8904a', alfS: '#4a1616', alfC: '#d8c8a0',
  cortina: '#5e2228', cortinaS: '#3e141a', cortinaL: '#7e3238',
  damasco: '#7a3030', damascoS: '#5a2024', damascoL: '#9a4a44',
  niebla: '#a8acb4', nieblaS: '#8a9098', nieblaL: '#c8ccd0', nieblaD: '#6e747e',
  yesoV: '#b4aa94', yesoVS: '#a49a84', yesoVL: '#c2baa6', humedad: '#8a7e62', listón: '#7a6044',
  stock: '#8a7c62', stockS: '#665a46', stockL: '#a4967a', estuco: '#c8bea6', estucoS: '#9e957e',
  musgo: '#55662e', musgoL: '#7a8a42', liquen: '#b8a84a', liquenN: '#c87a3a',
  hierba: '#4a6a3a', hierbaS: '#3a5430', hierbaL: '#6e8e4a', hierbaD: '#2a3e24',
  hoja: '#c46a2a', hojaL: '#e0a040', hojaS: '#8a3a1a', tronco: '#3e3428', troncoL: '#5a4c3a', troncoS: '#2a2218',
  piedra: '#8a8478', piedraS: '#6a6458', piedraL: '#a8a294', grava: '#9a9282', gravaS: '#7a7264',
  adoquin: '#3e3e48', adoquinL: '#5a5a68', adoquinS: '#2a2a32', losa: '#7a766c', losaS: '#5e5a52',
  cielo0: '#1e2244', cielo1: '#3a3e66', cielo2: '#6a5e7e', alba: '#d8957a', albaL: '#f0c890', cieloL: '#a8a8c0',
  gris0: '#8a909a', gris1: '#9ea4ac', gris2: '#b4b8bc', nube0: '#7a808a', nube1: '#a0a6ae', nube2: '#c8ccd0',
  luzV: '#f4c870', luzVL: '#fff0c0', luzVS: '#c88a40',
});

const a_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer propio (sin tocar el de la pantalla) y se copia en cada fotograma
function a_fijo(R, clave, dibuja) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// como a_fijo, pero copia solo lo pintado: lo que quedó a 0 en el búfer deja ver lo de debajo (el cielo que se mueve)
function a_fijoSobre(R, clave, dibuja) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  const b = m[clave], B = R.buf; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i];
}

// mezcla dos colores (a = 0, el primero; a = 1, el segundo)
const a_mez = (c, d, a) => { a = Math.max(0, Math.min(1, a)); const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// tiñe lo ya pintado en un rectángulo (sombra o luz); trama: solo un píxel de cada dos
function a_tinte(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (!trama || ((x + y) & 1) === 0) R.pset(x, y, a_mez(R.pget(x, y), col, a));
}

// un halo de luz tramado que se apaga con la distancia (r) alrededor de (cx, cy)
function a_halo(R, cx, cy, r, col, a) {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.15) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (h(x, y, 7) < 1 - d) R.pset(x, y, a_mez(R.pget(x, y), col, a * (1 - d))); }
}

// una llama de vela de 3 × 5 que tiembla, con el pabilo
function a_llama(R, x, y, t, k = 0) {
  const f = Math.sin(t * 11 + k * 3) + Math.sin(t * 17.3 + k), d = f > 1.2 ? 1 : f < -1.2 ? -1 : 0, P = a_P;
  R.pset(x, y, C.k); R.pset(x, y - 1, P.llama); R.pset(x + d, y - 2, P.llamaL); R.pset(x, y - 2, P.llamaL); R.pset(x + d, y - 3, P.llama); if (f > -0.6) R.pset(x + d, y - 4, P.brasaL);
  R.pset(x - 1, y - 1, P.brasaL); R.pset(x + 1, y - 1, P.brasaL);
}

// una vela en su palmatoria (x, y: la base de la vela; alto en px)
function a_vela(R, x, y, alto, t, k = 0) {
  const P = a_P; R.rect(x - 4, y, x + 4, y + 1, C.k); R.rect(x - 3, y, x + 3, y, P.oroP); R.rect(x - 1, y - 1, x + 1, y - 1, P.oroPS);
  R.rect(x - 1, y - alto, x + 1, y - 1, hex('#f0e8d0')); R.pset(x + 1, y - alto + 1, hex('#c8bca0')); R.pset(x - 1, y - alto, hex('#fff8e8'));
  a_llama(R, x, y - alto - 1, t, k);
}

// los lomos de una balda de libros entre x0 y x1 con la base en yb (alto máx. al): cuero de colores con nervios y
// rótulos dorados (sin letras: rayitas), alguno tumbado o inclinado y huecos
function a_libros(R, x0, x1, yb, al, k) {
  const P = a_P, cols = [hex('#6a2420'), hex('#2a4a34'), hex('#8a6a3a'), hex('#2a3450'), hex('#4a2a1e'), hex('#7a5a2e'), hex('#1e1e24'), hex('#5a3a4a'), hex('#9a7a4a')];
  let x = x0;
  for (let i = 0; x < x1 - 1; i++) {
    const r = h(i, k, 801), w = 2 + Math.floor(r * 3), hh = al - Math.floor(h(i, k, 802) * 5), c = cols[Math.floor(h(i, k, 803) * cols.length)];
    if (r < 0.06 && x + 4 < x1) { x += 3; continue; }   // un hueco
    if (r > 0.95 && x + 12 < x1) { for (let j = 0; j < 3; j++) { const cc = cols[(i + j * 3) % cols.length]; R.rect(x, yb - 2 - j * 3, x + 10, yb - j * 3, C.k); R.rect(x + 1, yb - 1 - j * 3, x + 9, yb - j * 3, cc); R.pset(x + 2, yb - 1 - j * 3, P.oroP); } x += 12; continue; }   // un montón tumbado
    const xe = Math.min(x1, x + w);
    R.rect(x, yb - hh, xe, yb, C.k); R.rect(x + 1, yb - hh + 1, xe, yb, c); R.rect(x + 1, yb - hh + 1, x + 1, yb, a_mez(c, C.blanco, 0.2));
    if (hh > 5) { R.rect(x + 1, yb - hh + 2, xe, yb - hh + 2, P.oroPS); R.rect(x + 1, yb - 2, xe, yb - 2, P.oroPS); if (w > 2) R.pset(x + 2, yb - Math.round(hh * 0.6), P.oroP); }
    x = xe + 1;
  }
}

// una librería de caoba (x0–x1, y0–y1) con su cornisa, baldas con libros, y el zócalo
function a_libreria(R, x0, x1, y0, y1, k) {
  const P = a_P, { rect } = R;
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1, P.caobaS);
  rect(x0 - 1, y0, x1 + 1, y0 + 3, C.k); rect(x0, y0 + 1, x1, y0 + 2, P.caobaL); rect(x0, y0 + 3, x1, y0 + 3, P.caobaD);
  const nb = Math.max(2, Math.floor((y1 - y0 - 14) / 15)), alto = (y1 - y0 - 14) / nb;
  for (let b = 0; b < nb; b++) { const ya = Math.round(y0 + 5 + b * alto), yb = Math.round(y0 + 5 + (b + 1) * alto) - 2;
    rect(x0 + 3, ya, x1 - 3, yb, P.caobaD); a_libros(R, x0 + 3, x1 - 3, yb, Math.min(12, yb - ya - 1), k * 10 + b);
    rect(x0 + 2, yb + 1, x1 - 2, yb + 2, P.caoba); rect(x0 + 2, yb + 1, x1 - 2, yb + 1, P.caobaL);
    a_tinte(R, x0 + 3, ya, x1 - 3, ya + 2, C.k, 0.35); }
  rect(x0 + 1, y0 + 4, x0 + 2, y1, P.caoba); rect(x1 - 2, y0 + 4, x1 - 1, y1, P.caobaD);
  rect(x0, y1 - 8, x1, y1, C.k); rect(x0 + 1, y1 - 7, x1 - 1, y1, P.caoba); rect(x0 + 1, y1 - 7, x1 - 1, y1 - 7, P.caobaL);
  for (let x = x0 + 4; x < x1 - 4; x += 10) { rect(x, y1 - 5, x + 7, y1 - 2, P.caobaS); rect(x, y1 - 5, x + 7, y1 - 5, P.caobaD); }
}

// la tarima de roble que fuga hacia vx desde y0: juntas, testas al tresbolillo, vetas y el canto de luz
function a_tarima(R, y0, vx, k = 0, cols) {
  const [c, cS, cL, cD] = cols ?? [a_P.roble, a_P.robleS, a_P.robleL, a_P.robleD], yv = y0 - 70;
  for (let y = y0; y < 180; y++) { const s = (y - yv) / (y0 - yv), d = 600 / (y - yv);
    for (let x = 0; x < 320; x++) { const u = (x - vx) / s / 13 + 50, tb = Math.floor(u), f = u - tb, z = d + h(tb, 3, k) * 4, pz = z - Math.floor(z);
      let col = h(tb, 0, 830 + k) < 0.35 ? cS : c;
      if (Math.sin(u * 9 + d * 1.3 + tb) > 0.93) col = cS; else if (h(x, y, 831 + k) > 0.985) col = cL;
      if (f < 0.08 || pz < 0.08 * (y - yv) / 70) col = cD; else if (f < 0.16) col = cL;
      R.pset(x, y, col); } }
}

// cielo de nubes bajas tramado (de y0 a y1, de c0 arriba a c1 abajo) con tres capas de nubes de tres tonos a tres
// velocidades; evita poner contraste en la zona de Atom (x 278–318, y 4–44)
function a_cieloNublado(R, t, y0, y1, c0, c1, nubes, k = 0) {
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0); for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y, 840 + k) < p ? c1 : c0); }
  const [n0, n1, n2] = nubes;
  for (let capa = 0; capa < 3; capa++) { const v = [1.2, 2.6, 4.5][capa], n = [4, 4, 3][capa];
    for (let i = 0; i < n; i++) { const w = 26 + capa * 10 + Math.round(h(i, capa, 841 + k) * 20), x = Math.round(((h(i, capa, 842 + k) * 420 + t * v) % 420) - 50),
      y = y0 + 8 + capa * 12 + Math.round(h(i, capa, 843 + k) * (y1 - y0 - 40) * 0.6), tranq = x > 250 && y < 50;
      for (let j = -5; j <= 4; j++) for (let ii = -w; ii <= w; ii++) { const e = (ii / w) ** 2 + ((j + 0.5) / 5) ** 2 + Math.sin(ii * 0.35 + i) * 0.08; if (e > 1) continue;
        const xx = x + ii, yy = y + j; if (xx < 0 || xx > 319 || yy < y0 || yy > y1) continue;
        const c = tranq ? (j > 1 ? n1 : n1) : j > 1 ? n0 : j < -2 && ii < w * 0.4 ? n2 : n1;
        if (e < 0.85 || h(xx, yy, 844) < 0.5) R.pset(xx, yy, c); } } }
}

// un pájaro pequeño (grajo o paloma) volando: dos alas que baten
function a_pajaro(R, x, y, t, k, c) {
  const a = Math.sin(t * 9 + k * 2) > 0 ? -1 : 1; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x + 1, y + a, c); R.pset(x - 2, y + a * 2 * (a < 0 ? 1 : 0.5), c); R.pset(x + 2, y + a * 2 * (a < 0 ? 1 : 0.5), c);
}

// una figurita de fondo de alto al (10–14 px): sombrero de copa o cofia, levita o vestido; anda (fase) o habla (gesto)
function a_figurita(R, x, suelo, al, t, o = {}) {
  const P = a_P, c = o.color ?? hex('#2a2a34'), cS = a_mez(c, C.k, 0.4), dir = o.dir ?? 1, { rect, pset } = R; x = Math.round(x);
  const cab = suelo - al, paso = o.anda ? Math.floor(t * 5 + (o.k ?? 0)) % 2 : 0;
  if (o.dama) { rect(x - 2, cab + 4, x + 2, suelo - 1, c); rect(x - 3, suelo - 4, x + 3, suelo - 1, c); rect(x - 2, cab + 4, x - 2, suelo - 2, a_mez(c, C.blanco, 0.2)); pset(x, cab + 4, P.panu); }
  else { rect(x - 2, cab + 4, x + 2, suelo - 4, c); rect(x - 2, cab + 4, x - 2, suelo - 5, a_mez(c, C.blanco, 0.18)); pset(x + 2 * -dir, suelo - 5, c);
    rect(x - 1 - paso, suelo - 3, x - 1 - paso, suelo - 1, cS); rect(x + 1 + paso, suelo - 3, x + 1 + paso, suelo - 1, cS); pset(x, cab + 4, P.panu); }
  rect(x - 1, cab + 1, x + 1, cab + 3, o.piel ?? P.piel); pset(x + dir, cab + 2, P.pielS);
  if (o.dama) { rect(x - 2, cab, x + 2, cab + 1, P.panuS); } else { rect(x - 2, cab, x + 2, cab, C.k); rect(x - 1, cab - 3, x + 1, cab, C.k); }
  if (o.gesto) { const g = Math.sin(t * 3 + (o.k ?? 0)) > 0.3; pset(x + 3 * dir, cab + (g ? 4 : 6), o.piel ?? P.piel); pset(x + 2 * dir, cab + 5, c); }
}

// humo que sube y se deshace (de una pipa o de una chimenea) desde (x, y): o.n volutas, o.al alto, o.c color
function a_humo(R, x, y, t, o = {}) {
  const n = o.n ?? 6, al = o.al ?? 20, c = o.c ?? a_P.nieblaL, deriva = o.deriva ?? 4;
  for (let i = 0; i < n; i++) { const u = ((t * (o.v ?? 0.35) + i / n) % 1), yy = Math.round(y - u * al), xx = Math.round(x + Math.sin(u * 5 + i + t) * 1.5 + u * deriva), r = u < 0.3 ? 0 : 1;
    if (h(i, Math.floor(t * 6), 850) < 1 - u * 0.6) { R.pset(xx, yy, c); if (r) { R.pset(xx + 1, yy, c); if (u > 0.6) R.pset(xx, yy - 1, a_mez(c, C.k, 0.1)); } } }
}

// LA CASA DE LOS GODWIN: la biblioteca (o.cuna, o.bebe, o.visitas)
function a_casa(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P;
  a_fijo(R, 'casa', () => {
    // el techo con la cornisa de dentellones (tranquila: ahí va el año)
    for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y, 860) < 0.25 + y * 0.03 ? P.yesoT : P.yesoTS);
    rect(0, 10, 319, 13, P.cornisa); rect(0, 13, 319, 13, P.cornisaS); for (let x = 0; x < 320; x += 4) rect(x, 11, x + 1, 12, P.cornisaS);
    // el papel pintado de rayas verdes con ramitas doradas, ennegrecido arriba por el hollín de velas y fuego
    for (let y = 14; y < 106; y++) for (let x = 0; x < 244; x++) { const b = x % 12; let c = b < 5 ? P.papelL : b === 5 || b === 11 ? P.papelS : P.papel;
      if (((x + 6 * (Math.floor(y / 10) & 1)) % 12) === 2 && y % 10 === 5) c = P.oroPS; if (((x + 6 * (Math.floor(y / 10) & 1)) % 12) === 2 && (y % 10 === 4 || y % 10 === 6)) c = P.papelS;
      if (h(x >> 1, y >> 1, 861) < (1 - (y - 14) / 50) * 0.55) c = a_mez(c, P.papelD, 0.6); pset(x, y, c); }
    // la pared del mirador (x 244–319): yeso pintado, tranquila bajo Atom
    for (let y = 14; y < 106; y++) for (let x = 244; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 862) < 0.3 + y * 0.004 ? hex('#5e6a5c') : hex('#566254'));
    rect(244, 14, 245, 140, P.papelD);
    // el friso: moldura de la silla, los cuarterones de caoba y el rodapié
    rect(0, 105, 319, 109, C.k); rect(0, 106, 319, 107, P.caobaL); rect(0, 108, 319, 108, P.caobaS);
    for (let y = 110; y < 136; y++) for (let x = 0; x < 320; x++) pset(x, y, Math.sin(x * 0.7 + Math.sin(y * 0.3 + x * 0.02) * 3) > 0.8 ? P.caobaS : P.caoba);
    for (let x = 4; x < 316; x += 26) { rect(x, 113, x + 21, 132, P.caobaS); rect(x + 1, 114, x + 20, 131, P.caoba); rect(x + 1, 114, x + 20, 114, P.caobaD); rect(x + 1, 114, x + 1, 131, P.caobaD); rect(x + 1, 131, x + 20, 131, P.caobaL); rect(x + 20, 115, x + 20, 131, P.caobaL); }
    rect(0, 136, 319, 140, C.k); rect(0, 137, 319, 138, P.caobaS); rect(0, 137, 319, 137, P.caobaL);
    // la tarima y la alfombra turca, con la luz de la ventana sobre el suelo
    a_tarima(R, 141, 160, 0);
    for (let y = 152; y < 177; y++) { const s = (y - 71) / 70, xa = Math.round(160 - 98 * s), xb = Math.round(160 + 92 * s);
      for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), v = (y - 152) / 25, bu = Math.min(u, 1 - u) * 8, bv = Math.min(v, 1 - v) * 4, b = Math.min(bu, bv);
        let c = b < 0.25 ? P.alfS : b < 0.6 ? P.alfO : b < 1 ? P.alfA : P.alfR;
        if (b >= 1) { const m = Math.abs(u - 0.5) * 6 + Math.abs(v - 0.5) * 3; c = m < 0.5 ? P.alfO : m < 0.8 ? P.alfA : m < 1.1 ? P.alfC : ((Math.floor(u * 40) + Math.floor(v * 10)) % 5 === 0 ? P.alfO : P.alfR); }
        if (b < 0.6 && b >= 0.25 && (x + y) % 3 === 0) c = P.alfR; pset(x, y, c); } }
    for (let x = 64; x < 254; x += 2) { pset(x, 177, P.alfC); pset(x + (x % 4 ? 0 : 1), 178, P.alfC); }
    a_luzSuelo(R, 230, 141, 300, 179);
    // ── la librería de la izquierda, hasta el techo, y la escalera apoyada
    a_libreria(R, 0, 56, 24, 140, 1);
    for (const [xa, ya, xb, yb] of [[52, 140, 40, 30], [60, 140, 48, 30]]) { linea(xa, ya, xb, yb, C.k); linea(xa + 1, ya, xb + 1, yb, P.robleL); linea(xa + 2, ya, xb + 2, yb, P.robleS); }
    for (let y = 36; y < 138; y += 10) { const f = (y - 30) / 110, xa = Math.round(40 + 12 * f), xb = Math.round(48 + 12 * f); rect(xa + 2, y, xb, y + 1, P.robleS); rect(xa + 2, y, xb, y, P.robleL); }
    rect(0, 29, 58, 30, P.oroPS); rect(0, 29, 58, 29, P.oroP);   // la barra de latón de la escalera
    // el escritorio de delante de la librería: tablero, cajón con tirador, patas torneadas; papeles, tintero y pluma
    rect(2, 115, 46, 120, C.k); rect(3, 116, 45, 118, P.caobaL); rect(3, 119, 45, 119, P.caobaS); rect(4, 121, 44, 127, P.caoba); rect(4, 121, 44, 121, P.caobaD); disco(24, 124, 1, P.oroP);
    for (const lx of [5, 41]) { rect(lx, 128, lx + 2, 140, C.k); rect(lx + 1, 128, lx + 1, 139, P.caobaL); rect(lx, 133, lx + 2, 134, P.caoba); }
    poligono([[8, 115], [22, 113], [24, 115]], P.papel); rect(9, 113, 21, 115, hex('#e8e0c8')); for (let i = 0; i < 3; i++) rect(10, 113 + i, 18 - i * 2, 113 + i, hex('#9a9080'));
    rect(26, 111, 31, 115, C.k); rect(27, 112, 30, 115, hex('#2a2a3a')); rect(27, 112, 28, 112, hex('#6a6a8a')); linea(29, 111, 34, 102, hex('#e8e4dc')); linea(30, 111, 35, 103, hex('#b8b4ac')); pset(35, 102, C.blanco);
    // ── la pared de la cuna: un grabado enmarcado y el aplique
    rect(66, 46, 90, 66, C.k); rect(67, 47, 89, 65, P.oroPS); rect(68, 48, 88, 64, hex('#d8ceb4')); for (let y = 50; y < 63; y++) for (let x = 70; x < 87; x++) if (h(x, y, 863) < 0.3 + (y - 50) * 0.03) pset(x, y, hex('#8a8068'));
    linea(70, 58, 86, 56, hex('#6a6050')); poligono([[72, 57], [76, 52], [80, 57]], hex('#6a6050'));
    // ── la chimenea de mármol con su repisa
    rect(100, 88, 174, 92, C.k); rect(101, 89, 173, 90, P.marmol); rect(101, 91, 173, 91, P.marmolS);
    rect(104, 92, 170, 138, P.marmolS); rect(105, 93, 169, 138, P.marmol);
    for (let i = 0; i < 9; i++) { let x = 105 + Math.round(h(i, 1, 864) * 64), y = 93 + Math.round(h(i, 2, 864) * 8); for (let s = 0; s < 18; s++) { x += h(i, s, 865) < 0.5 ? 1 : 0; y += 1; if (y > 137 || (x > 115 && x < 159 && y > 100)) break; pset(x, y, P.marmolV); } }
    rect(105, 93, 169, 96, P.marmolV); rect(105, 97, 169, 97, P.marmolS); for (let x = 108; x < 168; x += 6) disco(x, 95, 1, P.marmolS);
    for (const cx of [110, 164]) { rect(cx - 5, 98, cx + 5, 138, P.marmolS); rect(cx - 4, 98, cx + 4, 138, P.marmol); rect(cx - 4, 98, cx - 3, 138, hex('#ece8de')); rect(cx + 3, 98, cx + 4, 138, P.marmolV); disco(cx, 101, 2, P.marmolS); disco(cx, 101, 1, P.marmolV); }
    rect(116, 100, 158, 139, C.k); rect(117, 101, 157, 139, hex('#1a1210'));
    for (let y = 102; y < 139; y++) for (let x = 118; x < 157; x++) if (h(x, y, 866) < 0.2) pset(x, y, hex('#2a1a14'));   // el fondo de hierro con hollín
    for (let y = 104; y < 122; y += 3) for (let x = 120; x < 156; x += 4) pset(x + (y % 2), y, hex('#3a2a22'));
    // el hogar de piedra que sale al suelo, y el guardafuegos de latón
    poligono([[98, 139], [176, 139], [182, 150], [92, 150]], C.k); poligono([[99, 140], [175, 140], [180, 149], [94, 149]], P.marmolS); rect(96, 140, 178, 141, P.marmol);
    for (let x = 100; x < 176; x += 9) linea(x, 141, x - 3 + Math.round((x - 137) * 0.08), 149, P.marmolD);
    rect(112, 136, 162, 137, P.oroPS); rect(112, 136, 162, 136, P.oroP); for (let x = 114; x < 162; x += 4) pset(x, 135, P.oroP);
    // las tenazas y el atizador apoyados
    for (const [x, c] of [[166, P.hierro], [169, P.hierroL]]) { linea(x, 136, x + 2, 112, C.k); linea(x + 1, 136, x + 3, 112, c); } disco(170, 111, 2, P.oroP);
    // el reloj de repisa y los candeleros con su vela
    rect(105, 74, 119, 88, C.k); rect(106, 75, 118, 88, P.caoba); rect(106, 75, 118, 76, P.caobaL); poligono([[105, 75], [112, 69], [119, 75]], C.k); poligono([[107, 74], [112, 70], [117, 74]], P.caobaL);
    disco(112, 80, 4, C.k); disco(112, 80, 3, hex('#f0ead8')); rect(108, 86, 116, 87, P.oroP);
    for (const x of [126, 132, 142, 148]) pset(x, 87, P.marmolD);
    // ── EL RETRATO DE LA MADRE: el marco dorado tallado y el lienzo
    rect(111, 21, 163, 87, C.k); rect(112, 22, 162, 86, P.oroPS); rect(113, 23, 161, 85, P.oroP); rect(113, 23, 161, 23, P.oroPL); rect(113, 23, 113, 85, P.oroPL);
    for (let x = 115; x < 160; x += 3) { pset(x, 24, P.oroPL); pset(x + 1, 84, P.oroPS); } for (let y = 26; y < 84; y += 3) { pset(114, y, P.oroPL); pset(160, y + 1, P.oroPS); }
    for (const [cx, cy] of [[113, 23], [161, 23], [113, 85], [161, 85]]) { disco(cx, cy, 2, P.oroP); pset(cx, cy, P.oroPL); }
    disco(137, 21, 3, P.oroP); pset(137, 19, P.oroPL); rect(116, 26, 158, 82, C.k);
    a_retrato(R, 117, 27, 157, 81);
    // el cordón del que cuelga
    linea(137, 14, 126, 21, P.oroPS); linea(137, 14, 148, 21, P.oroPS); disco(137, 14, 1, P.oroP);
    // los apliques de latón a los lados del retrato
    for (const x of [102, 172]) { rect(x - 1, 54, x + 1, 62, P.oroPS); rect(x - 3, 61, x + 3, 62, P.oroP); disco(x, 56, 2, P.oroP); }
    // ── la puerta doble abierta al salón de atrás (el fondo, la luz cálida de sus velas)
    rect(178, 30, 240, 36, C.k); rect(179, 31, 239, 35, P.caobaL); rect(179, 35, 239, 35, P.caobaS); poligono([[180, 30], [209, 23], [238, 30]], C.k); poligono([[183, 29], [209, 24], [235, 29]], P.caoba);
    rect(182, 36, 236, 140, hex('#2a1e18'));
    a_salonAtras(R);
    for (const [x0, x1] of [[178, 182], [236, 240]]) { rect(x0, 36, x1, 140, C.k); rect(x0 + 1, 36, x1 - 1, 140, P.caobaL); rect(x1 - 1, 36, x1 - 1, 140, P.caobaS); }
    // las hojas de la puerta, plegadas contra el muro, se ven de canto con sus cuarterones
    for (const [x0, d] of [[182, 1], [236, -1]]) { poligono([[x0, 36], [x0 + 7 * d, 40], [x0 + 7 * d, 136], [x0, 140]], C.k); poligono([[x0 + d, 38], [x0 + 6 * d, 41], [x0 + 6 * d, 135], [x0 + d, 138]], P.caoba);
      for (const y of [48, 92]) rect(Math.min(x0 + 2 * d, x0 + 5 * d), y, Math.max(x0 + 2 * d, x0 + 5 * d), y + 32, P.caobaS); disco(x0 + 5 * d, 90, 1, P.oroP); }
    // ── el mirador: la ventana de guillotina con su alféizar y las cortinas
    rect(248, 48, 304, 120, C.k); rect(249, 49, 303, 119, hex('#e8e2d4')); rect(250, 50, 302, 118, C.k);
    rect(246, 118, 306, 123, C.k); rect(247, 119, 305, 121, hex('#d8d0c0')); rect(247, 122, 305, 122, hex('#9a9284'));
    for (let y = 123; y < 140; y++) for (let x = 248; x < 305; x++) pset(x, y, (x - 248) % 14 === 0 ? P.caobaS : P.caoba);
    rect(248, 124, 304, 124, P.caobaL);
    // el taburete del rincón (la niña se sienta en él): asiento y 138, patas al suelo 150
    rect(260, 136, 280, 140, C.k); rect(261, 137, 279, 138, P.robleL); rect(261, 139, 279, 139, P.robleS);
    for (const [x, d] of [[262, -1], [277, 1]]) { linea(x, 140, x + d * 2, 150, C.k); linea(x + 1, 140, x + 1 + d * 2, 150, P.roble); } rect(263, 145, 277, 145, P.robleS);
    // los libros del suelo junto al taburete
    for (let j = 0; j < 4; j++) { const c = [hex('#6a2420'), hex('#2a4a34'), hex('#8a6a3a'), hex('#2a3450')][j]; rect(284 + (j % 2), 147 - j * 3, 298 + (j % 2), 149 - j * 3, C.k); rect(285 + (j % 2), 147 - j * 3, 297 + (j % 2), 148 - j * 3, c); rect(296 + (j % 2), 147 - j * 3, 297 + (j % 2), 148 - j * 3, hex('#e8e0c8')); }
    // la librería estrecha del extremo (desde y 50: la esquina de Atom queda tranquila)
    a_libreria(R, 308, 326, 52, 140, 2);
    // ── el sillón de damasco junto al fuego, con la mesita y la taza
    poligono([[176, 104], [196, 102], [200, 142], [174, 142]], C.k); poligono([[177, 105], [195, 103], [199, 141], [175, 141]], P.damasco);
    for (let y = 106; y < 140; y += 5) for (let x = 178; x < 197; x += 5) pset(x + ((y / 5) & 1) * 2, y, P.damascoL);
    rect(172, 120, 202, 128, C.k); rect(173, 121, 201, 127, P.damascoL); rect(173, 126, 201, 127, P.damascoS); rect(170, 112, 178, 134, C.k); rect(171, 113, 177, 133, P.damascoS); rect(171, 113, 177, 114, P.damascoL);
    rect(176, 134, 198, 142, C.k); rect(177, 135, 197, 141, P.damascoS); for (const x of [176, 196]) { rect(x, 142, x + 2, 147, C.k); rect(x + 1, 142, x + 1, 146, P.caobaL); }
    rect(204, 126, 218, 128, C.k); rect(205, 127, 217, 127, P.caobaL); rect(210, 128, 212, 147, C.k); rect(211, 128, 211, 146, P.caoba); rect(206, 146, 216, 147, C.k);
    rect(207, 122, 211, 126, C.k); rect(208, 123, 210, 125, C.blanco); pset(212, 124, C.blanco); rect(206, 126, 212, 126, hex('#d8d4cc'));
    // la sombra del sillón y la mesita sobre la tarima
    a_tinte(R, 172, 142, 220, 149, C.k, 0.3, true);
  });
  // ── vida: la calle por la ventana (recortada al hueco), el fuego, las velas, las visitas, el gato, el reloj
  a_ventanaLondres(R, t, 251, 51, 301, 117);
  // los cuarterones del bastidor de guillotina, el cristal con reflejo y las cortinas (por delante de la calle)
  for (const y of [72, 94]) rect(251, y, 301, y, hex('#e8e2d4')); rect(251, 83, 301, 85, hex('#e8e2d4')); rect(251, 84, 301, 84, hex('#bab4a6'));
  for (const x of [268, 285]) rect(x, 51, x, 117, hex('#e8e2d4'));
  for (let k = 0; k < 6; k++) pset(256 + k, 62 - k, hex('#d8dce4')); for (let k = 0; k < 5; k++) pset(290 + k, 108 - k, hex('#d8dce4'));
  a_cortinas(R, t, 240, 312, 44, 128);
  // el fuego: llamas que lamen, brasas que laten y el resplandor sobre el hogar
  a_fuego(R, t, 137, 136, 17, 30);
  a_halo(R, 137, 140, 30, P.llama, 0.14 + 0.04 * Math.sin(t * 7));
  // las velas de los apliques y de la repisa, y su luz en el marco y la pared
  for (const [x, y, k] of [[102, 54, 0], [172, 54, 1]]) { rect(x - 1, y - 6, x + 1, y - 1, hex('#f0e8d0')); a_llama(R, x, y - 7, t, k); }
  a_vela(R, 160, 87, 9, t, 2); a_vela(R, 168, 87, 7, t, 3);
  // el reloj de la repisa: las agujas avanzan
  { const a = t * 0.08, b = t * 0.9; linea(112, 80, 112 + Math.round(Math.sin(a) * 2), 80 - Math.round(Math.cos(a) * 2), C.k); linea(112, 80, 112 + Math.round(Math.sin(b) * 3), 80 - Math.round(Math.cos(b) * 3), hex('#5a2a20')); }
  // el salón de atrás: las visitas que charlan junto a su chimenea, con el humo de pipa
  a_salonVida(R, t, o.visitas !== false);
  // el gato que duerme en la piedra del hogar: respira y mueve la punta de la cola
  a_gatoDormido(R, 150, 147, t);
  // motas de polvo en la luz de la ventana
  for (let k = 0; k < 10; k++) { const x = Math.round(246 + h(k, 1, 870) * 50 + Math.sin(t * 0.4 + k) * 3), y = Math.round(124 + ((h(k, 2, 870) * 40 + t * (1 + h(k, 3, 870))) % 40)); if (Math.sin(t * 1.1 + k * 2) > -0.3) pset(x, 180 - (y - 110), hex('#e8e4d8')); }
  // la cuna junto a la chimenea
  if (o.cuna) a_cunaGodwin(R, t, 78, 150, o.bebe !== false);
  return { suelo: 150, libre: [40, 240], taburete: [270, 138], cuna: o.cuna ? [60, 96] : null, chimenea: [104, 170], retrato: [112, 22, 162, 86], puerta: [182, 236], ventana: [250, 50, 302, 118], escritorio: [4, 44, 116], sillon: [172, 200] };
}

// la luz de la ventana que cae en el suelo: un paralelogramo tramado más claro
function a_luzSuelo(R, x0, y0, x1, y1) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * -0.9); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320) R.pset(x, y, a_mez(R.pget(x, y), hex('#d8dce8'), 0.18)); }
}

// el retrato al óleo de la madre (en el lienzo x0–x1, y0–y1): fondo pardo con pinceladas, una mujer de medio cuerpo en
// tres cuartos, pelo castaño recogido con rizos sueltos, pañuelo blanco cruzado al cuello, vestido gris pizarra; la luz
// viene de la izquierda y el barniz brilla arriba
function a_retrato(R, x0, y0, x1, y1) {
  const P = a_P, cx = Math.round((x0 + x1) / 2) - 1, fx = cx, fy = y0 + 21, yh = fy + 12;
  // el fondo pardo con pinceladas, más claro detrás de la cabeza, y un cortinaje rojo oscuro arriba a la derecha
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x - (cx - 8), y - (y0 + 14)) / 30, n = h(Math.floor((x + y * 0.5) / 2), y, 880);
    let c = n < 0.55 - d * 0.5 ? P.fondoOL : n > 0.85 + d * 0.1 ? P.fondoOD : d > 0.9 ? a_mez(P.fondoO, P.fondoOD, 0.5) : P.fondoO;
    if (x - x0 > 26 + (y - y0) * 0.5 && y - y0 < 26) c = ((x + Math.floor(y / 3)) % 4 === 0) ? hex('#3a1414') : n < 0.4 ? hex('#6a2424') : hex('#4e1a1a');
    R.pset(x, y, c); }
  for (let k = 0; k < 30; k++) { const x = x0 + Math.round(h(k, 1, 882) * (x1 - x0)), y = y0 + Math.round(h(k, 2, 882) * (y1 - y0)); if (Math.abs(x - fx) > 13 && y < yh) R.linea(x, y, x + 2, y - 1, h(k, 3, 882) < 0.5 ? P.fondoOL : P.fondoOD); }
  // el cuerpo: hombros caídos y vestido gris pizarra, con luz a la izquierda
  for (let y = yh; y <= y1; y++) { const w = Math.min(19, 7 + (y - yh) * 1.6); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const s = (x - cx) / w;
    R.pset(x, y, s > 0.5 ? P.vestidoS : s < -0.55 ? P.vestidoL : h(x, y, 881) < 0.15 ? P.vestidoS : P.vestido); } }
  // el cuello
  R.rect(fx - 2, fy + 6, fx + 2, yh + 1, P.piel); R.rect(fx + 1, fy + 6, fx + 2, yh + 1, P.pielS); R.rect(fx - 2, fy + 7, fx + 2, fy + 7, P.pielS);
  // el pañuelo blanco cruzado: dos alas que bajan en V hasta el escote, con sus pliegues
  for (let y = yh; y <= yh + 15; y++) { const v = y - yh, ancho = Math.max(0, 11 - v * 0.6), hueco = Math.max(0, 2.5 - v * 0.5);
    for (let x = Math.round(cx - ancho); x <= Math.round(cx + ancho); x++) { if (Math.abs(x - cx) < hueco) continue; const s = (x - cx) / Math.max(1, ancho);
      R.pset(x, y, s > 0.55 ? P.panuS : (x + v * 2) % 6 === 0 ? P.panuS : s < -0.4 && v < 8 ? P.panuL : P.panu); } }
  R.linea(cx - 7, yh + 2, cx, yh + 14, P.panuS); R.linea(cx + 7, yh + 1, cx + 1, yh + 13, P.panuS); R.pset(cx, yh + 15, P.panuS);
  // la masa del pelo castaño, recogido, con volumen a los lados y el moño arriba
  for (let j = -12; j <= 8; j++) for (let i = -11; i <= 11; i++) { const e = (i / 10.5) ** 2 + ((j + 2) / 10) ** 2; if (e > 1) continue; const m = Math.sin(i * 1.1 + j * 0.7) + Math.sin(j * 1.7 - i * 0.4) * 0.5;
    R.pset(fx + i, fy + j - 3, i > 5 ? (m > 0.8 ? P.pelo : P.peloD) : m > 0.9 ? P.peloL : m < -0.6 ? P.peloD : P.pelo); }
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 9) R.pset(fx + 1 + i, fy - 15 + j, i + j < -1 ? P.peloL : i + j > 2 ? P.peloD : P.pelo);
  // los rizos que caen junto a las orejas
  for (const [x, d] of [[-9, -1], [8, 1]]) for (let j = 0; j < 9; j++) { const xx = fx + x + Math.round(Math.sin(j * 1.2) * 1); R.pset(xx, fy + 2 + j, j % 3 === 0 ? P.peloL : P.pelo); R.pset(xx + d, fy + 2 + j, P.peloD); }
  // la cara: óvalo con luz a la izquierda, ojos, cejas, nariz, mejillas y boca
  for (let j = -6; j <= 7; j++) for (let i = -6; i <= 6; i++) { const e = (i / 6.2) ** 2 + (j / (j > 0 ? 7.2 : 7)) ** 2; if (e > 1) continue;
    R.pset(fx + i, fy + j, i > 3 || (i > 1 && j > 4) ? P.pielS : i < -2 && j < 2 ? P.pielL : P.piel); }
  for (let i = -6; i <= 6; i++) { const y = fy - 6 + Math.round(Math.abs(Math.sin(i * 0.9)) * 1.6); R.pset(fx + i, y, P.pelo); R.pset(fx + i, y - 1, i % 2 ? P.peloL : P.pelo); }   // el flequillo rizado
  for (const ex of [-3, 2]) { R.rect(fx + ex - 1, fy - 2, fx + ex + 1, fy - 2, hex('#6a4028')); R.rect(fx + ex, fy - 1, fx + ex, fy, hex('#2a1a12')); R.pset(fx + ex + 1, fy, hex('#5a3a28')); R.pset(fx + ex - 1, fy, P.panu); R.pset(fx + ex + 1, fy - 1, P.pielS); }
  R.pset(fx, fy + 1, P.pielS); R.pset(fx, fy + 2, P.pielS); R.pset(fx + 1, fy + 3, P.pielS); R.pset(fx - 1, fy + 3, P.pielL);
  for (const [i, j] of [[-4, 3], [-3, 4], [3, 3]]) R.pset(fx + i, fy + j, a_mez(P.piel, hex('#d86a6a'), 0.35));
  R.rect(fx - 1, fy + 5, fx + 1, fy + 5, hex('#a85a52')); R.pset(fx, fy + 6, hex('#c88a7a'));
  // el barniz con su brillo y la sombra del marco sobre el lienzo
  for (let k = 0; k < 14; k++) { const x = x0 + 2 + k, y = y0 + 10 - Math.round(k * 0.6); R.pset(x, y, a_mez(R.pget(x, y), C.blanco, 0.25)); }
  a_tinte(R, x0, y0, x1, y0 + 1, C.k, 0.5); a_tinte(R, x0, y0, x0 + 1, y1, C.k, 0.4);
}

// el salón de atrás que se ve por la puerta doble (x 182–236, y 36–140): pared granate con su cuadro, la chimenea
// lejana, una librería, un candelabro y la tarima (fijo)
function a_salonAtras(R) {
  const P = a_P, { rect, pset } = R;
  for (let y = 36; y < 118; y++) for (let x = 182; x < 237; x++) pset(x, y, (x % 6 === 0) ? hex('#4a2a26') : h(x, y >> 1, 890) < 0.15 ? hex('#4a2a26') : hex('#5a3430'));
  rect(182, 116, 236, 118, hex('#3a2018'));
  for (let y = 118; y < 140; y++) for (let x = 182; x < 237; x++) pset(x, y, (Math.round((x - 209) * 110 / (y - 50)) % 8 === 0) ? hex('#3a2416') : y % 5 === 0 ? hex('#5a3a24') : hex('#6a4428'));
  rect(188, 84, 214, 117, hex('#a89e8e')); rect(189, 85, 213, 117, hex('#c8bea8')); rect(194, 94, 208, 117, hex('#1a1210')); rect(186, 82, 216, 84, hex('#d8d0c0'));
  rect(220, 58, 236, 117, hex('#2a1610')); for (let y = 62; y < 116; y += 9) { rect(221, y, 235, y + 7, hex('#3a2418')); for (let x = 222; x < 235; x += 2) rect(x, y + 1 + (x % 3), x, y + 7, [hex('#6a2420'), hex('#2a4a34'), hex('#8a6a3a'), hex('#2a3450')][x % 4]); }
  rect(190, 50, 210, 72, hex('#8a6a2a')); rect(192, 52, 208, 70, hex('#3a4a3a')); rect(192, 62, 208, 70, hex('#4a5a3a')); rect(196, 58, 204, 62, hex('#6a7a8a'));
  a_tinte(R, 182, 36, 236, 140, hex('#20100a'), 0.22);
}

// la vida del salón de atrás: el fuego lejano y su luz, el candelabro y las visitas (si hay) con el humo de pipa
function a_salonVida(R, t, visitas) {
  const P = a_P;
  for (let i = 0; i < 6; i++) { const f = Math.sin(t * 9 + i * 1.7); R.pset(197 + i * 2, 116 - (f > 0 ? 2 : 1), f > 0.4 ? P.llamaL : P.llama); R.pset(197 + i * 2, 117, P.brasa); R.pset(198 + i * 2, 115 - (f > 0.6 ? 2 : 0), P.brasaL); }
  a_halo(R, 201, 112, 12, P.llama, 0.18 + 0.05 * Math.sin(t * 6));
  for (const x of [192, 210]) { R.rect(x, 78, x, 83, hex('#f0e8d0')); a_llama(R, x, 77, t, x); }
  if (!visitas) return;
  // tres caballeros y una dama de visita: hablan con gestos; uno fuma en pipa
  a_figurita(R, 192, 132, 13, t, { color: hex('#22222c'), dir: 1, gesto: true, k: 0 });
  a_figurita(R, 203, 133, 12, t, { color: hex('#3a2a4a'), dama: true, dir: -1, k: 1 });
  a_figurita(R, 216, 132, 13, t, { color: hex('#2a3a2a'), dir: -1, gesto: true, k: 2 });
  a_figurita(R, 228, 131, 12, t, { color: hex('#4a3a2a'), dir: -1, k: 3 });
  R.pset(212, 123, hex('#c8b8a0')); R.pset(211, 123, hex('#6a4a2a'));
  a_humo(R, 211, 121, t, { n: 8, al: 22, c: hex('#9a8a84'), deriva: -5 });
}

// la calle de Londres en la niebla, vista por una ventana (recortada al hueco x0–x1, y0–y1): casas de enfrente con
// ventanas encendidas, un farol, paseantes y un carruaje que pasa, bandas de niebla que corren
function a_ventanaLondres(R, t, x0, y0, x1, y1) {
  const P = a_P, { pset } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const p = (y - y0) / (y1 - y0);
    let c = p < 0.35 ? (h(x >> 1, y, 900) < p * 2 ? P.niebla : P.nieblaL) : P.niebla;
    // la casa de enfrente: ladrillo apagado por la niebla, con sus ventanas
    if (p > 0.2 && p < 0.86) { const fila = Math.floor(y / 3), jx = ((x + (fila & 1) * 3) % 6) === 0;
      c = y % 3 === 0 || jx ? hex('#7e7a7c') : hex('#8a8484'); if (((x - x0) % 16) > 4 && ((x - x0) % 16) < 11 && ((y - y0) % 22) > 4 && ((y - y0) % 22) < 15) c = (x + y) % 7 === 0 ? hex('#5e6068') : hex('#6a6c74'); }
    if (p >= 0.86) c = (x + (y & 1)) % 4 === 0 ? P.nieblaD : hex('#7a7e86');
    pset(x, y, c); }
  // una ventana encendida enfrente que parpadea y otra que se apaga y enciende
  R.rect(x0 + 21, y0 + 27, x0 + 26, y0 + 36, Math.sin(t * 0.5) > -0.6 ? hex('#c8a870') : hex('#6a6c74'));
  R.rect(x0 + 37, y0 + 49, x0 + 42, y0 + 58, hex('#b89a68'));
  // la farola de enfrente y su halo en la niebla
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0 + 38; y <= y1; y++) pset(x0 + 12, y, hex('#4a4a52'));
  R.disco(x0 + 12, y0 + 36, 1, hex('#f0d890')); a_halo(R, x0 + 12, y0 + 36, 6, hex('#f0d890'), 0.35);
  // los paseantes con sombrero y el carruaje que cruza de vez en cuando
  for (let k = 0; k < 2; k++) { const u = ((t * 0.07 + k * 0.5) % 1), x = Math.round(k ? x1 + 4 - u * 60 : x0 - 4 + u * 60); a_figurita(R, x, y1 - 2, 11, t, { color: k ? hex('#4a4a56') : hex('#3a3a46'), dir: k ? -1 : 1, anda: true, k, dama: k === 1 }); }
  { const u = (t % 14) / 14, x = Math.round(x1 + 30 - u * 120); if (x > x0 - 30 && x < x1 + 30) { R.poligono([[x, y1 - 14], [x + 18, y1 - 14], [x + 18, y1 - 4], [x, y1 - 4]], hex('#3a3a44')); R.disco(x + 4, y1 - 3, 3, hex('#2a2a32')); R.disco(x + 15, y1 - 3, 3, hex('#2a2a32'));
    R.poligono([[x - 14, y1 - 12], [x - 2, y1 - 12], [x - 2, y1 - 6], [x - 14, y1 - 6]], hex('#4a4044')); R.linea(x - 12, y1 - 6, x - 13 + (Math.floor(t * 6) % 2) * 2, y1 - 1, hex('#4a4044')); R.linea(x - 4, y1 - 6, x - 3 - (Math.floor(t * 6) % 2) * 2, y1 - 1, hex('#4a4044')); R.rect(x - 16, y1 - 15, x - 13, y1 - 12, hex('#4a4044')); } }
  // las bandas de niebla que corren por delante
  for (let y = y0; y <= y1; y++) { const b = Math.sin(y * 0.18 + t * 0.6) + Math.sin(y * 0.05 - t * 0.3); if (b < 0.6) continue;
    for (let x = x0; x <= x1; x++) if (h(x + Math.floor(t * 8), y, 901) < (b - 0.6) * 0.5) pset(x, y, P.nieblaL); }
  R.recorte(null);
}

// las cortinas pesadas a los dos lados de la ventana (x0 y x1 son los bordes exteriores), con galería arriba y
// alzapaños; se mecen apenas con el aire
function a_cortinas(R, t, x0, x1, y0, y1) {
  const P = a_P;
  for (const [xa, d] of [[x0, 1], [x1, -1]]) for (let y = y0 + 6; y < y1; y++) { const ata = Math.abs(y - 96) < 3, w = ata ? 6 : 12 + Math.round(Math.sin(t * 0.8 + y * 0.07) * 0.8 + (y > 96 ? (y - 96) * 0.15 : 0));
    for (let i = 0; i <= w; i++) { const x = xa + i * d, s = i % 4; R.pset(x, y, i === w ? C.k : s === 1 ? P.cortinaL : s === 3 ? P.cortinaS : P.cortina); }
    if (ata) R.pset(xa + 4 * d, y, P.oroP); }
  R.rect(x0 - 2, y0, x1 + 2, y0 + 6, C.k); R.rect(x0 - 1, y0 + 1, x1 + 1, y0 + 5, P.cortina); R.rect(x0 - 1, y0 + 1, x1 + 1, y0 + 1, P.cortinaL);
  for (let x = x0; x < x1; x += 6) { R.rect(x, y0 + 5, x + 2, y0 + 7, P.cortinaS); R.pset(x + 1, y0 + 8, P.oroP); }
}

// un fuego de chimenea centrado en (cx, base) de semiancho w y alto al: la rejilla de hierro, las brasas que laten y las
// llamas en tres tonos que suben y se parten
function a_fuego(R, t, cx, base, w, al) {
  const P = a_P, { rect, pset } = R;
  for (let i = -w; i <= w; i++) { const f = Math.sin(t * 6 + i * 0.9) + Math.sin(t * 9.7 + i * 0.37) * 0.7, hh = Math.max(2, Math.round(al * (1 - (i / w) ** 2) * (0.55 + 0.18 * f)));
    for (let j = 0; j < hh; j++) { const u = j / hh, x = cx + i + Math.round(Math.sin(t * 7 + j * 0.5 + i) * u * 1.5), y = base - 6 - j;
      if (h(i, j + Math.floor(t * 12), 905) < 0.15 + u * 0.5 && u > 0.5) continue; pset(x, y, u < 0.25 ? P.llamaL : u < 0.6 ? P.llama : u < 0.85 ? P.brasaL : P.brasa); } }
  for (let i = -w; i <= w; i++) for (let j = 0; j < 4; j++) { const v = Math.sin(t * 3 + i * 1.3 + j) * 0.5 + h(i, j, 906); pset(cx + i, base - 2 - j, v > 0.9 ? P.llamaL : v > 0.5 ? P.brasaL : v > 0.1 ? P.brasa : P.brasaD); }
  rect(cx - w - 2, base - 1, cx + w + 2, base, C.k); for (let i = -w; i <= w; i += 3) rect(cx + i, base - 7, cx + i, base - 1, P.hierro); rect(cx - w - 2, base - 8, cx + w + 2, base - 8, P.hierroL);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.9 + k / 3) % 1); if (u < 0.8) pset(cx + Math.round(Math.sin(t * 4 + k * 2) * w * 0.5), base - 8 - Math.round(u * al * 1.1), P.llamaL); }   // las chispas
}

// un gato atigrado que duerme hecho un ovillo (x, suelo): respira, mueve la punta de la cola y alguna oreja
function a_gatoDormido(R, x, suelo, t) {
  const r = Math.sin(t * 2.2) > 0 ? 1 : 0, c = hex('#8a6a4a'), cS = hex('#5e4630'), cL = hex('#b08a62');
  R.disco(x, suelo - 4, 6, C.k); for (let j = -5 - r; j <= 0; j++) for (let i = -6; i <= 6; i++) if ((i / 6.5) ** 2 + (j / (5.5 + r)) ** 2 < 1) R.pset(x + i, suelo - 1 + j, (i + 6) % 3 === 0 ? cS : j < -3 ? cL : c);
  R.disco(x - 6, suelo - 3, 3, C.k); R.disco(x - 6, suelo - 3, 2, c); R.pset(x - 8, suelo - 6, c); R.pset(x - 5, suelo - 6 - (Math.sin(t * 0.7) > 0.95 ? 1 : 0), c); R.pset(x - 7, suelo - 3, cS);
  const cola = Math.round(Math.sin(t * 1.3) * 1.5); R.linea(x + 5, suelo - 1, x + 9, suelo - 1, c); R.pset(x + 10, suelo - 2 + cola, cS); R.pset(x + 9, suelo - 2, c);
}

// la cuna de los Godwin (centro x, suelo): madera con capota, sobre balancines; se mece despacio; bebe: el hatillo de
// lino blanco con su puntilla (sin cara)
function a_cunaGodwin(R, t, x, suelo, bebe) {
  const P = a_P, m = Math.sin(t * 1.4) * 1.2, { rect, linea, poligono, disco } = R, X = (i) => Math.round(x + i), Y = (i, j) => Math.round(suelo + j + i * m * 0.05);
  // los balancines
  for (let i = -17; i <= 17; i++) { const y = Math.round(suelo - 1 - (i / 17) ** 2 * 3 + i * m * 0.04); R.pset(X(i), y, C.k); R.pset(X(i), y - 1, P.robleS); }
  poligono([[X(-15), Y(-15, -6)], [X(15), Y(15, -6)], [X(16), Y(16, -20)], [X(-16), Y(-16, -20)]], C.k);
  poligono([[X(-14), Y(-14, -7)], [X(14), Y(14, -7)], [X(15), Y(15, -19)], [X(-15), Y(-15, -19)]], P.roble);
  for (let i = -12; i <= 12; i += 4) linea(X(i), Y(i, -8), X(i), Y(i, -18), P.robleS);
  linea(X(-15), Y(-15, -19), X(15), Y(15, -19), P.robleL);
  // la capota (a la izquierda) con su tela
  poligono([[X(-17), Y(-17, -18)], [X(-17), Y(-17, -34)], [X(-4), Y(-4, -30)], [X(-2), Y(-2, -18)]], C.k);
  poligono([[X(-16), Y(-16, -19)], [X(-16), Y(-16, -32)], [X(-5), Y(-5, -29)], [X(-3), Y(-3, -19)]], hex('#e8e0cc'));
  for (let i = -15; i < -4; i += 3) linea(X(i), Y(i, -31 + (i + 15) * 0.2), X(i), Y(i, -20), hex('#c8bea6'));
  linea(X(-16), Y(-16, -32), X(-5), Y(-5, -29), P.robleL);
  if (bebe) { disco(X(-1), Y(-1, -21), 4, C.k); disco(X(-1), Y(-1, -21), 3, hex('#f4f0e6')); rect(X(-4), Y(-4, -22), X(10), Y(10, -19), hex('#f4f0e6')); for (let i = -3; i < 10; i += 2) R.pset(X(i), Y(i, -22), hex('#d8d0c0')); }
  rect(X(-2), Y(-2, -21), X(13), Y(13, -19), hex('#e0d8c4')); rect(X(-2), Y(-2, -21), X(13), Y(13, -21), hex('#f8f4ea'));
}

// UN CUARTO POBRE DE ALQUILER (1815) (o.cunaVacia, o.noche)
function a_cuarto(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P, noche = !!o.noche;
  a_fijo(R, 'cuarto', () => {
    // el techo con la viga y el yeso agrietado (tranquilo arriba: el año)
    for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y, 910) < 0.3 ? hex('#8a8270') : hex('#7a7262'));
    rect(0, 8, 319, 13, C.k); for (let y = 9; y < 13; y++) for (let x = 0; x < 320; x++) pset(x, y, Math.sin(x * 0.5 + y * 2) > 0.85 ? hex('#3a2a1e') : y === 9 ? hex('#6a5038') : hex('#4e3a28'));
    // la pared de yeso desconchado: manchas de humedad abajo, grietas, desconchones con ladrillo y listones a la vista
    for (let y = 14; y < 136; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 2, 911) * 0.6 + h(x >> 1, y >> 1, 922) * 0.4, hum = Math.max(0, (y - 90) / 46) * (0.5 + 0.5 * Math.sin(x * 0.06 + Math.sin(x * 0.15) * 2));
      let c = n < 0.3 ? P.yesoVS : n > 0.75 ? P.yesoVL : P.yesoV; if (h(x >> 2, y >> 2, 912) < hum * 0.8) c = a_mez(c, P.humedad, 0.5); if (y < 30 && h(x >> 1, y, 913) < (30 - y) / 40) c = a_mez(c, hex('#5a5448'), 0.35); pset(x, y, c); }
    // el hollín sobre la chimenea
    for (let y = 30; y < 104; y++) for (let x = 120; x < 168; x++) if (h(x >> 1, y >> 1, 914) < (1 - (y - 30) / 74) * 0.5 * (1 - Math.abs(x - 143) / 26)) pset(x, y, a_mez(R.pget(x, y), hex('#3a3430'), 0.45));
    for (const [cx, cy, rx, ry, lis] of [[40, 40, 14, 8, false], [214, 70, 10, 13, true], [94, 114, 9, 6, false], [300, 120, 8, 6, false]]) {
      for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2 + h(cx + i, cy + j, 915) * 0.35; if (e > 1) continue; const x = cx + i, y = cy + j;
        if (e > 0.8) pset(x, y, P.yesoVS); else if (lis) pset(x, y, y % 4 === 0 ? hex('#3a2a1e') : (x + y) % 9 === 0 ? hex('#4e3a28') : P.listón); else { const f = Math.floor(y / 3), jx = ((x + (f & 1) * 4) % 8) === 0; pset(x, y, y % 3 === 0 || jx ? hex('#8a7a62') : h(x >> 2, f, 916) < 0.3 ? C.ladrilloS : C.ladrillo); } } }
    for (const [x, y, n, k] of [[70, 16, 26, 1], [180, 20, 18, 2], [262, 112, 20, 3], [10, 90, 22, 4]]) { let xx = x, yy = y; for (let s = 0; s < n; s++) { pset(xx, yy, hex('#7a7060')); yy++; xx += h(s, k, 917) < 0.35 ? -1 : h(s, k, 917) > 0.7 ? 1 : 0; } }
    rect(0, 134, 319, 140, C.k); rect(0, 135, 319, 139, hex('#5a4a38')); rect(0, 135, 319, 135, hex('#7a6650'));   // el rodapié
    rect(293, 134, 299, 139, C.k); disco(296, 135, 3, C.k);   // el agujero del ratón
    // el suelo de tablas gastadas con rendijas y una alfombrita de trapo
    a_tarima(R, 141, 170, 3, [hex('#6a5038'), hex('#56402c'), hex('#7e6248'), hex('#2e2218')]);
    for (let y = 154; y < 175; y++) { const s = (y - 71) / 70, xa = Math.round(150 - 55 * s), xb = Math.round(150 + 50 * s); for (let x = xa; x <= xb; x++) pset(x, y, [hex('#7a5a4a'), hex('#5a6a7a'), hex('#8a7a5a'), hex('#6a4a4a')][Math.floor((y - 154) / 3 + (x >> 4)) % 4]); }
    // la ventana de cuarterones con el marco pelado, y el alféizar
    rect(248, 44, 308, 112, C.k); rect(249, 45, 307, 111, hex('#8a7a62')); rect(250, 46, 306, 110, hex('#a89a80')); rect(252, 48, 304, 108, C.k);
    rect(246, 110, 310, 114, C.k); rect(247, 111, 309, 112, hex('#9a8c72')); rect(247, 113, 309, 113, hex('#6a5e4a'));
    a_luzSuelo(R, 226, 141, 290, 179);
    // la cama estrecha: cabecero de hierro, colchón, manta remendada y la almohada
    for (const x of [4, 76]) { rect(x - 1, 100, x + 1, 148, C.k); rect(x, 100, x, 147, P.hierroL); disco(x, 99, 2, P.hierroL); }
    for (const y of [104, 112]) { rect(4, y, 18, y, P.hierro); } for (let x = 7; x < 18; x += 3) rect(x, 104, x, 120, P.hierro);
    rect(4, 120, 76, 126, C.k); rect(5, 121, 75, 125, hex('#c8bca0')); rect(18, 118, 76, 132, C.k); rect(19, 119, 75, 131, hex('#6a6a5a'));
    for (let y = 119; y < 132; y++) for (let x = 19; x < 76; x++) if ((x - 19) % 10 === 0 || (y - 119) % 6 === 0) pset(x, y, hex('#56564a'));
    rect(40, 120, 52, 126, hex('#7a5a4a')); rect(40, 120, 52, 120, hex('#9a7a5a')); rect(58, 124, 66, 130, hex('#5a6a7a'));   // los remiendos
    rect(6, 114, 18, 120, C.k); rect(7, 115, 17, 119, hex('#e0d8c4')); rect(7, 115, 17, 115, C.blanco);
    rect(18, 132, 76, 140, C.k); rect(19, 132, 75, 139, hex('#56564a')); for (const x of [6, 74]) rect(x, 126, x + 1, 150, C.k);
    // la chimenea pequeña de ladrillo con su repisa
    rect(118, 100, 168, 104, C.k); rect(119, 101, 167, 102, hex('#8a7a62')); rect(119, 103, 167, 103, hex('#5a4e3e'));
    for (let y = 104; y < 141; y++) for (let x = 120; x < 167; x++) { const f = Math.floor(y / 3), jx = ((x + (f & 1) * 4) % 8) === 0; pset(x, y, y % 3 === 0 || jx ? hex('#5a4a3a') : h(x >> 3, f, 918) < 0.3 ? C.ladrilloS : C.ladrillo); }
    rect(130, 112, 156, 141, C.k); rect(131, 113, 155, 141, hex('#1a1410')); for (let y = 114; y < 132; y += 4) for (let x = 132; x < 155; x += 5) pset(x + (y % 3), y, hex('#2a201a'));
    rect(126, 140, 162, 146, C.k); rect(127, 141, 161, 145, hex('#6a6258')); rect(127, 141, 161, 141, hex('#8a8274'));
    // sobre la repisa: una palmatoria apagada, un jarrito con una flor seca y una taza
    rect(124, 94, 130, 100, C.k); rect(125, 95, 129, 100, hex('#7a8a9a')); linea(127, 94, 125, 86, hex('#6a5a3a')); pset(125, 85, hex('#a87a5a')); pset(124, 86, hex('#a87a5a'));
    rect(158, 96, 163, 100, C.k); rect(159, 97, 162, 100, hex('#e0d8c8')); pset(164, 98, hex('#e0d8c8'));
    // un espejito rajado con marco de madera y una cofia colgada de su clavija
    rect(58, 48, 72, 66, C.k); rect(59, 49, 71, 65, hex('#6a4a2e')); rect(61, 51, 69, 63, hex('#8a98a4')); rect(61, 51, 63, 63, hex('#a8b4bc')); linea(62, 63, 68, 52, hex('#5a6670')); pset(64, 52, C.blanco); pset(65, 47, C.k); linea(65, 47, 60, 48, C.k); linea(65, 47, 70, 48, C.k);
    pset(112, 66, C.k); R.disco(112, 72, 5, C.k); R.disco(112, 72, 4, hex('#e8e0cc')); rect(108, 74, 116, 77, hex('#e8e0cc')); rect(107, 77, 117, 77, C.k); linea(110, 77, 108, 86, hex('#c8bea6')); linea(114, 77, 116, 86, hex('#c8bea6')); pset(111, 70, hex('#c8bea6'));
    // el chal colgado de un clavo y la repisa con la jarra y dos libros
    pset(96, 60, C.k); poligono([[90, 61], [102, 61], [106, 92], [96, 84], [86, 92]], C.k); poligono([[91, 62], [101, 62], [104, 89], [96, 82], [88, 89]], hex('#6a4a5a'));
    for (let y = 66; y < 88; y += 4) linea(90, y, 102, y + 1, hex('#5a3a4a')); for (let x = 88; x < 106; x += 3) pset(x, 90 + (x % 2), hex('#8a6a7a'));
    rect(10, 72, 60, 74, C.k); rect(11, 72, 59, 73, P.roble); for (const x of [14, 56]) linea(x, 74, x - 3, 80, P.robleS);
    rect(14, 62, 22, 72, C.k); rect(15, 63, 21, 72, hex('#b8a888')); rect(15, 63, 21, 64, hex('#d8c8a8')); pset(22, 65, C.k); pset(23, 66, C.k);
    rect(30, 64, 33, 72, C.k); rect(31, 65, 32, 72, hex('#4a2a1e')); rect(34, 66, 37, 72, C.k); rect(35, 67, 36, 72, hex('#2a3a4a'));
    // la mesita junto al fuego: tablero, cajón y patas; y la silla de anea
    rect(172, 126, 238, 131, C.k); rect(173, 127, 237, 129, hex('#7a5a3a')); rect(173, 130, 237, 130, hex('#4a3420')); rect(176, 131, 234, 135, hex('#5a4028')); disco(205, 133, 1, P.oroPS);
    for (const x of [176, 232]) { rect(x, 131, x + 2, 148, C.k); rect(x + 1, 131, x + 1, 147, hex('#7a5a3a')); }
    for (const x of [242, 254]) { rect(x, 112, x + 1, 150, C.k); } rect(242, 132, 256, 135, C.k); rect(243, 133, 255, 134, hex('#b89a5a')); for (let x = 243; x < 256; x += 2) pset(x, 133, hex('#8a7040'));
    for (const y of [116, 122]) rect(242, y, 255, y + 1, hex('#5a4028')); rect(244, 142, 252, 142, hex('#5a4028'));
    a_tinte(R, 170, 141, 240, 149, C.k, 0.3, true);
  });
  // ── vida: la ventana con la niebla y los tejados (recortada), la cortina, las brasas, la vela, el ratón
  a_ventanaTejados(R, t, 252, 48, 304, 108, noche);
  for (const x of [269, 287]) rect(x, 48, x, 108, hex('#8a7a62')); for (const y of [68, 88]) rect(252, y, 304, y, hex('#8a7a62'));
  rect(288, 89, 303, 107, hex('#e0d4b4')); linea(288, 89, 303, 107, hex('#c8bca0')); for (let y = 92; y < 106; y += 3) rect(290, y, 300 - (y % 4), y, hex('#c8bca0'));   // el cristal roto, remendado con papel
  // la cortina rala en su cuerda, que se mueve con la corriente
  linea(246, 46, 310, 46, hex('#5a4a38'));
  for (let y = 47; y < 104; y++) { const w = 9 + Math.round(Math.sin(t * 1.1 + y * 0.12) * 1.5 + (y - 47) * 0.05); for (let i = 0; i <= w; i++) { const x = 250 + i + Math.round(Math.sin(t * 1.3 + y * 0.08) * (y - 47) * 0.03); if ((x + y) % 2 || i === w) pset(x, y, i === w ? hex('#8a7e68') : hex('#c8bca0')); } }
  // las brasas que laten bajo el hervidor de hierro
  for (let i = -10; i <= 10; i++) for (let j = 0; j < 3; j++) { const v = Math.sin(t * 2.4 + i * 1.1 + j) * 0.5 + h(i, j, 919); pset(143 + i, 139 - j, v > 0.95 ? P.llama : v > 0.6 ? P.brasaL : v > 0.2 ? P.brasa : P.brasaD); }
  for (let i = -5; i <= 5; i++) { const f = Math.sin(t * 8 + i); if (f > 0.3) pset(143 + i * 2, 136, P.llama); }
  rect(136, 124, 150, 133, C.k); rect(137, 125, 149, 133, P.hierro); rect(137, 125, 149, 126, P.hierroL); linea(149, 128, 154, 124, P.hierro); rect(141, 121, 145, 124, C.k);
  a_humo(R, 154, 123, t, { n: 6, al: 14, c: hex('#d8d4cc'), deriva: 3, v: 0.5 });   // el vapor del hervidor
  a_halo(R, 143, 136, 18, P.brasaL, 0.12 + 0.04 * Math.sin(t * 2.4));
  // la vela de la mesita (se consume despacio) y su charco de luz; el diario abierto con su pluma
  const alto = Math.max(3, 10 - Math.floor(t / 30)); a_vela(R, 228, 126, alto, t, 5); a_halo(R, 228, 120 - alto, noche ? 34 : 18, P.llama, noche ? 0.22 : 0.12);
  rect(181, 121, 213, 127, C.k); rect(182, 122, 196, 126, hex('#ece2c8')); rect(198, 122, 212, 126, hex('#e4dac0')); rect(197, 121, 197, 127, hex('#8a7a5a'));
  for (let l = 0; l < 3; l++) { rect(184, 123 + l, 194 - (l === 2 ? 4 : 0), 123 + l, hex('#7a6a5a')); if (l < 2) rect(200, 123 + l, 210 - l * 3, 123 + l, hex('#7a6a5a')); }
  rect(216, 123, 220, 126, C.k); rect(217, 124, 219, 126, hex('#2a2a3a')); linea(219, 123, 224, 114, hex('#e8e4dc')); linea(220, 123, 225, 115, hex('#b8b4ac'));
  // la cuna pequeña (vacía, con la mantita doblada; o con el hatillo)
  a_cunaPobre(R, t, 99, 150, !!o.cunaVacia);
  // el ratón que asoma por su agujero de vez en cuando y vuelve a esconderse
  { const u = (t % 9) / 9, s = u < 0.3 ? 0 : u < 0.4 ? (u - 0.3) * 10 : u < 0.7 ? 1 : u < 0.8 ? 1 - (u - 0.7) * 10 : 0, mx = Math.round(296 - s * 9);
    if (s > 0) { R.recorte([0, 0, 319, 179]); rect(mx - 1, 136, mx + 3, 139, hex('#6a6470')); pset(mx - 2, 137, hex('#6a6470')); pset(mx - 1, 135, hex('#c8a0a8')); pset(mx, 137, C.k); pset(mx - 3, 138, hex('#c8a0a8')); R.recorte(null); } }
  // de noche: todo se hunde en azul salvo los charcos de luz de la vela y de las brasas (suave, sin bordes)
  if (noche) { const B = R.buf, az = hex('#141828'); for (let y = 14; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.min(Math.hypot(x - 228, (y - 116) * 1.2) / 110, Math.hypot(x - 143, (y - 134) * 1.3) / 80), a = Math.min(0.66, Math.max(0, d - 0.12) * 0.85); if (a > 0.01) B[y * 320 + x] = a_mez(B[y * 320 + x], az, a + (((x + y) & 1) ? 0.02 : 0)); } }
  return { suelo: 150, libre: [40, 260], cuna: [84, 114], mesa: [174, 236, 128], diario: [182, 121, 212, 127], vela: [228, 126], chimenea: [120, 166], cama: [4, 78], ventana: [252, 48, 304, 108], silla: [240, 256] };
}

// la ventana del cuarto pobre (x0–x1, y0–y1, recortada): la niebla y los tejados de enfrente con sus chimeneas que
// humean, un gato en un tejado, la niebla que corre; de noche, azul oscura con alguna ventana encendida
function a_ventanaTejados(R, t, x0, y0, x1, y1, noche) {
  const P = a_P, { pset } = R, c0 = noche ? hex('#1e2234') : P.nieblaL, c1 = noche ? hex('#2a2e44') : P.niebla, tej = noche ? hex('#14161e') : hex('#7a7a80'), tejS = noche ? hex('#0e1016') : hex('#6a6a70');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const p = (y - y0) / (y1 - y0), r1 = y0 + 26 + Math.round(Math.abs(((x - x0) % 30) - 15) * 0.5), r2 = y0 + 40 + Math.round(Math.abs(((x - x0 + 11) % 22) - 11) * 0.7);
    pset(x, y, y > r2 ? ((x + y) % 4 === 0 ? tejS : a_mez(tej, C.k, 0.15)) : y > r1 ? (y % 3 === 0 ? tejS : tej) : h(x >> 1, y, 920) < p ? c1 : c0); }
  R.recorte([x0, y0, x1, y1]);
  for (const [cx, k] of [[x0 + 8, 0], [x0 + 34, 1], [x0 + 48, 2]]) { const cy = y0 + 24; R.poligono([[cx - 3, cy - 6], [cx + 3, cy - 6], [cx + 3, cy + 4], [cx - 3, cy + 4]], noche ? hex('#1a1c26') : hex('#6a5e5a'));
    for (const d of [-2, 1]) { R.linea(cx + d, cy - 9, cx + d, cy - 6, noche ? hex('#1a1c26') : hex('#7a5e4a')); R.linea(cx + d + 1, cy - 9, cx + d + 1, cy - 6, noche ? hex('#1a1c26') : hex('#8a6a54')); }
    a_humo(R, cx - 1, cy - 10, t + k * 2, { n: 7, al: 20, c: noche ? hex('#3a3e52') : hex('#d8dade'), deriva: 6, v: 0.25 }); }
  if (noche) for (const [x, y, k] of [[x0 + 14, y0 + 46, 0], [x0 + 40, y0 + 50, 1]]) if (Math.sin(t * 0.3 + k * 3) > -0.5) R.disco(x, y, 1, hex('#c8a060'));
  { const gx = x0 + 22 + Math.round(Math.sin(t * 0.2) * 3), gy = y0 + 28; R.disco(gx, gy, 2, noche ? hex('#0a0a10') : hex('#3a3a40')); R.pset(gx - 1, gy - 3, noche ? hex('#0a0a10') : hex('#3a3a40')); R.pset(gx + 1, gy - 3, noche ? hex('#0a0a10') : hex('#3a3a40')); R.linea(gx + 2, gy + 1, gx + 4, gy - 1 + Math.round(Math.sin(t * 2)), noche ? hex('#0a0a10') : hex('#3a3a40')); }
  for (let y = y0; y <= y1; y++) { const b = Math.sin(y * 0.2 + t * 0.5) + Math.sin(y * 0.07 - t * 0.25); if (b < 0.7) continue; for (let x = x0; x <= x1; x++) if (h(x + Math.floor(t * 6), y, 921) < (b - 0.7) * 0.45) pset(x, y, noche ? hex('#3a4056') : C.blanco); }
  R.recorte(null);
}

// la cuna pequeña del cuarto pobre (centro x, suelo): de mimbre sobre patas cortas; vacia: la mantita doblada encima,
// con su ribete, nada más; si no, un hatillo pequeño de lino bajo la manta que se mece apenas
function a_cunaPobre(R, t, x, suelo, vacia) {
  const { rect, pset, poligono } = R, mim = hex('#a8885a'), mimS = hex('#7a603a'), mimL = hex('#c8a874');
  poligono([[x - 15, suelo - 22], [x + 15, suelo - 22], [x + 13, suelo - 6], [x - 13, suelo - 6]], C.k);
  for (let y = suelo - 21; y < suelo - 6; y++) for (let i = -14; i <= 14; i++) { const w = 14 - (y - suelo + 21) * 0.12; if (Math.abs(i) > w) continue; pset(x + i, y, ((i + (y & 1) * 2) % 4 === 0) ? mimS : (y % 3 === 0 ? mimL : mim)); }
  rect(x - 16, suelo - 23, x + 16, suelo - 21, C.k); rect(x - 15, suelo - 22, x + 15, suelo - 22, mimL);
  for (const d of [-11, 11]) { rect(x + d - 1, suelo - 6, x + d + 1, suelo, C.k); rect(x + d, suelo - 6, x + d, suelo - 1, mimS); }
  if (vacia) {
    // la mantita doblada, cuadrada y limpia, con su ribete azul claro
    rect(x - 6, suelo - 26, x + 6, suelo - 22, C.k); rect(x - 5, suelo - 25, x + 5, suelo - 23, hex('#e8dcc4')); rect(x - 5, suelo - 25, x + 5, suelo - 25, hex('#f8f0dc'));
    rect(x - 5, suelo - 23, x + 5, suelo - 23, hex('#9ab8d0')); pset(x + 5, suelo - 24, hex('#9ab8d0'));
  } else {
    const r = Math.sin(t * 1.6) > 0 ? 0 : 1; R.disco(x - 7, suelo - 23 + r, 3, C.k); R.disco(x - 7, suelo - 23 + r, 2, hex('#f4f0e6'));
    rect(x - 5, suelo - 25, x + 10, suelo - 22, C.k); rect(x - 4, suelo - 24, x + 9, suelo - 23, hex('#d8c8b0')); rect(x - 4, suelo - 24, x + 9, suelo - 24, hex('#9ab8d0'));
  }
}

// EL CEMENTERIO DE ST PANCRAS
function a_cementerio(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P;
  // el cielo encapotado con sus nubes de tres tonos a tres velocidades (lo fijo se pinta encima)
  a_cieloNublado(R, t, 0, 112, P.gris1, P.gris2, [P.nube0, P.nube1, P.nube2], 0);
  a_fijoSobre(R, 'cementerio', () => {
    // los tejados y chimeneas de Londres en la bruma, al fondo
    for (let x = 0; x < 320; x++) { const y = 88 + Math.round(Math.abs(((x * 7) % 46) - 23) * 0.25 + h(x >> 3, 1, 930) * 4); for (let yy = y; yy < 112; yy++) pset(x, yy, (yy + x) % 5 === 0 ? hex('#8a8e98') : hex('#9298a2')); }
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 931) * 300) + 5, y = 84 + Math.round(h(k, 2, 931) * 6); if (x > 270) continue; rect(x, y, x + 3, 92, hex('#868a94')); rect(x, y - 2, x, y, hex('#868a94')); rect(x + 2, y - 2, x + 2, y, hex('#868a94')); }
    // la iglesia vieja: nave de mampostería con su tejado, ventanas de arco y la puerta; la torrecita con cupulilla
    for (let y = 84; y < 116; y++) for (let x = 84; x < 151; x++) pset(x, y, ((x + (Math.floor(y / 3) & 1) * 2) % 5 === 0 || y % 3 === 0) ? hex('#6e6a60') : h(x >> 1, y >> 1, 932) < 0.3 ? hex('#7e786c') : hex('#8e887a'));
    poligono([[82, 85], [117, 70], [152, 85]], C.k); poligono([[84, 84], [117, 71], [150, 84]], hex('#5a5a62')); for (let y = 74; y < 85; y += 2) linea(117 - (y - 70) * 2.2, y, 117 + (y - 70) * 2.2, y, hex('#4a4a52'));
    for (const x of [96, 112, 128, 140]) { rect(x, 92, x + 5, 104, C.k); rect(x + 1, 93, x + 4, 104, hex('#3a3e4a')); pset(x + 1, 93, hex('#8a8e9a')); rect(x, 91, x + 5, 91, hex('#a8a294')); }
    a_tinte(R, 84, 84, 150, 115, hex('#a0a6b0'), 0.25);
    for (let y = 44; y < 116; y++) for (let x = 62; x < 84; x++) pset(x, y, ((x + (Math.floor(y / 3) & 1) * 2) % 5 === 0 || y % 3 === 0) ? hex('#6a665c') : h(x >> 1, y >> 1, 933) < 0.3 ? hex('#7a7468') : hex('#8a8476'));
    rect(62, 44, 83, 46, hex('#a8a294')); rect(65, 56, 69, 68, C.k); rect(66, 57, 68, 68, hex('#3a3e4a')); rect(76, 56, 80, 68, C.k); rect(77, 57, 79, 68, hex('#3a3e4a')); rect(68, 98, 77, 115, C.k); rect(69, 99, 76, 115, hex('#4a3426')); rect(69, 98, 76, 98, hex('#a8a294'));
    rect(66, 34, 79, 44, C.k); rect(67, 35, 78, 44, hex('#9a9486')); for (const x of [68, 72, 76]) rect(x, 37, x + 1, 42, hex('#3a3e4a'));
    for (let j = 0; j < 7; j++) rect(72 - (7 - j), 27 + j, 73 + (7 - j) - 1, 27 + j, j % 2 ? hex('#5a6a62') : hex('#6a7a72')); rect(72, 19, 72, 27, C.k);
    a_tinte(R, 62, 30, 84, 115, hex('#a0a6b0'), 0.2);
    // el muro de ladrillo del fondo con su albardilla
    for (let y = 104; y < 118; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 3), jx = ((x + (f & 1) * 4) % 8) === 0; pset(x, y, y % 3 === 0 || jx ? hex('#6a5a4e') : h(x >> 3, f, 934) < 0.25 ? hex('#6e4a3e') : hex('#7e5a4a')); }
    rect(0, 102, 319, 105, C.k); rect(0, 103, 319, 104, P.piedraL); rect(0, 105, 319, 105, P.piedraS); for (let x = 0; x < 320; x += 23) rect(x, 103, x, 104, P.piedraS);
    rect(88, 100, 112, 118, C.k); rect(89, 103, 111, 118, hex('#3a3a3a')); for (let x = 91; x < 111; x += 3) rect(x, 101, x, 117, P.hierro);   // la cancela de la iglesia
    // el césped del cementerio: tres tonos con matas, y el camino de grava que sube a la cancela
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 935), m = h(x >> 3, y >> 2, 936); pset(x, y, n < 0.12 ? P.hierbaD : n > 0.88 ? P.hierbaL : m < 0.4 ? P.hierbaS : P.hierba); }
    for (let y = 118; y < 180; y++) { const p = (y - 118) / 62, cx = Math.round(100 + Math.sin(p * 2.6) * 12 - p * 6 + p * p * 8), w = Math.round(6 + p * 24);
      for (let x = cx - w; x <= cx + w; x++) { const n = h(x, y, 937); pset(x, y, Math.abs(x - cx) > w - 1 ? P.gravaS : n < 0.2 ? P.gravaS : n > 0.9 ? hex('#b8b0a0') : P.grava); } }
    // las lápidas de las tres filas (de atrás adelante): inclinadas, con musgo y liquen
    for (const [x, y, w, al, tipo, inc] of [[18, 124, 6, 8, 0, 1], [40, 122, 5, 9, 1, -1], [58, 125, 6, 7, 2, 0], [134, 121, 5, 8, 0, 1], [196, 122, 6, 9, 1, 0], [216, 124, 5, 8, 2, -1], [252, 121, 6, 9, 0, 1], [272, 124, 5, 7, 1, 0], [300, 122, 6, 8, 2, 1],
      [10, 138, 9, 14, 0, -1], [52, 140, 8, 13, 3, 1], [196, 132, 9, 14, 1, 1], [262, 138, 8, 12, 0, -1], [300, 136, 9, 15, 2, 0], [230, 136, 6, 13, 3, 0]]) a_lapidita(R, x, y, w, al, tipo, inc);
    // una tumba de cajón
    rect(234, 140, 262, 152, C.k); rect(235, 141, 261, 152, P.piedra); rect(233, 138, 263, 141, C.k); rect(234, 139, 262, 140, P.piedraL); for (let x = 236; x < 261; x += 3) pset(x, 149 - (x % 2), P.musgo); rect(244, 144, 252, 148, P.piedraS);
    // ── LA LÁPIDA DE LA MADRE: piedra alta y clara sobre un plinto, con el marco tallado y la guirnalda
    a_lapidaMadre(R, 160, 150);
    // el banco de piedra para la niña
    rect(186, 140, 222, 144, C.k); rect(187, 141, 221, 142, P.piedraL); rect(187, 143, 221, 143, P.piedraS); for (const x of [190, 214]) { rect(x, 144, x + 5, 150, C.k); rect(x + 1, 144, x + 4, 150, P.piedra); rect(x + 1, 144, x + 1, 150, P.piedraL); }
    for (let x = 188; x < 221; x += 4) pset(x, 141, h(x, 1, 938) < 0.5 ? P.musgo : P.piedra);
    a_tinte(R, 184, 150, 224, 152, C.k, 0.3, true);
    // los troncos de los dos árboles
    for (const [x, w, y0] of [[24, 4, 60], [236, 3, 50]]) { for (let y = y0; y < 152; y++) { const ww = w + Math.round((y - y0) / 40), xx = x + Math.round(Math.sin(y * 0.05) * 1.5); for (let i = -ww; i <= ww; i++) pset(xx + i, y, i < -ww + 2 ? P.troncoL : i > ww - 2 ? P.troncoS : (y + i * 3) % 7 === 0 ? P.troncoS : P.tronco); }
      for (const [dx, dy, l] of [[-1, -1, 18], [1, -1, 20], [-1, -2, 12], [1, -2, 14]]) { let xx = x, yy = y0 + 18 + l; for (let s = 0; s < l * 1.5; s++) { xx += dx * (s % 2); yy += dy * (s % 3 === 0 ? 1 : 0) - (s % 2); pset(xx, yy, P.troncoS); pset(xx + 1, yy, P.tronco); } } }
  });
  // ── vida: el humo, la veleta, los grajos, las copas, el gato, la hierba, las flores, las hojas y la niebla
  // humo de las chimeneas lejanas
  for (const [x, k] of [[30, 0], [180, 1], [262, 2]]) a_humo(R, x, 84, t + k * 3, { n: 7, al: 24, c: hex('#a4a8b0'), deriva: 8, v: 0.18 });
  // la veleta de la torrecita, que gira despacio
  { const a = Math.sin(t * 0.4) * 3; linea(72 - Math.round(a), 19, 72 + Math.round(a), 19, C.k); pset(72 + Math.round(a), 18, C.k); }
  // los grajos que cruzan (fuera de la zona de Atom)
  for (let k = 0; k < 4; k++) { const u = ((t * 0.045 + k * 0.23) % 1), x = 320 - u * 360 + k * 9, y = 30 + k * 6 + Math.sin(t + k) * 3; if (!(x > 272 && y < 48)) a_pajaro(R, x, y, t, k, hex('#2a2a30')); }
  // las copas de otoño de los árboles (por delante del cielo), que se mecen
  a_copa(R, t, 24, 62, 30, 24, 0); a_copa(R, t, 234, 58, 30, 26, 1);
  // el gato que pasea por la albardilla del muro
  { const u = (t % 40) / 40, gx = Math.round(-10 + u * 340); if (gx > -8 && gx < 328 && !(gx > 150 && gx < 172)) a_gatoAndando(R, gx, 102, t); }
  // la hierba que se mueve con el viento
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 939) * 320), y = 122 + Math.round(h(k, 2, 939) * 56), m = Math.round(Math.sin(t * 1.8 + x * 0.04) * 1.2); if ((x > 140 && x < 182 && y < 151)) continue; linea(x, y, x + m, y - 3, P.hierbaL); pset(x + m, y - 3, P.hierbaS); }
  // flores silvestres al pie de la lápida de la madre, que tiemblan
  for (let k = 0; k < 6; k++) { const x = 146 + k * 6, m = Math.round(Math.sin(t * 2 + k) * 0.6); linea(x, 150, x + m, 146, P.hierbaL); pset(x + m, 145, [hex('#e8e0f0'), hex('#f0d060'), hex('#c8a0d8')][k % 3]); }
  // las hojas que caen de las copas
  for (let k = 0; k < 14; k++) { const v = 0.06 + h(k, 1, 942) * 0.05, u = (t * v + h(k, 2, 942)) % 1, x0 = k % 2 ? 234 : 24, x = Math.round(x0 + (h(k, 3, 942) - 0.5) * 50 + Math.sin(t * 1.5 + k) * 6 + u * 30), y = Math.round((k % 2 ? 50 : 64) + u * 100);
    if (x > 272 && y < 48) continue; pset(x, y, [P.hoja, P.hojaL, P.hojaS][k % 3]); pset(x + (Math.sin(t * 3 + k) > 0 ? 1 : -1), y, [P.hoja, P.hojaL, P.hojaS][(k + 1) % 3]); }
  // la niebla baja que corre entre las tumbas
  for (let y = 112; y < 132; y++) { const b = Math.sin(y * 0.3 + t * 0.4); if (b < 0.4) continue; for (let x = 0; x < 320; x++) if (h(x + Math.floor(t * 5), y, 943) < (b - 0.4) * 0.35) pset(x, y, a_mez(R.pget(x, y), P.nieblaL, 0.5)); }
  return { suelo: 150, libre: [40, 280], lapida: [140, 100, 180, 150], banco: [186, 220, 142], iglesia: [62, 150], muro: 104, camino: [90, 130] };
}

// una lápida pequeña de fondo (x centro, y base, semiancho w, alto al): 0 redonda, 1 de frontón, 2 rota y baja, 3 cruz;
// inc: inclinación (−1, 0, 1); con musgo, liquen y su sombra
function a_lapidita(R, x, y, w, al, tipo, inc) {
  const P = a_P, { pset, rect } = R;
  for (let j = 0; j < al; j++) { const yy = y - j, dx = Math.round(inc * j / 5), ww = tipo === 3 ? (j > al - 4 ? 1 : j > al - 7 ? w : 1) : tipo === 0 && j > al - w ? Math.round(Math.sqrt(Math.max(0, w * w - (j - al + w) ** 2))) : tipo === 1 && j > al - 3 ? w - (j - al + 3) * 2 : w;
    if (tipo === 2 && j > al - 3 && (x + j) % 3 === 0) continue;
    for (let i = -ww; i <= ww; i++) { const xx = x + i + dx; pset(xx, yy, i === -ww || i === ww ? C.k : i < -ww + 2 ? P.piedraL : i > ww - 2 ? P.piedraS : h(xx, yy, 944) < 0.12 ? P.liquen : j < 3 && h(xx, yy, 945) < 0.6 ? P.musgo : P.piedra); }
    if (j === al - 1) for (let i = -ww; i <= ww; i++) pset(x + i + dx, yy - 1, C.k); }
  if (al > 10 && tipo !== 3) for (let l = 0; l < 3; l++) rect(x - w + 3 + Math.round(inc * (al - 5 - l * 2) / 5), y - al + 5 + l * 2, x + w - 3 + Math.round(inc * (al - 5 - l * 2) / 5) - (l === 2 ? 2 : 0), y - al + 5 + l * 2, P.piedraS);
  for (let i = -w - 1; i <= w + 3; i++) pset(x + i, y + 1, a_mez(R.pget(x + i, y + 1), C.k, 0.35));
}

// LA LÁPIDA DE LA MADRE (x centro, suelo): piedra de Portland alta (x −20…+20, de y suelo −50 a suelo) con remate
// curvo, marco tallado con bisel, guirnalda arriba y cinco renglones de rayitas (nunca letras), plinto y musgo al pie
function a_lapidaMadre(R, x, suelo) {
  const P = a_P, { rect, pset, disco, linea } = R, top = suelo - 50;
  rect(x - 22, suelo - 7, x + 22, suelo, C.k); rect(x - 21, suelo - 6, x + 21, suelo, C.portlandS); rect(x - 21, suelo - 6, x + 21, suelo - 6, C.portland);
  for (let y = top; y < suelo - 7; y++) { const j = y - top, ww = j < 8 ? Math.round(18 * Math.sqrt(1 - ((8 - j) / 9) ** 2)) + 1 : 19;
    for (let i = -ww; i <= ww; i++) { const xx = x + i, n = h(xx, y, 950); pset(xx, y, i === -ww || i === ww ? C.k : i < -ww + 2 ? hex('#e4ded0') : i > ww - 3 ? C.portlandS : n < 0.07 ? P.liquen : n > 0.93 ? hex('#b4ae9c') : C.portland); }
    if (j === 0) for (let i = -ww; i <= ww; i++) pset(x + i, y - 1, C.k); }
  // el bisel del marco tallado
  rect(x - 14, top + 12, x + 14, suelo - 12, hex('#bcb5a2')); rect(x - 13, top + 13, x + 13, suelo - 13, C.portland);
  rect(x - 14, top + 12, x + 14, top + 12, C.portlandS); rect(x - 14, top + 12, x - 14, suelo - 12, C.portlandS); rect(x - 14, suelo - 12, x + 14, suelo - 12, hex('#ece6d8')); rect(x + 14, top + 12, x + 14, suelo - 12, hex('#ece6d8'));
  // la guirnalda del remate: hojas en arco y un lazo
  for (let a = 0; a <= 12; a++) { const u = a / 12, gx = Math.round(x - 10 + u * 20), gy = Math.round(top + 6 + Math.sin(u * Math.PI) * 3); pset(gx, gy, C.portlandS); if (a % 2) pset(gx, gy - 1, hex('#ece6d8')); }
  disco(x, top + 5, 1, C.portlandS);
  // las rayitas: cinco renglones de trazos incisos (sombra arriba, filo de luz abajo), sin letras
  for (let l = 0; l < 5; l++) { const y = top + 16 + l * 5, ancho = l === 0 ? 8 : l === 2 ? 11 : 10 - (l % 2) * 2; let xx = x - ancho;
    for (let k = 0; xx < x + ancho; k++) { const g = 1 + Math.floor(h(k, l, 951) * 3); for (let i = 0; i < g && xx < x + ancho; i++) { pset(xx, y, hex('#6e6858')); pset(xx, y + 1, h(xx, l, 952) < 0.5 ? hex('#6e6858') : C.portlandS); pset(xx, y + 2, hex('#ece6d8')); xx += 2; } xx += 2; } }
  // musgo y verdín al pie, y la sombra en la hierba
  for (let i = -21; i <= 21; i++) { const al = Math.round(h(i, 1, 953) * 4); for (let j = 0; j < al; j++) pset(x + i, suelo - 7 - j, j ? P.musgoL : P.musgo); }
  for (let i = -24; i <= 30; i++) pset(x + i, suelo + 1, a_mez(R.pget(x + i, suelo + 1), C.k, 0.35));
}

// la copa de otoño de un árbol (centro cx, cy; radios rx, ry): hojas en cuatro tonos con huecos, que se mueve con el viento
function a_copa(R, t, cx, cy, rx, ry, k) {
  const P = a_P, m = Math.sin(t * 0.9 + k) * 1.5;
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const x = Math.round(cx + i + m * (1 - (j + ry) / (2 * ry))), y = cy + j; if (x > 272 && y < 48) continue;
    const e = (i / rx) ** 2 + (j / ry) ** 2 + (h(i >> 1, j >> 1, 960 + k) - 0.5) * 0.6; if (e > 1) continue; const n = h(i >> 1, j >> 1, 961 + k);
    if (n < 0.12 && e > 0.3) continue; R.pset(x, y, j > ry * 0.4 || i > rx * 0.5 ? (n < 0.5 ? P.hojaS : hex('#6a3a1e')) : j < -ry * 0.4 && i < 0 ? (n < 0.5 ? P.hojaL : P.hoja) : n < 0.3 ? P.hojaL : n < 0.7 ? P.hoja : P.hojaS); }
}

// un gato negro que anda por un muro (x, y de las patas): las patas alternan y la cola se curva
function a_gatoAndando(R, x, y, t) {
  const c = hex('#1e1c22'), p = Math.floor(t * 5) % 2, { rect, pset } = R;
  rect(x - 4, y - 5, x + 3, y - 3, c); rect(x + 3, y - 7, x + 6, y - 4, c); pset(x + 4, y - 8, c); pset(x + 6, y - 8, c); pset(x + 5, y - 6, hex('#c8d040'));
  for (const [dx, f] of [[-3, p], [-1, 1 - p], [1, p], [3, 1 - p]]) rect(x + dx + f, y - 3, x + dx + f, y - 1, c);
  pset(x - 5, y - 5, c); pset(x - 6, y - 6, c); pset(x - 6, y - 7 + (Math.sin(t * 2) > 0 ? 0 : 1), c); pset(x - 5, y - 8, c);
}

// LA LÁPIDA DE CERCA: la piedra de Portland de la madre llena el plano (x 72–248, arista de arriba redondeada desde
// y 14, con el canto a la derecha hasta x 254): grano a dos escalas, regueros de lluvia que bajan de las molduras, una
// grieta, desconchones, líquenes en roseta, musgo en el remate y al pie, hiedra que trepa por el borde izquierdo, el
// marco tallado con bisel y la guirnalda en relieve, seis renglones de trazos incisos (se intuyen letras; no se leen) y
// el año 1797 tallado abajo. Detrás, el cementerio desenfocado: el cielo gris tramado con nubes de tres tonos a tres
// velocidades y grajos que cruzan, la iglesia con su torre y las vidrieras tenues, los olmos de otoño que se mecen, el
// muro de piedra con hiedra, lápidas lejanas y un sepulturero pequeño que cava a la izquierda. Delante, la hierba que
// se mece con tréboles y margaritas, hojas que caen y una mariquita que sube por la piedra; la luz cambia con las nubes.
// o.dedo (0–1): el brazo canónico de la niña entra en diagonal desde abajo a la izquierda (hombro fuera de cuadro, codo
// abajo) y la yema recorre el renglón o.renglon (por omisión 2) de principio a fin; o.manga: color de la manga.
// Devuelve { suelo: 180, libre: [72, 248], renglones } (renglones: [x inicio, x fin, y base] de cada uno, sin cambios).
function a_lapida(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P, renglones = [];
  for (let l = 0; l < 6; l++) renglones.push([100 + (l % 2) * 6, 220 - (l % 3) * 6, 70 + l * 14]);
  const TOP = 14, INC = hex('#6e6858'), FILO = hex('#ece6d8');
  // medio ancho de la piedra en la fila y (la arista de arriba es un cuarto de elipse)
  const ancho = (y) => { const j = y - TOP; return j < 0 ? -1 : j < 30 ? Math.round(88 * Math.sqrt(1 - ((30 - j) / 31) ** 2)) : 88; };
  // la niebla del desenfoque: todo lo del fondo se aclara hacia el gris del cielo
  const des = (c, a = 0.42) => a_mez(c, P.gris1, a);
  // ── el cielo gris tramado, más oscuro arriba y con un claro donde está el sol tapado (fijo)
  a_fijo(R, 'lapidaC', () => {
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const p = y / 100, n = ([0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5][(y & 3) * 4 + (x & 3)] + 0.5) / 16, cl = Math.max(0, 1 - Math.hypot((x - 40) / 70, (y - 30) / 30));
      let c = p < 0.5 ? (n < p * 2 ? P.gris1 : P.gris0) : (n < (p - 0.5) * 2 ? P.gris2 : P.gris1); if (cl > 0 && h(x, y, 971) < cl) c = a_mez(c, hex('#e4e2da'), 0.45); pset(x, y, c); }
  });
  // ── las nubes desenfocadas en tres capas a tres velocidades (y 20–90; tranquilas en la esquina de Atom): cada una son
  // cuatro lóbulos con la base plana, luz arriba, cuerpo tramado y sombra abajo
  for (let capa = 0; capa < 3; capa++) for (let i = 0; i < 4; i++) { const w = 18 + capa * 7 + Math.round(h(i, capa, 1971) * 10), r = 6 + capa * 2;
    const cx = Math.round(((i * 115 + h(i, capa, 1972) * 60 + capa * 40 + t * (0.8 + capa * 1.3)) % 460) - 70), cy = 30 + capa * 20 + Math.round(h(i, capa, 1973) * 8);
    const lob = [0, 1, 2, 3].map((k) => [cx - w + (k + 0.5) * w / 2, cy - (k === 1 || k === 2 ? r * 0.45 : 0) + h(k, i + capa * 3, 1977) * 2, r * (k === 1 || k === 2 ? 1.1 : 0.8)]);
    for (let y = cy - r * 2; y <= cy + r * 0.6; y++) for (let x = cx - w - r; x <= cx + w + r; x++) { if (x < 0 || x > 319 || y < 0 || (x > 270 && y < 48)) continue;
      let best = 9, dy = 0; for (const [lx, ly, lr] of lob) { const d = Math.hypot(x - lx, y - ly) / lr; if (d < best) { best = d; dy = (y - ly) / lr; } }
      if (best > 1 || (best > 0.85 && h(x, y, 1974) < 0.5)) continue; const yb = (y - cy) / r;
      pset(x, y, yb > 0.2 ? ((x + y) & 1 ? hex('#868c96') : hex('#7e848e')) : dy < -0.45 ? hex('#e4e4e0') : dy < -0.1 ? ((x + y) & 1 ? hex('#d0d2d2') : hex('#c4c8cc')) : (x + y) & 1 ? hex('#b0b4ba') : hex('#a6aab2')); } }
  // ── los grajos que cruzan el cielo (las alas suben y bajan)
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (9 + k * 3) + k * 140) % 400) - 40), y = Math.round(44 + k * 9 + Math.sin(t * 0.9 + k) * 3); if (x < 0 || x > 316 || (x > 268 && y < 50)) continue;
    const a = Math.sin(t * 9 + k * 2) > 0 ? -1 : 1, c = hex('#3a3a42'); pset(x, y, c); pset(x + 1, y, c); pset(x - 1, y + a, c); pset(x - 2, y + a * 2, c); pset(x + 2, y + a, c); pset(x + 3, y + a * 2, c); }
  // ── los olmos de otoño detrás del muro, a la derecha, que se mecen (desenfocados)
  for (const [cx, cy, rx, ry, k] of [[268, 78, 34, 26, 0], [306, 84, 22, 22, 1], [92, 84, 26, 16, 2]]) { const m = Math.sin(t * 0.8 + k * 2) * 1.6;
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const x = Math.round(cx + i + m * (1 - (j + ry) / (2 * ry))), y = cy + j; if (x < 0 || x > 319 || (x > 272 && y < 50)) continue;
      const e = (i / rx) ** 2 + (j / ry) ** 2 + (h(i >> 1, j >> 1, 1975 + k) - 0.5) * 0.45; if (e > 1) continue; const n = (h(i >> 1, j >> 1, 1976 + k) + h(i, j, 1978 + k)) / 2;
      if (e > 0.6 && h(i >> 1, j >> 1, 1979 + k) < 0.18) continue;
      pset(x, y, des(j > ry * 0.35 || i > rx * 0.45 ? (n < 0.5 ? P.hojaS : hex('#6a3a1e')) : j < -ry * 0.3 && i < 0 ? (n < 0.5 ? P.hojaL : P.hoja) : n < 0.35 ? P.hojaL : n < 0.75 ? P.hoja : P.hojaS, 0.45)); } }
  // ── lo fijo que tapa al cielo: la iglesia, el muro, la hierba de detrás, las lápidas lejanas y la piedra con su canto
  a_fijoSobre(R, 'lapidaF', () => {
    // la iglesia (desenfocada): la torre con almenas, su ventana alta y el reloj; la nave con el tejado y las vidrieras
    const pie = des(P.piedra, 0.4), pieS = des(P.piedraS, 0.4), pieL = des(P.piedraL, 0.4), teja = des(hex('#5a5258'), 0.4), vid = des(hex('#c8a868'), 0.35);
    for (let y = 36; y < 94; y++) for (let x = 12; x < 32; x++) { if (y < 40 && ((x - 12) >> 2) % 2) continue; const n = h(x >> 1, y >> 1, 1980);
      pset(x, y, x > 27 ? pieS : (y % 6 === 0 && h(x >> 2, y, 1981) < 0.6) ? pieS : n < 0.2 ? pieL : pie); }
    poligono([[20, 52], [24, 46], [28, 52], [28, 64], [20, 64]], des(hex('#3a3a46'), 0.35)); rect(23, 48, 25, 63, des(hex('#4a4a56'), 0.35));
    disco(22, 72, 3, pieL); disco(22, 72, 2, des(hex('#e8e0c8'), 0.3)); pset(22, 71, pieS); pset(22, 70, pieS); pset(23, 72, pieS);
    for (let x = 32; x < 72; x++) { const tej = Math.round(60 + (x - 32) * 0.35); for (let y = tej; y < 94; y++) pset(x, y, y < tej + 6 ? ((x + y) % 3 ? teja : des(hex('#463e44'), 0.4)) : (y % 6 === 0 || (x + (y >> 1) * 3) % 9 === 0) ? pieS : h(x >> 1, y >> 1, 1982) < 0.2 ? pieL : pie); }
    for (const vx of [40, 54]) { for (let y = 74; y < 88; y++) for (let x = vx - 2; x <= vx + 2; x++) { if (y < 76 && Math.abs(x - vx) > (y - 73)) continue; pset(x, y, (x + y) % 3 ? vid : des(hex('#8a5a5a'), 0.35)); } rect(vx - 3, 88, vx + 3, 88, pieL); }
    // el muro de piedra del cementerio (y 92–104): hiladas de sillarejo con su llaga clara, la albardilla y la hiedra
    for (let y = 92; y < 106; y++) { const fila = (y - 92) >> 2; for (let x = 0; x < 320; x++) { const bw = 9 + Math.floor(h(fila, (x + fila * 5) >> 3, 1983) * 4), junta = (y - 92) % 4 === 0 || (x + fila * 5) % bw === 0;
      pset(x, y, y < 94 ? (y === 92 ? des(P.piedraS, 0.3) : des(P.piedraL, 0.3)) : junta ? des(hex('#b4ae9e'), 0.35) : h((x + fila * 5) >> 3, fila, 1984) < 0.4 ? des(P.piedraS, 0.4) : des(P.piedra, 0.4)); } }
    for (const [hx, hw] of [[0, 30], [254, 40]]) for (let y = 93; y < 106; y++) for (let x = hx; x < hx + hw; x++) { const n = h(x >> 1, y >> 1, 1985); if (n < 0.55 - (y - 93) * 0.02) pset(x, y, des(n < 0.2 ? P.hierbaL : n < 0.4 ? P.hierba : P.hierbaD, 0.35)); }
    // la hierba de detrás: matas en dos tonos a dos escalas, florecillas blancas y amarillas, y un sendero de grava
    for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 1986), f = h(x, y, 1987), lado = Math.sin(x * 0.07 + y * 0.11) * 0.5 + 0.5;
      let c = n < 0.3 ? P.hierbaS : n > 0.78 ? P.hierbaL : P.hierba; if (f < 0.12) c = lado > 0.5 ? P.hierbaD : P.hierbaL; if (f > 0.993) c = h(x, y, 1988) < 0.5 ? hex('#f0ece0') : hex('#e8c840');
      const s = 2 + (y - 106) * 0.35; if (x > s && x < s + 14 && x < 72) c = (f < 0.3 ? P.gravaS : f > 0.8 ? hex('#b8b0a0') : P.grava);
      pset(x, y, des(c, 0.3 - (y - 106) / 400)); }
    // lápidas lejanas, blandas: losas, una cruz que se inclina y una con remate, cada una con su sombra
    for (const [cx, cy, w, al, tipo] of [[38, 118, 6, 12, 0], [58, 124, 5, 10, 1], [266, 118, 10, 18, 0], [298, 126, 8, 14, 2], [30, 160, 13, 22, 0], [282, 160, 13, 20, 1], [312, 110, 5, 9, 0], [8, 112, 5, 10, 2]]) {
      for (let i = -w - 2; i <= w + 6; i++) pset(cx + i, cy + 1, a_mez(R.pget(cx + i, cy + 1), C.k, 0.3));
      if (tipo === 2) { rect(cx - 1, cy - al, cx + 1, cy, des(P.piedraL, 0.3)); rect(cx - 4, cy - al + 3, cx + 4, cy - al + 4, des(P.piedraL, 0.3)); rect(cx + 1, cy - al + 1, cx + 1, cy, des(P.piedraS, 0.3)); continue; }
      for (let j = 0; j < al; j++) for (let i = -w; i <= w; i++) { const r = j > al - w ? Math.hypot(i, j - al + w) / w : Math.abs(i) / w; if (r > 1) continue; const n = h(cx + i, cy - j, 1989);
        pset(cx + i, cy - j, des(i > w * 0.5 ? P.piedraS : i < -w * 0.6 ? hex('#d0cabc') : n < 0.12 ? P.liquen : n > 0.9 ? P.musgo : P.piedraL, 0.25)); }
      if (tipo === 1) rect(cx - w + 3, cy - al + 5, cx + w - 4, cy - al + 5, des(P.piedraS, 0.25)); }
    // el canto de la piedra (su grosor, a la derecha) con regueros, y su sombra en la hierba
    for (let y = 13; y < 180; y++) { const j = y - 15, ww = j < 0 ? -1 : ancho(y - 1); for (let x = 166 - ww; x <= 166 + ww; x++) { if (x < 248) continue; const n = h(x, y, 1990), v = h(x, y >> 3, 2002);
      pset(x, y, x === 166 + ww || j === 0 ? C.k : n < 0.2 ? hex('#7a7466') : v > 0.9 && n > 0.5 ? P.liquenN : v < 0.15 ? hex('#8a8476') : x === 249 ? hex('#aaa494') : hex('#9a9484')); } }
    a_tinte(R, 255, 108, 282, 179, C.k, 0.32, true);
    // la piedra: arista de arriba redondeada, grano a dos escalas, regueros de lluvia, filo de luz y sombra
    for (let y = TOP; y < 180; y++) { const ww = ancho(y), j = y - TOP;
      for (let x = 160 - ww; x <= 160 + ww; x++) { const n = h(x, y, 974), g = h(x >> 1, y >> 1, 1991), reg = Math.sin(x * 0.9) * Math.sin(x * 0.23) > 0.5 && h(x, y >> 3, 975) < 0.75 - j / 260;
        let c = n < 0.14 ? hex('#bab3a0') : n > 0.88 ? hex('#e0dacb') : g < 0.25 ? hex('#c0b8a5') : g > 0.85 ? hex('#d2cab8') : C.portland;
        if (h(x >> 3, y >> 3, 2001) < 0.22) c = a_mez(c, hex('#8a8474'), 0.14);
        if (reg) c = a_mez(c, hex('#7a7466'), 0.28 * (1 - j / 220)); if (x - (160 - ww) < 3) c = FILO; else if (160 + ww - x < 4) c = C.portlandS; if (x === 160 - ww || x === 160 + ww) c = C.k; pset(x, y, c); }
      if (j === 0) for (let x = 160 - ww; x <= 160 + ww; x++) pset(x, y - 1, C.k); }
    // el musgo que se agarra al remate (la arista de arriba) y algún liquen naranja
    for (let x = 74; x <= 246; x++) { let y = TOP; while (y < 60 && ancho(y) < Math.abs(x - 160)) y++; const al = Math.round(h(x >> 1, 0, 1992) * 3 * (1 - Math.abs(x - 160) / 140)) + (Math.abs(x - 160) > 70 ? 1 : 0);
      for (let k = 0; k < al; k++) pset(x, y + k, k === 0 ? P.musgoL : h(x, k, 1993) < 0.5 ? P.musgo : hex('#44542a')); }
    // líquenes en roseta (anillo claro, centro oscuro) y manchas de verdín
    for (const [cx, cy, r, c] of [[96, 40, 5, P.liquen], [228, 60, 4, P.liquenN], [210, 30, 3, P.liquen], [88, 150, 6, P.liquenN], [236, 150, 6, P.liquen], [230, 112, 3, P.liquenN], [92, 98, 3, P.liquen], [124, 32, 2, P.liquenN]])
      for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d >= r || h(cx + i, cy + j, 976) > 0.8) continue; pset(cx + i, cy + j, d > r - 1.5 ? a_mez(c, C.blanco, 0.25) : d < r * 0.4 ? a_mez(c, C.k, 0.35) : h(cx + i, cy + j, 977) < 0.3 ? a_mez(c, C.k, 0.15) : c); }
    // la grieta que baja del canto derecho (oscura, con su filo de luz) y los desconchones
    for (const [a, b] of [[[244, 34], [236, 44]], [[236, 44], [239, 56]], [[239, 56], [232, 70]], [[236, 44], [228, 48]]]) { linea(a[0], a[1], b[0], b[1], hex('#5a5448')); linea(a[0] + 1, a[1], b[0] + 1, b[1], FILO); }
    for (const [cx, cy] of [[240, 90], [80, 120], [176, 162]]) { poligono([[cx, cy], [cx + 6, cy - 2], [cx + 7, cy + 4], [cx + 1, cy + 6]], hex('#a8a290')); linea(cx, cy, cx + 6, cy - 2, C.portlandS); linea(cx + 1, cy + 6, cx + 7, cy + 4, FILO); }
    // el marco tallado con bisel y la guirnalda en relieve; regueros oscuros bajo la moldura
    const fx0 = 86, fx1 = 234, fy0 = TOP + 34;
    rect(fx0, fy0, fx1, fy0 + 2, C.portlandS); rect(fx0, fy0, fx0 + 2, 179, C.portlandS); rect(fx1 - 2, fy0, fx1, 179, FILO); rect(fx0 + 2, fy0 + 2, fx1 - 2, fy0 + 2, hex('#a8a290'));
    rect(fx0 + 3, fy0 + 3, fx0 + 3, 179, hex('#a8a290'));
    for (let x = fx0 + 4; x < fx1 - 3; x++) if (h(x >> 1, 1, 1994) < 0.35) { const l = 2 + Math.floor(h(x, 2, 1994) * 9); for (let k = 0; k < l; k++) if (h(x, k, 1995) < 0.8) pset(x, fy0 + 3 + k, a_mez(R.pget(x, fy0 + 3 + k), hex('#6a6456'), 0.35 * (1 - k / l))); }
    for (let a = 0; a <= 40; a++) { const u = a / 40, gx = Math.round(118 + u * 84), gy = Math.round(TOP + 18 + Math.sin(u * Math.PI) * 9);
      for (const d of [-1, 1]) if (a % 3 === 0) { const lx = gx + d * 2, ly = gy - 2 + (d > 0 ? 1 : 0); rect(lx - 1, ly - 1, lx + 1, ly + 1, FILO); pset(lx + 1, ly + 1, C.portlandS); if (a % 6 === 0) pset(lx, ly, P.musgo); }
      pset(gx, gy, C.portlandS); }
    disco(160, TOP + 14, 3, FILO); disco(161, TOP + 15, 2, C.portlandS); disco(160, TOP + 14, 1, FILO);
    for (const d of [-1, 1]) { linea(160, TOP + 16, 160 + d * 6, TOP + 24, C.portlandS); linea(160 + d, TOP + 16, 160 + d * 7, TOP + 24, FILO); }
    // los renglones de rayitas incisas: grupos de trazos verticales con su remate (se intuyen letras; no se leen); en los
    // de arriba, la suciedad y el musgo se han metido en algún trazo (el último renglón queda limpio: lo sigue el dedo)
    renglones.forEach(([ra, rb, y], l) => { let x = ra;
      for (let k = 0; x < rb; k++) { const g = 2 + Math.floor(h(k, y, 978) * 5);
        for (let i = 0; i < g && x < rb; i++) { const al = h(k, i + y, 979) < 0.2 ? 6 : 8, tipo = h(i, k + y, 980);
          rect(x, y - al, x + 1, y, INC); rect(x + 2, y - al + 1, x + 2, y + 1, FILO); pset(x, y - al, hex('#8a8474'));
          if (tipo < 0.25) rect(x - 1, y, x + 2, y, INC); else if (tipo > 0.8) rect(x, y - al, x + 3, y - al, INC);
          if (l < 4 && h(x, y, 1996) < 0.12) { pset(x, y - 1, P.musgo); pset(x + 1, y, P.musgoL); }
          x += 5; }
        x += 5; } });
    // el año tallado abajo (número, no letras), inciso: filo de luz debajo y el hueco oscuro
    R.numero('1797', 161, 157, { centro: true, color: FILO, sombra: false }); R.numero('1797', 160, 156, { centro: true, color: INC, sombra: false });
    // la hiedra que trepa por el borde izquierdo: el tallo que serpentea y hojas de tres tonos con su nervio
    for (let y = 179; y > 104; y--) { const sx = Math.round(76 + Math.sin(y * 0.12) * 4 + (179 - y) * 0.04); pset(sx, y, hex('#3a2e1e'));
      if (y % 7 === 0) { const lx = sx + (y % 14 ? 3 : -3), ly = y, gr = y < 120 ? 1 : 2; for (let j = -gr; j <= gr; j++) for (let i = -gr - 1; i <= gr + 1; i++) if (Math.abs(i) + Math.abs(j) <= gr + 1) pset(lx + i, ly + j, i < 0 && j < 0 ? hex('#5a7a3a') : j > 0 || i > 1 ? hex('#243a1e') : hex('#3a5a2a'));
        pset(lx, ly, hex('#6e8e4a')); linea(sx, y, lx, ly, hex('#3a2e1e')); } }
    // el musgo al pie de la piedra, que sube en almohadillas
    for (let x = 74; x <= 246; x++) { const al = Math.round(h(x >> 2, 1, 1997) * 7 + h(x, 1, 1998) * 2); for (let k = 0; k < al; k++) pset(x, 179 - k, k === al - 1 ? P.musgoL : (x + k) % 3 ? P.musgo : hex('#44542a')); }
  });
  // ── vida: el sepulturero pequeño que cava a la izquierda (desenfocado), con su montón de tierra
  { const sx = 46, sy = 132, f = (t * 0.7) % 1, sube = f < 0.5 ? f * 2 : 2 - f * 2, ab = des(hex('#3a3430'), 0.3), ca = des(P.piel, 0.3), ti = des(hex('#5a4630'), 0.3);
    for (let i = -6; i <= 6; i++) for (let j = 0; j <= 3 - Math.abs(i) / 2; j++) pset(sx + 13 + i, sy - j, h(i, j, 1999) < 0.5 ? ti : des(hex('#4a3a28'), 0.3));
    rect(sx - 5, sy + 1, sx + 5, sy + 2, des(hex('#2a2018'), 0.3));
    rect(sx - 2, sy - 8, sx + 1, sy - 1, ab); rect(sx - 2, sy - 3, sx - 2, sy, ab); rect(sx + 1, sy - 3, sx + 1, sy, ab); rect(sx - 2, sy - 11, sx + 1, sy - 9, ca); rect(sx - 3, sy - 12, sx + 2, sy - 12, ab); rect(sx - 2, sy - 13, sx + 1, sy - 13, ab);
    const px = sx + 3 + Math.round(sube * 3), py = sy - 5 - Math.round(sube * 4); linea(sx + 1, sy - 6, px, py, ab); linea(px, py, px + 4 - Math.round(sube * 2), py + 6 - Math.round(sube * 3), des(hex('#6a5a48'), 0.3));
    const pz = px + 4 - Math.round(sube * 2), pzy = py + 6 - Math.round(sube * 3); rect(pz - 1, pzy, pz + 1, pzy + 1, des(hex('#8a8a90'), 0.3));
    if (f > 0.5 && f < 0.8) { const u = (f - 0.5) / 0.3; pset(Math.round(pz + u * 6), Math.round(pzy - Math.sin(u * Math.PI) * 5), ti); pset(Math.round(pz + 1 + u * 7), Math.round(pzy + 1 - Math.sin(u * Math.PI) * 4), ti); } }
  // ── la hierba de delante, que se mece con el viento, con tréboles y margaritas (por delante del pie de la piedra)
  for (let x = 0; x < 320; x += 2) { const al = 5 + Math.round(h(x, 0, 2000) * 9), m = Math.sin(t * 1.6 + x * 0.05) * (1.5 + h(x, 1, 2000) * 1.5), c = h(x, 2, 2000);
    const cb = c < 0.3 ? P.hierbaD : c < 0.7 ? P.hierba : P.hierbaS; for (let k = 0; k < al; k++) { const u = k / al; pset(Math.round(x + m * u * u), 179 - k, k > al - 3 ? (c < 0.5 ? P.hierbaL : hex('#8aa858')) : cb); } }
  for (const [cx, k] of [[14, 0], [62, 1], [128, 2], [196, 3], [262, 4], [304, 5], [100, 6], [222, 7]]) { const m = Math.round(Math.sin(t * 1.6 + cx * 0.05)), y = 170 + (k % 3) * 2;
    if (k % 2) { linea(cx, 179, cx + m, y, P.hierbaD); for (const [i, j] of [[-1, 0], [1, 0], [0, -1]]) { pset(cx + m + i * 2, y + j * 2, hex('#5a8a3a')); pset(cx + m + i * 2 + 1, y + j * 2, hex('#5a8a3a')); pset(cx + m + i * 2, y + j * 2 + 1, hex('#3a6a2a')); } }
    else { linea(cx, 179, cx + m, y, P.hierbaD); for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) pset(cx + m + i, y + j, hex('#f4f0e4')); pset(cx + m, y, hex('#e8b830')); } }
  // ── las hojas que caen por delante, la mariquita que sube por la piedra y la luz que cambia con las nubes
  for (let k = 0; k < 10; k++) { const u = (t * (0.07 + h(k, 1, 981) * 0.05) + h(k, 2, 981)) % 1, x = Math.round(h(k, 3, 981) * 320 + Math.sin(t * 1.3 + k) * 10), y = Math.round(-6 + u * 190);
    if (x > 272 && y < 48) continue; const c = [P.hoja, P.hojaL, P.hojaS][k % 3], g = Math.sin(t * 3 + k) > 0;
    R.rect(x, y, x + (g ? 2 : 1), y + (g ? 1 : 2), C.k); R.pset(x, y, c); R.pset(x + 1, y + (g ? 0 : 1), c); }
  { const u = (t * 0.03) % 1, mx = Math.round(232 + Math.sin(t * 0.7) * 3), my = Math.round(170 - u * 120); disco(mx, my, 2, C.k); rect(mx - 1, my - 1, mx + 1, my + 1, hex('#c8282a')); pset(mx, my, C.k); pset(mx - 1, my - 2, C.k); pset(mx + 1, my - 2, C.k); pset(mx + 1, my - 1, C.k); pset(mx - 1, my, hex('#ff8a7a')); }
  { const nub = 0.5 + 0.5 * Math.sin(t * 0.35); if (nub > 0.55) a_tinte(R, 72, 14, 248, 179, hex('#fff4e0'), (nub - 0.55) * 0.18, true); }
  // ── el dedo de la niña: el brazo canónico entra en diagonal desde abajo a la izquierda (el hombro fuera de cuadro, el
  // codo más bajo que la muñeca) y la yema recorre el renglón; la muñeca va 12 px por detrás de la yema
  if (o.dedo != null) { const [ra, rb, y] = renglones[o.renglon ?? 2], u = Math.max(0, Math.min(1, o.dedo)), fx = Math.round(ra + (rb - ra) * u), fy = y - 3 + Math.round(Math.sin(u * 40) * 0.6);
    const wx = fx - 12, wy = fy + 1; brazo(R, wx - 40, 200, wx, wy, o.manga ?? '#6a7a9a', 1, { codo: [wx - 30, wy + 36] }); }
  return { suelo: 180, libre: [72, 248], renglones };
}
// UNA CALLE DE LONDRES DE MADRUGADA (o.clarea, o.carruaje, o.marcha)
function a_calle(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P, cl = Math.round(Math.max(0, Math.min(1, o.clarea ?? 0.45)) * 10) / 10, clave = 'calle' + cl;
  const c0 = a_mez(P.cielo0, P.cielo1, cl), c1 = a_mez(P.cielo1, P.cielo2, cl), c2 = a_mez(P.cielo2, P.alba, cl), c3 = a_mez(P.alba, P.albaL, cl);
  // el cielo del alba (más claro abajo), tramado
  a_fijo(R, clave + 'c', () => { for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const p = y / 90, n = h(x >> 1, y, 990), c = p < 0.33 ? (n < p * 3 ? c1 : c0) : p < 0.66 ? (n < (p - 0.33) * 3 ? c2 : c1) : (n < (p - 0.66) * 3 ? c3 : c2); pset(x, y, c); } });
  // las nubes del alba en tres capas a tres velocidades (tranquilas en la esquina de Atom) y las estrellas que se apagan
  for (let capa = 0; capa < 3; capa++) for (let i = 0; i < 3; i++) { const w = 18 + capa * 8 + Math.round(h(i, capa, 996) * 14), x = Math.round(((h(i, capa, 997) * 420 + t * (1.5 + capa * 1.8)) % 420) - 50), y = 8 + capa * 10 + Math.round(h(i, capa, 998) * 10);
    for (let j = -3; j <= 2; j++) for (let ii = -w; ii <= w; ii++) { const xx = x + ii, yy = y + j; if (xx < 0 || xx > 319 || (xx > 270 && yy < 48)) continue; if ((ii / w) ** 2 + ((j + 0.5) / 3.2) ** 2 + Math.sin(ii * 0.4 + i) * 0.1 > 1) continue;
      pset(xx, yy, j >= 1 ? a_mez(P.cielo1, P.alba, 0.3 + cl * 0.6) : j <= -2 ? a_mez(P.cielo2, P.albaL, cl) : a_mez(P.cielo1, P.cielo2, 0.4 + cl * 0.4)); } }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 999) * 320), y = 2 + Math.round(h(k, 2, 999) * 40); if ((x > 270 && y < 48) || (x > 18 && x < 172 && y < 21)) continue; if (Math.sin(t * 2 + k * 3) > cl * 1.6 - 0.4) pset(x, y, hex('#e8e8f8')); }
  a_fijoSobre(R, clave, () => {
    // el hueco de la calle lateral (x 140–176): casas lejanas en la niebla y una aguja
    for (let y = 60; y < 132; y++) for (let x = 138; x < 178; x++) { const al = 68 + ((x >> 3) % 3) * 6; if (y > al) pset(x, y, a_mez(hex('#5a5e6e'), P.niebla, 0.3 + cl * 0.3 + (y - 60) / 200)); }
    poligono([[154, 30], [157, 30], [158, 66], [153, 66]], a_mez(hex('#4a4e5e'), P.niebla, 0.35)); poligono([[155, 20], [156, 20], [157, 30], [154, 30]], a_mez(hex('#4a4e5e'), P.niebla, 0.35));
    for (let y = 72; y < 120; y += 9) for (let x = 142; x < 176; x += 8) if (h(x, y, 991) < 0.35) rect(x, y, x + 1, y + 2, hex('#d8b070'));
    // las dos hileras de casas georgianas
    a_fachadas(R, 0, 138, 30, cl, 0); a_fachadas(R, 178, 320, 50, cl, 1);
    // la acera de losas y el bordillo
    for (let y = 132; y < 143; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 18 === 0 || y === 137) ? P.losaS : h(x >> 2, y, 992) < 0.3 ? a_mez(P.losa, C.k, 0.1) : P.losa);
    rect(0, 143, 319, 144, hex('#8a867c')); rect(0, 145, 319, 145, C.k);
    // los adoquines mojados: juntas, brillos del cielo y la luz de las farolas
    for (let y = 146; y < 180; y++) { const fh = Math.floor((y - 146) / (3 + (y - 146) / 12)); for (let x = 0; x < 320; x++) { const w = 6 + Math.floor((y - 146) / 8), jx = ((x + (fh & 1) * (w >> 1)) % w) === 0, jy = (y - 146) % (3 + Math.floor((y - 146) / 12)) === 0;
      let c = jx || jy ? P.adoquinS : h(Math.floor(x / w), fh, 993) < 0.3 ? a_mez(P.adoquin, C.k, 0.15) : P.adoquin; if (!jx && !jy && h(x, y, 994) < 0.08) c = a_mez(c3, P.adoquinL, 0.5); pset(x, y, c); } }
    for (const lx of [62, 158, 196]) for (let y = 147; y < 180; y++) if (((y + lx) & 1) && h(lx, y, 995) < 0.8 - (y - 147) / 50) for (let i = -1; i <= 1; i++) pset(lx + i + Math.round(Math.sin(y * 0.6) * 1.2), y, a_mez(R.pget(lx + i, y), P.luzV, 0.4));
    // las palomas no; la reja del sumidero
    rect(118, 160, 130, 163, C.k); for (let x = 119; x < 130; x += 2) rect(x, 161, x, 162, P.hierroL);
  });
  // ── vida: humo, ventanas encendidas, farolas, el que pasa por la calle lateral, la niebla, las palomas y el carruaje
  for (const [x, y, k] of [[62, 9, 0], [112, 9, 1], [196, 29, 2], [252, 29, 3]]) a_humo(R, x, y, t + k * 2, { n: 7, al: 18, c: a_mez(hex('#6a6a7a'), P.niebla, cl), deriva: 7, v: 0.2 });
  // las ventanas encendidas: una silueta que cruza en la de arriba a la izquierda, otra que se apaga al clarear
  { const vx = 36, vy = 52; rect(vx, vy, vx + 9, vy + 18, C.k); rect(vx + 1, vy + 1, vx + 8, vy + 17, P.luzV); const sx = Math.round(vx + ((t * 2.5) % 24) - 7); R.recorte([vx + 1, vy + 1, vx + 8, vy + 17]); disco(sx, vy + 7, 2, hex('#7a5a3a')); poligono([[sx - 3, vy + 18], [sx - 2, vy + 10], [sx + 2, vy + 10], [sx + 3, vy + 18]], hex('#7a5a3a')); R.recorte(null); rect(vx + 4, vy + 1, vx + 4, vy + 17, P.luzVS); for (let y = vy + 4; y < vy + 18; y += 5) rect(vx + 1, y, vx + 8, y, P.luzVS); }
  if (Math.sin(t * 0.25) > -0.3) { rect(241, 77, 248, 93, P.luzV); rect(244, 77, 244, 93, P.luzVS); for (let y = 80; y < 94; y += 5) rect(241, y, 248, y, P.luzVS); }
  // las farolas de aceite: el poste, el farol y la llama que tiembla con su halo
  for (const [lx, k] of [[62, 0], [158, 1], [196, 2]]) { const top = lx === 158 ? 100 : 104; rect(lx - 1, top + 8, lx + 1, 145, C.k); rect(lx, top + 8, lx, 144, P.hierroL); rect(lx - 3, 140, lx + 3, 145, C.k);
    poligono([[lx - 4, top], [lx + 4, top], [lx + 3, top + 8], [lx - 3, top + 8]], C.k); rect(lx - 2, top + 1, lx + 2, top + 7, a_mez(P.luzV, P.luzVL, 0.5 + 0.5 * Math.sin(t * 13 + k))); rect(lx - 5, top - 1, lx + 5, top - 1, C.k); pset(lx, top - 2, C.k);
    a_halo(R, lx, top + 4, 14, P.luzV, (0.25 + 0.06 * Math.sin(t * 11 + k * 2)) * (1.1 - cl * 0.6)); }
  // alguien pequeño que cruza la calle lateral, lejos, con su farol de mano
  { const u = (t % 16) / 16, x = Math.round(140 + u * 36); R.recorte([138, 60, 177, 131]); a_figurita(R, x, 128, 9, t, { color: hex('#2a2a36'), anda: true, dir: 1 }); pset(x + 3, 124, P.luzV); R.recorte(null); }
  // la niebla que corre a ras de la calle
  for (let y = 100; y < 150; y++) { const b = Math.sin(y * 0.22 + t * 0.35) + Math.sin(y * 0.05 - t * 0.2); if (b < 0.7) continue; for (let x = 0; x < 320; x++) if (h(x + Math.floor(t * 4), y, 1000) < (b - 0.7) * 0.3) pset(x, y, a_mez(R.pget(x, y), P.nieblaL, 0.45)); }
  // las palomas que picotean en la acera (se asustan y vuelan si pasa el carruaje cerca)
  for (let k = 0; k < 3; k++) { const x = 96 + k * 11, pk = Math.sin(t * 4 + k * 2) > 0.5 ? 1 : 0, c = hex('#6a6e7a'); rect(x - 2, 139, x + 1, 141, C.k); rect(x - 2, 140, x + 1, 140, c); pset(x + 2, 139 + pk, c); pset(x + 3, 139 + pk, hex('#c88a4a')); pset(x - 3, 139, c); pset(x, 142, hex('#c87a6a')); }
  // el carruaje y su caballo
  if (o.carruaje !== false) a_carruaje(R, t, o.carruaje ?? 200, 150, !!o.marcha, cl);
  return { suelo: 150, libre: [30, 200], acera: [132, 143], carruaje: o.carruaje === false ? null : [o.carruaje ?? 200, (o.carruaje ?? 200) + 90], puertaCoche: [(o.carruaje ?? 200) + 58, (o.carruaje ?? 200) + 70], farolas: [62, 158, 196], puertas: [24, 104, 214, 286], hueco: [140, 176] };
}

// una hilera de casas georgianas entre x0 y x1 con el pretil en y top: ladrillo amarillo hollinado, planta baja de estuco
// con su almohadillado, ventanas de guillotina con sus cuarterones, puertas pintadas con abanico de cristal, aldaba,
// escalones, la verja del patio inglés con sus lanzas y las chimeneas con sus cañones
function a_fachadas(R, x0, x1, top, cl, k) {
  const P = a_P, { rect, pset, disco, linea } = R, c3 = a_mez(P.alba, P.albaL, cl);
  for (let y = top; y < 100; y++) for (let x = x0; x < x1; x++) { const f = Math.floor(y / 3), jx = ((x + (f & 1) * 4) % 8) === 0, n = h(x >> 3, f, 1001 + k), soot = h(x >> 1, y >> 1, 1002) < (1 - (y - top) / 70) * 0.5;
    let c = y % 3 === 0 || jx ? P.stockS : n < 0.2 ? P.stockL : n > 0.85 ? a_mez(P.stock, C.ladrillo, 0.4) : P.stock; if (soot) c = a_mez(c, hex('#2a2a30'), 0.45); pset(x, y, a_mez(c, hex('#2a2c40'), 0.35 - cl * 0.2)); }
  for (let y = 100; y < 132; y++) for (let x = x0; x < x1; x++) pset(x, y, a_mez(y % 6 === 0 || (y > 104 && (x - x0) % 24 === 0) ? P.estucoS : P.estuco, hex('#3a3c50'), 0.3 - cl * 0.15));
  rect(x0, 98, x1 - 1, 100, a_mez(P.estuco, hex('#3a3c50'), 0.2)); rect(x0, top - 3, x1 - 1, top, C.k); rect(x0, top - 2, x1 - 1, top - 1, a_mez(P.estucoS, hex('#3a3c50'), 0.3));
  // las chimeneas del pretil (nunca en la esquina de Atom)
  for (const cx of (k ? [196, 252] : [62, 112])) { rect(cx - 6, top - 14, cx + 6, top - 3, C.k); for (let y = top - 13; y < top - 3; y++) for (let x = cx - 5; x <= cx + 5; x++) pset(x, y, y % 3 === 0 ? P.stockS : a_mez(P.stock, hex('#2a2a30'), 0.4)); rect(cx - 7, top - 15, cx + 7, top - 14, a_mez(P.estucoS, hex('#2a2c40'), 0.3));
    for (const d of [-3, 0, 3]) { rect(cx + d - 1, top - 20, cx + d + 1, top - 15, C.k); rect(cx + d, top - 19, cx + d, top - 15, hex('#8a5a3a')); } }
  // las ventanas: dos o tres alturas, con dintel de piedra, cuarterones y reflejo del alba
  const filas = k ? [[top + 6, 14], [top + 26, 18]] : [[top + 4, 12], [top + 22, 18], [top + 46, 16]];
  for (let x = x0 + 10; x < x1 - 12; x += 26) for (const [wy, wh] of filas) { if (k === 0 && x === 36 && wy === top + 22) continue;
    rect(x - 1, wy - 2, x + 10, wy - 1, a_mez(P.estuco, hex('#3a3c50'), 0.25)); rect(x, wy, x + 9, wy + wh, C.k);
    for (let y = wy + 1; y < wy + wh; y++) for (let xx = x + 1; xx < x + 9; xx++) pset(xx, y, (xx + y) % 5 === 0 ? a_mez(hex('#1e2234'), c3, 0.35) : hex('#1e2234'));
    rect(x + 4, wy + 1, x + 4, wy + wh - 1, hex('#c8c4b8')); for (let y = wy + 4; y < wy + wh; y += 5) rect(x + 1, y, x + 8, y, hex('#c8c4b8')); rect(x - 1, wy + wh, x + 10, wy + wh + 1, a_mez(P.estuco, hex('#3a3c50'), 0.25)); }
  // las puertas con su abanico de cristal, aldaba y escalones; y la verja del patio inglés
  for (const dx of (k ? [214, 286] : [24, 104])) { const col = [hex('#1e2a22'), hex('#4a1a1e'), hex('#1a1a22'), hex('#1e2a3a')][(dx >> 3) % 4];
    rect(dx - 8, 106, dx + 8, 132, C.k); rect(dx - 7, 112, dx + 7, 132, col); for (const [ya, yb] of [[114, 121], [123, 130]]) { rect(dx - 5, ya, dx - 1, yb, a_mez(col, C.k, 0.3)); rect(dx + 1, ya, dx + 5, yb, a_mez(col, C.k, 0.3)); }
    for (let a = 0; a <= 8; a++) linea(dx, 112, dx + Math.round(Math.cos(Math.PI * a / 8) * 7), 112 - Math.round(Math.sin(Math.PI * a / 8) * 6), a % 2 ? P.luzVS : C.k);
    disco(dx, 111, 1, P.luzV); disco(dx, 120, 1, P.oroP); rect(dx - 9, 105, dx + 9, 105, a_mez(P.estuco, C.blanco, 0.2));
    for (let s = 0; s < 3; s++) rect(dx - 9 - s, 132 + s * 2, dx + 9 + s, 133 + s * 2, s % 2 ? P.losaS : P.losa); }
  for (let x = x0; x < x1; x += 4) { const enP = (k ? [214, 286] : [24, 104]).some((d) => Math.abs(x - d) < 12); if (enP) continue; rect(x, 120, x, 132, P.hierro); pset(x, 119, P.hierroL); }
  for (const y of [122, 130]) for (let x = x0; x < x1; x++) if (!(k ? [214, 286] : [24, 104]).some((d) => Math.abs(x - d) < 12)) pset(x, y, P.hierro);
}

// el carruaje cerrado (x: el morro del caballo; suelo): el caballo (x … x+34) con su arnés, vaho y cola; la caja (x+38 …
// x+90) con la puerta, la ventanilla, el farol, el baúl en el techo y el cochero en el pescante; marcha: ruedas que giran
// y patas que andan
function a_carruaje(R, t, x, suelo, marcha, cl) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R, cab = hex('#3a2a1e'), cabS = hex('#24180e'), cabL = hex('#5a4430'), caja = hex('#1e2a2a'), cajaL = hex('#3a4a48'), cajaS = hex('#121a1a');
  x = Math.round(x); const paso = marcha ? t * 6 : 0, cab0 = Math.sin(t * (marcha ? 6 : 1.2)) > 0.3 ? 1 : 0;
  // la sombra en los adoquines
  for (let i = x; i < x + 92; i++) for (let j = 0; j < 3; j++) if (i >= 0 && i < 320) pset(i, suelo + j, a_mez(R.pget(i, suelo + j), C.k, 0.4));
  // el caballo (mira a la izquierda): patas, cuerpo, cuello, cabeza, crin y cola
  const pata = (px, f) => { const d = marcha ? Math.round(Math.sin(paso + f) * 2) : 0; linea(px, suelo - 13, px + d, suelo - 2, C.k); linea(px + 1, suelo - 13, px + 1 + d, suelo - 2, cabS); rect(px + d - 1, suelo - 1, px + d + 2, suelo, hex('#1a1410')); };
  pata(x + 9, 0); pata(x + 13, Math.PI); pata(x + 27, Math.PI); pata(x + 31, 0);
  poligono([[x + 6, suelo - 22], [x + 34, suelo - 23], [x + 36, suelo - 13], [x + 7, suelo - 12]], C.k); poligono([[x + 7, suelo - 21], [x + 33, suelo - 22], [x + 35, suelo - 14], [x + 8, suelo - 13]], cab);
  rect(x + 9, suelo - 21, x + 32, suelo - 20, cabL); rect(x + 9, suelo - 14, x + 33, suelo - 13, cabS);
  poligono([[x + 3, suelo - 33 + cab0], [x + 9, suelo - 35 + cab0], [x + 12, suelo - 21], [x + 6, suelo - 19]], C.k); poligono([[x + 4, suelo - 32 + cab0], [x + 8, suelo - 34 + cab0], [x + 11, suelo - 21], [x + 7, suelo - 20]], cab);
  poligono([[x - 4, suelo - 31 + cab0], [x + 6, suelo - 36 + cab0], [x + 7, suelo - 30 + cab0], [x - 3, suelo - 27 + cab0]], C.k); rect(x - 3, suelo - 31 + cab0, x + 5, suelo - 29 + cab0, cab); pset(x + 2, suelo - 32 + cab0, C.k); pset(x + 6, suelo - 37 + cab0, cab);
  for (let j = 0; j < 12; j++) pset(x + 9 + Math.round(j * 0.2), suelo - 34 + j + cab0, hex('#14100c'));
  rect(x + 5, suelo - 31 + cab0, x + 16, suelo - 31 + cab0, hex('#14100c')); rect(x + 16, suelo - 23, x + 18, suelo - 12, hex('#14100c')); pset(x + 17, suelo - 18, P.oroP);   // el arnés
  { const c = Math.round(Math.sin(t * 1.7) * 2); linea(x + 35, suelo - 21, x + 38 + c, suelo - 10, hex('#14100c')); linea(x + 36, suelo - 21, x + 39 + c, suelo - 11, cabS); }
  { const u = (t * 0.7) % 1; if (u < 0.6) for (let i = 0; i < 4; i++) { const vx = Math.round(x - 6 - u * 10 - i), vy = suelo - 28 + cab0 - Math.round(u * 4) + (i % 2); if (h(i, Math.floor(t * 4), 1003) < 0.7 - u) pset(vx, vy, a_mez(P.nieblaL, C.blanco, 0.4)); } }   // el vaho
  // las varas que unen el caballo al coche
  linea(x + 20, suelo - 16, x + 44, suelo - 14, C.k); linea(x + 20, suelo - 17, x + 44, suelo - 15, cabL);
  // la caja del coche: panel lacado oscuro, ventanilla, puerta con su tirador, el farol y el baúl; el cochero
  const bx = x + 40;
  rect(bx, suelo - 40, bx + 50, suelo - 10, C.k); rect(bx + 1, suelo - 39, bx + 49, suelo - 11, caja); rect(bx + 1, suelo - 39, bx + 49, suelo - 38, cajaL); rect(bx + 1, suelo - 12, bx + 49, suelo - 11, cajaS);
  rect(bx + 18, suelo - 36, bx + 30, suelo - 13, C.k); rect(bx + 19, suelo - 35, bx + 29, suelo - 14, hex('#24302e')); rect(bx + 20, suelo - 34, bx + 28, suelo - 25, a_mez(hex('#1e2234'), P.alba, cl * 0.4)); pset(bx + 21, suelo - 33, hex('#8a8aa0')); disco(bx + 27, suelo - 20, 1, P.oroP);
  rect(bx + 4, suelo - 34, bx + 14, suelo - 25, a_mez(hex('#1e2234'), P.alba, cl * 0.3)); rect(bx + 36, suelo - 34, bx + 46, suelo - 25, a_mez(hex('#1e2234'), P.alba, cl * 0.3)); rect(bx + 4, suelo - 22, bx + 14, suelo - 14, cajaS); rect(bx + 36, suelo - 22, bx + 46, suelo - 14, cajaS);
  rect(bx - 2, suelo - 42, bx + 52, suelo - 40, C.k); rect(bx + 8, suelo - 49, bx + 40, suelo - 42, C.k); rect(bx + 9, suelo - 48, bx + 39, suelo - 43, hex('#5a3a22')); rect(bx + 9, suelo - 48, bx + 39, suelo - 48, hex('#7a5a3a')); for (const xx of [bx + 14, bx + 34]) rect(xx, suelo - 48, xx, suelo - 43, P.oroPS);
  // el pescante y el cochero (figurita de fondo con su sombrero y el látigo)
  rect(bx - 8, suelo - 30, bx, suelo - 28, C.k); rect(bx - 6, suelo - 28, bx - 5, suelo - 16, C.k);
  a_figurita(R, bx - 4, suelo - 30, 13, t, { color: hex('#3a3440'), dir: -1 }); linea(bx - 8, suelo - 38, bx - 22, suelo - 52 + Math.round(Math.sin(t * 1.5) * 2), hex('#2a2018'));
  // el farol del coche
  rect(bx - 2, suelo - 36, bx + 2, suelo - 30, C.k); rect(bx - 1, suelo - 35, bx + 1, suelo - 31, a_mez(P.luzV, P.luzVL, 0.5 + 0.5 * Math.sin(t * 9))); a_halo(R, bx, suelo - 33, 8, P.luzV, 0.25);
  // las ruedas: la trasera grande y la delantera pequeña, con sus radios que giran
  for (const [wx, r] of [[bx + 8, 8], [bx + 40, 10]]) { const wy = suelo - r; disco(wx, wy, r, C.k); disco(wx, wy, r - 1, hex('#5a3a22')); disco(wx, wy, r - 2, C.k);
    for (let s = 0; s < 6; s++) { const a = s * Math.PI / 3 + paso * 0.5; linea(wx, wy, wx + Math.round(Math.cos(a) * (r - 2)), wy + Math.round(Math.sin(a) * (r - 2)), hex('#7a5a3a')); }
    disco(wx, wy, 2, hex('#7a5a3a')); pset(wx, wy, P.oroP); }
}

const b_VACIO = 0x01020304;

const b_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama 4 × 4 (0–1): para los degradados y las luces tramadas
const b_um = (x, y) => (b_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (k = 0, el primero; 1, el segundo)
function b_mez(a, b, k) {
  const r1 = a & 255, g1 = (a >>> 8) & 255, b1 = (a >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((b >>> 16) & 255) - b1) * k) << 16) | (Math.round(g1 + (((b >>> 8) & 255) - g1) * k) << 8) | Math.round(r1 + ((b & 255) - r1) * k)) >>> 0;
}

// los fondos fijos del lago: se pintan una vez en su búfer (lo que no se pinta queda VACIO) y se guardan por su clave
const b_capas = new Map();

function b_fijo(R, clave, dibuja) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(b_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); }
  return b;
}

// pega un fondo fijo sobre lo que hay (salta lo VACIO), entre las filas y0 e y1
function b_pegar(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== b_VACIO) B[i] = c; } }

// aclara (o tiñe) un píxel hacia c en la proporción a (respeta R.recorte)
function b_tine(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, b_mez(R.pget(x, y), c, a)); }

// un halo de luz tramado (vela, fuego, farol): escalones de a/4 con la trama, para que se lea como pixel art
function b_halo(R, cx, cy, r, c, a, ry = r) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue;
    const k = Math.floor(((1 - d) ** 1.4 * 4) + b_um(x, y) - 0.5) / 4 * a; if (k > 0) b_tine(R, x, y, c, k);
  }
}

// el destello de un relámpago sobre todo el plano (una pasada)
function b_destello(R, f, c = hex('#c8d4f4')) { if (f <= 0) return; const B = R.buf, a = 0.3 * f; for (let i = 0; i < 57600; i++) B[i] = b_mez(B[i], c, a); }

// los relámpagos: o.rayo (un instante o una lista) o, si no, uno cada 4,6 s desde 1,2 s; devuelve el destello (0–1),
// el instante del último y dónde cae (x)
function b_rayos(t, o) {
  const lista = o.rayo != null ? [].concat(o.rayo) : null; let t0 = null;
  if (lista) { for (const r of lista) if (t >= r && (t0 == null || r > t0)) t0 = r; }
  else { const k = Math.floor((t - 1.2) / 4.6); if (k >= 0) t0 = 1.2 + k * 4.6; }
  if (t0 == null) return { f: 0, u: 9, x: 160 };
  const u = t - t0, f = u < 0 || u > 0.42 ? 0 : u < 0.07 ? 1 : u < 0.14 ? 0.35 : u < 0.22 ? 0.85 : 0.85 * (1 - (u - 0.22) / 0.2);
  return { f: Math.max(0, f), u, x: 40 + Math.round(h(Math.round(t0 * 10), 1, 810) * 200) };
}

// el rayo: un trazo quebrado con sus ramas, de y0 a y1 (solo mientras dura el destello)
function b_rayo(R, x0, y0, y1, sem) {
  const bl = hex('#f4f4ff'), az = hex('#9aa8f0'); let x = x0, y = y0;
  while (y < y1) { const nx = x + (h(sem, y, 811) - 0.5) * 10, ny = y + 3 + h(sem, y, 812) * 4; R.linea(x, y, nx, ny, bl); R.pset(Math.round(nx) + 1, Math.round(ny), az);
    if (h(sem, y, 813) < 0.2) { let bx = nx, by = ny; for (let i = 0; i < 4; i++) { const ax = bx + (h(sem, y + i, 814) - 0.3) * 8, ay = by + 3; R.linea(bx, by, ax, ay, az); bx = ax; by = ay; } }
    x = nx; y = ny; }
}

// la lluvia en diagonal: n trazos de largo L que caen a v px/s con el viento (inclinación dx por px), entre y0 e y1
function b_lluvia(R, t, n, dx, L, y0, y1, c, c2, sem, v = 190) {
  const alto = y1 - y0 + 20;
  for (let k = 0; k < n; k++) { const vv = v * (0.8 + h(k, sem, 820) * 0.4), yy = ((h(k, sem, 821) * alto + t * vv) % alto) + y0 - 10, x0 = h(k, sem, 822) * 360 - 20 + (yy - y0) * dx * 0.5 + Math.floor((h(k, sem, 821) * alto + t * vv) / alto) * 53;
    const x = ((x0 % 360) + 360) % 360 - 20; for (let i = 0; i < L; i++) R.pset(Math.round(x - i * dx * 0.5), Math.round(yy - i), i < 2 ? c : c2); }
}

// las paletas del lago: un día gris y frío de junio (0) y la tormenta (1), mezcladas según o.tormenta
const b_DIA = { c0: '#76808f', c1: '#8a94a2', c2: '#9ea6b2', c3: '#b2b8c2', nS: '#6e7484', n: '#8e94a2', nL: '#b4bac6', nB: '#cfd4dc',
  m0: '#9aa4b8', m0S: '#76809a', m1: '#6a7488', m1S: '#525a6e', nv: '#eef0f6', nvS: '#b4bed2', roca: '#5e6474', rocaS: '#444858', bru: '#aab2c0',
  jura: '#56665e', juraS: '#3e4c48', juraL: '#6a7a6a', ag0: '#9aa4b0', ag1: '#6a7888', ag2: '#4a5868', ag3: '#36424f', ola: '#b0bac4', esp: '#e2e6ec',
  hb: '#5e7248', hbS: '#46583a', hbL: '#7a8e5a', hbD: '#34422c', ti: '#6e5c48', tiS: '#52443a', viL: '#7e9258', vi: '#5a6e40',
  mu: '#d8ccb0', muS: '#b0a48c', muL: '#ece2cc', te: '#8a5a44', teS: '#64402e', teL: '#a8735a', pi: '#6a6e78', piS: '#4a4e58', piL: '#8a8e98',
  pz: '#a8a094', pzS: '#7e786e', pzL: '#c4bcae', ma: '#7a5a3a', maS: '#54402a', maL: '#9a7a52', ve: '#4a6a4a', veS: '#344a36' };

const b_TOR = { c0: '#22252f', c1: '#2a2e3a', c2: '#343846', c3: '#424656', nS: '#191b22', n: '#2a2d38', nL: '#3e4252', nB: '#575c6e',
  m0: '#4c556a', m0S: '#363d52', m1: '#323a4a', m1S: '#252b38', nv: '#a8b2c6', nvS: '#6c7690', roca: '#2e3240', rocaS: '#22252f', bru: '#4a5062',
  jura: '#263230', juraS: '#1a2424', juraL: '#34423e', ag0: '#4e5866', ag1: '#323c4a', ag2: '#242c38', ag3: '#1a2028', ola: '#6a7888', esp: '#c8d0dc',
  hb: '#36442c', hbS: '#283422', hbL: '#4a5a36', hbD: '#1e2818', ti: '#463a30', tiS: '#342a24', viL: '#4a5a36', vi: '#36442a',
  mu: '#8a8474', muS: '#6a6458', muL: '#a49c88', te: '#5a3a2e', teS: '#402820', teL: '#6e4a3a', pi: '#3e424c', piS: '#2c3038', piL: '#555a66',
  pz: '#5e5a54', pzS: '#46423e', pzL: '#76706a', ma: '#4a3828', maS: '#34281c', maL: '#62503a', ve: '#2e4232', veS: '#203024' };

const b_pals = new Map();

function b_pal(tor) {
  const k = Math.round(tor * 20); if (b_pals.has(k)) return b_pals.get(k);
  const P = {}; for (const n in b_DIA) P[n] = b_mez(hex(b_DIA[n]), hex(b_TOR[n]), k / 20); b_pals.set(k, P); return P;
}

// el contorno de los dos fondos de montañas: [picos: x, alto, pendiente izquierda, derecha]
const b_ALPES = [[22, 30, 0.9, 1.1], [58, 38, 1.0, 0.8], [96, 50, 0.85, 0.75], [118, 44, 0.9, 1.0], [150, 34, 0.8, 1.2], [184, 28, 0.9, 0.9], [226, 24, 0.8, 1.1], [262, 20, 0.9, 0.8], [300, 22, 0.7, 0.9], [330, 14, 0.8, 0.8]];

const b_JURA = [[-10, 14, 0.4, 0.3], [70, 16, 0.35, 0.3], [150, 12, 0.3, 0.4], [250, 10, 0.4, 0.3], [330, 12, 0.3, 0.3]];

// la cordillera: cada columna toma el pico más alto; la ladera de la izquierda en luz y la de la derecha en sombra,
// la nieve de las cumbres con sus canales de roca, y la bruma que sube desde el pie (perspectiva aérea)
function b_sierra(R, picos, base, P, nieve, sem) {
  for (let x = 0; x < 320; x++) {
    let top = 999, luz = true, pk = 0;
    for (const [px, al, pi, pd] of picos) { const d = x - px, hh = al - (d < 0 ? -d * pi : d * pd); const tp = base - hh; if (tp < top) { top = tp; luz = d < 0; pk = px; } }
    top = Math.round(top + (h(x >> 1, sem, 830) - 0.5) * 2.5 + Math.sin(x * 0.7 + sem) * 0.6);
    const sd = nieve * (0.55 + h(x >> 2, sem, 831) * 0.7), gully = h(x >> 1, sem, 832) < 0.22;
    for (let y = Math.max(0, top); y <= base; y++) {
      const dy = y - top; let c;
      const sub = h(x >> 2, y >> 3, sem + 833) < 0.18;   // aristas y repechos dentro de la ladera
      const lado = sub ? !luz : luz;
      if (dy < sd && !(gully && dy > 2)) c = lado ? P.nv : P.nvS;
      else if (dy < sd * 1.7 && h(x, y, sem + 834) < 0.35 - (dy - sd) / sd * 0.3) c = lado ? P.nvS : P.roca;   // los neveros sueltos
      else c = lado ? (nieve ? P.m0 : P.m1) : (nieve ? P.m0S : P.m1S);
      if (!nieve && h(x >> 1, y >> 1, sem + 835) < 0.3) c = lado ? P.juraL : P.juraS;   // el bosque de la ladera
      const bru = (y - (base - 22)) / 22; if (bru > 0 && b_um(x, y) < bru * 0.75) c = b_mez(c, P.bru, 0.55);
      R.pset(x, y, c);
    }
    if (top >= 0 && Math.abs(x - pk) < 1 && nieve) R.pset(x, top, P.nv);
  }
}

// el perfil de la colina de Diodati (de la orilla, x 150, a la derecha) y su orilla con el agua
const b_colina = (x) => x < 150 ? 999 : x < 178 ? 150 - (x - 150) * 2.05 + Math.sin(x * 0.4) * 1.2 : x < 272 ? 92 + Math.round(Math.sin(x * 0.21) * 0.6) : 92 + (x - 272) * 0.13;

const b_orillaD = (x) => 150 - (x - 150) * 0.15;

// la tierra de la casita (a la izquierda) y la orilla de delante
const b_tierraI = (x) => x < 112 ? 132 + Math.sin(x * 0.11) * 2 + x * 0.02 : x < 124 ? 134 + (x - 112) * 1.4 : 999;

const b_orilla = (x) => 150 + Math.round(Math.sin(x * 0.13) * 1.2 + Math.sin(x * 0.041 + 1) * 1.5);

// las ventanas de la villa ([x0, y0, x1, y1]) y de la casita, para encenderlas
const b_VENT_V = [[194, 58, 198, 63], [206, 58, 210, 63], [218, 58, 222, 63], [230, 58, 234, 63], [242, 58, 246, 63], [194, 68, 198, 76], [206, 68, 210, 76], [218, 68, 222, 76], [230, 68, 234, 76], [242, 68, 246, 76]];

const b_VENT_C = [[64, 120, 68, 125], [76, 120, 80, 125], [98, 120, 102, 125], [64, 130, 68, 135], [98, 130, 102, 135]];

// EL PAISAJE DEL LAGO (para el encuadre general y para lo que se ve por la ventana): el cielo tramado con nubarrones de
// tres tonos a tres velocidades, los Alpes con nieve y el Jura, la orilla de enfrente con sus pueblos, el agua con su
// oleaje, sus reflejos y la barca de velas latinas, la colina de Diodati con las viñas en bancales, el camino, la
// villa y la casita con su embarcadero, los álamos, el humo, las ventanas encendidas y la lluvia (con tor > 0).
function b_paisaje(R, t, tor, o = {}) {
  const P = b_pal(tor), B = R.buf, hor = 87, vto = 0.25 + tor * 1.1, F = tor > 0.3 ? b_rayos(t, o) : { f: 0, u: 9, x: 0 };
  const kF = Math.round(tor * 4), fijo = b_fijo(R, 'lagoFijo' + kF, () => b_lagoFijo(R, b_pal(kF / 4)));
  // ── el cielo: el degradado tramado (más oscuro arriba)
  const cs = [P.c0, P.c1, P.c2, P.c3];
  for (let y = 0; y < hor; y++) { const f = y * 320, u = (y / hor) ** 0.9 * 3.6; for (let x = 0; x < 320; x++) B[f + x] = cs[Math.max(0, Math.min(3, Math.floor(u + b_um(x, y) - 0.5)))]; }
  // las nubes: estratos lejanos junto a las montañas, nubarrones en medio y jirones bajos y rápidos arriba
  R.recorte([0, 0, 319, hor]);
  const tonoN = (k) => F.f > 0.3 ? [b_mez(P.nS, hex('#8a94c8'), 0.5 * F.f), b_mez(P.n, hex('#b8c0ec'), 0.5 * F.f), b_mez(P.nL, hex('#e0e6ff'), 0.6 * F.f)] : k === 0 ? [P.n, P.nL, P.nB] : k === 1 ? [P.nS, P.n, P.nL] : [P.nS, P.nS, P.n];
  for (let k = 0; k < 6; k++) { const w = 70 + h(k, 1, 840) * 60, x = ((h(k, 2, 840) * 460 + t * (1.2 + tor * 2)) % 520) - 110, y = 46 + (k % 3) * 7; b_nubarron(R, x, y, w, k, tonoN(0), 0.42); }
  for (let k = 0; k < 5; k++) { const w = 60 + h(k, 3, 840) * 50, x = ((h(k, 4, 840) * 480 + t * (3 + tor * 5)) % 560) - 120, y = 24 + (k % 2) * 12 + h(k, 5, 840) * 6; b_nubarron(R, x, y, w, k + 10, tonoN(1), 0.75 + tor * 0.2); }
  for (let k = 0; k < 4; k++) { const w = 46 + h(k, 6, 840) * 40, x = ((h(k, 7, 840) * 500 + t * (8 + tor * 16)) % 600) - 140, y = 6 + k * 5; if (tor > 0.2 || k < 2) b_nubarron(R, x, y, w, k + 20, tonoN(2), 0.35); }
  R.recorte(null);
  if (F.f > 0.5 && F.u < 0.25) b_rayo(R, F.x + 40, 20, 70, Math.round((t - F.u) * 10));
  // las gaviotas (con calma planean; con tormenta, una lucha contra el viento y va hacia atrás)
  for (let k = 0; k < (tor < 0.5 ? 3 : 1); k++) { const vx = tor < 0.5 ? 6 + k * 2 : -4, x = Math.round(((h(k, 8, 840) * 300 + t * vx) % 340 + 340) % 340 - 10), y = 34 + k * 7 + Math.round(Math.sin(t * 1.1 + k) * 3), a = Math.sin(t * (tor < 0.5 ? 3 : 7) + k * 2) > 0 ? 1 : 0;
    if (x > 268 && y < 48) continue; const cg = tor < 0.5 ? hex('#eef0f4') : hex('#b8c0cc'); R.pset(x, y, cg); R.pset(x - 1, y - a, cg); R.pset(x - 2, y - 1 + a, P.nS); R.pset(x + 1, y - a, cg); R.pset(x + 2, y - 1 + a, P.nS); }
  // ── el agua (solo donde el fondo fijo deja ver): base por la distancia, crestas, espuma y el reflejo de lo de arriba
  const calma = 1 - tor;
  for (let x = 0; x < 320; x++) { let s = hor;
    for (let y = hor; y < 154; y++) { const i = y * 320 + x; if (fijo[i] !== b_VACIO) { s = y + 1; continue; }
      const u = (y - hor) / 66, ag = [P.ag0, P.ag1, P.ag2, P.ag3];
      let c = ag[Math.max(0, Math.min(3, Math.floor(u * 3.2 + b_um(x, y) * 0.9 - 0.2)))];
      // el reflejo: lo que hay justo encima de la orilla, temblando
      const wob = Math.round(Math.sin(y * 0.9 + t * 2.2) * (0.6 + u * 1.5 + tor)), yr = 2 * s - y - 1, xr = x + wob;
      if (yr >= 0 && xr >= 0 && xr < 320 && yr < s && s > hor) { const cr = fijo[yr * 320 + xr]; if (cr !== b_VACIO) c = b_mez(c, cr, 0.42 * calma + 0.12); }
      else if (s === hor && y < hor + 14 && calma > 0.3) c = b_mez(c, P.m0S, 0.25 * calma * (1 - (y - hor) / 14));
      // el oleaje: crestas cortas que corren con el viento, más largas y juntas cerca
      const per = Math.round(24 - u * 12), ln = 2 + u * 4 + tor * 3, fase = h(y, 0, 841) * per + t * (3 + u * 9) * (0.4 + tor);
      const m = ((x + fase) % per + per) % per, fila = u > 0.5 || (y & 1) === 0;
      if (fila && m < ln) c = (tor > 0.35 && h(Math.floor((x + fase) / per), y, Math.floor(t * 1.5)) < tor * 0.4) ? P.esp : b_mez(c, P.ola, 0.55 + u * 0.2);
      else if (fila && m < ln + 1.5 && u > 0.3) c = b_mez(c, P.ag3, 0.5);
      B[i] = c; } }
  // la barca del lago, con sus dos velas latinas (la tapan la colina y la orilla porque va antes que el fondo fijo)
  const bxa = ((t * 4.2 + 40) % 260) - 40, bya = 104, cab = Math.sin(t * (1.3 + tor * 2.5)) * (0.6 + tor * 1.6);
  b_barca(R, Math.round(bxa), bya, cab, tor, P);
  b_pegar(R, fijo);
  // las cortinas de lluvia que barren las montañas y el lago
  if (tor > 0.1) for (let y = 14; y < 150; y++) { const f = y * 320; for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.045 - t * 0.9 + Math.sin(x * 0.013 + t * 0.2) * 2) * 0.5 + 0.5; if (v * tor > 0.42 && b_um(x, y + Math.floor(t * 40)) < (v * tor - 0.42) * 2.2) B[f + x] = b_mez(B[f + x], P.bru, 0.45); } }
  // los álamos de la casita, el castaño del embarcadero y los cipreses de la villa, que se doblan con el viento
  const sw = (k) => Math.sin(t * (1.1 + tor * 2.2) + k) * (0.6 + tor * 1.6) + tor * 2.2;
  b_alamo(R, 30, 138, 62, sw(0), P); b_alamo(R, 44, 140, 52, sw(1.3), P); b_alamo(R, 120, 136, 30, sw(2.1), P, true);
  b_cipres(R, 179, 93, 30, sw(0.6) * 0.6, P); b_cipres(R, 264, 93, 26, sw(1.7) * 0.6, P); b_cipres(R, 168, 112, 18, sw(2.6) * 0.6, P);
  // el humo de las chimeneas, que se tumba con el viento
  for (const [cx, cy, k] of [[100, 98, 0], [205, 36, 1], [235, 36, 2]]) for (let i = 0; i < 18; i++) { const u = ((t * 0.4 + i / 18 + k * 0.3) % 1), px = cx + 1 + u * (10 + vto * 26) + Math.sin(t * 1.5 + u * 6 + k) * 1.5 * u, py = cy - u * (16 - tor * 10), r = 1 + u * (3 - tor * 1.2);
    if (px > 270 && py < 46) continue; R.disco(px, py, r, b_mez(u < 0.4 ? P.muL : P.muS, P.c2, u * 0.9)); }
  // las ventanas encendidas: con tormenta, la villa y la casita tienen velas dentro (tiemblan)
  const luzV = hex('#ffd890'), luzS = hex('#e8a040');
  b_VENT_V.forEach(([x0, y0, x1, y1], k) => { const enc = tor > 0.25 && h(k, 1, 845) < 0.3 + tor * 0.4; if (!enc) return; const fl = Math.sin(t * 7 + k * 3) > -0.6; R.rect(x0, y0 + 1, x1, y1, fl ? luzV : luzS); R.rect(x0, y0, x1, y0, luzS); if (k >= 5) R.rect(x0, y0 + 4, x1, y0 + 4, P.pi); });
  b_VENT_C.forEach(([x0, y0, x1, y1], k) => { if (k !== 1 && !(tor > 0.4 && k === 3)) return; const fl = Math.sin(t * 6 + k) > -0.5; R.rect(x0, y0, x1, y1, fl ? luzV : luzS); R.rect(x0 + 2, y0, x0 + 2, y1, P.ma); });
  // alguien en el balcón de la villa (calma) o que sube por el camino de las viñas con un farol (tormenta)
  if (tor < 0.4) { const x = 226 + Math.round(Math.sin(t * 0.3) * 10); R.rect(x, 71, x + 1, 76, hex('#3a3a5a')); R.pset(x, 70, hex('#e8c0a0')); R.pset(x + 1, 70, hex('#5a3a2a')); }
  else { const u = (t * 0.035) % 1, [px, py] = b_enCamino(u), paso = Math.floor(t * 4) % 2; R.rect(px - 1, py - 6, px + 1, py - 2, hex('#2a2a3a')); R.pset(px, py - 7, hex('#d8b090')); R.pset(px - 1 + paso, py - 1, hex('#1a1a24')); R.pset(px + 1 - paso, py - 1, hex('#1a1a24'));
    R.pset(px - 2, py - 8, hex('#1a1a24')); R.pset(px + 2, py - 8, hex('#1a1a24')); R.pset(px, py - 9, hex('#1a1a24')); R.linea(px - 2, py - 8, px + 2, py - 8, hex('#1a1a24'));   // el paraguas
    const fl = Math.sin(t * 9) > -0.4 ? luzV : luzS; R.pset(px + 2, py - 3, fl); b_halo(R, px + 2, py - 3, 6, luzV, 0.4); }
  // el bote amarrado al embarcadero, que cabecea, con su cabo
  { const bb = Math.round(Math.sin(t * (1.6 + tor * 2)) * (0.6 + tor)), bx = 132, by = 146 + bb; R.linea(147, 134, bx + 14, by - 2, hex('#c8b890'));
    R.rect(bx, by - 2, bx + 16, by, P.maS); R.rect(bx + 1, by - 2, bx + 15, by - 2, P.maL); R.rect(bx + 2, by + 1, bx + 14, by + 1, P.maS); R.pset(bx - 1, by - 3, P.maS); R.pset(bx + 17, by - 3, P.maS); R.rect(bx + 6, by - 3, bx + 9, by - 3, P.ma); R.linea(bx + 3, by - 4, bx + 13, by - 6 - bb, P.maL);
    for (let i = bx - 2; i < bx + 19; i++) if ((i + Math.floor(t * 4)) % 3 === 0) R.pset(i, by + 2, P.ola); }
  // dos cisnes que se deslizan por el agua de la derecha (con calma), con su estela
  if (tor < 0.5) for (let k = 0; k < 2; k++) { const x = Math.round(300 - ((t * 2.2 + k * 14) % 90)), y = 144 + k * 2 + Math.round(Math.sin(t * 1.2 + k)), bl = hex('#f0f0ec'), blS = hex('#c4c8cc');
    R.rect(x, y - 2, x + 5, y, bl); R.rect(x + 1, y, x + 5, y, blS); R.rect(x + 5, y - 3, x + 6, y - 1, bl); R.pset(x, y - 6, bl); R.linea(x, y - 2, x, y - 6, bl); R.pset(x - 1, y - 6, hex('#e0702a')); R.pset(x + 1, y - 6, hex('#1a1a1a')); R.pset(x + 4, y - 3, bl);
    for (let i = 1; i < 10; i++) if (i % 2) { R.pset(x + 6 + i, y + 1 + (i >> 2), P.ola); } }
  // la orilla: el agua que lame los guijarros
  for (let x = 0; x < 320; x++) { const y = b_orilla(x) - 1, w = Math.sin(x * 0.3 - t * 2.4) + Math.sin(x * 0.11 + t * 1.3); if (w > 0.9 + (1 - tor) * 0.4) { R.pset(x, y, P.esp); if (w > 1.4) R.pset(x, y - 1, P.ola); } }
  // la lluvia: la capa del medio (la lejana está en las cortinas; la cercana, en lagoDelante)
  if (tor > 0.1) { b_lluvia(R, t, Math.round(170 * tor), 1.4 + tor * 2, 6, 0, 180, b_mez(P.ola, P.esp, 0.4), P.ag0, 1, 230); b_lluvia(R, t, Math.round(150 * tor), 1.2 + tor * 2, 3, 0, 150, b_mez(P.ola, P.c3, 0.4), P.ag1, 2, 160); }
  if (F.f > 0) b_destello(R, F.f * tor);
  return { rayo: F.f * tor, bote: [140, 146], barca: [Math.round(bxa), bya] };
}

// un punto del camino de las viñas, de la casita (u = 0) a la villa (u = 1)
const b_CAMINO = [[116, 140], [160, 134], [150, 124], [184, 118], [172, 108], [206, 104], [216, 96]];

function b_enCamino(u) { const n = b_CAMINO.length - 1, k = Math.min(n - 1, Math.floor(u * n)), f = u * n - k, [a, b] = [b_CAMINO[k], b_CAMINO[k + 1]]; return [Math.round(a[0] + (b[0] - a[0]) * f), Math.round(a[1] + (b[1] - a[1]) * f)]; }

// un nubarrón de tres tonos (sombra abajo, cuerpo, luz arriba); ap < 1 lo aplasta
function b_nubarron(R, cx, cy, w, sem, [c0, c1, c2], ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 850)) * ap; bolas.push([cx + u * w * 0.9, cy - r * 0.4 + (h(i, sem, 851) - 0.5) * w * 0.08 * ap, r]); }
  for (const [x, y, r] of bolas) R.disco(x, y + 1.5, r, c0);
  for (const [x, y, r] of bolas) R.disco(x, y - 0.5, r * 0.9, c1);
  for (const [x, y, r] of bolas) R.disco(x - 1.5, y - 2, r * 0.55, c2);
  for (let x = Math.round(cx - w * 0.48); x <= Math.round(cx + w * 0.48); x++) if (h(x >> 1, sem, 852) < 0.7) R.pset(x, Math.round(cy + w * 0.07 * ap) + 1, c0);
}

// la barca del Lemán: casco oscuro y dos velas latinas (con tormenta, rizadas); cab: cabeceo
function b_barca(R, x, y, cab, tor, P) {
  const casco = hex('#3a2e26'), vela = b_mez(hex('#e8e0cc'), hex('#9a968c'), tor), velaS = b_mez(hex('#c0b8a4'), hex('#6a665e'), tor), alto = tor > 0.5 ? 10 : 15;
  R.rect(x - 9, y - 1, x + 9, y + 1, casco); R.rect(x - 7, y + 2, x + 7, y + 2, casco); R.pset(x - 10, y - 2, casco); R.pset(x + 10, y - 2, casco); R.rect(x - 9, y - 1, x + 9, y - 1, hex('#6a4a36'));
  for (const [mx, s] of [[-3, 1], [4, 0.8]]) { const top = y - Math.round(alto * s), ld = Math.round(cab);
    R.linea(x + mx, y - 1, x + mx + ld, top, casco);
    R.poligono([[x + mx + ld, top - 2], [x + mx + ld + 9 * s, top + alto * s * 0.75], [x + mx - 6 * s, y - 2]], vela);
    R.linea(x + mx + ld, top - 2, x + mx - 6 * s, y - 2, velaS); }
  R.pset(x - 4, y - 3, hex('#c84a3a'));
  for (let i = -12; i <= 12; i += 2) R.pset(x + i, y + 3, P.ola);
}

// un álamo (alto y estrecho) o, con ancho, un castaño redondo; sw: cuánto se dobla la copa
function b_alamo(R, x, suelo, alto, sw, P, ancho = false) {
  R.rect(x, suelo - Math.round(alto * 0.3), x + 1, suelo, P.maS);
  for (let j = 0; j < alto * 0.85; j++) { const u = j / alto, w = ancho ? Math.round(Math.sin(Math.min(1, u * 1.2) * Math.PI) * 10) : Math.round(Math.sin(Math.min(1, u * 1.15) * Math.PI) * 4.2 + 1), y = suelo - Math.round(alto * 0.15) - j, dx = Math.round(sw * u * u * 2.2);
    for (let i = -w; i <= w; i++) { const n = h(x + i, y, 860), c = n < 0.15 ? P.veS : i < -w * 0.3 ? (n < 0.6 ? P.hbL : P.hb) : i > w * 0.4 ? P.veS : n < 0.35 ? P.hbL : P.ve; R.pset(x + i + dx, y, (i === -w || i === w) && n < 0.5 ? P.veS : c); } }
}

// un ciprés: una llama oscura que se mece un poco
function b_cipres(R, x, suelo, alto, sw, P) {
  for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.round((1 - u) ** 0.7 * 3.4 * Math.min(1, (j + 2) / 5)), y = suelo - j, dx = Math.round(sw * u * u * 2);
    for (let i = -w; i <= w; i++) R.pset(x + i + dx, y, i < 0 ? (h(i, y, 861) < 0.4 ? P.ve : P.veS) : h(i, y, 862) < 0.25 ? P.ve : P.juraS); }
}

// EL FONDO FIJO DEL LAGO (lo que no se mueve, en la paleta del tono de tormenta): los Alpes y el Jura, la orilla de
// enfrente con sus pueblos, la colina de Diodati con sus viñas, su muro y la villa, la tierra de la casita con su
// huerto, la casita y el embarcadero, y la orilla de delante (guijarros, hierba y el camino); lo demás queda VACIO
function b_lagoFijo(R, P) {
  const { rect, pset, linea } = R;
  b_sierra(R, b_ALPES, 80, P, 9, 1);
  b_sierra(R, b_JURA, 85, P, 0, 2);
  // la orilla de enfrente: una franja de prados y árboles con los pueblos (tejados y fachadas diminutas)
  for (let x = 0; x < 320; x++) { for (let y = 84; y <= 86; y++) pset(x, y, h(x, y, 870) < 0.4 ? P.juraS : P.jura); if (h(x >> 1, 1, 871) < 0.3) pset(x, 83, P.juraS); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 872) * 300 + 6), w = 2 + Math.round(h(k, 2, 872) * 3); rect(x, 84, x + w, 85, P.muL); rect(x, 83, x + w, 83, P.te); if (k % 4 === 0) { rect(x + 1, 79, x + 1, 83, P.muL); pset(x + 1, 78, P.pi); } }
  // ── la colina de Diodati: bancales de viña con sus muros de piedra, la tierra, las cepas y el camino
  for (let x = 150; x < 320; x++) { const top = Math.round(b_colina(x)), bot = Math.round(b_orillaD(x));
    for (let y = top; y <= bot; y++) { const v = y + (x - 230) * 0.06, fila = ((Math.floor(v) % 7) + 7) % 7, luz = x < 200 ? 1 : 0;
      let c = fila === 0 ? (h(x, y, 873) < 0.5 ? P.pzL : P.pz) : fila === 1 ? P.tiS : fila < 4 ? (h(x >> 1, y, 874) < 0.5 ? P.ti : P.tiS) : P.hb;
      if (fila >= 2 && fila <= 4 && (x + Math.floor(v / 7) * 2) % 4 === 0) c = fila === 2 ? P.viL : P.vi;   // las cepas con sus hojas
      if (fila === 3 && (x + Math.floor(v / 7) * 2) % 4 === 1 && h(x, y, 875) < 0.5) c = P.vi;
      if (y < top + 2) c = P.hbL;
      if (y > bot - 3) c = h(x, y, 876) < 0.5 ? P.pzS : P.pz;   // las piedras de la orilla
      if (!luz && b_um(x, y) < 0.25) c = b_mez(c, P.juraS, 0.35);
      pset(x, y, c); } }
  for (let k = 0; k < b_CAMINO.length - 1; k++) { const [a, b] = [b_CAMINO[k], b_CAMINO[k + 1]]; if (a[0] < 150) continue; linea(a[0], a[1], b[0], b[1], P.muS); linea(a[0], a[1] - 1, b[0], b[1] - 1, P.muL); }
  // el jardín de la villa: el césped, el muro de la terraza con su balaustrada y la escalinata
  rect(176, 90, 272, 92, P.hbL); rect(176, 93, 272, 99, P.pz);
  for (let y = 93; y <= 99; y++) for (let x = 176; x <= 272; x++) { if ((y - 93) % 3 === 2 || (x + (((y - 93) / 3) | 0) * 4) % 8 === 0) pset(x, y, P.pzS); else if (h(x, y, 877) < 0.12) pset(x, y, P.pzL); }
  for (let x = 177; x <= 271; x += 3) { pset(x, 90, P.muL); pset(x, 91, P.muS); } rect(176, 89, 272, 89, P.muL);
  for (let j = 0; j < 6; j++) rect(214 - j, 93 + j, 226 + j, 93 + j, j % 2 ? P.pzS : P.pzL);
  // ── VILLA DIODATI: el tejado a cuatro aguas, las chimeneas, la fachada clara de tres alturas, el balcón corrido
  // con su barandilla sobre la galería de columnas, y las contraventanas verdes
  for (let y = 43; y <= 53; y++) { const u = (y - 43) / 10, x0 = Math.round(200 - u * 18), x1 = Math.round(240 + u * 18);
    for (let x = x0; x <= x1; x++) { const derecha = x > 240 + (y - 43) * 0.2, fila = (y - 43) % 2 === 1; let c = derecha ? P.teS : P.te; if (fila) c = P.teS; else if ((x + y) % 4 === 0) c = derecha ? P.teS : P.teL; if (x === x0 || x === x1) c = P.teS; pset(x, y, c); } }
  rect(200, 42, 240, 42, P.teL);
  for (const cx of [204, 234]) { rect(cx, 36, cx + 3, 44, P.muS); rect(cx, 36, cx + 1, 44, P.mu); rect(cx - 1, 35, cx + 4, 35, P.pzS); }
  rect(184, 54, 256, 55, P.muL); rect(184, 56, 256, 56, P.muS);
  for (let y = 57; y <= 90; y++) for (let x = 186; x <= 254; x++) { let c = h(x, y, 878) < 0.1 ? P.muS : h(x, y, 879) < 0.08 ? P.muL : P.mu; if (x > 249) c = b_mez(c, P.muS, 0.6); if ((x === 186 || x === 187 || x === 253 || x === 254) && ((y >> 2) & 1)) c = P.muL; pset(x, y, c); }
  rect(186, 66, 254, 66, P.muL); rect(186, 67, 254, 67, P.muS);
  b_VENT_V.forEach(([x0, y0, x1, y1], k) => { rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.muS); rect(x0, y0, x1, y1, P.pi); rect(x0, y0, x1, y0, P.piS); pset(x0 + 1, y0 + 1, P.piL); rect((x0 + x1) >> 1, y0, (x0 + x1) >> 1, y1, P.piS); if (k >= 5) rect(x0, y0 + 4, x1, y0 + 4, P.piS);
    rect(x0 - 3, y0, x0 - 2, y1, P.ve); rect(x1 + 2, y0, x1 + 3, y1, P.veS); for (let y = y0 + 1; y < y1; y += 2) { pset(x0 - 3, y, P.veS); pset(x1 + 3, y, P.juraS); } rect(x0 - 1, y1 + 2, x1 + 1, y1 + 2, P.muL); });
  // el balcón con su barandilla y la galería de columnas de abajo
  rect(183, 78, 257, 79, P.muL); rect(183, 80, 257, 80, P.muS);
  for (let x = 184; x <= 256; x++) { pset(x, 73, P.piS); if (x % 2 === 0) for (let y = 74; y < 78; y++) pset(x, y, P.piS); }
  for (let y = 81; y <= 90; y++) for (let x = 186; x <= 254; x++) { const k = (x - 186) % 12, arco = k >= 3 && k <= 10 && (y > 83 || (y === 83 && k > 3 && k < 10) || (y === 82 && k > 4 && k < 9));
    pset(x, y, arco ? (y > 87 ? P.piS : h(x, y, 880) < 0.2 ? P.pi : P.piS) : k === 0 || k === 1 ? P.muL : k === 2 ? P.muS : P.mu); }
  rect(184, 90, 256, 90, P.pzS);
  // ── la tierra de la casita: el huerto (surcos), el césped, el muro bajo y las matas
  for (let x = 0; x < 124; x++) { const top = Math.round(b_tierraI(x)); for (let y = top; y < 152; y++) { let c = P.hb; const n = h(x, y, 881);
    if (x > 6 && x < 50 && y > top + 3 && y < 146) c = (y + (x >> 3)) % 3 === 0 ? P.tiS : (x % 4 === 0 ? P.viL : P.ti);   // el huerto en surcos
    else c = n < 0.2 ? P.hbS : n < 0.32 ? P.hbL : P.hb; if (y === top) c = P.hbL; pset(x, y, c); } }
  for (let x = 50; x <= 118; x++) { pset(x, 139, P.pzL); pset(x, 140, x % 5 === 0 ? P.pzS : P.pz); pset(x, 141, P.pzS); }
  for (const [mx, my] of [[54, 138], [112, 137], [6, 134]]) { R.disco(mx, my, 3, P.veS); R.disco(mx - 0.5, my - 0.8, 2, P.ve); pset(mx - 1, my - 2, P.hbL); }
  // ── LA CASITA (Maison Chapuis): el tejado de teja, la chimenea, el muro de estuco, las contraventanas y la puerta
  for (let y = 104; y <= 115; y++) { const u = (y - 104) / 11, x0 = Math.round(66 - u * 12), x1 = Math.round(102 + u * 12);
    for (let x = x0; x <= x1; x++) { const fila = (y - 104) % 2 === 1; let c = x > 102 ? P.teS : P.te; if (fila) c = P.teS; else if ((x + y) % 4 === 0) c = P.teL; if (x === x0 || x === x1) c = P.teS; pset(x, y, c); } }
  rect(66, 103, 102, 103, P.teL); rect(98, 97, 101, 105, P.muS); rect(98, 97, 99, 105, P.mu); rect(97, 96, 102, 96, P.pzS);
  for (let y = 116; y <= 140; y++) for (let x = 56; x <= 112; x++) { let c = h(x, y, 882) < 0.1 ? P.muS : h(x, y, 883) < 0.07 ? P.muL : P.mu; if (x > 107) c = b_mez(c, P.muS, 0.55); if (y > 137) c = P.muS; pset(x, y, c); }
  rect(56, 116, 112, 116, P.teS); rect(56, 117, 112, 117, P.muS); rect(56, 128, 112, 128, P.muL);
  b_VENT_C.forEach(([x0, y0, x1, y1]) => { rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.muS); rect(x0, y0, x1, y1, P.pi); pset(x0 + 1, y0 + 1, P.piL); rect(x0 - 3, y0, x0 - 2, y1, P.ve); rect(x1 + 2, y0, x1 + 3, y1, P.veS); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, P.muL); });
  rect(86, 129, 93, 140, P.maS); rect(87, 130, 92, 140, P.ma); rect(89, 130, 89, 140, P.maS); pset(91, 135, P.muL); rect(84, 127, 95, 128, P.teS);
  for (let x = 84; x <= 95; x++) pset(x, 126, x % 2 ? P.ve : P.veS);   // la parra sobre la puerta
  // el embarcadero de tablas con sus postes
  for (let x = 110; x <= 150; x++) { const y = Math.round(142 - (x - 110) * 0.2); rect(x, y, x, y + 2, (x - 110) % 4 === 0 ? P.maS : P.ma); pset(x, y, P.maL); pset(x, y + 3, P.maS); }
  for (const px of [134, 148]) { const y = Math.round(142 - (px - 110) * 0.2) + 3; rect(px, y, px + 1, y + 5, P.maS); pset(px, y - 4, P.maS); pset(px, y - 5, P.maL); }
  // ── la orilla de delante: los guijarros mojados junto al agua, la hierba y el camino de tierra
  for (let x = 0; x < 320; x++) { const top = b_orilla(x); for (let y = top; y < 180; y++) { let c; const n = h(x, y, 884);
    if (y < top + 6) { const k = h(x >> 1, y >> 1, 885); c = k < 0.3 ? P.pzL : k < 0.6 ? P.pz : k < 0.85 ? P.pzS : P.tiS; if (y === top) c = P.ag3; else if (k < 0.3 && h(x, y, 886) < 0.3) c = P.muL; }
    else if (y < top + 9) c = n < 0.5 ? P.hbS : P.ti;
    else { const camino = Math.abs(y - 166 - Math.sin(x * 0.03) * 3) < 4 + Math.sin(x * 0.11) * 1.2; c = camino ? (n < 0.15 ? P.tiS : n < 0.3 ? P.pzS : P.ti) : n < 0.18 ? P.hbS : n < 0.3 ? P.hbL : n < 0.34 ? P.hbD : P.hb;
      if (!camino && h(x, y >> 1, 887) < 0.06) { c = P.hbL; if (y > 0) pset(x, y - 1, P.hbL); }   // briznas
      if (!camino && h(x, y, 888) < 0.006) c = hex('#e8e4d8'); }   // alguna margarita
    pset(x, y, c); } }
  // los charcos del camino (reflejan el cielo)
  for (const [cx, cy, rx] of [[70, 166, 9], [214, 168, 12]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 < 1) pset(cx + i, cy + j, j < 0 ? P.c3 : P.c2);
  // un poste de amarre y una barca vieja boca abajo en la hierba (a los lados, lejos de la acción)
  rect(292, 146, 294, 158, P.maS); rect(292, 146, 292, 158, P.maL); rect(291, 145, 295, 145, P.maS);
  for (let x = 4; x <= 26; x++) { const y = 160 - Math.round(Math.sin((x - 4) / 22 * Math.PI) * 4); rect(x, y, x, 162, x < 14 ? P.maL : P.ma); pset(x, 163, P.hbD); } rect(4, 162, 26, 162, P.maS);
}

// un panel de madera en relieve: el marco (luz arriba y a la izquierda, sombra abajo y a la derecha), la tabla de dentro
// con su veta vertical y su bisel
function b_panel(R, x0, y0, x1, y1, [c, cS, cL, cD], k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, c);
  for (let x = x0 + 3; x <= x1 - 3; x++) { const g = h(x, k, 890); if (g < 0.35) for (let y = y0 + 3; y <= y1 - 3; y++) if (h(x, y >> 3, 891 + k) < 0.8) pset(x, y, g < 0.12 ? cD : cS); }
  rect(x0, y0, x1, y0, cL); rect(x0, y0, x0, y1, cL); rect(x0, y1, x1, y1, cD); rect(x1, y0, x1, y1, cD);
  rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, cD); rect(x0 + 2, y0 + 2, x0 + 2, y1 - 2, cD); rect(x0 + 2, y1 - 2, x1 - 2, y1 - 2, cL); rect(x1 - 2, y0 + 2, x1 - 2, y1 - 2, cL);
}

// un suelo de tablas en perspectiva (fuga en (fx, y0 - 70)): juntas que se abren hacia delante, vetas, alguna tabla más
// oscura y las cabezas de los clavos
function b_tarima(R, y0, y1, [c, cS, cL, cD], k = 0, fx = 160) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const d = (y - y0 + 70) / 70, f = y * 320;
    for (let x = 0; x < 320; x++) { const u = (x - fx) / d + 400, tabla = Math.floor(u / 14), fu = u - tabla * 14, largo = Math.floor((y - y0) / 9 + h(tabla, 3, 892 + k) * 3);
      let col = h(tabla, largo, 893 + k) < 0.2 ? cS : c; if (fu < 1 / d + 0.4) col = cD; else if (fu < 1.5) col = cL;
      else if (h(Math.floor(u * 0.7), y >> 1, 894 + k) < 0.1) col = cS; if (((y - y0) % 9 === 0) && h(tabla, largo, 895 + k) < 0.5) col = cD;
      B[f + x] = col; } }
}

// una vela en su palmatoria (x: el centro; y: el pie; alto: la cera que queda): devuelve dónde está la llama
function b_vela(R, x, y, alto, t, k = 0, metal = [hex('#c8a040'), hex('#8a6a20'), hex('#f0d070')]) {
  const { rect, pset } = R, cera = hex('#ece4cc'), ceraS = hex('#c8bc9c');
  rect(x - 4, y - 1, x + 4, y, metal[1]); rect(x - 3, y - 2, x + 3, y - 2, metal[0]); pset(x - 3, y - 2, metal[2]); rect(x - 1, y - 4, x + 1, y - 3, metal[0]);
  const top = y - 4 - alto; rect(x - 1, top, x + 1, y - 5, cera); rect(x + 1, top, x + 1, y - 5, ceraS); if (alto > 4) pset(x - 1, top + 2 + (k % 3), hex('#fff8e8'));
  pset(x, top - 1, hex('#2a1a10'));
  return b_llama(R, x, top - 2, t, k);
}

// la llama de una vela que tiembla (devuelve su centro)
function b_llama(R, x, y, t, k = 0) {
  const w = Math.sin(t * 9 + k * 2.3) + Math.sin(t * 13.7 + k) * 0.5, dx = w > 0.9 ? 1 : w < -1 ? -1 : 0, al = 3 + (Math.sin(t * 6 + k) > 0.3 ? 1 : 0);
  R.pset(x, y, hex('#ffb040')); R.pset(x, y - 1, hex('#fff4c0')); R.pset(x + dx, y - 2, hex('#ffe080')); if (al > 3) R.pset(x + dx, y - 3, hex('#ffb040')); R.pset(x - 1, y, hex('#e87830')); R.pset(x + 1, y, hex('#e87830'));
  return [x, y - 1];
}

// lluvia que corre por un cristal (x0–x1, y0–y1): gotas fijas y regueros que bajan zigzagueando
function b_cristalLluvia(R, t, x0, y0, x1, y1, cL, cS, n = 14, sem = 0) {
  const w = x1 - x0, alt = y1 - y0;
  for (let k = 0; k < n * 5; k++) { const x = x0 + Math.round(h(k, sem, 900) * w), y = y0 + Math.round(h(k, sem, 901) * alt); R.pset(x, y, cL); R.pset(x, y + 1, cS); }
  for (let k = 0; k < n; k++) { const v = 6 + h(k, sem, 902) * 14, ciclo = alt + 30, s = (h(k, sem, 903) * ciclo + t * v) % ciclo, yy = y0 + s - 10, xb = x0 + Math.round(h(k, sem, 904) * w) + Math.floor((h(k, sem, 903) * ciclo + t * v) / ciclo) * 7;
    const xx = x0 + ((xb - x0) % w + w) % w;
    for (let i = 0; i < 16; i++) { const yi = Math.round(yy - i), xi = xx + Math.round(Math.sin((yy - i) * 0.4 + k) * 0.8); if (yi < y0 || yi > y1) continue; R.pset(xi, yi, i === 0 ? cL : i < 3 ? b_mez(R.pget(xi, yi), cL, 0.6) : b_mez(R.pget(xi, yi), cL, 0.22)); }
    if (yy >= y0 && yy <= y1) R.pset(xx, Math.round(yy) + 1, cS); }
}

// una cortina pesada recogida (x0–x1, y0–y1; lado −1: la de la izquierda, recogida hacia la pared de la izquierda):
// los pliegues verticales de terciopelo en cuatro tonos tramados con el brillo en la cresta de cada pliegue, el
// fruncido de la cabecera con sus anillas, el forro claro asomando por el canto de dentro, el abultado del alzapaño en
// ya con su cordón dorado y la borla que se balancea, y el fleco dorado del bajo; sw: cuánto la mueve la corriente
function b_cortina(R, x0, x1, y0, y1, ya, [c, cS, cL], lado, sw = 0) {
  const cD = b_mez(cS, hex('#0a0406'), 0.4), cB = b_mez(cL, hex('#f4d8d0'), 0.3), forro = b_mez(cL, hex('#e8dcc0'), 0.55), forroS = b_mez(c, hex('#c8b89c'), 0.4);
  const oro = hex('#c8a040'), oroS = hex('#8a6a20'), oroL = hex('#f0d070'), tonos = [cD, cS, c, cL];
  for (let y = y0; y <= y1; y++) { const u = y < ya ? (y - y0) / (ya - y0) : 1 - (y - ya) / (y1 - ya) * 0.6, ancho = Math.round((x1 - x0) * (0.55 + 0.45 * (1 - u)) + (y > ya ? Math.sin(y * 0.2) * 0.5 : 0) + sw * (y - y0) / (y1 - y0));
    const xa = lado < 0 ? x0 : x1 - ancho, xb = lado < 0 ? x0 + ancho : x1, ab = y > ya ? 1 + (y - ya) / (y1 - ya) * 0.5 : 1;
    for (let x = xa; x <= xb; x++) { const v = (x - xa) / Math.max(1, ancho), p = Math.sin(v * Math.PI * 3.5 * ab + (lado < 0 ? 0 : 1.1));
      // la luz viene de la ventana: el lado de dentro más claro; la cresta de cada pliegue con su brillo de terciopelo
      const luz = (lado < 0 ? v : 1 - v) * 0.5, k = Math.max(0, Math.min(3, Math.floor((p * 0.5 + 0.5) * 2.6 + luz + 0.2 + (b_um(x, y) - 0.5) * 0.55)));
      let col = tonos[k]; if (p > 0.93 && (y + (x & 1)) % 3 === 0) col = cB; R.pset(x, y, col); }
    const xe = lado < 0 ? xb : xa; R.pset(xe, y, forro); R.pset(xe + (lado < 0 ? -1 : 1), y, (y & 3) === 0 ? forroS : cD); }
  // la cabecera fruncida: las anillas y los tablones del fruncido
  for (let x = x0 + 1; x < x1; x += 4) { R.pset(x, y0, oroS); R.pset(x, y0 + 1, cD); R.pset(x + 1, y0 + 1, cB); }
  // el fleco dorado del bajo, que se mueve con la corriente
  { const yb = y1, w = Math.round((x1 - x0) * (0.55 + 0.45 * 0.6) + sw), xa = lado < 0 ? x0 : x1 - w;
    for (let x = xa; x <= xa + w; x++) { R.pset(x, yb - 2, oroS); if ((x & 1) === 0) { R.pset(x, yb - 1, oro); R.pset(x, yb, (x & 2) ? oroL : oro); } } }
  // el alzapaño: el cordón que ciñe el pliegue y la borla que cuelga
  const bx = lado < 0 ? x0 + Math.round((x1 - x0) * 0.55) : x1 - Math.round((x1 - x0) * 0.55), dd = lado < 0 ? 1 : -1;
  for (let i = -4; i <= 4; i++) { const xx = bx + i * dd, yy = ya + Math.round((i * i) / 8); R.pset(xx, yy - 1, (i & 1) ? oro : oroL); R.pset(xx, yy, (i & 1) ? oroS : oro); }
  R.rect(bx - 1, ya - 2, bx + 1, ya + 1, oro); R.pset(bx - 1, ya - 2, oroL);
  { const bb = Math.round(sw * 0.8); R.pset(bx + bb, ya + 2, oroS); R.pset(bx + bb, ya + 3, oro); R.rect(bx - 1 + bb, ya + 4, bx + 1 + bb, ya + 6, oro); R.pset(bx - 1 + bb, ya + 4, oroL); R.pset(bx + 1 + bb, ya + 6, oroS);
    for (let i = -1; i <= 1; i++) R.pset(bx + i + bb, ya + 7, (i & 1) ? oroS : oro); }
}
const b_PAL_V = { mad: [hex('#5a3a26'), hex('#3e2818'), hex('#7a5436'), hex('#28180c')], suelo: [hex('#5e3e26'), hex('#4a2e1a'), hex('#7a5434'), hex('#2a1a0e')] };

// LA VENTANA (cámara 'ventana' del lago): la habitación de la casita mirando por la ventana de guillotina (cristal
// x 76–244, y 22–144; parteluces en x 132 y 188, travesaños en y 52, 83–87 y 116; alféizar y 146; suelo 166), con el
// mismo paisaje visto desde dentro (el lago, la colina y la villa). o.tormenta (0–1, por omisión 1): con tormenta, el
// cristal empañado con la lluvia que corre, la vela del alféizar (x 236) y los dos apliques encendidos; con
// o.tormenta < 0,15 es DE DÍA: sol tenue, cielo azul con nubes blancas, el sol que asoma arriba a la derecha (x 230,
// y 30) con su filo de plata en las nubes, el lago azul, el cristal limpio con unas gotas que se secan y sus reflejos,
// la luz que entra con el polvo que flota y la vela recién apagada que humea. La galería de las cortinas va por debajo
// de la barra del año (barra en y 21–22, x 34–276). o.rayo: los relámpagos (ver b_rayos). Devuelve .rayo.
const b_otro = { buf: null };
function b_ventana(R, t, o) {
  const dia = (o.tormenta ?? 1) < 0.15, tor = dia ? 0 : Math.max(0.2, Math.min(1, o.tormenta ?? 1)), gx0 = 76, gx1 = 244, gy0 = 22, gy1 = 144;
  if (!b_otro.buf) b_otro.buf = R.nuevo();
  const prev = R.usar(b_otro.buf); const r = b_paisaje(R, t, tor, o); R.usar(prev);
  // la habitación (fija): papel pintado de rayas con su florecilla y la sombra de los rincones, la cornisa, el zócalo
  // de madera, la tarima, el marco de la ventana con su alféizar, un cuadrito colgado de su cordón a la izquierda, el
  // espejo ovalado a la derecha y los dos apliques de latón
  b_pegar(R, b_fijo(R, 'ventanaFija', () => {
    const { rect, pset, linea } = R, pap = hex('#5e6a56'), papS = hex('#4a5644'), papL = hex('#748268'), flor = hex('#8a7a5a'), florL = hex('#b0a070'), papD = hex('#3e4838');
    for (let y = 0; y < 158; y++) for (let x = 0; x < 320; x++) { const s = x % 12; let c = s < 2 ? papS : s === 6 ? papL : pap;
      if (s === 9 && (y + (x >> 3) * 5) % 10 === 0) c = flor; if (s === 9 && (y + (x >> 3) * 5) % 10 === 1) c = florL; if ((s === 8 || s === 10) && (y + (x >> 3) * 5) % 10 === 1) c = flor;
      if (h(x, y, 905) < 0.04) c = papS; const rin = Math.min(x, 319 - x); if (rin < 14 && b_um(x, y) < (14 - rin) / 22) c = c === papL ? pap : papD;   // los rincones en sombra
      if (y > 8 && y < 12 && b_um(x, y) < (12 - y) / 5) c = papD;   // la sombra de la cornisa
      pset(x, y, c); }
    rect(0, 0, 319, 4, hex('#d8d0bc')); rect(0, 5, 319, 6, hex('#a8a08c')); rect(0, 7, 319, 7, papS); for (let x = 2; x < 320; x += 5) pset(x, 3, hex('#bcb4a0'));   // la cornisa con su moldura
    rect(0, gy1 + 5, 319, gy1 + 13, b_PAL_V.mad[0]); rect(0, gy1 + 5, 319, gy1 + 5, b_PAL_V.mad[2]); rect(0, gy1 + 13, 319, gy1 + 13, b_PAL_V.mad[3]);
    for (let x = 0; x < 320; x += 8) rect(x, gy1 + 7, x, gy1 + 11, b_PAL_V.mad[1]); for (let x = 0; x < 320; x++) if (h(x, 3, 906) < 0.25) pset(x, gy1 + 9, b_PAL_V.mad[2]);
    b_tarima(R, gy1 + 14, 179, b_PAL_V.suelo, 3);
    // el marco: la caja, los junquillos y las dos hojas de la guillotina (tres por cuatro cristales)
    const mL = hex('#d8d4c8'), m = hex('#b4b0a4'), mS = hex('#84806e');
    rect(gx0 - 8, gy0 - 8, gx1 + 8, gy1 + 2, mS); rect(gx0 - 7, gy0 - 7, gx1 + 7, gy1 + 1, m); rect(gx0 - 7, gy0 - 7, gx1 + 7, gy0 - 6, mL); rect(gx0 - 7, gy0 - 7, gx0 - 6, gy1, mL);
    rect(gx0 - 4, gy0 - 4, gx1 + 4, gy0 - 4, mS); rect(gx0 - 4, gy0 - 4, gx0 - 4, gy1, mS); rect(gx1 + 4, gy0 - 4, gx1 + 4, gy1, mL);   // el junquillo
    for (let y = gy0 - 6; y < gy1; y += 7) if (h(1, y, 907) < 0.5) pset(gx1 + 6, y, mS);   // la pintura cuarteada
    rect(gx0 - 1, gy0 - 1, gx1 + 1, gy1 + 1, mS);
    rect(gx0 - 12, gy1 + 2, gx1 + 12, gy1 + 4, mL); rect(gx0 - 12, gy1 + 5, gx1 + 12, gy1 + 7, m); rect(gx0 - 12, gy1 + 8, gx1 + 12, gy1 + 8, mS);   // el alféizar
    for (const x of [gx0 - 10, gx1 + 10]) { rect(x - 1, gy1 + 9, x + 1, gy1 + 11, m); pset(x + 1, gy1 + 11, mS); }   // las ménsulas del alféizar
    // el cuadrito de la izquierda: un velero en el lago, con su marco dorado, colgado de un clavo
    { const x0 = 6, y0 = 54, x1 = 28, y1 = 74; linea(17, 44, x0 + 2, y0, hex('#8a6a20')); linea(17, 44, x1 - 2, y0, hex('#8a6a20')); pset(17, 43, hex('#d8c890'));
      rect(x0, y0, x1, y1, hex('#8a6a20')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#c8a040')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0d070'));
      for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y, y < 62 ? (b_um(x, y) < (y - y0) / 10 ? hex('#a8b8c8') : hex('#8aa0b8')) : y < 65 ? hex('#5a6e5a') : (x + y) % 4 ? hex('#4a6a8a') : hex('#6a8aa8'));
      linea(x0 + 3, 64, x0 + 9, 59, hex('#7a8a96')); linea(x0 + 9, 59, x1 - 3, 63, hex('#9aa8b4'));
      rect(18, 66, 23, 67, hex('#3a2a1a')); linea(20, 65, 20, 59, hex('#3a2a1a')); linea(21, 59, 21, 65, hex('#f0ece0')); pset(22, 64, hex('#f0ece0'));
      rect(x0 + 1, y1 + 1, x1 + 1, y1 + 1, papD); rect(x1 + 1, y0 + 1, x1 + 1, y1, papD); }
    // el espejo ovalado de la derecha (por debajo de la zona de Atom): marco dorado y el cristal azogado con su brillo
    { const cx = 297, cy = 72, rx = 11, ry = 15;
      for (let y = cy - ry - 2; y <= cy + ry + 2; y++) for (let x = cx - rx - 2; x <= cx + rx + 2; x++) { const d = ((x - cx) / (rx + 2)) ** 2 + ((y - cy) / (ry + 2)) ** 2, di = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
        if (di < 1) pset(x, y, (x - cx) + (y - cy) * 0.6 > -6 && (x - cx) + (y - cy) * 0.6 < -2 ? hex('#c8d0d4') : b_um(x, y) < (y - cy + ry) / (2 * ry) * 0.6 ? hex('#6a7470') : hex('#8a9490'));
        else if (d < 1) pset(x, y, y < cy - 4 && x < cx ? hex('#f0d070') : y > cy + 4 ? hex('#8a6a20') : hex('#c8a040')); }
      rect(cx - 2, cy - ry - 5, cx + 2, cy - ry - 3, hex('#c8a040')); pset(cx, cy - ry - 6, hex('#f0d070'));
      for (let y = cy - ry + 2; y <= cy + ry; y++) pset(cx + rx + 3, y, papD); }
    // los dos apliques de latón (la vela la pone cada fotograma: encendida de noche, apagada de día)
    for (const x of [17, 297]) { const y = 104; rect(x - 2, y - 8, x + 2, y - 2, hex('#8a6a20')); rect(x - 1, y - 7, x + 1, y - 3, hex('#c8a040')); pset(x - 1, y - 7, hex('#f0d070'));
      linea(x, y - 2, x, y + 2, hex('#8a6a20')); rect(x - 3, y + 2, x + 3, y + 3, hex('#c8a040')); rect(x - 3, y + 3, x + 3, y + 3, hex('#8a6a20'));
      rect(x - 1, y - 5, x + 1, y + 1, hex('#ece4cc')); pset(x + 1, y - 2, hex('#c8bc9c')); pset(x - 1, y - 3, hex('#fff8e8')); pset(x, y - 6, hex('#2a1a10')); }
  }));
  // lo de fuera, por los cristales: de noche, más frío y con el vaho; de día, con sol tenue y el sol que asoma
  const B = R.buf, O = b_otro.buf, ox = 40, oy = 14, vaho = hex('#a4acb8'), sx = 230, sy = 30;
  if (dia) a_vtnSol(0);
  for (let y = gy0; y <= gy1; y++) { const f = y * 320; for (let x = gx0; x <= gx1; x++) {
    const yo = Math.min(179, y + oy), xo = Math.min(319, x + ox); let c = O[yo * 320 + xo];
    if (dia) { const src = c; c = a_vtnSol(src); const ds = Math.hypot(x - sx, y - sy);
      if (ds < 18) { if (a_vtnCielo.has(src)) c = ds < 5 ? hex('#fffcec') : ds < 7 ? hex('#fff4cc') : b_um(x, y) < (18 - ds) / 13 ? b_mez(c, hex('#fff0c4'), 0.55) : c;
        else if (a_vtnNube.has(src) && ds < 13) c = b_mez(c, hex('#fffaec'), 0.5); }
      if (y > gy1 - 12) { const borde = Math.min(x - gx0, gx1 - x); if (b_um(x, y) < (y - (gy1 - 12)) / 40 + Math.max(0, 0.3 - borde / 30)) c = b_mez(c, hex('#d8e0e8'), 0.3); }   // un poco de vaho abajo
      B[f + x] = c; continue; }
    const borde = Math.min(x - gx0, gx1 - x, y - gy0, gy1 - y), a = Math.max(0, 0.5 - borde / 50) + ((y - gy0) / (gy1 - gy0)) ** 2 * 0.35;
    const limpio = ((x - 148) / 40) ** 2 + ((y - 96) / 26) ** 2 < 1 + Math.sin(y * 0.5) * 0.08;   // donde alguien ha limpiado el vaho con la mano
    const aa = limpio ? a * 0.15 : a; if (b_um(x, y) < aa * 1.6) c = b_mez(c, vaho, 0.45); B[f + x] = c; } }
  R.recorte([gx0, gy0, gx1, gy1]);
  if (dia) {
    // los rayos del sol, que giran despacio, y los reflejos de la habitación en el cristal (dos bandas en diagonal)
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 0.08, l = k & 1 ? 9 : 13; for (let i = 8; i < 8 + l; i++) { const x = Math.round(sx + Math.cos(an) * i), y = Math.round(sy + Math.sin(an) * i); if ((i + k) % 2 === 0) b_tine(R, x, y, hex('#fff8dc'), 0.45 * (1 - (i - 8) / l)); } }
    for (const [x0, w] of [[96, 10], [114, 4], [200, 8], [214, 3]]) for (let y = gy0; y <= gy1; y++) { const xb = x0 + Math.round((gy1 - y) * 0.45); for (let x = xb; x < xb + w; x++) if (((x + y) & 1) === 0) b_tine(R, x, y, hex('#ffffff'), 0.12); }
    // las gotas que quedan de la tormenta de anoche, secándose (brillan con el sol)
    for (let k = 0; k < 26; k++) { const x = gx0 + 2 + Math.round(h(k, 1, 950) * (gx1 - gx0 - 4)), y = gy0 + 4 + Math.round(h(k, 2, 950) ** 0.6 * (gy1 - gy0 - 6)), br = Math.sin(t * 2 + k * 1.7) > 0.8;
      R.pset(x, y, br ? hex('#ffffff') : hex('#e8f2fa')); R.pset(x, y + 1, hex('#6a88a4')); if (k % 3 === 0) R.pset(x + 1, y + 1, hex('#8aa4bc')); }
  } else b_cristalLluvia(R, t, gx0, gy0, gx1, gy1, hex('#dce4ee'), hex('#4a5464'), 22, 1);
  R.recorte(null);
  // los parteluces de las hojas (por encima del cristal) y el travesaño del medio
  { const m = hex('#c8c4b8'), mS = hex('#8a8676');
    for (const x of [132, 188]) { R.rect(x - 1, gy0, x + 1, gy1, m); R.rect(x + 1, gy0, x + 1, gy1, mS); }
    for (const y of [52, 116, 148]) { R.rect(gx0, y - 1, gx1, y + 1, m); R.rect(gx0, y + 1, gx1, y + 1, mS); }
    R.rect(gx0, 83, gx1, 86, m); R.rect(gx0, 87, gx1, 87, mS); R.rect(gx0, 82, gx1, 82, hex('#e8e4d8')); R.rect(154, 86, 166, 88, hex('#c8a040')); R.pset(155, 86, hex('#f0d070')); R.rect(158, 84, 162, 85, hex('#8a6a20')); }   // el pestillo
  // de día: el sol en los parteluces y en el alféizar, y el polvo que flota en la luz que entra
  if (dia) {
    for (const x of [131, 187]) for (let y = gy0; y <= gy1; y++) if ((y & 1) === 0) b_tine(R, x, y, hex('#fff8e4'), 0.35);
    for (let x = gx0 - 12; x <= gx1 + 12; x++) { b_tine(R, x, gy1 + 2, hex('#fff6dc'), 0.4); if ((x & 1) === 0) b_tine(R, x, gy1 + 3, hex('#fff6dc'), 0.25); }
    for (let k = 0; k < 18; k++) { const u = (t * (0.025 + h(k, 3, 951) * 0.03) + h(k, 4, 951)) % 1, x = Math.round(92 + h(k, 5, 951) * 150 + Math.sin(t * 0.7 + k) * 4 + u * 20), y = Math.round(176 - u * 70 + Math.sin(t * 1.3 + k * 2) * 3);
      if (Math.sin(t * 1.9 + k * 2.3) > -0.3) b_tine(R, x, y, hex('#fff4d0'), 0.55); }
  }
  // la galería por debajo de la barra del año: la barra de madera torneada con sus remates y sus anillas, sobre dos
  // soportes de latón; y las cortinas pesadas recogidas que cuelgan de ella, con la corriente que las mueve
  const cc = [hex('#6a2a2e'), hex('#44161c'), hex('#8e3e3e')], sw = Math.sin(t * 0.9) * (dia ? 0.8 : 1.5) + Math.sin(t * 2.3) * (dia ? 0 : 0.4);
  { const mad = hex('#5a3a22'), madL = hex('#8a6440'), madS = hex('#2e1c10');
    for (const x of [48, 262]) { R.rect(x - 1, 16, x + 1, 20, hex('#8a6a20')); R.pset(x - 1, 16, hex('#f0d070')); R.rect(x - 2, 15, x + 2, 15, hex('#c8a040')); }
    R.rect(34, 21, 276, 21, madL); R.rect(34, 22, 276, 22, mad); for (let x = gx0; x <= gx1; x++) b_tine(R, x, 23, madS, 0.35);
    for (let x = 36; x < 276; x += 9) R.pset(x, 21, mad);
    for (const cx of [34, 276]) { R.disco(cx, 22, 1.6, mad); R.pset(cx, 21, madL); R.pset(cx + (cx < 100 ? -2 : 2), 22, madS); } }
  b_cortina(R, 36, 80, 23, 164, 100, cc, -1, sw); b_cortina(R, 238, 274, 23, 164, 100, cc, 1, -sw);
  for (const [a, b] of [[37, 80], [238, 273]]) for (let x = a; x <= b; x += 5) { R.pset(x, 21, hex('#c8a040')); R.pset(x, 23, hex('#8a6a20')); }   // las anillas
  // en el alféizar: un libro cerrado, una carta doblada y la vela en su palmatoria (con su luz sobre el cristal y la
  // pared de noche; de día, recién apagada, con su hilo de humo)
  { const y = gy1 + 2; R.rect(206, y - 5, 228, y - 1, hex('#5a2a1e')); R.rect(206, y - 5, 228, y - 5, hex('#7a3e2a')); R.rect(207, y - 4, 227, y - 4, hex('#e8dcc0')); R.rect(228, y - 5, 228, y - 1, hex('#3a1a10')); R.rect(212, y - 3, 213, y - 1, hex('#c8a040'));
    R.rect(209, y - 8, 225, y - 6, hex('#2a4a3a')); R.rect(209, y - 8, 225, y - 8, hex('#4a6a5a')); R.rect(210, y - 7, 224, y - 7, hex('#e8dcc0')); R.rect(216, y - 8, 217, y - 6, hex('#c8a040'));   // otro libro encima
    R.rect(196, y - 2, 203, y - 1, hex('#e8dcc0')); R.rect(196, y - 3, 203, y - 3, hex('#d0c4a8')); R.pset(199, y - 2, hex('#a83a2a'));   // una carta doblada con su lacre
    const [fx, fy] = b_vela(R, 236, y, 9, t, 1);
    if (dia) { R.pset(fx, fy - 1, b_mez(R.pget(fx, fy - 1), hex('#e8dcc0'), 0.4)); R.pset(fx, fy, hex('#4a4a52')); R.pset(fx - 1, fy + 1, hex('#e8dcc0')); R.pset(fx + 1, fy + 1, hex('#e8dcc0')); R.pset(fx, fy + 1, hex('#2a1a10')); R.pset(fx, fy - 2, R.pget(fx - 3, fy - 2));
      for (let i = 0; i < 7; i++) { const u = (t * 0.35 + i / 7) % 1, px = Math.round(fx + Math.sin(u * 8 + t * 1.2) * (1 + u * 3)), py = Math.round(fy - 1 - u * 22); b_tine(R, px, py, hex('#e8ecf0'), 0.5 * (1 - u)); } }
    else b_halo(R, fx, fy, 38, hex('#ffc870'), 0.32, 30); }
  // los apliques: de noche, sus velas encendidas
  if (!dia) for (const [x, k] of [[17, 2], [297, 3]]) { const [fx, fy] = b_llama(R, x, 97, t, k); b_halo(R, fx, fy, 16, hex('#ffd080'), 0.26, 14); }
  if (r.rayo > 0) b_destello(R, r.rayo * 0.6);
  return { suelo: 166, libre: [84, 236], ventana: [gx0, gy0, gx1, gy1], alfeizar: gy1 + 2, vela: [236, gy1 - 13], villa: [220 - 40, 64 - 14], rayo: r.rayo };
}
// la paleta del salón de noche (madera de nogal, damasco verde, mármol, dorado, terciopelo y la alfombra)
const b_S = (() => { const p = (a) => a.map(hex); return {
  mad: p(['#4a2e1e', '#33200f', '#6a4630', '#22140a']), dam: p(['#2a3428', '#222a20', '#36443a']), mar: p(['#bcb8b0', '#8e8a82', '#dcd8d0', '#76726a']),
  oro: p(['#c8a040', '#8a6a20', '#f0d070']), terc: p(['#6a1e24', '#44121a', '#8e3036']), suelo: p(['#4e321e', '#3a2414', '#684428', '#22140a']),
  alf: p(['#6a2224', '#2a3460', '#c8a050', '#d8c8a0', '#3e1418']), noche: p(['#141a28', '#1c2436', '#2a3448']), mesa: p(['#5a3420', '#3e2214', '#7a4a2c', '#24140a']),
  papel: p(['#ece2c8', '#c8bc9c', '#5a5060']) }; })();

// EL SALÓN DE VILLA DIODATI de noche (o en la mañana gris, en la cámara 'mesa'): ver la cabecera de lago()
function b_salon(R, t, o) {
  const S = b_S;
  b_pegar(R, b_fijo(R, 'salonFijo', () => b_salonFijo(R)));
  // las dos ventanas altas con la noche de tormenta: lluvia, nubes que corren y el lago que aparece con cada relámpago
  const F = b_rayos(t, o);
  for (const [x0, x1] of [[160, 192], [218, 250]]) { const y0 = 30, y1 = 108; R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = Math.sin(x * 0.07 + t * 0.8 + Math.sin(y * 0.15) * 1.5) + Math.sin(y * 0.11 - t * 0.3); R.pset(x, y, n > 0.9 ? S.noche[2] : n > -0.2 ? S.noche[1] : S.noche[0]); }
    if (F.f > 0) { for (let x = x0; x <= x1; x++) { const top = 80 - Math.round(Math.abs(Math.sin(x * 0.09)) * 12 + h(x >> 1, 1, 910) * 3); for (let y = top; y <= y1; y++) R.pset(x, y, y > 92 ? b_mez(S.noche[0], hex('#5a6488'), F.f) : b_mez(S.noche[1], hex('#8a94c0'), F.f)); }
      if (F.u < 0.2) b_rayo(R, x0 + 14, y0, 76, Math.round((t - F.u) * 10)); }
    b_lluvia(R, t, 30, 1.6, 4, y0, y1, hex('#6a7898'), hex('#3a4460'), x0, 120);
    b_cristalLluvia(R, t, x0, y0, x1, y1, hex('#8a96b8'), hex('#10141e'), 5, x0); R.recorte(null);
    // los parteluces
    for (const y of [56, 82]) R.rect(x0, y, x1, y, S.mad[3]); R.rect((x0 + x1) >> 1, y0, (x0 + x1) >> 1, y1, S.mad[3]);
    for (const y of [57, 83]) R.rect(x0, y, x1, y, S.mad[1]); }
  // las cortinas de terciopelo de cada ventana (tapan los bordes del cristal)
  const sw = Math.sin(t * 0.7) * 1.2;
  b_cortina(R, 150, 166, 22, 148, 96, S.terc, -1, sw); b_cortina(R, 186, 202, 22, 148, 96, S.terc, 1, -sw);
  b_cortina(R, 208, 224, 22, 148, 96, S.terc, -1, sw); b_cortina(R, 244, 260, 22, 148, 96, S.terc, 1, -sw);
  for (const [a, b] of [[146, 206], [204, 264]]) { R.rect(a, 18, b, 22, S.oro[1]); R.rect(a, 18, b, 18, S.oro[2]); for (let x = a + 1; x < b; x += 3) R.pset(x, 21, S.oro[0]); }
  // el fuego de la chimenea con sus troncos, las ascuas, las chispas y su luz
  const fu = b_fuego(R, 36, 80, 144, t);
  // las velas: los dos candeleros de la repisa y el aplique de entre las ventanas
  const ll = [b_vela(R, 22, 86, 8, t, 1), b_vela(R, 90, 86, 7, t, 2), b_vela(R, 199, 68, 6, t, 3), b_vela(R, 211, 68, 6, t, 4)];
  R.rect(198, 69, 212, 70, S.oro[1]); R.rect(204, 66, 206, 76, S.oro[0]); R.pset(205, 77, S.oro[1]);   // el aplique
  // el reloj de la repisa con su péndulo y el perro dormido junto al fuego (respira, mueve la oreja)
  { const x = 56, y = 86; R.rect(x - 6, y - 13, x + 6, y - 1, S.oro[1]); R.rect(x - 5, y - 12, x + 5, y - 2, S.oro[0]); R.disco(x, y - 9, 3.2, S.papel[0]); R.pset(x, y - 9, hex('#1a1a1a')); R.linea(x, y - 9, x + 2, y - 10, hex('#1a1a1a')); R.pset(x, y - 11, hex('#1a1a1a'));
    const pe = Math.round(Math.sin(t * 3.1) * 2); R.rect(x - 3, y - 5, x + 3, y - 2, hex('#3a2a10')); R.pset(x + pe, y - 3, S.oro[2]); R.rect(x - 7, y - 14, x + 7, y - 14, S.oro[2]); }
  { const x = 96, y = 150, r = Math.sin(t * 1.6) > 0 ? 1 : 0, pe = hex('#d8c8a8'), peS = hex('#a89470'), peD = hex('#6a5a44');
    R.rect(x, y - 5 - r, x + 16, y - 1, pe); R.rect(x + 1, y - 2, x + 16, y - 1, peS); R.rect(x + 13, y - 8, x + 19, y - 3, pe); R.rect(x + 16, y - 9, x + 17, y - 8, peD); if (Math.sin(t * 0.8) > 0.85) R.pset(x + 16, y - 10, peD);
    R.pset(x + 19, y - 5, peD); R.pset(x + 17, y - 6, hex('#2a1a10')); R.rect(x - 3, y - 2, x, y - 1, peS); R.rect(x + 3, y - 7 - r, x + 9, y - 6 - r, hex('#c8a070')); }
  // el libro grande en el atril (o.lectura): las páginas con sus renglones y una que pasa de vez en cuando
  if (o.lectura) b_atril(R, 124, 150, t);
  // las luces: el fuego, las velas de la repisa y del aplique, el candelabro de la mesa (lo pinta b_salonMesa)
  b_halo(R, fu[0], fu[1], 86, hex('#ff9a40'), 0.42, 60);
  for (const [fx, fy] of ll) b_halo(R, fx, fy, 20, hex('#ffd080'), 0.3);
  b_halo(R, 205, 66, 34, hex('#ffc870'), 0.25);
  b_salonMesa(R, t, o, true);
  if (F.f > 0) b_destello(R, F.f * 0.45, hex('#9aa8e0'));
  return { suelo: 150, libre: [30, 290], mesa: [140, 258, 140], chimenea: [36, 80, 144], atril: o.lectura ? [124, 118] : null, ventanas: [[160, 30, 192, 108], [218, 30, 250, 108]], rayo: F.f };
}

// el fondo fijo del salón: el techo con su cornisa, el damasco con los paneles, la chimenea de mármol con el cuadro
// en su marco dorado, el sillón de orejas, la tarima con la alfombra
function b_salonFijo(R) {
  const { rect, pset } = R, S = b_S;
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const m = ((x + (y >> 2) * 3) % 12 === 0 && y % 8 < 4) || ((x + 6 + (y >> 2) * 3) % 12 === 0 && y % 8 >= 4); pset(x, y, m ? S.dam[2] : (x + y) % 7 === 0 ? S.dam[1] : S.dam[0]); }
  rect(0, 0, 319, 8, S.mad[1]); rect(0, 9, 319, 10, S.mad[2]); rect(0, 11, 319, 11, S.mad[3]); for (let x = 0; x < 320; x += 6) rect(x, 4, x + 2, 7, S.mad[3]);   // la cornisa con dentículos
  // el zócalo de paneles (y 100–150) con la moldura de arriba, y las pilastras del damasco
  rect(0, 98, 319, 100, S.mad[2]); rect(0, 101, 319, 101, S.mad[3]);
  for (let x = 2; x < 318; x += 36) b_panel(R, x, 104, x + 32, 146, S.mad, x);
  rect(0, 147, 319, 149, S.mad[1]); rect(0, 147, 319, 147, S.mad[2]);
  for (const x of [8, 108, 136, 268, 300]) { rect(x, 12, x + 5, 97, S.mad[0]); rect(x, 12, x, 97, S.mad[2]); rect(x + 5, 12, x + 5, 97, S.mad[3]); rect(x - 1, 92, x + 6, 97, S.mad[1]); }
  // dos cuadritos en el damasco (paisajes sin letras) a la derecha, lejos de Atom
  for (const [x0, y0, x1, y1, k] of [[272, 52, 296, 72, 0], [112, 36, 132, 52, 1]]) { rect(x0, y0, x1, y1, S.oro[1]); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, S.oro[0]); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#3a4a5a'));
    for (let x = x0 + 3; x <= x1 - 3; x++) { const top = Math.round((y0 + y1) / 2 + Math.sin(x * 0.4 + k) * 2); rect(x, top, x, y1 - 3, k ? hex('#4a5a3a') : hex('#5a4a3a')); } pset(x0 + 5, y0 + 5, hex('#e8e0c0')); }
  // la chimenea de mármol: jambas, repisa, el hogar, el cuadro grande encima
  rect(12, 88, 100, 150, S.mar[0]); for (let y = 88; y < 150; y++) for (let x = 12; x <= 100; x++) { const v = Math.sin(x * 0.2 + y * 0.09 + Math.sin(y * 0.3) * 1.4); if (Math.abs(v) < 0.08) pset(x, y, S.mar[3]); else if (h(x, y, 911) < 0.05) pset(x, y, S.mar[2]); }
  rect(8, 86, 104, 90, S.mar[2]); rect(8, 90, 104, 91, S.mar[1]); rect(12, 92, 100, 93, S.mar[1]);
  rect(30, 102, 86, 146, hex('#141010')); rect(28, 100, 88, 101, S.mar[1]); rect(30, 102, 30, 146, S.mar[3]); rect(86, 102, 86, 146, S.mar[3]);
  for (let y = 104; y < 146; y += 4) for (let x = 32; x < 85; x += 6) rect(x + ((y >> 2) & 1) * 3, y, x + 4 + ((y >> 2) & 1) * 3, y + 2, hex('#2a1c16'));   // los ladrillos ennegrecidos del fondo
  rect(6, 146, 106, 150, S.mar[1]); rect(6, 146, 106, 146, S.mar[2]);
  // el cuadro sobre la chimenea: un lago de noche con montañas y la luna, en marco dorado
  rect(22, 28, 90, 80, S.oro[1]); rect(23, 29, 89, 79, S.oro[0]); rect(25, 31, 87, 77, S.oro[1]); rect(23, 29, 89, 29, S.oro[2]); rect(23, 29, 23, 79, S.oro[2]);
  for (let y = 33; y <= 75; y++) for (let x = 27; x <= 85; x++) { const mt = 54 - Math.abs(Math.sin(x * 0.11) * 12) - Math.abs(Math.sin(x * 0.27)) * 4; pset(x, y, y < mt ? (y < 44 ? hex('#1e2a44') : hex('#2a3a5a')) : y < 60 ? hex('#3a4a5e') : (x + y) % 5 === 0 ? hex('#6a7a9a') : hex('#24304a')); }
  R.disco(72, 40, 3.4, hex('#e8e4c8')); for (let y = 62; y < 76; y += 2) pset(72 + ((y >> 1) & 1), y, hex('#c8c4a0'));
  // el sillón de orejas a la derecha, de terciopelo, con su escabel
  { const x0 = 266, y1 = 150; rect(x0 + 2, y1 - 40, x0 + 26, y1 - 14, S.terc[0]); for (let x = x0 + 4; x < x0 + 26; x += 5) for (let y = y1 - 38; y < y1 - 16; y += 5) pset(x, y, S.terc[1]);
    rect(x0, y1 - 36, x0 + 4, y1 - 10, S.terc[2]); rect(x0 + 24, y1 - 36, x0 + 28, y1 - 10, S.terc[1]); rect(x0 + 2, y1 - 16, x0 + 26, y1 - 10, S.terc[2]); rect(x0 + 2, y1 - 9, x0 + 26, y1 - 6, S.terc[1]);
    for (const lx of [x0 + 2, x0 + 25]) rect(lx, y1 - 5, lx + 1, y1, S.mad[3]); rect(x0 + 2, y1 - 40, x0 + 26, y1 - 40, S.terc[2]); }
  // la tarima y la alfombra persa (bajo la mesa)
  b_tarima(R, 150, 179, S.suelo, 5);
  for (let y = 154; y < 180; y++) { const d = (y - 150 + 70) / 70, xa = Math.round(160 - 128 * d * 0.86), xb = Math.round(160 + 128 * d * 0.86);
    for (let x = Math.max(0, xa); x <= Math.min(319, xb); x++) { const u = (x - 160) / d, v = y - 154, au = Math.abs(u), ext = x - xa < 3 || xb - x < 3 || v < 2, banda = x - xa < 7 || xb - x < 7 || v < 5;
      const med = au / 46 + Math.abs(v - 15) / 10, cen = au / 18 + Math.abs(v - 15) / 4.5;
      let c = ext ? (((Math.round(u / 3) + v) & 1) ? S.alf[2] : S.alf[4]) : banda ? ((Math.round(u / 2) + v) % 4 === 0 ? S.alf[2] : S.alf[1]) : cen < 1 ? (cen < 0.45 ? S.alf[0] : S.alf[2]) : med < 1 ? (med > 0.86 ? S.alf[3] : S.alf[1]) : S.alf[0];
      if (!banda && med >= 1 && ((Math.round(u) % 14 + 14) % 14 === 0) && v % 6 === 2) c = S.alf[3];
      if (!banda && med >= 1 && h(Math.round(u), v, 912) < 0.08) c = S.alf[4];
      pset(x, y, c); } }
}

// el fuego del hogar: los morillos, los troncos, las llamas que lamen y las chispas; devuelve el centro de su luz
function b_fuego(R, x0, x1, yb, t) {
  const { rect, pset } = R, w = x1 - x0;
  rect(x0 + 4, yb - 5, x1 - 4, yb - 2, hex('#3a2416')); rect(x0 + 8, yb - 8, x1 - 10, yb - 5, hex('#4a2e1c')); rect(x0 + 4, yb - 5, x1 - 4, yb - 5, hex('#6a4426'));
  for (let x = x0 + 5; x < x1 - 4; x++) if (Math.sin(x * 1.7 + t * 3) > 0.3) pset(x, yb - 2, Math.sin(x + t * 5) > 0 ? hex('#ff6a20') : hex('#c83a10'));   // las ascuas
  for (let i = 0; i < w; i++) { const x = x0 + i, u = i / w, alto = (Math.sin(u * Math.PI) * 18 + 4) * (0.75 + 0.25 * Math.sin(t * 7 + i * 0.6) + 0.15 * Math.sin(t * 11.3 + i * 1.3));
    for (let j = 0; j < alto; j++) { const y = yb - 6 - j, f = j / alto, dx = Math.round(Math.sin(t * 6 + j * 0.4 + i * 0.2) * f * 1.5);
      pset(x + dx, y, f < 0.3 ? hex('#fff0a0') : f < 0.6 ? hex('#ffb040') : f < 0.85 ? hex('#e86a20') : hex('#a83a10')); } }
  for (const mx of [x0 + 6, x1 - 7]) { rect(mx, yb - 12, mx + 1, yb, hex('#2a2a2e')); R.disco(mx + 0.5, yb - 13, 1.6, hex('#4a4a52')); pset(mx, yb - 14, hex('#8a8a92')); }
  for (let k = 0; k < 6; k++) { const u = ((t * 0.7 + k / 6) % 1), x = Math.round(x0 + w / 2 + Math.sin(k * 2.7 + t) * 10 + Math.sin(u * 9 + k) * 3), y = Math.round(yb - 20 - u * 34); if (u < 0.85) pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c86020')); }
  return [Math.round(x0 + w / 2), yb - 14];
}

// el atril con el libro grande abierto (x: el centro; suelo: el pie)
function b_atril(R, x, suelo, t) {
  const { rect, pset, linea, poligono } = R, S = b_S;
  rect(x - 1, suelo - 30, x + 1, suelo, S.mad[1]); rect(x - 6, suelo - 2, x + 6, suelo, S.mad[1]); rect(x - 6, suelo - 2, x + 6, suelo - 2, S.mad[2]);
  poligono([[x - 13, suelo - 30], [x + 13, suelo - 30], [x + 11, suelo - 38], [x - 11, suelo - 38]], S.mad[0]); linea(x - 13, suelo - 30, x + 13, suelo - 30, S.mad[3]);
  poligono([[x - 12, suelo - 32], [x, suelo - 33], [x, suelo - 41], [x - 11, suelo - 39]], S.papel[0]); poligono([[x, suelo - 33], [x + 12, suelo - 32], [x + 11, suelo - 39], [x, suelo - 41]], S.papel[1]);
  for (let k = 0; k < 4; k++) { linea(x - 9, suelo - 38 + k * 1.6, x - 2, suelo - 39 + k * 1.6, S.papel[2]); linea(x + 2, suelo - 39 + k * 1.6, x + 9, suelo - 38 + k * 1.6, S.papel[2]); }
  const u = (t % 6) / 0.6; if (u < 1) { const px = Math.round(x + 10 - u * 20), py = suelo - 40 - Math.round(Math.sin(u * Math.PI) * 5); linea(x, suelo - 33, px, py, S.papel[0]); linea(x, suelo - 34, px, py - 1, S.papel[1]); }   // la hoja que pasa
  pset(x, suelo - 33, S.mad[3]);
}

// LA MESA LARGA del salón (por delante de los personajes; la pinta también b_salon, con base true y más luz): la tapa
// de caoba pulida con sus vetas y el reflejo de las velas, el canto con su moldura de cuentas, el faldón con sus dos
// cajones, las patas torneadas con su travesaño y, con base, su sombra en la alfombra; encima, las hojas con renglones,
// las plumas en los tinteros, la salvadera, la barra de lacre, dos bolas de papel arrugado, la licorera con dos copas,
// la pila de libros y el candelabro de tres velas con la cera que gotea y su hilo de humo. Tapa x 140–258 en y 140;
// canto de delante hasta y 152; patas en x 142, 196 y 254 hasta y 173.
function b_salonMesa(R, t, o, base = false) {
  const { rect, pset } = R, S = b_S;
  b_pegar(R, b_fijo(R, 'salonMesa', () => {
    const { linea, disco } = R;
    // la tapa: caoba con vetas onduladas y algún nudo; el filo de arriba con su brillo
    for (let y = 140; y <= 146; y++) for (let x = 140; x <= 258; x++) { const v = Math.sin(x * 0.11 + Math.sin(x * 0.027 + y * 0.8) * 2.4 + y * 1.1); let c = v > 0.72 ? S.mesa[2] : v < -0.72 ? S.mesa[1] : S.mesa[0];
      if (h(x, y, 913) < 0.035) c = S.mesa[3]; if (y === 140) c = (x & 1) ? S.mesa[2] : b_mez(S.mesa[2], hex('#c89a70'), 0.4); pset(x, y, c); }
    // el canto con la moldura de cuentas y el faldón con sus dos cajones y los tiradores de latón
    rect(138, 147, 260, 152, S.mesa[1]); rect(138, 147, 260, 147, S.mesa[3]); rect(138, 148, 260, 148, S.mesa[2]);
    for (let x = 139; x < 260; x += 3) { pset(x, 150, S.mesa[2]); pset(x + 1, 150, S.mesa[0]); pset(x, 151, S.mesa[3]); }
    rect(140, 152, 258, 152, S.mesa[3]);
    rect(144, 153, 252, 157, S.mesa[0]); rect(144, 153, 252, 153, S.mesa[3]); rect(144, 157, 252, 157, S.mesa[3]);
    for (let x = 146; x < 252; x += 6) pset(x, 157, S.mesa[1]);
    for (const [a, b] of [[152, 188], [204, 248]]) { rect(a, 154, b, 156, S.mesa[1]); rect(a, 154, b, 154, S.mesa[3]); rect(a, 156, b, 156, S.mesa[2]); const cx = (a + b) >> 1; rect(cx - 1, 155, cx + 1, 155, S.oro[0]); pset(cx - 1, 155, S.oro[2]); }
    // las patas torneadas (bolo, anillo, huso) con su brillo a la izquierda, el travesaño y los pies
    for (const lx of [142, 196, 254]) { for (let y = 153; y <= 172; y++) { const u = (y - 153) / 19, w = u < 0.15 ? 2 : u < 0.3 ? 3 : u < 0.38 ? 2 : u < 0.45 ? 3 : u < 0.8 ? 2 - (u > 0.6 ? 1 : 0) : 2;
        for (let x = lx - w + 1; x <= lx + w; x++) pset(x, y, x === lx - w + 1 ? S.mesa[2] : x === lx + w ? S.mesa[3] : S.mesa[1]); if (y === 159 || y === 161) for (let x = lx - 2; x <= lx + 3; x++) pset(x, y, S.mesa[3]); }
      rect(lx - 2, 172, lx + 3, 173, S.mesa[3]); pset(lx - 1, 172, S.mesa[2]); }
    rect(143, 166, 253, 167, S.mesa[1]); rect(143, 166, 253, 166, S.mesa[2]); rect(143, 168, 253, 168, S.mesa[3]);
    // los papeles (con renglones), plumas y tinteros
    for (const [x0, k] of [[146, 0], [176, 1], [206, 2], [232, 3]]) { rect(x0 + 1, 142, x0 + 15, 146, S.mesa[3]); rect(x0, 141, x0 + 14, 145, S.papel[0]); rect(x0, 145, x0 + 14, 145, S.papel[1]); for (let y = 142; y <= 144; y++) for (let x = x0 + 2; x < x0 + 12; x++) if (h(x, y + k, 914) < 0.6) pset(x, y, S.papel[2]);
      rect(x0 + 17, 140, x0 + 19, 143, hex('#1a1a24')); pset(x0 + 17, 140, hex('#5a5a6a')); pset(x0 + 20, 143, S.mesa[3]); linea(x0 + 18, 139, x0 + 22 + (k & 1), 132, S.papel[0]); linea(x0 + 19, 139, x0 + 23 + (k & 1), 133, S.papel[1]); pset(x0 + 22 + (k & 1), 132, hex('#ffffff')); }
    // la pila de libros
    rect(244, 135, 256, 139, hex('#5a2a1e')); rect(245, 131, 255, 134, hex('#2a3a5a')); rect(244, 135, 256, 135, hex('#e8dcc0')); rect(245, 131, 255, 131, hex('#4a5a7a')); rect(246, 136, 255, 136, hex('#c8a040')); rect(257, 136, 258, 139, S.mesa[3]);
    // la salvadera, la barra de lacre con su sello y dos bolas de papel arrugado
    rect(171, 135, 174, 139, S.oro[1]); rect(171, 135, 174, 135, S.oro[2]); pset(172, 134, S.oro[0]); pset(173, 134, S.oro[0]);
    rect(201, 139, 205, 139, hex('#a82a2a')); pset(201, 139, hex('#d85a4a')); disco(222, 139.5, 1.2, hex('#8a1e1e'));
    for (const [x, y] of [[226, 138], [140, 139]]) { disco(x, y, 1.8, S.papel[1]); pset(x - 1, y - 1, S.papel[0]); pset(x + 1, y, S.papel[2]); }
    // la licorera de vino con dos copas, a la izquierda
    { const x = 143; disco(x, 135, 3.4, hex('#4a1020')); disco(x - 1, 134, 1.6, hex('#8a2a3a')); rect(x - 1, 128, x, 131, hex('#7a8a96')); disco(x - 0.5, 127, 1, hex('#c8d4dc')); pset(x - 2, 133, hex('#f4f4ff'));
      for (const cx of [150, 155]) { rect(cx - 1, 135, cx + 1, 136, hex('#6a1a2a')); pset(cx - 1, 135, hex('#c8d4dc')); pset(cx, 137, hex('#9aa4ac')); rect(cx - 1, 138, cx + 1, 138, hex('#9aa4ac')); pset(cx + 1, 134, hex('#c8d4dc')); } }
    // el candelabro de tres brazos en medio, con su peana labrada
    rect(195, 137, 205, 139, S.oro[1]); rect(196, 137, 204, 137, S.oro[2]); rect(199, 124, 201, 137, S.oro[0]); pset(199, 124, S.oro[2]); rect(198, 130, 202, 131, S.oro[1]);
    rect(190, 126, 210, 127, S.oro[0]); rect(190, 126, 210, 126, S.oro[2]); rect(190, 122, 191, 126, S.oro[0]); rect(209, 122, 210, 126, S.oro[0]);
    for (const x of [190, 200, 210]) { const yb = x === 200 ? 124 : 122; rect(x - 2, yb, x + 2, yb, S.oro[1]); pset(x - 2, yb, S.oro[2]); }
  }), 120, 179);
  // las tres velas del candelabro con la cera que gotea, su luz, su reflejo en la caoba y su hilo de humo
  const ll = [b_llama(R, 190, 114, t, 5), b_llama(R, 200, 116, t, 6), b_llama(R, 210, 114, t, 7)];
  for (const [x, y] of [[190, 116], [200, 118], [210, 116]]) { R.rect(x - 1, y + 1, x + 1, y + 6 + (x === 200 ? 2 : 0), hex('#ece4cc')); R.pset(x + 1, y + 2, hex('#c8bc9c')); R.pset(x - 1, y + 3, hex('#fff8e8')); R.pset(x + 2, y + 4 + (x & 1), hex('#e0d6bc')); }
  ll.forEach(([fx, fy], k) => { const fl = Math.sin(t * 9 + k * 2.1) > -0.2; for (let i = -1; i <= 1; i++) b_tine(R, fx + i, 143 + (i & 1), hex('#ffc870'), fl ? 0.45 : 0.25);
    for (let i = 0; i < 5; i++) { const u = (t * 0.5 + i / 5 + k * 0.31) % 1, px = Math.round(fx + Math.sin(u * 7 + t * 1.3 + k) * (u * 3)), py = Math.round(fy - 4 - u * 20); b_tine(R, px, py, hex('#b4aca4'), 0.4 * (1 - u)); } });
  for (const [fx, fy] of ll) b_halo(R, fx, fy, base ? 40 : 14, hex('#ffd080'), base ? 0.28 : 0.18, base ? 30 : 10);
  // la sombra de la mesa en la alfombra (solo con el salón; la mesa de delante ya la tiene debajo)
  if (base) for (let y = 173; y <= 177; y++) for (let x = 136 + (y - 173) * 2; x <= 262 - (y - 173) * 2; x++) if (b_um(x, y) < 0.55 - (y - 173) * 0.08) b_tine(R, x, y, hex('#120806'), 0.4);
  return {};
}
// LA MESA DEL DESAYUNO (cámara 'mesa' del salón): por la mañana, con la luz gris de la lluvia. Detrás: la pared de
// paneles con su zócalo hasta la mesa, el barómetro de banjo (la aguja tiembla en «tormenta»), el aplique apagado, un
// cuadrito de flores (lejos de la zona de Atom), el aparador con la cafetera que humea, el frutero y el gato dormido
// que mueve la cola, los respaldos de las sillas; por la ventana (x 100–220, y 16–98), la lluvia sobre el lago gris
// con la orilla de enfrente y su pueblo, las nubes bajas, una barca de remos que cruza y un mirlo que se refugia en el
// alféizar de fuera. Delante, la mesa entera (b_mesaTabla). Devuelve .hojaMary (la hoja en blanco, x 150–180).
function b_mesa(R, t, o) {
  const S = b_S;
  b_pegar(R, b_fijo(R, 'mesaFija', () => {
    const { rect, pset } = R, mad = [hex('#7a5236'), hex('#5a3a24'), hex('#9a7050'), hex('#3a2414')];
    // la pared de paneles a la luz del día (más oscura en los rincones), la ventana con su marco
    for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 915) < 0.05 ? hex('#5e6a5a') : ((x + (y >> 2) * 3) % 14 === 0 && y % 8 < 4) ? hex('#7e8a74') : hex('#6a7664');
      const rin = Math.min(x, 319 - x); if (rin < 18 && b_um(x, y) < (18 - rin) / 26) c = hex('#56604e'); pset(x, y, c); }
    rect(0, 0, 319, 6, mad[1]); rect(0, 7, 319, 8, mad[2]); rect(0, 9, 319, 9, mad[3]);
    rect(0, 92, 319, 94, mad[2]); rect(0, 95, 319, 95, mad[3]); for (let x = 0; x < 320; x += 40) b_panel(R, x + 2, 98, x + 37, 134, mad, x);
    // el zócalo hasta la mesa (y 135–141): el rodapié con su moldura y la tarima que asoma
    rect(0, 135, 319, 139, mad[1]); rect(0, 135, 319, 135, mad[2]); rect(0, 139, 319, 139, mad[3]); for (let x = 0; x < 320; x += 7) pset(x, 137, mad[3]);
    for (let x = 0; x < 320; x++) { pset(x, 140, (x % 16) === 0 ? hex('#22140a') : hex('#4e321e')); pset(x, 141, (x % 16) === 0 ? hex('#22140a') : h(x, 1, 919) < 0.3 ? hex('#3a2414') : hex('#5e3e26')); }
    rect(98, 14, 222, 100, mad[3]); rect(100, 16, 220, 98, hex('#c8c4b8')); rect(100, 16, 220, 16, hex('#e8e4d8'));
    rect(96, 99, 224, 101, hex('#c8c4b8')); rect(96, 99, 224, 99, hex('#e8e4d8')); rect(96, 101, 224, 101, hex('#8a8676'));   // el alféizar de dentro
    // el barómetro de banjo (la aguja, que tiembla en «tormenta», la pinta b_mesa)
    R.disco(46, 30, 6, mad[1]); R.disco(46, 30, 4, hex('#e8e0c8')); rect(45, 26, 47, 34, hex('#c84a3a')); rect(44, 36, 48, 54, mad[1]); rect(45, 36, 45, 54, mad[2]); R.disco(46, 68, 14, mad[3]); R.disco(46, 68, 13, mad[1]); R.disco(45, 67, 12, mad[2]); R.disco(46, 68, 10, S.oro[0]); R.disco(46, 68, 9, hex('#ece4cc'));
    for (let a = 0; a < 12; a++) { const an = Math.PI * (0.8 + a / 11 * 1.4); pset(Math.round(46 + Math.cos(an) * 7.5), Math.round(68 + Math.sin(an) * 7.5), hex('#3a3428')); } R.disco(46, 84, 4, mad[1]); R.disco(46, 84, 2.5, hex('#d8d0b8'));
    for (let y = 56; y < 84; y++) pset(61, y, hex('#56604e'));   // su sombra en la pared
    // el aplique de pared (apagado de día) y el cuadrito de flores, más abajo que la zona de Atom
    rect(70, 44, 72, 58, S.oro[1]); rect(66, 56, 76, 57, S.oro[0]); rect(66, 50, 67, 55, hex('#ece4cc')); rect(75, 50, 76, 55, hex('#ece4cc')); pset(66, 49, hex('#2a1a10')); pset(75, 49, hex('#2a1a10'));
    { const x0 = 248, y0 = 48; rect(x0, y0, x0 + 30, y0 + 26, S.oro[1]); rect(x0 + 1, y0 + 1, x0 + 29, y0 + 25, S.oro[0]); rect(x0 + 3, y0 + 3, x0 + 27, y0 + 23, hex('#3a4a3a')); rect(x0 + 1, y0 + 1, x0 + 29, y0 + 1, S.oro[2]);
      rect(x0 + 10, y0 + 15, x0 + 20, y0 + 21, hex('#7a8a96')); rect(x0 + 10, y0 + 15, x0 + 20, y0 + 15, hex('#a8b8c4'));   // el jarrón
      for (let k = 0; k < 9; k++) { const fx = x0 + 9 + (k % 3) * 6 + (k > 5 ? 1 : 0), fy = y0 + 6 + Math.floor(k / 3) * 3; R.linea(x0 + 15, y0 + 15, fx, fy + 1, hex('#4a6a3a')); R.disco(fx, fy, 1.8, [hex('#c84a5a'), hex('#e8d070'), hex('#e8e8f0')][k % 3]); }
      rect(x0 + 1, y0 + 27, x0 + 31, y0 + 27, hex('#56604e')); rect(x0 + 31, y0 + 1, x0 + 31, y0 + 26, hex('#56604e')); }
    // el aparador con sus puertas, la cafetera de plata y el frutero con manzanas
    rect(232, 104, 304, 134, mad[1]); rect(232, 104, 304, 106, mad[2]); rect(230, 102, 306, 103, mad[2]); rect(230, 104, 306, 104, mad[3]); for (const x of [236, 270]) b_panel(R, x, 110, x + 30, 132, mad, x);
    for (const x of [264, 272]) { rect(x, 120, x + 1, 122, S.oro[0]); pset(x, 120, S.oro[2]); }
    rect(250, 90, 258, 103, hex('#a8acb4')); rect(251, 90, 252, 103, hex('#e0e4ec')); rect(248, 103, 260, 104, hex('#6a6e78')); rect(259, 94, 262, 96, hex('#a8acb4')); rect(252, 87, 256, 89, hex('#6a6e78')); R.disco(254, 86, 1.2, hex('#e0e4ec'));   // la cafetera
    R.linea(249, 94, 246, 92, hex('#a8acb4')); rect(256, 92, 257, 100, hex('#8a8e98'));
    rect(276, 96, 290, 103, hex('#e8e4dc')); rect(276, 96, 290, 96, hex('#fff8f0')); rect(277, 103, 289, 103, hex('#b8b4ac')); R.disco(281, 93, 3, hex('#c84a3a')); R.disco(287, 94, 2.6, hex('#a8b83a')); pset(280, 91, hex('#f08a7a')); pset(281, 89, hex('#4a2a1a'));   // el frutero con manzanas
    // los respaldos de las sillas (detrás de quien se sienta), con sus patas hasta la mesa
    for (const x of [74, 140, 206]) { rect(x, 112, x + 24, 115, mad[1]); rect(x, 112, x + 24, 112, mad[2]); rect(x + 1, 116, x + 2, 141, mad[1]); rect(x + 22, 116, x + 23, 141, mad[1]); pset(x + 1, 116, mad[2]); for (let k = 0; k < 3; k++) { rect(x + 7 + k * 5, 116, x + 8 + k * 5, 128, mad[3]); pset(x + 7 + k * 5, 116, mad[2]); } rect(x + 1, 129, x + 23, 130, mad[1]); }
  }));
  // por la ventana: la lluvia de la mañana sobre el lago gris, la orilla de enfrente con su pueblo, las nubes bajas que
  // pasan, una barca de remos que cruza y un mirlo en el alféizar de fuera
  R.recorte([101, 17, 219, 97]);
  for (let y = 17; y <= 97; y++) for (let x = 101; x <= 219; x++) { let c = y < 62 ? (b_um(x, y) < (y - 17) / 45 ? hex('#9aa2ae') : hex('#868e9c')) : y < 66 ? hex('#5a6660') : (y + Math.floor(x * 0.3 + t * 3)) % 5 === 0 ? hex('#8a94a0') : hex('#6e7886');
    const n = Math.sin(x * 0.05 - t * 0.25 + Math.sin(y * 0.2) * 1.2), n2 = Math.sin(x * 0.08 + t * 0.6 + y * 0.3); if (y < 58 && n > 0.6) c = n > 0.85 ? hex('#c4cad2') : hex('#b4bac4'); else if (y < 40 && n2 > 0.8) c = hex('#a6adb8'); R.pset(x, y, c); }
  for (let x = 101; x <= 219; x++) { const top = 62 - Math.round(Math.abs(Math.sin(x * 0.07)) * 6 + h(x >> 1, 2, 916) * 2); R.linea(x, top, x, 62, hex('#6e7a84')); }
  // el pueblo de la orilla de enfrente: casitas claras con su tejado, el campanario y el humo de una chimenea
  for (const [x, w, al] of [[118, 6, 3], [126, 4, 4], [168, 5, 3], [175, 4, 3], [196, 6, 4]]) { R.rect(x, 62 - al, x + w, 62, hex('#a8aca8')); R.rect(x, 62 - al - 1, x + w, 62 - al, hex('#7a5a4e')); R.pset(x + 2, 62 - al + 2, hex('#5a6262')); }
  R.rect(158, 50, 160, 62, hex('#a0a4a4')); R.pset(159, 49, hex('#7a5a4e')); R.pset(159, 48, hex('#7a5a4e'));
  for (let i = 0; i < 6; i++) { const u = (t * 0.25 + i / 6) % 1; b_tine(R, Math.round(129 + u * 8 + Math.sin(u * 6 + t) * 1.5), Math.round(57 - u * 12), hex('#c8ccd0'), 0.5 * (1 - u)); }
  // la barca de remos que cruza despacio, y el remo que sube y baja
  { const bx = Math.round(((t * 3 + 30) % 160) + 80), by = 74 + Math.round(Math.sin(t * 1.3)), re = Math.sin(t * 2.4) > 0 ? 1 : 0;
    R.rect(bx - 6, by, bx + 6, by + 1, hex('#3a2e26')); R.rect(bx - 5, by + 2, bx + 5, by + 2, hex('#2a201a')); R.rect(bx - 1, by - 4, bx + 1, by - 1, hex('#3a3a4a')); R.pset(bx, by - 5, hex('#c8a890')); R.rect(bx - 1, by - 6, bx + 1, by - 6, hex('#2a2a32'));
    R.linea(bx + 1, by - 2, bx + 7, by + 2 - re * 2, hex('#6a5a4a')); R.linea(bx - 1, by - 2, bx - 7, by + 2 - re * 2, hex('#6a5a4a'));
    for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(bx - 6 - i * 2, by + 2, hex('#9aa4b0')); }
  b_lluvia(R, t, 60, 1.2, 4, 17, 97, hex('#c8ced8'), hex('#9aa2b0'), 3, 130);
  // el mirlo del alféizar de fuera: se sacude el agua de vez en cuando y salta
  { const fase = t % 7, salta = fase > 5 && fase < 5.4, sac = fase > 2 && fase < 2.5, bx = 196 + (Math.floor(t / 7) % 2 ? 8 : 0) + (salta ? Math.round((fase - 5) * 20) : 0), by = 96 - (salta ? Math.round(Math.sin((fase - 5) / 0.4 * Math.PI) * 4) : 0);
    R.rect(bx - 3, by - 3, bx + 2, by - 1, hex('#1a1a20')); R.rect(bx + 1, by - 5, bx + 3, by - 3, hex('#1a1a20')); R.pset(bx + 4, by - 4, hex('#e8a020')); R.pset(bx + 2, by - 4, hex('#e8a020'));
    R.linea(bx - 3, by - 2, bx - 6, by - 4 - (sac ? 1 : 0), hex('#1a1a20')); R.pset(bx, by, hex('#c88a20')); if (sac) { R.pset(bx - 5, by - 5, hex('#c8d4e0')); R.pset(bx + 4, by - 6, hex('#c8d4e0')); } }
  b_cristalLluvia(R, t, 101, 17, 219, 97, hex('#e4e8ee'), hex('#5a6270'), 12, 4);
  R.recorte(null);
  for (const x of [140, 180]) { R.rect(x - 1, 16, x + 1, 98, hex('#c8c4b8')); R.rect(x + 1, 16, x + 1, 98, hex('#8a8676')); }
  for (const y of [42, 70]) { R.rect(100, y - 1, 220, y + 1, hex('#c8c4b8')); R.rect(100, y + 1, 220, y + 1, hex('#8a8676')); }
  const cc = [hex('#7a2e30'), hex('#521a20'), hex('#9a4444')], sw = Math.sin(t * 0.8) * 1.2;
  // la barra de las cortinas, por debajo de la barra del año (y 21–22), y las cortinas que cuelgan de ella
  R.rect(82, 21, 238, 22, a_mesaBarra(S)); R.rect(82, 21, 238, 21, S.oro[2]); for (const x of [82, 238]) R.disco(x, 22, 1.8, S.oro[0]);
  b_cortina(R, 84, 112, 23, 110, 70, cc, -1, sw); b_cortina(R, 208, 236, 23, 110, 70, cc, 1, -sw);
  for (const [a, b] of [[85, 112], [208, 235]]) for (let x = a; x <= b; x += 5) R.pset(x, 23, S.oro[1]);
  // la luz gris que entra por la ventana y cae en diagonal
  for (let y = 98; y < 136; y++) for (let x = 100 + (y - 98); x < 222 + (y - 98) * 1.4; x++) if (b_um(x, y) < 0.3) b_tine(R, x, y, hex('#c8d0dc'), 0.18);
  { const an = Math.PI * 0.95 + Math.sin(t * 5) * 0.04 + Math.sin(t * 13) * 0.02; R.linea(46, 68, 46 + Math.cos(an) * 8, 68 + Math.sin(an) * 8, hex('#1a1a24')); R.pset(46, 68, S.oro[1]); }   // la aguja del barómetro, en «tormenta»
  // el vapor de la cafetera y el gato dormido en el aparador (respira y mueve la punta de la cola)
  for (let i = 0; i < 5; i++) { const u = (t * 0.4 + i / 5) % 1; b_tine(R, Math.round(245 - u * 3 + Math.sin(u * 7 + t) * 1.5), Math.round(91 - u * 14), hex('#eef2f6'), 0.55 * (1 - u)); }
  { const x = 240, y = 101, r = Math.sin(t * 1.4) > 0 ? 1 : 0, ga = hex('#c87a3a'), gaS = hex('#8a5224'), gaL = hex('#e8a060');
    R.rect(x - 7, y - 3 - r, x + 4, y, ga); R.rect(x - 6, y - 3 - r, x + 3, y - 3 - r, gaL); R.rect(x - 7, y, x + 4, y, gaS); for (const k of [-4, 0]) R.pset(x + k, y - 2 - r, gaS);
    R.rect(x + 3, y - 5, x + 7, y - 1, ga); R.pset(x + 4, y - 6, ga); R.pset(x + 7, y - 6 + (Math.sin(t * 0.9) > 0.9 ? 1 : 0), ga); R.pset(x + 6, y - 3, gaS); R.pset(x + 5, y - 3, gaS); R.pset(x + 8, y - 2, hex('#e8b8a8'));
    const cola = Math.round(Math.sin(t * 2.1) * 1.5); R.linea(x - 7, y, x - 11, y + 1, ga); R.linea(x - 11, y + 1, x - 12, y - 1 + cola, gaS); R.pset(x - 12, y - 2 + cola, gaL); }
  b_mesaTabla(R, t, o, true);
  return { suelo: 146, libre: [40, 280], mesa: [0, 319, 142], hojaMary: [150, 146, 180, 154], ventana: [100, 16, 220, 98] };
}
// la mesa del desayuno (delante de los que se sientan): el mantel blanco de damasco con su trama de rombos, sus
// pliegues de plancha y la sombra de cada cosa, la cenefa bordada y el remate de encaje; las tazas con sus platos y sus
// cucharillas, la tetera de plata que humea, el cesto de pan con las migas, la mantequilla, la mermelada (con una
// avispa que la ronda), la huevera, el plato de tostadas, la jarrita de leche, el azucarero, el cabo de vela de
// anoche, y las hojas: las de los demás escritas (renglones de rayitas) y LA DE MARY EN BLANCO (x 150–180, y 146–154),
// con su pluma y su tintero
function b_mesaTabla(R, t, o, base = false) {
  const { rect, pset } = R, S = b_S;
  b_pegar(R, b_fijo(R, 'mesaTabla', () => {
    const man = hex('#d4d8dc'), manS = hex('#b0b4bc'), manL = hex('#eceef2'), manD = hex('#888c96'), manR = hex('#c6cad2'), bor = hex('#8a9ab8'), borS = hex('#5a6a8a');
    for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 165) { const a = (x + y * 2) & 15, b = (x - y * 2 + 640) & 15; c = (a === 0 || b === 0) && ((x + y) & 1) ? manR : man;   // la trama de rombos del damasco
        if (((x - 4) & 15) === 8 && ((y >> 1) & 3) === 1 && (a > 5 && a < 11)) c = manR;
        if (y < 147 && b_um(x, y) < (147 - y) / 7) c = manR;   // el fondo de la mesa, en penumbra
        if ((x % 64) === 0 || (y === 156 && (x & 1))) c = manS;   // los pliegues de la plancha
        if (h(x >> 2, y >> 1, 917) < 0.03) c = manS; }
      else if (y < 170) { c = y === 165 || y === 169 ? manS : ((x + (y === 167 ? 2 : 0)) % 4 < 2 ? bor : (y === 167 ? borS : man)); if (y === 166 || y === 168) c = (x % 8 === 3) ? borS : man; }   // la cenefa bordada
      else c = ((x + 3) % 22 < 3 ? manD : (x % 22) < 8 ? manS : man);
      if (y === 142) c = manL; if (y === 143) c = manS; pset(x, y, c); }
    // el remate de encaje: las ondas del borde y sus calados
    for (let x = 0; x < 320; x++) { const o8 = x & 7, alto = o8 < 4 ? o8 : 7 - o8; for (let y = 170; y <= 171 + (alto >> 1); y++) pset(x, y, (x + y) % 3 === 0 ? manS : manL); pset(x, 172 + (alto >> 1), manD); }
    // la sombra de cada cosa en el mantel (la luz viene de la ventana, detrás a la izquierda)
    const sombra = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) & 1) pset(x, y, manS); };
    // las hojas de los demás (con renglones) y la de Mary en blanco
    const hoja = (x0, y0, esc, k) => { rect(x0 + 1, y0 + 1, x0 + 31, y0 + 9, manD); rect(x0, y0, x0 + 30, y0 + 8, S.papel[0]); rect(x0, y0 + 8, x0 + 30, y0 + 8, S.papel[1]); if (esc) for (let y = y0 + 2; y <= y0 + 6; y += 2) for (let x = x0 + 3; x < x0 + 27; x++) if (h(x, y + k, 918) < 0.62) pset(x, y, hex('#3a3448')); };
    hoja(78, 146, true, 1); hoja(150, 146, false, 0); hoja(214, 146, true, 2); hoja(112, 158, true, 3); hoja(250, 158, true, 4);
    rect(185, 151, 188, 155, manD); rect(184, 150, 187, 154, hex('#1a1a24')); pset(184, 150, hex('#5a5a6a')); pset(185, 151, hex('#3a3a4a')); R.linea(186, 149, 192, 140, S.papel[0]); R.linea(187, 149, 193, 141, S.papel[1]); pset(192, 140, hex('#ffffff'));   // el tintero y la pluma de Mary
    // las tazas con sus platos y sus cucharillas
    for (const x of [60, 132, 200, 286]) { sombra(x - 4, 151, x + 9, 153); R.disco(x, 150, 6, manD); R.disco(x, 149, 6, hex('#f4f4f0')); R.disco(x, 149, 4, hex('#e4e4e0')); rect(x - 3, 142, x + 3, 148, hex('#f4f4f0')); rect(x - 3, 142, x + 3, 143, hex('#6a4a30')); rect(x + 3, 142, x + 3, 148, hex('#c8c8c4')); rect(x + 4, 144, x + 5, 146, hex('#d8d8d4')); pset(x - 1, 145, hex('#4a8acc')); pset(x + 1, 146, hex('#4a8acc')); rect(x - 2, 147, x + 2, 147, hex('#4a8acc'));
      R.linea(x + 5, 151, x + 9, 153, hex('#a8acb4')); pset(x + 9, 153, hex('#e0e4ec')); }
    // la tetera de plata, el cesto de pan con las migas, la mantequilla, la mermelada y la palmatoria con el cabo de anoche
    { const x = 104; sombra(x - 4, 153, x + 12, 155); R.disco(x, 146, 8, hex('#8a8e98')); R.disco(x - 1, 145, 7, hex('#c8ccd4')); R.disco(x - 3, 142, 3, hex('#f0f2f6')); rect(x - 3, 136, x + 3, 138, hex('#8a8e98')); R.disco(x, 135, 1.5, hex('#e0e4ec')); R.linea(x + 7, 145, x + 12, 140, hex('#8a8e98')); R.linea(x + 8, 145, x + 13, 141, hex('#c8ccd4')); rect(x - 11, 142, x - 8, 143, hex('#2a2a2a')); rect(x - 11, 144, x - 10, 149, hex('#2a2a2a'));
      for (let a = 0; a < 6; a++) pset(Math.round(x - 5 + a * 2), 149 + (a & 1), hex('#6a6e78')); pset(x - 4, 141, hex('#ffffff')); }
    { const x = 236; sombra(x - 9, 147, x + 13, 148); rect(x - 10, 140, x + 10, 146, hex('#a87a3a')); for (let i = x - 10; i <= x + 10; i += 2) rect(i, 140, i, 146, hex('#7a5222')); for (let y = 141; y <= 145; y += 2) for (let i = x - 9; i <= x + 9; i += 4) pset(i + ((y >> 1) & 1) * 2, y, hex('#c8964a')); R.disco(x - 4, 138, 3.5, hex('#c88a40')); R.disco(x + 4, 138, 3.5, hex('#d89a50')); pset(x - 5, 136, hex('#f0c070')); pset(x + 3, 136, hex('#f0c070')); R.linea(x - 6, 139, x - 2, 137, hex('#a8682a')); }
    for (const [x, y] of [[224, 150], [229, 152], [247, 149], [252, 151], [220, 155], [36, 166], [210, 162]]) pset(x, y, hex('#b88a4a'));   // las migas
    { const x = 270; sombra(x - 4, 166, x + 7, 167); R.disco(x, 162, 5, hex('#f4f4f0')); rect(x - 3, 160, x + 3, 163, hex('#f0d870')); rect(x - 3, 160, x + 3, 160, hex('#fff0a0')); R.linea(x + 2, 159, x + 8, 156, hex('#a8acb4')); pset(x + 3, 161, hex('#d8c050')); }
    { const x = 40; sombra(x - 2, 162, x + 5, 163); rect(x - 3, 154, x + 3, 162, hex('#d8dce4')); rect(x - 2, 155, x + 2, 160, hex('#8a1e3a')); rect(x - 3, 153, x + 3, 154, hex('#a8acb4')); pset(x - 2, 155, hex('#c84a6a')); pset(x + 2, 157, hex('#f0f4f8')); R.linea(x + 3, 153, x + 7, 150, hex('#a8acb4')); }
    { const x = 168, y = 168; rect(x - 5, y - 1, x + 5, y, S.oro[1]); rect(x - 4, y - 2, x + 4, y - 2, S.oro[0]); rect(x - 1, y - 6, x + 1, y - 3, hex('#ece4cc')); rect(x - 2, y - 3, x + 2, y - 3, hex('#d8ccb0')); pset(x, y - 7, hex('#2a1a10')); pset(x + 2, y - 4, hex('#f4ecd8')); }   // el cabo de vela de anoche
    // la huevera con su huevo, el plato de tostadas, la jarrita de leche y el azucarero
    { const x = 14; sombra(x - 2, 158, x + 6, 159); rect(x - 2, 154, x + 2, 157, hex('#e8e4dc')); rect(x - 3, 157, x + 3, 157, hex('#b8b4ac')); R.disco(x, 151, 2.5, hex('#f0e0c0')); pset(x - 1, 150, hex('#fff8ec')); }
    { const x = 198, y = 162; sombra(x - 5, y + 4, x + 9, y + 5); R.disco(x, y, 7, manD); R.disco(x, y - 1, 7, hex('#f4f4f0')); R.disco(x, y - 1, 5, hex('#e8e8e4'));
      for (const [dx, dy] of [[-3, -3], [1, -1]]) { rect(x + dx - 2, y + dy - 1, x + dx + 3, y + dy + 1, hex('#d8a050')); rect(x + dx - 2, y + dy - 1, x + dx + 3, y + dy - 1, hex('#a8682a')); } }
    { const x = 302; sombra(x - 2, 162, x + 6, 163); rect(x - 3, 154, x + 3, 161, hex('#f4f4f0')); rect(x + 3, 154, x + 3, 161, hex('#c8c8c4')); rect(x - 4, 153, x - 3, 154, hex('#f4f4f0')); rect(x + 4, 155, x + 5, 158, hex('#d8d8d4')); rect(x - 2, 156, x + 2, 156, hex('#4a8acc')); }
    { const x = 120; sombra(x - 2, 156, x + 7, 157); R.disco(x, 152, 4, hex('#a8acb4')); R.disco(x - 1, 151, 3, hex('#e0e4ec')); rect(x - 1, 147, x + 1, 148, hex('#a8acb4')); pset(x - 2, 150, hex('#ffffff')); }
  }), 130, 179);
  // el vapor de las tazas y de la tetera
  for (const [x, y, k] of [[104, 133, 0], [132, 140, 1], [200, 140, 2], [60, 140, 3]]) for (let i = 0; i < 5; i++) { const u = ((t * 0.45 + i / 5 + k * 0.17) % 1), px = Math.round(x + Math.sin(u * 7 + k + t) * 2), py = Math.round(y - u * 18); if (u < 0.85) R.pset(px, py, b_mez(R.pget(px, py), hex('#f4f6fa'), 0.6 - u * 0.5)); }
  // el brillo que corre por las cucharillas y la avispa que ronda la mermelada
  for (const x of [60, 132, 200, 286]) if (Math.sin(t * 1.7 + x) > 0.85) R.pset(x + 7, 152, hex('#ffffff'));
  { const a = t * 3.1, ax = Math.round(40 + Math.cos(a) * 8 + Math.sin(a * 2.3) * 3), ay = Math.round(148 + Math.sin(a * 1.4) * 4), al = Math.floor(t * 18) % 2;
    R.pset(ax, ay, hex('#e8b820')); R.pset(ax + 1, ay, hex('#1a1a1a')); R.pset(ax - 1, ay, hex('#1a1a1a')); R.pset(ax, ay - 1 - al, hex('#e4ecf4')); R.pset(ax + 1, ay - 1 - al, hex('#c8d4e0')); }
  return {};
}
// EL CUARTO DE MARY de noche (ver la cabecera de lago())
const b_K = (() => { const p = (a) => a.map(hex); return {
  pared: p(['#262c44', '#1e2238', '#303856']), mad: p(['#2e2430', '#221a24', '#3e3242', '#16101a']), suelo: p(['#2a2230', '#201a26', '#3a3040', '#140e18']),
  ropa: p(['#3c4668', '#2c3452', '#56638a', '#1e2440']), luna: hex('#c8d8ff'), lunaL: hex('#eef4ff') }; })();

function b_cuarto(R, t, o) {
  const K = b_K, sue = Math.max(0, Math.min(1, o.sueno ?? 0)), B = R.buf;
  b_pegar(R, b_fijo(R, 'cuartoFijo', () => b_cuartoFijo(R)));
  // la luna que pasa entre nubes: el hilo de luz respira
  const lum = 0.75 + 0.25 * Math.sin(t * 0.35) * Math.sin(t * 0.13 + 1);
  // los hilos de luna que se cuelan por las rendijas de los postigos (la del medio y dos de las tablas) y su haz en
  // diagonal hasta el suelo y la cama
  const rend = [[66, 36, 108, 0.9], [52, 70, 76, 0.5], [80, 54, 64, 0.45]];
  for (const [x, y0, y1, a] of rend) for (let y = y0; y <= y1; y++) R.pset(x, y, b_mez(K.pared[0], K.lunaL, a * lum));
  for (let x = 40; x <= 94; x++) { if (b_um(x, 0) < 0.6) R.pset(x, 29, b_mez(K.mad[0], K.luna, 0.45 * lum)); if (b_um(x, 1) < 0.5) R.pset(x, 111, b_mez(K.mad[0], K.luna, 0.35 * lum)); }   // la luna que se cuela por arriba y por abajo de los postigos
  for (let y = 100; y < 180; y++) { const s = (y - 100), xa = 66 + s * 1.15, w = 1.5 + s * 0.16; for (let x = Math.floor(xa - w); x <= xa + w; x++) { const k = 1 - Math.abs(x - xa) / (w + 1); if (b_um(x, y + Math.floor(t * 3)) < k * 0.8) b_tine(R, x, y, K.luna, (k > 0.75 ? 0.32 : 0.16) * lum); } }
  for (let y = 36; y < 108; y++) for (let i = 0; i < 3; i++) { const x = 67 + Math.round((y - 36) * 0.06) + i; if (b_um(x, y) < 0.35) b_tine(R, x, y, K.luna, 0.12 * lum); }
  // la mancha de luna en el suelo y la que cruza la colcha
  for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 4.2) ** 2; if (e < 1) b_tine(R, 152 + i + Math.round(j * 0.6), 174 + j, K.lunaL, (e < 0.4 ? 0.4 : 0.22) * lum); }
  // las motas de polvo que flotan en el hilo de luz
  for (let k = 0; k < 9; k++) { const u = ((t * 0.04 + h(k, 1, 920)) % 1), y = 110 + u * 60, x = 66 + (y - 100) * 1.15 + Math.sin(t * 0.7 + k) * 4; if (Math.sin(t * 2 + k * 3) > -0.3) R.pset(Math.round(x), Math.round(y), K.lunaL); }
  // la vela de la mesilla y su luz cálida (la mesilla va por delante: b_mesilla)
  const v = b_mesilla(R, t, o); b_halo(R, v[0], v[1], 56, hex('#ffb860'), 0.34, 46);
  b_mesilla(R, t, o);
  // la cortina del dosel que se mueve apenas
  { const sw = Math.round(Math.sin(t * 0.6) * 1); for (let y = 54; y < 110; y++) { const w = 3 + Math.round((y - 54) / 18); for (let i = 0; i < w; i++) R.pset(228 - i + Math.round(sw * (y - 54) / 56), y, i === 0 ? K.ropa[3] : i % 2 ? K.ropa[1] : K.ropa[0]); } }
  // una polilla que ronda la vela
  { const a = t * 2.2, x = Math.round(v[0] + Math.cos(a) * 9), y = Math.round(v[1] - 6 + Math.sin(a * 1.3) * 5), al = Math.floor(t * 14) % 2; R.pset(x, y, hex('#a89880')); R.pset(x - 1, y - al, hex('#7a6a58')); R.pset(x + 1, y - al, hex('#7a6a58')); }
  // LA VISIÓN sobre la cama
  let ojos = null; const vc = [194, 66];
  if (sue > 0) ojos = b_vision(R, t, sue, vc, !!o.calido);
  return { suelo: 150, libre: [30, 150], cama: [160, 262], almohada: [246, 108], vela: v, postigos: [40, 30, 94, 110], vision: vc, ojos };
}

// el fondo fijo del cuarto: el papel pintado de rayas en la penumbra, el zócalo, los postigos cerrados con sus tablas,
// el armario, la cama de medio dosel con su colcha y la almohada, la tarima y una alfombrilla
function b_cuartoFijo(R) {
  const { rect, pset } = R, K = b_K;
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const s = x % 10; pset(x, y, s < 1 ? K.pared[1] : s === 5 && (y >> 2) % 3 === 0 ? K.pared[2] : h(x, y, 921) < 0.04 ? K.pared[1] : K.pared[0]); }
  rect(0, 0, 319, 5, K.mad[1]); rect(0, 6, 319, 6, K.mad[2]); rect(0, 7, 319, 7, K.mad[3]); rect(0, 18, 319, 18, K.mad[2]); rect(0, 19, 319, 19, K.mad[3]);   // la cornisa y la moldura de colgar cuadros
  rect(286, 56, 310, 82, K.mad[2]); rect(287, 57, 309, 81, K.mad[3]); rect(289, 59, 307, 79, hex('#2e3650')); for (let x = 289; x <= 307; x++) { const top = 72 - Math.round(Math.abs(Math.sin(x * 0.25)) * 6); rect(x, top, x, 79, hex('#1e2438')); } R.disco(302, 63, 1.6, hex('#8a94b8')); R.linea(298, 19, 292, 56, K.mad[3]); R.linea(298, 19, 304, 56, K.mad[3]);   // un grabado del lago de noche colgado de la moldura
  rect(0, 126, 319, 127, K.mad[2]); rect(0, 128, 319, 149, K.mad[1]); for (let x = 2; x < 318; x += 30) b_panel(R, x, 130, x + 27, 147, K.mad, x);
  b_tarima(R, 150, 179, K.suelo, 7, 120);
  // la ventana con los postigos cerrados: el marco, las dos hojas de tablas con sus barras en Z y el pestillo
  rect(36, 26, 98, 114, K.mad[3]); rect(38, 28, 96, 112, K.mad[0]); rect(34, 112, 100, 116, K.mad[2]); rect(34, 117, 100, 118, K.mad[3]);
  for (const [x0, x1] of [[40, 65], [67, 94]]) { for (let x = x0; x <= x1; x++) for (let y = 30; y <= 110; y++) pset(x, y, (x - x0) % 6 === 0 ? K.mad[3] : h(x, y >> 2, 922) < 0.1 ? K.mad[1] : K.mad[0]);
    for (const y of [38, 100]) { rect(x0, y, x1, y + 2, K.mad[2]); rect(x0, y + 3, x1, y + 3, K.mad[3]); } R.linea(x0, 41, x1, 99, K.mad[2]); R.linea(x0, 42, x1, 100, K.mad[3]); }
  rect(62, 68, 70, 70, hex('#4a4a5a')); pset(64, 68, hex('#8a8aa0'));
  // el armario: dos puertas de paneles, la cornisa y el ojo de la cerradura
  rect(104, 50, 148, 150, K.mad[1]); rect(102, 46, 150, 50, K.mad[2]); rect(102, 51, 150, 51, K.mad[3]); b_panel(R, 107, 56, 124, 144, K.mad, 1); b_panel(R, 128, 56, 145, 144, K.mad, 2); pset(125, 100, hex('#c8a040')); pset(127, 100, hex('#c8a040')); rect(104, 146, 148, 150, K.mad[3]);
  // la cama de medio dosel: el dosel con su faldón, el cabecero, el colchón, la colcha acolchada, la almohada y las patas
  rect(230, 42, 266, 48, K.ropa[1]); for (let x = 230; x <= 266; x++) { const y = 49 + Math.round(Math.abs(Math.sin((x - 230) / 6 * Math.PI)) * 3); rect(x, 48, x, y, K.ropa[0]); pset(x, y, K.ropa[3]); } rect(230, 42, 266, 42, K.ropa[2]); rect(228, 40, 268, 41, K.mad[2]);
  for (let y = 52; y < 112; y++) { const w = 4 + Math.round((y - 52) / 14); for (let i = 0; i < w; i++) pset(266 - i, y, i === w - 1 ? K.ropa[3] : i % 2 ? K.ropa[1] : K.ropa[0]); }
  rect(258, 70, 266, 140, K.mad[0]); rect(258, 70, 266, 72, K.mad[2]); b_panel(R, 259, 76, 265, 112, K.mad, 3); R.disco(262, 68, 2.5, K.mad[2]);   // el cabecero
  rect(160, 104, 164, 150, K.mad[0]); R.disco(162, 102, 2.5, K.mad[2]); rect(164, 112, 258, 116, K.ropa[2]);   // el pie y el colchón
  for (let y = 116; y <= 140; y++) for (let x = 164; x <= 258; x++) { const q = ((x - 164) % 12 === 0) || ((y - 116) % 8 === 0); pset(x, y, y > 136 ? K.ropa[3] : q ? K.ropa[1] : h(x, y, 923) < 0.06 ? K.ropa[2] : K.ropa[0]); }
  for (let x = 164; x <= 258; x++) pset(x, 141 + (x % 5 === 0 ? 1 : 0), K.ropa[3]);
  for (const lx of [166, 254]) rect(lx, 142, lx + 2, 150, K.mad[1]);
  rect(236, 104, 256, 112, hex('#5a648a')); rect(237, 104, 255, 105, hex('#7a86aa')); rect(236, 112, 256, 112, K.ropa[3]); pset(240, 107, hex('#4a5478'));   // la almohada
  // el espejo ovalado sobre la cama, con el destello de la luna, y el palanganero con la jarra y la toalla
  for (let j = -11; j <= 11; j++) for (let i = -8; i <= 8; i++) { const e = (i / 8) ** 2 + (j / 11) ** 2; if (e < 1) pset(198 + i, 74 + j, e > 0.72 ? K.mad[2] : e > 0.6 ? K.mad[3] : (i + j) % 7 === 0 && i < 0 ? K.pared[2] : hex('#1a2034')); }
  R.linea(193, 68, 196, 65, hex('#8a9ac8')); R.pset(194, 70, hex('#5a6a98')); rect(197, 60, 199, 62, K.mad[2]);
  rect(6, 118, 30, 120, K.mad[2]); rect(6, 121, 30, 121, K.mad[3]); for (const lx of [8, 28]) rect(lx, 122, lx + 1, 150, K.mad[1]); rect(8, 140, 29, 141, K.mad[1]);
  R.disco(18, 116, 7, hex('#8a94b4')); R.disco(18, 115, 6, hex('#5a6488')); rect(12, 117, 24, 117, hex('#a8b4d8'));
  rect(15, 104, 21, 114, hex('#8a94b4')); rect(16, 103, 20, 103, hex('#a8b4d8')); rect(21, 106, 23, 110, hex('#6a7498')); pset(16, 106, hex('#c8d4f0'));
  rect(30, 122, 32, 136, hex('#6a7498')); rect(31, 122, 32, 136, hex('#4a5478'));
  // la alfombrilla junto a la cama
  for (let y = 158; y < 170; y++) for (let x = 172 - (y - 158); x < 250 + (y - 158); x++) pset(x, y, (y === 158 || y === 169) ? hex('#3a2430') : ((x + y) % 6 < 2) ? hex('#4a2a36') : hex('#3a2230'));
}

// la mesilla de noche con la vela (por delante de los personajes): o.vela 0–1, cuánto se ha consumido (si no, se va
// consumiendo despacio con t); devuelve la llama
function b_mesilla(R, t, o) {
  const K = b_K, x0 = 268, x1 = 292, top = 124, gas = o.vela ?? Math.min(0.8, t / 90);
  R.rect(x0, top, x1, top + 3, K.mad[2]); R.rect(x0, top + 3, x1, top + 3, K.mad[3]); R.rect(x0 + 1, top + 4, x1 - 1, 146, K.mad[0]); R.rect(x0 + 3, top + 7, x1 - 3, top + 13, K.mad[1]); R.pset((x0 + x1) >> 1, top + 10, hex('#c8a040'));
  for (const lx of [x0 + 1, x1 - 2]) R.rect(lx, 147, lx + 1, 150, K.mad[1]);
  R.rect(x0 + 16, top - 4, x0 + 22, top - 1, hex('#4a3a5a')); R.rect(x0 + 16, top - 4, x0 + 22, top - 4, hex('#6a5a7a'));   // un libro
  return b_vela(R, x0 + 8, top, Math.max(2, Math.round(11 * (1 - gas))), t, 8);
}

// la colcha que tapa a quien duerme (por delante): solo deja ver la cabeza en la almohada
function b_colcha(R, t) {
  const K = b_K, r = Math.sin(t * 1.4) > 0.3 ? 1 : 0;
  for (let y = 113 - r; y <= 140; y++) for (let x = 168; x <= 238; x++) { const bulto = y < 116 ? Math.abs(x - 205) < 30 - (116 - y) * 6 : true; if (!bulto) continue; const q = ((x - 164) % 12 === 0) || ((y - 116) % 8 === 0); R.pset(x, y, y < 116 ? K.ropa[2] : q ? K.ropa[1] : K.ropa[0]); }
  R.rect(232, 112 - r, 240, 116, hex('#d8dcec')); R.rect(232, 112 - r, 240, 112 - r, hex('#f0f2fa'));   // el embozo vuelto
}

// la visión: una nube de luz azulada (o cálida) y difusa sobre la cama, con el estudiante arrodillado junto a una mesa
// larga, la forma tendida que se incorpora poco a poco, alta, y luego DOS OJOS AMARILLOS Y ACUOSOS que lo miran
function b_vision(R, t, s, [cx, cy], calido) {
  const B = R.buf, rx = 64, ry = 38, ap = Math.min(1, s / 0.3), luz = calido ? hex('#e8b070') : hex('#8aa8e8'), luzL = calido ? hex('#ffe0a8') : hex('#c8dcff');
  const fig = calido ? hex('#3a2418') : hex('#1a2244'), rim = calido ? hex('#f0b870') : hex('#9ab8f0');
  for (let y = cy - ry; y <= cy + ry; y++) { const f = y * 320; for (let x = cx - rx; x <= cx + rx; x++) {
    const w = Math.sin(x * 0.09 + t * 0.7 + Math.sin(y * 0.13 - t * 0.5) * 2) * 0.12 + Math.sin(y * 0.2 + t * 0.4) * 0.06, d = Math.hypot((x - cx) / rx, (y - cy) / ry) + w;
    if (d >= 1) continue; const k = (1 - d) ** 0.8 * ap, lvl = Math.floor(k * 4 + b_um(x, y) - 0.3) / 4; if (lvl <= 0) continue;
    B[f + x] = b_mez(B[f + x], lvl > 0.7 ? luzL : luz, lvl * 0.62); } }
  // las chispitas que flotan dentro
  for (let k = 0; k < 10; k++) { const a = t * 0.3 + k * 0.63, x = Math.round(cx + Math.cos(a) * (20 + k * 2.5)), y = Math.round(cy + Math.sin(a * 1.3) * (10 + k)); if (ap > 0.5 && Math.sin(t * 3 + k) > 0) R.pset(x, y, luzL); }
  if (s < 0.2) return null;
  const fa = Math.min(1, (s - 0.2) / 0.15), cF = b_mez(luz, fig, fa), cR = b_mez(luz, rim, fa);
  const ps = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
  // la mesa larga (tapa con su canto y cuatro patas)
  const my = cy + 16; R.rect(cx - 28, my, cx + 40, my + 2, cF); R.rect(cx - 28, my - 1, cx + 40, my - 1, cR); for (const lx of [cx - 26, cx - 20, cx + 32, cx + 38]) R.rect(lx, my + 3, lx + 1, my + 18, cF);
  // el estudiante arrodillado a la izquierda: la cabeza, la espalda inclinada hacia la mesa, los brazos, la pierna doblada
  { const bx = cx - 44, sw = Math.sin(t * 1.5) * 0.6, base = my + 18; R.disco(bx + 6 + sw, my - 13, 4, cF); ps(bx + 4 + sw, my - 16, cR); ps(bx + 3 + sw, my - 15, cR); ps(bx + 3 + sw, my - 14, cR);
    R.poligono([[bx, my - 8], [bx + 9, my - 9], [bx + 12, my + 6], [bx + 2, my + 7]], cF); R.linea(bx, my - 8, bx + 2, my + 7, cR);
    R.rect(bx + 2, my + 6, bx + 15, my + 9, cF); R.rect(bx + 13, my + 9, bx + 16, base, cF); R.rect(bx - 2, my + 6, bx + 4, base, cF); R.rect(bx - 4, base - 1, bx + 2, base, cF);
    R.linea(bx + 8, my - 5, bx + 16, my - 1, cF); R.linea(bx + 8, my - 4, bx + 16, my, cF); R.linea(bx + 9, my - 6, bx + 16, my - 2, cR); }
  // la forma: tendida sobre la mesa bajo una sábana, se incorpora (de 0,45 a 0,8) y se queda alta, sentada en el borde
  const inc = Math.max(0, Math.min(1, (s - 0.45) / 0.35)), ang = inc * 1.4 + (inc > 0 && inc < 1 ? Math.sin(t * 9) * 0.03 : 0), px = cx + 18, py = my - 4;
  R.rect(cx - 22, my - 5, px, my - 1, cF); R.linea(cx - 22, my - 6, px, my - 6, cR); R.rect(cx - 25, my - 6, cx - 21, my - 1, cF);   // las piernas tendidas (los pies, a la izquierda)
  const L = 30, hx = px + Math.cos(ang) * L, hy = py - Math.sin(ang) * L, nx = -Math.sin(ang), ny = -Math.cos(ang), ux = Math.cos(ang), uy = -Math.sin(ang);
  const sh = [px + ux * 22, py + uy * 22];   // los hombros
  R.poligono([[px - nx * 5, py - ny * 5], [px + nx * 5, py + ny * 5], [sh[0] + nx * 7, sh[1] + ny * 7], [sh[0] - nx * 7, sh[1] - ny * 7]], cF);
  R.disco(sh[0], sh[1], 6, cF); R.disco(hx, hy, 5.2, cF); R.rect(Math.round(sh[0]) - 1, Math.round(Math.min(sh[1], hy)), Math.round(sh[0]) + 1, Math.round(Math.max(sh[1], hy)), cF);
  ps(hx - 3, hy - 4, cR); ps(hx - 4, hy - 3, cR); ps(hx - 2, hy - 5, cR); R.linea(px + nx * 5, py + ny * 5, sh[0] + nx * 7, sh[1] + ny * 7, cR);
  // el brazo largo que empieza a moverse
  const br = inc > 0 ? Math.sin(Math.min(1, inc * 2) * 1.2) * 0.9 + Math.sin(t * 2.2) * 0.08 * inc : 0, ax = sh[0] - nx * 5, ay = sh[1] - ny * 5 + 2, ex2 = ax - 13 * Math.cos(br), ey2 = ay + 9 - 13 * Math.sin(br);
  R.linea(ax, ay, ex2, ey2, cF); R.linea(ax + 1, ay, ex2 + 1, ey2, cF); R.linea(ax, ay + 1, ex2, ey2 + 1, cF); R.disco(ex2, ey2, 1.6, cF);
  // LOS OJOS: se abren despacio (de 0,78), amarillos y acuosos, con su brillo, y miran al estudiante
  let ojos = null;
  if (s > 0.78) { const ab = Math.min(1, (s - 0.78) / 0.12), parp = Math.floor(t * 0.5) % 5 === 0 && (t * 0.5) % 1 < 0.08, ex = Math.round(hx) - 4, ey = Math.round(hy);
    ojos = [[ex, ey], [ex + 4, ey]];
    if (!parp) for (const [ox, oy] of ojos) { const am = hex('#f0d040'), amS = hex('#b89018'), agua = hex('#fff6b0');
      b_halo(R, ox + 1, oy, 6, am, 0.35 * ab);
      R.rect(ox, oy, ox + 1, oy, ab > 0.5 ? am : amS); if (ab > 0.6) { R.pset(ox, oy - 1, amS); R.pset(ox + 1, oy - 1, am); R.pset(ox, oy + 1, agua); }   // el brillo acuoso de abajo
      if (ab > 0.9) R.pset(ox + 1, oy, hex('#fffef0')); R.pset(ox - 1, oy, hex('#3a3010')); }
    if (ab > 0.9 && Math.sin(t * 1.3) > 0.6) R.pset(ex + 1, ey + 2 + Math.round((t * 2) % 3), hex('#e8e0a0'));   // una gota que brilla
  }
  return ojos;
}

// trama ordenada 4 × 4 (0–1) para degradados, halos y luces tramadas
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 el primero, f = 1 el segundo)
const c_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

const c_lim = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

// un valor v en [0, n] de una rampa de colores, tramado (sin bandas)
const c_ramp = (cols, v, x, y) => { const n = cols.length - 1; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; return cols[l > n ? n : l]; };

const c_H = (a) => a.map(hex);

// lo fijo de cada encuadre se pinta una vez en un búfer propio y se copia en cada fotograma
const c_bufs = new WeakMap();

function c_fijo(R, clave, pinta) {
  let m = c_bufs.get(R); if (!m) c_bufs.set(R, m = new Map());
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// velo de color sobre lo que ya hay (a: cuánto; trama: solo en damero, más suave)
function c_velo(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (trama && ((x + y) & 1)) continue; R.pset(x, y, c_mez(R.pget(x, y), col, a)); }
}

// sombra blanda en elipse (f: cuánto queda de la luz)
function c_sombra(R, cx, cy, rx, ry, f = 0.7) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) R.pset(x, cy + j, c_mez(R.pget(x, cy + j), hex('#0a0810'), 1 - f)); }
}

// nube alargada de base plana (como i_nube del 11): c = [arriba, cuerpo, bajo, filo de abajo]
function c_nube(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 1) ? c[0] : c[1]);
}

// una llama de vela (x, y: la base de la llama) que tiembla con t, con su halo tramado
function c_llama(R, x, y, t, k = 0, halo = 22) {
  const f = Math.sin(t * 11 + k) * 0.5 + Math.sin(t * 17.3 + k * 2) * 0.5, alto = 4 + (f > 0.4 ? 1 : 0), dx = f > 0.6 ? 1 : f < -0.6 ? -1 : 0;
  if (halo) R.halo(x, y - 2, halo + Math.round(f * 2), c_H(['#3a2418', '#5a3420', '#8a5428', '#c08038']), 0.75);
  R.pset(x, y, hex('#5a7ad0')); R.pset(x, y - 1, hex('#ffd070')); R.pset(x - 1, y - 1, hex('#e89838')); R.pset(x + 1, y - 1, hex('#e89838'));
  for (let j = 2; j < alto; j++) R.pset(x + (j > 2 ? dx : 0), y - j, j < alto - 1 ? hex('#fff4c0') : hex('#ffc050'));
  R.pset(x + dx, y - alto, hex('#ff9030'));
}

// un frasco de cristal en un estante (x, yb: centro de la base): 0 matraz redondo, 1 botella alta, 2 tarro ancho con
// tapa, 3 botella de Leyden (lámina de estaño y varilla con bola); col: el líquido; brillo del lado de la luz (lado)
function c_frasco(R, x, yb, tipo, col, lado = 1, k = 0) {
  const { rect, pset, disco } = R, K = hex('#0c0a12'), VID = hex('#3a4a5a'), BR = hex('#e8f2ff'), cs = c_mez(col, K, 0.45), cl = c_mez(col, hex('#ffffff'), 0.35);
  if (tipo === 0) { disco(x + 0.5, yb - 4.5, 5, K); disco(x + 0.5, yb - 4.5, 4, VID); for (let j = -1; j <= 3; j++) for (let i = -4; i <= 4; i++) if (i * i + (j - 0.5) ** 2 < 15) pset(x + i, yb - 4 + j, i * lado > 1 ? cl : i * lado < -1 ? cs : col);
    rect(x - 2, yb - 13, x + 2, yb - 9, K); rect(x - 1, yb - 12, x + 1, yb - 9, VID); rect(x - 1, yb - 14, x + 1, yb - 13, hex('#8a6a48')); pset(x + 2 * lado, yb - 6, BR); pset(x + 3 * lado, yb - 5, BR); }
  else if (tipo === 1) { const a = 13 + (k % 3) * 2; rect(x - 3, yb - a, x + 3, yb, K); rect(x - 2, yb - a + 1, x + 2, yb - 1, VID); rect(x - 2, yb - Math.round(a * 0.55), x + 2, yb - 1, col); rect(x + (lado > 0 ? 2 : -2), yb - Math.round(a * 0.55), x + (lado > 0 ? 2 : -2), yb - 1, cl); rect(x - (lado > 0 ? 2 : -2), yb - Math.round(a * 0.55), x - (lado > 0 ? 2 : -2), yb - 1, cs);
    rect(x - 1, yb - a - 4, x + 1, yb - a, K); pset(x, yb - a - 2, VID); rect(x - 1, yb - a - 5, x + 1, yb - a - 4, hex('#a07850')); pset(x + lado, yb - a + 2, BR); pset(x + lado, yb - a + 3, BR); }
  else if (tipo === 2) { rect(x - 5, yb - 10, x + 5, yb, K); rect(x - 4, yb - 9, x + 4, yb - 1, VID); rect(x - 4, yb - 6, x + 4, yb - 1, col); for (let i = -3; i <= 3; i += 2) pset(x + i, yb - 3 - (i & 2 ? 1 : 0), cs);
    rect(x - 5, yb - 12, x + 5, yb - 10, hex('#5a3a22')); rect(x - 5, yb - 12, x + 5, yb - 12, hex('#8a6038')); rect(x - 3, yb - 8, x + 1, yb - 5, hex('#d8ccaa')); pset(x + 3 * lado, yb - 8, BR); pset(x + 3 * lado, yb - 7, BR); }
  else { rect(x - 4, yb - 11, x + 4, yb, K); rect(x - 3, yb - 10, x + 3, yb - 1, VID); rect(x - 3, yb - 5, x + 3, yb - 1, hex('#a8acb4')); rect(x + (lado > 0 ? 2 : -3), yb - 5, x + (lado > 0 ? 3 : -2), yb - 1, hex('#d8dce4')); rect(x - 3, yb - 11, x + 3, yb - 11, hex('#4a3020'));
    rect(x, yb - 17, x, yb - 11, hex('#8a7040')); disco(x + 0.5, yb - 18.5, 1.6, hex('#d8b060')); pset(x, yb - 19, hex('#fff0b0')); pset(x + 2 * lado, yb - 9, BR); }
}

// unos libros viejos de pie en un estante (x0–x1, base yb); a veces uno tumbado o inclinado
function c_libros(R, x0, x1, yb, k = 0, luz = 0.5) {
  const COL = c_H(['#6a2a24', '#2a3e5a', '#3a4a2a', '#6a4a22', '#4a2a42', '#7a5a32', '#2e2a26']), ORO = hex('#c8a050'), K = hex('#0c0a12');
  let x = x0, i = 0;
  while (x < x1 - 2) { const w = 3 + Math.floor(h(i, k, 401) * 3), a = 12 + Math.floor(h(i, k, 402) * 8), c = COL[Math.floor(h(i, k, 403) * COL.length)], cs = c_mez(c, K, 0.4), cl = c_mez(c, hex('#ffe0b0'), 0.25 * luz);
    if (x + w > x1) break;
    if (h(i, k, 404) < 0.12 && x + a < x1) { R.rect(x, yb - w, x + a, yb - 1, c); R.rect(x, yb - w, x + a, yb - w, cl); R.rect(x, yb - 1, x + a, yb - 1, cs); R.rect(x + 2, yb - w + 1, x + 2, yb - 2, ORO); x += a + 2; i++; continue; }
    R.rect(x, yb - a, x + w - 1, yb - 1, c); R.rect(x, yb - a, x, yb - 1, cl); R.rect(x + w - 1, yb - a, x + w - 1, yb - 1, cs);
    R.rect(x, yb - a + 2, x + w - 1, yb - a + 2, ORO); R.rect(x, yb - 4, x + w - 1, yb - 4, ORO); if (w > 3) R.rect(x + 1, yb - a + 5, x + w - 2, yb - a + 7, c_mez(c, ORO, 0.35));
    x += w + (h(i, k, 405) < 0.15 ? 1 : 0); i++; }
}

const c_PARED = c_H(['#100e16', '#16121c', '#1d1824', '#26202c', '#302630', '#3c2e34', '#4c3a38', '#5e483e', '#745844', '#8c6a4a', '#a88050', '#c09658']);

const c_MAD = c_H(['#0e0a0a', '#1a120e', '#261a14', '#36241a', '#483022', '#5c3e2a', '#744e32', '#8e6240']);

const c_SAB = c_H(['#2a2e3e', '#3a4052', '#4e566a', '#687284', '#86909e', '#a4acb8', '#c0c6ce', '#d8dce2']);

const c_luzVela = (x, y) => c_lim(1 - Math.hypot((x - 277) * 0.72, (y - 112) * 0.95) / 150);

function c_buhardillaFija(R) {
  const { rect, pset, linea, poligono, disco } = R, K = hex('#0c0a12');
  // la pared del fondo: yeso viejo, más cálido cerca de la vela, con desconchones y una mancha de humedad bajo la claraboya
  for (let y = 36; y < 150; y++) for (let x = 0; x < 320; x++) {
    const L = c_luzVela(x, y), n = h(x >> 1, y >> 1, 3) - 0.5, hum = Math.max(0, 1 - Math.hypot((x - 204) * 0.12, (y - 52) * 0.08)) * (0.6 + 0.4 * h(x >> 2, y >> 2, 5));
    let v = 2.7 + L * 7.8 + n * 0.9 - hum * 1.6 + (h(x >> 3, y >> 3, 4) - 0.5) * 0.6; if (h(x, y, 6) < 0.04) v -= 1.2; pset(x, y, c_ramp(c_PARED, v, x, y)); }
  for (const [x0, y0, n] of [[132, 96, 7], [168, 58, 5], [226, 104, 6], [12, 40, 4]]) { let x = x0, y = y0; for (let i = 0; i < n * 3; i++) { pset(x, y, c_PARED[1]); if (h(i, x0, 7) < 0.5) x++; else y++; if (h(i, y0, 8) < 0.2) x--; } }
  // desconchones con el ladrillo debajo
  for (const [x, y, w, a] of [[150, 44, 9, 5], [214, 98, 7, 4]]) { rect(x, y, x + w, y + a, hex('#4a2a24')); for (let i = 0; i <= w; i += 3) rect(x + i, y + 2, x + i, y + 2, hex('#2e1a16')); rect(x - 1, y - 1, x + w + 1, y - 1, c_PARED[2]); }
  // el techo inclinado: tablas entre cabrios que convergen, en penumbra
  for (let y = 0; y < 36; y++) for (let x = 0; x < 320; x++) { const L = c_luzVela(x, y + 40) * 0.8, tab = ((x - 160) / (1 - y * 0.006)) / 7; const jun = Math.abs(tab - Math.round(tab)) < 0.09;
    pset(x, y, c_ramp(c_MAD, 1 + L * 4 + (h(Math.round(tab), y >> 2, 11) - 0.5) * 0.8 - (jun ? 1 : 0), x, y)); }
  for (let k = -5; k <= 5; k++) { const xt = 160 + k * 34, xb = 160 + k * 30;
    poligono([[xt - 3, 0], [xt + 3, 0], [xb + 2, 31], [xb - 2, 31]], (x, y) => c_ramp(c_MAD, 2.2 + c_luzVela(x, y + 40) * 4.5 + (x - xb > 0 ? 0.8 : -0.4) + (h(x, y >> 1, 12) - 0.5) * 0.6, x, y)); linea(xt - 3, 0, xb - 2, 31, c_MAD[0]); }
  // la viga maestra con sus vetas, y dos pies derechos con sus tornapuntas
  for (let y = 30; y < 38; y++) for (let x = 0; x < 320; x++) { const L = c_luzVela(x, y); let v = 3 + L * 4.5 - (y > 35 ? 1.5 : 0) + (y === 30 ? 1 : 0); if (h(x >> 3, y, 13) < 0.25) v -= 0.8; pset(x, y, c_ramp(c_MAD, v, x, y)); }
  for (let x = 6; x < 320; x += 52) { rect(x, 33, x + 1, 34, c_MAD[1]); pset(x, 33, c_MAD[5]); }
  const pie = (x0) => { for (let y = 38; y < 150; y++) for (let x = x0; x < x0 + 7; x++) { const L = c_luzVela(x, y); let v = 2.6 + L * 5 + (x === x0 ? -1 : x === x0 + 6 ? -0.8 : x === x0 + 1 ? 1 : 0); if (h(x, y >> 3, 14) < 0.18) v -= 0.7; pset(x, y, c_ramp(c_MAD, v, x, y)); }
    for (const s of [-1, 1]) { const xa = s < 0 ? x0 : x0 + 6; for (let i = 0; i < 20; i++) for (let w = 0; w < 4; w++) pset(xa + s * i, 58 - i + w - (s < 0 ? 0 : 0) - 0, c_ramp(c_MAD, 2.4 + c_luzVela(xa, 50) * 4 + (w === 0 ? 1 : w === 3 ? -1 : 0), xa + s * i, 58 - i + w)); } };
  pie(112); pie(244);
  // la claraboya: marco de madera (el cristal y lo de fuera se pintan en cada fotograma)
  rect(177, 5, 235, 30, c_MAD[1]); rect(178, 6, 234, 29, c_MAD[4]); rect(179, 7, 233, 28, c_MAD[2]); rect(178, 6, 234, 6, c_MAD[6]); rect(178, 29, 234, 29, c_MAD[0]);
  // la estantería de la izquierda: costados, baldas, fondo en sombra y lo que hay en cada balda
  rect(4, 42, 106, 146, c_MAD[0]); for (let y = 44; y < 146; y++) for (let x = 7; x < 104; x++) pset(x, y, c_ramp(c_MAD, 1.1 + (h(x >> 2, y, 15) - 0.5) * 0.6 + (x % 18 === 0 ? -0.6 : 0), x, y));
  for (const x of [4, 104]) { rect(x, 42, x + 2, 146, c_MAD[4]); rect(x, 42, x, 146, c_MAD[5]); rect(x + 2, 42, x + 2, 146, c_MAD[2]); }
  rect(2, 40, 108, 43, c_MAD[5]); rect(2, 40, 108, 40, c_MAD[7]); rect(2, 43, 108, 43, c_MAD[2]);
  const baldas = [66, 90, 114, 140];
  for (const yb of baldas) { rect(5, yb, 105, yb + 2, c_MAD[5]); rect(5, yb, 105, yb, c_MAD[7]); rect(5, yb + 2, 105, yb + 2, c_MAD[2]); rect(5, yb + 3, 105, yb + 4, c_MAD[0]); }
  const VID = c_H(['#3e8a4a', '#c88a2a', '#3a6ab0', '#8a3a7a', '#a8b830', '#c04a3a', '#4aa8a0']);
  baldas.forEach((yb, f) => { let x = 10, i = 0;
    while (x < 100) { const r = h(i, f, 20), lado = 1;
      if (r < 0.3 && x < 88) { const w = 12 + Math.floor(h(i, f, 21) * 10); c_libros(R, x, Math.min(102, x + w), yb, f * 10 + i, 0.3); x += w + 2; }
      else { const tipo = r < 0.5 ? 0 : r < 0.7 ? 1 : r < 0.86 ? 2 : 3, w = tipo === 2 ? 11 : tipo === 0 ? 10 : 8; if (x + w > 102) break; c_frasco(R, x + (w >> 1), yb - 1, tipo, VID[Math.floor(h(i, f, 22) * VID.length)], lado, i + f); x += w + 1; }
      i++; } });
  // el estante de la pared, sobre la mesa: retortas, un reloj de arena, un tarro; el matraz que hierve se pinta luego
  rect(128, 70, 236, 72, c_MAD[5]); rect(128, 70, 236, 70, c_MAD[7]); rect(128, 73, 236, 74, c_MAD[1]);
  for (const x of [134, 228]) { poligono([[x - 1, 73], [x + 4, 73], [x + 1, 82], [x, 82]], c_MAD[3]); }
  c_frasco(R, 140, 69, 2, VID[4], 1, 2); c_frasco(R, 154, 69, 1, VID[0], 1, 4); c_libros(R, 162, 178, 69, 77, 0.4);
  { const x = 206, y = 69; rect(x - 3, y - 12, x + 3, y, K); rect(x - 2, y - 11, x + 2, y - 7, hex('#4a5a6a')); rect(x - 2, y - 5, x + 2, y - 1, hex('#4a5a6a')); pset(x, y - 6, hex('#c8a870')); rect(x - 2, y - 3, x + 2, y - 1, hex('#c8a870')); rect(x - 4, y - 13, x + 4, y - 12, c_MAD[6]); rect(x - 4, y, x + 4, y, c_MAD[6]); }
  { const x = 222, y = 69; disco(x, y - 5, 5, K); disco(x, y - 5, 4, hex('#5a3a5a')); linea(x + 3, y - 8, x + 12, y - 12, K); linea(x + 3, y - 9, x + 12, y - 13, hex('#7a5a7a')); pset(x - 2, y - 7, hex('#e8f2ff')); }
  // dibujos clavados (trazos, círculos y un esquema de pila; ninguna letra) y las hierbas secas colgadas
  const hoja = (x, y, w, a, k) => { rect(x + 1, y + 1, x + w + 1, y + a + 1, c_PARED[1]); rect(x, y, x + w, y + a, hex('#bfae86')); rect(x, y, x + w, y, hex('#d8c8a0')); for (let i = 0; i < 4; i++) linea(x + 2, y + 3 + i * 3, x + 2 + Math.round(h(i, k, 30) * (w - 4)), y + 3 + i * 3, hex('#6a5a48')); pset(x + (w >> 1), y + 1, hex('#8a2a20')); };
  hoja(132, 80, 16, 14, 1); hoja(152, 84, 12, 16, 2); { const x = 168, y = 82; hoja(x, y, 18, 15, 3); rect(x + 3, y + 4, x + 6, y + 12, hex('#bfae86')); for (let j = 0; j < 8; j += 2) { rect(x + 3, y + 4 + j, x + 6, y + 4 + j, hex('#a8582a')); rect(x + 3, y + 5 + j, x + 6, y + 5 + j, hex('#6a6a70')); } disco(x + 12, y + 8, 3, hex('#6a5a48')); disco(x + 12, y + 8, 2, hex('#bfae86')); }
  for (const [x, l] of [[214, 14], [222, 18], [232, 12]]) { linea(x, 38, x, 44, hex('#5a4a38')); for (let j = 0; j < l; j++) { pset(x + Math.round(Math.sin(j * 0.8 + x) * 1.5), 44 + j, j % 3 ? hex('#5a6a3a') : hex('#7a7a42')); if (j % 2) pset(x + 1 + Math.round(Math.sin(j * 0.8 + x) * 1.5), 44 + j, hex('#4a5232')); } }
  // el abrigo de Victor colgado en el pie derecho
  { const x = 120, y = 52; rect(x, y, x + 1, y + 1, c_MAD[6]); poligono([[x - 1, y + 2], [x + 6, y + 2], [x + 9, y + 34], [x - 3, y + 34]], (px, py) => c_ramp(c_H(['#14141e', '#1e2030', '#2a2e44', '#3a4058']), 1.4 + (px - x) * 0.18 + (h(px, py >> 2, 31) - 0.5) * 0.6, px, py)); linea(x + 3, y + 4, x + 3, y + 33, hex('#10101a')); }
  // la mesita de la derecha (el tablero y las patas; encima, la pila y la vela) y el armario
  for (let x = 250; x <= 292; x++) for (let y = 124; y <= 127; y++) pset(x, y, c_ramp(c_MAD, (y === 124 ? 7 : y === 127 ? 2 : 5) + c_luzVela(x, y) * 1.5, x, y));
  for (const x of [252, 288]) { rect(x, 128, x + 2, 150, c_MAD[3]); rect(x, 128, x, 150, c_MAD[5]); } rect(252, 140, 290, 141, c_MAD[2]);
  { const x = 258, y = 123; rect(x - 6, y - 2, x + 8, y, c_MAD[5]); rect(x - 6, y - 2, x + 8, y - 2, c_MAD[7]);
    for (const gx of [x - 4, x + 6]) { rect(gx, y - 30, gx, y - 3, hex('#7a9ab0')); pset(gx, y - 25, hex('#d8ecff')); }
    for (let j = 0, yy = y - 4; yy > y - 28; j++, yy -= 2) { const c = j % 3 === 0 ? hex('#c87038') : j % 3 === 1 ? hex('#9aa0a8') : hex('#4a3a2a'); rect(x - 2, yy, x + 4, yy + 1, c); pset(x + 4, yy, c_mez(c, hex('#fff0c0'), 0.5)); pset(x - 2, yy + 1, c_mez(c, K, 0.4)); }
    rect(x - 5, y - 31, x + 7, y - 30, c_MAD[5]); rect(x, y - 33, x + 2, y - 32, hex('#c8a050'));
    for (let i = 0; i < 16; i++) pset(x + 3 + i, y - 33 + Math.round(Math.sin(i / 15 * Math.PI) * -3) + Math.round(i * 0.9), hex('#b86a30'));
    rect(x - 10, y - 9, x - 7, y - 1, K); rect(x - 9, y - 8, x - 8, y - 2, hex('#5a7a6a')); for (let i = 0; i < 10; i++) pset(x - 9 + Math.round(i * 0.4), y - 9 - Math.round(Math.sin(i * 0.4) * 4), hex('#b86a30')); }
  { const x = 280, y = 123; rect(x - 5, y - 2, x + 7, y, hex('#d8ccb0')); rect(x + 1, y - 2, x + 1, y, hex('#8a7a60')); for (let i = -4; i <= 6; i += 2) if (i !== 1) pset(x + i, y - 1, hex('#8a7a60')); }
  { const x = 271, y = 123; rect(x - 3, y, x + 3, y, hex('#a07830')); rect(x - 1, y - 4, x + 1, y - 1, hex('#e8dcc0')); rect(x - 2, y - 2, x - 2, y - 1, hex('#d8c8a0')); pset(x - 1, y - 4, hex('#fff4d8')); }
  { const x = 289, y = 122; linea(x - 2, y, x, y - 8, hex('#c8a050')); linea(x + 2, y, x, y - 8, hex('#a07830')); pset(x, y - 9, hex('#f0d080')); }
  { const x0 = 296; for (let y = 50; y < 150; y++) for (let x = x0; x < 320; x++) { let v = 2.2 + c_luzVela(x, y) * 3.2 + (x === x0 ? 1.4 : x === x0 + 1 ? -0.8 : 0) + (h(x >> 2, y >> 3, 40) - 0.5) * 0.5; if (y === 50 || y === 96 || y === 149) v -= 1.4; if ((y > 56 && y < 90 || y > 102 && y < 144) && (x === x0 + 5 || x === 316)) v -= 0.9; pset(x, y, c_ramp(c_MAD, v, x, y)); } rect(x0 - 2, 48, 320, 50, c_MAD[4]); rect(x0 - 2, 48, 320, 48, c_MAD[6]); pset(x0 + 8, 120, hex('#c8a050')); pset(x0 + 8, 74, hex('#c8a050')); }
  // el suelo de tablas en perspectiva: juntas, cabezas de tabla, vetas, clavos; más claro hacia la vela
  for (let y = 150; y < 180; y++) { const e = 1 + (y - 150) / 30 * 0.7;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / e / 15 + 40, i = Math.floor(u), fr = u - i, cab = Math.floor((y - 150 + h(i, 0, 41) * 40) / 26);
      let v = 2.6 + c_luzVela(x, y) * 5 + (h(i, cab, 42) - 0.5) * 1.1; if (fr < 0.07) v -= 1.8; else if (fr < 0.14) v += 0.5; if (h(Math.floor(fr * 9), y, i + 43) < 0.12) v -= 0.6;
      if (((y - 150 + Math.floor(h(i, 0, 41) * 40)) % 26) === 0) v -= 1.6; if (y === 150) v -= 1.5; pset(x, y, c_ramp(c_MAD, v, x, y)); } }
  rect(0, 148, 319, 149, c_MAD[1]); rect(0, 147, 106, 147, c_MAD[3]);
  // papeles por el suelo
  for (const [x, y, a] of [[40, 166, 0], [88, 172, 1], [132, 160, 1], [64, 158, 0]]) { const c = hex('#a89c80'); poligono(a ? [[x, y], [x + 9, y - 2], [x + 11, y + 3], [x + 2, y + 5]] : [[x, y], [x + 10, y], [x + 10, y + 4], [x, y + 4]], c); linea(x + 2, y + 1, x + 7, y + (a ? 0 : 1), hex('#6a604c')); }
  // el cubo bajo la gotera
  { const x = 204, y = 168; c_sombra(R, x, y + 1, 9, 2, 0.6); rect(x - 7, y - 10, x + 7, y, c_MAD[3]); for (let i = -7; i <= 7; i += 3) rect(x + i, y - 10, x + i, y, c_MAD[1]); rect(x - 7, y - 8, x + 7, y - 7, hex('#5a5a66')); rect(x - 7, y - 3, x + 7, y - 2, hex('#5a5a66')); rect(x - 8, y - 11, x + 8, y - 10, c_MAD[5]); rect(x - 6, y - 10, x + 6, y - 10, hex('#2a3448')); }
  // el haz de luna que baja de la claraboya hasta el suelo, tramado
  for (let y = 30; y < 180; y++) { const u = (y - 30) / 150, xa = Math.round(186 - u * 46), xb = Math.round(228 - u * 30);
    for (let x = xa; x <= xb; x++) { const a = 0.16 * (1 - u * 0.4) * (x === xa || x === xb ? 0.5 : 1); if (((x + y) & 1) === 0 || a > c_b4(x, y) * 0.5) pset(x, y, c_mez(R.pget(x, y), hex('#a8c0e8'), a)); } }
}

// la sábana sobre la mesa larga (x 120–240, tablero y 128): una forma alargada debajo que, con d (o.despierta), respira,
// se ondula, levanta el pico de la cabecera y deja ver un ojo
function c_sabana(R, t, d) {
  const { pset, rect } = R, K = hex('#0c0a12');
  // las patas de la mesa, el travesaño y la sombra
  c_sombra(R, 180, 150, 66, 3, 0.55);
  for (const x of [123, 234]) { rect(x, 140, x + 3, 150, c_MAD[3]); rect(x, 140, x, 150, c_MAD[5]); }
  const m = c_lim(d / 0.6), alza = c_lim((d - 0.55) / 0.25), ojo = c_lim((d - 0.68) / 0.15);
  const resp = Math.sin(t * 2.2) * 0.35 * m + Math.sin(t * 7.3) * 0.25 * m * m;
  // el perfil de lo que hay debajo (alto sobre el tablero)
  const bulto = (x) => { if (x < 132 || x > 230) return 0; let a;
    if (x < 152) a = 9.5 * Math.sqrt(Math.max(0, 1 - ((x - 142) / 10.5) ** 2)); else if (x < 158) a = 6.5; else if (x < 196) a = 9 + Math.sin((x - 158) / 38 * Math.PI) * 3.5; else a = 8 - (x - 196) * 0.12 + (x > 218 ? Math.sin((x - 218) / 12 * Math.PI) * 2.5 : 0);
    a += (x > 156 && x < 200 ? resp : 0) + Math.sin(x * 0.35 - t * 6) * 0.9 * m * (x > 150 ? 1 : 0.3); if (x < 152) a += alza * 3; return Math.max(0, a); };
  for (let x = 114; x <= 246; x++) {
    const top = Math.round(128 - bulto(x) + (x < 120 ? (120 - x) * 1.6 : x > 240 ? (x - 240) * 1.6 : 0));
    // el borde de abajo: cuelga más en las esquinas (los picos de la sábana) y se mece si la cosa se mueve
    const esq = Math.max(0, 1 - Math.min(Math.abs(x - 119), Math.abs(x - 241)) / 9), caida = Math.round(143 + esq * 5 + Math.sin(x * 0.23) * 1.2 + Math.sin(x * 0.45 + t * 1.3 * m) * m);
    const pend = bulto(x + 1) - bulto(x - 1);
    for (let y = top; y <= caida; y++) {
      let v; if (y <= 128) v = 5.2 + pend * 0.45 - (128 - y) * 0.03 + (y === top ? 1.3 : 0);
      else { const d = (y - 128) / 18, pl = Math.sin((x - 114) * 0.16 + Math.sin(x * 0.05) * 2 + m * Math.sin(t * 2.4 + x * 0.05) * 0.6); v = 4 + pl * 1.6 * (0.35 + d) - d * 1.2 + (h(x >> 1, y >> 2, 54) - 0.5) * 0.4; if (y === 129) v = 6.6; if (y === 130) v = 3.2; if (y >= caida - 1) v = 1.6; }
      v += c_luzVela(x, y) * 1.6 - (x < 121 || x > 239 ? 0.9 : 0);
      pset(x, y, c_ramp(c_SAB, v, x, y));
    }
    if (top > 0) { pset(x, top - 1, c_mez(R.pget(x, top - 1), K, 0.45)); pset(x, top - 2, c_mez(R.pget(x, top - 2), K, 0.2)); }
  }
  // los pliegues que bajan del bulto al borde
  for (const [x0, y0, k] of [[146, 120, 0], [176, 117, 1], [204, 119, 2], [224, 121, 3]]) for (let j = 0; j < 7; j++) { const x = Math.round(x0 + j * (k < 2 ? -0.6 : 0.6) + Math.sin(t * 3 + k) * m), y = y0 + j; pset(x, y, c_SAB[3]); pset(x + 1, y, c_SAB[6]); }
  // el pico de la cabecera que se levanta y el ojo amarillo que asoma
  if (alza > 0) { const ax = 136, ay = 128 - Math.round(9 + alza * 3);
    for (let i = 0; i <= 12; i++) { const yy = ay + 3 + Math.round(Math.abs(i - 6) * 0.25); for (let j = 0; j < Math.round(alza * 4); j++) pset(ax + i, yy + j, j === 0 ? c_SAB[1] : K); }
    if (ojo > 0) { const ex = 143, ey = ay + 4 + Math.round(alza * 2) - 1, abre = (t % 3.1) < 0.12 ? 0 : ojo;
      R.halo(ex, ey, 6, [hex('#3a3418'), hex('#6a5a20')], 0.5);
      if (abre > 0.3) { rect(ex - 2, ey, ex + 2, ey, hex('#e8d060')); rect(ex - 1, ey - (abre > 0.7 ? 1 : 0), ex + 1, ey, hex('#f4e88a')); pset(ex + (Math.sin(t * 0.8) > 0 ? 1 : 0), ey, K); pset(ex - 1, ey - (abre > 0.7 ? 1 : 0), hex('#ffffff')); rect(ex - 2, ey + 1, ex + 2, ey + 1, hex('#8a7a30')); }
      else rect(ex - 2, ey, ex + 2, ey, hex('#6a5a30')); } }
}

function c_buhardilla(R, t, o) {
  const { pset, rect, linea } = R, K = hex('#0c0a12');
  c_fijo(R, 'buhardilla', () => c_buhardillaFija(R));
  // la claraboya: el cielo de tormenta, la luna entre nubes que corren, la lluvia y las gotas en el cristal; el relámpago
  const rel = (t % 9.3) > 6.1 && (t % 9.3) < 6.32 && Math.sin(t * 60) > -0.3;
  R.recorte([180, 8, 232, 27]);
  for (let y = 8; y < 28; y++) for (let x = 180; x < 233; x++) pset(x, y, rel ? (c_b4(x, y) < 0.7 ? hex('#e8ecff') : hex('#b8c4e8')) : c_ramp(c_H(['#0c1024', '#141a36', '#1e2648', '#2c365a', '#44507a']), 1 + Math.max(0, 1 - Math.hypot(x - 214, y - 13) / 16) * 3 + (y - 8) * 0.04, x, y));
  if (!rel) { R.disco(214, 13, 4, hex('#e8e4c8')); R.disco(213, 12, 3, hex('#fffcea')); pset(215, 14, hex('#c8c4a8'));
    for (const [x0, y, w, v, k] of [[190, 12, 26, 2.2, 0], [230, 20, 30, 1.4, 1], [170, 25, 22, 3, 2]]) c_nube(R, ((x0 + t * v) % 90) + 170, y, w, k + 5, c_H(['#3a4462', '#262e4a', '#1c2240', '#5a6688'])); }
  for (let k = 0; k < 14; k++) { const x = 180 + Math.floor((h(k, 1, 50) * 60 + t * 22) % 56), y = 8 + Math.floor((h(k, 2, 50) * 30 + t * 70) % 22); linea(x, y, x - 1, y + 3, hex('#7a88b0')); }
  R.recorte(null);
  for (let k = 0; k < 4; k++) { const x = 184 + k * 13, y = 8 + Math.floor((h(k, 3, 51) * 20 + t * (3 + k)) % 19); pset(x, y, hex('#c8d4f0')); pset(x, y - 1, hex('#5a6a90')); }
  rect(205, 7, 206, 28, c_MAD[3]); rect(179, 17, 233, 17, c_MAD[3]);
  if (rel) for (let y = 30; y < 150; y += 2) { const u = (y - 30) / 150, xa = Math.round(186 - u * 46), xb = Math.round(228 - u * 30); for (let x = xa; x <= xb; x += 2) pset(x + (y & 2 ? 1 : 0), y, c_mez(R.pget(x, y), hex('#e0e8ff'), 0.4)); }
  // la gota que cae de la claraboya al cubo, con su salpicadura
  { const u = (t % 1.7) / 0.62; if (u < 1) { const y = Math.round(30 + u * u * 128); pset(204, y, hex('#a8c0e8')); pset(204, y - 1, hex('#6a80b0')); } else if (u < 1.5) { const r = Math.round((u - 1) * 6); pset(204 - r, 158 - (r > 1 ? 1 : 0), hex('#a8c0e8')); pset(204 + r, 158 - (r > 1 ? 1 : 0), hex('#a8c0e8')); rect(200, 158, 208, 158, hex('#3a4a6a')); } }
  // el matraz que hierve en el estante, con su lamparilla azul, las burbujas y el vapor
  { const x = 188, y = 69; rect(x - 2, y - 3, x + 2, y, hex('#6a5a48')); pset(x, y - 4 - (Math.sin(t * 13) > 0 ? 1 : 0), hex('#6a90ff')); pset(x, y - 4, hex('#3a5ad0'));
    R.disco(x + 0.5, y - 9.5, 4.2, K); R.disco(x + 0.5, y - 9.5, 3.4, hex('#3a8a6a')); rect(x - 1, y - 18, x + 1, y - 13, K); pset(x, y - 17, hex('#5a7a8a')); pset(x + 2, y - 11, hex('#e8fff0'));
    for (let k = 0; k < 3; k++) { const u = (t * 1.6 + k / 3) % 1; pset(x - 1 + k, y - 7 - Math.round(u * 4), hex('#9af0c0')); }
    for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1, vx = x + Math.round(Math.sin(u * 6 + t + k) * 2 + u * 4), vy = y - 19 - Math.round(u * 16); if (c_b4(vx, vy) < 0.8 - u * 0.7) { pset(vx, vy, hex('#8a9aa8')); pset(vx + 1, vy, hex('#6a7a88')); } } }
  // la mesa larga con la sábana
  c_sabana(R, t, o.despierta ?? 0);
  // la vela casi consumida que parpadea, y la polilla que le da vueltas
  c_llama(R, 277, 115, t, 1, 26); rect(275, 116, 279, 122, hex('#e8dcc0')); rect(275, 116, 275, 122, hex('#c8b898')); pset(276, 117, hex('#fffaf0')); rect(273, 122, 281, 123, hex('#b08838')); rect(273, 123, 281, 123, hex('#7a5a28')); for (let j = 117; j < 121; j++) if (h(j, 1, 52) < 0.5) pset(279, j, hex('#f4ecd8'));
  { const a = t * 3.1, mx = Math.round(277 + Math.cos(a) * 9 + Math.sin(t * 7) * 2), my = Math.round(106 + Math.sin(a * 1.3) * 5), al = Math.sin(t * 30) > 0; pset(mx, my, hex('#c8b898')); pset(mx - 1, my - (al ? 1 : 0), hex('#e8dcc0')); pset(mx + 1, my - (al ? 1 : 0), hex('#e8dcc0')); }
  // el ratón que cruza por delante del zócalo de vez en cuando
  { const u = (t % 13) / 3.2; if (u < 1) { const x = Math.round(318 - u * 330), y = 158, p = Math.floor(t * 12) % 2; rect(x, y - 2, x + 3, y, hex('#5a5058')); pset(x - 1, y - 1, hex('#5a5058')); pset(x - 1, y - 2, hex('#c8a0a8')); pset(x, y - 2, K); linea(x + 4, y, x + 8, y - 1 + p, hex('#7a6a70')); pset(x + p, y + 1, K); pset(x + 3 - p, y + 1, K); } }
  return { suelo: 150, libre: [30, 112], mesa: { x0: 120, x1: 240, y: 128 }, ojo: [143, 119], vela: [277, 112], pila: [259, 106], claraboya: [180, 8, 232, 28], cubo: [204, 168] };
}

// la esquina de un banco de trabajo por delante (x 262–320, y 158–180): mortero, tintero con pluma, matraz y papeles
function c_bancoDelante(R, t) {
  const { rect, pset, poligono, linea, disco } = R, K = hex('#0c0a12');
  poligono([[262, 162], [320, 156], [320, 180], [262, 180]], K);
  for (let y = 159; y < 180; y++) for (let x = 264; x < 320; x++) { if (y < 164 - (x - 262) * 0.1) continue; let v = (y < 166 - (x - 262) * 0.1 ? 4.2 : 2.2) + c_luzVela(x, y) * 2 + (h(x >> 3, y, 60) - 0.5) * 0.8; if (h(x >> 4, y, 61) < 0.12) v -= 0.8; pset(x, y, c_ramp(c_MAD, v, x, y)); }
  linea(264, 164, 320, 158, c_MAD[7]);
  rect(272, 166, 284, 168, hex('#c8bc98')); rect(272, 166, 284, 166, hex('#e8dcb8')); linea(274, 167, 281, 167, hex('#6a604c'));
  { const x = 292, y = 162; disco(x, y - 3, 4.5, K); disco(x, y - 3, 3.6, hex('#8a8a92')); rect(x - 3, y - 6, x + 3, y - 6, hex('#3a3a42')); linea(x + 1, y - 6, x + 6, y - 12, hex('#a8a8b0')); pset(x - 2, y - 4, hex('#c8c8d0')); }
  { const x = 306, y = 160; rect(x - 3, y - 4, x + 3, y, K); rect(x - 2, y - 3, x + 2, y, hex('#2a2a3a')); linea(x + 1, y - 4, x + 7, y - 18, hex('#e8e4d8')); linea(x + 2, y - 5, x + 8, y - 17, hex('#c8c0b0')); pset(x - 1, y - 3, hex('#8a9ab0')); }
  { const x = 314, y = 160; R.disco(x, y - 4, 4, K); R.disco(x, y - 4, 3, hex('#8a3a3a')); rect(x - 1, y - 12, x + 1, y - 8, K); pset(x - 1, y - 5, hex('#ffd0c0')); }
}

const c_ESC = (x) => (x < 160 ? 150 : 156 + Math.min(4, Math.floor((x - 160) / 14)) * 6);

const c_luzPuerta = (x, y) => c_lim(1 - Math.hypot((x - 64) * 0.7, (y - 150) * 1.1) / 110);

function c_escaleraFija(R) {
  const { rect, pset, linea, poligono } = R, K = hex('#0c0a12'), FR = c_H(['#0c0c16', '#121424', '#1a1c30', '#22263c', '#2c3048', '#383a52', '#4c4656', '#6a5650', '#8a6a50']);
  // la pared en penumbra: yeso azulado y un zócalo de madera que sigue la escalera; más cálido junto a la puerta
  for (let y = 18; y < 150 + 30; y++) for (let x = 0; x < 320; x++) { const L = c_luzPuerta(x, y), zoc = x < 160 ? 118 : 118 + (x - 160) * 6 / 14; if (y > c_ESC(x)) continue;
    let v; if (y > zoc) { v = 2.4 + L * 6 + (h(x >> 2, y >> 3, 70) - 0.5) * 0.7; if (Math.abs(y - zoc) < 1.2) v += 2; if ((x % 22) === 0) v -= 1; pset(x, y, c_ramp(c_MAD, v, x, y)); }
    else { v = 2.2 + L * 6 + (h(x >> 1, y >> 1, 71) - 0.5) * 0.9 + (h(x >> 3, y >> 3, 72) - 0.5) * 0.6; if (h(x, y, 73) < 0.03) v -= 1; pset(x, y, c_ramp(FR, v, x, y)); } }
  // la viga y el techo
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) pset(x, y, c_ramp(c_MAD, (y > 12 ? 2.6 : 1.2) + (y === 13 ? 1.5 : 0) + (h(x >> 3, y, 74) - 0.5) * 0.7 + c_luzPuerta(x, y + 60) * 1.5, x, y));
  for (let x = 30; x < 320; x += 70) { rect(x, 0, x + 8, 12, c_MAD[2]); rect(x, 0, x, 12, c_MAD[3]); }
  // el marco de la puerta y su hueco (lo de dentro se pinta en cada fotograma)
  rect(38, 72, 88, 150, c_MAD[1]); rect(40, 74, 86, 150, c_MAD[4]); rect(40, 74, 86, 75, c_MAD[6]); rect(40, 74, 41, 150, c_MAD[6]); rect(85, 74, 86, 150, c_MAD[2]); rect(36, 70, 90, 72, c_MAD[5]); rect(36, 70, 90, 70, c_MAD[7]);
  // el cuadrito (un paisaje de montes, sin nadie) y la percha con una capa
  { const x = 104, y = 54; rect(x, y, x + 20, y + 16, hex('#8a6a30')); rect(x + 1, y + 1, x + 19, y + 15, hex('#5a4220')); rect(x + 2, y + 2, x + 18, y + 14, hex('#4a5a6a')); R.poligono([[x + 2, y + 12], [x + 8, y + 5], [x + 12, y + 9], [x + 15, y + 6], [x + 18, y + 10], [x + 18, y + 14], [x + 2, y + 14]], hex('#2a3a3a')); rect(x + 2, y + 13, x + 18, y + 14, hex('#3a4a2a')); pset(x + 14, y + 4, hex('#c8c8a0')); linea(x + 10, y - 6, x, y, hex('#3a3040')); linea(x + 10, y - 6, x + 20, y, hex('#3a3040')); }
  { const x = 22, y = 82; rect(x, y, x + 2, y + 1, c_MAD[6]); poligono([[x - 3, y + 2], [x + 5, y + 2], [x + 8, y + 40], [x - 6, y + 40]], (px, py) => c_ramp(c_H(['#100c14', '#1a1420', '#2a1e2a', '#3a2a34']), 1.3 + (px - x) * 0.15 + c_luzPuerta(px, py) * 2 + (h(px, py >> 2, 75) - 0.5) * 0.6, px, py)); linea(x + 1, y + 4, x + 2, y + 39, hex('#0c0a10')); }
  // la ventana emplomada: marco y alféizar (el cristal, en cada fotograma)
  rect(218, 34, 266, 90, c_MAD[1]); rect(220, 36, 264, 88, c_MAD[4]); rect(220, 36, 264, 36, c_MAD[6]); rect(216, 89, 268, 92, c_MAD[5]); rect(216, 89, 268, 89, c_MAD[7]);
  // los peldaños: huella clara con su canto, tabica en sombra; el rellano de tablas
  for (let y = 150; y < 180; y++) { const e = 1 + (y - 150) / 30 * 0.6; for (let x = 0; x < 160; x++) { const u = (x - 64) / e / 13 + 40, i = Math.floor(u), fr = u - i; let v = 2.4 + c_luzPuerta(x, y) * 5.5 + (h(i, Math.floor((y - 150 + h(i, 1, 76) * 20) / 18), 76) - 0.5) * 1.2 + (h(Math.floor(fr * 7), y, 77 + i) < 0.15 ? -0.6 : 0); if (fr < 0.08) v -= 1.8; else if (fr < 0.16) v += 0.5; if (y === 150) v += 1.4; pset(x, y, c_ramp(c_MAD, v, x, y)); } }
  for (const x0 of [6, 186]) { for (let y = 18; y < (x0 < 160 ? 150 : 156); y++) for (let x = x0; x < x0 + 6; x++) pset(x, y, c_ramp(c_MAD, 2 + c_luzPuerta(x, y) * 4 + (x === x0 ? -1 : x === x0 + 1 ? 1 : x === x0 + 5 ? -0.8 : 0) + (h(x, y >> 3, 83) - 0.5) * 0.7, x, y));
    for (let i = 0; i < 22; i++) for (let w = 0; w < 4; w++) { const x = x0 + 6 + i, y = 40 - i + w; pset(x, y, c_ramp(c_MAD, 2 + (w === 0 ? 1 : w === 3 ? -1 : 0) + c_luzPuerta(x, y) * 3, x, y)); } }
  for (let x = 160; x < 320; x++) { const yp = c_ESC(x), fx = (x - 160) % 14;
    for (let y = yp; y < 180; y++) { const d = y - yp; let v = d === 0 ? 6.4 : d === 1 ? 5.2 : d === 2 ? 2 : 2.6 + (h(x >> 3, y >> 2, 77) - 0.5) * 0.7 - (y - 150) * 0.03;
      if (d > 2 && (y - 150) % 10 === 0) v -= 0.8; v += c_luzPuerta(x, y) * 2.5; pset(x, y, c_ramp(c_MAD, v, x, y)); }
    if (fx === 0 && x < 230) { for (let y = yp - 6; y < yp; y++) pset(x, y, c_MAD[5]); pset(x + 1, yp - 6, c_MAD[7]); } }
  // la luz fría de la ventana en la pared, y el arcón del rellano con su jarra
  for (let y = 96; y < 146; y++) { const u = (y - 96) / 50, xa = Math.round(212 - u * 26), xb = Math.round(262 - u * 18); for (let x = xa; x <= xb; x++) if (y < c_ESC(x) - 2 && c_b4(x, y) < 0.3 * (1 - u)) pset(x, y, c_mez(R.pget(x, y), hex('#6a7ab0'), 0.3)); }
  { const x = 112, y = 150; rect(x, y - 14, x + 30, y - 1, c_MAD[1]); for (let i = x + 1; i < x + 30; i++) for (let j = y - 13; j < y - 1; j++) pset(i, j, c_ramp(c_MAD, 3.2 + c_luzPuerta(i, j) * 3 + ((i - x) % 10 === 0 ? -1.2 : 0) + (j === y - 13 ? 1.5 : 0), i, j));
    rect(x, y - 16, x + 30, y - 14, c_MAD[5]); rect(x, y - 16, x + 30, y - 16, c_MAD[7]); for (const i of [x + 3, x + 26]) rect(i, y - 13, i + 1, y - 2, hex('#2a2a30')); rect(x + 14, y - 10, x + 16, y - 8, hex('#a08038'));
    rect(x + 20, y - 24, x + 25, y - 17, K); rect(x + 21, y - 23, x + 24, y - 17, hex('#7a5a3a')); rect(x + 25, y - 22, x + 26, y - 19, hex('#7a5a3a')); pset(x + 21, y - 22, hex('#c89a6a')); }
  // la oscuridad del hueco de la escalera, que baja
  for (let y = 150; y < 180; y++) for (let x = 230; x < 320; x++) if (c_b4(x, y) < (x - 230) / 110) pset(x, y, c_mez(R.pget(x, y), K, 0.55));
}

function c_escalera(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = hex('#0c0a12');
  c_fijo(R, 'escalera', () => c_escaleraFija(R));
  const fl = 0.85 + Math.sin(t * 9) * 0.08 + Math.sin(t * 23) * 0.05;
  // dentro de la buhardilla, por el hueco de la puerta: la luz cálida, la estantería y el pico de la sábana
  R.recorte([42, 76, 84, 150]);
  for (let y = 76; y <= 150; y++) for (let x = 42; x <= 84; x++) { const g = c_lim(1 - Math.hypot(x - 72, y - 128) / 70) * fl; pset(x, y, c_ramp(c_PARED, 2 + g * 8 + (h(x >> 1, y >> 1, 78) - 0.5) * 0.8, x, y)); }
  for (const yb of [96, 116]) { rect(42, yb, 58, yb + 1, c_MAD[5]); for (let x = 44; x < 57; x += 4) rect(x, yb - 6 - (x & 4 ? 2 : 0), x + 2, yb - 1, x & 8 ? hex('#3e8a4a') : hex('#8a3a2a')); }
  for (let x = 58; x <= 84; x++) { const top = 132 - Math.round(Math.max(0, Math.sin((x - 58) / 30 * Math.PI)) * 5); for (let y = top; y < 148; y++) pset(x, y, c_ramp(c_SAB, 3.5 + (y === top ? 2 : 0) - (y - top) * 0.08 + c_lim(1 - Math.hypot(x - 72, y - 128) / 70) * 2.5, x, y)); }
  rect(58, 148, 84, 150, c_MAD[2]);
  R.recorte(null);
  // la hoja de la puerta abierta hacia la pared, que cruje un poco
  { const a = Math.round(Math.sin(t * 0.9) * 1.2); poligono([[88, 74], [100 + a, 66], [100 + a, 158], [88, 150]], (x, y) => c_ramp(c_MAD, 3 + (x - 88) * 0.12 + (h(x, y >> 3, 79) - 0.5) * 0.7 + ((y - 74) % 24 < 1 ? -1.2 : 0), x, y)); linea(100 + a, 66, 100 + a, 158, c_MAD[1]); pset(97 + a, 112, hex('#c8a050')); pset(97 + a, 113, hex('#8a6a30')); }
  // el charco de luz que sale por la puerta al rellano, y las motas de polvo en ella
  for (let y = 150; y < 180; y++) { const u = (y - 150) / 30, xa = Math.round(42 - u * 18), xb = Math.round(86 + u * 34); for (let x = xa; x <= xb; x++) if (c_b4(x, y) < (1 - u * 0.8) * 0.5 * fl) pset(x, y, c_mez(R.pget(x, y), hex('#e8a858'), 0.28)); }
  for (let k = 0; k < 9; k++) { const u = (t * 0.06 + h(k, 1, 80)) % 1, x = Math.round(46 + h(k, 2, 80) * 40 + Math.sin(t * 0.7 + k) * 3), y = Math.round(146 - u * 60); if (x > 42 && x < 86) pset(x, y, hex('#f0c890')); }
  // la ventana: lluvia, nubes que pasan, el relámpago, y su luz fría en la pared cuando cae
  const rel = (t % 7.7) > 4.4 && (t % 7.7) < 4.62 && Math.sin(t * 55) > -0.2;
  R.recorte([222, 38, 262, 86]);
  for (let y = 38; y <= 86; y++) for (let x = 222; x <= 262; x++) pset(x, y, rel ? (c_b4(x, y) < 0.75 ? hex('#e0e6ff') : hex('#a0acd8')) : c_ramp(c_H(['#0a0e20', '#10162c', '#182040', '#222c50', '#303c64']), 0.8 + (86 - y) * 0.02 + (h(x >> 3, y >> 2, 81) - 0.5) * 0.6, x, y));
  if (!rel) for (const [x0, y, w, v, k] of [[210, 52, 30, 1.6, 0], [250, 64, 26, 2.4, 1]]) c_nube(R, ((x0 + t * v) % 80) + 205, y, w, k + 9, c_H(['#2e3654', '#1e2440', '#161c34', '#3e486a']));
  { const tej = c_H(['#06080e']); for (let x = 222; x <= 262; x++) { const top = 74 + Math.round(Math.sin(x * 0.3) * 2 + (x > 240 ? -6 : 0)); for (let y = top; y <= 86; y++) pset(x, y, tej[0]); } rect(248, 64, 250, 74, tej[0]); }
  for (let k = 0; k < 16; k++) { const x = 222 + Math.floor((h(k, 1, 82) * 50 + t * 16) % 42), y = 38 + Math.floor((h(k, 2, 82) * 60 + t * 80) % 48); linea(x, y, x - 1, y + 3, rel ? hex('#ffffff') : hex('#6a789c')); }
  R.recorte(null);
  rect(241, 36, 242, 88, c_MAD[3]); for (const y of [52, 70]) rect(220, y, 264, y, hex('#2a2a34'));
  for (const x of [231, 252]) rect(x, 36, x, 88, hex('#2a2a34'));
  if (rel) for (let y = 92; y < 160; y++) { const u = (y - 92) / 70, xa = Math.round(214 - u * 40), xb = Math.round(262 - u * 30); for (let x = xa; x <= xb; x++) if (((x + y) & 1) === 0 && y <= c_ESC(x)) pset(x, y, c_mez(R.pget(x, y), hex('#c8d4ff'), 0.35)); }
  // el candil de la pared, la araña que baja de la viga
  { const x = 128, y = 92; rect(x - 3, y, x + 3, y + 2, hex('#6a5a3a')); rect(x - 1, y + 2, x + 1, y + 6, hex('#5a4a30')); rect(x - 1, y - 4, x + 1, y - 1, hex('#e8dcc0')); c_llama(R, x, y - 5, t, 3, 16); }
  { const l = 8 + Math.round((Math.sin(t * 0.5) * 0.5 + 0.5) * 14), x = 186 + Math.round(Math.sin(t * 1.1) * 1); linea(186, 14, x, 14 + l, hex('#4a4a5a')); rect(x - 1, 14 + l, x + 1, 15 + l, K); for (const s of [-1, 1]) { pset(x + s * 2, 14 + l, K); pset(x + s * 2, 16 + l, K); } }
  return { suelo: 150, libre: [20, 160], pie: c_ESC, puerta: [44, 78, 82, 150], peldanos: [0, 1, 2, 3, 4].map((k) => [160 + k * 14, 156 + k * 6]), ventana: [222, 38, 262, 86] };
}

// el pasamanos y los balaustres de la escalera, por delante de quien baja (x 160–320)
function c_barandilla(R, t) {
  const { rect, pset, linea } = R;
  for (let k = 0; k <= 11; k++) { const x = 162 + k * 14, yb = c_ESC(x) + 4 + (x >= 160 ? 0 : 0), yt = 126 + (x - 160) * 6 / 14;
    if (x > 320) break; rect(x, yt, x + 2, yb, c_MAD[2]); rect(x, yt, x, yb, c_MAD[4]); rect(x + 1, yt + 6, x + 1, yt + 8, c_MAD[5]); rect(x - 1, yt + 4, x + 3, yt + 5, c_MAD[3]); }
  rect(156, 118, 163, 156, c_MAD[3]); rect(156, 118, 157, 156, c_MAD[5]); rect(155, 114, 164, 118, c_MAD[5]); rect(155, 114, 164, 114, c_MAD[7]); R.disco(159.5, 112, 3, c_MAD[6]); pset(158, 111, hex('#c89a68'));
  for (let x = 160; x < 320; x++) { const y = Math.round(122 + (x - 160) * 6 / 14); rect(x, y, x, y + 3, c_MAD[4]); pset(x, y, c_MAD[7]); pset(x, y + 3, c_MAD[1]); }
}

function c_cabanaFija(R) {
  const { rect, pset, linea, poligono, disco } = R, K = hex('#0c0a12');
  // el cielo de primavera, tramado
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) pset(x, y, c_ramp(c_H(['#4a7cc8', '#5888d0', '#6894d6', '#7aa2dc', '#8eb2e2', '#a2c2e8', '#b6d0ec', '#c8dcee']), y / 92 * 7 + (h(x >> 4, y >> 3, 90) - 0.5) * 0.4, x, y));
  // los montes lejanos (dos términos) y el bosque del fondo
  for (let x = 0; x < 320; x++) { const a = Math.round(70 + Math.sin(x * 0.019 + 1) * 8 + Math.sin(x * 0.061) * 3), b = Math.round(86 + Math.sin(x * 0.027 + 3) * 6 + Math.sin(x * 0.11) * 2);
    for (let y = a; y < 110; y++) pset(x, y, c_ramp(c_H(['#7a98b8', '#6a8aaa', '#5a7c98']), (y - a) * 0.12 + (h(x >> 2, y >> 2, 91) - 0.5) * 0.6, x, y)); if (h(x, 0, 92) < 0.5) pset(x, a, hex('#9ab4cc'));
    for (let y = b; y < 120; y++) pset(x, y, c_ramp(c_H(['#4e7a6a', '#426c5c', '#365e50', '#2c5044']), (y - b) * 0.15 + (h(x >> 1, y >> 2, 93) - 0.5) * 0.9, x, y)); }
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 94) * 330) - 5, a = 14 + Math.round(h(k, 2, 94) * 16), yb = 116 + Math.round(h(k, 3, 94) * 6);
    for (let j = 0; j < a; j++) { const w = Math.round(j * 0.32) + (j % 4 === 3 ? 1 : 0); for (let i = -w; i <= w; i++) pset(x + i, yb - a + j, c_ramp(c_H(['#1e3e2e', '#264a36', '#30583e', '#3e6a48']), 1.2 + (i < 0 ? 1.1 : -0.3) + (h(x + i, j, 95) - 0.5) * 0.8, x + i, yb - a + j)); } rect(x, yb, x, yb + 2, hex('#3a2a1e')); }
  // el prado: hierba con matas, flores y tierra
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const p = Math.abs(x - 111 + (y - 150) * 0.9) < 6 + (y - 150) * 0.7 && y > 150; let v = 3.4 - (y - 118) * 0.035 + (h(x >> 1, y >> 1, 96) - 0.5) * 1.1 + (h(x >> 3, y >> 2, 97) - 0.5) * 0.8;
    if (p) { pset(x, y, c_ramp(c_H(['#5a4a32', '#6e5a3c', '#84704a', '#9a8458']), 1.6 + (h(x, y, 98) - 0.5) * 1.4, x, y)); continue; }
    pset(x, y, c_ramp(c_H(['#2e5a2a', '#3a6a30', '#4a7a36', '#5a8c3c', '#6e9e44', '#86b050']), v, x, y)); if (h(x, y, 99) < 0.006) pset(x, y, [hex('#f0e070'), hex('#ffffff'), hex('#e08ab0')][Math.floor(h(y, x, 99) * 3)]); }
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) if (h(x, y, 100) < 0.05) { pset(x, y, hex('#86b050')); pset(x, y - 1, hex('#5a8c3c')); }
  // el roble de la izquierda: tronco con corteza y copa de tres tonos
  { for (let y = 56; y < 150; y++) { const w = 6 + Math.max(0, (y - 130) * 0.35); for (let x = Math.round(20 - w); x <= Math.round(20 + w); x++) { const u = (x - 20) / w; pset(x, y, c_ramp(c_H(['#2a1e16', '#3a2a1e', '#4e3a28', '#644a32', '#7a5c3e']), 2.2 - u * 1.6 + (h(x, y >> 2, 101) - 0.5) * 1.2 + ((x * 3 + y) % 7 === 0 ? -1 : 0), x, y)); } }
    for (const [cx, cy, r, k] of [[8, 46, 20, 0], [34, 30, 16, 1], [14, 22, 13, 2], [46, 54, 13, 3], [-4, 66, 14, 4], [28, 62, 12, 5]]) disco(cx, cy, r, (x, y, d) => c_ramp(c_H(['#1a3a1e', '#24482a', '#305a32', '#3e6e3a', '#528442', '#6a9a4a']), 2.8 - (y - cy) / r * 1.6 + (x - cx) / r * -0.6 + (h(x >> 1, y >> 1, 102 + k) - 0.5) * 1.8 - d * 0.6, x, y)); }
  // el abeto de la derecha (bajo la zona de Atom)
  { const x = 308; for (let j = 0; j < 100; j++) { const y = 50 + j, w = Math.round(j * 0.2 + (j % 9 > 5 ? 2 : 0)); for (let i = -w; i <= w; i++) pset(x + i, y, c_ramp(c_H(['#14301e', '#1c3c26', '#26482e', '#305638']), 1.6 + (i < 0 ? 1 : -0.4) + (h(x + i, y, 103) - 0.5) * 0.9, x + i, y)); } rect(307, 146, 309, 150, hex('#3a2a1e')); }
  // la casita: el muro de piedra (mampuestos con su llaga, luz del sol de la izquierda)
  for (let y = 92; y < 150; y++) for (let x = 58; x < 198; x++) { const f = Math.floor((y - 92) / 6), dx = (f & 1) * 5, c = Math.floor((x - 58 + dx) / 10), fx = (x - 58 + dx) % 10, fy = (y - 92) % 6;
    let v = 3 + (h(c, f, 104) - 0.5) * 1.6 - (x - 58) * 0.006 + (fy === 0 || fx === 0 ? -2 : fy === 1 || fx === 1 ? 0.8 : fy === 5 ? -0.6 : 0) + (h(x, y, 105) - 0.5) * 0.5; pset(x, y, c_ramp(c_H(['#4a443e', '#5e5850', '#746c60', '#8a8272', '#a09684', '#b6ac98']), v, x, y)); }
  // la puerta de tablas con sus herrajes, y las dos ventanas con jardinera (lo de dentro, en cada fotograma)
  rect(100, 114, 122, 150, hex('#3a2a1e')); for (let x = 102; x <= 120; x++) for (let y = 116; y < 150; y++) pset(x, y, c_ramp(c_MAD, 4.4 + ((x - 102) % 5 === 0 ? -1.5 : (x - 102) % 5 === 1 ? 0.8 : 0) + (h(x, y >> 2, 106) - 0.5) * 0.8, x, y));
  for (const y of [122, 140]) { rect(103, y, 116, y + 1, hex('#2a2a2e')); pset(104, y, hex('#6a6a72')); } rect(117, 131, 118, 132, hex('#2a2a2e')); rect(98, 112, 124, 114, hex('#6a5a48')); rect(98, 112, 124, 112, hex('#9a8a72'));
  for (const x0 of [70, 136]) { rect(x0 - 2, 102, x0 + 22, 124, hex('#3a3430')); rect(x0 - 3, 100, x0 + 23, 102, hex('#8a7a62')); rect(x0 - 3, 124, x0 + 23, 127, hex('#6a5a42')); rect(x0 - 3, 124, x0 + 23, 124, hex('#9a8a6a'));
    for (let i = 0; i < 12; i++) { const fx = x0 - 1 + i * 2; pset(fx, 123 - (i % 3), hex('#3e7a36')); pset(fx, 122 - (i % 3), [hex('#e05a5a'), hex('#f0d050'), hex('#e890c0')][i % 3]); } }
  // el tejado de paja: grueso, con el alero redondeado, la cumbrera y la chimenea de piedra
  poligono([[50, 96], [206, 96], [186, 58], [70, 58]], (x, y) => c_ramp(c_H(['#5a4626', '#6e5830', '#86703a', '#9c8646', '#b49c54', '#c8b064']), 3.2 - (y - 58) * 0.02 - (x - 60) * 0.006 + (h(x >> 1, (y + (x >> 2)) >> 2, 107) - 0.5) * 1.6 + ((x * 2 + y * 7) % 13 === 0 ? -1.4 : 0), x, y));
  for (let x = 50; x <= 206; x++) { const yb = 96 + Math.round(Math.sin(x * 0.4) * 0.8); rect(x, yb - 1, x, yb + 2, h(x, 1, 108) < 0.5 ? hex('#5a4626') : hex('#4a3a20')); if (h(x, 2, 108) < 0.4) pset(x, yb + 3, hex('#6e5830')); }
  rect(70, 56, 186, 59, hex('#7a6436')); rect(70, 56, 186, 56, hex('#c8b064')); for (let x = 72; x < 186; x += 6) linea(x, 56, x + 3, 60, hex('#5a4626'));
  for (let y = 40; y < 62; y++) for (let x = 164; x < 178; x++) { const f = Math.floor(y / 4), c = Math.floor((x + (f & 1) * 3) / 6); pset(x, y, c_ramp(c_H(['#4a443e', '#5e5850', '#746c60', '#8a8272']), 2 + (h(c, f, 109) - 0.5) * 1.4 + (y % 4 === 0 ? -1.4 : 0) + (x < 167 ? 0.7 : x > 175 ? -0.7 : 0), x, y)); }
  rect(162, 38, 180, 40, hex('#5e5850')); rect(162, 38, 180, 38, hex('#a09684'));
  // el cobertizo de tablas grises pegado a la casa: tejado a un agua, la pared con la grieta
  poligono([[194, 94], [304, 108], [304, 113], [194, 99]], (x, y) => c_ramp(c_H(['#3a3830', '#4a463a', '#5c5646', '#6e6852', '#7e7a5e']), 2.4 + (((x - 194) % 9) < 1 ? -1.2 : 0) + (h(Math.floor((x - 194) / 9), y, 110) - 0.5) * 1.4, x, y));
  for (let x = 194; x <= 304; x += 3) if (h(x, 3, 111) < 0.4) { pset(x, 94 + Math.round((x - 194) * 14 / 110), hex('#5a7a3a')); pset(x + 1, 94 + Math.round((x - 194) * 14 / 110), hex('#4a6a32')); }
  for (let y = 0; y < 50; y++) for (let x = 198; x <= 300; x++) { const top = 100 + Math.round((x - 194) * 14 / 110); const yy = top + y; if (yy >= 150) continue; const tb = Math.floor((x - 198) / 7), fx = (x - 198) % 7;
    let v = 2.8 + (h(tb, 0, 112) - 0.5) * 1.2 + (fx === 0 ? -1.6 : fx === 1 ? 0.7 : 0) + (h(x, yy >> 1, 113) - 0.5) * 0.7 - (yy < top + 3 ? 1.2 : 0); if (h(tb, yy >> 3, 114) < 0.08) v -= 0.8; pset(x, yy, c_ramp(c_H(['#2e2a24', '#3e3830', '#524a3e', '#665c4c', '#7a705c', '#8e846c']), v, x, yy)); }
  for (const y of [118, 140]) { rect(198, y, 300, y + 1, hex('#4a4032')); rect(198, y, 300, y, hex('#6e6250')); }
  // la grieta: hueco quebrado entre dos tablas (la luz de dentro, en cada fotograma)
  for (let y = 112; y <= 144; y++) { const x = 238 + Math.round(Math.sin(y * 0.5) * 1.4 + (y > 128 ? -1 : 0)), w = y < 116 || y > 140 ? 0 : y < 120 || y > 136 ? 1 : 2; for (let i = -w; i <= w; i++) pset(x + i, y, K); pset(x - w - 1, y, hex('#a89a7a')); pset(x + w + 1, y, hex('#3a3428')); }
  for (const [x, y] of [[233, 120], [244, 132], [235, 139], [242, 116]]) { pset(x, y, K); pset(x + (x < 238 ? 1 : -1), y + 1, K); }
  // la leña apilada junto al cobertizo
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { const cx = 305 + i * 5 + (j & 1) * 2, cy = 147 - j * 5; disco(cx, cy, 2.6, hex('#4a3420')); disco(cx, cy, 1.8, hex('#b08a5a')); pset(cx, cy, hex('#8a6a40')); }
  // el huerto: seto de mimbre, coles y judías en varas
  for (let x = 4; x < 60; x++) for (let y = 128; y < 138; y++) { const v = 2.4 + (((x + (y >> 1) * 3) % 6) < 3 ? 1 : -0.6) + (y === 128 ? 1 : 0); pset(x, y, c_ramp(c_MAD, v + 1.6, x, y)); } for (let x = 6; x < 60; x += 9) rect(x, 125, x + 1, 139, c_MAD[3]);
  for (let f = 0; f < 2; f++) for (let i = 0; i < 5; i++) { const cx = 12 + i * 9 + f * 4, cy = 142 + f * 5; disco(cx, cy, 3.4, hex('#2e5a2a')); disco(cx, cy - 0.5, 2.6, hex('#5a9a48')); disco(cx - 0.5, cy - 1, 1.4, hex('#8ac070')); }
}

function c_cabana(R, t, o) {
  const { rect, pset, linea, disco } = R, K = hex('#0c0a12');
  c_fijo(R, 'cabana', () => c_cabanaFija(R));
  // las nubes de tres tonos a tres velocidades (por debajo de la barra del año y fuera de la zona de Atom)
  R.recorte([0, 15, 319, 100]);
  for (const [x0, y, w, v, k] of [[10, 30, 70, 1.2, 0], [150, 24, 54, 0.8, 1], [240, 52, 60, 2.0, 2], [90, 58, 44, 2.6, 3], [300, 38, 40, 1.5, 4]]) {
    const cx = ((x0 + t * v) % 420) - 50; if (cx > 250 && y < 50) continue; c_nube(R, cx, y, w, k, c_H(['#ffffff', '#eef4fa', '#d0dcec', '#aebed8'])); }
  R.recorte(null);
  // los pájaros que cruzan
  for (let k = 0; k < 5; k++) { const u = ((t * 0.045 + k * 0.17) % 1), x = Math.round(-10 + u * 280), y = Math.round(40 + k * 4 + Math.sin(u * 9 + k) * 4), a = Math.sin(t * 9 + k * 2) > 0; pset(x, y, hex('#2a2a3a')); pset(x - 1, y - (a ? 1 : 0), hex('#2a2a3a')); pset(x + 1, y - (a ? 1 : 0), hex('#2a2a3a')); pset(x - 2, y - (a ? 2 : 0), hex('#2a2a3a')); pset(x + 2, y - (a ? 2 : 0), hex('#2a2a3a')); }
  // el humo de la chimenea, que se lleva el viento
  for (let k = 0; k < 7; k++) { const u = (t * 0.18 + k / 7) % 1, r = 2 + u * 5, cx = 171 + u * 34 + Math.sin(u * 5 + t * 0.8 + k) * 2, cy = 34 - u * 22;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d < 1 && c_b4(xx, yy) < (1.05 - u) * (1.2 - d)) pset(xx, yy, d < 0.5 ? hex('#e8ecf0') : hex('#b8c0c8')); } }
  // las ventanas: dentro, la luz del fuego y la familia pequeñita que se mueve
  for (const [x0, k] of [[70, 0], [136, 1]]) { R.recorte([x0, 104, x0 + 20, 122]); const fl = 0.8 + Math.sin(t * 8 + k) * 0.1;
    for (let y = 104; y <= 122; y++) for (let x = x0; x <= x0 + 20; x++) pset(x, y, c_ramp(c_H(['#2a1a14', '#3e2618', '#5a3620', '#7a4a26', '#a0662e']), 1 + (k ? 2.6 : 1.6) * fl - (122 - y) * 0.06 + (h(x >> 1, y >> 1, 115) - 0.5) * 0.6, x, y));
    const fig = (x, c, cab) => { rect(x - 2, 113, x + 2, 122, c); disco(x, 111, 2, cab); pset(x, 110, hex('#2a1a14')); };
    if (k) { fig(140 + Math.round(Math.sin(t * 0.4) * 3), hex('#3a2a30'), hex('#d8b090')); fig(150, hex('#4a3a5a'), hex('#e0b898')); rect(147, 117, 156, 118, hex('#7a5a30')); }
    else { fig(78 + Math.round(((t * 4) % 40) > 20 ? 40 - (t * 4) % 40 : (t * 4) % 40) * 0.25, hex('#5a3a2a'), hex('#d8b090')); }
    R.recorte(null);
    rect(x0 + 10, 102, x0 + 10, 124, hex('#3a3430')); rect(x0 - 2, 112, x0 + 22, 112, hex('#3a3430')); pset(x0 + 3, 106, hex('#e8e0c8')); pset(x0 + 4, 105, hex('#e8e0c8')); }
  // la luz del fuego que se escapa por la grieta del cobertizo
  for (let y = 117; y <= 139; y++) { const x = 238 + Math.round(Math.sin(y * 0.5) * 1.4 + (y > 128 ? -1 : 0)); if (Math.sin(t * 7 + y * 0.6) > -0.5) { pset(x, y, Math.sin(t * 11 + y) > 0.2 ? hex('#ffd878') : hex('#e08a38')); if (y > 120 && y < 136) pset(x + (Math.sin(t * 5 + y) > 0 ? 1 : -1), y, hex('#a85a28')); } }
  // la ropa tendida que ondea entre dos palos
  { rect(28, 108, 29, 136, hex('#5a4228')); rect(58, 110, 59, 136, hex('#5a4228')); for (let x = 29; x <= 58; x++) pset(x, 109 + Math.round(Math.sin((x - 29) / 29 * Math.PI) * 3), hex('#e8e0d0'));
    for (const [x0, w, a, c] of [[33, 8, 13, hex('#e8e4dc')], [44, 9, 10, hex('#b85a4a')]]) for (let i = 0; i < w; i++) { const yt = 110 + Math.round(Math.sin((x0 + i - 29) / 29 * Math.PI) * 3), l = a + Math.round(Math.sin(t * 4 + i * 0.6) * 1.5); const dx = Math.round(Math.sin(t * 4 + i * 0.5) * (i / w) * 1.5);
      for (let j = 0; j < l; j++) pset(x0 + i + Math.round(dx * j / l), yt + j, (i + Math.floor(t * 4 + j * 0.3)) % 5 === 0 ? c_mez(c, K, 0.25) : c); } }
  // tres gallinas que picotean
  for (let k = 0; k < 3; k++) { const x = Math.round(150 + k * 22 + Math.sin(t * 0.3 + k * 2) * 6), y = 160 + k * 4, pic = Math.sin(t * 3 + k * 1.7) > 0.6, d = Math.cos(t * 0.3 + k * 2) > 0 ? 1 : -1;
    R.disco(x, y - 3, 3, hex('#8a5a2e')); R.disco(x - d, y - 4, 2, hex('#b07a3e')); pset(x - 3 * d, y - 5, hex('#6a4220')); const hx = x + 3 * d, hy = pic ? y - 2 : y - 6; rect(hx - 1, hy, hx + 1, hy + 1, hex('#a06a34')); pset(hx + d * 2, hy + 1, hex('#e8b030')); pset(hx, hy - 1, hex('#d83030')); pset(hx + d, hy, K); pset(x, y, hex('#e8b030')); pset(x - d, y, hex('#e8b030')); }
  // la hierba de delante, que se mece
  for (let x = 0; x < 320; x += 3) { const y = 176 + (x % 7 === 0 ? 2 : 0), l = 4 + Math.round(h(x, 1, 116) * 4), s = Math.sin(t * 2 + x * 0.05) * 1.5; linea(x, y, x + Math.round(s), y - l, h(x, 2, 116) < 0.5 ? hex('#3a6a30') : hex('#5a8c3c')); }
  return { suelo: 150, libre: [30, 290], grieta: [236, 114, 240, 142], criatura: { x: 222, dir: 1, x2: 244, dir2: -1 }, puerta: [102, 116, 120, 150], ventanas: [[70, 104, 90, 122], [136, 104, 156, 122]], chimenea: [170, 38] };
}

// helechos y hierba alta por delante, en las esquinas de abajo, mecidos por el viento
function c_helechos(R, t) {
  const { linea, pset } = R;
  for (const [x0, s, k] of [[6, 1, 0], [20, 1, 1], [314, -1, 2], [300, -1, 3]]) for (let f = 0; f < 5; f++) {
    const a = -1.2 - f * 0.32 * s + Math.sin(t * 1.6 + k + f) * 0.06, L = 26 - f * 2; let px = x0, py = 180;
    for (let i = 0; i < L; i++) { const ang = a + (s > 0 ? 1 : -1) * i * 0.03, nx = px + Math.cos(ang) * (s > 0 ? 1 : -1) * -1, ny = py + Math.sin(ang); px = nx; py = ny; const c = i % 2 ? hex('#2a5a26') : hex('#3a7030');
      pset(Math.round(px), Math.round(py), hex('#1e4a1e')); if (i > 3 && i % 2 === 0) { const l = Math.round((L - i) * 0.25) + 1; linea(Math.round(px), Math.round(py), Math.round(px - l), Math.round(py + l * 0.6), c); linea(Math.round(px), Math.round(py), Math.round(px + l), Math.round(py + l * 0.6), c); } } }
}

const c_luzFuego = (x, y) => c_lim(1 - Math.hypot((x - 232) * 0.75, (y - 132) * 0.9) / 190);

const c_CAL = c_H(['#1a1210', '#261a14', '#34241a', '#463020', '#5c3e28', '#764e30', '#90603a', '#a87648', '#c08c58', '#d4a46a', '#e4bc84']);

function c_dentroFija(R) {
  const { rect, pset, linea, poligono, disco } = R, K = hex('#0c0a12');
  // la pared de piedra encalada, encendida por el fuego
  for (let y = 24; y < 152; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 7), c = Math.floor((x + (f & 1) * 6) / 13), fx = (x + (f & 1) * 6) % 13, fy = y % 7;
    let v = 1.6 + c_luzFuego(x, y) * 8 + (h(c, f, 120) - 0.5) * 0.9 + (fy === 0 || fx === 0 ? -0.9 : fy === 1 ? 0.4 : 0) + (h(x >> 1, y >> 1, 121) - 0.5) * 0.6; pset(x, y, c_ramp(c_CAL, v, x, y)); }
  // las vigas del techo y el ahumado
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) pset(x, y, c_ramp(c_MAD, 0.8 + c_luzFuego(x, y + 40) * 2.4 + (y > 20 ? 1 : 0) + (h(x >> 3, y, 122) - 0.5) * 0.6, x, y));
  for (let x = 10; x < 320; x += 48) for (let y = 0; y < 30; y++) for (let i = 0; i < 9; i++) pset(x + i, y, c_ramp(c_MAD, 2 + c_luzFuego(x, 60) * 3.5 + (i === 0 ? -1 : i === 1 ? 1 : i === 8 ? -1.2 : 0) + (h(x + i, y >> 2, 123) - 0.5) * 0.6, x + i, y));
  rect(0, 24, 319, 27, c_MAD[3]); rect(0, 24, 319, 24, c_MAD[5]);
  // las hierbas y las ristras colgadas de la viga
  for (const [x, l, c] of [[60, 14, '#6a7a3a'], [68, 18, '#8a6a3a'], [76, 12, '#5a6a32'], [88, 16, '#c8b060']]) { linea(x, 28, x, 32, hex('#4a3a28')); for (let j = 0; j < l; j++) { pset(x + Math.round(Math.sin(j * 0.7 + x) * 1.3), 32 + j, hex(c)); if (j % 2) pset(x - 1, 32 + j, c_mez(hex(c), K, 0.4)); } }
  // el tabique de tablas de la izquierda, que da al cobertizo, con la grieta
  for (let y = 26; y < 152; y++) for (let x = 0; x < 34; x++) { const fx = x % 8; let v = 1.8 + c_luzFuego(x, y) * 4 + (h(x >> 3, 0, 124) - 0.5) * 1 + (fx === 0 ? -1.4 : fx === 1 ? 0.6 : 0) + (h(x, y >> 2, 125) - 0.5) * 0.6; if (x === 33) v -= 1.5; pset(x, y, c_ramp(c_MAD, v + 1, x, y)); }
  for (let y = 88; y <= 130; y++) { const x = 21 + Math.round(Math.sin(y * 0.45) * 1.4), w = y < 92 || y > 126 ? 0 : y < 98 || y > 118 ? 1 : 2; for (let i = -w; i <= w; i++) pset(x + i, y, K); pset(x + w + 1, y, c_MAD[7]); pset(x - w - 1, y, c_MAD[2]); }
  for (const [x, y] of [[17, 100], [26, 112], [18, 122]]) { pset(x, y, K); pset(x + (x < 21 ? 1 : -1), y + 1, K); }
  // el vasar con la loza
  rect(40, 62, 106, 64, c_MAD[5]); rect(40, 62, 106, 62, c_MAD[7]); rect(40, 65, 106, 66, c_MAD[1]);
  for (let i = 0; i < 5; i++) { const x = 46 + i * 13; disco(x, 55, 5, hex('#3a3a4a')); disco(x, 55, 4.2, i % 2 ? hex('#d8d0c0') : hex('#8aa0c0')); disco(x, 55, 2, i % 2 ? hex('#a8a090') : hex('#5a7aa8')); pset(x + 2, 52, hex('#ffffff')); }
  for (const [x, c] of [[52, '#9a5a3a'], [78, '#6a7a8a'], [100, '#9a7a4a']]) { rect(x - 3, 54 + 0, x + 3, 61, K); rect(x - 2, 55, x + 2, 61, hex(c)); pset(x - 1, 56, c_mez(hex(c), hex('#ffffff'), 0.5)); rect(x + 3, 56, x + 4, 58, hex(c)); }
  // la ventana: marco hondo de piedra (fuera, en cada fotograma)
  rect(114, 46, 164, 90, c_CAL[2]); rect(116, 48, 162, 88, c_CAL[1]); rect(112, 88, 166, 92, c_CAL[6]); rect(112, 88, 166, 88, c_CAL[8]);
  // el hogar: el marco de piedra, la repisa y lo que hay en ella, la boca negra, el llar
  for (let y = 60; y < 152; y++) for (let x = 196; x < 270; x++) { const f = Math.floor(y / 6), c = Math.floor((x + (f & 1) * 5) / 10), fx = (x + (f & 1) * 5) % 10, fy = y % 6;
    pset(x, y, c_ramp(c_H(['#2a2220', '#3e3430', '#56483e', '#6e5c4c', '#8a7258', '#a68a66']), 2 + c_luzFuego(x, y) * 3 + (h(c, f, 126) - 0.5) * 1.2 + (fy === 0 || fx === 0 ? -1.2 : fy === 1 ? 0.5 : 0), x, y)); }
  rect(190, 82, 276, 87, c_MAD[5]); rect(190, 82, 276, 82, c_MAD[7]); rect(190, 87, 276, 87, c_MAD[1]);
  for (const x of [200, 262]) { rect(x - 2, 72, x + 2, 81, hex('#a07830')); rect(x - 1, 66, x + 1, 71, hex('#e8dcc0')); pset(x, 65, hex('#ffd070')); }
  { const x = 222; rect(x - 4, 72, x + 4, 81, K); rect(x - 3, 73, x + 3, 81, hex('#7a5a3a')); rect(x + 4, 74, x + 6, 77, hex('#7a5a3a')); }
  { const x = 244; disco(x, 77, 4.5, K); disco(x, 77, 3.6, hex('#5a6a7a')); rect(x - 1, 70, x + 1, 73, K); }
  rect(208, 100, 258, 152, hex('#120c0a')); for (let y = 100; y < 152; y++) for (let x = 208; x <= 258; x++) if (c_b4(x, y) < (y - 100) / 90) pset(x, y, hex('#1e1410'));
  rect(206, 98, 260, 101, hex('#3e3430')); rect(206, 98, 260, 98, hex('#6e5c4c'));
  rect(214, 102, 215, 116, hex('#2a2a30')); rect(214, 102, 236, 103, hex('#2a2a30'));
  // la mesa de pared: tablero, patas, libros, pan, jarra
  for (let x = 44; x <= 104; x++) for (let y = 124; y <= 127; y++) pset(x, y, c_ramp(c_MAD, (y === 124 ? 7 : y === 127 ? 2 : 5) + c_luzFuego(x, y) * 1.5, x, y));
  for (const x of [46, 100]) { rect(x, 128, x + 2, 152, c_MAD[3]); rect(x, 128, x, 152, c_MAD[5]); } rect(48, 142, 100, 143, c_MAD[2]);
  c_libros(R, 50, 72, 123, 31, 0.9);
  { const x = 82, y = 123; R.disco(x, y - 2, 4.5, hex('#6a4220')); R.disco(x, y - 3, 3.8, hex('#b07a3e')); for (let i = -3; i <= 3; i += 2) pset(x + i, y - 5, hex('#e0b070')); rect(x - 5, y - 1, x + 5, y, hex('#d8ccb0')); }
  { const x = 96, y = 123; rect(x - 3, y - 8, x + 3, y, K); rect(x - 2, y - 7, x + 2, y - 1, hex('#8a5a3a')); rect(x + 3, y - 6, x + 5, y - 3, hex('#8a5a3a')); pset(x - 1, y - 6, hex('#d89a6a')); }
  // la rueca de hilar junto a la pared (x 150–182): la rueda con sus radios, el banco, las patas y el copo de lana
  { const cx = 168, cy = 128, r = 13; for (let a = 0; a < 6.283; a += 0.03) { pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), c_MAD[5]); pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), c_MAD[3]); }
    for (let k = 0; k < 8; k++) { const a = k * 0.785; linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), c_MAD[4]); } disco(cx, cy, 1.6, c_MAD[6]);
    linea(150, 146, 186, 140, c_MAD[4]); linea(150, 147, 186, 141, c_MAD[2]); for (const [x0, x1] of [[152, 150], [160, 162], [182, 186]]) linea(x0, 146, x1, 152, c_MAD[3]); linea(cx, cy, 160, 146, c_MAD[3]);
    rect(180, 126, 181, 140, c_MAD[4]); disco(181, 123, 3, hex('#e8e0d0')); pset(180, 122, hex('#ffffff')); linea(181, 124, cx + 2, cy - r + 1, hex('#d8d0c0')); }
  // el suelo de losas con la alfombra de esparto delante del fuego
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const e = 1 + (y - 152) / 28 * 0.5, u = (x - 160) / e / 22, f = Math.floor((y - 152) / 9 + 0.0), c = Math.floor(u + (f & 1) * 0.5 + 20), fu = (u + (f & 1) * 0.5 + 20) % 1, fy = (y - 152) % 9;
    let v = 1.4 + c_luzFuego(x, y) * 6.5 + (h(c, f, 127) - 0.5) * 1.2 + (fu < 0.05 || fy === 0 ? -1.6 : fy === 1 ? 0.5 : 0); pset(x, y, c_ramp(c_CAL, v, x, y)); }
  rect(0, 150, 319, 151, c_CAL[1]);
  poligono([[150, 160], [286, 160], [300, 178], [140, 178]], (x, y) => c_ramp(c_H(['#4a3a1e', '#6a5428', '#8a7034', '#a88a42', '#c4a456']), 1.4 + c_luzFuego(x, y) * 3 + (((x + y * 2) % 4) < 2 ? 0.7 : -0.5) + (y === 160 || y === 177 ? -1 : 0), x, y));
  // la puerta de fuera, a la derecha
  rect(280, 86, 314, 152, c_MAD[1]); for (let x = 283; x <= 311; x++) for (let y = 89; y < 152; y++) pset(x, y, c_ramp(c_MAD, 2.4 + c_luzFuego(x, y) * 3 + ((x - 283) % 6 === 0 ? -1.4 : 0) + (h(x, y >> 2, 128) - 0.5) * 0.7, x, y));
  for (const y of [100, 138]) rect(285, y, 306, y + 1, hex('#2a2a2e')); rect(285, 120, 287, 121, hex('#6a6a72'));
}

function c_cabanaDentro(R, t, o) {
  const { rect, pset, linea } = R, K = hex('#0c0a12');
  c_fijo(R, 'dentro', () => c_dentroFija(R));
  // fuera de la ventana: el bosque nevado al anochecer y la nieve que cae
  R.recorte([118, 50, 160, 86]);
  for (let y = 50; y <= 86; y++) for (let x = 118; x <= 160; x++) pset(x, y, c_ramp(c_H(['#1a2244', '#24305a', '#34446e', '#4a5a82', '#6a7698']), (y - 50) * 0.1 + (h(x >> 2, y >> 2, 130) - 0.5) * 0.4, x, y));
  for (let k = 0; k < 7; k++) { const x = 118 + k * 7 + Math.round(h(k, 1, 131) * 4), a = 16 + Math.round(h(k, 2, 131) * 10); for (let j = 0; j < a; j++) { const w = Math.round(j * 0.3); for (let i = -w; i <= w; i++) pset(x + i, 86 - a + j, j % 4 === 0 && i <= 0 ? hex('#c8d4e8') : hex('#1a2a30')); } }
  for (let y = 80; y <= 86; y++) for (let x = 118; x <= 160; x++) pset(x, y, c_b4(x, y) < 0.5 ? hex('#d8e4f0') : hex('#a8b8d4'));
  for (let k = 0; k < 18; k++) { const x = 118 + Math.floor((h(k, 1, 132) * 60 + t * 4 + Math.sin(t + k) * 3) % 44), y = 50 + Math.floor((h(k, 2, 132) * 50 + t * (8 + k % 3 * 3)) % 37); pset(x, y, hex('#ffffff')); }
  R.recorte(null);
  rect(138, 48, 139, 88, c_MAD[2]); rect(116, 67, 162, 68, c_MAD[2]); for (const x of [127, 150]) linea(x, 48, x, 88, hex('#2a2a34'));
  // el fuego del hogar: troncos, llamas que bailan, ascuas, la olla que humea y chispas que suben
  { for (const [x0, y0, x1, y1] of [[214, 148, 250, 144], [218, 144, 246, 150]]) { linea(x0, y0, x1, y1, hex('#3a2418')); linea(x0, y0 - 1, x1, y1 - 1, hex('#5a3a22')); linea(x0, y0 + 1, x1, y1 + 1, hex('#2a1a12')); }
    R.halo(233, 136, 34, c_H(['#3a1c10', '#5a2c14', '#8a4418', '#c06a20']), 0.75 + Math.sin(t * 7) * 0.08);
    for (let i = -14; i <= 14; i++) { const l = Math.round((14 - Math.abs(i)) * 1.1 + Math.sin(t * 9 + i * 1.3) * 3 + Math.sin(t * 17 + i * 0.7) * 2); for (let j = 0; j < l; j++) { const u = j / Math.max(1, l), x = 233 + i + Math.round(Math.sin(t * 6 + j * 0.4 + i) * u * 2); pset(x, 146 - j, u < 0.3 ? hex('#fff0a0') : u < 0.6 ? hex('#ffb040') : u < 0.85 ? hex('#e86a20') : hex('#a83a18')); } }
    for (let i = 0; i < 14; i++) pset(216 + i * 2 + (i & 1), 150, Math.sin(t * 5 + i) > 0 ? hex('#ff8030') : hex('#a83a18'));
    R.disco(226, 122, 8, K); R.disco(226, 122, 7, hex('#2a2a30')); rect(219, 116, 233, 117, hex('#4a4a52')); linea(226, 103, 219, 116, hex('#3a3a42')); linea(226, 103, 233, 116, hex('#3a3a42')); pset(222, 119, hex('#6a6a72'));
    for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1, x = Math.round(226 + Math.sin(u * 7 + k) * 3), y = Math.round(114 - u * 14); if (c_b4(x, y) < 1 - u) pset(x, y, hex('#c8c0b8')); }
    for (let k = 0; k < 6; k++) { const u = (t * 0.5 + h(k, 1, 133)) % 1, x = Math.round(228 + h(k, 2, 133) * 14 + Math.sin(t * 3 + k) * 3), y = Math.round(140 - u * 40); if (u < 0.85) pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c86020')); } }
  // las velas de la repisa y la de la mesa, que tiemblan
  c_llama(R, 200, 65, t, 4, 0); c_llama(R, 262, 65, t, 5, 0);
  // el ojo en la grieta del tabique
  if (o.ojo) { const ex = 21 + Math.round(Math.sin(106 * 0.45) * 1.4), ey = 106, cierra = (t % 3.4) < 0.14, mira = Math.sin(t * 0.7) > 0.3 ? 1 : 0;
    R.halo(ex, ey, 6, [hex('#3a3418'), hex('#5a4a1c')], 0.6);
    if (cierra) rect(ex - 2, ey, ex + 2, ey, hex('#8a7a40')); else { rect(ex - 2, ey - 1, ex + 2, ey + 1, hex('#e8d060')); rect(ex - 1, ey - 2, ex + 1, ey - 2, hex('#c8b048')); pset(ex - 1 + mira, ey, K); pset(ex + mira, ey, K); pset(ex - 1 + mira, ey - 1, hex('#2a2010')); pset(ex - 2, ey - 1, hex('#ffffff')); rect(ex - 2, ey + 2, ex + 2, ey + 2, hex('#6a5a28')); } }
  // el gato que duerme junto al fuego y mueve la cola
  { const x = 270, y = 151; R.disco(x, y - 3, 4, hex('#3a3030')); R.disco(x - 4, y - 4, 2.6, hex('#3a3030')); pset(x - 6, y - 7, hex('#3a3030')); pset(x - 3, y - 7, hex('#3a3030')); pset(x - 2, y - 3, hex('#e89a50')); rect(x - 1, y - 6, x + 2, y - 6, hex('#5a4a44'));
    const c = Math.sin(t * 1.7); for (let i = 0; i < 6; i++) pset(x + 4 + i, y - 1 - Math.round(Math.max(0, c) * i * 0.5), hex('#3a3030')); }
  return { suelo: 152, libre: [40, 260], grieta: [18, 92, 24, 126], ojo: [21, 104], fuego: [233, 140], mesa: { x0: 44, x1: 104, y: 124 }, ventana: [118, 50, 160, 86], puerta: [283, 89, 311, 152] };
}

// un cesto de mimbre y un cubo de madera por delante (x 290–320, y 158–180)
function c_cestoDelante(R, t) {
  const { rect, pset, disco } = R, K = hex('#0c0a12');
  for (let y = 162; y < 180; y++) for (let x = 288; x < 320; x++) { const r = Math.abs(x - 304) / 16; if (r > 1 - (y - 162) * 0.004) continue; pset(x, y, c_ramp(c_H(['#2a1a10', '#4a3018', '#6a4a22', '#8a6430', '#a87c3c']), 1.6 + c_luzFuego(x, y) * 3 + (((x + (y >> 1) * 2) % 4) < 2 ? 0.8 : -0.6) + (y === 162 ? 1.5 : 0), x, y)); }
  for (let i = 0; i < 3; i++) { disco(296 + i * 6, 160, 2.6, K); disco(296 + i * 6, 160, 2, [hex('#c84a2a'), hex('#d8a030'), hex('#a83a2a')][i]); pset(295 + i * 6, 159, hex('#ffe0c0')); }
}

const c_NOCHE = c_H(['#04060e', '#060a16', '#0a1020', '#0e162a', '#121c34', '#18243e', '#1e2c48', '#263652']);

const c_HIELO = c_H(['#1a2a44', '#22365a', '#2c446c', '#3a5480', '#4a6692', '#5e7aa4', '#7690b6', '#90a8c8', '#aec4dc', '#cadcec']);

// la aurora: cortinas verdes con el borde de abajo malva que ondean con t (x0–x1; se aparta de la barra y de Atom)
function c_aurora(R, t, x0, x1, yb, alto, f = 1) {
  const COL = c_H(['#1e5a4a', '#2a8a62', '#40b878', '#7ae8a0', '#c8ffd8']);
  for (let x = x0; x <= x1; x++) {
    const base = yb + Math.sin(x * 0.018 + t * 0.22) * 12 + Math.sin(x * 0.052 - t * 0.35) * 4, top = base - alto * (0.55 + 0.45 * Math.sin(x * 0.027 + t * 0.15 + 1));
    const I = f * (0.45 + 0.35 * Math.sin(x * 0.11 + t * 0.9 + Math.sin(x * 0.03 + t * 0.2) * 3) + 0.2 * Math.sin(x * 0.53 + t * 2.1));
    if (I <= 0.05) continue;
    for (let y = Math.max(0, Math.floor(top)); y <= base + 2; y++) { if ((x < 176 && y < 20) || (x > 270 && y < 48)) continue;
      const g = (y - top) / (base - top); let a = I * Math.pow(c_lim(g), 1.6); if (y > base) a = I * 0.7;
      if (a > c_b4(x, y) * 0.9) { const c = y > base - 1 ? hex('#e07ab0') : y > base - 3 ? hex('#a86ac0') : COL[Math.min(4, Math.floor(a * 5))]; R.pset(x, y, c_mez(R.pget(x, y), c, 0.55 + a * 0.35)); } } }
}

function c_cieloArtico(R, y1, k) {
  for (let y = 0; y < y1; y++) for (let x = 0; x < 320; x++) pset_(R, x, y, c_ramp(c_NOCHE, y / y1 * 7 + (h(x >> 3, y >> 3, 140 + k) - 0.5) * 0.4, x, y));
  for (let i = 0; i < 160; i++) { const x = Math.round(h(i, 1, 141 + k) * 319), y = Math.round(h(i, 2, 141 + k) * (y1 - 10)); if ((x < 176 && y < 20) || (x > 274 && y < 46)) continue; R.pset(x, y, h(i, 3, 141) < 0.2 ? hex('#c8d4f0') : hex('#5a6890')); }
}

const pset_ = (R, x, y, c) => R.pset(x, y, c);

// el barco atrapado en el hielo, pequeño (general): casco x 222–298, cubierta y ≈ 94, palos hasta y 42
function c_barquito(R) {
  const { rect, pset, linea, poligono } = R, K = hex('#0c0a12');
  const dy = (x) => Math.round((x - 260) * -0.05);
  for (const [x, top] of [[238, 52], [258, 42], [276, 54]]) { rect(x, top + dy(x), x + 1, 96 + dy(x), hex('#3a2a20')); pset(x, top + dy(x), hex('#8a6a50'));
    for (const [yy, w] of [[top + 6, 12], [top + 18, 15], [top + 30, 13]]) { if (yy > 90) continue; const y = yy + dy(x); linea(x - w, y + 1, x + w, y - 1, hex('#3a2a20')); for (let i = -w + 1; i < w; i++) { pset(x + i, y + 1 - Math.round((i + w) / (2 * w) * 2) + 1, hex('#c8c0b0')); if (h(i, y, 142) < 0.4) pset(x + i, y - Math.round((i + w) / (2 * w) * 2) + 1, hex('#f0f4ff')); } } }
  for (const [x0, y0, x1, y1] of [[238, 52, 224, 92], [258, 42, 226, 92], [258, 42, 296, 88], [276, 54, 306, 84], [238, 52, 258, 42]]) linea(x0, y0 + dy(x0), x1, y1 + dy(x1), hex('#2a2430'));
  poligono([[220, 92 + dy(220)], [306, 84 + dy(306)], [298, 106], [228, 108]], (x, y) => c_ramp(c_H(['#1a1418', '#2a2026', '#3a2c30', '#4e3a3a', '#6a5048']), 2 + (h(x >> 2, y >> 1, 143) - 0.5) * 0.8 + ((y + Math.round((x - 260) * 0.05)) % 4 === 0 ? -1 : 0), x, y));
  for (let x = 222; x < 304; x++) { const y = 92 + dy(x) - (x > 296 ? x - 296 : 0) * 0; pset(x, y, hex('#e8f0fa')); pset(x, y - 1, hex('#c8d4e8')); }
  linea(306, 84 + dy(306), 318, 78, hex('#3a2a20'));
  for (const x of [232, 244, 256, 268, 280]) rect(x, 98 + dy(x), x + 2, 99 + dy(x), hex('#121014'));
  rect(224, 95 + dy(224), 230, 98 + dy(224), hex('#ffb850'));
  // el hielo apretado contra el casco
  for (let x = 214; x < 314; x++) { const a = 6 + Math.round(Math.abs(Math.sin(x * 0.21)) * 5 + h(x >> 2, 0, 144) * 3); for (let j = 0; j < a; j++) pset(x, 110 - j + (x > 300 ? 2 : 0), c_ramp(c_HIELO, 5 + j * 0.35 + (Math.sin(x * 0.21) > 0 ? 1.2 : -0.6) + (h(x, j, 145) - 0.5), x, 110 - j)); }
}

function c_articoFija(R) {
  const { rect, pset, linea, poligono } = R;
  c_cieloArtico(R, 100, 0);
  // icebergs y montes de hielo en el horizonte
  for (const [x0, w, a, k] of [[0, 60, 14, 0], [52, 40, 22, 1], [110, 50, 10, 2], [168, 36, 18, 3], [300, 40, 12, 4]]) for (let x = x0; x < x0 + w; x++) { const u = (x - x0) / w, top = Math.round(100 - a * Math.sin(u * Math.PI) ** 0.6 - (h(x >> 2, k, 146) - 0.5) * 4);
    for (let y = top; y < 101; y++) pset(x, y, c_ramp(c_HIELO, (u < 0.45 ? 7 : 4.6) - (y - top) * 0.06 + (h(x, y >> 1, 147) - 0.5) * 0.6, x, y)); pset(x, top, c_HIELO[9]); }
  // la llanura de hielo: azul tramado que se aclara hacia delante, sastrugis, grietas y crestas de presión
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 3 + (y - 100) * 0.05 + Math.sin(x * 0.05 + y * 0.4 + Math.sin(x * 0.013) * 4) * 0.5 + (h(x >> 2, y >> 1, 148) - 0.5) * 0.8;
    pset(x, y, c_ramp(c_HIELO, v, x, y)); }
  for (const [x0, y0, len, k] of [[20, 130, 90, 0], [120, 168, 120, 1], [200, 140, 80, 2], [0, 176, 60, 3]]) { let x = x0, y = y0; for (let i = 0; i < len; i++) { pset(x, y, c_HIELO[0]); if (i % 3 === 0) pset(x, y + 1, c_HIELO[7]); x++; if (h(i, k, 149) < 0.25) y += h(i, k, 150) < 0.5 ? 1 : -1; } }
  for (const [x0, y0, w, k] of [[4, 118, 70, 0], [96, 112, 44, 1], [190, 124, 34, 2]]) for (let i = 0; i < w; i++) { const a = Math.round(2 + Math.abs(Math.sin(i * 0.4 + k)) * 5 * Math.sin(i / w * Math.PI)); for (let j = 0; j < a; j++) pset(x0 + i, y0 - j, j === a - 1 ? c_HIELO[9] : (i + j) % 5 < 2 ? c_HIELO[4] : c_HIELO[7]); }
  c_barquito(R);
  for (const [x0, y0, w, k] of [[30, 166, 90, 3], [210, 160, 80, 4], [120, 176, 70, 5]]) for (let i = 0; i < w; i++) { const a = Math.round(Math.sin(i / w * Math.PI) * (3 + h(k, 0, 154) * 3)); for (let j = 0; j <= a; j++) pset(x0 + i, y0 - j, j === a ? c_HIELO[9] : i < w * 0.45 ? c_HIELO[8] : c_HIELO[5]); pset(x0 + i, y0 + 1, c_HIELO[3]); }
  for (let k = 0; k < 16; k++) { const x = 318 - k * 8, y = 140 + Math.round(Math.sin(k * 0.6) * 2) + (k & 1) * 2; pset(x, y, c_HIELO[2]); pset(x + 1, y, c_HIELO[3]); }
  // el trineo cargado: patines, travesaños, fardos atados
  { const x = 152, y = 152; R.poligono([[x - 2, y], [x + 36, y], [x + 38, y - 3], [x + 36, y - 1], [x - 2, y - 1]], hex('#3a2a20')); linea(x - 2, y - 1, x - 5, y - 6, hex('#5a4030')); linea(x + 36, y - 1, x + 40, y - 6, hex('#5a4030'));
    for (let i = 0; i < 6; i++) rect(x + 2 + i * 6, y - 4, x + 2 + i * 6, y - 1, hex('#5a4030')); rect(x, y - 5, x + 36, y - 4, hex('#6a5038'));
    for (const [bx, w, c] of [[x + 2, 12, '#6a5a48'], [x + 15, 10, '#4a4a5a'], [x + 26, 9, '#7a5a3a']]) { rect(bx, y - 12, bx + w, y - 6, hex(c)); rect(bx, y - 12, bx + w, y - 12, c_mez(hex(c), hex('#ffffff'), 0.3)); rect(bx + (w >> 1), y - 12, bx + (w >> 1), y - 6, hex('#2a2018')); rect(bx, y - 13, bx + w, y - 13, hex('#e8f0fa')); }
    for (let i = -6; i < 46; i++) pset(x + i, y + 1, c_HIELO[3]); }
}

function c_artico(R, t, o) {
  const { pset, rect, linea } = R, K = hex('#0c0a12');
  c_fijo(R, 'artico', () => c_articoFija(R));
  // las estrellas que titilan y la aurora
  for (let i = 0; i < 24; i++) { const x = Math.round(h(i, 5, 151) * 319), y = Math.round(h(i, 6, 151) * 80); if ((x < 176 && y < 20) || (x > 274 && y < 46)) continue; const b = Math.sin(t * (1.3 + (i % 4) * 0.7) + i * 2); if (b > 0.3) pset(x, y, b > 0.8 ? hex('#ffffff') : hex('#a8b8e0')); }
  c_aurora(R, t, 0, 300, 62, 40, 1);
  // el reflejo de la aurora en el hielo (franjas tenues que se mueven)
  for (let y = 102; y < 124; y += 2) for (let x = 0; x < 214; x += 1) { const a = 0.5 + 0.5 * Math.sin(x * 0.11 + t * 0.9 + Math.sin(x * 0.03 + t * 0.2) * 3); if (a > 0.75 && c_b4(x, y) < (a - 0.75) * 3) pset(x, y, c_mez(R.pget(x, y), hex('#5ad8a0'), 0.25)); }
  // los faroles del barco, el humo de la estufa y dos marineros que van y vienen por cubierta
  { const dy = (x) => Math.round((x - 260) * -0.05), f = Math.sin(t * 6) > -0.6; pset(246, 88 + dy(246), f ? hex('#ffd070') : hex('#c08030')); R.halo(246, 88 + dy(246), 6, [hex('#2a3048'), hex('#5a4a40')], 0.5); pset(290, 82 + dy(290), hex('#ffd070'));
    for (let k = 0; k < 5; k++) { const u = (t * 0.25 + k / 5) % 1, x = Math.round(266 + u * 18 + Math.sin(u * 5 + t) * 1.5), y = Math.round(86 + dy(266) - u * 20); if (c_b4(x, y) < 1 - u) { pset(x, y, hex('#6a7088')); pset(x + 1, y, hex('#4a5068')); } } rect(265, 86 + dy(265), 266, 91 + dy(265), K);
    for (let k = 0; k < 2; k++) { const u = (t * 0.06 + k * 0.5) % 1, s = u < 0.5 ? u * 2 : 2 - u * 2, x = Math.round(232 + s * 56), y = 91 + dy(x); rect(x, y - 5, x + 1, y - 1, hex('#2a2a3a')); pset(x, y - 6, hex('#d8b090')); pset(x, y - 7, hex('#3a2a2a')); } }
  // el oso blanco que camina a lo lejos
  { const u = (t * 0.012) % 1, x = Math.round(20 + u * 150), y = 109, p = Math.floor(t * 3) % 2; rect(x, y - 4, x + 7, y - 2, hex('#e8ecf0')); rect(x + 7, y - 5, x + 9, y - 3, hex('#e8ecf0')); pset(x + 9, y - 4, K); rect(x + 1, y - 1, x + 1, y - p, hex('#c8d0dc')); rect(x + 6, y - 1, x + 6, y - 1 + p, hex('#c8d0dc')); rect(x, y - 2, x + 7, y - 2, hex('#b8c4d4')); }
  // los brillos del hielo y la nieve que arrastra el viento a ras de suelo
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 152) * 319), y = Math.round(112 + h(k, 2, 152) * 66); if (Math.sin(t * 2.4 + k * 3) > 0.85) { pset(x, y, hex('#ffffff')); pset(x - 1, y, hex('#cadcec')); pset(x + 1, y, hex('#cadcec')); } }
  for (let k = 0; k < 60; k++) { const sp = 40 + h(k, 1, 153) * 40, x = Math.round(((h(k, 2, 153) * 360 + t * sp) % 360) - 20), y = Math.round(100 + h(k, 3, 153) * 80 + Math.sin(t * 2 + k) * 2); pset(x, y, hex('#e8f0fa')); if (k % 2) pset(x - 1, y, hex('#9ab0cc')); if (k % 3 === 0) pset(x - 2, y, hex('#7a90b0')); }
  return { suelo: 152, libre: [30, 200], barco: { x0: 222, x1: 298, cubierta: 94 }, trineo: [152, 188, 152], horizonte: 100 };
}

// el barco de cerca al anochecer (cámara 'barco'): casco x 112–312, cubierta y ≈ 86
function c_barcoFija(R) {
  const { rect, pset, linea, poligono } = R, K = hex('#0c0a12');
  // el cielo del anochecer polar: violeta arriba y un resplandor naranja frío a ras del horizonte
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) pset(x, y, c_ramp(c_H(['#060a18', '#0a1022', '#10182e', '#18203c', '#26284a', '#3a3054', '#58385a', '#80465a', '#a8605a', '#c88a68']), (y / 118) ** 1.5 * 9 + Math.max(0, 1 - Math.hypot((x - 40) * 0.4, (y - 120) * 1.2) / 60) * 1.5, x, y));
  for (let i = 0; i < 120; i++) { const x = Math.round(h(i, 1, 160) * 319), y = Math.round(h(i, 2, 160) * 60); if ((x < 176 && y < 20) || (x > 274 && y < 46)) continue; pset(x, y, h(i, 3, 160) < 0.25 ? hex('#c8d4f0') : hex('#4a5480')); }
  for (const [x0, w, a] of [[0, 50, 10], [40, 30, 16], [80, 40, 8]]) for (let x = x0; x < x0 + w; x++) { const u = (x - x0) / w, top = Math.round(118 - a * Math.sin(u * Math.PI) ** 0.7); for (let y = top; y < 119; y++) pset(x, y, c_ramp(c_HIELO, (u < 0.5 ? 6 : 3.4) + (h(x, y, 161) - 0.5) * 0.6, x, y)); pset(x, top, u < 0.5 ? hex('#e8b8a0') : c_HIELO[6]); }
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, c_ramp(c_HIELO, 2.6 + (y - 118) * 0.07 + Math.sin(x * 0.04 + y * 0.5) * 0.5 + (h(x >> 2, y >> 1, 162) - 0.5) * 0.8 + Math.max(0, 1 - Math.hypot((x - 40) * 0.3, y - 118) / 40) * 2, x, y));
  // los palos con sus vergas, las velas aferradas con escarcha y la jarcia (lejos de la barra y de Atom)
  for (const [x, top] of [[150, 18], [208, 8], [262, 30]]) { rect(x - 1, top, x + 1, 90, hex('#2e2018')); rect(x - 1, top, x - 1, 90, hex('#5a4030')); rect(x - 2, top + 14, x + 2, top + 16, hex('#2e2018'));
    for (const [dy, w] of [[8, 20], [24, 28], [42, 32]]) { const y = top + dy; if (y > 76) continue; rect(x - w, y, x + w, y + 1, hex('#2e2018')); for (let i = -w + 1; i < w; i++) { const b = 2 + Math.round(Math.abs(Math.sin(i * 0.5)) * 1.5); for (let j = 0; j < b; j++) pset(x + i, y + 2 + j, j === 0 ? hex('#e0e8f4') : (i + j) % 4 ? hex('#a8a498') : hex('#7a7468')); } pset(x - w, y + 2, hex('#2e2018')); pset(x + w, y + 2, hex('#2e2018')); } }
  for (const [x0, y0, x1, y1] of [[150, 18, 118, 84], [150, 18, 180, 84], [208, 8, 172, 84], [208, 8, 244, 84], [262, 30, 230, 84], [262, 30, 296, 82], [150, 18, 208, 8], [208, 8, 262, 30], [262, 30, 300, 84]]) linea(x0, y0, x1, y1, hex('#1e1a24'));
  for (const xs of [[118, 150], [172, 208], [230, 262]]) for (let k = 1; k < 6; k++) { const y = 84 - k * 10; linea(xs[0] + k * 5, y, xs[1] - 2, y + 2 + 0, hex('#2a2430'), 2); }
  // el casco: tracas que siguen la curva, dos cintas, portas cerradas, la escarcha y el ventanal de popa
  const quilla = (x) => 150 - Math.round(Math.max(0, x - 250) ** 2 / 84);
  const cub = (x) => 86 - Math.round(Math.max(0, (x - 260) * 0.12)) + Math.round(Math.max(0, (130 - x) * 0.15));
  for (let x = 112; x <= 316; x++) { const yt = cub(x), yb = quilla(x); for (let y = yt; y <= yb; y++) { const s = (y - yt) % 5; let v = 2.2 + (h(Math.floor((x + (Math.floor((y - yt) / 5) & 1) * 17) / 34), Math.floor((y - yt) / 5), 163) - 0.5) * 0.9 + (s === 0 ? -1 : s === 1 ? 0.7 : 0) - (y - yt) * 0.012; if (x > 304) v -= 0.8; if (x === 112 || y === yb) v -= 1.5; pset(x, y, c_ramp(c_H(['#140e10', '#1e161a', '#2c2024', '#3c2c2e', '#4e3a38', '#644a42', '#7a5c4e']), v, x, y)); } }
  for (const dy of [12, 30]) for (let x = 112; x <= 310; x++) { const y = cub(x) + dy; if (y < quilla(x)) { rect(x, y, x, y + 2, hex('#0e0a0c')); pset(x, y, hex('#5a4a44')); } }
  for (let x = 140; x < 296; x += 22) { const y = cub(x) + 17; rect(x, y, x + 7, y + 6, hex('#0e0a0c')); rect(x + 1, y + 1, x + 6, y + 5, hex('#5a2a24')); rect(x + 1, y + 1, x + 6, y + 1, hex('#8a4a3a')); }
  rect(112, cub(112) - 10, 130, cub(112) + 22, hex('#2a1e1e')); for (let i = 0; i < 3; i++) { rect(115 + i * 5, cub(112) - 6, 118 + i * 5, cub(112) + 2, hex('#ffbe60')); rect(115 + i * 5, cub(112) - 6, 118 + i * 5, cub(112) - 6, hex('#fff0b0')); }
  rect(110, cub(112) - 12, 132, cub(112) - 10, hex('#5a4030')); rect(110, cub(112) - 12, 132, cub(112) - 12, hex('#e8f0fa'));
  for (let x = 112; x <= 312; x++) { const y = cub(x); rect(x, y - 4, x, y - 1, hex('#3a2a24')); pset(x, y - 5, hex('#e8f0fa')); if (x % 9 === 0) rect(x, y - 4, x, y, hex('#1a1214')); }
  for (let x = 250; x <= 316; x++) { const yb = quilla(x); if (yb > cub(x)) { pset(x, yb, hex('#4a3a30')); pset(x, yb - 1, hex('#2a1e1a')); } } rect(315, cub(316) - 6, 317, quilla(316), hex('#2a1e18'));
  linea(312, cub(312) - 4, 320, 62, hex('#3a2a20')); linea(312, cub(312) - 3, 320, 63, hex('#2a1e18'));
  for (let x = 112; x <= 312; x++) { const yb = quilla(x); for (let j = 0; j < 10; j++) if (c_b4(x, yb - j) < (10 - j) / 12) pset(x, yb - j, j < 3 ? hex('#cadcec') : hex('#90a8c8')); }
  // el hielo que aprieta el casco: bloques apilados
  for (let b = 0; b < 17; b++) { const cx = 104 + b * 13 + Math.round((h(b, 0, 164) - 0.5) * 6), w = 16 + Math.floor(h(b, 1, 164) * 12), a = 4 + Math.floor(h(b, 2, 164) * 7), inc = Math.round((h(b, 3, 164) - 0.5) * 6), x0 = cx - (w >> 1), x1 = cx + (w >> 1), xm = cx + Math.round((h(b, 4, 164) - 0.5) * w * 0.4);
    R.poligono([[x0, 158], [x0 + 1, 158 - a + inc], [xm, 158 - a - 1], [x1 - 1, 158 - a - inc], [x1, 158]], (x, y) => c_ramp(c_HIELO, (x < xm ? 6.8 : 5.4) + (h(x >> 1, y >> 1, 165 + b) - 0.5) * 0.8 + (y - 150) * -0.04, x, y));
    linea(x0 + 1, 158 - a + inc, xm, 158 - a - 1, c_HIELO[9]); linea(xm, 158 - a - 1, x1 - 1, 158 - a - inc, c_HIELO[7]); linea(xm, 158 - a, xm + Math.round((h(b, 5, 164) - 0.5) * 4), 157, c_HIELO[5]); }
  // la escala que baja de la borda al hielo
  for (const x of [124, 133]) linea(x + 3, cub(x) - 4, x, 160, hex('#3a2a20')); for (let y = cub(128) + 2; y < 160; y += 6) linea(125 + Math.round((160 - y) * 0.04), y, 133 + Math.round((160 - y) * 0.04), y, hex('#5a4030'));
}

function c_barco(R, t, o) {
  const { pset, rect } = R, K = hex('#0c0a12');
  c_fijo(R, 'barco', () => c_barcoFija(R));
  c_aurora(R, t, 0, 270, 44, 30, 0.55);
  for (let i = 0; i < 14; i++) { const x = Math.round(h(i, 5, 166) * 319), y = Math.round(h(i, 6, 166) * 60); if ((x < 176 && y < 20) || (x > 274 && y < 46)) continue; if (Math.sin(t * (1.5 + i % 3) + i) > 0.5) pset(x, y, hex('#ffffff')); }
  const cub = (x) => 86 - Math.round(Math.max(0, (x - 260) * 0.12)) + Math.round(Math.max(0, (130 - x) * 0.15));
  // la tripulación pequeña asomada a la borda, que va y viene; los faroles; el humo
  for (let k = 0; k < 4; k++) { const u = (t * (0.03 + k * 0.01) + k * 0.27) % 1, s = u < 0.5 ? u * 2 : 2 - u * 2, x = Math.round(140 + s * 140 + k * 3), y = cub(x) - 4; if (x > 300) continue;
    rect(x - 1, y - 4, x + 1, y, [hex('#2a2a3a'), hex('#3a2a24'), hex('#22303a'), hex('#4a3a2a')][k]); rect(x - 1, y - 7, x + 1, y - 5, hex('#d8b090')); rect(x - 1, y - 8, x + 1, y - 8, hex('#2a2a2a')); }
  for (const [x, k] of [[176, 0], [248, 1]]) { const y = cub(x) - 10, f = Math.sin(t * 6 + k * 2) * 0.5 + 0.5; R.halo(x, y, 10, [hex('#2a2030'), hex('#5a3a30'), hex('#a8683a')], 0.5 + f * 0.2); rect(x - 1, y - 2, x + 1, y + 2, hex('#1a1214')); pset(x, y, f > 0.3 ? hex('#ffd070') : hex('#ffb040')); pset(x, y + 1, hex('#ffb040')); rect(x, y - 6, x, y - 3, hex('#1a1214')); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.2 + k / 6) % 1, r = 1.5 + u * 4, cx = 236 + u * 30 + Math.sin(u * 5 + t) * 2, cy = cub(236) - 12 - u * 34; for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d < 1 && c_b4(xx, yy) < (1 - u) * (1.1 - d) && !(xx > 274 && yy < 46)) pset(xx, yy, d < 0.5 ? hex('#7a7488') : hex('#4e4a60')); } }
  rect(235, cub(236) - 14, 237, cub(236) - 4, K);
  // el resplandor del ventanal de popa, que parpadea, y la nieve que arrastra el viento
  { const f = 0.5 + Math.sin(t * 5) * 0.1; R.halo(122, cub(112) - 2, 16, [hex('#2a2a3a'), hex('#4a3a3a')], f); for (let i = 0; i < 3; i++) R.rect(115 + i * 5, cub(112) - 6, 118 + i * 5, cub(112) + 2, Math.sin(t * 3 + i) > 0.7 ? hex('#ffd480') : hex('#ffbe60')); }
  for (let k = 0; k < 50; k++) { const sp = 30 + h(k, 1, 167) * 40, x = Math.round(((h(k, 2, 167) * 360 + t * sp) % 360) - 20), y = Math.round(120 + h(k, 3, 167) * 60 + Math.sin(t * 2 + k) * 2); pset(x, y, hex('#e8f0fa')); if (k % 2) pset(x - 1, y, hex('#9ab0cc')); }
  return { suelo: 160, libre: [10, 300], casco: { x0: 112, x1: 312, cubierta: 86 }, escala: [124, 134, 160], horizonte: 118 };
}

// nieve que vuela por delante y témpanos en las esquinas de abajo
function c_nieveDelante(R, t, cam) {
  const { pset, poligono } = R;
  for (const [pts, k] of [[[[0, 180], [0, 160], [8, 156], [18, 162], [26, 172], [28, 180]], 0], [[[292, 180], [296, 168], [306, 160], [316, 162], [320, 158], [320, 180]], 1]]) {
    poligono(pts, (x, y) => c_ramp(c_HIELO, 6 + (x - pts[2][0]) * -0.08 + (h(x >> 1, y >> 1, 170 + k) - 0.5) * 1.2, x, y)); for (let i = 1; i < pts.length - 2; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], c_HIELO[9]); }
  for (let k = 0; k < 28; k++) { const sp = 90 + h(k, 1, 171) * 70, x = Math.round(((h(k, 2, 171) * 380 + t * sp) % 380) - 30), y = Math.round(20 + h(k, 3, 171) * 160 + Math.sin(t * 3 + k) * 4); if (x > 274 && y < 46) continue; pset(x, y, hex('#ffffff')); pset(x + 1, y, hex('#ffffff')); pset(x - 1, y, hex('#c8d8ec')); pset(x - 2, y, hex('#8aa0c0')); }
}

// la paleta de D: la madera de roble de la prensa, la cal, el papel, la tinta, el oro y el terciopelo del teatro
const DC = Object.fromEntries(Object.entries({
  k: '#16121a', roble: '#8a6038', robleS: '#62421f', robleD: '#3e2812', robleL: '#b4844e',
  cal: '#d6c8a6', calS: '#baa988', calD: '#9a8868', calL: '#e6dabc', ladr: '#8a5640', ladrS: '#643a2a', ladrL: '#a86a4e',
  tabla: '#7c5834', tablaS: '#634528', tablaL: '#98703f', tablaD: '#3c2816', viga: '#4a3220', vigaS: '#2e1e12',
  papel: '#f2ead2', papelS: '#d2c6a4', papelD: '#a89a7a', tinta: '#24202e', hierro: '#4a4a56', hierroL: '#9a9aa8', hierroS: '#2a2a34',
  verde: '#2e4e40', verdeS: '#1e3a2e', verdeL: '#4a7060', oro: '#d8a840', oroS: '#9a6e22', oroL: '#f8e08a', oroD: '#6a4a16',
  rojo: '#9a2230', rojoS: '#681420', rojoD: '#440c14', rojoL: '#c4404a', piel: '#f0c8a0', pielS: '#c89870',
  niebla: '#b4b4b8', nieblaS: '#94969e', cielo: '#9eaabb', cieloL: '#c6ccd4', cieloS: '#7e8a9c',
  ladrC: '#6e4434', ladrCS: '#4e2e24', ladrCL: '#8a5a46', piedra: '#c8c0ae', piedraS: '#9a9282', piedraD: '#6e685c',
  adoq: '#5a5a62', adoqS: '#3e3e46', adoqL: '#7c7c86', charco: '#8a9aac', llama: '#ffd070', llamaL: '#fff4c0', llamaS: '#e88a30',
  noche: '#1a1420', nocheS: '#100c14', damasco: '#7a1a26', damascoL: '#8e2632', polvo: '#eef2f4', polvoS: '#c4ccd4',
}).map(([k, v]) => [k, hex(v)]));

// la trama ordenada 4 × 4 (0–1), para degradados y halos tramados
const D_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d_b4 = (x, y) => (D_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 el primero, f = 1 el segundo)
const d_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// un fondo fijo que se pinta una sola vez por lienzo en un búfer de R.nuevo() y se copia entero en cada fotograma
const D_CACHE = new WeakMap();

function d_fondo(R, clave, dibuja) {
  let m = D_CACHE.get(R); if (!m) D_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// una capa fija con huecos (lo que queda en VACIO no se copia): se pinta una vez y se copia en cada fotograma por encima
// de lo que haya (un recorrido de la pantalla); para poner un cielo con nubes animadas DETRÁS de los edificios
const D_VACIO = 0x01020304;

function d_capa(R, clave, dibuja) {
  let m = D_CACHE.get(R); if (!m) D_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(); b.fill(D_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  const b = m[clave], B = R.buf; for (let i = 0; i < b.length; i++) if (b[i] !== D_VACIO) B[i] = b[i];
}

// oscurece (f < 1) o aclara hacia col lo ya pintado en un rectángulo, tramado (a: proporción de píxeles)
function d_velo(R, x0, y0, x1, y1, col, f, a = 1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (a >= 1 || d_b4(x, y) < a) R.pset(x, y, d_mezcla(R.pget(x, y), col, f));
}

// suelo de tablas en perspectiva (fuga en vx), de y0 a y1: tablas de tonos distintos, la junta, las juntas de testa, la
// veta y alguna mancha; P = [base, sombra, luz, junta]
function d_tablas(R, y0, y1, P, k = 0, vx = 160) {
  const vy = y0 - 120;
  for (let y = y0; y <= y1; y++) { const z = (y - vy) / 120, d = 120 / (y - vy), dPrev = 120 / (y - 1 - vy);
    for (let x = 0; x < 320; x++) { const u = (x - vx) / z / 12 + 200, i = Math.floor(u), f = u - i, tono = h(i, 1, k);
      let c = tono < 0.3 ? P[1] : tono > 0.8 ? P[2] : P[0];
      if (f * 12 * z < 1) c = P[3];
      else { const seg = Math.floor(d * 7 + h(i, 2, k) * 5), segP = Math.floor(dPrev * 7 + h(i, 2, k) * 5); if (seg !== segP && y > y0) c = P[3];
        else if (h(Math.floor(u * 4), Math.floor(d * 60), k + 1) < 0.16) c = tono < 0.3 ? P[3] : P[1];
        else if (h(Math.floor(u * 3), Math.floor(d * 30), k + 2) < 0.05) c = P[2]; }
      R.pset(x, y, c); } }
}

// pared de cal vieja: el color con manchas grandes tramadas, desconchones con el ladrillo debajo y alguna grieta
function d_cal(R, x0, y0, x1, y1, k = 0) {
  const { pset } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const n = h(x >> 3, y >> 3, k) * 0.5 + h(x >> 4, y >> 4, k + 1) * 0.5 + (y - y0) / (y1 - y0) * 0.3, b = d_b4(x, y);
    pset(x, y, n > 0.95 + b * 0.2 ? DC.calD : n > 0.62 + b * 0.25 ? DC.calS : n < 0.18 + b * 0.1 ? DC.calL : DC.cal);
  }
  // los desconchones: un óvalo con el canto de cal en sombra y el ladrillo con sus juntas
  for (let j = 0; j < 7; j++) { const cx = x0 + 8 + Math.round(h(j, 1, k + 5) * (x1 - x0 - 16)), cy = y0 + 6 + Math.round(h(j, 2, k + 5) * (y1 - y0 - 12)), rx = 5 + Math.round(h(j, 3, k + 5) * 7), ry = 3 + Math.round(h(j, 4, k + 5) * 4);
    for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) { if (x < x0 || x > x1 || y < y0 || y > y1) continue; const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x, y, k + 6) - 0.5) * 0.4;
      if (e < 1) { const fila = Math.floor(y / 4), col = Math.floor((x + (fila & 1) * 4) / 8); pset(x, y, y % 4 === 0 || (x + (fila & 1) * 4) % 8 === 0 ? DC.calD : h(col, fila, k + 7) < 0.4 ? DC.ladrS : DC.ladr); }
      else if (e < 1.5 && y > cy) pset(x, y, DC.calD); else if (e < 1.5) pset(x, y, DC.calL); } }
  for (let j = 0; j < 4; j++) { let x = x0 + Math.round(h(j, 8, k) * (x1 - x0)), y = y0 + Math.round(h(j, 9, k) * (y1 - y0) * 0.5); for (let s = 0; s < 14; s++) { pset(x, y, DC.calD); y++; x += h(j, s, k + 9) < 0.35 ? -1 : h(j, s, k + 9) > 0.7 ? 1 : 0; if (y > y1) break; } }
}

// tablón de roble visto de frente, con la veta, el canto de luz arriba y la sombra abajo
function d_roble(R, x0, y0, x1, y1, k = 0, vertical = false) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, DC.roble);
  if (vertical) { for (let x = x0 + 1; x < x1; x++) for (let y = y0; y <= y1; y++) if (h(x, y >> 2, k) < 0.14) pset(x, y, DC.robleS); rect(x0, y0, x0, y1, DC.robleL); rect(x1, y0, x1, y1, DC.robleD); if (x1 - x0 > 4) rect(x1 - 1, y0, x1 - 1, y1, DC.robleS); }
  else { for (let y = y0 + 1; y < y1; y++) for (let x = x0; x <= x1; x++) if (h(x >> 2, y, k) < 0.14) pset(x, y, DC.robleS); rect(x0, y0, x1, y0, DC.robleL); rect(x0, y1, x1, y1, DC.robleD); }
}

// una figurita de fondo (6–18 px) de la Regencia: la cabeza, el sombrero (0 nada, 1 chistera, 2 cofia/capota), el
// cuerpo con levita o vestido de talle alto y las piernas que andan (paso: 0–1 del ciclo; dir: hacia dónde mira)
function d_figura(R, x, suelo, alto, ropa, t, o = {}) {
  const { rect, pset, disco } = R, s = alto / 16, piel = o.piel ?? DC.piel, cab = Math.max(1.5, 2.2 * s), yc = suelo - alto + cab + (o.sombrero === 1 ? 2 * s : 0);
  const paso = o.anda ? Math.sin(t * 9 + x * 0.3) : 0, pie = Math.round(paso * 1.5 * s);
  if (o.vestido) { for (let y = Math.round(yc + cab + 1); y <= suelo - 1; y++) { const w = Math.round(1.5 * s + (y - yc) * 0.28); rect(Math.round(x - w), y, Math.round(x + w), y, y < yc + cab + 3 * s ? ropa[1] : ropa[0]); } rect(Math.round(x - 1 + pie), suelo, Math.round(x + pie), suelo, DC.k); }
  else { const yh = Math.round(suelo - alto * 0.38); rect(Math.round(x - 2 * s), Math.round(yc + cab), Math.round(x + 2 * s), yh, ropa[0]); rect(Math.round(x + 1 * s), Math.round(yc + cab), Math.round(x + 2 * s), yh, ropa[1]);
    for (const [dx, sg] of [[-1, 1], [1, -1]]) { const px = Math.round(x + dx * s * 0.9 + sg * pie * 0.5); rect(px - (s > 1 ? 1 : 0), yh, px, suelo, o.calzas ?? DC.tinta); } }
  disco(x, yc, cab, piel); pset(Math.round(x + (o.dir ?? 1) * cab * 0.6), Math.round(yc), DC.k);
  if (o.sombrero === 1) { rect(Math.round(x - cab), Math.round(yc - cab - 3 * s), Math.round(x + cab), Math.round(yc - cab), DC.k); rect(Math.round(x - cab - s), Math.round(yc - cab), Math.round(x + cab + s), Math.round(yc - cab), DC.k); }
  else if (o.sombrero === 2) { disco(x - (o.dir ?? 1) * 0.6, yc - cab * 0.4, cab + 0.6, ropa[2] ?? DC.papel); pset(Math.round(x + (o.dir ?? 1) * cab), Math.round(yc), piel); }
  else rect(Math.round(x - cab), Math.round(yc - cab), Math.round(x + cab), Math.round(yc - cab * 0.4), o.pelo ?? DC.robleD);
}

// IMPRENTA · general
function d_imprenta(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  d_fondo(R, 'imprenta', () => {
    // el techo de tablas en penumbra, bajo la barra del año: una franja TRANQUILA (tablas y veta de muy poco contraste,
    // más oscura arriba, sin vigas que corten); la viga maestra va más abajo (y 20–24), ya fuera de las cifras del año
    const T0 = DC.vigaS, T1 = d_mezcla(DC.vigaS, DC.viga, 0.3), T2 = d_mezcla(DC.vigaS, DC.k, 0.25);
    for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) { const tb = (x + (y >> 3) * 0) % 22, veta = h(x >> 3, y, 39) < 0.12;
      pset(x, y, tb === 0 ? T2 : d_b4(x, y) < 0.22 - y * 0.008 ? T2 : veta || d_b4(x, y) > 0.9 - y * 0.02 ? T1 : T0); }
    d_roble(R, 0, 20, 319, 24, 38); rect(0, 20, 319, 20, d_mezcla(DC.viga, DC.robleL, 0.25)); rect(0, 25, 319, 25, DC.k);
    for (let x = 30; x < 320; x += 64) { rect(x, 21, x + 2, 23, DC.hierroS); pset(x + 1, 21, DC.hierroL); }   // los clavos de forja de la viga
    // la pared de cal y el zócalo de tablas con su moldura
    d_cal(R, 0, 26, 319, 101, 41);
    for (let x = 0; x < 320; x++) for (let y = 26; y < 34; y++) if (d_b4(x, y) < 0.4 - (y - 26) * 0.05) pset(x, y, d_mezcla(R.pget(x, y), DC.k, 0.25));   // la sombra de la viga en la cal
    rect(0, 102, 319, 116, DC.tablaS); for (let x = 0; x < 320; x += 20) { rect(x + 2, 104, x + 17, 114, DC.tabla); rect(x + 2, 104, x + 17, 104, DC.tablaL); rect(x + 17, 104, x + 17, 114, DC.tablaD); }
    rect(0, 101, 319, 102, DC.robleL); rect(0, 103, 319, 103, DC.robleD); rect(0, 116, 319, 117, DC.tablaD);
    // el suelo de tablas con manchas de tinta y recortes de papel
    d_tablas(R, 118, 179, [DC.tabla, DC.tablaS, DC.tablaL, DC.tablaD], 42, 150);
    for (let j = 0; j < 9; j++) { const x = Math.round(h(j, 1, 43) * 300) + 10, y = 124 + Math.round(h(j, 2, 43) * 50), r = 1 + Math.round(h(j, 3, 43) * 3); for (let yy = -r; yy <= r; yy++) for (let xx = -r * 2; xx <= r * 2; xx++) if ((xx / 2) ** 2 + yy * yy <= r * r && h(x + xx, y + yy, 44) < 0.85) pset(x + xx, y + yy, DC.tinta); }
    for (let j = 0; j < 8; j++) { const x = 20 + Math.round(h(j, 5, 43) * 280), y = 128 + Math.round(h(j, 6, 43) * 46); poligono([[x, y], [x + 5, y - 1], [x + 6, y + 2], [x + 1, y + 3]], DC.papel); pset(x + 2, y + 1, DC.papelD); linea(x + 1, y + 3, x + 6, y + 2, DC.papelS); }
    // la librería de pared, a la derecha: baldas con lomos de colores
    rect(300, 46, 319, 116, DC.robleD); rect(301, 48, 319, 114, DC.vigaS);
    const LOMOS = ['#7a2a2a', '#2a4a6a', '#5a4a2a', '#2e5a3a', '#6a3a5a', '#8a6a3a', '#3a3a4a'].map(hex);
    for (let b = 0; b < 4; b++) { const yb = 64 + b * 15; rect(300, yb, 319, yb + 2, DC.roble); rect(300, yb, 319, yb, DC.robleL); for (let x = 302, i = 0; x < 319; i++) { const w = 2 + (h(i, b, 45) < 0.4 ? 1 : 0), al = 9 + Math.round(h(i, b, 46) * 3), c = LOMOS[Math.floor(h(i, b, 47) * 7)]; rect(x, yb - al, x + w - 1, yb - 1, c); pset(x, yb - al + 2, DC.oro); pset(x, yb - 3, DC.oro); rect(x + w - 1, yb - al, x + w - 1, yb - 1, d_mezcla(c, DC.k, 0.4)); x += w + (h(i, b, 48) < 0.15 ? 2 : 0); } }
    rect(300, 46, 319, 48, DC.roble); rect(300, 46, 319, 46, DC.robleL); rect(300, 46, 301, 116, DC.roble);
    for (let j = 0; j < 3; j++) { rect(303 + j * 5, 101 - j * 2, 306 + j * 5, 108, j === 1 ? DC.papelS : DC.papel); rect(303 + j * 5, 101 - j * 2, 306 + j * 5, 101 - j * 2, DC.papelD); }   // rollos de pliegos en la balda baja
    // EL ESCAPARATE: el marco de madera pintada con su moldura (el cristal y la calle van con t)
    rect(212, 42, 302, 112, DC.verdeS); rect(214, 44, 300, 110, DC.verde); rect(214, 44, 300, 44, DC.verdeL); rect(212, 42, 302, 42, DC.verdeL);
    rect(208, 38, 306, 42, DC.roble); rect(208, 38, 306, 38, DC.robleL); rect(208, 42, 306, 42, DC.robleD);
    // los chibaletes: el bastidor inclinado con las cajas de tipos (cajitas con tipos de plomo) y el componedor
    rect(144, 62, 208, 101, DC.robleD);
    for (let c = 0; c < 2; c++) { const y0 = 64 + c * 19; rect(146, y0, 206, y0 + 15, DC.roble); rect(146, y0, 206, y0, DC.robleL);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) { const x = 148 + i * 5, y = y0 + 2 + j * 4, w = c === 1 && j === 2 && i % 3 === 0 ? 9 : 3; if (x + w > 205) continue; rect(x, y, x + w, y + 2, DC.robleS); for (let q = 0; q < 3; q++) pset(x + 1 + (q % 2), y + 1 + (q >> 1), h(i, j * 9 + c + q, 49) < 0.5 ? DC.hierro : DC.hierroL); } }
    rect(150, 98, 154, 115, DC.robleS); rect(198, 98, 202, 115, DC.robleS); rect(146, 98, 206, 100, DC.roble);
    rect(160, 58, 176, 61, DC.hierro); rect(160, 58, 176, 58, DC.hierroL); rect(176, 56, 177, 61, DC.hierro);   // el componedor en la balda
    rect(180, 55, 196, 61, DC.papel); for (let y = 56; y < 61; y += 2) linea(181, y, 194, y, DC.papelD);   // pruebas en la balda
    // el reloj de pared sobre los chibaletes (la caja; el péndulo y las agujas con t)
    rect(171, 28, 187, 54, DC.robleD); rect(172, 29, 186, 53, DC.roble); rect(172, 29, 186, 29, DC.robleL); rect(174, 42, 184, 52, DC.vigaS);
    disco(179, 34, 6, DC.oroS); disco(179, 34, 5, DC.papel); for (let a = 0; a < 12; a++) pset(Math.round(179 + Math.cos(a * Math.PI / 6) * 4), Math.round(34 + Math.sin(a * Math.PI / 6) * 4), DC.tinta);
    // el estante del fondo con resmas de papel y los botes de tinta, y la piedra de imponer
    rect(120, 52, 140, 54, DC.roble); rect(120, 52, 140, 52, DC.robleL); for (let j = 0; j < 3; j++) { rect(121 + j * 6, 44 - j, 125 + j * 6, 51, j === 1 ? DC.hierroS : DC.tinta); rect(121 + j * 6, 44 - j, 125 + j * 6, 44 - j, DC.hierroL); }
    for (let j = 0; j < 4; j++) { rect(4 + j * 2, 94 - j * 4, 30 - j, 98 - j * 4, j % 2 ? DC.papelS : DC.papel); linea(4 + j * 2, 98 - j * 4, 30 - j, 98 - j * 4, DC.papelD); }
    // la mesita del entintado (al fondo, junto a la prensa): la losa con la tinta extendida
    rect(118, 98, 140, 101, DC.roble); rect(118, 98, 140, 98, DC.robleL); rect(120, 99, 138, 100, DC.hierroS); for (let x = 122; x < 137; x += 3) pset(x, 99, DC.hierroL); rect(120, 102, 122, 116, DC.robleS); rect(136, 102, 138, 116, DC.robleS);
    // LA PRENSA DE MADERA
    d_prensa(R);
    // el haz de luz del escaparate, en el suelo, tramado
    for (let y = 118; y < 180; y++) { const d = (y - 118) * 1.1; for (let x = Math.round(210 - d); x <= Math.round(300 - d * 0.55); x++) if (((x + y) & 1) === 0 && x >= 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff2cc'), 0.22)); }
    // una cesta de recortes en el suelo, en la esquina
    rect(4, 150, 24, 166, DC.robleS); for (let y = 151; y < 166; y += 3) linea(5, y, 23, y, DC.roble); for (let x = 6; x < 24; x += 4) linea(x, 151, x, 165, DC.robleD); rect(3, 148, 25, 150, DC.roble); poligono([[7, 148], [12, 142], [16, 146], [22, 143], [21, 148]], DC.papel); linea(8, 147, 20, 146, DC.papelD);
  });
  // la calle de enfrente por el escaparate (recortada a los cristales)
  d_calleVentana(R, t, 216, 46, 298, 96);
  // los parteluces y la peana del escaparate con los juegos de tres tomos
  for (let x = 216; x <= 298; x += 14) rect(x, 46, x + 1, 96, DC.verdeS); for (const y of [61, 78]) rect(216, y, 298, y + 1, DC.verdeS);
  rect(214, 96, 300, 108, DC.verdeS); rect(214, 96, 300, 96, DC.verdeL);
  const TOMOS = [['#7a2a2a', '#5a1a1a'], ['#2a4a6a', '#1a3050'], ['#4a5a2a', '#2e3a18'], ['#6a4a2a', '#4a3018']].map(([a, b]) => [hex(a), hex(b)]);
  for (let g = 0; g < 4; g++) { const x0 = 220 + g * 20; for (let i = 0; i < 3; i++) d_tomito(R, x0 + i * 5, 95, TOMOS[g], { w: 4, al: 9 }); }
  // el gorrión en el alféizar de fuera, que picotea y a ratos se va
  { const ciclo = t % 14; if (ciclo < 10) { const x = 262 + Math.round(Math.sin(t * 0.5) * 2), pico = Math.sin(t * 7) > 0.6 ? 1 : 0; R.recorte([216, 46, 298, 96]); disco(x, 92, 2, hex('#7a5a3a')); disco(x + 2, 90 + pico, 1, hex('#6a4a2a')); pset(x + 3, 90 + pico, DC.oro); pset(x - 3, 91, hex('#4a3220')); R.recorte(null); } }
  // el péndulo del reloj y sus agujas
  { const a = Math.sin(t * 3.2) * 0.35, px = Math.round(179 + Math.sin(a) * 8), py = Math.round(42 + Math.cos(a) * 8); linea(179, 42, px, py, DC.oroS); disco(px, py, 1, DC.oro); linea(179, 34, 179 + Math.round(Math.cos(t * 0.05 - 1.6) * 3), 34 + Math.round(Math.sin(t * 0.05 - 1.6) * 3), DC.tinta); linea(179, 34, 181, 36, DC.tinta); }
  // los pliegos colgados en dos cuerdas, que se mecen
  for (const [xa, ya, xb, yb, n, k] of [[2, 24, 132, 27, 7, 0], [118, 22, 206, 25, 5, 1]]) {
    const cuerda = (x) => ya + (yb - ya) * (x - xa) / (xb - xa) + Math.sin((x - xa) / (xb - xa) * Math.PI) * 3;
    for (let x = xa; x <= xb; x++) pset(x, Math.round(cuerda(x)), DC.robleD);
    for (let i = 0; i < n; i++) { const x = xa + 6 + i * Math.round((xb - xa - 12) / n), y = Math.round(cuerda(x)), sw = Math.round(Math.sin(t * 1.3 + i * 1.7 + k) * 1.5), al = 12 + (i % 2);
      poligono([[x, y], [x + 11, y], [x + 11 + sw, y + al], [x + sw, y + al]], i % 3 === 2 ? DC.papelS : DC.papel); linea(x + 11, y, x + 11 + sw, y + al, DC.papelD); linea(x + sw, y + al, x + 11 + sw, y + al, DC.papelD);
      for (let r = 3; r < al - 1; r += 2) linea(x + 2 + Math.round(sw * r / al), y + r, x + 8 + Math.round(sw * r / al) - (r % 4 ? 2 : 0), y + r, DC.papelD); rect(x + 2 + Math.round(sw * 0.15), y + 1, x + 9, y + 1, DC.tinta);
      rect(x + 1, y - 1, x + 2, y + 1, DC.robleS); rect(x + 9, y - 1, x + 10, y + 1, DC.robleS); } }
  // EL APRENDIZ que entinta: frota los dos tampones uno contra otro
  { const x = 128, fr = Math.sin(t * 5), cy = 92; d_figura(R, x, 116, 22, [hex('#e8e2d0'), hex('#b8b0a0')], t, { pelo: hex('#c87a3a'), dir: -1, calzas: hex('#4a3a2a') });
    rect(x - 4, 99, x + 4, 108, hex('#4a3a2e')); rect(x - 4, 99, x + 4, 99, hex('#6a5444'));   // el mandil
    for (const [dx, d] of [[-5, 1], [5, -1]]) { const tx = x + dx + Math.round(fr * d * 1.5), ty = cy + Math.round(Math.cos(t * 5) * d); rect(tx, ty + 2, tx, ty + 7, DC.robleS); disco(tx, ty, 3, DC.k); disco(tx, ty, 2, hex('#5a3a2a')); rect(tx - 2, ty + 2, tx + 2, ty + 2, DC.tinta); pset(tx - 1, ty - 1, hex('#8a6a4a')); }
    rect(118, 98, 140, 101, DC.roble); rect(118, 98, 140, 98, DC.robleL); rect(120, 99, 138, 100, DC.hierroS); for (let xx = 122; xx < 137; xx += 3) pset(xx + (Math.floor(t * 2) % 2), 99, DC.hierroL); }
  // motas de polvo en el haz de luz
  for (let k = 0; k < 16; k++) { const u = (h(k, 1, 50) + t * 0.02 * (1 + k % 3)) % 1, x = Math.round(200 - u * 60 + h(k, 2, 50) * 70 + Math.sin(t * 0.6 + k) * 3), y = Math.round(60 + h(k, 3, 50) * 100 - u * 10); if (Math.sin(t * 1.3 + k * 2.3) > -0.3) pset(x, y, hex('#fff6dc')); }
  return { suelo: 150, libre: [40, 300], mostrador: [136, 134, 214], tomos: [[148, 133], [160, 133], [172, 133]], palanca: [116, 74] };
}
// la prensa de madera (fija; va en el búfer del fondo)
function d_prensa(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la sombra en el suelo
  for (let y = 144; y < 156; y++) for (let x = 8; x < 130; x++) if (((x + y) & 1) === 0 && Math.abs(y - 150) * 9 < 130 - Math.abs(x - 66)) pset(x, y, d_mezcla(R.pget(x, y), DC.k, 0.35));
  // las patas y el pie de la prensa
  d_roble(R, 18, 140, 112, 147, 60); rect(18, 148, 112, 149, DC.robleD);
  // las dos piernas (de arriba abajo) y el sombrero
  d_roble(R, 30, 36, 39, 146, 61, true); d_roble(R, 86, 36, 95, 146, 62, true);
  d_roble(R, 24, 30, 101, 37, 63); rect(22, 28, 103, 30, DC.robleD); rect(22, 28, 103, 28, DC.robleL);
  // la cabeza (el travesaño grueso) con sus pernos
  d_roble(R, 34, 54, 91, 63, 64); for (const x of [36, 89]) { disco(x, 58, 1, DC.hierroS); pset(x, 57, DC.hierroL); }
  // el husillo de hierro con la caja, y la platina
  rect(60, 63, 65, 82, DC.hierroS); rect(61, 63, 62, 82, DC.hierroL); for (let y = 64; y < 82; y += 3) linea(60, y, 65, y + 1, DC.hierro);
  rect(52, 72, 73, 78, DC.robleS); rect(52, 72, 73, 72, DC.robleL); rect(46, 84, 79, 89, DC.hierro); rect(46, 84, 79, 84, DC.hierroL); rect(46, 89, 79, 89, DC.hierroS);
  // la palanca: del husillo, en diagonal hacia la derecha, con el puño de madera torneada
  for (let i = 0; i <= 44; i++) { const x = 66 + i, y = Math.round(78 - i * 0.12); rect(x, y, x, y + 1, i > 32 ? DC.roble : DC.hierro); pset(x, y, i > 32 ? DC.robleL : DC.hierroL); }
  disco(113, 73, 2, DC.roble); pset(112, 72, DC.robleL); disco(117, 73, 2, DC.robleS);
  // el carro (la mesa larga que entra y sale) sobre los raíles, con la forma de tipos y el tímpano abierto
  rect(8, 100, 124, 106, DC.robleD); d_roble(R, 10, 98, 122, 104, 65); rect(10, 105, 122, 107, DC.robleS);
  rect(46, 92, 79, 98, DC.hierroS); for (let x = 48; x < 78; x += 2) for (let y = 93; y < 97; y++) pset(x + (y & 1), y, (x + y) % 3 ? DC.tinta : DC.hierro);   // la forma de tipos entintada
  // el tímpano y la frasqueta abiertos hacia la izquierda, con el pliego blanco
  poligono([[12, 98], [42, 98], [32, 74], [6, 78]], DC.robleS); poligono([[14, 96], [40, 96], [31, 76], [9, 79]], DC.papel);
  for (let j = 0; j < 6; j++) linea(16 + Math.round(j * 0.6), 82 + j * 2, 34 - Math.round(j * 0.4), 81 + j * 2, DC.papelD);
  linea(12, 98, 6, 78, DC.robleD); linea(42, 98, 32, 74, DC.robleD); linea(6, 78, 32, 74, DC.robleL);
  // la manivela del carro (el rodillo y su manubrio), por delante de la pierna derecha
  disco(104, 112, 4, DC.robleD); disco(104, 112, 3, DC.roble); pset(103, 111, DC.robleL); for (let a = 0; a < 4; a++) pset(Math.round(104 + Math.cos(a * 1.57 + 0.4) * 3), Math.round(112 + Math.sin(a * 1.57 + 0.4) * 3), DC.robleS);
  rect(104, 112, 114, 113, DC.hierro); rect(113, 108, 115, 116, DC.robleS);
  // el bote de tinta y los dos tampones de cuero apoyados en la pierna
  rect(2, 120, 14, 132, DC.k); rect(3, 121, 13, 131, DC.hierroS); rect(3, 121, 13, 122, DC.tinta); pset(5, 123, DC.hierroL);
  for (const [x, y] of [[44, 126], [54, 128]]) { rect(x, y, x + 1, y + 10, DC.robleS); disco(x, y - 2, 4, DC.k); disco(x, y - 2, 3, hex('#5a3a2a')); rect(x - 3, y, x + 3, y, DC.tinta); pset(x - 1, y - 4, hex('#8a6a4a')); }
}

// un tomito de pie visto de lomo: la tapa, los nervios dorados del lomo y la etiqueta sin letras (base: y de abajo)
export function d_tomito(R, x, base, [c, cS], o = {}) {
  const w = o.w ?? 6, al = o.al ?? 11, { rect, pset } = R;
  if (o.tumbado) { rect(x, base - w, x + al, base, DC.k); rect(x + 1, base - w + 1, x + al - 1, base - 1, c); rect(x + 1, base - 1, x + al - 1, base - 1, cS); for (const dx of [2, al - 2]) rect(x + dx, base - w + 1, x + dx, base - 1, DC.oro); rect(x + Math.round(al / 2) - 1, base - w + 2, x + Math.round(al / 2) + 1, base - 2, DC.papelS); return; }
  rect(x, base - al, x + w, base, DC.k); rect(x + 1, base - al + 1, x + w - 1, base - 1, c); rect(x + w - 1, base - al + 1, x + w - 1, base - 1, cS); pset(x + 1, base - al + 1, d_mezcla(c, DC.blanco ?? hex('#ffffff'), 0.35));
  for (const dy of [2, al - 2]) rect(x + 1, base - dy, x + w - 1, base - dy, DC.oro);
  if (al > 8) { const ey = base - Math.round(al * 0.62); rect(x + 1, ey, x + w - 1, ey + 2, DC.papelS); pset(x + 1, ey + 1, DC.papelD); }
}

// la calle de enfrente vista por un hueco (x0, y0)–(x1, y1): la niebla, las casas de ladrillo de enfrente con sus
// ventanas, la acera, y paseantes que pasan; todo recortado al hueco
function d_calleVentana(R, t, x0, y0, x1, y1) {
  const { pset } = R; R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c;
    if (y < y0 + 8) c = d_b4(x, y) < 0.5 ? DC.cieloL : DC.niebla;
    else if (y < y1 - 10) { const fy = (y - y0 - 8) % 12, fx = (x + 3) % 16; c = fx > 4 && fx < 11 && fy > 2 && fy < 9 ? (fy === 3 ? DC.ladrCS : h(x >> 4, (y - y0) / 12 | 0, 51) < 0.3 ? hex('#e8c878') : DC.nieblaS) : (y & 3) === 0 || ((x + ((y >> 2) & 1) * 3) % 6) === 0 ? DC.ladrCS : DC.ladrC; c = d_mezcla(c, DC.niebla, 0.45); }
    else c = y < y1 - 6 ? d_mezcla(DC.piedraS, DC.niebla, 0.3) : d_mezcla(DC.adoq, DC.niebla, 0.25);
    pset(x, y, c); }
  // jirones de niebla que pasan
  for (let k = 0; k < 4; k++) { const cx = x0 + ((k * 37 + t * 3) % (x1 - x0 + 40)) - 20, cy = y0 + 18 + k * 9; for (let y = cy - 3; y <= cy + 3; y++) for (let x = Math.round(cx - 14); x <= cx + 14; x++) if (d_b4(x, y) < 0.35 - Math.abs(y - cy) * 0.08 - Math.abs(x - cx) * 0.015) pset(x, y, DC.cieloL); }
  // los paseantes de la acera de enfrente
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, u = (t * (6 + k * 3) + k * 61) % (x1 - x0 + 30), x = Math.round(d > 0 ? x0 - 12 + u : x1 + 12 - u);
    d_figura(R, x, y1 - 7, 14 + (k % 2) * 2, k === 1 ? [hex('#6a4a5a'), hex('#4a3040'), hex('#e8e0d0')] : [hex('#2a2a36'), hex('#1a1a24')], t, { anda: true, dir: d, sombrero: k === 1 ? 2 : 1, vestido: k === 1 }); }
  R.recorte(null);
}

// el mostrador de la librería (por delante de los personajes) y, con o.tomos, los tres tomitos encima
function d_mostrador(R, t, o) {
  const { rect, pset, linea } = R;
  // la sombra que deja en el suelo
  for (let y = 152; y < 158; y++) for (let x = 138; x < 220; x++) if (((x + y) & 1) === 0) pset(x, y, d_mezcla(R.pget(x, y), DC.k, 0.3));
  d_roble(R, 138, 138, 212, 152, 70); for (let x = 140; x < 212; x += 18) { rect(x + 2, 141, x + 15, 150, DC.robleS); rect(x + 3, 142, x + 15, 150, DC.roble); rect(x + 3, 142, x + 15, 142, DC.robleD); rect(x + 15, 142, x + 15, 150, DC.robleL); }
  rect(136, 134, 214, 137, DC.robleL); rect(136, 134, 214, 134, hex('#d4a46a')); rect(136, 138, 214, 138, DC.robleD); rect(138, 152, 212, 153, DC.robleD);
  // encima: un tintero con su pluma, papeles de cuentas y el cascabel de la puerta… y los tomitos
  rect(200, 128, 206, 133, DC.k); rect(201, 129, 205, 133, DC.hierroS); pset(202, 130, DC.hierroL); linea(204, 128, 209, 119, DC.papel); linea(205, 128, 210, 120, DC.papelS);
  rect(182, 131, 194, 133, DC.papel); linea(183, 132, 192, 132, DC.papelD); rect(184, 129, 193, 131, DC.papelS);
  const tomos = [[148, 133], [160, 133], [172, 133]];
  if (o.tomos) { for (const [x, y] of tomos) { for (let xx = x - 5; xx <= x + 6; xx++) pset(xx, y, d_mezcla(R.pget(xx, y), DC.k, 0.35)); d_tomito(R, x - 5, y - 1, [hex('#7a3a2a'), hex('#5a2618')], { w: 9, al: 11 }); }
    if (Math.sin(t * 2) > 0.7) pset(150 + Math.floor(t * 3) % 24, 124, hex('#fff4c0')); }
  return { tomos };
}

// ESCAPARATE · la librería desde la calle
function d_calleLibreria(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // el cielo nublado de Londres, tramado (en su búfer), y por delante lo que se mueve en él
  d_fondo(R, 'libreriaCielo', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = y / 60 + (h(x >> 3, y >> 2, 80) - 0.5) * 0.2 + Math.sin(x * 0.03 + y * 0.21) * 0.06;
    let c = v < 0.3 + d_b4(x, y) * 0.2 ? DC.cieloS : v < 0.7 + d_b4(x, y) * 0.2 ? DC.cielo : DC.cieloL;
    // jirones altos de nube, alargados y de poco contraste (la parte de arriba queda tranquila, pero no lisa)
    const j = Math.sin(x * 0.045 + Math.sin(y * 0.3) * 1.5 + y * 0.6) + (h(x >> 4, y >> 1, 79) - 0.5) * 0.3; if (y < 44 && j > (x > 172 ? 0.55 : 0.8) && d_b4(x, y) < 0.5) c = d_mezcla(c, DC.cieloL, x > 172 && y < 20 ? 0.3 : 0.4);
    pset(x, y, c); } });
  // el humo de las chimeneas, que se va con el viento
  for (const [cx, cy] of [[4, 12], [14, 12], [255, 30], [265, 30]]) for (let i = 0; i < 4; i++) { const u = (t * 0.25 + i / 4 + cx * 0.01) % 1, x = Math.round(cx + u * 22 + Math.sin(t + i) * 1.5), y = Math.round(cy - u * 12), r = 1.5 + u * 3.5; if ((x > 274 && y < 46) || (x > 14 && x < 174 && y < 24)) continue; for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) if (Math.hypot(xx - x, yy - y) < r && d_b4(xx, yy) < 0.8 - u * 0.7) pset(xx, yy, u < 0.4 ? DC.nieblaS : DC.niebla); }
  // las nubes de tres tonos a tres velocidades (lejos de la barra del año y de la esquina de Atom)
  for (let k = 0; k < 6; k++) { const v = [1.2, 2.2, 3.4][k % 3], w = 18 + (k % 3) * 7, x = ((h(k, 1, 88) * 400 + t * v) % 420) - 50, y = 24 + (k % 3) * 8; if (x > 262 - w * 0.6 && y < 50) continue; d_nubeD(R, x, y, w); }
  // pájaros que cruzan
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (9 + k * 2) + k * 90) % 360) - 20), y = Math.round(26 + k * 6 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k) > 0 ? -1 : 0; if (x > 270 && y < 46) continue; pset(x - 1, y + a, DC.tinta); pset(x, y, DC.tinta); pset(x + 1, y + a, DC.tinta); }
  d_capa(R, 'libreriaCalle', () => {
    // las casas vecinas, con sus chimeneas (fuera de la esquina de Atom)
    const casa = (x0, x1, top, cl, k) => { for (let y = top; y < 150; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor(y / 3); pset(x, y, y % 3 === 0 || (x + (fila & 1) * 3) % 6 === 0 ? d_mezcla(DC.ladrCS, cl, 0.15) : h(x / 6 | 0, fila, k) < 0.2 ? DC.ladrCL : cl); }
      rect(x0, top - 3, x1, top, DC.piedraS); rect(x0, top - 3, x1, top - 3, DC.piedra);
      for (let wx = x0 + 6; wx + 12 < x1; wx += 22) for (let wy = top + 8; wy < 100; wy += 26) { rect(wx - 1, wy - 1, wx + 13, wy + 19, DC.piedra); rect(wx, wy, wx + 12, wy + 18, DC.tinta); for (let yy = wy + 1; yy < wy + 18; yy++) for (let xx = wx + 1; xx < wx + 12; xx++) if (h(xx, yy, k + 1) < 0.08 + (yy - wy) * 0.01) pset(xx, yy, DC.nieblaS); rect(wx, wy + 9, wx + 12, wy + 9, DC.papel); rect(wx + 6, wy, wx + 6, wy + 18, DC.papel); rect(wx, wy, wx + 12, wy, DC.papel); rect(wx - 2, wy + 19, wx + 14, wy + 20, DC.piedraS); } };
    casa(0, 38, 30, DC.ladrC, 81); casa(232, 319, 50, d_mezcla(DC.ladrC, DC.piedraS, 0.3), 82);
    for (const [x, y] of [[2, 18], [252, 36]]) { rect(x, y, x + 14, 30, DC.ladrCS); rect(x - 1, y - 2, x + 15, y, DC.piedraS); for (let i = 0; i < 3; i++) { rect(x + 1 + i * 5, y - 6, x + 3 + i * 5, y - 2, hex('#a8603e')); pset(x + 1 + i * 5, y - 6, hex('#c8805a')); } }
    // la casa de la librería: ladrillo hollín, tres pisos
    for (let y = 25; y < 150; y++) for (let x = 40; x <= 230; x++) { const fila = Math.floor(y / 3), b = (x + (fila & 1) * 4) % 8; pset(x, y, y % 3 === 0 || b === 0 ? DC.ladrCS : h(x >> 3, fila, 83) < 0.18 ? DC.ladrCL : h(x >> 3, fila, 84) < 0.12 ? d_mezcla(DC.ladrC, DC.k, 0.25) : DC.ladrC); }
    // manchas de hollín que bajan de las ventanas
    for (let x = 40; x <= 230; x++) for (let y = 25; y < 82; y++) if (h(x >> 1, 0, 85) < 0.3 && d_b4(x, y) < 0.18 * (1 - (y - 25) / 57)) pset(x, y, d_mezcla(R.pget(x, y), DC.k, 0.3));
    // la cornisa de piedra con sus dentellones (baja: deja despejada la franja de las cifras del año, y < 21)
    rect(36, 21, 234, 25, DC.piedra); rect(36, 21, 234, 21, DC.piedraS); rect(36, 22, 234, 22, DC.papel); rect(36, 25, 234, 26, DC.piedraD); for (let x = 37; x < 234; x += 4) { rect(x, 24, x + 1, 25, DC.piedraS); pset(x, 24, DC.piedraD); }
    for (let x = 36; x <= 234; x++) if (h(x >> 2, 3, 86) < 0.25) pset(x, 23, d_mezcla(DC.piedra, DC.k, 0.25));   // el hollín de la piedra
    // las ventanas de guillotina de los pisos de arriba, con dinteles de piedra y visillos
    for (const wy of [31, 58]) for (const wx of [56, 100, 144, 188]) { rect(wx - 3, wy - 4, wx + 23, wy - 1, DC.piedra); rect(wx - 3, wy - 4, wx + 23, wy - 4, DC.papel); for (let i = 0; i < 26; i += 4) pset(wx - 2 + i, wy - 2, DC.piedraS); rect(wx + 8, wy - 4, wx + 12, wy - 1, DC.papelS); pset(wx + 10, wy - 3, DC.piedraS);
      rect(wx - 1, wy, wx + 21, wy + 20, DC.papel); rect(wx, wy + 1, wx + 20, wy + 19, DC.tinta); for (let yy = wy + 2; yy < wy + 19; yy++) for (let xx = wx + 1; xx < wx + 20; xx++) if (d_b4(xx, yy) < 0.3 - (yy - wy) * 0.01) pset(xx, yy, hex('#4a5a6e'));
      for (let yy = wy + 2; yy < wy + 18; yy += 2) { pset(wx + 2, yy, DC.papelS); pset(wx + 18, yy, DC.papelS); } rect(wx, wy + 10, wx + 20, wy + 10, DC.papel); rect(wx + 6, wy, wx + 6, wy + 20, DC.papel); rect(wx + 14, wy, wx + 14, wy + 20, DC.papel); rect(wx - 2, wy + 20, wx + 22, wy + 22, DC.piedra); rect(wx - 2, wy + 22, wx + 22, wy + 22, DC.piedraD);
      for (let i = 0; i < 4; i++) pset(wx + 3 + i * 5, wy + 23 + (i & 1), d_mezcla(DC.ladrC, DC.k, 0.3)); }
    // el rótulo de tabla verde con su moldura dorada y un libro abierto pintado en oro
    rect(44, 82, 226, 90, DC.verdeS); rect(46, 83, 224, 89, DC.verde); rect(44, 82, 226, 82, DC.oroS); rect(44, 90, 226, 91, DC.oroD); for (let x = 60; x < 214; x += 10) if (x < 120 || x > 150) rect(x, 85, x + 6, 86, d_mezcla(DC.verde, DC.oro, 0.35));
    poligono([[124, 84], [134, 86], [134, 89], [124, 87]], DC.oro); poligono([[134, 86], [144, 84], [144, 87], [134, 89]], DC.oroL); linea(134, 86, 134, 89, DC.oroD);
    // la fachada de la tienda: pilastras pintadas
    for (const x of [44, 172, 216]) { rect(x, 91, x + 8, 150, DC.verdeS); rect(x + 1, 91, x + 7, 150, DC.verde); rect(x + 1, 91, x + 1, 150, DC.verdeL); rect(x - 1, 91, x + 9, 94, DC.verdeL); rect(x - 1, 146, x + 9, 150, DC.verdeS); }
    // EL ESCAPARATE en mirador: el marco, el zócalo de tablero y los cristales pequeños (dentro, la tienda en penumbra)
    rect(52, 92, 171, 150, DC.verdeS); rect(54, 128 + 16, 170, 150, DC.verde); for (let x = 56; x < 170; x += 19) { rect(x, 146, x + 15, 149, DC.verdeS); rect(x, 146, x + 15, 146, DC.verdeL); }
    for (let y = 95; y < 143; y++) for (let x = 55; x < 169; x++) pset(x, y, d_b4(x, y) < 0.15 + (y - 95) * 0.004 ? hex('#4a3a2a') : hex('#2e241c'));
    // las baldas del escaparate con libros: juegos de tres tomos, pilas tumbadas, un libro abierto, un grabado
    const LOMOS = [['#7a2a2a', '#5a1a1a'], ['#2a4a6a', '#1a3050'], ['#4a5a2a', '#2e3a18'], ['#6a4a2a', '#4a3018'], ['#5a2a5a', '#3a1a3a']].map(([a, b]) => [hex(a), hex(b)]);
    for (const [yb, k] of [[112, 0], [130, 1], [142, 2]]) { rect(55, yb, 168, yb + 1, DC.roble); rect(55, yb, 168, yb, DC.robleL);
      for (let x = 58, i = 0; x < 160; i++) { const g = LOMOS[(i + k * 2) % 5];
        if ((i + k) % 4 === 3) { for (let j = 0; j < 3; j++) d_tomito(R, x, yb - 1 - j * 4, g, { tumbado: true, w: 3, al: 11 }); x += 14; }
        else if (k === 1 && i === 2) { poligono([[x, yb - 1], [x + 8, yb - 4], [x + 8, yb - 1]], DC.papel); poligono([[x + 8, yb - 4], [x + 16, yb - 1], [x + 8, yb - 1]], DC.papelS); for (let j = 0; j < 3; j++) { linea(x + 2, yb - 2 - j, x + 6, yb - 3 - j, DC.papelD); } rect(x, yb - 1, x + 16, yb - 1, DC.robleS); x += 19; }
        else { for (let j = 0; j < 3; j++) d_tomito(R, x + j * 5, yb - 1, g, { w: 4, al: 10 + (k === 2 ? -2 : 0) }); x += 17; } } }
    rect(132, 96, 150, 108, DC.robleD); rect(133, 97, 149, 107, DC.papel); for (let j = 0; j < 4; j++) linea(135, 99 + j * 2, 147 - (j % 2) * 3, 99 + j * 2, DC.papelD); poligono([[136, 107], [141, 100], [146, 107]], hex('#8a9a7a'));   // un grabado colgado
    // el reflejo del cielo en los cristales (diagonales tramadas) y los parteluces
    for (let y = 95; y < 143; y++) for (let x = 55; x < 169; x++) { const dg = (x + y * 0.8) % 40; if (dg < 6 && ((x + y) & 1)) pset(x, y, d_mezcla(R.pget(x, y), DC.cieloL, 0.45)); }
    for (let x = 55; x < 169; x += 16) rect(x, 94, x + 1, 143, DC.verdeS); for (const y of [94, 106, 118, 130, 142]) rect(54, y, 170, y + 1, DC.verdeS); rect(52, 92, 171, 93, DC.verdeL);
    // la puerta verde con su abanico de cristal, los dos escalones y la aldaba
    rect(180, 92, 214, 150, DC.piedraS); rect(182, 94, 212, 104, DC.tinta); for (let a = 0; a < 7; a++) linea(197, 104, Math.round(197 + Math.cos(Math.PI + a * Math.PI / 6) * 14), Math.round(104 + Math.sin(Math.PI + a * Math.PI / 6) * 9), DC.papel);
    rect(182, 104, 212, 105, DC.papel); rect(184, 106, 210, 150, DC.verde); rect(184, 106, 184, 150, DC.verdeL); rect(197, 106, 197, 150, DC.verdeS);
    for (const [px, py] of [[186, 108], [199, 108], [186, 128], [199, 128]]) { rect(px, py, px + 9, py + 17, DC.verdeS); rect(px + 1, py + 1, px + 9, py + 17, DC.verde); rect(px + 1, py + 1, px + 9, py + 1, DC.verdeL); }
    disco(195, 128, 1, DC.oro); disco(197, 116, 2, DC.oroS); pset(197, 115, DC.oroL); rect(178, 150, 216, 152, DC.piedra); rect(178, 150, 216, 150, DC.papel);
    // la acera de losas, el bordillo y los adoquines
    for (let y = 152; y < 162; y++) for (let x = 0; x < 320; x++) { const lx = (x + (y > 156 ? 9 : 0)) % 18; pset(x, y, lx === 0 || y === 156 ? DC.piedraD : h(Math.floor((x + (y > 156 ? 9 : 0)) / 18), y > 156 ? 1 : 0, 86) < 0.3 ? DC.piedraS : d_mezcla(DC.piedra, DC.piedraS, 0.4)); }
    rect(0, 162, 319, 164, DC.piedra); rect(0, 162, 319, 162, DC.papel); rect(0, 165, 319, 165, DC.piedraD);
    for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 166) / 4), cx = (x + (fila & 1) * 3) % 6, cy = (y - 166) % 4; pset(x, y, cx === 0 || cy === 3 ? DC.adoqS : cy === 0 ? DC.adoqL : h(Math.floor((x + (fila & 1) * 3) / 6), fila, 87) < 0.3 ? d_mezcla(DC.adoq, DC.k, 0.2) : DC.adoq); }
    // la farola de aceite (el poste; la llama tiembla con t)
    rect(261, 112, 263, 161, DC.k); rect(258, 158, 266, 161, DC.k); rect(259, 112, 265, 114, DC.k); rect(258, 100, 266, 112, DC.k); rect(259, 101, 265, 111, hex('#e8d8a0')); poligono([[257, 100], [262, 94], [267, 100]], DC.k); pset(262, 93, DC.k);
  });
  const { rect: r2 } = R;
  // la vida en las ventanas de arriba: alguien que cruza por detrás del visillo y una vela que se enciende y se apaga
  { R.recorte([101, 59, 119, 76]); const u = (t * 0.18) % 1.6, fx = Math.round(96 + u * 30); for (let yy = 63; yy < 77; yy++) for (let xx = fx - 3; xx <= fx + 3; xx++) if ((Math.hypot(xx - fx, yy - 66) < 3 || (yy > 68 && Math.abs(xx - fx) < 4)) && ((xx + yy) & 1)) pset(xx, yy, hex('#6a6a7a')); R.recorte(null);
    if (Math.sin(t * 0.7) > -0.3) { R.recorte([189, 32, 207, 49]); R.halo(198, 44, 8, [hex('#5a5040'), hex('#a88a50')], 0.9); pset(198, 44, DC.llama); pset(198, 43, DC.llamaL); R.recorte(null); } }
  // el gato de la librería en el escalón, que mueve la cola y a ratos se lava
  { const gx = 222, gy = 151, c = hex('#3a3a44'), cl = hex('#5a5a68'), cola = Math.round(Math.sin(t * 2.3) * 2); r2(gx - 3, gy - 5, gx + 3, gy, c); r2(gx - 3, gy - 5, gx - 2, gy - 1, cl); R.disco(gx + 3, gy - 7, 2, c); pset(gx + 2, gy - 10, c); pset(gx + 4, gy - 10, c); pset(gx + 4, gy - 7, DC.oroL);
    for (let i = 0; i < 6; i++) pset(gx - 4 - Math.round(i * 0.6), gy - Math.round(i * 0.4) - (i > 3 ? cola : 0), c); if ((t % 7) < 1.5 && Math.sin(t * 12) > 0) r2(gx + 4, gy - 6, gx + 5, gy - 5, cl); }
  // la llama de la farola, que tiembla
  { const f = Math.sin(t * 9) * 0.5 + Math.sin(t * 13.3) * 0.5; R.halo(262, 106, 9 + f, [d_mezcla(DC.cielo, DC.llama, 0.25), d_mezcla(DC.cielo, DC.llama, 0.5)], 0.8); r2(258, 100, 266, 112, DC.k); r2(259, 101, 265, 111, hex('#f0e0a8')); r2(261, 104 - Math.round(f), 263, 109, DC.llama); pset(262, 103 - Math.round(f), DC.llamaL); r2(258, 100, 258, 112, DC.k); }
  // los charcos de los adoquines que reflejan el cielo y tiemblan con las gotas
  for (const [cx, w] of [[70, 18], [196, 24], [290, 14]]) { for (let y = 169; y < 175; y++) for (let x = cx - w; x <= cx + w; x++) if (((x - cx) / w) ** 2 + ((y - 172) / 3) ** 2 < 1) pset(x, y, (y + Math.floor(t * 3 + x * 0.2)) % 4 === 0 ? DC.cieloL : DC.charco); const g = Math.floor(t * 1.5 + cx) % 3; if (g === 0) { const gx = cx - w / 2 + ((t * 7 + cx) % w); R.anillo?.(Math.round(gx), 172, 2, DC.cieloL); } }
  // la muestra colgante con forma de libro, que se balancea en su brazo de hierro
  { const a = Math.sin(t * 1.4) * 0.12; linea(218, 98, 238, 98, DC.k); linea(218, 102, 230, 98, DC.k); const sx = 234 + Math.round(Math.sin(a) * 12), sy = 99;
    linea(232, 98, sx - 2, sy + 4, DC.k); linea(236, 98, sx + 2, sy + 4, DC.k);
    poligono([[sx - 7, sy + 4], [sx + 7, sy + 4], [sx + 7 + Math.round(a * 30), sy + 20], [sx - 7 + Math.round(a * 30), sy + 20]], DC.verdeS);
    poligono([[sx - 6, sy + 5], [sx, sy + 6], [sx + Math.round(a * 30), sy + 19], [sx - 6 + Math.round(a * 30), sy + 18]], DC.oro); poligono([[sx, sy + 6], [sx + 6, sy + 5], [sx + 6 + Math.round(a * 30), sy + 18], [sx + Math.round(a * 30), sy + 19]], DC.oroL);
    linea(sx, sy + 6, sx + Math.round(a * 30), sy + 19, DC.oroD); }
  // con o.tomos: los tres tomitos destacados en el centro del escaparate, con un brillo
  if (o.tomos) { for (let i = 0; i < 3; i++) d_tomito(R, 98 + i * 9, 129, [hex('#7a3a2a'), hex('#5a2618')], { w: 8, al: 13 }); if (Math.sin(t * 2.2) > 0.6) { pset(100, 118, hex('#fff4c0')); pset(101, 117, hex('#fff4c0')); pset(99, 117, hex('#fff4c0')); } }
  return { suelo: 156, libre: [20, 250], puerta: [182, 212, 152], escaparate: [52, 92, 171, 144] };
}
// una nube de tres tonos (sombra abajo, cuerpo, luz arriba), para el cielo gris de Londres
function d_nubeD(R, cx, cy, w) {
  const [c1, c2, c3] = [hex('#e6e8ec'), hex('#c8ccd4'), hex('#a4aab6')], r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.75], [0, -1, r], [w * 0.38, 0.5, r * 0.8], [w * 0.15, -2, r * 0.6]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.5, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1.2, rr * 0.55, c1);
}

// un carro de caballos que cruza la calle por delante de todo de vez en cuando (cada 16 s, unos 5 s)
function d_carro(R, t) {
  const { rect, pset, disco, linea } = R, u = (t % 16) / 5; if (u > 1) return {};
  const x = Math.round(-90 + u * 520), y = 178, pata = Math.sin(t * 12);
  // el caballo (delante, a la derecha) y el carro con su toldo
  rect(x + 40, y - 24, x + 62, y - 14, hex('#5a3a24')); disco(x + 66, y - 24, 4, hex('#5a3a24')); rect(x + 62, y - 30, x + 70, y - 22, hex('#5a3a24')); rect(x + 68, y - 26, x + 73, y - 22, hex('#4a2e1c')); pset(x + 66, y - 29, DC.k); rect(x + 58, y - 30, x + 61, y - 22, DC.k);
  for (const [dx, f] of [[42, 1], [46, -1], [56, -1], [60, 1]]) linea(x + dx, y - 14, x + dx + Math.round(pata * f * 2), y - 1, hex('#3a2414'));
  rect(x + 40, y - 24, x + 62, y - 24, hex('#7a5a3a')); rect(x + 38, y - 22, x + 40, y - 16, hex('#2a1a10'));
  rect(x - 4, y - 30, x + 38, y - 12, hex('#6a4a2a')); rect(x - 4, y - 30, x + 38, y - 30, hex('#8a6a40')); for (let i = 0; i < 42; i += 6) rect(x - 3 + i, y - 29, x - 3 + i, y - 13, hex('#4a3018'));
  rect(x - 2, y - 44, x + 34, y - 30, hex('#d8ccb0')); for (let i = 0; i < 36; i += 9) rect(x - 2 + i, y - 44, x - 2 + i, y - 30, hex('#b0a488')); rect(x - 2, y - 44, x + 34, y - 44, DC.papel);
  for (const dx of [4, 30]) { disco(x + dx, y - 8, 8, DC.k); disco(x + dx, y - 8, 7, hex('#7a5a3a')); disco(x + dx, y - 8, 2, DC.k); for (let a = 0; a < 6; a++) { const g = a * Math.PI / 3 + t * 6; linea(x + dx, y - 8, Math.round(x + dx + Math.cos(g) * 6), Math.round(y - 8 + Math.sin(g) * 6), DC.k); } }
  // el carretero con su sombrero
  rect(x + 32, y - 38, x + 38, y - 30, hex('#3a3a4a')); disco(x + 35, y - 41, 3, DC.piel); rect(x + 31, y - 47, x + 39, y - 44, DC.k); rect(x + 33, y - 50, x + 37, y - 47, DC.k);
  return {};
}

function d_teatro(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  d_fondo(R, 'teatro', () => {
    // el techo con artesones, en penumbra (tranquilo bajo la barra del año y la esquina de Atom)
    rect(0, 0, 319, 179, DC.nocheS);
    for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) { const ax = x % 32, ay = y % 18; pset(x, y, ax < 2 || ay > 15 ? hex('#2a1a1e') : ax < 4 || ay > 13 ? hex('#3a2228') : d_b4(x, y) < 0.3 ? hex('#30202a') : hex('#261820')); }
    for (const cx of [196, 228, 260]) { disco(cx, 8, 3, hex('#3e2a22')); disco(cx, 8, 2, hex('#5a4024')); pset(cx - 1, 7, hex('#7a5a30')); for (let a = 0; a < 8; a++) pset(Math.round(cx + Math.cos(a * 0.785) * 5), Math.round(8 + Math.sin(a * 0.785) * 4), hex('#3a2a24')); }   // los rosetones de los artesones (fuera de la barra del año y de la esquina de Atom)
    // los palcos de los lados, tres pisos a la izquierda y dos a la derecha: el interior rojo y la balaustrada dorada
    const piso = (x0, x1, y0, y1) => { rect(x0, y0, x1, y1, DC.rojoD); for (let y = y0 + 2; y < y1 - 8; y++) for (let x = x0 + 1; x < x1; x++) if (((x >> 1) + (y >> 1)) % 4 === 0) pset(x, y, DC.damasco);
      rect(x0, y1 - 8, x1, y1, DC.oroS); rect(x0, y1 - 8, x1, y1 - 7, DC.oroL); rect(x0, y1 - 1, x1, y1, DC.oroD); for (let x = x0 + 3; x < x1 - 2; x += 6) { rect(x, y1 - 5, x + 2, y1 - 3, DC.oro); pset(x + 1, y1 - 4, DC.oroL); } rect(x0, y0, x1, y0 + 1, DC.oroD); };
    for (let p = 0; p < 3; p++) piso(0, 54, 22 + p * 34, 54 + p * 34);
    for (let p = 0; p < 2; p++) piso(266, 319, 54 + p * 34, 86 + p * 34);
    // el palco bajo de la izquierda (donde se sienta Mary), con la pared de damasco iluminada por su candelabro: más claro que
    // el resto, para que una figura de luto se lea bien delante
    for (let y = 92; y < 114; y++) for (let x = 1; x < 54; x++) { const u = x % 10, v = (y - 92) % 12, r = Math.abs(u - 5) * 1.2 + Math.abs(v - 6), g = 1 - Math.hypot((x - 28) / 30, (y - 100) / 16);
      let c = r > 4.4 && r < 5.6 ? DC.rojoL : r < 1.4 ? hex('#d86a6a') : DC.rojo; if (g < 0.35 && d_b4(x, y) > g * 2) c = d_mezcla(c, DC.rojoD, 0.5); pset(x, y, c); }
    for (const x of [0, 18, 36, 54]) rect(x, 22, x + 1, 122, DC.oroD); for (const x of [266, 284, 302, 318]) rect(x, 54, x + 1, 122, DC.oroD);
    rect(18, 92, 19, 113, DC.rojoS); rect(36, 92, 37, 113, DC.rojoS);   // (en el palco bajo, sin pilarcillos dorados delante de la pared clara)
    // las cortinillas recogidas en las esquinas de cada palco, con su borla
    for (const [x0, x1, y0] of [[0, 54, 22], [0, 54, 56], [0, 54, 90], [266, 319, 54], [266, 319, 88]]) for (const [xa, d] of [[x0 + 2, 1], [x1 - 2, -1]]) {
      for (let j = 0; j < 14; j++) { const w = Math.max(0, 7 - Math.round(j * 0.5)); for (let i = 0; i <= w; i++) pset(xa + d * i, y0 + 2 + j, i === w ? DC.rojoS : Math.sin(i * 1.4 + j * 0.2) > 0.3 ? DC.rojoL : DC.rojo); }
      disco(xa + d * 2, y0 + 16, 1, DC.oro); pset(xa + d * 2, y0 + 18, DC.oroS); }
    // el cortinaje del proscenio de la derecha, arriba: pliegues suaves de terciopelo oscuro (de poco contraste: está detrás
    // de la esquina de Atom) con su fleco dorado y la cornisa ya por debajo
    for (let y = 18; y < 50; y++) for (let x = 266; x < 320; x++) { const f = Math.sin(x * 0.42 + Math.sin(y * 0.08) * 0.8); pset(x, y, f > 0.55 ? (d_b4(x, y) < 0.5 ? hex('#3e2026') : hex('#361c22')) : f > -0.4 ? hex('#2e161c') : (d_b4(x, y) < 0.5 ? hex('#261216') : hex('#2a1418'))); }
    for (let x = 266; x < 320; x++) { pset(x, 50, DC.oroS); if (x % 2) { pset(x, 51, DC.oro); pset(x, 52, DC.oroS); } } rect(266, 53, 319, 53, DC.oroD);
    // EL ARCO DEL PROSCENIO dorado, con su moldura, las pilastras y la cartela de la lira
    rect(54, 16, 266, 116, DC.oroD); rect(56, 18, 264, 114, DC.oroS);
    for (let y = 18; y < 114; y++) for (const x of [58, 60, 258, 260]) pset(x, y, (y % 6) < 3 ? DC.oro : DC.oroS);
    for (let x = 56; x <= 264; x++) { pset(x, 20, (x % 5) < 2 ? DC.oroL : DC.oro); pset(x, 24, (x % 4) < 2 ? DC.oro : DC.oroD); }
    for (let x = 64; x < 258; x += 8) { disco(x, 22, 1, DC.oroL); }
    rect(146, 16, 174, 28, DC.oroS); disco(160, 22, 6, DC.oro); disco(160, 22, 4, DC.rojoS); for (const dx of [-2, 0, 2]) linea(160 + dx, 19, 160 + dx, 25, DC.oroL); rect(157, 25, 163, 26, DC.oroL);   // la lira
    // la caja del escenario: el decorado pintado de laboratorio (de cartón, con el trazo del pintor)
    rect(64, 28, 256, 104, hex('#5a5468'));
    for (let y = 28; y < 98; y++) for (let x = 64; x < 256; x++) { const fila = Math.floor(y / 7), b = (x + (fila & 1) * 8) % 16; pset(x, y, y % 7 === 0 || b === 0 ? hex('#3e3a4c') : h(x >> 4, fila, 90) < 0.25 ? hex('#6a6478') : hex('#56506a')); }
    // la ventana gótica pintada con su luna y la reja
    poligono([[140, 90], [140, 50], [160, 34], [180, 50], [180, 90]], hex('#2a2a4a')); disco(168, 52, 6, hex('#e8e4c0')); disco(170, 51, 5, hex('#2a2a4a'));
    for (let x = 146; x < 180; x += 8) linea(x, 46, x, 90, hex('#1a1a2a')); linea(140, 70, 180, 70, hex('#1a1a2a')); linea(140, 90, 140, 50, hex('#8a8098')); linea(140, 50, 160, 34, hex('#8a8098')); linea(160, 34, 180, 50, hex('#8a8098')); linea(180, 50, 180, 90, hex('#2a2a3a'));
    // los bastidores de los lados con estantes pintados de frascos de colores (pintura plana y gruesa)
    for (const [x0, x1] of [[70, 128], [192, 250]]) { rect(x0, 40, x1, 98, hex('#6a5a48')); rect(x0, 40, x1, 41, hex('#8a7a62')); rect(x1, 40, x1, 98, hex('#3e3428'));
      for (let b = 0; b < 3; b++) { const yb = 56 + b * 16; rect(x0 + 2, yb, x1 - 2, yb + 2, hex('#4a3a2a')); rect(x0 + 2, yb, x1 - 2, yb, hex('#9a8466'));
        for (let i = 0, x = x0 + 4; x < x1 - 6; i++) { const c = [hex('#4aa86a'), hex('#c84a4a'), hex('#e8c040'), hex('#4a7ac8'), hex('#a85ac8')][(i + b * 2 + x0) % 5], al = 5 + ((i + b) % 3) * 2; rect(x, yb - al, x + 3, yb - 1, c); rect(x + 1, yb - al - 2, x + 2, yb - al, hex('#c8c0b0')); pset(x, yb - al + 1, hex('#f8f4e8')); rect(x + 3, yb - al, x + 3, yb - 1, d_mezcla(c, DC.k, 0.35)); x += 7 + (i % 2) * 2; } }
      for (let y = 42; y < 96; y += 9) pset(x0 + 1, y, hex('#3e3428')); }
    // las tablas del escenario
    for (let y = 98; y < 106; y++) for (let x = 64; x < 256; x++) pset(x, y, (x - 160) * (106 - y) % 9 === 0 ? hex('#4a3420') : (y & 1) ? hex('#7a5a38') : hex('#6a4c2e'));
    rect(64, 98, 256, 98, hex('#8a6a44'));
    // la mesa de atrezo con las retortas y un frasco grande
    rect(186, 84, 224, 87, hex('#7a5a38')); rect(186, 84, 224, 84, hex('#a8845a')); rect(188, 88, 190, 101, hex('#5a4028')); rect(220, 88, 222, 101, hex('#5a4028'));
    disco(196, 79, 4, hex('#8ac8a8')); rect(195, 72, 197, 76, hex('#c8e0d8')); linea(197, 73, 205, 70, hex('#c8e0d8')); disco(212, 78, 5, hex('#c86a8a')); rect(211, 70, 213, 74, hex('#e8d0d8')); pset(210, 76, hex('#ffffff')); pset(194, 77, hex('#ffffff'));
    // el TELÓN ROJO: la bambalina con su fleco dorado y las dos caídas recogidas con alzapaños
    for (let x = 64; x < 256; x++) { const pl = Math.sin(x * 0.4); for (let y = 28; y < 40 + Math.round(Math.abs(Math.sin((x - 64) / 32 * Math.PI)) * 6); y++) pset(x, y, pl > 0.4 ? DC.rojoL : pl > -0.3 ? DC.rojo : DC.rojoS); }
    for (let x = 64; x < 256; x++) { const yb = 40 + Math.round(Math.abs(Math.sin((x - 64) / 32 * Math.PI)) * 6); pset(x, yb, DC.oro); if (x % 2) pset(x, yb + 1, DC.oroS); }
    for (const [x0, d] of [[64, 1], [256, -1]]) for (let y = 28; y < 104; y++) { const cint = Math.abs(y - 70) < 4, ancho = y < 70 ? 14 - Math.round((y - 28) * 0.12) : 9 + Math.round((y - 70) * 0.12);
      for (let i = 0; i <= ancho; i++) { const f = Math.sin(i * 1.1 + y * 0.03); pset(x0 + d * i, y, cint ? DC.oro : f > 0.4 ? DC.rojoL : f > -0.3 ? DC.rojo : DC.rojoS); } }
    for (const x of [70, 250]) { disco(x, 76, 2, DC.oroS); rect(x, 77, x, 84, DC.oro); disco(x, 85, 1, DC.oroL); }
    // el borde del escenario y el foso de la orquesta (los músicos con t)
    rect(56, 106, 264, 112, hex('#3a2418')); rect(56, 106, 264, 106, hex('#6a4a2e')); for (let x = 60; x < 262; x += 14) rect(x, 108, x + 9, 111, hex('#2e1c12'));
    rect(56, 112, 264, 124, hex('#160e10')); rect(56, 112, 264, 112, DC.oroD);
    // el foso: la pared de tablas del fondo (en penumbra, con el filo de luz de las candilejas) y la barandilla de la platea
    for (let y = 113; y < 124; y++) for (let x = 56; x <= 264; x++) { const tb = (x - 56) % 7; pset(x, y, tb === 0 ? hex('#0e080a') : y < 116 && d_b4(x, y) < 0.5 - (y - 113) * 0.15 ? hex('#3a2418') : h(x >> 1, y >> 2, 92) < 0.18 ? hex('#22161a') : hex('#1a1014')); }
    rect(56, 123, 264, 124, hex('#3a2418')); rect(56, 123, 264, 123, DC.oroS); for (let x = 60; x < 262; x += 10) { rect(x, 121, x + 1, 122, DC.oroD); }
    // el fondo de la platea: filas de cabecitas oscuras con el filo de luz del escenario
    for (let fila = 0; fila < 4; fila++) for (let k = 0; k < 40; k++) { const x = 2 + k * 8 + (fila % 2) * 4, y = 126 + fila * 7, c = [hex('#2a2024'), hex('#3a2a22'), hex('#4a3a2a'), hex('#1e1a22')][(k + fila) % 4];
      if (fila === 0 && x > 56 && x < 264) continue; disco(x, y, 3, c); pset(x - 1, y - 3, d_mezcla(c, DC.llama, 0.4)); pset(x, y - 3, d_mezcla(c, DC.llama, 0.5)); if ((k * 7 + fila) % 9 === 0) { rect(x - 3, y - 6, x + 3, y - 5, DC.k); rect(x - 2, y - 9, x + 2, y - 6, DC.k); } else if ((k * 5 + fila) % 11 === 0) { disco(x, y - 1, 3, DC.papel); pset(x + 2, y - 4, hex('#e8a0b0')); } rect(x - 3, y + 3, x + 3, y + 6, d_mezcla(c, DC.rojoD, 0.5)); }
    rect(0, 152, 319, 179, DC.nocheS);
  });
  // la araña de velas del techo, que tiembla
  { const ax = 236, ay = 34; linea(ax, 0, ax, ay - 8, DC.oroD); R.halo(ax, ay - 2, 14, [hex('#3a2820'), hex('#5a3a24')], 0.9); poligono([[ax - 12, ay - 2], [ax + 12, ay - 2], [ax + 4, ay + 4], [ax - 4, ay + 4]], DC.oroS); rect(ax - 12, ay - 3, ax + 12, ay - 2, DC.oro); disco(ax, ay + 6, 2, DC.oroL);
    for (let i = 0; i < 5; i++) { const x = ax - 10 + i * 5, fl = Math.sin(t * 11 + i * 2) > 0.2 ? 1 : 0; rect(x, ay - 6, x, ay - 3, DC.papel); pset(x, ay - 7 - fl, DC.llama); pset(x, ay - 8 - fl, DC.llamaL); } for (let i = 0; i < 6; i++) pset(ax - 11 + i * 4 + (i % 2), ay + 1 + (i % 2), DC.oroL); }
  // las CANDILEJAS: lamparitas de aceite que tiemblan, y su luz en el borde del telón
  for (let x = 70; x < 252; x += 9) { const fl = Math.sin(t * 10 + x * 0.7) > 0 ? 1 : 0; rect(x - 2, 105, x + 2, 107, DC.oroD); rect(x - 1, 103 - fl, x + 1, 104, DC.llama); pset(x, 102 - fl, DC.llamaL); pset(x, 101 - fl * 2, d_mezcla(DC.llama, DC.k, 0.4)); for (let i = -4; i <= 4; i++) if ((i + Math.floor(t * 6)) % 3 === 0) pset(x + i, 100 - Math.abs(i) % 3, d_mezcla(R.pget(x + i, 100), DC.llama, 0.25)); }
  // LOS ACTORES: el actor alto empolvado que avanza con los brazos hacia delante y el galán que retrocede
  let cara = [160, 80];
  if (o.actores !== false) { cara = d_actorAlto(R, 160 + Math.round(Math.sin(t * 0.4) * 6), 104, t); d_figura(R, 112 - Math.round(Math.sin(t * 0.4) * 3), 104, 24, [hex('#3a5a9a'), hex('#24407a')], t, { dir: 1, pelo: hex('#5a3a20'), anda: false, calzas: hex('#e8e0cc') });
    const bx = 112 - Math.round(Math.sin(t * 0.4) * 3); const tb = Math.round(Math.sin(t * 3) * 1); linea(bx + 2, 89, bx + 7, 85 - tb, hex('#3a5a9a')); pset(bx + 8, 84 - tb, DC.piel); pset(bx + 8, 85 - tb, DC.piel); }
  // el foso: los músicos (cabezas, atriles con velitas y los arcos de los violines que van y vienen)
  for (let k = 0; k < 9; k++) { const x = 68 + k * 23, y = 118; disco(x, y, 3, [hex('#3a2a22'), hex('#5a5a64'), hex('#2a2024')][k % 3]); pset(x, y - 3, hex('#8a6a4a'));
    rect(x + 6, 113, x + 11, 116, DC.papelS); pset(x + 8, 112, Math.sin(t * 9 + k) > 0 ? DC.llama : DC.llamaS); const a = Math.sin(t * 6 + k * 1.3); linea(x - 3, y - 1, x - 3 + Math.round(a * 6), y - 4, hex('#c8b890')); }
  // la luz del candelabro del palco bajo (tiembla) y el candelabro en la pared, a la derecha del palco
  { const fl = Math.sin(t * 9) * 0.5 + Math.sin(t * 13.7) * 0.5; b_luz(R, 30, 101, 27 + fl, 12, hex('#ffd890'), 0.32 + fl * 0.04);
    rect(48, 98, 52, 99, DC.oroS); rect(50, 94, 51, 98, DC.papel); pset(50, 93 - (fl > 0 ? 1 : 0), DC.llama); pset(50, 92 - (fl > 0.3 ? 1 : 0), DC.llamaL); pset(51, 93, DC.llamaS); }
  // el fondo de la platea se mueve: cabezas que se giran a comentar con el vecino y manos que aplauden por encima
  for (let j = 0; j < 14; j++) { const k = (j * 7 + 3) % 40, fila = j % 2, x = 2 + k * 8 + (fila % 2) * 4, y = 126 + fila * 7; if (fila === 0 && x > 56 && x < 264) continue;
    const gi = Math.sin(t * 0.6 + j * 1.9); if (gi > 0.55) { pset(x + 2, y, DC.pielS); pset(x + 2, y + 1, d_mezcla(DC.pielS, DC.k, 0.3)); } else if (gi < -0.6) { pset(x - 2, y, DC.pielS); }
    if (j % 3 === 0 && Math.sin(t * 2.1 + j) > 0.3) { const ar = Math.sin(t * 13 + j) > 0 ? 1 : 0; pset(x - 2, y - 5 - ar, DC.pielS); pset(x + 2, y - 5 - ar, DC.pielS); } }
  // el público de los palcos: cabecitas que aplauden y abanicos que se mueven
  const PALCOS = [[0, 54, 46], [0, 54, 80], [0, 54, 114], [266, 319, 78], [266, 319, 112]];
  PALCOS.forEach(([x0, x1, yb], p) => { for (let i = 0; x0 + 6 + i * 11 < x1 - 3; i++) { const x = x0 + 6 + i * 11 + (p % 2) * 3, y = yb - 12, k = p * 7 + i; if (p === 2) continue;   // el palco bajo queda para los personajes
    const vest = [hex('#e8e0d0'), hex('#3a3a4a'), hex('#6a2a4a'), hex('#2a4a6a'), hex('#8a6a3a')][k % 5], mujer = k % 2 === 0;
    rect(x - 3, y + 2, x + 3, y + 6, vest); disco(x, y - 1, 2, DC.piel); if (mujer) { disco(x, y - 3, 2, [hex('#5a3a20'), hex('#2a1e18'), hex('#a8784a')][k % 3]); pset(x + 2, y - 5, hex('#f0e8f8')); } else rect(x - 2, y - 4, x + 2, y - 3, hex('#3a2a1e'));
    const ap = (k % 3 === 0) && Math.sin(t * 14 + k) > 0; if (ap) { pset(x - 2, y + 1, DC.piel); pset(x + 2, y + 1, DC.piel); } else if (k % 3 === 0) { pset(x, y + 2, DC.piel); pset(x - 1, y + 2, DC.piel); }
    if (k % 4 === 1) { const ab = Math.sin(t * 5 + k) > 0 ? 1 : 0; poligono([[x + 3, y + 2], [x + 7, y - 1 + ab], [x + 7, y + 3 + ab]], [hex('#f0d0e0'), hex('#d0e0f0')][k % 2]); }
    else if (k % 5 === 2 && Math.sin(t * 0.8 + k) > -0.2) { rect(x - 2, y - 2, x + 2, y - 1, DC.k); pset(x - 2, y - 1, DC.piel); if (Math.sin(t * 3 + k) > 0.7) pset(x + 1, y - 2, DC.oroL); } } });   // alguien con los gemelos
  return { suelo: 104, libre: [96, 228], palco: [6, 50, 118], actor: cara };
}
// el actor alto de la obra de 1823 (de teatro: cara empolvada muy pálida con un poco de azul, pelo negro largo, túnica
// clara con faja, los brazos y las piernas desnudos de color cera; se balancea despacio y alarga los brazos); devuelve
// la posición de la cara
function d_actorAlto(R, x, suelo, t) {
  const { rect, pset, disco, linea } = R, sw = Math.sin(t * 1.6), br = Math.sin(t * 0.9) * 0.5 + 0.5, cera = DC.polvo, ceraS = DC.polvoS;
  const TUN = hex('#a89e7e'), TUNS = hex('#7e7458'), TUNL = hex('#c8bea0'), PELO = hex('#141018');
  // la sombra que le dejan las candilejas en el telón de fondo (más alta que él)
  for (let y = suelo - 44; y < suelo - 4; y++) for (let xx = x - 5; xx <= x + 5; xx++) if (((xx + y) & 1) && Math.abs(xx - x) < 5 - (suelo - 4 - y) * 0.04) pset(xx + 4, y, d_mezcla(R.pget(xx + 4, y), DC.k, 0.3));
  // las piernas largas con las vendas de tela y las botas
  for (const [dx, f] of [[-2, 1], [2, -1]]) { const px = x + dx + Math.round(sw * f * 0.8); rect(px - 1, suelo - 13, px + 1, suelo - 2, hex('#6a6a6a')); for (let y = suelo - 12; y < suelo - 2; y += 3) rect(px - 1, y, px + 1, y, hex('#8a8a86')); rect(px - 2, suelo - 2, px + 2, suelo, hex('#2a2018')); }
  // la túnica de arpillera, hasta las rodillas, con sus pliegues, la faja y el borde deshilachado
  for (let y = suelo - 30; y <= suelo - 12; y++) { const w = 4 + Math.round((y - (suelo - 30)) * 0.17); for (let xx = x - w; xx <= x + w; xx++) pset(xx, y, xx === x - w ? TUNL : xx >= x + w - 1 ? TUNS : (xx - x + 40) % 4 === 0 ? TUNS : TUN); }
  for (let xx = x - 7; xx <= x + 7; xx += 2) pset(xx, suelo - 11, TUNS);
  rect(x - 5, suelo - 21, x + 5, suelo - 20, hex('#4a3a30')); pset(x + 3, suelo - 19, hex('#4a3a30')); pset(x + 3, suelo - 18, hex('#4a3a30'));
  // los brazos largos y pálidos, que se alargan despacio hacia el galán
  const ay = suelo - 28, mx = x - 11 - Math.round(br * 4), my = ay + 2 - Math.round(br * 5);
  linea(x - 4, ay, mx, my, ceraS); linea(x - 4, ay + 1, mx, my + 1, cera); linea(x - 4, ay + 2, mx + 1, my + 2, ceraS); pset(mx - 1, my, cera); pset(mx - 1, my + 1, cera); pset(mx - 2, my, ceraS);
  linea(x + 4, ay, x + 8, ay + 9 - Math.round(br * 3), ceraS); linea(x + 5, ay, x + 9, ay + 9 - Math.round(br * 3), cera); pset(x + 9, ay + 10 - Math.round(br * 3), cera);
  // la cabeza empolvada muy pálida, con el pelo negro largo hasta los hombros y los ojos pintados de oscuro
  const cy = suelo - 35; rect(x - 2, cy + 4, x + 2, cy + 5, ceraS); disco(x, cy, 5, PELO); disco(x - 1, cy + 1, 4, cera); rect(x - 5, cy - 4, x + 5, cy - 2, PELO); rect(x + 3, cy - 2, x + 5, cy + 6, PELO); rect(x - 5, cy - 2, x - 5, cy + 3, PELO);
  rect(x - 3, cy, x - 2, cy, hex('#3a3a5a')); pset(x, cy, hex('#3a3a5a')); pset(x - 2, cy + 2, ceraS); rect(x - 3, cy + 3, x, cy + 3, hex('#8a7a8a'));
  pset(x - 3, cy - 1, hex('#ffffff')); pset(x - 2, cy - 1, hex('#ffffff'));   // la luz de las candilejas
  return [x - 1, cy];
}

// las filas de delante de la platea (por delante de los personajes) y la barandilla del palco bajo de la izquierda
function d_teatroDelante(R, t, o) {
  const { rect, pset } = R;
  // la barandilla dorada del palco bajo (tapa al que esté dentro de cintura abajo)
  rect(0, 109, 54, 121, DC.oroS); rect(0, 109, 54, 110, DC.oroL); rect(0, 120, 54, 121, DC.oroD); for (let x = 3; x < 52; x += 6) { rect(x, 112, x + 2, 118, DC.oro); pset(x + 1, 113, DC.oroL); rect(x + 2, 113, x + 2, 118, DC.oroD); } rect(0, 106, 54, 108, DC.rojo); rect(0, 106, 54, 106, DC.rojoL); for (let x = 1; x < 54; x += 3) pset(x, 107, DC.rojoS);
  rect(0, 122, 54, 123, DC.oroD);
  // tres filas de cabezas grandes de espaldas, con sombreros, cofias y tocados, y manos que aplauden
  const PELOS = [['#2a2430', '#1a1420'], ['#5a3a20', '#3a2414'], ['#8a5a2a', '#5a3a1a'], ['#c8a060', '#8a6a3a'], ['#1e1a24', '#100c14'], ['#8a8a98', '#5e5e6c']].map(([a, b]) => [hex(a), hex(b)]);
  const ROPA = ['#3a3a4a', '#6a2a3a', '#2a4a5a', '#5a4a3a', '#e8e0d0', '#4a3a5a'].map(hex);
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 13; k++) {
    const x = 4 + k * 26 + (fila % 2) * 12, y = 150 + fila * 12, tipo = (k * 7 + fila * 3) % 6, [pl, ps] = PELOS[(k * 5 + fila) % 6], rp = ROPA[(k + fila * 2) % 6], r = 6 + fila;
    rect(x - r - 3, y + r - 2, x + r + 3, 179, d_mezcla(rp, DC.k, 0.15)); rect(x - r - 3, y + r - 2, x + r + 3, y + r - 2, d_mezcla(rp, DC.llama, 0.3)); rect(x - 1, y + r - 1, x + 1, 179, d_mezcla(rp, DC.k, 0.4));
    R.disco(x, y, r + 1, DC.k); R.disco(x, y, r, ps); R.disco(x - 1, y - 1, r - 2, pl);
    for (let i = -r + 2; i <= r - 2; i++) pset(x + i, y - Math.round(Math.sqrt(r * r - i * i)), d_mezcla(pl, DC.llama, 0.6));   // el filo de luz de las candilejas
    pset(x - r - 1, y + 1, DC.piel); pset(x + r + 1, y + 1, DC.piel);
    if (tipo === 1) { rect(x - r + 1, y - r - 7, x + r - 1, y - r + 1, DC.k); rect(x - r - 2, y - r + 1, x + r + 2, y - r + 2, DC.k); rect(x - r + 1, y - r - 1, x + r - 1, y - r - 1, hex('#5a3a4a')); pset(x - r + 2, y - r - 6, hex('#3a3a4a')); }   // chistera
    else if (tipo === 3) { R.disco(x, y - 2, r + 2, hex('#e8dcc4')); R.disco(x, y - 1, r, d_mezcla(hex('#e8dcc4'), DC.k, 0.1)); rect(x - 1, y - r - 4, x + 1, y - r - 1, hex('#c84a6a')); pset(x, y - r - 5, hex('#f0a0c0')); }   // capota con lazo
    else if (tipo === 4) { R.disco(x, y - r, 3, ps); pset(x + 2, y - r - 4, hex('#f8f4f0')); pset(x + 3, y - r - 5, hex('#f8f4f0')); pset(x + 3, y - r - 6, hex('#d8d4e0')); }   // moño con pluma
    // algunos aplauden (las manos suben y bajan), otro se gira a mirar a su vecina
    if ((k + fila) % 4 === 1) { const ar = Math.sin(t * 13 + k * 2) > 0, hy = y - r + 4 - (ar ? 2 : 0); rect(x - 4, hy, x - 3, hy + 2, DC.piel); rect(x + 3 - (ar ? 1 : 0), hy, x + 4 - (ar ? 1 : 0), hy + 2, DC.pielS); }
  }
  return {};
}
// TEATRO · palco
function d_palco(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  d_fondo(R, 'palco', () => {
    rect(0, 0, 319, 179, DC.rojoD);
    // los palcos vecinos a los lados, cortados (oscuros; el de la derecha, tranquilo bajo Atom)
    for (const [x0, x1] of [[0, 36], [284, 319]]) { for (let y = 0; y < 180; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x >> 1) + (y >> 1)) % 5 === 0 ? hex('#3e0e16') : hex('#2e0a10'));
      // su pared de damasco en penumbra, con la luz de su propio aplique (abajo, lejos de la esquina de Atom)
      for (let y = 62; y < 128; y++) for (let x = x0; x <= x1; x++) { const u = (x + 4) % 12, v = (y - 62) % 14, r = Math.abs(u - 6) * 1.2 + Math.abs(v - 7), g = 1 - Math.hypot((x - (x0 + x1) / 2) / 26, (y - 92) / 34);
        let c = r > 5.4 && r < 6.6 ? hex('#5a1620') : r < 1.2 ? hex('#6e1c28') : hex('#3e0e16'); if (g > 0 && d_b4(x, y) < g * 1.3) c = d_mezcla(c, hex('#ffb070'), 0.16 * g + 0.06); pset(x, y, c); }
      // su cortina recogida y la cornisa dorada de arriba (tranquila)
      for (let y = x0 === 0 ? 8 : 46; y < 128; y++) { const w = y < 80 ? 8 - Math.round((y - 8) * 0.07) : 3 + Math.round((y - 80) * 0.1), xa = x0 === 0 ? x1 - 1 : x0 + 1, d = x0 === 0 ? -1 : 1; for (let i = 0; i <= w; i++) pset(xa + d * i, y, Math.abs(y - 82) < 2 ? DC.oroS : Math.sin(i * 1.3 + y * 0.05) > 0.3 ? hex('#6a1622') : hex('#4a0e18')); }
      rect(x0, 56, x1, 60, DC.oroD); rect(x0, 56, x1, 56, DC.oroS); for (let x = x0 + 1; x < x1; x += 4) pset(x, 58, DC.oroS); rect(x0, 128, x1, 140, DC.oroS); rect(x0, 128, x1, 128, DC.oroL); for (let x = x0 + 2; x < x1; x += 6) rect(x, 131, x + 2, 137, DC.oro); rect(x0, 141, x1, 179, DC.oroD); for (let y = 144; y < 180; y += 8) for (let x = x0 + 3; x < x1 - 2; x += 8) { rect(x, y, x + 4, y + 4, DC.oroS); pset(x + 1, y + 1, DC.oro); } }
    // la pared del fondo del palco: damasco rojo con su dibujo de rombos y flores
    for (let y = 30; y < 140; y++) for (let x = 58; x < 262; x++) { const u = (x - 58) % 16, v = (y - 30) % 20, rombo = Math.abs(u - 8) * 1.25 + Math.abs(v - 10) < 9 && Math.abs(u - 8) * 1.25 + Math.abs(v - 10) > 7, flor = Math.hypot(u - 8, v - 10) < 2.2;
      pset(x, y, flor ? hex('#a8323e') : rombo ? DC.damascoL : d_b4(x, y) < 0.08 ? hex('#6a1620') : DC.damasco); }
    // la luz que llega del escenario desde la izquierda, más clara en la pared
    for (let y = 30; y < 140; y++) for (let x = 58; x < 262; x++) if (d_b4(x, y) < 0.35 - (x - 58) / 600 - Math.abs(y - 80) / 400) pset(x, y, d_mezcla(R.pget(x, y), hex('#ffcf90'), 0.18));
    // la puerta del palco (entreabierta, con el pasillo en penumbra) y el perchero con una chistera y una capa
    rect(206, 52, 244, 140, DC.oroD); rect(208, 54, 242, 140, hex('#1a0c10')); rect(222, 54, 242, 140, hex('#5a3020')); rect(222, 54, 222, 140, hex('#7a4a30')); for (const y of [60, 98]) { rect(226, y, 238, y + 30, hex('#4a2618')); rect(226, y, 238, y, hex('#7a4a30')); } disco(226, 98, 1, DC.oro);
    rect(84, 50, 86, 120, DC.robleS); rect(78, 50, 92, 52, DC.robleS); disco(78, 52, 1, DC.oro); disco(92, 52, 1, DC.oro);
    rect(80, 46, 92, 49, DC.k); rect(82, 36, 90, 46, DC.k); rect(82, 44, 90, 44, hex('#4a3a4a')); pset(83, 37, hex('#3a3a4a'));   // la chistera
    poligono([[74, 54], [82, 52], [84, 92], [72, 96]], hex('#2a2e4a')); linea(72, 96, 84, 92, hex('#1a1e30')); linea(74, 54, 72, 96, hex('#3a3e5e'));   // la capa
    // el espejo con marco dorado tallado (refleja la sala, tramado y apagado)
    rect(124, 40, 188, 92, DC.oroD); rect(126, 42, 186, 90, DC.oroS); rect(126, 42, 186, 42, DC.oroL); for (let x = 128; x < 186; x += 4) pset(x, 43, DC.oro);
    for (let y = 46; y < 87; y++) for (let x = 130; x < 183; x++) pset(x, y, d_b4(x, y) < 0.2 + (y - 46) * 0.005 ? hex('#5a3a3a') : y > 74 ? hex('#3a2228') : hex('#4a2e30'));
    for (let k = 0; k < 9; k++) { const x = 134 + k * 6, y = 80 + (k % 2); disco(x, y, 2, hex('#2a1a1e')); pset(x, y - 2, hex('#8a6a5a')); }
    for (let y = 46; y < 87; y++) for (let x = 130; x < 183; x++) if ((x + y) % 23 < 2 && ((x + y) & 1)) pset(x, y, hex('#8a6a6a'));
    poligono([[150, 40], [156, 34], [162, 40]], DC.oro); disco(156, 37, 1, DC.oroL);
    // las columnas doradas talladas a los lados del palco, con su capitel
    for (const x0 of [40, 262]) { rect(x0, 26, x0 + 18, 179, DC.oroD); rect(x0 + 2, 28, x0 + 16, 179, DC.oroS); for (let x = x0 + 3; x < x0 + 16; x += 3) rect(x, 34, x, 179, DC.oro); rect(x0 + 3, 28, x0 + 4, 179, DC.oroL);
      for (let y = 40; y < 140; y += 14) { disco(x0 + 9, y, 3, DC.oroD); disco(x0 + 9, y, 2, DC.oro); pset(x0 + 8, y - 1, DC.oroL); }
      rect(x0 - 2, 22, x0 + 20, 30, DC.oro); rect(x0 - 2, 22, x0 + 20, 22, DC.oroL); rect(x0 - 2, 30, x0 + 20, 31, DC.oroD); for (let x = x0; x < x0 + 20; x += 4) disco(x + 1, 26, 1, DC.oroL); }
    // la cornisa con su fleco y la cortina de terciopelo recogida (arriba, tranquila: rojo oscuro de poco contraste)
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, Math.sin(x * 0.35) > 0.5 ? hex('#4a1018') : hex('#3a0c14'));
    for (let x = 36; x < 286; x++) { const yb = 18 + Math.round(Math.abs(Math.sin((x - 36) / 62 * Math.PI)) * 8); for (let y = 14; y < yb; y++) pset(x, y, Math.sin(x * 0.5 + y * 0.1) > 0.3 ? DC.rojo : DC.rojoS); pset(x, yb, DC.oroS); if (x % 2) { pset(x, yb + 1, DC.oro); pset(x, yb + 2, DC.oroS); } }
    for (const [x0, d] of [[58, 1], [262, -1]]) for (let y = 26; y < 140; y++) { const ancho = y < 84 ? 10 - Math.round((y - 26) * 0.1) : 4 + Math.round((y - 84) * 0.12); for (let i = 0; i <= ancho; i++) { const f = Math.sin(i * 1.2 + y * 0.04); pset(x0 + d * i, y, Math.abs(y - 86) < 3 ? DC.oro : f > 0.4 ? DC.rojoL : f > -0.3 ? DC.rojo : DC.rojoS); } }
    for (const x of [64, 256]) { disco(x, 92, 2, DC.oroS); rect(x, 93, x, 100, DC.oro); disco(x, 101, 2, DC.oroL); }
    // el suelo del palco (alfombra) bajo la barandilla
    rect(58, 138, 262, 179, hex('#4a1a1e')); for (let y = 138; y < 180; y++) for (let x = 58; x < 262; x++) if (((x * 3 + y * 7) % 13) === 0) pset(x, y, hex('#5a2228'));
    // los respaldos de dos sillas doradas
    for (const x of [112, 186]) { rect(x - 8, 112, x + 8, 140, DC.oroD); rect(x - 7, 113, x + 7, 140, DC.rojo); rect(x - 7, 113, x + 7, 114, DC.rojoL); rect(x - 8, 110, x + 8, 112, DC.oro); disco(x - 8, 111, 1, DC.oroL); disco(x + 8, 111, 1, DC.oroL); }
  });
  // los dos apliques de vela a los lados del espejo, que tiemblan
  for (const x of [114, 198]) { const fl = Math.sin(t * 9 + x) * 0.5 + Math.sin(t * 13 + x) * 0.5; R.halo(x, 52, 11 + fl, [d_mezcla(DC.damasco, DC.llama, 0.25), d_mezcla(DC.damasco, DC.llama, 0.45)], 0.8);
    rect(x - 3, 62, x + 3, 64, DC.oroS); rect(x - 1, 64, x + 1, 70, DC.oroD); rect(x - 1, 56, x + 1, 61, DC.papel); pset(x, 55 - (fl > 0 ? 1 : 0), DC.llama); pset(x, 54 - (fl > 0 ? 1 : 0), DC.llamaL); pset(x, 53 - (fl > 0.4 ? 1 : 0), DC.llama); }
  // los apliques de los palcos vecinos (pequeños, tiemblan)
  for (const x of [8, 312]) { const fl = Math.sin(t * 10 + x) > 0 ? 1 : 0; rect(x - 2, 82, x + 2, 83, DC.oroS); rect(x, 77, x, 81, DC.papel); pset(x, 76 - fl, DC.llama); pset(x, 75 - fl, DC.llamaL); }
  // un segundo vecino detrás de cada uno, de pie: uno mira por los gemelos (brillan), el otro se inclina a comentar
  for (const [x, k] of [[28, 0], [292, 1]]) { const y = 108, inc = k ? Math.round(Math.max(0, Math.sin(t * 0.7)) * 2) : 0; rect(x - 5, y + 2, x + 5, y + 20, k ? hex('#4a2a3a') : hex('#2a3a4a')); rect(x - 5, y + 2, x - 5, y + 20, k ? hex('#6a3a4a') : hex('#3a4a5e'));
    disco(x - inc, y - 2, 4, DC.piel); if (k) { disco(x - inc, y - 5, 4, hex('#2a1e18')); pset(x + 3 - inc, y - 9, hex('#f0e8f8')); } else { rect(x - 4, y - 7, x + 4, y - 5, hex('#5a3a20')); }
    if (!k) { const sube = Math.sin(t * 0.5) > -0.3; if (sube) { rect(x - 3, y - 3, x + 3, y - 1, DC.k); pset(x - 2, y - 2, hex('#5a5a68')); pset(x + 2, y - 2, hex('#5a5a68')); if (Math.sin(t * 2.6) > 0.6) pset(x + 3, y - 3, DC.oroL); rect(x - 4, y, x - 3, y + 2, DC.piel); } } }
  // los vecinos de los palcos de los lados: abanicos y aplausos
  for (const [x, k] of [[16, 0], [300, 1]]) { const y = 118; rect(x - 6, y + 2, x + 6, y + 10, k ? hex('#2a2a3a') : hex('#d8c8e0')); disco(x, y - 2, 4, DC.piel); if (k) { rect(x - 4, y - 7, x + 4, y - 5, hex('#3a2a20')); const ap = Math.sin(t * 14) > 0; rect(x - 4 + (ap ? 1 : 0), y + 4, x - 2 + (ap ? 1 : 0), y + 6, DC.piel); rect(x + 2 - (ap ? 1 : 0), y + 4, x + 4 - (ap ? 1 : 0), y + 6, DC.pielS); }
    else { disco(x, y - 5, 4, hex('#5a3a20')); pset(x + 3, y - 9, hex('#f0e8f8')); pset(x + 4, y - 10, hex('#f0e8f8')); const ab = Math.round(Math.sin(t * 5) * 2); poligono([[x + 4, y + 4], [x + 12, y - 2 + ab], [x + 13, y + 6 + ab]], hex('#f0d0e0')); for (let i = 0; i < 3; i++) linea(x + 4, y + 4, x + 12, y + i * 3 - 1 + ab, hex('#c8a0b8')); } }
  // por el pasillo, tras la puerta entreabierta, pasa de vez en cuando un acomodador con su vela (recortado al hueco)
  { const u = (t % 11) / 4; if (u < 1) { R.recorte([208, 54, 221, 140]); const x = Math.round(206 + u * 18); b_luz(R, x, 104, 9, 14, hex('#ffc880'), 0.35); disco(x, 98, 2, hex('#a07a5a')); R.linea(x, 101, x, 114, hex('#2a1a1e')); R.linea(x - 1, 101, x - 1, 114, hex('#2a1a1e')); pset(x + 2, 104, DC.llama); pset(x + 2, 103, DC.llamaL); R.recorte(null); } }
  // en el espejo, las candilejas de la sala que tiemblan
  { R.recorte([130, 46, 182, 86]); for (let i = 0; i < 9; i++) { const x = 133 + i * 6, on = Math.sin(t * 8 + i * 1.7) > -0.2; pset(x, 70, on ? hex('#e8b070') : hex('#8a5a40')); if (on) pset(x, 69, hex('#a8704a')); } R.recorte(null); }
  // las motas que bailan en la luz del escenario
  for (let k = 0; k < 14; k++) { const x = Math.round(60 + h(k, 1, 91) * 120 + Math.sin(t * 0.5 + k) * 4), y = Math.round(40 + ((h(k, 2, 91) * 90 + t * (1.5 + k % 3)) % 90)); if (Math.sin(t * 1.7 + k * 3) > -0.2) pset(x, y, hex('#ffe8c0')); }
  return { suelo: 150, libre: [70, 250], repisa: 146, programa: [204, 133] };
}
// la barandilla del palco (por delante de los personajes): la repisa de terciopelo, el frente dorado con guirnaldas, los
// gemelos de teatro y, con o.programa, el programa con su raya
function d_palcoDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, Y = 146;
  rect(36, Y, 284, 179, DC.oroD); rect(36, Y, 284, Y + 5, DC.rojo); rect(36, Y, 284, Y, DC.rojoL); for (let x = 36; x < 284; x += 3) pset(x, Y + 1, d_mezcla(DC.rojo, DC.rojoL, 0.5)); rect(36, Y + 6, 284, Y + 7, DC.rojoS);
  rect(36, Y + 8, 284, Y + 10, DC.oro); rect(36, Y + 8, 284, Y + 8, DC.oroL); rect(36, Y + 11, 284, Y + 12, DC.oroS);
  // las guirnaldas y los medallones del frente dorado
  for (let x = 44; x < 280; x += 30) { for (let i = 0; i <= 24; i++) { const y = Y + 15 + Math.round(Math.sin(i / 24 * Math.PI) * 7); rect(x + i, y, x + i, y + 2, DC.oro); pset(x + i, y, DC.oroL); } disco(x, Y + 16, 3, DC.oroS); disco(x, Y + 16, 2, DC.oro); pset(x - 1, Y + 15, DC.oroL); }
  for (let y = Y + 26; y < 176; y += 3) for (let x = 38; x < 284; x += 4) pset(x + ((y >> 1) & 1) * 2, y, DC.oroS);
  rect(36, 176, 284, 179, DC.oroS); rect(36, 176, 284, 176, DC.oroL);
  // los gemelos de teatro sobre la repisa
  rect(80, Y - 4, 90, Y, DC.k); disco(82, Y - 3, 2, DC.oroS); disco(88, Y - 3, 2, DC.oroS); pset(81, Y - 4, DC.oroL); pset(87, Y - 4, DC.oroL); rect(84, Y - 4, 86, Y - 3, DC.k);
  let raya = null;
  if (o.programa) raya = d_programa(R, 204, Y - 13, { s: 1, raya: o.raya ?? 0, t, tumbado: true });
  return { raya };
}
// EL PROGRAMA del teatro de 1823 (la escena lo pone en una mano o de cerca, a la escala o.s): una hoja de papel con un
// adorno arriba, la raya gruesa del título, el reparto en dos columnas de rayitas con sus puntos y UNA RAYA LARGA donde
// iría el nombre del monstruo (la 4.ª fila); o.raya 0–1 la hace brillar en amarillo (el gag); o.tumbado: un poco
// inclinado, apoyado; (x, y): la esquina de arriba a la izquierda (24 × 13 en tumbado, 16 × 22 de pie, por s). Devuelve
// la raya [x0, y, x1]
export function d_programa(R, x, y, o = {}) {
  const s = o.s ?? 1, { rect, pset } = R, t = o.t ?? 0;
  const W = o.tumbado ? 24 : 16, H = o.tumbado ? 13 : 22, P = (a, b, c, d, col) => rect(x + a * s, y + b * s, x + c * s + s - 1, y + d * s + s - 1, col), Q = (a, b, col) => P(a, b, a, b, col);
  // la sombra, el papel con su borde y la esquina doblada
  P(1, 1, W, H, d_mezcla(DC.k, DC.rojoS, 0.4)); P(0, 0, W - 1, H - 1, DC.papelD); P(0, 0, W - 2, H - 2, DC.papel); P(W - 3, 0, W - 2, 1, DC.papelS); Q(W - 3, 1, DC.papelD);
  // el adorno de arriba y la raya del título, y la raya de la fecha
  const cx = Math.floor((W - 1) / 2); Q(cx, 1, DC.tinta); Q(cx - 1, 2, DC.tinta); Q(cx + 1, 2, DC.tinta);
  P(2, 3, W - 4, 4, DC.tinta); P(4, 6, W - 6, 6, DC.papelD);
  // el reparto: papeles a la izquierda, puntos, actores a la derecha
  const filas = o.tumbado ? [8, 10, 12] : [9, 11, 13, 15, 17, 19], fm = o.tumbado ? 1 : 3;
  let raya = null;
  filas.forEach((fy, i) => { if (fy > H - 2) return; const der = W - 3, mid = Math.floor(W * 0.55);
    if (i === fm) { // la raya: el nombre del monstruo
      const a = o.raya ?? 0; if (a > 0) P(1, fy - 1, mid - 1, fy + 1, d_mezcla(DC.papel, hex('#ffe060'), Math.min(1, a) * (0.6 + Math.sin(t * 8) * 0.25)));
      P(2, fy, mid - 2, fy, DC.tinta); raya = [x + 2 * s, y + fy * s, x + (mid - 2) * s + s - 1];
    } else { P(2, fy, 3 + ((i * 3) % 4), fy, DC.papelD); P(5 + ((i * 3) % 4), fy, mid - 3, fy, DC.papelD); }
    for (let k = mid - 1; k < mid + 2; k += 2) Q(k, fy, DC.papelS);
    P(mid + 2, fy, der - (i % 2) * 2, fy, DC.papelD); });
  return raya;
}

// la paleta de las piezas (limpia y saturada, para que salgan a color sobre el mundo gris)
const DP = Object.fromEntries(Object.entries({
  k: '#1a1626', blanco: '#ffffff', nube: '#f4f0ff', nubeS: '#c8c0e8', nubeD: '#9a90c8', piel: '#f4c8a0', pielS: '#d0987a',
  rojo: '#e04050', rojoS: '#a82838', rojoL: '#ff8a90', amar: '#ffd040', amarL: '#fff2a0', amarS: '#d89a20',
  verde: '#4ab860', verdeS: '#2e8040', verdeL: '#9ae880', azul: '#3a7ad8', azulS: '#28509a', azulL: '#8ac0ff',
  madera: '#a8703e', maderaS: '#764a26', maderaL: '#d09a5a', cobre: '#e08a4a', cobreL: '#ffc090', cinc: '#a8b0c0', cincL: '#e0e8f0', fieltro: '#7a5a3a',
  roca: '#7a5a4a', rocaS: '#523a30', rocaL: '#a07a62', lava: '#ff7a20', lavaL: '#ffd060', ceniza: '#8a8890', cenizaS: '#5e5c66', cenizaL: '#c0bec8',
  beis: '#e0d4b4', beisS: '#b0a280', beisL: '#f6eed6', pantalla: '#1e4a4a', pantallaL: '#3a7a6a', fosforo: '#9af0b0',
  papel: '#fffaf0', papelS: '#e0d4bc', papelD: '#b8a888', tapa: '#c04a3a', tapaS: '#8a2e24', tinta: '#2a2a48', luz: '#fff0b0',
}).map(([k, v]) => [k, hex(v)]));

// una rejilla de píxeles lógicos a escala s con origen en (x0, y0): p un píxel, r un rectángulo, d un disco, l una línea
// (todo en coordenadas lógicas; b negativo hacia arriba) y sombra la sombra tramada en el suelo
function d_grilla(R, x0, y0, s) {
  const P = (a, b, c) => R.rect(x0 + a * s, y0 + b * s, x0 + a * s + s - 1, y0 + b * s + s - 1, c);
  const r = (a0, b0, a1, b1, c) => R.rect(x0 + Math.min(a0, a1) * s, y0 + Math.min(b0, b1) * s, x0 + Math.max(a0, a1) * s + s - 1, y0 + Math.max(b0, b1) * s + s - 1, c);
  const d = (cx, cy, rr, c) => { for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr + rr * 0.6) P(Math.round(cx) + i, Math.round(cy) + j, c); };
  const l = (a0, b0, a1, b1, c) => { a0 = Math.round(a0); b0 = Math.round(b0); a1 = Math.round(a1); b1 = Math.round(b1); const dx = Math.abs(a1 - a0), dy = -Math.abs(b1 - b0), sx = a0 < a1 ? 1 : -1, sy = b0 < b1 ? 1 : -1; let e = dx + dy; for (;;) { P(a0, b0, c); if (a0 === a1 && b0 === b1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; a0 += sx; } if (e2 <= dx) { e += dx; b0 += sy; } } };
  const sombra = (cx, w, hh = 2) => { for (let j = 0; j <= hh; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / (hh + 0.5)) ** 2 <= 1) for (let q = 0; q < s * s; q++) { const px = x0 + (cx + i) * s + (q % s), py = y0 + j * s + Math.floor(q / s) - s; if (((px + py) & 1) === 0) R.pset(px, py, d_mezcla(R.pget(px, py), DP.k, 0.4)); } };
  return { P, r, d, l, sombra, s, x0, y0 };
}

// un disco lógico con contorno, cuerpo, sombra abajo a la derecha y brillo arriba a la izquierda
function d_bola(G, cx, cy, rr, [c, cS, cL]) { G.d(cx, cy, rr + 1, DP.k); G.d(cx, cy, rr, cS); G.d(cx - 0.5, cy - 0.6, rr - 0.8, c); if (rr > 2) G.d(cx - rr * 0.4, cy - rr * 0.45, rr * 0.3, cL); }

// SUEÑO · la nube con las dos figuritas abrazadas y el «58»
function d_sueno(R, G, t, o, x, y, s) {
  const fl = Math.round(Math.sin(t * 1.6) * 1), B = -14 + fl;   // la nube flota
  G.sombra(0, 12, 1);
  // la cola de puntitos que baja hacia el que sueña
  for (const [a, b, r] of [[-6, -2, 1], [-9, -5, 1.4], [-12, -9 + fl, 2]]) { G.d(a, b, r + 1, DP.k); G.d(a, b, r, DP.nube); }
  // la nube: bolas de contorno, sombra, cuerpo y luz
  const BOL = [[-9, 0, 6], [-2, -4, 8], [7, -2, 7], [12, 2, 5], [3, 4, 6], [-6, 5, 5]];
  for (const [a, b, r] of BOL) G.d(a, B + b, r + 1, DP.k);
  for (const [a, b, r] of BOL) G.d(a, B + b, r, DP.nubeS);
  for (const [a, b, r] of BOL) G.d(a - 0.6, B + b - 0.8, r - 1, DP.nube);
  for (const [a, b, r] of BOL.slice(0, 3)) G.d(a - 2, B + b - 3, r * 0.3, DP.blanco);
  // dentro: las dos figuritas que se abrazan (la mayor, con vestido; la pequeña se arrima y se mece)
  const m = Math.round(Math.sin(t * 2.2) * 0.6), fy = B + 7;
  G.r(-5, fy - 8, -1, fy, DP.azulS); G.r(-5, fy - 8, -2, fy - 1, DP.azul); G.d(-3, fy - 11, 2, DP.pielS); G.d(-3.4, fy - 11.4, 1.6, DP.piel); G.r(-5, fy - 14, -1, fy - 12, DP.maderaS); G.P(-5, fy - 11, DP.maderaS);
  G.r(1 + m, fy - 6, 3 + m, fy, DP.rojoS); G.r(1 + m, fy - 6, 2 + m, fy - 1, DP.rojo); G.d(2 + m, fy - 8, 1.6, DP.pielS); G.d(1.7 + m, fy - 8.4, 1.2, DP.piel); G.r(1 + m, fy - 10, 3 + m, fy - 9, DP.amarS);
  G.r(-2, fy - 7, 1 + m, fy - 7, DP.azul); G.P(1 + m, fy - 7, DP.piel); G.r(-1, fy - 5, 1 + m, fy - 5, DP.rojo); G.P(-1, fy - 5, DP.piel);   // los brazos que se cruzan
  // un corazoncito que sube entre las dos
  { const u = (t * 0.5) % 1, hy = fy - 12 - Math.round(u * 5); if (u < 0.85) { G.P(-1, hy, DP.rojoL); G.P(1, hy, DP.rojoL); G.P(0, hy + 1, DP.rojo); G.r(-1, hy + 0, 1, hy, DP.rojoL); } }
  // estrellitas que parpadean alrededor
  for (let k = 0; k < 4; k++) if (Math.sin(t * 3 + k * 1.7) > 0) { const [a, b] = [[-16, B - 6], [15, B - 8], [18, B + 5], [-15, B + 6]][k]; G.P(a, b, DP.amarL); G.P(a - 1, b, DP.amar); G.P(a + 1, b, DP.amar); G.P(a, b - 1, DP.amar); G.P(a, b + 1, DP.amar); }
  const top = [x, y + (B - 10) * s];
  if (o.numero !== false) R.numero('58', Math.round(x + 16 * s), Math.round(y + (B - 8) * s), { centro: true, tam: 16 });
  return { arriba: top };
}

// VOLCÁN · el volcán que estalla y la nube que da la vuelta al globo
function d_volcan(R, G, t, o, x, y, s) {
  const globo = o.globo !== false, vx = globo ? -10 : 0;
  G.sombra(vx, 20, 2);
  // el cono: ladera iluminada a la izquierda, en sombra a la derecha, con vetas y lava que baja
  for (let b = -20; b <= 0; b++) { const w = Math.round(4 + (b + 20) * 0.85); G.r(vx - w - 1, b, vx + w + 1, b, DP.k); for (let a = -w; a <= w; a++) { const lado = a < -w * 0.2 ? DP.rocaL : a > w * 0.35 ? DP.rocaS : DP.roca; G.P(vx + a, b, (a * 3 + b * 7) % 11 === 0 ? DP.rocaS : lado); } }
  G.r(vx - 4, -21, vx + 4, -21, DP.k); G.r(vx - 3, -20, vx + 3, -20, DP.lava); G.r(vx - 2, -20, vx + 2, -20, DP.lavaL);
  for (const [a0, f] of [[-2, -0.35], [1, 0.3], [3, 0.55]]) for (let b = -19; b < -19 + 14 * (0.6 + 0.4 * Math.sin(t * 1.5 + a0)); b++) { const a = Math.round(vx + a0 + (b + 19) * f); G.P(a, b, (b + Math.floor(t * 6)) % 3 === 0 ? DP.lavaL : DP.lava); }
  // las bocanadas de ceniza que suben, crecen y se abren (tres grises)
  for (let i = 0; i < 6; i++) { const u = (t * 0.35 + i / 6) % 1, cx = vx + Math.sin(i * 2.1 + t * 0.6) * (1 + u * 5) + u * 4, cy = -23 - u * 24, r = 2 + u * 5;
    G.d(cx, cy, r + 1, DP.k); G.d(cx, cy, r, DP.cenizaS); G.d(cx - 0.5, cy - 0.8, r - 1, DP.ceniza); if (r > 3) G.d(cx - r * 0.4, cy - r * 0.4, r * 0.35, DP.cenizaL); }
  G.d(vx, -22, 3, DP.lava); G.d(vx, -23, 2, DP.lavaL);
  // piedrecitas encendidas que saltan
  for (let k = 0; k < 5; k++) { const u = (t * 0.9 + k / 5) % 1, a = vx + (k - 2) * 3 * u * 2.4, b = -22 - Math.sin(u * Math.PI) * (10 + k * 2); G.P(Math.round(a), Math.round(b), u < 0.6 ? DP.lavaL : DP.lava); }
  if (globo) {
    // el globo que gira: el mar, tierras que pasan y el brillo, con la banda de ceniza que le da la vuelta
    const gx = 24, gy = -14, rr = 9;
    const banda = (delante) => { for (let k = 0; k < 26; k++) { const a = k / 26 * Math.PI * 2 + t * 1.2, cz = Math.sin(a); if ((cz > 0) !== delante) continue; const px = gx + Math.cos(a) * (rr + 3), py = gy - 2 + Math.sin(a) * 2.5 + Math.cos(a) * 2; G.P(Math.round(px), Math.round(py) - 1, DP.k); G.P(Math.round(px), Math.round(py), k % 3 === 0 ? DP.cenizaL : delante ? DP.ceniza : DP.cenizaS); G.P(Math.round(px), Math.round(py) + 1, delante ? DP.cenizaS : DP.k); } };
    banda(false);
    G.d(gx, gy, rr + 1, DP.k); G.d(gx, gy, rr, DP.azulS); G.d(gx - 0.5, gy - 0.5, rr - 1, DP.azul);
    for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { if (i * i + j * j > (rr - 1) * (rr - 1)) continue; const lon = Math.asin(Math.max(-1, Math.min(1, i / Math.sqrt(Math.max(1, rr * rr - j * j))))) + t * 0.6, n = Math.sin(lon * 3 + j * 0.3) + Math.sin(lon * 5 - j * 0.5) * 0.6; if (n > 0.7) G.P(gx + i, gy + j, i > 3 ? DP.verdeS : DP.verde); }
    G.d(gx - 4, gy - 4, 2, DP.azulL); G.P(gx - 5, gy - 5, DP.blanco);
    G.r(gx - 1, gy + rr + 1, gx + 1, gy + rr + 3, DP.maderaS); G.r(gx - 5, gy + rr + 4, gx + 5, 0, DP.madera); G.r(gx - 5, 0, gx + 5, 0, DP.maderaS);   // la peana
    banda(true);
  }
  return { arriba: [x + vx * s, y - 48 * s] };
}

// MAÍZ · el campo de maíz verde con la nieve encima, y los copos que caen
function d_maiz(R, G, t, o, x, y, s) {
  G.sombra(0, 26, 2);
  // la tierra del campo con sus surcos y la nieve encima
  G.r(-26, -4, 26, 0, DP.maderaS); for (let a = -26; a <= 26; a += 4) G.r(a, -4, a + 1, 0, DP.madera); G.r(-27, -5, 27, -5, DP.k); G.r(-26, -4, 26, -4, DP.blanco);
  for (let a = -24; a <= 24; a += 3) if ((a * 7) % 5 < 3) G.P(a, -3, DP.blanco);
  // las matas de maíz: el tallo, las hojas, la mazorca y la nieve en las hojas, mecidas por el viento frío
  for (let k = 0; k < 7; k++) { const a = -21 + k * 7, al = 14 + (k % 3) * 2, m = Math.round(Math.sin(t * 1.4 + k) * 0.8);
    G.l(a, -5, a + m, -5 - al, DP.verdeS); G.l(a + 1, -5, a + 1 + m, -5 - al, DP.verde);
    for (let j = 0; j < 3; j++) { const b = -8 - j * 4, d = j % 2 ? 1 : -1; G.l(a + Math.round(m * (j + 1) / 3), b, a + d * 4 + m, b - 2, DP.verde); G.P(a + d * 4 + m, b - 2, DP.blanco); G.P(a + d * 3 + m, b - 2, DP.blanco); }
    G.r(a + 2 + m, -13, a + 3 + m, -9, DP.amar); G.P(a + 2 + m, -13, DP.amarL);
    G.r(a - 1 + m, -6 - al, a + 2 + m, -5 - al, DP.blanco); G.P(a + m, -7 - al, DP.cincL); }
  // los copos de nieve que caen despacio
  for (let k = 0; k < 18; k++) { const u = (t * 0.25 + h(k, 1, 92)) % 1, a = Math.round(-28 + h(k, 2, 92) * 56 + Math.sin(t * 1.5 + k) * 1.5), b = Math.round(-34 + u * 30); G.P(a, b, k % 3 ? DP.blanco : DP.cincL); }
  return { arriba: [x, y - 34 * s] };
}

// GALVANI · la mesa con la pila, los cables y la rana de juguete
function d_galvani(R, G, t, o, x, y, s) {
  const salto = Math.max(0, Math.min(1, o.salto ?? 0));
  G.sombra(0, 26, 2);
  // la mesa: las patas torneadas, el tablero con vetas y su canto
  for (const a of [-22, 20]) { G.r(a, -10, a + 2, 0, DP.k); G.r(a, -10, a + 1, 0, DP.maderaS); G.P(a, -6, DP.madera); G.P(a, -3, DP.madera); }
  G.r(-26, -14, 26, -10, DP.k); G.r(-25, -13, 25, -11, DP.madera); G.r(-25, -13, 25, -13, DP.maderaL); G.r(-25, -11, 25, -11, DP.maderaS); for (let a = -22; a < 24; a += 9) G.r(a, -12, a + 4, -12, DP.maderaS);
  // la pila de Volta: discos de cobre, cinc y fieltro entre tres varillas de vidrio, con su base y su tapa de madera
  const px = -16;
  G.r(px - 5, -16, px + 5, -14, DP.k); G.r(px - 4, -15, px + 4, -15, DP.maderaS);
  for (let i = 0; i < 6; i++) { const b = -17 - i * 3; G.r(px - 4, b - 2, px + 4, b, DP.k); G.r(px - 3, b, px + 3, b, DP.cobre); G.P(px - 3, b, DP.cobreL); G.r(px - 3, b - 1, px + 3, b - 1, DP.cinc); G.P(px - 3, b - 1, DP.cincL); G.r(px - 3, b - 2, px + 3, b - 2, DP.fieltro); }
  G.r(px - 5, -37, px + 5, -35, DP.k); G.r(px - 4, -36, px + 4, -36, DP.madera);
  for (const a of [px - 5, px + 5]) G.r(a, -35, a, -16, DP.cincL);
  // los dos cables: del borne de arriba y del de abajo hasta la rana, con su curva
  const fx = 10, fyB = -14, alto = Math.sin(salto * Math.PI) * 12, rx = fx + Math.round(salto * 4), ry = fyB - Math.round(alto);
  const cable = (a0, b0, a1, b1, c, pandeo) => { let pa = a0, pb = b0; for (let i = 1; i <= 14; i++) { const u = i / 14, a = a0 + (a1 - a0) * u, b = b0 + (b1 - b0) * u + Math.sin(u * Math.PI) * pandeo; G.l(pa, pb, a, b, c); pa = a; pb = b; } };
  cable(px + 5, -36, rx - 4, ry - 3, DP.rojo, -6); cable(px + 5, -17, rx - 4, ry - 1, DP.k, 2);
  G.P(px + 5, -36, DP.amarS); G.P(px + 5, -17, DP.amarS);
  // la chispa al tocar el cable
  if (salto > 0.02 && salto < 0.3) { const c = Math.floor(t * 20) % 2 ? DP.amarL : DP.amar; G.P(rx - 4, ry - 3, DP.blanco); for (const [da, db] of [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -2], [-2, 0]]) G.P(rx - 4 + da, ry - 3 + db, c); }
  // LA RANA DE JUGUETE de hojalata: cuerpo verde con remaches, tripa amarilla, ojos saltones y la llave de cuerda
  { const a = rx, b = ry, aire = salto > 0.05 && salto < 0.95, gk = Math.floor(t * 3) % 2;
    if (!aire) G.sombra(a - (x - x), 5, 1);
    // las patas de atrás (dobladas o estiradas en el aire)
    if (aire) { G.l(a - 4, b - 1, a - 9, b + 2, DP.k); G.l(a - 4, b - 2, a - 9, b + 1, DP.verdeS); G.r(a - 10, b + 1, a - 8, b + 2, DP.verde); }
    else { G.r(a - 6, b - 3, a - 3, b, DP.k); G.r(a - 5, b - 2, a - 3, b - 1, DP.verdeS); G.r(a - 7, b, a - 3, b, DP.verde); }
    G.r(a - 5, b - 6, a + 4, b - 1, DP.k); G.r(a - 4, b - 5, a + 3, b - 2, DP.verde); G.r(a - 4, b - 5, a + 3, b - 5, DP.verdeL); G.r(a - 3, b - 2, a + 3, b - 2, DP.amar);
    G.P(a - 2, b - 4, DP.cincL); G.P(a + 1, b - 4, DP.cincL); G.r(a - 4, b - 3, a + 3, b - 3, DP.verdeS);   // los remaches y la junta de la hojalata
    // las patas de delante
    G.r(a + 2, b - 1, a + 4, b, DP.k); G.P(a + 3, b - 1, DP.verde);
    // la cabeza con los ojos saltones
    G.r(a + 2, b - 8, a + 6, b - 4, DP.k); G.r(a + 3, b - 7, a + 5, b - 5, DP.verde); G.P(a + 6, b - 5, DP.rojo);
    G.d(a + 3, b - 8, 1, DP.k); G.P(a + 3, b - 8, DP.blanco); G.d(a + 5, b - 8, 1, DP.k); G.P(a + 5, b - 8, DP.blanco); G.P(a + 5 + (aire ? 0 : 0), b - 9 + (aire ? 0 : 0), DP.k);
    // la llave de cuerda en el lomo, que gira
    G.r(a - 2, b - 8, a - 1, b - 6, DP.amarS); if (gk) { G.r(a - 4, b - 9, a + 1, b - 9, DP.amar); G.P(a - 4, b - 10, DP.amar); G.P(a + 1, b - 10, DP.amar); } else { G.r(a - 2, b - 11, a - 1, b - 9, DP.amar); G.P(a - 2, b - 11, DP.amarL); }
    if (aire) for (let k = 0; k < 3; k++) G.P(a - 10 - k * 2, b + 4 + k, DP.cincL);   // las rayitas del salto
  }
  // un frasco y un papel con rayitas en la mesa, para el laboratorio antiguo
  G.r(19, -20, 23, -14, DP.k); G.r(20, -19, 22, -15, DP.azulL); G.r(20, -17, 22, -15, DP.azul); G.r(20, -22, 22, -20, DP.k); G.P(20, -19, DP.blanco);
  return { arriba: [x, y - 38 * s], rana: [x + rx * s, y + (ry - 6) * s] };
}

// PELOTA · la pantalla antigua con el juego de la pelota y el corazón que se agrieta
function d_pelota(R, G, t, o, x, y, s) {
  const grieta = Math.max(0, Math.min(1, o.grieta ?? 0)), mx = -8;
  G.sombra(0, 26, 2);
  // el monitor beis de tubo: la caja, la pantalla abombada, los botones y el pie
  G.r(mx - 5, -3, mx + 5, 0, DP.k); G.r(mx - 4, -2, mx + 4, -1, DP.beisS);
  G.r(mx - 17, -31, mx + 17, -3, DP.k); G.r(mx - 16, -30, mx + 16, -4, DP.beis); G.r(mx - 16, -30, mx + 16, -30, DP.beisL); G.r(mx + 15, -30, mx + 16, -4, DP.beisS); G.r(mx - 16, -5, mx + 16, -4, DP.beisS);
  G.r(mx - 14, -28, mx + 13, -9, DP.k); G.r(mx - 13, -27, mx + 12, -10, DP.pantalla);
  for (let b = -27; b <= -10; b += 2) G.r(mx - 13, b, mx + 12, b, DP.pantallaL);   // las líneas del tubo
  G.P(mx - 12, -26, DP.fosforo); G.P(mx - 11, -26, DP.pantallaL);
  G.r(mx + 8, -7, mx + 9, -6, DP.verde); G.P(mx + 11, -7, DP.beisS); G.P(mx + 13, -7, DP.beisS); for (let a = mx - 14; a < mx; a += 2) G.P(a, -6, DP.beisS);
  // dentro, en verde fósforo: tres figuritas que se pasan la pelota y la cuarta, apartada y cabizbaja
  const fig = (a, b, c, cab = 0) => { G.d(a, b - 6 + cab, 1, c); G.r(a, b - 4, a, b - 2, c); G.P(a - 1, b - 3, c); G.P(a + 1, b - 3, c); G.P(a - 1, b, c); G.P(a + 1, b, c); G.P(a, b - 1, c); };
  const F = [[mx - 9, -12], [mx - 1, -12], [mx - 5, -18]];
  F.forEach(([a, b]) => fig(a, b, DP.fosforo)); fig(mx + 9, -12, DP.pantallaL, 1);
  { const u = (t * 0.9) % 3, i = Math.floor(u), f = u - i, [a0, b0] = F[i], [a1, b1] = F[(i + 1) % 3]; const a = a0 + (a1 - a0) * f, b = b0 - 4 + (b1 - b0) * f - Math.sin(f * Math.PI) * 4; G.P(Math.round(a), Math.round(b), DP.blanco); }
  // EL CORAZÓN que se agrieta: dos mitades, con la grieta en zigzag y, al final, las mitades que se separan
  const hx = 18, hy = -16, sep = grieta >= 1 ? 1 : 0;
  const forma = (i, j) => { const X = i / 7, Y = -j / 7 + 0.2; return (X * X + Y * Y - 0.45) ** 3 - X * X * Y * Y * Y < 0; };
  for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { if (!forma(i, j)) continue; const izq = i < Math.round(Math.sin(j * 1.3) * 1.2); const a = hx + i + (izq ? -sep : sep);
    const borde = !forma(i - 1, j) || !forma(i + 1, j) || !forma(i, j - 1) || !forma(i, j + 1); G.P(a, hy + j, borde ? DP.k : i > 2 && j > -2 ? DP.rojoS : (i < -2 && j < -2) ? DP.rojoL : DP.rojo); }
  if (grieta > 0) { const n = Math.round(grieta * 14); for (let k = 0; k < n; k++) { const j = -6 + k, i = Math.round(Math.sin(j * 1.3) * 1.2); if (forma(i, j)) G.P(hx + i, hy + j, DP.k); } }
  G.P(hx - 4 - sep, hy - 4, DP.blanco);
  return { arriba: [x, y - 32 * s] };
}

// CUADERNO · el cuaderno que se escribe solo y su luz (y la cajita de la luz)
function d_cuaderno(R, G, t, o, x, y, s) {
  const escrito = o.escrito ?? ((t * 0.12) % 1), caja = !!o.caja, cx = caja ? -12 : 0;
  // la luz cálida que sale de las páginas (halo tramado) y las chispas que suben
  R.halo(Math.round(x + cx * s), Math.round(y - 12 * s), 22 * s, [d_mezcla(DP.luz, hex('#a08060'), 0.6), d_mezcla(DP.luz, hex('#c0a070'), 0.3)], 0.8);
  G.sombra(cx, 22, 2);
  // las tapas rojas y las dos páginas, un poco abombadas, con el lomo en sombra
  G.r(cx - 21, -6, cx + 21, -1, DP.k); G.r(cx - 20, -5, cx + 20, -2, DP.tapa); G.r(cx - 20, -2, cx + 20, -2, DP.tapaS);
  for (let a = -19; a <= 19; a++) { const abomb = Math.round(Math.sin((Math.abs(a) / 19) * Math.PI) * 1.5), top = -17 - abomb; G.P(cx + a, top - 1, DP.k); G.r(cx + a, top, cx + a, -4, Math.abs(a) < 2 ? DP.papelS : DP.papel); G.P(cx + a, -3, DP.papelD); }
  G.r(cx, -18, cx, -3, DP.papelD);
  // las rayitas que se escriben solas: una a una, y la pluma que sigue a la última
  const L = []; for (let p = 0; p < 2; p++) for (let f = 0; f < 6; f++) L.push([cx + (p ? 3 : -17), -15 + f * 2, p ? 14 - (f % 3) * 2 : 13 - (f % 2) * 3]);
  const total = L.length * escrito; let pluma = null;
  L.forEach(([a, b, w], i) => { const v = Math.max(0, Math.min(1, total - i)); if (v <= 0) return; const n = Math.round(w * v); for (let k = 0; k < n; k++) if ((k * 5 + i) % 7 !== 3) G.P(a + k, b, DP.tinta); if (v < 1) pluma = [a + n, b]; });
  if (pluma) { const [a, b] = pluma, m = Math.round(Math.sin(t * 14) * 0.6); G.l(a, b - 1 + m, a + 5, b - 9 + m, DP.k); G.l(a + 1, b - 2 + m, a + 6, b - 10 + m, DP.papel); G.l(a + 2, b - 4 + m, a + 6, b - 8 + m, DP.nubeS); G.P(a, b + m, DP.tinta); }
  // la cinta del marcapáginas que asoma
  G.r(cx + 6, -2, cx + 7, 2, DP.rojo); G.P(cx + 6, 2, DP.rojoS);
  // las chispas de luz que suben de las páginas
  for (let k = 0; k < 8; k++) { const u = (t * 0.4 + k / 8) % 1, a = Math.round(cx - 14 + h(k, 1, 93) * 28 + Math.sin(t * 2 + k) * 1.5), b = Math.round(-19 - u * 16); if (u < 0.9) { G.P(a, b, u < 0.5 ? DP.amarL : DP.amar); if (u < 0.3) G.P(a, b - 1, DP.luz); } }
  if (caja) {
    // la cajita de madera con la tapa abierta hacia atrás y la luz que sale en rayos
    const bx = 30; G.sombra(bx, 9, 1);
    G.r(bx - 8, -20, bx + 8, -10, DP.k); G.r(bx - 7, -19, bx + 7, -11, DP.maderaS); G.r(bx - 7, -19, bx + 7, -19, DP.madera); G.r(bx - 5, -17, bx + 5, -13, DP.madera); G.P(bx, -15, DP.amarS);   // la tapa abierta, de pie detrás
    for (let k = 0; k < 5; k++) { const a = -0.9 + k * 0.45 + Math.sin(t * 1.5 + k) * 0.05, L2 = 10 + Math.round(Math.sin(t * 3 + k * 2) * 2); for (let i = 3; i < L2; i++) if ((i + Math.floor(t * 8)) % 3) G.P(Math.round(bx + Math.sin(a) * i), Math.round(-10 - Math.cos(a) * i), i < 6 ? DP.amarL : DP.amar); }
    G.r(bx - 8, -10, bx + 8, 0, DP.k); G.r(bx - 7, -9, bx + 7, -1, DP.madera); G.r(bx - 7, -9, bx + 7, -9, DP.maderaL); G.r(bx - 7, -1, bx + 7, -1, DP.maderaS); G.r(bx - 7, -5, bx + 7, -5, DP.maderaS); G.P(bx, -6, DP.amarS);
    G.r(bx - 7, -11, bx + 7, -10, DP.amarL);
  }
  return { arriba: [x + cx * s, y - 36 * s] };
}

// la paleta de Italia: el yeso, las tejas, el barro cocido, el golfo, los olivos y los pinos, Lerici
const e_P = pal({
  yeso: '#eee8dc', yesoL: '#fbf8f0', yesoM: '#e3dccd', yesoS: '#cfc6b4', yesoD: '#aaa08e', yesoO: '#8a8270',
  teja: '#c0643e', tejaS: '#8e4630', tejaL: '#dc8a5e', tejaD: '#6a3424',
  cotto: '#c27c54', cottoS: '#a2603e', cottoL: '#d8946a', cottoJ: '#7e4630',
  almagre: '#a85a42', almagreS: '#84442f', almagreL: '#c2765a',
  persiana: '#4e7e5c', persianaS: '#34583f', persianaL: '#76a282',
  piedra: '#b4a68c', piedraS: '#8c8068', piedraL: '#d2c6aa',
  bal: '#e6decd', balS: '#bab09a', balD: '#958b76', balL: '#f8f4ea',
  olivo: '#8a9a6a', olivoS: '#5e7048', olivoL: '#b0bc90', muro: '#a49880', muroS: '#7e745e',
  monte: '#6c8a4a', monteS: '#55723a', monteD: '#3e5a2c', monteL: '#86a25a', tierra: '#a08a5e',
  pino: '#2e4a2e', pinoL: '#4a6a3e', pinoS: '#1e3420', tronco: '#5a4232', cipres: '#24402a', cipresL: '#3a5a38',
  lejos0: '#a6b8cc', lejos1: '#8ea2ba', lejos2: '#7a90aa', lejosL: '#c4d0dc',
  ocre: '#e2b26e', ocreS: '#b88a4e', rosa: '#e2a08c', rosaS: '#b87a68', amar: '#ead088', amarS: '#c0a460', blC: '#eee6d6', blCS: '#c4baa6',
  tejado: '#b05a3c', tejadoS: '#844232', cast: '#bcac90', castS: '#968a70', castL: '#d6caae', castD: '#74684f',
  mar0: '#86bcd8', mar1: '#62a2c8', mar2: '#4a8aba', mar3: '#3474a2', mar4: '#265e8a', mar5: '#1c4c74', marL: '#b4dcee', marB: '#eef8fc',
  madera: '#8a5a36', maderaS: '#64402a', maderaL: '#aa7a4e', maderaD: '#432a1c', maderaV: '#9a6a42',
  casco: '#3a4a6a', cascoL: '#5a6c8c', cascoR: '#a8482e', vela: '#efe4c8', velaS: '#c8b894', velaD: '#a49674',
  limon: '#f0d040', limonS: '#c8a828', hoja: '#3e7a3a', hojaS: '#2a5a2a', hojaL: '#66a24e', hojaD: '#1e4220', geranio: '#e04848', geranioL: '#ff8070', geranioS: '#a82c34',
  laton: '#c8a040', latonL: '#f4dc8c', latonS: '#8a6a28',
  arena: '#e2c99a', arenaS: '#c8ae80', arenaL: '#f2e2bc', arenaM: '#b0946a', arenaH: '#9c8466', arenaW: '#a8967a',
  luz: '#ffd890', luzL: '#fff4c8', luzS: '#e8a048', luzD: '#b87830',
  tela: '#f4eee0', telaS: '#d2c8b0', manta: '#b8cce0', mantaS: '#8aa2bc', mantaL: '#dce8f2', manta2: '#e8c8c8', manta2S: '#c09a9a',
  papel: '#f2ead4', papelS: '#cfc2a2', tinta: '#2a2838', lomo1: '#8a3a3a', lomo2: '#3a5a7a', lomo3: '#6a7a3a', lomo4: '#7a5a8a', lomo5: '#b08a3a',
  roca: '#605c66', rocaS: '#403c48', rocaL: '#827e88', rocaD: '#2c2a32', espuma: '#eaf2f6', espumaS: '#b4c4d0',
  mimbre: '#c8a46a', mimbreS: '#9a7a48', mimbreL: '#e0c28a', oscuro: '#2a2630', oscuroS: '#1c1a22',
  piel: '#e8b48a', ropa1: '#4a5a7a', ropa2: '#8a4a3a', ropa3: '#e8e0d0', pelo: '#3a2a1e',
});

// el tramado ordenado 4 × 4 (umbral entre 0 y 1 en (x, y))
const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_um = (x, y) => e_B4[((y & 3) << 2) | (x & 3)];

const e_lim = (u) => Math.max(0, Math.min(1, u));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function e_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

const e_rgb = (r, g, b) => (0xff000000 | (Math.max(0, Math.min(255, Math.round(b))) << 16) | (Math.max(0, Math.min(255, Math.round(g))) << 8) | Math.max(0, Math.min(255, Math.round(r)))) >>> 0;

const e_cs = (c) => [c & 255, (c >>> 8) & 255, (c >>> 16) & 255];

// la luz de cada hora sobre un color de día: el ocaso (cálido, con las sombras moradas), la noche (azul y oscura); el
// cielo gris (lavado) y la tormenta (apagada)
const e_LUZ = {
  ocaso: (c) => { const [r, g, b] = e_cs(c), l = (r + g + b) / 765; return e_mez(c, e_rgb(r * 0.86 + 34 * l + 12, g * 0.66 + 10, b * 0.52 + 26 + 18 * (1 - l)), 0.45); },
  noche: (c) => { const [r, g, b] = e_cs(c); return e_rgb(r * 0.26 + 12, g * 0.3 + 16, b * 0.42 + 30); },
  gris: (c) => e_mez(c, hex('#6e7484'), 0.24),
  tormenta: (c) => e_mez(c, hex('#30364a'), 0.46),
};

const e_TN = new Map();

// la función de tinte (con caché) para hora y cielo
function e_tn(hora, cielo) {
  const k = hora + '|' + cielo; let f = e_TN.get(k);
  if (!f) {
    const fs = []; if (cielo === 'gris' || cielo === 'tormenta') fs.push(e_LUZ[cielo]); if (hora === 'ocaso' || hora === 'noche') fs.push(e_LUZ[hora]);
    if (!fs.length) f = (c) => c;
    else { const cache = new Map(); f = (c) => { let v = cache.get(c); if (v === undefined) { v = c; for (const g of fs) v = g(v); cache.set(c, v); } return v; }; }
    e_TN.set(k, f);
  }
  return f;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]
function e_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = e_um(x, y) < p ? b : a;
  }
}

const e_hx = (P) => P.map(([f, c]) => [f, hex(c)]);

const e_CIELOS = {
  dia: e_hx([[0, '#3c84d0'], [0.22, '#5098dc'], [0.45, '#6cb0e8'], [0.66, '#8ec4ee'], [0.84, '#b4d8f0'], [0.96, '#d8eaf0']]),
  ocaso: e_hx([[0, '#2e2e66'], [0.2, '#4a3c7c'], [0.4, '#7a4c84'], [0.58, '#b0607c'], [0.74, '#de7c6a'], [0.88, '#f2a464'], [0.97, '#f8cc7c']]),
  noche: e_hx([[0, '#070a1a'], [0.3, '#0c122c'], [0.6, '#141c40'], [0.84, '#1e2850'], [0.96, '#2a345c']]),
  gris: e_hx([[0, '#586070'], [0.26, '#687082'], [0.52, '#7c8494'], [0.76, '#9198a6'], [0.94, '#a8aeb8']]),
  nocheGris: e_hx([[0, '#0c0f18'], [0.4, '#141822'], [0.75, '#1c2230'], [0.95, '#262c3a']]),
  tormenta: e_hx([[0, '#14171f'], [0.3, '#1c2029'], [0.55, '#252a35'], [0.78, '#323845'], [0.94, '#424a58']]),
};

// los tres tonos de las nubes (sombra, cuerpo, luz) según la hora y el cielo
const e_NUBES = Object.fromEntries(Object.entries({
  dia: ['#a6cce8', '#d6ecfa', '#ffffff'], ocaso: ['#7a4a7e', '#d47a7a', '#ffc48a'], noche: ['#161e3c', '#242e52', '#56648e'],
  gris: ['#646c7c', '#7e8696', '#9aa0ae'], nocheGris: ['#10141e', '#181e2a', '#262c3a'], tormenta: ['#101219', '#1a1e27', '#2e3442'],
}).map(([k, v]) => [k, v.map(hex)]));

const e_clCielo = (hora, cielo) => (cielo === 'tormenta' ? 'tormenta' : cielo === 'gris' ? (hora === 'noche' ? 'nocheGris' : 'gris') : hora);

// el cielo fijo: el degradado, y el sol o la luna con su halo (y0–y1 de pantalla; astro [x, y])
function e_cielo(R, y0, y1, hora, cielo, astro) {
  const cl = e_clCielo(hora, cielo); e_degradado(R, y0, y1, e_CIELOS[cl]);
  if (!astro || cielo === 'tormenta') return;
  const [ax, ay] = astro, B = R.buf;
  if (cielo === 'gris') { if (hora !== 'noche') for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j); const x = ax + i, y = ay + j; if (d < 16 && y >= y0 && y < y1 && e_um(x, y) < (1 - d / 16) * 0.5) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#c8ccd4'), 0.5); } return; }
  const halo = hora === 'dia' ? [hex('#e4f2fa'), 22, 0.55] : hora === 'ocaso' ? [hex('#ffd890'), 34, 0.7] : [hex('#3a4672'), 26, 0.6];
  for (let j = -halo[1]; j <= halo[1]; j++) for (let i = -halo[1]; i <= halo[1]; i++) { const d = Math.hypot(i, j * (hora === 'ocaso' ? 1.6 : 1)), x = ax + i, y = ay + j; if (x < 0 || x > 319 || y < y0 || y >= y1 || d > halo[1]) continue; const u = 1 - d / halo[1]; if (e_um(x, y) < u * halo[2]) B[y * 320 + x] = e_mez(B[y * 320 + x], halo[0], 0.45 + u * 0.3); }
  if (hora === 'dia') { R.disco(ax, ay, 8, hex('#fff6d0')); R.disco(ax, ay, 7, hex('#fffbe8')); R.disco(ax - 2, ay - 2, 3, hex('#ffffff')); }
  else if (hora === 'ocaso') { R.disco(ax, ay, 10, hex('#f8a050')); R.disco(ax, ay, 9, hex('#ffc060')); R.disco(ax - 1, ay - 2, 6, hex('#ffe08a')); R.disco(ax - 2, ay - 3, 3, hex('#fff2c0'));
    for (let k = 0; k < 4; k++) { const y = ay - 2 + k * 3; for (let x = ax - 12; x <= ax + 12; x++) if ((x + k) % 7 > 1) R.pset(x, y, hex('#e88a5a')); } }
  else { R.disco(ax, ay, 6, hex('#e8ecf6')); R.disco(ax + 2, ay - 1, 5, e_CIELOS.noche[1][1]); R.pset(ax - 3, ay + 1, hex('#c8d0e4')); R.pset(ax - 2, ay - 2, hex('#c8d0e4')); }
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. dibuja
// recibe dos marcas: s1() tras pintar el cielo y s2() tras pintar el mar; así la máscara m sabe dónde se ve el cielo
// (1) y dónde el agua (2), para pintar nubes, pájaros, barcas y brillos solo por detrás de lo demás. Luego se tiñe a
// la hora (todo menos el cielo) y luces() pinta encima lo que brilla (ventanas, faroles), sin teñir
const e_capas = new Map();

function e_capa(R, clave, tn, dibuja, luces) {
  let c = e_capas.get(clave); if (c) return c;
  const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(57600);
  let s1 = null, s2 = null;
  const info = dibuja(() => (s1 = b.slice()), () => (s2 = b.slice())) || {};
  for (let i = 0; i < 57600; i++) { if (s2 && b[i] === s2[i]) m[i] = s1 && b[i] === s1[i] ? 1 : 2; else if (!s2 && s1 && b[i] === s1[i]) m[i] = 1; }
  for (let i = 0; i < 57600; i++) if (m[i] !== 1) b[i] = tn(b[i]);
  if (luces) luces();
  R.usar(prev); c = { b, m, info }; e_capas.set(clave, c); return c;
}

// pset solo donde la máscara deja (cielo o agua: lo que está detrás de todo lo demás)
const e_psM = (B, m, x, y, c, solo = 0) => { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; const v = m[y * 320 + x]; if (v && (!solo || v === solo)) B[y * 320 + x] = c; };

function e_discoM(B, m, cx, cy, r, c, solo = 0) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx, v = m[f + x]; if (dx * dx + dy * dy <= r2 && v && (!solo || v === solo)) B[f + x] = c; } }
}

// cúmulo de tres tonos con la base plana, solo en el cielo; ap < 1 lo aplasta (estratos)
function e_nubeM(B, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) e_discoM(B, m, x, y + 1, r, c[0], 1);
  for (const [x, y, r] of bolas) e_discoM(B, m, x, y, r, c[1], 1);
  for (const [x, y, r] of bolas) e_discoM(B, m, x - 1, y - 2, r * 0.66, c[2], 1);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { e_psM(B, m, x, y0, c[0], 1); e_psM(B, m, x, y0 + 1, c[0], 1); if (Math.abs(x - cx) < w * 0.4) e_psM(B, m, x, y0 - 1, c[1], 1); }
}

// jirón de nube de tormenta (elipse de borde deshilachado): cuerpo oscuro, borde de arriba más claro; luz: el relámpago
function e_jironM(B, m, cx, cy, rx, ry, sem, c0, c1, c2) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) { const f = y * 320, dy = (y - cy) / ry;
    for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) { if (m[f + x] !== 1) continue; const e = ((x - cx) / rx) ** 2 + dy * dy + (h((x - cx) >> 2, y >> 1, sem) - 0.5) * 0.55;
      if (e < 1) B[f + x] = e > 0.74 ? (dy < 0 ? c2 : c0) : dy > 0.3 ? c0 : c1; } }
}

// el cielo que se mueve: de día, cirros altos casi quietos y cúmulos de tres tonos en tres alturas a distinta velocidad;
// con cielo gris, estratos en dos capas; de noche, estrellas que titilan; con tormenta, jirones en tres capas (los
// lejanos despacio, los bajos deprisa) que un relámpago lejano enciende por dentro. Devuelve el destello (0–1)
function e_nubes(R, t, m, hor, hora, cielo, ventana = null) {
  const B = R.buf, cl = e_clCielo(hora, cielo), cn = e_NUBES[cl], X0 = ventana ? ventana[0] : 0, X1 = ventana ? ventana[2] : 320, W = X1 - X0;
  const atom = (x, y) => !ventana && x > 272 && y < 48;
  if (hora === 'noche' && cielo !== 'tormenta') for (let k = 0; k < (ventana ? 24 : 90); k++) { const x = Math.round(X0 + h(k, 1, 701) * W), y = Math.round((ventana ? ventana[1] : 0) + h(k, 2, 701) ** 1.4 * (hor - (ventana ? ventana[1] : 0) - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 701) * 2.2) + k * 1.7); if (tw > -0.3) e_psM(B, m, x, y, tw > 0.55 ? hex('#ffffff') : hex('#8a94c0'), 1); if (k % 11 === 0 && tw > 0.85) { e_psM(B, m, x + 1, y, hex('#6a74a0'), 1); e_psM(B, m, x - 1, y, hex('#6a74a0'), 1); } }
  if (cielo === 'tormenta') {
    const k = Math.floor(t / 3.7), u = t - k * 3.7 - 1.1, fl = u > 0 && u < 0.45 ? (u < 0.08 || (u > 0.18 && u < 0.26) ? 1 : 0.4) : 0, lx = 40 + h(k, 1, 702) * 240, ly = hor * 0.55;
    const l1 = hex('#4a5266'), l2 = hex('#8a94ac');
    // tres capas de jirones: lejos (bajos, despacio), medio, y los bajos que corren por delante
    const capas = [[9, Math.round(hor * 0.72), 26, 7, 1.2], [7, Math.round(hor * 0.42), 46, 12, 2.6], [6, Math.round(hor * 0.16), 60, 16, 4.2], [5, Math.round(hor * 0.6), 34, 6, 9]];
    for (let c = 0; c < capas.length; c++) { const [n, y, rx, ry, v] = capas[c];
      for (let i = 0; i < n; i++) { const x = ((h(i, c, 703) * 460 + t * v) % 460) - 70, yy = y + (h(i, c, 704) - 0.5) * ry * 1.4, d = Math.hypot(x - lx, yy - ly), luz = fl * Math.max(0, 1 - d / 130);
        const c1 = luz > 0.5 ? l1 : c === 3 ? cn[1] : cn[c % 2 ? 1 : 0], c2 = luz > 0.3 ? l2 : cn[2];
        e_jironM(B, m, x, yy, rx * (0.7 + h(i, c, 705) * 0.6), ry, i + c * 17, cn[0], c1, c2); } }
    return fl;
  }
  if (cielo === 'gris') {
    for (let k = 0; k < 10; k++) { const capa = k % 3, w = 60 + Math.round(h(k, 9, 706) * 60) + capa * 16, y = (ventana ? ventana[1] + 4 : 10) + capa * (ventana ? 9 : 22) + Math.round(h(k, 10, 706) * 8), x = X0 + ((h(k, 11, 706) * (W + 200) + t * (1.2 + capa * 1.3)) % (W + 200)) - 100;
      e_nubeM(B, m, x, y, ventana ? w * 0.5 : w, k + 11, capa === 2 ? [cn[0], cn[0], cn[1]] : cn, 0.6); }
    return 0;
  }
  // cirros en hebras, muy altos y casi quietos
  if (!ventana) for (let k = 0; k < 4; k++) { const w = 40 + Math.round(h(k, 5, 707) * 50), x0 = ((h(k, 6, 707) * 440 + t * (0.5 + k * 0.2)) % 480) - 90, y = 18 + k * 8 + Math.round(h(k, 7, 707) * 5);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI), yy = y - Math.round((i / w) ** 2 * 4); if (atom(x, yy) || h(i >> 2, k, 708) < 0.22) continue; e_psM(B, m, x, yy, e > 0.4 ? cn[1] : cn[0], 1); if (e > 0.6 && i % 3) e_psM(B, m, x + 2, yy - 1, cn[2], 1); } }
  const s = ventana ? 0.5 : 1, ya = ventana ? ventana[1] : 0, hh = hor - ya;
  for (let k = 5; k >= 0; k--) { const cerca = k < 2, w = (cerca ? 30 + k * 12 : 14 + ((k * 7) % 10)) * s, vv = (cerca ? 2.6 + k * 0.8 : 0.9 + k * 0.25) * (ventana ? 0.6 : 1), y = ya + (cerca ? 0.3 + k * 0.12 : 0.55 + (k - 2) * 0.09) * hh, x = X0 + ((h(k, 8, 707) * (W + 160) + t * vv) % (W + 160)) - 80;
    e_nubeM(B, m, x, y, w, k + 3, cn); }
  return 0;
}

// gaviotas que planean y baten las alas (en el cielo o sobre el agua); n, zona [x0, y0, x1, y1]
function e_gaviotas(R, t, m, n, zona, tn, sem = 0) {
  const B = R.buf, c = tn(hex('#f4f4f0')), cS = tn(hex('#8a909c'));
  for (let k = 0; k < n; k++) { const v = 5 + h(k, 1, 710 + sem) * 6, W = zona[2] - zona[0] + 40, x = Math.round(zona[0] - 20 + ((h(k, 2, 710 + sem) * W + t * v * (k % 2 ? 1 : -1)) % W + W) % W), y = Math.round(zona[1] + h(k, 3, 710 + sem) * (zona[3] - zona[1]) + Math.sin(t * 0.7 + k) * 3);
    if (x > 272 && y < 48) continue;
    const a = Math.sin(t * (5 + k) + k * 2), arriba = a > 0.3, abajo = a < -0.3;
    e_psM(B, m, x, y, c); e_psM(B, m, x, y + 1, cS);
    for (const s of [-1, 1]) { e_psM(B, m, x + s, y + (arriba ? -1 : 0), c); e_psM(B, m, x + 2 * s, y + (arriba ? -2 : abajo ? 1 : 0), arriba ? c : cS); if (!abajo) e_psM(B, m, x + 3 * s, y + (arriba ? -2 : 0), cS); }
  }
}

// los brillos del agua: guiones claros que corren y titilan (y0–y1), y el camino del sol o de la luna (ax)
function e_brillos(R, t, m, y0, y1, hora, cielo, ax, n = 150) {
  const B = R.buf, cl = hora === 'noche' ? [hex('#4a5a86'), hex('#9aa8d0')] : hora === 'ocaso' ? [hex('#e89a78'), hex('#ffd49a')] : cielo === 'gris' ? [hex('#8c96a2'), hex('#b0b8c2')] : [hex('#8ec8e6'), hex('#e8f6fc')];
  for (let k = 0; k < n; k++) { const u = h(k, 1, 720) ** 1.5, y = Math.round(y0 + u * (y1 - y0)), L = 1 + Math.round(u * 4 + h(k, 2, 720) * 2), x = Math.round(((h(k, 3, 720) * 360 + t * (1.5 + u * 3) * (k % 2 ? 1 : -1)) % 360 + 360) % 360 - 20), on = Math.sin(t * (1.6 + h(k, 4, 720) * 2.4) + k);
    if (on < -0.2) continue; const c = on > 0.6 ? cl[1] : cl[0]; for (let i = 0; i < L; i++) e_psM(B, m, x + i, y, c, 2); }
  if (ax == null || cielo === 'gris' || cielo === 'tormenta') return;
  const cc = hora === 'noche' ? [hex('#c8d0ec'), hex('#ffffff')] : hora === 'ocaso' ? [hex('#ffb060'), hex('#fff0b0')] : [hex('#d8f0fa'), hex('#ffffff')];
  for (let y = y0; y < y1; y++) { const u = (y - y0) / (y1 - y0 + 1), w = 3 + u * 18; for (let k = 0; k < 3; k++) { const s = h(y, k, 721), x = Math.round(ax + (s - 0.5) * 2 * w + Math.sin(t * 2 + y * 0.7 + k) * 2), on = Math.sin(t * 3.1 + y * 1.3 + k * 2.1);
    if (on < 0 || (y & 1 && u > 0.4)) continue; const L = 1 + Math.round(u * 3); for (let i = 0; i < L; i++) e_psM(B, m, x + i, y, on > 0.7 ? cc[1] : cc[0], 2); } }
}

// barca de pescadores con vela latina (s: escala 0,4–1), cabeceando en el agua; solo donde la máscara deja (cielo o
// agua). luz: de noche, el farolito de proa
function e_barca(R, m, x, y, t, k, tn, s = 1, luz = false) {
  const B = R.buf, cab = Math.sin(t * 1.4 + k * 2) * 0.8, yy = y + Math.round(cab), L = Math.max(5, Math.round(16 * s)), Hv = Math.max(5, Math.round(17 * s));
  const casco = tn(k % 2 ? e_P.casco : e_P.cascoR), cascoL = tn(k % 2 ? e_P.cascoL : hex('#c8704e')), borda = tn(e_P.yesoL), vela = tn(e_P.vela), velaS = tn(e_P.velaS), palo = tn(e_P.maderaD);
  // el casco: curvo, con la franja clara de la borda y la proa alta
  for (let i = 0; i < L; i++) { const u = i / (L - 1), prof = Math.max(1, Math.round((s > 0.6 ? 3 : 2) * Math.sin(Math.PI * (0.15 + u * 0.7)))), sube = (u > 0.86 ? 1 : 0) + (u < 0.06 ? 1 : 0);
    e_psM(B, m, x + i, yy - 1 - sube, borda); for (let j = 0; j < prof; j++) e_psM(B, m, x + i, yy + j, j === 0 ? cascoL : casco); }
  // el reflejo, roto
  for (let i = 1; i < L - 1; i += 2) e_psM(B, m, x + i + Math.round(Math.sin(t * 3 + i) * 1), yy + (s > 0.6 ? 4 : 2), tn(hex('#2a4a6a')), 2);
  // el palo inclinado y la vela latina (un triángulo con la antena larga), con el viento que la hincha
  const mx = x + Math.round(L * 0.45), my = yy - 2, hinch = Math.sin(t * 0.9 + k) * 0.6;
  for (let j = 0; j < Hv * 0.75; j++) e_psM(B, m, mx, my - j, palo);
  const ax0 = mx - Math.round(L * 0.45), ay0 = my - 1, ax1 = mx + Math.round(L * 0.35), ay1 = my - Hv;
  for (let j = 0; j <= Hv; j++) { const yv = my - j, u = j / Hv, xi = Math.round(ax0 + (ax1 - ax0) * u), xd = mx + Math.round((1 - u) * L * 0.05 + hinch * (1 - Math.abs(u - 0.5) * 2) * 2);
    for (let xv = Math.min(xi, xd); xv <= Math.max(xi, xd); xv++) e_psM(B, m, xv, yv, (xv - xi) < 2 ? velaS : vela); }
  R.linea(ax0, ay0, ax1, ay1, (xx, yy2) => { e_psM(B, m, xx, yy2, palo); return null; });
  if (luz) { e_psM(B, m, x + L - 1, yy - 3, hex('#ffe8a0')); e_psM(B, m, x + L - 1, yy + 3, hex('#c89a50'), 2); }
}

// un bote a remo con su pescador (figurita de 6 px) que rema
function e_bote(R, m, x, y, t, tn) {
  const B = R.buf, r = Math.sin(t * 2.2), yy = y + Math.round(Math.sin(t * 1.3) * 0.6), cas = tn(e_P.madera), casL = tn(e_P.maderaL), bor = tn(e_P.maderaS);
  for (let i = 0; i < 12; i++) { const p = i < 1 || i > 10 ? 1 : 2; e_psM(B, m, x + i, yy - 1, casL); for (let j = 0; j < p; j++) e_psM(B, m, x + i, yy + j, j ? bor : cas); }
  for (let i = 1; i < 11; i += 2) e_psM(B, m, x + i, yy + 3, tn(hex('#2a4a6a')), 2);
  // el pescador: sombrero de paja, camisa, brazos que van y vienen con los remos
  const px = x + 5 + (r > 0 ? 1 : 0); e_psM(B, m, px, yy - 2, tn(e_P.ropa3)); e_psM(B, m, px + 1, yy - 2, tn(e_P.ropa3)); e_psM(B, m, px, yy - 3, tn(e_P.ropa3)); e_psM(B, m, px + 1, yy - 3, tn(hex('#c8b8a0')));
  e_psM(B, m, px, yy - 4, tn(e_P.piel)); e_psM(B, m, px + 1, yy - 4, tn(e_P.piel)); for (let i = -1; i <= 2; i++) e_psM(B, m, px + i, yy - 5, tn(hex('#e8d08a')));
  const ex = Math.round(r * 3); R.linea(px + 1, yy - 3, x + 6 + ex, yy + 2, (a, b) => { e_psM(B, m, a, b, tn(e_P.maderaS)); return null; });
  e_psM(B, m, x + 6 + ex, yy + 2, tn(hex('#eaf4f8')), 2); if (r < 0) e_psM(B, m, x + 7 + ex, yy + 2, tn(hex('#eaf4f8')), 2);
}

// humo de chimenea que sube y se deshace con el viento
function e_humo(R, t, m, x, y, tn, n = 6, c = hex('#d8d4cc'), sube = 18) {
  const B = R.buf, cS = e_mez(c, hex('#8a8a90'), 0.4);
  for (let k = 0; k < n; k++) { const u = ((t * 0.32 + k / n) % 1), px = x + u * 14 + Math.sin(t * 1.3 + k * 2) * 1.5, py = y - u * sube, r = 1 + u * 2.2; if (h(k, Math.floor(t * 0.32 + k / n), 730) < 0.15) continue;
    for (let j = -2; j <= 2; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= r * r && e_um(Math.round(px + i), Math.round(py + j)) < 0.85 - u * 0.7) e_psM(B, m, px + i, py + j, tn(j < 0 ? c : cS), 1); }
}

// árboles del monte: un olivo (copa gris verdosa, con su sombra) y un pino piñonero (copa en paraguas, tronco torcido)
function e_olivo(R, x, y, s, sem) {
  const r = 2 + s; R.disco(x + 1, y + 1, r, e_P.olivoS); R.disco(x, y, r, e_P.olivo);
  for (let k = 0; k < 4 + s * 2; k++) R.pset(x - r + Math.round(h(k, sem, 740) * r * 2), y - r + Math.round(h(k, sem, 741) * r * 1.4), k % 2 ? e_P.olivoL : e_P.olivoS);
  R.pset(x, y + r, e_P.tronco); R.pset(x, y + r + 1, e_P.tronco); R.pset(x + 2, y + r + 1, e_P.monteD); R.pset(x + 3, y + r + 1, e_P.monteD);
}

function e_pino(R, x, y, alto, ancho, sem) {
  for (let j = 0; j < alto; j++) { const xx = x + Math.round(Math.sin(j * 0.25 + sem) * 1.2); R.pset(xx, y - j, e_P.tronco); if (j < alto * 0.6) R.pset(xx + 1, y - j, hex('#3e2c20')); }
  const cy = y - alto, cx = x + Math.round(Math.sin(alto * 0.25 + sem) * 1.2);
  for (let i = -ancho; i <= ancho; i++) { const e = 1 - (i / (ancho + 1)) ** 2, top = Math.round(3 + e * 3 + h(i, sem, 742) * 1.4); for (let j = 0; j < top; j++) R.pset(cx + i, cy - j + 1, j === top - 1 ? e_P.pinoL : j === 0 ? e_P.pinoS : h(i, j + sem, 743) < 0.25 ? e_P.pinoL : e_P.pino); }
}

function e_cipres(R, x, y, alto) {
  for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.max(0, Math.round(Math.sin(Math.PI * Math.min(1, u * 1.15 + 0.08)) * 2.6 - u)); for (let i = -w; i <= w; i++) R.pset(x + i, y - j, i < 0 ? e_P.cipresL : i > 0 && i === w ? hex('#18301c') : e_P.cipres); }
}

// el monte de detrás: ladera con bancales de olivos (muretes de piedra seca), pinos y cipreses; perfil(x) da la cresta
function e_monte(R, x0, x1, perfil, yBase, sem, densidad = 1) {
  for (let x = x0; x <= x1; x++) { const top = Math.round(perfil(x)); for (let y = Math.max(0, top); y <= yBase; y++) { const u = (y - top) / Math.max(1, yBase - top), n = h(x >> 1, y >> 1, sem);
    R.pset(x, y, y === top ? e_P.monteL : n < 0.18 ? e_P.monteS : n > 0.9 ? e_P.monteL : u > 0.75 && n < 0.4 ? e_P.monteS : e_P.monte); } }
  // bancales: muretes que siguen la ladera
  for (let b = 0; b < 8; b++) { const off = 6 + b * 7; for (let x = x0; x <= x1; x++) { const y = Math.round(perfil(x) + off + Math.sin(x * 0.05 + b) * 1.5); if (y > yBase) continue; if (h(x >> 2, b, sem + 1) < 0.12) continue; R.pset(x, y, e_P.muro); R.pset(x, y + 1, e_P.muroS); } }
  // olivos en hileras
  for (let k = 0; k < 70 * densidad; k++) { const x = Math.round(x0 + h(k, 1, sem + 2) * (x1 - x0)), top = perfil(x), y = Math.round(top + 4 + h(k, 2, sem + 2) * (yBase - top - 4)); if (y > yBase - 2) continue; e_olivo(R, x, y, y - top > 20 ? 1 : 0, k + sem); }
}

// Lerici al fondo: el promontorio con su castillo, las casas de colores escalonadas hasta el agua, el campanario y el
// muelle con barcas (x: el pie del promontorio a la izquierda; base: la línea del agua; s: escala 1 o 0,6)
function e_lerici(R, x, base, s = 1) {
  const X = (v) => Math.round(x + v * s), Y = (v) => Math.round(base - v * s);
  // la roca del promontorio
  R.poligono([[X(0), Y(0)], [X(10), Y(6)], [X(22), Y(14)], [X(30), Y(24)], [X(48), Y(26)], [X(64), Y(18)], [X(90), Y(14)], [X(110), Y(10)], [X(110), Y(0)]], (xx, yy) => (h(xx >> 1, yy, 750) < 0.3 ? e_P.castS : h(xx, yy, 751) < 0.12 ? e_P.monteD : e_P.monteS));
  // el castillo: muralla con almenas, la torre redonda y la torre cuadrada
  const cx0 = X(28), cx1 = X(62), cyb = Y(22), cyt = Y(30);
  R.rect(cx0, cyt, cx1, cyb, e_P.cast); for (let xx = cx0; xx <= cx1; xx++) { if ((xx - cx0) % 3 === 0) R.pset(xx, cyt - 1, e_P.cast); R.pset(xx, cyb, e_P.castS); if (h(xx, 1, 752) < 0.3) R.pset(xx, cyt + 2, e_P.castS); }
  const tx = X(40), tw = Math.round(7 * s), tt = Y(42);
  R.rect(tx, tt, tx + tw, cyt, e_P.castL); R.rect(tx + tw - Math.max(1, Math.round(2 * s)), tt, tx + tw, cyt, e_P.castS); for (let xx = tx; xx <= tx + tw; xx += 2) R.pset(xx, tt - 1, e_P.castL); R.pset(tx + 2, tt + 3, e_P.castD); R.pset(tx + 2, tt + 4, e_P.castD);
  const rx = X(54), rt = Y(38); R.rect(rx, rt, rx + Math.round(6 * s), cyt, e_P.cast); R.rect(rx, rt, rx + 1, cyt, e_P.castL); for (let xx = rx; xx <= rx + Math.round(6 * s); xx += 2) R.pset(xx, rt - 1, e_P.cast);
  for (let yy = cyt; yy < cyb; yy++) if (yy % 3 === 0) for (let xx = cx0 + 1; xx < cx1; xx += 5) R.pset(xx + (yy % 2), yy, e_P.castS);
  // las casas: fachadas de colores con sus ventanas, tejados, del agua hacia arriba
  const cols = [[e_P.ocre, e_P.ocreS], [e_P.rosa, e_P.rosaS], [e_P.amar, e_P.amarS], [e_P.blC, e_P.blCS], [e_P.ocre, e_P.ocreS], [e_P.rosa, e_P.rosaS]];
  for (let k = 0; k < 26; k++) { const fila = k % 3, xx = X(4 + ((k * 23) % 104)), w = Math.round((7 + (k % 4) * 2) * s), hh = Math.round((8 + (k % 3) * 3) * s), yb = Y(1 + fila * 6 + (xx > X(30) && xx < X(64) ? 6 : 0)), [c, cS] = cols[k % cols.length];
    if (xx + w > X(110)) continue;
    R.rect(xx, yb - hh, xx + w, yb, c); R.rect(xx + w, yb - hh, xx + w, yb, cS); R.rect(xx - 1, yb - hh - 1, xx + w + 1, yb - hh, k % 2 ? e_P.tejado : e_P.tejadoS);
    for (let j = yb - hh + 2; j < yb - 1; j += Math.max(2, Math.round(3 * s))) for (let i = xx + 1; i < xx + w; i += Math.max(2, Math.round(3 * s))) R.pset(i, j, k % 3 ? e_P.persianaS : hex('#3a3440')); }
  // el campanario
  const bx = X(78); R.rect(bx, Y(26), bx + Math.round(4 * s), Y(6), e_P.blC); R.rect(bx + Math.round(3 * s), Y(26), bx + Math.round(4 * s), Y(6), e_P.blCS); R.pset(bx + 1, Y(22), hex('#3a3440')); R.rect(bx - 1, Y(28), bx + Math.round(5 * s), Y(26), e_P.tejado); R.pset(bx + 2, Y(30), e_P.tejado); R.pset(bx + 2, Y(29), e_P.tejado);
  // el muelle de piedra
  R.rect(X(-4), base - 1, X(30), base + 1, e_P.piedra); for (let xx = X(-4); xx <= X(30); xx += 3) R.pset(xx, base + 1, e_P.piedraS);
}

// colinas lejanas al otro lado del golfo, veladas por la calima, con pueblitos blancos
function e_lejanas(R, x0, x1, base, alto, sem) {
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), top = Math.round(base - alto * (0.45 + 0.35 * Math.sin(u * 5 + sem) + 0.2 * Math.sin(u * 13 + sem * 2))); for (let y = top; y < base; y++) R.pset(x, y, y === top ? e_P.lejosL : (y - top) > alto * 0.5 && e_um(x, y) < 0.5 ? e_P.lejos1 : e_P.lejos0); }
  for (let k = 0; k < 10; k++) { const x = Math.round(x0 + h(k, 1, sem) * (x1 - x0)), y = base - 2 - Math.round(h(k, 2, sem) * 3); R.pset(x, y, e_P.lejosL); R.pset(x + 1, y, hex('#eef0f2')); }
}

// el mar fijo, de y0 a y1: degradado del horizonte (claro) a lo hondo, con vetas horizontales tramadas
function e_marFijo(R, y0, y1, sem = 0, gris = false) {
  const P = gris ? e_hx([[0, '#a8aeb8'], [0.06, '#8e96a2'], [0.25, '#76808e'], [0.55, '#646e7e'], [1, '#525c6c']]) : e_hx([[0, '#a6d0e4'], [0.06, '#86bcd8'], [0.2, '#62a2c8'], [0.45, '#4a8aba'], [0.72, '#3474a2'], [1, '#265e8a']]);
  e_degradado(R, y0, y1, P);
  const B = R.buf;
  for (let y = y0 + 1; y < y1; y++) { const u = (y - y0) / (y1 - y0), per = 6 + u * 22; for (let x = 0; x < 320; x++) { const n = h(Math.floor(x / per), y, 760 + sem); if (n < 0.16) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#1c4c74'), 0.35); else if (n > 0.9) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#b4dcee'), 0.3); } }
}

// suelo de barro cocido en perspectiva (baldosas con su junta, tonos y desgaste) entre y0 e y1, punto de fuga vx
function e_cotto(R, x0, x1, y0, y1, vx, vy, sem) {
  const filas = []; let y = y0, alto = 2; while (y < y1) { filas.push([y, Math.min(y1, y + alto)]); y += alto + 1; alto = Math.min(9, alto + 1); }
  for (const [ya, yb] of filas) { for (let yy = ya; yy <= yb; yy++) for (let x = x0; x <= x1; x++) {
    // la junta vertical converge al punto de fuga
    const k = (x - vx) * (y0 - vy) / (yy - vy) + vx, col = Math.floor((k - x0) / 14), fx = ((k - x0) % 14 + 14) % 14;
    const junta = yy === yb || fx < (14 * (yy - vy) / (y0 - vy)) / 14 * 1.0;
    const n = h(col, ya, sem), ruido = h(x >> 1, yy, sem + 1);
    R.pset(x, yy, junta ? e_P.cottoJ : yy === ya ? e_P.cottoL : n < 0.3 ? (ruido < 0.2 ? e_P.cottoJ : e_P.cottoS) : n > 0.8 ? (ruido < 0.15 ? e_P.cottoS : e_P.cottoL) : ruido < 0.08 ? e_P.cottoS : e_P.cotto); } }
}

// pared de yeso encalado con su textura: manchas suaves, poros, grietas finas y algún desconchón con la piedra
function e_yeso(R, x0, y0, x1, y1, sem, base = e_P.yeso) {
  const B = R.buf, M = e_P.yesoM, S = e_P.yesoS;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const g = h(x >> 3, y >> 3, sem) * 0.6 + h(x >> 1, y >> 1, sem + 1) * 0.4, n = h(x, y, sem + 2);
    B[y * 320 + x] = n < 0.035 ? S : g > 0.62 && e_um(x, y) < (g - 0.62) * 3 ? M : g < 0.22 && e_um(x, y) < (0.22 - g) * 2.5 ? e_P.yesoL : base; }
}

function e_grieta(R, x, y, L, sem) { let xx = x, yy = y; for (let i = 0; i < L; i++) { R.pset(xx, yy, e_P.yesoD); if (i % 3 === 0) R.pset(xx + 1, yy, e_P.yesoS); yy++; xx += h(i, sem, 770) < 0.35 ? -1 : h(i, sem, 771) < 0.4 ? 1 : 0; } }

function e_desconchon(R, x, y, w, hh, sem) {
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const e = ((i - w / 2) / (w / 2)) ** 2 + ((j - hh / 2) / (hh / 2)) ** 2 + (h(i, j, sem) - 0.5) * 0.5; if (e > 1) continue;
    R.pset(x + i, y + j, e > 0.75 ? e_P.yesoD : (j + (i >> 2)) % 3 === 0 ? e_P.piedraS : (i + j * 2) % 7 < 4 ? e_P.piedra : e_P.piedraL); }
}

// ventana de fachada con marco de piedra, cristales en cuarterones, persianas verdes abiertas y su alféizar; luz: encendida
function e_ventana(R, x, y, w, hh, luz, macetas = false) {
  R.rect(x - 2, y - 2, x + w + 2, y + hh + 1, e_P.yesoL); R.rect(x + w + 1, y - 1, x + w + 2, y + hh + 1, e_P.yesoS);
  R.rect(x, y, x + w, y + hh, luz ? e_P.luz : hex('#2c3644'));
  for (let j = y; j <= y + hh; j++) for (let i = x; i <= x + w; i++) { const d = (i - x) + (j - y); if (luz) { if (e_um(i, j) < (j - y) / hh * 0.5) R.pset(i, j, e_P.luzS); } else if (d % 11 < 2 && j < y + hh * 0.6) R.pset(i, j, hex('#5a6a80')); else if ((j - y) < 2) R.pset(i, j, hex('#1c222c')); }
  const mx = x + Math.round(w / 2); R.rect(mx, y, mx, y + hh, e_P.yesoL); for (let j = y + Math.round(hh / 3); j < y + hh; j += Math.round(hh / 3)) R.rect(x, j, x + w, j, e_P.yesoL);
  // persianas abiertas a los lados, con sus lamas
  for (const [px, s] of [[x - 3 - Math.round(w / 2), -1], [x + w + 3, 1]]) { const pw = Math.round(w / 2); R.rect(px, y - 1, px + pw, y + hh + 1, e_P.persiana); for (let j = y; j <= y + hh; j += 2) R.rect(px + 1, j, px + pw - 1, j, e_P.persianaS); R.rect(s > 0 ? px + pw : px, y - 1, s > 0 ? px + pw : px, y + hh + 1, e_P.persianaL); R.rect(px + Math.round(pw / 2), y + Math.round(hh / 2), px + Math.round(pw / 2), y + Math.round(hh / 2), e_P.latonS); }
  // el alféizar con su sombra y la mancha de lluvia debajo
  R.rect(x - 3, y + hh + 2, x + w + 3, y + hh + 3, e_P.piedraL); R.rect(x - 3, y + hh + 4, x + w + 3, y + hh + 4, e_P.yesoD);
  for (let i = x; i <= x + w; i += 3) for (let j = 0; j < 4 + (i % 4); j++) if (e_um(i, j) < 0.5) R.pset(i, y + hh + 5 + j, e_P.yesoM);
  if (macetas) for (let k = 0; k < 3; k++) { const mx2 = x + 1 + k * Math.round(w / 3); R.rect(mx2, y + hh - 1, mx2 + 3, y + hh + 1, e_P.teja); R.pset(mx2 + 3, y + hh, e_P.tejaS); for (let i = 0; i < 6; i++) R.pset(mx2 - 1 + (i % 5), y + hh - 2 - (i % 3 === 0 ? 1 : 0), i % 2 ? e_P.geranio : e_P.hoja); R.pset(mx2 + 1, y + hh - 4, e_P.geranioL); }
}

// limonero en su maceta de barro: copa redonda con hojas en tres tonos y limones
function e_limonero(R, x, base, alto, sem) {
  R.poligono([[x - 7, base - 10], [x + 7, base - 10], [x + 5, base], [x - 5, base]], (xx, yy) => (xx > x + 3 ? e_P.tejaS : xx < x - 4 ? e_P.tejaL : e_P.teja)); R.rect(x - 8, base - 12, x + 8, base - 10, e_P.tejaL); R.rect(x - 8, base - 10, x + 8, base - 10, e_P.tejaD);
  for (let i = -5; i <= 5; i += 2) R.pset(x + i, base - 6, e_P.tejaS);
  for (let j = 0; j < alto - 18; j++) R.pset(x + (j % 7 === 3 ? 1 : 0), base - 12 - j, e_P.tronco);
  const cy = base - alto + 9; R.disco(x + 1, cy + 1, 10, e_P.hojaD); R.disco(x, cy, 10, e_P.hoja);
  for (let k = 0; k < 70; k++) { const a = h(k, sem, 780) * 6.28, r = Math.sqrt(h(k, sem, 781)) * 9.5, px = Math.round(x + Math.cos(a) * r), py = Math.round(cy + Math.sin(a) * r); R.pset(px, py, py < cy - 2 && px < x + 3 ? e_P.hojaL : py > cy + 4 ? e_P.hojaS : k % 3 ? e_P.hoja : e_P.hojaL); }
  for (let k = 0; k < 7; k++) { const px = Math.round(x - 7 + h(k, sem, 782) * 14), py = Math.round(cy - 5 + h(k, sem, 783) * 12); R.pset(px, py, e_P.limon); R.pset(px + 1, py, e_P.limon); R.pset(px, py + 1, e_P.limonS); R.pset(px + 1, py - 1, hex('#fff0a0')); }
}

// balaustrada de piedra: pasamanos, balaustres torneados (de botella) y zócalo; pilares en pil; sombra de cada balaustre
function e_balaustrada(R, x0, x1, y0, y1, pil, paso = 7) {
  const alto = y1 - y0, perfil = (j) => { const u = j / (alto - 6); return u < 0.12 ? 2 : u < 0.22 ? 1 : u < 0.62 ? 1 + Math.round(Math.sin((u - 0.22) / 0.4 * Math.PI) * 1.6) : u < 0.8 ? 1 : 2; };
  for (let x = x0 + 3; x < x1 - 2; x += paso) { if (pil.some((p) => x > p - 6 && x < p + 8)) continue;
    for (let j = 3; j < alto - 3; j++) { const w = perfil(j - 3); for (let i = -w; i <= w; i++) R.pset(x + i, y0 + j, i === -w ? e_P.balL : i === w ? e_P.balD : i === w - 1 && w > 1 ? e_P.balS : e_P.bal); } }
  R.rect(x0, y0, x1, y0 + 2, e_P.bal); R.rect(x0, y0, x1, y0, e_P.balL); R.rect(x0, y0 + 3, x1, y0 + 3, e_P.balD);
  R.rect(x0, y1 - 3, x1, y1, e_P.balS); R.rect(x0, y1 - 3, x1, y1 - 3, e_P.balL);
  for (let x = x0; x <= x1; x++) if (h(x >> 1, 3, 790) < 0.12) R.pset(x, y0 + 1, e_P.balS);
  for (const p of pil) { R.rect(p - 3, y0 - 3, p + 5, y1, e_P.bal); R.rect(p - 3, y0 - 3, p - 3, y1, e_P.balL); R.rect(p + 4, y0 - 2, p + 5, y1, e_P.balD); R.rect(p - 4, y0 - 4, p + 6, y0 - 3, e_P.balL); R.rect(p - 4, y0 - 2, p + 6, y0 - 2, e_P.balS); R.rect(p - 1, y0 + 3, p + 2, y1 - 4, e_P.balS); R.rect(p - 1, y0 + 3, p + 2, y0 + 3, e_P.balD); }
}

// el catalejo de latón en su trípode de madera (patas en base)
function e_catalejo(R, x, base, tn = (c) => c) {
  const m = tn(e_P.maderaS), mL = tn(e_P.maderaL);
  R.linea(x, base - 18, x - 7, base, m); R.linea(x + 1, base - 18, x + 8, base, m); R.linea(x, base - 18, x + 1, base - 1, mL); R.linea(x - 6, base - 1, x - 6, base, tn(e_P.maderaD));
  R.rect(x - 2, base - 21, x + 3, base - 18, tn(e_P.latonS));
  // el tubo apunta al mar, con sus tres tramos
  const tubo = [[x - 6, base - 22, x + 4, base - 25, 2], [x + 4, base - 25, x + 12, base - 28, 1], [x + 12, base - 28, x + 17, base - 30, 1]];
  for (const [a, b, c, d, g] of tubo) for (let k = -g; k <= g - (g > 1 ? 1 : 0); k++) R.linea(a, b + k, c, d + k, k === -g ? tn(e_P.latonL) : k === g - (g > 1 ? 1 : 0) && g > 1 ? tn(e_P.latonS) : tn(e_P.laton));
  R.rect(x - 7, base - 24, x - 6, base - 20, tn(e_P.latonS)); R.pset(x + 17, base - 30, tn(hex('#8ac0e0')));
}

function e_casa(R, t, o) {
  const hora = o.hora ?? 'dia', cielo = o.cielo ?? (o.calma ? 'gris' : 'claro'), tn = e_tn(hora, cielo), HOR = 98;
  const sol = hora === 'dia' ? [206, 28] : hora === 'ocaso' ? [214, 90] : [212, 30];
  const noche = hora === 'noche', tarde = hora === 'ocaso';
  const c = e_capa(R, 'casa|' + hora + '|' + cielo, tn, (s1, s2) => {
    e_cielo(R, 0, HOR, hora, cielo, sol); s1();
    e_marFijo(R, HOR, 180, 1);
    // el reflejo de Lerici en el agua (fijo; los brillos van encima)
    for (let y = HOR; y < HOR + 10; y++) for (let x = 232; x < 320; x++) if (e_um(x, y) < 0.42 - (y - HOR) * 0.04) R.pset(x, y, x % 9 < 4 ? e_mez(e_P.ocre, e_P.mar2, 0.5) : e_mez(e_P.monteS, e_P.mar3, 0.5));
    s2();
    e_lejanas(R, 120, 236, HOR, 12, 3);
    e_lerici(R, 228, HOR, 1);
    // el monte de detrás de la casa, de la cresta (y 30) al agua
    const perfil = (x) => 30 + x * 0.12 + (x > 130 ? (x - 130) * 1.05 : 0) + Math.sin(x * 0.11) * 3;
    e_monte(R, 0, 196, perfil, HOR, 800, 1.2);
    for (const [px, al, an] of [[30, 13, 7], [64, 16, 8], [96, 12, 6], [128, 13, 7], [146, 10, 6]]) { const top = perfil(px); e_pino(R, px, Math.round(top + 6), al, an, px); }
    for (const [px, al] of [[50, 16], [56, 12], [160, 12], [174, 9]]) { const top = perfil(px); e_cipres(R, px, Math.round(top + 8), al); }
    // una casita de campo en la ladera, con su camino
    R.rect(158, 76, 168, 85, e_P.ocre); R.rect(166, 76, 168, 85, e_P.ocreS); R.rect(156, 74, 170, 75, e_P.tejado); R.rect(157, 73, 169, 73, e_P.tejadoS); R.pset(161, 79, hex('#3a3440')); R.pset(164, 79, hex('#3a3440')); R.rect(162, 82, 163, 85, e_P.maderaS);
    for (let k = 0; k < 14; k++) R.pset(169 + k, Math.round(perfil(169 + k) + 2 + k * 0.2), e_P.tierra);
    // ── la casa: el tejado de tejas árabes con su alero ──
    R.rect(8, 40, 158, 49, e_P.teja);
    for (let y = 40; y <= 49; y++) for (let x = 8; x <= 158; x++) { const cc = (x + (y >> 1)) % 4; R.pset(x, y, y === 40 ? e_P.tejaL : cc === 0 ? e_P.tejaS : cc === 1 ? e_P.tejaL : h(x, y, 801) < 0.08 ? e_P.tejaD : e_P.teja); }
    for (let x = 8; x <= 158; x += 4) { R.rect(x, 48, x + 2, 50, e_P.tejaL); R.pset(x + 1, 50, e_P.tejaD); R.pset(x + 3, 49, e_P.tejaD); }
    for (let x = 30; x <= 120; x += 23) for (let k = 0; k < 3; k++) R.pset(x + k * 7 + 2, 43 + (k % 2), hex('#7a8a5a'));   // musgo entre las tejas
    // la chimenea
    R.rect(122, 30, 131, 41, e_P.yesoM); R.rect(129, 30, 131, 41, e_P.yesoS); R.rect(120, 28, 133, 30, e_P.teja); R.rect(120, 28, 133, 28, e_P.tejaL); R.rect(124, 32, 127, 33, e_P.yesoO);
    // la fachada encalada, con la sombra del alero
    e_yeso(R, 14, 51, 152, 138, 802);
    for (let x = 14; x <= 152; x++) { R.pset(x, 51, e_P.yesoD); R.pset(x, 52, e_P.yesoS); if (e_um(x, 53) < 0.5) R.pset(x, 53, e_P.yesoS); }
    // esquineras de piedra a la derecha
    for (let y = 52; y < 138; y += 6) { const w = (y / 6) % 2 ? 6 : 4; R.rect(152 - w, y, 152, y + 4, e_P.piedraL); R.rect(152 - w, y + 5, 152, y + 5, e_P.piedraS); R.pset(152 - w, y + 2, e_P.piedra); }
    // la imposta entre plantas
    R.rect(12, 96, 154, 99, e_P.yesoL); R.rect(12, 99, 154, 100, e_P.yesoS); R.rect(14, 101, 152, 101, e_P.yesoD);
    // las ventanas de arriba (una con geranios) y la de abajo con las persianas
    e_ventana(R, 34, 62, 14, 24, false, true); e_ventana(R, 96, 62, 14, 24, false);
    e_ventana(R, 32, 108, 14, 22, false);
    // la puerta vidriera de la terraza, abierta: el hueco oscuro con su montante de abanico
    R.rect(96, 102, 124, 138, e_P.yesoL); R.rect(123, 103, 124, 138, e_P.yesoS);
    R.rect(98, 104, 122, 138, hex('#262a34')); for (let y = 104; y < 138; y++) for (let x = 98; x <= 122; x++) if (e_um(x, y) < (y - 104) / 60) R.pset(x, y, hex('#3a3440'));
    for (let a = 0; a <= 12; a++) { const an = Math.PI * a / 12; R.linea(110, 112, 110 + Math.round(Math.cos(an) * 11), 112 - Math.round(Math.sin(an) * 7), e_P.yesoL); }
    R.rect(98, 112, 122, 113, e_P.yesoL);
    // las dos hojas abiertas hacia dentro, en perspectiva, con sus cristales
    for (const [a, s] of [[98, 1], [122, -1]]) for (let j = 114; j < 138; j++) { for (let i = 0; i < 4; i++) R.pset(a + s * i, j, i === 0 ? e_P.persianaS : (j - 114) % 6 === 0 ? e_P.persianaS : i === 3 ? e_P.persiana : hex('#5a7a90')); }
    // un interior que se adivina: el respaldo de una silla y un cuadro
    R.rect(104, 120, 106, 136, e_P.maderaS); R.rect(104, 120, 112, 121, e_P.maderaS); R.rect(112, 118, 118, 123, e_P.maderaS); R.rect(113, 119, 117, 122, hex('#5a6a7a'));
    R.rect(96, 137, 124, 138, e_P.piedra);
    // el farol de la pared, con su brazo de hierro
    R.rect(130, 106, 136, 106, e_P.oscuro); R.rect(136, 106, 136, 108, e_P.oscuro); R.rect(133, 108, 139, 116, e_P.oscuro); R.rect(134, 110, 138, 115, hex('#4a5060')); R.rect(132, 107, 140, 107, e_P.oscuro); R.pset(136, 117, e_P.oscuro);
    // desconchones, grietas y manchas de humedad
    e_desconchon(R, 20, 120, 8, 6, 803); e_desconchon(R, 66, 76, 7, 5, 804); e_desconchon(R, 140, 58, 6, 4, 805);
    e_grieta(R, 58, 102, 9, 806); e_grieta(R, 128, 54, 7, 807); e_grieta(R, 82, 118, 6, 808);
    for (let x = 14; x <= 152; x++) for (let y = 128; y < 138; y++) if (e_um(x, y) < (y - 128) / 22 * (0.6 + h(x >> 2, 1, 809) * 0.6)) R.pset(x, y, e_P.yesoM);
    // el banco de piedra contra la pared, con un cojín y un libro
    R.rect(54, 128, 90, 130, e_P.piedraL); R.rect(54, 131, 90, 131, e_P.piedraS); R.rect(56, 132, 59, 138, e_P.piedra); R.rect(85, 132, 88, 138, e_P.piedra); R.rect(56, 132, 56, 138, e_P.piedraL);
    R.rect(60, 125, 70, 128, e_P.manta); R.rect(60, 125, 70, 125, e_P.mantaL); R.rect(70, 126, 70, 128, e_P.mantaS);
    R.rect(76, 126, 82, 128, e_P.lomo1); R.rect(76, 126, 82, 126, hex('#b05050')); R.rect(77, 127, 81, 127, e_P.papel);
    // ── la terraza: la balaustrada del fondo con el mar detrás, el suelo de barro cocido ──
    e_balaustrada(R, 152, 304, 120, 138, [156, 228, 300]);
    e_limonero(R, 142, 140, 34, 1);
    // macetas de geranios sobre los pilares
    for (const px of [228]) { R.rect(px - 3, 110, px + 5, 116, e_P.teja); R.rect(px - 3, 110, px + 5, 110, e_P.tejaL); R.rect(px + 4, 111, px + 5, 116, e_P.tejaS); for (let k = 0; k < 16; k++) R.pset(px - 4 + Math.round(h(k, 1, 810) * 10), 104 + Math.round(h(k, 2, 810) * 6), k % 3 === 0 ? e_P.geranio : k % 3 === 1 ? e_P.hoja : e_P.hojaL); R.pset(px, 103, e_P.geranioL); R.pset(px + 3, 105, e_P.geranioL); }
    e_cotto(R, 0, 319, 138, 156, 160, 40, 811);
    // la sombra de la balaustrada sobre el suelo, y la de la casa
    for (let y = 138; y < 146; y++) for (let x = 152; x < 304; x++) if ((x - (y - 138) * 2) % 7 < 3 && e_um(x, y) < 0.6) R.pset(x, y, e_P.cottoJ);
    // el borde de la terraza: cornisa con su sombra
    R.rect(0, 156, 319, 157, e_P.yesoL); R.rect(0, 158, 319, 160, e_P.yesoM); R.rect(0, 161, 319, 161, e_P.yesoD);
    for (let x = 0; x < 320; x += 4) R.pset(x, 159, e_P.yesoS);
    // ── los arcos de la planta baja, en sombra, con el agua que entra ──
    e_yeso(R, 0, 162, 319, 179, 812, e_P.yesoS);
    for (let k = 0; k < 7; k++) { const cx = 22 + k * 46, r = 15; for (let y = 164; y < 180; y++) for (let x = cx - r; x <= cx + r; x++) { const dy = Math.max(0, 172 - y); if ((x - cx) ** 2 + (dy * 1.9) ** 2 > r * r) continue; const d = Math.sqrt((x - cx) ** 2 + (dy * 1.9) ** 2);
        R.pset(x, y, d > r - 1.2 ? e_P.yesoD : y > 174 ? e_P.mar5 : e_um(x, y) < 0.3 ? hex('#2a2a32') : hex('#1e1e26')); }
      // dentro, la proa de una barca varada y unos remos apoyados
      if (k % 2 === 0) { R.rect(cx - 8, 172, cx + 4, 174, e_P.maderaS); R.rect(cx + 4, 171, cx + 6, 173, e_P.maderaS); R.rect(cx - 8, 172, cx + 4, 172, e_P.madera); } else { R.linea(cx + 6, 166, cx + 9, 178, e_P.maderaS); R.linea(cx + 8, 166, cx + 11, 178, e_P.maderaS); }
      R.rect(cx - r, 162, cx - r + 1, 179, e_P.yesoL); }
    for (let x = 0; x < 320; x++) { if (R.pget(x, 177) === e_P.mar5 || h(x, 9, 813) < 0) continue; }
  }, () => {
    if (!noche && !tarde) return;
    // de noche y al ocaso, ventanas encendidas (luz cálida que no se tiñe)
    const lc = [e_P.luz, e_P.luzS, e_P.luzL];
    const encender = (x, y, w, hh, a) => { for (let j = y; j <= y + hh; j++) for (let i = x; i <= x + w; i++) { const p = R.pget(i, j); if (p === tn(e_P.yesoL)) continue; if (e_um(i, j) < a) R.pset(i, j, j > y + hh * 0.6 ? lc[1] : lc[0]); } };
    encender(35, 63, 12, 22, 1); if (noche) encender(33, 109, 12, 20, 1);
    if (noche) { for (let y = 114; y < 138; y++) for (let x = 102; x <= 118; x++) R.pset(x, y, e_mez(lc[0], lc[1], Math.round((y - 114) / 24 * 4) / 4)); R.rect(104, 120, 106, 136, tn(e_P.maderaS)); R.rect(104, 120, 112, 121, tn(e_P.maderaS));
      // las luces de Lerici, en sus casas y su reflejo
      for (let k = 0; k < 30; k++) { const x = 236 + Math.round(h(k, 1, 820) * 80), y = 72 + Math.round(h(k, 2, 820) * 24); if (x > 272 && y < 48) continue; R.pset(x, y, k % 4 ? lc[0] : lc[2]); } }
  });
  R.copiar(c.b);
  const m = c.m, B = R.buf;
  // ── la vida ──
  e_nubes(R, t, m, HOR, hora, cielo);
  if (noche) for (let k = 0; k < 30; k++) { const x = 236 + Math.round(h(k, 1, 820) * 80); if (h(k, 3, 821) < 0.5) e_psM(B, m, x + Math.round(Math.sin(t * 2 + k) * 1.5), HOR + 2 + Math.round(h(k, 4, 820) * 12), k % 3 ? hex('#e8b860') : hex('#fff0b0'), 2); }
  e_brillos(R, t, m, HOR + 1, 180, hora, cielo, sol[0], 170);
  // el velero en el horizonte, muy lejos, que cruza despacio
  { const x = ((t * 1.6 + 40) % 200) + 100; e_barca(R, m, Math.round(x), HOR - 1, t, 5, tn, 0.4, noche); }
  // dos barcas de pescadores con vela latina y un bote a remo
  e_barca(R, m, Math.round(240 - ((t * 2.4) % 120)), 110, t, 1, tn, 0.75, noche);
  e_barca(R, m, Math.round(170 + ((t * 3.2) % 170)), 117, t, 2, tn, 0.95, noche);
  e_bote(R, m, Math.round(260 - ((t * 1.8) % 100)), 104, t, tn);
  e_gaviotas(R, t, m, noche ? 0 : 5, [140, 54, 320, 92], tn);
  e_humo(R, t, m, 126, 26, tn, 7, hex('#d8d4cc'), 9);
  e_humo(R, t, m, 266, 58, tn, 4, hex('#c8c4bc'));
  // el agua que entra y sale de los arcos, con espuma en el pie de los pilares
  for (let k = 0; k < 7; k++) { const cx = 22 + k * 46; for (let x = cx - 14; x <= cx + 14; x++) { const y = 176 + Math.round(Math.sin(t * 1.6 + x * 0.3 + k) * 1.2); if (e_um(x, y) < 0.5) R.pset(x, y, tn(e_P.mar3)); if ((x + Math.floor(t * 4)) % 9 === 0) R.pset(x, y - 1, tn(e_P.espumaS)); }
    for (const s of [-1, 1]) { const px = cx + s * 22, a = Math.sin(t * 1.6 + k + s); if (a > 0) { R.pset(px, 177, tn(e_P.espuma)); R.pset(px + 1, 176, tn(e_P.espumaS)); R.pset(px - 1, 178, tn(e_P.espuma)); } } }
  // la cortina de la puerta, que el aire del mar hincha
  for (let j = 114; j < 137; j++) { const u = (j - 114) / 23, d = Math.round((Math.sin(t * 1.7 + j * 0.18) * 0.5 + 0.5) * u * 5); for (let i = 0; i < 4 + d; i++) R.pset(102 + i, j, tn(i === 3 + d ? e_P.telaS : (i + j) % 5 === 0 ? e_P.telaS : e_P.tela)); }
  // el farol de la pared: de noche y al ocaso alumbra y tiembla
  if (noche || tarde) { const fl = 0.75 + Math.sin(t * 9) * 0.12 + Math.sin(t * 23) * 0.06, lx = 136, ly = 112;
    for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j) / 22; if (d > 1) continue; const x = lx + i, y = ly + j; if (y < 52 || x < 14 || x > 160 || y > 156) continue; const a = (1 - d) * (1 - d) * fl * (noche ? 0.5 : 0.26); if (a > 0.02) R.pset(x, y, e_mez(R.pget(x, y), e_P.luz, Math.round(a * 16) / 16)); }
    R.rect(134, 110, 138, 115, e_P.luz); R.pset(136, 112, e_P.luzL); R.pset(136, 113, fl > 0.8 ? e_P.luzL : e_P.luzS); }
  // la parra que sube por la esquina de la casa, con las hojas que se mecen
  for (let j = 52; j < 138; j++) { const x = 153 + Math.round(Math.sin(j * 0.2) * 1.5); R.pset(x, j, tn(e_P.maderaS)); }
  for (let k = 0; k < 22; k++) { const y = 56 + k * 4, x = 153 + Math.round(Math.sin(y * 0.2) * 1.5) + (k % 2 ? 2 : -2) + Math.round(Math.sin(t * 2.1 + k) * 0.8); const c1 = tn(k % 3 ? e_P.hoja : e_P.hojaL); R.pset(x, y, c1); R.pset(x + 1, y, c1); R.pset(x, y + 1, tn(e_P.hojaS)); R.pset(x + (k % 2 ? 2 : -1), y, c1); if (k % 5 === 2) { R.pset(x, y + 2, tn(hex('#5a3a6a'))); R.pset(x + 1, y + 2, tn(hex('#7a4a8a'))); R.pset(x, y + 3, tn(hex('#5a3a6a'))); } }
  e_catalejo(R, 278, 150, tn);
  // un gato que dormita en la balaustrada y mueve la cola (vida)
  { const gx = 252, gy = 119, gc = tn(hex('#d8a060')), gS = tn(hex('#a87040')); R.rect(gx, gy - 3, gx + 7, gy, gc); R.rect(gx, gy, gx + 7, gy, gS); R.rect(gx + 7, gy - 5, gx + 10, gy - 1, gc); R.pset(gx + 7, gy - 6, gc); R.pset(gx + 10, gy - 6, gc); R.pset(gx + 9, gy - 3, gS); const cola = Math.sin(t * 1.5); R.pset(gx - 1, gy - 1, gc); R.pset(gx - 2, gy + Math.round(cola), gc); R.pset(gx - 3, gy + 1 + Math.round(cola * 1.5), gS); }
  return { suelo: 152, libre: [40, 260], horizonte: HOR, sol, puerta: [98, 122, 138], banco: [54, 90, 130], balaustrada: [152, 304, 120], catalejo: [266, 292, 150], limonero: [134, 150, 140], terraza: [0, 320, 138, 156] };
}

// por delante: las esquinas de la balaustrada de la terraza (con su maceta) y la parra que cuelga arriba a la izquierda
function e_casaDelante(R, t, o) {
  const hora = o.hora ?? 'dia', cielo = o.cielo ?? (o.calma ? 'gris' : 'claro'), tn = e_tn(hora, cielo);
  for (const [x0, x1] of [[0, 13], [306, 319]]) {
    for (let y = 124; y < 180; y++) for (let x = x0; x <= x1; x++) { const borde = x === x0 ? 'L' : x === x1 ? 'D' : ''; R.pset(x, y, tn(borde === 'L' ? e_P.balL : borde === 'D' ? e_P.balD : h(x >> 1, y >> 1, 830) < 0.15 ? e_P.balS : e_P.bal)); }
    R.rect(x0 - 1, 120, x1 + 1, 123, tn(e_P.balL)); R.rect(x0 - 1, 124, x1 + 1, 124, tn(e_P.balD)); R.rect(x0 + 3, 130, x1 - 3, 170, tn(e_P.balS)); R.rect(x0 + 3, 130, x1 - 3, 130, tn(e_P.balD));
    // la maceta con geranios, que se mecen
    R.rect(x0 + 1, 110, x1 - 1, 119, tn(e_P.teja)); R.rect(x0, 109, x1, 110, tn(e_P.tejaL)); R.rect(x1 - 2, 111, x1 - 1, 119, tn(e_P.tejaS));
    for (let k = 0; k < 22; k++) { const px = x0 - 2 + Math.round(h(k, x0, 831) * (x1 - x0 + 4)) + Math.round(Math.sin(t * 1.8 + k) * 0.7), py = 98 + Math.round(h(k, x0 + 1, 831) * 11); R.pset(px, py, tn(k % 4 === 0 ? e_P.geranio : k % 4 === 1 ? e_P.geranioL : k % 4 === 2 ? e_P.hoja : e_P.hojaL)); }
  }
  // la parra que cuelga del borde de arriba a la izquierda (fuera de la barra del año)
  for (let k = 0; k < 14; k++) { const x = 2 + (k % 4) * 4, y = 22 + k * 5, d = Math.round(Math.sin(t * 1.6 + k * 0.7) * 1.2); R.pset(x + d, y, tn(e_P.hoja)); R.pset(x + 1 + d, y, tn(e_P.hojaL)); R.pset(x + d, y + 1, tn(e_P.hojaS)); R.pset(x + 2 + d, y + 1, tn(e_P.hoja)); if (k % 4 === 1) { R.pset(x + 1 + d, y + 2, tn(hex('#5a3a6a'))); R.pset(x + 2 + d, y + 3, tn(hex('#7a4a8a'))); } }
  for (let y = 18; y < 90; y++) R.pset(1 + Math.round(Math.sin(y * 0.15 + t * 0.5) * 1), y, tn(e_P.maderaS));
}

function e_cuarto(R, t, o) {
  const hora = o.hora ?? 'dia', cielo = o.cielo ?? (o.calma ? 'gris' : 'claro'), tn = e_tn(hora, cielo), noche = hora === 'noche', tarde = hora === 'ocaso';
  const V = [124, 34, 176, 96], HV = 72, cunas = o.cunas ?? 1, vacia = !!o.cunaVacia;
  const c = e_capa(R, 'cuarto|' + hora + '|' + cielo + '|' + cunas + '|' + vacia, tn, (s1, s2) => {
    e_cielo(R, 0, HV, hora, cielo, hora === 'ocaso' ? [150, 66] : [160, 48]); s1();
    e_marFijo(R, HV, 100, 2); s2();
    e_lejanas(R, 120, 150, HV, 5, 7);
    e_lerici(R, 150, HV, 0.42);
    // la pared encalada, con la luz que entra por la ventana (más clara cerca)
    const B = R.buf, dentro = (x, y) => x >= V[0] && x <= V[2] && y >= V[1] && y <= V[3];
    const guarda = B.slice();
    e_yeso(R, 0, 0, 319, 136, 840);
    for (let y = 0; y <= 136; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 150) / 1.6, y - 70) / 150; if (e_um(x, y) < d * 0.6 - 0.1) B[y * 320 + x] = e_mez(B[y * 320 + x], e_P.yesoS, 0.5); }
    for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) B[y * 320 + x] = guarda[y * 320 + x];
    void dentro;
    // las vigas del techo, encaladas como la pared (suaves: la barra del año va encima)
    for (let x = 0; x < 320; x++) { R.pset(x, 6, e_P.yesoS); R.pset(x, 7, e_P.yesoM); }
    for (let k = 0; k < 9; k++) { const x = 8 + k * 38; R.rect(x, 0, x + 9, 6, e_P.yesoM); R.rect(x + 8, 0, x + 9, 6, e_P.yesoS); R.rect(x, 6, x + 9, 6, e_P.yesoS); }
    // el hueco de la ventana: el derrame del muro (grueso), las hojas abiertas, el alféizar
    for (let j = V[1] - 4; j <= V[3] + 2; j++) for (let i = 0; i < 6; i++) { R.pset(V[0] - 6 + i, j, i < 2 ? e_P.yesoL : e_P.yesoM); R.pset(V[2] + 1 + i, j, i > 3 ? e_P.yesoS : e_P.yesoD); }
    for (let i = V[0] - 6; i <= V[2] + 6; i++) for (let j = 0; j < 4; j++) R.pset(i, V[1] - 4 + j, j < 1 ? e_P.yesoD : e_P.yesoS);
    // el marco y la cruz de la ventana
    R.rect(V[0], V[1], V[2], V[1] + 1, e_P.madera); R.rect(V[0], V[1], V[0] + 1, V[3], e_P.madera); R.rect(V[2] - 1, V[1], V[2], V[3], e_P.maderaS);
    // las hojas de la ventana abiertas hacia dentro, con cristales que reflejan
    for (const [x0, s] of [[V[0] - 16, 1], [V[2] + 7, -1]]) { for (let j = V[1] - 2; j <= V[3]; j++) for (let i = 0; i < 10; i++) { const x = s > 0 ? x0 + i : x0 + 9 - i, b = i === 0 || i === 9 || (j - V[1]) % 15 === 0;
      R.pset(x, j + Math.round((s > 0 ? 9 - i : 9 - i) * 0.25), b ? e_P.maderaS : (i + j) % 9 < 2 ? hex('#d8eef6') : hex('#8ab4c8')); } }
    // el alféizar de piedra con la maceta de geranios y un jarro de flores silvestres
    R.rect(V[0] - 8, V[3] + 1, V[2] + 8, V[3] + 4, e_P.piedraL); R.rect(V[0] - 8, V[3] + 4, V[2] + 8, V[3] + 5, e_P.piedraS);
    R.rect(162, 88, 170, 96, e_P.teja); R.rect(161, 87, 171, 88, e_P.tejaL); R.rect(169, 89, 170, 96, e_P.tejaS);
    for (let k = 0; k < 20; k++) R.pset(159 + Math.round(h(k, 1, 841) * 14), 78 + Math.round(h(k, 2, 841) * 9), k % 4 === 0 ? e_P.geranio : k % 4 === 1 ? e_P.geranioL : k % 4 === 2 ? e_P.hoja : e_P.hojaL);
    // el zócalo de almagre y el suelo de barro cocido
    R.rect(0, 128, 319, 136, e_P.almagre); R.rect(0, 128, 319, 128, e_P.almagreL); for (let x = 0; x < 320; x++) { if (h(x >> 1, 1, 842) < 0.2) R.pset(x, 129 + (x % 3), e_P.almagreS); if (h(x, 2, 842) < 0.1) R.pset(x, 128, e_P.yesoM); }
    e_cotto(R, 0, 319, 137, 179, 150, 40, 843);
    // las manchas y grietas de la cal
    e_grieta(R, 40, 20, 14, 844); e_grieta(R, 236, 96, 10, 845); e_desconchon(R, 12, 108, 9, 7, 846); e_desconchon(R, 204, 30, 6, 5, 847);
    for (let x = 0; x < 320; x++) for (let y = 118; y < 128; y++) if (e_um(x, y) < (y - 118) / 18 * h(x >> 3, 2, 848)) R.pset(x, y, e_P.yesoM);
    // el estante con libros y un tarro
    R.rect(16, 66, 80, 68, e_P.madera); R.rect(16, 66, 80, 66, e_P.maderaL); R.rect(16, 69, 80, 69, e_P.yesoD); R.rect(20, 69, 22, 74, e_P.maderaS); R.rect(74, 69, 76, 74, e_P.maderaS);
    { let x = 18; const lomos = [e_P.lomo1, e_P.lomo2, e_P.lomo3, e_P.lomo4, e_P.lomo5]; for (let k = 0; k < 13; k++) { const w = 2 + (k % 3 === 0 ? 2 : 1), hh = 9 + ((k * 5) % 6); if (k === 9) { R.linea(x, 65, x + 7, 58, e_P.lomo2); R.linea(x + 1, 65, x + 8, 58, e_P.lomo2); R.linea(x + 2, 65, x + 9, 58, hex('#5a7a9a')); x += 10; continue; } R.rect(x, 65 - hh, x + w, 65, lomos[k % 5]); R.rect(x, 65 - hh, x, 65, e_mez(lomos[k % 5], hex('#ffffff'), 0.25)); R.pset(x + 1, 65 - hh + 2, e_P.latonL); R.pset(x + 1, 63, e_P.latonL); x += w + 1; } }
    R.rect(66, 58, 72, 65, hex('#7a9aa8')); R.rect(66, 57, 72, 57, hex('#b8d0d8')); R.rect(71, 58, 72, 65, hex('#5a7a88')); R.pset(68, 60, hex('#d8eef4'));
    // un apunte del golfo enmarcado
    R.rect(212, 52, 240, 74, e_P.maderaS); R.rect(213, 53, 239, 73, e_P.madera); R.rect(215, 55, 237, 71, e_P.papel);
    for (let y = 56; y < 71; y++) for (let x = 216; x < 237; x++) { if (y < 63) { if (e_um(x, y) < 0.35) R.pset(x, y, hex('#b8d4e4')); } else if (y < 66) R.pset(x, y, (x + y) % 3 ? e_P.mar1 : e_P.mar2); else R.pset(x, y, e_P.arena); }
    R.poligono([[216, 63], [222, 58], [228, 62], [230, 63]], e_P.olivoS); R.pset(226, 61, e_P.vela); R.pset(226, 60, e_P.vela); R.pset(225, 61, e_P.vela);
    R.rect(225, 49, 227, 51, e_P.oscuro); R.linea(214, 52, 226, 50, e_P.yesoO); R.linea(238, 52, 226, 50, e_P.yesoO);
    // una guitarra colgada de un clavo
    { const gx = 254, gy = 64; R.rect(gx + 2, gy, gx + 3, gy + 20, e_P.maderaD); R.rect(gx + 1, gy - 3, gx + 4, gy, e_P.maderaS); R.disco(gx + 3, gy + 26, 6, e_P.maderaV); R.disco(gx + 3, gy + 34, 8, e_P.maderaV); R.disco(gx + 2, gy + 33, 7, e_P.maderaL); R.disco(gx + 3, gy + 29, 2, e_P.maderaD); R.rect(gx, gy + 37, gx + 6, gy + 38, e_P.maderaD); R.linea(gx + 3, gy, gx + 3, gy + 37, e_P.yesoL); R.linea(gx + 10, gy + 30, gx + 10, gy + 40, e_P.maderaS); }
    // la lucerna de latón colgada de un clavo y un manojo de hierbas secas
    R.linea(96, 24, 96, 34, e_P.yesoO); R.rect(95, 22, 97, 23, e_P.oscuro);
    R.rect(94, 34, 98, 35, e_P.latonL); R.rect(95, 36, 97, 48, e_P.laton); R.rect(97, 36, 97, 48, e_P.latonS); R.rect(90, 48, 102, 50, e_P.laton); R.rect(90, 48, 102, 48, e_P.latonL); R.rect(91, 51, 101, 51, e_P.latonS);
    for (const s of [-1, 1]) { R.rect(96 + s * 6, 46, 96 + s * 6, 47, e_P.latonS); R.pset(96 + s * 7, 46, e_P.latonS); }
    R.rect(93, 52, 99, 54, e_P.laton); R.rect(93, 54, 99, 54, e_P.latonS); R.rect(95, 55, 97, 57, e_P.latonS);
    R.rect(39, 26, 41, 27, e_P.oscuro); R.linea(40, 28, 40, 31, e_P.maderaS);
    for (let k = 0; k < 9; k++) { const x = 37 + (k % 5) * 1.5, L = 10 + (k % 3) * 2; R.linea(40, 31, Math.round(x - 1), 31 + L, k % 2 ? hex('#7a8a5a') : hex('#9a9a6a')); R.pset(Math.round(x - 1), 31 + L, hex('#b8a86a')); }
    R.rect(38, 31, 42, 33, hex('#a8483a'));
    // la puerta de tablones a la derecha, entornada, con su marco de piedra, bisagras y el pestillo
    R.rect(280, 50, 318, 136, e_P.piedraL); R.rect(316, 52, 318, 136, e_P.piedraS); R.rect(280, 50, 318, 51, e_P.piedra);
    R.rect(284, 54, 314, 136, hex('#2a2420')); for (let y = 54; y < 137; y++) for (let x = 284; x < 292; x++) if (e_um(x, y) < (x - 284) / 10) R.pset(x, y, hex('#3e342c'));
    for (let x = 292; x <= 314; x++) for (let y = 54; y <= 136; y++) { const tab = (x - 292) % 6; R.pset(x, y, tab === 0 ? e_P.maderaD : tab === 1 ? e_P.maderaL : h(x, y >> 2, 852) < 0.12 ? e_P.maderaS : e_P.madera); }
    for (const y of [64, 124]) { R.rect(292, y, 312, y + 2, hex('#3a3a40')); R.rect(292, y, 312, y, hex('#6a6a74')); for (let x = 294; x < 312; x += 5) R.pset(x, y + 1, hex('#8a8a94')); }
    R.rect(295, 94, 298, 96, hex('#3a3a40')); R.pset(296, 94, hex('#8a8a94')); R.rect(292, 54, 314, 55, e_P.maderaS);
    // el baúl de cuero con sus cinchas de latón
    R.rect(14, 122, 58, 146, e_P.maderaS); R.rect(14, 118, 58, 124, e_P.madera); R.rect(14, 118, 58, 118, e_P.maderaL); R.rect(16, 126, 56, 145, e_P.maderaV);
    for (const x of [22, 48]) { R.rect(x, 118, x + 2, 146, e_P.latonS); R.rect(x, 118, x, 146, e_P.laton); }
    R.rect(34, 124, 38, 128, e_P.laton); R.pset(36, 126, e_P.maderaD); R.rect(14, 146, 58, 147, e_P.cottoJ);
    for (let y = 126; y < 145; y += 3) for (let x = 17; x < 56; x += 5) R.pset(x + (y % 2), y, e_P.maderaS);
    // la mesa de escribir bajo la ventana: tablero, cajón, patas torneadas y su sombra
    for (let y = 140; y < 152; y++) for (let x = 118; x < 202; x++) if (e_um(x, y) < 0.45) R.pset(x, y, e_P.cottoJ);
    R.rect(116, 120, 198, 123, e_P.maderaL); R.rect(116, 120, 198, 120, hex('#c8986a')); R.rect(116, 124, 198, 128, e_P.madera); R.rect(116, 128, 198, 128, e_P.maderaS);
    for (let x = 116; x <= 198; x++) if (h(x >> 2, 4, 849) < 0.3) R.pset(x, 121 + (x % 2), e_P.maderaV);
    R.rect(140, 125, 172, 127, e_P.maderaV); R.rect(140, 125, 172, 125, e_P.maderaL); R.rect(155, 126, 157, 126, e_P.laton);
    for (const lx of [119, 193]) { for (let y = 129; y < 151; y++) { const w = (y - 129) % 7 < 2 ? 2 : 1; R.rect(lx - w + 1, y, lx + w, y, e_P.madera); R.pset(lx - w + 1, y, e_P.maderaL); } R.rect(lx - 1, 150, lx + 2, 151, e_P.maderaS); }
    for (const lx of [126, 186]) R.rect(lx, 129, lx + 1, 139, e_P.maderaS);
    // sobre la mesa: un montón de papeles, el cuaderno abierto con su escritura, el tintero y la pluma, libros
    for (let k = 0; k < 5; k++) { R.rect(120 + (k % 2), 117 - k, 138 + (k % 2), 118 - k, k % 2 ? e_P.papelS : e_P.papel); } R.rect(120, 113, 138, 113, e_P.papel); for (let x = 122; x < 136; x += 2) R.pset(x, 113, e_P.papelS);
    R.rect(142, 116, 166, 119, e_P.papel); R.rect(154, 116, 154, 119, e_P.papelS); R.rect(142, 119, 166, 119, e_P.papelS);
    for (let k = 0; k < 3; k++) { for (let x = 144; x < 152; x++) if (h(x, k, 850) > 0.25) R.pset(x, 117 + k, e_P.tinta); for (let x = 156; x < 165; x++) if (h(x, k, 851) > 0.3 && !(k === 2 && x > 160)) R.pset(x, 117 + k, e_P.tinta); }
    R.rect(169, 115, 173, 119, hex('#2a3040')); R.rect(170, 114, 172, 114, hex('#4a5060')); R.pset(170, 116, hex('#6a7890'));
    R.linea(172, 113, 180, 104, e_P.papel); R.linea(173, 113, 181, 105, e_P.papelS); R.pset(180, 103, e_P.yesoL); R.pset(179, 104, e_P.yesoL);
    { const lom = [e_P.lomo2, e_P.lomo1, e_P.lomo3, e_P.lomo5]; for (let k = 0; k < 4; k++) { const y = 119 - k * 3; R.rect(178 + (k % 2), y - 2, 194 - (k % 3), y, lom[k]); R.rect(178 + (k % 2), y - 2, 194 - (k % 3), y - 2, e_mez(lom[k], hex('#ffffff'), 0.3)); R.rect(194 - (k % 3), y - 2, 194 - (k % 3), y, e_P.papel); } }
    // la palmatoria con su vela
    R.rect(186, 105, 189, 106, e_P.latonS); R.rect(183, 106, 192, 107, e_P.laton); R.rect(186, 96, 188, 104, e_P.tela); R.rect(188, 96, 188, 104, e_P.telaS); R.pset(187, 95, e_P.oscuro);
    // la silla de enea apartada, a la izquierda de la mesa
    R.rect(100, 112, 101, 150, e_P.madera); R.rect(112, 112, 113, 150, e_P.maderaS); for (let y = 114; y < 128; y += 4) R.rect(100, y, 113, y + 1, e_P.madera);
    R.rect(98, 131, 115, 134, hex('#c8a86a')); for (let x = 98; x <= 115; x += 2) R.pset(x, 132, hex('#a8884a')); R.rect(98, 135, 115, 135, e_P.maderaS);
    R.rect(98, 135, 99, 152, e_P.madera); R.rect(114, 135, 115, 152, e_P.maderaS); R.rect(99, 145, 114, 145, e_P.maderaS);
    // la cuna de madera, con su balancín y el capazo; la mantita doblada sobre el borde o recogida dentro
    const cuna = (x0, x1, base) => {
      for (let y = base - 2; y < base + 3; y++) for (let x = x0 - 2; x <= x1 + 2; x++) if (e_um(x, y) < 0.4) R.pset(x, y, e_P.cottoJ);
      R.poligono([[x0 - 3, base - 3], [x1 + 3, base - 3], [x1 + 1, base], [x0 - 1, base]], e_P.maderaS); R.rect(x0 - 2, base - 3, x1 + 2, base - 3, e_P.madera);
      R.rect(x0, base - 22, x1, base - 5, e_P.madera); R.rect(x0, base - 22, x1, base - 21, e_P.maderaL); R.rect(x0, base - 6, x1, base - 5, e_P.maderaS);
      for (let x = x0 + 3; x < x1 - 2; x += 4) { R.rect(x, base - 20, x + 1, base - 7, e_P.maderaS); R.pset(x, base - 20, e_P.maderaD); }
      R.rect(x0, base - 30, x0 + 4, base - 5, e_P.madera); R.rect(x0, base - 30, x0 + 4, base - 30, e_P.maderaL); R.disco(x0 + 2, base - 31, 2, e_P.maderaL);
      R.rect(x1 - 3, base - 26, x1, base - 5, e_P.madera); R.disco(x1 - 1, base - 27, 2, e_P.maderaL); R.rect(x1, base - 26, x1, base - 5, e_P.maderaS);
      if (vacia) { R.rect(x0 + 8, base - 25, x1 - 8, base - 21, e_P.manta); R.rect(x0 + 8, base - 25, x1 - 8, base - 25, e_P.mantaL); R.rect(x0 + 8, base - 20, x1 - 8, base - 14, e_P.manta); R.rect(x1 - 9, base - 20, x1 - 8, base - 14, e_P.mantaS); for (let x = x0 + 9; x < x1 - 8; x += 3) R.pset(x, base - 23, e_P.mantaS); for (let y = base - 19; y < base - 14; y += 2) R.pset(x0 + 8, y, e_P.mantaL); }
      else { R.rect(x0 + 5, base - 24, x1 - 5, base - 22, e_P.manta); for (let x = x0 + 5; x < x1 - 5; x++) { R.pset(x, base - 24 - (x % 5 === 0 ? 1 : 0), e_P.mantaL); if (x % 4 === 1) R.pset(x, base - 22, e_P.mantaS); } }
    };
    cuna(230, 274, 154);
    if (cunas > 1) { const x0 = 284, x1 = 312, base = 156; for (let y = base - 2; y < base + 2; y++) for (let x = x0 - 2; x <= x1 + 2; x++) if (e_um(x, y) < 0.4) R.pset(x, y, e_P.cottoJ);
      R.poligono([[x0, base - 16], [x1, base - 16], [x1 - 2, base - 1], [x0 + 2, base - 1]], (x, y) => ((x + y) % 3 === 0 ? e_P.mimbreS : (x - y) % 4 === 0 ? e_P.mimbreL : e_P.mimbre)); R.rect(x0 - 1, base - 18, x1 + 1, base - 16, e_P.mimbreL); R.rect(x0 - 1, base - 16, x1 + 1, base - 16, e_P.mimbreS);
      R.rect(x0 + 3, base - 1, x0 + 5, base + 1, e_P.maderaS); R.rect(x1 - 5, base - 1, x1 - 3, base + 1, e_P.maderaS);
      if (vacia) { R.rect(x0 + 6, base - 21, x1 - 6, base - 18, e_P.manta2); R.rect(x0 + 6, base - 21, x1 - 6, base - 21, hex('#f4dede')); R.rect(x0 + 6, base - 17, x1 - 6, base - 10, e_P.manta2); R.rect(x1 - 7, base - 17, x1 - 6, base - 10, e_P.manta2S); }
      else for (let x = x0 + 2; x < x1 - 2; x++) R.pset(x, base - 19 - (x % 4 === 0 ? 1 : 0), x % 3 ? e_P.manta2 : e_P.manta2S); }
  }, () => {
    if (noche || tarde) { R.rect(186, 96, 188, 104, e_P.tela); R.rect(188, 96, 188, 104, e_P.telaS); }
  });
  R.copiar(c.b);
  const m = c.m, B = R.buf;
  // por la ventana: nubes, brillos, una barca que pasa y gaviotas, todo recortado a su hueco por la máscara
  e_nubes(R, t, m, HV, hora, cielo, V);
  e_brillos(R, t, m, HV + 1, V[3] + 1, hora, cielo, 150, 40);
  e_barca(R, m, Math.round(V[0] - 10 + ((t * 3) % 80)), 84, t, 3, tn, 0.7, noche);
  e_barca(R, m, Math.round(V[2] - ((t * 1.4) % 60)), 76, t, 4, tn, 0.45, noche);
  e_gaviotas(R, t, m, noche ? 0 : 3, [V[0], V[1] + 18, V[2], HV - 4], tn, 5);
  // el visillo que el aire hincha (a los dos lados del hueco)
  for (let j = V[1] + 2; j < V[3]; j++) { const u = (j - V[1]) / (V[3] - V[1]), d = Math.round((Math.sin(t * 1.5 + j * 0.14) * 0.5 + 0.5) * u * 6);
    for (let i = 0; i < 4 + d; i++) { const c1 = tn(i === 3 + d ? e_P.telaS : (i * 3 + j) % 7 === 0 ? e_P.telaS : e_P.tela); if (e_um(V[0] + 2 + i, j) < 0.85) R.pset(V[0] + 2 + i, j, c1); }
    const d2 = Math.round((Math.sin(t * 1.5 + j * 0.14 + 1.3) * 0.5 + 0.5) * u * 4); for (let i = 0; i < 3 + d2; i++) { if (e_um(V[2] - 2 - i, j) < 0.8) R.pset(V[2] - 2 - i, j, tn(i === 2 + d2 ? e_P.telaS : e_P.tela)); } }
  R.rect(V[0], V[1] + 1, V[2], V[1] + 2, tn(e_P.maderaS));
  // la luz: de día, el rayo de sol sobre el suelo; al ocaso, naranja y largo; de noche, la luna fría
  if (!noche && cielo !== 'gris') { const col = tarde ? e_P.luzS : hex('#fff4d8'), a = tarde ? 0.3 : 0.24;
    const x0 = tarde ? 40 : 78, x1 = tarde ? 110 : 132, sh = tarde ? 14 : 0;
    R.poligono([[x0 + sh, 150], [x1 + sh, 150], [x1 - 6, 178], [x0 - 14, 178]], (x, y) => (e_um(x, y) < 0.7 ? e_mez(R.pget(x, y), col, a) : R.pget(x, y)));
    // la sombra de la cruz de la ventana dentro del rayo
    for (let y = 150; y < 178; y++) { const u = (y - 150) / 28, xm = Math.round((x0 + x1) / 2 + sh * (1 - u) - 10 * u); R.pset(xm, y, e_mez(R.pget(xm, y), e_P.cottoJ, 0.5)); } }
  if (noche) { for (let y = 150; y < 176; y++) for (let x = 70; x < 128; x++) { const u = (y - 150) / 26; if (x < 76 - u * 12 || x > 126 - u * 6) continue; if (e_um(x, y) < 0.45) R.pset(x, y, e_mez(R.pget(x, y), hex('#8a9ad0'), 0.3)); } }
  // la vela: encendida al ocaso y de noche, con su halo que tiembla sobre la pared y la mesa
  if (noche || tarde) { const fl = 0.8 + Math.sin(t * 8.3) * 0.1 + Math.sin(t * 19) * 0.06, cx = 187, cy = 92, rr = noche ? 62 : 40;
    for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i, j * 1.1) / rr; if (d > 1) continue; const x = cx + i, y = cy + j; if (x < 0 || x > 319 || y < 0 || y > 179 || m[y * 320 + x]) continue; const a = (1 - d) * (1 - d) * fl * (noche ? 0.42 : 0.26); if (a > 0.02) R.pset(x, y, e_mez(R.pget(x, y), e_P.luz, Math.round(a * 16) / 16)); }
    const lm = Math.round(Math.sin(t * 6) * 0.6); R.pset(187 + lm, 94, e_P.luzS); R.pset(187, 93, e_P.luz); R.pset(187 + lm, 92, e_P.luzL); R.pset(187, 91, fl > 0.85 ? e_P.luzL : e_P.luz); R.pset(187 + lm, 90, e_P.luz); R.pset(187, 95, e_P.oscuro); }
  void B;
  return { suelo: 152, libre: [20, 110], libre2: [196, 224], horizonte: HV, ventana: V, mesa: [116, 198, 120], silla: [98, 115, 131], cuna: [230, 274, 154], cuna2: cunas > 1 ? [284, 312, 156] : null, vela: [187, 91], cuaderno: [142, 166, 116], baul: [14, 58, 118] };
}

// por delante en el cuarto: las motas de polvo que flotan en el rayo de sol (o en la luz de la vela)
function e_cuartoDelante(R, t, o) {
  const hora = o.hora ?? 'dia', cielo = o.cielo ?? (o.calma ? 'gris' : 'claro'); if (cielo === 'gris' && hora === 'dia') return;
  const c = hora === 'noche' ? hex('#ffe0a0') : hex('#fff8e0');
  for (let k = 0; k < 16; k++) { const u = ((t * 0.05 + h(k, 1, 860)) % 1), x = Math.round((hora === 'noche' ? 170 : 70) + h(k, 2, 860) * 50 + Math.sin(t * 0.7 + k) * 4 - u * 10), y = Math.round((hora === 'noche' ? 84 : 100) + u * 60 + Math.sin(t * 0.5 + k * 2) * 3);
    if (Math.sin(t * 1.3 + k) > -0.2) R.pset(x, y, e_mez(R.pget(x, y), c, 0.7)); }
}

// el barco de Percy, de lejos: dos palos con sus velas grises; s: escala; vis: 0–1 (se pierde tramado en la bruma);
// escora y cabecea con las olas
function e_barcoLejos(R, m, x, y, t, s, vis, tn) {
  const B = R.buf, esc = Math.sin(t * 1.1) * 0.22, cab = Math.round(Math.sin(t * 1.7) * 2 * s);
  const ps = (px, py, c) => { px = Math.round(px); py = Math.round(py); if (e_um(px, py) < vis) e_psM(B, m, px, py, c); };
  const L = Math.max(4, Math.round(26 * s)), y0 = y + cab, casco = tn(hex('#1a1a22')), cL = tn(hex('#5a5a68')), vela = tn(hex('#e4e0d6')), velaS = tn(hex('#a8a49a')), palo = tn(hex('#1a1a1e'));
  for (let i = 0; i < L; i++) { const u = i / (L - 1), dy = Math.round((u - 0.5) * L * esc), p = Math.max(1, Math.round(3 * s * Math.sin(Math.PI * (0.1 + u * 0.8)))); ps(x + i, y0 + dy - 1, cL); for (let j = 0; j < p; j++) ps(x + i, y0 + dy + j, casco); }
  for (const [f, alto, ancho] of [[0.32, 26, 0.3], [0.66, 20, 0.26]]) { const mx = x + L * f, my = y0 + Math.round((f - 0.5) * L * esc) - 1, A = alto * s;
    for (let j = 0; j < A; j++) ps(mx + j * esc * 0.6, my - j, palo);
    for (let j = 2; j < A - 1; j++) { const u = j / A, w = Math.round(L * ancho * (1 - u * 0.6) + Math.sin(t * 2 + j) * 0.5); for (let i = 1; i <= w; i++) ps(mx + j * esc * 0.6 + i, my - j, i < 2 ? velaS : vela); } }
}

function e_mar(R, t, o) {
  const calma = !!o.calma, hora = o.hora ?? 'dia', cielo = calma ? 'gris' : 'tormenta', tn = e_tn(hora, cielo), HOR = 100;
  const c = e_capa(R, 'mar|' + hora + '|' + cielo, tn, (s1, s2) => {
    e_cielo(R, 0, HOR, hora, cielo, null); s1();
    e_marFijo(R, HOR, 168, 3, true); s2();
    // la costa lejana a la izquierda, velada: el promontorio de Lerici
    for (let x = 0; x < 110; x++) { const top = Math.round(HOR - 4 - 9 * Math.max(0, Math.sin(x * 0.035 + 0.3)) - (x > 30 && x < 52 ? 3 : 0)); for (let y = top; y < HOR; y++) R.pset(x, y, e_um(x, y) < 0.5 ? e_P.lejos2 : e_P.lejos1); }
    R.rect(36, HOR - 17, 44, HOR - 13, e_P.lejos0); R.rect(39, HOR - 20, 41, HOR - 17, e_P.lejos0);
    // la orilla: arena mojada y seca, guijarros, algas, conchas
    for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 162 + Math.sin(x * 0.04) * 2 + Math.sin(x * 0.13) * 1; if (y < borde) continue; const u = (y - borde) / 18, n = h(x >> 1, y, 870);
      R.pset(x, y, u < 0.25 ? (n < 0.3 ? e_P.arenaW : e_P.arenaH) : n < 0.12 ? e_P.arenaS : n > 0.93 ? e_P.arenaL : u < 0.4 && e_um(x, y) < 0.5 ? e_P.arenaM : e_P.arena); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 871) * 320), y = 166 + Math.round(h(k, 2, 871) * 13); R.pset(x, y, k % 3 ? e_P.rocaL : e_P.roca); if (k % 5 === 0) R.pset(x + 1, y, e_P.rocaS); }
    for (let x = 0; x < 320; x++) if (h(x >> 2, 3, 872) < 0.35) R.pset(x, 168 + Math.round(Math.sin(x * 0.1) * 1.5), h(x, 4, 872) < 0.5 ? hex('#4a5a3a') : hex('#6a6a3a'));
    for (let k = 0; k < 8; k++) { const x = 20 + Math.round(h(k, 5, 873) * 280), y = 172 + Math.round(h(k, 6, 873) * 6); R.pset(x, y, hex('#f4e8e0')); R.pset(x + 1, y, hex('#e0c8c0')); }
    // rocas a los lados, con su luz, su sombra y su musgo
    const roca = (pts, sem) => { let cx = 0, cy = 0, y0 = 999; for (const [x, y] of pts) { cx += x / pts.length; cy += y / pts.length; y0 = Math.min(y0, y); }
      R.poligono(pts, (x, y) => { const f = h(x >> 3, y >> 3, sem) * 0.5 + h(x >> 1, y >> 1, sem + 1) * 0.2, l = (cx - x) * 0.012 + (cy - y) * 0.03 + f;
        if (Math.abs((x - cx) * 0.6 + (y - cy)) % 9 < 1 && h(x >> 2, y, sem + 2) < 0.6) return e_P.rocaD;
        return l > 0.75 ? e_P.rocaL : l > 0.35 ? e_P.roca : l > 0.05 ? e_P.rocaS : e_P.rocaD; });
      for (let x = Math.round(cx - 40); x < cx + 40; x++) for (let y = y0; y < 180; y++) if (R.pget(x, y) !== R.pget(x, y - 1) && R.pget(x, y - 1) !== e_P.rocaL && [e_P.roca, e_P.rocaS, e_P.rocaD].includes(R.pget(x, y)) && ![e_P.roca, e_P.rocaS, e_P.rocaD, e_P.rocaL].includes(R.pget(x, y - 1))) { R.pset(x, y, e_P.rocaL); if (h(x, y, sem + 3) < 0.3) R.pset(x, y + 1, hex('#5a6a4a')); } };
    roca([[0, 140], [14, 132], [30, 136], [46, 146], [58, 158], [66, 170], [60, 180], [0, 180]], 874);
    roca([[268, 180], [276, 160], [292, 150], [310, 146], [320, 148], [320, 180]], 875);
    roca([[180, 152], [186, 146], [196, 147], [202, 154], [178, 155]], 876);
  });
  R.copiar(c.b);
  const m = c.m, B = R.buf;
  if (!calma) {
    // las olas grandes: lomos que vienen hacia la orilla en perspectiva (más juntos y bajos lejos, más altos cerca), con la
    // cara de delante oscura, el lomo claro y la cresta que rompe en espuma a trozos (una pasada por el mar)
    const P = ['#18202a', '#222c38', '#2e3a48', '#40505e', '#5a6a78'].map((c) => tn(hex(c))), esp = tn(e_P.espuma), espS = tn(e_P.espumaS);
    for (let y = HOR; y < 168; y++) { const u = (y - HOR) / 68, z = 70 / (y - HOR + 5);
      for (let x = 0; x < 320; x++) { if (m[y * 320 + x] !== 2) continue;
        const s1 = Math.sin(z * 2.4 + t * 1.5 + Math.sin(x * 0.03 + z * 0.6 + t * 0.25) * 1.6 + Math.sin(x * (0.11 - u * 0.06) - t * 0.6) * 0.5), n = h(x >> 2, y >> 1, 880);
        let c; if (s1 > 0.88) c = n < 0.1 + u * 0.18 ? (h(x, y, 884) < 0.5 ? esp : espS) : n < 0.35 ? espS : P[4]; else if (s1 > 0.62) c = P[3]; else if (s1 > 0.1) c = P[2]; else if (s1 > -0.55) c = n < 0.1 ? P[2] : P[1]; else c = P[0];
        B[y * 320 + x] = c; } }
    // la espuma que el viento arranca de las crestas
    for (let k = 0; k < 40; k++) { const y = Math.round(HOR + 4 + h(k, 1, 883) * 60), x = Math.round(((h(k, 2, 883) * 340 + t * 24) % 340) - 10), on = Math.sin(t * 3 + k); if (on < 0.3) continue; e_psM(B, m, x, y, esp, 2); e_psM(B, m, x + 1, y - 1, espS, 2); }
  } else e_brillos(R, t, m, HOR + 1, 168, hora, 'gris', null, 120);
  const fl = e_nubes(R, t, m, HOR, hora, cielo);
  // el barco: se aleja hacia el horizonte, se hace pequeño y se pierde en la bruma
  if (o.barco != null) { const b = e_lim(o.barco), x = Math.round(120 + b * 118), y = Math.round(134 - b * 32), s = 1 - b * 0.7, vis = 1 - e_lim((b - 0.6) / 0.4);
    if (vis > 0) e_barcoLejos(R, m, x, y, t, s, vis, tn); }
  // la bruma del horizonte, que corre despacio
  const br = calma ? tn(hex('#b8bec8')) : tn(hex('#6a7284')), br2 = calma ? tn(hex('#a0a8b4')) : tn(hex('#545c6e'));
  for (let y = HOR - 10; y < HOR + 12; y++) { const d = 1 - Math.abs(y - HOR) / 12; for (let x = 0; x < 320; x++) { if (!m[y * 320 + x]) continue; const n = h((x + Math.floor(t * 4)) >> 3, y >> 1, 881) * 0.5 + 0.5; if (e_um(x, y) < d * n * (calma ? 0.55 : 0.8)) B[y * 320 + x] = e_um(x + 1, y) < 0.5 ? br : br2; } }
  // la espuma que sube y baja por la arena
  for (let x = 0; x < 320; x++) { const borde = 162 + Math.sin(x * 0.04) * 2 + Math.sin(x * 0.13) * 1, sube = (Math.sin(t * (calma ? 0.6 : 1.1) + x * 0.012) * 0.5 + 0.5) * (calma ? 3 : 6); const y = Math.round(borde - 1 + sube);
    if (R.pget(x, y) === tn(e_P.rocaD) || R.pget(x, y) === tn(e_P.roca)) continue;
    for (let j = Math.round(borde) - 2; j < y; j++) if (e_um(x, j) < 0.55) R.pset(x, j, tn(e_P.mar3));
    R.pset(x, y, tn(e_P.espuma)); if (e_um(x, y) < 0.6) R.pset(x, y + 1, tn(e_P.espumaS)); if ((x + Math.floor(t * 3)) % 7 === 0) R.pset(x, y - 2, tn(e_P.espuma)); }
  if (!calma) {
    // la lluvia en cortinas diagonales
    const cl = tn(hex('#8a96aa')), cl2 = tn(hex('#5e6a80'));
    for (let k = 0; k < 220; k++) { const v = 160 + h(k, 1, 882) * 80, x0 = h(k, 3, 882) * 400, y = ((h(k, 4, 882) * 400 + t * v) % 200) - 10, x = ((x0 - y * 0.35 + t * 30) % 400 + 400) % 400 - 40, L = 3 + Math.round(h(k, 2, 882) * 4); if (x > 272 && y < 48 && k % 2) continue; for (let i = 0; i < L; i++) R.pset(Math.round(x - i * 0.35), Math.round(y - i), i < 2 ? cl : cl2); }
    // el destello del relámpago lejano sobre todo el plano
    if (fl > 0) { const cc = hex('#9aa4c4'); for (let i = 0; i < 57600; i++) if (m[i] === 1) B[i] = e_mez(B[i], cc, 0.18 * fl); }
  } else e_gaviotas(R, t, m, 4, [60, 30, 300, 90], tn, 9);
  return { suelo: 174, libre: [70, 260], horizonte: HOR, orilla: 162, barco: o.barco != null ? [Math.round(120 + e_lim(o.barco) * 118), Math.round(134 - e_lim(o.barco) * 32)] : null, rocas: [[0, 66, 132], [268, 320, 146]] };
}

// por delante en el mar: los rociones de espuma que revientan contra las rocas (con tormenta) y la arena del borde
function e_marDelante(R, t, o) {
  const calma = !!o.calma, tn = e_tn(o.hora ?? 'dia', calma ? 'gris' : 'tormenta');
  for (const [rx, ry, fase] of [[40, 138, 0], [292, 148, 1.7]]) { const k = Math.floor((t + fase) / 2.6), u = ((t + fase) % 2.6) / 1.1; if (u > 1 || (calma && u > 0.6)) continue;
    const alto = (calma ? 6 : 20) * Math.sin(u * Math.PI);
    for (let p = 0; p < (calma ? 8 : 26); p++) { const a = -Math.PI / 2 + (h(p, k, 890) - 0.5) * 1.6, d = h(p, k + 1, 890) * alto, x = Math.round(rx + Math.cos(a) * d * 1.2), y = Math.round(ry + Math.sin(a) * d + u * u * 6); if (x > 272 && y < 48) continue; R.pset(x, y, tn(p % 3 ? e_P.espuma : e_P.espumaS)); if (p % 2) R.pset(x + 1, y, tn(e_P.espuma)); } }
  // el borde de abajo: arena con guijarros, un poco más cerca
  for (let x = 0; x < 320; x++) { const y = 177 + Math.round(Math.sin(x * 0.07) * 1.5); for (let j = y; j < 180; j++) R.pset(x, j, tn(h(x, j, 891) < 0.2 ? e_P.arenaS : e_P.arena)); if (h(x, 1, 892) < 0.05) R.pset(x, y, tn(e_P.rocaL)); }
}

// la casa pequeña al fondo de la playa (Casa Magni de lejos): arcos sobre la arena, terraza, tejado, persianas
function e_casaLejos(R, x, base) {
  R.rect(x - 2, base - 56, x + 82, base - 52, e_P.teja); for (let i = x - 2; i <= x + 82; i += 2) R.pset(i, base - 52, e_P.tejaD); R.rect(x - 2, base - 56, x + 82, base - 56, e_P.tejaL);
  R.rect(x + 12, base - 62, x + 17, base - 56, e_P.yesoM); R.rect(x + 11, base - 63, x + 18, base - 62, e_P.teja);
  e_yeso(R, x, base - 51, x + 80, base - 16, 900);
  for (let i = x; i <= x + 80; i++) R.pset(i, base - 51, e_P.yesoD);
  for (let k = 0; k < 5; k++) { const wx = x + 6 + k * 15; R.rect(wx - 2, base - 47, wx + 5, base - 37, e_P.persiana); R.rect(wx, base - 46, wx + 3, base - 38, hex('#2c3644')); R.rect(wx - 2, base - 36, wx + 5, base - 36, e_P.yesoD); }
  R.rect(x - 1, base - 33, x + 81, base - 31, e_P.yesoL); R.rect(x - 1, base - 31, x + 81, base - 31, e_P.yesoS);
  for (let i = x + 2; i < x + 80; i += 3) R.rect(i, base - 30, i, base - 25, e_P.bal); R.rect(x - 1, base - 24, x + 81, base - 23, e_P.yesoS);
  for (let k = 0; k < 3; k++) { const wx = x + 12 + k * 24; R.rect(wx, base - 29, wx + 7, base - 18, hex('#2c3644')); R.rect(wx - 2, base - 29, wx - 1, base - 18, e_P.persiana); R.rect(wx + 8, base - 29, wx + 9, base - 18, e_P.persiana); }
  R.rect(x, base - 16, x + 80, base, e_P.yesoS);
  for (let k = 0; k < 5; k++) { const cx = x + 8 + k * 16; for (let j = 0; j < 13; j++) for (let i = -6; i <= 6; i++) { const dy = Math.max(0, 7 - j); if (i * i + (dy * 1.6) ** 2 > 36) continue; R.pset(cx + i, base - 13 + j, j > 9 ? e_P.mar4 : hex('#24242c')); } }
  for (let i = x + 80; i < x + 84; i++) for (let j = base - 51; j <= base; j++) R.pset(i, j, e_P.yesoD);
}

function e_playa(R, t, o) {
  const hora = o.hora ?? 'dia', cielo = o.cielo ?? (o.calma ? 'gris' : 'claro'), tn = e_tn(hora, cielo), HOR = 86, noche = hora === 'noche';
  const sol = hora === 'dia' ? [232, 26] : hora === 'ocaso' ? [236, 78] : [230, 30];
  const orilla = (x) => 116 + x * 0.03 + Math.sin(x * 0.03) * 2;
  const c = e_capa(R, 'playa|' + hora + '|' + cielo, tn, (s1, s2) => {
    e_cielo(R, 0, HOR, hora, cielo, sol); s1();
    e_marFijo(R, HOR, 132, 4); s2();
    e_lejanas(R, 120, 250, HOR, 9, 5);
    e_lerici(R, 252, HOR, 0.62);
    // el monte detrás de la casa, con pinos y olivos
    e_monte(R, 0, 140, (x) => 40 + x * 0.18 + (x > 96 ? (x - 96) ** 1.3 * 0.55 : 0) + Math.sin(x * 0.13) * 3, 112, 901, 0.6);
    for (const [px, al, an] of [[14, 12, 6], [44, 14, 7], [104, 10, 6]]) e_pino(R, px, Math.round(46 + px * 0.18 + Math.sin(px * 0.13) * 3), al, an, px);
    e_cipres(R, 120, 94, 14);
    e_casaLejos(R, 12, 112);
    // la arena: la orilla curva, la banda mojada que refleja el cielo, ondas del viento, la línea de algas
    const cie = e_CIELOS[e_clCielo(hora, cielo)];
    for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const ob = orilla(x); if (y < ob) continue; const u = (y - ob) / (180 - ob), n = h(x >> 1, y, 902);
      let col = u < 0.12 ? (e_um(x, y) < 0.4 ? e_mez(e_P.arenaW, cie[3][1], 0.35) : e_P.arenaW) : u < 0.18 ? e_P.arenaM : n < 0.1 ? e_P.arenaS : n > 0.94 ? e_P.arenaL : e_P.arena;
      if (u > 0.2 && Math.sin(x * 0.18 + y * 0.9 + Math.sin(x * 0.05) * 3) > 0.82) col = e_P.arenaS;
      if (u > 0.2 && Math.sin(x * 0.18 + y * 0.9 + Math.sin(x * 0.05) * 3) < -0.9 && n > 0.5) col = e_P.arenaL;
      R.pset(x, y, col); }
    // la arena que sube a la casa por la izquierda
    for (let y = 104; y < 120; y++) for (let x = 0; x < 110; x++) if (y >= 112 && y >= orilla(x) - 8) R.pset(x, y, h(x >> 1, y, 903) < 0.15 ? e_P.arenaS : e_P.arena);
    for (let x = 96; x < 320; x++) { const y = Math.round(orilla(x) + 9 + Math.sin(x * 0.08) * 1.5); if (h(x >> 1, 1, 904) < 0.45) { R.pset(x, y, hex('#5a5a3a')); if (h(x, 2, 904) < 0.4) R.pset(x, y + 1, hex('#7a6a4a')); } }
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 905) * 300 + 10), y = Math.round(140 + h(k, 2, 905) * 36); R.pset(x, y, hex('#f4ece4')); R.pset(x + 1, y, hex('#e0c4b8')); R.pset(x, y - 1, hex('#fff8f0')); }
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 3, 905) * 320), y = Math.round(132 + h(k, 4, 905) * 46); R.pset(x, y, k % 3 ? e_P.arenaH : e_P.rocaL); }
    // las huellas que vienen de la casa hasta donde ella se para
    for (let k = 0; k < 14; k++) { const u = k / 13, x = Math.round(60 + u * 80 + (k % 2 ? 2 : -2)), y = Math.round(114 + u * 36); R.pset(x, y, e_P.arenaS); R.pset(x + 1, y, e_P.arenaS); R.pset(x, y + 1, e_P.arenaM); }
    // la barca varada con sus redes y los remos, y los palos donde se secan las redes
    for (const px of [206, 226]) { R.rect(px, 112, px + 1, 134, e_P.maderaS); R.rect(px, 112, px, 134, e_P.madera); }
    for (let y = 114; y < 130; y++) for (let x = 207; x < 227; x++) if ((x + y) % 3 === 0 && y < 114 + Math.sin((x - 207) / 20 * Math.PI) * 4 + 14) R.pset(x, y, hex('#8a7a5a'));
    R.linea(206, 113, 227, 113, hex('#6a5a3a'));
    for (let y = 136; y < 150; y++) for (let x = 242; x < 300; x++) if (e_um(x, y) < 0.4 && y > 143) R.pset(x, y, e_P.arenaM);
    R.poligono([[240, 132], [300, 130], [296, 140], [286, 145], [252, 145], [244, 140]], (x, y) => (y < 134 ? e_P.yesoL : y < 136 ? hex('#3a6a8a') : y > 142 ? hex('#2a3a50') : hex('#4a6a8a')));
    R.rect(240, 131, 300, 132, e_P.maderaL); R.poligono([[296, 124], [302, 130], [298, 132]], e_P.maderaS);
    for (let k = 0; k < 20; k++) R.pset(250 + Math.round(h(k, 1, 906) * 36), 128 + Math.round(h(k, 2, 906) * 4), k % 2 ? hex('#8a7a5a') : hex('#6a5a3a'));
    R.linea(256, 126, 290, 120, e_P.maderaS); R.linea(256, 127, 290, 121, e_P.madera);
  }, () => {
    if (!noche) return;
    for (const [x, y] of [[20, 69], [35, 69], [50, 69]]) R.rect(x, y, x + 3, y + 7, e_P.luz);
    for (let k = 0; k < 16; k++) { const x = 256 + Math.round(h(k, 1, 907) * 56), y = 70 + Math.round(h(k, 2, 907) * 14); if (x > 272 && y < 48) continue; R.pset(x, y, e_P.luz); }
  });
  R.copiar(c.b);
  const m = c.m, B = R.buf;
  e_nubes(R, t, m, HOR, hora, cielo);
  e_brillos(R, t, m, HOR + 1, 132, hora, cielo, sol[0], 140);
  // las olas que llegan: líneas de espuma que avanzan hacia la orilla
  for (let w = 0; w < 4; w++) { const u = ((t * 0.12 + w / 4) % 1), y0 = HOR + 6 + u * 24; for (let x = 0; x < 320; x++) { const y = Math.round(y0 + x * 0.02 + Math.sin(x * 0.08 + w) * 1.2); if (h(x >> 2, w + Math.floor(t * 0.12 + w / 4) * 7, 910) < 0.35) continue; e_psM(B, m, x, y, tn(u > 0.5 ? e_P.espuma : e_P.espumaS), 2); } }
  // la ola en la arena mojada: sube, se extiende en una lámina y se retira dejando el brillo
  const sube = (Math.sin(t * 0.8) * 0.5 + 0.5);
  for (let x = 0; x < 320; x++) { const ob = orilla(x), alc = ob + 1 + sube * (6 + Math.sin(x * 0.05) * 2), y = Math.round(alc);
    for (let j = Math.ceil(ob) - 2; j < y; j++) if (e_um(x, j) < 0.6) R.pset(x, j, tn(j < ob + 2 ? e_P.mar2 : e_P.mar1));
    R.pset(x, y, tn(e_P.espuma)); if ((x + Math.floor(t * 5)) % 5 === 0) R.pset(x, y + 1, tn(e_P.espumaS)); if (e_um(x, y - 1) < 0.5) R.pset(x, y - 1, tn(e_P.marL)); }
  // los correlimos que corren detrás de la ola
  for (let k = 0; k < 4; k++) { const x = Math.round(150 + k * 30 + Math.sin(t * 0.8 + k * 0.4) * 10), y = Math.round(orilla(x) + 2 + sube * 6) + 2, p = Math.floor(t * 8 + k) % 2;
    R.pset(x, y - 2, tn(hex('#8a7a6a'))); R.pset(x + 1, y - 2, tn(hex('#8a7a6a'))); R.pset(x + 2, y - 3, tn(hex('#6a5a4a'))); R.pset(x, y - 1, tn(hex('#f0ece4'))); R.pset(x + 1, y - 1, tn(hex('#f0ece4'))); R.pset(x + 3, y - 3, tn(e_P.oscuro)); R.pset(x + p, y, tn(e_P.oscuro)); }
  // un cangrejo que cruza la arena de lado, se para y sigue
  { const ciclo = (t % 14) / 14, x = Math.round(ciclo < 0.5 ? 30 + ciclo * 2 * 40 : 70), y = 168, p = Math.floor(t * 10) % 2; if (ciclo < 0.5 || ciclo > 0.7) { const cx = ciclo > 0.7 ? 70 + (ciclo - 0.7) / 0.3 * 40 : x, cy = y;
    R.rect(cx, cy - 2, cx + 3, cy - 1, tn(hex('#d8603a'))); R.pset(cx - 1, cy - 3, tn(hex('#d8603a'))); R.pset(cx + 4, cy - 3, tn(hex('#d8603a'))); R.pset(cx + 1, cy - 3, tn(e_P.oscuro)); R.pset(cx + 2, cy - 3, tn(e_P.oscuro)); R.pset(cx - 1 + p, cy, tn(hex('#a84a2a'))); R.pset(cx + 3 - p, cy, tn(hex('#a84a2a'))); }
    else { R.rect(70, y - 2, 73, y - 1, tn(hex('#d8603a'))); R.pset(71, y - 3, tn(e_P.oscuro)); R.pset(72, y - 3, tn(e_P.oscuro)); } }
  // el pescador que remienda la red junto a la barca (figurita de 10 px; las manos van y vienen)
  { const px = 232, py = 146, a = Math.sin(t * 3) > 0 ? 1 : 0; R.rect(px, py - 6, px + 3, py - 3, tn(e_P.ropa1)); R.rect(px - 1, py - 2, px + 4, py, tn(hex('#5a4a3a'))); R.rect(px, py - 9, px + 3, py - 7, tn(e_P.piel)); R.rect(px - 1, py - 10, px + 4, py - 10, tn(hex('#e8d08a'))); R.rect(px, py - 11, px + 3, py - 11, tn(hex('#e8d08a')));
    R.pset(px + 4, py - 5 + a, tn(e_P.piel)); R.pset(px + 5, py - 4, tn(e_P.piel)); for (let i = 0; i < 6; i++) R.pset(px + 5 + i, py - 3 + (i % 2), tn(hex('#8a7a5a'))); }
  e_barca(R, m, Math.round(300 - ((t * 2) % 180)), 100, t, 1, tn, 0.6, noche);
  e_barca(R, m, Math.round(130 + ((t * 1.1) % 160)), 91, t, 6, tn, 0.4, noche);
  e_gaviotas(R, t, m, noche ? 0 : 6, [100, 30, 320, 84], tn, 3);
  e_humo(R, t, m, 15, 48, tn, 5);
  return { suelo: 152, libre: [70, 224], horizonte: HOR, sol, casa: [12, 96, 112], orilla: [116, 126], barca: [240, 300, 145], pescador: [228, 238, 146] };
}

// por delante en la playa: matas de la duna en las esquinas de abajo que se mecen con el viento
function e_playaDelante(R, t, o) {
  const tn = e_tn(o.hora ?? 'dia', o.cielo ?? (o.calma ? 'gris' : 'claro'));
  for (const [x0, x1, sem] of [[0, 34, 1], [286, 319, 2]]) {
    for (let x = x0; x <= x1; x++) { const top = 172 + Math.round(Math.sin((x - x0) * 0.15 + sem) * 2); for (let y = top; y < 180; y++) R.pset(x, y, tn(h(x, y, 920) < 0.2 ? e_P.arenaS : y === top ? e_P.arenaL : e_P.arena)); }
    for (let k = 0; k < 18; k++) { const bx = x0 + Math.round(h(k, sem, 921) * (x1 - x0)), L = 8 + Math.round(h(k, sem, 922) * 12), incl = (h(k, sem, 923) - 0.5) * 0.8 + Math.sin(t * 1.4 + k * 0.5) * 0.25;
      for (let i = 0; i < L; i++) { const u = i / L; R.pset(Math.round(bx + incl * i + u * u * incl * 6), 175 - i, tn(i > L - 3 ? hex('#b8b878') : k % 3 ? hex('#7a8a4a') : hex('#5a6a3a'))); } }
  }
}

// los colores del día de sol tenue para lo que se ve por la ventana: cada color del paisaje gris de junio (tormenta 0)
// pasa a su tono con sol; los que no están en la lista (mezclas, casas, barcas) se aclaran y se calientan un poco
const a_VTN_SOL = { c0: '#6e9ccc', c1: '#80aad6', c2: '#98bee2', c3: '#b2d0ec', nS: '#a8b8cc', n: '#d2dce8', nL: '#eef2f6', nB: '#ffffff',
  m0: '#a2b4d0', m0S: '#7888aa', m1: '#6c8098', m1S: '#506278', nv: '#ffffff', nvS: '#c6d4ec', roca: '#68728c', rocaS: '#4a5268', bru: '#c2d4e8',
  jura: '#4e7258', juraS: '#36523e', juraL: '#6c8e62', ag0: '#94bedc', ag1: '#5e92bc', ag2: '#46769e', ag3: '#345c80', ola: '#c4e0f2', esp: '#f8fcff',
  hb: '#6a8e44', hbS: '#4c6c34', hbL: '#90b05a', hbD: '#36482a', viL: '#96b25a', vi: '#64823a', ve: '#4a7c4a', veS: '#305434' };

let a_vtnMapa = null, a_vtnCielo = null, a_vtnNube = null;

// pasa un color del paisaje gris a su tono de día (con su caché)
function a_vtnSol(c) {
  if (!a_vtnMapa) { a_vtnMapa = new Map(); const P = b_pal(0); for (const n in a_VTN_SOL) a_vtnMapa.set(P[n], hex(a_VTN_SOL[n]));
    a_vtnCielo = new Set(['c0', 'c1', 'c2', 'c3'].map((n) => P[n])); a_vtnNube = new Set(['n', 'nL', 'nB'].map((n) => P[n])); }
  let d = a_vtnMapa.get(c); if (d !== undefined) return d;
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  d = (0xff000000 | (Math.min(255, Math.round(b * 1.02 + 6)) << 16) | (Math.min(255, Math.round(g * 1.1 + 10)) << 8) | Math.min(255, Math.round(r * 1.14 + 14))) >>> 0;
  if (a_vtnMapa.size < 60000) a_vtnMapa.set(c, d); return d;
}

// el latón viejo de la barra de las cortinas del comedor
function a_mesaBarra(S) { return b_mez(S.oro[1], hex('#5a4a30'), 0.3); }

// TEATRO · general
// una luz cálida tramada en una elipse (cx, cy, rx, ry): aclara hacia col lo ya pintado, más en el centro (f, 0–1)
function b_luz(R, cx, cy, rx, ry, col, f) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const g = 1 - Math.hypot((x - cx) / rx, (y - cy) / ry); if (g > 0 && g * 1.6 > d_b4(x, y)) R.pset(x, y, d_mezcla(R.pget(x, y), col, f * Math.min(1, g * 1.8))); }
}
