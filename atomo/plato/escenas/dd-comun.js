// Fontanería y decorados del episodio 41 (Avengers: Doomsday, segunda parte: lo que Marvel ha enseñado desde agosto, y su
// paralelo en los cómics) en el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md):
// A el búnker de Banner (bunker); B las ruinas de Wundagore (wundagore); C el campo de batalla de los once pósters
// (batalla); D el plató de rodaje (plato); E la sala de los Vengadores y la sala de calificación (sala); F el cine (cine);
// G el estudio de Atom (estudio); H las viñetas de cómic (comic).
// CUIDADO:
// · Los héroes, dibujados por nosotros y reconocibles por sus atributos, SIN logos, SIN letras legibles y sin nada copiado
//   de las películas ni de los cómics (las viñetas de H son NUESTRAS, con el estilo de un cómic viejo, no copias).
// · Sin destripes ni filtraciones: solo lo que Marvel ha publicado. Nada morboso: la desaparición de Banner es luz verde y
//   un símbolo, no violencia; Wundagore es piedra y nieve, nadie herido a la vista. Nada de la muerte de Patrick Stewart.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Pósters, carteles y pantallas, con dibujos y cifras.
// · Los objetos NO tienen cara. La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del año (x 20–170,
//   y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes: ELENCO_DO (el reparto del 19: steve, thor, sam, hulk, loki, doom, rdj, feige, reed, sue, johnny,
// gambito, magneto, ciclope, mistica, rondador, bestia, yelena, bucky, guardian, shuri, mbaku, namor, shangchi, antman,
// peggy…) y ELENCO_DD (bannerDD, wandaDD, ultronDD, tommyDD, pietroDD, russoJoeDD, russoAnthonyDD, doomJovenDD, monjeDD,
// sueNegraDD, ejecutivoDD, padreDD, madreDD, usAgentDD); los escribe pixel-chibi.js.
// Se pueden reutilizar piezas de do-comun.js (el decorado del 19) importándolas: latveria, hoy (cine y cuarto), escenario
// (el plató de las sillas), palomitas… pero cada encuadre de aquí tiene que verse NUEVO y al nivel del 11.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, butacas, mostradores, cascotes)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: dos tramos, 2019–2025 (lo de antes) y 2026–2027 (lo de ahora); las viñetas de cómic van sin año.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LA LUZ VERDE DE DOOM: verde esmeralda (#3ae88a con halo #1a8a4a), en haces y chispas; deja un SÍMBOLO VERDE en el suelo
//   (un círculo con un rombo y cuatro trazos radiales, sin letras).
// · LA MÁSCARA DE DOOM: hierro gris con remaches, ranuras de ojos y boca; la capa y la capucha verdes.
// · LOS ONCE PÓSTERS: marcos verticales que, juntos, forman una sola imagen: ciudad en ruinas, humo, Centinelas (robots
//   gigantes morados y magenta, sin cara humana) al fondo y Doom en el centro.
// · LA BARRA DE CARGA DEL TRÁILER (hilo de gags de Atom): una barra horizontal con su porcentaje (número), que llega a 99 y
//   vuelve a 0; un reloj de cuenta atrás en la pared de Atom (números grandes).
// · LAS VIÑETAS DE CÓMIC: marco de viñeta con borde negro grueso, fondo con trama de puntos de imprenta (Ben-Day), colores
//   planos y algo envejecidos (papel amarillento), sombras con rayado; se distinguen al momento de la película.
//
//   import * as T from '/atomo/plato/escenas/dd-comun.js';
//   const { E, R, M } = await T.preparar('dd-gancho');
//   T.rodar(E, R, [[0, (t) => T.bunker(R, t, { encuadre: 'bunker' })]], { año: 2026 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_DO, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_DO, a_cifras };

