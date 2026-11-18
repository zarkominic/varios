// Fontanería y decorados del episodio 39 (Roanoke: la colonia que desapareció y dejó una palabra) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Inglaterra, 1584–1588: el estudio de Raleigh,
// Plymouth y el puerto de la Armada (inglaterra); B el mar y los bancos de arena: la travesía, los Outer Banks y la
// tormenta de 1590 (mar); C la isla de Roanoke: el asentamiento de 1587, el poste de 1590, el huerto y el embarcadero
// (roanoke); D los pueblos algonquinos, como en las acuarelas de John White (pueblo); E Hatteras hoy: la excavación y la
// mesa de hallazgos (hatteras); F el Museo Británico y el Sitio X (museo); G hoy: el estudio de Atom (hoy).
// CUIDADO:
// · NADA DE MUERTES, ESQUELETOS, BATALLAS NI ARMAS EN USO. Los soldados de 1585 llevan casco y nada más en la mano; la
//   bala de 2026 es un objeto en una bandeja, SIN animal. Las teorías violentas (Jamestown) solo como un rumor de tiza
//   que se borra.
// · LOS PUEBLOS ALGONQUINOS DE LA COSTA (Secotan, Roanoke, Croatoan), CON RESPETO Y SEGÚN LAS ACUARELAS DE JOHN WHITE
//   (1585): casas alargadas de techo en arco cubiertas de esteras y cortezas, campos de maíz en tres alturas, girasoles y
//   calabazas, el fuego del centro, canoas de un solo tronco, nasas y cercos de cañas para pescar. Nada de tipis, tótems,
//   tocados de plumas de película ni pinturas de guerra.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. LA ÚNICA EXCEPCIÓN: las tallas «CRO» en el árbol de
//   la duna y «CROATOAN» en el poste de la empalizada, talladas píxel a píxel en la madera (son el corazón del episodio).
//   Mapas sin rótulos; libros y revistas con renglones sin letras.
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales; los
//   objetos NO tienen cara.
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del año (x 20–170, y 0–14; las cifras del año
//   bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_RK (whiteRK, raleighRK, manteoRK, wancheseRK, croatoanRK, croatoanaRK,
// ninoCroatoanRK, eleanorRK, ananiasRK, colonoRK, colonaRK, ninoColonoRK, soldadoRK, fernandesRK, drakeRK, marineroRK,
// lawsonRK, arqueologaRK, voluntarioRK, conservadoraRK); los escribe pixel-chibi.js (T.ELENCO_RK).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, barandas, troncos) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: tres tramos, 1584–1590 (la colonia), 1591–1999 (los siglos de las preguntas: Lawson, las piedras,
// los anillos) y 2000–2026 (el mapa, las excavaciones y hoy).
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LOS BARCOS DE 1587–1590: barcos ingleses de tres palos (galeón pequeño o filibote): casco de madera parda con la
//   popa alta (castillo de popa con ventanas y un farol), la proa con su castillo, velas cuadradas de lona cruda con la
//   CRUZ ROJA DE SAN JORGE pintada en la mayor, la bandera blanca con la cruz roja en el tope; cañoncitos sin disparar.
//   Los pinnazas (botes grandes de remo) para bajar a tierra.
// · LA ISLA DE ROANOKE: baja, de bosque de pinos y robles con musgo, dunas y juncales en la orilla, el estrecho de aguas
//   tranquilas y poco hondas detrás de los bancos de arena.
// · EL ASENTAMIENTO DE 1587: casitas de madera de una planta con techo de juncos (paja) y chimenea de barro, un huerto
//   cercado, un pozo, una herrería con su yunque. EN 1590 (o.epoca 1590): las casas DESMONTADAS (solo los postes de las
//   esquinas y tablas en montón, la hierba crecida) y UNA EMPALIZADA de troncos altos, aguzados, en forma de cerco, con
//   una entrada flanqueada por dos postes: en el de la DERECHA, tallado «CROATOAN» en vertical o en horizontal, a la
//   altura del pecho, sin cruz. Cofres abiertos y revueltos en la arena (los de White), sin nada horrible.
// · EL ÁRBOL DE LA DUNA: un roble viejo torcido por el viento en lo alto de la duna, con la corteza levantada y «CRO»
//   tallado en letras grandes.
// · LA CRUZ DEL PACTO: una cruz de brazos iguales con los extremos ensanchados (cruz de Malta), tallada, que NO aparece
//   en el poste (solo en la maqueta de Atom del gag 5).
// · LOS PUEBLOS (las acuarelas de White): casas alargadas de esteras sobre arcos de varas, una plaza con el fuego, el
//   maíz alto, canoas de un tronco quemado y raspado, nasas de cañas en el agua.
// · EL MAPA DE WHITE («La Virginea Pars»): la costa con los bancos de arena, el estrecho, ríos, barquitos y una rosa de
//   los vientos, en acuarela, SIN rótulos; dos parches de papel; bajo el del norte, una ESTRELLITA de cuatro puntas roja
//   y azul junto al estrecho de Albemarle.
// · LAS ESCAMAS DE HIERRO (hammerscale): copos diminutos gris azulado brillante que se pegan a un imán de herradura
//   rojo; la criba de malla metálica sobre un caballete.
// · EL ESTUDIO DE ATOM (hilo de gags): una mesa con la MAQUETA DE LA EMPALIZADA (palitos aguzados en círculo sobre arena
//   de corcho, con un postecito), un TACO DE NOTAS amarillas (con dibujos, nunca letras), una lupa, un CORTE DE TRONCO de
//   ciprés con sus anillos, un imán de herradura rojo.
//
//   import * as T from '/atomo/plato/escenas/rk-comun.js';
//   const { E, R, M } = await T.preparar('rk-gancho');
//   T.rodar(E, R, [[0, (t) => T.roanoke(R, t, { encuadre: 'poste', epoca: 1590 })]], { año: 1590 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras };

// el reparto del episodio (ELENCO_RK) lo crea pixel-chibi.js
export const ELENCO_RK = KIT.ELENCO_RK || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la madera de los barcos y la cruz roja de San Jorge, la lona cruda, el mar abierto y el estrecho de aguas verdes,
    // la arena de los bancos y de las dunas, el pino y el roble con su musgo, el junco de los techos, la estera de los
    // pueblos, el maíz, el tronco de las empalizadas, la acuarela del mapa y el papel viejo, el hierro de las escamas y
    // el rojo del imán
    cascoK: '#5a3a24', cascoKS: '#3e2818', cascoKL: '#7a5434', sanJorge: '#c8303a', lonaK: '#e8dcc0', lonaKS: '#c4b496',
    mar: '#2a5a7a', marS: '#1a3e58', marL: '#4a7e9a', estrecho: '#4a7a6a', estrechoS: '#2e5a4c', espuma: '#e8f0f2',
    arena: '#e8d4a4', arenaS: '#c8b080', pino: '#2e5a3a', pinoS: '#1e3e28', roble: '#6a7a3a', musgo: '#8a9a7a',
    junco: '#c8a860', juncoS: '#9a7e40', estera: '#b89a6a', esteraS: '#8a7048', maiz: '#d8b840', maizV: '#5a8a3a',
    tronco: '#7a5a3a', troncoS: '#54402a', troncoL: '#9a7a54', acuarela: '#7ab0c8', papel: '#efe6d0', papelS: '#d0c4a4',
    hierro: '#6a7a8a', hierroL: '#a8b8c8', iman: '#c8303a',
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
  const E = await escena(id, 'ep39');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1584–1590 (la colonia), 1591–1999 (Lawson, las piedras, los anillos), 2000–2026 (el mapa, las
  // excavaciones y hoy)
  Object.assign(R.ICONOS, {
    barco: ['...#...', '..##...', '.###...', '####.#.', '...#...', '#######', '.#####.'],
    pluma: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    pala: ['..###..', '..###..', '...#...', '...#...', '...#...', '..###..', '..###..'],
  });
  R.tramosTiempo([[1584, 1590, R.PALA.AZUL ?? R.PALA.ROJO, 'barco'], [1591, 1999, R.PALA.ORO, 'pluma'], [2000, 2026, R.PALA.ROJO, 'pala']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };


// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado por encima del suelo y el color oscuro
// por debajo, para que la página pinte
const provisional = (R, t, c0, c1, suelo = 180) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y >= suelo ? (h(x >> 1, y >> 1, 3) > 0.85 ? c0 : c1) : (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ESQUELETO: cada decorado tiene su tabla { encuadre: { cam: '<segunda cámara>', general: { col, geo }, <cam>: { col,
// geo } } }; la vista que piden las opciones (un encuadre que no existe cae en el primero; una cámara que no es la suya,
// en 'general') pinta su provisional y devuelve una copia de su geometría
function vista(R, t, o, V) {
  const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general', v = e[cam];
  provisional(R, t, hex(v.col[0]), hex(v.col[1]), v.geo.suelo ?? 180);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(v.geo)) };
}


// ── A · Inglaterra, 1584–1588: el estudio de Raleigh, Plymouth y el puerto de la Armada ─────────────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en inglaterraDelante (se llama después de los actores).
//   'raleigh': EL ESTUDIO DE WALTER RALEIGH en Londres, 1584: paneles de roble tallados, un ventanal de vidrios en rombo
//     emplomados con el Támesis y barcos (recortado), tapices, una mesa grande con un mapa del Atlántico extendido
//     (sin rótulos), compases, un astrolabio, un tintero con pluma, un GLOBO TERRÁQUEO en su soporte (o.globo 0–1: gira),
//     un perro lebrel tumbado, velas en candelabros. Deja sitio para raleighRK señalando en el mapa (el gag 2 lo hace la
//     escena: la pluma del sombrero). Devuelve suelo 160, libre [30, 250], mesa: [x0, y0, x1, y1], globo: [x, y].
//     Cámara 'globo': EL GLOBO Y EL MAPA de cerca: el globo con sus meridianos y la costa de América (sin rótulos) que
//     gira, el mapa debajo con dos barquitos de juguete; o.ruta 0–1: una línea de puntos que cruza el Atlántico hasta
//     unas islas largas. Devuelve globo: [x, y, r], america: [x, y] (dónde quedan las islas en el globo).
//   'plymouth': EL PUERTO DE PLYMOUTH, MAYO DE 1587: el muelle de piedra, casas de entramado de madera en la ladera, la
//     iglesia, tres barcos (canon) anclados y una pinaza junto al muelle; en el muelle, baúles, barriles, jaulas de
//     gallinas, una cabra, sacos, un carro de bueyes; gaviotas, la marea, gente pequeña de fondo. Deja sitio para que las
//     familias suban (whiteRK, eleanorRK, ananiasRK, colonoRK, colonaRK, ninoColonoRK). o.zarpa 0–1: las velas se izan y
//     los barcos salen del puerto. Devuelve suelo 160, libre [20, 230], pinaza: [x, y]. Cámara 'muelle': EL BORDE DEL
//     MUELLE de cerca con la pasarela a la pinaza, pilas de baúles y la jaula de gallinas en primer plano; la pinaza
//     cabecea. Devuelve suelo 166, libre [10, 300], pasarela: [x0, y0, x1, y1].
//   'armada': UN PUERTO INGLÉS EN 1588: los barcos grandes amarrados y desarbolados en parte (retenidos por orden de la
//     reina), soldados y cañones en la muralla, faroles de vigía encendidos en las colinas (almenaras); el cielo de
//     verano. o.estacion 0–1: pasan las estaciones (verano → otoño → invierno con nieve → primavera) sobre el mismo
//     puerto, para «pasaron dos años». Devuelve suelo 160, libre [30, 250]. Cámara 'horizonte': EL CANAL DE LA MANCHA
//     desde un acantilado blanco: en el horizonte, la ARMADA en media luna (muchas velas pequeñas con cruces rojas de
//     Borgoña sobre blanco: aspas, no letras), el humo de las almenaras; o.avance 0–1: la media luna cruza; o.derrota 1:
//     la media luna se deshace y las velas se dispersan con el viento (sin barcos ardiendo ni hundiéndose de cerca).
//     Devuelve suelo 170, libre [20, 140].
const V_INGLATERRA = {
  raleigh: { cam: 'globo', general: { col: ['#6a4a2a', '#3a2a1c'], geo: { suelo: 160, libre: [30, 250], mesa: [110, 120, 230, 150], globo: [250, 120] } }, globo: { col: ['#6a4a2a', '#3a2a1c'], geo: { suelo: 180, libre: [0, 0], globo: [160, 80, 50], america: [130, 85] } } },
  plymouth: { cam: 'muelle', general: { col: ['#a8c4dc', '#7a6a52'], geo: { suelo: 160, libre: [20, 230], pinaza: [250, 150] } }, muelle: { col: ['#a8c4dc', '#7a6a52'], geo: { suelo: 166, libre: [10, 300], pasarela: [200, 140, 280, 166] } } },
  armada: { cam: 'horizonte', general: { col: ['#a8c4dc', '#6a6458'], geo: { suelo: 160, libre: [30, 250] } }, horizonte: { col: ['#b8d0e8', '#e8e4d8'], geo: { suelo: 170, libre: [20, 140] } } },
};
export function inglaterra(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_INGLATERRA);
}
// lo de delante de los personajes en cada encuadre de inglaterra(); se llama después de los actores, con las mismas opciones
export function inglaterraDelante(R, t, o = {}) {
  return {};
}

// ── B · El mar y los bancos de arena: la travesía, los Outer Banks y la tormenta de 1590 ─────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en marDelante. Opciones de todo el grupo: o.luz 'dia' (por omisión) |
// 'tarde' (sol bajo, oro) | 'gris' (nubes bajas) | 'noche' (luna, estrellas; para el fuego entre los árboles de 1590).
//   'travesia': EL ATLÁNTICO con dos o tres barcos (canon) navegando juntos de costado, las velas hinchadas, olas con
//     espuma, delfines o una ballena que sopla a lo lejos, nubes en tres capas; o.barcos 1–3; o.piratas 1: un barco más
//     oscuro (casco negro, velas grises, bandera francesa de flores de lis doradas sobre azul, sin calaveras) se acerca
//     por detrás y se pone al lado (sin disparos: el humo de un cañonazo al aire como mucho). Devuelve barcos: [[x, y]…].
//     Cámara 'cubierta': LA CUBIERTA DE POPA de un barco de 1587: el castillo de popa, la caña del timón (pinzote), la
//     bitácora con la brújula, el farol, la borda con cabos y la mar detrás que sube y baja; deja sitio para
//     fernandesRK en el timón y colonos que señalan un mapa (el gag 3: una gaviota que se posa, la pone la escena).
//     Devuelve suelo 158, libre [20, 260], timon: [x, y], borda: y.
//   'bancos': LOS OUTER BANKS desde el mar, 1584–1590: islas largas y bajas de arena blanca con dunas y matojos, una
//     ensenada (paso entre islas) con olas que rompen en la barra, detrás el estrecho de aguas verdes tranquilas y, al
//     fondo, la isla de Roanoke con su bosque; pelícanos en fila, un humo fino que sube entre los árboles (o.humo 0–1).
//     Barcos (canon) fondeados fuera (o.barcos 0–3). Devuelve horizonte: y, roanoke: [x, y], humo: [x, y]. Cámara 'mapa':
//     EL MAPA DE LA COSTA como lo pintaría White, en acuarela sobre papel viejo, SIN rótulos: los bancos de arena, el
//     estrecho, Roanoke, la isla de Croatoan al sur, la bahía de Chesapeake al norte y el estrecho de Albemarle tierra
//     adentro, ríos, barquitos y una rosa de los vientos; o.marca 'chesapeake' | 'roanoke' | 'croatoan' | 'albemarle':
//     un círculo de tinta que late sobre ese lugar; o.ruta 'norte' (una línea de puntos de Roanoke a Chesapeake que se
//     corta con una X) | 'sur' (de Roanoke a Croatoan, unas cincuenta millas) | 'dentro' (de Roanoke tierra adentro).
//     Devuelve chesapeake: [x, y], roanoke: [x, y], croatoan: [x, y], albemarle: [x, y].
//   'tormenta': LA TORMENTA DE AGOSTO DE 1590 frente a la isla: nubes negras, rayos, lluvia en diagonal, olas grandes,
//     dos barcos (canon) que cabecean con las velas recogidas; o.cable 0–1: el cable del ancla se tensa y se ROMPE y el
//     barco deriva mar adentro; la isla se aleja. Devuelve barco: [x, y]. Cámara 'ancla': LA PROA de cerca: el cable que
//     sale por el escobén, tenso, que vibra y se parte (o.cable 0–1), la espuma que barre la cubierta, marineros pequeños
//     que tiran de cabos. Devuelve cable: [x0, y0, x1, y1].
const V_MAR = {
  travesia: { cam: 'cubierta', general: { col: ['#a8c8e0', '#2a5a7a'], geo: { suelo: 180, libre: [0, 0], barcos: [[100, 110], [210, 105]] } }, cubierta: { col: ['#a8c8e0', '#7a5a3a'], geo: { suelo: 158, libre: [20, 260], timon: [70, 140], borda: 120 } } },
  bancos: { cam: 'mapa', general: { col: ['#b8d8f0', '#2a5a7a'], geo: { suelo: 180, libre: [0, 0], horizonte: 90, roanoke: [180, 96], humo: [190, 80] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], chesapeake: [150, 30], roanoke: [175, 110], croatoan: [200, 160], albemarle: [90, 95] } } },
  tormenta: { cam: 'ancla', general: { col: ['#3a4250', '#1a2e40'], geo: { suelo: 180, libre: [0, 0], barco: [170, 110] } }, ancla: { col: ['#3a4250', '#5a3a24'], geo: { suelo: 180, libre: [0, 0], cable: [120, 100, 250, 170] } } },
};
export function mar(R, t, o = {}) {
  return vista(R, t, o, V_MAR);
}
export function marDelante(R, t, o = {}) {
  return {};
}

// ── C · La isla de Roanoke: el asentamiento de 1587, el poste de 1590, el huerto y el embarcadero ──────────────────
// o.encuadre (y o.camara). Lo de delante va en roanokeDelante. Opciones de todo el grupo: o.epoca 1587 (por omisión) |
// 1590 (ver el canon: casas desmontadas, empalizada, hierba crecida); o.luz 'dia' | 'tarde' | 'amanecer' (1590: niebla
// baja y luz rosada) | 'noche'.
//   'fuerte': EL ASENTAMIENTO desde el borde del bosque: las casitas (canon), el huerto, el pozo, la herrería con humo,
//     ropa tendida, gallinas, una cabra, el bosque de pinos con musgo detrás y el estrecho que brilla entre los árboles;
//     colonos pequeños que trabajan de fondo (en 1587). En 1590: la empalizada en círculo, las casas desmontadas, la
//     hierba, pájaros, ni una persona; o.humo 0–1 (1590, noche: un fuego lejano entre los árboles del norte de la isla).
//     Deja sitio para que los colonos arreglen una casa (1587) o para whiteRK y marineros que entran (1590). Devuelve
//     suelo 160, libre [20, 260], casa: [x0, y0, x1, y1] (la de los Dare, 1587), entrada: [x, y] (1590). Cámara 'casa':
//     DENTRO DE LA CASITA DE LOS DARE (1587): paredes de tablas con barro, el techo de juncos por dentro con sus vigas, el
//     hogar con un caldero, una mesa basta con un diario abierto (renglones sin letras), una pluma y un tintero, una CUNA
//     de madera junto al fuego (o.mece 0–1: se mece), una ventanita con el bosque; un gato que duerme (el gag 4 lo pone
//     la escena). Devuelve suelo 160, libre [30, 230], cuna: [x, y], mesa: [x0, y0, x1, y1].
//   'poste': LA ENTRADA DE LA EMPALIZADA EN 1590 de cerca: los troncos altos y aguzados, la entrada abierta y el POSTE DE
//     LA DERECHA con «CROATOAN» tallado (canon); o.talla 0–1: la talla se revela de arriba abajo con una luz de amanecer
//     que la barre (para el golpe); o.cruz 0: sin cruz, y si la escena lo pide, un hueco liso encima del nombre (donde
//     iría); dentro se ven cofres abiertos y revueltos, hierba, un cañón viejo tumbado y oxidado. Devuelve suelo 166,
//     libre [20, 200], talla: [x0, y0, x1, y1], hueco: [x, y]. Cámara 'arbol': EL ÁRBOL DE LA DUNA (canon) con «CRO», la
//     duna con matojos que se mueven, el mar detrás; o.talla 0–1. Devuelve suelo 162, libre [30, 180], talla: [x0, y0,
//     x1, y1].
//   'huerto': EL HUERTO Y EL GRANERO de los colonos: surcos, el maíz y las calabazas plantados tarde, un granero de
//     tablas con sacos; o.seco 0–1: la tierra se agrieta, las hojas amarillean y se rizan, los sacos se vacían (la
//     sequía, 1587–1589). Devuelve suelo 158, libre [30, 250], granero: [x0, y0, x1, y1]. Cámara 'embarcadero': EL
//     EMBARCADERO de tablas en la orilla del estrecho, juncales, una pinaza amarrada y los barcos lejos, fuera de los
//     bancos; deja sitio para la despedida de whiteRK con eleanorRK (que lleva a la niña, un bulto de mantas) y colonos.
//     o.zarpa 0–1: la pinaza se aleja. Devuelve suelo 164, libre [20, 230], pinaza: [x, y].
const V_ROANOKE = {
  fuerte: { cam: 'casa', general: { col: ['#a8c8e0', '#6a7a3a'], geo: { suelo: 160, libre: [20, 260], casa: [180, 100, 250, 150], entrada: [160, 160] } }, casa: { col: ['#7a5a3a', '#4a3424'], geo: { suelo: 160, libre: [30, 230], cuna: [210, 150], mesa: [80, 130, 150, 150] } } },
  poste: { cam: 'arbol', general: { col: ['#e8c8b8', '#7a5a3a'], geo: { suelo: 166, libre: [20, 200], talla: [230, 60, 250, 140], hueco: [240, 50] } }, arbol: { col: ['#b8d8f0', '#e8d4a4'], geo: { suelo: 162, libre: [30, 180], talla: [210, 80, 250, 100] } } },
  huerto: { cam: 'embarcadero', general: { col: ['#b8d8f0', '#8a6a44'], geo: { suelo: 158, libre: [30, 250], granero: [200, 100, 270, 150] } }, embarcadero: { col: ['#b8d8f0', '#4a7a6a'], geo: { suelo: 164, libre: [20, 230], pinaza: [260, 150] } } },
};
export function roanoke(R, t, o = {}) {
  return vista(R, t, o, V_ROANOKE);
}
export function roanokeDelante(R, t, o = {}) {
  return {};
}

// ── D · Los pueblos algonquinos de la costa (las acuarelas de John White) ───────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en puebloDelante. Opciones de todo el grupo: o.luz 'dia' | 'tarde' |
// 'noche'; o.seco 0–1 (la sequía: el maíz amarillo y bajo, la tierra agrietada).
//   'secotan': UN PUEBLO DE LA COSTA (Secotan, como lo pintó White en 1585): casas alargadas de esteras sobre arcos de
//     varas (canon), con las esteras laterales enrolladas, un camino central, la plaza con el fuego y el humo, campos de
//     maíz en tres alturas, girasoles y calabazas, una choza de vigilancia en alto sobre el maíz, el bosque detrás; gente
//     pequeña que trabaja de fondo (moler maíz en un mortero de tronco, cargar leña, niños que juegan). Deja sitio para
//     manteoRK, wancheseRK, croatoanRK, croatoanaRK, ninoCroatoanRK, y para colonos que se acercan con cestas. Devuelve
//     suelo 160, libre [20, 250], fuego: [x, y]. Cámara 'canoas': LA ORILLA DEL PUEBLO: dos canoas de un tronco (una a
//     medio hacer, con brasas en el hueco y una raspadora), nasas y cercos de cañas en el agua, peces que saltan, garzas,
//     el estrecho brillante; o.canoa 0–1: una canoa con gente sale del cuadro por el agua (para irse a Croatoan). Devuelve
//     suelo 162, libre [20, 200], canoa: [x, y].
//   'lawson': EL PUEBLO DE HATTERAS HACIA 1701, AL ATARDECER: más pequeño, en una isla de arena con robles achaparrados y
//     dunas, casas de esteras y alguna de tablas, un fuego encendido con gente sentada alrededor; el mar detrás. Deja
//     sitio para lawsonRK sentado o de pie escuchando y para croatoanRK/croatoanaRK que cuentan. Devuelve suelo 160,
//     libre [30, 250], fuego: [x, y]. Cámara 'fuego': JUNTO AL FUEGO de cerca: las llamas que bailan y sus chispas, las
//     caras iluminadas de lado, un libro abierto de Lawson (renglones sin letras) sobre una rodilla, un cuenco; o.ojos 1:
//     dos ojitos grises que brillan a la luz (el detalle de Lawson, dibujado con respeto). Devuelve suelo 170, libre [20,
//     260], libro: [x, y].
const V_PUEBLO = {
  secotan: { cam: 'canoas', general: { col: ['#b8d8f0', '#8a7a4a'], geo: { suelo: 160, libre: [20, 250], fuego: [160, 150] } }, canoas: { col: ['#b8d8f0', '#4a7a6a'], geo: { suelo: 162, libre: [20, 200], canoa: [220, 160] } } },
  lawson: { cam: 'fuego', general: { col: ['#e8a878', '#8a7a4a'], geo: { suelo: 160, libre: [30, 250], fuego: [170, 150] } }, fuego: { col: ['#3a2418', '#5a3a24'], geo: { suelo: 170, libre: [20, 260], libro: [120, 150] } } },
};
export function pueblo(R, t, o = {}) {
  return vista(R, t, o, V_PUEBLO);
}
export function puebloDelante(R, t, o = {}) {
  return {};
}

// ── E · Hatteras hoy: la excavación y la mesa de hallazgos ───────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en hatterasDelante.
//   'excavacion': LA EXCAVACIÓN EN HATTERAS (Buxton/Frisco, hoy): un claro entre robles achaparrados y matorral de
//     arena, cerca del agua (una ensenada que brilla), cuadrículas de cordel con estacas, catas escalonadas con sus
//     capas (arena clara, una capa oscura de conchas, la tierra de debajo), cubos, paletas, una carretilla, una sombrilla,
//     cribas de malla sobre caballetes, una nevera, una mesa plegable, vecinos pequeños de fondo que criban; mosquitos
//     y una garza. Deja sitio para arqueologaRK y voluntarioRK. Devuelve suelo 160, libre [20, 250], criba: [x, y], mesa:
//     [x0, y0, x1, y1]. Cámara 'criba': LA CRIBA DE CERCA: la malla con tierra que cae al sacudirla, conchas, piedrecitas;
//     un IMÁN de herradura rojo (canon) que baja y sube con ESCAMAS de hierro pegadas (o.iman 0–1; o.escamas 0–1, el
//     brillo de las escamas); el clip y una moneda que también se pegan (o.gag 1, el gag 7). Devuelve iman: [x, y].
//   'mesa': LA MESA DE HALLAZGOS bajo un toldo, en la excavación: bolsitas con etiquetas (sin letras: rayas y números),
//     una EMPUÑADURA DE ESPADA verde de óxido, trozos de una llave de arcabuz, un pedazo de PIZARRA de escribir con su
//     lápiz de plomo, un ANILLO de latón sobre una tela, una regla escala; un cuaderno, una cámara, un cepillo. Deja sitio
//     para arqueologaRK que coloca piezas. Devuelve suelo 162, libre [20, 120], piezas: [[x, y]…] (espada, armas,
//     pizarra, anillo). Cámara 'laboratorio': UN LABORATORIO de hoy (2026): una bandeja con huesecillos de pescado y de
//     ciervo SIN animal, una mazorca seca, un cuenco de barro, gráficas de barras en una pantalla (sin letras), un
//     microscopio, viales; bajo una lupa con luz, una BALA DE PLOMO redonda y gris (o.lupa 0–1). Devuelve suelo 170,
//     libre [20, 120], bala: [x, y].
const V_HATTERAS = {
  excavacion: { cam: 'criba', general: { col: ['#b8d8f0', '#c8b080'], geo: { suelo: 160, libre: [20, 250], criba: [200, 140], mesa: [240, 130, 300, 150] } }, criba: { col: ['#c8b080', '#6a7a8a'], geo: { suelo: 180, libre: [0, 0], iman: [160, 70] } } },
  mesa: { cam: 'laboratorio', general: { col: ['#e8e0cc', '#8a7a5a'], geo: { suelo: 162, libre: [20, 120], piezas: [[150, 120], [190, 122], [230, 120], [270, 124]] } }, laboratorio: { col: ['#e8ecee', '#c8ccd0'], geo: { suelo: 170, libre: [20, 120], bala: [210, 110] } } },
};
export function hatteras(R, t, o = {}) {
  return vista(R, t, o, V_HATTERAS);
}
export function hatterasDelante(R, t, o = {}) {
  return {};
}

// ── F · El Museo Británico (2012) y el Sitio X ────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en museoDelante.
//   'sala': UNA SALA DE ESTUDIO DEL MUSEO BRITÁNICO, 2012: estanterías con cajas de archivo, columnas, una ventana alta,
//     una MESA DE LUZ grande con el mapa de White (canon) encima, un aparato de rayos X en un brazo articulado, lámparas,
//     guantes blancos, una cámara en trípode; deja sitio para conservadoraRK inclinada sobre la mesa. o.luz 0–1: la mesa
//     de luz se enciende. Devuelve suelo 160, libre [30, 250], mesa: [x0, y0, x1, y1]. Cámara 'mapa': EL MAPA DE WHITE
//     DE CERCA (canon), en acuarela, sin rótulos, iluminado desde abajo; o.parche 0–1: el parche del norte se vuelve
//     transparente con la luz y aparece debajo la ESTRELLITA roja y azul (que late un poco); un dedo con guante blanco
//     puede señalar (lo pone la escena con T.mano). Devuelve parche: [x0, y0, x1, y1], estrella: [x, y].
//   'sitiox': EL SITIO X, junto al estrecho de Albemarle: un campo llano con un bosque de cipreses y pinos al borde del
//     agua ancha y marrón, una excavación con cuadrículas, cribas, una camioneta, una garza; o.hallazgo 0–1: en una
//     cuadrícula aparecen trozos de cerámica que brillan. Devuelve suelo 160, libre [20, 240], cuadricula: [x, y].
//     Cámara 'ceramica': LOS TROZOS DE CERÁMICA de cerca sobre una bandeja: barro claro con vidriado verde y uno pardo
//     (Border ware y North Devon), una regla escala, un cepillo; o.encaja 0–1: los trozos se acercan como para encajar
//     en el perfil de una jarra dibujado a lápiz. Devuelve bandeja: [x0, y0, x1, y1].
const V_MUSEO = {
  sala: { cam: 'mapa', general: { col: ['#d8d0c0', '#5a4a3a'], geo: { suelo: 160, libre: [30, 250], mesa: [100, 110, 240, 150] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], parche: [120, 50, 170, 80], estrella: [145, 65] } } },
  sitiox: { cam: 'ceramica', general: { col: ['#b8d0e0', '#6a7a3a'], geo: { suelo: 160, libre: [20, 240], cuadricula: [180, 150] } }, ceramica: { col: ['#e8e0cc', '#8a7a5a'], geo: { suelo: 180, libre: [0, 0], bandeja: [70, 60, 250, 150] } } },
};
export function museo(R, t, o = {}) {
  return vista(R, t, o, V_MUSEO);
}
export function museoDelante(R, t, o = {}) {
  return {};
}

// ── G · Hoy: el estudio de Atom ────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en hoyDelante.
//   'estudio': EL ESTUDIO DE ATOM: estanterías con libros (lomos sin letras), una ventana con la costa de hoy (dunas y
//     un faro a rayas blanco y negro, recortado), una lámpara, una alfombra, una planta, un mapa antiguo enmarcado (sin
//     rótulos), y la MESA con la MAQUETA DE LA EMPALIZADA, el TACO DE NOTAS, la lupa, el corte de tronco y el imán
//     (canon); en la pared, junto a la puerta, un tablero de corcho donde Atom pega sus NOTAS: o.nota 'taza' (un dibujo de
//     una taza con una flecha que no se sabe adónde va, el gag 1) | 'flecha' (una flecha clara hacia una isla dibujada,
//     el gag 8) | null. Devuelve suelo 158, libre [40, 250], maqueta: [x, y], nota: [x, y]. Cámara 'maqueta': LA MAQUETA
//     DE CERCA: la empalizada de palitos sobre arena de corcho, casitas de cartón, un postecito; una navaja de tallar en
//     un hueco del cuadro (la mano la pone la escena); o.talla 0–1: en el postecito aparece una talla (rayas, sin letras
//     legibles a esa escala) y o.cruz 0–3: una cruz encima que sale torcida (1), otra torcida (2) y bien (3) (el gag 5).
//     Devuelve poste: [x, y].
//   'mesa': LA MESA DE TRABAJO de Atom con luz de flexo: el CORTE DE TRONCO de ciprés (canon) grande, con sus anillos y
//     la corteza, una lupa grande, una BALANZA de platillos de latón, una mazorca, una espadita de juguete, una revista
//     científica cerrada (sin letras), papeles; o.anillos 0–1: un tramo de anillos finísimos se ilumina (los de 1587–1589)
//     y el tronco cruje (unas grietitas que se abren un píxel); o.balanza -1…1: hacia dónde cae. Devuelve suelo 160, libre
//     [30, 120], tronco: [x, y, r], balanza: [x, y]. Cámara 'piedras': UNA ESTANTERÍA CON PIEDRAS TALLADAS (las «Dare
//     Stones» de 1937): piedras grises con rayas de talla (sin letras legibles), que se van llenando de florituras
//     (o.floritura 0–1); o.rompe 1: la última se parte y se ve que por dentro es yeso blanco. Devuelve piedras: [[x, y]…].
const V_HOY = {
  estudio: { cam: 'maqueta', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 250], maqueta: [120, 125], nota: [60, 70] } }, maqueta: { col: ['#e8d8c0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], poste: [170, 90] } } },
  mesa: { cam: 'piedras', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 160, libre: [30, 120], tronco: [200, 110, 40], balanza: [260, 110] } }, piedras: { col: ['#d8c8b0', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], piedras: [[80, 100], [140, 100], [200, 100], [250, 100]] } } },
};
export function hoy(R, t, o = {}) {
  return vista(R, t, o, V_HOY);
}
export function hoyDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_RK = { inglaterra: V_INGLATERRA, mar: V_MAR, roanoke: V_ROANOKE, pueblo: V_PUEBLO, hatteras: V_HATTERAS, museo: V_MUSEO, hoy: V_HOY };
