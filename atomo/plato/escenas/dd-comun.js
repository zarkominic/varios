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
//     con el SÍMBOLO VERDE (canon) quemado en el suelo, humeando, y la silla volcada; la taza sigue en la mesa. La TAZA
//     rodando y dando vueltas en el suelo solo sale si además se pasa o.taza (0–1, el gag 2 de dd-bunker: a 0 gira
//     deprisa bajo la mesa, a 1 se para en x 104). Devuelve suelo 158, libre
//     [60, 220], silla: [154, 158] (donde se sienta Banner), tripode: [212, 128] (la cámara), simbolo: [150, 167], taza:
//     [134, 127] en la mesa (o donde rueda), foco: [150, 110], mesa: [94, 128, 146, 150], puerta: [30, 100].
//     Cámara 'camara': EL PLANO DE LA PROPIA CÁMARA DE VÍDEO (lo que graba): el encuadre del visor, con su marco, la cifra
//     del tiempo de grabación que corre (números), el punto rojo REC (sin letras: solo el punto), la silla de frente y la
//     pared de detrás con la pizarra, la consola, un taburete con la taza (x 194–214); o.verde, o.ruge (la imagen se rasga),
//     o.vacio como arriba (la silla volcada a la izquierda). Devuelve suelo 170, libre [110, 210], silla: [160, 170],
//     simbolo: [160, 160], foco: [160, 120], taburete: [204, 146] (la taza encima).
//   'pasillo': EL PASILLO DE ACCESO del búnker con la puerta estanca cerrada, tuberías, una luz roja de emergencia que gira,
//     cajas, el eco de la luz verde que se cuela por las rendijas (o.verde), o.ruge. Devuelve suelo 160, libre [30, 250],
//     puerta: [200, 105] (el centro; la hoja ocupa 172–228 × 64–146), foco: [200, 106]. Cámara 'suelo': EL SUELO DE CERCA,
//     a ras: el símbolo verde humeante, la taza girando (o.taza como arriba), unas gafas caídas (214, 150), la silla
//     volcada al fondo, el rayo de luz con motas. Devuelve suelo 180, libre [0, 0], simbolo: [160, 130], taza: [110, 140].
//   o.foco [x, y] mueve el centro de la luz verde (bunkerDelante). Las piezas exportadas a_simbolo y a_luzVerde dibujan el
//   símbolo y la luz verde canónicos en cualquier decorado.
const V_BUNKER = {
  bunker: { cam: 'camara', general: { col: ['#8a8a84', '#3a3a38'], geo: { suelo: 158, libre: [60, 220], silla: [154, 158], tripode: [212, 128], simbolo: [150, 167], taza: [134, 127], foco: [150, 110], mesa: [94, 128, 146, 150], puerta: [30, 100] } }, camara: { col: ['#6a6a64', '#2a2a28'], geo: { suelo: 170, libre: [110, 210], silla: [160, 170], simbolo: [160, 160], foco: [160, 120], taburete: [204, 146] } } },
  pasillo: { cam: 'suelo', general: { col: ['#6a6a64', '#2a2a28'], geo: { suelo: 160, libre: [30, 250], puerta: [200, 105], foco: [200, 106] } }, suelo: { col: ['#5a5a56', '#2a2a28'], geo: { suelo: 180, libre: [0, 0], simbolo: [160, 130], taza: [110, 140] } } },
};
export function bunker(R, t, o = {}) {
  const { enc, cam, geo } = a_resolver(o, V_BUNKER);
  const v = Math.max(0, Math.min(1, o.verde ?? 0)), ru = Math.max(0, Math.min(1, o.ruge ?? 0)), vacio = (o.vacio ?? 0) >= 0.5;
  // el temblor: todo el fondo se mueve un poco
  const dx = ru > 0 ? Math.round(Math.sin(t * 53) * 2.2 * ru) : 0, dy = ru > 0 ? Math.round(Math.cos(t * 41) * 1.6 * ru) : 0;
  if (enc === 'bunker' && cam === 'general') {
    a_copiar(R, a_capa(R, 'bunker', () => a_bunkerFijo(R)), dx, dy);
    a_bunkerVida(R, t, o, v, ru, vacio, dx, dy, geo);
  } else if (enc === 'bunker') {
    a_copiar(R, a_capa(R, 'bunkerCam', () => a_bunkerCamFijo(R)), dx, dy);
    a_bunkerCamVida(R, t, o, v, ru, vacio, dx, dy, geo);
  } else if (cam === 'general') {
    a_copiar(R, a_capa(R, 'pasillo', () => a_pasilloFijo(R)), dx, dy);
    a_pasilloVida(R, t, o, v, ru, geo);
  } else {
    a_copiar(R, a_capa(R, 'pasilloSuelo', () => a_sueloFijo(R)), 0, 0);
    a_sueloVida(R, t, o, geo);
  }
  // LA LUZ VERDE, por detrás de los actores: el tinte de la sala, los haces, las chispas y el núcleo con su halo (el
  // ambiente entero); bunkerDelante solo añade por encima la luz que ilumina a los actores, sin taparlos
  if (v > 0.01 && !(enc === 'pasillo' && cam !== 'general')) { const [fx, fy] = a_focoBunker(o, enc, cam);
    if (enc === 'pasillo') a_luzVerde(R, fx, fy, v * 0.45, t, { haces: false }); else a_luzVerde(R, fx, fy, v, t); }
  return geo;
}
// lo que va por delante de los personajes en el búnker: la luz verde que ILUMINA a los actores (un tinte suave, tope
// 0,3, que deja leer caras y ropa, y chispas sueltas; el tinte fuerte, los haces y el núcleo los pinta bunker() por
// detrás, así que da igual llamar a esto antes o después de los actores), el polvo que cae del techo cuando ruge, la caja de herramientas y el rollo de cable del
// primer término; en la cámara 'camara', el visor de la cámara de vídeo (esquinas, cifra del tiempo, punto rojo, pila,
// líneas de barrido y, si ruge, la imagen que se rasga); en 'suelo', las motas en el rayo de luz
export function bunkerDelante(R, t, o = {}) {
  const { enc, cam } = a_resolver(o, V_BUNKER);
  const v = Math.max(0, Math.min(1, o.verde ?? 0)), ru = Math.max(0, Math.min(1, o.ruge ?? 0));
  const foco = a_focoBunker(o, enc, cam);
  if (enc === 'bunker' && cam === 'general') {
    a_cajaHerramientas(R, t, ru);
    if (v > 0.01) a_luzSobre(R, foco[0], foco[1], v, t);
    if (ru > 0.01) a_polvo(R, t, ru, 0, 320);
  } else if (enc === 'bunker') {
    if (v > 0.01) a_luzSobre(R, foco[0], foco[1], v, t);
    a_visor(R, t, ru);
  } else if (cam === 'general') {
    if (v > 0.01) a_luzSobre(R, foco[0], foco[1], v * 0.45, t);
    if (ru > 0.01) a_polvo(R, t, ru, 0, 320);
  } else {
    a_motas(R, t);
  }
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
//     libre [30, 120] (a la izquierda del montón), hueco: [204, 152] (donde yace Wanda, sobre un lecho de nieve), doom:
//     [140, 160] (dónde se planta Doom), monton: [150, 96, 264, 162]. Las rocas que tapan el hueco las pinta
//     wundagoreDelante: Wanda queda tapada hasta que o.levanta las sube.
//     Cámara 'cara': DE CERCA, EN EL HUECO ENTRE LAS PIEDRAS: rocas alrededor del encuadre, nieve, la luz verde que entra
//     desde arriba; o.reflejo 0–1: un resplandor verde que cae sobre el centro (la cara de Wanda la pone la escena); a
//     o.negro 1 todo se funde a negro. Devuelve suelo 180, libre [100, 220], cara: [160, 118] (donde reposa la cabeza),
//     lecho: [100, 104, 220, 142].
//     EL RELÁMPAGO (ruinas y cara): un rayo lejano cada 2–4 s (nunca un plano de 4 s sin él) que aclara el cielo y la
//     nieve y enciende el filo de las rocas; o.rayo t (o [t, …]): fuerza un rayo en ese instante, para que caiga con el
//     trueno de la escena. Las rocas son de cuatro piedras (granito, basalto, caliza, pizarra) con aristas, vetas,
//     grietas, musgo y nieve, cada una distinta.
//   'cumbre': LA CUMBRE DESDE LEJOS: la montaña entera bajo la tormenta con el templo derrumbado en lo alto, un valle con
//     un pueblito de tejados nevados, un bosque de abetos; o.verde 0–1: un punto de luz verde late en la cumbre.
//     Devuelve suelo 172, libre [20, 120], cumbre: [200, 46]. Cámara 'tele': la televisión de Atom mostrando esta cumbre
//     (marco de televisor en un mueble, reflejo en la pantalla, la habitación en penumbra alrededor); o.canal 'ruinas':
//     la pantalla muestra las ruinas (con o.recuerdo, o.verde, o.levanta: el derrumbe de 2022). Devuelve suelo 180,
//     libre [0, 0], pantalla: [80, 30, 240, 130].
const V_WUNDAGORE = {
  ruinas: { cam: 'cara', general: { col: ['#6a6478', '#2a2630'], geo: { suelo: 160, libre: [30, 120], hueco: [204, 152], doom: [140, 160], monton: [150, 96, 264, 162], onda: [205, 140], tapa: [178, 136, 236, 162] } }, cara: { col: ['#4a4450', '#1a1620'], geo: { suelo: 180, libre: [100, 220], cara: [160, 118], lecho: [100, 104, 220, 142] } } },
  cumbre: { cam: 'tele', general: { col: ['#8a8498', '#3a3a48'], geo: { suelo: 172, libre: [20, 120], cumbre: [200, 46] } }, tele: { col: ['#2a2a3a', '#14141e'], geo: { suelo: 180, libre: [0, 0], pantalla: [80, 30, 240, 130] } } },
};
// Los dos encuadres con sus dos cámaras. Lo fijo va en búferes de R.nuevo() (a_capa; el cielo, aparte, y las montañas
// con el cielo transparente, para que las nubes pasen por detrás de los picos); cada fotograma: las nubes de tormenta en
// tres tonos y a tres velocidades, el relámpago lejano, la nieve que cae en diagonal, los cuervos, el humo de las
// chimeneas, las ventanas y la gente del pueblo, la luz verde y las rocas. Las rocas que tapan el hueco (y las que
// flotan), los cascotes del primer término, la nieve de delante, la onda roja del recuerdo y el fundido a negro de la
// cámara 'cara' los pinta wundagoreDelante.
//   GEOMETRÍA 'ruinas' general: horizonte de montañas y 50–100; meseta de nieve desde y 128; los actores en 160.
//     Columna rota alta x 18–30 (hasta y 62, con un cuervo encima); arco partido x 40–118 (pilares hasta y 92); columna
//     corta x 128–140; tambores de columna caídos x 64–112 (y 140–150); EL MONTÓN de rocas x 150–264 (cima en 206, 96);
//     EL HUECO (lecho de nieve) en 182–228 × 138–156, centro [204, 152]; pared con relieves x 270–318 × 98–142; columna
//     x 252–264 hasta y 76. Doom se planta en [140, 160].
//   'cara': cueva de rocas; la abertura del cielo arriba en x 120–206 × 0–40; el lecho de nieve x 100–220 × 104–142 (la
//     cabeza en [160, 118]); las rocas de abajo (y 146–180) y las puntas de los lados van delante.
//   'cumbre' general: la montaña con la cumbre en [200, 48] (el templo arriba, x 188–214); bosque y 118–160; el pueblo
//     x 150–300 × 140–166; la cornisa de nieve del primer término y 166–180 (los actores, en 172, x 20–120).
//   'tele': el televisor x 74–246 × 24–136 (pantalla [80, 30, 240, 130]), el mueble x 30–290 × 140–180.
export function wundagore(R, t, o = {}) {
  const { enc, cam, geo } = a_resolver(o, V_WUNDAGORE);
  if (enc === 'ruinas' && cam === 'general') a_ruinas(R, t, o);
  else if (enc === 'ruinas') a_cara(R, t, o);
  else if (cam === 'general') a_cumbre(R, t, o);
  else a_tele(R, t, o);
  return geo;
}
// lo que va por delante de los personajes en Wundagore: en 'ruinas', las rocas que tapan el hueco (o.levanta las eleva
// envueltas en luz verde; con o.verde, los haces salen por sus rendijas), los cascotes nevados del primer término, la
// nieve de delante y, con o.recuerdo, las rocas que caen, el polvo y la onda roja que se apaga; en 'cara', las rocas de
// abajo y las puntas de los lados, la nieve que entra y o.negro (fundido a negro); en 'cumbre', la nieve de delante
export function wundagoreDelante(R, t, o = {}) {
  const { enc, cam } = a_resolver(o, V_WUNDAGORE);
  if (enc === 'ruinas' && cam === 'general') a_ruinasDelante(R, t, o);
  else if (enc === 'ruinas') a_caraDelante(R, t, o);
  else if (cam === 'general') a_nieve(R, t, 1, 0.9);
  return {};
}
// ── C · El campo de batalla de los once pósters ──────────────────────────────────────────────────────────────────────
const B_MARCOS = (() => { const r = []; let x = 3; for (let i = 0; i < 11; i++) { const w = i === 5 ? 24 : 28; r.push([x, 46, x + w - 1, 160]); x += w + 1; } return r; })();

const B_SITIOS = B_MARCOS.map(([x0], i) => (i === 5 ? [x0 + 5] : [x0 + 1, x0 + 12]));
const V_BATALLA = {
  campo: { cam: 'marcos', general: { geo: { suelo: 158, libre: [20, 260], doom: [160, 121], centinelas: [[52, 62], [212, 58], [258, 66]], crater: [160, 167], sol: [160, 103], horizonte: 128 } },
    marcos: { geo: { suelo: 180, libre: [0, 0], pies: 154, marcos: B_MARCOS, sitios: B_SITIOS, doom: [160, 117] } } },
  pareja: { cam: 'ausente', general: { geo: { suelo: 150, libre: [110, 210], izq: [132, 150], der: [168, 150], marco: [100, 24, 220, 168] } },
    ausente: { geo: { suelo: 150, libre: [0, 0], silueta: [160, 118], marco: [100, 24, 220, 168], chincheta: [206, 171] } } },
};
export function batalla(R, t, o = {}) {
  const enc = V_BATALLA[o.encuadre] ? o.encuadre : 'campo', e = V_BATALLA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  if (enc === 'campo' && cam === 'general') b_ciudad(R, t, { doom: o.doom ?? 0 });
  else if (enc === 'campo') { b_marcos(R, t, o); const c = b_cae(o, b_puestos(o)); geo.cae = c ? c.i : null; }
  else { const k = b_pareja(R, t, o, cam === 'ausente'); if (k === 5) geo.doom = [160, 113]; }
  return geo;
}
export function batallaDelante(R, t, o = {}) {
  const enc = V_BATALLA[o.encuadre] ? o.encuadre : 'campo', e = V_BATALLA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  if (enc === 'campo' && cam === 'general') {
    const P = b_pintor(R, null);
    // el humo bajo que pasa por delante, a ras de suelo
    for (let k = 0; k < 7; k++) { const x0 = ((k * 61 + t * (5 + k % 3 * 2)) % 420) - 50, y0 = 170 + (k % 3) * 4;
      for (let i = 0; i < 4; i++) { const cx = x0 + i * 7, cy = y0 - Math.sin(i + k) * 2, r = 5 + (i % 2) * 2;
        for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.6) / r; if (d < 1 && b_b4(x, y) < (1 - d) * 0.55) P.p(x, y, d < 0.5 ? BC.humoS : BC.humo); } } }
    // brasas y papeles por delante
    for (let k = 0; k < 14; k++) { const u = (t * (0.09 + (k % 4) * 0.02) + k * 0.17) % 1, x = (k * 47 + u * 60 + Math.sin(t * 2 + k) * 4) % 320, y = 182 - u * 70; if (u < 0.9) P.p(x, y, (k + Math.floor(t * 6)) % 3 ? BC.brasa : BC.brasaL); }
    b_papeles(P, t, 3, 150, 176);
    const d = o.doom ?? 0; if (d > 0) for (let k = 0; k < 12; k++) { const u = (t * 0.5 + k / 12) % 1, a = k * 2.4 + t, r = 8 + u * 22; const x = 160 + Math.cos(a) * r, y = 116 - u * 40 + Math.sin(a) * 4; if (b_b4(k, Math.floor(t * 8)) < d) { P.p(x, y, u < 0.5 ? BC.doomL : BC.doomV); if (u < 0.3) P.p(x + 1, y, BC.doomV); } }
  } else if (enc === 'campo') {
    const B = R.buf, W = b_fijo(R, 'pared-marcos', (D) => b_pared(R, D, 'marcos')).b, n = b_puestos(o), cae = b_cae(o, n);
    for (let i = 0; i < n; i++) { const [x0, y0, x1, y1] = B_MARCOS[i]; if (cae && i === cae.i) continue;
      for (let y = y0; y <= y1 + 2; y++) for (const x of [x0 - 1, x1 + 1, x1 + 2]) if (x >= 0 && x < 320 && (x < x0 || x > x1)) { const j = y * 320 + x; B[j] = W[j]; }
      for (let y = y1 + 1; y <= y1 + 2; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = W[y * 320 + x];
      b_borde(R, x0, y0, x1, y1, 1); }
    if (cae) b_posterCae(R, cae.i, cae.k);
  } else { const [x0, y0, x1, y1] = V_BATALLA.pareja.general.geo.marco; b_borde(R, x0, y0, x1, y1, 2); }
  return {};
}
// ── D · El plató de rodaje ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A platoDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
//   'plato' (general): UN PLATÓ DE CINE: el techo negro con la parrilla de celosía y cinco focos colgados (lente
//     encendida y viseras), el CICLORAMA DE CROMA VERDE (x 24–238) con su curva al suelo, juntas de paño, arrugas,
//     cruces de seguimiento y las manchas de luz de los focos; a los lados, paredes negras de espuma acústica: a la
//     izquierda la puerta de carga con su barra y la bombilla roja de «grabando» que parpadea, a la derecha un burro de
//     vestuario con capas y una escalera; el suelo de hormigón pulido con reflejos, marcas de cinta y cables. En el
//     medio: un foco grande en trípode con saco de arena (x 30), el carro de vídeo con dos monitores que cambian (x
//     106–136), dos sillas de director con lona roja y azul y sin letras (x 148 y 168), un reflector redondo en su pie y sacos de
//     arena al pie del croma, cajas de manzana, una DIFUSORA de seda colgada de la parrilla (x 162–230, y 46–67), la vía
//     del travelling en el suelo (x 128–238, y 163–171), motas de humo de ambiente en los haces, la GRÚA (base en x 212, el brazo
//     se mueve: o.grua 0–1 lo fija, si no sube y baja despacio, con su cámara en la punta), una MESA (x 56–102, tablero
//     y 138) con una taza que humea, la claqueta y el TELÉFONO en su soporte, en medio y con sitio para sus ondas; y a la derecha EL SOPORTE CON LA MÁSCARA DE
//     DOOM (la del canon, con su capucha verde) sobre un baúl de transporte (x 240–260). Técnicos pequeños van y vienen
//     al fondo (pasan por detrás de los muebles) y uno ajusta un foco desde la escalera. o.mascara 0–1: el foco de
//     arriba se enciende sobre la máscara (cono de luz, la máscara se aclara y un brillo la recorre); o.telefono 1: el
//     teléfono vibra en la mesa con la pantalla encendida y ondas. Devuelve suelo 160, libre [50, 232], mascara: [250,
//     127] (su centro), telefono: [76, 133], mesa: [56, 138, 102, 160], grua: [x, y] (la cámara de la grúa en ese t).
//     Cámara 'mascara': LA MÁSCARA DE CERCA (unos 64 px de alto, centro x 150, y 86) en su soporte, con la capucha verde
//     detrás, remaches, arañazos, el brillo del foco que la recorre despacio y los ojos apagados que laten; fondo negro
//     con el croma desenfocado y círculos de luz, a la derecha el plató desenfocado (la escalera, el pie de un foco con su
//     lente, el borde del croma, la luz roja de «grabando» que parpadea y un técnico que cruza como una mancha oscura con
//     el filo encendido), el haz del foco desde arriba con motas, y abajo el banco de trabajo
//     (paño verde, remaches sueltos, una lima, un pincel y un bote). o.mano 0–1: la máscara se aparta un poco a la
//     izquierda para dejar sitio a la mano (la pone la escena en mano). Devuelve suelo 180, libre [0, 0], mascara: [x, y],
//     mano: [x, y] (donde la mano toca la capucha).
//   'bosque': UN BOSQUE DE DECORADO dentro del plató: arriba la parrilla con focos de gelatina y haces de luz que bajan
//     entre las ramas, el telón pintado de un bosque (que se acaba a la izquierda: se ve la pared negra y un foco), dos
//     árboles de cartón piedra pintados (uno con su escuadra de madera y su saco detrás), tres troncos de verdad con
//     corteza, musgo, raíces y copas, un riachuelo de atrezo (plástico azul con brillos que corren, rocas de corcho y la
//     manguera que lo alimenta), el suelo de hojas secas con el camino pisado, los charcos de luz de los focos, ramas
//     caídas, piñas, matas y cruces de cinta, la manguera de la máquina de humo serpenteando, la máquina de humo con niebla baja que se
//     arrastra, hojas que caen y la pértiga del micro que asoma por arriba y se mece. Devuelve suelo 158, libre [20, 260]
//     (sitio para ocho de pie, cada 30 px).
//     Cámara 'ensayo': LA ZONA DE ENSAYO DE PELEAS: cortinas negras con pliegues, la parrilla con poleas y tres cables de
//     arnés que se mecen con sus arneses naranjas, la pizarra con la coreografía (monigotes, flechas y números 1 2 3), el
//     armero de atrezo (bastones, espadas de espuma y escudos redondos lisos), las colchonetas azules con juntas, rozaduras
//     y marcas de cinta, sillas plegables con toalla y botellas, colchonetas apiladas al
//     fondo, un foco de caja blanco, una torre de celosía, un ventilador que gira y el MONITOR con la pelea repetida
//     (dos siluetas en bucle). Devuelve suelo 160, libre [30, 250], monitor: [x0, y0, x1, y1].
// platoDelante: en 'plato', la cámara de cine en su trípode de ruedas (esquina de abajo a la izquierda, x 0–46, con el
// piloto rojo) y los cables del suelo; en 'mascara', motas de polvo en el haz; en 'bosque', helechos en las esquinas de
// abajo que se mecen, hojas y jirones de niebla; en 'ensayo', un baúl con una botella y un rollo de cable (abajo a la
// derecha, x 268–319).
const V_PLATO = {
  plato: { cam: 'mascara', general: { geo: { suelo: 160, libre: [50, 232], mascara: [250, 127], telefono: [76, 133], mesa: [56, 138, 102, 160] } }, mascara: { geo: { suelo: 180, libre: [0, 0], mascara: [150, 86], mano: [196, 96] } } },
  bosque: { cam: 'ensayo', general: { geo: { suelo: 158, libre: [20, 260] } }, ensayo: { geo: { suelo: 160, libre: [30, 250], monitor: [264, 72, 304, 100] } } },
};
export function plato(R, t, o = {}) {
  const enc = V_PLATO[o.encuadre] ? o.encuadre : 'plato', e = V_PLATO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  if (enc === 'plato' && cam === 'general') Object.assign(geo, b_plato(R, t, o));
  else if (enc === 'plato') Object.assign(geo, b_platoMascara(R, t, o));
  else if (cam === 'general') b_bosque(R, t, o);
  else b_ensayo(R, t, o);
  return geo;
}
export function platoDelante(R, t, o = {}) {
  const enc = V_PLATO[o.encuadre] ? o.encuadre : 'plato', e = V_PLATO[enc], cam = o.camara === e.cam ? e.cam : 'general', P = b_pintor(R, null);
  if (enc === 'plato' && cam === 'general') {
    // los cables del suelo, por delante de todo
    for (const [y0, a] of [[176, 0.06], [173, 0.09]]) for (let x = 40; x < 320; x++) { const y = y0 + Math.round(Math.sin(x * a + y0) * 2); P.p(x, y, BC.cable); if (x % 5 === 0) P.p(x, y - 1, BC.cableL); }
    // la cámara de cine en su trípode de ruedas: patas, cabeza, cuerpo, parasol, objetivo, visor, rueda de foco y piloto
    P.li(18, 150, 4, 178, BC.metal0); P.li(19, 150, 8, 178, BC.metal1); P.li(22, 150, 34, 178, BC.metal1); P.li(21, 150, 22, 178, BC.metal0);
    for (const [x, y] of [[4, 178], [34, 178], [22, 178]]) { P.di(x, y, 2, BC.k); P.p(x, y - 1, BC.metal2); }
    P.rc(14, 144, 28, 150, BC.metal0); P.rc(14, 144, 28, 144, BC.metal2); P.li(8, 140, 0, 146, BC.metal1); P.li(8, 141, 0, 147, BC.metal0);
    P.rc(4, 122, 34, 143, BC.k); P.rc(5, 123, 33, 142, BC.negro3); P.rc(5, 123, 33, 124, BC.metal1); P.rc(5, 140, 33, 142, BC.negro1);
    for (let y = 127; y < 139; y += 3) P.li(8, y, 18, y, BC.negro1);
    P.rc(34, 126, 40, 139, BC.k); P.rc(35, 127, 39, 138, BC.metal0); for (let y = 128; y < 138; y += 2) P.p(37, y, BC.metal2);
    P.po([[40, 122], [48, 118], [48, 147], [40, 143]], BC.k); P.po([[41, 124], [47, 121], [47, 144], [41, 141]], BC.negro2); P.di(44, 132, 4, BC.k); P.di(44, 132, 3, hex('#1e2a4a')); P.p(43, 131, BC.pantallaL); P.p(45, 130, hex('#8a5ac8'));
    P.rc(10, 114, 26, 121, BC.k); P.rc(11, 115, 25, 120, BC.negro2); P.rc(12, 116, 24, 119, hex('#1e3a2a')); P.rc(12, 116, 24, 116, BC.croma3); P.p(14 + Math.floor(t * 3) % 9, 118, BC.croma5);
    P.di(24, 136, 3, BC.metal1); P.di(24, 136, 1, BC.metal3); P.p(24 + Math.round(Math.cos(t * 2) * 2), 136 + Math.round(Math.sin(t * 2) * 2), BC.k);
    if (Math.floor(t * 1.6) % 2) { P.di(30, 120, 1.5, BC.rec); P.p(30, 119, BC.pinL); } else P.di(30, 120, 1.5, BC.recS);
  } else if (enc === 'plato') {
    for (let k = 0; k < 16; k++) { const u = (t * 0.03 + h(k, 1, 160)) % 1, x = 160 + (h(k, 2, 160) - 0.2) * 90 + Math.sin(t * 0.8 + k) * 5 + u * 20, y = 10 + u * 150; if (b_calma(x, y)) continue; P.p(x, y, k % 3 ? BC.focoL : BC.foco); if (k % 5 === 0) P.p(x + 1, y, BC.foco); }
  } else if (cam === 'general') {
    // helechos que se mecen en las esquinas de abajo, hojas que caen y jirones de niebla
    for (const [bx, dir, k0] of [[4, 1, 0], [316, -1, 5]]) for (let k = 0; k < 5; k++) { const ang = -Math.PI / 2 + dir * (0.25 + k * 0.28) + Math.sin(t * 1.3 + k) * 0.06, L = 24 + (k % 3) * 6;
      for (let s = 0; s < L; s++) { const x = bx + Math.cos(ang) * s + dir * s * s * 0.012, y = 182 + Math.sin(ang) * s + s * s * 0.018; P.p(x, y, BC.fol1); if (s % 3 === 0 && s > 3) { const lf = 4 - s / L * 2.5; P.li(x, y, x + dir * lf, y + lf * 0.8, (k0 + k + s) % 2 ? BC.fol3 : BC.fol2); P.li(x, y, x - dir * lf * 0.6, y + lf, BC.fol2); } } }
    b_hojasCaen(P, t, 6, 1);
    for (let k = 0; k < 4; k++) { const cx = ((k * 97 + t * 6) % 420) - 50, cy = 172 + (k % 2) * 4; for (let y = cy - 4; y <= cy + 4; y++) for (let x = cx - 18; x <= cx + 18; x++) { const d = Math.hypot((x - cx) / 18, (y - cy) / 4); if (d < 1 && b_b4(Math.round(x), y) < (1 - d) * 0.45) P.p(x, y, b_mezcla(R.pget(x, y), BC.niebla, 0.5)); } }
  } else {
    // el baúl de transporte con su botella y un rollo de cable
    P.rc(268, 156, 319, 179, BC.k); P.rc(269, 157, 319, 179, BC.negro2); P.rc(269, 157, 319, 158, BC.metal1); for (const x of [272, 314]) P.rc(x - 2, 160, x + 2, 178, BC.metal0);
    P.rc(285, 166, 291, 170, BC.metal2); P.p(288, 168, BC.k); for (let y = 160; y < 178; y += 4) P.li(296, y, 310, y, BC.negro1);
    P.rc(276, 142, 281, 156, hex('#2a6ab0')); P.rc(277, 143, 278, 155, hex('#6aa8e8')); P.rc(277, 140, 280, 142, BC.pinL); P.rc(276, 148, 281, 151, BC.pinL);
    for (let r = 4; r <= 9; r += 2.5) for (let a = 0; a < 6.3; a += 0.12) P.p(300 + Math.cos(a) * r * 1.3, 151 + Math.sin(a) * r * 0.45, BC.cable); P.p(300, 149, BC.cableL);
  }
  return {};
}
// ── E · La sala de los Vengadores y la sala de calificación ──────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A salaDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
//   'reunion' (general): LA SALA DE REUNIONES DE LOS VENGADORES, de noche: techo de paneles, paredes de nogal con vetas y
//     cuarterones; un VENTANAL (x 96–266, y 28–112) con Nueva York detrás (tres términos de rascacielos, la torre de la
//     aguja con su baliza, la luna, nubes de tres tonos a tres velocidades, ventanas que se apagan, un avión), recortado al
//     cristal; la TELE grande (o.tele 0–1: apagada con su piloto rojo / un anuncio de siluetas de héroes al atardecer) sobre
//     un aparador con planta, libros y lámpara; la VITRINA con TRES ESCUDOS redondos (rojo, blanco y azul, sin emblemas);
//     suelo de piedra pulida con el reflejo del ventanal; cuatro sillones de cuero al otro lado de la mesa; el HOLOGRAMA
//     azul sobre la mesa (o.holo 0–1 recorre los cinco iconos: escudo, estrella, garra, 4 en su círculo, X, con cinco
//     puntos que dicen cuál; sin o.holo, un globo de alambre). salaDelante pinta la MESA LARGA de cristal y acero (deja
//     ver tintado lo de detrás) con tabletas, vasos, una taza que humea y el proyector. Devuelve suelo 160, libre [30, 260],
//     holo [160, 110], tele [8, 32, 86, 80], mesa [52, 146, 268, 151], fondo 126 y fondoLibre [100, 262] (la línea de los
//     pies para cruzar al fondo, por encima de los sillones), vitrina, escudos.
//     Cámara 'pantalla': UNA SALA ENVOLVENTE (ScreenX): la pantalla central (x 96–224, y 22–100) con un atardecer, la
//     ciudad lejos con humo y cinco siluetas; las paredes de los lados en perspectiva, acolchadas; o.planos 0–1 extiende la
//     imagen por las paredes (la esquina de Atom queda apagada); o.vacia true deja la pantalla en blanco para que la escena
//     pinte dentro. El escenario con su reflejo, dos torres de altavoces, las salidas de emergencia (hombrecito y flecha),
//     el pasillo de alfombra con sus peldaños y luces que laten, dos sillas de director (sillas [[128, 150], [196, 150]]) y butacas a los lados; motas en
//     la luz. salaDelante pinta la última fila de butacas (y 168–180). Devuelve suelo 165, libre [100, 220], pantalla.
//   'calificacion': UNA SALA DE PROYECCIÓN PEQUEÑA: pared de fieltro acolchado, la pantalla en la pared de la izquierda en
//     perspectiva (luz azul y dos siluetas que pelean, con destellos), la cabina con el haz y sus motas, el calendario
//     (sin año; o.anio pone el número en su banda), fotos viejas, un archivador; arriba, el altavoz, dos fotogramas enmarcados, el reloj que anda, dos apliques
//     con su abanico de luz, los paneles del techo y el detector de humo que parpadea; la luz de la pantalla tiembla sobre
//     la moqueta; la mesa con lápices, fichas y la almohadilla, y la PRENSA DE SELLAR (o.sello 0–3:
//     baja con cada golpe, salta polvo y la ficha enseña el «13» rojo solo después del tercero; el gag 5). Diez butacas de
//     perfil mirando a la pantalla (asientos: diez [x, suelo]; la escena pone R.actor(…, x, suelo, t, { dir: -1 })); el
//     respaldo lo pinta sala, y salaDelante el asiento, el brazo y, con o.tarjetas 0–1, las TARJETAS en su palito al lado
//     de la cara (G verde con un círculo, PG azul con dos figuritas, PG-13 naranja «13», R roja «!», NC-17 morada «17»;
//     o.votos: diez tipos ('G', 'PG', 'PG13', 'R', 'NC17'); o.sentados: qué butacas levantan tarjeta). Devuelve suelo 160,
//     libre [30, 200], sello [236, 127], pantalla, asientos, mesa, calendario, tinta.
//     Cámara 'fichas': LA MESA DE CERCA: roble con vetas y carpeta verde; cinco fichas de cartulina con su número 1–5, la
//     marca «13» y renglones sin letras: las cuatro primeras con un PLANETA con anillo (la ciencia ficción), la quinta sin cohete y con
//     una GOTA y una ESPADA; taza que humea, la lata de película (su borde brilla), tres cajas de discos, las gafas, el móvil (su pantalla
//     cambia y vibra con un aviso), lápiz, clips, goma, la almohadilla; el sello, visto desde arriba (taco con la goma roja
//     y pomo), lo coge una mano cuyo brazo entra en diagonal desde el borde derecho (unos 35 px); o.sello 0–3: el sello baja desde arriba
//     (se agranda y su sombra se encoge) y al tercer golpe deja el «13» rojo en la quinta. Devuelve suelo 180, libre [0, 0],
//     fichas (cinco centros [x, y]), sello (donde descansa).
const V_SALA = {
  reunion: { cam: 'pantalla', general: { col: ['#1a2a4a', '#5a3a24'], geo: { suelo: 160, libre: [30, 260], holo: [160, 110], tele: [8, 32, 86, 80], mesa: [52, 146, 268, 151], fondo: 126, fondoLibre: [100, 262], vitrina: [272, 50, 316, 114], escudos: [[294, 62], [294, 82], [294, 102]] } }, pantalla: { col: ['#14141e', '#3a1a1e'], geo: { suelo: 165, libre: [100, 220], pantalla: [96, 22, 224, 100], sillas: [[128, 150], [196, 150]] } } },
  calificacion: { cam: 'fichas', general: { col: ['#2a2a3a', '#5a2a2a'], geo: { suelo: 160, libre: [206, 296], libreIzq: [14, 62], sello: [236, 127], pantalla: [6, 26, 62, 116], asientos: [[92, 126], [118, 126], [144, 126], [170, 126], [196, 126], [80, 158], [108, 158], [136, 158], [164, 158], [192, 158]], mesa: [206, 130, 310, 134], calendario: [222, 46, 254, 88], tinta: [267, 126] } }, fichas: { col: ['#c8a878', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], fichas: [[44, 104], [102, 106], [160, 103], [218, 105], [276, 104]], sello: [262, 56] } } },
};
export function sala(R, t, o = {}) {
  const { enc, cam, geo } = c_vista(o, V_SALA);
  if (enc === 'reunion') { if (cam === 'pantalla') c_screenx(R, t, o); else c_reunion(R, t, o); }
  else if (cam === 'fichas') c_fichas(R, t, o); else c_calificacion(R, t, o);
  return geo;
}
// lo que va por delante de los actores: la mesa de cristal (reunión), la última fila de butacas (pantalla), los brazos y
// asientos de las diez butacas con las tarjetas del panel (calificación); en 'fichas', nada
export function salaDelante(R, t, o = {}) {
  const { enc, cam, geo } = c_vista(o, V_SALA);
  if (enc === 'reunion') { if (cam === 'pantalla') c_screenxDelante(R, t, o); else c_reunionMesa(R, t, o); }
  else if (cam !== 'fichas') c_calificacionDelante(R, t, o);
  return geo;
}
// ── F · El cine ──────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A cineDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
//   'vestibulo' (general): EL VESTÍBULO: techo de casetones con dos neones (uno parpadea), pared de terciopelo con
//     costillas y zócalo con listón de latón, tres cajas de menú (iconos y precios), la fuente de refrescos, la MÁQUINA DE
//     PALOMITAS con los granos saltando, la PANTALLA DE VENTA con la entrada dibujada, el CONTADOR (o.ventas 0–1 por o.tope,
//     por omisión 1 y 50: la cifra del guion) con su barra y el plano de la sala que se llena de color, el reloj de pared,
//     los carteles de luz de la máscara de Doom y del gusano de Dune, y moqueta de cine en perspectiva. cineDelante pinta el
//     MOSTRADOR (x 0–126, tapa en y 130; quien atiende detrás pisa en tras 140, con x 40–76) con su vitrina de chucherías, la caja, un
//     vaso, el CUBO de palomitas, y la CUERDA de terciopelo de la cola (postes en x 206, 256, 306). o.palomita 0–1: una
//     palomita vuela del cubo hasta Atom; o.palomitas: instantes en los que salta una (0,9 s cada vuelo; el gag 6).
//     Devuelve suelo 160, libre [20, 240] (la zona tranquila para la pizarra del ejecutivo: x 130–200), contador, cubo,
//     mostrador, tras, cola, pantalla, carteles, reloj.
//     Cámara 'mapa': EL PANEL DEL MUNDO (x 8–234, y 26–146): mar con cuadrícula, continentes tramados, una luz que barre y
//     dos aviones; chinchetas con su placa de día (16 Reino Unido y China, 17 España y México, 18 Estados Unidos; o.fechas
//     0–1 las enciende por ese orden, por omisión todas); el RELOJ grande con la cuña de dos horas y media (o.horas 0–1 la
//     llena; el minutero corre); un estante de folletos y una planta. Devuelve suelo 180, libre [0, 0], reloj, mapa, pines.
//   'imax': DOS PUERTAS DE SALA: la IMAX enorme (marquesina de bombillas que corren con el pictograma de pantalla gigante,
//     cartel de luz del desierto de Dune, puertas dobles de capitoné con ojos de buey donde parpadea la película, alfombra
//     roja) y la normal (marquesina pequeña, cartel de la máscara, puerta sencilla); el CALENDARIO de diciembre (el 12, con
//     el 18 en un círculo; o.semanas 0–3 tacha semanas); la cornisa con su tira de luz de colores que corre, los focos que
//     lavan la pared, el extintor, la papelera con un cubo de palomitas, el felpudo y el suelo pulido con juntas y
//     reflejos; un robot aspirador cruza el suelo. cineDelante pinta el CORDÓN de
//     la IMAX (postes en x 50 y 152) con su placa del candado. Devuelve suelo 160, libre [20, 260], puertaImax, puerta,
//     calendario, cordon.
//     Cámara 'sala': DENTRO DE LA SALA IMAX desde atrás: la pantalla curva (x 30–270, y 22–100; o.peli 'dune' dunas al
//     atardecer con dos siluetas y el gusano / 'doom' tormenta verde y la capucha), el haz del proyector con motas, siete
//     filas de butacas en arco con dos pasillos de peldaños, público de espaldas (uno se inclina, otro come palomitas),
//     apliques y la salida. Devuelve suelo 175 (el pasillo de abajo), libre [40, 280], pantalla.
const V_CINE = {
  vestibulo: { cam: 'mapa', general: { col: ['#3a1a2a', '#6a2a3a'], geo: { suelo: 160, libre: [130, 260], contador: [152, 68], cubo: [99, 112], mostrador: [0, 130, 126, 170], tras: 140, trasLibre: [40, 76], cola: [206, 306], taquilla: [272, 100, 319, 160], pantalla: [128, 30, 228, 104], carteles: [[238, 56, 264, 96], [272, 56, 298, 96]], reloj: [254, 40] } }, mapa: { col: ['#2a3a5a', '#3a2a2a'], geo: { suelo: 180, libre: [0, 0], reloj: [276, 100], mapa: [8, 26, 234, 146], pines: { reinoUnido: [101, 51], china: [188, 68], espana: [107, 62], mexico: [32, 79], eeuu: [36, 64] } } } },
  imax: { cam: 'sala', general: { col: ['#2a1a2a', '#5a2a3a'], geo: { suelo: 160, libre: [20, 260], puertaImax: [54, 60, 148, 150], puerta: [220, 72, 258, 150], calendario: [266, 58, 314, 120], cordon: [50, 152] } }, sala: { col: ['#14101a', '#a8283a'], geo: { suelo: 175, libre: [40, 280], pantalla: [30, 22, 270, 100] } } },
};
export function cine(R, t, o = {}) {
  const { enc, cam, geo } = c_vista(o, V_CINE);
  if (enc === 'vestibulo') { if (cam === 'mapa') c_mapaFechas(R, t, o); else c_vestibulo(R, t, o); }
  else if (cam === 'sala') c_salaImax(R, t, o); else c_puertas(R, t, o);
  return geo;
}
// lo que va por delante de los actores: el mostrador con el cubo de palomitas y la cuerda de la cola (vestíbulo); el
// cordón de la puerta IMAX ('imax'); en 'mapa' y 'sala', nada
export function cineDelante(R, t, o = {}) {
  const { enc, cam, geo } = c_vista(o, V_CINE);
  if (enc === 'vestibulo' && cam === 'general') c_vestibuloDelante(R, t, o);
  else if (enc === 'imax' && cam === 'general') c_puertasDelante(R, t, o);
  return geo;
}
// ── G · El estudio de Atom ───────────────────────────────────────────────────────────────────────────────────────────
// las vistas del estudio: suelo, libre y lo que nombra la cabecera
const V_ESTUDIO = {
  estudio: { cam: 'tele', general: { geo: { suelo: 158, libre: [30, 184], pantalla: [219, 92, 287, 128], pared: [22, 28, 134, 102], reloj: [174, 47], ventana: [214, 24, 270, 78], mesa: [194, 140, 319, 179] } }, tele: { geo: { suelo: 160, libre: [20, 128], pantalla: [151, 49, 271, 127], calendario: [34, 32, 98, 94], sofa: [14, 104, 132, 152], mesita: [168, 160, 270, 179] } } },
  pared: { cam: 'escritorio', general: { geo: { suelo: 180, libre: [0, 0], fotos: [[30, 42, 86, 90], [104, 36, 160, 84], [178, 44, 234, 92], [104, 110, 184, 162]] } }, escritorio: { geo: { suelo: 180, libre: [0, 0], hoja: [216, 104], movil: [274, 141], teclado: [40, 112, 150, 150] } } },
};
export function estudio(R, t, o = {}) {
  const { enc, cam, geo } = d_vista(V_ESTUDIO, o);
  if (enc === 'estudio' && cam === 'general') {
    const dorm = (o.dormido ?? 0) >= 0.5;
    d_capa(R, 'est' + (dorm ? 'D' : ''), () => { d_estudioSala(R, dorm); const b = d_suelta(R, 'mesa' + (dorm ? 'D' : ''), () => d_mesaCapa(R, dorm)); d_pegar(R, b, 190, 84, 319, 179); });
    d_ventanaNoche(R, t, [214, 24, 270, 78], dorm);
    d_corchoCosas(R, t, o.pared ?? 0.6);
    d_relojCifras(R, t, o.dias ?? 29, dorm);
    d_gatoDuerme(R, 160, 67, t);
    d_mesaViva(R, t, o, dorm);
  } else if (enc === 'estudio') d_tele(R, t, o);
  else if (cam === 'general') d_corchoCerca(R, t, o);
  else d_escritorio(R, t, o);
  return geo;
}
export function estudioDelante(R, t, o = {}) {
  const { enc, cam, geo } = d_vista(V_ESTUDIO, o);
  if (enc === 'estudio' && cam === 'general') { const dorm = (o.dormido ?? 0) >= 0.5; d_pegar(R, d_suelta(R, 'mesa' + (dorm ? 'D' : ''), () => d_mesaCapa(R, dorm)), 190, 84, 319, 179); d_mesaViva(R, t, o, dorm); }
  else if (enc === 'estudio') d_pegar(R, d_suelta(R, 'mesita', () => d_mesitaCapa(R)), 160, 150, 280, 179);
  else if (cam === 'general') d_corchoHilos(R, t);
  return geo;
}
// ── H · Las viñetas de cómic ─────────────────────────────────────────────────────────────────────────────────────────
const V_COMIC = {
  fragua: { cam: 'vapor', general: { geo: { suelo: 150, libre: [40, 240], yunque: [169, 128], fragua: [221, 104], puerta: [67, 132] } }, vapor: { geo: { suelo: 180, libre: [0, 0], mascara: [166, 96] } } },
  latveria: { cam: 'cuna', general: { geo: { suelo: 160, libre: [40, 280], altar: [160, 132], trono: [160, 100] } }, cuna: { geo: { suelo: 160, libre: [40, 250], cuna: [160, 124] } } },
  mundo: { cam: 'arena', general: { geo: { suelo: 160, libre: [40, 280], trono: [160, 96] } }, arena: { geo: { suelo: 158, libre: [20, 290], luz: [160, 150], doom: [220, 158] } } },
};
export function comic(R, t, o = {}) {
  const { enc, cam, geo } = d_vista(V_COMIC, o);
  ({ fragua: { general: d_fragua, vapor: d_vaporCerca }, latveria: { general: d_latveria, cuna: d_cuna }, mundo: { general: d_mundo, arena: d_arena } })[enc][cam](R, t, o);
  return geo;
}
// LO DE DELANTE DE LA VIÑETA (después de los actores y de lo que pinte la escena dentro, con las mismas opciones):
//   la trama de imprenta sobre todo lo nuevo (lo que ya no es el fondo del búfer de la vista) y el CONTORNO DE VIÑETA: el
//   margen de papel, el borde negro grueso de 3 px y la esquina recortada de arriba a la derecha (la zona de Atom),
//   iguales en todas las viñetas. o.trama (true por omisión; false: sin trama); o.contorno (true por omisión; false: sin
//   margen ni borde, para una viñeta que la escena enmarca a su manera). El contorno ya no depende del búfer de la vista:
//   si la escena pinta una viñeta propia con unas opciones que no tienen búfer, se pinta igual (d_marco).
export function comicDelante(R, t, o = {}) {
  const { enc, cam, geo } = d_vista(V_COMIC, o), b = (R.__ddD || new Map()).get(d_claveComic(enc, cam, o));
  if (b && o.trama !== false) d_imprenta(R, b, false);
  if (o.contorno !== false) { if (b) { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (!d_dentro(x, y)) R.pset(x, y, b[y * 320 + x]); } else d_marco(R); }
  return geo;
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_DD = { bunker: V_BUNKER, wundagore: V_WUNDAGORE, batalla: V_BATALLA, plato: V_PLATO, sala: V_SALA, cine: V_CINE, estudio: V_ESTUDIO, comic: V_COMIC };

// Los dos encuadres, cada uno con sus dos cámaras. Todo lo fijo va en búferes de R.nuevo() (a_capa) que se pintan una vez;
// encima, cada fotograma: los fluorescentes que parpadean, las pantallas con las curvas gamma, el vapor del hornillo, la
// gota que cae al cubo, el ratón, la silla, el trípode con su piloto, la taza y el símbolo. La luz verde que tiñe la sala
// la pinta bunker() por detrás de los actores; bunkerDelante pinta la luz suave que ilumina a los actores, el polvo que
// cae, la caja de herramientas de delante y el visor de la cámara.
//   GEOMETRÍA 'bunker' general: pared hasta y 146, suelo de y 146 a 180 (los muebles apoyan en y 150; los actores, en 158).
//     Puerta estanca redonda (centro 30, 100; r 26) con su escalón (y 130); escalera de pates x 60–72 hasta la trampilla
//     del techo; cajas x 74–94; pizarra x 80–140 × y 38–86; mesa x 94–144 (tablero y 128, la taza encima en 134, 127, el
//     flexo en 100–124); silla plegable x 146–162 mirando a la derecha (asiento y 144); trípode con la cámara (cuerpo
//     200–222 × 116–127, objetivo hacia la silla); consola con tres pantallas x 226–274 × y 44–112; hornillo y garrafa
//     x 230–268 (y 114–150); cama plegable x 272–318 (colchón y 134). Foco de la luz verde por omisión: (150, 110).
//   Cámara 'camara': pared hasta y 140, suelo hasta 180; la silla de frente en x 148–172 (asiento y 150, patas a 170); la
//     pizarra grande x 52–150 × y 34–104; la consola x 222–300 × y 56–122. El visor (bunkerDelante): esquinas, la cifra
//     del tiempo abajo a la izquierda (y 162), el punto rojo abajo a la derecha (296, 165) y la pila.
function a_resolver(o, V) {
  const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return { enc, cam, geo: { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) } };
}
// las capas fijas: cada clave se pinta una vez por lienzo en un búfer de R.nuevo() y luego se copia en cada fotograma
const a_capas = new WeakMap();

function a_capa(R, clave, dibuja) {
  let m = a_capas.get(R); if (!m) { m = new Map(); a_capas.set(R, m); }
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// copia una capa en el lienzo en uso, desplazada (dx, dy) para el temblor; los bordes repiten la última fila o columna
function a_copiar(R, b, dx = 0, dy = 0) {
  const B = R.buf;
  if (!dx && !dy) { B.set(b); return; }
  for (let y = 0; y < 180; y++) { const sy = Math.min(179, Math.max(0, y - dy)) * 320, o = y * 320;
    for (let x = 0; x < 320; x++) B[o + x] = b[sy + Math.min(319, Math.max(0, x - dx))]; }
}

// el umbral de la trama ordenada 4 × 4 (0–1), y la mezcla de dos colores (f = 0 el primero, 1 el segundo)
const A_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_b4 = (x, y) => (A_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const a_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// mezcla tramada sobre lo que ya hay: oscurece o tiñe un píxel sin perder la textura de debajo
function a_tinta(R, x, y, c, f) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_mezcla(R.pget(x, y), c, f)); }

// escoge de una rampa (oscuro → claro) con trama: v en pasos de la rampa
function a_rampa(cols, v, x, y) { const n = cols.length - 1; let l = Math.floor(v); if (v - l > a_b4(x, y)) l++; return cols[l < 0 ? 0 : l > n ? n : l]; }

// degradado vertical tramado de cols[0] (arriba) a cols[n] (abajo); luz(x, y) suma pasos (resplandores)
function a_degradado(R, x0, y0, x1, y1, cols, luz = null, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) R.pset(x, y, a_rampa(cols, luz ? base + luz(x, y) : base, x, y)); }
}

// vapor o humo que sube (x, y: la boca) en bocanadas que crecen, se deshacen por el borde y se las lleva el aire
function a_vapor(R, x, y, t, k = 0, col = AB.blanco, alto = 18, r0 = 1.6) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = r0 + u * 3.4 * r0 / 1.6, cx = x + u * alto * 0.45 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if ((d < 0.7 && u < 0.6) || a_b4(xx, yy) < (1.1 - u) * (1.3 - d)) R.pset(xx, yy, col); } }
}

// cifras de 3 × 5 (y los dos puntos) a escala e: la cifra del tiempo del visor, los números de las cajas y la pizarra
const A_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function a_dig(R, txt, x, y, c, e = 1, sombra = null) {
  for (const ch of String(txt)) {
    if (ch === ':') { for (const j of [1, 3]) for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) { if (sombra != null) R.pset(x + a + 1, y + j * e + b + 1, sombra); R.pset(x + a, y + j * e + b, c); } x += 2 * e; continue; }
    const g = A_DIG[ch.charCodeAt(0) - 48];
    if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) { if (sombra != null) R.pset(x + i * e + a + 1, y + j * e + b + 1, sombra); R.pset(x + i * e + a, y + j * e + b, c); }
    x += 4 * e;
  }
}

// un pictograma de filas ('#' lleno) a escala s
function a_picto(R, filas, x, y, c, s = 1) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(x + i * s + a, y + j * s + b, c); }); }

const A_GAMMA = ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '.#.#.', '..#..'];

const A_RAYOS = ['..#..', '#.#.#', '.###.', '##.##', '.###.', '#.#.#', '..#..'];

// EL SÍMBOLO VERDE (canon, el mismo en el búnker y en Wundagore): un círculo con un rombo dentro y cuatro trazos radiales
// por fuera, en las diagonales; rx, ry: los radios (ry < rx si está en el suelo, visto en perspectiva). o.quemado: la
// quemadura oscura alrededor; o.brillo 0–1; late despacio con t
export function a_simbolo(R, cx, cy, rx, ry, t, o = {}) {
  const { pset, linea } = R, f = o.brillo ?? 1, lat = 0.72 + 0.28 * Math.sin(t * 3.1), G = C.doomV, GS = C.doomVS, GL = hex('#d2ffe6');
  const g = Math.max(1, Math.round(rx / 26));
  if (o.quemado) for (let y = Math.floor(cy - ry * 1.7); y <= cy + ry * 1.7; y++) for (let x = Math.floor(cx - rx * 1.7); x <= cx + rx * 1.7; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1.6 && a_b4(x, y) < (1.6 - d) * 0.75) a_tinta(R, x, y, AB.k, 0.5); }
  const e = (a, r) => [Math.round(cx + Math.cos(a) * rx * r), Math.round(cy + Math.sin(a) * ry * r)];
  // el halo verde tramado alrededor del trazo
  for (let y = Math.floor(cy - ry * 1.5); y <= cy + ry * 1.5; y++) for (let x = Math.floor(cx - rx * 1.5); x <= cx + rx * 1.5; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry); const cerca = Math.max(1 - Math.abs(d - 1) * 5, 1 - Math.abs(d - 0.62) * 7, 0);
    if (cerca > 0 && a_b4(x, y) < cerca * 0.55 * f * lat) a_tinta(R, x, y, GS, 0.6); }
  const n = Math.max(32, Math.round((rx + ry) * 4));
  for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2;
    for (let s = -g + 1; s <= g - 1 + 1; s++) { const [x, y] = e(a, 1 + s / Math.max(rx, 8) * 0.9); pset(x, y, s === 0 && lat * f > 0.8 ? GL : G); }
    const [xi, yi] = e(a, 1 - (g + 0.5) / Math.max(rx, 8)); pset(xi, yi, GS); }
  // el rombo
  const p = [e(-Math.PI / 2, 0.62), e(0, 0.62), e(Math.PI / 2, 0.62), e(Math.PI, 0.62)];
  for (let i = 0; i < 4; i++) { const [a0, b0] = p[i], [a1, b1] = p[(i + 1) % 4]; for (let s = 0; s < g; s++) linea(a0, b0 + s, a1, b1 + s, G); linea(a0, b0 - 1, a1, b1 - 1, lat * f > 0.85 ? GL : GS); }
  // los cuatro trazos radiales
  for (const a of [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]) { const [x0, y0] = e(a, 1.14), [x1, y1] = e(a, 1.44); for (let s = 0; s < g; s++) linea(x0 + s, y0, x1 + s, y1, G); }
  pset(Math.round(cx), Math.round(cy), GL);
}

// LA LUZ VERDE DE DOOM (canon): tiñe todo (un recorrido de la pantalla) más cuanto más cerca del foco (fx, fy), con un
// alcance que crece con v; encima, haces que giran despacio, chispas que salen despedidas y el núcleo blanco con su halo.
// o.haces false: solo el tinte y el núcleo (la luz que se cuela por una rendija)
export function a_luzVerde(R, fx, fy, v, t, o = {}) {
  const B = R.buf, G = C.doomV, GS = C.doomVS, alcance = 40 + v * 320, gl = hex('#d2ffe6');
  for (let y = 0; y < 180; y++) { const yy = (y - fy) * 1.3, o0 = y * 320;
    for (let x = 0; x < 320; x++) { const d = Math.sqrt((x - fx) * (x - fx) + yy * yy), cerca = d < alcance ? 1 - d / alcance : 0;
      const m = v * (0.14 + 0.52 * cerca * cerca + 0.1 * cerca), q = Math.floor(m * 5 + a_b4(x, y)) / 5;
      if (q > 0) B[o0 + x] = a_mezcla(B[o0 + x], cerca > 0.55 ? G : GS, q > 0.8 ? 0.8 : q); } }
  if (o.haces !== false) {
    // los haces: rayos de luz que giran despacio y se alargan con v
    for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + t * 0.35 + Math.sin(t * 0.9 + k) * 0.08, L = (30 + v * 260) * (0.6 + 0.4 * h(k, 1, 31));
      for (let s = 6; s < L; s += 1) { const x = Math.round(fx + Math.cos(a) * s), y = Math.round(fy + Math.sin(a) * s * 0.8), f = 1 - s / L;
        if (x < 0 || x > 319 || y < 0 || y > 179) break;
        if (a_b4(x, y) < f * 0.9 * v) a_tinta(R, x, y, gl, 0.55); if (a_b4(x + 1, y) < f * 0.5 * v) a_tinta(R, x + 1, y, G, 0.5); } }
    // las chispas
    for (let k = 0; k < 26; k++) { const u = (t * (0.5 + h(k, 2, 32) * 0.7) + h(k, 3, 32)) % 1, a = h(k, 4, 32) * Math.PI * 2, r = u * (40 + 120 * v);
      const x = Math.round(fx + Math.cos(a) * r), y = Math.round(fy + Math.sin(a) * r * 0.8 + u * u * 20);
      if (u < 0.9 && v > 0.15) { R.pset(x, y, u < 0.4 ? gl : G); if (u < 0.5) R.pset(x - Math.round(Math.cos(a)), y - Math.round(Math.sin(a)), GS); } }
  }
  // el núcleo
  const rn = 3 + v * 14 + Math.sin(t * 9) * 1.2;
  R.halo(fx, fy, rn * 2.2, [GS, G, gl], 1.2);
  R.disco(fx, fy, rn * 0.6, gl); R.disco(fx, fy, rn * 0.35, AB.blanco);
}

// el polvo y las piedrecitas que caen del techo cuando la sala tiembla (por delante de todo)
function a_polvo(R, t, ru, x0, x1) {
  for (let k = 0; k < 60 * ru; k++) { const u = (t * (0.6 + h(k, 1, 33)) + h(k, 2, 33)) % 1, x = Math.round(x0 + h(k, 3, 33) * (x1 - x0) + Math.sin(t * 3 + k) * 2), y = Math.round(24 + u * 160);
    R.pset(x, y, k % 5 === 0 ? AB.muroS : AB.muroL); if (k % 3 === 0) R.pset(x, y - 1, AB.muro); }
  // la cortina de polvo bajo las juntas del techo
  for (const cx of [48, 132, 246]) for (let y = 24; y < 24 + 50 * ru; y++) for (let x = cx - 3; x <= cx + 3; x++) if (a_b4(x, y + Math.floor(t * 20)) < 0.25 * ru * (1 - (y - 24) / 60)) R.pset(x, y, AB.muroL);
}

// la paleta del búnker (luz fría de fluorescente, hormigón, acero militar) y de Wundagore (tormenta, piedra y nieve)
const AB = pal({
  techo: '#34363a', techoS: '#2a2c30', techoL: '#40434a',
  muro: '#8e918e', muroL: '#a9aca8', muroS: '#747774', muroD: '#585b58', junta: '#606360', humedad: '#6c7068',
  pintura: '#4f6157', pinturaL: '#6a7e72', pinturaS: '#3a4a42',
  suelo: '#6e706e', sueloL: '#888a88', sueloS: '#5a5c5a', sueloD: '#444644',
  acero: '#5d6a66', aceroL: '#8a9892', aceroS: '#3e4846', aceroD: '#262e2c',
  tubo: '#5a6470', tuboL: '#8a96a2', tuboS: '#3a424c',
  madera: '#8a6a44', maderaL: '#b08a5a', maderaS: '#5e4628',
  caja: '#7a7448', cajaL: '#9c9662', cajaS: '#545032',
  pizarra: '#2c463a', pizarraL: '#3c5a4a', tiza: '#e2e8de', tizaS: '#9fb2a4',
  manta: '#6c7078', mantaL: '#8c9098', mantaS: '#4c5058',
  fluor: '#f2f8ff', fluorS: '#b8c8d8', luzF: '#c6d2d6',
  pantalla: '#0a1812', fosforo: '#5af08a', fosforoS: '#2a8a4a',
  rojo: '#e83a3a', rojoS: '#8a1e22', amarillo: '#e8c040', amarilloS: '#a8862a', azul: '#4a7ab0', azulL: '#8ab8e0',
  taza: '#ece8e0', tazaS: '#b8b2a8', cafe: '#4a2a18', cafeL: '#6a4026',
  k: '#141418', blanco: '#ffffff', negro: '#08080c',
});

// la pared de hormigón del búnker en [x0, x1] × [y0, y1]: paneles de encofrado con sus juntas (luz y sombra), los
// agujeros de los latiguillos, poros, manchas de humedad que bajan de las juntas, la luz de los fluorescentes (lx: los
// centros de luz) y la penumbra en lo alto; s escala los paneles (1 en el general, 1.6 de cerca)
function a_muro(R, x0, y0, x1, y1, lx, s = 1) {
  const P = AB, W = Math.round(52 * s), Hh = Math.round(40 * s), R4 = [P.muroD, P.muroS, P.muro, P.muroL];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let luz = 0; for (const c of lx) luz = Math.max(luz, 1 - Math.abs(x - c) / (95 * s));
    const ly = (y - y0) / (y1 - y0), n = h(x, y, 12), m = h(Math.floor(x / (6 * s)), Math.floor(y / (6 * s)), 13);
    let v = 1.25 + luz * 1.1 - Math.max(0, 0.3 - ly) * 2.4 + (m - 0.5) * 0.7 + (n > 0.94 ? -0.9 : n < 0.04 ? 0.9 : 0);
    // las manchas de humedad: bajan de las juntas horizontales, más largas en unos sitios que en otros
    const jx = Math.floor(x / 3), largo = h(jx, 7, 14) * 26 * s, dj = ((y - y0) % Hh);
    if (h(jx, 8, 14) < 0.22 && dj < largo) v -= 0.7 * (1 - dj / largo);
    if (ly > 0.8 && h(x >> 2, y >> 2, 15) < (ly - 0.8) * 2.6) v -= 0.6;
    R.pset(x, y, a_rampa(R4, v, x, y));
  }
  for (let x = x0 + Math.round(26 * s); x <= x1; x += W) { R.rect(x, y0, x, y1, P.junta); R.rect(x + 1, y0, x + 1, y1, P.muroL); }
  for (let y = y0 + Hh; y <= y1; y += Hh) { R.rect(x0, y, x1, y, P.junta); R.rect(x0, y + 1, x1, y + 1, P.muroL); }
  for (let x = x0 + Math.round(26 * s); x <= x1 + W; x += W) for (let y = y0; y <= y1; y += Hh) for (const [i, j] of [[0.25, 0.3], [0.75, 0.3], [0.25, 0.75], [0.75, 0.75]]) {
    const px = Math.round(x - W + W * i), py = Math.round(y + Hh * j); if (py > y1 - 2 || px < x0) continue;
    R.pset(px, py, P.muroD); R.pset(px + 1, py, P.muroD); R.pset(px, py + 1, P.muroS); R.pset(px + 1, py + 1, P.muroL); }
}

// el suelo de hormigón alisado en [y0, y1]: losas en perspectiva (juntas que convergen hacia vx), poros, manchas de
// aceite, grietas y el brillo de los fluorescentes (lx)
function a_sueloH(R, y0, y1, vx, lx) {
  const P = AB, R4 = [P.sueloD, P.sueloS, P.suelo, P.sueloL];
  for (let y = y0; y <= y1; y++) { const d = (y - y0) / (y1 - y0);
    for (let x = 0; x < 320; x++) { let luz = 0; for (const c of lx) luz = Math.max(luz, 1 - Math.abs(x - c) / 80);
      const n = h(x >> 1, y, 16), m = h(x >> 4, y >> 2, 17);
      const v = 1.15 + luz * 0.9 * (1 - d * 0.5) + d * 0.35 + (m - 0.5) * 0.8 + (n > 0.93 ? -0.8 : n < 0.05 ? 0.8 : 0);
      R.pset(x, y, a_rampa(R4, v, x, y)); } }
  for (let k = -9; k <= 9; k++) { const xa = vx + k * 44, xb = vx + k * 44 * 1.9; R.linea(xa, y0, xb, y1, P.sueloS); R.linea(xa + 1, y0, xb + 1, y1, P.sueloL); }
  for (const f of [0.22, 0.55]) { const y = Math.round(y0 + (y1 - y0) * f); R.rect(0, y, 319, y, P.sueloS); R.rect(0, y + 1, 319, y + 1, P.sueloL); }
  // manchas de aceite y de humedad, y grietas finas
  for (const [cx, cy, rx, ry] of [[226, y0 + 20, 12, 3], [40, y0 + 26, 9, 2], [300, y0 + 10, 7, 2]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const dd = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (dd < 1 && a_b4(x, y) < (1 - dd) * 0.9) a_tinta(R, x, y, P.sueloD, 0.5); }
  for (const [x, y, k] of [[110, y0 + 14, 0], [190, y0 + 24, 1], [270, y0 + 6, 2]]) { let px = x, py = y; for (let i = 0; i < 14; i++) { R.pset(px, py, P.sueloD); px += h(i, k, 18) < 0.5 ? 1 : 2; py += h(i, k, 19) < 0.35 ? 1 : 0; } }
}

// sombra blanda tramada (elipse) sobre lo que ya hay
function a_sombra(R, cx, cy, rx, ry, f = 0.45, c = AB.k) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1 && a_b4(x, y) < (1 - d) * 1.4) a_tinta(R, x, y, c, f); }
}

// una caja de madera con listones, cantos con luz y sombra y su pictograma estarcido
function a_caja(R, x0, y0, x1, y1, picto, col = null) {
  const P = AB; R.rect(x0, y0, x1, y1, P.k);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const n = h(x, y >> 1, 20); R.pset(x, y, (y - y0) % 6 === 0 ? P.cajaS : n > 0.85 ? P.cajaL : n < 0.12 ? P.cajaS : P.caja); }
  R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P.cajaL); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, P.cajaL); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, P.cajaS);
  R.rect(x0 + 2, y0 + 1, x0 + 3, y1 - 1, P.cajaS); R.rect(x1 - 4, y0 + 1, x1 - 3, y1 - 1, P.cajaS);
  if (picto) { const w = picto[0].length, hh = picto.length; a_picto(R, picto, Math.round((x0 + x1 - w) / 2), Math.round((y0 + y1 - hh) / 2), col ?? hex('#2a2a1e')); }
}

const A_CRUZ = ['.###.', '.###.', '#####', '#####', '#####', '.###.', '.###.'];

const A_GOTA = ['..#..', '..#..', '.###.', '#####', '#####', '.###.'];

const A_FLECHA = ['..#..', '.###.', '#####', '..#..', '..#..'];

// EL BÚNKER, lo fijo (encuadre general)
function a_bunkerFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = AB;
  // el techo: la losa con las marcas del encofrado y la viga de canto con su arista iluminada
  for (let y = 0; y < 19; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 11); pset(x, y, x % 26 === 0 ? P.techoS : n > 0.9 ? P.techoL : n < 0.1 ? P.techoS : P.techo); }
  rect(0, 19, 319, 23, P.muroS); rect(0, 19, 319, 19, P.muroD); rect(0, 23, 319, 23, P.muroD); for (let x = 0; x < 320; x++) if (h(x, 3, 21) < 0.2) pset(x, 21, P.muroD);
  // los cables que cuelgan del techo entre ganchos (fuera de la barra del año y de la esquina de Atom)
  for (const [c, dy, k] of [[P.rojoS, 0, 0], [P.k, 2, 1], [P.amarilloS, 4, 2]]) for (let x = 176; x <= 270; x++) { const u = ((x - 176) % 32) / 32; pset(x, 8 + dy + Math.round(Math.sin(u * Math.PI) * 4), c); }
  for (let x = 176; x <= 272; x += 32) { rect(x - 1, 6, x + 1, 7, P.aceroS); pset(x, 8, P.aceroL); }
  // la tubería que corre bajo la viga y baja por la derecha hasta la consola; sus bridas y su válvula
  rect(0, 25, 274, 30, P.k); rect(0, 26, 273, 29, P.tubo); rect(0, 26, 273, 26, P.tuboL); rect(0, 29, 273, 29, P.tuboS);
  rect(268, 25, 274, 46, P.k); rect(269, 26, 273, 46, P.tubo); rect(269, 26, 269, 46, P.tuboL); rect(273, 26, 273, 46, P.tuboS);
  for (const x of [44, 120, 181, 236]) { rect(x, 24, x + 3, 31, P.k); rect(x + 1, 24, x + 2, 31, P.tuboL); }
  for (const x of [16, 100, 160, 216, 258]) { rect(x, 31, x + 1, 33, P.aceroS); }
  disco(206, 22, 3, P.k); disco(206, 22, 2, P.rojo); pset(205, 21, hex('#ff9a8a')); rect(206, 24, 206, 25, P.k);
  // la señal de radiación (triángulo amarillo con el pictograma) junto a la caja de fusibles
  R.poligono([[166, 62], [176, 44], [186, 62]], P.k); R.poligono([[168, 61], [176, 47], [184, 61]], P.amarillo); R.linea(169, 61, 176, 48, hex('#f8e080')); a_picto(R, A_RAYOS, 174, 52, P.k, 1);
  // la pared y el zócalo pintado de verde militar, desconchado
  a_muro(R, 0, 31, 319, 145, [93, 207]);
  for (let y = 116; y <= 145; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 22); if (n < 0.06 && y > 118) continue; pset(x, y, y === 116 ? P.pinturaS : y === 117 ? P.pinturaL : n > 0.88 ? P.pinturaL : (y > 138 && h(x, y, 23) < 0.3) ? P.pinturaS : P.pintura); }
  rect(0, 112, 319, 113, P.amarillo); rect(0, 114, 319, 114, P.amarilloS);
  rect(0, 144, 319, 145, P.aceroD);
  a_dig(R, '04', 176, 124, P.pinturaL, 2);
  // el suelo
  a_sueloH(R, 146, 179, 160, [93, 207]);
  for (let x = 0; x < 320; x++) for (let y = 146; y < 149; y++) if (a_b4(x, y) < 0.6 - (y - 146) * 0.18) a_tinta(R, x, y, P.k, 0.4);
  // las rayas de peligro delante de la puerta
  for (let y = 147; y <= 151; y++) for (let x = 2; x <= 58; x++) pset(x, y, ((x + y) >> 2) % 2 ? P.amarillo : P.k);
  // la rejilla del desagüe
  rect(26, 166, 44, 172, P.k); for (let x = 27; x < 44; x += 2) rect(x, 167, x, 171, P.aceroS);
  // LA PUERTA ESTANCA redonda: el hueco en sombra, el marco con sus pernos, la hoja abombada, el volante y las bisagras
  disco(32, 102, 28, P.muroD); disco(30, 100, 27, P.k);
  disco(30, 100, 26, (x, y) => { const l = (30 - x + 100 - y) / 36; return l > 0.35 ? P.aceroL : l > -0.25 ? P.acero : P.aceroS; });
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, x = Math.round(30 + Math.cos(a) * 23.5), y = Math.round(100 + Math.sin(a) * 23.5); pset(x, y, P.aceroD); pset(x - 1, y - 1, P.aceroL); }
  disco(30, 100, 20, P.k);
  disco(30, 100, 19, (x, y) => { const l = (30 - x + 100 - y) / 28 + (h(x, y, 24) - 0.5) * 0.3; return l > 0.4 ? P.aceroL : l > -0.2 ? P.acero : l > -0.55 ? P.aceroS : P.aceroD; });
  R.anillo(30, 100, 14.5, P.aceroS); R.anillo(30, 100, 15.5, P.aceroL);
  disco(30, 100, 9, P.k); disco(30, 100, 8, P.rojoS); disco(30, 100, 6, P.k); disco(30, 100, 5, P.acero);
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + 0.3; linea(30, 100, Math.round(30 + Math.cos(a) * 7), Math.round(100 + Math.sin(a) * 7), P.rojoS); }
  disco(30, 100, 2, P.aceroL); pset(29, 99, P.blanco); for (const a of [-2.4, -2.1]) pset(Math.round(30 + Math.cos(a) * 8), Math.round(100 + Math.sin(a) * 8), hex('#e86a5a'));
  for (const y of [86, 110]) { rect(50, y, 57, y + 6, P.k); rect(51, y + 1, 56, y + 5, P.acero); rect(51, y + 1, 56, y + 1, P.aceroL); disco(54, y + 3, 1, P.aceroD); }
  rect(8, 128, 52, 131, P.k); rect(9, 128, 51, 130, P.aceroS); rect(9, 128, 51, 128, P.aceroL);
  for (const x of [14, 44]) { rect(x, 131, x + 2, 145, P.aceroD); }
  rect(12, 136, 48, 138, P.k); rect(13, 136, 47, 137, P.acero); rect(13, 136, 47, 136, P.aceroL);
  // LA ESCALERA DE PATES hasta la trampilla del techo (la boca, una ranura oscura en la viga)
  rect(58, 19, 76, 23, P.k); rect(59, 19, 75, 19, P.aceroL); rect(58, 23, 76, 24, P.aceroS);
  for (let y = 34; y < 142; y += 9) { rect(61, y, 71, y, P.aceroL); rect(61, y + 1, 71, y + 1, P.acero); rect(61, y, 61, y + 4, P.acero); rect(71, y, 71, y + 4, P.aceroS);
    rect(62, y + 2, 72, y + 2, P.muroD); rect(60, y + 4, 62, y + 5, P.muroD); rect(70, y + 4, 72, y + 5, P.muroD); }
  // LA PIZARRA con fórmulas a tiza: garabatos, símbolos gamma, cifras, una curva que cae, flechas y círculos
  rect(80, 38, 140, 86, P.k); rect(81, 39, 139, 85, P.maderaS); rect(81, 39, 139, 39, P.maderaL);
  for (let y = 41; y <= 83; y++) for (let x = 83; x <= 137; x++) { const n = h(x >> 1, y >> 1, 25), m = h(x >> 3, y >> 2, 26); pset(x, y, m > 0.78 ? P.pizarraL : n > 0.93 ? P.pizarraL : P.pizarra); }
  for (const [y, x0, x1, k] of [[45, 86, 112, 0], [52, 90, 106, 1], [59, 86, 100, 2], [66, 88, 110, 3], [74, 86, 98, 4]]) { let x = x0; while (x < x1) { const w = 2 + Math.floor(h(x, k, 27) * 4); for (let i = 0; i < w; i++) pset(x + i, y + Math.round(Math.sin((x + i) * 1.3 + k) * 1.2), P.tiza); x += w + 2; } }
  a_picto(R, A_GAMMA, 116, 44, P.tiza); a_picto(R, A_GAMMA, 102, 56, P.tiza); a_dig(R, '92', 118, 56, P.tiza); a_dig(R, '238', 112, 66, P.tiza);
  R.anillo(105, 59, 6, P.tizaS);
  linea(120, 74, 135, 74, P.tizaS); linea(120, 74, 120, 61, P.tizaS); for (let x = 121; x < 136; x++) pset(x, Math.round(63 + (1 - Math.exp(-(x - 121) / 4)) * 9), P.tiza);
  linea(100, 77, 112, 77, P.tiza); pset(111, 76, P.tiza); pset(111, 78, P.tiza);
  rect(81, 86, 139, 88, P.k); rect(82, 86, 138, 87, P.maderaL); rect(90, 85, 94, 85, P.tiza); rect(98, 85, 100, 85, hex('#e8c8a0')); rect(124, 84, 132, 85, hex('#3a3a4a')); rect(124, 84, 132, 84, hex('#6a6a7a'));
  // los dos fluorescentes (las carcasas; el tubo se enciende y parpadea cada fotograma)
  for (const [x0, x1] of [[70, 116], [182, 232]]) { rect(x0, 31, x1, 34, P.k); rect(x0 + 1, 31, x1 - 1, 32, P.aceroS); rect(x0 + 1, 31, x1 - 1, 31, P.aceroL); }
  // LAS CAJAS de material apiladas (con pictogramas) y las latas encima
  a_sombra(R, 86, 151, 16, 2, 0.5);
  a_caja(R, 74, 128, 96, 150, A_CRUZ, hex('#a82a2a'));
  rect(76, 112, 94, 127, P.k); rect(77, 113, 93, 127, P.acero); rect(77, 113, 93, 113, P.aceroL); rect(93, 113, 93, 127, P.aceroS); rect(80, 110, 90, 111, P.aceroD); a_picto(R, A_RAYOS, 83, 117, P.amarillo);
  for (const [x, c] of [[78, hex('#c84a3a')], [84, hex('#d8b040')], [89, hex('#4a8ac8')]]) { rect(x, 103, x + 4, 111, P.k); rect(x + 1, 104, x + 3, 111, c); rect(x + 1, 104, x + 3, 104, P.aceroL); rect(x + 1, 107, x + 3, 108, P.blanco); pset(x + 1, 109, a_mezcla(c, P.blanco, 0.4)); }
  // LA MESA metálica: tablero, cajonera con tiradores, el hueco de las piernas; encima papeles, un cuaderno, una radio,
  // un bote de lápices y el FLEXO con su cono de luz cálida
  a_sombra(R, 120, 151, 28, 3, 0.5);
  rect(94, 127, 146, 131, P.k); rect(95, 128, 145, 129, P.acero); rect(95, 128, 145, 128, P.aceroL); rect(95, 130, 145, 130, P.aceroS);
  rect(96, 131, 118, 150, P.k); rect(97, 132, 117, 150, P.acero); rect(97, 132, 97, 150, P.aceroL);
  for (const y of [132, 138, 144]) { rect(97, y, 117, y, P.aceroS); rect(104, y + 3, 110, y + 3, P.aceroD); rect(104, y + 2, 110, y + 2, P.aceroL); }
  rect(119, 131, 143, 133, P.aceroS); rect(142, 131, 144, 150, P.k); rect(143, 131, 143, 150, P.acero);
  rect(120, 134, 141, 150, P.aceroD); rect(122, 140, 136, 150, P.k); rect(123, 141, 135, 150, P.cajaS); rect(123, 141, 135, 141, P.cajaL);
  for (let y = 108; y < 128; y++) for (let x = 102 + Math.round((y - 108) * 0.2); x <= 134 + Math.round((y - 108) * 0.3); x++) { const f = (y - 108) / 20; if (a_b4(x, y) < f * 0.35) a_tinta(R, x, y, hex('#f8e4a8'), 0.45); }
  rect(104, 124, 114, 126, P.blanco); rect(105, 123, 115, 123, hex('#e8e0d0')); for (let x = 106; x < 114; x += 2) pset(x, 125, P.tizaS);
  rect(116, 124, 124, 126, P.k); rect(117, 124, 123, 125, hex('#e8d8b0')); rect(120, 124, 120, 125, P.maderaS);
  rect(126, 120, 132, 126, P.k); rect(127, 121, 131, 126, P.acero); disco(129, 123, 1, P.aceroD); rect(131, 116, 131, 120, P.aceroS);
  rect(137, 121, 140, 126, P.k); rect(138, 122, 139, 126, P.azul); pset(138, 119, P.rojo); pset(139, 118, P.amarillo); pset(140, 119, P.k);
  rect(97, 125, 104, 126, P.k); rect(98, 125, 103, 125, P.aceroS);
  linea(100, 124, 104, 110, P.k); linea(101, 124, 105, 110, P.aceroL); linea(104, 110, 116, 106, P.k); linea(104, 109, 116, 105, P.aceroL); disco(104, 110, 1, P.aceroD);
  poligono([[114, 103], [121, 106], [119, 112], [111, 109]], P.k); poligono([[115, 104], [120, 106], [118, 110], [112, 108]], hex('#3a6a4a'));
  rect(114, 110, 118, 111, hex('#fff6c8')); pset(116, 109, P.blanco);
  // la cubeta bajo la gota que cae de la brida
  a_sombra(R, 183, 151, 7, 2, 0.5);
  poligono([[177, 140], [189, 140], [188, 150], [178, 150]], P.k); poligono([[178, 141], [188, 141], [187, 149], [179, 149]], P.tubo); rect(178, 141, 188, 141, P.tuboL); rect(179, 142, 187, 142, hex('#5a7a8a')); linea(178, 140, 183, 136, P.aceroD); linea(188, 140, 183, 136, P.aceroD);
  // LA CONSOLA con tres pantallas (las curvas, cada fotograma), los mandos y las rejillas
  a_sombra(R, 250, 151, 26, 2, 0.5);
  rect(224, 44, 276, 112, P.k); rect(225, 45, 275, 111, P.acero); rect(225, 45, 275, 45, P.aceroL); rect(225, 45, 225, 111, P.aceroL); rect(275, 45, 275, 111, P.aceroS);
  rect(228, 48, 272, 73, P.k); rect(229, 49, 271, 72, P.aceroD);
  for (const x0 of [228, 251]) { rect(x0, 76, x0 + 21, 93, P.k); rect(x0 + 1, 77, x0 + 20, 92, P.aceroD); }
  for (let x = 230; x <= 270; x += 6) { disco(x, 98, 2, P.k); disco(x, 98, 1, P.aceroL); pset(x, 97, P.blanco); }
  for (let y = 106; y <= 110; y += 2) rect(228, y, 272, y, P.aceroS);
  rect(226, 112, 274, 116, P.k); rect(227, 112, 273, 114, P.aceroS); rect(227, 112, 273, 112, P.aceroL);
  for (const x of [232, 246, 262]) linea(x, 116, x + 2, 145, P.k);
  // EL HORNILLO sobre su caja, con el cazo, y la garrafa de agua
  a_caja(R, 228, 132, 254, 150, A_FLECHA);
  rect(232, 126, 250, 131, P.k); rect(233, 127, 249, 131, hex('#b8b8b0')); rect(233, 127, 249, 127, P.blanco); disco(241, 129, 1, P.rojoS);
  rect(234, 118, 248, 125, P.k); rect(235, 119, 247, 125, hex('#7a7e86')); rect(235, 119, 247, 119, hex('#b8bcc4')); rect(248, 120, 255, 121, P.k);
  rect(257, 128, 269, 150, P.k); rect(258, 130, 268, 149, hex('#5a8ab8')); rect(258, 130, 259, 149, hex('#8ab8e0')); rect(258, 136, 268, 136, hex('#3a6a9a')); rect(261, 125, 265, 129, P.k); rect(262, 126, 264, 128, hex('#3a5aa8'));
  // LA CAMA PLEGABLE con la manta gris (pliegues), la almohada, y la balda con latas, tarros y libros
  a_sombra(R, 296, 151, 24, 2, 0.5);
  for (const x of [276, 312]) { linea(x, 150, x + 8, 138, P.k); linea(x + 8, 150, x, 138, P.k); }
  rect(272, 133, 318, 139, P.k); rect(273, 134, 317, 138, hex('#c8c0a8'));
  poligono([[274, 132], [304, 131], [306, 147], [276, 148]], P.k);
  poligono([[275, 133], [303, 132], [305, 146], [277, 147]], (x, y) => { const f = Math.sin((x - 275) * 0.6 + (y - 132) * 0.1); return f > 0.6 ? P.mantaL : f < -0.5 ? P.mantaS : P.manta; });
  rect(276, 133, 302, 134, P.mantaL); for (let x = 277; x < 304; x += 7) linea(x, 140, x + 2, 146, P.mantaS);
  rect(305, 128, 317, 134, P.k); rect(306, 129, 316, 133, hex('#e8e8e0')); rect(306, 129, 316, 129, P.blanco); pset(311, 131, hex('#c8c8c0'));
  rect(280, 92, 318, 94, P.k); rect(281, 92, 318, 92, P.maderaL); rect(281, 93, 318, 93, P.madera); for (const x of [284, 314]) { rect(x, 95, x + 1, 100, P.aceroS); }
  for (const [x, w, hh, c] of [[283, 4, 8, hex('#c84a3a')], [288, 4, 8, hex('#c84a3a')], [294, 5, 6, hex('#d8b040')], [301, 2, 12, hex('#3a6aa8')], [304, 2, 11, hex('#a83a3a')], [307, 2, 12, hex('#4a8a4a')], [311, 5, 7, hex('#e8e4d8')]]) {
    rect(x, 91 - hh, x + w, 91, P.k); rect(x + 1, 92 - hh, x + w - 1, 91, c); rect(x + 1, 92 - hh, x + w - 1, 92 - hh, a_mezcla(c, P.blanco, 0.4)); }
  // la caja de fusibles y el teléfono de campaña en la pared
  rect(150, 70, 166, 92, P.k); rect(151, 71, 165, 91, hex('#7a8478')); rect(151, 71, 165, 71, hex('#a0aa9e')); rect(153, 74, 163, 88, hex('#5a6458')); for (let y = 76; y < 88; y += 3) rect(155, y, 161, y, P.k); pset(163, 80, P.amarillo);
  linea(158, 92, 158, 116, P.k);
  rect(190, 76, 200, 92, P.k); rect(191, 77, 199, 91, hex('#4a5a3a')); rect(191, 77, 199, 77, hex('#6a7a5a')); rect(192, 79, 198, 83, P.k); rect(193, 80, 197, 82, hex('#2a3a22')); for (let y = 85; y < 90; y += 2) rect(193, y, 197, y, P.k);
  for (let i = 0; i < 18; i++) pset(200 + (i >> 1), 92 + i + Math.round(Math.sin(i * 0.8) * 1.5), P.k);
}

// EL BÚNKER, lo que se mueve
function a_bunkerVida(R, t, o, v, ru, vacio, dx, dy, geo) {
  const { rect, pset, linea, disco } = R, P = AB;
  // los fluorescentes: el de la izquierda tiembla a ratos; cuando se apaga, la pared de debajo queda en penumbra
  for (const [x0, x1, k] of [[70, 116, 1], [182, 232, 0]]) { const off = k && ((t % 6.1) < 0.35 && Math.sin(t * 61) > -0.1);
    rect(x0 + 2 + dx, 33 + dy, x1 - 2 + dx, 34 + dy, off ? P.fluorS : P.fluor); if (!off) rect(x0 + 2 + dx, 35 + dy, x1 - 2 + dx, 35 + dy, hex('#dce8f0'));
    if (off) for (let y = 36; y < 120; y++) for (let x = x0 - 30; x <= x1 + 30; x++) if (a_b4(x, y) < 0.3 * (1 - (y - 36) / 90)) a_tinta(R, x, y, P.k, 0.25); }
  // las pantallas de la consola: la curva gamma que corre, el osciloscopio y las barras; las lucecitas
  const S = [229 + dx, 49 + dy, 271 + dx, 72 + dy]; R.recorte(S);
  for (let x = S[0]; x <= S[2]; x += 6) for (let y = S[1]; y <= S[3]; y++) if (y % 2) pset(x, y, hex('#123224'));
  for (let x = S[0]; x <= S[2]; x++) { const u = (x - S[0]) / 42, y = Math.round(S[1] + 18 - 13 * Math.exp(-((u * 5 - (t * 0.8) % 7 + 1) ** 2)) - 2 * Math.sin(u * 20 + t * 3) * 0.5 - h(x + Math.floor(t * 10), 1, 34) * 2); pset(x, y, P.fosforo); pset(x, y + 1, P.fosforoS); }
  pset(S[0] + 2 + (Math.floor(t * 8) % 38), S[1] + 2, P.fosforo);
  R.recorte(null);
  { const x0 = 230 + dx, y0 = 78 + dy; R.recorte([x0, y0, x0 + 18, y0 + 13]); for (let x = x0; x <= x0 + 18; x++) pset(x, Math.round(y0 + 7 + Math.sin(x * 0.7 + t * 6) * 4 * Math.sin(t * 0.7)), P.fosforo); R.recorte(null); }
  for (let i = 0; i < 6; i++) { const hh = Math.round(3 + 8 * Math.abs(Math.sin(t * (1.3 + i * 0.4) + i))); rect(253 + i * 3 + dx, 91 - hh + dy, 254 + i * 3 + dx, 91 + dy, i % 2 ? P.fosforoS : P.fosforo); }
  for (let i = 0; i < 8; i++) { const on = Math.sin(t * (2 + i * 0.7) + i * 1.9) > 0.1; pset(230 + i * 6 + dx, 103 + dy, on ? (i === 3 ? P.rojo : i === 6 ? P.amarillo : P.fosforo) : P.aceroD); }
  // el vapor del cazo y la gota que cae de la brida a la cubeta (con su aro en el agua)
  a_vapor(R, 241 + dx, 116 + dy, t, 0, hex('#e8eef0'), 16); a_vapor(R, 243 + dx, 116 + dy, t + 1.6, 1, hex('#d0d8dc'), 12);
  { const u = (t % 1.7) / 1.7, y = Math.round(32 + u * u * 108); if (u < 0.92) { pset(183 + dx, y + dy, hex('#9ac8e8')); pset(183 + dx, y - 1 + dy, hex('#cae4f4')); } else { pset(181 + dx, 141 + dy, hex('#cae4f4')); pset(185 + dx, 141 + dy, hex('#cae4f4')); } }
  // el ratón que corre por el zócalo y se mete bajo la cama
  { const u = (t % 13) / 13; if (u < 0.3) { const x = Math.round(330 - u / 0.3 * 70) + dx, y = 154 + dy, pata = Math.floor(t * 14) % 2; rect(x, y - 2, x + 4, y, hex('#6a6058')); pset(x - 1, y - 1, hex('#6a6058')); pset(x - 2, y, P.k); pset(x + 1, y - 3, hex('#c8a0a0')); linea(x + 5, y - 1, x + 9, y - 2 + pata, hex('#8a7a70')); pset(x + pata, y + 1, P.k); pset(x + 3 - pata, y + 1, P.k); } }
  // las sombras que se alargan con la luz verde (sobre el suelo, lejos del foco)
  const foco = o.foco ?? [150, 110];
  if (v > 0.05) for (const [x, w] of [[86, 10], [120, 24], [154, 7], [212, 8], [250, 14], [296, 20]]) { const dir = x >= foco[0] ? 1 : -1, L = 10 + v * 110;
    R.poligono([[x - w, 150], [x + w, 150], [x + w + dir * L, 162], [x - w + dir * L * 0.7, 162]], (px, py) => (a_b4(px, py) < 0.55 * v ? a_mezcla(R.pget(px, py), P.k, 0.5) : R.pget(px, py))); }
  // LA SILLA plegable (derecha o volcada)
  const sx = 146 + dx, sy = 158 + dy;
  if (!vacio) { a_sombra(R, sx + 8, sy, 10, 2, 0.5); rect(sx, sy - 30, sx + 2, sy, P.k); rect(sx + 1, sy - 29, sx + 1, sy, P.aceroL); rect(sx - 1, sy - 30, sx + 3, sy - 22, P.k); rect(sx, sy - 29, sx + 2, sy - 23, P.acero);
    rect(sx, sy - 15, sx + 16, sy - 13, P.k); rect(sx + 1, sy - 15, sx + 15, sy - 14, P.acero); rect(sx + 1, sy - 15, sx + 15, sy - 15, P.aceroL);
    linea(sx + 2, sy - 13, sx + 15, sy, P.k); linea(sx + 15, sy - 13, sx + 3, sy, P.k); linea(sx + 16, sy - 13, sx + 16, sy, P.aceroS); }
  else { a_sombra(R, sx + 12, sy + 1, 14, 2, 0.5); rect(sx + 2, sy - 3, sx + 30, sy - 1, P.k); rect(sx + 3, sy - 3, sx + 29, sy - 2, P.acero); rect(sx + 3, sy - 3, sx + 29, sy - 3, P.aceroL);
    linea(sx + 6, sy - 3, sx + 14, sy - 16, P.k); linea(sx + 14, sy - 3, sx + 8, sy - 16, P.k); rect(sx + 6, sy - 18, sx + 18, sy - 16, P.k); rect(sx + 7, sy - 17, sx + 17, sy - 17, P.aceroL); }
  // EL TRÍPODE con la cámara de vídeo: patas, cabezal, el cuerpo con su objetivo hacia la silla, el visor abatible y el
  // piloto rojo que parpadea; vibra si ruge
  const vx = ru > 0 ? Math.round(Math.sin(t * 70) * ru * 1.5) : 0, tx = 212 + dx + vx, ty = 128 + dy;
  a_sombra(R, tx, sy + 1, 14, 2, 0.5);
  linea(tx, ty, tx - 12, sy, P.k); linea(tx, ty, tx + 12, sy, P.k); linea(tx, ty, tx + 1, sy, P.aceroS); linea(tx + 1, ty, tx - 11, sy, P.aceroL); linea(tx + 1, ty, tx + 13, sy, P.aceroS);
  rect(tx - 5, ty + 8, tx + 5, ty + 8, P.aceroS); rect(tx - 2, ty - 2, tx + 2, ty + 1, P.k);
  rect(tx - 12, ty - 13, tx + 10, ty - 2, P.k); rect(tx - 11, ty - 12, tx + 9, ty - 3, hex('#2e3036')); rect(tx - 11, ty - 12, tx + 9, ty - 12, hex('#5a5e66')); rect(tx - 11, ty - 4, tx + 9, ty - 3, hex('#1e2024'));
  rect(tx - 18, ty - 11, tx - 12, ty - 4, P.k); rect(tx - 17, ty - 10, tx - 13, ty - 5, hex('#3a3e46')); disco(tx - 18, ty - 8, 3, P.k); disco(tx - 18, ty - 8, 2, hex('#4a6a9a')); pset(tx - 19, ty - 9, P.blanco);
  rect(tx + 4, ty - 16, tx + 9, ty - 13, P.k); rect(tx + 5, ty - 15, tx + 8, ty - 14, hex('#4a4e56'));
  rect(tx - 3, ty - 9, tx + 5, ty - 6, P.aceroD); pset(tx + 7, ty - 9, P.blanco);
  if (Math.sin(t * 5) > -0.2) { disco(tx + 7, ty - 11, 1, P.rojo); R.halo(tx + 7, ty - 11, 4, [P.rojoS, P.rojo], 1); pset(tx + 7, ty - 11, hex('#ffb0a0')); } else pset(tx + 7, ty - 11, P.rojoS);
  // LA TAZA: en la mesa (con su vapor; salta si ruge) o, vacía la sala, rodando y girando en el suelo
  const tazaSuelo = vacio && o.taza != null;
  if (!tazaSuelo) { const salta = ru > 0 ? Math.max(0, Math.round(Math.sin(t * 19) * 2.5 * ru)) : 0; a_taza(R, 134 + dx, 127 + dy - salta, t); if (!ru) a_vapor(R, 135 + dx, 119 + dy, t, 2, hex('#d8dcdc'), 10, 1); }
  else {
    const u = Math.max(0, Math.min(1, o.taza)), x = lerp(132, 104, u) + dx, y = 168 + dy, giro = t * 10 * (1 - u) + 24 * (1 - (1 - u) ** 2);
    for (let i = 0; i < 24 * u + 4; i++) { const px = Math.round(132 - i * (28 / 24)), py = 167 + Math.round(Math.sin(i * 0.5) * 0.8); if (px >= x) { pset(px + dx, py + dy, P.cafe); if (i % 3 === 0) pset(px + dx, py + 1 + dy, P.cafeL); } }
    a_tazaTumbada(R, x, y, giro, 1);
  }
  if (vacio) {
    // el símbolo quemado en el suelo, que humea
    a_simbolo(R, 150 + dx, 167 + dy, 24, 7, t, { quemado: true });
    for (const [x0, k] of [[130, 0], [150, 1], [170, 2], [140, 3]]) a_vapor(R, x0 + dx, 164 + dy, t * 0.8, k, k % 2 ? hex('#8a948e') : hex('#a8b0aa'), 26, 1.4);
  }
  geo.taza = tazaSuelo ? [Math.round(lerp(132, 104, Math.max(0, Math.min(1, o.taza)))), 168] : [134, 127];
}
// la taza de café de pie: (x, y) es el centro de su base; el asa a la derecha y el café dentro
function a_taza(R, x, y, t) {
  const { rect, pset } = R, P = AB;
  rect(x - 3, y - 7, x + 3, y, P.k); rect(x - 2, y - 6, x + 2, y - 1, P.taza); rect(x + 1, y - 6, x + 2, y - 1, P.tazaS); rect(x - 2, y - 6, x + 2, y - 6, P.cafe); pset(x - 2, y - 5, P.blanco);
  rect(x + 4, y - 5, x + 5, y - 2, P.k); pset(x + 4, y - 4, P.taza); pset(x + 4, y - 3, P.taza); rect(x - 1, y - 4, x + 1, y - 3, hex('#3a6a9a'));
}

// la taza tumbada que gira sobre el suelo (giro en radianes; s escala): el cuerpo de canto, la boca abierta con el café
// que queda y el asa, que da la vuelta
function a_tazaTumbada(R, x, y, giro, s = 1) {
  const { pset, disco } = R, P = AB, ca = Math.cos(giro), sa = Math.sin(giro) * 0.45, L = 4.5 * s, r = 2.6 * s;
  a_sombra(R, x, y + 2 * s, 7 * s, 1.6 * s, 0.5);
  for (let i = -L; i <= L; i += 0.5) disco(x + ca * i, y - r + sa * i, r + 0.6, P.k);
  for (let i = -L; i <= L; i += 0.5) disco(x + ca * i, y - r + sa * i, r - 0.3, (px, py) => (py < y - r - r * 0.3 ? P.blanco : py < y - r + r * 0.4 ? P.taza : P.tazaS));
  const bx = x + ca * L, by = y - r + sa * L; disco(bx, by, r * 0.9, Math.cos(giro) > 0 ? P.cafe : P.tazaS); pset(Math.round(bx), Math.round(by - r * 0.5), P.taza);
  const ax = x - Math.sin(giro) * r * 1.2, ay = y - r - Math.abs(Math.cos(giro)) * r * 0.2 - r * 0.9 * (Math.sin(giro * 2) > 0 ? 1 : 0.6);
  disco(ax, ay, 1.4 * s, P.k); pset(Math.round(ax), Math.round(ay), P.taza);
  if (s >= 2) for (let i = -L + 2; i < L - 2; i += 2) pset(Math.round(x + ca * i), Math.round(y - r + sa * i), hex('#3a6a9a'));
}

// la caja de herramientas y el rollo de cable del primer término (por delante de los personajes, abajo a la derecha)
function a_cajaHerramientas(R, t, ru) {
  const { rect, pset, disco } = R, P = AB, j = ru > 0 ? Math.round(Math.sin(t * 47) * ru) : 0;
  rect(288, 164 + j, 320, 180, P.k); rect(289, 165 + j, 319, 179, hex('#a83a2a')); rect(289, 165 + j, 319, 166 + j, hex('#d8604a')); rect(289, 172 + j, 319, 173 + j, hex('#6a2018'));
  rect(298, 160 + j, 312, 161 + j, P.k); rect(298, 161 + j, 299, 165 + j, P.k); rect(311, 161 + j, 312, 165 + j, P.k); rect(299, 160 + j, 311, 160 + j, P.aceroL);
  rect(302, 168 + j, 306, 170 + j, P.aceroL); rect(291, 162 + j, 296, 164 + j, P.aceroS); pset(291, 162 + j, P.aceroL);
  disco(8, 176, 13, P.k); disco(8, 176, 12, hex('#2e2e30')); for (let r = 4; r <= 11; r += 2) R.anillo(8, 176, r, hex('#4a4a4e')); disco(8, 176, 3, P.k); pset(4, 167, hex('#6a6a70'));
  for (let i = 0; i < 20; i++) pset(20 + i, 178 - Math.round(Math.sin(i * 0.3) * 3), P.k);
}

// LO QUE GRABA LA CÁMARA, lo fijo: la pared de cerca (paneles más grandes), la pizarra grande, el fluorescente, la
// consola a la derecha y el suelo
function a_bunkerCamFijo(R) {
  const { rect, pset, linea } = R, P = AB;
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 11) > 0.9 ? P.techoL : P.techo);
  rect(0, 14, 319, 17, P.muroS); rect(0, 17, 319, 17, P.muroD);
  a_muro(R, 0, 18, 319, 139, [100, 230], 1.6);
  for (let y = 112; y <= 139; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 22); if (n < 0.05 && y > 114) continue; pset(x, y, y === 112 ? P.pinturaS : y === 113 ? P.pinturaL : n > 0.88 ? P.pinturaL : P.pintura); }
  rect(0, 108, 319, 110, P.amarillo); rect(0, 111, 319, 111, P.amarilloS); rect(0, 138, 319, 139, P.aceroD);
  a_sueloH(R, 140, 179, 160, [100, 230]);
  for (let x = 0; x < 320; x++) for (let y = 140; y < 143; y++) if (a_b4(x, y) < 0.6 - (y - 140) * 0.18) a_tinta(R, x, y, P.k, 0.4);
  // la pizarra grande con las fórmulas
  rect(52, 34, 150, 104, P.k); rect(53, 35, 149, 103, P.maderaS); rect(53, 35, 149, 35, P.maderaL);
  for (let y = 38; y <= 100; y++) for (let x = 56; x <= 146; x++) { const n = h(x >> 1, y >> 1, 25), m = h(x >> 3, y >> 2, 26); pset(x, y, m > 0.78 ? P.pizarraL : n > 0.93 ? P.pizarraL : P.pizarra); }
  for (const [y, x0, x1, k] of [[44, 60, 100, 0], [54, 64, 92, 1], [64, 60, 84, 2], [74, 62, 104, 3], [86, 60, 80, 4], [94, 66, 96, 5]]) { let x = x0; while (x < x1) { const w = 2 + Math.floor(h(x, k, 27) * 5); for (let i = 0; i < w; i++) pset(x + i, y + Math.round(Math.sin((x + i) * 1.1 + k) * 1.5), P.tiza); x += w + 3; } }
  a_picto(R, A_GAMMA, 108, 42, P.tiza, 2); a_picto(R, A_GAMMA, 92, 62, P.tiza); a_dig(R, '92', 112, 60, P.tiza, 2); a_dig(R, '238', 100, 80, P.tiza, 2);
  R.anillo(95, 66, 8, P.tizaS); linea(124, 98, 144, 98, P.tizaS); linea(124, 98, 124, 76, P.tizaS);
  for (let x = 125; x < 145; x++) pset(x, Math.round(80 + (1 - Math.exp(-(x - 125) / 5)) * 15), P.tiza);
  rect(53, 104, 149, 107, P.k); rect(54, 104, 148, 105, P.maderaL); rect(64, 103, 70, 103, P.tiza); rect(120, 102, 130, 103, hex('#3a3a4a'));
  // el fluorescente (carcasa) y la tubería de arriba
  rect(180, 18, 274, 22, P.k); rect(181, 18, 273, 19, P.aceroS);
  // el cartel de la escala de radiación (pictograma y barras de colores, sin letras) junto a la pizarra
  rect(162, 40, 206, 84, P.k); rect(163, 41, 205, 83, hex('#e8e4d4')); rect(163, 41, 205, 41, P.blanco); a_picto(R, A_RAYOS, 167, 45, hex('#c8a020'), 2);
  for (let i = 0; i < 5; i++) { const c = [hex('#4ab04a'), hex('#a8c83a'), hex('#e8c040'), hex('#e8803a'), hex('#d83a3a')][i]; rect(180, 46 + i * 7, 180 + 6 + i * 4, 50 + i * 7, c); }
  a_picto(R, A_GAMMA, 168, 66, hex('#3a3a3a'), 2); rect(184, 0, 185, 40, P.muroD);
  // en el suelo, a la izquierda: un montón de cuadernos y una linterna
  rect(56, 150, 84, 158, P.k); rect(57, 151, 83, 152, hex('#e8e0d0')); rect(57, 153, 83, 154, hex('#3a6aa8')); rect(57, 155, 83, 157, hex('#e8e0d0')); rect(58, 147, 80, 150, P.k); rect(59, 148, 79, 149, hex('#a83a3a'));
  rect(92, 154, 106, 158, P.k); rect(93, 155, 105, 157, hex('#4a4e56')); rect(105, 154, 108, 158, hex('#e8d890'));
  rect(0, 22, 46, 28, P.k); rect(0, 23, 45, 27, P.tubo); rect(0, 23, 45, 23, P.tuboL); rect(40, 22, 46, 40, P.k); rect(41, 22, 45, 40, P.tubo); rect(41, 22, 41, 40, P.tuboL);
  // la consola de cerca
  rect(222, 56, 300, 124, P.k); rect(223, 57, 299, 123, P.acero); rect(223, 57, 299, 57, P.aceroL); rect(223, 57, 223, 123, P.aceroL);
  rect(228, 62, 294, 96, P.k); rect(229, 63, 293, 95, P.aceroD);
  for (let x = 232; x <= 290; x += 8) { R.disco(x, 104, 2.5, P.k); R.disco(x, 104, 1.5, P.aceroL); }
  for (let y = 114; y <= 120; y += 2) rect(228, y, 294, y, P.aceroS);
  // una caja en el suelo, a la izquierda, con su pictograma
  a_caja(R, 10, 122, 40, 146, A_CRUZ, hex('#a82a2a'));
}

function a_bunkerCamVida(R, t, o, v, ru, vacio, dx, dy, geo) {
  const { rect, pset, linea } = R, P = AB;
  const off = (t % 5.3) < 0.3 && Math.sin(t * 61) > 0;
  rect(182 + dx, 20 + dy, 272 + dx, 21 + dy, off ? P.fluorS : P.fluor);
  const S = [229 + dx, 63 + dy, 293 + dx, 95 + dy]; R.recorte(S);
  for (let x = S[0]; x <= S[2]; x += 8) for (let y = S[1]; y <= S[3]; y++) if (y % 2) pset(x, y, hex('#123224'));
  for (let x = S[0]; x <= S[2]; x++) { const u = (x - S[0]) / 64, y = Math.round(S[1] + 26 - 20 * Math.exp(-((u * 5 - (t * 0.8) % 7 + 1) ** 2)) - h(x + Math.floor(t * 10), 1, 34) * 3); pset(x, y, P.fosforo); pset(x, y + 1, P.fosforo); pset(x, y + 2, P.fosforoS); }
  R.recorte(null);
  for (let i = 0; i < 8; i++) { const on = Math.sin(t * (2 + i * 0.7) + i * 1.9) > 0.1; rect(231 + i * 8 + dx, 110 + dy, 232 + i * 8 + dx, 111 + dy, on ? (i === 3 ? P.rojo : P.fosforo) : P.aceroD); }
  // la silla de frente (o volcada) y, vacía la sala, el símbolo
  const sx = 160 + dx, sy = 170 + dy;
  // el taburete con la taza de café al lado de la silla (vacía la sala, la taza gira tumbada en el suelo)
  { const bx = 204 + dx; a_sombra(R, bx, sy, 12, 2, 0.5); rect(bx - 10, sy - 24, bx + 10, sy - 21, P.k); rect(bx - 9, sy - 23, bx + 9, sy - 22, P.madera); rect(bx - 9, sy - 23, bx + 9, sy - 23, P.maderaL);
    for (const x of [bx - 8, bx + 6]) { rect(x, sy - 21, x + 2, sy, P.k); rect(x + 1, sy - 21, x + 1, sy, P.maderaS); } rect(bx - 7, sy - 10, bx + 7, sy - 9, P.maderaS);
    rect(bx + 2, sy - 27, bx + 8, sy - 24, P.k); rect(bx + 3, sy - 26, bx + 7, sy - 25, hex('#e8e0d0'));
    if (!(vacio && o.taza != null)) { const salta = ru > 0 ? Math.max(0, Math.round(Math.sin(t * 19) * 3 * ru)) : 0; a_taza(R, bx - 4, sy - 24 - salta, t); if (!ru) a_vapor(R, bx - 3, sy - 32, t, 2, hex('#d8dcdc'), 12, 1); }
    else { const u = Math.max(0, Math.min(1, o.taza)); a_tazaTumbada(R, bx + 26 - Math.round(u * 6), sy + 2, t * 7 * (1 - u) + 20 * (1 - (1 - u) ** 2), 1.4); } }
  if (!vacio) {
    a_sombra(R, sx, sy, 16, 3, 0.5);
    rect(sx - 11, sy - 46, sx + 11, sy - 32, P.k); rect(sx - 10, sy - 45, sx + 10, sy - 33, P.acero); rect(sx - 10, sy - 45, sx + 10, sy - 44, P.aceroL); rect(sx - 10, sy - 34, sx + 10, sy - 33, P.aceroS);
    for (const x of [sx - 11, sx + 9]) { rect(x, sy - 32, x + 2, sy, P.k); rect(x + 1, sy - 32, x + 1, sy, P.aceroL); }
    rect(sx - 13, sy - 22, sx + 13, sy - 18, P.k); rect(sx - 12, sy - 21, sx + 12, sy - 19, P.acero); rect(sx - 12, sy - 21, sx + 12, sy - 21, P.aceroL);
    for (const x of [sx - 7, sx + 6]) rect(x, sy - 18, x + 1, sy - 2, P.aceroS);
  } else {
    a_simbolo(R, sx, sy - 10, 34, 7, t, { quemado: true });
    a_sombra(R, sx - 62, sy - 2, 22, 3, 0.5);
    rect(sx - 82, sy - 8, sx - 44, sy - 4, P.k); rect(sx - 81, sy - 7, sx - 45, sy - 5, P.acero); rect(sx - 81, sy - 7, sx - 45, sy - 7, P.aceroL);
    linea(sx - 74, sy - 8, sx - 64, sy - 26, P.k); linea(sx - 54, sy - 8, sx - 64, sy - 26, P.k); rect(sx - 72, sy - 28, sx - 52, sy - 25, P.k); rect(sx - 71, sy - 27, sx - 53, sy - 26, P.aceroL);
    for (const [x0, k] of [[sx - 20, 0], [sx, 1], [sx + 18, 2]]) a_vapor(R, x0, sy - 12, t * 0.8, k, k % 2 ? hex('#8a948e') : hex('#a8b0aa'), 34, 2);
  }
}
// EL VISOR de la cámara de vídeo por encima de todo: líneas de barrido, las cuatro esquinas (la de arriba a la derecha,
// por debajo de Atom), la cifra del tiempo que corre abajo a la izquierda, la pila y el punto rojo que parpadea abajo a
// la derecha; si ruge, la imagen se rasga en franjas
function a_visor(R, t, ru) {
  const B = R.buf, { rect, pset } = R, P = AB;
  if (ru > 0.05) { const f = Math.floor(t * 12); for (let k = 0; k < 4; k++) { const y0 = Math.floor(h(f, k, 35) * 170), alto = 2 + Math.floor(h(f, k, 36) * 6), d = Math.round((h(f, k, 37) - 0.5) * 14 * ru);
    for (let y = y0; y < Math.min(180, y0 + alto); y++) { const fila = B.slice(y * 320, y * 320 + 320); for (let x = 0; x < 320; x++) B[y * 320 + x] = fila[Math.min(319, Math.max(0, x - d))]; } } }
  for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) B[y * 320 + x] = a_mezcla(B[y * 320 + x], P.k, 0.18);
  const c = hex('#f4f4ec'), s = P.k;
  const esq = (x, y, sx, sy, n = 12) => { rect(Math.min(x, x + sx * n), y, Math.max(x, x + sx * n), y + 1, c); rect(x, Math.min(y, y + sy * n), x + 1, Math.max(y, y + sy * n), c); };
  esq(10, 24, 1, 1); esq(10, 168, 1, -1); esq(308, 168, -1, -1); rect(308, 50, 309, 62, c); rect(298, 50, 309, 51, c);
  rect(156, 98, 164, 98, hex('#d8d8d0')); rect(160, 94, 160, 102, hex('#d8d8d0'));
  const seg = Math.floor(t + 754), tc = `00:${String(Math.floor(seg / 60) % 60).padStart(2, '0')}:${String(seg % 60).padStart(2, '0')}`;
  a_dig(R, tc, 20, 158, c, 2, s);
  if ((t % 1) < 0.6) { R.disco(296, 162, 4, s); R.disco(296, 162, 3.2, P.rojo); pset(295, 160, hex('#ffb0a0')); }
  rect(262, 158, 280, 166, s); rect(263, 159, 279, 165, c); rect(280, 160, 282, 164, c); rect(264, 160, 278, 164, s); for (let i = 0; i < 3; i++) rect(265 + i * 5, 161, 268 + i * 5, 163, hex('#7ae08a'));
}

// EL PASILLO DE ACCESO, lo fijo: el techo con las tuberías (bridas, válvula, marcas de color) que bajan antes de la
// esquina de Atom, la pared de bloques con el zócalo pintado y desconchado, LA PUERTA ESTANCA rectangular de esquinas
// redondas (cierres, bisagras, volante, rayas de peligro), el pasillo que sigue a oscuras a la izquierda (con sus luces
// de jaula cada vez más lejos), cajas apiladas, el extintor, el armario de fusibles con manómetros, el intercomunicador
// y el suelo con la raya amarilla, los charcos y las rejillas
function a_pasilloFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = AB;
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 30 === 0 ? P.techoS : h(x >> 1, y >> 1, 41) > 0.9 ? P.techoL : P.techo);
  rect(0, 20, 319, 22, P.muroD);
  // la pared de bloques de hormigón (hiladas a soga) con el zócalo pintado
  for (let y = 23; y <= 147; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 23) / 10), dx = fila % 2 ? 12 : 0, bx = (x + dx) % 24, by = (y - 23) % 10, n = h(x, y, 42), m = h(Math.floor((x + dx) / 24), fila, 43);
    let v = 1.6 + (m - 0.5) * 0.7 + (n > 0.93 ? -0.8 : n < 0.05 ? 0.8 : 0) - Math.max(0, (40 - y) / 30);
    if (bx === 0 || by === 0) v = 0.4; else if (bx === 1 || by === 1) v += 0.7; else if (bx === 23 || by === 9) v -= 0.5;
    const pint = y > 104 && !(h(x >> 1, y >> 1, 44) < 0.05);
    pset(x, y, pint ? a_rampa([P.pinturaS, P.pinturaS, P.pintura, P.pinturaL], v, x, y) : a_rampa([P.muroD, P.muroS, P.muro, P.muroL], v, x, y));
  }
  rect(0, 102, 319, 103, P.amarillo); rect(0, 104, 319, 104, P.amarilloS);
  for (let x = 0; x < 320; x++) { const largo = h(x >> 1, 9, 45) * 30; if (h(x >> 1, 8, 45) < 0.15) for (let y = 44; y < 44 + largo; y++) if (a_b4(x, y) < 0.5) a_tinta(R, x, y, P.humedad, 0.5); }
  // el pasillo que sigue hacia la izquierda, a oscuras, con sus luces de jaula cada vez más lejos
  rect(0, 23, 26, 150, P.negro);
  poligono([[0, 23], [26, 23], [26, 50], [4, 86], [0, 86]], (x, y) => a_rampa([P.negro, P.techoS, P.techo], 2 - (26 - x) / 13 - (y - 23) / 60, x, y));
  poligono([[0, 150], [26, 150], [26, 128], [4, 100], [0, 100]], (x, y) => a_rampa([P.negro, P.sueloD, P.sueloS], 2.2 - (26 - x) / 12 + (y - 128) / 30, x, y));
  rect(0, 86, 4, 100, P.muroD); rect(1, 88, 3, 89, P.fluorS);
  for (const [x, y, r] of [[21, 58, 2], [13, 70, 1.5], [7, 79, 1]]) { R.halo(x, y + 2, r * 4, [P.techoS, P.muroD], 1); rect(x - r, y, x + r, y, P.fluor); }
  for (const [x, y] of [[20, 134], [12, 118]]) rect(x - 2, y, x + 1, y, P.amarilloS);
  rect(26, 23, 27, 150, P.muroS); rect(28, 23, 28, 150, P.muroL);
  // las tuberías: la gruesa con bridas y la válvula de volante, dos finas con sus anillos de color y las abrazaderas
  rect(0, 24, 268, 33, P.k); rect(0, 25, 267, 32, P.tubo); rect(0, 25, 267, 26, P.tuboL); rect(0, 31, 267, 32, P.tuboS);
  rect(262, 24, 270, 70, P.k); rect(263, 25, 269, 70, P.tubo); rect(263, 25, 264, 70, P.tuboL); rect(268, 25, 269, 70, P.tuboS);
  for (const x of [40, 104, 168, 232]) { rect(x, 22, x + 4, 35, P.k); rect(x + 1, 22, x + 3, 35, P.tuboL); rect(x + 3, 22, x + 3, 35, P.tuboS); }
  for (const [y, c, c2] of [[37, hex('#b84a3a'), hex('#e07a5a')], [42, hex('#c8a840'), hex('#f0d878')]]) { rect(0, y, 256, y + 3, P.k); rect(0, y + 1, 255, y + 2, c); rect(0, y + 1, 255, y + 1, c2);
    rect(254, y, 258, 74, P.k); rect(255, y + 1, 257, 74, c); }
  for (const x of [60, 140, 220]) { rect(x, 36, x + 2, 46, P.aceroD); rect(x + 6, 36, x + 9, 46, P.aceroS); rect(x + 6, 36, x + 9, 36, P.aceroL); }
  rect(118, 33, 120, 36, P.k); disco(119, 38, 5, P.k); R.anillo(119, 38, 4, P.rojo); R.anillo(119, 38, 3, P.rojoS); linea(115, 38, 123, 38, P.rojo); linea(119, 34, 119, 42, P.rojo); pset(117, 35, hex('#ff9a8a'));
  // LA PUERTA ESTANCA (cerrada): el marco grueso de esquinas redondas, la hoja con su refuerzo, los seis cierres de
  // palanca, las bisagras, el volante central y las rayas de peligro alrededor
  for (let y = 60; y <= 150; y++) for (let x = 168; x <= 232; x++) { const ix = Math.max(0, Math.abs(x - 200) - 24), iy = Math.max(0, Math.abs(y - 105) - 37); if (Math.hypot(ix, iy) > 8) continue;
    pset(x, y, ((x + y) >> 2) % 2 ? P.amarillo : P.k); }
  for (let y = 64; y <= 146; y++) for (let x = 172; x <= 228; x++) { const ix = Math.max(0, Math.abs(x - 200) - 20), iy = Math.max(0, Math.abs(y - 105) - 33), d = Math.hypot(ix, iy); if (d > 8) continue;
    const l = (200 - x) / 30 + (105 - y) / 60; pset(x, y, d > 7 ? P.k : d > 4.5 ? (l > 0.2 ? P.aceroL : P.acero) : d > 3.5 ? P.k : l > 0.4 ? P.aceroL : l > -0.3 ? P.acero : P.aceroS); }
  for (let y = 72; y <= 138; y++) for (let x = 180; x <= 220; x++) { const ix = Math.max(0, Math.abs(x - 200) - 12), iy = Math.max(0, Math.abs(y - 105) - 25), d = Math.hypot(ix, iy); if (d > 8) continue; if (d > 7) pset(x, y, P.aceroS); else if (d > 6) pset(x, y, P.aceroL); }
  for (const [x, y] of [[172, 76], [172, 105], [172, 134], [228, 76], [228, 105], [228, 134]]) { const s = x < 200 ? -1 : 1; rect(Math.min(x, x + s * 5), y - 2, Math.max(x, x + s * 5), y + 2, P.k); rect(Math.min(x, x + s * 4), y - 1, Math.max(x, x + s * 4), y + 1, P.aceroL); pset(x + s * 4, y, P.aceroD); }
  for (const y of [80, 128]) { rect(164, y, 170, y + 8, P.k); rect(165, y + 1, 169, y + 7, P.acero); rect(165, y + 1, 169, y + 1, P.aceroL); }
  disco(200, 105, 11, P.k); R.anillo(200, 105, 9.5, P.rojoS); R.anillo(200, 105, 9, P.rojo); R.anillo(200, 105, 8.5, P.rojoS);
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; linea(200, 105, Math.round(200 + Math.cos(a) * 8), Math.round(105 + Math.sin(a) * 8), P.rojoS); }
  disco(200, 105, 3, P.aceroD); disco(200, 105, 2, P.aceroL); pset(199, 104, P.blanco); pset(194, 98, hex('#ff9a8a')); pset(195, 97, hex('#ff9a8a'));
  rect(176, 146, 224, 149, P.k); rect(177, 146, 223, 147, P.aceroL);
  // la baliza de emergencia sobre la puerta: la base y la jaula (la luz que gira, cada fotograma)
  rect(193, 54, 207, 57, P.k); rect(194, 54, 206, 55, P.aceroS);
  // las cajas apiladas a la izquierda, con pictogramas, y una lona encima
  a_sombra(R, 64, 151, 30, 3, 0.5);
  a_caja(R, 36, 120, 64, 150, A_RAYOS, hex('#2a2a1e')); a_caja(R, 66, 128, 92, 150, A_GOTA); a_caja(R, 42, 100, 62, 120, A_CRUZ, hex('#a82a2a'));
  poligono([[40, 100], [64, 98], [66, 106], [60, 112], [42, 108]], P.k); poligono([[41, 100], [63, 99], [64, 105], [59, 110], [43, 107]], (x, y) => ((x + y) % 5 === 0 ? hex('#4a5a3a') : hex('#5e6e4a')));
  // el extintor en su soporte
  rect(146, 112, 149, 113, P.k); rect(144, 114, 151, 136, P.k); rect(145, 115, 150, 135, P.rojo); rect(145, 115, 146, 135, hex('#ff7a6a')); rect(149, 115, 150, 135, P.rojoS); rect(145, 120, 150, 123, P.blanco);
  rect(146, 110, 149, 112, P.k); linea(149, 111, 153, 118, P.k); rect(143, 116, 143, 132, P.aceroS);
  // el armario de fusibles con dos manómetros y el intercomunicador
  rect(240, 76, 264, 102, P.k); rect(241, 77, 263, 101, hex('#7a8478')); rect(241, 77, 263, 77, hex('#a0aa9e')); rect(263, 77, 263, 101, hex('#5a6458'));
  for (const x of [247, 257]) { disco(x, 85, 4, P.k); disco(x, 85, 3, hex('#e8e4d8')); pset(x, 82, P.k); }
  rect(244, 93, 260, 98, hex('#5a6458')); for (let x = 245; x < 260; x += 3) rect(x, 94, x + 1, 97, P.k);
  rect(278, 80, 290, 98, P.k); rect(279, 81, 289, 97, hex('#4a5a3a')); rect(279, 81, 289, 81, hex('#6a7a5a')); for (let y = 84; y < 92; y += 2) rect(281, y, 287, y, P.k); disco(284, 94, 1, P.rojo);
  for (let i = 0; i < 40; i++) pset(284 + Math.round(Math.sin(i * 0.2) * 2), 98 + i, P.k);
  // el suelo: la raya amarilla, las rejillas, el charco y la sombra al pie de la pared
  a_sueloH(R, 148, 179, 200, [200]);
  for (let x = 0; x < 320; x++) for (let y = 148; y < 151; y++) if (a_b4(x, y) < 0.6 - (y - 148) * 0.18) a_tinta(R, x, y, P.k, 0.4);
  poligono([[0, 172], [320, 168], [320, 171], [0, 175]], P.amarilloS); poligono([[0, 172], [320, 168], [320, 169], [0, 173]], P.amarillo);
  for (const x0 of [96, 272]) { rect(x0, 156, x0 + 18, 161, P.k); for (let x = x0 + 1; x < x0 + 18; x += 2) rect(x, 157, x, 160, P.aceroS); }
  for (let y = 160; y <= 166; y++) for (let x = 210; x <= 256; x++) { const d = ((x - 233) / 23) ** 2 + ((y - 163) / 3.4) ** 2; if (d < 1) pset(x, y, d > 0.8 ? P.sueloD : hex('#4a4e56')); }
}

function a_pasilloVida(R, t, o, v, ru, geo) {
  const { rect, pset, linea } = R, P = AB, dx = ru > 0 ? Math.round(Math.sin(t * 53) * 2.2 * ru) : 0, dy = ru > 0 ? Math.round(Math.cos(t * 41) * 1.6 * ru) : 0;
  // la baliza que gira: el haz rojo barre la pared y se refleja en el charco
  const a = t * 4.2, cx = 200 + dx, cy = 50 + dy, rojo = hex('#ff4a3a');
  for (let k = 0; k < 2; k++) { const ang = a + k * Math.PI, sx = Math.cos(ang); if (Math.sin(ang) < -0.2) continue;
    const xc = cx + sx * 150;
    for (let y = 23; y < 148; y++) { const w = 6 + Math.abs(y - cy) * 0.35; for (let x = Math.round(xc - w); x <= xc + w; x++) { if (x < 0 || x > 319) continue; const f = 1 - Math.abs(x - xc) / w; if (a_b4(x, y) < f * 0.42) a_tinta(R, x, y, rojo, 0.35); } }
    for (let y = 160; y <= 166; y++) for (let x = Math.round(233 + sx * 20 - 4); x <= 233 + sx * 20 + 4; x++) if (x > 211 && x < 255 && a_b4(x, y) < 0.5) a_tinta(R, x, y, rojo, 0.5); }
  R.disco(cx, cy, 5, P.k); R.disco(cx, cy, 4, Math.cos(a) > 0 ? hex('#ff6a5a') : P.rojoS); R.disco(cx - 1, cy - 1, 1.5, hex('#ffd0c0'));
  for (let i = -4; i <= 4; i += 2) linea(cx + i, cy - 5, cx + i, cy + 3, P.k);
  // la luz verde que se cuela por las rendijas de la puerta (y se derrama por el suelo) y chisporrotea
  if (v > 0.01) { const G = C.doomV, GS = C.doomVS, lat = 0.8 + 0.2 * Math.sin(t * 13) * Math.sin(t * 5.3);
    for (let y = 64; y <= 146; y++) for (let x = 172; x <= 228; x++) { const ix = Math.max(0, Math.abs(x - 200) - 20), iy = Math.max(0, Math.abs(y - 105) - 33), d = Math.hypot(ix, iy); if (d > 3.4 && d < 4.6) pset(x + dx, y + dy, lat > 0.85 ? hex('#d2ffe6') : G); }
    for (let y = 150; y < 180; y++) { const w = 26 + (y - 150) * 1.6; for (let x = Math.round(200 - w); x <= 200 + w; x++) { const f = (1 - Math.abs(x - 200) / w) * (1 - (y - 150) / 34) * v * lat; if (a_b4(x, y) < f) a_tinta(R, x + dx, y + dy, f > 0.5 ? G : GS, 0.5); } }
    for (let k = 0; k < 8; k++) { const u = (t * 1.3 + k / 8) % 1, lado = k % 2 ? 1 : -1, x = Math.round(200 + lado * (24 + u * 10)), y = Math.round(70 + h(k, 1, 46) * 70 + u * 10); if (u < 0.6) pset(x + dx, y + dy, G); }
  }
  // el fluorescente de jaula sobre las cajas, que parpadea, y la fuga de vapor de la tubería fina
  const off = (t % 4.7) < 0.3 && Math.sin(t * 61) > 0;
  rect(100 + dx, 48 + dy, 132 + dx, 52 + dy, P.k); rect(101 + dx, 49 + dy, 131 + dx, 50 + dy, off ? P.fluorS : P.fluor); for (let x = 104; x < 132; x += 6) rect(x + dx, 48 + dy, x + dx, 52 + dy, P.aceroS);
  a_vapor(R, 150 + dx, 40 + dy, t * 1.4, 0, hex('#dfe6ea'), 14); a_vapor(R, 152 + dx, 40 + dy, t * 1.4 + 1.1, 2, hex('#c8d2d8'), 10);
  // la gota que cae al charco
  { const u = (t % 2.1) / 2.1, y = Math.round(34 + u * u * 128); if (u < 0.93) pset(236 + dx, y + dy, hex('#9ac8e8')); else { R.anillo(236 + dx, 163 + dy, 2 + (u - 0.93) * 40, hex('#7a9ab8')); } }
}

// EL SUELO A RAS, lo fijo: la pared lejana en penumbra (el zócalo y la parte baja de la consola y de la cama), las patas
// de la silla volcada, y el suelo de hormigón que viene hacia nosotros en perspectiva, con juntas, poros, grietas y una
// rejilla
function a_sueloFijo(R) {
  const { rect, pset, linea, poligono } = R, P = AB;
  // la pared del fondo en penumbra: arriba (y 0–18, bajo la barra del año) la sombra del techo en dos tonos muy
  // cercanos; la esquina de Atom (x 272–320, y 0–48) igual de tranquila; el resto, hormigón en penumbra con grano
  for (let y = 0; y < 76; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 51), m = h(x >> 3, y >> 2, 58);
    const calma = y < 18 || a_b4(x, y) < Math.min(1, Math.max(0, (x - 262) / 12)) * Math.min(1, Math.max(0, (56 - y) / 10));
    let c; if (calma) c = a_rampa([P.techoS, P.techo], Math.min(0.9, y / 30) + (m - 0.5) * 0.35, x, y);
    else c = a_rampa([P.techo, P.muroD, P.muroS], 0.5 + ((y - 18) / 58) * 1.6 + (n - 0.5) * 0.35 + (m - 0.5) * 0.4, x, y);
    pset(x, y, c); }
  for (let y = 50; y < 76; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y >> 1, 52) > 0.05) pset(x, y, a_rampa([P.k, P.pinturaS, P.pintura], 0.6 + (y - 50) / 26, x, y));
  rect(0, 46, 319, 47, hex('#8a7a30')); rect(0, 74, 319, 75, P.aceroD);
  // la pared en penumbra: juntas de los paneles (fuera de la esquina de Atom), la tubería con sus bridas y abrazaderas
  // (de y 22 a 29, por debajo del año), las manchas de humedad que bajan de la tubería
  for (const x of [30, 114, 198]) { rect(x, 19, x, 45, P.muroD); rect(x + 1, 19, x + 1, 45, P.muroS); }
  rect(60, 22, 262, 29, P.k); rect(60, 23, 262, 28, P.tuboS); rect(60, 23, 262, 24, P.tubo); for (const x of [96, 160, 224]) { rect(x, 21, x + 3, 30, P.k); rect(x + 1, 21, x + 2, 30, P.tubo); }
  rect(258, 22, 266, 46, P.k); rect(259, 29, 265, 46, P.tuboS); rect(259, 29, 260, 46, P.tubo);
  for (const x of [128, 192, 240]) rect(x, 30, x + 1, 34, P.aceroD);
  for (const [cx, w, l] of [[186, 10, 16], [104, 6, 12], [232, 5, 10]]) for (let y = 30; y < 30 + l; y++) for (let x = cx - w; x < cx + w; x++) if (a_b4(x, y) < 0.4 * (1 - Math.abs(x - cx) / w) * (1 - (y - 30) / l)) a_tinta(R, x, y, P.k, 0.4);
  // la puerta redonda, abajo a la izquierda (la hoja entera queda por debajo de la barra del año) y su escalón
  R.disco(6, 52, 30, (x, y) => (Math.hypot(x - 6, y - 52) > 28.5 ? P.k : Math.hypot(x - 6, y - 52) > 26 ? P.aceroL : a_rampa([P.k, P.aceroD, P.aceroS], 1.6 - (y - 22) / 40 + (h(x >> 1, y >> 1, 59) - 0.5) * 0.4, x, y)));
  R.anillo(6, 52, 14, P.aceroD); R.disco(6, 52, 4, P.rojoS); R.pset(5, 50, P.rojo);
  for (const a of [0.3, 1.1, 1.9]) { const x = Math.round(6 + Math.cos(-a) * 22), y = Math.round(52 + Math.sin(-a) * 22); R.disco(x, y, 1.6, P.aceroL); R.pset(x + 1, y + 1, P.k); }
  rect(0, 70, 44, 75, P.k); rect(0, 70, 42, 71, P.aceroS);
  // a lo lejos: las patas de la cama, la caja y la garrafa, desenfocadas en la penumbra
  for (const x of [250, 290]) { linea(x, 76, x + 14, 54, P.aceroD); linea(x + 14, 76, x, 54, P.aceroD); }
  rect(238, 50, 316, 54, P.aceroD); rect(30, 44, 74, 75, P.k); rect(31, 45, 73, 74, P.cajaS); for (let y = 50; y < 74; y += 6) rect(31, y, 73, y, hex('#3e3a24'));
  rect(90, 54, 106, 75, P.k); rect(91, 56, 105, 74, hex('#3a5a7a')); rect(91, 56, 92, 74, hex('#5a8ab8'));
  // el cable que corre por el zócalo con su enchufe
  for (let x = 0; x < 320; x++) pset(x, 70 + Math.round(Math.sin(x * 0.05) * 1.5), P.k);
  rect(126, 58, 136, 68, P.k); rect(127, 59, 135, 67, hex('#c8c4b8')); rect(129, 61, 130, 64, P.k); rect(132, 61, 133, 64, P.k);
  // el suelo en perspectiva hacia nosotros: punto de fuga en (160, 40)
  for (let y = 76; y < 180; y++) { const d = (y - 76) / 104;
    for (let x = 0; x < 320; x++) { const n = h(x >> (d > 0.5 ? 0 : 1), y, 53), m = h(Math.floor(x / (4 + d * 10)), Math.floor(y / (2 + d * 6)), 54);
      const v = 0.9 + d * 1.6 + (m - 0.5) * 0.8 + (n > 0.93 ? -0.9 : n < 0.05 ? 0.9 : 0) - Math.abs(x - 160) / 320; pset(x, y, a_rampa([P.sueloD, P.sueloS, P.suelo, P.sueloL], v, x, y)); } }
  for (let k = -6; k <= 6; k++) { linea(160 + k * 30, 76, 160 + k * 30 * 4.2, 179, P.sueloS); linea(161 + k * 30, 76, 161 + k * 30 * 4.2, 179, P.sueloL); }
  for (const y of [84, 100, 128, 170]) { rect(0, y, 319, y, P.sueloS); rect(0, y + 1, 319, y + 1, P.sueloL); }
  for (let i = 0, x = 40, y = 120; i < 40; i++) { pset(x, y, P.sueloD); pset(x + 1, y, P.sueloS); x += 1 + (h(i, 1, 55) < 0.4 ? 1 : 0); y += h(i, 2, 55) < 0.5 ? 1 : 0; }
  for (let i = 0, x = 280, y = 96; i < 30; i++) { pset(x, y, P.sueloD); x -= 1; y += h(i, 3, 55) < 0.6 ? 1 : 0; }
  rect(256, 150, 300, 162, P.k); for (let x = 258; x < 300; x += 4) rect(x, 151, x + 1, 161, P.aceroS);
  // la silla volcada: el respaldo en el suelo y las patas hacia arriba (a la derecha, al fondo)
  rect(196, 70, 244, 76, P.k); rect(197, 71, 243, 75, P.acero); rect(197, 71, 243, 71, P.aceroL);
  linea(204, 71, 216, 36, P.k); linea(205, 71, 217, 36, P.aceroL); linea(234, 71, 222, 36, P.k); linea(233, 71, 221, 36, P.aceroS); rect(212, 32, 226, 36, P.k); rect(213, 33, 225, 34, P.aceroL);
  a_sombra(R, 220, 77, 30, 3, 0.6);
}
// EL SUELO A RAS, lo que se mueve: el símbolo grande humeando, la taza que gira tumbada y deja su reguero de café, las
// gafas caídas (con un reflejo verde) y el rayo de luz que baja desde la trampilla
function a_sueloVida(R, t, o, geo) {
  const P = AB, [sx, sy] = geo.simbolo, [tx, ty] = geo.taza;
  // el reflejo verde del símbolo en la pared del fondo, que late
  { const lat = 0.6 + 0.4 * Math.sin(t * 3.1); for (let y = 30; y < 78; y++) for (let x = sx - 70; x <= sx + 70; x++) { const f = (1 - Math.abs(x - sx) / 70) * ((y - 30) / 48) * 0.5 * lat; if (a_b4(x, y) < f) a_tinta(R, x, y, C.doomVS, 0.4); } }
  // el rayo de luz que entra en diagonal desde arriba a la izquierda
  for (let y = 0; y < 180; y++) { const xc = -40 + y * 0.9; for (let x = Math.round(xc - 18); x <= xc + 18; x++) { if (x < 0 || x > 319) continue; const f = 1 - Math.abs(x - xc) / 18; if (a_b4(x, y) < f * 0.28) a_tinta(R, x, y, hex('#e8eef0'), 0.22); } }
  a_simbolo(R, sx, sy, 58, 15, t, { quemado: true });
  for (const [x0, k] of [[sx - 40, 0], [sx - 10, 1], [sx + 22, 2], [sx + 46, 3], [sx - 26, 4]]) a_vapor(R, x0, sy - 4, t * 0.7, k, k % 2 ? hex('#7a8480') : hex('#a0a8a4'), 50, 3);
  const u = Math.max(0, Math.min(1, o.taza ?? 0.4)), giro = t * 8 * (1 - u) + 24 * (1 - (1 - u) ** 2);
  for (let i = 0; i < 40; i++) { const x = Math.round(tx + 6 + i * 1.6), y = Math.round(ty + 4 + Math.sin(i * 0.3) * 1.5); if (h(i, 1, 56) < 0.85) { R.pset(x, y, P.cafe); R.pset(x, y + 1, P.cafeL); if (i < 20) R.pset(x, y - 1, P.cafe); } }
  a_tazaTumbada(R, tx, ty, giro, 2.4);
  // las gafas: dos lentes redondas con su montura y un puente, y una patilla doblada
  const gx = 214, gy = 150;
  for (const dx of [-8, 8]) { R.disco(gx + dx, gy, 6, P.k); R.disco(gx + dx, gy, 4.6, hex('#8aa8b8')); R.pset(gx + dx - 2, gy - 2, P.blanco); R.pset(gx + dx - 1, gy - 3, P.blanco); if (dx > 0) { R.pset(gx + dx + 1, gy + 1, C.doomV); R.pset(gx + dx + 2, gy + 1, C.doomV); } }
  R.linea(gx - 2, gy - 1, gx + 2, gy - 1, P.k); R.linea(gx + 14, gy - 1, gx + 26, gy - 5, P.k); R.linea(gx - 14, gy, gx - 22, gy + 6, P.k);
  // el polvo que se posa en el rayo de luz
}

// las motas de polvo que flotan en el rayo de luz (cámara 'suelo', por delante de todo)
function a_motas(R, t) {
  for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 1, 57) * 360 + t * (3 + h(k, 2, 57) * 4)) % 360) - 20, y = Math.round((h(k, 3, 57) * 200 + t * (2 + h(k, 4, 57) * 3)) % 200) - 10, xc = -40 + y * 0.9;
    if (Math.abs(x - xc) < 18 && Math.sin(t * 2 + k) > -0.3) R.pset(x, y, hex('#f4f6f0')); }
}

const AW = pal({
  c0: '#1e1a2c', c1: '#2a2438', c2: '#382e48', c3: '#463a56', c4: '#564664', c5: '#685672', c6: '#7c687e', c7: '#94808c',
  nubeD: '#251f33', nube: '#3c3250', nubeL: '#5a4c6c', nubeF: '#8a7c98',
  lejos: '#6a6888', lejosL: '#8886a6', lejosS: '#55546f', nieveL: '#e2e6f2', nieveS: '#aab2cc', nieveD: '#7e86a6',
  cerca: '#47425c', cercaL: '#5e5874', cercaS: '#332f44',
  piedra: '#4e4858', piedraL: '#6c6676', piedraS: '#322e3a', piedraD: '#221e28', liquen: '#5a6450',
  nieve: '#eef2f8', nieveM: '#d2d8e8', nieveB: '#b2bcd4', nieveA: '#8e98b8',
  abeto: '#2a3e3a', abetoL: '#3e5a50', abetoS: '#1a2a28',
  tejado: '#f2f4fa', muroC: '#8a7a6a', muroCS: '#5e5248', ventana: '#ffd27a', ventanaS: '#c8903a',
  rojo: '#e0304a', rojoL: '#ff8a98', rojoS: '#8a1a2e',
  k: '#121018', blanco: '#ffffff',
});

const A_VACIO = 0x01020304;

// capa con huecos transparentes (A_VACIO): lo que no se pinta deja ver lo de debajo (el cielo con sus nubes)
function a_capaT(R, clave, dibuja) { return a_capa(R, clave, () => { R.buf.fill(A_VACIO); dibuja(); }); }

function a_pegar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== A_VACIO) B[i] = c; } }

// el cielo de tormenta, fijo: degradado tramado de violeta oscuro arriba a malva gris en el horizonte, con un claro
// más luminoso detrás de la cumbre (cx)
function a_cieloTormenta(R, cx, hor) {
  a_degradado(R, 0, 0, 319, hor, [AW.c0, AW.c1, AW.c2, AW.c3, AW.c4, AW.c5, AW.c6, AW.c7], (x, y) => { const d = 1 - Math.hypot((x - cx) * 0.6, (y - hor * 0.7) * 1.4) / 120; return (d > 0 ? d * 1.4 : 0) + (h(x >> 3, y >> 2, 61) - 0.5) * 0.5; }, 1.1);
}

// una nube de tormenta (cx, cy: el centro de su base; w ancho; k semilla): bolas que se solapan, con el filo de arriba
// claro, el cuerpo y la panza oscura; c = [filo, luz, cuerpo, panza]
function a_nubeT(R, cx, cy, w, k, c) {
  const n = 4 + Math.min(5, Math.floor(w / 14)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.8 + (h(k, i, 62) - 0.5) * 6, cy - 2 - m * (3 + h(k, i, 63) * 4), w * (0.12 + h(k, i, 64) * 0.1), 3 + m * 4 + h(k, i, 65) * 2]); }
  const den = (x, y) => { if (y > cy + 2) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 18); y <= cy + 2; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y - 1) ? c[0] : !den(x, y - 3) ? c[1] : !den(x, y + 2) ? c[3] : c[2]);
}

// las nubes de tormenta en tres capas (lejos despacio, en medio, cerca deprisa), dentro de y0–y1; f: el destello del
// relámpago (aclara los filos)
function a_nubes(R, t, y0, y1, f = 0, rojo = 0) {
  const capas = [[0.8, [AW.c6, AW.c5, AW.c4, AW.c3], 6, 0], [2.0, [AW.nubeF, AW.nubeL, AW.nube, AW.nubeD], 5, 1], [4.2, [AW.nubeL, AW.nube, AW.nubeD, AW.c0], 4, 2]];
  for (const [vel, cols, n, k] of capas) { const c = f > 0 ? [AW.blanco, cols[0], cols[1], cols[2]] : rojo > 0 ? [a_mezcla(cols[0], AW.rojoL, rojo * 0.5), a_mezcla(cols[1], AW.rojo, rojo * 0.35), cols[2], cols[3]] : cols;
    for (let i = 0; i < n; i++) { const w = 50 + h(i, k, 66) * 60, x = ((h(i, k, 67) * 440 + t * vel) % 440) - 60, y = y0 + (y1 - y0) * (k / 2.4 + h(i, k, 68) * 0.35); a_nubeT(R, x, y, w, i * 7 + k, c); } }
}

// el relámpago lejano: cada 6,3 s, un rayo quebrado detrás de las montañas; devuelve el destello (0–1)
function a_relampago(R, t, x0, x1, yb) {
  const ciclo = (t + 2.1) % 6.3; if (ciclo > 0.22) return 0;
  const k = Math.floor((t + 2.1) / 6.3), x = Math.round(x0 + h(k, 1, 69) * (x1 - x0)); let px = x, py = 22;
  while (py < yb) { const nx = px + Math.round((h(px, py, 70) - 0.5) * 8), ny = py + 4 + Math.round(h(py, px, 71) * 4); R.linea(px, py, nx, ny, AW.blanco); R.linea(px + 1, py, nx + 1, ny, hex('#c8c0f0')); px = nx; py = ny; }
  return ciclo < 0.08 || (ciclo > 0.14 && ciclo < 0.18) ? 1 : 0.4;
}

// la nieve que cae en diagonal (empujada por el viento hacia la izquierda); cerca: copos más grandes y rápidos
function a_nieve(R, t, n = 1, cerca = 0) {
  const N = Math.round((cerca ? 46 : 80) * n);
  for (let k = 0; k < N; k++) { const v = cerca ? 34 + h(k, 1, 72) * 20 : 12 + h(k, 1, 72) * 10, y = (h(k, 2, 72) * 200 + t * v) % 200 - 10, x = ((h(k, 3, 72) * 380 - t * v * 0.55 + Math.sin(t * 1.3 + k) * 3) % 380 + 380) % 380 - 30;
    const px = Math.round(x), py = Math.round(y); if (px >= 278 && px <= 318 && py >= 4 && py <= 44) continue;
    R.pset(px, py, cerca ? AW.blanco : AW.nieveM); if (cerca) { R.pset(px + 1, py, AW.nieveM); if (k % 3 === 0) { R.pset(px, py + 1, AW.nieveM); R.pset(px + 1, py + 1, AW.nieveB); } } }
}

// un cuervo que vuela (x, y; a: el aleteo)
function a_cuervo(R, x, y, a, dir = 1) {
  const c = AW.k, x0 = Math.round(x), y0 = Math.round(y), al = a > 0 ? -2 : 1;
  R.rect(x0 - 1, y0, x0 + 1, y0 + 1, c); R.pset(x0 + 2 * dir, y0, c); R.pset(x0 + 3 * dir, y0, hex('#3a3440'));
  R.linea(x0 - 1, y0, x0 - 4, y0 + al, c); R.linea(x0 + 1, y0, x0 + 4, y0 + al, c); R.pset(x0 - 5, y0 + al + (a > 0 ? -1 : 1), c); R.pset(x0 + 5, y0 + al + (a > 0 ? -1 : 1), c); R.pset(x0 - 2 * dir, y0 + 1, c);
}

// una cordillera: para cada x, la cima es la envolvente de los picos (x, y, anchura) con dientes de ruido; la cara de la
// izquierda de cada pico, con luz; la de la derecha, en sombra; la nieve cubre lo alto con lenguas que bajan por las
// canales; cols = [luz, cuerpo, sombra, nieve, nieve en sombra]; llena hasta yb
function a_cordillera(R, picos, yb, cols, k, nieve = 16) {
  for (let x = 0; x < 320; x++) {
    let top = 999, pk = picos[0];
    for (const p of picos) { const y = p[1] + Math.abs(x - p[0]) * p[2]; if (y < top) { top = y; pk = p; } }
    top = Math.round(top + (h(x >> 1, k, 73) - 0.5) * 3 + Math.sin(x * 0.3 + k) * 0.8);
    const luz = x < pk[0];
    for (let y = Math.max(0, top); y <= yb; y++) {
      const d = y - top, lengua = nieve * (0.55 + 0.6 * h(Math.floor(x / 3), k, 74)) * (1 - (y - pk[1]) / 220), canal = Math.sin(x * 0.45 + y * 0.12 * (luz ? 1 : -1) + k) > 0.55;
      let c; if (d < lengua && !(canal && d > 3)) c = luz ? cols[3] : (d < 2 ? cols[3] : cols[4]); else c = luz ? (h(x, y, 75) > 0.8 ? cols[1] : cols[0]) : (h(x, y, 75) > 0.85 ? cols[1] : cols[2]);
      if (Math.abs(x - pk[0]) < 1 && d < lengua) c = cols[3];
      R.pset(x, y, c); }
  }
}

// un bloque de piedra (polígono pts) con su textura (grietas, liquen), el canto de arriba y de la izquierda con luz, el
// de la derecha en sombra, el contorno oscuro y la nieve acumulada encima; f: tinte (0 normal)
function a_bloque(R, pts, k, nieve = 3, cols = [AW.piedraL, AW.piedra, AW.piedraS, AW.piedraD]) {
  let x0 = 999, x1 = -999; for (const [x] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
  const top = {}; for (let x = Math.floor(x0); x <= x1; x++) { let m = 999; for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; if ((ax <= x && bx >= x) || (bx <= x && ax >= x)) { const y = ax === bx ? Math.min(ay, by) : ay + (x - ax) / (bx - ax) * (by - ay); m = Math.min(m, y); } } top[x] = Math.round(m); }
  const cx = (x0 + x1) / 2;
  R.poligono(pts, (x, y) => { const d = y - (top[x] ?? y), n = h(x, y, 76 + k), m = h(x >> 2, y >> 2, 77 + k), lado = (x - cx) / Math.max(1, (x1 - x0) / 2);
    if (d < nieve * (0.6 + 0.6 * h(x >> 1, k, 78))) return d < 1 ? AW.nieve : AW.nieveM;
    if (d < nieve + 1.5) return AW.nieveA;
    let v = 1.9 - lado * 0.9 - d * 0.03 + (m - 0.5) * 0.8; if (n > 0.95) v -= 1.2; if (n < 0.04) v += 0.8;
    if (h(x >> 2, y >> 2, 79 + k) < 0.05 && h(x, y, 114) < 0.5) return AW.liquen;
    return a_rampa([cols[3], cols[2], cols[1], cols[0]], v, x, y); });
  for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; R.linea(ax, ay, bx, by, cols[3]); }
  // una grieta
  let px = Math.round(cx + (h(k, 1, 80) - 0.5) * (x1 - x0) * 0.5), py = (top[px] ?? 0) + nieve + 3; for (let i = 0; i < 8; i++) { if (h(k, 2, 80) < 0.5) break; R.pset(px, py, cols[3]); px += h(i, k, 81) < 0.5 ? 1 : -1; py += 1; }
}

// una columna estriada (x0–x1, de yTop a yBase) con su basa, el fuste con luz a la izquierda, las estrías, la rotura de
// arriba en dientes y la nieve encima
function a_columna(R, x0, x1, yTop, yBase, k) {
  const w = x1 - x0, R4 = [AW.piedraD, AW.piedraS, AW.piedra, AW.piedraL];
  R.rect(x0 - 3, yBase - 5, x1 + 3, yBase, AW.piedraD); R.rect(x0 - 2, yBase - 4, x1 + 2, yBase - 1, AW.piedra); R.rect(x0 - 2, yBase - 4, x1 + 2, yBase - 4, AW.piedraL);
  for (let x = x0; x <= x1; x++) { const dent = Math.round((h(x, k, 82) - 0.3) * 6) + (x - x0 < w / 2 ? 0 : 3), y0 = yTop + Math.max(0, dent), u = (x - x0) / w, estria = (x - x0) % 4 === 0;
    for (let y = y0; y < yBase - 5; y++) { const v = 3.1 - u * 2.6 + (estria ? -0.9 : 0) + (h(x, y, 83 + k) > 0.94 ? -0.8 : 0); R.pset(x, y, x === x0 || x === x1 ? AW.piedraD : a_rampa(R4, v, x, y)); }
    R.pset(x, y0, AW.nieve); R.pset(x, y0 + 1, u < 0.6 ? AW.nieve : AW.nieveB); if (h(x, k, 84) < 0.5) R.pset(x, y0 - 1, AW.nieve); }
  for (let y = yTop + 12; y < yBase - 8; y += 17) { R.rect(x0 + 1, y, x1 - 1, y, AW.piedraD); }
}

// LAS RUINAS: el cielo (fijo), las nubes y el relámpago (vivos), las montañas y el templo (capa con el cielo transparente)
function a_ruinasFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  a_cordillera(R, [[22, 66, 0.55], [74, 50, 0.6], [128, 62, 0.7], [176, 46, 0.62], [232, 56, 0.6], [292, 58, 0.7]], 112, [AW.lejosL, AW.lejos, AW.lejosS, AW.nieveL, AW.nieveS], 1, 18);
  // la bruma entre las dos cordilleras
  for (let y = 84; y < 112; y++) for (let x = 0; x < 320; x++) { const f = 1 - Math.abs(y - 96) / 14; if (f > 0 && a_b4(x, y) < f * 0.5 * (0.6 + 0.4 * Math.sin(x * 0.04))) a_tinta(R, x, y, AW.c7, 0.5); }
  a_cordillera(R, [[10, 92, 0.5], [90, 88, 0.45], [150, 100, 0.5], [214, 86, 0.5], [300, 90, 0.45]], 132, [AW.cercaL, AW.cerca, AW.cercaS, AW.nieveM, AW.nieveB], 2, 9);
  // la meseta de nieve: las ondas de las ventiscas, sombras azules, piedras que asoman, matas secas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const ola = Math.sin(x * 0.07 + y * 0.35 + Math.sin(x * 0.02) * 2), d = (y - 124) / 56;
    const v = 2.3 + ola * 0.6 - (h(x >> 2, y >> 1, 85) - 0.5) * 0.6 + d * 0.5; pset(x, y, a_rampa([AW.nieveA, AW.nieveB, AW.nieveM, AW.nieve], v, x, y)); }
  for (let x = 0; x < 320; x++) { const y = 124 + Math.round(Math.sin(x * 0.05) * 2 + h(x >> 3, 1, 86) * 2); for (let j = y - 3; j < y; j++) pset(x, j, AW.nieveM); pset(x, y - 4, AW.nieveB); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 87) * 320), y = Math.round(130 + h(k, 2, 87) ** 1.3 * 48), s = 1 + Math.round(h(k, 3, 87) * 2 + (y - 130) / 20);
    if (x > 146 && x < 270 && y < 164) continue; disco(x, y, s, AW.piedraS); pset(x - 1, y - s, AW.nieve); pset(x, y - s, AW.nieve); if (s > 1) pset(x + 1, y, AW.piedraD); }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 4, 87) * 320), y = Math.round(140 + h(k, 5, 87) * 36); if (x > 146 && x < 270 && y < 164) continue; for (let i = 0; i < 4; i++) linea(x + i, y, x + i + (i % 2 ? 1 : -1), y - 3 - (i % 3), hex('#8a7a5a')); }
  // el templo: escalinata de tres peldaños con nieve en las huellas
  for (let i = 0; i < 3; i++) { const y = 126 + i * 5, xa = 8 - i * 4, xb = 150 + i * 2; rect(xa, y, xb, y + 4, AW.piedraD); rect(xa + 1, y + 1, xb - 1, y + 4, AW.piedra); rect(xa + 1, y, xb - 1, y + 1, AW.nieve); for (let x = xa + 2; x < xb; x += 9) rect(x, y + 2, x, y + 4, AW.piedraS); }
  for (let i = 0; i < 2; i++) { const y = 128 + i * 6; rect(262, y, 320, y + 5, AW.piedraD); rect(263, y + 1, 320, y + 5, AW.piedra); rect(263, y, 320, y + 1, AW.nieve); }
  // la columna rota alta, la corta y la de la derecha
  a_columna(R, 18, 30, 62, 128, 1); a_columna(R, 128, 140, 104, 128, 2); a_columna(R, 252, 264, 76, 130, 3);
  // EL ARCO PARTIDO: dos pilares; las dovelas del lado izquierdo suben y se cortan; una dovela caída en el suelo
  for (const [x0, x1, yt] of [[40, 52, 92], [106, 118, 104]]) { rect(x0, yt, x1, 128, AW.piedraD); for (let y = yt + 1; y < 128; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, ((y - yt) % 8 === 0) ? AW.piedraD : a_rampa([AW.piedraD, AW.piedraS, AW.piedra, AW.piedraL], 3 - (x - x0) / (x1 - x0) * 2.4 + (h(x, y, 88) > 0.93 ? -1 : 0), x, y)); rect(x0, yt, x1, yt + 1, AW.nieve); }
  for (let a = Math.PI; a > Math.PI * 0.56; a -= 0.006) for (let r = 27; r <= 39; r++) { const x = Math.round(79 + Math.cos(a) * r), y = Math.round(94 + Math.sin(a) * r); const junta = Math.floor((Math.PI - a) / 0.16) !== Math.floor((Math.PI - a - 0.006) / 0.16);
    pset(x, y, r === 27 || r === 39 || junta ? AW.piedraD : a_rampa([AW.piedraS, AW.piedra, AW.piedraL], 2.4 - (r - 27) / 12 - (a < Math.PI * 0.75 ? 0.3 : 0) + (h(x, y, 113) > 0.93 ? -1 : 0), x, y)); }
  for (let a = Math.PI * 0.9; a > Math.PI * 0.56; a -= 0.006) { const x = Math.round(79 + Math.cos(a) * 40), y = Math.round(94 + Math.sin(a) * 40); pset(x, y, AW.nieve); pset(x, y - 1, AW.nieveM); }
  { const a = Math.PI * 0.56, x0 = Math.round(79 + Math.cos(a) * 27), y0 = Math.round(94 + Math.sin(a) * 27), x1 = Math.round(79 + Math.cos(a) * 39), y1 = Math.round(94 + Math.sin(a) * 39); for (let i = 0; i <= 12; i++) pset(Math.round(x0 + (x1 - x0) * i / 12) + (i % 3 === 1 ? 1 : 0), Math.round(y0 + (y1 - y0) * i / 12), AW.piedraD); }
  a_bloque(R, [[114, 132], [128, 130], [130, 140], [112, 141]], 5, 2);
  // los relieves gastados en el muro de la derecha: espirales, zigzags y una figura geométrica, sin letras
  rect(270, 96, 320, 128, AW.piedraD); for (let y = 97; y < 128; y++) for (let x = 271; x < 320; x++) pset(x, y, (y - 97) % 10 === 0 || (x + ((y - 97) / 10 | 0) * 8) % 16 === 0 ? AW.piedraS : a_rampa([AW.piedraS, AW.piedra, AW.piedraL], 1.6 + (h(x, y, 89) - 0.5) * 0.8, x, y));
  for (const [cx, cy] of [[282, 108], [306, 108]]) for (let a = 0; a < 12; a += 0.15) { const r = a * 0.55, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); if (h(x, y, 90) > 0.25) { pset(x, y, AW.piedraD); pset(x - 1, y - 1, AW.piedraL); } }
  for (let x = 274; x < 318; x++) { const y = 121 + ((x >> 2) % 2 ? x % 4 : 3 - x % 4); if (h(x, 1, 91) > 0.2) { pset(x, y, AW.piedraD); pset(x, y - 1, AW.piedraL); } }
  rect(270, 95, 320, 96, AW.nieve); rect(270, 97, 320, 97, AW.nieveB);
  // los tambores de columna caídos, con sus anillos y la nieve encima
  for (const [x, y, w] of [[64, 140, 26], [92, 146, 20]]) { rect(x, y - 8, x + w, y, AW.piedraD); for (let j = y - 7; j < y; j++) for (let i = x + 1; i < x + w; i++) pset(i, j, a_rampa([AW.piedraD, AW.piedraS, AW.piedra, AW.piedraL], 3 - (j - y + 7) / 3 + ((i - x) % 4 === 0 ? -0.8 : 0), i, j)); rect(x + 1, y - 8, x + w - 1, y - 7, AW.nieve);
    disco(x + w, y - 4, 4, AW.piedraD); disco(x + w, y - 4, 3, AW.piedraL); R.anillo(x + w, y - 4, 2, AW.piedraS); }
  // EL MONTÓN: bloques grandes apilados, con nieve en las caras de arriba; el hueco del lecho se queda en la base
  const bloques = [
    [[150, 160], [166, 132], [186, 136], [182, 162]], [[244, 162], [240, 134], [262, 138], [268, 162]],
    [[160, 134], [176, 112], [196, 116], [190, 138]], [[214, 138], [212, 110], [236, 114], [242, 140]],
    [[184, 112], [200, 94], [216, 98], [222, 116], [196, 120]], [[170, 120], [180, 106], [190, 112], [186, 124]], [[226, 122], [232, 106], [248, 112], [246, 128]],
    [[188, 138], [194, 122], [214, 120], [218, 138]],
  ];
  // cada bloque de su clase de piedra, con su nieve y su musgo; los filos de luz se guardan para el relámpago
  const tonos = [0, 1, 2, 0, 3, 1, 2, 3], nieves = [3, 2, 4, 3, 5, 2, 3, 2], musgos = [0.9, 0.4, 0.7, 0.2, 0.3, 0.8, 0.5, 0.6];
  A_BORDE_RUINAS.length = 0;
  bloques.forEach((p, i) => a_roca(R, p, 10 + i, { tono: tonos[i], nieve: nieves[i], musgo: musgos[i], borde: A_BORDE_RUINAS }));
  // piedras sueltas de otros tamaños: lajas en lo alto, cantos rodados al pie del montón (fuera del lecho del hueco)
  for (const [p, k, tn] of [
    [[[200, 96], [206, 88], [214, 90], [212, 98]], 20, 2], [[[230, 106], [236, 100], [244, 103], [240, 108]], 21, 0], [[[166, 108], [170, 102], [178, 104], [176, 110]], 22, 3],
    [[[148, 162], [152, 154], [162, 153], [166, 162]], 23, 1], [[[164, 164], [168, 158], [176, 160], [176, 165]], 24, 2], [[[236, 164], [240, 156], [250, 157], [252, 164]], 25, 0],
    [[[256, 150], [258, 142], [268, 144], [270, 152]], 26, 3], [[[254, 166], [258, 161], [266, 162], [266, 167]], 27, 1],
  ]) a_roca(R, p, k, { tono: tn, nieve: 2, musgo: 0.6, borde: A_BORDE_RUINAS });
  // la grava y los cascotes menudos entre los bloques
  for (let k = 0; k < 30; k++) { const x = Math.round(150 + h(k, 1, 131) * 116), y = Math.round(140 + h(k, 2, 131) * 24); if (x > 176 && x < 234 && y < 160) continue;
    const c = A_PIEDRAS[k & 3]; R.pset(x, y, c[2]); R.pset(x + 1, y, c[3]); R.pset(x, y - 1, c[1]); if (k % 3 === 0) R.pset(x + 1, y - 1, AW.nieveM); }
  // el lecho del hueco: nieve blanda en la base del montón, con su sombra azul
  for (let y = 138; y <= 158; y++) for (let x = 180; x <= 230; x++) { const d = ((x - 205) / 25) ** 2 + ((y - 150) / 10) ** 2; if (d < 1) pset(x, y, d > 0.75 ? AW.nieveA : y < 145 ? AW.nieveB : a_rampa([AW.nieveB, AW.nieveM, AW.nieve], 2.4 - d * 1.5, x, y)); }
  for (let y = 154; y <= 162; y++) for (let x = 172; x <= 238; x++) { const d = ((x - 205) / 33) ** 2 + ((y - 158) / 4) ** 2; if (d < 1) pset(x, y, a_rampa([AW.nieveB, AW.nieveM, AW.nieve], 2.5 - d, x, y)); }
}
function a_ruinas(R, t, o) {
  const rec = (o.recuerdo ?? 0) >= 0.5, v = Math.max(0, Math.min(1, o.verde ?? 0)), lev = Math.max(0, Math.min(1, o.levanta ?? 0));
  R.copiar(a_capa(R, 'cieloRuinas', () => a_cieloTormenta(R, 176, 112)));
  // EL RELÁMPAGO: el cielo se aclara, el rayo cae lejos por encima de las nubes y por detrás de las montañas, y su luz
  // blanca y fría ilumina la nieve, los picos y el filo de las rocas
  const [f, kr] = a_rayoF(t, o);
  if (f > 0) for (let y = 16; y < 100; y++) for (let x = 0; x < 320; x++) if (!(x >= 276 && y < 46) && a_b4(x, y) < f * 0.4 * (1 - y / 120)) a_tinta(R, x, y, hex('#b8b0d8'), 0.35);
  a_nubes(R, t, 20, 74, f > 0.5 ? 1 : 0, rec ? 0.6 + 0.4 * Math.sin(t * 3) : 0);
  a_rayo(R, kr, f, 60, 235, 30, 92);
  a_pegar(R, a_capaT(R, 'ruinas', () => { a_ruinasFijo(R); a_bordesLimpios(A_BORDE_RUINAS, R.buf); }));
  if (f > 0) { const B = R.buf, cl = hex('#e8e4ff');
    for (let y = 40; y < 180; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < f * 0.38) { const i = y * 320 + x; B[i] = a_mezcla(B[i], cl, 0.3); }
    if (f > 0.3) for (const i of A_BORDE_RUINAS) B[i] = AW.blanco; }
  a_nieve(R, t, 1, 0);
  // los cuervos: tres cruzan el cielo, uno se posa en la columna alta y a ratos levanta el vuelo
  for (let k = 0; k < 3; k++) { const u = (t / (16 + k * 5) + k * 0.37) % 1, x = 340 - u * 380, y = 52 + k * 9 + Math.sin(t * 1.4 + k) * 4; a_cuervo(R, x, y, Math.sin(t * 9 + k * 2), -1); }
  { const c = (t % 9) / 9; if (c < 0.8) { const al = Math.sin(t * 2) > 0.9; R.rect(22, 58, 25, 60, AW.k); R.pset(26, 58, AW.k); R.pset(27, 58, hex('#4a4450')); R.pset(21, 59, AW.k); R.pset(23, 61, AW.k); R.pset(25, 61, AW.k); if (al) { R.pset(20, 57, AW.k); R.pset(27, 57, AW.k); } } else a_cuervo(R, 24 + (c - 0.8) * 200, 58 - (c - 0.8) * 100, Math.sin(t * 10), 1); }
  // la nieve que levanta el viento a ras de la meseta
  for (let k = 0; k < 30; k++) { const x = ((h(k, 1, 92) * 360 - t * 40) % 360 + 360) % 360 - 20, y = 150 + h(k, 2, 92) * 26 + Math.sin(t * 3 + k) * 2; for (let i = 0; i < 4; i++) if (a_b4(Math.round(x) + i, Math.round(y)) < 0.6) R.pset(Math.round(x) + i, Math.round(y), AW.nieve); }
  // la luz verde que sale entre las piedras del centro: las rendijas encendidas y el resplandor sobre la nieve
  if (v > 0.01) { const lat = 0.75 + 0.25 * Math.sin(t * 7) * Math.sin(t * 2.3);
    for (let y = 90; y < 180; y++) for (let x = 140; x < 276; x++) { const d = Math.hypot((x - 205) / 60, (y - 140) / 40); if (d < 1 && a_b4(x, y) < (1 - d) * v * 0.7 * lat) a_tinta(R, x, y, C.doomV, 0.4); }
    // las rendijas encendidas: puntos de luz en las juntas de los bloques del montón
    if (lev < 0.3) for (let k = 0; k < 22; k++) { const x = Math.round(176 + h(k, 1, 115) * 62), y = Math.round(108 + h(k, 2, 115) * 30), b = Math.sin(t * 5 + k * 1.3) * lat; if (b > -0.3) { R.pset(x, y, b > 0.7 ? hex('#d2ffe6') : C.doomV); R.pset(x, y + 1, C.doomVS); } } }
}
// las rocas que tapan el hueco (cada una: polígono relativo a su centro, centro, semilla); o.levanta las sube
const A_TAPA = [
  [[[-14, 6], [-10, -6], [6, -8], [12, 4], [2, 9]], [192, 148], 1], [[[-12, 5], [-6, -7], [10, -6], [13, 6]], [218, 150], 2],
  [[[-10, 4], [-4, -6], [9, -4], [8, 6]], [205, 140], 3], [[[-8, 4], [-6, -4], [6, -5], [8, 5]], [180, 156], 4], [[[-8, 5], [-5, -4], [7, -4], [9, 5]], [230, 157], 5],
  [[[-9, 5], [-6, -5], [7, -5], [9, 5]], [206, 152], 6],
];

function a_ruinasDelante(R, t, o) {
  const lev = Math.max(0, Math.min(1, o.levanta ?? 0)), v = Math.max(0, Math.min(1, o.verde ?? 0)), rec = (o.recuerdo ?? 0) >= 0.5, G = C.doomV, GS = C.doomVS, GL = hex('#d2ffe6');
  const fl = a_rayoF(t, o)[0];
  // los haces que salen por las rendijas de las rocas del hueco
  if (v > 0.01 && lev < 0.95) for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.28 + Math.sin(t * 0.7 + k) * 0.06, L = 40 + v * 90 * (0.6 + 0.4 * h(k, 1, 93));
    for (let s = 4; s < L; s++) { const x = Math.round(205 + Math.cos(a) * s), y = Math.round(146 + Math.sin(a) * s); if (y < 0) break; const ff = (1 - s / L) * v * (1 - lev); if (a_b4(x, y) < ff * 0.8) a_tinta(R, x, y, GL, 0.5); if (a_b4(x + 1, y) < ff * 0.5) a_tinta(R, x + 1, y, G, 0.5); } }
  // las rocas de la tapa: en su sitio, o subiendo y flotando envueltas en verde
  for (const [rel, [cx, cy], k] of A_TAPA) {
    const sube = lev * (72 + k * 8), bx = cx + (cx - 205) * lev * 0.5 + Math.sin(t * 1.3 + k) * 1.5 * lev, by = cy - sube + Math.sin(t * 1.9 + k * 2) * 2.5 * lev;
    const pts = rel.map(([x, y]) => [Math.round(bx + x), Math.round(by + y)]);
    if (lev > 0.02) { const lat = 0.8 + 0.2 * Math.sin(t * 5 + k); for (let y = Math.round(by - 16); y <= by + 16; y++) for (let x = Math.round(bx - 22); x <= bx + 22; x++) { const e = Math.hypot((x - bx) / 22, (y - by) / 16); if (e < 1 && a_b4(x, y) < (1 - e) * 1.3 * Math.min(1, lev * 3) * lat) a_tinta(R, x, y, e < 0.6 ? GL : G, 0.55); } for (let i = 0; i < 3; i++) { const u = (t * 1.5 + i / 3 + k * 0.2) % 1; R.pset(Math.round(bx + (h(k, i, 94) - 0.5) * 16), Math.round(by + 8 + u * 14), u < 0.5 ? AW.nieve : AW.piedraS); } }
    a_roca(R, pts, 30 + k, { tono: [1, 0, 2, 3, 0, 2][k - 1], nieve: lev > 0.2 ? 1 : 2, musgo: 0.5, flash: fl, verde: v * (1 - lev) * 0.8 });
    if (v > 0.01 && lev < 0.5) { R.linea(pts[0][0], pts[0][1] + 1, pts[pts.length - 1][0], pts[pts.length - 1][1] + 1, G); }
  }
  if (lev > 0.02) { const lat = 0.8 + 0.2 * Math.sin(t * 6); for (let y = 136; y < 162; y++) for (let x = 176; x < 236; x++) { const d = Math.hypot((x - 205) / 30, (y - 150) / 12); if (d < 1 && a_b4(x, y) < (1 - d) * lev * 0.45 * lat) a_tinta(R, x, y, G, 0.3); } }
  // EL RECUERDO (2022): las rocas que caen sobre el montón, el polvo que levantan y la onda roja que se apaga
  if (rec) {
    for (let k = 0; k < 6; k++) { const u = (t / 1.7 + k / 6) % 1, x = 160 + h(k, 1, 95) * 100, y = -20 + u * 150, s = 5 + h(k, 2, 95) * 6;
      if (u < 0.85) { for (let i = 1; i < 8; i++) a_tinta(R, Math.round(x), Math.round(y - i * 3), AW.nieveB, 0.4); a_bloque(R, [[x - s, y], [x - s * 0.5, y - s], [x + s, y - s * 0.7], [x + s * 0.8, y + s * 0.4]].map(([a, b]) => [Math.round(a), Math.round(b)]), 40 + k, 1); }
      else { const p = (u - 0.85) / 0.15; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI, r = 4 + p * 14; R.disco(x + Math.cos(a) * r * 1.4, 130 - Math.sin(a) * r * 0.6, 3 * (1 - p) + 1, (xx, yy) => (a_b4(xx, yy) < 0.6 * (1 - p) ? AW.nieveM : R.pget(xx, yy))); } } }
    for (let k = 0; k < 2; k++) { const u = ((t + k * 1.25) % 2.5) / 2.5, r = 8 + u * 130, ff = 1 - u;
      for (let a = 0; a < Math.PI * 2; a += 0.5 / r) { const x = Math.round(205 + Math.cos(a) * r), y = Math.round(140 + Math.sin(a) * r * 0.5); if (y < 0 || y > 179 || x < 0 || x > 319) continue;
        if (ff > 0.25) { R.pset(x, y, ff > 0.6 ? AW.rojoL : AW.rojo); R.pset(x, y + 1, AW.rojo); } for (let j = 2; j < 7; j++) if (a_b4(x, y + j) < ff * (1 - j / 7)) a_tinta(R, x, y + j, AW.rojo, 0.45); } }
    { const f = 0.5 + 0.5 * Math.sin(t * 2.5); R.halo(205, 140, 16 + 8 * f, [AW.rojoS, AW.rojo, AW.rojoL], 0.9); }
  }
  // los cascotes nevados del primer término (abajo a la izquierda y a la derecha) y la nieve de delante
  a_roca(R, [[0, 168], [10, 158], [26, 160], [34, 172], [30, 180], [0, 180]], 50, { tono: 1, nieve: 3, musgo: 0.8, flash: fl });
  a_roca(R, [[24, 178], [30, 170], [44, 172], [46, 180]], 51, { tono: 2, nieve: 2, musgo: 0.4, flash: fl });
  a_roca(R, [[284, 180], [288, 164], [300, 156], [316, 158], [320, 166], [320, 180]], 52, { tono: 3, nieve: 3, musgo: 0.9, flash: fl });
  a_nieve(R, t, 1, 1);
}
// 'cara': DENTRO DEL HUECO, de cerca: la cueva de rocas, la abertura del cielo arriba, el lecho de nieve
function a_caraFijo(R) {
  const { pset } = R;
  // el fondo de la cueva: roca oscura que se aleja, con brillos de hielo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 2, 96), m = h(x >> 4, y >> 3, 97), d = Math.hypot((x - 160) / 160, (y - 110) / 110);
    // los estratos de la roca del fondo: bandas onduladas con su canto de luz arriba y su sombra abajo, y bloques lejanos
    const e = Math.sin(y * 0.42 + Math.sin(x * 0.045) * 2.6 + Math.sin(x * 0.013) * 4), est = e > 0.85 ? 0.5 : e < -0.9 ? -0.6 : 0;
    const blq = Math.sin(x * 0.11 + Math.floor(y / 9) * 1.7) > 0.93 ? -0.8 : 0;
    pset(x, y, a_rampa([AW.k, AW.piedraD, AW.piedraS, AW.piedra, AW.piedraL], 2.2 - d * 1.8 + (m - 0.5) * 0.9 + (n > 0.92 ? -0.8 : 0) + est + blq, x, y)); }
  // EL LECHO DE NIEVE (x 90–230 × 98–146): borde irregular que se hunde en las rocas, la sombra azul de la roca de
  // arriba sobre su mitad alta, las ondas que deja el viento (crestas con luz y valles en sombra), granos de hielo que
  // brillan, piedrecillas con su gorro de nieve, briznas secas en el borde y la huella blanda donde reposa la cabeza
  for (let y = 96; y <= 148; y++) for (let x = 86; x <= 234; x++) { const a = Math.atan2((y - 124) / 22, (x - 160) / 70), irr = (h(Math.round(a * 9 + 40), 1, 132) - 0.5) * 0.22 + Math.sin(a * 5) * 0.05;
    const d = ((x - 160) / 70) ** 2 + ((y - 124) / 22) ** 2; if (d >= 1 + irr) continue;
    const ola = Math.sin(x * 0.16 + Math.sin(y * 0.35 + x * 0.02) * 2.2), cresta = ola > 0.82, valle = ola < -0.7;
    const sombra = y < 116 ? (116 - y) / 18 : 0, hund = Math.max(0, 1 - (((x - 168) / 40) ** 2 + ((y - 124) / 12) ** 2)) * 0.5;
    let v = 3.5 - d * 1.9 - sombra * 1.6 - hund + (cresta ? 0.9 : valle ? -0.8 : ola * 0.25) + (h(x >> 1, y, 133) - 0.5) * 0.5;
    if (d > 0.82 + irr) v -= 1.2;
    let c = a_rampa([AW.nieveD, AW.nieveA, AW.nieveB, AW.nieveM, AW.nieve], v, x, y);
    if (h(x, y, 134) > 0.985 && sombra < 0.5) c = AW.blanco;
    pset(x, y, c); }
  // piedrecillas y esquirlas sobre la nieve, con su sombra y su pizca de nieve encima
  for (const [x, y, r, k] of [[102, 128, 2, 0], [112, 138, 1, 1], [214, 136, 2, 2], [222, 120, 1, 3], [126, 110, 1, 0], [198, 140, 1, 1], [140, 142, 2, 2], [206, 108, 1, 3]]) {
    const c = A_PIEDRAS[k]; R.disco(x + 1, y + 1, r, AW.nieveA); R.disco(x, y, r, c[2]); pset(x - 1, y - 1, c[1]); pset(x, y - r, AW.nieve); pset(x + r, y, c[3]); }
  // briznas secas que asoman por el borde
  for (const [x, y, k] of [[94, 122, 0], [100, 134, 1], [226, 128, 2], [218, 140, 3], [108, 106, 4]]) for (let i = 0; i < 4; i++) R.linea(x + i, y, x + i + (i % 2 ? 1 : -1), y - 3 - ((i + k) % 3), hex('#8a7a5a'));
  // las rocas de alrededor: arriba (dejan una abertura al cielo), a los lados, con nieve en los cantos y carámbanos
  const rocas = [
    [[0, 0], [118, 0], [112, 22], [92, 40], [60, 48], [20, 44], [0, 52]], [[208, 0], [320, 0], [320, 56], [290, 50], [254, 44], [224, 30]],
    [[0, 52], [22, 44], [60, 50], [84, 72], [88, 112], [70, 140], [30, 150], [0, 150]], [[320, 56], [290, 52], [256, 48], [234, 72], [232, 108], [252, 140], [290, 150], [320, 150]],
    [[92, 40], [112, 24], [124, 34], [118, 52], [98, 56]], [[224, 32], [206, 18], [196, 36], [204, 52], [222, 50]],
  ];
  // la abertura del cielo queda transparente: por ahí se ven las nubes que corren
  for (let y = 0; y <= 36; y++) for (let x = 104; x <= 220; x++) if (a_hueco(x, y)) pset(x, y, A_VACIO);
  A_BORDE_CARA.length = 0;
  rocas.forEach((p, i) => a_roca(R, p, 60 + i, { tono: [1, 3, 0, 2, 3, 1][i], nieve: i < 2 ? 0 : [3, 4, 2, 2][i - 2], musgo: [0.3, 0.6, 0.9, 0.7, 0.4, 0.5][i], borde: A_BORDE_CARA }));
  // piedras de otros tamaños: en las repisas de las rocas grandes y junto al lecho (fuera de donde reposa Wanda)
  for (const [p, k, tn] of [
    [[[24, 46], [30, 38], [42, 40], [44, 47]], 66, 2], [[[262, 50], [268, 41], [282, 43], [284, 51]], 67, 0],
    [[[84, 142], [88, 132], [102, 134], [106, 146], [92, 148]], 68, 3], [[[214, 146], [218, 136], [230, 134], [236, 144]], 69, 1],
    [[[70, 106], [74, 98], [84, 100], [86, 108]], 70, 0], [[[236, 100], [240, 92], [250, 93], [252, 102]], 71, 2],
    [[[104, 150], [107, 144], [114, 145], [116, 151]], 72, 1], [[[208, 152], [211, 147], [218, 148], [219, 153]], 73, 3],
  ]) a_roca(R, p, k, { tono: tn, nieve: 2, musgo: 0.4, borde: A_BORDE_CARA });
  // la esquina de Atom, oscura y lisa (sin cantos claros)
  for (let y = 0; y < 50; y++) for (let x = 270; x < 320; x++) pset(x, y, a_rampa([AW.k, AW.piedraD, AW.piedraS], 1.2 - y / 80 + (h(x >> 3, y >> 3, 98) - 0.5) * 0.3, x, y));
  for (const [x, y, l] of [[60, 48, 6], [74, 54, 4], [96, 56, 5], [206, 52, 6], [262, 48, 4], [244, 50, 7]]) for (let i = 0; i < l; i++) { pset(x, y + i, i < l - 2 ? AW.nieveB : AW.nieve); if (i < l / 2) pset(x + 1, y + i, AW.nieveA); }
}
function a_cara(R, t, o) {
  // el trozo de cielo de la abertura (detrás) y, encima, la cueva con la abertura transparente
  const [fl, kr] = a_rayoF(t, o);
  a_caraCielo(R, t, fl, kr);
  a_pegar(R, a_capaT(R, 'cara', () => { a_caraFijo(R); a_bordesLimpios(A_BORDE_CARA, R.buf); }));
  // el relámpago entra por la abertura: la cueva se aclara desde arriba y los filos de las rocas se encienden
  if (fl > 0) { const B = R.buf, cl = hex('#d8d4f4');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const e = Math.hypot((x - 162) / 200, (y - 10) / 170); if (!(x >= 270 && y < 50) && a_b4(x, y) < fl * 0.5 * (1 - e)) { const i = y * 320 + x; B[i] = a_mezcla(B[i], cl, 0.3); } }
    if (fl > 0.3) for (const i of A_BORDE_CARA) B[i] = AW.blanco; }
  // los granos de hielo del lecho que brillan a ratos
  for (let k = 0; k < 9; k++) { const x = Math.round(98 + h(k, 1, 135) * 124), y = Math.round(112 + h(k, 2, 135) * 30), b = Math.sin(t * (1.7 + h(k, 3, 135)) + k * 2.1);
    if (b > 0.85 && ((x - 160) / 70) ** 2 + ((y - 124) / 22) ** 2 < 0.8) { R.pset(x, y, AW.blanco); R.pset(x - 1, y, AW.nieveM); R.pset(x + 1, y, AW.nieveM); R.pset(x, y - 1, AW.nieveM); R.pset(x, y + 1, AW.nieveM); } }
  const ref = Math.max(0, Math.min(1, o.reflejo ?? 0)), lat = 0.85 + 0.15 * Math.sin(t * 2.4);
  // el haz de luz verde que baja desde la abertura hasta el lecho, con motas que flotan dentro
  for (let y = 30; y < 150; y++) { const xc = 162 + (y - 30) * -0.05, w = 18 + (y - 30) * 0.35; for (let x = Math.round(xc - w); x <= xc + w; x++) { const f = (1 - Math.abs(x - xc) / w) * (0.35 + 0.65 * ref) * lat * (y < 100 ? 1 : 1 - (y - 100) / 60); if (a_b4(x, y) < f * 0.55) a_tinta(R, x, y, C.doomV, 0.32 + 0.2 * ref); } }
  for (let k = 0; k < 14; k++) { const u = (t * 0.3 + h(k, 1, 100)) % 1, x = Math.round(130 + h(k, 2, 100) * 66 - u * 14), y = Math.round(10 + u * 110); R.pset(x, y, AW.nieve); }
  for (let k = 0; k < 18; k++) { const u = (t * 0.12 + h(k, 1, 99)) % 1, x = Math.round(150 + h(k, 2, 99) * 26 + Math.sin(t + k) * 4), y = Math.round(36 + u * 100); if (Math.sin(t * 3 + k) > -0.2) R.pset(x, y, u < 0.5 ? hex('#d2ffe6') : AW.nieve); }
  if (ref > 0.01) { R.halo(160, 118, 18 + ref * 22, [C.doomVS, C.doomV, hex('#a8f8c8')], 0.9 * ref + 0.3); }
  // los destellos del hielo en las rocas
  for (const [x, y, k] of [[40, 70, 0], [270, 90, 1], [96, 44, 2], [230, 120, 3], [60, 120, 4]]) { const b = Math.sin(t * 2.2 + k * 1.7); if (b > 0.7) { R.pset(x, y, AW.blanco); R.pset(x - 1, y, AW.nieveM); R.pset(x + 1, y, AW.nieveM); R.pset(x, y - 1, AW.nieveM); R.pset(x, y + 1, AW.nieveM); } }
}
// el trozo de cielo que se ve por la abertura de arriba: nubes de tormenta que corren y la nieve que cae dentro
function a_caraCielo(R, t, fl = 0, kr = 0) {
  const V = [104, 0, 220, 40];
  for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) {
    const n = Math.sin((x + t * 8) * 0.08 + Math.sin(y * 0.3 + t * 0.5) * 1.5) + Math.sin((x + t * 15) * 0.15 + y * 0.2) * 0.6;
    R.pset(x, y, a_rampa([AW.c2, AW.c3, AW.c4, AW.c5, AW.nubeF, AW.nieveL], 2 + n * 1.2 - y / 30 + fl * 2.2, x, y)); }
  // el rayo, que cruza la abertura de arriba abajo (la cueva lo recorta)
  a_rayo(R, kr, fl, 178, 200, 0, 40);
}
// ¿está (x, y) en la abertura del cielo de la cámara 'cara'? (entre las rocas de arriba)
function a_hueco(x, y) {
  if (y > 36) return false; const izq = 118 - y * 0.2 + (y > 20 ? (y - 20) * -0.4 : 0), der = 208 + y * 0.6 - (y > 18 ? (y - 18) * 0.9 : 0);
  return x > izq + 2 && x < der - 2 && y < 34 - Math.abs(x - 162) * 0.12;
}

// las rocas de abajo y las puntas de los lados (delante de Wanda), la nieve que entra y el fundido a negro
function a_caraDelante(R, t, o) {
  const fl = a_rayoF(t, o)[0];
  a_roca(R, [[0, 150], [40, 146], [84, 154], [110, 170], [104, 180], [0, 180]], 70, { tono: 2, nieve: 3, musgo: 0.8, flash: fl * 0.6 });
  a_roca(R, [[96, 180], [120, 160], [160, 156], [200, 162], [214, 180]], 71, { tono: 1, nieve: 2, musgo: 0.5, flash: fl * 0.6 });
  a_roca(R, [[204, 180], [214, 160], [250, 150], [290, 148], [320, 152], [320, 180]], 72, { tono: 3, nieve: 3, musgo: 0.9, flash: fl * 0.6 });
  for (let k = 0; k < 20; k++) { const u = (t * 0.25 + h(k, 1, 101)) % 1, x = Math.round(120 + h(k, 2, 101) * 90 - u * 20 + Math.sin(t * 2 + k) * 3), y = Math.round(u * 160); R.pset(x, y, AW.blanco); if (k % 3 === 0) R.pset(x + 1, y, AW.nieveM); }
  const n = Math.max(0, Math.min(1, o.negro ?? 0));
  if (n > 0) { const B = R.buf, c = hex('#000000'); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (n >= 1) B[i] = c; else if (a_b4(x, y) < n * 1.15) B[i] = a_mezcla(B[i], c, 0.5 + 0.5 * n); } }
}
// un abeto nevado (x: el tronco, yb: el pie, alto): pisos de ramas en triángulo con nieve encima, luz a la izquierda
function a_abeto(R, x, yb, alto, k = 0) {
  const pisos = Math.max(2, Math.round(alto / 6));
  R.rect(x, yb - 2, x, yb, hex('#3a2a22'));
  for (let p = 0; p < pisos; p++) { const yt = yb - 2 - alto + p * (alto / pisos) * 0.9, yf = yt + alto / pisos * 1.5, w = 1.5 + (p + 1) * alto * 0.36 / pisos;
    for (let y = Math.round(yt); y <= yf; y++) { const ww = w * (y - yt) / (yf - yt); for (let i = -Math.round(ww); i <= ww; i++) R.pset(x + i, y, y - yt < 1.6 ? AW.nieve : i < -ww * 0.3 ? AW.abetoL : i > ww * 0.4 ? AW.abetoS : AW.abeto); }
    if (h(k, p, 102) < 0.6) R.pset(x + Math.round((h(k, p, 103) - 0.5) * w), Math.round(yf) - 1, AW.nieveM); }
}

// una casita del pueblo (x0: la izquierda, yb: el pie): muro de piedra encalado, tejado de dos aguas con la nieve, la
// chimenea y una ventana (que se enciende cada fotograma)
function a_casa(R, x0, yb, w, alto, k) {
  const { rect, poligono, pset } = R, x1 = x0 + w, ya = yb - alto;
  rect(x0, ya, x1, yb, AW.muroCS); rect(x0 + 1, ya + 1, x1 - 1, yb, AW.muroC); rect(x1 - 2, ya + 1, x1 - 1, yb, AW.muroCS);
  for (let i = 0; i < 4; i++) pset(x0 + 2 + Math.floor(h(k, i, 104) * (w - 4)), ya + 2 + Math.floor(h(k, i, 105) * (alto - 3)), AW.muroCS);
  poligono([[x0 - 2, ya + 1], [x0 + w / 2, ya - w * 0.45], [x1 + 2, ya + 1]], AW.k);
  poligono([[x0 - 1, ya], [x0 + w / 2, ya - w * 0.45 + 1], [x1 + 1, ya]], (x, y) => (x < x0 + w / 2 ? AW.tejado : AW.nieveB));
  rect(x0 - 2, ya, x1 + 2, ya + 1, AW.nieveM);
  const cx = x0 + Math.round(w * 0.72); rect(cx, ya - Math.round(w * 0.35), cx + 2, ya - 1, AW.muroCS); rect(cx, ya - Math.round(w * 0.35), cx + 2, ya - Math.round(w * 0.35), AW.nieve);
  rect(x0 + Math.round(w * 0.25), yb - 4, x0 + Math.round(w * 0.25) + 2, yb, hex('#4a3426'));
}

const A_CASAS = [[150, 158, 14, 9, 0], [170, 162, 12, 8, 1], [188, 156, 16, 10, 2], [212, 160, 13, 8, 3], [232, 154, 15, 9, 4], [254, 161, 12, 8, 5], [272, 157, 16, 10, 6], [292, 163, 12, 7, 7]];

// LA CUMBRE desde lejos: lo fijo (la montaña, el templo en lo alto, la bruma, el bosque, el pueblo y la cornisa)
function a_cumbreFijo(R) {
  const { rect, pset, linea, poligono } = R;
  a_cordillera(R, [[20, 92, 0.55], [80, 84, 0.6], [128, 98, 0.6], [318, 96, 0.5]], 130, [AW.lejosL, AW.lejos, AW.lejosS, AW.nieveL, AW.nieveS], 3, 14);
  for (let y = 96; y < 130; y++) for (let x = 0; x < 320; x++) { const f = 1 - Math.abs(y - 112) / 18; if (f > 0 && a_b4(x, y) < f * 0.45) a_tinta(R, x, y, AW.c7, 0.5); }
  a_cordillera(R, [[200, 48, 0.72], [150, 80, 0.62], [262, 76, 0.66], [110, 104, 0.6]], 150, [AW.cercaL, AW.cerca, AW.cercaS, AW.nieveL, AW.nieveS], 4, 34);
  // las aristas y los neveros: líneas de cresta que bajan de la cumbre
  for (const [ax, ay, bx, by] of [[200, 48, 168, 96], [200, 48, 236, 100], [168, 96, 150, 124], [236, 100, 262, 130]]) { linea(ax, ay, bx, by, AW.cercaS); linea(ax - 1, ay + 1, bx - 1, by + 1, AW.nieveL); }
  // el templo derrumbado en lo alto: tocones de columna, un dintel caído y piedras, con nieve
  for (const [x, yt] of [[191, 40], [197, 37], [207, 41], [212, 43]]) { rect(x, yt, x + 2, 49, AW.piedraD); rect(x, yt, x, 49, AW.piedraL); pset(x, yt, AW.nieve); pset(x + 1, yt, AW.nieve); }
  linea(186, 47, 199, 44, AW.piedraD); linea(186, 46, 199, 43, AW.piedraL); rect(201, 46, 205, 48, AW.piedraS); pset(202, 45, AW.nieve);
  // la bruma del valle
  for (let y = 116; y < 140; y++) for (let x = 0; x < 320; x++) { const f = 1 - Math.abs(y - 128) / 12; if (f > 0 && a_b4(x, y) < f * 0.4 * (0.5 + 0.5 * Math.sin(x * 0.03 + 1))) a_tinta(R, x, y, AW.c7, 0.45); }
  // el valle nevado
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 134 + Math.round(Math.sin(x * 0.03) * 3); if (y < top) continue; pset(x, y, a_rampa([AW.nieveA, AW.nieveB, AW.nieveM, AW.nieve], 2.2 + Math.sin(x * 0.09 + y * 0.4) * 0.5 + (y - 132) / 60, x, y)); }
  // el bosque de abetos en las laderas, más pequeños cuanto más lejos
  for (let k = 0; k < 120; k++) { const f = h(k, 1, 106), x = Math.round(h(k, 2, 106) * 330) - 5, y = Math.round(118 + f * 44); if (x > 144 && x < 304 && y > 140) continue; a_abeto(R, x, y, 5 + f * 9, k); }
  // el camino que sube del pueblo y el puente de madera sobre el arroyo helado
  for (let i = 0; i < 160; i++) { const x = Math.round(140 + i * 0.9 + Math.sin(i * 0.08) * 8), y = Math.round(168 - i * 0.12 + Math.sin(i * 0.05) * 2); pset(x, y, AW.nieveB); pset(x + 1, y, AW.nieveA); }
  for (let x = 0; x < 320; x++) { const y = 150 + Math.round(Math.sin(x * 0.04 + 2) * 3); if (x > 20 && x < 150) { pset(x, y, hex('#7a8cb0')); pset(x, y + 1, hex('#a8bcd8')); } }
  rect(96, 147, 110, 148, hex('#5a4030')); for (const x of [97, 109]) rect(x, 145, x, 150, hex('#3a2a20')); rect(96, 145, 110, 145, AW.nieve);
  // el pueblo: casas, el campanario y las cercas
  for (const [x, yb, w, al, k] of A_CASAS) a_casa(R, x, yb, w, al, k);
  rect(242, 128, 250, 154, AW.muroCS); rect(243, 129, 249, 154, AW.muroC); rect(249, 129, 249, 154, AW.muroCS); poligono([[240, 129], [246, 118], [252, 129]], AW.k); poligono([[241, 128], [246, 120], [251, 128]], (x) => (x < 246 ? AW.tejado : AW.nieveB));
  rect(245, 133, 247, 137, AW.k); pset(246, 134, hex('#c8a040'));
  for (let x = 150; x < 300; x += 3) { if (h(x, 1, 107) < 0.3) continue; rect(x, 165 + Math.round(Math.sin(x * 0.1)), x, 167 + Math.round(Math.sin(x * 0.1)), hex('#5a4030')); }
  // la cornisa de nieve del primer término: rocas, la barandilla de madera, el tocón y el poste con su flecha sin letras
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 166 + Math.round(Math.sin(x * 0.05) * 2 + h(x >> 3, 2, 108) * 3); if (y < top) continue; pset(x, y, y === top ? AW.nieve : a_rampa([AW.nieveB, AW.nieveM, AW.nieve], 2.4 + Math.sin(x * 0.2 + y) * 0.4 - (y - 166) / 30, x, y)); }
  for (let x = 4; x < 150; x += 16) { rect(x, 152, x + 1, 168, hex('#4a3426')); rect(x, 152, x + 1, 152, AW.nieve); }
  rect(4, 155, 150, 156, hex('#6a4a30')); rect(4, 155, 150, 155, AW.nieve); rect(4, 161, 150, 161, hex('#5a4030'));
  rect(140, 140, 142, 168, hex('#4a3426')); poligono([[132, 142], [150, 142], [154, 145], [150, 148], [132, 148]], hex('#7a5a3a')); rect(132, 142, 150, 142, AW.nieve); a_picto(R, ['#....', '##...', '#####', '##...', '#....'], 138, 143, hex('#3a2a20'));
  a_bloque(R, [[284, 180], [292, 162], [312, 158], [320, 166], [320, 180]], 109, 3);
  a_abeto(R, 6, 170, 30, 99); a_abeto(R, 302, 166, 22, 98);
}

function a_cumbre(R, t, o) {
  const v = Math.max(0, Math.min(1, o.verde ?? 0));
  R.copiar(a_capa(R, 'cieloCumbre', () => a_cieloTormenta(R, 200, 130)));
  const f = a_relampago(R, t, 60, 300, 100);
  a_nubes(R, t, 14, 70, f);
  // el punto verde que late en la cumbre (y su reflejo en las nubes) va por detrás de la montaña solo en el haz
  if (v > 0.01) { const lat = 0.6 + 0.4 * Math.sin(t * 4.2); for (let y = 0; y < 48; y++) { const w = 2 + (48 - y) * 0.08; for (let x = Math.round(200 - w); x <= 200 + w; x++) if (a_b4(x, y) < v * lat * 0.5 * (y / 48)) a_tinta(R, x, y, C.doomV, 0.4); } }
  a_pegar(R, a_capaT(R, 'cumbre', () => a_cumbreFijo(R)));
  a_nieve(R, t, 0.8, 0);
  // las ventanas del pueblo que se encienden y se apagan, el humo de las chimeneas y la gente que pasa por el camino
  for (const [x, yb, w, al, k] of A_CASAS) { const on = h(k, Math.floor((t + k * 1.3) / 5), 110) < 0.75, wx = x + Math.round(w * 0.6), wy = yb - al + 3; R.rect(wx, wy, wx + 2, wy + 2, on ? AW.ventana : AW.muroCS); if (on) R.pset(wx, wy + 2, AW.ventanaS);
    a_vapor(R, x + Math.round(w * 0.72) + 1, yb - al - Math.round(w * 0.35) - 1, t * 0.6, k, k % 2 ? hex('#a8a4b8') : hex('#c4c0d0'), 14, 1); }
  for (let k = 0; k < 3; k++) { const u = (t / (22 + k * 6) + k * 0.33) % 1, i = u * 160, x = Math.round(140 + i * 0.9 + Math.sin(i * 0.08) * 8), y = Math.round(168 - i * 0.12 + Math.sin(i * 0.05) * 2), p = Math.floor(t * 4 + k) % 2;
    R.rect(x, y - 5, x + 1, y - 2, [hex('#a83a3a'), hex('#3a5a8a'), hex('#5a4a3a')][k]); R.pset(x, y - 6, hex('#f0c8a0')); R.pset(x + p, y - 1, AW.k); R.pset(x + 1 - p, y - 1, AW.k); }
  for (let k = 0; k < 3; k++) { const u = (t / (18 + k * 4) + k * 0.41) % 1; a_cuervo(R, -20 + u * 360, 84 + k * 7 + Math.sin(t + k) * 3, Math.sin(t * 9 + k), 1); }
  if (f > 0) for (let y = 30; y < 130; y += 2) for (let x = 0; x < 320; x++) if (a_b4(x, y >> 1) < 0.1 * f) a_tinta(R, x, y, hex('#e8e0ff'), 0.25);
  // el punto de luz verde en la cumbre
  if (v > 0.01) { const lat = 0.6 + 0.4 * Math.sin(t * 4.2); R.halo(200, 45, 6 + 10 * v * lat, [C.doomVS, C.doomV, hex('#d2ffe6')], 1.1); R.disco(200, 45, 1.5 + v, hex('#d2ffe6')); R.pset(200, 45, AW.blanco); }
}

// LA TELE DE ATOM: la habitación en penumbra, el televisor sobre el mueble, y la cumbre (o.canal 'ruinas': las ruinas)
// en la pantalla, con líneas de barrido, el reflejo de la ventana y su luz que cae sobre el mueble y la pared
function a_teleFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 200, (y - 80) / 130), raya = (x % 12) < 6, n = h(x >> 1, y >> 1, 111);
    pset(x, y, a_rampa([hex('#0e0c16'), hex('#1a1626'), hex('#241e34'), hex('#2e2840')], 2.4 - d * 2 + (raya ? 0.25 : -0.1) + (n > 0.93 ? -0.6 : 0), x, y)); }
  for (let y = 10; y < 140; y += 10) for (let x = (y / 10) % 2 ? 3 : 9; x < 320; x += 12) if (Math.hypot(x - 160, y - 80) < 150) pset(x, y, hex('#3a3250'));
  rect(0, 130, 319, 133, hex('#1e1828')); rect(0, 130, 319, 130, hex('#3a3048'));
  // el cuadro de la izquierda (un paisaje), la lámpara de pie de la derecha con su luz cálida muy baja
  rect(14, 44, 58, 80, hex('#3a2a1a')); rect(16, 46, 56, 78, hex('#2a3248')); poligono([[16, 70], [30, 58], [44, 66], [56, 56], [56, 78], [16, 78]], hex('#24302a')); disco(46, 54, 3, hex('#8a7a5a'));
  rect(296, 70, 298, 140, hex('#2a2430')); poligono([[286, 70], [308, 70], [302, 56], [292, 56]], hex('#6a4a30')); poligono([[288, 69], [306, 69], [301, 58], [293, 58]], hex('#a87a48'));
  R.halo(297, 76, 24, [hex('#2e2430'), hex('#3a2e34'), hex('#4a3a38')], 1.0);
  // el televisor: el marco negro con su brillo en el canto, la peana y el piloto
  rect(72, 22, 248, 138, hex('#08080c')); rect(74, 24, 246, 136, hex('#16161c')); rect(74, 24, 246, 24, hex('#3a3a46')); rect(74, 24, 74, 136, hex('#2a2a34'));
  rect(150, 137, 170, 141, hex('#16161c')); rect(140, 141, 180, 143, hex('#0c0c10')); rect(140, 141, 180, 141, hex('#3a3a46'));
  // el mueble: tablero de madera, puertas con tiradores, el hueco con la consola, los cómics, la planta y las figuritas
  rect(28, 142, 292, 180, hex('#2a1a12')); rect(30, 143, 290, 180, hex('#5a3a24')); rect(30, 143, 290, 144, hex('#8a6038'));
  for (let y = 146; y < 180; y++) for (let x = 31; x < 290; x++) if (h(x >> 2, y, 112) > 0.8) pset(x, y, hex('#4a2e1c'));
  for (const [x0, x1] of [[34, 108], [212, 286]]) { rect(x0, 148, x1, 178, hex('#2a1a12')); rect(x0 + 1, 149, x1 - 1, 178, hex('#4e3220')); rect(x0 + 1, 149, x1 - 1, 149, hex('#7a5232')); rect((x0 + x1) / 2, 149, (x0 + x1) / 2, 178, hex('#2a1a12')); for (const x of [(x0 + x1) / 2 - 4, (x0 + x1) / 2 + 3]) rect(x, 160, x + 1, 165, hex('#c8a060')); }
  rect(112, 148, 208, 178, hex('#140c08')); rect(124, 160, 196, 168, hex('#0e0e12')); rect(124, 160, 196, 160, hex('#3a3a46')); rect(112, 168, 208, 169, hex('#5a3a24'));
  for (let i = 0; i < 9; i++) { const c = [hex('#a83a3a'), hex('#3a6aa8'), hex('#d8b040'), hex('#4a8a4a'), hex('#8a3ab0'), hex('#e0e0d0')][i % 6]; rect(116 + i * 4, 171, 118 + i * 4, 178, c); rect(116 + i * 4, 171, 118 + i * 4, 171, a_mezcla(c, AW.blanco, 0.4)); }
  rect(40, 128, 54, 142, hex('#6a3a2a')); rect(40, 128, 54, 129, hex('#9a5a3a')); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32; linea(47, 128, Math.round(47 + Math.cos(a) * 12), Math.round(128 + Math.sin(a) * 14), k % 2 ? hex('#2e5a3a') : hex('#4a7a4a')); }
  for (const [x, c] of [[256, hex('#c83a3a')], [266, hex('#3a5ac8')], [276, hex('#2a6a3a')]]) { rect(x, 132, x + 5, 142, AW.k); rect(x + 1, 133, x + 4, 141, c); disco(x + 2.5, 130, 3, AW.k); disco(x + 2.5, 130, 2, c); rect(x, 141, x + 5, 142, hex('#2a2a30')); }
  rect(198, 139, 214, 142, hex('#0c0c10')); for (let x = 200; x < 212; x += 3) pset(x, 140, hex('#5a5a66')); pset(212, 140, hex('#c83a3a'));
  rect(70, 136, 92, 142, hex('#0c0c10')); for (let i = 0; i < 4; i++) rect(72 + i * 5, 136, 75 + i * 5, 141, [hex('#a83a3a'), hex('#d8b040'), hex('#3a6aa8'), hex('#4a8a4a')][i]);
}

function a_tele(R, t, o) {
  // la imagen de la pantalla se dibuja entera en un búfer aparte y se reduce al hueco del televisor
  let m = a_capas.get(R); if (!m) { m = new Map(); a_capas.set(R, m); }
  let scr = m.get('~tele'); if (!scr) { scr = R.nuevo(); m.set('~tele', scr); }
  const prev = R.usar(scr);
  if (o.canal === 'ruinas') { a_ruinas(R, t, o); a_ruinasDelante(R, t, o); } else a_cumbre(R, t, o);
  R.usar(prev);
  R.copiar(a_capa(R, 'tele', () => a_teleFijo(R)));
  const B = R.buf, P = [80, 30, 240, 130];
  let sr = 0, sg = 0, sb = 0;
  for (let y = P[1]; y <= P[3]; y++) { const sy = Math.min(179, Math.round((y - P[1]) * 1.8)), barr = (y & 1) === 0;
    for (let x = P[0]; x <= P[2]; x++) { let c = scr[sy * 320 + Math.min(319, (x - P[0]) * 2)]; if (barr) c = a_mezcla(c, AW.k, 0.2); B[y * 320 + x] = c; if (((x + y) & 31) === 0) { sr += c & 255; sg += (c >>> 8) & 255; sb += (c >>> 16) & 255; } } }
  // el reflejo de la ventana en el cristal (dos franjas en diagonal) y el piloto
  for (let y = P[1]; y <= P[3]; y++) for (let x = P[0]; x <= P[2]; x++) { const d = (x - P[0]) + (y - P[1]) * 0.8; if (((d > 118 && d < 132) || (d > 138 && d < 142)) && a_b4(x, y) < 0.3) a_tinta(R, x, y, AW.blanco, 0.2); }
  R.pset(240, 134, Math.sin(t * 1.5) > 0 ? hex('#3ae84a') : hex('#1a6a2a'));
  // la luz de la pantalla sobre la pared, el tablero del mueble y lo que hay encima
  const n = Math.max(1, Math.round(16000 / 32)), luz = (0xff000000 | (Math.min(255, sb / n + 30) << 16) | (Math.min(255, sg / n + 20) << 8) | Math.min(255, sr / n + 30)) >>> 0, lat = 0.85 + 0.15 * Math.sin(t * 7.3) * Math.sin(t * 2.1);
  for (let y = 4; y < 180; y++) for (let x = 20; x < 300; x++) { if (x >= 72 && x <= 248 && y >= 22 && y <= 141) continue; const d = Math.hypot((x - 160) / 150, (y - 80) / 100); if (d < 1 && a_b4(x, y) < (1 - d) * 0.5 * lat) a_tinta(R, x, y, luz, 0.3); }
}

// o.encuadre (y o.camara). LLAMA A batallaDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
// LA CIUDAD ES UNA SOLA IMAGEN (b_ciudad, en coordenadas de «mundo» de x −150 a 470): el campo la ve entera, los once
// marcos la ven a través de sus huecos (1:1, la misma ciudad) y cada póster de cerca ve el trozo de su marco.
//   'campo' (general): UNA CIUDAD EN RUINAS al atardecer, con el sol bajo justo detrás del montón de cascotes del centro:
//     cielo tramado de violeta a naranja con bandas de nubes de tres tonos a tres velocidades (bordes de abajo
//     encendidos), cuervos, dos capas de rascacielos lejanos en la bruma; TRES CENTINELAS gigantes (morados y magenta,
//     casco liso y una ranura de luz por ojos, sin cara humana) a contraluz, con el filo encendido por el sol: el de la
//     izquierda (x 52) LEVANTA EL BRAZO con la palma que brilla, el del centro barre el cielo con un haz que sale de su
//     ranura, el tercero asoma entre el humo; edificios rotos con ventanas vacías, pisos al aire, vigas, fuego en algunas
//     ventanas que parpadea; un CUARTO CENTINELA lejos, desteñido en la columna de humo del medio (x 112), con la ranura que
//     late; fogonazos de la batalla a lo lejos entre los rascacielos y un avión alto con sus luces y su estela; el
//     asfalto en perspectiva con el reflejo del sol, carriles, grietas, charcos, marcas de frenazo y papeles; una boca de
//     riego reventada (x 300, y 150) que echa un chorro de gotas a su charco; coches
//     volcados, farolas dobladas (una parpadea), cascotes, un CRÁTER en el centro (x 160, y 167) y detrás EL MONTÓN DE
//     CASCOTES con su cima plana (x 160, y 121) a contraluz; columnas de humo que suben, brasas, papeles que vuelan.
//     o.doom 0–1: el sitio de Doom se enciende de verde (halo que late, columna de luz, chispas, grietas verdes en los
//     cascotes); la escena pone a Doom en doom. Devuelve suelo 158, libre [20, 260], doom: [160, 121] (los pies de Doom),
//     centinelas: tres [x, y] (el centro de la cabeza), crater, sol, horizonte 128.
//     Cámara 'marcos': LA MISMA CIUDAD PARTIDA EN ONCE PÓSTERS en la pared del estudio de Atom (ladrillo pintado de
//     azul pizarra con la luz cálida de un flexo desde arriba a la izquierda, zócalo y tarima; donde falta un póster
//     quedan su silueta a lápiz y su chincheta, y dentro el boceto del plan: su número 1–11, el horizonte, las cabezas de la
//     pareja y una flecha), arriba una guirnalda de bombillas que se encienden en ola y el flexo pinzado en la esquina de
//     arriba a la izquierda: once marcos verticales (y 46–160) con borde blanco fino, separados por
//     una raya de pared, cada uno con su chincheta y una esquina que se levanta de vez en cuando; la ciudad dentro sigue
//     viva (humo, nubes, fuego). El sexto (el central, más estrecho) es el de Doom, con su luz verde. o.n 0–11: cuántos
//     están puestos, de izquierda a derecha; o.cae 0–1: el último puesto (el n-ésimo) se suelta de una chincheta, gira y
//     cae al suelo (el gag 3); o.cae { marco: i, k: 0–1 }: el que cae es el marco i (si está puesto), con k el avance (así
//     cae el de Doom, el 5); la escena no pinta a la pareja del marco geo.cae mientras cae; o.doom (1 por omisión).
//     Devuelve suelo 180, libre [0, 0], pies 154 (la línea de suelo dentro de los marcos), cae (el índice del marco que
//     cae, o null), marcos: once [x0, y0, x1, y1]
//     (el borde, de izquierda a derecha), sitios: once listas de la x de R.actor (el borde izquierdo del sprite de 15 px)
//     para pintar a la pareja ya montada y sin salirse (en el sexto, una sola: Doom), doom: [x, y].
//   'pareja': UN PÓSTER DE CERCA: un marco vertical grande (x 100–220, y 24–168) con su trozo de la ciudad a la misma
//     escala, el trozo del marco o.k 0–10 (cada pareja el suyo; el 5 es el de Doom, con el montón y el sol detrás), en la
//     pared de ladrillo con una balda abajo (taza con lápices, celo, caja de chinchetas, tijeras, tres cómics y un flexo
//     de pinza, x 298–318, con su luz cálida en la pared y una polilla que le da vueltas), una entrada de cine con el
//     «26» pegada con cinta, un corcho con
//     fotos clavadas e hilo rojo (como el de la pared del estudio), notas adhesivas con
//     garabatos, tiras de cinta, un enchufe con su cable y una araña que sube y baja de su hilo. Devuelve suelo 150, libre
//     [110, 210], izq: [x, 150] y der: [x, 150] (la x de R.actor), marco.
//     Cámara 'ausente': el mismo póster (o.k, 9 por omisión) con LA SILUETA DE LA BESTIA RECORTADA en el papel (grande,
//     encorvada, peluda, con los brazos hasta las rodillas): por el hueco se ve la pared con la sombra del papel y un filo
//     blanco; la esquina de arriba a la derecha sin su chincheta, que tiembla, y la chincheta suelta en la balda.
//     Devuelve suelo 150, libre [0, 0], silueta: [160, 118] (su centro), marco, chincheta: [x, y].
// batallaDelante: en 'campo', humo bajo que pasa, brasas y papeles por delante (y chispas verdes con o.doom); en
// 'marcos', vuelve a pintar los bordes de los marcos y la pared entre ellos (así la pareja queda dentro de su póster) y
// el póster que cae; en 'pareja' y 'ausente', el borde del marco.
// los once marcos: diez de 28 px y el de Doom (el sexto) de 24, separados por una raya de pared de 1 px
// la paleta de la ciudad en ruinas, de la pared del estudio y del plató
const BC = pal({
  sol: '#fff4c8', solL: '#ffe08a', solB: '#f8b860', humoS: '#2e2432', humo: '#4a3a48', humoL: '#7a5a62', humoLL: '#a8706a',
  brasa: '#ff8a2a', brasaL: '#ffd060', fuego: '#ff9a3a', fuegoL: '#ffe080', fuegoS: '#c8401e', doomV: '#3ae88a', doomVS: '#1a8a4a', doomL: '#b8ffd8',
  nubeS: '#4a2448', nube: '#7a3456', nubeL: '#c45a4e', nubeLL: '#f0905a', cuervo: '#1a1220',
  cara: '#5a4e5e', caraS: '#3e3446', caraD: '#2c2434', caraL: '#7a6470', borde: '#e88a56', bordeL: '#ffc080', hueco: '#18121e', huecoL: '#a8584a', losa: '#8a7a7a', viga: '#7a3a2e', vigaL: '#c06a3a',
  asf0: '#241e2a', asf1: '#2e2634', asf2: '#3a3040', asf3: '#463a4a', asf4: '#5e4652', asf5: '#86585a', asf6: '#b0705e', linea: '#9a8a62', acera: '#544a58', aceraS: '#40364a',
  cas0: '#241c28', cas1: '#33293a', cas2: '#463a4a', cas3: '#5e4e5a', cas4: '#7a6670', canto: '#f0a060', cantoS: '#a85a50', hierroR: '#6a2e24', hierroL: '#c8703a',
  cocheR: '#7a3a36', cocheRL: '#b8604a', cocheA: '#34446e', cocheAL: '#5a74a8', rueda: '#141018', cristal: '#2a2838', cristalL: '#7a6a8a', farola: '#3a3440', farolaL: '#8a7a80',
  papel: '#e8e0d0', papelS: '#a89a8a', haz: '#ffd0f0',
  // la pared de ladrillo pintado del estudio de Atom, la madera y los marcos
  muro0: '#262c3a', muro1: '#303848', muro2: '#3a4456', muro3: '#465266', muro4: '#546078', muro5: '#66708a', muro6: '#7a8098', junta: '#222836', rojoL: '#8a4a3a', rojoLS: '#5a3028',
  lapiz: '#6a7488', blancoM: '#f6f0e2', blancoMS: '#c8beac', sombra: '#141820', mad0: '#3a2618', mad1: '#5a3a24', mad2: '#7a5232', mad3: '#9a6a40', mad4: '#c08a52',
  pinR: '#e04848', pinA: '#4878e0', pinY: '#f0c838', pinV: '#48c068', pinL: '#ffffff', nota: '#f0d860', notaS: '#c8a838', notaV: '#9ae0a0', notaR: '#f0a0b0', cinta: '#d8ccb0', cintaS: '#b0a488',
  // el plató
  techo: '#0c0d14', techoL: '#13151f', celos0: '#24262f', celos1: '#363846', celos2: '#4c4e60', croma0: '#17502a', croma1: '#1f6a32', croma2: '#28843c', croma3: '#329c46', croma4: '#3ab04a', croma5: '#54c45c', croma6: '#7ad87a',
  cruzL: '#d0f4c8', cruzS: '#124a1e', negro0: '#121218', negro1: '#1a1a22', negro2: '#22222c', negro3: '#2c2c38', suelo0: '#1c1c22', suelo1: '#24242c', suelo2: '#2e2e36', suelo3: '#3a3a44', suelo4: '#4a4a56',
  cinta1: '#e8c840', cinta2: '#e85a5a', cinta3: '#5ab8e8', metal0: '#3a3c46', metal1: '#5a5e6a', metal2: '#8a8e9a', metal3: '#c4c8d2', cable: '#0e0e12', cableL: '#3a3a46',
  lona1: '#b83a3a', lona1S: '#7a2424', lona2: '#3a5ab8', lona2S: '#243a7a', foco: '#fff0b0', focoL: '#fffbe8', gel1: '#ffc880', gel2: '#a8d8ff',
  pantalla: '#1e3a5a', pantallaL: '#6ab8e8', rec: '#ff3a3a', recS: '#5a1a1a', piel: '#e0b090', pielS: '#a87a5a', camiseta: '#2a2a34', camisetaL: '#44445a',
  hoja0: '#3a2a1a', hoja1: '#5a3a1e', hoja2: '#7a4a22', hoja3: '#9a6a2a', hoja4: '#c08a30', hoja5: '#6a6a2a', telon0: '#2a4a48', telon1: '#36585a', telon2: '#46706a', telon3: '#6a8c84', telon4: '#94aca4',
  arbol0: '#2a1e16', arbol1: '#3e2c1e', arbol2: '#54402a', arbol3: '#6e563a', musgo: '#4a6a2a', fol0: '#16301e', fol1: '#22462a', fol2: '#2e5e34', fol3: '#46803e', fol4: '#6a9e4a',
  carton: '#3e6a3a', cartonL: '#5a8a4a', cartonS: '#2a4a2a', cartonT: '#6a4a30', cartonB: '#c8b088', agua: '#2e5a8a', aguaL: '#5a8ac0', aguaLL: '#b8e0f8', roca: '#6a6a72', rocaL: '#9a9aa2', niebla: '#8a9a9a',
  colch: '#2a4a9a', colchL: '#3e62bc', colchLL: '#5a7ed0', colchS: '#1e3672', telonN0: '#101014', telonN1: '#18181e', telonN2: '#222228', telonN3: '#2e2e36', pizarra: '#e8ecee', pizarraS: '#b8c0c4', arnes: '#e87a2a', arnesS: '#9a4a1a',
  m0: '#2a2e36', m1: '#4a505c', m2: '#7a8290', m3: '#b0b8c4', m4: '#e4e8ee', ojo: '#5aff8a', capa: '#1e6a36', capaL: '#3a9a50', capaS: '#0e3a1e', capaD: '#08240f', k: '#0e0a12',
});

const b_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de Bayer 4 × 4 (0–1) para las tramas
const b_b4 = (x, y) => (b_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// la mezcla de dos colores (f = 0 el primero, 1 el segundo)
const b_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// una rampa de colores (lista) leída con trama: v continuo, entre el tono floor(v) y el siguiente
const b_rampa = (L, v, x, y) => { const i = Math.floor(v), f = v - i; const j = f > b_b4(x, y) ? i + 1 : i; return L[Math.max(0, Math.min(L.length - 1, j))]; };

// la zona de Atom y la barra del año, que se quedan tranquilas
const b_calma = (x, y) => (x > 272 && y < 48) || (y < 22 && x > 14 && x < 176);

// los fondos fijos: un búfer y su mapa de profundidad por lienzo y clave, que se pintan una vez y se copian
const b_CACHE = new WeakMap();

function b_fijo(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = new Map()));
  let e = m.get(clave); if (!e) { e = { b: R.nuevo(), d: new Uint8Array(57600) }; const prev = R.usar(e.b); dibuja(e.d); R.usar(prev); m.set(clave, e); }
  return e;
}

// un búfer de trabajo por lienzo (para pintar la ciudad fuera de la pantalla y copiar sus trozos a los marcos)
function b_aparte(R, clave) { let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = new Map())); let b = m.get('~' + clave); if (!b) { b = R.nuevo(); m.set('~' + clave, b); } return b; }

// el pintor con profundidad: dibuja en coordenadas de mundo (pantalla = mundo − [ox, oy]); al pintar lo fijo (fijo = true)
// apunta en D la profundidad z de cada píxel; al pintar lo que se mueve (fijo = false) solo pinta donde lo de delante
// no lo tapa (D ≤ z). Con D null pinta siempre. El color puede ser una función (x, y) de mundo. calma(true) se salta la
// zona de Atom y la barra del año.
function b_pintor(R, D, ox = 0, oy = 0, fijo = false) {
  const B = R.buf; let Z = 0, CL = null, CAL = false;
  const p = (x, y, c) => { const sx = Math.round(x - ox), sy = Math.round(y - oy); if (sx < 0 || sx > 319 || sy < 0 || sy > 179) return; if (CL && (sx < CL[0] || sx > CL[2] || sy < CL[1] || sy > CL[3])) return; if (CAL && b_calma(sx, sy)) return;
    const i = sy * 320 + sx; if (D) { if (fijo) D[i] = Z; else if (D[i] > Z) return; } B[i] = typeof c === 'function' ? c(Math.round(x), Math.round(y)) : c; };
  const rc = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) p(x, y, c); };
  const li = (x0, y0, x1, y1, c) => { x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy;
    for (let n = 0; n < 2000; n++) { p(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } } };
  const po = (pts, c) => { let a = Infinity, b = -Infinity; for (const q of pts) { a = Math.min(a, q[1]); b = Math.max(b, q[1]); }
    for (let y = Math.floor(a); y <= Math.ceil(b); y++) { const yc = y + 0.5, xs = []; for (let i = 0; i < pts.length; i++) { const P0 = pts[i], P1 = pts[(i + 1) % pts.length]; if ((P0[1] <= yc && P1[1] > yc) || (P1[1] <= yc && P0[1] > yc)) xs.push(P0[0] + (yc - P0[1]) / (P1[1] - P0[1]) * (P1[0] - P0[0])); }
      xs.sort((u, v) => u - v); for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.ceil(xs[k] - 0.5); x <= Math.floor(xs[k + 1] - 0.5); x++) p(x, y, c); } };
  const el = (cx, cy, rx, ry, c) => { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) if (((x - cx) / (rx + 0.4)) ** 2 + ((y - cy) / (ry + 0.4)) ** 2 <= 1) p(x, y, c); };
  const di = (cx, cy, r, c) => el(cx, cy, r, r, c);
  const cap = (x0, y0, x1, y1, r, c) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) di(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, r, c); };
  return { p, rc, li, po, el, di, cap, z: (v) => { Z = v; }, clip: (r) => { CL = r; }, calma: (v) => { CAL = v; }, ox, oy, B, D };
}

// copia un rectángulo de un búfer a la pantalla (fila a fila)
function b_copiaZona(R, src, x0, y0, x1, y1) { const B = R.buf; x0 = Math.max(0, x0); x1 = Math.min(319, x1); y0 = Math.max(0, y0); y1 = Math.min(179, y1); for (let y = y0; y <= y1; y++) B.set(src.subarray(y * 320 + x0, y * 320 + x1 + 1), y * 320 + x0); }

// la ciudad: los edificios de cerca [x0, x1, techo], los centinelas [x, y de la cabeza, escala, brazo arriba] y las
// columnas de humo [x, y]; todo en coordenadas de mundo (el campo ve x 0–319)
const B_CIU = {
  cerca: [[-150, -104, 70], [-100, -62, 84], [-58, -8, 62], [-4, 44, 76], [48, 92, 94], [96, 116, 108], [204, 232, 102], [236, 270, 80], [274, 318, 66], [322, 362, 88], [366, 410, 72], [414, 470, 90]],
  sent: [[52, 62, 1, 1], [212, 58, 1.05, 0], [258, 66, 0.8, 0]],
  humo: [[20, 80], [-34, 66], [104, 108], [226, 104], [244, 82], [338, 92], [392, 76], [-120, 74]],
  coches: [[54, 152, 0, 0], [250, 150, 1, 1], [104, 136, 0, 2]],
};

// las ventanas con fuego: [x, y] (se calculan con la misma rejilla que pinta b_edificio)
const B_FUEGOS = (() => { const r = []; B_CIU.cerca.forEach(([x0, x1, top], k) => { for (let n = 0; n < 2; n++) { const fx = x0 + 3 + 6 * Math.floor(h(k, n, 61) * ((x1 - x0 - 6) / 6)), fy = top + 10 + 7 * (1 + Math.floor(h(k, n, 62) * 3)); if (h(k, n, 63) < 0.7 && fy < 124) r.push([fx, fy]); } }); return r; })();

const B_CIELO = ['#20183a', '#2e1e46', '#46264f', '#682e58', '#923a58', '#bc4c48', '#de703c', '#f29a44', '#f8c260', '#fce08a'].map(hex);

const B_CIELO_Y = [0, 14, 30, 46, 62, 76, 88, 98, 106, 114, 200];

// la posición (continua) en la rampa del cielo de un punto de mundo, con el resplandor alrededor del sol
function b_cieloV(wx, wy) {
  let i = 0; while (i < 9 && wy >= B_CIELO_Y[i + 1]) i++;
  let f = i + Math.min(1, (wy - B_CIELO_Y[i]) / (B_CIELO_Y[i + 1] - B_CIELO_Y[i]));
  const d = Math.hypot(wx - 160, (wy - 103) * 1.8), g = Math.max(0, 1 - d / 150); return Math.min(9, f + g * g * 2.8);
}

// la ciudad fija (se pinta una vez por encuadre): cielo, sol, rascacielos lejanos, centinelas, edificios, calle,
// montón, cráter, coches, farolas y cascotes; z: 0 cielo, 1–2 lejos, 3 centinelas, 4–5 edificios, 6 calle, 7 delante
function b_ciudadFija(R, D, ox, oy) {
  const P = b_pintor(R, D, ox, oy, true);
  // el cielo: bandas tramadas solo en sus bordes (el tercio del medio), con el resplandor alrededor del sol
  P.z(0); P.rc(ox, oy, ox + 319, oy + 179, (x, y) => { const v = b_cieloV(x, y), i = Math.floor(v), f = v - i, q = Math.max(0, Math.min(1, (f - 0.5) * 3 + 0.5)); return B_CIELO[Math.min(9, q > b_b4(x, y) ? i + 1 : i)]; });
  // el sol bajo, con sus rayas de nube por delante
  P.di(160, 103, 13, BC.solB); P.di(160, 103, 12, BC.solL); P.di(159, 102, 9, BC.sol);
  for (const [y, a, b] of [[97, 146, 176], [100, 140, 168], [106, 150, 182]]) P.rc(a, y, b, y, (x) => (x & 3) ? B_CIELO[7] : B_CIELO[6]);
  // dos capas de rascacielos lejanos en la bruma (el color sale del cielo de detrás, más oscuro cuanto más cerca)
  const lejano = (capa, x0, x1, top, k) => { const osc = capa ? '#3a2044' : '#5a2a50', fz = capa ? 0.62 : 0.44, O = hex(osc);
    for (let x = x0; x <= x1; x++) { const ty = top + (h(x >> 1, k, 41) < 0.25 ? 1 : 0) + (x - x0 < 2 && h(k, 4, 41) < 0.5 ? 3 : 0); for (let y = ty; y <= 128; y++) { const sk = B_CIELO[Math.round(b_cieloV(x, y))]; let c = b_mezcla(sk, O, fz + (y - ty) * 0.004);
      if (capa && (x - x0) % 4 === 1 && (y - ty) % 5 === 2 && y < 124) c = h(x, y, 42) < 0.08 ? BC.fuego : b_mezcla(c, O, 0.5); P.p(x, y, c); } }
    if (h(k, 5, 41) < 0.3) P.li(Math.round((x0 + x1) / 2), top, Math.round((x0 + x1) / 2), top - 5 - Math.round(h(k, 6, 41) * 6), b_mezcla(B_CIELO[5], O, fz)); };
  P.z(1); for (let k = 0, x = -200; x < 520; k++) { const w = 7 + Math.floor(h(k, 1, 43) * 12), top = 94 + Math.floor(h(k, 2, 43) * 14) + (Math.abs(x - 160) < 30 ? 8 : 0); lejano(0, x, x + w, top, k); x += w + 1; }
  P.z(2); for (let k = 0, x = -190; x < 520; k++) { const w = 9 + Math.floor(h(k, 1, 44) * 16), top = 84 + Math.floor(h(k, 2, 44) * 20); if (Math.abs(x + w / 2 - 160) > 34) lejano(1, x, x + w, top, k + 50); x += w + 3 + Math.floor(h(k, 3, 44) * 8); }
  // un cuarto centinela lejos, metido en la columna de humo del medio y desteñido por la bruma (lo tapan los edificios)
  P.z(2); b_centinela(b_bruma(P, 0.45), B_LEJOS[0], B_LEJOS[1], B_LEJOS[2], 0);
  // los centinelas, a contraluz y con la bruma en las piernas
  P.z(3); for (const [x, y, s, b] of B_CIU.sent) b_centinela(P, x, y, s, b);
  // los edificios del medio, en la bruma
  P.z(4); for (let k = 0, x = -180; x < 500; k++) { const w = 18 + Math.floor(h(k, 1, 45) * 16), top = 92 + Math.floor(h(k, 2, 45) * 16); if (x + w < 126 || x > 194) b_edificio(P, x, x + w, top, k + 100, 1); x += w + 4 + Math.floor(h(k, 3, 45) * 10); }
  // los edificios de cerca, con todo su detalle
  P.z(5); B_CIU.cerca.forEach(([x0, x1, top], k) => b_edificio(P, x0, x1, top, k, 0));
  for (const [x0, x1] of [[122, 134], [186, 198]]) b_edificio(P, x0, x1, 116 + (x0 & 3), x0, 0);
  // la calle en perspectiva (punto de fuga 160, 116): asfalto, reflejo del sol, carriles, aceras y grietas
  P.z(6); P.rc(ox, 128, ox + 319, oy + 179, (x, y) => b_asfalto(x, y));
  for (let k = 0; k < 26; k++) { let x = -140 + h(k, 1, 46) * 600, y = 132 + h(k, 2, 46) * 46; for (let s = 0; s < 6; s++) { const nx = x + (h(k, s, 47) - 0.5) * 9, ny = y + (h(k, s, 48) - 0.3) * 3; P.li(x, y, nx, ny, BC.asf0); x = nx; y = ny; } }
  for (const [cx, cy, rx] of [[96, 168, 10], [214, 162, 8], [-40, 160, 9], [300, 170, 11], [380, 158, 8]]) P.el(cx, cy, rx, 1.6, (x, y) => b_mezcla(B_CIELO[Math.min(9, 6 + ((x + y) & 1))], BC.asf2, 0.25 + (y - cy) * 0.1));
  // los cascotes al pie de los edificios y por la calle
  for (const [x0, x1] of B_CIU.cerca) for (let k = 0; k < 5; k++) { const cx = x0 + h(x0, k, 49) * (x1 - x0), cy = 130 + h(x0, k, 50) * 6, r = 2 + h(x0, k, 51) * 4; b_cascote(P, cx, cy, r, x0 + k); }
  for (let k = 0; k < 30; k++) { const cx = -140 + h(k, 1, 52) * 600, cy = 136 + h(k, 2, 52) * 40; if (Math.abs(cx - 160) < 44 && cy > 150) continue; b_cascote(P, cx, cy, 1 + h(k, 3, 52) * 2.4, k + 200); }
  // el cráter del centro: el borde de atrás encendido, el fondo oscuro, las marcas de quemado
  for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; P.li(160 + Math.cos(a) * 34, 167 + Math.sin(a) * 6, 160 + Math.cos(a) * (42 + h(k, 1, 53) * 10), 167 + Math.sin(a) * (8 + h(k, 2, 53) * 3), BC.asf0); }
  P.el(160, 167, 35, 6.5, BC.cas2); P.el(160, 167.6, 31, 5, BC.cas0); P.el(160, 168.5, 24, 3.2, BC.asf0);
  for (let x = 130; x <= 190; x++) { const y = 167 - 5 * Math.sqrt(Math.max(0, 1 - ((x - 160) / 31) ** 2)); P.p(x, Math.round(y) + 1, BC.cas3); }
  for (let x = 126; x <= 194; x++) { const y = 167 + 6.5 * Math.sqrt(Math.max(0, 1 - ((x - 160) / 35) ** 2)); if (x & 1) P.p(x, Math.round(y), BC.cas4); }
  // el montón de cascotes, a contraluz con su filo encendido, varillas y una losa inclinada
  b_monton(P);
  // los coches volcados y las farolas dobladas
  for (const [x, y, c, tipo] of B_CIU.coches) b_coche(P, x, y, c, tipo);
  b_farola(P, 26, 150, 1); b_farola(P, 228, 140, -1); b_farola(P, 336, 146, -1); b_farola(P, -70, 146, 1);
  // la boca de riego reventada (el chorro se pinta aparte), su charco, marcas de frenazo y papeles por el suelo
  { const [x, y] = B_RIEGO; P.el(x + 2, y + 2, 12, 2.2, (a, b) => b_mezcla(B_CIELO[7 + ((a + b) & 1)], BC.asf2, 0.45));
    P.rc(x - 3, y - 9, x + 3, y, BC.k); P.rc(x - 2, y - 8, x + 2, y, hex('#a83a2e')); P.rc(x - 2, y - 8, x - 1, y, hex('#d8604a')); P.rc(x - 4, y - 6, x + 4, y - 5, BC.k); P.rc(x - 3, y - 6, x + 3, y - 6, hex('#c84a3a'));
    P.rc(x - 3, y - 11, x + 3, y - 10, BC.k); P.p(x, y - 12, BC.metal2); P.rc(x - 4, y, x + 4, y + 1, BC.cas1); }
  for (const [x0, y0, x1, y1] of [[236, 172, 300, 150], [240, 175, 306, 152], [-20, 170, 40, 146]]) for (let u = 0; u <= 1; u += 0.02) { const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * 5) * 2; if (h(Math.round(x), 3, 59) < 0.7) P.p(x, y, BC.asf0); }
  for (let k = 0; k < 9; k++) { const x = -60 + h(k, 1, 71) * 440, y = 140 + h(k, 2, 71) * 34; if (Math.abs(x - 160) < 40) continue; P.po([[x, y], [x + 4, y - 1], [x + 5, y + 2], [x + 1, y + 3]], BC.papelS); P.li(x, y, x + 4, y - 1, BC.papel); }
  // los cascotes grandes de las esquinas de delante
  P.z(7);
  P.po([[ox - 2, oy + 166], [ox + 10, oy + 158], [ox + 24, oy + 160], [ox + 34, oy + 168], [ox + 40, oy + 181], [ox - 2, oy + 181]], (x, y) => b_rampa([BC.cas1, BC.cas2, BC.cas3], 1 + (h(x >> 2, y >> 2, 54) - 0.5) * 1.6 - (y - oy - 160) * 0.05, x, y));
  P.li(ox + 10, oy + 158, ox + 24, oy + 160, BC.cantoS); P.li(ox + 24, oy + 160, ox + 34, oy + 168, BC.canto);
  for (const [a, b, c, d] of [[14, 162, 18, 150], [20, 162, 27, 152], [30, 166, 37, 158]]) { P.li(ox + a, oy + b, ox + c, oy + d, BC.hierroR); P.p(ox + c, oy + d, BC.hierroL); }
  P.po([[ox + 284, oy + 181], [ox + 290, oy + 166], [ox + 302, oy + 160], [ox + 316, oy + 163], [ox + 321, oy + 170], [ox + 321, oy + 181]], (x, y) => b_rampa([BC.cas1, BC.cas2, BC.cas3, BC.cas4], 1.3 + (h(x >> 2, y >> 2, 55) - 0.5) * 1.6 - (y - oy - 160) * 0.05, x, y));
  P.li(ox + 290, oy + 166, ox + 302, oy + 160, BC.canto); P.li(ox + 302, oy + 160, ox + 316, oy + 163, BC.cantoS);
  // un semáforo caído entre los cascotes de la derecha (tres lentes apagadas)
  P.li(ox + 268, oy + 176, ox + 296, oy + 168, BC.farola); P.li(ox + 268, oy + 177, ox + 296, oy + 169, BC.farolaL);
  P.rc(ox + 296, oy + 163, ox + 312, oy + 170, BC.k); P.rc(ox + 297, oy + 164, ox + 311, oy + 169, BC.farola); for (const dx of [300, 304, 308]) P.di(ox + dx, oy + 166.5, 1.4, dx === 300 ? BC.cocheR : BC.cas1);
}
// el color del asfalto (o de la acera) en un punto de mundo
function b_asfalto(x, y) {
  const d = Math.max(1, y - 116), k = (x - 160) / d, n = h(x >> 1, y, 56);
  if (Math.abs(k) > 3.6) { const tj = Math.abs(((k * 2) % 1 + 1) % 1 - 0.5) < 0.04 || (Math.floor(Math.log(d) * 9) % 2 === 0 && h(x, y, 57) < 0.3); return tj ? BC.aceraS : n < 0.12 ? BC.asf2 : BC.acera; }
  const g = Math.max(0, 1 - Math.abs(k) / 1.4) * Math.max(0, 1 - (d - 12) / 46);
  let v = 1.6 + (n - 0.5) * 0.9 - (d - 12) * 0.012 + g * 4.2;
  if (Math.abs(Math.abs(k) - 1.8) < 0.035 + 0.6 / d && Math.floor(Math.log(d) * 7) % 2 === 0 && h(x >> 2, y >> 1, 58) > 0.25) return BC.linea;
  if (Math.abs(Math.abs(k) - 3.5) < 0.1) return BC.aceraS;
  return b_rampa([BC.asf0, BC.asf1, BC.asf2, BC.asf3, BC.asf4, BC.asf5, BC.asf6], v, x, y);
}

// un trozo de cascote (hormigón con canto de luz)
function b_cascote(P, cx, cy, r, k) {
  const pts = []; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + h(k, i, 59); const rr = r * (0.7 + h(k, i, 60) * 0.5); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.7]); }
  P.po(pts, (x, y) => (y < cy - r * 0.25 ? BC.cas3 : h(x, y, k) < 0.2 ? BC.cas1 : BC.cas2)); P.p(Math.round(cx - r * 0.3), Math.round(cy - r * 0.6), BC.cas4);
  if (cx < 160) P.p(Math.round(cx + r * 0.6), Math.round(cy - r * 0.3), BC.cantoS); else P.p(Math.round(cx - r * 0.6), Math.round(cy - r * 0.3), BC.cantoS);
}

// un edificio en ruinas: techo roto (una mitad hundida en diagonal), fachada tramada que se oscurece hacia abajo,
// rejilla de ventanas vacías (algunas dejan ver el cielo), cornisas, pisos al aire con vigas, y el filo de luz del lado
// que mira al sol; lejos = 1 lo pinta en la bruma y más sencillo
function b_edificio(P, x0, x1, top, k, lejos) {
  const w = x1 - x0, roto = h(k, 3, 70), luzDer = (x0 + x1) / 2 < 160, tops = [];
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, w); let ty = top + Math.floor(h(x >> 1, k, 71) * 3);
    if (roto < 0.5) ty += Math.max(0, (u - 0.5) * w * 0.8); else ty += Math.max(0, (0.5 - u) * w * 0.8);
    if (h(x >> 2, k, 72) < 0.15) ty += 3; tops.push(Math.round(ty)); }
  const brumaC = lejos ? [hex('#4e3450'), hex('#5a3c58'), hex('#6a4660'), hex('#7a5268')] : null;
  for (let x = x0; x <= x1; x++) { const ty = tops[x - x0];
    for (let y = ty; y <= 130; y++) { const v = (y - top) / (130 - top); let c;
      if (lejos) { c = b_rampa(brumaC, 2.2 - v * 1.6 + (h(x, y, k) - 0.5) * 0.5, x, y); if ((x - x0) % 5 === 2 && (y - top) % 6 < 3 && y > ty + 2 && x > x0 + 1 && x < x1 - 1) c = brumaC[0]; if (y === ty) c = brumaC[3]; if ((luzDer ? x1 - x : x - x0) === 0) c = hex('#a8607a'); }
      else {
        c = b_rampa([BC.caraD, BC.caraS, BC.cara, BC.caraL], 2.1 - v * 1.6 + (h(x, y, k) - 0.5) * 0.6, x, y);
        const fy = (y - top - 2) % 7, wx = (x - x0 - 3) % 6;
        if (fy === 6) c = BC.caraS; else if (fy === 0 && y > ty + 1) c = BC.caraL;
        if (fy >= 1 && fy <= 4 && wx >= 0 && wx <= 2 && x > x0 + 2 && x < x1 - 2 && y > ty + 3) { const vid = h(Math.floor((x - x0 - 3) / 6), Math.floor((y - top - 2) / 7), k + 7); c = fy === 4 ? BC.caraL : vid < 0.22 ? (fy === 1 ? BC.huecoL : b_mezcla(BC.huecoL, BC.hueco, 0.3)) : BC.hueco; }
        const lado = luzDer ? x1 - x : x - x0; if (lado === 0) c = BC.borde; else if (lado === 1) c = b_mezcla(c, BC.borde, 0.35); else if (luzDer ? x - x0 < 2 : x1 - x < 2) c = BC.caraD;
        if (y === ty) c = BC.bordeL; else if (y === ty + 1) c = BC.caraL;
        if (ty > top + 4 && y < ty + 4 && y > ty) c = BC.caraD;   // el roto: el interior oscuro
      }
      P.p(x, y, c); } }
  if (lejos) return;
  // los pisos al aire y las vigas que salen por el roto
  for (let x = x0; x <= x1; x++) { const ty = tops[x - x0]; if (ty <= top + 4) continue; for (let y = top + 2; y < 128; y += 7) if (y > ty - 2 && y < ty + 3) { P.p(x, y, BC.losa); } }
  for (let n = 0; n < 3; n++) { const vx = x0 + Math.round(h(k, n, 73) * w), ty = tops[vx - x0]; if (ty <= top + 3) continue; const dx = (h(k, n, 74) - 0.5) * 8; P.li(vx, ty, vx + dx, ty - 6 - h(k, n, 75) * 6, BC.viga); P.p(Math.round(vx + dx), Math.round(ty - 6), BC.vigaL); }
  // una cornisa y un depósito de agua en algunos tejados que siguen en pie
  if (h(k, 8, 76) < 0.5) { const cx = luzDer ? x0 + 5 : x1 - 9; const ty = tops[cx - x0]; if (ty <= top + 2) { P.rc(cx, ty - 6, cx + 5, ty - 1, BC.caraS); P.rc(cx, ty - 7, cx + 5, ty - 7, BC.caraL); P.li(cx + 1, ty - 1, cx + 1, ty, BC.k); P.li(cx + 4, ty - 1, cx + 4, ty, BC.k); P.p(luzDer ? cx + 5 : cx, ty - 5, BC.borde); } }
}

// un centinela gigante (escala s, cabeza en x, y): casco liso con cresta, placa de la cara con una ranura de luz por
// ojos (sin boca ni cara humana), hombreras redondas, pecho con un disco, vientre por bandas, brazos largos con codos;
// brazo = 1 lo levanta (el del lado del sol) con la palma abierta. Luego, el filo de luz del lado del sol, el canto de
// arriba más claro, y la bruma en las piernas
function b_centinela(P, cx, yh, s, brazo) {
  const bru = hex('#7a3a5a'), col = (c) => b_mezcla(hex(c), bru, 0.3);
  const K = { b: col('#5e2a7e'), m: col('#7a36a0'), l: col('#b04ab0'), r: col('#f08ad0'), d: col('#3a1852'), o: hex('#ffc8f0') };
  const S = (v) => v * s, luz = cx < 160 ? 1 : -1, x0 = cx - S(30), x1 = cx + S(30), y0 = yh - S(30);
  P.po([[cx - S(9), yh + S(48)], [cx - S(2), yh + S(48)], [cx - S(3), 132], [cx - S(11), 132]], K.d);
  P.po([[cx + S(2), yh + S(48)], [cx + S(9), yh + S(48)], [cx + S(11), 132], [cx + S(3), 132]], K.d);
  P.po([[cx - S(12), yh + S(11)], [cx + S(12), yh + S(11)], [cx + S(9), yh + S(42)], [cx - S(9), yh + S(42)]], K.b);
  P.rc(cx - S(10), yh + S(41), cx + S(10), yh + S(49), K.d); P.rc(cx - S(3), yh + S(43), cx + S(3), yh + S(47), K.m);
  for (let i = 0; i < 4; i++) P.rc(cx - S(8 - i * 0.4), yh + S(28 + i * 3.6), cx + S(8 - i * 0.4), yh + S(28 + i * 3.6), K.d);
  P.di(cx, yh + S(19), S(5), K.d); P.di(cx, yh + S(19), S(4), K.m); P.di(cx, yh + S(19), S(2.5), K.l); P.di(cx - luz * S(0.8), yh + S(18.5), S(1), K.r);
  for (const d of [-1, 1]) {
    const sx = cx + d * S(14), sy = yh + S(13);
    if (brazo && d === luz) { const ex = cx + d * S(23), ey = yh - S(2), hx = cx + d * S(20), hy = yh - S(20);
      P.cap(sx, sy, ex, ey, S(3.6), K.b); P.cap(ex, ey, hx, hy + S(3), S(3), K.b); P.di(ex, ey, S(2.4), K.d);
      P.el(hx, hy, S(4), S(4.5), K.m); for (const f of [-2.4, -0.8, 0.8, 2.4]) P.li(hx + S(f), hy - S(3), hx + S(f * 1.3), hy - S(8), K.m); P.li(hx - d * S(4), hy, hx - d * S(7.5), hy - S(3), K.m);
    } else { const ex = cx + d * S(18), ey = yh + S(31), wx = cx + d * S(17), wy = yh + S(47);
      P.cap(sx, sy, ex, ey, S(4), K.b); P.cap(ex, ey, wx, wy, S(3.4), K.b); P.di(ex, ey, S(2.6), K.d); P.el(wx, wy + S(3), S(3.5), S(4), K.m); P.li(wx - S(2), wy + S(6), wx - S(2), wy + S(9), K.m); P.li(wx + S(1), wy + S(6), wx + S(1), wy + S(9), K.m); }
    P.el(sx, sy, S(8), S(6.5), K.m); P.el(sx, sy - S(1), S(6), S(4), K.l); P.li(sx - S(6), sy + S(3), sx + S(6), sy + S(3), K.d);
  }
  P.rc(cx - S(3), yh + S(5), cx + S(3), yh + S(10), K.d); P.rc(cx - S(5), yh + S(9), cx + S(5), yh + S(11), K.m);
  P.el(cx, yh, S(7.5), S(8), K.b); P.el(cx, yh - S(2), S(6), S(5), K.m); P.li(cx, yh - S(8), cx, yh - S(3), K.l);
  P.el(cx - S(7.5), yh + S(1), S(2), S(3), K.d); P.el(cx + S(7.5), yh + S(1), S(2), S(3), K.d);
  P.rc(cx - S(5.5), yh, cx + S(5.5), yh + S(6), K.d); P.rc(cx - S(4.5), yh + S(1), cx + S(4.5), yh + S(1) + Math.max(1, Math.round(S(1.2))), K.o);
  // el filo de luz (lado del sol) y el canto de arriba, mirando qué píxeles son del centinela
  const D = P.D, ox = P.ox, oy = P.oy, B = P.B, sx0 = Math.max(0, Math.round(x0 - ox)), sx1 = Math.min(319, Math.round(x1 - ox)), sy0 = Math.max(1, Math.round(y0 - oy)), sy1 = Math.min(178, Math.round(132 - oy));
  if (sx1 < sx0 || sy1 < sy0) return;
  const es = (i) => D[i] === 3, M = new Uint8Array((sx1 - sx0 + 3) * (sy1 - sy0 + 3));
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) { const i = y * 320 + x; if (!es(i)) continue; const nl = x + luz >= 0 && x + luz < 320 ? es(i + luz) : false;
    if (!nl) M[(y - sy0) * (sx1 - sx0 + 3) + x - sx0] = 2; else if (!es(i - 320)) M[(y - sy0) * (sx1 - sx0 + 3) + x - sx0] = 1; else if (x + 2 * luz >= 0 && x + 2 * luz < 320 && !es(i + 2 * luz)) M[(y - sy0) * (sx1 - sx0 + 3) + x - sx0] = 3; }
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) { const m = M[(y - sy0) * (sx1 - sx0 + 3) + x - sx0], i = y * 320 + x; if (m === 2) B[i] = K.r; else if (m === 1) B[i] = K.l; else if (m === 3) B[i] = b_mezcla(B[i], K.l, 0.5);
    if (es(i)) { const wy = y + oy; if (wy > 96 && b_b4(x, y) < (wy - 96) / 40) B[i] = b_mezcla(B[i], bru, 0.45); } }
}

// el montón de cascotes del centro (la cima plana en x 154–166, y 121, donde se pone Doom), a contraluz: losas, trozos,
// varillas, una tubería rota y el filo encendido por el sol de detrás
const B_MONTON = [[106, 154], [114, 147], [121, 148], [127, 140], [134, 141], [140, 133], [146, 132], [150, 125], [154, 122], [166, 122], [170, 126], [176, 127], [181, 134], [188, 135], [194, 142], [201, 142], [207, 148], [216, 154]];

function b_monton(P) {
  const celda = (x, y) => h(Math.floor((x + Math.sin(y * 0.45) * 3) / 6), Math.floor((y + Math.sin(x * 0.31) * 2.5 + (x >> 4) * 2) / 5), 80);
  P.z(9); P.po([...B_MONTON, [216, 156], [106, 156]], (x, y) => { const c = celda(x, y); const borde = celda(x + 1, y) !== c || celda(x, y + 1) !== c; if (borde) return BC.cas0; if (celda(x, y - 1) !== c && c > 0.4) return BC.cantoS; return b_rampa([BC.cas0, BC.cas1, BC.cas2, BC.cas3, BC.cas4], 1 + c * 2.2 - (y - 122) * 0.045, x, y); });
  // la losa inclinada de la derecha y otra de la izquierda
  P.po([[176, 127], [196, 118], [199, 122], [182, 132]], (x, y) => (y < 121 + (196 - x) * 0.4 ? BC.cas3 : BC.cas2)); P.li(176, 127, 196, 118, BC.canto); P.li(196, 118, 199, 122, BC.cantoS);
  P.po([[118, 146], [128, 134], [133, 136], [124, 148]], BC.cas2); P.li(128, 134, 133, 136, BC.canto);
  for (const [a, b, w, hh, k] of [[138, 138, 12, 5, 0], [162, 132, 10, 4, 1], [148, 144, 14, 6, 2], [184, 140, 11, 5, 3]]) { P.po([[a, b + hh], [a + 2, b], [a + w, b - 2], [a + w + 2, b + hh - 1]], (x, y) => (y < b + 1 ? BC.cas4 : k & 1 ? BC.cas3 : BC.cas2)); P.li(a + 2, b, a + w, b - 2, BC.canto); P.p(a + w + 1, b + 1, BC.cas0); }
  // el filo encendido: los píxeles del montón con el cielo encima
  const D = P.D, B = P.B, ox = P.ox, oy = P.oy;
  for (let y = 116; y <= 156; y++) for (let x = 104; x <= 218; x++) { const sx = x - ox, sy = y - oy; if (sx < 0 || sx > 319 || sy < 1 || sy > 179) continue; const i = sy * 320 + sx; if (D[i] !== 9) continue; D[i] = 6;
    if (D[i - 320] !== 9 && D[i - 320] !== 6) B[i] = BC.bordeL; else if (sy > 1 && D[i - 640] !== 9 && D[i - 640] !== 6) B[i] = BC.canto; else if (sy > 2 && D[i - 960] !== 9 && D[i - 960] !== 6 && b_b4(sx, sy) < 0.5) B[i] = BC.cantoS; }
  P.z(6);
  for (const [a, b, c, d] of [[140, 133, 136, 124], [143, 132, 147, 122], [172, 126, 176, 117], [186, 135, 192, 128], [124, 147, 118, 139]]) { P.li(a, b, c, d, BC.hierroR); P.p(c, d, BC.hierroL); }
  P.rc(196, 136, 206, 139, BC.cas1); P.rc(196, 136, 206, 136, BC.cantoS); P.rc(206, 135, 207, 140, BC.cas0); P.p(207, 136, BC.canto);   // la tubería rota
  P.rc(154, 121, 166, 121, BC.bordeL);   // la cima plana
}

// un coche: tipo 0 volcado (las ruedas arriba), 1 aplastado y sin cristales, 2 lejos y en sombra; c 0 rojo, 1 azul
function b_coche(P, x, y, c, tipo) {
  const L = c ? BC.cocheAL : BC.cocheRL, M = c ? BC.cocheA : BC.cocheR, S = b_mezcla(M, BC.k, 0.4), luz = x < 160 ? 1 : -1;
  if (tipo === 2) { P.po([[x - 9, y], [x - 7, y - 4], [x - 3, y - 6], [x + 4, y - 6], [x + 7, y - 3], [x + 10, y], [x + 10, y + 1], [x - 9, y + 1]], BC.cas1); P.li(x - 7, y - 4, x + 4, y - 6, BC.cantoS); P.di(x - 5, y + 1, 1.5, BC.rueda); P.di(x + 6, y + 1, 1.5, BC.rueda); return; }
  if (tipo === 0) {
    P.po([[x - 15, y - 2], [x - 10, y], [x + 10, y], [x + 15, y - 2], [x + 16, y - 8], [x - 16, y - 8]], M);
    P.po([[x - 9, y - 1], [x - 6, y + 2], [x + 6, y + 2], [x + 9, y - 1]], BC.cristal); P.li(x - 5, y + 1, x + 5, y + 1, BC.cristalL);
    P.rc(x - 16, y - 10, x + 16, y - 8, S); P.rc(x - 16, y - 8, x + 16, y - 7, L);
    for (const dx of [-10, 10]) { P.di(x + dx, y - 11, 3.6, BC.rueda); P.di(x + dx, y - 11, 1.6, BC.farolaL); P.p(x + dx, y - 11, BC.k); }
    P.li(x - 16, y - 4, x + 16, y - 4, S); P.p(x + luz * 15, y - 5, BC.borde); P.p(x - luz * 15, y - 5, BC.cristalL);
    P.rc(x - 14, y + 2, x + 14, y + 3, BC.asf0);
  } else {
    P.po([[x - 15, y], [x - 15, y - 5], [x - 9, y - 6], [x - 5, y - 11], [x + 6, y - 10], [x + 10, y - 5], [x + 15, y - 4], [x + 15, y]], M);
    P.po([[x - 4, y - 10], [x + 5, y - 9], [x + 8, y - 6], [x - 7, y - 6]], BC.cristal); P.li(x - 3, y - 9, x + 5, y - 8, BC.cristalL); P.li(x, y - 10, x - 1, y - 6, M);
    P.li(x - 15, y - 5, x - 9, y - 6, L); P.li(x - 9, y - 6, x - 5, y - 11, L); P.li(x - 5, y - 11, x + 6, y - 10, L); P.p(x - 2, y - 9, BC.k); P.li(x - 12, y - 3, x + 13, y - 3, S);
    for (const dx of [-9, 9]) { P.di(x + dx, y, 3, BC.rueda); P.di(x + dx, y, 1.2, BC.farola); }
    P.p(x + 15 * luz, y - 3, BC.borde); P.p(x + 14 * luz, y - 4, BC.bordeL); P.rc(x - 13, y + 3, x + 13, y + 3, BC.asf0);
  }
}

// una farola doblada (dir hacia dónde cae la cabeza)
function b_farola(P, x, base, dir) {
  P.rc(x - 1, base - 1, x + 1, base, BC.k); P.li(x, base, x, base - 30, BC.farola); P.li(x + dir, base, x + dir, base - 30, BC.farolaL);
  P.li(x, base - 30, x + dir * 8, base - 40, BC.farola); P.li(x + dir * 8, base - 40, x + dir * 13, base - 36, BC.farola);
  P.rc(x + dir * 13 - 2, base - 36, x + dir * 13 + 2, base - 34, BC.k); P.rc(x + dir * 13 - 1, base - 34, x + dir * 13 + 1, base - 34, BC.farolaL);
}

// papeles que vuelan, girando (n, entre y0 e y1)
function b_papeles(P, t, n, y0, y1) {
  for (let k = 0; k < n; k++) { const u = ((t * (0.05 + k * 0.012) + k * 0.31) % 1), x = -10 + u * 340, y = y0 + (y1 - y0) * h(k, 1, 81) + Math.sin(t * 1.7 + k * 2) * 6, g = Math.floor(t * 4 + k) % 4;
    const w = g === 1 || g === 3 ? 1 : 2; P.rc(x - w, y - 1, x + w, y + 1, g === 2 ? BC.papelS : BC.papel); if (g === 0) P.p(x + w, y + 1, BC.papelS); }
}

// lo que se mueve en la ciudad, sobre el fondo fijo: nubes, cuervos, ojos y luces de los centinelas, el haz que barre
// el cielo, la palma que brilla, el fuego de las ventanas, el humo, las brasas, las farolas, los charcos y la luz de Doom
function b_ciudad(R, t, o = {}) {
  const ox = o.ox ?? 0, oy = o.oy ?? 0, F = b_fijo(R, 'ciudad' + ox + ',' + oy, (D) => b_ciudadFija(R, D, ox, oy));
  R.copiar(F.b);
  const P = b_pintor(R, F.d, ox, oy, false);
  // las bandas de nubes del atardecer: tres capas a tres velocidades, con el borde de abajo encendido por el sol
  P.z(0); P.calma(true);
  for (let k = 0; k < 13; k++) { const capa = k % 3, v = [0.8, 1.6, 2.8][capa], cy = [36, 52, 70][capa] + (h(k, 1, 82) - 0.5) * 12, w = 30 + h(k, 2, 82) * 40, cx = ((h(k, 3, 82) * 720 + t * v) % 720) - 200, th = 2 + capa;
    for (let i = 0; i < w; i++) { const x = cx + i, e = Math.sin(i / w * Math.PI), hh = Math.round(th * e + (h(i >> 2, k, 83) - 0.5) * 2); if (hh <= 0) continue;
      const cerca = Math.max(0, 1 - Math.abs(x - 160) / 130);
      for (let j = 0; j < hh; j++) { const y = Math.round(cy - j), c = j === 0 ? (cerca > 0.4 ? BC.nubeLL : BC.nubeL) : j === 1 && cerca > 0.3 ? BC.nubeL : j === hh - 1 ? BC.nubeS : BC.nube; if (b_b4(Math.round(x), y) < 0.2 + e) P.p(x, y, c); } } }
  // cuervos que planean lejos
  for (let k = 0; k < 5; k++) { const u = (t * 0.02 + k * 0.23) % 1, x = ox - 20 + u * 360 + Math.sin(t * 0.7 + k) * 6, y = oy + 40 + k * 7 + Math.sin(t * 1.3 + k) * 3, a = Math.floor(t * 3 + k) % 2;
    P.p(x, y, BC.cuervo); P.p(x - 1, y - a, BC.cuervo); P.p(x + 1, y - a, BC.cuervo); P.p(x - 2, y - 1 + a, BC.cuervo); P.p(x + 2, y - 1 + a, BC.cuervo); }
  // el haz del centinela del medio, que barre el cielo
  { const [sx, sy, s] = B_CIU.sent[1], a = -Math.PI / 2 - 0.55 + Math.sin(t * 0.35) * 0.75, ex = sx, ey = sy + 2 * s;
    for (let r = 10; r < 160; r++) for (let w = -r * 0.11; w <= r * 0.11; w++) { const x = ex + Math.cos(a) * r - Math.sin(a) * w, y = ey + Math.sin(a) * r + Math.cos(a) * w; const sxp = Math.round(x - ox), syp = Math.round(y - oy); if (b_b4(sxp, syp) < 0.75 - r / 240 - Math.abs(w) / (r * 0.3)) P.p(x, y, b_mezcla(R.pget(sxp, syp), BC.haz, 0.42)); } }
  P.calma(false);
  // los ojos de los centinelas: la ranura late y una chispa la recorre; las luces de los hombros; la palma que brilla
  P.z(3);
  for (const [k, [cx, yh, s, b]] of B_CIU.sent.entries()) { const w = Math.round(4.5 * s), y = Math.round(yh + s), pul = 0.5 + 0.5 * Math.sin(t * 2.2 + k * 2), c = b_mezcla(hex('#e050b0'), hex('#fff0ff'), pul), sp = Math.round(Math.sin(t * 1.4 + k) * w);
    for (let x = -w; x <= w; x++) P.p(cx + x, y, x === sp || x === sp + 1 ? BC.pinL : c);
    for (const d of [-1, 1]) if (Math.floor(t * 1.5 + k + d) % 3 === 0) P.p(cx + d * Math.round(14 * s), yh + Math.round(10 * s), hex('#ff8ae0'));
    if (b) { const hx = cx + Math.round(20 * s), hy = yh - Math.round(20 * s), g = 0.6 + 0.4 * Math.sin(t * 3);
      for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j) / 9; if (d < 1 && b_b4(hx + i - ox, hy + j - oy) < (1 - d) * g * 0.9) P.p(hx + i, hy + j, d < 0.35 ? hex('#ffe0f8') : hex('#e070c8')); } } }
  // la ranura del centinela lejano, que late apagada entre el humo
  { const [cx, yh, s] = B_LEJOS, w = Math.round(4.5 * s), y = Math.round(yh + s), c = b_mezcla(hex('#e050b0'), B_CIELO[5], 0.55 - 0.3 * Math.max(0, Math.sin(t * 1.7))); P.z(2); for (let x = -w; x <= w; x++) P.p(cx + x, y, c); }
  // a lo lejos, la batalla sigue: fogonazos entre los rascacielos (detrás de los edificios del medio), con su bocanada
  P.z(2); for (let k = 0; k < 6; k++) { const ciclo = 2.6 + k * 0.45, n = Math.floor((t + k * 1.3) / ciclo), u = ((t + k * 1.3) % ciclo) / 0.9; if (u > 1) continue;
    const x = -120 + h(k, n, 72) * 560, y = 96 + h(k, n, 73) * 20; if (Math.abs(x - 160) < 26) continue; const r = 1 + Math.sin(u * Math.PI) * 4;
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j) / r; if (d >= 1.6) continue; const sx = Math.round(x + i - ox), sy = Math.round(y + j - oy);
      if (d < 0.5 && u < 0.6) P.p(x + i, y + j, BC.fuegoL); else if (d < 1) P.p(x + i, y + j, u < 0.5 ? BC.fuego : BC.humoL); else if (b_b4(sx, sy) < (1.6 - d) * 0.6) P.p(x + i, y + j, b_mezcla(R.pget(sx, sy), BC.brasa, 0.4)); } }
  // un avión que cruza alto el cielo con sus luces de posición y su estela
  P.z(0); P.calma(true); { const u = (t / 16 + 0.3) % 1, x = -130 + u * 620, y = 30 + u * 8, lx = Math.round(x - ox);
    for (let i = 4; i < 34; i++) if (b_b4(lx - i, Math.round(y - oy)) < 0.5 - i / 80) P.p(x - i, y + i * 0.05, b_mezcla(R.pget(lx - i, Math.round(y + i * 0.05 - oy)), BC.papel, 0.35));
    P.li(x - 4, y, x + 3, y, BC.cuervo); P.li(x - 1, y - 2, x + 1, y + 2, BC.cuervo); P.p(x + 4, y, BC.cuervo); P.p(x - 4, y - 1, BC.cuervo); if (Math.floor(t * 2.5) % 2) { P.p(x - 1, y - 2, BC.rec); P.p(x + 1, y + 2, BC.pinL); } }
  P.calma(false);
  // el fuego de las ventanas y las columnas de humo que suben y se tuercen con el viento
  P.z(5);
  for (const [k, [fx, fy]] of B_FUEGOS.entries()) { const f = Math.sin(t * 9 + k * 3) + Math.sin(t * 5.3 + k); P.rc(fx, fy + 2, fx + 2, fy + 3, f > 0 ? BC.fuegoL : BC.fuego); P.p(fx + (f > 0.5 ? 0 : 2), fy + 1, BC.fuego); P.p(fx + 1, fy + 1 - (f > 1 ? 1 : 0), f > -0.5 ? BC.fuego : BC.fuegoS); }
  for (const [c, [bx, by]] of B_CIU.humo.entries()) for (let i = 0; i < 18; i++) { const u = (t * 0.05 + i / 18 + c * 0.13) % 1, cy = by - u * 84, cx = bx + u * u * 40 + Math.sin(t * 0.5 + i * 1.3) * 2, r = 3 + u * 11, den = (1 - u * 0.85) * 1.7;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const sx = x - ox, sy = y - oy; if (b_calma(sx, sy)) continue; if (b_b4(sx, sy) >= den * (1.15 - d)) continue;
      P.p(x, y, x - cx > r * 0.3 && y - cy < 0 ? BC.humoLL : d < 0.45 ? BC.humoS : u > 0.6 ? BC.humoL : BC.humo); } }
  // las farolas (una parpadea), los fuegos de la calle con su halo, los charcos que tiemblan y las brasas que suben
  P.z(6);
  if (Math.sin(t * 13) + Math.sin(t * 3.1) > 0.4) { P.p(228 - 13, 140 - 33, BC.fuegoL); P.p(228 - 14, 140 - 32, BC.solL); }
  for (const [k, [x, y]] of [[60, 128], [236, 127], [110, 131], [-50, 130], [350, 131]].entries()) { const f = Math.sin(t * 8 + k * 2), hh = 3 + Math.round(f + 1);
    for (let j = -8; j <= 4; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j * 1.3) / 8; if (d < 1 && b_b4(x + i - ox, y + j - oy) < (1 - d) * 0.5) P.p(x + i, y + j, b_mezcla(R.pget(x + i - ox, y + j - oy), BC.fuego, 0.35)); }
    for (let i = -2; i <= 2; i++) { const hi = hh - Math.abs(i) + (Math.sin(t * 11 + i + k) > 0 ? 1 : 0); P.li(x + i, y, x + i, y - hi, Math.abs(i) < 1 ? BC.fuegoL : BC.fuego); P.p(x + i, y - hi - 1, BC.fuegoS); } }
  for (const [cx, cy, rx] of [[96, 168, 10], [214, 162, 8], [300, 170, 11]]) for (let i = -rx + 2; i < rx - 2; i += 3) { const x = cx + i + Math.round(Math.sin(t * 2 + i) * 1.5); if (Math.sin(t * 3 + i * 0.7) > 0.2) P.p(x, cy, BC.solL); }
  for (let k = 0; k < 24; k++) { const u = (t * (0.07 + (k % 5) * 0.015) + k * 0.13) % 1, x = ox + (k * 37 % 330) + u * 30 + Math.sin(t * 2 + k) * 3, y = oy + 150 - u * 110; if (!b_calma(x - ox, y - oy) && u < 0.95) P.p(x, y, (k + Math.floor(t * 5)) % 3 ? BC.brasa : BC.brasaL); }
  // la luz de Doom en la cima del montón: halo que late, columna de luz, grietas verdes y chispas
  const dm = o.doom ?? 0;
  if (dm > 0) { const g = dm * (0.8 + 0.2 * Math.sin(t * 3)), [dx, dy] = [160, 118];
    for (let y = dy - 34; y <= dy + 30; y++) for (let x = dx - 40; x <= dx + 40; x++) { const d = Math.hypot(x - dx, (y - dy) * 1.25) / 40, sx = x - ox, sy = y - oy; if (d >= 1 || b_calma(sx, sy)) continue; if (b_b4(sx, sy) < (1 - d) * g * 0.85) P.p(x, y, b_mezcla(R.pget(sx, sy), d < 0.3 ? BC.doomL : BC.doomV, 0.3 + (1 - d) * 0.4)); }
    for (let y = 40; y < dy; y++) { const w = 2 + (dy - y) * 0.03; for (let x = Math.floor(dx - w); x <= dx + w; x++) if (b_b4(x - ox, y - oy) < g * (0.55 - Math.abs(x - dx) / (w * 2.5)) * (y - 40) / 80) P.p(x, y, BC.doomL); }
    for (const [a, b, c, d] of [[150, 126, 144, 134], [168, 126, 176, 134], [158, 124, 154, 138], [140, 136, 132, 142], [180, 136, 188, 140]]) if (b_b4(a, b) < dm) P.li(a, b, c, d, Math.sin(t * 4 + a) > 0 ? BC.doomV : BC.doomVS);
    for (let x = 154; x <= 166; x++) P.p(x, 121, BC.doomL);
    for (let k = 0; k < 10; k++) { const u = (t * 0.6 + k / 10) % 1, x = dx + Math.sin(k * 2.1 + t) * (6 + u * 14), y = dy - u * 30; if (b_b4(k, 3) < dm) P.p(x, y, u < 0.5 ? BC.doomL : BC.doomV); } }
  // el chorro de la boca de riego: gotas que suben, se abren con el viento y caen al charco
  { const [x, y] = B_RIEGO; P.z(6); for (let k = 0; k < 26; k++) { const u = (t * 1.1 + k / 26) % 1, a = -1.3 + (h(k, 1, 74) - 0.5) * 0.7, v = 30 + h(k, 2, 74) * 10;
    const px = x + Math.cos(a) * v * u * 0.9 + u * u * 6, py = y - 12 + Math.sin(a) * v * u + 40 * u * u; if (py > y + 1) continue; P.p(px, py, k % 3 ? hex('#a8d0e8') : BC.pinL); }
    for (let i = 0; i < 4; i++) if (Math.sin(t * 7 + i * 2) > 0) P.p(x - 8 + i * 5, y + 2, BC.pinL); }
  // papeles que vuelan por encima de la calle
  P.z(7); b_papeles({ p: (x, y, c) => P.p(x + ox, y + oy, c), rc: (a, b, c, d, e) => P.rc(a + ox, b + oy, c + ox, d + oy, e) }, t, 4, 110, 150);
}
// la pared del estudio de Atom: ladrillo pintado de azul pizarra (juntas, ladrillos de tono distinto, desconchones con
// el rojo de debajo), la luz cálida del flexo desde arriba a la izquierda y las zonas tranquilas con menos contraste;
// modo 'marcos': zócalo y tarima, y la silueta a lápiz y la chincheta de cada marco; modo 'pareja': una balda con
// objetos, notas adhesivas, tiras de cinta y un enchufe con su cable
function b_pared(R, D, modo) {
  const P = b_pintor(R, D, 0, 0, true), T = [BC.muro0, BC.muro1, BC.muro2, BC.muro3, BC.muro4, BC.muro5, BC.muro6];
  P.z(0); P.rc(0, 0, 319, 179, (x, y) => { const fila = Math.floor(y / 6), off = (fila & 1) * 6, bx = Math.floor((x + off) / 12), jy = y % 6, jx = (x + off) % 12, tr = b_calma(x, y);
    const L = Math.max(0, 1 - Math.hypot(x - 20, (y + 40) * 1.3) / 330), n = h(bx, fila, 90); let v = 1.3 + L * 3 + (n - 0.5) * (tr ? 0.3 : 0.8) - (y > 150 ? (y - 150) * 0.03 : 0);
    if (jy === 5 || jx === 11) return tr ? b_rampa(T, v - 0.5, x, y) : v > 3.2 ? BC.muro1 : BC.junta;
    if (!tr) { if (jy === 0) v += 0.45; else if (jy === 4) v -= 0.35; if (h(x, y, 91) < 0.05) v -= 0.6; if (n > 0.95 && h(x >> 1, y >> 1, 92) < 0.55) return h(x, y, 93) < 0.4 ? BC.rojoLS : BC.rojoL; }
    return b_rampa(T, v, x, y); });
  if (modo === 'marcos') {
    // el zócalo y la tarima con sus vetas
    P.rc(0, 166, 319, 170, BC.mad2); P.rc(0, 166, 319, 166, BC.mad4); P.rc(0, 170, 319, 170, BC.mad0);
    P.rc(0, 171, 319, 179, (x, y) => { const tabla = Math.floor((x + (y > 175 ? 20 : 0)) / 46); const v = 1.5 + (h(tabla, y > 175 ? 1 : 0, 94) - 0.5) + Math.sin(x * 0.3 + tabla * 2 + y) * 0.3; return (x + (y > 175 ? 20 : 0)) % 46 === 0 || y === 175 ? BC.mad0 : b_rampa([BC.mad0, BC.mad1, BC.mad2, BC.mad3], v, x, y); });
    // un alargador por la tarima, con su enchufe
    for (let x = 200; x < 320; x++) P.p(x, 177 + Math.round(Math.sin(x * 0.12) * 1.2), BC.k); P.rc(196, 174, 203, 178, BC.blancoMS); P.rc(197, 175, 202, 177, BC.blancoM); P.p(199, 176, BC.k); P.p(201, 176, BC.k);
    // la silueta a lápiz y la chincheta de cada marco (las tapa el póster cuando está puesto)
    for (const [i, [x0, y0, x1, y1]] of B_MARCOS.entries()) { for (let x = x0; x <= x1; x += 2) { P.p(x, y0, BC.lapiz); P.p(x, y1, BC.lapiz); } for (let y = y0; y <= y1; y += 2) { P.p(x0, y, BC.lapiz); P.p(x1, y, BC.lapiz); }
      const cx = Math.round((x0 + x1) / 2); P.p(cx, y0 + 1, BC.k); P.p(x0 + 2, y0 - 3, BC.lapiz); P.p(x0 + 2, y0 - 2, BC.lapiz); if (i % 3 === 1) P.rc(cx - 3, y1 + 2, cx + 3, y1 + 3, BC.cinta); }
    // dentro de cada hueco, el boceto a lápiz del plan: su número, el horizonte, las cabezas de la pareja y una flecha
    for (const [i, [x0, y0, x1, y1]] of B_MARCOS.entries()) { const num = String(i + 1), cx = Math.round((x0 + x1) / 2);
      [...num].forEach((d, j) => B_DIG[+d].forEach((f, fy) => { for (let fx = 0; fx < 3; fx++) if (f[fx] === '#') P.p(cx - num.length * 2 + 1 + j * 4 + fx, y0 + 6 + fy, BC.lapiz); }));
      for (let x = x0 + 3; x <= x1 - 3; x++) if ((x + i) % 3) P.p(x, y0 + 62 + Math.round(Math.sin(x * 0.5 + i) * 1.2), BC.lapiz);
      const cab = i === 5 ? [cx] : [x0 + 8, x1 - 8]; for (const hx of cab) { for (let a = 0; a < 6.3; a += 0.5) P.p(hx + Math.cos(a) * 4, y0 + 86 + Math.sin(a) * 4, BC.lapiz); P.li(hx, y0 + 91, hx, y0 + 100, BC.lapiz); P.li(hx - 4, y0 + 108, hx, y0 + 100, BC.lapiz); P.li(hx + 4, y0 + 108, hx, y0 + 100, BC.lapiz); }
      if (i % 2 === 0) { P.li(x0 + 5, y0 + 30, x1 - 6, y0 + 22, BC.lapiz); P.li(x1 - 6, y0 + 22, x1 - 9, y0 + 21, BC.lapiz); P.li(x1 - 6, y0 + 22, x1 - 8, y0 + 25, BC.lapiz); } }
    // la regla de marcas a lápiz de arriba, ahora tapada en parte por la guirnalda (cable, clavos y casquillos)
    for (let x = 30; x < 270; x += 30) { P.li(x, 40, x, 42, BC.lapiz); if ((x / 30) & 1) P.li(x + 15, 41, x + 15, 42, BC.lapiz); } P.li(30, 42, 268, 42, BC.lapiz);
    for (let a = 48; a <= 268; a += 44) { P.rc(a - 1, 22, a + 1, 23, BC.metal2); P.p(a, 24, BC.k); if (a < 266) for (let x = a; x <= a + 44; x++) { const y = 24 + Math.sin((x - a) / 44 * Math.PI) * 9; P.p(x, Math.round(y), BC.k); P.p(x, Math.round(y) + 4, b_mezcla(BC.muro1, BC.sombra, 0.4)); } }
    for (const [x, y] of B_GUIRNALDA) { P.p(x, y, BC.metal1); P.p(x, y + 1, BC.k); }
    // el flexo pinzado arriba a la izquierda (la luz cálida de la pared sale de aquí): pinza, brazo, muelle y pantalla
    P.rc(0, 0, 5, 3, BC.k); P.rc(0, 0, 4, 2, BC.metal1); P.li(3, 3, 9, 18, BC.metal0); P.li(4, 3, 10, 18, BC.metal2); for (let y = 6; y < 16; y += 2) P.p(6 + (y - 6) / 2.5, y, BC.metal3);
    P.po([[5, 17], [14, 15], [19, 27], [7, 31]], BC.k); P.po([[6, 18], [13, 16], [17, 26], [8, 29]], BC.metal0); P.li(6, 18, 13, 16, BC.metal2); P.li(7, 22, 9, 28, BC.metal1); P.li(8, 30, 18, 27, BC.foco); P.li(9, 31, 17, 28, BC.focoL);
    for (let j = 0; j < 14; j++) for (let i = -j; i <= j; i++) { const x = 14 + j + i * 0.6, y = 30 + j; if (b_b4(Math.round(x), y) < 0.28 - j * 0.018) P.p(x, y, b_mezcla(BC.muro4, BC.foco, 0.4)); }
    // la tira de cinta suelta y los dos agujeros de chincheta viejos
    P.li(276, 58, 282, 62, BC.cinta); P.li(276, 59, 282, 63, BC.cintaS); P.p(36, 34, BC.sombra); P.p(240, 36, BC.sombra);
  } else {
    // la balda de abajo con sus objetos: taza con lápices, cinta adhesiva, caja de chinchetas y tijeras
    P.rc(0, 170, 319, 179, (x, y) => (y === 170 ? BC.mad4 : y === 171 ? BC.mad3 : y > 176 ? BC.mad0 : b_rampa([BC.mad1, BC.mad2, BC.mad3], 1.4 + Math.sin(x * 0.21 + y * 1.3) * 0.5 + (h(x >> 3, y, 95) - 0.5) * 0.6, x, y)));
    for (let x = 0; x < 320; x++) P.p(x, 180, BC.sombra);
    P.rc(26, 156, 36, 169, BC.k); P.rc(27, 157, 35, 169, hex('#c84a3a')); P.rc(27, 157, 28, 169, hex('#e86a5a')); P.rc(36, 160, 38, 166, BC.k); P.rc(27, 168, 35, 169, hex('#8a2a24'));
    for (const [dx, c, hh] of [[29, BC.pinY, 9], [31, BC.pinA, 12], [33, BC.pinR, 8], [34, BC.pinV, 10]]) { P.li(27 + dx - 27, 156, 27 + dx - 27 + (dx & 1), 156 - hh, c); P.p(27 + dx - 27 + (dx & 1), 156 - hh, BC.k); }
    P.el(62, 165, 6, 4, BC.k); P.el(62, 165, 5, 3.2, BC.cinta); P.el(62, 165, 2, 1.4, BC.mad1); P.p(59, 163, BC.blancoM);
    P.rc(238, 162, 258, 169, BC.k); P.rc(239, 163, 257, 168, hex('#d8d0c0')); P.rc(239, 163, 257, 164, BC.blancoM);
    for (let k = 0; k < 8; k++) P.p(241 + k * 2, 166 + (k & 1), [BC.pinR, BC.pinA, BC.pinY, BC.pinV][k % 4]);
    P.li(274, 168, 292, 162, BC.metal3); P.li(274, 169, 292, 165, BC.metal2); P.di(270, 166, 2.2, hex('#3a6ad0')); P.di(271, 170, 2.2, hex('#3a6ad0')); P.p(270, 166, BC.mad1); P.p(271, 170, BC.mad1);
    // dos notas adhesivas con garabatos (un centinela y una flecha) y tiras de cinta
    const nota = (x, y, c, dib) => { P.rc(x + 1, y + 1, x + 15, y + 15, BC.sombra); P.rc(x, y, x + 14, y + 14, c); P.rc(x, y, x + 14, y + 2, b_mezcla(c, BC.k, 0.15)); dib(x, y); };
    nota(28, 66, BC.nota, (x, y) => { P.rc(x + 5, y + 4, x + 9, y + 7, BC.k); P.rc(x + 6, y + 5, x + 8, y + 5, BC.pinR); P.rc(x + 3, y + 8, x + 11, y + 12, BC.k); P.rc(x + 4, y + 9, x + 10, y + 11, BC.nota); });
    nota(48, 92, BC.notaV, (x, y) => { P.li(x + 3, y + 10, x + 11, y + 5, BC.k); P.li(x + 11, y + 5, x + 8, y + 5, BC.k); P.li(x + 11, y + 5, x + 11, y + 8, BC.k); });
    nota(244, 74, BC.notaR, (x, y) => { for (let i = 0; i < 6; i++) P.rc(x + 2 + (i % 3) * 4, y + 4 + Math.floor(i / 3) * 5, x + 4 + (i % 3) * 4, y + 7 + Math.floor(i / 3) * 5, i === 1 ? BC.pinV : BC.k); });
    for (const [x, y, a] of [[18, 40, 1], [70, 130, -1], [236, 120, 1], [258, 48, -1]]) { P.li(x, y, x + 9, y + a * 3, BC.cinta); P.li(x, y + 1, x + 9, y + 1 + a * 3, BC.cintaS); }
    // un trozo de corcho con fotos clavadas y un hilo rojo entre las chinchetas (como la pared de Atom del estudio)
    P.rc(14, 114, 86, 162, BC.mad1); P.rc(15, 115, 85, 161, (x, y) => b_rampa([hex('#8a6a3a'), hex('#a8844a'), hex('#c09a5a')], 1.2 + (h(x, y, 98) - 0.5) * 1.4, x, y));
    for (const [x, y, c1, c2] of [[20, 120, hex('#3a6ab0'), hex('#e8d8a0')], [46, 126, hex('#8a3a5a'), hex('#f0a060')], [24, 142, hex('#2a6a3a'), hex('#a8d8a0')], [58, 144, hex('#4a3a6a'), hex('#d85ab0')]]) {
      P.rc(x + 1, y + 1, x + 19, y + 14, BC.sombra); P.rc(x, y, x + 18, y + 13, BC.blancoM); P.rc(x + 2, y + 2, x + 16, y + 9, c1); P.rc(x + 2, y + 7, x + 16, y + 9, b_mezcla(c1, BC.k, 0.4)); P.di(x + 12, y + 5, 2, c2); P.p(x + 9, y, BC.pinR); P.p(x + 9, y - 1, BC.pinR); }
    P.li(29, 120, 55, 126, BC.pinR); P.li(55, 126, 33, 142, BC.pinR); P.li(33, 142, 67, 144, BC.pinR);
    // el flexo de pinza en la balda (base, brazo con muelle y pantalla) con su luz cálida en la pared, y unos cómics
    for (let y = 112; y < 168; y++) for (let x = 250; x < 320; x++) { const d = Math.hypot((x - 300) * 0.8, y - 112) / 58; if (d < 1 && b_b4(x, y) < (1 - d) * 0.42) P.p(x, y, b_mezcla(P.B[y * 320 + x], BC.foco, 0.22)); }
    P.el(312, 168, 6, 2, BC.k); P.el(312, 167.5, 5, 1.3, BC.metal1); P.li(312, 166, 316, 140, BC.metal0); P.li(313, 166, 317, 140, BC.metal2); P.li(316, 140, 304, 118, BC.metal0); P.li(317, 140, 305, 118, BC.metal2);
    for (let k = 0; k < 6; k++) P.p(315 - k * 0.4 + (k & 1), 160 - k * 3, BC.metal3); P.di(316.5, 140, 1.6, BC.metal1);
    P.po([[298, 112], [308, 110], [312, 120], [300, 124]], BC.k); P.po([[299, 113], [307, 111], [310, 119], [301, 122]], BC.metal0); P.li(299, 113, 307, 111, BC.metal2); P.li(300, 123, 311, 120, BC.foco); P.li(301, 124, 310, 121, BC.focoL);
    for (const [y, c, c2, w] of [[166, hex('#c83a3a'), hex('#e86a5a'), 12], [163, hex('#3a6ac8'), hex('#6a9ae8'), 11], [160, hex('#e8c040'), hex('#f8e080'), 12]]) { P.rc(292, y, 292 + w, y + 2, BC.k); P.rc(293, y, 291 + w, y + 1, c); P.rc(293, y, 291 + w, y, c2); P.p(292 + w - 2, y + 2, BC.blancoM); }
    // una entrada de cine pegada con cinta: troquel, una franja y el «26»
    P.rc(237, 105, 253, 113, BC.sombra); P.rc(236, 104, 252, 112, hex('#e8d8b0')); P.rc(236, 104, 252, 105, hex('#c84a3a')); for (let y = 104; y <= 112; y += 2) P.p(246, y, hex('#a89870'));
    ['2', '6'].forEach((d, j) => B_DIG[+d].forEach((f, fy) => { for (let fx = 0; fx < 3; fx++) if (f[fx] === '#') P.p(238 + j * 4 + fx, 107 + fy, BC.k); })); P.li(248, 108, 250, 108, BC.k); P.li(248, 110, 250, 110, BC.k);
    P.li(232, 103, 240, 106, BC.cinta);
    // el enchufe con su cable que baja a la balda
    P.rc(286, 120, 296, 132, BC.blancoMS); P.rc(287, 121, 295, 131, BC.blancoM); P.p(289, 125, BC.k); P.p(293, 125, BC.k); P.p(291, 128, BC.k);
    for (let y = 132; y < 170; y++) P.p(291 + Math.round(Math.sin(y * 0.2) * 1.5), y, BC.k);
  }
}
// el borde blanco de un marco (grosor g) con su chincheta arriba
function b_borde(R, x0, y0, x1, y1, g) {
  const B = R.buf, pon = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };
  for (let k = 0; k < g; k++) { for (let x = x0 + k; x <= x1 - k; x++) { pon(x, y0 + k, k ? BC.blancoMS : BC.blancoM); pon(x, y1 - k, k ? BC.blancoMS : BC.blancoM); } for (let y = y0 + k; y <= y1 - k; y++) { pon(x0 + k, y, k ? BC.blancoMS : BC.blancoM); pon(x1 - k, y, k ? BC.blancoMS : BC.blancoM); } }
  const cx = Math.round((x0 + x1) / 2), c = [BC.pinR, BC.pinA, BC.pinY, BC.pinV][(x0 >> 2) % 4];
  pon(cx - 1, y0 + 1, BC.k); pon(cx, y0 + 1, BC.k); pon(cx + 1, y0 + 1, BC.k); pon(cx - 1, y0, c); pon(cx, y0, c); pon(cx + 1, y0, c); pon(cx, y0 - 1, c); pon(cx - 1, y0 - 1, b_mezcla(c, BC.pinL, 0.5)); pon(cx, y0 + 2, BC.sombra);
}

// la sombra de un marco en la pared (abajo y a la derecha)
function b_sombraMarco(R, x0, y0, x1, y1, g) { const B = R.buf; for (let y = y0 + g; y <= y1 + g; y++) for (let x = x0 + g; x <= x1 + g; x++) { if ((x <= x1 && y <= y1) || x > 319 || y > 179) continue; const i = y * 320 + x; B[i] = b_mezcla(B[i], BC.sombra, 0.55); } }

// los once marcos en la pared: la ciudad dentro (la misma, viva), la pared entre ellos, las chinchetas, las esquinas
// que se levantan y el póster que cae
function b_marcos(R, t, o) {
  const n = b_puestos(o), cae = b_cae(o, n), off = b_aparte(R, 'ciudad');
  const prev = R.usar(off); b_ciudad(R, t, { oy: 4, doom: o.doom ?? 1 }); R.usar(prev);
  R.copiar(b_fijo(R, 'pared-marcos', (D) => b_pared(R, D, 'marcos')).b);
  b_motas(R, t, 0, 0, 270, 44, 10);
  const B = R.buf;
  for (let i = 0; i < n; i++) { if (cae && i === cae.i) continue; const [x0, y0, x1, y1] = B_MARCOS[i];
    b_sombraMarco(R, x0, y0, x1, y1, 2); b_copiaZona(R, off, x0 + 1, y0 + 1, x1 - 1, y1 - 1); b_borde(R, x0, y0, x1, y1, 1);
    // la esquina de abajo a la derecha que se levanta un poco de vez en cuando
    const lev = Math.max(0, Math.sin(t * 0.9 + i * 1.7) * 3 - 1.2); for (let j = 0; j < lev; j++) for (let k = 0; k <= j; k++) B[(y1 - j) * 320 + x1 - k] = k === j ? BC.blancoMS : b_mezcla(BC.blancoM, BC.cinta, 0.4); }
  // las bombillas de la guirnalda de arriba, que se encienden en ola
  for (const [k, [x, y]] of B_GUIRNALDA.entries()) { const on = Math.sin(t * 2.2 - k * 0.7) > -0.2, c = [BC.pinR, BC.pinY, BC.pinV, BC.pinA][k % 4];
    R.pset(x, y + 1, on ? c : b_mezcla(c, BC.muro0, 0.6)); R.pset(x, y + 2, on ? b_mezcla(c, BC.pinL, 0.5) : b_mezcla(c, BC.muro0, 0.7));
    if (on) for (const [dx, dy] of [[-1, 1], [1, 1], [0, 3], [-1, 2], [1, 2]]) R.pset(x + dx, y + dy, b_mezcla(R.pget(x + dx, y + dy), c, 0.35)); }
  if (cae) b_posterCae(R, cae.i, cae.k);
}
// el póster i que se suelta de su chincheta derecha, gira sobre la izquierda y cae (u 0–1); lee la ciudad del búfer aparte
function b_posterCae(R, i, u) {
  const off = b_aparte(R, 'ciudad'), [x0, y0, x1, y1] = B_MARCOS[i], w = x1 - x0, hh = y1 - y0, B = R.buf;
  let a, dx = 0, dy = 0; if (u < 0.3) a = (u / 0.3) ** 2 * 0.4; else { const v = (u - 0.3) / 0.7; a = 0.4 + v * 0.5; dy = v * v * 120; dx = v * 10; }
  const ca = Math.cos(a), sa = Math.sin(a), px = x0 + dx, py = y0 + dy;
  for (let y = Math.max(0, Math.floor(py - 2)); y <= Math.min(179, py + hh + w + 2); y++) for (let x = Math.max(0, Math.floor(px - hh)); x <= Math.min(319, px + w + 2); x++) {
    const X = x - px, Y = y - py, lx = X * ca + Y * sa, ly = -X * sa + Y * ca; if (lx < 0 || lx > w || ly < 0 || ly > hh) continue;
    const i2 = y * 320 + x; B[i2] = lx < 1 || lx > w - 1 || ly < 1 || ly > hh - 1 ? BC.blancoM : off[(y0 + Math.round(ly)) * 320 + x0 + Math.round(lx)]; }
  if (u < 0.3) { B[(y0) * 320 + x0 + 1] = BC.pinR; B[(y0 + 1) * 320 + x0 + 1] = BC.k; }
}

// motas de polvo que flotan en la luz (en el rectángulo x0–x1, y0–y1)
function b_motas(R, t, x0, y0, x1, y1, n) { for (let k = 0; k < n; k++) { const x = x0 + ((h(k, 1, 96) * (x1 - x0) + t * (1 + k % 3)) % (x1 - x0)), y = y0 + ((h(k, 2, 96) * (y1 - y0) + Math.sin(t * 0.7 + k) * 4 + t * 0.6) % (y1 - y0)); if (!b_calma(x, y) && Math.sin(t * 2 + k) > -0.3) R.pset(Math.round(x), Math.round(y), b_mezcla(R.pget(x, y), BC.focoL, 0.5)); } }

// la silueta de la Bestia (grande, encorvada, peluda): ¿está (x, y) dentro?
function b_bestia(x, y) {
  const e = (cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2, c = (ax, ay, bx, by, r) => { const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy))); return Math.hypot(x - ax - vx * u, y - ay - vy * u) / r; };
  const v = Math.min(e(160, 118, 20, 22), e(160, 104, 25, 12), e(160, 91, 8.5, 8), c(138, 104, 131, 140, 6.5), c(182, 104, 189, 140, 6.5), e(130, 146, 7, 6), e(190, 146, 7, 6), c(150, 132, 145, 154, 7.5), c(170, 132, 175, 154, 7.5), e(144, 157, 9, 3), e(176, 157, 9, 3), c(153, 86, 151, 79, 2.2), c(167, 86, 169, 79, 2.2));
  return v < 1 + (h(x >> 1, y >> 1, 97) - 0.5) * 0.3;
}

// un póster de cerca (y el de la silueta recortada)
function b_pareja(R, t, o, ausente) {
  const k = Math.max(0, Math.min(10, Math.round(o.k ?? (ausente ? 9 : 0)))), [mx0, my0, mx1, my1] = B_MARCOS[k], ox = Math.round((mx0 + mx1) / 2) - 160, off = b_aparte(R, 'ciudad');
  const prev = R.usar(off); b_ciudad(R, t, { ox, oy: 8, doom: o.doom ?? 1 }); R.usar(prev);
  const W = b_fijo(R, 'pared-pareja', (D) => b_pared(R, D, 'pareja')).b; R.copiar(W);
  const [x0, y0, x1, y1] = V_BATALLA.pareja.general.geo.marco, B = R.buf;
  b_sombraMarco(R, x0, y0, x1, y1, 3); b_copiaZona(R, off, x0 + 2, y0 + 2, x1 - 2, y1 - 2);
  if (ausente) {
    // el hueco recortado: la pared (en la sombra del papel) y un filo blanco de papel cortado
    for (let y = 76; y <= 162; y++) for (let x = 118; x <= 202; x++) { if (!b_bestia(x, y)) { if (b_bestia(x - 1, y) || b_bestia(x + 1, y) || b_bestia(x, y + 1) || b_bestia(x, y - 1)) B[y * 320 + x] = BC.blancoM; continue; }
      const i = y * 320 + x, sm = !b_bestia(x - 2, y - 2) || !b_bestia(x - 1, y - 3); B[i] = b_mezcla(W[i], BC.sombra, sm ? 0.6 : 0.25); }
    const ch = V_BATALLA.pareja.ausente.geo.chincheta; R.pset(ch[0], ch[1], BC.pinR); R.pset(ch[0] + 1, ch[1], BC.pinR); R.pset(ch[0] + 2, ch[1] - 1, BC.metal3); R.pset(ch[0] + 3, ch[1] - 1, BC.metal2); if (Math.sin(t * 2) > 0.6) R.pset(ch[0], ch[1] - 1, BC.pinL);
  }
  b_borde(R, x0, y0, x1, y1, 2);
  // (ausente) la esquina de arriba a la derecha, sin su chincheta: la pared asoma y la solapa doblada tiembla
  if (ausente) { const L = 9 + Math.round(Math.sin(t * 2.3) * 1.5 + Math.sin(t * 5.1) * 0.6);
    for (let b = 0; b < L + 2; b++) for (let a = 0; a < L + 2; a++) { const x = x1 - a, y = y0 + b, i = y * 320 + x;
      if (a + b < L) B[i] = W[i]; else if (a < L && b < L) B[i] = a + b === L || a === L - 1 || b === L - 1 ? BC.blancoMS : b_b4(x, y) < 0.3 + (a + b - L) / L * 0.5 ? BC.cintaS : BC.cinta; else if (a + b < 2 * L + 1 && (a === L || b === L)) B[i] = b_mezcla(B[i], BC.sombra, 0.4); } }
  // la araña que sube y baja de su hilo, y las motas en la luz
  { const ay = Math.round(56 + Math.sin(t * 0.5) * 20); for (let y = 0; y < ay; y++) if (y % 2 === 0) R.pset(240, y, b_mezcla(R.pget(240, y), BC.muro6, 0.6)); R.rect(239, ay, 241, ay + 1, BC.k); for (const d of [-1, 1]) { R.pset(240 + d * 2, ay - 1 + (Math.floor(t * 4) & 1), BC.k); R.pset(240 + d * 2, ay + 2, BC.k); } }
  b_motas(R, t, 0, 22, 96, 150, 12);
  // una polilla que da vueltas a la luz del flexo de la balda
  { const a = t * 2.1, x = Math.round(296 + Math.cos(a) * 9 + Math.sin(t * 5.3) * 2), y = Math.round(126 + Math.sin(a * 1.3) * 5), al = Math.floor(t * 14) % 2;
    R.pset(x, y, hex('#8a7a62')); R.pset(x + 1, y, hex('#6a5a48')); R.pset(x - 1, y - al, hex('#c8b898')); R.pset(x + 2, y - al, hex('#c8b898')); }
  return k;
}
// la máscara de Doom del canon (la de do-comun.js, e_mascara): centro cx, cy; s ≥ 2 de unos 9·s px de alto, con frente,
// ceja, rendijas de los ojos (o.ojos 0–1 su brillo), nariz con arista, rejilla de la boca, remaches, la franja de brillo
// que la recorre (o.brillo 0–1) y o.capucha (la capucha verde detrás); o.rayas: arañazos; o.luz 0–1 la oscurece si es poca
function b_mascara(R, cx, cy, s, o = {}) {
  const { pset } = R; cx = Math.round(cx); cy = Math.round(cy);
  const H = 4.5 * s, W = 3.6 * s, luz = o.luz ?? 1, os = (c) => (luz >= 1 ? c : b_mezcla(c, BC.k, (1 - luz) * 0.55));
  const dentro = (u, v) => v < -0.15 ? u * u + ((v + 0.15) / 0.85) ** 2 < 1 : v < 1 && Math.abs(u) < 1 - (v + 0.15) * 0.38;
  if (o.capucha) {
    for (let y = Math.floor(cy - H * 1.75); y <= Math.ceil(cy + H * 1.6); y++) for (let x = Math.floor(cx - W * 1.75); x <= Math.ceil(cx + W * 1.75); x++) {
      const u = (x - cx) / W, v = (y - cy) / H, pico = v < -1 ? Math.abs(u) < (v + 1.75) * 1.4 : true, e = (u / 1.65) ** 2 + ((v + 0.05) / 1.6) ** 2;
      if (e > 1 || !pico || v > 1.55) continue;
      const pl = Math.sin(u * 5.5 + v * 1.2), din = (u / 1.25) ** 2 + ((v + 0.05) / 1.25) ** 2 < 1;
      let c = din ? BC.capaD : pl > 0.55 ? BC.capaL : pl > -0.3 ? BC.capa : BC.capaS; if (e > 0.88) c = BC.k; else if (!din && u > 0.7 && b_b4(x, y) < 0.5) c = BC.capaS;
      if (s >= 4 && !din && e < 0.88 && (h(x >> 1, y >> 2, 150) < 0.06)) c = BC.capaS;
      pset(x, y, os(c));
    }
  }
  const brillo = o.brillo ?? -1, ojos = o.ojos ?? 0.6, RAY = [[-0.6, -0.7, -0.1, -0.5], [0.2, 0.05, 0.6, 0.3], [-0.5, 0.2, -0.25, 0.42], [0.35, -0.75, 0.55, -0.55]];
  for (let y = Math.floor(cy - H); y <= Math.ceil(cy + H); y++) for (let x = Math.floor(cx - W); x <= Math.ceil(cx + W); x++) {
    const u = (x - cx) / W, v = (y - cy) / H; if (!dentro(u, v)) continue;
    const du = 1 / W, dv = 1 / H; if (!dentro(u - du, v) || !dentro(u + du, v) || !dentro(u, v - dv) || !dentro(u, v + dv)) { pset(x, y, BC.k); continue; }
    let l = 0.62 - u * 0.42 - v * 0.12 + (b_b4(x, y) - 0.5) * 0.18; let c;
    if (v > -0.42 && v < -0.33) l += 0.25;
    if (Math.abs(u) < 0.09 && v > -0.3 && v < 0.3) l += u < 0 ? 0.35 : -0.1;
    if (Math.abs(brillo - (u * 0.5 + 0.5 + v * 0.25)) < 0.06) l += 0.45;
    if (o.rayas) for (const [a, b, c2, d] of RAY) { const vx = c2 - a, vy = d - b, q = Math.max(0, Math.min(1, ((u - a) * vx + (v - b) * vy) / (vx * vx + vy * vy))); const dd = Math.hypot(u - a - vx * q, v - b - vy * q); if (dd < 0.022) l += 0.3; else if (dd < 0.05 && v > b + vy * q) l -= 0.18; }
    if (s >= 4) l += (h(x >> 1, y >> 1, 151) - 0.5) * 0.12;
    c = l > 0.95 ? BC.m4 : l > 0.7 ? BC.m3 : l > 0.42 ? BC.m2 : l > 0.2 ? BC.m1 : BC.m0;
    if (v > -0.3 && v < -0.17 && Math.abs(u) > 0.18 && Math.abs(u) < 0.7 - (v + 0.3) * 0.6) c = ojos > 0.5 && Math.abs(u) > 0.3 && Math.abs(u) < 0.55 ? b_mezcla(BC.k, BC.ojo, ojos * 0.7) : BC.k;
    if (v > 0.48 && v < 0.64 && Math.abs(u) < 0.42) c = (x - cx) % 2 === 0 ? BC.k : BC.m1;
    if (s >= 3 && ((Math.abs(Math.abs(u) - 0.8) < 0.07 && Math.abs(v + 0.05) < 0.05) || (Math.abs(Math.abs(u) - 0.68) < 0.07 && Math.abs(v - 0.55) < 0.05))) c = BC.m4;
    if (s >= 5 && ((Math.abs(Math.abs(u) - 0.8) < 0.07 && Math.abs(v + 0.05 - 0.07) < 0.03) || (Math.abs(Math.abs(u) - 0.68) < 0.07 && Math.abs(v - 0.62) < 0.03))) c = BC.m0;
    pset(x, y, os(c));
  }
}

// una cifra de 3 × 5 px (1, 2 o 3) a mano, para la pizarra (sin depender de la fuente)
const B_CIFRAS = { 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'] };

function b_cifra(P, d, x, y, c) { B_CIFRAS[d].forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') P.p(x + i - 1, y + j - 2, c); }); }

// un técnico pequeño (unos 10 px) de pie o andando: cabeza, cascos, camiseta, pantalón y zapatillas; o.carga: lleva
// un foco al hombro; o.brazo: un brazo arriba que se mueve
function b_tecnico(P, x, suelo, t, o = {}) {
  const paso = o.anda ? Math.floor(t * 5 + x) % 2 : 0, d = o.dir ?? 1, c = o.color ?? BC.camiseta; x = Math.round(x);
  P.li(x - 1, suelo - 3, x - 1 - paso * d, suelo, BC.k); P.li(x + 1, suelo - 3, x + 1 + paso * d, suelo, BC.k); P.p(x - 1 - paso * d - (d < 0 ? 1 : 0), suelo, BC.pinL); P.p(x + 1 + paso * d + (d > 0 ? 1 : 0), suelo, BC.pinL);
  P.rc(x - 3, suelo - 8, x + 3, suelo - 4, BC.k); P.rc(x - 2, suelo - 8, x + 2, suelo - 4, c); P.p(x - 3 * d, suelo - 6, BC.piel); P.rc(x - 2, suelo - 8, x + 2, suelo - 8, b_mezcla(c, BC.pinL, 0.25)); P.rc(x - 1, suelo - 3, x + 1, suelo - 3, hex('#2a3a5a'));
  P.di(x, suelo - 10, 1.6, BC.piel); P.p(x - d, suelo - 11, BC.k); P.p(x, suelo - 12, BC.k); P.p(x + d, suelo - 11, BC.k); P.p(x + d * 2, suelo - 10, BC.k);
  if (o.carga) { P.li(x - 3 * d, suelo - 9, x + 6 * d, suelo - 14, BC.metal1); P.rc(x + 5 * d - 1, suelo - 17, x + 5 * d + 2, suelo - 13, BC.k); }
  if (o.brazo) { const a = Math.sin(t * 3) * 2; P.li(x + d * 2, suelo - 8, x + d * 3, suelo - 12 + a, BC.piel); } else P.li(x + d * 2, suelo - 7, x + d * 2, suelo - 5, BC.pielS);
}

// hojas secas que caen dando vueltas (n; capa 0 detrás, 1 delante)
function b_hojasCaen(P, t, n, capa) {
  for (let k = 0; k < n; k++) { const v = 0.06 + (k % 4) * 0.015, u = (t * v + h(k, capa, 152)) % 1, x = 20 + h(k, 3 + capa, 152) * 280 + Math.sin(t * 1.6 + k * 2) * 8, y = 26 + u * 154, g = Math.floor(t * 5 + k) % 4;
    if (b_calma(x, y)) continue; const c = [BC.hoja4, BC.hoja3, BC.hoja2][k % 3]; P.p(x, y, c); if (g < 2) P.p(x + 1, y, c); else P.p(x, y + 1, BC.hoja1); }
}

// la parrilla de celosía del techo (y0 su cordón de arriba) de x0 a x1, en tonos apagados
function b_celosia(P, x0, x1, y0) { x1 = Math.min(x1, 272); P.rc(x1, y0 - 1, x1 + 2, y0 + 6, BC.celos0); P.rc(x0, y0, x1, y0, BC.celos1); P.rc(x0, y0 + 5, x1, y0 + 5, BC.celos1); for (let x = x0; x < x1; x += 6) { P.li(x, y0, x + 3, y0 + 5, BC.celos0); P.li(x + 3, y0 + 5, x + 6, y0, BC.celos0); } for (let x = x0; x <= x1; x += 2) if (h(x, y0, 153) < 0.3) P.p(x, y0, BC.celos2); }

// un foco colgado (fresnel) en x bajo la parrilla, con su lente del color gel
function b_focoColgado(P, x, y, gel, apagado) {
  P.rc(x - 1, y - 4, x + 1, y, BC.celos1); P.li(x - 5, y + 1, x - 5, y + 6, BC.celos1); P.li(x + 5, y + 1, x + 5, y + 6, BC.celos1); P.rc(x - 5, y, x + 5, y, BC.celos1);
  P.rc(x - 4, y + 2, x + 4, y + 9, BC.k); P.rc(x - 3, y + 3, x + 3, y + 8, BC.negro3); P.rc(x - 3, y + 3, x - 2, y + 8, BC.metal0); P.rc(x + 4, y + 4, x + 5, y + 6, BC.negro2);
  P.li(x - 5, y + 10, x - 7, y + 13, BC.negro3); P.li(x + 5, y + 10, x + 7, y + 13, BC.negro3); P.rc(x - 3, y + 10, x + 3, y + 10, apagado ? BC.negro3 : gel); if (!apagado) { P.rc(x - 1, y + 10, x + 1, y + 10, BC.focoL); P.p(x, y + 11, gel); }
}

// EL PLATÓ (fijo): techo, parrilla, focos, ciclorama, paredes, puerta, burro, escalera, suelo, foco de trípode, carro,
// sillas, base de la grúa, mesa y baúl de la máscara; z: 0 fondo, 1 suelo, 3 muebles (los técnicos van en z 2)
function b_platoFijo(R, D) {
  const P = b_pintor(R, D, 0, 0, true);
  P.z(0); P.rc(0, 0, 319, 179, (x, y) => (y < 26 ? ((x + y * 3) % 7 === 0 && !b_calma(x, y) ? BC.techoL : BC.techo) : BC.negro0));
  b_celosia(P, 0, 319, 22);
  // las paredes negras de espuma acústica (cuñas en damero)
  for (const [a, b] of [[0, 23], [239, 319]]) P.rc(a, 26, b, 151, (x, y) => { const bx = Math.floor(x / 8), by = Math.floor(y / 8), dir = (bx + by) & 1, f = dir ? (x % 8) / 8 : (y % 8) / 8; return b_rampa([BC.negro0, BC.negro1, BC.negro2, BC.negro3], 0.6 + f * 2.2, x, y); });
  // el ciclorama: el paño verde con la curva y el suelo verde, juntas, arrugas, cruces y las manchas de luz
  const luzCroma = (x, y) => { let l = 0; for (const [fx, fy, r] of [[70, 70, 70], [150, 60, 64], [206, 84, 50]]) l += Math.max(0, 1 - Math.hypot(x - fx, (y - fy) * 1.2) / r) * 0.8;
    for (const lx of [44, 100, 150, 200]) { const w = (y - 36) * 0.32; if (w > 0 && Math.abs(x - lx) < w) l += 0.45 * (1 - Math.abs(x - lx) / w) * Math.max(0, 1 - (y - 36) / 110); } return l; };
  P.rc(24, 26, 238, 151, (x, y) => { const borde = Math.min(x - 24, 238 - x); let v = 2.2 + luzCroma(x, y) * 2.4 - Math.max(0, 6 - borde) * 0.3 + (h(x >> 2, y >> 3, 154) - 0.5) * 0.35;
    if (y > 128 && y <= 138) v += 0.9 - Math.abs(y - 133) * 0.15; else if (y > 138) v -= 0.5 + (y - 138) * 0.05;
    if (y <= 128 && (x - 24) % 36 === 0) v -= 1.1; else if (y <= 128 && (x - 24) % 36 === 1) v += 0.4; if (Math.abs(((x * 0.6 + y) % 47) - 2) < 0.6 && h(x >> 4, y >> 4, 155) < 0.4) v += 0.6;
    return b_rampa([BC.croma0, BC.croma1, BC.croma2, BC.croma3, BC.croma4, BC.croma5, BC.croma6], v, x, y); });
  for (let x = 24; x <= 238; x++) if (x & 1) P.p(x, 152, BC.croma0);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const x = 40 + i * 30 + (j & 1) * 15, y = 42 + j * 24; if (x > 232) continue; const c = (i + j) % 2 ? BC.cruzL : BC.cruzS; P.li(x - 2, y, x + 2, y, c); P.li(x, y - 2, x, y + 2, c); }
  // la difusora (un bastidor con seda blanca) colgada de la parrilla con sus vientos, bajo el foco de la derecha
  for (const [a, b] of [[162, 160], [196, 196], [230, 232]]) P.li(a, 46, b, 27, BC.celos1);
  P.po([[162, 46], [230, 46], [228, 67], [164, 67]], (x, y) => { const pl = Math.sin((x - 162) * 0.35) * 0.5 + (h(x >> 2, y >> 2, 157) - 0.5) * 0.3, f = 0.5 + pl * 0.2 + Math.max(0, 1 - Math.hypot(x - 200, y - 46) / 30) * 0.3;
    return b_b4(x, y) < f ? (f > 0.75 ? BC.focoL : BC.pinL) : b_mezcla(BC.croma4, BC.pinL, 0.55); });
  P.li(162, 46, 230, 46, BC.metal2); P.li(162, 47, 230, 47, BC.metal0); P.li(164, 67, 228, 67, BC.metal0); P.li(162, 46, 164, 67, BC.metal1); P.li(230, 46, 228, 67, BC.metal1);
  for (const [x, y] of [[162, 46], [230, 46], [164, 67], [228, 67], [196, 46]]) P.rc(x - 1, y - 1, x + 1, y + 1, BC.k);
  // al pie del ciclorama: sacos de arena, una banderola negra en su pie (C-stand), cajas de manzana y un rollo de cinta
  P.z(3);
  for (const x of [40, 56, 182, 230]) { P.el(x, 150, 5, 2.4, BC.k); P.el(x, 149.5, 4, 1.6, hex('#8a6a3a')); P.p(x - 2, 149, hex('#b8945a')); }
  P.li(190, 100, 190, 151, BC.metal2); P.li(190, 140, 182, 152, BC.metal1); P.li(190, 140, 198, 152, BC.metal1); P.li(190, 140, 190, 152, BC.metal1); P.li(190, 104, 172, 100, BC.metal2);
  P.el(174, 100, 6, 8, BC.k); P.el(174, 100, 5, 7, (x, y) => ((x * 2 + y) % 5 ? hex('#b8902e') : hex('#e8c860'))); P.el(173, 98, 1.5, 2.5, hex('#f0dc90')); P.li(180, 102, 190, 104, BC.metal2); P.di(190, 104, 1.5, BC.metal3);
  for (const [x0, y0, w, hh] of [[86, 142, 14, 8], [88, 134, 10, 8]]) { P.rc(x0, y0, x0 + w, y0 + hh, BC.k); P.rc(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, BC.mad3); P.rc(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, BC.mad4); P.rc(x0 + 4, y0 + 3, x0 + w - 4, y0 + 4, BC.mad1); }
  P.z(0);
  // los focos colgados de la parrilla (el de la máscara, apagado; lo enciende o.mascara)
  [[44, BC.gel1], [100, BC.foco], [150, BC.gel2], [200, BC.foco]].forEach(([x, g]) => b_focoColgado(P, x, 28, g)); b_focoColgado(P, 262, 28, BC.foco, true);
  // la puerta de carga con su barra y la bombilla de encima; el burro de vestuario; la escalera
  P.rc(2, 90, 21, 151, BC.k); P.rc(3, 91, 20, 151, hex('#3a3c46')); P.rc(3, 91, 20, 92, hex('#5a5c68')); P.li(11, 92, 11, 151, BC.negro2); P.rc(4, 120, 19, 122, BC.metal1); P.rc(4, 120, 19, 120, BC.metal3); P.rc(6, 96, 9, 110, BC.negro1);
  P.rc(9, 84, 14, 86, BC.metal0);
  P.rc(266, 100, 300, 101, BC.metal2); P.li(268, 101, 268, 150, BC.metal1); P.li(298, 101, 298, 150, BC.metal1); P.rc(264, 150, 302, 151, BC.metal0); for (const x of [266, 300]) P.di(x, 152, 1.5, BC.k);
  [[271, BC.capa, BC.capaS, 38], [278, hex('#7a2a8a'), hex('#4a1a5a'), 32], [285, BC.capa, BC.capaS, 42], [292, hex('#a83030'), hex('#6a1a1a'), 30]].forEach(([x, c, cs, L]) => { P.li(x - 1, 100, x, 97, BC.metal2); P.po([[x - 4, 102], [x + 4, 102], [x + 6, 102 + L], [x - 6, 102 + L]], (px, py) => (Math.sin(px * 1.3) > 0.3 ? cs : c)); P.rc(x - 4, 102, x + 4, 103, b_mezcla(c, BC.pinL, 0.2)); });
  for (const [a, b] of [[304, 312]]) { P.li(a, 50, a - 4, 151, BC.metal1); P.li(b, 50, b - 4, 151, BC.metal1); for (let y = 56; y < 150; y += 9) P.li(a - (y - 50) / 25, y, b - (y - 50) / 25, y, BC.metal2); }
  // el suelo de hormigón pulido: tonos, rozaduras, el reflejo del croma y de los focos, marcas de cinta y cables
  P.z(1); P.rc(0, 152, 319, 179, (x, y) => { let v = 1.6 + (h(x >> 2, y, 156) - 0.5) * 0.7 + (y - 152) * 0.02; if (x > 24 && x < 238 && y < 166 && b_b4(x, y) < 0.35 - (y - 152) * 0.025) return BC.croma1; if (h(x, y >> 1, 157) < 0.03) v += 1.2; return b_rampa([BC.suelo0, BC.suelo1, BC.suelo2, BC.suelo3, BC.suelo4], v, x, y); });
  for (const [x, y, c] of [[124, 166, BC.cinta1], [186, 168, BC.cinta3], [210, 174, BC.cinta2], [60, 172, BC.cinta1]]) { P.rc(x - 3, y, x + 3, y, c); P.rc(x, y, x, y + 3, c); }
  // la vía del travelling por el suelo: traviesas de madera, dos raíles con brillo y sus topes
  for (let x = 130; x <= 236; x += 7) { P.rc(x, 163, x + 3, 171, BC.k); P.rc(x, 164, x + 3, 170, BC.mad2); P.rc(x, 164, x + 3, 164, BC.mad3); }
  for (const y of [165, 169]) { P.li(128, y, 238, y, BC.metal3); P.li(128, y + 1, 238, y + 1, BC.metal0); } for (const x of [128, 238]) P.rc(x - 1, 164, x + 1, 171, hex('#c8a040'));
  for (const [a, b, y0] of [[30, 150, 156], [212, 320, 158], [120, 240, 162]]) for (let x = a; x < b; x++) { const y = y0 + Math.round(Math.sin(x * 0.07 + a) * 2); P.p(x, y, BC.cable); if (x % 6 === 0) P.p(x, y - 1, BC.cableL); }
  // el foco grande en su trípode con el saco de arena
  P.z(3); P.li(30, 98, 30, 146, BC.metal1); P.li(31, 98, 31, 146, BC.metal0); P.li(30, 140, 20, 156, BC.metal1); P.li(31, 140, 42, 156, BC.metal1); P.li(30, 142, 30, 156, BC.metal0);
  P.el(24, 154, 5, 2.5, hex('#8a6a3a')); P.el(24, 153, 4, 1.5, hex('#a8844a'));
  P.po([[22, 80], [38, 76], [40, 96], [24, 100]], BC.k); P.po([[23, 81], [37, 78], [38, 95], [25, 98]], BC.negro3); P.li(23, 81, 37, 78, BC.metal1); P.po([[38, 78], [44, 74], [46, 100], [40, 96]], BC.k);
  P.li(40, 79, 45, 76, BC.foco); P.li(41, 80, 41, 95, BC.foco); P.li(42, 80, 42, 95, BC.focoL); P.li(26, 99, 30, 103, BC.metal1);
  // el carro de vídeo: dos baldas, ruedas, y dos monitores con visera (las pantallas se pintan aparte)
  P.rc(106, 131, 136, 133, BC.k); P.rc(107, 131, 135, 131, BC.metal2); P.rc(106, 142, 136, 143, BC.metal0); P.li(107, 133, 107, 150, BC.metal1); P.li(135, 133, 135, 150, BC.metal1);
  P.rc(110, 144, 130, 149, BC.negro3); P.rc(111, 145, 118, 148, BC.metal0); for (const x of [108, 134]) { P.di(x, 151, 1.6, BC.k); P.p(x, 151, BC.metal1); }
  for (const x0 of [106, 122]) { P.rc(x0, 115, x0 + 14, 129, BC.k); P.rc(x0 + 1, 116, x0 + 13, 128, BC.negro2); P.li(x0 - 1, 114, x0 + 15, 114, BC.negro3); P.rc(x0 + 6, 129, x0 + 8, 130, BC.metal0); }
  // las sillas de director: lona de respaldo y asiento, brazos, y patas de madera en aspa
  for (const [x, c, cs] of [[148, BC.lona1, BC.lona1S], [168, BC.lona2, BC.lona2S]]) {
    P.li(x - 6, 126, x - 6, 152, BC.mad2); P.li(x + 6, 126, x + 6, 152, BC.mad2); P.li(x - 6, 126, x - 6, 140, BC.mad3);
    P.rc(x - 6, 127, x + 6, 133, c); P.rc(x - 6, 133, x + 6, 133, cs); P.rc(x - 6, 127, x + 6, 127, b_mezcla(c, BC.pinL, 0.25));
    P.rc(x - 7, 139, x + 7, 140, BC.mad3); P.rc(x - 6, 141, x + 6, 142, cs); P.li(x - 6, 143, x + 6, 152, BC.mad1); P.li(x + 6, 143, x - 6, 152, BC.mad2); P.rc(x - 7, 143, x + 7, 143, BC.mad1);
  }
  P.rc(165, 137, 171, 139, BC.pinL); P.rc(165, 139, 171, 139, BC.blancoMS);   // un guion en la silla azul
  // la base de la grúa (el brazo se pinta aparte, porque se mueve)
  P.po([[200, 150], [224, 150], [222, 141], [202, 141]], BC.negro3); P.li(202, 141, 222, 141, BC.metal1); for (const x of [203, 221]) { P.di(x, 152, 2.2, BC.k); P.p(x, 151, BC.metal1); }
  P.rc(210, 112, 214, 141, BC.metal0); P.rc(210, 112, 210, 141, BC.metal2); for (let y = 116; y < 140; y += 6) P.rc(210, y, 214, y, BC.negro2);
  // la mesa con su guion, la taza y la claqueta (el teléfono y el vapor se pintan aparte)
  P.rc(56, 138, 102, 141, BC.k); P.rc(57, 138, 101, 139, BC.mad4); P.rc(57, 140, 101, 140, BC.mad2); for (const x of [59, 99]) { P.rc(x - 1, 141, x + 1, 160, BC.mad1); P.p(x - 1, 141, BC.mad3); } P.rc(60, 150, 98, 151, BC.mad1);
  P.rc(58, 133, 62, 137, BC.k); P.rc(59, 134, 61, 137, BC.pinL); P.rc(62, 134, 63, 136, BC.k);
  P.po([[86, 133], [98, 133], [98, 137], [86, 137]], BC.k); P.rc(87, 134, 97, 137, BC.negro2); for (const y of [134, 136]) P.rc(88, y, 96, y, BC.pinL);
  P.po([[86, 129], [97, 127], [98, 129], [87, 132]], BC.k); for (let i = 0; i < 4; i++) P.li(88 + i * 3, 131 - Math.round(i * 0.6), 89 + i * 3, 129 - Math.round(i * 0.6), BC.pinL);
  // el baúl de la máscara: esquineras, cierres, asa, y el cuello del soporte
  P.rc(240, 141, 260, 160, BC.k); P.rc(241, 142, 259, 160, BC.negro2); P.rc(241, 142, 259, 143, BC.metal1); for (const [x, y] of [[241, 142], [257, 142], [241, 158], [257, 158]]) P.rc(x, y, x + 1, y + 1, BC.metal2);
  P.rc(244, 149, 246, 151, BC.metal2); P.rc(254, 149, 256, 151, BC.metal2); P.rc(247, 154, 253, 155, BC.metal0); P.li(248, 136, 248, 141, BC.metal2); P.li(252, 136, 252, 141, BC.metal1);
}
// el plató entero (lo fijo y lo que se mueve)
function b_plato(R, t, o) {
  const F = b_fijo(R, 'plato', (D) => b_platoFijo(R, D)); R.copiar(F.b);
  const P = b_pintor(R, F.d, 0, 0, false), ms = o.mascara ?? 0;
  // los técnicos que van y vienen al fondo (por detrás de los muebles) y el de la escalera
  // sus sombras en el croma (manchas de verde oscuro que los siguen)
  P.z(0); for (const [v, x0, x1] of [[0.045, 36, 226], [0.03, 230, 110]]) { const u = (t * v + (x0 > 200 ? 0.5 : 0)) % 2, x = u < 1 ? x0 + u * (x1 - x0) : x1 - (u - 1) * (x1 - x0);
    for (let y = 112; y <= 150; y++) for (let i = -4; i <= 4; i++) { const sx = Math.round(x + 10 + (150 - y) * 0.25 + i), d = Math.abs(i) / 4 + Math.max(0, 128 - y) / 18; if (sx > 25 && sx < 238 && d < 1 && b_b4(sx, y) < (1 - d) * 0.7) P.p(sx, y, b_mezcla(R.pget(sx, y), BC.croma0, 0.45)); } }
  P.z(2);
  { const u = (t * 0.045) % 2, x = u < 1 ? 36 + u * 190 : 226 - (u - 1) * 190; b_tecnico(P, x, 150, t, { anda: true, dir: u < 1 ? 1 : -1, carga: true, color: hex('#8a3a3a') }); }
  { const u = (t * 0.03 + 0.5) % 2, x = u < 1 ? 230 - u * 120 : 110 + (u - 1) * 120; b_tecnico(P, x, 149, t, { anda: true, dir: u < 1 ? -1 : 1, color: hex('#3a5a8a') }); }
  b_tecnico(P, 304, 104, t, { brazo: true, dir: -1, color: hex('#5a7a9a') });
  b_tecnico(P, 188, 150, t, { dir: -1, color: hex('#c8a040'), brazo: Math.sin(t * 0.7) > 0 });
  // el humo de ambiente en los haces de los focos 100 y 200: motas que suben despacio y brillan al cruzar la luz
  P.z(0); for (const [fx, k0] of [[100, 0], [200, 7]]) for (let k = 0; k < 9; k++) { const u = (t * 0.035 + h(k + k0, 1, 163)) % 1, y = 140 - u * 96, w = (y - 36) * 0.32, x = fx + (h(k + k0, 2, 163) - 0.5) * 2 * w + Math.sin(t * 0.8 + k) * 3;
    if (w > 2 && Math.sin(t * 1.5 + k * 2) > -0.4) P.p(x, y, b_mezcla(R.pget(x, y), BC.focoL, 0.6)); }
  // las pantallas del carro: el croma con las siluetas, y la otra con barras de color o la máscara
  P.z(9);
  for (const [k, x0] of [[0, 107], [1, 123]].map(([a, b]) => [a, b])) { const modo = (Math.floor(t / 3) + k) % 3;
    for (let y = 117; y <= 127; y++) for (let x = x0; x <= x0 + 11; x++) { let c;
      if (modo === 0) c = y > 124 ? BC.croma2 : BC.croma4; else if (modo === 1) c = [BC.pinL, BC.pinY, hex('#48d0d0'), BC.pinV, hex('#d048d0'), BC.pinR, BC.pinA][Math.floor((x - x0) / 1.72)]; else c = (x + y) % 2 ? hex('#1e2a3a') : hex('#24324a');
      P.p(x, y, c); }
    if (modo === 0) for (const dx of [3, 7]) { const sx = x0 + dx + Math.round(Math.sin(t * 2 + dx) * 1); P.rc(sx, 120, sx + 1, 125, BC.k); P.p(sx, 119, BC.k); }
    if (modo === 2) { P.rc(x0 + 4, 118, x0 + 7, 125, BC.m2); P.rc(x0 + 4, 120, x0 + 7, 120, BC.k); P.rc(x0 + 3, 117, x0 + 8, 117, BC.capa); } }
  // la bombilla roja de «grabando» de encima de la puerta
  if (Math.floor(t * 1.2) % 2) { P.rc(10, 82, 13, 84, BC.rec); P.p(11, 82, BC.pinL); for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i, j) < 5 && b_b4(11 + i, 83 + j) < 0.25) P.p(11 + i, 83 + j, b_mezcla(R.pget(11 + i, 83 + j), BC.rec, 0.4)); } else P.rc(10, 82, 13, 84, BC.recS);
  // el brazo de la grúa: celosía, contrapesos y la cámara en la punta
  const a = o.grua !== undefined ? -0.3 + o.grua * 0.6 : Math.sin(t * 0.32) * 0.28, px = 212, py = 112, ca = Math.cos(a), sa = Math.sin(a);
  const fx = px - 66 * ca, fy = py - 66 * sa, bx = px + 24 * ca, by = py + 24 * sa;
  P.li(fx, fy - 1, bx, by - 1, BC.metal2); P.li(fx, fy, bx, by, BC.metal1); P.li(fx, fy + 3, bx, by + 3, BC.metal0); P.li(fx, fy + 4, bx, by + 4, BC.k);
  for (let i = 0; i <= 22; i++) { const u0 = i / 22, x0 = fx + (bx - fx) * u0, y0 = fy + (by - fy) * u0; P.li(x0, y0 + 1, x0 + (i & 1 ? 3 : -3) * ca, y0 + 3, BC.metal1); }
  P.rc(bx - 3, by - 2, bx + 3, by + 6, BC.k); P.rc(bx - 2, by - 1, bx + 2, by + 5, hex('#5a5a2a')); P.rc(bx - 2, by + 2, bx + 2, by + 2, BC.k); P.di(px, py, 2, BC.metal2);
  P.rc(fx - 5, fy + 1, fx + 4, fy + 7, BC.k); P.rc(fx - 4, fy + 2, fx + 3, fy + 6, BC.negro3); P.rc(fx - 8, fy + 3, fx - 5, fy + 5, BC.k); P.p(fx - 8, fy + 4, BC.pantallaL); P.p(fx + 2, fy + 2, Math.floor(t * 2) % 2 ? BC.rec : BC.recS);
  // el cono del foco sobre la máscara, la máscara (que se aclara con la luz) y su brillo
  if (ms > 0) { b_focoColgado(P, 262, 28, BC.foco, false);
    for (let y = 40; y <= 160; y++) { const u = (y - 40) / 120, cx = 262 - u * 12, w = 3 + u * 16; for (let x = Math.floor(cx - w); x <= cx + w; x++) { if (b_b4(x, y) < ms * 0.32 * (1 - Math.abs(x - cx) / w)) P.p(x, y, b_mezcla(R.pget(x, y), BC.foco, 0.4)); } }
    P.el(250, 160, 18 * ms + 2, 2.5, (x, y) => b_mezcla(R.pget(x, y), BC.foco, 0.3)); }
  b_mascara(R, 250, 127, 2, { capucha: true, brillo: ms > 0 ? ((t * 0.35) % 1.6) - 0.3 : -1, ojos: 0.4 + Math.sin(t * 2) * 0.3, luz: 0.45 + ms * 0.55 });
  if (ms > 0.5 && Math.sin(t * 1.7) > 0.6) { R.pset(246, 121, BC.pinL); R.pset(245, 121, BC.m4); R.pset(246, 120, BC.m4); }
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; P.p(60 + Math.sin(t * 2 + k * 1.5) * 1.5, 132 - u * 9, b_mezcla(R.pget(60, 132 - u * 9), BC.pinL, 0.35 * (1 - u))); }
  // el teléfono en su soporte: vibra, se enciende y echa ondas
  const tel = o.telefono ?? 0, vib = tel > 0 ? Math.round(Math.sin(t * 40)) : 0, tx = 73 + vib;
  P.rc(tx - 1, 137, tx + 5, 137, BC.metal0); P.rc(tx, 128, tx + 5, 137, BC.k); P.rc(tx + 1, 129, tx + 4, 136, tel > 0 ? BC.pantallaL : BC.negro3);
  if (tel > 0) { P.di(tx + 2.5, 131, 1, BC.pinL); P.rc(tx + 1, 133, tx + 4, 134, BC.pinL); P.rc(tx + 1, 136, tx + 2, 136, BC.pinV); P.rc(tx + 3, 136, tx + 4, 136, BC.pinR);
    for (let r = 0; r < 2; r++) { const rr = 5 + ((t * 5 + r * 3) % 6); for (let a = -0.75; a <= 0.75; a += 0.9 / rr) for (const d of [-1, 1]) P.p(76 + d * rr * Math.cos(a), 132 + rr * Math.sin(a), rr > 9 ? BC.cinta1 : BC.pinY); } }
  return { grua: [Math.round(fx - 4), Math.round(fy + 4)] };
}
// la máscara de cerca: fondo negro con el croma desenfocado y círculos de luz, el haz del foco, el banco y la máscara
function b_platoMascaraFijo(R, D) {
  const P = b_pintor(R, D, 0, 0, true);
  P.z(0); P.rc(0, 0, 319, 179, (x, y) => { const cro = Math.max(0, 1 - Math.hypot(x + 20, (y - 96) * 0.6) / 90); let v = 0.4 + cro * cro * 3.4 + (h(x >> 3, y >> 3, 158) - 0.5) * 0.3; if (b_calma(x, y)) v = Math.min(v, 0.6); return v > 1.6 ? b_rampa([BC.croma0, BC.croma1, BC.croma2], v - 1.6, x, y) : b_rampa([BC.techo, BC.negro0, BC.negro1, hex('#14301c')], v, x, y); });
  // los círculos de luz desenfocados (bokeh), cálidos y verdes
  for (const [cx, cy, r, c] of [[42, 40, 14, hex('#2a5a34')], [96, 28, 9, hex('#5a4626')], [232, 58, 15, hex('#5a4626')], [246, 132, 11, hex('#2a5a34')], [62, 128, 17, hex('#1e3a26')], [272, 96, 10, hex('#4a3a26')], [200, 20, 7, hex('#3a3a46')]])
    for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && !b_calma(x, y) && (d < 0.8 || b_b4(x, y) < (1 - d) * 5)) { const i = y * 320 + x; P.p(x, y, d > 0.86 ? b_mezcla(c, BC.pinL, 0.1) : b_mezcla(R.buf[i], c, 0.55 + d * 0.3)); } }
  // el plató desenfocado a la derecha: la escalera, el pie de un foco con su lente encendida y el borde del croma
  const sombra = (x, y, c, f) => { if (!b_calma(x, y) && x >= 0 && x < 320) P.p(x, y, b_mezcla(R.buf[y * 320 + x], c, f * (0.6 + b_b4(x, y) * 0.5))); };
  for (let y = 0; y < 150; y++) for (let x = 300; x < 320; x++) sombra(x, y, BC.croma1, Math.min(1, (x - 300) / 14) * 0.7);
  for (let y = 20; y < 150; y++) for (const cx of [238, 254]) for (let i = -2; i <= 2; i++) sombra(cx + i + Math.round((150 - y) * 0.04), y, BC.metal0, 0.45 - Math.abs(i) * 0.12);
  for (let y = 34; y < 150; y += 15) for (let x = 236; x <= 258; x++) for (let j = -1; j <= 1; j++) sombra(x + Math.round((150 - y) * 0.04), y + j, BC.metal0, 0.3 - Math.abs(j) * 0.1);
  for (let y = 74; y < 150; y++) for (let i = -2; i <= 2; i++) sombra(288 + i, y, BC.negro3, 0.5 - Math.abs(i) * 0.12);
  for (let y = 52; y <= 78; y++) for (let x = 276; x <= 302; x++) { const d = Math.hypot(x - 289, y - 65) / 12; if (d < 1) sombra(x, y, d > 0.85 ? BC.focoL : BC.gel1, d > 0.85 ? 0.5 : 0.35 + (1 - d) * 0.2); }
  // el haz del foco que baja de arriba a la derecha
  for (let y = 0; y < 150; y++) { const u = y / 150, cx = 216 - u * 64, w = 10 + u * 46; for (let x = Math.floor(cx - w); x <= cx + w; x++) if (!b_calma(x, y) && b_b4(x, y) < 0.22 * (1 - Math.abs(x - cx) / w)) P.p(x, y, b_mezcla(R.buf[y * 320 + x] ?? BC.techo, BC.foco, 0.18)); }
  // el banco de trabajo: madera con vetas, el paño verde, remaches sueltos, una lima, un pincel y un bote
  P.z(1); P.rc(0, 150, 319, 179, (x, y) => (y === 150 ? BC.mad4 : y === 151 ? BC.mad3 : b_rampa([BC.mad0, BC.mad1, BC.mad2, BC.mad3], 1.3 + Math.sin(x * 0.09 + Math.sin(y * 0.5) * 2) * 0.6 + (h(x >> 2, y, 159) - 0.5) * 0.5 - (y - 150) * 0.03 + Math.max(0, 1 - Math.abs(x - 150) / 70) * 0.9, x, y)));
  P.po([[30, 156], [96, 153], [110, 168], [40, 174]], (x, y) => b_rampa([BC.capaD, BC.capaS, BC.capa, BC.capaL], 1.4 + Math.sin(x * 0.4 + y * 0.2) * 0.9, x, y));
  for (const [x, y] of [[60, 162], [70, 165], [78, 160], [224, 166], [232, 170], [214, 172]]) { P.di(x, y, 1.6, BC.m1); P.p(x - 1, y - 1, BC.m4); }
  P.li(200, 158, 238, 152, BC.metal1); P.li(200, 159, 238, 153, BC.metal0); for (let x = 204; x < 236; x += 2) P.p(x, 158 - Math.round((x - 200) * 0.16), BC.metal2); P.rc(238, 150, 250, 154, BC.mad1);
  P.li(256, 170, 288, 160, BC.mad3); P.li(256, 171, 288, 161, BC.mad1); P.rc(250, 169, 257, 173, BC.metal1); P.rc(246, 170, 251, 172, BC.k);
  P.rc(270, 136, 292, 158, BC.k); P.rc(271, 137, 291, 158, BC.m1); P.rc(271, 137, 274, 158, BC.m2); P.rc(270, 135, 292, 137, BC.m0); P.rc(271, 135, 291, 135, BC.m2); P.rc(272, 138, 290, 139, BC.m0);
  // el cuello del soporte
  P.z(2); P.rc(145, 130, 155, 151, BC.k); P.rc(146, 130, 154, 151, BC.metal1); P.rc(146, 130, 148, 151, BC.metal2); P.rc(140, 148, 160, 151, BC.metal0); P.rc(140, 148, 160, 148, BC.metal2);
}
function b_platoMascara(R, t, o) {
  const F = b_fijo(R, 'platoMascara', (D) => b_platoMascaraFijo(R, D)); R.copiar(F.b);
  const mano = o.mano ?? 0, cx = Math.round(150 - mano * 10), cy = 86;
  // un técnico desenfocado que cruza el fondo de la derecha, detrás del banco y de la máscara (una mancha oscura con el filo encendido por el haz)
  { const u = ((t + 8) / 22) % 1; if (u < 0.55) { const x = Math.round(340 - u / 0.55 * 160), y0 = 46 + Math.round(Math.abs(Math.sin(t * 3.2)) * 2);
    for (let y = y0; y < 150; y++) { const cab = y < y0 + 16, rx = cab ? 7 * Math.sqrt(Math.max(0, 1 - ((y - y0 - 8) / 8) ** 2)) : 13 - Math.max(0, y - 120) * 0.15;
      for (let x2 = Math.floor(x - rx - 2); x2 <= x + rx + 2; x2++) { if (x2 < 186 || x2 > 319 || b_calma(x2, y) || F.d[y * 320 + x2] > 0) continue; const d = Math.abs(x2 - x) / (rx + 0.01); if (d > 1.2) continue;
        const i = y * 320 + x2; R.buf[i] = b_mezcla(R.buf[i], d > 0.9 && x2 < x ? BC.focoL : BC.techo, d > 0.9 ? (b_b4(x2, y) < 0.4 ? 0.25 : 0) : 0.62); } } } }
  b_mascara(R, cx, cy, 7, { capucha: true, rayas: true, brillo: ((t * 0.18) % 1.6) - 0.3, ojos: 0.35 + Math.sin(t * 1.6) * 0.15 });
  // la luz roja de «grabando», desenfocada, que parpadea a la derecha
  if (Math.floor(t * 1.2) % 2) for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j) / 4; if (d < 1) R.pset(306 + i, 104 + j, b_mezcla(R.pget(306 + i, 104 + j), BC.rec, d > 0.8 ? 0.6 : 0.4)); }
  // motas de polvo que flotan en el haz (las de delante, en platoDelante)
  for (let k = 0; k < 18; k++) { const u = (t * 0.02 + h(k, 1, 161)) % 1, y = u * 150, x = 216 - (y / 150) * 64 + (h(k, 2, 161) - 0.5) * 60 + Math.sin(t * 0.6 + k) * 4; if (!b_calma(x, y)) R.pset(Math.round(x), Math.round(y), b_mezcla(R.pget(x, y), BC.foco, 0.6)); }
  return { mascara: [cx, cy], mano: [cx + 46, cy + 10] };
}
// EL BOSQUE DE DECORADO (fijo): techo, parrilla y focos, el telón pintado (y su final a la izquierda), los árboles de
// cartón con la escuadra, los troncos de verdad con sus copas, el riachuelo de atrezo, el suelo de hojas, la cinta y la
// máquina de humo; z: 0 fondo, 1 telón, 2 riachuelo, 3 árboles, 4 suelo
function b_bosqueFijo(R, D) {
  const P = b_pintor(R, D, 0, 0, true);
  P.z(0); P.rc(0, 0, 319, 179, (x, y) => (y < 22 ? ((x * 3 + y) % 11 === 0 && !b_calma(x, y) ? BC.techoL : BC.techo) : BC.negro0)); b_celosia(P, 0, 319, 22);
  // el telón pintado: cielo pálido entre árboles pintados en tres planos, con arrugas y una costura; se acaba en x 16
  P.z(1); P.rc(16, 22, 319, 140, (x, y) => { const l1 = 70 + Math.sin(x * 0.11) * 14 + Math.sin(x * 0.37) * 6, l2 = 88 + Math.sin(x * 0.07 + 2) * 16 + Math.sin(x * 0.5) * 5, tr = (x % 23) < 3 && y > l2 - 10;
    let v = y < l1 ? 3.4 - y * 0.012 : y < l2 ? 2.2 : 1.2; if (tr) v = 0.4; if ((x - 16) % 64 === 0) v -= 0.6; if (Math.abs(((x + y * 0.4) % 53) - 3) < 0.6) v += 0.5; if (b_calma(x, y)) v = Math.min(v, 3);
    return b_rampa([BC.telon0, BC.telon1, BC.telon2, BC.telon3, BC.telon4], v + (h(x >> 2, y >> 2, 162) - 0.5) * 0.4, x, y); });
  P.rc(14, 22, 16, 140, BC.k); P.li(17, 22, 17, 140, BC.telon1);
  P.li(8, 84, 8, 138, BC.metal1); P.li(8, 138, 3, 146, BC.metal1); P.li(8, 138, 13, 146, BC.metal1); P.rc(3, 76, 13, 84, BC.k); P.rc(4, 77, 12, 83, BC.negro3); P.rc(13, 78, 14, 82, BC.foco);
  // matorrales del fondo, de verdad, al pie del telón
  for (let x = 16; x < 320; x++) { const t0 = 128 + Math.round(Math.sin(x * 0.3) * 3 + Math.sin(x * 0.11) * 4); for (let y = t0; y <= 142; y++) P.p(x, y, b_rampa([BC.fol0, BC.fol1, BC.fol2, BC.fol3], 2.4 - (y - t0) * 0.25 + (h(x >> 1, y >> 1, 163) - 0.5) * 1.2, x, y)); }
  // el riachuelo de atrezo: plástico azul entre rocas de corcho, y la manguera que lo alimenta
  P.z(2); P.po([[176, 140], [306, 136], [318, 140], [318, 150], [196, 152], [170, 147]], (x, y) => b_rampa([BC.agua, BC.aguaL], 0.5 + Math.sin(x * 0.2 + y) * 0.4, x, y));
  for (let k = 0; k < 16; k++) { const x = 172 + k * 9 + h(k, 1, 164) * 4, y = k % 2 ? 140 - k * 0.2 : 151 - k * 0.1; P.el(x, y, 3 + h(k, 2, 164) * 2, 2, BC.roca); P.el(x - 1, y - 1, 2, 1, BC.rocaL); }
  P.rc(312, 141, 319, 143, BC.k); P.li(306, 142, 312, 142, hex('#2a5a2a'));
  // el suelo de hojas secas, con tierra y raíces, y la marca de cinta (es un plató)
  P.z(4); P.rc(0, 144, 319, 179, (x, y) => { const n = h(x >> 1, y >> 1, 165), m = h(x >> 3, y >> 2, 166); return [BC.hoja0, BC.hoja1, BC.hoja2, BC.hoja3, BC.hoja4, BC.hoja5][Math.min(5, Math.floor(n * 3 + m * 3))]; });
  P.rc(146, 170, 154, 170, BC.cinta1); P.rc(150, 170, 150, 173, BC.cinta1);
  // el camino pisado entre las hojas, los charcos de luz de los focos, ramas caídas, piñas, matas y la cinta de las marcas
  for (let x = 0; x < 320; x++) { const yc = 166 + Math.sin(x * 0.03) * 5; for (let y = Math.round(yc - 4); y <= yc + 4; y++) if (b_b4(x, y) < 0.55 - Math.abs(y - yc) * 0.11) P.p(x, y, h(x >> 1, y, 167) < 0.5 ? BC.hoja1 : BC.hoja0); }
  for (const [cx, cy, rx, c] of [[90, 152, 26, BC.gel1], [204, 151, 20, BC.foco], [186, 155, 16, BC.gel2]]) for (let y = cy - 6; y <= cy + 6; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / 5); if (d < 1 && b_b4(x, y) < (1 - d) * 0.5) P.p(x, y, b_mezcla(P.B[y * 320 + x], c, 0.4)); }
  for (const [x0, y0, x1, y1] of [[40, 172, 64, 168], [56, 170, 60, 165], [228, 176, 256, 173], [244, 174, 248, 169], [110, 160, 124, 162]]) { P.li(x0, y0, x1, y1, BC.arbol1); P.li(x0, y0 + 1, x1, y1 + 1, BC.arbol0); P.p(x0, y0 - 1, BC.arbol3); }
  for (const [x, y] of [[74, 176], [170, 175], [292, 170], [138, 159]]) { P.el(x, y, 2, 1.5, BC.hoja1); P.p(x - 1, y - 1, BC.hoja3); P.p(x + 1, y, BC.arbol0); }
  for (let k = 0; k < 18; k++) { const x = h(k, 1, 170) * 320, y = 148 + h(k, 2, 170) * 30; for (let i = 0; i < 4; i++) P.li(x + i - 1.5, y, x + (i - 1.5) * 2, y - 2 - (i & 1) * 2, i & 1 ? BC.fol3 : BC.fol2); }
  for (const [x, y, c] of [[48, 159, BC.cinta2], [276, 160, BC.cinta3]]) { P.li(x - 3, y - 2, x + 3, y + 2, c); P.li(x - 3, y + 2, x + 3, y - 2, c); }
  // la manguera de la máquina de humo, que serpentea por el suelo hacia el fondo
  for (let x = 26; x < 150; x++) { const y = 156 + (x - 26) * 0.12 + Math.sin(x * 0.12) * 3; P.p(x, Math.round(y), BC.cable); if (x % 7 === 0) P.p(x, Math.round(y) - 1, BC.cableL); }
  // los árboles de cartón piedra: silueta plana pintada con trazos, tronco plano, canto del cartón; uno con su escuadra
  P.z(3);
  for (const [cx, w, top, esc] of [[80, 26, 44, 0], [196, 22, 54, 1]]) {
    if (esc) { P.li(cx + 6, 120, cx + 22, 150, BC.mad2); P.li(cx + 6, 121, cx + 21, 150, BC.mad1); P.li(cx + 6, 140, cx + 18, 140, BC.mad2); P.el(cx + 22, 150, 4, 2, hex('#8a6a3a')); }
    P.rc(cx - 3, top + 60, cx + 3, 150, BC.cartonT); for (let y = top + 62; y < 150; y += 4) P.p(cx - 1 + (y & 1), y, BC.mad1); P.li(cx + 4, top + 60, cx + 4, 150, BC.cartonB);
    P.po([[cx, top], [cx + w * 0.6, top + 22], [cx + w * 0.4, top + 22], [cx + w, top + 50], [cx + w * 0.5, top + 48], [cx + w * 0.8, top + 66], [cx - w * 0.8, top + 66], [cx - w * 0.5, top + 48], [cx - w, top + 50], [cx - w * 0.4, top + 22], [cx - w * 0.6, top + 22]], (x, y) => (Math.sin(x * 0.5 + y * 0.9) > 0.75 ? BC.cartonL : (x - cx) > w * 0.3 && Math.sin(y * 0.8) > 0 ? BC.cartonS : BC.carton));
    P.li(cx, top, cx + w * 0.6, top + 22, BC.cartonB); P.li(cx + w * 0.4, top + 22, cx + w, top + 50, BC.cartonB); P.li(cx + w * 0.5, top + 48, cx + w * 0.8, top + 66, BC.cartonB);
  }
  // los troncos de verdad: corteza con surcos, luz de la izquierda, musgo, raíces; y sus copas en tres tonos
  for (const [cx, w, base] of [[30, 8, 154], [126, 6, 150], [262, 9, 152]]) {
    for (let y = 22; y <= base; y++) { const ww = w + Math.max(0, (y - base + 10) * 0.6); for (let x = Math.round(cx - ww); x <= cx + ww; x++) { const u = (x - cx) / ww; let v = 2 - u * 1.4 + (Math.sin(x * 1.7 + Math.sin(y * 0.3) * 2) > 0.6 ? -1 : 0) + (h(x, y >> 2, 167) - 0.5) * 0.6;
      let c = b_rampa([BC.arbol0, BC.arbol1, BC.arbol2, BC.arbol3], v, x, y); if (u > 0.3 && h(x >> 1, y >> 2, 168) < 0.25) c = BC.musgo; P.p(x, y, c); } }
    for (const d of [-1, 1]) P.po([[cx + d * w * 0.6, base - 8], [cx + d * (w + 9), base + 2], [cx + d * (w + 4), base + 2]], BC.arbol1);
    P.li(cx - w + 1, 40, cx - w - 14, 26, BC.arbol1); if (cx < 200) P.li(cx + w - 1, 34, cx + w + 16, 24, BC.arbol1); else P.li(cx - w + 1, 52, cx - w - 12, 44, BC.arbol1);
  }
  for (const [cx, cy, rx, ry] of [[30, 30, 34, 14], [60, 34, 22, 10], [126, 32, 30, 12], [168, 28, 22, 10], [240, 34, 30, 12], [262, 30, 12, 12]]) for (let y = Math.max(22, cy - ry); y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2, f = d + (h(x >> 1, y >> 1, 169) - 0.5) * 0.5; if (f > 1 || b_calma(x, y) || x < 0 || x > 319) continue; P.p(x, y, b_rampa([BC.fol0, BC.fol1, BC.fol2, BC.fol3, BC.fol4], 3.2 - (y - cy + ry) / ry * 1.4 - (x - cx) / rx * 0.5 + (h(x, y, 170) - 0.5) * 1.2, x, y)); }
  // la máquina de humo y su manguera
  P.rc(4, 148, 22, 160, BC.k); P.rc(5, 149, 21, 159, BC.metal0); P.rc(5, 149, 21, 149, BC.metal2); P.rc(21, 152, 26, 155, BC.k); P.p(7, 151, BC.rec); P.rc(9, 151, 18, 152, BC.negro2);
}
function b_bosque(R, t, o) {
  const F = b_fijo(R, 'bosque', (D) => b_bosqueFijo(R, D)); R.copiar(F.b);
  const P = b_pintor(R, F.d, 0, 0, false);
  // los focos de gelatina y sus haces que bajan entre las ramas (por detrás de los troncos)
  [[64, BC.gel1], [176, BC.foco], [214, BC.gel2], [104, BC.foco]].forEach(([x, g]) => b_focoColgado(P, x, 28, g));
  P.z(1); for (const [x0, k] of [[64, 0], [176, 1], [214, 2]]) { const fl = 0.85 + 0.15 * Math.sin(t * 0.7 + k * 2); for (let y = 40; y < 150; y++) { const u = (y - 40) / 110, cx = x0 + u * 26 * (k === 2 ? -1 : 1), w = 3 + u * 14; for (let x = Math.floor(cx - w); x <= cx + w; x++) if (b_b4(x, y) < fl * 0.3 * (1 - Math.abs(x - cx) / w) * (1 - u * 0.5)) P.p(x, y, b_mezcla(R.pget(x, y), k === 2 ? BC.gel2 : BC.foco, 0.3)); } }
  // los brillos del agua que corren
  P.z(2); for (let k = 0; k < 14; k++) { const x = 180 + ((k * 23 + t * 14) % 134), y = 141 + (k % 4) * 2.4; P.li(x, y, x + 3, y, (k + Math.floor(t * 3)) % 3 ? BC.aguaLL : BC.aguaL); }
  // hojas que caen por detrás, y la niebla baja de la máquina que se arrastra
  P.z(9); b_hojasCaen(P, t, 10, 0);
  for (let k = 0; k < 9; k++) { const u = (t * 0.03 + k / 9) % 1, cx = 26 + u * 300, cy = 140 + Math.sin(k * 1.7) * 6 - u * 6, rx = 14 + u * 22, ry = 4 + u * 4;
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1 && b_b4(x, y) < (1 - d) * (1 - u * 0.6) * 0.55) P.p(x, y, b_mezcla(R.pget(x, y), BC.niebla, 0.45)); } }
  // la pértiga del micro que asoma por arriba y se mece
  const mx = 168 + Math.round(Math.sin(t * 0.6) * 6), my = 46 + Math.round(Math.sin(t * 0.9) * 2); P.li(214, 0, mx, my, BC.metal1); P.li(215, 0, mx + 1, my, BC.metal0);
  P.rc(mx - 3, my, mx + 3, my + 4, BC.k); for (let x = mx - 2; x <= mx + 2; x++) for (let y = my + 1; y <= my + 3; y++) P.p(x, y, (x + y) & 1 ? hex('#6a6a72') : hex('#4a4a52'));
}

// LA ZONA DE ENSAYO (fijo): cortinas negras, parrilla con poleas, pizarra con la coreografía, armero, colchonetas,
// sillas con toalla y botellas, el soporte del monitor y el ventilador
function b_ensayoFijo(R, D) {
  const P = b_pintor(R, D, 0, 0, true);
  P.z(0); P.rc(0, 0, 319, 179, (x, y) => (y < 16 ? ((x * 5 + y) % 13 === 0 && !b_calma(x, y) ? BC.techoL : BC.techo) : b_rampa([BC.telonN0, BC.telonN1, BC.telonN2, BC.telonN3], 1.5 + Math.sin(x * 0.42 + Math.sin(x * 0.05) * 3) * 1.2 + (b_calma(x, y) ? -0.6 : 0) - Math.max(0, y - 120) * 0.02, x, y)));
  b_celosia(P, 0, 319, 22); for (const x of [90, 160, 212]) { P.di(x, 30, 2.5, BC.metal1); P.di(x, 30, 1, BC.k); }
  // la pizarra blanca con la coreografía: monigotes, flechas, números y su soporte de ruedas
  P.rc(30, 88, 84, 128, BC.k); P.rc(31, 89, 83, 127, BC.pizarra); P.rc(31, 125, 83, 127, BC.pizarraS); P.li(36, 128, 36, 152, BC.metal1); P.li(78, 128, 78, 152, BC.metal1); for (const x of [36, 78]) P.di(x, 153, 1.5, BC.k);
  const mon = (x, y, c) => { P.di(x, y, 1.5, c); P.li(x, y + 2, x, y + 6, c); P.li(x, y + 6, x - 2, y + 9, c); P.li(x, y + 6, x + 2, y + 9, c); P.li(x - 3, y + 3, x + 3, y + 3, c); };
  mon(40, 96, hex('#d83a3a')); mon(54, 96, hex('#3a5ad8')); P.li(43, 100, 50, 100, BC.k); P.li(50, 100, 48, 98, BC.k); P.li(50, 100, 48, 102, BC.k);
  mon(66, 108, hex('#d83a3a')); mon(76, 110, hex('#3a5ad8')); P.li(69, 112, 73, 114, BC.k); P.li(60, 98, 64, 106, BC.k);
  for (let i = 0; i < 3; i++) { P.di(38 + i * 14, 119, 3.4, BC.k); P.di(38 + i * 14, 119, 2.4, BC.pizarra); b_cifra(P, i + 1, 37 + i * 14, 117, BC.k); }
  // el armero de atrezo: bastones, espadas de espuma y escudos redondos lisos
  P.rc(4, 100, 26, 101, BC.mad2); P.rc(4, 148, 26, 150, BC.mad1); P.li(4, 100, 4, 150, BC.mad1); P.li(26, 100, 26, 150, BC.mad1);
  for (const [x, c] of [[8, BC.mad3], [12, hex('#c8c8d0')], [16, BC.mad3], [20, hex('#c8c8d0')]]) { P.li(x, 92, x, 148, c); P.p(x, 92, BC.pinL); }
  P.di(14, 134, 8, BC.k); P.di(14, 134, 7, hex('#a83030')); P.di(14, 134, 5, hex('#d8d0c0')); P.di(14, 134, 3, hex('#3048a8')); P.p(12, 131, BC.pinL);
  // al fondo: colchonetas apiladas contra la cortina, un foco de caja blanco en su pie y una torre de celosía
  for (let k = 0; k < 4; k++) { const y0 = 146 - k * 7, x0 = 98 + (k & 1) * 3, c = k & 1 ? hex('#5a6a7a') : BC.colchS; P.rc(x0, y0 - 6, x0 + 40, y0, BC.k); P.rc(x0 + 1, y0 - 5, x0 + 39, y0 - 1, c); P.rc(x0 + 1, y0 - 5, x0 + 39, y0 - 5, b_mezcla(c, BC.pinL, 0.3)); P.li(x0 + 20, y0 - 5, x0 + 20, y0 - 1, b_mezcla(c, BC.k, 0.3)); }
  P.li(190, 92, 190, 150, BC.metal1); P.li(190, 140, 182, 151, BC.metal1); P.li(190, 140, 198, 151, BC.metal1); P.rc(178, 72, 202, 92, BC.k); P.rc(179, 73, 201, 91, hex('#f0ecd8')); P.rc(181, 75, 199, 89, BC.focoL); P.rc(179, 91, 201, 91, BC.pizarraS);
  for (const x0 of [246, 254]) P.li(x0, 30, x0, 151, BC.metal1); for (let y = 32; y < 150; y += 8) { P.li(246, y, 254, y + 8, BC.metal0); P.li(246, y, 254, y, BC.metal2); } P.rc(242, 150, 258, 152, BC.metal0);
  // las colchonetas azules en perspectiva, con juntas, rozaduras y marcas de cinta
  P.z(1); P.rc(0, 152, 319, 179, (x, y) => b_rampa([BC.suelo0, BC.suelo1, BC.suelo2], 1 + (h(x >> 2, y, 171) - 0.5), x, y));
  P.po([[24, 142], [296, 142], [318, 178], [2, 178]], (x, y) => { const k = (x - 160) / (y - 100), fil = Math.floor(Math.log(y - 120) * 5); const j = Math.abs(((k * 2.2) % 1 + 1) % 1) < 0.04 || Math.abs((Math.log(y - 120) * 5) % 1) < 0.07;
    return j ? BC.colchS : b_rampa([BC.colchS, BC.colch, BC.colchL, BC.colchLL], 1.6 + (h(Math.floor(k * 2.2), fil, 172) - 0.5) * 0.8 + (h(x >> 1, y, 173) < 0.06 ? -0.8 : 0) - (y - 142) * 0.01, x, y); });
  P.li(24, 142, 296, 142, BC.colchLL); P.li(2, 178, 24, 142, BC.colchS); P.li(318, 178, 296, 142, BC.colchS);
  for (const [x, y, s] of [[96, 160, 4], [210, 164, 4], [150, 152, 3]]) { P.li(x - s, y - s * 0.5, x + s, y + s * 0.5, BC.cinta1); P.li(x - s, y + s * 0.5, x + s, y - s * 0.5, BC.cinta1); }
  P.li(70, 172, 250, 172, BC.pinL); P.li(160, 146, 160, 150, BC.pinL);
  // las sillas plegables con la toalla y las botellas, el soporte del monitor y el ventilador
  P.z(3);
  for (const x of [222, 242]) { P.li(x - 5, 132, x - 5, 152, BC.metal1); P.li(x + 5, 132, x + 5, 152, BC.metal1); P.rc(x - 5, 132, x + 5, 137, BC.metal0); P.rc(x - 5, 132, x + 5, 132, BC.metal2); P.rc(x - 6, 142, x + 6, 143, BC.metal1); P.li(x - 5, 143, x + 5, 152, BC.metal0); P.li(x + 5, 143, x - 5, 152, BC.metal0); }
  P.rc(218, 136, 226, 141, hex('#e8e0d0')); P.rc(218, 140, 226, 141, hex('#b8b0a0')); P.rc(239, 135, 241, 141, hex('#3a8ad8')); P.rc(239, 133, 241, 134, BC.pinL); P.rc(244, 136, 246, 141, hex('#d84a4a')); P.rc(244, 134, 246, 135, BC.pinL);
  P.rc(282, 100, 285, 150, BC.metal0); P.rc(282, 100, 282, 150, BC.metal2); P.li(283, 150, 272, 154, BC.metal1); P.li(284, 150, 296, 154, BC.metal1); for (const x of [272, 296]) P.di(x, 155, 1.4, BC.k);
  P.rc(262, 70, 306, 102, BC.k); P.rc(263, 71, 305, 101, BC.negro2);
  P.rc(296, 140, 316, 160, BC.k); P.rc(297, 141, 315, 159, BC.negro3); P.di(306, 150, 8, BC.negro1);
}

function b_ensayo(R, t, o) {
  const F = b_fijo(R, 'ensayo', (D) => b_ensayoFijo(R, D)); R.copiar(F.b);
  const P = b_pintor(R, F.d, 0, 0, false);
  // los cables de arnés que se mecen, con su arnés naranja y el mosquetón
  P.z(2); for (const [k, x] of [90, 160, 212].entries()) { const L = 74 + k * 8, sw = Math.sin(t * 0.8 + k * 2) * 4, ex = x + sw, ey = 32 + L;
    P.li(x, 32, ex, ey, BC.metal2); P.di(ex, ey + 1, 1.5, BC.metal3);
    P.rc(ex - 3, ey + 3, ex + 3, ey + 9, BC.arnesS); P.rc(ex - 2, ey + 3, ex + 2, ey + 8, BC.arnes); P.li(ex - 3, ey + 9, ex - 4, ey + 14, BC.arnes); P.li(ex + 3, ey + 9, ex + 4, ey + 14, BC.arnes); P.p(ex, ey + 5, BC.metal3); }
  // un técnico que tira de una cuerda al fondo y otro que cruza con una tableta
  b_tecnico(P, 110, 141, t, { brazo: true, dir: 1, color: hex('#3a4a5a') });
  { const u = (t * 0.04) % 2, x = u < 1 ? 120 + u * 90 : 210 - (u - 1) * 90; b_tecnico(P, x, 140, t, { anda: true, dir: u < 1 ? 1 : -1, color: hex('#5a3a4a') }); }
  // el monitor con la pelea repetida (dos siluetas en bucle sobre un fondo de plató)
  P.z(9); P.rc(264, 72, 304, 100, (x, y) => (y > 92 ? hex('#2a3a5a') : (x + y) % 3 ? hex('#4a6a9a') : hex('#3a5a8a')));
  { const u = (t % 2.4) / 2.4, ax = 276 + Math.round(Math.sin(u * Math.PI * 2) * 3), bx = 290 - Math.round(Math.max(0, Math.sin(u * Math.PI * 2 + 1)) * 4), gol = u > 0.4 && u < 0.55;
    for (const [x, d] of [[ax, 1], [bx, -1]]) { P.di(x, 81, 2, BC.k); P.rc(x - 1, 83, x + 1, 89, BC.k); P.li(x, 89, x - 2, 93, BC.k); P.li(x, 89, x + 2, 93, BC.k); P.li(x, 85, x + d * (gol && d > 0 ? 6 : 3), gol && d > 0 ? 83 : 87, BC.k); }
    if (gol) { P.p(bx - 3, 82, BC.pinY); P.p(bx - 4, 80, BC.pinY); P.p(bx - 2, 79, BC.pinY); }
    P.rc(264, 99, 264 + Math.round(u * 40), 100, BC.rec); }
  // el ventilador que gira
  for (let k = 0; k < 3; k++) { const a = t * 9 + k * 2.09; P.li(306, 150, 306 + Math.cos(a) * 6, 150 + Math.sin(a) * 6, BC.metal1); } P.di(306, 150, 1.4, BC.metal3);
}

// la vista que piden las opciones: un encuadre que no existe cae en el primero; una cámara que no es la suya, en 'general'
function c_vista(o, V) {
  const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return { enc, cam, geo: { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) } };
}

// los fondos fijos: se pintan una vez en su búfer (R.nuevo) y se copian en cada fotograma
const c_capas = new Map();

function c_capa(R, clave, dibuja) {
  let b = c_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); c_capas.set(clave, b); }
  return b;
}

// la trama ordenada 4 × 4 (umbral 0–1)
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 el primero; 1 el segundo)
const c_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// un color de una rampa con trama (u 0–1)
const c_rampa = (ram, u, x, y) => { const v = Math.max(0, Math.min(0.999, u)) * (ram.length - 1), i = Math.floor(v); return ram[Math.min(ram.length - 1, i + (v - i > c_b4(x, y) ? 1 : 0))]; };

// tiñe una caja hacia c con fuerza f
function c_tinte(R, x0, y0, x1, y1, c, f) { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, c_mez(R.pget(x, y), c, f)); }

// un dibujo de cadenas: cada carácter, un color del mapa (los que no están, transparentes)
function c_dib(R, filas, x, y, mapa) { for (let j = 0; j < filas.length; j++) for (let i = 0; i < filas[j].length; i++) { const c = mapa[filas[j][i]]; if (c != null) R.pset(x + i, y + j, c); } }

// una figurita de fondo (8–11 px): cabeza, cuerpo y piernas que se alternan al andar; tipo: 0 escudo, 1 martillo, 2 capa,
// 3 grandullón, 4 cuernos (siluetas de héroes para anuncios y pantallas); col: un color o [pelo, ropa, piel, pierna]
function c_figura(R, x, y, t, tipo, col, anda = true) {
  const [cp, cr, cs, cl] = Array.isArray(col) ? col : [col, col, col, col], g = tipo === 3 ? 1 : 0, f = anda ? (Math.floor(t * 6 + x) & 1) : 0;
  R.linea(x - 1 - g, y, x - 1 - g, y - 3, cl); R.linea(x + 1 + g, y - f, x + 1 + g, y - 3, cl);
  for (let j = y - 8 - g; j <= y - 4; j++) for (let i = x - 1 - g; i <= x + 1 + g; i++) R.pset(i, j, cr);
  R.disco(x, y - 10 - g, 1.6, cs); R.pset(x - 1, y - 11 - g, cp); R.pset(x, y - 12 - g, cp); R.pset(x + 1, y - 11 - g, cp);
  if (tipo === 0) { R.disco(x + 3, y - 6, 2, cr); R.pset(x + 3, y - 6, cs); }
  else if (tipo === 1) { R.linea(x + 2, y - 7, x + 4, y - 11, cl); R.rect(x + 3, y - 13, x + 6, y - 11, cr); }
  else if (tipo === 2) R.poligono([[x - 2, y - 8], [x - 4, y - 2], [x - 1, y - 3]], cr);
  else if (tipo === 4) { R.pset(x - 2, y - 13, cp); R.pset(x + 2, y - 13, cp); R.pset(x - 2, y - 14, cp); R.pset(x + 2, y - 14, cp); }
}

const c_CR = {
  techo: hex('#161a26'), techoJ: hex('#1d2232'), cornisa: hex('#3a2616'), cornisaL: hex('#7e5634'),
  mad: [hex('#3a2414'), hex('#4c3020'), hex('#5a3a24'), hex('#6e4a2e'), hex('#7e5634')], madK: hex('#26180c'),
  cielo: ['#080c26', '#0c1232', '#121a40', '#1a224e', '#242a5c', '#30306a', '#3c3872'].map(hex),
  lejos: hex('#1c2448'), lejosV: hex('#33416e'), medio: hex('#11152c'), medioV: hex('#d8b060'), medioVS: hex('#8a6a40'), cerca: hex('#090b1c'), cercaV: hex('#ffe08a'),
  marco: hex('#2a2e3a'), marcoL: hex('#4a5060'), suelo: [hex('#1c1c24'), hex('#24242e'), hex('#2c2c38'), hex('#34343f')], junta: hex('#15151c'), reflejo: hex('#3c4670'),
  cuero: hex('#1c1c24'), cueroL: hex('#3a3a4a'), cueroM: hex('#2a2a36'), acero: hex('#8a92a0'), aceroL: hex('#c8d0dc'), aceroS: hex('#4a5262'),
  holo: hex('#5ae0ff'), holoL: hex('#d0f8ff'), holoS: hex('#2a90c0'), k: hex('#08080c'),
  rojo: hex('#c8283a'), rojoS: hex('#8a1a28'), blanco: hex('#eceef4'), blancoS: hex('#a8acb8'), azul: hex('#2a4aa8'), azulS: hex('#1a2e70'),
};

const c_VENT = [96, 28, 266, 112];   // el cristal del ventanal

const c_reunionCielo = new Uint8Array(320 * 180), c_reunionLuces = [];

function c_reunionFijo(R) {
  const { rect, pset } = R;
  // el techo: paneles con juntas y dos plafones lejos de la barra del año
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 40 === 0 || y === 11) ? c_CR.techoJ : (h(x >> 1, y >> 1, 5) > 0.93 ? c_CR.techoJ : c_CR.techo));
  for (const x of [200, 246]) { rect(x - 7, 17, x + 7, 18, hex('#9aa0b4')); rect(x - 5, 17, x + 5, 17, hex('#e8ecf4')); }
  rect(0, 20, 319, 23, c_CR.cornisa); rect(0, 21, 319, 21, c_CR.cornisaL); rect(0, 23, 319, 23, c_CR.madK);
  // las paredes de nogal: tablas verticales con vetas, un friso a media altura y el zócalo de cuarterones
  for (let y = 24; y < 119; y++) for (let x = 0; x < 320; x++) {
    if (x >= 92 && x <= 270 && y <= 116) continue;
    const tabla = Math.floor(x / 12), xi = x % 12, beta = Math.sin(y * 0.21 + h(tabla, 0, 3) * 9 + Math.sin(y * 0.05 + tabla) * 2.4 + xi * 0.5);
    let k = 2 + (h(tabla, 1, 4) > 0.5 ? 1 : 0) + (beta > 0.82 ? -1 : 0) + (y > 84 ? -1 : 0);
    if (x > 272 && y < 50) k = Math.min(k, 2);   // la esquina de Atom, tranquila
    pset(x, y, xi === 0 ? c_CR.madK : xi === 1 ? c_CR.mad[Math.min(4, k + 1)] : c_CR.mad[Math.max(0, k)]);
  }
  rect(0, 82, 91, 84, c_CR.cornisa); rect(271, 82, 319, 84, c_CR.cornisa); rect(0, 82, 91, 82, c_CR.cornisaL); rect(271, 82, 319, 82, c_CR.cornisaL);
  for (const x0 of [4, 48, 274]) { rect(x0, 89, x0 + 38, 114, c_CR.mad[0]); rect(x0 + 1, 90, x0 + 37, 113, c_CR.mad[2]); rect(x0 + 1, 90, x0 + 37, 90, c_CR.mad[3]); rect(x0 + 1, 113, x0 + 37, 113, c_CR.madK); }
  rect(0, 115, 319, 119, hex('#1a100a')); rect(0, 115, 319, 115, c_CR.cornisa);
  // el ventanal: el cielo de noche tramado, la luna, estrellas y Nueva York en tres términos
  rect(92, 24, 270, 116, c_CR.marco); rect(93, 25, 269, 25, c_CR.marcoL);
  const [X0, Y0, X1, Y1] = c_VENT;
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { pset(x, y, c_rampa(c_CR.cielo, (y - Y0) / 80 + (h(x >> 3, y >> 2, 6) - 0.5) * 0.08, x, y)); c_reunionCielo[y * 320 + x] = 1; }
  for (let k = 0; k < 40; k++) { const x = X0 + Math.floor(h(k, 1, 21) * 170), y = Y0 + Math.floor(h(k, 2, 21) * 40); pset(x, y, h(k, 3, 21) > 0.6 ? hex('#c8d0f0') : hex('#6a74a8')); }
  R.disco(246, 40, 5, hex('#e8e4d0')); R.disco(247, 39, 4, hex('#f8f4e4')); pset(244, 41, hex('#c8c4b0')); pset(248, 42, hex('#d0ccb8'));
  const edificio = (x0, x1, top, col, ven, dens, lista) => {
    for (let y = Math.max(Y0, top); y <= Y1; y++) for (let x = Math.max(X0, x0); x <= Math.min(X1, x1); x++) {
      c_reunionCielo[y * 320 + x] = 0;
      const enc = ven && y > top + 1 && (x - x0) % 2 === 1 && (y - top) % 3 === 1 && h(x, y, 31) < dens;
      pset(x, y, enc ? ven : (x === x1 && col !== c_CR.cerca ? c_mez(col, c_CR.k, 0.3) : col));
      if (enc && lista) lista.push([x, y]);
    }
  };
  for (let x = X0 - 4; x < X1;) { const w = 5 + Math.floor(h(x, 1, 11) * 8); edificio(x, x + w - 1, 66 + Math.floor(h(x, 2, 11) * 24), c_CR.lejos, c_CR.lejosV, 0.35); x += w; }
  // la torre de la aguja (escalonada, con su antena) y el bloque del tejado inclinado
  edificio(194, 210, 50, c_CR.medio, c_CR.medioV, 0.4, c_reunionLuces); edificio(197, 207, 44, c_CR.medio, c_CR.medioV, 0.4, c_reunionLuces); edificio(200, 204, 38, c_CR.medio, null); R.linea(202, 37, 202, 29, c_CR.marcoL);
  for (let x = 124; x <= 140; x++) edificio(x, x, 40 + Math.round((x - 124) * 0.6), c_CR.medio, c_CR.medioV, 0.45, c_reunionLuces);
  for (let x = X0 - 6; x < X1;) { const w = 9 + Math.floor(h(x, 4, 12) * 10); if (!(x > 120 && x < 142) && !(x > 190 && x < 212)) edificio(x, x + w - 2, 58 + Math.floor(h(x, 5, 12) * 30), c_CR.medio, c_CR.medioV, 0.5, c_reunionLuces); x += w + 1; }
  for (let x = X0 - 3; x < X1;) { const w = 12 + Math.floor(h(x, 6, 13) * 14); edificio(x, x + w - 2, 92 + Math.floor(h(x, 7, 13) * 12), c_CR.cerca, c_CR.cercaV, 0.55); x += w; }
  // los parteluces y el travesaño del ventanal
  for (let k = 1; k < 5; k++) { const x = 96 + k * 34; rect(x - 1, 25, x, 115, c_CR.marco); pset(x - 1, 25, c_CR.marcoL); for (let y = 26; y < 115; y += 2) pset(x - 1, y, c_CR.marcoL); }
  rect(93, 70, 269, 71, c_CR.marco); rect(93, 70, 269, 70, c_CR.marcoL); rect(92, 113, 270, 116, hex('#3a3e4a')); rect(92, 113, 270, 113, hex('#6a7080'));
  // la tele grande en la pared (la pinta la vida) y el aparador con la planta, la lámpara y unos libros
  rect(7, 31, 87, 81, c_CR.k); rect(8, 32, 86, 80, hex('#14161e')); rect(44, 82, 50, 86, hex('#1a1a20'));
  for (let y = 92; y <= 116; y++) for (let x = 5; x <= 89; x++) pset(x, y, ((x - 5) % 28 === 0 || y === 92) ? c_CR.madK : y === 93 ? c_CR.mad[4] : c_CR.mad[1 + (h(x >> 2, y, 41) > 0.7 ? 1 : 0)]);
  for (const x of [17, 45, 73]) { rect(x, 102, x + 1, 104, hex('#c8a060')); }
  rect(5, 117, 7, 118, c_CR.madK); rect(87, 117, 89, 118, c_CR.madK);
  rect(14, 84, 22, 91, hex('#6a4a3a')); rect(14, 84, 22, 84, hex('#8a6a54'));
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33, L = 6 + (k % 3) * 2; R.linea(18, 84, 18 + Math.round(Math.cos(a) * L), 84 + Math.round(Math.sin(a) * L), k % 2 ? hex('#3a7a4a') : hex('#4e9a5a')); }
  for (const [x, c] of [[56, '#8a3a3a'], [59, '#3a5a8a'], [62, '#c8a050'], [65, '#4a7a5a']]) { rect(x, 82, x + 2, 91, hex(c)); pset(x, 82, hex('#e8e0d0')); }
  rect(78, 77, 84, 79, hex('#e8d8a8')); rect(80, 80, 82, 91, hex('#7a6a50')); rect(77, 91, 85, 91, hex('#5a4a38'));
  // la vitrina con los tres escudos (rojo, blanco y azul, sin emblemas)
  rect(272, 50, 316, 114, c_CR.madK); rect(274, 52, 314, 112, hex('#141c2c'));
  for (let y = 52; y <= 112; y++) for (let x = 274; x <= 314; x++) if (h(x >> 1, y >> 1, 52) > 0.9) pset(x, y, hex('#1a2436'));
  for (const y of [72, 92]) { rect(274, y, 314, y + 1, hex('#8a96a8')); rect(274, y + 2, 314, y + 2, hex('#0c1018')); }
  for (const cy of [62, 82, 102]) {
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) {
      const d = Math.hypot(i, j); if (d > 8.2) continue;
      let c = d > 6.4 ? c_CR.rojo : d > 4.6 ? c_CR.blanco : d > 2.8 ? c_CR.rojo : c_CR.azul;
      const luz = -i - j;
      if (luz < -6) c = c === c_CR.rojo ? c_CR.rojoS : c === c_CR.blanco ? c_CR.blancoS : c === c_CR.azul ? c_CR.azulS : c;
      if (luz > 7 && d > 5) c = c_mez(c, hex('#ffffff'), 0.35);
      pset(294 + i, cy + j, c);
    }
    pset(291, cy - 5, hex('#ffffff')); pset(290, cy - 4, hex('#ffffff'));
    rect(292, cy + 8, 296, cy + 9, hex('#6a7080'));
  }
  // el suelo de piedra pulida: losas en perspectiva, motas y el reflejo del ventanal
  const VX = 182, VY = 60;
  for (let y = 120; y < 180; y++) {
    const z = (y - VY) / (120 - VY), fila = Math.floor(Math.log(z) * 9), base = 3 - Math.min(3, Math.floor((y - 120) / 16));
    for (let x = 0; x < 320; x++) {
      const X = VX + (x - VX) / z, junta = Math.abs(((X + 1000) % 36) - 18) > 17.5 - 0.6 / z;
      let c = c_CR.suelo[Math.max(0, base - (h(Math.floor((X + 1000) / 36), fila, 8) > 0.6 ? 1 : 0))];
      if (h(x, y, 9) > 0.94) c = c_mez(c, hex('#4a4a58'), 0.5);
      if (x >= 96 && x <= 266 && y < 158) { const f = (1 - (y - 120) / 38) * 0.55 * (0.6 + 0.4 * Math.sin(x * 0.7) ** 2); if (f > c_b4(x, y)) c = c_mez(c, c_CR.reflejo, 0.45); }
      pset(x, y, junta ? c_CR.junta : c);
    }
    if (Math.floor(Math.log((y + 1 - VY) / (120 - VY)) * 9) !== fila) for (let x = 0; x < 320; x++) pset(x, y, c_CR.junta);
  }
  // la sombra de la mesa en el suelo
  for (let y = 166; y < 176; y++) for (let x = 46; x < 274; x++) if (c_b4(x, y) < 0.5 - Math.abs(y - 170) * 0.08) pset(x, y, c_mez(R.pget(x, y), c_CR.k, 0.5));
  // los sillones del otro lado de la mesa (respaldos altos de cuero)
  for (const cx of [66, 104, 216, 254]) {
    const CU = [hex('#2a1a14'), hex('#4a2e20'), hex('#5e3a28'), hex('#7a4e36')];
    for (let y = 129; y <= 150; y++) { const w = y < 132 ? 8 - (132 - y) * 1.5 : 8; for (let x = Math.round(cx - w); x <= cx + w; x++) {
      const borde = Math.abs(x - cx) >= w - 0.5 || y === 129, cap = (x - cx + 40) % 5 === 0 && y > 134 && y % 5 === 2, luz = x < cx - 4 || y < 132;
      pset(x, y, borde ? CU[0] : cap ? CU[0] : luz ? CU[3] : (y > 138 && (x + y) % 5 === 0) ? CU[1] : CU[2]); } }
    rect(cx - 6, 134, cx + 6, 134, CU[1]); pset(cx - 5, 131, hex('#a87a5a'));
    rect(cx - 12, 140, cx - 9, 141, c_CR.aceroL); rect(cx + 9, 140, cx + 12, 141, c_CR.aceroL); rect(cx - 12, 142, cx - 9, 150, c_CR.aceroS); rect(cx + 9, 142, cx + 12, 150, c_CR.aceroS);
  }
}

// la sala de reuniones de los Vengadores (ver la cabecera de E)
function c_reunion(R, t, o) {
  R.copiar(c_capa(R, 'reunion', () => c_reunionFijo(R)));
  const { pset, rect } = R, [X0, Y0, X1, Y1] = c_VENT, cielo = (x, y) => c_reunionCielo[y * 320 + x] === 1;
  R.recorte(c_VENT);
  // nubes de tres tonos a tres velocidades, solo sobre el cielo (por detrás de los edificios)
  [[1.2, hex('#262c5c'), 0], [2.6, hex('#2e3468'), 1], [4.4, hex('#3a3c74'), 2]].forEach(([vel, col, L]) => {
    for (let k = 0; k < 3; k++) {
      const cx = X0 - 30 + ((h(k, L, 61) * 230 + t * vel) % 230), cy = Y0 + 8 + L * 7 + Math.floor(h(k, L, 62) * 10), rx = 12 + h(k, L, 63) * 10;
      for (let y = Math.max(Y0, Math.floor(cy - 3)); y <= Math.min(Y1, cy + 3); y++) for (let x = Math.max(X0, Math.floor(cx - rx)); x <= Math.min(X1, cx + rx); x++) {
        const d = ((x - cx) / rx) ** 2 + ((y - cy) / 3.2) ** 2 + Math.sin(x * 0.4 + k) * 0.15; if (d < 1 && cielo(x, y) && d < 0.55 + c_b4(x, y) * 0.5) pset(x, y, col);
      }
    }
  });
  // estrellas que titilan, ventanas que se apagan y encienden, la baliza de la aguja y un avión que cruza
  for (let k = 0; k < 10; k++) { const x = X0 + Math.floor(h(k, 5, 22) * 170), y = Y0 + Math.floor(h(k, 6, 22) * 30); if (cielo(x, y) && Math.sin(t * (2 + k % 3) + k) > 0.3) pset(x, y, hex('#f0f4ff')); }
  c_reunionLuces.forEach(([x, y], k) => { if (k % 7 === 0) { const s = Math.sin(t * 0.5 + k * 1.7); if (s > 0.75) pset(x, y, c_CR.medio); else if (s < -0.9) pset(x, y, hex('#fff4c0')); } });
  if (Math.floor(t * 1.5) % 2 === 0) { pset(202, 28, hex('#ff4a4a')); pset(201, 28, hex('#a82a2a')); pset(203, 28, hex('#a82a2a')); }
  { const ax = X0 + ((t * 8 + 40) % 200) - 10, ay = Y0 + 12 + Math.sin(t * 0.3) * 2; if (cielo(Math.round(ax), Math.round(ay))) { pset(Math.round(ax), Math.round(ay), hex('#d8dcf0')); if (Math.floor(t * 3) % 3 === 0) pset(Math.round(ax) + 1, Math.round(ay), hex('#ff5a5a')); } }
  // el brillo del cristal que resbala despacio
  for (let y = Y0; y <= Y1; y++) { const x0 = X0 + Math.round(((t * 10 + y * 0.7) % 240)) - 30; for (let x = x0; x < x0 + 5; x++) if (x >= X0 && x <= X1 && ((x + y) & 1)) pset(x, y, c_mez(R.pget(x, y), hex('#ffffff'), 0.1)); }
  R.recorte(null);
  // la tele: apagada (reflejo y piloto) o con el anuncio de siluetas (o.tele 0–1)
  c_tele(R, t, o.tele ?? 0, [8, 32, 86, 80]);
  // si está apagada, en su cristal se reflejan las luces de la ciudad que pasan despacio y el resplandor del holograma
  if (!(o.tele > 0)) {
    for (let k = 0; k < 9; k++) { const x = 10 + Math.round((h(k, 1, 83) * 74 + t * (1 + k % 3)) % 74), y = 36 + Math.floor(h(k, 2, 83) * 40); if (Math.sin(t * 0.7 + k) > -0.4) { pset(x, y, k % 3 ? hex('#4a4a3a') : hex('#6a6448')); if (k % 3 === 0) pset(x + 1, y, hex('#3a3a30')); } }
    if (o.holo != null) for (let y = 40; y <= 78; y++) for (let x = 70; x <= 86; x++) if (c_b4(x, y) < (x - 70) / 40) pset(x, y, c_mez(R.pget(x, y), hex('#3ac8e8'), 0.18 + 0.06 * Math.sin(t * 4)));
  }
  // el brillo que barre la vitrina
  { const g = ((t * 0.35) % 2.4) * 70 - 30; for (let y = 52; y <= 112; y++) for (let x = 274; x <= 314; x++) { const d = (x - 274) + (y - 52) * 0.5 - g; if (d > 0 && d < 3 && ((x + y) & 1)) pset(x, y, c_mez(R.pget(x, y), hex('#ffffff'), 0.25)); } }
  // el holograma sobre la mesa
  c_holo(R, t, o.holo);
}
// la tele de pared: apagada, reflejo diagonal y el piloto rojo que late; encendida (e 0–1), un anuncio de siluetas de
// héroes que caminan ante un atardecer, con destellos (e funde la imagen con una trama)
function c_tele(R, t, e, [x0, y0, x1, y1]) {
  const { pset } = R, cl = [x0, y0, x1, y1];
  const APAG = [hex('#0e1018'), hex('#141824'), hex('#1c2030')], SOL = [hex('#3a1a4a'), hex('#6a2a5a'), hex('#a8405a'), hex('#e0704a'), hex('#f0a050'), hex('#f8d080')];
  R.recorte(cl);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const ref = Math.abs(((x - x0) - (y - y0) * 0.8) - 30) < 8 ? 2 : (x - x0 + y - y0) % 23 === 0 ? 1 : 0;
    if (e > 0 && e > c_b4(x, y) * 0.98) { const u = (y - y0) / (y1 - y0); pset(x, y, u > 0.78 ? (u > 0.86 ? hex('#1a0e1a') : hex('#2a1424')) : c_rampa(SOL, u / 0.78 + Math.sin(x * 0.3 + t) * 0.02, x, y)); }
    else pset(x, y, APAG[ref]);
  }
  if (e > 0) {
    const pan = (t * 6) % 40, sx = x0 + 52 - pan * 0.2, sy = y0 + 28;
    R.disco(sx, sy, 6, hex('#fff0c0')); R.disco(sx, sy, 4, hex('#fffbe8'));
    for (let k = 0; k < 7; k++) { const a = t * 0.2 + k * 0.9; R.linea(Math.round(sx), sy, Math.round(sx + Math.cos(a) * 30), Math.round(sy + Math.sin(a) * 30), (x, y, i) => (i % 3 === 0 && i > 7) ? hex('#f8c070') : null); }
    for (let k = 0; k < 5; k++) { const fx = x0 + 10 + k * 13 + ((t * 5) % 13) - 6; if (e > 0.4) c_figura(R, Math.round(fx), y1 - 10, t + k * 0.3, [1, 0, 3, 2, 4][k], hex('#0c0610')); }
    for (let k = 0; k < 6; k++) { const x = x0 + Math.floor(h(k, 1, 71) * (x1 - x0)), y = y0 + 4 + ((t * 9 + h(k, 2, 71) * 40) % 30); pset(x, Math.round(y), hex('#ffe8b0')); }
  }
  R.recorte(null);
  pset(x1 - 2, y1 + 2, (e > 0 || Math.sin(t * 2.2) > 0) ? hex('#ff3a3a') : hex('#5a1a1a'));
}

// los cinco iconos del holograma, en una rejilla −6…6, por sus atributos y sin emblemas ni letras: el escudo, la
// estrella, la garra, la LLAMA (la Antorcha de los Cuatro) y la cabeza con el VISOR de Cíclope (la banda ancha
// con su rendija de luz)
const c_LLAMA = ['......#......', '.....##......', '.....###.....', '....####..#..', '...#####.##..', '..##########.', '..###..####..', '.###....###..', '.##..#...##..', '.##.###..##..', '..##.#..##...', '...#######...', '....#####....'];
const c_VISOR = ['....#####....', '..##.....##..', '.#.........#.', '#############', '#.#########.#', '#############', '#############', '#...........#', '.#..#####..#.', '.#.........#.', '..##.....##..', '....#####....', '.............'];

function c_iconoHolo(n, i, j) {
  const d = Math.hypot(i, j), a = Math.atan2(j, i);
  if (n === 0) return d <= 6.4 && (d > 4.8 || (d > 2.4 && d <= 3.5) || d <= 1.1);
  if (n === 1) return d <= 2.6 + 4.2 * Math.pow(Math.abs(Math.cos(2.5 * (a + Math.PI / 2))), 4);
  if (n === 2) { for (const s of [-1, 0, 1]) { const u = i - s * 3.6 + j * 0.45; if (Math.abs(u) < 0.95 - Math.abs(j) * 0.06 && Math.abs(j) <= 6 - Math.abs(s)) return true; } return false; }
  if (n === 3) return c_LLAMA[j + 6][i + 6] === '#';
  return c_VISOR[j + 6][i + 6] === '#';
}

// el holograma: el haz que sube del proyector de la mesa, un anillo de datos que gira y el icono que da vueltas
// (hol 0–1 recorre los cinco equipos; sin hol, un globo de alambre en reposo)
function c_holo(R, t, hol) {
  const { pset } = R, cx = 160, cy = 110;
  for (let y = 100; y <= 146; y++) { const w = 2 + (146 - y) * 0.42; for (let x = Math.round(cx - w); x <= cx + w; x++) if (c_b4(x, y + Math.floor(t * 8)) < 0.16 + (y > 124 ? 0.08 : 0)) pset(x, y, c_mez(R.pget(x, y), c_CR.holo, 0.45)); }
  R.halo(cx, cy, 18, [hex('#0e2a3c'), hex('#12405a'), hex('#1a5a78')], 0.8);
  const rot = t * 1.8, sx = Math.cos(rot), atras = sx < 0;
  if (hol == null) {
    for (let k = 0; k < 4; k++) { const a = rot + k * Math.PI / 4, rx = Math.abs(Math.cos(a)) * 8; for (let s = 0; s < 40; s++) { const b = s / 40 * Math.PI * 2; pset(Math.round(cx + Math.sin(b) * rx), Math.round(cy + Math.cos(b) * 8), k % 2 ? c_CR.holoS : c_CR.holo); } }
    for (const yy of [-4, 0, 4]) { const rx = Math.sqrt(64 - yy * yy); R.linea(Math.round(cx - rx), cy + yy, Math.round(cx + rx), cy + yy, c_CR.holoS); }
  } else {
    const n = Math.max(0, Math.min(4, Math.floor(hol * 5))), fr = Math.min(1, hol * 5 - n), giro = n > 0 && fr < 0.12 ? fr / 0.12 : 1;
    const gx = Math.cos(giro * Math.PI * 2) * (giro < 1 ? 1 : 1), dentro = giro < 1 && gx < 0, bob = Math.round(Math.sin(t * 2) * 1);
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (c_iconoHolo(dentro ? n - 1 : n, i, j)) {
      const w = Math.max(0.15, Math.abs(gx)), x = Math.round(cx + i * 2 * w), y = cy + j * 2 + bob, c = dentro ? c_CR.holoS : ((y + Math.floor(t * 14)) % 5 === 0 ? c_CR.holoL : c_CR.holo);
      for (let a = 0; a < Math.max(1, Math.round(2 * w)); a++) { pset(x + a, y, c); pset(x + a, y + 1, (y & 1) ? c : c_mez(c, c_CR.holoS, 0.4)); }
    }
    // los cinco puntos de debajo: cuál de los cinco equipos se ve
    for (let k = 0; k < 5; k++) R.disco(cx - 8 + k * 4, cy + 16, k === n ? 1.2 : 0.6, k === n ? c_CR.holoL : c_CR.holoS);
  }
  for (let s = 0; s < 18; s++) { const b = rot * 0.7 + s / 18 * Math.PI * 2, x = Math.round(cx + Math.cos(b) * 17), y = Math.round(cy + 5 + Math.sin(b) * 4); if (Math.sin(b) < 0) pset(x, y, s % 3 ? c_CR.holoS : c_CR.holoL); }
  for (let s = 0; s < 18; s++) { const b = rot * 0.7 + s / 18 * Math.PI * 2, x = Math.round(cx + Math.cos(b) * 17), y = Math.round(cy + 5 + Math.sin(b) * 4); if (Math.sin(b) >= 0) pset(x, y, s % 3 ? c_CR.holo : c_CR.holoL); }
  if (Math.sin(t * 7) > 0.92) for (let x = cx - 10; x <= cx + 10; x++) if ((x & 1) === 0) pset(x, cy + Math.round(Math.sin(t * 3) * 6), c_CR.holoL);
}

// la mesa larga de cristal y acero, por delante de los actores: el canto de cristal (deja ver tintado lo de detrás), el
// proyector del holograma, tabletas encendidas, vasos de agua, una taza y papeles, y las dos patas de caballete
function c_reunionMesa(R, t) {
  const { pset, rect } = R;
  for (let y = 146; y <= 151; y++) for (let x = 52 - (y - 146); x <= 268 + (y - 146); x++) {
    const c = y === 146 ? hex('#c8e4f4') : y === 151 ? c_CR.aceroS : y === 150 ? c_CR.acero : c_mez(R.pget(x, y), hex('#7aa0c0'), 0.45 + (c_b4(x, y) > 0.5 ? 0.1 : 0));
    pset(x, y, c);
  }
  for (let x = 54; x < 266; x += 3) if (((x + Math.floor(t * 6)) % 37) < 2) pset(x, 147, hex('#ffffff'));
  for (const x of [72, 240]) {
    for (let y = 152; y <= 172; y++) { const w = y > 168 ? 6 : 3; rect(x - w, y, x + w, y, c_CR.aceroS); rect(x - w + 1, y, x, y, c_CR.acero); pset(x - w + 1, y, c_CR.aceroL); }
    rect(x - 7, 172, x + 7, 173, c_CR.aceroS); rect(x - 7, 172, x + 7, 172, c_CR.aceroL);
  }
  // el proyector del holograma y su luz
  rect(150, 143, 170, 146, hex('#1a1e28')); rect(151, 143, 169, 143, hex('#4a5262')); for (let x = 152; x <= 168; x += 2) pset(x, 145, Math.sin(t * 6 + x) > 0 ? c_CR.holo : c_CR.holoS);
  // tabletas, vasos, la taza con su vapor y unos papeles
  for (const [x, k] of [[92, 0], [204, 1]]) { rect(x, 143, x + 12, 145, hex('#101420')); rect(x + 1, 143, x + 11, 144, k ? hex('#3a8ac8') : hex('#4ac08a')); pset(x + 2 + Math.floor(t * 2 + k) % 8, 143, hex('#e8f8ff')); }
  for (const x of [122, 190, 232]) { rect(x, 140, x + 3, 145, hex('#a8c8e0')); rect(x + 1, 142, x + 2, 145, hex('#6a9ac0')); pset(x, 140, hex('#ffffff')); }
  rect(76, 141, 81, 145, hex('#e8e4dc')); rect(82, 142, 83, 144, hex('#e8e4dc')); rect(76, 141, 81, 141, hex('#5a3a24'));
  for (let k = 0; k < 3; k++) { const y = 139 - ((t * 6 + k * 4) % 12), x = 78 + Math.round(Math.sin(t * 2 + k * 2 + y * 0.3)); if (y > 128) pset(x, Math.round(y), hex('#b8bcc8')); }
  rect(252, 144, 262, 145, hex('#f0ece0')); rect(254, 143, 263, 143, hex('#d8d4c8')); for (let x = 254; x < 262; x += 3) pset(x, 144, hex('#9a98a0'));
}

const c_CS = [96, 22, 224, 100];   // la pantalla central

const c_screenxTapa = new Uint8Array(320 * 180);

function c_screenxFijo(R) {
  const { rect, pset } = R;
  // el techo con sus nervios en perspectiva y el suelo de moqueta con la luz de la pantalla
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y < 60) { const lado = x < 160 ? (96 - x) / 96 : (x - 224) / 96; c = (Math.floor((x - 160) / Math.max(4, 70 - y)) & 1) ? hex('#0e0c14') : hex('#12101a'); if (lado < 0 && y < 22 && (y % 5 === 0)) c = hex('#18141f'); }
    else { const u = (y - 100) / 80, b = h(x >> 1, y >> 1, 81) > 0.8; c = c_rampa([hex('#1a0e16'), hex('#24121c'), hex('#2e1822'), hex('#3a2028')], 1 - u * 0.8 + (b ? 0.1 : 0) - Math.abs(x - 160) / 400, x, y); if (((x + y * 2) % 14 === 0) && y > 112) c = hex('#3e1e2a'); }
    pset(x, y, c);
  }
  // el escenario bajo la pantalla, con su canto de luces
  rect(84, 100, 236, 110, hex('#140c12')); rect(84, 100, 236, 100, hex('#3a2a34')); for (let x = 86; x < 236; x += 4) rect(x, 102, x, 110, hex('#1c1218')); for (let x = 90; x < 234; x += 8) rect(x, 106, x + 2, 106, hex('#d8a04a'));
  rect(84, 111, 236, 112, hex('#0a0608'));
  // el pasillo central: una alfombra en perspectiva con su ribete dorado y los peldaños con su canto
  for (let y = 113; y < 180; y++) { const w = 18 + (y - 113) * 0.55; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) { const e = Math.abs(x - 160) > w - 2; pset(x, y, e ? hex('#7a5a2a') : (((x + y * 3) % 9 === 0) ? hex('#4a1a26') : c_rampa([hex('#2a0e18'), hex('#3a1420'), hex('#4a1a28')], 0.3 + (y - 113) / 120, x, y))); } }
  for (const y of [122, 136, 152]) { const w = 18 + (y - 113) * 0.55; R.linea(Math.round(160 - w), y, Math.round(160 + w), y, hex('#1a0810')); R.linea(Math.round(160 - w), y + 1, Math.round(160 + w), y + 1, hex('#5a2a34')); }
  // dos torres de altavoces a los lados del escenario (rejilla, dos graves y un agudo)
  for (const x0 of [70, 234]) {
    for (let y = 64; y <= 110; y++) for (let x = x0; x <= x0 + 16; x++) { c_screenxTapa[y * 320 + x] = 1; pset(x, y, (x === x0 || x === x0 + 16 || y === 64) ? hex('#060408') : (((x + y) & 1) ? hex('#16121a') : hex('#1c1822'))); }
    rect(x0 + 1, 65, x0 + 15, 65, hex('#3a3242'));
    for (const y of [78, 96]) { R.disco(x0 + 8, y, 6, hex('#0a080c')); R.disco(x0 + 8, y, 5, hex('#2a2430')); R.disco(x0 + 8, y, 3, hex('#141018')); R.disco(x0 + 8, y, 1, hex('#3a3442')); pset(x0 + 6, y - 4, hex('#4a4252')); }
    R.disco(x0 + 8, 69, 2, hex('#2a2430')); pset(x0 + 8, 69, hex('#8a8494'));
  }
  // las salidas de emergencia, abajo en las paredes (el hombrecito que corre y la flecha)
  for (const [x0, d] of [[6, -1], [296, 1]]) {
    for (let y = 106; y <= 114; y++) for (let x = x0; x <= x0 + 17; x++) { c_screenxTapa[y * 320 + x] = 1; pset(x, y, (y === 106 || y === 114 || x === x0 || x === x0 + 17) ? hex('#0a1a10') : hex('#2ac85a')); }
    c_dib(R, ['..#.', '.##.', '#.##', '..#.', '.#.#'], x0 + (d > 0 ? 3 : 10), 108, { '#': hex('#f0fff4') });
    for (let i = 0; i < 4; i++) pset(x0 + (d > 0 ? 9 + i : 4 + i), 110, hex('#f0fff4')); pset(x0 + (d > 0 ? 11 : 5), 109, hex('#f0fff4')); pset(x0 + (d > 0 ? 11 : 5), 111, hex('#f0fff4'));
  }
  // las dos sillas de director (lona azul, madera clara, patas en tijera)
  for (const cx of [128, 196]) {
    const M = hex('#b08a5a'), MS = hex('#7a5a36'), L = hex('#24345a'), LL = hex('#3a5080');
    rect(cx - 7, 126, cx - 6, 150, MS); rect(cx + 6, 126, cx + 7, 150, MS);
    rect(cx - 7, 127, cx + 7, 133, L); rect(cx - 7, 127, cx + 7, 127, LL);
    rect(cx - 8, 138, cx + 8, 139, M); rect(cx - 7, 141, cx + 7, 142, L);
    R.linea(cx - 6, 143, cx + 6, 150, M); R.linea(cx + 6, 143, cx - 6, 150, M); R.linea(cx - 5, 143, cx + 7, 150, MS);
    rect(cx - 8, 150, cx - 5, 151, MS); rect(cx + 5, 150, cx + 8, 151, MS);
    for (let x = cx - 10; x <= cx + 10; x++) if (c_b4(x, 152) < 0.5) pset(x, 152, hex('#120a10'));
  }
  // los bloques de butacas a los lados, vistos de espaldas, en tres filas
  for (let fila = 0; fila < 3; fila++) for (const [xa, xb] of [[0, 86], [234, 319]]) {
    const y = 124 + fila * 15, w = 12 + fila * 2;
    for (let x = xa + (fila % 2) * 4; x + w <= xb; x += w + 2) {
      for (let j = 0; j < 12 + fila; j++) for (let i = 0; i < w; i++) { c_screenxTapa[(y + j) * 320 + x + i] = 1; const borde = i === 0 || i === w - 1 || (j === 0 && (i < 2 || i > w - 3)); pset(x + i, y + j, borde ? hex('#160810') : j < 2 ? (i < w / 2 ? hex('#c8585e') : hex('#a84048')) : (i === 1 ? hex('#8a2a36') : i === w - 2 ? hex('#4a1020') : (j > 8 + fila && c_b4(x + i, y + j) < 0.5) ? hex('#561420') : hex('#6a1a26'))); }
      for (let i = 2; i < w - 2; i++) pset(x + i, y + 4, hex('#561420')); for (let j = 5; j < 10; j++) pset(x + (w >> 1), y + j, hex('#5a1622')); pset(x + 2, y + 1, hex('#f0a0a0'));
    }
  }
}
// la imagen panorámica (de fuera de la pantalla también: px −60…380, py 22…100): un atardecer, nubes, la ciudad lejos con humo
const c_PANO = ['#221640', '#3a1e52', '#5a2a5e', '#8a3a62', '#b84e5e', '#e07050', '#f0a05a'].map(hex);

function c_pano(px, py, t, x, y) {
  if (py < 74) {
    let c = c_rampa(c_PANO, (py - 22) / 52 + (h(Math.floor(px / 7), Math.floor(py / 3), 5) - 0.5) * 0.06, x, y);
    const n = Math.sin((px + t * 5) * 0.045 + Math.sin(py * 0.4) * 1.5) + Math.sin((px + t * 9) * 0.11 + py * 0.3) * 0.5; if (py < 58 && py > 26 && n > 0.95 - c_b4(x, y) * 0.3) c = n > 1.3 ? hex('#e8a0a0') : n > 1.1 ? hex('#b86a86') : hex('#7a3e6a');
    const d = Math.hypot(px - 160, (py - 70) * 1.6); if (d < 10) c = d < 6 ? hex('#fff4c8') : hex('#f8d07a');
    const sk = 74 - Math.floor(h(Math.floor(px / 5), 1, 9) * 14) * (h(Math.floor(px / 5), 2, 9) > 0.3 ? 1 : 0.3);
    if (py >= sk) c = (py - sk) % 3 === 1 && (px & 1) && h(Math.floor(px), Math.floor(py), 4) > 0.75 ? hex('#e8a050') : hex('#2a1834');
    return c;
  }
  if (py < 84) { const sk = 84 - Math.floor(h(Math.floor(px / 7), 3, 9) * 10); return py >= sk ? hex('#1e1026') : hex('#2a1834'); }
  return (py > 90 + Math.sin(px * 0.05) * 3) ? hex('#120a16') : hex('#1a0e1e');
}

function c_screenx(R, t, o) {
  R.copiar(c_capa(R, 'screenx', () => c_screenxFijo(R)));
  const { pset } = R, pl = Math.max(0, Math.min(1, o.planos ?? 0)), vacia = o.vacia;
  const PANEL = [hex('#16121c'), hex('#1c1724'), hex('#221c2c')];
  // las paredes: paneles acolchados en perspectiva o, a medida que sube o.planos, la imagen que se extiende
  for (const lado of [-1, 1]) for (let x = lado < 0 ? 0 : 225; x <= (lado < 0 ? 95 : 319); x++) {
    const u = lado < 0 ? (96 - x) / 96 : (x - 224) / 96, top = Math.round(22 - u * 20), bot = Math.round(100 + u * 30);
    for (let y = Math.max(0, top); y <= Math.min(179, bot); y++) {
      if (c_screenxTapa[y * 320 + x]) continue;
      const v = (y - top) / (bot - top), dentro = u <= pl * 1.02 && (u < pl * 1.02 - 0.06 || c_b4(x, y) < 0.5);
      let c;
      if (dentro && !vacia) { c = c_pano(160 + lado * (64 + u * 150), 22 + v * 78, t, x, y); c = c_mez(c, hex('#000000'), 0.18 + u * 0.3); }
      else { const s = Math.floor(u * 9), sv = Math.floor(v * 6); c = PANEL[(s + sv) % 2 + (Math.abs(u * 9 - s - 0.5) > 0.44 || Math.abs(v * 6 - sv - 0.5) > 0.45 ? -0 : 1)] ?? PANEL[0]; if (Math.abs(u * 9 - s - 0.5) > 0.44) c = hex('#0c0a10'); }
      // la esquina de Atom se apaga poco a poco (sin borde): sube hacia la esquina de arriba a la derecha
      if (x > 232 && y < 72) { const sx = Math.min(1, (x - 232) / 52), sy = Math.min(1, (72 - y) / 36), a = 0.62 * sx * sx * (3 - 2 * sx) * sy * sy * (3 - 2 * sy); if (a > 0.01) c = c_mez(c, hex('#100c16'), a); }
      pset(x, y, c);
    }
  }
  // la pantalla central
  for (let y = c_CS[1]; y <= c_CS[3]; y++) for (let x = c_CS[0]; x <= c_CS[2]; x++) pset(x, y, vacia ? c_rampa([hex('#c8d0dc'), hex('#dfe4ec'), hex('#eef2f6')], 1 - Math.abs(x - 160) / 90, x, y) : c_pano(x, y, t, x, y));
  if (!vacia) {
    R.recorte(c_CS);
    for (let k = 0; k < 5; k++) c_figura(R, 138 + k * 11 + Math.round(Math.sin(t * 0.8 + k) * 0.6), 86, t, [0, 1, 3, 2, 4][k], hex('#0e0612'), false);
    for (let k = 0; k < 3; k++) { const x0 = 104 + k * 50, y = 70 - ((t * 4 + k * 9) % 26); for (let j = 0; j < 3; j++) pset(x0 + Math.round(Math.sin(y * 0.3 + j) * 2), Math.round(y) - j * 2, hex('#6a5a6e')); }
    for (let k = 0; k < 3; k++) { const bx = 110 + ((t * 10 + k * 40) % 110), by = 36 + k * 5 + Math.round(Math.sin(t * 4 + k) * 1); pset(Math.round(bx), by, hex('#1a1020')); pset(Math.round(bx) - 1, by - 1, hex('#1a1020')); pset(Math.round(bx) + 1, by - 1, hex('#1a1020')); }
    R.recorte(null);
  }
  R.rect(94, 20, 226, 21, hex('#060408')); R.rect(94, 101, 226, 102, hex('#060408')); R.rect(94, 20, 95, 102, hex('#060408')); R.rect(225, 20, 226, 102, hex('#060408'));
  // las motas que bailan en la luz del proyector (que llega desde detrás de nosotros) y las luces de los peldaños
  for (let k = 0; k < 16; k++) { const x = Math.round(130 + h(k, 1, 64) * 70 + Math.sin(t * 0.7 + k) * 5), y = Math.round(30 + ((h(k, 2, 64) * 60 + t * (2 + k % 3)) % 60)); if (Math.sin(t * 1.7 + k * 3) > -0.2) pset(x, y, hex('#f4ecd0')); }
  for (const x of [92, 228]) for (let y = 114; y < 176; y += 12) pset(x, y, Math.sin(t * 2 + y) > -0.6 ? hex('#e8a040') : hex('#8a5a2a'));
  // el reflejo de la pantalla en el escenario y en el arranque del pasillo, y las luces de los peldaños, que laten
  { const c = vacia ? hex('#dfe4ec') : hex('#f0905a'), f = vacia ? 0.16 : 0.12 + 0.04 * Math.sin(t * 1.3);
    for (let y = 103; y < 128; y++) for (let x = 98 + (y - 103); x <= 222 - (y - 103); x++) if (c_b4(x, y) < 0.5 - (y - 103) / 60 && !c_screenxTapa[y * 320 + x]) pset(x, y, c_mez(R.pget(x, y), c, f)); }
  for (const y of [122, 136, 152]) { const w = 18 + (y - 113) * 0.55; for (let k = 0; k < 4; k++) { const x = Math.round(160 - w + 3 + k * (w * 2 - 6) / 3); pset(x, y + 1, Math.sin(t * 2.2 + k + y) > -0.3 ? hex('#ffd070') : hex('#8a5a2a')); } }
  // las salidas parpadean muy de vez en cuando
  if ((t % 7.3) < 0.08) for (const x0 of [6, 296]) for (let y = 107; y <= 113; y++) for (let x = x0 + 1; x <= x0 + 16; x++) if (R.pget(x, y) === hex('#2ac85a')) pset(x, y, hex('#1a7a3a'));
}
// la última fila de butacas, de espaldas, por delante de los actores (respaldos bajos, abajo del todo)
function c_screenxDelante(R, t) {
  const { pset } = R;
  for (let x = -6; x < 320; x += 24) {
    for (let j = 0; j < 12; j++) for (let i = 0; i < 22; i++) { const X = x + i, Y = 168 + j; const borde = i === 0 || i === 21 || (j === 0 && (i < 2 || i > 19)); if (j === 0 && (i < 1 || i > 20)) continue; pset(X, Y, borde ? hex('#100608') : j < 2 ? (i < 11 ? hex('#d06a6e') : hex('#b04a52')) : i < 3 ? hex('#8a2a36') : i > 18 ? hex('#4a1020') : (j > 8 && c_b4(X, Y) < 0.5) ? hex('#561420') : hex('#701a28')); }
    for (let i = 3; i < 19; i++) pset(x + i, 173, hex('#561420')); for (let j = 174; j < 180; j++) pset(x + 11, j, hex('#5a1622')); pset(x + 3, 169, hex('#f4b0b0'));
    // el portavasos entre butaca y butaca, con su brillo
    R.rect(x + 22, 170, x + 23, 179, hex('#14080c')); pset(x + 22, 171, hex('#8a7a80'));
  }
}
// las diez butacas: [x del actor (borde izquierdo), suelo]; fila de atrás y fila de delante, de perfil, mirando a la
// pantalla de la izquierda
const c_ASIENTOS = [[92, 126], [118, 126], [144, 126], [170, 126], [196, 126], [80, 158], [108, 158], [136, 158], [164, 158], [192, 158]];

const c_PANTALLA_CAL = [6, 26, 62, 116];

function c_calificacionFijo(R) {
  const { rect, pset } = R;
  // el techo acústico y la pared de fieltro acolchado con sus botones
  for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 8 === 0 || y % 8 === 0) ? hex('#1a1c26') : ((x + y) % 4 === 0 ? hex('#252836') : hex('#202330')));
  rect(0, 22, 319, 24, hex('#2a2e3c'));
  for (let y = 25; y < 120; y++) for (let x = 62; x < 320; x++) {
    const i = (x - 62) % 18, j = (y - 25) % 16, borde = i === 0 || j === 0, luz = i + j < 7;
    let c = borde ? hex('#283044') : luz ? hex('#46526a') : hex('#3a4458');
    if (!borde && h(x >> 1, y >> 1, 91) > 0.9) c = hex('#34405a');
    if (x > 272 && y < 48) c = borde ? hex('#323a50') : hex('#3a4458');
    pset(x, y, c);
    if (i === 0 && j === 0) { pset(x, y, hex('#1c2232')); }
  }
  // la pared de la izquierda, en perspectiva, con la pantalla
  for (let x = 0; x < 62; x++) { const u = x / 62, top = Math.round(lerp(18, 25, u)), bot = Math.round(lerp(132, 120, u)); for (let y = 0; y < 180; y++) if (y >= 24 && y <= bot) pset(x, y, (Math.floor(u * 6) % 2) ? hex('#2e3648') : hex('#34405a')); }
  // el zócalo y la moqueta con su dibujo de rombos
  rect(62, 118, 319, 121, hex('#1c202c')); rect(62, 118, 319, 118, hex('#4a5268'));
  for (let y = 121; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < Math.round(lerp(132, 120, Math.min(1, x / 62))) && x < 62) continue; const z = 60 / (y - 90), u = Math.floor((x - 160) * z / 8 + 100), v = Math.floor(y * z / 4); pset(x, y, ((u + v) % 2 === 0) ? (h(u, v, 2) > 0.85 ? hex('#5a3238') : hex('#4a262c')) : hex('#3e2026')); }
  // la cabina de proyección (ventanuco con su luz)
  rect(112, 32, 142, 48, hex('#1a1e2a')); rect(114, 34, 140, 46, hex('#3a3a4a')); rect(115, 35, 139, 45, hex('#e8d8a0')); rect(127, 35, 128, 45, hex('#1a1e2a')); rect(115, 42, 139, 45, hex('#c8a870'));
  // el calendario (sin año: la escena lo pone con o.anio) y las fotos viejas sobre el archivador
  rect(222, 46, 254, 88, hex('#1a1c24')); rect(223, 47, 253, 87, hex('#f0e8d4')); rect(223, 47, 253, 56, hex('#b83a3a'));
  rect(223, 47, 253, 47, hex('#d85a5a')); rect(223, 56, 253, 56, hex('#8a2a2a')); for (let i = 0; i < 7; i++) rect(226 + i * 4, 51, 227 + i * 4, 52, hex('#f6d8c8'));
  for (let y = 58; y < 87; y += 2) R.pset(252, y, hex('#d8ccb4')); rect(249, 84, 253, 87, hex('#d8ccb4')); R.linea(249, 87, 253, 83, hex('#a89c84'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { rect(226 + i * 4, 60 + j * 5, 227 + i * 4, 61 + j * 5, hex('#8a8070')); }
  R.anillo ? R.anillo(238.5, 70.5, 3.2, hex('#c83a3a')) : null; rect(230, 44, 231, 47, hex('#8a8a90')); rect(245, 44, 246, 47, hex('#8a8a90'));
  for (const [x, y, c] of [[266, 50, '#d8c8a0'], [282, 48, '#c8b890'], [298, 51, '#e0d0a8']]) {
    rect(x, y, x + 12, y + 14, hex('#f4ecd8')); rect(x + 1, y + 1, x + 11, y + 10, hex(c));
    rect(x + 3, y + 5, x + 9, y + 10, hex('#8a7050')); R.disco(x + 6, y + 4, 1.5, hex('#8a7050')); rect(x + 6, y - 1, x + 6, y, hex('#c83a3a'));
  }
  // el archivador metálico de tres cajones
  rect(262, 66, 312, 130, hex('#2a3430')); rect(263, 67, 311, 129, hex('#5a6a62')); rect(263, 67, 311, 68, hex('#7a8a80'));
  for (let k = 0; k < 3; k++) { const y = 71 + k * 19; rect(265, y, 309, y + 16, hex('#4a5850')); rect(265, y, 309, y, hex('#6a7a70')); rect(282, y + 3, 292, y + 6, hex('#d8d4c4')); rect(281, y + 9, 293, y + 10, hex('#9aa4a0')); rect(281, y + 11, 293, y + 11, hex('#3a4640')); }
  // la mesa del panel, con un vaso de lápices, la pila de fichas y una taza
  rect(206, 130, 310, 134, hex('#a87a4a')); rect(206, 130, 310, 130, hex('#d0a070')); rect(208, 135, 308, 142, hex('#6a4628'));
  for (let x = 210; x < 306; x++) if (h(x, 3, 11) > 0.7) pset(x, 132, hex('#946a3e'));
  for (const x of [210, 304]) rect(x - 1, 143, x + 1, 160, hex('#4a3018'));
  rect(212, 123, 218, 129, hex('#3a4a6a')); for (const [i, c] of [[0, '#e8c040'], [2, '#c83a3a'], [4, '#3a8a4a']]) rect(213 + i, 117 + i, 213 + i, 122, hex(c));
  for (let k = 0; k < 4; k++) rect(286 + k, 128 - k * 2, 304 - k, 129 - k * 2, k % 2 ? hex('#f4ecd4') : hex('#e4dcc4'));
  rect(294, 120, 299, 120, hex('#e8e4dc'));
  // la almohadilla de tinta
  rect(258, 125, 276, 129, hex('#1a1e2a')); rect(259, 125, 275, 127, hex('#8a1a2a')); rect(259, 125, 275, 125, hex('#c83a4a'));
  // arriba en la pared: el altavoz de la sala, dos fotogramas enmarcados (una tira de película y un paisaje), el reloj
  // (sus agujas las mueve la vida) y dos apliques de latón con su abanico de luz; en el techo, dos paneles de luz
  rect(66, 28, 84, 52, hex('#10121a')); rect(67, 29, 83, 51, hex('#262a36')); rect(67, 29, 83, 29, hex('#4a5064'));
  for (let y = 31; y <= 49; y += 2) for (let x = 69; x <= 81; x += 2) pset(x, y, hex('#181a24'));
  for (const y of [36, 46]) { R.disco(75, y, 4, hex('#14161e')); R.disco(75, y, 3, hex('#30343f')); R.disco(75, y, 1, hex('#0a0a10')); pset(74, y - 2, hex('#5a6070')); }
  for (const [x0, tipo] of [[146, 0], [198, 1]]) {
    rect(x0, 30, x0 + 18, 46, hex('#1a1408')); rect(x0 + 1, 31, x0 + 17, 45, hex('#c8a04a')); rect(x0 + 1, 31, x0 + 17, 31, hex('#f0d080')); rect(x0 + 3, 33, x0 + 15, 43, hex('#14141c'));
    if (tipo === 0) { rect(x0 + 3, 35, x0 + 15, 41, hex('#2a2a34')); for (let x = x0 + 4; x <= x0 + 14; x += 2) { pset(x, 34, hex('#e8e4d8')); pset(x, 42, hex('#e8e4d8')); } rect(x0 + 4, 36, x0 + 8, 40, hex('#e8a040')); rect(x0 + 10, 36, x0 + 14, 40, hex('#3a8ae8')); }
    else { for (let y = 33; y <= 43; y++) for (let x = x0 + 3; x <= x0 + 15; x++) pset(x, y, y < 39 ? c_rampa([hex('#3a6ac8'), hex('#8ab8e8')], (y - 33) / 6, x, y) : hex('#3a7a4a')); R.poligono([[x0 + 4, 40], [x0 + 9, 35], [x0 + 13, 40]], hex('#5a6a7a')); R.disco(x0 + 13, 35, 1, hex('#f8e080')); }
    for (let x = x0 + 2; x <= x0 + 19; x++) if (c_b4(x, 47) < 0.5) pset(x, 47, hex('#283044'));
  }
  R.disco(181, 39, 9, hex('#14161e')); R.disco(181, 39, 8, hex('#c8c0a8')); R.disco(181, 39, 7, hex('#f4f0e4'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(181 + Math.cos(a) * 6), Math.round(39 + Math.sin(a) * 6), k % 3 ? hex('#8a8478') : hex('#2a2a30')); }
  for (const x of [100, 190]) {
    for (let y = 56; y < 92; y++) { const w = (y - 56) * 0.45 + 3; for (let i = -w; i <= w; i++) { const xx = Math.round(x + i); if (c_b4(xx, y) < 0.32 - (y - 56) / 140) pset(xx, y, c_mez(R.pget(xx, y), hex('#f0d8a0'), 0.25)); } }
    for (let y = 50; y >= 36; y--) { const w = (50 - y) * 0.4 + 3; for (let i = -w; i <= w; i++) { const xx = Math.round(x + i); if (c_b4(xx, y) < 0.3 - (50 - y) / 60) pset(xx, y, c_mez(R.pget(xx, y), hex('#f0d8a0'), 0.25)); } }
    rect(x - 4, 50, x + 4, 55, hex('#5a4018')); rect(x - 3, 50, x + 3, 54, hex('#c8a04a')); rect(x - 3, 50, x + 3, 50, hex('#f8e090')); rect(x - 1, 55, x + 1, 57, hex('#8a6a2a')); rect(x - 2, 49, x + 2, 49, hex('#fff4c8'));
  }
  for (const x0 of [188, 236]) { rect(x0, 9, x0 + 26, 15, hex('#14161e')); rect(x0 + 1, 10, x0 + 25, 14, hex('#c8d0e0')); for (let x = x0 + 5; x < x0 + 25; x += 5) rect(x, 10, x, 14, hex('#8a92a8')); rect(x0 + 1, 10, x0 + 25, 10, hex('#f0f4fc')); }
  R.disco(176, 19, 2, hex('#d8dce4')); pset(175, 18, hex('#ffffff'));
  // las butacas: el respaldo de cada una, por detrás de quien se sienta (mirando a la izquierda)
  for (const [x, s] of c_ASIENTOS) {
    rect(x + 9, s - 21, x + 15, s - 2, hex('#122a34')); rect(x + 10, s - 20, x + 14, s - 2, hex('#2a5a6a')); rect(x + 10, s - 20, x + 14, s - 19, hex('#4a8a9a'));
    rect(x + 12, s - 17, x + 12, s - 4, hex('#22505e')); rect(x + 4, s - 1, x + 10, s, hex('#101418'));
  }
}
// la imagen de la pantalla de la izquierda (en perspectiva): una pelea de siluetas sobre luz azul, con destellos
function c_calificacion(R, t, o) {
  R.copiar(c_capa(R, 'calificacion', () => c_calificacionFijo(R)));
  // el año del calendario, si la escena lo da (o.anio); sin él, la banda roja queda con sus días sin número
  if (o.anio != null) { R.rect(224, 48, 252, 55, hex('#b83a3a')); R.numero(String(o.anio), 238, 55, { centro: true, color: hex('#fff4e0') }); }
  const { pset } = R, [X0, , X1] = c_PANTALLA_CAL, AZ = [hex('#1a2a5a'), hex('#24407a'), hex('#3a5a9a'), hex('#6a8ac8'), hex('#a8c4ec')];
  const fase = (t % 3.2) / 3.2, a = 0.3 + Math.sin(fase * Math.PI * 2) * 0.1, b = 0.7 - Math.sin(fase * Math.PI * 2) * 0.1, golpe = Math.sin(fase * Math.PI * 2) > 0.92;
  for (let x = X0; x <= X1; x++) {
    const u = (x - X0) / (X1 - X0), top = Math.round(lerp(26, 40, u)), bot = Math.round(lerp(116, 100, u)), s = 1 - u;
    for (let y = top; y <= bot; y++) {
      const v = (y - top) / (bot - top);
      let c = c_rampa(AZ, 0.95 - v * 0.8 + Math.sin(s * 9 + t) * 0.05, x, y);
      if (v > 0.78) c = hex('#0e1430');
      if (c_luchadores(s * 60, v * 80, fase)) c = hex('#060a18');
      if (golpe && Math.hypot((s - 0.53) * 9, (v - 0.42) * 6) < 0.9 + Math.sin(t * 30) * 0.3) c = hex('#f8f4ff');
      pset(x, y, c);
    }
  }
  for (let x = X0; x <= X1; x++) { pset(x, Math.round(lerp(25, 39, (x - X0) / (X1 - X0))), hex('#0a0c14')); pset(x, Math.round(lerp(117, 101, (x - X0) / (X1 - X0))), hex('#0a0c14')); }
  // el haz del proyector desde la cabina hasta la pantalla, con motas
  for (let k = 0; k <= 60; k++) { const f = k / 60, cx = lerp(127, 36, f), cy = lerp(44, 70, f), w = 2 + f * 18;
    for (let j = -w; j <= w; j++) { const x = Math.round(cx), y = Math.round(cy + j); if (c_b4(x, y) < 0.12 && ((x + Math.floor(t * 4)) % 2 === 0)) pset(x, y, c_mez(R.pget(x, y), hex('#c8d8f0'), 0.3)); } }
  for (let k = 0; k < 10; k++) { const f = (h(k, 1, 33) + t * 0.05 * (1 + k % 3)) % 1, x = Math.round(lerp(127, 36, f)), y = Math.round(lerp(44, 70, f) + (h(k, 2, 33) - 0.5) * f * 30 + Math.sin(t + k) * 2); pset(x, y, hex('#f0f4ff')); }
  if (Math.sin(t * 9) > 0.6) pset(120, 40, hex('#ffffff'));
  // el reloj de pared (minutero que avanza, segundero que corre), el piloto del detector de humo y la luz de la pantalla
  // que tiembla sobre la moqueta de su lado
  { const m = t * 0.05, sg = t * 1.05; R.linea(181, 39, Math.round(181 + Math.cos(m * 6.283 - 1.57) * 5), Math.round(39 + Math.sin(m * 6.283 - 1.57) * 5), hex('#1a1a20')); R.linea(181, 39, 178, 37, hex('#1a1a20')); R.linea(181, 39, Math.round(181 + Math.cos(sg - 1.57) * 6), Math.round(39 + Math.sin(sg - 1.57) * 6), hex('#c83a3a')); pset(181, 39, hex('#c83a3a')); }
  pset(176, 21, (t % 2.5) < 0.15 ? hex('#ff3a3a') : hex('#5a2a2a'));
  { const f = 0.08 + 0.06 * Math.sin(t * 5.3) + (golpe ? 0.12 : 0); for (let y = 121; y < 152; y++) for (let x = 0; x < 78 - (y - 121); x++) if (c_b4(x, y) < 0.5) pset(x, y, c_mez(R.pget(x, y), hex('#8ab0f0'), f * (1 - (y - 121) / 34))); }
  // el sello de mesa (una prensa de palanca): o.sello 0–3 golpea; marca el 13 solo al tercer golpe
  c_prensa(R, t, o.sello ?? 0);
}
// la película del panel: dos luchadores en una rejilla de 60 × 80 (s, v): cabeza, tronco, brazos y piernas; uno lanza un
// puñetazo y el otro levanta la guardia y se echa atrás (fase 0–1)
const c_seg = (x, y, a, b, c, d) => { const dx = c - a, dy = d - b, u = Math.max(0, Math.min(1, ((x - a) * dx + (y - b) * dy) / (dx * dx + dy * dy))); return Math.hypot(x - a - u * dx, y - b - u * dy); };

function c_luchadores(x, y, fase) {
  const g = Math.sin(fase * Math.PI * 2), p = Math.max(0, g), A = 18 + p * 4, B = 42 + p * 2;
  const segs = [[A, 30, A, 52], [A, 52, A - 5, 68], [A, 52, A + 4, 68], [A, 36, A + 6 + p * 10, 34 - p * 2], [A, 36, A + 6, 42], [A, 36, A - 4, 44],
    [B, 30, B, 52], [B, 52, B + 5, 68], [B, 52, B - 4, 68], [B, 36, B - 6, 30], [B, 36, B - 7, 36], [B, 36, B + 5, 44]];
  if (Math.hypot(x - A, y - 25) < 4.5 || Math.hypot(x - B - p * 2, y - 25) < 4.5) return true;
  return segs.some(([a, b, c, d]) => c_seg(x, y, a, b, c, d) < 2.2);
}

// la prensa de sellar: base, columna, brazo y la palanca; el pisón baja con cada golpe y el polvo salta; la ficha de
// debajo enseña el sello rojo «13» solo después del tercer golpe
function c_prensa(R, t, s) {
  const { rect, pset } = R, k = Math.ceil(s), f = s - Math.floor(s), hecho = s >= 3;
  const baja = hecho || s <= 0 ? 0 : (f === 0 ? 1 : f < 0.7 ? f / 0.7 * 0.15 : 0.15 + ((f - 0.7) / 0.3) ** 2 * 0.85);
  const cerca = !hecho && s > 0 && (f > 0.9 || f === 0), tiembla = cerca ? (Math.floor(t * 40) & 1) : 0;
  // la ficha bajo el sello
  rect(226, 127, 246, 129, hex('#f4ecd4')); rect(226, 127, 246, 127, hex('#ffffff'));
  if (hecho) { rect(230, 126, 242, 129, hex('#c82a3a')); rect(231, 127, 241, 128, hex('#f4ecd4')); R.numero('13', 236, 129, { centro: true, fina: true, color: hex('#c82a3a'), sombra: false }); }
  rect(222, 129, 252, 131, hex('#2a2e38')); rect(222, 129, 252, 129, hex('#6a7080'));
  rect(246, 92, 250, 129, hex('#3a3e4a')); rect(246, 92, 247, 129, hex('#7a8090'));
  rect(230, 92 + tiembla, 250, 97 + tiembla, hex('#4a4e5a')); rect(230, 92 + tiembla, 250, 92 + tiembla, hex('#8a90a0'));
  const y = 98 + Math.round(baja * 22);
  rect(235, 97, 237, y, hex('#9aa0ac')); rect(235, 97, 235, y, hex('#d0d4dc'));
  rect(229, y, 243, y + 4, hex('#7a3a1e')); rect(229, y, 243, y, hex('#a85a30')); rect(230, y + 5, 242, y + 6, hex('#8a1a2a'));
  const ang = -0.5 + baja * 0.9; R.linea(249, 93, Math.round(249 + Math.cos(ang) * 16), Math.round(93 + Math.sin(ang) * 16), hex('#2a2e38')); R.disco(Math.round(249 + Math.cos(ang) * 16), Math.round(93 + Math.sin(ang) * 16), 2, hex('#c83a3a'));
  if (cerca) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI, r = 6 + (Math.floor(t * 30) % 3); pset(Math.round(236 + Math.cos(a) * r * 1.6), Math.round(126 - Math.sin(a) * r * 0.5), hex('#e8e0d0')); }
  if (k >= 1 && !hecho && f > 0 && f < 0.4) for (let i = 0; i < 3; i++) pset(226 + i * 9, 124 - Math.round(f * 10) - i, hex('#c8c0b0'));
}

// las tarjetas del panel: G verde con un círculo, PG azul con dos figuritas, PG-13 naranja con 13, R roja con «!»,
// NC-17 morada con 17
const c_TARJ = { G: hex('#3aa84a'), PG: hex('#3a7ac8'), PG13: hex('#e8902a'), R: hex('#c82a3a'), NC17: hex('#7a3aa8') };

const c_VOTOS = ['PG13', 'R', 'PG13', 'PG', 'PG13', 'G', 'PG13', 'R', 'PG13', 'PG13'];

function c_tarjeta(R, x, y, tipo) {
  const { rect, pset } = R, c = c_TARJ[tipo] ?? c_TARJ.PG13;
  rect(x - 1, y - 1, x + 12, y + 9, hex('#140c10')); rect(x, y, x + 11, y + 8, c); rect(x, y, x + 11, y, c_mez(c, hex('#ffffff'), 0.4));
  if (tipo === 'PG13' || tipo === 'NC17') { rect(x + 1, y + 1, x + 10, y + 7, hex('#fff8ec')); R.numero(tipo === 'PG13' ? '13' : '17', x + 6, y + 7, { centro: true, fina: true, color: c, sombra: false }); }
  else if (tipo === 'G') { R.anillo ? R.anillo(x + 6, y + 4.5, 2.6, hex('#ffffff')) : R.disco(x + 6, y + 4, 2, hex('#ffffff')); }
  else if (tipo === 'PG') { for (const dx of [3, 8]) { pset(x + dx, y + 2, hex('#ffffff')); rect(x + dx - 1, y + 4, x + dx + 1, y + 6, hex('#ffffff')); } }
  else { rect(x + 5, y + 1, x + 6, y + 5, hex('#ffffff')); rect(x + 5, y + 7, x + 6, y + 7, hex('#ffffff')); }
}

// por delante de los actores: el asiento y el brazo de cada butaca (tapan las piernas) y, con o.tarjetas, las tarjetas
// que suben en su palito por delante de cada butaca, al lado de la cara (o.votos: diez tipos, por orden de c_ASIENTOS)
function c_calificacionDelante(R, t, o) {
  const { rect } = R, p = o.tarjetas ?? 0, votos = o.votos ?? c_VOTOS, sent = o.sentados ?? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  c_ASIENTOS.forEach(([x, s], k) => {
    rect(x - 1, s - 9, x + 13, s - 6, hex('#122a34')); rect(x, s - 9, x + 12, s - 8, hex('#3a7a8a')); rect(x, s - 7, x + 12, s - 6, hex('#22505e'));
    rect(x - 2, s - 13, x + 2, s - 12, hex('#5a4a3a')); rect(x - 1, s - 11, x, s - 6, hex('#3a2e24'));
    rect(x + 5, s - 5, x + 7, s - 1, hex('#1a1e24')); rect(x + 2, s, x + 10, s, hex('#2a2e34'));
    if (!sent.includes(k)) return;
    const q = Math.max(0, Math.min(1, p * 1.5 - (k % 5) * 0.08 - Math.floor(k / 5) * 0.06)); if (q <= 0) return;
    const e = 1 - (1 - q) ** 3, ty = Math.round(lerp(s - 16, s - 38, e) + (q >= 1 ? Math.sin(t * 3 + k) * 0.8 : 0));
    rect(x - 7, ty + 9, x - 7, s - 13, hex('#c8a878')); c_tarjeta(R, x - 13, ty, votos[k]);
  });
}

const c_FICHAS = [[44, 104], [102, 106], [160, 103], [218, 105], [276, 104]];

// el cohete (la ciencia ficción), la gota y la espada de las fichas
const c_COHETE = ['..#..', '.###.', '.#o#.', '.###.', '.###.', '##.##', '#...#'];

const c_GOTA = ['..#..', '..#..', '.###.', '#####', '#####', '.###.'];

const c_ESPADA = ['....#', '...#.', '..#..', '##...', '.#...', '#.#..'];

function c_fichasFijo(R) {
  const { rect, pset } = R;
  // la mesa de roble claro con vetas largas (más tranquilas arriba a la derecha) y una carpeta de escritorio verde
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const beta = Math.sin(y * 0.35 + Math.sin(x * 0.02 + y * 0.01) * 3 + h(0, y >> 3, 4) * 6), calma = x > 262 && y < 50;
    let c = beta > 0.85 && !calma ? hex('#b8865a') : beta < -0.9 && !calma ? hex('#d8aa78') : hex('#c8986a');
    if (h(x >> 2, y, 12) > 0.96 && !calma) c = hex('#a87a4e');
    if (y % 30 === 0) c = hex('#8a6038');
    const luz = 1 - Math.hypot(x - 10, (y + 30) * 1.3) / 240;
    if (luz > 0) c = c_mez(c, hex('#ffe8c0'), Math.min(0.35, luz * 0.5) * (c_b4(x, y) < 0.7 ? 1 : 0.6));
    else if (luz < -0.2 && c_b4(x, y) < -luz * 0.5) c = c_mez(c, hex('#5a3a20'), 0.25);
    pset(x, y, c);
  }
  rect(10, 60, 310, 160, hex('#1e3a2e')); rect(12, 62, 308, 158, hex('#2a5040'));
  for (let y = 62; y <= 158; y++) for (let x = 12; x <= 308; x++) { if (h(x >> 1, y >> 1, 13) > 0.88) pset(x, y, hex('#2e5644')); else if (x + (158 - y) * 1.2 < 130 && c_b4(x, y) < 0.3) pset(x, y, hex('#325c4a')); }
  // el pespunte de la carpeta y su sombra en la madera
  for (let x = 25; x < 296; x += 3) { pset(x, 65, hex('#4a7a62')); pset(x, 155, hex('#4a7a62')); } for (let y = 66; y < 155; y += 3) { pset(25, y, hex('#4a7a62')); pset(295, y, hex('#4a7a62')); }
  rect(12, 161, 312, 162, hex('#8a6038')); rect(311, 62, 312, 160, hex('#8a6038'));
  rect(10, 60, 22, 160, hex('#5a3a24')); rect(298, 60, 310, 160, hex('#5a3a24')); rect(10, 60, 22, 61, hex('#8a6038')); rect(298, 60, 310, 61, hex('#8a6038'));
  // la taza con su cerco, lápices, clips y una goma con sus migas
  R.disco(40, 36, 11, hex('#7a6248')); R.disco(40, 36, 9, hex('#f4f0e8')); R.disco(40, 36, 7, hex('#4a2a16')); R.disco(38, 34, 2, hex('#6a4024')); rect(50, 33, 55, 38, hex('#f4f0e8')); rect(51, 35, 54, 36, hex('#c8986a'));
  for (let a = 0; a < 40; a++) { const b = a / 40 * Math.PI * 2; if (a % 3) pset(Math.round(72 + Math.cos(b) * 9), Math.round(40 + Math.sin(b) * 9), hex('#a87a4e')); }
  R.linea(30, 170, 80, 162, hex('#e8c040')); R.linea(30, 171, 80, 163, hex('#c89a20')); R.linea(80, 162, 84, 162, hex('#f0c8a0')); pset(85, 162, hex('#2a2a2a')); rect(26, 170, 29, 172, hex('#e88a9a'));
  for (const [x, y] of [[120, 166], [132, 170]]) { R.linea(x, y, x + 8, y, hex('#b8c0cc')); R.linea(x, y + 3, x + 8, y + 3, hex('#b8c0cc')); R.linea(x, y, x, y + 3, hex('#b8c0cc')); R.linea(x + 8, y, x + 8, y + 2, hex('#b8c0cc')); }
  rect(240, 164, 252, 170, hex('#f0a8b0')); rect(240, 164, 252, 165, hex('#f8d0d4')); for (let k = 0; k < 5; k++) pset(256 + k * 3, 168 + (k % 2), hex('#e8c0c4'));
  // la lata de película con sus cinco agujeros y el buje (la cinta asoma por un lado)
  R.disco(107, 41, 14, hex('#7a5232')); R.disco(104, 38, 14, hex('#6a727c')); R.disco(104, 38, 13, hex('#b8c0c8')); R.disco(104, 38, 11, hex('#9aa2ac')); R.disco(104, 38, 10, hex('#c8d0d8'));
  for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - 0.3, x = Math.round(104 + Math.cos(a) * 6), y = Math.round(38 + Math.sin(a) * 6); R.disco(x, y, 2, hex('#4a3a2a')); pset(x - 1, y - 1, hex('#2a2018')); }
  R.disco(104, 38, 2, hex('#5a626c')); pset(104, 38, hex('#e8eef4')); for (let a = 3.5; a < 4.7; a += 0.08) pset(Math.round(104 + Math.cos(a) * 12), Math.round(38 + Math.sin(a) * 12), hex('#f4f8fc'));
  rect(116, 46, 128, 48, hex('#2a2018')); rect(116, 46, 128, 46, hex('#4a3a2a')); for (let x = 117; x < 128; x += 3) pset(x, 47, hex('#8a7a6a'));
  // tres cajas de discos apiladas y torcidas (portadas de color con su dibujo, sin letras)
  [[136, 30, '#2a4a8a', '#e8a040'], [142, 27, '#8a2a3a', '#4ac8e8'], [149, 24, '#1a1a24', '#3ae88a']].forEach(([x, y, c, d], k) => {
    rect(x + 2, y + 2, x + 30, y + 24, hex('#5a3a20')); rect(x, y, x + 28, y + 22, hex('#0e0e14')); rect(x + 1, y + 1, x + 27, y + 21, hex(c)); rect(x + 1, y + 1, x + 3, y + 21, c_mez(hex(c), hex('#000000'), 0.4));
    if (k === 2) { for (let j = 0; j < 14; j++) for (let i = 0; i < 20; i++) pset(x + 6 + i, y + 4 + j, c_rampa([hex('#14301e'), hex('#1e4a2e'), hex('#2a6a3e')], j / 14, x + i, y + j)); R.disco(x + 16, y + 11, 4, hex('#5a6a62')); rect(x + 13, y + 10, x + 19, y + 10, hex(d)); rect(x + 6, y + 4, x + 26, y + 4, hex('#3a5a4a')); }
    rect(x + 6, y + 18, x + 22, y + 19, hex('#f4ecd4')); rect(x + 24, y + 17, x + 26, y + 19, hex(d)); pset(x + 27, y + 1, hex('#ffffff')); R.linea(x + 25, y + 1, x + 27, y + 3, hex('#ffffff'));
  });
  // las gafas de leer, plegadas
  for (const gx of [208, 220]) { R.anillo(gx + 0.5, 46.5, 4.6, hex('#2a2a30')); for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 10) pset(gx + i, 46 + j, c_mez(R.pget(gx + i, 46 + j), hex('#c8e0f0'), 0.35)); pset(gx - 2, 44, hex('#ffffff')); }
  R.linea(212, 45, 216, 45, hex('#2a2a30')); R.linea(203, 45, 198, 52, hex('#2a2a30')); R.linea(225, 45, 230, 52, hex('#2a2a30')); for (let x = 205; x < 226; x++) if (c_b4(x, 52) < 0.4) pset(x, 52, hex('#a87a4e'));
  // el móvil boca arriba (la pantalla la enciende la vida)
  rect(163, 164, 191, 179, hex('#7a5232')); rect(161, 162, 189, 179, hex('#14141a')); rect(162, 163, 188, 179, hex('#2a2a34')); rect(162, 163, 188, 163, hex('#4a4a58'));
  // la almohadilla de tinta
  rect(198, 14, 240, 32, hex('#1a1e2a')); rect(200, 16, 238, 28, hex('#8a1a2a')); rect(200, 16, 238, 17, hex('#c83a4a'));
  for (let y = 18; y <= 28; y++) for (let x = 200; x <= 238; x++) { const v = h(x >> 1, y, 52); if (v > 0.8) pset(x, y, hex('#a82a3a')); else if (v < 0.12) pset(x, y, hex('#6a1020')); }
  rect(198, 30, 240, 32, hex('#8a929c')); rect(198, 30, 240, 30, hex('#c8d0d8')); rect(200, 33, 242, 34, hex('#a87a4e'));
  // las cinco fichas: sombra, cartulina, renglones (sin letras), el número de la película, el icono y su 13 de la esquina
  c_FICHAS.forEach(([cx, cy], k) => {
    const x0 = cx - 22, y0 = cy - 29, x1 = cx + 21, y1 = cy + 28;
    rect(x0 + 3, y0 + 3, x1 + 3, y1 + 3, hex('#14261e'));
    rect(x0, y0, x1, y1, hex('#f4ecd4')); rect(x0, y0, x1, y0 + 9, k === 4 ? hex('#e8d0c8') : hex('#e4dcc4')); rect(x0, y0 + 10, x1, y0 + 10, hex('#c84a4a'));
    for (let y = y0 + 15; y < y1 - 2; y += 5) for (let x = x0 + 2; x < x1 - 1; x++) pset(x, y, hex('#b8cce0'));
    for (let y = y0 + 16; y < y1 - 14; y += 5) for (let x = x0 + 4; x < x0 + 6 + Math.floor(h(k, y, 3) * 28); x += 1) if ((x + y) % 3) pset(x, y - 1, hex('#7a7a8a'));
    R.numero(String(k + 1), x0 + 6, y0 + 8, { centro: true, color: hex('#3a3a4a'), sombra: false });
    if (k < 4) c_planeta(R, cx + 10, y0 + 20); else c_gotaEspada(R, cx, y0);
    rect(x1 - 15, y1 - 10, x1 - 3, y1 - 3, hex('#3a3a4a')); rect(x1 - 14, y1 - 9, x1 - 4, y1 - 4, hex('#f4ecd4')); R.numero('13', x1 - 9, y1 - 4, { centro: true, fina: true, color: hex('#3a3a4a'), sombra: false });
    if (k < 4) { rect(cx - 16, y1 - 12, cx - 4, y1 - 4, hex('#c82a3a')); rect(cx - 15, y1 - 11, cx - 5, y1 - 5, hex('#f4ecd4')); R.numero('13', cx - 10, y1 - 5, { centro: true, fina: true, color: hex('#c82a3a'), sombra: false }); }
  });
}
// la mesa de cerca: cinco fichas en fila, el sello que baja desde arriba (se acerca: más grande y su sombra se encoge) y,
// al tercer golpe, la marca roja «13» en la quinta; el vapor de la taza, la luz del flexo que tiembla y motas de polvo
function c_fichas(R, t, o) {
  R.copiar(c_capa(R, 'fichas', () => c_fichasFijo(R)));
  const { pset, rect } = R, s = o.sello ?? 0, f = s - Math.floor(s), hecho = s >= 3, [cx, cy] = c_FICHAS[4];
  const alto = hecho || s <= 0 ? 1 : (f === 0 ? 0 : f < 0.6 ? 0.6 + f / 0.6 * 0.4 : 1 - ((f - 0.6) / 0.4) ** 2);
  for (let k = 0; k < 4; k++) { const y = 26 - ((t * 7 + k * 6) % 20), x = 40 + Math.round(Math.sin(t * 1.5 + k * 2 + y * 0.2) * 3); if (y > 22) { pset(x, Math.round(y), hex('#f0ece4')); pset(x + 1, Math.round(y) - 1, hex('#e0dcd4')); } }
  for (let k = 0; k < 12; k++) { const x = Math.round(60 + h(k, 1, 44) * 200 + Math.sin(t * 0.5 + k) * 6), y = Math.round(40 + ((h(k, 2, 44) * 120 + t * (1.5 + k % 3)) % 120)); if (Math.sin(t * 1.3 + k * 2) > 0) pset(x, y, hex('#fff8e0')); }
  if (hecho) { rect(cx - 15, cy - 2, cx + 13, cy + 14, hex('#c82a3a')); rect(cx - 13, cy, cx + 11, cy + 12, hex('#f4ecd4')); R.numero('13', cx - 1, cy + 11, { centro: true, tam: 8, color: hex('#c82a3a'), sombra: false }); for (let k = 0; k < 14; k++) if (h(k, 1, 77) > 0.5) pset(cx - 13 + Math.floor(h(k, 2, 77) * 24), cy + Math.floor(h(k, 3, 77) * 12), hex('#f4ecd4')); }
  if (s > 0 && !hecho) {
    const r = 12 + alto * 7, sh = Math.round(4 + alto * 10);
    for (let y = cy - r + sh; y <= cy + r + sh; y++) for (let x = cx - r + sh; x <= cx + r + sh; x++) if (c_b4(x, y) < 0.55 - alto * 0.25) pset(x, y, c_mez(R.pget(x, y), hex('#000000'), 0.35));
    // el sello sube y baja (más grande cuanto más cerca) y la mano lo coge del pomo; el brazo entra en diagonal desde el
    // borde derecho (el hombro, fuera de cuadro: se ven unos 35 px de manga)
    const ky = cy + 4 - Math.round(alto * 8); c_selloArriba(R, cx, ky, Math.round(r * 0.78));
    brazo(R, 340, ky + 26, cx + 12, ky + 1, '#5a6a8a', -1);
    if (alto < 0.08) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 24), Math.round(cy + 4 + Math.sin(a) * 18), hex('#f0e8d8')); }
  } else {
    for (let y = 52; y <= 72; y++) for (let x = 254; x <= 276; x++) if (c_b4(x, y) < 0.45) pset(x, y, c_mez(R.pget(x, y), hex('#000000'), 0.3));
    c_selloArriba(R, 262, 56, 9);
  }
  // el móvil: la pantalla con un tráiler de colores que cambia y, cada pocos segundos, un aviso que vibra
  { const av = (t % 5.5) < 0.9, dx = av ? Math.round(Math.sin(t * 60)) : 0, esc = Math.floor(t / 1.6) % 3, CC = [[hex('#1a2a5a'), hex('#e8a040')], [hex('#3a1a2a'), hex('#e84a5a')], [hex('#14301e'), hex('#3ae88a')]][esc];
    for (let y = 165; y <= 177; y++) for (let x = 164; x <= 186; x++) pset(x + dx, y, c_rampa([CC[0], c_mez(CC[0], CC[1], 0.5), CC[1]], (y - 165) / 14 + Math.sin(x * 0.4 + t * 2) * 0.1, x, y));
    R.disco(175 + dx + Math.round(Math.sin(t) * 4), 170, 2, hex('#f8f0d0'));
    if (av) { rect(166 + dx, 165, 184 + dx, 168, hex('#f4f4f8')); rect(167 + dx, 166, 169 + dx, 167, hex('#3a8ae8')); rect(171 + dx, 166, 182 + dx, 166, hex('#8a8a9a')); } }
  // el brillo que gira despacio en el borde de la lata de película
  { const a = t * 0.8; for (let k = 0; k < 4; k++) { const b = a + k * 0.06; pset(Math.round(104 + Math.cos(b) * 12.5), Math.round(38 + Math.sin(b) * 12.5), hex('#ffffff')); } }
  // la luz del flexo, que tiembla un poco
  if (Math.sin(t * 13) > 0.97) c_tinte(R, 0, 0, 120, 60, hex('#fff4d0'), 0.06);
}
const c_CV = {
  techo: hex('#120c16'), techoL: hex('#1c1422'), neonM: hex('#ff4ab0'), neonMS: hex('#8a2a6a'), neonC: hex('#4ae8f0'), neonCS: hex('#2a7a8a'),
  pared: hex('#4a1a2a'), paredL: hex('#5e2436'), paredS: hex('#36121e'), zocalo: hex('#2a1418'), laton: hex('#c8a04a'), latonL: hex('#f0d080'),
  k: hex('#0a0608'), cristal: hex('#9ac8e0'),
};

// la moqueta de cine en perspectiva: rombos morados, círculos dorados y filetes turquesa
function c_moqueta(R, y0, vx = 160) {
  for (let y = y0; y < 180; y++) { const z = 70 / (y - y0 + 22); for (let x = 0; x < 320; x++) {
    const u = (x - vx) * z / 6 + 200, v = (y - y0) * z * 0.9 + (y - y0) * 0.15, cu = u - Math.floor(u / 8) * 8 - 4, cv = v - Math.floor(v / 8) * 8 - 4;
    let c = (Math.abs(cu) + Math.abs(cv) < 3.2) ? hex('#5a2a5a') : hex('#3a1838');
    if (Math.hypot(cu, cv) < 1.3) c = hex('#c8a040'); if (Math.abs(Math.abs(cu) + Math.abs(cv) - 4) < 0.35) c = hex('#2a6a6a');
    if (h(x, y, 17) > 0.95) c = c_mez(c, hex('#000000'), 0.3);
    R.pset(x, y, c_mez(c, hex('#0a0408'), Math.max(0, Math.min(0.5, (y - y0) / 120 + Math.abs(x - vx) / 700))));
  } }
}

// un cartel enmarcado con luz (sin letras): 'doom' la máscara y la capucha verdes; 'dune' el desierto y el gusano de
// arena; al pie, unas barras que insinúan los créditos
function c_cartel(R, x0, y0, x1, y1, tipo) {
  const { rect, pset } = R, w = x1 - x0, hh = y1 - y0, cx = (x0 + x1) >> 1;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#1a1014')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, c_CV.laton); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, c_CV.latonL);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const u = (y - y0) / hh; let c;
    if (tipo === 'doom') { c = c_rampa([hex('#0a1a10'), hex('#123a22'), hex('#1a5a32'), hex('#2a8a4a')], 1 - Math.abs(x - cx) / w * 1.4 - Math.abs(u - 0.4), x, y); if (h(x, y, 5) > 0.96) c = hex('#3ae88a'); }
    else { c = u < 0.55 ? c_rampa([hex('#c85a2a'), hex('#e0803a'), hex('#f0b060'), hex('#f8d890')], u / 0.55, x, y) : (Math.sin(x * 0.25 + u * 9) * 0.06 + u > 0.7 ? hex('#c8904a') : hex('#e0aa62')); }
    pset(x, y, c);
  }
  if (tipo === 'doom') {
    const my = y0 + Math.round(hh * 0.38);
    R.poligono([[cx - 11, my + 16], [cx - 10, my - 6], [cx - 5, my - 13], [cx + 5, my - 13], [cx + 10, my - 6], [cx + 11, my + 16]], hex('#2a6a3a'));
    R.poligono([[cx - 8, my + 16], [cx - 7, my - 5], [cx + 7, my - 5], [cx + 8, my + 16]], hex('#1a4a26'));
    rect(cx - 6, my - 6, cx + 6, my + 8, hex('#7a7e86')); rect(cx - 6, my - 6, cx + 6, my - 5, hex('#a8acb4')); rect(cx + 4, my - 4, cx + 6, my + 8, hex('#4a4e56'));
    rect(cx - 5, my - 1, cx - 2, my, hex('#0a0c0e')); rect(cx + 2, my - 1, cx + 5, my, hex('#0a0c0e')); rect(cx - 1, my + 1, cx, my + 4, hex('#5a5e66')); rect(cx - 3, my + 5, cx + 3, my + 5, hex('#0a0c0e'));
    for (const [i, j] of [[-5, -4], [5, -4], [-5, 6], [5, 6]]) pset(cx + i, my + j, hex('#c8ccd4'));
    pset(cx - 4, my - 1, hex('#3ae88a')); pset(cx + 3, my - 1, hex('#3ae88a'));
  } else {
    const sy = y0 + Math.round(hh * 0.25); R.disco(cx + 5, sy, 3, hex('#fff4d0')); R.disco(cx - 6, sy + 4, 2, hex('#fff0c0'));
    const gy = y0 + Math.round(hh * 0.62);
    for (let j = 0; j < 18; j++) { const r = 7 - j * 0.15; for (let i = -r; i <= r; i++) pset(Math.round(cx + i + Math.sin(j * 0.3) * 2), gy - j, Math.abs(i) > r - 1.5 ? hex('#6a4a2a') : hex('#8a6438')); }
    R.disco(cx + Math.round(Math.sin(5.4) * 2), gy - 18, 5, hex('#3a2010')); R.disco(cx + Math.round(Math.sin(5.4) * 2), gy - 18, 3, hex('#1a0c06'));
    for (let a = 0; a < 10; a++) { const b = a / 10 * Math.PI * 2; pset(Math.round(cx + Math.sin(5.4) * 2 + Math.cos(b) * 4), Math.round(gy - 18 + Math.sin(b) * 4), hex('#f0e0c0')); }
    pset(cx - 7, gy + 6, hex('#1a1008')); pset(cx - 7, gy + 5, hex('#1a1008'));
  }
  for (let k = 0; k < 3; k++) rect(x0 + 3, y1 - 8 + k * 2, x1 - 3 - k * 4, y1 - 8 + k * 2, hex('#d8d0c0'));
}

function c_vestibuloFijo(R) {
  const { rect, pset } = R;
  // el techo con casetones y las tiras de neón (no llegan a la esquina de Atom)
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y === 12) ? c_CV.techoL : c_CV.techo);
  // la pared de terciopelo con costillas verticales, el zócalo de madera con su listón de latón
  for (let y = 26; y < 118; y++) for (let x = 0; x < 320; x++) { const i = x % 6; pset(x, y, i === 0 ? c_CV.paredS : i === 1 ? c_CV.paredL : (h(x >> 1, y >> 2, 3) > 0.92 ? c_CV.paredS : c_CV.pared)); }
  rect(0, 100, 319, 117, c_CV.zocalo); rect(0, 100, 319, 101, c_CV.laton); rect(0, 100, 319, 100, c_CV.latonL); for (let x = 0; x < 320; x += 20) rect(x, 104, x, 117, hex('#1e0e10'));
  // las tres cajas de luz del menú (iconos y precios)
  for (let k = 0; k < 3; k++) {
    const x0 = 8 + k * 25; rect(x0, 30, x0 + 22, 52, c_CV.k); rect(x0 + 1, 31, x0 + 21, 51, hex('#f4ecd8'));
    if (k === 0) { R.poligono([[x0 + 5, 37], [x0 + 15, 37], [x0 + 13, 48], [x0 + 7, 48]], hex('#e8283a')); for (let i = 0; i < 4; i++) rect(x0 + 7 + i * 2, 38, x0 + 7 + i * 2, 47, hex('#ffffff')); for (let i = 0; i < 5; i++) R.disco(x0 + 6 + i * 2, 36, 1.5, hex('#fff0b0')); }
    if (k === 1) { R.poligono([[x0 + 6, 37], [x0 + 14, 37], [x0 + 13, 48], [x0 + 7, 48]], hex('#3a6ac8')); rect(x0 + 6, 36, x0 + 14, 37, hex('#ffffff')); R.linea(x0 + 11, 36, x0 + 14, 32, hex('#e8283a')); }
    if (k === 2) { rect(x0 + 4, 41, x0 + 17, 44, hex('#e8b060')); rect(x0 + 5, 40, x0 + 16, 41, hex('#c8603a')); rect(x0 + 6, 39, x0 + 15, 39, hex('#e8c040')); }
    R.numero(['9', '6', '7'][k], x0 + 19, 51, { centro: true, color: hex('#3a1a2a'), sombra: false });
  }
  // la fuente de refrescos y las pilas de vasos
  rect(10, 60, 42, 98, hex('#3a3e48')); rect(11, 61, 41, 96, hex('#8a92a0')); rect(11, 61, 41, 62, hex('#c8d0dc'));
  ['#c83a3a', '#e8a030', '#3a8ac8', '#4ab05a'].forEach((c, i) => { rect(13 + i * 7, 64, 18 + i * 7, 76, hex(c)); rect(13 + i * 7, 64, 18 + i * 7, 65, c_mez(hex(c), hex('#ffffff'), 0.4)); rect(15 + i * 7, 79, 16 + i * 7, 83, hex('#2a2e38')); });
  rect(12, 90, 40, 92, hex('#4a5262')); for (let x = 13; x < 40; x += 2) pset(x, 91, hex('#2a2e38'));
  for (const x of [46, 52]) for (let k = 0; k < 6; k++) rect(x, 96 - k * 3, x + 4, 98 - k * 3, k % 2 ? hex('#e8e4dc') : hex('#d8283a'));
  // la máquina de palomitas: cabina roja, cristales, la olla colgada y el montón de palomitas (los granos los pinta la vida)
  rect(80, 50, 120, 99, hex('#6a0e18')); rect(82, 48, 118, 52, hex('#c82a3a')); rect(84, 46, 116, 48, hex('#e8c040'));
  rect(83, 54, 117, 96, hex('#2a1010')); rect(84, 55, 116, 95, hex('#5a3010'));
  for (let y = 55; y <= 95; y++) for (let x = 84; x <= 116; x++) pset(x, y, c_mez(hex('#3a1a0a'), hex('#f0b040'), 0.25 + (y - 55) / 120));
  for (let x = 84; x <= 116; x++) { const top = 82 + Math.round(Math.sin(x * 0.9) * 1.5 + h(x, 1, 8) * 2); for (let y = top; y <= 95; y++) pset(x, y, h(x, y, 9) > 0.6 ? hex('#fff4d0') : h(x, y, 9) > 0.25 ? hex('#f8e0a0') : hex('#e8c070')); }
  rect(97, 55, 99, 60, hex('#9aa0ac')); rect(92, 60, 104, 66, hex('#b8bcc8')); rect(92, 60, 104, 60, hex('#e8ecf4')); rect(92, 66, 104, 67, hex('#6a7080'));
  rect(100, 55, 100, 95, hex('#2a1010')); for (let y = 56; y < 95; y += 3) pset(85, y, hex('#fff8e8'));
  rect(78, 99, 122, 101, hex('#3a2a20'));
  // la barra de detrás y sus armarios
  rect(4, 99, 124, 102, hex('#2a1a14')); rect(4, 99, 124, 99, hex('#6a4a34'));
  // la pantalla de venta: marco, la entrada dibujada, y el plano de la sala (la vida la llena)
  rect(126, 28, 230, 106, hex('#060408')); rect(128, 30, 228, 104, hex('#0a1020')); rect(127, 107, 229, 108, hex('#1a1014'));
  rect(176, 36, 177, 98, hex('#1a2440'));
  // el reloj de pared
  R.disco(254, 40, 9, hex('#1a1014')); R.disco(254, 40, 8, c_CV.laton); R.disco(254, 40, 7, hex('#f4ecd8'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(254 + Math.cos(a) * 6), Math.round(40 + Math.sin(a) * 6), hex('#3a2a2a')); }
  // los dos carteles
  c_cartel(R, 238, 56, 264, 96, 'doom'); c_cartel(R, 272, 56, 298, 96, 'dune');
  // la moqueta
  c_moqueta(R, 118);
  rect(0, 117, 319, 118, hex('#1a0c10'));
  // la taquilla, al final de la cola: caseta de madera y latón, ventanilla de cristal con su rejilla, el bandejón de
  // las entradas y su lamparita
  rect(270, 98, 319, 160, hex('#1a0c10')); rect(272, 100, 319, 160, hex('#5a2a1e')); rect(272, 100, 319, 103, c_CV.laton); rect(272, 100, 319, 100, c_CV.latonL);
  for (let y = 104; y < 160; y++) for (let x = 272; x < 320; x++) if ((x - 272) % 12 === 0) pset(x, y, hex('#3a1a12')); else if (h(x >> 1, y >> 2, 6) > 0.85) pset(x, y, hex('#6a3424'));
  rect(278, 106, 314, 128, hex('#1a0c10')); rect(279, 107, 313, 127, hex('#2a3a48'));
  for (let x = 279; x <= 313; x += 4) rect(x, 107, x, 127, hex('#3a4a58')); R.disco(296, 126, 6, hex('#1a2430'));
  rect(276, 129, 316, 132, hex('#c8a04a')); rect(276, 129, 316, 129, hex('#f0d080')); rect(276, 133, 316, 134, hex('#3a1a12'));
  for (let y = 136; y < 158; y += 7) rect(274, y, 317, y, hex('#3a1a12'));
}

// el vestíbulo del cine (ver la cabecera de F)
function c_vestibulo(R, t, o) {
  R.copiar(c_capa(R, 'vestibulo', () => c_vestibuloFijo(R)));
  const { pset, rect } = R;
  // los neones del techo: uno magenta y otro turquesa, con un tramo que parpadea
  const fallo = Math.sin(t * 17) > 0.6 && Math.sin(t * 1.3) > 0.5;
  for (let x = 0; x <= 268; x++) { const roto = fallo && x > 180 && x < 220; pset(x, 24, roto ? c_CV.neonMS : c_CV.neonM); pset(x, 23, roto ? c_CV.techo : c_CV.neonMS); pset(x, 26, c_CV.neonC); pset(x, 27, c_CV.neonCS); }
  // los granos que saltan dentro de la máquina
  R.recorte([84, 55, 116, 95]);
  for (let k = 0; k < 14; k++) { const ph = (t * (1.1 + h(k, 1, 51) * 0.6) + h(k, 2, 51)) % 1, x = 98 + Math.round((h(k, 3, 51) - 0.5) * 28 * ph), y = 66 + Math.round(ph * 18 - Math.sin(ph * Math.PI) * 10); pset(x, y, hex('#fffbe8')); pset(x + 1, y, hex('#f8e0a0')); pset(x, y + 1, hex('#f0d090')); }
  R.recorte(null);
  rect(92, 66, 104, 67, Math.sin(t * 9) > 0 ? hex('#6a7080') : hex('#8a90a0'));
  // la pantalla de venta: el contador de entradas (o.ventas 0–1 hasta o.tope, por omisión 50) y el plano de la sala
  const v = Math.max(0, Math.min(1, o.ventas ?? 1)), tope = o.tope ?? 50, n = Math.round(v * tope);
  R.recorte([128, 30, 228, 104]);
  for (let y = 30; y <= 104; y++) for (let x = 128; x <= 175; x++) pset(x, y, ((x + y) % 8 === 0) ? hex('#0e1830') : hex('#0a1020'));
  c_dib(R, ['.##########.', '##########..', '##.#####.##.', '##########..', '.##########.'], 140, 40, { '#': hex('#e8c040') });
  rect(140, 42, 151, 42, hex('#e8c040')); for (let y = 40; y <= 44; y += 2) pset(146, y, hex('#0a1020'));
  R.numero(String(n), 152, 76, { centro: true, tam: 16 });
  rect(134, 88, 170, 92, hex('#1a2440')); rect(135, 89, 135 + Math.round(34 * v), 91, hex('#e04a8a')); if (v > 0 && v < 1) pset(135 + Math.round(34 * v), 89 + (Math.floor(t * 6) % 3), hex('#ffffff'));
  R.poligono([[182, 36], [224, 36], [222, 40], [184, 40]], hex('#c8d0e0'));
  for (let j = 0; j < 8; j++) for (let i = 0; i < 9; i++) {
    const x = 182 + i * 5 + (i > 4 ? 2 : 0) - (i > 4 ? 0 : 0), y = 46 + j * 7, lleno = h(i, j, 23) < v * 1.05 - 0.02;
    rect(x, y, x + 3, y + 3, lleno ? hex('#e04a8a') : hex('#2a3048')); if (lleno) rect(x, y, x + 3, y, hex('#ff8ac0'));
  }
  R.recorte(null);
  // la aguja del reloj, que da la vuelta
  { const a = t * 0.8 - Math.PI / 2, b = t * 0.07 - Math.PI / 2; R.linea(254, 40, Math.round(254 + Math.cos(a) * 6), Math.round(40 + Math.sin(a) * 6), hex('#c82a3a')); R.linea(254, 40, Math.round(254 + Math.cos(b) * 4), Math.round(40 + Math.sin(b) * 4), hex('#1a1014')); }
  // la taquilla: la taquillera (silueta tras el cristal) que se mueve, el piloto y la entrada que asoma del bandejón
  R.recorte([279, 107, 313, 127]);
  { const x = 294 + Math.round(Math.sin(t * 0.9) * 4); R.disco(x, 115, 3, hex('#4a5a68')); R.rect(x - 4, 119, x + 4, 127, hex('#4a5a68')); }
  for (let y = 107; y <= 127; y++) { const x = 279 + Math.round((t * 9 + y) % 50); if (((x + y) & 1) && x <= 313) pset(x, y, hex('#6a8090')); }
  R.recorte(null);
  pset(276, 104, Math.sin(t * 3) > 0 ? hex('#4aff8a') : hex('#1a5a32'));
  { const e = Math.max(0, Math.sin(t * 1.3)); const L = Math.round(e * 6); if (L > 0) { R.rect(292, 128 - L, 300, 128, hex('#f4ecd8')); R.rect(292, 128 - L, 300, 128 - L, hex('#e8283a')); } }
  // el brillo que recorre los marcos de los carteles
  for (const x0 of [238, 272]) { const y = 56 + Math.round(((t * 12 + x0) % 60)); if (y <= 96) { pset(x0 - 1, y, c_CV.latonL); pset(x0 + 27, y, c_CV.latonL); } }
}

// por delante de los actores: el mostrador de mármol con su vitrina de chucherías, la caja registradora, un vaso, el
// cubo de palomitas rebosante (o.palomita 0–1: una palomita que vuela del cubo hasta Atom; o.palomitas: lista de
// instantes en los que salta una, 0,9 s cada vuelo) y la cuerda de terciopelo de la cola con sus postes
function c_vestibuloDelante(R, t, o) {
  const { rect, pset } = R;
  // el mostrador
  rect(0, 130, 126, 137, hex('#1a1418')); for (let x = 0; x <= 126; x++) { for (let y = 131; y <= 136; y++) pset(x, y, h(x >> 1, y, 29) > 0.8 ? hex('#4a3e48') : hex('#2e262e')); } rect(0, 130, 126, 130, hex('#8a7a88'));
  rect(0, 138, 124, 170, hex('#2a0e18'));
  rect(4, 140, 120, 156, c_CV.k); rect(5, 141, 119, 155, hex('#1e1a28'));
  for (let k = 0; k < 14; k++) { const x = 7 + k * 8, c = ['#e8283a', '#e8c040', '#3a8ac8', '#4ab05a', '#e86a2a', '#9a3ac8'][k % 6]; rect(x, 144 + (k % 2) * 6, x + 5, 148 + (k % 2) * 6, hex(c)); rect(x, 144 + (k % 2) * 6, x + 5, 144 + (k % 2) * 6, c_mez(hex(c), hex('#ffffff'), 0.4)); }
  for (let y = 141; y <= 155; y++) { const x = 5 + Math.round(((t * 18) % 160)) - (y - 141); for (let i = 0; i < 4; i++) if (x + i >= 5 && x + i <= 119) pset(x + i, y, c_mez(R.pget(x + i, y), hex('#ffffff'), 0.25)); }
  rect(0, 157, 124, 158, Math.sin(t * 3) > -0.8 ? c_CV.neonM : c_CV.neonMS); rect(0, 159, 124, 170, hex('#1e0a12'));
  // la caja registradora y su pantallita, un vaso con pajita
  rect(16, 116, 36, 129, hex('#1a1e28')); rect(18, 118, 34, 125, hex('#2a6a8a')); rect(19, 119, 19 + (Math.floor(t * 3) % 15), 119, hex('#c8f0ff')); rect(14, 126, 38, 129, hex('#2a2e38'));
  rect(113, 120, 120, 129, hex('#d8283a')); rect(113, 122, 120, 123, hex('#ffffff')); rect(112, 119, 121, 119, hex('#f4f0e8')); R.linea(118, 119, 121, 112, hex('#e8e4dc'));
  // el cubo de palomitas a rayas, rebosante
  const [bx, by] = [99, 114];
  R.poligono([[bx - 9, by], [bx + 9, by], [bx + 7, 130], [bx - 7, 130]], hex('#ffffff'));
  for (let k = -2; k <= 2; k++) R.poligono([[bx + k * 4 - 1, by], [bx + k * 4 + 1, by], [bx + k * 3.2 + 1, 130], [bx + k * 3.2 - 1, 130]], hex('#d8283a'));
  rect(bx - 9, by, bx + 9, by + 1, hex('#a81a2a'));
  for (let i = 0; i < 13; i++) { const x = bx - 9 + i * 1.5, y = by - 2 - Math.round(Math.abs(Math.sin(i * 1.7)) * 3 + (i > 3 && i < 10 ? 2 : 0)); R.disco(Math.round(x), y, 1.6, h(i, 1, 3) > 0.5 ? hex('#fff4d0') : hex('#f0d890')); pset(Math.round(x), y - 1, hex('#ffffff')); }
  // las palomitas que saltan hasta Atom
  const vuelos = [];
  if (o.palomita === true || o.palomita >= 1) { const u = (t % 1.6) / 0.9; if (u < 1) vuelos.push(u); } else if (o.palomita > 0) vuelos.push(o.palomita);
  for (const t0 of o.palomitas ?? []) { const u = (t - t0) / 0.9; if (u > 0 && u < 1) vuelos.push(u); }
  for (const u of vuelos) { const x = lerp(bx, 290, u), y = lerp(by - 4, 30, u) - Math.sin(u * Math.PI) * 50, g = u * 9;
    R.disco(Math.round(x), Math.round(y), 1.8, hex('#fff4d0')); pset(Math.round(x + Math.cos(g) * 1.5), Math.round(y + Math.sin(g) * 1.5), hex('#e8c070')); pset(Math.round(x), Math.round(y) - 2, hex('#ffffff'));
    for (let k = 1; k < 4; k++) { const uu = Math.max(0, u - k * 0.03); pset(Math.round(lerp(bx, 290, uu)), Math.round(lerp(by - 4, 30, uu) - Math.sin(uu * Math.PI) * 50), k === 1 ? hex('#f8e8c0') : hex('#c8a870')); } }
  // los postes cromados y la cuerda de terciopelo de la cola
  const postes = [206, 256, 306];
  for (let k = 0; k + 1 < postes.length; k++) { const a = postes[k], b = postes[k + 1]; for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(151 + Math.sin(u * Math.PI) * 6 + Math.sin(t * 1.5 + k) * Math.sin(u * Math.PI) * 0.8); pset(x, y, hex('#a8182a')); pset(x, y + 1, hex('#6a0e1a')); if ((x & 3) === 0) pset(x, y, hex('#d83a4a')); } }
  for (const x of postes) { rect(x - 1, 150, x + 1, 172, hex('#8a92a0')); rect(x - 1, 150, x - 1, 172, hex('#e8ecf4')); R.disco(x, 149, 2, hex('#c8d0dc')); pset(x - 1, 148, hex('#ffffff')); rect(x - 5, 172, x + 5, 174, hex('#6a7080')); rect(x - 5, 172, x + 5, 172, hex('#c8d0dc')); }
}

// los continentes (lon, lat), copiados de CONTINENTES de pixel-retro.js
const c_CONT = {
  norteamerica: [[-166, 66], [-140, 70], [-120, 72], [-95, 72], [-80, 66], [-62, 58], [-56, 50], [-66, 44], [-76, 35], [-81, 30], [-80, 25], [-84, 30], [-90, 29], [-97, 26], [-97, 21], [-87, 21], [-88, 16], [-83, 10], [-79, 8], [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-114, 31], [-117, 33], [-124, 40], [-124, 48], [-135, 58], [-152, 59], [-165, 61]],
  sudamerica: [[-79, 8], [-72, 12], [-62, 11], [-52, 5], [-35, -5], [-39, -15], [-48, -25], [-58, -35], [-65, -42], [-68, -52], [-72, -54], [-75, -45], [-73, -35], [-70, -18], [-77, -12], [-81, -5], [-80, 1]],
  groenlandia: [[-55, 60], [-42, 60], [-20, 70], [-18, 80], [-40, 83], [-62, 80], [-68, 76], [-58, 68]],
  eurasia: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [3, 51], [8, 54], [12, 56], [5, 59], [6, 62], [15, 69], [28, 71], [40, 67], [60, 70], [80, 73], [105, 78], [140, 72], [170, 70], [180, 66], [170, 60], [160, 55], [142, 52], [140, 40], [128, 35], [122, 31], [121, 24], [108, 21], [109, 12], [104, 9], [100, 14], [98, 8], [103, 1], [98, 3], [92, 20], [80, 15], [77, 8], [72, 20], [66, 25], [57, 25], [52, 28], [48, 29], [56, 17], [44, 12], [40, 20], [34, 28], [36, 34], [27, 37], [22, 40], [16, 40], [12, 44], [8, 44], [3, 42], [0, 39], [-6, 37]],
  africa: [[-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [40, -2], [40, -15], [35, -25], [20, -35], [17, -29], [12, -17], [13, -5], [9, 4], [-8, 4], [-17, 14], [-17, 21], [-13, 28]],
  australia: [[114, -22], [122, -17], [131, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [140, -38], [131, -31], [116, -35], [114, -28]],
  japon: [[130, 31], [135, 34], [140, 36], [142, 40], [141, 43], [145, 44], [140, 45], [139, 38], [132, 34]],
  britania: [[-5, 50], [1, 51], [2, 53], [-2, 56], [-3, 58], [-6, 58], [-5, 54], [-3, 53], [-5, 52]],
  madagascar: [[44, -25], [48, -24], [50, -15], [49, -12], [44, -16]],
  indonesia: [[95, 5], [105, -6], [115, -8], [120, -9], [118, -5], [110, -2], [104, 1]],
};

const c_MAPA = [8, 26, 234, 146];

const c_proy = (lon, lat) => [c_MAPA[0] + (lon + 135) / 300 * (c_MAPA[2] - c_MAPA[0]), c_MAPA[1] + (78 - lat) / 124 * (c_MAPA[3] - c_MAPA[1])];

// los países: [lon, lat, día, desplazamiento de la placa]
const c_ESTRENOS = [[-1.5, 52.5, 16, [-14, -9]], [104, 35, 16, [0, -12]], [-3.7, 40.4, 17, [-16, 8]], [-102, 23, 17, [0, 12]], [-97, 39, 18, [0, -12]]];

function c_mapaFijo(R) {
  const { rect, pset } = R;
  // la pared del vestíbulo, el estante de abajo con folletos y una planta
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = x % 6; pset(x, y, y < 18 ? c_CV.techo : i === 0 ? c_CV.paredS : i === 1 ? (x > 272 && y < 48 ? c_CV.pared : c_CV.paredL) : c_CV.pared); }
  rect(0, 16, 319, 17, hex('#2a1418'));
  rect(0, 158, 319, 179, c_CV.zocalo); rect(0, 158, 319, 159, c_CV.laton); rect(0, 158, 319, 158, c_CV.latonL); rect(0, 160, 319, 161, hex('#1a0c0e'));
  for (let k = 0; k < 9; k++) { const x = 20 + k * 22, c = ['#e8283a', '#3a8ac8', '#e8c040', '#4ab05a'][k % 4]; rect(x, 150, x + 14, 158, hex('#3a2a20')); rect(x + 2, 146 + (k % 2), x + 12, 157, hex(c)); rect(x + 4, 149 + (k % 2), x + 10, 153 + (k % 2), hex('#f4ecd8')); }
  rect(298, 140, 312, 158, hex('#6a4a3a')); for (let k = 0; k < 8; k++) { const a = -2.8 + k * 0.33; R.linea(305, 140, 305 + Math.round(Math.cos(a) * 12), 140 + Math.round(Math.sin(a) * 12), k % 2 ? hex('#3a7a4a') : hex('#4e9a5a')); }
  // el marco del panel y el mar con su cuadrícula
  const [X0, Y0, X1, Y1] = c_MAPA;
  rect(X0 - 4, Y0 - 4, X1 + 4, Y1 + 4, hex('#1a1418')); rect(X0 - 3, Y0 - 3, X1 + 3, Y1 + 3, hex('#8a92a0')); rect(X0 - 3, Y0 - 3, X1 + 3, Y0 - 3, hex('#d0d4dc')); rect(X0 - 1, Y0 - 1, X1 + 1, Y1 + 1, hex('#2a2e38'));
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { let c = c_rampa([hex('#0e2440'), hex('#14304e'), hex('#1a3a5a')], 0.5 + Math.sin(x * 0.07 + y * 0.11) * 0.25 + (h(x >> 2, y >> 2, 3) - 0.5) * 0.2, x, y); if ((y - Y0) % 3 === 0 && Math.sin(x * 0.5 + y) > 0.85) c = hex('#24486a'); pset(x, y, c); }
  for (let lon = -120; lon <= 150; lon += 30) { const [x] = c_proy(lon, 0); for (let y = Y0; y <= Y1; y += 2) pset(Math.round(x), y, hex('#28507a')); }
  for (let lat = -30; lat <= 60; lat += 30) { const [, y] = c_proy(0, lat); for (let x = X0; x <= X1; x += 2) pset(x, Math.round(y), hex('#28507a')); }
  // las tierras: relleno con trama, la costa oscura y el filo de luz
  R.recorte(c_MAPA);
  for (const pts of Object.values(c_CONT)) {
    const P = pts.map(([a, b]) => c_proy(a, b));
    R.poligono(P, (x, y) => c_rampa([hex('#2a6a52'), hex('#367e62'), hex('#4a9474'), hex('#62a884')], 0.4 + (h(x >> 2, y >> 2, 7) - 0.5) * 0.6 + (y - Y0) / 400, x, y));
    for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; R.linea(Math.round(a[0]), Math.round(a[1]), Math.round(b[0]), Math.round(b[1]), hex('#1a4a3a')); }
  }
  R.recorte(null);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const c = R.pget(x, y); if (h(x, y, 99) > 0.985 && (c >>> 8 & 255) > 90) pset(x, y, hex('#8ac8a0')); }
  // el reloj grande: caja de madera, esfera crema, marcas y las cifras 12, 3, 6 y 9
  const [cx, cy] = [276, 100];
  R.disco(cx + 2, cy + 3, 31, hex('#2a0e16')); R.disco(cx, cy, 31, hex('#4a2a18')); R.disco(cx, cy, 29, hex('#7a4a28')); R.disco(cx - 1, cy - 1, 27, hex('#9a6034')); R.disco(cx, cy, 26, hex('#f4ecd4'));
  for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, r0 = k % 5 === 0 ? 21 : 23; R.linea(Math.round(cx + Math.cos(a) * r0), Math.round(cy + Math.sin(a) * r0), Math.round(cx + Math.cos(a) * 24), Math.round(cy + Math.sin(a) * 24), k % 5 === 0 ? hex('#2a1a1a') : hex('#b8a888')); }
  R.numero('12', cx, cy - 11, { centro: true, color: hex('#2a1a1a'), sombra: false }); R.numero('3', cx + 16, cy + 4, { centro: true, color: hex('#2a1a1a'), sombra: false });
  R.numero('6', cx, cy + 20, { centro: true, color: hex('#2a1a1a'), sombra: false }); R.numero('9', cx - 16, cy + 4, { centro: true, color: hex('#2a1a1a'), sombra: false });
}

// el panel del mundo: chinchetas y placas con el día del estreno (o.fechas 0–1 las enciende: primero 16, luego 17 y 18),
// una luz que barre el mapa, aviones que cruzan; y el reloj con la cuña de dos horas y media (o.horas 0–1 la llena)
function c_mapaFechas(R, t, o) {
  R.copiar(c_capa(R, 'mapaFechas', () => c_mapaFijo(R)));
  const { pset, rect } = R, [X0, Y0, X1, Y1] = c_MAPA, f = o.fechas ?? 1;
  R.recorte(c_MAPA);
  { const sx = X0 + ((t * 30) % 300) - 40; for (let y = Y0; y <= Y1; y++) for (let x = Math.max(X0, Math.round(sx)); x <= Math.min(X1, sx + 10); x++) if (c_b4(x, y) < 0.3) pset(x, y, c_mez(R.pget(x, y), hex('#a8e0ff'), 0.2)); }
  for (let k = 0; k < 2; k++) { const u = (t * 0.08 + k * 0.5) % 1, a = c_proy(-74, 41), b = k ? c_proy(-0.1, 51.5) : c_proy(116, 40), x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * 14; for (let s = 1; s < 12; s += 2) { const uu = Math.max(0, u - s * 0.01); pset(Math.round(lerp(a[0], b[0], uu)), Math.round(lerp(a[1], b[1], uu) - Math.sin(uu * Math.PI) * 14), hex('#6a9ac0')); } rect(Math.round(x) - 1, Math.round(y), Math.round(x) + 1, Math.round(y), hex('#f4f8ff')); pset(Math.round(x), Math.round(y) - 1, hex('#f4f8ff')); }
  R.recorte(null);
  const COL = { 16: hex('#4ae8f0'), 17: hex('#ffd36a'), 18: hex('#ff5a6a') }, UMB = { 16: 0.1, 17: 0.45, 18: 0.8 };
  for (const [lon, lat, dia, [dx, dy]] of c_ESTRENOS) {
    const [x, y] = c_proy(lon, lat).map(Math.round), on = f >= UMB[dia], u = Math.max(0, Math.min(1, (f - UMB[dia]) / 0.12));
    if (on) { const r = 2 + ((t * 1.4 + lon) % 1) * 7; R.anillo(x + 0.5, y + 0.5, r, (Math.floor(r) & 1) ? COL[dia] : c_mez(COL[dia], hex('#000000'), 0.4)); }
    R.linea(x, y, x + 1, y - 4, hex('#c8ccd4')); R.disco(x + 1, y - 5, 2, on ? COL[dia] : hex('#6a7080')); pset(x, y - 6, hex('#ffffff'));
    if (on) { const px = x + dx, py = y + dy + Math.round((1 - u) * 4); R.linea(x + 1, y - 5, px, py - 4, hex('#c8ccd4')); rect(px - 9, py - 11, px + 9, py + 2, hex('#05060f')); rect(px - 8, py - 10, px + 8, py + 1, c_mez(COL[dia], hex('#000000'), 0.55)); a_cifras(R, String(dia), px, py); }
  }
  // el reloj: la cuña de dos horas y media, la aguja del minutero que corre y el horario que la recorre
  const [cx, cy] = [276, 100], hs = Math.max(0, Math.min(1, o.horas ?? 1)), fin = hs * 2.5 / 12 * Math.PI * 2;
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const d = Math.hypot(i, j); if (d > 19.5 || d < 3) continue; let a = Math.atan2(i, -j); if (a < 0) a += Math.PI * 2; if (a <= fin) pset(cx + i, cy + j, c_mez(R.pget(cx + i, cy + j), hex('#f0803a'), c_b4(cx + i, cy + j) < 0.6 ? 0.55 : 0.35)); }
  for (let r = 3; r < 20; r++) pset(Math.round(cx + Math.sin(fin) * r), Math.round(cy - Math.cos(fin) * r), hex('#c8502a'));
  const am = t * 1.3, ah = fin;
  R.linea(cx, cy, Math.round(cx + Math.sin(am) * 21), Math.round(cy - Math.cos(am) * 21), hex('#2a1a1a'));
  R.linea(cx, cy, Math.round(cx + Math.sin(ah) * 14), Math.round(cy - Math.cos(ah) * 14), hex('#2a1a1a')); R.linea(cx + 1, cy, Math.round(cx + 1 + Math.sin(ah) * 13), Math.round(cy - Math.cos(ah) * 13), hex('#2a1a1a'));
  R.disco(cx, cy, 2, hex('#c8a04a')); pset(cx, cy, hex('#fff0b0'));
  { const g = (t * 0.6) % 3; if (g < 1) for (let k = -3; k <= 3; k++) pset(Math.round(cx - 18 + g * 30 + k), Math.round(cy - 18 + g * 8 - k), c_mez(R.pget(Math.round(cx - 18 + g * 30 + k), Math.round(cy - 18 + g * 8 - k)), hex('#ffffff'), 0.4)); }
}

function c_puertasFijo(R) {
  const { rect, pset } = R;
  // el techo con focos y la pared de paneles de chapa perforada con bandas cepilladas
  for (let y = 0; y < 28; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 40 === 0 || y === 14) ? hex('#1a1622') : hex('#120e18'));
  for (const x of [196, 236]) { rect(x - 4, 24, x + 4, 28, hex('#2a2e38')); rect(x - 3, 28, x + 3, 29, hex('#fff0c0')); }
  for (let y = 28; y < 150; y++) for (let x = 0; x < 320; x++) {
    const pan = Math.floor(x / 40), i = x % 40, j = y % 30;
    let c = (pan % 2) ? hex('#1e2230') : hex('#222636');
    if (i === 0) c = hex('#14161e'); else if (j === 0) c = hex('#2c3242');
    else if (((x + 2) % 4 === 0) && ((y + 2) % 4 === 0) && !(x > 272 && y < 48)) c = hex('#161a24');
    pset(x, y, c);
  }
  // el pórtico de la sala grande: la marquesina (las bombillas las enciende la vida) con el pictograma de pantalla gigante
  rect(8, 30, 178, 52, hex('#0a0a10')); rect(10, 32, 176, 50, hex('#1a1424'));
  rect(56, 35, 130, 47, hex('#e8f0ff')); rect(57, 36, 129, 46, hex('#3a6ac8')); for (let x = 57; x <= 129; x++) { const yy = 36 + Math.round(((x - 93) / 36) ** 2 * 2); pset(x, yy, hex('#e8f0ff')); pset(x, yy + 1, hex('#e8f0ff')); }
  R.icono('flecha', 140, 39, hex('#e8f0ff'), hex('#0a0a10'), 1);
  for (let k = 0; k < 7; k++) pset(46 - k, 41 + (k < 3 ? 0 : 0), hex('#e8f0ff')); pset(40, 40, hex('#e8f0ff')); pset(40, 42, hex('#e8f0ff')); pset(39, 39, hex('#e8f0ff')); pset(39, 43, hex('#e8f0ff'));
  rect(8, 52, 178, 150, hex('#0c0c12')); rect(10, 54, 176, 150, hex('#16141c'));
  // el cartel de luz de Dune a la izquierda y la comparación de pantallas a la derecha
  c_cartel(R, 16, 62, 46, 128, 'dune');
  rect(152, 64, 174, 120, hex('#0a0a10')); rect(153, 65, 173, 119, hex('#1e2232')); rect(156, 70, 170, 86, hex('#e8f0ff')); rect(157, 71, 169, 85, hex('#3a6ac8')); rect(159, 96, 167, 104, hex('#8a92a0')); rect(160, 97, 166, 103, hex('#4a5262'));
  // las puertas dobles acolchadas con capitoné, ojos de buey y barras de empuje
  for (let y = 60; y <= 150; y++) for (let x = 54; x <= 148; x++) { const i = (x - 54 + (y >> 3) * 4) % 8, j = (y - 60) % 8; pset(x, y, x === 101 ? hex('#0a0608') : (i === 0 && j === 0) ? hex('#1a0a10') : (i + j < 4 ? hex('#6a1e2a') : hex('#561824'))); }
  rect(52, 58, 150, 59, hex('#c8a04a')); rect(52, 58, 53, 150, hex('#8a6a3a')); rect(149, 58, 150, 150, hex('#8a6a3a'));
  for (const x of [77, 125]) { R.disco(x, 82, 8, hex('#c8a04a')); R.disco(x, 82, 6, hex('#1a1014')); rect(x - 14, 106, x + 14, 108, hex('#c8d0dc')); rect(x - 14, 106, x + 14, 106, hex('#ffffff')); rect(x - 16, 104, x - 14, 110, hex('#6a7080')); rect(x + 14, 104, x + 16, 110, hex('#6a7080')); }
  // el pórtico pequeño: marquesina con el pictograma de una pantalla normal, el cartel de la máscara y la puerta sencilla
  rect(184, 50, 262, 66, hex('#0a0a10')); rect(186, 52, 260, 64, hex('#1a1424')); rect(214, 54, 234, 62, hex('#e8f0ff')); rect(215, 55, 233, 61, hex('#3a6ac8'));
  c_cartel(R, 188, 74, 212, 130, 'doom');
  rect(218, 70, 260, 150, hex('#0c0c12')); rect(220, 72, 258, 150, hex('#3a1a24'));
  for (let y = 72; y <= 150; y += 10) rect(220, y, 258, y, hex('#2a1018')); rect(234, 80, 244, 92, hex('#c8a04a')); rect(235, 81, 243, 91, hex('#1a1014')); rect(250, 108, 252, 118, hex('#c8d0dc'));
  // el calendario de diciembre (el 12) con sus cinco semanas
  rect(266, 58, 314, 120, hex('#1a1418')); rect(267, 59, 313, 119, hex('#f4ecd8')); rect(267, 59, 313, 70, hex('#c83a3a'));
  R.numero('12', 290, 69, { centro: true, color: hex('#fff4e0') });
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const x = 269 + i * 6, y = 74 + j * 9; rect(x, y, x + 4, y + 6, (i === 0 || i === 6) ? hex('#e8dcc8') : hex('#ece4d0')); pset(x + 1, y + 1, hex('#8a8070')); pset(x + 2, y + 1, hex('#8a8070')); }
  rect(278, 56, 279, 60, hex('#8a8a90')); rect(301, 56, 302, 60, hex('#8a8a90'));
  // el suelo pulido con el reflejo de los pórticos y la alfombra roja que entra en la sala grande
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c = c_rampa([hex('#14121a'), hex('#1c1a24'), hex('#24222e')], 0.8 - (y - 150) / 40 + (h(x >> 3, y >> 1, 4) - 0.5) * 0.3, x, y);
    if (((x - 160) * 40 / (y - 120) + 1000) % 40 < 1.2) c = hex('#100e14');
    if (x > 8 && x < 178 && y < 166 && c_b4(x, y) < 0.35 - (y - 150) * 0.02) c = c_mez(c, hex('#3a3040'), 0.6);
    pset(x, y, c);
  }
  R.poligono([[56, 150], [146, 150], [158, 180], [44, 180]], (x, y) => ((x + y) % 7 === 0) ? hex('#8a1a2a') : hex('#a8283a'));
  rect(56, 150, 146, 150, hex('#c84a5a'));
  // las juntas del suelo pulido, el felpudo de la sala pequeña y el reflejo de la puerta y del calendario
  for (const y of [156, 164, 175]) for (let x = 0; x < 320; x++) if ((x < 50 || x > 152) && c_b4(x, y) < 0.6) pset(x, y, hex('#0e0c12'));
  for (let y = 151; y < 162; y++) for (let x = 220; x <= 258; x++) if (c_b4(x, y) < 0.42 - (y - 151) * 0.035) pset(x, y, c_mez(R.pget(x, y), hex('#5a2a34'), 0.5));
  for (let y = 151; y < 158; y++) for (let x = 267; x <= 313; x++) if (c_b4(x, y) < 0.3 - (y - 151) * 0.04) pset(x, y, c_mez(R.pget(x, y), hex('#f4ecd8'), 0.25));
  R.poligono([[216, 151], [262, 151], [266, 158], [212, 158]], (x, y) => ((x * 3 + y) % 5 === 0) ? hex('#3a1420') : hex('#4a1a28')); rect(216, 151, 262, 151, hex('#6a2a38'));
  // el foco de cada lado del techo lava la pared con un abanico de luz
  for (const x of [196, 236]) for (let y = 30; y < 50; y++) { const w = (y - 30) * 0.9 + 4; for (let i = -w; i <= w; i++) { const xx = Math.round(x + i); if (xx > 178 && xx < 272 && c_b4(xx, y) < 0.35 - (y - 30) / 70) pset(xx, y, c_mez(R.pget(xx, y), hex('#fff0c0'), 0.18)); } }
  // la cornisa del techo con su tira de luz (los colores los hace correr la vida)
  rect(0, 22, 270, 24, hex('#0a080e')); rect(0, 25, 270, 25, hex('#2a2632'));
  // el extintor colgado y la papelera de latón con un cubo de palomitas encima
  rect(264, 128, 266, 130, hex('#3a3a40')); rect(262, 130, 270, 146, hex('#7a0e18')); rect(263, 131, 269, 145, hex('#c82a2a')); rect(263, 131, 264, 145, hex('#e86a5a')); rect(263, 136, 269, 138, hex('#f0ece0')); rect(264, 126, 268, 128, hex('#1a1a20')); R.linea(268, 127, 272, 133, hex('#1a1a20'));
  for (let y = 132; y <= 150; y++) for (let x = 286; x <= 304; x++) pset(x, y, (x - 286) % 4 === 0 ? hex('#14161e') : x < 290 ? hex('#4a4e5a') : hex('#2e323c'));
  rect(285, 128, 305, 132, hex('#8a6a2a')); rect(286, 128, 304, 128, hex('#f0d080')); rect(290, 130, 300, 131, hex('#1a1010'));
  rect(291, 121, 299, 129, hex('#c82a2a')); for (let x = 292; x <= 298; x += 2) rect(x, 122, x, 128, hex('#f4ecd8')); for (let k = 0; k < 5; k++) R.disco(292 + k * 2, 120 - (k % 2), 1, hex('#fff6d0'));
  for (let x = 284; x <= 306; x++) if (c_b4(x, 151) < 0.5) pset(x, 151, hex('#0a0810'));
}
// las dos puertas: la sala IMAX enorme (marquesina de bombillas que corren, ojos de buey con la luz de la película) y la
// sala normal; el calendario con o.semanas 0–3 semanas tachadas (rayas de rotulador); un robot aspirador que cruza
function c_puertas(R, t, o) {
  R.copiar(c_capa(R, 'puertas', () => c_puertasFijo(R)));
  const { pset, rect } = R;
  // las bombillas que corren alrededor de las dos marquesinas, y su reflejo en el suelo
  const bombilla = (x, y, k, n) => { const on = ((k + Math.floor(t * 8)) % n) < n - 2; R.disco(x, y, 1, on ? hex('#fff0b0') : hex('#6a5a3a')); if (on) pset(x, y, hex('#ffffff')); };
  let k = 0; for (let x = 12; x <= 174; x += 6) { bombilla(x, 32, k++, 4); } for (let x = 174; x >= 12; x -= 6) { bombilla(x, 50, k++, 4); }
  k = 0; for (let x = 188; x <= 258; x += 7) { bombilla(x, 52, k, 5); bombilla(x, 64, k + 2, 5); k++; }
  for (let x = 12; x <= 174; x += 6) for (let y = 152; y < 164; y += 2) if (((x / 6 + Math.floor(t * 8)) % 4) < 2 && c_b4(x, y) < 0.4) pset(x, y, hex('#8a7a5a'));
  // la luz de la película en los ojos de buey (cálida y cambiante)
  for (const x of [77, 125]) for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 30) { const b = Math.sin(t * 2.3 + x) * 0.3 + Math.sin(t * 7.1) * 0.15; pset(x + i, 82 + j, c_rampa([hex('#3a1a10'), hex('#8a4a1a'), hex('#e0903a'), hex('#f8d080')], 0.5 + b - j * 0.04, x + i, 82 + j)); }
  { const b = Math.sin(t * 3.1) > 0.3; for (let y = 81; y <= 91; y++) for (let x = 235; x <= 243; x++) pset(x, y, b ? hex('#2a8a4a') : hex('#1a5a32')); }
  // la tira de luz de la cornisa: un degradado de colores de cine que corre despacio
  for (let x = 0; x <= 270; x++) { const u = ((x / 90 + t * 0.25) % 1); pset(x, 23, u < 0.33 ? hex('#8a2a6a') : u < 0.66 ? hex('#2a7a8a') : hex('#8a7428')); if (x > 176 && (x + Math.floor(t * 20)) % 9 === 0) pset(x, 23, hex('#f0e0f0')); }
  // el calendario: las semanas tachadas
  const sem = Math.max(0, Math.min(3, o.semanas ?? 0));
  for (let w = 0; w < 3; w++) { const u = Math.max(0, Math.min(1, sem - w)); if (u <= 0) continue; const y = 74 + (w + 2) * 9 + 3, xe = 269 + Math.round(40 * u); R.linea(269, y + 2, xe, y - 2, hex('#c82a3a')); R.linea(269, y + 3, xe, y - 1, hex('#a81a2a')); }
  R.anillo(284.5, 95.5, 4.2, hex('#c82a3a'));
  // el robot aspirador que cruza despacio la alfombra (gag de máquina)
  { const x = Math.round(((t * 14) % 400) - 40), y = 172; if (x > -12 && x < 332) { for (let i = -7; i <= 7; i++) for (let j = -2; j <= 2; j++) if ((i * i) / 49 + (j * j) / 6 < 1) pset(x + i, y + j, j < 0 ? hex('#4a4e5a') : hex('#2a2e38')); pset(x + 2, y - 2, Math.sin(t * 6) > 0 ? hex('#4ae8f0') : hex('#2a7a8a')); for (let i = -6; i <= 6; i += 3) pset(x + i, y + 3, hex('#0a0a10')); } }
}
// el cordón de la sala IMAX, por delante de los actores: dos postes de latón y una cuerda roja con su placa del candado
function c_puertasDelante(R, t) {
  const { rect, pset } = R, a = 50, b = 152;
  for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(150 + Math.sin(u * Math.PI) * 5); pset(x, y, hex('#a8182a')); pset(x, y + 1, hex('#6a0e1a')); }
  for (const x of [a, b]) { rect(x - 1, 148, x + 1, 164, hex('#c8a04a')); rect(x - 1, 148, x - 1, 164, hex('#f0d080')); R.disco(x, 147, 2, hex('#e8c060')); rect(x - 5, 164, x + 5, 166, hex('#8a6a3a')); }
  const sw = Math.round(Math.sin(t * 1.2) * 1);
  rect(95 + sw, 155, 107 + sw, 165, hex('#1a1014')); rect(96 + sw, 156, 106 + sw, 164, hex('#c82a3a')); R.icono('candado', 98 + sw, 157, hex('#fff4e0'), hex('#5a0a14'), 1);
}

const c_IMAX = [30, 22, 270, 100];

const c_imaxTop = (x) => Math.round(26 - 4 * ((x - 150) / 120) ** 2), c_imaxBot = (x) => Math.round(96 + 4 * ((x - 150) / 120) ** 2);

function c_salaImaxFijo(R) {
  const { rect, pset } = R;
  // las paredes y el techo negros con paneles acolchados y apliques
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 8 === 0 && (x < 28 || x > 272)) ? hex('#140e16') : (y < 22 && x % 30 === 0) ? hex('#120c14') : hex('#0c080e'));
  for (const [x, y] of [[10, 70], [310, 78]]) { R.halo(x, y - 3, 10, [hex('#2a1a22'), hex('#3e2828'), hex('#5a3a30')], 1.1); rect(x - 2, y - 6, x + 2, y, hex('#c8a04a')); }
  rect(2, 92, 20, 101, hex('#0a0a0a')); rect(3, 93, 19, 100, hex('#1e8a4a')); R.icono('persona', 4, 94, hex('#d8ffd8'), hex('#0e5a2a'), 1); R.icono('flecha', 10, 95, hex('#d8ffd8'), hex('#0e5a2a'), 1);
  // las paredes de los lados: paneles de tela con costuras diagonales, tiras de luz y el reflejo cálido de la pantalla
  for (let y = 0; y < 166; y++) for (const [xa, xb] of [[0, 28], [272, 319]]) for (let x = xa; x <= xb; x++) {
    const d = xa === 0 ? 28 - x : x - 272, cerca = Math.max(0, 1 - d / 26) * Math.max(0, 1 - Math.abs(y - 60) / 70);
    let c = ((x + y) % 7 === 0) ? hex('#1a1220') : ((x - y + 400) % 11 === 0) ? hex('#120c16') : hex('#160f1a');
    if (x % 14 === 0) c = hex('#0a060c'); if (cerca > c_b4(x, y) + 0.2) c = c_mez(c, hex('#6a3a3a'), 0.4);
    if (x > 272 && y < 48) c = hex('#120c16');
    pset(x, y, c);
  }
  for (const x of [24, 296]) for (let y = 56; y < 166; y += 3) pset(x, y, hex('#3a2a4a'));
  for (const [x, y] of [[12, 70], [306, 78]]) { R.halo(x, y - 3, 10, [hex('#2a1a22'), hex('#3e2828'), hex('#5a3a30')], 1.1); rect(x - 2, y - 6, x + 2, y, hex('#c8a04a')); rect(x - 1, y - 6, x + 1, y - 6, hex('#ffe0a0')); }
  rect(2, 92, 20, 101, hex('#0a0a0a')); rect(3, 93, 19, 100, hex('#1e8a4a')); R.icono('persona', 4, 94, hex('#d8ffd8'), hex('#0e5a2a'), 1); R.icono('flecha', 10, 95, hex('#d8ffd8'), hex('#0e5a2a'), 1);
  // las filas de butacas rojas en grada, de espaldas: en arco, cada vez más grandes, con dos pasillos de peldaños
  c_imaxAsientos.length = 0;
  for (let fila = 0; fila < 7; fila++) {
    const y0 = 104 + fila * 9 + fila * fila * 0.35, w = 11 + fila * 2, hh = 6 + fila, curva = (x) => Math.round(y0 + ((x - 160) / 160) ** 2 * (4 + fila));
    for (let x = 0; x < 320; x++) { const y = curva(x) + hh; rect(x, y - 1, x, y + 2, hex('#0a0608')); if (x % 9 === 0) pset(x, y + 1, hex('#1a0e14')); }
    for (let x = 2 - (fila % 2) * Math.floor(w / 2); x < 320; x += w + 1) {
      const cx = x + w / 2; if (Math.abs(cx - 90) < 6 + fila || Math.abs(cx - 230) < 6 + fila) continue;
      const y = curva(cx), luz = Math.max(0, 1 - Math.abs(cx - 150) / 170);
      for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { if (j === 0 && (i === 0 || i === w - 1)) continue; const c = (i === 0 || i === w - 1) ? hex('#3a0a14') : j === 0 ? c_mez(hex('#b8505a'), hex('#f0a08a'), luz) : j === 1 ? hex('#b83a46') : i < 2 ? hex('#8a2232') : (j > hh - 3 ? hex('#5a1420') : hex('#6e1a28')); pset(x + i, y + j, c); }
      for (let i = 2; i < w - 2; i++) pset(x + i, y + 3 + (fila >> 1), hex('#5e1622'));
      pset(x + w, y + 2, hex('#e8a040'));
      if (fila < 6) c_imaxAsientos.push([Math.round(cx), y, fila]);
    }
    for (const xa of [90, 230]) { const y = curva(xa) + hh - 2; rect(xa - 3 - fila, y, xa + 3 + fila, y + 1, hex('#24161c')); pset(xa - 2 - fila, y + 1, hex('#e8a040')); pset(xa + 2 + fila, y + 1, hex('#e8a040')); }
  }
  rect(0, 166, 319, 179, hex('#1a0e14')); rect(0, 166, 319, 166, hex('#3a2028')); for (let x = 8; x < 320; x += 24) { pset(x, 170, hex('#e8a040')); pset(x + 1, 170, hex('#a86a2a')); }
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 21) > 0.9) pset(x, y, hex('#24141c'));
}

const c_imaxAsientos = [];

// la película de la sala grande (o.peli 'dune' por omisión: dunas al atardecer con dos siluetas y la cabeza del gusano que
// asoma; 'doom': cielo de tormenta verde con la silueta encapuchada)
function c_salaImax(R, t, o) {
  R.copiar(c_capa(R, 'salaImax', () => c_salaImaxFijo(R)));
  const { pset } = R, doom = o.peli === 'doom', pan = t * 3;
  for (let x = c_IMAX[0]; x <= c_IMAX[2]; x++) { const top = c_imaxTop(x), bot = c_imaxBot(x); pset(x, top - 1, hex('#050306')); pset(x, bot + 1, hex('#050306'));
    for (let y = top; y <= bot; y++) {
      const v = (y - top) / (bot - top); let c;
      if (doom) { c = c_rampa([hex('#081a10'), hex('#103a20'), hex('#1a5a32'), hex('#3a8a5a')], v * 0.9 + Math.sin((x + pan) * 0.05 + Math.sin(y * 0.3) * 2) * 0.12 + Math.sin((x - pan * 2) * 0.13 + y * 0.2) * 0.06, x, y); if (Math.sin(t * 5) > 0.95 && h(x >> 3, 1, 4) > 0.6 && v < 0.5) c = hex('#c8ffd8'); if (v > 0.8) c = hex('#06100a'); }
      else { c = v < 0.55 ? c_rampa([hex('#5a2a4a'), hex('#a8485a'), hex('#e07a4a'), hex('#f8c070')], v / 0.55, x, y) : (Math.sin((x + pan) * 0.06 + v * 12) * 0.05 + v > 0.72 ? hex('#b87a3e') : hex('#d89a54')); if (v > 0.55 && v < 0.62 && Math.sin((x + pan) * 0.04) > 0.2) c = hex('#c88a48'); }
      pset(x, y, c);
    } }
  // el sol, las siluetas y el gusano (o la capucha), recortados a la pantalla
  R.recorte(c_IMAX);
  if (doom) { const cx = 150; R.poligono([[cx - 14, 96], [cx - 12, 60], [cx - 6, 50], [cx + 6, 50], [cx + 12, 60], [cx + 14, 96]], hex('#04080a')); R.rect(cx - 5, 60, cx + 5, 61, hex('#3ae88a')); }
  else {
    R.disco(200, 54, 8, hex('#fff0c0')); R.disco(200, 54, 6, hex('#fffbe8'));
    c_figura(R, 120 + Math.round((t * 2) % 30), 84, t, 2, hex('#2a1018')); c_figura(R, 130 + Math.round((t * 2) % 30), 85, t + 0.3, 0, hex('#2a1018'));
    const gy = 76 - Math.round(Math.max(0, Math.sin(t * 0.4)) * 10); for (let j = 0; j < 30; j++) { const r = 9 - j * 0.1; for (let i = -r; i <= r; i++) pset(Math.round(70 + i + Math.sin(j * 0.2) * 3), gy + j, hex('#3a2014')); } R.disco(72, gy, 6, hex('#1a0c06'));
  }
  R.recorte(null);
  // el haz del proyector (entra por arriba entre el año y Atom) con motas que bailan
  for (let y = 0; y < 70; y++) { const f = y / 70, x0 = lerp(206, 120, f), x1 = lerp(226, 240, f); for (let x = Math.round(x0); x <= x1; x++) if (c_b4(x, y + Math.floor(t * 3)) < 0.07 + f * 0.04) pset(x, y, c_mez(R.pget(x, y), hex('#e8e0c8'), 0.25)); }
  for (let k = 0; k < 18; k++) { const f = (h(k, 1, 52) + t * 0.03 * (1 + k % 3)) % 1, y = Math.round(f * 70), x = Math.round(lerp(lerp(206, 120, f), lerp(226, 240, f), h(k, 2, 52)) + Math.sin(t + k) * 2); if (Math.sin(t * 1.9 + k * 3) > -0.3) pset(x, y, hex('#fff8e0')); }
  // el público: cabezas de espaldas en butacas reales, con pelo de colores y el filo de luz de la pantalla; una se inclina,
  // otra se lleva palomitas a la boca, otra cuchichea con la de al lado
  const PELO = ['#2a2024', '#5a3a20', '#8a5a2a', '#c8a060', '#1a1418', '#7a7a88'].map(hex), FILO = doom ? hex('#5ac88a') : hex('#e8a070');
  c_imaxAsientos.forEach(([x, y, fila], k) => {
    if (fila < 1 || h(k, 3, 88) > 0.3) return;
    const r = 3 + fila * 0.5, lean = (k % 9 === 0) ? Math.round(Math.sin(t * 0.8 + k)) : 0, yy = y - Math.round(r) + 1;
    R.disco(x + lean, yy, r, PELO[k % 6]); R.disco(x + lean, yy + Math.round(r * 0.6), r * 0.7, hex('#140c12'));
    for (let i = -1; i <= 1; i++) pset(x + lean + i, Math.round(yy - r), FILO);
    if (k % 7 === 3 && Math.sin(t * 2 + k) > 0.6) R.disco(x + Math.round(r) + 1, yy - Math.round(Math.sin(t * 2 + k) * 2), 1, hex('#fff0c0'));
  });
}

// o.encuadre (y o.camara). LLAMA A estudioDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t: pinta lo
// que va por delante (la mesa con el ordenador en 'estudio', la mesita baja en 'tele', chinchetas e hilos en 'pared').
//   'estudio' (general): EL ESTUDIO DE ATOM, de noche. Pared de papel pintado añil con rayas y rombos, en penumbra, con la
//     luz cálida del flexo y el resplandor azul del monitor; rodapié y suelo de tablas con vetas, una alfombra granate con
//     cenefa y flecos y el claro de luna en el suelo. A la izquierda, EL CORCHO (marco de madera, corcho moteado) que se va
//     llenando (o.pared 0–1, por omisión 0.6: fotos, recortes en barras, notas, un billete con cifras, una máscara dibujada
//     y los hilos rojos entre chinchetas); en el centro, EL RELOJ DE CUENTA ATRÁS colgado de un clavo (los días en números
//     grandes rojos sobre su «88» apagado, o.dias, por omisión 29, y debajo horas:minutos:segundos que bajan de verdad);
//     debajo, una estantería con cómics (lomos de colores, pilas tumbadas), figuritas y un gato que duerme y mueve la cola;
//     a la derecha, la ventana con la ciudad de noche (recortada: cielo tramado, luna con nubes que pasan, estrellas, dos
//     capas de edificios con ventanas que se encienden, la antena con su luz roja, un avión con sus luces) y sus cortinas;
//     y LA MESA en primer plano (x 194–319): tablero con vetas, cajones, el MONITOR con LA BARRA DE CARGA del tráiler y el
//     porcentaje en números grandes (o.carga 0–1; sin o.carga sube sola, se queda en 99 y vuelve a 0: el gag 1), el teclado,
//     el ratón, el cubo de palomitas, la taza humeante, tres figuritas y el flexo. o.dormido 1: el flexo se apaga y baja la
//     cabeza, la sala queda a oscuras, el monitor en reposo con la barra quieta en 99 (el gag 7). Suelo 158; libre
//     [30, 184]: la mesa (x ≥ 193, tablero en y 138) y el monitor tapan del todo a quien pase por detrás. Devuelve pantalla [219, 92, 287, 128],
//     pared [22, 28, 134, 102], reloj [174, 47], ventana [214, 24, 270, 78], mesa [194, 140, 319, 179].
//     Cámara 'tele': EL SALÓN DE ATOM de noche, el MISMO de la tele de wundagore 'cumbre' 'tele' (papel pintado morado
//     oscuro de rayas con lunares, el cuadro del paisaje con la luna, la lámpara de pie de pantalla marrón, el televisor
//     negro de canto fino con su peana y el mueble de madera de dos puertas con el hueco de la consola y los cómics, la
//     planta y tres figuritas encima); guirnalda de lucecitas que parpadean, el
//     CALENDARIO de pared (o.mes, por omisión 12, en su cabecera; los días con cifras pequeñas; o.tachados [días] con aspas
//     rojas; o.inicio 0–6, la columna del día 1), un reloj de pared con agujas que se mueven, un cuadro; el sofá con cojines,
//     la MANTITA de cuadros, el mando a distancia y un gato dormido en el respaldo; LA TELE grande en su mueble (consola con
//     piloto, plantas), una lámpara de pie, alfombra y una mesita baja en primer plano (en estudioDelante) con palomitas y
//     latas. o.imagen: una función (R, t, [x0, y0, x1, y1]) que pinta la pantalla en un búfer propio, sin recorte (puede
//     usar R.actor en otros búferes), del que solo se copia el hueco [x0, y0, x1, y1]; sin ella, la tele
//     muestra una montaña nevada al anochecer con un resplandor verde. Suelo 160, libre [20, 128]; pantalla [151, 49, 271,
//     127], calendario [34, 32, 98, 94], sofa [14, 104, 132, 152], mesita [168, 160, 270, 179].
//   'pared': EL CORCHO DE CERCA, llenando el plano: marco de madera, corcho moteado con la luz cálida que se mece; TRES FOTOS
//     tipo polaroid y UN RECUADRO VACÍO a rotulador con un interrogante grande (la escena dibuja dentro de los huecos);
//     notas de colores con garabatos, un recorte de periódico en barras, un billete con cifras, un boceto de la máscara, una
//     ficha que se levanta con la corriente; a la derecha, pared tranquila con el interruptor y un carrete de hilo rojo que
//     se mece. Las chinchetas y los hilos rojos van por encima de las fotos (en estudioDelante). Suelo 180, libre [0, 0],
//     fotos [[30, 42, 86, 90], [104, 36, 160, 84], [178, 44, 234, 92], [104, 110, 184, 162]] (las tres fotos y el recuadro).
//     Cámara 'escritorio': LA MESA DESDE ARRIBA: tablero de tablas con vetas y su canto, la luz del flexo en círculo, el
//     teclado, el ratón con su cable, LA HOJA con renglones y dos firmas (garabatos), el móvil que vibra a ratos con su
//     pantalla encendida (o.vibra 0–1 fuerza; por omisión, a golpes), el cubo de palomitas visto desde arriba, la taza con
//     su vapor, un cómic cerrado con su «1», bolígrafos, un pósit, un clip. Suelo 180, libre [0, 0], hoja [216, 104],
//     movil [274, 141], teclado [40, 112, 150, 150].
const D_K = hex('#0e0c16');
// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function d_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// el umbral de Bayer 4 × 4 para tramar dos tonos
const D_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el tono v (0 … n − 1, con decimales) de una rampa, tramado con Bayer
function d_tono(ramp, v, x, y) { const i = Math.floor(v), f = v - i, k = f > (D_BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16 ? i + 1 : i; return ramp[Math.max(0, Math.min(ramp.length - 1, k))]; }

// una capa fija pintada una vez en su búfer (clave) y copiada a la pantalla en cada fotograma
function d_capa(R, clave, pinta) { const M = R.__ddD || (R.__ddD = new Map()); let b = M.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.recorte(null); R.usar(prev); M.set(clave, b); } R.copiar(b); return b; }

// una capa suelta (fondo transparente = 0) pintada una vez; d_pegar la pega encima, solo en su recuadro
function d_suelta(R, clave, pinta) { const M = R.__ddD || (R.__ddD = new Map()); let b = M.get(clave); if (!b) { b = R.nuevo(); b.fill(0); const prev = R.usar(b); pinta(); R.recorte(null); R.usar(prev); M.set(clave, b); } return b; }

// pega los píxeles no vacíos de una capa suelta dentro del recuadro (x0, y0)–(x1, y1)
function d_pegar(R, b, x0, y0, x1, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = b[y * 320 + x]; if (c) R.pset(x, y, c); } }

// cifras de 3 × 5 (para el calendario, el billete, las horas): dígitos, «:» y «-»
const D_DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001010010', 8: '111101111101111', 9: '111101111001111', ':': '000010000010000', '-': '000000111000000' };

function d_cifras(R, txt, x, y, c, s = 1) { for (const ch of String(txt)) { const m = D_DIG[ch]; if (m) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (m[j * 3 + i] === '1') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); x += (ch === ':' ? 2 : 4) * s; } }

// lo mismo, pero respetando R.recorte (pset)
function d_cifrasR(R, txt, x, y, c) { for (const ch of String(txt)) { const m = D_DIG[ch]; if (m) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (m[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += ch === ':' ? 2 : 4; } }

// oscurece (f < 1) o aclara hacia un color una elipse ya pintada (sombras de apoyo, charcos de luz)
function d_elipse(R, cx, cy, rx, ry, col, a) { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, d_mezcla(c, col, a * (1 - Math.abs(x - cx) / (w + 1) * 0.5))); } } }

// el vapor de una taza: tres hilos que suben ondulando y se deshacen
function d_vapor(R, x, y, t, col, alto = 12) { for (let k = 0; k < 3; k++) for (let i = 0; i < alto; i++) { const u = ((t * 0.6 + k / 3) % 1), yy = y - Math.round(i + u * 4), xx = x + (k - 1) * 2 + Math.round(Math.sin(i * 0.5 - t * 3 + k * 2) * (1 + i / 6)); if (i / alto + u * 0.5 < 0.95 && ((i + k) & 1)) R.pset(xx, yy, col); } }

const DG = pal({
  k: '#0e0c16', p0: '#12152c', p1: '#191d3a', p2: '#21264a', p3: '#2a3059', p4: '#353c6a', p5: '#434b7e',
  calido: '#d08a50', calidoL: '#f8d08a', azulM: '#5a8ae0', luna: '#c8d4f0',
  m0: '#241610', m1: '#3a2418', m2: '#563622', m3: '#744a2e', m4: '#93603a', m5: '#b8804c', m6: '#d8a468',
  alf: '#6a1e2a', alfS: '#4a1420', alfL: '#8e3038', alfC: '#c8a058',
  cor: '#b08458', corS: '#8a6440', corL: '#c89c6a', corD: '#6e4c30',
  hilo: '#e0283a', pin: '#e8403a', nota: '#f0d860', notaR: '#f0a0b0', notaA: '#9ad0e8', foto: '#f2eee4', fotoS: '#c8c2b4',
  reloj: '#1e1e26', relojL: '#3a3a48', dig: '#ff4a3a', digA: '#3e1418',
  mon: '#16182a', monL: '#3a3e58', pant: '#0a1020', barra: '#3ae88a', barraS: '#1a8a4a',
  rojo: '#d83a3a', blanco: '#f4f0e8', crema: '#f8e8b8', oro: '#e8b84a', verde: '#3a8a5a', azul: '#3a6ac8',
});

const D_PARED = [DG.p0, DG.p1, DG.p2, DG.p3, DG.p4, DG.p5];

const D_MAD = [DG.m0, DG.m1, DG.m2, DG.m3, DG.m4, DG.m5, DG.m6];

// la pared de papel pintado (rayas, rombos, grano), en penumbra, con la luz del flexo (lx, ly, fuerza) y el monitor
function d_papelPintado(R, x0, y0, x1, y1, lx, ly, luz, mx, my, k = 0, ramp = D_PARED, calido = DG.calido) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const xs = x % 16, ys = (y + (Math.floor(x / 16) & 1) * 9) % 18, d = Math.abs(xs - 8) + Math.abs(ys - 9);
    const lamp = luz > 0 ? Math.max(0, 1 - Math.hypot((x - lx) * 0.75, (y - ly) * (y < ly ? 1.3 : 0.8)) / 150) * luz : 0, mon = mx ? Math.max(0, 1 - Math.hypot((x - mx) * 0.7, y - my) / 95) : 0;
    let v = 1.5 + (xs === 0 ? -0.8 : xs === 1 ? 0.35 : 0) + (d === 4 ? 0.55 : d <= 1 ? 0.4 : 0) + (h(x >> 1, y >> 1, 7 + k) - 0.5) * 0.45 - Math.max(0, 0.32 - y / 180) * 3 + lamp * 2.4 + mon * 0.9;
    let c = d_tono(ramp, v, x, y); if (lamp > 0.05) c = d_mezcla(c, calido, Math.min(0.45, lamp * 0.6)); if (mon > 0.05) c = d_mezcla(c, DG.azulM, mon * 0.12);
    R.pset(x, y, c);
  }
}

// suelo de tablas en perspectiva (filas que crecen hacia abajo), con vetas, juntas y el brillo de una luz
function d_tarima(R, y0, y1, k = 0, brillos = []) {
  const filas = []; for (let y = y0, a = 3; y <= y1; y += a, a = Math.min(12, a + 1)) filas.push([y, Math.min(y1, y + a - 1)]);
  filas.forEach(([ya, yb], f) => { const L = 34 + f * 6; let x = -Math.round(h(f, 1, 40 + k) * L);
    while (x < 320) { const w = Math.round(L * (0.7 + h(x, f, 41 + k) * 0.6)), base = 2.4 + (h(x, f, 42 + k) - 0.5) * 1.4 + (ya - y0) / (y1 - y0) * 1.4;
      for (let y = ya; y <= yb; y++) for (let xx = Math.max(0, x); xx < Math.min(320, x + w); xx++) {
        let v = base + (y === ya ? 0.9 : y === yb ? -0.8 : 0) + (Math.sin(xx * 0.21 + y * 1.7 + x) > 0.86 ? -0.7 : 0) + (h(xx >> 2, y, 43 + k) - 0.5) * 0.4;
        for (const [bx, by, r, a] of brillos) { const g = 1 - Math.hypot((xx - bx) * 0.5, (y - by) * 1.4) / r; if (g > 0) v += g * a; }
        R.pset(xx, y, xx === x ? DG.m0 : d_tono(D_MAD, v, xx, y)); }
      x += w; } });
}

// una figurita de héroe de 6–9 px (solo colores: cuerpo, capa o cabeza)
function d_figurita(R, x, yb, c1, c2, capa = false) { const { rect, pset } = R; rect(x - 2, yb - 1, x + 2, yb, D_K); if (capa) rect(x - 2, yb - 7, x + 2, yb - 2, c2); rect(x - 1, yb - 7, x + 1, yb - 2, c1); rect(x - 1, yb - 4, x + 1, yb - 4, c2); rect(x - 1, yb - 10, x + 1, yb - 8, hex('#e8b890')); rect(x - 1, yb - 10, x + 1, yb - 10, c2); pset(x - 1, yb - 7, d_mezcla(c1, DG.blanco, 0.4)); }

// un gato dormido hecho un ovillo, con la cola que se mueve (x, y: el lomo)
function d_gatoDuerme(R, x, y, t, col = hex('#e8984a'), colS = hex('#b06a2a')) {
  const { disco, rect, pset, linea } = R; disco(x, y + 1, 5, D_K); disco(x, y + 1, 4, colS); disco(x - 1, y, 4, col); disco(x + 4, y + 1, 3, D_K); disco(x + 4, y + 1, 2, col);
  pset(x + 3, y - 2, D_K); pset(x + 6, y - 2, D_K); pset(x + 3, y - 1, col); pset(x + 6, y - 1, col); pset(x + 3, y + 1, D_K); pset(x + 5, y + 1, D_K);
  for (let i = -3; i <= 1; i += 2) pset(x + i, y - 2, colS); const r = Math.sin(y * 0.1 + t * 0.9) > 0; if (r) pset(x - 2, y - 3, colS);
  const a = Math.sin(t * 1.3) * 0.8 + Math.sin(t * 3.1) * 0.3; for (let i = 0; i < 7; i++) { const xx = x - 4 - i, yy = y + 5 - Math.round(Math.sin(i * 0.5) * a * i * 0.5); pset(xx, yy, D_K); pset(xx, yy - 1, i > 4 ? DG.blanco : col); }
  if (Math.floor(t / 4) % 3 === 0) { const u = (t % 4) / 4; pset(x + 7 + Math.round(u * 4), y - 6 - Math.round(u * 6), hex('#c8c8e0')); }
}

// el estudio sin la mesa (fijo): pared, corcho vacío, reloj sin cifras, estantería, ventana con su marco, suelo, alfombra
function d_estudioSala(R, dormido) {
  const { rect, pset, linea, disco, poligono } = R, luz = dormido ? 0.15 : 1;
  d_papelPintado(R, 0, 0, 319, 121, 300, 98, luz, dormido ? 253 : 253, 112, 0);
  // la moldura del techo y el rodapié
  for (let x = 0; x < 320; x++) { pset(x, 0, DG.p0); pset(x, 1, DG.p2); pset(x, 2, DG.p1); }
  rect(0, 116, 319, 121, DG.m2); rect(0, 116, 319, 116, DG.m4); rect(0, 117, 319, 117, DG.m3); rect(0, 121, 319, 121, DG.m0); for (let x = 7; x < 320; x += 61) rect(x, 117, x, 120, DG.m1);
  rect(70, 118, 74, 120, hex('#c8c0a8')); rect(71, 119, 73, 119, hex('#6a6458'));   // el enchufe del rodapié
  // la tarima con el reflejo del monitor y del flexo
  d_tarima(R, 122, 179, 0, dormido ? [[253, 132, 60, 0.8]] : [[253, 132, 70, 1.3], [300, 130, 60, 1.6]]);
  // el claro de luna que entra por la ventana (un paralelogramo tramado sobre la tarima)
  for (let y = 124; y < 176; y++) { const d = Math.round((y - 124) * -0.9); for (let x = 214 + d; x <= 262 + d; x++) if (((x + y) & 1) === 0 && x > 0) { const c = R.pget(x, y); if (c) pset(x, y, d_mezcla(c, DG.luna, 0.22)); } }
  // la alfombra granate en perspectiva, con su cenefa, el dibujo de rombos, los flecos y su sombra
  { const T0 = 140, T1 = 172, xl = (y) => Math.round(42 - (y - T0) * 0.45), xr = (y) => Math.round(176 + (y - T0) * 0.45);
    for (let y = T0; y <= T1; y++) for (let x = xl(y); x <= xr(y); x++) {
      const b = y - T0 < 3 || T1 - y < 3 || x - xl(y) < 4 || xr(y) - x < 4, b2 = y - T0 === 4 || T1 - y === 4 || x - xl(y) === 6 || xr(y) - x === 6;
      const u = (x - 109) / 9, w = (y - 156) / 4.5, rombo = (Math.abs(u - Math.round(u)) + Math.abs(w - Math.round(w))) < 0.28;
      let c = b ? DG.alfC : b2 ? DG.alfS : rombo ? DG.alfL : DG.alf; if (h(x, y, 44) < 0.12) c = d_mezcla(c, D_K, 0.25);
      if (!dormido) { const g = 1 - Math.hypot(x - 230, (y - 150) * 2) / 140; if (g > 0) c = d_mezcla(c, DG.calidoL, g * 0.25); }
      pset(x, y, c); }
    for (let y = T0; y <= T1; y += 2) { pset(xl(y) - 1, y, DG.crema); pset(xr(y) + 1, y, DG.crema); }
    rect(xl(T1), T1 + 1, xr(T1), T1 + 1, DG.m0); }
  // EL CORCHO: marco de madera y corcho moteado (lo que se pega lo pone d_corchoCosas cada fotograma)
  rect(20, 26, 134, 102, DG.k); rect(21, 27, 133, 101, DG.m3); rect(21, 27, 133, 27, DG.m5); rect(21, 101, 133, 101, DG.m1); rect(133, 27, 133, 101, DG.m1);
  for (let y = 30; y <= 98; y++) for (let x = 24; x <= 130; x++) { const n = h(x, y, 45), g = (x - 24) / 106 * 0.3 + (y - 30) / 68 * 0.25; pset(x, y, n < 0.12 ? DG.corD : n < 0.4 + g * 0.3 ? DG.corS : n > 0.93 ? DG.corL : DG.cor); }
  rect(23, 29, 131, 29, DG.k); rect(23, 29, 23, 99, DG.k); for (let x = 24; x < 131; x++) pset(x, 30, DG.corD);
  linea(77, 22, 21, 27, hex('#8a8a96')); linea(77, 22, 133, 27, hex('#8a8a96')); disco(77, 22, 1, hex('#c8c8d0'));   // el alambre del que cuelga
  // EL RELOJ DE CUENTA ATRÁS: caja negra con su clavo, cristal con reflejo, la pantalla roja apagada
  linea(174, 25, 152, 32, hex('#7a7a86')); linea(174, 25, 196, 32, hex('#7a7a86')); disco(174, 25, 1, hex('#c8c8d0'));
  rect(146, 31, 202, 66, DG.k); rect(147, 32, 201, 65, DG.reloj); rect(147, 32, 201, 32, DG.relojL); rect(147, 32, 147, 65, DG.relojL); rect(150, 35, 198, 62, D_K);
  for (let y = 36; y <= 61; y++) for (let x = 151; x <= 197; x++) pset(x, y, ((x + y) & 3) === 0 ? hex('#1c0c10') : hex('#140a0e'));
  for (const x of [152, 194]) { rect(x, 67, x + 2, 68, DG.k); }
  // la estantería con cómics: tablas, lomos de colores, pilas tumbadas y figuritas
  { const x0 = 140, x1 = 206; rect(x0, 72, x1, 122, DG.k); rect(x0 + 1, 73, x1 - 1, 121, DG.m1); rect(x0 + 1, 73, x0 + 2, 121, DG.m3); rect(x1 - 2, 73, x1 - 1, 121, DG.m3);
    for (const y of [73, 88, 104, 120]) { rect(x0 + 1, y, x1 - 1, y + 1, DG.m4); rect(x0 + 1, y, x1 - 1, y, DG.m5); rect(x0 + 3, y + 2, x1 - 3, y + 2, DG.m0); }
    const COL = ['#c83a3a', '#3a6ac8', '#e8c040', '#3a9a5a', '#8a3ab0', '#e87a3a', '#f0e8d8', '#2a2a3a', '#c85a8a', '#4ab0c8'].map(hex);
    for (const [ya, yb] of [[76, 87], [92, 103]]) { let x = x0 + 4, k = 0; while (x < x1 - 6) { const w = 1 + (h(x, ya, 46) < 0.4 ? 1 : 0), alto = yb - ya - Math.floor(h(x, ya, 47) * 4), c = COL[Math.floor(h(x, ya, 48) * COL.length)];
        if (h(x, ya, 49) < 0.12 && x < x1 - 20) { for (let j = 0; j < 4; j++) { rect(x, yb - j * 2 - 1, x + 13, yb - j * 2, DG.k); rect(x, yb - j * 2 - 1, x + 12, yb - j * 2 - 1, COL[(k + j) % COL.length]); } x += 15; continue; }
        rect(x, yb - alto, x + w, yb, c); pset(x, yb - alto + 2, d_mezcla(c, DG.blanco, 0.5)); pset(x, yb - 2, d_mezcla(c, D_K, 0.4)); if (w > 1) rect(x + w, yb - alto, x + w, yb, d_mezcla(c, D_K, 0.35)); x += w + 1; k++; } }
    // la balda de abajo: cajas de cartón y una caja de figuras con su ventana
    rect(x0 + 5, 109, x0 + 24, 119, DG.k); rect(x0 + 6, 110, x0 + 23, 119, hex('#c8a070')); rect(x0 + 6, 110, x0 + 23, 111, hex('#e0c090')); rect(x0 + 12, 110, x0 + 16, 111, hex('#a88050'));
    rect(x0 + 28, 106, x0 + 44, 119, DG.k); rect(x0 + 29, 107, x0 + 43, 118, hex('#3a6ac8')); rect(x0 + 31, 109, x0 + 41, 116, hex('#a8c8e8')); d_figurita(R, x0 + 36, 116, hex('#c83a3a'), hex('#e8c040'));
    rect(x0 + 48, 111, x0 + 62, 119, DG.k); rect(x0 + 49, 112, x0 + 61, 119, hex('#8a8a96')); rect(x0 + 49, 112, x0 + 61, 112, hex('#b8b8c4'));
    // encima: figuritas y un muñeco cabezón
    d_figurita(R, x0 + 40, 72, hex('#3a6ac8'), hex('#c83a3a'), true); d_figurita(R, x0 + 48, 72, hex('#2a7a3a'), hex('#7a7e86'), true); d_figurita(R, x0 + 56, 72, hex('#c8a040'), hex('#c83a3a'));
    d_elipse(R, 173, 123, 34, 1, D_K, 0.35); }
  // LA VENTANA: marco de madera, alféizar con un cactus y las cortinas; el cristal lo pinta d_ventanaNoche cada fotograma
  rect(211, 21, 273, 81, DG.k); rect(212, 22, 272, 80, DG.m4); rect(212, 22, 272, 22, DG.m6); rect(212, 22, 212, 80, DG.m5);
  rect(208, 80, 276, 84, DG.k); rect(209, 80, 275, 82, DG.m5); rect(209, 80, 275, 80, DG.m6); rect(209, 83, 275, 83, DG.m1);
  rect(258, 72, 264, 79, DG.k); rect(259, 73, 263, 79, hex('#c8603a')); rect(259, 73, 263, 73, hex('#e88a5a')); rect(260, 66, 262, 72, hex('#3a8a4a')); rect(258, 68, 259, 70, hex('#3a8a4a')); pset(261, 66, hex('#8ad87a')); pset(262, 65, hex('#f0a0c0'));
  for (const [a, b, s] of [[204, 215, 1], [269, 277, 0]]) for (let y = 18; y <= 112; y++) for (let x = a; x <= b; x++) {
    if (s === 0 && y < 46 && x > 276) continue;
    const ond = Math.sin((x - a) * 1.1 + y * 0.03), v = 1.6 + ond * 1.1 + (y > 100 ? -0.4 : 0); pset(x, y, x === a || x === b ? D_K : d_tono([hex('#3a1e3a'), hex('#5a2a4a'), hex('#7a3a5a'), hex('#9a4e6a')], v, x, y)); }
  rect(200, 16, 276, 18, DG.k); rect(201, 17, 275, 17, hex('#b8a888')); disco(200, 17, 2, hex('#c8b898')); disco(275, 17, 2, hex('#c8b898'));
}

// la ciudad de noche por la ventana (recortada a su hueco): cielo tramado, luna con nubes, estrellas, edificios, avión
function d_ventanaNoche(R, t, [x0, y0, x1, y1], dormido = false) {
  const { pset, disco, poligono } = R; R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, d_tono([hex('#0a0c22'), hex('#121838'), hex('#1c2450'), hex('#2a3060'), hex('#3a3a6a')], (y - y0) / (y1 - y0) * 3.4 + 0.2, x, y));
  for (let k = 0; k < 14; k++) { const x = x0 + Math.round(h(k, 1, 50) * (x1 - x0)), y = y0 + Math.round(h(k, 2, 50) * 24), b = Math.sin(t * (1.5 + k % 3) + k); if (b > -0.3) pset(x, y, b > 0.7 ? DG.blanco : hex('#8a8ab8')); }
  const mx = x0 + 42, my = y0 + 11; R.halo(mx, my, 10, [hex('#2a3060'), hex('#3a4274')], 1.1); disco(mx, my, 5, hex('#e8ecf8')); disco(mx + 2, my - 1, 4, hex('#1c2450'));
  for (const [cx, cy, w, v, k] of [[0, 14, 22, 1.6, 0], [30, 9, 16, 1.0, 1]]) { const x = x0 + ((cx + t * v) % 80) - 14; for (let i = 0; i < w; i++) { const e = Math.sin(i / w * Math.PI) * 2.6; for (let j = -Math.round(e); j <= 0; j++) pset(x + i, y0 + cy + j, j === 0 ? hex('#262a52') : j === -Math.round(e) ? hex('#5a5e8a') : hex('#3e4270')); } }
  // dos capas de edificios: la lejana en silueta, la cercana con ventanas que se encienden
  for (let x = x0; x <= x1; x++) { const hh = 20 + Math.round(h(Math.floor(x / 7), 3, 51) * 14); for (let y = y1 - hh; y <= y1; y++) pset(x, y, hex('#1a1c3a')); }
  let bx = x0 - 3; let k = 0; while (bx < x1) { const w = 9 + Math.round(h(k, 4, 52) * 8), hh = 10 + Math.round(h(k, 5, 52) * 16), top = y1 - hh;
    for (let y = top; y <= y1; y++) for (let x = bx; x < bx + w; x++) pset(x, y, x === bx ? hex('#2e2c4e') : hex('#24223e'));
    for (let y = top + 2; y < y1 - 1; y += 3) for (let x = bx + 2; x < bx + w - 1; x += 3) { const on = !dormido && h(x, y + Math.floor((t + k * 3.3) / 5), 53) < 0.35 || dormido && h(x, y, 54) < 0.1; pset(x, y, on ? (h(x, y, 55) < 0.3 ? hex('#a8d0f0') : hex('#f8d888')) : hex('#1a1830')); }
    bx += w + 1; k++; }
  { const ax = x0 + 18; for (let y = y1 - 34; y < y1 - 22; y++) pset(ax, y, hex('#3a3a5a')); if (Math.sin(t * 3) > 0) { pset(ax, y1 - 35, hex('#ff4a3a')); pset(ax - 1, y1 - 35, hex('#8a2a2a')); pset(ax + 1, y1 - 35, hex('#8a2a2a')); } }
  { const u = (t / 14) % 1, ax = Math.round(x1 + 6 - u * (x1 - x0 + 16)), ay = y0 + 20 - Math.round(u * 6); pset(ax, ay, hex('#8a8aa8')); pset(ax + 1, ay, hex('#8a8aa8')); pset(ax - 1, ay, Math.sin(t * 8) > 0 ? hex('#ff4a3a') : hex('#4a2a3a')); if (Math.sin(t * 5 + 1) > 0.5) pset(ax + 2, ay, DG.blanco); }
  // el reflejo del cristal y el parteluz
  for (let i = 0; i < 18; i++) pset(x0 + 6 + i, y1 - 8 - i, d_mezcla(R.pget(x0 + 6 + i, y1 - 8 - i), DG.blanco, 0.18));
  R.recorte(null);
  R.rect(242, y0, 243, y1, DG.m4); R.rect(242, y0, 242, y1, DG.m6); R.rect(x0, 50, x1, 51, DG.m4); R.rect(x0, 50, x1, 50, DG.m6);
}

// lo que va pegado en el corcho, que se va llenando con n (0–1): fotos, recortes, notas, billete, boceto e hilos rojos
function d_corchoCosas(R, t, n) {
  const { rect, pset, linea, disco } = R, k = Math.round(n * 9);
  const pin = (x, y, c = DG.pin) => { pset(x + 1, y + 1, hex('#5a3a26')); disco(x, y, 1, c); pset(x - 1, y - 1, DG.blanco); };
  const foto = (x, y, w, hh, f) => { rect(x + 1, y + 1, x + w + 1, y + hh + 1, DG.corD); rect(x, y, x + w, y + hh, DG.foto); rect(x + 2, y + 2, x + w - 2, y + hh - 6, hex('#2a3048')); f(x + 2, y + 2, x + w - 2, y + hh - 6); rect(x, y + hh, x + w, y + hh, DG.fotoS); };
  const P = [];
  if (k >= 1) { foto(28, 34, 22, 26, (a, b, c, d) => { rect(a, b + 10, c, d, hex('#5a6a8a')); disco(a + 9, b + 9, 4, hex('#3ae88a')); disco(a + 9, b + 9, 2, hex('#c8f8d8')); }); P.push([39, 35]); }   // la luz verde
  if (k >= 2) { foto(56, 38, 22, 24, (a, b, c, d) => { rect(a, b, c, d, hex('#8a3ab0')); for (let i = a; i <= c; i += 4) rect(i, d - 4 - (i % 3) * 2, i + 2, d, hex('#2a1a3a')); disco(a + 12, b + 5, 3, hex('#d85ab0')); }); P.push([67, 39]); }   // los pósters
  if (k >= 3) { rect(86, 34, 112, 50, DG.blanco); rect(87, 35, 111, 49, hex('#e8e4d8')); for (let y = 37; y < 48; y += 2) rect(88, y, 88 + Math.round(10 + h(y, 1, 56) * 12), y, hex('#8a8a96')); rect(88, 37, 99, 41, hex('#5a5a66')); P.push([99, 35]); }   // un recorte
  if (k >= 4) { rect(30, 66, 46, 82, DG.nota); rect(30, 81, 46, 82, hex('#c8b040')); for (let y = 70; y < 80; y += 3) linea(32, y, 43, y + (y & 1), hex('#5a4a2a')); P.push([38, 67]); }
  if (k >= 5) { rect(52, 70, 82, 84, hex('#f0e0c8')); rect(52, 70, 56, 84, hex('#e04a3a')); for (let x = 58; x < 82; x += 3) pset(x, 70, hex('#c8b8a0')); d_cifras(R, '12', 60, 74, hex('#3a3a4a')); d_cifras(R, '18', 70, 74, hex('#e04a3a')); P.push([67, 71]); }   // el billete
  if (k >= 6) { rect(90, 56, 114, 82, DG.blanco); for (let y = 58; y < 82; y += 3) rect(91, y, 113, y, hex('#c8d8e8')); R.disco(102, 68, 7, hex('#7a7e86')); rect(98, 66, 100, 66, D_K); rect(104, 66, 106, 66, D_K); rect(100, 71, 104, 71, D_K); R.icono('?', 108, 74, DG.rojo, null); P.push([102, 57]); }   // la máscara dibujada
  if (k >= 7) { rect(116, 36, 128, 48, DG.notaR); rect(116, 47, 128, 48, hex('#c87a8a')); R.icono('?', 120, 38, D_K, null); P.push([122, 37]); }
  if (k >= 8) { rect(114, 84, 128, 96, DG.notaA); for (let y = 87; y < 95; y += 2) rect(116, y, 116 + Math.round(4 + h(y, 3, 57) * 7), y, hex('#3a5a7a')); P.push([121, 85]); }
  if (k >= 9) { foto(30, 86 - 2, 18, 12, (a, b, c, d) => { rect(a, b, c, d, hex('#3a8a5a')); }); P.push([39, 85]); }
  // los hilos rojos entre las chinchetas, un poco caídos
  for (let i = 1; i < P.length; i++) { const [ax, ay] = P[i - 1], [bx, by] = P[i]; if (Math.abs(ax - bx) + Math.abs(ay - by) > 70) continue; const n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)); for (let s = 0; s <= n; s++) { const u = s / n; pset(Math.round(ax + (bx - ax) * u), Math.round(ay + (by - ay) * u + Math.sin(u * Math.PI) * 3), DG.hilo); } }
  P.forEach(([x, y], i) => pin(x, y, i % 3 === 2 ? hex('#3a8ae8') : DG.pin));
}

// el reloj de cuenta atrás: días en grande y horas:minutos:segundos que bajan
function d_relojCifras(R, t, dias, dormido) {
  const s = String(Math.max(0, Math.round(dias))).padStart(2, '0'), RO = [hex('#ff8a6a'), hex('#ff5a3a'), hex('#e82a2a'), hex('#a81a1a')];
  R.numero('88', 174, 58, { tam: 16, centro: true, color: DG.digA, contorno: false, sombra: false });
  R.halo(174, 48, 18, [hex('#2a0e12'), hex('#3a1216')], 1.0);
  R.numero(s, 174, 58, { tam: 16, centro: true, rampa: RO, contorno: false, sombra: false });
  const r = Math.max(0, 86399 - Math.floor(t)), hh = String(Math.floor(r / 3600)).padStart(2, '0'), mm = String(Math.floor(r / 60) % 60).padStart(2, '0'), ss = String(r % 60).padStart(2, '0');
  R.rect(155, 60, 193, 61, D_K);
  d_cifras(R, hh + ':' + mm + ':' + ss, 157, 59 - 3, Math.floor(t * 2) % 2 ? hex('#e8603a') : hex('#c84a2a'));
  R.pset(199, 34, Math.sin(t * 6) > 0 ? hex('#ff4a3a') : hex('#4a1a1a'));   // el piloto
  // el reflejo del cristal
  for (let i = 0; i < 8; i++) R.pset(152 + i, 44 - i, d_mezcla(R.pget(152 + i, 44 - i), DG.blanco, 0.3));
}

// la mesa del estudio con todo lo que tiene encima (capa suelta; se pega encima de los actores)
function d_mesaCapa(R, dormido) {
  const { rect, pset, linea, disco, poligono } = R;
  // el tablero, visto un poco desde arriba, con vetas y el canto
  for (let y = 138; y <= 147; y++) for (let x = 194; x <= 319; x++) { const v = 4.2 - (y - 138) * 0.12 + (Math.sin(x * 0.13 + Math.sin(y * 0.9) * 2) > 0.75 ? -0.9 : 0) + (h(x >> 2, y, 60) - 0.5) * 0.5 + (dormido ? -1.4 : 0); pset(x, y, d_tono(D_MAD, v, x, y)); }
  rect(194, 138, 319, 138, DG.m6); rect(193, 148, 319, 150, DG.m5); rect(193, 148, 319, 148, DG.m6); rect(193, 150, 319, 150, DG.m2); rect(193, 138, 193, 150, DG.k);
  // el frente con los cajones, los tiradores y la sombra bajo el tablero
  for (let y = 151; y <= 179; y++) for (let x = 194; x <= 319; x++) pset(x, y, d_tono(D_MAD, 2.2 + (Math.sin(x * 0.09 + y * 0.31) > 0.8 ? -0.6 : 0) + (y < 154 ? -1.2 : 0) + (dormido ? -0.8 : 0), x, y));
  rect(193, 151, 193, 179, DG.k); rect(194, 151, 196, 179, DG.m3);
  for (const [a, b] of [[202, 254], [262, 316]]) for (const [ya, yb] of [[156, 166], [169, 179]]) { rect(a, ya, b, yb, DG.k); rect(a + 1, ya + 1, b - 1, yb - (yb === 179 ? 0 : 1), DG.m3); rect(a + 1, ya + 1, b - 1, ya + 1, DG.m4); rect(Math.round((a + b) / 2) - 5, ya + 4, Math.round((a + b) / 2) + 5, ya + 5, hex('#c8a868')); rect(Math.round((a + b) / 2) - 5, ya + 5, Math.round((a + b) / 2) + 5, ya + 5, hex('#7a5a30')); }
  // el monitor: marco, peana y su sombra sobre el tablero
  d_elipse(R, 253, 142, 22, 2, D_K, 0.45);
  rect(246, 132, 260, 140, DG.k); rect(248, 132, 258, 139, DG.monL); rect(236, 139, 270, 142, DG.k); rect(237, 139, 269, 141, DG.mon); rect(237, 139, 269, 139, DG.monL);
  rect(213, 87, 293, 134, DG.k); rect(214, 88, 292, 133, DG.mon); rect(214, 88, 292, 88, DG.monL); rect(214, 88, 214, 133, DG.monL); rect(215, 130, 291, 133, hex('#20223a'));
  // el teclado y el ratón con su cable
  poligono([[220, 145], [278, 145], [275, 141], [223, 141]], DG.k); for (let x = 224; x < 274; x += 3) for (const y of [142, 144]) rect(x, y, x + 1, y, h(x, y, 61) < 0.15 ? hex('#5a5e78') : hex('#8a8ea8'));
  disco(285, 143, 3, DG.k); disco(285, 143, 2, hex('#c8c8d8')); pset(285, 141, hex('#5a5a6a')); linea(285, 140, 292, 133, D_K);
  // el cubo de palomitas a rayas, rebosando
  { const x0 = 196, x1 = 210; poligono([[x0, 120], [x1, 120], [x1 - 2, 146], [x0 + 2, 146]], DG.k); for (let y = 121; y < 146; y++) { const a = x0 + 1 + Math.round((y - 120) / 13), b = x1 - 1 - Math.round((y - 120) / 13); for (let x = a; x <= b; x++) pset(x, y, ((x - x0) >> 1) % 2 ? DG.blanco : DG.rojo); pset(b, y, d_mezcla(R.pget(b, y), D_K, 0.35)); }
    for (let i = 0; i < 16; i++) { const px = x0 + 1 + Math.round(h(i, 1, 62) * 13), py = 114 + Math.round(h(i, 2, 62) * 6); disco(px, py, 2, DG.crema); pset(px - 1, py - 1, DG.blanco); pset(px + 1, py + 1, hex('#e0b860')); } }
  // la taza
  rect(212, 132, 219, 141, DG.k); rect(213, 133, 218, 141, hex('#3a8ac8')); rect(213, 133, 214, 141, hex('#6aaae8')); rect(213, 133, 218, 134, hex('#2a1a10')); rect(220, 135, 221, 139, DG.k);
  // tres figuritas junto al ratón
  d_figurita(R, 296, 146, hex('#c83a3a'), hex('#e8c040')); d_figurita(R, 302, 146, hex('#3a9a5a'), hex('#7a7e86'), true); d_figurita(R, 308, 146, hex('#3a6ac8'), hex('#f0f0f0'));
  // el flexo: base, brazo articulado y cabeza (baja y apagada si duerme)
  rect(311, 143, 319, 146, DG.k); rect(312, 143, 318, 145, hex('#3a3a4a')); rect(312, 143, 318, 143, hex('#6a6a7a'));
  if (dormido) { linea(315, 143, 311, 124, DG.k); linea(316, 143, 312, 124, hex('#5a5a6a')); linea(311, 124, 300, 128, DG.k); linea(311, 125, 300, 129, hex('#5a5a6a')); poligono([[292, 128], [302, 124], [306, 134], [296, 138]], DG.k); poligono([[294, 129], [301, 126], [304, 133], [297, 136]], hex('#4a4a5a')); }
  else { linea(315, 143, 312, 112, DG.k); linea(316, 143, 313, 112, hex('#6a6a7a')); linea(312, 112, 300, 99, DG.k); linea(313, 112, 301, 99, hex('#6a6a7a')); disco(312, 112, 1, hex('#8a8a9a'));
    poligono([[290, 100], [300, 94], [306, 103], [296, 109]], DG.k); poligono([[292, 101], [299, 96], [304, 103], [297, 107]], hex('#c8a048')); pset(296, 98, hex('#f0d880')); linea(291, 102, 296, 108, hex('#fff6c8')); }
}

// lo vivo de la mesa: la pantalla con la barra de carga, el vapor de la taza, el piloto, la luz del flexo
function d_mesaViva(R, t, o, dormido) {
  const { rect, pset } = R, [x0, y0, x1, y1] = [219, 92, 287, 128];
  let c = o.carga; if (c == null) { const u = (t % 10) / 10; c = dormido ? 0.99 : u < 0.62 ? u / 0.62 * 0.99 : u < 0.96 ? 0.99 : 0; }
  const pc = Math.min(99, Math.floor(c * 100 + 1e-6)), osc = dormido ? 0.55 : 0;
  // fondo del reproductor: el póster en penumbra (una silueta encapuchada con su máscara y la luz verde)
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = Math.max(0, 1 - Math.hypot(x - 253, (y - 104) * 1.4) / 40); pset(x, y, d_mezcla(d_mezcla(DG.pant, hex('#12301e'), g), D_K, osc)); }
  if (!dormido) { R.recorte([x0, y0, x1, y1]); R.poligono([[240, 129], [266, 129], [262, 108], [253, 99], [244, 108]], hex('#14281a')); R.disco(253, 104, 5, hex('#2a2e36')); R.recorte(null); pset(251, 103, hex('#3ae88a')); pset(255, 103, hex('#3ae88a')); }
  // el porcentaje, grande, y la barra
  const s = pc + '%', rampa = dormido ? [hex('#5a6a6a'), hex('#4a5858'), hex('#3a4646')] : [hex('#ffffff'), hex('#c8f8dc'), hex('#7ae8a8')];
  R.numero(s, 253, 113, { tam: 16, centro: true, rampa, contorno: true });
  rect(223, 117, 283, 124, D_K); rect(224, 118, 282, 123, hex('#1a2430')); const w = Math.round(58 * pc / 99);
  if (w > 0) { rect(224, 118, 223 + w, 123, dormido ? hex('#2a6a4a') : DG.barra); rect(224, 122, 223 + w, 123, dormido ? hex('#1a4a34') : DG.barraS); rect(224, 118, 223 + w, 118, dormido ? hex('#3a7a5a') : hex('#b8f8d0'));
    if (!dormido) { const sx = 224 + Math.floor((t * 40) % (w + 12)) - 6; for (let i = 0; i < 4; i++) if (sx + i >= 224 && sx + i < 224 + w) rect(sx + i, 119, sx + i, 121, hex('#d8ffe8')); } }
  // la ruedecita que gira mientras carga (o un símbolo de pausa si duerme)
  if (!dormido) { for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t * 4, on = (i + Math.floor(t * 8)) % 8; pset(Math.round(226 + Math.cos(a) * 3), Math.round(97 + Math.sin(a) * 3), on < 3 ? DG.blanco : hex('#3a4a5a')); } }
  else { rect(224, 95, 225, 99, hex('#4a5a5a')); rect(228, 95, 229, 99, hex('#4a5a5a')); }
  // el brillo del cristal y el piloto
  for (let i = 0; i < 12; i++) pset(x1 - 14 + i, y0 + 1 + Math.round(i * 0.4), d_mezcla(R.pget(x1 - 14 + i, y0 + 1 + Math.round(i * 0.4)), DG.blanco, 0.15));
  pset(289, 132, dormido ? (Math.sin(t * 2) > 0 ? hex('#f0a030') : hex('#5a3a10')) : hex('#3ae88a'));
  if (!dormido) { d_vapor(R, 215, 130, t, hex('#c8c8d8'), 10); d_elipse(R, 268, 144, 36, 3, DG.calidoL, 0.25); }
}

// qué vista piden las opciones (un encuadre que no existe cae en el primero; una cámara que no es la suya, en 'general')
function d_vista(V, o) { const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general'; return { enc, cam, geo: { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) } }; }

// el salón (fijo): papel pintado verde, calendario vacío, cuadro, sofá con mantita y mando, mueble de la tele, lámpara
const D_VERDE = pal({ a: '#14221e', b: '#1a2c26', c: '#22382f', d: '#2c463a', e: '#385646', f: '#466852' });

// el salón de casa de Atom (fijo), el MISMO de la tele de wundagore 'cumbre' 'tele' visto más de lejos: papel pintado
// morado oscuro de rayas con lunares, el cuadro del paisaje con la luna, la lámpara de pie de pantalla marrón, el
// televisor negro de canto fino con su peana y el mueble de madera (dos puertas con tiradores, el hueco con la consola y
// los cómics, la planta y las tres figuritas encima); además el calendario, el reloj, el sofá con
// la mantita y el mando, la tarima y la alfombra redonda
function d_teleSala(R) {
  const { rect, pset, linea, disco, poligono } = R, VP = [hex('#0e0c16'), hex('#1a1626'), hex('#241e34'), hex('#2e2840'), hex('#3a3250'), hex('#4a4060')];
  // la pared: rayas anchas, lunares, grano, la luz cálida de la lámpara y la de la tele
  for (let y = 0; y <= 129; y++) for (let x = 0; x < 320; x++) { const raya = (x % 12) < 6, n = h(x >> 1, y >> 1, 111), lamp = Math.max(0, 1 - Math.hypot((x - 301) * 0.8, (y - 72) * 1.1) / 120), tv = Math.max(0, 1 - Math.hypot((x - 211) * 0.6, y - 88) / 110);
    let v = 1.7 + (raya ? 0.35 : -0.1) + (n > 0.93 ? -0.6 : 0) + lamp * 2 + tv * 0.9 - Math.max(0, 0.25 - y / 180) * 3;
    if (y % 10 === 0 && (x + (y / 10 % 2 ? 6 : 0)) % 12 === 3) v += 1.2;
    let c = d_tono(VP, v, x, y); if (lamp > 0.1) c = d_mezcla(c, hex('#c8904a'), Math.min(0.35, lamp * 0.45)); pset(x, y, c); }
  for (let x = 0; x < 320; x++) { pset(x, 0, VP[0]); pset(x, 1, VP[3]); pset(x, 2, VP[1]); }
  // el rodapié con su enchufe
  rect(0, 124, 319, 129, DG.m2); rect(0, 124, 319, 124, DG.m5); rect(0, 125, 319, 125, DG.m3); rect(0, 129, 319, 129, DG.m0); for (let x = 11; x < 320; x += 53) rect(x, 125, x, 128, DG.m1);
  rect(116, 126, 120, 128, hex('#c8c0a8')); rect(117, 127, 119, 127, hex('#6a6458'));
  d_tarima(R, 130, 179, 5, [[211, 140, 80, 1.6], [300, 138, 50, 1.4]]);
  // la alfombra redonda de lana, con anillos
  for (let y = 146; y <= 178; y++) for (let x = 24; x <= 300; x++) { const d = Math.hypot((x - 162) / 138, (y - 162) / 16); if (d > 1) continue; const r = Math.floor(d * 6); pset(x, y, d > 0.96 ? hex('#c8b090') : r % 2 ? hex('#8a6a8a') : hex('#a88aa0')); if (h(x, y, 70) < 0.08) pset(x, y, hex('#6a4a6a')); }
  // el resplandor de la tele en el suelo
  for (let y = 132; y <= 178; y++) for (let x = 120; x <= 300; x++) { const g = 1 - Math.hypot((x - 211) * 0.6, (y - 135) * 1.6) / 70; if (g > 0 && ((x + y) & 1) === 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#8ab8e8'), g * 0.3)); }
  // EL CALENDARIO: anillas, la foto de arriba (montaña) y la rejilla de 7 × 5 (las cifras las pinta d_calendario)
  d_elipse(R, 68, 97, 34, 1, D_K, 0.4);
  rect(33, 31, 99, 95, D_K); rect(34, 32, 98, 94, hex('#f4f0e4')); rect(34, 32, 98, 50, hex('#e8e0cc'));
  poligono([[36, 50], [56, 36], [70, 46], [80, 38], [96, 50]], hex('#5a7aa8')); poligono([[52, 39], [56, 36], [60, 39]], DG.blanco); poligono([[77, 40], [80, 38], [83, 40]], DG.blanco); disco(88, 38, 2, hex('#f0c040'));
  rect(34, 50, 98, 56, hex('#c83a3a'));
  for (let i = 0; i <= 7; i++) rect(35 + i * 9, 57, 35 + i * 9, 92, hex('#d8d0c0')); for (let j = 0; j <= 5; j++) rect(35, 57 + j * 7, 98, 57 + j * 7, hex('#d8d0c0'));
  for (const x of [44, 66, 88]) { rect(x - 1, 28, x + 1, 33, hex('#8a8a96')); pset(x, 28, hex('#d8d8e0')); }
  rect(34, 95, 99, 96, hex('#0a080e')); rect(97, 88, 98, 94, hex('#d8d0bc'));   // la sombra y la esquina que se levanta
  // el reloj de pared redondo (las agujas se mueven en d_tele)
  disco(119, 51, 10, D_K); disco(118, 50, 10, D_K); disco(118, 50, 9, hex('#c8a060')); disco(118, 50, 7, hex('#f4ecd8')); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pset(Math.round(118 + Math.cos(a) * 6), Math.round(50 + Math.sin(a) * 6), hex('#5a4a3a')); } pset(114, 46, DG.blanco); pset(115, 45, DG.blanco);
  // EL CUADRO del paisaje con la luna (el mismo de la tele de cerca): marco, cielo de noche, colinas, la luna
  rect(104, 70, 136, 98, D_K); rect(105, 71, 135, 97, hex('#3a2a1a')); rect(105, 71, 135, 71, hex('#6a4a2a')); rect(107, 73, 133, 95, hex('#2a3248'));
  for (let y = 73; y <= 82; y++) for (let x = 107; x <= 133; x++) if (((x + y) & 3) === 0) pset(x, y, hex('#344060'));
  poligono([[107, 89], [116, 81], [124, 87], [133, 80], [133, 95], [107, 95]], hex('#24302a')); poligono([[107, 95], [107, 92], [120, 88], [133, 93], [133, 95]], hex('#1c2620')); disco(127, 77, 2, hex('#8a7a5a')); pset(126, 76, hex('#c8b888'));
  rect(105, 98, 135, 99, hex('#0a080e'));
  // EL SOFÁ: respaldo, cojines, brazos, asiento, faldón, patas y su sombra
  d_elipse(R, 74, 154, 66, 3, D_K, 0.4);
  const SF = [hex('#2a3a6a'), hex('#34487a'), hex('#40588c'), hex('#5070a4'), hex('#6a8abc')];
  for (let y = 104; y <= 152; y++) for (let x = 14; x <= 132; x++) {
    let v = -1; const brazo = x < 26 || x > 120;
    if (brazo && y >= 116) v = 2.2 + (x < 26 ? (x - 14) / 12 : (132 - x) / 12) * 0.8 - (y > 140 ? 0.8 : 0) + (y === 116 || y === 117 ? 1.2 : 0);
    else if (!brazo && y < 132) v = 1.6 + (y - 104) / 28 * 0.8 + Math.sin((x - 26) / 94 * Math.PI * 3) * 0.6 * (y < 108 ? 1 : 0.3);
    else if (!brazo && y < 140) v = 3 - (y - 132) * 0.15;
    else if (y < 150) v = 1.2;
    if (v < 0) continue; pset(x, y, d_tono(SF, v + (h(x, y, 71) - 0.5) * 0.4, x, y)); }
  rect(14, 104, 132, 104, D_K); rect(13, 104, 13, 150, D_K); rect(133, 104, 133, 150, D_K); rect(26, 132, 120, 132, SF[4]); rect(14, 140, 132, 140, SF[0]); rect(14, 150, 132, 150, D_K);
  for (let x = 30; x < 118; x += 31) { rect(x + 28, 106, x + 28, 130, SF[0]); }   // las costuras de los cojines del respaldo
  for (const x of [17, 129]) rect(x, 151, x + 2, 153, DG.m1);
  for (const [cx, c, c2] of [[44, hex('#e8b84a'), hex('#b8882a')], [100, hex('#c84a5a'), hex('#8a2a3a')]]) { for (let j = -9; j <= 9; j++) for (let i = -10; i <= 10; i++) if (Math.abs(i) / 10 + Math.abs(j) / 9 < 1.25 && Math.abs(i) < 10 && Math.abs(j) < 9) pset(cx + i, 122 + j, (i + j > 4) ? c2 : c); rect(cx - 10, 122, cx + 10, 122, d_mezcla(c, D_K, 0.3)); }
  // la mantita de cuadros escoceses sobre el brazo derecho, con flecos
  for (let y = 112; y <= 146; y++) for (let x = 108; x <= 134; x++) { const borde = x - 108 + Math.sin(y * 0.4) * 1.5; if (borde < 0 || (y > 140 && x > 128)) continue; const cu = ((x >> 2) + (y >> 2)) & 1, rx = x % 8 < 2, ry = y % 8 < 2; pset(x, y, rx && ry ? hex('#f0e0b0') : rx || ry ? hex('#c8a040') : cu ? hex('#3a7a4a') : hex('#2a5a3a')); }
  for (let x = 110; x <= 128; x += 2) pset(x, 147, hex('#c8a040'));
  // el mando a distancia en el asiento
  rect(64, 130, 76, 133, D_K); rect(65, 131, 75, 132, hex('#3a3a4a')); pset(66, 131, hex('#e83a3a')); pset(69, 131, hex('#8a8aa8')); pset(71, 131, hex('#8a8aa8'));
  // LA LÁMPARA DE PIE a la derecha (pantalla marrón cónica, como en la tele de cerca), con su luz
  R.halo(303, 76, 26, [hex('#2e2430'), hex('#3a2e34'), hex('#4a3a38')], 1.0);
  rect(302, 74, 304, 156, hex('#2a2430')); rect(302, 74, 302, 156, hex('#5a5060')); rect(296, 156, 310, 158, D_K); rect(297, 156, 309, 156, hex('#4a4250'));
  poligono([[291, 74], [315, 74], [309, 58], [297, 58]], hex('#6a4a30')); poligono([[293, 73], [313, 73], [308, 60], [298, 60]], hex('#a87a48')); rect(293, 72, 313, 73, hex('#c89a60')); for (let x = 299; x < 309; x += 3) linea(x, 61, x - 1, 72, hex('#8e6438'));
  // EL MUEBLE DE LA TELE (el de la tele de cerca): tablero, dos puertas con tiradores dobles, el hueco con la consola y los cómics
  d_elipse(R, 213, 162, 82, 2, D_K, 0.45);
  rect(136, 133, 290, 161, hex('#2a1a12')); rect(138, 134, 288, 161, hex('#5a3a24')); rect(138, 134, 288, 135, hex('#8a6038'));
  for (let y = 137; y < 161; y++) for (let x = 139; x < 288; x++) if (h(x >> 2, y, 112) > 0.8) pset(x, y, hex('#4a2e1c'));
  for (const [x0, x1] of [[142, 184], [242, 284]]) { rect(x0, 139, x1, 160, hex('#2a1a12')); rect(x0 + 1, 140, x1 - 1, 160, hex('#4e3220')); rect(x0 + 1, 140, x1 - 1, 140, hex('#7a5232')); const m = Math.round((x0 + x1) / 2); rect(m, 140, m, 160, hex('#2a1a12'));
    for (const x of [m - 3, m + 2]) { rect(x, 146, x + 1, 151, hex('#c8a060')); pset(x, 146, hex('#f0d090')); }
    for (let y = 142; y < 159; y += 4) for (let x = x0 + 3; x < x1 - 2; x += 9) if (h(x, y, 113) < 0.4) rect(x, y, x + 4, y, hex('#44291a')); }
  rect(188, 139, 238, 160, hex('#140c08')); rect(188, 139, 238, 139, hex('#2a1a12'));
  rect(194, 143, 232, 149, hex('#0e0e12')); rect(194, 143, 232, 143, hex('#3a3a46')); for (let x = 197; x < 214; x += 3) pset(x, 146, hex('#4a4a56')); rect(222, 145, 228, 146, hex('#24242c'));
  rect(188, 150, 238, 151, hex('#5a3a24')); rect(188, 150, 238, 150, hex('#7a5232'));
  for (let i = 0; i < 11; i++) { const c = [hex('#a83a3a'), hex('#3a6aa8'), hex('#d8b040'), hex('#4a8a4a'), hex('#8a3ab0'), hex('#e0e0d0')][i % 6], hh = 6 + (i % 3 === 1 ? 1 : 0); rect(192 + i * 4, 160 - hh, 194 + i * 4, 159, c); rect(192 + i * 4, 160 - hh, 194 + i * 4, 160 - hh, d_mezcla(c, DG.blanco, 0.4)); rect(194 + i * 4, 160 - hh, 194 + i * 4, 159, d_mezcla(c, D_K, 0.35)); }
  rect(136, 161, 290, 161, hex('#1a100a'));
  // encima del mueble, a los lados de la tele: la planta en su maceta y las tres figuritas (roja, azul y verde)
  rect(136, 125, 144, 133, hex('#2a1a12')); rect(137, 125, 143, 133, hex('#6a3a2a')); rect(137, 125, 143, 126, hex('#9a5a3a'));
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.36, ex = Math.round(140 + Math.cos(a) * 8), ey = Math.round(125 + Math.sin(a) * 11); linea(140, 125, ex, ey, k % 2 ? hex('#2e5a3a') : hex('#4a7a4a')); pset(ex, ey, hex('#6a9a5a')); }
  for (const [x, c] of [[279, hex('#c83a3a')], [283, hex('#3a5ac8')], [287, hex('#2a8a3a')]]) { rect(x - 1, 127, x + 1, 133, D_K); rect(x, 128, x, 132, c); disco(x, 125, 2, D_K); disco(x, 125, 1, c); pset(x - 1, 124, d_mezcla(c, DG.blanco, 0.5)); }
  // LA TELE: el marco negro de canto fino con su brillo, el piloto y la peana
  rect(201, 129, 221, 134, hex('#16161c')); rect(191, 132, 231, 134, hex('#0c0c10')); rect(191, 132, 231, 132, hex('#3a3a46'));
  rect(145, 43, 277, 131, hex('#08080c')); rect(147, 45, 275, 129, hex('#16161c')); rect(147, 45, 275, 45, hex('#3a3a46')); rect(147, 45, 147, 129, hex('#2a2a34')); rect(150, 48, 272, 128, hex('#08080c'));
}
// la mesita baja de primer plano con palomitas y latas (capa suelta; se pega encima de los actores)
function d_mesitaCapa(R) {
  const { rect, pset, disco, poligono } = R;
  poligono([[168, 160], [272, 160], [278, 167], [162, 167]], D_K); poligono([[169, 161], [271, 161], [276, 166], [164, 166]], DG.m4);
  for (let x = 166; x < 276; x++) if (Math.sin(x * 0.3) > 0.85) pset(x, 163, DG.m3);
  rect(162, 167, 278, 170, DG.m2); rect(162, 167, 278, 167, DG.m5);
  for (const x of [166, 272]) { rect(x, 170, x + 3, 179, D_K); rect(x + 1, 170, x + 2, 179, DG.m2); }
  // el bol de palomitas y dos latas
  poligono([[190, 156], [214, 156], [210, 163], [194, 163]], D_K); poligono([[191, 157], [213, 157], [209, 162], [195, 162]], hex('#c83a3a'));
  for (let i = 0; i < 12; i++) { const x = 193 + Math.round(h(i, 1, 72) * 18), y = 152 + Math.round(h(i, 2, 72) * 4); disco(x, y, 2, DG.crema); pset(x - 1, y - 1, DG.blanco); }
  for (const [x, c] of [[232, hex('#c83a3a')], [244, hex('#3a6ac8')]]) { rect(x, 152, x + 6, 163, D_K); rect(x + 1, 153, x + 5, 163, c); rect(x + 1, 153, x + 5, 154, hex('#c8c8d0')); rect(x + 1, 153, x + 1, 163, d_mezcla(c, DG.blanco, 0.4)); }
}

// el calendario: el mes, las cifras de los días y las aspas rojas
function d_calendario(R, o) {
  const mes = o.mes ?? 12, ini = o.inicio ?? 2, tach = o.tachados ?? [], ndias = o.diasMes ?? 31;
  d_cifras(R, String(mes).padStart(2, '0'), 61, 51, DG.blanco);
  for (let d = 1; d <= ndias; d++) { const p = ini + d - 1, c = p % 7, f = Math.floor(p / 7); if (f > 4) continue; const x = 36 + c * 9, y = 58 + f * 7;
    const s = String(d); d_cifras(R, s, x + (s.length === 1 ? 3 : 0), y + 1, c === 0 ? hex('#c83a3a') : hex('#3a3a4a'));
    if (tach.includes(d)) { R.linea(x, y, x + 8, y + 6, hex('#e8202a')); R.linea(x + 8, y, x, y + 6, hex('#e8202a')); R.linea(x + 1, y, x + 8, y + 5, hex('#e8202a')); } }
}

// lo que sale en la tele si la escena no pinta nada: una montaña nevada al anochecer con un resplandor verde
function d_teleImagen(R, t, [x0, y0, x1, y1]) {
  const { pset, poligono, disco } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, d_tono([hex('#1a1e3a'), hex('#2a2a52'), hex('#4a3a6a'), hex('#7a4a7a'), hex('#c87a7a')], (y - y0) / (y1 - y0) * 4.2, x, y));
  for (let k = 0; k < 16; k++) { const x = x0 + Math.round(h(k, 1, 73) * (x1 - x0)), y = y0 + Math.round(h(k, 2, 73) * 30); if (Math.sin(t * 2 + k) > -0.2) pset(x, y, DG.blanco); }
  poligono([[x0, y1 - 8], [x0 + 34, y0 + 36], [x0 + 52, y0 + 46], [x0 + 70, y0 + 22], [x0 + 96, y0 + 50], [x1, y0 + 44], [x1, y1], [x0, y1]], hex('#2a2a46'));
  poligono([[x0 + 62, y0 + 32], [x0 + 70, y0 + 22], [x0 + 78, y0 + 32], [x0 + 72, y0 + 30], [x0 + 68, y0 + 34]], hex('#e8ecf8'));
  const g = 0.6 + 0.4 * Math.sin(t * 2.2); R.halo(x0 + 70, y0 + 52, Math.round(12 + g * 6), [hex('#1a5a3a'), hex('#2a8a5a'), hex('#3ae88a')], 1.2); disco(x0 + 70, y0 + 52, 3, hex('#c8f8d8'));
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) pset(x, y, d_mezcla(R.pget(x, y), D_K, 0.18));   // las líneas de barrido
}

// el salón con la tele (cámara 'tele'): la sala fija y la mesita, la imagen de la pantalla, el calendario, el reloj, la
// guirnalda, el gato y el resplandor; o.imagen(R, t, [x0, y0, x1, y1]) se pinta en un búfer propio SIN recorte (así un
// R.actor pintado en otro búfer dentro de la imagen se ve) y luego se copia solo el hueco de la pantalla
function d_tele(R, t, o) {
  d_capa(R, 'tele', () => { d_teleSala(R); d_pegar(R, d_suelta(R, 'mesita', () => d_mesitaCapa(R)), 160, 150, 280, 179); });
  const { pset, linea } = R, P = [151, 49, 271, 127];
  if (typeof o.imagen === 'function') {
    const M = R.__ddD || (R.__ddD = new Map()); let s = M.get('~teleImg'); if (!s) { s = R.nuevo(); M.set('~teleImg', s); }
    R.recorte(null); const prev = R.usar(s); s.fill(hex('#06060c')); o.imagen(R, t, P); R.recorte(null); R.usar(prev);
    const B = R.buf; for (let y = P[1]; y <= P[3]; y++) B.set(s.subarray(y * 320 + P[0], y * 320 + P[2] + 1), y * 320 + P[0]);
  } else { R.recorte(P); d_teleImagen(R, t, P); R.recorte(null); }
  // el reflejo de la ventana en el cristal (dos franjas en diagonal, como en la tele de cerca) y los pilotos
  for (let y = P[1]; y <= P[3]; y++) for (let x = P[0]; x <= P[2]; x++) { const d = (x - P[0]) + (y - P[1]) * 0.8; if (((d > 92 && d < 102) || (d > 107 && d < 110)) && D_BAY[(y & 3) * 4 + (x & 3)] < 5) pset(x, y, d_mezcla(R.pget(x, y), DG.blanco, 0.16)); }
  pset(272, 129, Math.sin(t * 1.5) > 0 ? hex('#3ae84a') : hex('#1a6a2a')); pset(229, 145, Math.sin(t * 2.3) > 0 ? hex('#3a8ae8') : hex('#1a3a6a'));
  d_calendario(R, o);
  // las agujas del reloj de pared y la guirnalda de lucecitas que parpadean
  { const am = t * 0.1 - Math.PI / 2, ah = t * 0.008 + 1.2; linea(118, 50, Math.round(118 + Math.cos(am) * 5), Math.round(50 + Math.sin(am) * 5), D_K); linea(118, 50, Math.round(118 + Math.cos(ah) * 3), Math.round(50 + Math.sin(ah) * 3), D_K); const as = t * 1.05; pset(Math.round(118 + Math.cos(as) * 6), Math.round(50 + Math.sin(as) * 6), DG.rojo); }
  for (let x = 140; x <= 272; x++) { const y = 28 + Math.round(Math.abs(Math.sin((x - 140) / 33 * Math.PI)) * 6); pset(x, y, hex('#2a3a2a')); if ((x - 140) % 8 === 4) { const k = (x - 140) >> 3, on = Math.sin(t * 2.5 + k * 1.7) > -0.2, c = [hex('#f8d84a'), hex('#e84a4a'), hex('#4ae88a'), hex('#4a9ae8')][k % 4]; pset(x, y + 1, on ? c : d_mezcla(c, D_K, 0.6)); pset(x, y + 2, on ? c : d_mezcla(c, D_K, 0.6)); if (on) { pset(x - 1, y + 2, d_mezcla(R.pget(x - 1, y + 2), c, 0.4)); pset(x + 1, y + 2, d_mezcla(R.pget(x + 1, y + 2), c, 0.4)); } } }
  // el gato que duerme en el respaldo del sofá, la lámpara que tiembla un poco y el resplandor de la tele que cambia
  d_gatoDuerme(R, 80, 101, t, hex('#5a5a66'), hex('#3a3a46'));
  if (Math.sin(t * 13) * Math.sin(t * 3.1) > 0.9) for (let x = 298; x <= 308; x++) pset(x, 73, hex('#f0c880'));
  const fl = 0.07 + 0.05 * Math.sin(t * 5.3) * Math.sin(t * 1.7); for (let y = 100; y <= 128; y += 2) for (let x = 136 + (y & 2); x <= 144; x += 4) pset(x, y, d_mezcla(R.pget(x, y), hex('#8ab8e8'), fl * 3));
}
// el corcho de cerca (fijo): marco, corcho con la luz, polaroids vacías, recuadro a rotulador, notas, recorte, billete
function d_corchoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  d_papelPintado(R, 0, 0, 319, 179, 140, 60, 0.7, 0, 0, 9);
  rect(8, 20, 274, 178, D_K); for (let y = 21; y <= 177; y++) for (let x = 9; x <= 273; x++) { const b = Math.min(x - 9, 273 - x, y - 21, 177 - y); if (b > 5) continue; pset(x, y, d_tono(D_MAD, 3.5 + (b === 0 ? 2 : b === 5 ? -2 : 0) + (x - 9 < 6 || y - 21 < 6 ? 0.8 : -0.4) + (Math.sin(x * 0.4 + y * 0.4) > 0.8 ? -0.5 : 0), x, y)); }
  for (let y = 27; y <= 171; y++) for (let x = 15; x <= 267; x++) { const n = h(x, y, 74), g = 1 - Math.hypot(x - 110, y - 60) / 240; pset(x, y, d_tono([DG.corD, DG.corS, DG.cor, DG.corL, hex('#dcb47c')], 1.2 + g * 2 + (n < 0.1 ? -1.2 : n > 0.92 ? 1 : (n - 0.5) * 0.8), x, y)); }
  for (let x = 15; x <= 267; x++) pset(x, 27, D_K); for (let y = 27; y <= 171; y++) pset(15, y, D_K);
  // las tres polaroids (marco blanco con la franja de abajo, sombra, el hueco oscuro) y el recuadro vacío a rotulador
  const pol = (a, b, c, d, gir) => { rect(a - 2, b - 2, c + 4, d + 14, DG.corD); rect(a - 4, b - 4, c + 4, d + 12, DG.foto); rect(a - 4, d + 4, c + 4, d + 12, hex('#ece6d6')); rect(a - 4, b - 4, c + 4, b - 4, DG.blanco); rect(c + 4, b - 4, c + 4, d + 12, DG.fotoS); rect(a - 4, d + 12, c + 4, d + 12, DG.fotoS);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) pset(x, y, d_tono([hex('#1a1e2e'), hex('#262a3e'), hex('#343a52')], 1 + (y - b) / (d - b) * 0.8 + (h(x >> 2, y >> 2, 75 + gir) - 0.5) * 0.6, x, y));
    for (let i = 0; i < 6; i++) rect(a + 6 + i * 7, d + 7, a + 9 + i * 7 + (i % 2), d + 7, hex('#7a7a8a')); };
  pol(30, 42, 86, 90, 0); pol(104, 36, 160, 84, 1); pol(178, 44, 234, 92, 2);
  for (let x = 104; x <= 184; x++) { if (Math.floor(x / 4) % 2 === 0) { pset(x, 110, D_K); pset(x, 111, D_K); pset(x, 162, D_K); pset(x, 163, D_K); } } for (let y = 110; y <= 163; y++) { if (Math.floor(y / 4) % 2 === 0) { pset(104, y, D_K); pset(105, y, D_K); pset(184, y, D_K); pset(185, y, D_K); } }
  R.icono('?', 130, 116, hex('#1a1a2a'), null, 6);
  // las notas, el recorte de periódico, el billete y el boceto de la máscara
  rect(20, 108, 54, 140, D_K); rect(21, 109, 53, 139, DG.nota); rect(21, 136, 53, 139, hex('#d8c050')); for (let y = 114; y < 134; y += 4) linea(24, y, 24 + Math.round(18 + h(y, 1, 76) * 8), y + (y % 3 === 0 ? 1 : 0), hex('#5a4a2a'));
  rect(58, 110, 96, 152, hex('#d8d4c8')); rect(59, 111, 95, 151, hex('#e8e4d8')); rect(61, 113, 93, 118, hex('#4a4a56')); rect(61, 121, 76, 138, hex('#8a8a96')); for (let y = 121; y < 150; y += 2) rect(79, y, 79 + Math.round(8 + h(y, 2, 76) * 6), y, hex('#9a9aa6')); for (let y = 141; y < 150; y += 2) rect(61, y, 61 + Math.round(9 + h(y, 3, 76) * 6), y, hex('#9a9aa6'));
  rect(20, 146, 54, 166, D_K); rect(21, 147, 53, 165, hex('#f0e0c8')); rect(21, 147, 27, 165, hex('#e04a3a')); for (let y = 147; y <= 165; y += 2) pset(28, y, hex('#c8b8a0')); d_cifras(R, '12', 31, 150, hex('#3a3a4a'), 1); d_cifras(R, '18', 31, 157, hex('#e04a3a'), 1); d_cifras(R, '26', 41, 150, hex('#3a3a4a'), 1);
  rect(194, 104, 262, 166, D_K); rect(195, 105, 261, 165, DG.blanco); for (let y = 108; y < 165; y += 4) rect(196, y, 260, y, hex('#c8d8e8')); rect(200, 105, 200, 165, hex('#e8a0a0'));
  { const cx = 226, cy = 132; disco(cx, cy, 17, hex('#3a3a46')); disco(cx, cy, 16, hex('#9a9eaa')); disco(cx - 4, cy - 5, 9, hex('#b8bcc8')); rect(cx - 10, cy - 4, cx - 3, cy - 2, D_K); rect(cx + 3, cy - 4, cx + 10, cy - 2, D_K); rect(cx - 6, cy + 7, cx + 6, cy + 9, D_K); for (let x = cx - 5; x <= cx + 5; x += 2) pset(x, cy + 8, hex('#9a9eaa')); rect(cx - 1, cy - 10, cx + 1, cy + 4, hex('#7a7e8a'));
    for (const [a, b] of [[-12, -10], [12, -10], [-13, 6], [13, 6], [0, -14]]) disco(cx + a, cy + b, 1, hex('#5a5e6a')); linea(cx + 18, cy - 14, cx + 26, cy - 22, DG.rojo); linea(cx + 18, cy - 13, cx + 26, cy - 21, DG.rojo); R.icono('?', 248, 108, DG.rojo, null, 1); }
  rect(240, 40, 264, 64, hex('#c88aa0')); rect(240, 40, 264, 41, hex('#e8b0c0')); R.icono('?', 248, 44, D_K, null, 2);
  rect(200, 168, 236, 171, hex('#c8c0a8'));
  // a la derecha, la pared tranquila con el interruptor
  rect(292, 96, 302, 112, hex('#3a3e5a')); rect(293, 97, 301, 111, hex('#d8d4c8')); rect(296, 101, 298, 107, hex('#a8a498')); rect(296, 101, 298, 103, hex('#f0ece0'));
}

// lo vivo del corcho: la luz que se mece, la ficha que se levanta y el carrete de hilo
function d_corchoCerca(R, t, o) {
  d_capa(R, 'corcho', () => d_corchoFijo(R));
  const { rect, pset, linea, disco } = R;
  // la ficha azul que levanta la corriente
  const a = Math.max(0, Math.sin(t * 1.3) * 0.7 + Math.sin(t * 3.7) * 0.3);
  rect(140, 92, 170, 104, DG.corD); rect(138, 90, 168, 102, DG.notaA); for (let y = 93; y < 101; y += 3) rect(141, y, 141 + Math.round(12 + h(y, 4, 77) * 10), y, hex('#3a5a7a'));
  const lev = Math.round(a * 5); for (let i = 0; i <= lev; i++) rect(168 - lev + i, 102 - i, 168 - lev + i, 102 - i + 1, i === lev ? hex('#5a8aa8') : hex('#c8e8f8'));
  // el carrete de hilo rojo que cuelga de un clavo y se mece
  { const sw = Math.sin(t * 1.6) * 3, cx = Math.round(298 + sw), cy = 72; linea(298, 52, cx, cy - 4, DG.hilo); disco(298, 51, 1, hex('#c8c8d0')); rect(cx - 4, cy - 4, cx + 4, cy - 3, DG.m4); rect(cx - 4, cy + 4, cx + 4, cy + 5, DG.m4); rect(cx - 3, cy - 2, cx + 3, cy + 3, DG.hilo); for (let y = cy - 2; y <= cy + 3; y += 2) rect(cx - 3, y, cx + 3, y, hex('#a01a2a')); }
  // la luz cálida del flexo que se mece sobre el corcho
  const lx = Math.round(110 + Math.sin(t * 0.5) * 8); for (let y = 30; y <= 168; y += 1) for (let x = lx - 70 + (y & 1); x <= lx + 70; x += 2) { const g = 1 - Math.hypot(x - lx, (y - 70) * 1.2) / 80; if (g > 0) pset(x, y, d_mezcla(R.pget(x, y), DG.calidoL, g * 0.12)); }
  d_corchoHilos(R, t);
}

// las chinchetas y los hilos rojos del corcho de cerca (van por encima de lo que la escena pinte en las fotos)
function d_corchoHilos(R, t) {
  const { pset, disco, rect } = R;
  const P = [[58, 36], [132, 30], [206, 38], [144, 106], [37, 106], [77, 108], [37, 144], [228, 102], [252, 38], [153, 88]];
  const hilo = (a, b, caida) => { const [ax, ay] = P[a], [bx, by] = P[b], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)); for (let s = 0; s <= n; s++) { const u = s / n, x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u + Math.sin(u * Math.PI) * caida); pset(x, y, DG.hilo); pset(x, y + 1, hex('#7a1a22')); } };
  hilo(0, 1, 5); hilo(1, 2, 5); hilo(1, 3, 3); hilo(0, 4, 2); hilo(2, 7, 3); hilo(3, 7, 3); hilo(4, 6, 1);
  P.forEach(([x, y], i) => { const c = i % 4 === 3 ? hex('#3a8ae8') : i % 4 === 2 ? hex('#f0c030') : DG.pin; pset(x + 2, y + 2, hex('#4a2e1a')); pset(x + 1, y + 2, hex('#4a2e1a')); disco(x, y, 2, D_K); disco(x, y, 1, c); rect(x - 1, y - 1, x, y - 1, d_mezcla(c, DG.blanco, 0.6)); });
  // los trozos de celo de las esquinas de las fotos
  for (const [x, y] of [[24, 86], [88, 86], [98, 32], [162, 78], [172, 96], [236, 40]]) for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) { const c = R.pget(x + i - j, y + j); if (c) pset(x + i - j, y + j, d_mezcla(c, hex('#f8f4e0'), 0.45)); }
}

// la mesa desde arriba (fijo): tablas, canto, teclado, ratón, hoja con firmas, cubo de palomitas, taza, cómic, pósit
function d_escritorioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y <= 179; y++) for (let x = 0; x <= 319; x++) { const tabla = Math.floor((y + 4) / 30), j = (y + 4) % 30, calma = Math.max(0, 1 - Math.hypot(Math.max(0, x - 250), Math.max(0, 50 - y)) / 60) * 0 + ((x > 270 && y < 50) ? 0.7 : 0) + ((x > 20 && x < 175 && y < 22) ? 0.5 : 0);
    const veta = Math.sin(x * 0.045 + Math.sin(x * 0.013 + tabla * 2) * 3 + j * 0.42 + tabla * 5) > 0.82 ? -0.8 * (1 - calma) : 0;
    let v = 3.3 + veta + (h(x >> 3, y, 78 + tabla) - 0.5) * 0.5 * (1 - calma) + (j === 0 ? -2 : j === 1 ? 0.8 : 0) - Math.hypot(x - 170, y - 100) / 260;
    const g = 1 - Math.hypot(x - 190, (y - 100) * 1.2) / 140; if (g > 0) v += g * 1.4; pset(x, y, d_tono(D_MAD, v, x, y)); }
  rect(0, 172, 319, 179, DG.m1); rect(0, 172, 319, 172, DG.m5); rect(0, 173, 319, 173, DG.m3);
  // el teclado
  d_elipse(R, 97, 152, 58, 3, D_K, 0.4);
  rect(40, 112, 152, 150, D_K); rect(41, 113, 151, 149, hex('#2a2c3a')); rect(41, 113, 151, 113, hex('#4a4c5e'));
  for (let f = 0; f < 5; f++) for (let c = 0; c < 14; c++) { const x = 44 + c * 7 + (f % 2) * 2, y = 116 + f * 6; if (x > 145) continue; const w = f === 4 && c === 4 ? 30 : 5; if (f === 4 && c > 4 && c < 9) continue; rect(x, y, x + w, y + 4, hex('#1a1c26')); rect(x, y, x + w - 1, y + 3, hex('#d8d8e2')); rect(x, y, x + w - 1, y, DG.blanco); rect(x + w - 1, y + 1, x + w - 1, y + 3, hex('#a8a8b8')); if (h(f, c, 79) < 0.15) pset(x + 2, y + 2, hex('#7a7a8a')); }
  // el ratón con su cable
  d_elipse(R, 176, 144, 8, 3, D_K, 0.4); disco(174, 137, 7, D_K); rect(167, 137, 181, 146, D_K); disco(174, 137, 6, hex('#d8d8e0')); rect(168, 137, 180, 145, hex('#d8d8e0')); rect(168, 137, 168, 145, DG.blanco); rect(174, 131, 174, 137, hex('#8a8a96')); rect(173, 133, 175, 135, hex('#5a5a66'));
  for (let i = 0; i < 70; i++) pset(174 + Math.round(Math.sin(i * 0.08) * 12), 130 - i, hex('#2a2a32'));
  // LA HOJA con renglones y dos firmas, y su sombra
  poligono([[190, 72], [246, 68], [250, 138], [194, 142]], D_K); poligono([[188, 70], [244, 66], [248, 136], [192, 140]], hex('#8a7a62'));
  poligono([[187, 68], [243, 64], [247, 134], [191, 138]], DG.blanco);
  for (let k = 0; k < 9; k++) { const y = 74 + k * 5; linea(194, y + 1, 238 - (k % 3) * 6, y - 2, hex('#8a8a9a')); }
  for (const [x, y] of [[198, 124], [222, 122]]) { for (let i = 0; i < 18; i++) pset(x + i, y + Math.round(Math.sin(i * 1.3) * 2 + Math.sin(i * 0.4) * 1), hex('#2a4ab8')); linea(x - 1, y + 4, x + 18, y + 3, hex('#8a8a9a')); }
  disco(236, 76, 4, hex('#c83a3a')); disco(236, 76, 2, hex('#e86a5a'));
  // EL CUBO DE PALOMITAS desde arriba
  disco(60, 64, 23, D_K); for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j); if (d > 22 || d < 18) continue; const a = Math.atan2(j, i); pset(60 + i, 64 + j, Math.floor((a + Math.PI) / (Math.PI / 8)) % 2 ? DG.rojo : DG.blanco); }
  disco(60, 64, 18, hex('#c89040')); for (let i = 0; i < 70; i++) { const a = h(i, 1, 80) * Math.PI * 2, r = Math.sqrt(h(i, 2, 80)) * 16, x = Math.round(60 + Math.cos(a) * r), y = Math.round(64 + Math.sin(a) * r); disco(x, y, 2, DG.crema); pset(x - 1, y - 1, DG.blanco); pset(x + 1, y + 1, hex('#e0b860')); }
  // LA TAZA desde arriba (el café, el asa)
  d_elipse(R, 134, 56, 12, 11, D_K, 0.35); disco(130, 52, 11, D_K); disco(130, 52, 10, hex('#3a8ac8')); disco(130, 52, 8, hex('#2a1408')); disco(128, 50, 3, hex('#4a2a14')); rect(140, 49, 145, 55, D_K); rect(141, 50, 144, 54, hex('#3a8ac8')); rect(142, 51, 143, 53, D_K);
  // el cómic cerrado (portada con una explosión de colores y un «1»)
  rect(236, 52, 270, 98, D_K); rect(237, 53, 269, 97, hex('#e8c040')); rect(237, 53, 269, 62, hex('#c83a3a')); rect(259, 54, 268, 61, DG.blanco); d_cifras(R, '1', 263, 55, D_K);
  poligono([[253, 66], [257, 76], [267, 74], [259, 82], [265, 92], [253, 86], [243, 94], [247, 82], [239, 74], [249, 76]], hex('#3a6ac8')); disco(253, 80, 4, hex('#7a7e86')); rect(250, 79, 251, 79, D_K); rect(255, 79, 256, 79, D_K);
  // bolígrafos, pósit y clip
  linea(160, 36, 196, 48, D_K); linea(160, 37, 196, 49, hex('#2a4ab8')); linea(160, 35, 195, 47, hex('#6a8ae8')); rect(160, 35, 162, 37, hex('#c8c8d0'));
  rect(210, 20, 230, 40, hex('#f0d860')); rect(210, 38, 230, 40, hex('#c8b040')); for (let y = 24; y < 36; y += 3) rect(212, y, 212 + Math.round(8 + h(y, 5, 81) * 8), y, hex('#6a5a2a'));
  linea(120, 160, 128, 160, hex('#c8c8d0')); linea(120, 163, 128, 163, hex('#c8c8d0')); linea(120, 160, 120, 163, hex('#c8c8d0')); linea(128, 160, 128, 163, hex('#c8c8d0'));
  // una bola de papel arrugado, palomitas caídas, un posavasos y el cargador del móvil
  disco(196, 156, 6, D_K); disco(196, 156, 5, hex('#e8e4d8')); for (const [a, b, c, d] of [[192, 153, 197, 157], [195, 160, 200, 154], [193, 158, 196, 152]]) linea(a, b, c, d, hex('#a8a498'));
  for (let i = 0; i < 9; i++) { const x = 20 + Math.round(h(i, 1, 82) * 140), y = 90 + Math.round(h(i, 2, 82) * 16); disco(x, y, 1, DG.crema); pset(x, y, DG.crema); pset(x - 1, y - 1, DG.blanco); }
  disco(100, 52, 13, D_K); disco(100, 52, 12, hex('#8a5a3a')); R.anillo(100, 52, 9, hex('#6a4028'));
  for (let i = 0; i < 90; i++) pset(274 + Math.round(Math.sin(i * 0.07) * 14) + Math.round(i * 0.25), 164 + Math.round(i * 0.1) - (i > 60 ? (i - 60) : 0), hex('#e8e8f0'));
  // el móvil (la carcasa; la pantalla y la vibración van aparte)
  d_elipse(R, 278, 146, 16, 22, D_K, 0.3);
}

function d_escritorio(R, t, o) {
  d_capa(R, 'escritorio', () => d_escritorioFijo(R));
  const { rect, pset, linea } = R;
  // el móvil que vibra a golpes: tiembla, se le encienden los avisos y salen las rayitas de la vibración
  const ciclo = t % 3.2, f = o.vibra ?? (ciclo < 1.1 ? 1 : 0), dx = f > 0.3 ? (Math.floor(t * 30) % 2 ? 1 : -1) : 0, x0 = 262 + dx, y0 = 122;
  rect(x0, y0, x0 + 24, y0 + 40, D_K); rect(x0 + 1, y0 + 1, x0 + 23, y0 + 39, hex('#2a2a36')); rect(x0 + 3, y0 + 4, x0 + 21, y0 + 34, f > 0.3 ? hex('#3a5a9a') : hex('#1a2a4a'));
  if (f > 0.3) { R.icono('reloj', x0 + 9, y0 + 8, DG.blanco, null); for (let k = 0; k < 3; k++) { rect(x0 + 5, y0 + 18 + k * 5, x0 + 19, y0 + 21 + k * 5, hex('#e8ecf8')); rect(x0 + 6, y0 + 19 + k * 5, x0 + 8, y0 + 20 + k * 5, [hex('#e83a3a'), hex('#3ae88a'), hex('#e8b83a')][k]); rect(x0 + 10, y0 + 19 + k * 5, x0 + 17, y0 + 19 + k * 5, hex('#8a8a9a')); }
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const xx = s < 0 ? x0 - 3 - k * 2 : x0 + 27 + k * 2; if (Math.floor(t * 12 + k) % 2) linea(xx, y0 + 8 + k * 3, xx, y0 + 30 - k * 3, hex('#f8f0d0')); } }
  rect(x0 + 10, y0 + 36, x0 + 14, y0 + 37, hex('#5a5a6a'));
  // el vapor de la taza, que sube visto desde arriba (volutas)
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1), r = 2 + u * 9, a0 = t * 2 + k * 1.6; for (let i = 0; i < 10; i++) { const a = a0 + i * 0.35; if (u > 0.8 && i % 2) continue; pset(Math.round(130 + Math.cos(a) * r), Math.round(52 - u * 16 + Math.sin(a) * r * 0.5), u < 0.5 ? hex('#e8e8f0') : hex('#b8b0a8')); } }
  // una mosca que pasea por la mesa
  { const a = t * 0.7, mx = Math.round(110 + Math.cos(a) * 30 + Math.sin(a * 2.3) * 8), my = Math.round(96 + Math.sin(a * 1.3) * 10); pset(mx, my, D_K); pset(mx + 1, my, D_K); if (Math.floor(t * 20) % 2) { pset(mx, my - 1, hex('#c8d8e8')); pset(mx + 1, my - 1, hex('#c8d8e8')); } }
}

// o.encuadre (y o.camara). Todo dentro de UNA VIÑETA de cómic viejo: margen de papel amarillento con fibras, MARCO NEGRO
// GRUESO (3 px) y la esquina de Atom fuera de la viñeta (un escalón de papel en x ≥ 270, y ≤ 50). Dentro, colores planos
// envejecidos, cada mancha con su CONTORNO DE TINTA, sombras RAYADAS en diagonal y la TRAMA DE PUNTOS de imprenta (Ben-Day)
// por todo, con degradados de puntos en los cielos: se distingue a la primera de la película. LLAMA A comicDelante DESPUÉS
// DE LOS ACTORES, con las mismas opciones y el mismo t: vuelve a pintar el margen y el marco, y amarillea y trama lo que
// se haya pintado encima (actores incluidos), para que parezcan impresos. Viñeta: x 9–310, y 8–171 (menos el escalón).
//   'fragua' (general): UN MONASTERIO EN LAS MONTAÑAS DEL TÍBET: cielo tramado con nubes que pasan, dos cordilleras
//     nevadas, el monasterio encalado con su franja granate, ventanas negras en trapecio, el remate dorado, la puerta roja y
//     los molinillos de oración que giran; las banderitas de oración (sin letras) que ondean; el patio de losas; LA FRAGUA de
//     piedra con su campana y su chimenea humeante, las brasas que laten, chispas, el fuelle que sopla, herramientas
//     colgadas, el tonel de agua con vapor, la leña y EL YUNQUE sobre su tocón; un cuervo en el tejado y copos que caen.
//     o.mascara 0–1: de 0 a 0.5 la máscara al rojo en las brasas; desde 0.5, en el yunque, enfriándose del rojo vivo al
//     acero gris (primero solo queda al rojo el filo; nunca un tono de piel) y humeando, con una estrella «!» al caer (la escena pone a los monjes y a Doom joven). Suelo 150, libre
//     [40, 240]; yunque [169, 128] (la cara de arriba), fragua [221, 104], puerta [67, 132].
//     Cámara 'vapor': INSERTO: un abanico de rayos naranja y amarillo detrás, LA MÁSCARA DE HIERRO grande (remaches,
//     ranuras de ojos y boca) sujeta por unas tenazas que entran desde abajo, sobre el yunque (con su martillo), con el
//     filo al rojo (o.calor 0–1, por omisión 0.6 y bajando con t); el tonel de templar que humea; una viñeta pequeña
//     (x 14–84, y 24–106) con la fragua donde Victor, chibi y encapuchado (sin cara), levanta la máscara con las tenazas
//     hacia la capucha a medida que se enfría; y una estrella «!». Suelo 180, libre [0, 0], mascara [166, 96].
//   'latveria': EL CASTILLO DE DOOM: muro de sillares, columnas con capiteles y antorchas, dos vidrieras ojivales con su
//     luz, dos estandartes verdes con la máscara (sin letras), el trono en su estrado, la alfombra roja larga sobre un suelo
//     ajedrezado en perspectiva, dos candelabros con velas que tiemblan y dos guardias-robot pequeños con ojos que se
//     encienden. o.boda 1: arco de flores blancas y rosas, guirnaldas, el altar con mantel, velas y flores, pétalos que caen
//     (la escena pone a Wanda con velo y a Doom). Suelo 160, libre [40, 280]; altar [160, 132], trono [160, 100].
//     Cámara 'cuna': UNA HABITACIÓN DE HOSPITAL de los 2000: pared verde menta tramada con su zócalo rayado, suelo de
//     linóleo, la puerta con su cristal (pasa una enfermera), la ventana con persiana y ciudad, el reloj, el monitor con su
//     línea que late, el gotero, la cama, flores en la ventana y LA CUNA de hospital (cubeta transparente en su carrito) con
//     la bebé hecha un bultito rosa que respira (sin cara: la mantita y un mechón), la CINTA rosa con flores y un globo de
//     corazón que se mece. Doom se inclina sobre la cuna (lo pone la escena). Suelo 160, libre [40, 250]; cuna [160, 124].
//   'mundo': EL PLANETA HECHO DE TROZOS (Secret Wars, 2015): espacio tramado con estrellas que titilan y una nebulosa, y el
//     casquete de un planeta enorme hecho de parches (selva, hielo, ciudad, desierto, mar, cristal) con COSTURAS DE LUZ que
//     laten (o.cose 0–1, por omisión 1: cuánta costura se ve) y su atmósfera. o.choque 0–1: tres burbujas de universos que
//     se acercan (0–0.6), chocan con una estrella (0.6–0.75) y se rompen en cristales que salen volando (0.75–1). o.trono 1:
//     en lo alto, un trono enorme con rayos detrás. Suelo 160, libre [40, 280]; trono [160, 96] (donde pisa quien se sienta).
//     Cámara 'arena': EL PLANETA DE 1984 desde su superficie: cielo rosa y morado tramado con un planeta anillado, lunas y
//     un cometa, mesetas y agujas de roca morada rayadas, suelo agrietado con cráteres, plantas raras que se mecen. o.luz
//     0–1: una columna de luz blanca baja del cielo, se posa (0.5) y se apaga dejando chispas; o.poder 0–1: la luz se
//     tuerce hacia doom y lo envuelve. Suelo 158, libre [20, 290]; luz [160, 150] (donde se posa), doom [220, 158].
const DC = pal({
  tinta: '#141018', papel: '#f0e4c0', papelS: '#dccb9c', blanco: '#f6eed6',
  cielo: '#a4cec4', cieloS: '#80b2ae', nube: '#f6eed6', nubeS: '#c8cec0', monte: '#9a9cbc', monteS: '#727496', nieve: '#f4eedc', nieveS: '#aab6cc',
  colina: '#8aa070', colinaS: '#667c56', cal: '#efe2c4', calS: '#cdbc98', granate: '#8a2e2e', granateS: '#5e1e22',
  rojo: '#cc4a3a', rojoS: '#8e2e28', oro: '#e8b848', oroS: '#b0802a', azul: '#4270aa', azulS: '#2c4c7c', verde: '#5a8a48', verdeS: '#3a5e34',
  morado: '#7c4a8e', moradoS: '#52305e', gris: '#9c968a', grisS: '#6c665c', piedra: '#b8aa8a', piedraS: '#887a62', marron: '#8e5c3a', marronS: '#5c3a26',
  hierro: '#7c8088', hierroS: '#4c5058', naranja: '#ea7a3a', amarillo: '#f2d454', fuego: '#f8a632', cian: '#86c4d0', cianS: '#5a9aaa', rosa: '#e89caa', rosaS: '#c0707e',
  menta: '#bcd6b2', mentaS: '#8eb298', crema: '#f2e2b2', espacio: '#1e2448', espacioL: '#34407a', lila: '#b69cca', lilaS: '#8c6eaa', purpura: '#5c3c7c', purpuraS: '#3c2654',
  arena: '#e8c87c', arenaS: '#c49e5c', muro: '#8c9a88', muroS: '#66745e', losa: '#cabe9e', losaS: '#9a8e74', tela: '#6e4c3a', telaS: '#4a3226', rosado: '#d88aa8', rosadoS: '#b46c96',
  suelo: '#8c6c8a', sueloS: '#6a4c6a', mar: '#4a7ab8', marS: '#36609a',
});
// las familias de color: entre dos tonos de la misma familia no se entinta el borde (luz y sombra de una misma cosa)
const D_FAM = new Map(); [['cielo', 'cieloS'], ['nube', 'nubeS'], ['monte', 'monteS'], ['nieve', 'nieveS'], ['colina', 'colinaS'], ['cal', 'calS'], ['granate', 'granateS'], ['rojo', 'rojoS'], ['oro', 'oroS'], ['azul', 'azulS'], ['verde', 'verdeS'], ['morado', 'moradoS'], ['gris', 'grisS'], ['piedra', 'piedraS'], ['marron', 'marronS'], ['hierro', 'hierroS'], ['cian', 'cianS'], ['rosa', 'rosaS'], ['menta', 'mentaS'], ['espacio', 'espacioL'], ['lila', 'lilaS'], ['purpura', 'purpuraS'], ['arena', 'arenaS'], ['muro', 'muroS'], ['losa', 'losaS'], ['tela', 'telaS'], ['rosado', 'rosadoS'], ['suelo', 'sueloS'], ['mar', 'marS'], ['papel', 'papelS']].forEach((f, i) => f.forEach((k) => D_FAM.set(DC[k], i + 1)));

// los tonos de sombra que se rayan en diagonal
const D_RAYA = new Set(['monteS', 'colinaS', 'calS', 'piedraS', 'muroS', 'losaS', 'lilaS', 'purpuraS', 'sueloS', 'mentaS', 'telaS', 'grisS', 'verdeS', 'arenaS'].map((k) => DC[k]));

// dentro de la viñeta (con m > 0, la viñeta crecida m píxeles: el marco)
const d_dentro = (x, y, m = 0) => x >= 9 - m && x <= 310 + m && y >= 8 - m && y <= 171 + m && !(x >= 270 + m && y <= 50 - m);

const d_lum = (c) => (c & 255) * 0.3 + ((c >>> 8) & 255) * 0.59 + ((c >>> 16) & 255) * 0.11;

// el contorno de tinta: donde cambian dos colores de distinta familia (y con contraste), una raya de 1 px
function d_entintar(R) {
  const src = new Uint32Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) src[y * 320 + x] = R.pget(x, y);
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) { if (!d_dentro(x, y)) continue; const i = y * 320 + x, c = src[i]; if (c === DC.tinta) continue;
    for (const j of [i + 1, i + 320]) { const d = src[j]; if (d === c || d === DC.tinta) continue; const fa = D_FAM.get(c), fb = D_FAM.get(d); if (fa && fa === fb) continue; if (Math.abs(d_lum(c) - d_lum(d)) < 14) continue; R.pset(x, y, DC.tinta); break; } }
}

// la imprenta: raya las sombras, amarillea el color y pone la trama de puntos (solo dentro de la viñeta); con b, solo donde
// la pantalla ya no es la del búfer b (lo que se ha pintado encima)
function d_imprenta(R, b = null, rayar = true) {
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) { if (!d_dentro(x, y)) continue; let c = R.pget(x, y); if (b && b[y * 320 + x] === c) continue; if (c === DC.tinta) continue;
    if (rayar && D_RAYA.has(c) && (x + y) % 3 === 0) { R.pset(x, y, d_mezcla(c, DC.tinta, 0.5)); continue; }
    c = d_mezcla(c, DC.papel, 0.12); if ((y & 1) === 0 && (x + ((y >> 1) & 1) * 2) % 4 === 0) c = d_mezcla(c, DC.tinta, d_lum(c) > 200 ? 0.1 : 0.2); R.pset(x, y, c); }
}

// el margen de papel (con fibras y amarillo en los bordes) y el marco negro grueso
function d_marco(R) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (d_dentro(x, y)) continue; if (d_dentro(x, y, 3)) { R.pset(x, y, DC.tinta); continue; }
    const borde = Math.min(x, 319 - x, y, 179 - y), n = h(x, y, 90); R.pset(x, y, borde < 2 ? DC.papelS : n < 0.05 ? DC.papelS : n > 0.985 ? hex('#c8b488') : DC.papel); }
}

// una viñeta fija: pinta las manchas planas, entinta, añade lo que va sin contorno, imprime y enmarca
function d_vineta(R, clave, pinta, despues) { return d_capa(R, clave, () => { pinta(); d_entintar(R); if (despues) despues(); d_imprenta(R); d_marco(R); }); }

// un polígono plano con su contorno de tinta (para lo que se mueve)
function d_poliT(R, pts, c) { R.poligono(pts, c); for (let i = 0; i < pts.length; i++) { const [a, b] = pts[i], [x, y] = pts[(i + 1) % pts.length]; R.linea(Math.round(a), Math.round(b), Math.round(x), Math.round(y), DC.tinta); } }

// un disco plano con contorno
function d_discoT(R, x, y, r, c) { R.disco(x, y, r + 1, DC.tinta); R.disco(x, y, r, c); }

// una nube de cómic: bolas con contorno, sombra abajo y luz
function d_nubeC(R, cx, cy, w, c = DC.nube, cs = DC.nubeS) { const r = Math.max(2, w * 0.28), B = [[-w * 0.38, 1, r * 0.8], [-w * 0.1, -2, r], [w * 0.2, -1, r * 0.9], [w * 0.42, 1.5, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(rr) + 1, DC.tinta); for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(rr), cs); for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 1), Math.max(1, Math.round(rr) - 1), c); }

// una estrella de onomatopeya (sin letras): puntas alternas, contorno y un «!» dentro
function d_estalla(R, cx, cy, r, c1 = DC.amarillo, c2 = DC.rojo, rot = 0, signo = '!') {
  const P = (k) => { const pts = []; for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2 + rot, rr = (i % 2 ? r * 0.58 : r) + k; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return pts; };
  R.poligono(P(2), DC.tinta); R.poligono(P(0), c2); const q = P(-4).map(([x, y]) => [cx + (x - cx) * 0.8, cy + (y - cy) * 0.8]); R.poligono(q, c1);
  if (signo) R.icono(signo, cx - 2 * Math.max(1, Math.round(r / 12)) - 1, cy - 4 * Math.max(1, Math.round(r / 12)), DC.tinta, null, Math.max(1, Math.round(r / 12)));
}

// el cielo de puntos: color plano y una trama de puntos más gorda arriba (degradado de imprenta)
function d_cieloPuntos(R, y0, y1, c, cs, arriba = true) {
  R.rect(9, y0, 310, y1, c); for (let y = y0; y <= y1; y += 3) { const u = (y - y0) / Math.max(1, y1 - y0), d = arriba ? 1 - u : u; for (let x = 9 + ((y / 3) & 1); x <= 310; x += 3) { if (d > 0.15) R.pset(x, y, cs); if (d > 0.55) { R.pset(x + 1, y, cs); R.pset(x, y + 1, cs); } if (d > 0.85) R.pset(x + 1, y + 1, cs); } }
}

// una cordillera: la silueta por picos, la sombra a la derecha de cada pico y la nieve con su sombra
function d_cordillera(R, picos, base, c, cs, nieve = true) {
  R.poligono([[9, base], ...picos, [310, base]], c);
  for (let i = 0; i < picos.length; i++) { const [px, py] = picos[i], nx = picos[i + 1] ? picos[i + 1] : [310, base]; if (py > (nx[1] ?? base) && i % 2) continue;
    R.poligono([[px, py], [nx[0], nx[1]], [nx[0] - 4, base], [px + 3, base]], cs);
    if (nieve && py < base - 25) { const s = Math.min(14, (base - py) * 0.3); R.poligono([[px, py], [px - s * 0.9, py + s], [px - s * 0.4, py + s * 0.7], [px, py + s * 1.1], [px + s * 0.4, py + s * 0.7], [px + s * 0.9, py + s]], DC.nieve); R.poligono([[px, py], [px + s * 0.4, py + s * 0.7], [px + s * 0.9, py + s], [px + 1, py + s * 0.4]], DC.nieveS); } }
}

// el monasterio encalado (x0–x1, de y0 al suelo yb): franja granate, remate dorado, ventanas en trapecio y puerta
function d_monasterio(R, x0, x1, y0, yb, filas, puerta) {
  const { rect, poligono, disco } = R, cx = Math.round((x0 + x1) / 2);
  poligono([[x0, yb], [x0 + 4, y0], [x1 - 4, y0], [x1, yb]], DC.cal); poligono([[x1 - 14, y0], [x1 - 4, y0], [x1, yb], [x1 - 11, yb]], DC.calS);
  rect(x0 + 4, y0, x1 - 4, y0 + 9, DC.granate); rect(x0 + 4, y0 + 7, x1 - 4, y0 + 9, DC.granateS); for (let x = x0 + 8; x < x1 - 6; x += 8) disco(x, y0 + 4, 1, DC.oro);
  rect(x0 + 2, y0 - 3, x1 - 2, y0 - 1, DC.marronS); poligono([[cx - 6, y0 - 3], [cx, y0 - 16], [cx + 6, y0 - 3]], DC.oro); disco(cx, y0 - 18, 3, DC.oro); poligono([[cx, y0 - 16], [cx + 6, y0 - 3], [cx + 2, y0 - 3]], DC.oroS);
  for (let f = 0; f < filas; f++) for (let x = x0 + 16; x < x1 - 12; x += 22) { const y = y0 + 16 + f * 22; if (puerta && f === filas - 1 && Math.abs(x - cx) < 14) continue;
    poligono([[x - 7, y + 13], [x - 4, y - 1], [x + 4, y - 1], [x + 7, y + 13]], DC.tinta); rect(x - 3, y + 1, x + 3, y + 11, DC.rojo); rect(x, y + 1, x, y + 11, DC.rojoS); rect(x - 6, y - 3, x + 6, y - 1, DC.granate); }
  if (puerta) { rect(cx - 9, yb - 26, cx + 9, yb, DC.tinta); rect(cx - 8, yb - 25, cx - 1, yb, DC.rojo); rect(cx + 1, yb - 25, cx + 8, yb, DC.rojoS); for (const y of [yb - 20, yb - 12, yb - 5]) for (const x of [cx - 5, cx - 3, cx + 3, cx + 5]) R.pset(x, y, DC.oro); rect(cx - 12, yb - 30, cx + 12, yb - 27, DC.granate);
    rect(cx - 14, yb, cx + 14, yb + 2, DC.piedra); rect(cx - 18, yb + 3, cx + 18, yb + 5, DC.piedraS); }
}

// el monasterio con la fragua (fijo)
function d_fraguaFijo(R) {
  const { rect, poligono, disco, linea, pset } = R;
  d_cieloPuntos(R, 8, 120, DC.cielo, DC.cieloS);
  d_cordillera(R, [[9, 74], [40, 50], [62, 64], [98, 32], [130, 58], [162, 42], [196, 66], [232, 36], [262, 54], [292, 46], [310, 60]], 112, DC.monte, DC.monteS);
  d_cordillera(R, [[9, 100], [36, 88], [70, 98], [120, 82], [170, 96], [210, 86], [256, 98], [290, 88], [310, 96]], 126, DC.colina, DC.colinaS, false);
  // el patio de losas en hileras, con las juntas de tinta y alguna losa rota
  rect(9, 128, 310, 171, DC.piedra); let k = 0;
  for (let y = 128, a = 5; y <= 171; y += a, a++) { R.rect(9, y, 310, y, DC.tinta); let x = 9 - Math.round(h(y, 1, 91) * 30); while (x < 310) { const w = 16 + a * 2 + Math.round(h(x, y, 92) * 14); R.rect(x, y, x, Math.min(171, y + a - 1), DC.tinta); if (h(x, y, 93) < 0.3) R.rect(x + 2, y + a - 2, x + w - 2, Math.min(171, y + a - 1), DC.piedraS); x += w; k++; } }
  d_monasterio(R, 12, 124, 66, 132, 3, true);
  d_monasterio(R, 236, 310, 82, 132, 2, false);
  // la fragua: el hogar de piedra, la campana, la chimenea y la boca de las brasas
  rect(194, 104, 248, 146, DC.piedra); rect(236, 104, 248, 146, DC.piedraS);
  for (let y = 112; y < 146; y += 7) for (let x = 194 + ((y / 7) & 1) * 6; x < 248; x += 12) rect(x, y, x, y + 6, DC.tinta); for (let y = 112; y < 146; y += 7) rect(194, y, 248, y, DC.tinta);
  rect(198, 100, 244, 106, DC.marronS); poligono([[188, 98], [254, 98], [234, 70], [208, 70]], DC.gris); poligono([[226, 70], [234, 70], [254, 98], [240, 98]], DC.grisS);
  rect(212, 46, 230, 70, DC.gris); rect(224, 46, 230, 70, DC.grisS); rect(210, 44, 232, 48, DC.grisS);
  rect(204, 116, 238, 130, DC.tinta); rect(206, 118, 236, 130, DC.rojoS);
  // el yunque sobre su tocón
  rect(156, 140, 182, 150, DC.marron); rect(176, 140, 182, 150, DC.marronS); for (let x = 158; x < 180; x += 5) rect(x, 142, x, 149, DC.marronS);
  rect(162, 134, 176, 140, DC.hierroS); rect(154, 128, 184, 134, DC.hierro); rect(154, 128, 184, 128, hex('#b8bcc4')); poligono([[154, 128], [140, 130], [154, 134]], DC.hierro); rect(178, 129, 184, 134, DC.hierroS);
  // el tonel de agua, la leña y las herramientas colgadas
  rect(122, 134, 142, 150, DC.marron); rect(136, 134, 142, 150, DC.marronS); rect(122, 137, 142, 138, DC.hierroS); rect(122, 146, 142, 147, DC.hierroS); rect(124, 133, 140, 135, DC.cian);
  for (let i = 0; i < 6; i++) { const x = 270 + (i % 3) * 12 + (i > 2 ? 6 : 0), y = 146 - (i > 2 ? 9 : 0); disco(x, y, 5, DC.marron); disco(x, y, 3, DC.arena); pset(x, y, DC.marronS); }
  for (const [x, l] of [[254, 14], [262, 18], [270, 12]]) { rect(x, 96, x + 1, 96 + l, DC.marron); rect(x - 2, 96 + l, x + 3, 99 + l, DC.hierroS); } rect(250, 94, 278, 95, DC.marronS);
  linea(282, 96, 286, 116, DC.hierroS); linea(286, 96, 282, 116, DC.hierroS);
  // la nieve amontonada al pie de los muros y unas piedras sueltas
  for (const [a, b] of [[12, 52], [80, 124], [236, 270]]) for (let x = a; x <= b; x++) { const hh = Math.round(2 + Math.sin((x - a) / (b - a) * Math.PI) * 3 + h(x >> 2, 1, 106) * 2); rect(x, 132 - hh + 1, x, 132, DC.nieve); if (h(x, 2, 106) < 0.4) pset(x, 132, DC.nieveS); }
  // el cesto de carbón junto a la fragua, el cubo y la pala
  poligono([[178, 138], [192, 138], [190, 150], [180, 150]], DC.marron); for (let x = 180; x < 191; x += 3) rect(x, 139, x, 149, DC.marronS); for (let i = 0; i < 6; i++) disco(181 + i * 2, 137 - (i % 2), 1, DC.tinta);
  rect(256, 142, 266, 150, DC.hierro); rect(262, 142, 266, 150, DC.hierroS); rect(256, 141, 266, 142, DC.hierroS); linea(252, 150, 246, 124, DC.marron); poligono([[250, 150], [256, 150], [254, 156], [248, 156]], DC.hierroS);
  // un mástil de banderas de oración (tarchen) en el patio, con su pila de piedras
  rect(30, 98, 31, 150, DC.marron); for (let i = 0; i < 4; i++) disco(26 + i * 3, 150 - (i % 2), 3, i % 2 ? DC.piedraS : DC.piedra); poligono([[32, 99], [44, 101], [44, 121], [32, 119]], DC.amarillo); poligono([[32, 107], [44, 109], [44, 113], [32, 111]], DC.rojo);
  // huellas en la nieve del patio y una grieta
  for (let i = 0; i < 7; i++) { const x = 60 + i * 9, y = 160 + (i % 2) * 3; rect(x, y, x + 2, y + 1, DC.piedraS); }
  linea(200, 160, 214, 166, DC.tinta); linea(214, 166, 220, 164, DC.tinta);
}

// el fuelle, que sopla (an 0–1 cuánto se abre)
function d_fuelle(R, x, y, an) { const w = Math.round(6 + an * 6); d_poliT(R, [[x, y], [x + 22, y - w], [x + 24, y - w + 2], [x + 24, y + w - 2], [x + 22, y + w]], DC.tela); for (let i = 4; i < 22; i += 5) R.linea(x + i, y - Math.round(w * i / 22) + 1, x + i, y + Math.round(w * i / 22) - 1, DC.telaS); R.rect(x - 8, y - 1, x, y + 1, DC.hierroS); }

// la máscara de HIERRO de Doom (cx, cy su centro; s escala; calor 0–1). Siempre se lee como metal, nunca como piel: el
// núcleo es acero gris azulado con su bisel (luz arriba a la izquierda, sombra abajo), la arista del centro y un brillo
// en diagonal; el calor se ve como un FILO al rojo uniforme alrededor (amarillo por fuera, naranja por dentro) y en los
// remaches. Por encima de 0,6 el filo se ensancha hacia dentro hasta cubrirla entera (al rojo vivo en 1); al enfriarse,
// el acero crece desde el centro y el filo se estrecha (sin mezclas de color: nunca pasa por tonos tostados). Con hueco
// (un color), las rendijas de los ojos y la rejilla de la boca dejan ver lo de detrás (el fuego) en lugar de tinta.
function d_mascara(R, cx, cy, s, calor = 0, contorno = true, hueco = null) {
  const L = (x, y) => [cx + x * s, cy + y * s], AC = [hex('#3a3e48'), DC.hierroS, hex('#62666e'), DC.hierro, hex('#a2a6ae'), hex('#d2d6dc')];
  const pts = [L(-9, -12), L(-4, -15), L(4, -15), L(9, -12), L(10, 2), L(7, 11), L(3, 14), L(-3, 14), L(-7, 11), L(-10, 2)];
  const esc = (k) => pts.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]);
  const filo = calor > 0.5 ? d_mezcla(DC.naranja, DC.amarillo, Math.min(1, (calor - 0.5) * 2)) : d_mezcla(DC.rojo, DC.naranja, calor * 2);
  if (contorno && calor > 0.2) R.poligono(pts.map(([x, y]) => [cx + (x - cx) * 1.12, cy + (y - cy) * 1.1]), d_mezcla(DC.fuego, DC.amarillo, calor * 0.5));
  if (contorno) d_poliT(R, pts, calor > 0.05 ? filo : AC[3]); else R.poligono(pts, calor > 0.05 ? filo : AC[3]);
  // el filo al rojo (anillo naranja por dentro del amarillo) y el núcleo de acero, sombreado por bandas
  const k = calor <= 0.05 ? 1 : calor <= 0.6 ? 1 - (0.07 + 0.17 * calor / 0.6) : 0.76 * Math.max(0, 1 - (calor - 0.6) / 0.38), nucleo = esc(k);
  if (calor > 0.05 && k < 0.95) R.poligono(esc(k + (1 - k) * 0.72), calor > 0.4 ? DC.naranja : d_mezcla(DC.rojo, DC.rojoS, 0.3));
  if (k < 0.35) { /* al rojo vivo: aún sin núcleo de acero (un núcleo pequeño se leería como una nariz) */ }
  else if (s < 1.5) R.poligono(nucleo, AC[3]);
  else {
    let x0 = 320, x1 = 0, y0 = 180, y1 = 0; for (const [x, y] of nucleo) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const den = (x, y) => { let d = false; for (let i = 0, j = nucleo.length - 1; i < nucleo.length; j = i++) { const [xi, yi] = nucleo[i], [xj, yj] = nucleo[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) d = !d; } return d; };
    for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(179, Math.ceil(y1)); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(319, Math.ceil(x1)); x++) { if (!den(x + 0.5, y + 0.5)) continue;
      const u = (x - cx) / (s * 10), w = (y - cy) / (s * 15), bisel = den(x + 0.5, y - 1.5) && den(x - 1.5, y + 0.5) ? 0 : 1.1, abajo = den(x + 0.5, y + 2.5) && den(x + 2.5, y + 0.5) ? 0 : -1;
      let v = 3.2 - u * 0.9 - w * 0.8 + bisel + abajo + (Math.abs(u + w * 0.7 + 0.25) < 0.07 ? 1.3 : 0) + (h(x >> 1, y >> 1, 120) - 0.5) * 0.35;
      const c = d_tono(AC, v, x, y); R.pset(x, y, c); } }
  // la arista vertical del centro, las rendijas de los ojos y la rejilla de la boca
  const r = (a, b, c, d, col) => R.rect(Math.round(cx + a * s), Math.round(cy + b * s), Math.round(cx + c * s), Math.round(cy + d * s), col);
  const caliente = k < 0.5, luz = caliente ? DC.amarillo : AC[4];
  if (s >= 1.5 && k >= 0.5) { r(0, -14 * k, 0, 5 * k, AC[1]); r(1, -14 * k, 1, 5 * k, AC[4]); }
  const fondo = hueco ?? DC.tinta;
  r(-7, -4, -2, -3, DC.tinta); r(2, -4, 7, -3, DC.tinta); r(-4, 7, 4, 8, DC.tinta);
  if (hueco != null && s >= 1.5) { r(-6.4, -3.6, -2.6, -3.4, fondo); r(2.6, -3.6, 6.4, -3.4, fondo); r(-3.5, 7.4, 3.5, 7.6, fondo); }
  if (s >= 3) { for (let x = -3; x <= 3; x += 2) r(x, 7, x, 8, caliente ? DC.naranja : AC[2]); r(-8, -5, -1, -5, luz); r(1, -5, 8, -5, luz); }
  // los remaches: al rojo si quema, de acero con su brillo si no
  for (const [x, y] of [[-8, -9], [8, -9], [-9, 1], [9, 1], [-6, 10], [6, 10], [0, -13]]) { const px = Math.round(cx + x * s), py = Math.round(cy + y * s), rr = Math.max(1, Math.round(s * 0.5));
    R.disco(px, py, rr, calor > 0.3 ? d_mezcla(DC.fuego, DC.amarillo, calor) : AC[1]); R.pset(px - 1, py - 1, calor > 0.3 ? DC.blanco : AC[5]); if (s >= 3 && calor <= 0.3) R.pset(px + 1, py + 1, AC[0]); }
}
// el vapor de cómic: bolas que suben, crecen y se deshacen
function d_vaporC(R, x, y, t, n = 4, tam = 1, vel = 1) { for (let k = 0; k < n; k++) { const u = ((t * 0.35 * vel + k / n) % 1), r = Math.round((2 + u * 5) * tam); if (u > 0.92) continue; d_nubeC(R, Math.round(x + Math.sin(u * 5 + k * 2) * 4 * tam + u * 8 * tam), Math.round(y - u * 34 * tam), r * 2.2, DC.nube, DC.nubeS); } }

// las banderitas de oración en un cordel entre (a) y (b), que ondean
function d_banderitas(R, t, ax, ay, bx, by) { const C5 = [DC.azul, DC.blanco, DC.rojo, DC.verde, DC.amarillo], n = Math.floor((bx - ax) / 8);
  for (let x = ax; x <= bx; x++) { const u = (x - ax) / (bx - ax); R.pset(x, Math.round(ay + (by - ay) * u + Math.sin(u * Math.PI) * 6), DC.tinta); }
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u + Math.sin(u * Math.PI) * 6) + 1, f = Math.round(Math.sin(t * 5 + i * 0.9) * 2);
    d_poliT(R, [[x - 2, y], [x + 3, y], [x + 3 + f, y + 6], [x - 2 + f, y + 6]], C5[i % 5]); } }

// la clave del búfer de cada vista (con sus opciones fijas), para que comicDelante sepa qué hay debajo
function d_claveComic(enc, cam, o) { return 'c_' + enc + cam + (enc === 'latveria' && cam === 'general' && (o.boda ?? 0) >= 0.5 ? 'B' : '') + (enc === 'mundo' && cam === 'general' && (o.trono ?? 0) >= 0.5 ? 'T' : ''); }

function d_fragua(R, t, o) {
  d_vineta(R, d_claveComic('fragua', 'general', o), () => d_fraguaFijo(R));
  const { pset, rect, disco } = R; R.recorte([9, 8, 310, 171]);
  // nubes que pasan a dos velocidades y un pájaro que planea
  for (const [x0, y, w, v] of [[20, 26, 34, 2.2], [180, 34, 26, 1.4], [330, 22, 22, 3.0]]) { const x = ((x0 + t * v) % 360) - 20; if (!(x > 250 && y < 52)) d_nubeC(R, Math.round(x), y, w); }
  { const a = t * 0.4, bx = Math.round(150 + Math.cos(a) * 60), by = Math.round(52 + Math.sin(a * 2) * 6), f = Math.round(Math.sin(t * 6)); R.linea(bx - 4, by - f, bx, by, DC.tinta); R.linea(bx, by, bx + 4, by - f, DC.tinta); }
  d_banderitas(R, t, 66, 50, 150, 72); d_banderitas(R, t, 150, 72, 273, 82);
  // el cuervo que salta en el tejado
  { const sa = Math.max(0, Math.sin(t * 2.2)) > 0.9 ? 1 : 0, cx = 30 + (Math.floor(t / 3) % 2) * 6; disco(cx, 61 - sa, 2, DC.tinta); pset(cx + 2, 60 - sa, DC.amarillo); rect(cx - 3, 62 - sa, cx, 62 - sa, DC.tinta); }
  // los molinillos de oración que giran
  for (let i = 0; i < 5; i++) { const x = 24 + i * 7; rect(x, 120, x + 4, 129, DC.tinta); rect(x + 1, 121, x + 3, 128, DC.oro); const s = Math.floor(t * 6 + i) % 3; rect(x + 1 + s, 121, x + 1 + s, 128, DC.oroS); }
  // las brasas que laten, el resplandor y las chispas
  for (let y = 119; y <= 129; y++) for (let x = 207; x <= 235; x++) { const v = Math.sin(x * 0.7 + y * 1.3 + t * 5) + Math.sin(x * 0.3 - t * 3); pset(x, y, v > 1 ? DC.amarillo : v > 0 ? DC.fuego : v > -1 ? DC.naranja : DC.rojoS); }
  for (let k = 0; k < 8; k++) { const u = ((t * 0.9 + k / 8) % 1), x = Math.round(221 + Math.sin(k * 3.1) * 10 + Math.sin(u * 6 + k) * 4), y = Math.round(116 - u * 26); if (u < 0.85) pset(x, y, u < 0.4 ? DC.amarillo : DC.naranja); }
  d_fuelle(R, 250, 124, 0.5 + 0.5 * Math.sin(t * 2.6));
  // el humo de la chimenea y el vapor del tonel
  for (let k = 0; k < 4; k++) { const u = ((t * 0.18 + k / 4) % 1), r = 6 + u * 10; if (u > 0.9) continue; const x = Math.round(221 + u * 40 + Math.sin(u * 4 + k) * 4), y = Math.round(42 - u * 30); if (!(x > 262 && y < 54)) d_nubeC(R, x, y, r * 2, DC.gris, DC.grisS); }
  d_vaporC(R, 132, 132, t, 3, 0.6, 0.8);
  // los copos que caen
  for (let k = 0; k < 18; k++) { const x = Math.round((h(k, 1, 94) * 320 + Math.sin(t + k) * 6) % 302) + 9, y = Math.round((h(k, 2, 94) * 170 + t * (8 + k % 4 * 3)) % 160) + 9; if (!(x >= 270 && y <= 50)) { pset(x, y, DC.blanco); pset(x + 1, y, DC.nieveS); } }
  // la máscara: en las brasas al rojo y luego en el yunque, enfriándose y humeando
  const m = o.mascara ?? 0;
  if (m > 0 && m < 0.5) d_mascara(R, 221, 122, 0.5, 1);
  else if (m >= 0.5) { const calor = Math.max(0, 1 - (m - 0.5) * 2.2); d_mascara(R, 169, 123, 0.5, calor); d_vaporC(R, 169, 118, t, 4, 0.6, 1.2); if (m < 0.62) d_estalla(R, 140, 98, 14, DC.amarillo, DC.rojo, t * 2); }
  R.recorte(null);
}

// la máscara de cerca (cámara 'vapor'): un INSERTO de la máscara de hierro al rojo (o.calor 0–1) en las tenazas, sobre
// el yunque, con los rayos de fuego detrás; a la izquierda, el tonel de templar que humea y el martillo en el yunque; y
// una viñeta pequeña dentro de la viñeta (x 14–84, y 24–106) con la fragua del monasterio: Victor, chibi y encapuchado
// (de perfil, sin cara), levanta la máscara con las tenazas hacia la capucha a medida que se enfría (1 − o.calor).
// Encima, las chispas del filo, el vapor que sube, las gotas que chisporrotean y la estrella de onomatopeya
const D_VC = [14, 24, 84, 106];

function d_vaporCercaFijo(R) {
  const { rect, poligono, pset, disco, linea } = R; rect(9, 8, 310, 171, DC.naranja);
  for (let i = 0; i < 24; i++) { if (i % 2) continue; const a0 = i / 24 * Math.PI * 2, a1 = (i + 1) / 24 * Math.PI * 2; poligono([[166, 96], [166 + Math.cos(a0) * 400, 96 + Math.sin(a0) * 400], [166 + Math.cos(a1) * 400, 96 + Math.sin(a1) * 400]], DC.amarillo); }
  R.disco(166, 96, 56, DC.fuego);
  // el yunque bajo la máscara: la cara de arriba con su brillo, el cuerno a la izquierda, la cintura y el tocón
  d_poliT(R, [[106, 154], [238, 154], [238, 162], [214, 164], [204, 171], [140, 171], [130, 164], [106, 162], [72, 157]], DC.hierroS);
  poligono([[108, 155], [236, 155], [236, 157], [108, 157], [76, 157]], DC.hierro); linea(110, 155, 230, 155, hex('#d2d6dc')); for (let x = 116; x < 232; x += 9) pset(x, 159, DC.hierro);
  rect(226, 156, 230, 160, DC.tinta);
  // el martillo apoyado en el yunque
  d_poliT(R, [[206, 146], [226, 146], [226, 153], [206, 153]], DC.hierroS); linea(207, 147, 225, 147, DC.hierro); d_poliT(R, [[226, 148], [262, 140], [263, 143], [227, 151]], DC.marron); linea(230, 148, 260, 142, DC.marronS);
  // el tonel de templar, de duelas con sus aros, con el agua oscura arriba
  d_poliT(R, [[18, 132], [70, 132], [74, 171], [14, 171]], DC.marron); for (let x = 24; x < 70; x += 8) linea(x, 133, x + Math.round((x - 44) * 0.1), 170, DC.marronS);
  for (const y of [140, 160]) { d_poliT(R, [[16, y], [72, y], [72, y + 3], [16, y + 3]], DC.hierroS); }
  d_poliT(R, [[18, 128], [70, 128], [70, 133], [18, 133]], DC.azulS); linea(22, 130, 40, 130, DC.cian);
  // la viñeta pequeña: marco de tinta con su calle de papel, pared de sillares, la boca de la fragua y el suelo de losas
  const [x0, y0, x1, y1] = D_VC; rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, DC.papel); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, DC.tinta);
  rect(x0, y0, x1, y1, DC.piedra);
  for (let y = y0; y < 92; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor((y - y0) / 8), o = (f % 2) * 6; if ((y - y0) % 8 === 0 || (x - x0 + o) % 12 === 0) pset(x, y, DC.piedraS); else if (h(x >> 1, y >> 1, 131) < 0.08) pset(x, y, DC.piedraS); }
  for (let y = 92; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y === 92 || (x - x0 + (y - 92) * 2) % 14 === 0) ? DC.losaS : DC.losa);
  d_poliT(R, [[x0, 48], [x0 + 26, 48], [x0 + 30, 54], [x0 + 30, 92], [x0, 92]], DC.piedraS); d_poliT(R, [[x0 + 2, 64], [x0 + 24, 64], [x0 + 24, 86], [x0 + 2, 86]], DC.tinta);
  d_poliT(R, [[x0 + 4, 32], [x0 + 22, 32], [x0 + 26, 48], [x0, 48]], DC.granateS); rect(x0 + 10, y0, x0 + 16, 31, DC.granateS); linea(x0 + 10, y0, x0 + 10, 31, DC.tinta); linea(x0 + 16, y0, x0 + 16, 31, DC.tinta);
  // las herramientas colgadas y el cubo de carbón
  for (const [x, l] of [[52, 12], [58, 16], [64, 10]]) { linea(x, 30, x, 30 + l, DC.tinta); disco(x, 30 + l, 1.5, DC.hierroS); } rect(48, 28, 70, 29, DC.marronS);
  d_poliT(R, [[68, 84], [80, 84], [78, 92], [70, 92]], DC.hierroS); for (const [i, j] of [[71, 83], [74, 82], [77, 83]]) pset(i, j, DC.tinta);
}

function d_vaporCerca(R, t, o) {
  d_vineta(R, 'c_fraguavapor', () => d_vaporCercaFijo(R), () => { for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) { const d = Math.hypot(x - 166, y - 96); if (d > 60 && d < 64 && (x + y) % 2 === 0) R.pset(x, y, DC.tinta); } });
  const { pset, linea, disco } = R, calor = o.calor ?? Math.max(0.15, 0.7 - (t % 12) * 0.04), [x0, y0, x1, y1] = D_VC;
  // la viñeta pequeña: la boca de la fragua que late, el resplandor en el suelo, Victor que levanta la máscara
  R.recorte(D_VC);
  for (let y = 65; y <= 85; y++) for (let x = x0 + 3; x <= x0 + 23; x++) { const v = Math.sin(x * 0.8 + y * 1.1 + t * 5) + Math.sin(x * 0.3 - t * 3) + (y - 65) * 0.08; pset(x, y, v > 1.2 ? DC.amarillo : v > 0.2 ? DC.fuego : v > -0.8 ? DC.naranja : DC.rojoS); }
  for (let y = 93; y <= y1; y++) for (let x = x0; x <= x0 + 40; x++) if (((x + y) & 1) && Math.hypot((x - x0 - 14) / 30, (y - 93) / 10) < 0.8 + Math.sin(t * 6) * 0.08) pset(x, y, DC.fuego);
  for (let k = 0; k < 5; k++) { const u = (t * 0.8 + k / 5) % 1; pset(Math.round(x0 + 14 + Math.sin(k * 2.3 + u * 5) * 6), Math.round(64 - u * 18), u < 0.5 ? DC.amarillo : DC.naranja); }
  const sube = Math.max(0, Math.min(1, (1 - calor) / 0.7)), ee = sube * sube * (3 - 2 * sube);
  const tx = Math.round(60 - ee * 4), ty = Math.round(90 - ee * 12);
  const ac = R.actor(ELENCO_CHIBI.doomJovenDD, 36, 100, t, { dir: 1, sostiene: [tx - 6, ty + 2] }), [mx, my] = ac && ac.mano ? ac.mano : [tx - 6, ty + 2];
  linea(mx, my, tx - 1, ty + 1, DC.tinta); linea(mx, my + 1, tx - 1, ty + 3, DC.tinta); pset(mx + 1, my, DC.hierro);
  d_mascara(R, tx + 3, ty, 0.5, calor);
  if (calor > 0.3) R.halo(tx + 3, ty, 6, [DC.naranja, DC.amarillo], 0.35 * calor);
  d_vaporC(R, tx + 2, ty - 4, t, 3, 0.45, 1.3);
  R.recorte([9, 8, 310, 171]);
  // las tenazas que entran desde abajo y la máscara grande, de acero con el filo al rojo
  for (const [a, b, c, d] of [[262, 172, 196, 104], [276, 172, 200, 122]]) { linea(a, b, c, d, DC.tinta); linea(a + 1, b, c + 1, d, DC.hierro); linea(a + 2, b, c + 2, d, DC.hierroS); linea(a + 3, b, c + 3, d, DC.tinta); }
  d_mascara(R, 166, 96, 4, calor, true, DC.fuego);
  R.rect(194, 100, 202, 106, DC.hierroS); R.rect(194, 100, 202, 100, DC.hierro); R.rect(198, 118, 206, 124, DC.hierroS); R.rect(198, 118, 206, 118, DC.hierro);
  // el reflejo del fuego en la cara del yunque, que tiembla, y las gotas que caen del filo y chisporrotean en él
  for (let x = 112; x < 230; x += 2) if (Math.sin(x * 0.2 + t * 4) > 0.2) pset(x, 156, calor > 0.4 ? DC.naranja : DC.rojo);
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1, x = 140 + k * 16; if (u < 0.7) pset(x, Math.round(150 + u * 6), DC.cian); else { pset(x - 1, 153, DC.blanco); pset(x + 1, 152, DC.blanco); } }
  // las chispas que saltan del filo: rayitas que salen hacia fuera y caen (más y más amarillas cuanto más quema)
  const nch = Math.round(6 + calor * 14);
  for (let k = 0; k < nch; k++) { const u = ((t * 1.3 + h(k, 1, 121)) % 1), a = h(k, 2, 121) * Math.PI * 2, r0 = 42 + u * 46, x = 166 + Math.cos(a) * r0, y = 96 + Math.sin(a) * r0 * 0.95 + u * u * 26;
    if (u > 0.9) continue; if (x < x1 + 4 && y < y1 + 4) continue; const c = u < 0.4 && calor > 0.4 ? DC.amarillo : DC.blanco; linea(Math.round(x), Math.round(y), Math.round(x - Math.cos(a) * 3), Math.round(y - Math.sin(a) * 3 - u * 2), u < 0.5 ? c : DC.fuego); }
  // el vapor que sube del tonel y del metal, y las gotas que chisporrotean sobre la máscara
  R.recorte([9, 110, 310, 171]); d_vaporC(R, 40, 128, t, 4, 0.6, 0.7); R.recorte([9, 8, 310, 171]); d_vaporC(R, 150, 60, t + 1.3, 4, 1.2, 1.1); d_vaporC(R, 200, 70, t + 0.7, 3, 1.0, 1);
  for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t, r = 40 + ((t * 30 + k * 7) % 14); R.pset(Math.round(166 + Math.cos(a) * r), Math.round(96 + Math.sin(a) * r * 0.9), DC.amarillo); }
  d_estalla(R, 236, 34, 18, DC.amarillo, DC.rojo, Math.sin(t * 3) * 0.1);
  R.recorte(null);
}
// una vidriera ojival (x0–x1, de yt a yb): plomos de tinta, cristales de colores y un rosetón
function d_vidriera(R, x0, x1, yt, yb) {
  const cx = (x0 + x1) / 2, ya = yt + (x1 - x0) * 0.6, C5 = [DC.rojo, DC.azul, DC.oro, DC.verde, DC.morado, DC.cian];
  for (let y = yt; y <= yb; y++) for (let x = x0; x <= x1; x++) {
    if (y < ya) { const w = (x1 - x0) / 2 * Math.sqrt(Math.max(0, 1 - ((ya - y) / (ya - yt)) ** 2)); if (Math.abs(x - cx) > w) continue; }
    const borde = x === x0 || x === x1 || y === yb, cel = (x - x0) % 6 === 0 || (y - yt) % 8 === 0;
    R.pset(x, y, borde || cel ? DC.tinta : C5[Math.floor(h(Math.floor((x - x0) / 6), Math.floor((y - yt) / 8), 95 + x0) * C5.length)]); }
  R.disco(Math.round(cx), Math.round(ya + 4), 6, DC.tinta); R.disco(Math.round(cx), Math.round(ya + 4), 5, DC.oro); R.disco(Math.round(cx), Math.round(ya + 4), 2, DC.rojo);
}

// el salón del castillo (fijo); con boda, el arco de flores, las guirnaldas y el altar
function d_latveriaFijo(R, boda) {
  const { rect, poligono, disco, linea, pset } = R;
  rect(9, 8, 310, 128, DC.muro);
  for (let y = 8, f = 0; y < 128; y += 10, f++) { rect(9, y, 310, y, DC.tinta); for (let x = 9 + (f & 1) * 9; x < 310; x += 18) rect(x, y, x, y + 9, DC.tinta); for (let x = 10 + (f & 1) * 9; x < 310; x += 18) if (h(x, y, 96) < 0.35) rect(x + 1, y + 6, x + 16, y + 9, DC.muroS); }
  rect(9, 100, 310, 128, DC.muroS);
  // las columnas con capitel y basa
  for (const x of [30, 108, 212, 290]) { rect(x - 7, 8, x + 7, 128, DC.piedra); rect(x + 2, 8, x + 7, 128, DC.piedraS); rect(x - 10, 26, x + 10, 32, DC.piedra); rect(x - 10, 120, x + 10, 128, DC.piedra); for (let y = 36; y < 118; y += 12) rect(x - 7, y, x + 7, y, DC.tinta); }
  // los arcos de la bóveda entre las columnas
  for (const [a, b] of [[30, 108], [108, 212], [212, 290]]) { const c = (a + b) / 2, r = (b - a) / 2; for (let x = a; x <= b; x++) { const y = Math.round(26 - Math.sqrt(Math.max(0, r * r - (x - c) ** 2)) * 0.25); rect(x, 8, x, y, DC.piedraS); rect(x, y, x, y + 2, DC.piedra); } }
  d_vidriera(R, 50, 88, 40, 100); d_vidriera(R, 232, 268, 54, 104);
  // los estandartes verdes con la máscara
  for (const x of [128, 192]) { rect(x - 11, 30, x + 11, 32, DC.oroS); poligono([[x - 9, 32], [x + 9, 32], [x + 9, 86], [x, 78], [x - 9, 86]], DC.verde); poligono([[x + 3, 32], [x + 9, 32], [x + 9, 86], [x + 3, 82]], DC.verdeS); rect(x - 9, 33, x + 9, 35, DC.oro); d_mascara(R, x, 54, 0.8, 0, false); }
  // el trono en su estrado
  for (let i = 0; i < 3; i++) { rect(128 - i * 10, 112 + i * 5, 192 + i * 10, 117 + i * 5, DC.piedra); rect(128 - i * 10, 112 + i * 5, 192 + i * 10, 112 + i * 5, DC.tinta); rect(180 + i * 10, 113 + i * 5, 192 + i * 10, 117 + i * 5, DC.piedraS); }
  poligono([[142, 112], [142, 52], [150, 40], [160, 30], [170, 40], [178, 52], [178, 112]], DC.oro); poligono([[147, 100], [147, 56], [160, 40], [173, 56], [173, 100]], DC.verde); poligono([[163, 44], [173, 56], [173, 100], [163, 100]], DC.verdeS);
  rect(138, 96, 182, 104, DC.oro); rect(138, 104, 182, 112, DC.oroS); rect(136, 86, 144, 104, DC.oro); rect(176, 86, 184, 104, DC.oroS);
  // el suelo ajedrezado en perspectiva y la alfombra larga
  for (let y = 129; y <= 171; y++) { const z = (y - 112) / 59, w = 10 + z * 18, row = Math.floor(Math.log(y - 112) * 4.3); for (let x = 9; x <= 310; x++) pset(x, y, (Math.floor((x - 160) / w + 100) + row) % 2 ? DC.losa : DC.losaS); }
  rect(9, 128, 310, 128, DC.tinta);
  poligono([[150, 128], [170, 128], [216, 171], [104, 171]], DC.rojo); poligono([[164, 128], [170, 128], [216, 171], [196, 171]], DC.rojoS); linea(150, 128, 104, 171, DC.oro); linea(170, 128, 216, 171, DC.oro);
  // la luz de las vidrieras sobre el suelo
  for (const [x0, x1] of [[52, 86], [234, 266]]) for (let y = 100; y <= 171; y++) { const d = Math.round((y - 100) * 0.55); for (let x = x0 + d; x <= x1 + d; x++) if ((x + y) % 4 === 0 && x <= 310) pset(x, y, d_mezcla(R.pget(x, y), DC.crema, 0.5)); }
  // los candelabros (las llamas las pinta d_latveria)
  for (const x of [96, 224]) { rect(x - 6, 154, x + 6, 158, DC.oroS); rect(x - 1, 118, x + 1, 154, DC.oro); rect(x - 10, 118, x + 10, 120, DC.oro); for (const dx of [-10, 0, 10]) { rect(x + dx - 1, 110, x + dx + 1, 118, DC.blanco); } }
  // las antorchas de las columnas
  for (const x of [30, 290]) { rect(x - 2, 70, x + 2, 78, DC.marron); rect(x - 4, 66, x + 4, 70, DC.hierroS); }
  if (boda) {
    // el altar con mantel, velas y flores
    rect(144, 120, 176, 134, DC.blanco); rect(144, 120, 176, 122, DC.oro); poligono([[144, 122], [176, 122], [178, 134], [142, 134]], DC.blanco); rect(168, 122, 178, 134, DC.nubeS);
    for (const x of [148, 172]) rect(x - 1, 112, x + 1, 120, DC.crema);
    for (let i = 0; i < 6; i++) { disco(154 + i * 2.5, 116 - (i % 2) * 2, 2, i % 2 ? DC.rosa : DC.blanco); } rect(156, 118, 166, 120, DC.verde);
    // el arco de flores blancas y rosas con hojas
    for (let a = 0; a <= Math.PI; a += 0.035) { const x = Math.round(160 - Math.cos(a) * 46), y = Math.round(160 - Math.sin(a) * 96 * (a > 0.3 && a < Math.PI - 0.3 ? 1 : Math.sin(a) / Math.sin(0.3) * 1)); disco(x, Math.min(160, y), 5, DC.verde); }
    for (let a = 0; a <= Math.PI; a += 0.12) { const x = Math.round(160 - Math.cos(a) * 46 + Math.sin(a * 9) * 2), y = Math.min(158, Math.round(160 - Math.sin(a) * 96)); disco(x, y, 3, Math.floor(a * 8) % 3 ? DC.blanco : DC.rosa); pset(x, y, DC.amarillo); }
    // las guirnaldas entre los estandartes y las columnas
    for (const [a, b] of [[30, 117], [139, 181], [203, 290]]) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(34 + Math.sin(u * Math.PI) * 10); pset(x, y, DC.verde); pset(x, y + 1, DC.verdeS); if ((x - a) % 7 === 3) disco(x, y + 1, 1, x % 2 ? DC.rosa : DC.blanco); }
  }
}

function d_latveria(R, t, o) {
  const boda = (o.boda ?? 0) >= 0.5;
  d_vineta(R, d_claveComic('latveria', 'general', o), () => d_latveriaFijo(R, boda));
  const { pset, disco, rect } = R; R.recorte([9, 8, 310, 171]);
  // las llamas de las velas y de las antorchas
  const llama = (x, y, s) => { const f = Math.sin(t * 9 + x) > 0 ? 1 : 0; R.poligono([[x - s, y], [x + s, y], [x + f, y - 3 * s - 1]], DC.fuego); pset(x, y - 1, DC.amarillo); };
  for (const x of [96, 224]) for (const dx of [-10, 0, 10]) llama(x + dx, 109, 1);
  for (const x of [30, 290]) { llama(x, 65, 3); R.halo(x, 60, 9, [DC.muro, d_mezcla(DC.muro, DC.fuego, 0.3)], 1.0); llama(x, 65, 3); }
  if (boda) for (const x of [148, 172]) llama(x, 111, 1);
  // las motas que flotan en la luz de las vidrieras
  for (let k = 0; k < 14; k++) { const u = ((t * 0.05 + h(k, 1, 97)) % 1), x = Math.round(60 + (k % 2) * 180 + u * 40 + Math.sin(t + k) * 3), y = Math.round(100 + u * 60); pset(x, y, DC.crema); }
  // los guardias-robot pequeños, con sus ojos que se encienden
  for (const [x, dir] of [[20, 1], [300, -1]]) { const y = 150; rect(x - 4, y - 14, x + 4, y, DC.tinta); rect(x - 3, y - 13, x + 3, y - 1, DC.hierro); rect(x - 4, y - 9, x + 4, y, DC.verde); rect(x - 3, y - 13, x + 3, y - 10, DC.hierroS); const on = Math.sin(t * 2 + x) > -0.3; pset(x - 1, y - 12, on ? DC.verde : DC.tinta); pset(x + 1, y - 12, on ? hex('#3ae88a') : DC.tinta); }
  // los pétalos que caen en la boda
  if (boda) for (let k = 0; k < 16; k++) { const x = Math.round((h(k, 3, 97) * 120 + 100 + Math.sin(t * 1.5 + k) * 8)), y = Math.round(((h(k, 4, 97) * 150 + t * (10 + k % 5 * 3)) % 150) + 20); pset(x, y, k % 3 ? DC.blanco : DC.rosa); pset(x + 1, y, k % 3 ? DC.nubeS : DC.rosaS); }
  R.recorte(null);
}

// la habitación de hospital (fija)
function d_cunaFijo(R) {
  const { rect, poligono, disco, linea, pset } = R;
  d_cieloPuntos(R, 8, 100, DC.menta, DC.mentaS, false); rect(9, 100, 310, 104, DC.blanco); rect(9, 104, 310, 128, DC.mentaS); rect(9, 128, 310, 128, DC.tinta);
  for (let y = 129; y <= 171; y++) { const row = Math.floor(Math.log(y - 110) * 5); for (let x = 9; x <= 310; x++) pset(x, y, (Math.floor((x - 160) / (8 + (y - 128) * 0.3) + 100) + row) % 2 ? DC.losa : DC.losaS); }
  // la puerta con su cristal (por él pasa la enfermera)
  rect(16, 44, 58, 128, DC.gris); rect(19, 47, 55, 128, DC.blanco); rect(24, 54, 50, 82, DC.cian); rect(48, 92, 52, 96, DC.oroS);
  // la ventana con la persiana y la ciudad
  rect(194, 24, 264, 94, DC.blanco); rect(198, 28, 260, 90, DC.cielo);
  for (const [x, w, hh] of [[200, 10, 30], [212, 14, 44], [228, 10, 24], [240, 16, 38]]) { rect(x, 90 - hh, x + w, 90, DC.gris); for (let y = 92 - hh; y < 88; y += 5) for (let xx = x + 2; xx < x + w - 1; xx += 4) rect(xx, y, xx + 1, y + 2, DC.azulS); }
  for (let y = 28; y < 64; y += 4) rect(198, y, 260, y + 2, DC.blanco); rect(198, 64, 260, 66, DC.gris); rect(228, 24, 229, 90, DC.blanco);
  rect(190, 94, 268, 98, DC.blanco); rect(202, 86, 210, 94, DC.rojo); for (let i = 0; i < 5; i++) disco(203 + i * 2, 82 - (i % 2) * 2, 2, [DC.amarillo, DC.rosa, DC.blanco][i % 3]);
  // la luz de la ventana sobre el suelo
  for (let y = 128; y <= 171; y++) { const d = Math.round((y - 128) * -0.8); for (let x = 200 + d; x <= 258 + d; x++) if ((x + y) % 4 === 0) pset(x, y, d_mezcla(R.pget(x, y), DC.crema, 0.5)); }
  // el reloj, el monitor en su brazo, el gotero y la cama
  disco(118, 44, 10, DC.blanco); disco(118, 44, 8, DC.crema); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pset(Math.round(118 + Math.cos(a) * 7), Math.round(44 + Math.sin(a) * 7), DC.tinta); }
  rect(240, 100, 244, 110, DC.gris); rect(228, 108, 262, 126, DC.gris); rect(231, 111, 259, 123, DC.verdeS);
  rect(276, 54, 277, 150, DC.hierro); rect(270, 150, 284, 152, DC.hierroS); poligono([[280, 56], [288, 56], [289, 72], [279, 72]], DC.cian); linea(284, 72, 290, 110, DC.cian);
  rect(286, 108, 310, 150, DC.blanco); rect(286, 120, 310, 150, DC.azul); rect(286, 120, 310, 122, DC.azulS); rect(290, 104, 310, 110, DC.nube);
  // la pared: una cenefa de lunares bajo el pasamanos, el zócalo de paneles con sus juntas y los soportes del pasamanos
  rect(9, 104, 310, 105, DC.nubeS); for (let x = 14; x < 310; x += 6) R.pset(x, 97, DC.rosa);
  for (let x = 30; x < 310; x += 28) { rect(x, 106, x, 127, DC.tinta); rect(x + 1, 106, x + 1, 127, DC.menta); } for (let x = 20; x < 310; x += 40) rect(x, 103, x + 2, 106, DC.gris);
  // la lámpara del techo, el interruptor y el dispensador junto a la puerta
  rect(70, 8, 160, 11, DC.gris); rect(72, 9, 158, 10, DC.crema); rect(64, 84, 67, 90, DC.blanco); rect(65, 86, 66, 88, DC.grisS);
  rect(63, 96, 68, 108, DC.blanco); rect(63, 104, 68, 108, DC.cian); rect(65, 109, 66, 110, DC.grisS);
  // un cuadro de un paisaje (sol, colinas y una casita) entre el reloj y la ventana
  rect(140, 30, 180, 60, DC.oroS); rect(142, 32, 178, 58, DC.cielo); disco(168, 40, 4, DC.amarillo); poligono([[142, 58], [142, 48], [156, 42], [168, 50], [178, 46], [178, 58]], DC.colina); poligono([[160, 58], [168, 50], [178, 46], [178, 58]], DC.colinaS);
  rect(149, 47, 155, 53, DC.cal); poligono([[148, 47], [152, 43], [156, 47]], DC.rojo); rect(151, 50, 152, 53, DC.marron);
  // el panel de oxígeno de la pared con sus dos llaves y el manómetro
  rect(78, 108, 108, 121, DC.blanco); rect(78, 119, 108, 121, DC.nubeS); disco(86, 114, 3, DC.verde); disco(98, 114, 3, DC.azul); disco(104, 112, 2, DC.crema); R.pset(104, 112, DC.rojo);
  // LA CUNA de hospital: carrito, cubeta transparente, el bultito, la cinta con flores
  rect(132, 132, 188, 138, DC.blanco); rect(132, 136, 188, 138, DC.nubeS);
  for (const x of [136, 184]) { rect(x - 1, 138, x + 1, 154, DC.hierro); } rect(136, 148, 184, 149, DC.hierroS);
  for (const x of [136, 184]) { disco(x, 156, 3, DC.tinta); disco(x, 156, 1, DC.gris); }
  poligono([[136, 112], [184, 112], [182, 132], [138, 132]], DC.cian); poligono([[176, 112], [184, 112], [182, 132], [174, 132]], DC.cianS);
  linea(140, 114, 146, 128, DC.blanco); linea(142, 114, 148, 128, DC.blanco);
  for (let x = 132; x <= 188; x++) pset(x, 140 + Math.round(Math.sin((x - 132) / 56 * Math.PI) * 3), DC.rosa); for (let x = 132; x <= 188; x++) pset(x, 141 + Math.round(Math.sin((x - 132) / 56 * Math.PI) * 3), DC.rosa);
  for (let i = 0; i < 6; i++) { const x = 138 + i * 9, y = 141 + Math.round(Math.sin((x - 132) / 56 * Math.PI) * 3); disco(x, y, 2, i % 2 ? DC.blanco : DC.amarillo); pset(x, y, DC.naranja); }
  linea(186, 142, 190, 152, DC.rosa); linea(188, 142, 194, 150, DC.rosa);
}
function d_cuna(R, t, o) {
  d_vineta(R, 'c_latveriacuna', () => d_cunaFijo(R));
  const { pset, rect, linea, disco } = R; R.recorte([9, 8, 310, 171]);
  // el bultito que respira y su mechón
  const r = Math.sin(t * 1.6) > 0 ? 1 : 0;
  d_poliT(R, [[148, 130], [146, 124 - r], [152, 118 - r], [168, 118 - r], [174, 124 - r], [172, 130]], DC.rosa); R.poligono([[162, 120 - r], [168, 118 - r], [174, 124 - r], [172, 130], [164, 130]], DC.rosaS);
  disco(153, 120 - r, 3, DC.tinta); disco(153, 120 - r, 2, hex('#f0c8a8')); pset(152, 117 - r, DC.marronS); pset(153, 117 - r, DC.marronS); pset(154, 118 - r, DC.marronS);
  // las agujas del reloj, la línea del monitor, el gotero que gotea
  { const am = t * 0.1 - 1.2, ah = 2.1; linea(118, 44, Math.round(118 + Math.cos(am) * 6), Math.round(44 + Math.sin(am) * 6), DC.tinta); linea(118, 44, Math.round(118 + Math.cos(ah) * 4), Math.round(44 + Math.sin(ah) * 4), DC.tinta); }
  for (let x = 231; x <= 259; x++) { const u = ((x - 231) / 28 + t * 0.8) % 1, y = u > 0.4 && u < 0.46 ? (u < 0.43 ? 112 : 122) : 117; pset(x, y, DC.amarillo); }
  if ((t % 1.5) < 0.2) { disco(258, 112, 1, DC.rojo); }
  { const u = (t % 2) / 2; pset(284, 74 + Math.round(u * 6), DC.cian); }
  // la enfermera que pasa por detrás del cristal de la puerta
  // (todo con poligono, disco y pset, que respetan el recorte del cristal: R.rect no lo respeta)
  R.recorte([24, 54, 50, 82]); { const x = Math.round(((t * 9) % 70) - 10), pa = Math.floor(t * 4) % 2, P = R.poligono;
    P([[x - 6, 67], [x + 6, 67], [x + 6, 83], [x - 6, 83]], DC.tinta); P([[x - 5, 68], [x + 5, 68], [x + 5, 83], [x - 5, 83]], DC.azul); P([[x + 2, 68], [x + 5, 68], [x + 5, 83], [x + 2, 83]], DC.azulS);
    P([[x - 2, 68], [x + 1, 68], [x - 1, 71]], DC.blanco); pset(x - 3, 74, DC.blanco); pset(x - 3, 75, DC.rojo);
    P([[x + 6, 72], [x + 11, 72], [x + 11, 80], [x + 6, 80]], DC.tinta); P([[x + 7, 73], [x + 10, 73], [x + 10, 79], [x + 7, 79]], DC.blanco); for (let j = 74; j < 79; j += 2) pset(x + 8 + pa, j, DC.grisS);
    disco(x, 62, 4, DC.tinta); disco(x, 62, 3, hex('#e0b090')); disco(x - 1, 60, 3, DC.marronS); pset(x + 2, 62, DC.tinta);
    P([[x - 4, 57], [x + 4, 57], [x + 3, 59], [x - 3, 59]], DC.blanco); pset(x, 58, DC.rojo); }
  R.recorte([9, 8, 310, 171]);
  // el globo de corazón atado a la cuna, que se mece
  { const bx = Math.round(194 + Math.sin(t * 1.1) * 4), by = Math.round(80 + Math.sin(t * 1.7) * 2); linea(184, 132, bx, by + 8, DC.tinta); d_poliT(R, [[bx, by + 8], [bx - 8, by], [bx - 7, by - 5], [bx - 3, by - 6], [bx, by - 3], [bx + 3, by - 6], [bx + 7, by - 5], [bx + 8, by]], DC.rojo); pset(bx - 4, by - 3, DC.blanco); }
  R.recorte(null);
}

// el planeta de parches: qué parche toca a cada punto del casquete (−1 fuera)
const D_PLC = [160, 380], D_PLR = 270;

function d_parche(x, y) { const dx = x - D_PLC[0], dy = y - D_PLC[1], r = Math.hypot(dx, dy); if (r > D_PLR) return -1; const a = Math.atan2(dy, dx) + Math.sin(r * 0.06) * 0.03, s = Math.floor((a + 2.12) / 0.17), fila = r < 243 + Math.sin(a * 30) * 4 ? 1 : 0; return Math.max(0, s) * 2 + fila; }

// el color de un punto de un parche: selva, hielo, ciudad, desierto, mar o cristal, cada uno con su dibujo
function d_colorParche(p, x, y) {
  const tipo = [0, 3, 1, 4, 2, 5, 3, 0, 4, 1, 5, 2, 0, 4, 3, 1][p % 16];
  if (tipo === 0) return (h(x >> 2, y >> 2, 98) < 0.4 && ((x + y) & 3)) ? DC.verdeS : DC.verde;
  if (tipo === 1) return (x * 3 + y * 7) % 23 === 0 || (x * 5 - y * 2) % 29 === 0 ? DC.nieveS : DC.nieve;
  if (tipo === 2) return (x % 6 < 4 && y % 5 < 3) ? (h(x, y, 99) < 0.2 ? DC.oro : DC.grisS) : DC.gris;
  if (tipo === 3) return Math.sin(x * 0.4 + Math.sin(y * 0.8) * 2) > 0.7 ? DC.arenaS : DC.arena;
  if (tipo === 4) return Math.sin(x * 0.9 + y * 2.1) > 0.85 ? DC.blanco : (y & 1) && (x % 7 === 0) ? DC.marS : DC.mar;
  return ((x + y) % 6 < 2 || (x - y) % 9 === 0) ? DC.lilaS : DC.lila;
}

// el espacio con el casquete del planeta (fijo); con trono, el trono enorme y sus rayos
function d_mundoFijo(R, trono) {
  const { rect, poligono, disco, pset } = R;
  d_cieloPuntos(R, 8, 171, DC.espacio, DC.espacioL, false);
  // la nebulosa: puntos morados en una nube alargada
  for (let y = 20; y < 90; y += 2) for (let x = 20; x < 260; x += 2) { const d = Math.hypot((x - 90) / 70, (y - 40 - (x - 90) * 0.15) / 16); if (d < 1 && h(x, y, 100) < 1 - d) pset(x, y, d < 0.5 ? DC.lila : DC.purpura); }
  for (let k = 0; k < 40; k++) { const x = 9 + Math.round(h(k, 1, 101) * 300), y = 8 + Math.round(h(k, 2, 101) * 110); if (k % 4 === 0) { pset(x, y, DC.crema); pset(x - 1, y, DC.crema); pset(x + 1, y, DC.crema); pset(x, y - 1, DC.crema); pset(x, y + 1, DC.crema); } else pset(x, y, DC.crema); }
  // el resplandor de la atmósfera y el casquete de parches
  for (let y = 100; y <= 171; y++) for (let x = 9; x <= 310; x++) { const r = Math.hypot(x - D_PLC[0], y - D_PLC[1]); if (r > D_PLR + 6) continue; if (r > D_PLR) { if (r < D_PLR + 3 || (x + y) % 2 === 0) pset(x, y, DC.cian); continue; } pset(x, y, d_colorParche(d_parche(x, y), x, y)); }
  if (trono) {
    for (let i = 0; i < 28; i++) { if (i % 2) continue; const a0 = Math.PI + i / 28 * Math.PI, a1 = Math.PI + (i + 1) / 28 * Math.PI; poligono([[160, 104], [160 + Math.cos(a0) * 140, 104 + Math.sin(a0) * 140], [160 + Math.cos(a1) * 140, 104 + Math.sin(a1) * 140]], DC.espacioL); }
    rect(128, 100, 192, 112, DC.piedra); rect(176, 100, 192, 112, DC.piedraS); rect(122, 108, 198, 114, DC.piedra);
    poligono([[136, 100], [136, 46], [146, 34], [160, 24], [174, 34], [184, 46], [184, 100]], DC.oro); poligono([[142, 92], [142, 50], [160, 32], [178, 50], [178, 92]], DC.verde); poligono([[164, 38], [178, 50], [178, 92], [164, 92]], DC.verdeS);
    rect(132, 92, 188, 98, DC.oro); rect(132, 96, 188, 100, DC.oroS); rect(128, 80, 138, 98, DC.oro); rect(182, 80, 192, 98, DC.oroS); disco(160, 40, 3, DC.rojo);
  }
}

// las costuras de luz entre parches (n 0–1: cuánta costura se ve), que laten
function d_costuras(R, t, n) {
  const M = R.__ddD || (R.__ddD = new Map()); let P = M.get('costuras');
  if (!P) { P = []; for (let y = 102; y <= 171; y++) for (let x = 9; x <= 310; x++) { const a = d_parche(x, y); if (a < 0) continue; const b = d_parche(x + 1, y), c = d_parche(x, y + 1); if ((b >= 0 && b !== a) || (c >= 0 && c !== a)) P.push([x, y]); } P.sort((p, q) => Math.abs(p[0] - 160) - Math.abs(q[0] - 160)); M.set('costuras', P); }
  const m = Math.floor(P.length * n);
  for (let i = 0; i < m; i++) { const [x, y] = P[i]; const g = Math.sin(t * 3 - x * 0.05 - y * 0.1); R.pset(x, y, g > 0.3 ? DC.blanco : DC.amarillo); if (i % 7 === 0) { R.pset(x, y - 1, DC.amarillo); R.pset(x, y + 1, DC.amarillo); } }
}

// una burbuja de universo (con su paisajito dentro y su brillo)
function d_burbuja(R, x, y, r, c1, c2) { R.disco(x, y, r + 1, DC.tinta); R.disco(x, y, r, c1); R.recorte([x - r, y, x + r, y + r]); R.disco(x, y + r, r, c2); R.recorte([9, 8, 310, 171]); R.anillo(x, y, r, DC.tinta); R.disco(x - Math.round(r * 0.4), y - Math.round(r * 0.4), Math.max(1, Math.round(r * 0.2)), DC.blanco); }

function d_mundo(R, t, o) {
  const trono = (o.trono ?? 0) >= 0.5;
  d_vineta(R, d_claveComic('mundo', 'general', o), () => d_mundoFijo(R, trono));
  R.recorte([9, 8, 310, 171]);
  for (let k = 0; k < 12; k++) { const x = 9 + Math.round(h(k, 5, 102) * 300), y = 8 + Math.round(h(k, 6, 102) * 90); if (Math.sin(t * 3 + k * 2) > 0.5) { R.pset(x, y, DC.blanco); R.pset(x - 1, y, DC.crema); R.pset(x + 1, y, DC.crema); } }
  d_costuras(R, t, o.cose ?? 1);
  // las burbujas de universos que se acercan, chocan y se rompen en cristales
  const c = o.choque ?? 0;
  if (c > 0 && c < 1) {
    const B = [[40, 50, DC.azul, DC.verde], [280, 58, DC.rojo, DC.arena], [160, 14, DC.morado, DC.cian]];
    if (c < 0.6) { const u = c / 0.6; B.forEach(([x, y, c1, c2], i) => d_burbuja(R, Math.round(x + (160 - x) * u * 0.85), Math.round(y + (60 - y) * u * 0.85), 16 + i * 2, c1, c2)); }
    else if (c < 0.75) { const u = (c - 0.6) / 0.15; d_estalla(R, 160, 60, Math.round(14 + u * 18), DC.amarillo, DC.rojo, t * 2); }
    else { const u = (c - 0.75) / 0.25; for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + 0.3, d = 10 + u * 90, x = 160 + Math.cos(a) * d, y = 60 + Math.sin(a) * d * 0.7, s = 5 - u * 2, rot = t * 3 + k; d_poliT(R, [[x + Math.cos(rot) * s, y + Math.sin(rot) * s], [x + Math.cos(rot + 2.2) * s, y + Math.sin(rot + 2.2) * s], [x + Math.cos(rot + 4) * s * 0.6, y + Math.sin(rot + 4) * s * 0.6]], [DC.cian, DC.lila, DC.blanco, DC.rosa][k % 4]); } }
  }
  if (trono) for (let k = 0; k < 6; k++) { const a = t * 1.2 + k, x = Math.round(160 + Math.cos(a) * 30), y = Math.round(66 + Math.sin(a) * 34); R.pset(x, y, DC.amarillo); }
  R.recorte(null);
}

// la superficie del planeta de 1984 (fija)
function d_arenaFijo(R) {
  const { rect, poligono, disco, pset, linea } = R;
  d_cieloPuntos(R, 8, 124, DC.rosado, DC.rosadoS);
  // el planeta anillado, dos lunas
  disco(62, 48, 22, DC.oro); for (let y = 26; y <= 70; y++) for (let x = 40; x <= 84; x++) if (Math.hypot(x - 62, y - 48) <= 22 && Math.floor((y - 26) / 6) % 2) pset(x, y, DC.naranja); R.recorte([40, 26, 84, 70]); disco(70, 52, 22, DC.oroS); R.recorte(null);
  for (let a = 0; a < Math.PI * 2; a += 0.01) { const x = Math.round(62 + Math.cos(a) * 36), y = Math.round(48 + Math.sin(a) * 7 - Math.cos(a) * 4); if (Math.sin(a) > 0 || Math.hypot(x - 62, y - 48) > 22) { pset(x, y, DC.crema); pset(x, y + 1, DC.arenaS); } }
  disco(118, 30, 5, DC.nube); disco(120, 29, 4, DC.nubeS); disco(250, 72, 3, DC.cian);
  // las mesetas lejanas y las agujas de roca de en medio
  poligono([[9, 124], [9, 96], [30, 96], [36, 86], [70, 86], [78, 100], [120, 100], [126, 90], [170, 90], [176, 104], [230, 104], [236, 92], [276, 92], [284, 102], [310, 102], [310, 124]], DC.lila);
  for (const [a, b] of [[60, 78], [150, 176], [262, 284]]) poligono([[a, 124], [a + 6, (b > 200 ? 92 : 86)], [b, (b > 200 ? 92 : 86)], [b + 4, 124]], DC.lilaS);
  for (const [x, w, top] of [[30, 12, 58], [88, 9, 72], [236, 14, 50], [292, 10, 66]]) { poligono([[x - w, 130], [x - w * 0.6, top + 10], [x - 2, top], [x + 3, top + 4], [x + w * 0.7, top + 14], [x + w, 130]], DC.purpura); poligono([[x + 1, top + 2], [x + 3, top + 4], [x + w * 0.7, top + 14], [x + w, 130], [x + 2, 130]], DC.purpuraS); }
  // los estratos de las mesetas y las vetas de las agujas
  for (let y = 90; y < 124; y += 4) for (let x = 9; x <= 310; x++) if (R.pget(x, y) === DC.lila && h(x >> 3, y, 122) < 0.7) R.pset(x, y, DC.lilaS);
  for (const [x, top] of [[30, 58], [88, 72], [236, 50], [292, 66]]) for (let y = top + 8; y < 128; y += 7) R.linea(x - 4, y, x + 2, y + 2, DC.purpuraS);
  // el suelo agrietado con cráteres y piedras
  rect(9, 124, 310, 171, DC.suelo); for (let y = 128; y <= 171; y += 4) for (let x = 9 + (y % 8); x <= 310; x += 9) if (h(x, y, 103) < 0.5) rect(x, y, x + 3, y, DC.sueloS);
  for (const [x, y, rx] of [[60, 160, 18], [250, 140, 12], [130, 136, 8], [290, 164, 14]]) { for (let j = -4; j <= 4; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / (rx * 0.3)) ** 2 < 1) pset(x + i, y + j, j < 0 ? DC.sueloS : DC.suelo); }
  for (const [x0, y0, x1, y1] of [[20, 140, 50, 150], [180, 166, 214, 158], [100, 152, 112, 170], [270, 130, 300, 136]]) linea(x0, y0, x1, y1, DC.tinta);
  for (const [x, y, r] of [[30, 168, 5], [196, 140, 3], [306, 150, 4], [120, 166, 3]]) { disco(x, y, r, DC.purpura); disco(x + 1, y + 1, r - 1, DC.purpuraS); }
  for (let k = 0; k < 22; k++) { const x = 12 + Math.round(h(k, 1, 123) * 296), y = 130 + Math.round(h(k, 2, 123) * 40), r = 1 + Math.round(h(k, 3, 123) * 1.5); disco(x, y, r, DC.sueloS); R.pset(x - 1, y - 1, DC.lila); }
  for (const [x, y] of [[150, 134], [86, 142], [226, 162]]) { rect(x - 6, y, x + 6, y, DC.tinta); rect(x - 4, y + 1, x + 4, y + 1, DC.sueloS); }
}
function d_arena(R, t, o) {
  d_vineta(R, 'c_mundoarena', () => d_arenaFijo(R));
  const { pset, rect, linea, disco } = R; R.recorte([9, 8, 310, 171]);
  // las estrellas que titilan, el cometa y las plantas raras que se mecen
  for (let k = 0; k < 14; k++) { const x = 100 + Math.round(h(k, 7, 104) * 200), y = 10 + Math.round(h(k, 8, 104) * 50); if (Math.sin(t * 2 + k) > 0.2 && !(x >= 268 && y <= 52)) pset(x, y, DC.blanco); }
  { const u = (t / 9) % 1, x = Math.round(140 + u * 120), y = Math.round(20 + u * 30); if (u < 0.7) for (let i = 0; i < 10; i++) pset(x - i, y - Math.round(i * 0.25), i < 2 ? DC.blanco : DC.crema); }
  for (const [x, y] of [[44, 146], [200, 150], [280, 156], [140, 160]]) for (let i = -2; i <= 2; i++) { const sw = Math.round(Math.sin(t * 2 + x) * 2); linea(x + i * 2, y, x + i * 3 + sw, y - 9 + Math.abs(i) * 2, DC.cianS); pset(x + i * 3 + sw, y - 10 + Math.abs(i) * 2, DC.amarillo); }
  // las nubes alargadas del planeta a dos velocidades (fuera de la esquina de Atom), un bicho alado que cruza y un remolino de polvo
  for (const [x0, y, w, v] of [[0, 24, 30, 1.6], [150, 34, 22, 2.8], [250, 18, 18, 1.1], [90, 58, 26, 2.1], [200, 46, 20, 3.3], [310, 62, 16, 1.4]]) { const x = ((x0 + t * v) % 360) - 20; if (!(x > 250 && y < 58) && !(Math.abs(x - 62) < 44 && Math.abs(y - 48) < 30)) d_nubeC(R, Math.round(x), y, w, DC.nube, DC.rosa); }
  { const u = (t / 11) % 1, bx = Math.round(330 - u * 340), by = Math.round(70 + Math.sin(u * 9) * 5), f = Math.sin(t * 7) > 0 ? -2 : 1; if (!(bx > 262 && by < 56)) { R.linea(bx - 4, by + f, bx, by, DC.tinta); R.linea(bx, by, bx + 4, by + f, DC.tinta); pset(bx, by + 1, DC.purpura); } }
  { const dx = Math.round(100 + Math.sin(t * 0.4) * 30); for (let i = 0; i < 18; i++) { const a = t * 6 + i * 0.7, r = 1 + i * 0.4, y = 166 - i; pset(Math.round(dx + Math.cos(a) * r), y, i % 3 ? DC.lila : DC.crema); } }
  // la columna de luz que baja del cielo, se posa y se apaga dejando chispas
  const l = o.luz ?? 0;
  if (l > 0 && l < 1) { const I = Math.sin(l * Math.PI), fondo = Math.round(8 + Math.min(1, l * 2.2) * 142), w = Math.round(6 + I * 14);
    for (let y = 8; y <= fondo; y++) for (let x = 160 - w; x <= 160 + w; x++) { const e = Math.abs(x - 160) / w; if (e > 0.85) pset(x, y, DC.amarillo); else if (e < 0.5 || (x + y) % 2) pset(x, y, DC.blanco); }
    for (let k = 0; k < 8; k++) { const x = 160 + Math.round((h(k, 9, 105) - 0.5) * w * 4), y0 = Math.round((t * 120 + k * 23) % 140); linea(x, y0, x, y0 + 8, DC.crema); }
    if (fondo >= 140) for (let j = -6; j <= 6; j++) for (let i = -44; i <= 44; i++) if ((i / 44) ** 2 + (j / 6) ** 2 < I) pset(160 + i, 150 + j, (i + j) % 2 ? DC.blanco : DC.amarillo); }
  if (l >= 0.9) for (let k = 0; k < 16; k++) { const a = k * 2.4 + t, r = (t * 20 + k * 9) % 60; if (Math.sin(t * 5 + k) > 0) pset(Math.round(160 + Math.cos(a) * r), Math.round(146 - Math.abs(Math.sin(a)) * r * 0.5), DC.amarillo); }
  // el poder que se tuerce hacia Doom
  const p = o.poder ?? 0;
  if (p > 0) { const n = Math.round(80 * Math.min(1, p * 1.5)), [dx, dy] = [220, 140];
    for (let i = 0; i <= n; i++) { const u = i / 80, x = (1 - u) ** 2 * 160 + 2 * (1 - u) * u * 140 + u * u * dx, y = (1 - u) ** 2 * 8 + 2 * (1 - u) * u * 96 + u * u * dy, w = 3 + Math.sin(t * 8 + i * 0.4); for (let k = -w - 1; k <= w + 1; k++) pset(Math.round(x + k), Math.round(y), Math.abs(k) > w ? DC.tinta : Math.abs(k) > w - 1.5 ? DC.amarillo : DC.blanco); }
    if (p > 0.6) { d_estalla(R, dx, dy - 4, Math.round(10 + (p - 0.6) * 30), DC.amarillo, DC.verde, t * 2, null); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + t, r0 = 22 + (t * 30 % 8); linea(Math.round(dx + Math.cos(a) * r0), Math.round(dy + Math.sin(a) * r0), Math.round(dx + Math.cos(a) * (r0 + 8)), Math.round(dy + Math.sin(a) * (r0 + 8)), DC.amarillo); } } }
  R.recorte(null);
}
// el centro de la luz verde de cada vista del búnker (o.foco lo mueve)
function a_focoBunker(o, enc, cam) { return o.foco ?? (enc === 'pasillo' ? (cam === 'general' ? [200, 106] : [160, 130]) : cam === 'camara' ? [160, 120] : [150, 110]); }

// la luz verde que ILUMINA lo que está delante del decorado (actores, objetos de la escena, la caja de herramientas):
// un tinte suave que crece hacia el foco, tope 0,3, para que se lean caras y ropa; un filo claro en el lado que mira
// a la luz no hace falta: el tramado de dos tonos ya lo da. Encima, chispas sueltas que pasan por delante
function a_luzSobre(R, fx, fy, v, t) {
  const B = R.buf, G = C.doomV, GS = C.doomVS, gl = hex('#d2ffe6'), alcance = 60 + v * 260;
  for (let y = 0; y < 180; y++) { const yy = (y - fy) * 1.3, o0 = y * 320;
    for (let x = 0; x < 320; x++) { const d = Math.sqrt((x - fx) * (x - fx) + yy * yy), cerca = d < alcance ? 1 - d / alcance : 0;
      const m = v * (0.13 + 0.2 * cerca * cerca), q = Math.floor(m * 6 + a_b4(x, y)) / 6;
      if (q > 0) B[o0 + x] = a_mezcla(B[o0 + x], cerca > 0.5 ? G : GS, q > 0.3 ? 0.3 : q); } }
  if (v > 0.15) for (let k = 0; k < 14; k++) { const u = (t * (0.7 + h(k, 5, 32) * 0.6) + h(k, 6, 32)) % 1, a = h(k, 7, 32) * Math.PI * 2, r = 30 + u * (60 + 110 * v);
    const x = Math.round(fx + Math.cos(a) * r), y = Math.round(fy + Math.sin(a) * r * 0.8 + u * u * 16);
    if (u < 0.85 && !(x >= 276 && y <= 46) && !(x <= 172 && y <= 20)) { R.pset(x, y, u < 0.35 ? gl : G); if (u < 0.5) R.pset(x - Math.round(Math.cos(a)), y - Math.round(Math.sin(a)), GS); } }
}

// las piedras de Wundagore, cuatro clases para que el montón no sea de rocas iguales (de luz a sombra, más el filo
// claro): granito violáceo, basalto azulado, caliza ocre y pizarra verdosa
const A_PIEDRAS = [
  ['#8c8698', '#6c6676', '#4e4858', '#322e3a', '#221e28'], ['#7a8496', '#5a6476', '#424a5c', '#2c3242', '#1a1e2a'],
  ['#a29682', '#827664', '#625848', '#433c32', '#2a2620'], ['#7a8478', '#5c665c', '#444c46', '#2e3430', '#1c201e'],
].map((f) => f.map(hex));

const A_MUSGO = ['#3a3e2a', '#525a36', '#6e7448'].map(hex);

// ¿está (x, y) dentro del polígono pts? (par-impar)
function a_dentro(pts, x, y) { let d = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [ax, ay] = pts[i], [bx, by] = pts[j]; if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) d = !d; } return d; }

// UNA ROCA de verdad (polígono pts; k semilla): dos caras separadas por una arista que baja desde el vértice más alto
// (la de la izquierda a la luz, la de la derecha en sombra), vetas de estrato en diagonal, grietas que se ramifican,
// musgo en la parte baja y en las grietas, nieve en lo alto, el contorno oscuro y el filo de arriba con luz.
// o.tono 0–3 (A_PIEDRAS), o.nieve (alto de la nieve), o.musgo 0–1, o.flash 0–1 (el relámpago: la roca se aclara y el
// filo se pone blanco), o.verde 0–1 (la luz verde de abajo tiñe la cara de abajo), o.borde: lista donde guardar los
// píxeles del filo de luz (para encenderlos después con el relámpago)
function a_roca(R, pts, k, o = {}) {
  const cols = A_PIEDRAS[(o.tono ?? k) & 3], nv = o.nieve ?? 3, mus = o.musgo ?? 0.5, fl = o.flash ?? 0, vd = o.verde ?? 0;
  let x0 = 999, x1 = -999, y0 = 999, y1 = -999, cima = pts[0], base = [0, 0];
  for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); if (p[1] < cima[1]) cima = p; base[0] += p[0] / pts.length; base[1] += p[1] / pts.length; }
  // la arista: de la cima a un punto bajo, desplazado según la semilla
  const ax = cima[0], ay = cima[1], bx = base[0] + (h(k, 1, 116) - 0.5) * (x1 - x0) * 0.5, by = y1, ang = 0.45 + h(k, 2, 116) * 0.5, paso = 5 + Math.floor(h(k, 3, 116) * 3);
  const top = {}; for (let x = Math.floor(x0); x <= x1; x++) { let y = Math.floor(y0); while (y <= y1 && !a_dentro(pts, x + 0.5, y + 0.5)) y++; top[x] = y; }
  R.poligono(pts, (x, y) => {
    const d = y - (top[x] ?? y), n = h(x, y, 117 + k), m = h(x >> 2, y >> 2, 118 + k);
    if (d < nv * (0.5 + 0.7 * h(x >> 1, k, 119))) return d < 1 ? (fl > 0.5 ? AW.blanco : AW.nieve) : AW.nieveM;
    if (d < nv + 1.2 && nv > 0) return AW.nieveA;
    const lado = (bx - ax) * (y - ay) - (by - ay) * (x - ax) > 0 ? 1 : 0;   // 1: a la izquierda de la arista (luz)
    const alto = (y - y0) / Math.max(1, y1 - y0);
    let v = (lado ? 2.9 : 1.6) - alto * 0.9 + (m - 0.5) * 0.9 + fl * 1.6;
    if (((x * ang + y) | 0) % paso === 0 && h(x >> 1, y, 120 + k) > 0.3) v -= 0.8;                  // las vetas
    if (n > 0.95) v -= 1.1; if (n < 0.04) v += 0.9;
    if (alto > 0.6 && h(x >> 2, y >> 2, 121 + k) < mus * (alto - 0.55) * 0.7 && h(x, y, 136) > 0.2) return a_rampa(A_MUSGO, 1.1 + (n - 0.5) * 1.6 + lado * 0.6, x, y);
    let c = a_rampa([cols[4], cols[3], cols[2], cols[1], cols[0]], v, x, y);
    if (vd > 0 && a_b4(x, y) < vd * alto * 0.7) c = a_mezcla(c, C.doomV, 0.45);
    return c; });
  // la arista entre las dos caras, con luz de un lado
  { const n = Math.max(2, Math.round(Math.hypot(bx - ax, by - ay))); for (let i = 2; i < n; i++) { const x = Math.round(ax + (bx - ax) * i / n), y = Math.round(ay + (by - ay) * i / n);
    if (!a_dentro(pts, x + 0.5, y + 0.5) || y - (top[x] ?? y) < nv + 1) continue; R.pset(x, y, cols[0]); if (a_dentro(pts, x + 1.5, y + 0.5)) R.pset(x + 1, y, cols[3]); } }
  // las grietas: una a tres, que bajan quebradas y a veces se parten en dos
  const ng = 1 + Math.floor(h(k, 4, 116) * 2.6) * ((x1 - x0) > 14 ? 1 : 0);
  for (let g = 0; g < ng; g++) { let px = Math.round(x0 + (x1 - x0) * (0.2 + 0.6 * h(k, 10 + g, 116))), py = (top[px] ?? y0) + nv + 2, rama = null;
    for (let i = 0; i < 6 + (x1 - x0) * 0.25; i++) { if (!a_dentro(pts, px + 0.5, py + 0.5)) break; R.pset(px, py, cols[4]); if (a_dentro(pts, px - 0.5, py + 0.5)) R.pset(px - 1, py, cols[1]);
      if (i === 4 && h(k, g, 122) < 0.6) rama = [px, py]; px += h(i, k + g, 123) < 0.45 ? 1 : h(i, k + g, 124) < 0.5 ? -1 : 0; py += 1; }
    if (rama) { let [qx, qy] = rama; for (let i = 0; i < 5; i++) { qx += 1; qy += h(i, k, 125) < 0.5 ? 1 : 0; if (!a_dentro(pts, qx + 0.5, qy + 0.5)) break; R.pset(qx, qy, cols[3]); } } }
  // el contorno y el filo de luz arriba a la izquierda (lo que ilumina el relámpago)
  for (let i = 0; i < pts.length; i++) { const [ax2, ay2] = pts[i], [bx2, by2] = pts[(i + 1) % pts.length]; R.linea(ax2, ay2, bx2, by2, cols[4]); }
  for (let x = Math.floor(x0) + 1; x < x1; x++) { const y = top[x]; if (y == null || y > y1) continue; const yy = y + (nv > 0 ? Math.max(1, Math.round(nv * 0.6)) : 1);
    if (x < (x0 + x1) / 2 + (x1 - x0) * 0.2 && a_dentro(pts, x + 0.5, yy + 0.5)) { if (fl > 0.3) R.pset(x, yy, AW.blanco); if (o.borde && yy > 2 && x >= 0 && x < 320 && yy < 180) o.borde.push([yy * 320 + x, R.pget(x, yy)]); } }
}

// EL RELÁMPAGO (ruinas y cara): un destello cada 2,6–4,0 s, para que ningún plano de 4–7 s se quede sin él; devuelve
// el destello 0–1 (dos golpes de luz y la cola) y la semilla del rayo
function a_rayoF(t, o = {}) {
  const forma = (d) => (d < 0 || d > 0.34 ? 0 : d < 0.06 ? 1 : d < 0.11 ? 0.35 : d < 0.17 ? 0.9 : 0.5 * (1 - (d - 0.17) / 0.17));
  // o.rayo: un instante (o una lista) en que la escena quiere el rayo, para que caiga con su trueno
  for (const tr of [].concat(o.rayo ?? [])) { const f = forma(t - tr); if (f > 0) return [f, Math.floor(tr * 10) + 7]; }
  const P = 3.0, k = Math.floor(t / P), f = forma(t - (k * P + h(k, 1, 126) * 1.0));
  return [f, k];
}

// el rayo lejano (por encima de las nubes, por detrás de las montañas): un trazo quebrado con ramas y su resplandor,
// de y0 a y1, en x entre xa y xb (lejos de la barra del año y de la esquina de Atom)
function a_rayo(R, k, f, xa, xb, y0, y1) {
  if (f <= 0) return; const gl = hex('#c8c0f0');
  const libre = (x, y) => !(x >= 16 && x <= 174 && y <= 22) && !(x >= 274 && y <= 48);
  const lin = (ax, ay, bx, by, c) => { const n = Math.max(Math.abs(bx - ax), Math.abs(by - ay), 1); for (let i = 0; i <= n; i++) { const x = Math.round(ax + (bx - ax) * i / n), y = Math.round(ay + (by - ay) * i / n); if (libre(x, y)) R.pset(x, y, c); } };
  let px = Math.round(xa + h(k, 2, 126) * (xb - xa)), py = y0; const tramo = [];
  while (py < y1) { const nx = Math.max(xa - 3, Math.min(xb + 3, px + Math.round((h(px, py + k, 127) - 0.5) * 10))), ny = py + 3 + Math.round(h(py, px + k, 128) * 5); tramo.push([px, py, nx, ny]); px = nx; py = ny; }
  if (f > 0.3) for (const [ax, ay] of tramo) for (let y = ay - 5; y <= ay + 5; y++) for (let x = ax - 6; x <= ax + 6; x++) { const e = Math.hypot(x - ax, y - ay) / 6; if (e < 1 && libre(x, y) && a_b4(x, y) < (1 - e) * 0.5 * f) a_tinta(R, x, y, gl, 0.45); }
  tramo.forEach(([ax, ay, bx, by], i) => { lin(ax, ay, bx, by, f > 0.6 ? AW.blanco : gl); lin(ax + 1, ay, bx + 1, by, gl);
    if (i % 3 === 1 && f > 0.6) { let qx = bx, qy = by; const dir = h(k, i, 129) < 0.5 ? -1 : 1; for (let j = 0; j < 4; j++) { const nx = qx + dir * (2 + Math.round(h(j, i + k, 130) * 3)), ny = qy + 3; lin(qx, qy, nx, ny, gl); qx = nx; qy = ny; } } });
}

// los píxeles del filo de luz de las rocas del montón (los enciende el relámpago): [índice, color]; al acabar la capa se
// quitan los que tapó otra cosa y los de la barra del año y la esquina de Atom
function a_bordesLimpios(L, b) { const r = L.filter(([i, c]) => { const x = i % 320, y = (i / 320) | 0; return b[i] === c && !(x >= 16 && x <= 174 && y <= 22) && !(x >= 270 && y <= 50); }).map(([i]) => i); L.length = 0; L.push(...r); }

const A_BORDE_RUINAS = [];

// los píxeles del filo de luz de las rocas de la cueva (los enciende el relámpago)
const A_BORDE_CARA = [];

// el centinela lejano metido en el humo [x, y de la cabeza, escala] y la boca de riego reventada [x, y del pie]
const B_LEJOS = [112, 86, 0.45], B_RIEGO = [300, 150];

// un pintor que destiñe todo lo que pinta hacia el color del cielo de detrás (f 0–1: cuánta bruma)
function b_bruma(P, f) { const W = (c) => (x, y) => b_mezcla(typeof c === 'function' ? c(x, y) : c, B_CIELO[Math.min(9, Math.round(b_cieloV(x, y)))], f), Q = { ...P };
  for (const k of ['p', 'rc', 'li', 'po', 'el', 'di', 'cap']) Q[k] = (...a) => { a[a.length - 1] = W(a[a.length - 1]); P[k](...a); }; return Q; }

// las bombillas de la guirnalda de la pared de los marcos: [x, y] del casquillo, en cinco senos entre seis clavos
const B_GUIRNALDA = (() => { const r = []; for (let a = 48; a < 266; a += 44) for (let x = a + 4; x < a + 42; x += 7) r.push([x, Math.round(24 + Math.sin((x - a) / 44 * Math.PI) * 9)]); return r; })();

// cifras de lápiz de 3 × 5 (para numerar los huecos de los marcos)
const B_DIG = ['###,#.#,#.#,#.#,###', '.#.,##.,.#.,.#.,###', '##.,..#,.#.,#..,###', '##.,..#,.#.,..#,##.', '#.#,#.#,###,..#,..#', '###,#..,##.,..#,##.', '.##,#..,###,#.#,###', '###,..#,.#.,.#.,.#.', '###,#.#,###,#.#,###', '###,#.#,###,..#,##.'].map((f) => f.split(','));

// cuántos marcos están puestos (o.n, 11 por omisión)
function b_puestos(o) { return Math.max(0, Math.min(11, Math.round(o.n ?? 11))); }

// el póster que cae: o.cae un número 0–1 (cae el último puesto, el n−1, como siempre) o un objeto { marco: i, k: 0–1 }
// (cae el marco i, si está puesto; k es el avance de la caída); devuelve { i, k } o null si no cae ninguno
function b_cae(o, n) {
  const c = o.cae; if (c == null || n <= 0) return null; if (typeof c === 'number') return c > 0 ? { i: n - 1, k: Math.min(1, c) } : null;
  const i = Math.round(c.marco ?? n - 1), k = Math.max(0, Math.min(1, c.k ?? 0)); return i >= 0 && i < n && k > 0 ? { i, k } : null;
}

// el planeta con su anillo (la ciencia ficción) de las fichas: la mitad de atrás del anillo, la esfera naranja con bandas,
// luz arriba a la izquierda y sombra abajo, y la mitad de delante del anillo, inclinada (no se lee como letra)
function c_planeta(R, px, py) {
  const { pset } = R, ca = Math.cos(-0.38), sa = Math.sin(-0.38);
  const anillo = (frente) => { for (let i = 0; i < 72; i++) { const a = i / 72 * Math.PI * 2, s = Math.sin(a); if ((s > 0) !== frente) continue; const ex = Math.cos(a) * 10.5, ey = s * 3; const x = Math.round(px + ex * ca - ey * sa), y = Math.round(py + ex * sa + ey * ca); pset(x, y, frente ? hex('#f4e4b0') : hex('#a8946a')); pset(x, y + 1, frente ? hex('#c8a050') : hex('#7a6a4a')); } };
  anillo(false);
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = i * i + j * j; if (d > 28) continue; const l = -i * 0.5 - j * 0.6; let c = l > 2 ? hex('#f8c878') : l > -1.6 ? hex('#e8903a') : hex('#b0602a'); if ((j + 9) % 4 === 0 && l > -1.6 && l < 2) c = hex('#cc7230'); if (d > 19 && l < -0.5) c = hex('#7a3a1e'); pset(px + i, py + j, c); }
  pset(px - 2, py - 3, hex('#fff2cc')); pset(px - 3, py - 2, hex('#fce0a0'));
  anillo(true);
  pset(px - 11, py - 6, hex('#e8b830')); pset(px + 10, py + 7, hex('#7a9ac8'));
}

// la gota y la espada de la quinta ficha (la violencia): la gota roja con su brillo y su sombra; la espada en diagonal
// con la hoja de dos tonos, la guarda dorada, el puño y el pomo
function c_gotaEspada(R, cx, y0) {
  const { pset } = R, gx = cx - 8, gy = y0 + 22;
  R.poligono([[gx, y0 + 13], [gx - 4, gy - 1], [gx + 4, gy - 1]], hex('#c8283a')); R.disco(gx, gy, 4, hex('#c8283a'));
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) if (i * i + j * j <= 16 && i + j > 2) pset(gx + i, gy + j, hex('#8a1a2a'));
  pset(gx - 2, gy - 2, hex('#f8b0b0')); pset(gx - 2, gy - 1, hex('#f08080')); pset(gx - 1, gy - 5, hex('#e86070'));
  R.linea(cx + 19, y0 + 12, cx + 10, y0 + 21, hex('#eef2f8')); R.linea(cx + 19, y0 + 13, cx + 11, y0 + 21, hex('#8a94a6')); R.linea(cx + 18, y0 + 12, cx + 10, y0 + 20, hex('#c8d0dc'));
  R.linea(cx + 7, y0 + 19, cx + 12, y0 + 24, hex('#e8b848')); R.linea(cx + 8, y0 + 19, cx + 12, y0 + 23, hex('#a87a20'));
  R.linea(cx + 9, y0 + 22, cx + 7, y0 + 24, hex('#6a3a1a')); R.linea(cx + 10, y0 + 22, cx + 8, y0 + 24, hex('#8a5a2a')); R.disco(cx + 6, y0 + 25, 1, hex('#e8b848')); pset(cx + 6, y0 + 25, hex('#fff0b0'));
}

// el sello visto desde arriba: el taco de madera con la goma roja asomando, y el pomo con su brillo (q = medio lado)
function c_selloArriba(R, x, y, q) {
  const { rect } = R, p = Math.round(q * 0.55);
  rect(x - q, y - q + 3, x + q, y + q + 3, hex('#8a1a2a')); rect(x - q + 1, y + q + 1, x + q - 1, y + q + 2, hex('#c83a4a'));
  rect(x - q, y - q, x + q, y + q, hex('#4a2410')); rect(x - q + 1, y - q + 1, x + q - 1, y + q - 1, hex('#8a4a22')); rect(x - q + 1, y - q + 1, x + q - 1, y - q + 2, hex('#c07a40')); rect(x - q + 1, y - q + 1, x - q + 2, y + q - 1, hex('#a8622e'));
  for (let k = -q + 4; k < q - 2; k += 4) R.linea(x - q + 3, y + k, x + q - 3, y + k + 1, hex('#7a3e1c'));
  R.disco(x + 1, y + 1, p, hex('#2a1408')); R.disco(x, y, p, hex('#5a2e14')); R.disco(x, y - 1, p - 1, hex('#7a4020')); R.disco(x - Math.round(p * 0.35), y - Math.round(p * 0.45), Math.max(1, Math.round(p * 0.3)), hex('#d0905a'));
}