// el reparto del episodio (ELENCO_DD) lo crea pixel-chibi.js; ELENCO_DO es el del 19
export const ELENCO_DD = KIT.ELENCO_DD || {};
export const ELENCO_DO = KIT.ELENCO_DO || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la luz de Doom, su hierro y su capa; el hormigón del búnker; la nieve y la piedra de Wundagore; las ruinas y el humo
    // de la batalla; los Centinelas; el plató (verde croma, focos); la madera de la sala de los Vengadores; el rojo de las
    // butacas del cine; el papel viejo de los cómics y su trama
    doomV: '#3ae88a', doomVS: '#1a8a4a', hierro: '#7a7e86', hierroS: '#4a4e56', capa: '#2a6a3a', capaS: '#1a4a26',
    hormigon: '#8a8a84', hormigonS: '#5a5a56', nieve: '#eef2f8', nieveS: '#b8c4d8', roca: '#4a4450', rocaS: '#2a2630',
    ruina: '#6a6470', ruinaS: '#3e3a46', humo: '#8a8494', centinela: '#8a3ab0', centinelaL: '#d85ab0',
    croma: '#3ab04a', foco: '#fff0b0', sala: '#5a3a24', butaca: '#a8283a', papel: '#f0e4c0', trama: '#d8c890', tinta: '#141018',
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
  const E = await escena(id, 'ep41');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 2019–2025 (lo de antes, la gema) y 2026–2027 (lo de ahora, la máscara de Doom); los cómics, sin año
  Object.assign(R.ICONOS, {
    gema: ['...#...', '..###..', '.#####.', '#######', '.#####.', '..###..', '...#...'],
    mascara: ['.#####.', '#######', '##.#.##', '#######', '#.###.#', '#.#.#.#', '.#####.'],
  });
  R.tramosTiempo([[2019, 2025, R.PALA.ORO, 'gema'], [2026, 2027, R.PALA.VERDE ?? R.PALA.AZUL, 'mascara']]);
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


// ── A · El búnker de Banner ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A bunkerDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
//   'bunker' (general): UN REFUGIO BAJO TIERRA de hormigón (paneles con juntas, manchas de humedad, conductos y cables por
//     el techo, una puerta estanca redonda con su volante a la izquierda, una escalera de pates que sube a una trampilla),
//     lleno de cosas de quien vive solo trabajando: una cama plegable con manta gris, cajas de material apiladas con
//     pictogramas, latas, un hornillo, una pizarra con fórmulas (garabatos y símbolos gamma γ como iconos), un panel con
//     pantallas que muestran gráficas verdes de rayos gamma (curvas que se mueven), una CÁMARA DE VÍDEO en trípode con su
//     piloto rojo que parpadea apuntando a una silla, un flexo y una TAZA DE CAFÉ en la mesa. Luz fría de fluorescente
//     que parpadea un poco. o.verde 0–1: una LUZ VERDE llena la sala desde un punto (o.foco [x, y], por omisión el centro
//     de la sala): haces, chispas, todo teñido de verde de fuera hacia dentro, sombras que se alargan; o.ruge 0–1: la
//     sala tiembla (polvo que cae del techo, la cámara vibra, la taza salta); o.vacio 1: después de la luz, la sala vacía
//     con el SÍMBOLO VERDE (canon) quemado en el suelo, humeando, la silla volcada y la TAZA rodando y dando vueltas en el
//     suelo (o.taza 0–1, el gag 2). Devuelve suelo 158, libre [60, 220], silla: [x, y] (donde se sienta Banner), camara:
//     [x, y] (el trípode; se llama tripode), simbolo: [x, y], taza: [x, y].
//     Cámara 'camara': EL PLANO DE LA PROPIA CÁMARA DE VÍDEO (lo que graba): el encuadre del visor, con su marco, la cifra
//     del tiempo de grabación que corre (números), el punto rojo REC (sin letras: solo el punto), la silla de frente y la
//     pared de detrás con la pizarra; o.verde, o.vacio como arriba. Devuelve suelo 170, libre [110, 210], silla: [x, y].
//   'pasillo': EL PASILLO DE ACCESO del búnker con la puerta estanca cerrada, tuberías, una luz roja de emergencia que gira,
//     cajas, el eco de la luz verde que se cuela por las rendijas (o.verde). Devuelve suelo 160, libre [30, 250],
//     puerta: [x, y]. Cámara 'suelo': EL SUELO DE CERCA, a ras: el símbolo verde humeante, la taza girando, unas gafas
//     caídas, polvo. Devuelve suelo 180, libre [0, 0], simbolo: [x, y], taza: [x, y].
const V_BUNKER = {
  bunker: { cam: 'camara', general: { col: ['#8a8a84', '#3a3a38'], geo: { suelo: 158, libre: [60, 220], silla: [150, 158], tripode: [210, 140], simbolo: [150, 166], taza: [120, 150] } }, camara: { col: ['#6a6a64', '#2a2a28'], geo: { suelo: 170, libre: [110, 210], silla: [160, 170] } } },
  pasillo: { cam: 'suelo', general: { col: ['#6a6a64', '#2a2a28'], geo: { suelo: 160, libre: [30, 250], puerta: [200, 110] } }, suelo: { col: ['#5a5a56', '#2a2a28'], geo: { suelo: 180, libre: [0, 0], simbolo: [160, 130], taza: [110, 140] } } },
};
export function bunker(R, t, o = {}) {
  return vista(R, t, o, V_BUNKER);
}
export function bunkerDelante(R, t, o = {}) {
  return {};
}


// ── B · Las ruinas de Wundagore ──────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A wundagoreDelante DESPUÉS DE LOS ACTORES (los cascotes de delante).
//   'ruinas' (general): LA MONTAÑA DE WUNDAGORE derrumbada: picos nevados al fondo bajo un cielo de tormenta violeta y gris
//     (nubes que corren, nieve que cae en diagonal), las ruinas de un templo de piedra oscura (columnas rotas y caídas,
//     escalones, un arco partido, relieves gastados sin letras), un montón de rocas y bloques en el centro, nieve
//     acumulada en las aristas, cuervos que cruzan. o.verde 0–1: una LUZ VERDE se abre paso entre las piedras del centro
//     (haces que salen por las rendijas); o.levanta 0–1: las rocas del centro se elevan flotando, envueltas en luz verde,
//     y dejan ver un hueco (donde está Wanda: la escena la pone); o.recuerdo 1: versión del derrumbe (2022): las rocas
//     caen en lugar de subir, polvo y una onda roja (el poder de la Bruja Escarlata) que se apaga. Devuelve suelo 160,
//     libre [30, 120] (a la izquierda del montón), hueco: [x, y] (donde yace Wanda), doom: [x, y] (dónde se planta Doom).
//     Cámara 'cara': DE CERCA, EN EL HUECO ENTRE LAS PIEDRAS: rocas alrededor del encuadre, nieve, la luz verde que entra
//     desde arriba; o.reflejo 0–1: un resplandor verde que cae sobre el centro (la cara de Wanda la pone la escena); a
//     o.negro 1 todo se funde a negro. Devuelve suelo 180, libre [100, 220], cara: [x, y].
//   'cumbre': LA CUMBRE DESDE LEJOS: la montaña entera bajo la tormenta con el templo derrumbado en lo alto, un valle con
//     un pueblito de tejados nevados, un bosque de abetos; o.verde 0–1: un punto de luz verde late en la cumbre.
//     Devuelve suelo 172, libre [20, 120], cumbre: [x, y]. Cámara 'tele': la televisión de Atom mostrando esta cumbre
//     (marco de televisor en un mueble, reflejo en la pantalla, la habitación en penumbra alrededor). Devuelve suelo 180,
//     libre [0, 0], pantalla: [x0, y0, x1, y1].
const V_WUNDAGORE = {
  ruinas: { cam: 'cara', general: { col: ['#6a6478', '#2a2630'], geo: { suelo: 160, libre: [30, 120], hueco: [190, 150], doom: [150, 160] } }, cara: { col: ['#4a4450', '#1a1620'], geo: { suelo: 180, libre: [100, 220], cara: [160, 100] } } },
  cumbre: { cam: 'tele', general: { col: ['#8a8498', '#3a3a48'], geo: { suelo: 172, libre: [20, 120], cumbre: [200, 50] } }, tele: { col: ['#2a2a3a', '#14141e'], geo: { suelo: 180, libre: [0, 0], pantalla: [80, 30, 240, 130] } } },
};
export function wundagore(R, t, o = {}) {
  return vista(R, t, o, V_WUNDAGORE);
}
export function wundagoreDelante(R, t, o = {}) {
  return {};
}


// ── C · El campo de batalla de los once pósters ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A batallaDelante DESPUÉS DE LOS ACTORES (cascotes y humo de delante).
//   'campo' (general): UNA CIUDAD EN RUINAS al atardecer: edificios rotos con ventanas vacías y vigas al aire, coches
//     volcados, farolas dobladas, humo en capas que se mueve, brasas, papeles que vuelan; al fondo, TRES CENTINELAS
//     gigantes (robots morados y magenta, cabeza de casco liso sin cara humana, ojos como ranuras de luz) entre el humo,
//     uno levanta un brazo; en el centro, una explanada con un cráter. o.doom 1: en el centro, en lo alto de unos cascotes,
//     el sitio de Doom con un resplandor verde (la escena pone a Doom). Devuelve suelo 158, libre [20, 260], doom: [x, y],
//     centinelas: [[x, y], …].
//     Cámara 'marcos': LA MISMA IMAGEN PARTIDA EN ONCE PÓSTERS: once marcos verticales con un borde blanco fino, colgados
//     en la pared del estudio de Atom (pared de ladrillo pintado, chinchetas), que juntos forman la ciudad en ruinas.
//     o.n 0–11: cuántos están puestos (los que faltan dejan ver la pared); o.cae 0–1: el último se despega y cae (el gag
//     3); dentro de cada marco, la escena pone a sus dos personajes. Devuelve suelo 180, libre [0, 0], marcos: once
//     [x0, y0, x1, y1] en orden de izquierda a derecha, el de Doom el sexto (el central).
//   'pareja': UN PÓSTER DE CERCA: un solo marco vertical grande en el centro con un trozo de la ciudad en ruinas detrás
//     (cambia según o.k 0–10, para que cada pareja tenga su trozo distinto), humo y luz de atardecer; huecos para dos
//     personajes. Devuelve suelo 150, libre [110, 210], izq: [x, y], der: [x, y]. Cámara 'ausente': un marco vacío con la
//     silueta recortada de un personaje grande y peludo (la Bestia) y una chincheta suelta. Devuelve suelo 150, libre [0, 0],
//     silueta: [x, y].
const V_BATALLA = {
  campo: { cam: 'marcos', general: { col: ['#a86a5a', '#3e3a46'], geo: { suelo: 158, libre: [20, 260], doom: [160, 120], centinelas: [[60, 70], [210, 60], [260, 80]] } }, marcos: { col: ['#c8a088', '#7a5a4a'], geo: { suelo: 180, libre: [0, 0], marcos: [[10, 40, 34, 140], [36, 40, 60, 140], [62, 40, 86, 140], [88, 40, 112, 140], [114, 40, 138, 140], [140, 40, 180, 140], [182, 40, 206, 140], [208, 40, 232, 140], [234, 40, 258, 140], [260, 40, 284, 140], [286, 46, 310, 140]] } } },
  pareja: { cam: 'ausente', general: { col: ['#a86a5a', '#3e3a46'], geo: { suelo: 150, libre: [110, 210], izq: [140, 150], der: [180, 150] } }, ausente: { col: ['#c8a088', '#7a5a4a'], geo: { suelo: 150, libre: [0, 0], silueta: [160, 120] } } },
};
export function batalla(R, t, o = {}) {
  return vista(R, t, o, V_BATALLA);
}
export function batallaDelante(R, t, o = {}) {
  return {};
}


// ── D · El plató de rodaje ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A platoDelante DESPUÉS DE LOS ACTORES (la cámara de cine y los cables de delante).
//   'plato' (general): UN PLATÓ de cine grande: telón de croma verde con marcas de seguimiento (cruces), focos en
//     trípodes y colgados de la parrilla del techo, una grúa de cámara que se mueve despacio (o.grua 0–1), sillas de
//     director (con lonas de colores, SIN letras), un carrito con monitores, cables por el suelo, un claqueta en una
//     mesa, técnicos al fondo (siluetas pequeñas que van y vienen); a un lado, UN SOPORTE CON LA MÁSCARA DE DOOM (canon)
//     bajo un foco. o.mascara 0–1: un foco se enciende sobre la máscara y brilla. o.telefono 1: un teléfono suena en una
//     mesa (vibra, ondas). Devuelve suelo 160, libre [40, 230], mascara: [x, y], telefono: [x, y].
//     Cámara 'mascara': LA MÁSCARA DE CERCA en su soporte: hierro con remaches, rasguños, la capucha verde colgada detrás,
//     reflejo de foco, polvo en el aire; o.mano 0–1 deja hueco a una mano que se acerca (la pone la escena). Devuelve suelo
//     180, libre [0, 0], mascara: [x, y].
//   'bosque': UN BOSQUE DE DECORADO dentro del plató: árboles de cartón piedra y troncos de verdad, niebla de máquina,
//     hojas secas, focos que se ven por arriba entre las ramas (es un plató), un riachuelo de atrezo; sitio para un grupo de
//     ocho héroes de pie. Devuelve suelo 158, libre [20, 260]. Cámara 'ensayo': LA ZONA DE ENSAYO DE PELEAS: colchonetas
//     azules, cables de arnés colgando, marcas de cinta en el suelo, un monitor con la pelea repetida (siluetas), sillas
//     plegables; sitio para dos parejas peleando. Devuelve suelo 160, libre [30, 250].
const V_PLATO = {
  plato: { cam: 'mascara', general: { col: ['#3ab04a', '#3a3a3a'], geo: { suelo: 160, libre: [40, 230], mascara: [250, 110], telefono: [80, 130] } }, mascara: { col: ['#2a2a2a', '#141414'], geo: { suelo: 180, libre: [0, 0], mascara: [160, 90] } } },
  bosque: { cam: 'ensayo', general: { col: ['#4a6a3a', '#2a3a20'], geo: { suelo: 158, libre: [20, 260] } }, ensayo: { col: ['#4a5a8a', '#2a2a3a'], geo: { suelo: 160, libre: [30, 250] } } },
};
export function plato(R, t, o = {}) {
  return vista(R, t, o, V_PLATO);
}
export function platoDelante(R, t, o = {}) {
  return {};
}


// ── E · La sala de los Vengadores y la sala de calificación ──────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A salaDelante DESPUÉS DE LOS ACTORES (la mesa larga, las butacas de la sala pequeña).
//   'reunion' (general): LA SALA DE REUNIONES DE LOS VENGADORES: ventanal con Nueva York de noche detrás (rascacielos con
//     ventanas encendidas, recortado al ventanal), una MESA LARGA de cristal y metal con sillas, un holograma azul en el
//     centro de la mesa (o.holo 0–1: gira y muestra iconos de los cinco equipos uno tras otro: un escudo, una estrella, una
//     garra de pantera, un 4 en un círculo, una X), TRES ESCUDOS redondos en una vitrina de pared (rojo, blanco y azul,
//     sin logos), un televisor grande en la pared (o.tele 0–1: muestra un anuncio con siluetas). Devuelve suelo 160, libre
//     [30, 260], holo: [x, y], tele: [x0, y0, x1, y1].
//     Cámara 'pantalla': UNA SALA DE CINE ENVOLVENTE (ScreenX): la pantalla central y las paredes laterales también con
//     imagen (perspectiva), butacas vistas desde atrás, dos sillas de director delante de la pantalla (para los Russo).
//     o.planos 0–1: la imagen se extiende a las paredes. Devuelve suelo 165, libre [100, 220], pantalla: [x0, y0, x1, y1].
//   'calificacion': UNA SALA DE PROYECCIÓN PEQUEÑA para el panel de padres: diez butacas en dos filas, una pantalla con
//     luz azulada (siluetas de una pelea), una mesa con fichas, un SELLO grande y una almohadilla de tinta; un archivador
//     al fondo con un calendario «1968» (número) y fotos viejas. o.tarjetas 0–1: los del panel levantan tarjetas (la
//     escena pone a los padres; el decorado pinta las tarjetas G, PG, PG-13, R, NC-17 como iconos de colores con números
//     solo donde los hay: 13 y 17); o.sello 0–3: el sello golpea (el gag 5: no marca hasta el tercero). Devuelve suelo 160,
//     libre [30, 200], sello: [x, y], pantalla: [x0, y0, x1, y1].
//     Cámara 'fichas': LA MESA DE CERCA: cinco fichas de cartulina en fila (las cuatro de los Vengadores anteriores con un
//     icono de cohete, la «ciencia ficción», y la nueva sin cohete y con dos iconos más: una gota y una espada), el sello y
//     la tinta; o.sello como arriba. Devuelve suelo 180, libre [0, 0], fichas: cinco [x, y].
const V_SALA = {
  reunion: { cam: 'pantalla', general: { col: ['#1a2a4a', '#5a3a24'], geo: { suelo: 160, libre: [30, 260], holo: [160, 120], tele: [40, 40, 110, 90] } }, pantalla: { col: ['#14141e', '#3a1a1e'], geo: { suelo: 165, libre: [100, 220], pantalla: [60, 30, 260, 120] } } },
  calificacion: { cam: 'fichas', general: { col: ['#2a2a3a', '#5a2a2a'], geo: { suelo: 160, libre: [30, 200], sello: [240, 130], pantalla: [40, 30, 200, 100] } }, fichas: { col: ['#c8a878', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], fichas: [[50, 100], [100, 100], [150, 100], [200, 100], [250, 100]] } } },
};
export function sala(R, t, o = {}) {
  return vista(R, t, o, V_SALA);
}
export function salaDelante(R, t, o = {}) {
  return {};
}


// ── F · El cine ──────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A cineDelante DESPUÉS DE LOS ACTORES (el mostrador, la cuerda de la cola).
//   'vestibulo' (general): EL VESTÍBULO DE UN CINE moderno: moqueta con dibujo, la taquilla y el mostrador de palomitas
//     (máquina de palomitas que revienta granos), carteles enmarcados (dibujos, sin letras: la máscara de Doom, un gusano de
//     arena para Dune), una PANTALLA DE VENTA con un CONTADOR de entradas (número grande que sube con o.ventas 0–1) y un
//     plano de la sala con asientos que se van llenando de color, una cola con su cuerda de terciopelo, luces de neón,
//     un reloj de pared. o.palomita 1: a Atom le salta una palomita (el gag 6; el decorado la lanza desde el cubo del
//     mostrador). Devuelve suelo 160, libre [20, 240], contador: [x, y], cubo: [x, y].
//     Cámara 'mapa': UN MAPA DEL MUNDO en un panel del vestíbulo con chinchetas y números de fecha (16, 17, 18) sobre Reino
//     Unido, China, España, México y Estados Unidos (o.fechas 0–1 las va encendiendo); al lado, un reloj grande con dos
//     horas y media marcadas. Devuelve suelo 180, libre [0, 0], reloj: [x, y].
//   'imax': DOS PUERTAS DE SALA lado a lado: la de la sala IMAX enorme (con su marquesina de bombillas, cartel de dibujo
//     del desierto de Dune) y la de al lado, normal, con el cartel de la máscara de Doom; un calendario en la pared con tres
//     semanas marcadas (o.semanas 0–3). Devuelve suelo 160, libre [20, 260]. Cámara 'sala': DENTRO DE LA SALA desde atrás:
//     filas de butacas rojas, la pantalla grande con luz (siluetas), el haz del proyector con polvo. Devuelve suelo 175,
//     libre [40, 280], pantalla: [x0, y0, x1, y1].
const V_CINE = {
  vestibulo: { cam: 'mapa', general: { col: ['#3a1a2a', '#6a2a3a'], geo: { suelo: 160, libre: [20, 240], contador: [220, 60], cubo: [80, 120] } }, mapa: { col: ['#2a3a5a', '#3a2a2a'], geo: { suelo: 180, libre: [0, 0], reloj: [270, 80] } } },
  imax: { cam: 'sala', general: { col: ['#2a1a2a', '#5a2a3a'], geo: { suelo: 160, libre: [20, 260] } }, sala: { col: ['#14101a', '#a8283a'], geo: { suelo: 175, libre: [40, 280], pantalla: [40, 20, 280, 110] } } },
};
export function cine(R, t, o = {}) {
  return vista(R, t, o, V_CINE);
}
export function cineDelante(R, t, o = {}) {
  return {};
}


// ── G · El estudio de Atom ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A estudioDelante DESPUÉS DE LOS ACTORES (la mesa).
//   'estudio' (general): EL ESTUDIO DE ATOM, de noche: una mesa con el ORDENADOR (en pantalla, LA BARRA DE CARGA del
//     tráiler con su porcentaje: o.carga 0–1 la llena y al 99 vuelve a 0 —el gag 1—), una lámpara de flexo, tazas, un cubo
//     de palomitas, figuritas de héroes (sin cara reconocible, solo colores), una ventana con la ciudad de noche
//     (recortada), una estantería con cómics apilados (lomos de colores sin letras) y LA PARED DE ATOM con un corcho donde
//     va pegando cosas (fotos, recortes, hilos rojos con chinchetas: o.pared 0–1 la va llenando) y EL RELOJ DE CUENTA
//     ATRÁS (números grandes de días que bajan: o.dias, por omisión 29). o.dormido 1: la lámpara baja, el ordenador queda
//     en reposo con la barra en 99 (el gag 7). Devuelve suelo 158, libre [30, 200], pantalla: [x0, y0, x1, y1], pared:
//     [x0, y0, x1, y1], reloj: [x, y].
//     Cámara 'tele': LA TELEVISIÓN DE ATOM en el salón (sofá, mantita, mando a distancia, alfombra), con la pantalla
//     encendida (o.imagen: la escena dibuja dentro de pantalla) y un calendario de pared al lado (o.mes, o.tachados).
//     Devuelve suelo 160, libre [20, 120], pantalla: [x0, y0, x1, y1], calendario: [x0, y0, x1, y1].
//   'pared': EL CORCHO DE CERCA: fotos clavadas (la escena dibuja dentro de los huecos), notas sin letras, hilos rojos,
//     chinchetas, un interrogante grande dibujado con rotulador; huecos para tres fotos y un recuadro vacío. Devuelve suelo
//     180, libre [0, 0], fotos: [[x0, y0, x1, y1], …] (cuatro). Cámara 'escritorio': LA MESA DESDE ARRIBA con el teclado,
//     el ratón, una hoja con dos firmas (garabatos), el móvil que vibra y el cubo de palomitas. Devuelve suelo 180,
//     libre [0, 0], hoja: [x, y].
const V_ESTUDIO = {
  estudio: { cam: 'tele', general: { col: ['#1a1e3a', '#5a4a3a'], geo: { suelo: 158, libre: [30, 200], pantalla: [210, 80, 270, 120], pared: [20, 30, 140, 100], reloj: [170, 50] } }, tele: { col: ['#1a1e3a', '#4a3a3a'], geo: { suelo: 160, libre: [20, 120], pantalla: [150, 50, 270, 130], calendario: [40, 40, 90, 90] } } },
  pared: { cam: 'escritorio', general: { col: ['#c8a070', '#7a5a3a'], geo: { suelo: 180, libre: [0, 0], fotos: [[30, 40, 90, 110], [110, 40, 170, 110], [190, 40, 250, 110], [120, 120, 200, 170]] } }, escritorio: { col: ['#7a5a3a', '#4a3424'], geo: { suelo: 180, libre: [0, 0], hoja: [160, 110] } } },
};
export function estudio(R, t, o = {}) {
  return vista(R, t, o, V_ESTUDIO);
}
export function estudioDelante(R, t, o = {}) {
  return {};
}


// ── H · Las viñetas de cómic ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Todo dentro de UNA VIÑETA (canon: marco negro grueso, papel amarillento, trama de puntos de
// imprenta, colores planos algo envejecidos, sombras rayadas, alguna onomatopeya como ICONO de estrella sin letras); el
// marco deja un margen de papel alrededor y la esquina de Atom fuera de la viñeta. LLAMA A comicDelante DESPUÉS DE LOS
// ACTORES (el marco y la trama por encima de todo, para que los personajes también parezcan impresos).
//   'fragua' (general): UN MONASTERIO EN LAS MONTAÑAS DEL TÍBET: picos nevados, banderitas de oración de colores (sin
//     letras), un patio con una FRAGUA encendida (brasas, yunque, tenazas, fuelle), vapor; o.mascara 0–1: unos monjes
//     sacan la máscara de hierro de la fragua y queda en el yunque, humeando (la escena pone a los monjes y a Doom joven).
//     Devuelve suelo 150, libre [40, 240], yunque: [x, y]. Cámara 'vapor': de cerca, la máscara humeante en las tenazas
//     y una capucha que se inclina (sin cara a la vista: el vapor la tapa). Devuelve suelo 180, libre [0, 0], mascara: [x, y].
//   'latveria': EL CASTILLO DE DOOM EN LATVERIA: salón de piedra con estandartes verdes (sin letras), vidrieras, un trono,
//     una alfombra larga, candelabros; o.boda 1: flores blancas, un arco floral y un altar (la escena pone a Wanda con velo
//     y a Doom). Devuelve suelo 160, libre [40, 250], altar: [x, y]. Cámara 'cuna': UNA HABITACIÓN de hospital de los
//     años 2000 en el estilo de cómic: una cuna con una bebé (sin cara detallada: un bultito con mantita y un mechón), una
//     cinta con flores; Doom se inclina sobre la cuna (lo pone la escena). Devuelve suelo 160, libre [60, 250],
//     cuna: [x, y].
//   'mundo': UN PLANETA HECHO DE TROZOS (Secret Wars): en el espacio, un mundo de parches de paisajes distintos cosidos
//     (selva, hielo, ciudad, desierto) con costuras de luz; o.choque 0–1: antes, burbujas de universos que chocan y se
//     rompen en trozos de cristal; o.trono 1: en lo alto, un trono enorme. Devuelve suelo 160, libre [40, 260],
//     trono: [x, y]. Cámara 'arena': EL PLANETA DE 1984 visto desde su superficie: un campo de batalla extraño de rocas
//     moradas, un cielo con planetas, una luz blanca que baja del cielo (o.luz 0–1) y deja a héroes y villanos (los pone la
//     escena); o.poder 0–1: la luz se desvía hacia un punto (donde está Doom). Devuelve suelo 158, libre [20, 280],
//     luz: [x, y], doom: [x, y].
const V_COMIC = {
  fragua: { cam: 'vapor', general: { col: ['#e8dcb8', '#8a6a4a'], geo: { suelo: 150, libre: [40, 240], yunque: [160, 140] } }, vapor: { col: ['#d8c8a0', '#5a4a3a'], geo: { suelo: 180, libre: [0, 0], mascara: [160, 90] } } },
  latveria: { cam: 'cuna', general: { col: ['#c8c0a0', '#3a5a3a'], geo: { suelo: 160, libre: [40, 250], altar: [200, 140] } }, cuna: { col: ['#e8e0c8', '#8a8a9a'], geo: { suelo: 160, libre: [60, 250], cuna: [160, 140] } } },
  mundo: { cam: 'arena', general: { col: ['#1a1a3a', '#5a3a6a'], geo: { suelo: 160, libre: [40, 260], trono: [160, 60] } }, arena: { col: ['#5a3a6a', '#2a1a3a'], geo: { suelo: 158, libre: [20, 280], luz: [160, 40], doom: [220, 158] } } },
};
export function comic(R, t, o = {}) {
  return vista(R, t, o, V_COMIC);
}
export function comicDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_DD = { bunker: V_BUNKER, wundagore: V_WUNDAGORE, batalla: V_BATALLA, plato: V_PLATO, sala: V_SALA, cine: V_CINE, estudio: V_ESTUDIO, comic: V_COMIC };
